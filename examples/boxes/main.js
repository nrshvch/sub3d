import scaliaEngine from "sub3d";
import "sub3d/sub3d.css";
import { vec3 } from "gl-matrix";
import boxTexture from "./box.png";

const myGame = new scaliaEngine.Game();

let targetCount = 500;

const ball = new scaliaEngine.Ball(...scaliaEngine.Ball.generate());
ball.meshRenderer.layer = 1;
ball.meshRenderer.shaderType = 4;

ball.transform.scale(20, 20, 20);
ball.debug = true;

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

function createBox() {
  const child = new scaliaEngine.Box();
  child.meshRenderer.layer = 1;
  child.meshRenderer.shaderType = 0;
  const randPos = vec3.random([], Math.random() * 20 + 20);

  child.transform.setPosition(randPos[0], randPos[1], randPos[2]);

  const r = (Math.random() * 255) | 0;
  const g = (Math.random() * 255) | 0;
  const b = (Math.random() * 255) | 0;
  child.meshRenderer.colors = new Uint32Array([(r << 16) | (g << 8) | b]);

  const size = (Math.random() * 2.5) | 0;

  child.transform.scale(size, size, size);
  // child.debug = true;
  child.transform.rotate(
    (Math.random() * 360) | 0,
    (Math.random() * 360) | 0,
    (Math.random() * 360) | 0,
  );

  if (Math.random() > 0.5) {
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
