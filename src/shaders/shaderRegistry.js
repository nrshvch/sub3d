import { PALETTE_16BIT } from "../palette.js";


export const shaderRegistry = [];

export const shadeShaderRegistry = [];
let nextKey = 5;


export const CTX_STATE_SHADE_FILL = 3;

export const CTX_STATE_SAW_REAL_SHADING = 8;


export const STATS_FILL_DRAW_CALLS = 0;
export const STATS_SHADE_DRAW_CALLS = 2;

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

// How many vertices the merged boundary polygon can hold before a batch is forced to flush.
// Canvas2dRenderer.js sizes batchCoords/batchIdentity/batchWalkOrder from this - keep in sync.
export const FILL_BATCH_CAPACITY = 16;
// Same mechanism, shade's own pass/buffers - see batchedShadeFill. Independently tunable, even
// though it starts at the same value as FILL_BATCH_CAPACITY.
export const SHADE_BATCH_CAPACITY = 16;

// batchStateBuffer layout (Int32Array(3), see Canvas2dRenderer.js):
export const BATCH_COLOR16 = 0; // -1 = no pending batch
const BATCH_MESH = 1;
const BATCH_LENGTH = 2;

// Scans the pending batch's boundary (batchWalkOrder/batchIdentity, both `length` long) for a
// directed edge running FROM vbIdx TO vaIdx - the reverse of an incoming triangle edge
// vaIdx->vbIdx, which is what an adjacent, consistently-wound triangle sharing that edge
// presents. Returns the walk-order position the edge starts at, or -1. Pure boundary-walk math,
// no fill-specific behavior - shared with fog.js's own batchedFogFace.
export function findBoundaryEdge(vaIdx, vbIdx, walkOrder, identity, length) {
  for (let i = 0; i < length; i++) {
    if (identity[walkOrder[i]] !== vbIdx) continue;
    const next = i + 1 === length ? 0 : i + 1;
    if (identity[walkOrder[next]] === vaIdx) return i;
  }
  return -1;
}

/**
 * Fill-pass-only batching: merges consecutive same-color, same-mesh triangles that share an edge
 * into one continuous path instead of a stroke()+fill() per triangle - an actual merged polygon
 * boundary with the shared interior edge's points dropped, not just one fillStyle shared across
 * independent triangle subpaths. Two triangles "share an edge" when they share 2 vertex
 * identities (v0Idx/v1Idx/v2Idx - exact integer match, never pixel coordinates).
 *
 * State is a small fixed-capacity boundary walk, not a generic edge set: batchWalkOrder holds the
 * loop's vertex order as positions into batchCoords/batchIdentity, both append-only (a newly
 * merged vertex is always appended at `length`, existing entries never move) - so a merge only
 * ever costs one append plus splicing the new position into batchWalkOrder itself (shifting
 * integers, not coordinate pairs). If a triangle matches more than one boundary edge at once
 * (closing a notch - needs more than a single splice to represent correctly), matches none, or
 * the batch is already at FILL_BATCH_CAPACITY, it doesn't merge - the pending batch flushes and
 * this triangle starts a new one. Must be paired with flushBatchedFlatFill at the end of the fill
 * pass, or the last pending batch never actually gets drawn.
 */
