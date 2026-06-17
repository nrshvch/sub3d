import scaliaEngine from "sub3d";
import Terrain from "./terrain.js";

// Deterministic 2D hash function for seeded random properties
function hash2D(x, y) {
  let h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return h - Math.floor(h);
}

// Simple seeded pseudo-random number generator class
class SeededRandom {
  constructor(seed) {
    this.seed = seed;
  }
  next() {
    let x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
}

/**
 * Calculates noise-based height (Z value in the original code) at global grid coordinates.
 * Relocates gx and gz such that the starting region (0, 0) aligns with original N=100 grid's center (50, 50).
 */
export function calcZ(gx, gz, noise) {
  var land = 0,
    island = 0;

  // Offset global coordinates to match the original starting center height map
  let x = gx + 50;
  let y = gz + 50;

  x += 640;
  y += 700;

  // Layered octaves of Simplex Noise for realistic terrain
  land += noise.noise2D(x / 512, y / 512) / 2; // continents
  land += noise.noise2D(x / 256, y / 256) / 4; // smaller lands
  land += noise.noise2D(x / 128, y / 128) / 8;
  land += noise.noise2D(x / 64, y / 64) / 16;
  land += noise.noise2D(x / 32, y / 32) / 32;
  land += noise.noise2D(x / 16, y / 16) / 64;
  land += noise.noise2D(x / 8, y / 8) / 64;   // smallest details

  island += noise.noise2D(x / 64, y / 64) / 10;
  island += noise.noise2D(x / 32, y / 32) / 20;
  island += noise.noise2D(x / 16, y / 16) / 40;
  island += noise.noise2D(x / 8, y / 8) / 40;

  return Math.floor((0.8 * land + 0.2 * island) * 16);
}

/**
 * Checks if a tile is entirely water (all 4 corners are <= 0).
 */
export function isTileWater(tx, tz, noise) {
  return (
    calcZ(tx, tz, noise) <= 0 &&
    calcZ(tx + 1, tz, noise) <= 0 &&
    calcZ(tx, tz + 1, noise) <= 0 &&
    calcZ(tx + 1, tz + 1, noise) <= 0
  );
}

/**
 * Returns the final height of a grid vertex.
 * If any of the 4 surrounding tiles are water, this vertex is clamped to 0.
 * This ensures water is perfectly flat and boundary seams are prevented.
 */
export function getGridVertexHeight(gx, gz, noise, SCALE) {
  if (
    isTileWater(gx - 1, gz - 1, noise) ||
    isTileWater(gx, gz - 1, noise) ||
    isTileWater(gx - 1, gz, noise) ||
    isTileWater(gx, gz, noise)
  ) {
    return 0;
  }
  return calcZ(gx, gz, noise) * 16 * SCALE;
}

/**
 * Computes midpoints for a quad face.
 */
export function getTTDMidpoint(hTL, hTR, hBR, hBL) {
  let a = hTL,
    b = hTR,
    c = hBR,
    d = hBL,
    t;
  if (a > b) { t = a; a = b; b = t; }
  if (c > d) { t = c; c = d; d = t; }
  if (a > c) { t = a; a = c; c = t; }
  if (b > d) { t = b; b = d; d = t; }
  if (b > c) { t = b; b = c; c = t; }

  if (a === c) return a; // 3 corners low
  if (b === d) return d; // 3 corners high

  if (hTL === hBR) return hTL;
  if (hTR === hBL) return hTR;

  return (a + d) * 0.5;
}

/**
 * Interpolates height inside a quad tile based on (u, v) barycentric coordinates.
 */
export function getInterpolatedTTDHeight(u, v, h00, h01, h11, h10, hmid) {
  if (u + v < 1) {
    if (u > v) {
      return (1 - u - v) * h00 + (u - v) * h10 + 2 * v * hmid;
    } else {
      return (1 - v - u) * h00 + (v - u) * h01 + 2 * u * hmid;
    }
  } else {
    if (u > v) {
      return (u - v) * h10 + (u + v - 1) * h11 + 2 * (1 - u) * hmid;
    } else {
      return (v - u) * h01 + (u + v - 1) * h11 + 2 * (1 - v) * hmid;
    }
  }
}

/**
 * TileGroup represents a 30x30 procedural isometric chunk.
 */
export default class TileGroup {
  /**
   * @param {number} gx - Group grid coordinate X
   * @param {number} gz - Group grid coordinate Z
   * @param {object} game - The Scalia game instance
   * @param {object} noise - The Noise generator instance
   * @param {TerrainPool} terrainPool - Pool for Terrain GameObjects
   * @param {TreePool} treePool - Pool for Tree GameObjects
   * @param {number} TILE_SIZE - Tile size constant
   * @param {number} SCALE - World scale constant
   * @param {boolean} isWireframe - Wireframe rendering active
   * @param {boolean} isSmooth - Smooth shading mode active
   */
  constructor(gx, gz, game, noise, terrainPool, treePool, TILE_SIZE, SCALE, isWireframe, isSmooth) {
    this.gx = gx;
    this.gz = gz;
    this.game = game;
    this.terrainPool = terrainPool;
    this.treePool = treePool;
    this.trees = [];

    const TILE_WORLD_SIZE = TILE_SIZE * SCALE;
    const segments = 30;
    const row = segments + 1;

    // 1. Acquire terrain object from pool
    this.terrain = terrainPool.acquire();

    const verts = this.terrain.meshRenderer.vertices;

    // 2. Compute heights of grid corner vertices (31x31 corners)
    for (let j = 0; j <= segments; j++) {
      const globalZ = gz * segments + j;
      for (let i = 0; i <= segments; i++) {
        const globalX = gx * segments + i;
        const vIdx = j * row + i;
        
        // Calculate height with water clamping and seam correction
        verts[vIdx * 3 + 1] = getGridVertexHeight(globalX, globalZ, noise, SCALE);
      }
    }

    // 3. Generate center heights, colors, and face colors for each of the 30x30 tiles
    const colors = [];
    const faceColors = [];

    for (let j = 0; j < segments; j++) {
      const globalZ = gz * segments + j;
      for (let i = 0; i < segments; i++) {
        const globalX = gx * segments + i;

        // Tile corner indices
        const tl = j * row + i;
        const tr = j * row + (i + 1);
        const br = (j + 1) * row + (i + 1);
        const bl = (j + 1) * row + i;

        // Center vertex index
        const centerVertIdx = row * row + (j * segments + i);

        const h_tl = verts[tl * 3 + 1];
        const h_tr = verts[tr * 3 + 1];
        const h_br = verts[br * 3 + 1];
        const h_bl = verts[bl * 3 + 1];

        // Seeded random for deterministic visual variations on this tile
        const tileRand = hash2D(globalX, globalZ);

        if (isTileWater(globalX, globalZ, noise)) {
          // Water tile
          verts[tl * 3 + 1] = 0;
          verts[tr * 3 + 1] = 0;
          verts[br * 3 + 1] = 0;
          verts[bl * 3 + 1] = 0;
          
          // Deterministic water surface ripples
          verts[centerVertIdx * 3 + 1] = (tileRand * 2 - 1) * 2;

          const colorIdx = colors.length;
          colors.push(0x0000C8); // Water blue
          faceColors.push(colorIdx, colorIdx, colorIdx, colorIdx);

        } else if (Math.min(h_tl, h_tr, h_br, h_bl) <= 0) {
          // Coast tile
          const coastColorIdx = colors.length;
          const cr = (tileRand * 20 + 200) | 0;
          const cg = (((tileRand * 15.6) % 1) * 20 + 200) | 0;
          colors.push((cr << 16) | (cg << 8)); // Sandy coast

          const h_ey = getTTDMidpoint(h_tl, h_tr, h_br, h_bl);
          verts[centerVertIdx * 3 + 1] = h_ey;

          if (h_ey === 0) {
            // Partial water inside coast
            const waterColorIdx = colors.length;
            colors.push(0x0000C8);

            faceColors.push(h_tl === h_tr ? waterColorIdx : coastColorIdx);
            faceColors.push(h_tr === h_br ? waterColorIdx : coastColorIdx);
            faceColors.push(h_br === h_bl ? waterColorIdx : coastColorIdx);
            faceColors.push(h_bl === h_tl ? waterColorIdx : coastColorIdx);
          } else {
            // Partial grass inside coast
            const grassColorIdx = colors.length;
            const gg = (((tileRand * 23.4) % 1) * 20 + 200) | 0;
            colors.push(gg << 8);

            faceColors.push(h_tl === h_ey && h_tr === h_ey ? grassColorIdx : coastColorIdx);
            faceColors.push(h_tr === h_ey && h_br === h_ey ? grassColorIdx : coastColorIdx);
            faceColors.push(h_br === h_ey && h_bl === h_ey ? grassColorIdx : coastColorIdx);
            faceColors.push(h_bl === h_ey && h_tl === h_ey ? grassColorIdx : coastColorIdx);
          }

        } else {
          // Ground / grass tile
          const h_ey = getTTDMidpoint(h_tl, h_tr, h_br, h_bl);
          verts[centerVertIdx * 3 + 1] = h_ey;

          const colorIdx = colors.length;
          const gg = (tileRand * 20 + 200) | 0;
          colors.push(gg << 8); // Grass green
          faceColors.push(colorIdx, colorIdx, colorIdx, colorIdx);
        }
      }
    }

    // 4. Apply palette and face colors
    this.terrain.meshRenderer.colors = new Uint32Array(colors);
    this.terrain.meshRenderer.faceColors = new Uint32Array(faceColors);

    // 5. Simplify mesh (collapse flat areas)
    const simplifiedMesh = Terrain.simplifyExistingGridMesh(
      this.terrain.meshRenderer.vertices,
      this.terrain.meshRenderer.faces,
      this.terrain.meshRenderer.faceColors,
      segments
    );

    this.terrain.meshRenderer.faces = simplifiedMesh.faces;
    this.terrain.meshRenderer.faceColors = simplifiedMesh.faceColors;

    // Update shading and normals
    this.terrain.meshRenderer.updateNormals();

    // 6. Set shader options
    this.terrain.meshRenderer.layer = 0;
    this.terrain.meshRenderer.shaderType = isSmooth ? 4 : 0;
    this.terrain.meshRenderer.wireframe = isWireframe;

    // 7. Position terrain chunk at the center of its 30x30 tile region
    // Starting coordinates offset by -50 tiles to align global (0,0) with original center
    const centerX_tiles = gx * segments + segments / 2;
    const centerZ_tiles = gz * segments + segments / 2;
    const centerX_world = (centerX_tiles - 50) * TILE_WORLD_SIZE;
    const centerZ_world = (centerZ_tiles - 50) * TILE_WORLD_SIZE;

    this.terrain.transform.translate(centerX_world, 0, centerZ_world);
    this.terrain.transform.scale(segments * TILE_WORLD_SIZE, 1, segments * TILE_WORLD_SIZE);

    game.world.scene.addGameObject(this.terrain);

    // 8. Generate Trees deterministically using SeededRandom
    const TREE_SCALE = 0.8;

    for (let j = 0; j < segments; j++) {
      const globalZ = gz * segments + j;
      for (let i = 0; i < segments; i++) {
        const globalX = gx * segments + i;

        // Retrieve corner heights for tree interpolation
        const tl = j * row + i;
        const tr = j * row + (i + 1);
        const br = (j + 1) * row + (i + 1);
        const bl = (j + 1) * row + i;
        const centerVertIdx = row * row + (j * segments + i);

        const h_tl = verts[tl * 3 + 1];
        const h_tr = verts[tr * 3 + 1];
        const h_br = verts[br * 3 + 1];
        const h_bl = verts[bl * 3 + 1];
        const h_mid = verts[centerVertIdx * 3 + 1];

        // Seed using global coordinates
        const rng = new SeededRandom(globalX * 17 + globalZ * 79);

        // Spawn a tree if tile is grass/ground (all corners > 0)
        if (rng.next() > 0.6 && Math.min(h_tl, h_tr, h_br, h_bl) > 0) {
          const tree = treePool.acquire();

          // Tree appearance
          tree.meshRenderer.colors = new Uint32Array([0x006400]);
          tree.meshRenderer.layer = 0;
          tree.meshRenderer.depthBias = -16;

          // Barycentric offset coordinates inside the tile
          const u = 0.25 + rng.next() * 0.5;
          const v = 0.25 + rng.next() * 0.5;
          const offsetX = u * TILE_WORLD_SIZE;
          const offsetY = v * TILE_WORLD_SIZE;

          const size = rng.next() / 2 + 0.5;
          const yRot = rng.next() * 50 - 25;

          const h = getInterpolatedTTDHeight(u, v, h_tl, h_bl, h_br, h_tr, h_mid);

          // Position tree in world space relative to the starting center offset (-50 tiles)
          const treeWorldX = (globalX - 50) * TILE_WORLD_SIZE + offsetX;
          const treeWorldZ = (globalZ - 50) * TILE_WORLD_SIZE + offsetY;

          tree.transform.translate(treeWorldX, h, treeWorldZ);
          tree.transform.scale(
            25 * size * SCALE * TREE_SCALE,
            50 * size * SCALE * TREE_SCALE,
            25 * size * SCALE * TREE_SCALE
          );
          tree.transform.rotate(
            (rng.next() * 10 - 5) | 0,
            yRot,
            (rng.next() * 10 - 5) | 0
          );

          game.world.scene.addGameObject(tree);
          this.trees.push(tree);
        }
      }
    }
  }

  /**
   * Sets the wireframe rendering state for the terrain chunk.
   * @param {boolean} value
   */
  setWireframe(value) {
    if (this.terrain && this.terrain.meshRenderer) {
      this.terrain.meshRenderer.wireframe = value;
    }
  }

  /**
   * Sets the terrain rendering shader type (smooth/flat).
   * @param {boolean} isSmooth
   */
  setSmooth(isSmooth) {
    if (this.terrain && this.terrain.meshRenderer) {
      this.terrain.meshRenderer.shaderType = isSmooth ? 4 : 0;
      this.terrain.meshRenderer.updateNormals();
    }
  }

  /**
   * Destroys this group, removing terrain and trees from the game world
   * and returning them to their respective pools.
   */
  destroy() {
    // 1. Remove trees from scene and return to pool
    for (let i = 0; i < this.trees.length; i++) {
      const tree = this.trees[i];
      this.game.world.scene.removeGameObject(tree);
      this.treePool.release(tree);
    }
    this.trees = [];

    // 2. Remove terrain from scene and return to pool
    if (this.terrain) {
      this.game.world.scene.removeGameObject(this.terrain);
      this.terrainPool.release(this.terrain);
      this.terrain = null;
    }
  }
}
