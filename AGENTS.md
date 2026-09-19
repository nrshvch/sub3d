# sub3d (scalia)

A custom software 3D game engine and renderer written in pure JavaScript, rendering entirely through the HTML5 Canvas 2D context (no WebGL, by design — see README for the "why").

## Commands

```bash
npm install       # install deps
npm run dev        # start Vite dev server
npm run build       # build production bundle to dist/sub3d.js
npm run preview      # preview the production build
```

`npm test` runs unit tests via vitest (plain Node, no browser needed), colocated with the source they cover: `src/radixSort.test.js`, `src/components/MeshComponent.test.js`, `src/shaders/avgFlatFill/avgFlatShader.test.js`, `src/shared/weld.test.js`. `vitest.config.js` excludes `bench/**` from that run; the tree is currently empty.

## Layout

- `src/` — engine source.
  - `Canvas2dRenderer.js`, `Canvas2dViewport.js` — core rendering pipeline.
  - `Camera.js`, `Scene.js`, `World.js`, `Game.js`, `GameObject.js`, `Component.js`, `Light.js`, `Time.js`, `SpriteManager.js` — engine/runtime primitives.
  - `math.js`, `noise.js`, `radixSort.js`, `palette.js`, `config.js` — math and shared utilities.
  - `src/primitives/` — mesh primitives (Ball, Box, Cone, Plane).
  - `src/components/` — attachable components (Transform, Mesh, Camera, Sprite/Path/Text renderers).
  - `src/shaders/` — Canvas2D "shader-like" polygon shading modes (avgFlat fill, flat shade, Gouraud shade, texture, fog) plus `shaderRegistry.js`.
  - `src/debug/` — debug visualization helpers (e.g. vertex/face normals).
- `examples/` — standalone demo apps (isometric-world, boxes, earth, cubes-2013 legacy), each with its own `main.js` and build, those are used to test sub3d manually.  
- `bench/` — perf benchmarks, excluded from `npm test`; currently empty.
- `dist/` — built output (`sub3d.js`), not hand-edited.

## Engine conventions (see README for full detail)

- **16-bit 5-6-5 color palette**: colors are quantized from `#RRGGBB` hex for a retro look (`palette.js`).
- Optimized code leveraging SIMD operations, target not just x86, but also ARM cpus.
- Prefer editing existing shaders/components over adding new abstractions; this is a small, performance-sensitive codebase — keep additions inline with the existing "shader-like per-polygon" style.
- Use existing patterns.
- **Structure for pluggability.** A new shader, primitive or component should slot in without the renderer learning about it — that is what `registerShader` and the `shaderType` key exist for. Do not grow monolithic code unless a measurement justifies it; when it does, say so in a comment.
- Follow industry standard of 3d renderers, keep things abstract, changes in examples/implementation shoudnt affect code inside engine. E.g. mesh generation code updates shouldnt introduce changes in renderer, if theres a real reason for that (e.g. bug in renderer) - raise a hand.

## Hot-loop rules

These apply to the render loop and anything it calls per frame, per object, per face or per vertex — `Canvas2dRenderer`, the shaders, `weld.js`, `radixSort.js`, culling and `destructMesh`.

- **Zero GC.** No objects, arrays, closures or string concatenation inside the loop. Reuse pre-allocated buffers for vectors, matrices and coordinate lists.
- **Typed arrays only.** Read, write and iterate over `Float32Array`/`Uint32Array`/`Int32Array`; a plain array or a `Map` in a per-face path is a bug. Size them for the worst case and grow lazily — grown-and-copied when a frame exceeds capacity, never shrunk and never reallocated per frame.
- **Keep function calls few, but do not inline everything.** Per-vertex math (dot products, transforms) is inlined rather than calling out to `math.js`. Major flow steps are still worth their own function — just keep those calls out of nested loops.
- **Fast path by default, slow path as the fallback.** Branch to the general case for edge cases only; never make the universal path the default just because it covers everything.
- **Precompute anything that is not per-frame.** The 5-6-5 palette, a mesh's adjacency and weld map, per-mesh normals — computed once and cached, not rebuilt per frame.
- **Clear with a generation counter, not by writing the array.** A stamp compared against the current generation retires a whole table in O(1); where a pass must leave a buffer clean, restore only the entries it touched.
- **Lay structured data out in lanes with named index constants.** One flat array, a `_STRIDE` constant and `SL_*`/`SD_*`-style offsets rather than one array per field. Keep the stride a power of two so indexing is a shift instead of a multiply.
- **Keep dispatch monomorphic.** Built-in shader keys go through a fixed `switch`; only consumer keys reach a registry lookup.
- **Own your state, and pass it explicitly.** A shader's scratch is module-private and the renderer knows nothing about it; state is handed in as an argument rather than captured in a closure, so one module can serve several passes at once.

