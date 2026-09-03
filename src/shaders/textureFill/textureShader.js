import { flatFill, STATS_FILL_DRAW_CALLS } from "../../shared/shaders.js";

/**
 * Affine texture-mapped fill, drawn as a pattern fill rather than a clip + drawImage.
 *
 * Canvas2D can only draw an image under an affine transform, so a triangle is textured by solving
 * for the affine that carries its three UVs onto its three screen positions. Affine is exact per
 * triangle - the perspective divide already happened, so there is no perspective correction left
 * to lose.
 *
 * Where the map goes is what makes this cheap. Putting it on the CONTEXT and building the path in
 * TEXTURE space turns a textured face into an ordinary `fill()`: a pattern lives in user space,
 * user space is now texture space, so texel (u,v) lands exactly where the map sends it. No clip,
 * no save/restore, no drawImage - and every rule that applies to a flat fill applies unchanged.
 * The conventional recipe (clip to the screen triangle, then drawImage through the map) records
 * and rasterises several times more for the same pixels. The map goes on the context and not on
 * the pattern; mutating a pattern's own matrix per shape is markedly more expensive to record.
 *
 * Immediate-mode: it carries no state and so never references `last`.
 *
 * The path is the seam-expanded outline (epx/epy) mapped back into texture space, not the exact
 * one, for the same reason the untextured path strokes its boundary: abutting fills each cover
 * about half the pixels along a shared edge. The pattern repeats rather than clamping, so the
 * expanded ring always samples opaque texels instead of leaving a transparent gap.
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

      // Texture-space coordinates of the seam-expanded triangle: invert the map and push the
      // already-expanded screen vertices back through it, so the covered region is exactly what
      // the clip-based recipe covered.
      const det = a * d - bT * c;
      if (det !== 0) {
        const invDet = 1 / det;
        const ex0 = epx0 - e;
        const ey0 = epy0 - f;
        const ex1 = epx1 - e;
        const ey1 = epy1 - f;
        const ex2 = epx2 - e;
        const ey2 = epy2 - f;

        let pattern = mesh.texturePattern;
        if (!pattern) {
          // 'repeat', not 'no-repeat': the expanded ring reaches outside the face's UV rect, and
          // a non-repeating pattern is transparent there, which would open the very gap the
          // expansion exists to close.
          pattern = ctx.createPattern(img, "repeat");
          mesh.texturePattern = pattern;
        }

        ctx.fillStyle = pattern;
        // The colour cache tracks a palette entry, and this is not one - force the next flat face
        // to set its own style rather than trusting a stale hit.
        ctxStateBuffer[0] = -1;

        ctx.setTransform(a, bT, c, d, e, f);
        ctx.beginPath();
        ctx.moveTo((d * ex0 - c * ey0) * invDet, (a * ey0 - bT * ex0) * invDet);
        ctx.lineTo((d * ex1 - c * ey1) * invDet, (a * ey1 - bT * ex1) * invDet);
        ctx.lineTo((d * ex2 - c * ey2) * invDet, (a * ey2 - bT * ex2) * invDet);
        ctx.fill();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        statsBuffer[STATS_FILL_DRAW_CALLS]++;

        return;
      }
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
