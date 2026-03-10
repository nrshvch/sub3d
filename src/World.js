import Time from "./Time.js";
import Scene from "./Scene.js";
import config from "./config.js";

/**
 * @param {Game} game
 * @constructor
 */
export default function World(game) {
    this.game = game;
    this.time = new Time();
    this.list = [];
    this.scene = new Scene(this);
}

var p = World.prototype;

/**
 * @type {Game}
 */
p.game = null;

/**
 * The scene
 * @type {null}
 */
p.scene = null;

/**
 * @type {Time}
 */
p.time = null;

p.start = function () {
    this.scene.start();
}

p.tickRegister = function(obj) {
    if (obj._tickerIndex !== undefined) return; // Already registered
    obj._tickerIndex = this.list.length;
    this.list.push(obj);
}

p.tickUnregister = function(obj) {
    const idx = obj._tickerIndex;
    if (idx === undefined) return;

    const last = this.list.pop();
    if (last !== obj) {
        this.list[idx] = last;
        last._tickerIndex = idx;
    }
    obj._tickerIndex = undefined;
}

p.update = function(data) {
    const active = this.list;
    for (let i = 0; i < active.length; i++) {
        active[i].tick(data);
    }
}

/**
 * @return {void}
 */
p.tick = function () {
    var now = Date.now(), i = 0;
    var frameTime = now - this.time.now,
        dtime, dt = this.time.dt;

    while (frameTime >= dt) {
        frameTime -= dt;
        this.time.now += dt;
        this.time.time += dt;
        this.update(this.time);
        if (i++ > 200) {
            break;
        }
    }
}
