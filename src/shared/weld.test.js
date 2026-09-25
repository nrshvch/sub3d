import { describe, it, expect, beforeEach } from "vitest";
import {
  createWeldState,
  weldAddFace,
  weldFlushAll,
  weldReset,
  edgeFind,
  N_SLOTS,
  EXPAND,
} from "./weld.js";
import { STATS_VERTICES_OFFSET } from "./shaders.js";

/**
 * The merge cases are pointer surgery on a linked ring plus an open-addressed edge table, so a bug
 * here produces a silently wrong polygon rather than a crash. These drive real triangle sequences
 * through weldAddFace and assert the emitted path.
 */

// Records each completed path as its ring of [x, y] corners. Nothing is trimmed: the emitter draws
// no closing edge of its own, since fill() closes the subpath implicitly and there is no stroke.
function stubCtx() {
  const paths = [];
  let cur = null;
  return {
    paths,
    closePathCalls: 0,
    strokeCalls: 0,
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 0,
    lineJoin: "",
    beginPath() {
      cur = [];
    },
    moveTo(x, y) {
      cur.push([x, y]);
    },
    lineTo(x, y) {
      cur.push([x, y]);
    },
    closePath() {
      this.closePathCalls++;
    },
    stroke() {
      this.strokeCalls++;
    },
    fill() {
      paths.push(cur);
      cur = null;
    },
  };
}

const GREEN = 0x3f7;
const RED = 0x7c00;
const STYLE = 0;
const CALLS = 0;
const VERTS = CALLS + STATS_VERTICES_OFFSET;
const EPS = 0.25;

function makeRig() {
  const st = createWeldState();
  const ctx = stubCtx();
  const ctxState = new Int32Array(10).fill(-1);
  const stats = new Int32Array(8);

  // (id, x, y) triples; colour and mesh default to one green mesh.
  const add = (a, b, c, color = GREEN, mesh = 0, expandMask = 0) =>
    weldAddFace(
      st,
      ctx,
      ctxState,
      STYLE,
      -1,
      stats,
      CALLS,
      EPS,
      color,
      mesh,
      a[1],
      a[2],
      a[0],
      b[1],
      b[2],
      b[0],
      c[1],
      c[2],
      c[0],
      expandMask,
    );
  const flush = () =>
    weldFlushAll(st, ctx, ctxState, STYLE, -1, stats, CALLS, EPS);

  return { st, ctx, stats, add, flush };
}

/**
 * Asserts a path visits the expected corners, order-insensitively and within a tolerance.
 *
 * Order-insensitive because the ring may be walked from any starting node; the coordinates
 * themselves are exact, since merging only relinks vertices and collinear removal only drops
 * them - neither ever moves one.
 */
function expectCorners(path, expected) {
  expect(path).toHaveLength(expected.length);
  for (const [ex, ey] of expected) {
    const near = path.some(
      ([x, y]) => Math.abs(x - ex) <= 1e-4 && Math.abs(y - ey) <= 1e-4,
    );
    expect(
      near,
      `no emitted vertex near ${ex},${ey} in ${JSON.stringify(path)}`,
    ).toBe(true);
  }
}

