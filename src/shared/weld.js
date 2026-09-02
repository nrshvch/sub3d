import { PALETTE_16BIT } from "../palette.js";

/**
 * Multi-slot edge-cancelling welder.
 *
 * Replaces the single pending polygon the flat batchers used to keep. The problem it solves is
 * measured, not theoretical: with one slot, a triangle can only merge with the face that came
 * immediately before it, and in a depth-sorted stream that face usually has a different colour or
 * mesh - on a typical land view only ~14% of faces even reach the edge test, and at a shallow
 * camera tilt the single-slot batcher merges 2 faces out of ~3900. Holding N polygons open at once
 * lets a face merge with any of them, which is what makes the sort's interleaving survivable.
 *
 * Every flush emits ONE closed polygon: `beginPath / moveTo / lineTo* / stroke / fill`.
 * There are no subpaths. That is the whole point - a path holding many overlapping subpaths is one
 * draw call but a far harder rasterization problem, because nonzero-winding fill has to resolve the
 * union across all of them. Profiling put 36% of a frame inside a single such `fill()`.
 *
 * WHY MERGED POLYGONS ARE SAFE TO FILL. A merged boundary is not guaranteed simple - a ridge
 * occluding terrain behind it puts two edge-connected front faces in overlapping screen regions.
 * That is fine, because the property that matters is stronger and does hold: winding number is
 * additive over edge sets, and a cancelled edge pair is exactly anti-parallel and so contributes
 * zero winding everywhere. Every face survives the same backface test (destructMesh culls on the
 * sign of the screen-space cross product), so each term is non-negative, so the merged winding is
 * non-negative everywhere. Nonzero fill of the merged boundary is therefore exactly the union of
 * the faces that went into it - never a hole, self-intersecting or not.
 *
 * WHY DEFERRAL NEEDS A GUARD. A slot holds geometry back until it flushes, so faces merged early
 * are painted later than the sort placed them. Same-colour faces are order-free (filling C over C
 * is idempotent), but a differently-coloured face arriving in between would be wrongly overpainted.
 * Unguarded this is severe - measured at 61% of overlapping cross-colour pairs inverted, an order
 * of magnitude worse than the depth-band coarsening already rejected as visibly broken. So
 * so `weldAddFace` flushes every open slot whenever the incoming colour differs from the last -
 * one integer compare per face. See the guard comment in `weldAddFace` for why the exact per-slot
 * screen-AABB test it replaced measured worse on both cost and merge rate.
 *
 * State is passed explicitly on every call rather than captured in closure scope, and the per-face
 * edge lookups are exported separately so callers can inline them.
 */

// 64, in two int32 free-mask words. Sized from measurement: the fill pass on a horizon view has
// ~555 connected same-colour components live at once, but the overlap guard retires a slot as soon
// as a differently-coloured face lands on it, so concurrency stays far below that. 64 and 128
// merge identically (2860 fill calls); 32 does not.
export const N_SLOTS = 64;
export const MAX_POLY_VERTS = 128;

const POOL_CAP = 2048; // measured peak concurrent nodes at these settings: ~570
const EDGE_CAP = 4096; // power of two; live edges <= POOL_CAP so load stays under 0.25
const EDGE_MASK = EDGE_CAP - 1;

// Slot lanes. Stride 8 so `slot << 3` indexes without a multiply.
const SL_STRIDE = 8;
const SL_COLOR = 0; // -1 = free
const SL_HEAD = 1; // pool index of some node on the ring
const SL_LEN = 2;
const SL_SEQ = 3; // face counter when last extended - drives victim selection
const SL_MESH = 4;

// Scalars that have to be mutable by reference.
const SC_FREEMASK = 0; // slots 0-31
const SC_FREEMASK2 = 5; // slots 32-63
const SC_FREEHEAD = 1;
const SC_GEN = 2;
const SC_SEQ = 3;
const SC_LIVE = 4;

