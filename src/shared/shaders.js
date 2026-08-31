import { PALETTE_16BIT } from "../palette.js";

// Slots into the shared ctxStateBuffer/statsBuffer Canvas2dRenderer.js owns (see
// shaderRegistry.js's registerShader doc comment for the full layout).
export const CTX_STATE_SHADE_FILL = 3;

export const CTX_STATE_SAW_REAL_SHADING = 8;

export const STATS_FILL_DRAW_CALLS = 0;
export const STATS_SHADE_DRAW_CALLS = 2;

// Immediate-mode (non-batched) triangle fill, shared by every shader that doesn't merge adjacent
// triangles into a boundary-walked batch (flatShader's own batchedFlatFill/batchedShadeFill are
// the exception - see src/shaders/flatShader/).
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
    targetCtx.lineWidth = 1;
    targetCtx.lineJoin = "miter";
    ctxStateBuffer[slot] = color16;

    if (slot === CTX_STATE_SHADE_FILL && color16 !== 0xffff) {
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

  statsBuffer[slot === CTX_STATE_SHADE_FILL ? STATS_SHADE_DRAW_CALLS : STATS_FILL_DRAW_CALLS]++;
}

export function whiteFillShade(
  shadeCtx,
  px0,
  py0,
  px1,
  py1,
  px2,
  py2,
  ctxStateBuffer,
  statsBuffer,
) {
  flatFill(
    shadeCtx,
    px0,
    py0,
    px1,
    py1,
    px2,
    py2,
    0xffff,
    CTX_STATE_SHADE_FILL,
    ctxStateBuffer,
    statsBuffer,
  );
}
// Scans the pending batch's boundary (batchWalkOrder/batchIdentity, both `length` long) for a
// directed edge running FROM vbIdx TO vaIdx - the reverse of an incoming triangle edge
// vaIdx->vbIdx, which is what an adjacent, consistently-wound triangle sharing that edge
// presents. Returns the walk-order position the edge starts at, or -1. Pure boundary-walk math,
// no fill-specific behavior - shared across flatShader's fill/shade/fog batching (fill.js,
// shade.js, fog.js).
export function findBoundaryEdge(vaIdx, vbIdx, walkOrder, identity, length) {
  for (let i = 0; i < length; i++) {
    if (identity[walkOrder[i]] !== vbIdx) continue;
    const next = i + 1 === length ? 0 : i + 1;
    if (identity[walkOrder[next]] === vaIdx) return i;
  }
  return -1;
}
