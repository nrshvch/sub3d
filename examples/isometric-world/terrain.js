import scaliaEngine from "./xl3d/xl3d.js";

const GameObject = scaliaEngine.GameObject;
const MeshComponent = scaliaEngine.MeshComponent;

/**
 * Simplifies an existing subdivided grid mesh.
 * @param {Float32Array} vertices - Existing vertex buffer [x,y,z...]
 * @param {Uint32Array} faces - Existing face index buffer
 * @param {Uint32Array} faceColors - Map of face index to color index
 * @param {number} segments - The grid resolution (e.g., 50 for 50x50 cells)
 */
export function simplifyExistingGridMesh(vertices, faces, faceColors, segments) {
  const row = segments + 1;
  const gridVertsCount = row * row;

  const newFaces = [];
  const newFaceColors = [];

  // Helper: Get the Y-height of a cell center vertex
  const getCellHeight = (cx, cy) => {
    const centerVertIdx = gridVertsCount + (cy * segments + cx);
    return vertices[centerVertIdx * 3 + 1];
  };

  // Helper: Check if all 4 triangles in a cell share the same color
  const isCellUniformColor = (cx, cy) => {
    const startIdx = (cy * segments + cx) * 4;
    const c0 = faceColors[startIdx];
    return (
      faceColors[startIdx + 1] === c0 &&
      faceColors[startIdx + 2] === c0 &&
      faceColors[startIdx + 3] === c0
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
        const tileColor = faceColors[cellIdx * 4];

        // Triangle 1: Top-Left, Bottom-Right, Top-Right
        newFaces.push(tl, br, tr);
        newFaceColors.push(tileColor);

        // Triangle 2: Top-Left, Bottom-Left, Bottom-Right
        newFaces.push(tl, bl, br);
        newFaceColors.push(tileColor);
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
        newFaceColors.push(faceColors[colorBase]);

        // Triangle 1: Top-Right to Center
        newFaces.push(tr, center, br);
        newFaceColors.push(faceColors[colorBase + 1]);

        // Triangle 2: Bottom-Right to Center
        newFaces.push(br, center, bl);
        newFaceColors.push(faceColors[colorBase + 2]);

        // Triangle 3: Bottom-Left to Center
        newFaces.push(bl, center, tl);
        newFaceColors.push(faceColors[colorBase + 3]);
      }
    }
  }

  // STEP 2: Return new buffers.
  // Vertices remain untouched so lighting/fog logic still has grid-points to sample.
  return {
    vertices: vertices,
    faces: new Uint32Array(newFaces),
    faceColors: new Uint32Array(newFaceColors),
  };
}

function generateTerrainMesh(width, height, segments) {
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

      // 4 Triangles with reversed winding (Clockwise -> Counter-Clockwise or vice versa)
      // Swapping the 2nd and 3rd arguments:
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
  };
}

const terrainMesh = generateTerrainMesh(1, 1, 100);

const bounds = new Float32Array(32);

MeshComponent.computeBoundsFlatArray(bounds, 0, terrainMesh.vertices);

MeshComponent.computeBoundingSphere(bounds, 28, terrainMesh.vertices);

export default function Terrain() {
  GameObject.call(this);

  const mesh = new MeshComponent(this);

  mesh.faces = terrainMesh.faces;

  mesh.vertices = terrainMesh.vertices;

  mesh.bounds = bounds;

  mesh.updateNormals();

  this.addComponent(mesh);
}

Terrain.prototype = Object.create(GameObject.prototype);

Terrain.simplifyExistingGridMesh = simplifyExistingGridMesh;

