import { describe, it, expect, beforeEach } from "vitest";
import { textureShaderFill } from "./index.js";
import {
  CTX_STATE_FILL_PASS_FILL_STYLE_SLOT,
  STATS_FILL_DRAW_CALLS,
} from "../../shared/shaders.js";

/**
 * The mapping maths is ordinary; what breaks silently is the fallback. A textured mesh whose image
 * has not arrived yet, or whose UVs are degenerate, still has to cover what is behind it - the fill
 * pass is painter's-algorithm, so a face that draws nothing lets the geometry the sort put
 * underneath show through.
 */
function stubCtx() {
  const calls = [];
  const target = {
    calls,
    canvas: { width: 800, height: 600 },
    createPattern: (img, repeat) => {
      calls.push("createPattern:" + repeat);
      return { PATTERN: true };
    },
  };
  return new Proxy(target, {
    get: (t, k) => (k in t ? t[k] : (...a) => calls.push(k)),
    set: (t, k, v) => {
      calls.push("set:" + String(k));
      t[k] = v;
      return true;
    },
  });
}

const GREEN = 0x3f7f2f;

function makeHarness() {
  const ctx = stubCtx();
  const ctxStateBuffer = new Int32Array(10).fill(-1);
  const statsBuffer = new Int32Array(8);
  const colorBuffer = new Uint32Array(3 * 8).fill(GREEN);
  // Distinct indices per corner, or the three UVs collapse onto one point and the transform is
  // degenerate for reasons the test did not intend.
  const faces = new Uint32Array([0, 1, 2]);
  const mesh = {
    faces,
    textureImage: null,
    texturePattern: null,
    uvs: new Float32Array([0, 0, 1, 0, 1, 1]),
  };

  function face() {
    textureShaderFill(
      ctx,
      0,
      0,
      10,
      0,
      10,
      10,
      null,
      colorBuffer,
      null,
      new Float32Array([0, 0, 1]),
      0,
      1,
      2,
      0,
      mesh,
      0,
      [0.2, 0.2, 0.2],
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

  return { ctx, mesh, statsBuffer, ctxStateBuffer, face };
}

const READY_IMAGE = { complete: true, naturalWidth: 64, width: 64, height: 64 };

describe("texture fill", () => {
  let h;
  beforeEach(() => {
    h = makeHarness();
  });

  it("fills a texture-space path through a pattern, with no clip or drawImage", () => {
    // The whole point of the pattern recipe: a textured face becomes an ordinary fill().
    h.mesh.textureImage = READY_IMAGE;
    h.face();

    expect(h.ctx.calls).toContain("setTransform");
    expect(h.ctx.calls).toContain("fill");
    expect(h.ctx.calls).not.toContain("clip");
    expect(h.ctx.calls).not.toContain("drawImage");
    expect(h.ctx.calls).not.toContain("save");
    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(1);
  });

  it("repeats the pattern, so the seam-expanded ring still samples opaque texels", () => {
    h.mesh.textureImage = READY_IMAGE;
    h.face();
    expect(h.ctx.calls).toContain("createPattern:repeat");
  });

  it("caches the pattern on the mesh instead of rebuilding it per face", () => {
    h.mesh.textureImage = READY_IMAGE;
    h.face();
    h.face();
    h.face();
    const built = h.ctx.calls.filter(
      (c) => c === "createPattern:repeat",
    ).length;
    expect(built).toBe(1);
    expect(h.mesh.texturePattern).toBeTruthy();
  });

  it("resets the transform and invalidates the colour cache before returning", () => {
    // Both leak into the next face otherwise: a left-over CTM would displace it, and the flat
    // shader's cache would report a palette colour that the pattern has already replaced.
    h.mesh.textureImage = READY_IMAGE;
    h.face();

    const setTransforms = h.ctx.calls.filter((c) => c === "setTransform");
    expect(setTransforms.length).toBe(2); // the map, then the identity reset
    expect(h.ctx.calls[h.ctx.calls.length - 1]).toBe("setTransform");
    expect(h.ctxStateBuffer[CTX_STATE_FILL_PASS_FILL_STYLE_SLOT]).toBe(-1);
  });

  it("fills the base colour while the image is still loading", () => {
    h.mesh.textureImage = { complete: false, naturalWidth: 0 };
    h.face();

    expect(h.ctx.calls).not.toContain("drawImage");
    expect(h.ctx.calls).toContain("fill");
    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(1);
  });

  it("fills the base colour when the UVs do not form a triangle", () => {
    h.mesh.textureImage = READY_IMAGE;
    h.mesh.uvs = new Float32Array([0.5, 0.5, 0.5, 0.5, 0.5, 0.5]);
    h.face();

    expect(h.ctx.calls).not.toContain("drawImage");
    expect(h.ctx.calls).toContain("fill");
    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(1);
  });

  it("draws every face by the end of a run, merged or not", () => {
    // Faces are held back to see whether the next one completes a quad, so what matters is that
    // nothing is still pending once the run ends.
    h.mesh.textureImage = READY_IMAGE;
    h.face();
    h.face();
    expect(h.statsBuffer[STATS_FILL_DRAW_CALLS]).toBe(2);
  });
});
