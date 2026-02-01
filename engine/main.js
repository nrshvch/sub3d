/*RAF shim*/
window.requestAnimFrame = (function () {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

define([
    './config',
    './Game',
    './GameObject',
    './Component',
    './Camera',
    './components/CameraComponent',
    './components/TransformComponent',
    './components/SpriteRenderer',
    './lib/gl-matrix',
    './lib/assetmanager/assetmanager',
    './SpriteManager',
    './components/PathRenderer',
    './components/TextRenderer',
    './primitives/Plane',
    './primitives/Box',
    './primitives/Cone',
    './primitives/Ball'
], function (config, Game, GameObject, Component, Camera, CameraComponent, TransformComponent, SpriteRenderer, glMatrix, AssetManager, SpriteManager, PathRenderer, TextRenderer, Plane, Box, Cone, Ball) {
    return window.scaliaEngine = {
        config: config,
        Game: Game,
        GameObject: GameObject,
        Component: Component,
        Camera: Camera,
        CameraComponent: CameraComponent,
        TransformComponent: TransformComponent,
        SpriteRenderer: SpriteRenderer,
        glMatrix: glMatrix,
        AssetManager: AssetManager,
        PathRenderer: PathRenderer,
        TextRenderer: TextRenderer,
        SpriteManager: SpriteManager,
        Plane: Plane,
        Box: Box,
        Cone: Cone,
        Ball: Ball
    };
});