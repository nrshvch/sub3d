import {
  createGouraudWeldState,
  gouraudWeldAddFace,
  gouraudWeldFlushAll,
  gouraudWeldReset,
} from "./gouraudWeld.js";

// This pass's pending geometry, keyed on a shading field rather than one flat intensity.
const weldState = createGouraudWeldState();

/**
 * Shade pass for Gouraud-shaded faces: lights each corner from its own vertex normal and hands the
 * three lit colours to the welder, which merges faces sharing one shading field and draws each
 * merged chart as a single gradient - or a single flat fill where the field turns out constant.
 *
 * A face's albedo is untouched, so this pairs with any fill shader; GOURAUD_SHADE pairs it with the
 * flat one. Fog is not read here at all - it is its own pass now.
 *
 * NOTE the identity arguments. Every other shader is handed WELDED vertex identities in `v0Idx` and
 * friends; this one is handed the vertexBuffer OFFSETS, because it has to read
 * `vertexNormalsBuffer`, which is written at those offsets. They serve as adjacency identities too:
 * `destructMesh` dedups them per mesh vertex, so two faces sharing a mesh vertex get one offset.
 * The difference from a welded identity is that positions split across two indices are not seen as
 * one - which cannot cost this shader a merge, since a mesh whose corners are split has no shared
 * vertex normal to interpolate and no business being smooth-shaded.
 *
 * @param {CanvasRenderingContext2D} shadeCtx destination shade layer
 * @param {number} px0 screen x of the first corner, in `shadeCtx`'s own pixel space
 * @param {number} py0 screen y of the first corner
 * @param {number} px1 screen x of the second corner
 * @param {number} py1 screen y of the second corner
 * @param {number} px2 screen x of the third corner
 * @param {number} py2 screen y of the third corner
 * @param {Float32Array} clipGeometryBuffer camera-space position per face vertex, 9 per face
 * @param {Uint32Array} colorBuffer packed 0xRRGGBB per face vertex, 3 per face
 * @param {Float32Array} vertexNormalsBuffer world-space vertex normals, at vertexBuffer offsets
 * @param {Float32Array} faceNormalsBuffer world-space face normal, 3 per face
 * @param {number} v0Offset offset of the first corner into vertexBuffer/vertexNormalsBuffer - see
 *   the note above on why this is an offset and not a welded identity
 * @param {number} v1Offset offset of the second corner
 * @param {number} v2Offset offset of the third corner
 * @param {number} faceIdx this face's index into the per-face buffers above
 * @param {object} mesh the owning MeshComponent
 * @param {number} meshFaceIdx this face's offset into `mesh.faces`
 * @param {number} ambientLightRgb camera ambient light, packed 0xRRGGBB
 * @param {Uint32Array} lightsIndexBuffer light object indices, length in element 0
 * @param {object[]} gameObjects the frame's flat object array, indexed by the lights buffer
 * @param {number} fogType camera fog mode - unused, fog is its own pass
 * @param {number} fogColor packed fog colour - unused
 * @param {number} fogNearPane fog start distance - unused
 * @param {number} fogFarPane fog end distance - unused
 * @param {number} meshIdx index of the owning mesh within this layer
 * @param {Int32Array} ctxStateBuffer shared cache of what is currently set on `shadeCtx`
 * @param {Int32Array} statsBuffer shared per-frame counters
 * @param {number} frameId increments once per render() call; compared against the welder's own
 *   stored value to detect state that predates this frame
 * @param {boolean} last this is the final face of a contiguous run of this shaderKey - the face is
 *   handled normally first, then whatever is still open is flushed
 * @param {number} expandMask 1 bit per triangle edge (edge k runs from corner k to corner k+1), set
 *   where this face owns that edge's seam repair - see computeExpandMasks in shared/shaders.js
 */
