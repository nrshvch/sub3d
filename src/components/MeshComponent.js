import Component from "../Component.js";

export default function Mesh() {
  Component.call(this);

  this.depthBias = 0;
}

var p = (Mesh.prototype = Object.create(Component.prototype));

p.constructor = Mesh;

/**
 * Constant depth offset added to all faces of the mesh.
 * @type {number}
 */
p.depthBias = 0;

p.layer = 0;

p.vertices = null;

p.faces = null;

p.pivot = [0, 0, 0];

p.color = null;

p.colors = null;

p.uvs = null;

// TODO:
// if/when UV animation lands, add a `uvVersion` counter here (bumped whenever `uvs`
// is mutated) so Canvas2dRenderer can cache the per-face affine texture-mapping terms
// (delta, invDelta, and the UV-difference/cross terms in the case 2/5 shader blocks) and
// only recompute them when this mesh's UVs actually change, instead of every frame.
p._texture = null;

p.textureImage = null;

// Lazily-built CanvasPattern wrapping textureImage, so textured faces can be drawn as ordinary
// pattern fills rather than a clip + drawImage each. Filled in by the texture shader on first use
// and dropped here whenever the texture changes; nothing outside the renderer should read it.
p.texturePattern = null;

/**
 * Selects which shader draws this mesh's faces: 0 flat, 1 texture, 2 emissive,
 * 4 smooth. Each is dispatched through a fixed switch case straight to its src/shaders/*.js
 * implementation, kept monomorphic for the JIT regardless of how many other keys are in use
 * elsewhere. Wireframe rendering is unrelated to this property entirely - it's a
 * renderer/viewport-wide flag (see Canvas2dViewport#wireframe), not a shader, and doesn't
 * occupy a shaderType value at all.
 *
 * 5+ are consumer shaders: call registerShader() once per shader function (see
 * src/shaders/shaderRegistry.js for the registration API and the full positional argument
 * contract every shader must implement) and set this to the returned key. Register once, reuse
 * the key across every mesh that should use it - meshes never hold a live function reference,
 * just the number.
 * @type {number}
 */
p.shaderType = 0;

Object.defineProperty(p, "texture", {
  get: function () {
    return this._texture;
  },
  set: function (value) {
    if (this._texture !== value) {
      this._texture = value;
      this.texturePattern = null;
      if (value) {
        if (!this.textureImage) {
          this.textureImage = new Image();
        }
        this.textureImage.src = value;
      } else {
        this.textureImage = null;
      }
    }
  },
});

p.faceNormals = null;

p.vertexNormals = null;

p.bounds = null;

/**
 * Canonical-position vertex map, only computed by calling updateWeldMap() - weldMap[i] is the lowest raw vertex index
 * sharing i's practical position, so two "split" vertices (distinct buffer indices, placed at the same physical spot)
 * resolve to the same id.
 * @type {Uint32Array|null}
 */
p.weldMap = null;

/**
 * Face adjacency over welded vertex identities, only computed by calling updateAdjacency().
 *
 * `adjTri[3 * t + e]` is the triangle sharing edge `e` of triangle `t`, or -1 where that edge is a
 * boundary; `adjEdge[3 * t + e]` says which of the neighbour's three edges it is. Edge `e` runs
 * from the triangle's vertex `e` to its vertex `(e + 1) % 3`.
 *
 * Static per mesh - the geometry does not change between frames, only which faces survive culling -
 * so it is built once and reused by every pass. Keyed on weldMap identities, without which a
 * hard-edge mesh finds no neighbours at all.
 *
 * @type {Int32Array|null}
 */
p.adjTri = null;
p.adjEdge = null;

/**
 * Generates both face and vertex normals.
 * Uses area-weighting for vertex normals to provide smoother shading.
 * @param {number} winding - Set to 1 for CCW (Standard), -1 for CW.
 */
