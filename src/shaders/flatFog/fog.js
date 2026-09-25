import { PALETTE_16BIT, WHITE16 } from "../../palette.js";
import { ALBEDO_FLAT, GOURAUD_SHADE, TEXTURE } from "../shaderRegistry.js";

import {
  createWeldState,
  weldAddFace,
  weldFlushAll,
  weldReset,
} from "../../shared/weld.js";
import {
  computeExpandMasks,
  CTX_STATE_FILL_PASS_FILL_STYLE_SLOT,
  STATS_VERTICES_OFFSET,
} from "../../shared/shaders.js";

// This pass's pending geometry, keyed on quantised fog amount rather than albedo.
const weldState = createWeldState();

// This pass's per-face scratch, grown to the layer's face count and never shrunk. prepareFog
// rewrites every entry in range each frame, so growing never has to carry the old contents over.
let fogAmountBuffer = new Float32Array(0);
let fogSkipBuffer = new Uint8Array(0);

// What prepareFog learned on its way past this layer's faces, read only by fogPass:
// [facesToDraw, anyFogged, allFullyFogged]
const prepared = new Int32Array(4);
const PREP_FACE_COUNT = 0;
const PREP_ANY_FOGGED = 1;
const PREP_ALL_FOGGED = 2;

// Screen bounds of every face that is not fully fogged, as [minX, minY, maxX, maxY] in fogCtx
// pixels. Inverted when there are none, so an empty union fails every overlap test.
const litBounds = new Float32Array(4);

// Perpendicular deviation, in fogCtx pixels, below which a boundary vertex is dropped at flush.
const COLLINEAR_EPS = 0.05;

// Slots into the shared ctxStateBuffer/statsBuffer Canvas2dRenderer.js owns (see
// shaderRegistry.js's registerShader doc comment for the full layout of the rest).
export const CTX_STATE_FOG = 9;
export const STATS_FOG_DRAW_CALLS = 1;
export const STATS_FOG_VERTICES = STATS_FOG_DRAW_CALLS + STATS_VERTICES_OFFSET;

// Microseconds, not milliseconds: these share the integer statsBuffer with the draw-call
// counters, and a fog pass under a millisecond would otherwise round to nothing.
export const STATS_FOG_SORT_MS = 4;
export const STATS_FOG_RASTER_MS = 5;

// The fog buffer is cleared to opaque black, which reads as keep=0 - fully fogged - and is also
// exactly what a face past fogFar quantises to. See fogTriangles.
const FOG_BACKGROUND16 = 0;

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
 * One pass over this layer's faces, ahead of the sort: computes every face's fog amount once,
 * decides whether the pass has anything to contribute at all, and marks the faces that would
 * paint nothing.
 *
 * Three findings come out of it, and each is exact rather than conservative-by-luck:
 *
 * 1. **Whether to run at all.** Every face unfogged means the buffer would come out uniformly
 *    "keep everything" white, which composites back as the identity - so the whole pass, sort
 *    included, is skipped. Note the mirror case does NOT qualify: a layer where everything is
 *    fully fogged still has to run, because the black buffer is what turns the frame fogColor.
 * 2. **Faces that cannot matter.** A fully fogged face paints the buffer's own black. It can only
 *    change a pixel where something lighter got there first, so a face whose screen bounds miss
 *    the union bounds of every not-fully-fogged face is dropped whatever the draw order turns out
 *    to be. When nothing is lit that union is empty and every fully fogged face drops.
 * 3. **Faces this pass never draws.** fogSort admits only the flat fill keys, so anything else is
 *    marked here rather than re-filtered inside the sort.
 *
 * Worked example: a thick-fog frame where the near band is lit and everything beyond it is
 * saturated. `litBounds` ends up the screen box of that band, and every fully fogged face outside
 * it - most of the frame - is marked skipped, leaving the sort and the raster the band plus its
 * immediate surroundings.
 *
 * @param {Uint32Array} indexBuffer - this layer's depth-sorted face indices (radixSort's output).
 * @param {Uint8Array} shaderTypeBuffer - per-face shader key; only the flat fills participate.
 * @param {Float32Array} clipGeometryBuffer - per-face-vertex camera-space positions.
 * @param {Float32Array} vertexBuffer - screen-space vertices, [x0, y0, x1, y1, ...].
 * @param {Uint32Array} vertexIndexBuffer - per-face-vertex offsets into vertexBuffer.
 * @param {Float32Array} outFogAmount - out: per-face fog amount, written for every face examined
 *   and read again by the sort and the raster so it is computed exactly once.
 * @param {Uint8Array} outSkip - out: per face, 1 where the face is not to be drawn at all.
 * @param {number} count - number of faces in indexBuffer to consider, starting at index 0.
 * @param {number} halfWidth - half the fog canvas width, for scaling into its pixel space.
 * @param {number} halfHeight - half the fog canvas height.
 * @param {number} fogType - see computeFogAmount.
 * @param {number} fogNearPane - see computeFogAmount.
 * @param {number} fogFarPane - see computeFogAmount.
 */
