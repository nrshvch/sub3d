/**
 * @file Multi-slot welder for Gouraud-shaded faces.
 *
 * Deliberately its own module rather than a generalisation of `shared/weld.js`. That one merges
 * faces carrying one flat colour and emits a palette fill; this one merges faces carrying one
 * *shading field* - a colour that varies linearly across the screen - and emits a Canvas2D linear
 * gradient. Same ring machinery, a different key and a different emit.
 *
 * WHAT THE KEY IS. A chart holds one field, fixed by the face that seeded it and never refitted:
 *
 *   channel(p) = base + slope * (p . u)
 *
 * one `u` shared by all three channels, one (slope, base) each. That is exactly what a linear
 * gradient can draw - constant along every line perpendicular to `u` - so the key IS the pixels,
 * and a face that passes the fit test is a face the chart will shade to within `FIT_EPS`.
 *
 * Fitting per channel in 2D and then collapsing onto one axis is the approximation Canvas2D forces
 * on any Gouraud imitation. It is exact whenever the three channel gradients are parallel, which is
 * every scene lit by a single light: a light's colour scales the same `dot` field in all three
 * channels. Two coloured lights arriving from different directions is where it bends, and there the
 * chart simply loses faces to the fit test rather than drawing them wrong.
 *
 * A FLAT FACE IS THE SAME THING with slope 0, so it needs no separate path: it seeds a constant
 * chart, other near-constant faces join it under the same `FIT_EPS`, and the flush notices both
 * ends of the chart quantise alike and emits a plain palette fill. One welder, one key, and a
 * sphere's flat-topped highlight batches with the same code that draws its falloff.
 *
 * WHAT MAY MERGE. A face joins a chart when it shares an edge with the chart's boundary and the
 * chart's field reproduces all three of its vertex colours to within `FIT_EPS` per channel. Re-
 * checking every admitted face against the seed's field bounds the error at `FIT_EPS` however large
 * the chart grows, instead of letting it drift.
 *
 * Refusals are correctness-neutral throughout: the face seeds a chart of its own.
 *
 * ORDERING. A chart is painted when it flushes, later than the sort placed its faces, so an
 * incoming face first flushes every open chart whose screen bounds meet its own. The chart it is
 * joining is exempt - an edge-sharing neighbour it shades identically cannot occlude it.
 */
import {
  CTX_STATE_SAW_REAL_SHADING,
  CTX_STATE_SHADE_FILL,
  STATS_SHADE_DRAW_CALLS,
  STATS_SHADE_VERTICES,
} from "../../shared/shaders.js";
import { EXPAND } from "../../shared/weld.js";
import { PALETTE_16BIT, WHITE16 } from "../../palette.js";

const N_SLOTS = 32;

// Boundary vertices per chart. Bounded because every boundary walk here is linear; a power of two
// so a slot's ring base is a shift.
const MAX_CHART_VERTS = 16;

// Worst per-channel deviation, in 0-255 light units, the chart's field may show at an incoming
// face's corners. Four is one 6-bit green step and half a 5-bit red/blue one - at or below what the
// 5-6-5 palette can express, so an admitted face is quantised to the colour it would have had
// alone, or to the one step either side of it.
//
// Loosening it does not buy merges, so it is set at the value that costs nothing visually rather
// than traded off. Measured on the boxes example's sphere alone: at 4, 56 faces -> 46.1 gradient
// fills; at 10, 45.3. What limits merging is the geometry, not the tolerance - two triangles on a
// curved surface have genuinely different intensity planes, and by far more than 10/255 at a coarse
// tessellation. It closes as the mesh refines: the same sphere at 32x32 merges 992 faces -> 631.5.
const FIT_EPS = 4;

// Twice the screen area, in px^2, below which a triangle has no usable field to fit. Such a face is
// edge-on or sub-pixel; it seeds a constant chart from its first corner rather than dividing by a
// determinant that is all round-off.
const MIN_FIT_AREA = 1e-3;

// Axis span, in px, below which a chart cannot carry a gradient - both stops would sit on the same
// point. Falls back to a flat fill of the low end.
const MIN_AXIS_SPAN = 1e-3;

// Squared gradient magnitude, in (light units / px)^2, below which no channel varies enough to pick
// an axis from. 1e-12 is round-off, not shading.
const MIN_GRADIENT_SQ = 1e-12;

// The outward offset comes from the flat welder: the seam being repaired is a property of how
// Canvas2D composites coverage, not of any one welder, so every pass must offset by the same amount
// or two faces meeting at an edge disagree about where the boundary is.
const GUARD_DILATE = 2 * EXPAND;

