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
function mn() {
}
var Se = mn.prototype;
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
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], o = r[9], M = r[10], d = r[11], y = r[12], m = r[13], p = r[14], z = r[15], w = e[0], x = e[1], b = e[2], g = e[3];
  return n[0] = w * t + x * c + b * v + g * y, n[1] = w * s + x * l + b * o + g * m, n[2] = w * a + x * h + b * M + g * p, n[3] = w * i + x * f + b * d + g * z, w = e[4], x = e[5], b = e[6], g = e[7], n[4] = w * t + x * c + b * v + g * y, n[5] = w * s + x * l + b * o + g * m, n[6] = w * a + x * h + b * M + g * p, n[7] = w * i + x * f + b * d + g * z, w = e[8], x = e[9], b = e[10], g = e[11], n[8] = w * t + x * c + b * v + g * y, n[9] = w * s + x * l + b * o + g * m, n[10] = w * a + x * h + b * M + g * p, n[11] = w * i + x * f + b * d + g * z, w = e[12], x = e[13], b = e[14], g = e[15], n[12] = w * t + x * c + b * v + g * y, n[13] = w * s + x * l + b * o + g * m, n[14] = w * a + x * h + b * M + g * p, n[15] = w * i + x * f + b * d + g * z, n;
}
var _ = 1e-6, B = typeof Float32Array < "u" ? Float32Array : Array, Rr = Math.random, $1 = "zyx";
function Er(n) {
  return n >= 0 ? Math.round(n) : n % 0.5 === 0 ? Math.floor(n) : Math.round(n);
}
function s0(n) {
  B = n;
}
var a0 = Math.PI / 180, i0 = 180 / Math.PI;
function c0(n) {
  return n * a0;
}
function l0(n) {
  return n * i0;
}
function h0(n, r) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _;
  return Math.abs(n - r) <= e * Math.max(1, Math.abs(n), Math.abs(r));
}
const f0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: $1,
  get ARRAY_TYPE() {
    return B;
  },
  EPSILON: _,
  RANDOM: Rr,
  equals: h0,
  round: Er,
  setMatrixArrayType: s0,
  toDegree: l0,
  toRadian: c0
}, Symbol.toStringTag, { value: "Module" }));
function v0() {
  var n = new B(4);
  return B != Float32Array && (n[1] = 0, n[2] = 0), n[0] = 1, n[3] = 1, n;
}
function o0(n) {
  var r = new B(4);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function M0(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n;
}
function d0(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function m0(n, r, e, t) {
  var s = new B(4);
  return s[0] = n, s[1] = r, s[2] = e, s[3] = t, s;
}
function y0(n, r, e, t, s) {
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
  return Math.abs(e - i) <= _ * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(t - c) <= _ * Math.max(1, Math.abs(t), Math.abs(c)) && Math.abs(s - l) <= _ * Math.max(1, Math.abs(s), Math.abs(l)) && Math.abs(a - h) <= _ * Math.max(1, Math.abs(a), Math.abs(h));
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
  fromValues: m0,
  identity: d0,
  invert: x0,
  mul: L0,
  multiply: b1,
  multiplyScalar: j0,
  multiplyScalarAndAdd: R0,
  rotate: $0,
  scale: b0,
  set: y0,
  str: q0,
  sub: P0,
  subtract: z1,
  transpose: p0
}, Symbol.toStringTag, { value: "Module" }));
function k0() {
  var n = new B(6);
  return B != Float32Array && (n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0), n[0] = 1, n[3] = 1, n;
}
function E0(n) {
  var r = new B(6);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r;
}
function D0(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n;
}
function W0(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function C0(n, r, e, t, s, a) {
  var i = new B(6);
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
  return Math.abs(e - l) <= _ * Math.max(1, Math.abs(e), Math.abs(l)) && Math.abs(t - h) <= _ * Math.max(1, Math.abs(t), Math.abs(h)) && Math.abs(s - f) <= _ * Math.max(1, Math.abs(s), Math.abs(f)) && Math.abs(a - v) <= _ * Math.max(1, Math.abs(a), Math.abs(v)) && Math.abs(i - o) <= _ * Math.max(1, Math.abs(i), Math.abs(o)) && Math.abs(c - M) <= _ * Math.max(1, Math.abs(c), Math.abs(M));
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
  var n = new B(9);
  return B != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[0] = 1, n[4] = 1, n[8] = 1, n;
}
function is(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[4], n[4] = r[5], n[5] = r[6], n[6] = r[8], n[7] = r[9], n[8] = r[10], n;
}
function cs(n) {
  var r = new B(9);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r;
}
function ls(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n;
}
function hs(n, r, e, t, s, a, i, c, l) {
  var h = new B(9);
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
function ms(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3], a = n[4], i = n[5], c = n[6], l = n[7], h = n[8];
  return r * (h * a - i * l) + e * (-h * s + i * c) + t * (l * s - a * c);
}
function S1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], o = e[0], M = e[1], d = e[2], y = e[3], m = e[4], p = e[5], z = e[6], w = e[7], x = e[8];
  return n[0] = o * t + M * i + d * h, n[1] = o * s + M * c + d * f, n[2] = o * a + M * l + d * v, n[3] = y * t + m * i + p * h, n[4] = y * s + m * c + p * f, n[5] = y * a + m * l + p * v, n[6] = z * t + w * i + x * h, n[7] = z * s + w * c + x * f, n[8] = z * a + w * l + x * v, n;
}
function ys(n, r, e) {
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
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e + e, c = t + t, l = s + s, h = e * i, f = t * i, v = t * c, o = s * i, M = s * c, d = s * l, y = a * i, m = a * c, p = a * l;
  return n[0] = 1 - v - d, n[3] = f - p, n[6] = o + m, n[1] = f + p, n[4] = 1 - h - d, n[7] = M - y, n[2] = o - m, n[5] = M + y, n[8] = 1 - h - v, n;
}
function As(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], o = r[10], M = r[11], d = r[12], y = r[13], m = r[14], p = r[15], z = e * c - t * i, w = e * l - s * i, x = e * h - a * i, b = t * l - s * c, g = t * h - a * c, R = s * h - a * l, L = f * y - v * d, A = f * m - o * d, $ = f * p - M * d, P = v * m - o * y, j = v * p - M * y, q = o * p - M * m, I = z * q - w * j + x * P + b * $ - g * A + R * L;
  return I ? (I = 1 / I, n[0] = (c * q - l * j + h * P) * I, n[1] = (l * $ - i * q - h * A) * I, n[2] = (i * j - c * $ + h * L) * I, n[3] = (s * j - t * q - a * P) * I, n[4] = (e * q - s * $ + a * A) * I, n[5] = (t * $ - e * j - a * L) * I, n[6] = (y * R - m * g + p * b) * I, n[7] = (m * x - d * R - p * w) * I, n[8] = (d * g - y * x + p * z) * I, n) : null;
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
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = r[0], o = r[1], M = r[2], d = r[3], y = r[4], m = r[5], p = r[6], z = r[7], w = r[8];
  return Math.abs(e - v) <= _ * Math.max(1, Math.abs(e), Math.abs(v)) && Math.abs(t - o) <= _ * Math.max(1, Math.abs(t), Math.abs(o)) && Math.abs(s - M) <= _ * Math.max(1, Math.abs(s), Math.abs(M)) && Math.abs(a - d) <= _ * Math.max(1, Math.abs(a), Math.abs(d)) && Math.abs(i - y) <= _ * Math.max(1, Math.abs(i), Math.abs(y)) && Math.abs(c - m) <= _ * Math.max(1, Math.abs(c), Math.abs(m)) && Math.abs(l - p) <= _ * Math.max(1, Math.abs(l), Math.abs(p)) && Math.abs(h - z) <= _ * Math.max(1, Math.abs(h), Math.abs(z)) && Math.abs(f - w) <= _ * Math.max(1, Math.abs(f), Math.abs(w));
}
var Ls = S1, Ps = O1;
const _s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Os,
  adjoint: ds,
  clone: cs,
  copy: ls,
  create: T1,
  determinant: ms,
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
  translate: ys,
  transpose: os
}, Symbol.toStringTag, { value: "Module" }));
function ks() {
  var n = new B(16);
  return B != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0), n[0] = 1, n[5] = 1, n[10] = 1, n[15] = 1, n;
}
function Es(n) {
  var r = new B(16);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r[9] = n[9], r[10] = n[10], r[11] = n[11], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15], r;
}
function Ds(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n[9] = r[9], n[10] = r[10], n[11] = r[11], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], n;
}
function Ws(n, r, e, t, s, a, i, c, l, h, f, v, o, M, d, y) {
  var m = new B(16);
  return m[0] = n, m[1] = r, m[2] = e, m[3] = t, m[4] = s, m[5] = a, m[6] = i, m[7] = c, m[8] = l, m[9] = h, m[10] = f, m[11] = v, m[12] = o, m[13] = M, m[14] = d, m[15] = y, m;
}
function Cs(n, r, e, t, s, a, i, c, l, h, f, v, o, M, d, y, m) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n[6] = c, n[7] = l, n[8] = h, n[9] = f, n[10] = v, n[11] = o, n[12] = M, n[13] = d, n[14] = y, n[15] = m, n;
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
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], o = r[10], M = r[11], d = r[12], y = r[13], m = r[14], p = r[15], z = e * c - t * i, w = e * l - s * i, x = e * h - a * i, b = t * l - s * c, g = t * h - a * c, R = s * h - a * l, L = f * y - v * d, A = f * m - o * d, $ = f * p - M * d, P = v * m - o * y, j = v * p - M * y, q = o * p - M * m, I = z * q - w * j + x * P + b * $ - g * A + R * L;
  return I ? (I = 1 / I, n[0] = (c * q - l * j + h * P) * I, n[1] = (s * j - t * q - a * P) * I, n[2] = (y * R - m * g + p * b) * I, n[3] = (o * g - v * R - M * b) * I, n[4] = (l * $ - i * q - h * A) * I, n[5] = (e * q - s * $ + a * A) * I, n[6] = (m * x - d * R - p * w) * I, n[7] = (f * R - o * x + M * w) * I, n[8] = (i * j - c * $ + h * L) * I, n[9] = (t * $ - e * j - a * L) * I, n[10] = (d * g - y * x + p * z) * I, n[11] = (v * x - f * g - M * z) * I, n[12] = (c * A - i * P - l * L) * I, n[13] = (e * P - t * A + s * L) * I, n[14] = (y * w - d * b - m * z) * I, n[15] = (f * b - v * w + o * z) * I, n) : null;
}
function Vs(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], o = r[10], M = r[11], d = r[12], y = r[13], m = r[14], p = r[15], z = e * c - t * i, w = e * l - s * i, x = e * h - a * i, b = t * l - s * c, g = t * h - a * c, R = s * h - a * l, L = f * y - v * d, A = f * m - o * d, $ = f * p - M * d, P = v * m - o * y, j = v * p - M * y, q = o * p - M * m;
  return n[0] = c * q - l * j + h * P, n[1] = s * j - t * q - a * P, n[2] = y * R - m * g + p * b, n[3] = o * g - v * R - M * b, n[4] = l * $ - i * q - h * A, n[5] = e * q - s * $ + a * A, n[6] = m * x - d * R - p * w, n[7] = f * R - o * x + M * w, n[8] = i * j - c * $ + h * L, n[9] = t * $ - e * j - a * L, n[10] = d * g - y * x + p * z, n[11] = v * x - f * g - M * z, n[12] = c * A - i * P - l * L, n[13] = e * P - t * A + s * L, n[14] = y * w - d * b - m * z, n[15] = f * b - v * w + o * z, n;
}
function Ns(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3], a = n[4], i = n[5], c = n[6], l = n[7], h = n[8], f = n[9], v = n[10], o = n[11], M = n[12], d = n[13], y = n[14], m = n[15], p = r * i - e * a, z = r * c - t * a, w = e * c - t * i, x = h * d - f * M, b = h * y - v * M, g = f * y - v * d, R = r * g - e * b + t * x, L = a * g - i * b + c * x, A = h * w - f * z + v * p, $ = M * w - d * z + y * p;
  return l * R - s * L + m * A - o * $;
}
function I1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], o = r[9], M = r[10], d = r[11], y = r[12], m = r[13], p = r[14], z = r[15], w = e[0], x = e[1], b = e[2], g = e[3];
  return n[0] = w * t + x * c + b * v + g * y, n[1] = w * s + x * l + b * o + g * m, n[2] = w * a + x * h + b * M + g * p, n[3] = w * i + x * f + b * d + g * z, w = e[4], x = e[5], b = e[6], g = e[7], n[4] = w * t + x * c + b * v + g * y, n[5] = w * s + x * l + b * o + g * m, n[6] = w * a + x * h + b * M + g * p, n[7] = w * i + x * f + b * d + g * z, w = e[8], x = e[9], b = e[10], g = e[11], n[8] = w * t + x * c + b * v + g * y, n[9] = w * s + x * l + b * o + g * m, n[10] = w * a + x * h + b * M + g * p, n[11] = w * i + x * f + b * d + g * z, w = e[12], x = e[13], b = e[14], g = e[15], n[12] = w * t + x * c + b * v + g * y, n[13] = w * s + x * l + b * o + g * m, n[14] = w * a + x * h + b * M + g * p, n[15] = w * i + x * f + b * d + g * z, n;
}
function Ne(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i, c, l, h, f, v, o, M, d, y, m, p;
  return r === n ? (n[12] = r[0] * t + r[4] * s + r[8] * a + r[12], n[13] = r[1] * t + r[5] * s + r[9] * a + r[13], n[14] = r[2] * t + r[6] * s + r[10] * a + r[14], n[15] = r[3] * t + r[7] * s + r[11] * a + r[15]) : (i = r[0], c = r[1], l = r[2], h = r[3], f = r[4], v = r[5], o = r[6], M = r[7], d = r[8], y = r[9], m = r[10], p = r[11], n[0] = i, n[1] = c, n[2] = l, n[3] = h, n[4] = f, n[5] = v, n[6] = o, n[7] = M, n[8] = d, n[9] = y, n[10] = m, n[11] = p, n[12] = i * t + f * s + d * a + r[12], n[13] = c * t + v * s + y * a + r[13], n[14] = l * t + o * s + m * a + r[14], n[15] = h * t + M * s + p * a + r[15]), n;
}
function j1(n, r, e) {
  var t = e[0], s = e[1], a = e[2];
  return n[0] = r[0] * t, n[1] = r[1] * t, n[2] = r[2] * t, n[3] = r[3] * t, n[4] = r[4] * s, n[5] = r[5] * s, n[6] = r[6] * s, n[7] = r[7] * s, n[8] = r[8] * a, n[9] = r[9] * a, n[10] = r[10] * a, n[11] = r[11] * a, n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], n;
}
function Ys(n, r, e, t) {
  var s = t[0], a = t[1], i = t[2], c = Math.sqrt(s * s + a * a + i * i), l, h, f, v, o, M, d, y, m, p, z, w, x, b, g, R, L, A, $, P, j, q, I, O;
  return c < _ ? null : (c = 1 / c, s *= c, a *= c, i *= c, l = Math.sin(e), h = Math.cos(e), f = 1 - h, v = r[0], o = r[1], M = r[2], d = r[3], y = r[4], m = r[5], p = r[6], z = r[7], w = r[8], x = r[9], b = r[10], g = r[11], R = s * s * f + h, L = a * s * f + i * l, A = i * s * f - a * l, $ = s * a * f - i * l, P = a * a * f + h, j = i * a * f + s * l, q = s * i * f + a * l, I = a * i * f - s * l, O = i * i * f + h, n[0] = v * R + y * L + w * A, n[1] = o * R + m * L + x * A, n[2] = M * R + p * L + b * A, n[3] = d * R + z * L + g * A, n[4] = v * $ + y * P + w * j, n[5] = o * $ + m * P + x * j, n[6] = M * $ + p * P + b * j, n[7] = d * $ + z * P + g * j, n[8] = v * q + y * I + w * O, n[9] = o * q + m * I + x * O, n[10] = M * q + p * I + b * O, n[11] = d * q + z * I + g * O, r !== n && (n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n);
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
  return i < _ ? null : (i = 1 / i, t *= i, s *= i, a *= i, c = Math.sin(r), l = Math.cos(r), h = 1 - l, n[0] = t * t * h + l, n[1] = s * t * h + a * c, n[2] = a * t * h - s * c, n[3] = 0, n[4] = t * s * h - a * c, n[5] = s * s * h + l, n[6] = a * s * h + t * c, n[7] = 0, n[8] = t * a * h + s * c, n[9] = s * a * h - t * c, n[10] = a * a * h + l, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n);
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
  var t = r[0], s = r[1], a = r[2], i = r[3], c = t + t, l = s + s, h = a + a, f = t * c, v = t * l, o = t * h, M = s * l, d = s * h, y = a * h, m = i * c, p = i * l, z = i * h;
  return n[0] = 1 - (M + y), n[1] = v + z, n[2] = o - p, n[3] = 0, n[4] = v - z, n[5] = 1 - (f + y), n[6] = d + m, n[7] = 0, n[8] = o + p, n[9] = d - m, n[10] = 1 - (f + M), n[11] = 0, n[12] = e[0], n[13] = e[1], n[14] = e[2], n[15] = 1, n;
}
function na(n, r) {
  var e = new B(3), t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = t * t + s * s + a * a + i * i;
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
  var e = new B(3);
  P1(e, r);
  var t = 1 / e[0], s = 1 / e[1], a = 1 / e[2], i = r[0] * t, c = r[1] * s, l = r[2] * a, h = r[4] * t, f = r[5] * s, v = r[6] * a, o = r[8] * t, M = r[9] * s, d = r[10] * a, y = i + f + d, m = 0;
  return y > 0 ? (m = Math.sqrt(y + 1) * 2, n[3] = 0.25 * m, n[0] = (v - M) / m, n[1] = (o - l) / m, n[2] = (c - h) / m) : i > f && i > d ? (m = Math.sqrt(1 + i - f - d) * 2, n[3] = (v - M) / m, n[0] = 0.25 * m, n[1] = (c + h) / m, n[2] = (o + l) / m) : f > d ? (m = Math.sqrt(1 + f - i - d) * 2, n[3] = (o - l) / m, n[0] = (c + h) / m, n[1] = 0.25 * m, n[2] = (v + M) / m) : (m = Math.sqrt(1 + d - i - f) * 2, n[3] = (c - h) / m, n[0] = (o + l) / m, n[1] = (v + M) / m, n[2] = 0.25 * m), n;
}
function ra(n, r, e, t) {
  r[0] = t[12], r[1] = t[13], r[2] = t[14];
  var s = t[0], a = t[1], i = t[2], c = t[4], l = t[5], h = t[6], f = t[8], v = t[9], o = t[10];
  e[0] = Math.sqrt(s * s + a * a + i * i), e[1] = Math.sqrt(c * c + l * l + h * h), e[2] = Math.sqrt(f * f + v * v + o * o);
  var M = 1 / e[0], d = 1 / e[1], y = 1 / e[2], m = s * M, p = a * d, z = i * y, w = c * M, x = l * d, b = h * y, g = f * M, R = v * d, L = o * y, A = m + x + L, $ = 0;
  return A > 0 ? ($ = Math.sqrt(A + 1) * 2, n[3] = 0.25 * $, n[0] = (b - R) / $, n[1] = (g - z) / $, n[2] = (p - w) / $) : m > x && m > L ? ($ = Math.sqrt(1 + m - x - L) * 2, n[3] = (b - R) / $, n[0] = 0.25 * $, n[1] = (p + w) / $, n[2] = (g + z) / $) : x > L ? ($ = Math.sqrt(1 + x - m - L) * 2, n[3] = (g - z) / $, n[0] = (p + w) / $, n[1] = 0.25 * $, n[2] = (b + R) / $) : ($ = Math.sqrt(1 + L - m - x) * 2, n[3] = (p - w) / $, n[0] = (g + z) / $, n[1] = (b + R) / $, n[2] = 0.25 * $), n;
}
function ea(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = r[3], l = s + s, h = a + a, f = i + i, v = s * l, o = s * h, M = s * f, d = a * h, y = a * f, m = i * f, p = c * l, z = c * h, w = c * f, x = t[0], b = t[1], g = t[2];
  return n[0] = (1 - (d + m)) * x, n[1] = (o + w) * x, n[2] = (M - z) * x, n[3] = 0, n[4] = (o - w) * b, n[5] = (1 - (v + m)) * b, n[6] = (y + p) * b, n[7] = 0, n[8] = (M + z) * g, n[9] = (y - p) * g, n[10] = (1 - (v + d)) * g, n[11] = 0, n[12] = e[0], n[13] = e[1], n[14] = e[2], n[15] = 1, n;
}
function ta(n, r, e, t, s) {
  var a = r[0], i = r[1], c = r[2], l = r[3], h = a + a, f = i + i, v = c + c, o = a * h, M = a * f, d = a * v, y = i * f, m = i * v, p = c * v, z = l * h, w = l * f, x = l * v, b = t[0], g = t[1], R = t[2], L = s[0], A = s[1], $ = s[2], P = (1 - (y + p)) * b, j = (M + x) * b, q = (d - w) * b, I = (M - x) * g, O = (1 - (o + p)) * g, X = (m + z) * g, U = (d + w) * R, Cn = (m - z) * R, F = (1 - (o + y)) * R;
  return n[0] = P, n[1] = j, n[2] = q, n[3] = 0, n[4] = I, n[5] = O, n[6] = X, n[7] = 0, n[8] = U, n[9] = Cn, n[10] = F, n[11] = 0, n[12] = e[0] + L - (P * L + I * A + U * $), n[13] = e[1] + A - (j * L + O * A + Cn * $), n[14] = e[2] + $ - (q * L + X * A + F * $), n[15] = 1, n;
}
function sa(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e + e, c = t + t, l = s + s, h = e * i, f = t * i, v = t * c, o = s * i, M = s * c, d = s * l, y = a * i, m = a * c, p = a * l;
  return n[0] = 1 - v - d, n[1] = f + p, n[2] = o - m, n[3] = 0, n[4] = f - p, n[5] = 1 - h - d, n[6] = M + y, n[7] = 0, n[8] = o + m, n[9] = M - y, n[10] = 1 - h - v, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
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
  var s, a, i, c, l, h, f, v, o, M, d = r[0], y = r[1], m = r[2], p = t[0], z = t[1], w = t[2], x = e[0], b = e[1], g = e[2];
  return Math.abs(d - x) < _ && Math.abs(y - b) < _ && Math.abs(m - g) < _ ? Ze(n) : (f = d - x, v = y - b, o = m - g, M = 1 / Math.sqrt(f * f + v * v + o * o), f *= M, v *= M, o *= M, s = z * o - w * v, a = w * f - p * o, i = p * v - z * f, M = Math.sqrt(s * s + a * a + i * i), M ? (M = 1 / M, s *= M, a *= M, i *= M) : (s = 0, a = 0, i = 0), c = v * i - o * a, l = o * s - f * i, h = f * a - v * s, M = Math.sqrt(c * c + l * l + h * h), M ? (M = 1 / M, c *= M, l *= M, h *= M) : (c = 0, l = 0, h = 0), n[0] = s, n[1] = c, n[2] = f, n[3] = 0, n[4] = a, n[5] = l, n[6] = v, n[7] = 0, n[8] = i, n[9] = h, n[10] = o, n[11] = 0, n[12] = -(s * d + a * y + i * m), n[13] = -(c * d + l * y + h * m), n[14] = -(f * d + v * y + o * m), n[15] = 1, n);
}
function va(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = t[0], l = t[1], h = t[2], f = s - e[0], v = a - e[1], o = i - e[2], M = f * f + v * v + o * o;
  M > 0 && (M = 1 / Math.sqrt(M), f *= M, v *= M, o *= M);
  var d = l * o - h * v, y = h * f - c * o, m = c * v - l * f;
  return M = d * d + y * y + m * m, M > 0 && (M = 1 / Math.sqrt(M), d *= M, y *= M, m *= M), n[0] = d, n[1] = y, n[2] = m, n[3] = 0, n[4] = v * m - o * y, n[5] = o * d - f * m, n[6] = f * y - v * d, n[7] = 0, n[8] = f, n[9] = v, n[10] = o, n[11] = 0, n[12] = s, n[13] = a, n[14] = i, n[15] = 1, n;
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
function ma(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n[6] = r[6] * e, n[7] = r[7] * e, n[8] = r[8] * e, n[9] = r[9] * e, n[10] = r[10] * e, n[11] = r[11] * e, n[12] = r[12] * e, n[13] = r[13] * e, n[14] = r[14] * e, n[15] = r[15] * e, n;
}
function ya(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n[4] = r[4] + e[4] * t, n[5] = r[5] + e[5] * t, n[6] = r[6] + e[6] * t, n[7] = r[7] + e[7] * t, n[8] = r[8] + e[8] * t, n[9] = r[9] + e[9] * t, n[10] = r[10] + e[10] * t, n[11] = r[11] + e[11] * t, n[12] = r[12] + e[12] * t, n[13] = r[13] + e[13] * t, n[14] = r[14] + e[14] * t, n[15] = r[15] + e[15] * t, n;
}
function pa(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5] && n[6] === r[6] && n[7] === r[7] && n[8] === r[8] && n[9] === r[9] && n[10] === r[10] && n[11] === r[11] && n[12] === r[12] && n[13] === r[13] && n[14] === r[14] && n[15] === r[15];
}
function xa(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = n[9], o = n[10], M = n[11], d = n[12], y = n[13], m = n[14], p = n[15], z = r[0], w = r[1], x = r[2], b = r[3], g = r[4], R = r[5], L = r[6], A = r[7], $ = r[8], P = r[9], j = r[10], q = r[11], I = r[12], O = r[13], X = r[14], U = r[15];
  return Math.abs(e - z) <= _ * Math.max(1, Math.abs(e), Math.abs(z)) && Math.abs(t - w) <= _ * Math.max(1, Math.abs(t), Math.abs(w)) && Math.abs(s - x) <= _ * Math.max(1, Math.abs(s), Math.abs(x)) && Math.abs(a - b) <= _ * Math.max(1, Math.abs(a), Math.abs(b)) && Math.abs(i - g) <= _ * Math.max(1, Math.abs(i), Math.abs(g)) && Math.abs(c - R) <= _ * Math.max(1, Math.abs(c), Math.abs(R)) && Math.abs(l - L) <= _ * Math.max(1, Math.abs(l), Math.abs(L)) && Math.abs(h - A) <= _ * Math.max(1, Math.abs(h), Math.abs(A)) && Math.abs(f - $) <= _ * Math.max(1, Math.abs(f), Math.abs($)) && Math.abs(v - P) <= _ * Math.max(1, Math.abs(v), Math.abs(P)) && Math.abs(o - j) <= _ * Math.max(1, Math.abs(o), Math.abs(j)) && Math.abs(M - q) <= _ * Math.max(1, Math.abs(M), Math.abs(q)) && Math.abs(d - I) <= _ * Math.max(1, Math.abs(d), Math.abs(I)) && Math.abs(y - O) <= _ * Math.max(1, Math.abs(y), Math.abs(O)) && Math.abs(m - X) <= _ * Math.max(1, Math.abs(m), Math.abs(X)) && Math.abs(p - U) <= _ * Math.max(1, Math.abs(p), Math.abs(U));
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
  multiplyScalar: ma,
  multiplyScalarAndAdd: ya,
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
  var n = new B(3);
  return B != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n;
}
function $a(n) {
  var r = new B(3);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r;
}
function U1(n) {
  var r = n[0], e = n[1], t = n[2];
  return Math.sqrt(r * r + e * e + t * t);
}
function Ye(n, r, e) {
  var t = new B(3);
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
  return Math.abs(e - a) <= _ * Math.max(1, Math.abs(e), Math.abs(a)) && Math.abs(t - i) <= _ * Math.max(1, Math.abs(t), Math.abs(i)) && Math.abs(s - c) <= _ * Math.max(1, Math.abs(s), Math.abs(c));
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
  var n = new B(4);
  return B != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0), n;
}
function K1(n) {
  var r = new B(4);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function u1(n, r, e, t) {
  var s = new B(4);
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
function mi(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0, n;
}
function yi(n) {
  return "vec4(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
function vt(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3];
}
function pi(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = r[0], c = r[1], l = r[2], h = r[3];
  return Math.abs(e - i) <= _ * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(t - c) <= _ * Math.max(1, Math.abs(t), Math.abs(c)) && Math.abs(s - l) <= _ * Math.max(1, Math.abs(s), Math.abs(l)) && Math.abs(a - h) <= _ * Math.max(1, Math.abs(a), Math.abs(h));
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
  str: yi,
  sub: xi,
  subtract: tt,
  transformMat4: Mi,
  transformQuat: di,
  zero: mi
}, Symbol.toStringTag, { value: "Module" }));
function be() {
  var n = new B(4);
  return B != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n[3] = 1, n;
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
  return t > _ ? (n[0] = r[0] / t, n[1] = r[1] / t, n[2] = r[2] / t) : (n[0] = 1, n[1] = 0, n[2] = 0), e;
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
function mt(n, r, e) {
  e *= 0.5;
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l - a * c, n[1] = s * l + i * c, n[2] = a * l + t * c, n[3] = i * l - s * c, n;
}
function yt(n, r, e) {
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
  var s = r[0], a = r[1], i = r[2], c = r[3], l = e[0], h = e[1], f = e[2], v = e[3], o, M, d, y, m;
  return M = s * l + a * h + i * f + c * v, M < 0 && (M = -M, l = -l, h = -h, f = -f, v = -v), 1 - M > _ ? (o = Math.acos(M), d = Math.sin(o), y = Math.sin((1 - t) * o) / d, m = Math.sin(t * o) / d) : (y = 1 - t, m = t), n[0] = y * s + m * l, n[1] = y * a + m * h, n[2] = y * i + m * f, n[3] = y * c + m * v, n;
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
  return Math.abs(Qe(n, r)) >= 1 - _;
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
  rotateY: mt,
  rotateZ: yt,
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
  var n = new B(8);
  return B != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[3] = 1, n;
}
function Ki(n) {
  var r = new B(8);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r;
}
function ui(n, r, e, t, s, a, i, c) {
  var l = new B(8);
  return l[0] = n, l[1] = r, l[2] = e, l[3] = t, l[4] = s, l[5] = a, l[6] = i, l[7] = c, l;
}
function nc(n, r, e, t, s, a, i) {
  var c = new B(8);
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
  var t = new B(3);
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
  return mt(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + d * t + o * a - M * s, n[5] = o * i + d * s + M * t - v * a, n[6] = M * i + d * a + v * s - o * t, n[7] = d * i - v * t - o * s - M * a, n;
}
function dc(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, o = l * i + f * s + h * t - c * a, M = h * i + f * a + c * s - l * t, d = f * i - c * t - l * s - h * a;
  return yt(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + d * t + o * a - M * s, n[5] = o * i + d * s + M * t - v * a, n[6] = M * i + d * a + v * s - o * t, n[7] = d * i - v * t - o * s - M * a, n;
}
function mc(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = e[3], c = r[0], l = r[1], h = r[2], f = r[3];
  return n[0] = c * i + f * t + l * a - h * s, n[1] = l * i + f * s + h * t - c * a, n[2] = h * i + f * a + c * s - l * t, n[3] = f * i - c * t - l * s - h * a, c = r[4], l = r[5], h = r[6], f = r[7], n[4] = c * i + f * t + l * a - h * s, n[5] = l * i + f * s + h * t - c * a, n[6] = h * i + f * a + c * s - l * t, n[7] = f * i - c * t - l * s - h * a, n;
}
function yc(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return n[0] = t * f + i * c + s * h - a * l, n[1] = s * f + i * l + a * c - t * h, n[2] = a * f + i * h + t * l - s * c, n[3] = i * f - t * c - s * l - a * h, c = e[4], l = e[5], h = e[6], f = e[7], n[4] = t * f + i * c + s * h - a * l, n[5] = s * f + i * l + a * c - t * h, n[6] = a * f + i * h + t * l - s * c, n[7] = i * f - t * c - s * l - a * h, n;
}
function pc(n, r, e, t) {
  if (Math.abs(t) < _)
    return bt(n, r);
  var s = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
  t = t * 0.5;
  var a = Math.sin(t), i = a * e[0] / s, c = a * e[1] / s, l = a * e[2] / s, h = Math.cos(t), f = r[0], v = r[1], o = r[2], M = r[3];
  n[0] = f * h + M * i + v * l - o * c, n[1] = v * h + M * c + o * i - f * l, n[2] = o * h + M * l + f * c - v * i, n[3] = M * h - f * i - v * c - o * l;
  var d = r[4], y = r[5], m = r[6], p = r[7];
  return n[4] = d * h + p * i + y * l - m * c, n[5] = y * h + p * c + m * i - d * l, n[6] = m * h + p * l + d * c - y * i, n[7] = p * h - d * i - y * c - m * l, n;
}
function xc(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n[6] = r[6] + e[6], n[7] = r[7] + e[7], n;
}
function zt(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[4], l = e[5], h = e[6], f = e[7], v = r[4], o = r[5], M = r[6], d = r[7], y = e[0], m = e[1], p = e[2], z = e[3];
  return n[0] = t * z + i * y + s * p - a * m, n[1] = s * z + i * m + a * y - t * p, n[2] = a * z + i * p + t * m - s * y, n[3] = i * z - t * y - s * m - a * p, n[4] = t * f + i * c + s * h - a * l + v * z + d * y + o * p - M * m, n[5] = s * f + i * l + a * c - t * h + o * z + d * m + M * y - v * p, n[6] = a * f + i * h + t * l - s * c + M * z + d * p + v * m - o * y, n[7] = i * f - t * c - s * l - a * h + d * z - v * y - o * m - M * p, n;
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
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = r[0], v = r[1], o = r[2], M = r[3], d = r[4], y = r[5], m = r[6], p = r[7];
  return Math.abs(e - f) <= _ * Math.max(1, Math.abs(e), Math.abs(f)) && Math.abs(t - v) <= _ * Math.max(1, Math.abs(t), Math.abs(v)) && Math.abs(s - o) <= _ * Math.max(1, Math.abs(s), Math.abs(o)) && Math.abs(a - M) <= _ * Math.max(1, Math.abs(a), Math.abs(M)) && Math.abs(i - d) <= _ * Math.max(1, Math.abs(i), Math.abs(d)) && Math.abs(c - y) <= _ * Math.max(1, Math.abs(c), Math.abs(y)) && Math.abs(l - m) <= _ * Math.max(1, Math.abs(l), Math.abs(m)) && Math.abs(h - p) <= _ * Math.max(1, Math.abs(h), Math.abs(p));
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
  rotateByQuatAppend: mc,
  rotateByQuatPrepend: yc,
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
  var n = new B(2);
  return B != Float32Array && (n[0] = 0, n[1] = 0), n;
}
function jc(n) {
  var r = new B(2);
  return r[0] = n[0], r[1] = n[1], r;
}
function Rc(n, r) {
  var e = new B(2);
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
  return Math.abs(e - s) <= _ * Math.max(1, Math.abs(e), Math.abs(s)) && Math.abs(t - a) <= _ * Math.max(1, Math.abs(t), Math.abs(a));
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
const m2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, Symbol.toStringTag, { value: "Module" })), y2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: f0,
  mat2: _0,
  mat2d: as,
  mat3: _s,
  mat4: C1,
  quat: Qi,
  quat2: Ic,
  vec2: m2,
  vec3: ei,
  vec4: Ti
}, Symbol.toStringTag, { value: "Module" })), je = Oe;
function Re() {
  mn.call(this), this.events = {
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
var xn = Re.prototype = Object.create(mn.prototype), wr = new Float32Array([0, 0, 0]), zr = new Float32Array(16);
xn.constructor = Re;
xn.local = null;
xn.worldMatrix = null;
xn.worldToLocal = null;
xn.children = null;
xn.parent = null;
xn.dirtyW = !0;
xn.dirtyL = !0;
xn.onParentUpdate = null;
xn.addChild = function(n) {
  this.children[this.children.length] = n, n.setParent(this);
};
xn.removeChild = function(n) {
  this.children.splice(this.children.indexOf(n), 1), n.removeParent();
};
xn.setParent = function(n) {
  this.parent = n, n.gameObject.world !== null && n.gameObject.world.addGameObject(this.gameObject);
};
xn.setGameObject = function(n) {
  mn.prototype.setGameObject.call(this, n), n.transform = this;
};
xn.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
xn.removeParent = function() {
  this.parent = null;
};
xn.translate = function(n, r, e, t) {
  wr[0] = n, wr[1] = r, wr[2] = e, t === "world" ? (Ze(zr), Ne(zr, zr, wr), je(this.local, zr, this.local)) : Ne(this.local, this.local, wr);
};
xn.rotate = function(n, r, e, t) {
  var s = Math.PI / 180, a = C1;
  t === "world" ? (a.identity(zr), a.rotateZ(zr, zr, e * s), a.rotateY(zr, zr, r * s), a.rotateX(zr, zr, n * s), je(this.local, zr, this.local)) : (a.rotateZ(this.local, this.local, e * s), a.rotateY(this.local, this.local, r * s), a.rotateX(this.local, this.local, n * s));
};
xn.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.worldMatrix.set(this.local) : je(this.worldMatrix, this.parent.getLocalToWorld(), this.local)), this.worldMatrix;
};
xn.getWorldToLocal = function() {
  return this.dirtyW === !0 && F1(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
};
xn.getPosition = function(n) {
  n === void 0 && (n = []);
  var r = this.getLocalToWorld();
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
};
xn.getLocalPosition = function(n) {
  n === void 0 && (n = []);
  var r = this.local;
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
};
xn.getRotation = function() {
  throw "TransformComponent.getRotation not implemented yet";
};
xn.getLocalRotation = function() {
  throw "TransformComponent.getLocalRotation not implemented yet";
};
xn.setPosition = function(n, r, e) {
  wr[0] = n, wr[1] = r, wr[2] = e, this.parent !== null && H1(wr, wr, this.parent.getWorldToLocal()), this.local[12] = wr[0], this.local[13] = wr[1], this.local[14] = wr[2];
};
xn.setLocalPosition = function(n, r, e) {
  this.local[12] = n, this.local[13] = r, this.local[14] = e;
};
xn.scale = function(n, r, e) {
  j1(this.local, this.local, [n, r, e]);
};
xn.updateWorldMatrix = function(n = !1) {
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
function nn(n) {
  mn.call(this), this.transform = n, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ], this.zoom = 1;
}
nn.prototype = Object.create(mn.prototype);
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
  const e = n / this.zoom, t = r / this.zoom;
  this.frustumSize = [
    [-e / 2, -t / 2, 0],
    [e / 2, t / 2, this.farClippingPane]
  ], D1(this.projectionMatrix, -e / 2, e / 2, -t / 2, t / 2, this.nearClippingPane, this.farClippingPane);
};
nn.prototype.setGameObject = function(n) {
  mn.prototype.setGameObject.call(this, n), n.camera = this;
};
nn.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, mn.prototype.unsetGameObject.call(this);
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
function Bn() {
  mn.call(this), this.colors = new Uint32Array([255]), this.faceColors = new Uint32Array([0]);
}
var er = Bn.prototype = Object.create(mn.prototype);
er.constructor = Bn;
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
    let d = (h * M - f * o) * n, y = (f * v - l * M) * n, m = (l * o - h * v) * n;
    const p = Math.sqrt(d * d + y * y + m * m);
    if (p > 1e-10) {
      const z = 1 / p;
      this.faceNormals[s] = d * z, this.faceNormals[s + 1] = y * z, this.faceNormals[s + 2] = m * z, this.vertexNormals[a] += d, this.vertexNormals[a + 1] += y, this.vertexNormals[a + 2] += m, this.vertexNormals[i] += d, this.vertexNormals[i + 1] += y, this.vertexNormals[i + 2] += m, this.vertexNormals[c] += d, this.vertexNormals[c + 1] += y, this.vertexNormals[c + 2] += m;
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
  mn.prototype.setGameObject.call(this, n), n.meshRenderer = this;
};
er.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, mn.prototype.unsetGameObject.call(this);
};
Bn.computeNormalMatrix = function(n, r) {
  const e = r[0], t = r[1], s = r[2], a = r[4], i = r[5], c = r[6], l = r[8], h = r[9], f = r[10], v = i * f - c * h, o = -(a * f - c * l), M = a * h - i * l, d = e * v + t * o + s * M;
  if (Math.abs(d) < 1e-6) return null;
  const y = 1 / d;
  n[0] = v * y, n[1] = o * y, n[2] = M * y, n[3] = -(t * f - s * h) * y, n[4] = (e * f - s * l) * y, n[5] = -(e * h - t * l) * y, n[6] = (t * c - s * i) * y, n[7] = -(e * c - s * a) * y, n[8] = (e * i - t * a) * y;
};
Bn.computeBoundsFlatArray = function(n, r, e) {
  if (e.length !== 0) {
    for (var t = e[0], s = t, a = e[1], i = a, c = e[2], l = c, h = 3; h < e.length; h += 3) {
      var f = e[h], v = e[h + 1], o = e[h + 2];
      f < t ? t = f : f > s && (s = f), v < a ? a = v : v > i && (i = v), o < c ? c = o : o > l && (l = o);
    }
    return n[r] = t, n[r + 1] = a, n[r + 2] = c, n[r + 3] = s, n[r + 4] = a, n[r + 5] = c, n[r + 6] = t, n[r + 7] = i, n[r + 8] = c, n[r + 9] = s, n[r + 10] = i, n[r + 11] = c, n[r + 12] = t, n[r + 13] = a, n[r + 14] = l, n[r + 15] = s, n[r + 16] = a, n[r + 17] = l, n[r + 18] = t, n[r + 19] = i, n[r + 20] = l, n[r + 21] = s, n[r + 22] = i, n[r + 23] = l, n;
  }
};
Bn.computeBoundingSphere = function(n, r, e) {
  let t = 1 / 0, s = 1 / 0, a = 1 / 0, i = -1 / 0, c = -1 / 0, l = -1 / 0;
  for (let m = 0; m < e.length; m += 3) {
    const p = e[m], z = e[m + 1], w = e[m + 2];
    p < t && (t = p), p > i && (i = p), z < s && (s = z), z > c && (c = z), w < a && (a = w), w > l && (l = w);
  }
  const h = (t + i) * 0.5, f = (s + c) * 0.5, v = (a + l) * 0.5, o = i - h, M = c - f, d = l - v, y = Math.sqrt(o * o + M * M + d * d);
  n[r] = h, n[r + 1] = f, n[r + 2] = v, n[r + 3] = y;
};
function e1(n) {
  mn.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var Zr = e1.prototype = Object.create(mn.prototype);
Zr.constructor = e1;
Zr.sprite = null;
Zr.pivotX = 0;
Zr.pivotY = 0;
Zr.layer = 0;
Zr.setGameObject = function(n) {
  mn.prototype.setGameObject.call(this, n), n.spriteRenderer = this;
};
Zr.setSprite = function(n) {
  return this.sprite = n, this.enabled = !0, this;
};
Zr.setPivot = function(n, r) {
  return this.pivotX = n, this.pivotY = r, this;
};
Zr.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, mn.prototype.unsetGameObject.call(this);
};
function t1() {
  mn.call(this), this.points = [];
}
var se = t1.prototype = Object.create(mn.prototype);
se.constructor = t1;
se.points = null;
se.color = "white";
se.width = 1;
se.layer = 0;
se.setGameObject = function(n) {
  mn.prototype.setGameObject.call(this, n), n.pathRenderer = this;
};
se.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, mn.prototype.unsetGameObject.call(this);
};
function s1() {
  mn.call(this);
}
var Gr = s1.prototype = Object.create(mn.prototype);
Gr.constructor = s1;
Gr.text = "sample text";
Gr.color = "white";
Gr.style = "normal 12px arial";
Gr.layer = 0;
Gr.align = "center";
Gr.valign = "middle";
Gr.setGameObject = function(n) {
  mn.prototype.setGameObject.call(this, n), n.textRenderer = this;
};
Gr.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, mn.prototype.unsetGameObject.call(this);
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
      const o = f * h + v, M = f * h + (v + 1), d = (f + 1) * h + v, y = (f + 1) * h + (v + 1);
      s.push(o, d, M), s.push(y, M, d);
    }
  return {
    vertices: new Float32Array(t),
    faces: new Uint16Array(s)
  };
}
const ze = p2(1, 1, 1), a1 = new Float32Array(32);
Bn.computeBoundsFlatArray(a1, 0, ze.vertices);
Bn.computeBoundingSphere(a1, 28, ze.vertices);
function kt() {
  dr.call(this);
  const n = new Bn();
  n.faces = ze.faces, n.vertices = ze.vertices, n.bounds = a1, n.updateNormals(), this.addComponent(n);
}
kt.prototype = Object.create(dr.prototype);
function x2(n, r, e, t) {
  const s = [], a = [], i = [];
  function c(h, f, v, o, M, d) {
    const y = `${h.toFixed(5)},${f.toFixed(5)},${v.toFixed(5)}`;
    if (d[y] !== void 0) return d[y];
    const m = s.length / 3;
    return s.push(h, f, v), a.push(o, M), d[y] = m, m;
  }
  function l(h, f, v, o, M, d, y, m, p, z) {
    const w = {}, x = y / z, b = m / z, g = y / 2, R = m / 2, L = p / 2 * d, A = [];
    for (let $ = 0; $ <= z; $++) {
      const P = [], j = $ * b - R;
      for (let q = 0; q <= z; q++) {
        const I = q * x - g, O = [0, 0, 0];
        O[h] = I * o, O[f] = j * M, O[v] = L;
        const X = q / z, U = 1 - $ / z;
        P.push(c(O[0], O[1], O[2], X, U, w));
      }
      A.push(P);
    }
    for (let $ = 0; $ < z; $++)
      for (let P = 0; P < z; P++) {
        const j = A[$][P], q = A[$ + 1][P], I = A[$ + 1][P + 1], O = A[$][P + 1];
        i.push(j, O, q), i.push(q, O, I);
      }
  }
  return l(0, 1, 2, 1, 1, 1, n, r, e, t), l(0, 1, 2, -1, 1, -1, n, r, e, t), l(2, 1, 0, -1, 1, 1, e, r, n, t), l(2, 1, 0, 1, 1, -1, e, r, n, t), l(0, 2, 1, 1, -1, 1, n, e, r, t), l(0, 2, 1, 1, 1, -1, n, e, r, t), {
    vertices: new Float32Array(s),
    uvs: new Float32Array(a),
    faces: new Uint16Array(i)
  };
}
const xe = x2(1, 1, 1, 1), i1 = new Float32Array(32);
Bn.computeBoundsFlatArray(i1, 0, xe.vertices);
Bn.computeBoundingSphere(i1, 28, xe.vertices);
function Et() {
  dr.call(this);
  const n = new Bn();
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
Bn.computeBoundsFlatArray(c1, 0, Ae.vertices);
Bn.computeBoundingSphere(c1, 28, Ae.vertices);
function Dt() {
  dr.call(this);
  const n = new Bn();
  n.vertices = Ae.vertices, n.faces = Ae.faces, n.bounds = c1, n.updateNormals(), this.addComponent(n);
}
Dt.prototype = Object.create(dr.prototype);
function w2(n, r, e) {
  const t = [], s = [], a = [], i = {};
  function c(h, f, v, o, M) {
    const d = `${h.toFixed(5)},${f.toFixed(5)},${v.toFixed(5)},${o.toFixed(5)},${M.toFixed(5)}`;
    if (i[d] !== void 0) return i[d];
    const y = t.length / 3;
    return t.push(h, f, v), s.push(o, M), i[d] = y, y;
  }
  const l = [];
  for (let h = 0; h <= n; h++) {
    const f = [], v = h * Math.PI / n, o = Math.sin(v), M = Math.cos(v);
    for (let d = 0; d <= r; d++) {
      const y = d * 2 * Math.PI / r, m = Math.cos(y) * o * e, p = M * e, z = Math.sin(y) * o * e, w = d / r, x = h / n;
      f.push(c(m, p, z, w, x));
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
  return Bn.computeBoundsFlatArray(s, 0, t.vertices), Bn.computeBoundingSphere(s, 28, t.vertices), [
    t.vertices,
    t.faces,
    t.uvs,
    s
  ];
}
function l1(n, r, e, t) {
  dr.call(this);
  const s = new Bn();
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
    var y = M.x / d, m = M.y / d, p = M.z / d;
    d1(
      t,
      0,
      a + y * f,
      i + m * f,
      c + p * f,
      e
    ), r.beginPath(), r.lineWidth = 2, r.strokeStyle = M.col, r.moveTo(l, h), r.lineTo(t[0], t[1]), r.stroke();
  }
}
const A2 = Bn.computeNormalMatrix, Ue = e0, m1 = Oe, q2 = z2, Wn = b2(), Ve = 0.6;
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
  let t = Date.now(), s = n.scene.retrieve(), a = he.layersCount, i = r.width, c = r.height, l, h, f, v, o, M, d = this.vec3Cache1, y = this.vec3Cache2, m = this.vec4Cache, p = this.depthBuffer, z = this.indexBuffer, w = this.vertexIndexBuffer, x = this.vertexBuffer, b = this.clipGeometryBuffer, g = this.colorBuffer, R = this.shaderTypeBuffer, L = this.faceNormalsBuffer, A = this.vertexNormalsBuffer, $ = this.meshIndexBuffer, P = this.meshFaceIndexBuffer, j = this.visibleObjectsBuffer, q = this.lightsIndexBuffer, I = this.layerBuffers, O = this.layerBufferLengths, X = this.mat4Scratchpad1, U = this.mat4Scratchpad2, Cn = r.getWorldToScreen(), F = n.transform.getWorldToLocal(), _n = n.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let Un = 0, Hn = 0;
  const Y = n.camera, N = n.camera.fogType !== nn.FogType.NONE ? Y.fogColor : Y.bgColor;
  if (Y.bgColor !== -1) {
    const T = N >>> 16, gn = N >>> 8 & 255, V = N & 255, Vn = T & 248, Kn = gn & 252, E = V & 248, S = Vn << 8 | Kn << 3 | E >> 3;
    r.context.fillStyle = Wn[S], r.context.fillRect(0, 0, r.width, r.height);
  } else
    r.context.clearRect(0, 0, r.width, r.height);
  if (j.length < s.length) {
    const T = j;
    this.visibleObjectsBuffer = j = new Uint32Array(
      s.length
    ), j.set(T);
  }
  if (q.length < s.length) {
    const T = q;
    this.lightsIndexBuffer = q = new Uint32Array(
      s.length
    ), q.set(T);
  }
  if (T2(
    s,
    _n,
    j,
    q
  ), S2(j, s, _n), O.length < a) {
    var rn = O;
    this.layerBufferLengths = O = new Uint32Array(a), O.set(rn);
  }
  const tn = j[0] + 1;
  for (v = 1; v < tn; v++) {
    const T = s[j[v]];
    if (T.meshRenderer) {
      const gn = T.meshRenderer, V = gn.layer;
      I[V][O[V]++] = gn;
    }
  }
  let u = 0;
  for (v = 0; v < a; v++) {
    M = r.layers[v], h = I[v], f = O[v];
    let T = 0, gn = 0;
    for (let E = 0; E < f; E++) {
      T += h[E].faces.length;
      const S = h[E].vertices.length;
      S > gn && (gn = S);
    }
    T = T / 3 | 0;
    const V = gn / 3 | 0;
    if (this.vMapping.length < V && (this.vMapping = new Int32Array(V), this.vTags = new Uint32Array(V)), d.length < gn && (this.vec3Cache1 = d = new Float32Array(gn), this.vec3Cache2 = y = new Float32Array(gn), this.vec4Cache = m = new Float32Array(gn * 4 / 3)), p.length < T) {
      let E = new Float32Array(T);
      E.set(p), this.depthBuffer = p = E, E = new Uint32Array(T), E.set(z), this.indexBuffer = z = E, E = new Uint32Array(T), E.set(g), this.colorBuffer = g = E, E = new Uint32Array(T), E.set(R), this.shaderTypeBuffer = R = E, E = new Float32Array(T * 9), E.set(b), this.clipGeometryBuffer = b = E, E = new Float32Array(T * 3), E.set(L), this.faceNormalsBuffer = L = E, E = new Float32Array(T * 9), E.set(A), this.vertexNormalsBuffer = A = E, E = new Uint32Array(T), E.set($), this.meshIndexBuffer = $ = E, E = new Uint32Array(T), E.set(P), this.meshFaceIndexBuffer = P = E;
      let S = new Float32Array(T * 6);
      S.set(x), this.vertexBuffer = x = S;
      let An = new Uint32Array(T * 3);
      An.set(w), this.vertexIndexBuffer = w = An;
    }
    const Vn = O2(
      h,
      f,
      y,
      m,
      z,
      p,
      g,
      R,
      b,
      F,
      _n,
      U,
      X,
      this.mat3Scratchpad1,
      L,
      A,
      x,
      w,
      $,
      P,
      this.vMapping,
      this.vTags
    );
    if ((he.depthSortingMask & v + 1) === v + 1) {
      const E = performance.now();
      z.subarray(0, Vn).sort(function(S, An) {
        return p[An] - p[S];
      }), u += performance.now() - E;
    }
    const Kn = (he.layerClearMask & v + 1) === v + 1;
    for (F2(
      M,
      x,
      w,
      z,
      g,
      R,
      Vn,
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
      L,
      A,
      $,
      P,
      h,
      this.wireframe,
      q,
      s
    ), o = 0; o < f; o++)
      l = h[o], l.gameObject && l.gameObject.debug && q2(l.gameObject, M, Cn, d);
    r.context.drawImage(M.canvas, 0, 0), Un += Vn, Hn += Vn, O[v] = 0;
  }
  e.totalObjects = s.length, e.visibleObjects = tn, e.drawCalls = Un, e.faces = Hn, e.sortTime = u, e.dt = Date.now() - t;
};
function T2(n, r, e, t) {
  let s = 0, a = 0;
  const i = r[0], c = r[1], l = r[2], h = r[3], f = r[4], v = r[5], o = r[6], M = r[7], d = r[8], y = r[9], m = r[10], p = r[11], z = r[12], w = r[13], x = r[14], b = r[15];
  let g = h + i, R = M + f, L = p + d, A = b + z, $ = 1 / Math.sqrt(g * g + R * R + L * L);
  g *= $, R *= $, L *= $, A *= $;
  let P = h - i, j = M - f, q = p - d, I = b - z;
  $ = 1 / Math.sqrt(P * P + j * j + q * q), P *= $, j *= $, q *= $, I *= $;
  let O = h + c, X = M + v, U = p + y, Cn = b + w;
  $ = 1 / Math.sqrt(O * O + X * X + U * U), O *= $, X *= $, U *= $, Cn *= $;
  let F = h - c, _n = M - v, Un = p - y, Hn = b - w;
  $ = 1 / Math.sqrt(F * F + _n * _n + Un * Un), F *= $, _n *= $, Un *= $, Hn *= $;
  let Y = h + l, N = M + o, rn = p + m, tn = b + x;
  $ = 1 / Math.sqrt(Y * Y + N * N + rn * rn), Y *= $, N *= $, rn *= $, tn *= $;
  let u = h - l, T = M - o, gn = p - m, V = b - x;
  $ = 1 / Math.sqrt(u * u + T * T + gn * gn), u *= $, T *= $, gn *= $, V *= $;
  const Vn = n.length;
  for (let Kn = 0; Kn < Vn; Kn++) {
    const E = n[Kn];
    if (E.meshRenderer && E.meshRenderer.enabled) {
      const S = E.transform.worldMatrix, An = E.meshRenderer.bounds, un = An[28], bn = An[29], Xn = An[30], sr = S[0] * un + S[4] * bn + S[8] * Xn + S[12], ar = S[1] * un + S[5] * bn + S[9] * Xn + S[13], Qn = S[2] * un + S[6] * bn + S[10] * Xn + S[14], ir = S[0] * S[0] + S[1] * S[1] + S[2] * S[2], vr = S[4] * S[4] + S[5] * S[5] + S[6] * S[6], or = S[8] * S[8] + S[9] * S[9] + S[10] * S[10], yn = An[31] * Math.sqrt(Math.max(ir, vr, or));
      if (g * sr + R * ar + L * Qn + A < -yn || P * sr + j * ar + q * Qn + I < -yn || O * sr + X * ar + U * Qn + Cn < -yn || F * sr + _n * ar + Un * Qn + Hn < -yn || Y * sr + N * ar + rn * Qn + tn < -yn || u * sr + T * ar + gn * Qn + V < -yn) continue;
      e[++s] = Kn;
    }
    if (E.light)
      if (E.light.type === 1) {
        const S = E.transform.worldMatrix, An = S[12], un = S[13], bn = S[14], Xn = S[0] * S[0] + S[1] * S[1] + S[2] * S[2], sr = S[4] * S[4] + S[5] * S[5] + S[6] * S[6], ar = S[8] * S[8] + S[9] * S[9] + S[10] * S[10], Qn = E.light.range * Math.sqrt(Math.max(Xn, sr, ar));
        if (g * An + R * un + L * bn + A < -Qn || P * An + j * un + q * bn + I < -Qn || O * An + X * un + U * bn + Cn < -Qn || F * An + _n * un + Un * bn + Hn < -Qn || Y * An + N * un + rn * bn + tn < -Qn || u * An + T * un + gn * bn + V < -Qn) continue;
        t[++a] = Kn;
      } else
        t[++a] = Kn;
  }
  e[0] = s, t[0] = a;
}
function S2(n, r, e) {
  const t = e, s = t[0], a = t[1], i = t[2], c = t[3], l = t[4], h = t[5], f = t[6], v = t[7], o = t[8], M = t[9], d = t[10], y = t[11], m = t[12], p = t[13], z = t[14], w = t[15];
  let x = 0;
  const b = n[0] + 1;
  for (let g = 1; g < b; g++) {
    const R = n[g], L = r[R], A = L.transform.worldMatrix, $ = L.meshRenderer;
    if ($ && $.enabled && $.bounds) {
      const P = $.bounds;
      let j = 63;
      for (let q = 0; q < 24; q += 3) {
        const I = P[q], O = P[q + 1], X = P[q + 2], U = A[0] * I + A[4] * O + A[8] * X + A[12], Cn = A[1] * I + A[5] * O + A[9] * X + A[13], F = A[2] * I + A[6] * O + A[10] * X + A[14], _n = s * U + l * Cn + o * F + m, Un = a * U + h * Cn + M * F + p, Hn = i * U + f * Cn + d * F + z, Y = c * U + v * Cn + y * F + w;
        let N = 0;
        _n < -Y && (N |= 1), _n > Y && (N |= 2), Un < -Y && (N |= 4), Un > Y && (N |= 8), Hn < -Y && (N |= 16), Hn > Y && (N |= 32), j &= N;
      }
      j === 0 && (n[++x] = R);
    } else {
      const P = A[12], j = A[13], q = A[14], I = s * P + l * j + o * q + m, O = a * P + h * j + M * q + p, X = i * P + f * j + d * q + z, U = c * P + v * j + y * q + w;
      I >= -U && I <= U && O >= -U && O <= U && X >= -U && X <= U && (n[++x] = R);
    }
  }
  n[0] = x;
}
let te = 0;
function O2(n, r, e, t, s, a, i, c, l, h, f, v, o, M, d, y, m, p, z, w, x, b) {
  let g = 0, R = 0;
  for (let L = 0; L < r; L++) {
    const A = n[L];
    if (A.constructor !== Bn) continue;
    ++te;
    const $ = A.gameObject.transform.worldMatrix;
    m1(o, f, $), m1(v, h, $);
    const P = o[0], j = o[1], q = o[2], I = o[3], O = o[4], X = o[5], U = o[6], Cn = o[7], F = o[8], _n = o[9], Un = o[10], Hn = o[11], Y = o[12], N = o[13], rn = o[14], tn = o[15], u = A.faces, T = A.vertices, gn = A.faceNormals, V = A.vertexNormals;
    A2(M, $);
    const Vn = M, Kn = Vn[0], E = Vn[1], S = Vn[2], An = Vn[3], un = Vn[4], bn = Vn[5], Xn = Vn[6], sr = Vn[7], ar = Vn[8], Qn = u.length;
    for (let ir = 0; ir < Qn; ir += 3) {
      const vr = u[ir], or = u[ir + 1], yn = u[ir + 2], nr = vr << 2, Tr = or << 2, Sr = yn << 2;
      if (b[vr] !== te) {
        const W = vr * 3, k = T[W], H = T[W + 1], Q = T[W + 2];
        t[nr] = P * k + O * H + F * Q + Y, t[nr + 1] = j * k + X * H + _n * Q + N, t[nr + 2] = q * k + U * H + Un * Q + rn, t[nr + 3] = I * k + Cn * H + Hn * Q + tn, b[vr] = te, x[vr] = -1;
      }
      if (b[or] !== te) {
        const W = or * 3, k = T[W], H = T[W + 1], Q = T[W + 2];
        t[Tr] = P * k + O * H + F * Q + Y, t[Tr + 1] = j * k + X * H + _n * Q + N, t[Tr + 2] = q * k + U * H + Un * Q + rn, t[Tr + 3] = I * k + Cn * H + Hn * Q + tn, b[or] = te, x[or] = -1;
      }
      if (b[yn] !== te) {
        const W = yn * 3, k = T[W], H = T[W + 1], Q = T[W + 2];
        t[Sr] = P * k + O * H + F * Q + Y, t[Sr + 1] = j * k + X * H + _n * Q + N, t[Sr + 2] = q * k + U * H + Un * Q + rn, t[Sr + 3] = I * k + Cn * H + Hn * Q + tn, b[yn] = te, x[yn] = -1;
      }
      const Jr = t[nr], Kr = t[nr + 1], oe = t[nr + 2], Lr = t[nr + 3], mr = t[Tr], yr = t[Tr + 1], rr = t[Tr + 2], wn = t[Tr + 3], kn = t[Sr], En = t[Sr + 1], cr = t[Sr + 2], vn = t[Sr + 3];
      if (Jr < -Lr && mr < -wn && kn < -vn || Jr > Lr && mr > wn && kn > vn || Kr < -Lr && yr < -wn && En < -vn || Kr > Lr && yr > wn && En > vn || oe < -Lr && rr < -wn && cr < -vn || oe > Lr && rr > wn && cr > vn) continue;
      const qn = 1 / Lr, zn = 1 / wn, Mr = 1 / vn, Nn = Jr * qn, pn = Kr * qn, tr = mr * zn, en = yr * zn, lr = kn * Mr, In = En * Mr;
      if ((tr - Nn) * (In - pn) - (en - pn) * (lr - Nn) > 0) continue;
      const J = vr * 3, sn = or * 3, Mn = yn * 3;
      s[g] = g, z[g] = L, w[g] = ir;
      const jn = gn[ir], dn = gn[ir + 1], Z = gn[ir + 2], C = jn * Kn + dn * An + Z * Xn, ln = jn * E + dn * un + Z * sr, an = jn * S + dn * bn + Z * ar, on = Math.sqrt(C * C + ln * ln + an * an), G = on > 0 ? 1 / on : 0, $n = ir / 3 | 0, hn = A.faceColors[$n % A.faceColors.length];
      if (i[g] = A.colors[hn], c[g] = A.shaderType, x[vr] === -1) {
        const W = R * 3;
        Ue(
          e,
          J,
          T[J],
          T[J + 1],
          T[J + 2],
          v
        ), m[W] = Nn, m[W + 1] = -pn, x[vr] = W, R++;
        const k = vr * 3, H = V[k] * Kn + V[k + 1] * An + V[k + 2] * Xn, Q = V[k] * E + V[k + 1] * un + V[k + 2] * sr, Ln = V[k] * S + V[k + 1] * bn + V[k + 2] * ar, Zn = Math.sqrt(H * H + Q * Q + Ln * Ln), Pn = Zn > 0 ? 1 / Zn : 0;
        y[W] = H * Pn, y[W + 1] = Q * Pn, y[W + 2] = Ln * Pn;
      }
      if (p[g * 3] = x[vr], x[or] === -1) {
        const W = R * 3;
        Ue(
          e,
          sn,
          T[sn],
          T[sn + 1],
          T[sn + 2],
          v
        ), m[W] = tr, m[W + 1] = -en, x[or] = W, R++;
        const k = or * 3, H = V[k] * Kn + V[k + 1] * An + V[k + 2] * Xn, Q = V[k] * E + V[k + 1] * un + V[k + 2] * sr, Ln = V[k] * S + V[k + 1] * bn + V[k + 2] * ar, Zn = Math.sqrt(H * H + Q * Q + Ln * Ln), Pn = Zn > 0 ? 1 / Zn : 0;
        y[W] = H * Pn, y[W + 1] = Q * Pn, y[W + 2] = Ln * Pn;
      }
      if (p[g * 3 + 1] = x[or], x[yn] === -1) {
        const W = R * 3;
        Ue(
          e,
          Mn,
          T[Mn],
          T[Mn + 1],
          T[Mn + 2],
          v
        ), m[W] = lr, m[W + 1] = -In, x[yn] = W, R++;
        const k = yn * 3, H = V[k] * Kn + V[k + 1] * An + V[k + 2] * Xn, Q = V[k] * E + V[k + 1] * un + V[k + 2] * sr, Ln = V[k] * S + V[k + 1] * bn + V[k + 2] * ar, Zn = Math.sqrt(H * H + Q * Q + Ln * Ln), Pn = Zn > 0 ? 1 / Zn : 0;
        y[W] = H * Pn, y[W + 1] = Q * Pn, y[W + 2] = Ln * Pn;
      }
      p[g * 3 + 2] = x[yn];
      const fn = g * 9;
      l[fn] = e[J], l[fn + 1] = e[J + 1];
      const K = l[fn + 2] = e[J + 2];
      l[fn + 3] = e[sn], l[fn + 4] = e[sn + 1];
      const Dn = l[fn + 5] = e[sn + 2];
      l[fn + 6] = e[Mn], l[fn + 7] = e[Mn + 1];
      const pr = l[fn + 8] = e[Mn + 2];
      a[g] = (K + Dn + pr) * 0.33333;
      const Rn = g * 3;
      d[Rn] = C * G, d[Rn + 1] = ln * G, d[Rn + 2] = an * G, g++;
    }
  }
  return g;
}
function F2(n, r, e, t, s, a, i, c, l, h, f, v, o, M, d, y, m, p, z, w, x, b, g, R, L, A, $, P) {
  const j = h * 0.5, q = f * 0.5, I = c + i;
  l && n.clearRect(0, 0, n.canvas.width, n.canvas.height);
  let O = -1, X = -1, U = -1;
  for (let Cn = c; Cn < I; Cn++) {
    const F = t[Cn], _n = e[F * 3], Un = e[F * 3 + 1], Hn = e[F * 3 + 2], Y = r[_n] * j + j, N = r[_n + 1] * q + q, rn = r[Un] * j + j, tn = r[Un + 1] * q + q, u = r[Hn] * j + j, T = r[Hn + 1] * q + q, gn = (Y + rn + u) * 0.33333, V = (N + tn + T) * 0.33333, Vn = Y - gn, Kn = N - V, E = Math.abs(Vn), S = Math.abs(Kn), An = E > S ? E + 0.4 * S : S + 0.4 * E, un = An > 0 ? Ve / An : 0, bn = Y + Vn * un, Xn = N + Kn * un, sr = rn - gn, ar = tn - V, Qn = Math.abs(sr), ir = Math.abs(ar), vr = Qn > ir ? Qn + 0.4 * ir : ir + 0.4 * Qn, or = vr > 0 ? Ve / vr : 0, yn = rn + sr * or, nr = tn + ar * or, Tr = u - gn, Sr = T - V, Jr = Math.abs(Tr), Kr = Math.abs(Sr), oe = Jr > Kr ? Jr + 0.4 * Kr : Kr + 0.4 * Jr, Lr = oe > 0 ? Ve / oe : 0, mr = u + Tr * Lr, yr = T + Sr * Lr;
    switch (A ? 3 : a[F]) {
      case 0: {
        const rr = s[F];
        let wn = rr >>> 16, kn = rr >>> 8 & 255, En = rr & 255, cr = w >>> 16 & 255, vn = w >>> 8 & 255, qn = w & 255;
        const zn = x[F * 3], Mr = x[F * 3 + 1], Nn = x[F * 3 + 2], pn = $[0] + 1;
        for (let Z = 1; Z < pn; Z++) {
          const C = P[$[Z]];
          if (C.light.type === 0) {
            const ln = -C.transform.worldMatrix[8], an = -C.transform.worldMatrix[9], on = -C.transform.worldMatrix[10], G = zn * ln + Mr * an + Nn * on;
            G > 0 && (cr += (C.light.color >>> 16 & 255) * G, vn += (C.light.color >>> 8 & 255) * G, qn += (C.light.color & 255) * G);
          }
        }
        cr *= 39215e-7, vn *= 39215e-7, qn *= 39215e-7, wn = wn * cr | 0, kn = kn * vn | 0, En = En * qn | 0, wn = wn > 255 ? 255 : wn, kn = kn > 255 ? 255 : kn, En = En > 255 ? 255 : En;
        const tr = o[F];
        let en = 0;
        if (M === nn.FogType.RADIAL_FAST || M === nn.FogType.RADIAL) {
          const Z = v[F * 9], C = v[F * 9 + 1], ln = v[F * 9 + 2], an = v[F * 9 + 3], on = v[F * 9 + 4], G = v[F * 9 + 5], $n = v[F * 9 + 6], hn = v[F * 9 + 7], fn = v[F * 9 + 8], K = (Z + an + $n) * 0.33333, Dn = (C + on + hn) * 0.33333, pr = (ln + G + fn) * 0.33333;
          if (M === nn.FogType.RADIAL_FAST) {
            const Rn = y * y, k = 1 / (m * m - Rn);
            en = (K * K + Dn * Dn + pr * pr - Rn) * k;
          } else
            en = (Math.sqrt(K * K + Dn * Dn + pr * pr) - y) / (m - y);
        } else M === nn.FogType.LINEAR && (en = (tr - y) / (m - y));
        if (en > 1 && (en = 1), en > 0) {
          const Z = d >>> 16, C = d >>> 8 & 255, ln = d & 255;
          wn = wn * (1 - en) + Z * en | 0, kn = kn * (1 - en) + C * en | 0, En = En * (1 - en) + ln * en | 0;
        }
        const lr = g[F], In = L[lr], J = In.textureImage;
        if (J && J.complete && J.naturalWidth > 0 && In.uvs) {
          const Z = R[F], C = In.uvs, ln = In.faces[Z] * 2, an = In.faces[Z + 1] * 2, on = In.faces[Z + 2] * 2, G = C[ln] * J.width, $n = C[ln + 1] * J.height, hn = C[an] * J.width, fn = C[an + 1] * J.height, K = C[on] * J.width, Dn = C[on + 1] * J.height, pr = G * (fn - Dn) - $n * (hn - K) + (hn * Dn - K * fn);
          if (Math.abs(pr) > 1e-5) {
            const Rn = 1 / pr, W = (Y * (fn - Dn) + rn * (Dn - $n) + u * ($n - fn)) * Rn, k = (Y * (K - hn) + rn * (G - K) + u * (hn - G)) * Rn, H = (Y * (hn * Dn - K * fn) + rn * (K * $n - G * Dn) + u * (G * fn - hn * $n)) * Rn, Q = (N * (fn - Dn) + tn * (Dn - $n) + T * ($n - fn)) * Rn, Ln = (N * (K - hn) + tn * (G - K) + T * (hn - G)) * Rn, Zn = (N * (hn * Dn - K * fn) + tn * (K * $n - G * Dn) + T * (G * fn - hn * $n)) * Rn;
            n.save(), n.beginPath(), n.moveTo(bn, Xn), n.lineTo(yn, nr), n.lineTo(mr, yr), n.closePath(), n.clip(), n.setTransform(W, Q, k, Ln, H, Zn), n.drawImage(J, 0, 0), n.restore();
            const Pn = cr >= 1 ? 255 : cr * 255 | 0, hr = vn >= 1 ? 255 : vn * 255 | 0, Dr = qn >= 1 ? 255 : qn * 255 | 0, Wr = Pn & 248, Pr = hr & 252, Me = Dr & 248, ie = Wr << 8 | Pr << 3 | Me >> 3;
            if (n.globalCompositeOperation = "multiply", O !== ie && (n.fillStyle = Wn[ie], O = ie), n.fill(), n.globalCompositeOperation = "source-over", en > 0) {
              const Or = d >>> 16, Fr = d >>> 8 & 255, Cr = d & 255, Ur = Or & 248, ur = Fr & 252, ne = Cr & 248, fr = Ur << 8 | ur << 3 | ne >> 3;
              n.globalAlpha = en, X !== fr && (n.strokeStyle = Wn[fr], X = fr), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), O !== fr && (n.fillStyle = Wn[fr], O = fr), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(Y, N), n.lineTo(rn, tn), n.lineTo(u, T), n.closePath();
        const sn = wn & 248, Mn = kn & 252, jn = En & 248, dn = sn << 8 | Mn << 3 | jn >> 3;
        X !== dn && (n.strokeStyle = Wn[dn], X = dn), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), O !== dn && (n.fillStyle = Wn[dn], O = dn), n.fill();
        break;
      }
      case 1: {
        const rr = s[F];
        let wn = rr >>> 16, kn = rr >>> 8 & 255, En = rr & 255;
        const cr = o[F];
        let vn = 0;
        if (M === nn.FogType.RADIAL_FAST || M === nn.FogType.RADIAL) {
          const J = v[F * 9], sn = v[F * 9 + 1], Mn = v[F * 9 + 2], jn = v[F * 9 + 3], dn = v[F * 9 + 4], Z = v[F * 9 + 5], C = v[F * 9 + 6], ln = v[F * 9 + 7], an = v[F * 9 + 8], on = (J + jn + C) * 0.33333, G = (sn + dn + ln) * 0.33333, $n = (Mn + Z + an) * 0.33333;
          if (M === nn.FogType.RADIAL_FAST) {
            const hn = y * y, K = 1 / (m * m - hn);
            vn = (on * on + G * G + $n * $n - hn) * K;
          } else
            vn = (Math.sqrt(on * on + G * G + $n * $n) - y) / (m - y);
        } else M === nn.FogType.LINEAR && (vn = (cr - y) / (m - y));
        let zn = Math.max(0, vn - 0);
        if (zn > 1 && (zn = 1), zn > 0) {
          const J = d >>> 16, sn = d >>> 8 & 255, Mn = d & 255;
          wn = wn * (1 - zn) + J * zn | 0, kn = kn * (1 - zn) + sn * zn | 0, En = En * (1 - zn) + Mn * zn | 0;
        }
        const Mr = g[F], Nn = L[Mr], pn = Nn.textureImage;
        if (pn && pn.complete && pn.naturalWidth > 0 && Nn.uvs) {
          const J = R[F], sn = Nn.uvs, Mn = Nn.faces[J] * 2, jn = Nn.faces[J + 1] * 2, dn = Nn.faces[J + 2] * 2, Z = sn[Mn] * pn.width, C = sn[Mn + 1] * pn.height, ln = sn[jn] * pn.width, an = sn[jn + 1] * pn.height, on = sn[dn] * pn.width, G = sn[dn + 1] * pn.height, $n = Z * (an - G) - C * (ln - on) + (ln * G - on * an);
          if (Math.abs($n) > 1e-5) {
            const hn = 1 / $n, fn = (Y * (an - G) + rn * (G - C) + u * (C - an)) * hn, K = (Y * (on - ln) + rn * (Z - on) + u * (ln - Z)) * hn, Dn = (Y * (ln * G - on * an) + rn * (on * C - Z * G) + u * (Z * an - ln * C)) * hn, pr = (N * (an - G) + tn * (G - C) + T * (C - an)) * hn, Rn = (N * (on - ln) + tn * (Z - on) + T * (ln - Z)) * hn, W = (N * (ln * G - on * an) + tn * (on * C - Z * G) + T * (Z * an - ln * C)) * hn;
            if (n.save(), n.beginPath(), n.moveTo(bn, Xn), n.lineTo(yn, nr), n.lineTo(mr, yr), n.closePath(), n.clip(), n.setTransform(fn, pr, K, Rn, Dn, W), n.drawImage(pn, 0, 0), n.restore(), zn > 0) {
              const k = d >>> 16, H = d >>> 8 & 255, Q = d & 255, Ln = k & 248, Zn = H & 252, Pn = Q & 248, hr = Ln << 8 | Zn << 3 | Pn >> 3;
              n.globalAlpha = zn, X !== hr && (n.strokeStyle = Wn[hr], X = hr), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), O !== hr && (n.fillStyle = Wn[hr], O = hr), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(bn, Xn), n.lineTo(yn, nr), n.lineTo(mr, yr), n.closePath();
        const tr = wn & 248, en = kn & 252, lr = En & 248, In = tr << 8 | en << 3 | lr >> 3;
        O !== In && (n.fillStyle = Wn[In], O = In), n.fill();
        break;
      }
      case 2: {
        const rr = s[F];
        let wn = rr >>> 16, kn = rr >>> 8 & 255, En = rr & 255;
        const cr = g[F], vn = L[cr], qn = vn.textureImage;
        if (qn && qn.complete && qn.naturalWidth > 0 && vn.uvs) {
          const tr = R[F], en = vn.uvs, lr = vn.faces[tr] * 2, In = vn.faces[tr + 1] * 2, J = vn.faces[tr + 2] * 2, sn = en[lr] * qn.width, Mn = en[lr + 1] * qn.height, jn = en[In] * qn.width, dn = en[In + 1] * qn.height, Z = en[J] * qn.width, C = en[J + 1] * qn.height, ln = sn * (dn - C) - Mn * (jn - Z) + (jn * C - Z * dn);
          if (Math.abs(ln) > 1e-5) {
            const an = 1 / ln, on = (Y * (dn - C) + rn * (C - Mn) + u * (Mn - dn)) * an, G = (Y * (Z - jn) + rn * (sn - Z) + u * (jn - sn)) * an, $n = (Y * (jn * C - Z * dn) + rn * (Z * Mn - sn * C) + u * (sn * dn - jn * Mn)) * an, hn = (N * (dn - C) + tn * (C - Mn) + T * (Mn - dn)) * an, fn = (N * (Z - jn) + tn * (sn - Z) + T * (jn - sn)) * an, K = (N * (jn * C - Z * dn) + tn * (Z * Mn - sn * C) + T * (sn * dn - jn * Mn)) * an;
            n.save(), n.beginPath(), n.moveTo(bn, Xn), n.lineTo(yn, nr), n.lineTo(mr, yr), n.closePath(), n.clip(), n.setTransform(on, hn, G, fn, $n, K), n.drawImage(qn, 0, 0), n.restore();
            break;
          }
        }
        n.beginPath(), n.moveTo(bn, Xn), n.lineTo(yn, nr), n.lineTo(mr, yr), n.closePath();
        const zn = wn & 248, Mr = kn & 252, Nn = En & 248, pn = zn << 8 | Mr << 3 | Nn >> 3;
        O !== pn && (n.fillStyle = Wn[pn], O = pn), n.fill();
        break;
      }
      case 3: {
        n.beginPath(), n.moveTo(Y, N), n.lineTo(rn, tn), n.lineTo(u, T), n.closePath(), X !== 31 && (n.strokeStyle = Wn[31], X = 31), U !== 5 && (n.lineWidth = 0.5, n.lineJoin = "miter", U = 5), n.stroke();
        break;
      }
      case 4: {
        const rr = s[F], wn = rr >>> 16, kn = rr >>> 8 & 255, En = rr & 255;
        let cr = w >>> 16, vn = w >>> 8 & 255, qn = w & 255, zn = cr, Mr = vn, Nn = qn, pn = cr, tr = vn, en = qn, lr = cr, In = vn, J = qn, sn = b[_n], Mn = b[_n + 1], jn = b[_n + 2], dn = b[Un], Z = b[Un + 1], C = b[Un + 2], ln = b[Hn], an = b[Hn + 1], on = b[Hn + 2];
        const G = $[0] + 1;
        for (let D = 1; D < G; D++) {
          const Gn = P[$[D]];
          if (Gn.light.type === 0) {
            const $r = Gn.light.color >>> 16, br = Gn.light.color >>> 8 & 255, xr = Gn.light.color & 255, Tn = -Gn.transform.worldMatrix[8], Sn = -Gn.transform.worldMatrix[9], Jn = -Gn.transform.worldMatrix[10];
            let Yn = sn * Tn + Mn * Sn + jn * Jn, On = dn * Tn + Z * Sn + C * Jn, Fn = ln * Tn + an * Sn + on * Jn;
            Yn > 0 && (zn += $r * Yn, Mr += br * Yn, Nn += xr * Yn), On > 0 && (pn += $r * On, tr += br * On, en += xr * On), Fn > 0 && (lr += $r * Fn, In += br * Fn, J += xr * Fn);
          }
        }
        zn *= 39215e-7, Mr *= 39215e-7, Nn *= 39215e-7, pn *= 39215e-7, tr *= 39215e-7, en *= 39215e-7, lr *= 39215e-7, In *= 39215e-7, J *= 39215e-7;
        let $n = Math.min(Math.max(zn, Mr, Nn), 1), hn = Math.min(Math.max(pn, tr, en), 1), fn = Math.min(Math.max(lr, In, J), 1), K = 0;
        const Dn = o[F];
        if (M === nn.FogType.RADIAL_FAST || M === nn.FogType.RADIAL) {
          const D = v[F * 9], Gn = v[F * 9 + 1], $r = v[F * 9 + 2], br = v[F * 9 + 3], xr = v[F * 9 + 4], Tn = v[F * 9 + 5], Sn = v[F * 9 + 6], Jn = v[F * 9 + 7], Yn = v[F * 9 + 8], On = (D + br + Sn) * 0.33333, Fn = (Gn + xr + Jn) * 0.33333, Br = ($r + Tn + Yn) * 0.33333;
          if (M === nn.FogType.RADIAL_FAST) {
            const gr = y * y, Pe = 1 / (m * m - gr);
            K = (On * On + Fn * Fn + Br * Br - gr) * Pe;
          } else
            K = (Math.sqrt(On * On + Fn * Fn + Br * Br) - y) / (m - y);
        } else M === nn.FogType.LINEAR && (K = (Dn - y) / (m - y));
        K > 1 && (K = 1);
        const pr = g[F], Rn = L[pr], W = Rn.textureImage;
        if (W && W.complete && W.naturalWidth > 0 && Rn.uvs) {
          const D = R[F], Gn = Rn.uvs, $r = Rn.faces[D] * 2, br = Rn.faces[D + 1] * 2, xr = Rn.faces[D + 2] * 2, Tn = Gn[$r] * W.width, Sn = Gn[$r + 1] * W.height, Jn = Gn[br] * W.width, Yn = Gn[br + 1] * W.height, On = Gn[xr] * W.width, Fn = Gn[xr + 1] * W.height, Br = Tn * (Yn - Fn) - Sn * (Jn - On) + (Jn * Fn - On * Yn);
          if (Math.abs(Br) > 1e-5) {
            const gr = 1 / Br, h1 = (Y * (Yn - Fn) + rn * (Fn - Sn) + u * (Sn - Yn)) * gr, Pe = (Y * (On - Jn) + rn * (Tn - On) + u * (Jn - Tn)) * gr, f1 = (Y * (Jn * Fn - On * Yn) + rn * (On * Sn - Tn * Fn) + u * (Tn * Yn - Jn * Sn)) * gr, Ut = (N * (Yn - Fn) + tn * (Fn - Sn) + T * (Sn - Yn)) * gr, Vt = (N * (On - Jn) + tn * (Tn - On) + T * (Jn - Tn)) * gr, Nt = (N * (Jn * Fn - On * Yn) + tn * (On * Sn - Tn * Fn) + T * (Tn * Yn - Jn * Sn)) * gr;
            n.save(), n.beginPath(), n.moveTo(bn, Xn), n.lineTo(yn, nr), n.lineTo(mr, yr), n.closePath(), n.clip(), n.setTransform(h1, Ut, Pe, Vt, f1, Nt), n.drawImage(W, 0, 0), n.restore();
            const Yt = zn >= 1 ? 255 : zn * 255 | 0, Xt = Mr >= 1 ? 255 : Mr * 255 | 0, Zt = Nn >= 1 ? 255 : Nn * 255 | 0, Gt = pn >= 1 ? 255 : pn * 255 | 0, Bt = tr >= 1 ? 255 : tr * 255 | 0, Ht = en >= 1 ? 255 : en * 255 | 0, Qt = lr >= 1 ? 255 : lr * 255 | 0, Jt = In >= 1 ? 255 : In * 255 | 0, Kt = J >= 1 ? 255 : J * 255 | 0, ut = (Yt & 248) << 8 | (Xt & 252) << 3 | (Zt & 248) >> 3, n0 = (Gt & 248) << 8 | (Bt & 252) << 3 | (Ht & 248) >> 3, r0 = (Qt & 248) << 8 | (Jt & 252) << 3 | (Kt & 248) >> 3;
            let Vr = Y, Nr = N, re = rn, ee = tn, me = u, ye = T, Yr = $n, kr = hn, pe = fn, Xr = ut, Hr = n0, ge = r0;
            if (Yr > kr) {
              let cn;
              cn = Vr, Vr = re, re = cn, cn = Nr, Nr = ee, ee = cn, cn = Yr, Yr = kr, kr = cn, cn = Xr, Xr = Hr, Hr = cn;
            }
            if (kr > pe) {
              let cn;
              cn = re, re = me, me = cn, cn = ee, ee = ye, ye = cn, cn = kr, kr = pe, pe = cn, cn = Hr, Hr = ge, ge = cn;
            }
            if (Yr > kr) {
              let cn;
              cn = Vr, Vr = re, re = cn, cn = Nr, Nr = ee, ee = cn, cn = Yr, Yr = kr, kr = cn, cn = Xr, Xr = Hr, Hr = cn;
            }
            if (n.globalCompositeOperation = "multiply", pe - Yr < 0.01 || Xr === Hr && Hr === ge)
              O !== Xr && (n.fillStyle = Wn[Xr], O = Xr), n.beginPath(), n.moveTo(bn, Xn), n.lineTo(yn, nr), n.lineTo(mr, yr), n.closePath(), n.fill();
            else {
              const cn = (kr - Yr) / (pe - Yr), _e = Vr + cn * (me - Vr), ke = Nr + cn * (ye - Nr), Ee = re - _e, le = -(ee - ke), jr = Ee, o1 = le * le + jr * jr;
              let De, We;
              if (o1 < 1e-6)
                De = me, We = ye;
              else {
                const M1 = ((me - Vr) * le + (ye - Nr) * jr) / o1;
                De = Vr + M1 * le, We = Nr + M1 * jr;
              }
              const Ce = n.createLinearGradient(Vr, Nr, De, We);
              Ce.addColorStop(0, Wn[Xr]), Ce.addColorStop(1, Wn[ge]), O = -1, n.fillStyle = Ce, n.beginPath(), n.moveTo(bn, Xn), n.lineTo(yn, nr), n.lineTo(mr, yr), n.closePath(), n.fill();
            }
            if (n.globalCompositeOperation = "source-over", K > 0) {
              const cn = d >>> 16, _e = d >>> 8 & 255, ke = d & 255, Ee = cn & 248, v1 = _e & 252, le = ke & 248, jr = Ee << 8 | v1 << 3 | le >> 3;
              n.globalAlpha = K, X !== jr && (n.strokeStyle = Wn[jr], X = jr), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), O !== jr && (n.fillStyle = Wn[jr], O = jr), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        let k = wn * zn, H = kn * Mr, Q = En * Nn, Ln = wn * pn, Zn = kn * tr, Pn = En * en, hr = wn * lr, Dr = kn * In, Wr = En * J;
        if (k = k > 255 ? 255 : k, H = H > 255 ? 255 : H, Q = Q > 255 ? 255 : Q, Ln = Ln > 255 ? 255 : Ln, Zn = Zn > 255 ? 255 : Zn, Pn = Pn > 255 ? 255 : Pn, hr = hr > 255 ? 255 : hr, Dr = Dr > 255 ? 255 : Dr, Wr = Wr > 255 ? 255 : Wr, K > 0) {
          const D = 1 - K, Gn = d >>> 16, $r = d >>> 8 & 255, br = d & 255, xr = Gn * K, Tn = $r * K, Sn = br * K;
          k = k * D + xr | 0, H = H * D + Tn | 0, Q = Q * D + Sn | 0, Ln = Ln * D + xr | 0, Zn = Zn * D + Tn | 0, Pn = Pn * D + Sn | 0, hr = hr * D + xr | 0, Dr = Dr * D + Tn | 0, Wr = Wr * D + Sn | 0;
        } else
          k |= 0, H |= 0, Q |= 0, Ln |= 0, Zn |= 0, Pn |= 0, hr |= 0, Dr |= 0, Wr |= 0;
        const Pr = (k & 248) << 8 | (H & 252) << 3 | (Q & 248) >> 3, Me = (Ln & 248) << 8 | (Zn & 252) << 3 | (Pn & 248) >> 3, ie = (hr & 248) << 8 | (Dr & 252) << 3 | (Wr & 248) >> 3;
        if (Pr === Me && Me === ie) {
          n.beginPath(), n.moveTo(Y, N), n.lineTo(rn, tn), n.lineTo(u, T), n.closePath(), O !== Pr && (n.fillStyle = Wn[Pr], O = Pr), X !== Pr && (n.strokeStyle = Wn[Pr], X = Pr), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), n.fill();
          break;
        }
        let Or = Y, Fr = N, Cr = rn, Ur = tn, ur = u, ne = T, fr = $n, _r = hn, de = fn, Ir = Pr, ce = Me, Le = ie;
        if (fr > _r) {
          let D;
          D = Or, Or = Cr, Cr = D, D = Fr, Fr = Ur, Ur = D, D = fr, fr = _r, _r = D, D = Ir, Ir = ce, ce = D;
        }
        if (_r > de) {
          let D;
          D = Cr, Cr = ur, ur = D, D = Ur, Ur = ne, ne = D, D = _r, _r = de, de = D, D = ce, ce = Le, Le = D;
        }
        if (fr > _r) {
          let D;
          D = Or, Or = Cr, Cr = D, D = Fr, Fr = Ur, Ur = D, D = fr, fr = _r, _r = D, D = Ir, Ir = ce, ce = D;
        }
        if (de - fr < 0.01)
          n.beginPath(), n.moveTo(Y, N), n.lineTo(rn, tn), n.lineTo(u, T), n.closePath(), O !== Ir && (n.fillStyle = Wn[Ir], O = Ir), X !== Ir && (n.strokeStyle = Wn[Ir], X = Ir), U !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", U = 10), n.stroke(), n.fill();
        else {
          const D = (_r - fr) / (de - fr), Gn = Or + D * (ur - Or), $r = Fr + D * (ne - Fr), br = Cr - Gn, Tn = -(Ur - $r), Sn = br, Jn = Tn * Tn + Sn * Sn;
          let Yn, On;
          if (Jn < 1e-6)
            Yn = ur, On = ne;
          else {
            const gr = ((ur - Or) * Tn + (ne - Fr) * Sn) / Jn;
            Yn = Or + gr * Tn, On = Fr + gr * Sn;
          }
          const Fn = n.createLinearGradient(Or, Fr, Yn, On);
          Fn.addColorStop(0, Wn[Ir]), Fn.addColorStop(1, Wn[Le]), O = -1, n.fillStyle = Fn, n.beginPath(), n.moveTo(bn, Xn), n.lineTo(yn, nr), n.lineTo(mr, yr), n.closePath(), n.fill();
        }
        break;
      }
    }
  }
}
const y1 = Oe;
function Ct(n, r) {
  this.canvas = r || document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new Wt(), this.camera = n, this.scale = 1, this.layers = [];
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
var qr = Ct.prototype;
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
  return y1(
    this.worldToScreenMatrix,
    this.viewportMatrix,
    this.camera.projectionMatrix
  ), y1(
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
  mn.call(this);
}
Qr.prototype = Object.create(mn.prototype);
Qr.prototype.constructor = Qr;
Qr.prototype.color = 16777215;
Qr.prototype.range = 10;
Qr.prototype.type = fe.Type.DIRECTIONAL;
Qr.prototype.setGameObject = function(n) {
  mn.prototype.setGameObject.call(this, n), n.light = this;
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
  Component: mn,
  Camera: _t,
  CameraComponent: nn,
  MeshComponent: Bn,
  TransformComponent: Re,
  SpriteRenderer: e1,
  glMatrix: y2,
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
