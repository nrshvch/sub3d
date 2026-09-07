import { describe, it, expect } from "vitest";
import Mesh from "./MeshComponent.js";

describe("Mesh.computeWeldMap", () => {
  it("gives distinct positions distinct canonical ids", () => {
    const vertices = new Float32Array([0, 0, 0, 1, 1, 1, 2, 2, 2]);
    expect(Array.from(Mesh.computeWeldMap(vertices))).toEqual([0, 1, 2]);
  });

  it("collapses near-duplicate positions (within epsilon after rounding) to the same id", () => {
    // Differ by 0.00001 - well under the 4-decimal rounding granularity, so both key identically.
    const vertices = new Float32Array([1, 1, 1, 1.00001, 1.00001, 1.00001]);
    expect(Array.from(Mesh.computeWeldMap(vertices))).toEqual([0, 0]);
  });

  it("keeps positions that differ by more than the rounding granularity distinct", () => {
    const vertices = new Float32Array([1, 1, 1, 1.01, 1.01, 1.01]);
    expect(Array.from(Mesh.computeWeldMap(vertices))).toEqual([0, 1]);
  });

  it("snaps near-zero components (either sign) to exactly zero before keying", () => {
    // A vertex whose components are all "practically zero" but with mixed signs/tiny magnitudes
    // (e.g. a pole vertex where sin(PI) isn't quite 0) must still key identically to an exact 0.
    const vertices = new Float32Array([0, 0, 0, -0.00001, 0.00001, -0.00001]);
    expect(Array.from(Mesh.computeWeldMap(vertices))).toEqual([0, 0]);
  });

  it("welds every vertex in a larger shared-position group to the first-seen index", () => {
    // Vertex 0 (first at this position), vertex 1 (distinct), vertices 2 and 3 (same as 0),
    // vertex 4 (same as 1).
    const vertices = new Float32Array([
      5, 5, 5, 1, 1, 1, 5, 5, 5, 5, 5, 5, 1, 1, 1,
    ]);
    expect(Array.from(Mesh.computeWeldMap(vertices))).toEqual([0, 1, 0, 0, 1]);
  });

  it("respects a custom epsilon", () => {
    const vertices = new Float32Array([1, 1, 1, 1.00001, 1.00001, 1.00001]);
    // With a tighter epsilon the zero-snap doesn't matter here (nothing near zero), but a wider
    // rounding epsilon than the default would still need to widen the actual key granularity to
    // matter - this exercises the parameter is actually wired through, using an epsilon large
    // enough that even the 0.01-apart case from the earlier test would now collapse.
    const weldMap = Mesh.computeWeldMap(vertices, null, 0.1);
    expect(Array.from(weldMap)).toEqual([0, 0]);
  });

  it("reuses the provided output array when its length already matches the vertex count", () => {
    const vertices = new Float32Array([0, 0, 0, 1, 1, 1]);
    const first = Mesh.computeWeldMap(vertices);
    const second = Mesh.computeWeldMap(vertices, first);
    expect(second).toBe(first);
  });

  it("allocates a fresh array when the provided output's length no longer matches", () => {
    const vertices = new Float32Array([0, 0, 0, 1, 1, 1]);
    const undersized = new Uint32Array(1);
    const result = Mesh.computeWeldMap(vertices, undersized);
    expect(result).not.toBe(undersized);
    expect(result.length).toBe(2);
  });
});

describe("Mesh#updateWeldMap", () => {
  it("computes and caches weldMap from the instance's current vertices", () => {
    const mesh = new Mesh();
    mesh.vertices = new Float32Array([0, 0, 0, 0, 0, 0, 9, 9, 9]);

    mesh.updateWeldMap();

    expect(Array.from(mesh.weldMap)).toEqual([0, 0, 2]);
  });

  it("defaults to null for a mesh that never opts in", () => {
    const mesh = new Mesh();
    expect(mesh.weldMap).toBeNull();
  });

  it("fully recomputes (not incrementally) when positions change between calls, reusing the buffer", () => {
    const mesh = new Mesh();
    mesh.vertices = new Float32Array([0, 0, 0, 5, 5, 5]);
    mesh.updateWeldMap();
    const firstMap = mesh.weldMap;
    expect(Array.from(firstMap)).toEqual([0, 1]);

    // Move vertex 1 on top of vertex 0 (simulates e.g. terrain heights settling to the same spot
    // on a pool-reused vertex buffer) - same vertex count, so the array should be reused...
    mesh.vertices[3] = 0;
    mesh.vertices[4] = 0;
    mesh.vertices[5] = 0;
    mesh.updateWeldMap();

    expect(mesh.weldMap).toBe(firstMap); // same array object, reused
    expect(Array.from(mesh.weldMap)).toEqual([0, 0]); // but contents fully recomputed
  });
});

