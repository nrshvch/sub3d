import { PALETTE_16BIT } from "../../palette.js";
import {
  CTX_STATE_SHADE_FILL,
  CTX_STATE_SAW_REAL_SHADING,
  STATS_SHADE_DRAW_CALLS,
  findBoundaryEdge,
} from "../../shared/shaders.js";

// Same mechanism as fill.js's FILL_BATCH_CAPACITY, shade's own pass/shaderData - see
// batchedShadeFill. Independently tunable, even though it starts at the same value.
const SHADE_BATCH_CAPACITY = 16;

// This shader's own private layout inside its own module-scoped shaderData below - same slot
// numbers as fill.js's, safe to reuse since this is a wholly separate array instance.
const SD_CALL_ID = 0;
const SD_COLOR16 = 1; // -1 = no pending batch
const SD_MESH = 2;
const SD_LENGTH = 3;
const SD_COORDS = 4; // SHADE_BATCH_CAPACITY*2 floats
const SD_IDENTITY = SD_COORDS + SHADE_BATCH_CAPACITY * 2; // SHADE_BATCH_CAPACITY floats
const SD_WALKORDER = SD_IDENTITY + SHADE_BATCH_CAPACITY; // SHADE_BATCH_CAPACITY floats

// This shader's entire pending-batch state, private to this module for the life of the page -
// the renderer never allocates, passes, or knows about this.
const shaderData = new Float32Array(SD_WALKORDER + SHADE_BATCH_CAPACITY);

/**
 * Shade-pass mirror of fill.js's batchedFlatFill: identical merge algorithm (same
 * findBoundaryEdge, same append-only coords/identity + spliced walk-order shape inside its own
 * shaderData), just targeting CTX_STATE_SHADE_FILL/STATS_SHADE_DRAW_CALLS instead of fill's slot
 * 0. Keeps flatFill's CTX_STATE_SAW_REAL_SHADING flag-set (only on an actual fillStyle change,
 * only for a real - non-white - shade color) so shadeCtx compositing still gates correctly.
 * `last` (see shaderRegistry.js's registerShader doc comment) means this triangle is the last of
 * a contiguous run of this shaderKey - handled normally, then flushed before returning.
 */
function batchedShadeFill(
  targetCtx,
  px0,
  py0,
  px1,
  py1,
  px2,
  py2,
  v0Idx,
  v1Idx,
  v2Idx,
  color16,
  meshIdx,
  ctxStateBuffer,
  statsBuffer,
  frameId,
  last,
) {
  const stale = shaderData[SD_CALL_ID] !== frameId;

  if (
    !stale &&
    shaderData[SD_COLOR16] === color16 &&
    shaderData[SD_MESH] === meshIdx
  ) {
    const length = shaderData[SD_LENGTH];

    let matchPos = -1;
    let matchCount = 0;
    let newPx = 0,
      newPy = 0,
      newVIdx = 0;

    let pos = findBoundaryEdge(v0Idx, v1Idx, shaderData, SD_WALKORDER, SD_IDENTITY, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px2;
      newPy = py2;
      newVIdx = v2Idx;
    }
    pos = findBoundaryEdge(v1Idx, v2Idx, shaderData, SD_WALKORDER, SD_IDENTITY, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px0;
      newPy = py0;
      newVIdx = v0Idx;
    }
    pos = findBoundaryEdge(v2Idx, v0Idx, shaderData, SD_WALKORDER, SD_IDENTITY, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px1;
      newPy = py1;
      newVIdx = v1Idx;
    }

    if (matchCount === 1 && length < SHADE_BATCH_CAPACITY) {
      shaderData[SD_COORDS + length * 2] = newPx;
      shaderData[SD_COORDS + length * 2 + 1] = newPy;
      shaderData[SD_IDENTITY + length] = newVIdx;

      for (let i = length; i > matchPos + 1; i--) {
        shaderData[SD_WALKORDER + i] = shaderData[SD_WALKORDER + i - 1];
      }
      shaderData[SD_WALKORDER + matchPos + 1] = length;

      shaderData[SD_LENGTH] = length + 1;
      if (last) flushBatchedShadeFill(targetCtx, statsBuffer);
      return;
    }

    flushBatchedShadeFill(targetCtx, statsBuffer);
  } else if (!stale && shaderData[SD_COLOR16] !== -1) {
    flushBatchedShadeFill(targetCtx, statsBuffer);
  }

  if (ctxStateBuffer[CTX_STATE_SHADE_FILL] !== color16) {
    const style = PALETTE_16BIT[color16];
    targetCtx.fillStyle = style;
    targetCtx.strokeStyle = style;
    targetCtx.lineWidth = 1;
    targetCtx.lineJoin = "miter";
    ctxStateBuffer[CTX_STATE_SHADE_FILL] = color16;

    if (color16 !== 0xffff) {
      ctxStateBuffer[CTX_STATE_SAW_REAL_SHADING] = 1;
    }
  }

  shaderData[SD_CALL_ID] = frameId;
  shaderData[SD_COORDS] = px0;
  shaderData[SD_COORDS + 1] = py0;
  shaderData[SD_COORDS + 2] = px1;
  shaderData[SD_COORDS + 3] = py1;
  shaderData[SD_COORDS + 4] = px2;
  shaderData[SD_COORDS + 5] = py2;
  shaderData[SD_IDENTITY] = v0Idx;
  shaderData[SD_IDENTITY + 1] = v1Idx;
  shaderData[SD_IDENTITY + 2] = v2Idx;
  shaderData[SD_WALKORDER] = 0;
  shaderData[SD_WALKORDER + 1] = 1;
  shaderData[SD_WALKORDER + 2] = 2;

  shaderData[SD_COLOR16] = color16;
  shaderData[SD_MESH] = meshIdx;
  shaderData[SD_LENGTH] = 3;

  if (last) flushBatchedShadeFill(targetCtx, statsBuffer);
}

