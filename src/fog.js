import { PALETTE_16BIT } from "./palette.js";
import { findBoundaryEdge } from "./shaders/shaderRegistry.js";

// How many vertices the merged boundary polygon can hold before a fog batch is forced to flush -
// separate from shaderRegistry.js's FILL_BATCH_CAPACITY since fog runs as its own pass with its
// own buffers, even though the mechanism (see batchedFogFace) is identical.
export const FOG_BATCH_CAPACITY = 16;

// fogBatchStateBuffer layout (Int32Array(3), see Canvas2dRenderer.js) - private, unlike fill's
// BATCH_COLOR16: fogTriangles owns its own reset/flush lifecycle, so nothing outside fog.js needs
// to know these slot numbers.
const FOG_BATCH_COLOR16 = 0; // -1 = no pending batch
const FOG_BATCH_MESH = 1;
const FOG_BATCH_LENGTH = 2;

// Slots into the shared ctxStateBuffer/statsBuffer Canvas2dRenderer.js owns (see
// shaderRegistry.js's registerShader doc comment for the full layout of the rest).
export const CTX_STATE_FOG = 9;
export const STATS_FOG_DRAW_CALLS = 1;

export function computeFogAmount(
  faceIdx,
  clipGeometryBuffer,
  fogType,
  fogNearPane,
  fogFarPane,
) {
  let fogAmount = 0;

  // fogType arrives as a number (see CameraComponent.FogType: 0 NONE, 1 RADIAL, 2 RADIAL_FAST,
  // 3 LINEAR) - compared directly as numbers here rather than through the enum object, since a
  // number === number check is cheaper per-face than dereferencing CameraComponent.FogType.X
  // and comparing strings.
  if (fogType === 2 /* RADIAL_FAST */ || fogType === 1 /* RADIAL */) {
    const w0x = clipGeometryBuffer[faceIdx * 9];
    const w0y = clipGeometryBuffer[faceIdx * 9 + 1];
    const w0z = clipGeometryBuffer[faceIdx * 9 + 2];
    const w1x = clipGeometryBuffer[faceIdx * 9 + 3];
    const w1y = clipGeometryBuffer[faceIdx * 9 + 4];
    const w1z = clipGeometryBuffer[faceIdx * 9 + 5];
    const w2x = clipGeometryBuffer[faceIdx * 9 + 6];
    const w2y = clipGeometryBuffer[faceIdx * 9 + 7];
    const w2z = clipGeometryBuffer[faceIdx * 9 + 8];

    const lx = (w0x + w1x + w2x) * 0.33333;
    const ly = (w0y + w1y + w2y) * 0.33333;
    const lz = (w0z + w1z + w2z) * 0.33333;

    if (fogType === 2 /* RADIAL_FAST */) {
      const nearSq = fogNearPane * fogNearPane;
      const farSq = fogFarPane * fogFarPane;
      const invFogRangeSq = 1.0 / (farSq - nearSq);
      const distSq = lx * lx + ly * ly + lz * lz;
      fogAmount = (distSq - nearSq) * invFogRangeSq;
    } else {
      const distance = Math.sqrt(lx * lx + ly * ly + lz * lz);
      fogAmount = (distance - fogNearPane) / (fogFarPane - fogNearPane);
    }
  } else if (fogType === 3 /* LINEAR */) {
    const depth0 = clipGeometryBuffer[faceIdx * 9 + 2];
    const depth1 = clipGeometryBuffer[faceIdx * 9 + 5];
    const depth2 = clipGeometryBuffer[faceIdx * 9 + 8];
    const avgDepth = (depth0 + depth1 + depth2) * 0.33333;
    fogAmount = (avgDepth - fogNearPane) / (fogFarPane - fogNearPane);
  }

  // A face closer than fogNearPane produces a negative fogAmount - clamp both bounds here so
  // no caller has to guard every use against it separately.
  if (fogAmount < 0) fogAmount = 0;
  else if (fogAmount > 1) fogAmount = 1;

  return fogAmount;
}

