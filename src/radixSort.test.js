import { describe, it, expect } from "vitest";
import radixSort from "./radixSort.js";

// Builds the typed-array inputs radixSort expects from a small, readable face list, runs the
// sort, and maps the result back to labels so assertions read as label arrays instead of raw
// indices. `bucket` is translated to a depth value via near=0/far=65535 (so depthKey = 65535 -
// bucket exactly - see radixSort.js's pass 3 comment for the formula), making bucket numbers -
// and therefore their odd/even parity - easy to pick by hand.
function runSort(faces) {
  const count = faces.length;
  const indexBuffer = new Uint32Array(count);
  const tempIndexBuffer = new Uint32Array(count);
  const depthBuffer = new Float32Array(count);
  const meshIndexBuffer = new Uint32Array(count);
  const shaderPassBuffer = new Uint8Array(count);
  const counters = new Uint32Array(256);

  faces.forEach((face, i) => {
    indexBuffer[i] = i;
    depthBuffer[i] = 65535 - face.bucket;
    meshIndexBuffer[i] = face.mesh;
    shaderPassBuffer[i] = face.shaderPass || 0;
  });

  radixSort(
    indexBuffer,
    tempIndexBuffer,
    depthBuffer,
    meshIndexBuffer,
    shaderPassBuffer,
    counters,
    count,
    0,
    65535,
  );

  return Array.from(indexBuffer).map((idx) => faces[idx].label);
}

describe("radixSort", () => {
  it("sorts a single bucket by ascending mesh index (baseline, no serpentine involved)", () => {
    // bucket 4 is even, so this is plain ascending order - isolates "basic sort still works"
    // from "does the serpentine tie-break work", which the other tests cover separately.
    const faces = [
      { label: "g0", mesh: 3, bucket: 4 },
      { label: "g1", mesh: 1, bucket: 4 },
      { label: "g2", mesh: 2, bucket: 4 },
    ];

    expect(runSort(faces)).toEqual(["g1", "g2", "g0"]);
  });

  it("never reorders faces at genuinely different depths, regardless of mesh index", () => {
    // Farther face (bucket 0) has a deliberately higher mesh index than the nearer one (bucket
    // 5) - depth must still win, since mesh index is only ever a same-bucket tie-break.
    const faces = [
      { label: "h0", mesh: 9, bucket: 0 },
      { label: "h1", mesh: 0, bucket: 5 },
    ];

    expect(runSort(faces)).toEqual(["h0", "h1"]);
  });

  describe("serpentine tie-break across adjacent buckets, and preserved sub-ordering", () => {
    // 5 mesh indices (0-4), 2 shader passes (0-1), 3 consecutive buckets (0 even, 1 odd, 2 even).
    const faces = [
      { label: "f0", mesh: 2, bucket: 0, shaderPass: 0 }, // mesh2, first of two - shaderPass tie-break
      { label: "f1", mesh: 2, bucket: 0, shaderPass: 1 }, // mesh2, second - must sort after f0
      { label: "f2", mesh: 4, bucket: 0, shaderPass: 0 }, // highest mesh index in bucket 0
      { label: "f3", mesh: 0, bucket: 0, shaderPass: 0 }, // lowest mesh index in bucket 0
      { label: "f4", mesh: 4, bucket: 1, shaderPass: 0 }, // mesh4 again, in bucket 1 - should land next to f2
      { label: "f5", mesh: 3, bucket: 1, shaderPass: 0 }, // mesh3, first of two - true full tie with f6, in an odd bucket
      { label: "f6", mesh: 3, bucket: 1, shaderPass: 0 }, // mesh3, second - identical keys to f5
      { label: "f7", mesh: 1, bucket: 1, shaderPass: 0 }, // lowest mesh index in bucket 1
      { label: "f8", mesh: 1, bucket: 2, shaderPass: 0 }, // mesh1 again, in bucket 2 - should land next to f7
      { label: "f8b", mesh: 1, bucket: 2, shaderPass: 0 }, // mesh1, true full tie with f8, in an even bucket
      { label: "f9", mesh: 3, bucket: 2, shaderPass: 0 },
    ];

    it("matches the fully hand-derived order", () => {
      // Pass 2 (mesh ascending, stable) runs BEFORE pass 3 - so each bucket's pre-pass-3
      // encounter order is already mesh-ascending, not submission order. Bucket 0 (even) and
      // bucket 2 (even) keep that ascending order as-is; bucket 1 (odd) reverses its *entire*
      // ascending encounter order [f7,f5,f6,f4] (mesh 1,3,3,4) into [f4,f6,f5,f7] - note f6
      // before f5, the tied pair reversed along with everything else, not preserved.
      expect(runSort(faces)).toEqual([
        "f3", "f0", "f1", "f2", "f4", "f6", "f5", "f7", "f8", "f8b", "f9",
      ]);
    });

    it("connects the high-extremal mesh across the bucket 0/1 boundary (f2 -> f4)", () => {
      const order = runSort(faces);
      const i = order.indexOf("f2");
      expect(order[i + 1]).toBe("f4");
    });

    it("connects the low-extremal mesh across the bucket 1/2 boundary (f7 -> f8)", () => {
      const order = runSort(faces);
      const i = order.indexOf("f7");
      expect(order[i + 1]).toBe("f8");
    });

    it("keeps shaderPass ascending within a same-mesh, same-bucket tie (f0 before f1)", () => {
      const order = runSort(faces);
      expect(order.indexOf("f0")).toBeLessThan(order.indexOf("f1"));
    });

    it("preserves original submission order for a fully-tied pair in an even (non-reversed) bucket (f8 before f8b)", () => {
      const order = runSort(faces);
      expect(order.indexOf("f8")).toBeLessThan(order.indexOf("f8b"));
    });

    it("does NOT preserve submission order for a fully-tied pair in an odd (reversed) bucket (f6 before f5)", () => {
      // This is the flip side of the f8/f8b case above: "original order preserved" only holds
      // where the bucket isn't being reversed. Inside an odd bucket, even a true full tie gets
      // swapped along with everything else - see the "matches the fully hand-derived order" test.
      const order = runSort(faces);
      expect(order.indexOf("f6")).toBeLessThan(order.indexOf("f5"));
    });
  });

  it("reverses a mesh's own internal face order too, not just which mesh comes first", () => {
    // r1,b1 in an even bucket; r2,r3,r4,b2,b3,b4 all in the next (odd) bucket. The reversed
    // bucket's fill direction applies to its whole encounter order, so red's own faces come out
    // reversed (r4,r3,r2) too, not just red-vs-blue's relative position - see radixSort.js's
    // pass 3 comment.
    const faces = [
      { label: "r1", mesh: 0, bucket: 8 },
      { label: "r2", mesh: 0, bucket: 9 },
      { label: "r3", mesh: 0, bucket: 9 },
      { label: "r4", mesh: 0, bucket: 9 },
      { label: "b1", mesh: 1, bucket: 8 },
      { label: "b2", mesh: 1, bucket: 9 },
      { label: "b3", mesh: 1, bucket: 9 },
      { label: "b4", mesh: 1, bucket: 9 },
    ];

    expect(runSort(faces)).toEqual([
      "r1", "b1", "b4", "b3", "b2", "r4", "r3", "r2",
    ]);
  });
});
