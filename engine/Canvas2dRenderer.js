import config from "./config.js";
import MeshComponent from "./components/MeshComponent.js";
import CameraComponent from "./components/CameraComponent.js";
import * as math from "./math.js";
import * as palette from "./palette.js";
import * as debug from "./debug.js";

const vec3TransformMat4 = math.vec3TransformMat4;
const vec4TransformMat4 = math.vec4TransformMat4;
const mat4Mul = math.mat4Mul;
const renderAxis = debug.renderAxis;

const PALETTE_16BIT = palette.createPalette16Bit();

export default function Canvas2dRenderer() {
  this.layerBuffers = [];

  this.drawCalls = 0;
  this.faces = 0;

  this.lightDirection = new Float32Array([0, 0, 0]);

  this.depthBuffer = new Float32Array(0);
  this.indexBuffer = new Uint32Array(0);
  this.clipGeometryBuffer = new Float32Array(0);
  this.color16Buffer = new Uint16Array(0);
  this.colorBuffer = new Uint32Array(0);
  this.faceNormalsBuffer = new Float32Array(0);
  this.typeBuffer = new Uint8Array(0);
  this.visibleObjectsBuffer = new Uint32Array(100);
  this.layerBuffers = [];
  this.layerBufferLengths = new Uint32Array(1);

  this.vertexBuffer = new Float32Array(0);
  this.vertexIndexBuffer = new Uint32Array(0);

  // move outside render
  // initialize layer buffers
  for (let i = 0; i < config.layersCount; i++) {
    this.layerBuffers[i] = this.layerBuffers[i] || [];
  }

  this.vMapping = new Int32Array(0);
  this.vTags = new Uint32Array(0);
}

var p = Canvas2dRenderer.prototype;

p.vec3Cache1 = new Float32Array([0, 0, 0]);
p.vec3Cache2 = new Float32Array([0, 0, 0]);
p.vec4Cache = new Float32Array([0, 0, 0]);
p.mat4Scratchpad1 = new Float32Array(16);
p.mat4Scratchpad2 = new Float32Array(16);
p.mat3Scratchpad1 = new Float32Array(9);