export function createWeldState() {
  const st = {
    slots: new Int32Array(N_SLOTS * SL_STRIDE),
    // Screen bounds per slot, as [x0, y0, x1, y1]. The overlap guard's only input.
    aabb: new Float32Array(N_SLOTS * 4),
    poolX: new Float32Array(POOL_CAP),
    poolY: new Float32Array(POOL_CAP),
    poolId: new Int32Array(POOL_CAP),
    poolNext: new Int32Array(POOL_CAP),
    poolSlot: new Int8Array(POOL_CAP),
    eFrom: new Int32Array(EDGE_CAP),
    eTo: new Int32Array(EDGE_CAP),
    eNode: new Int32Array(EDGE_CAP),
    eStamp: new Int32Array(EDGE_CAP),
    scal: new Int32Array(8),
    emitX: new Float32Array(MAX_POLY_VERTS),
    emitY: new Float32Array(MAX_POLY_VERTS),
    frameId: -1,
    evictions: 0,
  };
  st.scal[SC_GEN] = 1;
  weldReset(st);
  return st;
}

/**
 * Drops every open polygon without drawing. Only correct for state left over from a previous
 * frame - never as a "cancel" for the frame in progress.
 */
export function weldReset(st) {
  const slots = st.slots;
  for (let i = 0; i < N_SLOTS; i++) slots[i * SL_STRIDE + SL_COLOR] = -1;
  st.scal[SC_FREEMASK] = -1; // slots 0-31 free
  st.scal[SC_FREEMASK2] = -1; // slots 32-63 free

  // Relink the whole pool. O(POOL_CAP) but called once per pass per frame at most, against
  // thousands of faces - not worth the bookkeeping needed to skip it safely.
  const next = st.poolNext;
  const ps = st.poolSlot;
  for (let i = 0; i < POOL_CAP - 1; i++) {
    next[i] = i + 1;
    ps[i] = -1;
  }
  next[POOL_CAP - 1] = -1;
  ps[POOL_CAP - 1] = -1;
  st.scal[SC_FREEHEAD] = 0;
  st.scal[SC_LIVE] = 0;

  st.scal[SC_GEN]++; // clears the edge table in O(1) - every stamp is now stale
  st.scal[SC_SEQ] = 0;
}

// --- edge table -------------------------------------------------------------------------------
// Open-addressed, linear probing, keyed on the DIRECTED edge (from -> to). An entry maps that edge
// to the ring node it leaves from, so `poolNext[node]` is the edge's other end.

function edgeHash(from, to) {
  let h = Math.imul(from, 0x9e3779b1) ^ Math.imul(to, 0x85ebca77);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2545f491);
  h ^= h >>> 13;
  return h & EDGE_MASK;
}

/** @returns the ring node owning directed edge (from -> to), or -1. */
export function edgeFind(st, from, to) {
  const gen = st.scal[SC_GEN];
  const eF = st.eFrom;
  const eT = st.eTo;
  const eS = st.eStamp;
  let i = edgeHash(from, to);
  for (let p = 0; p < EDGE_CAP; p++) {
    if (eS[i] !== gen) return -1; // empty slot ends the probe chain
    if (eF[i] === from && eT[i] === to) return st.eNode[i];
    i = (i + 1) & EDGE_MASK;
  }
  return -1;
}

function edgeInsert(st, from, to, node) {
  const gen = st.scal[SC_GEN];
  const eF = st.eFrom;
  const eT = st.eTo;
  const eS = st.eStamp;
  let i = edgeHash(from, to);
  for (let p = 0; p < EDGE_CAP; p++) {
    if (eS[i] !== gen) {
      eF[i] = from;
      eT[i] = to;
      st.eNode[i] = node;
      eS[i] = gen;
      return;
    }
    // A duplicate directed edge means two front-facing faces share an edge with the same
    // orientation - impossible on manifold geometry, possible on hand-authored meshes. Keep the
    // incumbent: the cost is a missed merge, never a corrupted ring.
    if (eF[i] === from && eT[i] === to) return;
    i = (i + 1) & EDGE_MASK;
  }
}

