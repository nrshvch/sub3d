// TODO: dont pass gameObjects object into drawTriangles, move lights params into typed buffers
// TODO: move out shaders into separate files, that would inline on runtime (eval()?)
// TODO: use Binary Scaling (Q-format) instead of floats for frequent math ops
// TODO: calculate lightning at lower fps
// TODO: Allow passing multiple shader. Limiting shader to handling just one pass, has higher chance of compiler optimizing the shader.
// TODO: add profiling of different pipeline steps

import config from "./config.js";
import MeshComponent from "./components/MeshComponent.js";
import CameraComponent from "./components/CameraComponent.js";
import * as math from "./math.js";
import * as palette from "./palette.js";
import * as debug from "./debug.js";
import radixSort from "./radixSort.js";

const computeNormalMatrix = MeshComponent.computeNormalMatrix;
const vec3TransformMat4 = math.vec3TransformMat4;
const mat4Mul = math.mat4Mul;
const renderAxis = debug.renderAxis;

const PALETTE_16BIT = palette.createPalette16Bit();

// Coefficient for expanding polygons to cover subpixel seams/gaps
// For cases when stroke cannot be done, e.g. textured polys
const EXPANSION_COEFFICIENT = 0.6;

function groupLayers(visibleObjectsBuffer, gameObjects, layerBuffersOffsets, layersCount, layerBuffers) {
  if (layersCount === 1) {
    return visibleObjectsBuffer;
  }

  const visibleObjectsBufferLen = visibleObjectsBuffer[0] + 1;

  // Pass 1: Count visible meshes per layer
  layerBuffersOffsets.fill(0);
  for (let i = 1; i < visibleObjectsBufferLen; i++) {
    const goIdx = visibleObjectsBuffer[i];
    const go = gameObjects[goIdx];
    if (go.meshRenderer) {
      layerBuffersOffsets[go.meshRenderer.layer]++;
    }
  }

  // Compute start offsets for each layer partition (1 slot reserved for header length)
  let currentOffset = 0;
  for (let l = 0; l < layersCount; l++) {
    const count = layerBuffersOffsets[l];
    layerBuffersOffsets[l] = currentOffset;
    
    layerBuffers[currentOffset] = 0; // Initialize count header to 0
    currentOffset += 1 + count;
  }

  // Pass 2: Place GameObject indices sorted by layer
  for (let i = 1; i < visibleObjectsBufferLen; i++) {
    const goIdx = visibleObjectsBuffer[i];
    const go = gameObjects[goIdx];
    if (go.meshRenderer) {
      const layer = go.meshRenderer.layer;
      const offset = layerBuffersOffsets[layer];
      const length = layerBuffers[offset];
      
      layerBuffers[offset + 1 + length] = goIdx;
      layerBuffers[offset] = length + 1;
    }
  }

  return layerBuffers;
}

export default function Canvas2dRenderer() {
  // Single 1D flat typed array storing GameObject indices for all layers
  this.layerBuffers = new Uint32Array(0);
  // Start offsets for each layer partition (used only as carets during sorting)
  this.layerBuffersOffsets = new Uint32Array(config.layersCount);

  this.drawCalls = 0;
  this.faces = 0;

  this.lightDirection = new Float32Array([0, 0, 0]);

  this.depthBuffer = new Float32Array(0);
  this.indexBuffer = new Uint32Array(0);
  this.clipGeometryBuffer = new Float32Array(0);
  this.colorBuffer = new Uint32Array(0);
  this.shaderTypeBuffer = new Uint8Array(0);
  this.shaderPassBuffer = new Uint8Array(0);
  this.faceNormalsBuffer = new Float32Array(0);
  this.vertexNormalsBuffer = new Float32Array(0);
  this.meshIndexBuffer = new Uint32Array(0);
  this.meshFaceIndexBuffer = new Uint32Array(0);
  this.visibleObjectsBuffer = new Uint32Array(100);
  this.lightsIndexBuffer = new Uint32Array(10);
  this.vertexBuffer = new Float32Array(0);
  this.vertexIndexBuffer = new Uint32Array(0);
  this.vMapping = new Int32Array(0);
  this.vTags = new Uint32Array(0);
  this.tempIndexBuffer = new Uint32Array(0);
  this.counters = new Uint32Array(256);
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

  let gameObjects = camera.scene.retrieve(),
    layersCount = config.layersCount,
    vw = viewport.width,
    vh = viewport.height,
    i,
    j,
    ctx,
    vec3Cache1 = this.vec3Cache1,
    vec3Cache2 = this.vec3Cache2,
    vec4Cache = this.vec4Cache,
    depthBuffer = this.depthBuffer,
    indexBuffer = this.indexBuffer, //face indices buffer
    vertexIndexBuffer = this.vertexIndexBuffer,
    vertexBuffer = this.vertexBuffer,
    clipGeometryBuffer = this.clipGeometryBuffer,
    colorBuffer = this.colorBuffer,
    shaderTypeBuffer = this.shaderTypeBuffer,
    shaderPassBuffer = this.shaderPassBuffer,
    faceNormalsBuffer = this.faceNormalsBuffer,
    vertexNormalsBuffer = this.vertexNormalsBuffer,
    meshIndexBuffer = this.meshIndexBuffer,
    meshFaceIndexBuffer = this.meshFaceIndexBuffer,
    visibleObjectsBuffer = this.visibleObjectsBuffer,
    lightsIndexBuffer = this.lightsIndexBuffer,
    layerBuffersOffsets = this.layerBuffersOffsets,
    mat4Scratchpad1 = this.mat4Scratchpad1,
    mat4Scratchpad2 = this.mat4Scratchpad2,
    worldToScreenMatrix = viewport.getWorldToScreen(),
    cameraLocalMatrix = camera.transform.getWorldToLocal(),
    clipSpaceMatrix = camera.camera.getClipSpaceMatrix(),
    vMapping = this.vMapping,
    vTags = this.vTags,
    tempIndexBuffer = this.tempIndexBuffer,
    counters = this.counters;

  let drawCalls = 0;
  let faces = 0;

  const cam = camera.camera;
  const bgColorInt =
    camera.camera.fogType !== CameraComponent.FogType.NONE
      ? cam.fogColor
      : cam.bgColor;

  if (cam.bgColor !== -1) {
    const bgR = bgColorInt >>> 16;
    const bgG = (bgColorInt >>> 8) & 255;
    const bgB = bgColorInt & 255;

    // 1. Quantize 8-bit to 5-6-5 bits
    const qr = bgR & 0xf8; // Keep 5 bits
    const qg = bgG & 0xfc; // Keep 6 bits
    const qb = bgB & 0xf8; // Keep 5 bits

    // 2. Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
    const key = (qr << 8) | (qg << 3) | (qb >> 3);

    viewport.context.fillStyle = PALETTE_16BIT[key];
    viewport.context.fillRect(0, 0, viewport.width, viewport.height);
  } else {
    viewport.context.clearRect(0, 0, viewport.width, viewport.height);
  }

  //worst case scenario - every object is visible
  if (visibleObjectsBuffer.length < gameObjects.length) {
    const _visibleObjectsBuffer = visibleObjectsBuffer;
    this.visibleObjectsBuffer = visibleObjectsBuffer = new Uint32Array(
      gameObjects.length,
    );
    visibleObjectsBuffer.set(_visibleObjectsBuffer);
  }

  //worst case scenario - every go has a light
  if (lightsIndexBuffer.length < gameObjects.length) {
    const _lightsIndexBuffer = lightsIndexBuffer;
    this.lightsIndexBuffer = lightsIndexBuffer = new Uint32Array(
      gameObjects.length,
    );
    lightsIndexBuffer.set(_lightsIndexBuffer);
  }

  roughCull(
    gameObjects,
    clipSpaceMatrix,
    visibleObjectsBuffer,
    lightsIndexBuffer,
  );

  exactCull(visibleObjectsBuffer, gameObjects, clipSpaceMatrix);

  //first element is length
  const visibleObjectsBufferLen = visibleObjectsBuffer[0] + 1;
  const count = visibleObjectsBuffer[0];
  if (layersCount > 1 && this.layerBuffers.length < count + layersCount) {
    this.layerBuffers = new Uint32Array((count + layersCount) * 2);
  }

  let layerBuffers = groupLayers(
    visibleObjectsBuffer,
    gameObjects,
    layerBuffersOffsets,
    layersCount,
    this.layerBuffers
  );

  let totalSortTime = 0;

  let layerOffset = 0;
  for (i = 0; i < layersCount; i++) {
    const count = layerBuffers[layerOffset];
    if (count === 0) {
      layerOffset += 1;
      continue;
    }

    ctx = viewport.layers[i];

    let maxFacesCount = 0;
    let maxVertsCount = 0;
    for (let o = 0; o < count; o++) {
      const mesh = gameObjects[layerBuffers[layerOffset + 1 + o]].meshRenderer;
      maxFacesCount += mesh.faces.length;
      const vertexCount = mesh.vertices.length;
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
      //for face ordering
      let newArr = new Float32Array(maxFacesCount);
      newArr.set(depthBuffer);
      this.depthBuffer = depthBuffer = newArr;

      //for face draw order
      newArr = new Uint32Array(maxFacesCount);
      newArr.set(indexBuffer);
      this.indexBuffer = indexBuffer = newArr;

      newArr = new Uint32Array(maxFacesCount);
      newArr.set(tempIndexBuffer);
      this.tempIndexBuffer = tempIndexBuffer = newArr;

      //color is per face
      newArr = new Uint32Array(maxFacesCount);
      newArr.set(colorBuffer);
      this.colorBuffer = colorBuffer = newArr;

      //material is per face
      newArr = new Uint8Array(maxFacesCount);
      newArr.set(shaderTypeBuffer);
      this.shaderTypeBuffer = shaderTypeBuffer = newArr;

      newArr = new Uint8Array(maxFacesCount);
      newArr.set(shaderPassBuffer);
      this.shaderPassBuffer = shaderPassBuffer = newArr;

      //stores vec3 in clip space, for every vert of a face
      newArr = new Float32Array(maxFacesCount * 9);
      newArr.set(clipGeometryBuffer);
      this.clipGeometryBuffer = clipGeometryBuffer = newArr;

      //one vec3 for every face
      newArr = new Float32Array(maxFacesCount * 3);
      newArr.set(faceNormalsBuffer);
      this.faceNormalsBuffer = faceNormalsBuffer = newArr;

      //three vec3 normals per each vertex of a face, worst case its 3x normals per 3x face verts.
      newArr = new Float32Array(maxFacesCount * 9);
      newArr.set(vertexNormalsBuffer);
      this.vertexNormalsBuffer = vertexNormalsBuffer = newArr;

      newArr = new Uint32Array(maxFacesCount);
      newArr.set(meshIndexBuffer);
      this.meshIndexBuffer = meshIndexBuffer = newArr;

      newArr = new Uint32Array(maxFacesCount);
      newArr.set(meshFaceIndexBuffer);
      this.meshFaceIndexBuffer = meshFaceIndexBuffer = newArr;

      //array of vec2 to be actually drawn on screen, in worst case its 3x per every face.
      let _vertexBuffer = new Float32Array(maxFacesCount * 6);
      _vertexBuffer.set(vertexBuffer);
      this.vertexBuffer = vertexBuffer = _vertexBuffer;

      //index of 2D vertices, 1 element per vertex
      let _vertexIndexBuffer = new Uint32Array(maxFacesCount * 3);
      _vertexIndexBuffer.set(vertexIndexBuffer);
      this.vertexIndexBuffer = vertexIndexBuffer = _vertexIndexBuffer;
    }

    const l = destructMesh(
      layerBuffers,
      layerOffset + 1,
      gameObjects,
      count,
      vec3Cache2,
      vec4Cache,
      indexBuffer,
      depthBuffer,
      colorBuffer,
      shaderTypeBuffer,
      shaderPassBuffer,
      clipGeometryBuffer,
      cameraLocalMatrix,
      clipSpaceMatrix,
      mat4Scratchpad2,
      mat4Scratchpad1,
      this.mat3Scratchpad1,
      faceNormalsBuffer,
      vertexNormalsBuffer,
      vertexBuffer,
      vertexIndexBuffer,
      meshIndexBuffer,
      meshFaceIndexBuffer,
      this.vMapping,
      this.vTags,
    );

    if ((config.depthSortingMask & (i + 1)) === i + 1) {
      const sortStart = performance.now();
      // TODO: Consider merging passes by packing multiple keys/attributes into a single 32-bit integer
      // to reduce radix sorting passes. E.g., we could pack local face indices together with mesh
      // references (meshIndex), and utilize a single 32-bit number for both by employing dynamic bit
      // budgeting (allocating bits dynamically based on active mesh count and max face count per mesh).
      radixSort(indexBuffer, tempIndexBuffer, depthBuffer, meshIndexBuffer, shaderPassBuffer, counters, l, cam.nearClippingPane, cam.farClippingPane);
      totalSortTime += performance.now() - sortStart;
    }

    const toClear = (config.layerClearMask & (i + 1)) === i + 1;

    drawTriangles(
      ctx,
      vertexBuffer,
      vertexIndexBuffer,
      indexBuffer,
      colorBuffer,
      shaderTypeBuffer,
      l,
      0,
      toClear,
      vw,
      vh,
      clipGeometryBuffer,
      depthBuffer,
      camera.camera.fogType,
      camera.camera.fogColor,
      camera.camera.fogNearPane,
      camera.camera.fogFarPane,
      camera.scene,
      this.lightDirection,
      camera.camera.ambientLight,
      faceNormalsBuffer,
      vertexNormalsBuffer,
      meshIndexBuffer,
      meshFaceIndexBuffer,
      layerBuffers,
      layerOffset + 1,
      this.wireframe,
      lightsIndexBuffer,
      gameObjects,
    );

    // Render debug axes by resolving GameObject indices from the flat layerBuffers array
    for (j = 0; j < count; j++) {
      const goIdx = layerBuffers[layerOffset + 1 + j];
      const go = gameObjects[goIdx];
      // Only draw axes for objects with a transform (usually MeshComponents)
      if (go && go.debug) {
        renderAxis(go, ctx, worldToScreenMatrix, vec3Cache1);
      }
    }

    // renderDebugNormals(ctx, l, geometryBuffer, faceNormalsBuffer, 10);

    viewport.context.drawImage(ctx.canvas, 0, 0);

    drawCalls += l;
    faces += l;

    layerOffset += 1 + count; // Jump to next partition header
  }

  stats.totalObjects = gameObjects.length;
  stats.visibleObjects = visibleObjectsBufferLen;
  stats.drawCalls = drawCalls;
  stats.faces = faces;
  stats.sortTime = totalSortTime;
  stats.dt = Date.now() - t0;
};

