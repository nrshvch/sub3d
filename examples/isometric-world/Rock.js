import scaliaEngine from "sub3d";

const GameObject = scaliaEngine.GameObject;
const MeshComponent = scaliaEngine.MeshComponent;

/**
 * Generates a pregenerated low-poly rock mesh with exactly 9 faces.
 * Has a flat base (at y = 0) with 5 unequally distanced perimeter points,
 * a faceted top surface with 3 vertices, and no bottom/base faces.
 */
function generateRockMesh() {
  const verts = [];
  const faces = [];

  // 1. Flat Base vertices (y = 0.0) - 5 unequally distanced points
  verts.push(0.31, 0.0, 0.03);   // Index 0
  verts.push(0.07, 0.0, 0.29);   // Index 1
  verts.push(-0.26, 0.0, 0.16);  // Index 2
  verts.push(-0.21, 0.0, -0.23); // Index 3
  verts.push(0.06, 0.0, -0.33);  // Index 4

  // 2. Top surface vertices (y > 0.0) - 3 vertices creating surface facets
  verts.push(0.12, 0.32, 0.09);  // Index 5
  verts.push(-0.08, 0.35, 0.11); // Index 6
  verts.push(0.01, 0.28, -0.12); // Index 7

  // 3. Generate faces (9 triangles total)
  // Top surface face (1 face) - wound CCW facing UP
  faces.push(5, 7, 6);

  // Side faces connecting base perimeter to top surface (8 faces) - wound CCW facing OUT
  faces.push(0, 5, 1);
  faces.push(1, 5, 6);
  faces.push(1, 6, 2);
  faces.push(2, 6, 3);
  faces.push(3, 6, 7);
  faces.push(3, 7, 4);
  faces.push(4, 7, 5);
  faces.push(4, 5, 0);

  const vertices = new Float32Array(verts);
  const bounds = new Float32Array(32);
  MeshComponent.computeBoundsFlatArray(bounds, 0, vertices);
  MeshComponent.computeBoundingSphere(bounds, 28, vertices);

  return {
    vertices,
    faces: new Uint16Array(faces),
    colors: new Uint32Array(9).fill(0x777777),
    bounds
  };
}

const rockMesh = generateRockMesh();

/**
 * Rock GameObject representing low-poly rocks.
 * @constructor
 */
export default function Rock() {
  GameObject.call(this);

  const mesh = new MeshComponent(this);
  mesh.vertices = rockMesh.vertices;
  mesh.faces = rockMesh.faces;
  mesh.bounds = rockMesh.bounds;
  mesh.colors = rockMesh.colors;
  mesh.updateNormals();

  this.addComponent(mesh);
}

Rock.prototype = Object.create(GameObject.prototype);
