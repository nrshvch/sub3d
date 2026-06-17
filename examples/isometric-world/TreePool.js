import Tree from "./Tree.js";
import scaliaEngine from "sub3d";

/**
 * Pools Tree GameObject instances to prevent garbage collection overhead.
 */
export default class TreePool {
  constructor() {
    /**
     * Cache array holding inactive Tree instances.
     * @type {Tree[]}
     */
    this.pool = [];
  }

  /**
   * Acquires a Tree instance from the pool or instantiates a new one.
   * Resets transformation matrices and parent relationships.
   * @returns {Tree}
   */
  acquire() {
    if (this.pool.length > 0) {
      const tree = this.pool.pop();
      
      // Reset transform local matrix to identity to clear scale/rotation/translation
      scaliaEngine.glMatrix.mat4.identity(tree.transform.local);
      tree.transform.parent = null;
      
      // Reactivate renderer
      if (tree.meshRenderer) {
        tree.meshRenderer.enabled = true;
      }
      return tree;
    }
    return new Tree();
  }

  /**
   * Releases a Tree instance back to the pool, resetting its status.
   * @param {Tree} tree
   */
  release(tree) {
    // Reset transform local matrix to identity
    scaliaEngine.glMatrix.mat4.identity(tree.transform.local);
    tree.transform.parent = null;
    
    // Disable renderer while in pool
    if (tree.meshRenderer) {
      tree.meshRenderer.enabled = false;
    }
    
    this.pool.push(tree);
  }
}
