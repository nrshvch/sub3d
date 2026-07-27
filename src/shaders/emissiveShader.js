import { PALETTE_16BIT } from "../palette.js";

/**
 * Predefined shader (see registerShader in shaderRegistry.js for the full argument contract),
 * and the built-in EMISSIVE shader (Canvas2dRenderer.js case 1): no light shading, just the
 * mesh color plus fog - the cheapest built-in shading path. Exported via
 * scaliaEngine.shaders.emissive; reserved as shaderType 1 - no registration needed to use it.
 *
 * Maintains ctxStateBuffer exactly like every other shader, so a run of same-colored faces -
 * whether this shader, another registered shader, or a different built-in - only touches
 * ctx.fillStyle/strokeStyle/lineWidth/lineJoin when the value actually changes.
 */
export function emissiveShader(
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
  ctxStateBuffer,
) {
  const color32 = colorBuffer[faceIdx * 3];
  let r = color32 >>> 16;
  let g = (color32 >>> 8) & 255;
  let b = color32 & 255;

  // Calculating fog
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

    // 1. Get the local camera-space coordinates from your cache
    // We use the average of the 3 vertices for the face
    const lx = (w0x + w1x + w2x) * 0.33333;
    const ly = (w0y + w1y + w2y) * 0.33333;
    const lz = (w0z + w1z + w2z) * 0.33333;

    if (fogType === 2 /* RADIAL_FAST */) {
      // We need the squares of your panes for the comparison
      const nearSq = fogNearPane * fogNearPane;
      const farSq = fogFarPane * fogFarPane;
      const invFogRangeSq = 1.0 / (farSq - nearSq);

      // Calculate Squared Distance (No Math.sqrt!)
      const distSq = lx * lx + ly * ly + lz * lz;

      // Calculate fogAmount based on the squared distribution
      fogAmount = (distSq - nearSq) * invFogRangeSq;
    } else {
      // 2. Calculate Radial Distance
      // Use x, y, and z for a spherical curve, or just x and z for a cylindrical curve.
      const distance = Math.sqrt(lx * lx + ly * ly + lz * lz);

      // 3. Calculate fogAmount using distance instead of depth
      fogAmount = (distance - fogNearPane) / (fogFarPane - fogNearPane);
    }
  } else if (fogType === 3 /* LINEAR */) {
    const depth0 = clipGeometryBuffer[faceIdx * 9 + 2];
    const depth1 = clipGeometryBuffer[faceIdx * 9 + 5];
    const depth2 = clipGeometryBuffer[faceIdx * 9 + 8];
    const avgFog = (depth0 + depth1 + depth2) * 0.33333;
    fogAmount = (avgFog - fogNearPane) / (fogFarPane - fogNearPane);
  }

  //TODO: pass this via mesh renderer
  const glowPower = 0; // 0 = no glow, 1 = full glow
  let effectiveFog = Math.max(0, fogAmount - glowPower);

  if (effectiveFog > 1) effectiveFog = 1;

  // Blend the mesh color with the fog color
  if (effectiveFog > 0) {
    const fogR = fogColor >>> 16;
    const fogG = (fogColor >>> 8) & 255;
    const fogB = fogColor & 255;
    r = (r * (1 - effectiveFog) + fogR * effectiveFog) | 0;
    g = (g * (1 - effectiveFog) + fogG * effectiveFog) | 0;
    b = (b * (1 - effectiveFog) + fogB * effectiveFog) | 0;
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

      // Apply Fog (Source-Over)
      if (effectiveFog > 0) {
        const fogR = fogColor >>> 16;
        const fogG = (fogColor >>> 8) & 255;
        const fogB = fogColor & 255;
        // Quantize 8-bit color channels to 5-6-5 bits
        const qrF = fogR & 0xf8; // Keep 5 bits
        const qgF = fogG & 0xfc; // Keep 6 bits
        const qbF = fogB & 0xf8; // Keep 5 bits

        // Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
        const color16F = (qrF << 8) | (qgF << 3) | (qbF >> 3);

        ctx.globalAlpha = effectiveFog;

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

        // Reset alpha - required by the shader contract
        ctx.globalAlpha = 1.0;
      }

      return;
    }
  }

  ctx.beginPath();
  ctx.moveTo(epx0, epy0);
  ctx.lineTo(epx1, epy1);
  ctx.lineTo(epx2, epy2);
  ctx.closePath();

  // Quantize 8-bit color channels to 5-6-5 bits
  const qr = r & 0xf8; // Keep 5 bits
  const qg = g & 0xfc; // Keep 6 bits
  const qb = b & 0xf8; // Keep 5 bits

  // Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
  const color16 = (qr << 8) | (qg << 3) | (qb >> 3);

  if (ctxStateBuffer[0] !== color16) {
    ctx.fillStyle = PALETTE_16BIT[color16];
    ctxStateBuffer[0] = color16;
  }

  ctx.fill();
}
