/**
 * @constructor
 */
export default function Component() {

}

var p = Component.prototype;

/**
 * @type {GameObject}
 * @read-only
 */
p.gameObject = null;

p.enabled = true;

p.setGameObject = function(gameObject){
    this.gameObject = gameObject;
};

p.unsetGameObject = function(){
    this.gameObject = null;
};
