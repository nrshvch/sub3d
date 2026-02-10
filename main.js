require(["./engine/main"], function (scaliaEngine) {
        var myGame = new scaliaEngine.Game();

        var N = 100;

        for(var i = 0; i < N; i++){
            for(var j = 0; j < N; j++){
                var plane = new scaliaEngine.Plane();
                plane.meshRenderer.color = new Uint8Array([0, Math.random()*55+200, 0]);
                plane.meshRenderer.layer = 0;
                plane.transform.translate((i - N/2) * 45.255,0, (j - N/2) * 45.255);
                plane.transform.scale(45.255, 1, 45.255);
                myGame.world.scene.addGameObject(plane);

                if(Math.random() > 0.8) {
                    var tree = new scaliaEngine.Cone();
                    tree.meshRenderer.color = new Uint8Array([0, 100, 0]);
                    tree.meshRenderer.layer = 1;
                    tree.transform.translate((i - N / 2) * 45.255 + (Math.random()*24-12), 1, (j - N / 2) * 45.255 + (Math.random()*24-12));
                    const size = Math.random() / 2 + 0.5;
                    tree.transform.scale(25 * size ,50 * size,25 * size);
                    myGame.world.scene.addGameObject(tree);
                    // tree.debug = true;
                }
            }
        }

        // const box = new scaliaEngine.Box();
        // box.transform.scale(100,100,100);
        // box.meshRenderer.color = new Uint8Array([0,0,255]);
        // box.meshRenderer.layer = 1;
        // myGame.world.scene.addGameObject(box);
        // myGame.world.tickRegister(box);
        // box.transform.rotate(0, 0, 45);
        // box.transform.rotate(35.264, 0, 0, 'world');
        // box.debug = true;

        // const ball = new scaliaEngine.Ball();
        // ball.transform.scale(100,100,100);
        // ball.meshRenderer.color = new Uint8Array([0,0,255]);
        // ball.meshRenderer.layer = 1;
        // myGame.world.scene.addGameObject(ball);
        // myGame.world.tickRegister(ball);
        // ball.debug = true;


        var cameraObject = window.camera = new scaliaEngine.Camera();
        cameraObject.camera.farClippingPane = 2000;
        cameraObject.camera.nearClippingPane = -4000;
        cameraObject.camera.fogType = scaliaEngine.CameraComponent.FogType.RADIAL_FAST;
        cameraObject.camera.fogFarPane = 2000;
        cameraObject.camera.fogNearPane =  1000;
        cameraObject.camera.fogColor = new Uint8Array([50,150,50]);
        cameraObject.camera.bgColor = new Uint8Array([50,150,50]);
        cameraObject.camera.ambientLight = 0.5;
        cameraObject.transform.rotate(45,45,0);
        cameraObject.transform.translate(0,0,0);

    var dt = null;
        myGame.world.tickRegister({
            tick: (time)=>{
                if(dt !== null) {
                    var d = time.now - dt;

                    cameraObject.transform.rotate(0, 0.1, 0, 'world');
                    // cameraObject.transform.translate(0,0,-10);
                }
                dt = time.now;
            }
        });

        document.onkeydown = function(e){
            if(e.keyCode == 65){ //a
                camera.transform.translate(0,0,-10, "world");
            }else if(e.keyCode == 68){ //d
                camera.transform.translate(0,0,10, "world");
            }else if(e.keyCode == 87){ //w
                camera.transform.translate(10,0,0, "world");
            }
            else if(e.keyCode == 83){ //s
                camera.transform.translate(-10,0,0, "world");
            }
        }

        mousepressed = false;

        var x0, y0;

        document.onmousedown = function(e){
            mousepressed = true;
            x0 = e.pageX;
            y0 = e.pageY;
        }

        document.onmouseup = function(){
            mousepressed = false;
        }


        document.onmousemove = function(e){
            if(!mousepressed)return;

            var x = e.pageX;
            var y = e.pageY;

            var dx = x - x0;
            var dy = y - y0;

            x0 = x;
            y0 = y;
              //console.log(dy);
            camera.transform.translate(-dx+dy,0,dx+dy, "world");
        }

        document.onwheel = function(e){
            camera.transform.rotate(e.deltaY/102,0,0);
        }

        myGame.world.scene.addGameObject(cameraObject);

        const sun = new scaliaEngine.DirectionalLight();
        myGame.world.scene.addLightSource(sun);
        sun.transform.rotate(45,0, 0);
        myGame.world.tickRegister({
            tick: (time)=>{
                if(dt !== null) {
                    var d = time.now - dt;

                    sun.transform.rotate(0, 1, 0, 'world');
                }
                dt = time.now;
            }
        });

        myGame.run();

        const viewport = new scaliaEngine.Canvas2dViewport(camera.camera, document.getElementById('canvas'));

        viewport.start();

        window.myGame = myGame;
        var renderer = viewport.renderer;
        var fps, avgDt, maxFps = 0;
        var fpsEl = document.getElementById('fps');
        var maxFpsEl = document.getElementById('maxFps');
        var drawCallsEl = document.getElementById('drawCalls');
        var objectsEl = document.getElementById('objects');
        var visibleObjectsEl = document.getElementById('visibleObjects');
        var vec3PoolSizeEl = document.getElementById('vec3PoolSize');
        var facesCountEl = document.getElementById('facesCount');

        const debugBtn = document.getElementById('debug-btn');
        const debugWireframeBtn = document.getElementById('debug-wireframe-btn');
        debugBtn.addEventListener('click', ()=>{
            renderer.wireframe = false;
            renderer.debug = !renderer.debug;
        });
        debugWireframeBtn.addEventListener('click', ()=>{
            renderer.debug = false;
            renderer.wireframe = !renderer.wireframe;
        });

        setInterval(()=>{
            const dt = viewport.lastRenderStats.dt;
            fps =  dt > 0 ? (1000 / dt) | 0 : 1000
            avgDt = avgDt === undefined ? dt : ((avgDt + dt) / 2);
            maxFps = Math.max(maxFps, fps)
            fpsEl.innerText = fps;
            maxFpsEl.innerText = maxFps;
                drawCallsEl.innerText = renderer.drawCalls;
            objectsEl.innerText = myGame.world.scene.gameObjects.length;
            visibleObjectsEl.innerText = renderer.visibleObjects;
            vec3PoolSizeEl.innerText = renderer.vec3Pool.length;
            facesCountEl.innerText = renderer.faces;
        }, 100);
});