import scaliaEngine from "sub3d";

const GameObject = scaliaEngine.GameObject;
const MeshComponent = scaliaEngine.MeshComponent;

/**
 * Simplifies an existing subdivided grid mesh by collapsing flat, uniform tiles.
 * @param {Float32Array} vertices - Existing vertex buffer [x,y,z...]
 * @param {Uint32Array} faces - Existing face index buffer
 * @param {Uint32Array} colors - Map of face index to 32-bit color
 * @param {number} segments - The grid resolution (e.g., 30 for 30x30 cells)
 */
export function simplifyExistingGridMesh(vertices, faces, colors, segments) {
  const row = segments + 1;
  const gridVertsCount = row * row;

  const newFaces = [];
  const newColors = [];

  // Helper: Get the Y-height of a cell center vertex
  const getCellHeight = (cx, cy) => {
    const centerVertIdx = gridVertsCount + (cy * segments + cx);
    return vertices[centerVertIdx * 3 + 1];
  };

  // Helper: Check if all 4 triangles in a cell share the same color
  const isCellUniformColor = (cx, cy) => {
    const startIdx = (cy * segments + cx) * 4;
    const c0 = colors[startIdx];
    return (
      colors[startIdx + 1] === c0 &&
      colors[startIdx + 2] === c0 &&
      colors[startIdx + 3] === c0
    );
  };

  // Helper: Check if center vertex lies perfectly on the plane of the corners
  const isCellFlat = (cx, cy) => {
    const tlY = vertices[(cy * row + cx) * 3 + 1];
    const trY = vertices[(cy * row + (cx + 1)) * 3 + 1];
    const blY = vertices[((cy + 1) * row + cx) * 3 + 1];
    const brY = vertices[((cy + 1) * row + (cx + 1)) * 3 + 1];
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

      // Get corner indices for this specific tile
      const tl = y * row + x;
      const tr = y * row + (x + 1);
      const bl = (y + 1) * row + x;
      const br = (y + 1) * row + (x + 1);

      const flat = isCellFlat(x, y);
      const uniform = isCellUniformColor(x, y);

      // STEP 1: Determine if this tile can be simplified.
      // It must be flat (no peak/pit) and all 4 triangles must be the same color.
      if (flat && uniform) {
        /**
         * SIMPLIFIED CASE:
         * Collapse 4 triangles into 2. This bypasses the center vertex.
         * Visual is preserved, face count per tile is halved.
         */
        const tileColor = colors[cellIdx * 4];

        // Triangle 1: Top-Left, Bottom-Right, Top-Right
        newFaces.push(tl, br, tr);
        newColors.push(tileColor);

        // Triangle 2: Top-Left, Bottom-Left, Bottom-Right
        newFaces.push(tl, bl, br);
        newColors.push(tileColor);
      } else {
        /**
         * COMPLEX CASE:
         * If the tile is a "coast" (multi-color) or "rugged" (non-flat),
         * we must use all 5 vertices and 4 triangles to preserve the detail.
         */
        const center = gridVertsCount + cellIdx;
        const colorBase = cellIdx * 4;

        // Triangle 0: Top-Left to Center
        newFaces.push(tl, center, tr);
        newColors.push(colors[colorBase]);

        // Triangle 1: Top-Right to Center
        newFaces.push(tr, center, br);
        newColors.push(colors[colorBase + 1]);

        // Triangle 2: Bottom-Right to Center
        newFaces.push(br, center, bl);
        newColors.push(colors[colorBase + 2]);

        // Triangle 3: Bottom-Left to Center
        newFaces.push(bl, center, tl);
        newColors.push(colors[colorBase + 3]);
      }
    }
  }

  // STEP 2: Return new buffers.
  // Vertices remain untouched so lighting/fog logic still has grid-points to sample.
  return {
    vertices: vertices,
    faces: new Uint32Array(newFaces),
    colors: new Uint32Array(newColors),
  };
}

/**
 * Generates a flat 2D grid terrain mesh with a central vertex per tile.
 */
export function generateTerrainMesh(width, height, segments) {
  const verts = [];
  const faces = [];

  const wH = width / 2;
  const hH = height / 2;
  const segW = width / segments;
  const segH = height / segments;

  // 1. Generate GRID Vertices (The corners)
  for (let iy = 0; iy <= segments; iy++) {
    const z = iy * segH - hH;
    for (let ix = 0; ix <= segments; ix++) {
      const x = ix * segW - wH;
      verts.push(x, 0, z);
    }
  }

  const row = segments + 1;
  const gridVertsCount = row * row;
  let centerVertIdx = gridVertsCount;

  // 2. Generate CENTER Vertices and Faces
  for (let iy = 0; iy < segments; iy++) {
    for (let ix = 0; ix < segments; ix++) {
      const tl = iy * row + ix;
      const tr = iy * row + (ix + 1);
      const bl = (iy + 1) * row + ix;
      const br = (iy + 1) * row + (ix + 1);

      // Center Position
      const cx = (verts[tl * 3] + verts[tr * 3]) * 0.5;
      const cz = (verts[tl * 3 + 2] + verts[bl * 3 + 2]) * 0.5;
      verts.push(cx, 0, cz);

      // 4 Triangles with reversed winding
      faces.push(tl, centerVertIdx, tr); // Top
      faces.push(tr, centerVertIdx, br); // Right
      faces.push(br, centerVertIdx, bl); // Bottom
      faces.push(bl, centerVertIdx, tl); // Left

      centerVertIdx++;
    }
  }

  return {
    vertices: new Float32Array(verts),
    faces: new Uint16Array(faces),
    colors: new Uint32Array(faces.length / 3).fill(0x0000FF),
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