/**
 * Backward-shift deletion (Knuth 6.4 Alg. R). Tombstones are not an option here: roughly three
 * inserts per face against a 4096-entry table would saturate one within a frame.
 */
function edgeDelete(st, from, to) {
  const gen = st.scal[SC_GEN];
  const eF = st.eFrom;
  const eT = st.eTo;
  const eS = st.eStamp;
  const eN = st.eNode;

  let i = edgeHash(from, to);
  let found = false;
  for (let p = 0; p < EDGE_CAP; p++) {
    if (eS[i] !== gen) break;
    if (eF[i] === from && eT[i] === to) {
      found = true;
      break;
    }
    i = (i + 1) & EDGE_MASK;
  }
  if (!found) return;

  let j = i;
  for (;;) {
    eS[i] = gen - 1; // any stamp other than gen reads as empty
    j = (j + 1) & EDGE_MASK;
    if (eS[j] !== gen) return;
    const k = edgeHash(eF[j], eT[j]);
    // Keep j where it is if its home slot lies cyclically within (i, j].
    const keep = i <= j ? i < k && k <= j : i < k || k <= j;
    if (keep) continue;
    eF[i] = eF[j];
    eT[i] = eT[j];
    eN[i] = eN[j];
    eS[i] = gen;
    i = j;
  }
}

// --- ring nodes -------------------------------------------------------------------------------

function nodeAlloc(st, x, y, id, slot) {
  const n = st.scal[SC_FREEHEAD];
  if (n === -1) return -1;
  st.scal[SC_FREEHEAD] = st.poolNext[n];
  st.poolX[n] = x;
  st.poolY[n] = y;
  st.poolId[n] = id;
  st.poolNext[n] = -1;
  st.poolSlot[n] = slot;
  st.scal[SC_LIVE]++;
  return n;
}

function nodeFree(st, n) {
  // A freed node's outgoing edge must leave the table with it, or a later lookup resolves to a
  // recycled node and merges into the wrong ring.
  const nx = st.poolNext[n];
  if (nx !== -1) edgeDelete(st, st.poolId[n], st.poolId[nx]);
  st.poolSlot[n] = -1;
  st.poolId[n] = -1;
  st.poolNext[n] = st.scal[SC_FREEHEAD];
  st.scal[SC_FREEHEAD] = n;
  st.scal[SC_LIVE]--;
}

/** Points `a` at `b`, keeping the edge table in step with a's outgoing edge. */
function relink(st, a, b) {
  const oldNext = st.poolNext[a];
  if (oldNext !== -1) edgeDelete(st, st.poolId[a], st.poolId[oldNext]);
  st.poolNext[a] = b;
  if (b !== -1) edgeInsert(st, st.poolId[a], st.poolId[b], a);
}

// --- flushing ---------------------------------------------------------------------------------

/**
 * Emits one slot as a single closed polygon and releases it.
 *
 * Collinear vertices are dropped here and only here. Doing it incrementally on merge would destroy
 * the vertex identity a later triangle needs in order to find that edge, cutting the merge rate;
 * at flush the slot's edges are being removed from the table anyway, so it folds into the emit walk
 * for free. The test compares against the last EMITTED point so a chain of near-collinear vertices
 * decimates in one forward pass, and it also drops sub-pixel needle tips - desirable, since the 1px
 * stroke covers them and they are exactly what produces miter spikes.
 */
