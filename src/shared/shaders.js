import { PALETTE_16BIT, WHITE16 } from "../palette.js";

// Slots into the shared ctxStateBuffer/statsBuffer Canvas2dRenderer.js owns (see
// shaderRegistry.js's registerShader doc comment for the full layout).
export const CTX_STATE_FILL_PASS_FILL_STYLE_SLOT = 0;
export const CTX_STATE_SHADE_FILL = 3;

export const CTX_STATE_SAW_REAL_SHADING = 8;

export const STATS_FILL_DRAW_CALLS = 0;
export const STATS_SHADE_DRAW_CALLS = 2;

// Immediate-mode triangle fill: one stroke()+fill() per face, no batching and nothing deferred.
// Strokes in the fill colour to close the conflation seam. The welder repairs the same seam by
// offsetting the edges a face owns instead, which it can only do because it knows the draw order -
// an immediate-mode face has no such context, so the stroke stays here.
export function flatFill(
  targetCtx,
  px0,
  py0,
  px1,
  py1,
  px2,
  py2,
  color16,
  slot,
  ctxStateBuffer,
  statsBuffer,
) {
  if (ctxStateBuffer[slot] !== color16) {
    const style = PALETTE_16BIT[color16];
    targetCtx.fillStyle = style;
    targetCtx.strokeStyle = style;
    ctxStateBuffer[slot] = color16;

    if (slot === CTX_STATE_SHADE_FILL && color16 !== WHITE16) {
      ctxStateBuffer[CTX_STATE_SAW_REAL_SHADING] = 1;
    }
  }

  targetCtx.beginPath();
  targetCtx.moveTo(px0, py0);
  targetCtx.lineTo(px1, py1);
  targetCtx.lineTo(px2, py2);
  targetCtx.closePath();

  targetCtx.stroke();
  targetCtx.fill();

  statsBuffer[
    slot === CTX_STATE_SHADE_FILL
      ? STATS_SHADE_DRAW_CALLS
      : STATS_FILL_DRAW_CALLS
  ]++;
}

/**
 * Shade-pass fill for a face that has nothing real to shade.
 *
 * Fills opaque white, the identity for the `multiply` composite that lays the shade layer onto the
 * fill layer. Drawing it is not optional: the shade layer is painter's-algorithm like every other,
 * so a nearer unshaded face has to overwrite whatever shading already covers those pixels.
 * Skipping the draw lets the shading of the geometry behind it show through.
 *
 * Keeps the full normalized shade signature every shader shares (see shaderRegistry.js's
 * registerShader doc comment) so it stays a drop-in for the dispatch table. It buffers nothing, so
 * it needs no `last` handling.
 */
export function identityFill(
  shadeCtx,
  px0,
  py0,
  px1,
  py1,
  px2,
  py2,
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
  flatFill(
    shadeCtx,
    px0,
    py0,
    px1,
    py1,
    px2,
    py2,
    WHITE16,
    CTX_STATE_SHADE_FILL,
    ctxStateBuffer,
    statsBuffer,
  );
}

/**
 * Decides, per face, which of its three edges it owns the seam repair for.
 *
 * Two abutting polygons each cover about half the pixels along their shared boundary, and
 * source-over of two half coverages is three quarters - so a hairline of background shows through
 * unless one side covers it. Exactly one side must, and WHICH side is not arbitrary. If the
 * EARLIER-drawn (farther) polygon is the one that grows, the later one paints its true coverage on
 * top and the pixel settles at `0.5*near + 0.5*far` - the correct blend, boundary exactly where it
 * belongs. If the later one grows instead it simply overwrites, displacing the boundary half a
 * pixel and bloating the foreground over the background, which is the artifact you actually see.
 *
 * So ownership reads "my neighbour across this edge is drawn after me", which depends on the
 * pass's own draw order - fog sorts separately from fill, so this runs per pass, not per frame.
 *
 * An edge whose neighbour is -1 always expands. That covers two cases which cannot be told apart
 * from here: a face on the boundary of its mesh, whose real neighbour lives in another mesh and is
 * invisible to intra-mesh adjacency (two abutting terrain chunks - if neither side expanded, every
 * chunk seam would show as a hairline); and a neighbour culled this frame, where nothing abuts and
 * the expansion is only a half-pixel of silhouette bloat. The first case does pay the displacement
 * described above, since both sides expand into each other and the later one wins - a worse-looking
 * seam is the alternative, and it is confined to cross-mesh boundaries.
 *
 * `faceRankBuffer` is left as it was found (-1 everywhere), so it needs no generation stamp.
 *
 * @param {Uint32Array} indexBuffer face indices in this pass's draw order
 * @param {number} offset first entry of the range to consider
 * @param {number} len one past the last entry
 * @param {Int32Array} neighbourFaceBuffer 3 per face: the face across that edge, or -1
 * @param {Int32Array} faceRankBuffer scratch, -1 everywhere on entry and on exit
 * @param {Uint8Array} expandMaskBuffer out: 1 bit per edge, set where this face owns the repair
 */
export function computeExpandMasks(
  indexBuffer,
  offset,
  len,
  neighbourFaceBuffer,
  faceRankBuffer,
  expandMaskBuffer,
) {
  for (let i = offset; i < len; i++) faceRankBuffer[indexBuffer[i]] = i;

  for (let i = offset; i < len; i++) {
    const idx = indexBuffer[i];
    const b = idx * 3;
    const n0 = neighbourFaceBuffer[b];
    const n1 = neighbourFaceBuffer[b + 1];
    const n2 = neighbourFaceBuffer[b + 2];
    // A neighbour outside this pass reads -1 and loses the compare, so it expands - see above.
    expandMaskBuffer[idx] =
      (n0 < 0 || faceRankBuffer[n0] > i ? 1 : 0) |
      (n1 < 0 || faceRankBuffer[n1] > i ? 2 : 0) |
      (n2 < 0 || faceRankBuffer[n2] > i ? 4 : 0);
  }

  for (let i = offset; i < len; i++) faceRankBuffer[indexBuffer[i]] = -1;
}
