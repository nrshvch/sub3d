define(["./config", "./lib/gl-matrix", "./components/PathRenderer", "./components/SpriteRenderer", "./components/TextRenderer", "./components/MeshComponent", "./components/CameraComponent", "./math"], function (config, glMatrix, PathRenderer, SpriteRenderer, TextRenderer, MeshComponent, CameraComponent, math) {
    function createPalette16Bit() {
        var palette = new Array(65536);
        for (let i = 0; i < 65536; i++) {
            // Extract the 5-6-5 bits
            // RRRRR GGGGGG BBBBB
            const r5 = (i >> 11) & 0x1F;
            const g6 = (i >> 5) & 0x3F;
            const b5 = i & 0x1F;

            // Scale to 8-bit (0-255)
            // Using (n << bitShift) | (n >> compensation) for accurate scaling
            const r8 = (r5 << 3) | (r5 >> 2);
            const g8 = (g6 << 2) | (g6 >> 4);
            const b8 = (b5 << 3) | (b5 >> 2);

            palette[i] = 'rgb(' + r8 + ',' + g8 + ',' + b8 + ')';
        }
        return palette;
    }
    const PALETTE_16BIT = createPalette16Bit();

    var mat4Mul = glMatrix.mat4.multiply;
    var vec3TransformMat4 = glMatrix.vec3.transformMat4;
    var visibleObjectsBuffer = [];
    var visibleObjectsBufferLen = [];
    var layerBuffers = [];
    var layerBufferLengths = new Uint32Array(1);
    var depthSort = function(a, b) {
        return depthBuffer[b] - depthBuffer[a];
    };

    var lightDirection = new Float32Array([0,0,0]);

    var vec3Cache1 = new Float32Array([0,0,0]);
    var vec3Cache2 = new Float32Array([0,0,0]);

    var depthBuffer = new Float32Array(0);
    var indexBuffer = new Uint32Array(0);
    // Geometry buffer stores the 2D screen coordinates of vertices, 
    // when face is partially on the screen, some of vertices may be negative, 
    // so Int16Array is used, allowing -32768 to 32767 values.
    var geometryBuffer = new Int16Array(0); 
    var colorBuffer = new Uint16Array(0);
    var typeBuffer = new Uint8Array(0);

    var t0 = undefined;

    function meshToRenderCommands(i, camera, mesh, w, h, ViewportM, cameraLocal){
        const gameObject = mesh.gameObject;
        var W = gameObject.transform.getLocalToWorld();

        var faces = mesh.faces, verts = mesh.vertices, depth;

        mat4Mul(bufferMat4, cameraLocal, W);
        mat4Mul(mat4Buffer1, ViewportM, W);

        if(vec3Cache1.length < verts.length) {
            var cache = new Float32Array(verts.length);
            cache.set(vec3Cache1);
            vec3Cache1 = cache;

            cache = new Float32Array(verts.length);
            cache.set(vec3Cache2);
            vec3Cache2 = cache;
        }

        // transform all vertices at once and put them in temporary buffer
        for(var l = 0; l < verts.length; l+=3){
            math.vec3TransformMat4to2D(vec3Cache1, l, verts[l], verts[l+1], verts[l+2], mat4Buffer1);
            math.vec3TransformMat4(vec3Cache2, l, verts[l], verts[l+1], verts[l+2], bufferMat4);
        }

        for (let f = 0; f < faces.length; f+=3) {
            var faceV0 = faces[f] * 3;
            var faceV1 = faces[f+1] * 3;
            var faceV2 = faces[f+2] * 3;

            var v0x = vec3Cache1[faceV0];
            var v0y = vec3Cache1[faceV0+1];

            var v1x = vec3Cache1[faceV1];
            var v1y = vec3Cache1[faceV1+1];

            var v2x = vec3Cache1[faceV2];
            var v2y = vec3Cache1[faceV2+1];

            // calculates the "winding" of the triangle in 2D.
            const area = (v1x - v0x) * (v2y - v0y) - (v1y - v0y) * (v2x - v0x);

            // Skip if the triangle is wound counter-clockwise (facing away)
            if (area < 0) continue;

            // screenspace culling
            // 1. Calculate the bounding box of the triangle (AABB)
            var minX = v0x < v1x ? (v0x < v2x ? v0x : v2x) : (v1x < v2x ? v1x : v2x);
            var maxX = v0x > v1x ? (v0x > v2x ? v0x : v2x) : (v1x > v2x ? v1x : v2x);
            var minY = v0y < v1y ? (v0y < v2y ? v0y : v2y) : (v1y < v2y ? v1y : v2y);
            var maxY = v0y > v1y ? (v0y > v2y ? v0y : v2y) : (v1y > v2y ? v1y : v2y);

            // 2. Intersection check: Screen AABB vs Triangle AABB
            // This ensures triangles larger than the screen stay visible.
            if (maxX >= 0 && minX <= w && maxY >= 0 && minY <= h) {
                var w0z = vec3Cache2[faceV0 + 2];
                var w1z = vec3Cache2[faceV1 + 2];
                var w2z = vec3Cache2[faceV2 + 2];
                var cam = camera.camera;

                depth = (w0z + w1z + w2z) * 0.33333;

                if (depth >= cam.nearClippingPane && depth <= cam.farClippingPane) {
                    var w0x = vec3Cache2[faceV0];
                    var w0y = vec3Cache2[faceV0 + 1];
                    var w1x = vec3Cache2[faceV1];
                    var w1y = vec3Cache2[faceV1 + 1];
                    var w2x = vec3Cache2[faceV2];
                    var w2y = vec3Cache2[faceV2 + 1];

                    // --- LIGHTING CALCULATION ---
                    // 1. Calculate Normal (using world/camera-local positions)
                    var e1x = w1x - w0x, e1y = w1y - w0y, e1z = w1z - w0z;
                    var e2x = w2x - w0x, e2y = w2y - w0y, e2z = w2z - w0z;

                    var nx = e1y * e2z - e1z * e2y;
                    var ny = e1z * e2x - e1x * e2z;
                    var nz = e1x * e2y - e1y * e2x;

                    var nLen = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
                    nx *= nLen;
                    ny *= nLen;
                    nz *= nLen;

                    // 2. Light Intensity (Dot product + Ambient)
                    var dot = nx * -lightDirection[0] + ny * -lightDirection[1] + nz * -lightDirection[2];
                    var intensity = Math.max(camera.camera.ambientLight, dot);

                    // 3. Apply Intensity to RGB
                    var r = (mesh.color[0] * intensity) | 0;
                    var g = (mesh.color[1] * intensity) | 0;
                    var b = (mesh.color[2] * intensity) | 0;

                    //FOG

                    if(cam.fogType !== CameraComponent.FogType.NONE) {
                        var fogAmount = 0;
                        if(cam.fogType === CameraComponent.FogType.RADIAL_FAST || cam.fogType === CameraComponent.FogType.RADIAL) {
                            // 1. Get the local camera-space coordinates from your cache
                            // We use the average of the 3 vertices for the face
                            var lx = (vec3Cache2[faceV0] + vec3Cache2[faceV1] + vec3Cache2[faceV2]) * 0.33333;
                            var ly = (vec3Cache2[faceV0 + 1] + vec3Cache2[faceV1 + 1] + vec3Cache2[faceV2 + 1]) * 0.33333;
                            var lz = (vec3Cache2[faceV0 + 2] + vec3Cache2[faceV1 + 2] + vec3Cache2[faceV2 + 2]) * 0.33333;

                            if(cam.fogType === CameraComponent.FogType.RADIAL_FAST) {
                                // We need the squares of your panes for the comparison
                                const nearSq = cam.fogNearPane * cam.fogNearPane;
                                const farSq = cam.fogFarPane * cam.fogFarPane;
                                const invFogRangeSq = 1.0 / (farSq - nearSq);

                                // Calculate Squared Distance (No Math.sqrt!)
                                const distSq = lx * lx + ly * ly + lz * lz;

                                // Calculate fogAmount based on the squared distribution
                                fogAmount = (distSq - nearSq) * invFogRangeSq;
                            }else{
                                // 2. Calculate Radial Distance
                                // Use x, y, and z for a spherical curve, or just x and z for a cylindrical curve.
                                var distance = Math.sqrt(lx * lx + ly * ly + lz * lz);

                                // 3. Calculate fogAmount using distance instead of depth
                                fogAmount = (distance - cam.fogNearPane) / (cam.fogFarPane - cam.fogNearPane);
                            }
                        }else if(cam.fogType === CameraComponent.FogType.LINEAR) {
                            fogAmount = (depth - cam.fogNearPane) / (cam.fogFarPane - cam.fogNearPane);
                        }

                        if (fogAmount > 1) fogAmount = 1;

                        // Blend the mesh color with the fog color
                        if(fogAmount > 0) {
                            r = (r * (1 - fogAmount) + cam.fogColor[0] * fogAmount) | 0;
                            g = (g * (1 - fogAmount) + cam.fogColor[1] * fogAmount) | 0;
                            b = (b * (1 - fogAmount) + cam.fogColor[2] * fogAmount) | 0;
                        }
                    }

                    // 1. Quantize 8-bit color channels to 5-6-5 bits
                    const qr = r & 0xF8; // Keep 5 bits
                    const qg = g & 0xFC; // Keep 6 bits
                    const qb = b & 0xF8; // Keep 5 bits

                    // 2. Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
                    const key = (qr << 8) | (qg << 3) | (qb >> 3);

                    // Extend buffers size if necessary
                    if (depthBuffer.length <= i) {
                        var newLen = (i + 1) * 2;

                        var newArr = new Float32Array(newLen);
                        newArr.set(depthBuffer);
                        depthBuffer = newArr;

                        newArr = new Uint32Array(newLen);
                        newArr.set(indexBuffer);
                        indexBuffer = newArr;

                        newArr = new Uint8Array(newLen);
                        newArr.set(typeBuffer);
                        typeBuffer = newArr;

                        newArr = new Uint16Array(newLen);
                        newArr.set(colorBuffer);
                        colorBuffer = newArr;

                        newArr = new Int16Array(newLen * 6);
                        newArr.set(geometryBuffer);
                        geometryBuffer = newArr;
                    }

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

        return i;
    }

    function screenSpaceCulling(bounds, a, worldToScreenMatrix, vw, vh) {
            // Inlining mat4Mul(bufferMat4, worldToScreenMatrix, a)
            // Because only rows 0 and 1 are needed of the result for X and Y projection
            var b = worldToScreenMatrix;

            // mat4Mul result Row 0 (for X)
            var m0 = b[0] * a[0] + b[4] * a[1] + b[8] * a[2] + b[12] * a[3];
            var m4 = b[0] * a[4] + b[4] * a[5] + b[8] * a[6] + b[12] * a[7];
            var m8 = b[0] * a[8] + b[4] * a[9] + b[8] * a[10] + b[12] * a[11];
            var m12 = b[0] * a[12] + b[4] * a[13] + b[8] * a[14] + b[12] * a[15];

            // mat4Mul result Row 1 (for Y)
            var m1 = b[1] * a[0] + b[5] * a[1] + b[9] * a[2] + b[13] * a[3];
            var m5 = b[1] * a[4] + b[5] * a[5] + b[9] * a[6] + b[13] * a[7];
            var m9 = b[1] * a[8] + b[5] * a[9] + b[9] * a[10] + b[13] * a[11];
            var m13 = b[1] * a[12] + b[5] * a[13] + b[9] * a[14] + b[13] * a[15];

            // Inline vec3TransformMat4 to project first bounding box corner
            var sMinX = m0 * bounds[0] + m4 * bounds[1] + m8 * bounds[2] + m12;
            var sMaxX = sMinX;
            var sMinY = m1 * bounds[0] + m5 * bounds[1] + m9 * bounds[2] + m13;
            var sMaxY = sMinY;

            // Project remaining 7 corners
            for (var i = 3; i < 24; i += 3) {
                var px = bounds[i], py = bounds[i + 1], pz = bounds[i + 2];

                // inline vec3TransformMat4
                var vx = m0 * px + m4 * py + m8 * pz + m12;
                var vy = m1 * px + m5 * py + m9 * pz + m13;

                if (vx < sMinX) sMinX = vx; else if (vx > sMaxX) sMaxX = vx;
                if (vy < sMinY) sMinY = vy; else if (vy > sMaxY) sMaxY = vy;
            }

            // If object's on screen projected 2d bounds overlap with viewport
            return sMaxX >= 0 && sMinX <= vw && sMaxY >= 0 && sMinY <= vh;

    }

    var batchCount = 0;

    var batchBuffer = new Int32Array(1024 * 3); // Start with 1k batches

    function generateBatches(activeIndices, count) {
        batchCount = 0;
        if (count === 0) return;

        var firstIdx = activeIndices[0];
        var currentStart = 0;
        var lastColorKey = colorBuffer[firstIdx];
        var lastType = typeBuffer[firstIdx];

        for (var i = 1; i < count; i++) {
            var index = activeIndices[i];
            var colorKey = colorBuffer[index];
            var type = typeBuffer[index];

            if (colorKey !== lastColorKey || type !== lastType) {
                // --- RESIZE CHECK ---
                if ((batchCount + 1) * 3 >= batchBuffer.length) {
                    var newBatchBuffer = new Int32Array(batchBuffer.length * 2);
                    newBatchBuffer.set(batchBuffer);
                    batchBuffer = newBatchBuffer;
                }

                var bIdx = batchCount * 3;
                batchBuffer[bIdx] = currentStart;
                batchBuffer[bIdx + 1] = i - currentStart;
                batchBuffer[bIdx + 2] = lastColorKey;

                batchCount++;
                currentStart = i;
                lastColorKey = colorKey;
                lastType = type;
            }
        }

        // Final batch resize check
        if ((batchCount + 1) * 3 >= batchBuffer.length) {
            var newBatchBuffer = new Int32Array(batchBuffer.length + 3);
            newBatchBuffer.set(batchBuffer);
            batchBuffer = newBatchBuffer;
        }

        var bIdx = batchCount * 3;
        batchBuffer[bIdx] = currentStart;
        batchBuffer[bIdx + 1] = count - currentStart;
        batchBuffer[bIdx + 2] = lastColorKey;
        batchCount++;
    }

    function renderAxis(gameObject, ctx, worldToScreenMatrix) {
        var W = gameObject.transform.getLocalToWorld();

        // 1. Get the World Position of the object
        // This is the translation component of the Local-to-World matrix
        var worldPosX = W[12];
        var worldPosY = W[13];
        var worldPosZ = W[14];

        // 2. Project the Origin to Screen Space
        // We project the world position, NOT (0,0,0)
        math.vec3TransformMat4to2D(vec3Cache1, 0, worldPosX, worldPosY, worldPosZ, worldToScreenMatrix);
        var ox = vec3Cache1[0], oy = vec3Cache1[1];

        var gizmoSize = 50;

        // 3. Extract and Normalize Basis Vectors
        var axes = [
            { x: W[0], y: W[1], z: W[2], col: '#ff0000' }, // X
            { x: W[4], y: W[5], z: W[6], col: '#00ff00' }, // Y
            { x: W[8], y: W[9], z: W[10], col: '#0000ff' } // Z
        ];

        for (var i = 0; i < 3; i++) {
            var a = axes[i];
            var len = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);

            // If an axis is scaled to 0, we can't normalize it.
            // We default it to a unit vector so the axis still shows.
            if (len < 0.0001) {
                // Optional: fallback to identity directions if scale is 0
                if(i === 0) a.x = 1; else if(i === 1) a.y = 1; else a.z = 1;
                len = 1;
            }

            var nx = a.x / len;
            var ny = a.y / len;
            var nz = a.z / len;

            // 4. Project the Tip
            // Tip Position = World Position + (Normalized Direction * Size)
            math.vec3TransformMat4to2D(
                vec3Cache1, 0,
                worldPosX + nx * gizmoSize,
                worldPosY + ny * gizmoSize,
                worldPosZ + nz * gizmoSize,
                worldToScreenMatrix
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
        for (var i = 0; i < config.layersCount; i++)
            this.layerBuffers[i] = [];
        this.M = [];

        this.vec3Pool = vec3Cache1;
        this.drawCalls = 0;
        this.faces = 0;
    }

    var p = Canvas2dRenderer.prototype,
        bufferVec3 = new Float32Array([0, 0, 0]),
        mat4Buffer1 = new Float32Array(16),
        bufferMat4 = new Float32Array(16);

    p.render = function (camera, viewport, stats) {
        t0 = Date.now();

        this.vec3Pool = vec3Cache1;

        var gameObjects = camera.scene.retrieve(camera),
            gameObjectsCount = gameObjects.length,
            gameObject,
            light = camera.scene.light,
            layersCount = config.layersCount,
            vw = viewport.width,
            vh = viewport.height,
            renderer, renderers, renderersCount, localToWorld, transform,
            i, j, l, ctx, layer;

        var worldToScreenMatrix = viewport.getWorldToScreen();
        var cameraLocal = camera.transform.getWorldToLocal();



        if(light) {
            // 1. Get the world forward vector of the light
            light.transform.forward(lightDirection);

            // 2. TRANSFORM LIGHT INTO CAMERA SPACE
            // We only want the rotation, so we use the top-left 3x3 of the cameraLocal matrix
            var lx = lightDirection[0], ly = lightDirection[1], lz = lightDirection[2];

            // In-place transformation (multiplying by the rotation part of cameraLocal)
            lightDirection[0] = lx * cameraLocal[0] + ly * cameraLocal[4] + lz * cameraLocal[8];
            lightDirection[1] = lx * cameraLocal[1] + ly * cameraLocal[5] + lz * cameraLocal[9];
            lightDirection[2] = lx * cameraLocal[2] + ly * cameraLocal[6] + lz * cameraLocal[10];
        }



        this.drawCalls = 0;
        this.faces = 0;

        if(camera.camera.fogType !== CameraComponent.FogType.NONE) {
            const cam = camera.camera;

            // 1. Quantize 8-bit to 5-6-5 bits
            const qr = cam.fogColor[0] & 0xF8; // Keep 5 bits
            const qg = cam.fogColor[1] & 0xFC; // Keep 6 bits
            const qb = cam.fogColor[2] & 0xF8; // Keep 5 bits

            // 2. Generate 16-bit key: [RRRRR][GGGGGG][BBBBB]
            const key = (qr << 8) | (qg << 3) | (qb >> 3);

            viewport.context.fillStyle = PALETTE_16BIT[key];
            viewport.context.fillRect(0, 0, viewport.width, viewport.height);
        }

        // filter out non-visible objects and put results into visibleObjectsBuffer
        for (i = 0; i < gameObjectsCount; i++) {
            gameObject = gameObjects[i];
            renderer = gameObject.meshRenderer;
            if (renderer !== undefined && renderer.enabled) {
                transform = gameObject.transform;
                localToWorld = (transform.dirtyL) ? transform.getLocalToWorld() : transform.localToWorld;
                if(screenSpaceCulling(renderer.bounds, localToWorld, worldToScreenMatrix, vw, vh)) {
                    visibleObjectsBuffer[visibleObjectsBufferLen++] = renderer;
                }
            }
        }

        // move outside render
        // initialize layer buffers
        for (i = 0; i < layersCount; i++){
            layerBuffers[i] = layerBuffers[i] || [];
        }
        if(layerBufferLengths.length < layersCount){
            var _layerBufferLengths = layerBufferLengths;
            layerBufferLengths = (new Uint32Array(layersCount));
            layerBufferLengths.set(_layerBufferLengths)
        }
        // group visible object to layer buffers
        for(i = 0; i < visibleObjectsBufferLen; i++) {
            renderer = visibleObjectsBuffer[i];
            layer = renderer.layer;
            layerBuffers[layer][layerBufferLengths[layer]++] = renderer;
        }

        // render layer one-by-one
        for (i = 0; i < layersCount; i++) {
            ctx = viewport.layers[i];
            // ctx.lineWidth = 1;
            ctx.lineJoin = 'round';

            if((config.layerClearMask & (i + 1)) === (i+1))
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            renderers = layerBuffers[i];
            renderersCount = layerBufferLengths[i];

            l = 0;
            for (j = 0; j < renderersCount; j++) {
                renderer = renderers[j];

                // if (renderer.constructor === SpriteRenderer)
                //     this.enqueueSprite(renderQueue, ctx, camera);
                // else if (renderer.constructor === PathRenderer)
                //     this.renderPath(renderer, ctx);
                if (renderer.constructor === MeshComponent) {
                    l = meshToRenderCommands(l, camera, renderer, vw, vh, worldToScreenMatrix, cameraLocal);
                }
                // else
                //     this.renderText(renderer, ctx);

                // this.renderAxis(renderer.gameObject, ctx);
            }
            // renderers.length = 0;
            if((config.depthSortingMask & (i + 1)) === (i+1)) {
                indexBuffer.subarray(0, l).sort(depthSort);
            }

            var stroke = (config.layerStrokeMask & (i + 1)) === (i+1);

            generateBatches(indexBuffer, l);

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

                    ctx.moveTo(geometryBuffer[geoIdx],     geometryBuffer[geoIdx + 1]);
                    ctx.lineTo(geometryBuffer[geoIdx + 2], geometryBuffer[geoIdx + 3]);
                    ctx.lineTo(geometryBuffer[geoIdx + 4], geometryBuffer[geoIdx + 5]);
                    ctx.closePath();
                }

                if(this.debug){
                    if(count > 1) {
                        ctx.fillStyle = `rgb(0,0,${b%255})`
                        ctx.fill();
                    }else{
                        ctx.fillStyle = ctx.strokeStyle = PALETTE_16BIT[colorKey];
                        ctx.fill();
                    }
                }else if(this.wireframe) {
                    ctx.lineWidth = 0.5;
                    ctx.strokeStyle = 'rgb(0,0,255)';
                    ctx.stroke();
                }else{
                    ctx.fillStyle = ctx.strokeStyle = PALETTE_16BIT[colorKey];
                    if(stroke) ctx.stroke();
                    ctx.fill();
                }

                if(this.debug) {
                    // --- DEBUG: DRAW ORDER NUMBERS ---
                    ctx.fillStyle = "white"; // Make numbers visible
                    ctx.font = "10px monospace";
                    ctx.textAlign = "center";

                    for (var k = start; k < start + count; k++) {
                        var index = indexBuffer[k];
                        var g = index * 6;

                        // Calculate the center of the triangle for text placement
                        var centerX = (geometryBuffer[g] + geometryBuffer[g + 2] + geometryBuffer[g + 4]) / 3;
                        var centerY = (geometryBuffer[g + 1] + geometryBuffer[g + 3] + geometryBuffer[g + 5]) / 3;

                        // 'k' is the actual sequence index in the final render array
                        ctx.fillText(k.toString()+','+b, centerX, centerY);
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
        visibleObjectsBufferLen = 0;

        stats.dt = Date.now() - t0;
    }

    //Rounding coordinates with Math.round is slow, but looks better
    //Rounding to lowest with pipe operator is faster, but looks worse
    p.renderSprite = function (renderer, layer) {
        vec3TransformMat4(bufferVec3, renderer.gameObject.transform.getPosition(bufferVec3), this.M);
        var sprite = renderer.sprite;

        //layer.drawImage(sprite.sourceImage, sprite.offsetX, sprite.offsetY, sprite.width, sprite.height, Math.round(bufferVec3[0] - renderer.pivotX), Math.round(bufferVec3[1] - renderer.pivotY), sprite.width, sprite.height);
        layer.drawImage(sprite.sourceImage, sprite.offsetX, sprite.offsetY, sprite.width, sprite.height, (bufferVec3[0] - renderer.pivotX)|0, (bufferVec3[1] - renderer.pivotY)|0, sprite.width, sprite.height);
    }

    return Canvas2dRenderer;
});