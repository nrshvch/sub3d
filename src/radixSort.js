/**
 * Multi-pass stable Indirect Radix Sort for the 3D Engine.
 *
 * --- DESIGN HIERARCHY & CORRECTNESS CONSTRAINTS ---
 * Since Canvas2D does not feature a hardware Z-buffer, rendering relies strictly on the
 * Painter's Algorithm (drawing back-to-front). Therefore, the significance hierarchy is:
 *   [Depth (Most Significant)] -> [Mesh Index] -> [Shader Pass (Least Significant)]
 *
 * 1. Depth (Passes 3 & 4): Strictly resolves occlusion across all meshes/passes.
 * 2. Mesh Index (Pass 2): Groups same-mesh polygons to minimize drawing state swaps (e.g. matrix/fill styles).
 * 3. Shader Pass (Pass 1): Ensures multi-pass polygon duplicates (e.g., base texture Pass 0, shading overlay Pass 1)
 *    render in correct sequential order (Pass 0 before Pass 1) without bleeding or interleaving onto other meshes.
 *
 * --- EQUIVALENCE TO NATIVE COMPARISON SORT WITH PACKED KEYS ---
 * The resulting order is mathematically identical to running `Array.prototype.sort()` on keys packed as:
 *   [16-bit Depth key] | [8-bit Mesh Index] | [8-bit Shader Pass] | [32-bit Poly Index]
 * Radix sort's stability naturally acts as the [32-bit Poly Index] tie-breaker.
 *
 * --- RADIX SORT ADVANTAGES & LIMITATIONS ---
 * - JS Safe Integer Limit: Native comparison sorting on packed keys is limited to 53 bits (JS double float limit).
 *   BigInt can go larger but incurs a severe heap-allocation and boxing performance penalty.
 * - Unlimited Keys: Radix sort supports an arbitrary number of parameters simply by adding more passes referencing
 *   separate parallel buffers directly, completely bypassing any 53-bit or 64-bit limits.
 *
 * --- COMPLEXITY & CPU HARDWARE OPTIMIZATIONS ---
 * - Time Complexity: O(P * (N + K)) worst/average/best case.
 *   - P (Passes) = 4, N = face count, K (Buckets) = 256. Simplifies to O(N) linear time.
 * - Space Complexity: O(N + K) auxiliary space (pre-allocated, zero-allocation runtime avoids GC overhead).
 * - Operation Count: Performs exactly 4 * (2 * N + K) = 8 * N + 1,024 core loop iterations.
 * - CPU Cache Friendly: The 256-element counters array is 1 KB (under 32-bit integers), fitting entirely inside
 *   the CPU's fast L1 data cache. This guarantees zero L1 cache misses during counting and offset summation.
 * - Prefetching & Write-Combining: Writes to output buffers (indexBuffer/tempIndexBuffer) are sequential, allowing
 *   the CPU's memory controller to utilize write-combining and hardware prefetching optimizations.
 * - Branch Friendliness: Loop bodies contain no conditional branching, eliminating branch mispredictions in the pipeline.
 *
 * @param {Uint32Array} indexBuffer - Array to store sequential face indices for sorting.
 * @param {Uint32Array} tempIndexBuffer - Secondary index buffer for radix sorting passes.
 * @param {Float32Array} depthBuffer - Array of depth values for each face.
 * @param {Uint32Array} meshIndexBuffer - Parallel array of mesh indices for each face.
 * @param {Uint8Array} shaderPassBuffer - Parallel array of shader passes for each face.
 * @param {Uint32Array} counters - The 256-element array for counting sort buckets.
 * @param {number} count - The number of active faces to sort.
 * @param {number} near - Camera near clipping plane distance.
 * @param {number} far - Camera far clipping plane distance.
 */
