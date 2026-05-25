import GameObject from "./GameObject.js";
import Component from "./Component.js";

Light.Type = {
  DIRECTIONAL: 0,
  POINT: 1,
  SPOT: 2,
};

function LightComponent() {
  Component.call(this);
}

LightComponent.prototype = Object.create(Component.prototype);
LightComponent.prototype.constructor = LightComponent;
LightComponent.prototype.color = 0xFFFFFF;
LightComponent.prototype.range = 10;
LightComponent.prototype.type = Light.Type.DIRECTIONAL;

LightComponent.prototype.setGameObject = function (gameObject) {
  Component.prototype.setGameObject.call(this, gameObject);
  gameObject.light = this;
};

export default function Light(name) {
  GameObject.call(this, name || "light");
  this.addComponent(this.light = new LightComponent());
}

export { LightComponent };

Light.prototype = Object.create(GameObject.prototype);
Light.prototype.constructor = Light;
