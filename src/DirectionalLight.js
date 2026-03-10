import GameObject from "./GameObject.js";
import Component from "./Component.js";

function DirectionalLightComponent() {
    Component.call(this);
}

DirectionalLightComponent.prototype = Object.create(Component.prototype);

DirectionalLightComponent.prototype.constructor = DirectionalLightComponent;

export default function CameraObject(name) {
    GameObject.call(this, name || "directional light");
    this.addComponent(new DirectionalLightComponent());
}

CameraObject.prototype = Object.create(GameObject.prototype);

