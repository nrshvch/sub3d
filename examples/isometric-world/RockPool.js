import Rock from "./Rock.js";
import scaliaEngine from "sub3d";

/**
 * Pools Rock GameObject instances to prevent garbage collection overhead.
 */
export default class RockPool {
  constructor() {
    /**
     * Cache array holding inactive Rock instances.
     * @type {Rock[]}
     */
    this.pool = [];
  }

  /**
   * Acquires a Rock instance from the pool or instantiates a new one.
   * @returns {Rock}
   */
  acquire() {
    if (this.pool.length > 0) {
      const rock = this.pool.pop();
      scaliaEngine.glMatrix.mat4.identity(rock.transform.local);
      rock.transform.parent = null;
      if (rock.meshRenderer) {
        rock.meshRenderer.enabled = true;
      }
      return rock;
    }
    return new Rock();
  }

  /**
   * Releases a Rock instance back to the pool.
   * @param {Rock} rock
   */
  release(rock) {
    scaliaEngine.glMatrix.mat4.identity(rock.transform.local);
    rock.transform.parent = null;
    if (rock.meshRenderer) {
      rock.meshRenderer.enabled = false;
    }
    this.pool.push(rock);
  }
}