/**
 * Four-pass stable counting sort of this layer's flat-shaded (shaderKey 0) faces into
 * tempIndexBuffer - the exact same significance hierarchy and pass structure as radixSort.js
 * ([Depth (Most Significant)] -> [Mesh Index] -> [Fog Bucket (Least Significant)]), with fog
 * bucket substituted for shaderPass as the extra key. Non-flat-shaded faces are skipped outright,
 * never written to any buffer.
 *
 * Depth stays the dominant key on purpose: fog amount (especially RADIAL, full 3D distance) does
 * not reliably correlate with the camera-space Z radixSort/fill/shade occlude by - two faces at
 * different depths can land in the same fog bucket, or a nearer face can even land in a lower
 * (more-fogged) bucket than a farther one behind it. Sorting fog by bucket first once caused
 * exactly that: a farther face's fog silhouette drawing over a nearer face's, visibly mismatching
 * fill's own occlusion. Keeping depth dominant guarantees fogCtx's draw order always matches
 * fillCtx's, the same way shadeCtx's does. Mesh and fog-bucket only matter as tie-breaks within
 * an exact depth tie (mirroring radixSort's own mesh tie-break, plus grouping by fog value on top
 * of that so flatFill-style ctx-state dedup still has a chance to hit ties that share a mesh).
 *
 * @param {Uint32Array} indexBuffer - this layer's depth-sorted face indices (radixSort's output).
 * @param {Uint32Array} tempIndexBuffer - final output buffer, reused as scratch - already idle
 *   here (this layer's own radixSort call has finished with it, the next layer's hasn't started).
 * @param {Uint32Array} scratchBuffer - ping-pong scratch between tempIndexBuffer across passes.
 * @param {Uint8Array} shaderTypeBuffer - per-face shader key; only 0 (flat) participates.
 * @param {Uint32Array} meshIndexBuffer - per-face mesh index within this layer (see destructMesh).
 * @param {Float32Array} depthBuffer - per-face depth, same values/units radixSort sorts by.
 * @param {Float32Array} clipGeometryBuffer - per-vertex camera-space geometry (see computeFogAmount).
 * @param {Uint32Array} counters - scratch counting-sort buckets, reused across all 4 passes.
 * @param {number} count - number of faces in indexBuffer to consider, starting at index 0.
 * @param {number} near @param {number} far - camera near/far clipping planes (matches radixSort).
 * @param {number} fogType @param {number} fogNearPane @param {number} fogFarPane
 * @returns {number} the number of flat-shaded faces written to tempIndexBuffer.
 */
