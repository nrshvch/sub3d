import { PALETTE_16BIT } from "../../palette.js";
import { ALBEDO_FLAT, TEXTURE } from "../shaderRegistry.js";

import {
  createWeldState,
  weldAddFace,
  weldFlushAll,
  weldReset,
} from "../../shared/weld.js";

// This pass's pending geometry, keyed on quantised fog amount rather than albedo.
const weldState = createWeldState();

// Perpendicular deviation, in fogCtx pixels, below which a boundary vertex is dropped at flush.
const COLLINEAR_EPS = 0.05;

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
 * Four-pass stable counting sort of this layer's flat-shaded faces into tempIndexBuffer - the
 * exact same significance hierarchy and pass structure as radixSort.js ([Depth (Most
 * Significant)] -> [Mesh Index] -> [Fog Bucket (Least Significant)]), with fog bucket substituted
 * for shaderPass as the extra key. Anything else is skipped outright, never written to any buffer.
 *
 * Both flat fill shaders participate: fog is a function of depth alone, so an albedo face and a
 * textured one at the same distance are fogged identically, and admitting only one of them would
 * leave the other sitting on the buffer's black background - which reads as fully fogged.
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
 * @param {Uint8Array} shaderTypeBuffer - per-face shader key; only the flat fills participate.
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
    const key = shaderTypeBuffer[idx];
    if (key !== ALBEDO_FLAT && key !== TEXTURE) continue;
    const fogAmount = computeFogAmount(
      idx,
      clipGeometryBuffer,
      fogType,
      fogNearPane,
      fogFarPane,
    );
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
    const key = shaderTypeBuffer[idx];
    if (key !== ALBEDO_FLAT && key !== TEXTURE) continue;
    const fogAmount = computeFogAmount(
      idx,
      clipGeometryBuffer,
      fogType,
      fogNearPane,
      fogFarPane,
    );
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
 * Quantises this face's fog amount to a colour and hands it to the welder.
 *
 * Draws every face unconditionally - no fogAmount-based skip. A "fully fogged" face still has to
 * be drawn to correctly occlude whatever is underneath it in fogCtx, since depth-dominant draw
 * order means it is no longer safe to assume nothing but background is there. (The reverse case,
 * skipping the ~60% of faces whose fog amount is zero, would need fogCtx reset to white and an
 * alpha-aware composite: the buffer's black background currently means "fully fogged", which is
 * what makes the empty sky come out exactly fogColor.)
 *
 * `last` is true only for the final face fogTriangles passes in, so it is this pass's single
 * drain: the face is merged normally first, then every open polygon is flushed.
 * @param {CanvasRenderingContext2D} fogCtx - this layer's fog buffer.
 * @param {number} px0 @param {number} py0
 * @param {number} px1 @param {number} py1
 * @param {number} px2 @param {number} py2 - unexpanded triangle coords, already scaled to
 *   fogCtx's pixel space by the caller.
 * @param {number} v0Idx @param {number} v1Idx @param {number} v2Idx
 * @param {Float32Array} clipGeometryBuffer
 * @param {number} faceIdx @param {number} meshIdx
 * @param {number} fogType @param {number} fogNearPane @param {number} fogFarPane
 * @param {Int32Array} ctxStateBuffer @param {Int32Array} statsBuffer
 * @param {number} frameId @param {boolean} last - see shaderRegistry.js's registerShader doc
 *   comment for the frameId/last contract.
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
  frameId,
  last,
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

  if (weldState.frameId !== frameId) {
    // State from a frame that is over: drop it rather than painting last frame's geometry.
    weldReset(weldState);
    weldState.frameId = frameId;
  }

  weldAddFace(
    weldState,
    fogCtx,
    ctxStateBuffer,
    CTX_STATE_FOG,
    -1,
    statsBuffer,
    STATS_FOG_DRAW_CALLS,
    COLLINEAR_EPS,
    color16,
    meshIdx,
    px0,
    py0,
    v0Idx,
    px1,
    py1,
    v1Idx,
    px2,
    py2,
    v2Idx,
  );

  // Fog's `last` only fires on the final face of the whole pass (fogSort emits shaderKey-0 faces
  // only), so this is the single drain for the pass.
  if (last) {
    weldFlushAll(
      weldState,
      fogCtx,
      ctxStateBuffer,
      CTX_STATE_FOG,
      -1,
      statsBuffer,
      STATS_FOG_DRAW_CALLS,
      COLLINEAR_EPS,
    );
  }
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
 * @param {CanvasRenderingContext2D} fogCtx - this layer's fog buffer (see
 *   fog.js's fogFace for what it holds).
 * @param {number} fogColor
 */
