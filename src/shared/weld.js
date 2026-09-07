/**
 * @file Multi-slot edge-cancelling welder.
 *
 * Merges edge-adjacent same-colour triangles into a single polygon boundary, so one `fill()`
 * covers what would otherwise be many. A shared edge appears twice with opposite direction; both
 * copies are dropped and the two rings become one.
 *
 * Holding many polygons open at once, rather than one, is what makes a depth-sorted stream
 * weldable: with a single slot a triangle can only merge with the face immediately before it, and
 * after sorting that face usually belongs to a different colour or mesh.
 *
 * Every flush emits ONE simple closed polygon, never subpaths. A path holding many overlapping
 * subpaths is a single draw call but a far harder rasterization, since nonzero-winding fill has to
 * resolve the union across all of them.
 *
 * A merged boundary is not guaranteed to be simple, and does not need to be. Winding number is
 * additive over edge sets and a cancelled edge pair is exactly anti-parallel, contributing zero
 * winding everywhere; every face arrives with the same screen orientation, because backface
 * culling admits only one sign. So the merged winding is non-negative everywhere and a nonzero
 * fill of the boundary is exactly the union of the faces that went into it - never a hole.
 *
 * All state is passed in explicitly rather than captured in closure scope, so one module can serve
 * several independent passes at once.
 */

import { PALETTE_16BIT, WHITE16 } from "../palette.js";

// Polygons kept open at once, tracked by two int32 free-mask words. Enough that a face usually
// finds its neighbour still open; past that, the added scan costs more than the merges it wins.
export const N_SLOTS = 64;
export const MAX_POLY_VERTS = 128;

// Outward offset applied to a boundary edge whose neighbour is drawn LATER, in destination pixels.
// One pixel, not a half: a pixel straddling the boundary needs the earlier polygon to cover ALL of
// it, and half a pixel measurably leaves gap standing. Past 1px nothing further changes.
export const EXPAND = 1;

// Slack on the deferral guard's overlap test, one EXPAND for each of the two faces. A flush paints
// up to EXPAND outside the geometry it was handed, so two regions that merely ABUT still contend
// for the pixels along their shared edge while overlapping by exactly zero.
const GUARD_DILATE = 2 * EXPAND;

const POOL_CAP = 2048; // ring nodes, with headroom over the peak held across all slots
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

/**
 * Allocates one welder's worth of state. Every buffer it will ever need is allocated here and
 * reused for the life of the page; nothing is allocated per frame or per face.
 *
 * One state per pass, never shared. Passes run over different colour spaces and interleave in
 * time, so a polygon left open by one is meaningless to another.
 *
 * @returns {object} opaque state, passed back into every other function here
 */
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
    // 1 where the boundary edge LEAVING this node must be pushed outward at flush, i.e. the face
    // across it is drawn later. See the expansion note in weldFlushSlot.
    poolExpand: new Uint8Array(POOL_CAP),
    eFrom: new Int32Array(EDGE_CAP),
    eTo: new Int32Array(EDGE_CAP),
    eNode: new Int32Array(EDGE_CAP),
    eStamp: new Int32Array(EDGE_CAP),
    scal: new Int32Array(8),
    emitX: new Float32Array(MAX_POLY_VERTS),
    emitY: new Float32Array(MAX_POLY_VERTS),
    emitF: new Uint8Array(MAX_POLY_VERTS),
    frameId: -1,
    evictions: 0,
  };
  st.scal[SC_GEN] = 1;
  weldReset(st);
  return st;
}

/**
 * Drops every open polygon without drawing, and empties the edge table.
 *
 * Only correct for state left over from a previous frame - never as a "cancel" for the frame in
 * progress, which would silently lose geometry.
 *
 * @param {object} st welder state
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

/**
 * Mixes a directed edge into a table index. Both endpoints are welded vertex identities.
 *
 * @param {number} from vertex identity the edge leaves
 * @param {number} to vertex identity the edge arrives at
 * @returns {number} index into the edge table, already masked to its capacity
 */
function edgeHash(from, to) {
  let h = Math.imul(from, 0x9e3779b1) ^ Math.imul(to, 0x85ebca77);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2545f491);
  h ^= h >>> 13;
  return h & EDGE_MASK;
}

/**
 * Looks up the ring node that owns a directed edge.
 *
 * @param {object} st welder state
 * @param {number} from vertex identity the edge leaves
 * @param {number} to vertex identity the edge arrives at
 * @returns {number} the ring node owning (from -> to), or -1 when the table holds no such edge
 */
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

