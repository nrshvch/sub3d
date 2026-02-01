define(["../GameObject", "../components/MeshComponent"], function (GameObject, MeshComponent) {

    function generateConeMesh(segments, radius, height){
        const verts = [];
        const faces = [];

        // 0: Apex (Top)
        verts.push(0, height / 2, 0);
        // 1: Base Center (Bottom)
        verts.push(0, -height / 2, 0);

        // Create the base ring
        for (let i = 0; i < segments; i++) {
            let angle = (i / segments) * Math.PI * 2;
            let x = Math.cos(angle) * radius;
            let z = Math.sin(angle) * radius;
            verts.push(x, -height / 2, z);
        }

        // Generate Faces with flipped winding
        for (let i = 0; i < segments; i++) {
            let current = i + 2;
            let next = (i === segments - 1) ? 2 : current + 1;

            // Sides: Changed from [0, next, current] to [0, current, next]
            faces.push(0, current * 3, next * 3);

            // Base: Changed from [1, current, next] to [1, next, current]
            faces.push(3, next * 3, current * 3);
        }

        return {
            verts: new Float32Array(verts),
            faces: new Uint16Array(faces)
        }
    }

    var coneMesh = generateConeMesh(8, 0.5, 1);
    const bounds = MeshComponent.computeBoundsFlatArray(new Float32Array(coneMesh.verts.length), coneMesh.verts);

    function Cone() {
        GameObject.call(this);

        var mesh = new MeshComponent(this);
        mesh.vertices = coneMesh.verts;
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