import Transform from "./components/TransformComponent.js";

/**
 * Base object
 * @constructor
 */
export default function GameObject(name) {
    this.instanceId = GameObject.prototype.instanceId++;
    this.components = [];
    this.transform = this.addComponent(new Transform());

    this.name = name || "gameObject";
}

var p = GameObject.prototype;

/**
 * @type {Number}
 */
p.instanceId = 0;

/**
 * @type {string}
 */
p.name = null;

/**
 * Layer index
 * @type {int}
 */
p.layer = 0;

/**
 * Scene reference
 * @public
 * @type {Scene}
 */
p.scene = null;

p.world  = null;

/**
 * Transform component attached to this game object.
 * @type {Transform}
 */
p.transform = null;

/**
 * @type {Component[]}
 */
p.components = null;

/**
 * @type {number}
 */
p.componentsCount = 0;

/**
 * @param {Scene} scene
 */
p.setScene = function (scene) {
    this.scene = scene;
};

/**
 * @public
 * @param {Component} component
 * @return {*}
 */
p.addComponent = function (component) {
    this.components[this.componentsCount++] = component;

    component.setGameObject(this);

    return component;
}

p.removeComponent = function (component) {
    component.unsetGameObject();
}

/**
 * Method will return component of type of given constructor function
 * @param {function} Type
 * @returns {*}
 */
p.getComponent = function (Type) {
    for (var i = 0; i < this.components.length; i++) {
        var component = this.components[i];
        if (component instanceof Type)
            return component;
    }
    return null;
}