p.updateNormals = function (winding = 1) {
  const faces = this.faces;
  const verts = this.vertices;
  const count = faces.length;

  // Initialize or reuse buffers
  if (!this.faceNormals || this.faceNormals.length !== count) {
    this.faceNormals = new Float32Array(count);
  }

  if (!this.vertexNormals || this.vertexNormals.length !== verts.length) {
    this.vertexNormals = new Float32Array(verts.length);
  } else {
    this.vertexNormals.fill(0); // Reset for re-calculation
  }

  // Calculate Face Normals and Accumulate for Vertices
  for (let i = 0; i < count; i += 3) {
    const v0 = faces[i] * 3,
      v1 = faces[i + 1] * 3,
      v2 = faces[i + 2] * 3;

    // Edge vectors
    const ax = verts[v1] - verts[v0],
      ay = verts[v1 + 1] - verts[v0 + 1],
      az = verts[v1 + 2] - verts[v0 + 2];
    const bx = verts[v2] - verts[v0],
      by = verts[v2 + 1] - verts[v0 + 1],
      bz = verts[v2 + 2] - verts[v0 + 2];

    // Standard Cross Product (E1 x E2)
    let nx = (ay * bz - az * by) * winding;
    let ny = (az * bx - ax * bz) * winding;
    let nz = (ax * by - ay * bx) * winding;

    const mag = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (mag > 1e-10) {
      const invMag = 1 / mag;

      // Store Normalized Face Normal
      this.faceNormals[i] = nx * invMag;
      this.faceNormals[i + 1] = ny * invMag;
      this.faceNormals[i + 2] = nz * invMag;

      // Accumulate RAW Normal (Area-Weighted) into Vertices
      this.vertexNormals[v0] += nx;
      this.vertexNormals[v0 + 1] += ny;
      this.vertexNormals[v0 + 2] += nz;

      this.vertexNormals[v1] += nx;
      this.vertexNormals[v1 + 1] += ny;
      this.vertexNormals[v1 + 2] += nz;

      this.vertexNormals[v2] += nx;
      this.vertexNormals[v2 + 1] += ny;
      this.vertexNormals[v2 + 2] += nz;
    }
  }

  // Normalize Vertex Normals
  for (let i = 0; i < this.vertexNormals.length; i += 3) {
    const vnx = this.vertexNormals[i];
    const vny = this.vertexNormals[i + 1];
    const vnz = this.vertexNormals[i + 2];

    const vmag = Math.sqrt(vnx * vnx + vny * vny + vnz * vnz);
    if (vmag > 1e-10) {
      const vInvMag = 1 / vmag;
      this.vertexNormals[i] *= vInvMag;
      this.vertexNormals[i + 1] *= vInvMag;
      this.vertexNormals[i + 2] *= vInvMag;
    } else {
      // Fallback for isolated/broken vertices (Up vector)
      this.vertexNormals[i + 1] = 1.0;
    }
  }
};

/**
 * Computes weldMap from the mesh's current vertex positions - see
 * weldMap's own doc comment above.
 * Call explicitly after vertices are finalized, and again any time those positions change.
 * @param {number} [epsilon].
 */
p.updateWeldMap = function (epsilon) {
  this.weldMap = Mesh.computeWeldMap(this.vertices, this.weldMap, epsilon);
};

/**
 * Computes adjTri/adjEdge from the mesh's current faces - see their doc comment above.
 *
 * Depends on weldMap, so call it after updateWeldMap() and again whenever the faces change. The
 * renderer builds it lazily on first sight, so a mesh that never changes needs no call at all.
 */
p.updateAdjacency = function () {
  const a = Mesh.computeAdjacency(
    this.faces,
    this.weldMap,
    this.adjTri,
    this.adjEdge,
  );
  this.adjTri = a.adjTri;
  this.adjEdge = a.adjEdge;
  return a;
};

p.setGameObject = function (gameObject) {
  Component.prototype.setGameObject.call(this, gameObject);
  gameObject.meshRenderer = this;
};

p.unsetGameObject = function () {
  this.gameObject.meshRenderer = undefined;
  Component.prototype.unsetGameObject.call(this);
};

/**
 * Computes the Normal Matrix (Inverse-Transpose of the 3x3 World Matrix).
 * Industry standard for correct lighting on non-uniformly scaled objects.
 * @param {Float32Array} out - Destination 3x3 matrix (Float32Array(9))
 * @param {Float32Array} m - Source 4x4 World Matrix
 */
