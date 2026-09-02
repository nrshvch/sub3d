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

/**
 * Shade-pass no-op for a face with nothing real to shade (see shadeTriangles' EMISSIVE/UNLIT
 * cases and its default-case shadeFn-less fallback).
 *
 * It used to rasterize an opaque white triangle. That is provably invisible: shadeCtx is cleared
 * transparent each frame and composited onto the fill layer with `multiply`, where a transparent
 * source gives `Co = ad*Cb` - identical to what an opaque white source produces. So the draw could
 * only ever cost time, never change a pixel.
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
  // Intentionally empty - see the doc comment above.
}

/**
 * Banks a shader's pending merged polygon into targetCtx's CURRENT path as one more subpath,
 * without drawing anything.
 *
 * Canvas2D fills every subpath of a path in a single fill() call, so a merge failure is not a
 * reason to draw - only a fillStyle change is, because fillStyle is per-call. Welding adjacent
 * triangles into one boundary (fewer vertices, less stroked length) and flushing (a state-change
 * requirement) are separate concerns that the batchers used to conflate; this is the half that
 * isn't a draw. Each caller pairs it with its own flushPath, which banks whatever is still
 * pending and then issues one stroke()+fill() over every subpath banked since the last flush.
 *
 * Opens a fresh path lazily on the first subpath after a flush, so the ctx is never left holding
 * an empty in-progress path. No-op when nothing is pending.
 *
 * INVARIANT: every subpath in the open path was banked while the shader's color slot held the
 * value it holds now, and targetCtx.fillStyle still corresponds to it - that is what makes one
 * stroke()+fill() over the whole path equivalent to N separate stroke()+fill() pairs. Callers
 * maintain it by routing every color change to a real flush instead of here. Winding is safe
 * without further care: destructMesh backface-culls on the sign of the screen-space cross
 * product, so every surviving face has the same orientation and the boundary walk's splice
 * preserves it - nonzero fill over same-oriented subpaths is their union, never a hole.
 *
 * Takes slot numbers rather than a struct because each shader owns its own shaderData layout
 * (see shaderRegistry.js's registerShader doc comment) and indexes into it directly - same
 * reasoning as findBoundaryEdge below, no .subarray() view allocated per call.
 *
 * @param {CanvasRenderingContext2D} targetCtx
 * @param {Float32Array} shaderData the caller's own private state array
 * @param {number} colorSlot index of its pending-color slot (-1 means nothing pending)
 * @param {number} subpathSlot index of its banked-subpath counter (0 means no path is open)
 * @param {number} lengthSlot index of its pending boundary's vertex count
 * @param {number} coordsOffset start of its coords region (x,y pairs)
 * @param {number} walkOrderOffset start of its walk-order region
 */
export function emitSubpath(
  targetCtx,
  shaderData,
  colorSlot,
  subpathSlot,
  lengthSlot,
  coordsOffset,
  walkOrderOffset,
) {
  if (shaderData[colorSlot] === -1) return;
  if (shaderData[subpathSlot] === 0) targetCtx.beginPath();

  const length = shaderData[lengthSlot];
  const first = shaderData[walkOrderOffset];

  targetCtx.moveTo(
    shaderData[coordsOffset + first * 2],
    shaderData[coordsOffset + first * 2 + 1],
  );
  for (let i = 1; i < length; i++) {
    const pt = shaderData[walkOrderOffset + i];
    targetCtx.lineTo(
      shaderData[coordsOffset + pt * 2],
      shaderData[coordsOffset + pt * 2 + 1],
    );
  }
  targetCtx.closePath();

  shaderData[subpathSlot]++;
  shaderData[colorSlot] = -1;
}
