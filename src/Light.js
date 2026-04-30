import GameObject from "./GameObject.js";
import Component from "./Component.js";

function LightComponent() {
  Component.call(this);
  this.type = Light.Type.DIRECTIONAL; // Default to directional
  this.color = 0xFFFFFF; // Default white light
  this.range = 10;
}

LightComponent.prototype = Object.create(Component.prototype);
LightComponent.prototype.constructor = LightComponent;

LightComponent.prototype.setGameObject = function (gameObject) {
  Component.prototype.setGameObject.call(this, gameObject);
  gameObject.light = this;
};

export default function Light(name) {
  GameObject.call(this, name || "light");
  this.addComponent(new LightComponent());
}

Light.Type = {
  DIRECTIONAL: 0,
  POINT: 1,
  SPOT: 2,
};

export { LightComponent };

Light.prototype = Object.create(GameObject.prototype);
Light.prototype.constructor = Light;
