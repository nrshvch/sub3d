# Subpar 3D Engine (sub3d)

*"Canvas can!"*

A custom software 3D game engine and renderer written in pure JavaScript. It renders 3D graphics using only a standard HTML5 Canvas 2D context.

---

## Project History & Motivation

I started this engine in 2013 as a hobby project to build my own classic SimCity/OpenTTD style game. While the game itself was never finished, and I left the project for a long time, I returned to it in late 2025 in the LLM era. It turned out to be a very fun project to continue developing.

My main motivation is self-education. I intentionally chose to limit the engine to Canvas 2D and avoid WebGL. This constraint makes the math visible, forces me to optimize the code, and lets me actually see the speed improvements from those optimizations.

As a nice side effect, this engine allows anyone without WebGL knowledge to build something sketchy, retro, and fun. You still get a lot of flexibility using a "shader-like" Canvas 2D approach to style polygons and add custom visual effects.

---

## Live Examples

- **[Isometric World](https://nrshvch.github.io/sub3d/examples/isometric-world/)**: A green terrain block with trees, fog, camera controls, and a dynamic day/night cycle.
- **[Boxes](https://nrshvch.github.io/sub3d/examples/boxes/)**: Real-time rendering of thousands of textured, rotating cubes.
- **[Earth](https://nrshvch.github.io/sub3d/examples/earth/)**: A 3D globe showing texture mapping on a sphere, complete with a render scale (DPR) slider.
- **[Cubes 2013 (Legacy)](https://nrshvch.github.io/sub3d/examples/cubes-2013/)**: A legacy demo from 2013 showing the original version of the engine (formerly named *scalia*) bundled with requirejs.

---

## Core Approach: The "Shader-Like" Rendering

Instead of using GPU shaders, `sub3d` processes every polygon on the CPU and draws it using Canvas 2D tools. 
Each polygon is rendered in a modular way:
- You can apply custom Canvas 2D properties (like gradients, clipping paths, blending modes, and opacity) to individual polygons.
- This creates a "shader-like" workflow where you can stylize meshes using standard, easy-to-understand 2D drawing code.

---

## High Performance & Optimization

Because rendering is done entirely on the CPU, optimization is highly critical. The engine uses several low-level optimizations:

### 1. Zero Garbage Collection (GC)
- The rendering loop allocates **zero** objects or arrays in the heap.
- All temporary variables, coordinate lists, and normal buffers use pre-allocated Typed Arrays (`Float32Array`, `Uint32Array`).
- This prevents GC pauses, resulting in smooth, lag-free rendering.

### 2. No Function Calls in Inner Loops
- Function calls have overhead in JavaScript. 
- In performance-critical sections (like vector operations and pixel math inside loops), all operations are written inline.
- Math operations (like dot products, matrix transforms, and vector updates) are written directly in the code to save CPU cycles.

---

## The Subpixel Seams Limitation & Solutions

A well-known limitation of HTML5 Canvas 2D is the appearance of **subpixel seams** (thin, bright gaps or lines between adjacent triangles). This happens because of anti-aliasing and floating-point rounding errors when rendering edges.

I fight these seams in two ways:
1. **Polygon Expansion**: The vertices of each triangle are pushed slightly outwards from the triangle's center before rendering. We use this approach in **Gouraud Shading**. Since Gouraud shading is already expensive, inflating the polygon directly during calculation saves CPU cycles compared to doing multiple passes.
2. **Stroke Outline**: In other shading modes (like Flat or Emissive), we draw the polygon and then immediately draw a thin `1px` outline (stroke) around it using the same color. This fills the gaps between adjacent faces.

---

## Engine Features

- **16-Bit 5-6-5 RGB Palette**: Colors are automatically converted to a quantized 16-bit format using `#RRGGBB` hex strings to give a retro PC look.
- **Affine Texture Mapping**: Textures are drawn onto triangles using 2D affine transforms.
- **Nearest-Neighbor Image Scaling**: Canvas context smoothing is disabled and CSS `image-rendering: pixelated` is applied globally to keep pixels sharp.
- **Unlit Fog System**: Supports Linear and Radial fog that fades objects into the background color at far distances.
- **CPU Culling**: Skips offscreen objects using camera-space bounding sphere checks (`roughCull`) and filters back-facing triangles using winding-order checks.

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
