import { PALETTE_16BIT } from "../../palette.js";
import {
  identityFill,
  flatFill,
  CTX_STATE_SHADE_FILL,
  STATS_FILL_DRAW_CALLS,
} from "../../shared/shaders.js";

/**
 * Predefined shader (see registerShader in shaderRegistry.js for the full two-pass argument
 * contract), and the built-in AVG_FLAT (Averaged Vertex Flat Fill) shader (Canvas2dRenderer.js
 * case 3): per-vertex lighting and fog averaged across the face, one flat fill. Exported via
 * scaliaEngine.shaders.avgFlat; reserved as shaderType 3 - no registration needed to use it.
 *
 * Split into a fill half (avgFlatShaderFill, base color/texture + fog) and a shade half
 * (avgFlatShaderShade, averaged lighting) - see flatShader.js's doc comment for why the split
 * exists and why both halves independently recompute avgFog rather than passing a decision
 * between them.
 */

// Shared by both halves - kept in one place so the two avgFog computations can't drift.
function computeAvgFog(
  faceIdx,
  clipGeometryBuffer,
  fogType,
  fogNearPane,
  fogFarPane,
) {
  let fog0 = 0,
    fog1 = 0,
    fog2 = 0;

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

    if (fogType === 2 /* RADIAL_FAST */) {
      const nearSq = fogNearPane * fogNearPane;
      const farSq = fogFarPane * fogFarPane;
      const invFogRangeSq = 1.0 / (farSq - nearSq);

      fog0 = (w0x * w0x + w0y * w0y + w0z * w0z - nearSq) * invFogRangeSq;
      fog1 = (w1x * w1x + w1y * w1y + w1z * w1z - nearSq) * invFogRangeSq;
      fog2 = (w2x * w2x + w2y * w2y + w2z * w2z - nearSq) * invFogRangeSq;
    } else {
      const dist0 = Math.sqrt(w0x * w0x + w0y * w0y + w0z * w0z);
      const dist1 = Math.sqrt(w1x * w1x + w1y * w1y + w1z * w1z);
      const dist2 = Math.sqrt(w2x * w2x + w2y * w2y + w2z * w2z);

      fog0 = (dist0 - fogNearPane) / (fogFarPane - fogNearPane);
      fog1 = (dist1 - fogNearPane) / (fogFarPane - fogNearPane);
      fog2 = (dist2 - fogNearPane) / (fogFarPane - fogNearPane);
    }
  } else if (fogType === 3 /* LINEAR */) {
    const invFogRange = 1 / (fogFarPane - fogNearPane);
    fog0 = (clipGeometryBuffer[faceIdx * 9 + 2] - fogNearPane) * invFogRange;
    fog1 = (clipGeometryBuffer[faceIdx * 9 + 5] - fogNearPane) * invFogRange;
    fog2 = (clipGeometryBuffer[faceIdx * 9 + 8] - fogNearPane) * invFogRange;
  }

  let avgFog = (fog0 + fog1 + fog2) * 0.33333;

  // A face closer than fogNearPane produces a negative avgFog - clamp both bounds here so
  // neither half has to guard every blend against it separately.
  if (avgFog < 0) avgFog = 0;
  else if (avgFog > 1) avgFog = 1;

  return avgFog;
}

