import { describe, it, expect, beforeEach } from "vitest";
import {
  createTextureWeldState,
  textureWeldAddFace,
  textureWeldFlushAll,
  textureWeldReset,
} from "./textureWeld.js";
import { EXPAND } from "../../shared/weld.js";

/**
 * The merge is guarded by one test - does the pending face's affine still reproduce the incoming
 * face? - and everything correctness-critical rides on it. A false positive fuses two faces that
 * are not on the same plane under a single nonsense map, which is exactly what happens between two
 * perpendicular box sides once a mesh is position-welded and they start sharing vertex identities.
 */
function stubCtx() {
  const calls = [];
  const paths = [];
  let cur = null;
  const target = {
    calls,
    paths,
    createPattern: () => ({ PATTERN: true }),
    beginPath() {
      calls.push("beginPath");
      cur = [];
    },
    moveTo(x, y) {
      calls.push("moveTo");
      if (cur) cur.push([x, y]);
    },
    lineTo(x, y) {
      calls.push("lineTo");
      if (cur) cur.push([x, y]);
    },
    fill() {
      calls.push("fill");
      if (cur) paths.push(cur);
      cur = null;
    },
  };
  return new Proxy(target, {
    get: (t, k) => (k in t ? t[k] : (...a) => calls.push(k)),
    set: (t, k, v) => {
      t[k] = v;
      return true;
    },
  });
}

const CALLS = 0;

function makeRig() {
  const st = createTextureWeldState();
  const ctx = stubCtx();
  const ctxStateBuffer = new Int32Array(10).fill(-1);
  const statsBuffer = new Int32Array(8);
  const mesh = { textureImage: {}, texturePattern: null };

  // Each corner is [id, u, v, px, py]; the identity map is used unless a test says otherwise.
  const add = (a, b, c, m = mesh, n = [0, 0, 1], expandMask = 0) =>
    textureWeldAddFace(
      st,
      ctx,
      ctxStateBuffer,
      statsBuffer,
      CALLS,
      m,
      n[0],
      n[1],
      n[2],
      a[1],
      a[2],
      a[0],
      a[3],
      a[4],
      b[1],
      b[2],
      b[0],
      b[3],
      b[4],
      c[1],
      c[2],
      c[0],
      c[3],
      c[4],
      expandMask,
    );
  const flush = () =>
    textureWeldFlushAll(st, ctx, ctxStateBuffer, statsBuffer, CALLS);

  return { st, ctx, statsBuffer, mesh, add, flush };
}

// Triangle 1 of a quad, mapped identically from texture space to screen.
const T1 = [
  [1, 0, 0, 0, 0],
  [2, 64, 0, 64, 0],
  [3, 64, 64, 64, 64],
];
// Triangle 2, sharing edge 1-3.
const T2 = [
  [1, 0, 0, 0, 0],
  [3, 64, 64, 64, 64],
  [4, 0, 64, 0, 64],
];

// Emitted points are exact - the offset moves them, nothing rounds them - so a tight tolerance is
// right; it only absorbs the octagonal norm's ~1% and float32 storage of the affine.
function expectAt(path, expected) {
  expect(path).toHaveLength(expected.length);
  for (let i = 0; i < expected.length; i++) {
    expect(path[i][0], `vertex ${i} x`).toBeCloseTo(expected[i][0], 1);
    expect(path[i][1], `vertex ${i} y`).toBeCloseTo(expected[i][1], 1);
  }
}

