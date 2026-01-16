require(["./engine/engine"], function (scaliaEngine) {
    require([
        //'./js/gameObjects/BallObject',
        //'./engine/components/RectangleShape',
        //'./js/scripts/MoveScript'
    ], function (BallObject, RectangleShape, MoveScript) {
        var myGame = new scaliaEngine.Game();


        var cube = window.cube = new scaliaEngine.gameObjects.Cube();
        myGame.logic.world.AddGameObject(cube);
        cube.transform.SetScale(10,10,10);

        for(var i = 0; i < 50; i++){
            var child = window.child = new scaliaEngine.gameObjects.Cube();
            scaliaEngine.utils.glMatrix.vec3.random(child.transform.position, 40);

            var size = Math.random()*4|0 + 1;

            myGame.logic.world.AddGameObject(child);
            child.transform.SetScale(size, size, size);
            child.transform.Rotate((Math.random()*360) | 0, (Math.random()*360) | 0, (Math.random()*360) | 0);

            cube.transform.AddChildren(child.transform);
        }


        var size = [window.innerWidth, window.innerHeight];

        var cameraObject = window.camera = new scaliaEngine.gameObjects.Camera();
        cameraObject.camera.SetSize(window.innerWidth, window.innerHeight);
        cameraObject.transform.SetPosition(0,0,0);

        myGame.logic.world.AddGameObject(cameraObject);

        myGame.Run();

        var viewport = myGame.graphics.CreateViewport(cameraObject, size);

        document.body.appendChild(viewport.canvas);

        window.myGame = myGame;
    });
});