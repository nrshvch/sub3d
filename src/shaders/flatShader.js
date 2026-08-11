import {
  batchedFlatFill,
  batchedShadeFill,
  STATS_FILL_DRAW_CALLS,
} from "./shaderRegistry.js";

export function flatShaderFill(
  ctx,
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
  batchStateBuffer,
  batchCoordsBuffer,
  batchIdentityBuffer,
  batchWalkOrderBuffer,
) {
  // Handle texture
  const img = mesh.textureImage;

  if (img && img.complete && img.naturalWidth > 0 && mesh.uvs) {
    const uvs = mesh.uvs;
    const ov0 = mesh.faces[meshFaceIdx] * 2;
    const ov1 = mesh.faces[meshFaceIdx + 1] * 2;
    const ov2 = mesh.faces[meshFaceIdx + 2] * 2;

    const imgW = img.width;
    const imgH = img.height;
    const U0 = uvs[ov0] * imgW;
    const V0 = uvs[ov0 + 1] * imgH;
    const U1 = uvs[ov1] * imgW;
    const V1 = uvs[ov1 + 1] * imgH;
    const U2 = uvs[ov2] * imgW;
    const V2 = uvs[ov2 + 1] * imgH;

    const delta = U0 * (V1 - V2) - V0 * (U1 - U2) + (U1 * V2 - U2 * V1);

    if (Math.abs(delta) > 0.00001) {
      const invDelta = 1 / delta;
      const a =
        (px0 * (V1 - V2) + px1 * (V2 - V0) + px2 * (V0 - V1)) * invDelta;
      const c =
        (px0 * (U2 - U1) + px1 * (U0 - U2) + px2 * (U1 - U0)) * invDelta;
      const e =
        (px0 * (U1 * V2 - U2 * V1) +
          px1 * (U2 * V0 - U0 * V2) +
          px2 * (U0 * V1 - U1 * V0)) *
        invDelta;

      const bT =
        (py0 * (V1 - V2) + py1 * (V2 - V0) + py2 * (V0 - V1)) * invDelta;
      const d =
        (py0 * (U2 - U1) + py1 * (U0 - U2) + py2 * (U1 - U0)) * invDelta;
      const f =
        (py0 * (U1 * V2 - U2 * V1) +
          py1 * (U2 * V0 - U0 * V2) +
          py2 * (U0 * V1 - U1 * V0)) *
        invDelta;

      ctx.save();

      ctx.beginPath();
      ctx.moveTo(epx0, epy0);
      ctx.lineTo(epx1, epy1);
      ctx.lineTo(epx2, epy2);
      ctx.closePath();

      ctx.clip(); // clip to the expanded triangle
      ctx.setTransform(a, bT, c, d, e, f);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
      statsBuffer[STATS_FILL_DRAW_CALLS]++; // drawImage is never batchable

      return;
    }
  }

  // Untextured base: raw (unlit) mesh color - lighting is the shade half's job, fog is its own
  // pass entirely now (see fog.js).
  const color32 = colorBuffer[faceIdx * 3];
  const r = color32 >>> 16;
  const g = (color32 >>> 8) & 255;
  const b = color32 & 255;

  const qr = r & 0xf8;
  const qg = g & 0xfc;
  const qb = b & 0xf8;
  const color16 = (qr << 8) | (qg << 3) | (qb >> 3);

  batchedFlatFill(
    ctx,
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
    batchCoordsBuffer,
    batchIdentityBuffer,
    batchWalkOrderBuffer,
  );
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