/**
 * Records that `node` owns the directed edge (from -> to).
 *
 * A duplicate directed edge means two front-facing faces present it the same way round, which
 * manifold geometry cannot do. The incumbent is kept: that costs a missed merge, never a corrupted
 * ring.
 *
 * @param {object} st welder state
 * @param {number} from vertex identity the edge leaves
 * @param {number} to vertex identity the edge arrives at
 * @param {number} node ring node the edge leaves from
 */
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
 * Removes a directed edge from the table.
 *
 * Backward-shift deletion (Knuth 6.4 Alg. R). Tombstones are not an option here: roughly three
 * inserts per face against a 4096-entry table would saturate one within a frame.
 *
 * @param {object} st welder state
 * @param {number} from vertex identity the edge leaves
 * @param {number} to vertex identity the edge arrives at
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

/**
 * Takes a node off the free list and fills it in. Never allocates - the pool is sized once.
 *
 * @param {object} st welder state
 * @param {number} x screen x of the boundary vertex
 * @param {number} y screen y of the boundary vertex
 * @param {number} id its welded vertex identity, which is what adjacency is matched on
 * @param {number} slot the polygon this node belongs to
 * @returns {number} the node, or -1 if the pool is exhausted
 */
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

/**
 * Returns a node to the free list, dropping the edge it owned.
 *
 * The outgoing edge must leave the table with the node, or a later lookup resolves to a recycled
 * node and merges into the wrong ring.
 *
 * @param {object} st welder state
 * @param {number} n node to release
 */
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

