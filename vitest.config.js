import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    // Benchmarks are not unit tests: they need vitest's browser mode, which is not configured
    // here, so leaving them to the default include pattern would run them under the wrong
    // environment. Unit tests sit beside the source they cover instead.
    exclude: [...configDefaults.exclude, "bench/**"],
  },
});
