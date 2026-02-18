define([
  "./config",
  "./components/PathRenderer",
  "./components/SpriteRenderer",
  "./components/TextRenderer",
  "./components/MeshComponent",
  "./components/CameraComponent",
  "./math",
  "./palette",
], function (
  config,
  PathRenderer,
  SpriteRenderer,
  TextRenderer,
  MeshComponent,
  CameraComponent,
  math,
  palette,
) {
  const vec3TransformMat4to2D = math.vec3TransformMat4to2D;
  const vec3TransformMat4 = math.vec3TransformMat4;
  const mat4Mul = math.mat4Mul;

  const PALETTE_16BIT = palette.createPalette16Bit();

  function Canvas2dRenderer() {
    this.layerBuffers = [];

    this.drawCalls = 0;
    this.faces = 0;

    this.batchBuffer = new Int32Array(1024 * 3);

    this.lightDirection = new Float32Array([0, 0, 0]);

    this.depthBuffer = new Float32Array(0);
    this.indexBuffer = new Uint32Array(0);
    // Geometry buffer stores the 2D screen coordinates of vertices,
    // when face is partially on the screen, some of vertices may be negative,
    // so Int16Array is used, allowing -32768 to 32767 values.
    this.geometryBuffer = new Int16Array(0);
    this.clipGeometryBuffer = new Float32Array(0);
    this.color16Buffer = new Uint16Array(0);
    this.colorBuffer = new Uint32Array(0);
    this.typeBuffer = new Uint8Array(0);
    this.visibleObjectsBuffer = new Uint32Array(100);
    this.layerBuffers = [];
    this.layerBufferLengths = new Uint32Array(1);

    // move outside render
    // initialize layer buffers
    for (let i = 0; i < config.layersCount; i++) {
      this.layerBuffers[i] = this.layerBuffers[i] || [];
    }
  }

  var p = Canvas2dRenderer.prototype;

  p.vec3Cache1 = new Float32Array([0, 0, 0]);
  p.vec3Cache2 = new Float32Array([0, 0, 0]);
  p.mat4Scratchpad1 = new Float32Array(16);
  p.mat4Scratchpad2 = new Float32Array(16);

  p.render = function (camera, viewport, stats) {
    let t0 = Date.now();

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
      ctx,
      lightDirection = this.lightDirection,
      vec3Cache1 = this.vec3Cache1,
      vec3Cache2 = this.vec3Cache2,
      depthBuffer = this.depthBuffer,
      indexBuffer = this.indexBuffer,
      geometryBuffer = this.geometryBuffer,
      clipGeometryBuffer = this.clipGeometryBuffer,
      color16Buffer = this.color16Buffer,
      colorBuffer = this.colorBuffer,
      typeBuffer = this.typeBuffer,
      visibleObjectsBuffer = this.visibleObjectsBuffer,
      layerBuffers = this.layerBuffers,
      layerBufferLengths = this.layerBufferLengths,
      mat4Scratchpad1 = this.mat4Scratchpad1,
      mat4Scratchpad2 = this.mat4Scratchpad2,
      worldToScreenMatrix = viewport.getWorldToScreen(),
      cameraLocalMatrix = camera.transform.getWorldToLocal(),
      clipSpaceMatrix = camera.camera.getClipSpaceMatrix();

    if (light) {
      // 1. Get the world forward vector of the light
      light.transform.forward(lightDirection);

      // 2. TRANSFORM LIGHT INTO CAMERA SPACE
      // We only want the rotation, so we use the top-left 3x3 of the cameraLocalMatrix matrix
      var lx = lightDirection[0],
        ly = lightDirection[1],
        lz = lightDirection[2];

      // In-place transformation (multiplying by the rotation part of cameraLocalMatrix)
      lightDirection[0] =
        lx * cameraLocalMatrix[0] +
        ly * cameraLocalMatrix[4] +
        lz * cameraLocalMatrix[8];
      lightDirection[1] =
        lx * cameraLocalMatrix[1] +
        ly * cameraLocalMatrix[5] +
        lz * cameraLocalMatrix[9];
      lightDirection[2] =
        lx * cameraLocalMatrix[2] +
        ly * cameraLocalMatrix[6] +
        lz * cameraLocalMatrix[10];
    }

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
      this.layerBufferLengths = layerBufferLengths = new Uint32Array(
        layersCount,
      );
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
        const _vec3Cache1 = new Float32Array(maxVertsCount);
        _vec3Cache1.set(vec3Cache1);
        this.vec3Cache1 = vec3Cache1 = _vec3Cache1;

        const _vec3Cache2 = new Float32Array(maxVertsCount);
        _vec3Cache2.set(vec3Cache2);
        this.vec3Cache2 = vec3Cache2 = _vec3Cache2;
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

        newArr = new Int16Array(maxFacesCount * 6);
        newArr.set(geometryBuffer);
        this.geometryBuffer = geometryBuffer = newArr;

        newArr = new Float32Array(maxFacesCount * 9);
        newArr.set(clipGeometryBuffer);
        this.clipGeometryBuffer = clipGeometryBuffer = newArr;
      }

      const l = destructMesh(
        renderers,
        renderersCount,
        vec3Cache1,
        vec3Cache2,
        indexBuffer,
        depthBuffer,
        colorBuffer,
        typeBuffer,
        geometryBuffer,
        clipGeometryBuffer,
        camera,
        vw,
        vh,
        worldToScreenMatrix,
        cameraLocalMatrix,
        clipSpaceMatrix,
        mat4Scratchpad2,
        mat4Scratchpad1,
      );

      calcLight(
        l,
        clipGeometryBuffer,
        colorBuffer,
        lightDirection,
        camera.camera.ambientLight,
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

      // renderers.length = 0;
      if ((config.depthSortingMask & (i + 1)) === i + 1) {
        indexBuffer.subarray(0, l).sort(function (a, b) {
          return depthBuffer[b] - depthBuffer[a];
        });
      } else {
        indexBuffer.subarray(0, l).sort(function (a, b) {
          return (colorBuffer[b] >>> 0) - (colorBuffer[a] >>> 0);
        });
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
        color16Buffer,
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
          const color = (ctx.fillStyle = PALETTE_16BIT[colorKey]);
          if (stroke) {
            ctx.strokeStyle = color;
            ctx.stroke();
          }
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
            // ctx.fillText(k.toString() + "," + b, centerX, centerY);
            ctx.fillText(b, centerX, centerY);
          }
        }
      }

      if (this.debug) {
        for (j = 0; j < renderersCount; j++) {
          renderer = renderers[j];
          // Only draw axes for objects with a transform (usually MeshComponents)
          if (renderer.gameObject && renderer.gameObject.debug) {
            renderAxis(
              renderer.gameObject,
              ctx,
              worldToScreenMatrix,
              vec3Cache1,
            );
          }
        }
      }

      viewport.context.drawImage(ctx.canvas, 0, 0);

      drawCalls += batchCount;
      faces += l;
      layerBufferLengths[i] = 0;
    }

    stats.visibleObjects = visibleObjectsBufferLen;
    stats.drawCalls = drawCalls;
    stats.faces = faces;
    stats.dt = Date.now() - t0;
  };

  //Rounding coordinates with Math.round is slow, but looks better
  //Rounding to lowest with pipe operator is faster, but looks worse
  // p.renderSprite = function (renderer, layer) {
  //   vec3TransformMat4(
  //     bufferVec3,
  //     renderer.gameObject.transform.getPosition(bufferVec3),
  //     this.M,
  //   );
  //   var sprite = renderer.sprite;
  //
  //   //layer.drawImage(sprite.sourceImage, sprite.offsetX, sprite.offsetY, sprite.width, sprite.height, Math.round(bufferVec3[0] - renderer.pivotX), Math.round(bufferVec3[1] - renderer.pivotY), sprite.width, sprite.height);
  //   layer.drawImage(
  //     sprite.sourceImage,
  //     sprite.offsetX,
  //     sprite.offsetY,
  //     sprite.width,
  //     sprite.height,
  //     (bufferVec3[0] - renderer.pivotX) | 0,
  //     (bufferVec3[1] - renderer.pivotY) | 0,
  //     sprite.width,
  //     sprite.height,
  //   );
  // };

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

  /**
   *
   * @param renderers
   * @param renderersCount
   * @param vec3Cache1
   * @param vec3Cache2
   * @param indexBuffer
   * @param depthBuffer
   * @param colorBuffer
   * @param typeBuffer
   * @param geometryBuffer
   * @param clipGeometryBuffer
   * @param camera
   * @param w
   * @param h
   * @param worldToScreenMatrix {Float32Array} - The 4x4 viewport.getWorldToScreen() matrix, from camera local space to screen pixels.
   * @param {Float32Array} cameraLocalMatrix - The 4x4 camera.transform.getWorldToLocal() matrix.
   * @param {Float32Array} clipSpaceMatrix - The 4x4 View-Projection matrix.
   * @param mat4Scratchpad2
   * @param mat4Scratchpad1
   * @returns {number}
   */
  function destructMesh(
    renderers,
    renderersCount,
    vec3Cache1,
    vec3Cache2,
    indexBuffer,
    depthBuffer,
    colorBuffer,
    typeBuffer,
    geometryBuffer,
    clipGeometryBuffer,
    camera,
    w,
    h,
    worldToScreenMatrix,
    cameraLocalMatrix,
    clipSpaceMatrix,
    mat4Scratchpad2,
    mat4Scratchpad1,
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

        mat4Mul(mat4Scratchpad2, cameraLocalMatrix, W);
        mat4Mul(mat4Scratchpad1, worldToScreenMatrix, W);

        // transform all vertices at once and put them in temporary buffer
        for (let l = 0; l < verts.length; l += 3) {
          vec3TransformMat4to2D(
            vec3Cache1,
            l,
            verts[l],
            verts[l + 1],
            verts[l + 2],
            mat4Scratchpad1,
          );
          vec3TransformMat4(
            vec3Cache2,
            l,
            verts[l],
            verts[l + 1],
            verts[l + 2],
            mat4Scratchpad2,
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

              //If mesh has only one color, reuse it for all.
              const colorIdx =
                mesh.faceColors[((f / 3) | 0) % mesh.faceColors.length];
              let r = mesh.colors[colorIdx] | 0;
              let g = mesh.colors[colorIdx + 1] | 0;
              let b = mesh.colors[colorIdx + 2] | 0;

              indexBuffer[i] = i;

              depthBuffer[i] = depth;

              colorBuffer[i] = (r << 24) | (g << 16) | (b << 8) | 255;

              typeBuffer[i] = 0; // 0 = FACE

              geometryBuffer[i * 6] = v0x;
              geometryBuffer[i * 6 + 1] = v0y;
              geometryBuffer[i * 6 + 2] = v1x;
              geometryBuffer[i * 6 + 3] = v1y;
              geometryBuffer[i * 6 + 4] = v2x;
              geometryBuffer[i * 6 + 5] = v2y;

              clipGeometryBuffer[i * 9] = w0x;
              clipGeometryBuffer[i * 9 + 1] = w0y;
              clipGeometryBuffer[i * 9 + 2] = w0z;
              clipGeometryBuffer[i * 9 + 3] = w1x;
              clipGeometryBuffer[i * 9 + 4] = w1y;
              clipGeometryBuffer[i * 9 + 5] = w1z;
              clipGeometryBuffer[i * 9 + 6] = w2x;
              clipGeometryBuffer[i * 9 + 7] = w2y;
              clipGeometryBuffer[i * 9 + 8] = w2z;

              i++;
            }
          }
        }
      }
    }
    return i;
  }

  function calcLight(
    indexLen,
    geoBuffer,
    colorBuffer,
    lightDirection,
    ambientLightIntensity,
  ) {
    for (let i = 0; i < indexLen; i++) {
      const w0x = geoBuffer[i * 9];
      const w0y = geoBuffer[i * 9 + 1];
      const w0z = geoBuffer[i * 9 + 2];
      const w1x = geoBuffer[i * 9 + 3];
      const w1y = geoBuffer[i * 9 + 4];
      const w1z = geoBuffer[i * 9 + 5];
      const w2x = geoBuffer[i * 9 + 6];
      const w2y = geoBuffer[i * 9 + 7];
      const w2z = geoBuffer[i * 9 + 8];

      const color = colorBuffer[i];

      let r = (color >>> 24) & 255;
      let g = (color >>> 16) & 255;
      let b = (color >>> 8) & 255;

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
      const intensity = Math.max(ambientLightIntensity, dot);

      // 3. Apply Intensity to RGB
      r = (r * intensity) | 0;
      g = (g * intensity) | 0;
      b = (b * intensity) | 0;

      colorBuffer[i] = (r << 24) | (g << 16) | (b << 8) | 255;
    }
  }

  function calcFog(
    indexLen,
    geometryBuffer,
    colorBuffer,
    depthBuffer,
    fogType,
    fogColor,
    fogNearPane,
    fogFarPane,
  ) {
    if (fogType === CameraComponent.FogType.NONE) return;

    for (let i = 0; i < indexLen; i++) {
      const w0x = geometryBuffer[i * 9];
      const w0y = geometryBuffer[i * 9 + 1];
      const w0z = geometryBuffer[i * 9 + 2];
      const w1x = geometryBuffer[i * 9 + 3];
      const w1y = geometryBuffer[i * 9 + 4];
      const w1z = geometryBuffer[i * 9 + 5];
      const w2x = geometryBuffer[i * 9 + 6];
      const w2y = geometryBuffer[i * 9 + 7];
      const w2z = geometryBuffer[i * 9 + 8];

      const color = colorBuffer[i];

      const depth = depthBuffer[i];

      let r = (color >>> 24) & 255;
      let g = (color >>> 16) & 255;
      let b = (color >>> 8) & 255;

      let fogAmount = 0;
      if (
        fogType === CameraComponent.FogType.RADIAL_FAST ||
        fogType === CameraComponent.FogType.RADIAL
      ) {
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

  function renderAxis(gameObject, ctx, worldToScreenMatrix, vec3Cache1) {
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

  return Canvas2dRenderer;
});