describe("textured coplanar pair merger", () => {
  let r;
  beforeEach(() => {
    r = makeRig();
  });

  it("merges two coplanar edge-adjacent triangles into one four-sided fill", () => {
    r.add(...[T1[0], T1[1], T1[2]]);
    expect(r.statsBuffer[CALLS]).toBe(0); // held, waiting for a partner
    r.add(...[T2[0], T2[1], T2[2]]);
    expect(r.statsBuffer[CALLS]).toBe(0); // still open - a third neighbour could still join
    r.flush();

    expect(r.statsBuffer[CALLS]).toBe(1);
    expect(r.ctx.paths).toHaveLength(1);
    expect(r.ctx.paths[0]).toHaveLength(4);
  });

  it("refuses a neighbour the pending face's map does not reproduce", () => {
    // Same shared edge and same UVs, but the screen positions are somewhere else entirely - which
    // is what a face on a different plane looks like. Merging would fuse them under one map.
    const bent = [
      [1, 0, 0, 0, 0],
      [3, 64, 64, 64, 64],
      [4, 0, 64, 40, 200],
    ];
    r.add(...T1);
    r.add(...bent);
    r.flush();

    expect(r.statsBuffer[CALLS]).toBe(2);
    expect(r.ctx.paths[0]).toHaveLength(3);
    expect(r.ctx.paths[1]).toHaveLength(3);
  });

  it("refuses a face that shares no edge", () => {
    r.add(...T1);
    r.add([10, 0, 0, 300, 300], [11, 64, 0, 364, 300], [12, 64, 64, 364, 364]);
    r.flush();
    expect(r.statsBuffer[CALLS]).toBe(2);
  });

  it("refuses a neighbour from a different mesh", () => {
    // Identities are offset per mesh so this should not arise, but fusing two meshes would draw one
    // with the other's texture.
    r.add(...T1);
    r.add(...T2, { textureImage: {}, texturePattern: null });
    r.flush();
    expect(r.statsBuffer[CALLS]).toBe(2);
  });

  it("flushes an overlapping chart before drawing over it, but leaves a distant one open", () => {
    // Holding a chart open paints it later than the sort placed it, so anything it overlaps has to
    // go down first. A chart elsewhere on screen is unaffected - that is what makes the slots pay.
    r.add(...T1);
    r.add([20, 0, 0, 500, 500], [21, 64, 0, 564, 500], [22, 64, 64, 564, 564]);
    expect(r.statsBuffer[CALLS]).toBe(0); // neither overlaps the other

    r.add([30, 0, 0, 10, 10], [31, 64, 0, 60, 10], [32, 64, 64, 60, 60]);
    expect(r.statsBuffer[CALLS]).toBe(1); // only the chart it lands on top of
  });

  it("refuses a neighbour on a different plane even though it shares an edge", () => {
    // Two perpendicular sides of a position-welded mesh do share vertex identities. Fusing them
    // would draw both under one nonsense map.
    r.add(...T1);
    r.add(...T2, r.mesh, [1, 0, 0]);
    r.flush();
    expect(r.statsBuffer[CALLS]).toBe(2);
  });

  it("closes a notch, removing the vertex the two matched edges meet at", () => {
    // A triangle sharing two consecutive boundary edges fills a concave corner: the shared vertex
    // becomes interior and must come out, not be duplicated.
    r.add([1, 0, 0, 0, 0], [2, 64, 0, 64, 0], [3, 32, 32, 32, 32]);
    r.add([1, 0, 0, 0, 0], [3, 32, 32, 32, 32], [4, 0, 64, 0, 64]);
    // Now the ring is 1,2,3,4 with 3 poking inward; this triangle fills 2-3-4.
    r.add([2, 64, 0, 64, 0], [4, 0, 64, 0, 64], [3, 32, 32, 32, 32]);
    r.flush();

    expect(r.statsBuffer[CALLS]).toBe(1);
    expect(r.ctx.paths[0]).toHaveLength(3); // 1, 2, 4 - the notch vertex is gone
  });

  it("drops a face left pending from an earlier frame instead of drawing it", () => {
    r.add(...T1);
    textureWeldReset(r.st);
    r.flush();
    expect(r.statsBuffer[CALLS]).toBe(0);
  });

  it("steps the owned edge out and back, leaving every original corner put", () => {
    // Two charts meeting at an edge each antialias their own half of it, and source-over of two
    // half coverages leaves the background showing through. A pattern has no stroke to close that,
    // so the boundary detours outward - but only over edges whose neighbour is drawn later, or
    // both sides push into each other and the boundary is displaced rather than repaired.
    //
    // Two vertices are ADDED. Offsetting the edge lines and re-intersecting at the corners instead
    // would move corners shared with edges nobody asked to move, and the chart would poke out from
    // under the neighbour meant to cover the detour.
    r.add(T1[0], T1[1], T1[2], r.mesh, [0, 0, 1], 1);
    r.flush();

    // UVs map 1:1 to the screen here, so the offset reads directly.
    expectAt(r.ctx.paths[0], [
      [0, 0],
      [0, -EXPAND],
      [64, -EXPAND],
      [64, 0],
      [64, 64],
    ]);
  });

  it("leaves geometry untouched when it owns no edge", () => {
    r.add(T1[0], T1[1], T1[2]);
    r.flush();
    expectAt(r.ctx.paths[0], [
      [0, 0],
      [64, 0],
      [64, 64],
    ]);
  });

  it("sizes that offset in screen pixels, through the map", () => {
    // The path is emitted in texture space, so a fixed step there would scale with the texture.
    // Same chart under a map four times coarser: the texture-space step has to grow to land the
    // same pixel on screen. Emitted points are mapped back through the affine, so the assertion is
    // in screen pixels either way.
    const shrink = ([id, u, v]) => [id, u, v, u * 0.25, v * 0.25];
    const [a, b, c] = T1.map(shrink);
    r.add(a, b, c, r.mesh, [0, 0, 1], 1);
    r.flush();

    expectAt(
      r.ctx.paths[0].map(([x, y]) => [x * 0.25, y * 0.25]),
      [
        [0, 0],
        [0, -EXPAND],
        [16, -EXPAND],
        [16, 0],
        [16, 16],
      ],
    );
  });
});
