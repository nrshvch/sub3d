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
import { flatShader } from "./shaders/flatShader.js";
import { emissiveShader } from "./shaders/emissiveShader.js";
import { unlitShader } from "./shaders/unlitShader.js";
import { smoothShader } from "./shaders/smoothShader.js";
import { avgFlatShader } from "./shaders/avgFlatShader.js";
import { registerShader } from "./shaders/shaderRegistry.js";

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
  // Registers a consumer shader function and returns the numeric key to assign to
  // MeshComponent#shaderType (see shaders/shaderRegistry.js for the full argument contract).
  registerShader: registerShader,
  // sub3d's own built-in shaders (reserved as shaderType 0/1/2/3/4 respectively - no
  // registration needed), also usable directly as a reference for writing an original shader.
  shaders: {
    flat: flatShader,
    emissive: emissiveShader,
    unlit: unlitShader,
    avgFlat: avgFlatShader,
    smooth: smoothShader,
  },
};