/**
 * GC-Friendly universal 1st-pass culling (Gribb-Hartmann method).
 * Works for Perspective and Orthographic.
 * @param {Array} gameobjects - Your array of objects
 * @param {Float32Array} m - Clip-space (View-Projection) Matrix
 * @param {Uint32Array} out_visibleBuffer - Buffer to store indices. First element stores length.
 * @param {Uint32Array} out_lightsIndexBuffer - Buffer to store light source indices. First element store length.
 * @returns {number} visibleCount
 */
function roughCull(gameobjects, m, out_visibleBuffer, out_lightsIndexBuffer) {
  let visibleCount = 0;
  let lightsCount = 0;

  // Matrix Registers (Extract once)
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

  // Plane Registers (Extract & Normalize once)
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

  const len = gameobjects.length;
  for (let i = 0; i < len; i++) {
    const obj = gameobjects[i];

    if (obj.meshRenderer && obj.meshRenderer.enabled) {
      const t = obj.transform.worldMatrix;
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

      out_visibleBuffer[++visibleCount] = i;
    }

    if (obj.light) {
      if (obj.light.type === 1) {
        //POINT
        const t = obj.transform.worldMatrix;

        // Sphere World Center
        const wx = t[12];
        const wy = t[13];
        const wz = t[14];

        // Max World Scale for Radius
        const sX = t[0] * t[0] + t[1] * t[1] + t[2] * t[2];
        const sY = t[4] * t[4] + t[5] * t[5] + t[6] * t[6];
        const sZ = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
        const rWorld = obj.light.range * Math.sqrt(Math.max(sX, sY, sZ));

        // Sphere-Plane Dot Products (Direct Register Access)
        if (lX * wx + lY * wy + lZ * wz + lW < -rWorld) continue;
        if (rX * wx + rY * wy + rZ * wz + rW < -rWorld) continue;
        if (bX * wx + bY * wy + bZ * wz + bW < -rWorld) continue;
        if (tX * wx + tY * wy + tZ * wz + tW < -rWorld) continue;
        if (nX * wx + nY * wy + nZ * wz + nW < -rWorld) continue;
        if (fX * wx + fY * wy + fZ * wz + fW < -rWorld) continue;

        out_lightsIndexBuffer[++lightsCount] = i;
      } else {
        //DIRECTIONAL
        out_lightsIndexBuffer[++lightsCount] = i;
      }
    }
  }

  out_visibleBuffer[0] = visibleCount;
  out_lightsIndexBuffer[0] = lightsCount;
}

/**
 * @function exactCull
 * @description Performs a second-pass AABB-Frustum intersection test using the Cohen-Sutherland
 * style Outcode algorithm. It projects the 8 corners of an object's bounding box into
 * Clip Space and culls objects where the entire volume resides outside any single frustum plane.
 * @name Cohen-Sutherland_AABB_Culling
 * @param {Uint32Array} out_visibilityBuffer - Indices of objects surviving the first pass. First element is length.
 * @param {Array<GameObject>} gameObjects - The source array of game objects.
 * @param {Float32Array} clipSpaceMatrix - The 4x4 View-Projection matrix.
 */
