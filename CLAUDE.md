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
4. **Sort** — `radixSort` (`src/radixSort.js`, 4-pass stable counting sort) orders faces back-to-front by `[depth band, fill key, depth fine]`. Canvas2D has no z-buffer, so correctness depends entirely on this painter's-algorithm ordering — but only the *band* carries occlusion information. The **fill key** is an opaque 8-bit per-face value the owning shader supplies (`fillKeyRegistry`, see below) meaning "these faces produce identical fill output": since filling color C over color C is idempotent, such faces are order-interchangeable in the fill pass whether or not they overlap, so sorting on the key above fine depth groups them into long same-appearance runs the batchers can collapse. `config.depthBands` (default 65536 = one band per exact depth = no reordering license) sizes that trade. The four-pass count is load-bearing: an odd number would leave the result in `tempIndexBuffer`, which the renderer reuses as `fogSort`'s output.
5. **Three draw passes**, each onto its own offscreen canvas per layer (`viewport.layers[i]` / `.shadeLayers[i]` / `.fogLayers[i]`):
   - **Fill** (`drawTriangles`) — base color or affine-texture-mapped fill, dispatched per-face on `mesh.shaderType` (0-4 are built-ins in a fixed switch for JIT monomorphism; 5+ are consumer shaders from `registerShader`, see below). Returns a bitmask (`NEEDS_SHADE_PASS`/`NEEDS_FOG_PASS`) gating whether the next two passes run at all for this layer this frame.
   - **Shade** (`shadeTriangles`) — deferred lighting, rendered as its own intensity layer, then composited onto the fill layer via `globalCompositeOperation = "multiply"`. This is the "deferred" part: lighting is resolved once as a separate image rather than computed inline per fill-shader.
   - **Fog** (`fogTriangles`, `src/shaders/flatShader/fog/fog.js`) — its own sort (`fogSort`, mirrors `radixSort`'s key order with a fog-bucket tie-break) and its own offscreen layer, composited back with `difference`/`multiply`/`lighter` blend steps depending on fog type.
   - Toggling a pass off (`fillEnabled`/`shadeEnabled`/`fogEnabled`/`wireframe`/`debugNormals`/`debugAxis`) is renderer/viewport-wide, not a per-mesh setting — see the `Canvas2dViewport` getters/setters that forward to `Canvas2dRenderer`.
6. Each layer's fully-composited canvas is drawn onto `viewport.context` via `drawImage`, in layer order.

All scratch buffers used above (`depthBuffer`, `colorBuffer`, `clipGeometryBuffer`, etc.) are pre-allocated typed-array fields on `Canvas2dRenderer`, grown-and-copied only when a frame's face/vertex count exceeds current capacity, never shrunk or reallocated per-frame — the concrete mechanism behind "Zero GC" above.

### Shader plugin contract

A mesh's `shaderType` (`src/components/MeshComponent.js`) selects a fill function and optional shade function. Values 0-4 are built-ins (`src/shaders/*.js`), reached via fixed switch statements inside both `drawTriangles` and `shadeTriangles`. Anything else is a consumer shader: call `registerShader(fillFn, shadeFn, fillKeyFn)` (`src/shaders/shaderRegistry.js`) once to obtain a key, then set that key as the mesh's `shaderType` — meshes hold only the numeric key, never a function reference. Fill/shade functions take a large fixed positional-argument list (screen-space and seam-expanded coordinates, clip-space geometry, color/normal buffers, vertex identities, the owning `mesh`, its mesh index, ambient light, the lights index buffer, fog params, the renderer's ctx/stats buffers, and a trailing `frameId`/`last` pair) — when adding a shader, match an existing one's exact signature rather than a subset of it, including the mesh-index and trailing params even if unused.

The renderer never owns or allocates any per-shader state. A shader that wants to persist something across faces (e.g. flat's triangle batching, below) declares its own module-level scratch array, private to its file, sized to whatever it needs — the renderer has no idea it exists. `frameId` increases once per `Canvas2dRenderer.render()` call (shared by every layer's fill/shade/fog pass that frame), letting a shader detect "my state predates the current frame, treat as empty" by comparing against a value it stored alongside that state — a defensive backstop, since correct operation means a shader's state is always already empty between uses (see `last` below). `last` arrives alongside a real face, never as a separate placeholder-only call, and means this is the last face of a contiguous run of this shaderKey (the next face uses a different shaderKey, or this is the final face in the pass): a shader handles the face normally first, then, if `last`, additionally flushes whatever's now pending before returning. A shader with nothing to persist needs no code for `last` at all - it's simply never referenced. See `registerShader`'s doc comment for the full contract.

### Triangle batching

All three flat passes (`flatFill/flatShader.js`, `flatShade/shade.js`, `flatFog/fog.js`) batch
through the shared **multi-slot welder** in `src/shared/weld.js`. Each pass owns its own
`createWeldState()` — they run over different colour spaces (albedo, lit intensity, fog level) and
interleave in time, so they cannot share open polygons.

- **Welding** merges edge-adjacent same-colour triangles into one polygon boundary, cancelling the
  shared edge. Up to 64 polygons stay open at once, so a face can merge with any of them rather
  than only with the face that came immediately before it — which is what makes the depth sort's
  interleaving survivable. Merge cases: extend by one vertex, close a notch (two edges of one ring,
  removing a vertex), or splice two rings together. Edge lookup is an open-addressed directed-edge
  table cleared in O(1) by a generation counter.
- **Face adjacency (`Mesh.computeAdjacency`) is built once per mesh and reused by all three passes.**
  `adjTri[3t+e]` / `adjEdge[3t+e]` give the triangle sharing edge `e` of triangle `t`, or -1. It is
  computed over **welded** identities — without that it finds nothing on a hard-edge mesh, where
  every triangle owns private copies of its vertices (`boundaryEdges` 6 vs 4 on a two-triangle quad).
  Geometry is static, so `destructMesh` builds it lazily on first sight; a mesh that rebuilds its
  geometry must call `updateAdjacency()` itself, exactly as it already must for `updateWeldMap()` —
  `TileGroup.js` does both. Its only consumer today is seam-repair ownership (below). Using it to
  replace the runtime edge hash as well was measured at only **0.68 ms/frame**
  (`bench/weld/edgetable.mjs`, 0.98 → 0.30 at 22k faces), too thin to justify swapping out a
  working, fuzz-tested structure — so the hash stays.
- **The deferral guard is an exact screen-overlap test**, and it is where most of the speed is.
  Within one colour deferral is free (filling C over C is idempotent); what it can break is a
  differently-coloured face that should have painted over a polygon still held open. So an incoming
  face flushes exactly the open slots whose colour differs *and* whose screen AABB meets its own —
  a straight scan of all 64 slots, five compares each. Sound by construction: for any violating
  pair (near N, far F, different colours, overlapping) either F's slot already flushed, or it holds
  F's bounds, which therefore meet N's, so it is flushed before N is placed.
  The version this replaced flushed *every* slot on any colour change. That is also sound and costs
  one integer compare, but it is why slot count did not matter: a depth-sorted stream changes colour
  constantly, so nothing survived to be merged into — at 1024 slots it produced the identical 6867
  fill calls as at 32. Measured on the horizon view, the overlap test takes fill from 6867 calls to
  3605 (floor: 555 connected same-colour components) and the frame from 32.2 ms to 23.1 ms.
  Iterating the free-mask bits instead of scanning all 64 slots measured *slower* (25.3 vs 23.2 ms) —
  occupancy is high, and the colour test rejects a free slot just as cheaply.
- **Collinear removal must close around the wrap.** The emit walk starts at an arbitrary ring node
  and its first two points are emitted before any collinearity test is possible, so a vertex that is
  collinear across the seam survives — up to two per polygon, on every polygon. After the forward
  pass both ends are re-tested against their true cyclic neighbours (the head is dropped by
  advancing a `start` index, not by shifting the buffer). `weld.test.js` pins this with an
  out-of-order strip that must come out as a 4-corner rectangle.
- **Seam repair is an outward edge offset, not a stroke.** Canvas2D composites each fill's
  antialiased coverage separately, so two polygons sharing a boundary each cover ~50% of the pixels
  along it and source-over of two 50% coverages is 75% — a hairline of background shows through.
  A `stroke()` in the fill colour repairs it, and cost **17% of the frame** (24.05 ms with, 20.00 ms
  with every `stroke()` no-op'd, `NOSTROKE=1 bench/firefox/frame.mjs`). Offsetting the boundary
  outward by `EXPAND` = 0.5px repairs it for free instead, because it folds into vertices the fill
  already emits. Measured: **24.05 ms → 20.2 ms**, and it is *better* looking, not a trade.
- **Two seam-repair modes, selected by `SEAM_OWNERSHIP` in `shared/shaders.js`.** Both push
  boundary edges outward by `EXPAND` at flush; they differ in *which* edges, and the right `EXPAND`
  differs with them.
  - **off (shipping)** — every edge expands. No adjacency, no ranks, no per-frame resolve; the
    renderer skips all of it. Both sides of a shared boundary grow into each other so the later one
    wins and the boundary is displaced by `EXPAND` — the same failure a centred stroke has, which is
    why `EXPAND` is **0.5** here, matching what a 1px stroke spilled past the boundary.
  - **on** — only the EARLIER-drawn side expands, so the later one paints its true coverage on top:
    `0.5*near + 0.5*far`, the correct blend, boundary undisplaced, foreground never bloated. That is
    what lets `EXPAND` be larger (0.75-0.8) without bloating anything. `computeExpandMasks` does it
    per pass — fog sorts separately from fill, so the orders differ — in three linear walks of the
    pass's own index list: write ranks, resolve ownership, clear ranks.
  - Measured, RMSE against a 2x supersampled reference / share of pixels more than 48 levels off:
    stroke at lineWidth 1 **3.55 / 0.317%**; expand-all at 0.75 **4.41 / 0.412%**; expand-all at 0.5
    **2.95 / 0.159%**; ownership at 0.75 **2.83 / 0.075%**. So expand-all at 0.5 already beats the
    stroke it replaced, and ownership buys a further 2x on worst-case pixels for ~5% of frame time.
    Getting `EXPAND` wrong for the mode costs more than the mode choice does.
- **An edge whose neighbour resolves to -1 always expands** (ownership mode only). It covers two
  cases that cannot be told apart cheaply: a face on its mesh's boundary, whose real neighbour lives
  in another mesh and is invisible to intra-mesh adjacency; and a neighbour culled this frame. The
  first is load-bearing — two abutting terrain chunks each see -1, and treating that as "silhouette,
  leave it" puts a bright hairline along every chunk seam, which is exactly what the first run of
  this looked like. The second costs only a half-pixel of silhouette bloat.
- **Each vertex is the intersection of its two edge lines, never a bisector offset.** When only one
  of the two edges moves, the vertex has to slide *along* the edge that stayed put; a bisector lifts
  it off that line and overlaps whichever neighbour owns that seam. Near-hairpin corners send the
  exact miter to infinity, so the vertex shift is clamped to `MAX_SHIFT` — which is also what stops
  a sub-pixel sliver from turning inside out. The outward direction is known a priori and constant:
  `destructMesh` culls on `cross_ndc > 0` and screen y is negated, so screen-space area is
  non-negative for every surviving face and `n = (ey, -ex)` points outward. Deriving it from the
  polygon's signed area instead was one of the two bugs that sank the earlier attempts — a merged
  ring is not guaranteed simple, and a squashed one gets its sign from rounding noise.
- **Measured against the stroke it replaced**, same welder, same scene: frame **24.05 → 20.2 ms**;
  row-to-row difference on near-flat ground at a grazing angle (`bench/firefox/banding.mjs`, the
  metric that caught the first attempt at **6.607** against 3.429 stroked) now **0.400 against
  3.358** — far smoother, because the 1px stroke was itself drawing a hard band along every
  boundary; RMSE against a 2x supersampled reference 3.55 → 3.98, but grossly-wrong pixels **halve**,
  0.317% → 0.159%.
- **A run of collinear vertices only collapses when its edges agree on ownership.** One offset has
  to serve the whole run, so merging an offset edge with a non-offset one would either open a seam
  or bloat a silhouette.
- **The deferral guard is dilated by `2 * EXPAND`.** A flush paints up to `EXPAND` outside the
  geometry it was given, so two differently-coloured regions that merely abut contend for the pixels
  along their shared edge while overlapping by exactly zero — a guard written on raw geometry keeps
  both open, and whichever flushes last paints over the other's edge for the whole length of the
  boundary. Only the conflict test is dilated; the slot's stored AABB stays exact, so the slack
  cannot compound as a polygon grows. (This was written for the stroke's half-width and had to be
  restored when the exact-overlap guard replaced the colour-change one.)
- **Stroking only the far side of each seam was measured and rejected** — the same ownership idea,
  but applied to strokes rather than offsets. Per-polygon it is nearly useless: only **2.6%** of
  faces have all their neighbours already drawn, because adjacent faces have near-equal depth and
  the sort is essentially exact, so a face is last among its neighbours only at a local depth
  maximum. Per-edge it needs a second path of open polylines, and stroke is priced per path — the
  guide measures that at +3-5%. Offsetting has neither problem, which is why it wins.
- **Every flush emits one simple closed polygon**, never subpaths. A path holding many overlapping
  subpaths is one draw call but a much harder rasterization: profiling put 36% of a frame inside a
  single such `fill()`. Collinear vertices are dropped at flush with a 0.05px epsilon — larger
  values open T-junction cracks against neighbours that still have a vertex there.
- **Never `closePath()`** — `fill()` closes subpaths implicitly, and in Blink `closePath()`
  recomputes the whole path's bounds per call, which is O(N²) in subpaths per path.

The one hazard: the flat fill shader's textured branch calls `ctx.beginPath()+clip()` under the
same shaderKey, so it drains every open slot first — a textured face must paint after everything
deferred that it may overlap. `src/shared/weld.test.js` covers the merge cases plus a ring-integrity
fuzz that walks every open ring after every face; three real bugs were found that way that
inspection had missed.

`bench/firefox/` measures this in real Firefox. **Use `frame.mjs`** — it samples the app's own rAF
cadence and does not render a second time per frame the way `measure.mjs` does, and it takes
`HEADED=1` (the GPU raster path — headless rasterises canvas in software, a different cost model
entirely for non-convex paths), `PASSES=fill|shade|fog`, and `W`/`H`. `measure.mjs` times
`render()` in a tight loop with no presentation, `fps.mjs` reads rAF deltas but saturates at the
vsync cap, and `rmse.mjs` sweeps `lineWidth` against a supersampled reference. Note that frame
times quantise to the vsync interval, so read `mean` over many frames and raise `W`/`H` until the
frame costs several intervals before believing a small difference — Firefox demotes an animated canvas to software rendering after ~10-20
frames, so it is the engine that matters, and the in-app Chromium preview will mislead you.

### Engine public API surface

`src/main.js` is a barrel export only — no engine logic of its own. It exposes the engine both as `window.scaliaEngine` and as the default export examples import via `import scaliaEngine from "sub3d"` (the npm-linked package from "Working with examples" above). A new public primitive, component, or shader needs an export added here too, or examples won't see it.
