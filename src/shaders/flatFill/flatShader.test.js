import { describe, it, expect, beforeEach } from "vitest";
import { flatShaderFill } from "./index.js";
import { STATS_FILL_DRAW_CALLS } from "../../shared/shaders.js";

/**
 * Covers this shader's side of the welder contract - the parts that break silently.
 *
 * The merge algebra itself is tested in shared/weld.test.js; what matters here is the wiring: that
 * a face reaches the welder with the right colour and identities, that `last` empties every slot,
 * that the textured branch drains first, and that slots left from a previous frame are discarded
 * rather than painted.
 */

// Records the ctx call sequence, and each completed path's points.
function stubCtx() {
  const calls = [];
  const paths = [];
  let cur = null;
  const target = {
    calls,
    paths,
    canvas: { width: 800, height: 600 },
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
    closePath() {
      calls.push("closePath");
    },
    stroke() {
      calls.push("stroke");
    },
    fill() {
      calls.push("fill");
      // Trim the explicit closing point (see weld.js) so assertions count distinct corners.
      if (cur) {
        const n = cur.length;
        const isClosed =
          n > 1 && cur[0][0] === cur[n - 1][0] && cur[0][1] === cur[n - 1][1];
        paths.push(isClosed ? cur.slice(0, -1) : cur);
      }
      cur = null;
    },
  };
  return new Proxy(target, {
    get(t, k) {
      if (k in t) return t[k];
      return () => {
        calls.push(k);
      };
    },
    set(t, k, v) {
      t[k] = v;
      return true;
    },
  });
}

const GREEN = 0x3f7f2f;
const RED = 0xaa2020;

// A fresh frameId per harness, so one test's leftover slots can never leak into the next.
let nextFrame = 1;

function makeHarness() {
  const ctx = stubCtx();
  const ctxStateBuffer = new Int32Array(10).fill(-1);
  const statsBuffer = new Int32Array(8);
  const colorBuffer = new Uint32Array(3 * 64).fill(GREEN);
  // Distinct vertex indices per face: the texture branch reads mesh.faces to index uvs, and an
  // all-zero buffer would collapse the three UVs onto one point, degenerate the affine transform
  // and silently fall through to the untextured path.
  const faces = new Uint32Array(192);
  for (let i = 0; i < faces.length; i++) faces[i] = i % 4;
  const mesh = { faces, colors: colorBuffer, textureImage: null, uvs: null };
  const frameId = nextFrame++;

  // pts is [[x,y,id] x3]; only the arguments this shader reads need to be real.
  function face(
    faceIdx,
    pts,
    { last = false, meshIdx = 0, frame = frameId } = {},
  ) {
    const [a, b, c] = pts;
    flatShaderFill(
      ctx,
      a[0],
      a[1],
      b[0],
      b[1],
      c[0],
      c[1],
      new Float32Array(9 * 64),
      colorBuffer,
      new Float32Array(9 * 64),
      new Float32Array(3 * 64),
      a[2],
      b[2],
      c[2],
      faceIdx,
      mesh,
      faceIdx * 3,
      [0.2, 0.2, 0.2],
      new Uint32Array(1),
      [],
      0,
      0,
      0,
      1000,
      meshIdx,
      ctxStateBuffer,
      statsBuffer,
      frame,
      last,
    );
  }

  return { ctx, mesh, colorBuffer, statsBuffer, face, frameId };
}

