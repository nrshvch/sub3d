import config from "./config.js";
import Canvas2dRenderer from "./Canvas2dRenderer.js";
import * as math from "./math.js";

const mat4Mul = math.mat4Mul;

export default function Canvas2dViewport(camera, canvas) {
  this.canvas = canvas || document.createElement("canvas");
  this.context = this.canvas.getContext("2d");
  this.context.imageSmoothingEnabled = false;
  this.context.webkitImageSmoothingEnabled = false;
  this.width = 0;
  this.height = 0;

  this.viewportMatrix = new Int16Array(16);
  this.worldToScreenMatrix = new Float32Array(16);

  this.renderer = new Canvas2dRenderer();

  this.camera = camera;

  //generate layers
  this.layers = [];
  for (var i = 0; i < config.layersCount; i++) {
    var cnv = document.createElement("canvas");
    this.layers[i] = cnv.getContext("2d");
    this.layers[i].imageSmoothingEnabled = false;
    this.layers[i].webkitImageSmoothingEnabled = false;
  }

  var viewport = this;
  window.addEventListener("resize", function () {
    viewport.setSize(viewport.canvas.offsetWidth, viewport.canvas.offsetHeight);
  });

  const self = this;
  this.startRenderLoop = function tick() {
    requestAnimationFrame(() => {
      self.render();
      requestAnimationFrame(tick);
    });
  };

  this.lastRenderStats = {};
}

var p = Canvas2dViewport.prototype;

/**
 * @type {int[]}
 */
p.size = null;

p.dpr = 1;
p.width = null;
p.height = null;

/**
 * 4x4 viewport matrix
 * @type {Array}
 */
p.viewportMatrix = null;

/**
 * @type {CameraObject}
 */
p.camera = null;

/**
 * @type {HTMLCanvasElement}
 */
p.canvas = null;

/**
 * @type {CanvasRenderingContext2D}
 */
p.context = null;

p.start = function () {
  this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);

  this.startRenderLoop();
};

p.render = function () {
  if (this.camera !== null)
    this.renderer.render(this.camera.gameObject, this, this.lastRenderStats);
};

/**
 * @param {int[]} size Vector2. Size of the viewport
 * @constructor
 */
p.setSize = function (width, height) {
  const dpiW = width * this.dpr;
  const dpiH = height * this.dpr;


  this.width = width;
  this.height = height;

  this.canvas.width = width;
  this.canvas.height = height;

  //update viewport matrix
  this.viewportMatrix[0] = width / 2;
  this.viewportMatrix[5] = -height / 2;
  this.viewportMatrix[12] = width / 2;
  this.viewportMatrix[13] = height / 2;

  //update layer sizes
  for (var i = 0; i < this.layers.length; i++) {
    var ctx = this.layers[i];
    ctx.canvas.width = width;
    ctx.canvas.height = height;
  }

  this.camera.setup(dpiW, dpiH);
};

p.getWorldToScreen = function () {
  mat4Mul(
    this.worldToScreenMatrix,
    this.viewportMatrix,
    this.camera.projectionMatrix,
  );
  mat4Mul(
    this.worldToScreenMatrix,
    this.worldToScreenMatrix,
    this.camera.gameObject.transform.getWorldToLocal(),
  );

  return this.worldToScreenMatrix;
};
