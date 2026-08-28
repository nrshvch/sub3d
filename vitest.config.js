import { defineConfig, configDefaults } from "vitest/config";

// bench/*.bench.test.js needs vitest's browser mode (see bench/flatShader.bench.test.js's
// @vitest/browser/context import) which isn't configured here - keep it out of the default
// plain-Node unit test run instead of trying to run it under the wrong environment.
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "bench/**"],
  },
});
