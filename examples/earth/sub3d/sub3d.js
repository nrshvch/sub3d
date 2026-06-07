const fe = {
  depthSortingMask: parseInt("11", 2),
  //bitmask, bit per layer
  layerStrokeMask: parseInt("11", 2),
  //bitmask, bit per layer
  layerClearMask: parseInt("11", 2),
  //bitmask, bit per layer
  layersCount: 2,
  debug: !0
};
function p1() {
  this.now = Date.now();
}
var Xe = p1.prototype;
Xe.time = 0;
Xe.now = 0;
Xe.dt = 60;
function x1() {
  this.gameObjects = [];
}
var qe = x1.prototype;
qe.gameObjects = null;
qe.addGameObject = function(n) {
  this.gameObjects[this.gameObjects.length++] = n, n.setScene(this);
};
qe.removeGameObject = function(n) {
  this.gameObjects[this.gameObjects.indexOf(n)] = this.gameObjects[this.gameObjects.length - 1], this.gameObjects.length -= 1;
};
qe.retrieve = function() {
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
function g1(n) {
  this.time = new p1(), this.list = [], this.scene = new x1();
}
var oe = g1.prototype;
oe.scene = null;
oe.time = null;
oe.tickRegister = function(n) {
  n._tickerIndex === void 0 && (n._tickerIndex = this.list.length, this.list.push(n));
};
oe.tickUnregister = function(n) {
  const r = n._tickerIndex;
  if (r === void 0) return;
  const e = this.list.pop();
  e !== n && (this.list[r] = e, e._tickerIndex = r), n._tickerIndex = void 0;
};
oe.update = function(n) {
  const r = this.list;
  for (let e = 0; e < r.length; e++)
    r[e].tick(n);
};
oe.tick = function() {
  for (var n = Date.now(), r = 0, e = n - this.time.now, t = this.time.dt; e >= t && (e -= t, this.time.now += t, this.time.time += t, this.update(this.time), !(r++ > 200)); )
    ;
};
function w1() {
  this.world = new g1();
  var n = this.world;
  this.tick = function r() {
    n.tick(), requestAnimationFrame(r);
  };
}
var Te = w1.prototype;
Te.world = null;
Te.render = null;
Te.run = function() {
  this.tick();
};
Te.rafHandler = null;
function xn() {
}
var Se = xn.prototype;
Se.gameObject = null;
Se.enabled = !0;
Se.setGameObject = function(n) {
  this.gameObject = n;
};
Se.unsetGameObject = function() {
  this.gameObject = null;
};
function e0(n, r, e, t, s, a) {
  return n[r] = a[0] * e + a[4] * t + a[8] * s + a[12], n[r + 1] = a[1] * e + a[5] * t + a[9] * s + a[13], n[r + 2] = a[2] * e + a[6] * t + a[10] * s + a[14], n;
}
function t0(n, r, e, t, s, a) {
  return n[r] = a[0] * e + a[4] * t + a[8] * s + a[12], n[r + 1] = a[1] * e + a[5] * t + a[9] * s + a[13], n;
}
function Oe(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], d = r[9], o = r[10], M = r[11], m = r[12], y = r[13], p = r[14], z = r[15], w = e[0], b = e[1], g = e[2], $ = e[3];
  return n[0] = w * t + b * c + g * v + $ * m, n[1] = w * s + b * l + g * d + $ * y, n[2] = w * a + b * h + g * o + $ * p, n[3] = w * i + b * f + g * M + $ * z, w = e[4], b = e[5], g = e[6], $ = e[7], n[4] = w * t + b * c + g * v + $ * m, n[5] = w * s + b * l + g * d + $ * y, n[6] = w * a + b * h + g * o + $ * p, n[7] = w * i + b * f + g * M + $ * z, w = e[8], b = e[9], g = e[10], $ = e[11], n[8] = w * t + b * c + g * v + $ * m, n[9] = w * s + b * l + g * d + $ * y, n[10] = w * a + b * h + g * o + $ * p, n[11] = w * i + b * f + g * M + $ * z, w = e[12], b = e[13], g = e[14], $ = e[15], n[12] = w * t + b * c + g * v + $ * m, n[13] = w * s + b * l + g * d + $ * y, n[14] = w * a + b * h + g * o + $ * p, n[15] = w * i + b * f + g * M + $ * z, n;
}
var L = 1e-6, G = typeof Float32Array < "u" ? Float32Array : Array, Lr = Math.random, $1 = "zyx";
function Er(n) {
  return n >= 0 ? Math.round(n) : n % 0.5 === 0 ? Math.floor(n) : Math.round(n);
}
function s0(n) {
  G = n;
}
var a0 = Math.PI / 180, i0 = 180 / Math.PI;
function c0(n) {
  return n * a0;
}
function l0(n) {
  return n * i0;
}
function h0(n, r) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : L;
  return Math.abs(n - r) <= e * Math.max(1, Math.abs(n), Math.abs(r));
}
const f0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: $1,
  get ARRAY_TYPE() {
    return G;
  },
  EPSILON: L,
  RANDOM: Lr,
  equals: h0,
  round: Er,
  setMatrixArrayType: s0,
  toDegree: l0,
  toRadian: c0
}, Symbol.toStringTag, { value: "Module" }));
function v0() {
  var n = new G(4);
  return G != Float32Array && (n[1] = 0, n[2] = 0), n[0] = 1, n[3] = 1, n;
}
function o0(n) {
  var r = new G(4);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function d0(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n;
}
function M0(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function y0(n, r, e, t) {
  var s = new G(4);
  return s[0] = n, s[1] = r, s[2] = e, s[3] = t, s;
}
function m0(n, r, e, t, s) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n;
}
function p0(n, r) {
  if (n === r) {
    var e = r[1];
    n[1] = r[2], n[2] = e;
  } else
    n[0] = r[0], n[1] = r[2], n[2] = r[1], n[3] = r[3];
  return n;
}
function x0(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e * a - s * t;
  return i ? (i = 1 / i, n[0] = a * i, n[1] = -t * i, n[2] = -s * i, n[3] = e * i, n) : null;
}
function g0(n, r) {
  var e = r[0];
  return n[0] = r[3], n[1] = -r[1], n[2] = -r[2], n[3] = e, n;
}
function w0(n) {
  return n[0] * n[3] - n[2] * n[1];
}
function b1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return n[0] = t * c + a * l, n[1] = s * c + i * l, n[2] = t * h + a * f, n[3] = s * h + i * f, n;
}
function $0(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l + a * c, n[1] = s * l + i * c, n[2] = t * -c + a * l, n[3] = s * -c + i * l, n;
}
function b0(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1];
  return n[0] = t * c, n[1] = s * c, n[2] = a * l, n[3] = i * l, n;
}
function z0(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = e, n[2] = -e, n[3] = t, n;
}
function A0(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = r[1], n;
}
function q0(n) {
  return "mat2(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
function T0(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3]);
}
function S0(n, r, e, t) {
  return n[2] = t[2] / t[0], e[0] = t[0], e[1] = t[1], e[3] = t[3] - n[2] * e[1], [n, r, e];
}
function O0(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n;
}
function z1(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n;
}
function F0(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3];
}
function I0(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = r[0], c = r[1], l = r[2], h = r[3];
  return Math.abs(e - i) <= L * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(t - c) <= L * Math.max(1, Math.abs(t), Math.abs(c)) && Math.abs(s - l) <= L * Math.max(1, Math.abs(s), Math.abs(l)) && Math.abs(a - h) <= L * Math.max(1, Math.abs(a), Math.abs(h));
}
function j0(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n;
}
function R0(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n;
}
var L0 = b1, P0 = z1;
const _0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: S0,
  add: O0,
  adjoint: g0,
  clone: o0,
  copy: d0,
  create: v0,
  determinant: w0,
  equals: I0,
  exactEquals: F0,
  frob: T0,
  fromRotation: z0,
  fromScaling: A0,
  fromValues: y0,
  identity: M0,
  invert: x0,
  mul: L0,
  multiply: b1,
  multiplyScalar: j0,
  multiplyScalarAndAdd: R0,
  rotate: $0,
  scale: b0,
  set: m0,
  str: q0,
  sub: P0,
  subtract: z1,
  transpose: p0
}, Symbol.toStringTag, { value: "Module" }));
function k0() {
  var n = new G(6);
  return G != Float32Array && (n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0), n[0] = 1, n[3] = 1, n;
}
function C0(n) {
  var r = new G(6);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r;
}
function E0(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n;
}
function D0(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function W0(n, r, e, t, s, a) {
  var i = new G(6);
  return i[0] = n, i[1] = r, i[2] = e, i[3] = t, i[4] = s, i[5] = a, i;
}
function U0(n, r, e, t, s, a, i) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n;
}
function V0(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = e * a - t * s;
  return l ? (l = 1 / l, n[0] = a * l, n[1] = -t * l, n[2] = -s * l, n[3] = e * l, n[4] = (s * c - a * i) * l, n[5] = (t * i - e * c) * l, n) : null;
}
function N0(n) {
  return n[0] * n[3] - n[1] * n[2];
}
function A1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = e[0], f = e[1], v = e[2], d = e[3], o = e[4], M = e[5];
  return n[0] = t * h + a * f, n[1] = s * h + i * f, n[2] = t * v + a * d, n[3] = s * v + i * d, n[4] = t * o + a * M + c, n[5] = s * o + i * M + l, n;
}
function Y0(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = Math.sin(e), f = Math.cos(e);
  return n[0] = t * f + a * h, n[1] = s * f + i * h, n[2] = t * -h + a * f, n[3] = s * -h + i * f, n[4] = c, n[5] = l, n;
}
function X0(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = e[0], f = e[1];
  return n[0] = t * h, n[1] = s * h, n[2] = a * f, n[3] = i * f, n[4] = c, n[5] = l, n;
}
function Z0(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = e[0], f = e[1];
  return n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = t * h + a * f + c, n[5] = s * h + i * f + l, n;
}
function G0(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = e, n[2] = -e, n[3] = t, n[4] = 0, n[5] = 0, n;
}
function H0(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = r[1], n[4] = 0, n[5] = 0, n;
}
function B0(n, r) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = r[0], n[5] = r[1], n;
}
function Q0(n) {
  return "mat2d(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ")";
}
function J0(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + 1);
}
function K0(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n;
}
function q1(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n[4] = r[4] - e[4], n[5] = r[5] - e[5], n;
}
function u0(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n;
}
function ns(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n[4] = r[4] + e[4] * t, n[5] = r[5] + e[5] * t, n;
}
function rs(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5];
}
function es(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = r[0], h = r[1], f = r[2], v = r[3], d = r[4], o = r[5];
  return Math.abs(e - l) <= L * Math.max(1, Math.abs(e), Math.abs(l)) && Math.abs(t - h) <= L * Math.max(1, Math.abs(t), Math.abs(h)) && Math.abs(s - f) <= L * Math.max(1, Math.abs(s), Math.abs(f)) && Math.abs(a - v) <= L * Math.max(1, Math.abs(a), Math.abs(v)) && Math.abs(i - d) <= L * Math.max(1, Math.abs(i), Math.abs(d)) && Math.abs(c - o) <= L * Math.max(1, Math.abs(c), Math.abs(o));
}
var ts = A1, ss = q1;
const as = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: K0,
  clone: C0,
  copy: E0,
  create: k0,
  determinant: N0,
  equals: es,
  exactEquals: rs,
  frob: J0,
  fromRotation: G0,
  fromScaling: H0,
  fromTranslation: B0,
  fromValues: W0,
  identity: D0,
  invert: V0,
  mul: ts,
  multiply: A1,
  multiplyScalar: u0,
  multiplyScalarAndAdd: ns,
  rotate: Y0,
  scale: X0,
  set: U0,
  str: Q0,
  sub: ss,
  subtract: q1,
  translate: Z0
}, Symbol.toStringTag, { value: "Module" }));
function T1() {
  var n = new G(9);
  return G != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[0] = 1, n[4] = 1, n[8] = 1, n;
}
function is(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[4], n[4] = r[5], n[5] = r[6], n[6] = r[8], n[7] = r[9], n[8] = r[10], n;
}
function cs(n) {
  var r = new G(9);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r;
}
function ls(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n;
}
function hs(n, r, e, t, s, a, i, c, l) {
  var h = new G(9);
  return h[0] = n, h[1] = r, h[2] = e, h[3] = t, h[4] = s, h[5] = a, h[6] = i, h[7] = c, h[8] = l, h;
}
function fs(n, r, e, t, s, a, i, c, l, h) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n[6] = c, n[7] = l, n[8] = h, n;
}
function vs(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 1, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function os(n, r) {
  if (n === r) {
    var e = r[1], t = r[2], s = r[5];
    n[1] = r[3], n[2] = r[6], n[3] = e, n[5] = r[7], n[6] = t, n[7] = s;
  } else
    n[0] = r[0], n[1] = r[3], n[2] = r[6], n[3] = r[1], n[4] = r[4], n[5] = r[7], n[6] = r[2], n[7] = r[5], n[8] = r[8];
  return n;
}
function ds(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = f * i - c * h, d = -f * a + c * l, o = h * a - i * l, M = e * v + t * d + s * o;
  return M ? (M = 1 / M, n[0] = v * M, n[1] = (-f * t + s * h) * M, n[2] = (c * t - s * i) * M, n[3] = d * M, n[4] = (f * e - s * l) * M, n[5] = (-c * e + s * a) * M, n[6] = o * M, n[7] = (-h * e + t * l) * M, n[8] = (i * e - t * a) * M, n) : null;
}
function Ms(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8];
  return n[0] = i * f - c * h, n[1] = s * h - t * f, n[2] = t * c - s * i, n[3] = c * l - a * f, n[4] = e * f - s * l, n[5] = s * a - e * c, n[6] = a * h - i * l, n[7] = t * l - e * h, n[8] = e * i - t * a, n;
}
function ys(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3], a = n[4], i = n[5], c = n[6], l = n[7], h = n[8];
  return r * (h * a - i * l) + e * (-h * s + i * c) + t * (l * s - a * c);
}
function S1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], d = e[0], o = e[1], M = e[2], m = e[3], y = e[4], p = e[5], z = e[6], w = e[7], b = e[8];
  return n[0] = d * t + o * i + M * h, n[1] = d * s + o * c + M * f, n[2] = d * a + o * l + M * v, n[3] = m * t + y * i + p * h, n[4] = m * s + y * c + p * f, n[5] = m * a + y * l + p * v, n[6] = z * t + w * i + b * h, n[7] = z * s + w * c + b * f, n[8] = z * a + w * l + b * v, n;
}
function ms(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], d = e[0], o = e[1];
  return n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = c, n[5] = l, n[6] = d * t + o * i + h, n[7] = d * s + o * c + f, n[8] = d * a + o * l + v, n;
}
function ps(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], d = Math.sin(e), o = Math.cos(e);
  return n[0] = o * t + d * i, n[1] = o * s + d * c, n[2] = o * a + d * l, n[3] = o * i - d * t, n[4] = o * c - d * s, n[5] = o * l - d * a, n[6] = h, n[7] = f, n[8] = v, n;
}
function xs(n, r, e) {
  var t = e[0], s = e[1];
  return n[0] = t * r[0], n[1] = t * r[1], n[2] = t * r[2], n[3] = s * r[3], n[4] = s * r[4], n[5] = s * r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n;
}
function gs(n, r) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 1, n[5] = 0, n[6] = r[0], n[7] = r[1], n[8] = 1, n;
}
function ws(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = e, n[2] = 0, n[3] = -e, n[4] = t, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function $s(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = r[1], n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function bs(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = 0, n[3] = r[2], n[4] = r[3], n[5] = 0, n[6] = r[4], n[7] = r[5], n[8] = 1, n;
}
function zs(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e + e, c = t + t, l = s + s, h = e * i, f = t * i, v = t * c, d = s * i, o = s * c, M = s * l, m = a * i, y = a * c, p = a * l;
  return n[0] = 1 - v - M, n[3] = f - p, n[6] = d + y, n[1] = f + p, n[4] = 1 - h - M, n[7] = o - m, n[2] = d - y, n[5] = o + m, n[8] = 1 - h - v, n;
}
function As(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], d = r[10], o = r[11], M = r[12], m = r[13], y = r[14], p = r[15], z = e * c - t * i, w = e * l - s * i, b = e * h - a * i, g = t * l - s * c, $ = t * h - a * c, q = s * h - a * l, I = f * m - v * M, S = f * y - d * M, x = f * p - o * M, j = v * y - d * m, P = v * p - o * m, A = d * p - o * y, T = z * A - w * P + b * j + g * x - $ * S + q * I;
  return T ? (T = 1 / T, n[0] = (c * A - l * P + h * j) * T, n[1] = (l * x - i * A - h * S) * T, n[2] = (i * P - c * x + h * I) * T, n[3] = (s * P - t * A - a * j) * T, n[4] = (e * A - s * x + a * S) * T, n[5] = (t * x - e * P - a * I) * T, n[6] = (m * q - y * $ + p * g) * T, n[7] = (y * b - M * q - p * w) * T, n[8] = (M * $ - m * b + p * z) * T, n) : null;
}
function qs(n, r, e) {
  return n[0] = 2 / r, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = -2 / e, n[5] = 0, n[6] = -1, n[7] = 1, n[8] = 1, n;
}
function Ts(n) {
  return "mat3(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ", " + n[8] + ")";
}
function Ss(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + n[6] * n[6] + n[7] * n[7] + n[8] * n[8]);
}
function Os(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n[6] = r[6] + e[6], n[7] = r[7] + e[7], n[8] = r[8] + e[8], n;
}
function O1(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n[4] = r[4] - e[4], n[5] = r[5] - e[5], n[6] = r[6] - e[6], n[7] = r[7] - e[7], n[8] = r[8] - e[8], n;
}
function Fs(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n[6] = r[6] * e, n[7] = r[7] * e, n[8] = r[8] * e, n;
}
function Is(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n[4] = r[4] + e[4] * t, n[5] = r[5] + e[5] * t, n[6] = r[6] + e[6] * t, n[7] = r[7] + e[7] * t, n[8] = r[8] + e[8] * t, n;
}
function js(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5] && n[6] === r[6] && n[7] === r[7] && n[8] === r[8];
}
function Rs(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = r[0], d = r[1], o = r[2], M = r[3], m = r[4], y = r[5], p = r[6], z = r[7], w = r[8];
  return Math.abs(e - v) <= L * Math.max(1, Math.abs(e), Math.abs(v)) && Math.abs(t - d) <= L * Math.max(1, Math.abs(t), Math.abs(d)) && Math.abs(s - o) <= L * Math.max(1, Math.abs(s), Math.abs(o)) && Math.abs(a - M) <= L * Math.max(1, Math.abs(a), Math.abs(M)) && Math.abs(i - m) <= L * Math.max(1, Math.abs(i), Math.abs(m)) && Math.abs(c - y) <= L * Math.max(1, Math.abs(c), Math.abs(y)) && Math.abs(l - p) <= L * Math.max(1, Math.abs(l), Math.abs(p)) && Math.abs(h - z) <= L * Math.max(1, Math.abs(h), Math.abs(z)) && Math.abs(f - w) <= L * Math.max(1, Math.abs(f), Math.abs(w));
}
var Ls = S1, Ps = O1;
const _s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Os,
  adjoint: Ms,
  clone: cs,
  copy: ls,
  create: T1,
  determinant: ys,
  equals: Rs,
  exactEquals: js,
  frob: Ss,
  fromMat2d: bs,
  fromMat4: is,
  fromQuat: zs,
  fromRotation: ws,
  fromScaling: $s,
  fromTranslation: gs,
  fromValues: hs,
  identity: vs,
  invert: ds,
  mul: Ls,
  multiply: S1,
  multiplyScalar: Fs,
  multiplyScalarAndAdd: Is,
  normalFromMat4: As,
  projection: qs,
  rotate: ps,
  scale: xs,
  set: fs,
  str: Ts,
  sub: Ps,
  subtract: O1,
  translate: ms,
  transpose: os
}, Symbol.toStringTag, { value: "Module" }));
function ks() {
  var n = new G(16);
  return G != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0), n[0] = 1, n[5] = 1, n[10] = 1, n[15] = 1, n;
}
function Cs(n) {
  var r = new G(16);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r[9] = n[9], r[10] = n[10], r[11] = n[11], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15], r;
}
function Es(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n[9] = r[9], n[10] = r[10], n[11] = r[11], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], n;
}
function Ds(n, r, e, t, s, a, i, c, l, h, f, v, d, o, M, m) {
  var y = new G(16);
  return y[0] = n, y[1] = r, y[2] = e, y[3] = t, y[4] = s, y[5] = a, y[6] = i, y[7] = c, y[8] = l, y[9] = h, y[10] = f, y[11] = v, y[12] = d, y[13] = o, y[14] = M, y[15] = m, y;
}
function Ws(n, r, e, t, s, a, i, c, l, h, f, v, d, o, M, m, y) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n[6] = c, n[7] = l, n[8] = h, n[9] = f, n[10] = v, n[11] = d, n[12] = o, n[13] = M, n[14] = m, n[15] = y, n;
}
function Ze(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function Us(n, r) {
  if (n === r) {
    var e = r[1], t = r[2], s = r[3], a = r[6], i = r[7], c = r[11];
    n[1] = r[4], n[2] = r[8], n[3] = r[12], n[4] = e, n[6] = r[9], n[7] = r[13], n[8] = t, n[9] = a, n[11] = r[14], n[12] = s, n[13] = i, n[14] = c;
  } else
    n[0] = r[0], n[1] = r[4], n[2] = r[8], n[3] = r[12], n[4] = r[1], n[5] = r[5], n[6] = r[9], n[7] = r[13], n[8] = r[2], n[9] = r[6], n[10] = r[10], n[11] = r[14], n[12] = r[3], n[13] = r[7], n[14] = r[11], n[15] = r[15];
  return n;
}
function F1(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], d = r[10], o = r[11], M = r[12], m = r[13], y = r[14], p = r[15], z = e * c - t * i, w = e * l - s * i, b = e * h - a * i, g = t * l - s * c, $ = t * h - a * c, q = s * h - a * l, I = f * m - v * M, S = f * y - d * M, x = f * p - o * M, j = v * y - d * m, P = v * p - o * m, A = d * p - o * y, T = z * A - w * P + b * j + g * x - $ * S + q * I;
  return T ? (T = 1 / T, n[0] = (c * A - l * P + h * j) * T, n[1] = (s * P - t * A - a * j) * T, n[2] = (m * q - y * $ + p * g) * T, n[3] = (d * $ - v * q - o * g) * T, n[4] = (l * x - i * A - h * S) * T, n[5] = (e * A - s * x + a * S) * T, n[6] = (y * b - M * q - p * w) * T, n[7] = (f * q - d * b + o * w) * T, n[8] = (i * P - c * x + h * I) * T, n[9] = (t * x - e * P - a * I) * T, n[10] = (M * $ - m * b + p * z) * T, n[11] = (v * b - f * $ - o * z) * T, n[12] = (c * S - i * j - l * I) * T, n[13] = (e * j - t * S + s * I) * T, n[14] = (m * w - M * g - y * z) * T, n[15] = (f * g - v * w + d * z) * T, n) : null;
}
function Vs(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], d = r[10], o = r[11], M = r[12], m = r[13], y = r[14], p = r[15], z = e * c - t * i, w = e * l - s * i, b = e * h - a * i, g = t * l - s * c, $ = t * h - a * c, q = s * h - a * l, I = f * m - v * M, S = f * y - d * M, x = f * p - o * M, j = v * y - d * m, P = v * p - o * m, A = d * p - o * y;
  return n[0] = c * A - l * P + h * j, n[1] = s * P - t * A - a * j, n[2] = m * q - y * $ + p * g, n[3] = d * $ - v * q - o * g, n[4] = l * x - i * A - h * S, n[5] = e * A - s * x + a * S, n[6] = y * b - M * q - p * w, n[7] = f * q - d * b + o * w, n[8] = i * P - c * x + h * I, n[9] = t * x - e * P - a * I, n[10] = M * $ - m * b + p * z, n[11] = v * b - f * $ - o * z, n[12] = c * S - i * j - l * I, n[13] = e * j - t * S + s * I, n[14] = m * w - M * g - y * z, n[15] = f * g - v * w + d * z, n;
}
function Ns(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3], a = n[4], i = n[5], c = n[6], l = n[7], h = n[8], f = n[9], v = n[10], d = n[11], o = n[12], M = n[13], m = n[14], y = n[15], p = r * i - e * a, z = r * c - t * a, w = e * c - t * i, b = h * M - f * o, g = h * m - v * o, $ = f * m - v * M, q = r * $ - e * g + t * b, I = a * $ - i * g + c * b, S = h * w - f * z + v * p, x = o * w - M * z + m * p;
  return l * q - s * I + y * S - d * x;
}
function I1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], d = r[9], o = r[10], M = r[11], m = r[12], y = r[13], p = r[14], z = r[15], w = e[0], b = e[1], g = e[2], $ = e[3];
  return n[0] = w * t + b * c + g * v + $ * m, n[1] = w * s + b * l + g * d + $ * y, n[2] = w * a + b * h + g * o + $ * p, n[3] = w * i + b * f + g * M + $ * z, w = e[4], b = e[5], g = e[6], $ = e[7], n[4] = w * t + b * c + g * v + $ * m, n[5] = w * s + b * l + g * d + $ * y, n[6] = w * a + b * h + g * o + $ * p, n[7] = w * i + b * f + g * M + $ * z, w = e[8], b = e[9], g = e[10], $ = e[11], n[8] = w * t + b * c + g * v + $ * m, n[9] = w * s + b * l + g * d + $ * y, n[10] = w * a + b * h + g * o + $ * p, n[11] = w * i + b * f + g * M + $ * z, w = e[12], b = e[13], g = e[14], $ = e[15], n[12] = w * t + b * c + g * v + $ * m, n[13] = w * s + b * l + g * d + $ * y, n[14] = w * a + b * h + g * o + $ * p, n[15] = w * i + b * f + g * M + $ * z, n;
}
function Ne(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i, c, l, h, f, v, d, o, M, m, y, p;
  return r === n ? (n[12] = r[0] * t + r[4] * s + r[8] * a + r[12], n[13] = r[1] * t + r[5] * s + r[9] * a + r[13], n[14] = r[2] * t + r[6] * s + r[10] * a + r[14], n[15] = r[3] * t + r[7] * s + r[11] * a + r[15]) : (i = r[0], c = r[1], l = r[2], h = r[3], f = r[4], v = r[5], d = r[6], o = r[7], M = r[8], m = r[9], y = r[10], p = r[11], n[0] = i, n[1] = c, n[2] = l, n[3] = h, n[4] = f, n[5] = v, n[6] = d, n[7] = o, n[8] = M, n[9] = m, n[10] = y, n[11] = p, n[12] = i * t + f * s + M * a + r[12], n[13] = c * t + v * s + m * a + r[13], n[14] = l * t + d * s + y * a + r[14], n[15] = h * t + o * s + p * a + r[15]), n;
}
function j1(n, r, e) {
  var t = e[0], s = e[1], a = e[2];
  return n[0] = r[0] * t, n[1] = r[1] * t, n[2] = r[2] * t, n[3] = r[3] * t, n[4] = r[4] * s, n[5] = r[5] * s, n[6] = r[6] * s, n[7] = r[7] * s, n[8] = r[8] * a, n[9] = r[9] * a, n[10] = r[10] * a, n[11] = r[11] * a, n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], n;
}
function Ys(n, r, e, t) {
  var s = t[0], a = t[1], i = t[2], c = Math.sqrt(s * s + a * a + i * i), l, h, f, v, d, o, M, m, y, p, z, w, b, g, $, q, I, S, x, j, P, A, T, R;
  return c < L ? null : (c = 1 / c, s *= c, a *= c, i *= c, l = Math.sin(e), h = Math.cos(e), f = 1 - h, v = r[0], d = r[1], o = r[2], M = r[3], m = r[4], y = r[5], p = r[6], z = r[7], w = r[8], b = r[9], g = r[10], $ = r[11], q = s * s * f + h, I = a * s * f + i * l, S = i * s * f - a * l, x = s * a * f - i * l, j = a * a * f + h, P = i * a * f + s * l, A = s * i * f + a * l, T = a * i * f - s * l, R = i * i * f + h, n[0] = v * q + m * I + w * S, n[1] = d * q + y * I + b * S, n[2] = o * q + p * I + g * S, n[3] = M * q + z * I + $ * S, n[4] = v * x + m * j + w * P, n[5] = d * x + y * j + b * P, n[6] = o * x + p * j + g * P, n[7] = M * x + z * j + $ * P, n[8] = v * A + m * T + w * R, n[9] = d * A + y * T + b * R, n[10] = o * A + p * T + g * R, n[11] = M * A + z * T + $ * R, r !== n && (n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n);
}
function Xs(n, r, e) {
  var t = Math.sin(e), s = Math.cos(e), a = r[4], i = r[5], c = r[6], l = r[7], h = r[8], f = r[9], v = r[10], d = r[11];
  return r !== n && (n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n[4] = a * s + h * t, n[5] = i * s + f * t, n[6] = c * s + v * t, n[7] = l * s + d * t, n[8] = h * s - a * t, n[9] = f * s - i * t, n[10] = v * s - c * t, n[11] = d * s - l * t, n;
}
function Zs(n, r, e) {
  var t = Math.sin(e), s = Math.cos(e), a = r[0], i = r[1], c = r[2], l = r[3], h = r[8], f = r[9], v = r[10], d = r[11];
  return r !== n && (n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n[0] = a * s - h * t, n[1] = i * s - f * t, n[2] = c * s - v * t, n[3] = l * s - d * t, n[8] = a * t + h * s, n[9] = i * t + f * s, n[10] = c * t + v * s, n[11] = l * t + d * s, n;
}
function Gs(n, r, e) {
  var t = Math.sin(e), s = Math.cos(e), a = r[0], i = r[1], c = r[2], l = r[3], h = r[4], f = r[5], v = r[6], d = r[7];
  return r !== n && (n[8] = r[8], n[9] = r[9], n[10] = r[10], n[11] = r[11], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n[0] = a * s + h * t, n[1] = i * s + f * t, n[2] = c * s + v * t, n[3] = l * s + d * t, n[4] = h * s - a * t, n[5] = f * s - i * t, n[6] = v * s - c * t, n[7] = d * s - l * t, n;
}
function Hs(n, r) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = r[0], n[13] = r[1], n[14] = r[2], n[15] = 1, n;
}
function Bs(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = r[1], n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = r[2], n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function Qs(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = Math.sqrt(t * t + s * s + a * a), c, l, h;
  return i < L ? null : (i = 1 / i, t *= i, s *= i, a *= i, c = Math.sin(r), l = Math.cos(r), h = 1 - l, n[0] = t * t * h + l, n[1] = s * t * h + a * c, n[2] = a * t * h - s * c, n[3] = 0, n[4] = t * s * h - a * c, n[5] = s * s * h + l, n[6] = a * s * h + t * c, n[7] = 0, n[8] = t * a * h + s * c, n[9] = s * a * h - t * c, n[10] = a * a * h + l, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n);
}
function Js(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = t, n[6] = e, n[7] = 0, n[8] = 0, n[9] = -e, n[10] = t, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function Ks(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = 0, n[2] = -e, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = e, n[9] = 0, n[10] = t, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function us(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = e, n[2] = 0, n[3] = 0, n[4] = -e, n[5] = t, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function R1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = t + t, l = s + s, h = a + a, f = t * c, v = t * l, d = t * h, o = s * l, M = s * h, m = a * h, y = i * c, p = i * l, z = i * h;
  return n[0] = 1 - (o + m), n[1] = v + z, n[2] = d - p, n[3] = 0, n[4] = v - z, n[5] = 1 - (f + m), n[6] = M + y, n[7] = 0, n[8] = d + p, n[9] = M - y, n[10] = 1 - (f + o), n[11] = 0, n[12] = e[0], n[13] = e[1], n[14] = e[2], n[15] = 1, n;
}
function na(n, r) {
  var e = new G(3), t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = t * t + s * s + a * a + i * i;
  return v > 0 ? (e[0] = (c * i + f * t + l * a - h * s) * 2 / v, e[1] = (l * i + f * s + h * t - c * a) * 2 / v, e[2] = (h * i + f * a + c * s - l * t) * 2 / v) : (e[0] = (c * i + f * t + l * a - h * s) * 2, e[1] = (l * i + f * s + h * t - c * a) * 2, e[2] = (h * i + f * a + c * s - l * t) * 2), R1(n, r, e), n;
}
function L1(n, r) {
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
}
function P1(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[4], i = r[5], c = r[6], l = r[8], h = r[9], f = r[10];
  return n[0] = Math.sqrt(e * e + t * t + s * s), n[1] = Math.sqrt(a * a + i * i + c * c), n[2] = Math.sqrt(l * l + h * h + f * f), n;
}
function _1(n, r) {
  var e = new G(3);
  P1(e, r);
  var t = 1 / e[0], s = 1 / e[1], a = 1 / e[2], i = r[0] * t, c = r[1] * s, l = r[2] * a, h = r[4] * t, f = r[5] * s, v = r[6] * a, d = r[8] * t, o = r[9] * s, M = r[10] * a, m = i + f + M, y = 0;
  return m > 0 ? (y = Math.sqrt(m + 1) * 2, n[3] = 0.25 * y, n[0] = (v - o) / y, n[1] = (d - l) / y, n[2] = (c - h) / y) : i > f && i > M ? (y = Math.sqrt(1 + i - f - M) * 2, n[3] = (v - o) / y, n[0] = 0.25 * y, n[1] = (c + h) / y, n[2] = (d + l) / y) : f > M ? (y = Math.sqrt(1 + f - i - M) * 2, n[3] = (d - l) / y, n[0] = (c + h) / y, n[1] = 0.25 * y, n[2] = (v + o) / y) : (y = Math.sqrt(1 + M - i - f) * 2, n[3] = (c - h) / y, n[0] = (d + l) / y, n[1] = (v + o) / y, n[2] = 0.25 * y), n;
}
function ra(n, r, e, t) {
  r[0] = t[12], r[1] = t[13], r[2] = t[14];
  var s = t[0], a = t[1], i = t[2], c = t[4], l = t[5], h = t[6], f = t[8], v = t[9], d = t[10];
  e[0] = Math.sqrt(s * s + a * a + i * i), e[1] = Math.sqrt(c * c + l * l + h * h), e[2] = Math.sqrt(f * f + v * v + d * d);
  var o = 1 / e[0], M = 1 / e[1], m = 1 / e[2], y = s * o, p = a * M, z = i * m, w = c * o, b = l * M, g = h * m, $ = f * o, q = v * M, I = d * m, S = y + b + I, x = 0;
  return S > 0 ? (x = Math.sqrt(S + 1) * 2, n[3] = 0.25 * x, n[0] = (g - q) / x, n[1] = ($ - z) / x, n[2] = (p - w) / x) : y > b && y > I ? (x = Math.sqrt(1 + y - b - I) * 2, n[3] = (g - q) / x, n[0] = 0.25 * x, n[1] = (p + w) / x, n[2] = ($ + z) / x) : b > I ? (x = Math.sqrt(1 + b - y - I) * 2, n[3] = ($ - z) / x, n[0] = (p + w) / x, n[1] = 0.25 * x, n[2] = (g + q) / x) : (x = Math.sqrt(1 + I - y - b) * 2, n[3] = (p - w) / x, n[0] = ($ + z) / x, n[1] = (g + q) / x, n[2] = 0.25 * x), n;
}
function ea(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = r[3], l = s + s, h = a + a, f = i + i, v = s * l, d = s * h, o = s * f, M = a * h, m = a * f, y = i * f, p = c * l, z = c * h, w = c * f, b = t[0], g = t[1], $ = t[2];
  return n[0] = (1 - (M + y)) * b, n[1] = (d + w) * b, n[2] = (o - z) * b, n[3] = 0, n[4] = (d - w) * g, n[5] = (1 - (v + y)) * g, n[6] = (m + p) * g, n[7] = 0, n[8] = (o + z) * $, n[9] = (m - p) * $, n[10] = (1 - (v + M)) * $, n[11] = 0, n[12] = e[0], n[13] = e[1], n[14] = e[2], n[15] = 1, n;
}
function ta(n, r, e, t, s) {
  var a = r[0], i = r[1], c = r[2], l = r[3], h = a + a, f = i + i, v = c + c, d = a * h, o = a * f, M = a * v, m = i * f, y = i * v, p = c * v, z = l * h, w = l * f, b = l * v, g = t[0], $ = t[1], q = t[2], I = s[0], S = s[1], x = s[2], j = (1 - (m + p)) * g, P = (o + b) * g, A = (M - w) * g, T = (o - b) * $, R = (1 - (d + p)) * $, D = (y + z) * $, U = (M + w) * q, Vn = (y - z) * q, O = (1 - (d + m)) * q;
  return n[0] = j, n[1] = P, n[2] = A, n[3] = 0, n[4] = T, n[5] = R, n[6] = D, n[7] = 0, n[8] = U, n[9] = Vn, n[10] = O, n[11] = 0, n[12] = e[0] + I - (j * I + T * S + U * x), n[13] = e[1] + S - (P * I + R * S + Vn * x), n[14] = e[2] + x - (A * I + D * S + O * x), n[15] = 1, n;
}
function sa(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e + e, c = t + t, l = s + s, h = e * i, f = t * i, v = t * c, d = s * i, o = s * c, M = s * l, m = a * i, y = a * c, p = a * l;
  return n[0] = 1 - v - M, n[1] = f + p, n[2] = d - y, n[3] = 0, n[4] = f - p, n[5] = 1 - h - M, n[6] = o + m, n[7] = 0, n[8] = d + y, n[9] = o - m, n[10] = 1 - h - v, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function aa(n, r, e, t, s, a, i) {
  var c = 1 / (e - r), l = 1 / (s - t), h = 1 / (a - i);
  return n[0] = a * 2 * c, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = a * 2 * l, n[6] = 0, n[7] = 0, n[8] = (e + r) * c, n[9] = (s + t) * l, n[10] = (i + a) * h, n[11] = -1, n[12] = 0, n[13] = 0, n[14] = i * a * 2 * h, n[15] = 0, n;
}
function k1(n, r, e, t, s) {
  var a = 1 / Math.tan(r / 2);
  if (n[0] = a / e, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = a, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = -1, n[12] = 0, n[13] = 0, n[15] = 0, s != null && s !== 1 / 0) {
    var i = 1 / (t - s);
    n[10] = (s + t) * i, n[14] = 2 * s * t * i;
  } else
    n[10] = -1, n[14] = -2 * t;
  return n;
}
var ia = k1;
function ca(n, r, e, t, s) {
  var a = 1 / Math.tan(r / 2);
  if (n[0] = a / e, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = a, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = -1, n[12] = 0, n[13] = 0, n[15] = 0, s != null && s !== 1 / 0) {
    var i = 1 / (t - s);
    n[10] = s * i, n[14] = s * t * i;
  } else
    n[10] = -1, n[14] = -t;
  return n;
}
function la(n, r, e, t) {
  var s = Math.tan(r.upDegrees * Math.PI / 180), a = Math.tan(r.downDegrees * Math.PI / 180), i = Math.tan(r.leftDegrees * Math.PI / 180), c = Math.tan(r.rightDegrees * Math.PI / 180), l = 2 / (i + c), h = 2 / (s + a);
  return n[0] = l, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = h, n[6] = 0, n[7] = 0, n[8] = -((i - c) * l * 0.5), n[9] = (s - a) * h * 0.5, n[10] = t / (e - t), n[11] = -1, n[12] = 0, n[13] = 0, n[14] = t * e / (e - t), n[15] = 0, n;
}
function C1(n, r, e, t, s, a, i) {
  var c = 1 / (r - e), l = 1 / (t - s), h = 1 / (a - i);
  return n[0] = -2 * c, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * l, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 2 * h, n[11] = 0, n[12] = (r + e) * c, n[13] = (s + t) * l, n[14] = (i + a) * h, n[15] = 1, n;
}
var E1 = C1;
function ha(n, r, e, t, s, a, i) {
  var c = 1 / (r - e), l = 1 / (t - s), h = 1 / (a - i);
  return n[0] = -2 * c, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * l, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = h, n[11] = 0, n[12] = (r + e) * c, n[13] = (s + t) * l, n[14] = a * h, n[15] = 1, n;
}
function fa(n, r, e, t) {
  var s, a, i, c, l, h, f, v, d, o, M = r[0], m = r[1], y = r[2], p = t[0], z = t[1], w = t[2], b = e[0], g = e[1], $ = e[2];
  return Math.abs(M - b) < L && Math.abs(m - g) < L && Math.abs(y - $) < L ? Ze(n) : (f = M - b, v = m - g, d = y - $, o = 1 / Math.sqrt(f * f + v * v + d * d), f *= o, v *= o, d *= o, s = z * d - w * v, a = w * f - p * d, i = p * v - z * f, o = Math.sqrt(s * s + a * a + i * i), o ? (o = 1 / o, s *= o, a *= o, i *= o) : (s = 0, a = 0, i = 0), c = v * i - d * a, l = d * s - f * i, h = f * a - v * s, o = Math.sqrt(c * c + l * l + h * h), o ? (o = 1 / o, c *= o, l *= o, h *= o) : (c = 0, l = 0, h = 0), n[0] = s, n[1] = c, n[2] = f, n[3] = 0, n[4] = a, n[5] = l, n[6] = v, n[7] = 0, n[8] = i, n[9] = h, n[10] = d, n[11] = 0, n[12] = -(s * M + a * m + i * y), n[13] = -(c * M + l * m + h * y), n[14] = -(f * M + v * m + d * y), n[15] = 1, n);
}
function va(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = t[0], l = t[1], h = t[2], f = s - e[0], v = a - e[1], d = i - e[2], o = f * f + v * v + d * d;
  o > 0 && (o = 1 / Math.sqrt(o), f *= o, v *= o, d *= o);
  var M = l * d - h * v, m = h * f - c * d, y = c * v - l * f;
  return o = M * M + m * m + y * y, o > 0 && (o = 1 / Math.sqrt(o), M *= o, m *= o, y *= o), n[0] = M, n[1] = m, n[2] = y, n[3] = 0, n[4] = v * y - d * m, n[5] = d * M - f * y, n[6] = f * m - v * M, n[7] = 0, n[8] = f, n[9] = v, n[10] = d, n[11] = 0, n[12] = s, n[13] = a, n[14] = i, n[15] = 1, n;
}
function oa(n) {
  return "mat4(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ", " + n[8] + ", " + n[9] + ", " + n[10] + ", " + n[11] + ", " + n[12] + ", " + n[13] + ", " + n[14] + ", " + n[15] + ")";
}
function da(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + n[6] * n[6] + n[7] * n[7] + n[8] * n[8] + n[9] * n[9] + n[10] * n[10] + n[11] * n[11] + n[12] * n[12] + n[13] * n[13] + n[14] * n[14] + n[15] * n[15]);
}
function Ma(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n[6] = r[6] + e[6], n[7] = r[7] + e[7], n[8] = r[8] + e[8], n[9] = r[9] + e[9], n[10] = r[10] + e[10], n[11] = r[11] + e[11], n[12] = r[12] + e[12], n[13] = r[13] + e[13], n[14] = r[14] + e[14], n[15] = r[15] + e[15], n;
}
function D1(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n[4] = r[4] - e[4], n[5] = r[5] - e[5], n[6] = r[6] - e[6], n[7] = r[7] - e[7], n[8] = r[8] - e[8], n[9] = r[9] - e[9], n[10] = r[10] - e[10], n[11] = r[11] - e[11], n[12] = r[12] - e[12], n[13] = r[13] - e[13], n[14] = r[14] - e[14], n[15] = r[15] - e[15], n;
}
function ya(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n[6] = r[6] * e, n[7] = r[7] * e, n[8] = r[8] * e, n[9] = r[9] * e, n[10] = r[10] * e, n[11] = r[11] * e, n[12] = r[12] * e, n[13] = r[13] * e, n[14] = r[14] * e, n[15] = r[15] * e, n;
}
function ma(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n[4] = r[4] + e[4] * t, n[5] = r[5] + e[5] * t, n[6] = r[6] + e[6] * t, n[7] = r[7] + e[7] * t, n[8] = r[8] + e[8] * t, n[9] = r[9] + e[9] * t, n[10] = r[10] + e[10] * t, n[11] = r[11] + e[11] * t, n[12] = r[12] + e[12] * t, n[13] = r[13] + e[13] * t, n[14] = r[14] + e[14] * t, n[15] = r[15] + e[15] * t, n;
}
function pa(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5] && n[6] === r[6] && n[7] === r[7] && n[8] === r[8] && n[9] === r[9] && n[10] === r[10] && n[11] === r[11] && n[12] === r[12] && n[13] === r[13] && n[14] === r[14] && n[15] === r[15];
}
function xa(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = n[9], d = n[10], o = n[11], M = n[12], m = n[13], y = n[14], p = n[15], z = r[0], w = r[1], b = r[2], g = r[3], $ = r[4], q = r[5], I = r[6], S = r[7], x = r[8], j = r[9], P = r[10], A = r[11], T = r[12], R = r[13], D = r[14], U = r[15];
  return Math.abs(e - z) <= L * Math.max(1, Math.abs(e), Math.abs(z)) && Math.abs(t - w) <= L * Math.max(1, Math.abs(t), Math.abs(w)) && Math.abs(s - b) <= L * Math.max(1, Math.abs(s), Math.abs(b)) && Math.abs(a - g) <= L * Math.max(1, Math.abs(a), Math.abs(g)) && Math.abs(i - $) <= L * Math.max(1, Math.abs(i), Math.abs($)) && Math.abs(c - q) <= L * Math.max(1, Math.abs(c), Math.abs(q)) && Math.abs(l - I) <= L * Math.max(1, Math.abs(l), Math.abs(I)) && Math.abs(h - S) <= L * Math.max(1, Math.abs(h), Math.abs(S)) && Math.abs(f - x) <= L * Math.max(1, Math.abs(f), Math.abs(x)) && Math.abs(v - j) <= L * Math.max(1, Math.abs(v), Math.abs(j)) && Math.abs(d - P) <= L * Math.max(1, Math.abs(d), Math.abs(P)) && Math.abs(o - A) <= L * Math.max(1, Math.abs(o), Math.abs(A)) && Math.abs(M - T) <= L * Math.max(1, Math.abs(M), Math.abs(T)) && Math.abs(m - R) <= L * Math.max(1, Math.abs(m), Math.abs(R)) && Math.abs(y - D) <= L * Math.max(1, Math.abs(y), Math.abs(D)) && Math.abs(p - U) <= L * Math.max(1, Math.abs(p), Math.abs(U));
}
var ga = I1, wa = D1;
const W1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Ma,
  adjoint: Vs,
  clone: Cs,
  copy: Es,
  create: ks,
  decompose: ra,
  determinant: Ns,
  equals: xa,
  exactEquals: pa,
  frob: da,
  fromQuat: sa,
  fromQuat2: na,
  fromRotation: Qs,
  fromRotationTranslation: R1,
  fromRotationTranslationScale: ea,
  fromRotationTranslationScaleOrigin: ta,
  fromScaling: Bs,
  fromTranslation: Hs,
  fromValues: Ds,
  fromXRotation: Js,
  fromYRotation: Ks,
  fromZRotation: us,
  frustum: aa,
  getRotation: _1,
  getScaling: P1,
  getTranslation: L1,
  identity: Ze,
  invert: F1,
  lookAt: fa,
  mul: ga,
  multiply: I1,
  multiplyScalar: ya,
  multiplyScalarAndAdd: ma,
  ortho: E1,
  orthoNO: C1,
  orthoZO: ha,
  perspective: ia,
  perspectiveFromFieldOfView: la,
  perspectiveNO: k1,
  perspectiveZO: ca,
  rotate: Ys,
  rotateX: Xs,
  rotateY: Zs,
  rotateZ: Gs,
  scale: j1,
  set: Ws,
  str: oa,
  sub: wa,
  subtract: D1,
  targetTo: va,
  translate: Ne,
  transpose: Us
}, Symbol.toStringTag, { value: "Module" }));
function Ge() {
  var n = new G(3);
  return G != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n;
}
function $a(n) {
  var r = new G(3);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r;
}
function U1(n) {
  var r = n[0], e = n[1], t = n[2];
  return Math.sqrt(r * r + e * e + t * t);
}
function Ye(n, r, e) {
  var t = new G(3);
  return t[0] = n, t[1] = r, t[2] = e, t;
}
function ba(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n;
}
function za(n, r, e, t) {
  return n[0] = r, n[1] = e, n[2] = t, n;
}
function Aa(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n;
}
function V1(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n;
}
function N1(n, r, e) {
  return n[0] = r[0] * e[0], n[1] = r[1] * e[1], n[2] = r[2] * e[2], n;
}
function Y1(n, r, e) {
  return n[0] = r[0] / e[0], n[1] = r[1] / e[1], n[2] = r[2] / e[2], n;
}
function qa(n, r) {
  return n[0] = Math.ceil(r[0]), n[1] = Math.ceil(r[1]), n[2] = Math.ceil(r[2]), n;
}
function Ta(n, r) {
  return n[0] = Math.floor(r[0]), n[1] = Math.floor(r[1]), n[2] = Math.floor(r[2]), n;
}
function Sa(n, r, e) {
  return n[0] = Math.min(r[0], e[0]), n[1] = Math.min(r[1], e[1]), n[2] = Math.min(r[2], e[2]), n;
}
function Oa(n, r, e) {
  return n[0] = Math.max(r[0], e[0]), n[1] = Math.max(r[1], e[1]), n[2] = Math.max(r[2], e[2]), n;
}
function Fa(n, r) {
  return n[0] = Er(r[0]), n[1] = Er(r[1]), n[2] = Er(r[2]), n;
}
function Ia(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n;
}
function ja(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n;
}
function X1(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1], s = r[2] - n[2];
  return Math.sqrt(e * e + t * t + s * s);
}
function Z1(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1], s = r[2] - n[2];
  return e * e + t * t + s * s;
}
function G1(n) {
  var r = n[0], e = n[1], t = n[2];
  return r * r + e * e + t * t;
}
function Ra(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n[2] = -r[2], n;
}
function La(n, r) {
  return n[0] = 1 / r[0], n[1] = 1 / r[1], n[2] = 1 / r[2], n;
}
function H1(n, r) {
  var e = r[0], t = r[1], s = r[2], a = e * e + t * t + s * s;
  return a > 0 && (a = 1 / Math.sqrt(a)), n[0] = r[0] * a, n[1] = r[1] * a, n[2] = r[2] * a, n;
}
function Fe(n, r) {
  return n[0] * r[0] + n[1] * r[1] + n[2] * r[2];
}
function we(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = e[0], c = e[1], l = e[2];
  return n[0] = s * l - a * c, n[1] = a * i - t * l, n[2] = t * c - s * i, n;
}
function Pa(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2];
  return n[0] = s + t * (e[0] - s), n[1] = a + t * (e[1] - a), n[2] = i + t * (e[2] - i), n;
}
function _a(n, r, e, t) {
  var s = Math.acos(Math.min(Math.max(Fe(r, e), -1), 1)), a = Math.sin(s), i = Math.sin((1 - t) * s) / a, c = Math.sin(t * s) / a;
  return n[0] = i * r[0] + c * e[0], n[1] = i * r[1] + c * e[1], n[2] = i * r[2] + c * e[2], n;
}
function ka(n, r, e, t, s, a) {
  var i = a * a, c = i * (2 * a - 3) + 1, l = i * (a - 2) + a, h = i * (a - 1), f = i * (3 - 2 * a);
  return n[0] = r[0] * c + e[0] * l + t[0] * h + s[0] * f, n[1] = r[1] * c + e[1] * l + t[1] * h + s[1] * f, n[2] = r[2] * c + e[2] * l + t[2] * h + s[2] * f, n;
}
function Ca(n, r, e, t, s, a) {
  var i = 1 - a, c = i * i, l = a * a, h = c * i, f = 3 * a * c, v = 3 * l * i, d = l * a;
  return n[0] = r[0] * h + e[0] * f + t[0] * v + s[0] * d, n[1] = r[1] * h + e[1] * f + t[1] * v + s[1] * d, n[2] = r[2] * h + e[2] * f + t[2] * v + s[2] * d, n;
}
function Ea(n, r) {
  r = r === void 0 ? 1 : r;
  var e = Lr() * 2 * Math.PI, t = Lr() * 2 - 1, s = Math.sqrt(1 - t * t) * r;
  return n[0] = Math.cos(e) * s, n[1] = Math.sin(e) * s, n[2] = t * r, n;
}
function B1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = e[3] * t + e[7] * s + e[11] * a + e[15];
  return i = i || 1, n[0] = (e[0] * t + e[4] * s + e[8] * a + e[12]) / i, n[1] = (e[1] * t + e[5] * s + e[9] * a + e[13]) / i, n[2] = (e[2] * t + e[6] * s + e[10] * a + e[14]) / i, n;
}
function Da(n, r, e) {
  var t = r[0], s = r[1], a = r[2];
  return n[0] = t * e[0] + s * e[3] + a * e[6], n[1] = t * e[1] + s * e[4] + a * e[7], n[2] = t * e[2] + s * e[5] + a * e[8], n;
}
function Wa(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = e[3], c = r[0], l = r[1], h = r[2], f = s * h - a * l, v = a * c - t * h, d = t * l - s * c;
  return f = f + f, v = v + v, d = d + d, n[0] = c + i * f + s * d - a * v, n[1] = l + i * v + a * f - t * d, n[2] = h + i * d + t * v - s * f, n;
}
function Ua(n, r, e, t) {
  var s = [], a = [];
  return s[0] = r[0] - e[0], s[1] = r[1] - e[1], s[2] = r[2] - e[2], a[0] = s[0], a[1] = s[1] * Math.cos(t) - s[2] * Math.sin(t), a[2] = s[1] * Math.sin(t) + s[2] * Math.cos(t), n[0] = a[0] + e[0], n[1] = a[1] + e[1], n[2] = a[2] + e[2], n;
}
function Va(n, r, e, t) {
  var s = [], a = [];
  return s[0] = r[0] - e[0], s[1] = r[1] - e[1], s[2] = r[2] - e[2], a[0] = s[2] * Math.sin(t) + s[0] * Math.cos(t), a[1] = s[1], a[2] = s[2] * Math.cos(t) - s[0] * Math.sin(t), n[0] = a[0] + e[0], n[1] = a[1] + e[1], n[2] = a[2] + e[2], n;
}
function Na(n, r, e, t) {
  var s = [], a = [];
  return s[0] = r[0] - e[0], s[1] = r[1] - e[1], s[2] = r[2] - e[2], a[0] = s[0] * Math.cos(t) - s[1] * Math.sin(t), a[1] = s[0] * Math.sin(t) + s[1] * Math.cos(t), a[2] = s[2], n[0] = a[0] + e[0], n[1] = a[1] + e[1], n[2] = a[2] + e[2], n;
}
function Ya(n, r) {
  var e = n[0], t = n[1], s = n[2], a = r[0], i = r[1], c = r[2], l = Math.sqrt((e * e + t * t + s * s) * (a * a + i * i + c * c)), h = l && Fe(n, r) / l;
  return Math.acos(Math.min(Math.max(h, -1), 1));
}
function Xa(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n;
}
function Za(n) {
  return "vec3(" + n[0] + ", " + n[1] + ", " + n[2] + ")";
}
function Ga(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2];
}
function Ha(n, r) {
  var e = n[0], t = n[1], s = n[2], a = r[0], i = r[1], c = r[2];
  return Math.abs(e - a) <= L * Math.max(1, Math.abs(e), Math.abs(a)) && Math.abs(t - i) <= L * Math.max(1, Math.abs(t), Math.abs(i)) && Math.abs(s - c) <= L * Math.max(1, Math.abs(s), Math.abs(c));
}
var Ba = V1, Qa = N1, Ja = Y1, Ka = X1, ua = Z1, Q1 = U1, ni = G1, ri = (function() {
  var n = Ge();
  return function(r, e, t, s, a, i) {
    var c, l;
    for (e || (e = 3), t || (t = 0), s ? l = Math.min(s * e + t, r.length) : l = r.length, c = t; c < l; c += e)
      n[0] = r[c], n[1] = r[c + 1], n[2] = r[c + 2], a(n, n, i), r[c] = n[0], r[c + 1] = n[1], r[c + 2] = n[2];
    return r;
  };
})();
const ei = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Aa,
  angle: Ya,
  bezier: Ca,
  ceil: qa,
  clone: $a,
  copy: ba,
  create: Ge,
  cross: we,
  dist: Ka,
  distance: X1,
  div: Ja,
  divide: Y1,
  dot: Fe,
  equals: Ha,
  exactEquals: Ga,
  floor: Ta,
  forEach: ri,
  fromValues: Ye,
  hermite: ka,
  inverse: La,
  len: Q1,
  length: U1,
  lerp: Pa,
  max: Oa,
  min: Sa,
  mul: Qa,
  multiply: N1,
  negate: Ra,
  normalize: H1,
  random: Ea,
  rotateX: Ua,
  rotateY: Va,
  rotateZ: Na,
  round: Fa,
  scale: Ia,
  scaleAndAdd: ja,
  set: za,
  slerp: _a,
  sqrDist: ua,
  sqrLen: ni,
  squaredDistance: Z1,
  squaredLength: G1,
  str: Za,
  sub: Ba,
  subtract: V1,
  transformMat3: Da,
  transformMat4: B1,
  transformQuat: Wa,
  zero: Xa
}, Symbol.toStringTag, { value: "Module" }));
function J1() {
  var n = new G(4);
  return G != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0), n;
}
function K1(n) {
  var r = new G(4);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function u1(n, r, e, t) {
  var s = new G(4);
  return s[0] = n, s[1] = r, s[2] = e, s[3] = t, s;
}
function nt(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n;
}
function rt(n, r, e, t, s) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n;
}
function et(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n;
}
function tt(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n;
}
function st(n, r, e) {
  return n[0] = r[0] * e[0], n[1] = r[1] * e[1], n[2] = r[2] * e[2], n[3] = r[3] * e[3], n;
}
function at(n, r, e) {
  return n[0] = r[0] / e[0], n[1] = r[1] / e[1], n[2] = r[2] / e[2], n[3] = r[3] / e[3], n;
}
function ti(n, r) {
  return n[0] = Math.ceil(r[0]), n[1] = Math.ceil(r[1]), n[2] = Math.ceil(r[2]), n[3] = Math.ceil(r[3]), n;
}
function si(n, r) {
  return n[0] = Math.floor(r[0]), n[1] = Math.floor(r[1]), n[2] = Math.floor(r[2]), n[3] = Math.floor(r[3]), n;
}
function ai(n, r, e) {
  return n[0] = Math.min(r[0], e[0]), n[1] = Math.min(r[1], e[1]), n[2] = Math.min(r[2], e[2]), n[3] = Math.min(r[3], e[3]), n;
}
function ii(n, r, e) {
  return n[0] = Math.max(r[0], e[0]), n[1] = Math.max(r[1], e[1]), n[2] = Math.max(r[2], e[2]), n[3] = Math.max(r[3], e[3]), n;
}
function ci(n, r) {
  return n[0] = Er(r[0]), n[1] = Er(r[1]), n[2] = Er(r[2]), n[3] = Er(r[3]), n;
}
function it(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n;
}
function li(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n;
}
function ct(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1], s = r[2] - n[2], a = r[3] - n[3];
  return Math.sqrt(e * e + t * t + s * s + a * a);
}
function lt(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1], s = r[2] - n[2], a = r[3] - n[3];
  return e * e + t * t + s * s + a * a;
}
function He(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3];
  return Math.sqrt(r * r + e * e + t * t + s * s);
}
function Be(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3];
  return r * r + e * e + t * t + s * s;
}
function hi(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n[2] = -r[2], n[3] = -r[3], n;
}
function fi(n, r) {
  return n[0] = 1 / r[0], n[1] = 1 / r[1], n[2] = 1 / r[2], n[3] = 1 / r[3], n;
}
function ht(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e * e + t * t + s * s + a * a;
  return i > 0 && (i = 1 / Math.sqrt(i)), n[0] = e * i, n[1] = t * i, n[2] = s * i, n[3] = a * i, n;
}
function Qe(n, r) {
  return n[0] * r[0] + n[1] * r[1] + n[2] * r[2] + n[3] * r[3];
}
function vi(n, r, e, t) {
  var s = e[0] * t[1] - e[1] * t[0], a = e[0] * t[2] - e[2] * t[0], i = e[0] * t[3] - e[3] * t[0], c = e[1] * t[2] - e[2] * t[1], l = e[1] * t[3] - e[3] * t[1], h = e[2] * t[3] - e[3] * t[2], f = r[0], v = r[1], d = r[2], o = r[3];
  return n[0] = v * h - d * l + o * c, n[1] = -(f * h) + d * i - o * a, n[2] = f * l - v * i + o * s, n[3] = -(f * c) + v * a - d * s, n;
}
function ft(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = r[3];
  return n[0] = s + t * (e[0] - s), n[1] = a + t * (e[1] - a), n[2] = i + t * (e[2] - i), n[3] = c + t * (e[3] - c), n;
}
function oi(n, r) {
  r = r === void 0 ? 1 : r;
  var e, t, s, a, i, c, l;
  l = Lr(), e = l * 2 - 1, t = (4 * Lr() - 2) * Math.sqrt(l * -l + l), i = e * e + t * t, l = Lr(), s = l * 2 - 1, a = (4 * Lr() - 2) * Math.sqrt(l * -l + l), c = s * s + a * a;
  var h = Math.sqrt((1 - i) / c);
  return n[0] = r * e, n[1] = r * t, n[2] = r * s * h, n[3] = r * a * h, n;
}
function di(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3];
  return n[0] = e[0] * t + e[4] * s + e[8] * a + e[12] * i, n[1] = e[1] * t + e[5] * s + e[9] * a + e[13] * i, n[2] = e[2] * t + e[6] * s + e[10] * a + e[14] * i, n[3] = e[3] * t + e[7] * s + e[11] * a + e[15] * i, n;
}
function Mi(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = e[3], c = r[0], l = r[1], h = r[2], f = s * h - a * l, v = a * c - t * h, d = t * l - s * c;
  return f = f + f, v = v + v, d = d + d, n[0] = c + i * f + s * d - a * v, n[1] = l + i * v + a * f - t * d, n[2] = h + i * d + t * v - s * f, n[3] = r[3], n;
}
function yi(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0, n;
}
function mi(n) {
  return "vec4(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
function vt(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3];
}
function pi(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = r[0], c = r[1], l = r[2], h = r[3];
  return Math.abs(e - i) <= L * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(t - c) <= L * Math.max(1, Math.abs(t), Math.abs(c)) && Math.abs(s - l) <= L * Math.max(1, Math.abs(s), Math.abs(l)) && Math.abs(a - h) <= L * Math.max(1, Math.abs(a), Math.abs(h));
}
var xi = tt, gi = st, wi = at, $i = ct, bi = lt, zi = He, Ai = Be, qi = (function() {
  var n = J1();
  return function(r, e, t, s, a, i) {
    var c, l;
    for (e || (e = 4), t || (t = 0), s ? l = Math.min(s * e + t, r.length) : l = r.length, c = t; c < l; c += e)
      n[0] = r[c], n[1] = r[c + 1], n[2] = r[c + 2], n[3] = r[c + 3], a(n, n, i), r[c] = n[0], r[c + 1] = n[1], r[c + 2] = n[2], r[c + 3] = n[3];
    return r;
  };
})();
const Ti = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: et,
  ceil: ti,
  clone: K1,
  copy: nt,
  create: J1,
  cross: vi,
  dist: $i,
  distance: ct,
  div: wi,
  divide: at,
  dot: Qe,
  equals: pi,
  exactEquals: vt,
  floor: si,
  forEach: qi,
  fromValues: u1,
  inverse: fi,
  len: zi,
  length: He,
  lerp: ft,
  max: ii,
  min: ai,
  mul: gi,
  multiply: st,
  negate: hi,
  normalize: ht,
  random: oi,
  round: ci,
  scale: it,
  scaleAndAdd: li,
  set: rt,
  sqrDist: bi,
  sqrLen: Ai,
  squaredDistance: lt,
  squaredLength: Be,
  str: mi,
  sub: xi,
  subtract: tt,
  transformMat4: di,
  transformQuat: Mi,
  zero: yi
}, Symbol.toStringTag, { value: "Module" }));
function be() {
  var n = new G(4);
  return G != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n[3] = 1, n;
}
function Si(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function ot(n, r, e) {
  e = e * 0.5;
  var t = Math.sin(e);
  return n[0] = t * r[0], n[1] = t * r[1], n[2] = t * r[2], n[3] = Math.cos(e), n;
}
function Oi(n, r) {
  var e = Math.acos(r[3]) * 2, t = Math.sin(e / 2);
  return t > L ? (n[0] = r[0] / t, n[1] = r[1] / t, n[2] = r[2] / t) : (n[0] = 1, n[1] = 0, n[2] = 0), e;
}
function Fi(n, r) {
  var e = Ke(n, r);
  return Math.acos(2 * e * e - 1);
}
function dt(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return n[0] = t * f + i * c + s * h - a * l, n[1] = s * f + i * l + a * c - t * h, n[2] = a * f + i * h + t * l - s * c, n[3] = i * f - t * c - s * l - a * h, n;
}
function Mt(n, r, e) {
  e *= 0.5;
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l + i * c, n[1] = s * l + a * c, n[2] = a * l - s * c, n[3] = i * l - t * c, n;
}
function yt(n, r, e) {
  e *= 0.5;
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l - a * c, n[1] = s * l + i * c, n[2] = a * l + t * c, n[3] = i * l - s * c, n;
}
function mt(n, r, e) {
  e *= 0.5;
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l + s * c, n[1] = s * l - t * c, n[2] = a * l + i * c, n[3] = i * l - a * c, n;
}
function Ii(n, r) {
  var e = r[0], t = r[1], s = r[2];
  return n[0] = e, n[1] = t, n[2] = s, n[3] = Math.sqrt(Math.abs(1 - e * e - t * t - s * s)), n;
}
function pt(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = Math.sqrt(e * e + t * t + s * s), c = Math.exp(a), l = i > 0 ? c * Math.sin(i) / i : 0;
  return n[0] = e * l, n[1] = t * l, n[2] = s * l, n[3] = c * Math.cos(i), n;
}
function xt(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = Math.sqrt(e * e + t * t + s * s), c = i > 0 ? Math.atan2(i, a) / i : 0;
  return n[0] = e * c, n[1] = t * c, n[2] = s * c, n[3] = 0.5 * Math.log(e * e + t * t + s * s + a * a), n;
}
function ji(n, r, e) {
  return xt(n, r), wt(n, n, e), pt(n, n), n;
}
function $e(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = r[3], l = e[0], h = e[1], f = e[2], v = e[3], d, o, M, m, y;
  return o = s * l + a * h + i * f + c * v, o < 0 && (o = -o, l = -l, h = -h, f = -f, v = -v), 1 - o > L ? (d = Math.acos(o), M = Math.sin(d), m = Math.sin((1 - t) * d) / M, y = Math.sin(t * d) / M) : (m = 1 - t, y = t), n[0] = m * s + y * l, n[1] = m * a + y * h, n[2] = m * i + y * f, n[3] = m * c + y * v, n;
}
function Ri(n) {
  var r = Lr(), e = Lr(), t = Lr(), s = Math.sqrt(1 - r), a = Math.sqrt(r);
  return n[0] = s * Math.sin(2 * Math.PI * e), n[1] = s * Math.cos(2 * Math.PI * e), n[2] = a * Math.sin(2 * Math.PI * t), n[3] = a * Math.cos(2 * Math.PI * t), n;
}
function Li(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e * e + t * t + s * s + a * a, c = i ? 1 / i : 0;
  return n[0] = -e * c, n[1] = -t * c, n[2] = -s * c, n[3] = a * c, n;
}
function Pi(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n[2] = -r[2], n[3] = r[3], n;
}
function gt(n, r) {
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
function _i(n, r, e, t) {
  var s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : $1, a = Math.PI / 360;
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
function ki(n) {
  return "quat(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
var Ci = K1, Ei = u1, Je = nt, Di = rt, Wi = et, Ui = dt, wt = it, Ke = Qe, Vi = ft, ue = He, Ni = ue, n1 = Be, Yi = n1, r1 = ht, Xi = vt;
function Zi(n, r) {
  return Math.abs(Qe(n, r)) >= 1 - L;
}
var Gi = (function() {
  var n = Ge(), r = Ye(1, 0, 0), e = Ye(0, 1, 0);
  return function(t, s, a) {
    var i = Fe(s, a);
    return i < -0.999999 ? (we(n, r, s), Q1(n) < 1e-6 && we(n, e, s), H1(n, n), ot(t, n, Math.PI), t) : i > 0.999999 ? (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t) : (we(n, s, a), t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = 1 + i, r1(t, t));
  };
})(), Hi = (function() {
  var n = be(), r = be();
  return function(e, t, s, a, i, c) {
    return $e(n, t, i, c), $e(r, s, a, c), $e(e, n, r, 2 * c * (1 - c)), e;
  };
})(), Bi = (function() {
  var n = T1();
  return function(r, e, t, s) {
    return n[0] = t[0], n[3] = t[1], n[6] = t[2], n[1] = s[0], n[4] = s[1], n[7] = s[2], n[2] = -e[0], n[5] = -e[1], n[8] = -e[2], r1(r, gt(r, n));
  };
})();
const Qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Wi,
  calculateW: Ii,
  clone: Ci,
  conjugate: Pi,
  copy: Je,
  create: be,
  dot: Ke,
  equals: Zi,
  exactEquals: Xi,
  exp: pt,
  fromEuler: _i,
  fromMat3: gt,
  fromValues: Ei,
  getAngle: Fi,
  getAxisAngle: Oi,
  identity: Si,
  invert: Li,
  len: Ni,
  length: ue,
  lerp: Vi,
  ln: xt,
  mul: Ui,
  multiply: dt,
  normalize: r1,
  pow: ji,
  random: Ri,
  rotateX: Mt,
  rotateY: yt,
  rotateZ: mt,
  rotationTo: Gi,
  scale: wt,
  set: Di,
  setAxes: Bi,
  setAxisAngle: ot,
  slerp: $e,
  sqlerp: Hi,
  sqrLen: Yi,
  squaredLength: n1,
  str: ki
}, Symbol.toStringTag, { value: "Module" }));
function Ji() {
  var n = new G(8);
  return G != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[3] = 1, n;
}
function Ki(n) {
  var r = new G(8);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r;
}
function ui(n, r, e, t, s, a, i, c) {
  var l = new G(8);
  return l[0] = n, l[1] = r, l[2] = e, l[3] = t, l[4] = s, l[5] = a, l[6] = i, l[7] = c, l;
}
function nc(n, r, e, t, s, a, i) {
  var c = new G(8);
  c[0] = n, c[1] = r, c[2] = e, c[3] = t;
  var l = s * 0.5, h = a * 0.5, f = i * 0.5;
  return c[4] = l * t + h * e - f * r, c[5] = h * t + f * n - l * e, c[6] = f * t + l * r - h * n, c[7] = -l * n - h * r - f * e, c;
}
function $t(n, r, e) {
  var t = e[0] * 0.5, s = e[1] * 0.5, a = e[2] * 0.5, i = r[0], c = r[1], l = r[2], h = r[3];
  return n[0] = i, n[1] = c, n[2] = l, n[3] = h, n[4] = t * h + s * l - a * c, n[5] = s * h + a * i - t * l, n[6] = a * h + t * c - s * i, n[7] = -t * i - s * c - a * l, n;
}
function rc(n, r) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = r[0] * 0.5, n[5] = r[1] * 0.5, n[6] = r[2] * 0.5, n[7] = 0, n;
}
function ec(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n;
}
function tc(n, r) {
  var e = be();
  _1(e, r);
  var t = new G(3);
  return L1(t, r), $t(n, e, t), n;
}
function bt(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n;
}
function sc(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n;
}
function ac(n, r, e, t, s, a, i, c, l) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n[6] = c, n[7] = l, n;
}
var ic = Je;
function cc(n, r) {
  return n[0] = r[4], n[1] = r[5], n[2] = r[6], n[3] = r[7], n;
}
var lc = Je;
function hc(n, r) {
  return n[4] = r[0], n[5] = r[1], n[6] = r[2], n[7] = r[3], n;
}
function fc(n, r) {
  var e = r[4], t = r[5], s = r[6], a = r[7], i = -r[0], c = -r[1], l = -r[2], h = r[3];
  return n[0] = (e * h + a * i + t * l - s * c) * 2, n[1] = (t * h + a * c + s * i - e * l) * 2, n[2] = (s * h + a * l + e * c - t * i) * 2, n;
}
function vc(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0] * 0.5, l = e[1] * 0.5, h = e[2] * 0.5, f = r[4], v = r[5], d = r[6], o = r[7];
  return n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = i * c + s * h - a * l + f, n[5] = i * l + a * c - t * h + v, n[6] = i * h + t * l - s * c + d, n[7] = -t * c - s * l - a * h + o, n;
}
function oc(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, d = l * i + f * s + h * t - c * a, o = h * i + f * a + c * s - l * t, M = f * i - c * t - l * s - h * a;
  return Mt(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + M * t + d * a - o * s, n[5] = d * i + M * s + o * t - v * a, n[6] = o * i + M * a + v * s - d * t, n[7] = M * i - v * t - d * s - o * a, n;
}
function dc(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, d = l * i + f * s + h * t - c * a, o = h * i + f * a + c * s - l * t, M = f * i - c * t - l * s - h * a;
  return yt(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + M * t + d * a - o * s, n[5] = d * i + M * s + o * t - v * a, n[6] = o * i + M * a + v * s - d * t, n[7] = M * i - v * t - d * s - o * a, n;
}
function Mc(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, d = l * i + f * s + h * t - c * a, o = h * i + f * a + c * s - l * t, M = f * i - c * t - l * s - h * a;
  return mt(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + M * t + d * a - o * s, n[5] = d * i + M * s + o * t - v * a, n[6] = o * i + M * a + v * s - d * t, n[7] = M * i - v * t - d * s - o * a, n;
}
function yc(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = e[3], c = r[0], l = r[1], h = r[2], f = r[3];
  return n[0] = c * i + f * t + l * a - h * s, n[1] = l * i + f * s + h * t - c * a, n[2] = h * i + f * a + c * s - l * t, n[3] = f * i - c * t - l * s - h * a, c = r[4], l = r[5], h = r[6], f = r[7], n[4] = c * i + f * t + l * a - h * s, n[5] = l * i + f * s + h * t - c * a, n[6] = h * i + f * a + c * s - l * t, n[7] = f * i - c * t - l * s - h * a, n;
}
function mc(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return n[0] = t * f + i * c + s * h - a * l, n[1] = s * f + i * l + a * c - t * h, n[2] = a * f + i * h + t * l - s * c, n[3] = i * f - t * c - s * l - a * h, c = e[4], l = e[5], h = e[6], f = e[7], n[4] = t * f + i * c + s * h - a * l, n[5] = s * f + i * l + a * c - t * h, n[6] = a * f + i * h + t * l - s * c, n[7] = i * f - t * c - s * l - a * h, n;
}
function pc(n, r, e, t) {
  if (Math.abs(t) < L)
    return bt(n, r);
  var s = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
  t = t * 0.5;
  var a = Math.sin(t), i = a * e[0] / s, c = a * e[1] / s, l = a * e[2] / s, h = Math.cos(t), f = r[0], v = r[1], d = r[2], o = r[3];
  n[0] = f * h + o * i + v * l - d * c, n[1] = v * h + o * c + d * i - f * l, n[2] = d * h + o * l + f * c - v * i, n[3] = o * h - f * i - v * c - d * l;
  var M = r[4], m = r[5], y = r[6], p = r[7];
  return n[4] = M * h + p * i + m * l - y * c, n[5] = m * h + p * c + y * i - M * l, n[6] = y * h + p * l + M * c - m * i, n[7] = p * h - M * i - m * c - y * l, n;
}
function xc(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n[6] = r[6] + e[6], n[7] = r[7] + e[7], n;
}
function zt(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[4], l = e[5], h = e[6], f = e[7], v = r[4], d = r[5], o = r[6], M = r[7], m = e[0], y = e[1], p = e[2], z = e[3];
  return n[0] = t * z + i * m + s * p - a * y, n[1] = s * z + i * y + a * m - t * p, n[2] = a * z + i * p + t * y - s * m, n[3] = i * z - t * m - s * y - a * p, n[4] = t * f + i * c + s * h - a * l + v * z + M * m + d * p - o * y, n[5] = s * f + i * l + a * c - t * h + d * z + M * y + o * m - v * p, n[6] = a * f + i * h + t * l - s * c + o * z + M * p + v * y - d * m, n[7] = i * f - t * c - s * l - a * h + M * z - v * m - d * y - o * p, n;
}
var gc = zt;
function wc(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n[6] = r[6] * e, n[7] = r[7] * e, n;
}
var At = Ke;
function $c(n, r, e, t) {
  var s = 1 - t;
  return At(r, e) < 0 && (t = -t), n[0] = r[0] * s + e[0] * t, n[1] = r[1] * s + e[1] * t, n[2] = r[2] * s + e[2] * t, n[3] = r[3] * s + e[3] * t, n[4] = r[4] * s + e[4] * t, n[5] = r[5] * s + e[5] * t, n[6] = r[6] * s + e[6] * t, n[7] = r[7] * s + e[7] * t, n;
}
function bc(n, r) {
  var e = Ie(r);
  return n[0] = -r[0] / e, n[1] = -r[1] / e, n[2] = -r[2] / e, n[3] = r[3] / e, n[4] = -r[4] / e, n[5] = -r[5] / e, n[6] = -r[6] / e, n[7] = r[7] / e, n;
}
function zc(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n[2] = -r[2], n[3] = r[3], n[4] = -r[4], n[5] = -r[5], n[6] = -r[6], n[7] = r[7], n;
}
var qt = ue, Ac = qt, Ie = n1, qc = Ie;
function Tc(n, r) {
  var e = Ie(r);
  if (e > 0) {
    e = Math.sqrt(e);
    var t = r[0] / e, s = r[1] / e, a = r[2] / e, i = r[3] / e, c = r[4], l = r[5], h = r[6], f = r[7], v = t * c + s * l + a * h + i * f;
    n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = (c - t * v) / e, n[5] = (l - s * v) / e, n[6] = (h - a * v) / e, n[7] = (f - i * v) / e;
  }
  return n;
}
function Sc(n) {
  return "quat2(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ")";
}
function Oc(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5] && n[6] === r[6] && n[7] === r[7];
}
function Fc(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = r[0], v = r[1], d = r[2], o = r[3], M = r[4], m = r[5], y = r[6], p = r[7];
  return Math.abs(e - f) <= L * Math.max(1, Math.abs(e), Math.abs(f)) && Math.abs(t - v) <= L * Math.max(1, Math.abs(t), Math.abs(v)) && Math.abs(s - d) <= L * Math.max(1, Math.abs(s), Math.abs(d)) && Math.abs(a - o) <= L * Math.max(1, Math.abs(a), Math.abs(o)) && Math.abs(i - M) <= L * Math.max(1, Math.abs(i), Math.abs(M)) && Math.abs(c - m) <= L * Math.max(1, Math.abs(c), Math.abs(m)) && Math.abs(l - y) <= L * Math.max(1, Math.abs(l), Math.abs(y)) && Math.abs(h - p) <= L * Math.max(1, Math.abs(h), Math.abs(p));
}
const Ic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: xc,
  clone: Ki,
  conjugate: zc,
  copy: bt,
  create: Ji,
  dot: At,
  equals: Fc,
  exactEquals: Oc,
  fromMat4: tc,
  fromRotation: ec,
  fromRotationTranslation: $t,
  fromRotationTranslationValues: nc,
  fromTranslation: rc,
  fromValues: ui,
  getDual: cc,
  getReal: ic,
  getTranslation: fc,
  identity: sc,
  invert: bc,
  len: Ac,
  length: qt,
  lerp: $c,
  mul: gc,
  multiply: zt,
  normalize: Tc,
  rotateAroundAxis: pc,
  rotateByQuatAppend: yc,
  rotateByQuatPrepend: mc,
  rotateX: oc,
  rotateY: dc,
  rotateZ: Mc,
  scale: wc,
  set: ac,
  setDual: hc,
  setReal: lc,
  sqrLen: qc,
  squaredLength: Ie,
  str: Sc,
  translate: vc
}, Symbol.toStringTag, { value: "Module" }));
function Tt() {
  var n = new G(2);
  return G != Float32Array && (n[0] = 0, n[1] = 0), n;
}
function jc(n) {
  var r = new G(2);
  return r[0] = n[0], r[1] = n[1], r;
}
function Rc(n, r) {
  var e = new G(2);
  return e[0] = n, e[1] = r, e;
}
function Lc(n, r) {
  return n[0] = r[0], n[1] = r[1], n;
}
function Pc(n, r, e) {
  return n[0] = r, n[1] = e, n;
}
function _c(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n;
}
function St(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n;
}
function Ot(n, r, e) {
  return n[0] = r[0] * e[0], n[1] = r[1] * e[1], n;
}
function Ft(n, r, e) {
  return n[0] = r[0] / e[0], n[1] = r[1] / e[1], n;
}
function kc(n, r) {
  return n[0] = Math.ceil(r[0]), n[1] = Math.ceil(r[1]), n;
}
function Cc(n, r) {
  return n[0] = Math.floor(r[0]), n[1] = Math.floor(r[1]), n;
}
function Ec(n, r, e) {
  return n[0] = Math.min(r[0], e[0]), n[1] = Math.min(r[1], e[1]), n;
}
function Dc(n, r, e) {
  return n[0] = Math.max(r[0], e[0]), n[1] = Math.max(r[1], e[1]), n;
}
function Wc(n, r) {
  return n[0] = Er(r[0]), n[1] = Er(r[1]), n;
}
function Uc(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n;
}
function Vc(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n;
}
function It(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1];
  return Math.sqrt(e * e + t * t);
}
function jt(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1];
  return e * e + t * t;
}
function Rt(n) {
  var r = n[0], e = n[1];
  return Math.sqrt(r * r + e * e);
}
function Lt(n) {
  var r = n[0], e = n[1];
  return r * r + e * e;
}
function Nc(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n;
}
function Yc(n, r) {
  return n[0] = 1 / r[0], n[1] = 1 / r[1], n;
}
function Xc(n, r) {
  var e = r[0], t = r[1], s = e * e + t * t;
  return s > 0 && (s = 1 / Math.sqrt(s)), n[0] = r[0] * s, n[1] = r[1] * s, n;
}
function Zc(n, r) {
  return n[0] * r[0] + n[1] * r[1];
}
function Gc(n, r, e) {
  var t = r[0] * e[1] - r[1] * e[0];
  return n[0] = n[1] = 0, n[2] = t, n;
}
function Hc(n, r, e, t) {
  var s = r[0], a = r[1];
  return n[0] = s + t * (e[0] - s), n[1] = a + t * (e[1] - a), n;
}
function Bc(n, r) {
  r = r === void 0 ? 1 : r;
  var e = Lr() * 2 * Math.PI;
  return n[0] = Math.cos(e) * r, n[1] = Math.sin(e) * r, n;
}
function Qc(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[2] * s, n[1] = e[1] * t + e[3] * s, n;
}
function Jc(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[2] * s + e[4], n[1] = e[1] * t + e[3] * s + e[5], n;
}
function Kc(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[3] * s + e[6], n[1] = e[1] * t + e[4] * s + e[7], n;
}
function uc(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[4] * s + e[12], n[1] = e[1] * t + e[5] * s + e[13], n;
}
function n2(n, r, e, t) {
  var s = r[0] - e[0], a = r[1] - e[1], i = Math.sin(t), c = Math.cos(t);
  return n[0] = s * c - a * i + e[0], n[1] = s * i + a * c + e[1], n;
}
function r2(n, r) {
  var e = n[0], t = n[1], s = r[0], a = r[1];
  return Math.abs(Math.atan2(t * s - e * a, e * s + t * a));
}
function e2(n, r) {
  var e = n[0], t = n[1], s = r[0], a = r[1];
  return Math.atan2(e * a - t * s, e * s + t * a);
}
function t2(n) {
  return n[0] = 0, n[1] = 0, n;
}
function s2(n) {
  return "vec2(" + n[0] + ", " + n[1] + ")";
}
function a2(n, r) {
  return n[0] === r[0] && n[1] === r[1];
}
function i2(n, r) {
  var e = n[0], t = n[1], s = r[0], a = r[1];
  return Math.abs(e - s) <= L * Math.max(1, Math.abs(e), Math.abs(s)) && Math.abs(t - a) <= L * Math.max(1, Math.abs(t), Math.abs(a));
}
var c2 = Rt, l2 = St, h2 = Ot, f2 = Ft, v2 = It, o2 = jt, d2 = Lt, M2 = (function() {
  var n = Tt();
  return function(r, e, t, s, a, i) {
    var c, l;
    for (e || (e = 2), t || (t = 0), s ? l = Math.min(s * e + t, r.length) : l = r.length, c = t; c < l; c += e)
      n[0] = r[c], n[1] = r[c + 1], a(n, n, i), r[c] = n[0], r[c + 1] = n[1];
    return r;
  };
})();
const y2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: _c,
  angle: r2,
  ceil: kc,
  clone: jc,
  copy: Lc,
  create: Tt,
  cross: Gc,
  dist: v2,
  distance: It,
  div: f2,
  divide: Ft,
  dot: Zc,
  equals: i2,
  exactEquals: a2,
  floor: Cc,
  forEach: M2,
  fromValues: Rc,
  inverse: Yc,
  len: c2,
  length: Rt,
  lerp: Hc,
  max: Dc,
  min: Ec,
  mul: h2,
  multiply: Ot,
  negate: Nc,
  normalize: Xc,
  random: Bc,
  rotate: n2,
  round: Wc,
  scale: Uc,
  scaleAndAdd: Vc,
  set: Pc,
  signedAngle: e2,
  sqrDist: o2,
  sqrLen: d2,
  squaredDistance: jt,
  squaredLength: Lt,
  str: s2,
  sub: l2,
  subtract: St,
  transformMat2: Qc,
  transformMat2d: Jc,
  transformMat3: Kc,
  transformMat4: uc,
  zero: t2
}, Symbol.toStringTag, { value: "Module" })), m2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: f0,
  mat2: _0,
  mat2d: as,
  mat3: _s,
  mat4: W1,
  quat: Qi,
  quat2: Ic,
  vec2: y2,
  vec3: ei,
  vec4: Ti
}, Symbol.toStringTag, { value: "Module" })), je = Oe;
function Re() {
  xn.call(this), this.events = {
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
var zn = Re.prototype = Object.create(xn.prototype), gr = new Float32Array([0, 0, 0]), qr = new Float32Array(16);
zn.constructor = Re;
zn.local = null;
zn.worldMatrix = null;
zn.worldToLocal = null;
zn.children = null;
zn.parent = null;
zn.dirtyW = !0;
zn.dirtyL = !0;
zn.onParentUpdate = null;
zn.addChild = function(n) {
  this.children[this.children.length] = n, n.setParent(this);
};
zn.removeChild = function(n) {
  this.children.splice(this.children.indexOf(n), 1), n.removeParent();
};
zn.setParent = function(n) {
  this.parent = n, n.gameObject.world !== null && n.gameObject.world.addGameObject(this.gameObject);
};
zn.setGameObject = function(n) {
  xn.prototype.setGameObject.call(this, n), n.transform = this;
};
zn.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
zn.removeParent = function() {
  this.parent = null;
};
zn.translate = function(n, r, e, t) {
  gr[0] = n, gr[1] = r, gr[2] = e, t === "world" ? (Ze(qr), Ne(qr, qr, gr), je(this.local, qr, this.local)) : Ne(this.local, this.local, gr);
};
zn.rotate = function(n, r, e, t) {
  var s = Math.PI / 180, a = W1;
  t === "world" ? (a.identity(qr), a.rotateZ(qr, qr, e * s), a.rotateY(qr, qr, r * s), a.rotateX(qr, qr, n * s), je(this.local, qr, this.local)) : (a.rotateZ(this.local, this.local, e * s), a.rotateY(this.local, this.local, r * s), a.rotateX(this.local, this.local, n * s));
};
zn.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.worldMatrix.set(this.local) : je(this.worldMatrix, this.parent.getLocalToWorld(), this.local)), this.worldMatrix;
};
zn.getWorldToLocal = function() {
  return this.dirtyW === !0 && F1(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
};
zn.getPosition = function(n) {
  n === void 0 && (n = []);
  var r = this.getLocalToWorld();
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
};
zn.getLocalPosition = function(n) {
  n === void 0 && (n = []);
  var r = this.local;
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
};
zn.getRotation = function() {
  throw "TransformComponent.getRotation not implemented yet";
};
zn.getLocalRotation = function() {
  throw "TransformComponent.getLocalRotation not implemented yet";
};
zn.setPosition = function(n, r, e) {
  gr[0] = n, gr[1] = r, gr[2] = e, this.parent !== null && B1(gr, gr, this.parent.getWorldToLocal()), this.local[12] = gr[0], this.local[13] = gr[1], this.local[14] = gr[2];
};
zn.setLocalPosition = function(n, r, e) {
  this.local[12] = n, this.local[13] = r, this.local[14] = e;
};
zn.scale = function(n, r, e) {
  j1(this.local, this.local, [n, r, e]);
};
zn.updateWorldMatrix = function(n = !1) {
  this.parent === null ? this.worldMatrix.set(this.local) : (n && this.parent.updateWorldMatrix(n), je(this.worldMatrix, this.parent.worldMatrix, this.local));
};
function Mr(n) {
  this.instanceId = Mr.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new Re()), this.name = n || "gameObject";
}
var Tr = Mr.prototype;
Tr.instanceId = 0;
Tr.name = null;
Tr.layer = 0;
Tr.scene = null;
Tr.world = null;
Tr.transform = null;
Tr.components = null;
Tr.componentsCount = 0;
Tr.setScene = function(n) {
  this.scene = n;
};
Tr.addComponent = function(n) {
  return this.components[this.componentsCount++] = n, n.setGameObject(this), n;
};
Tr.removeComponent = function(n) {
  n.unsetGameObject();
};
Tr.getComponent = function(n) {
  for (var r = 0; r < this.components.length; r++) {
    var e = this.components[r];
    if (e instanceof n)
      return e;
  }
  return null;
};
const Pt = {
  NONE: "NONE",
  RADIAL: "RADIAL",
  RADIAL_FAST: "RADIAL_FAST",
  LINEAR: "LINEAR"
};
function en(n) {
  xn.call(this), this.transform = n, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ], this.zoom = 1;
}
en.prototype = Object.create(xn.prototype);
en.prototype.constructor = en;
en.prototype.frustumSize = null;
en.prototype.projectionMatrix = null;
en.prototype.clipSpaceMatrix = null;
en.prototype.nearClippingPane = 0;
en.prototype.farClippingPane = 1e3;
en.prototype.fogType = Pt.LINEAR;
en.prototype.fogNearPane = 250;
en.prototype.fogFarPane = 750;
en.prototype.fogColor = 9868950;
en.prototype.bgColor = -1;
en.prototype.ambientLight = 8421504;
en.prototype.setup = function(n, r) {
  const e = n / this.zoom, t = r / this.zoom;
  this.frustumSize = [
    [-e / 2, -t / 2, 0],
    [e / 2, t / 2, this.farClippingPane]
  ], E1(this.projectionMatrix, -e / 2, e / 2, -t / 2, t / 2, this.nearClippingPane, this.farClippingPane);
};
en.prototype.setGameObject = function(n) {
  xn.prototype.setGameObject.call(this, n), n.camera = this;
};
en.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, xn.prototype.unsetGameObject.call(this);
};
en.prototype.getClipSpaceMatrix = function() {
  const n = this.transform.getWorldToLocal();
  return Oe(this.clipSpaceMatrix, this.projectionMatrix, n), this.clipSpaceMatrix;
};
en.FogType = Pt;
function _t(n) {
  Mr.call(this, n || "camera"), this.addComponent(new en(this.transform));
}
_t.prototype = Object.create(Mr.prototype);
function Kn() {
  xn.call(this), this.colors = new Uint32Array([255]), this.faceColors = new Uint32Array([0]), this.depthBias = 0;
}
var rr = Kn.prototype = Object.create(xn.prototype);
rr.constructor = Kn;
rr.depthBias = 0;
rr.layer = 0;
rr.vertices = null;
rr.faces = null;
rr.pivot = [0, 0, 0];
rr.color = null;
rr.colors = null;
rr.uvs = null;
rr._texture = null;
rr.textureImage = null;
Object.defineProperty(rr, "texture", {
  get: function() {
    return this._texture;
  },
  set: function(n) {
    this._texture !== n && (this._texture = n, n ? (this.textureImage || (this.textureImage = new Image()), this.textureImage.src = n) : this.textureImage = null);
  }
});
rr.faceColors = null;
rr.faceNormals = null;
rr.vertexNormals = null;
rr.bounds = null;
rr.updateNormals = function(n = 1) {
  const r = this.faces, e = this.vertices, t = r.length;
  (!this.faceNormals || this.faceNormals.length !== t) && (this.faceNormals = new Float32Array(t)), !this.vertexNormals || this.vertexNormals.length !== e.length ? this.vertexNormals = new Float32Array(e.length) : this.vertexNormals.fill(0);
  for (let s = 0; s < t; s += 3) {
    const a = r[s] * 3, i = r[s + 1] * 3, c = r[s + 2] * 3, l = e[i] - e[a], h = e[i + 1] - e[a + 1], f = e[i + 2] - e[a + 2], v = e[c] - e[a], d = e[c + 1] - e[a + 1], o = e[c + 2] - e[a + 2];
    let M = (h * o - f * d) * n, m = (f * v - l * o) * n, y = (l * d - h * v) * n;
    const p = Math.sqrt(M * M + m * m + y * y);
    if (p > 1e-10) {
      const z = 1 / p;
      this.faceNormals[s] = M * z, this.faceNormals[s + 1] = m * z, this.faceNormals[s + 2] = y * z, this.vertexNormals[a] += M, this.vertexNormals[a + 1] += m, this.vertexNormals[a + 2] += y, this.vertexNormals[i] += M, this.vertexNormals[i + 1] += m, this.vertexNormals[i + 2] += y, this.vertexNormals[c] += M, this.vertexNormals[c + 1] += m, this.vertexNormals[c + 2] += y;
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
rr.setGameObject = function(n) {
  xn.prototype.setGameObject.call(this, n), n.meshRenderer = this;
};
rr.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, xn.prototype.unsetGameObject.call(this);
};
Kn.computeNormalMatrix = function(n, r) {
  const e = r[0], t = r[1], s = r[2], a = r[4], i = r[5], c = r[6], l = r[8], h = r[9], f = r[10], v = i * f - c * h, d = -(a * f - c * l), o = a * h - i * l, M = e * v + t * d + s * o;
  if (Math.abs(M) < 1e-6) return null;
  const m = 1 / M;
  n[0] = v * m, n[1] = d * m, n[2] = o * m, n[3] = -(t * f - s * h) * m, n[4] = (e * f - s * l) * m, n[5] = -(e * h - t * l) * m, n[6] = (t * c - s * i) * m, n[7] = -(e * c - s * a) * m, n[8] = (e * i - t * a) * m;
};
Kn.computeBoundsFlatArray = function(n, r, e) {
  if (e.length !== 0) {
    for (var t = e[0], s = t, a = e[1], i = a, c = e[2], l = c, h = 3; h < e.length; h += 3) {
      var f = e[h], v = e[h + 1], d = e[h + 2];
      f < t ? t = f : f > s && (s = f), v < a ? a = v : v > i && (i = v), d < c ? c = d : d > l && (l = d);
    }
    return n[r] = t, n[r + 1] = a, n[r + 2] = c, n[r + 3] = s, n[r + 4] = a, n[r + 5] = c, n[r + 6] = t, n[r + 7] = i, n[r + 8] = c, n[r + 9] = s, n[r + 10] = i, n[r + 11] = c, n[r + 12] = t, n[r + 13] = a, n[r + 14] = l, n[r + 15] = s, n[r + 16] = a, n[r + 17] = l, n[r + 18] = t, n[r + 19] = i, n[r + 20] = l, n[r + 21] = s, n[r + 22] = i, n[r + 23] = l, n;
  }
};
Kn.computeBoundingSphere = function(n, r, e) {
  let t = 1 / 0, s = 1 / 0, a = 1 / 0, i = -1 / 0, c = -1 / 0, l = -1 / 0;
  for (let y = 0; y < e.length; y += 3) {
    const p = e[y], z = e[y + 1], w = e[y + 2];
    p < t && (t = p), p > i && (i = p), z < s && (s = z), z > c && (c = z), w < a && (a = w), w > l && (l = w);
  }
  const h = (t + i) * 0.5, f = (s + c) * 0.5, v = (a + l) * 0.5, d = i - h, o = c - f, M = l - v, m = Math.sqrt(d * d + o * o + M * M);
  n[r] = h, n[r + 1] = f, n[r + 2] = v, n[r + 3] = m;
};
function e1(n) {
  xn.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var Zr = e1.prototype = Object.create(xn.prototype);
Zr.constructor = e1;
Zr.sprite = null;
Zr.pivotX = 0;
Zr.pivotY = 0;
Zr.layer = 0;
Zr.setGameObject = function(n) {
  xn.prototype.setGameObject.call(this, n), n.spriteRenderer = this;
};
Zr.setSprite = function(n) {
  return this.sprite = n, this.enabled = !0, this;
};
Zr.setPivot = function(n, r) {
  return this.pivotX = n, this.pivotY = r, this;
};
Zr.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, xn.prototype.unsetGameObject.call(this);
};
function t1() {
  xn.call(this), this.points = [];
}
var ee = t1.prototype = Object.create(xn.prototype);
ee.constructor = t1;
ee.points = null;
ee.color = "white";
ee.width = 1;
ee.layer = 0;
ee.setGameObject = function(n) {
  xn.prototype.setGameObject.call(this, n), n.pathRenderer = this;
};
ee.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, xn.prototype.unsetGameObject.call(this);
};
function s1() {
  xn.call(this);
}
var Gr = s1.prototype = Object.create(xn.prototype);
Gr.constructor = s1;
Gr.text = "sample text";
Gr.color = "white";
Gr.style = "normal 12px arial";
Gr.layer = 0;
Gr.align = "center";
Gr.valign = "middle";
Gr.setGameObject = function(n) {
  xn.prototype.setGameObject.call(this, n), n.textRenderer = this;
};
Gr.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, xn.prototype.unsetGameObject.call(this);
};
function p2(n, r, e) {
  const t = [], s = [], a = n / 2, i = r / 2, c = n / e, l = r / e;
  for (let f = 0; f <= e; f++) {
    const v = f * l - i;
    for (let d = 0; d <= e; d++) {
      const o = d * c - a;
      t.push(o, 0, v);
    }
  }
  const h = e + 1;
  for (let f = 0; f < e; f++)
    for (let v = 0; v < e; v++) {
      const d = f * h + v, o = f * h + (v + 1), M = (f + 1) * h + v, m = (f + 1) * h + (v + 1);
      s.push(d, M, o), s.push(m, o, M);
    }
  return {
    vertices: new Float32Array(t),
    faces: new Uint16Array(s)
  };
}
const ze = p2(1, 1, 1), a1 = new Float32Array(32);
Kn.computeBoundsFlatArray(a1, 0, ze.vertices);
Kn.computeBoundingSphere(a1, 28, ze.vertices);
function kt() {
  Mr.call(this);
  const n = new Kn();
  n.faces = ze.faces, n.vertices = ze.vertices, n.bounds = a1, n.updateNormals(), this.addComponent(n);
}
kt.prototype = Object.create(Mr.prototype);
function x2(n, r, e, t) {
  const s = [], a = [], i = [];
  function c(h, f, v, d, o, M) {
    const m = `${h.toFixed(5)},${f.toFixed(5)},${v.toFixed(5)}`;
    if (M[m] !== void 0) return M[m];
    const y = s.length / 3;
    return s.push(h, f, v), a.push(d, o), M[m] = y, y;
  }
  function l(h, f, v, d, o, M, m, y, p, z) {
    const w = {}, b = m / z, g = y / z, $ = m / 2, q = y / 2, I = p / 2 * M, S = [];
    for (let x = 0; x <= z; x++) {
      const j = [], P = x * g - q;
      for (let A = 0; A <= z; A++) {
        const T = A * b - $, R = [0, 0, 0];
        R[h] = T * d, R[f] = P * o, R[v] = I;
        const D = A / z, U = 1 - x / z;
        j.push(c(R[0], R[1], R[2], D, U, w));
      }
      S.push(j);
    }
    for (let x = 0; x < z; x++)
      for (let j = 0; j < z; j++) {
        const P = S[x][j], A = S[x + 1][j], T = S[x + 1][j + 1], R = S[x][j + 1];
        i.push(P, R, A), i.push(A, R, T);
      }
  }
  return l(0, 1, 2, 1, 1, 1, n, r, e, t), l(0, 1, 2, -1, 1, -1, n, r, e, t), l(2, 1, 0, -1, 1, 1, e, r, n, t), l(2, 1, 0, 1, 1, -1, e, r, n, t), l(0, 2, 1, 1, -1, 1, n, e, r, t), l(0, 2, 1, 1, 1, -1, n, e, r, t), {
    vertices: new Float32Array(s),
    uvs: new Float32Array(a),
    faces: new Uint16Array(i)
  };
}
const xe = x2(1, 1, 1, 1), i1 = new Float32Array(32);
Kn.computeBoundsFlatArray(i1, 0, xe.vertices);
Kn.computeBoundingSphere(i1, 28, xe.vertices);
function Ct() {
  Mr.call(this);
  const n = new Kn();
  n.vertices = xe.vertices, n.uvs = xe.uvs, n.faces = xe.faces, n.bounds = i1, n.updateNormals(), this.addComponent(n);
}
Ct.prototype = Object.create(Mr.prototype);
function g2(n, r, e) {
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
const Ae = g2(7, 0.5, 1), c1 = new Float32Array(32);
Kn.computeBoundsFlatArray(c1, 0, Ae.vertices);
Kn.computeBoundingSphere(c1, 28, Ae.vertices);
function Et() {
  Mr.call(this);
  const n = new Kn();
  n.vertices = Ae.vertices, n.faces = Ae.faces, n.bounds = c1, n.updateNormals(), this.addComponent(n);
}
Et.prototype = Object.create(Mr.prototype);
function w2(n, r, e) {
  const t = [], s = [], a = [], i = {};
  function c(h, f, v, d, o) {
    const M = `${h.toFixed(5)},${f.toFixed(5)},${v.toFixed(5)},${d.toFixed(5)},${o.toFixed(5)}`;
    if (i[M] !== void 0) return i[M];
    const m = t.length / 3;
    return t.push(h, f, v), s.push(d, o), i[M] = m, m;
  }
  const l = [];
  for (let h = 0; h <= n; h++) {
    const f = [], v = h * Math.PI / n, d = Math.sin(v), o = Math.cos(v);
    for (let M = 0; M <= r; M++) {
      const m = M * 2 * Math.PI / r, y = Math.cos(m) * d * e, p = o * e, z = Math.sin(m) * d * e, w = M / r, b = h / n;
      f.push(c(y, p, z, w, b));
    }
    l.push(f);
  }
  for (let h = 0; h < n; h++)
    for (let f = 0; f < r; f++) {
      const v = l[h][f], d = l[h][f + 1], o = l[h + 1][f], M = l[h + 1][f + 1];
      h !== 0 && a.push(v, d, o), h !== n - 1 && a.push(o, d, M);
    }
  return {
    vertices: new Float32Array(t),
    uvs: new Float32Array(s),
    faces: new Uint16Array(a)
  };
}
function $2(n = 8, r = 8, e = 8) {
  const t = w2(n, r, e), s = new Float32Array(32);
  return Kn.computeBoundsFlatArray(s, 0, t.vertices), Kn.computeBoundingSphere(s, 28, t.vertices), [
    t.vertices,
    t.faces,
    t.uvs,
    s
  ];
}
function l1(n, r, e, t) {
  Mr.call(this);
  const s = new Kn();
  s.vertices = n, s.faces = r, s.uvs = e, s.bounds = t, s.updateNormals(), this.addComponent(s);
}
l1.prototype = Object.create(Mr.prototype);
l1.generate = $2;
function b2() {
  const n = new Array(65536);
  for (let r = 0; r < 65536; r++) {
    const e = r >> 11 & 31, t = r >> 5 & 63, s = r & 31, a = e << 3 | e >> 2, i = t << 2 | t >> 4, c = s << 3 | s >> 2;
    n[r] = "#" + (a < 16 ? "0" : "") + a.toString(16) + (i < 16 ? "0" : "") + i.toString(16) + (c < 16 ? "0" : "") + c.toString(16);
  }
  return n;
}
const M1 = t0;
function z2(n, r, e, t) {
  var s = n.transform.getLocalToWorld(), a = s[12], i = s[13], c = s[14];
  M1(
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
  ], d = 0; d < 3; d++) {
    var o = v[d], M = Math.sqrt(o.x * o.x + o.y * o.y + o.z * o.z);
    M < 1e-4 && (d === 0 ? o.x = 1 : d === 1 ? o.y = 1 : o.z = 1, M = 1);
    var m = o.x / M, y = o.y / M, p = o.z / M;
    M1(
      t,
      0,
      a + m * f,
      i + y * f,
      c + p * f,
      e
    ), r.beginPath(), r.lineWidth = 2, r.strokeStyle = o.col, r.moveTo(l, h), r.lineTo(t[0], t[1]), r.stroke();
  }
}
function A2(n, r, e, t, s, a, i, c, l) {
  if (i <= 1) return;
  const h = l - c > 1e-4 ? 65535 / (l - c) : 0;
  a.fill(0);
  for (let v = 0; v < i; v++) {
    const d = n[v], o = s[d] & 255;
    a[o]++;
  }
  let f = 0;
  for (let v = 0; v < 256; v++) {
    const d = a[v];
    a[v] = f, f += d;
  }
  for (let v = 0; v < i; v++) {
    const d = n[v], o = s[d] & 255;
    r[a[o]++] = d;
  }
  a.fill(0);
  for (let v = 0; v < i; v++) {
    const d = r[v], o = t[d] & 255;
    a[o]++;
  }
  f = 0;
  for (let v = 0; v < 256; v++) {
    const d = a[v];
    a[v] = f, f += d;
  }
  for (let v = 0; v < i; v++) {
    const d = r[v], o = t[d] & 255;
    n[a[o]++] = d;
  }
  a.fill(0);
  for (let v = 0; v < i; v++) {
    const d = n[v];
    let M = (e[d] - c) * h;
    M < 0 ? M = 0 : M > 65535 && (M = 65535);
    const m = 65535 - (M | 0) & 255;
    a[m]++;
  }
  f = 0;
  for (let v = 0; v < 256; v++) {
    const d = a[v];
    a[v] = f, f += d;
  }
  for (let v = 0; v < i; v++) {
    const d = n[v];
    let M = (e[d] - c) * h;
    M < 0 ? M = 0 : M > 65535 && (M = 65535);
    const m = 65535 - (M | 0) & 255;
    r[a[m]++] = d;
  }
  a.fill(0);
  for (let v = 0; v < i; v++) {
    const d = r[v];
    let M = (e[d] - c) * h;
    M < 0 ? M = 0 : M > 65535 && (M = 65535);
    const m = 65535 - (M | 0) >> 8 & 255;
    a[m]++;
  }
  f = 0;
  for (let v = 0; v < 256; v++) {
    const d = a[v];
    a[v] = f, f += d;
  }
  for (let v = 0; v < i; v++) {
    const d = r[v];
    let M = (e[d] - c) * h;
    M < 0 ? M = 0 : M > 65535 && (M = 65535);
    const m = 65535 - (M | 0) >> 8 & 255;
    n[a[m]++] = d;
  }
}
const q2 = Kn.computeNormalMatrix, Ue = e0, y1 = Oe, T2 = z2, Un = b2(), Ve = 0.6;
function Dt() {
  this.layerBuffers = [], this.drawCalls = 0, this.faces = 0, this.lightDirection = new Float32Array([0, 0, 0]), this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.colorBuffer = new Uint32Array(0), this.shaderTypeBuffer = new Uint32Array(0), this.shaderPassBuffer = new Uint8Array(0), this.faceNormalsBuffer = new Float32Array(0), this.vertexNormalsBuffer = new Float32Array(0), this.meshIndexBuffer = new Uint32Array(0), this.meshFaceIndexBuffer = new Uint32Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.lightsIndexBuffer = new Uint32Array(10), this.layerBuffers = [], this.layerBufferLengths = new Uint32Array(1), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0);
  for (let n = 0; n < fe.layersCount; n++)
    this.layerBuffers[n] = this.layerBuffers[n] || [];
  this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0), this.tempIndexBuffer = new Uint32Array(0), this.counters = new Uint32Array(256);
}
var te = Dt.prototype;
te.vec3Cache1 = new Float32Array([0, 0, 0]);
te.vec3Cache2 = new Float32Array([0, 0, 0]);
te.vec4Cache = new Float32Array([0, 0, 0]);
te.mat4Scratchpad1 = new Float32Array(16);
te.mat4Scratchpad2 = new Float32Array(16);
te.mat3Scratchpad1 = new Float32Array(9);
te.render = function(n, r, e) {
  let t = Date.now(), s = n.scene.retrieve(), a = fe.layersCount, i = r.width, c = r.height, l, h, f, v, d, o, M = this.vec3Cache1, m = this.vec3Cache2, y = this.vec4Cache, p = this.depthBuffer, z = this.indexBuffer, w = this.vertexIndexBuffer, b = this.vertexBuffer, g = this.clipGeometryBuffer, $ = this.colorBuffer, q = this.shaderTypeBuffer, I = this.shaderPassBuffer, S = this.faceNormalsBuffer, x = this.vertexNormalsBuffer, j = this.meshIndexBuffer, P = this.meshFaceIndexBuffer, A = this.visibleObjectsBuffer, T = this.lightsIndexBuffer, R = this.layerBuffers, D = this.layerBufferLengths, U = this.mat4Scratchpad1, Vn = this.mat4Scratchpad2, O = r.getWorldToScreen(), Gn = n.transform.getWorldToLocal(), Cn = n.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let Hn = this.tempIndexBuffer, Y = this.counters, N = 0, nn = 0;
  const J = n.camera, K = n.camera.fogType !== en.FogType.NONE ? J.fogColor : J.bgColor;
  if (J.bgColor !== -1) {
    const u = K >>> 16, C = K >>> 8 & 255, hn = K & 255, F = u & 248, Ln = C & 252, _ = hn & 248, sn = F << 8 | Ln << 3 | _ >> 3;
    r.context.fillStyle = Un[sn], r.context.fillRect(0, 0, r.width, r.height);
  } else
    r.context.clearRect(0, 0, r.width, r.height);
  if (A.length < s.length) {
    const u = A;
    this.visibleObjectsBuffer = A = new Uint32Array(
      s.length
    ), A.set(u);
  }
  if (T.length < s.length) {
    const u = T;
    this.lightsIndexBuffer = T = new Uint32Array(
      s.length
    ), T.set(u);
  }
  if (S2(
    s,
    Cn,
    A,
    T
  ), O2(A, s, Cn), D.length < a) {
    var tn = D;
    this.layerBufferLengths = D = new Uint32Array(a), D.set(tn);
  }
  const tr = A[0] + 1;
  for (v = 1; v < tr; v++) {
    const u = s[A[v]];
    if (u.meshRenderer) {
      const C = u.meshRenderer, hn = C.layer;
      R[hn][D[hn]++] = C;
    }
  }
  let mn = 0;
  for (v = 0; v < a; v++) {
    o = r.layers[v], h = R[v], f = D[v];
    let u = 0, C = 0;
    for (let _ = 0; _ < f; _++) {
      u += h[_].faces.length;
      const sn = h[_].vertices.length;
      sn > C && (C = sn);
    }
    u = u / 3 | 0;
    const hn = C / 3 | 0;
    if (this.vMapping.length < hn && (this.vMapping = new Int32Array(hn), this.vTags = new Uint32Array(hn)), M.length < C && (this.vec3Cache1 = M = new Float32Array(C), this.vec3Cache2 = m = new Float32Array(C), this.vec4Cache = y = new Float32Array(C * 4 / 3)), p.length < u) {
      let _ = new Float32Array(u);
      _.set(p), this.depthBuffer = p = _, _ = new Uint32Array(u), _.set(z), this.indexBuffer = z = _, _ = new Uint32Array(u), _.set(Hn), this.tempIndexBuffer = Hn = _, _ = new Uint32Array(u), _.set($), this.colorBuffer = $ = _, _ = new Uint32Array(u), _.set(q), this.shaderTypeBuffer = q = _, _ = new Uint8Array(u), _.set(I), this.shaderPassBuffer = I = _, _ = new Float32Array(u * 9), _.set(g), this.clipGeometryBuffer = g = _, _ = new Float32Array(u * 3), _.set(S), this.faceNormalsBuffer = S = _, _ = new Float32Array(u * 9), _.set(x), this.vertexNormalsBuffer = x = _, _ = new Uint32Array(u), _.set(j), this.meshIndexBuffer = j = _, _ = new Uint32Array(u), _.set(P), this.meshFaceIndexBuffer = P = _;
      let sn = new Float32Array(u * 6);
      sn.set(b), this.vertexBuffer = b = sn;
      let Pn = new Uint32Array(u * 3);
      Pn.set(w), this.vertexIndexBuffer = w = Pn;
    }
    const F = F2(
      h,
      f,
      m,
      y,
      z,
      p,
      $,
      q,
      I,
      g,
      Gn,
      Cn,
      Vn,
      U,
      this.mat3Scratchpad1,
      S,
      x,
      b,
      w,
      j,
      P,
      this.vMapping,
      this.vTags
    );
    if ((fe.depthSortingMask & v + 1) === v + 1) {
      const _ = performance.now();
      A2(z, Hn, p, j, I, Y, F, J.nearClippingPane, J.farClippingPane), mn += performance.now() - _;
    }
    const Ln = (fe.layerClearMask & v + 1) === v + 1;
    for (I2(
      o,
      b,
      w,
      z,
      $,
      q,
      F,
      0,
      Ln,
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
      S,
      x,
      j,
      P,
      h,
      this.wireframe,
      T,
      s
    ), d = 0; d < f; d++)
      l = h[d], l.gameObject && l.gameObject.debug && T2(l.gameObject, o, O, M);
    r.context.drawImage(o.canvas, 0, 0), N += F, nn += F, D[v] = 0;
  }
  e.totalObjects = s.length, e.visibleObjects = tr, e.drawCalls = N, e.faces = nn, e.sortTime = mn, e.dt = Date.now() - t;
};
function S2(n, r, e, t) {
  let s = 0, a = 0;
  const i = r[0], c = r[1], l = r[2], h = r[3], f = r[4], v = r[5], d = r[6], o = r[7], M = r[8], m = r[9], y = r[10], p = r[11], z = r[12], w = r[13], b = r[14], g = r[15];
  let $ = h + i, q = o + f, I = p + M, S = g + z, x = 1 / Math.sqrt($ * $ + q * q + I * I);
  $ *= x, q *= x, I *= x, S *= x;
  let j = h - i, P = o - f, A = p - M, T = g - z;
  x = 1 / Math.sqrt(j * j + P * P + A * A), j *= x, P *= x, A *= x, T *= x;
  let R = h + c, D = o + v, U = p + m, Vn = g + w;
  x = 1 / Math.sqrt(R * R + D * D + U * U), R *= x, D *= x, U *= x, Vn *= x;
  let O = h - c, Gn = o - v, Cn = p - m, Hn = g - w;
  x = 1 / Math.sqrt(O * O + Gn * Gn + Cn * Cn), O *= x, Gn *= x, Cn *= x, Hn *= x;
  let Y = h + l, N = o + d, nn = p + y, J = g + b;
  x = 1 / Math.sqrt(Y * Y + N * N + nn * nn), Y *= x, N *= x, nn *= x, J *= x;
  let K = h - l, tn = o - d, tr = p - y, mn = g - b;
  x = 1 / Math.sqrt(K * K + tn * tn + tr * tr), K *= x, tn *= x, tr *= x, mn *= x;
  const u = n.length;
  for (let C = 0; C < u; C++) {
    const hn = n[C];
    if (hn.meshRenderer && hn.meshRenderer.enabled) {
      const F = hn.transform.worldMatrix, Ln = hn.meshRenderer.bounds, _ = Ln[28], sn = Ln[29], Pn = Ln[30], lr = F[0] * _ + F[4] * sn + F[8] * Pn + F[12], hr = F[1] * _ + F[5] * sn + F[9] * Pn + F[13], En = F[2] * _ + F[6] * sn + F[10] * Pn + F[14], Pr = F[0] * F[0] + F[1] * F[1] + F[2] * F[2], se = F[4] * F[4] + F[5] * F[5] + F[6] * F[6], or = F[8] * F[8] + F[9] * F[9] + F[10] * F[10], gn = Ln[31] * Math.sqrt(Math.max(Pr, se, or));
      if ($ * lr + q * hr + I * En + S < -gn || j * lr + P * hr + A * En + T < -gn || R * lr + D * hr + U * En + Vn < -gn || O * lr + Gn * hr + Cn * En + Hn < -gn || Y * lr + N * hr + nn * En + J < -gn || K * lr + tn * hr + tr * En + mn < -gn) continue;
      e[++s] = C;
    }
    if (hn.light)
      if (hn.light.type === 1) {
        const F = hn.transform.worldMatrix, Ln = F[12], _ = F[13], sn = F[14], Pn = F[0] * F[0] + F[1] * F[1] + F[2] * F[2], lr = F[4] * F[4] + F[5] * F[5] + F[6] * F[6], hr = F[8] * F[8] + F[9] * F[9] + F[10] * F[10], En = hn.light.range * Math.sqrt(Math.max(Pn, lr, hr));
        if ($ * Ln + q * _ + I * sn + S < -En || j * Ln + P * _ + A * sn + T < -En || R * Ln + D * _ + U * sn + Vn < -En || O * Ln + Gn * _ + Cn * sn + Hn < -En || Y * Ln + N * _ + nn * sn + J < -En || K * Ln + tn * _ + tr * sn + mn < -En) continue;
        t[++a] = C;
      } else
        t[++a] = C;
  }
  e[0] = s, t[0] = a;
}
function O2(n, r, e) {
  const t = e, s = t[0], a = t[1], i = t[2], c = t[3], l = t[4], h = t[5], f = t[6], v = t[7], d = t[8], o = t[9], M = t[10], m = t[11], y = t[12], p = t[13], z = t[14], w = t[15];
  let b = 0;
  const g = n[0] + 1;
  for (let $ = 1; $ < g; $++) {
    const q = n[$], I = r[q], S = I.transform.worldMatrix, x = I.meshRenderer;
    if (x && x.enabled && x.bounds) {
      const j = x.bounds;
      let P = 63;
      for (let A = 0; A < 24; A += 3) {
        const T = j[A], R = j[A + 1], D = j[A + 2], U = S[0] * T + S[4] * R + S[8] * D + S[12], Vn = S[1] * T + S[5] * R + S[9] * D + S[13], O = S[2] * T + S[6] * R + S[10] * D + S[14], Gn = s * U + l * Vn + d * O + y, Cn = a * U + h * Vn + o * O + p, Hn = i * U + f * Vn + M * O + z, Y = c * U + v * Vn + m * O + w;
        let N = 0;
        Gn < -Y && (N |= 1), Gn > Y && (N |= 2), Cn < -Y && (N |= 4), Cn > Y && (N |= 8), Hn < -Y && (N |= 16), Hn > Y && (N |= 32), P &= N;
      }
      P === 0 && (n[++b] = q);
    } else {
      const j = S[12], P = S[13], A = S[14], T = s * j + l * P + d * A + y, R = a * j + h * P + o * A + p, D = i * j + f * P + M * A + z, U = c * j + v * P + m * A + w;
      T >= -U && T <= U && R >= -U && R <= U && D >= -U && D <= U && (n[++b] = q);
    }
  }
  n[0] = b;
}
let re = 0;
function F2(n, r, e, t, s, a, i, c, l, h, f, v, d, o, M, m, y, p, z, w, b, g, $) {
  let q = 0, I = 0;
  for (let S = 0; S < r; S++) {
    const x = n[S];
    if (x.constructor !== Kn) continue;
    ++re;
    const j = x.gameObject.transform.worldMatrix, P = x.depthBias || 0;
    y1(o, v, j), y1(d, f, j);
    const A = o[0], T = o[1], R = o[2], D = o[3], U = o[4], Vn = o[5], O = o[6], Gn = o[7], Cn = o[8], Hn = o[9], Y = o[10], N = o[11], nn = o[12], J = o[13], K = o[14], tn = o[15], tr = x.faces, mn = x.vertices, u = x.faceNormals, C = x.vertexNormals;
    q2(M, j);
    const hn = M, F = hn[0], Ln = hn[1], _ = hn[2], sn = hn[3], Pn = hn[4], lr = hn[5], hr = hn[6], En = hn[7], Pr = hn[8], se = tr.length;
    for (let or = 0; or < se; or += 3) {
      const gn = tr[or], Bn = tr[or + 1], yr = tr[or + 2], Or = gn << 2, wr = Bn << 2, $r = yr << 2;
      if ($[gn] !== re) {
        const V = gn * 3, k = mn[V], H = mn[V + 1], B = mn[V + 2];
        t[Or] = A * k + U * H + Cn * B + nn, t[Or + 1] = T * k + Vn * H + Hn * B + J, t[Or + 2] = R * k + O * H + Y * B + K, t[Or + 3] = D * k + Gn * H + N * B + tn, $[gn] = re, g[gn] = -1;
      }
      if ($[Bn] !== re) {
        const V = Bn * 3, k = mn[V], H = mn[V + 1], B = mn[V + 2];
        t[wr] = A * k + U * H + Cn * B + nn, t[wr + 1] = T * k + Vn * H + Hn * B + J, t[wr + 2] = R * k + O * H + Y * B + K, t[wr + 3] = D * k + Gn * H + N * B + tn, $[Bn] = re, g[Bn] = -1;
      }
      if ($[yr] !== re) {
        const V = yr * 3, k = mn[V], H = mn[V + 1], B = mn[V + 2];
        t[$r] = A * k + U * H + Cn * B + nn, t[$r + 1] = T * k + Vn * H + Hn * B + J, t[$r + 2] = R * k + O * H + Y * B + K, t[$r + 3] = D * k + Gn * H + N * B + tn, $[yr] = re, g[yr] = -1;
      }
      const ae = t[Or], ie = t[Or + 1], br = t[Or + 2], sr = t[Or + 3], un = t[wr], Dn = t[wr + 1], Nn = t[wr + 2], An = t[wr + 3], ar = t[$r], Tn = t[$r + 1], On = t[$r + 2], on = t[$r + 3];
      if (ae < -sr && un < -An && ar < -on || ae > sr && un > An && ar > on || ie < -sr && Dn < -An && Tn < -on || ie > sr && Dn > An && Tn > on || br < -sr && Nn < -An && On < -on || br > sr && Nn > An && On > on) continue;
      const dr = 1 / sr, Qn = 1 / An, qn = 1 / on, er = ae * dr, rn = ie * dr, fr = un * Qn, _n = Dn * Qn, fn = ar * qn, wn = Tn * qn;
      if ((fr - er) * (wn - rn) - (_n - rn) * (fn - er) > 0) continue;
      const pn = gn * 3, $n = Bn * 3, an = yr * 3;
      s[q] = q, w[q] = S, b[q] = or;
      const X = u[or], W = u[or + 1], dn = u[or + 2], cn = X * F + W * sn + dn * hr, Mn = X * Ln + W * Pn + dn * En, Z = X * _ + W * lr + dn * Pr, bn = Math.sqrt(cn * cn + Mn * Mn + Z * Z), ln = bn > 0 ? 1 / bn : 0, Wn = or / 3 | 0, Q = x.faceColors[Wn % x.faceColors.length];
      if (i[q] = x.colors[Q], c[q] = x.shaderType, l[q] = 0, g[gn] === -1) {
        const V = I * 3;
        Ue(
          e,
          pn,
          mn[pn],
          mn[pn + 1],
          mn[pn + 2],
          d
        ), p[V] = er, p[V + 1] = -rn, g[gn] = V, I++;
        const k = gn * 3, H = C[k] * F + C[k + 1] * sn + C[k + 2] * hr, B = C[k] * Ln + C[k + 1] * Pn + C[k + 2] * En, kn = C[k] * _ + C[k + 1] * lr + C[k + 2] * Pr, Sn = Math.sqrt(H * H + B * B + kn * kn), Xn = Sn > 0 ? 1 / Sn : 0;
        y[V] = H * Xn, y[V + 1] = B * Xn, y[V + 2] = kn * Xn;
      }
      if (z[q * 3] = g[gn], g[Bn] === -1) {
        const V = I * 3;
        Ue(
          e,
          $n,
          mn[$n],
          mn[$n + 1],
          mn[$n + 2],
          d
        ), p[V] = fr, p[V + 1] = -_n, g[Bn] = V, I++;
        const k = Bn * 3, H = C[k] * F + C[k + 1] * sn + C[k + 2] * hr, B = C[k] * Ln + C[k + 1] * Pn + C[k + 2] * En, kn = C[k] * _ + C[k + 1] * lr + C[k + 2] * Pr, Sn = Math.sqrt(H * H + B * B + kn * kn), Xn = Sn > 0 ? 1 / Sn : 0;
        y[V] = H * Xn, y[V + 1] = B * Xn, y[V + 2] = kn * Xn;
      }
      if (z[q * 3 + 1] = g[Bn], g[yr] === -1) {
        const V = I * 3;
        Ue(
          e,
          an,
          mn[an],
          mn[an + 1],
          mn[an + 2],
          d
        ), p[V] = fn, p[V + 1] = -wn, g[yr] = V, I++;
        const k = yr * 3, H = C[k] * F + C[k + 1] * sn + C[k + 2] * hr, B = C[k] * Ln + C[k + 1] * Pn + C[k + 2] * En, kn = C[k] * _ + C[k + 1] * lr + C[k + 2] * Pr, Sn = Math.sqrt(H * H + B * B + kn * kn), Xn = Sn > 0 ? 1 / Sn : 0;
        y[V] = H * Xn, y[V + 1] = B * Xn, y[V + 2] = kn * Xn;
      }
      z[q * 3 + 2] = g[yr];
      const yn = q * 9;
      h[yn] = e[pn], h[yn + 1] = e[pn + 1];
      const mr = h[yn + 2] = e[pn + 2];
      h[yn + 3] = e[$n], h[yn + 4] = e[$n + 1];
      const Yn = h[yn + 5] = e[$n + 2];
      h[yn + 6] = e[an], h[yn + 7] = e[an + 1];
      const ir = h[yn + 8] = e[an + 2];
      a[q] = (mr + Yn + ir) * 0.33333 + P;
      const cr = q * 3;
      m[cr] = cn * ln, m[cr + 1] = Mn * ln, m[cr + 2] = Z * ln, q++;
    }
  }
  return q;
}
function I2(n, r, e, t, s, a, i, c, l, h, f, v, d, o, M, m, y, p, z, w, b, g, $, q, I, S, x, j) {
  const P = h * 0.5, A = f * 0.5, T = c + i;
  l && n.clearRect(0, 0, n.canvas.width, n.canvas.height);
  let R = -1, D = -1, U = -1;
  for (let Vn = c; Vn < T; Vn++) {
    const O = t[Vn], Gn = e[O * 3], Cn = e[O * 3 + 1], Hn = e[O * 3 + 2], Y = r[Gn] * P + P, N = r[Gn + 1] * A + A, nn = r[Cn] * P + P, J = r[Cn + 1] * A + A, K = r[Hn] * P + P, tn = r[Hn + 1] * A + A, tr = (Y + nn + K) * 0.33333, mn = (N + J + tn) * 0.33333, u = Y - tr, C = N - mn, hn = Math.abs(u), F = Math.abs(C), Ln = hn > F ? hn + 0.4 * F : F + 0.4 * hn, _ = Ln > 0 ? Ve / Ln : 0, sn = Y + u * _, Pn = N + C * _, lr = nn - tr, hr = J - mn, En = Math.abs(lr), Pr = Math.abs(hr), se = En > Pr ? En + 0.4 * Pr : Pr + 0.4 * En, or = se > 0 ? Ve / se : 0, gn = nn + lr * or, Bn = J + hr * or, yr = K - tr, Or = tn - mn, wr = Math.abs(yr), $r = Math.abs(Or), ae = wr > $r ? wr + 0.4 * $r : $r + 0.4 * wr, ie = ae > 0 ? Ve / ae : 0, br = K + yr * ie, sr = tn + Or * ie;
    switch (S ? 3 : a[O]) {
      case 0: {
        const un = s[O];
        let Dn = un >>> 16, Nn = un >>> 8 & 255, An = un & 255, ar = w >>> 16 & 255, Tn = w >>> 8 & 255, On = w & 255;
        const on = b[O * 3], dr = b[O * 3 + 1], Qn = b[O * 3 + 2], qn = x[0] + 1;
        for (let X = 1; X < qn; X++) {
          const W = j[x[X]];
          if (W.light.type === 0) {
            const dn = -W.transform.worldMatrix[8], cn = -W.transform.worldMatrix[9], Mn = -W.transform.worldMatrix[10], Z = on * dn + dr * cn + Qn * Mn;
            Z > 0 && (ar += (W.light.color >>> 16 & 255) * Z, Tn += (W.light.color >>> 8 & 255) * Z, On += (W.light.color & 255) * Z);
          }
        }
        ar *= 39215e-7, Tn *= 39215e-7, On *= 39215e-7, Dn = Dn * ar | 0, Nn = Nn * Tn | 0, An = An * On | 0, Dn = Dn > 255 ? 255 : Dn, Nn = Nn > 255 ? 255 : Nn, An = An > 255 ? 255 : An;
        const er = d[O];
        let rn = 0;
        if (o === en.FogType.RADIAL_FAST || o === en.FogType.RADIAL) {
          const X = v[O * 9], W = v[O * 9 + 1], dn = v[O * 9 + 2], cn = v[O * 9 + 3], Mn = v[O * 9 + 4], Z = v[O * 9 + 5], bn = v[O * 9 + 6], ln = v[O * 9 + 7], Wn = v[O * 9 + 8], Q = (X + cn + bn) * 0.33333, yn = (W + Mn + ln) * 0.33333, mr = (dn + Z + Wn) * 0.33333;
          if (o === en.FogType.RADIAL_FAST) {
            const Yn = m * m, cr = 1 / (y * y - Yn);
            rn = (Q * Q + yn * yn + mr * mr - Yn) * cr;
          } else
            rn = (Math.sqrt(Q * Q + yn * yn + mr * mr) - m) / (y - m);
        } else o === en.FogType.LINEAR && (rn = (er - m) / (y - m));
        if (rn > 1 && (rn = 1), rn > 0) {
          const X = M >>> 16, W = M >>> 8 & 255, dn = M & 255;
          Dn = Dn * (1 - rn) + X * rn | 0, Nn = Nn * (1 - rn) + W * rn | 0, An = An * (1 - rn) + dn * rn | 0;
        }
        const fr = $[O], _n = I[fr], fn = _n.textureImage;
        if (fn && fn.complete && fn.naturalWidth > 0 && _n.uvs) {
          const X = q[O], W = _n.uvs, dn = _n.faces[X] * 2, cn = _n.faces[X + 1] * 2, Mn = _n.faces[X + 2] * 2, Z = W[dn] * fn.width, bn = W[dn + 1] * fn.height, ln = W[cn] * fn.width, Wn = W[cn + 1] * fn.height, Q = W[Mn] * fn.width, yn = W[Mn + 1] * fn.height, mr = Z * (Wn - yn) - bn * (ln - Q) + (ln * yn - Q * Wn);
          if (Math.abs(mr) > 1e-5) {
            const Yn = 1 / mr, ir = (Y * (Wn - yn) + nn * (yn - bn) + K * (bn - Wn)) * Yn, cr = (Y * (Q - ln) + nn * (Z - Q) + K * (ln - Z)) * Yn, V = (Y * (ln * yn - Q * Wn) + nn * (Q * bn - Z * yn) + K * (Z * Wn - ln * bn)) * Yn, k = (N * (Wn - yn) + J * (yn - bn) + tn * (bn - Wn)) * Yn, H = (N * (Q - ln) + J * (Z - Q) + tn * (ln - Z)) * Yn, B = (N * (ln * yn - Q * Wn) + J * (Q * bn - Z * yn) + tn * (Z * Wn - ln * bn)) * Yn;
            n.save(), n.beginPath(), n.moveTo(sn, Pn), n.lineTo(gn, Bn), n.lineTo(br, sr), n.closePath(), n.clip(), n.setTransform(ir, k, cr, H, V, B), n.drawImage(fn, 0, 0), n.restore();
            const kn = ar >= 1 ? 255 : ar * 255 | 0, Sn = Tn >= 1 ? 255 : Tn * 255 | 0, Xn = On >= 1 ? 255 : On * 255 | 0, Dr = kn & 248, _r = Sn & 252, de = Xn & 248, ce = Dr << 8 | _r << 3 | de >> 3;
            if (n.globalCompositeOperation = "multiply", R !== ce && (n.fillStyle = Un[ce], R = ce), n.fill(), n.globalCompositeOperation = "source-over", rn > 0) {
              const Fr = M >>> 16, Ir = M >>> 8 & 255, Wr = M & 255, Ur = Fr & 248, Jr = Ir & 252, Kr = Wr & 248, vr = Ur << 8 | Jr << 3 | Kr >> 3;
              n.globalAlpha = rn, D !== vr && (n.strokeStyle = Un[vr], D = vr), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), R !== vr && (n.fillStyle = Un[vr], R = vr), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(Y, N), n.lineTo(nn, J), n.lineTo(K, tn), n.closePath();
        const wn = Dn & 248, pn = Nn & 252, $n = An & 248, an = wn << 8 | pn << 3 | $n >> 3;
        D !== an && (n.strokeStyle = Un[an], D = an), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), R !== an && (n.fillStyle = Un[an], R = an), n.fill();
        break;
      }
      case 1: {
        const un = s[O];
        let Dn = un >>> 16, Nn = un >>> 8 & 255, An = un & 255;
        const ar = d[O];
        let Tn = 0;
        if (o === en.FogType.RADIAL_FAST || o === en.FogType.RADIAL) {
          const fn = v[O * 9], wn = v[O * 9 + 1], pn = v[O * 9 + 2], $n = v[O * 9 + 3], an = v[O * 9 + 4], X = v[O * 9 + 5], W = v[O * 9 + 6], dn = v[O * 9 + 7], cn = v[O * 9 + 8], Mn = (fn + $n + W) * 0.33333, Z = (wn + an + dn) * 0.33333, bn = (pn + X + cn) * 0.33333;
          if (o === en.FogType.RADIAL_FAST) {
            const ln = m * m, Q = 1 / (y * y - ln);
            Tn = (Mn * Mn + Z * Z + bn * bn - ln) * Q;
          } else
            Tn = (Math.sqrt(Mn * Mn + Z * Z + bn * bn) - m) / (y - m);
        } else o === en.FogType.LINEAR && (Tn = (ar - m) / (y - m));
        let on = Math.max(0, Tn - 0);
        if (on > 1 && (on = 1), on > 0) {
          const fn = M >>> 16, wn = M >>> 8 & 255, pn = M & 255;
          Dn = Dn * (1 - on) + fn * on | 0, Nn = Nn * (1 - on) + wn * on | 0, An = An * (1 - on) + pn * on | 0;
        }
        const dr = $[O], Qn = I[dr], qn = Qn.textureImage;
        if (qn && qn.complete && qn.naturalWidth > 0 && Qn.uvs) {
          const fn = q[O], wn = Qn.uvs, pn = Qn.faces[fn] * 2, $n = Qn.faces[fn + 1] * 2, an = Qn.faces[fn + 2] * 2, X = wn[pn] * qn.width, W = wn[pn + 1] * qn.height, dn = wn[$n] * qn.width, cn = wn[$n + 1] * qn.height, Mn = wn[an] * qn.width, Z = wn[an + 1] * qn.height, bn = X * (cn - Z) - W * (dn - Mn) + (dn * Z - Mn * cn);
          if (Math.abs(bn) > 1e-5) {
            const ln = 1 / bn, Wn = (Y * (cn - Z) + nn * (Z - W) + K * (W - cn)) * ln, Q = (Y * (Mn - dn) + nn * (X - Mn) + K * (dn - X)) * ln, yn = (Y * (dn * Z - Mn * cn) + nn * (Mn * W - X * Z) + K * (X * cn - dn * W)) * ln, mr = (N * (cn - Z) + J * (Z - W) + tn * (W - cn)) * ln, Yn = (N * (Mn - dn) + J * (X - Mn) + tn * (dn - X)) * ln, ir = (N * (dn * Z - Mn * cn) + J * (Mn * W - X * Z) + tn * (X * cn - dn * W)) * ln;
            if (n.save(), n.beginPath(), n.moveTo(sn, Pn), n.lineTo(gn, Bn), n.lineTo(br, sr), n.closePath(), n.clip(), n.setTransform(Wn, mr, Q, Yn, yn, ir), n.drawImage(qn, 0, 0), n.restore(), on > 0) {
              const cr = M >>> 16, V = M >>> 8 & 255, k = M & 255, H = cr & 248, B = V & 252, kn = k & 248, Sn = H << 8 | B << 3 | kn >> 3;
              n.globalAlpha = on, D !== Sn && (n.strokeStyle = Un[Sn], D = Sn), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), R !== Sn && (n.fillStyle = Un[Sn], R = Sn), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(sn, Pn), n.lineTo(gn, Bn), n.lineTo(br, sr), n.closePath();
        const er = Dn & 248, rn = Nn & 252, fr = An & 248, _n = er << 8 | rn << 3 | fr >> 3;
        R !== _n && (n.fillStyle = Un[_n], R = _n), n.fill();
        break;
      }
      case 2: {
        const un = s[O];
        let Dn = un >>> 16, Nn = un >>> 8 & 255, An = un & 255;
        const ar = $[O], Tn = I[ar], On = Tn.textureImage;
        if (On && On.complete && On.naturalWidth > 0 && Tn.uvs) {
          const er = q[O], rn = Tn.uvs, fr = Tn.faces[er] * 2, _n = Tn.faces[er + 1] * 2, fn = Tn.faces[er + 2] * 2, wn = rn[fr] * On.width, pn = rn[fr + 1] * On.height, $n = rn[_n] * On.width, an = rn[_n + 1] * On.height, X = rn[fn] * On.width, W = rn[fn + 1] * On.height, dn = wn * (an - W) - pn * ($n - X) + ($n * W - X * an);
          if (Math.abs(dn) > 1e-5) {
            const cn = 1 / dn, Mn = (Y * (an - W) + nn * (W - pn) + K * (pn - an)) * cn, Z = (Y * (X - $n) + nn * (wn - X) + K * ($n - wn)) * cn, bn = (Y * ($n * W - X * an) + nn * (X * pn - wn * W) + K * (wn * an - $n * pn)) * cn, ln = (N * (an - W) + J * (W - pn) + tn * (pn - an)) * cn, Wn = (N * (X - $n) + J * (wn - X) + tn * ($n - wn)) * cn, Q = (N * ($n * W - X * an) + J * (X * pn - wn * W) + tn * (wn * an - $n * pn)) * cn;
            n.save(), n.beginPath(), n.moveTo(sn, Pn), n.lineTo(gn, Bn), n.lineTo(br, sr), n.closePath(), n.clip(), n.setTransform(Mn, ln, Z, Wn, bn, Q), n.drawImage(On, 0, 0), n.restore();
            break;
          }
        }
        n.beginPath(), n.moveTo(sn, Pn), n.lineTo(gn, Bn), n.lineTo(br, sr), n.closePath();
        const on = Dn & 248, dr = Nn & 252, Qn = An & 248, qn = on << 8 | dr << 3 | Qn >> 3;
        R !== qn && (n.fillStyle = Un[qn], R = qn), n.fill();
        break;
      }
      case 3: {
        n.beginPath(), n.moveTo(Y, N), n.lineTo(nn, J), n.lineTo(K, tn), n.closePath(), D !== 31 && (n.strokeStyle = Un[31], D = 31), U !== 5 && (n.lineWidth = 0.5, n.lineJoin = "miter", U = 5), n.stroke();
        break;
      }
      case 4: {
        const un = s[O], Dn = un >>> 16, Nn = un >>> 8 & 255, An = un & 255;
        let ar = w >>> 16, Tn = w >>> 8 & 255, On = w & 255, on = ar, dr = Tn, Qn = On, qn = ar, er = Tn, rn = On, fr = ar, _n = Tn, fn = On, wn = g[Gn], pn = g[Gn + 1], $n = g[Gn + 2], an = g[Cn], X = g[Cn + 1], W = g[Cn + 2], dn = g[Hn], cn = g[Hn + 1], Mn = g[Hn + 2];
        const Z = x[0] + 1;
        for (let E = 1; E < Z; E++) {
          const Jn = j[x[E]];
          if (Jn.light.type === 0) {
            const zr = Jn.light.color >>> 16, Ar = Jn.light.color >>> 8 & 255, pr = Jn.light.color & 255, Fn = -Jn.transform.worldMatrix[8], In = -Jn.transform.worldMatrix[9], nr = -Jn.transform.worldMatrix[10];
            let Zn = wn * Fn + pn * In + $n * nr, jn = an * Fn + X * In + W * nr, Rn = dn * Fn + cn * In + Mn * nr;
            Zn > 0 && (on += zr * Zn, dr += Ar * Zn, Qn += pr * Zn), jn > 0 && (qn += zr * jn, er += Ar * jn, rn += pr * jn), Rn > 0 && (fr += zr * Rn, _n += Ar * Rn, fn += pr * Rn);
          }
        }
        on *= 39215e-7, dr *= 39215e-7, Qn *= 39215e-7, qn *= 39215e-7, er *= 39215e-7, rn *= 39215e-7, fr *= 39215e-7, _n *= 39215e-7, fn *= 39215e-7;
        let bn = Math.min(Math.max(on, dr, Qn), 1), ln = Math.min(Math.max(qn, er, rn), 1), Wn = Math.min(Math.max(fr, _n, fn), 1), Q = 0;
        const yn = d[O];
        if (o === en.FogType.RADIAL_FAST || o === en.FogType.RADIAL) {
          const E = v[O * 9], Jn = v[O * 9 + 1], zr = v[O * 9 + 2], Ar = v[O * 9 + 3], pr = v[O * 9 + 4], Fn = v[O * 9 + 5], In = v[O * 9 + 6], nr = v[O * 9 + 7], Zn = v[O * 9 + 8], jn = (E + Ar + In) * 0.33333, Rn = (Jn + pr + nr) * 0.33333, Hr = (zr + Fn + Zn) * 0.33333;
          if (o === en.FogType.RADIAL_FAST) {
            const xr = m * m, Pe = 1 / (y * y - xr);
            Q = (jn * jn + Rn * Rn + Hr * Hr - xr) * Pe;
          } else
            Q = (Math.sqrt(jn * jn + Rn * Rn + Hr * Hr) - m) / (y - m);
        } else o === en.FogType.LINEAR && (Q = (yn - m) / (y - m));
        Q > 1 && (Q = 1);
        const mr = $[O], Yn = I[mr], ir = Yn.textureImage;
        if (ir && ir.complete && ir.naturalWidth > 0 && Yn.uvs) {
          const E = q[O], Jn = Yn.uvs, zr = Yn.faces[E] * 2, Ar = Yn.faces[E + 1] * 2, pr = Yn.faces[E + 2] * 2, Fn = Jn[zr] * ir.width, In = Jn[zr + 1] * ir.height, nr = Jn[Ar] * ir.width, Zn = Jn[Ar + 1] * ir.height, jn = Jn[pr] * ir.width, Rn = Jn[pr + 1] * ir.height, Hr = Fn * (Zn - Rn) - In * (nr - jn) + (nr * Rn - jn * Zn);
          if (Math.abs(Hr) > 1e-5) {
            const xr = 1 / Hr, h1 = (Y * (Zn - Rn) + nn * (Rn - In) + K * (In - Zn)) * xr, Pe = (Y * (jn - nr) + nn * (Fn - jn) + K * (nr - Fn)) * xr, f1 = (Y * (nr * Rn - jn * Zn) + nn * (jn * In - Fn * Rn) + K * (Fn * Zn - nr * In)) * xr, Ut = (N * (Zn - Rn) + J * (Rn - In) + tn * (In - Zn)) * xr, Vt = (N * (jn - nr) + J * (Fn - jn) + tn * (nr - Fn)) * xr, Nt = (N * (nr * Rn - jn * Zn) + J * (jn * In - Fn * Rn) + tn * (Fn * Zn - nr * In)) * xr;
            n.save(), n.beginPath(), n.moveTo(sn, Pn), n.lineTo(gn, Bn), n.lineTo(br, sr), n.closePath(), n.clip(), n.setTransform(h1, Ut, Pe, Vt, f1, Nt), n.drawImage(ir, 0, 0), n.restore();
            const Yt = on >= 1 ? 255 : on * 255 | 0, Xt = dr >= 1 ? 255 : dr * 255 | 0, Zt = Qn >= 1 ? 255 : Qn * 255 | 0, Gt = qn >= 1 ? 255 : qn * 255 | 0, Ht = er >= 1 ? 255 : er * 255 | 0, Bt = rn >= 1 ? 255 : rn * 255 | 0, Qt = fr >= 1 ? 255 : fr * 255 | 0, Jt = _n >= 1 ? 255 : _n * 255 | 0, Kt = fn >= 1 ? 255 : fn * 255 | 0, ut = (Yt & 248) << 8 | (Xt & 252) << 3 | (Zt & 248) >> 3, n0 = (Gt & 248) << 8 | (Ht & 252) << 3 | (Bt & 248) >> 3, r0 = (Qt & 248) << 8 | (Jt & 252) << 3 | (Kt & 248) >> 3;
            let Vr = Y, Nr = N, ur = nn, ne = J, ye = K, me = tn, Yr = bn, Cr = ln, pe = Wn, Xr = ut, Br = n0, ge = r0;
            if (Yr > Cr) {
              let vn;
              vn = Vr, Vr = ur, ur = vn, vn = Nr, Nr = ne, ne = vn, vn = Yr, Yr = Cr, Cr = vn, vn = Xr, Xr = Br, Br = vn;
            }
            if (Cr > pe) {
              let vn;
              vn = ur, ur = ye, ye = vn, vn = ne, ne = me, me = vn, vn = Cr, Cr = pe, pe = vn, vn = Br, Br = ge, ge = vn;
            }
            if (Yr > Cr) {
              let vn;
              vn = Vr, Vr = ur, ur = vn, vn = Nr, Nr = ne, ne = vn, vn = Yr, Yr = Cr, Cr = vn, vn = Xr, Xr = Br, Br = vn;
            }
            if (n.globalCompositeOperation = "multiply", pe - Yr < 0.01 || Xr === Br && Br === ge)
              R !== Xr && (n.fillStyle = Un[Xr], R = Xr), n.beginPath(), n.moveTo(sn, Pn), n.lineTo(gn, Bn), n.lineTo(br, sr), n.closePath(), n.fill();
            else {
              const vn = (Cr - Yr) / (pe - Yr), _e = Vr + vn * (ye - Vr), ke = Nr + vn * (me - Nr), Ce = ur - _e, he = -(ne - ke), Rr = Ce, o1 = he * he + Rr * Rr;
              let Ee, De;
              if (o1 < 1e-6)
                Ee = ye, De = me;
              else {
                const d1 = ((ye - Vr) * he + (me - Nr) * Rr) / o1;
                Ee = Vr + d1 * he, De = Nr + d1 * Rr;
              }
              const We = n.createLinearGradient(Vr, Nr, Ee, De);
              We.addColorStop(0, Un[Xr]), We.addColorStop(1, Un[ge]), R = -1, n.fillStyle = We, n.beginPath(), n.moveTo(sn, Pn), n.lineTo(gn, Bn), n.lineTo(br, sr), n.closePath(), n.fill();
            }
            if (n.globalCompositeOperation = "source-over", Q > 0) {
              const vn = M >>> 16, _e = M >>> 8 & 255, ke = M & 255, Ce = vn & 248, v1 = _e & 252, he = ke & 248, Rr = Ce << 8 | v1 << 3 | he >> 3;
              n.globalAlpha = Q, D !== Rr && (n.strokeStyle = Un[Rr], D = Rr), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), R !== Rr && (n.fillStyle = Un[Rr], R = Rr), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        let cr = Dn * on, V = Nn * dr, k = An * Qn, H = Dn * qn, B = Nn * er, kn = An * rn, Sn = Dn * fr, Xn = Nn * _n, Dr = An * fn;
        if (cr = cr > 255 ? 255 : cr, V = V > 255 ? 255 : V, k = k > 255 ? 255 : k, H = H > 255 ? 255 : H, B = B > 255 ? 255 : B, kn = kn > 255 ? 255 : kn, Sn = Sn > 255 ? 255 : Sn, Xn = Xn > 255 ? 255 : Xn, Dr = Dr > 255 ? 255 : Dr, Q > 0) {
          const E = 1 - Q, Jn = M >>> 16, zr = M >>> 8 & 255, Ar = M & 255, pr = Jn * Q, Fn = zr * Q, In = Ar * Q;
          cr = cr * E + pr | 0, V = V * E + Fn | 0, k = k * E + In | 0, H = H * E + pr | 0, B = B * E + Fn | 0, kn = kn * E + In | 0, Sn = Sn * E + pr | 0, Xn = Xn * E + Fn | 0, Dr = Dr * E + In | 0;
        } else
          cr |= 0, V |= 0, k |= 0, H |= 0, B |= 0, kn |= 0, Sn |= 0, Xn |= 0, Dr |= 0;
        const _r = (cr & 248) << 8 | (V & 252) << 3 | (k & 248) >> 3, de = (H & 248) << 8 | (B & 252) << 3 | (kn & 248) >> 3, ce = (Sn & 248) << 8 | (Xn & 252) << 3 | (Dr & 248) >> 3;
        if (_r === de && de === ce) {
          n.beginPath(), n.moveTo(Y, N), n.lineTo(nn, J), n.lineTo(K, tn), n.closePath(), R !== _r && (n.fillStyle = Un[_r], R = _r), D !== _r && (n.strokeStyle = Un[_r], D = _r), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), n.fill();
          break;
        }
        let Fr = Y, Ir = N, Wr = nn, Ur = J, Jr = K, Kr = tn, vr = bn, kr = ln, Me = Wn, jr = _r, le = de, Le = ce;
        if (vr > kr) {
          let E;
          E = Fr, Fr = Wr, Wr = E, E = Ir, Ir = Ur, Ur = E, E = vr, vr = kr, kr = E, E = jr, jr = le, le = E;
        }
        if (kr > Me) {
          let E;
          E = Wr, Wr = Jr, Jr = E, E = Ur, Ur = Kr, Kr = E, E = kr, kr = Me, Me = E, E = le, le = Le, Le = E;
        }
        if (vr > kr) {
          let E;
          E = Fr, Fr = Wr, Wr = E, E = Ir, Ir = Ur, Ur = E, E = vr, vr = kr, kr = E, E = jr, jr = le, le = E;
        }
        if (Me - vr < 0.01)
          n.beginPath(), n.moveTo(Y, N), n.lineTo(nn, J), n.lineTo(K, tn), n.closePath(), R !== jr && (n.fillStyle = Un[jr], R = jr), D !== jr && (n.strokeStyle = Un[jr], D = jr), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), n.fill();
        else {
          const E = (kr - vr) / (Me - vr), Jn = Fr + E * (Jr - Fr), zr = Ir + E * (Kr - Ir), Ar = Wr - Jn, Fn = -(Ur - zr), In = Ar, nr = Fn * Fn + In * In;
          let Zn, jn;
          if (nr < 1e-6)
            Zn = Jr, jn = Kr;
          else {
            const xr = ((Jr - Fr) * Fn + (Kr - Ir) * In) / nr;
            Zn = Fr + xr * Fn, jn = Ir + xr * In;
          }
          const Rn = n.createLinearGradient(Fr, Ir, Zn, jn);
          Rn.addColorStop(0, Un[jr]), Rn.addColorStop(1, Un[Le]), R = -1, n.fillStyle = Rn, n.beginPath(), n.moveTo(sn, Pn), n.lineTo(gn, Bn), n.lineTo(br, sr), n.closePath(), n.fill();
        }
        break;
      }
    }
  }
}
const m1 = Oe;
function Wt(n, r) {
  this.canvas = r || document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new Dt(), this.camera = n, this.scale = 1, this.layers = [];
  for (var e = 0; e < fe.layersCount; e++) {
    var t = document.createElement("canvas");
    this.layers[e] = t.getContext("2d"), this.layers[e].imageSmoothingEnabled = !1, this.layers[e].webkitImageSmoothingEnabled = !1;
  }
  var s = this;
  window.addEventListener("resize", function() {
    s.setSize(s.canvas.offsetWidth, s.canvas.offsetHeight);
  }), this.lastRenderStats = {
    dt: 0,
    fps: 0,
    frameTime: 0,
    sortTime: 0
  };
  let a = performance.now(), i = 0, c = performance.now();
  const l = this;
  this.startRenderLoop = function h() {
    requestAnimationFrame(() => {
      const f = performance.now(), v = f - a;
      a = f, i++, f - c >= 500 && (l.lastRenderStats.fps = Math.round(i * 1e3 / (f - c)), i = 0, c = f), l.lastRenderStats.frameTime = v, l.render(), requestAnimationFrame(h);
    });
  };
}
var Sr = Wt.prototype;
Sr.size = null;
Sr.scale = 1;
Sr.width = null;
Sr.height = null;
Sr.viewportMatrix = null;
Sr.camera = null;
Sr.canvas = null;
Sr.context = null;
Sr.start = function() {
  this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight), this.startRenderLoop();
};
Sr.render = function() {
  this.camera !== null && this.renderer.render(this.camera.gameObject, this, this.lastRenderStats);
};
Sr.setSize = function(n, r) {
  const e = n * this.scale, t = r * this.scale;
  this.width = e, this.height = t, this.canvas.width = e, this.canvas.height = t, this.viewportMatrix[0] = e / 2, this.viewportMatrix[5] = -t / 2, this.viewportMatrix[12] = e / 2, this.viewportMatrix[13] = t / 2;
  for (var s = 0; s < this.layers.length; s++) {
    var a = this.layers[s];
    a.canvas.width = e, a.canvas.height = t;
  }
  this.camera.setup(n, r);
};
Sr.getWorldToScreen = function() {
  return m1(
    this.worldToScreenMatrix,
    this.viewportMatrix,
    this.camera.projectionMatrix
  ), m1(
    this.worldToScreenMatrix,
    this.worldToScreenMatrix,
    this.camera.gameObject.transform.getWorldToLocal()
  ), this.worldToScreenMatrix;
};
ve.Type = {
  DIRECTIONAL: 0,
  POINT: 1,
  SPOT: 2
};
function Qr() {
  xn.call(this);
}
Qr.prototype = Object.create(xn.prototype);
Qr.prototype.constructor = Qr;
Qr.prototype.color = 16777215;
Qr.prototype.range = 10;
Qr.prototype.type = ve.Type.DIRECTIONAL;
Qr.prototype.setGameObject = function(n) {
  xn.prototype.setGameObject.call(this, n), n.light = this;
};
function ve(n) {
  Mr.call(this, n || "light"), this.addComponent(this.light = new Qr());
}
ve.prototype = Object.create(Mr.prototype);
ve.prototype.constructor = ve;
const R2 = window.scaliaEngine = {
  config: fe,
  Game: w1,
  GameObject: Mr,
  Component: xn,
  Camera: _t,
  CameraComponent: en,
  MeshComponent: Kn,
  TransformComponent: Re,
  SpriteRenderer: e1,
  glMatrix: m2,
  PathRenderer: t1,
  TextRenderer: s1,
  Plane: kt,
  Box: Ct,
  Cone: Et,
  Ball: l1,
  Light: ve,
  Canvas2dViewport: Wt
};
export {
  R2 as default
};
