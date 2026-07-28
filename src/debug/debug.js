import * as math from "../math.js";

const vec3TransformMat4to2D = math.vec3TransformMat4to2D;

// Fixed screen-space gizmo arm length, regardless of the object's own transform scale.
const GIZMO_SIZE = 25;

/**
 * Renders every GameObject's axis gizmo (X red, Y green, Z blue) in the given list, called once
 * per frame from render() while debugAxis is on (see Canvas2dViewport#debugAxis) - the loop over
 * gameObjects lives here now instead of in a separate per-object wrapper in Canvas2dRenderer.js.
 *
 * Batched to 3 stroke() calls total, regardless of how many objects there are: one Path2D per
 * axis color, filled in by a single pass over gameObjects, then each stroked once. This also
 * means each object's origin only needs the one full point-projection (translation included);
 * the 3 tip directions are derived from it with plain multiply-adds instead of 3 more full
 * vec3TransformMat4to2D calls - see the inline comment below for why that's valid.
 */
export function renderAxis(gameObjects, ctx, worldToScreenMatrix, vec3Cache1) {
  // worldToScreenMatrix is affine (no perspective divide - this engine is orthographic-only), so
  // a direction vector (as opposed to a point) transforms through just its linear part - drop
  // the translation terms (m12/13/14) rather than re-running the full point transform (with
  // translation) for each of the 3 tips on top of the one we already did for the origin.
  const m0 = worldToScreenMatrix[0],
    m1 = worldToScreenMatrix[1],
    m4 = worldToScreenMatrix[4],
    m5 = worldToScreenMatrix[5],
    m8 = worldToScreenMatrix[8],
    m9 = worldToScreenMatrix[9];

  const xPath = new Path2D();
  const yPath = new Path2D();
  const zPath = new Path2D();

  for (let i = 0; i < gameObjects.length; i++) {
    const go = gameObjects[i];
    if (!go || !go.transform) continue;

    const W = go.transform.getLocalToWorld();
    const worldPosX = W[12],
      worldPosY = W[13],
      worldPosZ = W[14];

    // Project the Origin to Screen Space (the one point per object that needs the full affine
    // transform, translation included).
    vec3TransformMat4to2D(vec3Cache1, 0, worldPosX, worldPosY, worldPosZ, worldToScreenMatrix);
    const ox = vec3Cache1[0],
      oy = vec3Cache1[1];

    // X axis
    let ax = W[0],
      ay = W[1],
      az = W[2];
    let axLen = Math.sqrt(ax * ax + ay * ay + az * az);
    if (axLen < 0.0001) {
      // Scaled to 0 - can't normalize, so fall back to identity so the axis still shows.
      ax = 1;
      ay = 0;
      az = 0;
      axLen = 1;
    }
    const axInv = GIZMO_SIZE / axLen;
    xPath.moveTo(ox, oy);
    xPath.lineTo(ox + (ax * m0 + ay * m4 + az * m8) * axInv, oy + (ax * m1 + ay * m5 + az * m9) * axInv);

    // Y axis
    let bx = W[4],
      by = W[5],
      bz = W[6];
    let byLen = Math.sqrt(bx * bx + by * by + bz * bz);
    if (byLen < 0.0001) {
      bx = 0;
      by = 1;
      bz = 0;
      byLen = 1;
    }
    const byInv = GIZMO_SIZE / byLen;
    yPath.moveTo(ox, oy);
    yPath.lineTo(ox + (bx * m0 + by * m4 + bz * m8) * byInv, oy + (bx * m1 + by * m5 + bz * m9) * byInv);

    // Z axis
    let cx = W[8],
      cy = W[9],
      cz = W[10];
    let czLen = Math.sqrt(cx * cx + cy * cy + cz * cz);
    if (czLen < 0.0001) {
      cx = 0;
      cy = 0;
      cz = 1;
      czLen = 1;
    }
    const czInv = GIZMO_SIZE / czLen;
    zPath.moveTo(ox, oy);
    zPath.lineTo(ox + (cx * m0 + cy * m4 + cz * m8) * czInv, oy + (cx * m1 + cy * m5 + cz * m9) * czInv);
  }

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#ff0000";
  ctx.stroke(xPath);
  ctx.strokeStyle = "#00ff00";
  ctx.stroke(yPath);
  ctx.strokeStyle = "#0000ff";
  ctx.stroke(zPath);
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