const EDGE_CAP = 2048;
const EDGE_MASK = EDGE_CAP - 1;

const SL_STRIDE = 4;
const SL_USED = 0; // 0 = free
const SL_LEN = 1;
const SL_SEQ = 2; // face counter at last extend, for victim selection

// Field lanes, per slot: [ux, uy, slopeR, baseR, slopeG, baseG, slopeB, baseB].
// `u` is a unit vector; a channel reads `base + slope * (p . u)` in 0-255 light units.
const FD_STRIDE = 8;
const FD_UX = 0;
const FD_UY = 1;
const FD_SLOPE_R = 2;
const FD_BASE_R = 3;
const FD_SLOPE_G = 4;
const FD_BASE_G = 5;
const FD_SLOPE_B = 6;
const FD_BASE_B = 7;

/**
 * Quantises one 0-255 light colour to its 5-6-5 palette index, clamping out of range.
 *
 * @param {number} r red, in 0-255 light units, unclamped
 * @param {number} g green
 * @param {number} b blue
 * @returns {number} index into PALETTE_16BIT
 */
function quantise565(r, g, b) {
  const ri = r < 0 ? 0 : r > 255 ? 255 : r | 0;
  const gi = g < 0 ? 0 : g > 255 ? 255 : g | 0;
  const bi = b < 0 ? 0 : b > 255 ? 255 : b | 0;
  return ((ri & 0xf8) << 8) | ((gi & 0xfc) << 3) | ((bi & 0xf8) >> 3);
}

/**
 * Allocates one welder's worth of state. Every buffer it will ever need is allocated here and
 * reused for the life of the page; nothing is allocated per frame or per face.
 *
 * One state per pass, never shared - a chart left open by one pass means nothing to another.
 *
 * @returns {object} opaque state, passed back into every other function here
 */
export function createGouraudWeldState() {
  return {
    slots: new Int32Array(N_SLOTS * SL_STRIDE),
    // The shading field per chart, fitted from the face that seeded it (see the FD_* lanes).
    field: new Float32Array(N_SLOTS * FD_STRIDE),
    // Screen bounds per chart, [x0, y0, x1, y1] - the overlap guard's only input.
    aabb: new Float32Array(N_SLOTS * 4),
    // Boundary rings as flat arrays rather than linked nodes: short enough that an insert is a
    // handful of element moves, and an array cannot be corrupted by pointer surgery.
    bx: new Float32Array(N_SLOTS * MAX_CHART_VERTS),
    by: new Float32Array(N_SLOTS * MAX_CHART_VERTS),
    bid: new Int32Array(N_SLOTS * MAX_CHART_VERTS),
    // 1 where the boundary edge LEAVING vertex i must be pushed outward at flush, i.e. the face
    // across it is drawn later. See computeExpandMasks in shared/shaders.js.
    bexp: new Uint8Array(N_SLOTS * MAX_CHART_VERTS),
    // Directed-edge table: (from -> to) -> slot, cleared in O(1) by bumping the generation.
    eFrom: new Int32Array(EDGE_CAP),
    eTo: new Int32Array(EDGE_CAP),
    eSlot: new Int32Array(EDGE_CAP),
    eStamp: new Int32Array(EDGE_CAP),
    gen: 1,
    seq: 0,
    live: 0,
    frameId: -1,
  };
}

/**
 * Drops every open chart without drawing, and empties the edge table.
 *
 * Only correct for state left over from a finished frame - never as a "cancel" mid-pass, which
 * would silently lose geometry.
 *
 * @param {object} st welder state
 */
export function gouraudWeldReset(st) {
  const slots = st.slots;
  for (let i = 0; i < N_SLOTS; i++) slots[i * SL_STRIDE + SL_USED] = 0;
  st.gen++;
  st.seq = 0;
  st.live = 0;
}

// --- edge table -------------------------------------------------------------------------------

/**
 * Mixes a directed edge into a table index. Both endpoints are vertex identities.
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
 * Looks up which chart owns a directed boundary edge.
 *
 * @param {object} st welder state
 * @param {number} from vertex identity the edge leaves
 * @param {number} to vertex identity the edge arrives at
 * @returns {number} the chart slot owning (from -> to), or -1
 */
function edgeFind(st, from, to) {
  const gen = st.gen;
  let i = edgeHash(from, to);
  for (let probe = 0; probe < 32; probe++) {
    if (st.eStamp[i] === 0) return -1;
    if (st.eStamp[i] === gen && st.eFrom[i] === from && st.eTo[i] === to) {
      return st.eSlot[i];
    }
    i = (i + 1) & EDGE_MASK;
  }
  return -1;
}

