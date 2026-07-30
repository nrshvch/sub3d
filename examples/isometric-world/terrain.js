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

/**
 * Points every position-coincident vertex normal the same direction a shared-vertex mesh's
 * single vertex would have, without changing the mesh's topology at all: mesh.faces and
 * mesh.vertices are never touched here, so a grid corner still has its own 4 separate, split
 * vertices afterward (needed elsewhere for hard per-tile flat coloring) - only the value
 * written into each of those 4 vertexNormals entries changes, so they all agree. Mirrors the
 * same "base updateNormals() stays generic, the mesh author adds their own smoothing pass"
 * pattern used for Ball's pole/seam smoothing (see Ball.js#weldSeamNormals), called once after
 * mesh.updateNormals().
 *
 * Unlike Ball's version (which sums already-normalized per-vertex normals), this recomputes
 * each face's raw, unnormalized cross product directly from vertex positions before summing -
 * its magnitude is proportional to that face's area, so the result matches exactly what
 * updateNormals() would have produced if these vertices were actually shared (area-weighted),
 * not just an angle-average of already-unit-length directions.
 *
 * Grouping is gated by materials (0 = land, 1 = water) in addition to position, so a shore
 * tile's water-level corner - which won't find a land match at that exact position - simply
 * keeps its own face normal instead of blending with the adjacent water tile; the water/shore
 * boundary stays a hard lighting seam even though same-material tiles smooth normally. Every
 * water vertex is then forced flat (0, 1, 0) regardless of what smoothing produced, since water
 * shouldn't show a lighting gradient even from its own ripple-jittered center vertex.
 *
 * @param {object} mesh - A MeshComponent that has already had updateNormals() called on it.
 * @param {Uint8Array} materials - Per-vertex material tag (0 = land, 1 = water).
 */
export function smoothTerrainNormals(mesh, materials) {
  const verts = mesh.vertices;
  const faces = mesh.faces;
  const vn = mesh.vertexNormals;
  const vertexCount = verts.length / 3;
  const faceCount = faces.length / 3;

  // Raw (unnormalized) per-face normal - same edge-vector cross product updateNormals() computes
  // internally, just left unnormalized so its magnitude still encodes triangle area.
  const rawNormals = new Float32Array(faceCount * 3);
  for (let f = 0; f < faceCount; f++) {
    const v0 = faces[f * 3] * 3;
    const v1 = faces[f * 3 + 1] * 3;
    const v2 = faces[f * 3 + 2] * 3;

    const ax = verts[v1] - verts[v0], ay = verts[v1 + 1] - verts[v0 + 1], az = verts[v1 + 2] - verts[v0 + 2];
    const bx = verts[v2] - verts[v0], by = verts[v2 + 1] - verts[v0 + 1], bz = verts[v2 + 2] - verts[v0 + 2];

    rawNormals[f * 3] = ay * bz - az * by;
    rawNormals[f * 3 + 1] = az * bx - ax * bz;
    rawNormals[f * 3 + 2] = ax * by - ay * bx;
  }

  // Every vertex belongs to exactly one face in this fully-split mesh, so this map is total.
  const faceOfVertex = new Int32Array(vertexCount).fill(-1);
  for (let f = 0; f < faceCount; f++) {
    faceOfVertex[faces[f * 3]] = f;
    faceOfVertex[faces[f * 3 + 1]] = f;
    faceOfVertex[faces[f * 3 + 2]] = f;
  }

  // Group vertex indices by position AND material. Simplified cells (see
  // simplifyExistingGridMesh) leave several of their 12 template slots unreferenced by any
  // face - those have no owning face to contribute a normal and nothing ever reads their
  // vertexNormals entry, so they're skipped entirely rather than being included with a
  // missing (-1) owning face.
  const posGroups = {};
  for (let vi = 0; vi < vertexCount; vi++) {
    if (faceOfVertex[vi] === -1) continue;
    const i = vi * 3;
    const vx = Math.abs(verts[i]) < 1e-4 ? 0 : verts[i];
    const vy = Math.abs(verts[i + 1]) < 1e-4 ? 0 : verts[i + 1];
    const vz = Math.abs(verts[i + 2]) < 1e-4 ? 0 : verts[i + 2];
    const key = `${vx.toFixed(4)},${vy.toFixed(4)},${vz.toFixed(4)},${materials[vi]}`;
    if (!posGroups[key]) {
      posGroups[key] = [];
    }
    posGroups[key].push(vi);
  }

  for (const key in posGroups) {
    const group = posGroups[key];
    if (group.length < 2) continue;

    let sumX = 0, sumY = 0, sumZ = 0;
    for (let k = 0; k < group.length; k++) {
      const f = faceOfVertex[group[k]];
      sumX += rawNormals[f * 3];
      sumY += rawNormals[f * 3 + 1];
      sumZ += rawNormals[f * 3 + 2];
    }

    const mag = Math.sqrt(sumX * sumX + sumY * sumY + sumZ * sumZ);
    if (mag > 1e-10) {
      const invMag = 1 / mag;
      sumX *= invMag;
      sumY *= invMag;
      sumZ *= invMag;
    }

    for (let k = 0; k < group.length; k++) {
      const idx = group[k] * 3;
      vn[idx] = sumX;
      vn[idx + 1] = sumY;
      vn[idx + 2] = sumZ;
    }
  }

  // Water never shows a lighting gradient, even from its own ripple-jittered center vertex -
  // force every water-tagged vertex normal flat, overriding whatever smoothing (or the base
  // per-face pass, for unreferenced/solo water vertices) produced.
  for (let vi = 0; vi < vertexCount; vi++) {
    if (materials[vi] !== 1 || faceOfVertex[vi] === -1) continue;
    const idx = vi * 3;
    vn[idx] = 0;
    vn[idx + 1] = 1;
    vn[idx + 2] = 0;
  }
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
Terrain.smoothTerrainNormals = smoothTerrainNormals;
