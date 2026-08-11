import { PALETTE_16BIT } from "../palette.js";
import {
  flatFill,
  CTX_STATE_SHADE_FILL,
  CTX_STATE_SAW_REAL_SHADING,
  STATS_FILL_DRAW_CALLS,
  STATS_SHADE_DRAW_CALLS,
} from "./shaderRegistry.js";

/**
 * This *is* the built-in SMOOTH (Gouraud) shader (Canvas2dRenderer.js dispatches shaderType 4
 * to these functions): per-vertex lighting approximated with a 2-stop canvas gradient along
 * the light-intensity axis, optional texture, linear/radial fog. Reserved as shaderType 4 - no
 * registration needed to use it. Also exported via scaliaEngine.shaders.smooth for consumers
 * who want to wrap it with extra per-face drawing, or use it as a reference for writing an
 * original shader (see registerShader in shaderRegistry.js for the full two-pass argument
 * contract every shader must implement).
 *
 * Split into a fill half (smoothShaderFill, base color/texture + fog) and a shade half
 * (smoothShaderShade, the Gouraud light gradient) - see flatShader.js's doc comment for why the
 * split exists. Unlike flatShader/avgFlatShader, this shader has no forward (fully-baked) case
 * at all - it always draws both halves, since a Gouraud gradient's antialiased edge landing
 * directly against whatever a neighboring face had already baked in is exactly the seam this
 * shader was the original motivating case for.
 */
