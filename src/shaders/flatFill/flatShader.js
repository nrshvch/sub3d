import { PALETTE_16BIT } from "../../palette.js";
import {
  findBoundaryEdge,
  STATS_FILL_DRAW_CALLS,
} from "../../shared/shaders.js";

// How many vertices the merged boundary polygon can hold before a batch is forced to flush.
// Canvas2dRenderer.js sizes batchCoords/batchIdentity/batchWalkOrder from this - keep in sync.
export const FILL_BATCH_CAPACITY = 16;

// batchStateBuffer layout (Int32Array(3), see Canvas2dRenderer.js):
export const BATCH_COLOR16 = 0; // -1 = no pending batch
const BATCH_MESH = 1;
const BATCH_LENGTH = 2;

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

export function flatShaderFill(
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
  batchStateBuffer,
  batchCoordsBuffer,
  batchIdentityBuffer,
  batchWalkOrderBuffer,
) {
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
      statsBuffer[STATS_FILL_DRAW_CALLS]++; // drawImage is never batchable

      return;
    }
  }

  // Untextured base: raw (unlit) mesh color - lighting is the shade half's job, fog is its own
  // pass entirely now (see fog.js).
  const color32 = colorBuffer[faceIdx * 3];
  const r = color32 >>> 16;
  const g = (color32 >>> 8) & 255;
  const b = color32 & 255;

  const qr = r & 0xf8;
  const qg = g & 0xfc;
  const qb = b & 0xf8;
  const color16 = (qr << 8) | (qg << 3) | (qb >> 3);

  batchedFlatFill(
    ctx,
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
    batchCoordsBuffer,
    batchIdentityBuffer,
    batchWalkOrderBuffer,
  );
}
