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

/**
 * Fog amount for one face: 0 at the near plane (untouched) through 1 at the far plane (fully
 * fogged), from the face's camera-space centroid. Per face rather than per vertex - the whole fog
 * pipeline treats a face as one flat fog value, which is what lets batchedFogFace merge
 * neighbours that agree.
 * @param {number} faceIdx - Index of the face, used to address clipGeometryBuffer.
 * @param {Float32Array} clipGeometryBuffer - Per-face-vertex camera-space positions, 9 per face.
 * @param {number} fogType - See CameraComponent.FogType; compared numerically here (0 NONE,
 *   1 RADIAL, 2 RADIAL_FAST, 3 LINEAR). Anything but those three lit types yields 0.
 * @param {number} fogNearPane - Distance at which fog starts.
 * @param {number} fogFarPane - Distance at which fog is total.
 * @returns {number} Fog amount clamped to [0, 1], so callers need no bounds guard of their own.
 */
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
 * @param {number} near - camera near clipping plane; with `far`, normalises depth into the
 *   16-bit key the depth passes bucket on - the same mapping radixSort uses.
 * @param {number} far - camera far clipping plane, as above.
 * @param {number} fogType - see computeFogAmount; selects how the fog bucket key is derived.
 * @param {number} fogNearPane - see computeFogAmount.
 * @param {number} fogFarPane - see computeFogAmount.
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
 * @param {number} px0 - first vertex x, already scaled into fogCtx's own pixel space.
 * @param {number} py0 - first vertex y.
 * @param {number} px1 - second vertex x.
 * @param {number} py1 - second vertex y.
 * @param {number} px2 - third vertex x.
 * @param {number} py2 - third vertex y.
 * @param {number} v0Idx - welded identity of the first vertex; the welder matches edges on these
 *   rather than on coordinates, so a hard-edge mesh still reports its shared edges as shared.
 * @param {number} v1Idx - welded identity of the second vertex.
 * @param {number} v2Idx - welded identity of the third vertex.
 * @param {Float32Array} clipGeometryBuffer - per-face-vertex camera-space positions, read by
 *   computeFogAmount.
 * @param {number} faceIdx - index of this face, used to address clipGeometryBuffer.
 * @param {number} meshIdx - this face's mesh index within the layer; the welder refuses to merge
 *   faces belonging to different meshes.
 * @param {number} fogType - see computeFogAmount.
 * @param {number} fogNearPane - see computeFogAmount.
 * @param {number} fogFarPane - see computeFogAmount.
 * @param {Int32Array} ctxStateBuffer - persistent per-layer ctx-state dedup cache; this pass uses
 *   its own CTX_STATE_FOG slot.
 * @param {Int32Array} statsBuffer - persistent per-layer draw-call counters.
 * @param {number} frameId - this frame's id; welder state left from an older frame is dropped
 *   rather than painted. See shaderRegistry.js's registerShader for the frameId/last contract.
 * @param {boolean} last - final face of the pass, see above.
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

/**
 * Whether `ctx.filter = "invert(1)"` actually inverts on this browser, probed once by inverting a
 * known black pixel and reading it back. compositeFogPass picks its invert on the result: the
 * filtered self-blit where it works, a `difference` fill with white where it does not. The two
 * produce byte-identical output.
 * @returns {boolean} True if the filter path is usable; the result is cached after the first call.
 */
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
 * @param {CanvasRenderingContext2D} ctx - this layer's fill buffer, composited onto in place.
 * @param {CanvasRenderingContext2D} fogCtx - this layer's fog buffer, holding the keep factor;
 *   inverted and tinted in place here, so it is consumed by this call.
 * @param {number} fogColor - packed 0xRRGGBB, quantised to the 5-6-5 palette before use.
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
 * Fog draw pass: draws this layer's flat-shaded faces, in the depth-dominant order fogSort
 * produced, into `fogCtx` - merging same-colour same-mesh edge-adjacent triangles via
 * batchedFogFace along the way. Gated in render() on the renderer-wide fog toggle and the
 * camera's fogType.
 *
 * Touches no canvas but `fogCtx`, and leaves it holding the keep factor. render() composites it
 * onto the fill layer separately, afterwards (see compositeFogPass).
 *
 * The buffer is cleared to opaque black first, which reads as keep=0 - fully fogged - so any
 * area no face covers ends up pure fogColor once composited. That black is load-bearing, not
 * just a reset.
 * @param {CanvasRenderingContext2D} fogCtx - this layer's fog buffer.
 * @param {Float32Array} vertexBuffer - Screen-space vertices, [x0, y0, x1, y1, ...].
 * @param {Uint32Array} vertexIndexBuffer - Per-face-vertex offsets into vertexBuffer.
 * @param {Uint32Array} weldIdBuffer - Per-face-vertex adjacency identities (see destructMesh).
 * @param {Uint32Array} tempIndexBuffer - fogSort's output face indices.
 * @param {Uint32Array} meshIndexBuffer - per-face mesh index within this layer (see destructMesh).
 * @param {number} count - total valid entries in tempIndexBuffer, from fogSort.
 * @param {Float32Array} clipGeometryBuffer - Per-face-vertex camera-space positions.
 * @param {number} fogType - See computeFogAmount.
 * @param {number} fogNearPane - See computeFogAmount.
 * @param {number} fogFarPane - See computeFogAmount.
 * @param {Int32Array} ctxStateBuffer - Persistent per-layer ctx-state dedup cache; this pass uses
 *   its own CTX_STATE_FOG slot.
 * @param {Int32Array} statsBuffer - Persistent per-layer draw-call counters.
 * @param {number} frameId - this frame's id, see batchedFogFace's doc comment and
 *   shaderRegistry.js's registerShader for the frameId/last contract.
 */
export function fogTriangles(
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