export function fogSort(
  indexBuffer,
  tempIndexBuffer,
  scratchBuffer,
  shaderTypeBuffer,
  meshIndexBuffer,
  depthBuffer,
  clipGeometryBuffer,
  counters,
  count,
  near,
  far,
  fogType,
  fogNearPane,
  fogFarPane,
) {
  if (count === 0) return 0;

  const invDepthRange = far - near > 0.0001 ? 65535.0 / (far - near) : 0;

  // Pass 1 (least significant): fog bucket - also where the shaderType filter happens, since
  // this is the only pass that reads every candidate face regardless of the final face count.
  counters.fill(0, 0, 32);
  let fogFaceCount = 0;
  for (let i = 0; i < count; i++) {
    const idx = indexBuffer[i];
    if (shaderTypeBuffer[idx] !== 0) continue;
    const fogAmount = computeFogAmount(idx, clipGeometryBuffer, fogType, fogNearPane, fogFarPane);
    const bucket = ((255 * (1 - fogAmount)) & 0xf8) >> 3;
    counters[bucket]++;
    fogFaceCount++;
  }

  let offset = 0;
  for (let b = 0; b < 32; b++) {
    const c = counters[b];
    counters[b] = offset;
    offset += c;
  }

  for (let i = 0; i < count; i++) {
    const idx = indexBuffer[i];
    if (shaderTypeBuffer[idx] !== 0) continue;
    const fogAmount = computeFogAmount(idx, clipGeometryBuffer, fogType, fogNearPane, fogFarPane);
    const bucket = ((255 * (1 - fogAmount)) & 0xf8) >> 3;
    scratchBuffer[counters[bucket]++] = idx;
  }

  // Pass 2: mesh index - same masked key radixSort's own mesh pass uses.
  counters.fill(0, 0, 256);
  for (let i = 0; i < fogFaceCount; i++) {
    counters[meshIndexBuffer[scratchBuffer[i]] & 0xff]++;
  }

  offset = 0;
  for (let b = 0; b < 256; b++) {
    const c = counters[b];
    counters[b] = offset;
    offset += c;
  }

  for (let i = 0; i < fogFaceCount; i++) {
    const idx = scratchBuffer[i];
    tempIndexBuffer[counters[meshIndexBuffer[idx] & 0xff]++] = idx;
  }

  // Pass 3: depth lower 8 bits.
  counters.fill(0, 0, 256);
  for (let i = 0; i < fogFaceCount; i++) {
    const idx = tempIndexBuffer[i];
    const depth = depthBuffer[idx];
    let t = (depth - near) * invDepthRange;
    if (t < 0) t = 0;
    else if (t > 65535) t = 65535;
    counters[(65535 - (t | 0)) & 0xff]++;
  }

  offset = 0;
  for (let b = 0; b < 256; b++) {
    const c = counters[b];
    counters[b] = offset;
    offset += c;
  }

  for (let i = 0; i < fogFaceCount; i++) {
    const idx = tempIndexBuffer[i];
    const depth = depthBuffer[idx];
    let t = (depth - near) * invDepthRange;
    if (t < 0) t = 0;
    else if (t > 65535) t = 65535;
    scratchBuffer[counters[(65535 - (t | 0)) & 0xff]++] = idx;
  }

  // Pass 4 (most significant): depth upper 8 bits.
  counters.fill(0, 0, 256);
  for (let i = 0; i < fogFaceCount; i++) {
    const idx = scratchBuffer[i];
    const depth = depthBuffer[idx];
    let t = (depth - near) * invDepthRange;
    if (t < 0) t = 0;
    else if (t > 65535) t = 65535;
    counters[((65535 - (t | 0)) >> 8) & 0xff]++;
  }

  offset = 0;
  for (let b = 0; b < 256; b++) {
    const c = counters[b];
    counters[b] = offset;
    offset += c;
  }

  for (let i = 0; i < fogFaceCount; i++) {
    const idx = scratchBuffer[i];
    const depth = depthBuffer[idx];
    let t = (depth - near) * invDepthRange;
    if (t < 0) t = 0;
    else if (t > 65535) t = 65535;
    tempIndexBuffer[counters[((65535 - (t | 0)) >> 8) & 0xff]++] = idx;
  }

  return fogFaceCount;
}

/**
 * Fog-pass mirror of shaderRegistry.js's batchedFlatFill: merges consecutive same-fog-color,
 * same-mesh triangles that share an edge into one continuous path, same findBoundaryEdge
 * mechanism, same append-only batchCoords/batchIdentity + spliced batchWalkOrder shape. Draws
 * every face unconditionally (no fogAmount-based skip - a "fully fogged" face still has to be
 * drawn to correctly occlude whatever's underneath it in fogCtx, since depth-dominant draw order
 * means it's no longer safe to assume nothing but background is there).
 * @param {CanvasRenderingContext2D} fogCtx - this layer's half-resolution fog buffer.
 * @param {number} px0 @param {number} py0
 * @param {number} px1 @param {number} py1
 * @param {number} px2 @param {number} py2 - unexpanded triangle coords, already scaled to
 *   fogCtx's half-resolution pixel space by the caller.
 * @param {number} v0Idx @param {number} v1Idx @param {number} v2Idx
 * @param {Float32Array} clipGeometryBuffer
 * @param {number} faceIdx @param {number} meshIdx
 * @param {number} fogType @param {number} fogNearPane @param {number} fogFarPane
 * @param {Int32Array} ctxStateBuffer @param {Int32Array} statsBuffer
 * @param {Int32Array} batchStateBuffer @param {Float32Array} batchCoords
 * @param {Uint32Array} batchIdentity @param {Uint32Array} batchWalkOrder
 */