export function compositeFogPass(ctx, fogCtx, fogColor) {
  const cnv = ctx.canvas
  const fogCnv = fogCtx.canvas;
  const w = cnv.width;
  const h = cnv.height;
  const fogW = fogCnv.width;
  const fogH = fogCnv.height;

  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(fogCnv, 0, 0, w, h);

  const fqr = fogColor >>> 16;
  const fqg = (fogColor >>> 8) & 255;
  const fqb = fogColor & 255;
  const fogColor16 =
    ((fqr & 0xf8) << 8) | ((fqg & 0xfc) << 3) | ((fqb & 0xf8) >> 3);
  const fogStyle = PALETTE_16BIT[fogColor16];

  if (filterInvertSupported) {
    fogCtx.filter = "invert(1)";
    fogCtx.drawImage(fogCnv, 0, 0);
    fogCtx.filter = "none";
  } else {
    fogCtx.globalCompositeOperation = "difference";
    fogCtx.fillStyle = "#ffffff";
    fogCtx.fillRect(0, 0, fogW, fogH);
    fogCtx.globalCompositeOperation = "source-over";
  }

  fogCtx.globalCompositeOperation = "multiply";
  fogCtx.fillStyle = fogStyle;
  fogCtx.fillRect(0, 0, fogW, fogH);
  fogCtx.globalCompositeOperation = "source-over";

  ctx.globalCompositeOperation = "lighter";
  ctx.drawImage(fogCnv, 0, 0, w, h);
  ctx.globalCompositeOperation = "source-over";
}

/**
 * Fog pass: only runs at all if drawTriangles' return value included NEEDS_FOG_PASS for this
 * layer (see render()) - draws this layer's flat-shaded faces, in the depth-dominant order
 * fogSort produced (see fog.js), into `fogCtx` (merging same-color same-mesh edge-adjacent
 * triangles via batchedFogFace along the way), then composites it onto `ctx` (see
 * compositeFogPass).
 * @param {CanvasRenderingContext2D} ctx
 * @param {CanvasRenderingContext2D} fogCtx - this layer's fog buffer.
 * @param {Float32Array} vertexBuffer
 * @param {Uint32Array} vertexIndexBuffer
 * @param {Uint32Array} weldIdBuffer
 * @param {Uint32Array} tempIndexBuffer - fogSort's output face indices.
 * @param {Uint32Array} meshIndexBuffer - per-face mesh index within this layer (see destructMesh).
 * @param {number} count - total valid entries in tempIndexBuffer, from fogSort.
 * @param {Float32Array} clipGeometryBuffer
 * @param {number} fogType
 * @param {number} fogNearPane
 * @param {number} fogFarPane
 * @param {Int32Array} ctxStateBuffer
 * @param {Int32Array} statsBuffer
 * @param {number} frameId - this frame's id, see batchedFogFace's doc comment and
 *   shaderRegistry.js's registerShader for the frameId/last contract.
 */
export function fogTriangles(
  ctx,
  fogCtx,
  vertexBuffer,
  vertexIndexBuffer,
  weldIdBuffer,
  tempIndexBuffer,
  meshIndexBuffer,
  count,
  clipGeometryBuffer,
  fogType,
  fogNearPane,
  fogFarPane,
  ctxStateBuffer,
  statsBuffer,
  frameId,
) {
  const cnv = fogCtx.canvas;
  const w = cnv.width;
  const h = cnv.height;
  const halfFogW = w * 0.5,
    halfFogH = h * 0.5;

  // Reset every frame - compositeFogPass mutates fogCtx in place, so stale pixels would leak.
  fogCtx.fillStyle = "#000000";
  fogCtx.fillRect(0, 0, w, h);

  for (let i = 0; i < count; i++) {
    const idx = tempIndexBuffer[i];

    const v0Idx = vertexIndexBuffer[idx * 3];
    const v1Idx = vertexIndexBuffer[idx * 3 + 1];
    const v2Idx = vertexIndexBuffer[idx * 3 + 2];

    // Coordinates from the vertexBuffer offsets above; edge-match identities from weldIdBuffer,
    // so split vertices at one physical position are seen as one (see Canvas2dRenderer's
    // destructMesh and MeshComponent#updateWeldMap).
    const w0Idx = weldIdBuffer[idx * 3];
    const w1Idx = weldIdBuffer[idx * 3 + 1];
    const w2Idx = weldIdBuffer[idx * 3 + 2];

    // Scaled into fogCtx's own pixel space, not ctx's.
    const fpx0 = vertexBuffer[v0Idx] * halfFogW + halfFogW;
    const fpy0 = vertexBuffer[v0Idx + 1] * halfFogH + halfFogH;
    const fpx1 = vertexBuffer[v1Idx] * halfFogW + halfFogW;
    const fpy1 = vertexBuffer[v1Idx + 1] * halfFogH + halfFogH;
    const fpx2 = vertexBuffer[v2Idx] * halfFogW + halfFogW;
    const fpy2 = vertexBuffer[v2Idx + 1] * halfFogH + halfFogH;

    // Every face fogSort emits goes through this one routine whatever its fill shader was, so the
    // only run boundary that matters is the very last face in this pass.
    const last = i === count - 1;

    batchedFogFace(
      fogCtx,
      fpx0,
      fpy0,
      fpx1,
      fpy1,
      fpx2,
      fpy2,
      w0Idx,
      w1Idx,
      w2Idx,
      clipGeometryBuffer,
      idx,
      meshIndexBuffer[idx],
      fogType,
      fogNearPane,
      fogFarPane,
      ctxStateBuffer,
      statsBuffer,
      frameId,
      last,
    );
  }
}