export function weldFlushSlot(
  st,
  slot,
  ctx,
  ctxStateBuffer,
  styleSlot,
  sawRealSlot,
  statsBuffer,
  callsSlot,
  eps,
) {
  const slots = st.slots;
  const base = slot * SL_STRIDE;
  const color16 = slots[base + SL_COLOR];
  if (color16 === -1) return;

  const head = slots[base + SL_HEAD];
  const len = slots[base + SL_LEN];
  const poolNext = st.poolNext;
  const poolX = st.poolX;
  const poolY = st.poolY;
  const poolId = st.poolId;
  const emitX = st.emitX;
  const emitY = st.emitY;

  // Walk the ring once: collect points, decimate, and drop the slot's edges as we go.
  const eps2 = eps * eps;
  let out = 0;
  let n = head;
  for (let k = 0; k < len; k++) {
    const nx = poolNext[n];
    const x = poolX[n];
    const y = poolY[n];

    if (out < 2) {
      emitX[out] = x;
      emitY[out] = y;
      out++;
    } else {
      const px = emitX[out - 2];
      const py = emitY[out - 2];
      const qx = emitX[out - 1];
      const qy = emitY[out - 1];
      const ax = qx - px;
      const ay = qy - py;
      const bx = x - px;
      const by = y - py;
      const cross = ax * by - ay * bx;
      if (cross * cross <= eps2 * (bx * bx + by * by)) {
        emitX[out - 1] = x; // q was collinear between p and this point - replace it
        emitY[out - 1] = y;
      } else {
        emitX[out] = x;
        emitY[out] = y;
        out++;
      }
    }

    if (nx !== -1) edgeDelete(st, poolId[n], poolId[nx]);
    n = nx;
  }

  // Free the ring after walking it, so the walk still sees intact ids.
  n = head;
  for (let k = 0; k < len; k++) {
    const nx = poolNext[n];
    poolNext[n] = -1; // edges were already dropped in the walk above
    nodeFree(st, n);
    n = nx;
  }

  slots[base + SL_COLOR] = -1;
  if (slot < 32) st.scal[SC_FREEMASK] |= 1 << slot;
  else st.scal[SC_FREEMASK2] |= 1 << (slot - 32);

  // Close the decimation around the wrap.
  //
  // The forward pass emits its first two points before any collinearity test is possible, and the
  // ring is walked from an arbitrary head, so a vertex that is collinear across the seam survives -
  // up to two per polygon, on every polygon. Re-test the two ends against their true cyclic
  // neighbours. Dropping the head is done by advancing `start` rather than shifting the buffer.
  let start = 0;
  while (out - start >= 4) {
    const px = emitX[out - 2], py = emitY[out - 2];
    const qx = emitX[out - 1], qy = emitY[out - 1];
    const rx = emitX[start], ry = emitY[start];
    const ax = qx - px, ay = qy - py, bx = rx - px, by = ry - py;
    const cr = ax * by - ay * bx;
    if (cr * cr > eps2 * (bx * bx + by * by)) break;
    out--;
  }
  while (out - start >= 4) {
    const px = emitX[out - 1], py = emitY[out - 1];
    const qx = emitX[start], qy = emitY[start];
    const rx = emitX[start + 1], ry = emitY[start + 1];
    const ax = qx - px, ay = qy - py, bx = rx - px, by = ry - py;
    const cr = ax * by - ay * bx;
    if (cr * cr > eps2 * (bx * bx + by * by)) break;
    start++;
  }

  if (out - start < 3) return; // fully degenerate after decimation - nothing to draw

  if (ctxStateBuffer[styleSlot] !== color16) {
    const style = PALETTE_16BIT[color16];
    ctx.fillStyle = style;
    ctx.strokeStyle = style;
    // 1, matching what the per-triangle batcher used before welding.
    //
    // The theory says otherwise and the theory loses here. Once triangles are welded each seam is
    // stroked from one side only, so the two half-pixel displacements no longer cancel, and an
    // RMSE sweep against a 2x supersampled reference agrees: 6.23 / 4.18 / 2.75 / 3.56 at 0.35 /
    // 0.5 / 0.75 / 1.0. But every width below 1 leaves seam gaps that are visible in motion on
    // this content, judged directly on screen. Two reasons to distrust the metric rather than the
    // eye: the reference is itself a 1-supersampled-pixel stroke, so it under-covers exactly where
    // seams are worst and biases the sweep thin; and RMSE averages over the whole frame, where a
    // hairline of background is a small number of pixels but the most conspicuous artifact in it.
    ctx.lineWidth = 1;
    // Miter: the browser default, and the join engines optimise hardest.
    ctx.lineJoin = "miter";
    ctxStateBuffer[styleSlot] = color16;
    if (sawRealSlot !== -1 && color16 !== 0xffff)
      ctxStateBuffer[sawRealSlot] = 1;
  }

  // Canvas2D composites each fill's antialiased coverage separately, so two polygons sharing a
  // boundary each cover ~50% of the pixels along it, and source-over of two 50% coverages is 75% -
  // a hairline of background shows through. Painting that coverage back with a stroke in the fill
  // colour is the only repair canvas2d offers. Stroke first, then fill: the fill repaints the
  // inner half, so the stroke only ever extends coverage outward.
  ctx.beginPath();
  ctx.moveTo(emitX[start], emitY[start]);
  for (let k = start + 1; k < out; k++) ctx.lineTo(emitX[k], emitY[k]);
  // Close the loop with an explicit lineTo, NOT closePath(). Two separate reasons, both load-bearing:
  // stroke() does not draw the closing edge of an unclosed subpath (fill() closes it implicitly, so
  // without this one edge per polygon is filled but never stroked - an unrepaired seam on every
  // shape); and in Blink closePath() recomputes the whole path's bounds per call, O(N^2) in subpaths.
  ctx.lineTo(emitX[start], emitY[start]);
  ctx.stroke();
  ctx.fill();

  statsBuffer[callsSlot]++;
}