function batchedFogFace(
  fogCtx,
  px0,
  py0,
  px1,
  py1,
  px2,
  py2,
  v0Idx,
  v1Idx,
  v2Idx,
  clipGeometryBuffer,
  faceIdx,
  meshIdx,
  fogType,
  fogNearPane,
  fogFarPane,
  ctxStateBuffer,
  statsBuffer,
  batchStateBuffer,
  batchCoords,
  batchIdentity,
  batchWalkOrder,
) {
  const fogAmount = computeFogAmount(
    faceIdx,
    clipGeometryBuffer,
    fogType,
    fogNearPane,
    fogFarPane,
  );
  // Standard 32-level quantization (0xf8) - fogSort only groups by fog bucket within an exact
  // depth tie now (see fogSort's doc comment), so this doesn't lean on coarser buckets for
  // dedup locality the way it used to; 32 levels just fogs more smoothly than 16.
  const keep = (255 * (1 - fogAmount)) & 0xf8;
  const color16 =
    ((keep & 0xf8) << 8) | ((keep & 0xfc) << 3) | ((keep & 0xf8) >> 3);

  if (
    batchStateBuffer[FOG_BATCH_COLOR16] === color16 &&
    batchStateBuffer[FOG_BATCH_MESH] === meshIdx
  ) {
    const length = batchStateBuffer[FOG_BATCH_LENGTH];

    let matchPos = -1;
    let matchCount = 0;
    let newPx = 0,
      newPy = 0,
      newVIdx = 0;

    let pos = findBoundaryEdge(v0Idx, v1Idx, batchWalkOrder, batchIdentity, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px2;
      newPy = py2;
      newVIdx = v2Idx;
    }
    pos = findBoundaryEdge(v1Idx, v2Idx, batchWalkOrder, batchIdentity, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px0;
      newPy = py0;
      newVIdx = v0Idx;
    }
    pos = findBoundaryEdge(v2Idx, v0Idx, batchWalkOrder, batchIdentity, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px1;
      newPy = py1;
      newVIdx = v1Idx;
    }

    if (matchCount === 1 && length < FOG_BATCH_CAPACITY) {
      batchCoords[length * 2] = newPx;
      batchCoords[length * 2 + 1] = newPy;
      batchIdentity[length] = newVIdx;

      for (let i = length; i > matchPos + 1; i--) {
        batchWalkOrder[i] = batchWalkOrder[i - 1];
      }
      batchWalkOrder[matchPos + 1] = length;

      batchStateBuffer[FOG_BATCH_LENGTH] = length + 1;
      return;
    }

    flushBatchedFogFace(fogCtx, statsBuffer, batchStateBuffer, batchCoords, batchWalkOrder);
  } else if (batchStateBuffer[FOG_BATCH_COLOR16] !== -1) {
    flushBatchedFogFace(fogCtx, statsBuffer, batchStateBuffer, batchCoords, batchWalkOrder);
  }

  if (ctxStateBuffer[CTX_STATE_FOG] !== color16) {
    const style = PALETTE_16BIT[color16];
    fogCtx.fillStyle = style;
    fogCtx.strokeStyle = style;
    fogCtx.lineWidth = 1;
    fogCtx.lineJoin = "miter";
    ctxStateBuffer[CTX_STATE_FOG] = color16;
  }

  batchCoords[0] = px0;
  batchCoords[1] = py0;
  batchCoords[2] = px1;
  batchCoords[3] = py1;
  batchCoords[4] = px2;
  batchCoords[5] = py2;
  batchIdentity[0] = v0Idx;
  batchIdentity[1] = v1Idx;
  batchIdentity[2] = v2Idx;
  batchWalkOrder[0] = 0;
  batchWalkOrder[1] = 1;
  batchWalkOrder[2] = 2;

  batchStateBuffer[FOG_BATCH_COLOR16] = color16;
  batchStateBuffer[FOG_BATCH_MESH] = meshIdx;
  batchStateBuffer[FOG_BATCH_LENGTH] = 3;
}

