import { flatShaderFill } from "./flatFill/index.js";
import { textureShaderFill } from "./textureFill/index.js";
import { avgFlatShaderFill, avgFlatShaderShade } from "./avgFlatFill/index.js";
import { identityFill } from "../shared/shaders.js";
import { flatShaderShade } from "./flatShade/index.js";
import { gouraudShaderShade } from "./gouraudShade/index.js";

export const shaderRegistry = [];

export const shadeShaderRegistry = [];
let nextKey = 6;

export const ALBEDO_FLAT = 0;
export const TEXTURE = 1;
export const EMISSIVE_FLAT = 2;
export const AVG_ALBEDO_FLAT = 3;
export const GOURAUD_SHADE = 4;
// Flat albedo fill, Gouraud shade: the deferred smooth-shading pair. Its fill is ordinary
// flatShaderFill, so all the smoothness lives in the shade layer that multiplies over it.

// Built-ins (keys 0-5) are registered here too, purely for consistency with consumer shaders -
// Canvas2dRenderer.js's fillTriangles/shadeTriangles switch statements still call them directly
// by fixed key (see their case comments), never through these arrays.
shaderRegistry[ALBEDO_FLAT] = flatShaderFill;
shadeShaderRegistry[ALBEDO_FLAT] = flatShaderShade;
// Texture replaces the albedo, not the lighting, so it shades per vertex normal like any other
// smooth mesh. A hard-edged mesh is unaffected - its vertex normals are its face normals.
shaderRegistry[TEXTURE] = textureShaderFill;
shadeShaderRegistry[TEXTURE] = gouraudShaderShade;
shaderRegistry[EMISSIVE_FLAT] = flatShaderFill;
shadeShaderRegistry[EMISSIVE_FLAT] = identityFill;
shaderRegistry[AVG_ALBEDO_FLAT] = avgFlatShaderFill;
shadeShaderRegistry[AVG_ALBEDO_FLAT] = avgFlatShaderShade;
shaderRegistry[GOURAUD_SHADE] = flatShaderFill;
shadeShaderRegistry[GOURAUD_SHADE] = gouraudShaderShade;

/**
 * The fixed positional argument list every fill and shade function takes.
 *
 * Declared once here because it is the contract, not one shader's signature: a shader must match it
 * exactly rather than take a prefix of it, since the renderer dispatches positionally. Reference it
 * from a shader with `@type {ShaderFn}` instead of restating thirty parameters that would then
 * drift apart.
 *
 * @callback ShaderFn
 * @param {CanvasRenderingContext2D} ctx destination for this pass - the fill, shade or fog layer
 * @param {number} px0 screen x of the first corner, in `ctx`'s own pixel space
 * @param {number} py0 screen y of the first corner
 * @param {number} px1 screen x of the second corner
 * @param {number} py1 screen y of the second corner
 * @param {number} px2 screen x of the third corner
 * @param {number} py2 screen y of the third corner
 * @param {Float32Array} clipGeometryBuffer camera-space position per face vertex, 9 per face
 * @param {Uint32Array} colorBuffer packed 0xRRGGBB per face vertex, 3 per face
 * @param {Float32Array} vertexNormalsBuffer world-space vertex normals, 9 per face
 * @param {Float32Array} faceNormalsBuffer world-space face normal, 3 per face
 * @param {number} v0Idx welded vertex identity of the first corner - what adjacency is matched on,
 *   never a coordinate offset (see destructMesh's weldIdBuffer). The exceptions are the two keys
 *   shaded by gouraudShaderShade - TEXTURE and GOURAUD_SHADE - which take vertexBuffer offsets here
 *   instead, because that shader has to read vertexNormalsBuffer; both call sites say so
 * @param {number} v1Idx welded vertex identity of the second corner
 * @param {number} v2Idx welded vertex identity of the third corner
 * @param {number} faceIdx this face's index into the per-face buffers above
 * @param {object} mesh the owning MeshComponent
 * @param {number} meshFaceIdx this face's offset into `mesh.faces`
 * @param {number[]} ambientLightRgb camera ambient light
 * @param {Uint32Array} lightsIndexBuffer light object indices, length in element 0
 * @param {object[]} gameObjects the frame's flat object array, indexed by the lights buffer
 * @param {number} fogType camera fog mode
 * @param {number} fogColor packed fog colour
 * @param {number} fogNearPane fog start distance
 * @param {number} fogFarPane fog end distance
 * @param {number} meshIdx index of the owning mesh within this layer
 * @param {Int32Array} ctxStateBuffer shared cache of what is currently set on `ctx`
 * @param {Int32Array} statsBuffer shared per-frame counters
 * @param {number} frameId increments once per render() call; a shader compares it against a value
 *   stored beside its own state to detect state that predates this frame
 * @param {boolean} last this is the final face of a contiguous run of this shaderKey - handle the
 *   face normally first, then flush whatever is pending. A shader that buffers nothing ignores it
 * @param {number} [expandMask] 1 bit per triangle edge (edge k runs from corner k to corner k+1),
 *   set where this face owns that edge's seam repair - see computeExpandMasks in shared/shaders.js.
 *   Only the batching shaders read it
 * @returns {void}
 */