p.render = function (camera, viewport, stats) {
  let t0 = Date.now();

  let gameObjects = camera.scene.retrieve(camera),
    layersCount = config.layersCount,
    vw = viewport.width,
    vh = viewport.height,
    renderer,
    renderers,
    renderersCount,
    i,
    j,
    ctx,
    vec3Cache1 = this.vec3Cache1,
    vec3Cache2 = this.vec3Cache2,
    vec4Cache = this.vec4Cache,
    depthBuffer = this.depthBuffer,
    indexBuffer = this.indexBuffer,
    vertexIndexBuffer = this.vertexIndexBuffer,
    vertexBuffer = this.vertexBuffer,
    clipGeometryBuffer = this.clipGeometryBuffer,
    color16Buffer = this.color16Buffer,
    colorBuffer = this.colorBuffer,
    faceNormalsBuffer = this.faceNormalsBuffer,
    typeBuffer = this.typeBuffer,
    visibleObjectsBuffer = this.visibleObjectsBuffer,
    layerBuffers = this.layerBuffers,
    layerBufferLengths = this.layerBufferLengths,
    mat4Scratchpad1 = this.mat4Scratchpad1,
    mat4Scratchpad2 = this.mat4Scratchpad2,
    worldToScreenMatrix = viewport.getWorldToScreen(),
    cameraLocalMatrix = camera.transform.getWorldToLocal(),
    clipSpaceMatrix = camera.camera.getClipSpaceMatrix(),
    vMapping = this.vMapping,
    vTags = this.vTags;

  let drawCalls = 0;
  let faces = 0;

  if (camera.camera.fogType !== CameraComponent.FogType.NONE) {
    const cam = camera.camera;

    // 1. Quantize 8-bit to 5-6-5 bits
    const qr = cam.fogColor[0] & 0xf8; // Keep 5 bits
    const qg = cam.fogColor[1] & 0xfc; // Keep 6 bits
    const qb = cam.fogColor[2] & 0xf8; // Keep 5 bits

    // 2. Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
    const key = (qr << 8) | (qg << 3) | (qb >> 3);

    viewport.context.fillStyle = PALETTE_16BIT[key];
    viewport.context.fillRect(0, 0, viewport.width, viewport.height);
  }

  if (visibleObjectsBuffer.length < gameObjects.length) {
    const _visibleObjectsBuffer = visibleObjectsBuffer;
    this.visibleObjectsBuffer = visibleObjectsBuffer = new Uint32Array(
      gameObjects.length,
    );
    visibleObjectsBuffer.set(_visibleObjectsBuffer);
  }

  const firstPassVisibleObjectsBufferLen = roughCull(
    gameObjects,
    clipSpaceMatrix,
    visibleObjectsBuffer,
  );

  const visibleObjectsBufferLen = exactCull(
    visibleObjectsBuffer,
    firstPassVisibleObjectsBufferLen,
    gameObjects,
    clipSpaceMatrix,
  );

  if (layerBufferLengths.length < layersCount) {
    var _layerBufferLengths = layerBufferLengths;
    this.layerBufferLengths = layerBufferLengths = new Uint32Array(layersCount);
    layerBufferLengths.set(_layerBufferLengths);
  }

  // group visible object to layer buffers
  for (i = 0; i < visibleObjectsBufferLen; i++) {
    const go = gameObjects[visibleObjectsBuffer[i]];
    if (go.meshRenderer) {
      const renderer = go.meshRenderer;
      const layer = renderer.layer;
      layerBuffers[layer][layerBufferLengths[layer]++] = renderer;
    }
  }

  // render layer one-by-one
  for (i = 0; i < layersCount; i++) {
    ctx = viewport.layers[i];

    renderers = layerBuffers[i];
    renderersCount = layerBufferLengths[i];

    let maxFacesCount = 0;
    let maxVertsCount = 0;
    for (let o = 0; o < renderersCount; o++) {
      maxFacesCount += renderers[o].faces.length;
      const vertexCount = renderers[o].vertices.length;
      if (vertexCount > maxVertsCount) maxVertsCount = vertexCount;
    }
    maxFacesCount = (maxFacesCount / 3) | 0;

    const maxIndexCount = (maxVertsCount / 3) | 0;
    if (this.vMapping.length < maxIndexCount) {
      this.vMapping = vMapping = new Int32Array(maxIndexCount);
      this.vTags = vTags = new Uint32Array(maxIndexCount);
    }

    if (vec3Cache1.length < maxVertsCount) {
      this.vec3Cache1 = vec3Cache1 = new Float32Array(maxVertsCount);
      this.vec3Cache2 = vec3Cache2 = new Float32Array(maxVertsCount);
      this.vec4Cache = vec4Cache = new Float32Array((maxVertsCount * 4) / 3);
    }

    if (depthBuffer.length < maxFacesCount) {
      let newArr = new Float32Array(maxFacesCount);
      newArr.set(depthBuffer);
      this.depthBuffer = depthBuffer = newArr;

      newArr = new Uint32Array(maxFacesCount);
      newArr.set(indexBuffer);
      this.indexBuffer = indexBuffer = newArr;

      newArr = new Uint8Array(maxFacesCount);
      newArr.set(typeBuffer);
      this.typeBuffer = typeBuffer = newArr;

      newArr = new Uint32Array(maxFacesCount);
      newArr.set(colorBuffer);
      this.colorBuffer = colorBuffer = newArr;

      newArr = new Uint16Array(maxFacesCount);
      newArr.set(color16Buffer);
      this.color16Buffer = color16Buffer = newArr;

      newArr = new Float32Array(maxFacesCount * 9);
      newArr.set(clipGeometryBuffer);
      this.clipGeometryBuffer = clipGeometryBuffer = newArr;

      newArr = new Float32Array(maxFacesCount * 3);
      newArr.set(faceNormalsBuffer);
      this.faceNormalsBuffer = faceNormalsBuffer = newArr;

      let _vertexBuffer = new Float32Array(maxFacesCount * 9);
      _vertexBuffer.set(vertexBuffer);
      this.vertexBuffer = vertexBuffer = _vertexBuffer;

      let _vertexIndexBuffer = new Uint32Array(maxFacesCount * 3);
      _vertexIndexBuffer.set(vertexIndexBuffer);
      this.vertexIndexBuffer = vertexIndexBuffer = _vertexIndexBuffer;
    }

    const l = destructMesh(
      renderers,
      renderersCount,
      vec3Cache2,
      vec4Cache,
      indexBuffer,
      depthBuffer,
      colorBuffer,
      clipGeometryBuffer,
      cameraLocalMatrix,
      clipSpaceMatrix,
      mat4Scratchpad2,
      mat4Scratchpad1,
      this.mat3Scratchpad1,
      faceNormalsBuffer,
      vertexBuffer,
      vertexIndexBuffer,
      this.vMapping,
      this.vTags,
    );

    calcLight(
      l,
      colorBuffer,
      camera.scene,
      this.lightDirection,
      camera.camera.ambientLight,
      faceNormalsBuffer,
    );

    calcFog(
      l,
      clipGeometryBuffer,
      colorBuffer,
      depthBuffer,
      camera.camera.fogType,
      camera.camera.fogColor,
      camera.camera.fogNearPane,
      camera.camera.fogFarPane,
    );

    quantizeFaceColors(indexBuffer, l, colorBuffer, color16Buffer);

    if ((config.depthSortingMask & (i + 1)) === i + 1) {
      indexBuffer.subarray(0, l).sort(function (a, b) {
        return depthBuffer[b] - depthBuffer[a];
      });
    }

    if (this.wireframe) {
      drawWireframe(
        ctx,
        vertexBuffer,
        vertexIndexBuffer,
        indexBuffer,
        l,
        0,
        vw,
        vh,
      );
    } else {
      const toStroke = (config.layerStrokeMask & (i + 1)) === i + 1;
      const toClear = (config.layerClearMask & (i + 1)) === i + 1;

      drawTriangles(
        ctx,
        vertexBuffer,
        vertexIndexBuffer,
        indexBuffer,
        color16Buffer,
        l,
        0,
        toStroke,
        toClear,
        vw,
        vh,
      );
    }

    for (j = 0; j < renderersCount; j++) {
      renderer = renderers[j];
      // Only draw axes for objects with a transform (usually MeshComponents)
      if (renderer.gameObject && renderer.gameObject.debug) {
        renderAxis(renderer.gameObject, ctx, worldToScreenMatrix, vec3Cache1);
      }
    }

    // renderDebugNormals(ctx, l, geometryBuffer, faceNormalsBuffer, 10);

    viewport.context.drawImage(ctx.canvas, 0, 0);

    drawCalls += l;
    faces += l;
    layerBufferLengths[i] = 0;
  }

  stats.visibleObjects = visibleObjectsBufferLen;
  stats.drawCalls = drawCalls;
  stats.faces = faces;
  stats.dt = Date.now() - t0;
};

/**
 * GC-Friendly universal 1st-pass culling (Gribb-Hartmann method).
 * Works for Perspective and Orthographic.
 * @param {Array} gameobjects - Your array of objects
 * @param {Float32Array} m - Clip-space (View-Projection) Matrix
 * @param {Uint32Array} out_visibleBuffer - Buffer to store indices
 * @returns {number} visibleCount
 */
