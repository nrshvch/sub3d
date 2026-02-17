require(["./engine/main", "./engine/noise"], function (scaliaEngine, Noise) {
  var myGame = new scaliaEngine.Game();

  const TILE_SIZE = 45.255;
  var N = 100;
  var SCALE = 2;

  var plane = new scaliaEngine.Plane();
  plane.meshRenderer.layer = 0;
  plane.transform.translate(0, 0, 0);
  plane.transform.scale(TILE_SIZE * N * SCALE, 1, TILE_SIZE * N * SCALE);
  myGame.world.scene.addGameObject(plane);
  const verts = plane.meshRenderer.vertices;

  // verts[1] = 20*SCALE;
  // verts[4] = 20*SCALE;
  // verts[7] = 20 * SCALE;
  // verts[10] = 20 * SCALE;
  // verts[13] = 20 * SCALE;
  var len = Math.pow(N + 1, 2) * 3;
  // console.log(len);
  const noise = new Noise([
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
    36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120,
    234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71,
    134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133,
    230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161,
    1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130,
    116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250,
    124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227,
    47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,
    154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98,
    108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34,
    242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14,
    239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121,
    50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243,
    141, 128, 195, 78, 66, 215, 61, 156, 180,
  ]);
  function calcZ(x, y) {
    var land = 0,
      island = 0;

    x += 640;
    y += 700;

    land += noise.noise2D(x / 512, y / 512) / 2; //noisemap of continents
    land += noise.noise2D(x / 256, y / 256) / 4; //of smaller lands
    land += noise.noise2D(x / 128, y / 128) / 8; //...
    land += noise.noise2D(x / 64, y / 64) / 16; //...
    land += noise.noise2D(x / 32, y / 32) / 32; //...
    land += noise.noise2D(x / 16, y / 16) / 64; //...
    land += noise.noise2D(x / 8, y / 8) / 64; //smallest details

    island += noise.noise2D(x / 64, y / 64) / 10;
    island += noise.noise2D(x / 32, y / 32) / 20;
    island += noise.noise2D(x / 16, y / 16) / 40;
    island += noise.noise2D(x / 8, y / 8) / 40;

    return Math.floor((0.8 * land + 0.2 * island) * 16);
  }

  for (var i = 0; i < len; i += 3) {
    const _i = (i / 3) % (len / 3);
    const x = _i % (N + 1);
    const y = (_i / (N + 1)) | 0;
    // console.log(x, y, calcZ(x*100, y*100));
    const random = (noise.noise2D(x, y) + 1) * 0.5;
    // verts[i + 1] = Math.round(Math.random()) * 16*SCALE;
    verts[i + 1] = calcZ(x * 1, y * 1) * 16 * SCALE;
  }

  function getTTDMidpoint(hTL, hTR, hBR, hBL) {
    // 1. Manual Sort (a <= b <= c <= d)
    let a = hTL,
      b = hTR,
      c = hBR,
      d = hBL,
      t;
    if (a > b) {
      t = a;
      a = b;
      b = t;
    }
    if (c > d) {
      t = c;
      c = d;
      d = t;
    }
    if (a > c) {
      t = a;
      a = c;
      c = t;
    }
    if (b > d) {
      t = b;
      b = d;
      d = t;
    }
    if (b > c) {
      t = b;
      b = c;
      c = t;
    }

    // 2. Majority Rule (3-vs-1)
    // Handles your "3 corners at h=1" case specifically.
    if (a === c) return a; // 3 corners are low (min)
    if (b === d) return d; // 3 corners are high (max)

    // 3. Diagonal Fold Rule (Tie 2-vs-2)
    // In your order (TL, TR, BR, BL), diagonals are (TL, BR) and (TR, BL)
    if (hTL === hBR) return hTL;
    if (hTR === hBL) return hTR;

    // 4. Ramp Rule (Fallback)
    // Adjacent corners are different, diagonals are different.
    return (a + d) * 0.5;
  }

  const colors = [];
  const faceColors = [];
  for (var x = 0; x < N; x++) {
    for (var y = 0; y < N; y++) {
      var a = (x * (N + 1) + y) * 3;
      var ay = a + 1;
      var by = a + 4;
      var cy = a + (N + 1) * 3 + 4;
      var dy = cy - 3;

      var e = (N + 1) * (N + 1) * 3 + (x * N + y) * 3;
      var ey = e + 1;

      const h_ay = verts[ay];
      const h_by = verts[by];
      const h_cy = verts[cy];
      const h_dy = verts[dy];



      if(Math.max(h_ay, h_by, h_cy, h_dy) <= 0){
        //water

        verts[ay] = 0;
        verts[by] = 0;
        verts[cy] = 0;
        verts[dy] = 0;
        verts[ey] = (Math.random()*2-1) * 2;

        const colorIdx = colors.length;
        colors.push(0, 0, 200);
        faceColors.push(colorIdx, colorIdx, colorIdx, colorIdx);
      }else if (Math.min(h_ay, h_by, h_cy, h_dy) <= 0){
        const coastColorIdx = colors.length;
        colors.push(Math.random() * 20 + 200, Math.random() * 20 + 200, 0);

        //coast
        const h_ey = verts[ey] = getTTDMidpoint(verts[ay], verts[by], verts[cy], verts[dy]);

        //if is partially water (has water faces)
        if (h_ey === 0) {
          const waterColorIdx = colors.length;
            colors.push(0, 0, 200);

          //test every face for being a water
          if (h_ay === h_by) {
            faceColors.push(waterColorIdx);
          } else {
            faceColors.push(coastColorIdx);
          }

          if (h_by === h_cy) {
            faceColors.push(waterColorIdx);
          } else {
            faceColors.push(coastColorIdx);
          }

          if (h_cy === h_dy) {
            faceColors.push(waterColorIdx);
          } else {
            faceColors.push(coastColorIdx);
          }

          if (h_dy === h_ay) {
            faceColors.push(waterColorIdx);
          } else {
            faceColors.push(coastColorIdx);
          }
          //if is partially grass (has grass faces)
        } else {
          const grassColorIdx = colors.length;
          colors.push(0, Math.random() * 20 + 200, 0);

          //test every face for being a grass
          if (h_ay === h_by && h_ay === h_ey) {
            faceColors.push(grassColorIdx);
          } else {
            faceColors.push(coastColorIdx);
          }

          if (h_by === h_cy && h_by === h_ey) {
            faceColors.push(grassColorIdx);
          } else {
            faceColors.push(coastColorIdx);
          }

          if (h_cy === h_dy && h_cy === h_ey) {
            faceColors.push(grassColorIdx);
          } else {
            faceColors.push(coastColorIdx);
          }

          if (h_dy === h_ay && h_dy === h_ey) {
            faceColors.push(grassColorIdx);
          } else {
            faceColors.push(coastColorIdx);
          }
        }
      }else{
        //ground
        verts[ey] = getTTDMidpoint(verts[ay], verts[by], verts[cy], verts[dy]);
        const colorIdx = colors.length;
        colors.push(0, Math.random() * 20 + 200, 0);
        faceColors.push(colorIdx, colorIdx, colorIdx, colorIdx);
      }
    }
  }
  plane.meshRenderer.colors = new Uint8Array(colors);
  plane.meshRenderer.faceColors = new Uint32Array(faceColors);

  // for (var i = 0; i < N; i++) {
  //   for (var j = 0; j < N; j++) {
  //     var plane = new scaliaEngine.Plane();
  //     plane.meshRenderer.color = new Uint8Array([
  //       0,
  //       Math.random() * 55 + 200,
  //       0,
  //     ]);
  //     plane.meshRenderer.layer = 0;
  //     plane.transform.translate((i - N / 2) * TILE_SIZE, 0, (j - N / 2) * TILE_SIZE);
  //     plane.transform.scale(TILE_SIZE, 1, TILE_SIZE);
  //     myGame.world.scene.addGameObject(plane);
  //
  //     if (Math.random() > 0.8) {
  //       var tree = new scaliaEngine.Cone();
  //       tree.meshRenderer.color = new Uint8Array([0, 100, 0]);
  //       tree.meshRenderer.layer = 1;
  //       const offsetX = Math.random() * 24 - 12;
  //       const offsetY = Math.random() * 24 - 12;
  //       const size = Math.random() / 2 + 0.5;
  //       const yRot = Math.random() * 50 - 25;
  //       tree.transform.translate(
  //         (i - N / 2) * TILE_SIZE + offsetX,
  //         1,
  //         (j - N / 2) * TILE_SIZE + offsetY,
  //       );
  //       tree.transform.scale(25 * size, 50 * size, 25 * size);
  //       tree.transform.rotate(0, yRot, 0);
  //       myGame.world.scene.addGameObject(tree);
  //       // tree.debug = true;
  //     }
  //   }
  // }

  // const box = new scaliaEngine.Box();
  // box.transform.scale(100,100,100);
  // box.meshRenderer.color = new Uint8Array([0,0,255]);
  // box.meshRenderer.layer = 1;
  // myGame.world.scene.addGameObject(box);
  // myGame.world.tickRegister(box);
  // box.transform.rotate(0, 0, 45);
  // box.transform.rotate(35.264, 0, 0, 'world');
  // box.debug = true;

  // const ball = new scaliaEngine.Ball();
  // ball.transform.scale(100,100,100);
  // ball.meshRenderer.color = new Uint8Array([0,0,255]);
  // ball.meshRenderer.layer = 1;
  // myGame.world.scene.addGameObject(ball);
  // myGame.world.tickRegister(ball);
  // ball.debug = true;

  var cameraObject = (window.camera = new scaliaEngine.Camera());
  cameraObject.camera.farClippingPane = 2000;
  cameraObject.camera.nearClippingPane = -2000;
  cameraObject.camera.fogType =
    scaliaEngine.CameraComponent.FogType.RADIAL_FAST;
  cameraObject.camera.fogFarPane = 2000;
  cameraObject.camera.fogNearPane = 500;
  cameraObject.camera.fogColor = new Uint8Array([50, 150, 50]);
  cameraObject.camera.bgColor = new Uint8Array([50, 150, 50]);
  cameraObject.camera.ambientLight = 0.5;
  cameraObject.transform.rotate(30, 45, 0);
  cameraObject.transform.translate(0, 0, 0);

  var dt = null;
  myGame.world.tickRegister({
    tick: (time) => {
      if (dt !== null) {
        var d = Date.now() - dt;

        cameraObject.transform.rotate(0, d / 1000, 0, "world");
      }

      dt = time.now;
    },
  });

  document.onkeydown = function (e) {
    if (e.keyCode == 65) {
      //a
      camera.transform.translate(0, 0, -10, "world");
    } else if (e.keyCode == 68) {
      //d
      camera.transform.translate(0, 0, 10, "world");
    } else if (e.keyCode == 87) {
      //w
      camera.transform.translate(10, 0, 0, "world");
    } else if (e.keyCode == 83) {
      //s
      camera.transform.translate(-10, 0, 0, "world");
    }
  };

  mousepressed = false;

  var x0, y0;

  document.onmousedown = function (e) {
    mousepressed = true;
    x0 = e.pageX;
    y0 = e.pageY;
  };

  document.onmouseup = function () {
    mousepressed = false;
  };

  document.onmousemove = function (e) {
    if (!mousepressed) return;

    var x = e.pageX;
    var y = e.pageY;

    var dx = x - x0;
    var dy = y - y0;

    x0 = x;
    y0 = y;
    //console.log(dy);
    camera.transform.translate(-dx + dy, 0, dx + dy, "world");
  };

  document.onwheel = function (e) {
    camera.transform.rotate(e.deltaY / 102, 0, 0);
  };

  myGame.world.scene.addGameObject(cameraObject);

  const sun = new scaliaEngine.DirectionalLight();
  myGame.world.scene.addLightSource(sun);
  sun.transform.rotate(45, 0, 0);
  myGame.world.tickRegister({
    tick: (time) => {
      if (dt !== null) {
        sun.transform.rotate(0, 0.1, 0, "world");
      }
      dt = time.now;
    },
  });

  myGame.run();

  const viewport = new scaliaEngine.Canvas2dViewport(
    camera.camera,
    document.getElementById("canvas"),
  );

  viewport.start();

  window.myGame = myGame;
  var renderer = viewport.renderer;
  var fps,
    avgDt,
    maxFps = 0;
  var fpsEl = document.getElementById("fps");
  var maxFpsEl = document.getElementById("maxFps");
  var drawCallsEl = document.getElementById("drawCalls");
  var objectsEl = document.getElementById("objects");
  var visibleObjectsEl = document.getElementById("visibleObjects");
  var facesCountEl = document.getElementById("facesCount");

  const debugBtn = document.getElementById("debug-btn");
  const debugWireframeBtn = document.getElementById("debug-wireframe-btn");
  debugBtn.addEventListener("click", () => {
    renderer.wireframe = false;
    renderer.debug = !renderer.debug;
  });
  debugWireframeBtn.addEventListener("click", () => {
    renderer.debug = false;
    renderer.wireframe = !renderer.wireframe;
  });

  setInterval(() => {
    const dt = viewport.lastRenderStats.dt;
    fps = dt > 0 ? (1000 / dt) | 0 : 1000;
    avgDt = avgDt === undefined ? dt : (avgDt + dt) / 2;
    maxFps = Math.max(maxFps, fps);
    fpsEl.innerText = fps;
    maxFpsEl.innerText = maxFps;
    drawCallsEl.innerText = viewport.lastRenderStats.drawCalls;
    objectsEl.innerText = myGame.world.scene.gameObjects.length;
    visibleObjectsEl.innerText = viewport.lastRenderStats.visibleObjects;
    facesCountEl.innerText = viewport.lastRenderStats.faces;
  }, 100);
});
