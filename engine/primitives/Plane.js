define(["../GameObject", "../components/MeshComponent"], function (GameObject, MeshComponent) {
    function createPlaneMesh(segments) {
        var vCount = (segments + 1) * (segments + 1);
        var fCount = segments * segments * 2;

        var vertices = new Float32Array(vCount * 3);
        var faces = new Uint16Array(fCount * 3);

        var vPtr = 0;
        // Generate Vertices
        for (var z = 0; z <= segments; z++) {
            for (var x = 0; x <= segments; x++) {
                vertices[vPtr++] = (x / segments) - 0.5; // X
                vertices[vPtr++] = 0;                    // Y (Flat)
                vertices[vPtr++] = (z / segments) - 0.5; // Z
            }
        }

        var iPtr = 0;
        // Generate Face Indices (Triangles)
        for (var z = 0; z < segments; z++) {
            for (var x = 0; x < segments; x++) {
                var row1 = z * (segments + 1);
                var row2 = (z + 1) * (segments + 1);

                // Triangle 1
                faces[iPtr++] = row1 + x;
                faces[iPtr++] = row1 + x + 1;
                faces[iPtr++] = row2 + x;

                // Triangle 2
                faces[iPtr++] = row1 + x + 1;
                faces[iPtr++] = row2 + x + 1;
                faces[iPtr++] = row2 + x;
            }
        }

        // Calculate Bounds once for this segment-count
        var bounds = new Float32Array(24);
        MeshComponent.computeBounds(bounds, vertices);

        return {
            vertices: vertices,
            faces: faces,
            bounds: bounds,
        };
    }

    var vertices = new Float32Array([
        -0.5, 0, -0.5,
        0.5, 0, -0.5,
        -0.5, 0, 0.5,
        0.5, 0, 0.5
    ]);

    var faces = new Uint16Array([
        0, 3, 6,
        9, 6, 3
    ]);

    var bounds = MeshComponent.computeBoundsFlatArray(new Float32Array(24), vertices);
    // console.log(createPlaneMesh(1));

    function Plane() {
        GameObject.call(this);


        var r = (Math.random() * 255) | 0,
            g = (Math.random() * 255) | 0,
            b = (Math.random() * 255) | 0;


        this.color = "rgb(" + (r % 100) + "," + (105 + g % 55) + ",0)";


        var mesh = new MeshComponent(this);

        mesh.faces = faces;

        mesh.vertices = vertices;

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
