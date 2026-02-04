define(["../GameObject", "../components/MeshComponent"], function (GameObject, MeshComponent) {

    function generateBallMesh(rings, sectors, radius) {
        const verts = [];
        const faces = [];
        const lookup = {};

        function getVertexIndex(x, y, z) {
            const key = `${x.toFixed(5)},${y.toFixed(5)},${z.toFixed(5)}`;
            if (lookup[key] !== undefined) return lookup[key];

            const index = verts.length / 3;
            verts.push(x, y, z);
            lookup[key] = index;
            return index;
        }

        // 1. Build the grid of shared indices
        const grid = [];
        for (let r = 0; r <= rings; r++) {
            const row = [];
            const phi = (r * Math.PI) / rings;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            for (let s = 0; s <= sectors; s++) {
                const theta = (s * 2 * Math.PI) / sectors;
                const x = Math.cos(theta) * sinPhi * radius;
                const y = cosPhi * radius;
                const z = Math.sin(theta) * sinPhi * radius;
                row.push(getVertexIndex(x, y, z));
            }
            grid.push(row);
        }

        // 2. Generate Faces using your original skipping logic
        for (let r = 0; r < rings; r++) {
            for (let s = 0; s < sectors; s++) {
                const first = grid[r][s];
                const firstNext = grid[r][s + 1];
                const second = grid[r + 1][s];
                const secondNext = grid[r + 1][s + 1];

                // Triangle 1: Skip North Pole
                if (r !== 0) {
                    faces.push(first, second, firstNext);
                }

                // Triangle 2: Skip South Pole
                if (r !== rings - 1) {
                    faces.push(second, secondNext, firstNext);
                }
            }
        }

        return {
            vertices: new Float32Array(verts),
            faces: new Uint16Array(faces)
        };
    }

    const ballMesh = generateBallMesh(16, 16, 2);

    const bounds = MeshComponent.computeBoundsFlatArray(new Float32Array(24), ballMesh.vertices);

    function Sphere() {
        GameObject.call(this);

        var mesh = new MeshComponent(this);
        mesh.vertices = ballMesh.vertices;
        mesh.faces = ballMesh.faces;
        mesh.bounds = bounds;
        mesh.color = [255, 100, 0]; // Orange

        this.addComponent(mesh);
    }

    var p = Sphere.prototype = Object.create(GameObject.prototype);

    p.tick = function(time){
        // GameObject.prototype.tick.call(this);
        // console.log(Math.sin(time.time/1000) * 100);
        this.transform.translate(0,Math.sin(time.time/500) * 10,0, 'world')
        this.transform.rotate(0,10,0, 'world');
    }

    return Sphere;
});