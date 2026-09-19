import {
  CTX_STATE_FILL_PASS_FILL_STYLE_SLOT,
  STATS_FILL_DRAW_CALLS,
} from "../../shared/shaders.js";
import {
  createWeldState,
  weldAddFace,
  weldFlushAll,
  weldReset,
} from "../../shared/weld.js";

// This pass's pending geometry. The renderer never allocates, passes, or knows about it.
const weldState = createWeldState();

// Perpendicular deviation, in destination-canvas pixels, below which a boundary vertex is dropped
// at flush. Kept small deliberately: a vertex removed from a boundary shared with a
// differently-coloured region opens a hairline T-junction crack, since the neighbour still has a
// vertex there. Below ~0.05px that is under the antialiasing noise floor.
const COLLINEAR_EPS = 0.05;

/**
 * Fill pass for flat-coloured faces: averages the three corner colours into one, quantises it, and
 * hands the triangle to this pass's welder, which merges it with any open same-colour polygon it
 * shares an edge with. A mesh whose faces each carry one colour - what a flat fill is normally
 * given - averages to exactly that colour, so it is unaffected.
 *
 * @type {import("../shaderRegistry.js").ShaderFn}
 */
export function avgFlatShaderFill(
  ctx,
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
  // 1 bit per triangle edge: this face owns that edge's seam repair and must push it outward at
  // flush. See computeExpandMasks in shared/shaders.js and weldFlushSlot in shared/weld.js.
  expandMask,
) {
  if (weldState.frameId !== frameId) {
    // Slots left over from a frame that is over: drop them rather than painting last frame's
    // geometry. A defensive backstop - `last` normally empties every slot at the end of a pass.
    weldReset(weldState);
    weldState.frameId = frameId;
  }

  // Raw (unlit) mesh colour - lighting is the shade half's job, fog is its own pass entirely.
  // The face's single colour is the mean of its three corners, not corner 0: which corner lands
  // in slot 0 is a property of how the mesh was triangulated, so picking one makes the result
  // depend on winding order. The mean does not.
  const cIdx = faceIdx * 3;
  const c0 = colorBuffer[cIdx];
  const c1 = colorBuffer[cIdx + 1];
  const c2 = colorBuffer[cIdx + 2];

  let color16;

  if (c0 === c1 && c1 === c2) {
    // Fast path, and the overwhelmingly common one: a mesh that wants a flat fill assigns one
    // colour to all three corners, so the mean is c0 and the arithmetic below is a no-op. Two
    // compares beat six adds and three divides, and this path is bit-exact by construction.
    color16 =
      (((c0 >>> 16) & 0xf8) << 8) |
      (((c0 >>> 8) & 0xfc) << 3) |
      ((c0 & 0xf8) >> 3);
  } else {
    // Divided, not multiplied by a reciprocal: x/3 of a multiple of 3 is exact in IEEE doubles,
    // so three equal corners reaching this path anyway would still round-trip to themselves.
    const r = ((c0 >>> 16) + (c1 >>> 16) + (c2 >>> 16)) / 3;
    const g =
      (((c0 >>> 8) & 255) + ((c1 >>> 8) & 255) + ((c2 >>> 8) & 255)) / 3;
    const b = ((c0 & 255) + (c1 & 255) + (c2 & 255)) / 3;

    color16 = ((r & 0xf8) << 8) | ((g & 0xfc) << 3) | ((b & 0xf8) >> 3);
  }

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
    expandMask,
  );

  if (last) {
    weldFlushAll(
      weldState,
      ctx,
      ctxStateBuffer,
      CTX_STATE_FILL_PASS_FILL_STYLE_SLOT,
      -1,
      statsBuffer,
      STATS_FILL_DRAW_CALLS,
      COLLINEAR_EPS,
    );
  }
}
