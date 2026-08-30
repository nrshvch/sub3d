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
