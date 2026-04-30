export default function Scenes() {
  this.gameObjects = [];
}

var p = Scenes.prototype;

/**
 * @type {GameObject[]}
 * @private
 */
p.gameObjects = null;

/**
 * Array with gameObjects
 * @param {GameObject} gameObject
 */
p.addGameObject = function (gameObject) {
    this.gameObjects[this.gameObjects.length++] = gameObject;
    gameObject.setScene(this);
}


p.removeGameObject = function (gameObject) {
  this.gameObjects[this.gameObjects.indexOf(gameObject)] = this.gameObjects[this.gameObjects.length-1];
  this.gameObjects.length -= 1;
};

p.retrieve = function () {
  const stack = [];
  const gameObjects = [];
  let listIndex = 0;
  let stackIndex = 0;

  for (let i = this.gameObjects.length - 1; i >= 0; i--) {
    stack[stackIndex++] = this.gameObjects[i];
  }

  while (stackIndex > 0) {
    const gameObject = stack[--stackIndex];

    gameObject.transform.updateWorldMatrix();

    // Add reference to our flat list
    gameObjects[listIndex++] = gameObject;

    // Push children to stack in REVERSE order
    // This ensures the first child is popped first (maintains left-to-right order)
    const children = gameObject.transform.children;
    for (let i = children.length - 1; i >= 0; i--) {
      stack[stackIndex++] = children[i].gameObject;
    }
  }

  return gameObjects;
};
