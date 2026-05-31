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
function yn() {
}
var Se = yn.prototype;
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
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], o = r[9], M = r[10], d = r[11], m = r[12], y = r[13], p = r[14], z = r[15], w = e[0], x = e[1], b = e[2], g = e[3];
  return n[0] = w * t + x * c + b * v + g * m, n[1] = w * s + x * l + b * o + g * y, n[2] = w * a + x * h + b * M + g * p, n[3] = w * i + x * f + b * d + g * z, w = e[4], x = e[5], b = e[6], g = e[7], n[4] = w * t + x * c + b * v + g * m, n[5] = w * s + x * l + b * o + g * y, n[6] = w * a + x * h + b * M + g * p, n[7] = w * i + x * f + b * d + g * z, w = e[8], x = e[9], b = e[10], g = e[11], n[8] = w * t + x * c + b * v + g * m, n[9] = w * s + x * l + b * o + g * y, n[10] = w * a + x * h + b * M + g * p, n[11] = w * i + x * f + b * d + g * z, w = e[12], x = e[13], b = e[14], g = e[15], n[12] = w * t + x * c + b * v + g * m, n[13] = w * s + x * l + b * o + g * y, n[14] = w * a + x * h + b * M + g * p, n[15] = w * i + x * f + b * d + g * z, n;
}
var P = 1e-6, H = typeof Float32Array < "u" ? Float32Array : Array, Rr = Math.random, $1 = "zyx";
function Er(n) {
  return n >= 0 ? Math.round(n) : n % 0.5 === 0 ? Math.floor(n) : Math.round(n);
}
function s0(n) {
  H = n;
}
var a0 = Math.PI / 180, i0 = 180 / Math.PI;
function c0(n) {
  return n * a0;
}
function l0(n) {
  return n * i0;
}
function h0(n, r) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : P;
  return Math.abs(n - r) <= e * Math.max(1, Math.abs(n), Math.abs(r));
}
const f0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: $1,
  get ARRAY_TYPE() {
    return H;
  },
  EPSILON: P,
  RANDOM: Rr,
  equals: h0,
  round: Er,
  setMatrixArrayType: s0,
  toDegree: l0,
  toRadian: c0
}, Symbol.toStringTag, { value: "Module" }));
function v0() {
  var n = new H(4);
  return H != Float32Array && (n[1] = 0, n[2] = 0), n[0] = 1, n[3] = 1, n;
}
function o0(n) {
  var r = new H(4);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function M0(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n;
}
function d0(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function y0(n, r, e, t) {
  var s = new H(4);
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
  return Math.abs(e - i) <= P * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(t - c) <= P * Math.max(1, Math.abs(t), Math.abs(c)) && Math.abs(s - l) <= P * Math.max(1, Math.abs(s), Math.abs(l)) && Math.abs(a - h) <= P * Math.max(1, Math.abs(a), Math.abs(h));
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
  copy: M0,
  create: v0,
  determinant: w0,
  equals: I0,
  exactEquals: F0,
  frob: T0,
  fromRotation: z0,
  fromScaling: A0,
  fromValues: y0,
  identity: d0,
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
  var n = new H(6);
  return H != Float32Array && (n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0), n[0] = 1, n[3] = 1, n;
}
function E0(n) {
  var r = new H(6);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r;
}
function D0(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n;
}
function W0(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function C0(n, r, e, t, s, a) {
  var i = new H(6);
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
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = e[0], f = e[1], v = e[2], o = e[3], M = e[4], d = e[5];
  return n[0] = t * h + a * f, n[1] = s * h + i * f, n[2] = t * v + a * o, n[3] = s * v + i * o, n[4] = t * M + a * d + c, n[5] = s * M + i * d + l, n;
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
function B0(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = r[1], n[4] = 0, n[5] = 0, n;
}
function H0(n, r) {
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
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = r[0], h = r[1], f = r[2], v = r[3], o = r[4], M = r[5];
  return Math.abs(e - l) <= P * Math.max(1, Math.abs(e), Math.abs(l)) && Math.abs(t - h) <= P * Math.max(1, Math.abs(t), Math.abs(h)) && Math.abs(s - f) <= P * Math.max(1, Math.abs(s), Math.abs(f)) && Math.abs(a - v) <= P * Math.max(1, Math.abs(a), Math.abs(v)) && Math.abs(i - o) <= P * Math.max(1, Math.abs(i), Math.abs(o)) && Math.abs(c - M) <= P * Math.max(1, Math.abs(c), Math.abs(M));
}
var ts = A1, ss = q1;
const as = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: K0,
  clone: E0,
  copy: D0,
  create: k0,
  determinant: N0,
  equals: es,
  exactEquals: rs,
  frob: J0,
  fromRotation: G0,
  fromScaling: B0,
  fromTranslation: H0,
  fromValues: C0,
  identity: W0,
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
  var n = new H(9);
  return H != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[0] = 1, n[4] = 1, n[8] = 1, n;
}
function is(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[4], n[4] = r[5], n[5] = r[6], n[6] = r[8], n[7] = r[9], n[8] = r[10], n;
}
function cs(n) {
  var r = new H(9);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r;
}
function ls(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n;
}
function hs(n, r, e, t, s, a, i, c, l) {
  var h = new H(9);
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
function Ms(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = f * i - c * h, o = -f * a + c * l, M = h * a - i * l, d = e * v + t * o + s * M;
  return d ? (d = 1 / d, n[0] = v * d, n[1] = (-f * t + s * h) * d, n[2] = (c * t - s * i) * d, n[3] = o * d, n[4] = (f * e - s * l) * d, n[5] = (-c * e + s * a) * d, n[6] = M * d, n[7] = (-h * e + t * l) * d, n[8] = (i * e - t * a) * d, n) : null;
}
function ds(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8];
  return n[0] = i * f - c * h, n[1] = s * h - t * f, n[2] = t * c - s * i, n[3] = c * l - a * f, n[4] = e * f - s * l, n[5] = s * a - e * c, n[6] = a * h - i * l, n[7] = t * l - e * h, n[8] = e * i - t * a, n;
}
function ys(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3], a = n[4], i = n[5], c = n[6], l = n[7], h = n[8];
  return r * (h * a - i * l) + e * (-h * s + i * c) + t * (l * s - a * c);
}
function S1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], o = e[0], M = e[1], d = e[2], m = e[3], y = e[4], p = e[5], z = e[6], w = e[7], x = e[8];
  return n[0] = o * t + M * i + d * h, n[1] = o * s + M * c + d * f, n[2] = o * a + M * l + d * v, n[3] = m * t + y * i + p * h, n[4] = m * s + y * c + p * f, n[5] = m * a + y * l + p * v, n[6] = z * t + w * i + x * h, n[7] = z * s + w * c + x * f, n[8] = z * a + w * l + x * v, n;
}
function ms(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], o = e[0], M = e[1];
  return n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = c, n[5] = l, n[6] = o * t + M * i + h, n[7] = o * s + M * c + f, n[8] = o * a + M * l + v, n;
}
function ps(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], o = Math.sin(e), M = Math.cos(e);
  return n[0] = M * t + o * i, n[1] = M * s + o * c, n[2] = M * a + o * l, n[3] = M * i - o * t, n[4] = M * c - o * s, n[5] = M * l - o * a, n[6] = h, n[7] = f, n[8] = v, n;
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
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e + e, c = t + t, l = s + s, h = e * i, f = t * i, v = t * c, o = s * i, M = s * c, d = s * l, m = a * i, y = a * c, p = a * l;
  return n[0] = 1 - v - d, n[3] = f - p, n[6] = o + y, n[1] = f + p, n[4] = 1 - h - d, n[7] = M - m, n[2] = o - y, n[5] = M + m, n[8] = 1 - h - v, n;
}
function As(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], o = r[10], M = r[11], d = r[12], m = r[13], y = r[14], p = r[15], z = e * c - t * i, w = e * l - s * i, x = e * h - a * i, b = t * l - s * c, g = t * h - a * c, j = s * h - a * l, R = f * m - v * d, A = f * y - o * d, $ = f * p - M * d, L = v * y - o * m, F = v * p - M * m, q = o * p - M * y, O = z * q - w * F + x * L + b * $ - g * A + j * R;
  return O ? (O = 1 / O, n[0] = (c * q - l * F + h * L) * O, n[1] = (l * $ - i * q - h * A) * O, n[2] = (i * F - c * $ + h * R) * O, n[3] = (s * F - t * q - a * L) * O, n[4] = (e * q - s * $ + a * A) * O, n[5] = (t * $ - e * F - a * R) * O, n[6] = (m * j - y * g + p * b) * O, n[7] = (y * x - d * j - p * w) * O, n[8] = (d * g - m * x + p * z) * O, n) : null;
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
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = r[0], o = r[1], M = r[2], d = r[3], m = r[4], y = r[5], p = r[6], z = r[7], w = r[8];
  return Math.abs(e - v) <= P * Math.max(1, Math.abs(e), Math.abs(v)) && Math.abs(t - o) <= P * Math.max(1, Math.abs(t), Math.abs(o)) && Math.abs(s - M) <= P * Math.max(1, Math.abs(s), Math.abs(M)) && Math.abs(a - d) <= P * Math.max(1, Math.abs(a), Math.abs(d)) && Math.abs(i - m) <= P * Math.max(1, Math.abs(i), Math.abs(m)) && Math.abs(c - y) <= P * Math.max(1, Math.abs(c), Math.abs(y)) && Math.abs(l - p) <= P * Math.max(1, Math.abs(l), Math.abs(p)) && Math.abs(h - z) <= P * Math.max(1, Math.abs(h), Math.abs(z)) && Math.abs(f - w) <= P * Math.max(1, Math.abs(f), Math.abs(w));
}
var Ls = S1, Ps = O1;
const _s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Os,
  adjoint: ds,
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
  invert: Ms,
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
  var n = new H(16);
  return H != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0), n[0] = 1, n[5] = 1, n[10] = 1, n[15] = 1, n;
}
function Es(n) {
  var r = new H(16);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r[9] = n[9], r[10] = n[10], r[11] = n[11], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15], r;
}
function Ds(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n[9] = r[9], n[10] = r[10], n[11] = r[11], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], n;
}
function Ws(n, r, e, t, s, a, i, c, l, h, f, v, o, M, d, m) {
  var y = new H(16);
  return y[0] = n, y[1] = r, y[2] = e, y[3] = t, y[4] = s, y[5] = a, y[6] = i, y[7] = c, y[8] = l, y[9] = h, y[10] = f, y[11] = v, y[12] = o, y[13] = M, y[14] = d, y[15] = m, y;
}
function Cs(n, r, e, t, s, a, i, c, l, h, f, v, o, M, d, m, y) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n[6] = c, n[7] = l, n[8] = h, n[9] = f, n[10] = v, n[11] = o, n[12] = M, n[13] = d, n[14] = m, n[15] = y, n;
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
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], o = r[10], M = r[11], d = r[12], m = r[13], y = r[14], p = r[15], z = e * c - t * i, w = e * l - s * i, x = e * h - a * i, b = t * l - s * c, g = t * h - a * c, j = s * h - a * l, R = f * m - v * d, A = f * y - o * d, $ = f * p - M * d, L = v * y - o * m, F = v * p - M * m, q = o * p - M * y, O = z * q - w * F + x * L + b * $ - g * A + j * R;
  return O ? (O = 1 / O, n[0] = (c * q - l * F + h * L) * O, n[1] = (s * F - t * q - a * L) * O, n[2] = (m * j - y * g + p * b) * O, n[3] = (o * g - v * j - M * b) * O, n[4] = (l * $ - i * q - h * A) * O, n[5] = (e * q - s * $ + a * A) * O, n[6] = (y * x - d * j - p * w) * O, n[7] = (f * j - o * x + M * w) * O, n[8] = (i * F - c * $ + h * R) * O, n[9] = (t * $ - e * F - a * R) * O, n[10] = (d * g - m * x + p * z) * O, n[11] = (v * x - f * g - M * z) * O, n[12] = (c * A - i * L - l * R) * O, n[13] = (e * L - t * A + s * R) * O, n[14] = (m * w - d * b - y * z) * O, n[15] = (f * b - v * w + o * z) * O, n) : null;
}
function Vs(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], o = r[10], M = r[11], d = r[12], m = r[13], y = r[14], p = r[15], z = e * c - t * i, w = e * l - s * i, x = e * h - a * i, b = t * l - s * c, g = t * h - a * c, j = s * h - a * l, R = f * m - v * d, A = f * y - o * d, $ = f * p - M * d, L = v * y - o * m, F = v * p - M * m, q = o * p - M * y;
  return n[0] = c * q - l * F + h * L, n[1] = s * F - t * q - a * L, n[2] = m * j - y * g + p * b, n[3] = o * g - v * j - M * b, n[4] = l * $ - i * q - h * A, n[5] = e * q - s * $ + a * A, n[6] = y * x - d * j - p * w, n[7] = f * j - o * x + M * w, n[8] = i * F - c * $ + h * R, n[9] = t * $ - e * F - a * R, n[10] = d * g - m * x + p * z, n[11] = v * x - f * g - M * z, n[12] = c * A - i * L - l * R, n[13] = e * L - t * A + s * R, n[14] = m * w - d * b - y * z, n[15] = f * b - v * w + o * z, n;
}
function Ns(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3], a = n[4], i = n[5], c = n[6], l = n[7], h = n[8], f = n[9], v = n[10], o = n[11], M = n[12], d = n[13], m = n[14], y = n[15], p = r * i - e * a, z = r * c - t * a, w = e * c - t * i, x = h * d - f * M, b = h * m - v * M, g = f * m - v * d, j = r * g - e * b + t * x, R = a * g - i * b + c * x, A = h * w - f * z + v * p, $ = M * w - d * z + m * p;
  return l * j - s * R + y * A - o * $;
}
function I1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], o = r[9], M = r[10], d = r[11], m = r[12], y = r[13], p = r[14], z = r[15], w = e[0], x = e[1], b = e[2], g = e[3];
  return n[0] = w * t + x * c + b * v + g * m, n[1] = w * s + x * l + b * o + g * y, n[2] = w * a + x * h + b * M + g * p, n[3] = w * i + x * f + b * d + g * z, w = e[4], x = e[5], b = e[6], g = e[7], n[4] = w * t + x * c + b * v + g * m, n[5] = w * s + x * l + b * o + g * y, n[6] = w * a + x * h + b * M + g * p, n[7] = w * i + x * f + b * d + g * z, w = e[8], x = e[9], b = e[10], g = e[11], n[8] = w * t + x * c + b * v + g * m, n[9] = w * s + x * l + b * o + g * y, n[10] = w * a + x * h + b * M + g * p, n[11] = w * i + x * f + b * d + g * z, w = e[12], x = e[13], b = e[14], g = e[15], n[12] = w * t + x * c + b * v + g * m, n[13] = w * s + x * l + b * o + g * y, n[14] = w * a + x * h + b * M + g * p, n[15] = w * i + x * f + b * d + g * z, n;
}
function Ne(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i, c, l, h, f, v, o, M, d, m, y, p;
  return r === n ? (n[12] = r[0] * t + r[4] * s + r[8] * a + r[12], n[13] = r[1] * t + r[5] * s + r[9] * a + r[13], n[14] = r[2] * t + r[6] * s + r[10] * a + r[14], n[15] = r[3] * t + r[7] * s + r[11] * a + r[15]) : (i = r[0], c = r[1], l = r[2], h = r[3], f = r[4], v = r[5], o = r[6], M = r[7], d = r[8], m = r[9], y = r[10], p = r[11], n[0] = i, n[1] = c, n[2] = l, n[3] = h, n[4] = f, n[5] = v, n[6] = o, n[7] = M, n[8] = d, n[9] = m, n[10] = y, n[11] = p, n[12] = i * t + f * s + d * a + r[12], n[13] = c * t + v * s + m * a + r[13], n[14] = l * t + o * s + y * a + r[14], n[15] = h * t + M * s + p * a + r[15]), n;
}
function j1(n, r, e) {
  var t = e[0], s = e[1], a = e[2];
  return n[0] = r[0] * t, n[1] = r[1] * t, n[2] = r[2] * t, n[3] = r[3] * t, n[4] = r[4] * s, n[5] = r[5] * s, n[6] = r[6] * s, n[7] = r[7] * s, n[8] = r[8] * a, n[9] = r[9] * a, n[10] = r[10] * a, n[11] = r[11] * a, n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], n;
}
function Ys(n, r, e, t) {
  var s = t[0], a = t[1], i = t[2], c = Math.sqrt(s * s + a * a + i * i), l, h, f, v, o, M, d, m, y, p, z, w, x, b, g, j, R, A, $, L, F, q, O, T;
  return c < P ? null : (c = 1 / c, s *= c, a *= c, i *= c, l = Math.sin(e), h = Math.cos(e), f = 1 - h, v = r[0], o = r[1], M = r[2], d = r[3], m = r[4], y = r[5], p = r[6], z = r[7], w = r[8], x = r[9], b = r[10], g = r[11], j = s * s * f + h, R = a * s * f + i * l, A = i * s * f - a * l, $ = s * a * f - i * l, L = a * a * f + h, F = i * a * f + s * l, q = s * i * f + a * l, O = a * i * f - s * l, T = i * i * f + h, n[0] = v * j + m * R + w * A, n[1] = o * j + y * R + x * A, n[2] = M * j + p * R + b * A, n[3] = d * j + z * R + g * A, n[4] = v * $ + m * L + w * F, n[5] = o * $ + y * L + x * F, n[6] = M * $ + p * L + b * F, n[7] = d * $ + z * L + g * F, n[8] = v * q + m * O + w * T, n[9] = o * q + y * O + x * T, n[10] = M * q + p * O + b * T, n[11] = d * q + z * O + g * T, r !== n && (n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n);
}
function Xs(n, r, e) {
  var t = Math.sin(e), s = Math.cos(e), a = r[4], i = r[5], c = r[6], l = r[7], h = r[8], f = r[9], v = r[10], o = r[11];
  return r !== n && (n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n[4] = a * s + h * t, n[5] = i * s + f * t, n[6] = c * s + v * t, n[7] = l * s + o * t, n[8] = h * s - a * t, n[9] = f * s - i * t, n[10] = v * s - c * t, n[11] = o * s - l * t, n;
}
function Zs(n, r, e) {
  var t = Math.sin(e), s = Math.cos(e), a = r[0], i = r[1], c = r[2], l = r[3], h = r[8], f = r[9], v = r[10], o = r[11];
  return r !== n && (n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n[0] = a * s - h * t, n[1] = i * s - f * t, n[2] = c * s - v * t, n[3] = l * s - o * t, n[8] = a * t + h * s, n[9] = i * t + f * s, n[10] = c * t + v * s, n[11] = l * t + o * s, n;
}
function Gs(n, r, e) {
  var t = Math.sin(e), s = Math.cos(e), a = r[0], i = r[1], c = r[2], l = r[3], h = r[4], f = r[5], v = r[6], o = r[7];
  return r !== n && (n[8] = r[8], n[9] = r[9], n[10] = r[10], n[11] = r[11], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n[0] = a * s + h * t, n[1] = i * s + f * t, n[2] = c * s + v * t, n[3] = l * s + o * t, n[4] = h * s - a * t, n[5] = f * s - i * t, n[6] = v * s - c * t, n[7] = o * s - l * t, n;
}
function Bs(n, r) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = r[0], n[13] = r[1], n[14] = r[2], n[15] = 1, n;
}
function Hs(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = r[1], n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = r[2], n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function Qs(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = Math.sqrt(t * t + s * s + a * a), c, l, h;
  return i < P ? null : (i = 1 / i, t *= i, s *= i, a *= i, c = Math.sin(r), l = Math.cos(r), h = 1 - l, n[0] = t * t * h + l, n[1] = s * t * h + a * c, n[2] = a * t * h - s * c, n[3] = 0, n[4] = t * s * h - a * c, n[5] = s * s * h + l, n[6] = a * s * h + t * c, n[7] = 0, n[8] = t * a * h + s * c, n[9] = s * a * h - t * c, n[10] = a * a * h + l, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n);
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
  var t = r[0], s = r[1], a = r[2], i = r[3], c = t + t, l = s + s, h = a + a, f = t * c, v = t * l, o = t * h, M = s * l, d = s * h, m = a * h, y = i * c, p = i * l, z = i * h;
  return n[0] = 1 - (M + m), n[1] = v + z, n[2] = o - p, n[3] = 0, n[4] = v - z, n[5] = 1 - (f + m), n[6] = d + y, n[7] = 0, n[8] = o + p, n[9] = d - y, n[10] = 1 - (f + M), n[11] = 0, n[12] = e[0], n[13] = e[1], n[14] = e[2], n[15] = 1, n;
}
function na(n, r) {
  var e = new H(3), t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = t * t + s * s + a * a + i * i;
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
  var e = new H(3);
  P1(e, r);
  var t = 1 / e[0], s = 1 / e[1], a = 1 / e[2], i = r[0] * t, c = r[1] * s, l = r[2] * a, h = r[4] * t, f = r[5] * s, v = r[6] * a, o = r[8] * t, M = r[9] * s, d = r[10] * a, m = i + f + d, y = 0;
  return m > 0 ? (y = Math.sqrt(m + 1) * 2, n[3] = 0.25 * y, n[0] = (v - M) / y, n[1] = (o - l) / y, n[2] = (c - h) / y) : i > f && i > d ? (y = Math.sqrt(1 + i - f - d) * 2, n[3] = (v - M) / y, n[0] = 0.25 * y, n[1] = (c + h) / y, n[2] = (o + l) / y) : f > d ? (y = Math.sqrt(1 + f - i - d) * 2, n[3] = (o - l) / y, n[0] = (c + h) / y, n[1] = 0.25 * y, n[2] = (v + M) / y) : (y = Math.sqrt(1 + d - i - f) * 2, n[3] = (c - h) / y, n[0] = (o + l) / y, n[1] = (v + M) / y, n[2] = 0.25 * y), n;
}
function ra(n, r, e, t) {
  r[0] = t[12], r[1] = t[13], r[2] = t[14];
  var s = t[0], a = t[1], i = t[2], c = t[4], l = t[5], h = t[6], f = t[8], v = t[9], o = t[10];
  e[0] = Math.sqrt(s * s + a * a + i * i), e[1] = Math.sqrt(c * c + l * l + h * h), e[2] = Math.sqrt(f * f + v * v + o * o);
  var M = 1 / e[0], d = 1 / e[1], m = 1 / e[2], y = s * M, p = a * d, z = i * m, w = c * M, x = l * d, b = h * m, g = f * M, j = v * d, R = o * m, A = y + x + R, $ = 0;
  return A > 0 ? ($ = Math.sqrt(A + 1) * 2, n[3] = 0.25 * $, n[0] = (b - j) / $, n[1] = (g - z) / $, n[2] = (p - w) / $) : y > x && y > R ? ($ = Math.sqrt(1 + y - x - R) * 2, n[3] = (b - j) / $, n[0] = 0.25 * $, n[1] = (p + w) / $, n[2] = (g + z) / $) : x > R ? ($ = Math.sqrt(1 + x - y - R) * 2, n[3] = (g - z) / $, n[0] = (p + w) / $, n[1] = 0.25 * $, n[2] = (b + j) / $) : ($ = Math.sqrt(1 + R - y - x) * 2, n[3] = (p - w) / $, n[0] = (g + z) / $, n[1] = (b + j) / $, n[2] = 0.25 * $), n;
}
function ea(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = r[3], l = s + s, h = a + a, f = i + i, v = s * l, o = s * h, M = s * f, d = a * h, m = a * f, y = i * f, p = c * l, z = c * h, w = c * f, x = t[0], b = t[1], g = t[2];
  return n[0] = (1 - (d + y)) * x, n[1] = (o + w) * x, n[2] = (M - z) * x, n[3] = 0, n[4] = (o - w) * b, n[5] = (1 - (v + y)) * b, n[6] = (m + p) * b, n[7] = 0, n[8] = (M + z) * g, n[9] = (m - p) * g, n[10] = (1 - (v + d)) * g, n[11] = 0, n[12] = e[0], n[13] = e[1], n[14] = e[2], n[15] = 1, n;
}
function ta(n, r, e, t, s) {
  var a = r[0], i = r[1], c = r[2], l = r[3], h = a + a, f = i + i, v = c + c, o = a * h, M = a * f, d = a * v, m = i * f, y = i * v, p = c * v, z = l * h, w = l * f, x = l * v, b = t[0], g = t[1], j = t[2], R = s[0], A = s[1], $ = s[2], L = (1 - (m + p)) * b, F = (M + x) * b, q = (d - w) * b, O = (M - x) * g, T = (1 - (o + p)) * g, Z = (y + z) * g, V = (d + w) * j, Cn = (y - z) * j, S = (1 - (o + m)) * j;
  return n[0] = L, n[1] = F, n[2] = q, n[3] = 0, n[4] = O, n[5] = T, n[6] = Z, n[7] = 0, n[8] = V, n[9] = Cn, n[10] = S, n[11] = 0, n[12] = e[0] + R - (L * R + O * A + V * $), n[13] = e[1] + A - (F * R + T * A + Cn * $), n[14] = e[2] + $ - (q * R + Z * A + S * $), n[15] = 1, n;
}
function sa(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e + e, c = t + t, l = s + s, h = e * i, f = t * i, v = t * c, o = s * i, M = s * c, d = s * l, m = a * i, y = a * c, p = a * l;
  return n[0] = 1 - v - d, n[1] = f + p, n[2] = o - y, n[3] = 0, n[4] = f - p, n[5] = 1 - h - d, n[6] = M + m, n[7] = 0, n[8] = o + y, n[9] = M - m, n[10] = 1 - h - v, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
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
function E1(n, r, e, t, s, a, i) {
  var c = 1 / (r - e), l = 1 / (t - s), h = 1 / (a - i);
  return n[0] = -2 * c, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * l, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 2 * h, n[11] = 0, n[12] = (r + e) * c, n[13] = (s + t) * l, n[14] = (i + a) * h, n[15] = 1, n;
}
var D1 = E1;
function ha(n, r, e, t, s, a, i) {
  var c = 1 / (r - e), l = 1 / (t - s), h = 1 / (a - i);
  return n[0] = -2 * c, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * l, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = h, n[11] = 0, n[12] = (r + e) * c, n[13] = (s + t) * l, n[14] = a * h, n[15] = 1, n;
}
function fa(n, r, e, t) {
  var s, a, i, c, l, h, f, v, o, M, d = r[0], m = r[1], y = r[2], p = t[0], z = t[1], w = t[2], x = e[0], b = e[1], g = e[2];
  return Math.abs(d - x) < P && Math.abs(m - b) < P && Math.abs(y - g) < P ? Ze(n) : (f = d - x, v = m - b, o = y - g, M = 1 / Math.sqrt(f * f + v * v + o * o), f *= M, v *= M, o *= M, s = z * o - w * v, a = w * f - p * o, i = p * v - z * f, M = Math.sqrt(s * s + a * a + i * i), M ? (M = 1 / M, s *= M, a *= M, i *= M) : (s = 0, a = 0, i = 0), c = v * i - o * a, l = o * s - f * i, h = f * a - v * s, M = Math.sqrt(c * c + l * l + h * h), M ? (M = 1 / M, c *= M, l *= M, h *= M) : (c = 0, l = 0, h = 0), n[0] = s, n[1] = c, n[2] = f, n[3] = 0, n[4] = a, n[5] = l, n[6] = v, n[7] = 0, n[8] = i, n[9] = h, n[10] = o, n[11] = 0, n[12] = -(s * d + a * m + i * y), n[13] = -(c * d + l * m + h * y), n[14] = -(f * d + v * m + o * y), n[15] = 1, n);
}
function va(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = t[0], l = t[1], h = t[2], f = s - e[0], v = a - e[1], o = i - e[2], M = f * f + v * v + o * o;
  M > 0 && (M = 1 / Math.sqrt(M), f *= M, v *= M, o *= M);
  var d = l * o - h * v, m = h * f - c * o, y = c * v - l * f;
  return M = d * d + m * m + y * y, M > 0 && (M = 1 / Math.sqrt(M), d *= M, m *= M, y *= M), n[0] = d, n[1] = m, n[2] = y, n[3] = 0, n[4] = v * y - o * m, n[5] = o * d - f * y, n[6] = f * m - v * d, n[7] = 0, n[8] = f, n[9] = v, n[10] = o, n[11] = 0, n[12] = s, n[13] = a, n[14] = i, n[15] = 1, n;
}
function oa(n) {
  return "mat4(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ", " + n[8] + ", " + n[9] + ", " + n[10] + ", " + n[11] + ", " + n[12] + ", " + n[13] + ", " + n[14] + ", " + n[15] + ")";
}
function Ma(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + n[6] * n[6] + n[7] * n[7] + n[8] * n[8] + n[9] * n[9] + n[10] * n[10] + n[11] * n[11] + n[12] * n[12] + n[13] * n[13] + n[14] * n[14] + n[15] * n[15]);
}
function da(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n[6] = r[6] + e[6], n[7] = r[7] + e[7], n[8] = r[8] + e[8], n[9] = r[9] + e[9], n[10] = r[10] + e[10], n[11] = r[11] + e[11], n[12] = r[12] + e[12], n[13] = r[13] + e[13], n[14] = r[14] + e[14], n[15] = r[15] + e[15], n;
}
function W1(n, r, e) {
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
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = n[9], o = n[10], M = n[11], d = n[12], m = n[13], y = n[14], p = n[15], z = r[0], w = r[1], x = r[2], b = r[3], g = r[4], j = r[5], R = r[6], A = r[7], $ = r[8], L = r[9], F = r[10], q = r[11], O = r[12], T = r[13], Z = r[14], V = r[15];
  return Math.abs(e - z) <= P * Math.max(1, Math.abs(e), Math.abs(z)) && Math.abs(t - w) <= P * Math.max(1, Math.abs(t), Math.abs(w)) && Math.abs(s - x) <= P * Math.max(1, Math.abs(s), Math.abs(x)) && Math.abs(a - b) <= P * Math.max(1, Math.abs(a), Math.abs(b)) && Math.abs(i - g) <= P * Math.max(1, Math.abs(i), Math.abs(g)) && Math.abs(c - j) <= P * Math.max(1, Math.abs(c), Math.abs(j)) && Math.abs(l - R) <= P * Math.max(1, Math.abs(l), Math.abs(R)) && Math.abs(h - A) <= P * Math.max(1, Math.abs(h), Math.abs(A)) && Math.abs(f - $) <= P * Math.max(1, Math.abs(f), Math.abs($)) && Math.abs(v - L) <= P * Math.max(1, Math.abs(v), Math.abs(L)) && Math.abs(o - F) <= P * Math.max(1, Math.abs(o), Math.abs(F)) && Math.abs(M - q) <= P * Math.max(1, Math.abs(M), Math.abs(q)) && Math.abs(d - O) <= P * Math.max(1, Math.abs(d), Math.abs(O)) && Math.abs(m - T) <= P * Math.max(1, Math.abs(m), Math.abs(T)) && Math.abs(y - Z) <= P * Math.max(1, Math.abs(y), Math.abs(Z)) && Math.abs(p - V) <= P * Math.max(1, Math.abs(p), Math.abs(V));
}
var ga = I1, wa = W1;
const C1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: da,
  adjoint: Vs,
  clone: Es,
  copy: Ds,
  create: ks,
  decompose: ra,
  determinant: Ns,
  equals: xa,
  exactEquals: pa,
  frob: Ma,
  fromQuat: sa,
  fromQuat2: na,
  fromRotation: Qs,
  fromRotationTranslation: R1,
  fromRotationTranslationScale: ea,
  fromRotationTranslationScaleOrigin: ta,
  fromScaling: Hs,
  fromTranslation: Bs,
  fromValues: Ws,
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
  ortho: D1,
  orthoNO: E1,
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
  set: Cs,
  str: oa,
  sub: wa,
  subtract: W1,
  targetTo: va,
  translate: Ne,
  transpose: Us
}, Symbol.toStringTag, { value: "Module" }));
function Ge() {
  var n = new H(3);
  return H != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n;
}
function $a(n) {
  var r = new H(3);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r;
}
function U1(n) {
  var r = n[0], e = n[1], t = n[2];
  return Math.sqrt(r * r + e * e + t * t);
}
function Ye(n, r, e) {
  var t = new H(3);
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
function B1(n, r) {
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
function Ea(n, r, e, t, s, a) {
  var i = 1 - a, c = i * i, l = a * a, h = c * i, f = 3 * a * c, v = 3 * l * i, o = l * a;
  return n[0] = r[0] * h + e[0] * f + t[0] * v + s[0] * o, n[1] = r[1] * h + e[1] * f + t[1] * v + s[1] * o, n[2] = r[2] * h + e[2] * f + t[2] * v + s[2] * o, n;
}
function Da(n, r) {
  r = r === void 0 ? 1 : r;
  var e = Rr() * 2 * Math.PI, t = Rr() * 2 - 1, s = Math.sqrt(1 - t * t) * r;
  return n[0] = Math.cos(e) * s, n[1] = Math.sin(e) * s, n[2] = t * r, n;
}
function H1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = e[3] * t + e[7] * s + e[11] * a + e[15];
  return i = i || 1, n[0] = (e[0] * t + e[4] * s + e[8] * a + e[12]) / i, n[1] = (e[1] * t + e[5] * s + e[9] * a + e[13]) / i, n[2] = (e[2] * t + e[6] * s + e[10] * a + e[14]) / i, n;
}
function Wa(n, r, e) {
  var t = r[0], s = r[1], a = r[2];
  return n[0] = t * e[0] + s * e[3] + a * e[6], n[1] = t * e[1] + s * e[4] + a * e[7], n[2] = t * e[2] + s * e[5] + a * e[8], n;
}
function Ca(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = e[3], c = r[0], l = r[1], h = r[2], f = s * h - a * l, v = a * c - t * h, o = t * l - s * c;
  return f = f + f, v = v + v, o = o + o, n[0] = c + i * f + s * o - a * v, n[1] = l + i * v + a * f - t * o, n[2] = h + i * o + t * v - s * f, n;
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
function Ba(n, r) {
  var e = n[0], t = n[1], s = n[2], a = r[0], i = r[1], c = r[2];
  return Math.abs(e - a) <= P * Math.max(1, Math.abs(e), Math.abs(a)) && Math.abs(t - i) <= P * Math.max(1, Math.abs(t), Math.abs(i)) && Math.abs(s - c) <= P * Math.max(1, Math.abs(s), Math.abs(c));
}
var Ha = V1, Qa = N1, Ja = Y1, Ka = X1, ua = Z1, Q1 = U1, ni = G1, ri = (function() {
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
  bezier: Ea,
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
  equals: Ba,
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
  normalize: B1,
  random: Da,
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
  sub: Ha,
  subtract: V1,
  transformMat3: Wa,
  transformMat4: H1,
  transformQuat: Ca,
  zero: Xa
}, Symbol.toStringTag, { value: "Module" }));
function J1() {
  var n = new H(4);
  return H != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0), n;
}
function K1(n) {
  var r = new H(4);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function u1(n, r, e, t) {
  var s = new H(4);
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
function Be(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3];
  return Math.sqrt(r * r + e * e + t * t + s * s);
}
function He(n) {
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
  var s = e[0] * t[1] - e[1] * t[0], a = e[0] * t[2] - e[2] * t[0], i = e[0] * t[3] - e[3] * t[0], c = e[1] * t[2] - e[2] * t[1], l = e[1] * t[3] - e[3] * t[1], h = e[2] * t[3] - e[3] * t[2], f = r[0], v = r[1], o = r[2], M = r[3];
  return n[0] = v * h - o * l + M * c, n[1] = -(f * h) + o * i - M * a, n[2] = f * l - v * i + M * s, n[3] = -(f * c) + v * a - o * s, n;
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
function Mi(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3];
  return n[0] = e[0] * t + e[4] * s + e[8] * a + e[12] * i, n[1] = e[1] * t + e[5] * s + e[9] * a + e[13] * i, n[2] = e[2] * t + e[6] * s + e[10] * a + e[14] * i, n[3] = e[3] * t + e[7] * s + e[11] * a + e[15] * i, n;
}
function di(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = e[3], c = r[0], l = r[1], h = r[2], f = s * h - a * l, v = a * c - t * h, o = t * l - s * c;
  return f = f + f, v = v + v, o = o + o, n[0] = c + i * f + s * o - a * v, n[1] = l + i * v + a * f - t * o, n[2] = h + i * o + t * v - s * f, n[3] = r[3], n;
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
  return Math.abs(e - i) <= P * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(t - c) <= P * Math.max(1, Math.abs(t), Math.abs(c)) && Math.abs(s - l) <= P * Math.max(1, Math.abs(s), Math.abs(l)) && Math.abs(a - h) <= P * Math.max(1, Math.abs(a), Math.abs(h));
}
var xi = tt, gi = st, wi = at, $i = ct, bi = lt, zi = Be, Ai = He, qi = (function() {
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
  length: Be,
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
  squaredLength: He,
  str: mi,
  sub: xi,
  subtract: tt,
  transformMat4: Mi,
  transformQuat: di,
  zero: yi
}, Symbol.toStringTag, { value: "Module" }));
function be() {
  var n = new H(4);
  return H != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n[3] = 1, n;
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
  return t > P ? (n[0] = r[0] / t, n[1] = r[1] / t, n[2] = r[2] / t) : (n[0] = 1, n[1] = 0, n[2] = 0), e;
}
function Fi(n, r) {
  var e = Ke(n, r);
  return Math.acos(2 * e * e - 1);
}
function Mt(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return n[0] = t * f + i * c + s * h - a * l, n[1] = s * f + i * l + a * c - t * h, n[2] = a * f + i * h + t * l - s * c, n[3] = i * f - t * c - s * l - a * h, n;
}
function dt(n, r, e) {
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
  var s = r[0], a = r[1], i = r[2], c = r[3], l = e[0], h = e[1], f = e[2], v = e[3], o, M, d, m, y;
  return M = s * l + a * h + i * f + c * v, M < 0 && (M = -M, l = -l, h = -h, f = -f, v = -v), 1 - M > P ? (o = Math.acos(M), d = Math.sin(o), m = Math.sin((1 - t) * o) / d, y = Math.sin(t * o) / d) : (m = 1 - t, y = t), n[0] = m * s + y * l, n[1] = m * a + y * h, n[2] = m * i + y * f, n[3] = m * c + y * v, n;
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
var Ei = K1, Di = u1, Je = nt, Wi = rt, Ci = et, Ui = Mt, wt = it, Ke = Qe, Vi = ft, ue = Be, Ni = ue, n1 = He, Yi = n1, r1 = ht, Xi = vt;
function Zi(n, r) {
  return Math.abs(Qe(n, r)) >= 1 - P;
}
var Gi = (function() {
  var n = Ge(), r = Ye(1, 0, 0), e = Ye(0, 1, 0);
  return function(t, s, a) {
    var i = Fe(s, a);
    return i < -0.999999 ? (we(n, r, s), Q1(n) < 1e-6 && we(n, e, s), B1(n, n), ot(t, n, Math.PI), t) : i > 0.999999 ? (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t) : (we(n, s, a), t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = 1 + i, r1(t, t));
  };
})(), Bi = (function() {
  var n = be(), r = be();
  return function(e, t, s, a, i, c) {
    return $e(n, t, i, c), $e(r, s, a, c), $e(e, n, r, 2 * c * (1 - c)), e;
  };
})(), Hi = (function() {
  var n = T1();
  return function(r, e, t, s) {
    return n[0] = t[0], n[3] = t[1], n[6] = t[2], n[1] = s[0], n[4] = s[1], n[7] = s[2], n[2] = -e[0], n[5] = -e[1], n[8] = -e[2], r1(r, gt(r, n));
  };
})();
const Qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Ci,
  calculateW: Ii,
  clone: Ei,
  conjugate: Pi,
  copy: Je,
  create: be,
  dot: Ke,
  equals: Zi,
  exactEquals: Xi,
  exp: pt,
  fromEuler: _i,
  fromMat3: gt,
  fromValues: Di,
  getAngle: Fi,
  getAxisAngle: Oi,
  identity: Si,
  invert: Li,
  len: Ni,
  length: ue,
  lerp: Vi,
  ln: xt,
  mul: Ui,
  multiply: Mt,
  normalize: r1,
  pow: ji,
  random: Ri,
  rotateX: dt,
  rotateY: yt,
  rotateZ: mt,
  rotationTo: Gi,
  scale: wt,
  set: Wi,
  setAxes: Hi,
  setAxisAngle: ot,
  slerp: $e,
  sqlerp: Bi,
  sqrLen: Yi,
  squaredLength: n1,
  str: ki
}, Symbol.toStringTag, { value: "Module" }));
function Ji() {
  var n = new H(8);
  return H != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[3] = 1, n;
}
function Ki(n) {
  var r = new H(8);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r;
}
function ui(n, r, e, t, s, a, i, c) {
  var l = new H(8);
  return l[0] = n, l[1] = r, l[2] = e, l[3] = t, l[4] = s, l[5] = a, l[6] = i, l[7] = c, l;
}
function nc(n, r, e, t, s, a, i) {
  var c = new H(8);
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
  var t = new H(3);
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
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0] * 0.5, l = e[1] * 0.5, h = e[2] * 0.5, f = r[4], v = r[5], o = r[6], M = r[7];
  return n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = i * c + s * h - a * l + f, n[5] = i * l + a * c - t * h + v, n[6] = i * h + t * l - s * c + o, n[7] = -t * c - s * l - a * h + M, n;
}
function oc(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, o = l * i + f * s + h * t - c * a, M = h * i + f * a + c * s - l * t, d = f * i - c * t - l * s - h * a;
  return dt(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + d * t + o * a - M * s, n[5] = o * i + d * s + M * t - v * a, n[6] = M * i + d * a + v * s - o * t, n[7] = d * i - v * t - o * s - M * a, n;
}
function Mc(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, o = l * i + f * s + h * t - c * a, M = h * i + f * a + c * s - l * t, d = f * i - c * t - l * s - h * a;
  return yt(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + d * t + o * a - M * s, n[5] = o * i + d * s + M * t - v * a, n[6] = M * i + d * a + v * s - o * t, n[7] = d * i - v * t - o * s - M * a, n;
}
function dc(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, o = l * i + f * s + h * t - c * a, M = h * i + f * a + c * s - l * t, d = f * i - c * t - l * s - h * a;
  return mt(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + d * t + o * a - M * s, n[5] = o * i + d * s + M * t - v * a, n[6] = M * i + d * a + v * s - o * t, n[7] = d * i - v * t - o * s - M * a, n;
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
  if (Math.abs(t) < P)
    return bt(n, r);
  var s = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
  t = t * 0.5;
  var a = Math.sin(t), i = a * e[0] / s, c = a * e[1] / s, l = a * e[2] / s, h = Math.cos(t), f = r[0], v = r[1], o = r[2], M = r[3];
  n[0] = f * h + M * i + v * l - o * c, n[1] = v * h + M * c + o * i - f * l, n[2] = o * h + M * l + f * c - v * i, n[3] = M * h - f * i - v * c - o * l;
  var d = r[4], m = r[5], y = r[6], p = r[7];
  return n[4] = d * h + p * i + m * l - y * c, n[5] = m * h + p * c + y * i - d * l, n[6] = y * h + p * l + d * c - m * i, n[7] = p * h - d * i - m * c - y * l, n;
}
function xc(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n[6] = r[6] + e[6], n[7] = r[7] + e[7], n;
}
function zt(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[4], l = e[5], h = e[6], f = e[7], v = r[4], o = r[5], M = r[6], d = r[7], m = e[0], y = e[1], p = e[2], z = e[3];
  return n[0] = t * z + i * m + s * p - a * y, n[1] = s * z + i * y + a * m - t * p, n[2] = a * z + i * p + t * y - s * m, n[3] = i * z - t * m - s * y - a * p, n[4] = t * f + i * c + s * h - a * l + v * z + d * m + o * p - M * y, n[5] = s * f + i * l + a * c - t * h + o * z + d * y + M * m - v * p, n[6] = a * f + i * h + t * l - s * c + M * z + d * p + v * y - o * m, n[7] = i * f - t * c - s * l - a * h + d * z - v * m - o * y - M * p, n;
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
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = r[0], v = r[1], o = r[2], M = r[3], d = r[4], m = r[5], y = r[6], p = r[7];
  return Math.abs(e - f) <= P * Math.max(1, Math.abs(e), Math.abs(f)) && Math.abs(t - v) <= P * Math.max(1, Math.abs(t), Math.abs(v)) && Math.abs(s - o) <= P * Math.max(1, Math.abs(s), Math.abs(o)) && Math.abs(a - M) <= P * Math.max(1, Math.abs(a), Math.abs(M)) && Math.abs(i - d) <= P * Math.max(1, Math.abs(i), Math.abs(d)) && Math.abs(c - m) <= P * Math.max(1, Math.abs(c), Math.abs(m)) && Math.abs(l - y) <= P * Math.max(1, Math.abs(l), Math.abs(y)) && Math.abs(h - p) <= P * Math.max(1, Math.abs(h), Math.abs(p));
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
  rotateY: Mc,
  rotateZ: dc,
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
  var n = new H(2);
  return H != Float32Array && (n[0] = 0, n[1] = 0), n;
}
function jc(n) {
  var r = new H(2);
  return r[0] = n[0], r[1] = n[1], r;
}
function Rc(n, r) {
  var e = new H(2);
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
function Ec(n, r) {
  return n[0] = Math.floor(r[0]), n[1] = Math.floor(r[1]), n;
}
function Dc(n, r, e) {
  return n[0] = Math.min(r[0], e[0]), n[1] = Math.min(r[1], e[1]), n;
}
function Wc(n, r, e) {
  return n[0] = Math.max(r[0], e[0]), n[1] = Math.max(r[1], e[1]), n;
}
function Cc(n, r) {
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
function Bc(n, r, e, t) {
  var s = r[0], a = r[1];
  return n[0] = s + t * (e[0] - s), n[1] = a + t * (e[1] - a), n;
}
function Hc(n, r) {
  r = r === void 0 ? 1 : r;
  var e = Rr() * 2 * Math.PI;
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
  return Math.abs(e - s) <= P * Math.max(1, Math.abs(e), Math.abs(s)) && Math.abs(t - a) <= P * Math.max(1, Math.abs(t), Math.abs(a));
}
var c2 = Rt, l2 = St, h2 = Ot, f2 = Ft, v2 = It, o2 = jt, M2 = Lt, d2 = (function() {
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
  floor: Ec,
  forEach: d2,
  fromValues: Rc,
  inverse: Yc,
  len: c2,
  length: Rt,
  lerp: Bc,
  max: Wc,
  min: Dc,
  mul: h2,
  multiply: Ot,
  negate: Nc,
  normalize: Xc,
  random: Hc,
  rotate: n2,
  round: Cc,
  scale: Uc,
  scaleAndAdd: Vc,
  set: Pc,
  signedAngle: e2,
  sqrDist: o2,
  sqrLen: M2,
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
  mat4: C1,
  quat: Qi,
  quat2: Ic,
  vec2: y2,
  vec3: ei,
  vec4: Ti
}, Symbol.toStringTag, { value: "Module" })), je = Oe;
function Re() {
  yn.call(this), this.events = {
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
var gn = Re.prototype = Object.create(yn.prototype), wr = new Float32Array([0, 0, 0]), Ar = new Float32Array(16);
gn.constructor = Re;
gn.local = null;
gn.worldMatrix = null;
gn.worldToLocal = null;
gn.children = null;
gn.parent = null;
gn.dirtyW = !0;
gn.dirtyL = !0;
gn.onParentUpdate = null;
gn.addChild = function(n) {
  this.children[this.children.length] = n, n.setParent(this);
};
gn.removeChild = function(n) {
  this.children.splice(this.children.indexOf(n), 1), n.removeParent();
};
gn.setParent = function(n) {
  this.parent = n, n.gameObject.world !== null && n.gameObject.world.addGameObject(this.gameObject);
};
gn.setGameObject = function(n) {
  yn.prototype.setGameObject.call(this, n), n.transform = this;
};
gn.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
gn.removeParent = function() {
  this.parent = null;
};
gn.translate = function(n, r, e, t) {
  wr[0] = n, wr[1] = r, wr[2] = e, t === "world" ? (Ze(Ar), Ne(Ar, Ar, wr), je(this.local, Ar, this.local)) : Ne(this.local, this.local, wr);
};
gn.rotate = function(n, r, e, t) {
  var s = Math.PI / 180, a = C1;
  t === "world" ? (a.identity(Ar), a.rotateZ(Ar, Ar, e * s), a.rotateY(Ar, Ar, r * s), a.rotateX(Ar, Ar, n * s), je(this.local, Ar, this.local)) : (a.rotateZ(this.local, this.local, e * s), a.rotateY(this.local, this.local, r * s), a.rotateX(this.local, this.local, n * s));
};
gn.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.worldMatrix.set(this.local) : je(this.worldMatrix, this.parent.getLocalToWorld(), this.local)), this.worldMatrix;
};
gn.getWorldToLocal = function() {
  return this.dirtyW === !0 && F1(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
};
gn.getPosition = function(n) {
  n === void 0 && (n = []);
  var r = this.getLocalToWorld();
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
};
gn.getLocalPosition = function(n) {
  n === void 0 && (n = []);
  var r = this.local;
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
};
gn.getRotation = function() {
  throw "TransformComponent.getRotation not implemented yet";
};
gn.getLocalRotation = function() {
  throw "TransformComponent.getLocalRotation not implemented yet";
};
gn.setPosition = function(n, r, e) {
  wr[0] = n, wr[1] = r, wr[2] = e, this.parent !== null && H1(wr, wr, this.parent.getWorldToLocal()), this.local[12] = wr[0], this.local[13] = wr[1], this.local[14] = wr[2];
};
gn.setLocalPosition = function(n, r, e) {
  this.local[12] = n, this.local[13] = r, this.local[14] = e;
};
gn.scale = function(n, r, e) {
  j1(this.local, this.local, [n, r, e]);
};
gn.updateWorldMatrix = function(n = !1) {
  this.parent === null ? this.worldMatrix.set(this.local) : (n && this.parent.updateWorldMatrix(n), je(this.worldMatrix, this.parent.worldMatrix, this.local));
};
function dr(n) {
  this.instanceId = dr.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new Re()), this.name = n || "gameObject";
}
var qr = dr.prototype;
qr.instanceId = 0;
qr.name = null;
qr.layer = 0;
qr.scene = null;
qr.world = null;
qr.transform = null;
qr.components = null;
qr.componentsCount = 0;
qr.setScene = function(n) {
  this.scene = n;
};
qr.addComponent = function(n) {
  return this.components[this.componentsCount++] = n, n.setGameObject(this), n;
};
qr.removeComponent = function(n) {
  n.unsetGameObject();
};
qr.getComponent = function(n) {
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
function nn(n) {
  yn.call(this), this.transform = n, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ];
}
nn.prototype = Object.create(yn.prototype);
nn.prototype.constructor = nn;
nn.prototype.frustumSize = null;
nn.prototype.projectionMatrix = null;
nn.prototype.clipSpaceMatrix = null;
nn.prototype.nearClippingPane = 0;
nn.prototype.farClippingPane = 1e3;
nn.prototype.fogType = Pt.LINEAR;
nn.prototype.fogNearPane = 250;
nn.prototype.fogFarPane = 750;
nn.prototype.fogColor = 9868950;
nn.prototype.bgColor = -1;
nn.prototype.ambientLight = 8421504;
nn.prototype.setup = function(n, r) {
  this.frustumSize = [
    [-n / 2, -r / 2, 0],
    [n / 2, r / 2, length]
  ], D1(this.projectionMatrix, -n / 2, n / 2, -r / 2, r / 2, this.nearClippingPane, this.farClippingPane);
};
nn.prototype.setGameObject = function(n) {
  yn.prototype.setGameObject.call(this, n), n.camera = this;
};
nn.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, yn.prototype.unsetGameObject.call(this);
};
nn.prototype.getClipSpaceMatrix = function() {
  const n = this.transform.getWorldToLocal();
  return Oe(this.clipSpaceMatrix, this.projectionMatrix, n), this.clipSpaceMatrix;
};
nn.FogType = Pt;
function _t(n) {
  dr.call(this, n || "camera"), this.addComponent(new nn(this.transform));
}
_t.prototype = Object.create(dr.prototype);
function Gn() {
  yn.call(this), this.colors = new Uint32Array([255]), this.faceColors = new Uint32Array([0]);
}
var er = Gn.prototype = Object.create(yn.prototype);
er.constructor = Gn;
er.layer = 0;
er.vertices = null;
er.faces = null;
er.pivot = [0, 0, 0];
er.color = null;
er.colors = null;
er.uvs = null;
er._texture = null;
er.textureImage = null;
Object.defineProperty(er, "texture", {
  get: function() {
    return this._texture;
  },
  set: function(n) {
    this._texture !== n && (this._texture = n, n ? (this.textureImage || (this.textureImage = new Image()), this.textureImage.src = n) : this.textureImage = null);
  }
});
er.faceColors = null;
er.faceNormals = null;
er.vertexNormals = null;
er.bounds = null;
er.updateNormals = function(n = 1) {
  const r = this.faces, e = this.vertices, t = r.length;
  (!this.faceNormals || this.faceNormals.length !== t) && (this.faceNormals = new Float32Array(t)), !this.vertexNormals || this.vertexNormals.length !== e.length ? this.vertexNormals = new Float32Array(e.length) : this.vertexNormals.fill(0);
  for (let s = 0; s < t; s += 3) {
    const a = r[s] * 3, i = r[s + 1] * 3, c = r[s + 2] * 3, l = e[i] - e[a], h = e[i + 1] - e[a + 1], f = e[i + 2] - e[a + 2], v = e[c] - e[a], o = e[c + 1] - e[a + 1], M = e[c + 2] - e[a + 2];
    let d = (h * M - f * o) * n, m = (f * v - l * M) * n, y = (l * o - h * v) * n;
    const p = Math.sqrt(d * d + m * m + y * y);
    if (p > 1e-10) {
      const z = 1 / p;
      this.faceNormals[s] = d * z, this.faceNormals[s + 1] = m * z, this.faceNormals[s + 2] = y * z, this.vertexNormals[a] += d, this.vertexNormals[a + 1] += m, this.vertexNormals[a + 2] += y, this.vertexNormals[i] += d, this.vertexNormals[i + 1] += m, this.vertexNormals[i + 2] += y, this.vertexNormals[c] += d, this.vertexNormals[c + 1] += m, this.vertexNormals[c + 2] += y;
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
er.setGameObject = function(n) {
  yn.prototype.setGameObject.call(this, n), n.meshRenderer = this;
};
er.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, yn.prototype.unsetGameObject.call(this);
};
Gn.computeNormalMatrix = function(n, r) {
  const e = r[0], t = r[1], s = r[2], a = r[4], i = r[5], c = r[6], l = r[8], h = r[9], f = r[10], v = i * f - c * h, o = -(a * f - c * l), M = a * h - i * l, d = e * v + t * o + s * M;
  if (Math.abs(d) < 1e-6) return null;
  const m = 1 / d;
  n[0] = v * m, n[1] = o * m, n[2] = M * m, n[3] = -(t * f - s * h) * m, n[4] = (e * f - s * l) * m, n[5] = -(e * h - t * l) * m, n[6] = (t * c - s * i) * m, n[7] = -(e * c - s * a) * m, n[8] = (e * i - t * a) * m;
};
Gn.computeBoundsFlatArray = function(n, r, e) {
  if (e.length !== 0) {
    for (var t = e[0], s = t, a = e[1], i = a, c = e[2], l = c, h = 3; h < e.length; h += 3) {
      var f = e[h], v = e[h + 1], o = e[h + 2];
      f < t ? t = f : f > s && (s = f), v < a ? a = v : v > i && (i = v), o < c ? c = o : o > l && (l = o);
    }
    return n[r] = t, n[r + 1] = a, n[r + 2] = c, n[r + 3] = s, n[r + 4] = a, n[r + 5] = c, n[r + 6] = t, n[r + 7] = i, n[r + 8] = c, n[r + 9] = s, n[r + 10] = i, n[r + 11] = c, n[r + 12] = t, n[r + 13] = a, n[r + 14] = l, n[r + 15] = s, n[r + 16] = a, n[r + 17] = l, n[r + 18] = t, n[r + 19] = i, n[r + 20] = l, n[r + 21] = s, n[r + 22] = i, n[r + 23] = l, n;
  }
};
Gn.computeBoundingSphere = function(n, r, e) {
  let t = 1 / 0, s = 1 / 0, a = 1 / 0, i = -1 / 0, c = -1 / 0, l = -1 / 0;
  for (let y = 0; y < e.length; y += 3) {
    const p = e[y], z = e[y + 1], w = e[y + 2];
    p < t && (t = p), p > i && (i = p), z < s && (s = z), z > c && (c = z), w < a && (a = w), w > l && (l = w);
  }
  const h = (t + i) * 0.5, f = (s + c) * 0.5, v = (a + l) * 0.5, o = i - h, M = c - f, d = l - v, m = Math.sqrt(o * o + M * M + d * d);
  n[r] = h, n[r + 1] = f, n[r + 2] = v, n[r + 3] = m;
};
function e1(n) {
  yn.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var Zr = e1.prototype = Object.create(yn.prototype);
Zr.constructor = e1;
Zr.sprite = null;
Zr.pivotX = 0;
Zr.pivotY = 0;
Zr.layer = 0;
Zr.setGameObject = function(n) {
  yn.prototype.setGameObject.call(this, n), n.spriteRenderer = this;
};
Zr.setSprite = function(n) {
  return this.sprite = n, this.enabled = !0, this;
};
Zr.setPivot = function(n, r) {
  return this.pivotX = n, this.pivotY = r, this;
};
Zr.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, yn.prototype.unsetGameObject.call(this);
};
function t1() {
  yn.call(this), this.points = [];
}
var se = t1.prototype = Object.create(yn.prototype);
se.constructor = t1;
se.points = null;
se.color = "white";
se.width = 1;
se.layer = 0;
se.setGameObject = function(n) {
  yn.prototype.setGameObject.call(this, n), n.pathRenderer = this;
};
se.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, yn.prototype.unsetGameObject.call(this);
};
function s1() {
  yn.call(this);
}
var Gr = s1.prototype = Object.create(yn.prototype);
Gr.constructor = s1;
Gr.text = "sample text";
Gr.color = "white";
Gr.style = "normal 12px arial";
Gr.layer = 0;
Gr.align = "center";
Gr.valign = "middle";
Gr.setGameObject = function(n) {
  yn.prototype.setGameObject.call(this, n), n.textRenderer = this;
};
Gr.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, yn.prototype.unsetGameObject.call(this);
};
function p2(n, r, e) {
  const t = [], s = [], a = n / 2, i = r / 2, c = n / e, l = r / e;
  for (let f = 0; f <= e; f++) {
    const v = f * l - i;
    for (let o = 0; o <= e; o++) {
      const M = o * c - a;
      t.push(M, 0, v);
    }
  }
  const h = e + 1;
  for (let f = 0; f < e; f++)
    for (let v = 0; v < e; v++) {
      const o = f * h + v, M = f * h + (v + 1), d = (f + 1) * h + v, m = (f + 1) * h + (v + 1);
      s.push(o, d, M), s.push(m, M, d);
    }
  return {
    vertices: new Float32Array(t),
    faces: new Uint16Array(s)
  };
}
const ze = p2(1, 1, 1), a1 = new Float32Array(32);
Gn.computeBoundsFlatArray(a1, 0, ze.vertices);
Gn.computeBoundingSphere(a1, 28, ze.vertices);
function kt() {
  dr.call(this);
  const n = new Gn();
  n.faces = ze.faces, n.vertices = ze.vertices, n.bounds = a1, n.updateNormals(), this.addComponent(n);
}
kt.prototype = Object.create(dr.prototype);
function x2(n, r, e, t) {
  const s = [], a = [], i = [];
  function c(h, f, v, o, M, d) {
    const m = `${h.toFixed(5)},${f.toFixed(5)},${v.toFixed(5)}`;
    if (d[m] !== void 0) return d[m];
    const y = s.length / 3;
    return s.push(h, f, v), a.push(o, M), d[m] = y, y;
  }
  function l(h, f, v, o, M, d, m, y, p, z) {
    const w = {}, x = m / z, b = y / z, g = m / 2, j = y / 2, R = p / 2 * d, A = [];
    for (let $ = 0; $ <= z; $++) {
      const L = [], F = $ * b - j;
      for (let q = 0; q <= z; q++) {
        const O = q * x - g, T = [0, 0, 0];
        T[h] = O * o, T[f] = F * M, T[v] = R;
        const Z = q / z, V = 1 - $ / z;
        L.push(c(T[0], T[1], T[2], Z, V, w));
      }
      A.push(L);
    }
    for (let $ = 0; $ < z; $++)
      for (let L = 0; L < z; L++) {
        const F = A[$][L], q = A[$ + 1][L], O = A[$ + 1][L + 1], T = A[$][L + 1];
        i.push(F, T, q), i.push(q, T, O);
      }
  }
  return l(0, 1, 2, 1, 1, 1, n, r, e, t), l(0, 1, 2, -1, 1, -1, n, r, e, t), l(2, 1, 0, -1, 1, 1, e, r, n, t), l(2, 1, 0, 1, 1, -1, e, r, n, t), l(0, 2, 1, 1, -1, 1, n, e, r, t), l(0, 2, 1, 1, 1, -1, n, e, r, t), {
    vertices: new Float32Array(s),
    uvs: new Float32Array(a),
    faces: new Uint16Array(i)
  };
}
const xe = x2(1, 1, 1, 1), i1 = new Float32Array(32);
Gn.computeBoundsFlatArray(i1, 0, xe.vertices);
Gn.computeBoundingSphere(i1, 28, xe.vertices);
function Et() {
  dr.call(this);
  const n = new Gn();
  n.vertices = xe.vertices, n.uvs = xe.uvs, n.faces = xe.faces, n.bounds = i1, n.updateNormals(), this.addComponent(n);
}
Et.prototype = Object.create(dr.prototype);
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
Gn.computeBoundsFlatArray(c1, 0, Ae.vertices);
Gn.computeBoundingSphere(c1, 28, Ae.vertices);
function Dt() {
  dr.call(this);
  const n = new Gn();
  n.vertices = Ae.vertices, n.faces = Ae.faces, n.bounds = c1, n.updateNormals(), this.addComponent(n);
}
Dt.prototype = Object.create(dr.prototype);
function w2(n, r, e) {
  const t = [], s = [], a = [], i = {};
  function c(h, f, v, o, M) {
    const d = `${h.toFixed(5)},${f.toFixed(5)},${v.toFixed(5)},${o.toFixed(5)},${M.toFixed(5)}`;
    if (i[d] !== void 0) return i[d];
    const m = t.length / 3;
    return t.push(h, f, v), s.push(o, M), i[d] = m, m;
  }
  const l = [];
  for (let h = 0; h <= n; h++) {
    const f = [], v = h * Math.PI / n, o = Math.sin(v), M = Math.cos(v);
    for (let d = 0; d <= r; d++) {
      const m = d * 2 * Math.PI / r, y = Math.cos(m) * o * e, p = M * e, z = Math.sin(m) * o * e, w = d / r, x = h / n;
      f.push(c(y, p, z, w, x));
    }
    l.push(f);
  }
  for (let h = 0; h < n; h++)
    for (let f = 0; f < r; f++) {
      const v = l[h][f], o = l[h][f + 1], M = l[h + 1][f], d = l[h + 1][f + 1];
      h !== 0 && a.push(v, o, M), h !== n - 1 && a.push(M, o, d);
    }
  return {
    vertices: new Float32Array(t),
    uvs: new Float32Array(s),
    faces: new Uint16Array(a)
  };
}
function $2(n = 8, r = 8, e = 8) {
  const t = w2(n, r, e), s = new Float32Array(32);
  return Gn.computeBoundsFlatArray(s, 0, t.vertices), Gn.computeBoundingSphere(s, 28, t.vertices), [
    t.vertices,
    t.faces,
    t.uvs,
    s
  ];
}
function l1(n, r, e, t) {
  dr.call(this);
  const s = new Gn();
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
const d1 = t0;
function z2(n, r, e, t) {
  var s = n.transform.getLocalToWorld(), a = s[12], i = s[13], c = s[14];
  d1(
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
  ], o = 0; o < 3; o++) {
    var M = v[o], d = Math.sqrt(M.x * M.x + M.y * M.y + M.z * M.z);
    d < 1e-4 && (o === 0 ? M.x = 1 : o === 1 ? M.y = 1 : M.z = 1, d = 1);
    var m = M.x / d, y = M.y / d, p = M.z / d;
    d1(
      t,
      0,
      a + m * f,
      i + y * f,
      c + p * f,
      e
    ), r.beginPath(), r.lineWidth = 2, r.strokeStyle = M.col, r.moveTo(l, h), r.lineTo(t[0], t[1]), r.stroke();
  }
}
const A2 = Gn.computeNormalMatrix, Ue = e0, y1 = Oe, q2 = z2, Wn = b2(), Ve = 0.6;
function Wt() {
  this.layerBuffers = [], this.drawCalls = 0, this.faces = 0, this.lightDirection = new Float32Array([0, 0, 0]), this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.colorBuffer = new Uint32Array(0), this.shaderTypeBuffer = new Uint32Array(0), this.faceNormalsBuffer = new Float32Array(0), this.vertexNormalsBuffer = new Float32Array(0), this.meshIndexBuffer = new Uint32Array(0), this.meshFaceIndexBuffer = new Uint32Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.lightsIndexBuffer = new Uint32Array(10), this.layerBuffers = [], this.layerBufferLengths = new Uint32Array(1), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0);
  for (let n = 0; n < he.layersCount; n++)
    this.layerBuffers[n] = this.layerBuffers[n] || [];
  this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0);
}
var ae = Wt.prototype;
ae.vec3Cache1 = new Float32Array([0, 0, 0]);
ae.vec3Cache2 = new Float32Array([0, 0, 0]);
ae.vec4Cache = new Float32Array([0, 0, 0]);
ae.mat4Scratchpad1 = new Float32Array(16);
ae.mat4Scratchpad2 = new Float32Array(16);
ae.mat3Scratchpad1 = new Float32Array(9);
ae.render = function(n, r, e) {
  let t = Date.now(), s = n.scene.retrieve(), a = he.layersCount, i = r.width, c = r.height, l, h, f, v, o, M, d = this.vec3Cache1, m = this.vec3Cache2, y = this.vec4Cache, p = this.depthBuffer, z = this.indexBuffer, w = this.vertexIndexBuffer, x = this.vertexBuffer, b = this.clipGeometryBuffer, g = this.colorBuffer, j = this.shaderTypeBuffer, R = this.faceNormalsBuffer, A = this.vertexNormalsBuffer, $ = this.meshIndexBuffer, L = this.meshFaceIndexBuffer, F = this.visibleObjectsBuffer, q = this.lightsIndexBuffer, O = this.layerBuffers, T = this.layerBufferLengths, Z = this.mat4Scratchpad1, V = this.mat4Scratchpad2, Cn = r.getWorldToScreen(), S = n.transform.getWorldToLocal(), Pn = n.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let Un = 0, Bn = 0;
  const Y = n.camera, N = n.camera.fogType !== nn.FogType.NONE ? Y.fogColor : Y.bgColor;
  if (Y.bgColor !== -1) {
    const E = N >>> 16, _ = N >>> 8 & 255, _n = N & 255, X = E & 248, Kn = _ & 252, D = _n & 248, mn = X << 8 | Kn << 3 | D >> 3;
    r.context.fillStyle = Wn[mn], r.context.fillRect(0, 0, r.width, r.height);
  } else
    r.context.clearRect(0, 0, r.width, r.height);
  if (F.length < s.length) {
    const E = F;
    this.visibleObjectsBuffer = F = new Uint32Array(
      s.length
    ), F.set(E);
  }
  if (q.length < s.length) {
    const E = q;
    this.lightsIndexBuffer = q = new Uint32Array(
      s.length
    ), q.set(E);
  }
  if (T2(
    s,
    Pn,
    F,
    q
  ), S2(F, s, Pn), T.length < a) {
    var rn = T;
    this.layerBufferLengths = T = new Uint32Array(a), T.set(rn);
  }
  const tn = F[0] + 1;
  for (v = 1; v < tn; v++) {
    const E = s[F[v]];
    if (E.meshRenderer) {
      const _ = E.meshRenderer, _n = _.layer;
      O[_n][T[_n]++] = _;
    }
  }
  for (v = 0; v < a; v++) {
    M = r.layers[v], h = O[v], f = T[v];
    let E = 0, _ = 0;
    for (let D = 0; D < f; D++) {
      E += h[D].faces.length;
      const mn = h[D].vertices.length;
      mn > _ && (_ = mn);
    }
    E = E / 3 | 0;
    const _n = _ / 3 | 0;
    if (this.vMapping.length < _n && (this.vMapping = new Int32Array(_n), this.vTags = new Uint32Array(_n)), d.length < _ && (this.vec3Cache1 = d = new Float32Array(_), this.vec3Cache2 = m = new Float32Array(_), this.vec4Cache = y = new Float32Array(_ * 4 / 3)), p.length < E) {
      let D = new Float32Array(E);
      D.set(p), this.depthBuffer = p = D, D = new Uint32Array(E), D.set(z), this.indexBuffer = z = D, D = new Uint32Array(E), D.set(g), this.colorBuffer = g = D, D = new Uint32Array(E), D.set(j), this.shaderTypeBuffer = j = D, D = new Float32Array(E * 9), D.set(b), this.clipGeometryBuffer = b = D, D = new Float32Array(E * 3), D.set(R), this.faceNormalsBuffer = R = D, D = new Float32Array(E * 9), D.set(A), this.vertexNormalsBuffer = A = D, D = new Uint32Array(E), D.set($), this.meshIndexBuffer = $ = D, D = new Uint32Array(E), D.set(L), this.meshFaceIndexBuffer = L = D;
      let mn = new Float32Array(E * 6);
      mn.set(x), this.vertexBuffer = x = mn;
      let I = new Uint32Array(E * 3);
      I.set(w), this.vertexIndexBuffer = w = I;
    }
    const X = O2(
      h,
      f,
      m,
      y,
      z,
      p,
      g,
      j,
      b,
      S,
      Pn,
      V,
      Z,
      this.mat3Scratchpad1,
      R,
      A,
      x,
      w,
      $,
      L,
      this.vMapping,
      this.vTags
    );
    (he.depthSortingMask & v + 1) === v + 1 && z.subarray(0, X).sort(function(D, mn) {
      return p[mn] - p[D];
    });
    const Kn = (he.layerClearMask & v + 1) === v + 1;
    for (F2(
      M,
      x,
      w,
      z,
      g,
      j,
      X,
      0,
      Kn,
      i,
      c,
      b,
      p,
      n.camera.fogType,
      n.camera.fogColor,
      n.camera.fogNearPane,
      n.camera.fogFarPane,
      n.scene,
      this.lightDirection,
      n.camera.ambientLight,
      R,
      A,
      $,
      L,
      h,
      this.wireframe,
      q,
      s
    ), o = 0; o < f; o++)
      l = h[o], l.gameObject && l.gameObject.debug && q2(l.gameObject, M, Cn, d);
    r.context.drawImage(M.canvas, 0, 0), Un += X, Bn += X, T[v] = 0;
  }
  e.totalObjects = s.length, e.visibleObjects = tn, e.drawCalls = Un, e.faces = Bn, e.dt = Date.now() - t;
};
function T2(n, r, e, t) {
  let s = 0, a = 0;
  const i = r[0], c = r[1], l = r[2], h = r[3], f = r[4], v = r[5], o = r[6], M = r[7], d = r[8], m = r[9], y = r[10], p = r[11], z = r[12], w = r[13], x = r[14], b = r[15];
  let g = h + i, j = M + f, R = p + d, A = b + z, $ = 1 / Math.sqrt(g * g + j * j + R * R);
  g *= $, j *= $, R *= $, A *= $;
  let L = h - i, F = M - f, q = p - d, O = b - z;
  $ = 1 / Math.sqrt(L * L + F * F + q * q), L *= $, F *= $, q *= $, O *= $;
  let T = h + c, Z = M + v, V = p + m, Cn = b + w;
  $ = 1 / Math.sqrt(T * T + Z * Z + V * V), T *= $, Z *= $, V *= $, Cn *= $;
  let S = h - c, Pn = M - v, Un = p - m, Bn = b - w;
  $ = 1 / Math.sqrt(S * S + Pn * Pn + Un * Un), S *= $, Pn *= $, Un *= $, Bn *= $;
  let Y = h + l, N = M + o, rn = p + y, tn = b + x;
  $ = 1 / Math.sqrt(Y * Y + N * N + rn * rn), Y *= $, N *= $, rn *= $, tn *= $;
  let E = h - l, _ = M - o, _n = p - y, X = b - x;
  $ = 1 / Math.sqrt(E * E + _ * _ + _n * _n), E *= $, _ *= $, _n *= $, X *= $;
  const Kn = n.length;
  for (let D = 0; D < Kn; D++) {
    const mn = n[D];
    if (mn.meshRenderer && mn.meshRenderer.enabled) {
      const I = mn.transform.worldMatrix, Hn = mn.meshRenderer.bounds, un = Hn[28], bn = Hn[29], Yn = Hn[30], sr = I[0] * un + I[4] * bn + I[8] * Yn + I[12], ar = I[1] * un + I[5] * bn + I[9] * Yn + I[13], Qn = I[2] * un + I[6] * bn + I[10] * Yn + I[14], ir = I[0] * I[0] + I[1] * I[1] + I[2] * I[2], vr = I[4] * I[4] + I[5] * I[5] + I[6] * I[6], or = I[8] * I[8] + I[9] * I[9] + I[10] * I[10], pn = Hn[31] * Math.sqrt(Math.max(ir, vr, or));
      if (g * sr + j * ar + R * Qn + A < -pn || L * sr + F * ar + q * Qn + O < -pn || T * sr + Z * ar + V * Qn + Cn < -pn || S * sr + Pn * ar + Un * Qn + Bn < -pn || Y * sr + N * ar + rn * Qn + tn < -pn || E * sr + _ * ar + _n * Qn + X < -pn) continue;
      e[++s] = D;
    }
    if (mn.light)
      if (mn.light.type === 1) {
        const I = mn.transform.worldMatrix, Hn = I[12], un = I[13], bn = I[14], Yn = I[0] * I[0] + I[1] * I[1] + I[2] * I[2], sr = I[4] * I[4] + I[5] * I[5] + I[6] * I[6], ar = I[8] * I[8] + I[9] * I[9] + I[10] * I[10], Qn = mn.light.range * Math.sqrt(Math.max(Yn, sr, ar));
        if (g * Hn + j * un + R * bn + A < -Qn || L * Hn + F * un + q * bn + O < -Qn || T * Hn + Z * un + V * bn + Cn < -Qn || S * Hn + Pn * un + Un * bn + Bn < -Qn || Y * Hn + N * un + rn * bn + tn < -Qn || E * Hn + _ * un + _n * bn + X < -Qn) continue;
        t[++a] = D;
      } else
        t[++a] = D;
  }
  e[0] = s, t[0] = a;
}
function S2(n, r, e) {
  const t = e, s = t[0], a = t[1], i = t[2], c = t[3], l = t[4], h = t[5], f = t[6], v = t[7], o = t[8], M = t[9], d = t[10], m = t[11], y = t[12], p = t[13], z = t[14], w = t[15];
  let x = 0;
  const b = n[0] + 1;
  for (let g = 1; g < b; g++) {
    const j = n[g], R = r[j], A = R.transform.worldMatrix, $ = R.meshRenderer;
    if ($ && $.enabled && $.bounds) {
      const L = $.bounds;
      let F = 63;
      for (let q = 0; q < 24; q += 3) {
        const O = L[q], T = L[q + 1], Z = L[q + 2], V = A[0] * O + A[4] * T + A[8] * Z + A[12], Cn = A[1] * O + A[5] * T + A[9] * Z + A[13], S = A[2] * O + A[6] * T + A[10] * Z + A[14], Pn = s * V + l * Cn + o * S + y, Un = a * V + h * Cn + M * S + p, Bn = i * V + f * Cn + d * S + z, Y = c * V + v * Cn + m * S + w;
        let N = 0;
        Pn < -Y && (N |= 1), Pn > Y && (N |= 2), Un < -Y && (N |= 4), Un > Y && (N |= 8), Bn < -Y && (N |= 16), Bn > Y && (N |= 32), F &= N;
      }
      F === 0 && (n[++x] = j);
    } else {
      const L = A[12], F = A[13], q = A[14], O = s * L + l * F + o * q + y, T = a * L + h * F + M * q + p, Z = i * L + f * F + d * q + z, V = c * L + v * F + m * q + w;
      O >= -V && O <= V && T >= -V && T <= V && Z >= -V && Z <= V && (n[++x] = j);
    }
  }
  n[0] = x;
}
let te = 0;
function O2(n, r, e, t, s, a, i, c, l, h, f, v, o, M, d, m, y, p, z, w, x, b) {
  let g = 0, j = 0;
  for (let R = 0; R < r; R++) {
    const A = n[R];
    if (A.constructor !== Gn) continue;
    ++te;
    const $ = A.gameObject.transform.worldMatrix;
    y1(o, f, $), y1(v, h, $);
    const L = o[0], F = o[1], q = o[2], O = o[3], T = o[4], Z = o[5], V = o[6], Cn = o[7], S = o[8], Pn = o[9], Un = o[10], Bn = o[11], Y = o[12], N = o[13], rn = o[14], tn = o[15], E = A.faces, _ = A.vertices, _n = A.faceNormals, X = A.vertexNormals;
    A2(M, $);
    const Kn = M, D = Kn[0], mn = Kn[1], I = Kn[2], Hn = Kn[3], un = Kn[4], bn = Kn[5], Yn = Kn[6], sr = Kn[7], ar = Kn[8], Qn = E.length;
    for (let ir = 0; ir < Qn; ir += 3) {
      const vr = E[ir], or = E[ir + 1], pn = E[ir + 2], nr = vr << 2, Tr = or << 2, Sr = pn << 2;
      if (b[vr] !== te) {
        const C = vr * 3, k = _[C], Q = _[C + 1], J = _[C + 2];
        t[nr] = L * k + T * Q + S * J + Y, t[nr + 1] = F * k + Z * Q + Pn * J + N, t[nr + 2] = q * k + V * Q + Un * J + rn, t[nr + 3] = O * k + Cn * Q + Bn * J + tn, b[vr] = te, x[vr] = -1;
      }
      if (b[or] !== te) {
        const C = or * 3, k = _[C], Q = _[C + 1], J = _[C + 2];
        t[Tr] = L * k + T * Q + S * J + Y, t[Tr + 1] = F * k + Z * Q + Pn * J + N, t[Tr + 2] = q * k + V * Q + Un * J + rn, t[Tr + 3] = O * k + Cn * Q + Bn * J + tn, b[or] = te, x[or] = -1;
      }
      if (b[pn] !== te) {
        const C = pn * 3, k = _[C], Q = _[C + 1], J = _[C + 2];
        t[Sr] = L * k + T * Q + S * J + Y, t[Sr + 1] = F * k + Z * Q + Pn * J + N, t[Sr + 2] = q * k + V * Q + Un * J + rn, t[Sr + 3] = O * k + Cn * Q + Bn * J + tn, b[pn] = te, x[pn] = -1;
      }
      const Jr = t[nr], Kr = t[nr + 1], oe = t[nr + 2], Lr = t[nr + 3], yr = t[Tr], mr = t[Tr + 1], rr = t[Tr + 2], wn = t[Tr + 3], kn = t[Sr], En = t[Sr + 1], cr = t[Sr + 2], vn = t[Sr + 3];
      if (Jr < -Lr && yr < -wn && kn < -vn || Jr > Lr && yr > wn && kn > vn || Kr < -Lr && mr < -wn && En < -vn || Kr > Lr && mr > wn && En > vn || oe < -Lr && rr < -wn && cr < -vn || oe > Lr && rr > wn && cr > vn) continue;
      const An = 1 / Lr, zn = 1 / wn, Mr = 1 / vn, Vn = Jr * An, xn = Kr * An, tr = yr * zn, en = mr * zn, lr = kn * Mr, Fn = En * Mr;
      if ((tr - Vn) * (Fn - xn) - (en - xn) * (lr - Vn) > 0) continue;
      const K = vr * 3, sn = or * 3, Mn = pn * 3;
      s[g] = g, z[g] = R, w[g] = ir;
      const In = _n[ir], dn = _n[ir + 1], G = _n[ir + 2], U = In * D + dn * Hn + G * Yn, ln = In * mn + dn * un + G * sr, an = In * I + dn * bn + G * ar, on = Math.sqrt(U * U + ln * ln + an * an), B = on > 0 ? 1 / on : 0, $n = ir / 3 | 0, hn = A.faceColors[$n % A.faceColors.length];
      if (i[g] = A.colors[hn], c[g] = A.shaderType, x[vr] === -1) {
        const C = j * 3;
        Ue(
          e,
          K,
          _[K],
          _[K + 1],
          _[K + 2],
          v
        ), y[C] = Vn, y[C + 1] = -xn, x[vr] = C, j++;
        const k = vr * 3, Q = X[k] * D + X[k + 1] * Hn + X[k + 2] * Yn, J = X[k] * mn + X[k + 1] * un + X[k + 2] * sr, Rn = X[k] * I + X[k + 1] * bn + X[k + 2] * ar, Xn = Math.sqrt(Q * Q + J * J + Rn * Rn), Ln = Xn > 0 ? 1 / Xn : 0;
        m[C] = Q * Ln, m[C + 1] = J * Ln, m[C + 2] = Rn * Ln;
      }
      if (p[g * 3] = x[vr], x[or] === -1) {
        const C = j * 3;
        Ue(
          e,
          sn,
          _[sn],
          _[sn + 1],
          _[sn + 2],
          v
        ), y[C] = tr, y[C + 1] = -en, x[or] = C, j++;
        const k = or * 3, Q = X[k] * D + X[k + 1] * Hn + X[k + 2] * Yn, J = X[k] * mn + X[k + 1] * un + X[k + 2] * sr, Rn = X[k] * I + X[k + 1] * bn + X[k + 2] * ar, Xn = Math.sqrt(Q * Q + J * J + Rn * Rn), Ln = Xn > 0 ? 1 / Xn : 0;
        m[C] = Q * Ln, m[C + 1] = J * Ln, m[C + 2] = Rn * Ln;
      }
      if (p[g * 3 + 1] = x[or], x[pn] === -1) {
        const C = j * 3;
        Ue(
          e,
          Mn,
          _[Mn],
          _[Mn + 1],
          _[Mn + 2],
          v
        ), y[C] = lr, y[C + 1] = -Fn, x[pn] = C, j++;
        const k = pn * 3, Q = X[k] * D + X[k + 1] * Hn + X[k + 2] * Yn, J = X[k] * mn + X[k + 1] * un + X[k + 2] * sr, Rn = X[k] * I + X[k + 1] * bn + X[k + 2] * ar, Xn = Math.sqrt(Q * Q + J * J + Rn * Rn), Ln = Xn > 0 ? 1 / Xn : 0;
        m[C] = Q * Ln, m[C + 1] = J * Ln, m[C + 2] = Rn * Ln;
      }
      p[g * 3 + 2] = x[pn];
      const fn = g * 9;
      l[fn] = e[K], l[fn + 1] = e[K + 1];
      const u = l[fn + 2] = e[K + 2];
      l[fn + 3] = e[sn], l[fn + 4] = e[sn + 1];
      const Dn = l[fn + 5] = e[sn + 2];
      l[fn + 6] = e[Mn], l[fn + 7] = e[Mn + 1];
      const pr = l[fn + 8] = e[Mn + 2];
      a[g] = (u + Dn + pr) * 0.33333;
      const jn = g * 3;
      d[jn] = U * B, d[jn + 1] = ln * B, d[jn + 2] = an * B, g++;
    }
  }
  return g;
}
function F2(n, r, e, t, s, a, i, c, l, h, f, v, o, M, d, m, y, p, z, w, x, b, g, j, R, A, $, L) {
  const F = h * 0.5, q = f * 0.5, O = c + i;
  l && n.clearRect(0, 0, n.canvas.width, n.canvas.height);
  let T = -1, Z = -1, V = -1;
  for (let Cn = c; Cn < O; Cn++) {
    const S = t[Cn], Pn = e[S * 3], Un = e[S * 3 + 1], Bn = e[S * 3 + 2], Y = r[Pn] * F + F, N = r[Pn + 1] * q + q, rn = r[Un] * F + F, tn = r[Un + 1] * q + q, E = r[Bn] * F + F, _ = r[Bn + 1] * q + q, _n = (Y + rn + E) * 0.33333, X = (N + tn + _) * 0.33333, Kn = Y - _n, D = N - X, mn = Math.abs(Kn), I = Math.abs(D), Hn = mn > I ? mn + 0.4 * I : I + 0.4 * mn, un = Hn > 0 ? Ve / Hn : 0, bn = Y + Kn * un, Yn = N + D * un, sr = rn - _n, ar = tn - X, Qn = Math.abs(sr), ir = Math.abs(ar), vr = Qn > ir ? Qn + 0.4 * ir : ir + 0.4 * Qn, or = vr > 0 ? Ve / vr : 0, pn = rn + sr * or, nr = tn + ar * or, Tr = E - _n, Sr = _ - X, Jr = Math.abs(Tr), Kr = Math.abs(Sr), oe = Jr > Kr ? Jr + 0.4 * Kr : Kr + 0.4 * Jr, Lr = oe > 0 ? Ve / oe : 0, yr = E + Tr * Lr, mr = _ + Sr * Lr;
    switch (A ? 3 : a[S]) {
      case 0: {
        const rr = s[S];
        let wn = rr >>> 16, kn = rr >>> 8 & 255, En = rr & 255, cr = w >>> 16 & 255, vn = w >>> 8 & 255, An = w & 255;
        const zn = x[S * 3], Mr = x[S * 3 + 1], Vn = x[S * 3 + 2], xn = $[0] + 1;
        for (let G = 1; G < xn; G++) {
          const U = L[$[G]];
          if (U.light.type === 0) {
            const ln = -U.transform.worldMatrix[8], an = -U.transform.worldMatrix[9], on = -U.transform.worldMatrix[10], B = zn * ln + Mr * an + Vn * on;
            B > 0 && (cr += (U.light.color >>> 16 & 255) * B, vn += (U.light.color >>> 8 & 255) * B, An += (U.light.color & 255) * B);
          }
        }
        cr *= 39215e-7, vn *= 39215e-7, An *= 39215e-7, wn = wn * cr | 0, kn = kn * vn | 0, En = En * An | 0, wn = wn > 255 ? 255 : wn, kn = kn > 255 ? 255 : kn, En = En > 255 ? 255 : En;
        const tr = o[S];
        let en = 0;
        if (M === nn.FogType.RADIAL_FAST || M === nn.FogType.RADIAL) {
          const G = v[S * 9], U = v[S * 9 + 1], ln = v[S * 9 + 2], an = v[S * 9 + 3], on = v[S * 9 + 4], B = v[S * 9 + 5], $n = v[S * 9 + 6], hn = v[S * 9 + 7], fn = v[S * 9 + 8], u = (G + an + $n) * 0.33333, Dn = (U + on + hn) * 0.33333, pr = (ln + B + fn) * 0.33333;
          if (M === nn.FogType.RADIAL_FAST) {
            const jn = m * m, k = 1 / (y * y - jn);
            en = (u * u + Dn * Dn + pr * pr - jn) * k;
          } else
            en = (Math.sqrt(u * u + Dn * Dn + pr * pr) - m) / (y - m);
        } else M === nn.FogType.LINEAR && (en = (tr - m) / (y - m));
        if (en > 1 && (en = 1), en > 0) {
          const G = d >>> 16, U = d >>> 8 & 255, ln = d & 255;
          wn = wn * (1 - en) + G * en | 0, kn = kn * (1 - en) + U * en | 0, En = En * (1 - en) + ln * en | 0;
        }
        const lr = g[S], Fn = R[lr], K = Fn.textureImage;
        if (K && K.complete && K.naturalWidth > 0 && Fn.uvs) {
          const G = j[S], U = Fn.uvs, ln = Fn.faces[G] * 2, an = Fn.faces[G + 1] * 2, on = Fn.faces[G + 2] * 2, B = U[ln] * K.width, $n = U[ln + 1] * K.height, hn = U[an] * K.width, fn = U[an + 1] * K.height, u = U[on] * K.width, Dn = U[on + 1] * K.height, pr = B * (fn - Dn) - $n * (hn - u) + (hn * Dn - u * fn);
          if (Math.abs(pr) > 1e-5) {
            const jn = 1 / pr, C = (Y * (fn - Dn) + rn * (Dn - $n) + E * ($n - fn)) * jn, k = (Y * (u - hn) + rn * (B - u) + E * (hn - B)) * jn, Q = (Y * (hn * Dn - u * fn) + rn * (u * $n - B * Dn) + E * (B * fn - hn * $n)) * jn, J = (N * (fn - Dn) + tn * (Dn - $n) + _ * ($n - fn)) * jn, Rn = (N * (u - hn) + tn * (B - u) + _ * (hn - B)) * jn, Xn = (N * (hn * Dn - u * fn) + tn * (u * $n - B * Dn) + _ * (B * fn - hn * $n)) * jn;
            n.save(), n.beginPath(), n.moveTo(bn, Yn), n.lineTo(pn, nr), n.lineTo(yr, mr), n.closePath(), n.clip(), n.setTransform(C, J, k, Rn, Q, Xn), n.drawImage(K, 0, 0), n.restore();
            const Ln = cr >= 1 ? 255 : cr * 255 | 0, hr = vn >= 1 ? 255 : vn * 255 | 0, Dr = An >= 1 ? 255 : An * 255 | 0, Wr = Ln & 248, Pr = hr & 252, Me = Dr & 248, ie = Wr << 8 | Pr << 3 | Me >> 3;
            if (n.globalCompositeOperation = "multiply", T !== ie && (n.fillStyle = Wn[ie], T = ie), n.fill(), n.globalCompositeOperation = "source-over", en > 0) {
              const Or = d >>> 16, Fr = d >>> 8 & 255, Cr = d & 255, Ur = Or & 248, ur = Fr & 252, ne = Cr & 248, fr = Ur << 8 | ur << 3 | ne >> 3;
              n.globalAlpha = en, Z !== fr && (n.strokeStyle = Wn[fr], Z = fr), V !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", V = 10), n.stroke(), T !== fr && (n.fillStyle = Wn[fr], T = fr), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(Y, N), n.lineTo(rn, tn), n.lineTo(E, _), n.closePath();
        const sn = wn & 248, Mn = kn & 252, In = En & 248, dn = sn << 8 | Mn << 3 | In >> 3;
        Z !== dn && (n.strokeStyle = Wn[dn], Z = dn), V !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", V = 10), n.stroke(), T !== dn && (n.fillStyle = Wn[dn], T = dn), n.fill();
        break;
      }
      case 1: {
        const rr = s[S];
        let wn = rr >>> 16, kn = rr >>> 8 & 255, En = rr & 255;
        const cr = o[S];
        let vn = 0;
        if (M === nn.FogType.RADIAL_FAST || M === nn.FogType.RADIAL) {
          const K = v[S * 9], sn = v[S * 9 + 1], Mn = v[S * 9 + 2], In = v[S * 9 + 3], dn = v[S * 9 + 4], G = v[S * 9 + 5], U = v[S * 9 + 6], ln = v[S * 9 + 7], an = v[S * 9 + 8], on = (K + In + U) * 0.33333, B = (sn + dn + ln) * 0.33333, $n = (Mn + G + an) * 0.33333;
          if (M === nn.FogType.RADIAL_FAST) {
            const hn = m * m, u = 1 / (y * y - hn);
            vn = (on * on + B * B + $n * $n - hn) * u;
          } else
            vn = (Math.sqrt(on * on + B * B + $n * $n) - m) / (y - m);
        } else M === nn.FogType.LINEAR && (vn = (cr - m) / (y - m));
        let zn = Math.max(0, vn - 0);
        if (zn > 1 && (zn = 1), zn > 0) {
          const K = d >>> 16, sn = d >>> 8 & 255, Mn = d & 255;
          wn = wn * (1 - zn) + K * zn | 0, kn = kn * (1 - zn) + sn * zn | 0, En = En * (1 - zn) + Mn * zn | 0;
        }
        const Mr = g[S], Vn = R[Mr], xn = Vn.textureImage;
        if (xn && xn.complete && xn.naturalWidth > 0 && Vn.uvs) {
          const K = j[S], sn = Vn.uvs, Mn = Vn.faces[K] * 2, In = Vn.faces[K + 1] * 2, dn = Vn.faces[K + 2] * 2, G = sn[Mn] * xn.width, U = sn[Mn + 1] * xn.height, ln = sn[In] * xn.width, an = sn[In + 1] * xn.height, on = sn[dn] * xn.width, B = sn[dn + 1] * xn.height, $n = G * (an - B) - U * (ln - on) + (ln * B - on * an);
          if (Math.abs($n) > 1e-5) {
            const hn = 1 / $n, fn = (Y * (an - B) + rn * (B - U) + E * (U - an)) * hn, u = (Y * (on - ln) + rn * (G - on) + E * (ln - G)) * hn, Dn = (Y * (ln * B - on * an) + rn * (on * U - G * B) + E * (G * an - ln * U)) * hn, pr = (N * (an - B) + tn * (B - U) + _ * (U - an)) * hn, jn = (N * (on - ln) + tn * (G - on) + _ * (ln - G)) * hn, C = (N * (ln * B - on * an) + tn * (on * U - G * B) + _ * (G * an - ln * U)) * hn;
            if (n.save(), n.beginPath(), n.moveTo(bn, Yn), n.lineTo(pn, nr), n.lineTo(yr, mr), n.closePath(), n.clip(), n.setTransform(fn, pr, u, jn, Dn, C), n.drawImage(xn, 0, 0), n.restore(), zn > 0) {
              const k = d >>> 16, Q = d >>> 8 & 255, J = d & 255, Rn = k & 248, Xn = Q & 252, Ln = J & 248, hr = Rn << 8 | Xn << 3 | Ln >> 3;
              n.globalAlpha = zn, Z !== hr && (n.strokeStyle = Wn[hr], Z = hr), V !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", V = 10), n.stroke(), T !== hr && (n.fillStyle = Wn[hr], T = hr), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(bn, Yn), n.lineTo(pn, nr), n.lineTo(yr, mr), n.closePath();
        const tr = wn & 248, en = kn & 252, lr = En & 248, Fn = tr << 8 | en << 3 | lr >> 3;
        T !== Fn && (n.fillStyle = Wn[Fn], T = Fn), n.fill();
        break;
      }
      case 2: {
        const rr = s[S];
        let wn = rr >>> 16, kn = rr >>> 8 & 255, En = rr & 255;
        const cr = g[S], vn = R[cr], An = vn.textureImage;
        if (An && An.complete && An.naturalWidth > 0 && vn.uvs) {
          const tr = j[S], en = vn.uvs, lr = vn.faces[tr] * 2, Fn = vn.faces[tr + 1] * 2, K = vn.faces[tr + 2] * 2, sn = en[lr] * An.width, Mn = en[lr + 1] * An.height, In = en[Fn] * An.width, dn = en[Fn + 1] * An.height, G = en[K] * An.width, U = en[K + 1] * An.height, ln = sn * (dn - U) - Mn * (In - G) + (In * U - G * dn);
          if (Math.abs(ln) > 1e-5) {
            const an = 1 / ln, on = (Y * (dn - U) + rn * (U - Mn) + E * (Mn - dn)) * an, B = (Y * (G - In) + rn * (sn - G) + E * (In - sn)) * an, $n = (Y * (In * U - G * dn) + rn * (G * Mn - sn * U) + E * (sn * dn - In * Mn)) * an, hn = (N * (dn - U) + tn * (U - Mn) + _ * (Mn - dn)) * an, fn = (N * (G - In) + tn * (sn - G) + _ * (In - sn)) * an, u = (N * (In * U - G * dn) + tn * (G * Mn - sn * U) + _ * (sn * dn - In * Mn)) * an;
            n.save(), n.beginPath(), n.moveTo(bn, Yn), n.lineTo(pn, nr), n.lineTo(yr, mr), n.closePath(), n.clip(), n.setTransform(on, hn, B, fn, $n, u), n.drawImage(An, 0, 0), n.restore();
            break;
          }
        }
        n.beginPath(), n.moveTo(bn, Yn), n.lineTo(pn, nr), n.lineTo(yr, mr), n.closePath();
        const zn = wn & 248, Mr = kn & 252, Vn = En & 248, xn = zn << 8 | Mr << 3 | Vn >> 3;
        T !== xn && (n.fillStyle = Wn[xn], T = xn), n.fill();
        break;
      }
      case 3: {
        n.beginPath(), n.moveTo(Y, N), n.lineTo(rn, tn), n.lineTo(E, _), n.closePath(), Z !== 31 && (n.strokeStyle = Wn[31], Z = 31), V !== 5 && (n.lineWidth = 0.5, n.lineJoin = "miter", V = 5), n.stroke();
        break;
      }
      case 4: {
        const rr = s[S], wn = rr >>> 16, kn = rr >>> 8 & 255, En = rr & 255;
        let cr = w >>> 16, vn = w >>> 8 & 255, An = w & 255, zn = cr, Mr = vn, Vn = An, xn = cr, tr = vn, en = An, lr = cr, Fn = vn, K = An, sn = b[Pn], Mn = b[Pn + 1], In = b[Pn + 2], dn = b[Un], G = b[Un + 1], U = b[Un + 2], ln = b[Bn], an = b[Bn + 1], on = b[Bn + 2];
        const B = $[0] + 1;
        for (let W = 1; W < B; W++) {
          const Zn = L[$[W]];
          if (Zn.light.type === 0) {
            const br = Zn.light.color >>> 16, zr = Zn.light.color >>> 8 & 255, xr = Zn.light.color & 255, qn = -Zn.transform.worldMatrix[8], Tn = -Zn.transform.worldMatrix[9], Jn = -Zn.transform.worldMatrix[10];
            let Nn = sn * qn + Mn * Tn + In * Jn, Sn = dn * qn + G * Tn + U * Jn, On = ln * qn + an * Tn + on * Jn;
            Nn > 0 && (zn += br * Nn, Mr += zr * Nn, Vn += xr * Nn), Sn > 0 && (xn += br * Sn, tr += zr * Sn, en += xr * Sn), On > 0 && (lr += br * On, Fn += zr * On, K += xr * On);
          }
        }
        zn *= 39215e-7, Mr *= 39215e-7, Vn *= 39215e-7, xn *= 39215e-7, tr *= 39215e-7, en *= 39215e-7, lr *= 39215e-7, Fn *= 39215e-7, K *= 39215e-7;
        let $n = Math.min(Math.max(zn, Mr, Vn), 1), hn = Math.min(Math.max(xn, tr, en), 1), fn = Math.min(Math.max(lr, Fn, K), 1), u = 0;
        const Dn = o[S];
        if (M === nn.FogType.RADIAL_FAST || M === nn.FogType.RADIAL) {
          const W = v[S * 9], Zn = v[S * 9 + 1], br = v[S * 9 + 2], zr = v[S * 9 + 3], xr = v[S * 9 + 4], qn = v[S * 9 + 5], Tn = v[S * 9 + 6], Jn = v[S * 9 + 7], Nn = v[S * 9 + 8], Sn = (W + zr + Tn) * 0.33333, On = (Zn + xr + Jn) * 0.33333, Br = (br + qn + Nn) * 0.33333;
          if (M === nn.FogType.RADIAL_FAST) {
            const gr = m * m, Pe = 1 / (y * y - gr);
            u = (Sn * Sn + On * On + Br * Br - gr) * Pe;
          } else
            u = (Math.sqrt(Sn * Sn + On * On + Br * Br) - m) / (y - m);
        } else M === nn.FogType.LINEAR && (u = (Dn - m) / (y - m));
        u > 1 && (u = 1);
        const pr = g[S], jn = R[pr], C = jn.textureImage;
        if (C && C.complete && C.naturalWidth > 0 && jn.uvs) {
          const W = j[S], Zn = jn.uvs, br = jn.faces[W] * 2, zr = jn.faces[W + 1] * 2, xr = jn.faces[W + 2] * 2, qn = Zn[br] * C.width, Tn = Zn[br + 1] * C.height, Jn = Zn[zr] * C.width, Nn = Zn[zr + 1] * C.height, Sn = Zn[xr] * C.width, On = Zn[xr + 1] * C.height, Br = qn * (Nn - On) - Tn * (Jn - Sn) + (Jn * On - Sn * Nn);
          if (Math.abs(Br) > 1e-5) {
            const gr = 1 / Br, h1 = (Y * (Nn - On) + rn * (On - Tn) + E * (Tn - Nn)) * gr, Pe = (Y * (Sn - Jn) + rn * (qn - Sn) + E * (Jn - qn)) * gr, f1 = (Y * (Jn * On - Sn * Nn) + rn * (Sn * Tn - qn * On) + E * (qn * Nn - Jn * Tn)) * gr, Ut = (N * (Nn - On) + tn * (On - Tn) + _ * (Tn - Nn)) * gr, Vt = (N * (Sn - Jn) + tn * (qn - Sn) + _ * (Jn - qn)) * gr, Nt = (N * (Jn * On - Sn * Nn) + tn * (Sn * Tn - qn * On) + _ * (qn * Nn - Jn * Tn)) * gr;
            n.save(), n.beginPath(), n.moveTo(bn, Yn), n.lineTo(pn, nr), n.lineTo(yr, mr), n.closePath(), n.clip(), n.setTransform(h1, Ut, Pe, Vt, f1, Nt), n.drawImage(C, 0, 0), n.restore();
            const Yt = zn >= 1 ? 255 : zn * 255 | 0, Xt = Mr >= 1 ? 255 : Mr * 255 | 0, Zt = Vn >= 1 ? 255 : Vn * 255 | 0, Gt = xn >= 1 ? 255 : xn * 255 | 0, Bt = tr >= 1 ? 255 : tr * 255 | 0, Ht = en >= 1 ? 255 : en * 255 | 0, Qt = lr >= 1 ? 255 : lr * 255 | 0, Jt = Fn >= 1 ? 255 : Fn * 255 | 0, Kt = K >= 1 ? 255 : K * 255 | 0, ut = (Yt & 248) << 8 | (Xt & 252) << 3 | (Zt & 248) >> 3, n0 = (Gt & 248) << 8 | (Bt & 252) << 3 | (Ht & 248) >> 3, r0 = (Qt & 248) << 8 | (Jt & 252) << 3 | (Kt & 248) >> 3;
            let Vr = Y, Nr = N, re = rn, ee = tn, ye = E, me = _, Yr = $n, kr = hn, pe = fn, Xr = ut, Hr = n0, ge = r0;
            if (Yr > kr) {
              let cn;
              cn = Vr, Vr = re, re = cn, cn = Nr, Nr = ee, ee = cn, cn = Yr, Yr = kr, kr = cn, cn = Xr, Xr = Hr, Hr = cn;
            }
            if (kr > pe) {
              let cn;
              cn = re, re = ye, ye = cn, cn = ee, ee = me, me = cn, cn = kr, kr = pe, pe = cn, cn = Hr, Hr = ge, ge = cn;
            }
            if (Yr > kr) {
              let cn;
              cn = Vr, Vr = re, re = cn, cn = Nr, Nr = ee, ee = cn, cn = Yr, Yr = kr, kr = cn, cn = Xr, Xr = Hr, Hr = cn;
            }
            if (n.globalCompositeOperation = "multiply", pe - Yr < 0.01 || Xr === Hr && Hr === ge)
              T !== Xr && (n.fillStyle = Wn[Xr], T = Xr), n.beginPath(), n.moveTo(bn, Yn), n.lineTo(pn, nr), n.lineTo(yr, mr), n.closePath(), n.fill();
            else {
              const cn = (kr - Yr) / (pe - Yr), _e = Vr + cn * (ye - Vr), ke = Nr + cn * (me - Nr), Ee = re - _e, le = -(ee - ke), jr = Ee, o1 = le * le + jr * jr;
              let De, We;
              if (o1 < 1e-6)
                De = ye, We = me;
              else {
                const M1 = ((ye - Vr) * le + (me - Nr) * jr) / o1;
                De = Vr + M1 * le, We = Nr + M1 * jr;
              }
              const Ce = n.createLinearGradient(Vr, Nr, De, We);
              Ce.addColorStop(0, Wn[Xr]), Ce.addColorStop(1, Wn[ge]), T = -1, n.fillStyle = Ce, n.beginPath(), n.moveTo(bn, Yn), n.lineTo(pn, nr), n.lineTo(yr, mr), n.closePath(), n.fill();
            }
            if (n.globalCompositeOperation = "source-over", u > 0) {
              const cn = d >>> 16, _e = d >>> 8 & 255, ke = d & 255, Ee = cn & 248, v1 = _e & 252, le = ke & 248, jr = Ee << 8 | v1 << 3 | le >> 3;
              n.globalAlpha = u, Z !== jr && (n.strokeStyle = Wn[jr], Z = jr), V !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", V = 10), n.stroke(), T !== jr && (n.fillStyle = Wn[jr], T = jr), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        let k = wn * zn, Q = kn * Mr, J = En * Vn, Rn = wn * xn, Xn = kn * tr, Ln = En * en, hr = wn * lr, Dr = kn * Fn, Wr = En * K;
        if (k = k > 255 ? 255 : k, Q = Q > 255 ? 255 : Q, J = J > 255 ? 255 : J, Rn = Rn > 255 ? 255 : Rn, Xn = Xn > 255 ? 255 : Xn, Ln = Ln > 255 ? 255 : Ln, hr = hr > 255 ? 255 : hr, Dr = Dr > 255 ? 255 : Dr, Wr = Wr > 255 ? 255 : Wr, u > 0) {
          const W = 1 - u, Zn = d >>> 16, br = d >>> 8 & 255, zr = d & 255, xr = Zn * u, qn = br * u, Tn = zr * u;
          k = k * W + xr | 0, Q = Q * W + qn | 0, J = J * W + Tn | 0, Rn = Rn * W + xr | 0, Xn = Xn * W + qn | 0, Ln = Ln * W + Tn | 0, hr = hr * W + xr | 0, Dr = Dr * W + qn | 0, Wr = Wr * W + Tn | 0;
        } else
          k |= 0, Q |= 0, J |= 0, Rn |= 0, Xn |= 0, Ln |= 0, hr |= 0, Dr |= 0, Wr |= 0;
        const Pr = (k & 248) << 8 | (Q & 252) << 3 | (J & 248) >> 3, Me = (Rn & 248) << 8 | (Xn & 252) << 3 | (Ln & 248) >> 3, ie = (hr & 248) << 8 | (Dr & 252) << 3 | (Wr & 248) >> 3;
        if (Pr === Me && Me === ie) {
          n.beginPath(), n.moveTo(Y, N), n.lineTo(rn, tn), n.lineTo(E, _), n.closePath(), T !== Pr && (n.fillStyle = Wn[Pr], T = Pr), Z !== Pr && (n.strokeStyle = Wn[Pr], Z = Pr), V !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", V = 10), n.stroke(), n.fill();
          break;
        }
        let Or = Y, Fr = N, Cr = rn, Ur = tn, ur = E, ne = _, fr = $n, _r = hn, de = fn, Ir = Pr, ce = Me, Le = ie;
        if (fr > _r) {
          let W;
          W = Or, Or = Cr, Cr = W, W = Fr, Fr = Ur, Ur = W, W = fr, fr = _r, _r = W, W = Ir, Ir = ce, ce = W;
        }
        if (_r > de) {
          let W;
          W = Cr, Cr = ur, ur = W, W = Ur, Ur = ne, ne = W, W = _r, _r = de, de = W, W = ce, ce = Le, Le = W;
        }
        if (fr > _r) {
          let W;
          W = Or, Or = Cr, Cr = W, W = Fr, Fr = Ur, Ur = W, W = fr, fr = _r, _r = W, W = Ir, Ir = ce, ce = W;
        }
        if (de - fr < 0.01)
          n.beginPath(), n.moveTo(Y, N), n.lineTo(rn, tn), n.lineTo(E, _), n.closePath(), T !== Ir && (n.fillStyle = Wn[Ir], T = Ir), Z !== Ir && (n.strokeStyle = Wn[Ir], Z = Ir), V !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", V = 10), n.stroke(), n.fill();
        else {
          const W = (_r - fr) / (de - fr), Zn = Or + W * (ur - Or), br = Fr + W * (ne - Fr), zr = Cr - Zn, qn = -(Ur - br), Tn = zr, Jn = qn * qn + Tn * Tn;
          let Nn, Sn;
          if (Jn < 1e-6)
            Nn = ur, Sn = ne;
          else {
            const gr = ((ur - Or) * qn + (ne - Fr) * Tn) / Jn;
            Nn = Or + gr * qn, Sn = Fr + gr * Tn;
          }
          const On = n.createLinearGradient(Or, Fr, Nn, Sn);
          On.addColorStop(0, Wn[Ir]), On.addColorStop(1, Wn[Le]), T = -1, n.fillStyle = On, n.beginPath(), n.moveTo(bn, Yn), n.lineTo(pn, nr), n.lineTo(yr, mr), n.closePath(), n.fill();
        }
        break;
      }
    }
  }
}
const m1 = Oe;
function Ct(n, r) {
  this.canvas = r || document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new Wt(), this.camera = n, this.layers = [];
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
    frameTime: 0
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
var $r = Ct.prototype;
$r.size = null;
$r.dpr = 1;
$r.scale = 1;
$r.width = null;
$r.height = null;
$r.viewportMatrix = null;
$r.camera = null;
$r.canvas = null;
$r.context = null;
$r.start = function() {
  this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight), this.startRenderLoop();
};
$r.render = function() {
  this.camera !== null && this.renderer.render(this.camera.gameObject, this, this.lastRenderStats);
};
$r.setSize = function(n, r) {
  const e = this.dpr * this.scale, t = n * e, s = r * e;
  this.width = t, this.height = s, this.canvas.width = t, this.canvas.height = s, this.viewportMatrix[0] = t / 2, this.viewportMatrix[5] = -s / 2, this.viewportMatrix[12] = t / 2, this.viewportMatrix[13] = s / 2;
  for (var a = 0; a < this.layers.length; a++) {
    var i = this.layers[a];
    i.canvas.width = t, i.canvas.height = s;
  }
  this.camera.setup(n * this.dpr, r * this.dpr);
};
$r.getWorldToScreen = function() {
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
  yn.call(this);
}
Qr.prototype = Object.create(yn.prototype);
Qr.prototype.constructor = Qr;
Qr.prototype.color = 16777215;
Qr.prototype.range = 10;
Qr.prototype.type = fe.Type.DIRECTIONAL;
Qr.prototype.setGameObject = function(n) {
  yn.prototype.setGameObject.call(this, n), n.light = this;
};
function fe(n) {
  dr.call(this, n || "light"), this.addComponent(this.light = new Qr());
}
fe.prototype = Object.create(dr.prototype);
fe.prototype.constructor = fe;
const j2 = window.scaliaEngine = {
  config: he,
  Game: w1,
  GameObject: dr,
  Component: yn,
  Camera: _t,
  CameraComponent: nn,
  MeshComponent: Gn,
  TransformComponent: Re,
  SpriteRenderer: e1,
  glMatrix: m2,
  PathRenderer: t1,
  TextRenderer: s1,
  Plane: kt,
  Box: Et,
  Cone: Dt,
  Ball: l1,
  Light: fe,
  Canvas2dViewport: Ct
};
export {
  j2 as default
};