export function avgFlatShaderFill(
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
) {
  const avgFog = computeAvgFog(
    faceIdx,
    clipGeometryBuffer,
    fogType,
    fogNearPane,
    fogFarPane,
  );

  // EARLY OUT: a fully-fogged face's final color is exactly fogColor regardless of lighting or
  // texture - this is the complete final look, no shading needed (see avgFlatShaderShade's
  // matching early-out).
  if (avgFog >= 1) {
    const fogR = fogColor >>> 16;
    const fogG = (fogColor >>> 8) & 255;
    const fogB = fogColor & 255;
    const qrF = fogR & 0xf8;
    const qgF = fogG & 0xfc;
    const qbF = fogB & 0xf8;
    const color16F = (qrF << 8) | (qgF << 3) | (qbF >> 3);

    flatFill(ctx, px0, py0, px1, py1, px2, py2, color16F, 0, ctxStateBuffer, statsBuffer);

    return;
  }

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

      const b =
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
      ctx.setTransform(a, b, c, d, e, f);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
      statsBuffer[STATS_FILL_DRAW_CALLS]++; // drawImage is never batchable

      // Fog is atmosphere between camera and surface, not the surface's own lighting, so it
      // belongs on the base buffer, blended toward fogColor same as always (source-over). Not
      // batched - avgFog (hence globalAlpha) varies continuously per face, unlike a flat
      // fillStyle, so consecutive faces rarely share it exactly.
      if (avgFog > 0) {
        const fogR = fogColor >>> 16;
        const fogG = (fogColor >>> 8) & 255;
        const fogB = fogColor & 255;
        const qrF = fogR & 0xf8;
        const qgF = fogG & 0xfc;
        const qbF = fogB & 0xf8;
        const color16F = (qrF << 8) | (qgF << 3) | (qbF >> 3);

        ctx.globalAlpha = avgFog;

        // Reuses the still-current clip-triangle path from the texture setup above (save()/
        // restore() don't touch the current path) - no fresh beginPath() needed here.
        ctx.fillStyle = PALETTE_16BIT[color16F];

        ctx.fill();
        statsBuffer[STATS_FILL_DRAW_CALLS]++;

        ctx.globalAlpha = 1.0; // required by the shader contract
      }

      return;
    }
  }

  // Untextured base: raw (unlit) vertex color, averaged and blended toward fogColor - lighting
  // is the shade half's job.
  const cIdx = faceIdx * 3;
  const c0 = colorBuffer[cIdx],
    c1 = colorBuffer[cIdx + 1],
    c2 = colorBuffer[cIdx + 2];

  const r0 = c0 >>> 16,
    g0 = (c0 >>> 8) & 255,
    b0 = c0 & 255;
  const r1 = c1 >>> 16,
    g1 = (c1 >>> 8) & 255,
    b1 = c1 & 255;
  const r2 = c2 >>> 16,
    g2 = (c2 >>> 8) & 255,
    b2 = c2 & 255;

  let r = (r0 + r1 + r2) * 0.33333;
  let g = (g0 + g1 + g2) * 0.33333;
  let b = (b0 + b1 + b2) * 0.33333;

  if (avgFog > 0) {
    const fogR = fogColor >>> 16;
    const fogG = (fogColor >>> 8) & 255;
    const fogB = fogColor & 255;
    const invFog = 1 - avgFog;
    r = r * invFog + fogR * avgFog;
    g = g * invFog + fogG * avgFog;
    b = b * invFog + fogB * avgFog;
  }

  r = Math.min(255, r) | 0;
  g = Math.min(255, g) | 0;
  b = Math.min(255, b) | 0;

  const qr = r & 0xf8;
  const qg = g & 0xfc;
  const qb = b & 0xf8;
  const color16 = (qr << 8) | (qg << 3) | (qb >> 3);

  flatFill(ctx, px0, py0, px1, py1, px2, py2, color16, 0, ctxStateBuffer, statsBuffer);
}

