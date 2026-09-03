import { describe, it, expect } from "vitest";
import {
  identityFill,
  CTX_STATE_SHADE_FILL,
  CTX_STATE_SAW_REAL_SHADING,
  STATS_SHADE_DRAW_CALLS,
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
    const statsBuffer = new Int32Array(8);
    run(ctx, ctxStateBuffer, statsBuffer);

    const names = ctx.calls.map((c) => c[0]);
    expect(names).toContain("fill");
    expect(ctx.calls).toContainEqual(["set:fillStyle", "#ffffff"]);
    expect(statsBuffer[STATS_SHADE_DRAW_CALLS]).toBe(1);
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