function roughCull(gameobjects, m, out_visibleBuffer) {
  let visibleCount = 0;

  // 1. Matrix Registers (Extract once)
  const m0 = m[0],
    m1 = m[1],
    m2 = m[2],
    m3 = m[3];
  const m4 = m[4],
    m5 = m[5],
    m6 = m[6],
    m7 = m[7];
  const m8 = m[8],
    m9 = m[9],
    m10 = m[10],
    m11 = m[11];
  const m12 = m[12],
    m13 = m[13],
    m14 = m[14],
    m15 = m[15];

  // 2. Plane Registers (Extract & Normalize once)
  // Formula: Plane = Row4 +/- Row[n]

  // Left
  let lX = m3 + m0,
    lY = m7 + m4,
    lZ = m11 + m8,
    lW = m15 + m12;
  let invMag = 1.0 / Math.sqrt(lX * lX + lY * lY + lZ * lZ);
  lX *= invMag;
  lY *= invMag;
  lZ *= invMag;
  lW *= invMag;

  // Right
  let rX = m3 - m0,
    rY = m7 - m4,
    rZ = m11 - m8,
    rW = m15 - m12;
  invMag = 1.0 / Math.sqrt(rX * rX + rY * rY + rZ * rZ);
  rX *= invMag;
  rY *= invMag;
  rZ *= invMag;
  rW *= invMag;

  // Bottom
  let bX = m3 + m1,
    bY = m7 + m5,
    bZ = m11 + m9,
    bW = m15 + m13;
  invMag = 1.0 / Math.sqrt(bX * bX + bY * bY + bZ * bZ);
  bX *= invMag;
  bY *= invMag;
  bZ *= invMag;
  bW *= invMag;

  // Top
  let tX = m3 - m1,
    tY = m7 - m5,
    tZ = m11 - m9,
    tW = m15 - m13;
  invMag = 1.0 / Math.sqrt(tX * tX + tY * tY + tZ * tZ);
  tX *= invMag;
  tY *= invMag;
  tZ *= invMag;
  tW *= invMag;

  // Near
  let nX = m3 + m2,
    nY = m7 + m6,
    nZ = m11 + m10,
    nW = m15 + m14;
  invMag = 1.0 / Math.sqrt(nX * nX + nY * nY + nZ * nZ);
  nX *= invMag;
  nY *= invMag;
  nZ *= invMag;
  nW *= invMag;

  // Far
  let fX = m3 - m2,
    fY = m7 - m6,
    fZ = m11 - m10,
    fW = m15 - m14;
  invMag = 1.0 / Math.sqrt(fX * fX + fY * fY + fZ * fZ);
  fX *= invMag;
  fY *= invMag;
  fZ *= invMag;
  fW *= invMag;

  // 3. Hot Loop
  const len = gameobjects.length;
  for (let i = 0; i < len; i++) {
    const obj = gameobjects[i];
    if (!obj.meshRenderer || !obj.meshRenderer.enabled) continue;

    const t = obj.transform.dirtyL
      ? obj.transform.getLocalToWorld()
      : obj.transform.localToWorld;
    const b = obj.meshRenderer.bounds;

    // Transform Sphere Center to World
    const lx = b[28],
      ly = b[29],
      lz = b[30];
    const wx = t[0] * lx + t[4] * ly + t[8] * lz + t[12];
    const wy = t[1] * lx + t[5] * ly + t[9] * lz + t[13];
    const wz = t[2] * lx + t[6] * ly + t[10] * lz + t[14];

    // Max World Scale for Radius
    const sX = t[0] * t[0] + t[1] * t[1] + t[2] * t[2];
    const sY = t[4] * t[4] + t[5] * t[5] + t[6] * t[6];
    const sZ = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    const rWorld = b[31] * Math.sqrt(Math.max(sX, sY, sZ));

    // Sphere-Plane Dot Products (Direct Register Access)
    if (lX * wx + lY * wy + lZ * wz + lW < -rWorld) continue;
    if (rX * wx + rY * wy + rZ * wz + rW < -rWorld) continue;
    if (bX * wx + bY * wy + bZ * wz + bW < -rWorld) continue;
    if (tX * wx + tY * wy + tZ * wz + tW < -rWorld) continue;
    if (nX * wx + nY * wy + nZ * wz + nW < -rWorld) continue;
    if (fX * wx + fY * wy + fZ * wz + fW < -rWorld) continue;

    out_visibleBuffer[visibleCount++] = i;
  }

  return visibleCount;
}

/**
 * @function exactCull
 * @description Performs a second-pass AABB-Frustum intersection test using the Cohen-Sutherland
 * style Outcode algorithm. It projects the 8 corners of an object's bounding box into
 * Clip Space and culls objects where the entire volume resides outside any single frustum plane.
 * * @name Cohen-Sutherland_AABB_Culling
 * @param {Uint32Array} out_visibilityBuffer - Indices of objects surviving the first pass.
 * @param {number} firstPassCount - The number of indices currently in the buffer.
 * @param {Array<GameObject>} gameObjects - The source array of game objects.
 * @param {Float32Array} clipSpaceMatrix - The 4x4 View-Projection matrix.
 * @returns {number} The new count of visible objects in out_visibilityBuffer.
 */
