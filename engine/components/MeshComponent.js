define(["../Component", "../lib/BoundingBox"], function (Component, BoundingBox) { //TODO: review path of bbox
    function Mesh(gameObject) {
        Component.call(this, gameObject);
    }

    var p = Mesh.prototype = Object.create(Component.prototype);

    p.constructor = Mesh;

    p.layer = 0;

    p.vertices = null;

    p.faces = null;

    p.pivot = [0, 0, 0];

    p.color = null;

    p.faceNormals = null;

    p.vertexNormals = null;

    p.bounds = null;

    p.ComputeNormals = function(){
        // this.bounds.Calculate(this.vertices);

        this.ComputeFaceNormals();
    };

    p.ComputeFaceNormals = function(){
        var vA, vB, vC, face,
            cb = [], ab = [];

        if(this.faceNormals === null)
            this.faceNormals = [];

        for ( var f = 0, fl = this.faces.length; f < fl; f ++ ) {
            face = this.faces[ f ];

            vA = this.vertices[ face[0] ];
            vB = this.vertices[ face[1] ];
            vC = this.vertices[ face[2] ];

            scaliaEngine.glMatrix.vec3.subtract(cb, vC, vB);
            scaliaEngine.glMatrix.vec3.subtract(ab, vA, vB);
            scaliaEngine.glMatrix.vec3.cross(cb, cb, ab);
            scaliaEngine.glMatrix.vec3.normalize(cb, cb);

            this.faceNormals[f] = cb;
        }
    };

    p.ComputeVertexNormals = function(){
        //TODO implement when needed
    };

    p.setGameObject = function(gameObject){
        Component.prototype.setGameObject.call(this, gameObject);
        gameObject.meshRenderer = this;
    }

    p.unsetGameObject = function(){
        this.gameObject.meshRenderer = undefined;
        Component.prototype.unsetGameObject.call(this);
    }

    Mesh.computeBoundsFlatArray = function(out, vertices) {
        if (vertices.length === 0) return;

        // 1. Initialize with the first vertex
        var minX = vertices[0], maxX = minX;
        var minY = vertices[1], maxY = minY;
        var minZ = vertices[2], maxZ = minZ;

        // 2. Loop through the flat array (stepping by 3)
        for (var i = 3; i < vertices.length; i += 3) {
            var vx = vertices[i];
            var vy = vertices[i + 1];
            var vz = vertices[i + 2];

            if (vx < minX) minX = vx; else if (vx > maxX) maxX = vx;
            if (vy < minY) minY = vy; else if (vy > maxY) maxY = vy;
            if (vz < minZ) minZ = vz; else if (vz > maxZ) maxZ = vz;
        }

        // 3. Fill the 8 corners of the AABB
        // Corner 0: minX, minY, minZ
        out[0] = minX; out[1] = minY; out[2] = minZ;
        // Corner 1: maxX, minY, minZ
        out[3] = maxX; out[4] = minY; out[5] = minZ;
        // Corner 2: minX, maxY, minZ
        out[6] = minX; out[7] = maxY; out[8] = minZ;
        // Corner 3: maxX, maxY, minZ
        out[9] = maxX; out[10] = maxY; out[11] = minZ;

        // Corner 4: minX, minY, maxZ
        out[12] = minX; out[13] = minY; out[14] = maxZ;
        // Corner 5: maxX, minY, maxZ
        out[15] = maxX; out[16] = minY; out[17] = maxZ;
        // Corner 6: minX, maxY, maxZ
        out[18] = minX; out[19] = maxY; out[20] = maxZ;
        // Corner 7: maxX, maxY, maxZ
        out[21] = maxX; out[22] = maxY; out[23] = maxZ;

        return out;
    };

    Mesh.computeBounds = function(out, vertices) {
        if (vertices.length === 0) return;

        // 1. Find Min/Max AABB
        var minX = vertices[0][0], maxX = minX;
        var minY = vertices[0][1], maxY = minY;
        var minZ = vertices[0][2], maxZ = minZ;

        for (var i = 1; i < vertices.length; i++) {
            var v = vertices[i];
            var vx = v[0], vy = v[1], vz = v[2];
            if (vx < minX) minX = vx; else if (vx > maxX) maxX = vx;
            if (vy < minY) minY = vy; else if (vy > maxY) maxY = vy;
            if (vz < minZ) minZ = vz; else if (vz > maxZ) maxZ = vz;
        }

        // Bottom 4
        out[0] = minX; out[1] = minY; out[2] = minZ;
        out[3] = maxX; out[4] = minY; out[5] = minZ;
        out[6] = minX; out[7] = maxY; out[8] = minZ;
        out[9] = maxX; out[10] = maxY; out[11] = minZ;
        // Top 4
        out[12] = minX; out[13] = minY; out[14] = maxZ;
        out[15] = maxX; out[16] = minY; out[17] = maxZ;
        out[18] = minX; out[19] = maxY; out[20] = maxZ;
        out[21] = maxX; out[22] = maxY; out[23] = maxZ;

        return out;
    }

    return Mesh;
});