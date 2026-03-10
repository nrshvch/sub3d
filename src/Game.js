import World from "./World.js";

/**
 * @constructor
 */
export default function Game() {
    this.world = new World(this);

    var world = this.world;

    this.tick = function tick(){
        world.tick();

        requestAnimationFrame(tick);
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
    this.tick();
}

p.rafHandler = null;