function flushBatchedShadeFill(targetCtx, statsBuffer) {
  if (shaderData[SD_COLOR16] === -1) return;

  const length = shaderData[SD_LENGTH];
  const first = shaderData[SD_WALKORDER];

  targetCtx.beginPath();
  targetCtx.moveTo(shaderData[SD_COORDS + first * 2], shaderData[SD_COORDS + first * 2 + 1]);
  for (let i = 1; i < length; i++) {
    const p = shaderData[SD_WALKORDER + i];
    targetCtx.lineTo(shaderData[SD_COORDS + p * 2], shaderData[SD_COORDS + p * 2 + 1]);
  }
  targetCtx.closePath();
  targetCtx.stroke();
  targetCtx.fill();
  statsBuffer[STATS_SHADE_DRAW_CALLS]++;

  shaderData[SD_COLOR16] = -1;
}

export function flatShaderShade(
  shadeCtx,
  px0,
  py0,
  px1,
  py1,
  px2,
  py2,
  epx0,
  epy0,
  epx1,
  epy1,
  epx2,
  epy2,
  clipGeometryBuffer,
  colorBuffer,
  vertexNormalsBuffer,
  faceNormalsBuffer,
  v0Idx,
  v1Idx,
  v2Idx,
  faceIdx,
  mesh,
  meshFaceIdx,
  ambientLightRgb,
  lightsIndexBuffer,
  gameObjects,
  fogType,
  fogColor,
  fogNearPane,
  fogFarPane,
  meshIdx,
  ctxStateBuffer,
  statsBuffer,
  frameId,
  last,
) {
  // Shading is texture-independent - the same lit intensity multiplies either the raw albedo or
  // the texture once composited, so there's no texture branch here at all. It's fog-independent
  // too now - fog is its own pass entirely (see fog.js), always emits real intensity unconditionally.
  let ir = (ambientLightRgb >>> 16) & 255;
  let ig = (ambientLightRgb >>> 8) & 255;
  let ib = ambientLightRgb & 255;

  const wnx = faceNormalsBuffer[faceIdx * 3];
  const wny = faceNormalsBuffer[faceIdx * 3 + 1];
  const wnz = faceNormalsBuffer[faceIdx * 3 + 2];

  const lightsCount = lightsIndexBuffer[0];
  for (let l = 1; l <= lightsCount; l++) {
    const lightGO = gameObjects[lightsIndexBuffer[l]];
    if (lightGO.light.type === 0) {
      // DIRECTIONAL
      const lx = -lightGO.transform.worldMatrix[8];
      const ly = -lightGO.transform.worldMatrix[9];
      const lz = -lightGO.transform.worldMatrix[10];

      const dot = wnx * lx + wny * ly + wnz * lz;
      if (dot > 0) {
        // Single dot check gates all 3 channel adds for the whole face (unlike the per-vertex
        // shaders, where Math.max(0, dot) branchlessness pays for itself 3x over per light) - a
        // face with a single normal is either lit by a light or it isn't, so skipping the adds
        // outright is cheaper here than always doing them.
        const lightColor32 = lightGO.light.color;

        ir += ((lightColor32 >>> 16) & 255) * dot;
        ig += ((lightColor32 >>> 8) & 255) * dot;
        ib += (lightColor32 & 255) * dot;
      }
    }
  }

  // 1 / 255 = 0.0039215
  ir *= 0.0039215;
  ig *= 0.0039215;
  ib *= 0.0039215;

  // Clamp here - shadeCtx represents intensity as an opaque 0-255 color for `multiply`, which
  // structurally can't exceed 1x the base color, so an unclamped ir/ig/ib > 1
  // (overbright/stacked lights) would otherwise misquantize instead of just saturating at
  // "fully lit, no darkening".
  if (ir > 1) ir = 1;
  if (ig > 1) ig = 1;
  if (ib > 1) ib = 1;

  const clampR = (ir * 255) | 0;
  const clampG = (ig * 255) | 0;
  const clampB = (ib * 255) | 0;

  const color16L =
    ((clampR & 0xf8) << 8) | ((clampG & 0xfc) << 3) | ((clampB & 0xf8) >> 3);

  batchedShadeFill(
    shadeCtx,
    px0,
    py0,
    px1,
    py1,
    px2,
    py2,
    v0Idx,
    v1Idx,
    v2Idx,
    color16L,
    meshIdx,
    ctxStateBuffer,
    statsBuffer,
    frameId,
    last,
  );
}
