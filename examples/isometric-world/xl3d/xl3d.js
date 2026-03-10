const Lr = {
  depthSortingMask: parseInt("10", 2),
  //bitmask, bit per layer
  layerStrokeMask: parseInt("11", 2),
  //bitmask, bit per layer
  layerClearMask: parseInt("11", 2),
  //bitmask, bit per layer
  layersCount: 2,
  debug: !0
};
function ae() {
  this.now = Date.now();
}
var An = ae.prototype;
An.time = 0;
An.now = 0;
An.dt = 60;
function se(r) {
  this.logic = r, this.gameObjects = [], this.removeQueue = [];
}
var hr = se.prototype;
hr.logic = null;
hr.gameObjects = null;
hr.gameObjectsCount = 0;
hr.removeQueue = null;
hr.removeQueueWaiting = !1;
hr.started = !1;
hr.light = null;
hr.addGameObject = function(r) {
  if (this.gameObjects[this.gameObjectsCount++] = r, r.setScene(this), this.started && r.start(), r.transform.children.length !== 0)
    for (var n = 0; n < r.transform.children.length; n++) {
      var e = r.transform.children[n].gameObject;
      this.addGameObject(e);
    }
};
hr.addLightSource = function(r) {
  return this.light = r, this.addGameObject(r);
};
hr.removeGameObject = function(r) {
  if (r.transform.children.length !== 0)
    for (var n = 0; n < r.transform.children.length; n++) {
      var e = r.transform.children[n].gameObject;
      this.removeGameObject(e);
    }
  this.removeQueue.push(r), this.removeQueueWaiting = !0;
};
hr.retrieve = function(r) {
  return this.gameObjects;
};
hr.start = function() {
  for (var r = 0; r < this.gameObjectsCount; r++)
    this.gameObjects[r].start();
  this.started = !0;
};
hr.findByName = function(r) {
  var n = [], e = this.gameObjects, t = this.gameObjectsCount, a, s;
  for (s = 0; s < t; s++)
    a = e[s], a.name === r && n.push(a);
  return n.length === 1 ? n[0] : n.length > 1 ? n : !1;
};
function ie(r) {
  this.game = r, this.time = new ae(), this.list = [], this.scene = new se(this);
}
var gr = ie.prototype;
gr.game = null;
gr.scene = null;
gr.time = null;
gr.start = function() {
  this.scene.start();
};
gr.tickRegister = function(r) {
  r._tickerIndex === void 0 && (r._tickerIndex = this.list.length, this.list.push(r));
};
gr.tickUnregister = function(r) {
  const n = r._tickerIndex;
  if (n === void 0) return;
  const e = this.list.pop();
  e !== r && (this.list[n] = e, e._tickerIndex = n), r._tickerIndex = void 0;
};
gr.update = function(r) {
  const n = this.list;
  for (let e = 0; e < n.length; e++)
    n[e].tick(r);
};
gr.tick = function() {
  for (var r = Date.now(), n = 0, e = r - this.time.now, t = this.time.dt; e >= t && (e -= t, this.time.now += t, this.time.time += t, this.update(this.time), !(n++ > 200)); )
    ;
};
function ce() {
  this.world = new ie(this);
  var r = this.world;
  this.tick = function n() {
    r.tick(), requestAnimationFrame(n);
  };
}
var Jr = ce.prototype;
Jr.world = null;
Jr.render = null;
Jr.run = function() {
  this.world.start(), this.tick();
};
Jr.rafHandler = null;
function qn() {
  this.eventListeners = [];
}
var Kr = qn.prototype;
Kr.eventListeners = null;
Kr.addEventListener = function(r, n) {
  var e = this.eventListeners[r];
  e ? e[e.length] = n : e = [n], this.eventListeners[r] = e;
};
Kr.dispatchEvent = function(r, n) {
  var e = this.eventListeners[r], t = e === void 0 ? 0 : e.length;
  if (t !== 0)
    for (var a = 0; a < t; a++)
      e[a](n);
};
Kr.removeEventListener = function(r, n) {
  this.eventListeners[r].splice(this.eventListeners[r].indexOf(n), 1);
};
function B() {
  qn.call(this);
}
var zr = B.prototype = Object.create(qn.prototype);
zr.gameObject = null;
zr.enabled = !0;
zr.awaken = !1;
zr.setGameObject = function(r) {
  this.gameObject = r;
};
zr.unsetGameObject = function() {
  this.gameObject = null;
};
zr.awake = null;
zr.start = null;
zr.tick = null;
function W1(r, n, e, t, a, s) {
  return r[n] = s[0] * e + s[4] * t + s[8] * a + s[12], r[n + 1] = s[1] * e + s[5] * t + s[9] * a + s[13], r[n + 2] = s[2] * e + s[6] * t + s[10] * a + s[14], r;
}
function P1(r, n, e, t, a, s) {
  return r[n] = s[0] * e + s[4] * t + s[8] * a + s[12], r[n + 1] = s[1] * e + s[5] * t + s[9] * a + s[13], r;
}
function ur(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = n[8], d = n[9], M = n[10], y = n[11], p = n[12], m = n[13], o = n[14], $ = n[15], x = e[0], g = e[1], w = e[2], z = e[3];
  return r[0] = x * t + g * c + w * v + z * p, r[1] = x * a + g * l + w * d + z * m, r[2] = x * s + g * h + w * M + z * o, r[3] = x * i + g * f + w * y + z * $, x = e[4], g = e[5], w = e[6], z = e[7], r[4] = x * t + g * c + w * v + z * p, r[5] = x * a + g * l + w * d + z * m, r[6] = x * s + g * h + w * M + z * o, r[7] = x * i + g * f + w * y + z * $, x = e[8], g = e[9], w = e[10], z = e[11], r[8] = x * t + g * c + w * v + z * p, r[9] = x * a + g * l + w * d + z * m, r[10] = x * s + g * h + w * M + z * o, r[11] = x * i + g * f + w * y + z * $, x = e[12], g = e[13], w = e[14], z = e[15], r[12] = x * t + g * c + w * v + z * p, r[13] = x * a + g * l + w * d + z * m, r[14] = x * s + g * h + w * M + z * o, r[15] = x * i + g * f + w * y + z * $, r;
}
var j = 1e-6, R = typeof Float32Array < "u" ? Float32Array : Array, yr = Math.random, le = "zyx";
function pr(r) {
  return r >= 0 ? Math.round(r) : r % 0.5 === 0 ? Math.floor(r) : Math.round(r);
}
function E1(r) {
  R = r;
}
var C1 = Math.PI / 180, k1 = 180 / Math.PI;
function D1(r) {
  return r * C1;
}
function B1(r) {
  return r * k1;
}
function N1(r, n) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : j;
  return Math.abs(r - n) <= e * Math.max(1, Math.abs(r), Math.abs(n));
}
const U1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: le,
  get ARRAY_TYPE() {
    return R;
  },
  EPSILON: j,
  RANDOM: yr,
  equals: N1,
  round: pr,
  setMatrixArrayType: E1,
  toDegree: B1,
  toRadian: D1
}, Symbol.toStringTag, { value: "Module" }));
function V1() {
  var r = new R(4);
  return R != Float32Array && (r[1] = 0, r[2] = 0), r[0] = 1, r[3] = 1, r;
}
function G1(r) {
  var n = new R(4);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n;
}
function Y1(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function X1(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r;
}
function Z1(r, n, e, t) {
  var a = new R(4);
  return a[0] = r, a[1] = n, a[2] = e, a[3] = t, a;
}
function _1(r, n, e, t, a) {
  return r[0] = n, r[1] = e, r[2] = t, r[3] = a, r;
}
function Q1(r, n) {
  if (r === n) {
    var e = n[1];
    r[1] = n[2], r[2] = e;
  } else
    r[0] = n[0], r[1] = n[2], r[2] = n[1], r[3] = n[3];
  return r;
}
function H1(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = e * s - a * t;
  return i ? (i = 1 / i, r[0] = s * i, r[1] = -t * i, r[2] = -a * i, r[3] = e * i, r) : null;
}
function J1(r, n) {
  var e = n[0];
  return r[0] = n[3], r[1] = -n[1], r[2] = -n[2], r[3] = e, r;
}
function K1(r) {
  return r[0] * r[3] - r[2] * r[1];
}
function he(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return r[0] = t * c + s * l, r[1] = a * c + i * l, r[2] = t * h + s * f, r[3] = a * h + i * f, r;
}
function u1(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = Math.sin(e), l = Math.cos(e);
  return r[0] = t * l + s * c, r[1] = a * l + i * c, r[2] = t * -c + s * l, r[3] = a * -c + i * l, r;
}
function rt(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = e[0], l = e[1];
  return r[0] = t * c, r[1] = a * c, r[2] = s * l, r[3] = i * l, r;
}
function nt(r, n) {
  var e = Math.sin(n), t = Math.cos(n);
  return r[0] = t, r[1] = e, r[2] = -e, r[3] = t, r;
}
function et(r, n) {
  return r[0] = n[0], r[1] = 0, r[2] = 0, r[3] = n[1], r;
}
function tt(r) {
  return "mat2(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ")";
}
function at(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2] + r[3] * r[3]);
}
function st(r, n, e, t) {
  return r[2] = t[2] / t[0], e[0] = t[0], e[1] = t[1], e[3] = t[3] - r[2] * e[1], [r, n, e];
}
function it(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r[3] = n[3] + e[3], r;
}
function fe(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r[2] = n[2] - e[2], r[3] = n[3] - e[3], r;
}
function ct(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2] && r[3] === n[3];
}
function lt(r, n) {
  var e = r[0], t = r[1], a = r[2], s = r[3], i = n[0], c = n[1], l = n[2], h = n[3];
  return Math.abs(e - i) <= j * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(t - c) <= j * Math.max(1, Math.abs(t), Math.abs(c)) && Math.abs(a - l) <= j * Math.max(1, Math.abs(a), Math.abs(l)) && Math.abs(s - h) <= j * Math.max(1, Math.abs(s), Math.abs(h));
}
function ht(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r[3] = n[3] * e, r;
}
function ft(r, n, e, t) {
  return r[0] = n[0] + e[0] * t, r[1] = n[1] + e[1] * t, r[2] = n[2] + e[2] * t, r[3] = n[3] + e[3] * t, r;
}
var vt = he, dt = fe;
const Mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: st,
  add: it,
  adjoint: J1,
  clone: G1,
  copy: Y1,
  create: V1,
  determinant: K1,
  equals: lt,
  exactEquals: ct,
  frob: at,
  fromRotation: nt,
  fromScaling: et,
  fromValues: Z1,
  identity: X1,
  invert: H1,
  mul: vt,
  multiply: he,
  multiplyScalar: ht,
  multiplyScalarAndAdd: ft,
  rotate: u1,
  scale: rt,
  set: _1,
  str: tt,
  sub: dt,
  subtract: fe,
  transpose: Q1
}, Symbol.toStringTag, { value: "Module" }));
function yt() {
  var r = new R(6);
  return R != Float32Array && (r[1] = 0, r[2] = 0, r[4] = 0, r[5] = 0), r[0] = 1, r[3] = 1, r;
}
function mt(r) {
  var n = new R(6);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n;
}
function pt(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r;
}
function ot(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = 0, r[5] = 0, r;
}
function xt(r, n, e, t, a, s) {
  var i = new R(6);
  return i[0] = r, i[1] = n, i[2] = e, i[3] = t, i[4] = a, i[5] = s, i;
}
function $t(r, n, e, t, a, s, i) {
  return r[0] = n, r[1] = e, r[2] = t, r[3] = a, r[4] = s, r[5] = i, r;
}
function wt(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = n[4], c = n[5], l = e * s - t * a;
  return l ? (l = 1 / l, r[0] = s * l, r[1] = -t * l, r[2] = -a * l, r[3] = e * l, r[4] = (a * c - s * i) * l, r[5] = (t * i - e * c) * l, r) : null;
}
function gt(r) {
  return r[0] * r[3] - r[1] * r[2];
}
function ve(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = e[0], f = e[1], v = e[2], d = e[3], M = e[4], y = e[5];
  return r[0] = t * h + s * f, r[1] = a * h + i * f, r[2] = t * v + s * d, r[3] = a * v + i * d, r[4] = t * M + s * y + c, r[5] = a * M + i * y + l, r;
}
function zt(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = Math.sin(e), f = Math.cos(e);
  return r[0] = t * f + s * h, r[1] = a * f + i * h, r[2] = t * -h + s * f, r[3] = a * -h + i * f, r[4] = c, r[5] = l, r;
}
function bt(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = e[0], f = e[1];
  return r[0] = t * h, r[1] = a * h, r[2] = s * f, r[3] = i * f, r[4] = c, r[5] = l, r;
}
function At(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = e[0], f = e[1];
  return r[0] = t, r[1] = a, r[2] = s, r[3] = i, r[4] = t * h + s * f + c, r[5] = a * h + i * f + l, r;
}
function qt(r, n) {
  var e = Math.sin(n), t = Math.cos(n);
  return r[0] = t, r[1] = e, r[2] = -e, r[3] = t, r[4] = 0, r[5] = 0, r;
}
function Ot(r, n) {
  return r[0] = n[0], r[1] = 0, r[2] = 0, r[3] = n[1], r[4] = 0, r[5] = 0, r;
}
function jt(r, n) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = n[0], r[5] = n[1], r;
}
function Tt(r) {
  return "mat2d(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ", " + r[4] + ", " + r[5] + ")";
}
function St(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2] + r[3] * r[3] + r[4] * r[4] + r[5] * r[5] + 1);
}
function Lt(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r[3] = n[3] + e[3], r[4] = n[4] + e[4], r[5] = n[5] + e[5], r;
}
function de(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r[2] = n[2] - e[2], r[3] = n[3] - e[3], r[4] = n[4] - e[4], r[5] = n[5] - e[5], r;
}
function Ft(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r[3] = n[3] * e, r[4] = n[4] * e, r[5] = n[5] * e, r;
}
function It(r, n, e, t) {
  return r[0] = n[0] + e[0] * t, r[1] = n[1] + e[1] * t, r[2] = n[2] + e[2] * t, r[3] = n[3] + e[3] * t, r[4] = n[4] + e[4] * t, r[5] = n[5] + e[5] * t, r;
}
function Rt(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2] && r[3] === n[3] && r[4] === n[4] && r[5] === n[5];
}
function Wt(r, n) {
  var e = r[0], t = r[1], a = r[2], s = r[3], i = r[4], c = r[5], l = n[0], h = n[1], f = n[2], v = n[3], d = n[4], M = n[5];
  return Math.abs(e - l) <= j * Math.max(1, Math.abs(e), Math.abs(l)) && Math.abs(t - h) <= j * Math.max(1, Math.abs(t), Math.abs(h)) && Math.abs(a - f) <= j * Math.max(1, Math.abs(a), Math.abs(f)) && Math.abs(s - v) <= j * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(i - d) <= j * Math.max(1, Math.abs(i), Math.abs(d)) && Math.abs(c - M) <= j * Math.max(1, Math.abs(c), Math.abs(M));
}
var Pt = ve, Et = de;
const Ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Lt,
  clone: mt,
  copy: pt,
  create: yt,
  determinant: gt,
  equals: Wt,
  exactEquals: Rt,
  frob: St,
  fromRotation: qt,
  fromScaling: Ot,
  fromTranslation: jt,
  fromValues: xt,
  identity: ot,
  invert: wt,
  mul: Pt,
  multiply: ve,
  multiplyScalar: Ft,
  multiplyScalarAndAdd: It,
  rotate: zt,
  scale: bt,
  set: $t,
  str: Tt,
  sub: Et,
  subtract: de,
  translate: At
}, Symbol.toStringTag, { value: "Module" }));
function Me() {
  var r = new R(9);
  return R != Float32Array && (r[1] = 0, r[2] = 0, r[3] = 0, r[5] = 0, r[6] = 0, r[7] = 0), r[0] = 1, r[4] = 1, r[8] = 1, r;
}
function kt(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[4], r[4] = n[5], r[5] = n[6], r[6] = n[8], r[7] = n[9], r[8] = n[10], r;
}
function Dt(r) {
  var n = new R(9);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n;
}
function Bt(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r;
}
function Nt(r, n, e, t, a, s, i, c, l) {
  var h = new R(9);
  return h[0] = r, h[1] = n, h[2] = e, h[3] = t, h[4] = a, h[5] = s, h[6] = i, h[7] = c, h[8] = l, h;
}
function Ut(r, n, e, t, a, s, i, c, l, h) {
  return r[0] = n, r[1] = e, r[2] = t, r[3] = a, r[4] = s, r[5] = i, r[6] = c, r[7] = l, r[8] = h, r;
}
function Vt(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 1, r[5] = 0, r[6] = 0, r[7] = 0, r[8] = 1, r;
}
function Gt(r, n) {
  if (r === n) {
    var e = n[1], t = n[2], a = n[5];
    r[1] = n[3], r[2] = n[6], r[3] = e, r[5] = n[7], r[6] = t, r[7] = a;
  } else
    r[0] = n[0], r[1] = n[3], r[2] = n[6], r[3] = n[1], r[4] = n[4], r[5] = n[7], r[6] = n[2], r[7] = n[5], r[8] = n[8];
  return r;
}
function Yt(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = f * i - c * h, d = -f * s + c * l, M = h * s - i * l, y = e * v + t * d + a * M;
  return y ? (y = 1 / y, r[0] = v * y, r[1] = (-f * t + a * h) * y, r[2] = (c * t - a * i) * y, r[3] = d * y, r[4] = (f * e - a * l) * y, r[5] = (-c * e + a * s) * y, r[6] = M * y, r[7] = (-h * e + t * l) * y, r[8] = (i * e - t * s) * y, r) : null;
}
function Xt(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8];
  return r[0] = i * f - c * h, r[1] = a * h - t * f, r[2] = t * c - a * i, r[3] = c * l - s * f, r[4] = e * f - a * l, r[5] = a * s - e * c, r[6] = s * h - i * l, r[7] = t * l - e * h, r[8] = e * i - t * s, r;
}
function Zt(r) {
  var n = r[0], e = r[1], t = r[2], a = r[3], s = r[4], i = r[5], c = r[6], l = r[7], h = r[8];
  return n * (h * s - i * l) + e * (-h * a + i * c) + t * (l * a - s * c);
}
function ye(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = n[8], d = e[0], M = e[1], y = e[2], p = e[3], m = e[4], o = e[5], $ = e[6], x = e[7], g = e[8];
  return r[0] = d * t + M * i + y * h, r[1] = d * a + M * c + y * f, r[2] = d * s + M * l + y * v, r[3] = p * t + m * i + o * h, r[4] = p * a + m * c + o * f, r[5] = p * s + m * l + o * v, r[6] = $ * t + x * i + g * h, r[7] = $ * a + x * c + g * f, r[8] = $ * s + x * l + g * v, r;
}
function _t(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = n[8], d = e[0], M = e[1];
  return r[0] = t, r[1] = a, r[2] = s, r[3] = i, r[4] = c, r[5] = l, r[6] = d * t + M * i + h, r[7] = d * a + M * c + f, r[8] = d * s + M * l + v, r;
}
function Qt(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = n[8], d = Math.sin(e), M = Math.cos(e);
  return r[0] = M * t + d * i, r[1] = M * a + d * c, r[2] = M * s + d * l, r[3] = M * i - d * t, r[4] = M * c - d * a, r[5] = M * l - d * s, r[6] = h, r[7] = f, r[8] = v, r;
}
function Ht(r, n, e) {
  var t = e[0], a = e[1];
  return r[0] = t * n[0], r[1] = t * n[1], r[2] = t * n[2], r[3] = a * n[3], r[4] = a * n[4], r[5] = a * n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r;
}
function Jt(r, n) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 1, r[5] = 0, r[6] = n[0], r[7] = n[1], r[8] = 1, r;
}
function Kt(r, n) {
  var e = Math.sin(n), t = Math.cos(n);
  return r[0] = t, r[1] = e, r[2] = 0, r[3] = -e, r[4] = t, r[5] = 0, r[6] = 0, r[7] = 0, r[8] = 1, r;
}
function ut(r, n) {
  return r[0] = n[0], r[1] = 0, r[2] = 0, r[3] = 0, r[4] = n[1], r[5] = 0, r[6] = 0, r[7] = 0, r[8] = 1, r;
}
function r0(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = 0, r[3] = n[2], r[4] = n[3], r[5] = 0, r[6] = n[4], r[7] = n[5], r[8] = 1, r;
}
function n0(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = e + e, c = t + t, l = a + a, h = e * i, f = t * i, v = t * c, d = a * i, M = a * c, y = a * l, p = s * i, m = s * c, o = s * l;
  return r[0] = 1 - v - y, r[3] = f - o, r[6] = d + m, r[1] = f + o, r[4] = 1 - h - y, r[7] = M - p, r[2] = d - m, r[5] = M + p, r[8] = 1 - h - v, r;
}
function e0(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = n[9], d = n[10], M = n[11], y = n[12], p = n[13], m = n[14], o = n[15], $ = e * c - t * i, x = e * l - a * i, g = e * h - s * i, w = t * l - a * c, z = t * h - s * c, S = a * h - s * l, b = f * p - v * y, q = f * m - d * y, A = f * o - M * y, F = v * m - d * p, T = v * o - M * p, L = d * o - M * m, O = $ * L - x * T + g * F + w * A - z * q + S * b;
  return O ? (O = 1 / O, r[0] = (c * L - l * T + h * F) * O, r[1] = (l * A - i * L - h * q) * O, r[2] = (i * T - c * A + h * b) * O, r[3] = (a * T - t * L - s * F) * O, r[4] = (e * L - a * A + s * q) * O, r[5] = (t * A - e * T - s * b) * O, r[6] = (p * S - m * z + o * w) * O, r[7] = (m * g - y * S - o * x) * O, r[8] = (y * z - p * g + o * $) * O, r) : null;
}
function t0(r, n, e) {
  return r[0] = 2 / n, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = -2 / e, r[5] = 0, r[6] = -1, r[7] = 1, r[8] = 1, r;
}
function a0(r) {
  return "mat3(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ", " + r[4] + ", " + r[5] + ", " + r[6] + ", " + r[7] + ", " + r[8] + ")";
}
function s0(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2] + r[3] * r[3] + r[4] * r[4] + r[5] * r[5] + r[6] * r[6] + r[7] * r[7] + r[8] * r[8]);
}
function i0(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r[3] = n[3] + e[3], r[4] = n[4] + e[4], r[5] = n[5] + e[5], r[6] = n[6] + e[6], r[7] = n[7] + e[7], r[8] = n[8] + e[8], r;
}
function me(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r[2] = n[2] - e[2], r[3] = n[3] - e[3], r[4] = n[4] - e[4], r[5] = n[5] - e[5], r[6] = n[6] - e[6], r[7] = n[7] - e[7], r[8] = n[8] - e[8], r;
}
function c0(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r[3] = n[3] * e, r[4] = n[4] * e, r[5] = n[5] * e, r[6] = n[6] * e, r[7] = n[7] * e, r[8] = n[8] * e, r;
}
function l0(r, n, e, t) {
  return r[0] = n[0] + e[0] * t, r[1] = n[1] + e[1] * t, r[2] = n[2] + e[2] * t, r[3] = n[3] + e[3] * t, r[4] = n[4] + e[4] * t, r[5] = n[5] + e[5] * t, r[6] = n[6] + e[6] * t, r[7] = n[7] + e[7] * t, r[8] = n[8] + e[8] * t, r;
}
function h0(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2] && r[3] === n[3] && r[4] === n[4] && r[5] === n[5] && r[6] === n[6] && r[7] === n[7] && r[8] === n[8];
}
function f0(r, n) {
  var e = r[0], t = r[1], a = r[2], s = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = n[0], d = n[1], M = n[2], y = n[3], p = n[4], m = n[5], o = n[6], $ = n[7], x = n[8];
  return Math.abs(e - v) <= j * Math.max(1, Math.abs(e), Math.abs(v)) && Math.abs(t - d) <= j * Math.max(1, Math.abs(t), Math.abs(d)) && Math.abs(a - M) <= j * Math.max(1, Math.abs(a), Math.abs(M)) && Math.abs(s - y) <= j * Math.max(1, Math.abs(s), Math.abs(y)) && Math.abs(i - p) <= j * Math.max(1, Math.abs(i), Math.abs(p)) && Math.abs(c - m) <= j * Math.max(1, Math.abs(c), Math.abs(m)) && Math.abs(l - o) <= j * Math.max(1, Math.abs(l), Math.abs(o)) && Math.abs(h - $) <= j * Math.max(1, Math.abs(h), Math.abs($)) && Math.abs(f - x) <= j * Math.max(1, Math.abs(f), Math.abs(x));
}
var v0 = ye, d0 = me;
const M0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: i0,
  adjoint: Xt,
  clone: Dt,
  copy: Bt,
  create: Me,
  determinant: Zt,
  equals: f0,
  exactEquals: h0,
  frob: s0,
  fromMat2d: r0,
  fromMat4: kt,
  fromQuat: n0,
  fromRotation: Kt,
  fromScaling: ut,
  fromTranslation: Jt,
  fromValues: Nt,
  identity: Vt,
  invert: Yt,
  mul: v0,
  multiply: ye,
  multiplyScalar: c0,
  multiplyScalarAndAdd: l0,
  normalFromMat4: e0,
  projection: t0,
  rotate: Qt,
  scale: Ht,
  set: Ut,
  str: a0,
  sub: d0,
  subtract: me,
  translate: _t,
  transpose: Gt
}, Symbol.toStringTag, { value: "Module" }));
function y0() {
  var r = new R(16);
  return R != Float32Array && (r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0), r[0] = 1, r[5] = 1, r[10] = 1, r[15] = 1, r;
}
function m0(r) {
  var n = new R(16);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n[9] = r[9], n[10] = r[10], n[11] = r[11], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], n;
}
function p0(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r[9] = n[9], r[10] = n[10], r[11] = n[11], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15], r;
}
function o0(r, n, e, t, a, s, i, c, l, h, f, v, d, M, y, p) {
  var m = new R(16);
  return m[0] = r, m[1] = n, m[2] = e, m[3] = t, m[4] = a, m[5] = s, m[6] = i, m[7] = c, m[8] = l, m[9] = h, m[10] = f, m[11] = v, m[12] = d, m[13] = M, m[14] = y, m[15] = p, m;
}
function x0(r, n, e, t, a, s, i, c, l, h, f, v, d, M, y, p, m) {
  return r[0] = n, r[1] = e, r[2] = t, r[3] = a, r[4] = s, r[5] = i, r[6] = c, r[7] = l, r[8] = h, r[9] = f, r[10] = v, r[11] = d, r[12] = M, r[13] = y, r[14] = p, r[15] = m, r;
}
function On(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = 1, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 1, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function $0(r, n) {
  if (r === n) {
    var e = n[1], t = n[2], a = n[3], s = n[6], i = n[7], c = n[11];
    r[1] = n[4], r[2] = n[8], r[3] = n[12], r[4] = e, r[6] = n[9], r[7] = n[13], r[8] = t, r[9] = s, r[11] = n[14], r[12] = a, r[13] = i, r[14] = c;
  } else
    r[0] = n[0], r[1] = n[4], r[2] = n[8], r[3] = n[12], r[4] = n[1], r[5] = n[5], r[6] = n[9], r[7] = n[13], r[8] = n[2], r[9] = n[6], r[10] = n[10], r[11] = n[14], r[12] = n[3], r[13] = n[7], r[14] = n[11], r[15] = n[15];
  return r;
}
function pe(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = n[9], d = n[10], M = n[11], y = n[12], p = n[13], m = n[14], o = n[15], $ = e * c - t * i, x = e * l - a * i, g = e * h - s * i, w = t * l - a * c, z = t * h - s * c, S = a * h - s * l, b = f * p - v * y, q = f * m - d * y, A = f * o - M * y, F = v * m - d * p, T = v * o - M * p, L = d * o - M * m, O = $ * L - x * T + g * F + w * A - z * q + S * b;
  return O ? (O = 1 / O, r[0] = (c * L - l * T + h * F) * O, r[1] = (a * T - t * L - s * F) * O, r[2] = (p * S - m * z + o * w) * O, r[3] = (d * z - v * S - M * w) * O, r[4] = (l * A - i * L - h * q) * O, r[5] = (e * L - a * A + s * q) * O, r[6] = (m * g - y * S - o * x) * O, r[7] = (f * S - d * g + M * x) * O, r[8] = (i * T - c * A + h * b) * O, r[9] = (t * A - e * T - s * b) * O, r[10] = (y * z - p * g + o * $) * O, r[11] = (v * g - f * z - M * $) * O, r[12] = (c * q - i * F - l * b) * O, r[13] = (e * F - t * q + a * b) * O, r[14] = (p * x - y * w - m * $) * O, r[15] = (f * w - v * x + d * $) * O, r) : null;
}
function w0(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = n[9], d = n[10], M = n[11], y = n[12], p = n[13], m = n[14], o = n[15], $ = e * c - t * i, x = e * l - a * i, g = e * h - s * i, w = t * l - a * c, z = t * h - s * c, S = a * h - s * l, b = f * p - v * y, q = f * m - d * y, A = f * o - M * y, F = v * m - d * p, T = v * o - M * p, L = d * o - M * m;
  return r[0] = c * L - l * T + h * F, r[1] = a * T - t * L - s * F, r[2] = p * S - m * z + o * w, r[3] = d * z - v * S - M * w, r[4] = l * A - i * L - h * q, r[5] = e * L - a * A + s * q, r[6] = m * g - y * S - o * x, r[7] = f * S - d * g + M * x, r[8] = i * T - c * A + h * b, r[9] = t * A - e * T - s * b, r[10] = y * z - p * g + o * $, r[11] = v * g - f * z - M * $, r[12] = c * q - i * F - l * b, r[13] = e * F - t * q + a * b, r[14] = p * x - y * w - m * $, r[15] = f * w - v * x + d * $, r;
}
function g0(r) {
  var n = r[0], e = r[1], t = r[2], a = r[3], s = r[4], i = r[5], c = r[6], l = r[7], h = r[8], f = r[9], v = r[10], d = r[11], M = r[12], y = r[13], p = r[14], m = r[15], o = n * i - e * s, $ = n * c - t * s, x = e * c - t * i, g = h * y - f * M, w = h * p - v * M, z = f * p - v * y, S = n * z - e * w + t * g, b = s * z - i * w + c * g, q = h * x - f * $ + v * o, A = M * x - y * $ + p * o;
  return l * S - a * b + m * q - d * A;
}
function oe(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = n[8], d = n[9], M = n[10], y = n[11], p = n[12], m = n[13], o = n[14], $ = n[15], x = e[0], g = e[1], w = e[2], z = e[3];
  return r[0] = x * t + g * c + w * v + z * p, r[1] = x * a + g * l + w * d + z * m, r[2] = x * s + g * h + w * M + z * o, r[3] = x * i + g * f + w * y + z * $, x = e[4], g = e[5], w = e[6], z = e[7], r[4] = x * t + g * c + w * v + z * p, r[5] = x * a + g * l + w * d + z * m, r[6] = x * s + g * h + w * M + z * o, r[7] = x * i + g * f + w * y + z * $, x = e[8], g = e[9], w = e[10], z = e[11], r[8] = x * t + g * c + w * v + z * p, r[9] = x * a + g * l + w * d + z * m, r[10] = x * s + g * h + w * M + z * o, r[11] = x * i + g * f + w * y + z * $, x = e[12], g = e[13], w = e[14], z = e[15], r[12] = x * t + g * c + w * v + z * p, r[13] = x * a + g * l + w * d + z * m, r[14] = x * s + g * h + w * M + z * o, r[15] = x * i + g * f + w * y + z * $, r;
}
function zn(r, n, e) {
  var t = e[0], a = e[1], s = e[2], i, c, l, h, f, v, d, M, y, p, m, o;
  return n === r ? (r[12] = n[0] * t + n[4] * a + n[8] * s + n[12], r[13] = n[1] * t + n[5] * a + n[9] * s + n[13], r[14] = n[2] * t + n[6] * a + n[10] * s + n[14], r[15] = n[3] * t + n[7] * a + n[11] * s + n[15]) : (i = n[0], c = n[1], l = n[2], h = n[3], f = n[4], v = n[5], d = n[6], M = n[7], y = n[8], p = n[9], m = n[10], o = n[11], r[0] = i, r[1] = c, r[2] = l, r[3] = h, r[4] = f, r[5] = v, r[6] = d, r[7] = M, r[8] = y, r[9] = p, r[10] = m, r[11] = o, r[12] = i * t + f * a + y * s + n[12], r[13] = c * t + v * a + p * s + n[13], r[14] = l * t + d * a + m * s + n[14], r[15] = h * t + M * a + o * s + n[15]), r;
}
function xe(r, n, e) {
  var t = e[0], a = e[1], s = e[2];
  return r[0] = n[0] * t, r[1] = n[1] * t, r[2] = n[2] * t, r[3] = n[3] * t, r[4] = n[4] * a, r[5] = n[5] * a, r[6] = n[6] * a, r[7] = n[7] * a, r[8] = n[8] * s, r[9] = n[9] * s, r[10] = n[10] * s, r[11] = n[11] * s, r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15], r;
}
function z0(r, n, e, t) {
  var a = t[0], s = t[1], i = t[2], c = Math.sqrt(a * a + s * s + i * i), l, h, f, v, d, M, y, p, m, o, $, x, g, w, z, S, b, q, A, F, T, L, O, k;
  return c < j ? null : (c = 1 / c, a *= c, s *= c, i *= c, l = Math.sin(e), h = Math.cos(e), f = 1 - h, v = n[0], d = n[1], M = n[2], y = n[3], p = n[4], m = n[5], o = n[6], $ = n[7], x = n[8], g = n[9], w = n[10], z = n[11], S = a * a * f + h, b = s * a * f + i * l, q = i * a * f - s * l, A = a * s * f - i * l, F = s * s * f + h, T = i * s * f + a * l, L = a * i * f + s * l, O = s * i * f - a * l, k = i * i * f + h, r[0] = v * S + p * b + x * q, r[1] = d * S + m * b + g * q, r[2] = M * S + o * b + w * q, r[3] = y * S + $ * b + z * q, r[4] = v * A + p * F + x * T, r[5] = d * A + m * F + g * T, r[6] = M * A + o * F + w * T, r[7] = y * A + $ * F + z * T, r[8] = v * L + p * O + x * k, r[9] = d * L + m * O + g * k, r[10] = M * L + o * O + w * k, r[11] = y * L + $ * O + z * k, n !== r && (r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15]), r);
}
function b0(r, n, e) {
  var t = Math.sin(e), a = Math.cos(e), s = n[4], i = n[5], c = n[6], l = n[7], h = n[8], f = n[9], v = n[10], d = n[11];
  return n !== r && (r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15]), r[4] = s * a + h * t, r[5] = i * a + f * t, r[6] = c * a + v * t, r[7] = l * a + d * t, r[8] = h * a - s * t, r[9] = f * a - i * t, r[10] = v * a - c * t, r[11] = d * a - l * t, r;
}
function A0(r, n, e) {
  var t = Math.sin(e), a = Math.cos(e), s = n[0], i = n[1], c = n[2], l = n[3], h = n[8], f = n[9], v = n[10], d = n[11];
  return n !== r && (r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15]), r[0] = s * a - h * t, r[1] = i * a - f * t, r[2] = c * a - v * t, r[3] = l * a - d * t, r[8] = s * t + h * a, r[9] = i * t + f * a, r[10] = c * t + v * a, r[11] = l * t + d * a, r;
}
function q0(r, n, e) {
  var t = Math.sin(e), a = Math.cos(e), s = n[0], i = n[1], c = n[2], l = n[3], h = n[4], f = n[5], v = n[6], d = n[7];
  return n !== r && (r[8] = n[8], r[9] = n[9], r[10] = n[10], r[11] = n[11], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15]), r[0] = s * a + h * t, r[1] = i * a + f * t, r[2] = c * a + v * t, r[3] = l * a + d * t, r[4] = h * a - s * t, r[5] = f * a - i * t, r[6] = v * a - c * t, r[7] = d * a - l * t, r;
}
function O0(r, n) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = 1, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 1, r[11] = 0, r[12] = n[0], r[13] = n[1], r[14] = n[2], r[15] = 1, r;
}
function j0(r, n) {
  return r[0] = n[0], r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = n[1], r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = n[2], r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function T0(r, n, e) {
  var t = e[0], a = e[1], s = e[2], i = Math.sqrt(t * t + a * a + s * s), c, l, h;
  return i < j ? null : (i = 1 / i, t *= i, a *= i, s *= i, c = Math.sin(n), l = Math.cos(n), h = 1 - l, r[0] = t * t * h + l, r[1] = a * t * h + s * c, r[2] = s * t * h - a * c, r[3] = 0, r[4] = t * a * h - s * c, r[5] = a * a * h + l, r[6] = s * a * h + t * c, r[7] = 0, r[8] = t * s * h + a * c, r[9] = a * s * h - t * c, r[10] = s * s * h + l, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r);
}
function S0(r, n) {
  var e = Math.sin(n), t = Math.cos(n);
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = t, r[6] = e, r[7] = 0, r[8] = 0, r[9] = -e, r[10] = t, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function L0(r, n) {
  var e = Math.sin(n), t = Math.cos(n);
  return r[0] = t, r[1] = 0, r[2] = -e, r[3] = 0, r[4] = 0, r[5] = 1, r[6] = 0, r[7] = 0, r[8] = e, r[9] = 0, r[10] = t, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function F0(r, n) {
  var e = Math.sin(n), t = Math.cos(n);
  return r[0] = t, r[1] = e, r[2] = 0, r[3] = 0, r[4] = -e, r[5] = t, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 1, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function $e(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = t + t, l = a + a, h = s + s, f = t * c, v = t * l, d = t * h, M = a * l, y = a * h, p = s * h, m = i * c, o = i * l, $ = i * h;
  return r[0] = 1 - (M + p), r[1] = v + $, r[2] = d - o, r[3] = 0, r[4] = v - $, r[5] = 1 - (f + p), r[6] = y + m, r[7] = 0, r[8] = d + o, r[9] = y - m, r[10] = 1 - (f + M), r[11] = 0, r[12] = e[0], r[13] = e[1], r[14] = e[2], r[15] = 1, r;
}
function I0(r, n) {
  var e = new R(3), t = -n[0], a = -n[1], s = -n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = t * t + a * a + s * s + i * i;
  return v > 0 ? (e[0] = (c * i + f * t + l * s - h * a) * 2 / v, e[1] = (l * i + f * a + h * t - c * s) * 2 / v, e[2] = (h * i + f * s + c * a - l * t) * 2 / v) : (e[0] = (c * i + f * t + l * s - h * a) * 2, e[1] = (l * i + f * a + h * t - c * s) * 2, e[2] = (h * i + f * s + c * a - l * t) * 2), $e(r, n, e), r;
}
function we(r, n) {
  return r[0] = n[12], r[1] = n[13], r[2] = n[14], r;
}
function ge(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[4], i = n[5], c = n[6], l = n[8], h = n[9], f = n[10];
  return r[0] = Math.sqrt(e * e + t * t + a * a), r[1] = Math.sqrt(s * s + i * i + c * c), r[2] = Math.sqrt(l * l + h * h + f * f), r;
}
function ze(r, n) {
  var e = new R(3);
  ge(e, n);
  var t = 1 / e[0], a = 1 / e[1], s = 1 / e[2], i = n[0] * t, c = n[1] * a, l = n[2] * s, h = n[4] * t, f = n[5] * a, v = n[6] * s, d = n[8] * t, M = n[9] * a, y = n[10] * s, p = i + f + y, m = 0;
  return p > 0 ? (m = Math.sqrt(p + 1) * 2, r[3] = 0.25 * m, r[0] = (v - M) / m, r[1] = (d - l) / m, r[2] = (c - h) / m) : i > f && i > y ? (m = Math.sqrt(1 + i - f - y) * 2, r[3] = (v - M) / m, r[0] = 0.25 * m, r[1] = (c + h) / m, r[2] = (d + l) / m) : f > y ? (m = Math.sqrt(1 + f - i - y) * 2, r[3] = (d - l) / m, r[0] = (c + h) / m, r[1] = 0.25 * m, r[2] = (v + M) / m) : (m = Math.sqrt(1 + y - i - f) * 2, r[3] = (c - h) / m, r[0] = (d + l) / m, r[1] = (v + M) / m, r[2] = 0.25 * m), r;
}
function R0(r, n, e, t) {
  n[0] = t[12], n[1] = t[13], n[2] = t[14];
  var a = t[0], s = t[1], i = t[2], c = t[4], l = t[5], h = t[6], f = t[8], v = t[9], d = t[10];
  e[0] = Math.sqrt(a * a + s * s + i * i), e[1] = Math.sqrt(c * c + l * l + h * h), e[2] = Math.sqrt(f * f + v * v + d * d);
  var M = 1 / e[0], y = 1 / e[1], p = 1 / e[2], m = a * M, o = s * y, $ = i * p, x = c * M, g = l * y, w = h * p, z = f * M, S = v * y, b = d * p, q = m + g + b, A = 0;
  return q > 0 ? (A = Math.sqrt(q + 1) * 2, r[3] = 0.25 * A, r[0] = (w - S) / A, r[1] = (z - $) / A, r[2] = (o - x) / A) : m > g && m > b ? (A = Math.sqrt(1 + m - g - b) * 2, r[3] = (w - S) / A, r[0] = 0.25 * A, r[1] = (o + x) / A, r[2] = (z + $) / A) : g > b ? (A = Math.sqrt(1 + g - m - b) * 2, r[3] = (z - $) / A, r[0] = (o + x) / A, r[1] = 0.25 * A, r[2] = (w + S) / A) : (A = Math.sqrt(1 + b - m - g) * 2, r[3] = (o - x) / A, r[0] = (z + $) / A, r[1] = (w + S) / A, r[2] = 0.25 * A), r;
}
function W0(r, n, e, t) {
  var a = n[0], s = n[1], i = n[2], c = n[3], l = a + a, h = s + s, f = i + i, v = a * l, d = a * h, M = a * f, y = s * h, p = s * f, m = i * f, o = c * l, $ = c * h, x = c * f, g = t[0], w = t[1], z = t[2];
  return r[0] = (1 - (y + m)) * g, r[1] = (d + x) * g, r[2] = (M - $) * g, r[3] = 0, r[4] = (d - x) * w, r[5] = (1 - (v + m)) * w, r[6] = (p + o) * w, r[7] = 0, r[8] = (M + $) * z, r[9] = (p - o) * z, r[10] = (1 - (v + y)) * z, r[11] = 0, r[12] = e[0], r[13] = e[1], r[14] = e[2], r[15] = 1, r;
}
function P0(r, n, e, t, a) {
  var s = n[0], i = n[1], c = n[2], l = n[3], h = s + s, f = i + i, v = c + c, d = s * h, M = s * f, y = s * v, p = i * f, m = i * v, o = c * v, $ = l * h, x = l * f, g = l * v, w = t[0], z = t[1], S = t[2], b = a[0], q = a[1], A = a[2], F = (1 - (p + o)) * w, T = (M + g) * w, L = (y - x) * w, O = (M - g) * z, k = (1 - (d + o)) * z, G = (m + $) * z, C = (y + x) * S, X = (m - $) * S, Z = (1 - (d + p)) * S;
  return r[0] = F, r[1] = T, r[2] = L, r[3] = 0, r[4] = O, r[5] = k, r[6] = G, r[7] = 0, r[8] = C, r[9] = X, r[10] = Z, r[11] = 0, r[12] = e[0] + b - (F * b + O * q + C * A), r[13] = e[1] + q - (T * b + k * q + X * A), r[14] = e[2] + A - (L * b + G * q + Z * A), r[15] = 1, r;
}
function E0(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = e + e, c = t + t, l = a + a, h = e * i, f = t * i, v = t * c, d = a * i, M = a * c, y = a * l, p = s * i, m = s * c, o = s * l;
  return r[0] = 1 - v - y, r[1] = f + o, r[2] = d - m, r[3] = 0, r[4] = f - o, r[5] = 1 - h - y, r[6] = M + p, r[7] = 0, r[8] = d + m, r[9] = M - p, r[10] = 1 - h - v, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function C0(r, n, e, t, a, s, i) {
  var c = 1 / (e - n), l = 1 / (a - t), h = 1 / (s - i);
  return r[0] = s * 2 * c, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = s * 2 * l, r[6] = 0, r[7] = 0, r[8] = (e + n) * c, r[9] = (a + t) * l, r[10] = (i + s) * h, r[11] = -1, r[12] = 0, r[13] = 0, r[14] = i * s * 2 * h, r[15] = 0, r;
}
function be(r, n, e, t, a) {
  var s = 1 / Math.tan(n / 2);
  if (r[0] = s / e, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = s, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[11] = -1, r[12] = 0, r[13] = 0, r[15] = 0, a != null && a !== 1 / 0) {
    var i = 1 / (t - a);
    r[10] = (a + t) * i, r[14] = 2 * a * t * i;
  } else
    r[10] = -1, r[14] = -2 * t;
  return r;
}
var k0 = be;
function D0(r, n, e, t, a) {
  var s = 1 / Math.tan(n / 2);
  if (r[0] = s / e, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = s, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[11] = -1, r[12] = 0, r[13] = 0, r[15] = 0, a != null && a !== 1 / 0) {
    var i = 1 / (t - a);
    r[10] = a * i, r[14] = a * t * i;
  } else
    r[10] = -1, r[14] = -t;
  return r;
}
function B0(r, n, e, t) {
  var a = Math.tan(n.upDegrees * Math.PI / 180), s = Math.tan(n.downDegrees * Math.PI / 180), i = Math.tan(n.leftDegrees * Math.PI / 180), c = Math.tan(n.rightDegrees * Math.PI / 180), l = 2 / (i + c), h = 2 / (a + s);
  return r[0] = l, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = h, r[6] = 0, r[7] = 0, r[8] = -((i - c) * l * 0.5), r[9] = (a - s) * h * 0.5, r[10] = t / (e - t), r[11] = -1, r[12] = 0, r[13] = 0, r[14] = t * e / (e - t), r[15] = 0, r;
}
function Ae(r, n, e, t, a, s, i) {
  var c = 1 / (n - e), l = 1 / (t - a), h = 1 / (s - i);
  return r[0] = -2 * c, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = -2 * l, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 2 * h, r[11] = 0, r[12] = (n + e) * c, r[13] = (a + t) * l, r[14] = (i + s) * h, r[15] = 1, r;
}
var qe = Ae;
function N0(r, n, e, t, a, s, i) {
  var c = 1 / (n - e), l = 1 / (t - a), h = 1 / (s - i);
  return r[0] = -2 * c, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = -2 * l, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = h, r[11] = 0, r[12] = (n + e) * c, r[13] = (a + t) * l, r[14] = s * h, r[15] = 1, r;
}
function U0(r, n, e, t) {
  var a, s, i, c, l, h, f, v, d, M, y = n[0], p = n[1], m = n[2], o = t[0], $ = t[1], x = t[2], g = e[0], w = e[1], z = e[2];
  return Math.abs(y - g) < j && Math.abs(p - w) < j && Math.abs(m - z) < j ? On(r) : (f = y - g, v = p - w, d = m - z, M = 1 / Math.sqrt(f * f + v * v + d * d), f *= M, v *= M, d *= M, a = $ * d - x * v, s = x * f - o * d, i = o * v - $ * f, M = Math.sqrt(a * a + s * s + i * i), M ? (M = 1 / M, a *= M, s *= M, i *= M) : (a = 0, s = 0, i = 0), c = v * i - d * s, l = d * a - f * i, h = f * s - v * a, M = Math.sqrt(c * c + l * l + h * h), M ? (M = 1 / M, c *= M, l *= M, h *= M) : (c = 0, l = 0, h = 0), r[0] = a, r[1] = c, r[2] = f, r[3] = 0, r[4] = s, r[5] = l, r[6] = v, r[7] = 0, r[8] = i, r[9] = h, r[10] = d, r[11] = 0, r[12] = -(a * y + s * p + i * m), r[13] = -(c * y + l * p + h * m), r[14] = -(f * y + v * p + d * m), r[15] = 1, r);
}
function V0(r, n, e, t) {
  var a = n[0], s = n[1], i = n[2], c = t[0], l = t[1], h = t[2], f = a - e[0], v = s - e[1], d = i - e[2], M = f * f + v * v + d * d;
  M > 0 && (M = 1 / Math.sqrt(M), f *= M, v *= M, d *= M);
  var y = l * d - h * v, p = h * f - c * d, m = c * v - l * f;
  return M = y * y + p * p + m * m, M > 0 && (M = 1 / Math.sqrt(M), y *= M, p *= M, m *= M), r[0] = y, r[1] = p, r[2] = m, r[3] = 0, r[4] = v * m - d * p, r[5] = d * y - f * m, r[6] = f * p - v * y, r[7] = 0, r[8] = f, r[9] = v, r[10] = d, r[11] = 0, r[12] = a, r[13] = s, r[14] = i, r[15] = 1, r;
}
function G0(r) {
  return "mat4(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ", " + r[4] + ", " + r[5] + ", " + r[6] + ", " + r[7] + ", " + r[8] + ", " + r[9] + ", " + r[10] + ", " + r[11] + ", " + r[12] + ", " + r[13] + ", " + r[14] + ", " + r[15] + ")";
}
function Y0(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2] + r[3] * r[3] + r[4] * r[4] + r[5] * r[5] + r[6] * r[6] + r[7] * r[7] + r[8] * r[8] + r[9] * r[9] + r[10] * r[10] + r[11] * r[11] + r[12] * r[12] + r[13] * r[13] + r[14] * r[14] + r[15] * r[15]);
}
function X0(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r[3] = n[3] + e[3], r[4] = n[4] + e[4], r[5] = n[5] + e[5], r[6] = n[6] + e[6], r[7] = n[7] + e[7], r[8] = n[8] + e[8], r[9] = n[9] + e[9], r[10] = n[10] + e[10], r[11] = n[11] + e[11], r[12] = n[12] + e[12], r[13] = n[13] + e[13], r[14] = n[14] + e[14], r[15] = n[15] + e[15], r;
}
function Oe(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r[2] = n[2] - e[2], r[3] = n[3] - e[3], r[4] = n[4] - e[4], r[5] = n[5] - e[5], r[6] = n[6] - e[6], r[7] = n[7] - e[7], r[8] = n[8] - e[8], r[9] = n[9] - e[9], r[10] = n[10] - e[10], r[11] = n[11] - e[11], r[12] = n[12] - e[12], r[13] = n[13] - e[13], r[14] = n[14] - e[14], r[15] = n[15] - e[15], r;
}
function Z0(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r[3] = n[3] * e, r[4] = n[4] * e, r[5] = n[5] * e, r[6] = n[6] * e, r[7] = n[7] * e, r[8] = n[8] * e, r[9] = n[9] * e, r[10] = n[10] * e, r[11] = n[11] * e, r[12] = n[12] * e, r[13] = n[13] * e, r[14] = n[14] * e, r[15] = n[15] * e, r;
}
function _0(r, n, e, t) {
  return r[0] = n[0] + e[0] * t, r[1] = n[1] + e[1] * t, r[2] = n[2] + e[2] * t, r[3] = n[3] + e[3] * t, r[4] = n[4] + e[4] * t, r[5] = n[5] + e[5] * t, r[6] = n[6] + e[6] * t, r[7] = n[7] + e[7] * t, r[8] = n[8] + e[8] * t, r[9] = n[9] + e[9] * t, r[10] = n[10] + e[10] * t, r[11] = n[11] + e[11] * t, r[12] = n[12] + e[12] * t, r[13] = n[13] + e[13] * t, r[14] = n[14] + e[14] * t, r[15] = n[15] + e[15] * t, r;
}
function Q0(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2] && r[3] === n[3] && r[4] === n[4] && r[5] === n[5] && r[6] === n[6] && r[7] === n[7] && r[8] === n[8] && r[9] === n[9] && r[10] === n[10] && r[11] === n[11] && r[12] === n[12] && r[13] === n[13] && r[14] === n[14] && r[15] === n[15];
}
function H0(r, n) {
  var e = r[0], t = r[1], a = r[2], s = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], d = r[10], M = r[11], y = r[12], p = r[13], m = r[14], o = r[15], $ = n[0], x = n[1], g = n[2], w = n[3], z = n[4], S = n[5], b = n[6], q = n[7], A = n[8], F = n[9], T = n[10], L = n[11], O = n[12], k = n[13], G = n[14], C = n[15];
  return Math.abs(e - $) <= j * Math.max(1, Math.abs(e), Math.abs($)) && Math.abs(t - x) <= j * Math.max(1, Math.abs(t), Math.abs(x)) && Math.abs(a - g) <= j * Math.max(1, Math.abs(a), Math.abs(g)) && Math.abs(s - w) <= j * Math.max(1, Math.abs(s), Math.abs(w)) && Math.abs(i - z) <= j * Math.max(1, Math.abs(i), Math.abs(z)) && Math.abs(c - S) <= j * Math.max(1, Math.abs(c), Math.abs(S)) && Math.abs(l - b) <= j * Math.max(1, Math.abs(l), Math.abs(b)) && Math.abs(h - q) <= j * Math.max(1, Math.abs(h), Math.abs(q)) && Math.abs(f - A) <= j * Math.max(1, Math.abs(f), Math.abs(A)) && Math.abs(v - F) <= j * Math.max(1, Math.abs(v), Math.abs(F)) && Math.abs(d - T) <= j * Math.max(1, Math.abs(d), Math.abs(T)) && Math.abs(M - L) <= j * Math.max(1, Math.abs(M), Math.abs(L)) && Math.abs(y - O) <= j * Math.max(1, Math.abs(y), Math.abs(O)) && Math.abs(p - k) <= j * Math.max(1, Math.abs(p), Math.abs(k)) && Math.abs(m - G) <= j * Math.max(1, Math.abs(m), Math.abs(G)) && Math.abs(o - C) <= j * Math.max(1, Math.abs(o), Math.abs(C));
}
var J0 = oe, K0 = Oe;
const je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: X0,
  adjoint: w0,
  clone: m0,
  copy: p0,
  create: y0,
  decompose: R0,
  determinant: g0,
  equals: H0,
  exactEquals: Q0,
  frob: Y0,
  fromQuat: E0,
  fromQuat2: I0,
  fromRotation: T0,
  fromRotationTranslation: $e,
  fromRotationTranslationScale: W0,
  fromRotationTranslationScaleOrigin: P0,
  fromScaling: j0,
  fromTranslation: O0,
  fromValues: o0,
  fromXRotation: S0,
  fromYRotation: L0,
  fromZRotation: F0,
  frustum: C0,
  getRotation: ze,
  getScaling: ge,
  getTranslation: we,
  identity: On,
  invert: pe,
  lookAt: U0,
  mul: J0,
  multiply: oe,
  multiplyScalar: Z0,
  multiplyScalarAndAdd: _0,
  ortho: qe,
  orthoNO: Ae,
  orthoZO: N0,
  perspective: k0,
  perspectiveFromFieldOfView: B0,
  perspectiveNO: be,
  perspectiveZO: D0,
  rotate: z0,
  rotateX: b0,
  rotateY: A0,
  rotateZ: q0,
  scale: xe,
  set: x0,
  str: G0,
  sub: K0,
  subtract: Oe,
  targetTo: V0,
  translate: zn,
  transpose: $0
}, Symbol.toStringTag, { value: "Module" }));
function jn() {
  var r = new R(3);
  return R != Float32Array && (r[0] = 0, r[1] = 0, r[2] = 0), r;
}
function u0(r) {
  var n = new R(3);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n;
}
function Te(r) {
  var n = r[0], e = r[1], t = r[2];
  return Math.sqrt(n * n + e * e + t * t);
}
function bn(r, n, e) {
  var t = new R(3);
  return t[0] = r, t[1] = n, t[2] = e, t;
}
function ra(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r;
}
function na(r, n, e, t) {
  return r[0] = n, r[1] = e, r[2] = t, r;
}
function ea(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r;
}
function Se(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r[2] = n[2] - e[2], r;
}
function Le(r, n, e) {
  return r[0] = n[0] * e[0], r[1] = n[1] * e[1], r[2] = n[2] * e[2], r;
}
function Fe(r, n, e) {
  return r[0] = n[0] / e[0], r[1] = n[1] / e[1], r[2] = n[2] / e[2], r;
}
function ta(r, n) {
  return r[0] = Math.ceil(n[0]), r[1] = Math.ceil(n[1]), r[2] = Math.ceil(n[2]), r;
}
function aa(r, n) {
  return r[0] = Math.floor(n[0]), r[1] = Math.floor(n[1]), r[2] = Math.floor(n[2]), r;
}
function sa(r, n, e) {
  return r[0] = Math.min(n[0], e[0]), r[1] = Math.min(n[1], e[1]), r[2] = Math.min(n[2], e[2]), r;
}
function ia(r, n, e) {
  return r[0] = Math.max(n[0], e[0]), r[1] = Math.max(n[1], e[1]), r[2] = Math.max(n[2], e[2]), r;
}
function ca(r, n) {
  return r[0] = pr(n[0]), r[1] = pr(n[1]), r[2] = pr(n[2]), r;
}
function la(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r;
}
function ha(r, n, e, t) {
  return r[0] = n[0] + e[0] * t, r[1] = n[1] + e[1] * t, r[2] = n[2] + e[2] * t, r;
}
function Ie(r, n) {
  var e = n[0] - r[0], t = n[1] - r[1], a = n[2] - r[2];
  return Math.sqrt(e * e + t * t + a * a);
}
function Re(r, n) {
  var e = n[0] - r[0], t = n[1] - r[1], a = n[2] - r[2];
  return e * e + t * t + a * a;
}
function We(r) {
  var n = r[0], e = r[1], t = r[2];
  return n * n + e * e + t * t;
}
function fa(r, n) {
  return r[0] = -n[0], r[1] = -n[1], r[2] = -n[2], r;
}
function va(r, n) {
  return r[0] = 1 / n[0], r[1] = 1 / n[1], r[2] = 1 / n[2], r;
}
function Pe(r, n) {
  var e = n[0], t = n[1], a = n[2], s = e * e + t * t + a * a;
  return s > 0 && (s = 1 / Math.sqrt(s)), r[0] = n[0] * s, r[1] = n[1] * s, r[2] = n[2] * s, r;
}
function rn(r, n) {
  return r[0] * n[0] + r[1] * n[1] + r[2] * n[2];
}
function Vr(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = e[0], c = e[1], l = e[2];
  return r[0] = a * l - s * c, r[1] = s * i - t * l, r[2] = t * c - a * i, r;
}
function da(r, n, e, t) {
  var a = n[0], s = n[1], i = n[2];
  return r[0] = a + t * (e[0] - a), r[1] = s + t * (e[1] - s), r[2] = i + t * (e[2] - i), r;
}
function Ma(r, n, e, t) {
  var a = Math.acos(Math.min(Math.max(rn(n, e), -1), 1)), s = Math.sin(a), i = Math.sin((1 - t) * a) / s, c = Math.sin(t * a) / s;
  return r[0] = i * n[0] + c * e[0], r[1] = i * n[1] + c * e[1], r[2] = i * n[2] + c * e[2], r;
}
function ya(r, n, e, t, a, s) {
  var i = s * s, c = i * (2 * s - 3) + 1, l = i * (s - 2) + s, h = i * (s - 1), f = i * (3 - 2 * s);
  return r[0] = n[0] * c + e[0] * l + t[0] * h + a[0] * f, r[1] = n[1] * c + e[1] * l + t[1] * h + a[1] * f, r[2] = n[2] * c + e[2] * l + t[2] * h + a[2] * f, r;
}
function ma(r, n, e, t, a, s) {
  var i = 1 - s, c = i * i, l = s * s, h = c * i, f = 3 * s * c, v = 3 * l * i, d = l * s;
  return r[0] = n[0] * h + e[0] * f + t[0] * v + a[0] * d, r[1] = n[1] * h + e[1] * f + t[1] * v + a[1] * d, r[2] = n[2] * h + e[2] * f + t[2] * v + a[2] * d, r;
}
function pa(r, n) {
  n = n === void 0 ? 1 : n;
  var e = yr() * 2 * Math.PI, t = yr() * 2 - 1, a = Math.sqrt(1 - t * t) * n;
  return r[0] = Math.cos(e) * a, r[1] = Math.sin(e) * a, r[2] = t * n, r;
}
function kr(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = e[3] * t + e[7] * a + e[11] * s + e[15];
  return i = i || 1, r[0] = (e[0] * t + e[4] * a + e[8] * s + e[12]) / i, r[1] = (e[1] * t + e[5] * a + e[9] * s + e[13]) / i, r[2] = (e[2] * t + e[6] * a + e[10] * s + e[14]) / i, r;
}
function oa(r, n, e) {
  var t = n[0], a = n[1], s = n[2];
  return r[0] = t * e[0] + a * e[3] + s * e[6], r[1] = t * e[1] + a * e[4] + s * e[7], r[2] = t * e[2] + a * e[5] + s * e[8], r;
}
function xa(r, n, e) {
  var t = e[0], a = e[1], s = e[2], i = e[3], c = n[0], l = n[1], h = n[2], f = a * h - s * l, v = s * c - t * h, d = t * l - a * c;
  return f = f + f, v = v + v, d = d + d, r[0] = c + i * f + a * d - s * v, r[1] = l + i * v + s * f - t * d, r[2] = h + i * d + t * v - a * f, r;
}
function $a(r, n, e, t) {
  var a = [], s = [];
  return a[0] = n[0] - e[0], a[1] = n[1] - e[1], a[2] = n[2] - e[2], s[0] = a[0], s[1] = a[1] * Math.cos(t) - a[2] * Math.sin(t), s[2] = a[1] * Math.sin(t) + a[2] * Math.cos(t), r[0] = s[0] + e[0], r[1] = s[1] + e[1], r[2] = s[2] + e[2], r;
}
function wa(r, n, e, t) {
  var a = [], s = [];
  return a[0] = n[0] - e[0], a[1] = n[1] - e[1], a[2] = n[2] - e[2], s[0] = a[2] * Math.sin(t) + a[0] * Math.cos(t), s[1] = a[1], s[2] = a[2] * Math.cos(t) - a[0] * Math.sin(t), r[0] = s[0] + e[0], r[1] = s[1] + e[1], r[2] = s[2] + e[2], r;
}
function ga(r, n, e, t) {
  var a = [], s = [];
  return a[0] = n[0] - e[0], a[1] = n[1] - e[1], a[2] = n[2] - e[2], s[0] = a[0] * Math.cos(t) - a[1] * Math.sin(t), s[1] = a[0] * Math.sin(t) + a[1] * Math.cos(t), s[2] = a[2], r[0] = s[0] + e[0], r[1] = s[1] + e[1], r[2] = s[2] + e[2], r;
}
function za(r, n) {
  var e = r[0], t = r[1], a = r[2], s = n[0], i = n[1], c = n[2], l = Math.sqrt((e * e + t * t + a * a) * (s * s + i * i + c * c)), h = l && rn(r, n) / l;
  return Math.acos(Math.min(Math.max(h, -1), 1));
}
function ba(r) {
  return r[0] = 0, r[1] = 0, r[2] = 0, r;
}
function Aa(r) {
  return "vec3(" + r[0] + ", " + r[1] + ", " + r[2] + ")";
}
function qa(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2];
}
function Oa(r, n) {
  var e = r[0], t = r[1], a = r[2], s = n[0], i = n[1], c = n[2];
  return Math.abs(e - s) <= j * Math.max(1, Math.abs(e), Math.abs(s)) && Math.abs(t - i) <= j * Math.max(1, Math.abs(t), Math.abs(i)) && Math.abs(a - c) <= j * Math.max(1, Math.abs(a), Math.abs(c));
}
var ja = Se, Ta = Le, Sa = Fe, La = Ie, Fa = Re, Ee = Te, Ia = We, Ra = (function() {
  var r = jn();
  return function(n, e, t, a, s, i) {
    var c, l;
    for (e || (e = 3), t || (t = 0), a ? l = Math.min(a * e + t, n.length) : l = n.length, c = t; c < l; c += e)
      r[0] = n[c], r[1] = n[c + 1], r[2] = n[c + 2], s(r, r, i), n[c] = r[0], n[c + 1] = r[1], n[c + 2] = r[2];
    return n;
  };
})();
const Wa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: ea,
  angle: za,
  bezier: ma,
  ceil: ta,
  clone: u0,
  copy: ra,
  create: jn,
  cross: Vr,
  dist: La,
  distance: Ie,
  div: Sa,
  divide: Fe,
  dot: rn,
  equals: Oa,
  exactEquals: qa,
  floor: aa,
  forEach: Ra,
  fromValues: bn,
  hermite: ya,
  inverse: va,
  len: Ee,
  length: Te,
  lerp: da,
  max: ia,
  min: sa,
  mul: Ta,
  multiply: Le,
  negate: fa,
  normalize: Pe,
  random: pa,
  rotateX: $a,
  rotateY: wa,
  rotateZ: ga,
  round: ca,
  scale: la,
  scaleAndAdd: ha,
  set: na,
  slerp: Ma,
  sqrDist: Fa,
  sqrLen: Ia,
  squaredDistance: Re,
  squaredLength: We,
  str: Aa,
  sub: ja,
  subtract: Se,
  transformMat3: oa,
  transformMat4: kr,
  transformQuat: xa,
  zero: ba
}, Symbol.toStringTag, { value: "Module" }));
function Ce() {
  var r = new R(4);
  return R != Float32Array && (r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0), r;
}
function ke(r) {
  var n = new R(4);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n;
}
function De(r, n, e, t) {
  var a = new R(4);
  return a[0] = r, a[1] = n, a[2] = e, a[3] = t, a;
}
function Be(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function Ne(r, n, e, t, a) {
  return r[0] = n, r[1] = e, r[2] = t, r[3] = a, r;
}
function Ue(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r[3] = n[3] + e[3], r;
}
function Ve(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r[2] = n[2] - e[2], r[3] = n[3] - e[3], r;
}
function Ge(r, n, e) {
  return r[0] = n[0] * e[0], r[1] = n[1] * e[1], r[2] = n[2] * e[2], r[3] = n[3] * e[3], r;
}
function Ye(r, n, e) {
  return r[0] = n[0] / e[0], r[1] = n[1] / e[1], r[2] = n[2] / e[2], r[3] = n[3] / e[3], r;
}
function Pa(r, n) {
  return r[0] = Math.ceil(n[0]), r[1] = Math.ceil(n[1]), r[2] = Math.ceil(n[2]), r[3] = Math.ceil(n[3]), r;
}
function Ea(r, n) {
  return r[0] = Math.floor(n[0]), r[1] = Math.floor(n[1]), r[2] = Math.floor(n[2]), r[3] = Math.floor(n[3]), r;
}
function Ca(r, n, e) {
  return r[0] = Math.min(n[0], e[0]), r[1] = Math.min(n[1], e[1]), r[2] = Math.min(n[2], e[2]), r[3] = Math.min(n[3], e[3]), r;
}
function ka(r, n, e) {
  return r[0] = Math.max(n[0], e[0]), r[1] = Math.max(n[1], e[1]), r[2] = Math.max(n[2], e[2]), r[3] = Math.max(n[3], e[3]), r;
}
function Da(r, n) {
  return r[0] = pr(n[0]), r[1] = pr(n[1]), r[2] = pr(n[2]), r[3] = pr(n[3]), r;
}
function Xe(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r[3] = n[3] * e, r;
}
function Ba(r, n, e, t) {
  return r[0] = n[0] + e[0] * t, r[1] = n[1] + e[1] * t, r[2] = n[2] + e[2] * t, r[3] = n[3] + e[3] * t, r;
}
function Ze(r, n) {
  var e = n[0] - r[0], t = n[1] - r[1], a = n[2] - r[2], s = n[3] - r[3];
  return Math.sqrt(e * e + t * t + a * a + s * s);
}
function _e(r, n) {
  var e = n[0] - r[0], t = n[1] - r[1], a = n[2] - r[2], s = n[3] - r[3];
  return e * e + t * t + a * a + s * s;
}
function Tn(r) {
  var n = r[0], e = r[1], t = r[2], a = r[3];
  return Math.sqrt(n * n + e * e + t * t + a * a);
}
function Sn(r) {
  var n = r[0], e = r[1], t = r[2], a = r[3];
  return n * n + e * e + t * t + a * a;
}
function Na(r, n) {
  return r[0] = -n[0], r[1] = -n[1], r[2] = -n[2], r[3] = -n[3], r;
}
function Ua(r, n) {
  return r[0] = 1 / n[0], r[1] = 1 / n[1], r[2] = 1 / n[2], r[3] = 1 / n[3], r;
}
function Qe(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = e * e + t * t + a * a + s * s;
  return i > 0 && (i = 1 / Math.sqrt(i)), r[0] = e * i, r[1] = t * i, r[2] = a * i, r[3] = s * i, r;
}
function Ln(r, n) {
  return r[0] * n[0] + r[1] * n[1] + r[2] * n[2] + r[3] * n[3];
}
function Va(r, n, e, t) {
  var a = e[0] * t[1] - e[1] * t[0], s = e[0] * t[2] - e[2] * t[0], i = e[0] * t[3] - e[3] * t[0], c = e[1] * t[2] - e[2] * t[1], l = e[1] * t[3] - e[3] * t[1], h = e[2] * t[3] - e[3] * t[2], f = n[0], v = n[1], d = n[2], M = n[3];
  return r[0] = v * h - d * l + M * c, r[1] = -(f * h) + d * i - M * s, r[2] = f * l - v * i + M * a, r[3] = -(f * c) + v * s - d * a, r;
}
function He(r, n, e, t) {
  var a = n[0], s = n[1], i = n[2], c = n[3];
  return r[0] = a + t * (e[0] - a), r[1] = s + t * (e[1] - s), r[2] = i + t * (e[2] - i), r[3] = c + t * (e[3] - c), r;
}
function Ga(r, n) {
  n = n === void 0 ? 1 : n;
  var e, t, a, s, i, c, l;
  l = yr(), e = l * 2 - 1, t = (4 * yr() - 2) * Math.sqrt(l * -l + l), i = e * e + t * t, l = yr(), a = l * 2 - 1, s = (4 * yr() - 2) * Math.sqrt(l * -l + l), c = a * a + s * s;
  var h = Math.sqrt((1 - i) / c);
  return r[0] = n * e, r[1] = n * t, r[2] = n * a * h, r[3] = n * s * h, r;
}
function Ya(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3];
  return r[0] = e[0] * t + e[4] * a + e[8] * s + e[12] * i, r[1] = e[1] * t + e[5] * a + e[9] * s + e[13] * i, r[2] = e[2] * t + e[6] * a + e[10] * s + e[14] * i, r[3] = e[3] * t + e[7] * a + e[11] * s + e[15] * i, r;
}
function Xa(r, n, e) {
  var t = e[0], a = e[1], s = e[2], i = e[3], c = n[0], l = n[1], h = n[2], f = a * h - s * l, v = s * c - t * h, d = t * l - a * c;
  return f = f + f, v = v + v, d = d + d, r[0] = c + i * f + a * d - s * v, r[1] = l + i * v + s * f - t * d, r[2] = h + i * d + t * v - a * f, r[3] = n[3], r;
}
function Za(r) {
  return r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0, r;
}
function _a(r) {
  return "vec4(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ")";
}
function Je(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2] && r[3] === n[3];
}
function Qa(r, n) {
  var e = r[0], t = r[1], a = r[2], s = r[3], i = n[0], c = n[1], l = n[2], h = n[3];
  return Math.abs(e - i) <= j * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(t - c) <= j * Math.max(1, Math.abs(t), Math.abs(c)) && Math.abs(a - l) <= j * Math.max(1, Math.abs(a), Math.abs(l)) && Math.abs(s - h) <= j * Math.max(1, Math.abs(s), Math.abs(h));
}
var Ha = Ve, Ja = Ge, Ka = Ye, ua = Ze, rs = _e, ns = Tn, es = Sn, ts = (function() {
  var r = Ce();
  return function(n, e, t, a, s, i) {
    var c, l;
    for (e || (e = 4), t || (t = 0), a ? l = Math.min(a * e + t, n.length) : l = n.length, c = t; c < l; c += e)
      r[0] = n[c], r[1] = n[c + 1], r[2] = n[c + 2], r[3] = n[c + 3], s(r, r, i), n[c] = r[0], n[c + 1] = r[1], n[c + 2] = r[2], n[c + 3] = r[3];
    return n;
  };
})();
const as = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Ue,
  ceil: Pa,
  clone: ke,
  copy: Be,
  create: Ce,
  cross: Va,
  dist: ua,
  distance: Ze,
  div: Ka,
  divide: Ye,
  dot: Ln,
  equals: Qa,
  exactEquals: Je,
  floor: Ea,
  forEach: ts,
  fromValues: De,
  inverse: Ua,
  len: ns,
  length: Tn,
  lerp: He,
  max: ka,
  min: Ca,
  mul: Ja,
  multiply: Ge,
  negate: Na,
  normalize: Qe,
  random: Ga,
  round: Da,
  scale: Xe,
  scaleAndAdd: Ba,
  set: Ne,
  sqrDist: rs,
  sqrLen: es,
  squaredDistance: _e,
  squaredLength: Sn,
  str: _a,
  sub: Ha,
  subtract: Ve,
  transformMat4: Ya,
  transformQuat: Xa,
  zero: Za
}, Symbol.toStringTag, { value: "Module" }));
function Yr() {
  var r = new R(4);
  return R != Float32Array && (r[0] = 0, r[1] = 0, r[2] = 0), r[3] = 1, r;
}
function ss(r) {
  return r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 1, r;
}
function Ke(r, n, e) {
  e = e * 0.5;
  var t = Math.sin(e);
  return r[0] = t * n[0], r[1] = t * n[1], r[2] = t * n[2], r[3] = Math.cos(e), r;
}
function is(r, n) {
  var e = Math.acos(n[3]) * 2, t = Math.sin(e / 2);
  return t > j ? (r[0] = n[0] / t, r[1] = n[1] / t, r[2] = n[2] / t) : (r[0] = 1, r[1] = 0, r[2] = 0), e;
}
function cs(r, n) {
  var e = In(r, n);
  return Math.acos(2 * e * e - 1);
}
function ue(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return r[0] = t * f + i * c + a * h - s * l, r[1] = a * f + i * l + s * c - t * h, r[2] = s * f + i * h + t * l - a * c, r[3] = i * f - t * c - a * l - s * h, r;
}
function r1(r, n, e) {
  e *= 0.5;
  var t = n[0], a = n[1], s = n[2], i = n[3], c = Math.sin(e), l = Math.cos(e);
  return r[0] = t * l + i * c, r[1] = a * l + s * c, r[2] = s * l - a * c, r[3] = i * l - t * c, r;
}
function n1(r, n, e) {
  e *= 0.5;
  var t = n[0], a = n[1], s = n[2], i = n[3], c = Math.sin(e), l = Math.cos(e);
  return r[0] = t * l - s * c, r[1] = a * l + i * c, r[2] = s * l + t * c, r[3] = i * l - a * c, r;
}
function e1(r, n, e) {
  e *= 0.5;
  var t = n[0], a = n[1], s = n[2], i = n[3], c = Math.sin(e), l = Math.cos(e);
  return r[0] = t * l + a * c, r[1] = a * l - t * c, r[2] = s * l + i * c, r[3] = i * l - s * c, r;
}
function ls(r, n) {
  var e = n[0], t = n[1], a = n[2];
  return r[0] = e, r[1] = t, r[2] = a, r[3] = Math.sqrt(Math.abs(1 - e * e - t * t - a * a)), r;
}
function t1(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = Math.sqrt(e * e + t * t + a * a), c = Math.exp(s), l = i > 0 ? c * Math.sin(i) / i : 0;
  return r[0] = e * l, r[1] = t * l, r[2] = a * l, r[3] = c * Math.cos(i), r;
}
function a1(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = Math.sqrt(e * e + t * t + a * a), c = i > 0 ? Math.atan2(i, s) / i : 0;
  return r[0] = e * c, r[1] = t * c, r[2] = a * c, r[3] = 0.5 * Math.log(e * e + t * t + a * a + s * s), r;
}
function hs(r, n, e) {
  return a1(r, n), i1(r, r, e), t1(r, r), r;
}
function Gr(r, n, e, t) {
  var a = n[0], s = n[1], i = n[2], c = n[3], l = e[0], h = e[1], f = e[2], v = e[3], d, M, y, p, m;
  return M = a * l + s * h + i * f + c * v, M < 0 && (M = -M, l = -l, h = -h, f = -f, v = -v), 1 - M > j ? (d = Math.acos(M), y = Math.sin(d), p = Math.sin((1 - t) * d) / y, m = Math.sin(t * d) / y) : (p = 1 - t, m = t), r[0] = p * a + m * l, r[1] = p * s + m * h, r[2] = p * i + m * f, r[3] = p * c + m * v, r;
}
function fs(r) {
  var n = yr(), e = yr(), t = yr(), a = Math.sqrt(1 - n), s = Math.sqrt(n);
  return r[0] = a * Math.sin(2 * Math.PI * e), r[1] = a * Math.cos(2 * Math.PI * e), r[2] = s * Math.sin(2 * Math.PI * t), r[3] = s * Math.cos(2 * Math.PI * t), r;
}
function vs(r, n) {
  var e = n[0], t = n[1], a = n[2], s = n[3], i = e * e + t * t + a * a + s * s, c = i ? 1 / i : 0;
  return r[0] = -e * c, r[1] = -t * c, r[2] = -a * c, r[3] = s * c, r;
}
function ds(r, n) {
  return r[0] = -n[0], r[1] = -n[1], r[2] = -n[2], r[3] = n[3], r;
}
function s1(r, n) {
  var e = n[0] + n[4] + n[8], t;
  if (e > 0)
    t = Math.sqrt(e + 1), r[3] = 0.5 * t, t = 0.5 / t, r[0] = (n[5] - n[7]) * t, r[1] = (n[6] - n[2]) * t, r[2] = (n[1] - n[3]) * t;
  else {
    var a = 0;
    n[4] > n[0] && (a = 1), n[8] > n[a * 3 + a] && (a = 2);
    var s = (a + 1) % 3, i = (a + 2) % 3;
    t = Math.sqrt(n[a * 3 + a] - n[s * 3 + s] - n[i * 3 + i] + 1), r[a] = 0.5 * t, t = 0.5 / t, r[3] = (n[s * 3 + i] - n[i * 3 + s]) * t, r[s] = (n[s * 3 + a] + n[a * 3 + s]) * t, r[i] = (n[i * 3 + a] + n[a * 3 + i]) * t;
  }
  return r;
}
function Ms(r, n, e, t) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : le, s = Math.PI / 360;
  n *= s, t *= s, e *= s;
  var i = Math.sin(n), c = Math.cos(n), l = Math.sin(e), h = Math.cos(e), f = Math.sin(t), v = Math.cos(t);
  switch (a) {
    case "xyz":
      r[0] = i * h * v + c * l * f, r[1] = c * l * v - i * h * f, r[2] = c * h * f + i * l * v, r[3] = c * h * v - i * l * f;
      break;
    case "xzy":
      r[0] = i * h * v - c * l * f, r[1] = c * l * v - i * h * f, r[2] = c * h * f + i * l * v, r[3] = c * h * v + i * l * f;
      break;
    case "yxz":
      r[0] = i * h * v + c * l * f, r[1] = c * l * v - i * h * f, r[2] = c * h * f - i * l * v, r[3] = c * h * v + i * l * f;
      break;
    case "yzx":
      r[0] = i * h * v + c * l * f, r[1] = c * l * v + i * h * f, r[2] = c * h * f - i * l * v, r[3] = c * h * v - i * l * f;
      break;
    case "zxy":
      r[0] = i * h * v - c * l * f, r[1] = c * l * v + i * h * f, r[2] = c * h * f + i * l * v, r[3] = c * h * v - i * l * f;
      break;
    case "zyx":
      r[0] = i * h * v - c * l * f, r[1] = c * l * v + i * h * f, r[2] = c * h * f - i * l * v, r[3] = c * h * v + i * l * f;
      break;
    default:
      throw new Error("Unknown angle order " + a);
  }
  return r;
}
function ys(r) {
  return "quat(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ")";
}
var ms = ke, ps = De, Fn = Be, os = Ne, xs = Ue, $s = ue, i1 = Xe, In = Ln, ws = He, Rn = Tn, gs = Rn, Wn = Sn, zs = Wn, Pn = Qe, bs = Je;
function As(r, n) {
  return Math.abs(Ln(r, n)) >= 1 - j;
}
var qs = (function() {
  var r = jn(), n = bn(1, 0, 0), e = bn(0, 1, 0);
  return function(t, a, s) {
    var i = rn(a, s);
    return i < -0.999999 ? (Vr(r, n, a), Ee(r) < 1e-6 && Vr(r, e, a), Pe(r, r), Ke(t, r, Math.PI), t) : i > 0.999999 ? (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t) : (Vr(r, a, s), t[0] = r[0], t[1] = r[1], t[2] = r[2], t[3] = 1 + i, Pn(t, t));
  };
})(), Os = (function() {
  var r = Yr(), n = Yr();
  return function(e, t, a, s, i, c) {
    return Gr(r, t, i, c), Gr(n, a, s, c), Gr(e, r, n, 2 * c * (1 - c)), e;
  };
})(), js = (function() {
  var r = Me();
  return function(n, e, t, a) {
    return r[0] = t[0], r[3] = t[1], r[6] = t[2], r[1] = a[0], r[4] = a[1], r[7] = a[2], r[2] = -e[0], r[5] = -e[1], r[8] = -e[2], Pn(n, s1(n, r));
  };
})();
const Ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: xs,
  calculateW: ls,
  clone: ms,
  conjugate: ds,
  copy: Fn,
  create: Yr,
  dot: In,
  equals: As,
  exactEquals: bs,
  exp: t1,
  fromEuler: Ms,
  fromMat3: s1,
  fromValues: ps,
  getAngle: cs,
  getAxisAngle: is,
  identity: ss,
  invert: vs,
  len: gs,
  length: Rn,
  lerp: ws,
  ln: a1,
  mul: $s,
  multiply: ue,
  normalize: Pn,
  pow: hs,
  random: fs,
  rotateX: r1,
  rotateY: n1,
  rotateZ: e1,
  rotationTo: qs,
  scale: i1,
  set: os,
  setAxes: js,
  setAxisAngle: Ke,
  slerp: Gr,
  sqlerp: Os,
  sqrLen: zs,
  squaredLength: Wn,
  str: ys
}, Symbol.toStringTag, { value: "Module" }));
function Ss() {
  var r = new R(8);
  return R != Float32Array && (r[0] = 0, r[1] = 0, r[2] = 0, r[4] = 0, r[5] = 0, r[6] = 0, r[7] = 0), r[3] = 1, r;
}
function Ls(r) {
  var n = new R(8);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n;
}
function Fs(r, n, e, t, a, s, i, c) {
  var l = new R(8);
  return l[0] = r, l[1] = n, l[2] = e, l[3] = t, l[4] = a, l[5] = s, l[6] = i, l[7] = c, l;
}
function Is(r, n, e, t, a, s, i) {
  var c = new R(8);
  c[0] = r, c[1] = n, c[2] = e, c[3] = t;
  var l = a * 0.5, h = s * 0.5, f = i * 0.5;
  return c[4] = l * t + h * e - f * n, c[5] = h * t + f * r - l * e, c[6] = f * t + l * n - h * r, c[7] = -l * r - h * n - f * e, c;
}
function c1(r, n, e) {
  var t = e[0] * 0.5, a = e[1] * 0.5, s = e[2] * 0.5, i = n[0], c = n[1], l = n[2], h = n[3];
  return r[0] = i, r[1] = c, r[2] = l, r[3] = h, r[4] = t * h + a * l - s * c, r[5] = a * h + s * i - t * l, r[6] = s * h + t * c - a * i, r[7] = -t * i - a * c - s * l, r;
}
function Rs(r, n) {
  return r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = n[0] * 0.5, r[5] = n[1] * 0.5, r[6] = n[2] * 0.5, r[7] = 0, r;
}
function Ws(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = 0, r[5] = 0, r[6] = 0, r[7] = 0, r;
}
function Ps(r, n) {
  var e = Yr();
  ze(e, n);
  var t = new R(3);
  return we(t, n), c1(r, e, t), r;
}
function l1(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r;
}
function Es(r) {
  return r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = 0, r[5] = 0, r[6] = 0, r[7] = 0, r;
}
function Cs(r, n, e, t, a, s, i, c, l) {
  return r[0] = n, r[1] = e, r[2] = t, r[3] = a, r[4] = s, r[5] = i, r[6] = c, r[7] = l, r;
}
var ks = Fn;
function Ds(r, n) {
  return r[0] = n[4], r[1] = n[5], r[2] = n[6], r[3] = n[7], r;
}
var Bs = Fn;
function Ns(r, n) {
  return r[4] = n[0], r[5] = n[1], r[6] = n[2], r[7] = n[3], r;
}
function Us(r, n) {
  var e = n[4], t = n[5], a = n[6], s = n[7], i = -n[0], c = -n[1], l = -n[2], h = n[3];
  return r[0] = (e * h + s * i + t * l - a * c) * 2, r[1] = (t * h + s * c + a * i - e * l) * 2, r[2] = (a * h + s * l + e * c - t * i) * 2, r;
}
function Vs(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = e[0] * 0.5, l = e[1] * 0.5, h = e[2] * 0.5, f = n[4], v = n[5], d = n[6], M = n[7];
  return r[0] = t, r[1] = a, r[2] = s, r[3] = i, r[4] = i * c + a * h - s * l + f, r[5] = i * l + s * c - t * h + v, r[6] = i * h + t * l - a * c + d, r[7] = -t * c - a * l - s * h + M, r;
}
function Gs(r, n, e) {
  var t = -n[0], a = -n[1], s = -n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = c * i + f * t + l * s - h * a, d = l * i + f * a + h * t - c * s, M = h * i + f * s + c * a - l * t, y = f * i - c * t - l * a - h * s;
  return r1(r, n, e), t = r[0], a = r[1], s = r[2], i = r[3], r[4] = v * i + y * t + d * s - M * a, r[5] = d * i + y * a + M * t - v * s, r[6] = M * i + y * s + v * a - d * t, r[7] = y * i - v * t - d * a - M * s, r;
}
function Ys(r, n, e) {
  var t = -n[0], a = -n[1], s = -n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = c * i + f * t + l * s - h * a, d = l * i + f * a + h * t - c * s, M = h * i + f * s + c * a - l * t, y = f * i - c * t - l * a - h * s;
  return n1(r, n, e), t = r[0], a = r[1], s = r[2], i = r[3], r[4] = v * i + y * t + d * s - M * a, r[5] = d * i + y * a + M * t - v * s, r[6] = M * i + y * s + v * a - d * t, r[7] = y * i - v * t - d * a - M * s, r;
}
function Xs(r, n, e) {
  var t = -n[0], a = -n[1], s = -n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = c * i + f * t + l * s - h * a, d = l * i + f * a + h * t - c * s, M = h * i + f * s + c * a - l * t, y = f * i - c * t - l * a - h * s;
  return e1(r, n, e), t = r[0], a = r[1], s = r[2], i = r[3], r[4] = v * i + y * t + d * s - M * a, r[5] = d * i + y * a + M * t - v * s, r[6] = M * i + y * s + v * a - d * t, r[7] = y * i - v * t - d * a - M * s, r;
}
function Zs(r, n, e) {
  var t = e[0], a = e[1], s = e[2], i = e[3], c = n[0], l = n[1], h = n[2], f = n[3];
  return r[0] = c * i + f * t + l * s - h * a, r[1] = l * i + f * a + h * t - c * s, r[2] = h * i + f * s + c * a - l * t, r[3] = f * i - c * t - l * a - h * s, c = n[4], l = n[5], h = n[6], f = n[7], r[4] = c * i + f * t + l * s - h * a, r[5] = l * i + f * a + h * t - c * s, r[6] = h * i + f * s + c * a - l * t, r[7] = f * i - c * t - l * a - h * s, r;
}
function _s(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return r[0] = t * f + i * c + a * h - s * l, r[1] = a * f + i * l + s * c - t * h, r[2] = s * f + i * h + t * l - a * c, r[3] = i * f - t * c - a * l - s * h, c = e[4], l = e[5], h = e[6], f = e[7], r[4] = t * f + i * c + a * h - s * l, r[5] = a * f + i * l + s * c - t * h, r[6] = s * f + i * h + t * l - a * c, r[7] = i * f - t * c - a * l - s * h, r;
}
function Qs(r, n, e, t) {
  if (Math.abs(t) < j)
    return l1(r, n);
  var a = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
  t = t * 0.5;
  var s = Math.sin(t), i = s * e[0] / a, c = s * e[1] / a, l = s * e[2] / a, h = Math.cos(t), f = n[0], v = n[1], d = n[2], M = n[3];
  r[0] = f * h + M * i + v * l - d * c, r[1] = v * h + M * c + d * i - f * l, r[2] = d * h + M * l + f * c - v * i, r[3] = M * h - f * i - v * c - d * l;
  var y = n[4], p = n[5], m = n[6], o = n[7];
  return r[4] = y * h + o * i + p * l - m * c, r[5] = p * h + o * c + m * i - y * l, r[6] = m * h + o * l + y * c - p * i, r[7] = o * h - y * i - p * c - m * l, r;
}
function Hs(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r[3] = n[3] + e[3], r[4] = n[4] + e[4], r[5] = n[5] + e[5], r[6] = n[6] + e[6], r[7] = n[7] + e[7], r;
}
function h1(r, n, e) {
  var t = n[0], a = n[1], s = n[2], i = n[3], c = e[4], l = e[5], h = e[6], f = e[7], v = n[4], d = n[5], M = n[6], y = n[7], p = e[0], m = e[1], o = e[2], $ = e[3];
  return r[0] = t * $ + i * p + a * o - s * m, r[1] = a * $ + i * m + s * p - t * o, r[2] = s * $ + i * o + t * m - a * p, r[3] = i * $ - t * p - a * m - s * o, r[4] = t * f + i * c + a * h - s * l + v * $ + y * p + d * o - M * m, r[5] = a * f + i * l + s * c - t * h + d * $ + y * m + M * p - v * o, r[6] = s * f + i * h + t * l - a * c + M * $ + y * o + v * m - d * p, r[7] = i * f - t * c - a * l - s * h + y * $ - v * p - d * m - M * o, r;
}
var Js = h1;
function Ks(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r[3] = n[3] * e, r[4] = n[4] * e, r[5] = n[5] * e, r[6] = n[6] * e, r[7] = n[7] * e, r;
}
var f1 = In;
function us(r, n, e, t) {
  var a = 1 - t;
  return f1(n, e) < 0 && (t = -t), r[0] = n[0] * a + e[0] * t, r[1] = n[1] * a + e[1] * t, r[2] = n[2] * a + e[2] * t, r[3] = n[3] * a + e[3] * t, r[4] = n[4] * a + e[4] * t, r[5] = n[5] * a + e[5] * t, r[6] = n[6] * a + e[6] * t, r[7] = n[7] * a + e[7] * t, r;
}
function ri(r, n) {
  var e = nn(n);
  return r[0] = -n[0] / e, r[1] = -n[1] / e, r[2] = -n[2] / e, r[3] = n[3] / e, r[4] = -n[4] / e, r[5] = -n[5] / e, r[6] = -n[6] / e, r[7] = n[7] / e, r;
}
function ni(r, n) {
  return r[0] = -n[0], r[1] = -n[1], r[2] = -n[2], r[3] = n[3], r[4] = -n[4], r[5] = -n[5], r[6] = -n[6], r[7] = n[7], r;
}
var v1 = Rn, ei = v1, nn = Wn, ti = nn;
function ai(r, n) {
  var e = nn(n);
  if (e > 0) {
    e = Math.sqrt(e);
    var t = n[0] / e, a = n[1] / e, s = n[2] / e, i = n[3] / e, c = n[4], l = n[5], h = n[6], f = n[7], v = t * c + a * l + s * h + i * f;
    r[0] = t, r[1] = a, r[2] = s, r[3] = i, r[4] = (c - t * v) / e, r[5] = (l - a * v) / e, r[6] = (h - s * v) / e, r[7] = (f - i * v) / e;
  }
  return r;
}
function si(r) {
  return "quat2(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ", " + r[4] + ", " + r[5] + ", " + r[6] + ", " + r[7] + ")";
}
function ii(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2] && r[3] === n[3] && r[4] === n[4] && r[5] === n[5] && r[6] === n[6] && r[7] === n[7];
}
function ci(r, n) {
  var e = r[0], t = r[1], a = r[2], s = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = n[0], v = n[1], d = n[2], M = n[3], y = n[4], p = n[5], m = n[6], o = n[7];
  return Math.abs(e - f) <= j * Math.max(1, Math.abs(e), Math.abs(f)) && Math.abs(t - v) <= j * Math.max(1, Math.abs(t), Math.abs(v)) && Math.abs(a - d) <= j * Math.max(1, Math.abs(a), Math.abs(d)) && Math.abs(s - M) <= j * Math.max(1, Math.abs(s), Math.abs(M)) && Math.abs(i - y) <= j * Math.max(1, Math.abs(i), Math.abs(y)) && Math.abs(c - p) <= j * Math.max(1, Math.abs(c), Math.abs(p)) && Math.abs(l - m) <= j * Math.max(1, Math.abs(l), Math.abs(m)) && Math.abs(h - o) <= j * Math.max(1, Math.abs(h), Math.abs(o));
}
const li = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Hs,
  clone: Ls,
  conjugate: ni,
  copy: l1,
  create: Ss,
  dot: f1,
  equals: ci,
  exactEquals: ii,
  fromMat4: Ps,
  fromRotation: Ws,
  fromRotationTranslation: c1,
  fromRotationTranslationValues: Is,
  fromTranslation: Rs,
  fromValues: Fs,
  getDual: Ds,
  getReal: ks,
  getTranslation: Us,
  identity: Es,
  invert: ri,
  len: ei,
  length: v1,
  lerp: us,
  mul: Js,
  multiply: h1,
  normalize: ai,
  rotateAroundAxis: Qs,
  rotateByQuatAppend: Zs,
  rotateByQuatPrepend: _s,
  rotateX: Gs,
  rotateY: Ys,
  rotateZ: Xs,
  scale: Ks,
  set: Cs,
  setDual: Ns,
  setReal: Bs,
  sqrLen: ti,
  squaredLength: nn,
  str: si,
  translate: Vs
}, Symbol.toStringTag, { value: "Module" }));
function d1() {
  var r = new R(2);
  return R != Float32Array && (r[0] = 0, r[1] = 0), r;
}
function hi(r) {
  var n = new R(2);
  return n[0] = r[0], n[1] = r[1], n;
}
function fi(r, n) {
  var e = new R(2);
  return e[0] = r, e[1] = n, e;
}
function vi(r, n) {
  return r[0] = n[0], r[1] = n[1], r;
}
function di(r, n, e) {
  return r[0] = n, r[1] = e, r;
}
function Mi(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r;
}
function M1(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r;
}
function y1(r, n, e) {
  return r[0] = n[0] * e[0], r[1] = n[1] * e[1], r;
}
function m1(r, n, e) {
  return r[0] = n[0] / e[0], r[1] = n[1] / e[1], r;
}
function yi(r, n) {
  return r[0] = Math.ceil(n[0]), r[1] = Math.ceil(n[1]), r;
}
function mi(r, n) {
  return r[0] = Math.floor(n[0]), r[1] = Math.floor(n[1]), r;
}
function pi(r, n, e) {
  return r[0] = Math.min(n[0], e[0]), r[1] = Math.min(n[1], e[1]), r;
}
function oi(r, n, e) {
  return r[0] = Math.max(n[0], e[0]), r[1] = Math.max(n[1], e[1]), r;
}
function xi(r, n) {
  return r[0] = pr(n[0]), r[1] = pr(n[1]), r;
}
function $i(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r;
}
function wi(r, n, e, t) {
  return r[0] = n[0] + e[0] * t, r[1] = n[1] + e[1] * t, r;
}
function p1(r, n) {
  var e = n[0] - r[0], t = n[1] - r[1];
  return Math.sqrt(e * e + t * t);
}
function o1(r, n) {
  var e = n[0] - r[0], t = n[1] - r[1];
  return e * e + t * t;
}
function x1(r) {
  var n = r[0], e = r[1];
  return Math.sqrt(n * n + e * e);
}
function $1(r) {
  var n = r[0], e = r[1];
  return n * n + e * e;
}
function gi(r, n) {
  return r[0] = -n[0], r[1] = -n[1], r;
}
function zi(r, n) {
  return r[0] = 1 / n[0], r[1] = 1 / n[1], r;
}
function bi(r, n) {
  var e = n[0], t = n[1], a = e * e + t * t;
  return a > 0 && (a = 1 / Math.sqrt(a)), r[0] = n[0] * a, r[1] = n[1] * a, r;
}
function Ai(r, n) {
  return r[0] * n[0] + r[1] * n[1];
}
function qi(r, n, e) {
  var t = n[0] * e[1] - n[1] * e[0];
  return r[0] = r[1] = 0, r[2] = t, r;
}
function Oi(r, n, e, t) {
  var a = n[0], s = n[1];
  return r[0] = a + t * (e[0] - a), r[1] = s + t * (e[1] - s), r;
}
function ji(r, n) {
  n = n === void 0 ? 1 : n;
  var e = yr() * 2 * Math.PI;
  return r[0] = Math.cos(e) * n, r[1] = Math.sin(e) * n, r;
}
function Ti(r, n, e) {
  var t = n[0], a = n[1];
  return r[0] = e[0] * t + e[2] * a, r[1] = e[1] * t + e[3] * a, r;
}
function Si(r, n, e) {
  var t = n[0], a = n[1];
  return r[0] = e[0] * t + e[2] * a + e[4], r[1] = e[1] * t + e[3] * a + e[5], r;
}
function Li(r, n, e) {
  var t = n[0], a = n[1];
  return r[0] = e[0] * t + e[3] * a + e[6], r[1] = e[1] * t + e[4] * a + e[7], r;
}
function Fi(r, n, e) {
  var t = n[0], a = n[1];
  return r[0] = e[0] * t + e[4] * a + e[12], r[1] = e[1] * t + e[5] * a + e[13], r;
}
function Ii(r, n, e, t) {
  var a = n[0] - e[0], s = n[1] - e[1], i = Math.sin(t), c = Math.cos(t);
  return r[0] = a * c - s * i + e[0], r[1] = a * i + s * c + e[1], r;
}
function Ri(r, n) {
  var e = r[0], t = r[1], a = n[0], s = n[1];
  return Math.abs(Math.atan2(t * a - e * s, e * a + t * s));
}
function Wi(r, n) {
  var e = r[0], t = r[1], a = n[0], s = n[1];
  return Math.atan2(e * s - t * a, e * a + t * s);
}
function Pi(r) {
  return r[0] = 0, r[1] = 0, r;
}
function Ei(r) {
  return "vec2(" + r[0] + ", " + r[1] + ")";
}
function Ci(r, n) {
  return r[0] === n[0] && r[1] === n[1];
}
function ki(r, n) {
  var e = r[0], t = r[1], a = n[0], s = n[1];
  return Math.abs(e - a) <= j * Math.max(1, Math.abs(e), Math.abs(a)) && Math.abs(t - s) <= j * Math.max(1, Math.abs(t), Math.abs(s));
}
var Di = x1, Bi = M1, Ni = y1, Ui = m1, Vi = p1, Gi = o1, Yi = $1, Xi = (function() {
  var r = d1();
  return function(n, e, t, a, s, i) {
    var c, l;
    for (e || (e = 2), t || (t = 0), a ? l = Math.min(a * e + t, n.length) : l = n.length, c = t; c < l; c += e)
      r[0] = n[c], r[1] = n[c + 1], s(r, r, i), n[c] = r[0], n[c + 1] = r[1];
    return n;
  };
})();
const Zi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Mi,
  angle: Ri,
  ceil: yi,
  clone: hi,
  copy: vi,
  create: d1,
  cross: qi,
  dist: Vi,
  distance: p1,
  div: Ui,
  divide: m1,
  dot: Ai,
  equals: ki,
  exactEquals: Ci,
  floor: mi,
  forEach: Xi,
  fromValues: fi,
  inverse: zi,
  len: Di,
  length: x1,
  lerp: Oi,
  max: oi,
  min: pi,
  mul: Ni,
  multiply: y1,
  negate: gi,
  normalize: bi,
  random: ji,
  rotate: Ii,
  round: xi,
  scale: $i,
  scaleAndAdd: wi,
  set: di,
  signedAngle: Wi,
  sqrDist: Gi,
  sqrLen: Yi,
  squaredDistance: o1,
  squaredLength: $1,
  str: Ei,
  sub: Bi,
  subtract: M1,
  transformMat2: Ti,
  transformMat2d: Si,
  transformMat3: Li,
  transformMat4: Fi,
  zero: Pi
}, Symbol.toStringTag, { value: "Module" })), _i = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: U1,
  mat2: Mt,
  mat2d: Ct,
  mat3: M0,
  mat4: je,
  quat: Ts,
  quat2: li,
  vec2: Zi,
  vec3: Wa,
  vec4: as
}, Symbol.toStringTag, { value: "Module" })), En = ur;
function en() {
  B.call(this), this.events = {
    update: 0
  }, this.children = [], this.local = new Float32Array([
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ]), this.localToWorld = new Float32Array([
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ]), this.worldToLocal = new Float32Array([
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ]);
  var r = this;
  this.onParentUpdate = function(n) {
    r.dirtyL = !0, r.dirtyW = !0;
  };
}
var N = en.prototype = Object.create(B.prototype), lr = new Float32Array([0, 0, 0]), vr = new Float32Array(16);
N.constructor = en;
N.local = null;
N.localToWorld = null;
N.worldToLocal = null;
N.children = null;
N.parent = null;
N.dirtyW = !1;
N.dirtyL = !1;
N.onParentUpdate = null;
N.addChild = function(r) {
  this.children[this.children.length] = r, r.setParent(this);
};
N.removeChild = function(r) {
  this.children.splice(this.children.indexOf(r), 1), r.removeParent();
};
N.setParent = function(r) {
  this.parent = r, r.addEventListener(r.events.update, this.onParentUpdate), r.gameObject.world !== null && r.gameObject.world.addGameObject(this.gameObject), this.dirtyL = !0, this.dirtyW = !0;
};
N.setGameObject = function(r) {
  B.prototype.setGameObject.call(this, r), r.transform = this;
};
N.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
N.removeParent = function() {
  this.parent.removeEventListener(this.parent.events.update, this.onParentUpdate), this.parent = null, this.dirtyL = !0, this.dirtyW = !0;
};
N.translate = function(r, n, e, t) {
  lr[0] = r, lr[1] = n, lr[2] = e, t === "world" ? (On(vr), zn(vr, vr, lr), En(this.local, vr, this.local)) : zn(this.local, this.local, lr), this.dirtyL = !0, this.dirtyW = !0, this.dispatchEvent(this.events.update, this);
};
N.rotate = function(r, n, e, t) {
  var a = Math.PI / 180, s = je;
  t === "world" ? (s.identity(vr), s.rotateZ(vr, vr, e * a), s.rotateY(vr, vr, n * a), s.rotateX(vr, vr, r * a), En(this.local, vr, this.local)) : (s.rotateZ(this.local, this.local, e * a), s.rotateY(this.local, this.local, n * a), s.rotateX(this.local, this.local, r * a)), this.dirtyL = !0, this.dirtyW = !0, this.dispatchEvent(this.events.update, this);
};
N.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.localToWorld.set(this.local) : En(this.localToWorld, this.parent.getLocalToWorld(), this.local), this.dirtyL = !1), this.localToWorld;
};
N.getWorldToLocal = function() {
  return this.dirtyW === !0 && (pe(this.worldToLocal, this.getLocalToWorld()), this.dirtyW = !1), this.worldToLocal;
};
N.getPosition = function(r) {
  r === void 0 && (r = []);
  var n = this.getLocalToWorld();
  return r[0] = n[12], r[1] = n[13], r[2] = n[14], r;
};
N.getLocalPosition = function(r) {
  r === void 0 && (r = []);
  var n = this.local;
  return r[0] = n[12], r[1] = n[13], r[2] = n[14], r;
};
N.getRotation = function() {
  throw "TransformComponent.getRotation not implemented yet";
};
N.getLocalRotation = function() {
  throw "TransformComponent.getLocalRotation not implemented yet";
};
N.setPosition = function(r, n, e) {
  lr[0] = r, lr[1] = n, lr[2] = e, this.parent !== null && kr(lr, lr, this.parent.getWorldToLocal()), this.local[12] = lr[0], this.local[13] = lr[1], this.local[14] = lr[2], this.dirtyL = !0, this.dirtyW = !0, this.dispatchEvent(this.events.update, this);
};
N.setLocalPosition = function(r, n, e) {
  this.local[12] = r, this.local[13] = n, this.local[14] = e, this.dirtyL = !0, this.dirtyW = !0, this.dispatchEvent(this.events.update, this);
};
N.scale = function(r, n, e) {
  xe(this.local, this.local, [r, n, e]), this.dirtyL = !0, this.dirtyW = !0, this.dispatchEvent(this.events.update, this);
};
N.forward = function(r) {
  r === void 0 && (r = []);
  var n = this.getLocalToWorld();
  return r[0] = n[8], r[1] = n[9], r[2] = n[10], r;
};
function u(r) {
  this.instanceId = u.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new en()), this.removeQueue = [], this.name = r || "gameObject";
}
var K = u.prototype;
K.instanceId = 0;
K.started = !1;
K.name = null;
K.layer = 0;
K.world = null;
K.transform = null;
K.components = null;
K.componentsCount = 0;
K.removeQueue = null;
K.removeQueueWaiting = !1;
K.start = function() {
  var r, n;
  for (n = 0; n < this.componentsCount; n++)
    r = this.components[n], !r.awaken && r.awake !== null && r.awake(), r.start !== null && r.start();
  this.started = !0;
};
K.setScene = function(r) {
  this.scene = r;
};
K.addComponent = function(r) {
  return this.components[this.componentsCount++] = r, r.setGameObject(this), this.started && r.start !== null && r.start(), r;
};
K.removeComponent = function(r) {
  r.unsetGameObject(), this.removeQueue.push(r), this.removeQueueWaiting = !0;
};
K.getComponent = function(r) {
  for (var n = 0; n < this.components.length; n++) {
    var e = this.components[n];
    if (e instanceof r)
      return e;
  }
  return null;
};
K.destroy = function() {
  this.world.removeGameObject(this), this.world = null;
};
const w1 = {
  NONE: "NONE",
  RADIAL: "RADIAL",
  RADIAL_FAST: "RADIAL_FAST",
  LINEAR: "LINEAR"
};
function D(r) {
  B.call(this), this.transform = r, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ], this.frustumBox = [
    [0, 0, 0],
    [0, 0, 0]
  ];
  var n = this;
  this.transformUpdateEventHandler = function(e) {
    var t = e.getLocalToWorld();
    kr(n.frustumBox[0], n.frustumSize[0], t), kr(n.frustumBox[1], n.frustumSize[1], t);
  };
}
D.prototype = Object.create(B.prototype);
D.prototype.constructor = D;
D.prototype.frustumSize = null;
D.prototype.frustumBox = null;
D.prototype.projectionMatrix = null;
D.prototype.clipSpaceMatrix = null;
D.prototype.nearClippingPane = 0;
D.prototype.farClippingPane = 1e3;
D.prototype.fogType = w1.LINEAR;
D.prototype.fogNearPane = 250;
D.prototype.fogFarPane = 750;
D.prototype.fogColor = new Uint8Array([150, 150, 150]);
D.prototype.ambientLight = 0.5;
D.prototype.setup = function(r, n) {
  this.frustumSize = [
    [-r / 2, -n / 2, 0],
    [r / 2, n / 2, length]
  ];
  var e = this.gameObject.transform.getLocalToWorld();
  kr(this.frustumBox[0], this.frustumSize[0], e), kr(this.frustumBox[1], this.frustumSize[1], e), qe(this.projectionMatrix, -r / 2, r / 2, -n / 2, n / 2, this.nearClippingPane, this.farClippingPane);
};
D.prototype.setGameObject = function(r) {
  B.prototype.setGameObject.call(this, r), r.camera = this, r.transform.addEventListener(r.transform.events.update, this.transformUpdateEventHandler);
};
D.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, this.gameObject.transform.removeEventListener(this.gameObject.transform.events.update, this.transformUpdateEventHandler), B.prototype.unsetGameObject.call(this);
};
D.prototype.getClipSpaceMatrix = function() {
  const r = this.transform.getWorldToLocal();
  return ur(this.clipSpaceMatrix, this.projectionMatrix, r), this.clipSpaceMatrix;
};
D.FogType = w1;
function g1(r) {
  u.call(this, r || "camera"), this.addComponent(new D(this.transform));
}
g1.prototype = Object.create(u.prototype);
function Y() {
  B.call(this), this.colors = new Uint8Array([0, 0, 255]), this.faceColors = new Uint32Array([0]);
}
var ir = Y.prototype = Object.create(B.prototype);
ir.constructor = Y;
ir.layer = 0;
ir.vertices = null;
ir.faces = null;
ir.pivot = [0, 0, 0];
ir.color = null;
ir.colors = null;
ir.faceColors = null;
ir.faceNormals = null;
ir.vertexNormals = null;
ir.bounds = null;
ir.updateNormals = function(r = 1) {
  const n = this.faces, e = this.vertices, t = n.length;
  (!this.faceNormals || this.faceNormals.length !== t) && (this.faceNormals = new Float32Array(t));
  for (let a = 0; a < t; a += 3) {
    const s = n[a] * 3, i = n[a + 1] * 3, c = n[a + 2] * 3, l = e[i] - e[s], h = e[i + 1] - e[s + 1], f = e[i + 2] - e[s + 2], v = e[c] - e[s], d = e[c + 1] - e[s + 1], M = e[c + 2] - e[s + 2];
    let y = (h * M - f * d) * r, p = (f * v - l * M) * r, m = (l * d - h * v) * r;
    const o = Math.sqrt(y * y + p * p + m * m);
    if (o > 1e-10) {
      const $ = 1 / o;
      this.faceNormals[a] = y * $, this.faceNormals[a + 1] = p * $, this.faceNormals[a + 2] = m * $;
    }
  }
};
ir.setGameObject = function(r) {
  B.prototype.setGameObject.call(this, r), r.meshRenderer = this;
};
ir.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, B.prototype.unsetGameObject.call(this);
};
Y.computeNormalMatrix = function(r, n) {
  const e = n[0], t = n[1], a = n[2], s = n[4], i = n[5], c = n[6], l = n[8], h = n[9], f = n[10], v = i * f - c * h, d = -(s * f - c * l), M = s * h - i * l, y = e * v + t * d + a * M;
  if (Math.abs(y) < 1e-6) return null;
  const p = 1 / y;
  r[0] = v * p, r[1] = d * p, r[2] = M * p, r[3] = -(t * f - a * h) * p, r[4] = (e * f - a * l) * p, r[5] = -(e * h - t * l) * p, r[6] = (t * c - a * i) * p, r[7] = -(e * c - a * s) * p, r[8] = (e * i - t * s) * p;
};
Y.computeBoundsFlatArray = function(r, n, e) {
  if (e.length !== 0) {
    for (var t = e[0], a = t, s = e[1], i = s, c = e[2], l = c, h = 3; h < e.length; h += 3) {
      var f = e[h], v = e[h + 1], d = e[h + 2];
      f < t ? t = f : f > a && (a = f), v < s ? s = v : v > i && (i = v), d < c ? c = d : d > l && (l = d);
    }
    return r[n] = t, r[n + 1] = s, r[n + 2] = c, r[n + 3] = a, r[n + 4] = s, r[n + 5] = c, r[n + 6] = t, r[n + 7] = i, r[n + 8] = c, r[n + 9] = a, r[n + 10] = i, r[n + 11] = c, r[n + 12] = t, r[n + 13] = s, r[n + 14] = l, r[n + 15] = a, r[n + 16] = s, r[n + 17] = l, r[n + 18] = t, r[n + 19] = i, r[n + 20] = l, r[n + 21] = a, r[n + 22] = i, r[n + 23] = l, r;
  }
};
Y.computeBoundingSphere = function(r, n, e) {
  let t = 1 / 0, a = 1 / 0, s = 1 / 0, i = -1 / 0, c = -1 / 0, l = -1 / 0;
  for (let m = 0; m < e.length; m += 3) {
    const o = e[m], $ = e[m + 1], x = e[m + 2];
    o < t && (t = o), o > i && (i = o), $ < a && (a = $), $ > c && (c = $), x < s && (s = x), x > l && (l = x);
  }
  const h = (t + i) * 0.5, f = (a + c) * 0.5, v = (s + l) * 0.5, d = i - h, M = c - f, y = l - v, p = Math.sqrt(d * d + M * M + y * y);
  r[n] = h, r[n + 1] = f, r[n + 2] = v, r[n + 3] = p;
};
function Cn(r) {
  B.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var xr = Cn.prototype = Object.create(B.prototype);
xr.constructor = Cn;
xr.sprite = null;
xr.pivotX = 0;
xr.pivotY = 0;
xr.layer = 0;
xr.setGameObject = function(r) {
  B.prototype.setGameObject.call(this, r), r.spriteRenderer = this;
};
xr.setSprite = function(r) {
  return this.sprite = r, this.enabled = !0, this;
};
xr.setPivot = function(r, n) {
  return this.pivotX = r, this.pivotY = n, this;
};
xr.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, B.prototype.unsetGameObject.call(this);
};
function kn() {
  B.call(this), this.points = [];
}
var Fr = kn.prototype = Object.create(B.prototype);
Fr.constructor = kn;
Fr.points = null;
Fr.color = "white";
Fr.width = 1;
Fr.layer = 0;
Fr.setGameObject = function(r) {
  B.prototype.setGameObject.call(this, r), r.pathRenderer = this;
};
Fr.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, B.prototype.unsetGameObject.call(this);
};
function Dn() {
  B.call(this);
}
var $r = Dn.prototype = Object.create(B.prototype);
$r.constructor = Dn;
$r.text = "sample text";
$r.color = "white";
$r.style = "normal 12px arial";
$r.layer = 0;
$r.align = "center";
$r.valign = "middle";
$r.setGameObject = function(r) {
  B.prototype.setGameObject.call(this, r), r.textRenderer = this;
};
$r.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, B.prototype.unsetGameObject.call(this);
};
function Qi(r, n, e) {
  const t = [], a = [], s = r / 2, i = n / 2, c = r / e, l = n / e;
  for (let f = 0; f <= e; f++) {
    const v = f * l - i;
    for (let d = 0; d <= e; d++) {
      const M = d * c - s;
      t.push(M, 0, v);
    }
  }
  const h = e + 1;
  for (let f = 0; f < e; f++)
    for (let v = 0; v < e; v++) {
      const d = f * h + v, M = f * h + (v + 1), y = (f + 1) * h + v, p = (f + 1) * h + (v + 1);
      a.push(d, y, M), a.push(p, M, y);
    }
  return {
    vertices: new Float32Array(t),
    faces: new Uint16Array(a)
  };
}
const Xr = Qi(1, 1, 1), Bn = new Float32Array(32);
Y.computeBoundsFlatArray(Bn, 0, Xr.vertices);
Y.computeBoundingSphere(Bn, 28, Xr.vertices);
function z1() {
  u.call(this);
  const r = new Y();
  r.faces = Xr.faces, r.vertices = Xr.vertices, r.bounds = Bn, r.updateNormals(), this.addComponent(r);
}
z1.prototype = Object.create(u.prototype);
function Hi(r, n, e, t) {
  const a = [], s = [], i = {};
  function c(h, f, v) {
    const d = `${h.toFixed(5)},${f.toFixed(5)},${v.toFixed(5)}`;
    if (i[d] !== void 0) return i[d];
    const M = a.length / 3;
    return a.push(h, f, v), i[d] = M, M;
  }
  function l(h, f, v, d, M, y, p, m, o, $) {
    const x = p / $, g = m / $, w = p / 2, z = m / 2, S = o / 2 * y, b = [];
    for (let q = 0; q <= $; q++) {
      const A = [], F = q * g - z;
      for (let T = 0; T <= $; T++) {
        const L = T * x - w, O = [0, 0, 0];
        O[h] = L * d, O[f] = F * M, O[v] = S, A.push(c(O[0], O[1], O[2]));
      }
      b.push(A);
    }
    for (let q = 0; q < $; q++)
      for (let A = 0; A < $; A++) {
        const F = b[q][A], T = b[q + 1][A], L = b[q + 1][A + 1], O = b[q][A + 1];
        s.push(F, O, T), s.push(T, O, L);
      }
  }
  return l(0, 1, 2, 1, 1, 1, r, n, e, t), l(0, 1, 2, -1, 1, -1, r, n, e, t), l(2, 1, 0, -1, 1, 1, e, n, r, t), l(2, 1, 0, 1, 1, -1, e, n, r, t), l(0, 2, 1, 1, -1, 1, r, e, n, t), l(0, 2, 1, 1, 1, -1, r, e, n, t), {
    vertices: new Float32Array(a),
    faces: new Uint16Array(s)
  };
}
const Zr = Hi(1, 1, 1, 1), Nn = new Float32Array(32);
Y.computeBoundsFlatArray(
  Nn,
  0,
  Zr.vertices
);
Y.computeBoundingSphere(Nn, 28, Zr.vertices);
function b1() {
  u.call(this);
  const r = new Y();
  r.vertices = Zr.vertices, r.faces = Zr.faces, r.bounds = Nn, r.updateNormals(), this.addComponent(r);
}
b1.prototype = Object.create(u.prototype);
function Ji(r, n, e) {
  const t = [], a = [];
  t.push(0, e, 0), t.push(0, 0, 0);
  for (let s = 0; s < r; s++) {
    const i = s / r * Math.PI * 2, c = Math.cos(i) * n, l = Math.sin(i) * n;
    t.push(c, 0, l);
  }
  for (let s = 0; s < r; s++) {
    const i = s + 2, c = s === r - 1 ? 2 : s + 3;
    a.push(0, c, i), a.push(1, i, c);
  }
  return {
    vertices: new Float32Array(t),
    faces: new Uint16Array(a)
  };
}
const _r = Ji(7, 0.5, 1), Un = new Float32Array(32);
Y.computeBoundsFlatArray(Un, 0, _r.vertices);
Y.computeBoundingSphere(Un, 28, _r.vertices);
function A1() {
  u.call(this);
  const r = new Y();
  r.vertices = _r.vertices, r.faces = _r.faces, r.bounds = Un, r.updateNormals(), this.addComponent(r);
}
A1.prototype = Object.create(u.prototype);
function Ki(r, n, e) {
  const t = [], a = [], s = {};
  function i(l, h, f) {
    const v = `${l.toFixed(5)},${h.toFixed(5)},${f.toFixed(5)}`;
    if (s[v] !== void 0) return s[v];
    const d = t.length / 3;
    return t.push(l, h, f), s[v] = d, d;
  }
  const c = [];
  for (let l = 0; l <= r; l++) {
    const h = [], f = l * Math.PI / r, v = Math.sin(f), d = Math.cos(f);
    for (let M = 0; M <= n; M++) {
      const y = M * 2 * Math.PI / n, p = Math.cos(y) * v * e, m = d * e, o = Math.sin(y) * v * e;
      h.push(i(p, m, o));
    }
    c.push(h);
  }
  for (let l = 0; l < r; l++)
    for (let h = 0; h < n; h++) {
      const f = c[l][h], v = c[l][h + 1], d = c[l + 1][h], M = c[l + 1][h + 1];
      l !== 0 && a.push(f, v, d), l !== r - 1 && a.push(d, v, M);
    }
  return {
    vertices: new Float32Array(t),
    faces: new Uint16Array(a)
  };
}
const Qr = Ki(16, 16, 1), Vn = new Float32Array(32);
Y.computeBoundsFlatArray(Vn, 0, Qr.vertices);
Y.computeBoundingSphere(Vn, 28, Qr.vertices);
function q1() {
  u.call(this);
  const r = new Y();
  r.vertices = Qr.vertices, r.faces = Qr.faces, r.bounds = Vn, r.updateNormals(), this.addComponent(r);
}
q1.prototype = Object.create(u.prototype);
function ui() {
  const r = new Array(65536);
  for (let n = 0; n < 65536; n++) {
    const e = n >> 11 & 31, t = n >> 5 & 63, a = n & 31, s = e << 3 | e >> 2, i = t << 2 | t >> 4, c = a << 3 | a >> 2;
    r[n] = "rgb(" + s + "," + i + "," + c + ")";
  }
  return r;
}
const ne = P1;
function rc(r, n, e, t) {
  var a = r.transform.getLocalToWorld(), s = a[12], i = a[13], c = a[14];
  ne(
    t,
    0,
    s,
    i,
    c,
    e
  );
  for (var l = t[0], h = t[1], f = 50, v = [
    { x: a[0], y: a[1], z: a[2], col: "#ff0000" },
    // X
    { x: a[4], y: a[5], z: a[6], col: "#00ff00" },
    // Y
    { x: a[8], y: a[9], z: a[10], col: "#0000ff" }
    // Z
  ], d = 0; d < 3; d++) {
    var M = v[d], y = Math.sqrt(M.x * M.x + M.y * M.y + M.z * M.z);
    y < 1e-4 && (d === 0 ? M.x = 1 : d === 1 ? M.y = 1 : M.z = 1, y = 1);
    var p = M.x / y, m = M.y / y, o = M.z / y;
    ne(
      t,
      0,
      s + p * f,
      i + m * f,
      c + o * f,
      e
    ), n.beginPath(), n.lineWidth = 2, n.strokeStyle = M.col, n.moveTo(l, h), n.lineTo(t[0], t[1]), n.stroke();
  }
}
const gn = W1, ee = ur, nc = rc, O1 = ui();
function j1() {
  this.layerBuffers = [], this.drawCalls = 0, this.faces = 0, this.lightDirection = new Float32Array([0, 0, 0]), this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.color16Buffer = new Uint16Array(0), this.colorBuffer = new Uint32Array(0), this.faceNormalsBuffer = new Float32Array(0), this.typeBuffer = new Uint8Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.layerBuffers = [], this.layerBufferLengths = new Uint32Array(1), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0);
  for (let r = 0; r < Lr.layersCount; r++)
    this.layerBuffers[r] = this.layerBuffers[r] || [];
  this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0);
}
var Ir = j1.prototype;
Ir.vec3Cache1 = new Float32Array([0, 0, 0]);
Ir.vec3Cache2 = new Float32Array([0, 0, 0]);
Ir.vec4Cache = new Float32Array([0, 0, 0]);
Ir.mat4Scratchpad1 = new Float32Array(16);
Ir.mat4Scratchpad2 = new Float32Array(16);
Ir.mat3Scratchpad1 = new Float32Array(9);
Ir.render = function(r, n, e) {
  let t = Date.now(), a = r.scene.retrieve(r), s = Lr.layersCount, i = n.width, c = n.height, l, h, f, v, d, M, y = this.vec3Cache1, p = this.vec3Cache2, m = this.vec4Cache, o = this.depthBuffer, $ = this.indexBuffer, x = this.vertexIndexBuffer, g = this.vertexBuffer, w = this.clipGeometryBuffer, z = this.color16Buffer, S = this.colorBuffer, b = this.faceNormalsBuffer, q = this.typeBuffer, A = this.visibleObjectsBuffer, F = this.layerBuffers, T = this.layerBufferLengths, L = this.mat4Scratchpad1, O = this.mat4Scratchpad2, k = n.getWorldToScreen(), G = r.transform.getWorldToLocal(), C = r.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let X = 0, Z = 0;
  if (r.camera.fogType !== D.FogType.NONE) {
    const W = r.camera, I = W.fogColor[0] & 248, _ = W.fogColor[1] & 252, V = W.fogColor[2] & 248, P = I << 8 | _ << 3 | V >> 3;
    n.context.fillStyle = O1[P], n.context.fillRect(0, 0, n.width, n.height);
  }
  if (A.length < a.length) {
    const W = A;
    this.visibleObjectsBuffer = A = new Uint32Array(
      a.length
    ), A.set(W);
  }
  const dr = ec(
    a,
    C,
    A
  ), rr = tc(
    A,
    dr,
    a,
    C
  );
  if (T.length < s) {
    var cr = T;
    this.layerBufferLengths = T = new Uint32Array(s), T.set(cr);
  }
  for (v = 0; v < rr; v++) {
    const W = a[A[v]];
    if (W.meshRenderer) {
      const I = W.meshRenderer, _ = I.layer;
      F[_][T[_]++] = I;
    }
  }
  for (v = 0; v < s; v++) {
    M = n.layers[v], h = F[v], f = T[v];
    let W = 0, I = 0;
    for (let P = 0; P < f; P++) {
      W += h[P].faces.length;
      const nr = h[P].vertices.length;
      nr > I && (I = nr);
    }
    W = W / 3 | 0;
    const _ = I / 3 | 0;
    if (this.vMapping.length < _ && (this.vMapping = new Int32Array(_), this.vTags = new Uint32Array(_)), y.length < I && (this.vec3Cache1 = y = new Float32Array(I), this.vec3Cache2 = p = new Float32Array(I), this.vec4Cache = m = new Float32Array(I * 4 / 3)), o.length < W) {
      let P = new Float32Array(W);
      P.set(o), this.depthBuffer = o = P, P = new Uint32Array(W), P.set($), this.indexBuffer = $ = P, P = new Uint8Array(W), P.set(q), this.typeBuffer = q = P, P = new Uint32Array(W), P.set(S), this.colorBuffer = S = P, P = new Uint16Array(W), P.set(z), this.color16Buffer = z = P, P = new Float32Array(W * 9), P.set(w), this.clipGeometryBuffer = w = P, P = new Float32Array(W * 3), P.set(b), this.faceNormalsBuffer = b = P;
      let nr = new Float32Array(W * 9);
      nr.set(g), this.vertexBuffer = g = nr;
      let Rr = new Uint32Array(W * 3);
      Rr.set(x), this.vertexIndexBuffer = x = Rr;
    }
    const V = ac(
      h,
      f,
      p,
      m,
      $,
      o,
      S,
      w,
      G,
      C,
      O,
      L,
      this.mat3Scratchpad1,
      b,
      g,
      x,
      this.vMapping,
      this.vTags
    );
    if (sc(
      V,
      S,
      r.scene,
      this.lightDirection,
      r.camera.ambientLight,
      b
    ), ic(
      V,
      w,
      S,
      o,
      r.camera.fogType,
      r.camera.fogColor,
      r.camera.fogNearPane,
      r.camera.fogFarPane
    ), cc($, V, S, z), (Lr.depthSortingMask & v + 1) === v + 1 && $.subarray(0, V).sort(function(P, nr) {
      return o[nr] - o[P];
    }), this.wireframe)
      hc(
        M,
        g,
        x,
        $,
        V,
        0,
        i,
        c
      );
    else {
      const P = (Lr.layerStrokeMask & v + 1) === v + 1, nr = (Lr.layerClearMask & v + 1) === v + 1;
      lc(
        M,
        g,
        x,
        $,
        z,
        V,
        0,
        P,
        nr,
        i,
        c
      );
    }
    for (d = 0; d < f; d++)
      l = h[d], l.gameObject && l.gameObject.debug && nc(l.gameObject, M, k, y);
    n.context.drawImage(M.canvas, 0, 0), X += V, Z += V, T[v] = 0;
  }
  e.visibleObjects = rr, e.drawCalls = X, e.faces = Z, e.dt = Date.now() - t;
};
function ec(r, n, e) {
  let t = 0;
  const a = n[0], s = n[1], i = n[2], c = n[3], l = n[4], h = n[5], f = n[6], v = n[7], d = n[8], M = n[9], y = n[10], p = n[11], m = n[12], o = n[13], $ = n[14], x = n[15];
  let g = c + a, w = v + l, z = p + d, S = x + m, b = 1 / Math.sqrt(g * g + w * w + z * z);
  g *= b, w *= b, z *= b, S *= b;
  let q = c - a, A = v - l, F = p - d, T = x - m;
  b = 1 / Math.sqrt(q * q + A * A + F * F), q *= b, A *= b, F *= b, T *= b;
  let L = c + s, O = v + h, k = p + M, G = x + o;
  b = 1 / Math.sqrt(L * L + O * O + k * k), L *= b, O *= b, k *= b, G *= b;
  let C = c - s, X = v - h, Z = p - M, dr = x - o;
  b = 1 / Math.sqrt(C * C + X * X + Z * Z), C *= b, X *= b, Z *= b, dr *= b;
  let rr = c + i, cr = v + f, W = p + y, I = x + $;
  b = 1 / Math.sqrt(rr * rr + cr * cr + W * W), rr *= b, cr *= b, W *= b, I *= b;
  let _ = c - i, V = v - f, P = p - y, nr = x - $;
  b = 1 / Math.sqrt(_ * _ + V * V + P * P), _ *= b, V *= b, P *= b, nr *= b;
  const Rr = r.length;
  for (let Wr = 0; Wr < Rr; Wr++) {
    const wr = r[Wr];
    if (!wr.meshRenderer || !wr.meshRenderer.enabled) continue;
    const E = wr.transform.dirtyL ? wr.transform.getLocalToWorld() : wr.transform.localToWorld, Pr = wr.meshRenderer.bounds, Dr = Pr[28], Br = Pr[29], Nr = Pr[30], J = E[0] * Dr + E[4] * Br + E[8] * Nr + E[12], Q = E[1] * Dr + E[5] * Br + E[9] * Nr + E[13], H = E[2] * Dr + E[6] * Br + E[10] * Nr + E[14], fr = E[0] * E[0] + E[1] * E[1] + E[2] * E[2], Er = E[4] * E[4] + E[5] * E[5] + E[6] * E[6], Cr = E[8] * E[8] + E[9] * E[9] + E[10] * E[10], Mr = Pr[31] * Math.sqrt(Math.max(fr, Er, Cr));
    g * J + w * Q + z * H + S < -Mr || q * J + A * Q + F * H + T < -Mr || L * J + O * Q + k * H + G < -Mr || C * J + X * Q + Z * H + dr < -Mr || rr * J + cr * Q + W * H + I < -Mr || _ * J + V * Q + P * H + nr < -Mr || (e[t++] = Wr);
  }
  return t;
}
function tc(r, n, e, t) {
  const a = t, s = a[0], i = a[1], c = a[2], l = a[3], h = a[4], f = a[5], v = a[6], d = a[7], M = a[8], y = a[9], p = a[10], m = a[11], o = a[12], $ = a[13], x = a[14], g = a[15];
  let w = 0;
  for (let z = 0; z < n; z++) {
    const S = r[z], b = e[S], q = b.transform.localToWorld, A = b.meshRenderer;
    if (A && A.enabled && A.bounds) {
      const F = A.bounds;
      let T = 63;
      for (let L = 0; L < 24; L += 3) {
        const O = F[L], k = F[L + 1], G = F[L + 2], C = q[0] * O + q[4] * k + q[8] * G + q[12], X = q[1] * O + q[5] * k + q[9] * G + q[13], Z = q[2] * O + q[6] * k + q[10] * G + q[14], dr = s * C + h * X + M * Z + o, rr = i * C + f * X + y * Z + $, cr = c * C + v * X + p * Z + x, W = l * C + d * X + m * Z + g;
        let I = 0;
        dr < -W && (I |= 1), dr > W && (I |= 2), rr < -W && (I |= 4), rr > W && (I |= 8), cr < -W && (I |= 16), cr > W && (I |= 32), T &= I;
      }
      T === 0 && (r[w++] = S);
    } else {
      const F = q[12], T = q[13], L = q[14], O = s * F + h * T + M * L + o, k = i * F + f * T + y * L + $, G = c * F + v * T + p * L + x, C = l * F + d * T + m * L + g;
      O >= -C && O <= C && k >= -C && k <= C && G >= -C && G <= C && (r[w++] = S);
    }
  }
  return w;
}
let Sr = 0;
function ac(r, n, e, t, a, s, i, c, l, h, f, v, d, M, y, p, m, o) {
  let $ = 0, x = 0;
  for (let g = 0; g < n; g++) {
    const w = r[g];
    if (w.constructor !== Y) continue;
    ++Sr;
    const z = w.gameObject.transform.dirtyL ? w.gameObject.transform.getLocalToWorld() : w.gameObject.transform.localToWorld;
    ee(v, h, z), ee(f, l, z);
    const S = v[0], b = v[1], q = v[2], A = v[3], F = v[4], T = v[5], L = v[6], O = v[7], k = v[8], G = v[9], C = v[10], X = v[11], Z = v[12], dr = v[13], rr = v[14], cr = v[15], W = w.faces, I = w.vertices, _ = w.faceNormals;
    Y.computeNormalMatrix(d, z);
    const V = d, P = V[0], nr = V[1], Rr = V[2], Wr = V[3], wr = V[4], E = V[5], Pr = V[6], Dr = V[7], Br = V[8], Nr = W.length;
    for (let J = 0; J < Nr; J += 3) {
      const Q = W[J], H = W[J + 1], fr = W[J + 2];
      if (o[Q] !== Sr) {
        const U = Q * 3, er = Q << 2, tr = I[U], ar = I[U + 1], sr = I[U + 2];
        t[er] = S * tr + F * ar + k * sr + Z, t[er + 1] = b * tr + T * ar + G * sr + dr, t[er + 2] = q * tr + L * ar + C * sr + rr, t[er + 3] = A * tr + O * ar + X * sr + cr, o[Q] = Sr, m[Q] = -1;
      }
      if (o[H] !== Sr) {
        const U = H * 3, er = H << 2, tr = I[U], ar = I[U + 1], sr = I[U + 2];
        t[er] = S * tr + F * ar + k * sr + Z, t[er + 1] = b * tr + T * ar + G * sr + dr, t[er + 2] = q * tr + L * ar + C * sr + rr, t[er + 3] = A * tr + O * ar + X * sr + cr, o[H] = Sr, m[H] = -1;
      }
      if (o[fr] !== Sr) {
        const U = fr * 3, er = fr << 2, tr = I[U], ar = I[U + 1], sr = I[U + 2];
        t[er] = S * tr + F * ar + k * sr + Z, t[er + 1] = b * tr + T * ar + G * sr + dr, t[er + 2] = q * tr + L * ar + C * sr + rr, t[er + 3] = A * tr + O * ar + X * sr + cr, o[fr] = Sr, m[fr] = -1;
      }
      const Er = Q << 2, Cr = H << 2, Mr = fr << 2, tn = t[Er], an = t[Er + 1], Gn = t[Er + 2], br = t[Er + 3], sn = t[Cr], cn = t[Cr + 1], Yn = t[Cr + 2], Ar = t[Cr + 3], ln = t[Mr], hn = t[Mr + 1], Xn = t[Mr + 2], qr = t[Mr + 3];
      if (tn < -br && sn < -Ar && ln < -qr || tn > br && sn > Ar && ln > qr || an < -br && cn < -Ar && hn < -qr || an > br && cn > Ar && hn > qr || Gn < -br && Yn < -Ar && Xn < -qr || Gn > br && Yn > Ar && Xn > qr) continue;
      const Zn = 1 / br, _n = 1 / Ar, Qn = 1 / qr, fn = tn * Zn, vn = an * Zn, Hn = sn * _n, Jn = cn * _n, Kn = ln * Qn, un = hn * Qn;
      if ((Hn - fn) * (un - vn) - (Jn - vn) * (Kn - fn) > 0) continue;
      const Or = Q * 3, jr = H * 3, Tr = fr * 3;
      a[$] = $;
      const dn = _[J], Mn = _[J + 1], yn = _[J + 2], mn = dn * P + Mn * Wr + yn * Pr, pn = dn * nr + Mn * wr + yn * Dr, on = dn * Rr + Mn * E + yn * Br, re = Math.sqrt(mn * mn + pn * pn + on * on), xn = re > 0 ? 1 / re : 0, L1 = J / 3 | 0, $n = w.faceColors[L1 % w.faceColors.length], Ur = w.colors[$n] << 24 | w.colors[$n + 1] << 16 | w.colors[$n + 2] << 8 | 255;
      if (i[$] = Ur, m[Q] === -1) {
        const U = x * 3;
        gn(
          e,
          Or,
          I[Or],
          I[Or + 1],
          I[Or + 2],
          f
        ), y[U] = fn, y[U + 1] = -vn, y[U + 2] = Ur, m[Q] = U, x++;
      }
      if (p[$ * 3] = m[Q], m[H] === -1) {
        const U = x * 3;
        gn(
          e,
          jr,
          I[jr],
          I[jr + 1],
          I[jr + 2],
          f
        ), y[U] = Hn, y[U + 1] = -Jn, y[U + 2] = Ur, m[H] = U, x++;
      }
      if (p[$ * 3 + 1] = m[H], m[fr] === -1) {
        const U = x * 3;
        gn(
          e,
          Tr,
          I[Tr],
          I[Tr + 1],
          I[Tr + 2],
          f
        ), y[U] = Kn, y[U + 1] = -un, y[U + 2] = Ur, m[fr] = U, x++;
      }
      p[$ * 3 + 2] = m[fr];
      const or = $ * 9;
      c[or] = e[Or], c[or + 1] = e[Or + 1];
      const F1 = c[or + 2] = e[Or + 2];
      c[or + 3] = e[jr], c[or + 4] = e[jr + 1];
      const I1 = c[or + 5] = e[jr + 2];
      c[or + 6] = e[Tr], c[or + 7] = e[Tr + 1];
      const R1 = c[or + 8] = e[Tr + 2];
      s[$] = (F1 + I1 + R1) * 0.33333;
      const wn = $ * 3;
      M[wn] = mn * xn, M[wn + 1] = pn * xn, M[wn + 2] = on * xn, $++;
    }
  }
  return $;
}
function sc(r, n, e, t, a, s) {
  const i = e.light;
  if (!i) return;
  i.transform.forward(t);
  const c = -t[0], l = -t[1], h = -t[2];
  for (let f = 0; f < r; f++) {
    const v = s[f * 3], d = s[f * 3 + 1], M = s[f * 3 + 2], y = v * c + d * l + M * h, p = Math.max(a, y), m = n[f], o = (m >>> 24 & 255) * p, $ = (m >>> 16 & 255) * p, x = (m >>> 8 & 255) * p;
    n[f] = o << 24 | $ << 16 | x << 8 | 255;
  }
}
function ic(r, n, e, t, a, s, i, c) {
  if (a !== D.FogType.NONE)
    for (let l = 0; l < r; l++) {
      const h = e[l], f = t[l];
      let v = 0, d = h >>> 24 & 255, M = h >>> 16 & 255, y = h >>> 8 & 255;
      if (a === D.FogType.RADIAL_FAST || a === D.FogType.RADIAL) {
        const p = n[l * 9], m = n[l * 9 + 1], o = n[l * 9 + 2], $ = n[l * 9 + 3], x = n[l * 9 + 4], g = n[l * 9 + 5], w = n[l * 9 + 6], z = n[l * 9 + 7], S = n[l * 9 + 8], b = (p + $ + w) * 0.33333, q = (m + x + z) * 0.33333, A = (o + g + S) * 0.33333;
        if (a === D.FogType.RADIAL_FAST) {
          const F = i * i, L = 1 / (c * c - F);
          v = (b * b + q * q + A * A - F) * L;
        } else
          v = (Math.sqrt(b * b + q * q + A * A) - i) / (c - i);
      } else a === D.FogType.LINEAR && (v = (f - i) / (c - i));
      v > 1 && (v = 1), v > 0 && (d = d * (1 - v) + s[0] * v | 0, M = M * (1 - v) + s[1] * v | 0, y = y * (1 - v) + s[2] * v | 0, e[l] = d << 24 | M << 16 | y << 8 | 255);
    }
}
function cc(r, n, e, t) {
  for (let a = 0; a < n; a++) {
    const s = e[a];
    let i = s >>> 24 & 255, c = s >>> 16 & 255, l = s >>> 8 & 255;
    const h = i & 248, f = c & 252, v = l & 248;
    t[a] = h << 8 | f << 3 | v >> 3;
  }
}
function lc(r, n, e, t, a, s, i, c, l, h, f) {
  const v = h * 0.5, d = f * 0.5, M = i + s;
  r.lineJoin = "round", r.lineWidth = 1, l && r.clearRect(0, 0, r.canvas.width, r.canvas.height);
  for (let y = i; y < M; y++) {
    const p = t[y], m = e[p * 3], o = e[p * 3 + 1], $ = e[p * 3 + 2], x = a[p];
    r.beginPath(), r.moveTo(
      n[m] * v + v,
      n[m + 1] * d + d
    ), r.lineTo(
      n[o] * v + v,
      n[o + 1] * d + d
    ), r.lineTo(
      n[$] * v + v,
      n[$ + 1] * d + d
    ), r.closePath(), r.strokeStyle = r.fillStyle = O1[x], c && r.stroke(), r.fill();
  }
}
function hc(r, n, e, t, a, s, i, c) {
  const l = i * 0.5, h = c * 0.5, f = s + a;
  r.lineJoin = "miter", r.lineWidth = 0.5, r.strokeStyle = "rgb(0,0,255)", r.clearRect(0, 0, r.canvas.width, r.canvas.height);
  for (let v = s; v < f; v++) {
    const d = t[v], M = e[d * 3], y = e[d * 3 + 1], p = e[d * 3 + 2];
    r.beginPath(), r.moveTo(
      n[M] * l + l,
      n[M + 1] * h + h
    ), r.lineTo(
      n[y] * l + l,
      n[y + 1] * h + h
    ), r.lineTo(
      n[p] * l + l,
      n[p + 1] * h + h
    ), r.closePath(), r.stroke();
  }
}
const te = ur;
function T1(r, n) {
  this.canvas = n || document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new j1(), this.camera = r, this.layers = [];
  for (var e = 0; e < Lr.layersCount; e++) {
    var t = document.createElement("canvas");
    this.layers[e] = t.getContext("2d"), this.layers[e].imageSmoothingEnabled = !1, this.layers[e].webkitImageSmoothingEnabled = !1;
  }
  var a = this;
  window.addEventListener("resize", function() {
    a.setSize(a.canvas.offsetWidth, a.canvas.offsetHeight);
  });
  const s = this;
  this.startRenderLoop = function i() {
    requestAnimationFrame(() => {
      s.render(), requestAnimationFrame(i);
    });
  }, this.lastRenderStats = {};
}
var mr = T1.prototype;
mr.size = null;
mr.width = null;
mr.height = null;
mr.viewportMatrix = null;
mr.camera = null;
mr.canvas = null;
mr.context = null;
mr.start = function() {
  this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight), this.startRenderLoop();
};
mr.render = function() {
  this.camera !== null && this.renderer.render(this.camera.gameObject, this, this.lastRenderStats);
};
mr.setSize = function(r, n) {
  this.width = r, this.height = n, this.canvas.width = r, this.canvas.height = n, this.viewportMatrix[0] = r / 2, this.viewportMatrix[5] = -n / 2, this.viewportMatrix[12] = r / 2, this.viewportMatrix[13] = n / 2;
  for (var e = 0; e < this.layers.length; e++) {
    var t = this.layers[e];
    t.canvas.width = r, t.canvas.height = n;
  }
  return this.camera.setup(this.width, this.height), this;
};
mr.getWorldToScreen = function() {
  return te(this.worldToScreenMatrix, this.viewportMatrix, this.camera.projectionMatrix), te(this.worldToScreenMatrix, this.worldToScreenMatrix, this.camera.gameObject.transform.getWorldToLocal()), this.worldToScreenMatrix;
};
function Hr() {
  B.call(this);
}
Hr.prototype = Object.create(B.prototype);
Hr.prototype.constructor = Hr;
function S1(r) {
  u.call(this, r || "directional light"), this.addComponent(new Hr());
}
S1.prototype = Object.create(u.prototype);
const fc = window.scaliaEngine = {
  config: Lr,
  Game: ce,
  GameObject: u,
  Component: B,
  Camera: g1,
  CameraComponent: D,
  MeshComponent: Y,
  TransformComponent: en,
  SpriteRenderer: Cn,
  glMatrix: _i,
  PathRenderer: kn,
  TextRenderer: Dn,
  Plane: z1,
  Box: b1,
  Cone: A1,
  Ball: q1,
  DirectionalLight: S1,
  Canvas2dViewport: T1
};
export {
  fc as default
};