/**
 * Records that `slot` owns the directed boundary edge (from -> to).
 *
 * @param {object} st welder state
 * @param {number} from vertex identity the edge leaves
 * @param {number} to vertex identity the edge arrives at
 * @param {number} slot chart the edge belongs to
 */
function edgeInsert(st, from, to, slot) {
  const gen = st.gen;
  let i = edgeHash(from, to);
  for (let probe = 0; probe < 32; probe++) {
    if (st.eStamp[i] !== gen) {
      st.eStamp[i] = gen;
      st.eFrom[i] = from;
      st.eTo[i] = to;
      st.eSlot[i] = slot;
      return;
    }
    // A duplicate directed edge means non-manifold input; keep the incumbent. Costs a missed
    // merge, never a wrong one.
    if (st.eFrom[i] === from && st.eTo[i] === to) return;
    i = (i + 1) & EDGE_MASK;
  }
}

/**
 * Marks a directed boundary edge dead. Probing still treats the entry as occupied so it cannot
 * break a chain; the whole table is discarded by the generation bump between frames.
 *
 * @param {object} st welder state
 * @param {number} from vertex identity the edge leaves
 * @param {number} to vertex identity the edge arrives at
 */
function edgeDelete(st, from, to) {
  const gen = st.gen;
  let i = edgeHash(from, to);
  for (let probe = 0; probe < 32; probe++) {
    if (st.eStamp[i] === 0) return;
    if (st.eStamp[i] === gen && st.eFrom[i] === from && st.eTo[i] === to) {
      st.eStamp[i] = -1;
      return;
    }
    i = (i + 1) & EDGE_MASK;
  }
}

/**
 * Publishes every edge of a chart's boundary ring into the edge table.
 *
 * @param {object} st welder state
 * @param {number} slot chart whose ring to index
 */
function indexRing(st, slot) {
  const base = slot * MAX_CHART_VERTS;
  const len = st.slots[slot * SL_STRIDE + SL_LEN];
  for (let i = 0; i < len; i++) {
    const j = i + 1 === len ? 0 : i + 1;
    edgeInsert(st, st.bid[base + i], st.bid[base + j], slot);
  }
}

/**
 * Removes every edge of a chart's boundary ring from the edge table.
 *
 * @param {object} st welder state
 * @param {number} slot chart whose ring to drop
 */
function deindexRing(st, slot) {
  const base = slot * MAX_CHART_VERTS;
  const len = st.slots[slot * SL_STRIDE + SL_LEN];
  for (let i = 0; i < len; i++) {
    const j = i + 1 === len ? 0 : i + 1;
    edgeDelete(st, st.bid[base + i], st.bid[base + j]);
  }
}

// --- flushing ---------------------------------------------------------------------------------

/**
 * Emits one chart as a single fill and releases the slot.
 *
 * The gradient's two stops sit at the chart's own extremes along the field axis, found by projecting
 * the boundary onto `u`. That is what makes the emit chart-adaptive: the chart's own geometry lands
 * between the stops, and the stop colours are the field's values there rather than any one face's
 * corner. When both stops quantise alike the chart is flat after all and takes a palette fill, which
 * is the path every constant chart lands on.
 *
 * The seam-expanded band is the one part that falls outside, by up to EXPAND, and Canvas2D clamps a
 * gradient to its end stop there - which is what that band wants anyway, since it exists to carry
 * the edge's own colour a pixel further out.
 *
 * Gradient endpoints are `s * u`, not boundary vertices. A linear gradient is constant along every
 * perpendicular to `u`, so only the projection matters, and a point on the axis through the origin
 * carries it exactly.
 *
 * @param {object} st welder state
 * @param {number} slot chart to emit; a free slot is a no-op
 * @param {CanvasRenderingContext2D} ctx destination shade context
 * @param {Int32Array} ctxStateBuffer shared cache of what is currently set on `ctx`. The shade
 *   colour slot is invalidated after a gradient, because a gradient is not a palette entry and the
 *   next flat face must set its own style rather than trust a stale hit.
 * @param {Int32Array} statsBuffer shared per-frame counters
 */
