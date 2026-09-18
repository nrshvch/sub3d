/**
 * @file Multi-slot welder for textured faces.
 *
 * Deliberately its own module rather than a generalisation of `shared/weld.js`. That one merges by
 * colour and emits a screen-space path; this one merges by shared texture plane and emits a path in
 * texture space with the UV->screen affine on the context. Same shape, no shared data.
 *
 * WHY IT EXISTS. A box side is two coplanar triangles sharing a diagonal. Drawn separately they
 * cost two fills and two independent affine maps, which disagree along that diagonal - the classic
 * crease of affine-mapped quads - and conflate into a seam. Merged, the diagonal is never
 * rasterised: one path, one transform, one fill, no crease. A depth sort scatters the pair, so a
 * single pending face catches only those that happen to arrive back to back; holding many charts
 * open is what makes the merge survive the sort.
 *
 * WHAT MAY MERGE. A face joins a chart when it shares an edge with the chart's boundary, its face
 * normal matches the chart's plane, and the chart's affine reproduces all three of its screen
 * positions to within `FIT_EPS`.
 *
 * The normal test is the coplanarity requirement, and it is not redundant with the edge test: two
 * perpendicular box sides share vertex identities as soon as a mesh is position-welded, so edge
 * adjacency alone would happily fuse them. Sharing an edge *and* a normal is sufficient - the
 * shared edge gives the two triangles a common point, and a common point plus a common normal is
 * the same plane.
 *
 * The fit test is the perspective bound. A plane's exact texture map is a homography and reduces to
 * an affine only where w is constant, so merging coplanar faces is an approximation whose error
 * grows with the chart. Re-checking the fit against every admitted face keeps that error bounded
 * instead of letting a chart drift.
 *
 * Refusals are correctness-neutral throughout: the face simply seeds a chart of its own.
 *
 * ORDERING. A chart is painted when it flushes, later than the sort placed its faces, so an
 * incoming face first flushes every open chart whose screen bounds meet its own. The chart it is
 * joining is exempt - a coplanar edge-sharing neighbour cannot occlude it.
 */
import { CTX_STATE_FILL_PASS_FILL_STYLE_SLOT } from "../../shared/shaders.js";
import { EXPAND } from "../../shared/weld.js";

const N_SLOTS = 32;

// Boundary vertices per chart. Bounded because every boundary walk here is linear, and because a
// chart wide enough to need more has usually drifted past the affine fit anyway.
const MAX_CHART_VERTS = 12;

// Cosine below which two face normals are not the same plane. Tight: coplanar faces of one mesh
// have identical normals, so this only has to absorb transform round-off.
const COPLANAR_DOT = 0.9999;

// Worst screen-space deviation, in pixels, the chart's affine may show at an incoming face's
// corners. Half a pixel keeps the merge below what the rasteriser can express.
const FIT_EPS = 0.5;

// The outward offset comes from the flat welder: the seam being repaired is a
// property of how Canvas2D composites coverage, not of either welder, so both passes must offset by
// the same amount or a textured face and a flat one meeting at an edge disagree about where the
// boundary is.
const GUARD_DILATE = 2 * EXPAND;

const EDGE_CAP = 2048;
const EDGE_MASK = EDGE_CAP - 1;

const SL_STRIDE = 4;
const SL_USED = 0; // 0 = free
const SL_LEN = 1;
const SL_SEQ = 2; // face counter at last extend, for victim selection

/**
 * Allocates one welder's worth of state. Every buffer it will ever need is allocated here and
 * reused for the life of the page; nothing is allocated per frame or per face.
 *
 * One state per pass, never shared - a chart left open by one pass means nothing to another.
 *
 * @returns {object} opaque state, passed back into every other function here
 */
