# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

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
3. **Destruct** — `destructMesh` flattens each visible mesh into per-face scratch buffers: clip-space transform, perspective divide, backface cull, and world-space normals/colors per face. Shared vertices are transformed once per mesh per frame via a `vMapping`/`vTags`/`callId` dedup scheme.
4. **Sort** — `radixSort` (`src/radixSort.js`, 4-pass stable counting sort) orders faces back-to-front by `[depth, meshIndex, shaderPass]`. Canvas2D has no z-buffer, so correctness depends entirely on this painter's-algorithm ordering.
5. **Three draw passes**, each onto its own offscreen canvas per layer (`viewport.layers[i]` / `.shadeLayers[i]` / `.fogLayers[i]`):
   - **Fill** (`drawTriangles`) — base color or affine-texture-mapped fill, dispatched per-face on `mesh.shaderType` (0-4 are built-ins in a fixed switch for JIT monomorphism; 5+ are consumer shaders from `registerShader`, see below). Returns a bitmask (`NEEDS_SHADE_PASS`/`NEEDS_FOG_PASS`) gating whether the next two passes run at all for this layer this frame.
   - **Shade** (`shadeTriangles`) — deferred lighting, rendered as its own intensity layer, then composited onto the fill layer via `globalCompositeOperation = "multiply"`. This is the "deferred" part: lighting is resolved once as a separate image rather than computed inline per fill-shader.
   - **Fog** (`fogTriangles`, `src/fog.js`) — its own sort (`fogSort`, mirrors `radixSort`'s key order with a fog-bucket tie-break) and its own offscreen layer, composited back with `difference`/`multiply`/`lighter` blend steps depending on fog type.
   - Toggling a pass off (`fillEnabled`/`shadeEnabled`/`fogEnabled`/`wireframe`/`debugNormals`/`debugAxis`) is renderer/viewport-wide, not a per-mesh setting — see the `Canvas2dViewport` getters/setters that forward to `Canvas2dRenderer`.
6. Each layer's fully-composited canvas is drawn onto `viewport.context` via `drawImage`, in layer order.

All scratch buffers used above (`depthBuffer`, `colorBuffer`, `clipGeometryBuffer`, etc.) are pre-allocated typed-array fields on `Canvas2dRenderer`, grown-and-copied only when a frame's face/vertex count exceeds current capacity, never shrunk or reallocated per-frame — the concrete mechanism behind "Zero GC" above.

### Shader plugin contract

A mesh's `shaderType` (`src/components/MeshComponent.js`) selects a fill function and optional shade function. Values 0-4 are built-ins (`src/shaders/*.js`), reached via fixed switch statements inside both `drawTriangles` and `shadeTriangles`. Anything else is a consumer shader: call `registerShader(fillFn, shadeFn)` (`src/shaders/shaderRegistry.js`) once to obtain a key, then set that key as the mesh's `shaderType` — meshes hold only the numeric key, never a function reference. Fill/shade functions take a large fixed positional-argument list (screen-space and seam-expanded coordinates, clip-space geometry, color/normal buffers, vertex identities for batching, the owning `mesh`, ambient light, the lights index buffer, fog params, and the renderer's ctx/stats/batch-state buffers) — when adding a shader, match an existing one's exact signature rather than a subset of it.

### Triangle batching

`shaderRegistry.js`'s `batchedFlatFill`/`batchedShadeFill` (and `fog.js`'s independent `batchedFogFace`) merge consecutive same-color, same-mesh triangles that share an edge into a single filled path instead of one `stroke()+fill()` call per triangle, using a small fixed-capacity boundary-walk (`FILL_BATCH_CAPACITY`/`SHADE_BATCH_CAPACITY`/`FOG_BATCH_CAPACITY`, currently 16). Each pass must call its matching `flushBatched*Fill` at the end of the pass, or the last pending batch is silently dropped.

### Engine public API surface

`src/main.js` is a barrel export only — no engine logic of its own. It exposes the engine both as `window.scaliaEngine` and as the default export examples import via `import scaliaEngine from "sub3d"` (the npm-linked package from "Working with examples" above). A new public primitive, component, or shader needs an export added here too, or examples won't see it.
