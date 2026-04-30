import scaliaEngine from "sub3d";
import { vec3 } from "gl-matrix";

const myGame = new scaliaEngine.Game();

let targetCount = 500;

const ball = new scaliaEngine.Ball();
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


    if(boxes.length < targetCount){
      const boxesLen = boxes.length
      for (let j = 0; j < targetCount - boxesLen; j++) {
        const box = createBox(boxes.length);
        ball.transform.addChild(box.child.transform);
        boxes.push(box);
        myGame.world.tickRegister(box);
      }
    }else if(boxes.length > targetCount){
      const i1 = boxes.length - targetCount;
      for (let i = 0; i < i1; i++) {
        const box = boxes.pop();
        ball.transform.removeChild(box.child.transform);
        myGame.world.tickUnregister(box);
      }
    }
  },
});

function createBox(){
  const child = new scaliaEngine.Box();
  child.meshRenderer.layer = 1;
  child.meshRenderer.shaderType = 0;
  const randPos = vec3.random([], Math.random() * 20 + 20);

  child.transform.setPosition(randPos[0], randPos[1], randPos[2]);

  const r = (Math.random() * 255) | 0;
  const g = (Math.random() * 255) | 0;
  const b = (Math.random() * 255) | 0;
  child.meshRenderer.colors = new Uint8Array([r, g, b]);

  const size = (Math.random() * 2.5) | 0;

  child.transform.scale(size, size, size);
  // child.debug = true;
  child.transform.rotate(
    (Math.random() * 360) | 0,
    (Math.random() * 360) | 0,
    (Math.random() * 360) | 0,
  );

  if (Math.random() > 0.5) {
    child.meshRenderer.shaderType = 4;
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

const debugWireframeBtn = document.getElementById("debug-wireframe-btn");
const debugRange = document.getElementById("debug-range");
const debugRangeVal = document.getElementById("debug-range-value");

debugRange.value = targetCount;
debugRange.addEventListener('input', (e)=>{
  targetCount = parseInt(e.target.value);
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
  objectsEl.innerText = viewport.lastRenderStats.totalObjects;
  visibleObjectsEl.innerText = viewport.lastRenderStats.visibleObjects;
  facesCountEl.innerText = viewport.lastRenderStats.faces;
  dprEl.innerText = window.devicePixelRatio;
  debugRangeVal.innerText = targetCount;
}, 100);
