/**
 * @param {Logic} logic
 * @constructor
 */
export default function Scenes(logic) {
    this.logic = logic;
    this.gameObjects = [];

    this.removeQueue = [];
}

var p = Scenes.prototype;

/**
 * @type {Logic}
 */
p.logic = null;

/**
 * @type {GameObject[]}
 * @private
 */
p.gameObjects = null;

/**
 * @type {number}
 * @private
 */
p.gameObjectsCount = 0;

/**
 * @private
 * @type {[]}
 */
p.removeQueue = null;

/**
 * @private
 * @type {boolean}
 */
p.removeQueueWaiting = false;

/**
 * @private
 * @type {boolean}
 */
p.started = false;

p.light = null;

/**
 * Array with gameObjects
 * @param {GameObject} gameObject
 */
p.addGameObject = function (gameObject) {
    this.gameObjects[this.gameObjectsCount++] = gameObject;
    gameObject.setScene(this);

    if (this.started)
        gameObject.start();

    if (gameObject.transform.children.length !== 0) {
        for (var i = 0; i < gameObject.transform.children.length; i++) {
            var child = gameObject.transform.children[i].gameObject;
            this.addGameObject(child);
        }
    }
}

p.addLightSource = function (gameObject) {
    this.light = gameObject;
    return this.addGameObject(gameObject);
}

/**
 * Puts game object in queue to remove.
 * Game object will be removed at the end of tick
 * @param {GameObject} gameObject
 */
p.removeGameObject = function (gameObject) {
    //put GO's children in queue first, because they may be dependant on GO
    //therefore should be deleted first
    if (gameObject.transform.children.length !== 0) {
        for (var i = 0; i < gameObject.transform.children.length; i++) {
            var child = gameObject.transform.children[i].gameObject;
            this.removeGameObject(child);
        }
    }

    this.removeQueue.push(gameObject);
    this.removeQueueWaiting = true;
}

p.retrieve = function (gameObject) {
    return this.gameObjects;
}

p.start = function () {
    for (var i = 0; i < this.gameObjectsCount; i++) {
        this.gameObjects[i].start();
    }
    this.started = true;
}

p.findByName = function (name) {
    var result = [],
        gameObjects = this.gameObjects,
        len = this.gameObjectsCount,
        gameObject,
        i;

    for (i = 0; i < len; i++) {
        gameObject = gameObjects[i];
        if (gameObject.name === name) {
            result.push(gameObject);
        }
    }

    if (result.length === 1)
        return result[0];
    else if (result.length > 1)
        return result;
    else
        return false;
}