export function smoothShaderFill(
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
  statsBuffer,
) {
  // Read 3 per-vertex colors directly from the flat renderer colorBuffer
  const cIdx = faceIdx * 3;
  const color32_0 = colorBuffer[cIdx];
  const color32_1 = colorBuffer[cIdx + 1];
  const color32_2 = colorBuffer[cIdx + 2];

  const r0 = color32_0 >>> 16,
    g0 = (color32_0 >>> 8) & 255,
    b0 = color32_0 & 255;
  const r1 = color32_1 >>> 16,
    g1 = (color32_1 >>> 8) & 255,
    b1 = color32_1 & 255;
  const r2 = color32_2 >>> 16,
    g2 = (color32_2 >>> 8) & 255,
    b2 = color32_2 & 255;

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
      // Calculating fog based on face centroid - only needed inside this textured branch, so
      // computed here rather than ahead of the texture check.
      let fogAmount = 0;

      // fogType arrives as a number (see CameraComponent.FogType: 0 NONE, 1 RADIAL, 2
      // RADIAL_FAST, 3 LINEAR) - compared directly as numbers here rather than through the enum
      // object, since a number === number check is cheaper per-face than dereferencing
      // CameraComponent.FogType.X and comparing strings.
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

        const cx = (w0x + w1x + w2x) * 0.33333;
        const cy = (w0y + w1y + w2y) * 0.33333;
        const cz = (w0z + w1z + w2z) * 0.33333;

        if (fogType === 2 /* RADIAL_FAST */) {
          const nearSq = fogNearPane * fogNearPane;
          const farSq = fogFarPane * fogFarPane;
          const invFogRangeSq = 1.0 / (farSq - nearSq);
          const distSq = cx * cx + cy * cy + cz * cz;
          fogAmount = (distSq - nearSq) * invFogRangeSq;
        } else {
          const distance = Math.sqrt(cx * cx + cy * cy + cz * cz);
          fogAmount = (distance - fogNearPane) / (fogFarPane - fogNearPane);
        }
      } else if (fogType === 3 /* LINEAR */) {
        const depth0 = clipGeometryBuffer[faceIdx * 9 + 2];
        const depth1 = clipGeometryBuffer[faceIdx * 9 + 5];
        const depth2 = clipGeometryBuffer[faceIdx * 9 + 8];
        const avgFog = (depth0 + depth1 + depth2) * 0.33333;
        fogAmount = (avgFog - fogNearPane) / (fogFarPane - fogNearPane);
      }

      if (fogAmount > 1) fogAmount = 1;
      else if (fogAmount < 0) fogAmount = 0;

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

      // Base buffer: the texture, unlit - lighting is the shade half's job now.
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

      // Fog belongs to the base buffer, blended toward fogColor same as always (source-over) -
      // it's atmosphere between camera and surface, not part of the surface's own lighting, so
      // it has no business being multiplied by the shading buffer later.
      if (fogAmount > 0) {
        const fogR = fogColor >>> 16;
        const fogG = (fogColor >>> 8) & 255;
        const fogB = fogColor & 255;
        const qrF = fogR & 0xf8;
        const qgF = fogG & 0xfc;
        const qbF = fogB & 0xf8;
        const color16F = (qrF << 8) | (qgF << 3) | (qbF >> 3);

        ctx.globalAlpha = fogAmount;

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

  // Non-textured base: raw (unlit) vertex color blended toward fogColor - lighting is the shade
  // half's job.
  let cr0 = r0,
    cg0 = g0,
    cb0 = b0;
  let cr1 = r1,
    cg1 = g1,
    cb1 = b1;
  let cr2 = r2,
    cg2 = g2,
    cb2 = b2;

  // Per-vertex fog - same per-vertex distance formula avgFlatShader.js uses before it averages,
  // kept per-vertex here instead so each vertex blends toward fogColor by its own amount. This
  // is what lets the gradient below actually vary fog across a large triangle (e.g. a merged
  // terrain quad) instead of baking in one shared average beforehand.
  let fog0 = 0,
    fog1 = 0,
    fog2 = 0;

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

  if (fog0 > 1) fog0 = 1;
  if (fog1 > 1) fog1 = 1;
  if (fog2 > 1) fog2 = 1;
  if (fog0 < 0) fog0 = 0;
  if (fog1 < 0) fog1 = 0;
  if (fog2 < 0) fog2 = 0;

  const fogR = fogColor >>> 16;
  const fogG = (fogColor >>> 8) & 255;
  const fogB = fogColor & 255;

  if (fog0 > 0) {
    const invFog0 = 1 - fog0;
    cr0 = (cr0 * invFog0 + fogR * fog0) | 0;
    cg0 = (cg0 * invFog0 + fogG * fog0) | 0;
    cb0 = (cb0 * invFog0 + fogB * fog0) | 0;
  } else {
    cr0 |= 0;
    cg0 |= 0;
    cb0 |= 0;
  }

  if (fog1 > 0) {
    const invFog1 = 1 - fog1;
    cr1 = (cr1 * invFog1 + fogR * fog1) | 0;
    cg1 = (cg1 * invFog1 + fogG * fog1) | 0;
    cb1 = (cb1 * invFog1 + fogB * fog1) | 0;
  } else {
    cr1 |= 0;
    cg1 |= 0;
    cb1 |= 0;
  }

  if (fog2 > 0) {
    const invFog2 = 1 - fog2;
    cr2 = (cr2 * invFog2 + fogR * fog2) | 0;
    cg2 = (cg2 * invFog2 + fogG * fog2) | 0;
    cb2 = (cb2 * invFog2 + fogB * fog2) | 0;
  } else {
    cr2 |= 0;
    cg2 |= 0;
    cb2 |= 0;
  }

  const c16_0 = ((cr0 & 0xf8) << 8) | ((cg0 & 0xfc) << 3) | ((cb0 & 0xf8) >> 3);
  const c16_1 = ((cr1 & 0xf8) << 8) | ((cg1 & 0xfc) << 3) | ((cb1 & 0xf8) >> 3);
  const c16_2 = ((cr2 & 0xf8) << 8) | ((cg2 & 0xfc) << 3) | ((cb2 & 0xf8) >> 3);

  // EARLY OUT: if all quantized base colors are identical, fallback to cheapest flat fill
  if (c16_0 === c16_1 && c16_1 === c16_2) {
    flatFill(ctx, px0, py0, px1, py1, px2, py2, c16_0, 0, ctxStateBuffer, statsBuffer);
    return;
  }

  // Screen space coordinates - base color varies enough across the face to need its own
  // gradient, independent of whatever the shade half does.
  let _px0 = px0,
    _py0 = py0,
    _px1 = px1,
    _py1 = py1,
    _px2 = px2,
    _py2 = py2;
  let pi0 = cr0 + cg0 + cb0,
    pi1 = cr1 + cg1 + cb1,
    pi2 = cr2 + cg2 + cb2;
  let _c16_0 = c16_0,
    _c16_1 = c16_1,
    _c16_2 = c16_2;

  // In-place sort by brightness (ascending)
  if (pi0 > pi1) {
    let t;
    t = _px0;
    _px0 = _px1;
    _px1 = t;
    t = _py0;
    _py0 = _py1;
    _py1 = t;
    t = pi0;
    pi0 = pi1;
    pi1 = t;
    t = _c16_0;
    _c16_0 = _c16_1;
    _c16_1 = t;
  }
  if (pi1 > pi2) {
    let t;
    t = _px1;
    _px1 = _px2;
    _px2 = t;
    t = _py1;
    _py1 = _py2;
    _py2 = t;
    t = pi1;
    pi1 = pi2;
    pi2 = t;
    t = _c16_1;
    _c16_1 = _c16_2;
    _c16_2 = t;
  }
  if (pi0 > pi1) {
    let t;
    t = _px0;
    _px0 = _px1;
    _px1 = t;
    t = _py0;
    _py0 = _py1;
    _py1 = t;
    t = pi0;
    pi0 = pi1;
    pi1 = t;
    t = _c16_0;
    _c16_0 = _c16_1;
    _c16_1 = t;
  }

  // If brightness spread is minimal despite differently-quantized colors (e.g. two distinct
  // colors that happen to sum to the same total), fall back to flat - pi2-pi0 is the gradient
  // math's divisor below, so this also guards against dividing by (near) zero.
  if (pi2 - pi0 < 0.01) {
    flatFill(ctx, px0, py0, px1, py1, px2, py2, _c16_0, 0, ctxStateBuffer, statsBuffer);
    return;
  }

  // Precise 2D parametric mapping of the base color gradient
  const t_val = (pi1 - pi0) / (pi2 - pi0);

  const p13x = _px0 + t_val * (_px2 - _px0);
  const p13y = _py0 + t_val * (_py2 - _py0);

  const dx = _px1 - p13x;
  const dy = _py1 - p13y;

  const gx_dir = -dy;
  const gy_dir = dx;

  const den = gx_dir * gx_dir + gy_dir * gy_dir;

  let gx_end, gy_end;

  if (den < 1e-6) {
    gx_end = _px2;
    gy_end = _py2;
  } else {
    const num = (_px2 - _px0) * gx_dir + (_py2 - _py0) * gy_dir;
    const factor = num / den;
    gx_end = _px0 + factor * gx_dir;
    gy_end = _py0 + factor * gy_dir;
  }

  const grad = ctx.createLinearGradient(_px0, _py0, gx_end, gy_end);
  grad.addColorStop(0, PALETTE_16BIT[_c16_0]);
  grad.addColorStop(1, PALETTE_16BIT[_c16_2]);

  ctx.fillStyle = grad;

  ctx.beginPath();
  ctx.moveTo(epx0, epy0);
  ctx.lineTo(epx1, epy1);
  ctx.lineTo(epx2, epy2);
  ctx.closePath();

  ctx.fill();
  statsBuffer[STATS_FILL_DRAW_CALLS]++; // gradient fills are never batchable
}

