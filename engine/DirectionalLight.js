define(["./GameObject", "./Component"], function (GameObject, Component) {
    function DirectionalLightComponent() {
        Component.call(this);
    }

    DirectionalLightComponent.prototype = Object.create(Component.prototype);

    DirectionalLightComponent.prototype.constructor = DirectionalLightComponent;

    function CameraObject(name) {
        GameObject.call(this, name || "directional light");
        this.addComponent(new DirectionalLightComponent());
    }

    CameraObject.prototype = Object.create(GameObject.prototype);

    return CameraObject;
});