export function createTextureWeldState() {
  return {
    slots: new Int32Array(N_SLOTS * SL_STRIDE),
    // Six affine terms per chart, fitted from the face that seeded it.
    affine: new Float32Array(N_SLOTS * 6),
    // The chart's plane normal, for the coplanarity test.
    normal: new Float32Array(N_SLOTS * 3),
    // Screen bounds per chart, [x0, y0, x1, y1] - the overlap guard's only input.
    aabb: new Float32Array(N_SLOTS * 4),
    // Boundary rings as flat arrays rather than linked nodes: short enough that an insert is a
    // handful of element moves, and an array cannot be corrupted by pointer surgery.
    bu: new Float32Array(N_SLOTS * MAX_CHART_VERTS),
    bv: new Float32Array(N_SLOTS * MAX_CHART_VERTS),
    bid: new Int32Array(N_SLOTS * MAX_CHART_VERTS),
    // 1 where the boundary edge LEAVING vertex i must be pushed outward at flush, i.e. the face
    // across it is drawn later. See computeExpandMasks in shared/shaders.js.
    bexp: new Uint8Array(N_SLOTS * MAX_CHART_VERTS),
    // The mesh each chart came from, to reach its texture pattern at flush.
    meshRef: new Array(N_SLOTS).fill(null),
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
export function textureWeldReset(st) {
  const slots = st.slots;
  for (let i = 0; i < N_SLOTS; i++) {
    slots[i * SL_STRIDE + SL_USED] = 0;
    st.meshRef[i] = null;
  }
  st.gen++;
  st.seq = 0;
  st.live = 0;
}

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
      // Marked dead rather than removed. Probing treats it as occupied so it cannot break a chain,
      // and the whole table is discarded by the generation bump between frames.
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

/**
 * Resolves what `ctx.createPattern` should actually read from for a texture image.
 *
 * Safari re-applies an image's embedded colour profile on every draw that references it, where
 * Chrome/Firefox convert once and cache the result - a large, Safari-only cost that source images
 * exported from an editor almost always carry, since sRGB tagging is the default in most export
 * pipelines. Baking the image into an offscreen canvas once and building the pattern from that
 * canvas instead of the live `<img>` pays the conversion here, at pattern-build time, rather than
 * in every `fill()`. A canvas has no colour profile of its own, so nothing is lost by doing this
 * unconditionally rather than gating it to one browser.
 *
 * Deliberately a plain function here rather than a getter on Mesh: an earlier version cached this
 * behind a `texturePatternSource` accessor property on the mesh instead, identical in every other
 * respect - same one-bake-per-texture-assignment result - and measurably regressed Safari again,
 * most likely JSC handling the accessor property worse than a direct call once mesh shapes stop
 * being perfectly monomorphic. Keep this off the mesh.
 *
 * @param {HTMLImageElement} image source image; caller has already checked `img.complete`
 * @returns {HTMLImageElement|HTMLCanvasElement} a same-size canvas holding the decoded image, or
 *   `image` itself where no `document` exists to create one (e.g. this module's own unit tests,
 *   which run under Node rather than a browser)
 */
function texturePatternSource(image) {
  if (typeof document === "undefined") return image;
  const bake = document.createElement("canvas");
  bake.width = image.naturalWidth;
  bake.height = image.naturalHeight;
  bake.getContext("2d").drawImage(image, 0, 0);
  return bake;
}

/**
 * Emits one chart as a single pattern fill and releases the slot.
 *
 * The boundary is pushed outward as it is emitted, which is this pass's whole answer to seams - a
 * pattern fill has no stroke to repair them with. Only the edges this chart OWNS move, meaning the
 * ones whose neighbouring face is drawn later; see computeExpandMasks. Merging already removed the
 * seam that mattered most, a face's own diagonal, by never rasterising it.
 *
 * The offset lives here rather than in the ring, so what the fit test and the edge table see stays
 * the true projected geometry.
 *
 * @param {object} st welder state
 * @param {number} slot chart to emit; a free slot is a no-op
 * @param {CanvasRenderingContext2D} ctx destination context
 * @param {Int32Array} ctxStateBuffer shared cache of what is currently set on `ctx`. The fill
 *   colour slot is invalidated here, because a pattern is not a palette entry and the next flat
 *   face must set its own style rather than trust a stale hit.
 * @param {Int32Array} statsBuffer shared per-frame counters
 * @param {number} callsSlot index in `statsBuffer` counting draw calls
 */
export function textureWeldFlushSlot(
  st,
  slot,
  ctx,
  ctxStateBuffer,
  statsBuffer,
  callsSlot,
) {
  const slots = st.slots;
  const sb = slot * SL_STRIDE;
  if (slots[sb + SL_USED] === 0) return;

  const len = slots[sb + SL_LEN];
  deindexRing(st, slot);
  slots[sb + SL_USED] = 0;
  st.live--;

  const mesh = st.meshRef[slot];
  st.meshRef[slot] = null;
  if (len < 3 || mesh === null) return;

  const base = slot * MAX_CHART_VERTS;
  const bu = st.bu;
  const bv = st.bv;
  const ab = slot * 6;

  let pattern = mesh.texturePattern;
  if (!pattern) {
    // 'repeat' rather than 'no-repeat'. Inside the chart's UV rect the two sample identically, but
    // a non-repeating pattern is transparent outside it, so any UV that strays past the edge would
    // punch a hole rather than sample a neighbouring texel.
    pattern = ctx.createPattern(
      texturePatternSource(mesh.textureImage),
      "repeat",
    );
    mesh.texturePattern = pattern;
  }

  ctx.fillStyle = pattern;
  // The colour cache tracks a palette entry and this is not one; force the next flat face to set
  // its own style rather than trusting a stale hit.
  ctxStateBuffer[CTX_STATE_FILL_PASS_FILL_STYLE_SLOT] = -1;

  const a = st.affine[ab];
  const b = st.affine[ab + 1];
  const c = st.affine[ab + 2];
  const d = st.affine[ab + 3];

  ctx.setTransform(a, b, c, d, st.affine[ab + 4], st.affine[ab + 5]);

  // Seam repair. Two vertices are ADDED per repaired edge - the boundary steps out and back -
  // rather than the edge lines being offset and re-intersected at the corners. Re-intersecting
  // moves the vertices at both ends of every edge it touches, and those corners are shared with
  // edges nobody asked to move, so the chart pokes out from under the neighbour that was supposed
  // to cover it. Stepping out leaves every original corner exactly where the fit put it.
  //
  // The path is in texture space but the offset is a pixel count, so the edge is measured on
  // SCREEN and only the resulting displacement is mapped back. Translation drops out of that: an
  // offset is a difference of points, so the linear part is all that is needed either way. The
  // displacement is constant along an edge, so one inverse-map serves both of its ends.
  const det = a * d - b * c;
  const invDet = det > 1e-12 || det < -1e-12 ? 1 / det : 0;
  const bexp = st.bexp;

  ctx.beginPath();
  for (let i = 0; i < len; i++) {
    const u = bu[base + i];
    const v = bv[base + i];
    if (i === 0) ctx.moveTo(u, v);
    else ctx.lineTo(u, v);
    if (bexp[base + i] === 0) continue;

    const j = i + 1 === len ? 0 : i + 1;
    const uj = bu[base + j];
    const vj = bv[base + j];
    const ex = a * (uj - u) + c * (vj - v);
    const ey = b * (uj - u) + d * (vj - v);
    // Outward is (ey, -ex), the same convention as the flat welder.
    const px = ex < 0 ? -ex : ex;
    const py = ey < 0 ? -ey : ey;
    const l = px > py ? px + 0.4 * py : py + 0.4 * px; // octagonal norm, no sqrt
    if (l < 1e-6) continue;
    const inv = EXPAND / l;
    const nx = ey * inv;
    const ny = -ex * inv;
    const du = (d * nx - c * ny) * invDet;
    const dv = (a * ny - b * nx) * invDet;
    ctx.lineTo(u + du, v + dv);
    ctx.lineTo(uj + du, vj + dv);
  }
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  statsBuffer[callsSlot]++;
}

/**
 * Flushes every open chart, oldest first so charts land roughly where the sort placed them. Ends a
 * pass, and empties the state for the next one.
 *
 * Arguments are as {@link textureWeldFlushSlot}, minus the slot.
 */
export function textureWeldFlushAll(
  st,
  ctx,
  ctxStateBuffer,
  statsBuffer,
  callsSlot,
) {
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
    textureWeldFlushSlot(st, best, ctx, ctxStateBuffer, statsBuffer, callsSlot);
  }
}

/**
 * Merges one textured triangle into the open charts, flushing whatever must be flushed first.
 *
 * Arguments up to `callsSlot` are as {@link textureWeldFlushSlot}; the rest describe the face. The
 * screen positions must be the true projected ones, not seam-expanded: they are what the affine is
 * fitted from and what the fit is later re-checked against, so an offset would corrupt both.
 *
 * @param {object} mesh owning mesh, carrying the texture and its cached pattern. A chart refuses a
 *   face from another one, since it paints with a single mesh's texture.
 * @param {number} nx face normal x, in the same space for every face - the coplanarity test
 * @param {number} ny face normal y
 * @param {number} nz face normal z
 * @param {number} u0 texture-space x of the first corner
 * @param {number} v0 texture-space y of the first corner
 * @param {number} id0 welded vertex identity of the first corner, which is what adjacency is
 *   matched on - positions are never compared
 * @param {number} px0 true projected screen x of the first corner
 * @param {number} py0 true projected screen y of the first corner
 * @param {number} u1 texture-space x of the second corner
 * @param {number} v1 texture-space y of the second corner
 * @param {number} id1 welded vertex identity of the second corner
 * @param {number} px1 true projected screen x of the second corner
 * @param {number} py1 true projected screen y of the second corner
 * @param {number} u2 texture-space x of the third corner
 * @param {number} v2 texture-space y of the third corner
 * @param {number} id2 welded vertex identity of the third corner
 * @param {number} px2 true projected screen x of the third corner
 * @param {number} py2 true projected screen y of the third corner
 * @param {number} [expandMask] 1 bit per triangle edge (edge k runs from corner k to corner k+1),
 *   set where this face owns that edge's seam repair - see computeExpandMasks in shared/shaders.js.
 *   0, the default, grows nothing, which is what a caller that has not opted in gets.
 */
export function textureWeldAddFace(
  st,
  ctx,
  ctxStateBuffer,
  statsBuffer,
  callsSlot,
  mesh,
  nx,
  ny,
  nz,
  u0,
  v0,
  id0,
  px0,
  py0,
  u1,
  v1,
  id1,
  px1,
  py1,
  u2,
  v2,
  id2,
  px2,
  py2,
  expandMask = 0,
) {
  const slots = st.slots;
  const seq = ++st.seq;

  const fx0 = px0 < px1 ? (px0 < px2 ? px0 : px2) : px1 < px2 ? px1 : px2;
  const fx1 = px0 > px1 ? (px0 > px2 ? px0 : px2) : px1 > px2 ? px1 : px2;
  const fy0 = py0 < py1 ? (py0 < py2 ? py0 : py2) : py1 < py2 ? py1 : py2;
  const fy1 = py0 > py1 ? (py0 > py2 ? py0 : py2) : py1 > py2 ? py1 : py2;

  let target = -1;
  let hitA = -1; // boundary index of the first matched edge
  let hitB = -1; // and of a second, when this face fills a notch
  let newU = 0;
  let newV = 0;
  let newId = -1;
  let cancelled = -1; // triangle edge the single match cancels
  let survivor = -1; // triangle edge that outlives a notch

  if (st.live > 0) {
    // A consistently wound neighbour presents the shared edge reversed, so a match is a lookup of
    // this triangle's own edges backwards.
    const s0 = edgeFind(st, id1, id0);
    const s1 = edgeFind(st, id2, id1);
    const s2 = edgeFind(st, id0, id2);

    for (let k = 0; k < 3 && target === -1; k++) {
      const s = k === 0 ? s0 : k === 1 ? s1 : s2;
      if (s === -1) continue;
      const sb = s * SL_STRIDE;
      if (slots[sb + SL_USED] === 0) continue;
      // Vertex identities are offset per mesh, so an edge should never match across meshes - but
      // the chart carries one mesh's texture, so check rather than depend on the caller's
      // numbering.
      if (st.meshRef[s] !== mesh) continue;

      // Coplanarity: a shared edge gives the two faces a common point, so equal normals put them
      // on the same plane. Without this two perpendicular sides of a position-welded mesh fuse.
      const nb = s * 3;
      const dot =
        st.normal[nb] * nx + st.normal[nb + 1] * ny + st.normal[nb + 2] * nz;
      if (dot < COPLANAR_DOT) continue;

      // The chart's map must still describe this face; see FIT_EPS.
      const ab = s * 6;
      const a = st.affine[ab];
      const bT = st.affine[ab + 1];
      const c = st.affine[ab + 2];
      const d = st.affine[ab + 3];
      const e = st.affine[ab + 4];
      const f = st.affine[ab + 5];
      let dx = a * u0 + c * v0 + e - px0;
      let dy = bT * u0 + d * v0 + f - py0;
      if (dx * dx + dy * dy > FIT_EPS * FIT_EPS) continue;
      dx = a * u1 + c * v1 + e - px1;
      dy = bT * u1 + d * v1 + f - py1;
      if (dx * dx + dy * dy > FIT_EPS * FIT_EPS) continue;
      dx = a * u2 + c * v2 + e - px2;
      dy = bT * u2 + d * v2 + f - py2;
      if (dx * dx + dy * dy > FIT_EPS * FIT_EPS) continue;

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
          newU = u2;
          newV = v2;
          newId = id2;
          cancelled = 0;
        } else if (at1 !== -1) {
          hitA = at1;
          newU = u0;
          newV = v0;
          newId = id0;
          cancelled = 1;
        } else {
          hitA = at2;
          newU = u1;
          newV = v1;
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
      textureWeldFlushSlot(st, s, ctx, ctxStateBuffer, statsBuffer, callsSlot);
    }
  }

  if (target !== -1) {
    const base = target * MAX_CHART_VERTS;
    const sb = target * SL_STRIDE;
    const len = slots[sb + SL_LEN];
    const bu = st.bu;
    const bv = st.bv;
    const bid = st.bid;
    const bexp = st.bexp;

    if (hitB === -1) {
      // Extend: the new corner goes between the endpoints of the matched edge.
      const from = bid[base + hitA];
      const to = bid[base + ((hitA + 1) % len)];
      edgeDelete(st, from, to);
      for (let i = len; i > hitA + 1; i--) {
        bu[base + i] = bu[base + i - 1];
        bv[base + i] = bv[base + i - 1];
        bid[base + i] = bid[base + i - 1];
        bexp[base + i] = bexp[base + i - 1];
      }
      bu[base + hitA + 1] = newU;
      bv[base + hitA + 1] = newV;
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
        bu[base + i] = bu[base + i + 1];
        bv[base + i] = bv[base + i + 1];
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
    textureWeldFlushSlot(st, slot, ctx, ctxStateBuffer, statsBuffer, callsSlot);
  }

  // Fit the affine carrying this triangle's texture space onto the screen. Degenerate UVs have no
  // such map; the caller has already rejected those.
  const delta = u0 * (v1 - v2) - v0 * (u1 - u2) + (u1 * v2 - u2 * v1);
  const inv = 1 / delta;
  const ab = slot * 6;
  st.affine[ab] = (px0 * (v1 - v2) + px1 * (v2 - v0) + px2 * (v0 - v1)) * inv;
  st.affine[ab + 1] =
    (py0 * (v1 - v2) + py1 * (v2 - v0) + py2 * (v0 - v1)) * inv;
  st.affine[ab + 2] =
    (px0 * (u2 - u1) + px1 * (u0 - u2) + px2 * (u1 - u0)) * inv;
  st.affine[ab + 3] =
    (py0 * (u2 - u1) + py1 * (u0 - u2) + py2 * (u1 - u0)) * inv;
  st.affine[ab + 4] =
    (px0 * (u1 * v2 - u2 * v1) +
      px1 * (u2 * v0 - u0 * v2) +
      px2 * (u0 * v1 - u1 * v0)) *
    inv;
  st.affine[ab + 5] =
    (py0 * (u1 * v2 - u2 * v1) +
      py1 * (u2 * v0 - u0 * v2) +
      py2 * (u0 * v1 - u1 * v0)) *
    inv;

  const nb = slot * 3;
  st.normal[nb] = nx;
  st.normal[nb + 1] = ny;
  st.normal[nb + 2] = nz;

  const base = slot * MAX_CHART_VERTS;
  st.bu[base] = u0;
  st.bv[base] = v0;
  st.bid[base] = id0;
  st.bu[base + 1] = u1;
  st.bv[base + 1] = v1;
  st.bid[base + 1] = id1;
  st.bu[base + 2] = u2;
  st.bv[base + 2] = v2;
  st.bid[base + 2] = id2;
  // Vertex k's outgoing edge IS triangle edge k, by construction of the seed ring.
  st.bexp[base] = expandMask & 1;
  st.bexp[base + 1] = (expandMask >> 1) & 1;
  st.bexp[base + 2] = (expandMask >> 2) & 1;

  const sb = slot * SL_STRIDE;
  slots[sb + SL_USED] = 1;
  slots[sb + SL_LEN] = 3;
  slots[sb + SL_SEQ] = seq;
  st.meshRef[slot] = mesh;
  st.live++;

  const g = slot << 2;
  aabb[g] = fx0;
  aabb[g + 1] = fy0;
  aabb[g + 2] = fx1;
  aabb[g + 3] = fy1;

  indexRing(st, slot);
}
