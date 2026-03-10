import GameObject from "../GameObject.js";
import MeshComponent from "../components/MeshComponent.js";

function generateConeMesh(segments, radius, height) {
  const verts = [];
  const faces = [];

  // 1. Generate Vertices
  // Index 0: Apex (Top)
  verts.push(0, height, 0);
  // Index 1: Base Center (Bottom)
  verts.push(0, 0, 0);

  // Indices 2 to (segments + 1): The Ring
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    verts.push(x, 0, z);
  }

  // 2. Generate Faces
  for (let i = 0; i < segments; i++) {
    const current = i + 2;
    const next = i === segments - 1 ? 2 : i + 3;

    // Sides
    faces.push(0, next, current);

    // Base
    faces.push(1, current, next);
  }

  return {
    vertices: new Float32Array(verts),
    faces: new Uint16Array(faces),
  };
}

const coneMesh = generateConeMesh(7, 0.5, 1);

const bounds = new Float32Array(32);

MeshComponent.computeBoundsFlatArray(bounds, 0, coneMesh.vertices);

MeshComponent.computeBoundingSphere(bounds, 28, coneMesh.vertices);

export default function Cone() {
  GameObject.call(this);

  const mesh = new MeshComponent(this);

  mesh.vertices = coneMesh.vertices;
  mesh.faces = coneMesh.faces;
  mesh.bounds = bounds;
  mesh.updateNormals();

  this.addComponent(mesh);
}

Cone.prototype = Object.create(GameObject.prototype);

