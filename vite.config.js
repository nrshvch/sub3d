import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "./src/main.js",
      formats: ["es"],
      fileName: "sub3d",
    },
  },
});
