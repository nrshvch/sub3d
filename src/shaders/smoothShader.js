import { PALETTE_16BIT } from "../palette.js";

/**
 * This *is* the built-in SMOOTH (Gouraud) shader (Canvas2dRenderer.js dispatches shaderType 4
 * straight to this function): per-vertex lighting approximated with a 2-stop canvas gradient
 * along the light-intensity axis, optional texture, linear/radial fog. Reserved as
 * shaderType 4 - no registration needed to use it. Also exported via
 * scaliaEngine.shaders.smooth for consumers who want to wrap it with extra per-face drawing,
 * or use it as a reference for writing an original shader (see registerShader in
 * shaderRegistry.js for the full argument contract every shader must implement).
 *
 * Maintains ctxStateBuffer exactly like every other shader, so a run of same-colored faces -
 * whether this shader, a registered consumer shader, or a different built-in - only touches
 * ctx.fillStyle/strokeStyle/lineWidth/lineJoin when the value actually changes. Gradient
 * fills can't be cached as a key (each one is a fresh object), so those invalidate
 * ctxStateBuffer[0] to -1 instead.
 */
export function smoothShader(
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

  let i0 = Math.min(Math.max(ir0, ig0, ib0), 1);
  let i1 = Math.min(Math.max(ir1, ig1, ib1), 1);
  let i2 = Math.min(Math.max(ir2, ig2, ib2), 1);

  // Calculating fog based on face centroid
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

      // Calculate vertex lighting color keys (clamped and quantized to 5-6-5)
      const lr0 = ir0 >= 1.0 ? 255 : (ir0 * 255) | 0;
      const lg0 = ig0 >= 1.0 ? 255 : (ig0 * 255) | 0;
      const lb0 = ib0 >= 1.0 ? 255 : (ib0 * 255) | 0;

      const lr1 = ir1 >= 1.0 ? 255 : (ir1 * 255) | 0;
      const lg1 = ig1 >= 1.0 ? 255 : (ig1 * 255) | 0;
      const lb1 = ib1 >= 1.0 ? 255 : (ib1 * 255) | 0;

      const lr2 = ir2 >= 1.0 ? 255 : (ir2 * 255) | 0;
      const lg2 = ig2 >= 1.0 ? 255 : (ig2 * 255) | 0;
      const lb2 = ib2 >= 1.0 ? 255 : (ib2 * 255) | 0;

      const l16_0 =
        ((lr0 & 0xf8) << 8) | ((lg0 & 0xfc) << 3) | ((lb0 & 0xf8) >> 3);
      const l16_1 =
        ((lr1 & 0xf8) << 8) | ((lg1 & 0xfc) << 3) | ((lb1 & 0xf8) >> 3);
      const l16_2 =
        ((lr2 & 0xf8) << 8) | ((lg2 & 0xfc) << 3) | ((lb2 & 0xf8) >> 3);

      let _px0 = px0,
        _py0 = py0,
        _px1 = px1,
        _py1 = py1,
        _px2 = px2,
        _py2 = py2;
      let pi0 = i0,
        pi1 = i1,
        pi2 = i2;
      let _l16_0 = l16_0,
        _l16_1 = l16_1,
        _l16_2 = l16_2;

      // In-place sort by intensity (ascending)
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
        t = _l16_0;
        _l16_0 = _l16_1;
        _l16_1 = t;
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
        t = _l16_1;
        _l16_1 = _l16_2;
        _l16_2 = t;
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
        t = _l16_0;
        _l16_0 = _l16_1;
        _l16_1 = t;
      }

      ctx.globalCompositeOperation = "multiply";

      // If intensity difference is minimal, use flat lighting overlay
      if (pi2 - pi0 < 0.01 || (_l16_0 === _l16_1 && _l16_1 === _l16_2)) {
        if (ctxStateBuffer[0] !== _l16_0) {
          ctx.fillStyle = PALETTE_16BIT[_l16_0];
          ctxStateBuffer[0] = _l16_0;
        }

        ctx.beginPath();
        ctx.moveTo(epx0, epy0);
        ctx.lineTo(epx1, epy1);
        ctx.lineTo(epx2, epy2);
        ctx.closePath();
        ctx.fill();
      } else {
        // Precise 2D parametric mapping of Gouraud light gradient
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

        const lightGrad = ctx.createLinearGradient(_px0, _py0, gx_end, gy_end);
        lightGrad.addColorStop(0, PALETTE_16BIT[_l16_0]);
        lightGrad.addColorStop(1, PALETTE_16BIT[_l16_2]);

        ctxStateBuffer[0] = -1; // gradient objects can't be cached as a key
        ctx.fillStyle = lightGrad;

        ctx.beginPath();
        ctx.moveTo(epx0, epy0);
        ctx.lineTo(epx1, epy1);
        ctx.lineTo(epx2, epy2);
        ctx.closePath();

        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over"; // required by the shader contract

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

  // Base quantized colors per vertex
  let cr0 = r0 * ir0,
    cg0 = g0 * ig0,
    cb0 = b0 * ib0;
  let cr1 = r1 * ir1,
    cg1 = g1 * ig1,
    cb1 = b1 * ib1;
  let cr2 = r2 * ir2,
    cg2 = g2 * ig2,
    cb2 = b2 * ib2;

  cr0 = cr0 > 255 ? 255 : cr0;
  cg0 = cg0 > 255 ? 255 : cg0;
  cb0 = cb0 > 255 ? 255 : cb0;
  cr1 = cr1 > 255 ? 255 : cr1;
  cg1 = cg1 > 255 ? 255 : cg1;
  cb1 = cb1 > 255 ? 255 : cb1;
  cr2 = cr2 > 255 ? 255 : cr2;
  cg2 = cg2 > 255 ? 255 : cg2;
  cb2 = cb2 > 255 ? 255 : cb2;

  if (fogAmount > 0) {
    const invFog = 1 - fogAmount;
    const fogR = fogColor >>> 16;
    const fogG = (fogColor >>> 8) & 255;
    const fogB = fogColor & 255;
    const fr = fogR * fogAmount;
    const fg = fogG * fogAmount;
    const fb = fogB * fogAmount;
    cr0 = (cr0 * invFog + fr) | 0;
    cg0 = (cg0 * invFog + fg) | 0;
    cb0 = (cb0 * invFog + fb) | 0;
    cr1 = (cr1 * invFog + fr) | 0;
    cg1 = (cg1 * invFog + fg) | 0;
    cb1 = (cb1 * invFog + fb) | 0;
    cr2 = (cr2 * invFog + fr) | 0;
    cg2 = (cg2 * invFog + fg) | 0;
    cb2 = (cb2 * invFog + fb) | 0;
  } else {
    cr0 |= 0;
    cg0 |= 0;
    cb0 |= 0;
    cr1 |= 0;
    cg1 |= 0;
    cb1 |= 0;
    cr2 |= 0;
    cg2 |= 0;
    cb2 |= 0;
  }

  const c16_0 = ((cr0 & 0xf8) << 8) | ((cg0 & 0xfc) << 3) | ((cb0 & 0xf8) >> 3);
  const c16_1 = ((cr1 & 0xf8) << 8) | ((cg1 & 0xfc) << 3) | ((cb1 & 0xf8) >> 3);
  const c16_2 = ((cr2 & 0xf8) << 8) | ((cg2 & 0xfc) << 3) | ((cb2 & 0xf8) >> 3);

  // EARLY OUT: if all quantized colors are identical, fallback to cheapest flat fill
  if (c16_0 === c16_1 && c16_1 === c16_2) {
    ctx.beginPath();
    ctx.moveTo(px0, py0);
    ctx.lineTo(px1, py1);
    ctx.lineTo(px2, py2);
    ctx.closePath();

    if (ctxStateBuffer[0] !== c16_0) {
      ctx.fillStyle = PALETTE_16BIT[c16_0];
      ctxStateBuffer[0] = c16_0;
    }

    if (ctxStateBuffer[1] !== c16_0) {
      ctx.strokeStyle = PALETTE_16BIT[c16_0];
      ctxStateBuffer[1] = c16_0;
    }

    if (ctxStateBuffer[2] !== 10) {
      ctx.lineWidth = 1;
      ctx.lineJoin = "miter";
      ctxStateBuffer[2] = 10;
    }

    ctx.stroke();
    ctx.fill();
    return;
  }

  // Screen space coordinates
  let _px0 = px0,
    _py0 = py0,
    _px1 = px1,
    _py1 = py1,
    _px2 = px2,
    _py2 = py2;
  let pi0 = i0,
    pi1 = i1,
    pi2 = i2;
  let _c16_0 = c16_0,
    _c16_1 = c16_1,
    _c16_2 = c16_2;

  // In-place sort by intensity (ascending)
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

  // If intensity difference is minimal, use flat shading
  if (pi2 - pi0 < 0.01) {
    ctx.beginPath();
    ctx.moveTo(px0, py0);
    ctx.lineTo(px1, py1);
    ctx.lineTo(px2, py2);
    ctx.closePath();

    if (ctxStateBuffer[0] !== _c16_0) {
      ctx.fillStyle = PALETTE_16BIT[_c16_0];
      ctxStateBuffer[0] = _c16_0;
    }

    if (ctxStateBuffer[1] !== _c16_0) {
      ctx.strokeStyle = PALETTE_16BIT[_c16_0];
      ctxStateBuffer[1] = _c16_0;
    }

    if (ctxStateBuffer[2] !== 10) {
      ctx.lineWidth = 1;
      ctx.lineJoin = "miter";
      ctxStateBuffer[2] = 10;
    }

    ctx.stroke();
    ctx.fill();
  } else {
    // Precise 2D parametric mapping of Gouraud triangle gradient
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

    ctxStateBuffer[0] = -1; // gradient objects can't be cached as a key
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.moveTo(epx0, epy0);
    ctx.lineTo(epx1, epy1);
    ctx.lineTo(epx2, epy2);
    ctx.closePath();

    ctx.fill();
  }
}