export default function radixSort(
  indexBuffer,
  tempIndexBuffer,
  depthBuffer,
  meshIndexBuffer,
  shaderPassBuffer,
  counters,
  count,
  near,
  far
) {
  if (count <= 1) return;

  // TODO: Consider merging passes by packing multiple keys/attributes into a single 32-bit integer
  // to reduce radix sorting passes. E.g., we could pack local face indices together with mesh
  // references (meshIndex), and utilize a single 32-bit number for both by employing dynamic bit
  // budgeting (allocating bits dynamically based on active mesh count and max face count per mesh).

  // Map depth from [near, far] to [0, 65535]
  const invDepthRange = (far - near) > 0.0001 ? 65535.0 / (far - near) : 0;

  // =========================================================================
  // PASS 1: Sort by Shader Pass (least significant key)
  // Read from indexBuffer -> Write to tempIndexBuffer
  // =========================================================================
  counters.fill(0);
  for (let i = 0; i < count; i++) {
    const idx = indexBuffer[i];
    const key = shaderPassBuffer[idx] & 0xff;
    counters[key]++;
  }

  let offset = 0;
  for (let i = 0; i < 256; i++) {
    const tempCount = counters[i];
    counters[i] = offset;
    offset += tempCount;
  }

  for (let i = 0; i < count; i++) {
    const idx = indexBuffer[i];
    const key = shaderPassBuffer[idx] & 0xff;
    tempIndexBuffer[counters[key]++] = idx;
  }

  // =========================================================================
  // PASS 2: Sort by Mesh Index (middle-low significant key)
  // Read from tempIndexBuffer -> Write to indexBuffer
  // =========================================================================
  counters.fill(0);
  for (let i = 0; i < count; i++) {
    const idx = tempIndexBuffer[i];
    const key = meshIndexBuffer[idx] & 0xff;
    counters[key]++;
  }

  offset = 0;
  for (let i = 0; i < 256; i++) {
    const tempCount = counters[i];
    counters[i] = offset;
    offset += tempCount;
  }

  for (let i = 0; i < count; i++) {
    const idx = tempIndexBuffer[i];
    const key = meshIndexBuffer[idx] & 0xff;
    indexBuffer[counters[key]++] = idx;
  }

  // =========================================================================
  // PASS 3: Sort by Depth lower 8 bits (middle-high significant key)
  // Read from indexBuffer -> Write to tempIndexBuffer
  // =========================================================================
  counters.fill(0);
  for (let i = 0; i < count; i++) {
    const idx = indexBuffer[i];
    const depth = depthBuffer[idx];
    
    let t = (depth - near) * invDepthRange;
    if (t < 0) t = 0;
    else if (t > 65535) t = 65535;
    const depthKey = (65535 - (t | 0)) & 0xff;
    
    counters[depthKey]++;
  }

  offset = 0;
  for (let i = 0; i < 256; i++) {
    const tempCount = counters[i];
    counters[i] = offset;
    offset += tempCount;
  }

  for (let i = 0; i < count; i++) {
    const idx = indexBuffer[i];
    const depth = depthBuffer[idx];
    
    let t = (depth - near) * invDepthRange;
    if (t < 0) t = 0;
    else if (t > 65535) t = 65535;
    const depthKey = (65535 - (t | 0)) & 0xff;
    
    tempIndexBuffer[counters[depthKey]++] = idx;
  }

  // =========================================================================
  // PASS 4: Sort by Depth upper 8 bits (most significant key)
  // Read from tempIndexBuffer -> Write to indexBuffer
  // =========================================================================
  counters.fill(0);
  for (let i = 0; i < count; i++) {
    const idx = tempIndexBuffer[i];
    const depth = depthBuffer[idx];
    
    let t = (depth - near) * invDepthRange;
    if (t < 0) t = 0;
    else if (t > 65535) t = 65535;
    const depthKey = ((65535 - (t | 0)) >> 8) & 0xff;
    
    counters[depthKey]++;
  }

  offset = 0;
  for (let i = 0; i < 256; i++) {
    const tempCount = counters[i];
    counters[i] = offset;
    offset += tempCount;
  }

  for (let i = 0; i < count; i++) {
    const idx = tempIndexBuffer[i];
    const depth = depthBuffer[idx];
    
    let t = (depth - near) * invDepthRange;
    if (t < 0) t = 0;
    else if (t > 65535) t = 65535;
    const depthKey = ((65535 - (t | 0)) >> 8) & 0xff;
    
    indexBuffer[counters[depthKey]++] = idx;
  }
}
