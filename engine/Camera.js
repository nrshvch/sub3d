define(["./GameObject", "./components/CameraComponent"], function (GameObject, CameraComponent) {
    function CameraObject(name) {
        GameObject.call(this, name || "camera");
        this.addComponent(new CameraComponent(this.transform));
    }

    CameraObject.prototype = Object.create(GameObject.prototype);

    return CameraObject;
});
