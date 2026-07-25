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

  this.addComponent(mesh);
}

Ball.prototype = Object.create(GameObject.prototype);

Ball.generate = generateBall;

export default Ball;
