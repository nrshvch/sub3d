import * as math from "../math.js";

const vec3TransformMat4to2D = math.vec3TransformMat4to2D;

/**
 * Renders one GameObject's axis gizmo (X red, Y green, Z blue) - 3 stroke() calls, called once
 * per object directly from render() for every GameObject in the scene while debugAxis is on (see
 * Canvas2dViewport#debugAxis). Kept deliberately simple and unbatched: this is a debug-only,
 * opt-in overlay, not a hot path, so there's no accumulation/bookkeeping here - just project and
 * draw.
 */
export function renderAxis(gameObject, ctx, worldToScreenMatrix, vec3Cache1) {
  var W = gameObject.transform.getLocalToWorld();

  // 1. Get the World Position of the object
  // This is the translation component of the Local-to-World matrix
  var worldPosX = W[12];
  var worldPosY = W[13];
  var worldPosZ = W[14];

  // 2. Project the Origin to Screen Space
  // We project the world position, NOT (0,0,0)
  vec3TransformMat4to2D(
    vec3Cache1,
    0,
    worldPosX,
    worldPosY,
    worldPosZ,
    worldToScreenMatrix,
  );
  var ox = vec3Cache1[0],
    oy = vec3Cache1[1];

  var gizmoSize = 50;

  // 3. Extract and Normalize Basis Vectors
  var axes = [
    { x: W[0], y: W[1], z: W[2], col: "#ff0000" }, // X
    { x: W[4], y: W[5], z: W[6], col: "#00ff00" }, // Y
    { x: W[8], y: W[9], z: W[10], col: "#0000ff" }, // Z
  ];

  for (var i = 0; i < 3; i++) {
    var a = axes[i];
    var len = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);

    // If an axis is scaled to 0, we can't normalize it.
    // We default it to a unit vector so the axis still shows.
    if (len < 0.0001) {
      // Optional: fallback to identity directions if scale is 0
      if (i === 0) a.x = 1;
      else if (i === 1) a.y = 1;
      else a.z = 1;
      len = 1;
    }

    var nx = a.x / len;
    var ny = a.y / len;
    var nz = a.z / len;

    // 4. Project the Tip
    // Tip Position = World Position + (Normalized Direction * Size)
    vec3TransformMat4to2D(
      vec3Cache1,
      0,
      worldPosX + nx * gizmoSize,
      worldPosY + ny * gizmoSize,
      worldPosZ + nz * gizmoSize,
      worldToScreenMatrix,
    );

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = a.col;
    ctx.moveTo(ox, oy);
    ctx.lineTo(vec3Cache1[0], vec3Cache1[1]);
    ctx.stroke();
  }
}

/**
 * Renders face normals (cyan) and vertex normals (yellow) for every face in
 * [offset, offset+count) - the same post-cull, per-layer buffers drawWireframe uses in
 * Canvas2dRenderer.js, so this only ever draws normals for faces that actually survived culling;
 * nothing extra to track here. Each color is one beginPath/stroke() pair for the whole batch,
 * same rationale as drawWireframe: stroke() has fixed per-call overhead on top of the segment
 * work, so batching amortizes that across every face instead of paying it per-triangle.
 *
 * World-space normals (faceNormalsBuffer/vertexNormalsBuffer) are rotated into view space via
 * cameraLocalMatrix's rotation submatrix (translation dropped - this is a direction, not a
 * point) before using their X/Y as the 2D screen direction. That's what makes a normal pointing
 * straight at/away from the camera draw as a dot instead of a line to the side: its view-space
 * X/Y shrink toward 0 as more of its length ends up in view-space depth, regardless of which way
 * the camera itself faces in world space.
 *
 * @param {CanvasRenderingContext2D} ctx - The layer context (same one drawTriangles/drawWireframe
 *   just drew into - this draws on top of that layer's own geometry, not deferred to last).
 * @param {Float32Array} vertexBuffer - Array of vertices in the format [x0, y0, x1, y1, ...]
 * @param {Uint32Array} vertexIndexBuffer - Array of indices in the format [i0, i1, i2, i3, i4, i5, ...]
 * @param {Uint32Array} indexBuffer - Array of face indices in the format [i0, i1, i2, i3, i4, i5, ...]
 * @param {Float32Array} faceNormalsBuffer - World-space face normals, [nx, ny, nz] per face.
 * @param {Float32Array} vertexNormalsBuffer - World-space vertex normals, [nx, ny, nz] per vertex.
 * @param {number} count - Number of elements in indexBuffer
 * @param {number} offset - Starting index of the faces to draw
 * @param {number} w - Canvas width
 * @param {number} h - Canvas height
 * @param {Float32Array} cameraLocalMatrix - World-to-camera-local (view) matrix.
 * @param {number} [normalLength=10] - Screen-space pixel length of a normal lying fully in the
 *   screen plane.
 */
