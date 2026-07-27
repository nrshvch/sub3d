/**
 * Runs `renderOnce` repeatedly, discards a JIT-warmup period, then returns the median and
 * p95 frame time in milliseconds over the remaining samples.
 *
 * Deliberately times just the render call via performance.now(), not requestAnimationFrame -
 * rAF quantizes to the display refresh rate, which hides exactly the kind of small
 * regression this harness exists to catch (see the conversation this came out of).
 *
 * @param {() => void} renderOnce
 * @param {{warmup?: number, samples?: number}} [options]
 */
export function measure(renderOnce, { warmup = 80, samples = 300 } = {}) {
  for (let i = 0; i < warmup; i++) renderOnce();

  const times = new Float64Array(samples);
  for (let i = 0; i < samples; i++) {
    const t0 = performance.now();
    renderOnce();
    times[i] = performance.now() - t0;
  }

  const sorted = Array.from(times).sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length * 0.5)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];

  return { median, p95, samples: sorted };
}