export function gouraudWeldFlushSlot(
  st,
  slot,
  ctx,
  ctxStateBuffer,
  statsBuffer,
) {
  const slots = st.slots;
  const sb = slot * SL_STRIDE;
  if (slots[sb + SL_USED] === 0) return;

  const len = slots[sb + SL_LEN];
  deindexRing(st, slot);
  slots[sb + SL_USED] = 0;
  st.live--;
  if (len < 3) return;

  const base = slot * MAX_CHART_VERTS;
  const bx = st.bx;
  const by = st.by;
  const bexp = st.bexp;

  const fb = slot * FD_STRIDE;
  const ux = st.field[fb + FD_UX];
  const uy = st.field[fb + FD_UY];

  // Project the boundary onto the axis: the field's extremes over a convex-hull-bounded ring are
  // attained at ring vertices, so a single walk finds both stops.
  let sMin = Infinity;
  let sMax = -Infinity;
  for (let i = 0; i < len; i++) {
    const s = bx[base + i] * ux + by[base + i] * uy;
    if (s < sMin) sMin = s;
    if (s > sMax) sMax = s;
  }

  const slopeR = st.field[fb + FD_SLOPE_R];
  const slopeG = st.field[fb + FD_SLOPE_G];
  const slopeB = st.field[fb + FD_SLOPE_B];
  const lo16 = quantise565(
    st.field[fb + FD_BASE_R] + slopeR * sMin,
    st.field[fb + FD_BASE_G] + slopeG * sMin,
    st.field[fb + FD_BASE_B] + slopeB * sMin,
  );
  const hi16 = quantise565(
    st.field[fb + FD_BASE_R] + slopeR * sMax,
    st.field[fb + FD_BASE_G] + slopeG * sMax,
    st.field[fb + FD_BASE_B] + slopeB * sMax,
  );

  if (lo16 === hi16 || sMax - sMin < MIN_AXIS_SPAN) {
    // Flat after all - the whole chart quantises to one palette entry, so a gradient would draw the
    // same pixels for a gradient's price.
    if (ctxStateBuffer[CTX_STATE_SHADE_FILL] !== lo16) {
      ctx.fillStyle = PALETTE_16BIT[lo16];
      ctxStateBuffer[CTX_STATE_SHADE_FILL] = lo16;
      if (lo16 !== WHITE16) ctxStateBuffer[CTX_STATE_SAW_REAL_SHADING] = 1;
    }
  } else {
    const grad = ctx.createLinearGradient(
      ux * sMin,
      uy * sMin,
      ux * sMax,
      uy * sMax,
    );
    grad.addColorStop(0, PALETTE_16BIT[lo16]);
    grad.addColorStop(1, PALETTE_16BIT[hi16]);
    ctx.fillStyle = grad;
    // The colour cache tracks a palette entry and this is not one; force the next flat face to set
    // its own style rather than trusting a stale hit.
    ctxStateBuffer[CTX_STATE_SHADE_FILL] = -1;
    // Two stops that differ cannot both be white, so this chart darkens something.
    ctxStateBuffer[CTX_STATE_SAW_REAL_SHADING] = 1;
  }

  // Seam repair. Two vertices are ADDED per repaired edge - the boundary steps out and back -
  // rather than the edge lines being offset and re-intersected at the corners. Re-intersecting
  // moves the vertices at both ends of every edge it touches, and those corners are shared with
  // edges nobody asked to move, so the chart pokes out from under the neighbour that was supposed
  // to cover it. Stepping out leaves every original corner where the projection put it.
  //
  // Done here rather than in the ring, so what the fit test, the edge table and the axis projection
  // above all see stays the true projected geometry.
  let pathVertices = len;
  ctx.beginPath();
  for (let i = 0; i < len; i++) {
    const x = bx[base + i];
    const y = by[base + i];
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
    if (bexp[base + i] === 0) continue;

    const j = i + 1 === len ? 0 : i + 1;
    const xj = bx[base + j];
    const yj = by[base + j];
    const ex = xj - x;
    const ey = yj - y;
    // Outward is (ey, -ex): backface culling admits one sign of screen-space area and merging
    // preserves it, so every boundary here runs the same way round.
    const ax = ex < 0 ? -ex : ex;
    const ay = ey < 0 ? -ey : ey;
    const l = ax > ay ? ax + 0.4 * ay : ay + 0.4 * ax; // octagonal norm, no sqrt
    if (l < 1e-6) continue;
    const inv = EXPAND / l;
    const nx = ey * inv;
    const ny = -ex * inv;
    ctx.lineTo(x + nx, y + ny);
    ctx.lineTo(xj + nx, yj + ny);
    pathVertices += 2;
  }
  // No stroke, so no explicit closing lineTo is needed - fill() closes the subpath implicitly.
  ctx.fill();

  statsBuffer[STATS_SHADE_DRAW_CALLS]++;
  statsBuffer[STATS_SHADE_VERTICES] += pathVertices;
}

