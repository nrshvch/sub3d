import GameObject from "../GameObject.js";
import MeshComponent from "../components/MeshComponent.js";

function generateBallMesh(rings, sectors, radius) {
  const verts = [];
  const faces = [];
  const lookup = {};

  function getVertexIndex(x, y, z) {
    const key = `${x.toFixed(5)},${y.toFixed(5)},${z.toFixed(5)}`;
    if (lookup[key] !== undefined) return lookup[key];

    const index = verts.length / 3;
    verts.push(x, y, z);
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
      row.push(getVertexIndex(x, y, z));
    }
    grid.push(row);
  }

  // 2. Generate Faces using your original skipping logic
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
    faces: new Uint16Array(faces),
  };
}

const ballMesh = generateBallMesh(16, 16, 1);

const bounds = new Float32Array(32);

MeshComponent.computeBoundsFlatArray(bounds, 0, ballMesh.vertices);

MeshComponent.computeBoundingSphere(bounds, 28, ballMesh.vertices);

function Ball() {
  GameObject.call(this);

  const mesh = new MeshComponent(this);
  mesh.vertices = ballMesh.vertices;
  mesh.faces = ballMesh.faces;
  mesh.bounds = bounds;
  mesh.updateNormals();

  this.addComponent(mesh);
}

Ball.prototype = Object.create(GameObject.prototype);

export default Ball;