export function gouraudShaderShade(
  shadeCtx,
  px0,
  py0,
  px1,
  py1,
  px2,
  py2,
  clipGeometryBuffer,
  colorBuffer,
  vertexNormalsBuffer,
  faceNormalsBuffer,
  v0Offset,
  v1Offset,
  v2Offset,
  faceIdx,
  mesh,
  meshFaceIdx,
  ambientLightRgb,
  lightsIndexBuffer,
  gameObjects,
  fogType,
  fogColor,
  fogNearPane,
  fogFarPane,
  meshIdx,
  ctxStateBuffer,
  statsBuffer,
  frameId,
  last,
  expandMask,
) {
  // Lit colour per corner, in 0-255 light units. Kept unquantised all the way into the welder: the
  // field is fitted from these, and quantising first would make a smooth falloff fit like a
  // staircase and cost every merge across a band boundary.
  const ambR = (ambientLightRgb >>> 16) & 255;
  const ambG = (ambientLightRgb >>> 8) & 255;
  const ambB = ambientLightRgb & 255;

  let r0 = ambR,
    g0 = ambG,
    b0 = ambB;
  let r1 = ambR,
    g1 = ambG,
    b1 = ambB;
  let r2 = ambR,
    g2 = ambG,
    b2 = ambB;

  const nx0 = vertexNormalsBuffer[v0Offset];
  const ny0 = vertexNormalsBuffer[v0Offset + 1];
  const nz0 = vertexNormalsBuffer[v0Offset + 2];
  const nx1 = vertexNormalsBuffer[v1Offset];
  const ny1 = vertexNormalsBuffer[v1Offset + 1];
  const nz1 = vertexNormalsBuffer[v1Offset + 2];
  const nx2 = vertexNormalsBuffer[v2Offset];
  const ny2 = vertexNormalsBuffer[v2Offset + 1];
  const nz2 = vertexNormalsBuffer[v2Offset + 2];

  const lightsCount = lightsIndexBuffer[0];
  for (let l = 1; l <= lightsCount; l++) {
    const lightGO = gameObjects[lightsIndexBuffer[l]];
    if (lightGO.light.type !== 0 /* DIRECTIONAL */) continue;

    const lightColor32 = lightGO.light.color;
    const lightR = (lightColor32 >>> 16) & 255;
    const lightG = (lightColor32 >>> 8) & 255;
    const lightB = lightColor32 & 255;

    const lx = -lightGO.transform.worldMatrix[8];
    const ly = -lightGO.transform.worldMatrix[9];
    const lz = -lightGO.transform.worldMatrix[10];

    const d0 = nx0 * lx + ny0 * ly + nz0 * lz;
    const d1 = nx1 * lx + ny1 * ly + nz1 * lz;
    const d2 = nx2 * lx + ny2 * ly + nz2 * lz;

    // Three separate gates rather than one: a face straddling the terminator has some corners lit
    // and some not, which is the whole point of shading it per vertex.
    if (d0 > 0) {
      r0 += lightR * d0;
      g0 += lightG * d0;
      b0 += lightB * d0;
    }
    if (d1 > 0) {
      r1 += lightR * d1;
      g1 += lightG * d1;
      b1 += lightB * d1;
    }
    if (d2 > 0) {
      r2 += lightR * d2;
      g2 += lightG * d2;
      b2 += lightB * d2;
    }
  }

  // Clamp here, before the fit. The shade layer represents intensity as an opaque 0-255 colour for
  // `multiply`, which structurally cannot exceed 1x the base colour, so an overbright corner has to
  // saturate at "fully lit" - and a field fitted through an unclamped corner would tilt the whole
  // chart to reach a value no pixel can show.
  if (r0 > 255) r0 = 255;
  if (g0 > 255) g0 = 255;
  if (b0 > 255) b0 = 255;
  if (r1 > 255) r1 = 255;
  if (g1 > 255) g1 = 255;
  if (b1 > 255) b1 = 255;
  if (r2 > 255) r2 = 255;
  if (g2 > 255) g2 = 255;
  if (b2 > 255) b2 = 255;

  if (weldState.frameId !== frameId) {
    // State from a frame that is over: drop it rather than painting last frame's geometry.
    gouraudWeldReset(weldState);
    weldState.frameId = frameId;
  }

  gouraudWeldAddFace(
    weldState,
    shadeCtx,
    ctxStateBuffer,
    statsBuffer,
    r0,
    g0,
    b0,
    px0,
    py0,
    v0Offset,
    r1,
    g1,
    b1,
    px1,
    py1,
    v1Offset,
    r2,
    g2,
    b2,
    px2,
    py2,
    v2Offset,
    expandMask,
  );

  if (last) {
    gouraudWeldFlushAll(weldState, shadeCtx, ctxStateBuffer, statsBuffer);
  }
}