function exactCull(out_visibilityBuffer, gameObjects, clipSpaceMatrix) {
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

  //length stored in first element
  const l = out_visibilityBuffer[0] + 1;

  for (let i = 1; i < l; i++) {
    const objIdx = out_visibilityBuffer[i];
    const go = gameObjects[objIdx];

    // Matrix access (assumes World Matrix is already updated by 1st pass or hierarchy loop)
    const t = go.transform.worldMatrix;
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
        out_visibilityBuffer[++visibleCount] = objIdx;
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
        out_visibilityBuffer[++visibleCount] = objIdx;
      }
    }
  }

  out_visibilityBuffer[0] = visibleCount;
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
 * @param {Uint32Array} layerBuffers - Single 1D flat typed array storing GameObject indices.
 * @param {number} layerOffset - Starting index of the partition inside layerBuffers.
 * @param {Array} gameObjects - List of game objects in the scene.
 * @param {number} count - Number of active objects in the current layer.
 * @param {Float32Array} vec3Cache2 - Pre-allocated buffer for Camera-Space vertices [x, y, z].
 * @param {Float32Array} vec4Cache - Pre-allocated buffer for Clip-Space vertices [x, y, z, w].
 * @param {Uint32Array} indexBuffer - Array to store sequential face indices for sorting.
 * @param {Float32Array} depthBuffer - Stores the average camera-space Z-depth per face.
 * @param {Uint32Array} colorBuffer - Stores the packed RGBA face colors.
 * @param {Uint32Array} shaderTypeBuffer - Parallel array storing the shader type ID for each face.
 * @param {Uint8Array} shaderPassBuffer - Parallel array storing the shader pass index for each face.
 * @param {Float32Array} clipGeometryBuffer - Stores Camera-Space positions for lighting/fog.
 * @param {Float32Array} cameraLocalMatrix - The 4x4 World-to-Local (View) matrix.
 * @param {Float32Array} clipSpaceMatrix - The 4x4 View-Projection matrix.
 * @param {Float32Array} mat4Scratchpad1 - Reusable matrix for Model-View calculations.
 * @param {Float32Array} mat4Scratchpad2 - Reusable matrix for Model-View-Projection (MVP).
 * @param {Float32Array} mat3Scratchpad1 - Reusable matrix 9-element (3x3).
 * @param {Float32Array} faceNormalsBuffer - Buffer storing face normal vectors.
 * @param {Float32Array} vertexNormalsBuffer - Buffer storing vertex normal vectors.
 * @param {Float32Array} vertexBuffer - Stores 2D screen coordinates [x0, y0, x1, y1, x2, y2].
 * @param {Uint32Array} vertexIndexBuffer - Indexes of vertices in the vertexBuffer.
 * @param {Uint32Array} meshIndexBuffer - Parallel array storing the mesh index for each face.
 * @param {Uint32Array} meshFaceIndexBuffer - Parallel array storing the local face index within the mesh for each face.
 * @param {Int32Array} vMapping - Persistent buffer storing the vertexBuffer offset for the current mesh.
 * @param {Uint32Array} vTags - Persistent buffer storing the callId tag to validate vMapping entries.
 * @returns {number} The total count of processed (visible) faces.
 */
function destructMesh(
  layerBuffers,
  layerOffset,
  gameObjects,
  count,
  vec3Cache2,
  vec4Cache,
  indexBuffer,
  depthBuffer,
  colorBuffer,
  shaderTypeBuffer,
  shaderPassBuffer,
  clipGeometryBuffer,
  cameraLocalMatrix,
  clipSpaceMatrix,
  mat4Scratchpad1,
  mat4Scratchpad2,
  mat3Scratchpad1,
  faceNormalsBuffer,
  vertexNormalsBuffer,
  vertexBuffer,
  vertexIndexBuffer,
  meshIndexBuffer,
  meshFaceIndexBuffer,
  vMapping, // New: Persistent Int32Array(max_verts)
  vTags, // New: Persistent Uint32Array(max_verts)
) {
  let i = 0; // face counter
  let uniqueVertexCount = 0; // vertex pointer for vertexBuffer

  for (let j = 0; j < count; j++) {
    // Resolve the GameObject index and its corresponding meshRenderer component from the flat layerBuffers
    const goIdx = layerBuffers[layerOffset + j];
    const go = gameObjects[goIdx];
    const mesh = go.meshRenderer;
    if (mesh.constructor !== MeshComponent) continue;

    // Increment unique ID for this specific mesh
    ++callId;

    const W = go.transform.worldMatrix;

    // Precalculate mesh sorting bias once per mesh (constant bias)
    const depthBias = mesh.depthBias || 0;

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
      faceNormals = mesh.faceNormals,
      vn = mesh.vertexNormals;

    // NM Normal Matrix calculation per mesh
    computeNormalMatrix(mat3Scratchpad1, W);

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

      const v0 = idx0 << 2,
        v1 = idx1 << 2,
        v2 = idx2 << 2; // Fast multiply by 4

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
        const vx = verts[vo],
          vy = verts[vo + 1],
          vz = verts[vo + 2];
        vec4Cache[v0] = m0 * vx + m4 * vy + m8 * vz + m12;
        vec4Cache[v0 + 1] = m1 * vx + m5 * vy + m9 * vz + m13;
        vec4Cache[v0 + 2] = m2 * vx + m6 * vy + m10 * vz + m14;
        vec4Cache[v0 + 3] = m3 * vx + m7 * vy + m11 * vz + m15;
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
        const vx = verts[vo],
          vy = verts[vo + 1],
          vz = verts[vo + 2];
        vec4Cache[v1] = m0 * vx + m4 * vy + m8 * vz + m12;
        vec4Cache[v1 + 1] = m1 * vx + m5 * vy + m9 * vz + m13;
        vec4Cache[v1 + 2] = m2 * vx + m6 * vy + m10 * vz + m14;
        vec4Cache[v1 + 3] = m3 * vx + m7 * vy + m11 * vz + m15;
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
        const vx = verts[vo],
          vy = verts[vo + 1],
          vz = verts[vo + 2];
        vec4Cache[v2] = m0 * vx + m4 * vy + m8 * vz + m12;
        vec4Cache[v2 + 1] = m1 * vx + m5 * vy + m9 * vz + m13;
        vec4Cache[v2 + 2] = m2 * vx + m6 * vy + m10 * vz + m14;
        vec4Cache[v2 + 3] = m3 * vx + m7 * vy + m11 * vz + m15;
        vTags[idx2] = callId;
        vMapping[idx2] = -1;
      }

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
      meshIndexBuffer[i] = j;
      meshFaceIndexBuffer[i] = f;

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
      colorBuffer[i] = mesh.colors[cIdx];
      shaderTypeBuffer[i] = mesh.shaderType;
      shaderPassBuffer[i] = 0; // default to shader pass 0

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
        vMapping[idx0] = v0Idx; // Store the buffer offset
        uniqueVertexCount++;

        // Vertex 0 Normal
        const vn0 = idx0 * 3;
        const nx0 = vn[vn0] * nm0 + vn[vn0 + 1] * nm3 + vn[vn0 + 2] * nm6;
        const ny0 = vn[vn0] * nm1 + vn[vn0 + 1] * nm4 + vn[vn0 + 2] * nm7;
        const nz0 = vn[vn0] * nm2 + vn[vn0 + 1] * nm5 + vn[vn0 + 2] * nm8;
        const mag0 = Math.sqrt(nx0 * nx0 + ny0 * ny0 + nz0 * nz0);
        const invMag0 = mag0 > 0 ? 1 / mag0 : 0;
        vertexNormalsBuffer[v0Idx] = nx0 * invMag0;
        vertexNormalsBuffer[v0Idx + 1] = ny0 * invMag0;
        vertexNormalsBuffer[v0Idx + 2] = nz0 * invMag0;
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
        vMapping[idx1] = v1Idx;
        uniqueVertexCount++;

        // Vertex 1 Normal
        const vn1 = idx1 * 3;
        const nx1 = vn[vn1] * nm0 + vn[vn1 + 1] * nm3 + vn[vn1 + 2] * nm6;
        const ny1 = vn[vn1] * nm1 + vn[vn1 + 1] * nm4 + vn[vn1 + 2] * nm7;
        const nz1 = vn[vn1] * nm2 + vn[vn1 + 1] * nm5 + vn[vn1 + 2] * nm8;
        const mag1 = Math.sqrt(nx1 * nx1 + ny1 * ny1 + nz1 * nz1);
        const invMag1 = mag1 > 0 ? 1 / mag1 : 0;
        vertexNormalsBuffer[v1Idx] = nx1 * invMag1;
        vertexNormalsBuffer[v1Idx + 1] = ny1 * invMag1;
        vertexNormalsBuffer[v1Idx + 2] = nz1 * invMag1;
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
        vMapping[idx2] = v2Idx;
        uniqueVertexCount++;

        // Vertex 2 Normal
        const vn2 = idx2 * 3;
        const nx2 = vn[vn2] * nm0 + vn[vn2 + 1] * nm3 + vn[vn2 + 2] * nm6;
        const ny2 = vn[vn2] * nm1 + vn[vn2 + 1] * nm4 + vn[vn2 + 2] * nm7;
        const nz2 = vn[vn2] * nm2 + vn[vn2 + 1] * nm5 + vn[vn2 + 2] * nm8;
        const mag2 = Math.sqrt(nx2 * nx2 + ny2 * ny2 + nz2 * nz2);
        const invMag2 = mag2 > 0 ? 1 / mag2 : 0;
        vertexNormalsBuffer[v2Idx] = nx2 * invMag2;
        vertexNormalsBuffer[v2Idx + 1] = ny2 * invMag2;
        vertexNormalsBuffer[v2Idx + 2] = nz2 * invMag2;
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

      depthBuffer[i] = (v0z + v1z + v2z) * 0.33333 + depthBias;

      const fnIdx = i * 3;
      faceNormalsBuffer[fnIdx] = wnx * invMag;
      faceNormalsBuffer[fnIdx + 1] = wny * invMag;
      faceNormalsBuffer[fnIdx + 2] = wnz * invMag;

      i++;
    }
  }
  return i;
}

