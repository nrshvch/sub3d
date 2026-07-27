// Numeric key registry for consumer-provided shaders. Canvas2dRenderer.js's switch reserves
// 0-4 for sub3d's own built-in shaders (0 flat, 1 emissive, 2 unlit, 3 avgFlat, 4 smooth),
// dispatching to each through a fixed call site so the JIT can keep those monomorphic
// regardless of how many distinct consumer shaders exist elsewhere. Wireframe mode (see
// Canvas2dViewport#wireframe) is a separate renderer/viewport-wide flag checked before this
// switch even runs - it doesn't occupy a numeric key at all, built-in or registered. Anything
// registered here starts at the next free key, so a mesh only ever needs to remember one
// number instead of holding a live function reference.
//
// Exported directly (not behind a lookup function) so Canvas2dRenderer's hot per-face loop can
// index it - shaderRegistry[key] - without an extra function call per face.
export const shaderRegistry = [];
let nextKey = 5;

/**
 * Registers a shader function and returns the numeric key to assign to a mesh's `shaderType`
 * (see MeshComponent.js) so it renders with this shader. Register once per shader, reuse the
 * returned key across every mesh that should use it - this also keeps the renderer's lookup
 * (shaderRegistry[key]) a stable function reference per key, rather than something that has
 * to be re-registered or re-wired per mesh.
 *
 * Every shader - built-in or registered - is called with the exact same positional signature:
 *   shaderFn(
 *     ctx,                                  // CanvasRenderingContext2D to draw on
 *     px0, py0, px1, py1, px2, py2,          // triangle screen-space coords
 *     epx0, epy0, epx1, epy1, epx2, epy2,    // same, expanded outward from centroid -
 *                                            //   use these (not px/py) when clipping, to
 *                                            //   avoid subpixel seams between faces
 *     depth, clipGeometryBuffer,             // camera-space centroid depth (+ depthBias),
 *                                            //   and the raw per-vertex camera-space
 *                                            //   [x0,y0,z0,x1,y1,z1,x2,y2,z2], read at
 *                                            //   clipGeometryBuffer[faceIdx*9 (+1..+8)]
 *     colorBuffer,                          // colorBuffer[faceIdx*3 (+1/+2)] = packed
 *                                            //   per-vertex 0xRRGGBB face color
 *     vertexNormalsBuffer, faceNormalsBuffer, v0Idx, v1Idx, v2Idx, // transformed per-vertex
 *                                            //   normals, read as
 *                                            //   vertexNormalsBuffer[v0Idx (+1/+2)] etc.,
 *                                            //   and the flat face normal at
 *                                            //   faceNormalsBuffer[faceIdx*3 (+1/+2)]
 *     faceIdx, mesh, meshFaceIdx,            // this face's renderer-internal index (for
 *                                            //   colorBuffer/clipGeometryBuffer/
 *                                            //   faceNormalsBuffer above), this MeshComponent,
 *                                            //   and mesh.faces[meshFaceIdx] for pulling
 *                                            //   uvs/textureImage yourself
 *     ambientLightRgb, lightsIndexBuffer, gameObjects, // raw scene lighting data, if you
 *                                            //   want to replicate/customize lighting
 *     fogType, fogColor, fogNearPane, fogFarPane, // active camera fog settings - see
 *                                            //   CameraComponent.FogType for fogType values
 *     palette16,                             // renderer's precomputed 65536-entry color
 *                                            //   table (5-6-5 packed key -> "#rrggbb"
 *                                            //   string) - index into this instead of
 *                                            //   building color strings yourself, same as
 *                                            //   every built-in shader does, to avoid
 *                                            //   allocating a string per face per frame
 *     ctxStateBuffer,                        // Int32Array(3): [fillStyle key,
 *                                            //   strokeStyle key, lineStyle tag] - the
 *                                            //   renderer's live ctx-style dedup state,
 *                                            //   shared across every face this frame
 *                                            //   regardless of which shader draws it
 *   )
 *
 * The function owns the canvas: it must do its own ctx.save()/clip()/fill()/drawImage()/
 * restore() (see flatShader.js/avgFlatShader.js for the clip-to-triangle idiom used for affine
 * texture mapping), and must leave ctx.globalCompositeOperation as "source-over" and
 * ctx.globalAlpha as 1.0 before returning.
 *
 * ctxStateBuffer works differently from a plain scratch value: the renderer hands you its
 * live dedup cache instead of resetting it around your call, so a long run of same-colored
 * faces - whether built-in or registered - still only touches the canvas once. This only
 * stays correct if you keep it in sync: if you set fillStyle/strokeStyle, write the same key
 * you used into ctxStateBuffer[0]/[1]; if you set lineWidth/lineJoin, write your own tag into
 * ctxStateBuffer[2]. If you don't want to bother with the bookkeeping, just write -1 into
 * whichever slot you touched - that forces whichever shader runs next to set it explicitly
 * instead of trusting a stale value. Leaving a slot's old value in place while actually
 * changing the matching ctx property is the one thing that will visibly corrupt later faces.
 *
 * @param {function} shaderFn
 * @returns {number} the numeric key - set MeshComponent#shaderType to this value.
 */
export function registerShader(shaderFn) {
  const key = nextKey++;
  shaderRegistry[key] = shaderFn;
  return key;
}
