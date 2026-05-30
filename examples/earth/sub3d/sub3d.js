const Nr = {
  depthSortingMask: parseInt("11", 2),
  //bitmask, bit per layer
  layerStrokeMask: parseInt("11", 2),
  //bitmask, bit per layer
  layerClearMask: parseInt("11", 2),
  //bitmask, bit per layer
  layersCount: 2,
  debug: !0
};
function Ge() {
  this.now = Date.now();
}
var Ae = Ge.prototype;
Ae.time = 0;
Ae.now = 0;
Ae.dt = 60;
function De() {
  this.gameObjects = [];
}
var ce = De.prototype;
ce.gameObjects = null;
ce.addGameObject = function(n) {
  this.gameObjects[this.gameObjects.length++] = n, n.setScene(this);
};
ce.removeGameObject = function(n) {
  this.gameObjects[this.gameObjects.indexOf(n)] = this.gameObjects[this.gameObjects.length - 1], this.gameObjects.length -= 1;
};
ce.retrieve = function() {
  const n = [], r = [];
  let e = 0, t = 0;
  for (let s = this.gameObjects.length - 1; s >= 0; s--)
    n[t++] = this.gameObjects[s];
  for (; t > 0; ) {
    const s = n[--t];
    s.transform.updateWorldMatrix(), r[e++] = s;
    const a = s.transform.children;
    for (let i = a.length - 1; i >= 0; i--)
      n[t++] = a[i].gameObject;
  }
  return r;
};
function We(n) {
  this.time = new Ge(), this.list = [], this.scene = new De();
}
var _r = We.prototype;
_r.scene = null;
_r.time = null;
_r.tickRegister = function(n) {
  n._tickerIndex === void 0 && (n._tickerIndex = this.list.length, this.list.push(n));
};
_r.tickUnregister = function(n) {
  const r = n._tickerIndex;
  if (r === void 0) return;
  const e = this.list.pop();
  e !== n && (this.list[r] = e, e._tickerIndex = r), n._tickerIndex = void 0;
};
_r.update = function(n) {
  const r = this.list;
  for (let e = 0; e < r.length; e++)
    r[e].tick(n);
};
_r.tick = function() {
  for (var n = Date.now(), r = 0, e = n - this.time.now, t = this.time.dt; e >= t && (e -= t, this.time.now += t, this.time.time += t, this.update(this.time), !(r++ > 200)); )
    ;
};
function Ue() {
  this.world = new We();
  var n = this.world;
  this.tick = function r() {
    n.tick(), requestAnimationFrame(r);
  };
}
var le = Ue.prototype;
le.world = null;
le.render = null;
le.run = function() {
  this.tick();
};
le.rafHandler = null;
function J() {
}
var he = J.prototype;
he.gameObject = null;
he.enabled = !0;
he.setGameObject = function(n) {
  this.gameObject = n;
};
he.unsetGameObject = function() {
  this.gameObject = null;
};
function Mt(n, r, e, t, s, a) {
  return n[r] = a[0] * e + a[4] * t + a[8] * s + a[12], n[r + 1] = a[1] * e + a[5] * t + a[9] * s + a[13], n[r + 2] = a[2] * e + a[6] * t + a[10] * s + a[14], n;
}
function mt(n, r, e, t, s, a) {
  return n[r] = a[0] * e + a[4] * t + a[8] * s + a[12], n[r + 1] = a[1] * e + a[5] * t + a[9] * s + a[13], n;
}
function fe(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], M = r[9], m = r[10], d = r[11], y = r[12], o = r[13], p = r[14], $ = r[15], z = e[0], x = e[1], g = e[2], A = e[3];
  return n[0] = z * t + x * c + g * v + A * y, n[1] = z * s + x * l + g * M + A * o, n[2] = z * a + x * h + g * m + A * p, n[3] = z * i + x * f + g * d + A * $, z = e[4], x = e[5], g = e[6], A = e[7], n[4] = z * t + x * c + g * v + A * y, n[5] = z * s + x * l + g * M + A * o, n[6] = z * a + x * h + g * m + A * p, n[7] = z * i + x * f + g * d + A * $, z = e[8], x = e[9], g = e[10], A = e[11], n[8] = z * t + x * c + g * v + A * y, n[9] = z * s + x * l + g * M + A * o, n[10] = z * a + x * h + g * m + A * p, n[11] = z * i + x * f + g * d + A * $, z = e[12], x = e[13], g = e[14], A = e[15], n[12] = z * t + x * c + g * v + A * y, n[13] = z * s + x * l + g * M + A * o, n[14] = z * a + x * h + g * m + A * p, n[15] = z * i + x * f + g * d + A * $, n;
}
var C = 1e-6, Z = typeof Float32Array < "u" ? Float32Array : Array, zr = Math.random, Ve = "zyx";
function Sr(n) {
  return n >= 0 ? Math.round(n) : n % 0.5 === 0 ? Math.floor(n) : Math.round(n);
}
function ot(n) {
  Z = n;
}
var dt = Math.PI / 180, yt = 180 / Math.PI;
function pt(n) {
  return n * dt;
}
function xt(n) {
  return n * yt;
}
function At(n, r) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : C;
  return Math.abs(n - r) <= e * Math.max(1, Math.abs(n), Math.abs(r));
}
const wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: Ve,
  get ARRAY_TYPE() {
    return Z;
  },
  EPSILON: C,
  RANDOM: zr,
  equals: At,
  round: Sr,
  setMatrixArrayType: ot,
  toDegree: xt,
  toRadian: pt
}, Symbol.toStringTag, { value: "Module" }));
function gt() {
  var n = new Z(4);
  return Z != Float32Array && (n[1] = 0, n[2] = 0), n[0] = 1, n[3] = 1, n;
}
function zt(n) {
  var r = new Z(4);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function $t(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n;
}
function bt(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function qt(n, r, e, t) {
  var s = new Z(4);
  return s[0] = n, s[1] = r, s[2] = e, s[3] = t, s;
}
function Tt(n, r, e, t, s) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n;
}
function Ot(n, r) {
  if (n === r) {
    var e = r[1];
    n[1] = r[2], n[2] = e;
  } else
    n[0] = r[0], n[1] = r[2], n[2] = r[1], n[3] = r[3];
  return n;
}
function St(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e * a - s * t;
  return i ? (i = 1 / i, n[0] = a * i, n[1] = -t * i, n[2] = -s * i, n[3] = e * i, n) : null;
}
function It(n, r) {
  var e = r[0];
  return n[0] = r[3], n[1] = -r[1], n[2] = -r[2], n[3] = e, n;
}
function Ct(n) {
  return n[0] * n[3] - n[2] * n[1];
}
function ke(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return n[0] = t * c + a * l, n[1] = s * c + i * l, n[2] = t * h + a * f, n[3] = s * h + i * f, n;
}
function jt(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l + a * c, n[1] = s * l + i * c, n[2] = t * -c + a * l, n[3] = s * -c + i * l, n;
}
function Rt(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1];
  return n[0] = t * c, n[1] = s * c, n[2] = a * l, n[3] = i * l, n;
}
function Ft(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = e, n[2] = -e, n[3] = t, n;
}
function Et(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = r[1], n;
}
function Lt(n) {
  return "mat2(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
function Yt(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3]);
}
function Bt(n, r, e, t) {
  return n[2] = t[2] / t[0], e[0] = t[0], e[1] = t[1], e[3] = t[3] - n[2] * e[1], [n, r, e];
}
function Pt(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n;
}
function Ne(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n;
}
function Zt(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3];
}
function Gt(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = r[0], c = r[1], l = r[2], h = r[3];
  return Math.abs(e - i) <= C * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(t - c) <= C * Math.max(1, Math.abs(t), Math.abs(c)) && Math.abs(s - l) <= C * Math.max(1, Math.abs(s), Math.abs(l)) && Math.abs(a - h) <= C * Math.max(1, Math.abs(a), Math.abs(h));
}
function Dt(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n;
}
function Wt(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n;
}
var Ut = ke, Vt = Ne;
const kt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: Bt,
  add: Pt,
  adjoint: It,
  clone: zt,
  copy: $t,
  create: gt,
  determinant: Ct,
  equals: Gt,
  exactEquals: Zt,
  frob: Yt,
  fromRotation: Ft,
  fromScaling: Et,
  fromValues: qt,
  identity: bt,
  invert: St,
  mul: Ut,
  multiply: ke,
  multiplyScalar: Dt,
  multiplyScalarAndAdd: Wt,
  rotate: jt,
  scale: Rt,
  set: Tt,
  str: Lt,
  sub: Vt,
  subtract: Ne,
  transpose: Ot
}, Symbol.toStringTag, { value: "Module" }));
function Nt() {
  var n = new Z(6);
  return Z != Float32Array && (n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0), n[0] = 1, n[3] = 1, n;
}
function Xt(n) {
  var r = new Z(6);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r;
}
function _t(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n;
}
function Kt(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function Qt(n, r, e, t, s, a) {
  var i = new Z(6);
  return i[0] = n, i[1] = r, i[2] = e, i[3] = t, i[4] = s, i[5] = a, i;
}
function Ht(n, r, e, t, s, a, i) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n;
}
function Jt(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = e * a - t * s;
  return l ? (l = 1 / l, n[0] = a * l, n[1] = -t * l, n[2] = -s * l, n[3] = e * l, n[4] = (s * c - a * i) * l, n[5] = (t * i - e * c) * l, n) : null;
}
function ut(n) {
  return n[0] * n[3] - n[1] * n[2];
}
function Xe(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = e[0], f = e[1], v = e[2], M = e[3], m = e[4], d = e[5];
  return n[0] = t * h + a * f, n[1] = s * h + i * f, n[2] = t * v + a * M, n[3] = s * v + i * M, n[4] = t * m + a * d + c, n[5] = s * m + i * d + l, n;
}
function n0(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = Math.sin(e), f = Math.cos(e);
  return n[0] = t * f + a * h, n[1] = s * f + i * h, n[2] = t * -h + a * f, n[3] = s * -h + i * f, n[4] = c, n[5] = l, n;
}
function r0(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = e[0], f = e[1];
  return n[0] = t * h, n[1] = s * h, n[2] = a * f, n[3] = i * f, n[4] = c, n[5] = l, n;
}
function e0(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = e[0], f = e[1];
  return n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = t * h + a * f + c, n[5] = s * h + i * f + l, n;
}
function t0(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = e, n[2] = -e, n[3] = t, n[4] = 0, n[5] = 0, n;
}
function s0(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = r[1], n[4] = 0, n[5] = 0, n;
}
function a0(n, r) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = r[0], n[5] = r[1], n;
}
function i0(n) {
  return "mat2d(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ")";
}
function c0(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + 1);
}
function l0(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n;
}
function _e(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n[4] = r[4] - e[4], n[5] = r[5] - e[5], n;
}
function h0(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n;
}
function f0(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n[4] = r[4] + e[4] * t, n[5] = r[5] + e[5] * t, n;
}
function v0(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5];
}
function M0(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = r[0], h = r[1], f = r[2], v = r[3], M = r[4], m = r[5];
  return Math.abs(e - l) <= C * Math.max(1, Math.abs(e), Math.abs(l)) && Math.abs(t - h) <= C * Math.max(1, Math.abs(t), Math.abs(h)) && Math.abs(s - f) <= C * Math.max(1, Math.abs(s), Math.abs(f)) && Math.abs(a - v) <= C * Math.max(1, Math.abs(a), Math.abs(v)) && Math.abs(i - M) <= C * Math.max(1, Math.abs(i), Math.abs(M)) && Math.abs(c - m) <= C * Math.max(1, Math.abs(c), Math.abs(m));
}
var m0 = Xe, o0 = _e;
const d0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: l0,
  clone: Xt,
  copy: _t,
  create: Nt,
  determinant: ut,
  equals: M0,
  exactEquals: v0,
  frob: c0,
  fromRotation: t0,
  fromScaling: s0,
  fromTranslation: a0,
  fromValues: Qt,
  identity: Kt,
  invert: Jt,
  mul: m0,
  multiply: Xe,
  multiplyScalar: h0,
  multiplyScalarAndAdd: f0,
  rotate: n0,
  scale: r0,
  set: Ht,
  str: i0,
  sub: o0,
  subtract: _e,
  translate: e0
}, Symbol.toStringTag, { value: "Module" }));
function Ke() {
  var n = new Z(9);
  return Z != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[0] = 1, n[4] = 1, n[8] = 1, n;
}
function y0(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[4], n[4] = r[5], n[5] = r[6], n[6] = r[8], n[7] = r[9], n[8] = r[10], n;
}
function p0(n) {
  var r = new Z(9);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r;
}
function x0(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n;
}
function A0(n, r, e, t, s, a, i, c, l) {
  var h = new Z(9);
  return h[0] = n, h[1] = r, h[2] = e, h[3] = t, h[4] = s, h[5] = a, h[6] = i, h[7] = c, h[8] = l, h;
}
function w0(n, r, e, t, s, a, i, c, l, h) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n[6] = c, n[7] = l, n[8] = h, n;
}
function g0(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 1, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function z0(n, r) {
  if (n === r) {
    var e = r[1], t = r[2], s = r[5];
    n[1] = r[3], n[2] = r[6], n[3] = e, n[5] = r[7], n[6] = t, n[7] = s;
  } else
    n[0] = r[0], n[1] = r[3], n[2] = r[6], n[3] = r[1], n[4] = r[4], n[5] = r[7], n[6] = r[2], n[7] = r[5], n[8] = r[8];
  return n;
}
function $0(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = f * i - c * h, M = -f * a + c * l, m = h * a - i * l, d = e * v + t * M + s * m;
  return d ? (d = 1 / d, n[0] = v * d, n[1] = (-f * t + s * h) * d, n[2] = (c * t - s * i) * d, n[3] = M * d, n[4] = (f * e - s * l) * d, n[5] = (-c * e + s * a) * d, n[6] = m * d, n[7] = (-h * e + t * l) * d, n[8] = (i * e - t * a) * d, n) : null;
}
function b0(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8];
  return n[0] = i * f - c * h, n[1] = s * h - t * f, n[2] = t * c - s * i, n[3] = c * l - a * f, n[4] = e * f - s * l, n[5] = s * a - e * c, n[6] = a * h - i * l, n[7] = t * l - e * h, n[8] = e * i - t * a, n;
}
function q0(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3], a = n[4], i = n[5], c = n[6], l = n[7], h = n[8];
  return r * (h * a - i * l) + e * (-h * s + i * c) + t * (l * s - a * c);
}
function Qe(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], M = e[0], m = e[1], d = e[2], y = e[3], o = e[4], p = e[5], $ = e[6], z = e[7], x = e[8];
  return n[0] = M * t + m * i + d * h, n[1] = M * s + m * c + d * f, n[2] = M * a + m * l + d * v, n[3] = y * t + o * i + p * h, n[4] = y * s + o * c + p * f, n[5] = y * a + o * l + p * v, n[6] = $ * t + z * i + x * h, n[7] = $ * s + z * c + x * f, n[8] = $ * a + z * l + x * v, n;
}
function T0(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], M = e[0], m = e[1];
  return n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = c, n[5] = l, n[6] = M * t + m * i + h, n[7] = M * s + m * c + f, n[8] = M * a + m * l + v, n;
}
function O0(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], M = Math.sin(e), m = Math.cos(e);
  return n[0] = m * t + M * i, n[1] = m * s + M * c, n[2] = m * a + M * l, n[3] = m * i - M * t, n[4] = m * c - M * s, n[5] = m * l - M * a, n[6] = h, n[7] = f, n[8] = v, n;
}
function S0(n, r, e) {
  var t = e[0], s = e[1];
  return n[0] = t * r[0], n[1] = t * r[1], n[2] = t * r[2], n[3] = s * r[3], n[4] = s * r[4], n[5] = s * r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n;
}
function I0(n, r) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 1, n[5] = 0, n[6] = r[0], n[7] = r[1], n[8] = 1, n;
}
function C0(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = e, n[2] = 0, n[3] = -e, n[4] = t, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function j0(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = r[1], n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function R0(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = 0, n[3] = r[2], n[4] = r[3], n[5] = 0, n[6] = r[4], n[7] = r[5], n[8] = 1, n;
}
function F0(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e + e, c = t + t, l = s + s, h = e * i, f = t * i, v = t * c, M = s * i, m = s * c, d = s * l, y = a * i, o = a * c, p = a * l;
  return n[0] = 1 - v - d, n[3] = f - p, n[6] = M + o, n[1] = f + p, n[4] = 1 - h - d, n[7] = m - y, n[2] = M - o, n[5] = m + y, n[8] = 1 - h - v, n;
}
function E0(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], M = r[10], m = r[11], d = r[12], y = r[13], o = r[14], p = r[15], $ = e * c - t * i, z = e * l - s * i, x = e * h - a * i, g = t * l - s * c, A = t * h - a * c, F = s * h - a * l, E = f * y - v * d, b = f * o - M * d, w = f * p - m * d, I = v * o - M * y, O = v * p - m * y, q = M * p - m * o, T = $ * q - z * O + x * I + g * w - A * b + F * E;
  return T ? (T = 1 / T, n[0] = (c * q - l * O + h * I) * T, n[1] = (l * w - i * q - h * b) * T, n[2] = (i * O - c * w + h * E) * T, n[3] = (s * O - t * q - a * I) * T, n[4] = (e * q - s * w + a * b) * T, n[5] = (t * w - e * O - a * E) * T, n[6] = (y * F - o * A + p * g) * T, n[7] = (o * x - d * F - p * z) * T, n[8] = (d * A - y * x + p * $) * T, n) : null;
}
function L0(n, r, e) {
  return n[0] = 2 / r, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = -2 / e, n[5] = 0, n[6] = -1, n[7] = 1, n[8] = 1, n;
}
function Y0(n) {
  return "mat3(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ", " + n[8] + ")";
}
function B0(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + n[6] * n[6] + n[7] * n[7] + n[8] * n[8]);
}
function P0(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n[6] = r[6] + e[6], n[7] = r[7] + e[7], n[8] = r[8] + e[8], n;
}
function He(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n[4] = r[4] - e[4], n[5] = r[5] - e[5], n[6] = r[6] - e[6], n[7] = r[7] - e[7], n[8] = r[8] - e[8], n;
}
function Z0(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n[6] = r[6] * e, n[7] = r[7] * e, n[8] = r[8] * e, n;
}
function G0(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n[4] = r[4] + e[4] * t, n[5] = r[5] + e[5] * t, n[6] = r[6] + e[6] * t, n[7] = r[7] + e[7] * t, n[8] = r[8] + e[8] * t, n;
}
function D0(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5] && n[6] === r[6] && n[7] === r[7] && n[8] === r[8];
}
function W0(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = r[0], M = r[1], m = r[2], d = r[3], y = r[4], o = r[5], p = r[6], $ = r[7], z = r[8];
  return Math.abs(e - v) <= C * Math.max(1, Math.abs(e), Math.abs(v)) && Math.abs(t - M) <= C * Math.max(1, Math.abs(t), Math.abs(M)) && Math.abs(s - m) <= C * Math.max(1, Math.abs(s), Math.abs(m)) && Math.abs(a - d) <= C * Math.max(1, Math.abs(a), Math.abs(d)) && Math.abs(i - y) <= C * Math.max(1, Math.abs(i), Math.abs(y)) && Math.abs(c - o) <= C * Math.max(1, Math.abs(c), Math.abs(o)) && Math.abs(l - p) <= C * Math.max(1, Math.abs(l), Math.abs(p)) && Math.abs(h - $) <= C * Math.max(1, Math.abs(h), Math.abs($)) && Math.abs(f - z) <= C * Math.max(1, Math.abs(f), Math.abs(z));
}
var U0 = Qe, V0 = He;
const k0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: P0,
  adjoint: b0,
  clone: p0,
  copy: x0,
  create: Ke,
  determinant: q0,
  equals: W0,
  exactEquals: D0,
  frob: B0,
  fromMat2d: R0,
  fromMat4: y0,
  fromQuat: F0,
  fromRotation: C0,
  fromScaling: j0,
  fromTranslation: I0,
  fromValues: A0,
  identity: g0,
  invert: $0,
  mul: U0,
  multiply: Qe,
  multiplyScalar: Z0,
  multiplyScalarAndAdd: G0,
  normalFromMat4: E0,
  projection: L0,
  rotate: O0,
  scale: S0,
  set: w0,
  str: Y0,
  sub: V0,
  subtract: He,
  translate: T0,
  transpose: z0
}, Symbol.toStringTag, { value: "Module" }));
function N0() {
  var n = new Z(16);
  return Z != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0), n[0] = 1, n[5] = 1, n[10] = 1, n[15] = 1, n;
}
function X0(n) {
  var r = new Z(16);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r[9] = n[9], r[10] = n[10], r[11] = n[11], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15], r;
}
function _0(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n[9] = r[9], n[10] = r[10], n[11] = r[11], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], n;
}
function K0(n, r, e, t, s, a, i, c, l, h, f, v, M, m, d, y) {
  var o = new Z(16);
  return o[0] = n, o[1] = r, o[2] = e, o[3] = t, o[4] = s, o[5] = a, o[6] = i, o[7] = c, o[8] = l, o[9] = h, o[10] = f, o[11] = v, o[12] = M, o[13] = m, o[14] = d, o[15] = y, o;
}
function Q0(n, r, e, t, s, a, i, c, l, h, f, v, M, m, d, y, o) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n[6] = c, n[7] = l, n[8] = h, n[9] = f, n[10] = v, n[11] = M, n[12] = m, n[13] = d, n[14] = y, n[15] = o, n;
}
function we(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function H0(n, r) {
  if (n === r) {
    var e = r[1], t = r[2], s = r[3], a = r[6], i = r[7], c = r[11];
    n[1] = r[4], n[2] = r[8], n[3] = r[12], n[4] = e, n[6] = r[9], n[7] = r[13], n[8] = t, n[9] = a, n[11] = r[14], n[12] = s, n[13] = i, n[14] = c;
  } else
    n[0] = r[0], n[1] = r[4], n[2] = r[8], n[3] = r[12], n[4] = r[1], n[5] = r[5], n[6] = r[9], n[7] = r[13], n[8] = r[2], n[9] = r[6], n[10] = r[10], n[11] = r[14], n[12] = r[3], n[13] = r[7], n[14] = r[11], n[15] = r[15];
  return n;
}
function Je(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], M = r[10], m = r[11], d = r[12], y = r[13], o = r[14], p = r[15], $ = e * c - t * i, z = e * l - s * i, x = e * h - a * i, g = t * l - s * c, A = t * h - a * c, F = s * h - a * l, E = f * y - v * d, b = f * o - M * d, w = f * p - m * d, I = v * o - M * y, O = v * p - m * y, q = M * p - m * o, T = $ * q - z * O + x * I + g * w - A * b + F * E;
  return T ? (T = 1 / T, n[0] = (c * q - l * O + h * I) * T, n[1] = (s * O - t * q - a * I) * T, n[2] = (y * F - o * A + p * g) * T, n[3] = (M * A - v * F - m * g) * T, n[4] = (l * w - i * q - h * b) * T, n[5] = (e * q - s * w + a * b) * T, n[6] = (o * x - d * F - p * z) * T, n[7] = (f * F - M * x + m * z) * T, n[8] = (i * O - c * w + h * E) * T, n[9] = (t * w - e * O - a * E) * T, n[10] = (d * A - y * x + p * $) * T, n[11] = (v * x - f * A - m * $) * T, n[12] = (c * b - i * I - l * E) * T, n[13] = (e * I - t * b + s * E) * T, n[14] = (y * z - d * g - o * $) * T, n[15] = (f * g - v * z + M * $) * T, n) : null;
}
function J0(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], M = r[10], m = r[11], d = r[12], y = r[13], o = r[14], p = r[15], $ = e * c - t * i, z = e * l - s * i, x = e * h - a * i, g = t * l - s * c, A = t * h - a * c, F = s * h - a * l, E = f * y - v * d, b = f * o - M * d, w = f * p - m * d, I = v * o - M * y, O = v * p - m * y, q = M * p - m * o;
  return n[0] = c * q - l * O + h * I, n[1] = s * O - t * q - a * I, n[2] = y * F - o * A + p * g, n[3] = M * A - v * F - m * g, n[4] = l * w - i * q - h * b, n[5] = e * q - s * w + a * b, n[6] = o * x - d * F - p * z, n[7] = f * F - M * x + m * z, n[8] = i * O - c * w + h * E, n[9] = t * w - e * O - a * E, n[10] = d * A - y * x + p * $, n[11] = v * x - f * A - m * $, n[12] = c * b - i * I - l * E, n[13] = e * I - t * b + s * E, n[14] = y * z - d * g - o * $, n[15] = f * g - v * z + M * $, n;
}
function u0(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3], a = n[4], i = n[5], c = n[6], l = n[7], h = n[8], f = n[9], v = n[10], M = n[11], m = n[12], d = n[13], y = n[14], o = n[15], p = r * i - e * a, $ = r * c - t * a, z = e * c - t * i, x = h * d - f * m, g = h * y - v * m, A = f * y - v * d, F = r * A - e * g + t * x, E = a * A - i * g + c * x, b = h * z - f * $ + v * p, w = m * z - d * $ + y * p;
  return l * F - s * E + o * b - M * w;
}
function ue(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], M = r[9], m = r[10], d = r[11], y = r[12], o = r[13], p = r[14], $ = r[15], z = e[0], x = e[1], g = e[2], A = e[3];
  return n[0] = z * t + x * c + g * v + A * y, n[1] = z * s + x * l + g * M + A * o, n[2] = z * a + x * h + g * m + A * p, n[3] = z * i + x * f + g * d + A * $, z = e[4], x = e[5], g = e[6], A = e[7], n[4] = z * t + x * c + g * v + A * y, n[5] = z * s + x * l + g * M + A * o, n[6] = z * a + x * h + g * m + A * p, n[7] = z * i + x * f + g * d + A * $, z = e[8], x = e[9], g = e[10], A = e[11], n[8] = z * t + x * c + g * v + A * y, n[9] = z * s + x * l + g * M + A * o, n[10] = z * a + x * h + g * m + A * p, n[11] = z * i + x * f + g * d + A * $, z = e[12], x = e[13], g = e[14], A = e[15], n[12] = z * t + x * c + g * v + A * y, n[13] = z * s + x * l + g * M + A * o, n[14] = z * a + x * h + g * m + A * p, n[15] = z * i + x * f + g * d + A * $, n;
}
function pe(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i, c, l, h, f, v, M, m, d, y, o, p;
  return r === n ? (n[12] = r[0] * t + r[4] * s + r[8] * a + r[12], n[13] = r[1] * t + r[5] * s + r[9] * a + r[13], n[14] = r[2] * t + r[6] * s + r[10] * a + r[14], n[15] = r[3] * t + r[7] * s + r[11] * a + r[15]) : (i = r[0], c = r[1], l = r[2], h = r[3], f = r[4], v = r[5], M = r[6], m = r[7], d = r[8], y = r[9], o = r[10], p = r[11], n[0] = i, n[1] = c, n[2] = l, n[3] = h, n[4] = f, n[5] = v, n[6] = M, n[7] = m, n[8] = d, n[9] = y, n[10] = o, n[11] = p, n[12] = i * t + f * s + d * a + r[12], n[13] = c * t + v * s + y * a + r[13], n[14] = l * t + M * s + o * a + r[14], n[15] = h * t + m * s + p * a + r[15]), n;
}
function n1(n, r, e) {
  var t = e[0], s = e[1], a = e[2];
  return n[0] = r[0] * t, n[1] = r[1] * t, n[2] = r[2] * t, n[3] = r[3] * t, n[4] = r[4] * s, n[5] = r[5] * s, n[6] = r[6] * s, n[7] = r[7] * s, n[8] = r[8] * a, n[9] = r[9] * a, n[10] = r[10] * a, n[11] = r[11] * a, n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], n;
}
function ns(n, r, e, t) {
  var s = t[0], a = t[1], i = t[2], c = Math.sqrt(s * s + a * a + i * i), l, h, f, v, M, m, d, y, o, p, $, z, x, g, A, F, E, b, w, I, O, q, T, j;
  return c < C ? null : (c = 1 / c, s *= c, a *= c, i *= c, l = Math.sin(e), h = Math.cos(e), f = 1 - h, v = r[0], M = r[1], m = r[2], d = r[3], y = r[4], o = r[5], p = r[6], $ = r[7], z = r[8], x = r[9], g = r[10], A = r[11], F = s * s * f + h, E = a * s * f + i * l, b = i * s * f - a * l, w = s * a * f - i * l, I = a * a * f + h, O = i * a * f + s * l, q = s * i * f + a * l, T = a * i * f - s * l, j = i * i * f + h, n[0] = v * F + y * E + z * b, n[1] = M * F + o * E + x * b, n[2] = m * F + p * E + g * b, n[3] = d * F + $ * E + A * b, n[4] = v * w + y * I + z * O, n[5] = M * w + o * I + x * O, n[6] = m * w + p * I + g * O, n[7] = d * w + $ * I + A * O, n[8] = v * q + y * T + z * j, n[9] = M * q + o * T + x * j, n[10] = m * q + p * T + g * j, n[11] = d * q + $ * T + A * j, r !== n && (n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n);
}
function rs(n, r, e) {
  var t = Math.sin(e), s = Math.cos(e), a = r[4], i = r[5], c = r[6], l = r[7], h = r[8], f = r[9], v = r[10], M = r[11];
  return r !== n && (n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n[4] = a * s + h * t, n[5] = i * s + f * t, n[6] = c * s + v * t, n[7] = l * s + M * t, n[8] = h * s - a * t, n[9] = f * s - i * t, n[10] = v * s - c * t, n[11] = M * s - l * t, n;
}
function es(n, r, e) {
  var t = Math.sin(e), s = Math.cos(e), a = r[0], i = r[1], c = r[2], l = r[3], h = r[8], f = r[9], v = r[10], M = r[11];
  return r !== n && (n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n[0] = a * s - h * t, n[1] = i * s - f * t, n[2] = c * s - v * t, n[3] = l * s - M * t, n[8] = a * t + h * s, n[9] = i * t + f * s, n[10] = c * t + v * s, n[11] = l * t + M * s, n;
}
function ts(n, r, e) {
  var t = Math.sin(e), s = Math.cos(e), a = r[0], i = r[1], c = r[2], l = r[3], h = r[4], f = r[5], v = r[6], M = r[7];
  return r !== n && (n[8] = r[8], n[9] = r[9], n[10] = r[10], n[11] = r[11], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n[0] = a * s + h * t, n[1] = i * s + f * t, n[2] = c * s + v * t, n[3] = l * s + M * t, n[4] = h * s - a * t, n[5] = f * s - i * t, n[6] = v * s - c * t, n[7] = M * s - l * t, n;
}
function ss(n, r) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = r[0], n[13] = r[1], n[14] = r[2], n[15] = 1, n;
}
function as(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = r[1], n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = r[2], n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function is(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = Math.sqrt(t * t + s * s + a * a), c, l, h;
  return i < C ? null : (i = 1 / i, t *= i, s *= i, a *= i, c = Math.sin(r), l = Math.cos(r), h = 1 - l, n[0] = t * t * h + l, n[1] = s * t * h + a * c, n[2] = a * t * h - s * c, n[3] = 0, n[4] = t * s * h - a * c, n[5] = s * s * h + l, n[6] = a * s * h + t * c, n[7] = 0, n[8] = t * a * h + s * c, n[9] = s * a * h - t * c, n[10] = a * a * h + l, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n);
}
function cs(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = t, n[6] = e, n[7] = 0, n[8] = 0, n[9] = -e, n[10] = t, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function ls(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = 0, n[2] = -e, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = e, n[9] = 0, n[10] = t, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function hs(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = e, n[2] = 0, n[3] = 0, n[4] = -e, n[5] = t, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function r1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = t + t, l = s + s, h = a + a, f = t * c, v = t * l, M = t * h, m = s * l, d = s * h, y = a * h, o = i * c, p = i * l, $ = i * h;
  return n[0] = 1 - (m + y), n[1] = v + $, n[2] = M - p, n[3] = 0, n[4] = v - $, n[5] = 1 - (f + y), n[6] = d + o, n[7] = 0, n[8] = M + p, n[9] = d - o, n[10] = 1 - (f + m), n[11] = 0, n[12] = e[0], n[13] = e[1], n[14] = e[2], n[15] = 1, n;
}
function fs(n, r) {
  var e = new Z(3), t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = t * t + s * s + a * a + i * i;
  return v > 0 ? (e[0] = (c * i + f * t + l * a - h * s) * 2 / v, e[1] = (l * i + f * s + h * t - c * a) * 2 / v, e[2] = (h * i + f * a + c * s - l * t) * 2 / v) : (e[0] = (c * i + f * t + l * a - h * s) * 2, e[1] = (l * i + f * s + h * t - c * a) * 2, e[2] = (h * i + f * a + c * s - l * t) * 2), r1(n, r, e), n;
}
function e1(n, r) {
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
}
function t1(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[4], i = r[5], c = r[6], l = r[8], h = r[9], f = r[10];
  return n[0] = Math.sqrt(e * e + t * t + s * s), n[1] = Math.sqrt(a * a + i * i + c * c), n[2] = Math.sqrt(l * l + h * h + f * f), n;
}
function s1(n, r) {
  var e = new Z(3);
  t1(e, r);
  var t = 1 / e[0], s = 1 / e[1], a = 1 / e[2], i = r[0] * t, c = r[1] * s, l = r[2] * a, h = r[4] * t, f = r[5] * s, v = r[6] * a, M = r[8] * t, m = r[9] * s, d = r[10] * a, y = i + f + d, o = 0;
  return y > 0 ? (o = Math.sqrt(y + 1) * 2, n[3] = 0.25 * o, n[0] = (v - m) / o, n[1] = (M - l) / o, n[2] = (c - h) / o) : i > f && i > d ? (o = Math.sqrt(1 + i - f - d) * 2, n[3] = (v - m) / o, n[0] = 0.25 * o, n[1] = (c + h) / o, n[2] = (M + l) / o) : f > d ? (o = Math.sqrt(1 + f - i - d) * 2, n[3] = (M - l) / o, n[0] = (c + h) / o, n[1] = 0.25 * o, n[2] = (v + m) / o) : (o = Math.sqrt(1 + d - i - f) * 2, n[3] = (c - h) / o, n[0] = (M + l) / o, n[1] = (v + m) / o, n[2] = 0.25 * o), n;
}
function vs(n, r, e, t) {
  r[0] = t[12], r[1] = t[13], r[2] = t[14];
  var s = t[0], a = t[1], i = t[2], c = t[4], l = t[5], h = t[6], f = t[8], v = t[9], M = t[10];
  e[0] = Math.sqrt(s * s + a * a + i * i), e[1] = Math.sqrt(c * c + l * l + h * h), e[2] = Math.sqrt(f * f + v * v + M * M);
  var m = 1 / e[0], d = 1 / e[1], y = 1 / e[2], o = s * m, p = a * d, $ = i * y, z = c * m, x = l * d, g = h * y, A = f * m, F = v * d, E = M * y, b = o + x + E, w = 0;
  return b > 0 ? (w = Math.sqrt(b + 1) * 2, n[3] = 0.25 * w, n[0] = (g - F) / w, n[1] = (A - $) / w, n[2] = (p - z) / w) : o > x && o > E ? (w = Math.sqrt(1 + o - x - E) * 2, n[3] = (g - F) / w, n[0] = 0.25 * w, n[1] = (p + z) / w, n[2] = (A + $) / w) : x > E ? (w = Math.sqrt(1 + x - o - E) * 2, n[3] = (A - $) / w, n[0] = (p + z) / w, n[1] = 0.25 * w, n[2] = (g + F) / w) : (w = Math.sqrt(1 + E - o - x) * 2, n[3] = (p - z) / w, n[0] = (A + $) / w, n[1] = (g + F) / w, n[2] = 0.25 * w), n;
}
function Ms(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = r[3], l = s + s, h = a + a, f = i + i, v = s * l, M = s * h, m = s * f, d = a * h, y = a * f, o = i * f, p = c * l, $ = c * h, z = c * f, x = t[0], g = t[1], A = t[2];
  return n[0] = (1 - (d + o)) * x, n[1] = (M + z) * x, n[2] = (m - $) * x, n[3] = 0, n[4] = (M - z) * g, n[5] = (1 - (v + o)) * g, n[6] = (y + p) * g, n[7] = 0, n[8] = (m + $) * A, n[9] = (y - p) * A, n[10] = (1 - (v + d)) * A, n[11] = 0, n[12] = e[0], n[13] = e[1], n[14] = e[2], n[15] = 1, n;
}
function ms(n, r, e, t, s) {
  var a = r[0], i = r[1], c = r[2], l = r[3], h = a + a, f = i + i, v = c + c, M = a * h, m = a * f, d = a * v, y = i * f, o = i * v, p = c * v, $ = l * h, z = l * f, x = l * v, g = t[0], A = t[1], F = t[2], E = s[0], b = s[1], w = s[2], I = (1 - (y + p)) * g, O = (m + x) * g, q = (d - z) * g, T = (m - x) * A, j = (1 - (M + p)) * A, K = (o + $) * A, k = (d + z) * F, R = (o - $) * F, tn = (1 - (M + y)) * F;
  return n[0] = I, n[1] = O, n[2] = q, n[3] = 0, n[4] = T, n[5] = j, n[6] = K, n[7] = 0, n[8] = k, n[9] = R, n[10] = tn, n[11] = 0, n[12] = e[0] + E - (I * E + T * b + k * w), n[13] = e[1] + b - (O * E + j * b + R * w), n[14] = e[2] + w - (q * E + K * b + tn * w), n[15] = 1, n;
}
function os(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e + e, c = t + t, l = s + s, h = e * i, f = t * i, v = t * c, M = s * i, m = s * c, d = s * l, y = a * i, o = a * c, p = a * l;
  return n[0] = 1 - v - d, n[1] = f + p, n[2] = M - o, n[3] = 0, n[4] = f - p, n[5] = 1 - h - d, n[6] = m + y, n[7] = 0, n[8] = M + o, n[9] = m - y, n[10] = 1 - h - v, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function ds(n, r, e, t, s, a, i) {
  var c = 1 / (e - r), l = 1 / (s - t), h = 1 / (a - i);
  return n[0] = a * 2 * c, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = a * 2 * l, n[6] = 0, n[7] = 0, n[8] = (e + r) * c, n[9] = (s + t) * l, n[10] = (i + a) * h, n[11] = -1, n[12] = 0, n[13] = 0, n[14] = i * a * 2 * h, n[15] = 0, n;
}
function a1(n, r, e, t, s) {
  var a = 1 / Math.tan(r / 2);
  if (n[0] = a / e, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = a, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = -1, n[12] = 0, n[13] = 0, n[15] = 0, s != null && s !== 1 / 0) {
    var i = 1 / (t - s);
    n[10] = (s + t) * i, n[14] = 2 * s * t * i;
  } else
    n[10] = -1, n[14] = -2 * t;
  return n;
}
var ys = a1;
function ps(n, r, e, t, s) {
  var a = 1 / Math.tan(r / 2);
  if (n[0] = a / e, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = a, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = -1, n[12] = 0, n[13] = 0, n[15] = 0, s != null && s !== 1 / 0) {
    var i = 1 / (t - s);
    n[10] = s * i, n[14] = s * t * i;
  } else
    n[10] = -1, n[14] = -t;
  return n;
}
function xs(n, r, e, t) {
  var s = Math.tan(r.upDegrees * Math.PI / 180), a = Math.tan(r.downDegrees * Math.PI / 180), i = Math.tan(r.leftDegrees * Math.PI / 180), c = Math.tan(r.rightDegrees * Math.PI / 180), l = 2 / (i + c), h = 2 / (s + a);
  return n[0] = l, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = h, n[6] = 0, n[7] = 0, n[8] = -((i - c) * l * 0.5), n[9] = (s - a) * h * 0.5, n[10] = t / (e - t), n[11] = -1, n[12] = 0, n[13] = 0, n[14] = t * e / (e - t), n[15] = 0, n;
}
function i1(n, r, e, t, s, a, i) {
  var c = 1 / (r - e), l = 1 / (t - s), h = 1 / (a - i);
  return n[0] = -2 * c, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * l, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 2 * h, n[11] = 0, n[12] = (r + e) * c, n[13] = (s + t) * l, n[14] = (i + a) * h, n[15] = 1, n;
}
var c1 = i1;
function As(n, r, e, t, s, a, i) {
  var c = 1 / (r - e), l = 1 / (t - s), h = 1 / (a - i);
  return n[0] = -2 * c, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * l, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = h, n[11] = 0, n[12] = (r + e) * c, n[13] = (s + t) * l, n[14] = a * h, n[15] = 1, n;
}
function ws(n, r, e, t) {
  var s, a, i, c, l, h, f, v, M, m, d = r[0], y = r[1], o = r[2], p = t[0], $ = t[1], z = t[2], x = e[0], g = e[1], A = e[2];
  return Math.abs(d - x) < C && Math.abs(y - g) < C && Math.abs(o - A) < C ? we(n) : (f = d - x, v = y - g, M = o - A, m = 1 / Math.sqrt(f * f + v * v + M * M), f *= m, v *= m, M *= m, s = $ * M - z * v, a = z * f - p * M, i = p * v - $ * f, m = Math.sqrt(s * s + a * a + i * i), m ? (m = 1 / m, s *= m, a *= m, i *= m) : (s = 0, a = 0, i = 0), c = v * i - M * a, l = M * s - f * i, h = f * a - v * s, m = Math.sqrt(c * c + l * l + h * h), m ? (m = 1 / m, c *= m, l *= m, h *= m) : (c = 0, l = 0, h = 0), n[0] = s, n[1] = c, n[2] = f, n[3] = 0, n[4] = a, n[5] = l, n[6] = v, n[7] = 0, n[8] = i, n[9] = h, n[10] = M, n[11] = 0, n[12] = -(s * d + a * y + i * o), n[13] = -(c * d + l * y + h * o), n[14] = -(f * d + v * y + M * o), n[15] = 1, n);
}
function gs(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = t[0], l = t[1], h = t[2], f = s - e[0], v = a - e[1], M = i - e[2], m = f * f + v * v + M * M;
  m > 0 && (m = 1 / Math.sqrt(m), f *= m, v *= m, M *= m);
  var d = l * M - h * v, y = h * f - c * M, o = c * v - l * f;
  return m = d * d + y * y + o * o, m > 0 && (m = 1 / Math.sqrt(m), d *= m, y *= m, o *= m), n[0] = d, n[1] = y, n[2] = o, n[3] = 0, n[4] = v * o - M * y, n[5] = M * d - f * o, n[6] = f * y - v * d, n[7] = 0, n[8] = f, n[9] = v, n[10] = M, n[11] = 0, n[12] = s, n[13] = a, n[14] = i, n[15] = 1, n;
}
function zs(n) {
  return "mat4(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ", " + n[8] + ", " + n[9] + ", " + n[10] + ", " + n[11] + ", " + n[12] + ", " + n[13] + ", " + n[14] + ", " + n[15] + ")";
}
function $s(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + n[6] * n[6] + n[7] * n[7] + n[8] * n[8] + n[9] * n[9] + n[10] * n[10] + n[11] * n[11] + n[12] * n[12] + n[13] * n[13] + n[14] * n[14] + n[15] * n[15]);
}
function bs(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n[6] = r[6] + e[6], n[7] = r[7] + e[7], n[8] = r[8] + e[8], n[9] = r[9] + e[9], n[10] = r[10] + e[10], n[11] = r[11] + e[11], n[12] = r[12] + e[12], n[13] = r[13] + e[13], n[14] = r[14] + e[14], n[15] = r[15] + e[15], n;
}
function l1(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n[4] = r[4] - e[4], n[5] = r[5] - e[5], n[6] = r[6] - e[6], n[7] = r[7] - e[7], n[8] = r[8] - e[8], n[9] = r[9] - e[9], n[10] = r[10] - e[10], n[11] = r[11] - e[11], n[12] = r[12] - e[12], n[13] = r[13] - e[13], n[14] = r[14] - e[14], n[15] = r[15] - e[15], n;
}
function qs(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n[6] = r[6] * e, n[7] = r[7] * e, n[8] = r[8] * e, n[9] = r[9] * e, n[10] = r[10] * e, n[11] = r[11] * e, n[12] = r[12] * e, n[13] = r[13] * e, n[14] = r[14] * e, n[15] = r[15] * e, n;
}
function Ts(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n[4] = r[4] + e[4] * t, n[5] = r[5] + e[5] * t, n[6] = r[6] + e[6] * t, n[7] = r[7] + e[7] * t, n[8] = r[8] + e[8] * t, n[9] = r[9] + e[9] * t, n[10] = r[10] + e[10] * t, n[11] = r[11] + e[11] * t, n[12] = r[12] + e[12] * t, n[13] = r[13] + e[13] * t, n[14] = r[14] + e[14] * t, n[15] = r[15] + e[15] * t, n;
}
function Os(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5] && n[6] === r[6] && n[7] === r[7] && n[8] === r[8] && n[9] === r[9] && n[10] === r[10] && n[11] === r[11] && n[12] === r[12] && n[13] === r[13] && n[14] === r[14] && n[15] === r[15];
}
function Ss(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = n[9], M = n[10], m = n[11], d = n[12], y = n[13], o = n[14], p = n[15], $ = r[0], z = r[1], x = r[2], g = r[3], A = r[4], F = r[5], E = r[6], b = r[7], w = r[8], I = r[9], O = r[10], q = r[11], T = r[12], j = r[13], K = r[14], k = r[15];
  return Math.abs(e - $) <= C * Math.max(1, Math.abs(e), Math.abs($)) && Math.abs(t - z) <= C * Math.max(1, Math.abs(t), Math.abs(z)) && Math.abs(s - x) <= C * Math.max(1, Math.abs(s), Math.abs(x)) && Math.abs(a - g) <= C * Math.max(1, Math.abs(a), Math.abs(g)) && Math.abs(i - A) <= C * Math.max(1, Math.abs(i), Math.abs(A)) && Math.abs(c - F) <= C * Math.max(1, Math.abs(c), Math.abs(F)) && Math.abs(l - E) <= C * Math.max(1, Math.abs(l), Math.abs(E)) && Math.abs(h - b) <= C * Math.max(1, Math.abs(h), Math.abs(b)) && Math.abs(f - w) <= C * Math.max(1, Math.abs(f), Math.abs(w)) && Math.abs(v - I) <= C * Math.max(1, Math.abs(v), Math.abs(I)) && Math.abs(M - O) <= C * Math.max(1, Math.abs(M), Math.abs(O)) && Math.abs(m - q) <= C * Math.max(1, Math.abs(m), Math.abs(q)) && Math.abs(d - T) <= C * Math.max(1, Math.abs(d), Math.abs(T)) && Math.abs(y - j) <= C * Math.max(1, Math.abs(y), Math.abs(j)) && Math.abs(o - K) <= C * Math.max(1, Math.abs(o), Math.abs(K)) && Math.abs(p - k) <= C * Math.max(1, Math.abs(p), Math.abs(k));
}
var Is = ue, Cs = l1;
const h1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: bs,
  adjoint: J0,
  clone: X0,
  copy: _0,
  create: N0,
  decompose: vs,
  determinant: u0,
  equals: Ss,
  exactEquals: Os,
  frob: $s,
  fromQuat: os,
  fromQuat2: fs,
  fromRotation: is,
  fromRotationTranslation: r1,
  fromRotationTranslationScale: Ms,
  fromRotationTranslationScaleOrigin: ms,
  fromScaling: as,
  fromTranslation: ss,
  fromValues: K0,
  fromXRotation: cs,
  fromYRotation: ls,
  fromZRotation: hs,
  frustum: ds,
  getRotation: s1,
  getScaling: t1,
  getTranslation: e1,
  identity: we,
  invert: Je,
  lookAt: ws,
  mul: Is,
  multiply: ue,
  multiplyScalar: qs,
  multiplyScalarAndAdd: Ts,
  ortho: c1,
  orthoNO: i1,
  orthoZO: As,
  perspective: ys,
  perspectiveFromFieldOfView: xs,
  perspectiveNO: a1,
  perspectiveZO: ps,
  rotate: ns,
  rotateX: rs,
  rotateY: es,
  rotateZ: ts,
  scale: n1,
  set: Q0,
  str: zs,
  sub: Cs,
  subtract: l1,
  targetTo: gs,
  translate: pe,
  transpose: H0
}, Symbol.toStringTag, { value: "Module" }));
function ge() {
  var n = new Z(3);
  return Z != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n;
}
function js(n) {
  var r = new Z(3);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r;
}
function f1(n) {
  var r = n[0], e = n[1], t = n[2];
  return Math.sqrt(r * r + e * e + t * t);
}
function xe(n, r, e) {
  var t = new Z(3);
  return t[0] = n, t[1] = r, t[2] = e, t;
}
function Rs(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n;
}
function Fs(n, r, e, t) {
  return n[0] = r, n[1] = e, n[2] = t, n;
}
function Es(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n;
}
function v1(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n;
}
function M1(n, r, e) {
  return n[0] = r[0] * e[0], n[1] = r[1] * e[1], n[2] = r[2] * e[2], n;
}
function m1(n, r, e) {
  return n[0] = r[0] / e[0], n[1] = r[1] / e[1], n[2] = r[2] / e[2], n;
}
function Ls(n, r) {
  return n[0] = Math.ceil(r[0]), n[1] = Math.ceil(r[1]), n[2] = Math.ceil(r[2]), n;
}
function Ys(n, r) {
  return n[0] = Math.floor(r[0]), n[1] = Math.floor(r[1]), n[2] = Math.floor(r[2]), n;
}
function Bs(n, r, e) {
  return n[0] = Math.min(r[0], e[0]), n[1] = Math.min(r[1], e[1]), n[2] = Math.min(r[2], e[2]), n;
}
function Ps(n, r, e) {
  return n[0] = Math.max(r[0], e[0]), n[1] = Math.max(r[1], e[1]), n[2] = Math.max(r[2], e[2]), n;
}
function Zs(n, r) {
  return n[0] = Sr(r[0]), n[1] = Sr(r[1]), n[2] = Sr(r[2]), n;
}
function Gs(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n;
}
function Ds(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n;
}
function o1(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1], s = r[2] - n[2];
  return Math.sqrt(e * e + t * t + s * s);
}
function d1(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1], s = r[2] - n[2];
  return e * e + t * t + s * s;
}
function y1(n) {
  var r = n[0], e = n[1], t = n[2];
  return r * r + e * e + t * t;
}
function Ws(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n[2] = -r[2], n;
}
function Us(n, r) {
  return n[0] = 1 / r[0], n[1] = 1 / r[1], n[2] = 1 / r[2], n;
}
function p1(n, r) {
  var e = r[0], t = r[1], s = r[2], a = e * e + t * t + s * s;
  return a > 0 && (a = 1 / Math.sqrt(a)), n[0] = r[0] * a, n[1] = r[1] * a, n[2] = r[2] * a, n;
}
function ve(n, r) {
  return n[0] * r[0] + n[1] * r[1] + n[2] * r[2];
}
function re(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = e[0], c = e[1], l = e[2];
  return n[0] = s * l - a * c, n[1] = a * i - t * l, n[2] = t * c - s * i, n;
}
function Vs(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2];
  return n[0] = s + t * (e[0] - s), n[1] = a + t * (e[1] - a), n[2] = i + t * (e[2] - i), n;
}
function ks(n, r, e, t) {
  var s = Math.acos(Math.min(Math.max(ve(r, e), -1), 1)), a = Math.sin(s), i = Math.sin((1 - t) * s) / a, c = Math.sin(t * s) / a;
  return n[0] = i * r[0] + c * e[0], n[1] = i * r[1] + c * e[1], n[2] = i * r[2] + c * e[2], n;
}
function Ns(n, r, e, t, s, a) {
  var i = a * a, c = i * (2 * a - 3) + 1, l = i * (a - 2) + a, h = i * (a - 1), f = i * (3 - 2 * a);
  return n[0] = r[0] * c + e[0] * l + t[0] * h + s[0] * f, n[1] = r[1] * c + e[1] * l + t[1] * h + s[1] * f, n[2] = r[2] * c + e[2] * l + t[2] * h + s[2] * f, n;
}
function Xs(n, r, e, t, s, a) {
  var i = 1 - a, c = i * i, l = a * a, h = c * i, f = 3 * a * c, v = 3 * l * i, M = l * a;
  return n[0] = r[0] * h + e[0] * f + t[0] * v + s[0] * M, n[1] = r[1] * h + e[1] * f + t[1] * v + s[1] * M, n[2] = r[2] * h + e[2] * f + t[2] * v + s[2] * M, n;
}
function _s(n, r) {
  r = r === void 0 ? 1 : r;
  var e = zr() * 2 * Math.PI, t = zr() * 2 - 1, s = Math.sqrt(1 - t * t) * r;
  return n[0] = Math.cos(e) * s, n[1] = Math.sin(e) * s, n[2] = t * r, n;
}
function x1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = e[3] * t + e[7] * s + e[11] * a + e[15];
  return i = i || 1, n[0] = (e[0] * t + e[4] * s + e[8] * a + e[12]) / i, n[1] = (e[1] * t + e[5] * s + e[9] * a + e[13]) / i, n[2] = (e[2] * t + e[6] * s + e[10] * a + e[14]) / i, n;
}
function Ks(n, r, e) {
  var t = r[0], s = r[1], a = r[2];
  return n[0] = t * e[0] + s * e[3] + a * e[6], n[1] = t * e[1] + s * e[4] + a * e[7], n[2] = t * e[2] + s * e[5] + a * e[8], n;
}
function Qs(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = e[3], c = r[0], l = r[1], h = r[2], f = s * h - a * l, v = a * c - t * h, M = t * l - s * c;
  return f = f + f, v = v + v, M = M + M, n[0] = c + i * f + s * M - a * v, n[1] = l + i * v + a * f - t * M, n[2] = h + i * M + t * v - s * f, n;
}
function Hs(n, r, e, t) {
  var s = [], a = [];
  return s[0] = r[0] - e[0], s[1] = r[1] - e[1], s[2] = r[2] - e[2], a[0] = s[0], a[1] = s[1] * Math.cos(t) - s[2] * Math.sin(t), a[2] = s[1] * Math.sin(t) + s[2] * Math.cos(t), n[0] = a[0] + e[0], n[1] = a[1] + e[1], n[2] = a[2] + e[2], n;
}
function Js(n, r, e, t) {
  var s = [], a = [];
  return s[0] = r[0] - e[0], s[1] = r[1] - e[1], s[2] = r[2] - e[2], a[0] = s[2] * Math.sin(t) + s[0] * Math.cos(t), a[1] = s[1], a[2] = s[2] * Math.cos(t) - s[0] * Math.sin(t), n[0] = a[0] + e[0], n[1] = a[1] + e[1], n[2] = a[2] + e[2], n;
}
function us(n, r, e, t) {
  var s = [], a = [];
  return s[0] = r[0] - e[0], s[1] = r[1] - e[1], s[2] = r[2] - e[2], a[0] = s[0] * Math.cos(t) - s[1] * Math.sin(t), a[1] = s[0] * Math.sin(t) + s[1] * Math.cos(t), a[2] = s[2], n[0] = a[0] + e[0], n[1] = a[1] + e[1], n[2] = a[2] + e[2], n;
}
function na(n, r) {
  var e = n[0], t = n[1], s = n[2], a = r[0], i = r[1], c = r[2], l = Math.sqrt((e * e + t * t + s * s) * (a * a + i * i + c * c)), h = l && ve(n, r) / l;
  return Math.acos(Math.min(Math.max(h, -1), 1));
}
function ra(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n;
}
function ea(n) {
  return "vec3(" + n[0] + ", " + n[1] + ", " + n[2] + ")";
}
function ta(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2];
}
function sa(n, r) {
  var e = n[0], t = n[1], s = n[2], a = r[0], i = r[1], c = r[2];
  return Math.abs(e - a) <= C * Math.max(1, Math.abs(e), Math.abs(a)) && Math.abs(t - i) <= C * Math.max(1, Math.abs(t), Math.abs(i)) && Math.abs(s - c) <= C * Math.max(1, Math.abs(s), Math.abs(c));
}
var aa = v1, ia = M1, ca = m1, la = o1, ha = d1, A1 = f1, fa = y1, va = (function() {
  var n = ge();
  return function(r, e, t, s, a, i) {
    var c, l;
    for (e || (e = 3), t || (t = 0), s ? l = Math.min(s * e + t, r.length) : l = r.length, c = t; c < l; c += e)
      n[0] = r[c], n[1] = r[c + 1], n[2] = r[c + 2], a(n, n, i), r[c] = n[0], r[c + 1] = n[1], r[c + 2] = n[2];
    return r;
  };
})();
const Ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Es,
  angle: na,
  bezier: Xs,
  ceil: Ls,
  clone: js,
  copy: Rs,
  create: ge,
  cross: re,
  dist: la,
  distance: o1,
  div: ca,
  divide: m1,
  dot: ve,
  equals: sa,
  exactEquals: ta,
  floor: Ys,
  forEach: va,
  fromValues: xe,
  hermite: Ns,
  inverse: Us,
  len: A1,
  length: f1,
  lerp: Vs,
  max: Ps,
  min: Bs,
  mul: ia,
  multiply: M1,
  negate: Ws,
  normalize: p1,
  random: _s,
  rotateX: Hs,
  rotateY: Js,
  rotateZ: us,
  round: Zs,
  scale: Gs,
  scaleAndAdd: Ds,
  set: Fs,
  slerp: ks,
  sqrDist: ha,
  sqrLen: fa,
  squaredDistance: d1,
  squaredLength: y1,
  str: ea,
  sub: aa,
  subtract: v1,
  transformMat3: Ks,
  transformMat4: x1,
  transformQuat: Qs,
  zero: ra
}, Symbol.toStringTag, { value: "Module" }));
function w1() {
  var n = new Z(4);
  return Z != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0), n;
}
function g1(n) {
  var r = new Z(4);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function z1(n, r, e, t) {
  var s = new Z(4);
  return s[0] = n, s[1] = r, s[2] = e, s[3] = t, s;
}
function $1(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n;
}
function b1(n, r, e, t, s) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n;
}
function q1(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n;
}
function T1(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n;
}
function O1(n, r, e) {
  return n[0] = r[0] * e[0], n[1] = r[1] * e[1], n[2] = r[2] * e[2], n[3] = r[3] * e[3], n;
}
function S1(n, r, e) {
  return n[0] = r[0] / e[0], n[1] = r[1] / e[1], n[2] = r[2] / e[2], n[3] = r[3] / e[3], n;
}
function ma(n, r) {
  return n[0] = Math.ceil(r[0]), n[1] = Math.ceil(r[1]), n[2] = Math.ceil(r[2]), n[3] = Math.ceil(r[3]), n;
}
function oa(n, r) {
  return n[0] = Math.floor(r[0]), n[1] = Math.floor(r[1]), n[2] = Math.floor(r[2]), n[3] = Math.floor(r[3]), n;
}
function da(n, r, e) {
  return n[0] = Math.min(r[0], e[0]), n[1] = Math.min(r[1], e[1]), n[2] = Math.min(r[2], e[2]), n[3] = Math.min(r[3], e[3]), n;
}
function ya(n, r, e) {
  return n[0] = Math.max(r[0], e[0]), n[1] = Math.max(r[1], e[1]), n[2] = Math.max(r[2], e[2]), n[3] = Math.max(r[3], e[3]), n;
}
function pa(n, r) {
  return n[0] = Sr(r[0]), n[1] = Sr(r[1]), n[2] = Sr(r[2]), n[3] = Sr(r[3]), n;
}
function I1(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n;
}
function xa(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n;
}
function C1(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1], s = r[2] - n[2], a = r[3] - n[3];
  return Math.sqrt(e * e + t * t + s * s + a * a);
}
function j1(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1], s = r[2] - n[2], a = r[3] - n[3];
  return e * e + t * t + s * s + a * a;
}
function ze(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3];
  return Math.sqrt(r * r + e * e + t * t + s * s);
}
function $e(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3];
  return r * r + e * e + t * t + s * s;
}
function Aa(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n[2] = -r[2], n[3] = -r[3], n;
}
function wa(n, r) {
  return n[0] = 1 / r[0], n[1] = 1 / r[1], n[2] = 1 / r[2], n[3] = 1 / r[3], n;
}
function R1(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e * e + t * t + s * s + a * a;
  return i > 0 && (i = 1 / Math.sqrt(i)), n[0] = e * i, n[1] = t * i, n[2] = s * i, n[3] = a * i, n;
}
function be(n, r) {
  return n[0] * r[0] + n[1] * r[1] + n[2] * r[2] + n[3] * r[3];
}
function ga(n, r, e, t) {
  var s = e[0] * t[1] - e[1] * t[0], a = e[0] * t[2] - e[2] * t[0], i = e[0] * t[3] - e[3] * t[0], c = e[1] * t[2] - e[2] * t[1], l = e[1] * t[3] - e[3] * t[1], h = e[2] * t[3] - e[3] * t[2], f = r[0], v = r[1], M = r[2], m = r[3];
  return n[0] = v * h - M * l + m * c, n[1] = -(f * h) + M * i - m * a, n[2] = f * l - v * i + m * s, n[3] = -(f * c) + v * a - M * s, n;
}
function F1(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = r[3];
  return n[0] = s + t * (e[0] - s), n[1] = a + t * (e[1] - a), n[2] = i + t * (e[2] - i), n[3] = c + t * (e[3] - c), n;
}
function za(n, r) {
  r = r === void 0 ? 1 : r;
  var e, t, s, a, i, c, l;
  l = zr(), e = l * 2 - 1, t = (4 * zr() - 2) * Math.sqrt(l * -l + l), i = e * e + t * t, l = zr(), s = l * 2 - 1, a = (4 * zr() - 2) * Math.sqrt(l * -l + l), c = s * s + a * a;
  var h = Math.sqrt((1 - i) / c);
  return n[0] = r * e, n[1] = r * t, n[2] = r * s * h, n[3] = r * a * h, n;
}
function $a(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3];
  return n[0] = e[0] * t + e[4] * s + e[8] * a + e[12] * i, n[1] = e[1] * t + e[5] * s + e[9] * a + e[13] * i, n[2] = e[2] * t + e[6] * s + e[10] * a + e[14] * i, n[3] = e[3] * t + e[7] * s + e[11] * a + e[15] * i, n;
}
function ba(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = e[3], c = r[0], l = r[1], h = r[2], f = s * h - a * l, v = a * c - t * h, M = t * l - s * c;
  return f = f + f, v = v + v, M = M + M, n[0] = c + i * f + s * M - a * v, n[1] = l + i * v + a * f - t * M, n[2] = h + i * M + t * v - s * f, n[3] = r[3], n;
}
function qa(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0, n;
}
function Ta(n) {
  return "vec4(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
function E1(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3];
}
function Oa(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = r[0], c = r[1], l = r[2], h = r[3];
  return Math.abs(e - i) <= C * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(t - c) <= C * Math.max(1, Math.abs(t), Math.abs(c)) && Math.abs(s - l) <= C * Math.max(1, Math.abs(s), Math.abs(l)) && Math.abs(a - h) <= C * Math.max(1, Math.abs(a), Math.abs(h));
}
var Sa = T1, Ia = O1, Ca = S1, ja = C1, Ra = j1, Fa = ze, Ea = $e, La = (function() {
  var n = w1();
  return function(r, e, t, s, a, i) {
    var c, l;
    for (e || (e = 4), t || (t = 0), s ? l = Math.min(s * e + t, r.length) : l = r.length, c = t; c < l; c += e)
      n[0] = r[c], n[1] = r[c + 1], n[2] = r[c + 2], n[3] = r[c + 3], a(n, n, i), r[c] = n[0], r[c + 1] = n[1], r[c + 2] = n[2], r[c + 3] = n[3];
    return r;
  };
})();
const Ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: q1,
  ceil: ma,
  clone: g1,
  copy: $1,
  create: w1,
  cross: ga,
  dist: ja,
  distance: C1,
  div: Ca,
  divide: S1,
  dot: be,
  equals: Oa,
  exactEquals: E1,
  floor: oa,
  forEach: La,
  fromValues: z1,
  inverse: wa,
  len: Fa,
  length: ze,
  lerp: F1,
  max: ya,
  min: da,
  mul: Ia,
  multiply: O1,
  negate: Aa,
  normalize: R1,
  random: za,
  round: pa,
  scale: I1,
  scaleAndAdd: xa,
  set: b1,
  sqrDist: Ra,
  sqrLen: Ea,
  squaredDistance: j1,
  squaredLength: $e,
  str: Ta,
  sub: Sa,
  subtract: T1,
  transformMat4: $a,
  transformQuat: ba,
  zero: qa
}, Symbol.toStringTag, { value: "Module" }));
function te() {
  var n = new Z(4);
  return Z != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n[3] = 1, n;
}
function Ba(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function L1(n, r, e) {
  e = e * 0.5;
  var t = Math.sin(e);
  return n[0] = t * r[0], n[1] = t * r[1], n[2] = t * r[2], n[3] = Math.cos(e), n;
}
function Pa(n, r) {
  var e = Math.acos(r[3]) * 2, t = Math.sin(e / 2);
  return t > C ? (n[0] = r[0] / t, n[1] = r[1] / t, n[2] = r[2] / t) : (n[0] = 1, n[1] = 0, n[2] = 0), e;
}
function Za(n, r) {
  var e = Te(n, r);
  return Math.acos(2 * e * e - 1);
}
function Y1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return n[0] = t * f + i * c + s * h - a * l, n[1] = s * f + i * l + a * c - t * h, n[2] = a * f + i * h + t * l - s * c, n[3] = i * f - t * c - s * l - a * h, n;
}
function B1(n, r, e) {
  e *= 0.5;
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l + i * c, n[1] = s * l + a * c, n[2] = a * l - s * c, n[3] = i * l - t * c, n;
}
function P1(n, r, e) {
  e *= 0.5;
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l - a * c, n[1] = s * l + i * c, n[2] = a * l + t * c, n[3] = i * l - s * c, n;
}
function Z1(n, r, e) {
  e *= 0.5;
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l + s * c, n[1] = s * l - t * c, n[2] = a * l + i * c, n[3] = i * l - a * c, n;
}
function Ga(n, r) {
  var e = r[0], t = r[1], s = r[2];
  return n[0] = e, n[1] = t, n[2] = s, n[3] = Math.sqrt(Math.abs(1 - e * e - t * t - s * s)), n;
}
function G1(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = Math.sqrt(e * e + t * t + s * s), c = Math.exp(a), l = i > 0 ? c * Math.sin(i) / i : 0;
  return n[0] = e * l, n[1] = t * l, n[2] = s * l, n[3] = c * Math.cos(i), n;
}
function D1(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = Math.sqrt(e * e + t * t + s * s), c = i > 0 ? Math.atan2(i, a) / i : 0;
  return n[0] = e * c, n[1] = t * c, n[2] = s * c, n[3] = 0.5 * Math.log(e * e + t * t + s * s + a * a), n;
}
function Da(n, r, e) {
  return D1(n, r), U1(n, n, e), G1(n, n), n;
}
function ee(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = r[3], l = e[0], h = e[1], f = e[2], v = e[3], M, m, d, y, o;
  return m = s * l + a * h + i * f + c * v, m < 0 && (m = -m, l = -l, h = -h, f = -f, v = -v), 1 - m > C ? (M = Math.acos(m), d = Math.sin(M), y = Math.sin((1 - t) * M) / d, o = Math.sin(t * M) / d) : (y = 1 - t, o = t), n[0] = y * s + o * l, n[1] = y * a + o * h, n[2] = y * i + o * f, n[3] = y * c + o * v, n;
}
function Wa(n) {
  var r = zr(), e = zr(), t = zr(), s = Math.sqrt(1 - r), a = Math.sqrt(r);
  return n[0] = s * Math.sin(2 * Math.PI * e), n[1] = s * Math.cos(2 * Math.PI * e), n[2] = a * Math.sin(2 * Math.PI * t), n[3] = a * Math.cos(2 * Math.PI * t), n;
}
function Ua(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e * e + t * t + s * s + a * a, c = i ? 1 / i : 0;
  return n[0] = -e * c, n[1] = -t * c, n[2] = -s * c, n[3] = a * c, n;
}
function Va(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n[2] = -r[2], n[3] = r[3], n;
}
function W1(n, r) {
  var e = r[0] + r[4] + r[8], t;
  if (e > 0)
    t = Math.sqrt(e + 1), n[3] = 0.5 * t, t = 0.5 / t, n[0] = (r[5] - r[7]) * t, n[1] = (r[6] - r[2]) * t, n[2] = (r[1] - r[3]) * t;
  else {
    var s = 0;
    r[4] > r[0] && (s = 1), r[8] > r[s * 3 + s] && (s = 2);
    var a = (s + 1) % 3, i = (s + 2) % 3;
    t = Math.sqrt(r[s * 3 + s] - r[a * 3 + a] - r[i * 3 + i] + 1), n[s] = 0.5 * t, t = 0.5 / t, n[3] = (r[a * 3 + i] - r[i * 3 + a]) * t, n[a] = (r[a * 3 + s] + r[s * 3 + a]) * t, n[i] = (r[i * 3 + s] + r[s * 3 + i]) * t;
  }
  return n;
}
function ka(n, r, e, t) {
  var s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : Ve, a = Math.PI / 360;
  r *= a, t *= a, e *= a;
  var i = Math.sin(r), c = Math.cos(r), l = Math.sin(e), h = Math.cos(e), f = Math.sin(t), v = Math.cos(t);
  switch (s) {
    case "xyz":
      n[0] = i * h * v + c * l * f, n[1] = c * l * v - i * h * f, n[2] = c * h * f + i * l * v, n[3] = c * h * v - i * l * f;
      break;
    case "xzy":
      n[0] = i * h * v - c * l * f, n[1] = c * l * v - i * h * f, n[2] = c * h * f + i * l * v, n[3] = c * h * v + i * l * f;
      break;
    case "yxz":
      n[0] = i * h * v + c * l * f, n[1] = c * l * v - i * h * f, n[2] = c * h * f - i * l * v, n[3] = c * h * v + i * l * f;
      break;
    case "yzx":
      n[0] = i * h * v + c * l * f, n[1] = c * l * v + i * h * f, n[2] = c * h * f - i * l * v, n[3] = c * h * v - i * l * f;
      break;
    case "zxy":
      n[0] = i * h * v - c * l * f, n[1] = c * l * v + i * h * f, n[2] = c * h * f + i * l * v, n[3] = c * h * v - i * l * f;
      break;
    case "zyx":
      n[0] = i * h * v - c * l * f, n[1] = c * l * v + i * h * f, n[2] = c * h * f - i * l * v, n[3] = c * h * v + i * l * f;
      break;
    default:
      throw new Error("Unknown angle order " + s);
  }
  return n;
}
function Na(n) {
  return "quat(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
var Xa = g1, _a = z1, qe = $1, Ka = b1, Qa = q1, Ha = Y1, U1 = I1, Te = be, Ja = F1, Oe = ze, ua = Oe, Se = $e, ni = Se, Ie = R1, ri = E1;
function ei(n, r) {
  return Math.abs(be(n, r)) >= 1 - C;
}
var ti = (function() {
  var n = ge(), r = xe(1, 0, 0), e = xe(0, 1, 0);
  return function(t, s, a) {
    var i = ve(s, a);
    return i < -0.999999 ? (re(n, r, s), A1(n) < 1e-6 && re(n, e, s), p1(n, n), L1(t, n, Math.PI), t) : i > 0.999999 ? (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t) : (re(n, s, a), t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = 1 + i, Ie(t, t));
  };
})(), si = (function() {
  var n = te(), r = te();
  return function(e, t, s, a, i, c) {
    return ee(n, t, i, c), ee(r, s, a, c), ee(e, n, r, 2 * c * (1 - c)), e;
  };
})(), ai = (function() {
  var n = Ke();
  return function(r, e, t, s) {
    return n[0] = t[0], n[3] = t[1], n[6] = t[2], n[1] = s[0], n[4] = s[1], n[7] = s[2], n[2] = -e[0], n[5] = -e[1], n[8] = -e[2], Ie(r, W1(r, n));
  };
})();
const ii = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Qa,
  calculateW: Ga,
  clone: Xa,
  conjugate: Va,
  copy: qe,
  create: te,
  dot: Te,
  equals: ei,
  exactEquals: ri,
  exp: G1,
  fromEuler: ka,
  fromMat3: W1,
  fromValues: _a,
  getAngle: Za,
  getAxisAngle: Pa,
  identity: Ba,
  invert: Ua,
  len: ua,
  length: Oe,
  lerp: Ja,
  ln: D1,
  mul: Ha,
  multiply: Y1,
  normalize: Ie,
  pow: Da,
  random: Wa,
  rotateX: B1,
  rotateY: P1,
  rotateZ: Z1,
  rotationTo: ti,
  scale: U1,
  set: Ka,
  setAxes: ai,
  setAxisAngle: L1,
  slerp: ee,
  sqlerp: si,
  sqrLen: ni,
  squaredLength: Se,
  str: Na
}, Symbol.toStringTag, { value: "Module" }));
function ci() {
  var n = new Z(8);
  return Z != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[3] = 1, n;
}
function li(n) {
  var r = new Z(8);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r;
}
function hi(n, r, e, t, s, a, i, c) {
  var l = new Z(8);
  return l[0] = n, l[1] = r, l[2] = e, l[3] = t, l[4] = s, l[5] = a, l[6] = i, l[7] = c, l;
}
function fi(n, r, e, t, s, a, i) {
  var c = new Z(8);
  c[0] = n, c[1] = r, c[2] = e, c[3] = t;
  var l = s * 0.5, h = a * 0.5, f = i * 0.5;
  return c[4] = l * t + h * e - f * r, c[5] = h * t + f * n - l * e, c[6] = f * t + l * r - h * n, c[7] = -l * n - h * r - f * e, c;
}
function V1(n, r, e) {
  var t = e[0] * 0.5, s = e[1] * 0.5, a = e[2] * 0.5, i = r[0], c = r[1], l = r[2], h = r[3];
  return n[0] = i, n[1] = c, n[2] = l, n[3] = h, n[4] = t * h + s * l - a * c, n[5] = s * h + a * i - t * l, n[6] = a * h + t * c - s * i, n[7] = -t * i - s * c - a * l, n;
}
function vi(n, r) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = r[0] * 0.5, n[5] = r[1] * 0.5, n[6] = r[2] * 0.5, n[7] = 0, n;
}
function Mi(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n;
}
function mi(n, r) {
  var e = te();
  s1(e, r);
  var t = new Z(3);
  return e1(t, r), V1(n, e, t), n;
}
function k1(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n;
}
function oi(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n;
}
function di(n, r, e, t, s, a, i, c, l) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n[6] = c, n[7] = l, n;
}
var yi = qe;
function pi(n, r) {
  return n[0] = r[4], n[1] = r[5], n[2] = r[6], n[3] = r[7], n;
}
var xi = qe;
function Ai(n, r) {
  return n[4] = r[0], n[5] = r[1], n[6] = r[2], n[7] = r[3], n;
}
function wi(n, r) {
  var e = r[4], t = r[5], s = r[6], a = r[7], i = -r[0], c = -r[1], l = -r[2], h = r[3];
  return n[0] = (e * h + a * i + t * l - s * c) * 2, n[1] = (t * h + a * c + s * i - e * l) * 2, n[2] = (s * h + a * l + e * c - t * i) * 2, n;
}
function gi(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0] * 0.5, l = e[1] * 0.5, h = e[2] * 0.5, f = r[4], v = r[5], M = r[6], m = r[7];
  return n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = i * c + s * h - a * l + f, n[5] = i * l + a * c - t * h + v, n[6] = i * h + t * l - s * c + M, n[7] = -t * c - s * l - a * h + m, n;
}
function zi(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, M = l * i + f * s + h * t - c * a, m = h * i + f * a + c * s - l * t, d = f * i - c * t - l * s - h * a;
  return B1(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + d * t + M * a - m * s, n[5] = M * i + d * s + m * t - v * a, n[6] = m * i + d * a + v * s - M * t, n[7] = d * i - v * t - M * s - m * a, n;
}
function $i(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, M = l * i + f * s + h * t - c * a, m = h * i + f * a + c * s - l * t, d = f * i - c * t - l * s - h * a;
  return P1(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + d * t + M * a - m * s, n[5] = M * i + d * s + m * t - v * a, n[6] = m * i + d * a + v * s - M * t, n[7] = d * i - v * t - M * s - m * a, n;
}
function bi(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, M = l * i + f * s + h * t - c * a, m = h * i + f * a + c * s - l * t, d = f * i - c * t - l * s - h * a;
  return Z1(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + d * t + M * a - m * s, n[5] = M * i + d * s + m * t - v * a, n[6] = m * i + d * a + v * s - M * t, n[7] = d * i - v * t - M * s - m * a, n;
}
function qi(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = e[3], c = r[0], l = r[1], h = r[2], f = r[3];
  return n[0] = c * i + f * t + l * a - h * s, n[1] = l * i + f * s + h * t - c * a, n[2] = h * i + f * a + c * s - l * t, n[3] = f * i - c * t - l * s - h * a, c = r[4], l = r[5], h = r[6], f = r[7], n[4] = c * i + f * t + l * a - h * s, n[5] = l * i + f * s + h * t - c * a, n[6] = h * i + f * a + c * s - l * t, n[7] = f * i - c * t - l * s - h * a, n;
}
function Ti(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return n[0] = t * f + i * c + s * h - a * l, n[1] = s * f + i * l + a * c - t * h, n[2] = a * f + i * h + t * l - s * c, n[3] = i * f - t * c - s * l - a * h, c = e[4], l = e[5], h = e[6], f = e[7], n[4] = t * f + i * c + s * h - a * l, n[5] = s * f + i * l + a * c - t * h, n[6] = a * f + i * h + t * l - s * c, n[7] = i * f - t * c - s * l - a * h, n;
}
function Oi(n, r, e, t) {
  if (Math.abs(t) < C)
    return k1(n, r);
  var s = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
  t = t * 0.5;
  var a = Math.sin(t), i = a * e[0] / s, c = a * e[1] / s, l = a * e[2] / s, h = Math.cos(t), f = r[0], v = r[1], M = r[2], m = r[3];
  n[0] = f * h + m * i + v * l - M * c, n[1] = v * h + m * c + M * i - f * l, n[2] = M * h + m * l + f * c - v * i, n[3] = m * h - f * i - v * c - M * l;
  var d = r[4], y = r[5], o = r[6], p = r[7];
  return n[4] = d * h + p * i + y * l - o * c, n[5] = y * h + p * c + o * i - d * l, n[6] = o * h + p * l + d * c - y * i, n[7] = p * h - d * i - y * c - o * l, n;
}
function Si(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n[6] = r[6] + e[6], n[7] = r[7] + e[7], n;
}
function N1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[4], l = e[5], h = e[6], f = e[7], v = r[4], M = r[5], m = r[6], d = r[7], y = e[0], o = e[1], p = e[2], $ = e[3];
  return n[0] = t * $ + i * y + s * p - a * o, n[1] = s * $ + i * o + a * y - t * p, n[2] = a * $ + i * p + t * o - s * y, n[3] = i * $ - t * y - s * o - a * p, n[4] = t * f + i * c + s * h - a * l + v * $ + d * y + M * p - m * o, n[5] = s * f + i * l + a * c - t * h + M * $ + d * o + m * y - v * p, n[6] = a * f + i * h + t * l - s * c + m * $ + d * p + v * o - M * y, n[7] = i * f - t * c - s * l - a * h + d * $ - v * y - M * o - m * p, n;
}
var Ii = N1;
function Ci(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n[6] = r[6] * e, n[7] = r[7] * e, n;
}
var X1 = Te;
function ji(n, r, e, t) {
  var s = 1 - t;
  return X1(r, e) < 0 && (t = -t), n[0] = r[0] * s + e[0] * t, n[1] = r[1] * s + e[1] * t, n[2] = r[2] * s + e[2] * t, n[3] = r[3] * s + e[3] * t, n[4] = r[4] * s + e[4] * t, n[5] = r[5] * s + e[5] * t, n[6] = r[6] * s + e[6] * t, n[7] = r[7] * s + e[7] * t, n;
}
function Ri(n, r) {
  var e = Me(r);
  return n[0] = -r[0] / e, n[1] = -r[1] / e, n[2] = -r[2] / e, n[3] = r[3] / e, n[4] = -r[4] / e, n[5] = -r[5] / e, n[6] = -r[6] / e, n[7] = r[7] / e, n;
}
function Fi(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n[2] = -r[2], n[3] = r[3], n[4] = -r[4], n[5] = -r[5], n[6] = -r[6], n[7] = r[7], n;
}
var _1 = Oe, Ei = _1, Me = Se, Li = Me;
function Yi(n, r) {
  var e = Me(r);
  if (e > 0) {
    e = Math.sqrt(e);
    var t = r[0] / e, s = r[1] / e, a = r[2] / e, i = r[3] / e, c = r[4], l = r[5], h = r[6], f = r[7], v = t * c + s * l + a * h + i * f;
    n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = (c - t * v) / e, n[5] = (l - s * v) / e, n[6] = (h - a * v) / e, n[7] = (f - i * v) / e;
  }
  return n;
}
function Bi(n) {
  return "quat2(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ")";
}
function Pi(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5] && n[6] === r[6] && n[7] === r[7];
}
function Zi(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = r[0], v = r[1], M = r[2], m = r[3], d = r[4], y = r[5], o = r[6], p = r[7];
  return Math.abs(e - f) <= C * Math.max(1, Math.abs(e), Math.abs(f)) && Math.abs(t - v) <= C * Math.max(1, Math.abs(t), Math.abs(v)) && Math.abs(s - M) <= C * Math.max(1, Math.abs(s), Math.abs(M)) && Math.abs(a - m) <= C * Math.max(1, Math.abs(a), Math.abs(m)) && Math.abs(i - d) <= C * Math.max(1, Math.abs(i), Math.abs(d)) && Math.abs(c - y) <= C * Math.max(1, Math.abs(c), Math.abs(y)) && Math.abs(l - o) <= C * Math.max(1, Math.abs(l), Math.abs(o)) && Math.abs(h - p) <= C * Math.max(1, Math.abs(h), Math.abs(p));
}
const Gi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Si,
  clone: li,
  conjugate: Fi,
  copy: k1,
  create: ci,
  dot: X1,
  equals: Zi,
  exactEquals: Pi,
  fromMat4: mi,
  fromRotation: Mi,
  fromRotationTranslation: V1,
  fromRotationTranslationValues: fi,
  fromTranslation: vi,
  fromValues: hi,
  getDual: pi,
  getReal: yi,
  getTranslation: wi,
  identity: oi,
  invert: Ri,
  len: Ei,
  length: _1,
  lerp: ji,
  mul: Ii,
  multiply: N1,
  normalize: Yi,
  rotateAroundAxis: Oi,
  rotateByQuatAppend: qi,
  rotateByQuatPrepend: Ti,
  rotateX: zi,
  rotateY: $i,
  rotateZ: bi,
  scale: Ci,
  set: di,
  setDual: Ai,
  setReal: xi,
  sqrLen: Li,
  squaredLength: Me,
  str: Bi,
  translate: gi
}, Symbol.toStringTag, { value: "Module" }));
function K1() {
  var n = new Z(2);
  return Z != Float32Array && (n[0] = 0, n[1] = 0), n;
}
function Di(n) {
  var r = new Z(2);
  return r[0] = n[0], r[1] = n[1], r;
}
function Wi(n, r) {
  var e = new Z(2);
  return e[0] = n, e[1] = r, e;
}
function Ui(n, r) {
  return n[0] = r[0], n[1] = r[1], n;
}
function Vi(n, r, e) {
  return n[0] = r, n[1] = e, n;
}
function ki(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n;
}
function Q1(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n;
}
function H1(n, r, e) {
  return n[0] = r[0] * e[0], n[1] = r[1] * e[1], n;
}
function J1(n, r, e) {
  return n[0] = r[0] / e[0], n[1] = r[1] / e[1], n;
}
function Ni(n, r) {
  return n[0] = Math.ceil(r[0]), n[1] = Math.ceil(r[1]), n;
}
function Xi(n, r) {
  return n[0] = Math.floor(r[0]), n[1] = Math.floor(r[1]), n;
}
function _i(n, r, e) {
  return n[0] = Math.min(r[0], e[0]), n[1] = Math.min(r[1], e[1]), n;
}
function Ki(n, r, e) {
  return n[0] = Math.max(r[0], e[0]), n[1] = Math.max(r[1], e[1]), n;
}
function Qi(n, r) {
  return n[0] = Sr(r[0]), n[1] = Sr(r[1]), n;
}
function Hi(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n;
}
function Ji(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n;
}
function u1(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1];
  return Math.sqrt(e * e + t * t);
}
function nt(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1];
  return e * e + t * t;
}
function rt(n) {
  var r = n[0], e = n[1];
  return Math.sqrt(r * r + e * e);
}
function et(n) {
  var r = n[0], e = n[1];
  return r * r + e * e;
}
function ui(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n;
}
function nc(n, r) {
  return n[0] = 1 / r[0], n[1] = 1 / r[1], n;
}
function rc(n, r) {
  var e = r[0], t = r[1], s = e * e + t * t;
  return s > 0 && (s = 1 / Math.sqrt(s)), n[0] = r[0] * s, n[1] = r[1] * s, n;
}
function ec(n, r) {
  return n[0] * r[0] + n[1] * r[1];
}
function tc(n, r, e) {
  var t = r[0] * e[1] - r[1] * e[0];
  return n[0] = n[1] = 0, n[2] = t, n;
}
function sc(n, r, e, t) {
  var s = r[0], a = r[1];
  return n[0] = s + t * (e[0] - s), n[1] = a + t * (e[1] - a), n;
}
function ac(n, r) {
  r = r === void 0 ? 1 : r;
  var e = zr() * 2 * Math.PI;
  return n[0] = Math.cos(e) * r, n[1] = Math.sin(e) * r, n;
}
function ic(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[2] * s, n[1] = e[1] * t + e[3] * s, n;
}
function cc(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[2] * s + e[4], n[1] = e[1] * t + e[3] * s + e[5], n;
}
function lc(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[3] * s + e[6], n[1] = e[1] * t + e[4] * s + e[7], n;
}
function hc(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[4] * s + e[12], n[1] = e[1] * t + e[5] * s + e[13], n;
}
function fc(n, r, e, t) {
  var s = r[0] - e[0], a = r[1] - e[1], i = Math.sin(t), c = Math.cos(t);
  return n[0] = s * c - a * i + e[0], n[1] = s * i + a * c + e[1], n;
}
function vc(n, r) {
  var e = n[0], t = n[1], s = r[0], a = r[1];
  return Math.abs(Math.atan2(t * s - e * a, e * s + t * a));
}
function Mc(n, r) {
  var e = n[0], t = n[1], s = r[0], a = r[1];
  return Math.atan2(e * a - t * s, e * s + t * a);
}
function mc(n) {
  return n[0] = 0, n[1] = 0, n;
}
function oc(n) {
  return "vec2(" + n[0] + ", " + n[1] + ")";
}
function dc(n, r) {
  return n[0] === r[0] && n[1] === r[1];
}
function yc(n, r) {
  var e = n[0], t = n[1], s = r[0], a = r[1];
  return Math.abs(e - s) <= C * Math.max(1, Math.abs(e), Math.abs(s)) && Math.abs(t - a) <= C * Math.max(1, Math.abs(t), Math.abs(a));
}
var pc = rt, xc = Q1, Ac = H1, wc = J1, gc = u1, zc = nt, $c = et, bc = (function() {
  var n = K1();
  return function(r, e, t, s, a, i) {
    var c, l;
    for (e || (e = 2), t || (t = 0), s ? l = Math.min(s * e + t, r.length) : l = r.length, c = t; c < l; c += e)
      n[0] = r[c], n[1] = r[c + 1], a(n, n, i), r[c] = n[0], r[c + 1] = n[1];
    return r;
  };
})();
const qc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: ki,
  angle: vc,
  ceil: Ni,
  clone: Di,
  copy: Ui,
  create: K1,
  cross: tc,
  dist: gc,
  distance: u1,
  div: wc,
  divide: J1,
  dot: ec,
  equals: yc,
  exactEquals: dc,
  floor: Xi,
  forEach: bc,
  fromValues: Wi,
  inverse: nc,
  len: pc,
  length: rt,
  lerp: sc,
  max: Ki,
  min: _i,
  mul: Ac,
  multiply: H1,
  negate: ui,
  normalize: rc,
  random: ac,
  rotate: fc,
  round: Qi,
  scale: Hi,
  scaleAndAdd: Ji,
  set: Vi,
  signedAngle: Mc,
  sqrDist: zc,
  sqrLen: $c,
  squaredDistance: nt,
  squaredLength: et,
  str: oc,
  sub: xc,
  subtract: Q1,
  transformMat2: ic,
  transformMat2d: cc,
  transformMat3: lc,
  transformMat4: hc,
  zero: mc
}, Symbol.toStringTag, { value: "Module" })), Tc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: wt,
  mat2: kt,
  mat2d: d0,
  mat3: k0,
  mat4: h1,
  quat: ii,
  quat2: Gi,
  vec2: qc,
  vec3: Ma,
  vec4: Ya
}, Symbol.toStringTag, { value: "Module" })), me = fe;
function oe() {
  J.call(this), this.events = {
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
  ]), this.worldMatrix = new Float32Array([
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
}
var nn = oe.prototype = Object.create(J.prototype), ar = new Float32Array([0, 0, 0]), lr = new Float32Array(16);
nn.constructor = oe;
nn.local = null;
nn.worldMatrix = null;
nn.worldToLocal = null;
nn.children = null;
nn.parent = null;
nn.dirtyW = !0;
nn.dirtyL = !0;
nn.onParentUpdate = null;
nn.addChild = function(n) {
  this.children[this.children.length] = n, n.setParent(this);
};
nn.removeChild = function(n) {
  this.children.splice(this.children.indexOf(n), 1), n.removeParent();
};
nn.setParent = function(n) {
  this.parent = n, n.gameObject.world !== null && n.gameObject.world.addGameObject(this.gameObject);
};
nn.setGameObject = function(n) {
  J.prototype.setGameObject.call(this, n), n.transform = this;
};
nn.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
nn.removeParent = function() {
  this.parent = null;
};
nn.translate = function(n, r, e, t) {
  ar[0] = n, ar[1] = r, ar[2] = e, t === "world" ? (we(lr), pe(lr, lr, ar), me(this.local, lr, this.local)) : pe(this.local, this.local, ar);
};
nn.rotate = function(n, r, e, t) {
  var s = Math.PI / 180, a = h1;
  t === "world" ? (a.identity(lr), a.rotateZ(lr, lr, e * s), a.rotateY(lr, lr, r * s), a.rotateX(lr, lr, n * s), me(this.local, lr, this.local)) : (a.rotateZ(this.local, this.local, e * s), a.rotateY(this.local, this.local, r * s), a.rotateX(this.local, this.local, n * s));
};
nn.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.worldMatrix.set(this.local) : me(this.worldMatrix, this.parent.getLocalToWorld(), this.local)), this.worldMatrix;
};
nn.getWorldToLocal = function() {
  return this.dirtyW === !0 && Je(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
};
nn.getPosition = function(n) {
  n === void 0 && (n = []);
  var r = this.getLocalToWorld();
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
};
nn.getLocalPosition = function(n) {
  n === void 0 && (n = []);
  var r = this.local;
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
};
nn.getRotation = function() {
  throw "TransformComponent.getRotation not implemented yet";
};
nn.getLocalRotation = function() {
  throw "TransformComponent.getLocalRotation not implemented yet";
};
nn.setPosition = function(n, r, e) {
  ar[0] = n, ar[1] = r, ar[2] = e, this.parent !== null && x1(ar, ar, this.parent.getWorldToLocal()), this.local[12] = ar[0], this.local[13] = ar[1], this.local[14] = ar[2];
};
nn.setLocalPosition = function(n, r, e) {
  this.local[12] = n, this.local[13] = r, this.local[14] = e;
};
nn.scale = function(n, r, e) {
  n1(this.local, this.local, [n, r, e]);
};
nn.updateWorldMatrix = function(n = !1) {
  this.parent === null ? this.worldMatrix.set(this.local) : (n && this.parent.updateWorldMatrix(n), me(this.worldMatrix, this.parent.worldMatrix, this.local));
};
function Kn(n) {
  this.instanceId = Kn.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new oe()), this.name = n || "gameObject";
}
var hr = Kn.prototype;
hr.instanceId = 0;
hr.name = null;
hr.layer = 0;
hr.scene = null;
hr.world = null;
hr.transform = null;
hr.components = null;
hr.componentsCount = 0;
hr.setScene = function(n) {
  this.scene = n;
};
hr.addComponent = function(n) {
  return this.components[this.componentsCount++] = n, n.setGameObject(this), n;
};
hr.removeComponent = function(n) {
  n.unsetGameObject();
};
hr.getComponent = function(n) {
  for (var r = 0; r < this.components.length; r++) {
    var e = this.components[r];
    if (e instanceof n)
      return e;
  }
  return null;
};
const tt = {
  NONE: "NONE",
  RADIAL: "RADIAL",
  RADIAL_FAST: "RADIAL_FAST",
  LINEAR: "LINEAR"
};
function N(n) {
  J.call(this), this.transform = n, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ];
}
N.prototype = Object.create(J.prototype);
N.prototype.constructor = N;
N.prototype.frustumSize = null;
N.prototype.projectionMatrix = null;
N.prototype.clipSpaceMatrix = null;
N.prototype.nearClippingPane = 0;
N.prototype.farClippingPane = 1e3;
N.prototype.fogType = tt.LINEAR;
N.prototype.fogNearPane = 250;
N.prototype.fogFarPane = 750;
N.prototype.fogColor = new Uint8Array([150, 150, 150]);
N.prototype.ambientLight = 0.5;
N.prototype.setup = function(n, r) {
  this.frustumSize = [
    [-n / 2, -r / 2, 0],
    [n / 2, r / 2, length]
  ], c1(this.projectionMatrix, -n / 2, n / 2, -r / 2, r / 2, this.nearClippingPane, this.farClippingPane);
};
N.prototype.setGameObject = function(n) {
  J.prototype.setGameObject.call(this, n), n.camera = this;
};
N.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, J.prototype.unsetGameObject.call(this);
};
N.prototype.getClipSpaceMatrix = function() {
  const n = this.transform.getWorldToLocal();
  return fe(this.clipSpaceMatrix, this.projectionMatrix, n), this.clipSpaceMatrix;
};
N.FogType = tt;
function st(n) {
  Kn.call(this, n || "camera"), this.addComponent(new N(this.transform));
}
st.prototype = Object.create(Kn.prototype);
function $n() {
  J.call(this), this.colors = new Uint8Array([0, 0, 255]), this.faceColors = new Uint32Array([0]);
}
var Fn = $n.prototype = Object.create(J.prototype);
Fn.constructor = $n;
Fn.layer = 0;
Fn.vertices = null;
Fn.faces = null;
Fn.pivot = [0, 0, 0];
Fn.color = null;
Fn.colors = null;
Fn.uvs = null;
Fn._texture = null;
Fn.textureImage = null;
Object.defineProperty(Fn, "texture", {
  get: function() {
    return this._texture;
  },
  set: function(n) {
    this._texture !== n && (this._texture = n, n ? (this.textureImage || (this.textureImage = new Image()), this.textureImage.src = n) : this.textureImage = null);
  }
});
Fn.faceColors = null;
Fn.faceNormals = null;
Fn.vertexNormals = null;
Fn.bounds = null;
Fn.updateNormals = function(n = 1) {
  const r = this.faces, e = this.vertices, t = r.length;
  (!this.faceNormals || this.faceNormals.length !== t) && (this.faceNormals = new Float32Array(t)), !this.vertexNormals || this.vertexNormals.length !== e.length ? this.vertexNormals = new Float32Array(e.length) : this.vertexNormals.fill(0);
  for (let s = 0; s < t; s += 3) {
    const a = r[s] * 3, i = r[s + 1] * 3, c = r[s + 2] * 3, l = e[i] - e[a], h = e[i + 1] - e[a + 1], f = e[i + 2] - e[a + 2], v = e[c] - e[a], M = e[c + 1] - e[a + 1], m = e[c + 2] - e[a + 2];
    let d = (h * m - f * M) * n, y = (f * v - l * m) * n, o = (l * M - h * v) * n;
    const p = Math.sqrt(d * d + y * y + o * o);
    if (p > 1e-10) {
      const $ = 1 / p;
      this.faceNormals[s] = d * $, this.faceNormals[s + 1] = y * $, this.faceNormals[s + 2] = o * $, this.vertexNormals[a] += d, this.vertexNormals[a + 1] += y, this.vertexNormals[a + 2] += o, this.vertexNormals[i] += d, this.vertexNormals[i + 1] += y, this.vertexNormals[i + 2] += o, this.vertexNormals[c] += d, this.vertexNormals[c + 1] += y, this.vertexNormals[c + 2] += o;
    }
  }
  for (let s = 0; s < this.vertexNormals.length; s += 3) {
    const a = this.vertexNormals[s], i = this.vertexNormals[s + 1], c = this.vertexNormals[s + 2], l = Math.sqrt(a * a + i * i + c * c);
    if (l > 1e-10) {
      const h = 1 / l;
      this.vertexNormals[s] *= h, this.vertexNormals[s + 1] *= h, this.vertexNormals[s + 2] *= h;
    } else
      this.vertexNormals[s + 1] = 1;
  }
};
Fn.setGameObject = function(n) {
  J.prototype.setGameObject.call(this, n), n.meshRenderer = this;
};
Fn.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, J.prototype.unsetGameObject.call(this);
};
$n.computeNormalMatrix = function(n, r) {
  const e = r[0], t = r[1], s = r[2], a = r[4], i = r[5], c = r[6], l = r[8], h = r[9], f = r[10], v = i * f - c * h, M = -(a * f - c * l), m = a * h - i * l, d = e * v + t * M + s * m;
  if (Math.abs(d) < 1e-6) return null;
  const y = 1 / d;
  n[0] = v * y, n[1] = M * y, n[2] = m * y, n[3] = -(t * f - s * h) * y, n[4] = (e * f - s * l) * y, n[5] = -(e * h - t * l) * y, n[6] = (t * c - s * i) * y, n[7] = -(e * c - s * a) * y, n[8] = (e * i - t * a) * y;
};
$n.computeBoundsFlatArray = function(n, r, e) {
  if (e.length !== 0) {
    for (var t = e[0], s = t, a = e[1], i = a, c = e[2], l = c, h = 3; h < e.length; h += 3) {
      var f = e[h], v = e[h + 1], M = e[h + 2];
      f < t ? t = f : f > s && (s = f), v < a ? a = v : v > i && (i = v), M < c ? c = M : M > l && (l = M);
    }
    return n[r] = t, n[r + 1] = a, n[r + 2] = c, n[r + 3] = s, n[r + 4] = a, n[r + 5] = c, n[r + 6] = t, n[r + 7] = i, n[r + 8] = c, n[r + 9] = s, n[r + 10] = i, n[r + 11] = c, n[r + 12] = t, n[r + 13] = a, n[r + 14] = l, n[r + 15] = s, n[r + 16] = a, n[r + 17] = l, n[r + 18] = t, n[r + 19] = i, n[r + 20] = l, n[r + 21] = s, n[r + 22] = i, n[r + 23] = l, n;
  }
};
$n.computeBoundingSphere = function(n, r, e) {
  let t = 1 / 0, s = 1 / 0, a = 1 / 0, i = -1 / 0, c = -1 / 0, l = -1 / 0;
  for (let o = 0; o < e.length; o += 3) {
    const p = e[o], $ = e[o + 1], z = e[o + 2];
    p < t && (t = p), p > i && (i = p), $ < s && (s = $), $ > c && (c = $), z < a && (a = z), z > l && (l = z);
  }
  const h = (t + i) * 0.5, f = (s + c) * 0.5, v = (a + l) * 0.5, M = i - h, m = c - f, d = l - v, y = Math.sqrt(M * M + m * m + d * d);
  n[r] = h, n[r + 1] = f, n[r + 2] = v, n[r + 3] = y;
};
function Ce(n) {
  J.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var jr = Ce.prototype = Object.create(J.prototype);
jr.constructor = Ce;
jr.sprite = null;
jr.pivotX = 0;
jr.pivotY = 0;
jr.layer = 0;
jr.setGameObject = function(n) {
  J.prototype.setGameObject.call(this, n), n.spriteRenderer = this;
};
jr.setSprite = function(n) {
  return this.sprite = n, this.enabled = !0, this;
};
jr.setPivot = function(n, r) {
  return this.pivotX = n, this.pivotY = r, this;
};
jr.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, J.prototype.unsetGameObject.call(this);
};
function je() {
  J.call(this), this.points = [];
}
var Zr = je.prototype = Object.create(J.prototype);
Zr.constructor = je;
Zr.points = null;
Zr.color = "white";
Zr.width = 1;
Zr.layer = 0;
Zr.setGameObject = function(n) {
  J.prototype.setGameObject.call(this, n), n.pathRenderer = this;
};
Zr.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, J.prototype.unsetGameObject.call(this);
};
function Re() {
  J.call(this);
}
var Rr = Re.prototype = Object.create(J.prototype);
Rr.constructor = Re;
Rr.text = "sample text";
Rr.color = "white";
Rr.style = "normal 12px arial";
Rr.layer = 0;
Rr.align = "center";
Rr.valign = "middle";
Rr.setGameObject = function(n) {
  J.prototype.setGameObject.call(this, n), n.textRenderer = this;
};
Rr.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, J.prototype.unsetGameObject.call(this);
};
function Oc(n, r, e) {
  const t = [], s = [], a = n / 2, i = r / 2, c = n / e, l = r / e;
  for (let f = 0; f <= e; f++) {
    const v = f * l - i;
    for (let M = 0; M <= e; M++) {
      const m = M * c - a;
      t.push(m, 0, v);
    }
  }
  const h = e + 1;
  for (let f = 0; f < e; f++)
    for (let v = 0; v < e; v++) {
      const M = f * h + v, m = f * h + (v + 1), d = (f + 1) * h + v, y = (f + 1) * h + (v + 1);
      s.push(M, d, m), s.push(y, m, d);
    }
  return {
    vertices: new Float32Array(t),
    faces: new Uint16Array(s)
  };
}
const se = Oc(1, 1, 1), Fe = new Float32Array(32);
$n.computeBoundsFlatArray(Fe, 0, se.vertices);
$n.computeBoundingSphere(Fe, 28, se.vertices);
function at() {
  Kn.call(this);
  const n = new $n();
  n.faces = se.faces, n.vertices = se.vertices, n.bounds = Fe, n.updateNormals(), this.addComponent(n);
}
at.prototype = Object.create(Kn.prototype);
const Sc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAWdSURBVHhe7d3BalVXFMfhnUolEpGKYJRAY1EQWsGh4CP4CvdZS6d10I5UEAxNhFAjiEUMiYaSDkone5DtWTaH+7/5vuECIee4f5zJXty1xWJxurb7e5vqztbtfgR8pV9+e9GPzvRNPwByCBiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCrS0Wi9MfTv7s50PPd173o3Pz8ehzPxq6euVyP1oqG+vf9qOlcnh80o9Wwvr69HNxfDz9/FXtHbzvR2fyBYZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgs28jVbZwDt4f9qOh6jZS5e+rWNVtn8r7m/NdVLaRLrXTfjRUfSbbSHCBCBiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCCRiClZcZdven/5uqP95Mu+D9NY4+1S6hk+HJ44f9aKhy1i0zAEMChmAChmAChmAChmAChmAChmAChmAChmAChmAChmAChmCzLzNULnm//etjPxq6+d3VfvRFKr8scGfrdj8aevrsVT9iBo8e3OtHQ5WzXjnnzTIDXCwChmAChmAChmAChmAChmAChmAChmAChmAChmAChmAChmAChmAR20hTNzRaa21783o/OjdzbTC11trO/pt+xAR3t271o6HnO6/70bmZetZ9gSGYgCGYgCGYgCGYgCGYgCGYgCGYgCGYgCGYgCGYgCGYgCHYyi4zVP24fbMfDVWeqeqnu9/3o6E5L+Mvu2V/f1PPui8wBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBFvZZYYb1zb60Rd59+GwHw2t4gLE02ev+tFKePTgXj8aqiwzVH6to7XWXuy97Udn8gWGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYOVtpMqGRlVlG+n+9mY/Ojcv9w760VBlg6mqsvlU2WBqrbWd/Tf9aKnc3brVj4YqZ902EjAkYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAg2+zJD5ZL31AverbW2vXm9Hy2VyoJGKz5X5Z1XFiBacQmiepYqlv3vm3oufIEhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAh2MouM9y4ttGPVsK7D4f9aKiyADGnyoLB02ev+tEXefTgXj8a2t2f3kd1GcQyA1wgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZg5W2kyoZGK25pTN3QaK21+9ub/ejCerl30I+GqhtMlW2zypmobDBVVc565Zla4az7AkMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUOw8jLDsv+0SvUyPv+aeqn+P5X3XjkT1WWByhJEZZmhaupZ9wWGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYOVlhmW+4N1aazeubfQjZvDuw2E/GqosQFRZZgCWhoAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhWHkbadl/WuXJ44f9CEoqZ71yzlvhrPsCQzABQzABQzABQzABQzABQzABQzABQzABQzABQzABQzABQ7DZlxkqPh597kdDV69c7kfnpnJx/fD4pB8tlcozVc35LtbXp5+L4+Pp569q7+B9PzqTLzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEs8zQmfMS/1zmXBaYS/X/6e+21o+GLrXTfjRUfeeWGeACETAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEW1ssFqe7v/7cz4eOPtW2LYD/jy8wBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBPsHOi10s5+cpw4AAAAASUVORK5CYII=";
function Ic(n, r, e, t) {
  const s = [], a = [], i = [];
  function c(h, f, v, M, m, d) {
    const y = `${h.toFixed(5)},${f.toFixed(5)},${v.toFixed(5)}`;
    if (d[y] !== void 0) return d[y];
    const o = s.length / 3;
    return s.push(h, f, v), a.push(M, m), d[y] = o, o;
  }
  function l(h, f, v, M, m, d, y, o, p, $) {
    const z = {}, x = y / $, g = o / $, A = y / 2, F = o / 2, E = p / 2 * d, b = [];
    for (let w = 0; w <= $; w++) {
      const I = [], O = w * g - F;
      for (let q = 0; q <= $; q++) {
        const T = q * x - A, j = [0, 0, 0];
        j[h] = T * M, j[f] = O * m, j[v] = E;
        const K = q / $, k = 1 - w / $;
        I.push(c(j[0], j[1], j[2], K, k, z));
      }
      b.push(I);
    }
    for (let w = 0; w < $; w++)
      for (let I = 0; I < $; I++) {
        const O = b[w][I], q = b[w + 1][I], T = b[w + 1][I + 1], j = b[w][I + 1];
        i.push(O, j, q), i.push(q, j, T);
      }
  }
  return l(0, 1, 2, 1, 1, 1, n, r, e, t), l(0, 1, 2, -1, 1, -1, n, r, e, t), l(2, 1, 0, -1, 1, 1, e, r, n, t), l(2, 1, 0, 1, 1, -1, e, r, n, t), l(0, 2, 1, 1, -1, 1, n, e, r, t), l(0, 2, 1, 1, 1, -1, n, e, r, t), {
    vertices: new Float32Array(s),
    uvs: new Float32Array(a),
    faces: new Uint16Array(i)
  };
}
const ur = Ic(1, 1, 1, 1), Ee = new Float32Array(32);
$n.computeBoundsFlatArray(Ee, 0, ur.vertices);
$n.computeBoundingSphere(Ee, 28, ur.vertices);
function it() {
  Kn.call(this);
  const n = new $n();
  n.vertices = ur.vertices, n.uvs = ur.uvs, n.faces = ur.faces, n.bounds = Ee, n.updateNormals(), n.texture = Sc, this.addComponent(n);
}
it.prototype = Object.create(Kn.prototype);
function Cc(n, r, e) {
  const t = [], s = [];
  t.push(0, e, 0), t.push(0, 0, 0);
  for (let a = 0; a < n; a++) {
    const i = a / n * Math.PI * 2, c = Math.cos(i) * r, l = Math.sin(i) * r;
    t.push(c, 0, l);
  }
  for (let a = 0; a < n; a++) {
    const i = a + 2, c = a === n - 1 ? 2 : a + 3;
    s.push(0, c, i), s.push(1, i, c);
  }
  return {
    vertices: new Float32Array(t),
    faces: new Uint16Array(s)
  };
}
const ae = Cc(7, 0.5, 1), Le = new Float32Array(32);
$n.computeBoundsFlatArray(Le, 0, ae.vertices);
$n.computeBoundingSphere(Le, 28, ae.vertices);
function ct() {
  Kn.call(this);
  const n = new $n();
  n.vertices = ae.vertices, n.faces = ae.faces, n.bounds = Le, n.updateNormals(), this.addComponent(n);
}
ct.prototype = Object.create(Kn.prototype);
function jc(n, r, e) {
  const t = [], s = [], a = {};
  function i(l, h, f) {
    const v = `${l.toFixed(5)},${h.toFixed(5)},${f.toFixed(5)}`;
    if (a[v] !== void 0) return a[v];
    const M = t.length / 3;
    return t.push(l, h, f), a[v] = M, M;
  }
  const c = [];
  for (let l = 0; l <= n; l++) {
    const h = [], f = l * Math.PI / n, v = Math.sin(f), M = Math.cos(f);
    for (let m = 0; m <= r; m++) {
      const d = m * 2 * Math.PI / r, y = Math.cos(d) * v * e, o = M * e, p = Math.sin(d) * v * e;
      h.push(i(y, o, p));
    }
    c.push(h);
  }
  for (let l = 0; l < n; l++)
    for (let h = 0; h < r; h++) {
      const f = c[l][h], v = c[l][h + 1], M = c[l + 1][h], m = c[l + 1][h + 1];
      l !== 0 && s.push(f, v, M), l !== n - 1 && s.push(M, v, m);
    }
  return {
    vertices: new Float32Array(t),
    faces: new Uint16Array(s)
  };
}
const ie = jc(8, 8, 8), Ye = new Float32Array(32);
$n.computeBoundsFlatArray(Ye, 0, ie.vertices);
$n.computeBoundingSphere(Ye, 28, ie.vertices);
function lt() {
  Kn.call(this);
  const n = new $n();
  n.vertices = ie.vertices, n.faces = ie.faces, n.bounds = Ye, n.updateNormals(), this.addComponent(n);
}
lt.prototype = Object.create(Kn.prototype);
function Rc() {
  const n = new Array(65536);
  for (let r = 0; r < 65536; r++) {
    const e = r >> 11 & 31, t = r >> 5 & 63, s = r & 31, a = e << 3 | e >> 2, i = t << 2 | t >> 4, c = s << 3 | s >> 2;
    n[r] = "rgb(" + a + "," + i + "," + c + ")";
  }
  return n;
}
const Be = mt;
function Fc(n, r, e, t) {
  var s = n.transform.getLocalToWorld(), a = s[12], i = s[13], c = s[14];
  Be(
    t,
    0,
    a,
    i,
    c,
    e
  );
  for (var l = t[0], h = t[1], f = 50, v = [
    { x: s[0], y: s[1], z: s[2], col: "#ff0000" },
    // X
    { x: s[4], y: s[5], z: s[6], col: "#00ff00" },
    // Y
    { x: s[8], y: s[9], z: s[10], col: "#0000ff" }
    // Z
  ], M = 0; M < 3; M++) {
    var m = v[M], d = Math.sqrt(m.x * m.x + m.y * m.y + m.z * m.z);
    d < 1e-4 && (M === 0 ? m.x = 1 : M === 1 ? m.y = 1 : m.z = 1, d = 1);
    var y = m.x / d, o = m.y / d, p = m.z / d;
    Be(
      t,
      0,
      a + y * f,
      i + o * f,
      c + p * f,
      e
    ), r.beginPath(), r.lineWidth = 2, r.strokeStyle = m.col, r.moveTo(l, h), r.lineTo(t[0], t[1]), r.stroke();
  }
}
const Ec = $n.computeNormalMatrix, ye = Mt, Pe = fe, Lc = Fc, Or = Rc();
function ht() {
  this.layerBuffers = [], this.drawCalls = 0, this.faces = 0, this.lightDirection = new Float32Array([0, 0, 0]), this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.colorBuffer = new Uint32Array(0), this.shaderTypeBuffer = new Uint32Array(0), this.faceNormalsBuffer = new Float32Array(0), this.vertexNormalsBuffer = new Float32Array(0), this.meshIndexBuffer = new Uint32Array(0), this.meshFaceIndexBuffer = new Uint32Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.lightsIndexBuffer = new Uint32Array(10), this.layerBuffers = [], this.layerBufferLengths = new Uint32Array(1), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0);
  for (let n = 0; n < Nr.layersCount; n++)
    this.layerBuffers[n] = this.layerBuffers[n] || [];
  this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0);
}
var Gr = ht.prototype;
Gr.vec3Cache1 = new Float32Array([0, 0, 0]);
Gr.vec3Cache2 = new Float32Array([0, 0, 0]);
Gr.vec4Cache = new Float32Array([0, 0, 0]);
Gr.mat4Scratchpad1 = new Float32Array(16);
Gr.mat4Scratchpad2 = new Float32Array(16);
Gr.mat3Scratchpad1 = new Float32Array(9);
Gr.render = function(n, r, e) {
  let t = Date.now(), s = n.scene.retrieve(), a = Nr.layersCount, i = r.width, c = r.height, l, h, f, v, M, m, d = this.vec3Cache1, y = this.vec3Cache2, o = this.vec4Cache, p = this.depthBuffer, $ = this.indexBuffer, z = this.vertexIndexBuffer, x = this.vertexBuffer, g = this.clipGeometryBuffer, A = this.colorBuffer, F = this.shaderTypeBuffer, E = this.faceNormalsBuffer, b = this.vertexNormalsBuffer, w = this.meshIndexBuffer, I = this.meshFaceIndexBuffer, O = this.visibleObjectsBuffer, q = this.lightsIndexBuffer, T = this.layerBuffers, j = this.layerBufferLengths, K = this.mat4Scratchpad1, k = this.mat4Scratchpad2, R = r.getWorldToScreen(), tn = n.transform.getWorldToLocal(), hn = n.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let mn = 0, fn = 0;
  const H = n.camera, X = n.camera.fogType !== N.FogType.NONE ? H.fogColor : H.bgColor, An = X[0] & 248, In = X[1] & 252, on = X[2] & 248, _ = An << 8 | In << 3 | on >> 3;
  if (r.context.fillStyle = Or[_], r.context.fillRect(0, 0, r.width, r.height), O.length < s.length) {
    const D = O;
    this.visibleObjectsBuffer = O = new Uint32Array(
      s.length
    ), O.set(D);
  }
  if (q.length < s.length) {
    const D = q;
    this.lightsIndexBuffer = q = new Uint32Array(
      s.length
    ), q.set(D);
  }
  if (Yc(
    s,
    hn,
    O,
    q
  ), Bc(O, s, hn), j.length < a) {
    var kn = j;
    this.layerBufferLengths = j = new Uint32Array(a), j.set(kn);
  }
  const G = O[0] + 1;
  for (v = 1; v < G; v++) {
    const D = s[O[v]];
    if (D.meshRenderer) {
      const rn = D.meshRenderer, sn = rn.layer;
      T[sn][j[sn]++] = rn;
    }
  }
  for (v = 0; v < a; v++) {
    m = r.layers[v], h = T[v], f = j[v];
    let D = 0, rn = 0;
    for (let L = 0; L < f; L++) {
      D += h[L].faces.length;
      const Q = h[L].vertices.length;
      Q > rn && (rn = Q);
    }
    D = D / 3 | 0;
    const sn = rn / 3 | 0;
    if (this.vMapping.length < sn && (this.vMapping = new Int32Array(sn), this.vTags = new Uint32Array(sn)), d.length < rn && (this.vec3Cache1 = d = new Float32Array(rn), this.vec3Cache2 = y = new Float32Array(rn), this.vec4Cache = o = new Float32Array(rn * 4 / 3)), p.length < D) {
      let L = new Float32Array(D);
      L.set(p), this.depthBuffer = p = L, L = new Uint32Array(D), L.set($), this.indexBuffer = $ = L, L = new Uint32Array(D), L.set(A), this.colorBuffer = A = L, L = new Uint32Array(D), L.set(F), this.shaderTypeBuffer = F = L, L = new Float32Array(D * 9), L.set(g), this.clipGeometryBuffer = g = L, L = new Float32Array(D * 3), L.set(E), this.faceNormalsBuffer = E = L, L = new Float32Array(D * 9), L.set(b), this.vertexNormalsBuffer = b = L, L = new Uint32Array(D), L.set(w), this.meshIndexBuffer = w = L, L = new Uint32Array(D), L.set(I), this.meshFaceIndexBuffer = I = L;
      let Q = new Float32Array(D * 6);
      Q.set(x), this.vertexBuffer = x = Q;
      let Dn = new Uint32Array(D * 3);
      Dn.set(z), this.vertexIndexBuffer = z = Dn;
    }
    const S = Pc(
      h,
      f,
      y,
      o,
      $,
      p,
      A,
      F,
      g,
      tn,
      hn,
      k,
      K,
      this.mat3Scratchpad1,
      E,
      b,
      x,
      z,
      w,
      I,
      this.vMapping,
      this.vTags
    );
    (Nr.depthSortingMask & v + 1) === v + 1 && $.subarray(0, S).sort(function(L, Q) {
      return p[Q] - p[L];
    });
    const dn = (Nr.layerClearMask & v + 1) === v + 1;
    for (Zc(
      m,
      x,
      z,
      $,
      A,
      F,
      S,
      0,
      dn,
      i,
      c,
      g,
      p,
      n.camera.fogType,
      n.camera.fogColor,
      n.camera.fogNearPane,
      n.camera.fogFarPane,
      n.scene,
      this.lightDirection,
      n.camera.ambientLight,
      E,
      b,
      w,
      I,
      h,
      this.wireframe,
      q,
      s
    ), M = 0; M < f; M++)
      l = h[M], l.gameObject && l.gameObject.debug && Lc(l.gameObject, m, R, d);
    r.context.drawImage(m.canvas, 0, 0), mn += S, fn += S, j[v] = 0;
  }
  e.totalObjects = s.length, e.visibleObjects = G, e.drawCalls = mn, e.faces = fn, e.dt = Date.now() - t;
};
function Yc(n, r, e, t) {
  let s = 0, a = 0;
  const i = r[0], c = r[1], l = r[2], h = r[3], f = r[4], v = r[5], M = r[6], m = r[7], d = r[8], y = r[9], o = r[10], p = r[11], $ = r[12], z = r[13], x = r[14], g = r[15];
  let A = h + i, F = m + f, E = p + d, b = g + $, w = 1 / Math.sqrt(A * A + F * F + E * E);
  A *= w, F *= w, E *= w, b *= w;
  let I = h - i, O = m - f, q = p - d, T = g - $;
  w = 1 / Math.sqrt(I * I + O * O + q * q), I *= w, O *= w, q *= w, T *= w;
  let j = h + c, K = m + v, k = p + y, R = g + z;
  w = 1 / Math.sqrt(j * j + K * K + k * k), j *= w, K *= w, k *= w, R *= w;
  let tn = h - c, hn = m - v, mn = p - y, fn = g - z;
  w = 1 / Math.sqrt(tn * tn + hn * hn + mn * mn), tn *= w, hn *= w, mn *= w, fn *= w;
  let H = h + l, X = m + M, An = p + o, In = g + x;
  w = 1 / Math.sqrt(H * H + X * X + An * An), H *= w, X *= w, An *= w, In *= w;
  let on = h - l, _ = m - M, kn = p - o, G = g - x;
  w = 1 / Math.sqrt(on * on + _ * _ + kn * kn), on *= w, _ *= w, kn *= w, G *= w;
  const D = n.length;
  for (let rn = 0; rn < D; rn++) {
    const sn = n[rn];
    if (sn.meshRenderer && sn.meshRenderer.enabled) {
      const S = sn.transform.worldMatrix, dn = sn.meshRenderer.bounds, L = dn[28], Q = dn[29], Dn = dn[30], Wn = S[0] * L + S[4] * Q + S[8] * Dn + S[12], En = S[1] * L + S[5] * Q + S[9] * Dn + S[13], bn = S[2] * L + S[6] * Q + S[10] * Dn + S[14], Nn = S[0] * S[0] + S[1] * S[1] + S[2] * S[2], Xn = S[4] * S[4] + S[5] * S[5] + S[6] * S[6], Cn = S[8] * S[8] + S[9] * S[9] + S[10] * S[10], cn = dn[31] * Math.sqrt(Math.max(Nn, Xn, Cn));
      if (A * Wn + F * En + E * bn + b < -cn || I * Wn + O * En + q * bn + T < -cn || j * Wn + K * En + k * bn + R < -cn || tn * Wn + hn * En + mn * bn + fn < -cn || H * Wn + X * En + An * bn + In < -cn || on * Wn + _ * En + kn * bn + G < -cn) continue;
      e[++s] = rn;
    }
    if (sn.light)
      if (sn.light.type === 1) {
        const S = sn.transform.worldMatrix, dn = S[12], L = S[13], Q = S[14], Dn = S[0] * S[0] + S[1] * S[1] + S[2] * S[2], Wn = S[4] * S[4] + S[5] * S[5] + S[6] * S[6], En = S[8] * S[8] + S[9] * S[9] + S[10] * S[10], bn = sn.light.range * Math.sqrt(Math.max(Dn, Wn, En));
        if (A * dn + F * L + E * Q + b < -bn || I * dn + O * L + q * Q + T < -bn || j * dn + K * L + k * Q + R < -bn || tn * dn + hn * L + mn * Q + fn < -bn || H * dn + X * L + An * Q + In < -bn || on * dn + _ * L + kn * Q + G < -bn) continue;
        t[++a] = rn;
      } else
        t[++a] = rn;
  }
  e[0] = s, t[0] = a;
}
function Bc(n, r, e) {
  const t = e, s = t[0], a = t[1], i = t[2], c = t[3], l = t[4], h = t[5], f = t[6], v = t[7], M = t[8], m = t[9], d = t[10], y = t[11], o = t[12], p = t[13], $ = t[14], z = t[15];
  let x = 0;
  const g = n[0] + 1;
  for (let A = 1; A < g; A++) {
    const F = n[A], E = r[F], b = E.transform.worldMatrix, w = E.meshRenderer;
    if (w && w.enabled && w.bounds) {
      const I = w.bounds;
      let O = 63;
      for (let q = 0; q < 24; q += 3) {
        const T = I[q], j = I[q + 1], K = I[q + 2], k = b[0] * T + b[4] * j + b[8] * K + b[12], R = b[1] * T + b[5] * j + b[9] * K + b[13], tn = b[2] * T + b[6] * j + b[10] * K + b[14], hn = s * k + l * R + M * tn + o, mn = a * k + h * R + m * tn + p, fn = i * k + f * R + d * tn + $, H = c * k + v * R + y * tn + z;
        let X = 0;
        hn < -H && (X |= 1), hn > H && (X |= 2), mn < -H && (X |= 4), mn > H && (X |= 8), fn < -H && (X |= 16), fn > H && (X |= 32), O &= X;
      }
      O === 0 && (n[++x] = F);
    } else {
      const I = b[12], O = b[13], q = b[14], T = s * I + l * O + M * q + o, j = a * I + h * O + m * q + p, K = i * I + f * O + d * q + $, k = c * I + v * O + y * q + z;
      T >= -k && T <= k && j >= -k && j <= k && K >= -k && K <= k && (n[++x] = F);
    }
  }
  n[0] = x;
}
let Pr = 0;
function Pc(n, r, e, t, s, a, i, c, l, h, f, v, M, m, d, y, o, p, $, z, x, g) {
  let A = 0, F = 0;
  for (let E = 0; E < r; E++) {
    const b = n[E];
    if (b.constructor !== $n) continue;
    ++Pr;
    const w = b.gameObject.transform.worldMatrix;
    Pe(M, f, w), Pe(v, h, w);
    const I = M[0], O = M[1], q = M[2], T = M[3], j = M[4], K = M[5], k = M[6], R = M[7], tn = M[8], hn = M[9], mn = M[10], fn = M[11], H = M[12], X = M[13], An = M[14], In = M[15], on = b.faces, _ = b.vertices, kn = b.faceNormals, G = b.vertexNormals;
    Ec(m, w);
    const D = m, rn = D[0], sn = D[1], S = D[2], dn = D[3], L = D[4], Q = D[5], Dn = D[6], Wn = D[7], En = D[8], bn = on.length;
    for (let Nn = 0; Nn < bn; Nn += 3) {
      const Xn = on[Nn], Cn = on[Nn + 1], cn = on[Nn + 2], vr = Xn << 2, Mr = Cn << 2, ir = cn << 2;
      if (g[Xn] !== Pr) {
        const P = Xn * 3, Y = _[P], U = _[P + 1], V = _[P + 2];
        t[vr] = I * Y + j * U + tn * V + H, t[vr + 1] = O * Y + K * U + hn * V + X, t[vr + 2] = q * Y + k * U + mn * V + An, t[vr + 3] = T * Y + R * U + fn * V + In, g[Xn] = Pr, x[Xn] = -1;
      }
      if (g[Cn] !== Pr) {
        const P = Cn * 3, Y = _[P], U = _[P + 1], V = _[P + 2];
        t[Mr] = I * Y + j * U + tn * V + H, t[Mr + 1] = O * Y + K * U + hn * V + X, t[Mr + 2] = q * Y + k * U + mn * V + An, t[Mr + 3] = T * Y + R * U + fn * V + In, g[Cn] = Pr, x[Cn] = -1;
      }
      if (g[cn] !== Pr) {
        const P = cn * 3, Y = _[P], U = _[P + 1], V = _[P + 2];
        t[ir] = I * Y + j * U + tn * V + H, t[ir + 1] = O * Y + K * U + hn * V + X, t[ir + 2] = q * Y + k * U + mn * V + An, t[ir + 3] = T * Y + R * U + fn * V + In, g[cn] = Pr, x[cn] = -1;
      }
      const Lr = t[vr], Dr = t[vr + 1], Kr = t[vr + 2], Jn = t[vr + 3], Ir = t[Mr], qn = t[Mr + 1], yn = t[Mr + 2], en = t[Mr + 3], vn = t[ir], Ln = t[ir + 1], Tn = t[ir + 2], wn = t[ir + 3];
      if (Lr < -Jn && Ir < -en && vn < -wn || Lr > Jn && Ir > en && vn > wn || Dr < -Jn && qn < -en && Ln < -wn || Dr > Jn && qn > en && Ln > wn || Kr < -Jn && yn < -en && Tn < -wn || Kr > Jn && yn > en && Tn > wn) continue;
      const ln = 1 / Jn, mr = 1 / en, or = 1 / wn, cr = Lr * ln, Qn = Dr * ln, an = Ir * mr, dr = qn * mr, Un = vn * or, gn = Ln * or;
      if ((an - cr) * (gn - Qn) - (dr - Qn) * (Un - cr) > 0) continue;
      const un = Xn * 3, nr = Cn * 3, rr = cn * 3;
      s[A] = A, $[A] = E, z[A] = Nn;
      const yr = kn[Nn], Yn = kn[Nn + 1], u = kn[Nn + 2], Bn = yr * rn + Yn * dn + u * Dn, Pn = yr * sn + Yn * L + u * Wn, Vn = yr * S + Yn * Q + u * En, Mn = Math.sqrt(Bn * Bn + Pn * Pn + Vn * Vn), On = Mn > 0 ? 1 / Mn : 0, Zn = Nn / 3 | 0, jn = b.faceColors[Zn % b.faceColors.length];
      if (i[A] = b.colors[jn] << 24 | b.colors[jn + 1] << 16 | b.colors[jn + 2] << 8 | 255, c[A] = b.shaderType, x[Xn] === -1) {
        const P = F * 3;
        ye(
          e,
          un,
          _[un],
          _[un + 1],
          _[un + 2],
          v
        ), o[P] = cr, o[P + 1] = -Qn, x[Xn] = P, F++;
        const Y = Xn * 3, U = G[Y] * rn + G[Y + 1] * dn + G[Y + 2] * Dn, V = G[Y] * sn + G[Y + 1] * L + G[Y + 2] * Wn, pn = G[Y] * S + G[Y + 1] * Q + G[Y + 2] * En, Rn = Math.sqrt(U * U + V * V + pn * pn), xn = Rn > 0 ? 1 / Rn : 0;
        y[P] = U * xn, y[P + 1] = V * xn, y[P + 2] = pn * xn;
      }
      if (p[A * 3] = x[Xn], x[Cn] === -1) {
        const P = F * 3;
        ye(
          e,
          nr,
          _[nr],
          _[nr + 1],
          _[nr + 2],
          v
        ), o[P] = an, o[P + 1] = -dr, x[Cn] = P, F++;
        const Y = Cn * 3, U = G[Y] * rn + G[Y + 1] * dn + G[Y + 2] * Dn, V = G[Y] * sn + G[Y + 1] * L + G[Y + 2] * Wn, pn = G[Y] * S + G[Y + 1] * Q + G[Y + 2] * En, Rn = Math.sqrt(U * U + V * V + pn * pn), xn = Rn > 0 ? 1 / Rn : 0;
        y[P] = U * xn, y[P + 1] = V * xn, y[P + 2] = pn * xn;
      }
      if (p[A * 3 + 1] = x[Cn], x[cn] === -1) {
        const P = F * 3;
        ye(
          e,
          rr,
          _[rr],
          _[rr + 1],
          _[rr + 2],
          v
        ), o[P] = Un, o[P + 1] = -gn, x[cn] = P, F++;
        const Y = cn * 3, U = G[Y] * rn + G[Y + 1] * dn + G[Y + 2] * Dn, V = G[Y] * sn + G[Y + 1] * L + G[Y + 2] * Wn, pn = G[Y] * S + G[Y + 1] * Q + G[Y + 2] * En, Rn = Math.sqrt(U * U + V * V + pn * pn), xn = Rn > 0 ? 1 / Rn : 0;
        y[P] = U * xn, y[P + 1] = V * xn, y[P + 2] = pn * xn;
      }
      p[A * 3 + 2] = x[cn];
      const W = A * 9;
      l[W] = e[un], l[W + 1] = e[un + 1];
      const Sn = l[W + 2] = e[un + 2];
      l[W + 3] = e[nr], l[W + 4] = e[nr + 1];
      const Gn = l[W + 5] = e[nr + 2];
      l[W + 6] = e[rr], l[W + 7] = e[rr + 1];
      const zn = l[W + 8] = e[rr + 2];
      a[A] = (Sn + Gn + zn) * 0.33333;
      const Hn = A * 3;
      d[Hn] = Bn * On, d[Hn + 1] = Pn * On, d[Hn + 2] = Vn * On, A++;
    }
  }
  return A;
}
function Zc(n, r, e, t, s, a, i, c, l, h, f, v, M, m, d, y, o, p, $, z, x, g, A, F, E, b, w, I) {
  const O = h * 0.5, q = f * 0.5, T = c + i;
  l && n.clearRect(0, 0, n.canvas.width, n.canvas.height);
  let j = -1, K = -1;
  for (let k = c; k < T; k++) {
    const R = t[k], tn = e[R * 3], hn = e[R * 3 + 1], mn = e[R * 3 + 2], fn = r[tn] * O + O, H = r[tn + 1] * q + q, X = r[hn] * O + O, An = r[hn + 1] * q + q, In = r[mn] * O + O, on = r[mn + 1] * q + q, _ = (fn + X + In) * 0.33333, kn = (H + An + on) * 0.33333, G = fn - _, D = H - kn, rn = Math.abs(G), sn = Math.abs(D), S = rn > sn ? rn + 0.4 * sn : sn + 0.4 * rn, dn = S > 0 ? 0.6 / S : 0, L = fn + G * dn, Q = H + D * dn, Dn = X - _, Wn = An - kn, En = Math.abs(Dn), bn = Math.abs(Wn), Nn = En > bn ? En + 0.4 * bn : bn + 0.4 * En, Xn = Nn > 0 ? 0.6 / Nn : 0, Cn = X + Dn * Xn, cn = An + Wn * Xn, vr = In - _, Mr = on - kn, ir = Math.abs(vr), Lr = Math.abs(Mr), Dr = ir > Lr ? ir + 0.4 * Lr : Lr + 0.4 * ir, Kr = Dr > 0 ? 0.6 / Dr : 0, Jn = In + vr * Kr, Ir = on + Mr * Kr;
    switch (b ? 3 : a[R]) {
      case 0: {
        const qn = s[R];
        let yn = qn >>> 24 & 255, en = qn >>> 16 & 255, vn = qn >>> 8 & 255, Ln = z >>> 16 & 255, Tn = z >>> 8 & 255, wn = z & 255;
        const ln = x[R * 3], mr = x[R * 3 + 1], or = x[R * 3 + 2], cr = w[0] + 1;
        for (let Yn = 1; Yn < cr; Yn++) {
          const u = I[w[Yn]];
          if (u.light.type === 0) {
            const Bn = -u.transform.worldMatrix[8], Pn = -u.transform.worldMatrix[9], Vn = -u.transform.worldMatrix[10], Mn = ln * Bn + mr * Pn + or * Vn;
            Mn > 0 && (Ln += (u.light.color >>> 16 & 255) * Mn, Tn += (u.light.color >>> 8 & 255) * Mn, wn += (u.light.color & 255) * Mn);
          }
        }
        Ln *= 39215e-7, Tn *= 39215e-7, wn *= 39215e-7, yn = yn * Ln | 0, en = en * Tn | 0, vn = vn * wn | 0, yn = yn > 255 ? 255 : yn, en = en > 255 ? 255 : en, vn = vn > 255 ? 255 : vn;
        const Qn = M[R];
        let an = 0;
        if (m === N.FogType.RADIAL_FAST || m === N.FogType.RADIAL) {
          const Yn = v[R * 9], u = v[R * 9 + 1], Bn = v[R * 9 + 2], Pn = v[R * 9 + 3], Vn = v[R * 9 + 4], Mn = v[R * 9 + 5], On = v[R * 9 + 6], Zn = v[R * 9 + 7], jn = v[R * 9 + 8], W = (Yn + Pn + On) * 0.33333, Sn = (u + Vn + Zn) * 0.33333, Gn = (Bn + Mn + jn) * 0.33333;
          if (m === N.FogType.RADIAL_FAST) {
            const zn = y * y, P = 1 / (o * o - zn);
            an = (W * W + Sn * Sn + Gn * Gn - zn) * P;
          } else
            an = (Math.sqrt(W * W + Sn * Sn + Gn * Gn) - y) / (o - y);
        } else m === N.FogType.LINEAR && (an = (Qn - y) / (o - y));
        an > 1 && (an = 1), an > 0 && (yn = yn * (1 - an) + d[0] * an | 0, en = en * (1 - an) + d[1] * an | 0, vn = vn * (1 - an) + d[2] * an | 0);
        const dr = A[R], Un = E[dr], gn = Un.textureImage;
        if (gn && gn.complete && gn.naturalWidth > 0 && Un.uvs) {
          const Yn = F[R], u = Un.uvs, Bn = Un.faces[Yn] * 2, Pn = Un.faces[Yn + 1] * 2, Vn = Un.faces[Yn + 2] * 2, Mn = u[Bn] * gn.width, On = u[Bn + 1] * gn.height, Zn = u[Pn] * gn.width, jn = u[Pn + 1] * gn.height, W = u[Vn] * gn.width, Sn = u[Vn + 1] * gn.height, Gn = Mn * (jn - Sn) - On * (Zn - W) + (Zn * Sn - W * jn);
          if (Math.abs(Gn) > 1e-5) {
            const zn = 1 / Gn, Hn = (fn * (jn - Sn) + X * (Sn - On) + In * (On - jn)) * zn, P = (fn * (W - Zn) + X * (Mn - W) + In * (Zn - Mn)) * zn, Y = (fn * (Zn * Sn - W * jn) + X * (W * On - Mn * Sn) + In * (Mn * jn - Zn * On)) * zn, U = (H * (jn - Sn) + An * (Sn - On) + on * (On - jn)) * zn, V = (H * (W - Zn) + An * (Mn - W) + on * (Zn - Mn)) * zn, pn = (H * (Zn * Sn - W * jn) + An * (W * On - Mn * Sn) + on * (Mn * jn - Zn * On)) * zn;
            n.save(), n.beginPath(), n.moveTo(L, Q), n.lineTo(Cn, cn), n.lineTo(Jn, Ir), n.closePath(), n.clip(), n.setTransform(Hn, U, P, V, Y, pn), n.drawImage(gn, 0, 0), n.restore();
            const Rn = Ln >= 1 ? 255 : Ln * 255 | 0, xn = Tn >= 1 ? 255 : Tn * 255 | 0, Qr = wn >= 1 ? 255 : wn * 255 | 0, ne = Rn & 248, pr = xn & 252, xr = Qr & 248, Ar = ne << 8 | pr << 3 | xr >> 3;
            if (n.globalCompositeOperation = "multiply", j !== Ar && (n.fillStyle = Or[Ar], j = Ar), n.fill(), n.globalCompositeOperation = "source-over", an > 0) {
              const Cr = d[0] & 248, Yr = d[1] & 252, Br = d[2] & 248, er = Cr << 8 | Yr << 3 | Br >> 3;
              n.globalAlpha = an, j !== er && (n.fillStyle = Or[er], j = er), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(L, Q), n.lineTo(Cn, cn), n.lineTo(Jn, Ir), n.closePath();
        const un = yn & 248, nr = en & 252, rr = vn & 248, yr = un << 8 | nr << 3 | rr >> 3;
        j !== yr && (n.fillStyle = Or[yr], j = yr), n.fill();
        break;
      }
      case 1: {
        const qn = s[R];
        let yn = qn >>> 24 & 255, en = qn >>> 16 & 255, vn = qn >>> 8 & 255;
        const Ln = M[R];
        let Tn = 0;
        if (m === N.FogType.RADIAL_FAST || m === N.FogType.RADIAL) {
          const an = v[R * 9], dr = v[R * 9 + 1], Un = v[R * 9 + 2], gn = v[R * 9 + 3], un = v[R * 9 + 4], nr = v[R * 9 + 5], rr = v[R * 9 + 6], yr = v[R * 9 + 7], Yn = v[R * 9 + 8], u = (an + gn + rr) * 0.33333, Bn = (dr + un + yr) * 0.33333, Pn = (Un + nr + Yn) * 0.33333;
          if (m === N.FogType.RADIAL_FAST) {
            const Vn = y * y, On = 1 / (o * o - Vn);
            Tn = (u * u + Bn * Bn + Pn * Pn - Vn) * On;
          } else
            Tn = (Math.sqrt(u * u + Bn * Bn + Pn * Pn) - y) / (o - y);
        } else m === N.FogType.LINEAR && (Tn = (Ln - y) / (o - y));
        let ln = Math.max(0, Tn - 0);
        ln > 1 && (ln = 1), ln > 0 && (yn = yn * (1 - ln) + d[0] * ln | 0, en = en * (1 - ln) + d[1] * ln | 0, vn = vn * (1 - ln) + d[2] * ln | 0), n.beginPath(), n.moveTo(L, Q), n.lineTo(Cn, cn), n.lineTo(Jn, Ir), n.closePath();
        const mr = yn & 248, or = en & 252, cr = vn & 248, Qn = mr << 8 | or << 3 | cr >> 3;
        j !== Qn && (n.fillStyle = Or[Qn], j = Qn), n.fill();
        break;
      }
      case 2: {
        const qn = s[R];
        let yn = qn >>> 24 & 255, en = qn >>> 16 & 255, vn = qn >>> 8 & 255;
        n.beginPath(), n.moveTo(L, Q), n.lineTo(Cn, cn), n.lineTo(Jn, Ir), n.closePath();
        const Ln = yn & 248, Tn = en & 252, wn = vn & 248, ln = Ln << 8 | Tn << 3 | wn >> 3;
        j !== ln && (n.fillStyle = Or[ln], j = ln), n.fill();
        break;
      }
      case 3: {
        n.beginPath(), n.moveTo(fn, H), n.lineTo(X, An), n.lineTo(In, on), n.closePath(), K !== -2 && (n.strokeStyle = "rgb(0,0,255)", n.lineJoin = "miter", n.lineWidth = 0.5, K = -2), n.stroke();
        break;
      }
      case 4: {
        const qn = s[R], yn = qn >>> 24 & 255, en = qn >>> 16 & 255, vn = qn >>> 8 & 255;
        let Ln = z >>> 16 & 255, Tn = z >>> 8 & 255, wn = z & 255, ln = Ln, mr = Tn, or = wn, cr = Ln, Qn = Tn, an = wn, dr = Ln, Un = Tn, gn = wn, un = g[tn], nr = g[tn + 1], rr = g[tn + 2], yr = g[hn], Yn = g[hn + 1], u = g[hn + 2], Bn = g[mn], Pn = g[mn + 1], Vn = g[mn + 2];
        const Mn = w[0] + 1;
        for (let B = 1; B < Mn; B++) {
          const _n = I[w[B]];
          if (_n.light.type === 0) {
            const wr = _n.light.color >>> 16 & 255, gr = _n.light.color >>> 8 & 255, Vr = _n.light.color & 255, br = -_n.transform.worldMatrix[8], qr = -_n.transform.worldMatrix[9], Fr = -_n.transform.worldMatrix[10];
            let Tr = un * br + nr * qr + rr * Fr, tr = yr * br + Yn * qr + u * Fr, sr = Bn * br + Pn * qr + Vn * Fr;
            Tr > 0 && (ln += wr * Tr, mr += gr * Tr, or += Vr * Tr), tr > 0 && (cr += wr * tr, Qn += gr * tr, an += Vr * tr), sr > 0 && (dr += wr * sr, Un += gr * sr, gn += Vr * sr);
          }
        }
        ln *= 39215e-7, mr *= 39215e-7, or *= 39215e-7, cr *= 39215e-7, Qn *= 39215e-7, an *= 39215e-7, dr *= 39215e-7, Un *= 39215e-7, gn *= 39215e-7;
        let On = Math.min(Math.max(ln, mr, or), 1), Zn = Math.min(Math.max(cr, Qn, an), 1), jn = Math.min(Math.max(dr, Un, gn), 1), W = 0;
        const Sn = M[R];
        if (m === N.FogType.RADIAL_FAST || m === N.FogType.RADIAL) {
          const B = v[R * 9], _n = v[R * 9 + 1], wr = v[R * 9 + 2], gr = v[R * 9 + 3], Vr = v[R * 9 + 4], br = v[R * 9 + 5], qr = v[R * 9 + 6], Fr = v[R * 9 + 7], Tr = v[R * 9 + 8], tr = (B + gr + qr) * 0.33333, sr = (_n + Vr + Fr) * 0.33333, Jr = (wr + br + Tr) * 0.33333;
          if (m === N.FogType.RADIAL_FAST) {
            const kr = y * y, vt = 1 / (o * o - kr);
            W = (tr * tr + sr * sr + Jr * Jr - kr) * vt;
          } else
            W = (Math.sqrt(tr * tr + sr * sr + Jr * Jr) - y) / (o - y);
        } else m === N.FogType.LINEAR && (W = (Sn - y) / (o - y));
        W > 1 && (W = 1);
        let Gn = yn * ln, zn = en * mr, Hn = vn * or, P = yn * cr, Y = en * Qn, U = vn * an, V = yn * dr, pn = en * Un, Rn = vn * gn;
        if (Gn = Gn > 255 ? 255 : Gn, zn = zn > 255 ? 255 : zn, Hn = Hn > 255 ? 255 : Hn, P = P > 255 ? 255 : P, Y = Y > 255 ? 255 : Y, U = U > 255 ? 255 : U, V = V > 255 ? 255 : V, pn = pn > 255 ? 255 : pn, Rn = Rn > 255 ? 255 : Rn, W > 0) {
          const B = 1 - W, _n = d[0] * W, wr = d[1] * W, gr = d[2] * W;
          Gn = Gn * B + _n | 0, zn = zn * B + wr | 0, Hn = Hn * B + gr | 0, P = P * B + _n | 0, Y = Y * B + wr | 0, U = U * B + gr | 0, V = V * B + _n | 0, pn = pn * B + wr | 0, Rn = Rn * B + gr | 0;
        } else
          Gn |= 0, zn |= 0, Hn |= 0, P |= 0, Y |= 0, U |= 0, V |= 0, pn |= 0, Rn |= 0;
        const xn = (Gn & 248) << 8 | (zn & 252) << 3 | (Hn & 248) >> 3, Qr = (P & 248) << 8 | (Y & 252) << 3 | (U & 248) >> 3, ne = (V & 248) << 8 | (pn & 252) << 3 | (Rn & 248) >> 3;
        if (n.beginPath(), n.moveTo(L, Q), n.lineTo(Cn, cn), n.lineTo(Jn, Ir), n.closePath(), xn === Qr && Qr === ne) {
          j !== xn && (n.fillStyle = Or[xn], j = xn), n.fill();
          break;
        }
        let pr = fn, xr = H, Ar = X, Cr = An, Yr = In, Br = on, er = On, $r = Zn, Hr = jn, Wr = Or[xn], Ur = Or[Qr], de = Or[ne];
        if (er > $r) {
          let B;
          B = pr, pr = Ar, Ar = B, B = xr, xr = Cr, Cr = B, B = er, er = $r, $r = B, B = Wr, Wr = Ur, Ur = B;
        }
        if ($r > Hr) {
          let B;
          B = Ar, Ar = Yr, Yr = B, B = Cr, Cr = Br, Br = B, B = $r, $r = Hr, Hr = B, B = Ur, Ur = de, de = B;
        }
        if (er > $r) {
          let B;
          B = pr, pr = Ar, Ar = B, B = xr, xr = Cr, Cr = B, B = er, er = $r, $r = B, B = Wr, Wr = Ur, Ur = B;
        }
        if (Hr - er < 0.01)
          j !== xn && (n.fillStyle = Wr, j = xn);
        else {
          const B = ($r - er) / (Hr - er), _n = pr + B * (Yr - pr), wr = xr + B * (Br - xr), gr = Ar - _n, br = -(Cr - wr), qr = gr, Fr = br * br + qr * qr;
          let Tr, tr;
          if (Fr < 1e-6)
            Tr = Yr, tr = Br;
          else {
            const kr = ((Yr - pr) * br + (Br - xr) * qr) / Fr;
            Tr = pr + kr * br, tr = xr + kr * qr;
          }
          const sr = n.createLinearGradient(pr, xr, Tr, tr);
          sr.addColorStop(0, Wr), sr.addColorStop(1, de), j = -3, n.fillStyle = sr;
        }
        n.fill();
        break;
      }
    }
  }
}
const Ze = fe;
function ft(n, r) {
  this.canvas = r || document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new ht(), this.camera = n, this.layers = [];
  for (var e = 0; e < Nr.layersCount; e++) {
    var t = document.createElement("canvas");
    this.layers[e] = t.getContext("2d"), this.layers[e].imageSmoothingEnabled = !1, this.layers[e].webkitImageSmoothingEnabled = !1;
  }
  var s = this;
  window.addEventListener("resize", function() {
    s.setSize(s.canvas.offsetWidth, s.canvas.offsetHeight);
  });
  const a = this;
  this.startRenderLoop = function i() {
    requestAnimationFrame(() => {
      a.render(), requestAnimationFrame(i);
    });
  }, this.lastRenderStats = {};
}
var fr = ft.prototype;
fr.size = null;
fr.dpr = 1;
fr.width = null;
fr.height = null;
fr.viewportMatrix = null;
fr.camera = null;
fr.canvas = null;
fr.context = null;
fr.start = function() {
  this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight), this.startRenderLoop();
};
fr.render = function() {
  this.camera !== null && this.renderer.render(this.camera.gameObject, this, this.lastRenderStats);
};
fr.setSize = function(n, r) {
  const e = n * this.dpr, t = r * this.dpr;
  this.width = n, this.height = r, this.canvas.width = n, this.canvas.height = r, this.viewportMatrix[0] = n / 2, this.viewportMatrix[5] = -r / 2, this.viewportMatrix[12] = n / 2, this.viewportMatrix[13] = r / 2;
  for (var s = 0; s < this.layers.length; s++) {
    var a = this.layers[s];
    a.canvas.width = n, a.canvas.height = r;
  }
  this.camera.setup(e, t);
};
fr.getWorldToScreen = function() {
  return Ze(
    this.worldToScreenMatrix,
    this.viewportMatrix,
    this.camera.projectionMatrix
  ), Ze(
    this.worldToScreenMatrix,
    this.worldToScreenMatrix,
    this.camera.gameObject.transform.getWorldToLocal()
  ), this.worldToScreenMatrix;
};
Xr.Type = {
  DIRECTIONAL: 0,
  POINT: 1,
  SPOT: 2
};
function Er() {
  J.call(this);
}
Er.prototype = Object.create(J.prototype);
Er.prototype.constructor = Er;
Er.prototype.color = 16777215;
Er.prototype.range = 10;
Er.prototype.type = Xr.Type.DIRECTIONAL;
Er.prototype.setGameObject = function(n) {
  J.prototype.setGameObject.call(this, n), n.light = this;
};
function Xr(n) {
  Kn.call(this, n || "light"), this.addComponent(this.light = new Er());
}
Xr.prototype = Object.create(Kn.prototype);
Xr.prototype.constructor = Xr;
const Wc = window.scaliaEngine = {
  config: Nr,
  Game: Ue,
  GameObject: Kn,
  Component: J,
  Camera: st,
  CameraComponent: N,
  MeshComponent: $n,
  TransformComponent: oe,
  SpriteRenderer: Ce,
  glMatrix: Tc,
  PathRenderer: je,
  TextRenderer: Re,
  Plane: at,
  Box: it,
  Cone: ct,
  Ball: lt,
  Light: Xr,
  Canvas2dViewport: ft
};
export {
  Wc as default
};
