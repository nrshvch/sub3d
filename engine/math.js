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

  function vec4TransformMat4(out, at, x, y, z, w, m) {
    out[at] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[at + 1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[at + 2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[at + 3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
  }

  function mat4Mul(out, a, b) {
    var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3],
      a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7],
      a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11],
      a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

    // Cache only the current line of the second matrix
    var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }

  return {
    mat4Mul: mat4Mul,
    vec3TransformMat4to2D: vec3TransformMat4to2D,
    vec3TransformMat4: vec3TransformMat4,
    vec4TransformMat4: vec4TransformMat4,
  };
});
