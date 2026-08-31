import {
  CTX_STATE_SAW_REAL_SHADING,
  CTX_STATE_SHADE_FILL,
  flatFill,
  STATS_SHADE_DRAW_CALLS,
} from "../shared/shaders.js";
import { PALETTE_16BIT } from "../palette.js";

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
  meshIdx,
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

  const sl16_0 =
    ((l0r & 0xf8) << 8) | ((l0g & 0xfc) << 3) | ((l0b & 0xf8) >> 3);
  const sl16_1 =
    ((l1r & 0xf8) << 8) | ((l1g & 0xfc) << 3) | ((l1b & 0xf8) >> 3);
  const sl16_2 =
    ((l2r & 0xf8) << 8) | ((l2g & 0xfc) << 3) | ((l2b & 0xf8) >> 3);

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
