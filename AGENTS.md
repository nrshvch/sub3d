# sub3d (scalia)

A custom software 3D game engine and renderer written in pure JavaScript, rendering entirely through the HTML5 Canvas 2D context (no WebGL, by design — see README for the "why").

## Commands

```bash
npm install       # install deps
npm run dev        # start Vite dev server
npm run build       # build production bundle to dist/sub3d.js
npm run preview      # preview the production build
```

There is no real test suite yet (`npm test` is a stub). `bench/` contains performance benchmarks (e.g. `bench/flatShader.bench.test.js`) with support helpers in `bench/support/`.

## Layout

- `src/` — engine source.
  - `Canvas2dRenderer.js`, `Canvas2dViewport.js` — core rendering pipeline.
  - `Camera.js`, `Scene.js`, `World.js`, `Game.js`, `GameObject.js`, `Component.js`, `Light.js`, `Time.js`, `SpriteManager.js` — engine/runtime primitives.
  - `math.js`, `noise.js`, `radixSort.js`, `palette.js`, `config.js` — math and shared utilities.
  - `src/primitives/` — mesh primitives (Ball, Box, Cone, Plane).
  - `src/components/` — attachable components (Transform, Mesh, Camera, Sprite/Path/Text renderers).
  - `src/shaders/` — Canvas2D "shader-like" polygon shading modes (flat, smooth, emissive, unlit, avgFlat) plus `shaderRegistry.js`.
  - `src/debug/` — debug visualization helpers (e.g. vertex/face normals).
- `examples/` — standalone demo apps (isometric-world, boxes, earth, cubes-2013 legacy), each with its own `main.js` and build, those are used to test sub3d manually.  
- `bench/` — perf benchmarks and screenshot baselines (`__screenshots__/`).
- `dist/` — built output (`sub3d.js`), not hand-edited.

## Engine conventions (see README for full detail)

- **Zero GC in hot paths**: the render loop must not allocate objects/arrays. Reuse pre-allocated `Float32Array`/`Uint32Array` buffers for vectors, matrices, and coordinate lists.
- **Minimal function calls in inner loops**: vector/matrix math in perf-critical sections (dot products, transforms) is inlined rather than calling out to `math.js` helpers. 
- **16-bit 5-6-5 color palette**: colors are quantized from `#RRGGBB` hex for a retro look (`palette.js`).
- Prefer editing existing shaders/components over adding new abstractions; this is a small, performance-sensitive codebase — keep additions inline with the existing "shader-like per-polygon" style.
- Optimized code leveraging SIMD operations, target not just x86, but also ARM cpus. 
- Use existing patterns

## Style

- Prettier: 2-space indent, double quotes off (`singleQuote: false` → double quotes), semicolons on, trailing commas everywhere. Run through Prettier defaults in this repo, don't hand-format differently.
- LF line endings, final newline required (`.editorconfig`).
- ES modules (`"type": "module"`).
- Keeping diff lean for easier reviews.
- Push back and raise a hand noticing the task cannot be completed using precise changes, requiring major refactoring and leakign changes into otuside score of discussion or module, or file.
- Follow industry standard of 3d renderers, keep things abstract, changes in examples/implementation shoudnt affect code inside engine. E.g. mesh generation code updates shouldnt introduce changes in renderer, if theres a real reason for that (e.g. bug in renderer) - raise a hand.

## Working with examples

Each folder under `examples/` is a self-contained demo with its own `package.json`/build; when changing shared engine behavior, check whether example `main.js` files need updating too (built output for examples is committed alongside source in some folders — check `git status` before assuming otherwise).
Sub3d packages of examples usually are manually npm-linked, so no need to build and copy sub3d dist into examples.
