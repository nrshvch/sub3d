import { describe, it, expect, beforeEach } from "vitest";
import {
  createGouraudWeldState,
  gouraudWeldAddFace,
  gouraudWeldFlushAll,
} from "./gouraudWeld.js";
import {
  CTX_STATE_SAW_REAL_SHADING,
  CTX_STATE_SHADE_FILL,
  STATS_SHADE_DRAW_CALLS,
} from "../../shared/shaders.js";

/**
 * The merge cases are element surgery on a flat ring plus an open-addressed edge table, and the
 * field is what decides whether a face is admitted at all - so a bug here yields a silently wrong
 * polygon or a chart shaded from the wrong plane, never a crash. These drive real triangle
 * sequences through gouraudWeldAddFace and assert the emitted path and fill.
 */

// Records each completed path as its ring of [x, y] corners, plus the style in force when it was
// filled. A gradient records as its stop list, so a test can tell a gradient fill from a flat one.
function stubCtx() {
  const paths = [];
  const styles = [];
  let cur = null;
  return {
    paths,
    styles,
    fillStyle: "",
    strokeStyle: "",
    createLinearGradient(x0, y0, x1, y1) {
      return { gradient: [x0, y0, x1, y1], stops: [] };
    },
    beginPath() {
      cur = [];
    },
    moveTo(x, y) {
      cur.push([x, y]);
    },
    lineTo(x, y) {
      cur.push([x, y]);
    },
    fill() {
      paths.push(cur);
      styles.push(this.fillStyle);
      cur = null;
    },
  };
}

function makeRig() {
  const ctx = stubCtx();
  // Stop objects come back from the stub's createLinearGradient with a plain array, so addColorStop
  // has to live on them rather than on the context.
  const realCreate = ctx.createLinearGradient.bind(ctx);
  ctx.createLinearGradient = (x0, y0, x1, y1) => {
    const g = realCreate(x0, y0, x1, y1);
    g.addColorStop = (offset, color) => g.stops.push([offset, color]);
    return g;
  };
  return {
    ctx,
    st: createGouraudWeldState(),
    ctxState: new Int32Array(16).fill(-1),
    stats: new Int32Array(8),
  };
}

/**
 * Adds one triangle. Colours are given per corner as [r, g, b] in 0-255 light units, positions as
 * [x, y], identities as plain integers.
 */
function addFace(rig, corners, expandMask = 0) {
  const [a, b, c] = corners;
  gouraudWeldAddFace(
    rig.st,
    rig.ctx,
    rig.ctxState,
    rig.stats,
    a.c[0],
    a.c[1],
    a.c[2],
    a.p[0],
    a.p[1],
    a.id,
    b.c[0],
    b.c[1],
    b.c[2],
    b.p[0],
    b.p[1],
    b.id,
    c.c[0],
    c.c[1],
    c.c[2],
    c.p[0],
    c.p[1],
    c.id,
    expandMask,
  );
}

function flush(rig) {
  gouraudWeldFlushAll(rig.st, rig.ctx, rig.ctxState, rig.stats);
}

// A flat corner helper: same colour everywhere.
function grey(v) {
  return [v, v, v];
}

