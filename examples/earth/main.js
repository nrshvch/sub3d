import scaliaEngine from "sub3d";
import "sub3d/sub3d.css";
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
cameraObject.camera.ambientLight = 0x111111
cameraObject.camera.farClippingPane = 1000;
cameraObject.camera.nearClippingPane = -1000;

cameraObject.transform.setPosition(0, 0, 0);

myGame.world.scene.addGameObject(cameraObject);

const sun = new scaliaEngine.Light();
myGame.world.scene.addGameObject(sun);
sun.transform.rotate(0, 240, 0);

let dt = null;
myGame.world.tickRegister({
  tick: (time) => {
    if (dt !== null) {
      cameraObject.transform.rotate(0, 2, 0, 0);

      sun.transform.rotate(0, 3, 0);
    }
    dt = time.now;
  },
});

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

scaliaEngine.showDebug(viewport);
