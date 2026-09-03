import { flatShaderFill } from "./flatFill/index.js";
import { textureShaderFill } from "./textureFill/index.js";
import { avgFlatShaderFill, avgFlatShaderShade } from "./avgFlatFill/index.js";
import { smoothShaderFill } from "./smoothFill.js";
import { identityFill } from "../shared/shaders.js";
import { smoothShaderShade } from "./smoothShade.js";
import { flatShaderShade } from "./flatShade/index.js";

export const shaderRegistry = [];

export const shadeShaderRegistry = [];
let nextKey = 5;

export const ALBEDO_FLAT = 0;
export const TEXTURE = 1;
export const EMISSIVE_FLAT = 2;
export const AVG_ALBEDO_FLAT = 3;
export const SMOOTH_ALBEDO_FLAT = 4;

// Built-ins (keys 0-4) are registered here too, purely for consistency with consumer shaders -
// Canvas2dRenderer.js's fillTriangles/shadeTriangles switch statements still call them directly
// by fixed key (see their case comments), never through these arrays.
shaderRegistry[ALBEDO_FLAT] = flatShaderFill;
shadeShaderRegistry[ALBEDO_FLAT] = flatShaderShade;
// Texture replaces the albedo, not the lighting, so it shades exactly as the flat colour does.
shaderRegistry[TEXTURE] = textureShaderFill;
shadeShaderRegistry[TEXTURE] = flatShaderShade;
shaderRegistry[EMISSIVE_FLAT] = flatShaderFill;
shadeShaderRegistry[EMISSIVE_FLAT] = identityFill;
shaderRegistry[AVG_ALBEDO_FLAT] = avgFlatShaderFill;
shadeShaderRegistry[AVG_ALBEDO_FLAT] = avgFlatShaderShade;
shaderRegistry[SMOOTH_ALBEDO_FLAT] = smoothShaderFill;
shadeShaderRegistry[SMOOTH_ALBEDO_FLAT] = smoothShaderShade;

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
 */
export function registerShader(fillFn, shadeFn) {
  const key = nextKey++;
  shaderRegistry[key] = fillFn;
  if (shadeFn) shadeShaderRegistry[key] = shadeFn;
  return key;
}