describe("flat fill batching", () => {
  let h;
  beforeEach(() => {
    h = makeHarness();
  });

  it("welds two edge-adjacent faces into one polygon and draws once", () => {
    h.face(0, [
      [0, 0, 1],
      [10, 0, 2],
      [10, 10, 3],
    ]);
    h.face(
      1,
      [
        [0, 0, 1],
        [10, 10, 3],
        [0, 10, 4],
      ],
      { last: true },
    );

    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(1);
    expect(h.ctx.paths).toHaveLength(1);
    expect(h.ctx.paths[0]).toHaveLength(4);
  });

  it("holds non-adjacent same-colour faces in separate slots until last", () => {
    // Sharing no edge they cannot weld - but neither forces the other out, which is the whole
    // point of having more than one slot. Both land on the flush at `last`.
    h.face(0, [
      [0, 0, 1],
      [10, 0, 2],
      [10, 10, 3],
    ]);
    h.face(1, [
      [200, 200, 10],
      [210, 200, 11],
      [210, 210, 12],
    ]);
    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(0);

    h.face(
      2,
      [
        [400, 400, 20],
        [410, 400, 21],
        [410, 410, 22],
      ],
      { last: true },
    );
    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(3);
  });

  it("flushes an overlapping pending polygon when the colour changes", () => {
    h.face(0, [
      [0, 0, 1],
      [10, 0, 2],
      [10, 10, 3],
    ]);
    h.colorBuffer[1 * 3] = RED;
    h.face(1, [
      [1, 1, 10],
      [9, 1, 11],
      [9, 9, 12],
    ]); // overlaps -> green must be painted first

    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(1);
    expect(h.ctx.paths[0]).toHaveLength(3);
  });

  it("keeps non-overlapping pending polygons open across a colour change", () => {
    // Deferral is only unsafe against a differently-coloured face that would have painted over one
    // of them, so a colour change alone is not a reason to flush - only an actual screen overlap
    // is. This is what lets slots survive a depth-sorted stream long enough to be merged into.
    h.face(0, [
      [0, 0, 1],
      [10, 0, 2],
      [10, 10, 3],
    ]);
    h.face(1, [
      [500, 500, 10],
      [510, 500, 11],
      [510, 510, 12],
    ]);
    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(0);

    h.colorBuffer[2 * 3] = RED;
    h.face(2, [
      [900, 900, 20],
      [910, 900, 21],
      [910, 910, 22],
    ]);
    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(0); // nothing overlapped, nothing flushed

    h.colorBuffer[3 * 3] = RED;
    h.face(
      3,
      [
        [1, 1, 30],
        [9, 1, 31],
        [9, 9, 32],
      ],
      { last: true },
    );
    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(4); // the overlapped green, then the rest
  });

  it("ignores a mesh texture entirely, leaving it to the texture shader", () => {
    // Texturing is its own shaderKey now, so this shader must weld a textured mesh's face exactly
    // like any other rather than branching on mesh.textureImage. Ordering against a textured face
    // is the `last` protocol's job: the run ends when the key changes, which flushes these slots
    // before the texture shader draws.
    h.mesh.textureImage = {
      complete: true,
      naturalWidth: 64,
      width: 64,
      height: 64,
    };
    h.mesh.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);

    h.face(0, [
      [0, 0, 1],
      [10, 0, 2],
      [10, 10, 3],
    ]);
    h.face(
      1,
      [
        [0, 0, 1],
        [10, 10, 3],
        [0, 10, 4],
      ],
      { last: true },
    );

    expect(h.ctx.calls).not.toContain("clip");
    expect(h.ctx.calls).not.toContain("drawImage");
    // Still one welded quad, exactly as for an untextured mesh.
    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(1);
    expect(h.ctx.paths[0]).toHaveLength(4);
  });

  it("discards slots left over from an earlier frame rather than drawing them", () => {
    h.face(
      0,
      [
        [0, 0, 1],
        [10, 0, 2],
        [10, 10, 3],
      ],
      { frame: h.frameId },
    );
    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(0); // still pending

    // A new frame arrives without the previous one ever flushing.
    h.face(
      1,
      [
        [0, 0, 1],
        [10, 0, 2],
        [10, 10, 3],
      ],
      {
        frame: h.frameId + 1000,
        last: true,
      },
    );

    // Exactly one polygon: this frame's. Last frame's was dropped, not painted.
    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(1);
  });
});