Mesh.computeNormalMatrix = function (out, m) {
  // 1. Extract the 3x3 part from the column-major 4x4 matrix 'm'
  const a00 = m[0],
    a01 = m[1],
    a02 = m[2];
  const a10 = m[4],
    a11 = m[5],
    a12 = m[6];
  const a20 = m[8],
    a21 = m[9],
    a22 = m[10];

  // 2. Calculate cofactors (minors with signs)
  const c00 = a11 * a22 - a12 * a21;
  const c01 = -(a10 * a22 - a12 * a20);
  const c02 = a10 * a21 - a11 * a20;

  // 3. Compute the determinant using the first column
  const det = a00 * c00 + a01 * c01 + a02 * c02;

  if (Math.abs(det) < 0.000001) return null; // Handle singular matrix
  const invDet = 1.0 / det;

  /**
   * 4. Industry Standard Mapping:
   * To get the Transpose of the Inverse, we calculate the Adjugate
   * but we DO NOT transpose it at the end (because the transpose
   * of the adjugate IS the inverse direction we need).
   */
  out[0] = c00 * invDet;
  out[1] = c01 * invDet;
  out[2] = c02 * invDet;

  out[3] = -(a01 * a22 - a02 * a21) * invDet;
  out[4] = (a00 * a22 - a02 * a20) * invDet;
  out[5] = -(a00 * a21 - a01 * a20) * invDet;

  out[6] = (a01 * a12 - a02 * a11) * invDet;
  out[7] = -(a00 * a12 - a02 * a10) * invDet;
  out[8] = (a00 * a11 - a01 * a10) * invDet;
};

Mesh.computeBoundsFlatArray = function (out, offset, vertices) {
  if (vertices.length === 0) return;

  // 1. Initialize with the first vertex
  var minX = vertices[0],
    maxX = minX;
  var minY = vertices[1],
    maxY = minY;
  var minZ = vertices[2],
    maxZ = minZ;

  // 2. Loop through the flat array (stepping by 3)
  for (var i = 3; i < vertices.length; i += 3) {
    var vx = vertices[i];
    var vy = vertices[i + 1];
    var vz = vertices[i + 2];

    if (vx < minX) minX = vx;
    else if (vx > maxX) maxX = vx;
    if (vy < minY) minY = vy;
    else if (vy > maxY) maxY = vy;
    if (vz < minZ) minZ = vz;
    else if (vz > maxZ) maxZ = vz;
  }

  // 3. Fill the 8 corners of the AABB
  // Corner 0: minX, minY, minZ
  out[offset] = minX;
  out[offset + 1] = minY;
  out[offset + 2] = minZ;
  // Corner 1: maxX, minY, minZ
  out[offset + 3] = maxX;
  out[offset + 4] = minY;
  out[offset + 5] = minZ;
  // Corner 2: minX, maxY, minZ
  out[offset + 6] = minX;
  out[offset + 7] = maxY;
  out[offset + 8] = minZ;
  // Corner 3: maxX, maxY, minZ
  out[offset + 9] = maxX;
  out[offset + 10] = maxY;
  out[offset + 11] = minZ;

  // Corner 4: minX, minY, maxZ
  out[offset + 12] = minX;
  out[offset + 13] = minY;
  out[offset + 14] = maxZ;
  // Corner 5: maxX, minY, maxZ
  out[offset + 15] = maxX;
  out[offset + 16] = minY;
  out[offset + 17] = maxZ;
  // Corner 6: minX, maxY, maxZ
  out[offset + 18] = minX;
  out[offset + 19] = maxY;
  out[offset + 20] = maxZ;
  // Corner 7: maxX, maxY, maxZ
  out[offset + 21] = maxX;
  out[offset + 22] = maxY;
  out[offset + 23] = maxZ;

  return out;
};

/**
 * Generates a bounding sphere from a vertex array.
 * Writes [cx, cy, cz, radius] into the destination buffer.
 */
Mesh.computeBoundingSphere = function (out, offset, vertices) {
  let minX = Infinity,
    minY = Infinity,
    minZ = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity,
    maxZ = -Infinity;

  // 1. Find the AABB bounds first (Fastest way to get a center)
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i],
      y = vertices[i + 1],
      z = vertices[i + 2];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    if (z < minZ) minZ = z;
    if (z > maxZ) maxZ = z;
  }

  // 2. Calculate Center
  const cx = (minX + maxX) * 0.5;
  const cy = (minY + maxY) * 0.5;
  const cz = (minZ + maxZ) * 0.5;

  // 3. Calculate Radius
  // (The distance from center to the furthest AABB corner)
  const dx = maxX - cx;
  const dy = maxY - cy;
  const dz = maxZ - cz;
  const radius = Math.sqrt(dx * dx + dy * dy + dz * dz);

  // 4. Write to persistent Float32Array
  out[offset] = cx;
  out[offset + 1] = cy;
  out[offset + 2] = cz;
  out[offset + 3] = radius;
};

