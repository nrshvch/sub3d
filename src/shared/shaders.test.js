import { describe, it, expect } from "vitest";
import {
  computeExpandMasks,
  identityFill,
  NO_MESH_NEIGHBOUR,
  NEIGHBOUR_NOT_DRAWN,
  CTX_STATE_SHADE_FILL,
  CTX_STATE_SAW_REAL_SHADING,
  STATS_SHADE_DRAW_CALLS,
  STATS_SHADE_VERTICES,
} from "./shaders.js";

/**
 * identityFill is the shade pass' "nothing to shade here" fill, and the temptation is to make it a
 * no-op: white is the identity for `multiply`, so on an empty layer the draw changes no pixel.
 * That reasoning drops the pass' painter's-algorithm half - the layer is not empty, and a nearer
 * unshaded face has to overwrite the shading an earlier one left behind. It has been removed once
 * on exactly that argument, so it is pinned here.
 */
function stubCtx() {
  const calls = [];
  const target = { calls, canvas: { width: 64, height: 64 } };
  return new Proxy(target, {
    get: (t, k) => (k in t ? t[k] : (...a) => calls.push([k, ...a])),
    set: (t, k, v) => {
      calls.push(["set:" + String(k), v]);
      t[k] = v;
      return true;
    },
  });
}

// Only the arguments identityFill reads need to be real; the rest keep the shared shade signature.
function run(ctx, ctxStateBuffer, statsBuffer) {
  identityFill(
    ctx,
    0,
    0,
    10,
    0,
    10,
    10,
    null,
    null,
    null,
    null,
    0,
    1,
    2,
    0,
    null,
    0,
    0,
    new Uint32Array(1),
    [],
    0,
    0,
    0,
    1000,
    0,
    ctxStateBuffer,
    statsBuffer,
    1,
    true,
  );
}

describe("identityFill", () => {
  it("fills an opaque white triangle rather than doing nothing", () => {
    const ctx = stubCtx();
    const ctxStateBuffer = new Int32Array(10).fill(-1);
    const statsBuffer = new Int32Array(STATS_SHADE_VERTICES + 1);
    run(ctx, ctxStateBuffer, statsBuffer);

    const names = ctx.calls.map((c) => c[0]);
    expect(names).toContain("fill");
    expect(ctx.calls).toContainEqual(["set:fillStyle", "#ffffff"]);
    expect(statsBuffer[STATS_SHADE_DRAW_CALLS]).toBe(1);
    expect(statsBuffer[STATS_SHADE_VERTICES]).toBe(3);
    expect(ctxStateBuffer[CTX_STATE_SHADE_FILL]).toBe(0xffff);
  });

  it("does not report the layer as carrying real shading", () => {
    // White alone composites to a no-op, so a layer holding only identity fills lets the whole
    // multiply composite be skipped. Raising the flag here would cost that shortcut every frame.
    const ctxStateBuffer = new Int32Array(10).fill(-1);
    run(stubCtx(), ctxStateBuffer, new Int32Array(8));
    expect(ctxStateBuffer[CTX_STATE_SAW_REAL_SHADING]).toBe(-1);
  });
});

/**
 * Seam ownership. Growing the wrong edge is not a small error: grow one whose neighbour is already
 * down and the visible boundary moves, grow a silhouette and the object inflates. Both failures
 * look like "slightly wrong outline" rather than anything that throws, so they are pinned here.
 */
describe("computeExpandMasks", () => {
  // Three faces drawn in the order 0, 1, 2. Each row is one face's three edges.
  const run = (neighbours, order = [0, 1, 2]) => {
    const faceCount = neighbours.length / 3;
    const masks = new Uint8Array(faceCount);
    const ranks = new Int32Array(faceCount).fill(-1);
    computeExpandMasks(
      new Uint32Array(order),
      0,
      order.length,
      new Int32Array(neighbours),
      ranks,
      masks,
    );
    return { masks: Array.from(masks), ranks: Array.from(ranks) };
  };

  const NONE = NEIGHBOUR_NOT_DRAWN;
  const OPEN = NO_MESH_NEIGHBOUR;

  it("gives a shared edge to whichever face is drawn first", () => {
    // Faces 0 and 1 share an edge: 0's edge 0 faces 1, and 1's edge 0 faces 0.
    // 0 is drawn first, so 0 owns the repair and 1 must leave it alone.
    const { masks } = run([1, NONE, NONE, 0, NONE, NONE, NONE, NONE, NONE]);
    expect(masks[0] & 1).toBe(1);
    expect(masks[1] & 1).toBe(0);
  });

  it("never grows a silhouette, whichever bit it is", () => {
    // Every edge's neighbour exists in the mesh but was culled - a closed mesh's outline. Growing
    // any of them inflates the object, which is what the trees in isometric-world showed.
    const { masks } = run([
      NONE,
      NONE,
      NONE,
      NONE,
      NONE,
      NONE,
      NONE,
      NONE,
      NONE,
    ]);
    expect(masks).toEqual([0, 0, 0]);
  });

  it("grows an open mesh boundary, since no other face can own that seam", () => {
    // The neighbour lives in a different mesh and intra-mesh adjacency cannot see it.
    const { masks } = run([
      OPEN,
      OPEN,
      OPEN,
      NONE,
      NONE,
      NONE,
      NONE,
      NONE,
      NONE,
    ]);
    expect(masks[0]).toBe(0b111);
  });

  it("tracks the draw order, not the face index", () => {
    // Same shared edge as the first case, but face 1 is drawn first this time, so ownership flips.
    const { masks } = run(
      [1, NONE, NONE, 0, NONE, NONE, NONE, NONE, NONE],
      [1, 0, 2],
    );
    expect(masks[1] & 1).toBe(1);
    expect(masks[0] & 1).toBe(0);
  });

  it("leaves the rank scratch as it found it", () => {
    // It carries no generation stamp, so a pass that dirtied it would poison the next one.
    const { ranks } = run([
      NONE,
      NONE,
      NONE,
      NONE,
      NONE,
      NONE,
      NONE,
      NONE,
      NONE,
    ]);
    expect(ranks).toEqual([-1, -1, -1]);
  });
});
