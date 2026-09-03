import { flatFill, STATS_FILL_DRAW_CALLS } from "../../shared/shaders.js";

/**
 * Affine texture-mapped fill.
 *
 * Canvas2D can only draw an image under an affine transform, so a triangle is textured by solving
 * for the affine that carries its three UVs onto its three screen positions, clipping to the
 * triangle, and drawing the whole image through that transform. Affine is exact per triangle -
 * the perspective divide already happened, so there is no perspective correction left to lose.
 *
 * Immediate-mode: a textured face has nothing to merge with, since every one needs its own clip
 * and transform. It carries no state and so never references `last`.
 *
 * The triangle is clipped to the seam-expanded outline (epx/epy) rather than the exact one, for
 * the same reason the untextured path strokes its boundary: abutting fills each cover about half
 * the pixels along a shared edge, and a clip region cannot be stroked back.
 */
export function textureShaderFill(
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
  frameId,
  last,
) {
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

    // A degenerate UV triangle has no invertible mapping - fall through to the flat colour rather
    // than dividing by ~0 and drawing the image at an arbitrary transform.
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

      ctx.clip();
      ctx.setTransform(a, bT, c, d, e, f);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
      statsBuffer[STATS_FILL_DRAW_CALLS]++;

      return;
    }
  }

  // No usable texture yet - an image still loading, or UVs that do not form a triangle. Draw the
  // base colour instead of nothing: the face still has to cover what is behind it, and a mesh that
  // vanished until its image arrived would show through to whatever the sort put underneath.
  const color32 = colorBuffer[faceIdx * 3];
  const color16 =
    (((color32 >>> 16) & 0xf8) << 8) |
    (((color32 >>> 8) & 0xfc) << 3) |
    ((color32 & 0xf8) >> 3);

  flatFill(
    ctx,
    px0,
    py0,
    px1,
    py1,
    px2,
    py2,
    color16,
    0,
    ctxStateBuffer,
    statsBuffer,
  );
}
