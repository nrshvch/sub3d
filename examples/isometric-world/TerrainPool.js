import Terrain from "./terrain.js";
import scaliaEngine from "sub3d";

/**
 * Pools Terrain GameObject instances to avoid reallocation of large vertex arrays.
 */
export default class TerrainPool {
  /**
   * @param {number} segments - The grid resolution (default 30)
   */
  constructor(segments = 30) {
    this.segments = segments;
    /**
     * @type {Terrain[]}
     */
    this.pool = [];

    // Pre-calculate and cache the base flat vertex template array to reset coordinates in-place
    const cached = Terrain.getCachedTerrainMesh(segments);
    this.baseVertices = cached.meshData.vertices; // Float32Array containing standard X, Y=0, Z layout
  }

  /**
   * Acquires a Terrain instance from the pool or creates a new one.
   * Resets local matrices and resets vertex heights back to flat 0.
   * @returns {Terrain}
   */
  acquire() {
    if (this.pool.length > 0) {
      const terrain = this.pool.pop();

      // Reset transform local matrix to identity
      scaliaEngine.glMatrix.mat4.identity(terrain.transform.local);
      terrain.transform.parent = null;

      // Copy the flat base vertices back into the instance vertex buffer
      // This is a fast memory copy operation that completely avoids GC allocations.
      if (terrain.meshRenderer && terrain.meshRenderer.vertices) {
        terrain.meshRenderer.vertices.set(this.baseVertices);
        terrain.meshRenderer.enabled = true;
      }
      return terrain;
    }

    return new Terrain(this.segments);
  }

  /**
   * Releases a Terrain instance back to the pool.
   * @param {Terrain} terrain
   */
  release(terrain) {
    // Reset transform local matrix to identity
    scaliaEngine.glMatrix.mat4.identity(terrain.transform.local);
    terrain.transform.parent = null;

    if (terrain.meshRenderer) {
      terrain.meshRenderer.enabled = false;
    }

    this.pool.push(terrain);
  }
}
