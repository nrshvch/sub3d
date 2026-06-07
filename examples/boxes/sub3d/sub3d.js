const he = {
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
var ve = g1.prototype;
ve.scene = null;
ve.time = null;
ve.tickRegister = function(n) {
  n._tickerIndex === void 0 && (n._tickerIndex = this.list.length, this.list.push(n));
};
ve.tickUnregister = function(n) {
  const r = n._tickerIndex;
  if (r === void 0) return;
  const e = this.list.pop();
  e !== n && (this.list[r] = e, e._tickerIndex = r), n._tickerIndex = void 0;
};
ve.update = function(n) {
  const r = this.list;
  for (let e = 0; e < r.length; e++)
    r[e].tick(n);
};
ve.tick = function() {
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
function gn() {
}
var Se = gn.prototype;
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
var L = 1e-6, G = typeof Float32Array < "u" ? Float32Array : Array, Rr = Math.random, $1 = "zyx";
function kr(n) {
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
  RANDOM: Rr,
  equals: h0,
  round: kr,
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
function Q0(n, r) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = r[0], n[5] = r[1], n;
}
function J0(n) {
  return "mat2d(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ")";
}
function B0(n) {
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
  frob: B0,
  fromRotation: G0,
  fromScaling: H0,
  fromTranslation: Q0,
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
  str: J0,
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
function Qs(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = r[1], n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = r[2], n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function Js(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = Math.sqrt(t * t + s * s + a * a), c, l, h;
  return i < L ? null : (i = 1 / i, t *= i, s *= i, a *= i, c = Math.sin(r), l = Math.cos(r), h = 1 - l, n[0] = t * t * h + l, n[1] = s * t * h + a * c, n[2] = a * t * h - s * c, n[3] = 0, n[4] = t * s * h - a * c, n[5] = s * s * h + l, n[6] = a * s * h + t * c, n[7] = 0, n[8] = t * a * h + s * c, n[9] = s * a * h - t * c, n[10] = a * a * h + l, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n);
}
function Bs(n, r) {
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
  fromRotation: Js,
  fromRotationTranslation: R1,
  fromRotationTranslationScale: ea,
  fromRotationTranslationScaleOrigin: ta,
  fromScaling: Qs,
  fromTranslation: Hs,
  fromValues: Ds,
  fromXRotation: Bs,
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
  return n[0] = kr(r[0]), n[1] = kr(r[1]), n[2] = kr(r[2]), n;
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
  var e = Rr() * 2 * Math.PI, t = Rr() * 2 - 1, s = Math.sqrt(1 - t * t) * r;
  return n[0] = Math.cos(e) * s, n[1] = Math.sin(e) * s, n[2] = t * r, n;
}
function Q1(n, r, e) {
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
var Qa = V1, Ja = N1, Ba = Y1, Ka = X1, ua = Z1, J1 = U1, ni = G1, ri = (function() {
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
  div: Ba,
  divide: Y1,
  dot: Fe,
  equals: Ha,
  exactEquals: Ga,
  floor: Ta,
  forEach: ri,
  fromValues: Ye,
  hermite: ka,
  inverse: La,
  len: J1,
  length: U1,
  lerp: Pa,
  max: Oa,
  min: Sa,
  mul: Ja,
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
  sub: Qa,
  subtract: V1,
  transformMat3: Da,
  transformMat4: Q1,
  transformQuat: Wa,
  zero: Xa
}, Symbol.toStringTag, { value: "Module" }));
function B1() {
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
  return n[0] = kr(r[0]), n[1] = kr(r[1]), n[2] = kr(r[2]), n[3] = kr(r[3]), n;
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
function Qe(n) {
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
function Je(n, r) {
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
  l = Rr(), e = l * 2 - 1, t = (4 * Rr() - 2) * Math.sqrt(l * -l + l), i = e * e + t * t, l = Rr(), s = l * 2 - 1, a = (4 * Rr() - 2) * Math.sqrt(l * -l + l), c = s * s + a * a;
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
var xi = tt, gi = st, wi = at, $i = ct, bi = lt, zi = He, Ai = Qe, qi = (function() {
  var n = B1();
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
  create: B1,
  cross: vi,
  dist: $i,
  distance: ct,
  div: wi,
  divide: at,
  dot: Je,
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
  squaredLength: Qe,
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
  var r = Rr(), e = Rr(), t = Rr(), s = Math.sqrt(1 - r), a = Math.sqrt(r);
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
var Ci = K1, Ei = u1, Be = nt, Di = rt, Wi = et, Ui = dt, wt = it, Ke = Je, Vi = ft, ue = He, Ni = ue, n1 = Qe, Yi = n1, r1 = ht, Xi = vt;
function Zi(n, r) {
  return Math.abs(Je(n, r)) >= 1 - L;
}
var Gi = (function() {
  var n = Ge(), r = Ye(1, 0, 0), e = Ye(0, 1, 0);
  return function(t, s, a) {
    var i = Fe(s, a);
    return i < -0.999999 ? (we(n, r, s), J1(n) < 1e-6 && we(n, e, s), H1(n, n), ot(t, n, Math.PI), t) : i > 0.999999 ? (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t) : (we(n, s, a), t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = 1 + i, r1(t, t));
  };
})(), Hi = (function() {
  var n = be(), r = be();
  return function(e, t, s, a, i, c) {
    return $e(n, t, i, c), $e(r, s, a, c), $e(e, n, r, 2 * c * (1 - c)), e;
  };
})(), Qi = (function() {
  var n = T1();
  return function(r, e, t, s) {
    return n[0] = t[0], n[3] = t[1], n[6] = t[2], n[1] = s[0], n[4] = s[1], n[7] = s[2], n[2] = -e[0], n[5] = -e[1], n[8] = -e[2], r1(r, gt(r, n));
  };
})();
const Ji = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Wi,
  calculateW: Ii,
  clone: Ci,
  conjugate: Pi,
  copy: Be,
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
  setAxes: Qi,
  setAxisAngle: ot,
  slerp: $e,
  sqlerp: Hi,
  sqrLen: Yi,
  squaredLength: n1,
  str: ki
}, Symbol.toStringTag, { value: "Module" }));
function Bi() {
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
var ic = Be;
function cc(n, r) {
  return n[0] = r[4], n[1] = r[5], n[2] = r[6], n[3] = r[7], n;
}
var lc = Be;
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
  create: Bi,
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
  return n[0] = kr(r[0]), n[1] = kr(r[1]), n;
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
function Qc(n, r) {
  r = r === void 0 ? 1 : r;
  var e = Rr() * 2 * Math.PI;
  return n[0] = Math.cos(e) * r, n[1] = Math.sin(e) * r, n;
}
function Jc(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[2] * s, n[1] = e[1] * t + e[3] * s, n;
}
function Bc(n, r, e) {
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
  random: Qc,
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
  transformMat2: Jc,
  transformMat2d: Bc,
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
  quat: Ji,
  quat2: Ic,
  vec2: y2,
  vec3: ei,
  vec4: Ti
}, Symbol.toStringTag, { value: "Module" })), je = Oe;
function Re() {
  gn.call(this), this.events = {
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
var zn = Re.prototype = Object.create(gn.prototype), gr = new Float32Array([0, 0, 0]), zr = new Float32Array(16);
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
  gn.prototype.setGameObject.call(this, n), n.transform = this;
};
zn.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
zn.removeParent = function() {
  this.parent = null;
};
zn.translate = function(n, r, e, t) {
  gr[0] = n, gr[1] = r, gr[2] = e, t === "world" ? (Ze(zr), Ne(zr, zr, gr), je(this.local, zr, this.local)) : Ne(this.local, this.local, gr);
};
zn.rotate = function(n, r, e, t) {
  var s = Math.PI / 180, a = W1;
  t === "world" ? (a.identity(zr), a.rotateZ(zr, zr, e * s), a.rotateY(zr, zr, r * s), a.rotateX(zr, zr, n * s), je(this.local, zr, this.local)) : (a.rotateZ(this.local, this.local, e * s), a.rotateY(this.local, this.local, r * s), a.rotateX(this.local, this.local, n * s));
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
  gr[0] = n, gr[1] = r, gr[2] = e, this.parent !== null && Q1(gr, gr, this.parent.getWorldToLocal()), this.local[12] = gr[0], this.local[13] = gr[1], this.local[14] = gr[2];
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
function dr(n) {
  this.instanceId = dr.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new Re()), this.name = n || "gameObject";
}
var Ar = dr.prototype;
Ar.instanceId = 0;
Ar.name = null;
Ar.layer = 0;
Ar.scene = null;
Ar.world = null;
Ar.transform = null;
Ar.components = null;
Ar.componentsCount = 0;
Ar.setScene = function(n) {
  this.scene = n;
};
Ar.addComponent = function(n) {
  return this.components[this.componentsCount++] = n, n.setGameObject(this), n;
};
Ar.removeComponent = function(n) {
  n.unsetGameObject();
};
Ar.getComponent = function(n) {
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
function rn(n) {
  gn.call(this), this.transform = n, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ], this.zoom = 1;
}
rn.prototype = Object.create(gn.prototype);
rn.prototype.constructor = rn;
rn.prototype.frustumSize = null;
rn.prototype.projectionMatrix = null;
rn.prototype.clipSpaceMatrix = null;
rn.prototype.nearClippingPane = 0;
rn.prototype.farClippingPane = 1e3;
rn.prototype.fogType = Pt.LINEAR;
rn.prototype.fogNearPane = 250;
rn.prototype.fogFarPane = 750;
rn.prototype.fogColor = 9868950;
rn.prototype.bgColor = -1;
rn.prototype.ambientLight = 8421504;
rn.prototype.setup = function(n, r) {
  const e = n / this.zoom, t = r / this.zoom;
  this.frustumSize = [
    [-e / 2, -t / 2, 0],
    [e / 2, t / 2, this.farClippingPane]
  ], E1(this.projectionMatrix, -e / 2, e / 2, -t / 2, t / 2, this.nearClippingPane, this.farClippingPane);
};
rn.prototype.setGameObject = function(n) {
  gn.prototype.setGameObject.call(this, n), n.camera = this;
};
rn.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, gn.prototype.unsetGameObject.call(this);
};
rn.prototype.getClipSpaceMatrix = function() {
  const n = this.transform.getWorldToLocal();
  return Oe(this.clipSpaceMatrix, this.projectionMatrix, n), this.clipSpaceMatrix;
};
rn.FogType = Pt;
function _t(n) {
  dr.call(this, n || "camera"), this.addComponent(new rn(this.transform));
}
_t.prototype = Object.create(dr.prototype);
function Kn() {
  gn.call(this), this.colors = new Uint32Array([255]), this.faceColors = new Uint32Array([0]);
}
var tr = Kn.prototype = Object.create(gn.prototype);
tr.constructor = Kn;
tr.layer = 0;
tr.vertices = null;
tr.faces = null;
tr.pivot = [0, 0, 0];
tr.color = null;
tr.colors = null;
tr.uvs = null;
tr._texture = null;
tr.textureImage = null;
Object.defineProperty(tr, "texture", {
  get: function() {
    return this._texture;
  },
  set: function(n) {
    this._texture !== n && (this._texture = n, n ? (this.textureImage || (this.textureImage = new Image()), this.textureImage.src = n) : this.textureImage = null);
  }
});
tr.faceColors = null;
tr.faceNormals = null;
tr.vertexNormals = null;
tr.bounds = null;
tr.updateNormals = function(n = 1) {
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
tr.setGameObject = function(n) {
  gn.prototype.setGameObject.call(this, n), n.meshRenderer = this;
};
tr.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, gn.prototype.unsetGameObject.call(this);
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
  gn.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var Xr = e1.prototype = Object.create(gn.prototype);
Xr.constructor = e1;
Xr.sprite = null;
Xr.pivotX = 0;
Xr.pivotY = 0;
Xr.layer = 0;
Xr.setGameObject = function(n) {
  gn.prototype.setGameObject.call(this, n), n.spriteRenderer = this;
};
Xr.setSprite = function(n) {
  return this.sprite = n, this.enabled = !0, this;
};
Xr.setPivot = function(n, r) {
  return this.pivotX = n, this.pivotY = r, this;
};
Xr.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, gn.prototype.unsetGameObject.call(this);
};
function t1() {
  gn.call(this), this.points = [];
}
var te = t1.prototype = Object.create(gn.prototype);
te.constructor = t1;
te.points = null;
te.color = "white";
te.width = 1;
te.layer = 0;
te.setGameObject = function(n) {
  gn.prototype.setGameObject.call(this, n), n.pathRenderer = this;
};
te.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, gn.prototype.unsetGameObject.call(this);
};
function s1() {
  gn.call(this);
}
var Zr = s1.prototype = Object.create(gn.prototype);
Zr.constructor = s1;
Zr.text = "sample text";
Zr.color = "white";
Zr.style = "normal 12px arial";
Zr.layer = 0;
Zr.align = "center";
Zr.valign = "middle";
Zr.setGameObject = function(n) {
  gn.prototype.setGameObject.call(this, n), n.textRenderer = this;
};
Zr.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, gn.prototype.unsetGameObject.call(this);
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
  dr.call(this);
  const n = new Kn();
  n.faces = ze.faces, n.vertices = ze.vertices, n.bounds = a1, n.updateNormals(), this.addComponent(n);
}
kt.prototype = Object.create(dr.prototype);
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
  dr.call(this);
  const n = new Kn();
  n.vertices = xe.vertices, n.uvs = xe.uvs, n.faces = xe.faces, n.bounds = i1, n.updateNormals(), this.addComponent(n);
}
Ct.prototype = Object.create(dr.prototype);
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
  dr.call(this);
  const n = new Kn();
  n.vertices = Ae.vertices, n.faces = Ae.faces, n.bounds = c1, n.updateNormals(), this.addComponent(n);
}
Et.prototype = Object.create(dr.prototype);
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
  dr.call(this);
  const s = new Kn();
  s.vertices = n, s.faces = r, s.uvs = e, s.bounds = t, s.updateNormals(), this.addComponent(s);
}
l1.prototype = Object.create(dr.prototype);
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
  for (let n = 0; n < he.layersCount; n++)
    this.layerBuffers[n] = this.layerBuffers[n] || [];
  this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0), this.tempIndexBuffer = new Uint32Array(0), this.counters = new Uint32Array(256);
}
var se = Dt.prototype;
se.vec3Cache1 = new Float32Array([0, 0, 0]);
se.vec3Cache2 = new Float32Array([0, 0, 0]);
se.vec4Cache = new Float32Array([0, 0, 0]);
se.mat4Scratchpad1 = new Float32Array(16);
se.mat4Scratchpad2 = new Float32Array(16);
se.mat3Scratchpad1 = new Float32Array(9);
se.render = function(n, r, e) {
  let t = Date.now(), s = n.scene.retrieve(), a = he.layersCount, i = r.width, c = r.height, l, h, f, v, d, o, M = this.vec3Cache1, m = this.vec3Cache2, y = this.vec4Cache, p = this.depthBuffer, z = this.indexBuffer, w = this.vertexIndexBuffer, b = this.vertexBuffer, g = this.clipGeometryBuffer, $ = this.colorBuffer, q = this.shaderTypeBuffer, I = this.shaderPassBuffer, S = this.faceNormalsBuffer, x = this.vertexNormalsBuffer, j = this.meshIndexBuffer, P = this.meshFaceIndexBuffer, A = this.visibleObjectsBuffer, T = this.lightsIndexBuffer, R = this.layerBuffers, D = this.layerBufferLengths, U = this.mat4Scratchpad1, Vn = this.mat4Scratchpad2, O = r.getWorldToScreen(), Zn = n.transform.getWorldToLocal(), kn = n.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let Gn = this.tempIndexBuffer, X = this.counters, Y = 0, u = 0;
  const B = n.camera, K = n.camera.fogType !== rn.FogType.NONE ? B.fogColor : B.bgColor;
  if (B.bgColor !== -1) {
    const k = K >>> 16, sn = K >>> 8 & 255, An = K & 255, F = k & 248, Rn = sn & 252, _ = An & 248, en = F << 8 | Rn << 3 | _ >> 3;
    r.context.fillStyle = Un[en], r.context.fillRect(0, 0, r.width, r.height);
  } else
    r.context.clearRect(0, 0, r.width, r.height);
  if (A.length < s.length) {
    const k = A;
    this.visibleObjectsBuffer = A = new Uint32Array(
      s.length
    ), A.set(k);
  }
  if (T.length < s.length) {
    const k = T;
    this.lightsIndexBuffer = T = new Uint32Array(
      s.length
    ), T.set(k);
  }
  if (S2(
    s,
    kn,
    A,
    T
  ), O2(A, s, kn), D.length < a) {
    var nn = D;
    this.layerBufferLengths = D = new Uint32Array(a), D.set(nn);
  }
  const ln = A[0] + 1;
  for (v = 1; v < ln; v++) {
    const k = s[A[v]];
    if (k.meshRenderer) {
      const sn = k.meshRenderer, An = sn.layer;
      R[An][D[An]++] = sn;
    }
  }
  let Mr = 0;
  for (v = 0; v < a; v++) {
    o = r.layers[v], h = R[v], f = D[v];
    let k = 0, sn = 0;
    for (let _ = 0; _ < f; _++) {
      k += h[_].faces.length;
      const en = h[_].vertices.length;
      en > sn && (sn = en);
    }
    k = k / 3 | 0;
    const An = sn / 3 | 0;
    if (this.vMapping.length < An && (this.vMapping = new Int32Array(An), this.vTags = new Uint32Array(An)), M.length < sn && (this.vec3Cache1 = M = new Float32Array(sn), this.vec3Cache2 = m = new Float32Array(sn), this.vec4Cache = y = new Float32Array(sn * 4 / 3)), p.length < k) {
      let _ = new Float32Array(k);
      _.set(p), this.depthBuffer = p = _, _ = new Uint32Array(k), _.set(z), this.indexBuffer = z = _, _ = new Uint32Array(k), _.set(Gn), this.tempIndexBuffer = Gn = _, _ = new Uint32Array(k), _.set($), this.colorBuffer = $ = _, _ = new Uint32Array(k), _.set(q), this.shaderTypeBuffer = q = _, _ = new Uint8Array(k), _.set(I), this.shaderPassBuffer = I = _, _ = new Float32Array(k * 9), _.set(g), this.clipGeometryBuffer = g = _, _ = new Float32Array(k * 3), _.set(S), this.faceNormalsBuffer = S = _, _ = new Float32Array(k * 9), _.set(x), this.vertexNormalsBuffer = x = _, _ = new Uint32Array(k), _.set(j), this.meshIndexBuffer = j = _, _ = new Uint32Array(k), _.set(P), this.meshFaceIndexBuffer = P = _;
      let en = new Float32Array(k * 6);
      en.set(b), this.vertexBuffer = b = en;
      let Ln = new Uint32Array(k * 3);
      Ln.set(w), this.vertexIndexBuffer = w = Ln;
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
      Zn,
      kn,
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
    if ((he.depthSortingMask & v + 1) === v + 1) {
      const _ = performance.now();
      A2(z, Gn, p, j, I, X, F, B.nearClippingPane, B.farClippingPane), Mr += performance.now() - _;
    }
    const Rn = (he.layerClearMask & v + 1) === v + 1;
    for (I2(
      o,
      b,
      w,
      z,
      $,
      q,
      F,
      0,
      Rn,
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
    r.context.drawImage(o.canvas, 0, 0), Y += F, u += F, D[v] = 0;
  }
  e.totalObjects = s.length, e.visibleObjects = ln, e.drawCalls = Y, e.faces = u, e.sortTime = Mr, e.dt = Date.now() - t;
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
  let O = h - c, Zn = o - v, kn = p - m, Gn = g - w;
  x = 1 / Math.sqrt(O * O + Zn * Zn + kn * kn), O *= x, Zn *= x, kn *= x, Gn *= x;
  let X = h + l, Y = o + d, u = p + y, B = g + b;
  x = 1 / Math.sqrt(X * X + Y * Y + u * u), X *= x, Y *= x, u *= x, B *= x;
  let K = h - l, nn = o - d, ln = p - y, Mr = g - b;
  x = 1 / Math.sqrt(K * K + nn * nn + ln * ln), K *= x, nn *= x, ln *= x, Mr *= x;
  const k = n.length;
  for (let sn = 0; sn < k; sn++) {
    const An = n[sn];
    if (An.meshRenderer && An.meshRenderer.enabled) {
      const F = An.transform.worldMatrix, Rn = An.meshRenderer.bounds, _ = Rn[28], en = Rn[29], Ln = Rn[30], ir = F[0] * _ + F[4] * en + F[8] * Ln + F[12], cr = F[1] * _ + F[5] * en + F[9] * Ln + F[13], Cn = F[2] * _ + F[6] * en + F[10] * Ln + F[14], Jr = F[0] * F[0] + F[1] * F[1] + F[2] * F[2], fr = F[4] * F[4] + F[5] * F[5] + F[6] * F[6], vr = F[8] * F[8] + F[9] * F[9] + F[10] * F[10], wn = Rn[31] * Math.sqrt(Math.max(Jr, fr, vr));
      if ($ * ir + q * cr + I * Cn + S < -wn || j * ir + P * cr + A * Cn + T < -wn || R * ir + D * cr + U * Cn + Vn < -wn || O * ir + Zn * cr + kn * Cn + Gn < -wn || X * ir + Y * cr + u * Cn + B < -wn || K * ir + nn * cr + ln * Cn + Mr < -wn) continue;
      e[++s] = sn;
    }
    if (An.light)
      if (An.light.type === 1) {
        const F = An.transform.worldMatrix, Rn = F[12], _ = F[13], en = F[14], Ln = F[0] * F[0] + F[1] * F[1] + F[2] * F[2], ir = F[4] * F[4] + F[5] * F[5] + F[6] * F[6], cr = F[8] * F[8] + F[9] * F[9] + F[10] * F[10], Cn = An.light.range * Math.sqrt(Math.max(Ln, ir, cr));
        if ($ * Rn + q * _ + I * en + S < -Cn || j * Rn + P * _ + A * en + T < -Cn || R * Rn + D * _ + U * en + Vn < -Cn || O * Rn + Zn * _ + kn * en + Gn < -Cn || X * Rn + Y * _ + u * en + B < -Cn || K * Rn + nn * _ + ln * en + Mr < -Cn) continue;
        t[++a] = sn;
      } else
        t[++a] = sn;
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
        const T = j[A], R = j[A + 1], D = j[A + 2], U = S[0] * T + S[4] * R + S[8] * D + S[12], Vn = S[1] * T + S[5] * R + S[9] * D + S[13], O = S[2] * T + S[6] * R + S[10] * D + S[14], Zn = s * U + l * Vn + d * O + y, kn = a * U + h * Vn + o * O + p, Gn = i * U + f * Vn + M * O + z, X = c * U + v * Vn + m * O + w;
        let Y = 0;
        Zn < -X && (Y |= 1), Zn > X && (Y |= 2), kn < -X && (Y |= 4), kn > X && (Y |= 8), Gn < -X && (Y |= 16), Gn > X && (Y |= 32), P &= Y;
      }
      P === 0 && (n[++b] = q);
    } else {
      const j = S[12], P = S[13], A = S[14], T = s * j + l * P + d * A + y, R = a * j + h * P + o * A + p, D = i * j + f * P + M * A + z, U = c * j + v * P + m * A + w;
      T >= -U && T <= U && R >= -U && R <= U && D >= -U && D <= U && (n[++b] = q);
    }
  }
  n[0] = b;
}
let ee = 0;
function F2(n, r, e, t, s, a, i, c, l, h, f, v, d, o, M, m, y, p, z, w, b, g, $) {
  let q = 0, I = 0;
  for (let S = 0; S < r; S++) {
    const x = n[S];
    if (x.constructor !== Kn) continue;
    ++ee;
    const j = x.gameObject.transform.worldMatrix;
    y1(o, v, j), y1(d, f, j);
    const P = o[0], A = o[1], T = o[2], R = o[3], D = o[4], U = o[5], Vn = o[6], O = o[7], Zn = o[8], kn = o[9], Gn = o[10], X = o[11], Y = o[12], u = o[13], B = o[14], K = o[15], nn = x.faces, ln = x.vertices, Mr = x.faceNormals, k = x.vertexNormals;
    q2(M, j);
    const sn = M, An = sn[0], F = sn[1], Rn = sn[2], _ = sn[3], en = sn[4], Ln = sn[5], ir = sn[6], cr = sn[7], Cn = sn[8], Jr = nn.length;
    for (let fr = 0; fr < Jr; fr += 3) {
      const vr = nn[fr], wn = nn[fr + 1], Hn = nn[fr + 2], Tr = vr << 2, Sr = wn << 2, wr = Hn << 2;
      if ($[vr] !== ee) {
        const V = vr * 3, C = ln[V], Q = ln[V + 1], J = ln[V + 2];
        t[Tr] = P * C + D * Q + Zn * J + Y, t[Tr + 1] = A * C + U * Q + kn * J + u, t[Tr + 2] = T * C + Vn * Q + Gn * J + B, t[Tr + 3] = R * C + O * Q + X * J + K, $[vr] = ee, g[vr] = -1;
      }
      if ($[wn] !== ee) {
        const V = wn * 3, C = ln[V], Q = ln[V + 1], J = ln[V + 2];
        t[Sr] = P * C + D * Q + Zn * J + Y, t[Sr + 1] = A * C + U * Q + kn * J + u, t[Sr + 2] = T * C + Vn * Q + Gn * J + B, t[Sr + 3] = R * C + O * Q + X * J + K, $[wn] = ee, g[wn] = -1;
      }
      if ($[Hn] !== ee) {
        const V = Hn * 3, C = ln[V], Q = ln[V + 1], J = ln[V + 2];
        t[wr] = P * C + D * Q + Zn * J + Y, t[wr + 1] = A * C + U * Q + kn * J + u, t[wr + 2] = T * C + Vn * Q + Gn * J + B, t[wr + 3] = R * C + O * Q + X * J + K, $[Hn] = ee, g[Hn] = -1;
      }
      const Br = t[Tr], ae = t[Tr + 1], oe = t[Tr + 2], sr = t[Tr + 3], yr = t[Sr], un = t[Sr + 1], Nn = t[Sr + 2], qn = t[Sr + 3], En = t[wr], ar = t[wr + 1], Sn = t[wr + 2], Mn = t[wr + 3];
      if (Br < -sr && yr < -qn && En < -Mn || Br > sr && yr > qn && En > Mn || ae < -sr && un < -qn && ar < -Mn || ae > sr && un > qn && ar > Mn || oe < -sr && Nn < -qn && Sn < -Mn || oe > sr && Nn > qn && Sn > Mn) continue;
      const Tn = 1 / sr, or = 1 / qn, Qn = 1 / Mn, $n = Br * Tn, er = ae * Tn, tn = yr * or, lr = un * or, Pn = En * Qn, hn = ar * Qn;
      if ((tn - $n) * (hn - er) - (lr - er) * (Pn - $n) > 0) continue;
      const an = vr * 3, yn = wn * 3, bn = Hn * 3;
      s[q] = q, w[q] = S, b[q] = fr;
      const mn = Mr[fr], Z = Mr[fr + 1], W = Mr[fr + 2], vn = mn * An + Z * _ + W * ir, cn = mn * F + Z * en + W * cr, on = mn * Rn + Z * Ln + W * Cn, H = Math.sqrt(vn * vn + cn * cn + on * on), pn = H > 0 ? 1 / H : 0, dn = fr / 3 | 0, Dn = x.faceColors[dn % x.faceColors.length];
      if (i[q] = x.colors[Dn], c[q] = x.shaderType, l[q] = 0, g[vr] === -1) {
        const V = I * 3;
        Ue(
          e,
          an,
          ln[an],
          ln[an + 1],
          ln[an + 2],
          d
        ), p[V] = $n, p[V + 1] = -er, g[vr] = V, I++;
        const C = vr * 3, Q = k[C] * An + k[C + 1] * _ + k[C + 2] * ir, J = k[C] * F + k[C + 1] * en + k[C + 2] * cr, _n = k[C] * Rn + k[C + 1] * Ln + k[C + 2] * Cn, Jn = Math.sqrt(Q * Q + J * J + _n * _n), xn = Jn > 0 ? 1 / Jn : 0;
        y[V] = Q * xn, y[V + 1] = J * xn, y[V + 2] = _n * xn;
      }
      if (z[q * 3] = g[vr], g[wn] === -1) {
        const V = I * 3;
        Ue(
          e,
          yn,
          ln[yn],
          ln[yn + 1],
          ln[yn + 2],
          d
        ), p[V] = tn, p[V + 1] = -lr, g[wn] = V, I++;
        const C = wn * 3, Q = k[C] * An + k[C + 1] * _ + k[C + 2] * ir, J = k[C] * F + k[C + 1] * en + k[C + 2] * cr, _n = k[C] * Rn + k[C + 1] * Ln + k[C + 2] * Cn, Jn = Math.sqrt(Q * Q + J * J + _n * _n), xn = Jn > 0 ? 1 / Jn : 0;
        y[V] = Q * xn, y[V + 1] = J * xn, y[V + 2] = _n * xn;
      }
      if (z[q * 3 + 1] = g[wn], g[Hn] === -1) {
        const V = I * 3;
        Ue(
          e,
          bn,
          ln[bn],
          ln[bn + 1],
          ln[bn + 2],
          d
        ), p[V] = Pn, p[V + 1] = -hn, g[Hn] = V, I++;
        const C = Hn * 3, Q = k[C] * An + k[C + 1] * _ + k[C + 2] * ir, J = k[C] * F + k[C + 1] * en + k[C + 2] * cr, _n = k[C] * Rn + k[C + 1] * Ln + k[C + 2] * Cn, Jn = Math.sqrt(Q * Q + J * J + _n * _n), xn = Jn > 0 ? 1 / Jn : 0;
        y[V] = Q * xn, y[V + 1] = J * xn, y[V + 2] = _n * xn;
      }
      z[q * 3 + 2] = g[Hn];
      const N = q * 9;
      h[N] = e[an], h[N + 1] = e[an + 1];
      const Wn = h[N + 2] = e[an + 2];
      h[N + 3] = e[yn], h[N + 4] = e[yn + 1];
      const mr = h[N + 5] = e[yn + 2];
      h[N + 6] = e[bn], h[N + 7] = e[bn + 1];
      const Yn = h[N + 8] = e[bn + 2];
      a[q] = (Wn + mr + Yn) * 0.33333;
      const nr = q * 3;
      m[nr] = vn * pn, m[nr + 1] = cn * pn, m[nr + 2] = on * pn, q++;
    }
  }
  return q;
}
function I2(n, r, e, t, s, a, i, c, l, h, f, v, d, o, M, m, y, p, z, w, b, g, $, q, I, S, x, j) {
  const P = h * 0.5, A = f * 0.5, T = c + i;
  l && n.clearRect(0, 0, n.canvas.width, n.canvas.height);
  let R = -1, D = -1, U = -1;
  for (let Vn = c; Vn < T; Vn++) {
    const O = t[Vn], Zn = e[O * 3], kn = e[O * 3 + 1], Gn = e[O * 3 + 2], X = r[Zn] * P + P, Y = r[Zn + 1] * A + A, u = r[kn] * P + P, B = r[kn + 1] * A + A, K = r[Gn] * P + P, nn = r[Gn + 1] * A + A, ln = (X + u + K) * 0.33333, Mr = (Y + B + nn) * 0.33333, k = X - ln, sn = Y - Mr, An = Math.abs(k), F = Math.abs(sn), Rn = An > F ? An + 0.4 * F : F + 0.4 * An, _ = Rn > 0 ? Ve / Rn : 0, en = X + k * _, Ln = Y + sn * _, ir = u - ln, cr = B - Mr, Cn = Math.abs(ir), Jr = Math.abs(cr), fr = Cn > Jr ? Cn + 0.4 * Jr : Jr + 0.4 * Cn, vr = fr > 0 ? Ve / fr : 0, wn = u + ir * vr, Hn = B + cr * vr, Tr = K - ln, Sr = nn - Mr, wr = Math.abs(Tr), Br = Math.abs(Sr), ae = wr > Br ? wr + 0.4 * Br : Br + 0.4 * wr, oe = ae > 0 ? Ve / ae : 0, sr = K + Tr * oe, yr = nn + Sr * oe;
    switch (S ? 3 : a[O]) {
      case 0: {
        const un = s[O];
        let Nn = un >>> 16, qn = un >>> 8 & 255, En = un & 255, ar = w >>> 16 & 255, Sn = w >>> 8 & 255, Mn = w & 255;
        const Tn = b[O * 3], or = b[O * 3 + 1], Qn = b[O * 3 + 2], $n = x[0] + 1;
        for (let Z = 1; Z < $n; Z++) {
          const W = j[x[Z]];
          if (W.light.type === 0) {
            const vn = -W.transform.worldMatrix[8], cn = -W.transform.worldMatrix[9], on = -W.transform.worldMatrix[10], H = Tn * vn + or * cn + Qn * on;
            H > 0 && (ar += (W.light.color >>> 16 & 255) * H, Sn += (W.light.color >>> 8 & 255) * H, Mn += (W.light.color & 255) * H);
          }
        }
        ar *= 39215e-7, Sn *= 39215e-7, Mn *= 39215e-7, Nn = Nn * ar | 0, qn = qn * Sn | 0, En = En * Mn | 0, Nn = Nn > 255 ? 255 : Nn, qn = qn > 255 ? 255 : qn, En = En > 255 ? 255 : En;
        const er = d[O];
        let tn = 0;
        if (o === rn.FogType.RADIAL_FAST || o === rn.FogType.RADIAL) {
          const Z = v[O * 9], W = v[O * 9 + 1], vn = v[O * 9 + 2], cn = v[O * 9 + 3], on = v[O * 9 + 4], H = v[O * 9 + 5], pn = v[O * 9 + 6], dn = v[O * 9 + 7], Dn = v[O * 9 + 8], N = (Z + cn + pn) * 0.33333, Wn = (W + on + dn) * 0.33333, mr = (vn + H + Dn) * 0.33333;
          if (o === rn.FogType.RADIAL_FAST) {
            const Yn = m * m, V = 1 / (y * y - Yn);
            tn = (N * N + Wn * Wn + mr * mr - Yn) * V;
          } else
            tn = (Math.sqrt(N * N + Wn * Wn + mr * mr) - m) / (y - m);
        } else o === rn.FogType.LINEAR && (tn = (er - m) / (y - m));
        if (tn > 1 && (tn = 1), tn > 0) {
          const Z = M >>> 16, W = M >>> 8 & 255, vn = M & 255;
          Nn = Nn * (1 - tn) + Z * tn | 0, qn = qn * (1 - tn) + W * tn | 0, En = En * (1 - tn) + vn * tn | 0;
        }
        const lr = $[O], Pn = I[lr], hn = Pn.textureImage;
        if (hn && hn.complete && hn.naturalWidth > 0 && Pn.uvs) {
          const Z = q[O], W = Pn.uvs, vn = Pn.faces[Z] * 2, cn = Pn.faces[Z + 1] * 2, on = Pn.faces[Z + 2] * 2, H = W[vn] * hn.width, pn = W[vn + 1] * hn.height, dn = W[cn] * hn.width, Dn = W[cn + 1] * hn.height, N = W[on] * hn.width, Wn = W[on + 1] * hn.height, mr = H * (Dn - Wn) - pn * (dn - N) + (dn * Wn - N * Dn);
          if (Math.abs(mr) > 1e-5) {
            const Yn = 1 / mr, nr = (X * (Dn - Wn) + u * (Wn - pn) + K * (pn - Dn)) * Yn, V = (X * (N - dn) + u * (H - N) + K * (dn - H)) * Yn, C = (X * (dn * Wn - N * Dn) + u * (N * pn - H * Wn) + K * (H * Dn - dn * pn)) * Yn, Q = (Y * (Dn - Wn) + B * (Wn - pn) + nn * (pn - Dn)) * Yn, J = (Y * (N - dn) + B * (H - N) + nn * (dn - H)) * Yn, _n = (Y * (dn * Wn - N * Dn) + B * (N * pn - H * Wn) + nn * (H * Dn - dn * pn)) * Yn;
            n.save(), n.beginPath(), n.moveTo(en, Ln), n.lineTo(wn, Hn), n.lineTo(sr, yr), n.closePath(), n.clip(), n.setTransform(nr, Q, V, J, C, _n), n.drawImage(hn, 0, 0), n.restore();
            const Jn = ar >= 1 ? 255 : ar * 255 | 0, xn = Sn >= 1 ? 255 : Sn * 255 | 0, Cr = Mn >= 1 ? 255 : Mn * 255 | 0, Er = Jn & 248, Lr = xn & 252, de = Cr & 248, ie = Er << 8 | Lr << 3 | de >> 3;
            if (n.globalCompositeOperation = "multiply", R !== ie && (n.fillStyle = Un[ie], R = ie), n.fill(), n.globalCompositeOperation = "source-over", tn > 0) {
              const Or = M >>> 16, Fr = M >>> 8 & 255, Dr = M & 255, Wr = Or & 248, Kr = Fr & 252, ur = Dr & 248, hr = Wr << 8 | Kr << 3 | ur >> 3;
              n.globalAlpha = tn, D !== hr && (n.strokeStyle = Un[hr], D = hr), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), R !== hr && (n.fillStyle = Un[hr], R = hr), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(X, Y), n.lineTo(u, B), n.lineTo(K, nn), n.closePath();
        const an = Nn & 248, yn = qn & 252, bn = En & 248, mn = an << 8 | yn << 3 | bn >> 3;
        D !== mn && (n.strokeStyle = Un[mn], D = mn), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), R !== mn && (n.fillStyle = Un[mn], R = mn), n.fill();
        break;
      }
      case 1: {
        const un = s[O];
        let Nn = un >>> 16, qn = un >>> 8 & 255, En = un & 255;
        const ar = d[O];
        let Sn = 0;
        if (o === rn.FogType.RADIAL_FAST || o === rn.FogType.RADIAL) {
          const hn = v[O * 9], an = v[O * 9 + 1], yn = v[O * 9 + 2], bn = v[O * 9 + 3], mn = v[O * 9 + 4], Z = v[O * 9 + 5], W = v[O * 9 + 6], vn = v[O * 9 + 7], cn = v[O * 9 + 8], on = (hn + bn + W) * 0.33333, H = (an + mn + vn) * 0.33333, pn = (yn + Z + cn) * 0.33333;
          if (o === rn.FogType.RADIAL_FAST) {
            const dn = m * m, N = 1 / (y * y - dn);
            Sn = (on * on + H * H + pn * pn - dn) * N;
          } else
            Sn = (Math.sqrt(on * on + H * H + pn * pn) - m) / (y - m);
        } else o === rn.FogType.LINEAR && (Sn = (ar - m) / (y - m));
        let Tn = Math.max(0, Sn - 0);
        if (Tn > 1 && (Tn = 1), Tn > 0) {
          const hn = M >>> 16, an = M >>> 8 & 255, yn = M & 255;
          Nn = Nn * (1 - Tn) + hn * Tn | 0, qn = qn * (1 - Tn) + an * Tn | 0, En = En * (1 - Tn) + yn * Tn | 0;
        }
        const or = $[O], Qn = I[or], $n = Qn.textureImage;
        if ($n && $n.complete && $n.naturalWidth > 0 && Qn.uvs) {
          const hn = q[O], an = Qn.uvs, yn = Qn.faces[hn] * 2, bn = Qn.faces[hn + 1] * 2, mn = Qn.faces[hn + 2] * 2, Z = an[yn] * $n.width, W = an[yn + 1] * $n.height, vn = an[bn] * $n.width, cn = an[bn + 1] * $n.height, on = an[mn] * $n.width, H = an[mn + 1] * $n.height, pn = Z * (cn - H) - W * (vn - on) + (vn * H - on * cn);
          if (Math.abs(pn) > 1e-5) {
            const dn = 1 / pn, Dn = (X * (cn - H) + u * (H - W) + K * (W - cn)) * dn, N = (X * (on - vn) + u * (Z - on) + K * (vn - Z)) * dn, Wn = (X * (vn * H - on * cn) + u * (on * W - Z * H) + K * (Z * cn - vn * W)) * dn, mr = (Y * (cn - H) + B * (H - W) + nn * (W - cn)) * dn, Yn = (Y * (on - vn) + B * (Z - on) + nn * (vn - Z)) * dn, nr = (Y * (vn * H - on * cn) + B * (on * W - Z * H) + nn * (Z * cn - vn * W)) * dn;
            if (n.save(), n.beginPath(), n.moveTo(en, Ln), n.lineTo(wn, Hn), n.lineTo(sr, yr), n.closePath(), n.clip(), n.setTransform(Dn, mr, N, Yn, Wn, nr), n.drawImage($n, 0, 0), n.restore(), Tn > 0) {
              const V = M >>> 16, C = M >>> 8 & 255, Q = M & 255, J = V & 248, _n = C & 252, Jn = Q & 248, xn = J << 8 | _n << 3 | Jn >> 3;
              n.globalAlpha = Tn, D !== xn && (n.strokeStyle = Un[xn], D = xn), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), R !== xn && (n.fillStyle = Un[xn], R = xn), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(en, Ln), n.lineTo(wn, Hn), n.lineTo(sr, yr), n.closePath();
        const er = Nn & 248, tn = qn & 252, lr = En & 248, Pn = er << 8 | tn << 3 | lr >> 3;
        R !== Pn && (n.fillStyle = Un[Pn], R = Pn), n.fill();
        break;
      }
      case 2: {
        const un = s[O];
        let Nn = un >>> 16, qn = un >>> 8 & 255, En = un & 255;
        const ar = $[O], Sn = I[ar], Mn = Sn.textureImage;
        if (Mn && Mn.complete && Mn.naturalWidth > 0 && Sn.uvs) {
          const er = q[O], tn = Sn.uvs, lr = Sn.faces[er] * 2, Pn = Sn.faces[er + 1] * 2, hn = Sn.faces[er + 2] * 2, an = tn[lr] * Mn.width, yn = tn[lr + 1] * Mn.height, bn = tn[Pn] * Mn.width, mn = tn[Pn + 1] * Mn.height, Z = tn[hn] * Mn.width, W = tn[hn + 1] * Mn.height, vn = an * (mn - W) - yn * (bn - Z) + (bn * W - Z * mn);
          if (Math.abs(vn) > 1e-5) {
            const cn = 1 / vn, on = (X * (mn - W) + u * (W - yn) + K * (yn - mn)) * cn, H = (X * (Z - bn) + u * (an - Z) + K * (bn - an)) * cn, pn = (X * (bn * W - Z * mn) + u * (Z * yn - an * W) + K * (an * mn - bn * yn)) * cn, dn = (Y * (mn - W) + B * (W - yn) + nn * (yn - mn)) * cn, Dn = (Y * (Z - bn) + B * (an - Z) + nn * (bn - an)) * cn, N = (Y * (bn * W - Z * mn) + B * (Z * yn - an * W) + nn * (an * mn - bn * yn)) * cn;
            n.save(), n.beginPath(), n.moveTo(en, Ln), n.lineTo(wn, Hn), n.lineTo(sr, yr), n.closePath(), n.clip(), n.setTransform(on, dn, H, Dn, pn, N), n.drawImage(Mn, 0, 0), n.restore();
            break;
          }
        }
        n.beginPath(), n.moveTo(en, Ln), n.lineTo(wn, Hn), n.lineTo(sr, yr), n.closePath();
        const Tn = Nn & 248, or = qn & 252, Qn = En & 248, $n = Tn << 8 | or << 3 | Qn >> 3;
        R !== $n && (n.fillStyle = Un[$n], R = $n), n.fill();
        break;
      }
      case 3: {
        n.beginPath(), n.moveTo(X, Y), n.lineTo(u, B), n.lineTo(K, nn), n.closePath(), D !== 31 && (n.strokeStyle = Un[31], D = 31), U !== 5 && (n.lineWidth = 0.5, n.lineJoin = "miter", U = 5), n.stroke();
        break;
      }
      case 4: {
        const un = s[O], Nn = un >>> 16, qn = un >>> 8 & 255, En = un & 255;
        let ar = w >>> 16, Sn = w >>> 8 & 255, Mn = w & 255, Tn = ar, or = Sn, Qn = Mn, $n = ar, er = Sn, tn = Mn, lr = ar, Pn = Sn, hn = Mn, an = g[Zn], yn = g[Zn + 1], bn = g[Zn + 2], mn = g[kn], Z = g[kn + 1], W = g[kn + 2], vn = g[Gn], cn = g[Gn + 1], on = g[Gn + 2];
        const H = x[0] + 1;
        for (let E = 1; E < H; E++) {
          const Bn = j[x[E]];
          if (Bn.light.type === 0) {
            const $r = Bn.light.color >>> 16, br = Bn.light.color >>> 8 & 255, pr = Bn.light.color & 255, On = -Bn.transform.worldMatrix[8], Fn = -Bn.transform.worldMatrix[9], rr = -Bn.transform.worldMatrix[10];
            let Xn = an * On + yn * Fn + bn * rr, In = mn * On + Z * Fn + W * rr, jn = vn * On + cn * Fn + on * rr;
            Xn > 0 && (Tn += $r * Xn, or += br * Xn, Qn += pr * Xn), In > 0 && ($n += $r * In, er += br * In, tn += pr * In), jn > 0 && (lr += $r * jn, Pn += br * jn, hn += pr * jn);
          }
        }
        Tn *= 39215e-7, or *= 39215e-7, Qn *= 39215e-7, $n *= 39215e-7, er *= 39215e-7, tn *= 39215e-7, lr *= 39215e-7, Pn *= 39215e-7, hn *= 39215e-7;
        let pn = Math.min(Math.max(Tn, or, Qn), 1), dn = Math.min(Math.max($n, er, tn), 1), Dn = Math.min(Math.max(lr, Pn, hn), 1), N = 0;
        const Wn = d[O];
        if (o === rn.FogType.RADIAL_FAST || o === rn.FogType.RADIAL) {
          const E = v[O * 9], Bn = v[O * 9 + 1], $r = v[O * 9 + 2], br = v[O * 9 + 3], pr = v[O * 9 + 4], On = v[O * 9 + 5], Fn = v[O * 9 + 6], rr = v[O * 9 + 7], Xn = v[O * 9 + 8], In = (E + br + Fn) * 0.33333, jn = (Bn + pr + rr) * 0.33333, Gr = ($r + On + Xn) * 0.33333;
          if (o === rn.FogType.RADIAL_FAST) {
            const xr = m * m, Pe = 1 / (y * y - xr);
            N = (In * In + jn * jn + Gr * Gr - xr) * Pe;
          } else
            N = (Math.sqrt(In * In + jn * jn + Gr * Gr) - m) / (y - m);
        } else o === rn.FogType.LINEAR && (N = (Wn - m) / (y - m));
        N > 1 && (N = 1);
        const mr = $[O], Yn = I[mr], nr = Yn.textureImage;
        if (nr && nr.complete && nr.naturalWidth > 0 && Yn.uvs) {
          const E = q[O], Bn = Yn.uvs, $r = Yn.faces[E] * 2, br = Yn.faces[E + 1] * 2, pr = Yn.faces[E + 2] * 2, On = Bn[$r] * nr.width, Fn = Bn[$r + 1] * nr.height, rr = Bn[br] * nr.width, Xn = Bn[br + 1] * nr.height, In = Bn[pr] * nr.width, jn = Bn[pr + 1] * nr.height, Gr = On * (Xn - jn) - Fn * (rr - In) + (rr * jn - In * Xn);
          if (Math.abs(Gr) > 1e-5) {
            const xr = 1 / Gr, h1 = (X * (Xn - jn) + u * (jn - Fn) + K * (Fn - Xn)) * xr, Pe = (X * (In - rr) + u * (On - In) + K * (rr - On)) * xr, f1 = (X * (rr * jn - In * Xn) + u * (In * Fn - On * jn) + K * (On * Xn - rr * Fn)) * xr, Ut = (Y * (Xn - jn) + B * (jn - Fn) + nn * (Fn - Xn)) * xr, Vt = (Y * (In - rr) + B * (On - In) + nn * (rr - On)) * xr, Nt = (Y * (rr * jn - In * Xn) + B * (In * Fn - On * jn) + nn * (On * Xn - rr * Fn)) * xr;
            n.save(), n.beginPath(), n.moveTo(en, Ln), n.lineTo(wn, Hn), n.lineTo(sr, yr), n.closePath(), n.clip(), n.setTransform(h1, Ut, Pe, Vt, f1, Nt), n.drawImage(nr, 0, 0), n.restore();
            const Yt = Tn >= 1 ? 255 : Tn * 255 | 0, Xt = or >= 1 ? 255 : or * 255 | 0, Zt = Qn >= 1 ? 255 : Qn * 255 | 0, Gt = $n >= 1 ? 255 : $n * 255 | 0, Ht = er >= 1 ? 255 : er * 255 | 0, Qt = tn >= 1 ? 255 : tn * 255 | 0, Jt = lr >= 1 ? 255 : lr * 255 | 0, Bt = Pn >= 1 ? 255 : Pn * 255 | 0, Kt = hn >= 1 ? 255 : hn * 255 | 0, ut = (Yt & 248) << 8 | (Xt & 252) << 3 | (Zt & 248) >> 3, n0 = (Gt & 248) << 8 | (Ht & 252) << 3 | (Qt & 248) >> 3, r0 = (Jt & 248) << 8 | (Bt & 252) << 3 | (Kt & 248) >> 3;
            let Ur = X, Vr = Y, ne = u, re = B, ye = K, me = nn, Nr = pn, _r = dn, pe = Dn, Yr = ut, Hr = n0, ge = r0;
            if (Nr > _r) {
              let fn;
              fn = Ur, Ur = ne, ne = fn, fn = Vr, Vr = re, re = fn, fn = Nr, Nr = _r, _r = fn, fn = Yr, Yr = Hr, Hr = fn;
            }
            if (_r > pe) {
              let fn;
              fn = ne, ne = ye, ye = fn, fn = re, re = me, me = fn, fn = _r, _r = pe, pe = fn, fn = Hr, Hr = ge, ge = fn;
            }
            if (Nr > _r) {
              let fn;
              fn = Ur, Ur = ne, ne = fn, fn = Vr, Vr = re, re = fn, fn = Nr, Nr = _r, _r = fn, fn = Yr, Yr = Hr, Hr = fn;
            }
            if (n.globalCompositeOperation = "multiply", pe - Nr < 0.01 || Yr === Hr && Hr === ge)
              R !== Yr && (n.fillStyle = Un[Yr], R = Yr), n.beginPath(), n.moveTo(en, Ln), n.lineTo(wn, Hn), n.lineTo(sr, yr), n.closePath(), n.fill();
            else {
              const fn = (_r - Nr) / (pe - Nr), _e = Ur + fn * (ye - Ur), ke = Vr + fn * (me - Vr), Ce = ne - _e, le = -(re - ke), jr = Ce, o1 = le * le + jr * jr;
              let Ee, De;
              if (o1 < 1e-6)
                Ee = ye, De = me;
              else {
                const d1 = ((ye - Ur) * le + (me - Vr) * jr) / o1;
                Ee = Ur + d1 * le, De = Vr + d1 * jr;
              }
              const We = n.createLinearGradient(Ur, Vr, Ee, De);
              We.addColorStop(0, Un[Yr]), We.addColorStop(1, Un[ge]), R = -1, n.fillStyle = We, n.beginPath(), n.moveTo(en, Ln), n.lineTo(wn, Hn), n.lineTo(sr, yr), n.closePath(), n.fill();
            }
            if (n.globalCompositeOperation = "source-over", N > 0) {
              const fn = M >>> 16, _e = M >>> 8 & 255, ke = M & 255, Ce = fn & 248, v1 = _e & 252, le = ke & 248, jr = Ce << 8 | v1 << 3 | le >> 3;
              n.globalAlpha = N, D !== jr && (n.strokeStyle = Un[jr], D = jr), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), R !== jr && (n.fillStyle = Un[jr], R = jr), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        let V = Nn * Tn, C = qn * or, Q = En * Qn, J = Nn * $n, _n = qn * er, Jn = En * tn, xn = Nn * lr, Cr = qn * Pn, Er = En * hn;
        if (V = V > 255 ? 255 : V, C = C > 255 ? 255 : C, Q = Q > 255 ? 255 : Q, J = J > 255 ? 255 : J, _n = _n > 255 ? 255 : _n, Jn = Jn > 255 ? 255 : Jn, xn = xn > 255 ? 255 : xn, Cr = Cr > 255 ? 255 : Cr, Er = Er > 255 ? 255 : Er, N > 0) {
          const E = 1 - N, Bn = M >>> 16, $r = M >>> 8 & 255, br = M & 255, pr = Bn * N, On = $r * N, Fn = br * N;
          V = V * E + pr | 0, C = C * E + On | 0, Q = Q * E + Fn | 0, J = J * E + pr | 0, _n = _n * E + On | 0, Jn = Jn * E + Fn | 0, xn = xn * E + pr | 0, Cr = Cr * E + On | 0, Er = Er * E + Fn | 0;
        } else
          V |= 0, C |= 0, Q |= 0, J |= 0, _n |= 0, Jn |= 0, xn |= 0, Cr |= 0, Er |= 0;
        const Lr = (V & 248) << 8 | (C & 252) << 3 | (Q & 248) >> 3, de = (J & 248) << 8 | (_n & 252) << 3 | (Jn & 248) >> 3, ie = (xn & 248) << 8 | (Cr & 252) << 3 | (Er & 248) >> 3;
        if (Lr === de && de === ie) {
          n.beginPath(), n.moveTo(X, Y), n.lineTo(u, B), n.lineTo(K, nn), n.closePath(), R !== Lr && (n.fillStyle = Un[Lr], R = Lr), D !== Lr && (n.strokeStyle = Un[Lr], D = Lr), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), n.fill();
          break;
        }
        let Or = X, Fr = Y, Dr = u, Wr = B, Kr = K, ur = nn, hr = pn, Pr = dn, Me = Dn, Ir = Lr, ce = de, Le = ie;
        if (hr > Pr) {
          let E;
          E = Or, Or = Dr, Dr = E, E = Fr, Fr = Wr, Wr = E, E = hr, hr = Pr, Pr = E, E = Ir, Ir = ce, ce = E;
        }
        if (Pr > Me) {
          let E;
          E = Dr, Dr = Kr, Kr = E, E = Wr, Wr = ur, ur = E, E = Pr, Pr = Me, Me = E, E = ce, ce = Le, Le = E;
        }
        if (hr > Pr) {
          let E;
          E = Or, Or = Dr, Dr = E, E = Fr, Fr = Wr, Wr = E, E = hr, hr = Pr, Pr = E, E = Ir, Ir = ce, ce = E;
        }
        if (Me - hr < 0.01)
          n.beginPath(), n.moveTo(X, Y), n.lineTo(u, B), n.lineTo(K, nn), n.closePath(), R !== Ir && (n.fillStyle = Un[Ir], R = Ir), D !== Ir && (n.strokeStyle = Un[Ir], D = Ir), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), n.fill();
        else {
          const E = (Pr - hr) / (Me - hr), Bn = Or + E * (Kr - Or), $r = Fr + E * (ur - Fr), br = Dr - Bn, On = -(Wr - $r), Fn = br, rr = On * On + Fn * Fn;
          let Xn, In;
          if (rr < 1e-6)
            Xn = Kr, In = ur;
          else {
            const xr = ((Kr - Or) * On + (ur - Fr) * Fn) / rr;
            Xn = Or + xr * On, In = Fr + xr * Fn;
          }
          const jn = n.createLinearGradient(Or, Fr, Xn, In);
          jn.addColorStop(0, Un[Ir]), jn.addColorStop(1, Un[Le]), R = -1, n.fillStyle = jn, n.beginPath(), n.moveTo(en, Ln), n.lineTo(wn, Hn), n.lineTo(sr, yr), n.closePath(), n.fill();
        }
        break;
      }
    }
  }
}
const m1 = Oe;
function Wt(n, r) {
  this.canvas = r || document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new Dt(), this.camera = n, this.scale = 1, this.layers = [];
  for (var e = 0; e < he.layersCount; e++) {
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
var qr = Wt.prototype;
qr.size = null;
qr.scale = 1;
qr.width = null;
qr.height = null;
qr.viewportMatrix = null;
qr.camera = null;
qr.canvas = null;
qr.context = null;
qr.start = function() {
  this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight), this.startRenderLoop();
};
qr.render = function() {
  this.camera !== null && this.renderer.render(this.camera.gameObject, this, this.lastRenderStats);
};
qr.setSize = function(n, r) {
  const e = n * this.scale, t = r * this.scale;
  this.width = e, this.height = t, this.canvas.width = e, this.canvas.height = t, this.viewportMatrix[0] = e / 2, this.viewportMatrix[5] = -t / 2, this.viewportMatrix[12] = e / 2, this.viewportMatrix[13] = t / 2;
  for (var s = 0; s < this.layers.length; s++) {
    var a = this.layers[s];
    a.canvas.width = e, a.canvas.height = t;
  }
  this.camera.setup(n, r);
};
qr.getWorldToScreen = function() {
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
fe.Type = {
  DIRECTIONAL: 0,
  POINT: 1,
  SPOT: 2
};
function Qr() {
  gn.call(this);
}
Qr.prototype = Object.create(gn.prototype);
Qr.prototype.constructor = Qr;
Qr.prototype.color = 16777215;
Qr.prototype.range = 10;
Qr.prototype.type = fe.Type.DIRECTIONAL;
Qr.prototype.setGameObject = function(n) {
  gn.prototype.setGameObject.call(this, n), n.light = this;
};
function fe(n) {
  dr.call(this, n || "light"), this.addComponent(this.light = new Qr());
}
fe.prototype = Object.create(dr.prototype);
fe.prototype.constructor = fe;
const R2 = window.scaliaEngine = {
  config: he,
  Game: w1,
  GameObject: dr,
  Component: gn,
  Camera: _t,
  CameraComponent: rn,
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
  Light: fe,
  Canvas2dViewport: Wt
};
export {
  R2 as default
};
