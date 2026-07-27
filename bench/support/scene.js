import scaliaEngine from "../../src/main.js";

const { Game, Camera, Light, Box, CameraComponent, Canvas2dViewport } = scaliaEngine;

/**
 * Deterministic benchmark scene: a fixed grid of boxes, one directional light, one camera.
 * No Math.random anywhere - the same boxCount always produces identical geometry/transforms,
 * so repeated runs (including across dev machines) are measuring the same workload.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} boxCount
 */
export function buildScene(canvas, boxCount) {
  const game = new Game();

  const camera = new Camera();
  camera.camera.farClippingPane = 1000;
  camera.camera.nearClippingPane = -500;
  camera.camera.fogType = CameraComponent.FogType.LINEAR;
  camera.camera.fogNearPane = 0;
  camera.camera.fogFarPane = 500;
  camera.camera.fogColor = 0x8cb4c8;
  camera.camera.bgColor = 0x8cb4c8;
  camera.camera.ambientLight = 0x444444;
  camera.transform.setPosition(0, 0, 0);
  game.world.scene.addGameObject(camera);

  const light = new Light();
  light.transform.rotate(45, 0, 0);
  game.world.scene.addGameObject(light);

  const boxes = [];
  const gridSize = Math.ceil(Math.sqrt(boxCount));
  for (let i = 0; i < boxCount; i++) {
    const box = new Box();
    box.meshRenderer.layer = 1;

    const gx = i % gridSize;
    const gy = (i / gridSize) | 0;
    // Deterministic pseudo-variation from the index alone, no RNG involved.
    box.transform.scale(20,20,20);
    box.transform.setPosition((gx - gridSize / 2) * 40, (gy - gridSize / 2) * 40, 100);
    box.transform.rotate((i * 13) % 360, (i * 7) % 360, (i * 5) % 360);

    game.world.scene.addGameObject(box);
    boxes.push(box);
  }

  const viewport = new Canvas2dViewport(camera.camera, canvas);
  // Fixed literal size rather than canvas.offsetWidth/Height - those depend on layout,
  // which a headless/off-DOM canvas may not have, and we want an identical viewport
  // regardless of the browser/environment running the bench.
  viewport.setSize(800, 600);

  return { game, camera, boxes, viewport };
}