export function smoothShaderShade(
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
  ctxStateBuffer,
  statsBuffer,
) {
  // Per-vertex lit intensity - shading is texture-independent (same gradient multiplies either
  // the raw albedo or the texture once composited), so this is computed once and used by both
  // the textured-face and non-textured-face paths below.
  let litR = ambientLightRgb >>> 16;
  let litG = (ambientLightRgb >>> 8) & 255;
  let litB = ambientLightRgb & 255;

  let ir0 = litR,
    ig0 = litG,
    ib0 = litB,
    ir1 = litR,
    ig1 = litG,
    ib1 = litB,
    ir2 = litR,
    ig2 = litG,
    ib2 = litB;

  let nx0 = vertexNormalsBuffer[v0Idx],
    ny0 = vertexNormalsBuffer[v0Idx + 1],
    nz0 = vertexNormalsBuffer[v0Idx + 2];
  let nx1 = vertexNormalsBuffer[v1Idx],
    ny1 = vertexNormalsBuffer[v1Idx + 1],
    nz1 = vertexNormalsBuffer[v1Idx + 2];
  let nx2 = vertexNormalsBuffer[v2Idx],
    ny2 = vertexNormalsBuffer[v2Idx + 1],
    nz2 = vertexNormalsBuffer[v2Idx + 2];

  const lightsCount = lightsIndexBuffer[0];
  for (let l = 1; l <= lightsCount; l++) {
    const lightGO = gameObjects[lightsIndexBuffer[l]];
    // DIRECTIONAL
    if (lightGO.light.type === 0) {
      const lightR = lightGO.light.color >>> 16;
      const lightG = (lightGO.light.color >>> 8) & 255;
      const lightB = lightGO.light.color & 255;

      const lx = -lightGO.transform.worldMatrix[8];
      const ly = -lightGO.transform.worldMatrix[9];
      const lz = -lightGO.transform.worldMatrix[10];

      let d0 = nx0 * lx + ny0 * ly + nz0 * lz;
      let d1 = nx1 * lx + ny1 * ly + nz1 * lz;
      let d2 = nx2 * lx + ny2 * ly + nz2 * lz;

      if (d0 > 0) {
        ir0 += lightR * d0;
        ig0 += lightG * d0;
        ib0 += lightB * d0;
      }
      if (d1 > 0) {
        ir1 += lightR * d1;
        ig1 += lightG * d1;
        ib1 += lightB * d1;
      }
      if (d2 > 0) {
        ir2 += lightR * d2;
        ig2 += lightG * d2;
        ib2 += lightB * d2;
      }
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

  // Clamp each channel to [0, 1] here (not just the final blended color) - shadeCtx represents
  // light intensity as an opaque 0-255 color for `multiply`, which structurally can't exceed
  // 1x the base color, so an unclamped ir/ig/ib > 1 (overbright/stacked lights) would otherwise
  // silently wrap or misquantize instead of just saturating at "fully lit, no darkening".
  if (ir0 > 1) ir0 = 1;
  if (ig0 > 1) ig0 = 1;
  if (ib0 > 1) ib0 = 1;
  if (ir1 > 1) ir1 = 1;
  if (ig1 > 1) ig1 = 1;
  if (ib1 > 1) ib1 = 1;
  if (ir2 > 1) ir2 = 1;
  if (ig2 > 1) ig2 = 1;
  if (ib2 > 1) ib2 = 1;

  // Scalar per-vertex intensity, used only as the sort/flat-vs-gradient key below (matches the
  // original single-buffer shader's choice of key) - the actual shading fill color is the full
  // per-channel ir/ig/ib above, not this scalar.
  const i0 = Math.max(ir0, ig0, ib0);
  const i1 = Math.max(ir1, ig1, ib1);
  const i2 = Math.max(ir2, ig2, ib2);

  // Handle texture - only to know which fog value (face-average vs per-vertex) applies; the
  // shading math itself doesn't touch the texture at all.
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
      // Calculating fog based on face centroid - matches smoothShaderFill's textured branch.
      let fogAmount = 0;

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

        const cx = (w0x + w1x + w2x) * 0.33333;
        const cy = (w0y + w1y + w2y) * 0.33333;
        const cz = (w0z + w1z + w2z) * 0.33333;

        if (fogType === 2 /* RADIAL_FAST */) {
          const nearSq = fogNearPane * fogNearPane;
          const farSq = fogFarPane * fogFarPane;
          const invFogRangeSq = 1.0 / (farSq - nearSq);
          const distSq = cx * cx + cy * cy + cz * cz;
          fogAmount = (distSq - nearSq) * invFogRangeSq;
        } else {
          const distance = Math.sqrt(cx * cx + cy * cy + cz * cz);
          fogAmount = (distance - fogNearPane) / (fogFarPane - fogNearPane);
        }
      } else if (fogType === 3 /* LINEAR */) {
        const depth0 = clipGeometryBuffer[faceIdx * 9 + 2];
        const depth1 = clipGeometryBuffer[faceIdx * 9 + 5];
        const depth2 = clipGeometryBuffer[faceIdx * 9 + 8];
        const avgFog = (depth0 + depth1 + depth2) * 0.33333;
        fogAmount = (avgFog - fogNearPane) / (fogFarPane - fogNearPane);
      }

      if (fogAmount > 1) fogAmount = 1;
      else if (fogAmount < 0) fogAmount = 0;

      // Faded toward white (1.0 = no darkening) by fogAmount so a heavily-fogged face's
      // `multiply` composite approaches a no-op and the fogColor smoothShaderFill already
      // blended in shows through untouched.
      const invFogT = 1 - fogAmount;
      const lr0 = ((ir0 * invFogT + fogAmount) * 255) | 0;
      const lg0 = ((ig0 * invFogT + fogAmount) * 255) | 0;
      const lb0 = ((ib0 * invFogT + fogAmount) * 255) | 0;
      const lr1 = ((ir1 * invFogT + fogAmount) * 255) | 0;
      const lg1 = ((ig1 * invFogT + fogAmount) * 255) | 0;
      const lb1 = ((ib1 * invFogT + fogAmount) * 255) | 0;
      const lr2 = ((ir2 * invFogT + fogAmount) * 255) | 0;
      const lg2 = ((ig2 * invFogT + fogAmount) * 255) | 0;
      const lb2 = ((ib2 * invFogT + fogAmount) * 255) | 0;

      const l16_0 =
        ((lr0 & 0xf8) << 8) | ((lg0 & 0xfc) << 3) | ((lb0 & 0xf8) >> 3);
      const l16_1 =
        ((lr1 & 0xf8) << 8) | ((lg1 & 0xfc) << 3) | ((lb1 & 0xf8) >> 3);
      const l16_2 =
        ((lr2 & 0xf8) << 8) | ((lg2 & 0xfc) << 3) | ((lb2 & 0xf8) >> 3);

      let _epx0 = epx0,
        _epy0 = epy0,
        _epx1 = epx1,
        _epy1 = epy1,
        _epx2 = epx2,
        _epy2 = epy2;
      let pi0 = i0,
        pi1 = i1,
        pi2 = i2;
      let _l16_0 = l16_0,
        _l16_1 = l16_1,
        _l16_2 = l16_2;

      // In-place sort by intensity (ascending)
      if (pi0 > pi1) {
        let t;
        t = _epx0;
        _epx0 = _epx1;
        _epx1 = t;
        t = _epy0;
        _epy0 = _epy1;
        _epy1 = t;
        t = pi0;
        pi0 = pi1;
        pi1 = t;
        t = _l16_0;
        _l16_0 = _l16_1;
        _l16_1 = t;
      }
      if (pi1 > pi2) {
        let t;
        t = _epx1;
        _epx1 = _epx2;
        _epx2 = t;
        t = _epy1;
        _epy1 = _epy2;
        _epy2 = t;
        t = pi1;
        pi1 = pi2;
        pi2 = t;
        t = _l16_1;
        _l16_1 = _l16_2;
        _l16_2 = t;
      }
      if (pi0 > pi1) {
        let t;
        t = _epx0;
        _epx0 = _epx1;
        _epx1 = t;
        t = _epy0;
        _epy0 = _epy1;
        _epy1 = t;
        t = pi0;
        pi0 = pi1;
        pi1 = t;
        t = _l16_0;
        _l16_0 = _l16_1;
        _l16_1 = t;
      }

      // If intensity difference is minimal, use flat shading
      if (pi2 - pi0 < 0.01 || (_l16_0 === _l16_1 && _l16_1 === _l16_2)) {
        flatFill(
          shadeCtx,
          px0,
          py0,
          px1,
          py1,
          px2,
          py2,
          _l16_0,
          CTX_STATE_SHADE_FILL,
          ctxStateBuffer,
          statsBuffer,
        );
      } else {
        // Precise 2D parametric mapping of Gouraud light gradient
        const t_val = (pi1 - pi0) / (pi2 - pi0);

        const p13x = _epx0 + t_val * (_epx2 - _epx0);
        const p13y = _epy0 + t_val * (_epy2 - _epy0);

        const dx = _epx1 - p13x;
        const dy = _epy1 - p13y;

        const gx_dir = -dy;
        const gy_dir = dx;

        const den = gx_dir * gx_dir + gy_dir * gy_dir;

        let gx_end, gy_end;

        if (den < 1e-6) {
          gx_end = _epx2;
          gy_end = _epy2;
        } else {
          const num = (_epx2 - _epx0) * gx_dir + (_epy2 - _epy0) * gy_dir;
          const factor = num / den;
          gx_end = _epx0 + factor * gx_dir;
          gy_end = _epy0 + factor * gy_dir;
        }

        const lightGrad = shadeCtx.createLinearGradient(
          _epx0,
          _epy0,
          gx_end,
          gy_end,
        );
        lightGrad.addColorStop(0, PALETTE_16BIT[_l16_0]);
        lightGrad.addColorStop(1, PALETTE_16BIT[_l16_2]);

        shadeCtx.fillStyle = lightGrad;

        shadeCtx.beginPath();
        shadeCtx.moveTo(epx0, epy0);
        shadeCtx.lineTo(epx1, epy1);
        shadeCtx.lineTo(epx2, epy2);
        shadeCtx.closePath();

        shadeCtx.fill();
        statsBuffer[STATS_SHADE_DRAW_CALLS]++; // gradient fills are never batchable
        ctxStateBuffer[CTX_STATE_SAW_REAL_SHADING] = 1; // bypasses flatFill's own check
      }

      return;
    }
  }

  // Per-vertex fog - matches smoothShaderFill's non-textured branch, kept per-vertex instead of
  // averaged so the gradient below can vary fog across a large triangle (e.g. a merged terrain
  // quad) instead of baking in one shared average beforehand.
  let fog0 = 0,
    fog1 = 0,
    fog2 = 0;

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

  if (fog0 > 1) fog0 = 1;
  if (fog1 > 1) fog1 = 1;
  if (fog2 > 1) fog2 = 1;
  if (fog0 < 0) fog0 = 0;
  if (fog1 < 0) fog1 = 0;
  if (fog2 < 0) fog2 = 0;

  // Faded toward white by each vertex's own fog amount (same reasoning as the textured branch
  // above) - always drawn on the expanded (epx/epy) path since this buffer never strokes and
  // wants the generous overlap for anti-seam purposes.
  const l0r = ((ir0 * (1 - fog0) + fog0) * 255) | 0;
  const l0g = ((ig0 * (1 - fog0) + fog0) * 255) | 0;
  const l0b = ((ib0 * (1 - fog0) + fog0) * 255) | 0;
  const l1r = ((ir1 * (1 - fog1) + fog1) * 255) | 0;
  const l1g = ((ig1 * (1 - fog1) + fog1) * 255) | 0;
  const l1b = ((ib1 * (1 - fog1) + fog1) * 255) | 0;
  const l2r = ((ir2 * (1 - fog2) + fog2) * 255) | 0;
  const l2g = ((ig2 * (1 - fog2) + fog2) * 255) | 0;
  const l2b = ((ib2 * (1 - fog2) + fog2) * 255) | 0;

  const sl16_0 = ((l0r & 0xf8) << 8) | ((l0g & 0xfc) << 3) | ((l0b & 0xf8) >> 3);
  const sl16_1 = ((l1r & 0xf8) << 8) | ((l1g & 0xfc) << 3) | ((l1b & 0xf8) >> 3);
  const sl16_2 = ((l2r & 0xf8) << 8) | ((l2g & 0xfc) << 3) | ((l2b & 0xf8) >> 3);

  if (
    Math.max(i0, i1, i2) - Math.min(i0, i1, i2) < 0.01 ||
    (sl16_0 === sl16_1 && sl16_1 === sl16_2)
  ) {
    flatFill(
      shadeCtx,
      px0,
      py0,
      px1,
      py1,
      px2,
      py2,
      sl16_0,
      CTX_STATE_SHADE_FILL,
      ctxStateBuffer,
      statsBuffer,
    );

    return;
  }

  let _sepx0 = epx0,
    _sepy0 = epy0,
    _sepx1 = epx1,
    _sepy1 = epy1,
    _sepx2 = epx2,
    _sepy2 = epy2;
  let si0 = i0,
    si1 = i1,
    si2 = i2;
  let _sl16_0 = sl16_0,
    _sl16_1 = sl16_1,
    _sl16_2 = sl16_2;

  // In-place sort by intensity (ascending)
  if (si0 > si1) {
    let t;
    t = _sepx0;
    _sepx0 = _sepx1;
    _sepx1 = t;
    t = _sepy0;
    _sepy0 = _sepy1;
    _sepy1 = t;
    t = si0;
    si0 = si1;
    si1 = t;
    t = _sl16_0;
    _sl16_0 = _sl16_1;
    _sl16_1 = t;
  }
  if (si1 > si2) {
    let t;
    t = _sepx1;
    _sepx1 = _sepx2;
    _sepx2 = t;
    t = _sepy1;
    _sepy1 = _sepy2;
    _sepy2 = t;
    t = si1;
    si1 = si2;
    si2 = t;
    t = _sl16_1;
    _sl16_1 = _sl16_2;
    _sl16_2 = t;
  }
  if (si0 > si1) {
    let t;
    t = _sepx0;
    _sepx0 = _sepx1;
    _sepx1 = t;
    t = _sepy0;
    _sepy0 = _sepy1;
    _sepy1 = t;
    t = si0;
    si0 = si1;
    si1 = t;
    t = _sl16_0;
    _sl16_0 = _sl16_1;
    _sl16_1 = t;
  }

  // Precise 2D parametric mapping of the Gouraud light gradient
  const st_val = (si1 - si0) / (si2 - si0);

  const sp13x = _sepx0 + st_val * (_sepx2 - _sepx0);
  const sp13y = _sepy0 + st_val * (_sepy2 - _sepy0);

  const sdx = _sepx1 - sp13x;
  const sdy = _sepy1 - sp13y;

  const sgx_dir = -sdy;
  const sgy_dir = sdx;

  const sden = sgx_dir * sgx_dir + sgy_dir * sgy_dir;

  let sgx_end, sgy_end;

  if (sden < 1e-6) {
    sgx_end = _sepx2;
    sgy_end = _sepy2;
  } else {
    const snum = (_sepx2 - _sepx0) * sgx_dir + (_sepy2 - _sepy0) * sgy_dir;
    const sfactor = snum / sden;
    sgx_end = _sepx0 + sfactor * sgx_dir;
    sgy_end = _sepy0 + sfactor * sgy_dir;
  }

  const shadeGrad = shadeCtx.createLinearGradient(
    _sepx0,
    _sepy0,
    sgx_end,
    sgy_end,
  );
  shadeGrad.addColorStop(0, PALETTE_16BIT[_sl16_0]);
  shadeGrad.addColorStop(1, PALETTE_16BIT[_sl16_2]);

  shadeCtx.fillStyle = shadeGrad;

  shadeCtx.beginPath();
  shadeCtx.moveTo(epx0, epy0);
  shadeCtx.lineTo(epx1, epy1);
  shadeCtx.lineTo(epx2, epy2);
  shadeCtx.closePath();

  shadeCtx.fill();
  statsBuffer[STATS_SHADE_DRAW_CALLS]++; // gradient fills are never batchable
  ctxStateBuffer[CTX_STATE_SAW_REAL_SHADING] = 1; // bypasses flatFill's own check
}
