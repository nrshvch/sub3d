define(["../GameObject", "../components/MeshComponent"], function (GameObject, MeshComponent) {

    function generateConeMesh(segments, radius, height) {
        const verts = [];
        const faces = [];

        // 1. Generate Vertices
        // Index 0: Apex (Top) - Now at full height
        verts.push(0, height, 0);
        // Index 1: Base Center (Bottom) - Now at 0
        verts.push(0, 0, 0);

        // Indices 2 to (segments + 1): The Ring
        for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            verts.push(x, 0, z); // Y is 0 for the base ring
        }

        // 2. Generate Faces
        for (let i = 0; i < segments; i++) {
            const current = i + 2;
            const next = (i === segments - 1) ? 2 : i + 3;

            // Sides (Connect to Apex)
            // Winding: Apex -> Current -> Next
            faces.push(0, current, next);

            // Base (Connect to Center)
            // Winding: Center -> Next -> Current
            faces.push(1, next, current);
        }

        return {
            vertices: new Float32Array(verts),
            faces: new Uint16Array(faces)
        };
    }

    var coneMesh = generateConeMesh(5, 0.5, 1);
    const bounds = MeshComponent.computeBoundsFlatArray(new Float32Array(24), coneMesh.vertices);

    function Cone() {
        GameObject.call(this);

        var mesh = new MeshComponent(this);
        mesh.vertices = coneMesh.vertices;
        mesh.faces = coneMesh.faces;
        mesh.bounds = bounds;
        mesh.color = [0, 200, 255]; // Bright Blue

        this.addComponent(mesh);
    }

    var p = Cone.prototype = Object.create(GameObject.prototype);

    // p.tick = function(time) {
    //     GameObject.prototype.tick.call(this);
    //     this.transform.rotate(0, 1, 0, 'world');
    // };

    // p.tick = function(time){
    //     GameObject.prototype.tick.call(this);
    //     // console.log(Math.sin(time.time/1000) * 100);
    //     // this.transform.translate(0,Math.sin(time.time/500) * 10,0, 'world')
    //     this.transform.rotate(0,10,0, 'locat');
    // }

    return Cone;
});