/**
 * Registers a consumer shader (see Canvas2dRenderer.js's drawTriangles/shadeTriangles default
 * cases): fillFn/shadeFn take the same large fixed positional-argument list as the built-ins
 * (match an existing shader's exact signature rather than a subset of it). Returns the numeric
 * key to set as a mesh's shaderType - meshes hold only this key, never a function reference.
 *
 * The full positional contract every fillFn/shadeFn must implement (fill's first param is
 * `ctx`, shade's is `shadeCtx`; otherwise identical):
 *   (ctx, px0, py0, px1, py1, px2, py2, epx0, epy0, epx1, epy1, epx2, epy2,
 *    clipGeometryBuffer, colorBuffer, vertexNormalsBuffer, faceNormalsBuffer,
 *    v0Idx, v1Idx, v2Idx, faceIdx, mesh, meshFaceIdx,
 *    ambientLightRgb, lightsIndexBuffer, gameObjects,
 *    fogType, fogColor, fogNearPane, fogFarPane,
 *    meshIdx, ctxStateBuffer, statsBuffer,
 *    frameId, last)
 *
 * `meshIdx` is normalized into every shader's signature even though most don't need it yet -
 * every shader shares this one exact shape for consistency, so the fixed positional contract
 * never has to special-case one shader's shape against another's.
 *
 * A shader that wants to persist state across faces (e.g. merging adjacent same-color triangles
 * into one fill - see flatFill/flatShader.js) owns that state entirely itself: declare a
 * module-level scratch array (sized to whatever it needs) in the shader's own file. The renderer
 * never allocates, passes, or knows about it - a shader with nothing to persist (most of them)
 * declares nothing.
 *
 * `frameId` increases by one every `Canvas2dRenderer.render()` call (one value shared by every
 * layer's fill/shade/fog pass that frame, not recomputed per pass). A shader with persistent
 * state stores its own last-seen `frameId` alongside that state and compares on each call: a
 * mismatch means the state predates the current frame and must be treated as empty rather than
 * acted on - a defensive backstop for a state array that somehow didn't get flushed (e.g. an
 * exception mid-pass), since correct operation should mean it's always already empty between
 * uses (see `last` below).
 *
 * `last` arrives alongside a real face - never as a separate, placeholder-only call - and means
 * this is the last face of a contiguous run of this shaderKey (the next face uses a different
 * shaderKey, or this is the final face in the pass). A shader handles the face normally first
 * (merge into its pending state, or draw immediately) and, if `last` is also true, additionally
 * flushes whatever is now pending before returning. A shader that never buffers anything (most
 * built-ins, and any consumer shader that just draws immediately) needs no code for `last` at
 * all - it's simply never referenced.
 *
 * @param {ShaderFn} fillFn fill-pass function for this shader
 * @param {ShaderFn} [shadeFn] shade-pass function; omit for a shader with nothing to shade
 * @returns {number} the shaderKey to assign to a mesh's `shaderType`
 */
export function registerShader(fillFn, shadeFn) {
  const key = nextKey++;
  shaderRegistry[key] = fillFn;
  if (shadeFn) shadeShaderRegistry[key] = shadeFn;
  return key;
}
