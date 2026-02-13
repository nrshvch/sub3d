define(["../lib/gl-matrix", "../Component", "../lib/BoundingBox", "../math"], function (glMatrix, Component, BoundingBox, math) {
    const FogType = {
        'NONE': 'NONE',
        'RADIAL': 'RADIAL',
        'RADIAL_FAST': 'RADIAL_FAST',
        'LINEAR': 'LINEAR'
    }


    /**
     * @constructor
     */
    function CameraComponent(transform) {
        Component.call(this);

        this.transform = transform;
        this.projectionMatrix = new Float32Array(16);
        this.clipSpaceMatrix = new Float32Array(16);
        this.frustumSize = [
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.frustumBox = [
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.bounds = new BoundingBox();    //rename to AABB

        var cam = this;
        this.transformUpdateEventHandler = function (transform) {
            //update frustumbox
            var localToWorld = transform.getLocalToWorld();
            glMatrix.vec3.transformMat4(cam.frustumBox[0], cam.frustumSize[0], localToWorld);
            glMatrix.vec3.transformMat4(cam.frustumBox[1], cam.frustumSize[1], localToWorld);

            //update obbox
            cam.bounds.Calculate(cam.frustumBox);
        };
    }

    CameraComponent.prototype = Object.create(Component.prototype);

    CameraComponent.prototype.constructor = CameraComponent;

    CameraComponent.prototype.bounds = null;
    CameraComponent.prototype.frustumSize = null;
    CameraComponent.prototype.frustumBox = null;
    CameraComponent.prototype.projectionMatrix = null;
    CameraComponent.prototype.clipSpaceMatrix = null;

    CameraComponent.prototype.nearClippingPane = 0;
    CameraComponent.prototype.farClippingPane = 1000;

    CameraComponent.prototype.fogType = FogType.LINEAR;
    CameraComponent.prototype.fogNearPane = 250;
    CameraComponent.prototype.fogFarPane = 750;
    CameraComponent.prototype.fogColor = new Uint8Array([150,150,150]);

    CameraComponent.prototype.ambientLight = 0.5;

    CameraComponent.prototype.setup = function (width, height) {

        //update frustum size
        this.frustumSize = [
            [-width / 2, -height / 2, 0],
            [width / 2, height / 2, length]
        ];

        //update frustumbox
        var localToWorld = this.gameObject.transform.getLocalToWorld();
        glMatrix.vec3.transformMat4(this.frustumBox[0], this.frustumSize[0], localToWorld);
        glMatrix.vec3.transformMat4(this.frustumBox[1], this.frustumSize[1], localToWorld);

        //update projection matrix
        glMatrix.mat4.ortho(this.projectionMatrix, -width / 2, width / 2, -height / 2, height / 2, this.nearClippingPane, this.farClippingPane);

        //update aabbox
        this.bounds.Calculate(this.frustumBox);
    }

    CameraComponent.prototype.setGameObject = function (gameObject) {
        Component.prototype.setGameObject.call(this, gameObject);
        gameObject.camera = this;
        gameObject.transform.addEventListener(gameObject.transform.events.update, this.transformUpdateEventHandler);
    }

    CameraComponent.prototype.unsetGameObject = function () {
        this.gameObject.camera = undefined;
        this.gameObject.transform.removeEventListener(this.gameObject.transform.events.update, this.transformUpdateEventHandler);
        Component.prototype.unsetGameObject.call(this);
    }

    CameraComponent.prototype.getClipSpaceMatrix = function() {
      const viewMatrix = this.transform.getWorldToLocal();
      math.mat4Mul(this.clipSpaceMatrix, this.projectionMatrix, viewMatrix);
      return this.clipSpaceMatrix;
    }

    CameraComponent.FogType = FogType;

    return CameraComponent;
});

