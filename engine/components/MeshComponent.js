define(["../Component", "../lib/BoundingBox"], function (
  Component,
  BoundingBox,
) {
  //TODO: review path of bbox
  function Mesh(gameObject) {
    Component.call(this, gameObject);
  }

  var p = (Mesh.prototype = Object.create(Component.prototype));

  p.constructor = Mesh;

  p.layer = 0;

  p.vertices = null;

  p.faces = null;

  p.pivot = [0, 0, 0];

  p.color = null;

  p.faceNormals = null;

  p.vertexNormals = null;

  p.bounds = null;

  p.ComputeNormals = function () {
    // this.bounds.Calculate(this.vertices);

    this.ComputeFaceNormals();
  };

  p.ComputeFaceNormals = function () {
    var vA,
      vB,
      vC,
      face,
      cb = [],
      ab = [];

    if (this.faceNormals === null) this.faceNormals = [];

    for (var f = 0, fl = this.faces.length; f < fl; f++) {
      face = this.faces[f];

      vA = this.vertices[face[0]];
      vB = this.vertices[face[1]];
      vC = this.vertices[face[2]];

      scaliaEngine.glMatrix.vec3.subtract(cb, vC, vB);
      scaliaEngine.glMatrix.vec3.subtract(ab, vA, vB);
      scaliaEngine.glMatrix.vec3.cross(cb, cb, ab);
      scaliaEngine.glMatrix.vec3.normalize(cb, cb);

      this.faceNormals[f] = cb;
    }
  };

  p.ComputeVertexNormals = function () {
    //TODO implement when needed
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
