import { PALETTE_16BIT } from "../palette.js";

/**
 * Predefined shader (see registerShader in shaderRegistry.js for the full argument contract),
 * and the built-in AVG_FLAT (Averaged Vertex Flat Fill) shader (Canvas2dRenderer.js case 3):
 * per-vertex lighting and fog averaged across the face, one flat fill. Exported via
 * scaliaEngine.shaders.avgFlat; reserved as shaderType 3 - no registration needed to use it.
 *
 * Maintains ctxStateBuffer exactly like every other shader, so a run of same-colored faces -
 * whether this shader, another registered shader, or a different built-in - only touches
 * ctx.fillStyle/strokeStyle/lineWidth/lineJoin when the value actually changes.
 *
 * Fog is computed first, ahead of lighting/texture work: a fully-fogged face (avgFog >= 1)
 * ends up as flat fogColor regardless of what's underneath, so that case skips the lights
 * loop, any texture clip/drawImage, and the multiply/blend work entirely.
 */
export function avgFlatShader(
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
  // Calculating fog first, before lighting/texture work - if the face is fully fogged, its
  // final color is exactly fogColor regardless of lighting or texture, so we can bail out
  // before touching vertex normals, the lights loop, or any texture draw/clip/blend at all.
  let fog0 = 0,
    fog1 = 0,
    fog2 = 0;

  // fogType arrives as a number (see CameraComponent.FogType: 0 NONE, 1 RADIAL, 2 RADIAL_FAST,
  // 3 LINEAR) - compared directly as numbers here rather than through the enum object, since a
  // number === number check is cheaper per-face than dereferencing CameraComponent.FogType.X
  // and comparing strings.
  if (fogType === 2 /* RADIAL_FAST */ || fogType === 1 /* RADIAL */) {
    // 1. Get the local camera-space coordinates from your cache
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
      // We need the squares of panes for the comparison
      const nearSq = fogNearPane * fogNearPane;
      const farSq = fogFarPane * fogFarPane;
      const invFogRangeSq = 1.0 / (farSq - nearSq);

      fog0 = (w0x * w0x + w0y * w0y + w0z * w0z - nearSq) * invFogRangeSq;
      fog1 = (w1x * w1x + w1y * w1y + w1z * w1z - nearSq) * invFogRangeSq;
      fog2 = (w2x * w2x + w2y * w2y + w2z * w2z - nearSq) * invFogRangeSq;
    } else {
      // 2. Calculate Radial Distance
      // Use x, y, and z for a spherical curve, or just x and z for a cylindrical curve.
      const dist0 = Math.sqrt(w0x * w0x + w0y * w0y + w0z * w0z);
      const dist1 = Math.sqrt(w1x * w1x + w1y * w1y + w1z * w1z);
      const dist2 = Math.sqrt(w2x * w2x + w2y * w2y + w2z * w2z);

      fog0 = (dist0 - fogNearPane) / (fogFarPane - fogNearPane);
      fog1 = (dist1 - fogNearPane) / (fogFarPane - fogNearPane);
      fog2 = (dist2 - fogNearPane) / (fogFarPane - fogNearPane);
    }
  } else if (fogType === 3 /* LINEAR */) {
    // Per-vertex camera-space Z
    const invFogRange = 1 / (fogFarPane - fogNearPane);
    fog0 = (clipGeometryBuffer[faceIdx * 9 + 2] - fogNearPane) * invFogRange;
    fog1 = (clipGeometryBuffer[faceIdx * 9 + 5] - fogNearPane) * invFogRange;
    fog2 = (clipGeometryBuffer[faceIdx * 9 + 8] - fogNearPane) * invFogRange;
  }

  let avgFog = (fog0 + fog1 + fog2) * 0.33333;

  // EARLY OUT: raw (unclamped) avgFog >= 1 is exactly the condition under which the
  // lighting/texture path below would clamp avgFog to 1 and blend to 100% fog color anyway -
  // so skip lighting, any texture clip/drawImage, and the multiply/blend work entirely, and
  // fill flat with fogColor directly.
  if (avgFog >= 1) {
    const fogR = fogColor >>> 16;
    const fogG = (fogColor >>> 8) & 255;
    const fogB = fogColor & 255;
    const qrF = fogR & 0xf8; // Keep 5 bits
    const qgF = fogG & 0xfc; // Keep 6 bits
    const qbF = fogB & 0xf8; // Keep 5 bits
    const color16F = (qrF << 8) | (qgF << 3) | (qbF >> 3);

    ctx.beginPath();
    ctx.moveTo(px0, py0);
    ctx.lineTo(px1, py1);
    ctx.lineTo(px2, py2);
    ctx.closePath();

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

    return;
  }

  // v0Idx/v1Idx/v2Idx arrive as distinct parameters (rather than being re-derived here),
  // which still lets the compiler map each one to its own register/slot for the parallel
  // vertexNormalsBuffer fetches below.
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
      // delta/invDelta and the U/V terms below depend only on this face's UVs, not
      // screen position - static for a static mesh. Cacheable per-face
      // once MeshComponent gets a uvVersion counter
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

      // Apply RGB Lighting (Multiply)
      let ir = (ir0 + ir1 + ir2) * 0.33333;
      let ig = (ig0 + ig1 + ig2) * 0.33333;
      let ib = (ib0 + ib1 + ib2) * 0.33333;
      // Math.min
      let clampR = ir > 255 ? 255 : ir;
      let clampG = ig > 255 ? 255 : ig;
      let clampB = ib > 255 ? 255 : ib;

      clampR = clampR | 0;
      clampG = clampG | 0;
      clampB = clampB | 0;

      // Quantize 8-bit color channels to 5-6-5 bits
      const qrL = clampR & 0xf8; // Keep 5 bits
      const qgL = clampG & 0xfc; // Keep 6 bits
      const qbL = clampB & 0xf8; // Keep 5 bits

      // Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
      const color16L = (qrL << 8) | (qgL << 3) | (qbL >> 3);

      ctx.globalCompositeOperation = "multiply";

      if (ctxStateBuffer[0] !== color16L) {
        ctx.fillStyle = PALETTE_16BIT[color16L];
        ctxStateBuffer[0] = color16L;
      }

      ctx.fill();

      // Restore default blending mode - required by the shader contract
      ctx.globalCompositeOperation = "source-over";

      // Apply Fog (Source-Over) - avgFog < 1 here, the >= 1 case already returned above
      if (avgFog > 0) {
        const fogR = fogColor >>> 16;
        const fogG = (fogColor >>> 8) & 255;
        const fogB = fogColor & 255;
        // Quantize 8-bit color channels to 5-6-5 bits
        const qrF = fogR & 0xf8; // Keep 5 bits
        const qgF = fogG & 0xfc; // Keep 6 bits
        const qbF = fogB & 0xf8; // Keep 5 bits

        // Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
        const color16F = (qrF << 8) | (qgF << 3) | (qbF >> 3);

        ctx.globalAlpha = avgFog;

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

  const cIdx = faceIdx * 3;
  const c0 = colorBuffer[cIdx],
    c1 = colorBuffer[cIdx + 1],
    c2 = colorBuffer[cIdx + 2];

  let r0 = c0 >>> 16,
    g0 = (c0 >>> 8) & 255,
    b0 = c0 & 255;
  let r1 = c1 >>> 16,
    g1 = (c1 >>> 8) & 255,
    b1 = c1 & 255;
  let r2 = c2 >>> 16,
    g2 = (c2 >>> 8) & 255,
    b2 = c2 & 255;

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

  // lambertian lightning
  r0 = r0 * ir0;
  g0 = g0 * ig0;
  b0 = b0 * ib0;
  r1 = r1 * ir1;
  g1 = g1 * ig1;
  b1 = b1 * ib1;
  r2 = r2 * ir2;
  g2 = g2 * ig2;
  b2 = b2 * ib2;

  let r = (r0 + r1 + r2) * 0.33333;
  let g = (g0 + g1 + g2) * 0.33333;
  let b = (b0 + b1 + b2) * 0.33333;

  /*
  blend the raw (possibly >255) value with fogColor, then clamp to 255 once.
  Since fog blend is linear interpolation,
  the unclamped version pulls the result slightly less toward fogColor than it should in that overexposed case — a small color shift,
  only in bright+fogged overlap, invisible in typical single/couple-light scenes.
   */
  if (avgFog > 0) {
    // avgFog < 1 here, the >= 1 case already returned above
    const fogR = fogColor >>> 16;
    const fogG = (fogColor >>> 8) & 255;
    const fogB = fogColor & 255;

    // Blend the mesh color with the fog color
    const invFog = 1 - avgFog;
    r = r * invFog + fogR * avgFog;
    g = g * invFog + fogG * avgFog;
    b = b * invFog + fogB * avgFog;
  }

  // inlines Math.min(255, r) into hardware-level SIMD/vectorized min instructions (minss on x86) and combines the | 0 directly into a float-to-int conversion instruction (cvttss2si).
  r = Math.min(255, r) | 0;
  g = Math.min(255, g) | 0;
  b = Math.min(255, b) | 0;

  ctx.beginPath();
  ctx.moveTo(px0, py0);
  ctx.lineTo(px1, py1);
  ctx.lineTo(px2, py2);
  ctx.closePath();

  // Quantize 8-bit color channels to 5-6-5 bits
  const qr = r & 0xf8; // Keep 5 bits
  const qg = g & 0xfc; // Keep 6 bits
  const qb = b & 0xf8; // Keep 5 bits

  // Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
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