function prepareFog(
  indexBuffer,
  shaderTypeBuffer,
  clipGeometryBuffer,
  vertexBuffer,
  vertexIndexBuffer,
  outFogAmount,
  outSkip,
  count,
  halfWidth,
  halfHeight,
  fogType,
  fogNearPane,
  fogFarPane,
) {
  prepared[PREP_FACE_COUNT] = 0;
  prepared[PREP_ANY_FOGGED] = 0;
  prepared[PREP_ALL_FOGGED] = 0;

  // Inverted, so the first lit face replaces both ends and a layer with none leaves bounds that
  // no face can overlap.
  litBounds[0] = Infinity;
  litBounds[1] = Infinity;
  litBounds[2] = -Infinity;
  litBounds[3] = -Infinity;

  let fogFaceCount = 0;
  let fullyFoggedCount = 0;

  for (let i = 0; i < count; i++) {
    const idx = indexBuffer[i];
    const key = shaderTypeBuffer[idx];

    // The flat-fill family, by what the FILL pass draws: GOURAUD_SHADE is here because its fill is
    // avgFlatShaderFill, whatever its shade pass does. A key left out is marked skipped and keeps this
    // buffer's black background, which composites as FULLY fogged - so omitting a flat-filled key
    // renders its meshes solid fogColor rather than merely unfogged.
    if (key !== ALBEDO_FLAT && key !== TEXTURE && key !== GOURAUD_SHADE) {
      outSkip[idx] = 1;
      continue;
    }

    const fogAmount = computeFogAmount(
      idx,
      clipGeometryBuffer,
      fogType,
      fogNearPane,
      fogFarPane,
    );
    outFogAmount[idx] = fogAmount;
    outSkip[idx] = 0;
    fogFaceCount++;

    if (fogAmount > 0) prepared[PREP_ANY_FOGGED] = 1;

    if (fogAmount >= 1) {
      fullyFoggedCount++;
      continue;
    }

    // Not fully fogged, so it is one of the faces a black face could have to paint over.
    const v0Idx = vertexIndexBuffer[idx * 3];
    const v1Idx = vertexIndexBuffer[idx * 3 + 1];
    const v2Idx = vertexIndexBuffer[idx * 3 + 2];
    const x0 = vertexBuffer[v0Idx] * halfWidth + halfWidth;
    const y0 = vertexBuffer[v0Idx + 1] * halfHeight + halfHeight;
    const x1 = vertexBuffer[v1Idx] * halfWidth + halfWidth;
    const y1 = vertexBuffer[v1Idx + 1] * halfHeight + halfHeight;
    const x2 = vertexBuffer[v2Idx] * halfWidth + halfWidth;
    const y2 = vertexBuffer[v2Idx + 1] * halfHeight + halfHeight;

    let minX = x0 < x1 ? x0 : x1;
    if (x2 < minX) minX = x2;
    let maxX = x0 > x1 ? x0 : x1;
    if (x2 > maxX) maxX = x2;
    let minY = y0 < y1 ? y0 : y1;
    if (y2 < minY) minY = y2;
    let maxY = y0 > y1 ? y0 : y1;
    if (y2 > maxY) maxY = y2;

    if (minX < litBounds[0]) litBounds[0] = minX;
    if (minY < litBounds[1]) litBounds[1] = minY;
    if (maxX > litBounds[2]) litBounds[2] = maxX;
    if (maxY > litBounds[3]) litBounds[3] = maxY;
  }

  prepared[PREP_FACE_COUNT] = fogFaceCount;

  // Nothing fogged, or nothing to draw: the caller drops the pass and never looks at the rest.
  if (prepared[PREP_ANY_FOGGED] === 0 || fogFaceCount === 0) return;

  // Nothing lit anywhere, so the buffer stays the black it was cleared to from edge to edge and
  // the composite resolves to flat fogColor. The caller paints that directly; the second walk
  // below would only mark every face skipped to reach the same place the long way round.
  if (fullyFoggedCount === fogFaceCount) {
    prepared[PREP_ALL_FOGGED] = 1;
    return;
  }

  // Second walk, now that the lit union is closed: a fully fogged face clear of it can never
  // cover anything but the background it is the colour of. Only worth walking when there are
  // fully fogged faces to test and something lit for them to miss.
  if (fullyFoggedCount === 0) return;

  const litMinX = litBounds[0];
  const litMinY = litBounds[1];
  const litMaxX = litBounds[2];
  const litMaxY = litBounds[3];

  for (let i = 0; i < count; i++) {
    const idx = indexBuffer[i];
    if (outSkip[idx] === 1 || outFogAmount[idx] < 1) continue;

    const v0Idx = vertexIndexBuffer[idx * 3];
    const v1Idx = vertexIndexBuffer[idx * 3 + 1];
    const v2Idx = vertexIndexBuffer[idx * 3 + 2];
    const x0 = vertexBuffer[v0Idx] * halfWidth + halfWidth;
    const y0 = vertexBuffer[v0Idx + 1] * halfHeight + halfHeight;
    const x1 = vertexBuffer[v1Idx] * halfWidth + halfWidth;
    const y1 = vertexBuffer[v1Idx + 1] * halfHeight + halfHeight;
    const x2 = vertexBuffer[v2Idx] * halfWidth + halfWidth;
    const y2 = vertexBuffer[v2Idx + 1] * halfHeight + halfHeight;

    let minX = x0 < x1 ? x0 : x1;
    if (x2 < minX) minX = x2;
    if (minX > litMaxX) {
      outSkip[idx] = 1;
      fogFaceCount--;
      continue;
    }
    let maxX = x0 > x1 ? x0 : x1;
    if (x2 > maxX) maxX = x2;
    if (maxX < litMinX) {
      outSkip[idx] = 1;
      fogFaceCount--;
      continue;
    }
    let minY = y0 < y1 ? y0 : y1;
    if (y2 < minY) minY = y2;
    if (minY > litMaxY) {
      outSkip[idx] = 1;
      fogFaceCount--;
      continue;
    }
    let maxY = y0 > y1 ? y0 : y1;
    if (y2 > maxY) maxY = y2;
    if (maxY < litMinY) {
      outSkip[idx] = 1;
      fogFaceCount--;
    }
  }

  prepared[PREP_FACE_COUNT] = fogFaceCount;
}

