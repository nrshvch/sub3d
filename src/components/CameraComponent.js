import * as glMatrix from "gl-matrix";
import Component from "../Component.js";
import * as math from "../math.js";

const FogType = {
    'NONE': 'NONE',
    'RADIAL': 'RADIAL',
    'RADIAL_FAST': 'RADIAL_FAST',
    'LINEAR': 'LINEAR'
}


/**
 * @constructor
 */
export default function CameraComponent(transform) {
    Component.call(this);

    this.transform = transform;
    this.projectionMatrix = new Float32Array(16);
    this.clipSpaceMatrix = new Float32Array(16);
    this.frustumSize = [
        [0, 0, 0],
        [0, 0, 0]
    ];
    this.zoom = 1.0;
}

CameraComponent.prototype = Object.create(Component.prototype);

CameraComponent.prototype.constructor = CameraComponent;

CameraComponent.prototype.frustumSize = null;
CameraComponent.prototype.projectionMatrix = null;
CameraComponent.prototype.clipSpaceMatrix = null;

CameraComponent.prototype.nearClippingPane = 0;
CameraComponent.prototype.farClippingPane = 1000;

CameraComponent.prototype.fogType = FogType.LINEAR;
CameraComponent.prototype.fogNearPane = 250;
CameraComponent.prototype.fogFarPane = 750;
CameraComponent.prototype.fogColor = 0x969696;
CameraComponent.prototype.bgColor = -1;
CameraComponent.prototype.ambientLight = 0x808080;

CameraComponent.prototype.setup = function (width, height) {
    const w = width / this.zoom;
    const h = height / this.zoom;

    //update frustum size
    this.frustumSize = [
        [-w / 2, -h / 2, 0],
        [w / 2, h / 2, this.farClippingPane]
    ];

    //update projection matrix
    glMatrix.mat4.ortho(this.projectionMatrix, -w / 2, w / 2, -h / 2, h / 2, this.nearClippingPane, this.farClippingPane);
}

CameraComponent.prototype.setGameObject = function (gameObject) {
    Component.prototype.setGameObject.call(this, gameObject);
    gameObject.camera = this;
}

CameraComponent.prototype.unsetGameObject = function () {
    this.gameObject.camera = undefined;
    Component.prototype.unsetGameObject.call(this);
}

CameraComponent.prototype.getClipSpaceMatrix = function() {
  const viewMatrix = this.transform.getWorldToLocal();
  math.mat4Mul(this.clipSpaceMatrix, this.projectionMatrix, viewMatrix);
  return this.clipSpaceMatrix;
}

CameraComponent.FogType = FogType;


