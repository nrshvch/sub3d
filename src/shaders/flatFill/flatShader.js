import { PALETTE_16BIT } from "../../palette.js";
import {
  findBoundaryEdge,
  STATS_FILL_DRAW_CALLS,
} from "../../shared/shaders.js";

// How many vertices the merged boundary polygon can hold before a batch is forced to flush.
const FILL_BATCH_CAPACITY = 16;

// This shader's own private layout inside its own module-scoped shaderData below - nothing
// outside this file ever sees these slot numbers or the array itself.
const SD_CALL_ID = 0; // last frameId this shaderData was touched under - mismatch means stale
const SD_COLOR16 = 1; // -1 = no pending batch
const SD_MESH = 2;
const SD_LENGTH = 3;
const SD_COORDS = 4; // FILL_BATCH_CAPACITY*2 floats
const SD_IDENTITY = SD_COORDS + FILL_BATCH_CAPACITY * 2; // FILL_BATCH_CAPACITY floats
const SD_WALKORDER = SD_IDENTITY + FILL_BATCH_CAPACITY; // FILL_BATCH_CAPACITY floats

// This shader's entire pending-batch state, private to this module for the life of the page -
// the renderer never allocates, passes, or knows about this. Sized exactly to the slots above
// (68 elements), not a generic shared buffer, since nothing outside this file ever touches it.
const shaderData = new Float32Array(SD_WALKORDER + FILL_BATCH_CAPACITY);

/**
 * Fill-pass-only batching: merges consecutive same-color, same-mesh triangles that share an edge
 * into one continuous path instead of a stroke()+fill() per triangle - an actual merged polygon
 * boundary with the shared interior edge's points dropped, not just one fillStyle shared across
 * independent triangle subpaths. Two triangles "share an edge" when they share 2 vertex
 * identities (v0Idx/v1Idx/v2Idx - exact integer match, never pixel coordinates).
 *
 * State is a small fixed-capacity boundary walk, not a generic edge set, kept entirely inside
 * this module's own `shaderData`: the walk-order region holds the loop's vertex order as
 * positions into the coords/identity regions, both append-only (a newly merged vertex is always
 * appended at `length`, existing entries never move) - so a merge only ever costs one append plus
 * splicing the new position into the walk-order region itself (shifting integers, not coordinate
 * pairs). If a triangle matches more than one boundary edge at once (closing a notch - needs more
 * than a single splice to represent correctly), matches none, or the batch is already at
 * FILL_BATCH_CAPACITY, it doesn't merge - the pending batch flushes and this triangle starts a
 * new one. If `shaderData`'s stored frameId doesn't match the current one, its contents predate
 * this frame and are discarded outright, never merged into or flushed.
 *
 * `last` means this triangle is the last of a contiguous run of this shaderKey (see
 * shaderRegistry.js's registerShader doc comment) - handled normally above, then, since no more
 * same-shaderKey triangles are coming, whatever's now pending (including this one) is flushed
 * before returning.
 */