Outside those paths — event handlers, the React debug UI, scene-graph setup, mesh generation — write ordinary readable code. Do not carry hot-loop discipline into places that run once.

## Documenting code

- **Every function gets a JSDoc block listing every argument**, with types, in signature order. A shared positional signature is declared once as a `@callback` typedef and referenced with `@type`, so thirty parameters cannot drift apart across the shaders that implement it.
- **Keep descriptions concise.** Say what the function does and the one thing a caller could otherwise get wrong. Do not restate the whole design, and do not write "see other-file.js for details" — a comment that needs a cross-reference to be understood is not finished. Name a collaborator only where the reader must go touch it too.
- **No archaeology.** Comments describe the code as it stands. Leave out the alternative that was tried, the question someone asked, and the discussion that settled it.
- **Business-logic-heavy functions get a short worked example** in the description — concrete inputs and what comes back.
- **An array holding structured data gets its layout drawn in a comment**, e.g. `[flagA, flagB, ...flagN, count]`, kept aligned so the shape is readable at a glance.
- **Where a decision was made on a measurement, record the number**, not the argument: "0.5px leaves the gap standing, 1px closes it" earns its line.

## Naming and constants

- Human-friendly names throughout: `rightEdge`, not `re`. Single letters are acceptable only for loop counters and for the standard math shorthands in inlined vector code (`nx`, `dot`, `invLen`).
- **Name every magic number.** Sentinels, lane offsets into a flat buffer, bitmask bits, palette keys and tuning thresholds each get a named `const` — `SL_STRIDE`, `CTX_STATE_FILL_PASS_FILL_STYLE_SLOT`, `EXPAND`, `COPLANAR_DOT`. Export it when a second module has to agree on the value rather than restating the literal.
- A bare literal does not just cost readability, it lets two meanings quietly share one value. `neighbourFaceBuffer` used `-1` for both "this mesh has no face across the edge" and "it has one, but it was culled" — opposite seam repairs — and the collision inflated every silhouette in the scene until `NO_MESH_NEIGHBOUR` and `NEIGHBOUR_NOT_DRAWN` pulled them apart. Give a sentinel a name and the next case that needs one is forced to declare itself.
- Loop bounds, `0`, `1`, and the identity elements of the maths are not magic and need no name.

## Style

- Prettier: 2-space indent, double quotes off (`singleQuote: false` → double quotes), semicolons on, trailing commas everywhere. Run through Prettier defaults in this repo, don't hand-format differently.
- LF line endings, final newline required (`.editorconfig`).
- ES modules (`"type": "module"`).
- Keeping diff lean for easier reviews.
- Push back and raise a hand noticing the task cannot be completed using precise changes, requiring major refactoring and leakign changes into otuside score of discussion or module, or file.

## Preparing a change

