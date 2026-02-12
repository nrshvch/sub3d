define(["../GameObject", "../components/MeshComponent"], function (
  GameObject,
  MeshComponent,
) {
  function generateBoxMesh(width, height, depth, segments) {
    const verts = [];
    const faces = [];
    const lookup = {}; // Key: "x,y,z" | Value: index in verts array

    function getVertexIndex(x, y, z) {
      // Rounding to fix floating point precision issues at corners
      const key = `${x.toFixed(5)},${y.toFixed(5)},${z.toFixed(5)}`;
      if (lookup[key] !== undefined) return lookup[key];
      const index = verts.length / 3;
      verts.push(x, y, z);
      lookup[key] = index;
      return index;
    }

    function buildPlane(
      u,
      v,
      w,
      uDir,
      vDir,
      wDir,
      width,
      height,
      depth,
      segments,
    ) {
      const segmentWidth = width / segments;
      const segmentHeight = height / segments;
      const widthHalf = width / 2;
      const heightHalf = height / 2;
      const depthHalf = (depth / 2) * wDir;

      // Create indices for this specific side
      const grid = [];

      for (let i = 0; i <= segments; i++) {
        const row = [];
        const y = i * segmentHeight - heightHalf;
        for (let j = 0; j <= segments; j++) {
          const x = j * segmentWidth - widthHalf;

          const pos = [0, 0, 0];
          pos[u] = x * uDir;
          pos[v] = y * vDir;
          pos[w] = depthHalf;

          row.push(getVertexIndex(pos[0], pos[1], pos[2]));
        }
        grid.push(row);
      }

      for (let i = 0; i < segments; i++) {
        for (let j = 0; j < segments; j++) {
          const a = grid[i][j];
          const b = grid[i + 1][j];
          const c = grid[i + 1][j + 1];
          const d = grid[i][j + 1];

          // REVERTED WINDING: Swapped b/d and c/d positions
          faces.push(a, d, b);
          faces.push(b, d, c);
        }
      }
    }

    // Build the 6 sides
    buildPlane(0, 1, 2, 1, 1, 1, width, height, depth, segments); // Front
    buildPlane(0, 1, 2, -1, 1, -1, width, height, depth, segments); // Back
    buildPlane(2, 1, 0, -1, 1, 1, depth, height, width, segments); // Right
    buildPlane(2, 1, 0, 1, 1, -1, depth, height, width, segments); // Left
    buildPlane(0, 2, 1, 1, -1, 1, width, depth, height, segments); // Top
    buildPlane(0, 2, 1, 1, 1, -1, width, depth, height, segments); // Bottom

    return {
      vertices: new Float32Array(verts),
      faces: new Uint16Array(faces),
    };
  }

  const boxMesh = generateBoxMesh(1, 1, 1, 1);

  const bounds = MeshComponent.computeBoundsFlatArray(
    new Float32Array(32),
    boxMesh.vertices,
  );

  MeshComponent.computeBoundingSphere(bounds, 28, boxMesh.vertices);

  function Box() {
    GameObject.call(this);

    var mesh = new MeshComponent(this);

    mesh.vertices = boxMesh.vertices;

    mesh.faces = boxMesh.faces;

    // mesh.computeBounds();

    mesh.bounds = bounds;

    // mesh.ComputeNormals();

    this.addComponent(mesh);

    // this.scene.world.tickRegister(this);
  }

  var p = (Box.prototype = Object.create(GameObject.prototype));

  p.tick = function (time) {
    // GameObject.prototype.tick.call(this);
    // console.log(Math.sin(time.time/1000) * 100);
    this.transform.translate(0, Math.sin(time.time / 500) * 10, 0, "world");
    this.transform.rotate(0, 10, 0, "world");
  };

  return Box;
});
