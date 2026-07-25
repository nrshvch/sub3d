import scaliaEngine from "sub3d";

const GameObject = scaliaEngine.GameObject;
const MeshComponent = scaliaEngine.MeshComponent;

/**
 * Simplifies an existing subdivided grid terrain mesh by collapsing flat, single-color tiles.
 * 
 * Each tile starts with 12 split vertices (3 vertices per triangle across 4 triangles).
 * - If a tile is flat (center vertex lies on plane of corners) AND uniform in color (all 12 vertices match),
 *   its 4 triangles are collapsed into 2 diagonal triangles, cutting face count in half.
 * - Otherwise (slopes, ridges, or multi-colored shore transitions), all 4 triangles with split vertices
 *   are retained to preserve detail and hard color edges.
 * 
 * @param {Float32Array} vertices - Existing vertex position buffer [x, y, z...]
 * @param {Uint32Array} faces - Existing face index buffer
 * @param {Uint32Array} colors - Per-vertex 32-bit packed color buffer
 * @param {number} segments - Grid resolution (e.g. 30 for 30x30 cells)
 * @returns {{vertices: Float32Array, faces: Uint32Array, colors: Uint32Array}}
 */
export function simplifyExistingGridMesh(vertices, faces, colors, segments) {
  const newFaces = [];

  // Helper: Get the Y-height of a cell center vertex
  const getCellHeight = (cx, cy) => {
    const baseVert = (cy * segments + cx) * 12;
    return vertices[(baseVert + 1) * 3 + 1]; // Center vertex Y
  };

  // Helper: Checks if all 12 vertices of a tile cell share the exact same color
  const isCellUniformColor = (cx, cy) => {
    const baseVert = (cy * segments + cx) * 12;
    const c0 = colors[baseVert];
    for (let k = 1; k < 12; k++) {
      if (colors[baseVert + k] !== c0) return false;
    }
    return true;
  };

  // Helper: Checks if the tile's center vertex Y position matches the average of the 4 corners
  const isCellFlat = (cx, cy) => {
    const baseVert = (cy * segments + cx) * 12;
    const tlY = vertices[baseVert * 3 + 1];           // Triangle 0: Top-Left
    const trY = vertices[(baseVert + 2) * 3 + 1];     // Triangle 0: Top-Right
    const blY = vertices[(baseVert + 8) * 3 + 1];     // Triangle 2: Bottom-Left
    const brY = vertices[(baseVert + 5) * 3 + 1];     // Triangle 1: Bottom-Right
    const centerY = getCellHeight(cx, cy);

    // Average corner height
    const avg = (tlY + trY + blY + brY) * 0.25;
    // Tiny epsilon to handle floating point errors
    return Math.abs(centerY - avg) < 0.0001;
  };

  // Iterate through every logical tile in the grid
  for (let y = 0; y < segments; y++) {
    for (let x = 0; x < segments; x++) {
      const cellIdx = y * segments + x;
      const baseVert = cellIdx * 12;

      const flat = isCellFlat(x, y);
      const uniform = isCellUniformColor(x, y);

      // STEP 1: Determine if this tile can be simplified.
      // It must be flat (no peak/pit) and all 4 triangles must be the same color.
      if (flat && uniform) {
        // SIMPLIFIED CASE: Collapse 4 triangles down to 2 diagonal triangles (saves 50% faces).
        // Uses corner vertices: TL -> BR -> TR and TL -> BL -> BR
        newFaces.push(baseVert + 0, baseVert + 5, baseVert + 2); // Triangle A
        newFaces.push(baseVert + 0, baseVert + 8, baseVert + 5); // Triangle B
      } else {
        // DETAILED CASE: Preserve all 4 triangles with split vertices for hard-edge shores/slopes.
        newFaces.push(baseVert + 0, baseVert + 1, baseVert + 2);   // Triangle 0: Top (TL, Center, TR)
        newFaces.push(baseVert + 3, baseVert + 4, baseVert + 5);   // Triangle 1: Right (TR, Center, BR)
        newFaces.push(baseVert + 6, baseVert + 7, baseVert + 8);   // Triangle 2: Bottom (BR, Center, BL)
        newFaces.push(baseVert + 9, baseVert + 10, baseVert + 11); // Triangle 3: Left (BL, Center, TL)
      }
    }
  }

  // STEP 2: Return new buffers.
  // Vertices remain untouched so lighting/fog logic still has grid-points to sample.
  return {
    vertices: vertices,
    faces: new Uint32Array(newFaces),
    colors: colors,
  };
}