function exactCull(
  out_visibilityBuffer,
  firstPassCount,
  gameObjects,
  clipSpaceMatrix,
) {
  const m = clipSpaceMatrix;
  const m0 = m[0],
    m1 = m[1],
    m2 = m[2],
    m3 = m[3],
    m4 = m[4],
    m5 = m[5],
    m6 = m[6],
    m7 = m[7],
    m8 = m[8],
    m9 = m[9],
    m10 = m[10],
    m11 = m[11],
    m12 = m[12],
    m13 = m[13],
    m14 = m[14],
    m15 = m[15];

  let visibleCount = 0;

  for (let i = 0; i < firstPassCount; i++) {
    const objIdx = out_visibilityBuffer[i];
    const go = gameObjects[objIdx];

    // Matrix access (assumes World Matrix is already updated by 1st pass or hierarchy loop)
    const t = go.transform.localToWorld;
    const renderer = go.meshRenderer;

    if (renderer && renderer.enabled && renderer.bounds) {
      const b = renderer.bounds; // 8 corners [x0,y0,z0, x1,y1,z1... x7,y7,z7]

      // We start with all bits set (111111 in binary = 63)
      // If a corner is NOT outside a plane, we flip that plane's bit to 0.
      // If after 8 corners a bit is still 1, it means ALL corners were outside that plane.
      let trivialRejectMask = 63;

      for (let j = 0; j < 24; j += 3) {
        const bx = b[j],
          by = b[j + 1],
          bz = b[j + 2];

        // 1. World Space Transformation
        const wx = t[0] * bx + t[4] * by + t[8] * bz + t[12];
        const wy = t[1] * bx + t[5] * by + t[9] * bz + t[13];
        const wz = t[2] * bx + t[6] * by + t[10] * bz + t[14];

        // 2. Clip Space Transformation (Projected)
        const cx = m0 * wx + m4 * wy + m8 * wz + m12;
        const cy = m1 * wx + m5 * wy + m9 * wz + m13;
        const cz = m2 * wx + m6 * wy + m10 * wz + m14;
        const cw = m3 * wx + m7 * wy + m11 * wz + m15;

        // 3. Test corner against the -w < coord < w boundary
        let outcode = 0;
        if (cx < -cw) outcode |= 1; // Left
        if (cx > cw) outcode |= 2; // Right
        if (cy < -cw) outcode |= 4; // Bottom
        if (cy > cw) outcode |= 8; // Top
        if (cz < -cw) outcode |= 16; // Near
        if (cz > cw) outcode |= 32; // Far

        // Bitwise AND: only bits that are '1' in BOTH remain '1'
        trivialRejectMask &= outcode;

        // Optimization: if mask becomes 0, the AABB spans across planes
        // and cannot be trivially rejected by this method.
        // We could 'break' here, but usually, the 8-corner loop is too small for a break to help.
      }

      // If any bit survived, the whole box is outside that specific plane.
      if (trivialRejectMask === 0) {
        out_visibilityBuffer[visibleCount++] = objIdx;
      }
    } else {
      // Logic-only/Point fallback
      const wx = t[12],
        wy = t[13],
        wz = t[14];
      const cx = m0 * wx + m4 * wy + m8 * wz + m12;
      const cy = m1 * wx + m5 * wy + m9 * wz + m13;
      const cz = m2 * wx + m6 * wy + m10 * wz + m14;
      const cw = m3 * wx + m7 * wy + m11 * wz + m15;

      if (
        cx >= -cw &&
        cx <= cw &&
        cy >= -cw &&
        cy <= cw &&
        cz >= -cw &&
        cz <= cw
      ) {
        out_visibilityBuffer[visibleCount++] = objIdx;
      }
    }
  }

  return visibleCount;
}

let callId = 0;

/**
 * Decomposes visible meshes into individual faces, performing culling and coordinate projection.
 * This function implements a standard 3D graphics pipeline:
 * 1.  **Vertex Transformation**: Transforms vertices into Camera Space (for lighting/depth)
 * and Clip Space (via Model-View-Projection matrix).
 * 2.  **Clip-Space Trivial Rejection**: Early-outs faces where all three vertices reside
 * outside the frustum boundaries (-w < x/y < w) before performing division.
 * 3.  **Perspective Divide**: Converts 4D Clip Space coordinates to 3D Normalized Device
 * Coordinates (NDC) by dividing by the 'w' component.
 * 4.  **Back-face Culling**: Uses a 2D cross-product (winding order check) in NDC space
 * to discard faces pointing away from the camera.
 * 5.  **Viewport Mapping**: Maps NDC coordinates (-1 to 1 range) to final screen pixel
 * coordinates for the Canvas 2D context.
 * 6.  **Buffer Population**: Stores processed geometry, average camera-space depth,
 * and face colors into typed arrays for sorting and rendering.
 *
 * @param {Array} renderers - List of MeshComponents to process.
 * @param {number} renderersCount - Number of active renderers in the current layer.
 * @param {Float32Array} vec3Cache2 - Pre-allocated buffer for Camera-Space vertices [x, y, z].
 * @param {Float32Array} vec4Cache - Pre-allocated buffer for Clip-Space vertices [x, y, z, w].
 * @param {Uint32Array} indexBuffer - Array to store sequential face indices for sorting.
 * @param {Float32Array} depthBuffer - Stores the average camera-space Z-depth per face.
 * @param {Uint32Array} colorBuffer - Stores the packed RGBA face colors.
 * @param {Float32Array} clipGeometryBuffer - Stores Camera-Space positions for lighting/fog.
 * @param {Float32Array} cameraLocalMatrix - The 4x4 World-to-Local (View) matrix.
 * @param {Float32Array} clipSpaceMatrix - The 4x4 View-Projection matrix.
 * @param {Float32Array} mat4Scratchpad1 - Reusable matrix for Model-View calculations.
 * @param {Float32Array} mat4Scratchpad2 - Reusable matrix for Model-View-Projection (MVP).
 * @param {Float32Array} mat3Scratchpad1 - Reusable matrix 9-element (3x3)
 * @param {Float32Array} faceNormalsBuffer
 * @param {Float32Array} vertexBuffer - Stores 2D screen coordinates [x0, y0, x1, y1, x2, y2].
 * @param {Uint32Array} vertexIndexBuffer - Indexes of vertices in the vertexBuffer.
 * @param {Int32Array} vMapping - Persistent buffer storing the vertexBuffer offset for the current mesh.
 * @param {Uint32Array} vTags - Persistent buffer storing the callId tag to validate vMapping entries.
 * @returns {number} The total count of processed (visible) faces.
 */