/**
 * Flushes every open slot, oldest-seeded first so deferred geometry lands roughly in the order the
 * sort placed it.
 */
export function weldFlushAll(
  st,
  ctx,
  ctxStateBuffer,
  styleSlot,
  sawRealSlot,
  statsBuffer,
  callsSlot,
  eps,
) {
  const slots = st.slots;
  for (;;) {
    let best = -1;
    let bestSeq = 0x7fffffff;
    for (let s = 0; s < N_SLOTS; s++) {
      const b = s * SL_STRIDE;
      if (slots[b + SL_COLOR] === -1) continue;
      if (slots[b + SL_SEQ] < bestSeq) {
        bestSeq = slots[b + SL_SEQ];
        best = s;
      }
    }
    if (best === -1) return;
    weldFlushSlot(
      st,
      best,
      ctx,
      ctxStateBuffer,
      styleSlot,
      sawRealSlot,
      statsBuffer,
      callsSlot,
      eps,
    );
  }
}

// --- adding a face ----------------------------------------------------------------------------

/**
 * Merges one triangle into the open slots, flushing whatever has to be flushed first.
 *
 * The triangle's three directed edges are (id0->id1), (id1->id2), (id2->id0). A consistently wound
 * neighbour presents the shared edge REVERSED, so a match is a lookup of (id1->id0) and friends.
 * Cases, and what each costs:
 *
 *   1 match          insert the third vertex between the matched node and its successor    +1 vert
 *   2, same slot     the two matched edges are consecutive around the triangle and adjacent
 *   (a notch)        in the ring, so both cancel and the shared vertex disappears          -1 vert
 *   2, two slots     splice the rings together across the two cancelled edges       |A|+|B|-1
 *   0 / refused      take a free slot, evicting the least-recently-extended if full
 *
 * The notch is not an edge case - it fires far more often than the two-slot splice (1581 vs 101 on
 * one measured frame) and the old single-slot batcher refused it outright, which cost about 2.4x on
 * path vertices. Refusals are correctness-neutral: they cost one extra polygon.
 */
