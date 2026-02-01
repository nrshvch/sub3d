define(["./World", "./Render"], function (World, Render) {
    /**
     * @constructor
     */
    function Game() {
        this.world = new World(this);
        this.render = new Render(this);

        var world = this.world,
            render = this.render;

        this.tick = function tick(){
            world.tick();
            render.render();

            requestAnimFrame(tick);
        }
    }

    var p = Game.prototype;

    /**
     * @type {World}
     */
    p.world = null;

    /**
     * @type {Render}
     */
    p.render = null;

    /**
     * @type {void}
     */
    p.run = function () {
        this.world.start();
        this.render.start();
        this.tick();
    }

    p.rafHandler = null;

    /**
     * @type {void}
     */
    //p.mainLoop =

    return Game;
});
