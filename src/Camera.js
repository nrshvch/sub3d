import GameObject from "./GameObject.js";
import CameraComponent from "./components/CameraComponent.js";

function CameraObject(name) {
    GameObject.call(this, name || "camera");
    this.addComponent(new CameraComponent(this.transform));
}

CameraObject.prototype = Object.create(GameObject.prototype);

export default CameraObject;