describe("multi-slot welder", () => {
  let r;
  beforeEach(() => {
    r = makeRig();
  });

  it("welds two edge-adjacent triangles into one quad", () => {
    // Triangle 1-2-3, then 1-3-4 which presents edge 1->3 against the existing 3->1.
    r.add([1, 0, 0], [2, 10, 0], [3, 10, 10]);
    r.add([1, 0, 0], [3, 10, 10], [4, 0, 10]);
    r.flush();

    expect(r.ctx.paths).toHaveLength(1);
    expectCorners(r.ctx.paths[0], [
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
    ]);
    expect(r.stats[CALLS]).toBe(1);
  });

  it("extends a strip one vertex per merged triangle", () => {
    r.add([1, 0, 0], [2, 10, 0], [3, 10, 10]);
    r.add([1, 0, 0], [3, 10, 10], [4, 0, 10]);
    r.add([4, 0, 10], [3, 10, 10], [5, 5, 20]); // cancels 3->4
    r.flush();

    expect(r.ctx.paths).toHaveLength(1);
    expect(r.ctx.paths[0]).toHaveLength(5);
    // the newly merged corner is present, modulo the half-pixel boundary offset
    expect(
      r.ctx.paths[0].some(
        ([x, y]) => Math.abs(x - 5) <= 1.5 && Math.abs(y - 20) <= 1.5,
      ),
    ).toBe(true);
  });

  it("closes a notch, removing the shared vertex", () => {
    // Build a pentagon with a concave corner at vertex 2, then fill that corner. The filling
    // triangle cancels TWO ring edges, which the old single-slot batcher refused outright.
    r.add([1, 0, 0], [2, 10, 5], [3, 20, 0]);
    r.add([1, 0, 0], [3, 20, 0], [4, 20, 20]); // cancels 3->1
    r.add([1, 0, 0], [4, 20, 20], [5, 0, 20]); // cancels 4->1
    // Ring is now 1->2->3->4->5. Triangle (3,2,1) cancels both 2->3 and 1->2.
    r.add([3, 20, 0], [2, 10, 5], [1, 0, 0]);
    r.flush();

    expect(r.ctx.paths).toHaveLength(1);
    // Five vertices minus the notch vertex = four.
    expectCorners(r.ctx.paths[0], [
      [0, 0],
      [20, 0],
      [20, 20],
      [0, 20],
    ]);
  });

  it("splices two separate rings when one triangle bridges both", () => {
    // Two same-colour shapes that share no edge yet.
    r.add([1, 0, 0], [2, 10, 0], [3, 5, 10]);
    r.add([4, 40, 0], [5, 50, 0], [6, 45, 10]);
    // A triangle presenting edge 2->1 (cancels ring A's 1->2) and 5->4 would not be one triangle;
    // instead bridge via shared identities: triangle (2,1,4) cancels A's 1->2 only. To force the
    // two-slot case, use a triangle whose edges cancel one edge in each ring.
    r.add([2, 10, 0], [1, 0, 0], [4, 40, 0]); // cancels A's 1->2
    r.add([4, 40, 0], [1, 0, 0], [5, 50, 0]); // cancels the new 1->4 and B's 4->5
    r.flush();

    // Everything ends up in a single ring, so a single path.
    expect(r.ctx.paths).toHaveLength(1);
    expect(r.stats[CALLS]).toBe(1);
  });

  it("flushes an overlapping slot of a different colour before placing the face", () => {
    r.add([1, 0, 0], [2, 10, 0], [3, 10, 10]); // green, covers 0..10
    expect(r.ctx.paths).toHaveLength(0);

    r.add([7, 1, 1], [8, 9, 1], [9, 9, 9], RED); // red, overlaps -> green must flush first
    expect(r.ctx.paths).toHaveLength(1);
    expectCorners(r.ctx.paths[0], [
      [0, 0],
      [10, 0],
      [10, 10],
    ]);
  });

  it("keeps a non-overlapping slot of a different colour open", () => {
    // The whole point of the overlap guard. Deferral only breaks a differently-coloured face that
    // should have painted OVER something still held open, so a colour change on its own proves
    // nothing - a slot elsewhere on screen is still safe to keep growing. The previous guard
    // flushed every slot on any colour change, which is why extra slots bought nothing: a
    // depth-sorted stream changes colour constantly.
    r.add([1, 0, 0], [2, 10, 0], [3, 10, 10]); // green near the origin
    r.add([4, 500, 500], [5, 510, 500], [6, 510, 510]); // green, far away
    expect(r.ctx.paths).toHaveLength(0);

    r.add([7, 900, 900], [8, 910, 900], [9, 910, 910], RED); // red, overlapping neither
    expect(r.ctx.paths).toHaveLength(0); // both greens still open

    r.flush();
    expect(r.ctx.paths).toHaveLength(3);
  });

  it("flushes only the overlapping different-colour slots, leaving the rest open", () => {
    // Sound but not conservative: the near red face must not paint under the green it covers, so
    // that green goes out first - while the green on the far side of the screen is untouched.
    r.add([1, 0, 0], [2, 10, 0], [3, 10, 10]); // green, will be overlapped
    r.add([4, 500, 500], [5, 510, 500], [6, 510, 510]); // green, will not be
    expect(r.ctx.paths).toHaveLength(0);

    r.add([7, 1, 1], [8, 9, 1], [9, 9, 9], RED); // red, overlaps only the first
    expect(r.ctx.paths).toHaveLength(1);
    expectCorners(r.ctx.paths[0], [
      [0, 0],
      [10, 0],
      [10, 10],
    ]);
  });

  it("evicts the least-recently-extended slot when all are occupied", () => {
    // N_SLOTS + 1 mutually non-overlapping same-colour triangles: no merges, no colour conflicts,
    // so the only way to place the last one is an eviction.
    for (let i = 0; i <= N_SLOTS; i++) {
      const x = i * 100;
      const b = i * 10 + 1;
      r.add([b, x, 0], [b + 1, x + 5, 0], [b + 2, x + 5, 5]);
    }
    expect(r.ctx.paths).toHaveLength(1); // exactly one forced out
    expect(r.st.evictions).toBe(1);
    // And it was the first one seeded, which is also the least recently extended.
    expectCorners(r.ctx.paths[0], [
      [0, 0],
      [5, 0],
      [5, 5],
    ]);
  });

  it("discards open rings on reset without drawing them", () => {
    r.add([1, 0, 0], [2, 10, 0], [3, 10, 10]);
    weldReset(r.st);
    r.flush();
    expect(r.ctx.paths).toHaveLength(0);
  });

  it("reuses pool nodes across many reset cycles without exhausting them", () => {
    for (let cycle = 0; cycle < 50; cycle++) {
      for (let i = 0; i < 20; i++) {
        const b = i * 10 + 1;
        r.add(
          [b, i * 100, 0],
          [b + 1, i * 100 + 5, 0],
          [b + 2, i * 100 + 5, 5],
        );
      }
      r.flush();
    }
    // 50 cycles x 20 triangles, all flushed, so every one must have been drawn.
    expect(r.stats[CALLS]).toBe(1000);
  });

  it("emits a bare fill: no stroke, and no closePath", () => {
    // Seam repair is an outward offset of the edges this face owns now, so there is no stroke and
    // therefore no closing edge to draw by hand - fill() closes the subpath implicitly.
    // closePath() stays out regardless: it recomputes the whole path's bounds per call.
    r.add([1, 0, 0], [2, 10, 0], [3, 10, 10]);
    r.flush();
    expect(r.ctx.strokeCalls).toBe(0);
    expect(r.ctx.closePathCalls).toBe(0);
    expect(r.ctx.paths).toHaveLength(1);
  });

  it("steps the flagged edge out and back, leaving every original vertex put", () => {
    // Right triangle (0,0)-(10,0)-(10,10) with only edge 0 flagged. Screen y is negated relative
    // to the maths convention, so outward for that edge is -y.
    //
    // The repair ADDS two vertices rather than moving any: the loop detours out along the edge and
    // returns. Offsetting the edge lines and re-intersecting them instead would move the corners at
    // both ends, and those corners belong to edges nobody asked to move - the hypotenuse here -
    // so the shape would poke out past the neighbour that is supposed to cover the detour.
    r.add([1, 0, 0], [2, 10, 0], [3, 10, 10], GREEN, 0, 1);
    r.flush();

    expect(r.ctx.paths[0]).toEqual([
      [0, 0],
      [0, -EXPAND],
      [10, -EXPAND],
      [10, 0],
      [10, 10],
    ]);
    // The detour's two points are tessellated like any other, so the vertex counter sees them.
    expect(r.stats[VERTS]).toBe(5);
  });

  it("counts exactly the points pushed to every filled path", () => {
    // The vertex counter stands in for tessellation load, so it has to match what reached fill() -
    // after collinear decimation, detours included - across merges, conflicts and evictions.
    let seedState = 0x2468ace;
    const rand = () => {
      seedState = (Math.imul(seedState, 1103515245) + 12345) & 0x7fffffff;
      return seedState / 0x80000000;
    };
    const W = 10;
    const vid = (x, y) => y * (W + 1) + x + 1;
    const tris = [];
    for (let y = 0; y < W; y++) {
      for (let x = 0; x < W; x++) {
        const col = rand() < 0.3 ? RED : GREEN;
        tris.push([
          [vid(x, y), x * 10, y * 10],
          [vid(x + 1, y), x * 10 + 10, y * 10],
          [vid(x + 1, y + 1), x * 10 + 10, y * 10 + 10],
          col,
        ]);
        tris.push([
          [vid(x, y), x * 10, y * 10],
          [vid(x + 1, y + 1), x * 10 + 10, y * 10 + 10],
          [vid(x, y + 1), x * 10, y * 10 + 10],
          col,
        ]);
      }
    }
    for (let i = tris.length - 1; i > 0; i--) {
      const j = (rand() * (i + 1)) | 0;
      [tris[i], tris[j]] = [tris[j], tris[i]];
    }

    for (const t of tris) r.add(t[0], t[1], t[2], t[3], 0, (rand() * 8) | 0);
    r.flush();

    const pushed = r.ctx.paths.reduce((sum, path) => sum + path.length, 0);
    expect(r.stats[CALLS]).toBe(r.ctx.paths.length);
    expect(r.stats[VERTS]).toBe(pushed);
    expect(pushed).toBeGreaterThan(3 * r.ctx.paths.length); // some detours were taken
  });

  it("leaves geometry untouched when no edge is flagged", () => {
    // A face whose neighbours all own their shared edges expands nowhere: it paints its true
    // coverage, and their offsets cover the seams from the other side.
    r.add([1, 0, 0], [2, 10, 0], [3, 10, 10]);
    r.flush();
    expectCorners(r.ctx.paths[0], [
      [0, 0],
      [10, 0],
      [10, 10],
    ]);
  });

  it("only collapses a collinear run whose edges agree on expansion", () => {
    // Two triangles welding into a quad whose bottom run (0,0)-(10,0)-(20,0) is straight. With
    // both halves flagged the middle vertex decimates away and one detour covers the whole run;
    // with only one half flagged the middle vertex must survive, or the unflagged half gets
    // dragged outward with it and grows a boundary it does not own.
    r.add([1, 0, 0], [2, 10, 0], [4, 0, 10], GREEN, 0, 1);
    r.add([2, 10, 0], [3, 20, 0], [4, 0, 10], GREEN, 0, 1);
    r.flush();

    // 3 corners + one detour over the merged run.
    expect(r.ctx.paths[0]).toHaveLength(5);
    expect(r.ctx.paths[0]).toContainEqual([0, -EXPAND]);
    expect(r.ctx.paths[0]).toContainEqual([20, -EXPAND]);

    const r2 = makeRig();
    r2.add([1, 0, 0], [2, 10, 0], [4, 0, 10], GREEN, 0, 1);
    r2.add([2, 10, 0], [3, 20, 0], [4, 0, 10], GREEN, 0, 0);
    r2.flush();

    // The run kept its middle vertex, so only its first half detours.
    expect(r2.ctx.paths[0]).toContainEqual([10, 0]);
    expect(r2.ctx.paths[0]).toContainEqual([10, -EXPAND]);
    expect(r2.ctx.paths[0]).not.toContainEqual([20, -EXPAND]);
  });

  it("rejoins a strip fed out of order: A B E F C D lands in one slot", () => {
    // A depth sort does not hand a strip over in strip order. Six triangles chained
    // T1-T2-T3-T4-T5-T6 across a 30x10 rectangle, submitted A B E F C D, exercise the case
    // multi-slot welding exists for: two separate rings grow independently and are then joined by
    // the triangle that bridges them.
    //   A(T1) seeds slot 1        B(T2) extends slot 1
    //   E(T5) seeds slot 2        F(T6) extends slot 2
    //   C(T3) extends slot 1 (its other neighbour D has not arrived)
    //   D(T4) matches BOTH slots -> splice -> one ring, slot 2 released
    // The single-slot batcher produced three separate polygons for this.
    const V = {
      1: [0, 0],
      2: [0, 10],
      3: [10, 0],
      4: [10, 10],
      5: [20, 0],
      6: [20, 10],
      7: [30, 0],
      8: [30, 10],
    };
    const t = (a, b, c) => [
      [a, V[a][0], V[a][1]],
      [b, V[b][0], V[b][1]],
      [c, V[c][0], V[c][1]],
    ];
    const A = t(1, 2, 3),
      B = t(3, 2, 4),
      C = t(3, 4, 5);
    const D = t(5, 4, 6),
      E = t(5, 6, 7),
      F = t(7, 6, 8);

    for (const f of [A, B, E, F, C, D]) r.add(f[0], f[1], f[2]);
    expect(r.ctx.paths).toHaveLength(0); // nothing forced out along the way
    r.flush();

    // One draw call, and the interior strip vertices are gone: the union is a plain rectangle.
    expect(r.ctx.paths).toHaveLength(1);
    expectCorners(r.ctx.paths[0], [
      [0, 0],
      [30, 0],
      [30, 10],
      [0, 10],
    ]);
  });

  it("drops collinear vertices at flush", () => {
    // A quad whose two triangles are split along a straight edge: the midpoint vertex on the
    // straight run must not survive into the emitted path.
    r.add([1, 0, 0], [2, 20, 0], [3, 10, 10]);
    r.add([1, 0, 0], [3, 10, 10], [4, 0, 10]);
    r.flush();
    const path = r.ctx.paths[0];
    // No three consecutive emitted points may be collinear.
    for (let i = 0; i < path.length; i++) {
      const [px, py] = path[i];
      const [qx, qy] = path[(i + 1) % path.length];
      const [rx, ry] = path[(i + 2) % path.length];
      const cross = (qx - px) * (ry - py) - (qy - py) * (rx - px);
      expect(Math.abs(cross)).toBeGreaterThan(0.01);
    }
  });

  it("keeps every ring structurally consistent under a shuffled welded grid", () => {
    // The merge cases are pointer surgery, and the failure mode is a silently wrong polygon, not a
    // crash. This walks every open ring after every single face and checks the invariants that the
    // flush later depends on: the ring closes in exactly SL_LEN steps, no node is freed or
    // mis-tagged, and the edge table resolves each ring edge back to the node that owns it. Three
    // real bugs were found this way that inspection had missed - a freed node leaving its edge
    // behind, a notch freeing the slot's head, and a splice retagging the wrong node count.
    const SL_STRIDE = 8,
      SL_COLOR = 0,
      SL_HEAD = 1,
      SL_LEN = 2,
      SC_LIVE = 4;
    const ND_STRIDE = 8,
      ND_ID = 2,
      ND_NEXT = 3,
      ND_SLOT = 4;

    function assertConsistent(st, where) {
      let reachable = 0;
      for (let slot = 0; slot < N_SLOTS; slot++) {
        const b = slot * SL_STRIDE;
        if (st.slots[b + SL_COLOR] === -1) continue;
        const head = st.slots[b + SL_HEAD];
        const len = st.slots[b + SL_LEN];
        expect(len, `${where}: slot ${slot} length`).toBeGreaterThanOrEqual(3);
        const seen = new Set();
        let n = head;
        for (let k = 0; k < len; k++) {
          expect(n, `${where}: slot ${slot} ring broke at ${k}`).not.toBe(-1);
          expect(seen.has(n), `${where}: slot ${slot} node ${n} repeats`).toBe(
            false,
          );
          seen.add(n);
          expect(
            st.nodes[n * ND_STRIDE + ND_ID],
            `${where}: slot ${slot} node ${n} freed`,
          ).not.toBe(-1);
          expect(
            st.nodes[n * ND_STRIDE + ND_SLOT],
            `${where}: slot ${slot} node ${n} mis-tagged`,
          ).toBe(slot);
          const nx = st.nodes[n * ND_STRIDE + ND_NEXT];
          expect(
            nx,
            `${where}: slot ${slot} node ${n} has no successor`,
          ).not.toBe(-1);
          expect(
            edgeFind(
              st,
              st.nodes[n * ND_STRIDE + ND_ID],
              st.nodes[nx * ND_STRIDE + ND_ID],
            ),
            `${where}: slot ${slot} edge ${st.nodes[n * ND_STRIDE + ND_ID]}->${st.nodes[nx * ND_STRIDE + ND_ID]} lost`,
          ).toBe(n);
          n = nx;
        }
        expect(n, `${where}: slot ${slot} ring did not close`).toBe(head);
        reachable += seen.size;
      }
      expect(reachable, `${where}: live count`).toBe(st.scal[SC_LIVE]);
    }

    // Deterministic PRNG so a failure is reproducible.
    let seedState = 0x1234567;
    const rand = () => {
      seedState |= 0;
      seedState = (seedState + 0x6d2b79f5) | 0;
      let t = Math.imul(seedState ^ (seedState >>> 15), 1 | seedState);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    for (let seed = 0; seed < 3; seed++) {
      const rig = makeRig();
      const W = 10;
      const vid = (x, y) => y * (W + 1) + x + 1;
      const tris = [];
      for (let y = 0; y < W; y++) {
        for (let x = 0; x < W; x++) {
          // Two colours so the conflict guard fires, and a welded grid so neighbouring tiles
          // genuinely share vertex ids - which is what makes notches and splices reachable.
          const col = ((rand() * 3) | 0) === 0 ? RED : GREEN;
          tris.push([
            [vid(x, y), x * 10, y * 10],
            [vid(x + 1, y), x * 10 + 10, y * 10],
            [vid(x + 1, y + 1), x * 10 + 10, y * 10 + 10],
            col,
          ]);
          tris.push([
            [vid(x, y), x * 10, y * 10],
            [vid(x + 1, y + 1), x * 10 + 10, y * 10 + 10],
            [vid(x, y + 1), x * 10, y * 10 + 10],
            col,
          ]);
        }
      }
      // Shuffle: the depth sort scatters submission order, which is exactly when slots matter.
      for (let i = tris.length - 1; i > 0; i--) {
        const j = (rand() * (i + 1)) | 0;
        [tris[i], tris[j]] = [tris[j], tris[i]];
      }

      for (let i = 0; i < tris.length; i++) {
        const t = tris[i];
        rig.add(t[0], t[1], t[2], t[3]);
        assertConsistent(rig.st, `seed ${seed} face ${i}`);
      }
      rig.flush();
      assertConsistent(rig.st, `seed ${seed} after flush`);
    }
  });
});