function destructMesh(
  renderers,
  renderersCount,
  vec3Cache2,
  vec4Cache,
  indexBuffer,
  depthBuffer,
  colorBuffer,
  clipGeometryBuffer,
  cameraLocalMatrix,
  clipSpaceMatrix,
  mat4Scratchpad1,
  mat4Scratchpad2,
  mat3Scratchpad1,
  faceNormalsBuffer,
  vertexBuffer,
  vertexIndexBuffer,
  vMapping, // New: Persistent Int32Array(max_verts)
  vTags, // New: Persistent Uint32Array(max_verts)
) {
  let i = 0; // face counter
  let uniqueVertexCount = 0; // vertex pointer for vertexBuffer

  for (let j = 0; j < renderersCount; j++) {
    const mesh = renderers[j];
    if (mesh.constructor !== MeshComponent) continue;

    // Increment unique ID for this specific mesh
    ++callId;

    const W = mesh.gameObject.transform.dirtyL
      ? mesh.gameObject.transform.getLocalToWorld()
      : mesh.gameObject.transform.localToWorld;

    // MVP (Clip Space) and MV (Camera Space) - Calculated once per mesh
    mat4Mul(mat4Scratchpad2, clipSpaceMatrix, W);
    // MV = cameraLocalMatrix * W
    mat4Mul(mat4Scratchpad1, cameraLocalMatrix, W);

    // Unpack Clip-Space Matrix for inlining
    const m0 = mat4Scratchpad2[0],
      m1 = mat4Scratchpad2[1],
      m2 = mat4Scratchpad2[2],
      m3 = mat4Scratchpad2[3],
      m4 = mat4Scratchpad2[4],
      m5 = mat4Scratchpad2[5],
      m6 = mat4Scratchpad2[6],
      m7 = mat4Scratchpad2[7],
      m8 = mat4Scratchpad2[8],
      m9 = mat4Scratchpad2[9],
      m10 = mat4Scratchpad2[10],
      m11 = mat4Scratchpad2[11],
      m12 = mat4Scratchpad2[12],
      m13 = mat4Scratchpad2[13],
      m14 = mat4Scratchpad2[14],
      m15 = mat4Scratchpad2[15];

    const faces = mesh.faces,
      verts = mesh.vertices,
      faceNormals = mesh.faceNormals;

    // NM Normal Matrix calculation per mesh
    MeshComponent.computeNormalMatrix(mat3Scratchpad1, W);

    const nm = mat3Scratchpad1;
    // Unpack Normal Matrix for speed
    const nm0 = nm[0],
      nm1 = nm[1],
      nm2 = nm[2];
    const nm3 = nm[3],
      nm4 = nm[4],
      nm5 = nm[5];
    const nm6 = nm[6],
      nm7 = nm[7],
      nm8 = nm[8];

    // FACE PROCESSING
    const facesCount = faces.length;
    for (let f = 0; f < facesCount; f += 3) {
      const idx0 = faces[f],
        idx1 = faces[f + 1],
        idx2 = faces[f + 2];

      // --- GATE 1: LAZY CLIP-SPACE TRANSFORMATION ---
      // Transform each vertex to Clip Space ONLY ONCE per mesh.
      // We use idx << 2 to store results in vec4Cache at the original index position.
      if (vTags[idx0] !== callId) {
        const vo = idx0 * 3;
        // vec4TransformMat4(
        //   vec4Cache,
        //   idx0 << 2,
        //   verts[vo],
        //   verts[vo + 1],
        //   verts[vo + 2],
        //   1.0,
        //   mat4Scratchpad2,
        // );
        // Inlined vec4TransformMat4
        const at = idx0 << 2;
        const vx = verts[vo],
          vy = verts[vo + 1],
          vz = verts[vo + 2];
        vec4Cache[at] = m0 * vx + m4 * vy + m8 * vz + m12;
        vec4Cache[at + 1] = m1 * vx + m5 * vy + m9 * vz + m13;
        vec4Cache[at + 2] = m2 * vx + m6 * vy + m10 * vz + m14;
        vec4Cache[at + 3] = m3 * vx + m7 * vy + m11 * vz + m15;
        vTags[idx0] = callId;
        vMapping[idx0] = -1; // Flag: Transformed but not yet submitted to vertexBuffer
      }

      if (vTags[idx1] !== callId) {
        const vo = idx1 * 3;
        // vec4TransformMat4(
        //     vec4Cache,
        //     idx1 << 2,
        //     verts[vo],
        //     verts[vo + 1],
        //     verts[vo + 2],
        //     1.0,
        //     mat4Scratchpad2,
        // );
        // Inlined vec4TransformMat4
        const at = idx1 << 2;
        const vx = verts[vo],
          vy = verts[vo + 1],
          vz = verts[vo + 2];
        vec4Cache[at] = m0 * vx + m4 * vy + m8 * vz + m12;
        vec4Cache[at + 1] = m1 * vx + m5 * vy + m9 * vz + m13;
        vec4Cache[at + 2] = m2 * vx + m6 * vy + m10 * vz + m14;
        vec4Cache[at + 3] = m3 * vx + m7 * vy + m11 * vz + m15;
        vTags[idx1] = callId;
        vMapping[idx1] = -1;
      }

      if (vTags[idx2] !== callId) {
        const vo = idx2 * 3;
        // vec4TransformMat4(
        //     vec4Cache,
        //     idx2 << 2,
        //     verts[vo],
        //     verts[vo + 1],
        //     verts[vo + 2],
        //     1.0,
        //     mat4Scratchpad2,
        // );
        // Inlined vec4TransformMat4
        const at = idx2 << 2;
        const vx = verts[vo],
          vy = verts[vo + 1],
          vz = verts[vo + 2];
        vec4Cache[at] = m0 * vx + m4 * vy + m8 * vz + m12;
        vec4Cache[at + 1] = m1 * vx + m5 * vy + m9 * vz + m13;
        vec4Cache[at + 2] = m2 * vx + m6 * vy + m10 * vz + m14;
        vec4Cache[at + 3] = m3 * vx + m7 * vy + m11 * vz + m15;
        vTags[idx2] = callId;
        vMapping[idx2] = -1;
      }

      const v0 = idx0 << 2,
        v1 = idx1 << 2,
        v2 = idx2 << 2; // Fast multiply by 4

      const x0 = vec4Cache[v0],
        y0 = vec4Cache[v0 + 1],
        z0 = vec4Cache[v0 + 2],
        w0 = vec4Cache[v0 + 3];
      const x1 = vec4Cache[v1],
        y1 = vec4Cache[v1 + 1],
        z1 = vec4Cache[v1 + 2],
        w1 = vec4Cache[v1 + 3];
      const x2 = vec4Cache[v2],
        y2 = vec4Cache[v2 + 1],
        z2 = vec4Cache[v2 + 2],
        w2 = vec4Cache[v2 + 3];

      // --- CLIP-SPACE TRIVIAL REJECTION ---
      // Skip divisions for off-screen faces
      // let outcode = 0;
      // if (x0 < -w0 && x1 < -w1 && x2 < -w2) outcode |= 1;
      // if (x0 > w0 && x1 > w1 && x2 > w2) outcode |= 2;
      // if (y0 < -w0 && y1 < -w1 && y2 < -w2) outcode |= 4;
      // if (y0 > w0 && y1 > w1 && y2 > w2) outcode |= 8;
      //
      // // Near Plane: In Clip Space, Z should be >= 0 (or >= -w depending on matrix)
      // // If all Z are less than 0, the face is behind the near plane.
      // if (z0 < -w0 && z1 < -w1 && z2 < -w2) outcode |= 16;
      //
      // // Far Plane: In Clip Space, Z should be <= w
      // // If all Z are greater than their respective w, the face is past the far plane.
      // if (z0 > w0 && z1 > w1 && z2 > w2) outcode |= 32;
      //
      // if (outcode !== 0) continue;

      // If you use a partial outcode elsewhere (like for clipping logic), you would need the full outcode mask.
      // Since you are only using it to continue, the result is identical
      // Faster short-circuiting rejection
      if (x0 < -w0 && x1 < -w1 && x2 < -w2) continue;
      if (x0 > w0 && x1 > w1 && x2 > w2) continue;
      if (y0 < -w0 && y1 < -w1 && y2 < -w2) continue;
      if (y0 > w0 && y1 > w1 && y2 > w2) continue;
      if (z0 < -w0 && z1 < -w1 && z2 < -w2) continue;
      if (z0 > w0 && z1 > w1 && z2 > w2) continue;

      // --- PERSPECTIVE DIVIDE ---
      const invW0 = 1 / w0,
        invW1 = 1 / w1,
        invW2 = 1 / w2;
      const n0x = x0 * invW0,
        n0y = y0 * invW0;
      const n1x = x1 * invW1,
        n1y = y1 * invW1;
      const n2x = x2 * invW2,
        n2y = y2 * invW2;

      // --- BACKFACE CULLING ---
      if ((n1x - n0x) * (n2y - n0y) - (n1y - n0y) * (n2x - n0x) > 0) continue;

      const v0c = idx0 * 3,
        v1c = idx1 * 3,
        v2c = idx2 * 3;

      // FILL BUFFERS
      indexBuffer[i] = i;

      // WORLD-SPACE LIGHTING
      const fnx = faceNormals[f],
        fny = faceNormals[f + 1],
        fnz = faceNormals[f + 2];

      // Transform normal: Model -> World via Normal Matrix
      const wnx = fnx * nm0 + fny * nm3 + fnz * nm6;
      const wny = fnx * nm1 + fny * nm4 + fnz * nm7;
      const wnz = fnx * nm2 + fny * nm5 + fnz * nm8;
      // Re-normalize for uniform/non-uniform scaling
      const mag = Math.sqrt(wnx * wnx + wny * wny + wnz * wnz);
      const invMag = mag > 0 ? 1 / mag : 0;

      const fIdx = (f / 3) | 0;
      const cIdx = mesh.faceColors[fIdx % mesh.faceColors.length];
      const colorIndex =
        (mesh.colors[cIdx] << 24) |
        (mesh.colors[cIdx + 1] << 16) |
        (mesh.colors[cIdx + 2] << 8) |
        255;

      colorBuffer[i] = colorIndex;

      // --- MAPPING & VERTEX SUBMISSION ---
      // Only unique vertices should be stored.
      // We check each vertex index. If it hasn't been added to vertexBuffer
      // for THIS callId, we write it and store the new index.

      // Process Vertex 0
      if (vMapping[idx0] === -1) {
        const v0Idx = uniqueVertexCount * 3;
        vec3TransformMat4(
          vec3Cache2,
          v0c,
          verts[v0c],
          verts[v0c + 1],
          verts[v0c + 2],
          mat4Scratchpad1,
        );
        vertexBuffer[v0Idx] = n0x;
        vertexBuffer[v0Idx + 1] = -n0y;
        vertexBuffer[v0Idx + 2] = colorIndex;
        vMapping[idx0] = v0Idx; // Store the buffer offset
        uniqueVertexCount++;
      }

      vertexIndexBuffer[i * 3] = vMapping[idx0];

      // Process Vertex 1
      if (vMapping[idx1] === -1) {
        const v1Idx = uniqueVertexCount * 3;
        vec3TransformMat4(
          vec3Cache2,
          v1c,
          verts[v1c],
          verts[v1c + 1],
          verts[v1c + 2],
          mat4Scratchpad1,
        );
        vertexBuffer[v1Idx] = n1x;
        vertexBuffer[v1Idx + 1] = -n1y;
        vertexBuffer[v1Idx + 2] = colorIndex;
        vMapping[idx1] = v1Idx;
        uniqueVertexCount++;
      }

      vertexIndexBuffer[i * 3 + 1] = vMapping[idx1];

      // Process Vertex 2
      if (vMapping[idx2] === -1) {
        const v2Idx = uniqueVertexCount * 3;
        vec3TransformMat4(
          vec3Cache2,
          v2c,
          verts[v2c],
          verts[v2c + 1],
          verts[v2c + 2],
          mat4Scratchpad1,
        );
        vertexBuffer[v2Idx] = n2x;
        vertexBuffer[v2Idx + 1] = -n2y;
        vertexBuffer[v2Idx + 2] = colorIndex;
        vMapping[idx2] = v2Idx;
        uniqueVertexCount++;
      }

      vertexIndexBuffer[i * 3 + 2] = vMapping[idx2];

      const cgIdx = i * 9;
      clipGeometryBuffer[cgIdx] = vec3Cache2[v0c];
      clipGeometryBuffer[cgIdx + 1] = vec3Cache2[v0c + 1];
      const v0z = (clipGeometryBuffer[cgIdx + 2] = vec3Cache2[v0c + 2]);
      clipGeometryBuffer[cgIdx + 3] = vec3Cache2[v1c];
      clipGeometryBuffer[cgIdx + 4] = vec3Cache2[v1c + 1];
      const v1z = (clipGeometryBuffer[cgIdx + 5] = vec3Cache2[v1c + 2]);
      clipGeometryBuffer[cgIdx + 6] = vec3Cache2[v2c];
      clipGeometryBuffer[cgIdx + 7] = vec3Cache2[v2c + 1];
      const v2z = (clipGeometryBuffer[cgIdx + 8] = vec3Cache2[v2c + 2]);

      depthBuffer[i] = (v0z + v1z + v2z) * 0.33333;

      const fnIdx = i * 3;
      faceNormalsBuffer[fnIdx] = wnx * invMag;
      faceNormalsBuffer[fnIdx + 1] = wny * invMag;
      faceNormalsBuffer[fnIdx + 2] = wnz * invMag;
      i++;
    }
  }
  return i;
}

