define([
  "./config",
  "./components/PathRenderer",
  "./components/SpriteRenderer",
  "./components/TextRenderer",
  "./components/MeshComponent",
  "./components/CameraComponent",
  "./math",
], function (
  config,
  PathRenderer,
  SpriteRenderer,
  TextRenderer,
  MeshComponent,
  CameraComponent,
  math,
) {
  function createPalette16Bit() {
    const palette = new Array(65536);
    for (let i = 0; i < 65536; i++) {
      // Extract the 5-6-5 bits
      // RRRRR GGGGGG BBBBB
      const r5 = (i >> 11) & 0x1f;
      const g6 = (i >> 5) & 0x3f;
      const b5 = i & 0x1f;

      // Scale to 8-bit (0-255)
      // Using (n << bitShift) | (n >> compensation) for accurate scaling
      const r8 = (r5 << 3) | (r5 >> 2);
      const g8 = (g6 << 2) | (g6 >> 4);
      const b8 = (b5 << 3) | (b5 >> 2);

      palette[i] = "rgb(" + r8 + "," + g8 + "," + b8 + ")";
    }
    return palette;
  }

  // Filters out everything that's outside of screen
  function screenSpaceCulling(
    out_visibilityBuffer,
    gameObjects,
    worldToScreen,
    vw,
    vh,
  ) {
    const b0 = worldToScreen[0],
      b1 = worldToScreen[1],
      b4 = worldToScreen[4],
      b5 = worldToScreen[5],
      b8 = worldToScreen[8],
      b9 = worldToScreen[9],
      b12 = worldToScreen[12],
      b13 = worldToScreen[13],
      count = gameObjects.length;

    let visibleCount = 0;

    for (let i = 0; i < count; i++) {
      const go = gameObjects[i];
      const transform = go.transform;
      // Direct access to the internal Float32Array without copying
      const a = transform.dirtyL
        ? transform.getLocalToWorld()
        : transform.localToWorld;

      const m12 = b0 * a[12] + b4 * a[13] + b8 * a[14] + b12 * a[15];
      const m13 = b1 * a[12] + b5 * a[13] + b9 * a[14] + b13 * a[15];

      // 3. Logic-Only / Empty Object Check
      // If there is no renderer or no bounds, just check the center point
      const renderer = go.meshRenderer;
      if (renderer && renderer.enabled && renderer.bounds) {
        const bounds = renderer.bounds;

        // inline vec3transform
        const m0 = b0 * a[0] + b4 * a[1] + b8 * a[2] + b12 * a[3];
        const m4 = b0 * a[4] + b4 * a[5] + b8 * a[6] + b12 * a[7];
        const m8 = b0 * a[8] + b4 * a[9] + b8 * a[10] + b12 * a[11];

        const m1 = b1 * a[0] + b5 * a[1] + b9 * a[2] + b13 * a[3];
        const m5 = b1 * a[4] + b5 * a[5] + b9 * a[6] + b13 * a[7];
        const m9 = b1 * a[8] + b5 * a[9] + b9 * a[10] + b13 * a[11];

        // Project first corner
        const bx = bounds[0],
          by = bounds[1],
          bz = bounds[2];
        let sMinX = m0 * bx + m4 * by + m8 * bz + m12;
        let sMaxX = sMinX;
        let sMinY = m1 * bx + m5 * by + m9 * bz + m13;
        let sMaxY = sMinY;

        // Project remaining 7 corners - SIMD/Vectorization target
        for (let j = 3; j < 24; j += 3) {
          const px = bounds[j],
            py = bounds[j + 1],
            pz = bounds[j + 2];
          const vx = m0 * px + m4 * py + m8 * pz + m12;
          const vy = m1 * px + m5 * py + m9 * pz + m13;

          sMinX = Math.min(sMinX, vx);
          sMaxX = Math.max(sMaxX, vx);
          sMinY = Math.min(sMinY, vy);
          sMaxY = Math.max(sMaxY, vy);
        }

        if (sMaxX >= 0 && sMinX <= vw && sMaxY >= 0 && sMinY <= vh) {
          out_visibilityBuffer[visibleCount++] = i;
        }
      } else {
        if (m12 >= 0 && m12 <= vw && m13 >= 0 && m13 <= vh) {
          out_visibilityBuffer[visibleCount++] = i;
        }
      }
    }

    return visibleCount;
  }

  function meshToRenderCommands(
    renderers,
    renderersCount,
    vec3Cache1,
    vec3Cache2,
    indexBuffer,
    depthBuffer,
    colorBuffer,
    typeBuffer,
    geometryBuffer,
    lightDirection,
    camera,
    w,
    h,
    ViewportM,
    cameraLocal,
  ) {
    let i = 0;
    for (let j = 0; j < renderersCount; j++) {
      const mesh = renderers[j];
      if (mesh.constructor === MeshComponent) {
        const gameObject = mesh.gameObject;
        const transform = gameObject.transform;
        const W = transform.dirtyL
          ? transform.getLocalToWorld()
          : transform.localToWorld;

        const faces = mesh.faces,
          verts = mesh.vertices;

        mat4Mul(bufferMat4, cameraLocal, W);
        mat4Mul(mat4Buffer1, ViewportM, W);

        // transform all vertices at once and put them in temporary buffer
        for (let l = 0; l < verts.length; l += 3) {
          vec3TransformMat4to2D(
            vec3Cache1,
            l,
            verts[l],
            verts[l + 1],
            verts[l + 2],
            mat4Buffer1,
          );
          vec3TransformMat4(
            vec3Cache2,
            l,
            verts[l],
            verts[l + 1],
            verts[l + 2],
            bufferMat4,
          );
        }

        for (let f = 0; f < faces.length; f += 3) {
          const faceV0 = faces[f] * 3;
          const faceV1 = faces[f + 1] * 3;
          const faceV2 = faces[f + 2] * 3;

          const v0x = vec3Cache1[faceV0];
          const v0y = vec3Cache1[faceV0 + 1];

          const v1x = vec3Cache1[faceV1];
          const v1y = vec3Cache1[faceV1 + 1];

          const v2x = vec3Cache1[faceV2];
          const v2y = vec3Cache1[faceV2 + 1];

          // calculates the "winding" of the triangle in 2D.
          const area = (v1x - v0x) * (v2y - v0y) - (v1y - v0y) * (v2x - v0x);

          // Skip if the triangle is wound counter-clockwise (facing away)
          if (area < 0) continue;

          // screenspace culling
          // 1. Calculate the bounding box of the triangle (AABB)
          const minX =
            v0x < v1x ? (v0x < v2x ? v0x : v2x) : v1x < v2x ? v1x : v2x;
          const maxX =
            v0x > v1x ? (v0x > v2x ? v0x : v2x) : v1x > v2x ? v1x : v2x;
          const minY =
            v0y < v1y ? (v0y < v2y ? v0y : v2y) : v1y < v2y ? v1y : v2y;
          const maxY =
            v0y > v1y ? (v0y > v2y ? v0y : v2y) : v1y > v2y ? v1y : v2y;

          // 2. Intersection check: Screen AABB vs Triangle AABB
          // This ensures triangles larger than the screen stay visible.
          if (maxX >= 0 && minX <= w && maxY >= 0 && minY <= h) {
            const w0z = vec3Cache2[faceV0 + 2];
            const w1z = vec3Cache2[faceV1 + 2];
            const w2z = vec3Cache2[faceV2 + 2];
            const cam = camera.camera;

            const depth = (w0z + w1z + w2z) * 0.33333;

            if (depth >= cam.nearClippingPane && depth <= cam.farClippingPane) {
              const w0x = vec3Cache2[faceV0];
              const w0y = vec3Cache2[faceV0 + 1];
              const w1x = vec3Cache2[faceV1];
              const w1y = vec3Cache2[faceV1 + 1];
              const w2x = vec3Cache2[faceV2];
              const w2y = vec3Cache2[faceV2 + 1];

              // --- LIGHTING CALCULATION ---
              // 1. Calculate Normal (using world/camera-local positions)
              const e1x = w1x - w0x,
                e1y = w1y - w0y,
                e1z = w1z - w0z;
              const e2x = w2x - w0x,
                e2y = w2y - w0y,
                e2z = w2z - w0z;

              let nx = e1y * e2z - e1z * e2y;
              let ny = e1z * e2x - e1x * e2z;
              let nz = e1x * e2y - e1y * e2x;

              const nLen = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
              nx *= nLen;
              ny *= nLen;
              nz *= nLen;

              // 2. Light Intensity (Dot product + Ambient)
              const dot =
                nx * -lightDirection[0] +
                ny * -lightDirection[1] +
                nz * -lightDirection[2];
              const intensity = Math.max(camera.camera.ambientLight, dot);

              // 3. Apply Intensity to RGB
              let r = (mesh.color[0] * intensity) | 0;
              let g = (mesh.color[1] * intensity) | 0;
              let b = (mesh.color[2] * intensity) | 0;

              //FOG

              if (cam.fogType !== CameraComponent.FogType.NONE) {
                let fogAmount = 0;
                if (
                  cam.fogType === CameraComponent.FogType.RADIAL_FAST ||
                  cam.fogType === CameraComponent.FogType.RADIAL
                ) {
                  // 1. Get the local camera-space coordinates from your cache
                  // We use the average of the 3 vertices for the face
                  const lx =
                    (vec3Cache2[faceV0] +
                      vec3Cache2[faceV1] +
                      vec3Cache2[faceV2]) *
                    0.33333;
                  const ly =
                    (vec3Cache2[faceV0 + 1] +
                      vec3Cache2[faceV1 + 1] +
                      vec3Cache2[faceV2 + 1]) *
                    0.33333;
                  const lz =
                    (vec3Cache2[faceV0 + 2] +
                      vec3Cache2[faceV1 + 2] +
                      vec3Cache2[faceV2 + 2]) *
                    0.33333;

                  if (cam.fogType === CameraComponent.FogType.RADIAL_FAST) {
                    // We need the squares of your panes for the comparison
                    const nearSq = cam.fogNearPane * cam.fogNearPane;
                    const farSq = cam.fogFarPane * cam.fogFarPane;
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
                    fogAmount =
                      (distance - cam.fogNearPane) /
                      (cam.fogFarPane - cam.fogNearPane);
                  }
                } else if (cam.fogType === CameraComponent.FogType.LINEAR) {
                  fogAmount =
                    (depth - cam.fogNearPane) /
                    (cam.fogFarPane - cam.fogNearPane);
                }

                if (fogAmount > 1) fogAmount = 1;

                // Blend the mesh color with the fog color
                if (fogAmount > 0) {
                  r = (r * (1 - fogAmount) + cam.fogColor[0] * fogAmount) | 0;
                  g = (g * (1 - fogAmount) + cam.fogColor[1] * fogAmount) | 0;
                  b = (b * (1 - fogAmount) + cam.fogColor[2] * fogAmount) | 0;
                }
              }

              // 1. Quantize 8-bit color channels to 5-6-5 bits
              const qr = r & 0xf8; // Keep 5 bits
              const qg = g & 0xfc; // Keep 6 bits
              const qb = b & 0xf8; // Keep 5 bits

              // 2. Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
              const key = (qr << 8) | (qg << 3) | (qb >> 3);

              indexBuffer[i] = i;
              depthBuffer[i] = depth;
              colorBuffer[i] = key;
              typeBuffer[i] = 0; // 0 = FACE

              geometryBuffer[i * 6] = v0x;
              geometryBuffer[i * 6 + 1] = v0y;
              geometryBuffer[i * 6 + 2] = v1x;
              geometryBuffer[i * 6 + 3] = v1y;
              geometryBuffer[i * 6 + 4] = v2x;
              geometryBuffer[i * 6 + 5] = v2y;

              i++;
            }
          }
        }
      }
    }
    return i;
  }

  function generateBatches(
    batchBuffer,
    activeIndices,
    count,
    colorBuffer,
    typeBuffer,
  ) {
    let batchCount = 0;
    if (count === 0) return 0;

    const firstIdx = activeIndices[0];
    let currentStart = 0;
    let lastColorKey = colorBuffer[firstIdx];
    let lastType = typeBuffer[firstIdx];

    for (let i = 1; i < count; i++) {
      const index = activeIndices[i];
      const colorKey = colorBuffer[index];
      const type = typeBuffer[index];

      if (colorKey !== lastColorKey || type !== lastType) {
        const bIdx = batchCount * 3;
        batchBuffer[bIdx] = currentStart;
        batchBuffer[bIdx + 1] = i - currentStart;
        batchBuffer[bIdx + 2] = lastColorKey;

        batchCount++;
        currentStart = i;
        lastColorKey = colorKey;
        lastType = type;
      }
    }

    const bIdx = batchCount * 3;
    batchBuffer[bIdx] = currentStart;
    batchBuffer[bIdx + 1] = count - currentStart;
    batchBuffer[bIdx + 2] = lastColorKey;
    batchCount++;

    return batchCount;
  }

  const PALETTE_16BIT = createPalette16Bit();

  var vec3TransformMat4to2D = math.vec3TransformMat4to2D;
  var vec3TransformMat4 = math.vec3TransformMat4;
  var mat4Mul = math.mat4Mul;
  let visibleObjectsBuffer = new Uint32Array(100);
  var layerBuffers = [];
  var layerBufferLengths = new Uint32Array(1);
  var depthSort = function (a, b) {
    return depthBuffer[b] - depthBuffer[a];
  };

  var lightDirection = new Float32Array([0, 0, 0]);

  var vec3Cache1 = new Float32Array([0, 0, 0]);
  var vec3Cache2 = new Float32Array([0, 0, 0]);

  var depthBuffer = new Float32Array(0);
  var indexBuffer = new Uint32Array(0);
  // Geometry buffer stores the 2D screen coordinates of vertices,
  // when face is partially on the screen, some of vertices may be negative,
  // so Int16Array is used, allowing -32768 to 32767 values.
  var geometryBuffer = new Int16Array(0);
  var colorBuffer = new Uint16Array(0);
  var typeBuffer = new Uint8Array(0);

  function renderAxis(gameObject, ctx, worldToScreenMatrix) {
    var W = gameObject.transform.getLocalToWorld();

    // 1. Get the World Position of the object
    // This is the translation component of the Local-to-World matrix
    var worldPosX = W[12];
    var worldPosY = W[13];
    var worldPosZ = W[14];

    // 2. Project the Origin to Screen Space
    // We project the world position, NOT (0,0,0)
    vec3TransformMat4to2D(
      vec3Cache1,
      0,
      worldPosX,
      worldPosY,
      worldPosZ,
      worldToScreenMatrix,
    );
    var ox = vec3Cache1[0],
      oy = vec3Cache1[1];

    var gizmoSize = 50;

    // 3. Extract and Normalize Basis Vectors
    var axes = [
      { x: W[0], y: W[1], z: W[2], col: "#ff0000" }, // X
      { x: W[4], y: W[5], z: W[6], col: "#00ff00" }, // Y
      { x: W[8], y: W[9], z: W[10], col: "#0000ff" }, // Z
    ];

    for (var i = 0; i < 3; i++) {
      var a = axes[i];
      var len = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);

      // If an axis is scaled to 0, we can't normalize it.
      // We default it to a unit vector so the axis still shows.
      if (len < 0.0001) {
        // Optional: fallback to identity directions if scale is 0
        if (i === 0) a.x = 1;
        else if (i === 1) a.y = 1;
        else a.z = 1;
        len = 1;
      }

      var nx = a.x / len;
      var ny = a.y / len;
      var nz = a.z / len;

      // 4. Project the Tip
      // Tip Position = World Position + (Normalized Direction * Size)
      vec3TransformMat4to2D(
        vec3Cache1,
        0,
        worldPosX + nx * gizmoSize,
        worldPosY + ny * gizmoSize,
        worldPosZ + nz * gizmoSize,
        worldToScreenMatrix,
      );

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = a.col;
      ctx.moveTo(ox, oy);
      ctx.lineTo(vec3Cache1[0], vec3Cache1[1]);
      ctx.stroke();
    }
  }

  function Canvas2dRenderer() {
    this.layerBuffers = [];
    for (var i = 0; i < config.layersCount; i++) this.layerBuffers[i] = [];
    this.M = [];

    this.vec3Pool = vec3Cache1;
    this.drawCalls = 0;
    this.faces = 0;

    this.batchBuffer = new Int32Array(1024 * 3);
  }

  var p = Canvas2dRenderer.prototype,
    bufferVec3 = new Float32Array([0, 0, 0]),
    mat4Buffer1 = new Float32Array(16),
    bufferMat4 = new Float32Array(16);

  p.render = function (camera, viewport, stats) {
    let t0 = Date.now();

    this.vec3Pool = vec3Cache1;

    var gameObjects = camera.scene.retrieve(camera),
      light = camera.scene.light,
      layersCount = config.layersCount,
      vw = viewport.width,
      vh = viewport.height,
      renderer,
      renderers,
      renderersCount,
      i,
      j,
      l,
      ctx;

    var worldToScreenMatrix = viewport.getWorldToScreen();
    var cameraLocal = camera.transform.getWorldToLocal();

    if (light) {
      // 1. Get the world forward vector of the light
      light.transform.forward(lightDirection);

      // 2. TRANSFORM LIGHT INTO CAMERA SPACE
      // We only want the rotation, so we use the top-left 3x3 of the cameraLocal matrix
      var lx = lightDirection[0],
        ly = lightDirection[1],
        lz = lightDirection[2];

      // In-place transformation (multiplying by the rotation part of cameraLocal)
      lightDirection[0] =
        lx * cameraLocal[0] + ly * cameraLocal[4] + lz * cameraLocal[8];
      lightDirection[1] =
        lx * cameraLocal[1] + ly * cameraLocal[5] + lz * cameraLocal[9];
      lightDirection[2] =
        lx * cameraLocal[2] + ly * cameraLocal[6] + lz * cameraLocal[10];
    }

    this.drawCalls = 0;
    this.faces = 0;

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
      visibleObjectsBuffer = new Uint32Array(gameObjects.length);
      visibleObjectsBuffer.set(_visibleObjectsBuffer);
    }

    const visibleObjectsBufferLen = screenSpaceCulling(
      visibleObjectsBuffer,
      gameObjects,
      worldToScreenMatrix,
      vw,
      vh,
    );

    // move outside render
    // initialize layer buffers
    for (i = 0; i < layersCount; i++) {
      layerBuffers[i] = layerBuffers[i] || [];
    }
    if (layerBufferLengths.length < layersCount) {
      var _layerBufferLengths = layerBufferLengths;
      layerBufferLengths = new Uint32Array(layersCount);
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
      // ctx.lineWidth = 1;
      ctx.lineJoin = "round";

      if ((config.layerClearMask & (i + 1)) === i + 1)
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      renderers = layerBuffers[i];
      renderersCount = layerBufferLengths[i];

      let maxFacesCount = 0;
      let maxVertsCount = 0;
      for (let o = 0; o < renderersCount; o++) {
        maxFacesCount += renderers[o].faces.length;
        maxVertsCount = Math.max(maxVertsCount, renderers[o].vertices.length);
      }
      maxFacesCount = (maxFacesCount / 3) | 0;

      if (vec3Cache1.length < maxVertsCount) {
        var cache = new Float32Array(maxVertsCount);
        cache.set(vec3Cache1);
        vec3Cache1 = cache;

        cache = new Float32Array(maxVertsCount);
        cache.set(vec3Cache2);
        vec3Cache2 = cache;
      }

      if (depthBuffer.length < maxFacesCount) {
        var newArr = new Float32Array(maxFacesCount);
        newArr.set(depthBuffer);
        depthBuffer = newArr;

        newArr = new Uint32Array(maxFacesCount);
        newArr.set(indexBuffer);
        indexBuffer = newArr;

        newArr = new Uint8Array(maxFacesCount);
        newArr.set(typeBuffer);
        typeBuffer = newArr;

        newArr = new Uint16Array(maxFacesCount);
        newArr.set(colorBuffer);
        colorBuffer = newArr;

        newArr = new Int16Array(maxFacesCount * 6);
        newArr.set(geometryBuffer);
        geometryBuffer = newArr;
      }

      const l = meshToRenderCommands(
        renderers,
        renderersCount,
        vec3Cache1,
        vec3Cache2,
        indexBuffer,
        depthBuffer,
        colorBuffer,
        typeBuffer,
        geometryBuffer,
        lightDirection,
        camera,
        vw,
        vh,
        worldToScreenMatrix,
        cameraLocal,
      );

      // renderers.length = 0;
      if ((config.depthSortingMask & (i + 1)) === i + 1) {
        indexBuffer.subarray(0, l).sort(depthSort);
      }

      let batchBuffer = this.batchBuffer;
      if (batchBuffer.length < indexBuffer.length * 3) {
        var newBatchBuffer = new Int32Array(indexBuffer.length * 3);
        newBatchBuffer.set(batchBuffer);
        this.batchBuffer = batchBuffer = newBatchBuffer;
      }
      const batchCount = generateBatches(
        batchBuffer,
        indexBuffer,
        l,
        colorBuffer,
        typeBuffer,
      );

      const stroke = (config.layerStrokeMask & (i + 1)) === i + 1;

      for (var b = 0; b < batchCount; b++) {
        var bPtr = b * 3;
        var start = batchBuffer[bPtr];
        var count = batchBuffer[bPtr + 1];
        var colorKey = batchBuffer[bPtr + 2];

        // Set State ONCE per batch
        ctx.beginPath();

        for (var k = start; k < start + count; k++) {
          var index = indexBuffer[k]; // The sorted index
          var geoIdx = index * 6;

          ctx.moveTo(geometryBuffer[geoIdx], geometryBuffer[geoIdx + 1]);
          ctx.lineTo(geometryBuffer[geoIdx + 2], geometryBuffer[geoIdx + 3]);
          ctx.lineTo(geometryBuffer[geoIdx + 4], geometryBuffer[geoIdx + 5]);
          ctx.closePath();
        }

        if (this.debug) {
          if (count > 1) {
            ctx.fillStyle = `rgb(0,0,${b % 255})`;
            ctx.fill();
          } else {
            ctx.fillStyle = ctx.strokeStyle = PALETTE_16BIT[colorKey];
            ctx.fill();
          }
        } else if (this.wireframe) {
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = "rgb(0,0,255)";
          ctx.stroke();
        } else {
          ctx.fillStyle = ctx.strokeStyle = PALETTE_16BIT[colorKey];
          if (stroke) ctx.stroke();
          ctx.fill();
        }

        if (this.debug) {
          // --- DEBUG: DRAW ORDER NUMBERS ---
          ctx.fillStyle = "white"; // Make numbers visible
          ctx.font = "10px monospace";
          ctx.textAlign = "center";

          for (var k = start; k < start + count; k++) {
            var index = indexBuffer[k];
            var g = index * 6;

            // Calculate the center of the triangle for text placement
            var centerX =
              (geometryBuffer[g] +
                geometryBuffer[g + 2] +
                geometryBuffer[g + 4]) /
              3;
            var centerY =
              (geometryBuffer[g + 1] +
                geometryBuffer[g + 3] +
                geometryBuffer[g + 5]) /
              3;

            // 'k' is the actual sequence index in the final render array
            ctx.fillText(k.toString() + "," + b, centerX, centerY);
          }
        }
      }

      if (this.debug) {
        for (j = 0; j < renderersCount; j++) {
          renderer = renderers[j];
          // Only draw axes for objects with a transform (usually MeshComponents)
          if (renderer.gameObject && renderer.gameObject.debug) {
            renderAxis(renderer.gameObject, ctx, worldToScreenMatrix);
          }
        }
      }

      viewport.context.drawImage(ctx.canvas, 0, 0);

      this.drawCalls += batchCount;
      this.faces += l;
      layerBufferLengths[i] = 0;
    }

    this.visibleObjects = visibleObjectsBufferLen;

    stats.dt = Date.now() - t0;
  };

  //Rounding coordinates with Math.round is slow, but looks better
  //Rounding to lowest with pipe operator is faster, but looks worse
  p.renderSprite = function (renderer, layer) {
    vec3TransformMat4(
      bufferVec3,
      renderer.gameObject.transform.getPosition(bufferVec3),
      this.M,
    );
    var sprite = renderer.sprite;

    //layer.drawImage(sprite.sourceImage, sprite.offsetX, sprite.offsetY, sprite.width, sprite.height, Math.round(bufferVec3[0] - renderer.pivotX), Math.round(bufferVec3[1] - renderer.pivotY), sprite.width, sprite.height);
    layer.drawImage(
      sprite.sourceImage,
      sprite.offsetX,
      sprite.offsetY,
      sprite.width,
      sprite.height,
      (bufferVec3[0] - renderer.pivotX) | 0,
      (bufferVec3[1] - renderer.pivotY) | 0,
      sprite.width,
      sprite.height,
    );
  };

  return Canvas2dRenderer;
});
