define(["./Viewport", "./Canvas2dRenderer"], function (Viewport, Renderer) {
    /**
     * @constructor
     */
    function Render(game) {
        this.game = game;
        this.viewports = [];
        this.renderer = new Renderer();
        this.started = false;
    }

    var p = Render.prototype;

    /**
     * @type {Game}
     */
    p.game = null;

    /**
     * Flag is set when Game was run
     * @type {boolean}
     */
    p.started = false;

    /**
     * @type {Viewport[]}
     */
    p.viewports = null;

    p.start = function(){
        var viewports = this.viewports,
            viewportsCount = viewports.length;
        for(var i = 0; i < viewportsCount; i++){
            viewports[i].start();
        }
        this.started = true;
    }

    /**
     * @param {CameraComponent} camera
     * @return {Viewport}
     */
    p.createViewport = function(canvas, camera){
        var viewport = new Viewport(this, canvas);
        viewport.setCamera(camera);
        this.viewports.push(viewport);
        if(this.started)
            viewport.start();
        return viewport;
    }

    /**
     * @return {void}
     */
    p.render = function(){
        var t0 = Date.now();
        var viewports = this.viewports,
            viewportsCount = viewports.length;
        for(var i = 0; i < viewportsCount; i++){
            viewports[i].render();
        }
        this.dt = Date.now() - t0;
    }

    return Render;
});