function calcLight(
  indexLen,
  colorBuffer,
  scene,
  lightDirBuffer,
  ambientLightIntensity,
  faceNormalsBuffer,
) {
  const light = scene.light;
  if (!light) return;

  // 1. Get the world forward vector of the light
  light.transform.forward(lightDirBuffer);

  const lx = -lightDirBuffer[0];
  const ly = -lightDirBuffer[1];
  const lz = -lightDirBuffer[2];

  for (let i = 0; i < indexLen; i++) {
    const wnx = faceNormalsBuffer[i * 3];
    const wny = faceNormalsBuffer[i * 3 + 1];
    const wnz = faceNormalsBuffer[i * 3 + 2];

    const dot = wnx * lx + wny * ly + wnz * lz;
    const intensity = Math.max(ambientLightIntensity, dot);

    const color = colorBuffer[i];
    const r = ((color >>> 24) & 255) * intensity;
    const g = ((color >>> 16) & 255) * intensity;
    const b = ((color >>> 8) & 255) * intensity;

    colorBuffer[i] = (r << 24) | (g << 16) | (b << 8) | 255;
  }
}

function calcFog(
  indexLen,
  clipGeometryBuffer,
  colorBuffer,
  depthBuffer,
  fogType,
  fogColor,
  fogNearPane,
  fogFarPane,
) {
  if (fogType === CameraComponent.FogType.NONE) return;

  for (let i = 0; i < indexLen; i++) {
    const color = colorBuffer[i];
    const depth = depthBuffer[i];
    let fogAmount = 0;

    let r = (color >>> 24) & 255;
    let g = (color >>> 16) & 255;
    let b = (color >>> 8) & 255;

    if (
      fogType === CameraComponent.FogType.RADIAL_FAST ||
      fogType === CameraComponent.FogType.RADIAL
    ) {
      const w0x = clipGeometryBuffer[i * 9];
      const w0y = clipGeometryBuffer[i * 9 + 1];
      const w0z = clipGeometryBuffer[i * 9 + 2];
      const w1x = clipGeometryBuffer[i * 9 + 3];
      const w1y = clipGeometryBuffer[i * 9 + 4];
      const w1z = clipGeometryBuffer[i * 9 + 5];
      const w2x = clipGeometryBuffer[i * 9 + 6];
      const w2y = clipGeometryBuffer[i * 9 + 7];
      const w2z = clipGeometryBuffer[i * 9 + 8];

      // 1. Get the local camera-space coordinates from your cache
      // We use the average of the 3 vertices for the face
      const lx = (w0x + w1x + w2x) * 0.33333;
      const ly = (w0y + w1y + w2y) * 0.33333;
      const lz = (w0z + w1z + w2z) * 0.33333;

      if (fogType === CameraComponent.FogType.RADIAL_FAST) {
        // We need the squares of your panes for the comparison
        const nearSq = fogNearPane * fogNearPane;
        const farSq = fogFarPane * fogFarPane;
        const invFogRangeSq = 1.0 / (farSq - nearSq);

        // Calculate Squared Distance (No Math.sqrt!)
        const distSq = lx * lx + ly * ly + lz * lz;

        // Calculate fogAmount based on the squared distribution
        fogAmount = (distSq - nearSq) * invFogRangeSq;
      } else {
        // 2. Calculate Radial Distance
        // Use x, y, and z for a spherical curve, or just x and z for a cylindrical curve.
        const distance = Math.sqrt(lx * lx + ly * ly + lz * lz);

        // 3. Calculate fogAmount using distance instead of depth
        fogAmount = (distance - fogNearPane) / (fogFarPane - fogNearPane);
      }
    } else if (fogType === CameraComponent.FogType.LINEAR) {
      fogAmount = (depth - fogNearPane) / (fogFarPane - fogNearPane);
    }

    if (fogAmount > 1) fogAmount = 1;

    // Blend the mesh color with the fog color
    if (fogAmount > 0) {
      r = (r * (1 - fogAmount) + fogColor[0] * fogAmount) | 0;
      g = (g * (1 - fogAmount) + fogColor[1] * fogAmount) | 0;
      b = (b * (1 - fogAmount) + fogColor[2] * fogAmount) | 0;

      colorBuffer[i] = (r << 24) | (g << 16) | (b << 8) | 255;
    }
  }
}