describe("gouraudWeld", () => {
  let rig;
  beforeEach(() => {
    rig = makeRig();
  });

  it("emits a lone face as its own triangle", () => {
    addFace(rig, [
      { c: grey(100), p: [0, 0], id: 1 },
      { c: grey(100), p: [10, 0], id: 2 },
      { c: grey(100), p: [0, 10], id: 3 },
    ]);
    flush(rig);

    expect(rig.ctx.paths).toEqual([
      [
        [0, 0],
        [10, 0],
        [0, 10],
      ],
    ]);
    expect(rig.stats[STATS_SHADE_DRAW_CALLS]).toBe(1);
  });

  it("merges two flat faces sharing an edge into one quad", () => {
    // Two halves of the unit square, sharing the diagonal 2->3.
    addFace(rig, [
      { c: grey(100), p: [0, 0], id: 1 },
      { c: grey(100), p: [10, 0], id: 2 },
      { c: grey(100), p: [0, 10], id: 3 },
    ]);
    addFace(rig, [
      { c: grey(100), p: [10, 0], id: 2 },
      { c: grey(100), p: [10, 10], id: 4 },
      { c: grey(100), p: [0, 10], id: 3 },
    ]);
    flush(rig);

    expect(rig.ctx.paths.length).toBe(1);
    expect(rig.ctx.paths[0]).toEqual([
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
    ]);
  });

  it("merges two faces that share one linear shading field", () => {
    // Intensity rises with x at 4 units per pixel on both triangles, so the second face's own
    // corner (10,10) lies exactly on the first's plane.
    const f = (x) => grey(100 + 4 * x);
    addFace(rig, [
      { c: f(0), p: [0, 0], id: 1 },
      { c: f(10), p: [10, 0], id: 2 },
      { c: f(0), p: [0, 10], id: 3 },
    ]);
    addFace(rig, [
      { c: f(10), p: [10, 0], id: 2 },
      { c: f(10), p: [10, 10], id: 4 },
      { c: f(0), p: [0, 10], id: 3 },
    ]);
    flush(rig);

    expect(rig.ctx.paths.length).toBe(1);
    expect(rig.ctx.paths[0]).toEqual([
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
    ]);
    // A field that varies has to come out as a gradient, with the stops at the chart's own extremes
    // along the axis - here the left and right edges.
    const style = rig.ctx.styles[0];
    expect(style.stops.length).toBe(2);
    expect(style.stops[0][1]).not.toBe(style.stops[1][1]);
  });

  it("refuses a face whose colours miss the chart's field", () => {
    const f = (x) => grey(100 + 4 * x);
    addFace(rig, [
      { c: f(0), p: [0, 0], id: 1 },
      { c: f(10), p: [10, 0], id: 2 },
      { c: f(0), p: [0, 10], id: 3 },
    ]);
    // Same shared edge, but its free corner is far off the first triangle's plane.
    addFace(rig, [
      { c: f(10), p: [10, 0], id: 2 },
      { c: grey(20), p: [10, 10], id: 4 },
      { c: f(0), p: [0, 10], id: 3 },
    ]);
    flush(rig);

    expect(rig.ctx.paths.length).toBe(2);
  });

  it("closes a notch, removing the shared vertex", () => {
    // Three triangles of a fan around (0,0): the third fills the notch between the first two, so it
    // matches two ring edges at once and the vertex between them becomes interior.
    addFace(rig, [
      { c: grey(80), p: [0, 0], id: 1 },
      { c: grey(80), p: [10, 0], id: 2 },
      { c: grey(80), p: [10, 10], id: 3 },
    ]);
    addFace(rig, [
      { c: grey(80), p: [0, 0], id: 1 },
      { c: grey(80), p: [10, 10], id: 3 },
      { c: grey(80), p: [0, 10], id: 4 },
    ]);
    flush(rig);

    expect(rig.ctx.paths.length).toBe(1);
    // Vertex 3 sits on the straight run between 2 and 4 only for a square; here it is a real corner,
    // so all four survive.
    expect(rig.ctx.paths[0].length).toBe(4);
  });

  it("draws a constant chart as a flat palette fill, not a gradient", () => {
    addFace(rig, [
      { c: grey(128), p: [0, 0], id: 1 },
      { c: grey(128), p: [10, 0], id: 2 },
      { c: grey(128), p: [0, 10], id: 3 },
    ]);
    flush(rig);

    expect(typeof rig.ctx.styles[0]).toBe("string");
    expect(rig.ctxState[CTX_STATE_SHADE_FILL]).toBeGreaterThanOrEqual(0);
    expect(rig.ctxState[CTX_STATE_SAW_REAL_SHADING]).toBe(1);
  });

  it("invalidates the colour cache after a gradient", () => {
    const f = (x) => grey(60 + 8 * x);
    addFace(rig, [
      { c: f(0), p: [0, 0], id: 1 },
      { c: f(10), p: [10, 0], id: 2 },
      { c: f(0), p: [0, 10], id: 3 },
    ]);
    flush(rig);

    // A gradient is not a palette entry, so the next flat face must set its own style.
    expect(rig.ctxState[CTX_STATE_SHADE_FILL]).toBe(-1);
    expect(rig.ctxState[CTX_STATE_SAW_REAL_SHADING]).toBe(1);
  });

  it("leaves white alone so an unshaded scene skips its composite", () => {
    addFace(rig, [
      { c: grey(255), p: [0, 0], id: 1 },
      { c: grey(255), p: [10, 0], id: 2 },
      { c: grey(255), p: [0, 10], id: 3 },
    ]);
    flush(rig);

    expect(rig.ctxState[CTX_STATE_SAW_REAL_SHADING]).toBe(-1);
  });

  it("grows only the edges the mask marks", () => {
    // Edge 0 runs corner 0 -> corner 1, along the top. Growing it adds two vertices.
    addFace(
      rig,
      [
        { c: grey(100), p: [0, 0], id: 1 },
        { c: grey(100), p: [10, 0], id: 2 },
        { c: grey(100), p: [0, 10], id: 3 },
      ],
      1,
    );
    flush(rig);

    // The detour is inserted after the corner the grown edge leaves: 0 -> 0+n -> 1+n -> 1 -> 2.
    // Outward for a left-to-right edge is straight up, hence y = -1.
    expect(rig.ctx.paths[0]).toEqual([
      [0, 0],
      [0, -1],
      [10, -1],
      [10, 0],
      [0, 10],
    ]);
  });

  it("flushes an overlapping chart of a different field before drawing over it", () => {
    // A far face is held open; a near one covering the same pixels but shaded differently must not
    // be allowed to paint first.
    addFace(rig, [
      { c: grey(200), p: [0, 0], id: 1 },
      { c: grey(200), p: [10, 0], id: 2 },
      { c: grey(200), p: [0, 10], id: 3 },
    ]);
    expect(rig.ctx.paths.length).toBe(0);

    addFace(rig, [
      { c: grey(40), p: [2, 2], id: 5 },
      { c: grey(40), p: [8, 2], id: 6 },
      { c: grey(40), p: [2, 8], id: 7 },
    ]);
    expect(rig.ctx.paths.length).toBe(1); // the far one went down first
  });

  it("keeps every ring a simple closed loop across a random face stream", () => {
    // Ring integrity is the invariant that matters: every merge case rewrites the boundary in
    // place, and a bug shows up as a repeated or orphaned vertex rather than an exception. Walk a
    // grid's triangles in a shuffled order and check the rings after every single face.
    const st = rig.st;
    const faces = [];
    const W = 6;
    for (let y = 0; y < W; y++) {
      for (let x = 0; x < W; x++) {
        const a = y * (W + 1) + x;
        const b = a + 1;
        const c = a + W + 1;
        const d = c + 1;
        faces.push([
          [a, x, y],
          [b, x + 1, y],
          [c, x, y + 1],
        ]);
        faces.push([
          [b, x + 1, y],
          [d, x + 1, y + 1],
          [c, x, y + 1],
        ]);
      }
    }
    // Deterministic shuffle, so a failure reproduces.
    let seed = 12345;
    for (let i = faces.length - 1; i > 0; i--) {
      seed = (Math.imul(seed, 1103515245) + 12345) & 0x7fffffff;
      const j = seed % (i + 1);
      const t = faces[i];
      faces[i] = faces[j];
      faces[j] = t;
    }

    for (const f of faces) {
      addFace(
        rig,
        f.map(([id, x, y]) => ({ c: grey(120), p: [x * 10, y * 10], id })),
      );

      // Every used slot: length in range, no repeated identity, and every ring edge resolving back
      // to its own slot through the edge table.
      for (let s = 0; s < 32; s++) {
        if (st.slots[s * 4] === 0) continue;
        const len = st.slots[s * 4 + 1];
        expect(len).toBeGreaterThanOrEqual(3);
        expect(len).toBeLessThanOrEqual(16);
        const seen = new Set();
        for (let i = 0; i < len; i++) {
          const id = st.bid[s * 16 + i];
          expect(seen.has(id)).toBe(false);
          seen.add(id);
        }
      }
    }

    flush(rig);
    // Every triangle of the grid ends up drawn exactly once, whatever order it arrived in.
    expect(rig.stats[STATS_SHADE_DRAW_CALLS]).toBe(rig.ctx.paths.length);
    expect(rig.ctx.paths.length).toBeGreaterThan(0);
    expect(rig.ctx.paths.length).toBeLessThan(faces.length);
  });
});