/**
 * Four-pass stable counting sort of this layer's flat-shaded faces into tempIndexBuffer - the
 * exact same significance hierarchy and pass structure as radixSort.js ([Depth (Most
 * Significant)] -> [Mesh Index] -> [Fog Bucket (Least Significant)]), with fog bucket substituted
 * for shaderPass as the extra key. Anything else is skipped outright, never written to any buffer.
 *
 * Every flat-filled key participates: fog is a function of depth alone, so an albedo face, a
 * textured one and a Gouraud-shaded one at the same distance are fogged identically, and admitting
 * only some of them would leave the rest sitting on the buffer's black background - which reads as
 * fully fogged.
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
 * @param {Uint32Array} meshIndexBuffer - per-face mesh index within this layer (see destructMesh).
 * @param {Float32Array} depthBuffer - per-face depth, same values/units radixSort sorts by.
 * @param {Float32Array} fogAmountBuffer - per-face fog amount from prepareFog, read not recomputed.
 * @param {Uint8Array} fogSkipBuffer - per face, 1 where prepareFog decided the face is not drawn;
 *   those never reach any buffer, so they cost the sort nothing beyond this one test.
 * @param {Uint32Array} counters - scratch counting-sort buckets, reused across all 4 passes.
 * @param {number} count - number of faces in indexBuffer to consider, starting at index 0.
 * @param {number} near - camera near clipping plane; with `far`, normalises depth into the
 *   16-bit key the depth passes bucket on - the same mapping radixSort uses.
 * @param {number} far - camera far clipping plane, as above.
 * @returns {number} the number of faces written to tempIndexBuffer.
 */
