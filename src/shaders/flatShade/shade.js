import { PALETTE_16BIT } from "../../palette.js";
import {
  CTX_STATE_SHADE_FILL,
  CTX_STATE_SAW_REAL_SHADING,
  STATS_SHADE_DRAW_CALLS,
  findBoundaryEdge,
} from "../../shared/shaders.js";

// Same mechanism as fill.js's FILL_BATCH_CAPACITY, shade's own pass/buffers - see
// batchedShadeFill. Independently tunable, even though it starts at the same value.
export const SHADE_BATCH_CAPACITY = 16;

// batchStateBuffer layout (Int32Array(3), see Canvas2dRenderer.js):
const BATCH_COLOR16 = 0; // -1 = no pending batch
const BATCH_MESH = 1;
const BATCH_LENGTH = 2;

/**
 * Shade-pass mirror of fill.js's batchedFlatFill: identical merge algorithm (same
 * findBoundaryEdge, same append-only batchCoords/batchIdentity + spliced batchWalkOrder shape,
 * same BATCH_COLOR16/BATCH_MESH/BATCH_LENGTH slot numbers - safe to reuse since this is a wholly
 * separate buffer instance), just targeting CTX_STATE_SHADE_FILL/STATS_SHADE_DRAW_CALLS instead
 * of fill's slot 0. Keeps flatFill's CTX_STATE_SAW_REAL_SHADING flag-set (only on an actual
 * fillStyle change, only for a real - non-white - shade color) so shadeCtx compositing still
 * gates correctly.
 */
export function batchedShadeFill(
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
  batchStateBuffer,
  batchCoords,
  batchIdentity,
  batchWalkOrder,
) {
  if (
    batchStateBuffer[BATCH_COLOR16] === color16 &&
    batchStateBuffer[BATCH_MESH] === meshIdx
  ) {
    const length = batchStateBuffer[BATCH_LENGTH];

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

    if (matchCount === 1 && length < SHADE_BATCH_CAPACITY) {
      batchCoords[length * 2] = newPx;
      batchCoords[length * 2 + 1] = newPy;
      batchIdentity[length] = newVIdx;

      for (let i = length; i > matchPos + 1; i--) {
        batchWalkOrder[i] = batchWalkOrder[i - 1];
      }
      batchWalkOrder[matchPos + 1] = length;

      batchStateBuffer[BATCH_LENGTH] = length + 1;
      return;
    }

    flushBatchedShadeFill(targetCtx, statsBuffer, batchStateBuffer, batchCoords, batchWalkOrder);
  } else if (batchStateBuffer[BATCH_COLOR16] !== -1) {
    flushBatchedShadeFill(targetCtx, statsBuffer, batchStateBuffer, batchCoords, batchWalkOrder);
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

  batchStateBuffer[BATCH_COLOR16] = color16;
  batchStateBuffer[BATCH_MESH] = meshIdx;
  batchStateBuffer[BATCH_LENGTH] = 3;
}

export function flushBatchedShadeFill(
  targetCtx,
  statsBuffer,
  batchStateBuffer,
  batchCoords,
  batchWalkOrder,
) {
  if (batchStateBuffer[BATCH_COLOR16] === -1) return;

  const length = batchStateBuffer[BATCH_LENGTH];
  const first = batchWalkOrder[0];

  targetCtx.beginPath();
  targetCtx.moveTo(batchCoords[first * 2], batchCoords[first * 2 + 1]);
  for (let i = 1; i < length; i++) {
    const p = batchWalkOrder[i];
    targetCtx.lineTo(batchCoords[p * 2], batchCoords[p * 2 + 1]);
  }
  targetCtx.closePath();
  targetCtx.stroke();
  targetCtx.fill();
  statsBuffer[STATS_SHADE_DRAW_CALLS]++;

  batchStateBuffer[BATCH_COLOR16] = -1;
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
  shadeBatchStateBuffer,
  shadeBatchCoordsBuffer,
  shadeBatchIdentityBuffer,
  shadeBatchWalkOrderBuffer,
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
    shadeBatchStateBuffer,
    shadeBatchCoordsBuffer,
    shadeBatchIdentityBuffer,
    shadeBatchWalkOrderBuffer,
  );
}
