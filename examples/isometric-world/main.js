import scaliaEngine from "sub3d";
import Noise from "./noise.js";
import Terrain from "./terrain.js";
import Tree from "./Tree.js";

var myGame = new scaliaEngine.Game();

const TILE_SIZE = 45.255;
var N = 100;
var SCALE = 1.6;

var terrain = new Terrain();
terrain.meshRenderer.layer = 0;
terrain.meshRenderer.shaderType = 0;
terrain.transform.translate(0, 0, 0);
terrain.transform.scale(TILE_SIZE * N * SCALE, 1, TILE_SIZE * N * SCALE);
myGame.world.scene.addGameObject(terrain);
const verts = terrain.meshRenderer.vertices;

var len = Math.pow(N + 1, 2) * 3;

const noise = new Noise([
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
  36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
  75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
  149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
  27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
  92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
  209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
  164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
  147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
  28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
  155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
  178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
  191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
  181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
  138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
  61, 156, 180,
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
  verts[i + 1] = calcZ(x, y) * 16 * SCALE;
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

function getInterpolatedTTDHeight(u, v, h00, h01, h11, h10, hmid) {
  if (u + v < 1) {
    if (u > v) {
      // Triangle North (0,0)-(1,0)-(0.5,0.5)
      return (1 - u - v) * h00 + (u - v) * h10 + 2 * v * hmid;
    } else {
      // Triangle West (0,0)-(0,1)-(0.5,0.5)
      return (1 - v - u) * h00 + (v - u) * h01 + 2 * u * hmid;
    }
  } else {
    if (u > v) {
      // Triangle East (1,0)-(1,1)-(0.5,0.5)
      return (u - v) * h10 + (u + v - 1) * h11 + 2 * (1 - u) * hmid;
    } else {
      // Triangle South (0,1)-(1,1)-(0.5,0.5)
      return (v - u) * h01 + (u + v - 1) * h11 + 2 * (1 - v) * hmid;
    }
  }
}

function getTerrainHeight(worldX, worldZ) {
  const fcol = worldX / (TILE_SIZE * SCALE) + N / 2;
  const frow = worldZ / (TILE_SIZE * SCALE) + N / 2;
  const col = Math.floor(fcol);
  const row = Math.floor(frow);

  if (col < 0 || col >= N || row < 0 || row >= N) return 0;

  const u = fcol - col;
  const v = frow - row;

  const a = (row * (N + 1) + col) * 3;
  const ay = a + 1; // (row, col)
  const by = a + 4; // (row, col+1)
  const cy = a + (N + 1) * 3 + 4; // (row+1, col+1)
  const dy = cy - 3; // (row+1, col)
  const e = (N + 1) * (N + 1) * 3 + (row * N + col) * 3;
  const ey = e + 1;

  return getInterpolatedTTDHeight(
    u,
    v,
    verts[ay],
    verts[dy],
    verts[cy],
    verts[by],
    verts[ey],
  );
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

    if (Math.max(h_ay, h_by, h_cy, h_dy) <= 0) {
      //water

      verts[ay] = 0;
      verts[by] = 0;
      verts[cy] = 0;
      verts[dy] = 0;
      verts[ey] = (Math.random() * 2 - 1) * 2;

      const colorIdx = colors.length;
      colors.push(0x0000C8);
      faceColors.push(colorIdx, colorIdx, colorIdx, colorIdx);
    } else if (Math.min(h_ay, h_by, h_cy, h_dy) <= 0) {
      const coastColorIdx = colors.length;
      const cr = (Math.random() * 20 + 200) | 0;
      const cg = (Math.random() * 20 + 200) | 0;
      colors.push((cr << 16) | (cg << 8));

      //coast
      const h_ey = (verts[ey] = getTTDMidpoint(
        verts[ay],
        verts[by],
        verts[cy],
        verts[dy],
      ));

      //if is partially water (has water faces)
      if (h_ey === 0) {
        const waterColorIdx = colors.length;
        colors.push(0x0000C8);

        //test every face for being a water
        faceColors.push(h_ay === h_by ? waterColorIdx : coastColorIdx);
        faceColors.push(h_by === h_cy ? waterColorIdx : coastColorIdx);
        faceColors.push(h_cy === h_dy ? waterColorIdx : coastColorIdx);
        faceColors.push(h_dy === h_ay ? waterColorIdx : coastColorIdx);

        //if is partially grass (has grass faces)
      } else {
        const grassColorIdx = colors.length;
        const gg = (Math.random() * 20 + 200) | 0;
        colors.push(gg << 8);

        //test every face for being a grass
        faceColors.push(
          h_ay === h_ey && h_by === h_ey ? grassColorIdx : coastColorIdx,
        );
        faceColors.push(
          h_by === h_ey && h_cy === h_ey ? grassColorIdx : coastColorIdx,
        );
        faceColors.push(
          h_cy === h_ey && h_dy === h_ey ? grassColorIdx : coastColorIdx,
        );
        faceColors.push(
          h_dy === h_ey && h_ay === h_ey ? grassColorIdx : coastColorIdx,
        );
      }
    } else {
      //ground
      verts[ey] = getTTDMidpoint(verts[ay], verts[by], verts[cy], verts[dy]);
      const colorIdx = colors.length;
      const gg = (Math.random() * 20 + 200) | 0;
      colors.push(gg << 8);
      faceColors.push(colorIdx, colorIdx, colorIdx, colorIdx);
    }
  }
}
terrain.meshRenderer.colors = new Uint32Array(colors);
terrain.meshRenderer.faceColors = new Uint32Array(faceColors);

const simplifiedMesh = Terrain.simplifyExistingGridMesh(
  terrain.meshRenderer.vertices,
  terrain.meshRenderer.faces,
  terrain.meshRenderer.faceColors,
  N,
);

terrain.meshRenderer.faces = simplifiedMesh.faces;
terrain.meshRenderer.vertices = simplifiedMesh.vertices;
terrain.meshRenderer.faceColors = simplifiedMesh.faceColors;
terrain.meshRenderer.vertices = simplifiedMesh.vertices;

terrain.meshRenderer.updateNormals();

for (var i = 0; i < N; i++) {
  for (var j = 0; j < N; j++) {
    // i is column (X), j is row (Z)
    var x = j; // row index
    var y = i; // col index
    var a = (x * (N + 1) + y) * 3;
    var ay = a + 1; // (row x, col y)   -> (0,0)
    var by = a + 4; // (row x, col y+1) -> (1,0)
    var cy = a + (N + 1) * 3 + 4; // (row x+1, col y+1) -> (1,1)
    var dy = cy - 3; // (row x+1, col y) -> (0,1)

    var e = (N + 1) * (N + 1) * 3 + (x * N + y) * 3;
    var ey = e + 1;

    const h_00 = verts[ay];
    const h_10 = verts[by];
    const h_11 = verts[cy];
    const h_01 = verts[dy];
    const h_mid = verts[ey];

    const TREE_SCALE = 0.8;

    if (Math.random() > 0.6 && Math.min(h_00, h_10, h_11, h_01) > 0) {
      var tree = new Tree();
      tree.meshRenderer.colors = new Uint32Array([0x006400]);
      tree.meshRenderer.layer = 1;

      const u = 0.25 + Math.random() * 0.5;
      const v = 0.25 + Math.random() * 0.5;
      const offsetX = u * TILE_SIZE * SCALE;
      const offsetY = v * TILE_SIZE * SCALE;

      const size = Math.random() / 2 + 0.5;
      const yRot = Math.random() * 50 - 25;

      const h = getInterpolatedTTDHeight(u, v, h_00, h_01, h_11, h_10, h_mid);

      tree.transform.translate(
        (i - N / 2) * TILE_SIZE * SCALE + offsetX,
        h,
        (j - N / 2) * TILE_SIZE * SCALE + offsetY,
      );
      tree.transform.scale(
        25 * size * SCALE * TREE_SCALE,
        50 * size * SCALE * TREE_SCALE,
        25 * size * SCALE * TREE_SCALE,
      );
      tree.transform.rotate(
        (Math.random() * 10 - 5) | 0,
        yRot,
        (Math.random() * 10 - 5) | 0,
      );

      myGame.world.scene.addGameObject(tree);
    }
  }
}

// const box = new scaliaEngine.Box();
// box.transform.scale(100, 100, 100);
// box.transform.rotate(0, 0, 45);
// box.transform.rotate(35.264, 0, 0, "world");
// box.meshRenderer.layer = 1;
// box.debug = true;
// myGame.world.scene.addGameObject(box);

// const ball = new scaliaEngine.Ball();
// ball.transform.scale(100, 100, 100);
// ball.meshRenderer.layer = 1;
// ball.debug = true;
// myGame.world.scene.addGameObject(ball);
// myGame.world.tickRegister({
//   tick: function (time) {
//     ball.transform.translate(0, Math.sin(time.time / 500) * 10, 0, "world");
//     ball.transform.rotate(0, 10, 0, "world");
//   },
// });

var cameraObject = (window.camera = new scaliaEngine.Camera());
//TODO: far/near are swapped for some reason, most likely because gl-matrix is far=-Z, but we assume far=+Z
cameraObject.camera.farClippingPane = 2500;
cameraObject.camera.nearClippingPane = -2500;
cameraObject.camera.fogType = scaliaEngine.CameraComponent.FogType.RADIAL;
cameraObject.camera.fogFarPane = 2500;
cameraObject.camera.fogNearPane = 1500;
cameraObject.camera.fogColor = 0x8CB4C8;
cameraObject.camera.bgColor = 0x8CB4C8;
cameraObject.camera.ambientLight = 0x202020;
cameraObject.transform.rotate(30, 45, 0);
cameraObject.transform.translate(0, 0, 0);

var dt = null;
myGame.world.tickRegister({
  tick: (time) => {
    if (dt !== null) {
      var d = Date.now() - dt;

      cameraObject.transform.rotate(0, d / 1000, 0, "world");

      const chkbxAutoCycleEl = document.getElementById("chkbx_auto_cycle");
      if (chkbxAutoCycleEl && chkbxAutoCycleEl.checked) {
        currentAngle = (currentAngle + (CYCLE_SPEED * d) / 1000) % 360;
        updateDaylightCycle(currentAngle);
      }
    }

    dt = time.now;
  },
});

var x0, y0;
var mousepressed = false;

document.onpointerdown = function (e) {
  // Add this line at the very top to stop Safari from scrolling/refreshing
  if (e.cancelable) e.preventDefault();

  mousepressed = true;
  x0 = e.pageX;
  y0 = e.pageY;
};

document.onpointerup = function () {
  // Add this line at the very top to stop Safari from scrolling/refreshing
  if (e.cancelable) e.preventDefault();

  mousepressed = false;
};

document.onpointermove = function (e) {
  // Add this line at the very top to stop Safari from scrolling/refreshing
  if (e.cancelable) e.preventDefault();

  if (!mousepressed) return;

  var x = e.pageX;
  var y = e.pageY;

  var dx = x - x0;
  var dy = y - y0;

  x0 = x;
  y0 = y;

  const mat = cameraObject.transform.getLocalToWorld();

  // Right vector (first column)
  const rx = mat[0];
  const rz = mat[2];
  const rLen = Math.sqrt(rx * rx + rz * rz);
  const rightX = rx / rLen;
  const rightZ = rz / rLen;

  // Forward vector (negative third column)
  const fx = -mat[8];
  const fz = -mat[10];
  const fLen = Math.sqrt(fx * fx + fz * fz);
  const forwardX = fx / fLen;
  const forwardZ = fz / fLen;

  const sensitivity = 0.5 * SCALE;
  const moveX = rightX * (-dx * sensitivity) + forwardX * (-dy * sensitivity);
  const moveZ = rightZ * (-dx * sensitivity) + forwardZ * (-dy * sensitivity);

  cameraObject.transform.translate(moveX, 0, moveZ, "world");

  const pos = cameraObject.transform.getPosition();
  const terrainH = getTerrainHeight(pos[0], pos[2]);
  cameraObject.transform.setPosition(pos[0], terrainH, pos[2]);
};

document.onwheel = function (e) {
  camera.transform.rotate(e.deltaY / 102, 0, 0);
};

myGame.world.scene.addGameObject(cameraObject);

const sun = new scaliaEngine.Light();
myGame.world.scene.addGameObject(sun);
sun.transform.rotate(45, 0, 0);

myGame.run();

const viewport = new scaliaEngine.Canvas2dViewport(
  camera.camera,
  document.getElementById("canvas"),
);
viewport.dpr = window.devicePixelRatio;
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
var dprEl = document.getElementById("dpr");
var systemDprEl = document.getElementById("system_dpr");

const isDebug = window.location.pathname.includes('/debug') || window.location.search.includes('debug');

if (isDebug) {
  const debugEl = document.getElementById("debug");
  debugEl.style.display = "block";
  debugEl.addEventListener("pointerdown", (e) => e.stopPropagation());
  debugEl.addEventListener("pointermove", (e) => e.stopPropagation());
  debugEl.addEventListener("pointerup", (e) => e.stopPropagation());
  if (systemDprEl) {
    systemDprEl.innerText = viewport.dpr.toFixed(2);
  }
}

const chkbx1El = document.getElementById("chkbx_1");
chkbx1El.addEventListener("change", (e) => {
  renderer.wireframe = chkbx1El.checked;
});

const chkbx2El = document.getElementById("chkbx_2");
chkbx2El.addEventListener("change", (e) => {
  terrain.meshRenderer.shaderType = chkbx2El.checked ? 4 : 0;
});

const sliderFogNearEl = document.getElementById("slider_fog_near");
const fogNearValueEl = document.getElementById("fogNearValue");
const sliderFogFarEl = document.getElementById("slider_fog_far");
const fogFarValueEl = document.getElementById("fogFarValue");

function updateFog(nearVal, farVal) {
  cameraObject.camera.fogNearPane = nearVal;
  cameraObject.camera.fogFarPane = farVal;
  cameraObject.camera.farClippingPane = farVal;

  sliderFogNearEl.value = nearVal;
  sliderFogFarEl.value = farVal;

  fogNearValueEl.innerText = nearVal;
  fogFarValueEl.innerText = farVal;
}

sliderFogNearEl.addEventListener("input", (e) => {
  if (chkbxAutoCycleEl) chkbxAutoCycleEl.checked = false;
  let nearVal = parseInt(e.target.value, 10);
  let farVal = parseInt(sliderFogFarEl.value, 10);
  if (nearVal > farVal) {
    farVal = nearVal;
  }
  updateFog(nearVal, farVal);
});

sliderFogFarEl.addEventListener("input", (e) => {
  if (chkbxAutoCycleEl) chkbxAutoCycleEl.checked = false;
  let farVal = parseInt(e.target.value, 10);
  let nearVal = parseInt(sliderFogNearEl.value, 10);
  if (farVal < nearVal) {
    nearVal = farVal;
  }
  updateFog(nearVal, farVal);
});

const sliderSunAngleEl = document.getElementById("slider_sun_angle");
const sunAngleValueEl = document.getElementById("sunAngleValue");
const colorSunEl = document.getElementById("color_sun");

sliderSunAngleEl.addEventListener("input", (e) => {
  if (chkbxAutoCycleEl) chkbxAutoCycleEl.checked = false;
  const angleVal = parseInt(e.target.value, 10);
  currentAngle = angleVal;
  updateDaylightCycle(angleVal);
});

colorSunEl.addEventListener("input", (e) => {
  if (chkbxAutoCycleEl) chkbxAutoCycleEl.checked = false;
  const hex = e.target.value;
  const colorInt = parseInt(hex.substring(1), 16);
  sun.light.color = colorInt;
});

const colorFogEl = document.getElementById("color_fog");
const colorAmbientEl = document.getElementById("color_ambient");

colorFogEl.addEventListener("input", (e) => {
  if (chkbxAutoCycleEl) chkbxAutoCycleEl.checked = false;
  const hex = e.target.value;
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const colorInt = (r << 16) | (g << 8) | b;
  cameraObject.camera.fogColor = colorInt;
  cameraObject.camera.bgColor = colorInt;
});

colorAmbientEl.addEventListener("input", (e) => {
  if (chkbxAutoCycleEl) chkbxAutoCycleEl.checked = false;
  const hex = e.target.value;
  const colorInt = parseInt(hex.substring(1), 16);
  cameraObject.camera.ambientLight = colorInt;
});

const sliderDprEl = document.getElementById("slider_dpr");
sliderDprEl.value = viewport.scale;
sliderDprEl.addEventListener("input", (e) => {
  const val = parseFloat(e.target.value);
  viewport.scale = val;
  viewport.setSize(viewport.canvas.offsetWidth, viewport.canvas.offsetHeight);
  dprEl.innerText = val.toFixed(2);
});

// --- Day/Night Cycle Simulation ---
const chkbxAutoCycleEl = document.getElementById("chkbx_auto_cycle");
let currentAngle = 45; // Start at morning/afternoon angle
const CYCLE_SPEED = 6.0; // degrees per second (60 seconds for a full 360-degree loop)

const keyframes = [
  { angle: 0, sunColor: [160, 70, 60], ambientColor: [35, 30, 38], fogColor: [140, 100, 120], fogNear: 800, fogFar: 1800 },
  { angle: 15, sunColor: [150, 150, 140], ambientColor: [55, 65, 80], fogColor: [140, 180, 200], fogNear: 1500, fogFar: 2500 },
  { angle: 90, sunColor: [140, 150, 175], ambientColor: [55, 70, 95], fogColor: [140, 180, 200], fogNear: 1500, fogFar: 2500 },
  { angle: 165, sunColor: [150, 150, 140], ambientColor: [55, 65, 80], fogColor: [140, 180, 200], fogNear: 1500, fogFar: 2500 },
  { angle: 180, sunColor: [150, 65, 50], ambientColor: [35, 28, 35], fogColor: [100, 70, 100], fogNear: 800, fogFar: 1800 },
  { angle: 210, sunColor: [0, 0, 0], ambientColor: [28, 35, 52], fogColor: [20, 25, 38], fogNear: 500, fogFar: 1500 },
  { angle: 270, sunColor: [0, 0, 0], ambientColor: [28, 35, 52], fogColor: [20, 25, 38], fogNear: 500, fogFar: 1500 },
  { angle: 330, sunColor: [0, 0, 0], ambientColor: [28, 35, 52], fogColor: [20, 25, 38], fogNear: 500, fogFar: 1500 },
  { angle: 360, sunColor: [160, 70, 60], ambientColor: [35, 30, 38], fogColor: [140, 100, 120], fogNear: 800, fogFar: 1800 }
];

function getInterpolatedCycle(angle) {
  angle = ((angle % 360) + 360) % 360;

  let lower = keyframes[0];
  let upper = keyframes[keyframes.length - 1];
  for (let i = 0; i < keyframes.length - 1; i++) {
    if (angle >= keyframes[i].angle && angle <= keyframes[i + 1].angle) {
      lower = keyframes[i];
      upper = keyframes[i + 1];
      break;
    }
  }

  const range = upper.angle - lower.angle;
  const t = range === 0 ? 0 : (angle - lower.angle) / range;

  const lerp = (a, b, t) => a + (b - a) * t;
  const lerpColor = (c1, c2, t) => [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t))
  ];

  const sunColor = lerpColor(lower.sunColor, upper.sunColor, t);
  const ambientColor = lerpColor(lower.ambientColor, upper.ambientColor, t);
  const fogColor = lerpColor(lower.fogColor, upper.fogColor, t);
  const fogNear = Math.round(lerp(lower.fogNear, upper.fogNear, t));
  const fogFar = Math.round(lerp(lower.fogFar, upper.fogFar, t));

  return {
    sunColor: (sunColor[0] << 16) | (sunColor[1] << 8) | sunColor[2],
    ambientColor: (ambientColor[0] << 16) | (ambientColor[1] << 8) | ambientColor[2],
    fogColor: (fogColor[0] << 16) | (fogColor[1] << 8) | fogColor[2],
    fogNear,
    fogFar
  };
}