export function fogSort(
  indexBuffer,
  tempIndexBuffer,
  scratchBuffer,
  meshIndexBuffer,
  depthBuffer,
  fogAmountBuffer,
  fogSkipBuffer,
  counters,
  count,
  near,
  far,
) {
  if (count === 0) return 0;

  const invDepthRange = far - near > 0.0001 ? 65535.0 / (far - near) : 0;

  // Pass 1 (least significant): fog bucket - also where prepareFog's verdict is applied, since
  // this is the only pass that reads every candidate face regardless of the final face count.
  counters.fill(0, 0, 32);
  let fogFaceCount = 0;
  for (let i = 0; i < count; i++) {
    const idx = indexBuffer[i];
    if (fogSkipBuffer[idx] === 1) continue;
    const bucket = ((255 * (1 - fogAmountBuffer[idx])) & 0xf8) >> 3;
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
    if (fogSkipBuffer[idx] === 1) continue;
    const bucket = ((255 * (1 - fogAmountBuffer[idx])) & 0xf8) >> 3;
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
 * One face still gets dropped here rather than in prepareFog, because it is the only rule that
 * needs the finished draw order: while nothing but the black clear has been painted, a fully
 * fogged face is black on black and cannot matter. prepareFog's own rule is order-independent by
 * construction (it asks whether a face can overlap ANY lit face), so this catches the fully
 * fogged faces that do overlap the lit region but are drawn before it. One comparison per face.
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
 * @param {number} fogAmount - this face's fog amount, computed once by prepareFog.
 * @param {number} meshIdx - this face's mesh index within the layer; the welder refuses to merge
 *   faces belonging to different meshes.
 * @param {boolean} bufferDirty - false while nothing but the cleared background has been handed
 *   to this pass, which is what makes a background-coloured face droppable on sight.
 * @param {Int32Array} ctxStateBuffer - persistent per-layer ctx-state dedup cache; this pass uses
 *   its own CTX_STATE_FOG slot.
 * @param {Int32Array} statsBuffer - persistent per-layer draw-call counters.
 * @param {number} frameId - this frame's id; welder state left from an older frame is dropped
 *   rather than painted. See shaderRegistry.js's registerShader for the frameId/last contract.
 * @param {boolean} last - final face of the pass, see above.
 * @param {number} expandMask - 1 bit per triangle edge (edge k runs from corner k to corner k+1),
 *   set where this face owns that edge's seam repair. See computeExpandMasks in shared/shaders.js.
 * @returns {boolean} `bufferDirty` for the next face: true once anything other than background
 *   has been handed to the welder.
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
  fogAmount,
  meshIdx,
  bufferDirty,
  ctxStateBuffer,
  statsBuffer,
  frameId,
  last,
  // 1 bit per triangle edge: this face owns that edge's seam repair and must push it outward at
  // flush. See computeExpandMasks in shared/shaders.js and weldFlushSlot in shared/weld.js.
  expandMask,
) {
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

  // Background over untouched background: no geometry has painted anything else yet, so there is
  // nothing here to occlude.
  if (bufferDirty || color16 !== FOG_BACKGROUND16) {
    if (color16 !== FOG_BACKGROUND16) bufferDirty = true;
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
      expandMask,
    );
  }

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

  return bufferDirty;
}