export function avgFlatShaderShade(
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
  const avgFog = computeAvgFog(
    faceIdx,
    clipGeometryBuffer,
    fogType,
    fogNearPane,
    fogFarPane,
  );

  // Matches avgFlatShaderFill's early-out: a fully-fogged face already has its complete final
  // look, drawn in the fill pass - nothing to shade.
  if (avgFog >= 1) {
    identityFill(
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
    );
    return;
  }

  // Shading is texture-independent - same averaged lit intensity multiplies either the raw
  // albedo or the texture once composited, so there's no texture branch here at all.
  const nx0 = vertexNormalsBuffer[v0Idx];
  const ny0 = vertexNormalsBuffer[v0Idx + 1];
  const nz0 = vertexNormalsBuffer[v0Idx + 2];

  const nx1 = vertexNormalsBuffer[v1Idx];
  const ny1 = vertexNormalsBuffer[v1Idx + 1];
  const nz1 = vertexNormalsBuffer[v1Idx + 2];

  const nx2 = vertexNormalsBuffer[v2Idx];
  const ny2 = vertexNormalsBuffer[v2Idx + 1];
  const nz2 = vertexNormalsBuffer[v2Idx + 2];

  const ambR = (ambientLightRgb >>> 16) & 255;
  const ambG = (ambientLightRgb >>> 8) & 255;
  const ambB = ambientLightRgb & 255;

  let ir0 = ambR,
    ig0 = ambG,
    ib0 = ambB;
  let ir1 = ambR,
    ig1 = ambG,
    ib1 = ambB;
  let ir2 = ambR,
    ig2 = ambG,
    ib2 = ambB;

  // index 0 is a count header, not a light - actual indices start at 1 (see roughCull)
  const lightsCount = lightsIndexBuffer[0];
  for (let l = 1; l <= lightsCount; l++) {
    const lightGO = gameObjects[lightsIndexBuffer[l]];
    if (lightGO.light.type === 0) {
      // DIRECTIONAL
      const lx = -lightGO.transform.worldMatrix[8];
      const ly = -lightGO.transform.worldMatrix[9];
      const lz = -lightGO.transform.worldMatrix[10];

      const lightColor32 = lightGO.light.color;
      const lightR = (lightColor32 >>> 16) & 255;
      const lightG = (lightColor32 >>> 8) & 255;
      const lightB = lightColor32 & 255;

      // Using Math.max(0, dot) allows compiler to generate conditional move instructions (like maxss / cmov) instead of jump/branch instructions e.g. if (dot > 0)
      const dot0 = Math.max(0, nx0 * lx + ny0 * ly + nz0 * lz);
      ir0 += lightR * dot0;
      ig0 += lightG * dot0;
      ib0 += lightB * dot0;

      const dot1 = Math.max(0, nx1 * lx + ny1 * ly + nz1 * lz);
      ir1 += lightR * dot1;
      ig1 += lightG * dot1;
      ib1 += lightB * dot1;

      const dot2 = Math.max(0, nx2 * lx + ny2 * ly + nz2 * lz);
      ir2 += lightR * dot2;
      ig2 += lightG * dot2;
      ib2 += lightB * dot2;
    }
  }

  // 1 / 255 = 0.0039215
  ir0 *= 0.0039215;
  ig0 *= 0.0039215;
  ib0 *= 0.0039215;
  ir1 *= 0.0039215;
  ig1 *= 0.0039215;
  ib1 *= 0.0039215;
  ir2 *= 0.0039215;
  ig2 *= 0.0039215;
  ib2 *= 0.0039215;

  // Clamp here - shadeCtx represents intensity as an opaque 0-255 color for `multiply`, which
  // structurally can't exceed 1x the base color, so an unclamped ir/ig/ib > 1
  // (overbright/stacked lights) would otherwise misquantize instead of just saturating at
  // "fully lit, no darkening".
  if (ir0 > 1) ir0 = 1;
  if (ig0 > 1) ig0 = 1;
  if (ib0 > 1) ib0 = 1;
  if (ir1 > 1) ir1 = 1;
  if (ig1 > 1) ig1 = 1;
  if (ib1 > 1) ib1 = 1;
  if (ir2 > 1) ir2 = 1;
  if (ig2 > 1) ig2 = 1;
  if (ib2 > 1) ib2 = 1;

  const ir = (ir0 + ir1 + ir2) * 0.33333;
  const ig = (ig0 + ig1 + ig2) * 0.33333;
  const ib = (ib0 + ib1 + ib2) * 0.33333;

  // Faded toward white (1.0 = no darkening) by avgFog so a heavily-fogged face's `multiply`
  // composite approaches a no-op and the fogColor avgFlatShaderFill already blended in shows
  // through untouched.
  const invFog = 1 - avgFog;
  const sr = ((ir * invFog + avgFog) * 255) | 0;
  const sg = ((ig * invFog + avgFog) * 255) | 0;
  const sb = ((ib * invFog + avgFog) * 255) | 0;
  const shadeColor16 = ((sr & 0xf8) << 8) | ((sg & 0xfc) << 3) | ((sb & 0xf8) >> 3);

  flatFill(
    shadeCtx,
    px0,
    py0,
    px1,
    py1,
    px2,
    py2,
    shadeColor16,
    CTX_STATE_SHADE_FILL,
    ctxStateBuffer,
    statsBuffer,
  );
}
