import scaliaEngine from "sub3d";
import "sub3d/sub3d.css";
import boxTexture from "./box.png";

const myGame = new scaliaEngine.Game();

let targetCount = 500;

// mulberry32, seeded per box rather than one stream for the whole scene: a box's properties then
// depend only on its index, so raising and lowering the count slider reproduces the boxes it had
// before instead of generating new ones. Integer arithmetic throughout, which also makes it
// bit-identical across engines - Math.sin, the other seeded generator in these examples, is
// specified with implementation-defined precision and so cannot promise that.
const SCENE_SEED = 0x5eed;

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ball = new scaliaEngine.Ball(...scaliaEngine.Ball.generate());
ball.meshRenderer.layer = 1;
ball.meshRenderer.shaderType = 0;

ball.transform.scale(20, 20, 20);

let dt = null;
myGame.world.tickRegister({
  tick: (time) => {
    if (dt !== null) {
      ball.transform.rotate(1, 1 / 2, 1 / 4, "world");
    }
    dt = time.now;

    if (boxes.length < targetCount) {
      const boxesLen = boxes.length;
      for (let j = 0; j < targetCount - boxesLen; j++) {
        const box = createBox(boxes.length);
        ball.transform.addChild(box.child.transform);
        boxes.push(box);
        myGame.world.tickRegister(box);
      }
    } else if (boxes.length > targetCount) {
      const i1 = boxes.length - targetCount;
      for (let i = 0; i < i1; i++) {
        const box = boxes.pop();
        ball.transform.removeChild(box.child.transform);
        myGame.world.tickUnregister(box);
      }
    }
  },
});

function createBox(index) {
  // Scramble the index by the golden-ratio constant before seeding, so neighbouring boxes get
  // unrelated streams rather than adjacent ones.
  const rand = mulberry32((SCENE_SEED + Math.imul(index, 0x9e3779b1)) | 0);

  const child = new scaliaEngine.Box();
  child.meshRenderer.layer = 1;
  child.meshRenderer.shaderType = 0;

  // Uniformly distributed over a spherical shell 20 to 40 units out, which is what vec3.random
  // gave: a direction picked by azimuth plus a uniform z, scaled to the radius.
  const radius = rand() * 20 + 20;
  const azimuth = rand() * 2 * Math.PI;
  const z = rand() * 2 - 1;
  const ringRadius = Math.sqrt(1 - z * z) * radius;
  child.transform.setPosition(
    Math.cos(azimuth) * ringRadius,
    Math.sin(azimuth) * ringRadius,
    z * radius,
  );

  const r = (rand() * 255) | 0;
  const g = (rand() * 255) | 0;
  const b = (rand() * 255) | 0;
  const vertCount = child.meshRenderer.vertices.length / 3;
  child.meshRenderer.colors = new Uint32Array(vertCount).fill((r << 16) | (g << 8) | b);

  const size = ((rand() * 2) | 0) + 1;

  child.transform.scale(size, size, size);
  child.transform.rotate(
    (rand() * 360) | 0,
    (rand() * 360) | 0,
    (rand() * 360) | 0,
  );

  if (rand() > 0.5) {
    child.meshRenderer.texture = boxTexture;
  }

  return {
    tick: (time) => {
      if (dt !== null) {
        child.transform.rotate(0, 0, 3);
      }
      dt = time.now;
    },
    child,
  };
}

const boxes = [];

myGame.world.scene.addGameObject(ball);

const cameraObject = (window.camera = new scaliaEngine.Camera());
cameraObject.camera.farClippingPane = 1000;
cameraObject.camera.nearClippingPane = -500;
cameraObject.camera.fogType = scaliaEngine.CameraComponent.FogType.LINEAR;
cameraObject.camera.fogFarPane = 500;
cameraObject.camera.fogNearPane = 0;
cameraObject.camera.fogColor = 0x8CB4C8;
cameraObject.camera.bgColor = 0x8CB4C8;
cameraObject.camera.ambientLight = 0x444444;

cameraObject.transform.setPosition(0, 0, 0);

myGame.world.scene.addGameObject(cameraObject);

const sun = new scaliaEngine.Light();
myGame.world.scene.addGameObject(sun);
sun.transform.rotate(45, 0, 0);

myGame.run();

const camera = cameraObject;
camera.camera.zoom = 1.0;

const viewport = new scaliaEngine.Canvas2dViewport(
  camera.camera,
  document.getElementById("canvas"),
);
viewport.scale = window.devicePixelRatio || 1;
viewport.start();

const renderer = viewport.renderer;

let fps,
  avgDt,
  maxFps = 0;
const scaleValEl = document.getElementById("scale_val");
const zoomValEl = document.getElementById("zoom_val");

const isDebug =
  window.location.pathname.includes("/debug") ||
  window.location.search.includes("debug");

if (isDebug) {
  document.getElementById("debug").style.display = "block";
}

const toggleBtn = document.getElementById("toggle_debug_btn");
if (toggleBtn) {
  toggleBtn.innerText = isDebug ? "Close Debug" : "Open Debug";
  toggleBtn.addEventListener("click", () => {
    if (isDebug) {
      let search = window.location.search.replace(/[?&]debug(=[^&]*)?/, "");
      if (search.startsWith("&")) search = "?" + search.substring(1);
      let pathname = window.location.pathname.replace(/\/debug$/, "");
      window.location.href = pathname + search + window.location.hash;
    } else {
      const sep = window.location.search ? "&" : "?";
      window.location.href = window.location.pathname + window.location.search + sep + "debug" + window.location.hash;
    }
  });
}



const sliderScaleEl = document.getElementById("slider_scale");
if (sliderScaleEl) {
  sliderScaleEl.value = viewport.scale;
  if (scaleValEl) scaleValEl.innerText = viewport.scale.toFixed(2);
  sliderScaleEl.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    try {
      viewport.scale = val;
      viewport.setSize(viewport.canvas.offsetWidth, viewport.canvas.offsetHeight);
      if (scaleValEl) scaleValEl.innerText = val.toFixed(2);
    } catch (err) {
      console.error("Scale slider input error:", err);
    }
  });
}

const sliderZoomEl = document.getElementById("slider_zoom");
if (sliderZoomEl) {
  sliderZoomEl.value = camera.camera.zoom;
  if (zoomValEl) zoomValEl.innerText = camera.camera.zoom.toFixed(2);
  sliderZoomEl.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    try {
      camera.camera.zoom = val;
      viewport.setSize(viewport.canvas.offsetWidth, viewport.canvas.offsetHeight);
      if (zoomValEl) zoomValEl.innerText = val.toFixed(2);
    } catch (err) {
      console.error("Zoom slider input error:", err);
    }
  });
}

const debugRange = document.getElementById("debug-range");
const debugRangeVal = document.getElementById("debug-range-value");

debugRange.value = targetCount;
debugRange.addEventListener("input", (e) => {
  targetCount = parseInt(e.target.value);
});

setInterval(() => {
  if (!isDebug) return;
  debugRangeVal.innerText = targetCount;
}, 100);

scaliaEngine.showDebug(viewport);