/**
 * Composites this layer's fog buffer onto `ctx` as `fill * keep + fogColor * (1 - keep)`.
 *
 * The fogColor term needs `1 - keep`, and the only inversion Canvas2D offers is `difference`,
 * which Firefox's accelerated canvas cannot draw: the canvas doing it falls back to software
 * every frame and demotes for good by frame 10. So `difference` runs only on `compositeCtx`, and
 * every other blend stays on accelerated-capable canvases:
 *
 *   ctx          *= keep                                        multiply
 *   fogCtx        = screen(keep, 1 - c) = keep * c + (1 - c)    screen
 *   compositeCtx  = |white - fogCtx|    = c * (1 - keep)        difference
 *   ctx          += compositeCtx                                lighter
 *
 * e.g. keep = 0.25, c = 0.8: fogCtx = 0.2 + 0.2 = 0.4, compositeCtx = 0.6 = 0.8 * 0.75.
 * `1 - c` is exact on the palette: complementing a 5-6-5 index complements its 8-bit expansion.
 * @param {CanvasRenderingContext2D} ctx - this layer's fill buffer, composited onto in place.
 * @param {CanvasRenderingContext2D} fogCtx - this layer's fog buffer, holding the keep factor;
 *   rewritten in place here, so it is consumed by this call.
 * @param {CanvasRenderingContext2D} compositeCtx - scratch the size of `fogCtx`, overwritten.
 * @param {number} fogColor - packed 0xRRGGBB, quantised to the 5-6-5 palette before use.
 */
export function compositeFogPass(ctx, fogCtx, compositeCtx, fogColor) {
  const cnv = ctx.canvas;
  const fogCnv = fogCtx.canvas;
  const compositeCnv = compositeCtx.canvas;
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

  fogCtx.globalCompositeOperation = "screen";
  fogCtx.fillStyle = PALETTE_16BIT[fogColor16 ^ WHITE16];
  fogCtx.fillRect(0, 0, fogW, fogH);
  fogCtx.globalCompositeOperation = "source-over";

  compositeCtx.drawImage(fogCnv, 0, 0, fogW, fogH);
  compositeCtx.globalCompositeOperation = "difference";
  compositeCtx.fillStyle = "#ffffff";
  compositeCtx.fillRect(0, 0, fogW, fogH);
  compositeCtx.globalCompositeOperation = "source-over";

  ctx.globalCompositeOperation = "lighter";
  ctx.drawImage(compositeCnv, 0, 0, w, h);
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
 * @param {Uint8Array} expandMaskBuffer - out: per face, 1 bit per edge, set where this face owns
 *   that edge's seam repair. Recomputed here against fog's own draw order, which differs from the
 *   fill pass's because fogSort sorts separately.
 * @param {Int32Array} neighbourFaceBuffer - per face vertex, the neighbouring face's index or a
 *   no-neighbour sentinel (see destructMesh).
 * @param {Int32Array} faceRankBuffer - scratch for the ownership pass, -1 in and -1 out.
 * @param {number} count - total valid entries in tempIndexBuffer, from fogSort.
 * @param {Float32Array} fogAmountBuffer - Per-face fog amount from prepareFog.
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
  expandMaskBuffer,
  neighbourFaceBuffer,
  faceRankBuffer,
  count,
  fogAmountBuffer,
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

  // Fog has its own sort, so its draw order - and with it which side of each shared edge owns the
  // seam repair - differs from the fill pass's. Recompute against this order.
  computeExpandMasks(
    tempIndexBuffer,
    0,
    count,
    neighbourFaceBuffer,
    faceRankBuffer,
    expandMaskBuffer,
  );

  // False until something other than the black clear has been handed to the welder - see
  // batchedFogFace, which both reads and advances it.
  let bufferDirty = false;

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

    bufferDirty = batchedFogFace(
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
      fogAmountBuffer[idx],
      meshIndexBuffer[idx],
      bufferDirty,
      ctxStateBuffer,
      statsBuffer,
      frameId,
      last,
      expandMaskBuffer[idx],
    );
  }
}