/**
 * Flushes every open chart, oldest first so charts land roughly where the sort placed them. Ends a
 * pass, and empties the state for the next one.
 *
 * Arguments are as {@link gouraudWeldFlushSlot}, minus the slot.
 */
export function gouraudWeldFlushAll(st, ctx, ctxStateBuffer, statsBuffer) {
  const slots = st.slots;
  while (st.live > 0) {
    let best = -1;
    let bestSeq = 0x7fffffff;
    for (let s = 0; s < N_SLOTS; s++) {
      const sb = s * SL_STRIDE;
      if (slots[sb + SL_USED] === 0) continue;
      if (slots[sb + SL_SEQ] < bestSeq) {
        bestSeq = slots[sb + SL_SEQ];
        best = s;
      }
    }
    if (best === -1) return;
    gouraudWeldFlushSlot(st, best, ctx, ctxStateBuffer, statsBuffer);
  }
}

// --- adding a face ----------------------------------------------------------------------------

/**
 * Merges one Gouraud-shaded triangle into the open charts, flushing whatever must be flushed first.
 *
 * Worked example. A quad of a lit sphere arrives as two triangles sharing edge (1,2). The first
 * seeds a chart: its three lit corners fit a plane, the plane's steepest channel gives the axis
 * `u`, and the ring is its three corners. The second is looked up by its reversed shared edge
 * (2,1), lands on that chart, and its three corners are checked against the chart's field - the two
 * shared ones agree by construction, so the test is really about the corner the first triangle
 * never saw. Inside `FIT_EPS` it is inserted into the ring, the shared edge is dropped from the
 * table, and one gradient later covers the whole quad; outside it, the face seeds its own chart and
 * the quad costs two gradients, exactly as it would have without the welder.
 *
 * Arguments up to `statsBuffer` are as {@link gouraudWeldFlushSlot}; the rest describe the face.
 * Screen positions must be the true projected ones, not seam-expanded: they are what the field is
 * fitted from and what it is later re-checked against, so an offset would corrupt both.
 *
 * @param {object} st welder state
 * @param {CanvasRenderingContext2D} ctx destination shade context
 * @param {Int32Array} ctxStateBuffer shared cache of what is currently set on `ctx`
 * @param {Int32Array} statsBuffer shared per-frame counters
 * @param {number} r0 lit red at the first corner, in 0-255 light units
 * @param {number} g0 lit green at the first corner
 * @param {number} b0 lit blue at the first corner
 * @param {number} x0 screen x of the first corner
 * @param {number} y0 screen y of the first corner
 * @param {number} id0 vertex identity of the first corner, which is what adjacency is matched on -
 *   positions are never compared
 * @param {number} r1 lit red at the second corner
 * @param {number} g1 lit green at the second corner
 * @param {number} b1 lit blue at the second corner
 * @param {number} x1 screen x of the second corner
 * @param {number} y1 screen y of the second corner
 * @param {number} id1 vertex identity of the second corner
 * @param {number} r2 lit red at the third corner
 * @param {number} g2 lit green at the third corner
 * @param {number} b2 lit blue at the third corner
 * @param {number} x2 screen x of the third corner
 * @param {number} y2 screen y of the third corner
 * @param {number} id2 vertex identity of the third corner
 * @param {number} [expandMask] 1 bit per triangle edge (edge k runs from corner k to corner k+1),
 *   set where this face owns that edge's seam repair - see computeExpandMasks in shared/shaders.js.
 *   0, the default, grows nothing, which is what a caller that has not opted in gets.
 */
