import scaliaEngine from "sub3d";

const GameObject = scaliaEngine.GameObject;
const MeshComponent = scaliaEngine.MeshComponent;

/**
 * Generates a pine tree mesh consisting of a short 3-sided trunk
 * and two stacked 5-sided pyramids (without base faces).
 * The apex of the lower bigger pyramid goes inside the upper smaller pyramid.
 */
function generatePineMesh() {
  const verts = [];
  const faces = [];

  const trunkRadius = 0.08;
  const trunkHeight = 0.25; // short trunk

  // 1. Trunk Vertices (indices 0, 1, 2 base, 3 apex)
  verts.push(0, 0, trunkRadius); // 0
  verts.push(Math.cos(2 * Math.PI / 3) * trunkRadius, 0, Math.sin(2 * Math.PI / 3) * trunkRadius); // 1
  verts.push(Math.cos(4 * Math.PI / 3) * trunkRadius, 0, Math.sin(4 * Math.PI / 3) * trunkRadius); // 2
  verts.push(0, trunkHeight, 0); // 3

  // Trunk Side Faces
  faces.push(3, 1, 0);
  faces.push(3, 2, 1);
  faces.push(3, 0, 2);

  // 2. Bottom Foliage (Bigger 5-sided pyramid: indices 4 apex, 5-9 base)
  const segments = 5;
  const radius1 = 0.5;
  const yBottom1 = 0.2;
  const yApex1 = 0.7;

  verts.push(0, yApex1, 0); // index 4
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * radius1;
    const z = Math.sin(angle) * radius1;
    verts.push(x, yBottom1, z);
  }

  // Bottom Foliage Side Faces
  // No base faces
  for (let i = 0; i < segments; i++) {
    const current = 5 + i;
    const next = 5 + (i === segments - 1 ? 0 : i + 1);
    faces.push(4, next, current);
  }

  // 3. Top Foliage (Smaller 5-sided pyramid: indices 10 apex, 11-15 base)
  const radius2 = 0.35;
  const yBottom2 = 0.5; // lower than yApex1 (0.7) so bottom apex goes inside
  const yApex2 = 1.0;

  verts.push(0, yApex2, 0); // index 10
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * radius2;
    const z = Math.sin(angle) * radius2;
    verts.push(x, yBottom2, z);
  }

  // Top Foliage Side Faces
  // No base faces
  for (let i = 0; i < segments; i++) {
    const current = 11 + i;
    const next = 11 + (i === segments - 1 ? 0 : i + 1);
    faces.push(10, next, current);
  }

  const vertexCount = verts.length / 3;
  const colors = new Uint32Array(vertexCount);
  colors.fill(0x5c4033, 0, 4); // 4 trunk vertices (0..3)
  colors.fill(0x006400, 4);    // 12 foliage vertices (4..15)

  const vertices = new Float32Array(verts);
  const bounds = new Float32Array(32);
  MeshComponent.computeBoundsFlatArray(bounds, 0, vertices);
  MeshComponent.computeBoundingSphere(bounds, 28, vertices);

  return {
    vertices,
    faces: new Uint16Array(faces),
    colors,
    bounds
  };
}

/**
 * Generates the new ball tree mesh with a 3-sided pyramid trunk
 * and a rounded low-poly UV sphere foliage.
 */
