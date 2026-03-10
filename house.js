import GameObject from "./src/GameObject.js";
import MeshComponent from "./src/components/MeshComponent.js";

function generateApartmentMesh() {
  const verts = [];
  const faces = [];
  const faceColors = [];
  const lookup = {};

  const palette = [
    70,
    70,
    70, // 0: Grey (Basement/Stairs)
    140,
    50,
    50, // 3: Brick Red
    40,
    40,
    45, // 6: Roof & Guardband
    100,
    150,
    200, // 9: Windows
    50,
    40,
    30, // 12: Door
  ];

  function getVertexIndex(x, y, z) {
    const key = `${x.toFixed(5)},${y.toFixed(5)},${z.toFixed(5)}`;
    if (lookup[key] !== undefined) return lookup[key];
    const index = verts.length / 3;
    verts.push(x, y, z);
    lookup[key] = index;
    return index;
  }

  function addQuad(p1, p2, p3, p4, colorIdx) {
    const v1 = getVertexIndex(...p1);
    const v2 = getVertexIndex(...p2);
    const v3 = getVertexIndex(...p3);
    const v4 = getVertexIndex(...p4);
    // Triangle 1
    faces.push(v1, v2, v3);
    faceColors.push(colorIdx);
    // Triangle 2
    faces.push(v1, v3, v4);
    faceColors.push(colorIdx);
  }

  const b = 0.2; // Basement height
  const h = 2.0; // Building height

  // --- 1. BASEMENT (Grey - Fixed Winding for all sides) ---
  addQuad([-0.5, 0, 0.5], [0.5, 0, 0.5], [0.5, b, 0.5], [-0.5, b, 0.5], 0); // Front
  addQuad(
    [0.5, 0, -0.5],
    [-0.5, 0, -0.5],
    [-0.5, b, -0.5],
    [0.5, b, -0.5],
    0,
  ); // Back
  addQuad(
    [-0.5, 0, -0.5],
    [-0.5, 0, 0.5],
    [-0.5, b, 0.5],
    [-0.5, b, -0.5],
    0,
  ); // Left
  addQuad([0.5, 0, 0.5], [0.5, 0, -0.5], [0.5, b, -0.5], [0.5, b, 0.5], 0); // Right

  // --- 2. MAIN WALLS (Brick - Fixed Winding) ---
  addQuad([-0.5, b, 0.5], [0.5, b, 0.5], [0.5, h, 0.5], [-0.5, h, 0.5], 3); // Front
  addQuad(
    [0.5, b, -0.5],
    [-0.5, b, -0.5],
    [-0.5, h, -0.5],
    [0.5, h, -0.5],
    3,
  ); // Back
  addQuad(
    [-0.5, b, -0.5],
    [-0.5, b, 0.5],
    [-0.5, h, 0.5],
    [-0.5, h, -0.5],
    3,
  ); // Left
  addQuad([0.5, b, 0.5], [0.5, b, -0.5], [0.5, h, -0.5], [0.5, h, 0.5], 3); // Right

  // --- 3. ROOF TOP & LIPS (Dark) ---
  // Top surface (CCW viewed from above)
  addQuad([-0.5, h, 0.5], [0.5, h, 0.5], [0.5, h, -0.5], [-0.5, h, -0.5], 6);

  const lip = 0.1;
  addQuad(
    [-0.5, h, 0.5],
    [0.5, h, 0.5],
    [0.5, h + lip, 0.5],
    [-0.5, h + lip, 0.5],
    6,
  ); // Front Lip
  addQuad(
    [0.5, h, -0.5],
    [-0.5, h, -0.5],
    [-0.5, h + lip, -0.5],
    [0.5, h + lip, -0.5],
    6,
  ); // Back Lip
  addQuad(
    [-0.5, h, -0.5],
    [-0.5, h, 0.5],
    [-0.5, h + lip, 0.5],
    [-0.5, h + lip, -0.5],
    6,
  ); // Left Lip
  addQuad(
    [0.5, h, 0.5],
    [0.5, h, -0.5],
    [0.5, h + lip, -0.5],
    [0.5, h + lip, 0.5],
    6,
  ); // Right Lip

  // --- 4. STAIRS (Grey - Fixed Winding) ---
  // Step 1 Top
  addQuad(
    [-0.18, 0.08, 0.7],
    [0.18, 0.08, 0.7],
    [0.18, 0.08, 0.5],
    [-0.18, 0.08, 0.5],
    0,
  );
  // Step 1 Front Face
  addQuad(
    [-0.18, 0, 0.7],
    [0.18, 0, 0.7],
    [0.18, 0.08, 0.7],
    [-0.18, 0.08, 0.7],
    0,
  );
  // Step 1 Sides
  addQuad(
    [-0.18, 0, 0.5],
    [-0.18, 0, 0.7],
    [-0.18, 0.08, 0.7],
    [-0.18, 0.08, 0.5],
    0,
  ); // Left
  addQuad(
    [0.18, 0, 0.7],
    [0.18, 0, 0.5],
    [0.18, 0.08, 0.5],
    [0.18, 0.08, 0.7],
    0,
  ); // Right

  // Step 2 Top
  addQuad(
    [-0.18, 0.16, 0.6],
    [0.18, 0.16, 0.6],
    [0.18, 0.16, 0.5],
    [-0.18, 0.16, 0.5],
    0,
  );
  // Step 2 Front Face
  addQuad(
    [-0.18, 0.08, 0.6],
    [0.18, 0.08, 0.6],
    [0.18, 0.16, 0.6],
    [-0.18, 0.16, 0.6],
    0,
  );
  // Step 2 Sides
  addQuad(
    [-0.18, 0.08, 0.5],
    [-0.18, 0.08, 0.6],
    [-0.18, 0.16, 0.6],
    [-0.18, 0.16, 0.5],
    0,
  ); // Left
  addQuad(
    [0.18, 0.08, 0.6],
    [0.18, 0.08, 0.5],
    [0.18, 0.16, 0.5],
    [0.18, 0.16, 0.6],
    0,
  ); // Right

  // --- 5. CHIMNEY (Grey - All 5 sides fixed CCW) ---
  const cx = 0.15,
    cz = -0.2,
    cs = 0.08,
    ch = 0.15;
  addQuad(
    [cx - cs, h, cz + cs],
    [cx + cs, h, cz + cs],
    [cx + cs, h + ch, cz + cs],
    [cx - cs, h + ch, cz + cs],
    0,
  ); // Front
  addQuad(
    [cx + cs, h, cz - cs],
    [cx - cs, h, cz - cs],
    [cx - cs, h + ch, cz - cs],
    [cx + cs, h + ch, cz - cs],
    0,
  ); // Back
  addQuad(
    [cx - cs, h, cz - cs],
    [cx - cs, h, cz + cs],
    [cx - cs, h + ch, cz + cs],
    [cx - cs, h + ch, cz - cs],
    0,
  ); // Left
  addQuad(
    [cx + cs, h, cz + cs],
    [cx + cs, h, cz - cs],
    [cx + cs, h + ch, cz - cs],
    [cx + cs, h + ch, cz + cs],
    0,
  ); // Right
  addQuad(
    [cx - cs, h + ch, cz + cs],
    [cx + cs, h + ch, cz + cs],
    [cx + cs, h + ch, cz - cs],
    [cx - cs, h + ch, cz - cs],
    0,
  ); // Top

  // --- 6. WINDOWS & DOOR (Decals) ---
  const zO = 0.51;
  // Door
  addQuad(
    [-0.12, b, zO],
    [0.12, b, zO],
    [0.12, b + 0.45, zO],
    [-0.12, b + 0.45, zO],
    12,
  );

  [0.7, 1.3].forEach((y) => {
    addQuad(
      [-0.35, y, zO],
      [-0.15, y, zO],
      [-0.15, y + 0.3, zO],
      [-0.35, y + 0.3, zO],
      9,
    );
    addQuad(
      [0.15, y, zO],
      [0.35, y, zO],
      [0.35, y + 0.3, zO],
      [0.15, y + 0.3, zO],
      9,
    );

    //side window
    addQuad(
      [0.51, y, 0.1],
      [0.51, y, -0.1],
      [0.51, y + 0.3, -0.1],
      [0.51, y + 0.3, 0.1],
      9,
    );
  });

  return {
    vertices: new Float32Array(verts),
    faces: new Uint16Array(faces),
    faceColors: new Uint32Array(faceColors),
    colors: new Uint8Array(palette),
  };
}

const apartmentData = generateApartmentMesh();

export default function Apartment() {
  GameObject.call(this);
  var mesh = new MeshComponent(this);
  mesh.vertices = apartmentData.vertices;
  mesh.faces = apartmentData.faces;
  mesh.faceColors = apartmentData.faceColors;
  mesh.colors = apartmentData.colors;
  mesh.bounds = new Float32Array(32);
  MeshComponent.computeBoundsFlatArray(mesh.bounds, 0, mesh.vertices);
  MeshComponent.computeBoundingSphere(mesh.bounds, 28, mesh.vertices);
  this.addComponent(mesh);
}

Apartment.prototype = Object.create(GameObject.prototype);

