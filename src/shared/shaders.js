import { PALETTE_16BIT } from "../palette.js";

// Slots into the shared ctxStateBuffer/statsBuffer Canvas2dRenderer.js owns (see
// shaderRegistry.js's registerShader doc comment for the full layout).
export const CTX_STATE_SHADE_FILL = 3;

export const CTX_STATE_SAW_REAL_SHADING = 8;

export const STATS_FILL_DRAW_CALLS = 0;
export const STATS_SHADE_DRAW_CALLS = 2;

// Immediate-mode triangle fill: one stroke()+fill() per face, no batching and nothing deferred.
// Strokes in the fill colour to close the conflation seam, exactly as the welder does.
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
    0xffff,
    CTX_STATE_SHADE_FILL,
    ctxStateBuffer,
    statsBuffer,
  );
}
