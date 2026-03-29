const jr = {
  depthSortingMask: parseInt("11", 2),
  //bitmask, bit per layer
  layerStrokeMask: parseInt("11", 2),
  //bitmask, bit per layer
  layerClearMask: parseInt("11", 2),
  //bitmask, bit per layer
  layersCount: 2,
  debug: !0
};
function ee() {
  this.now = Date.now();
}
var bn = ee.prototype;
bn.time = 0;
bn.now = 0;
bn.dt = 60;
function ae() {
  this.gameObjects = [];
}
var Wr = ae.prototype;
Wr.gameObjects = null;
Wr.light = null;
Wr.addGameObject = function(r) {
  this.gameObjects[this.gameObjects.length++] = r, r.setScene(this);
};
Wr.addLightSource = function(r) {
  return this.light = r, this.addGameObject(r);
};
Wr.removeGameObject = function(r) {
  this.gameObjects[this.gameObjects.indexOf(r)] = this.gameObjects[this.gameObjects.length - 1], this.gameObjects.length -= 1;
};
Wr.retrieve = function() {
  const r = [], n = [];
  let e = 0, a = 0;
  for (let t = this.gameObjects.length - 1; t >= 0; t--)
    r[a++] = this.gameObjects[t];
  for (; a > 0; ) {
    const t = r[--a];
    n[e++] = t;
    const s = t.transform.children;
    for (let i = s.length - 1; i >= 0; i--)
      r[a++] = s[i].gameObject;
  }
  return n;
};
function te(r) {
  this.time = new ee(), this.list = [], this.scene = new ae();
}
var Cr = te.prototype;
Cr.scene = null;
Cr.time = null;
Cr.tickRegister = function(r) {
  r._tickerIndex === void 0 && (r._tickerIndex = this.list.length, this.list.push(r));
};
Cr.tickUnregister = function(r) {
  const n = r._tickerIndex;
  if (n === void 0) return;
  const e = this.list.pop();
  e !== r && (this.list[n] = e, e._tickerIndex = n), r._tickerIndex = void 0;
};
Cr.update = function(r) {
  const n = this.list;
  for (let e = 0; e < n.length; e++)
    n[e].tick(r);
};
Cr.tick = function() {
  for (var r = Date.now(), n = 0, e = r - this.time.now, a = this.time.dt; e >= a && (e -= a, this.time.now += a, this.time.time += a, this.update(this.time), !(n++ > 200)); )
    ;
};
function se() {
  this.world = new te();
  var r = this.world;
  this.tick = function n() {
    r.tick(), requestAnimationFrame(n);
  };
}
var Qr = se.prototype;
Qr.world = null;
Qr.render = null;
Qr.run = function() {
  this.tick();
};
Qr.rafHandler = null;
function N() {
}
var Jr = N.prototype;
Jr.gameObject = null;
Jr.enabled = !0;
Jr.setGameObject = function(r) {
  this.gameObject = r;
};
Jr.unsetGameObject = function() {
  this.gameObject = null;
};
function R1(r, n, e, a, t, s) {
  return r[n] = s[0] * e + s[4] * a + s[8] * t + s[12], r[n + 1] = s[1] * e + s[5] * a + s[9] * t + s[13], r[n + 2] = s[2] * e + s[6] * a + s[10] * t + s[14], r;
}
function L1(r, n, e, a, t, s) {
  return r[n] = s[0] * e + s[4] * a + s[8] * t + s[12], r[n + 1] = s[1] * e + s[5] * a + s[9] * t + s[13], r;
}
function Kr(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = n[8], M = n[9], d = n[10], y = n[11], p = n[12], m = n[13], x = n[14], $ = n[15], o = e[0], g = e[1], w = e[2], z = e[3];
  return r[0] = o * a + g * c + w * v + z * p, r[1] = o * t + g * l + w * M + z * m, r[2] = o * s + g * h + w * d + z * x, r[3] = o * i + g * f + w * y + z * $, o = e[4], g = e[5], w = e[6], z = e[7], r[4] = o * a + g * c + w * v + z * p, r[5] = o * t + g * l + w * M + z * m, r[6] = o * s + g * h + w * d + z * x, r[7] = o * i + g * f + w * y + z * $, o = e[8], g = e[9], w = e[10], z = e[11], r[8] = o * a + g * c + w * v + z * p, r[9] = o * t + g * l + w * M + z * m, r[10] = o * s + g * h + w * d + z * x, r[11] = o * i + g * f + w * y + z * $, o = e[12], g = e[13], w = e[14], z = e[15], r[12] = o * a + g * c + w * v + z * p, r[13] = o * t + g * l + w * M + z * m, r[14] = o * s + g * h + w * d + z * x, r[15] = o * i + g * f + w * y + z * $, r;
}
var j = 1e-6, L = typeof Float32Array < "u" ? Float32Array : Array, yr = Math.random, ie = "zyx";
function mr(r) {
  return r >= 0 ? Math.round(r) : r % 0.5 === 0 ? Math.floor(r) : Math.round(r);
}
function P1(r) {
  L = r;
}
var W1 = Math.PI / 180, C1 = 180 / Math.PI;
function E1(r) {
  return r * W1;
}
function k1(r) {
  return r * C1;
}
function D1(r, n) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : j;
  return Math.abs(r - n) <= e * Math.max(1, Math.abs(r), Math.abs(n));
}
const N1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: ie,
  get ARRAY_TYPE() {
    return L;
  },
  EPSILON: j,
  RANDOM: yr,
  equals: D1,
  round: mr,
  setMatrixArrayType: P1,
  toDegree: k1,
  toRadian: E1
}, Symbol.toStringTag, { value: "Module" }));
function B1() {
  var r = new L(4);
  return L != Float32Array && (r[1] = 0, r[2] = 0), r[0] = 1, r[3] = 1, r;
}
function V1(r) {
  var n = new L(4);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n;
}
function Y1(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function U1(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r;
}
function G1(r, n, e, a) {
  var t = new L(4);
  return t[0] = r, t[1] = n, t[2] = e, t[3] = a, t;
}
function X1(r, n, e, a, t) {
  return r[0] = n, r[1] = e, r[2] = a, r[3] = t, r;
}
function Z1(r, n) {
  if (r === n) {
    var e = n[1];
    r[1] = n[2], r[2] = e;
  } else
    r[0] = n[0], r[1] = n[2], r[2] = n[1], r[3] = n[3];
  return r;
}
function _1(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = e * s - t * a;
  return i ? (i = 1 / i, r[0] = s * i, r[1] = -a * i, r[2] = -t * i, r[3] = e * i, r) : null;
}
function H1(r, n) {
  var e = n[0];
  return r[0] = n[3], r[1] = -n[1], r[2] = -n[2], r[3] = e, r;
}
function Q1(r) {
  return r[0] * r[3] - r[2] * r[1];
}
function ce(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return r[0] = a * c + s * l, r[1] = t * c + i * l, r[2] = a * h + s * f, r[3] = t * h + i * f, r;
}
function J1(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = Math.sin(e), l = Math.cos(e);
  return r[0] = a * l + s * c, r[1] = t * l + i * c, r[2] = a * -c + s * l, r[3] = t * -c + i * l, r;
}
function K1(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = e[0], l = e[1];
  return r[0] = a * c, r[1] = t * c, r[2] = s * l, r[3] = i * l, r;
}
function u1(r, n) {
  var e = Math.sin(n), a = Math.cos(n);
  return r[0] = a, r[1] = e, r[2] = -e, r[3] = a, r;
}
function r0(r, n) {
  return r[0] = n[0], r[1] = 0, r[2] = 0, r[3] = n[1], r;
}
function n0(r) {
  return "mat2(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ")";
}
function e0(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2] + r[3] * r[3]);
}
function a0(r, n, e, a) {
  return r[2] = a[2] / a[0], e[0] = a[0], e[1] = a[1], e[3] = a[3] - r[2] * e[1], [r, n, e];
}
function t0(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r[3] = n[3] + e[3], r;
}
function le(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r[2] = n[2] - e[2], r[3] = n[3] - e[3], r;
}
function s0(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2] && r[3] === n[3];
}
function i0(r, n) {
  var e = r[0], a = r[1], t = r[2], s = r[3], i = n[0], c = n[1], l = n[2], h = n[3];
  return Math.abs(e - i) <= j * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(a - c) <= j * Math.max(1, Math.abs(a), Math.abs(c)) && Math.abs(t - l) <= j * Math.max(1, Math.abs(t), Math.abs(l)) && Math.abs(s - h) <= j * Math.max(1, Math.abs(s), Math.abs(h));
}
function c0(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r[3] = n[3] * e, r;
}
function l0(r, n, e, a) {
  return r[0] = n[0] + e[0] * a, r[1] = n[1] + e[1] * a, r[2] = n[2] + e[2] * a, r[3] = n[3] + e[3] * a, r;
}
var h0 = ce, f0 = le;
const v0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: a0,
  add: t0,
  adjoint: H1,
  clone: V1,
  copy: Y1,
  create: B1,
  determinant: Q1,
  equals: i0,
  exactEquals: s0,
  frob: e0,
  fromRotation: u1,
  fromScaling: r0,
  fromValues: G1,
  identity: U1,
  invert: _1,
  mul: h0,
  multiply: ce,
  multiplyScalar: c0,
  multiplyScalarAndAdd: l0,
  rotate: J1,
  scale: K1,
  set: X1,
  str: n0,
  sub: f0,
  subtract: le,
  transpose: Z1
}, Symbol.toStringTag, { value: "Module" }));
function M0() {
  var r = new L(6);
  return L != Float32Array && (r[1] = 0, r[2] = 0, r[4] = 0, r[5] = 0), r[0] = 1, r[3] = 1, r;
}
function d0(r) {
  var n = new L(6);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n;
}
function y0(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r;
}
function m0(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = 0, r[5] = 0, r;
}
function p0(r, n, e, a, t, s) {
  var i = new L(6);
  return i[0] = r, i[1] = n, i[2] = e, i[3] = a, i[4] = t, i[5] = s, i;
}
function x0(r, n, e, a, t, s, i) {
  return r[0] = n, r[1] = e, r[2] = a, r[3] = t, r[4] = s, r[5] = i, r;
}
function o0(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = n[4], c = n[5], l = e * s - a * t;
  return l ? (l = 1 / l, r[0] = s * l, r[1] = -a * l, r[2] = -t * l, r[3] = e * l, r[4] = (t * c - s * i) * l, r[5] = (a * i - e * c) * l, r) : null;
}
function $0(r) {
  return r[0] * r[3] - r[1] * r[2];
}
function he(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = e[0], f = e[1], v = e[2], M = e[3], d = e[4], y = e[5];
  return r[0] = a * h + s * f, r[1] = t * h + i * f, r[2] = a * v + s * M, r[3] = t * v + i * M, r[4] = a * d + s * y + c, r[5] = t * d + i * y + l, r;
}
function w0(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = Math.sin(e), f = Math.cos(e);
  return r[0] = a * f + s * h, r[1] = t * f + i * h, r[2] = a * -h + s * f, r[3] = t * -h + i * f, r[4] = c, r[5] = l, r;
}
function g0(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = e[0], f = e[1];
  return r[0] = a * h, r[1] = t * h, r[2] = s * f, r[3] = i * f, r[4] = c, r[5] = l, r;
}
function z0(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = e[0], f = e[1];
  return r[0] = a, r[1] = t, r[2] = s, r[3] = i, r[4] = a * h + s * f + c, r[5] = t * h + i * f + l, r;
}
function b0(r, n) {
  var e = Math.sin(n), a = Math.cos(n);
  return r[0] = a, r[1] = e, r[2] = -e, r[3] = a, r[4] = 0, r[5] = 0, r;
}
function A0(r, n) {
  return r[0] = n[0], r[1] = 0, r[2] = 0, r[3] = n[1], r[4] = 0, r[5] = 0, r;
}
function q0(r, n) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = n[0], r[5] = n[1], r;
}
function O0(r) {
  return "mat2d(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ", " + r[4] + ", " + r[5] + ")";
}
function j0(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2] + r[3] * r[3] + r[4] * r[4] + r[5] * r[5] + 1);
}
function T0(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r[3] = n[3] + e[3], r[4] = n[4] + e[4], r[5] = n[5] + e[5], r;
}
function fe(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r[2] = n[2] - e[2], r[3] = n[3] - e[3], r[4] = n[4] - e[4], r[5] = n[5] - e[5], r;
}
function S0(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r[3] = n[3] * e, r[4] = n[4] * e, r[5] = n[5] * e, r;
}
function F0(r, n, e, a) {
  return r[0] = n[0] + e[0] * a, r[1] = n[1] + e[1] * a, r[2] = n[2] + e[2] * a, r[3] = n[3] + e[3] * a, r[4] = n[4] + e[4] * a, r[5] = n[5] + e[5] * a, r;
}
function I0(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2] && r[3] === n[3] && r[4] === n[4] && r[5] === n[5];
}
function R0(r, n) {
  var e = r[0], a = r[1], t = r[2], s = r[3], i = r[4], c = r[5], l = n[0], h = n[1], f = n[2], v = n[3], M = n[4], d = n[5];
  return Math.abs(e - l) <= j * Math.max(1, Math.abs(e), Math.abs(l)) && Math.abs(a - h) <= j * Math.max(1, Math.abs(a), Math.abs(h)) && Math.abs(t - f) <= j * Math.max(1, Math.abs(t), Math.abs(f)) && Math.abs(s - v) <= j * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(i - M) <= j * Math.max(1, Math.abs(i), Math.abs(M)) && Math.abs(c - d) <= j * Math.max(1, Math.abs(c), Math.abs(d));
}
var L0 = he, P0 = fe;
const W0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: T0,
  clone: d0,
  copy: y0,
  create: M0,
  determinant: $0,
  equals: R0,
  exactEquals: I0,
  frob: j0,
  fromRotation: b0,
  fromScaling: A0,
  fromTranslation: q0,
  fromValues: p0,
  identity: m0,
  invert: o0,
  mul: L0,
  multiply: he,
  multiplyScalar: S0,
  multiplyScalarAndAdd: F0,
  rotate: w0,
  scale: g0,
  set: x0,
  str: O0,
  sub: P0,
  subtract: fe,
  translate: z0
}, Symbol.toStringTag, { value: "Module" }));
function ve() {
  var r = new L(9);
  return L != Float32Array && (r[1] = 0, r[2] = 0, r[3] = 0, r[5] = 0, r[6] = 0, r[7] = 0), r[0] = 1, r[4] = 1, r[8] = 1, r;
}
function C0(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[4], r[4] = n[5], r[5] = n[6], r[6] = n[8], r[7] = n[9], r[8] = n[10], r;
}
function E0(r) {
  var n = new L(9);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n;
}
function k0(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r;
}
function D0(r, n, e, a, t, s, i, c, l) {
  var h = new L(9);
  return h[0] = r, h[1] = n, h[2] = e, h[3] = a, h[4] = t, h[5] = s, h[6] = i, h[7] = c, h[8] = l, h;
}
function N0(r, n, e, a, t, s, i, c, l, h) {
  return r[0] = n, r[1] = e, r[2] = a, r[3] = t, r[4] = s, r[5] = i, r[6] = c, r[7] = l, r[8] = h, r;
}
function B0(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 1, r[5] = 0, r[6] = 0, r[7] = 0, r[8] = 1, r;
}
function V0(r, n) {
  if (r === n) {
    var e = n[1], a = n[2], t = n[5];
    r[1] = n[3], r[2] = n[6], r[3] = e, r[5] = n[7], r[6] = a, r[7] = t;
  } else
    r[0] = n[0], r[1] = n[3], r[2] = n[6], r[3] = n[1], r[4] = n[4], r[5] = n[7], r[6] = n[2], r[7] = n[5], r[8] = n[8];
  return r;
}
function Y0(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = f * i - c * h, M = -f * s + c * l, d = h * s - i * l, y = e * v + a * M + t * d;
  return y ? (y = 1 / y, r[0] = v * y, r[1] = (-f * a + t * h) * y, r[2] = (c * a - t * i) * y, r[3] = M * y, r[4] = (f * e - t * l) * y, r[5] = (-c * e + t * s) * y, r[6] = d * y, r[7] = (-h * e + a * l) * y, r[8] = (i * e - a * s) * y, r) : null;
}
function U0(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8];
  return r[0] = i * f - c * h, r[1] = t * h - a * f, r[2] = a * c - t * i, r[3] = c * l - s * f, r[4] = e * f - t * l, r[5] = t * s - e * c, r[6] = s * h - i * l, r[7] = a * l - e * h, r[8] = e * i - a * s, r;
}
function G0(r) {
  var n = r[0], e = r[1], a = r[2], t = r[3], s = r[4], i = r[5], c = r[6], l = r[7], h = r[8];
  return n * (h * s - i * l) + e * (-h * t + i * c) + a * (l * t - s * c);
}
function Me(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = n[8], M = e[0], d = e[1], y = e[2], p = e[3], m = e[4], x = e[5], $ = e[6], o = e[7], g = e[8];
  return r[0] = M * a + d * i + y * h, r[1] = M * t + d * c + y * f, r[2] = M * s + d * l + y * v, r[3] = p * a + m * i + x * h, r[4] = p * t + m * c + x * f, r[5] = p * s + m * l + x * v, r[6] = $ * a + o * i + g * h, r[7] = $ * t + o * c + g * f, r[8] = $ * s + o * l + g * v, r;
}
function X0(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = n[8], M = e[0], d = e[1];
  return r[0] = a, r[1] = t, r[2] = s, r[3] = i, r[4] = c, r[5] = l, r[6] = M * a + d * i + h, r[7] = M * t + d * c + f, r[8] = M * s + d * l + v, r;
}
function Z0(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = n[8], M = Math.sin(e), d = Math.cos(e);
  return r[0] = d * a + M * i, r[1] = d * t + M * c, r[2] = d * s + M * l, r[3] = d * i - M * a, r[4] = d * c - M * t, r[5] = d * l - M * s, r[6] = h, r[7] = f, r[8] = v, r;
}
function _0(r, n, e) {
  var a = e[0], t = e[1];
  return r[0] = a * n[0], r[1] = a * n[1], r[2] = a * n[2], r[3] = t * n[3], r[4] = t * n[4], r[5] = t * n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r;
}
function H0(r, n) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 1, r[5] = 0, r[6] = n[0], r[7] = n[1], r[8] = 1, r;
}
function Q0(r, n) {
  var e = Math.sin(n), a = Math.cos(n);
  return r[0] = a, r[1] = e, r[2] = 0, r[3] = -e, r[4] = a, r[5] = 0, r[6] = 0, r[7] = 0, r[8] = 1, r;
}
function J0(r, n) {
  return r[0] = n[0], r[1] = 0, r[2] = 0, r[3] = 0, r[4] = n[1], r[5] = 0, r[6] = 0, r[7] = 0, r[8] = 1, r;
}
function K0(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = 0, r[3] = n[2], r[4] = n[3], r[5] = 0, r[6] = n[4], r[7] = n[5], r[8] = 1, r;
}
function u0(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = e + e, c = a + a, l = t + t, h = e * i, f = a * i, v = a * c, M = t * i, d = t * c, y = t * l, p = s * i, m = s * c, x = s * l;
  return r[0] = 1 - v - y, r[3] = f - x, r[6] = M + m, r[1] = f + x, r[4] = 1 - h - y, r[7] = d - p, r[2] = M - m, r[5] = d + p, r[8] = 1 - h - v, r;
}
function ra(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = n[9], M = n[10], d = n[11], y = n[12], p = n[13], m = n[14], x = n[15], $ = e * c - a * i, o = e * l - t * i, g = e * h - s * i, w = a * l - t * c, z = a * h - s * c, S = t * h - s * l, b = f * p - v * y, q = f * m - M * y, A = f * x - d * y, I = v * m - M * p, T = v * x - d * p, F = M * x - d * m, O = $ * F - o * T + g * I + w * A - z * q + S * b;
  return O ? (O = 1 / O, r[0] = (c * F - l * T + h * I) * O, r[1] = (l * A - i * F - h * q) * O, r[2] = (i * T - c * A + h * b) * O, r[3] = (t * T - a * F - s * I) * O, r[4] = (e * F - t * A + s * q) * O, r[5] = (a * A - e * T - s * b) * O, r[6] = (p * S - m * z + x * w) * O, r[7] = (m * g - y * S - x * o) * O, r[8] = (y * z - p * g + x * $) * O, r) : null;
}
function na(r, n, e) {
  return r[0] = 2 / n, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = -2 / e, r[5] = 0, r[6] = -1, r[7] = 1, r[8] = 1, r;
}
function ea(r) {
  return "mat3(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ", " + r[4] + ", " + r[5] + ", " + r[6] + ", " + r[7] + ", " + r[8] + ")";
}
function aa(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2] + r[3] * r[3] + r[4] * r[4] + r[5] * r[5] + r[6] * r[6] + r[7] * r[7] + r[8] * r[8]);
}
function ta(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r[3] = n[3] + e[3], r[4] = n[4] + e[4], r[5] = n[5] + e[5], r[6] = n[6] + e[6], r[7] = n[7] + e[7], r[8] = n[8] + e[8], r;
}
function de(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r[2] = n[2] - e[2], r[3] = n[3] - e[3], r[4] = n[4] - e[4], r[5] = n[5] - e[5], r[6] = n[6] - e[6], r[7] = n[7] - e[7], r[8] = n[8] - e[8], r;
}
function sa(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r[3] = n[3] * e, r[4] = n[4] * e, r[5] = n[5] * e, r[6] = n[6] * e, r[7] = n[7] * e, r[8] = n[8] * e, r;
}
function ia(r, n, e, a) {
  return r[0] = n[0] + e[0] * a, r[1] = n[1] + e[1] * a, r[2] = n[2] + e[2] * a, r[3] = n[3] + e[3] * a, r[4] = n[4] + e[4] * a, r[5] = n[5] + e[5] * a, r[6] = n[6] + e[6] * a, r[7] = n[7] + e[7] * a, r[8] = n[8] + e[8] * a, r;
}
function ca(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2] && r[3] === n[3] && r[4] === n[4] && r[5] === n[5] && r[6] === n[6] && r[7] === n[7] && r[8] === n[8];
}
function la(r, n) {
  var e = r[0], a = r[1], t = r[2], s = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = n[0], M = n[1], d = n[2], y = n[3], p = n[4], m = n[5], x = n[6], $ = n[7], o = n[8];
  return Math.abs(e - v) <= j * Math.max(1, Math.abs(e), Math.abs(v)) && Math.abs(a - M) <= j * Math.max(1, Math.abs(a), Math.abs(M)) && Math.abs(t - d) <= j * Math.max(1, Math.abs(t), Math.abs(d)) && Math.abs(s - y) <= j * Math.max(1, Math.abs(s), Math.abs(y)) && Math.abs(i - p) <= j * Math.max(1, Math.abs(i), Math.abs(p)) && Math.abs(c - m) <= j * Math.max(1, Math.abs(c), Math.abs(m)) && Math.abs(l - x) <= j * Math.max(1, Math.abs(l), Math.abs(x)) && Math.abs(h - $) <= j * Math.max(1, Math.abs(h), Math.abs($)) && Math.abs(f - o) <= j * Math.max(1, Math.abs(f), Math.abs(o));
}
var ha = Me, fa = de;
const va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: ta,
  adjoint: U0,
  clone: E0,
  copy: k0,
  create: ve,
  determinant: G0,
  equals: la,
  exactEquals: ca,
  frob: aa,
  fromMat2d: K0,
  fromMat4: C0,
  fromQuat: u0,
  fromRotation: Q0,
  fromScaling: J0,
  fromTranslation: H0,
  fromValues: D0,
  identity: B0,
  invert: Y0,
  mul: ha,
  multiply: Me,
  multiplyScalar: sa,
  multiplyScalarAndAdd: ia,
  normalFromMat4: ra,
  projection: na,
  rotate: Z0,
  scale: _0,
  set: N0,
  str: ea,
  sub: fa,
  subtract: de,
  translate: X0,
  transpose: V0
}, Symbol.toStringTag, { value: "Module" }));
function Ma() {
  var r = new L(16);
  return L != Float32Array && (r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0), r[0] = 1, r[5] = 1, r[10] = 1, r[15] = 1, r;
}
function da(r) {
  var n = new L(16);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n[9] = r[9], n[10] = r[10], n[11] = r[11], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], n;
}
function ya(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r[9] = n[9], r[10] = n[10], r[11] = n[11], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15], r;
}
function ma(r, n, e, a, t, s, i, c, l, h, f, v, M, d, y, p) {
  var m = new L(16);
  return m[0] = r, m[1] = n, m[2] = e, m[3] = a, m[4] = t, m[5] = s, m[6] = i, m[7] = c, m[8] = l, m[9] = h, m[10] = f, m[11] = v, m[12] = M, m[13] = d, m[14] = y, m[15] = p, m;
}
function pa(r, n, e, a, t, s, i, c, l, h, f, v, M, d, y, p, m) {
  return r[0] = n, r[1] = e, r[2] = a, r[3] = t, r[4] = s, r[5] = i, r[6] = c, r[7] = l, r[8] = h, r[9] = f, r[10] = v, r[11] = M, r[12] = d, r[13] = y, r[14] = p, r[15] = m, r;
}
function An(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = 1, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 1, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function xa(r, n) {
  if (r === n) {
    var e = n[1], a = n[2], t = n[3], s = n[6], i = n[7], c = n[11];
    r[1] = n[4], r[2] = n[8], r[3] = n[12], r[4] = e, r[6] = n[9], r[7] = n[13], r[8] = a, r[9] = s, r[11] = n[14], r[12] = t, r[13] = i, r[14] = c;
  } else
    r[0] = n[0], r[1] = n[4], r[2] = n[8], r[3] = n[12], r[4] = n[1], r[5] = n[5], r[6] = n[9], r[7] = n[13], r[8] = n[2], r[9] = n[6], r[10] = n[10], r[11] = n[14], r[12] = n[3], r[13] = n[7], r[14] = n[11], r[15] = n[15];
  return r;
}
function ye(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = n[9], M = n[10], d = n[11], y = n[12], p = n[13], m = n[14], x = n[15], $ = e * c - a * i, o = e * l - t * i, g = e * h - s * i, w = a * l - t * c, z = a * h - s * c, S = t * h - s * l, b = f * p - v * y, q = f * m - M * y, A = f * x - d * y, I = v * m - M * p, T = v * x - d * p, F = M * x - d * m, O = $ * F - o * T + g * I + w * A - z * q + S * b;
  return O ? (O = 1 / O, r[0] = (c * F - l * T + h * I) * O, r[1] = (t * T - a * F - s * I) * O, r[2] = (p * S - m * z + x * w) * O, r[3] = (M * z - v * S - d * w) * O, r[4] = (l * A - i * F - h * q) * O, r[5] = (e * F - t * A + s * q) * O, r[6] = (m * g - y * S - x * o) * O, r[7] = (f * S - M * g + d * o) * O, r[8] = (i * T - c * A + h * b) * O, r[9] = (a * A - e * T - s * b) * O, r[10] = (y * z - p * g + x * $) * O, r[11] = (v * g - f * z - d * $) * O, r[12] = (c * q - i * I - l * b) * O, r[13] = (e * I - a * q + t * b) * O, r[14] = (p * o - y * w - m * $) * O, r[15] = (f * w - v * o + M * $) * O, r) : null;
}
function oa(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = n[9], M = n[10], d = n[11], y = n[12], p = n[13], m = n[14], x = n[15], $ = e * c - a * i, o = e * l - t * i, g = e * h - s * i, w = a * l - t * c, z = a * h - s * c, S = t * h - s * l, b = f * p - v * y, q = f * m - M * y, A = f * x - d * y, I = v * m - M * p, T = v * x - d * p, F = M * x - d * m;
  return r[0] = c * F - l * T + h * I, r[1] = t * T - a * F - s * I, r[2] = p * S - m * z + x * w, r[3] = M * z - v * S - d * w, r[4] = l * A - i * F - h * q, r[5] = e * F - t * A + s * q, r[6] = m * g - y * S - x * o, r[7] = f * S - M * g + d * o, r[8] = i * T - c * A + h * b, r[9] = a * A - e * T - s * b, r[10] = y * z - p * g + x * $, r[11] = v * g - f * z - d * $, r[12] = c * q - i * I - l * b, r[13] = e * I - a * q + t * b, r[14] = p * o - y * w - m * $, r[15] = f * w - v * o + M * $, r;
}
function $a(r) {
  var n = r[0], e = r[1], a = r[2], t = r[3], s = r[4], i = r[5], c = r[6], l = r[7], h = r[8], f = r[9], v = r[10], M = r[11], d = r[12], y = r[13], p = r[14], m = r[15], x = n * i - e * s, $ = n * c - a * s, o = e * c - a * i, g = h * y - f * d, w = h * p - v * d, z = f * p - v * y, S = n * z - e * w + a * g, b = s * z - i * w + c * g, q = h * o - f * $ + v * x, A = d * o - y * $ + p * x;
  return l * S - t * b + m * q - M * A;
}
function me(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = n[8], M = n[9], d = n[10], y = n[11], p = n[12], m = n[13], x = n[14], $ = n[15], o = e[0], g = e[1], w = e[2], z = e[3];
  return r[0] = o * a + g * c + w * v + z * p, r[1] = o * t + g * l + w * M + z * m, r[2] = o * s + g * h + w * d + z * x, r[3] = o * i + g * f + w * y + z * $, o = e[4], g = e[5], w = e[6], z = e[7], r[4] = o * a + g * c + w * v + z * p, r[5] = o * t + g * l + w * M + z * m, r[6] = o * s + g * h + w * d + z * x, r[7] = o * i + g * f + w * y + z * $, o = e[8], g = e[9], w = e[10], z = e[11], r[8] = o * a + g * c + w * v + z * p, r[9] = o * t + g * l + w * M + z * m, r[10] = o * s + g * h + w * d + z * x, r[11] = o * i + g * f + w * y + z * $, o = e[12], g = e[13], w = e[14], z = e[15], r[12] = o * a + g * c + w * v + z * p, r[13] = o * t + g * l + w * M + z * m, r[14] = o * s + g * h + w * d + z * x, r[15] = o * i + g * f + w * y + z * $, r;
}
function gn(r, n, e) {
  var a = e[0], t = e[1], s = e[2], i, c, l, h, f, v, M, d, y, p, m, x;
  return n === r ? (r[12] = n[0] * a + n[4] * t + n[8] * s + n[12], r[13] = n[1] * a + n[5] * t + n[9] * s + n[13], r[14] = n[2] * a + n[6] * t + n[10] * s + n[14], r[15] = n[3] * a + n[7] * t + n[11] * s + n[15]) : (i = n[0], c = n[1], l = n[2], h = n[3], f = n[4], v = n[5], M = n[6], d = n[7], y = n[8], p = n[9], m = n[10], x = n[11], r[0] = i, r[1] = c, r[2] = l, r[3] = h, r[4] = f, r[5] = v, r[6] = M, r[7] = d, r[8] = y, r[9] = p, r[10] = m, r[11] = x, r[12] = i * a + f * t + y * s + n[12], r[13] = c * a + v * t + p * s + n[13], r[14] = l * a + M * t + m * s + n[14], r[15] = h * a + d * t + x * s + n[15]), r;
}
function pe(r, n, e) {
  var a = e[0], t = e[1], s = e[2];
  return r[0] = n[0] * a, r[1] = n[1] * a, r[2] = n[2] * a, r[3] = n[3] * a, r[4] = n[4] * t, r[5] = n[5] * t, r[6] = n[6] * t, r[7] = n[7] * t, r[8] = n[8] * s, r[9] = n[9] * s, r[10] = n[10] * s, r[11] = n[11] * s, r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15], r;
}
function wa(r, n, e, a) {
  var t = a[0], s = a[1], i = a[2], c = Math.sqrt(t * t + s * s + i * i), l, h, f, v, M, d, y, p, m, x, $, o, g, w, z, S, b, q, A, I, T, F, O, k;
  return c < j ? null : (c = 1 / c, t *= c, s *= c, i *= c, l = Math.sin(e), h = Math.cos(e), f = 1 - h, v = n[0], M = n[1], d = n[2], y = n[3], p = n[4], m = n[5], x = n[6], $ = n[7], o = n[8], g = n[9], w = n[10], z = n[11], S = t * t * f + h, b = s * t * f + i * l, q = i * t * f - s * l, A = t * s * f - i * l, I = s * s * f + h, T = i * s * f + t * l, F = t * i * f + s * l, O = s * i * f - t * l, k = i * i * f + h, r[0] = v * S + p * b + o * q, r[1] = M * S + m * b + g * q, r[2] = d * S + x * b + w * q, r[3] = y * S + $ * b + z * q, r[4] = v * A + p * I + o * T, r[5] = M * A + m * I + g * T, r[6] = d * A + x * I + w * T, r[7] = y * A + $ * I + z * T, r[8] = v * F + p * O + o * k, r[9] = M * F + m * O + g * k, r[10] = d * F + x * O + w * k, r[11] = y * F + $ * O + z * k, n !== r && (r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15]), r);
}
function ga(r, n, e) {
  var a = Math.sin(e), t = Math.cos(e), s = n[4], i = n[5], c = n[6], l = n[7], h = n[8], f = n[9], v = n[10], M = n[11];
  return n !== r && (r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15]), r[4] = s * t + h * a, r[5] = i * t + f * a, r[6] = c * t + v * a, r[7] = l * t + M * a, r[8] = h * t - s * a, r[9] = f * t - i * a, r[10] = v * t - c * a, r[11] = M * t - l * a, r;
}
function za(r, n, e) {
  var a = Math.sin(e), t = Math.cos(e), s = n[0], i = n[1], c = n[2], l = n[3], h = n[8], f = n[9], v = n[10], M = n[11];
  return n !== r && (r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15]), r[0] = s * t - h * a, r[1] = i * t - f * a, r[2] = c * t - v * a, r[3] = l * t - M * a, r[8] = s * a + h * t, r[9] = i * a + f * t, r[10] = c * a + v * t, r[11] = l * a + M * t, r;
}
function ba(r, n, e) {
  var a = Math.sin(e), t = Math.cos(e), s = n[0], i = n[1], c = n[2], l = n[3], h = n[4], f = n[5], v = n[6], M = n[7];
  return n !== r && (r[8] = n[8], r[9] = n[9], r[10] = n[10], r[11] = n[11], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15]), r[0] = s * t + h * a, r[1] = i * t + f * a, r[2] = c * t + v * a, r[3] = l * t + M * a, r[4] = h * t - s * a, r[5] = f * t - i * a, r[6] = v * t - c * a, r[7] = M * t - l * a, r;
}
function Aa(r, n) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = 1, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 1, r[11] = 0, r[12] = n[0], r[13] = n[1], r[14] = n[2], r[15] = 1, r;
}
function qa(r, n) {
  return r[0] = n[0], r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = n[1], r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = n[2], r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function Oa(r, n, e) {
  var a = e[0], t = e[1], s = e[2], i = Math.sqrt(a * a + t * t + s * s), c, l, h;
  return i < j ? null : (i = 1 / i, a *= i, t *= i, s *= i, c = Math.sin(n), l = Math.cos(n), h = 1 - l, r[0] = a * a * h + l, r[1] = t * a * h + s * c, r[2] = s * a * h - t * c, r[3] = 0, r[4] = a * t * h - s * c, r[5] = t * t * h + l, r[6] = s * t * h + a * c, r[7] = 0, r[8] = a * s * h + t * c, r[9] = t * s * h - a * c, r[10] = s * s * h + l, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r);
}
function ja(r, n) {
  var e = Math.sin(n), a = Math.cos(n);
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = a, r[6] = e, r[7] = 0, r[8] = 0, r[9] = -e, r[10] = a, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function Ta(r, n) {
  var e = Math.sin(n), a = Math.cos(n);
  return r[0] = a, r[1] = 0, r[2] = -e, r[3] = 0, r[4] = 0, r[5] = 1, r[6] = 0, r[7] = 0, r[8] = e, r[9] = 0, r[10] = a, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function Sa(r, n) {
  var e = Math.sin(n), a = Math.cos(n);
  return r[0] = a, r[1] = e, r[2] = 0, r[3] = 0, r[4] = -e, r[5] = a, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 1, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function xe(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = a + a, l = t + t, h = s + s, f = a * c, v = a * l, M = a * h, d = t * l, y = t * h, p = s * h, m = i * c, x = i * l, $ = i * h;
  return r[0] = 1 - (d + p), r[1] = v + $, r[2] = M - x, r[3] = 0, r[4] = v - $, r[5] = 1 - (f + p), r[6] = y + m, r[7] = 0, r[8] = M + x, r[9] = y - m, r[10] = 1 - (f + d), r[11] = 0, r[12] = e[0], r[13] = e[1], r[14] = e[2], r[15] = 1, r;
}
function Fa(r, n) {
  var e = new L(3), a = -n[0], t = -n[1], s = -n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = a * a + t * t + s * s + i * i;
  return v > 0 ? (e[0] = (c * i + f * a + l * s - h * t) * 2 / v, e[1] = (l * i + f * t + h * a - c * s) * 2 / v, e[2] = (h * i + f * s + c * t - l * a) * 2 / v) : (e[0] = (c * i + f * a + l * s - h * t) * 2, e[1] = (l * i + f * t + h * a - c * s) * 2, e[2] = (h * i + f * s + c * t - l * a) * 2), xe(r, n, e), r;
}
function oe(r, n) {
  return r[0] = n[12], r[1] = n[13], r[2] = n[14], r;
}
function $e(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[4], i = n[5], c = n[6], l = n[8], h = n[9], f = n[10];
  return r[0] = Math.sqrt(e * e + a * a + t * t), r[1] = Math.sqrt(s * s + i * i + c * c), r[2] = Math.sqrt(l * l + h * h + f * f), r;
}
function we(r, n) {
  var e = new L(3);
  $e(e, n);
  var a = 1 / e[0], t = 1 / e[1], s = 1 / e[2], i = n[0] * a, c = n[1] * t, l = n[2] * s, h = n[4] * a, f = n[5] * t, v = n[6] * s, M = n[8] * a, d = n[9] * t, y = n[10] * s, p = i + f + y, m = 0;
  return p > 0 ? (m = Math.sqrt(p + 1) * 2, r[3] = 0.25 * m, r[0] = (v - d) / m, r[1] = (M - l) / m, r[2] = (c - h) / m) : i > f && i > y ? (m = Math.sqrt(1 + i - f - y) * 2, r[3] = (v - d) / m, r[0] = 0.25 * m, r[1] = (c + h) / m, r[2] = (M + l) / m) : f > y ? (m = Math.sqrt(1 + f - i - y) * 2, r[3] = (M - l) / m, r[0] = (c + h) / m, r[1] = 0.25 * m, r[2] = (v + d) / m) : (m = Math.sqrt(1 + y - i - f) * 2, r[3] = (c - h) / m, r[0] = (M + l) / m, r[1] = (v + d) / m, r[2] = 0.25 * m), r;
}
function Ia(r, n, e, a) {
  n[0] = a[12], n[1] = a[13], n[2] = a[14];
  var t = a[0], s = a[1], i = a[2], c = a[4], l = a[5], h = a[6], f = a[8], v = a[9], M = a[10];
  e[0] = Math.sqrt(t * t + s * s + i * i), e[1] = Math.sqrt(c * c + l * l + h * h), e[2] = Math.sqrt(f * f + v * v + M * M);
  var d = 1 / e[0], y = 1 / e[1], p = 1 / e[2], m = t * d, x = s * y, $ = i * p, o = c * d, g = l * y, w = h * p, z = f * d, S = v * y, b = M * p, q = m + g + b, A = 0;
  return q > 0 ? (A = Math.sqrt(q + 1) * 2, r[3] = 0.25 * A, r[0] = (w - S) / A, r[1] = (z - $) / A, r[2] = (x - o) / A) : m > g && m > b ? (A = Math.sqrt(1 + m - g - b) * 2, r[3] = (w - S) / A, r[0] = 0.25 * A, r[1] = (x + o) / A, r[2] = (z + $) / A) : g > b ? (A = Math.sqrt(1 + g - m - b) * 2, r[3] = (z - $) / A, r[0] = (x + o) / A, r[1] = 0.25 * A, r[2] = (w + S) / A) : (A = Math.sqrt(1 + b - m - g) * 2, r[3] = (x - o) / A, r[0] = (z + $) / A, r[1] = (w + S) / A, r[2] = 0.25 * A), r;
}
function Ra(r, n, e, a) {
  var t = n[0], s = n[1], i = n[2], c = n[3], l = t + t, h = s + s, f = i + i, v = t * l, M = t * h, d = t * f, y = s * h, p = s * f, m = i * f, x = c * l, $ = c * h, o = c * f, g = a[0], w = a[1], z = a[2];
  return r[0] = (1 - (y + m)) * g, r[1] = (M + o) * g, r[2] = (d - $) * g, r[3] = 0, r[4] = (M - o) * w, r[5] = (1 - (v + m)) * w, r[6] = (p + x) * w, r[7] = 0, r[8] = (d + $) * z, r[9] = (p - x) * z, r[10] = (1 - (v + y)) * z, r[11] = 0, r[12] = e[0], r[13] = e[1], r[14] = e[2], r[15] = 1, r;
}
function La(r, n, e, a, t) {
  var s = n[0], i = n[1], c = n[2], l = n[3], h = s + s, f = i + i, v = c + c, M = s * h, d = s * f, y = s * v, p = i * f, m = i * v, x = c * v, $ = l * h, o = l * f, g = l * v, w = a[0], z = a[1], S = a[2], b = t[0], q = t[1], A = t[2], I = (1 - (p + x)) * w, T = (d + g) * w, F = (y - o) * w, O = (d - g) * z, k = (1 - (M + x)) * z, U = (m + $) * z, E = (y + o) * S, X = (m - $) * S, Z = (1 - (M + p)) * S;
  return r[0] = I, r[1] = T, r[2] = F, r[3] = 0, r[4] = O, r[5] = k, r[6] = U, r[7] = 0, r[8] = E, r[9] = X, r[10] = Z, r[11] = 0, r[12] = e[0] + b - (I * b + O * q + E * A), r[13] = e[1] + q - (T * b + k * q + X * A), r[14] = e[2] + A - (F * b + U * q + Z * A), r[15] = 1, r;
}
function Pa(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = e + e, c = a + a, l = t + t, h = e * i, f = a * i, v = a * c, M = t * i, d = t * c, y = t * l, p = s * i, m = s * c, x = s * l;
  return r[0] = 1 - v - y, r[1] = f + x, r[2] = M - m, r[3] = 0, r[4] = f - x, r[5] = 1 - h - y, r[6] = d + p, r[7] = 0, r[8] = M + m, r[9] = d - p, r[10] = 1 - h - v, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, r;
}
function Wa(r, n, e, a, t, s, i) {
  var c = 1 / (e - n), l = 1 / (t - a), h = 1 / (s - i);
  return r[0] = s * 2 * c, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = s * 2 * l, r[6] = 0, r[7] = 0, r[8] = (e + n) * c, r[9] = (t + a) * l, r[10] = (i + s) * h, r[11] = -1, r[12] = 0, r[13] = 0, r[14] = i * s * 2 * h, r[15] = 0, r;
}
function ge(r, n, e, a, t) {
  var s = 1 / Math.tan(n / 2);
  if (r[0] = s / e, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = s, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[11] = -1, r[12] = 0, r[13] = 0, r[15] = 0, t != null && t !== 1 / 0) {
    var i = 1 / (a - t);
    r[10] = (t + a) * i, r[14] = 2 * t * a * i;
  } else
    r[10] = -1, r[14] = -2 * a;
  return r;
}
var Ca = ge;
function Ea(r, n, e, a, t) {
  var s = 1 / Math.tan(n / 2);
  if (r[0] = s / e, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = s, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[11] = -1, r[12] = 0, r[13] = 0, r[15] = 0, t != null && t !== 1 / 0) {
    var i = 1 / (a - t);
    r[10] = t * i, r[14] = t * a * i;
  } else
    r[10] = -1, r[14] = -a;
  return r;
}
function ka(r, n, e, a) {
  var t = Math.tan(n.upDegrees * Math.PI / 180), s = Math.tan(n.downDegrees * Math.PI / 180), i = Math.tan(n.leftDegrees * Math.PI / 180), c = Math.tan(n.rightDegrees * Math.PI / 180), l = 2 / (i + c), h = 2 / (t + s);
  return r[0] = l, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = h, r[6] = 0, r[7] = 0, r[8] = -((i - c) * l * 0.5), r[9] = (t - s) * h * 0.5, r[10] = a / (e - a), r[11] = -1, r[12] = 0, r[13] = 0, r[14] = a * e / (e - a), r[15] = 0, r;
}
function ze(r, n, e, a, t, s, i) {
  var c = 1 / (n - e), l = 1 / (a - t), h = 1 / (s - i);
  return r[0] = -2 * c, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = -2 * l, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 2 * h, r[11] = 0, r[12] = (n + e) * c, r[13] = (t + a) * l, r[14] = (i + s) * h, r[15] = 1, r;
}
var be = ze;
function Da(r, n, e, a, t, s, i) {
  var c = 1 / (n - e), l = 1 / (a - t), h = 1 / (s - i);
  return r[0] = -2 * c, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = -2 * l, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = h, r[11] = 0, r[12] = (n + e) * c, r[13] = (t + a) * l, r[14] = s * h, r[15] = 1, r;
}
function Na(r, n, e, a) {
  var t, s, i, c, l, h, f, v, M, d, y = n[0], p = n[1], m = n[2], x = a[0], $ = a[1], o = a[2], g = e[0], w = e[1], z = e[2];
  return Math.abs(y - g) < j && Math.abs(p - w) < j && Math.abs(m - z) < j ? An(r) : (f = y - g, v = p - w, M = m - z, d = 1 / Math.sqrt(f * f + v * v + M * M), f *= d, v *= d, M *= d, t = $ * M - o * v, s = o * f - x * M, i = x * v - $ * f, d = Math.sqrt(t * t + s * s + i * i), d ? (d = 1 / d, t *= d, s *= d, i *= d) : (t = 0, s = 0, i = 0), c = v * i - M * s, l = M * t - f * i, h = f * s - v * t, d = Math.sqrt(c * c + l * l + h * h), d ? (d = 1 / d, c *= d, l *= d, h *= d) : (c = 0, l = 0, h = 0), r[0] = t, r[1] = c, r[2] = f, r[3] = 0, r[4] = s, r[5] = l, r[6] = v, r[7] = 0, r[8] = i, r[9] = h, r[10] = M, r[11] = 0, r[12] = -(t * y + s * p + i * m), r[13] = -(c * y + l * p + h * m), r[14] = -(f * y + v * p + M * m), r[15] = 1, r);
}
function Ba(r, n, e, a) {
  var t = n[0], s = n[1], i = n[2], c = a[0], l = a[1], h = a[2], f = t - e[0], v = s - e[1], M = i - e[2], d = f * f + v * v + M * M;
  d > 0 && (d = 1 / Math.sqrt(d), f *= d, v *= d, M *= d);
  var y = l * M - h * v, p = h * f - c * M, m = c * v - l * f;
  return d = y * y + p * p + m * m, d > 0 && (d = 1 / Math.sqrt(d), y *= d, p *= d, m *= d), r[0] = y, r[1] = p, r[2] = m, r[3] = 0, r[4] = v * m - M * p, r[5] = M * y - f * m, r[6] = f * p - v * y, r[7] = 0, r[8] = f, r[9] = v, r[10] = M, r[11] = 0, r[12] = t, r[13] = s, r[14] = i, r[15] = 1, r;
}
function Va(r) {
  return "mat4(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ", " + r[4] + ", " + r[5] + ", " + r[6] + ", " + r[7] + ", " + r[8] + ", " + r[9] + ", " + r[10] + ", " + r[11] + ", " + r[12] + ", " + r[13] + ", " + r[14] + ", " + r[15] + ")";
}
function Ya(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2] + r[3] * r[3] + r[4] * r[4] + r[5] * r[5] + r[6] * r[6] + r[7] * r[7] + r[8] * r[8] + r[9] * r[9] + r[10] * r[10] + r[11] * r[11] + r[12] * r[12] + r[13] * r[13] + r[14] * r[14] + r[15] * r[15]);
}
function Ua(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r[3] = n[3] + e[3], r[4] = n[4] + e[4], r[5] = n[5] + e[5], r[6] = n[6] + e[6], r[7] = n[7] + e[7], r[8] = n[8] + e[8], r[9] = n[9] + e[9], r[10] = n[10] + e[10], r[11] = n[11] + e[11], r[12] = n[12] + e[12], r[13] = n[13] + e[13], r[14] = n[14] + e[14], r[15] = n[15] + e[15], r;
}
function Ae(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r[2] = n[2] - e[2], r[3] = n[3] - e[3], r[4] = n[4] - e[4], r[5] = n[5] - e[5], r[6] = n[6] - e[6], r[7] = n[7] - e[7], r[8] = n[8] - e[8], r[9] = n[9] - e[9], r[10] = n[10] - e[10], r[11] = n[11] - e[11], r[12] = n[12] - e[12], r[13] = n[13] - e[13], r[14] = n[14] - e[14], r[15] = n[15] - e[15], r;
}
function Ga(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r[3] = n[3] * e, r[4] = n[4] * e, r[5] = n[5] * e, r[6] = n[6] * e, r[7] = n[7] * e, r[8] = n[8] * e, r[9] = n[9] * e, r[10] = n[10] * e, r[11] = n[11] * e, r[12] = n[12] * e, r[13] = n[13] * e, r[14] = n[14] * e, r[15] = n[15] * e, r;
}
function Xa(r, n, e, a) {
  return r[0] = n[0] + e[0] * a, r[1] = n[1] + e[1] * a, r[2] = n[2] + e[2] * a, r[3] = n[3] + e[3] * a, r[4] = n[4] + e[4] * a, r[5] = n[5] + e[5] * a, r[6] = n[6] + e[6] * a, r[7] = n[7] + e[7] * a, r[8] = n[8] + e[8] * a, r[9] = n[9] + e[9] * a, r[10] = n[10] + e[10] * a, r[11] = n[11] + e[11] * a, r[12] = n[12] + e[12] * a, r[13] = n[13] + e[13] * a, r[14] = n[14] + e[14] * a, r[15] = n[15] + e[15] * a, r;
}
function Za(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2] && r[3] === n[3] && r[4] === n[4] && r[5] === n[5] && r[6] === n[6] && r[7] === n[7] && r[8] === n[8] && r[9] === n[9] && r[10] === n[10] && r[11] === n[11] && r[12] === n[12] && r[13] === n[13] && r[14] === n[14] && r[15] === n[15];
}
function _a(r, n) {
  var e = r[0], a = r[1], t = r[2], s = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], M = r[10], d = r[11], y = r[12], p = r[13], m = r[14], x = r[15], $ = n[0], o = n[1], g = n[2], w = n[3], z = n[4], S = n[5], b = n[6], q = n[7], A = n[8], I = n[9], T = n[10], F = n[11], O = n[12], k = n[13], U = n[14], E = n[15];
  return Math.abs(e - $) <= j * Math.max(1, Math.abs(e), Math.abs($)) && Math.abs(a - o) <= j * Math.max(1, Math.abs(a), Math.abs(o)) && Math.abs(t - g) <= j * Math.max(1, Math.abs(t), Math.abs(g)) && Math.abs(s - w) <= j * Math.max(1, Math.abs(s), Math.abs(w)) && Math.abs(i - z) <= j * Math.max(1, Math.abs(i), Math.abs(z)) && Math.abs(c - S) <= j * Math.max(1, Math.abs(c), Math.abs(S)) && Math.abs(l - b) <= j * Math.max(1, Math.abs(l), Math.abs(b)) && Math.abs(h - q) <= j * Math.max(1, Math.abs(h), Math.abs(q)) && Math.abs(f - A) <= j * Math.max(1, Math.abs(f), Math.abs(A)) && Math.abs(v - I) <= j * Math.max(1, Math.abs(v), Math.abs(I)) && Math.abs(M - T) <= j * Math.max(1, Math.abs(M), Math.abs(T)) && Math.abs(d - F) <= j * Math.max(1, Math.abs(d), Math.abs(F)) && Math.abs(y - O) <= j * Math.max(1, Math.abs(y), Math.abs(O)) && Math.abs(p - k) <= j * Math.max(1, Math.abs(p), Math.abs(k)) && Math.abs(m - U) <= j * Math.max(1, Math.abs(m), Math.abs(U)) && Math.abs(x - E) <= j * Math.max(1, Math.abs(x), Math.abs(E));
}
var Ha = me, Qa = Ae;
const qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Ua,
  adjoint: oa,
  clone: da,
  copy: ya,
  create: Ma,
  decompose: Ia,
  determinant: $a,
  equals: _a,
  exactEquals: Za,
  frob: Ya,
  fromQuat: Pa,
  fromQuat2: Fa,
  fromRotation: Oa,
  fromRotationTranslation: xe,
  fromRotationTranslationScale: Ra,
  fromRotationTranslationScaleOrigin: La,
  fromScaling: qa,
  fromTranslation: Aa,
  fromValues: ma,
  fromXRotation: ja,
  fromYRotation: Ta,
  fromZRotation: Sa,
  frustum: Wa,
  getRotation: we,
  getScaling: $e,
  getTranslation: oe,
  identity: An,
  invert: ye,
  lookAt: Na,
  mul: Ha,
  multiply: me,
  multiplyScalar: Ga,
  multiplyScalarAndAdd: Xa,
  ortho: be,
  orthoNO: ze,
  orthoZO: Da,
  perspective: Ca,
  perspectiveFromFieldOfView: ka,
  perspectiveNO: ge,
  perspectiveZO: Ea,
  rotate: wa,
  rotateX: ga,
  rotateY: za,
  rotateZ: ba,
  scale: pe,
  set: pa,
  str: Va,
  sub: Qa,
  subtract: Ae,
  targetTo: Ba,
  translate: gn,
  transpose: xa
}, Symbol.toStringTag, { value: "Module" }));
function qn() {
  var r = new L(3);
  return L != Float32Array && (r[0] = 0, r[1] = 0, r[2] = 0), r;
}
function Ja(r) {
  var n = new L(3);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n;
}
function Oe(r) {
  var n = r[0], e = r[1], a = r[2];
  return Math.sqrt(n * n + e * e + a * a);
}
function zn(r, n, e) {
  var a = new L(3);
  return a[0] = r, a[1] = n, a[2] = e, a;
}
function Ka(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r;
}
function ua(r, n, e, a) {
  return r[0] = n, r[1] = e, r[2] = a, r;
}
function rt(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r;
}
function je(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r[2] = n[2] - e[2], r;
}
function Te(r, n, e) {
  return r[0] = n[0] * e[0], r[1] = n[1] * e[1], r[2] = n[2] * e[2], r;
}
function Se(r, n, e) {
  return r[0] = n[0] / e[0], r[1] = n[1] / e[1], r[2] = n[2] / e[2], r;
}
function nt(r, n) {
  return r[0] = Math.ceil(n[0]), r[1] = Math.ceil(n[1]), r[2] = Math.ceil(n[2]), r;
}
function et(r, n) {
  return r[0] = Math.floor(n[0]), r[1] = Math.floor(n[1]), r[2] = Math.floor(n[2]), r;
}
function at(r, n, e) {
  return r[0] = Math.min(n[0], e[0]), r[1] = Math.min(n[1], e[1]), r[2] = Math.min(n[2], e[2]), r;
}
function tt(r, n, e) {
  return r[0] = Math.max(n[0], e[0]), r[1] = Math.max(n[1], e[1]), r[2] = Math.max(n[2], e[2]), r;
}
function st(r, n) {
  return r[0] = mr(n[0]), r[1] = mr(n[1]), r[2] = mr(n[2]), r;
}
function it(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r;
}
function ct(r, n, e, a) {
  return r[0] = n[0] + e[0] * a, r[1] = n[1] + e[1] * a, r[2] = n[2] + e[2] * a, r;
}
function Fe(r, n) {
  var e = n[0] - r[0], a = n[1] - r[1], t = n[2] - r[2];
  return Math.sqrt(e * e + a * a + t * t);
}
function Ie(r, n) {
  var e = n[0] - r[0], a = n[1] - r[1], t = n[2] - r[2];
  return e * e + a * a + t * t;
}
function Re(r) {
  var n = r[0], e = r[1], a = r[2];
  return n * n + e * e + a * a;
}
function lt(r, n) {
  return r[0] = -n[0], r[1] = -n[1], r[2] = -n[2], r;
}
function ht(r, n) {
  return r[0] = 1 / n[0], r[1] = 1 / n[1], r[2] = 1 / n[2], r;
}
function Le(r, n) {
  var e = n[0], a = n[1], t = n[2], s = e * e + a * a + t * t;
  return s > 0 && (s = 1 / Math.sqrt(s)), r[0] = n[0] * s, r[1] = n[1] * s, r[2] = n[2] * s, r;
}
function ur(r, n) {
  return r[0] * n[0] + r[1] * n[1] + r[2] * n[2];
}
function Br(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = e[0], c = e[1], l = e[2];
  return r[0] = t * l - s * c, r[1] = s * i - a * l, r[2] = a * c - t * i, r;
}
function ft(r, n, e, a) {
  var t = n[0], s = n[1], i = n[2];
  return r[0] = t + a * (e[0] - t), r[1] = s + a * (e[1] - s), r[2] = i + a * (e[2] - i), r;
}
function vt(r, n, e, a) {
  var t = Math.acos(Math.min(Math.max(ur(n, e), -1), 1)), s = Math.sin(t), i = Math.sin((1 - a) * t) / s, c = Math.sin(a * t) / s;
  return r[0] = i * n[0] + c * e[0], r[1] = i * n[1] + c * e[1], r[2] = i * n[2] + c * e[2], r;
}
function Mt(r, n, e, a, t, s) {
  var i = s * s, c = i * (2 * s - 3) + 1, l = i * (s - 2) + s, h = i * (s - 1), f = i * (3 - 2 * s);
  return r[0] = n[0] * c + e[0] * l + a[0] * h + t[0] * f, r[1] = n[1] * c + e[1] * l + a[1] * h + t[1] * f, r[2] = n[2] * c + e[2] * l + a[2] * h + t[2] * f, r;
}
function dt(r, n, e, a, t, s) {
  var i = 1 - s, c = i * i, l = s * s, h = c * i, f = 3 * s * c, v = 3 * l * i, M = l * s;
  return r[0] = n[0] * h + e[0] * f + a[0] * v + t[0] * M, r[1] = n[1] * h + e[1] * f + a[1] * v + t[1] * M, r[2] = n[2] * h + e[2] * f + a[2] * v + t[2] * M, r;
}
function yt(r, n) {
  n = n === void 0 ? 1 : n;
  var e = yr() * 2 * Math.PI, a = yr() * 2 - 1, t = Math.sqrt(1 - a * a) * n;
  return r[0] = Math.cos(e) * t, r[1] = Math.sin(e) * t, r[2] = a * n, r;
}
function Yr(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = e[3] * a + e[7] * t + e[11] * s + e[15];
  return i = i || 1, r[0] = (e[0] * a + e[4] * t + e[8] * s + e[12]) / i, r[1] = (e[1] * a + e[5] * t + e[9] * s + e[13]) / i, r[2] = (e[2] * a + e[6] * t + e[10] * s + e[14]) / i, r;
}
function mt(r, n, e) {
  var a = n[0], t = n[1], s = n[2];
  return r[0] = a * e[0] + t * e[3] + s * e[6], r[1] = a * e[1] + t * e[4] + s * e[7], r[2] = a * e[2] + t * e[5] + s * e[8], r;
}
function pt(r, n, e) {
  var a = e[0], t = e[1], s = e[2], i = e[3], c = n[0], l = n[1], h = n[2], f = t * h - s * l, v = s * c - a * h, M = a * l - t * c;
  return f = f + f, v = v + v, M = M + M, r[0] = c + i * f + t * M - s * v, r[1] = l + i * v + s * f - a * M, r[2] = h + i * M + a * v - t * f, r;
}
function xt(r, n, e, a) {
  var t = [], s = [];
  return t[0] = n[0] - e[0], t[1] = n[1] - e[1], t[2] = n[2] - e[2], s[0] = t[0], s[1] = t[1] * Math.cos(a) - t[2] * Math.sin(a), s[2] = t[1] * Math.sin(a) + t[2] * Math.cos(a), r[0] = s[0] + e[0], r[1] = s[1] + e[1], r[2] = s[2] + e[2], r;
}
function ot(r, n, e, a) {
  var t = [], s = [];
  return t[0] = n[0] - e[0], t[1] = n[1] - e[1], t[2] = n[2] - e[2], s[0] = t[2] * Math.sin(a) + t[0] * Math.cos(a), s[1] = t[1], s[2] = t[2] * Math.cos(a) - t[0] * Math.sin(a), r[0] = s[0] + e[0], r[1] = s[1] + e[1], r[2] = s[2] + e[2], r;
}
function $t(r, n, e, a) {
  var t = [], s = [];
  return t[0] = n[0] - e[0], t[1] = n[1] - e[1], t[2] = n[2] - e[2], s[0] = t[0] * Math.cos(a) - t[1] * Math.sin(a), s[1] = t[0] * Math.sin(a) + t[1] * Math.cos(a), s[2] = t[2], r[0] = s[0] + e[0], r[1] = s[1] + e[1], r[2] = s[2] + e[2], r;
}
function wt(r, n) {
  var e = r[0], a = r[1], t = r[2], s = n[0], i = n[1], c = n[2], l = Math.sqrt((e * e + a * a + t * t) * (s * s + i * i + c * c)), h = l && ur(r, n) / l;
  return Math.acos(Math.min(Math.max(h, -1), 1));
}
function gt(r) {
  return r[0] = 0, r[1] = 0, r[2] = 0, r;
}
function zt(r) {
  return "vec3(" + r[0] + ", " + r[1] + ", " + r[2] + ")";
}
function bt(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2];
}
function At(r, n) {
  var e = r[0], a = r[1], t = r[2], s = n[0], i = n[1], c = n[2];
  return Math.abs(e - s) <= j * Math.max(1, Math.abs(e), Math.abs(s)) && Math.abs(a - i) <= j * Math.max(1, Math.abs(a), Math.abs(i)) && Math.abs(t - c) <= j * Math.max(1, Math.abs(t), Math.abs(c));
}
var qt = je, Ot = Te, jt = Se, Tt = Fe, St = Ie, Pe = Oe, Ft = Re, It = (function() {
  var r = qn();
  return function(n, e, a, t, s, i) {
    var c, l;
    for (e || (e = 3), a || (a = 0), t ? l = Math.min(t * e + a, n.length) : l = n.length, c = a; c < l; c += e)
      r[0] = n[c], r[1] = n[c + 1], r[2] = n[c + 2], s(r, r, i), n[c] = r[0], n[c + 1] = r[1], n[c + 2] = r[2];
    return n;
  };
})();
const Rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: rt,
  angle: wt,
  bezier: dt,
  ceil: nt,
  clone: Ja,
  copy: Ka,
  create: qn,
  cross: Br,
  dist: Tt,
  distance: Fe,
  div: jt,
  divide: Se,
  dot: ur,
  equals: At,
  exactEquals: bt,
  floor: et,
  forEach: It,
  fromValues: zn,
  hermite: Mt,
  inverse: ht,
  len: Pe,
  length: Oe,
  lerp: ft,
  max: tt,
  min: at,
  mul: Ot,
  multiply: Te,
  negate: lt,
  normalize: Le,
  random: yt,
  rotateX: xt,
  rotateY: ot,
  rotateZ: $t,
  round: st,
  scale: it,
  scaleAndAdd: ct,
  set: ua,
  slerp: vt,
  sqrDist: St,
  sqrLen: Ft,
  squaredDistance: Ie,
  squaredLength: Re,
  str: zt,
  sub: qt,
  subtract: je,
  transformMat3: mt,
  transformMat4: Yr,
  transformQuat: pt,
  zero: gt
}, Symbol.toStringTag, { value: "Module" }));
function We() {
  var r = new L(4);
  return L != Float32Array && (r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0), r;
}
function Ce(r) {
  var n = new L(4);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n;
}
function Ee(r, n, e, a) {
  var t = new L(4);
  return t[0] = r, t[1] = n, t[2] = e, t[3] = a, t;
}
function ke(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function De(r, n, e, a, t) {
  return r[0] = n, r[1] = e, r[2] = a, r[3] = t, r;
}
function Ne(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r[3] = n[3] + e[3], r;
}
function Be(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r[2] = n[2] - e[2], r[3] = n[3] - e[3], r;
}
function Ve(r, n, e) {
  return r[0] = n[0] * e[0], r[1] = n[1] * e[1], r[2] = n[2] * e[2], r[3] = n[3] * e[3], r;
}
function Ye(r, n, e) {
  return r[0] = n[0] / e[0], r[1] = n[1] / e[1], r[2] = n[2] / e[2], r[3] = n[3] / e[3], r;
}
function Lt(r, n) {
  return r[0] = Math.ceil(n[0]), r[1] = Math.ceil(n[1]), r[2] = Math.ceil(n[2]), r[3] = Math.ceil(n[3]), r;
}
function Pt(r, n) {
  return r[0] = Math.floor(n[0]), r[1] = Math.floor(n[1]), r[2] = Math.floor(n[2]), r[3] = Math.floor(n[3]), r;
}
function Wt(r, n, e) {
  return r[0] = Math.min(n[0], e[0]), r[1] = Math.min(n[1], e[1]), r[2] = Math.min(n[2], e[2]), r[3] = Math.min(n[3], e[3]), r;
}
function Ct(r, n, e) {
  return r[0] = Math.max(n[0], e[0]), r[1] = Math.max(n[1], e[1]), r[2] = Math.max(n[2], e[2]), r[3] = Math.max(n[3], e[3]), r;
}
function Et(r, n) {
  return r[0] = mr(n[0]), r[1] = mr(n[1]), r[2] = mr(n[2]), r[3] = mr(n[3]), r;
}
function Ue(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r[3] = n[3] * e, r;
}
function kt(r, n, e, a) {
  return r[0] = n[0] + e[0] * a, r[1] = n[1] + e[1] * a, r[2] = n[2] + e[2] * a, r[3] = n[3] + e[3] * a, r;
}
function Ge(r, n) {
  var e = n[0] - r[0], a = n[1] - r[1], t = n[2] - r[2], s = n[3] - r[3];
  return Math.sqrt(e * e + a * a + t * t + s * s);
}
function Xe(r, n) {
  var e = n[0] - r[0], a = n[1] - r[1], t = n[2] - r[2], s = n[3] - r[3];
  return e * e + a * a + t * t + s * s;
}
function On(r) {
  var n = r[0], e = r[1], a = r[2], t = r[3];
  return Math.sqrt(n * n + e * e + a * a + t * t);
}
function jn(r) {
  var n = r[0], e = r[1], a = r[2], t = r[3];
  return n * n + e * e + a * a + t * t;
}
function Dt(r, n) {
  return r[0] = -n[0], r[1] = -n[1], r[2] = -n[2], r[3] = -n[3], r;
}
function Nt(r, n) {
  return r[0] = 1 / n[0], r[1] = 1 / n[1], r[2] = 1 / n[2], r[3] = 1 / n[3], r;
}
function Ze(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = e * e + a * a + t * t + s * s;
  return i > 0 && (i = 1 / Math.sqrt(i)), r[0] = e * i, r[1] = a * i, r[2] = t * i, r[3] = s * i, r;
}
function Tn(r, n) {
  return r[0] * n[0] + r[1] * n[1] + r[2] * n[2] + r[3] * n[3];
}
function Bt(r, n, e, a) {
  var t = e[0] * a[1] - e[1] * a[0], s = e[0] * a[2] - e[2] * a[0], i = e[0] * a[3] - e[3] * a[0], c = e[1] * a[2] - e[2] * a[1], l = e[1] * a[3] - e[3] * a[1], h = e[2] * a[3] - e[3] * a[2], f = n[0], v = n[1], M = n[2], d = n[3];
  return r[0] = v * h - M * l + d * c, r[1] = -(f * h) + M * i - d * s, r[2] = f * l - v * i + d * t, r[3] = -(f * c) + v * s - M * t, r;
}
function _e(r, n, e, a) {
  var t = n[0], s = n[1], i = n[2], c = n[3];
  return r[0] = t + a * (e[0] - t), r[1] = s + a * (e[1] - s), r[2] = i + a * (e[2] - i), r[3] = c + a * (e[3] - c), r;
}
function Vt(r, n) {
  n = n === void 0 ? 1 : n;
  var e, a, t, s, i, c, l;
  l = yr(), e = l * 2 - 1, a = (4 * yr() - 2) * Math.sqrt(l * -l + l), i = e * e + a * a, l = yr(), t = l * 2 - 1, s = (4 * yr() - 2) * Math.sqrt(l * -l + l), c = t * t + s * s;
  var h = Math.sqrt((1 - i) / c);
  return r[0] = n * e, r[1] = n * a, r[2] = n * t * h, r[3] = n * s * h, r;
}
function Yt(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3];
  return r[0] = e[0] * a + e[4] * t + e[8] * s + e[12] * i, r[1] = e[1] * a + e[5] * t + e[9] * s + e[13] * i, r[2] = e[2] * a + e[6] * t + e[10] * s + e[14] * i, r[3] = e[3] * a + e[7] * t + e[11] * s + e[15] * i, r;
}
function Ut(r, n, e) {
  var a = e[0], t = e[1], s = e[2], i = e[3], c = n[0], l = n[1], h = n[2], f = t * h - s * l, v = s * c - a * h, M = a * l - t * c;
  return f = f + f, v = v + v, M = M + M, r[0] = c + i * f + t * M - s * v, r[1] = l + i * v + s * f - a * M, r[2] = h + i * M + a * v - t * f, r[3] = n[3], r;
}
function Gt(r) {
  return r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0, r;
}
function Xt(r) {
  return "vec4(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ")";
}
function He(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2] && r[3] === n[3];
}
function Zt(r, n) {
  var e = r[0], a = r[1], t = r[2], s = r[3], i = n[0], c = n[1], l = n[2], h = n[3];
  return Math.abs(e - i) <= j * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(a - c) <= j * Math.max(1, Math.abs(a), Math.abs(c)) && Math.abs(t - l) <= j * Math.max(1, Math.abs(t), Math.abs(l)) && Math.abs(s - h) <= j * Math.max(1, Math.abs(s), Math.abs(h));
}
var _t = Be, Ht = Ve, Qt = Ye, Jt = Ge, Kt = Xe, ut = On, rs = jn, ns = (function() {
  var r = We();
  return function(n, e, a, t, s, i) {
    var c, l;
    for (e || (e = 4), a || (a = 0), t ? l = Math.min(t * e + a, n.length) : l = n.length, c = a; c < l; c += e)
      r[0] = n[c], r[1] = n[c + 1], r[2] = n[c + 2], r[3] = n[c + 3], s(r, r, i), n[c] = r[0], n[c + 1] = r[1], n[c + 2] = r[2], n[c + 3] = r[3];
    return n;
  };
})();
const es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Ne,
  ceil: Lt,
  clone: Ce,
  copy: ke,
  create: We,
  cross: Bt,
  dist: Jt,
  distance: Ge,
  div: Qt,
  divide: Ye,
  dot: Tn,
  equals: Zt,
  exactEquals: He,
  floor: Pt,
  forEach: ns,
  fromValues: Ee,
  inverse: Nt,
  len: ut,
  length: On,
  lerp: _e,
  max: Ct,
  min: Wt,
  mul: Ht,
  multiply: Ve,
  negate: Dt,
  normalize: Ze,
  random: Vt,
  round: Et,
  scale: Ue,
  scaleAndAdd: kt,
  set: De,
  sqrDist: Kt,
  sqrLen: rs,
  squaredDistance: Xe,
  squaredLength: jn,
  str: Xt,
  sub: _t,
  subtract: Be,
  transformMat4: Yt,
  transformQuat: Ut,
  zero: Gt
}, Symbol.toStringTag, { value: "Module" }));
function Ur() {
  var r = new L(4);
  return L != Float32Array && (r[0] = 0, r[1] = 0, r[2] = 0), r[3] = 1, r;
}
function as(r) {
  return r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 1, r;
}
function Qe(r, n, e) {
  e = e * 0.5;
  var a = Math.sin(e);
  return r[0] = a * n[0], r[1] = a * n[1], r[2] = a * n[2], r[3] = Math.cos(e), r;
}
function ts(r, n) {
  var e = Math.acos(n[3]) * 2, a = Math.sin(e / 2);
  return a > j ? (r[0] = n[0] / a, r[1] = n[1] / a, r[2] = n[2] / a) : (r[0] = 1, r[1] = 0, r[2] = 0), e;
}
function ss(r, n) {
  var e = Fn(r, n);
  return Math.acos(2 * e * e - 1);
}
function Je(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return r[0] = a * f + i * c + t * h - s * l, r[1] = t * f + i * l + s * c - a * h, r[2] = s * f + i * h + a * l - t * c, r[3] = i * f - a * c - t * l - s * h, r;
}
function Ke(r, n, e) {
  e *= 0.5;
  var a = n[0], t = n[1], s = n[2], i = n[3], c = Math.sin(e), l = Math.cos(e);
  return r[0] = a * l + i * c, r[1] = t * l + s * c, r[2] = s * l - t * c, r[3] = i * l - a * c, r;
}
function ue(r, n, e) {
  e *= 0.5;
  var a = n[0], t = n[1], s = n[2], i = n[3], c = Math.sin(e), l = Math.cos(e);
  return r[0] = a * l - s * c, r[1] = t * l + i * c, r[2] = s * l + a * c, r[3] = i * l - t * c, r;
}
function r1(r, n, e) {
  e *= 0.5;
  var a = n[0], t = n[1], s = n[2], i = n[3], c = Math.sin(e), l = Math.cos(e);
  return r[0] = a * l + t * c, r[1] = t * l - a * c, r[2] = s * l + i * c, r[3] = i * l - s * c, r;
}
function is(r, n) {
  var e = n[0], a = n[1], t = n[2];
  return r[0] = e, r[1] = a, r[2] = t, r[3] = Math.sqrt(Math.abs(1 - e * e - a * a - t * t)), r;
}
function n1(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = Math.sqrt(e * e + a * a + t * t), c = Math.exp(s), l = i > 0 ? c * Math.sin(i) / i : 0;
  return r[0] = e * l, r[1] = a * l, r[2] = t * l, r[3] = c * Math.cos(i), r;
}
function e1(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = Math.sqrt(e * e + a * a + t * t), c = i > 0 ? Math.atan2(i, s) / i : 0;
  return r[0] = e * c, r[1] = a * c, r[2] = t * c, r[3] = 0.5 * Math.log(e * e + a * a + t * t + s * s), r;
}
function cs(r, n, e) {
  return e1(r, n), t1(r, r, e), n1(r, r), r;
}
function Vr(r, n, e, a) {
  var t = n[0], s = n[1], i = n[2], c = n[3], l = e[0], h = e[1], f = e[2], v = e[3], M, d, y, p, m;
  return d = t * l + s * h + i * f + c * v, d < 0 && (d = -d, l = -l, h = -h, f = -f, v = -v), 1 - d > j ? (M = Math.acos(d), y = Math.sin(M), p = Math.sin((1 - a) * M) / y, m = Math.sin(a * M) / y) : (p = 1 - a, m = a), r[0] = p * t + m * l, r[1] = p * s + m * h, r[2] = p * i + m * f, r[3] = p * c + m * v, r;
}
function ls(r) {
  var n = yr(), e = yr(), a = yr(), t = Math.sqrt(1 - n), s = Math.sqrt(n);
  return r[0] = t * Math.sin(2 * Math.PI * e), r[1] = t * Math.cos(2 * Math.PI * e), r[2] = s * Math.sin(2 * Math.PI * a), r[3] = s * Math.cos(2 * Math.PI * a), r;
}
function hs(r, n) {
  var e = n[0], a = n[1], t = n[2], s = n[3], i = e * e + a * a + t * t + s * s, c = i ? 1 / i : 0;
  return r[0] = -e * c, r[1] = -a * c, r[2] = -t * c, r[3] = s * c, r;
}
function fs(r, n) {
  return r[0] = -n[0], r[1] = -n[1], r[2] = -n[2], r[3] = n[3], r;
}
function a1(r, n) {
  var e = n[0] + n[4] + n[8], a;
  if (e > 0)
    a = Math.sqrt(e + 1), r[3] = 0.5 * a, a = 0.5 / a, r[0] = (n[5] - n[7]) * a, r[1] = (n[6] - n[2]) * a, r[2] = (n[1] - n[3]) * a;
  else {
    var t = 0;
    n[4] > n[0] && (t = 1), n[8] > n[t * 3 + t] && (t = 2);
    var s = (t + 1) % 3, i = (t + 2) % 3;
    a = Math.sqrt(n[t * 3 + t] - n[s * 3 + s] - n[i * 3 + i] + 1), r[t] = 0.5 * a, a = 0.5 / a, r[3] = (n[s * 3 + i] - n[i * 3 + s]) * a, r[s] = (n[s * 3 + t] + n[t * 3 + s]) * a, r[i] = (n[i * 3 + t] + n[t * 3 + i]) * a;
  }
  return r;
}
function vs(r, n, e, a) {
  var t = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : ie, s = Math.PI / 360;
  n *= s, a *= s, e *= s;
  var i = Math.sin(n), c = Math.cos(n), l = Math.sin(e), h = Math.cos(e), f = Math.sin(a), v = Math.cos(a);
  switch (t) {
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
      throw new Error("Unknown angle order " + t);
  }
  return r;
}
function Ms(r) {
  return "quat(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ")";
}
var ds = Ce, ys = Ee, Sn = ke, ms = De, ps = Ne, xs = Je, t1 = Ue, Fn = Tn, os = _e, In = On, $s = In, Rn = jn, ws = Rn, Ln = Ze, gs = He;
function zs(r, n) {
  return Math.abs(Tn(r, n)) >= 1 - j;
}
var bs = (function() {
  var r = qn(), n = zn(1, 0, 0), e = zn(0, 1, 0);
  return function(a, t, s) {
    var i = ur(t, s);
    return i < -0.999999 ? (Br(r, n, t), Pe(r) < 1e-6 && Br(r, e, t), Le(r, r), Qe(a, r, Math.PI), a) : i > 0.999999 ? (a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 1, a) : (Br(r, t, s), a[0] = r[0], a[1] = r[1], a[2] = r[2], a[3] = 1 + i, Ln(a, a));
  };
})(), As = (function() {
  var r = Ur(), n = Ur();
  return function(e, a, t, s, i, c) {
    return Vr(r, a, i, c), Vr(n, t, s, c), Vr(e, r, n, 2 * c * (1 - c)), e;
  };
})(), qs = (function() {
  var r = ve();
  return function(n, e, a, t) {
    return r[0] = a[0], r[3] = a[1], r[6] = a[2], r[1] = t[0], r[4] = t[1], r[7] = t[2], r[2] = -e[0], r[5] = -e[1], r[8] = -e[2], Ln(n, a1(n, r));
  };
})();
const Os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: ps,
  calculateW: is,
  clone: ds,
  conjugate: fs,
  copy: Sn,
  create: Ur,
  dot: Fn,
  equals: zs,
  exactEquals: gs,
  exp: n1,
  fromEuler: vs,
  fromMat3: a1,
  fromValues: ys,
  getAngle: ss,
  getAxisAngle: ts,
  identity: as,
  invert: hs,
  len: $s,
  length: In,
  lerp: os,
  ln: e1,
  mul: xs,
  multiply: Je,
  normalize: Ln,
  pow: cs,
  random: ls,
  rotateX: Ke,
  rotateY: ue,
  rotateZ: r1,
  rotationTo: bs,
  scale: t1,
  set: ms,
  setAxes: qs,
  setAxisAngle: Qe,
  slerp: Vr,
  sqlerp: As,
  sqrLen: ws,
  squaredLength: Rn,
  str: Ms
}, Symbol.toStringTag, { value: "Module" }));
function js() {
  var r = new L(8);
  return L != Float32Array && (r[0] = 0, r[1] = 0, r[2] = 0, r[4] = 0, r[5] = 0, r[6] = 0, r[7] = 0), r[3] = 1, r;
}
function Ts(r) {
  var n = new L(8);
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n;
}
function Ss(r, n, e, a, t, s, i, c) {
  var l = new L(8);
  return l[0] = r, l[1] = n, l[2] = e, l[3] = a, l[4] = t, l[5] = s, l[6] = i, l[7] = c, l;
}
function Fs(r, n, e, a, t, s, i) {
  var c = new L(8);
  c[0] = r, c[1] = n, c[2] = e, c[3] = a;
  var l = t * 0.5, h = s * 0.5, f = i * 0.5;
  return c[4] = l * a + h * e - f * n, c[5] = h * a + f * r - l * e, c[6] = f * a + l * n - h * r, c[7] = -l * r - h * n - f * e, c;
}
function s1(r, n, e) {
  var a = e[0] * 0.5, t = e[1] * 0.5, s = e[2] * 0.5, i = n[0], c = n[1], l = n[2], h = n[3];
  return r[0] = i, r[1] = c, r[2] = l, r[3] = h, r[4] = a * h + t * l - s * c, r[5] = t * h + s * i - a * l, r[6] = s * h + a * c - t * i, r[7] = -a * i - t * c - s * l, r;
}
function Is(r, n) {
  return r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = n[0] * 0.5, r[5] = n[1] * 0.5, r[6] = n[2] * 0.5, r[7] = 0, r;
}
function Rs(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = 0, r[5] = 0, r[6] = 0, r[7] = 0, r;
}
function Ls(r, n) {
  var e = Ur();
  we(e, n);
  var a = new L(3);
  return oe(a, n), s1(r, e, a), r;
}
function i1(r, n) {
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r;
}
function Ps(r) {
  return r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = 0, r[5] = 0, r[6] = 0, r[7] = 0, r;
}
function Ws(r, n, e, a, t, s, i, c, l) {
  return r[0] = n, r[1] = e, r[2] = a, r[3] = t, r[4] = s, r[5] = i, r[6] = c, r[7] = l, r;
}
var Cs = Sn;
function Es(r, n) {
  return r[0] = n[4], r[1] = n[5], r[2] = n[6], r[3] = n[7], r;
}
var ks = Sn;
function Ds(r, n) {
  return r[4] = n[0], r[5] = n[1], r[6] = n[2], r[7] = n[3], r;
}
function Ns(r, n) {
  var e = n[4], a = n[5], t = n[6], s = n[7], i = -n[0], c = -n[1], l = -n[2], h = n[3];
  return r[0] = (e * h + s * i + a * l - t * c) * 2, r[1] = (a * h + s * c + t * i - e * l) * 2, r[2] = (t * h + s * l + e * c - a * i) * 2, r;
}
function Bs(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = e[0] * 0.5, l = e[1] * 0.5, h = e[2] * 0.5, f = n[4], v = n[5], M = n[6], d = n[7];
  return r[0] = a, r[1] = t, r[2] = s, r[3] = i, r[4] = i * c + t * h - s * l + f, r[5] = i * l + s * c - a * h + v, r[6] = i * h + a * l - t * c + M, r[7] = -a * c - t * l - s * h + d, r;
}
function Vs(r, n, e) {
  var a = -n[0], t = -n[1], s = -n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = c * i + f * a + l * s - h * t, M = l * i + f * t + h * a - c * s, d = h * i + f * s + c * t - l * a, y = f * i - c * a - l * t - h * s;
  return Ke(r, n, e), a = r[0], t = r[1], s = r[2], i = r[3], r[4] = v * i + y * a + M * s - d * t, r[5] = M * i + y * t + d * a - v * s, r[6] = d * i + y * s + v * t - M * a, r[7] = y * i - v * a - M * t - d * s, r;
}
function Ys(r, n, e) {
  var a = -n[0], t = -n[1], s = -n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = c * i + f * a + l * s - h * t, M = l * i + f * t + h * a - c * s, d = h * i + f * s + c * t - l * a, y = f * i - c * a - l * t - h * s;
  return ue(r, n, e), a = r[0], t = r[1], s = r[2], i = r[3], r[4] = v * i + y * a + M * s - d * t, r[5] = M * i + y * t + d * a - v * s, r[6] = d * i + y * s + v * t - M * a, r[7] = y * i - v * a - M * t - d * s, r;
}
function Us(r, n, e) {
  var a = -n[0], t = -n[1], s = -n[2], i = n[3], c = n[4], l = n[5], h = n[6], f = n[7], v = c * i + f * a + l * s - h * t, M = l * i + f * t + h * a - c * s, d = h * i + f * s + c * t - l * a, y = f * i - c * a - l * t - h * s;
  return r1(r, n, e), a = r[0], t = r[1], s = r[2], i = r[3], r[4] = v * i + y * a + M * s - d * t, r[5] = M * i + y * t + d * a - v * s, r[6] = d * i + y * s + v * t - M * a, r[7] = y * i - v * a - M * t - d * s, r;
}
function Gs(r, n, e) {
  var a = e[0], t = e[1], s = e[2], i = e[3], c = n[0], l = n[1], h = n[2], f = n[3];
  return r[0] = c * i + f * a + l * s - h * t, r[1] = l * i + f * t + h * a - c * s, r[2] = h * i + f * s + c * t - l * a, r[3] = f * i - c * a - l * t - h * s, c = n[4], l = n[5], h = n[6], f = n[7], r[4] = c * i + f * a + l * s - h * t, r[5] = l * i + f * t + h * a - c * s, r[6] = h * i + f * s + c * t - l * a, r[7] = f * i - c * a - l * t - h * s, r;
}
function Xs(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return r[0] = a * f + i * c + t * h - s * l, r[1] = t * f + i * l + s * c - a * h, r[2] = s * f + i * h + a * l - t * c, r[3] = i * f - a * c - t * l - s * h, c = e[4], l = e[5], h = e[6], f = e[7], r[4] = a * f + i * c + t * h - s * l, r[5] = t * f + i * l + s * c - a * h, r[6] = s * f + i * h + a * l - t * c, r[7] = i * f - a * c - t * l - s * h, r;
}
function Zs(r, n, e, a) {
  if (Math.abs(a) < j)
    return i1(r, n);
  var t = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
  a = a * 0.5;
  var s = Math.sin(a), i = s * e[0] / t, c = s * e[1] / t, l = s * e[2] / t, h = Math.cos(a), f = n[0], v = n[1], M = n[2], d = n[3];
  r[0] = f * h + d * i + v * l - M * c, r[1] = v * h + d * c + M * i - f * l, r[2] = M * h + d * l + f * c - v * i, r[3] = d * h - f * i - v * c - M * l;
  var y = n[4], p = n[5], m = n[6], x = n[7];
  return r[4] = y * h + x * i + p * l - m * c, r[5] = p * h + x * c + m * i - y * l, r[6] = m * h + x * l + y * c - p * i, r[7] = x * h - y * i - p * c - m * l, r;
}
function _s(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r[2] = n[2] + e[2], r[3] = n[3] + e[3], r[4] = n[4] + e[4], r[5] = n[5] + e[5], r[6] = n[6] + e[6], r[7] = n[7] + e[7], r;
}
function c1(r, n, e) {
  var a = n[0], t = n[1], s = n[2], i = n[3], c = e[4], l = e[5], h = e[6], f = e[7], v = n[4], M = n[5], d = n[6], y = n[7], p = e[0], m = e[1], x = e[2], $ = e[3];
  return r[0] = a * $ + i * p + t * x - s * m, r[1] = t * $ + i * m + s * p - a * x, r[2] = s * $ + i * x + a * m - t * p, r[3] = i * $ - a * p - t * m - s * x, r[4] = a * f + i * c + t * h - s * l + v * $ + y * p + M * x - d * m, r[5] = t * f + i * l + s * c - a * h + M * $ + y * m + d * p - v * x, r[6] = s * f + i * h + a * l - t * c + d * $ + y * x + v * m - M * p, r[7] = i * f - a * c - t * l - s * h + y * $ - v * p - M * m - d * x, r;
}
var Hs = c1;
function Qs(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r[2] = n[2] * e, r[3] = n[3] * e, r[4] = n[4] * e, r[5] = n[5] * e, r[6] = n[6] * e, r[7] = n[7] * e, r;
}
var l1 = Fn;
function Js(r, n, e, a) {
  var t = 1 - a;
  return l1(n, e) < 0 && (a = -a), r[0] = n[0] * t + e[0] * a, r[1] = n[1] * t + e[1] * a, r[2] = n[2] * t + e[2] * a, r[3] = n[3] * t + e[3] * a, r[4] = n[4] * t + e[4] * a, r[5] = n[5] * t + e[5] * a, r[6] = n[6] * t + e[6] * a, r[7] = n[7] * t + e[7] * a, r;
}
function Ks(r, n) {
  var e = rn(n);
  return r[0] = -n[0] / e, r[1] = -n[1] / e, r[2] = -n[2] / e, r[3] = n[3] / e, r[4] = -n[4] / e, r[5] = -n[5] / e, r[6] = -n[6] / e, r[7] = n[7] / e, r;
}
function us(r, n) {
  return r[0] = -n[0], r[1] = -n[1], r[2] = -n[2], r[3] = n[3], r[4] = -n[4], r[5] = -n[5], r[6] = -n[6], r[7] = n[7], r;
}
var h1 = In, ri = h1, rn = Rn, ni = rn;
function ei(r, n) {
  var e = rn(n);
  if (e > 0) {
    e = Math.sqrt(e);
    var a = n[0] / e, t = n[1] / e, s = n[2] / e, i = n[3] / e, c = n[4], l = n[5], h = n[6], f = n[7], v = a * c + t * l + s * h + i * f;
    r[0] = a, r[1] = t, r[2] = s, r[3] = i, r[4] = (c - a * v) / e, r[5] = (l - t * v) / e, r[6] = (h - s * v) / e, r[7] = (f - i * v) / e;
  }
  return r;
}
function ai(r) {
  return "quat2(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] + ", " + r[4] + ", " + r[5] + ", " + r[6] + ", " + r[7] + ")";
}
function ti(r, n) {
  return r[0] === n[0] && r[1] === n[1] && r[2] === n[2] && r[3] === n[3] && r[4] === n[4] && r[5] === n[5] && r[6] === n[6] && r[7] === n[7];
}
function si(r, n) {
  var e = r[0], a = r[1], t = r[2], s = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = n[0], v = n[1], M = n[2], d = n[3], y = n[4], p = n[5], m = n[6], x = n[7];
  return Math.abs(e - f) <= j * Math.max(1, Math.abs(e), Math.abs(f)) && Math.abs(a - v) <= j * Math.max(1, Math.abs(a), Math.abs(v)) && Math.abs(t - M) <= j * Math.max(1, Math.abs(t), Math.abs(M)) && Math.abs(s - d) <= j * Math.max(1, Math.abs(s), Math.abs(d)) && Math.abs(i - y) <= j * Math.max(1, Math.abs(i), Math.abs(y)) && Math.abs(c - p) <= j * Math.max(1, Math.abs(c), Math.abs(p)) && Math.abs(l - m) <= j * Math.max(1, Math.abs(l), Math.abs(m)) && Math.abs(h - x) <= j * Math.max(1, Math.abs(h), Math.abs(x));
}
const ii = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: _s,
  clone: Ts,
  conjugate: us,
  copy: i1,
  create: js,
  dot: l1,
  equals: si,
  exactEquals: ti,
  fromMat4: Ls,
  fromRotation: Rs,
  fromRotationTranslation: s1,
  fromRotationTranslationValues: Fs,
  fromTranslation: Is,
  fromValues: Ss,
  getDual: Es,
  getReal: Cs,
  getTranslation: Ns,
  identity: Ps,
  invert: Ks,
  len: ri,
  length: h1,
  lerp: Js,
  mul: Hs,
  multiply: c1,
  normalize: ei,
  rotateAroundAxis: Zs,
  rotateByQuatAppend: Gs,
  rotateByQuatPrepend: Xs,
  rotateX: Vs,
  rotateY: Ys,
  rotateZ: Us,
  scale: Qs,
  set: Ws,
  setDual: Ds,
  setReal: ks,
  sqrLen: ni,
  squaredLength: rn,
  str: ai,
  translate: Bs
}, Symbol.toStringTag, { value: "Module" }));
function f1() {
  var r = new L(2);
  return L != Float32Array && (r[0] = 0, r[1] = 0), r;
}
function ci(r) {
  var n = new L(2);
  return n[0] = r[0], n[1] = r[1], n;
}
function li(r, n) {
  var e = new L(2);
  return e[0] = r, e[1] = n, e;
}
function hi(r, n) {
  return r[0] = n[0], r[1] = n[1], r;
}
function fi(r, n, e) {
  return r[0] = n, r[1] = e, r;
}
function vi(r, n, e) {
  return r[0] = n[0] + e[0], r[1] = n[1] + e[1], r;
}
function v1(r, n, e) {
  return r[0] = n[0] - e[0], r[1] = n[1] - e[1], r;
}
function M1(r, n, e) {
  return r[0] = n[0] * e[0], r[1] = n[1] * e[1], r;
}
function d1(r, n, e) {
  return r[0] = n[0] / e[0], r[1] = n[1] / e[1], r;
}
function Mi(r, n) {
  return r[0] = Math.ceil(n[0]), r[1] = Math.ceil(n[1]), r;
}
function di(r, n) {
  return r[0] = Math.floor(n[0]), r[1] = Math.floor(n[1]), r;
}
function yi(r, n, e) {
  return r[0] = Math.min(n[0], e[0]), r[1] = Math.min(n[1], e[1]), r;
}
function mi(r, n, e) {
  return r[0] = Math.max(n[0], e[0]), r[1] = Math.max(n[1], e[1]), r;
}
function pi(r, n) {
  return r[0] = mr(n[0]), r[1] = mr(n[1]), r;
}
function xi(r, n, e) {
  return r[0] = n[0] * e, r[1] = n[1] * e, r;
}
function oi(r, n, e, a) {
  return r[0] = n[0] + e[0] * a, r[1] = n[1] + e[1] * a, r;
}
function y1(r, n) {
  var e = n[0] - r[0], a = n[1] - r[1];
  return Math.sqrt(e * e + a * a);
}
function m1(r, n) {
  var e = n[0] - r[0], a = n[1] - r[1];
  return e * e + a * a;
}
function p1(r) {
  var n = r[0], e = r[1];
  return Math.sqrt(n * n + e * e);
}
function x1(r) {
  var n = r[0], e = r[1];
  return n * n + e * e;
}
function $i(r, n) {
  return r[0] = -n[0], r[1] = -n[1], r;
}
function wi(r, n) {
  return r[0] = 1 / n[0], r[1] = 1 / n[1], r;
}
function gi(r, n) {
  var e = n[0], a = n[1], t = e * e + a * a;
  return t > 0 && (t = 1 / Math.sqrt(t)), r[0] = n[0] * t, r[1] = n[1] * t, r;
}
function zi(r, n) {
  return r[0] * n[0] + r[1] * n[1];
}
function bi(r, n, e) {
  var a = n[0] * e[1] - n[1] * e[0];
  return r[0] = r[1] = 0, r[2] = a, r;
}
function Ai(r, n, e, a) {
  var t = n[0], s = n[1];
  return r[0] = t + a * (e[0] - t), r[1] = s + a * (e[1] - s), r;
}
function qi(r, n) {
  n = n === void 0 ? 1 : n;
  var e = yr() * 2 * Math.PI;
  return r[0] = Math.cos(e) * n, r[1] = Math.sin(e) * n, r;
}
function Oi(r, n, e) {
  var a = n[0], t = n[1];
  return r[0] = e[0] * a + e[2] * t, r[1] = e[1] * a + e[3] * t, r;
}
function ji(r, n, e) {
  var a = n[0], t = n[1];
  return r[0] = e[0] * a + e[2] * t + e[4], r[1] = e[1] * a + e[3] * t + e[5], r;
}
function Ti(r, n, e) {
  var a = n[0], t = n[1];
  return r[0] = e[0] * a + e[3] * t + e[6], r[1] = e[1] * a + e[4] * t + e[7], r;
}
function Si(r, n, e) {
  var a = n[0], t = n[1];
  return r[0] = e[0] * a + e[4] * t + e[12], r[1] = e[1] * a + e[5] * t + e[13], r;
}
function Fi(r, n, e, a) {
  var t = n[0] - e[0], s = n[1] - e[1], i = Math.sin(a), c = Math.cos(a);
  return r[0] = t * c - s * i + e[0], r[1] = t * i + s * c + e[1], r;
}
function Ii(r, n) {
  var e = r[0], a = r[1], t = n[0], s = n[1];
  return Math.abs(Math.atan2(a * t - e * s, e * t + a * s));
}
function Ri(r, n) {
  var e = r[0], a = r[1], t = n[0], s = n[1];
  return Math.atan2(e * s - a * t, e * t + a * s);
}
function Li(r) {
  return r[0] = 0, r[1] = 0, r;
}
function Pi(r) {
  return "vec2(" + r[0] + ", " + r[1] + ")";
}
function Wi(r, n) {
  return r[0] === n[0] && r[1] === n[1];
}
function Ci(r, n) {
  var e = r[0], a = r[1], t = n[0], s = n[1];
  return Math.abs(e - t) <= j * Math.max(1, Math.abs(e), Math.abs(t)) && Math.abs(a - s) <= j * Math.max(1, Math.abs(a), Math.abs(s));
}
var Ei = p1, ki = v1, Di = M1, Ni = d1, Bi = y1, Vi = m1, Yi = x1, Ui = (function() {
  var r = f1();
  return function(n, e, a, t, s, i) {
    var c, l;
    for (e || (e = 2), a || (a = 0), t ? l = Math.min(t * e + a, n.length) : l = n.length, c = a; c < l; c += e)
      r[0] = n[c], r[1] = n[c + 1], s(r, r, i), n[c] = r[0], n[c + 1] = r[1];
    return n;
  };
})();
const Gi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: vi,
  angle: Ii,
  ceil: Mi,
  clone: ci,
  copy: hi,
  create: f1,
  cross: bi,
  dist: Bi,
  distance: y1,
  div: Ni,
  divide: d1,
  dot: zi,
  equals: Ci,
  exactEquals: Wi,
  floor: di,
  forEach: Ui,
  fromValues: li,
  inverse: wi,
  len: Ei,
  length: p1,
  lerp: Ai,
  max: mi,
  min: yi,
  mul: Di,
  multiply: M1,
  negate: $i,
  normalize: gi,
  random: qi,
  rotate: Fi,
  round: pi,
  scale: xi,
  scaleAndAdd: oi,
  set: fi,
  signedAngle: Ri,
  sqrDist: Vi,
  sqrLen: Yi,
  squaredDistance: m1,
  squaredLength: x1,
  str: Pi,
  sub: ki,
  subtract: v1,
  transformMat2: Oi,
  transformMat2d: ji,
  transformMat3: Ti,
  transformMat4: Si,
  zero: Li
}, Symbol.toStringTag, { value: "Module" })), Xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: N1,
  mat2: v0,
  mat2d: W0,
  mat3: va,
  mat4: qe,
  quat: Os,
  quat2: ii,
  vec2: Gi,
  vec3: Rt,
  vec4: es
}, Symbol.toStringTag, { value: "Module" })), Pn = Kr;
function nn() {
  N.call(this), this.events = {
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
}
var B = nn.prototype = Object.create(N.prototype), cr = new Float32Array([0, 0, 0]), hr = new Float32Array(16);
B.constructor = nn;
B.local = null;
B.localToWorld = null;
B.worldToLocal = null;
B.children = null;
B.parent = null;
B.dirtyW = !0;
B.dirtyL = !0;
B.onParentUpdate = null;
B.addChild = function(r) {
  this.children[this.children.length] = r, r.setParent(this);
};
B.removeChild = function(r) {
  this.children.splice(this.children.indexOf(r), 1), r.removeParent();
};
B.setParent = function(r) {
  this.parent = r, r.gameObject.world !== null && r.gameObject.world.addGameObject(this.gameObject);
};
B.setGameObject = function(r) {
  N.prototype.setGameObject.call(this, r), r.transform = this;
};
B.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
B.removeParent = function() {
  this.parent = null;
};
B.translate = function(r, n, e, a) {
  cr[0] = r, cr[1] = n, cr[2] = e, a === "world" ? (An(hr), gn(hr, hr, cr), Pn(this.local, hr, this.local)) : gn(this.local, this.local, cr);
};
B.rotate = function(r, n, e, a) {
  var t = Math.PI / 180, s = qe;
  a === "world" ? (s.identity(hr), s.rotateZ(hr, hr, e * t), s.rotateY(hr, hr, n * t), s.rotateX(hr, hr, r * t), Pn(this.local, hr, this.local)) : (s.rotateZ(this.local, this.local, e * t), s.rotateY(this.local, this.local, n * t), s.rotateX(this.local, this.local, r * t));
};
B.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.localToWorld.set(this.local) : Pn(this.localToWorld, this.parent.getLocalToWorld(), this.local)), this.localToWorld;
};
B.getWorldToLocal = function() {
  return this.dirtyW === !0 && ye(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
};
B.getPosition = function(r) {
  r === void 0 && (r = []);
  var n = this.getLocalToWorld();
  return r[0] = n[12], r[1] = n[13], r[2] = n[14], r;
};
B.getLocalPosition = function(r) {
  r === void 0 && (r = []);
  var n = this.local;
  return r[0] = n[12], r[1] = n[13], r[2] = n[14], r;
};
B.getRotation = function() {
  throw "TransformComponent.getRotation not implemented yet";
};
B.getLocalRotation = function() {
  throw "TransformComponent.getLocalRotation not implemented yet";
};
B.setPosition = function(r, n, e) {
  cr[0] = r, cr[1] = n, cr[2] = e, this.parent !== null && Yr(cr, cr, this.parent.getWorldToLocal()), this.local[12] = cr[0], this.local[13] = cr[1], this.local[14] = cr[2];
};
B.setLocalPosition = function(r, n, e) {
  this.local[12] = r, this.local[13] = n, this.local[14] = e;
};
B.scale = function(r, n, e) {
  pe(this.local, this.local, [r, n, e]);
};
B.forward = function(r) {
  r === void 0 && (r = []);
  var n = this.getLocalToWorld();
  return r[0] = n[8], r[1] = n[9], r[2] = n[10], r;
};
function K(r) {
  this.instanceId = K.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new nn()), this.name = r || "gameObject";
}
var fr = K.prototype;
fr.instanceId = 0;
fr.name = null;
fr.layer = 0;
fr.scene = null;
fr.world = null;
fr.transform = null;
fr.components = null;
fr.componentsCount = 0;
fr.setScene = function(r) {
  this.scene = r;
};
fr.addComponent = function(r) {
  return this.components[this.componentsCount++] = r, r.setGameObject(this), r;
};
fr.removeComponent = function(r) {
  r.unsetGameObject();
};
fr.getComponent = function(r) {
  for (var n = 0; n < this.components.length; n++) {
    var e = this.components[n];
    if (e instanceof r)
      return e;
  }
  return null;
};
const o1 = {
  NONE: "NONE",
  RADIAL: "RADIAL",
  RADIAL_FAST: "RADIAL_FAST",
  LINEAR: "LINEAR"
};
function D(r) {
  N.call(this), this.transform = r, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ], this.frustumBox = [
    [0, 0, 0],
    [0, 0, 0]
  ];
}
D.prototype = Object.create(N.prototype);
D.prototype.constructor = D;
D.prototype.frustumSize = null;
D.prototype.frustumBox = null;
D.prototype.projectionMatrix = null;
D.prototype.clipSpaceMatrix = null;
D.prototype.nearClippingPane = 0;
D.prototype.farClippingPane = 1e3;
D.prototype.fogType = o1.LINEAR;
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
  Yr(this.frustumBox[0], this.frustumSize[0], e), Yr(this.frustumBox[1], this.frustumSize[1], e), be(this.projectionMatrix, -r / 2, r / 2, -n / 2, n / 2, this.nearClippingPane, this.farClippingPane);
};
D.prototype.setGameObject = function(r) {
  N.prototype.setGameObject.call(this, r), r.camera = this;
};
D.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, N.prototype.unsetGameObject.call(this);
};
D.prototype.getClipSpaceMatrix = function() {
  const r = this.transform.getWorldToLocal();
  return Kr(this.clipSpaceMatrix, this.projectionMatrix, r), this.clipSpaceMatrix;
};
D.FogType = o1;
function $1(r) {
  K.call(this, r || "camera"), this.addComponent(new D(this.transform));
}
$1.prototype = Object.create(K.prototype);
function G() {
  N.call(this), this.colors = new Uint8Array([0, 0, 255]), this.faceColors = new Uint32Array([0]);
}
var sr = G.prototype = Object.create(N.prototype);
sr.constructor = G;
sr.layer = 0;
sr.vertices = null;
sr.faces = null;
sr.pivot = [0, 0, 0];
sr.color = null;
sr.colors = null;
sr.faceColors = null;
sr.faceNormals = null;
sr.vertexNormals = null;
sr.bounds = null;
sr.updateNormals = function(r = 1) {
  const n = this.faces, e = this.vertices, a = n.length;
  (!this.faceNormals || this.faceNormals.length !== a) && (this.faceNormals = new Float32Array(a));
  for (let t = 0; t < a; t += 3) {
    const s = n[t] * 3, i = n[t + 1] * 3, c = n[t + 2] * 3, l = e[i] - e[s], h = e[i + 1] - e[s + 1], f = e[i + 2] - e[s + 2], v = e[c] - e[s], M = e[c + 1] - e[s + 1], d = e[c + 2] - e[s + 2];
    let y = (h * d - f * M) * r, p = (f * v - l * d) * r, m = (l * M - h * v) * r;
    const x = Math.sqrt(y * y + p * p + m * m);
    if (x > 1e-10) {
      const $ = 1 / x;
      this.faceNormals[t] = y * $, this.faceNormals[t + 1] = p * $, this.faceNormals[t + 2] = m * $;
    }
  }
};
sr.setGameObject = function(r) {
  N.prototype.setGameObject.call(this, r), r.meshRenderer = this;
};
sr.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, N.prototype.unsetGameObject.call(this);
};
G.computeNormalMatrix = function(r, n) {
  const e = n[0], a = n[1], t = n[2], s = n[4], i = n[5], c = n[6], l = n[8], h = n[9], f = n[10], v = i * f - c * h, M = -(s * f - c * l), d = s * h - i * l, y = e * v + a * M + t * d;
  if (Math.abs(y) < 1e-6) return null;
  const p = 1 / y;
  r[0] = v * p, r[1] = M * p, r[2] = d * p, r[3] = -(a * f - t * h) * p, r[4] = (e * f - t * l) * p, r[5] = -(e * h - a * l) * p, r[6] = (a * c - t * i) * p, r[7] = -(e * c - t * s) * p, r[8] = (e * i - a * s) * p;
};
G.computeBoundsFlatArray = function(r, n, e) {
  if (e.length !== 0) {
    for (var a = e[0], t = a, s = e[1], i = s, c = e[2], l = c, h = 3; h < e.length; h += 3) {
      var f = e[h], v = e[h + 1], M = e[h + 2];
      f < a ? a = f : f > t && (t = f), v < s ? s = v : v > i && (i = v), M < c ? c = M : M > l && (l = M);
    }
    return r[n] = a, r[n + 1] = s, r[n + 2] = c, r[n + 3] = t, r[n + 4] = s, r[n + 5] = c, r[n + 6] = a, r[n + 7] = i, r[n + 8] = c, r[n + 9] = t, r[n + 10] = i, r[n + 11] = c, r[n + 12] = a, r[n + 13] = s, r[n + 14] = l, r[n + 15] = t, r[n + 16] = s, r[n + 17] = l, r[n + 18] = a, r[n + 19] = i, r[n + 20] = l, r[n + 21] = t, r[n + 22] = i, r[n + 23] = l, r;
  }
};
G.computeBoundingSphere = function(r, n, e) {
  let a = 1 / 0, t = 1 / 0, s = 1 / 0, i = -1 / 0, c = -1 / 0, l = -1 / 0;
  for (let m = 0; m < e.length; m += 3) {
    const x = e[m], $ = e[m + 1], o = e[m + 2];
    x < a && (a = x), x > i && (i = x), $ < t && (t = $), $ > c && (c = $), o < s && (s = o), o > l && (l = o);
  }
  const h = (a + i) * 0.5, f = (t + c) * 0.5, v = (s + l) * 0.5, M = i - h, d = c - f, y = l - v, p = Math.sqrt(M * M + d * d + y * y);
  r[n] = h, r[n + 1] = f, r[n + 2] = v, r[n + 3] = p;
};
function Wn(r) {
  N.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var xr = Wn.prototype = Object.create(N.prototype);
xr.constructor = Wn;
xr.sprite = null;
xr.pivotX = 0;
xr.pivotY = 0;
xr.layer = 0;
xr.setGameObject = function(r) {
  N.prototype.setGameObject.call(this, r), r.spriteRenderer = this;
};
xr.setSprite = function(r) {
  return this.sprite = r, this.enabled = !0, this;
};
xr.setPivot = function(r, n) {
  return this.pivotX = r, this.pivotY = n, this;
};
xr.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, N.prototype.unsetGameObject.call(this);
};
function Cn() {
  N.call(this), this.points = [];
}
var Tr = Cn.prototype = Object.create(N.prototype);
Tr.constructor = Cn;
Tr.points = null;
Tr.color = "white";
Tr.width = 1;
Tr.layer = 0;
Tr.setGameObject = function(r) {
  N.prototype.setGameObject.call(this, r), r.pathRenderer = this;
};
Tr.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, N.prototype.unsetGameObject.call(this);
};
function En() {
  N.call(this);
}
var or = En.prototype = Object.create(N.prototype);
or.constructor = En;
or.text = "sample text";
or.color = "white";
or.style = "normal 12px arial";
or.layer = 0;
or.align = "center";
or.valign = "middle";
or.setGameObject = function(r) {
  N.prototype.setGameObject.call(this, r), r.textRenderer = this;
};
or.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, N.prototype.unsetGameObject.call(this);
};
function Zi(r, n, e) {
  const a = [], t = [], s = r / 2, i = n / 2, c = r / e, l = n / e;
  for (let f = 0; f <= e; f++) {
    const v = f * l - i;
    for (let M = 0; M <= e; M++) {
      const d = M * c - s;
      a.push(d, 0, v);
    }
  }
  const h = e + 1;
  for (let f = 0; f < e; f++)
    for (let v = 0; v < e; v++) {
      const M = f * h + v, d = f * h + (v + 1), y = (f + 1) * h + v, p = (f + 1) * h + (v + 1);
      t.push(M, y, d), t.push(p, d, y);
    }
  return {
    vertices: new Float32Array(a),
    faces: new Uint16Array(t)
  };
}
const Gr = Zi(1, 1, 1), kn = new Float32Array(32);
G.computeBoundsFlatArray(kn, 0, Gr.vertices);
G.computeBoundingSphere(kn, 28, Gr.vertices);
function w1() {
  K.call(this);
  const r = new G();
  r.faces = Gr.faces, r.vertices = Gr.vertices, r.bounds = kn, r.updateNormals(), this.addComponent(r);
}
w1.prototype = Object.create(K.prototype);
function _i(r, n, e, a) {
  const t = [], s = [], i = {};
  function c(h, f, v) {
    const M = `${h.toFixed(5)},${f.toFixed(5)},${v.toFixed(5)}`;
    if (i[M] !== void 0) return i[M];
    const d = t.length / 3;
    return t.push(h, f, v), i[M] = d, d;
  }
  function l(h, f, v, M, d, y, p, m, x, $) {
    const o = p / $, g = m / $, w = p / 2, z = m / 2, S = x / 2 * y, b = [];
    for (let q = 0; q <= $; q++) {
      const A = [], I = q * g - z;
      for (let T = 0; T <= $; T++) {
        const F = T * o - w, O = [0, 0, 0];
        O[h] = F * M, O[f] = I * d, O[v] = S, A.push(c(O[0], O[1], O[2]));
      }
      b.push(A);
    }
    for (let q = 0; q < $; q++)
      for (let A = 0; A < $; A++) {
        const I = b[q][A], T = b[q + 1][A], F = b[q + 1][A + 1], O = b[q][A + 1];
        s.push(I, O, T), s.push(T, O, F);
      }
  }
  return l(0, 1, 2, 1, 1, 1, r, n, e, a), l(0, 1, 2, -1, 1, -1, r, n, e, a), l(2, 1, 0, -1, 1, 1, e, n, r, a), l(2, 1, 0, 1, 1, -1, e, n, r, a), l(0, 2, 1, 1, -1, 1, r, e, n, a), l(0, 2, 1, 1, 1, -1, r, e, n, a), {
    vertices: new Float32Array(t),
    faces: new Uint16Array(s)
  };
}
const Xr = _i(1, 1, 1, 1), Dn = new Float32Array(32);
G.computeBoundsFlatArray(
  Dn,
  0,
  Xr.vertices
);
G.computeBoundingSphere(Dn, 28, Xr.vertices);
function g1() {
  K.call(this);
  const r = new G();
  r.vertices = Xr.vertices, r.faces = Xr.faces, r.bounds = Dn, r.updateNormals(), this.addComponent(r);
}
g1.prototype = Object.create(K.prototype);
function Hi(r, n, e) {
  const a = [], t = [];
  a.push(0, e, 0), a.push(0, 0, 0);
  for (let s = 0; s < r; s++) {
    const i = s / r * Math.PI * 2, c = Math.cos(i) * n, l = Math.sin(i) * n;
    a.push(c, 0, l);
  }
  for (let s = 0; s < r; s++) {
    const i = s + 2, c = s === r - 1 ? 2 : s + 3;
    t.push(0, c, i), t.push(1, i, c);
  }
  return {
    vertices: new Float32Array(a),
    faces: new Uint16Array(t)
  };
}
const Zr = Hi(7, 0.5, 1), Nn = new Float32Array(32);
G.computeBoundsFlatArray(Nn, 0, Zr.vertices);
G.computeBoundingSphere(Nn, 28, Zr.vertices);
function z1() {
  K.call(this);
  const r = new G();
  r.vertices = Zr.vertices, r.faces = Zr.faces, r.bounds = Nn, r.updateNormals(), this.addComponent(r);
}
z1.prototype = Object.create(K.prototype);
function Qi(r, n, e) {
  const a = [], t = [], s = {};
  function i(l, h, f) {
    const v = `${l.toFixed(5)},${h.toFixed(5)},${f.toFixed(5)}`;
    if (s[v] !== void 0) return s[v];
    const M = a.length / 3;
    return a.push(l, h, f), s[v] = M, M;
  }
  const c = [];
  for (let l = 0; l <= r; l++) {
    const h = [], f = l * Math.PI / r, v = Math.sin(f), M = Math.cos(f);
    for (let d = 0; d <= n; d++) {
      const y = d * 2 * Math.PI / n, p = Math.cos(y) * v * e, m = M * e, x = Math.sin(y) * v * e;
      h.push(i(p, m, x));
    }
    c.push(h);
  }
  for (let l = 0; l < r; l++)
    for (let h = 0; h < n; h++) {
      const f = c[l][h], v = c[l][h + 1], M = c[l + 1][h], d = c[l + 1][h + 1];
      l !== 0 && t.push(f, v, M), l !== r - 1 && t.push(M, v, d);
    }
  return {
    vertices: new Float32Array(a),
    faces: new Uint16Array(t)
  };
}
const _r = Qi(16, 16, 1), Bn = new Float32Array(32);
G.computeBoundsFlatArray(Bn, 0, _r.vertices);
G.computeBoundingSphere(Bn, 28, _r.vertices);
function b1() {
  K.call(this);
  const r = new G();
  r.vertices = _r.vertices, r.faces = _r.faces, r.bounds = Bn, r.updateNormals(), this.addComponent(r);
}
b1.prototype = Object.create(K.prototype);
function Ji() {
  const r = new Array(65536);
  for (let n = 0; n < 65536; n++) {
    const e = n >> 11 & 31, a = n >> 5 & 63, t = n & 31, s = e << 3 | e >> 2, i = a << 2 | a >> 4, c = t << 3 | t >> 2;
    r[n] = "rgb(" + s + "," + i + "," + c + ")";
  }
  return r;
}
const un = L1;
function Ki(r, n, e, a) {
  var t = r.transform.getLocalToWorld(), s = t[12], i = t[13], c = t[14];
  un(
    a,
    0,
    s,
    i,
    c,
    e
  );
  for (var l = a[0], h = a[1], f = 50, v = [
    { x: t[0], y: t[1], z: t[2], col: "#ff0000" },
    // X
    { x: t[4], y: t[5], z: t[6], col: "#00ff00" },
    // Y
    { x: t[8], y: t[9], z: t[10], col: "#0000ff" }
    // Z
  ], M = 0; M < 3; M++) {
    var d = v[M], y = Math.sqrt(d.x * d.x + d.y * d.y + d.z * d.z);
    y < 1e-4 && (M === 0 ? d.x = 1 : M === 1 ? d.y = 1 : d.z = 1, y = 1);
    var p = d.x / y, m = d.y / y, x = d.z / y;
    un(
      a,
      0,
      s + p * f,
      i + m * f,
      c + x * f,
      e
    ), n.beginPath(), n.lineWidth = 2, n.strokeStyle = d.col, n.moveTo(l, h), n.lineTo(a[0], a[1]), n.stroke();
  }
}
const wn = R1, re = Kr, ui = Ki, A1 = Ji();
function q1() {
  this.layerBuffers = [], this.drawCalls = 0, this.faces = 0, this.lightDirection = new Float32Array([0, 0, 0]), this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.color16Buffer = new Uint16Array(0), this.colorBuffer = new Uint32Array(0), this.faceNormalsBuffer = new Float32Array(0), this.typeBuffer = new Uint8Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.layerBuffers = [], this.layerBufferLengths = new Uint32Array(1), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0);
  for (let r = 0; r < jr.layersCount; r++)
    this.layerBuffers[r] = this.layerBuffers[r] || [];
  this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0);
}
var Sr = q1.prototype;
Sr.vec3Cache1 = new Float32Array([0, 0, 0]);
Sr.vec3Cache2 = new Float32Array([0, 0, 0]);
Sr.vec4Cache = new Float32Array([0, 0, 0]);
Sr.mat4Scratchpad1 = new Float32Array(16);
Sr.mat4Scratchpad2 = new Float32Array(16);
Sr.mat3Scratchpad1 = new Float32Array(9);
Sr.render = function(r, n, e) {
  let a = Date.now(), t = r.scene.retrieve(r), s = jr.layersCount, i = n.width, c = n.height, l, h, f, v, M, d, y = this.vec3Cache1, p = this.vec3Cache2, m = this.vec4Cache, x = this.depthBuffer, $ = this.indexBuffer, o = this.vertexIndexBuffer, g = this.vertexBuffer, w = this.clipGeometryBuffer, z = this.color16Buffer, S = this.colorBuffer, b = this.faceNormalsBuffer, q = this.typeBuffer, A = this.visibleObjectsBuffer, I = this.layerBuffers, T = this.layerBufferLengths, F = this.mat4Scratchpad1, O = this.mat4Scratchpad2, k = n.getWorldToScreen(), U = r.transform.getWorldToLocal(), E = r.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let X = 0, Z = 0;
  if (r.camera.fogType !== D.FogType.NONE) {
    const P = r.camera, R = P.fogColor[0] & 248, _ = P.fogColor[1] & 252, Y = P.fogColor[2] & 248, W = R << 8 | _ << 3 | Y >> 3;
    n.context.fillStyle = A1[W], n.context.fillRect(0, 0, n.width, n.height);
  }
  if (A.length < t.length) {
    const P = A;
    this.visibleObjectsBuffer = A = new Uint32Array(
      t.length
    ), A.set(P);
  }
  const Mr = rc(
    t,
    E,
    A
  ), u = nc(
    A,
    Mr,
    t,
    E
  );
  if (T.length < s) {
    var ir = T;
    this.layerBufferLengths = T = new Uint32Array(s), T.set(ir);
  }
  for (v = 0; v < u; v++) {
    const P = t[A[v]];
    if (P.meshRenderer) {
      const R = P.meshRenderer, _ = R.layer;
      I[_][T[_]++] = R;
    }
  }
  for (v = 0; v < s; v++) {
    d = n.layers[v], h = I[v], f = T[v];
    let P = 0, R = 0;
    for (let W = 0; W < f; W++) {
      P += h[W].faces.length;
      const rr = h[W].vertices.length;
      rr > R && (R = rr);
    }
    P = P / 3 | 0;
    const _ = R / 3 | 0;
    if (this.vMapping.length < _ && (this.vMapping = new Int32Array(_), this.vTags = new Uint32Array(_)), y.length < R && (this.vec3Cache1 = y = new Float32Array(R), this.vec3Cache2 = p = new Float32Array(R), this.vec4Cache = m = new Float32Array(R * 4 / 3)), x.length < P) {
      let W = new Float32Array(P);
      W.set(x), this.depthBuffer = x = W, W = new Uint32Array(P), W.set($), this.indexBuffer = $ = W, W = new Uint8Array(P), W.set(q), this.typeBuffer = q = W, W = new Uint32Array(P), W.set(S), this.colorBuffer = S = W, W = new Uint16Array(P), W.set(z), this.color16Buffer = z = W, W = new Float32Array(P * 9), W.set(w), this.clipGeometryBuffer = w = W, W = new Float32Array(P * 3), W.set(b), this.faceNormalsBuffer = b = W;
      let rr = new Float32Array(P * 9);
      rr.set(g), this.vertexBuffer = g = rr;
      let Fr = new Uint32Array(P * 3);
      Fr.set(o), this.vertexIndexBuffer = o = Fr;
    }
    const Y = ec(
      h,
      f,
      p,
      m,
      $,
      x,
      S,
      w,
      U,
      E,
      O,
      F,
      this.mat3Scratchpad1,
      b,
      g,
      o,
      this.vMapping,
      this.vTags
    );
    if (ac(
      Y,
      S,
      r.scene,
      this.lightDirection,
      r.camera.ambientLight,
      b
    ), tc(
      Y,
      w,
      S,
      x,
      r.camera.fogType,
      r.camera.fogColor,
      r.camera.fogNearPane,
      r.camera.fogFarPane
    ), sc($, Y, S, z), (jr.depthSortingMask & v + 1) === v + 1 && $.subarray(0, Y).sort(function(W, rr) {
      return x[rr] - x[W];
    }), this.wireframe)
      cc(
        d,
        g,
        o,
        $,
        Y,
        0,
        i,
        c
      );
    else {
      const W = (jr.layerStrokeMask & v + 1) === v + 1, rr = (jr.layerClearMask & v + 1) === v + 1;
      ic(
        d,
        g,
        o,
        $,
        z,
        Y,
        0,
        W,
        rr,
        i,
        c
      );
    }
    for (M = 0; M < f; M++)
      l = h[M], l.gameObject && l.gameObject.debug && ui(l.gameObject, d, k, y);
    n.context.drawImage(d.canvas, 0, 0), X += Y, Z += Y, T[v] = 0;
  }
  e.visibleObjects = u, e.drawCalls = X, e.faces = Z, e.dt = Date.now() - a;
};
function rc(r, n, e) {
  let a = 0;
  const t = n[0], s = n[1], i = n[2], c = n[3], l = n[4], h = n[5], f = n[6], v = n[7], M = n[8], d = n[9], y = n[10], p = n[11], m = n[12], x = n[13], $ = n[14], o = n[15];
  let g = c + t, w = v + l, z = p + M, S = o + m, b = 1 / Math.sqrt(g * g + w * w + z * z);
  g *= b, w *= b, z *= b, S *= b;
  let q = c - t, A = v - l, I = p - M, T = o - m;
  b = 1 / Math.sqrt(q * q + A * A + I * I), q *= b, A *= b, I *= b, T *= b;
  let F = c + s, O = v + h, k = p + d, U = o + x;
  b = 1 / Math.sqrt(F * F + O * O + k * k), F *= b, O *= b, k *= b, U *= b;
  let E = c - s, X = v - h, Z = p - d, Mr = o - x;
  b = 1 / Math.sqrt(E * E + X * X + Z * Z), E *= b, X *= b, Z *= b, Mr *= b;
  let u = c + i, ir = v + f, P = p + y, R = o + $;
  b = 1 / Math.sqrt(u * u + ir * ir + P * P), u *= b, ir *= b, P *= b, R *= b;
  let _ = c - i, Y = v - f, W = p - y, rr = o - $;
  b = 1 / Math.sqrt(_ * _ + Y * Y + W * W), _ *= b, Y *= b, W *= b, rr *= b;
  const Fr = r.length;
  for (let Ir = 0; Ir < Fr; Ir++) {
    const $r = r[Ir];
    if (!$r.meshRenderer || !$r.meshRenderer.enabled) continue;
    const C = $r.transform.dirtyL ? $r.transform.getLocalToWorld() : $r.transform.localToWorld, Rr = $r.meshRenderer.bounds, Er = Rr[28], kr = Rr[29], Dr = Rr[30], J = C[0] * Er + C[4] * kr + C[8] * Dr + C[12], H = C[1] * Er + C[5] * kr + C[9] * Dr + C[13], Q = C[2] * Er + C[6] * kr + C[10] * Dr + C[14], lr = C[0] * C[0] + C[1] * C[1] + C[2] * C[2], Lr = C[4] * C[4] + C[5] * C[5] + C[6] * C[6], Pr = C[8] * C[8] + C[9] * C[9] + C[10] * C[10], dr = Rr[31] * Math.sqrt(Math.max(lr, Lr, Pr));
    g * J + w * H + z * Q + S < -dr || q * J + A * H + I * Q + T < -dr || F * J + O * H + k * Q + U < -dr || E * J + X * H + Z * Q + Mr < -dr || u * J + ir * H + P * Q + R < -dr || _ * J + Y * H + W * Q + rr < -dr || (e[a++] = Ir);
  }
  return a;
}
function nc(r, n, e, a) {
  const t = a, s = t[0], i = t[1], c = t[2], l = t[3], h = t[4], f = t[5], v = t[6], M = t[7], d = t[8], y = t[9], p = t[10], m = t[11], x = t[12], $ = t[13], o = t[14], g = t[15];
  let w = 0;
  for (let z = 0; z < n; z++) {
    const S = r[z], b = e[S], q = b.transform.localToWorld, A = b.meshRenderer;
    if (A && A.enabled && A.bounds) {
      const I = A.bounds;
      let T = 63;
      for (let F = 0; F < 24; F += 3) {
        const O = I[F], k = I[F + 1], U = I[F + 2], E = q[0] * O + q[4] * k + q[8] * U + q[12], X = q[1] * O + q[5] * k + q[9] * U + q[13], Z = q[2] * O + q[6] * k + q[10] * U + q[14], Mr = s * E + h * X + d * Z + x, u = i * E + f * X + y * Z + $, ir = c * E + v * X + p * Z + o, P = l * E + M * X + m * Z + g;
        let R = 0;
        Mr < -P && (R |= 1), Mr > P && (R |= 2), u < -P && (R |= 4), u > P && (R |= 8), ir < -P && (R |= 16), ir > P && (R |= 32), T &= R;
      }
      T === 0 && (r[w++] = S);
    } else {
      const I = q[12], T = q[13], F = q[14], O = s * I + h * T + d * F + x, k = i * I + f * T + y * F + $, U = c * I + v * T + p * F + o, E = l * I + M * T + m * F + g;
      O >= -E && O <= E && k >= -E && k <= E && U >= -E && U <= E && (r[w++] = S);
    }
  }
  return w;
}
let Or = 0;
function ec(r, n, e, a, t, s, i, c, l, h, f, v, M, d, y, p, m, x) {
  let $ = 0, o = 0;
  for (let g = 0; g < n; g++) {
    const w = r[g];
    if (w.constructor !== G) continue;
    ++Or;
    const z = w.gameObject.transform.dirtyL ? w.gameObject.transform.getLocalToWorld() : w.gameObject.transform.localToWorld;
    re(v, h, z), re(f, l, z);
    const S = v[0], b = v[1], q = v[2], A = v[3], I = v[4], T = v[5], F = v[6], O = v[7], k = v[8], U = v[9], E = v[10], X = v[11], Z = v[12], Mr = v[13], u = v[14], ir = v[15], P = w.faces, R = w.vertices, _ = w.faceNormals;
    G.computeNormalMatrix(M, z);
    const Y = M, W = Y[0], rr = Y[1], Fr = Y[2], Ir = Y[3], $r = Y[4], C = Y[5], Rr = Y[6], Er = Y[7], kr = Y[8], Dr = P.length;
    for (let J = 0; J < Dr; J += 3) {
      const H = P[J], Q = P[J + 1], lr = P[J + 2];
      if (x[H] !== Or) {
        const V = H * 3, nr = H << 2, er = R[V], ar = R[V + 1], tr = R[V + 2];
        a[nr] = S * er + I * ar + k * tr + Z, a[nr + 1] = b * er + T * ar + U * tr + Mr, a[nr + 2] = q * er + F * ar + E * tr + u, a[nr + 3] = A * er + O * ar + X * tr + ir, x[H] = Or, m[H] = -1;
      }
      if (x[Q] !== Or) {
        const V = Q * 3, nr = Q << 2, er = R[V], ar = R[V + 1], tr = R[V + 2];
        a[nr] = S * er + I * ar + k * tr + Z, a[nr + 1] = b * er + T * ar + U * tr + Mr, a[nr + 2] = q * er + F * ar + E * tr + u, a[nr + 3] = A * er + O * ar + X * tr + ir, x[Q] = Or, m[Q] = -1;
      }
      if (x[lr] !== Or) {
        const V = lr * 3, nr = lr << 2, er = R[V], ar = R[V + 1], tr = R[V + 2];
        a[nr] = S * er + I * ar + k * tr + Z, a[nr + 1] = b * er + T * ar + U * tr + Mr, a[nr + 2] = q * er + F * ar + E * tr + u, a[nr + 3] = A * er + O * ar + X * tr + ir, x[lr] = Or, m[lr] = -1;
      }
      const Lr = H << 2, Pr = Q << 2, dr = lr << 2, en = a[Lr], an = a[Lr + 1], Vn = a[Lr + 2], wr = a[Lr + 3], tn = a[Pr], sn = a[Pr + 1], Yn = a[Pr + 2], gr = a[Pr + 3], cn = a[dr], ln = a[dr + 1], Un = a[dr + 2], zr = a[dr + 3];
      if (en < -wr && tn < -gr && cn < -zr || en > wr && tn > gr && cn > zr || an < -wr && sn < -gr && ln < -zr || an > wr && sn > gr && ln > zr || Vn < -wr && Yn < -gr && Un < -zr || Vn > wr && Yn > gr && Un > zr) continue;
      const Gn = 1 / wr, Xn = 1 / gr, Zn = 1 / zr, hn = en * Gn, fn = an * Gn, _n = tn * Xn, Hn = sn * Xn, Qn = cn * Zn, Jn = ln * Zn;
      if ((_n - hn) * (Jn - fn) - (Hn - fn) * (Qn - hn) > 0) continue;
      const br = H * 3, Ar = Q * 3, qr = lr * 3;
      t[$] = $;
      const vn = _[J], Mn = _[J + 1], dn = _[J + 2], yn = vn * W + Mn * Ir + dn * Rr, mn = vn * rr + Mn * $r + dn * Er, pn = vn * Fr + Mn * C + dn * kr, Kn = Math.sqrt(yn * yn + mn * mn + pn * pn), xn = Kn > 0 ? 1 / Kn : 0, T1 = J / 3 | 0, on = w.faceColors[T1 % w.faceColors.length], Nr = w.colors[on] << 24 | w.colors[on + 1] << 16 | w.colors[on + 2] << 8 | 255;
      if (i[$] = Nr, m[H] === -1) {
        const V = o * 3;
        wn(
          e,
          br,
          R[br],
          R[br + 1],
          R[br + 2],
          f
        ), y[V] = hn, y[V + 1] = -fn, y[V + 2] = Nr, m[H] = V, o++;
      }
      if (p[$ * 3] = m[H], m[Q] === -1) {
        const V = o * 3;
        wn(
          e,
          Ar,
          R[Ar],
          R[Ar + 1],
          R[Ar + 2],
          f
        ), y[V] = _n, y[V + 1] = -Hn, y[V + 2] = Nr, m[Q] = V, o++;
      }
      if (p[$ * 3 + 1] = m[Q], m[lr] === -1) {
        const V = o * 3;
        wn(
          e,
          qr,
          R[qr],
          R[qr + 1],
          R[qr + 2],
          f
        ), y[V] = Qn, y[V + 1] = -Jn, y[V + 2] = Nr, m[lr] = V, o++;
      }
      p[$ * 3 + 2] = m[lr];
      const pr = $ * 9;
      c[pr] = e[br], c[pr + 1] = e[br + 1];
      const S1 = c[pr + 2] = e[br + 2];
      c[pr + 3] = e[Ar], c[pr + 4] = e[Ar + 1];
      const F1 = c[pr + 5] = e[Ar + 2];
      c[pr + 6] = e[qr], c[pr + 7] = e[qr + 1];
      const I1 = c[pr + 8] = e[qr + 2];
      s[$] = (S1 + F1 + I1) * 0.33333;
      const $n = $ * 3;
      d[$n] = yn * xn, d[$n + 1] = mn * xn, d[$n + 2] = pn * xn, $++;
    }
  }
  return $;
}
function ac(r, n, e, a, t, s) {
  const i = e.light;
  if (!i) return;
  i.transform.forward(a);
  const c = -a[0], l = -a[1], h = -a[2];
  for (let f = 0; f < r; f++) {
    const v = s[f * 3], M = s[f * 3 + 1], d = s[f * 3 + 2], y = v * c + M * l + d * h, p = Math.max(t, y), m = n[f], x = (m >>> 24 & 255) * p, $ = (m >>> 16 & 255) * p, o = (m >>> 8 & 255) * p;
    n[f] = x << 24 | $ << 16 | o << 8 | 255;
  }
}
function tc(r, n, e, a, t, s, i, c) {
  if (t !== D.FogType.NONE)
    for (let l = 0; l < r; l++) {
      const h = e[l], f = a[l];
      let v = 0, M = h >>> 24 & 255, d = h >>> 16 & 255, y = h >>> 8 & 255;
      if (t === D.FogType.RADIAL_FAST || t === D.FogType.RADIAL) {
        const p = n[l * 9], m = n[l * 9 + 1], x = n[l * 9 + 2], $ = n[l * 9 + 3], o = n[l * 9 + 4], g = n[l * 9 + 5], w = n[l * 9 + 6], z = n[l * 9 + 7], S = n[l * 9 + 8], b = (p + $ + w) * 0.33333, q = (m + o + z) * 0.33333, A = (x + g + S) * 0.33333;
        if (t === D.FogType.RADIAL_FAST) {
          const I = i * i, F = 1 / (c * c - I);
          v = (b * b + q * q + A * A - I) * F;
        } else
          v = (Math.sqrt(b * b + q * q + A * A) - i) / (c - i);
      } else t === D.FogType.LINEAR && (v = (f - i) / (c - i));
      v > 1 && (v = 1), v > 0 && (M = M * (1 - v) + s[0] * v | 0, d = d * (1 - v) + s[1] * v | 0, y = y * (1 - v) + s[2] * v | 0, e[l] = M << 24 | d << 16 | y << 8 | 255);
    }
}
function sc(r, n, e, a) {
  for (let t = 0; t < n; t++) {
    const s = e[t];
    let i = s >>> 24 & 255, c = s >>> 16 & 255, l = s >>> 8 & 255;
    const h = i & 248, f = c & 252, v = l & 248;
    a[t] = h << 8 | f << 3 | v >> 3;
  }
}
function ic(r, n, e, a, t, s, i, c, l, h, f) {
  const v = h * 0.5, M = f * 0.5, d = i + s;
  r.lineJoin = "round", r.lineWidth = 1, l && r.clearRect(0, 0, r.canvas.width, r.canvas.height);
  for (let y = i; y < d; y++) {
    const p = a[y], m = e[p * 3], x = e[p * 3 + 1], $ = e[p * 3 + 2], o = t[p];
    r.beginPath(), r.moveTo(
      n[m] * v + v,
      n[m + 1] * M + M
    ), r.lineTo(
      n[x] * v + v,
      n[x + 1] * M + M
    ), r.lineTo(
      n[$] * v + v,
      n[$ + 1] * M + M
    ), r.closePath(), r.strokeStyle = r.fillStyle = A1[o], c && r.stroke(), r.fill();
  }
}
function cc(r, n, e, a, t, s, i, c) {
  const l = i * 0.5, h = c * 0.5, f = s + t;
  r.lineJoin = "miter", r.lineWidth = 0.5, r.strokeStyle = "rgb(0,0,255)", r.clearRect(0, 0, r.canvas.width, r.canvas.height);
  for (let v = s; v < f; v++) {
    const M = a[v], d = e[M * 3], y = e[M * 3 + 1], p = e[M * 3 + 2];
    r.beginPath(), r.moveTo(
      n[d] * l + l,
      n[d + 1] * h + h
    ), r.lineTo(
      n[y] * l + l,
      n[y + 1] * h + h
    ), r.lineTo(
      n[p] * l + l,
      n[p + 1] * h + h
    ), r.closePath(), r.stroke();
  }
}
const ne = Kr;
function O1(r, n) {
  this.canvas = n || document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new q1(), this.camera = r, this.layers = [];
  for (var e = 0; e < jr.layersCount; e++) {
    var a = document.createElement("canvas");
    this.layers[e] = a.getContext("2d"), this.layers[e].imageSmoothingEnabled = !1, this.layers[e].webkitImageSmoothingEnabled = !1;
  }
  var t = this;
  window.addEventListener("resize", function() {
    t.setSize(t.canvas.offsetWidth, t.canvas.offsetHeight);
  });
  const s = this;
  this.startRenderLoop = function i() {
    requestAnimationFrame(() => {
      s.render(), requestAnimationFrame(i);
    });
  }, this.lastRenderStats = {};
}
var vr = O1.prototype;
vr.size = null;
vr.dpr = 1;
vr.width = null;
vr.height = null;
vr.viewportMatrix = null;
vr.camera = null;
vr.canvas = null;
vr.context = null;
vr.start = function() {
  this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight), this.startRenderLoop();
};
vr.render = function() {
  this.camera !== null && this.renderer.render(this.camera.gameObject, this, this.lastRenderStats);
};
vr.setSize = function(r, n) {
  const e = r * this.dpr, a = n * this.dpr;
  this.width = r, this.height = n, this.canvas.width = r, this.canvas.height = n, this.viewportMatrix[0] = r / 2, this.viewportMatrix[5] = -n / 2, this.viewportMatrix[12] = r / 2, this.viewportMatrix[13] = n / 2;
  for (var t = 0; t < this.layers.length; t++) {
    var s = this.layers[t];
    s.canvas.width = r, s.canvas.height = n;
  }
  this.camera.setup(e, a);
};
vr.getWorldToScreen = function() {
  return ne(
    this.worldToScreenMatrix,
    this.viewportMatrix,
    this.camera.projectionMatrix
  ), ne(
    this.worldToScreenMatrix,
    this.worldToScreenMatrix,
    this.camera.gameObject.transform.getWorldToLocal()
  ), this.worldToScreenMatrix;
};
function Hr() {
  N.call(this);
}
Hr.prototype = Object.create(N.prototype);
Hr.prototype.constructor = Hr;
function j1(r) {
  K.call(this, r || "directional light"), this.addComponent(new Hr());
}
j1.prototype = Object.create(K.prototype);
const lc = window.scaliaEngine = {
  config: jr,
  Game: se,
  GameObject: K,
  Component: N,
  Camera: $1,
  CameraComponent: D,
  MeshComponent: G,
  TransformComponent: nn,
  SpriteRenderer: Wn,
  glMatrix: Xi,
  PathRenderer: Cn,
  TextRenderer: En,
  Plane: w1,
  Box: g1,
  Cone: z1,
  Ball: b1,
  DirectionalLight: j1,
  Canvas2dViewport: O1
};
export {
  lc as default
};
