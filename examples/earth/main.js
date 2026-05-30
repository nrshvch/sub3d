import scaliaEngine from "sub3d";
import { vec3 } from "gl-matrix";
import earthTexture from "./earth-texture-equirectangular.jpg";
import moonTexture from "./2k_moon.jpg";

const myGame = new scaliaEngine.Game();


const EARTH_TO_MOON_RATIO = 3.7;
const EARTH_RADIUS = 300;

const earth = new scaliaEngine.Ball(
  ...scaliaEngine.Ball.generate(16, 16, EARTH_RADIUS),
);
earth.meshRenderer.layer = 1;
earth.meshRenderer.shaderType = 4
earth.meshRenderer.texture = earthTexture;

// earth.debug = true;

myGame.world.scene.addGameObject(earth);

const moon = createMoon();
myGame.world.tickRegister(moon);

function createMoon() {
  const moon = new scaliaEngine.Ball(
    ...scaliaEngine.Ball.generate(8, 8, EARTH_RADIUS / EARTH_TO_MOON_RATIO),
  );
  moon.meshRenderer.layer = 1;
  moon.meshRenderer.shaderType = 4;
  const randPos = vec3.random([], 800);

  moon.transform.setPosition(randPos[0], randPos[1], randPos[2]);

  // moon.debug = true;
  moon.meshRenderer.texture = moonTexture;
  myGame.world.scene.addGameObject(moon);

  return {
    tick: (time) => {
      if (dt !== null) {
        moon.transform.rotate(0, 3, 0);
      }
      dt = time.now;
    },
    moon,
  };
}

const cameraObject = (window.camera = new scaliaEngine.Camera());
cameraObject.camera.fogType = scaliaEngine.CameraComponent.FogType.NONE;
cameraObject.camera.ambientLight = 0x333333
cameraObject.camera.farClippingPane = 1000;
cameraObject.camera.nearClippingPane = -1000;

cameraObject.transform.setPosition(0, 0, 0);

myGame.world.scene.addGameObject(cameraObject);

const sun = new scaliaEngine.Light();
myGame.world.scene.addGameObject(sun);
sun.transform.rotate(0, 0, 0);

let dt = null;
myGame.world.tickRegister({
  tick: (time) => {
    if (dt !== null) {
      cameraObject.transform.rotate(0, 2, 0, 0);

      earth.transform.rotate(1, 4, 1 / 4, "world");

      sun.transform.rotate(0, 10, 0);
    }
    dt = time.now;
  },
});

myGame.run();

const viewport = new scaliaEngine.Canvas2dViewport(
  camera.camera,
  document.getElementById("canvas"),
);
viewport.dpr = window.devicePixelRatio;
viewport.start();

const renderer = viewport.renderer;

let fps,
  avgDt,
  maxFps = 0;
const fpsEl = document.getElementById("fps");
const maxFpsEl = document.getElementById("maxFps");
const drawCallsEl = document.getElementById("drawCalls");
const objectsEl = document.getElementById("objects");
const visibleObjectsEl = document.getElementById("visibleObjects");
const facesCountEl = document.getElementById("facesCount");
const dprEl = document.getElementById("dpr");

const isDebug =
  window.location.pathname.includes("/debug") ||
  window.location.search.includes("debug");

if (isDebug) {
  document.getElementById("debug").style.display = "block";
}

const chkbx1El = document.getElementById("chkbx_1");
chkbx1El.addEventListener("change", (e) => {
  renderer.wireframe = chkbx1El.checked;
});


const sliderDprEl = document.getElementById("slider_dpr");
sliderDprEl.value = viewport.dpr;
sliderDprEl.addEventListener("input", (e) => {
  const val = parseFloat(e.target.value);
  console.log("DPR slider input event:", val);
  try {
    viewport.dpr = val;
    viewport.setSize(viewport.canvas.offsetWidth, viewport.canvas.offsetHeight);
    dprEl.innerText = val.toFixed(2);
  } catch (err) {
    console.error("DPR slider input error:", err);
  }
});

setInterval(() => {
  if (!isDebug) return;
  const dt = viewport.lastRenderStats.dt;
  fps = dt > 0 ? (1000 / dt) | 0 : 1000;
  avgDt = avgDt === undefined ? dt : (avgDt + dt) / 2;
  maxFps = Math.max(maxFps, fps);
  fpsEl.innerText = fps;
  maxFpsEl.innerText = maxFps;
  drawCallsEl.innerText = viewport.lastRenderStats.drawCalls;
  objectsEl.innerText = viewport.lastRenderStats.totalObjects;
  visibleObjectsEl.innerText = viewport.lastRenderStats.visibleObjects;
  facesCountEl.innerText = viewport.lastRenderStats.faces;
  dprEl.innerText = viewport.dpr.toFixed(2);
}, 100);
