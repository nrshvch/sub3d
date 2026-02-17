define(["../Component"], function (Component) {
  function Mesh(gameObject) {
    Component.call(this, gameObject);

    this.colors = new Uint8Array([]);
    this.faceColors = new Uint32Array([]);
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

  p.updateNormals = function () {
    const faces = this.faces;
    const verts = this.vertices;
    const count = faces.length;

    // Initialize or reuse buffer
    if (!this.faceNormals || this.faceNormals.length !== count) {
      this.faceNormals = new Float32Array(count);
    }

    for (let f = 0; f < count; f += 3) {
      const v0 = faces[f] * 3,
        v1 = faces[f + 1] * 3,
        v2 = faces[f + 2] * 3;

      // Edge vectors
      const ax = verts[v1] - verts[v0],
        ay = verts[v1 + 1] - verts[v0 + 1],
        az = verts[v1 + 2] - verts[v0 + 2];
      const bx = verts[v2] - verts[v0],
        by = verts[v2 + 1] - verts[v0 + 1],
        bz = verts[v2 + 2] - verts[v0 + 2];

      // Cross product
      let nx = ay * bz - az * by;
      let ny = az * ax - ax * bz;
      let nz = ax * by - ay * bx;

      // Normalization
      const len = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
      this.faceNormals[f] = nx * len;
      this.faceNormals[f + 1] = ny * len;
      this.faceNormals[f + 2] = nz * len;
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

  Mesh.computeBoundsFlatArray = function (out, vertices) {
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
    out[0] = minX;
    out[1] = minY;
    out[2] = minZ;
    // Corner 1: maxX, minY, minZ
    out[3] = maxX;
    out[4] = minY;
    out[5] = minZ;
    // Corner 2: minX, maxY, minZ
    out[6] = minX;
    out[7] = maxY;
    out[8] = minZ;
    // Corner 3: maxX, maxY, minZ
    out[9] = maxX;
    out[10] = maxY;
    out[11] = minZ;

    // Corner 4: minX, minY, maxZ
    out[12] = minX;
    out[13] = minY;
    out[14] = maxZ;
    // Corner 5: maxX, minY, maxZ
    out[15] = maxX;
    out[16] = minY;
    out[17] = maxZ;
    // Corner 6: minX, maxY, maxZ
    out[18] = minX;
    out[19] = maxY;
    out[20] = maxZ;
    // Corner 7: maxX, maxY, maxZ
    out[21] = maxX;
    out[22] = maxY;
    out[23] = maxZ;

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

  return Mesh;
});