function flushBatchedFogFace(
  fogCtx,
  statsBuffer,
  batchStateBuffer,
  batchCoords,
  batchWalkOrder,
) {
  if (batchStateBuffer[FOG_BATCH_COLOR16] === -1) return;

  const length = batchStateBuffer[FOG_BATCH_LENGTH];
  const first = batchWalkOrder[0];

  fogCtx.beginPath();
  fogCtx.moveTo(batchCoords[first * 2], batchCoords[first * 2 + 1]);
  for (let i = 1; i < length; i++) {
    const p = batchWalkOrder[i];
    fogCtx.lineTo(batchCoords[p * 2], batchCoords[p * 2 + 1]);
  }
  fogCtx.closePath();

  fogCtx.stroke();
  fogCtx.fill();
  statsBuffer[STATS_FOG_DRAW_CALLS]++;

  batchStateBuffer[FOG_BATCH_COLOR16] = -1;
}

let filterInvertSupported = null;

function supportsFilterInvert() {
  if (filterInvertSupported !== null) return filterInvertSupported;

  try {
    const testCanvas = document.createElement("canvas");
    testCanvas.width = 1;
    testCanvas.height = 1;
    const testCtx = testCanvas.getContext("2d");
    testCtx.fillStyle = "#000000";
    testCtx.fillRect(0, 0, 1, 1);
    testCtx.filter = "invert(1)";
    testCtx.drawImage(testCanvas, 0, 0);
    testCtx.filter = "none";
    const pixel = testCtx.getImageData(0, 0, 1, 1).data;
    filterInvertSupported = pixel[0] > 200 && pixel[1] > 200 && pixel[2] > 200;
  } catch (e) {
    filterInvertSupported = false;
  }

  return filterInvertSupported;
}

supportsFilterInvert();

/**
 * Composites this layer's fog buffer onto `ctx`: inverts `fogCtx` in place (keep -> fogAmount),
 * tints it by fogColor via multiply, then adds it back onto `ctx` via lighter - see fog.js's
 * fogFace for the per-face formula this composites.
 * @param {CanvasRenderingContext2D} ctx
 * @param {CanvasRenderingContext2D} fogCtx - this layer's half-resolution fog buffer (see
 *   fog.js's fogFace for what it holds).
 * @param {number} fogColor
 * @param {number} w
 * @param {number} h
 */
function compositeFogPass(ctx, fogCtx, fogColor, w, h) {
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(fogCtx.canvas, 0, 0, w, h);

  const fqr = fogColor >>> 16;
  const fqg = (fogColor >>> 8) & 255;
  const fqb = fogColor & 255;
  const fogColor16 =
    ((fqr & 0xf8) << 8) | ((fqg & 0xfc) << 3) | ((fqb & 0xf8) >> 3);
  const fogStyle = PALETTE_16BIT[fogColor16];

  if (filterInvertSupported) {
    fogCtx.filter = "invert(1)";
    fogCtx.drawImage(fogCtx.canvas, 0, 0);
    fogCtx.filter = "none";
  } else {
    fogCtx.globalCompositeOperation = "difference";
    fogCtx.fillStyle = "#ffffff";
    fogCtx.fillRect(0, 0, fogCtx.canvas.width, fogCtx.canvas.height);
    fogCtx.globalCompositeOperation = "source-over";
  }

  fogCtx.globalCompositeOperation = "multiply";
  fogCtx.fillStyle = fogStyle;
  fogCtx.fillRect(0, 0, fogCtx.canvas.width, fogCtx.canvas.height);
  fogCtx.globalCompositeOperation = "source-over";

  ctx.globalCompositeOperation = "lighter";
  ctx.drawImage(fogCtx.canvas, 0, 0, w, h);
  ctx.globalCompositeOperation = "source-over";
}
let pass = 0;
/**
 * Fog pass: only runs at all if drawTriangles' return value included NEEDS_FOG_PASS for this
 * layer (see render()) - draws this layer's flat-shaded faces, in the depth-dominant order
 * fogSort produced (see fog.js), into `fogCtx` (merging same-color same-mesh edge-adjacent
 * triangles via batchedFogFace along the way), then composites it onto `ctx` (see
 * compositeFogPass).
 * @param {CanvasRenderingContext2D} ctx
 * @param {CanvasRenderingContext2D} fogCtx - this layer's half-resolution fog buffer.
 * @param {Float32Array} vertexBuffer
 * @param {Uint32Array} vertexIndexBuffer
 * @param {Uint32Array} tempIndexBuffer - fogSort's output face indices.
 * @param {Uint32Array} meshIndexBuffer - per-face mesh index within this layer (see destructMesh).
 * @param {number} count - total valid entries in tempIndexBuffer, from fogSort.
 * @param {number} w - ctx's (not fogCtx's) width, for the final composite drawImage.
 * @param {number} h - ctx's (not fogCtx's) height, for the final composite drawImage.
 * @param {Float32Array} clipGeometryBuffer
 * @param {number} fogType
 * @param {number} fogColor
 * @param {number} fogNearPane
 * @param {number} fogFarPane
 * @param {Int32Array} ctxStateBuffer
 * @param {Int32Array} statsBuffer
 * @param {Int32Array} batchStateBuffer @param {Float32Array} batchCoordsBuffer
 * @param {Uint32Array} batchIdentityBuffer @param {Uint32Array} batchWalkOrderBuffer -
 *   batchedFogFace's pending-batch state, see its doc comment for the merge algorithm.
 */
