define(["../GameObject", "../components/MeshComponent"], function (GameObject, MeshComponent) {

    function generateBallMesh(rings, sectors, radius){
        const verts = [];
        const faces = [];

        // 1. Generate Vertices
        for (let r = 0; r <= rings; r++) {
            let phi = (r * Math.PI) / rings;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);

            for (let s = 0; s <= sectors; s++) {
                let theta = (s * 2 * Math.PI) / sectors;
                let sinTheta = Math.sin(theta);
                let cosTheta = Math.cos(theta);

                let x = cosTheta * sinPhi;
                let y = cosPhi;
                let z = sinTheta * sinPhi;

                verts.push(x * radius, y * radius, z * radius);
            }
        }

        // 2. Generate Faces (Corrected Winding for your renderer)
        for (let r = 0; r < rings; r++) {
            for (let s = 0; s < sectors; s++) {
                let first = r * (sectors + 1) + s;
                let second = first + sectors + 1;

                // Swapped the second and third indices to flip the winding direction
                // Triangle 1
                faces.push(first * 3, second * 3, (first + 1) * 3);

                // Triangle 2
                faces.push(second * 3, (second + 1) * 3, (first + 1) * 3);
            }
        }

        return {
            verts: new Float32Array(verts),
            faces: new Uint16Array(faces)
        }
    }

    const ballMesh = generateBallMesh(16, 16, 2);

    const bounds = MeshComponent.computeBoundsFlatArray(new Float32Array(ballMesh.verts.length), ballMesh.verts);

    function Sphere() {
        GameObject.call(this);

        var mesh = new MeshComponent(this);
        mesh.vertices = ballMesh.verts;
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