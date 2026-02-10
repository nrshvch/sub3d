define(["../GameObject", "../components/MeshComponent"], function (GameObject, MeshComponent) {
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
                const a = iy * row + ix;          // Top-left
                const b = iy * row + (ix + 1);      // Top-right
                const c = (iy + 1) * row + ix;      // Bottom-left
                const d = (iy + 1) * row + (ix + 1);// Bottom-right

                // Triangle 1: Top-left, Top-right, Bottom-left
                faces.push(a, c, b);
                // Triangle 2: Bottom-right, Bottom-left, Top-right
                faces.push(d, b, c);
            }
        }

        return {
            vertices: new Float32Array(verts),
            faces: new Uint16Array(faces)
        };
    }

    const planeMesh = generatePlaneMesh(1,1,1);

    var bounds = MeshComponent.computeBoundsFlatArray(new Float32Array(24), planeMesh.vertices);


    function Plane() {
        GameObject.call(this);


        var r = (Math.random() * 255) | 0,
            g = (Math.random() * 255) | 0,
            b = (Math.random() * 255) | 0;


        this.color = "rgb(" + (r % 100) + "," + (105 + g % 55) + ",0)";


        var mesh = new MeshComponent(this);

        mesh.faces = planeMesh.faces;

        mesh.vertices = planeMesh.vertices;

        mesh.bounds = bounds;
        // mesh.computeBounds();

        // mesh.ComputeNormals();

        this.addComponent(mesh);
    }


    var p = Plane.prototype = Object.create(GameObject.prototype);

    // p.tick = function () {
    //     GameObject.prototype.tick.call(this);
    //     this.transform.rotate(10,10,0);
    // }

    return Plane;
});
