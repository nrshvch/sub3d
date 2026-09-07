import { flatFill, STATS_FILL_DRAW_CALLS } from "../../shared/shaders.js";
import {
  createTextureWeldState,
  textureWeldAddFace,
  textureWeldFlushAll,
  textureWeldReset,
} from "./textureWeld.js";

// This pass's pending charts. The renderer never allocates, passes, or knows about it.
const weldState = createTextureWeldState();

/**
 * Textured fill, welded and drawn as pattern fills.
 *
 * Canvas2D can only draw an image under an affine transform, so a textured surface is drawn by
 * solving for the affine that carries UVs onto screen positions. Where that map goes is what makes
 * it cheap: putting it on the CONTEXT and building the path in TEXTURE space turns a textured face
 * into an ordinary `fill()`, because a pattern lives in user space and user space is now texture
 * space. No clip, no save/restore, no drawImage - and every rule that applies to a flat fill
 * applies unchanged. The conventional recipe (clip to the screen triangle, then drawImage through
 * the map) records and rasterises several times more for the same pixels. The map goes on the
 * context and never on the pattern, whose own matrix is far more expensive to record.
 *
 * Faces are not drawn one at a time. Coplanar neighbours sharing a texture map are merged into one
 * chart first - see textureWeld.js - so a box side's two triangles become a single path, single
 * transform, single fill, with the shared diagonal never rasterised. The seams that remain, where
 * one chart meets the next, are closed there too - by a sub-pixel outward offset, since a pattern
 * fill has no way to match the flat welder's stroke. Only the edges whose neighbour is drawn later
 * move, which is what keeps the offset invisible - see computeExpandMasks. This shader's only jobs
 * are to reject faces with no usable texture and to hand the rest to the welder.
 *
 * @type {import("../shaderRegistry.js").ShaderFn}
 */
export function textureShaderFill(
  ctx,
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
  v0Idx,
  v1Idx,
  v2Idx,
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
  // 1 bit per triangle edge: this face owns that edge's seam repair and must push it outward at
  // flush. See computeExpandMasks in shared/shaders.js and textureWeldFlushSlot below.
  expandMask,
) {
  if (weldState.frameId !== frameId) {
    // Charts left over from a frame that is over: drop them rather than painting last frame's
    // geometry. A defensive backstop - `last` normally empties every slot at the end of a pass.
    textureWeldReset(weldState);
    weldState.frameId = frameId;
  }

  const img = mesh.textureImage;

  if (img && img.complete && img.naturalWidth > 0 && mesh.uvs) {
    const uvs = mesh.uvs;
    const ov0 = mesh.faces[meshFaceIdx] * 2;
    const ov1 = mesh.faces[meshFaceIdx + 1] * 2;
    const ov2 = mesh.faces[meshFaceIdx + 2] * 2;

    const imgW = img.width;
    const imgH = img.height;
    const U0 = uvs[ov0] * imgW;
    const V0 = uvs[ov0 + 1] * imgH;
    const U1 = uvs[ov1] * imgW;
    const V1 = uvs[ov1 + 1] * imgH;
    const U2 = uvs[ov2] * imgW;
    const V2 = uvs[ov2 + 1] * imgH;

    const delta = U0 * (V1 - V2) - V0 * (U1 - U2) + (U1 * V2 - U2 * V1);

    // A degenerate UV triangle has no invertible mapping - fall through to the flat colour rather
    // than dividing by ~0 and drawing the image at an arbitrary transform.
    if (Math.abs(delta) > 0.00001) {
      textureWeldAddFace(
        weldState,
        ctx,
        ctxStateBuffer,
        statsBuffer,
        STATS_FILL_DRAW_CALLS,
        mesh,
        faceNormalsBuffer[faceIdx * 3],
        faceNormalsBuffer[faceIdx * 3 + 1],
        faceNormalsBuffer[faceIdx * 3 + 2],
        U0,
        V0,
        v0Idx,
        px0,
        py0,
        U1,
        V1,
        v1Idx,
        px1,
        py1,
        U2,
        V2,
        v2Idx,
        px2,
        py2,
        expandMask,
      );

      if (last) {
        textureWeldFlushAll(
          weldState,
          ctx,
          ctxStateBuffer,
          statsBuffer,
          STATS_FILL_DRAW_CALLS,
        );
      }
      return;
    }
  }

  // No usable texture yet - an image still loading, or UVs that do not form a triangle. Draw the
  // base colour instead of nothing: the face still has to cover what is behind it, and a mesh that
  // vanished until its image arrived would show through to whatever the sort put underneath.
  //
  // Drawn immediately, so everything already deferred that it may overlap has to go down first.
  textureWeldFlushAll(
    weldState,
    ctx,
    ctxStateBuffer,
    statsBuffer,
    STATS_FILL_DRAW_CALLS,
  );

  const color32 = colorBuffer[faceIdx * 3];
  const color16 =
    (((color32 >>> 16) & 0xf8) << 8) |
    (((color32 >>> 8) & 0xfc) << 3) |
    ((color32 & 0xf8) >> 3);

  flatFill(
    ctx,
    px0,
    py0,
    px1,
    py1,
    px2,
    py2,
    color16,
    0,
    ctxStateBuffer,
    statsBuffer,
  );
}