export function renderDebugNormals(
  ctx,
  vertexBuffer,
  vertexIndexBuffer,
  indexBuffer,
  faceNormalsBuffer,
  vertexNormalsBuffer,
  count,
  offset,
  w,
  h,
  cameraLocalMatrix,
  normalLength = 10,
) {
  const halfW = w * 0.5,
    halfH = h * 0.5;
  const len = offset + count;

  const m0 = cameraLocalMatrix[0],
    m1 = cameraLocalMatrix[1],
    m4 = cameraLocalMatrix[4],
    m5 = cameraLocalMatrix[5],
    m8 = cameraLocalMatrix[8],
    m9 = cameraLocalMatrix[9];

  // Face normals - cyan
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "cyan";

  for (let f = offset; f < len; f++) {
    const idx = indexBuffer[f];

    const v0Idx = vertexIndexBuffer[idx * 3];
    const v1Idx = vertexIndexBuffer[idx * 3 + 1];
    const v2Idx = vertexIndexBuffer[idx * 3 + 2];

    const px0 = vertexBuffer[v0Idx] * halfW + halfW;
    const py0 = vertexBuffer[v0Idx + 1] * halfH + halfH;
    const px1 = vertexBuffer[v1Idx] * halfW + halfW;
    const py1 = vertexBuffer[v1Idx + 1] * halfH + halfH;
    const px2 = vertexBuffer[v2Idx] * halfW + halfW;
    const py2 = vertexBuffer[v2Idx + 1] * halfH + halfH;

    const cx = (px0 + px1 + px2) * 0.33333;
    const cy = (py0 + py1 + py2) * 0.33333;

    const fnIdx = idx * 3;
    const fwx = faceNormalsBuffer[fnIdx];
    const fwy = faceNormalsBuffer[fnIdx + 1];
    const fwz = faceNormalsBuffer[fnIdx + 2];
    const fvx = fwx * m0 + fwy * m4 + fwz * m8;
    const fvy = fwx * m1 + fwy * m5 + fwz * m9;

    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + fvx * normalLength, cy - fvy * normalLength); // -Y for Canvas
  }

  ctx.stroke();

  // Vertex normals - yellow, one segment per face corner (a vertex shared with an adjacent face
  // gets drawn once per adjacent face - harmless overdraw of the same line, not worth deduping
  // for a debug-only overlay).
  ctx.beginPath();
  ctx.strokeStyle = "yellow";

  for (let f = offset; f < len; f++) {
    const idx = indexBuffer[f];

    const v0Idx = vertexIndexBuffer[idx * 3];
    const v1Idx = vertexIndexBuffer[idx * 3 + 1];
    const v2Idx = vertexIndexBuffer[idx * 3 + 2];

    const px0 = vertexBuffer[v0Idx] * halfW + halfW;
    const py0 = vertexBuffer[v0Idx + 1] * halfH + halfH;
    const px1 = vertexBuffer[v1Idx] * halfW + halfW;
    const py1 = vertexBuffer[v1Idx + 1] * halfH + halfH;
    const px2 = vertexBuffer[v2Idx] * halfW + halfW;
    const py2 = vertexBuffer[v2Idx + 1] * halfH + halfH;

    const vn0x = vertexNormalsBuffer[v0Idx],
      vn0y = vertexNormalsBuffer[v0Idx + 1],
      vn0z = vertexNormalsBuffer[v0Idx + 2];
    const v0vx = vn0x * m0 + vn0y * m4 + vn0z * m8;
    const v0vy = vn0x * m1 + vn0y * m5 + vn0z * m9;
    ctx.moveTo(px0, py0);
    ctx.lineTo(px0 + v0vx * normalLength, py0 - v0vy * normalLength);

    const vn1x = vertexNormalsBuffer[v1Idx],
      vn1y = vertexNormalsBuffer[v1Idx + 1],
      vn1z = vertexNormalsBuffer[v1Idx + 2];
    const v1vx = vn1x * m0 + vn1y * m4 + vn1z * m8;
    const v1vy = vn1x * m1 + vn1y * m5 + vn1z * m9;
    ctx.moveTo(px1, py1);
    ctx.lineTo(px1 + v1vx * normalLength, py1 - v1vy * normalLength);

    const vn2x = vertexNormalsBuffer[v2Idx],
      vn2y = vertexNormalsBuffer[v2Idx + 1],
      vn2z = vertexNormalsBuffer[v2Idx + 2];
    const v2vx = vn2x * m0 + vn2y * m4 + vn2z * m8;
    const v2vy = vn2x * m1 + vn2y * m5 + vn2z * m9;
    ctx.moveTo(px2, py2);
    ctx.lineTo(px2 + v2vx * normalLength, py2 - v2vy * normalLength);
  }

  ctx.stroke();
}