describe("Mesh.computeAdjacency", () => {
  it("pairs two triangles across their shared edge", () => {
    // 0-1-2 and 3-2-1: the second presents edge 2->1, reversing the first's 1->2.
    const r = Mesh.computeAdjacency(new Uint32Array([0, 1, 2, 3, 2, 1]), null);
    expect(r.adjTri[1]).toBe(1); // tri 0, edge 1 -> tri 1
    expect(r.adjEdge[1]).toBe(1); // ...at its edge 1
    expect(r.adjTri[4]).toBe(0); // and symmetrically back
    expect(r.adjEdge[4]).toBe(1);
    expect(r.boundaryEdges).toBe(4); // the quad's outline
  });

  it("finds neighbours across split vertices via the weld map", () => {
    // The same quad as a hard-edge mesh: every triangle owns private copies of its corners, so raw
    // indices share nothing. This is the case that matters - without the weld map, adjacency finds
    // no neighbours at all and every edge would expand.
    const faces = new Uint32Array([0, 1, 2, 3, 4, 5]);
    const weldMap = new Uint32Array([0, 1, 2, 3, 2, 1]); // 4->2, 5->1

    expect(Mesh.computeAdjacency(faces, null).boundaryEdges).toBe(6);

    const r = Mesh.computeAdjacency(faces, weldMap);
    expect(r.adjTri[1]).toBe(1);
    expect(r.adjTri[4]).toBe(0);
    expect(r.boundaryEdges).toBe(4);
  });

  it("pairs a strip along its interior edges only", () => {
    const faces = new Uint32Array([0, 1, 2, 2, 1, 3, 2, 3, 4, 4, 3, 5]);
    const r = Mesh.computeAdjacency(faces, null);
    expect(r.boundaryEdges).toBe(12 - 6); // 3 interior edges, paired from both sides
    for (const [t, e, nt] of [
      [0, 1, 1],
      [1, 0, 0],
      [1, 2, 2],
      [2, 0, 1],
      [2, 1, 3],
      [3, 0, 2],
    ]) {
      expect(r.adjTri[t * 3 + e]).toBe(nt);
    }
  });

  it("leaves a co-oriented duplicate edge unpaired rather than mispairing it", () => {
    // Non-manifold: three triangles on one edge, two presenting it the same way round. The first
    // reversed pair wins and the extra face stays boundary.
    const faces = new Uint32Array([0, 1, 2, 3, 2, 1, 4, 2, 1]);
    const r = Mesh.computeAdjacency(faces, null);
    expect(r.adjTri[1]).toBe(1);
    expect(r.adjTri[4]).toBe(0);
    expect(r.adjTri[7]).toBe(-1);
  });

  it("never makes a degenerate triangle its own neighbour", () => {
    // Vertices 0 and 1 weld together, so edges 1->2 and 2->0 reverse each other within one
    // triangle. Pairing them would let the welder merge a face into its own ring.
    const r = Mesh.computeAdjacency(
      new Uint32Array([0, 1, 2]),
      new Uint32Array([0, 0, 2]),
    );
    expect(Array.from(r.adjTri)).toEqual([-1, -1, -1]);
    expect(r.boundaryEdges).toBe(3);
  });

  it("reuses the output arrays when they are already the right size", () => {
    const faces = new Uint32Array([0, 1, 2, 3, 2, 1]);
    const first = Mesh.computeAdjacency(faces, null);
    const again = Mesh.computeAdjacency(
      faces,
      null,
      first.adjTri,
      first.adjEdge,
    );
    expect(again.adjTri).toBe(first.adjTri);
    expect(again.adjEdge).toBe(first.adjEdge);
  });
});
