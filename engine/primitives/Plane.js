define(["../GameObject", "../components/MeshComponent"], function (
  GameObject,
  MeshComponent,
) {
  function generatePlaneMesh(width, height, segments) {
    const verts = [];
    const faces = [];

    const wH = width / 2;
    const hH = height / 2;
    const segW = width / segments;
    const segH = height / segments;

    // 1. Generate GRID Vertices (The corners)
    for (let iy = 0; iy <= segments; iy++) {
      const z = iy * segH - hH;
      for (let ix = 0; ix <= segments; ix++) {
        const x = ix * segW - wH;
        verts.push(x, 0, z);
      }
    }

    const row = segments + 1;
    const gridVertsCount = row * row;
    let centerVertIdx = gridVertsCount;

    // 2. Generate CENTER Vertices and Faces
    for (let iy = 0; iy < segments; iy++) {
      for (let ix = 0; ix < segments; ix++) {
        const tl = iy * row + ix;
        const tr = iy * row + (ix + 1);
        const bl = (iy + 1) * row + ix;
        const br = (iy + 1) * row + (ix + 1);

        // Center Position
        const cx = (verts[tl * 3] + verts[tr * 3]) * 0.5;
        const cz = (verts[tl * 3 + 2] + verts[bl * 3 + 2]) * 0.5;
        verts.push(cx, 0, cz);

        // 4 Triangles with reversed winding (Clockwise -> Counter-Clockwise or vice versa)
        // Swapping the 2nd and 3rd arguments:
        faces.push(tl, centerVertIdx, tr); // Top
        faces.push(tr, centerVertIdx, br); // Right
        faces.push(br, centerVertIdx, bl); // Bottom
        faces.push(bl, centerVertIdx, tl); // Left

        centerVertIdx++;
      }
    }

    return {
      vertices: new Float32Array(verts),
      faces: new Uint16Array(faces),
    };
  }

  const planeMesh = generatePlaneMesh(1, 1, 100);

  var bounds = new Float32Array(32);

  MeshComponent.computeBoundsFlatArray(
    bounds,
    0,
    planeMesh.vertices,
  );

  MeshComponent.computeBoundingSphere(bounds, 28, planeMesh.vertices);

  function Plane() {
    GameObject.call(this);

    var mesh = new MeshComponent(this);

    mesh.faces = planeMesh.faces;

    mesh.vertices = planeMesh.vertices;

    mesh.bounds = bounds;

    mesh.updateNormals();

    this.addComponent(mesh);
  }

  Plane.prototype = Object.create(GameObject.prototype);

  return Plane;
});