function updateDaylightCycle(angle) {
  const state = getInterpolatedCycle(angle);

  // Update light transform rotation using a continuous triangle wave
  // Sweeps from 20 to 160 during the day, and back from 160 to 20 at night
  let lightAngle;
  if (angle <= 180) {
    lightAngle = 20 + (angle / 180) * 140;
  } else {
    lightAngle = 160 - ((angle - 180) / 180) * 140;
  }
  scaliaEngine.glMatrix.mat4.identity(sun.transform.local);
  sun.transform.rotate(lightAngle, 0, 0);

  // Update engine states
  sun.light.color = state.sunColor;
  cameraObject.camera.ambientLight = state.ambientColor;
  cameraObject.camera.fogColor = state.fogColor;
  cameraObject.camera.bgColor = state.fogColor;
  cameraObject.camera.fogNearPane = state.fogNear;
  cameraObject.camera.fogFarPane = state.fogFar;
  cameraObject.camera.farClippingPane = state.fogFar;

  // Update UI inputs
  if (sliderSunAngleEl) {
    sliderSunAngleEl.value = Math.round(angle);
    sunAngleValueEl.innerText = Math.round(angle);
  }
  if (colorSunEl) {
    colorSunEl.value = "#" + state.sunColor.toString(16).padStart(6, "0");
  }
  if (colorAmbientEl) {
    colorAmbientEl.value = "#" + state.ambientColor.toString(16).padStart(6, "0");
  }
  if (colorFogEl) {
    colorFogEl.value = "#" + state.fogColor.toString(16).padStart(6, "0");
  }
  if (sliderFogNearEl) {
    sliderFogNearEl.value = state.fogNear;
    fogNearValueEl.innerText = state.fogNear;
  }
  if (sliderFogFarEl) {
    sliderFogFarEl.value = state.fogFar;
    fogFarValueEl.innerText = state.fogFar;
  }
}

// Initial update to synchronize the cycle at start
updateDaylightCycle(currentAngle);

setInterval(() => {
  if (!isDebug) return;
  const dt = viewport.lastRenderStats.dt;
  fps = viewport.lastRenderStats.fps;
  avgDt = avgDt === undefined ? dt : (avgDt + dt) / 2;
  maxFps = Math.max(maxFps, fps);
  fpsEl.innerText = fps;
  maxFpsEl.innerText = maxFps;
  drawCallsEl.innerText = viewport.lastRenderStats.drawCalls;
  objectsEl.innerText = viewport.lastRenderStats.totalObjects;
  visibleObjectsEl.innerText = viewport.lastRenderStats.visibleObjects;
  facesCountEl.innerText = viewport.lastRenderStats.faces;
  dprEl.innerText = viewport.scale.toFixed(2);
}, 100);
