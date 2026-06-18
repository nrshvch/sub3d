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
 * Calculates noise-based height at global grid coordinates.
 * Relocates coordinates to align the origin, and applies a non-linear scaling
 * to flatten valley plains while creating steeper, step-by-step mountain peaks.
 */
export function calcZ(gx, gz, noise) {
  var land = 0,
    island = 0;

  // Offset global coordinates to match the original starting center height map
  let x = gx;
  let y = gz;

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

  const baseNoise = 0.8 * land + 0.2 * island;

  if (baseNoise <= 0) {
    // Water
    return Math.floor(baseNoise * 16);
  }

  // Mountain mask for slow regional variety (mountains vs. plains)
  const mountainMask = noise.noise2D(x / 600, y / 600);

  let landHeight = baseNoise;
  if (mountainMask > 0.15) {
    // Steeper mountain peaks with power scaling
    const mountainFactor = (mountainMask - 0.15) / 0.85; // 0 to 1
    landHeight = baseNoise * 0.4 + Math.pow(baseNoise * 1.6, 2.2) * 2.0 * mountainFactor;
  } else {
    // Flatter plain regions
    landHeight = baseNoise * 0.45;
  }

  return Math.floor(landHeight * 16);
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
export function getGridVertexHeight(gx, gz, noise) {
  if (
    isTileWater(gx - 1, gz - 1, noise) ||
    isTileWater(gx, gz - 1, noise) ||
    isTileWater(gx - 1, gz, noise) ||
    isTileWater(gx, gz, noise)
  ) {
    return 0;
  }
  return calcZ(gx, gz, noise) * 16;
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
 * Computes depth-dependent water color.
 * The depth is based on the negative height returned by calcZ.
 * Transitions from a bright light blue at depth 0 to a deep navy blue at depth >= 8.
 */
function getWaterColor(gx, gz, noise) {
  const depth = Math.max(0, -calcZ(gx, gz, noise));
  const t = Math.min(depth / 8, 1);
  const r = 0;
  const g = (130 * (1 - t) + 35 * t) | 0;
  const b = (220 * (1 - t) + 110 * t) | 0;
  return (r << 16) | (g << 8) | b;
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
   * @param {boolean} isWireframe - Wireframe rendering active
   * @param {boolean} isSmooth - Smooth shading mode active
   * @param {number} [segments=30] - Grid resolution size
   */
  constructor(gx, gz, game, noise, terrainPool, treePool, rockPool, TILE_SIZE, isWireframe, isSmooth, segments = 30) {
    this.gx = gx;
    this.gz = gz;
    this.game = game;
    this.terrainPool = terrainPool;
    this.treePool = treePool;
    this.rockPool = rockPool;
    this.trees = [];
    this.rocks = [];

    const TILE_WORLD_SIZE = TILE_SIZE;
    const row = segments + 1;

    // 1. Acquire terrain object from pool
    this.terrain = terrainPool.acquire();

    const verts = this.terrain.meshRenderer.vertices;

    // 2. Compute heights of grid corner vertices (corners)
    for (let j = 0; j <= segments; j++) {
      const globalZ = gz * segments + j - segments / 2;
      for (let i = 0; i <= segments; i++) {
        const globalX = gx * segments + i - segments / 2;
        const vIdx = j * row + i;
        
        // Calculate height with water clamping and seam correction
        verts[vIdx * 3 + 1] = getGridVertexHeight(globalX, globalZ, noise);
      }
    }

    // 3. Generate center heights, colors, and face colors for each of the 30x30 tiles
    const colors = [];
    const faceColors = [];

    for (let j = 0; j < segments; j++) {
      const globalZ = gz * segments + j - segments / 2;
      for (let i = 0; i < segments; i++) {
        const globalX = gx * segments + i - segments / 2;

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
          colors.push(getWaterColor(globalX, globalZ, noise)); // Depth-dependent water color
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
            colors.push(getWaterColor(globalX, globalZ, noise));

            faceColors.push(h_tl === h_tr ? waterColorIdx : coastColorIdx);
            faceColors.push(h_tr === h_br ? waterColorIdx : coastColorIdx);
            faceColors.push(h_br === h_bl ? waterColorIdx : coastColorIdx);
            faceColors.push(h_bl === h_tl ? waterColorIdx : coastColorIdx);
          } else {
            // Partial grass inside coast
            const grassColorIdx = colors.length;
            const bx = globalX;
            const bz = globalZ;
            // Diffuse boundaries using high-frequency noise perturbation
            const biomeNoise = noise.noise2D(bx / 400, bz / 400);
            const perturbedNoise = biomeNoise + noise.noise2D(bx / 6, bz / 6) * 0.12;

            let r, g, b;
            if (perturbedNoise > 0.15) {
              // Pine forest biome - Mossy Pine green
              r = (tileRand * 15 + 35) | 0;
              g = (tileRand * 20 + 120) | 0;
              b = (tileRand * 15 + 45) | 0;
            } else if (perturbedNoise < -0.25) {
              // Lollipop tree biome - Soft warm olive green
              r = (tileRand * 15 + 60) | 0;
              g = (tileRand * 20 + 135) | 0;
              b = (tileRand * 15 + 55) | 0;
            } else {
              // Plains biome - Natural fresh grass green
              r = (tileRand * 15 + 45) | 0;
              g = (tileRand * 20 + 150) | 0;
              b = (tileRand * 15 + 55) | 0;
            }
            colors.push((r << 16) | (g << 8) | b);

            faceColors.push(h_tl === h_ey && h_tr === h_ey ? grassColorIdx : coastColorIdx);
            faceColors.push(h_tr === h_ey && h_br === h_ey ? grassColorIdx : coastColorIdx);
            faceColors.push(h_br === h_ey && h_bl === h_ey ? grassColorIdx : coastColorIdx);
            faceColors.push(h_bl === h_ey && h_tl === h_ey ? grassColorIdx : coastColorIdx);
          }

        } else {
          // Ground / grass / mountain tile
          const h_ey = getTTDMidpoint(h_tl, h_tr, h_br, h_bl);
          verts[centerVertIdx * 3 + 1] = h_ey;

          const colorIdx = colors.length;
          
          if (h_ey >= 340) {
            // Snowy peak
            const gray = (240 + tileRand * 15) | 0;
            colors.push((gray << 16) | (gray << 8) | gray); // Snowy white
          } else if (h_ey >= 240) {
            // Rocky mountain slope
            const gray = (120 + tileRand * 25) | 0;
            colors.push((gray << 16) | (gray << 8) | gray); // Stone gray
          } else {
            // Grass green / biome ground color
            const bx = globalX;
            const bz = globalZ;
            // Diffuse boundaries using high-frequency noise perturbation
            const biomeNoise = noise.noise2D(bx / 400, bz / 400);
            const perturbedNoise = biomeNoise + noise.noise2D(bx / 6, bz / 6) * 0.12;

            let r, g, b;
            if (perturbedNoise > 0.15) {
              // Pine forest biome - Mossy Pine green
              r = (tileRand * 15 + 35) | 0;
              g = (tileRand * 20 + 120) | 0;
              b = (tileRand * 15 + 45) | 0;
            } else if (perturbedNoise < -0.25) {
              // Lollipop tree biome - Soft warm olive green
              r = (tileRand * 15 + 60) | 0;
              g = (tileRand * 20 + 135) | 0;
              b = (tileRand * 15 + 55) | 0;
            } else {
              // Plains biome - Natural fresh grass green
              r = (tileRand * 15 + 45) | 0;
              g = (tileRand * 20 + 150) | 0;
              b = (tileRand * 15 + 55) | 0;
            }
            colors.push((r << 16) | (g << 8) | b);
          }

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

    // 7. Position terrain chunk at the center of its tile region in world space
    const centerX_world = gx * segments * TILE_WORLD_SIZE;
    const centerZ_world = gz * segments * TILE_WORLD_SIZE;

    this.terrain.transform.translate(centerX_world, 0, centerZ_world);
    this.terrain.transform.scale(segments * TILE_WORLD_SIZE, 1, segments * TILE_WORLD_SIZE);

    game.world.scene.addGameObject(this.terrain);

    // 8. Generate Trees deterministically using SeededRandom with Area Dependency
    const TREE_SCALE = 0.8;

    for (let j = 0; j < segments; j++) {
      const globalZ = gz * segments + j - segments / 2;
      for (let i = 0; i < segments; i++) {
        const globalX = gx * segments + i - segments / 2;

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
        const h_min = Math.min(h_tl, h_tr, h_br, h_bl);

        // Spawn trees only above water level and below the treeline (240 height)
        if (h_min > 0 && h_mid < 240) {
          const bx = globalX;
          const bz = globalZ;
          // Diffuse boundaries using high-frequency noise perturbation
          const biomeNoise = noise.noise2D(bx / 400, bz / 400);
          const perturbedNoise = biomeNoise + noise.noise2D(bx / 6, bz / 6) * 0.12;

          let spawnProb = 0.98; // Default for Plains (2% chance of tree)
          let treeType = 'ball'; // Plains only have ball trees

          if (perturbedNoise > 0.15) {
            // Pine Forest Biome: dense forest of pines
            spawnProb = 0.35; // 65% chance of tree
            treeType = 'cone';
          } else if (perturbedNoise < -0.25) {
            // Lollipop Tree Biome: less dense new trees
            spawnProb = 0.75; // 25% chance of tree
            treeType = 'ball';
          } else {
            // Plains: very sparse ball trees only
            spawnProb = 0.98; // 2% chance
            treeType = 'ball';
          }

          if (rng.next() > spawnProb) {
            const tree = treePool.acquire();
            tree.setType(treeType);

            if (treeType === 'cone') {
              // Pine tree: short brown trunk + classic dark green foliage
              const trunkColor = 0x5c4033; // Brown trunk
              const foliageColor = 0x006400; // Classic dark green pine
              tree.meshRenderer.colors = new Uint32Array([trunkColor, foliageColor]);
            } else {
              // New lollipop trees: brown trunk + varied foliage
              const trunkColor = 0x5c4033; // Brown trunk
              
              // Foliage color variation: deep forest green to lime/yellowy-green (NOT too reddish)
              const tColor = rng.next();
              const r = ((1 - tColor) * 34 + tColor * 110) | 0; // 34 to 110
              const g = ((1 - tColor) * 139 + tColor * 165) | 0; // 139 to 165
              const b = ((1 - tColor) * 34 + tColor * 45) | 0;  // 34 to 45
              const foliageColor = (r << 16) | (g << 8) | b;
              
              tree.meshRenderer.colors = new Uint32Array([trunkColor, foliageColor]);
            }

            tree.meshRenderer.layer = 0;
            tree.meshRenderer.depthBias = -16;

            // Barycentric offset coordinates inside the tile
            const u = 0.25 + rng.next() * 0.5;
            const v = 0.25 + rng.next() * 0.5;
            const offsetX = u * TILE_WORLD_SIZE;
            const offsetY = v * TILE_WORLD_SIZE;

            const size = rng.next() / 2 + 0.5;
            const h = getInterpolatedTTDHeight(u, v, h_tl, h_bl, h_br, h_tr, h_mid);

            // Position tree in world space relative to the starting center
            const treeWorldX = globalX * TILE_WORLD_SIZE + offsetX;
            const treeWorldZ = globalZ * TILE_WORLD_SIZE + offsetY;

            tree.transform.translate(treeWorldX, h, treeWorldZ);
            
            // Apply scale and rotation depending on tree style
            if (treeType === 'cone') {
              // Pine tree scale
              tree.transform.scale(
                25 * size * TREE_SCALE,
                50 * size * TREE_SCALE,
                25 * size * TREE_SCALE
              );
              tree.transform.rotate(
                (rng.next() * 10 - 5) | 0,
                rng.next() * 50 - 25,
                (rng.next() * 10 - 5) | 0
              );
            } else {
              // Lollipop trees scaled isotropically so ball is a sphere
              const ballScale = 35 * size * TREE_SCALE;
              tree.transform.scale(ballScale, ballScale, ballScale);
              tree.transform.rotate(
                (rng.next() * 8 - 4) | 0,
                rng.next() * 360,
                (rng.next() * 8 - 4) | 0
              );
            }

            game.world.scene.addGameObject(tree);
            this.trees.push(tree);
          }
        }

        // Spawn rocks only above water level
        if (h_min > 0) {
          // Rocks can spawn anywhere above water, more frequent on rocky mountains
          let rockSpawnProb = 0.97; // Default 3% chance on plains/meadows/forest floor
          if (h_mid >= 240) {
            rockSpawnProb = 0.82; // 18% chance on high mountains/snow peaks
          } else if (h_mid >= 160) {
            rockSpawnProb = 0.90; // 10% chance on intermediate rocky hills
          }

          // Use a different seed sequence for rocks so they don't spawn on the exact same spots as trees
          const rockRng = new SeededRandom(globalX * 53 + globalZ * 97 + 1000);

          if (rockRng.next() > rockSpawnProb) {
            const rock = this.rockPool.acquire();
            
            // Stone gray color - single static color (no variety)
            rock.meshRenderer.colors = new Uint32Array([0x777777]);
            rock.meshRenderer.layer = 0;
            rock.meshRenderer.depthBias = -16;

            // Offset inside tile
            const u = 0.25 + rockRng.next() * 0.5;
            const v = 0.25 + rockRng.next() * 0.5;
            const offsetX = u * TILE_WORLD_SIZE;
            const offsetY = v * TILE_WORLD_SIZE;

            const size = rockRng.next() / 2 + 0.5;
            const h = getInterpolatedTTDHeight(u, v, h_tl, h_bl, h_br, h_tr, h_mid);

            const rockWorldX = globalX * TILE_WORLD_SIZE + offsetX;
            const rockWorldZ = globalZ * TILE_WORLD_SIZE + offsetY;

            // Position slightly below ground to prevent gaps on sloped terrain
            rock.transform.translate(rockWorldX, h - 4.0, rockWorldZ);

            // Scale uniformly to preserve the single model's shape
            const rockScale = 44 * size * TREE_SCALE;
            rock.transform.scale(rockScale, rockScale, rockScale);

            // Rotate ONLY around Y axis to keep the flat base flat on the ground
            rock.transform.rotate(0, rockRng.next() * 360, 0);

            game.world.scene.addGameObject(rock);
            this.rocks.push(rock);
          }
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
   * Destroys this group, removing terrain, trees, and rocks from the game world
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

    // 2. Remove rocks from scene and return to pool
    for (let i = 0; i < this.rocks.length; i++) {
      const rock = this.rocks[i];
      this.game.world.scene.removeGameObject(rock);
      this.rockPool.release(rock);
    }
    this.rocks = [];

    // 3. Remove terrain from scene and return to pool
    if (this.terrain) {
      this.game.world.scene.removeGameObject(this.terrain);
      this.terrainPool.release(this.terrain);
      this.terrain = null;
    }
  }
}