function quantizeFaceColors(
  indexBuffer,
  indexLen,
  colorBuffer,
  color16KeyBuffer,
) {
  for (let i = 0; i < indexLen; i++) {
    const color = colorBuffer[i];

    let r = (color >>> 24) & 255;
    let g = (color >>> 16) & 255;
    let b = (color >>> 8) & 255;

    // 1. Quantize 8-bit color channels to 5-6-5 bits
    const qr = r & 0xf8; // Keep 5 bits
    const qg = g & 0xfc; // Keep 6 bits
    const qb = b & 0xf8; // Keep 5 bits

    // 2. Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
    color16KeyBuffer[i] = (qr << 8) | (qg << 3) | (qb >> 3);
  }
}

/**
 * Draw
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context
 * @param {Float32Array} vertexBuffer - Array of vertices in the format [x0, y0, color0, x1, y1, color1, x2, y2, color2]
 * @param {Uint32Array} vertexIndexBuffer - Array of indices in the format [i0, i1, i2, i3, i4, i5, ...]
 * @param {Uint32Array} indexBuffer - Depth-sorted array of face indices in the format [i0, i1, i2, i3, i4, i5, ...]
 * @param {Uint16Array} color16Buffer - Array of face 16-bit color index
 * @param {number} count - Number of elements in indexBuffer
 * @param {number} offset - Starting index of the triangles to draw
 * @param {boolean} toStroke - Should faces be stroked, to fix gaps?
 * @param {boolean} toClear - Should ctx be cleared before drawing?
 * @param {number} w - Canvas width
 * @param {number} h - Canvas height
 */
