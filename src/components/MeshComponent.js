import Component from "../Component.js";

export default function Mesh() {
  Component.call(this);

  this.colors = new Uint8Array([0, 0, 255]);
  this.faceColors = new Uint32Array([0]);
}

var p = (Mesh.prototype = Object.create(Component.prototype));

p.constructor = Mesh;

p.layer = 0;

p.vertices = null;

p.faces = null;

p.pivot = [0, 0, 0];

p.color = null;

p.colors = null;

p.faceColors = null;

p.faceNormals = null;

p.vertexNormals = null;

p.bounds = null;

/**
 * Generates face normals for any indexed triangle mesh.
 * @param {number} winding - Set to 1 for CCW (Standard), -1 for CW.
 */
p.updateNormals = function (winding = 1) {
  const faces = this.faces;
  const verts = this.vertices;
  const count = faces.length;

  // Initialize or reuse buffer
  if (!this.faceNormals || this.faceNormals.length !== count) {
    this.faceNormals = new Float32Array(count);
  }

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
      // Small epsilon check
      const invMag = 1 / mag;
      this.faceNormals[i] = nx * invMag;
      this.faceNormals[i + 1] = ny * invMag;
      this.faceNormals[i + 2] = nz * invMag;
    }
  }
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

