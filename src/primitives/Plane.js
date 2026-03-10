import GameObject from "../GameObject.js";
import MeshComponent from "../components/MeshComponent.js";

function generatePlaneMesh(width, height, segments) {
  const verts = [];
  const faces = [];

  const wH = width / 2;
  const hH = height / 2;
  const segW = width / segments;
  const segH = height / segments;

  // 1. Generate Vertices (row by row)
  for (let iy = 0; iy <= segments; iy++) {
    const z = iy * segH - hH; // Mapping Y segment to Z axis for a flat plane
    for (let ix = 0; ix <= segments; ix++) {
      const x = ix * segW - wH;
      verts.push(x, 0, z);
    }
  }

  // 2. Generate Faces
  const row = segments + 1;
  for (let iy = 0; iy < segments; iy++) {
    for (let ix = 0; ix < segments; ix++) {
      // Calculate indices for the current quad
      const a = iy * row + ix; // Top-left
      const b = iy * row + (ix + 1); // Top-right
      const c = (iy + 1) * row + ix; // Bottom-left
      const d = (iy + 1) * row + (ix + 1); // Bottom-right

      // Triangle 1: Top-left, Top-right, Bottom-left
      faces.push(a, c, b);
      // Triangle 2: Bottom-right, Bottom-left, Top-right
      faces.push(d, b, c);
    }
  }

  return {
    vertices: new Float32Array(verts),
    faces: new Uint16Array(faces),
  };
}

const planeMesh = generatePlaneMesh(1, 1, 1);

const bounds = new Float32Array(32);

MeshComponent.computeBoundsFlatArray(bounds, 0, planeMesh.vertices);

MeshComponent.computeBoundingSphere(bounds, 28, planeMesh.vertices);

export default function Plane() {
  GameObject.call(this);

  const mesh = new MeshComponent(this);

  mesh.faces = planeMesh.faces;
  mesh.vertices = planeMesh.vertices;
  mesh.bounds = bounds;
  mesh.updateNormals();

  this.addComponent(mesh);
}

Plane.prototype = Object.create(GameObject.prototype);

