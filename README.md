# Subpar 3D Engine (sub3d)

_"Canvas can!"_

A custom software 3D game engine and renderer written in pure JavaScript. It renders 3D graphics using only a standard HTML5 Canvas 2D context.

**Try it: [nrshvch.github.io/sub3d/examples](https://nrshvch.github.io/sub3d/examples)**

---

## Project History & Motivation

I started this engine in 2013 as a hobby project to build my own classic SimCity/OpenTTD style game. While the game itself was never finished, and I left the project for a long time, I returned to it in late 2025 in the LLM era. It turned out to be a very fun project to continue developing.

My main motivation is self-education. I intentionally chose to limit the engine to Canvas 2D and avoid WebGL. This constraint makes the math visible, forces me to optimize the code, and lets me actually see the speed improvements from those optimizations.

As a nice side effect, this engine allows anyone without WebGL knowledge to build something sketchy, retro, and fun. You still get a lot of flexibility using a "shader-like" Canvas 2D approach to style polygons and add custom visual effects.

---

## Live Examples

All demos are collected on the [examples landing page](https://nrshvch.github.io/sub3d/examples):

- **[Isometric World](https://nrshvch.github.io/sub3d/examples/isometric-world/)**: A green terrain block with trees, fog, camera controls, and a dynamic day/night cycle.
- **[Boxes](https://nrshvch.github.io/sub3d/examples/boxes/)**: Real-time rendering of thousands of textured, rotating cubes.
- **[Earth](https://nrshvch.github.io/sub3d/examples/earth/)**: A 3D globe showing texture mapping on a sphere, complete with a render scale (DPR) slider.
- **[Cubes 2013 (Legacy)](https://nrshvch.github.io/sub3d/examples/cubes-2013/)**: A legacy demo from 2013 showing the original version of the engine (formerly named _scalia_) bundled with requirejs.

---

## Core Approach: The "Shader-Like" Rendering

Instead of using GPU shaders, `sub3d` processes every polygon on the CPU and draws it using Canvas 2D tools.
Each polygon is rendered in a modular way:

- A mesh carries a numeric `shaderType` key. Keys 0-4 are built in (flat albedo, texture, emissive, averaged flat, Gouraud); your own comes from `registerShader(fillFn, shadeFn)`, so a custom shader slots in without the renderer learning about it.
- A shader is a plain function handed the face's screen coordinates, camera-space geometry, normals, colors and lights — it can apply any Canvas 2D property (gradients, patterns, blending modes, opacity) to that one polygon.
- This creates a "shader-like" workflow where you can stylize meshes using standard, easy-to-understand 2D drawing code.

---

## The Deferred Rendering Pipeline

Rendering is **deferred**: a frame is not "draw each polygon finished". Albedo, lighting and fog are three separate images, each rasterized on its own offscreen canvas and composited at the end. A fill shader only has to answer "what colour is this surface", and lighting is resolved once for the whole scene rather than inside every shader that wants to be lit.

Per frame, per layer:

1. **Retrieve & cull** — the scene graph is flattened into one array, then reduced twice: `roughCull` tests each object's bounding sphere against the frustum planes (Gribb-Hartmann), `exactCull` tests its AABB with Cohen-Sutherland outcodes.
2. **Destruct** — visible meshes are flattened into per-face buffers: clip-space transform, trivial rejection, perspective divide, back-face culling by winding order, viewport mapping, plus per-face normals, colors and edge adjacency.
3. **Depth sort** — Canvas 2D has no z-buffer, so correctness rests entirely on the painter's algorithm. A 4-pass stable radix sort orders faces back-to-front by `[depth, mesh index, shader pass]` in linear time with zero allocation.
4. **Fill pass** — base colour or texture, onto the layer's own canvas.
5. **Shade pass** — lighting only, rasterized as a separate intensity image, then composited onto the fill with `globalCompositeOperation = "multiply"`. Because it is painter's-algorithm too, a face with nothing to shade still paints white (the identity for `multiply`) rather than skipping.
6. **Fog pass** — its own sort, its own image and its own composite. It is a post-process over what the two passes above produced, and decides for itself whether it has anything to contribute: a frame with nothing fogged skips the pass entirely, and a frame that is fogged edge to edge is filled with the fog colour directly.
7. The finished layer is drawn onto the visible canvas.

Splitting lighting out of the fill shaders is what makes smooth shading affordable here: Gouraud shading is a _shade-pass_ shader that merges faces sharing one lighting field into a single gradient fill, over whatever albedo the fill pass happened to draw.

---

## High Performance & Optimization

Because rendering is done entirely on the CPU, optimization is highly critical. The engine uses several low-level optimizations:

### 1. Zero Garbage Collection (GC)

- The rendering loop allocates **zero** objects, arrays, closures or strings in the heap.
- All temporary variables, coordinate lists, and normal buffers use pre-allocated Typed Arrays (`Float32Array`, `Uint32Array`, `Int32Array`), sized for the worst case, grown and copied when a frame exceeds capacity — never shrunk, never reallocated per frame.
- Tables are retired with a generation counter instead of being cleared, so a whole frame's worth of state goes away in O(1).
- This prevents GC pauses, resulting in smooth, lag-free rendering.

### 2. Inlined Math in the Inner Loops

- Function calls have overhead in JavaScript, so per-vertex math (dot products, matrix transforms, vector updates) is written inline instead of calling out to `math.js`.
- That stops at the inner loops: major flow steps stay ordinary functions. Outside the render loop — scene setup, mesh generation, the debug UI — the code is written to be read.
- Shader dispatch is kept monomorphic: built-in keys go through a fixed `switch`, only consumer keys reach a registry lookup.

### 3. Triangle Batching

- Adjacent triangles of the same colour are welded into one polygon boundary, cancelling the shared edge, so a run of same-coloured faces becomes a single `fill()` instead of dozens.
- Up to 64 polygons stay open at once, which is what lets batching survive the depth sort interleaving faces from different meshes.
- Coplanar textured faces merge the same way, into charts sharing one affine map — a box side's two triangles become one path, one transform, one fill, and the diagonal between them is never rasterized.

---

## The Subpixel Seams Limitation & Solutions

A well-known limitation of HTML5 Canvas 2D is the appearance of **subpixel seams** (thin, bright gaps or lines between adjacent triangles). Canvas composites each fill's anti-aliased coverage separately, so two polygons sharing a boundary each cover about half the pixels along it — and source-over of two half coverages is three quarters, leaving a hairline of background showing through.

I fight these seams in two ways:

1. **Polygon Expansion** (the batched passes — flat, texture, Gouraud shade, fog). Each drawn boundary is grown outward by `1px`, not by moving the existing corners but by _adding_ vertices: an edge `a → b` is emitted as `a → a+n·w → b+n·w → b`, so the original corners stay put and neighbouring edges nobody asked to move are unaffected. Crucially, a face only grows the edges it _owns_ — those whose neighbour is drawn later in the pass. Growing an edge whose neighbour is already down would move the visible boundary, and growing a silhouette would just make the object too big.
2. **Stroke Outline** (the immediate-mode path, e.g. the averaged-flat shader). A face drawn on its own has no knowledge of the draw order and so cannot decide which edges it owns; there it is stroked `1px` in its own fill colour right after being filled.

---

## Engine Features

- **16-Bit 5-6-5 RGB Palette**: Colors are automatically converted to a quantized 16-bit format using `#RRGGBB` hex strings to give a retro PC look. The palette is precomputed once, and shaders dedupe context state against it so a run of same-coloured faces sets `fillStyle` once.
- **Affine Texture Mapping**: A textured face is drawn as an ordinary `fill()`, not `clip()` + `drawImage()`: the UV→screen affine goes on the _context_, the path is built in _texture space_, and a `CanvasPattern` does the rest.
- **Deferred Lighting**: Ambient light plus directional lights, resolved in the shade pass — flat per face, or Gouraud interpolated per vertex via gradient fills.
- **Fog As Its Own Pass**: `LINEAR`, `RADIAL` and `RADIAL_FAST` fog fade faces into the camera's fog colour with distance, composited over the already-lit image and skipped outright on frames where it would change nothing.
- **Nearest-Neighbor Image Scaling**: Canvas context smoothing is disabled on the visible canvas and on every offscreen layer to keep pixels sharp.
- **CPU Culling**: Bounding-sphere frustum rejection (`roughCull`), then AABB outcode rejection (`exactCull`), then clip-space trivial rejection and back-face winding checks per face.
- **Render Layers**: Geometry can be partitioned into independent layers (`config.layersCount`), each with its own fill/shade/fog canvases and its own sort, composited in order.

---

## Development commands

The project uses **Vite** to run and build.

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build the production bundle (saves in dist/sub3d.js)
npm run build
```