/**
 * Groups vertices by practical position and returns a Uint32Array where result[i] is the lowest raw vertex index
 * sharing i's position - i.e. a canonical id two "split" vertices at the same spot both resolve
 * to.
 *
 * @param {Float32Array} vertices - [x, y, z, x, y, z, ...]
 * @param {Uint32Array|null} [out] - Reused if its length already matches the vertex count (same
 *   reuse-if-same-size convention as updateNormals()), else a fresh array is allocated.
 * @param {number} [epsilon] - Positions within this of zero snap to exactly zero before
 *   rounding, so e.g. a pole vertex's sin(PI) (not quite 0) still keys the same as an exact 0.
 * @returns {Uint32Array}
 */
Mesh.computeWeldMap = function (vertices, out, epsilon = 1e-4) {
  const vertexCount = (vertices.length / 3) | 0;
  const weldMap =
    out && out.length === vertexCount ? out : new Uint32Array(vertexCount);
  const positionGroups = {};

  for (let i = 0; i < vertexCount; i++) {
    const o = i * 3;
    let vx = vertices[o];
    let vy = vertices[o + 1];
    let vz = vertices[o + 2];
    if (Math.abs(vx) < epsilon) vx = 0;
    if (Math.abs(vy) < epsilon) vy = 0;
    if (Math.abs(vz) < epsilon) vz = 0;

    const key = vx.toFixed(4) + "," + vy.toFixed(4) + "," + vz.toFixed(4);
    const canonical = positionGroups[key];
    if (canonical === undefined) {
      positionGroups[key] = i;
      weldMap[i] = i;
    } else {
      weldMap[i] = canonical;
    }
  }

  return weldMap;
};

/**
 * Builds the face adjacency table described on [[adjTri]].
 *
 * Two triangles are neighbours when one presents an edge the other presents reversed - the same
 * test the runtime welder makes, and sound for the same reason: every front-facing triangle
 * survives one backface cull, so they all carry the same winding.
 *
 * A directed edge seen twice means non-manifold input (two co-oriented faces on one edge). The
 * first occurrence keeps the pairing and the later one is left as boundary, which costs a missed
 * merge and never a wrong one.
 *
 * @param {Uint32Array} faces flat [i0, i1, i2, ...] triangle indices
 * @param {Uint32Array|null} weldMap from computeWeldMap(); raw indices are used when null, which is
 *   correct for a mesh that already shares one index per position
 * @param {Int32Array|null} [outTri] reused when already the right length
 * @param {Int32Array|null} [outEdge]
 * @returns {{adjTri: Int32Array, adjEdge: Int32Array, boundaryEdges: number}}
 */
Mesh.computeAdjacency = function (faces, weldMap, outTri, outEdge) {
  const triCount = (faces.length / 3) | 0;
  const n = triCount * 3;
  const adjTri = outTri && outTri.length === n ? outTri : new Int32Array(n);
  const adjEdge = outEdge && outEdge.length === n ? outEdge : new Int32Array(n);
  adjTri.fill(-1);
  adjEdge.fill(-1);

  // Directed edge -> the slot 3t+e that presented it. The key packs both endpoints into one
  // double, exact while vertex indices stay under 2^21 - far past any mesh this renderer sorts.
  // A Map is fine here: this runs once per mesh, never per frame.
  const seen = new Map();
  for (let t = 0; t < triCount; t++) {
    for (let e = 0; e < 3; e++) {
      const ra = faces[t * 3 + e];
      const rb = faces[t * 3 + ((e + 1) % 3)];
      const a = weldMap ? weldMap[ra] : ra;
      const b = weldMap ? weldMap[rb] : rb;
      if (a === b) continue; // degenerate edge - both ends weld together, cannot pair
      const slot = t * 3 + e;
      const mate = seen.get(b * 4294967296 + a); // this edge, reversed
      const mateTri = mate === undefined ? -1 : (mate / 3) | 0;
      // mateTri === t is a triangle two of whose vertices weld together, so its own edges reverse
      // each other. Pairing it with itself would let the welder merge a face into its own ring;
      // leave it as boundary instead, since a face with zero area draws nothing anyway.
      if (mate !== undefined && adjTri[mate] === -1 && mateTri !== t) {
        adjTri[slot] = mateTri;
        adjEdge[slot] = mate - mateTri * 3;
        adjTri[mate] = t;
        adjEdge[mate] = e;
      }
      if (!seen.has(a * 4294967296 + b)) seen.set(a * 4294967296 + b, slot);
    }
  }

  let boundaryEdges = 0;
  for (let i = 0; i < n; i++) if (adjTri[i] === -1) boundaryEdges++;
  return { adjTri, adjEdge, boundaryEdges };
};
