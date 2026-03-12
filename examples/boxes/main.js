import scaliaEngine from "sub3d";
import { vec3 } from "gl-matrix";

var myGame = new scaliaEngine.Game();

var box = (window.cube = new scaliaEngine.Ball());
box.meshRenderer.layer = 1;
myGame.world.scene.addGameObject(box);
box.transform.scale(20, 20, 20);
box.debug = true;

let dt = null;
myGame.world.tickRegister({
  tick: (time) => {
    if (dt !== null) {
      box.transform.rotate(1, 1 / 2, 1 / 4, "world");
    }
    dt = time.now;
  },
});

for (var i = 0; i < 500; i++) {
  const child = (window.child = new scaliaEngine.Box());
  child.meshRenderer.layer = 1;
  const randPos = vec3.random([], Math.random() * 20 + 20);

  child.transform.setPosition(randPos[0], randPos[1], randPos[2]);

  const r = (Math.random() * 255) | 0;
  const g = (Math.random() * 255) | 0;
  const b = (Math.random() * 255) | 0;
  child.meshRenderer.colors = new Uint8Array([r, g, b]);

  var size = (Math.random() * 2.5) | 0;

  myGame.world.scene.addGameObject(child);
  child.transform.scale(size, size, size);
  // child.debug = true;
  child.transform.rotate(
    (Math.random() * 360) | 0,
    (Math.random() * 360) | 0,
    (Math.random() * 360) | 0,
  );
  myGame.world.tickRegister({
    tick: (time) => {
      if (dt !== null) {
        child.transform.rotate(0, 0, 3);
      }
      dt = time.now;
    },
  });

  cube.transform.addChild(child.transform);
}

var cameraObject = (window.camera = new scaliaEngine.Camera());
cameraObject.camera.farClippingPane = 1000;
cameraObject.camera.nearClippingPane = -500;
cameraObject.camera.fogType = scaliaEngine.CameraComponent.FogType.LINEAR;
cameraObject.camera.fogFarPane = 500;
cameraObject.camera.fogNearPane = 0;
cameraObject.camera.fogColor = new Uint8Array([140, 180, 200]);
cameraObject.camera.bgColor = new Uint8Array([140, 180, 200]);
cameraObject.camera.ambientLight = 0.5;

cameraObject.transform.setPosition(0, 0, 0);

myGame.world.scene.addGameObject(cameraObject);

const sun = new scaliaEngine.DirectionalLight();
myGame.world.scene.addLightSource(sun);
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

const debugWireframeBtn = document.getElementById("debug-wireframe-btn");
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
