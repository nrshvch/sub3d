import { describe, it, expect } from "vitest";
import { commands } from "@vitest/browser/context";
import scaliaEngine from "../src/main.js";
import { buildScene } from "./support/scene.js";
import { measure } from "./support/timing.js";

const BOX_COUNT = 306;
// bench/baseline.json is committed - the ratio (not the raw ms) is what's meant to be
// portable across machines/CI. Calibration cancels out raw compute-speed differences, but
// not everything (GPU vs. SwiftShader software rendering, OS/browser version quirks don't
// scale every Canvas2D op identically) - so this needs to be looser than a same-machine
// comparison would, to avoid failing CI on environment noise rather than a real regression.
const TOLERANCE = 1.1;

describe("flat shader bench", () => {
  it("shaderType 6 (customShader flat), normalized against calibration", async () => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style = "display: block; height: 100%";

    const { boxes, viewport } = buildScene(canvas, BOX_COUNT);
    const renderOnce = () => viewport.render();

    // Calibration: shaderType 1 (EMISSIVE), the cheapest built-in path, same geometry as
    // the measurement below. The measurement is expressed as a multiple of this, so
    // absolute machine/GPU speed cancels out of the comparison.
    for (const box of boxes) box.meshRenderer.shaderType = 1;
    const calibration = measure(renderOnce);

    // shaderType 6 dispatching to the predefined flat shader.
    for (const box of boxes) {
      box.meshRenderer.shaderType = 6;
      box.meshRenderer.customShader = scaliaEngine.shaders.flat;
    }
    const custom = measure(renderOnce);

    const ratio = custom.median / calibration.median;

    console.log("flat shader bench (n=" + BOX_COUNT + " boxes):");
    console.table({
      calibration: { medianMs: calibration.median, p95Ms: calibration.p95 },
      "case6 (customShader flat)": { medianMs: custom.median, p95Ms: custom.p95, ratioToCalibration: ratio },
    });

    const baseline = await commands.readBaseline();
    const key = `flatShader:${BOX_COUNT}`;
    const prev = baseline[key];

    // A recorded baseline is only comparable if it actually measured the same thing this
    // run measures. Without this check, editing the test to try something else (a
    // different shaderType, a different box count under the same key, etc.) silently
    // poisons the stored baseline - the next "real" run then fails against numbers that
    // were never measuring the same code path, with no obvious explanation why.
    const prevIsComparable = prev && prev.shaderType === 6;

    if (prev && !prevIsComparable) {
      console.log(
        `stored baseline for "${key}" was recorded with a different configuration ` +
          `(shaderType=${prev.shaderType}) - ignoring it and recording a fresh one instead ` +
          `of comparing against it`,
      );
    }

    if (prevIsComparable) {
      expect(
        ratio,
        "shaderType 6 (customShader flat) drifted vs the committed baseline",
      ).toBeLessThan(prev.ratio * TOLERANCE);
    } else {
      console.log(`no comparable baseline for "${key}" - this run establishes one`);
    }

    // bench/baseline.json is committed and shared (desktop, CI, any contributor) - it should
    // only change when someone deliberately decides to accept a new reference point, not as
    // a silent side effect of running the suite. So: write when there's nothing valid to
    // compare against yet (bootstrap, or a stale/mismatched entry from an earlier
    // experiment), or when explicitly asked to via `VITE_UPDATE_BASELINE=1 npm run bench`
    // (see package.json's "bench:update" script). Otherwise leave the committed file alone,
    // pass or fail.
    const shouldWrite = !prevIsComparable || import.meta.env.VITE_UPDATE_BASELINE === "1";

    if (shouldWrite) {
      baseline[key] = {
        shaderType: 6,
        ratio,
        recordedAt: new Date().toISOString(),
      };
      await commands.writeBaseline(baseline);
      console.log(
        prevIsComparable
          ? `VITE_UPDATE_BASELINE=1 set - overwrote the committed baseline for "${key}"`
          : `recorded a new committed baseline for "${key}"`,
      );
    }
  });
});