/**
 * Generates a flat 2D grid terrain mesh template using 12 split vertices per 1x1 tile cell.
 * Each of the 4 triangles per cell gets 3 dedicated (unshared) vertices.
 * 
 * @param {number} width - Total world-space width of the terrain chunk
 * @param {number} height - Total world-space height/depth of the terrain chunk
 * @param {number} segments - Grid resolution (e.g. 30 for 30x30 cells)
 * @returns {{vertices: Float32Array, faces: Uint16Array, colors: Uint32Array}}
 */
export function generateTerrainMesh(width, height, segments) {
  const verts = [];
  const faces = [];

  const wH = width / 2;
  const hH = height / 2;
  const segW = width / segments;
  const segH = height / segments;

  for (let iy = 0; iy < segments; iy++) {
    const z0 = iy * segH - hH;
    const z1 = (iy + 1) * segH - hH;
    for (let ix = 0; ix < segments; ix++) {
      const x0 = ix * segW - wH;
      const x1 = (ix + 1) * segW - wH;
      const cx = (x0 + x1) * 0.5; // Cell center X
      const cz = (z0 + z1) * 0.5; // Cell center Z

      const baseVert = (iy * segments + ix) * 12;

      // Triangle 0: Top (TL, Center, TR)
      verts.push(x0, 0, z0);
      verts.push(cx, 0, cz);
      verts.push(x1, 0, z0);
      faces.push(baseVert, baseVert + 1, baseVert + 2);

      // Triangle 1: Right (TR, Center, BR)
      verts.push(x1, 0, z0);
      verts.push(cx, 0, cz);
      verts.push(x1, 0, z1);
      faces.push(baseVert + 3, baseVert + 4, baseVert + 5);

      // Triangle 2: Bottom (BR, Center, BL)
      verts.push(x1, 0, z1);
      verts.push(cx, 0, cz);
      verts.push(x0, 0, z1);
      faces.push(baseVert + 6, baseVert + 7, baseVert + 8);

      // Triangle 3: Left (BL, Center, TL)
      verts.push(x0, 0, z1);
      verts.push(cx, 0, cz);
      verts.push(x0, 0, z0);
      faces.push(baseVert + 9, baseVert + 10, baseVert + 11);
    }
  }

  return {
    vertices: new Float32Array(verts),
    faces: new Uint16Array(faces),
    colors: new Uint32Array(verts.length / 3).fill(0x0000FF),
  };
}

// Cache for mesh templates to avoid regenerating base vertex structures
const meshCache = {};

function getCachedTerrainMesh(segments) {
  if (!meshCache[segments]) {
    const meshData = generateTerrainMesh(1, 1, segments);
    const bounds = new Float32Array(32);
    MeshComponent.computeBoundsFlatArray(bounds, 0, meshData.vertices);
    MeshComponent.computeBoundingSphere(bounds, 28, meshData.vertices);
    meshCache[segments] = { meshData, bounds };
  }
  return meshCache[segments];
}

/**
 * Terrain GameObject class.
 * @param {number} segments - Grid segment resolution (e.g. 30)
 * @constructor
 */
export default function Terrain(segments = 30) {
  GameObject.call(this);

  const cached = getCachedTerrainMesh(segments);
  const mesh = new MeshComponent(this);

  // Allocate a fresh copy of the base vertices array for this terrain instance
  // so its heights can be modified independently.
  mesh.vertices = new Float32Array(cached.meshData.vertices);
  mesh.faces = cached.meshData.faces;
  mesh.bounds = cached.bounds;
  mesh.updateNormals();

  this.addComponent(mesh);

  // Store shortcut reference for direct access
  this.meshRenderer = mesh;
}

Terrain.prototype = Object.create(GameObject.prototype);
Terrain.prototype.constructor = Terrain;

Terrain.simplifyExistingGridMesh = simplifyExistingGridMesh;
Terrain.getCachedTerrainMesh = getCachedTerrainMesh;