/**
 * Draw
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context
 * @param {Float32Array} vertexBuffer - Array of vertices in the format [x0, y0, color0, x1, y1, color1, x2, y2, color2]
 * @param {Uint32Array} vertexIndexBuffer - Array of indices in the format [i0, i1, i2, i3, i4, i5, ...]
 * @param {Uint32Array} indexBuffer - Depth-sorted array of face indices in the format [i0, i1, i2, i3, i4, i5, ...]
 * @param {Uint32Array} colorBuffer - Array of face 32-bit color index
 * @param {Uint8Array} shaderTypeBuffer - Parallel array storing the packed shader type and pass ID for each face.
 * @param {number} count - Number of elements in indexBuffer
 * @param {number} offset - Starting index of the triangles to draw
 * @param {boolean} toClear - Should ctx be cleared before drawing?
 * @param {number} w - Canvas width
 * @param {number} h - Canvas height
 * @param {Float32Array} clipGeometryBuffer - Array of clip geometry vertices in the format [x0, y0, z0, x1, y1, z1, ...]
 * @param {Float32Array} depthBuffer - Array of depth values for each face
 * @param {number} fogType - Fog type
 * @param {number[]} fogColor - Fog color
 * @param {number} fogNearPane - Near plane distance
 * @param {number} fogFarPane - Far plane distance
 * @param scene
 * @param {number} lightDirBuffer - Array of a light direction in the format [x, y, z]
 * @param {number} ambientLightRgb - Ambient light RGB color
 * @param {Float32Array} faceNormalsBuffer - Array of face normals in the format [nx0, ny0, nz0, nx1, ny1, nz1, ...]
 * @param {Float32Array} vertexNormalsBuffer - Array of vertex normals in the format [nx0, ny0, nz0, nx1, ny1, nz1, ...]
 * @param {Uint32Array} meshIndexBuffer - Parallel array storing the mesh index for each face.
 * @param {Uint32Array} meshFaceIndexBuffer - Parallel array storing the local face index within the mesh for each face.
 * @param {Uint32Array} layerBuffers - Single 1D flat typed array storing GameObject indices.
 * @param {number} layerOffset - Starting index of the partition inside layerBuffers.
 * @param {boolean} wireframe - Should faces be drawn as wireframes?
 * @param {Uint32Array} lightsIndexBuffer - Indices of active lights.
 * @param {Object} gameObjects - Dictionary of game objects in the scene.
 */
