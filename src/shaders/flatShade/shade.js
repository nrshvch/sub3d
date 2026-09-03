import {
  CTX_STATE_SHADE_FILL,
  CTX_STATE_SAW_REAL_SHADING,
  STATS_SHADE_DRAW_CALLS,
} from "../../shared/shaders.js";
import {
  createWeldState,
  weldAddFace,
  weldFlushAll,
  weldReset,
} from "../../shared/weld.js";

// This pass's pending geometry, keyed on lit intensity rather than albedo.
const weldState = createWeldState();

// Perpendicular deviation, in shadeCtx pixels, below which a boundary vertex is dropped at flush.
// Kept small: a vertex removed from a boundary shared with a differently-shaded region opens a
// hairline T-junction crack, since the neighbour still has a vertex there.
const COLLINEAR_EPS = 0.05;

export function flatShaderShade(
  shadeCtx,
  px0,
  py0,
  px1,
  py1,
  px2,
  py2,
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

  if (weldState.frameId !== frameId) {
    // State from a frame that is over: drop it rather than painting last frame's geometry.
    weldReset(weldState);
    weldState.frameId = frameId;
  }

  weldAddFace(
    weldState,
    shadeCtx,
    ctxStateBuffer,
    CTX_STATE_SHADE_FILL,
    CTX_STATE_SAW_REAL_SHADING,
    statsBuffer,
    STATS_SHADE_DRAW_CALLS,
    COLLINEAR_EPS,
    color16L,
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

  if (last) {
    weldFlushAll(
      weldState,
      shadeCtx,
      ctxStateBuffer,
      CTX_STATE_SHADE_FILL,
      CTX_STATE_SAW_REAL_SHADING,
      statsBuffer,
      STATS_SHADE_DRAW_CALLS,
      COLLINEAR_EPS,
    );
  }
}
