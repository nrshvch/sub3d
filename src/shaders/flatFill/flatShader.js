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
 * Fill pass for flat-coloured faces: quantises the face colour and hands the triangle to this
 * pass's welder, which merges it with any open same-colour polygon it shares an edge with.
 *
 * @type {import("../shaderRegistry.js").ShaderFn}
 */
export function flatShaderFill(
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
