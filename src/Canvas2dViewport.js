import config from "./config.js";
import Canvas2dRenderer from "./Canvas2dRenderer.js";
import * as math from "./math.js";

const mat4Mul = math.mat4Mul;

export default function Canvas2dViewport(camera, canvas) {
  this.canvas = canvas || document.createElement("canvas");
  this.canvas.style.filter = "url(#stripBlue)";
  this.context = this.canvas.getContext("2d", { alpha: true });
  this.context.imageSmoothingEnabled = false;
  this.context.webkitImageSmoothingEnabled = false;
  this.width = 0;
  this.height = 0;

  this.viewportMatrix = new Int16Array(16);
  this.worldToScreenMatrix = new Float32Array(16);

  this.renderer = new Canvas2dRenderer();

  this.camera = camera;

  this.scale = 1.0;

  //generate layers
  this.layers = [];
  this.shadeLayers = [];
  this.fogLayers = [];
  for (var i = 0; i < config.layersCount; i++) {
    var cnv = document.createElement("canvas");
    this.layers[i] = cnv.getContext("2d");
    this.layers[i].imageSmoothingEnabled = false;
    this.layers[i].webkitImageSmoothingEnabled = false;

    var shadeCnv = document.createElement("canvas");
    this.shadeLayers[i] = shadeCnv.getContext("2d");
    this.shadeLayers[i].imageSmoothingEnabled = false;
    this.shadeLayers[i].webkitImageSmoothingEnabled = false;

    var fogCnv = document.createElement("canvas");
    this.fogLayers[i] = fogCnv.getContext("2d");
    this.fogLayers[i].imageSmoothingEnabled = false;
    this.fogLayers[i].webkitImageSmoothingEnabled = false;
  }

  var viewport = this;
  window.addEventListener("resize", function () {
    viewport.setSize(viewport.canvas.offsetWidth, viewport.canvas.offsetHeight);
  });

  this.lastRenderStats = {
    dt: 0,
    fps: 0,
    frameTime: 0,
    sortTime: 0,
    cullTime: 0,
    groupTime: 0,
    processTime: 0,
    updateTime: 0,
    retrieveTime: 0,
  };

  let lastFrameTime = performance.now();
  let frameCount = 0;
  let lastFpsTime = performance.now();

  const self = this;
  this.startRenderLoop = function tick() {
    requestAnimationFrame(() => {
      const now = performance.now();
      const delta = now - lastFrameTime;
      lastFrameTime = now;

      frameCount++;
      if (now - lastFpsTime >= 500) {
        self.lastRenderStats.fps = Math.round(
          (frameCount * 1000) / (now - lastFpsTime),
        );
        frameCount = 0;
        lastFpsTime = now;
      }

      self.lastRenderStats.frameTime = delta;

      self.render();
      requestAnimationFrame(tick);
    });
  };
}

var p = Canvas2dViewport.prototype;

/**
 * @type {int[]}
 */
p.size = null;

p.scale = 1.0;
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

/**
 * Renderer-wide wireframe override - when true, every face across the whole scene draws as a
 * wireframe regardless of its mesh's shaderType (see Canvas2dRenderer's `wireframe` param).
 * Not a per-mesh setting; toggle this once on the viewport instead of touching individual
 * MeshComponents.
 * @type {boolean}
 */
Object.defineProperty(p, "wireframe", {
  get: function () {
    return this.renderer.wireframe;
  },
  set: function (value) {
    this.renderer.wireframe = value;
  },
});

/**
 * Renderer-wide override - when true, every face's normal is drawn as a short line on top of
 * everything else, after the whole scene has been rendered (see Canvas2dRenderer's
 * `debugNormals` param). Off by default.
 * @type {boolean}
 */
Object.defineProperty(p, "debugNormals", {
  get: function () {
    return this.renderer.debugNormals;
  },
  set: function (value) {
    this.renderer.debugNormals = value;
  },
});

/**
 * Renderer-wide override - when true, every visible object draws its axis gizmo, not just
 * objects with their own `debug` flag set (see Canvas2dRenderer's `debugAxis` param).
 * @type {boolean}
 */
Object.defineProperty(p, "debugAxis", {
  get: function () {
    return this.renderer.debugAxis;
  },
  set: function (value) {
    this.renderer.debugAxis = value;
  },
});

/**
 * Renderer-wide override - when false, the fill pass (base color/texture) is skipped entirely
 * for every layer (see Canvas2dRenderer's `fillEnabled` param). On by default; shade and fog
 * composite onto fill's output, so turning fill off blanks the layer regardless of their toggles.
 * @type {boolean}
 */
Object.defineProperty(p, "fillEnabled", {
  get: function () {
    return this.renderer.fillEnabled;
  },
  set: function (value) {
    this.renderer.fillEnabled = value;
  },
});

/**
 * Renderer-wide override - when false, the shade (deferred lighting) pass is skipped for every
 * layer (see Canvas2dRenderer's `shadeEnabled` param). On by default.
 * @type {boolean}
 */
Object.defineProperty(p, "shadeEnabled", {
  get: function () {
    return this.renderer.shadeEnabled;
  },
  set: function (value) {
    this.renderer.shadeEnabled = value;
  },
});

/**
 * Renderer-wide override - when false, the fog pass is skipped for every layer (see
 * Canvas2dRenderer's `fogEnabled` param). On by default.
 * @type {boolean}
 */
Object.defineProperty(p, "fogEnabled", {
  get: function () {
    return this.renderer.fogEnabled;
  },
  set: function (value) {
    this.renderer.fogEnabled = value;
  },
});

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
  const dpiW = width * this.scale;
  const dpiH = height * this.scale;

  this.width = dpiW;
  this.height = dpiH;

  this.canvas.width = dpiW;
  this.canvas.height = dpiH;

  //update viewport matrix
  this.viewportMatrix[0] = dpiW / 2;
  this.viewportMatrix[5] = -dpiH / 2;
  this.viewportMatrix[12] = dpiW / 2;
  this.viewportMatrix[13] = dpiH / 2;

  //update layer sizes
  for (var i = 0; i < this.layers.length; i++) {
    var ctx = this.layers[i];
    ctx.canvas.width = dpiW;
    ctx.canvas.height = dpiH;

    var shadeCtx = this.shadeLayers[i];
    shadeCtx.canvas.width = Math.ceil(dpiW / 1);
    shadeCtx.canvas.height = Math.ceil(dpiH / 1);

    var fogCtx = this.fogLayers[i];
    fogCtx.canvas.width = Math.ceil(dpiW / 1);
    fogCtx.canvas.height = Math.ceil(dpiH / 1);
  }

  this.camera.setup(width, height);
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
