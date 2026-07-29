import GameObject from "../GameObject.js";
import MeshComponent from "../components/MeshComponent.js";

function generateBallMesh(rings, sectors, radius) {
  const verts = [];
  const uvs = [];
  const faces = [];
  const lookup = {};

  function getVertexIndex(x, y, z, u, v) {
    const key = `${x.toFixed(5)},${y.toFixed(5)},${z.toFixed(5)}`;
    if (lookup[key] !== undefined) return lookup[key];

    const index = verts.length / 3;
    verts.push(x, y, z);
    uvs.push(u, v);
    lookup[key] = index;
    return index;
  }

  // 1. Build the grid of shared indices
  const grid = [];
  for (let r = 0; r <= rings; r++) {
    const row = [];
    const phi = (r * Math.PI) / rings;
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);

    for (let s = 0; s <= sectors; s++) {
      const theta = (s * 2 * Math.PI) / sectors;
      const x = Math.cos(theta) * sinPhi * radius;
      const y = cosPhi * radius;
      const z = Math.sin(theta) * sinPhi * radius;

      const u = s / sectors;
      const v = r / rings;

      row.push(getVertexIndex(x, y, z, u, v));
    }
    grid.push(row);
  }

  // 2. Generate Faces using skipping logic
  for (let r = 0; r < rings; r++) {
    for (let s = 0; s < sectors; s++) {
      const first = grid[r][s];
      const firstNext = grid[r][s + 1];
      const second = grid[r + 1][s];
      const secondNext = grid[r + 1][s + 1];

      // Triangle 1: Skip North Pole
      if (r !== 0) {
        faces.push(first, firstNext, second);
      }

      // Triangle 2: Skip South Pole
      if (r !== rings - 1) {
        faces.push(second, firstNext, secondNext);
      }
    }
  }

  return {
    vertices: new Float32Array(verts),
    uvs: new Float32Array(uvs),
    faces: new Uint16Array(faces),
    colors: new Uint32Array(verts.length / 3).fill(0x0000FF),
  };
}



// Sphere-specific pass on top of MeshComponent#updateNormals: the UV seam (s=0 vs s=sectors)
// and the poles reuse the same position but can't share a vertex index (the seam needs two UVs;
// the south pole's index-sharing is unreliable since sin(PI) isn't exactly 0), so their normals
// stay unblended after the base index-only accumulation. Average them back together by position.
function weldSeamNormals(mesh) {
  const verts = mesh.vertices;
  const vn = mesh.vertexNormals;
  const posGroups = {};

  for (let i = 0; i < verts.length; i += 3) {
    const vx = Math.abs(verts[i]) < 1e-4 ? 0 : verts[i];
    const vy = Math.abs(verts[i + 1]) < 1e-4 ? 0 : verts[i + 1];
    const vz = Math.abs(verts[i + 2]) < 1e-4 ? 0 : verts[i + 2];
    const key = `${vx.toFixed(4)},${vy.toFixed(4)},${vz.toFixed(4)}`;
    if (!posGroups[key]) {
      posGroups[key] = [];
    }
    posGroups[key].push(i);
  }

  for (const key in posGroups) {
    const indices = posGroups[key];
    if (indices.length < 2) continue;

    let sumX = 0, sumY = 0, sumZ = 0;
    for (let k = 0; k < indices.length; k++) {
      const idx = indices[k];
      sumX += vn[idx];
      sumY += vn[idx + 1];
      sumZ += vn[idx + 2];
    }

    const mag = Math.sqrt(sumX * sumX + sumY * sumY + sumZ * sumZ);
    if (mag > 1e-10) {
      const invMag = 1 / mag;
      sumX *= invMag;
      sumY *= invMag;
      sumZ *= invMag;
    }

    for (let k = 0; k < indices.length; k++) {
      const idx = indices[k];
      vn[idx] = sumX;
      vn[idx + 1] = sumY;
      vn[idx + 2] = sumZ;
    }
  }
}

function generateBall(rings = 8, sectors = 8, radius = 8) {
  const ballMesh = generateBallMesh(rings, sectors, radius);

  const bounds = new Float32Array(32);

  MeshComponent.computeBoundsFlatArray(bounds, 0, ballMesh.vertices);

  MeshComponent.computeBoundingSphere(bounds, 28, ballMesh.vertices);

  return [
    ballMesh.vertices,
    ballMesh.faces,
    ballMesh.uvs,
    bounds,
    ballMesh.colors,
  ]
}

function Ball(vertices, faces, uvs, bounds, colors) {
  GameObject.call(this);

  const mesh = new MeshComponent(this);
  mesh.vertices = vertices;
  mesh.faces = faces;
  mesh.uvs = uvs;
  mesh.colors = colors || new Uint32Array(vertices.length / 3).fill(0x0000FF);
  mesh.bounds = bounds;
  mesh.updateNormals();
  weldSeamNormals(mesh);

  this.addComponent(mesh);
}

Ball.prototype = Object.create(GameObject.prototype);

Ball.generate = generateBall;

export default Ball;