/**
 * The whole fog pass, as one call: decide, sort, rasterise, composite.
 *
 * Fog is a post-process over what the fill and shade passes already drew, and this is the only
 * entry point into it - the renderer hands over the buffers and the camera's fog settings and
 * gets back a composited fill canvas, without learning whether any of the three inner steps
 * actually ran. Skipping is decided here (see prepareFog), so no other pass may depend on this
 * one having erased anything: fillTriangles and shadeTriangles clear their own buffers
 * unconditionally for exactly that reason.
 *
 * A layer with no fog on it anywhere is dropped whole - sort, raster and the five full-screen
 * composite steps - because the buffer would have come out uniformly white and composited back
 * as the identity. Measured on isometric-world's default view, where nothing on screen is
 * fogged: whole frame 1.9ms -> 1.5ms.
 *
 * @param {CanvasRenderingContext2D} fillCtx - this layer's fill buffer, composited onto in place.
 * @param {CanvasRenderingContext2D} fogCtx - this layer's fog buffer, cleared and consumed here.
 * @param {CanvasRenderingContext2D} fogCompositeCtx - scratch the size of `fogCtx` that the
 *   composite inverts the buffer in, see compositeFogPass.
 * @param {Float32Array} vertexBuffer - screen-space vertices, [x0, y0, x1, y1, ...].
 * @param {Uint32Array} vertexIndexBuffer - per-face-vertex offsets into vertexBuffer.
 * @param {Uint32Array} weldIdBuffer - per-face-vertex adjacency identities (see destructMesh).
 * @param {Uint32Array} indexBuffer - this layer's depth-sorted face indices (radixSort's output).
 * @param {Uint32Array} tempIndexBuffer - fogSort's output, and its scratch on the way there.
 * @param {Uint32Array} fogSortScratchBuffer - fogSort's ping-pong partner for tempIndexBuffer.
 * @param {Uint8Array} shaderTypeBuffer - per-face shader key; only the flat fills participate.
 * @param {Uint32Array} meshIndexBuffer - per-face mesh index within this layer.
 * @param {Float32Array} depthBuffer - per-face depth, same values/units radixSort sorts by.
 * @param {Float32Array} clipGeometryBuffer - per-face-vertex camera-space positions.
 * @param {Uint8Array} expandMaskBuffer - scratch for this pass's seam ownership, see fogTriangles.
 * @param {Int32Array} neighbourFaceBuffer - per face vertex, the neighbouring face across that
 *   edge, or -1 (see destructMesh).
 * @param {Int32Array} faceRankBuffer - scratch for the ownership pass, -1 in and -1 out.
 * @param {Uint32Array} counters - scratch counting-sort buckets for fogSort.
 * @param {number} count - number of faces in indexBuffer to consider, starting at index 0.
 * @param {number} near - camera near clipping plane, for fogSort's depth key.
 * @param {number} far - camera far clipping plane, as above.
 * @param {number} fogType - see computeFogAmount.
 * @param {number} fogNearPane - see computeFogAmount.
 * @param {number} fogFarPane - see computeFogAmount.
 * @param {number} fogColor - packed 0xRRGGBB the fog tends to, see compositeFogPass.
 * @param {Int32Array} ctxStateBuffer - persistent per-layer ctx-state dedup cache.
 * @param {Int32Array} statsBuffer - persistent per-layer counters; this pass reports its own draw
 *   calls, the faces it dropped, and how long its two phases took into their lanes there.
 * @param {number} frameId - this frame's id, see shaderRegistry.js's registerShader.
 */