export function weldAddFace(
  st,
  ctx,
  ctxStateBuffer,
  styleSlot,
  sawRealSlot,
  statsBuffer,
  callsSlot,
  eps,
  color16,
  meshIdx,
  x0,
  y0,
  id0,
  x1,
  y1,
  id1,
  x2,
  y2,
  id2,
) {
  const slots = st.slots;

  // Deferral guard.
  //
  // Within one colour deferral is FREE: filling colour C over colour C is idempotent, so two
  // same-colour faces are order-interchangeable whether or not they overlap. The only thing
  // deferral can break is a differently-coloured face that should have painted over one still held
  // open. So flush exactly those: every open slot whose colour differs AND whose screen bounds meet
  // this face's.
  //
  // Sound by construction. For any violating pair (near N, far F, different colours, overlapping),
  // F was submitted first, so either F's slot has already flushed, or it is still open holding F's
  // bounds - which therefore meet N's, and differ in colour, and so are flushed here before N is
  // placed. Slots are single-colour, so F and N are never co-resident. The invariant that no two
  // co-resident slots of different colours overlap is maintained by this same test: a slot's bounds
  // only ever grow by a face that was itself checked against every other slot first.
  //
  // The version this replaces flushed EVERY open slot on any colour change. That is also sound and
  // costs one integer compare instead of a scan - but it is why extra slots bought nothing, because
  // a depth-sorted stream changes colour constantly and slots never survived long enough to be
  // merged into. Measured on a horizon view, this takes the fill pass from 6867 draw calls to 2860,
  // against a floor of 555 connected same-colour components.
  const fx0 = x0 < x1 ? (x0 < x2 ? x0 : x2) : x1 < x2 ? x1 : x2;
  const fx1 = x0 > x1 ? (x0 > x2 ? x0 : x2) : x1 > x2 ? x1 : x2;
  const fy0 = y0 < y1 ? (y0 < y2 ? y0 : y2) : y1 < y2 ? y1 : y2;
  const fy1 = y0 > y1 ? (y0 > y2 ? y0 : y2) : y1 > y2 ? y1 : y2;
  // A straight indexed walk of all N_SLOTS, not an iteration over the free-mask bits: occupancy is
  // high enough in practice that the branchy two-word bit walk measured slower (25.3 vs 23.2 ms),
  // and the colour test rejects a free slot just as cheaply.
  const aabb = st.aabb;
  for (let gs = 0; gs < N_SLOTS; gs++) {
    const gc = slots[gs * SL_STRIDE + SL_COLOR];
    if (gc === -1 || gc === color16) continue;
    const ga = gs << 2;
    if (aabb[ga] > fx1 || aabb[ga + 2] < fx0) continue;
    if (aabb[ga + 1] > fy1 || aabb[ga + 3] < fy0) continue;
    weldFlushSlot(
      st,
      gs,
      ctx,
      ctxStateBuffer,
      styleSlot,
      sawRealSlot,
      statsBuffer,
      callsSlot,
      eps,
    );
  }

  const seq = ++st.scal[SC_SEQ];
  const poolSlot = st.poolSlot;
  const poolNext = st.poolNext;

  // Reversed-edge lookups. m[k] owns the polygon edge that cancels triangle edge k.
  let m0 = edgeFind(st, id1, id0);
  let m1 = edgeFind(st, id2, id1);
  let m2 = edgeFind(st, id0, id2);

  // A match only counts if its slot holds this exact colour - slots are single-colour by
  // construction, which is what makes the guard above sound.
  let s0 = m0 === -1 ? -1 : poolSlot[m0];
  let s1 = m1 === -1 ? -1 : poolSlot[m1];
  let s2 = m2 === -1 ? -1 : poolSlot[m2];
  if (s0 !== -1 && slots[s0 * SL_STRIDE + SL_COLOR] !== color16) {
    m0 = -1;
    s0 = -1;
  }
  if (s1 !== -1 && slots[s1 * SL_STRIDE + SL_COLOR] !== color16) {
    m1 = -1;
    s1 = -1;
  }
  if (s2 !== -1 && slots[s2 * SL_STRIDE + SL_COLOR] !== color16) {
    m2 = -1;
    s2 = -1;
  }

  const matches =
    (m0 !== -1 ? 1 : 0) + (m1 !== -1 ? 1 : 0) + (m2 !== -1 ? 1 : 0);

  if (matches === 2) {
    // Identify the consecutive pair (i, i+1). Any two of three triangle edges are cyclically
    // consecutive, so this always resolves.
    let i, mi, mj, si, sj;
    if (m0 !== -1 && m1 !== -1) {
      i = 0;
      mi = m0;
      mj = m1;
      si = s0;
      sj = s1;
    } else if (m1 !== -1 && m2 !== -1) {
      i = 1;
      mi = m1;
      mj = m2;
      si = s1;
      sj = s2;
    } else {
      i = 2;
      mi = m2;
      mj = m0;
      si = s2;
      sj = s0;
    }

    if (si === sj) {
      // Notch: both edges bound the same ring. Only mergeable when the shared vertex's node sits
      // directly between them - otherwise the two matched edges bound different parts of the loop
      // and splicing would fission it, so refuse and let the face seed a new slot.
      if (poolNext[mj] === mi) {
        const b = si * SL_STRIDE;
        relink(st, mj, poolNext[mi]);
        // mi is about to be freed, so the head must not still point at it. mj survives and is on
        // the same ring, so it is always a valid replacement.
        if (slots[b + SL_HEAD] === mi) slots[b + SL_HEAD] = mj;
        nodeFree(st, mi);
        slots[b + SL_LEN]--;
        slots[b + SL_SEQ] = seq;
        const na = si << 2;
        if (fx0 < aabb[na]) aabb[na] = fx0;
        if (fy0 < aabb[na + 1]) aabb[na + 1] = fy0;
        if (fx1 > aabb[na + 2]) aabb[na + 2] = fx1;
        if (fy1 > aabb[na + 3]) aabb[na + 3] = fy1;
        return;
      }
    } else {
      const bA = si * SL_STRIDE;
      const bB = sj * SL_STRIDE;
      const merged = slots[bA + SL_LEN] + slots[bB + SL_LEN] - 1;
      if (merged <= MAX_POLY_VERTS) {
        const uNode = poolNext[mi]; // A's copy of the vertex the surviving edge runs to
        const vNodeB = poolNext[mj]; // B's duplicate of the shared vertex - this one dies
        const after = poolNext[vNodeB]; // must be read before it is freed

        // vNodeB holds the SAME directed edge (v -> after) that mi is about to take over, and
        // edgeInsert keeps the incumbent on a duplicate key. Drop it first, and detach vNodeB so
        // nodeFree does not then delete the entry mi just claimed.
        if (after !== -1) edgeDelete(st, st.poolId[vNodeB], st.poolId[after]);
        poolNext[vNodeB] = -1;

        relink(st, mi, after);
        relink(st, mj, uNode);
        nodeFree(st, vNodeB);

        // Retag the WHOLE merged ring. Walking either original length is wrong now that the two
        // rings are already spliced - it would leave part of B still reporting slot sj, which is
        // about to be released and reused for another colour.
        let n = mi;
        for (let k = 0; k < merged; k++) {
          poolSlot[n] = si;
          n = poolNext[n];
          if (n === -1) break;
        }
        // mi is guaranteed live and on the merged ring, so it is a safe head.
        slots[bA + SL_HEAD] = mi;
        slots[bA + SL_LEN] = merged;
        slots[bA + SL_SEQ] = seq;
        const sa = si << 2;
        const sbB = sj << 2;
        if (aabb[sbB] < aabb[sa]) aabb[sa] = aabb[sbB];
        if (aabb[sbB + 1] < aabb[sa + 1]) aabb[sa + 1] = aabb[sbB + 1];
        if (aabb[sbB + 2] > aabb[sa + 2]) aabb[sa + 2] = aabb[sbB + 2];
        if (aabb[sbB + 3] > aabb[sa + 3]) aabb[sa + 3] = aabb[sbB + 3];
        if (fx0 < aabb[sa]) aabb[sa] = fx0;
        if (fy0 < aabb[sa + 1]) aabb[sa + 1] = fy0;
        if (fx1 > aabb[sa + 2]) aabb[sa + 2] = fx1;
        if (fy1 > aabb[sa + 3]) aabb[sa + 3] = fy1;
        slots[bB + SL_COLOR] = -1;
        if (sj < 32) st.scal[SC_FREEMASK] |= 1 << sj;
        else st.scal[SC_FREEMASK2] |= 1 << (sj - 32);
        return;
      }
    }
  } else if (matches === 1) {
    const mm = m0 !== -1 ? m0 : m1 !== -1 ? m1 : m2;
    const ss = m0 !== -1 ? s0 : m1 !== -1 ? s1 : s2;
    const b = ss * SL_STRIDE;
    if (slots[b + SL_LEN] < MAX_POLY_VERTS) {
      // The new vertex is the triangle corner not on the matched edge.
      const nx = m0 !== -1 ? x2 : m1 !== -1 ? x0 : x1;
      const ny = m0 !== -1 ? y2 : m1 !== -1 ? y0 : y1;
      const nid = m0 !== -1 ? id2 : m1 !== -1 ? id0 : id1;
      const nn = nodeAlloc(st, nx, ny, nid, ss);
      if (nn !== -1) {
        relink(st, nn, poolNext[mm]);
        relink(st, mm, nn);
        slots[b + SL_LEN]++;
        slots[b + SL_SEQ] = seq;
        const ea = ss << 2;
        if (fx0 < aabb[ea]) aabb[ea] = fx0;
        if (fy0 < aabb[ea + 1]) aabb[ea + 1] = fy0;
        if (fx1 > aabb[ea + 2]) aabb[ea + 2] = fx1;
        if (fy1 > aabb[ea + 3]) aabb[ea + 3] = fy1;
        return;
      }
    }
  }

  // No usable merge: seed a fresh slot, evicting the least-recently-extended if none are free.
  // Oldest-created would be actively wrong - a long-lived, still-growing strip is exactly what we
  // want to keep; least-recently-extended is the direct signal that the sweep has moved past a slot.
  let slot = -1;
  const freeMask = st.scal[SC_FREEMASK];
  const freeMask2 = st.scal[SC_FREEMASK2];
  if (freeMask !== 0) {
    slot = 31 - Math.clz32(freeMask & -freeMask);
  } else if (freeMask2 !== 0) {
    slot = 63 - Math.clz32(freeMask2 & -freeMask2);
  } else {
    let bestSeq = 0x7fffffff;
    for (let s = 0; s < N_SLOTS; s++) {
      const q = slots[s * SL_STRIDE + SL_SEQ];
      if (q < bestSeq) {
        bestSeq = q;
        slot = s;
      }
    }
    weldFlushSlot(
      st,
      slot,
      ctx,
      ctxStateBuffer,
      styleSlot,
      sawRealSlot,
      statsBuffer,
      callsSlot,
      eps,
    );
    st.evictions++;
  }

  const n0 = nodeAlloc(st, x0, y0, id0, slot);
  const n1 = nodeAlloc(st, x1, y1, id1, slot);
  const n2 = nodeAlloc(st, x2, y2, id2, slot);
  if (n0 === -1 || n1 === -1 || n2 === -1) {
    // Pool exhausted - should not happen at these capacities, but degrade to dropping the face's
    // membership rather than corrupting a ring.
    if (n0 !== -1) nodeFree(st, n0);
    if (n1 !== -1) nodeFree(st, n1);
    if (n2 !== -1) nodeFree(st, n2);
    return;
  }
  relink(st, n0, n1);
  relink(st, n1, n2);
  relink(st, n2, n0);

  const b = slot * SL_STRIDE;
  slots[b + SL_COLOR] = color16;
  slots[b + SL_MESH] = meshIdx;
  slots[b + SL_HEAD] = n0;
  slots[b + SL_LEN] = 3;
  slots[b + SL_SEQ] = seq;
  const fa = slot << 2;
  aabb[fa] = fx0;
  aabb[fa + 1] = fy0;
  aabb[fa + 2] = fx1;
  aabb[fa + 3] = fy1;
  if (slot < 32) st.scal[SC_FREEMASK] &= ~(1 << slot);
  else st.scal[SC_FREEMASK2] &= ~(1 << (slot - 32));
}
