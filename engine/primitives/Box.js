define(["../GameObject", "../components/MeshComponent"], function (GameObject, MeshComponent) {
    function generateBoxData(segments) {
        // 6 sides, each side has (s+1)*(s+1) vertices
        var vertsPerSide = (segments + 1) * (segments + 1);
        var facesPerSide = segments * segments * 2;

        var vertices = new Float32Array(6 * vertsPerSide * 3);
        var faces = new Uint16Array(6 * facesPerSide * 3);

        var vPtr = 0;
        var iPtr = 0;
        var vertexOffset = 0;

        // Helper to generate a single side
        // dims: array of 3 indices representing [right, up, forward]
        // sign: 1 or -1 for the fixed axis
        function buildSide(dim1, dim2, dim3, sign) {
            for (var y = 0; y <= segments; y++) {
                for (var x = 0; x <= segments; x++) {
                    var v = new Float32Array(3);
                    v[dim1] = (x / segments - 0.5) * 2;
                    v[dim2] = (y / segments - 0.5) * 2;
                    v[dim3] = sign; // This is the fixed face (e.g., front/back)

                    vertices[vPtr++] = v[0] * 0.5; // Scaling to unit size
                    vertices[vPtr++] = v[1] * 0.5;
                    vertices[vPtr++] = v[2] * 0.5;
                }
            }

            for (var y = 0; y < segments; y++) {
                for (var x = 0; x < segments; x++) {
                    var a = vertexOffset + x + y * (segments + 1);
                    var b = vertexOffset + x + (y + 1) * (segments + 1);
                    var c = vertexOffset + (x + 1) + (y + 1) * (segments + 1);
                    var d = vertexOffset + (x + 1) + y * (segments + 1);

                    // Triangle 1
                    faces[iPtr++] = a; faces[iPtr++] = b; faces[iPtr++] = d;
                    // Triangle 2
                    faces[iPtr++] = b; faces[iPtr++] = c; faces[iPtr++] = d;
                }
            }
            vertexOffset += vertsPerSide;
        }

        // Build the 6 sides of the cube
        buildSide(0, 1, 2,  1); // Front
        buildSide(0, 1, 2, -1); // Back
        buildSide(2, 1, 0,  1); // Right
        buildSide(2, 1, 0, -1); // Left
        buildSide(0, 2, 1,  1); // Top
        buildSide(0, 2, 1, -1); // Bottom

        return {
            vertices: vertices,
            faces: faces,
            vertexCount: vertices.length / 3,
            faceCount: faces.length / 3
        };
    }

    const faces = new Uint16Array([
        0,3,6, //front1
        3,9,6, //front2
        12,18,15, //back1
        15,18,21, //back2
        3,15,9, //right1
        15,21,9, //right2
        12,0,6, //left1
        12,6,18, //left2
        0,12,3, //bottom1
        3,12,15, //bottom2
        6,9,18, //top1
        18,9,21 //top2
    ]);

    const vertices = new Float32Array([
        -0.5,-0.5,-0.5,
        0.5,-0.5,-0.5,
        -0.5,0.5,-0.5,
        0.5,0.5,-0.5,
        -0.5,-0.5,0.5,
        0.5,-0.5,0.5,
        -0.5,0.5,0.5,
        0.5,0.5,0.5,
    ]);

    const bounds = MeshComponent.computeBoundsFlatArray(new Float32Array(24), vertices);

    function Box() {
        GameObject.call(this);

        var mesh = new MeshComponent(this);

        mesh.vertices = vertices;

        mesh.faces = faces;

        // mesh.computeBounds();

        mesh.bounds = bounds;

        // mesh.ComputeNormals();

        this.addComponent(mesh);

        this.transform.rotate(0, 0, 45);
        this.transform.rotate(35.264, 0, 0, 'world');
        this.transform.translate(0,-50,0, 'world')


        this.scene.world.tickRegister(this);
    }

    var p = Box.prototype = Object.create(GameObject.prototype);

    p.tick = function(time){
        GameObject.prototype.tick.call(this);
        // console.log(Math.sin(time.time/1000) * 100);
        this.transform.translate(0,Math.sin(time.time/500) * 10,0, 'world')
        this.transform.rotate(0,10,0, 'world');
    }

    return Box;
});