/**
 * Points `a` at `b`, keeping the edge table in step with a's outgoing edge.
 *
 * @param {object} st welder state
 * @param {number} a node whose successor changes
 * @param {number} b new successor, or -1 to leave `a` dangling
 */
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
 * Collinear vertices are dropped here and only here. Removing one on merge would destroy the vertex
 * identity a later triangle needs to find that edge, cutting the merge rate; at flush the slot's
 * edges are being dropped from the table anyway, so it folds into the emit walk for free. The test
 * compares against the last EMITTED point, so a chain of near-collinear vertices decimates in a
 * single forward pass.
 *
 * @param {object} st welder state
 * @param {number} slot slot to emit; a free slot is a no-op
 * @param {CanvasRenderingContext2D} ctx destination context
 * @param {Int32Array} ctxStateBuffer shared cache of what is currently set on `ctx`
 * @param {number} styleSlot index in `ctxStateBuffer` holding the colour `ctx` is set to
 * @param {number} sawRealSlot index to raise when a colour other than white is drawn, or -1
 * @param {Int32Array} statsBuffer shared per-frame counters
 * @param {number} callsSlot index in `statsBuffer` counting draw calls
 * @param {number} eps perpendicular deviation, in destination pixels, below which a boundary
 *   vertex is dropped. Small on purpose: dropping a vertex from a boundary shared with a
 *   differently-coloured region opens a hairline T-junction crack, because the neighbour still
 *   has a vertex there.
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
  const poolExpand = st.poolExpand;
  const emitX = st.emitX;
  const emitY = st.emitY;
  const emitF = st.emitF;

  // Walk the ring once: collect points, decimate, and drop the slot's edges as we go.
  const eps2 = eps * eps;
  let out = 0;
  let n = head;
  for (let k = 0; k < len; k++) {
    const nx = poolNext[n];
    const x = poolX[n];
    const y = poolY[n];
    const fl = poolExpand[n];

    if (out < 2) {
      emitX[out] = x;
      emitY[out] = y;
      emitF[out] = fl;
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
      // A collinear run only collapses when its two edges agree on expansion: one offset has to
      // serve the whole merged run, and picking either would open a seam or bloat a silhouette.
      if (
        emitF[out - 2] === emitF[out - 1] &&
        cross * cross <= eps2 * (bx * bx + by * by)
      ) {
        emitX[out - 1] = x; // q was collinear between p and this point - replace it
        emitY[out - 1] = y;
        emitF[out - 1] = fl;
      } else {
        emitX[out] = x;
        emitY[out] = y;
        emitF[out] = fl;
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
    const px = emitX[out - 2],
      py = emitY[out - 2];
    const qx = emitX[out - 1],
      qy = emitY[out - 1];
    const rx = emitX[start],
      ry = emitY[start];
    const ax = qx - px,
      ay = qy - py,
      bx = rx - px,
      by = ry - py;
    const cr = ax * by - ay * bx;
    if (cr * cr > eps2 * (bx * bx + by * by)) break;
    if (emitF[out - 2] !== emitF[out - 1]) break;
    out--;
  }
  while (out - start >= 4) {
    const px = emitX[out - 1],
      py = emitY[out - 1];
    const qx = emitX[start],
      qy = emitY[start];
    const rx = emitX[start + 1],
      ry = emitY[start + 1];
    const ax = qx - px,
      ay = qy - py,
      bx = rx - px,
      by = ry - py;
    const cr = ax * by - ay * bx;
    if (cr * cr > eps2 * (bx * bx + by * by)) break;
    if (emitF[out - 1] !== emitF[start]) break;
    start++;
  }

  if (out - start < 3) return; // fully degenerate after decimation - nothing to draw

  if (ctxStateBuffer[styleSlot] !== color16) {
    const style = PALETTE_16BIT[color16];
    ctx.fillStyle = style;
    ctx.strokeStyle = style;
    ctxStateBuffer[styleSlot] = color16;
    if (sawRealSlot !== -1 && color16 !== WHITE16)
      ctxStateBuffer[sawRealSlot] = 1;
  }

  // Seam repair, in place of the stroke this replaces.
  //
  // Canvas2D composites each fill's antialiased coverage separately, so two polygons sharing a
  // boundary each cover about half the pixels along it, and source-over of two half coverages is
  // three quarters - a hairline of background shows through. A stroke in the fill colour repairs
  // that but rasterises every boundary a second time; growing the boundary outward folds into
  // vertices the fill already emits.
  //
  // The growth is done by ADDING two vertices per repaired edge, never by offsetting the edge
  // lines and re-intersecting them at the corners. Re-intersecting moves the vertices at both ends
  // of every edge it touches, and a vertex is shared with edges nobody asked to move: the corner
  // slides along whatever else meets there, so a silhouette grows and the polygon pokes out from
  // under its neighbour. Stepping out and back leaves every original vertex exactly where the
  // geometry put it, needs no mitre limit, and measures a smaller gap for the same cost.
  //
  // Only edges this face OWNS step out - the ones whose neighbour is drawn later, see
  // computeExpandMasks. Growing an edge whose neighbour is already down would move the visible
  // boundary rather than hide a gap, and growing a silhouette just makes the object too big.
  const nv = out - start;

  ctx.beginPath();
  for (let k = 0; k < nv; k++) {
    const i = start + k;
    if (k === 0) ctx.moveTo(emitX[i], emitY[i]);
    else ctx.lineTo(emitX[i], emitY[i]);
    if (emitF[i] === 0) continue;

    const j = start + (k + 1 === nv ? 0 : k + 1);
    const ex = emitX[j] - emitX[i];
    const ey = emitY[j] - emitY[i];
    // Outward is (ey, -ex): backface culling admits one sign of screen-space area and merging
    // preserves it, so every boundary here runs the same way round.
    const ax = ex < 0 ? -ex : ex;
    const ay = ey < 0 ? -ey : ey;
    const l = ax > ay ? ax + 0.4 * ay : ay + 0.4 * ax; // octagonal norm, no sqrt
    if (l < 1e-6) continue;
    const inv = EXPAND / l;
    const nx = ey * inv;
    const ny = -ex * inv;
    ctx.lineTo(emitX[i] + nx, emitY[i] + ny);
    ctx.lineTo(emitX[j] + nx, emitY[j] + ny);
  }
  // No stroke, so no explicit closing lineTo is needed - fill() closes the subpath implicitly.
  // closePath() stays out regardless: it recomputes the whole path's bounds per call.
  ctx.fill();

  statsBuffer[callsSlot]++;
}

/**
 * Flushes every open slot, oldest-seeded first so deferred geometry lands roughly in the order the
 * sort placed it. Ends a pass, and empties the state for the next one.
 *
 * Arguments are the same as {@link weldFlushSlot}, minus the slot.
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
 * The notch is not an edge case - it is the commonest merge of the three, since a triangle fan or
 * strip presents one constantly. Refusals are correctness-neutral: they cost one extra polygon.
 *
 * Vertex ids, not coordinates, decide adjacency: two faces share an edge only if they name the
 * same two vertices, so the caller must pass welded identities for a hard-edge mesh, where every
 * triangle otherwise owns private copies of its corners.
 *
 * Arguments up to `eps` are as {@link weldFlushSlot}; the rest describe the face.
 *
 * @param {number} color16 quantised fill colour; also the key that decides what may merge
 * @param {number} meshIdx owning mesh, kept alongside the polygon for callers that need it
 * @param {number} x0 screen x of the first corner
 * @param {number} y0 screen y of the first corner
 * @param {number} id0 vertex identity of the first corner
 * @param {number} x1 screen x of the second corner
 * @param {number} y1 screen y of the second corner
 * @param {number} id1 vertex identity of the second corner
 * @param {number} x2 screen x of the third corner
 * @param {number} y2 screen y of the third corner
 * @param {number} id2 vertex identity of the third corner
 * @param {number} [expandMask] 1 bit per triangle edge (edge k runs from corner k to corner k+1),
 *   set where this face owns that edge's seam repair - see computeExpandMasks. 0, the default,
 *   expands nothing, which is what the tests want and what a caller that has not opted in gets.
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
  expandMask = 0,
) {
  const slots = st.slots;
  const poolExpand = st.poolExpand;

  // Deferral guard.
  //
  // Holding a polygon open paints it later than the sort placed it. Within one colour that is free,
  // because filling colour C over colour C is idempotent and same-colour faces are therefore
  // order-interchangeable whether or not they overlap. The only thing deferral can break is a
  // differently-coloured face that should have painted over one still held open, so flush exactly
  // those: every open slot whose colour differs AND whose screen bounds meet this face's.
  //
  // Sound by construction. For any violating pair (near N, far F, different colours, overlapping),
  // F was submitted first, so either F's slot has already flushed, or it is still open holding F's
  // bounds - which therefore meet N's, and differ in colour, and so are flushed here before N is
  // placed. Slots are single-colour, so F and N are never co-resident. The invariant that no two
  // co-resident slots of different colours overlap is maintained by this same test: a slot's bounds
  // only ever grow by a face that was itself checked against every other slot first.
  //
  // Flushing every slot on any colour change would also be sound and cost one compare instead of a
  // scan, but it is self-defeating: a depth-sorted stream changes colour constantly, so no slot
  // survives long enough to be merged into and the extra slots buy nothing.
  const fx0 = x0 < x1 ? (x0 < x2 ? x0 : x2) : x1 < x2 ? x1 : x2;
  const fx1 = x0 > x1 ? (x0 > x2 ? x0 : x2) : x1 > x2 ? x1 : x2;
  const fy0 = y0 < y1 ? (y0 < y2 ? y0 : y2) : y1 < y2 ? y1 : y2;
  const fy1 = y0 > y1 ? (y0 > y2 ? y0 : y2) : y1 > y2 ? y1 : y2;
  // A straight indexed walk of every slot, not an iteration over the free-mask bits: occupancy runs
  // high enough that the branchy two-word bit walk loses, and the colour test rejects a free slot
  // just as cheaply.
  const aabb = st.aabb;
  for (let gs = 0; gs < N_SLOTS; gs++) {
    const gc = slots[gs * SL_STRIDE + SL_COLOR];
    if (gc === -1 || gc === color16) continue;
    const ga = gs << 2;
    // Dilated by GUARD_DILATE: a flush paints up to EXPAND outside the geometry it was given, so
    // two regions that merely abut still contend for the pixels along their shared edge while
    // overlapping by exactly zero. Only the test is dilated - the stored bounds stay exact, so the
    // slack cannot compound as a polygon grows.
    if (aabb[ga] > fx1 + GUARD_DILATE || aabb[ga + 2] < fx0 - GUARD_DILATE)
      continue;
    if (aabb[ga + 1] > fy1 + GUARD_DILATE || aabb[ga + 3] < fy0 - GUARD_DILATE)
      continue;
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
        // Edges i and i+1 both cancel, so the triangle's one surviving edge is i+2, and mj is the
        // node that now leaves along it.
        poolExpand[mj] = (expandMask >> ((i + 2) % 3)) & 1;
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

        // mi takes over the stretch of B's ring that vNodeB was carrying, so it inherits that
        // node's edge flag; mj ends up leaving along the triangle's one surviving edge, i+2.
        const vExpand = poolExpand[vNodeB];
        relink(st, mi, after);
        relink(st, mj, uNode);
        poolExpand[mi] = vExpand;
        poolExpand[mj] = (expandMask >> ((i + 2) % 3)) & 1;
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
        // Matched triangle edge mk is cancelled and the ring gains the other two in cyclic order,
        // so mm now leaves along edge mk+1 and the new node along edge mk+2.
        const mk = m0 !== -1 ? 0 : m1 !== -1 ? 1 : 2;
        poolExpand[mm] = (expandMask >> ((mk + 1) % 3)) & 1;
        poolExpand[nn] = (expandMask >> ((mk + 2) % 3)) & 1;
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
  // Node k's outgoing edge IS triangle edge k, by construction of the seed ring.
  poolExpand[n0] = expandMask & 1;
  poolExpand[n1] = (expandMask >> 1) & 1;
  poolExpand[n2] = (expandMask >> 2) & 1;

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