export function batchedFlatFill(
  targetCtx,
  px0,
  py0,
  px1,
  py1,
  px2,
  py2,
  v0Idx,
  v1Idx,
  v2Idx,
  color16,
  meshIdx,
  ctxStateBuffer,
  statsBuffer,
  batchStateBuffer,
  batchCoords,
  batchIdentity,
  batchWalkOrder,
) {
  if (
    batchStateBuffer[BATCH_COLOR16] === color16 &&
    batchStateBuffer[BATCH_MESH] === meshIdx
  ) {
    const length = batchStateBuffer[BATCH_LENGTH];

    let matchPos = -1;
    let matchCount = 0;
    let newPx = 0,
      newPy = 0,
      newVIdx = 0;

    let pos = findBoundaryEdge(v0Idx, v1Idx, batchWalkOrder, batchIdentity, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px2;
      newPy = py2;
      newVIdx = v2Idx;
    }
    pos = findBoundaryEdge(v1Idx, v2Idx, batchWalkOrder, batchIdentity, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px0;
      newPy = py0;
      newVIdx = v0Idx;
    }
    pos = findBoundaryEdge(v2Idx, v0Idx, batchWalkOrder, batchIdentity, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px1;
      newPy = py1;
      newVIdx = v1Idx;
    }

    if (matchCount === 1 && length < FILL_BATCH_CAPACITY) {
      batchCoords[length * 2] = newPx;
      batchCoords[length * 2 + 1] = newPy;
      batchIdentity[length] = newVIdx;

      for (let i = length; i > matchPos + 1; i--) {
        batchWalkOrder[i] = batchWalkOrder[i - 1];
      }
      batchWalkOrder[matchPos + 1] = length;

      batchStateBuffer[BATCH_LENGTH] = length + 1;
      return;
    }

    flushBatchedFlatFill(targetCtx, statsBuffer, batchStateBuffer, batchCoords, batchWalkOrder);
  } else if (batchStateBuffer[BATCH_COLOR16] !== -1) {
    flushBatchedFlatFill(targetCtx, statsBuffer, batchStateBuffer, batchCoords, batchWalkOrder);
  }

  if (ctxStateBuffer[0] !== color16) {
    const style = PALETTE_16BIT[color16];
    targetCtx.fillStyle = style;
    targetCtx.strokeStyle = style;
    targetCtx.lineWidth = 1;
    targetCtx.lineJoin = "miter";
    ctxStateBuffer[0] = color16;
  }

  batchCoords[0] = px0;
  batchCoords[1] = py0;
  batchCoords[2] = px1;
  batchCoords[3] = py1;
  batchCoords[4] = px2;
  batchCoords[5] = py2;
  batchIdentity[0] = v0Idx;
  batchIdentity[1] = v1Idx;
  batchIdentity[2] = v2Idx;
  batchWalkOrder[0] = 0;
  batchWalkOrder[1] = 1;
  batchWalkOrder[2] = 2;

  batchStateBuffer[BATCH_COLOR16] = color16;
  batchStateBuffer[BATCH_MESH] = meshIdx;
  batchStateBuffer[BATCH_LENGTH] = 3;
}

export function flushBatchedFlatFill(
  targetCtx,
  statsBuffer,
  batchStateBuffer,
  batchCoords,
  batchWalkOrder,
) {
  if (batchStateBuffer[BATCH_COLOR16] === -1) return;

  const length = batchStateBuffer[BATCH_LENGTH];
  const first = batchWalkOrder[0];

  targetCtx.beginPath();
  targetCtx.moveTo(batchCoords[first * 2], batchCoords[first * 2 + 1]);
  for (let i = 1; i < length; i++) {
    const p = batchWalkOrder[i];
    targetCtx.lineTo(batchCoords[p * 2], batchCoords[p * 2 + 1]);
  }
  targetCtx.closePath();
  targetCtx.stroke();
  targetCtx.fill();
  statsBuffer[STATS_FILL_DRAW_CALLS]++;

  batchStateBuffer[BATCH_COLOR16] = -1;
}

/**
 * Shade-pass mirror of batchedFlatFill above: identical merge algorithm (same findBoundaryEdge,
 * same append-only batchCoords/batchIdentity + spliced batchWalkOrder shape, same BATCH_COLOR16/
 * BATCH_MESH/BATCH_LENGTH slot numbers - safe to reuse since this is a wholly separate buffer
 * instance), just targeting CTX_STATE_SHADE_FILL/STATS_SHADE_DRAW_CALLS instead of fill's slot 0.
 * Keeps flatFill's CTX_STATE_SAW_REAL_SHADING flag-set (only on an actual fillStyle change, only
 * for a real - non-white - shade color) so shadeCtx compositing still gates correctly.
 */
