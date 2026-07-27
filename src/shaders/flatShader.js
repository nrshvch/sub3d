import CameraComponent from "../components/CameraComponent.js";
import {PALETTE_16BIT} from "../palette.js";

/**
 * This *is* the built-in FLAT shader (Canvas2dRenderer.js dispatches shaderType 0 straight to
 * this function): one face normal for lighting, optional texture, linear/radial fog. Reserved
 * as shaderType 0 - no registration needed to use it. Also exported via
 * scaliaEngine.shaders.flat for consumers who want to wrap it with extra per-face drawing, or
 * use it as a reference for writing an original shader (see registerShader in
 * shaderRegistry.js for the full argument contract every shader must implement).
 *
 * Maintains ctxStateBuffer exactly like every other shader, so a run of same-colored faces -
 * whether this shader, a registered consumer shader, or a different built-in - only touches
 * ctx.fillStyle/strokeStyle/lineWidth/lineJoin when the value actually changes.
 */
export function flatShader(
  ctx,
  px0, py0, px1, py1, px2, py2,
  epx0, epy0, epx1, epy1, epx2, epy2,
  clipGeometryBuffer,
  colorBuffer,
  vertexNormalsBuffer, faceNormalsBuffer, v0Idx, v1Idx, v2Idx,
  faceIdx, mesh, meshFaceIdx,
  ambientLightRgb, lightsIndexBuffer, gameObjects,
  fogType, fogColor, fogNearPane, fogFarPane,
  ctxStateBuffer,
) {
  // Calculating face lighting
  const color32 = colorBuffer[faceIdx * 3];
  let r = color32 >>> 16;
  let g = (color32 >>> 8) & 255;
  let b = color32 & 255;

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
        ir += ((lightGO.light.color >>> 16) & 255) * dot;
        ig += ((lightGO.light.color >>> 8) & 255) * dot;
        ib += (lightGO.light.color & 255) * dot;
      }
    }
  }

  // 1 / 255 = 0.0039215
  ir *= 0.0039215;
  ig *= 0.0039215;
  ib *= 0.0039215;

  // lambertian lighting
  r = (r * ir) | 0;
  g = (g * ig) | 0;
  b = (b * ib) | 0;

  r = r > 255 ? 255 : r;
  g = g > 255 ? 255 : g;
  b = b > 255 ? 255 : b;

  // Calculating fog
  let fogAmount = 0;

  if (
    fogType === CameraComponent.FogType.RADIAL_FAST ||
    fogType === CameraComponent.FogType.RADIAL
  ) {
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

    if (fogType === CameraComponent.FogType.RADIAL_FAST) {
      const nearSq = fogNearPane * fogNearPane;
      const farSq = fogFarPane * fogFarPane;
      const invFogRangeSq = 1.0 / (farSq - nearSq);
      const distSq = lx * lx + ly * ly + lz * lz;
      fogAmount = (distSq - nearSq) * invFogRangeSq;
    } else {
      const distance = Math.sqrt(lx * lx + ly * ly + lz * lz);
      fogAmount = (distance - fogNearPane) / (fogFarPane - fogNearPane);
    }
  } else if (fogType === CameraComponent.FogType.LINEAR) {
    const depth0 = clipGeometryBuffer[faceIdx * 9 + 2];
    const depth1 = clipGeometryBuffer[faceIdx * 9 + 5];
    const depth2 = clipGeometryBuffer[faceIdx * 9 + 8];
    const avgFog = (depth0 + depth1 + depth2) * 0.33333;
    fogAmount = (avgFog - fogNearPane) / (fogFarPane - fogNearPane);
  }

  if (fogAmount > 1) fogAmount = 1;

  // Blend the mesh color with the fog color
  if (fogAmount > 0) {
    const fogR = fogColor >>> 16;
    const fogG = (fogColor >>> 8) & 255;
    const fogB = fogColor & 255;
    r = (r * (1 - fogAmount) + fogR * fogAmount) | 0;
    g = (g * (1 - fogAmount) + fogG * fogAmount) | 0;
    b = (b * (1 - fogAmount) + fogB * fogAmount) | 0;
  }

  // Handle texture
  const img = mesh.textureImage;

  if (img && img.complete && img.naturalWidth > 0 && mesh.uvs) {
    const uvs = mesh.uvs;
    const ov0 = mesh.faces[meshFaceIdx] * 2;
    const ov1 = mesh.faces[meshFaceIdx + 1] * 2;
    const ov2 = mesh.faces[meshFaceIdx + 2] * 2;

    const U0 = uvs[ov0] * img.width;
    const V0 = uvs[ov0 + 1] * img.height;
    const U1 = uvs[ov1] * img.width;
    const V1 = uvs[ov1 + 1] * img.height;
    const U2 = uvs[ov2] * img.width;
    const V2 = uvs[ov2 + 1] * img.height;

    const delta = U0 * (V1 - V2) - V0 * (U1 - U2) + (U1 * V2 - U2 * V1);

    if (Math.abs(delta) > 0.00001) {
      const invDelta = 1 / delta;
      const a = (px0 * (V1 - V2) + px1 * (V2 - V0) + px2 * (V0 - V1)) * invDelta;
      const c = (px0 * (U2 - U1) + px1 * (U0 - U2) + px2 * (U1 - U0)) * invDelta;
      const e =
        (px0 * (U1 * V2 - U2 * V1) +
          px1 * (U2 * V0 - U0 * V2) +
          px2 * (U0 * V1 - U1 * V0)) *
        invDelta;

      const bT = (py0 * (V1 - V2) + py1 * (V2 - V0) + py2 * (V0 - V1)) * invDelta;
      const d = (py0 * (U2 - U1) + py1 * (U0 - U2) + py2 * (U1 - U0)) * invDelta;
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

      // Apply RGB lighting (multiply)
      const clampR = ir >= 1.0 ? 255 : (ir * 255) | 0;
      const clampG = ig >= 1.0 ? 255 : (ig * 255) | 0;
      const clampB = ib >= 1.0 ? 255 : (ib * 255) | 0;

      // Quantize 8-bit color channels to 5-6-5 bits
      const qrL = clampR & 0xf8;
      const qgL = clampG & 0xfc;
      const qbL = clampB & 0xf8;
      const color16L = (qrL << 8) | (qgL << 3) | (qbL >> 3);

      ctx.globalCompositeOperation = "multiply";

      if (ctxStateBuffer[0] !== color16L) {
        ctx.fillStyle = PALETTE_16BIT[color16L];
        ctxStateBuffer[0] = color16L;
      }

      ctx.fill();

      // Restore default blending mode - required by the shader contract
      ctx.globalCompositeOperation = "source-over";

      // Apply fog (source-over)
      if (fogAmount > 0) {
        const fogR = fogColor >>> 16;
        const fogG = (fogColor >>> 8) & 255;
        const fogB = fogColor & 255;
        const qrF = fogR & 0xf8;
        const qgF = fogG & 0xfc;
        const qbF = fogB & 0xf8;
        const color16F = (qrF << 8) | (qgF << 3) | (qbF >> 3);

        ctx.globalAlpha = fogAmount;

        if (ctxStateBuffer[1] !== color16F) {
          ctx.strokeStyle = PALETTE_16BIT[color16F];
          ctxStateBuffer[1] = color16F;
        }

        if (ctxStateBuffer[2] !== 10) {
          ctx.lineWidth = 1;
          ctx.lineJoin = "miter";
          ctxStateBuffer[2] = 10;
        }

        ctx.stroke();

        if (ctxStateBuffer[0] !== color16F) {
          ctx.fillStyle = PALETTE_16BIT[color16F];
          ctxStateBuffer[0] = color16F;
        }

        ctx.fill();

        ctx.globalAlpha = 1.0; // required by the shader contract
      }

      return;
    }
  }

  ctx.beginPath();
  ctx.moveTo(px0, py0);
  ctx.lineTo(px1, py1);
  ctx.lineTo(px2, py2);
  ctx.closePath();

  // Quantize 8-bit color channels to 5-6-5 bits
  const qr = r & 0xf8;
  const qg = g & 0xfc;
  const qb = b & 0xf8;
  const color16 = (qr << 8) | (qg << 3) | (qb >> 3);

  if (ctxStateBuffer[1] !== color16) {
    ctx.strokeStyle = PALETTE_16BIT[color16];
    ctxStateBuffer[1] = color16;
  }

  if (ctxStateBuffer[2] !== 10) {
    ctx.lineWidth = 1;
    ctx.lineJoin = "miter";
    ctxStateBuffer[2] = 10;
  }

  ctx.stroke();

  if (ctxStateBuffer[0] !== color16) {
    ctx.fillStyle = PALETTE_16BIT[color16];
    ctxStateBuffer[0] = color16;
  }

  ctx.fill();
}