function drawTriangles(
  ctx,
  vertexBuffer,
  vertexIndexBuffer,
  indexBuffer,
  color16Buffer,
  count,
  offset,
  toStroke,
  toClear,
  w,
  h,
) {
  const halfW = w * 0.5,
    halfH = h * 0.5;

  const len = offset + count;

  ctx.lineJoin = "round";
  ctx.lineWidth = 1;

  if (toClear) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let i = offset; i < len; i++) {
    const idx = indexBuffer[i];
    const v0Idx = vertexIndexBuffer[idx * 3];
    const v1Idx = vertexIndexBuffer[idx * 3 + 1];
    const v2Idx = vertexIndexBuffer[idx * 3 + 2];
    const colorIndex = color16Buffer[idx];

    ctx.beginPath();
    ctx.moveTo(
      vertexBuffer[v0Idx] * halfW + halfW,
      vertexBuffer[v0Idx + 1] * halfH + halfH,
    );
    ctx.lineTo(
      vertexBuffer[v1Idx] * halfW + halfW,
      vertexBuffer[v1Idx + 1] * halfH + halfH,
    );
    ctx.lineTo(
      vertexBuffer[v2Idx] * halfW + halfW,
      vertexBuffer[v2Idx + 1] * halfH + halfH,
    );
    ctx.closePath();

    ctx.strokeStyle = ctx.fillStyle = PALETTE_16BIT[colorIndex];

    if (toStroke) {
      ctx.stroke();
    }

    ctx.fill();
  }
}

function drawWireframe(
  ctx,
  vertexBuffer,
  vertexIndexBuffer,
  indexBuffer,
  count,
  offset,
  w,
  h,
) {
  const halfW = w * 0.5,
    halfH = h * 0.5;

  const len = offset + count;

  ctx.lineJoin = "miter";
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "rgb(0,0,255)";

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let i = offset; i < len; i++) {
    const idx = indexBuffer[i];
    const v0Idx = vertexIndexBuffer[idx * 3];
    const v1Idx = vertexIndexBuffer[idx * 3 + 1];
    const v2Idx = vertexIndexBuffer[idx * 3 + 2];

    ctx.beginPath();
    ctx.moveTo(
      vertexBuffer[v0Idx] * halfW + halfW,
      vertexBuffer[v0Idx + 1] * halfH + halfH,
    );
    ctx.lineTo(
      vertexBuffer[v1Idx] * halfW + halfW,
      vertexBuffer[v1Idx + 1] * halfH + halfH,
    );
    ctx.lineTo(
      vertexBuffer[v2Idx] * halfW + halfW,
      vertexBuffer[v2Idx + 1] * halfH + halfH,
    );
    ctx.closePath();

    ctx.stroke();
  }
}