- **Bring the JSDoc of everything you touched up to date** — a new or removed argument means the block above it is now wrong, including the shared `ShaderFn` typedef when a shader signature changes.
- Run `npm test`, and run Prettier over the files you touched.
- Pointer-surgery code (ring merges, edge tables) needs an invariant test, not just a happy-path one; `src/shared/weld.test.js` walks every open ring after every face and found three bugs inspection had missed.
- Check whether an example's `main.js` needs the same change, and whether `src/main.js` needs a new export.

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
   - **Fog** (`fogPass`, `src/shaders/flatFog/fog.js`) — its own sort (`fogSort`, mirroring `radixSort`'s key order with a fog-bucket tie-break) and its own offscreen layer, composited back with `difference`/`multiply`/`lighter` blend steps depending on fog type. `prepareFog` admits only the flat fill keys (`ALBEDO_FLAT`, `TEXTURE`) and marks everything else skipped — a face it skips keeps the fog buffer's black background under it, which reads as *fully fogged*, so a new flat-family shaderKey has to be added to that filter or its meshes will render solid `fogColor`.

     **The pass decides for itself whether to run, and `fogPass` is the only way in.** It is a post-process over what fill and shade already drew, so nothing about that decision reaches them - which is why `fillTriangles` and `shadeTriangles` clear their own buffers unconditionally rather than relying on the fog composite to erase last frame. `prepareFog` walks the layer's faces once ahead of the sort, computes every fog amount exactly once into the pass's own module-private scratch for the sort and the raster to reuse, and returns three findings: whether anything is fogged at all; the union screen bounds of every not-fully-fogged face; and a per-face "do not draw" verdict. Nothing fogged means the buffer would come out uniformly white and composite back as the identity, so the whole pass is dropped - sort, raster and all three full-screen composites. The mirror case is dropped a different way: when *every* face is fully fogged the buffer would be black edge to edge, and `fill * 0 + fogColor` is flat `fogColor` everywhere including the sky - so the layer is filled with it directly and the sort, the raster and all four composite steps go too. Measured on a 1280x720 frame the composite alone is **0.2ms**, and the result is pixel-identical.
     A fully fogged face paints the buffer's own black, so it can only matter where something lighter got there first: one whose screen bounds miss that lit union is dropped whatever the draw order turns out to be, and when nothing is lit they all are. One rule stays at draw time in `batchedFogFace`, because it is the only one that needs the finished order - while nothing but the clear has been painted, a fully fogged face is black on black. Measured on isometric-world at 1280x720: **default view (nothing fogged) frame 1.8ms → 1.4ms** with the pass gone entirely; **thick fog, fog draw calls 99 → 58, fog raster 0.4ms → 0.1ms, frame 1.9ms → 1.5ms**, output pixel-identical. Moderate fog is untouched and identical - the lit union covers the screen, so nothing is droppable.
     Two differences remain on a dropped frame and both are improvements: covered pixels shift by ≤3/255 (the composite's own rounding, below the 5-6-5 step), and against open sky the silhouette rim stops being fogged twice, once through the layer background and again through the fog buffer's partial-coverage edge.
     **A screen occupancy grid was also built here and dropped.** It tracked per tile the one colour known to cover it, to drop faces repainting a colour already there. It worked and was pixel-exact, but never paid: fog-pass overdraw is 1.01x on isometric-world and 0.5x on boxes, an exact per-pixel oracle removes only 6.4-9.9% of faces, and a tile is claimable only where one triangle covers it whole - so a surface tessellated finer than a tile (14.4px median triangle against 8px tiles) claims nothing at any tile size. Claiming from the welder's merged polygon instead does not rescue it: the deferral guard only flushes on a colour *conflict*, so in the uniform-colour region where the claim is wanted the slot survives to the end of the pass and the claim always lands after the faces that needed it.

   - Toggling a pass off (`fillEnabled`/`shadeEnabled`/`fogEnabled`/`wireframe`/`debugNormals`/`debugAxis`) is renderer/viewport-wide, not a per-mesh setting — see the `Canvas2dViewport` getters/setters that forward to `Canvas2dRenderer`.
6. Each layer's fully-composited canvas is drawn onto `viewport.context` via `drawImage`, in layer order.

All scratch buffers used above (`depthBuffer`, `colorBuffer`, `clipGeometryBuffer`, etc.) are pre-allocated typed-array fields on `Canvas2dRenderer`, grown-and-copied only when a frame's face/vertex count exceeds current capacity, never shrunk or reallocated per-frame — the concrete mechanism behind "Zero GC" above.

**Every pass is painter's-algorithm, including the shade pass.** A face whose shader has nothing to contribute to a pass still has to paint the identity value there, or whatever an earlier face left behind shows through it. That is what `identityFill` (`whiteFillShade`) is for in the shade pass — white is the identity for `multiply`. Making it a no-op looks free and silently breaks any scene mixing shaded and unshaded meshes.

### Shader plugin contract

A mesh's `shaderType` (`src/components/MeshComponent.js`) selects a fill function and optional shade function. Values 0, 1, 2 and 4 are built-ins (`ALBEDO_FLAT`, `TEXTURE`, `EMISSIVE_FLAT`, `GOURAUD_SHADE` in `shaderRegistry.js`, also exported publicly as `scaliaEngine.ShaderType`; 3 is a retired key and 5 was never assigned, both left as holes because a built-in key is public API), reached via fixed switch statements inside both `fillTriangles` and `shadeTriangles`. Anything else is a consumer shader: call `registerShader(fillFn, shadeFn)` (`src/shaders/shaderRegistry.js`) once to obtain a key, then set that key as the mesh's `shaderType` — meshes hold only the numeric key, never a function reference. Fill/shade functions take a large fixed positional-argument list (screen-space and seam-expanded coordinates, clip-space geometry, color/normal buffers, vertex identities, the owning `mesh`, its mesh index, ambient light, the lights index buffer, fog params, the renderer's ctx/stats buffers, and a trailing `frameId`/`last` pair) — when adding a shader, match an existing one's exact signature rather than a subset of it, including the mesh-index and trailing params even if unused.

The renderer never owns or allocates any per-shader state. A shader that wants to persist something across faces (e.g. flat's triangle batching, below) declares its own module-level scratch array, private to its file, sized to whatever it needs — the renderer has no idea it exists. `frameId` increases once per `Canvas2dRenderer.render()` call (shared by every layer's fill/shade/fog pass that frame), letting a shader detect "my state predates the current frame, treat as empty" by comparing against a value it stored alongside that state — a defensive backstop, since correct operation means a shader's state is always already empty between uses (see `last` below). `last` arrives alongside a real face, never as a separate placeholder-only call, and means this is the last face of a contiguous run of this shaderKey (the next face uses a different shaderKey, or this is the final face in the pass): a shader handles the face normally first, then, if `last`, additionally flushes whatever's now pending before returning. A shader with nothing to persist needs no code for `last` at all — it's simply never referenced. See `registerShader`'s doc comment for the full contract.

### Textured fills

A textured face is drawn as an ordinary `fill()`, not a `clip()` + `drawImage()`. The UV→screen affine goes on the **context** and the path is built in **texture space**, filled with a `CanvasPattern`: a pattern lives in user space, user space is now texture space, so each texel lands where the map sends it. No clip, no `save`/`restore`, no `drawImage`. Put the matrix on the context and never on the pattern — a pattern's own matrix is far more expensive to record.

- Measured on the boxes example at load (4000 boxes, ~18.7k faces): fill pass 65.0 → 40.0 ms, whole frame 114.5 → 92.1 ms.
- The pattern is `repeat`, not `no-repeat`, and cached on the mesh (`texturePattern`, dropped by the `texture` setter). The seam-expanded ring reaches outside the face's UV rect, and a non-repeating pattern is transparent there — which would open the very gap the expansion exists to close. A texture with a transparent border will still leak; pad it.
- The context transform must be reset to the identity afterwards, and the flat shader's colour cache invalidated (`ctxStateBuffer[CTX_STATE_FILL_SLOT] = -1`), since a pattern is not a palette entry.

**Safari-specific pattern-fill gotchas**, found after migrating to pattern-based texture fill made Chrome/Firefox faster but dropped Safari (macOS and iOS) from a reported ~12fps to ~3fps:

- **Bake the pattern source, don't hand `createPattern` the live `<img>`.** `texturePatternSource` (`textureFill/textureWeld.js`) draws `mesh.textureImage` into an offscreen canvas once, the first time a mesh's `texturePattern` is built, and passes that canvas to `ctx.createPattern` instead of the image element — unconditionally, not just on Safari. Leading suspicion, not confirmed with a profiler trace: Chrome/Firefox convert an image's embedded colour profile once and cache the result, Safari re-applies it on every draw that references the image, and a pattern is referenced on every `fill()`. A canvas has no colour profile of its own, so baking once pays that conversion once instead. This fixed the reported regression back to "so much faster."
- **Keep `texturePatternSource` a plain function, not a mesh accessor.** An `Object.defineProperty` getter version was tried — same one-bake-per-texture-assignment caching, read from the exact same `if (!pattern)`-guarded call site, so no more or less often — and it measurably regressed Safari again. Also unconfirmed: the read happens once per mesh, which is too rare for per-call accessor overhead alone to plausibly explain a large frame-rate drop, so the more likely mechanism is that adding a new accessor to `Mesh.prototype` after instances already exist deoptimized the whole prototype's shape in JSC, not just that one property — knocking every per-face read of `mesh.textureImage`/`uvs`/`faces`/`shaderType` off its fast path too. Whichever it is, don't move this back onto the mesh without measuring on real Safari first.
- **`pattern.setTransform` is not a safe substitute for the context CTM on Safari, confirmed rather than suspected.** Putting the UV→screen affine on the pattern's own matrix instead of the context's (path built in screen space) was tried as a further Safari-perf attempt, on top of the "never on the pattern" line above (which is a Chrome/Firefox measurement and doesn't bind Safari). It doesn't just lose there — it renders *wrong*: a curved surface (a UV sphere, i.e. every triangle needing real rotation/shear in its own affine) showed long diagonal smears, consistent with Safari's `CanvasPattern.setTransform` dropping or mishandling the matrix's rotation/shear terms. Seen visually, not just measured; reverted.

Coplanar neighbours are merged before drawing, by `textureFill/textureWeld.js` — its own multi-slot welder rather than a generalisation of `shared/weld.js`, which merges by colour and emits in screen space. A box side's two triangles become one path, one transform, one fill, and the shared diagonal is never rasterised: the two independent affine maps that disagreed along it are replaced by one, so the crease and its seam both disappear.

A face joins a chart on three conditions, and each earns its place:

- **A shared edge**, matched on welded vertex identity through a directed-edge table.
- **A matching face normal.** This is the coplanarity requirement and it is *not* implied by the edge test — two perpendicular box sides share vertex identities as soon as a mesh is position-welded, and edge adjacency alone would fuse them under one nonsense map. A shared edge gives the faces a common point, and a common point plus a common normal is the same plane.
- **A surviving affine fit.** A plane's exact texture map is a homography and reduces to an affine only where w is constant, so merging coplanar faces is an approximation whose error grows with the chart. The chart's map is re-checked against every admitted face to within half a pixel, which stops a chart drifting as it grows.

Charts also carry the owning mesh and refuse a face from another one; identities are offset per mesh so it should not arise, but a chart paints with one mesh's texture and the invariant belongs where it is relied on. Two edges matching the same chart means the face fills a notch — the shared vertex becomes interior and is *removed*, not duplicated. Everything else refuses, which is correctness-neutral: the face seeds its own chart.

Deferral needs the same overlap guard as the flat welder: an incoming face flushes every open chart whose screen bounds meet its own, exempting the chart it is joining, since a coplanar edge-sharing neighbour cannot occlude it.

**Measured on boxes at load: 18209 → 17688 fill calls, frame time unchanged.** Only ~8.6% of textured faces merge there, and the reason is the `last` protocol — a run ends at every shaderKey change, and in a scene mixing textured and untextured meshes those runs are about one face long, so charts rarely survive to meet their neighbour. With the interleaving removed the merge rate goes to 22.6%, which is the size of the prize once deferral can survive a shader handover or the sort groups coplanar faces. A single-pending-face version was also built and measured: it captured nearly the same merges *on this scene* for less bookkeeping, but it only ever catches neighbours that arrive back to back, so it does not generalise and was dropped.

The `last` protocol is also what keeps a batching shader safe next to an immediate-mode one: a run ends before a different shaderKey draws, so nothing stays deferred across the handover. That is what lets `TEXTURE` be its own shader rather than a branch inside the flat one: a textured face needs its own `clip()` and transform and can never join a welded polygon, and the run boundary flushes the flat welder before it paints.

The cost of that split is paid in the shade pass, and is worth knowing before chasing draw calls there. `last` is keyed on the *shaderKey*, so every texture↔colour transition flushes the shade welder even though nothing about the shading changed. Measured on the boxes example (500 meshes, about half textured, same geometry either way), back when both keys shared one shade function and one weld state, that was 1561 shade draw calls against 1301 when every mesh carries one key — roughly 20%. `TEXTURE` now shades through `gouraudShaderShade` and `ALBEDO_FLAT` through `flatShaderShade`, so the two hold genuinely separate welders and keying `last` on the shade function would no longer recover it; sorting coplanar faces together, or a per-shade-state `last`, would.

### Triangle batching

All three flat passes (`avgFlatFill/avgFlatShader.js`, `flatShade/shade.js`, `flatFog/fog.js`) batch through the shared **multi-slot welder** in `src/shared/weld.js`. Each pass owns its own `createWeldState()` — they run over different colour spaces (albedo, lit intensity, fog level) and interleave in time, so they cannot share open polygons. `weld.js` carries the full reasoning; this is the orientation.

- **Welding** merges edge-adjacent same-colour triangles into one polygon boundary, cancelling the shared edge. Up to `N_SLOTS` (64) polygons stay open at once, so a face can merge with any of them rather than only with the face that came immediately before it — which is what makes the depth sort's interleaving survivable. Merge cases: extend by one vertex, close a notch (two edges of one ring, removing a vertex), or splice two rings together. Edge lookup is an open-addressed directed-edge table cleared in O(1) by a generation counter.
- **Adjacency is by vertex identity, not position** — `weldIdBuffer` above. Without the `weldMap` indirection a hard-edge mesh finds no shared edges at all, because each triangle owns private copies of its corners. The same identities drive `Mesh.computeAdjacency` (`src/components/MeshComponent.js`), which builds a mesh's static edge-neighbour table once at first draw; `destructMesh` resolves it into this frame's face indices as `neighbourFaceBuffer`, which is what the seam-ownership pass reads. Note the engine's own primitives never call `updateWeldMap()`, so they run on raw indices (isometric-world's terrain does call it) — fine where a generator already shares one index per position (Ball pairs 97% of its edges), weak where it does not (Box pairs 33%).
- **The deferral guard is an exact screen-overlap test.** Holding a polygon open paints it later than the sort placed it. Within one colour that is free (filling C over C is idempotent), so the guard flushes exactly the open slots whose colour differs *and* whose screen AABB meets the incoming face's. Flushing every slot on any colour change would also be sound but is self-defeating — a depth-sorted stream changes colour constantly, so no slot would survive to be merged into.
- **Seam repair grows the edges a face owns, and does it by adding vertices.** Canvas2D composites each fill's antialiased coverage separately, so two polygons sharing a boundary each cover about half the pixels along it and source-over of two half coverages is three quarters — a hairline of background shows through. A stroke in the fill colour repairs that but rasterises every boundary a second time; growing the boundary outward folds into vertices the fill already emits. On a repaired edge `a → b` the loop detours `a → a+n·w → b+n·w → b`: the original corners never move. Offsetting the edge lines and re-intersecting them at the corners instead — the obvious version — moves the vertices at *both* ends of every edge it touches, and those corners are shared with edges nobody asked to move, so silhouettes grow and the polygon pokes out from under the neighbour meant to cover the detour. It also needs a mitre limit, and the limit costs gap. Measured, adding vertices is the same op count and cost for a smaller gap and 2.4–27× less displaced outline. `EXPAND` is **1.0 px**, not 0.5: a pixel straddling the boundary needs the earlier polygon to cover *all* of it, and past 1 px nothing further changes.

- **Which edges grow is the whole trick.** Only edges whose neighbour is drawn *later* — `computeExpandMasks` (`src/shared/shaders.js`) decides that per pass from the draw order and hands each face a 3-bit `expandMask`. Growing an edge whose neighbour is already down moves the visible boundary instead of hiding a gap; growing a silhouette just makes the object half a pixel too big. Restricting to the *shared edge* is worth far more than restricting to the farther polygon — measured at 56–84× less displaced outline against 1.5×. An edge with no neighbour drawn this pass (mesh boundary, or a culled neighbour) grows anyway: abutting meshes are invisible to intra-mesh adjacency, and a chunk seam is worse than the half pixel it costs. The deferral guard's overlap test is dilated by twice the offset, since a flush now paints outside the geometry it was given and two regions that merely *abut* contend for the pixels between them.

- **Every flush emits one simple closed polygon**, never subpaths. A path holding many overlapping subpaths is one draw call but a much harder rasterization, since nonzero-winding fill has to resolve the union across all of them.
- **No `closePath()`, and no explicit closing `lineTo` either.** `fill()` closes the subpath implicitly and nothing strokes any more, so the closing edge needs no help. `closePath()` stays out regardless: it recomputes the whole path's bounds per call.
- **Collinear removal has to close around the wrap.** The emit walk starts at an arbitrary ring node and its first two points are emitted before any collinearity test is possible, so a vertex collinear across the seam survives unless both ends are re-tested against their true cyclic neighbours. The epsilon is small (0.05px) on purpose: dropping a vertex from a boundary shared with a differently-coloured region opens a hairline T-junction crack, because the neighbour still has a vertex there.

`src/shared/weld.test.js` covers the merge cases plus a ring-integrity fuzz that walks every open ring after every face; three real bugs were found that way that inspection had missed.

Firefox is the engine to measure on: it demotes an animated canvas to software rendering after a short warm-up, so it is both the slowest and the one whose cost model decides. A change that looks free in a Chromium-based preview can be a large regression there.

### Engine public API surface

`src/main.js` is a barrel export only — no engine logic of its own. It exposes the engine both as `window.scaliaEngine` and as the default export examples import via `import scaliaEngine from "sub3d"` (the npm-linked package from "Working with examples" above). A new public primitive, component, or shader needs an export added here too, or examples won't see it.
