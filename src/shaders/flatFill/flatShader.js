import {
  STATS_FILL_DRAW_CALLS,
} from "../../shared/shaders.js";
import {
  createWeldState,
  weldAddFace,
  weldFlushAll,
  weldReset,
} from "../../shared/weld.js";

// This shader's entire pending-geometry state, private to this module for the life of the page -
// the renderer never allocates, passes, or knows about it. See weld.js for the merge rules and for
// why deferring geometry into open slots is sound.
const weldState = createWeldState();

// Perpendicular deviation, in destination-canvas pixels, below which a boundary vertex is dropped
// at flush. Kept small deliberately: a vertex removed from a boundary shared with a
// differently-coloured region opens a hairline T-junction crack, since the neighbour still has a
// vertex there. Below ~0.05px that is under the antialiasing noise floor.
const COLLINEAR_EPS = 0.05;

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
  if (weldState.frameId !== frameId) {
    // Slots left over from a frame that is over: drop them rather than painting last frame's
    // geometry. A defensive backstop - `last` normally empties every slot at the end of a pass.
    weldReset(weldState);
    weldState.frameId = frameId;
  }

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

      // A textured face can't join a welded polygon, and it must paint after everything already
      // deferred that it may overlap - so drain every open slot first, unconditionally, not just
      // on `last`.
      weldFlushAll(
        weldState,
        ctx,
        ctxStateBuffer,
        0,
        -1,
        statsBuffer,
        STATS_FILL_DRAW_CALLS,
        COLLINEAR_EPS,
      );

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
  const color16 =
    (((color32 >>> 16) & 0xf8) << 8) |
    (((color32 >>> 8) & 0xfc) << 3) |
    ((color32 & 0xf8) >> 3);

  weldAddFace(
    weldState,
    ctx,
    ctxStateBuffer,
    0,
    -1,
    statsBuffer,
    STATS_FILL_DRAW_CALLS,
    COLLINEAR_EPS,
    color16,
    meshIdx,
    px0,
    py0,
    v0Idx,
    px1,
    py1,
    v1Idx,
    px2,
    py2,
    v2Idx,
  );

  if (last) {
    weldFlushAll(
      weldState,
      ctx,
      ctxStateBuffer,
      0,
      -1,
      statsBuffer,
      STATS_FILL_DRAW_CALLS,
      COLLINEAR_EPS,
    );
  }
}