function generateBallTreeMesh() {
  const verts = [];
  const faces = [];

  const trunkRadius = 0.12;
  const trunkHeight = 0.42; // Trunk apex goes inside the sphere foliage

  // 1. Trunk Vertices (indices 0, 1, 2 base, 3 apex)
  verts.push(0, 0, trunkRadius); // 0
  verts.push(Math.cos(2 * Math.PI / 3) * trunkRadius, 0, Math.sin(2 * Math.PI / 3) * trunkRadius); // 1
  verts.push(Math.cos(4 * Math.PI / 3) * trunkRadius, 0, Math.sin(4 * Math.PI / 3) * trunkRadius); // 2
  verts.push(0, trunkHeight, 0); // 3

  // Trunk Faces
  faces.push(0, 2, 1);
  faces.push(3, 1, 0);
  faces.push(3, 2, 1);
  faces.push(3, 0, 2);

  // 2. Sphere Foliage Vertices (from index 4 to 4 + 2 + (rings-1)*segments)
  const segments = 4;
  const rings = 2;
  const centerY = 0.62;
  const radius = 0.52;

  // Top vertex
  verts.push(0, centerY + radius, 0); // index 4
  // Bottom vertex
  verts.push(0, centerY - radius, 0); // index 5

  // Ring vertices
  const firstRingStart = 6;
  for (let r = 1; r < rings; r++) {
    const phi = (r / rings) * Math.PI;
    const yVal = centerY + radius * Math.cos(phi);
    const ringRadius = radius * Math.sin(phi);
    for (let s = 0; s < segments; s++) {
      const theta = (s / segments) * 2 * Math.PI;
      verts.push(ringRadius * Math.cos(theta), yVal, ringRadius * Math.sin(theta));
    }
  }

  // 3. Sphere Foliage Faces
  // Top cap faces
  for (let s = 0; s < segments; s++) {
    const current = firstRingStart + s;
    const next = firstRingStart + (s + 1) % segments;
    faces.push(4, next, current);
  }

  // Bottom cap faces
  const lastRingStart = firstRingStart + (rings - 2) * segments;
  for (let s = 0; s < segments; s++) {
    const current = lastRingStart + s;
    const next = lastRingStart + (s + 1) % segments;
    faces.push(5, current, next);
  }

  // Intermediate quad ring faces
  for (let r = 1; r < rings - 1; r++) {
    const ring1 = firstRingStart + (r - 1) * segments;
    const ring2 = firstRingStart + r * segments;
    for (let s = 0; s < segments; s++) {
      const nextS = (s + 1) % segments;
      
      const tl = ring1 + s;
      const tr = ring1 + nextS;
      const bl = ring2 + s;
      const br = ring2 + nextS;

      faces.push(tl, tr, br);
      faces.push(tl, br, bl);
    }
  }

  const vertexCount = verts.length / 3;
  const colors = new Uint32Array(vertexCount);
  colors.fill(0x5c4033, 0, 4); // 4 trunk vertices (0..3)
  colors.fill(0x006400, 4);    // foliage vertices (4..N)

  const vertices = new Float32Array(verts);
  const bounds = new Float32Array(32);
  MeshComponent.computeBoundsFlatArray(bounds, 0, vertices);
  MeshComponent.computeBoundingSphere(bounds, 28, vertices);

  return {
    vertices,
    faces: new Uint16Array(faces),
    colors,
    bounds
  };
}

// Generate shared templates once at startup
const coneMesh = generatePineMesh();
const ballMesh = generateBallTreeMesh();

/**
 * Tree GameObject representing procedural low-poly foliage models.
 * @param {string} type - 'cone' (pine) or 'ball' (lollipop) style
 * @constructor
 */
export default function Tree(type = 'cone') {
  GameObject.call(this);

  const mesh = new MeshComponent(this);
  const data = type === 'ball' ? ballMesh : coneMesh;

  mesh.vertices = data.vertices;
  mesh.faces = data.faces;
  mesh.bounds = data.bounds;
  mesh.colors = data.colors;
  mesh.updateNormals();

  this.addComponent(mesh);
}

Tree.prototype = Object.create(GameObject.prototype);

/**
 * Dynamically updates the tree geometry to reuse pooled instances.
 * @param {string} type - 'cone' or 'ball' style
 */
Tree.prototype.setType = function(type) {
  const data = type === 'ball' ? ballMesh : coneMesh;
  const mesh = this.meshRenderer;

  mesh.vertices = data.vertices;
  mesh.faces = data.faces;
  mesh.bounds = data.bounds;
  mesh.colors = data.colors;
  mesh.updateNormals();
};
