import { flatShaderFill } from "./flatFill/index.js";
import { emissiveShader } from "./emissiveShader.js";
import { unlitShader } from "./unlitShader.js";
import { avgFlatShaderFill, avgFlatShaderShade } from "./avgFlatFill/index.js";
import { smoothShaderFill } from "./smoothFill.js";
import { whiteFillShade } from "../shared/shaders.js";
import { smoothShaderShade } from "./smoothShade.js";
import { flatShaderShade } from "./flatShade/index.js";

export const shaderRegistry = [];

export const shadeShaderRegistry = [];
let nextKey = 5;

// Built-ins (keys 0-4) are registered here too, purely for consistency with consumer shaders -
// Canvas2dRenderer.js's drawTriangles/shadeTriangles switch statements still call them directly
// by fixed key (see their case comments), never through these arrays.
shaderRegistry[0] = flatShaderFill;
shadeShaderRegistry[0] = flatShaderShade;
shaderRegistry[1] = emissiveShader;
shadeShaderRegistry[1] = whiteFillShade;
shaderRegistry[2] = unlitShader;
shadeShaderRegistry[2] = whiteFillShade;
shaderRegistry[3] = avgFlatShaderFill;
shadeShaderRegistry[3] = avgFlatShaderShade;
shaderRegistry[4] = smoothShaderFill;
shadeShaderRegistry[4] = smoothShaderShade;

/**
 * Registers a consumer shader (see Canvas2dRenderer.js's drawTriangles/shadeTriangles default
 * cases): fillFn/shadeFn take the same large fixed positional-argument list as the built-ins
 * (match an existing shader's exact signature rather than a subset of it). Returns the numeric
 * key to set as a mesh's shaderType - meshes hold only this key, never a function reference.
 */
export function registerShader(fillFn, shadeFn) {
  const key = nextKey++;
  shaderRegistry[key] = fillFn;
  if (shadeFn) shadeShaderRegistry[key] = shadeFn;
  return key;
}
