define(function () {
    function vec3TransformMat4(out, at, x, y, z, m) {
        out[at] = m[0] * x + m[4] * y + m[8] * z + m[12];
        out[at + 1] = m[1] * x + m[5] * y + m[9] * z + m[13];
        out[at + 2] = m[2] * x + m[6] * y + m[10] * z + m[14];
        return out;
    }

    function vec3TransformMat4to2D(out, at, x, y, z, m) {
        out[at] = m[0] * x + m[4] * y + m[8] * z + m[12];
        out[at + 1] = m[1] * x + m[5] * y + m[9] * z + m[13];
        // out[at + 2] = m[2] * x + m[6] * y + m[10] * z + m[14];
        return out;
    }

    return {
        vec3TransformMat4to2D: vec3TransformMat4to2D,
        vec3TransformMat4: vec3TransformMat4
    }
})