function batchedFlatFill(
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
  frameId,
  last,
  shaderData,
) {
  const stale = shaderData[SD_CALL_ID] !== frameId;

  if (
    !stale &&
    shaderData[SD_COLOR16] === color16 &&
    shaderData[SD_MESH] === meshIdx
  ) {
    const length = shaderData[SD_LENGTH];

    let matchPos = -1;
    let matchCount = 0;
    let newPx = 0,
      newPy = 0,
      newVIdx = 0;

    let pos = findBoundaryEdge(v0Idx, v1Idx, shaderData, SD_WALKORDER, SD_IDENTITY, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px2;
      newPy = py2;
      newVIdx = v2Idx;
    }
    pos = findBoundaryEdge(v1Idx, v2Idx, shaderData, SD_WALKORDER, SD_IDENTITY, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px0;
      newPy = py0;
      newVIdx = v0Idx;
    }
    pos = findBoundaryEdge(v2Idx, v0Idx, shaderData, SD_WALKORDER, SD_IDENTITY, length);
    if (pos !== -1) {
      matchPos = pos;
      matchCount++;
      newPx = px1;
      newPy = py1;
      newVIdx = v1Idx;
    }

    if (matchCount === 1 && length < FILL_BATCH_CAPACITY) {
      shaderData[SD_COORDS + length * 2] = newPx;
      shaderData[SD_COORDS + length * 2 + 1] = newPy;
      shaderData[SD_IDENTITY + length] = newVIdx;

      for (let i = length; i > matchPos + 1; i--) {
        shaderData[SD_WALKORDER + i] = shaderData[SD_WALKORDER + i - 1];
      }
      shaderData[SD_WALKORDER + matchPos + 1] = length;

      shaderData[SD_LENGTH] = length + 1;
      if (last) flushBatchedFlatFill(targetCtx, statsBuffer, shaderData);
      return;
    }

    flushBatchedFlatFill(targetCtx, statsBuffer, shaderData);
  } else if (!stale && shaderData[SD_COLOR16] !== -1) {
    flushBatchedFlatFill(targetCtx, statsBuffer, shaderData);
  }

  if (ctxStateBuffer[0] !== color16) {
    const style = PALETTE_16BIT[color16];
    targetCtx.fillStyle = style;
    targetCtx.strokeStyle = style;
    targetCtx.lineWidth = 1;
    targetCtx.lineJoin = "miter";
    ctxStateBuffer[0] = color16;
  }

  shaderData[SD_CALL_ID] = frameId;
  shaderData[SD_COORDS] = px0;
  shaderData[SD_COORDS + 1] = py0;
  shaderData[SD_COORDS + 2] = px1;
  shaderData[SD_COORDS + 3] = py1;
  shaderData[SD_COORDS + 4] = px2;
  shaderData[SD_COORDS + 5] = py2;
  shaderData[SD_IDENTITY] = v0Idx;
  shaderData[SD_IDENTITY + 1] = v1Idx;
  shaderData[SD_IDENTITY + 2] = v2Idx;
  shaderData[SD_WALKORDER] = 0;
  shaderData[SD_WALKORDER + 1] = 1;
  shaderData[SD_WALKORDER + 2] = 2;

  shaderData[SD_COLOR16] = color16;
  shaderData[SD_MESH] = meshIdx;
  shaderData[SD_LENGTH] = 3;

  if (last) flushBatchedFlatFill(targetCtx, statsBuffer, shaderData);
}

function flushBatchedFlatFill(targetCtx, statsBuffer, shaderData) {
  if (shaderData[SD_COLOR16] === -1) return;

  const length = shaderData[SD_LENGTH];
  const first = shaderData[SD_WALKORDER];

  targetCtx.beginPath();
  targetCtx.moveTo(shaderData[SD_COORDS + first * 2], shaderData[SD_COORDS + first * 2 + 1]);
  for (let i = 1; i < length; i++) {
    const p = shaderData[SD_WALKORDER + i];
    targetCtx.lineTo(shaderData[SD_COORDS + p * 2], shaderData[SD_COORDS + p * 2 + 1]);
  }
  targetCtx.closePath();
  targetCtx.stroke();
  targetCtx.fill();
  statsBuffer[STATS_FILL_DRAW_CALLS]++;

  shaderData[SD_COLOR16] = -1;
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
  frameId,
  last,
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

      // This textured face never touches the batch above, but a same-shaderKey run's pending
      // batch (from an earlier, different-mesh face) still has to be flushed by the time `last`
      // says no more of this shaderKey are coming - only flush a batch that actually belongs to
      // this frame (a stale one is discarded silently, never drawn).
      if (last && shaderData[SD_CALL_ID] === frameId && shaderData[SD_COLOR16] !== -1) {
        flushBatchedFlatFill(ctx, statsBuffer, shaderData);
      }

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
    frameId,
    last,
    shaderData,
  );
}