export function batchedShadeFill(
  targetCtx,
  px0,
  py0,
  px1,
  py1,
  px2,
  py2,
  v0Idx,
  v1Idx,
  v2Idx,
  color16,
  meshIdx,
  ctxStateBuffer,
  statsBuffer,
  batchStateBuffer,
  batchCoords,
  batchIdentity,
  batchWalkOrder,
) {
  if (
    batchStateBuffer[BATCH_COLOR16] === color16 &&
    batchStateBuffer[BATCH_MESH] === meshIdx
  ) {
    const length = batchStateBuffer[BATCH_LENGTH];

    let matchPos = -1;
    let matchCount = 0;
    let newPx = 0,
      newPy = 0,
      newVIdx = 0;

    let pos = findBoundaryEdge(v0Idx, v1Idx, batchWalkOrder, batchIdentity, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px2;
      newPy = py2;
      newVIdx = v2Idx;
    }
    pos = findBoundaryEdge(v1Idx, v2Idx, batchWalkOrder, batchIdentity, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px0;
      newPy = py0;
      newVIdx = v0Idx;
    }
    pos = findBoundaryEdge(v2Idx, v0Idx, batchWalkOrder, batchIdentity, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px1;
      newPy = py1;
      newVIdx = v1Idx;
    }

    if (matchCount === 1 && length < SHADE_BATCH_CAPACITY) {
      batchCoords[length * 2] = newPx;
      batchCoords[length * 2 + 1] = newPy;
      batchIdentity[length] = newVIdx;

      for (let i = length; i > matchPos + 1; i--) {
        batchWalkOrder[i] = batchWalkOrder[i - 1];
      }
      batchWalkOrder[matchPos + 1] = length;

      batchStateBuffer[BATCH_LENGTH] = length + 1;
      return;
    }

    flushBatchedShadeFill(targetCtx, statsBuffer, batchStateBuffer, batchCoords, batchWalkOrder);
  } else if (batchStateBuffer[BATCH_COLOR16] !== -1) {
    flushBatchedShadeFill(targetCtx, statsBuffer, batchStateBuffer, batchCoords, batchWalkOrder);
  }

  if (ctxStateBuffer[CTX_STATE_SHADE_FILL] !== color16) {
    const style = PALETTE_16BIT[color16];
    targetCtx.fillStyle = style;
    targetCtx.strokeStyle = style;
    targetCtx.lineWidth = 1;
    targetCtx.lineJoin = "miter";
    ctxStateBuffer[CTX_STATE_SHADE_FILL] = color16;

    if (color16 !== 0xffff) {
      ctxStateBuffer[CTX_STATE_SAW_REAL_SHADING] = 1;
    }
  }

  batchCoords[0] = px0;
  batchCoords[1] = py0;
  batchCoords[2] = px1;
  batchCoords[3] = py1;
  batchCoords[4] = px2;
  batchCoords[5] = py2;
  batchIdentity[0] = v0Idx;
  batchIdentity[1] = v1Idx;
  batchIdentity[2] = v2Idx;
  batchWalkOrder[0] = 0;
  batchWalkOrder[1] = 1;
  batchWalkOrder[2] = 2;

  batchStateBuffer[BATCH_COLOR16] = color16;
  batchStateBuffer[BATCH_MESH] = meshIdx;
  batchStateBuffer[BATCH_LENGTH] = 3;
}

export function flushBatchedShadeFill(
  targetCtx,
  statsBuffer,
  batchStateBuffer,
  batchCoords,
  batchWalkOrder,
) {
  if (batchStateBuffer[BATCH_COLOR16] === -1) return;

  const length = batchStateBuffer[BATCH_LENGTH];
  const first = batchWalkOrder[0];

  targetCtx.beginPath();
  targetCtx.moveTo(batchCoords[first * 2], batchCoords[first * 2 + 1]);
  for (let i = 1; i < length; i++) {
    const p = batchWalkOrder[i];
    targetCtx.lineTo(batchCoords[p * 2], batchCoords[p * 2 + 1]);
  }
  targetCtx.closePath();
  targetCtx.stroke();
  targetCtx.fill();
  statsBuffer[STATS_SHADE_DRAW_CALLS]++;

  batchStateBuffer[BATCH_COLOR16] = -1;
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

export function registerShader(fillFn, shadeFn) {
  const key = nextKey++;
  shaderRegistry[key] = fillFn;
  if (shadeFn) shadeShaderRegistry[key] = shadeFn;
  return key;
}