function drawTriangles(
  ctx,
  vertexBuffer,
  vertexIndexBuffer,
  indexBuffer,
  colorBuffer,
  shaderTypeBuffer,
  count,
  offset,
  toClear,
  w,
  h,
  clipGeometryBuffer,
  depthBuffer,
  fogType,
  fogColor,
  fogNearPane,
  fogFarPane,
  scene,
  lightDirBuffer,
  ambientLightRgb,
  faceNormalsBuffer,
  vertexNormalsBuffer,
  meshIndexBuffer,
  meshFaceIndexBuffer,
  layerBuffers,
  layerOffset,
  wireframe,
  lightsIndexBuffer,
  gameObjects,
) {
  const halfW = w * 0.5,
    halfH = h * 0.5;

  const len = offset + count;

  if (toClear) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  let prevFillStyle = -1; // -1 = unset, number = quantized color key in PALLETE16
  let prevStrokeStyle = -1; // -1 = unset, number = quantized color key in PALLETE16
  let prevLineStyle = -1;

  for (let i = offset; i < len; i++) {
    const idx = indexBuffer[i]; //take face index

    //take all three vec2 indices of the face
    const v0Idx = vertexIndexBuffer[idx * 3];
    const v1Idx = vertexIndexBuffer[idx * 3 + 1];
    const v2Idx = vertexIndexBuffer[idx * 3 + 2];

    const px0 = vertexBuffer[v0Idx] * halfW + halfW;
    const py0 = vertexBuffer[v0Idx + 1] * halfH + halfH;
    const px1 = vertexBuffer[v1Idx] * halfW + halfW;
    const py1 = vertexBuffer[v1Idx + 1] * halfH + halfH;
    const px2 = vertexBuffer[v2Idx] * halfW + halfW;
    const py2 = vertexBuffer[v2Idx + 1] * halfH + halfH;

    // Calculate centroid
    const cx = (px0 + px1 + px2) * 0.33333;
    const cy = (py0 + py1 + py2) * 0.33333;

    // Expand vertices outward from centroid to compensate for subpixel gaps
    const dx0 = px0 - cx;
    const dy0 = py0 - cy;
    const a0 = Math.abs(dx0);
    const b0 = Math.abs(dy0);
    const len0 = a0 > b0 ? a0 + 0.4 * b0 : b0 + 0.4 * a0;
    const invLen0 = len0 > 0 ? EXPANSION_COEFFICIENT / len0 : 0;
    const epx0 = px0 + dx0 * invLen0;
    const epy0 = py0 + dy0 * invLen0;

    const dx1 = px1 - cx;
    const dy1 = py1 - cy;
    const a1 = Math.abs(dx1);
    const b1 = Math.abs(dy1);
    const len1 = a1 > b1 ? a1 + 0.4 * b1 : b1 + 0.4 * a1;
    const invLen1 = len1 > 0 ? EXPANSION_COEFFICIENT / len1 : 0;
    const epx1 = px1 + dx1 * invLen1;
    const epy1 = py1 + dy1 * invLen1;

    const dx2 = px2 - cx;
    const dy2 = py2 - cy;
    const a2 = Math.abs(dx2);
    const b2 = Math.abs(dy2);
    const len2 = a2 > b2 ? a2 + 0.4 * b2 : b2 + 0.4 * a2;
    const invLen2 = len2 > 0 ? EXPANSION_COEFFICIENT / len2 : 0;
    const epx2 = px2 + dx2 * invLen2;
    const epy2 = py2 + dy2 * invLen2;

    switch (wireframe ? 3 : shaderTypeBuffer[idx]) {
      case 0: {
        //FLAT (light shading + fog)

        // Calculating face lightning
        const color32 = colorBuffer[idx];
        let r = color32 >>> 16;
        let g = (color32 >>> 8) & 255;
        let b = color32 & 255;

        let ir = (ambientLightRgb >>> 16) & 255;
        let ig = (ambientLightRgb >>> 8) & 255;
        let ib = ambientLightRgb & 255;

        const wnx = faceNormalsBuffer[idx * 3];
        const wny = faceNormalsBuffer[idx * 3 + 1];
        const wnz = faceNormalsBuffer[idx * 3 + 2];

        const lightsIndexBufferLen = lightsIndexBuffer[0] + 1;
        for (let l = 1; l < lightsIndexBufferLen; l++) {
          const lightGO = gameObjects[lightsIndexBuffer[l]];
          if (lightGO.light.type === 0) {
            // DIRECTIONAL
            const lx = -lightGO.transform.worldMatrix[8];
            const ly = -lightGO.transform.worldMatrix[9];
            const lz = -lightGO.transform.worldMatrix[10];

            const dot = wnx * lx + wny * ly + wnz * lz;
            if (dot > 0) {
              ir += ((lightGO.light.color >>> 16) & 255) * dot;
              ig += ((lightGO.light.color >>> 8) & 255) * dot;
              ib += (lightGO.light.color & 255) * dot;
            }
          }
        }

        // 1 / 255 = 0.0039215
        ir *= 0.0039215;
        ig *= 0.0039215;
        ib *= 0.0039215;

        // lambertian lightning
        r = (r * ir) | 0;
        g = (g * ig) | 0;
        b = (b * ib) | 0;

        // Math.min
        r = r > 255 ? 255 : r;
        g = g > 255 ? 255 : g;
        b = b > 255 ? 255 : b;

        // Calculating fog
        const depth = depthBuffer[idx];
        let fogAmount = 0;

        if (
          fogType === CameraComponent.FogType.RADIAL_FAST ||
          fogType === CameraComponent.FogType.RADIAL
        ) {
          const w0x = clipGeometryBuffer[idx * 9];
          const w0y = clipGeometryBuffer[idx * 9 + 1];
          const w0z = clipGeometryBuffer[idx * 9 + 2];
          const w1x = clipGeometryBuffer[idx * 9 + 3];
          const w1y = clipGeometryBuffer[idx * 9 + 4];
          const w1z = clipGeometryBuffer[idx * 9 + 5];
          const w2x = clipGeometryBuffer[idx * 9 + 6];
          const w2y = clipGeometryBuffer[idx * 9 + 7];
          const w2z = clipGeometryBuffer[idx * 9 + 8];

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
          const fogR = fogColor >>> 16;
          const fogG = (fogColor >>> 8) & 255;
          const fogB = fogColor & 255;
          r = (r * (1 - fogAmount) + fogR * fogAmount) | 0;
          g = (g * (1 - fogAmount) + fogG * fogAmount) | 0;
          b = (b * (1 - fogAmount) + fogB * fogAmount) | 0;
        }

        // Handle Textures
        const mIdx = meshIndexBuffer[idx];
        // Resolve mesh from the flat layerBuffers array using layerOffset and mesh index
        const mesh = gameObjects[layerBuffers[layerOffset + mIdx]].meshRenderer;
        const img = mesh.textureImage;

        if (img && img.complete && img.naturalWidth > 0 && mesh.uvs) {
          const mFaceIdx = meshFaceIndexBuffer[idx];
          const uvs = mesh.uvs;
          // original face vertex indices from mesh
          const ov0 = mesh.faces[mFaceIdx] * 2;
          const ov1 = mesh.faces[mFaceIdx + 1] * 2;
          const ov2 = mesh.faces[mFaceIdx + 2] * 2;

          const U0 = uvs[ov0] * img.width;
          const V0 = uvs[ov0 + 1] * img.height;
          const U1 = uvs[ov1] * img.width;
          const V1 = uvs[ov1 + 1] * img.height;
          const U2 = uvs[ov2] * img.width;
          const V2 = uvs[ov2 + 1] * img.height;

          const delta = U0 * (V1 - V2) - V0 * (U1 - U2) + (U1 * V2 - U2 * V1);

          if (Math.abs(delta) > 0.00001) {
            const invDelta = 1 / delta;
            //TODO: cant we reuse those from previous calculations?
            const a =
              (px0 * (V1 - V2) + px1 * (V2 - V0) + px2 * (V0 - V1)) * invDelta;
            const c =
              (px0 * (U2 - U1) + px1 * (U0 - U2) + px2 * (U1 - U0)) * invDelta;
            const e =
              (px0 * (U1 * V2 - U2 * V1) +
                px1 * (U2 * V0 - U0 * V2) +
                px2 * (U0 * V1 - U1 * V0)) *
              invDelta;

            const b =
              (py0 * (V1 - V2) + py1 * (V2 - V0) + py2 * (V0 - V1)) * invDelta;
            const d =
              (py0 * (U2 - U1) + py1 * (U0 - U2) + py2 * (U1 - U0)) * invDelta;
            const f =
              (py0 * (U1 * V2 - U2 * V1) +
                py1 * (U2 * V0 - U0 * V2) +
                py2 * (U0 * V1 - U1 * V0)) *
              invDelta;

            ctx.save();

            ctx.beginPath();
            ctx.moveTo(epx0, epy0);
            ctx.lineTo(epx1, epy1);
            ctx.lineTo(epx2, epy2);
            ctx.closePath();

            ctx.clip(); // clip to the expanded triangle
            ctx.setTransform(a, b, c, d, e, f);
            ctx.drawImage(img, 0, 0);
            ctx.restore();

            // Apply RGB Lighting (Multiply)
            const clampR = ir >= 1.0 ? 255 : (ir * 255) | 0;
            const clampG = ig >= 1.0 ? 255 : (ig * 255) | 0;
            const clampB = ib >= 1.0 ? 255 : (ib * 255) | 0;

            // Quantize 8-bit color channels to 5-6-5 bits
            const qrL = clampR & 0xf8; // Keep 5 bits
            const qgL = clampG & 0xfc; // Keep 6 bits
            const qbL = clampB & 0xf8; // Keep 5 bits

            // Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
            const color16L = (qrL << 8) | (qgL << 3) | (qbL >> 3);

            ctx.globalCompositeOperation = "multiply";

            if (prevFillStyle !== color16L) {
              ctx.fillStyle = PALETTE_16BIT[color16L];
              prevFillStyle = color16L;
            }

            ctx.fill();

            // Restore default blending mode for the rest of the renderer
            ctx.globalCompositeOperation = "source-over";

            // Apply Fog (Source-Over)
            if (fogAmount > 0) {
              const fogR = fogColor >>> 16;
              const fogG = (fogColor >>> 8) & 255;
              const fogB = fogColor & 255;
              // Quantize 8-bit color channels to 5-6-5 bits
              const qrF = fogR & 0xf8; // Keep 5 bits
              const qgF = fogG & 0xfc; // Keep 6 bits
              const qbF = fogB & 0xf8; // Keep 5 bits

              // Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
              const color16F = (qrF << 8) | (qgF << 3) | (qbF >> 3);

              ctx.globalAlpha = fogAmount;

              if (prevStrokeStyle !== color16F) {
                ctx.strokeStyle = PALETTE_16BIT[color16F];
                prevStrokeStyle = color16F;
              }

              if (prevLineStyle !== 10) {
                ctx.lineWidth = 1;
                ctx.lineJoin = "miter";
                prevLineStyle = 10;
              }

              ctx.stroke();

              if (prevFillStyle !== color16F) {
                ctx.fillStyle = PALETTE_16BIT[color16F];
                prevFillStyle = color16F;
              }

              ctx.fill();

              // Reset alpha
              ctx.globalAlpha = 1.0;
            }

            break;
          }
        }

        ctx.beginPath();
        ctx.moveTo(px0, py0);
        ctx.lineTo(px1, py1);
        ctx.lineTo(px2, py2);
        ctx.closePath();

        // Quantize 8-bit color channels to 5-6-5 bits
        const qr = r & 0xf8; // Keep 5 bits
        const qg = g & 0xfc; // Keep 6 bits
        const qb = b & 0xf8; // Keep 5 bits

        // Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
        const color16 = (qr << 8) | (qg << 3) | (qb >> 3);

        if (prevStrokeStyle !== color16) {
          ctx.strokeStyle = PALETTE_16BIT[color16];
          prevStrokeStyle = color16;
        }

        if (prevLineStyle !== 10) {
          ctx.lineWidth = 1;
          ctx.lineJoin = "miter";
          prevLineStyle = 10;
        }

        ctx.stroke();

        if (prevFillStyle !== color16) {
          ctx.fillStyle = PALETTE_16BIT[color16];
          prevFillStyle = color16;
        }

        ctx.fill();

        break;
      }
      case 1: {
        //EMISSIVE (no light shading, just fog)
        const color32 = colorBuffer[idx];
        let r = color32 >>> 16;
        let g = (color32 >>> 8) & 255;
        let b = color32 & 255;

        // Calculating fog
        const depth = depthBuffer[idx];
        let fogAmount = 0;

        if (
          fogType === CameraComponent.FogType.RADIAL_FAST ||
          fogType === CameraComponent.FogType.RADIAL
        ) {
          const w0x = clipGeometryBuffer[idx * 9];
          const w0y = clipGeometryBuffer[idx * 9 + 1];
          const w0z = clipGeometryBuffer[idx * 9 + 2];
          const w1x = clipGeometryBuffer[idx * 9 + 3];
          const w1y = clipGeometryBuffer[idx * 9 + 4];
          const w1z = clipGeometryBuffer[idx * 9 + 5];
          const w2x = clipGeometryBuffer[idx * 9 + 6];
          const w2y = clipGeometryBuffer[idx * 9 + 7];
          const w2z = clipGeometryBuffer[idx * 9 + 8];

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

        //TODO: pass this via mesh renderer
        const glowPower = 0; // 0 = no glow, 1 = full glow
        let effectiveFog = Math.max(0, fogAmount - glowPower);

        if (effectiveFog > 1) effectiveFog = 1;

        // Blend the mesh color with the fog color
        if (effectiveFog > 0) {
          const fogR = fogColor >>> 16;
          const fogG = (fogColor >>> 8) & 255;
          const fogB = fogColor & 255;
          r = (r * (1 - effectiveFog) + fogR * effectiveFog) | 0;
          g = (g * (1 - effectiveFog) + fogG * effectiveFog) | 0;
          b = (b * (1 - effectiveFog) + fogB * effectiveFog) | 0;
        }

        // Handle Textures
        const mIdx = meshIndexBuffer[idx];
        // Resolve mesh from the flat layerBuffers array using layerOffset and mesh index
        const mesh = gameObjects[layerBuffers[layerOffset + mIdx]].meshRenderer;
        const img = mesh.textureImage;

        if (img && img.complete && img.naturalWidth > 0 && mesh.uvs) {
          const mFaceIdx = meshFaceIndexBuffer[idx];
          const uvs = mesh.uvs;
          // original face vertex indices from mesh
          const ov0 = mesh.faces[mFaceIdx] * 2;
          const ov1 = mesh.faces[mFaceIdx + 1] * 2;
          const ov2 = mesh.faces[mFaceIdx + 2] * 2;

          const U0 = uvs[ov0] * img.width;
          const V0 = uvs[ov0 + 1] * img.height;
          const U1 = uvs[ov1] * img.width;
          const V1 = uvs[ov1 + 1] * img.height;
          const U2 = uvs[ov2] * img.width;
          const V2 = uvs[ov2 + 1] * img.height;

          const delta = U0 * (V1 - V2) - V0 * (U1 - U2) + (U1 * V2 - U2 * V1);

          if (Math.abs(delta) > 0.00001) {
            const invDelta = 1 / delta;
            const a =
              (px0 * (V1 - V2) + px1 * (V2 - V0) + px2 * (V0 - V1)) * invDelta;
            const c =
              (px0 * (U2 - U1) + px1 * (U0 - U2) + px2 * (U1 - U0)) * invDelta;
            const e =
              (px0 * (U1 * V2 - U2 * V1) +
                px1 * (U2 * V0 - U0 * V2) +
                px2 * (U0 * V1 - U1 * V0)) *
              invDelta;

            const b =
              (py0 * (V1 - V2) + py1 * (V2 - V0) + py2 * (V0 - V1)) * invDelta;
            const d =
              (py0 * (U2 - U1) + py1 * (U0 - U2) + py2 * (U1 - U0)) * invDelta;
            const f =
              (py0 * (U1 * V2 - U2 * V1) +
                py1 * (U2 * V0 - U0 * V2) +
                py2 * (U0 * V1 - U1 * V0)) *
              invDelta;

            ctx.save();

            ctx.beginPath();
            ctx.moveTo(epx0, epy0);
            ctx.lineTo(epx1, epy1);
            ctx.lineTo(epx2, epy2);
            ctx.closePath();

            ctx.clip(); // clip to the expanded triangle
            ctx.setTransform(a, b, c, d, e, f);
            ctx.drawImage(img, 0, 0);
            ctx.restore();

            // Apply Fog (Source-Over)
            if (effectiveFog > 0) {
              const fogR = fogColor >>> 16;
              const fogG = (fogColor >>> 8) & 255;
              const fogB = fogColor & 255;
              // Quantize 8-bit color channels to 5-6-5 bits
              const qrF = fogR & 0xf8; // Keep 5 bits
              const qgF = fogG & 0xfc; // Keep 6 bits
              const qbF = fogB & 0xf8; // Keep 5 bits

              // Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
              const color16F = (qrF << 8) | (qgF << 3) | (qbF >> 3);

              ctx.globalAlpha = effectiveFog;

              if (prevStrokeStyle !== color16F) {
                ctx.strokeStyle = PALETTE_16BIT[color16F];
                prevStrokeStyle = color16F;
              }

              if (prevLineStyle !== 10) {
                ctx.lineWidth = 1;
                ctx.lineJoin = "miter";
                prevLineStyle = 10;
              }

              ctx.stroke();

              if (prevFillStyle !== color16F) {
                ctx.fillStyle = PALETTE_16BIT[color16F];
                prevFillStyle = color16F;
              }

              ctx.fill();

              // Reset alpha
              ctx.globalAlpha = 1.0;
            }

            break;
          }
        }

        ctx.beginPath();
        ctx.moveTo(epx0, epy0);
        ctx.lineTo(epx1, epy1);
        ctx.lineTo(epx2, epy2);
        ctx.closePath();

        // Quantize 8-bit color channels to 5-6-5 bits
        const qr = r & 0xf8; // Keep 5 bits
        const qg = g & 0xfc; // Keep 6 bits
        const qb = b & 0xf8; // Keep 5 bits

        // Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
        const color16 = (qr << 8) | (qg << 3) | (qb >> 3);

        if (prevFillStyle !== color16) {
          ctx.fillStyle = PALETTE_16BIT[color16];
          prevFillStyle = color16;
        }

        ctx.fill();

        break;
      }
      case 2: {
        // UNLIT (no light shading, no fog, just mesh color)
        const color32 = colorBuffer[idx];
        let r = color32 >>> 16;
        let g = (color32 >>> 8) & 255;
        let b = color32 & 255;

        // Handle Textures
        const mIdx = meshIndexBuffer[idx];
        // Resolve mesh from the flat layerBuffers array using layerOffset and mesh index
        const mesh = gameObjects[layerBuffers[layerOffset + mIdx]].meshRenderer;
        const img = mesh.textureImage;

        if (img && img.complete && img.naturalWidth > 0 && mesh.uvs) {
          const mFaceIdx = meshFaceIndexBuffer[idx];
          const uvs = mesh.uvs;
          // original face vertex indices from mesh
          const ov0 = mesh.faces[mFaceIdx] * 2;
          const ov1 = mesh.faces[mFaceIdx + 1] * 2;
          const ov2 = mesh.faces[mFaceIdx + 2] * 2;

          const U0 = uvs[ov0] * img.width;
          const V0 = uvs[ov0 + 1] * img.height;
          const U1 = uvs[ov1] * img.width;
          const V1 = uvs[ov1 + 1] * img.height;
          const U2 = uvs[ov2] * img.width;
          const V2 = uvs[ov2 + 1] * img.height;

          const delta = U0 * (V1 - V2) - V0 * (U1 - U2) + (U1 * V2 - U2 * V1);

          if (Math.abs(delta) > 0.00001) {
            const invDelta = 1 / delta;
            const a =
              (px0 * (V1 - V2) + px1 * (V2 - V0) + px2 * (V0 - V1)) * invDelta;
            const c =
              (px0 * (U2 - U1) + px1 * (U0 - U2) + px2 * (U1 - U0)) * invDelta;
            const e =
              (px0 * (U1 * V2 - U2 * V1) +
                px1 * (U2 * V0 - U0 * V2) +
                px2 * (U0 * V1 - U1 * V0)) *
              invDelta;

            const b =
              (py0 * (V1 - V2) + py1 * (V2 - V0) + py2 * (V0 - V1)) * invDelta;
            const d =
              (py0 * (U2 - U1) + py1 * (U0 - U2) + py2 * (U1 - U0)) * invDelta;
            const f =
              (py0 * (U1 * V2 - U2 * V1) +
                py1 * (U2 * V0 - U0 * V2) +
                py2 * (U0 * V1 - U1 * V0)) *
              invDelta;

            ctx.save();

            ctx.beginPath();
            ctx.moveTo(epx0, epy0);
            ctx.lineTo(epx1, epy1);
            ctx.lineTo(epx2, epy2);
            ctx.closePath();

            ctx.clip(); // clip to the expanded triangle
            ctx.setTransform(a, b, c, d, e, f);
            ctx.drawImage(img, 0, 0);
            ctx.restore();

            break;
          }
        }

        ctx.beginPath();
        ctx.moveTo(epx0, epy0);
        ctx.lineTo(epx1, epy1);
        ctx.lineTo(epx2, epy2);
        ctx.closePath();

        // Quantize 8-bit color channels to 5-6-5 bits
        const qr = r & 0xf8; // Keep 5 bits
        const qg = g & 0xfc; // Keep 6 bits
        const qb = b & 0xf8; // Keep 5 bits

        // Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
        const color16 = (qr << 8) | (qg << 3) | (qb >> 3);

        if (prevFillStyle !== color16) {
          ctx.fillStyle = PALETTE_16BIT[color16];
          prevFillStyle = color16;
        }

        ctx.fill();

        break;
      }
      case 3: {
        // WIREFRAME
        ctx.beginPath();
        ctx.moveTo(px0, py0);
        ctx.lineTo(px1, py1);
        ctx.lineTo(px2, py2);
        ctx.closePath();

        if (prevStrokeStyle !== 31) {
          ctx.strokeStyle = PALETTE_16BIT[31]; // 0xf8 >> 3 = 31
          prevStrokeStyle = 31;
        }

        if (prevLineStyle !== 5) {
          ctx.lineWidth = 0.5;
          ctx.lineJoin = "miter";
          prevLineStyle = 5;
        }

        ctx.stroke();

        break;
      }
      case 4: {
        // SMOOTH (Gouraud Shading)
        const color32 = colorBuffer[idx];
        const r = color32 >>> 16;
        const g = (color32 >>> 8) & 255;
        const b = color32 & 255;

        let litR = ambientLightRgb >>> 16;
        let litG = (ambientLightRgb >>> 8) & 255;
        let litB = ambientLightRgb & 255;

        let ir0 = litR,
          ig0 = litG,
          ib0 = litB,
          ir1 = litR,
          ig1 = litG,
          ib1 = litB,
          ir2 = litR,
          ig2 = litG,
          ib2 = litB;

        let nx0 = vertexNormalsBuffer[v0Idx],
          ny0 = vertexNormalsBuffer[v0Idx + 1],
          nz0 = vertexNormalsBuffer[v0Idx + 2];
        let nx1 = vertexNormalsBuffer[v1Idx],
          ny1 = vertexNormalsBuffer[v1Idx + 1],
          nz1 = vertexNormalsBuffer[v1Idx + 2];
        let nx2 = vertexNormalsBuffer[v2Idx],
          ny2 = vertexNormalsBuffer[v2Idx + 1],
          nz2 = vertexNormalsBuffer[v2Idx + 2];

        const lightsIndexBufferLen = lightsIndexBuffer[0] + 1;
        for (let l = 1; l < lightsIndexBufferLen; l++) {
          const lightGO = gameObjects[lightsIndexBuffer[l]];
          // DIRECTIONAL
          if (lightGO.light.type === 0) {
            const lightR = lightGO.light.color >>> 16;
            const lightG = (lightGO.light.color >>> 8) & 255;
            const lightB = lightGO.light.color & 255;

            const lx = -lightGO.transform.worldMatrix[8];
            const ly = -lightGO.transform.worldMatrix[9];
            const lz = -lightGO.transform.worldMatrix[10];

            let d0 = nx0 * lx + ny0 * ly + nz0 * lz;
            let d1 = nx1 * lx + ny1 * ly + nz1 * lz;
            let d2 = nx2 * lx + ny2 * ly + nz2 * lz;

            if (d0 > 0) {
              ir0 += lightR * d0;
              ig0 += lightG * d0;
              ib0 += lightB * d0;
            }

            if (d1 > 0) {
              ir1 += lightR * d1;
              ig1 += lightG * d1;
              ib1 += lightB * d1;
            }

            if (d2 > 0) {
              ir2 += lightR * d2;
              ig2 += lightG * d2;
              ib2 += lightB * d2;
            }
          }
        }

        // 1 / 255 = 0.0039215
        ir0 *= 0.0039215;
        ig0 *= 0.0039215;
        ib0 *= 0.0039215;

        ir1 *= 0.0039215;
        ig1 *= 0.0039215;
        ib1 *= 0.0039215;

        ir2 *= 0.0039215;
        ig2 *= 0.0039215;
        ib2 *= 0.0039215;

        let i0 = Math.min(Math.max(ir0, ig0, ib0), 1);
        let i1 = Math.min(Math.max(ir1, ig1, ib1), 1);
        let i2 = Math.min(Math.max(ir2, ig2, ib2), 1);

        // Calculating fog based on face centroid
        let fogAmount = 0;
        const depth = depthBuffer[idx];

        if (
          fogType === CameraComponent.FogType.RADIAL_FAST ||
          fogType === CameraComponent.FogType.RADIAL
        ) {
          const w0x = clipGeometryBuffer[idx * 9];
          const w0y = clipGeometryBuffer[idx * 9 + 1];
          const w0z = clipGeometryBuffer[idx * 9 + 2];
          const w1x = clipGeometryBuffer[idx * 9 + 3];
          const w1y = clipGeometryBuffer[idx * 9 + 4];
          const w1z = clipGeometryBuffer[idx * 9 + 5];
          const w2x = clipGeometryBuffer[idx * 9 + 6];
          const w2y = clipGeometryBuffer[idx * 9 + 7];
          const w2z = clipGeometryBuffer[idx * 9 + 8];

          const cx = (w0x + w1x + w2x) * 0.33333;
          const cy = (w0y + w1y + w2y) * 0.33333;
          const cz = (w0z + w1z + w2z) * 0.33333;

          if (fogType === CameraComponent.FogType.RADIAL_FAST) {
            const nearSq = fogNearPane * fogNearPane;
            const farSq = fogFarPane * fogFarPane;
            const invFogRangeSq = 1.0 / (farSq - nearSq);
            const distSq = cx * cx + cy * cy + cz * cz;
            fogAmount = (distSq - nearSq) * invFogRangeSq;
          } else {
            const distance = Math.sqrt(cx * cx + cy * cy + cz * cz);
            fogAmount = (distance - fogNearPane) / (fogFarPane - fogNearPane);
          }
        } else if (fogType === CameraComponent.FogType.LINEAR) {
          fogAmount = (depth - fogNearPane) / (fogFarPane - fogNearPane);
        }

        if (fogAmount > 1) fogAmount = 1;

        // Handle Textures
        const mIdx = meshIndexBuffer[idx];
        // Resolve mesh from the flat layerBuffers array using layerOffset and mesh index
        const mesh = gameObjects[layerBuffers[layerOffset + mIdx]].meshRenderer;
        const img = mesh.textureImage;

        if (img && img.complete && img.naturalWidth > 0 && mesh.uvs) {
          const mFaceIdx = meshFaceIndexBuffer[idx];
          const uvs = mesh.uvs;
          // original face vertex indices from mesh
          const ov0 = mesh.faces[mFaceIdx] * 2;
          const ov1 = mesh.faces[mFaceIdx + 1] * 2;
          const ov2 = mesh.faces[mFaceIdx + 2] * 2;

          const U0 = uvs[ov0] * img.width;
          const V0 = uvs[ov0 + 1] * img.height;
          const U1 = uvs[ov1] * img.width;
          const V1 = uvs[ov1 + 1] * img.height;
          const U2 = uvs[ov2] * img.width;
          const V2 = uvs[ov2 + 1] * img.height;

          const delta = U0 * (V1 - V2) - V0 * (U1 - U2) + (U1 * V2 - U2 * V1);

          if (Math.abs(delta) > 0.00001) {
            const invDelta = 1 / delta;
            const a =
              (px0 * (V1 - V2) + px1 * (V2 - V0) + px2 * (V0 - V1)) * invDelta;
            const c =
              (px0 * (U2 - U1) + px1 * (U0 - U2) + px2 * (U1 - U0)) * invDelta;
            const e =
              (px0 * (U1 * V2 - U2 * V1) +
                px1 * (U2 * V0 - U0 * V2) +
                px2 * (U0 * V1 - U1 * V0)) *
              invDelta;

            const b =
              (py0 * (V1 - V2) + py1 * (V2 - V0) + py2 * (V0 - V1)) * invDelta;
            const d =
              (py0 * (U2 - U1) + py1 * (U0 - U2) + py2 * (U1 - U0)) * invDelta;
            const f =
              (py0 * (U1 * V2 - U2 * V1) +
                py1 * (U2 * V0 - U0 * V2) +
                py2 * (U0 * V1 - U1 * V0)) *
              invDelta;

            ctx.save();

            ctx.beginPath();
            ctx.moveTo(epx0, epy0);
            ctx.lineTo(epx1, epy1);
            ctx.lineTo(epx2, epy2);
            ctx.closePath();

            ctx.clip(); // clip to the expanded triangle
            ctx.setTransform(a, b, c, d, e, f);
            ctx.drawImage(img, 0, 0);
            ctx.restore();

            // Calculate vertex lighting color keys (clamped and quantized to 5-6-5)
            const lr0 = ir0 >= 1.0 ? 255 : (ir0 * 255) | 0;
            const lg0 = ig0 >= 1.0 ? 255 : (ig0 * 255) | 0;
            const lb0 = ib0 >= 1.0 ? 255 : (ib0 * 255) | 0;

            const lr1 = ir1 >= 1.0 ? 255 : (ir1 * 255) | 0;
            const lg1 = ig1 >= 1.0 ? 255 : (ig1 * 255) | 0;
            const lb1 = ib1 >= 1.0 ? 255 : (ib1 * 255) | 0;

            const lr2 = ir2 >= 1.0 ? 255 : (ir2 * 255) | 0;
            const lg2 = ig2 >= 1.0 ? 255 : (ig2 * 255) | 0;
            const lb2 = ib2 >= 1.0 ? 255 : (ib2 * 255) | 0;

            const l16_0 = ((lr0 & 0xf8) << 8) | ((lg0 & 0xfc) << 3) | ((lb0 & 0xf8) >> 3);
            const l16_1 = ((lr1 & 0xf8) << 8) | ((lg1 & 0xfc) << 3) | ((lb1 & 0xf8) >> 3);
            const l16_2 = ((lr2 & 0xf8) << 8) | ((lg2 & 0xfc) << 3) | ((lb2 & 0xf8) >> 3);

            let _px0 = px0;
            let _py0 = py0;
            let _px1 = px1;
            let _py1 = py1;
            let _px2 = px2;
            let _py2 = py2;

            let pi0 = i0,
              pi1 = i1,
              pi2 = i2;

            let _l16_0 = l16_0;
            let _l16_1 = l16_1;
            let _l16_2 = l16_2;

            // In-place sort by intensity (ascending)
            if (pi0 > pi1) {
              let t;
              t = _px0;
              _px0 = _px1;
              _px1 = t;
              t = _py0;
              _py0 = _py1;
              _py1 = t;
              t = pi0;
              pi0 = pi1;
              pi1 = t;
              t = _l16_0;
              _l16_0 = _l16_1;
              _l16_1 = t;
            }
            if (pi1 > pi2) {
              let t;
              t = _px1;
              _px1 = _px2;
              _px2 = t;
              t = _py1;
              _py1 = _py2;
              _py2 = t;
              t = pi1;
              pi1 = pi2;
              pi2 = t;
              t = _l16_1;
              _l16_1 = _l16_2;
              _l16_2 = t;
            }
            if (pi0 > pi1) {
              let t;
              t = _px0;
              _px0 = _px1;
              _px1 = t;
              t = _py0;
              _py0 = _py1;
              _py1 = t;
              t = pi0;
              pi0 = pi1;
              pi1 = t;
              t = _l16_0;
              _l16_0 = _l16_1;
              _l16_1 = t;
            }

            ctx.globalCompositeOperation = "multiply";

            // If intensity difference is minimal, use flat lighting overlay
            if (pi2 - pi0 < 0.01 || (_l16_0 === _l16_1 && _l16_1 === _l16_2)) {
              if (prevFillStyle !== _l16_0) {
                ctx.fillStyle = PALETTE_16BIT[_l16_0];
                prevFillStyle = _l16_0;
              }

              ctx.beginPath();
              ctx.moveTo(epx0, epy0);
              ctx.lineTo(epx1, epy1);
              ctx.lineTo(epx2, epy2);
              ctx.closePath();
              ctx.fill();
            } else {
              // Precise 2D parametric mapping of Gouraud light gradient
              const t_val = (pi1 - pi0) / (pi2 - pi0);

              const p13x = _px0 + t_val * (_px2 - _px0);
              const p13y = _py0 + t_val * (_py2 - _py0);

              const dx = _px1 - p13x;
              const dy = _py1 - p13y;

              const gx_dir = -dy;
              const gy_dir = dx;

              const den = gx_dir * gx_dir + gy_dir * gy_dir;

              let gx_end, gy_end;

              if (den < 1e-6) {
                gx_end = _px2;
                gy_end = _py2;
              } else {
                const num = (_px2 - _px0) * gx_dir + (_py2 - _py0) * gy_dir;
                const factor = num / den;
                gx_end = _px0 + factor * gx_dir;
                gy_end = _py0 + factor * gy_dir;
              }

              const lightGrad = ctx.createLinearGradient(_px0, _py0, gx_end, gy_end);
              lightGrad.addColorStop(0, PALETTE_16BIT[_l16_0]);
              lightGrad.addColorStop(1, PALETTE_16BIT[_l16_2]);

              prevFillStyle = -1; // Resets fillStyle cache
              ctx.fillStyle = lightGrad;

              ctx.beginPath();
              ctx.moveTo(epx0, epy0);
              ctx.lineTo(epx1, epy1);
              ctx.lineTo(epx2, epy2);
              ctx.closePath();

              ctx.fill();
            }

            ctx.globalCompositeOperation = "source-over";

            // Apply Fog (Source-Over)
            if (fogAmount > 0) {
              const fogR = fogColor >>> 16;
              const fogG = (fogColor >>> 8) & 255;
              const fogB = fogColor & 255;
              // Quantize 8-bit color channels to 5-6-5 bits
              const qrF = fogR & 0xf8; // Keep 5 bits
              const qgF = fogG & 0xfc; // Keep 6 bits
              const qbF = fogB & 0xf8; // Keep 5 bits

              // Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
              const color16F = (qrF << 8) | (qgF << 3) | (qbF >> 3);

              ctx.globalAlpha = fogAmount;

              if (prevStrokeStyle !== color16F) {
                ctx.strokeStyle = PALETTE_16BIT[color16F];
                prevStrokeStyle = color16F;
              }

              if (prevLineStyle !== 10) {
                ctx.lineWidth = 1;
                ctx.lineJoin = "miter";
                prevLineStyle = 10;
              }

              ctx.stroke();

              if (prevFillStyle !== color16F) {
                ctx.fillStyle = PALETTE_16BIT[color16F];
                prevFillStyle = color16F;
              }

              ctx.fill();

              // Reset alpha
              ctx.globalAlpha = 1.0;
            }

            break;
          }
        }

        // Base quantized colors per vertex
        let cr0 = r * ir0;
        let cg0 = g * ig0;
        let cb0 = b * ib0;
        let cr1 = r * ir1;
        let cg1 = g * ig1;
        let cb1 = b * ib1;
        let cr2 = r * ir2;
        let cg2 = g * ig2;
        let cb2 = b * ib2;

        // Math.min(255);
        cr0 = cr0 > 255 ? 255 : cr0;
        cg0 = cg0 > 255 ? 255 : cg0;
        cb0 = cb0 > 255 ? 255 : cb0;
        cr1 = cr1 > 255 ? 255 : cr1;
        cg1 = cg1 > 255 ? 255 : cg1;
        cb1 = cb1 > 255 ? 255 : cb1;
        cr2 = cr2 > 255 ? 255 : cr2;
        cg2 = cg2 > 255 ? 255 : cg2;
        cb2 = cb2 > 255 ? 255 : cb2;

        if (fogAmount > 0) {
          const invFog = 1 - fogAmount;
          const fogR = fogColor >>> 16;
          const fogG = (fogColor >>> 8) & 255;
          const fogB = fogColor & 255;
          const fr = fogR * fogAmount;
          const fg = fogG * fogAmount;
          const fb = fogB * fogAmount;
          cr0 = (cr0 * invFog + fr) | 0;
          cg0 = (cg0 * invFog + fg) | 0;
          cb0 = (cb0 * invFog + fb) | 0;
          cr1 = (cr1 * invFog + fr) | 0;
          cg1 = (cg1 * invFog + fg) | 0;
          cb1 = (cb1 * invFog + fb) | 0;
          cr2 = (cr2 * invFog + fr) | 0;
          cg2 = (cg2 * invFog + fg) | 0;
          cb2 = (cb2 * invFog + fb) | 0;
        } else {
          cr0 |= 0;
          cg0 |= 0;
          cb0 |= 0;
          cr1 |= 0;
          cg1 |= 0;
          cb1 |= 0;
          cr2 |= 0;
          cg2 |= 0;
          cb2 |= 0;
        }

        const c16_0 =
          ((cr0 & 0xf8) << 8) | ((cg0 & 0xfc) << 3) | ((cb0 & 0xf8) >> 3);
        const c16_1 =
          ((cr1 & 0xf8) << 8) | ((cg1 & 0xfc) << 3) | ((cb1 & 0xf8) >> 3);
        const c16_2 =
          ((cr2 & 0xf8) << 8) | ((cg2 & 0xfc) << 3) | ((cb2 & 0xf8) >> 3);

        // EARLY OUT: If all quantized colors are identical, fallback to cheapest flat fill
        if (c16_0 === c16_1 && c16_1 === c16_2) {
          ctx.beginPath();
          ctx.moveTo(px0, py0);
          ctx.lineTo(px1, py1);
          ctx.lineTo(px2, py2);
          ctx.closePath();

          if (prevFillStyle !== c16_0) {
            ctx.fillStyle = PALETTE_16BIT[c16_0];
            prevFillStyle = c16_0;
          }

          if (prevStrokeStyle !== c16_0) {
            ctx.strokeStyle = PALETTE_16BIT[c16_0];
            prevStrokeStyle = c16_0;
          }

          if (prevLineStyle !== 10) {
            ctx.lineWidth = 1;
            ctx.lineJoin = "miter";
            prevLineStyle = 10;
          }

          ctx.stroke();

          ctx.fill();

          break;
        }

        // Screen space coordinates
        let _px0 = px0;
        let _py0 = py0;
        let _px1 = px1;
        let _py1 = py1;
        let _px2 = px2;
        let _py2 = py2;

        let pi0 = i0,
          pi1 = i1,
          pi2 = i2;

        let _c16_0 = c16_0;
        let _c16_1 = c16_1;
        let _c16_2 = c16_2;

        // In-place sort by intensity (ascending)
        if (pi0 > pi1) {
          let t;
          t = _px0;
          _px0 = _px1;
          _px1 = t;
          t = _py0;
          _py0 = _py1;
          _py1 = t;
          t = pi0;
          pi0 = pi1;
          pi1 = t;
          t = _c16_0;
          _c16_0 = _c16_1;
          _c16_1 = t;
        }
        if (pi1 > pi2) {
          let t;
          t = _px1;
          _px1 = _px2;
          _px2 = t;
          t = _py1;
          _py1 = _py2;
          _py2 = t;
          t = pi1;
          pi1 = pi2;
          pi2 = t;
          t = _c16_1;
          _c16_1 = _c16_2;
          _c16_2 = t;
        }
        if (pi0 > pi1) {
          let t;
          t = _px0;
          _px0 = _px1;
          _px1 = t;
          t = _py0;
          _py0 = _py1;
          _py1 = t;
          t = pi0;
          pi0 = pi1;
          pi1 = t;
          t = _c16_0;
          _c16_0 = _c16_1;
          _c16_1 = t;
        }

        // If intensity difference is minimal, use flat shading
        if (pi2 - pi0 < 0.01) {
          ctx.beginPath();
          ctx.moveTo(px0, py0);
          ctx.lineTo(px1, py1);
          ctx.lineTo(px2, py2);
          ctx.closePath();

          if (prevFillStyle !== _c16_0) {
            ctx.fillStyle = PALETTE_16BIT[_c16_0];
            prevFillStyle = _c16_0;
          }

          if (prevStrokeStyle !== _c16_0) {
            ctx.strokeStyle = PALETTE_16BIT[_c16_0];
            prevStrokeStyle = _c16_0;
          }

          if (prevLineStyle !== 10) {
            ctx.lineWidth = 1;
            ctx.lineJoin = "miter";
            prevLineStyle = 10;
          }

          ctx.stroke();

          ctx.fill();
        } else {
          // Precise 2D parametric mapping of Gouraud triangle gradient
          const t_val = (pi1 - pi0) / (pi2 - pi0);

          const p13x = _px0 + t_val * (_px2 - _px0);
          const p13y = _py0 + t_val * (_py2 - _py0);

          const dx = _px1 - p13x;
          const dy = _py1 - p13y;

          const gx_dir = -dy;
          const gy_dir = dx;

          const den = gx_dir * gx_dir + gy_dir * gy_dir;

          let gx_end, gy_end;

          if (den < 1e-6) {
            gx_end = _px2;
            gy_end = _py2;
          } else {
            const num = (_px2 - _px0) * gx_dir + (_py2 - _py0) * gy_dir;
            const factor = num / den;
            gx_end = _px0 + factor * gx_dir;
            gy_end = _py0 + factor * gy_dir;
          }

          const grad = ctx.createLinearGradient(_px0, _py0, gx_end, gy_end);
          grad.addColorStop(0, PALETTE_16BIT[_c16_0]);

          // let safe_t = t_val;
          // if (safe_t < 0) safe_t = 0;
          // if (safe_t > 1) safe_t = 1;
          //
          // if (safe_t > 0 && safe_t < 1) {
          //   grad.addColorStop(safe_t, PALETTE_16BIT[_c16_1]);
          // }
          grad.addColorStop(1, PALETTE_16BIT[_c16_2]);

          prevFillStyle = -1; // Resets fillStyle
          ctx.fillStyle = grad;

          ctx.beginPath();
          ctx.moveTo(epx0, epy0);
          ctx.lineTo(epx1, epy1);
          ctx.lineTo(epx2, epy2);
          ctx.closePath();

          ctx.fill();
        }

        break;
      }
    }
  }
}