export function fogPass(
  fillCtx,
  fogCtx,
  fogCompositeCtx,
  vertexBuffer,
  vertexIndexBuffer,
  weldIdBuffer,
  indexBuffer,
  tempIndexBuffer,
  fogSortScratchBuffer,
  shaderTypeBuffer,
  meshIndexBuffer,
  depthBuffer,
  clipGeometryBuffer,
  expandMaskBuffer,
  neighbourFaceBuffer,
  faceRankBuffer,
  counters,
  count,
  near,
  far,
  fogType,
  fogNearPane,
  fogFarPane,
  fogColor,
  ctxStateBuffer,
  statsBuffer,
  frameId,
) {
  const cnv = fogCtx.canvas;

  if (fogAmountBuffer.length < count) {
    fogAmountBuffer = new Float32Array(count);
    fogSkipBuffer = new Uint8Array(count);
  }

  prepareFog(
    indexBuffer,
    shaderTypeBuffer,
    clipGeometryBuffer,
    vertexBuffer,
    vertexIndexBuffer,
    fogAmountBuffer,
    fogSkipBuffer,
    count,
    cnv.width * 0.5,
    cnv.height * 0.5,
    fogType,
    fogNearPane,
    fogFarPane,
  );

  if (prepared[PREP_ANY_FOGGED] === 0) return;

  // Every face fully fogged: the buffer would be black edge to edge, and `fill * 0 + fogColor`
  // is fogColor everywhere, sky included. Paint that and skip the sort, the raster and all five
  // composite steps. The fill pass's style cache described this canvas and no longer does.
  if (prepared[PREP_ALL_FOGGED] === 1) {
    const fqr = fogColor >>> 16;
    const fqg = (fogColor >>> 8) & 255;
    const fqb = fogColor & 255;
    const fogColor16 =
      ((fqr & 0xf8) << 8) | ((fqg & 0xfc) << 3) | ((fqb & 0xf8) >> 3);
    fillCtx.fillStyle = PALETTE_16BIT[fogColor16];
    fillCtx.fillRect(0, 0, fillCtx.canvas.width, fillCtx.canvas.height);
    ctxStateBuffer[CTX_STATE_FILL_PASS_FILL_STYLE_SLOT] = -1;
    return;
  }

  const sortStart = performance.now();
  const fogFaceCount = fogSort(
    indexBuffer,
    tempIndexBuffer,
    fogSortScratchBuffer,
    meshIndexBuffer,
    depthBuffer,
    fogAmountBuffer,
    fogSkipBuffer,
    counters,
    count,
    near,
    far,
  );
  statsBuffer[STATS_FOG_SORT_MS] = performance.now() - sortStart;

  const rasterStart = performance.now();
  fogTriangles(
    fogCtx,
    vertexBuffer,
    vertexIndexBuffer,
    weldIdBuffer,
    tempIndexBuffer,
    meshIndexBuffer,
    expandMaskBuffer,
    neighbourFaceBuffer,
    faceRankBuffer,
    fogFaceCount,
    fogAmountBuffer,
    ctxStateBuffer,
    statsBuffer,
    frameId,
  );
  statsBuffer[STATS_FOG_RASTER_MS] = performance.now() - rasterStart;

  compositeFogPass(fillCtx, fogCtx, fogCompositeCtx, fogColor);
}