export function fogTriangles(
  ctx,
  fogCtx,
  vertexBuffer,
  vertexIndexBuffer,
  tempIndexBuffer,
  meshIndexBuffer,
  count,
  w,
  h,
  clipGeometryBuffer,
  fogType,
  fogColor,
  fogNearPane,
  fogFarPane,
  ctxStateBuffer,
  statsBuffer,
  batchStateBuffer,
  batchCoordsBuffer,
  batchIdentityBuffer,
  batchWalkOrderBuffer,
) {
  const halfFogW = fogCtx.canvas.width * 0.5,
    halfFogH = fogCtx.canvas.height * 0.5;

  // Reset every frame - compositeFogPass mutates fogCtx in place, so stale pixels would leak.
  fogCtx.fillStyle = "#000000";
  fogCtx.fillRect(0, 0, fogCtx.canvas.width, fogCtx.canvas.height);

  // No batch carries over from the previous layer's fog pass.
  batchStateBuffer[FOG_BATCH_COLOR16] = -1;

  for (let i = 0; i < count; i++) {
    const idx = tempIndexBuffer[i];

    const v0Idx = vertexIndexBuffer[idx * 3];
    const v1Idx = vertexIndexBuffer[idx * 3 + 1];
    const v2Idx = vertexIndexBuffer[idx * 3 + 2];

    // Scaled into fogCtx's own half-resolution pixel space, not ctx's.
    const fpx0 = vertexBuffer[v0Idx] * halfFogW + halfFogW;
    const fpy0 = vertexBuffer[v0Idx + 1] * halfFogH + halfFogH;
    const fpx1 = vertexBuffer[v1Idx] * halfFogW + halfFogW;
    const fpy1 = vertexBuffer[v1Idx + 1] * halfFogH + halfFogH;
    const fpx2 = vertexBuffer[v2Idx] * halfFogW + halfFogW;
    const fpy2 = vertexBuffer[v2Idx + 1] * halfFogH + halfFogH;

    batchedFogFace(
      fogCtx,
      fpx0,
      fpy0,
      fpx1,
      fpy1,
      fpx2,
      fpy2,
      v0Idx,
      v1Idx,
      v2Idx,
      clipGeometryBuffer,
      idx,
      meshIndexBuffer[idx],
      fogType,
      fogNearPane,
      fogFarPane,
      ctxStateBuffer,
      statsBuffer,
      batchStateBuffer,
      batchCoordsBuffer,
      batchIdentityBuffer,
      batchWalkOrderBuffer,
    );
  }

  flushBatchedFogFace(fogCtx, statsBuffer, batchStateBuffer, batchCoordsBuffer, batchWalkOrderBuffer);

  compositeFogPass(ctx, fogCtx, fogColor, w, h);
}
