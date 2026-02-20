define([
  "./config",
  "./components/PathRenderer",
  "./components/SpriteRenderer",
  "./components/TextRenderer",
  "./components/MeshComponent",
  "./components/CameraComponent",
  "./math",
  "./palette",
], function (
  config,
  PathRenderer,
  SpriteRenderer,
  TextRenderer,
  MeshComponent,
  CameraComponent,
  math
) {
  const vec3TransformMat4to2D = math.vec3TransformMat4to2D;

  function renderAxis(gameObject, ctx, worldToScreenMatrix, vec3Cache1) {
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
   * Renders face normals as lines for debugging purposes.
   * @param {CanvasRenderingContext2D} ctx - The layer context.
   * @param {number} faceCount - Total faces processed (returned by destructMesh).
   * @param {Int16Array} geometryBuffer - Screen-space [x0, y0, x1, y1, x2, y2].
   * @param {Float32Array} faceNormalsBuffer - Normalized World-Space normals.
   * @param {number} length - The length of the normal line in pixels.
   */
  function renderDebugNormals(
    ctx,
    faceCount,
    geometryBuffer,
    faceNormalsBuffer,
    length = 10,
  ) {
    ctx.beginPath();
    // Standard debug color for normals
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'cyan';

    for (let i = 0; i < faceCount; i++) {
      const gIdx = i * 6;
      const nIdx = i * 3;

      // 1. Calculate the screen-space center of the triangle
      const centerX =
        (geometryBuffer[gIdx] +
          geometryBuffer[gIdx + 2] +
          geometryBuffer[gIdx + 4]) /
        3;
      const centerY =
        (geometryBuffer[gIdx + 1] +
          geometryBuffer[gIdx + 3] +
          geometryBuffer[gIdx + 5]) /
        3;

      const nx = faceNormalsBuffer[nIdx];
      const ny = faceNormalsBuffer[nIdx + 1];

      // 2. Use the normal direction to find the tip of the line
      // Note: We use the normal's X and Y to influence the screen direction.
      // For a more accurate "projected" normal tip, you'd technically want to
      // transform the normal tip (center + normal) through the view-projection matrix,
      // but for basic debugging, simply offseting by the world normal works.
      const tipX = centerX + (nx ? nx * length : 1);
      const tipY = centerY - (ny ? ny * length : 1); // -Y for Canvas

      ctx.moveTo(centerX, centerY);
      ctx.lineTo(tipX, tipY);
    }

    ctx.stroke();
  }

  return {
    renderAxis: renderAxis,
    renderDebugNormals: renderDebugNormals,
  };
});