export function gouraudWeldAddFace(
  st,
  ctx,
  ctxStateBuffer,
  statsBuffer,
  r0,
  g0,
  b0,
  x0,
  y0,
  id0,
  r1,
  g1,
  b1,
  x1,
  y1,
  id1,
  r2,
  g2,
  b2,
  x2,
  y2,
  id2,
  expandMask = 0,
) {
  const slots = st.slots;
  const seq = ++st.seq;

  const fx0 = x0 < x1 ? (x0 < x2 ? x0 : x2) : x1 < x2 ? x1 : x2;
  const fx1 = x0 > x1 ? (x0 > x2 ? x0 : x2) : x1 > x2 ? x1 : x2;
  const fy0 = y0 < y1 ? (y0 < y2 ? y0 : y2) : y1 < y2 ? y1 : y2;
  const fy1 = y0 > y1 ? (y0 > y2 ? y0 : y2) : y1 > y2 ? y1 : y2;

  let target = -1;
  let hitA = -1; // boundary index of the first matched edge
  let hitB = -1; // and of a second, when this face fills a notch
  let newX = 0;
  let newY = 0;
  let newId = -1;
  let cancelled = -1; // triangle edge the single match cancels
  let survivor = -1; // triangle edge that outlives a notch

  if (st.live > 0) {
    // A consistently wound neighbour presents the shared edge reversed, so a match is a lookup of
    // this triangle's own edges backwards.
    const e0 = edgeFind(st, id1, id0);
    const e1 = edgeFind(st, id2, id1);
    const e2 = edgeFind(st, id0, id2);

    for (let k = 0; k < 3 && target === -1; k++) {
      const s = k === 0 ? e0 : k === 1 ? e1 : e2;
      if (s === -1) continue;
      const sb = s * SL_STRIDE;
      if (slots[sb + SL_USED] === 0) continue;

      // The chart's field must still describe this face; see FIT_EPS. Checked against the seed's
      // field rather than a refitted one, so error is bounded however large the chart grows.
      const fb = s * FD_STRIDE;
      const ux = st.field[fb + FD_UX];
      const uy = st.field[fb + FD_UY];
      const slopeR = st.field[fb + FD_SLOPE_R];
      const baseR = st.field[fb + FD_BASE_R];
      const slopeG = st.field[fb + FD_SLOPE_G];
      const baseG = st.field[fb + FD_BASE_G];
      const slopeB = st.field[fb + FD_SLOPE_B];
      const baseB = st.field[fb + FD_BASE_B];

      let sp = x0 * ux + y0 * uy;
      let d = baseR + slopeR * sp - r0;
      if (d > FIT_EPS || d < -FIT_EPS) continue;
      d = baseG + slopeG * sp - g0;
      if (d > FIT_EPS || d < -FIT_EPS) continue;
      d = baseB + slopeB * sp - b0;
      if (d > FIT_EPS || d < -FIT_EPS) continue;

      sp = x1 * ux + y1 * uy;
      d = baseR + slopeR * sp - r1;
      if (d > FIT_EPS || d < -FIT_EPS) continue;
      d = baseG + slopeG * sp - g1;
      if (d > FIT_EPS || d < -FIT_EPS) continue;
      d = baseB + slopeB * sp - b1;
      if (d > FIT_EPS || d < -FIT_EPS) continue;

      sp = x2 * ux + y2 * uy;
      d = baseR + slopeR * sp - r2;
      if (d > FIT_EPS || d < -FIT_EPS) continue;
      d = baseG + slopeG * sp - g2;
      if (d > FIT_EPS || d < -FIT_EPS) continue;
      d = baseB + slopeB * sp - b2;
      if (d > FIT_EPS || d < -FIT_EPS) continue;

      // Locate every one of this triangle's edges on that chart's boundary. Two of them can match
      // at once, which means the triangle fills a notch and the shared vertex disappears rather
      // than a new one being added - inserting there instead would leave the ring with a repeated
      // vertex and a stale edge behind it.
      const base = s * MAX_CHART_VERTS;
      const len = slots[sb + SL_LEN];
      const bid = st.bid;
      let at0 = -1;
      let at1 = -1;
      let at2 = -1;
      for (let i = 0; i < len; i++) {
        const j = i + 1 === len ? 0 : i + 1;
        const from = bid[base + i];
        const to = bid[base + j];
        if (from === id1 && to === id0) at0 = i;
        else if (from === id2 && to === id1) at1 = i;
        else if (from === id0 && to === id2) at2 = i;
      }
      const matches =
        (at0 !== -1 ? 1 : 0) + (at1 !== -1 ? 1 : 0) + (at2 !== -1 ? 1 : 0);
      if (matches === 0) continue;

      if (matches === 1) {
        if (len >= MAX_CHART_VERTS) continue;
        if (at0 !== -1) {
          hitA = at0;
          newX = x2;
          newY = y2;
          newId = id2;
          cancelled = 0;
        } else if (at1 !== -1) {
          hitA = at1;
          newX = x0;
          newY = y0;
          newId = id0;
          cancelled = 1;
        } else {
          hitA = at2;
          newX = x1;
          newY = y1;
          newId = id1;
          cancelled = 2;
        }
        target = s;
      } else if (matches === 2) {
        // The two matched edges must be consecutive around the ring, or they bound different parts
        // of it and closing between them would fission the chart. Refuse in that case.
        const p = at0 !== -1 ? at0 : at1;
        const q = at2 !== -1 ? at2 : at1 !== -1 ? at1 : at0;
        const first = (p + 1) % len === q ? p : (q + 1) % len === p ? q : -1;
        if (first === -1) continue;
        hitA = first;
        hitB = (first + 1) % len;
        // Two of the triangle's edges cancel; the third survives onto the boundary.
        survivor = at0 === -1 ? 0 : at1 === -1 ? 1 : 2;
        target = s;
      }
      // Three matches would close the ring into nothing; refuse and let it seed.
    }
  }

  // Flush every chart this face overlaps, except the one it is about to join.
  //
  // Holding a chart open paints it later than the sort placed it. The only thing that can break is a
  // face that should have painted over one still open, so flush exactly those. The chart being
  // joined is exempt: it shades this face to within FIT_EPS by the test just passed, so painting it
  // late repaints the same pixels.
  const aabb = st.aabb;
  if (st.live > 0) {
    for (let s = 0; s < N_SLOTS; s++) {
      if (s === target) continue;
      if (slots[s * SL_STRIDE + SL_USED] === 0) continue;
      const g = s << 2;
      // Dilated like the flat welder's: a flush paints up to EXPAND outside the geometry it was
      // given, so two charts that merely abut still contend for the pixels between them.
      if (aabb[g] > fx1 + GUARD_DILATE || aabb[g + 2] < fx0 - GUARD_DILATE)
        continue;
      if (aabb[g + 1] > fy1 + GUARD_DILATE || aabb[g + 3] < fy0 - GUARD_DILATE)
        continue;
      gouraudWeldFlushSlot(st, s, ctx, ctxStateBuffer, statsBuffer);
    }
  }

  if (target !== -1) {
    const base = target * MAX_CHART_VERTS;
    const sb = target * SL_STRIDE;
    const len = slots[sb + SL_LEN];
    const bx = st.bx;
    const by = st.by;
    const bid = st.bid;
    const bexp = st.bexp;

    if (hitB === -1) {
      // Extend: the new corner goes between the endpoints of the matched edge.
      const from = bid[base + hitA];
      const to = bid[base + ((hitA + 1) % len)];
      edgeDelete(st, from, to);
      for (let i = len; i > hitA + 1; i--) {
        bx[base + i] = bx[base + i - 1];
        by[base + i] = by[base + i - 1];
        bid[base + i] = bid[base + i - 1];
        bexp[base + i] = bexp[base + i - 1];
      }
      bx[base + hitA + 1] = newX;
      by[base + hitA + 1] = newY;
      bid[base + hitA + 1] = newId;
      // The matched edge is gone and the triangle's other two take its place, in cyclic order.
      bexp[base + hitA] = (expandMask >> ((cancelled + 1) % 3)) & 1;
      bexp[base + hitA + 1] = (expandMask >> ((cancelled + 2) % 3)) & 1;
      slots[sb + SL_LEN] = len + 1;
      edgeInsert(st, from, newId, target);
      edgeInsert(st, newId, to, target);
    } else {
      // Notch: both matched edges meet at one vertex, which is now interior and comes out.
      const mid = (hitA + 1) % len;
      const from = bid[base + hitA];
      const midId = bid[base + mid];
      const to = bid[base + ((mid + 1) % len)];
      edgeDelete(st, from, midId);
      edgeDelete(st, midId, to);
      for (let i = mid; i < len - 1; i++) {
        bx[base + i] = bx[base + i + 1];
        by[base + i] = by[base + i + 1];
        bid[base + i] = bid[base + i + 1];
        bexp[base + i] = bexp[base + i + 1];
      }
      // Removing the mid vertex slides `from` down one when it wrapped past the end.
      bexp[base + (hitA < mid ? hitA : hitA - 1)] =
        (expandMask >> survivor) & 1;
      slots[sb + SL_LEN] = len - 1;
      edgeInsert(st, from, to, target);
    }

    slots[sb + SL_SEQ] = seq;
    const g = target << 2;
    if (fx0 < aabb[g]) aabb[g] = fx0;
    if (fy0 < aabb[g + 1]) aabb[g + 1] = fy0;
    if (fx1 > aabb[g + 2]) aabb[g + 2] = fx1;
    if (fy1 > aabb[g + 3]) aabb[g + 3] = fy1;
    return;
  }

  // Seed a fresh chart, evicting the least-recently-extended if none are free.
  let slot = -1;
  for (let s = 0; s < N_SLOTS; s++) {
    if (slots[s * SL_STRIDE + SL_USED] === 0) {
      slot = s;
      break;
    }
  }
  if (slot === -1) {
    let bestSeq = 0x7fffffff;
    for (let s = 0; s < N_SLOTS; s++) {
      const q = slots[s * SL_STRIDE + SL_SEQ];
      if (q < bestSeq) {
        bestSeq = q;
        slot = s;
      }
    }
    gouraudWeldFlushSlot(st, slot, ctx, ctxStateBuffer, statsBuffer);
  }

  // Fit the field this chart will be keyed on and drawn with.
  //
  // Per channel the three lit corners define a plane over the screen; the steepest of the three
  // gives the axis, and each channel is then the component of its own plane along that axis,
  // anchored so all three agree with their plane at the triangle's centroid. An affine function's
  // value at the centroid is the mean of its vertex values, which is where the means below come
  // from - no second evaluation is needed.
  const ex1 = x1 - x0;
  const ey1 = y1 - y0;
  const ex2 = x2 - x0;
  const ey2 = y2 - y0;
  const det = ex1 * ey2 - ex2 * ey1;

  const meanR = (r0 + r1 + r2) * 0.33333334;
  const meanG = (g0 + g1 + g2) * 0.33333334;
  const meanB = (b0 + b1 + b2) * 0.33333334;

  let ux = 1;
  let uy = 0;
  let slopeR = 0;
  let slopeG = 0;
  let slopeB = 0;

  if (det > MIN_FIT_AREA || det < -MIN_FIT_AREA) {
    const invDet = 1 / det;
    const dr1 = r1 - r0;
    const dr2 = r2 - r0;
    const dg1 = g1 - g0;
    const dg2 = g2 - g0;
    const db1 = b1 - b0;
    const db2 = b2 - b0;
    const grx = (dr1 * ey2 - dr2 * ey1) * invDet;
    const gry = (ex1 * dr2 - ex2 * dr1) * invDet;
    const ggx = (dg1 * ey2 - dg2 * ey1) * invDet;
    const ggy = (ex1 * dg2 - ex2 * dg1) * invDet;
    const gbx = (db1 * ey2 - db2 * ey1) * invDet;
    const gby = (ex1 * db2 - ex2 * db1) * invDet;

    const lenR = grx * grx + gry * gry;
    const lenG = ggx * ggx + ggy * ggy;
    const lenB = gbx * gbx + gby * gby;

    let dx, dy, lenSq;
    if (lenR >= lenG && lenR >= lenB) {
      dx = grx;
      dy = gry;
      lenSq = lenR;
    } else if (lenG >= lenB) {
      dx = ggx;
      dy = ggy;
      lenSq = lenG;
    } else {
      dx = gbx;
      dy = gby;
      lenSq = lenB;
    }

    if (lenSq > MIN_GRADIENT_SQ) {
      const inv = 1 / Math.sqrt(lenSq);
      ux = dx * inv;
      uy = dy * inv;
      slopeR = grx * ux + gry * uy;
      slopeG = ggx * ux + ggy * uy;
      slopeB = gbx * ux + gby * uy;
    }
  }

  const sCentroid = ((x0 + x1 + x2) * ux + (y0 + y1 + y2) * uy) * 0.33333334;
  const fb = slot * FD_STRIDE;
  st.field[fb + FD_UX] = ux;
  st.field[fb + FD_UY] = uy;
  st.field[fb + FD_SLOPE_R] = slopeR;
  st.field[fb + FD_BASE_R] = meanR - slopeR * sCentroid;
  st.field[fb + FD_SLOPE_G] = slopeG;
  st.field[fb + FD_BASE_G] = meanG - slopeG * sCentroid;
  st.field[fb + FD_SLOPE_B] = slopeB;
  st.field[fb + FD_BASE_B] = meanB - slopeB * sCentroid;

  const base = slot * MAX_CHART_VERTS;
  st.bx[base] = x0;
  st.by[base] = y0;
  st.bid[base] = id0;
  st.bx[base + 1] = x1;
  st.by[base + 1] = y1;
  st.bid[base + 1] = id1;
  st.bx[base + 2] = x2;
  st.by[base + 2] = y2;
  st.bid[base + 2] = id2;
  // Vertex k's outgoing edge IS triangle edge k, by construction of the seed ring.
  st.bexp[base] = expandMask & 1;
  st.bexp[base + 1] = (expandMask >> 1) & 1;
  st.bexp[base + 2] = (expandMask >> 2) & 1;

  const sb = slot * SL_STRIDE;
  slots[sb + SL_USED] = 1;
  slots[sb + SL_LEN] = 3;
  slots[sb + SL_SEQ] = seq;
  st.live++;

  const g = slot << 2;
  aabb[g] = fx0;
  aabb[g + 1] = fy0;
  aabb[g + 2] = fx1;
  aabb[g + 3] = fy1;

  indexRing(st, slot);
}
