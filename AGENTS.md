# sub3d (scalia)

A custom software 3D game engine and renderer written in pure JavaScript, rendering entirely through the HTML5 Canvas 2D context (no WebGL, by design — see README for the "why").

## Commands

```bash
npm install       # install deps
npm run dev        # start Vite dev server
npm run build       # build production bundle to dist/sub3d.js
npm run preview      # preview the production build
```

`npm test` runs unit tests via vitest (plain Node, no browser needed), colocated with the source they cover: `src/radixSort.test.js`, `src/components/MeshComponent.test.js`, `src/shaders/flatFill/flatShader.test.js`, `src/shared/weld.test.js`. `vitest.config.js` excludes `bench/**` from that run; the tree is currently empty.

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
- `bench/` — perf benchmarks, excluded from `npm test`; currently empty.
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

## Architecture deep dive

The sections below cover how the pieces in "Layout" actually connect at runtime — background that normally takes reading several files to piece together.

### Scene graph & runtime objects

- `Game` owns a `World`; `World` owns a `Scene` plus `Time`, and runs its own fixed-timestep update loop (`World.tick`, driven by `Game`'s `requestAnimationFrame` loop) independently of `Canvas2dViewport`'s separate rAF render loop — simulation and rendering are decoupled.
- `Scene.retrieve()` walks the `GameObject`/`TransformComponent` tree iteratively (an explicit stack, not recursion) into a flat array every frame, updating world matrices as it goes. The renderer only ever consumes this flat array, never the tree.
- Components attach generically via `GameObject.addComponent`, but the hot ones short-circuit that: `MeshComponent`, `CameraComponent`, and `LightComponent` each override `setGameObject` to also stash themselves directly on the owning object (`gameObject.meshRenderer`, `.camera`, `.light`). Renderer and culling hot loops read those fields directly instead of scanning `components[]` via `getComponent()`.

### Render pipeline (`Canvas2dViewport` → `Canvas2dRenderer`)

Each frame, `Canvas2dRenderer.render(camera, viewport, stats)` does the following, per `config.layersCount` layer:

1. **Retrieve + cull** — `scene.retrieve()`, then two GC-free passes over the flat array: `roughCull` (bounding-sphere vs. frustum planes extracted from the clip matrix, Gribb-Hartmann) followed by `exactCull` (AABB vs. frustum, Cohen-Sutherland outcodes).
2. **Layer grouping** — `groupLayers` partitions the visible-object index buffer by `meshRenderer.layer` into one flat `Uint32Array` (skipped entirely when `layersCount === 1`).
3. **Destruct** — `destructMesh` flattens each visible mesh into per-face scratch buffers: clip-space transform, perspective divide, backface cull, and world-space normals/colors per face. Shared vertices are transformed once per mesh per frame via a `vMapping`/`vTags`/`callId` dedup scheme. It also writes `weldIdBuffer`, the per-face-vertex adjacency identity the batchers match edges on — kept separate from `vertexIndexBuffer` (a coordinate offset) and routed through the mesh's `weldMap`, so a hard-edge mesh still reports its shared edges as shared.
4. **Sort** — `radixSort` (`src/radixSort.js`, 4-pass stable counting sort) orders faces back-to-front by `[depth, mesh index, shader pass]`. Canvas2D has no z-buffer, so correctness depends entirely on this painter's-algorithm ordering; depth is the only key that carries occlusion information, the other two only group. The four-pass count is load-bearing: an odd number would leave the result in `tempIndexBuffer`, which the renderer reuses as `fogSort`'s output.
5. **Three draw passes**, each onto its own offscreen canvas per layer (`viewport.layers[i]` / `.shadeLayers[i]` / `.fogLayers[i]`):
   - **Fill** (`drawTriangles`) — base color or affine-texture-mapped fill, dispatched per-face on `mesh.shaderType` (0-4 are built-ins in a fixed switch for JIT monomorphism; 5+ are consumer shaders from `registerShader`, see below). Returns a bitmask (`NEEDS_SHADE_PASS`/`NEEDS_FOG_PASS`) gating whether the next two passes run at all for this layer this frame.
   - **Shade** (`shadeTriangles`) — deferred lighting, rendered as its own intensity layer, then composited onto the fill layer via `globalCompositeOperation = "multiply"`. This is the "deferred" part: lighting is resolved once as a separate image rather than computed inline per fill-shader.
   - **Fog** (`fogTriangles`, `src/shaders/flatFog/fog.js`) — its own sort (`fogSort`, mirroring `radixSort`'s key order with a fog-bucket tie-break) and its own offscreen layer, composited back with `difference`/`multiply`/`lighter` blend steps depending on fog type.
   - Toggling a pass off (`fillEnabled`/`shadeEnabled`/`fogEnabled`/`wireframe`/`debugNormals`/`debugAxis`) is renderer/viewport-wide, not a per-mesh setting — see the `Canvas2dViewport` getters/setters that forward to `Canvas2dRenderer`.
6. Each layer's fully-composited canvas is drawn onto `viewport.context` via `drawImage`, in layer order.

All scratch buffers used above (`depthBuffer`, `colorBuffer`, `clipGeometryBuffer`, etc.) are pre-allocated typed-array fields on `Canvas2dRenderer`, grown-and-copied only when a frame's face/vertex count exceeds current capacity, never shrunk or reallocated per-frame — the concrete mechanism behind "Zero GC" above.

**Every pass is painter's-algorithm, including the shade pass.** A face whose shader has nothing to contribute to a pass still has to paint the identity value there, or whatever an earlier face left behind shows through it. That is what `identityFill` (`whiteFillShade`) is for in the shade pass — white is the identity for `multiply`. Making it a no-op looks free and silently breaks any scene mixing shaded and unshaded meshes.

### Shader plugin contract

A mesh's `shaderType` (`src/components/MeshComponent.js`) selects a fill function and optional shade function. Values 0-4 are built-ins (`src/shaders/*.js`), reached via fixed switch statements inside both `drawTriangles` and `shadeTriangles`. Anything else is a consumer shader: call `registerShader(fillFn, shadeFn)` (`src/shaders/shaderRegistry.js`) once to obtain a key, then set that key as the mesh's `shaderType` — meshes hold only the numeric key, never a function reference. Fill/shade functions take a large fixed positional-argument list (screen-space and seam-expanded coordinates, clip-space geometry, color/normal buffers, vertex identities, the owning `mesh`, its mesh index, ambient light, the lights index buffer, fog params, the renderer's ctx/stats buffers, and a trailing `frameId`/`last` pair) — when adding a shader, match an existing one's exact signature rather than a subset of it, including the mesh-index and trailing params even if unused.

The renderer never owns or allocates any per-shader state. A shader that wants to persist something across faces (e.g. flat's triangle batching, below) declares its own module-level scratch array, private to its file, sized to whatever it needs — the renderer has no idea it exists. `frameId` increases once per `Canvas2dRenderer.render()` call (shared by every layer's fill/shade/fog pass that frame), letting a shader detect "my state predates the current frame, treat as empty" by comparing against a value it stored alongside that state — a defensive backstop, since correct operation means a shader's state is always already empty between uses (see `last` below). `last` arrives alongside a real face, never as a separate placeholder-only call, and means this is the last face of a contiguous run of this shaderKey (the next face uses a different shaderKey, or this is the final face in the pass): a shader handles the face normally first, then, if `last`, additionally flushes whatever's now pending before returning. A shader with nothing to persist needs no code for `last` at all — it's simply never referenced. See `registerShader`'s doc comment for the full contract.

The `last` protocol is also what keeps a batching shader safe next to an immediate-mode one: a run ends before a different shaderKey draws, so nothing stays deferred across the handover.

### Triangle batching

All three flat passes (`flatFill/flatShader.js`, `flatShade/shade.js`, `flatFog/fog.js`) batch through the shared **multi-slot welder** in `src/shared/weld.js`. Each pass owns its own `createWeldState()` — they run over different colour spaces (albedo, lit intensity, fog level) and interleave in time, so they cannot share open polygons. `weld.js` carries the full reasoning; this is the orientation.

- **Welding** merges edge-adjacent same-colour triangles into one polygon boundary, cancelling the shared edge. Up to `N_SLOTS` (64) polygons stay open at once, so a face can merge with any of them rather than only with the face that came immediately before it — which is what makes the depth sort's interleaving survivable. Merge cases: extend by one vertex, close a notch (two edges of one ring, removing a vertex), or splice two rings together. Edge lookup is an open-addressed directed-edge table cleared in O(1) by a generation counter.
- **Adjacency is by vertex identity, not position** — `weldIdBuffer` above. Without the `weldMap` indirection a hard-edge mesh finds no shared edges at all, because each triangle owns private copies of its corners.
- **The deferral guard is an exact screen-overlap test.** Holding a polygon open paints it later than the sort placed it. Within one colour that is free (filling C over C is idempotent), so the guard flushes exactly the open slots whose colour differs *and* whose screen AABB meets the incoming face's. Flushing every slot on any colour change would also be sound but is self-defeating — a depth-sorted stream changes colour constantly, so no slot would survive to be merged into.
- **Seam repair is a `stroke()` in the fill colour.** Canvas2D composites each fill's antialiased coverage separately, so two polygons sharing a boundary each cover about half the pixels along it and source-over of two half coverages is three quarters — a hairline of background shows through. Stroking is the only repair canvas2d offers; it is a constraint, not an optimization target. `lineWidth` is 1: a welded seam is stroked from one side only, so half a pixel ought to do, but anything below 1 leaves gaps visible in motion.
- **Every flush emits one simple closed polygon**, never subpaths. A path holding many overlapping subpaths is one draw call but a much harder rasterization, since nonzero-winding fill has to resolve the union across all of them.
- **Close the loop with an explicit `lineTo`, never `closePath()`.** `stroke()` skips the closing edge of an unclosed subpath while `fill()` closes it implicitly, so without it one edge per polygon is filled but never stroked — an unrepaired seam on every shape. `closePath()` is not the fix: it recomputes the whole path's bounds per call.
- **Collinear removal has to close around the wrap.** The emit walk starts at an arbitrary ring node and its first two points are emitted before any collinearity test is possible, so a vertex collinear across the seam survives unless both ends are re-tested against their true cyclic neighbours. The epsilon is small (0.05px) on purpose: dropping a vertex from a boundary shared with a differently-coloured region opens a hairline T-junction crack, because the neighbour still has a vertex there.

The one hazard: the flat fill shader's textured branch calls `ctx.beginPath()+clip()` under the same shaderKey, so it drains every open slot first — a textured face must paint after everything deferred that it may overlap. `src/shared/weld.test.js` covers the merge cases plus a ring-integrity fuzz that walks every open ring after every face; three real bugs were found that way that inspection had missed.

Firefox is the engine to measure on: it demotes an animated canvas to software rendering after a short warm-up, so it is both the slowest and the one whose cost model decides. A change that looks free in a Chromium-based preview can be a large regression there.

### Engine public API surface

`src/main.js` is a barrel export only — no engine logic of its own. It exposes the engine both as `window.scaliaEngine` and as the default export examples import via `import scaliaEngine from "sub3d"` (the npm-linked package from "Working with examples" above). A new public primitive, component, or shader needs an export added here too, or examples won't see it.
