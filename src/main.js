import config from "./config.js";
import Game from "./Game.js";
import GameObject from "./GameObject.js";
import Component from "./Component.js";
import Camera from "./Camera.js";
import CameraComponent from "./components/CameraComponent.js";
import MeshComponent from "./components/MeshComponent.js";
import TransformComponent from "./components/TransformComponent.js";
import SpriteRenderer from "./components/SpriteRenderer.js";
import * as glMatrix from "gl-matrix";
import PathRenderer from "./components/PathRenderer.js";
import TextRenderer from "./components/TextRenderer.js";
import Plane from "./primitives/Plane.js";
import Box from "./primitives/Box.js";
import Cone from "./primitives/Cone.js";
import Ball from "./primitives/Ball.js";
import Canvas2dViewport from "./Canvas2dViewport.js";
import Light from "./Light.js";
import { showDebug } from "./debug/showDebug.jsx";
import { flatShaderFill } from "./shaders/flatFill/index.js";
import { smoothShaderFill } from "./shaders/smoothFill.js";
import {
  avgFlatShaderFill,
  avgFlatShaderShade,
} from "./shaders/avgFlatFill/index.js";
import {
  registerShader,
  ALBEDO_FLAT,
  TEXTURE,
  EMISSIVE_FLAT,
  AVG_ALBEDO_FLAT,
  SMOOTH_ALBEDO_FLAT,
} from "./shaders/shaderRegistry.js";
import { textureShaderFill } from "./shaders/textureFill/index.js";
import { identityFill } from "./shared/shaders.js";
import { flatShaderShade } from "./shaders/flatShade/index.js";
import { smoothShaderShade } from "./shaders/smoothShade.js";

export default window.scaliaEngine = {
  config: config,
  Game: Game,
  GameObject: GameObject,
  Component: Component,
  Camera: Camera,
  CameraComponent: CameraComponent,
  MeshComponent: MeshComponent,
  TransformComponent: TransformComponent,
  SpriteRenderer: SpriteRenderer,
  glMatrix: glMatrix,
  PathRenderer: PathRenderer,
  TextRenderer: TextRenderer,
  Plane: Plane,
  Box: Box,
  Cone: Cone,
  Ball: Ball,
  Light: Light,
  Canvas2dViewport: Canvas2dViewport,
  showDebug: showDebug,
  registerShader: registerShader,
  whiteFillShade: identityFill,
  // Built-in shaderType keys, to set on a MeshComponent as `meshRenderer.shaderType`.
  ShaderType: {
    ALBEDO_FLAT,
    TEXTURE,
    EMISSIVE_FLAT,
    AVG_ALBEDO_FLAT,
    SMOOTH_ALBEDO_FLAT,
  },
  shaders: {
    flat: { fill: flatShaderFill, shade: flatShaderShade },
    texture: { fill: textureShaderFill, shade: flatShaderShade },
    avgFlat: { fill: avgFlatShaderFill, shade: avgFlatShaderShade },
    smooth: { fill: smoothShaderFill, shade: smoothShaderShade },
  },
};
