const l1 = {
  depthSortingMask: parseInt("11", 2),
  //bitmask, bit per layer
  layersCount: 1
};
function IC() {
  this.now = Date.now();
}
var u3 = IC.prototype;
u3.time = 0;
u3.now = 0;
u3.dt = 60;
function qC() {
  this.gameObjects = [];
}
var o1 = qC.prototype;
o1.gameObjects = null;
o1.addGameObject = function(t) {
  this.gameObjects[this.gameObjects.length++] = t, t.setScene(this);
};
o1.removeGameObject = function(t) {
  this.gameObjects[this.gameObjects.indexOf(t)] = this.gameObjects[this.gameObjects.length - 1], this.gameObjects.length -= 1;
};
o1.retrieve = function() {
  const t = [], a = [];
  let s = 0, f = 0;
  for (let p = this.gameObjects.length - 1; p >= 0; p--)
    t[f++] = this.gameObjects[p];
  for (; f > 0; ) {
    const p = t[--f];
    p.transform.updateWorldMatrix(), a[s++] = p;
    const m = p.transform.children;
    for (let v = m.length - 1; v >= 0; v--)
      t[f++] = m[v].gameObject;
  }
  return a;
};
function YC(t) {
  this.time = new IC(), this.list = [], this.scene = new qC(), this.lastTickTime = 0;
}
var sp = YC.prototype;
sp.scene = null;
sp.time = null;
sp.tickRegister = function(t) {
  t._tickerIndex === void 0 && (t._tickerIndex = this.list.length, this.list.push(t));
};
sp.tickUnregister = function(t) {
  const a = t._tickerIndex;
  if (a === void 0) return;
  const s = this.list.pop();
  s !== t && (this.list[a] = s, s._tickerIndex = a), t._tickerIndex = void 0;
};
sp.update = function(t) {
  const a = this.list;
  for (let s = 0; s < a.length; s++)
    a[s].tick(t);
};
sp.tick = function() {
  for (var t = Date.now(), a = 0, s = t - this.time.now, f = this.time.dt; s >= f && (s -= f, this.time.now += f, this.time.time += f, this.update(this.time), !(a++ > 200)); )
    ;
};
function WC() {
  this.world = new YC();
  var t = this.world;
  this.tick = function a() {
    const s = performance.now();
    t.tick(), t.lastTickTime = performance.now() - s, requestAnimationFrame(a);
  };
}
var s1 = WC.prototype;
s1.world = null;
s1.render = null;
s1.run = function() {
  this.tick();
};
s1.rafHandler = null;
function Vn() {
}
var u1 = Vn.prototype;
u1.gameObject = null;
u1.enabled = !0;
u1.setGameObject = function(t) {
  this.gameObject = t;
};
u1.unsetGameObject = function() {
  this.gameObject = null;
};
function r5(t, a, s, f, p, m) {
  return t[a] = m[0] * s + m[4] * f + m[8] * p + m[12], t[a + 1] = m[1] * s + m[5] * f + m[9] * p + m[13], t[a + 2] = m[2] * s + m[6] * f + m[10] * p + m[14], t;
}
function a5(t, a, s, f, p, m) {
  return t[a] = m[0] * s + m[4] * f + m[8] * p + m[12], t[a + 1] = m[1] * s + m[5] * f + m[9] * p + m[13], t;
}
function c1(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = a[4], S = a[5], E = a[6], C = a[7], b = a[8], R = a[9], D = a[10], _ = a[11], A = a[12], L = a[13], U = a[14], q = a[15], $ = s[0], F = s[1], H = s[2], V = s[3];
  return t[0] = $ * f + F * g + H * b + V * A, t[1] = $ * p + F * S + H * R + V * L, t[2] = $ * m + F * E + H * D + V * U, t[3] = $ * v + F * C + H * _ + V * q, $ = s[4], F = s[5], H = s[6], V = s[7], t[4] = $ * f + F * g + H * b + V * A, t[5] = $ * p + F * S + H * R + V * L, t[6] = $ * m + F * E + H * D + V * U, t[7] = $ * v + F * C + H * _ + V * q, $ = s[8], F = s[9], H = s[10], V = s[11], t[8] = $ * f + F * g + H * b + V * A, t[9] = $ * p + F * S + H * R + V * L, t[10] = $ * m + F * E + H * D + V * U, t[11] = $ * v + F * C + H * _ + V * q, $ = s[12], F = s[13], H = s[14], V = s[15], t[12] = $ * f + F * g + H * b + V * A, t[13] = $ * p + F * S + H * R + V * L, t[14] = $ * m + F * E + H * D + V * U, t[15] = $ * v + F * C + H * _ + V * q, t;
}
var Rt = 1e-6, cn = typeof Float32Array < "u" ? Float32Array : Array, to = Math.random, BC = "zyx";
function Yo(t) {
  return t >= 0 ? Math.round(t) : t % 0.5 === 0 ? Math.floor(t) : Math.round(t);
}
function i5(t) {
  cn = t;
}
var l5 = Math.PI / 180, o5 = 180 / Math.PI;
function s5(t) {
  return t * l5;
}
function u5(t) {
  return t * o5;
}
function c5(t, a) {
  var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Rt;
  return Math.abs(t - a) <= s * Math.max(1, Math.abs(t), Math.abs(a));
}
const f5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: BC,
  get ARRAY_TYPE() {
    return cn;
  },
  EPSILON: Rt,
  RANDOM: to,
  equals: c5,
  round: Yo,
  setMatrixArrayType: i5,
  toDegree: u5,
  toRadian: s5
}, Symbol.toStringTag, { value: "Module" }));
function d5() {
  var t = new cn(4);
  return cn != Float32Array && (t[1] = 0, t[2] = 0), t[0] = 1, t[3] = 1, t;
}
function p5(t) {
  var a = new cn(4);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a;
}
function v5(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t;
}
function h5(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t;
}
function m5(t, a, s, f) {
  var p = new cn(4);
  return p[0] = t, p[1] = a, p[2] = s, p[3] = f, p;
}
function y5(t, a, s, f, p) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t;
}
function g5(t, a) {
  if (t === a) {
    var s = a[1];
    t[1] = a[2], t[2] = s;
  } else
    t[0] = a[0], t[1] = a[2], t[2] = a[1], t[3] = a[3];
  return t;
}
function S5(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s * m - p * f;
  return v ? (v = 1 / v, t[0] = m * v, t[1] = -f * v, t[2] = -p * v, t[3] = s * v, t) : null;
}
function x5(t, a) {
  var s = a[0];
  return t[0] = a[3], t[1] = -a[1], t[2] = -a[2], t[3] = s, t;
}
function E5(t) {
  return t[0] * t[3] - t[2] * t[1];
}
function GC(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = s[0], S = s[1], E = s[2], C = s[3];
  return t[0] = f * g + m * S, t[1] = p * g + v * S, t[2] = f * E + m * C, t[3] = p * E + v * C, t;
}
function w5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = Math.sin(s), S = Math.cos(s);
  return t[0] = f * S + m * g, t[1] = p * S + v * g, t[2] = f * -g + m * S, t[3] = p * -g + v * S, t;
}
function C5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = s[0], S = s[1];
  return t[0] = f * g, t[1] = p * g, t[2] = m * S, t[3] = v * S, t;
}
function b5(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = s, t[2] = -s, t[3] = f, t;
}
function T5(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = a[1], t;
}
function R5(t) {
  return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
}
function M5(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3]);
}
function _5(t, a, s, f) {
  return t[2] = f[2] / f[0], s[0] = f[0], s[1] = f[1], s[3] = f[3] - t[2] * s[1], [t, a, s];
}
function D5(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t;
}
function QC(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t;
}
function k5(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3];
}
function O5(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = a[0], g = a[1], S = a[2], E = a[3];
  return Math.abs(s - v) <= Rt * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(f - g) <= Rt * Math.max(1, Math.abs(f), Math.abs(g)) && Math.abs(p - S) <= Rt * Math.max(1, Math.abs(p), Math.abs(S)) && Math.abs(m - E) <= Rt * Math.max(1, Math.abs(m), Math.abs(E));
}
function A5(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t;
}
function L5(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t;
}
var N5 = GC, z5 = QC;
const U5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: _5,
  add: D5,
  adjoint: x5,
  clone: p5,
  copy: v5,
  create: d5,
  determinant: E5,
  equals: O5,
  exactEquals: k5,
  frob: M5,
  fromRotation: b5,
  fromScaling: T5,
  fromValues: m5,
  identity: h5,
  invert: S5,
  mul: N5,
  multiply: GC,
  multiplyScalar: A5,
  multiplyScalarAndAdd: L5,
  rotate: w5,
  scale: C5,
  set: y5,
  str: R5,
  sub: z5,
  subtract: QC,
  transpose: g5
}, Symbol.toStringTag, { value: "Module" }));
function j5() {
  var t = new cn(6);
  return cn != Float32Array && (t[1] = 0, t[2] = 0, t[4] = 0, t[5] = 0), t[0] = 1, t[3] = 1, t;
}
function F5(t) {
  var a = new cn(6);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a;
}
function P5(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t;
}
function $5(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
}
function H5(t, a, s, f, p, m) {
  var v = new cn(6);
  return v[0] = t, v[1] = a, v[2] = s, v[3] = f, v[4] = p, v[5] = m, v;
}
function V5(t, a, s, f, p, m, v) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t;
}
function I5(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], g = a[5], S = s * m - f * p;
  return S ? (S = 1 / S, t[0] = m * S, t[1] = -f * S, t[2] = -p * S, t[3] = s * S, t[4] = (p * g - m * v) * S, t[5] = (f * v - s * g) * S, t) : null;
}
function q5(t) {
  return t[0] * t[3] - t[1] * t[2];
}
function XC(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = a[4], S = a[5], E = s[0], C = s[1], b = s[2], R = s[3], D = s[4], _ = s[5];
  return t[0] = f * E + m * C, t[1] = p * E + v * C, t[2] = f * b + m * R, t[3] = p * b + v * R, t[4] = f * D + m * _ + g, t[5] = p * D + v * _ + S, t;
}
function Y5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = a[4], S = a[5], E = Math.sin(s), C = Math.cos(s);
  return t[0] = f * C + m * E, t[1] = p * C + v * E, t[2] = f * -E + m * C, t[3] = p * -E + v * C, t[4] = g, t[5] = S, t;
}
function W5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = a[4], S = a[5], E = s[0], C = s[1];
  return t[0] = f * E, t[1] = p * E, t[2] = m * C, t[3] = v * C, t[4] = g, t[5] = S, t;
}
function B5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = a[4], S = a[5], E = s[0], C = s[1];
  return t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = f * E + m * C + g, t[5] = p * E + v * C + S, t;
}
function G5(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = s, t[2] = -s, t[3] = f, t[4] = 0, t[5] = 0, t;
}
function Q5(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = a[1], t[4] = 0, t[5] = 0, t;
}
function X5(t, a) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = a[0], t[5] = a[1], t;
}
function K5(t) {
  return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")";
}
function Z5(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3] + t[4] * t[4] + t[5] * t[5] + 1);
}
function J5(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t[4] = a[4] + s[4], t[5] = a[5] + s[5], t;
}
function KC(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t[4] = a[4] - s[4], t[5] = a[5] - s[5], t;
}
function eO(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t[4] = a[4] * s, t[5] = a[5] * s, t;
}
function tO(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t[4] = a[4] + s[4] * f, t[5] = a[5] + s[5] * f, t;
}
function nO(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5];
}
function rO(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = t[4], g = t[5], S = a[0], E = a[1], C = a[2], b = a[3], R = a[4], D = a[5];
  return Math.abs(s - S) <= Rt * Math.max(1, Math.abs(s), Math.abs(S)) && Math.abs(f - E) <= Rt * Math.max(1, Math.abs(f), Math.abs(E)) && Math.abs(p - C) <= Rt * Math.max(1, Math.abs(p), Math.abs(C)) && Math.abs(m - b) <= Rt * Math.max(1, Math.abs(m), Math.abs(b)) && Math.abs(v - R) <= Rt * Math.max(1, Math.abs(v), Math.abs(R)) && Math.abs(g - D) <= Rt * Math.max(1, Math.abs(g), Math.abs(D));
}
var aO = XC, iO = KC;
const lO = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: J5,
  clone: F5,
  copy: P5,
  create: j5,
  determinant: q5,
  equals: rO,
  exactEquals: nO,
  frob: Z5,
  fromRotation: G5,
  fromScaling: Q5,
  fromTranslation: X5,
  fromValues: H5,
  identity: $5,
  invert: I5,
  mul: aO,
  multiply: XC,
  multiplyScalar: eO,
  multiplyScalarAndAdd: tO,
  rotate: Y5,
  scale: W5,
  set: V5,
  str: K5,
  sub: iO,
  subtract: KC,
  translate: B5
}, Symbol.toStringTag, { value: "Module" }));
function ZC() {
  var t = new cn(9);
  return cn != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[0] = 1, t[4] = 1, t[8] = 1, t;
}
function oO(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[4], t[4] = a[5], t[5] = a[6], t[6] = a[8], t[7] = a[9], t[8] = a[10], t;
}
function sO(t) {
  var a = new cn(9);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a;
}
function uO(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t;
}
function cO(t, a, s, f, p, m, v, g, S) {
  var E = new cn(9);
  return E[0] = t, E[1] = a, E[2] = s, E[3] = f, E[4] = p, E[5] = m, E[6] = v, E[7] = g, E[8] = S, E;
}
function fO(t, a, s, f, p, m, v, g, S, E) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t[6] = g, t[7] = S, t[8] = E, t;
}
function dO(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
}
function pO(t, a) {
  if (t === a) {
    var s = a[1], f = a[2], p = a[5];
    t[1] = a[3], t[2] = a[6], t[3] = s, t[5] = a[7], t[6] = f, t[7] = p;
  } else
    t[0] = a[0], t[1] = a[3], t[2] = a[6], t[3] = a[1], t[4] = a[4], t[5] = a[7], t[6] = a[2], t[7] = a[5], t[8] = a[8];
  return t;
}
function vO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], g = a[5], S = a[6], E = a[7], C = a[8], b = C * v - g * E, R = -C * m + g * S, D = E * m - v * S, _ = s * b + f * R + p * D;
  return _ ? (_ = 1 / _, t[0] = b * _, t[1] = (-C * f + p * E) * _, t[2] = (g * f - p * v) * _, t[3] = R * _, t[4] = (C * s - p * S) * _, t[5] = (-g * s + p * m) * _, t[6] = D * _, t[7] = (-E * s + f * S) * _, t[8] = (v * s - f * m) * _, t) : null;
}
function hO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], g = a[5], S = a[6], E = a[7], C = a[8];
  return t[0] = v * C - g * E, t[1] = p * E - f * C, t[2] = f * g - p * v, t[3] = g * S - m * C, t[4] = s * C - p * S, t[5] = p * m - s * g, t[6] = m * E - v * S, t[7] = f * S - s * E, t[8] = s * v - f * m, t;
}
function mO(t) {
  var a = t[0], s = t[1], f = t[2], p = t[3], m = t[4], v = t[5], g = t[6], S = t[7], E = t[8];
  return a * (E * m - v * S) + s * (-E * p + v * g) + f * (S * p - m * g);
}
function JC(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = a[4], S = a[5], E = a[6], C = a[7], b = a[8], R = s[0], D = s[1], _ = s[2], A = s[3], L = s[4], U = s[5], q = s[6], $ = s[7], F = s[8];
  return t[0] = R * f + D * v + _ * E, t[1] = R * p + D * g + _ * C, t[2] = R * m + D * S + _ * b, t[3] = A * f + L * v + U * E, t[4] = A * p + L * g + U * C, t[5] = A * m + L * S + U * b, t[6] = q * f + $ * v + F * E, t[7] = q * p + $ * g + F * C, t[8] = q * m + $ * S + F * b, t;
}
function yO(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = a[4], S = a[5], E = a[6], C = a[7], b = a[8], R = s[0], D = s[1];
  return t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = g, t[5] = S, t[6] = R * f + D * v + E, t[7] = R * p + D * g + C, t[8] = R * m + D * S + b, t;
}
function gO(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = a[4], S = a[5], E = a[6], C = a[7], b = a[8], R = Math.sin(s), D = Math.cos(s);
  return t[0] = D * f + R * v, t[1] = D * p + R * g, t[2] = D * m + R * S, t[3] = D * v - R * f, t[4] = D * g - R * p, t[5] = D * S - R * m, t[6] = E, t[7] = C, t[8] = b, t;
}
function SO(t, a, s) {
  var f = s[0], p = s[1];
  return t[0] = f * a[0], t[1] = f * a[1], t[2] = f * a[2], t[3] = p * a[3], t[4] = p * a[4], t[5] = p * a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t;
}
function xO(t, a) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = a[0], t[7] = a[1], t[8] = 1, t;
}
function EO(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = s, t[2] = 0, t[3] = -s, t[4] = f, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
}
function wO(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = a[1], t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
}
function CO(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = 0, t[3] = a[2], t[4] = a[3], t[5] = 0, t[6] = a[4], t[7] = a[5], t[8] = 1, t;
}
function bO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s + s, g = f + f, S = p + p, E = s * v, C = f * v, b = f * g, R = p * v, D = p * g, _ = p * S, A = m * v, L = m * g, U = m * S;
  return t[0] = 1 - b - _, t[3] = C - U, t[6] = R + L, t[1] = C + U, t[4] = 1 - E - _, t[7] = D - A, t[2] = R - L, t[5] = D + A, t[8] = 1 - E - b, t;
}
function TO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], g = a[5], S = a[6], E = a[7], C = a[8], b = a[9], R = a[10], D = a[11], _ = a[12], A = a[13], L = a[14], U = a[15], q = s * g - f * v, $ = s * S - p * v, F = s * E - m * v, H = f * S - p * g, V = f * E - m * g, Y = p * E - m * S, ie = C * A - b * _, Q = C * L - R * _, P = C * U - D * _, ne = b * L - R * A, re = b * U - D * A, G = R * U - D * L, Z = q * G - $ * re + F * ne + H * P - V * Q + Y * ie;
  return Z ? (Z = 1 / Z, t[0] = (g * G - S * re + E * ne) * Z, t[1] = (S * P - v * G - E * Q) * Z, t[2] = (v * re - g * P + E * ie) * Z, t[3] = (p * re - f * G - m * ne) * Z, t[4] = (s * G - p * P + m * Q) * Z, t[5] = (f * P - s * re - m * ie) * Z, t[6] = (A * Y - L * V + U * H) * Z, t[7] = (L * F - _ * Y - U * $) * Z, t[8] = (_ * V - A * F + U * q) * Z, t) : null;
}
function RO(t, a, s) {
  return t[0] = 2 / a, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = -2 / s, t[5] = 0, t[6] = -1, t[7] = 1, t[8] = 1, t;
}
function MO(t) {
  return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")";
}
function _O(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3] + t[4] * t[4] + t[5] * t[5] + t[6] * t[6] + t[7] * t[7] + t[8] * t[8]);
}
function DO(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t[4] = a[4] + s[4], t[5] = a[5] + s[5], t[6] = a[6] + s[6], t[7] = a[7] + s[7], t[8] = a[8] + s[8], t;
}
function eb(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t[4] = a[4] - s[4], t[5] = a[5] - s[5], t[6] = a[6] - s[6], t[7] = a[7] - s[7], t[8] = a[8] - s[8], t;
}
function kO(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t[4] = a[4] * s, t[5] = a[5] * s, t[6] = a[6] * s, t[7] = a[7] * s, t[8] = a[8] * s, t;
}
function OO(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t[4] = a[4] + s[4] * f, t[5] = a[5] + s[5] * f, t[6] = a[6] + s[6] * f, t[7] = a[7] + s[7] * f, t[8] = a[8] + s[8] * f, t;
}
function AO(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7] && t[8] === a[8];
}
function LO(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = t[4], g = t[5], S = t[6], E = t[7], C = t[8], b = a[0], R = a[1], D = a[2], _ = a[3], A = a[4], L = a[5], U = a[6], q = a[7], $ = a[8];
  return Math.abs(s - b) <= Rt * Math.max(1, Math.abs(s), Math.abs(b)) && Math.abs(f - R) <= Rt * Math.max(1, Math.abs(f), Math.abs(R)) && Math.abs(p - D) <= Rt * Math.max(1, Math.abs(p), Math.abs(D)) && Math.abs(m - _) <= Rt * Math.max(1, Math.abs(m), Math.abs(_)) && Math.abs(v - A) <= Rt * Math.max(1, Math.abs(v), Math.abs(A)) && Math.abs(g - L) <= Rt * Math.max(1, Math.abs(g), Math.abs(L)) && Math.abs(S - U) <= Rt * Math.max(1, Math.abs(S), Math.abs(U)) && Math.abs(E - q) <= Rt * Math.max(1, Math.abs(E), Math.abs(q)) && Math.abs(C - $) <= Rt * Math.max(1, Math.abs(C), Math.abs($));
}
var NO = JC, zO = eb;
const UO = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: DO,
  adjoint: hO,
  clone: sO,
  copy: uO,
  create: ZC,
  determinant: mO,
  equals: LO,
  exactEquals: AO,
  frob: _O,
  fromMat2d: CO,
  fromMat4: oO,
  fromQuat: bO,
  fromRotation: EO,
  fromScaling: wO,
  fromTranslation: xO,
  fromValues: cO,
  identity: dO,
  invert: vO,
  mul: NO,
  multiply: JC,
  multiplyScalar: kO,
  multiplyScalarAndAdd: OO,
  normalFromMat4: TO,
  projection: RO,
  rotate: gO,
  scale: SO,
  set: fO,
  str: MO,
  sub: zO,
  subtract: eb,
  translate: yO,
  transpose: pO
}, Symbol.toStringTag, { value: "Module" }));
function jO() {
  var t = new cn(16);
  return cn != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0), t[0] = 1, t[5] = 1, t[10] = 1, t[15] = 1, t;
}
function FO(t) {
  var a = new cn(16);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a[9] = t[9], a[10] = t[10], a[11] = t[11], a[12] = t[12], a[13] = t[13], a[14] = t[14], a[15] = t[15], a;
}
function PO(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t;
}
function $O(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A) {
  var L = new cn(16);
  return L[0] = t, L[1] = a, L[2] = s, L[3] = f, L[4] = p, L[5] = m, L[6] = v, L[7] = g, L[8] = S, L[9] = E, L[10] = C, L[11] = b, L[12] = R, L[13] = D, L[14] = _, L[15] = A, L;
}
function HO(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t[6] = g, t[7] = S, t[8] = E, t[9] = C, t[10] = b, t[11] = R, t[12] = D, t[13] = _, t[14] = A, t[15] = L, t;
}
function c3(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function VO(t, a) {
  if (t === a) {
    var s = a[1], f = a[2], p = a[3], m = a[6], v = a[7], g = a[11];
    t[1] = a[4], t[2] = a[8], t[3] = a[12], t[4] = s, t[6] = a[9], t[7] = a[13], t[8] = f, t[9] = m, t[11] = a[14], t[12] = p, t[13] = v, t[14] = g;
  } else
    t[0] = a[0], t[1] = a[4], t[2] = a[8], t[3] = a[12], t[4] = a[1], t[5] = a[5], t[6] = a[9], t[7] = a[13], t[8] = a[2], t[9] = a[6], t[10] = a[10], t[11] = a[14], t[12] = a[3], t[13] = a[7], t[14] = a[11], t[15] = a[15];
  return t;
}
function tb(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], g = a[5], S = a[6], E = a[7], C = a[8], b = a[9], R = a[10], D = a[11], _ = a[12], A = a[13], L = a[14], U = a[15], q = s * g - f * v, $ = s * S - p * v, F = s * E - m * v, H = f * S - p * g, V = f * E - m * g, Y = p * E - m * S, ie = C * A - b * _, Q = C * L - R * _, P = C * U - D * _, ne = b * L - R * A, re = b * U - D * A, G = R * U - D * L, Z = q * G - $ * re + F * ne + H * P - V * Q + Y * ie;
  return Z ? (Z = 1 / Z, t[0] = (g * G - S * re + E * ne) * Z, t[1] = (p * re - f * G - m * ne) * Z, t[2] = (A * Y - L * V + U * H) * Z, t[3] = (R * V - b * Y - D * H) * Z, t[4] = (S * P - v * G - E * Q) * Z, t[5] = (s * G - p * P + m * Q) * Z, t[6] = (L * F - _ * Y - U * $) * Z, t[7] = (C * Y - R * F + D * $) * Z, t[8] = (v * re - g * P + E * ie) * Z, t[9] = (f * P - s * re - m * ie) * Z, t[10] = (_ * V - A * F + U * q) * Z, t[11] = (b * F - C * V - D * q) * Z, t[12] = (g * Q - v * ne - S * ie) * Z, t[13] = (s * ne - f * Q + p * ie) * Z, t[14] = (A * $ - _ * H - L * q) * Z, t[15] = (C * H - b * $ + R * q) * Z, t) : null;
}
function IO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], g = a[5], S = a[6], E = a[7], C = a[8], b = a[9], R = a[10], D = a[11], _ = a[12], A = a[13], L = a[14], U = a[15], q = s * g - f * v, $ = s * S - p * v, F = s * E - m * v, H = f * S - p * g, V = f * E - m * g, Y = p * E - m * S, ie = C * A - b * _, Q = C * L - R * _, P = C * U - D * _, ne = b * L - R * A, re = b * U - D * A, G = R * U - D * L;
  return t[0] = g * G - S * re + E * ne, t[1] = p * re - f * G - m * ne, t[2] = A * Y - L * V + U * H, t[3] = R * V - b * Y - D * H, t[4] = S * P - v * G - E * Q, t[5] = s * G - p * P + m * Q, t[6] = L * F - _ * Y - U * $, t[7] = C * Y - R * F + D * $, t[8] = v * re - g * P + E * ie, t[9] = f * P - s * re - m * ie, t[10] = _ * V - A * F + U * q, t[11] = b * F - C * V - D * q, t[12] = g * Q - v * ne - S * ie, t[13] = s * ne - f * Q + p * ie, t[14] = A * $ - _ * H - L * q, t[15] = C * H - b * $ + R * q, t;
}
function qO(t) {
  var a = t[0], s = t[1], f = t[2], p = t[3], m = t[4], v = t[5], g = t[6], S = t[7], E = t[8], C = t[9], b = t[10], R = t[11], D = t[12], _ = t[13], A = t[14], L = t[15], U = a * v - s * m, q = a * g - f * m, $ = s * g - f * v, F = E * _ - C * D, H = E * A - b * D, V = C * A - b * _, Y = a * V - s * H + f * F, ie = m * V - v * H + g * F, Q = E * $ - C * q + b * U, P = D * $ - _ * q + A * U;
  return S * Y - p * ie + L * Q - R * P;
}
function nb(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = a[4], S = a[5], E = a[6], C = a[7], b = a[8], R = a[9], D = a[10], _ = a[11], A = a[12], L = a[13], U = a[14], q = a[15], $ = s[0], F = s[1], H = s[2], V = s[3];
  return t[0] = $ * f + F * g + H * b + V * A, t[1] = $ * p + F * S + H * R + V * L, t[2] = $ * m + F * E + H * D + V * U, t[3] = $ * v + F * C + H * _ + V * q, $ = s[4], F = s[5], H = s[6], V = s[7], t[4] = $ * f + F * g + H * b + V * A, t[5] = $ * p + F * S + H * R + V * L, t[6] = $ * m + F * E + H * D + V * U, t[7] = $ * v + F * C + H * _ + V * q, $ = s[8], F = s[9], H = s[10], V = s[11], t[8] = $ * f + F * g + H * b + V * A, t[9] = $ * p + F * S + H * R + V * L, t[10] = $ * m + F * E + H * D + V * U, t[11] = $ * v + F * C + H * _ + V * q, $ = s[12], F = s[13], H = s[14], V = s[15], t[12] = $ * f + F * g + H * b + V * A, t[13] = $ * p + F * S + H * R + V * L, t[14] = $ * m + F * E + H * D + V * U, t[15] = $ * v + F * C + H * _ + V * q, t;
}
function W2(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v, g, S, E, C, b, R, D, _, A, L, U;
  return a === t ? (t[12] = a[0] * f + a[4] * p + a[8] * m + a[12], t[13] = a[1] * f + a[5] * p + a[9] * m + a[13], t[14] = a[2] * f + a[6] * p + a[10] * m + a[14], t[15] = a[3] * f + a[7] * p + a[11] * m + a[15]) : (v = a[0], g = a[1], S = a[2], E = a[3], C = a[4], b = a[5], R = a[6], D = a[7], _ = a[8], A = a[9], L = a[10], U = a[11], t[0] = v, t[1] = g, t[2] = S, t[3] = E, t[4] = C, t[5] = b, t[6] = R, t[7] = D, t[8] = _, t[9] = A, t[10] = L, t[11] = U, t[12] = v * f + C * p + _ * m + a[12], t[13] = g * f + b * p + A * m + a[13], t[14] = S * f + R * p + L * m + a[14], t[15] = E * f + D * p + U * m + a[15]), t;
}
function rb(t, a, s) {
  var f = s[0], p = s[1], m = s[2];
  return t[0] = a[0] * f, t[1] = a[1] * f, t[2] = a[2] * f, t[3] = a[3] * f, t[4] = a[4] * p, t[5] = a[5] * p, t[6] = a[6] * p, t[7] = a[7] * p, t[8] = a[8] * m, t[9] = a[9] * m, t[10] = a[10] * m, t[11] = a[11] * m, t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t;
}
function YO(t, a, s, f) {
  var p = f[0], m = f[1], v = f[2], g = Math.sqrt(p * p + m * m + v * v), S, E, C, b, R, D, _, A, L, U, q, $, F, H, V, Y, ie, Q, P, ne, re, G, Z, le;
  return g < Rt ? null : (g = 1 / g, p *= g, m *= g, v *= g, S = Math.sin(s), E = Math.cos(s), C = 1 - E, b = a[0], R = a[1], D = a[2], _ = a[3], A = a[4], L = a[5], U = a[6], q = a[7], $ = a[8], F = a[9], H = a[10], V = a[11], Y = p * p * C + E, ie = m * p * C + v * S, Q = v * p * C - m * S, P = p * m * C - v * S, ne = m * m * C + E, re = v * m * C + p * S, G = p * v * C + m * S, Z = m * v * C - p * S, le = v * v * C + E, t[0] = b * Y + A * ie + $ * Q, t[1] = R * Y + L * ie + F * Q, t[2] = D * Y + U * ie + H * Q, t[3] = _ * Y + q * ie + V * Q, t[4] = b * P + A * ne + $ * re, t[5] = R * P + L * ne + F * re, t[6] = D * P + U * ne + H * re, t[7] = _ * P + q * ne + V * re, t[8] = b * G + A * Z + $ * le, t[9] = R * G + L * Z + F * le, t[10] = D * G + U * Z + H * le, t[11] = _ * G + q * Z + V * le, a !== t && (t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t);
}
function WO(t, a, s) {
  var f = Math.sin(s), p = Math.cos(s), m = a[4], v = a[5], g = a[6], S = a[7], E = a[8], C = a[9], b = a[10], R = a[11];
  return a !== t && (t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[4] = m * p + E * f, t[5] = v * p + C * f, t[6] = g * p + b * f, t[7] = S * p + R * f, t[8] = E * p - m * f, t[9] = C * p - v * f, t[10] = b * p - g * f, t[11] = R * p - S * f, t;
}
function BO(t, a, s) {
  var f = Math.sin(s), p = Math.cos(s), m = a[0], v = a[1], g = a[2], S = a[3], E = a[8], C = a[9], b = a[10], R = a[11];
  return a !== t && (t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[0] = m * p - E * f, t[1] = v * p - C * f, t[2] = g * p - b * f, t[3] = S * p - R * f, t[8] = m * f + E * p, t[9] = v * f + C * p, t[10] = g * f + b * p, t[11] = S * f + R * p, t;
}
function GO(t, a, s) {
  var f = Math.sin(s), p = Math.cos(s), m = a[0], v = a[1], g = a[2], S = a[3], E = a[4], C = a[5], b = a[6], R = a[7];
  return a !== t && (t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[0] = m * p + E * f, t[1] = v * p + C * f, t[2] = g * p + b * f, t[3] = S * p + R * f, t[4] = E * p - m * f, t[5] = C * p - v * f, t[6] = b * p - g * f, t[7] = R * p - S * f, t;
}
function QO(t, a) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = a[0], t[13] = a[1], t[14] = a[2], t[15] = 1, t;
}
function XO(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = a[1], t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = a[2], t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function KO(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v = Math.sqrt(f * f + p * p + m * m), g, S, E;
  return v < Rt ? null : (v = 1 / v, f *= v, p *= v, m *= v, g = Math.sin(a), S = Math.cos(a), E = 1 - S, t[0] = f * f * E + S, t[1] = p * f * E + m * g, t[2] = m * f * E - p * g, t[3] = 0, t[4] = f * p * E - m * g, t[5] = p * p * E + S, t[6] = m * p * E + f * g, t[7] = 0, t[8] = f * m * E + p * g, t[9] = p * m * E - f * g, t[10] = m * m * E + S, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t);
}
function ZO(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = f, t[6] = s, t[7] = 0, t[8] = 0, t[9] = -s, t[10] = f, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function JO(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = 0, t[2] = -s, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = s, t[9] = 0, t[10] = f, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function eA(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = s, t[2] = 0, t[3] = 0, t[4] = -s, t[5] = f, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function ab(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = f + f, S = p + p, E = m + m, C = f * g, b = f * S, R = f * E, D = p * S, _ = p * E, A = m * E, L = v * g, U = v * S, q = v * E;
  return t[0] = 1 - (D + A), t[1] = b + q, t[2] = R - U, t[3] = 0, t[4] = b - q, t[5] = 1 - (C + A), t[6] = _ + L, t[7] = 0, t[8] = R + U, t[9] = _ - L, t[10] = 1 - (C + D), t[11] = 0, t[12] = s[0], t[13] = s[1], t[14] = s[2], t[15] = 1, t;
}
function tA(t, a) {
  var s = new cn(3), f = -a[0], p = -a[1], m = -a[2], v = a[3], g = a[4], S = a[5], E = a[6], C = a[7], b = f * f + p * p + m * m + v * v;
  return b > 0 ? (s[0] = (g * v + C * f + S * m - E * p) * 2 / b, s[1] = (S * v + C * p + E * f - g * m) * 2 / b, s[2] = (E * v + C * m + g * p - S * f) * 2 / b) : (s[0] = (g * v + C * f + S * m - E * p) * 2, s[1] = (S * v + C * p + E * f - g * m) * 2, s[2] = (E * v + C * m + g * p - S * f) * 2), ab(t, a, s), t;
}
function ib(t, a) {
  return t[0] = a[12], t[1] = a[13], t[2] = a[14], t;
}
function lb(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[4], v = a[5], g = a[6], S = a[8], E = a[9], C = a[10];
  return t[0] = Math.sqrt(s * s + f * f + p * p), t[1] = Math.sqrt(m * m + v * v + g * g), t[2] = Math.sqrt(S * S + E * E + C * C), t;
}
function ob(t, a) {
  var s = new cn(3);
  lb(s, a);
  var f = 1 / s[0], p = 1 / s[1], m = 1 / s[2], v = a[0] * f, g = a[1] * p, S = a[2] * m, E = a[4] * f, C = a[5] * p, b = a[6] * m, R = a[8] * f, D = a[9] * p, _ = a[10] * m, A = v + C + _, L = 0;
  return A > 0 ? (L = Math.sqrt(A + 1) * 2, t[3] = 0.25 * L, t[0] = (b - D) / L, t[1] = (R - S) / L, t[2] = (g - E) / L) : v > C && v > _ ? (L = Math.sqrt(1 + v - C - _) * 2, t[3] = (b - D) / L, t[0] = 0.25 * L, t[1] = (g + E) / L, t[2] = (R + S) / L) : C > _ ? (L = Math.sqrt(1 + C - v - _) * 2, t[3] = (R - S) / L, t[0] = (g + E) / L, t[1] = 0.25 * L, t[2] = (b + D) / L) : (L = Math.sqrt(1 + _ - v - C) * 2, t[3] = (g - E) / L, t[0] = (R + S) / L, t[1] = (b + D) / L, t[2] = 0.25 * L), t;
}
function nA(t, a, s, f) {
  a[0] = f[12], a[1] = f[13], a[2] = f[14];
  var p = f[0], m = f[1], v = f[2], g = f[4], S = f[5], E = f[6], C = f[8], b = f[9], R = f[10];
  s[0] = Math.sqrt(p * p + m * m + v * v), s[1] = Math.sqrt(g * g + S * S + E * E), s[2] = Math.sqrt(C * C + b * b + R * R);
  var D = 1 / s[0], _ = 1 / s[1], A = 1 / s[2], L = p * D, U = m * _, q = v * A, $ = g * D, F = S * _, H = E * A, V = C * D, Y = b * _, ie = R * A, Q = L + F + ie, P = 0;
  return Q > 0 ? (P = Math.sqrt(Q + 1) * 2, t[3] = 0.25 * P, t[0] = (H - Y) / P, t[1] = (V - q) / P, t[2] = (U - $) / P) : L > F && L > ie ? (P = Math.sqrt(1 + L - F - ie) * 2, t[3] = (H - Y) / P, t[0] = 0.25 * P, t[1] = (U + $) / P, t[2] = (V + q) / P) : F > ie ? (P = Math.sqrt(1 + F - L - ie) * 2, t[3] = (V - q) / P, t[0] = (U + $) / P, t[1] = 0.25 * P, t[2] = (H + Y) / P) : (P = Math.sqrt(1 + ie - L - F) * 2, t[3] = (U - $) / P, t[0] = (V + q) / P, t[1] = (H + Y) / P, t[2] = 0.25 * P), t;
}
function rA(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2], g = a[3], S = p + p, E = m + m, C = v + v, b = p * S, R = p * E, D = p * C, _ = m * E, A = m * C, L = v * C, U = g * S, q = g * E, $ = g * C, F = f[0], H = f[1], V = f[2];
  return t[0] = (1 - (_ + L)) * F, t[1] = (R + $) * F, t[2] = (D - q) * F, t[3] = 0, t[4] = (R - $) * H, t[5] = (1 - (b + L)) * H, t[6] = (A + U) * H, t[7] = 0, t[8] = (D + q) * V, t[9] = (A - U) * V, t[10] = (1 - (b + _)) * V, t[11] = 0, t[12] = s[0], t[13] = s[1], t[14] = s[2], t[15] = 1, t;
}
function aA(t, a, s, f, p) {
  var m = a[0], v = a[1], g = a[2], S = a[3], E = m + m, C = v + v, b = g + g, R = m * E, D = m * C, _ = m * b, A = v * C, L = v * b, U = g * b, q = S * E, $ = S * C, F = S * b, H = f[0], V = f[1], Y = f[2], ie = p[0], Q = p[1], P = p[2], ne = (1 - (A + U)) * H, re = (D + F) * H, G = (_ - $) * H, Z = (D - F) * V, le = (1 - (R + U)) * V, de = (L + q) * V, oe = (_ + $) * Y, ae = (L - q) * Y, fe = (1 - (R + A)) * Y;
  return t[0] = ne, t[1] = re, t[2] = G, t[3] = 0, t[4] = Z, t[5] = le, t[6] = de, t[7] = 0, t[8] = oe, t[9] = ae, t[10] = fe, t[11] = 0, t[12] = s[0] + ie - (ne * ie + Z * Q + oe * P), t[13] = s[1] + Q - (re * ie + le * Q + ae * P), t[14] = s[2] + P - (G * ie + de * Q + fe * P), t[15] = 1, t;
}
function iA(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s + s, g = f + f, S = p + p, E = s * v, C = f * v, b = f * g, R = p * v, D = p * g, _ = p * S, A = m * v, L = m * g, U = m * S;
  return t[0] = 1 - b - _, t[1] = C + U, t[2] = R - L, t[3] = 0, t[4] = C - U, t[5] = 1 - E - _, t[6] = D + A, t[7] = 0, t[8] = R + L, t[9] = D - A, t[10] = 1 - E - b, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function lA(t, a, s, f, p, m, v) {
  var g = 1 / (s - a), S = 1 / (p - f), E = 1 / (m - v);
  return t[0] = m * 2 * g, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = m * 2 * S, t[6] = 0, t[7] = 0, t[8] = (s + a) * g, t[9] = (p + f) * S, t[10] = (v + m) * E, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = v * m * 2 * E, t[15] = 0, t;
}
function sb(t, a, s, f, p) {
  var m = 1 / Math.tan(a / 2);
  if (t[0] = m / s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = m, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = -1, t[12] = 0, t[13] = 0, t[15] = 0, p != null && p !== 1 / 0) {
    var v = 1 / (f - p);
    t[10] = (p + f) * v, t[14] = 2 * p * f * v;
  } else
    t[10] = -1, t[14] = -2 * f;
  return t;
}
var oA = sb;
function sA(t, a, s, f, p) {
  var m = 1 / Math.tan(a / 2);
  if (t[0] = m / s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = m, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = -1, t[12] = 0, t[13] = 0, t[15] = 0, p != null && p !== 1 / 0) {
    var v = 1 / (f - p);
    t[10] = p * v, t[14] = p * f * v;
  } else
    t[10] = -1, t[14] = -f;
  return t;
}
function uA(t, a, s, f) {
  var p = Math.tan(a.upDegrees * Math.PI / 180), m = Math.tan(a.downDegrees * Math.PI / 180), v = Math.tan(a.leftDegrees * Math.PI / 180), g = Math.tan(a.rightDegrees * Math.PI / 180), S = 2 / (v + g), E = 2 / (p + m);
  return t[0] = S, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = E, t[6] = 0, t[7] = 0, t[8] = -((v - g) * S * 0.5), t[9] = (p - m) * E * 0.5, t[10] = f / (s - f), t[11] = -1, t[12] = 0, t[13] = 0, t[14] = f * s / (s - f), t[15] = 0, t;
}
function ub(t, a, s, f, p, m, v) {
  var g = 1 / (a - s), S = 1 / (f - p), E = 1 / (m - v);
  return t[0] = -2 * g, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * S, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * E, t[11] = 0, t[12] = (a + s) * g, t[13] = (p + f) * S, t[14] = (v + m) * E, t[15] = 1, t;
}
var cb = ub;
function cA(t, a, s, f, p, m, v) {
  var g = 1 / (a - s), S = 1 / (f - p), E = 1 / (m - v);
  return t[0] = -2 * g, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * S, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = E, t[11] = 0, t[12] = (a + s) * g, t[13] = (p + f) * S, t[14] = m * E, t[15] = 1, t;
}
function fA(t, a, s, f) {
  var p, m, v, g, S, E, C, b, R, D, _ = a[0], A = a[1], L = a[2], U = f[0], q = f[1], $ = f[2], F = s[0], H = s[1], V = s[2];
  return Math.abs(_ - F) < Rt && Math.abs(A - H) < Rt && Math.abs(L - V) < Rt ? c3(t) : (C = _ - F, b = A - H, R = L - V, D = 1 / Math.sqrt(C * C + b * b + R * R), C *= D, b *= D, R *= D, p = q * R - $ * b, m = $ * C - U * R, v = U * b - q * C, D = Math.sqrt(p * p + m * m + v * v), D ? (D = 1 / D, p *= D, m *= D, v *= D) : (p = 0, m = 0, v = 0), g = b * v - R * m, S = R * p - C * v, E = C * m - b * p, D = Math.sqrt(g * g + S * S + E * E), D ? (D = 1 / D, g *= D, S *= D, E *= D) : (g = 0, S = 0, E = 0), t[0] = p, t[1] = g, t[2] = C, t[3] = 0, t[4] = m, t[5] = S, t[6] = b, t[7] = 0, t[8] = v, t[9] = E, t[10] = R, t[11] = 0, t[12] = -(p * _ + m * A + v * L), t[13] = -(g * _ + S * A + E * L), t[14] = -(C * _ + b * A + R * L), t[15] = 1, t);
}
function dA(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2], g = f[0], S = f[1], E = f[2], C = p - s[0], b = m - s[1], R = v - s[2], D = C * C + b * b + R * R;
  D > 0 && (D = 1 / Math.sqrt(D), C *= D, b *= D, R *= D);
  var _ = S * R - E * b, A = E * C - g * R, L = g * b - S * C;
  return D = _ * _ + A * A + L * L, D > 0 && (D = 1 / Math.sqrt(D), _ *= D, A *= D, L *= D), t[0] = _, t[1] = A, t[2] = L, t[3] = 0, t[4] = b * L - R * A, t[5] = R * _ - C * L, t[6] = C * A - b * _, t[7] = 0, t[8] = C, t[9] = b, t[10] = R, t[11] = 0, t[12] = p, t[13] = m, t[14] = v, t[15] = 1, t;
}
function pA(t) {
  return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")";
}
function vA(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3] + t[4] * t[4] + t[5] * t[5] + t[6] * t[6] + t[7] * t[7] + t[8] * t[8] + t[9] * t[9] + t[10] * t[10] + t[11] * t[11] + t[12] * t[12] + t[13] * t[13] + t[14] * t[14] + t[15] * t[15]);
}
function hA(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t[4] = a[4] + s[4], t[5] = a[5] + s[5], t[6] = a[6] + s[6], t[7] = a[7] + s[7], t[8] = a[8] + s[8], t[9] = a[9] + s[9], t[10] = a[10] + s[10], t[11] = a[11] + s[11], t[12] = a[12] + s[12], t[13] = a[13] + s[13], t[14] = a[14] + s[14], t[15] = a[15] + s[15], t;
}
function fb(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t[4] = a[4] - s[4], t[5] = a[5] - s[5], t[6] = a[6] - s[6], t[7] = a[7] - s[7], t[8] = a[8] - s[8], t[9] = a[9] - s[9], t[10] = a[10] - s[10], t[11] = a[11] - s[11], t[12] = a[12] - s[12], t[13] = a[13] - s[13], t[14] = a[14] - s[14], t[15] = a[15] - s[15], t;
}
function mA(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t[4] = a[4] * s, t[5] = a[5] * s, t[6] = a[6] * s, t[7] = a[7] * s, t[8] = a[8] * s, t[9] = a[9] * s, t[10] = a[10] * s, t[11] = a[11] * s, t[12] = a[12] * s, t[13] = a[13] * s, t[14] = a[14] * s, t[15] = a[15] * s, t;
}
function yA(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t[4] = a[4] + s[4] * f, t[5] = a[5] + s[5] * f, t[6] = a[6] + s[6] * f, t[7] = a[7] + s[7] * f, t[8] = a[8] + s[8] * f, t[9] = a[9] + s[9] * f, t[10] = a[10] + s[10] * f, t[11] = a[11] + s[11] * f, t[12] = a[12] + s[12] * f, t[13] = a[13] + s[13] * f, t[14] = a[14] + s[14] * f, t[15] = a[15] + s[15] * f, t;
}
function gA(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7] && t[8] === a[8] && t[9] === a[9] && t[10] === a[10] && t[11] === a[11] && t[12] === a[12] && t[13] === a[13] && t[14] === a[14] && t[15] === a[15];
}
function SA(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = t[4], g = t[5], S = t[6], E = t[7], C = t[8], b = t[9], R = t[10], D = t[11], _ = t[12], A = t[13], L = t[14], U = t[15], q = a[0], $ = a[1], F = a[2], H = a[3], V = a[4], Y = a[5], ie = a[6], Q = a[7], P = a[8], ne = a[9], re = a[10], G = a[11], Z = a[12], le = a[13], de = a[14], oe = a[15];
  return Math.abs(s - q) <= Rt * Math.max(1, Math.abs(s), Math.abs(q)) && Math.abs(f - $) <= Rt * Math.max(1, Math.abs(f), Math.abs($)) && Math.abs(p - F) <= Rt * Math.max(1, Math.abs(p), Math.abs(F)) && Math.abs(m - H) <= Rt * Math.max(1, Math.abs(m), Math.abs(H)) && Math.abs(v - V) <= Rt * Math.max(1, Math.abs(v), Math.abs(V)) && Math.abs(g - Y) <= Rt * Math.max(1, Math.abs(g), Math.abs(Y)) && Math.abs(S - ie) <= Rt * Math.max(1, Math.abs(S), Math.abs(ie)) && Math.abs(E - Q) <= Rt * Math.max(1, Math.abs(E), Math.abs(Q)) && Math.abs(C - P) <= Rt * Math.max(1, Math.abs(C), Math.abs(P)) && Math.abs(b - ne) <= Rt * Math.max(1, Math.abs(b), Math.abs(ne)) && Math.abs(R - re) <= Rt * Math.max(1, Math.abs(R), Math.abs(re)) && Math.abs(D - G) <= Rt * Math.max(1, Math.abs(D), Math.abs(G)) && Math.abs(_ - Z) <= Rt * Math.max(1, Math.abs(_), Math.abs(Z)) && Math.abs(A - le) <= Rt * Math.max(1, Math.abs(A), Math.abs(le)) && Math.abs(L - de) <= Rt * Math.max(1, Math.abs(L), Math.abs(de)) && Math.abs(U - oe) <= Rt * Math.max(1, Math.abs(U), Math.abs(oe));
}
var xA = nb, EA = fb;
const db = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: hA,
  adjoint: IO,
  clone: FO,
  copy: PO,
  create: jO,
  decompose: nA,
  determinant: qO,
  equals: SA,
  exactEquals: gA,
  frob: vA,
  fromQuat: iA,
  fromQuat2: tA,
  fromRotation: KO,
  fromRotationTranslation: ab,
  fromRotationTranslationScale: rA,
  fromRotationTranslationScaleOrigin: aA,
  fromScaling: XO,
  fromTranslation: QO,
  fromValues: $O,
  fromXRotation: ZO,
  fromYRotation: JO,
  fromZRotation: eA,
  frustum: lA,
  getRotation: ob,
  getScaling: lb,
  getTranslation: ib,
  identity: c3,
  invert: tb,
  lookAt: fA,
  mul: xA,
  multiply: nb,
  multiplyScalar: mA,
  multiplyScalarAndAdd: yA,
  ortho: cb,
  orthoNO: ub,
  orthoZO: cA,
  perspective: oA,
  perspectiveFromFieldOfView: uA,
  perspectiveNO: sb,
  perspectiveZO: sA,
  rotate: YO,
  rotateX: WO,
  rotateY: BO,
  rotateZ: GO,
  scale: rb,
  set: HO,
  str: pA,
  sub: EA,
  subtract: fb,
  targetTo: dA,
  translate: W2,
  transpose: VO
}, Symbol.toStringTag, { value: "Module" }));
function f3() {
  var t = new cn(3);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t;
}
function wA(t) {
  var a = new cn(3);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a;
}
function pb(t) {
  var a = t[0], s = t[1], f = t[2];
  return Math.sqrt(a * a + s * s + f * f);
}
function B2(t, a, s) {
  var f = new cn(3);
  return f[0] = t, f[1] = a, f[2] = s, f;
}
function CA(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t;
}
function bA(t, a, s, f) {
  return t[0] = a, t[1] = s, t[2] = f, t;
}
function TA(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t;
}
function vb(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t;
}
function hb(t, a, s) {
  return t[0] = a[0] * s[0], t[1] = a[1] * s[1], t[2] = a[2] * s[2], t;
}
function mb(t, a, s) {
  return t[0] = a[0] / s[0], t[1] = a[1] / s[1], t[2] = a[2] / s[2], t;
}
function RA(t, a) {
  return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t[2] = Math.ceil(a[2]), t;
}
function MA(t, a) {
  return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t[2] = Math.floor(a[2]), t;
}
function _A(t, a, s) {
  return t[0] = Math.min(a[0], s[0]), t[1] = Math.min(a[1], s[1]), t[2] = Math.min(a[2], s[2]), t;
}
function DA(t, a, s) {
  return t[0] = Math.max(a[0], s[0]), t[1] = Math.max(a[1], s[1]), t[2] = Math.max(a[2], s[2]), t;
}
function kA(t, a) {
  return t[0] = Yo(a[0]), t[1] = Yo(a[1]), t[2] = Yo(a[2]), t;
}
function OA(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t;
}
function AA(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t;
}
function yb(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2];
  return Math.sqrt(s * s + f * f + p * p);
}
function gb(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2];
  return s * s + f * f + p * p;
}
function Sb(t) {
  var a = t[0], s = t[1], f = t[2];
  return a * a + s * s + f * f;
}
function LA(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t;
}
function NA(t, a) {
  return t[0] = 1 / a[0], t[1] = 1 / a[1], t[2] = 1 / a[2], t;
}
function xb(t, a) {
  var s = a[0], f = a[1], p = a[2], m = s * s + f * f + p * p;
  return m > 0 && (m = 1 / Math.sqrt(m)), t[0] = a[0] * m, t[1] = a[1] * m, t[2] = a[2] * m, t;
}
function f1(t, a) {
  return t[0] * a[0] + t[1] * a[1] + t[2] * a[2];
}
function W0(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = s[0], g = s[1], S = s[2];
  return t[0] = p * S - m * g, t[1] = m * v - f * S, t[2] = f * g - p * v, t;
}
function zA(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2];
  return t[0] = p + f * (s[0] - p), t[1] = m + f * (s[1] - m), t[2] = v + f * (s[2] - v), t;
}
function UA(t, a, s, f) {
  var p = Math.acos(Math.min(Math.max(f1(a, s), -1), 1)), m = Math.sin(p), v = Math.sin((1 - f) * p) / m, g = Math.sin(f * p) / m;
  return t[0] = v * a[0] + g * s[0], t[1] = v * a[1] + g * s[1], t[2] = v * a[2] + g * s[2], t;
}
function jA(t, a, s, f, p, m) {
  var v = m * m, g = v * (2 * m - 3) + 1, S = v * (m - 2) + m, E = v * (m - 1), C = v * (3 - 2 * m);
  return t[0] = a[0] * g + s[0] * S + f[0] * E + p[0] * C, t[1] = a[1] * g + s[1] * S + f[1] * E + p[1] * C, t[2] = a[2] * g + s[2] * S + f[2] * E + p[2] * C, t;
}
function FA(t, a, s, f, p, m) {
  var v = 1 - m, g = v * v, S = m * m, E = g * v, C = 3 * m * g, b = 3 * S * v, R = S * m;
  return t[0] = a[0] * E + s[0] * C + f[0] * b + p[0] * R, t[1] = a[1] * E + s[1] * C + f[1] * b + p[1] * R, t[2] = a[2] * E + s[2] * C + f[2] * b + p[2] * R, t;
}
function PA(t, a) {
  a = a === void 0 ? 1 : a;
  var s = to() * 2 * Math.PI, f = to() * 2 - 1, p = Math.sqrt(1 - f * f) * a;
  return t[0] = Math.cos(s) * p, t[1] = Math.sin(s) * p, t[2] = f * a, t;
}
function Eb(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = s[3] * f + s[7] * p + s[11] * m + s[15];
  return v = v || 1, t[0] = (s[0] * f + s[4] * p + s[8] * m + s[12]) / v, t[1] = (s[1] * f + s[5] * p + s[9] * m + s[13]) / v, t[2] = (s[2] * f + s[6] * p + s[10] * m + s[14]) / v, t;
}
function $A(t, a, s) {
  var f = a[0], p = a[1], m = a[2];
  return t[0] = f * s[0] + p * s[3] + m * s[6], t[1] = f * s[1] + p * s[4] + m * s[7], t[2] = f * s[2] + p * s[5] + m * s[8], t;
}
function HA(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v = s[3], g = a[0], S = a[1], E = a[2], C = p * E - m * S, b = m * g - f * E, R = f * S - p * g;
  return C = C + C, b = b + b, R = R + R, t[0] = g + v * C + p * R - m * b, t[1] = S + v * b + m * C - f * R, t[2] = E + v * R + f * b - p * C, t;
}
function VA(t, a, s, f) {
  var p = [], m = [];
  return p[0] = a[0] - s[0], p[1] = a[1] - s[1], p[2] = a[2] - s[2], m[0] = p[0], m[1] = p[1] * Math.cos(f) - p[2] * Math.sin(f), m[2] = p[1] * Math.sin(f) + p[2] * Math.cos(f), t[0] = m[0] + s[0], t[1] = m[1] + s[1], t[2] = m[2] + s[2], t;
}
function IA(t, a, s, f) {
  var p = [], m = [];
  return p[0] = a[0] - s[0], p[1] = a[1] - s[1], p[2] = a[2] - s[2], m[0] = p[2] * Math.sin(f) + p[0] * Math.cos(f), m[1] = p[1], m[2] = p[2] * Math.cos(f) - p[0] * Math.sin(f), t[0] = m[0] + s[0], t[1] = m[1] + s[1], t[2] = m[2] + s[2], t;
}
function qA(t, a, s, f) {
  var p = [], m = [];
  return p[0] = a[0] - s[0], p[1] = a[1] - s[1], p[2] = a[2] - s[2], m[0] = p[0] * Math.cos(f) - p[1] * Math.sin(f), m[1] = p[0] * Math.sin(f) + p[1] * Math.cos(f), m[2] = p[2], t[0] = m[0] + s[0], t[1] = m[1] + s[1], t[2] = m[2] + s[2], t;
}
function YA(t, a) {
  var s = t[0], f = t[1], p = t[2], m = a[0], v = a[1], g = a[2], S = Math.sqrt((s * s + f * f + p * p) * (m * m + v * v + g * g)), E = S && f1(t, a) / S;
  return Math.acos(Math.min(Math.max(E, -1), 1));
}
function WA(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t;
}
function BA(t) {
  return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
}
function GA(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2];
}
function QA(t, a) {
  var s = t[0], f = t[1], p = t[2], m = a[0], v = a[1], g = a[2];
  return Math.abs(s - m) <= Rt * Math.max(1, Math.abs(s), Math.abs(m)) && Math.abs(f - v) <= Rt * Math.max(1, Math.abs(f), Math.abs(v)) && Math.abs(p - g) <= Rt * Math.max(1, Math.abs(p), Math.abs(g));
}
var XA = vb, KA = hb, ZA = mb, JA = yb, e4 = gb, wb = pb, t4 = Sb, n4 = (function() {
  var t = f3();
  return function(a, s, f, p, m, v) {
    var g, S;
    for (s || (s = 3), f || (f = 0), p ? S = Math.min(p * s + f, a.length) : S = a.length, g = f; g < S; g += s)
      t[0] = a[g], t[1] = a[g + 1], t[2] = a[g + 2], m(t, t, v), a[g] = t[0], a[g + 1] = t[1], a[g + 2] = t[2];
    return a;
  };
})();
const r4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: TA,
  angle: YA,
  bezier: FA,
  ceil: RA,
  clone: wA,
  copy: CA,
  create: f3,
  cross: W0,
  dist: JA,
  distance: yb,
  div: ZA,
  divide: mb,
  dot: f1,
  equals: QA,
  exactEquals: GA,
  floor: MA,
  forEach: n4,
  fromValues: B2,
  hermite: jA,
  inverse: NA,
  len: wb,
  length: pb,
  lerp: zA,
  max: DA,
  min: _A,
  mul: KA,
  multiply: hb,
  negate: LA,
  normalize: xb,
  random: PA,
  rotateX: VA,
  rotateY: IA,
  rotateZ: qA,
  round: kA,
  scale: OA,
  scaleAndAdd: AA,
  set: bA,
  slerp: UA,
  sqrDist: e4,
  sqrLen: t4,
  squaredDistance: gb,
  squaredLength: Sb,
  str: BA,
  sub: XA,
  subtract: vb,
  transformMat3: $A,
  transformMat4: Eb,
  transformQuat: HA,
  zero: WA
}, Symbol.toStringTag, { value: "Module" }));
function Cb() {
  var t = new cn(4);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0), t;
}
function bb(t) {
  var a = new cn(4);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a;
}
function Tb(t, a, s, f) {
  var p = new cn(4);
  return p[0] = t, p[1] = a, p[2] = s, p[3] = f, p;
}
function Rb(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t;
}
function Mb(t, a, s, f, p) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t;
}
function _b(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t;
}
function Db(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t;
}
function kb(t, a, s) {
  return t[0] = a[0] * s[0], t[1] = a[1] * s[1], t[2] = a[2] * s[2], t[3] = a[3] * s[3], t;
}
function Ob(t, a, s) {
  return t[0] = a[0] / s[0], t[1] = a[1] / s[1], t[2] = a[2] / s[2], t[3] = a[3] / s[3], t;
}
function a4(t, a) {
  return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t[2] = Math.ceil(a[2]), t[3] = Math.ceil(a[3]), t;
}
function i4(t, a) {
  return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t[2] = Math.floor(a[2]), t[3] = Math.floor(a[3]), t;
}
function l4(t, a, s) {
  return t[0] = Math.min(a[0], s[0]), t[1] = Math.min(a[1], s[1]), t[2] = Math.min(a[2], s[2]), t[3] = Math.min(a[3], s[3]), t;
}
function o4(t, a, s) {
  return t[0] = Math.max(a[0], s[0]), t[1] = Math.max(a[1], s[1]), t[2] = Math.max(a[2], s[2]), t[3] = Math.max(a[3], s[3]), t;
}
function s4(t, a) {
  return t[0] = Yo(a[0]), t[1] = Yo(a[1]), t[2] = Yo(a[2]), t[3] = Yo(a[3]), t;
}
function Ab(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t;
}
function u4(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t;
}
function Lb(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2], m = a[3] - t[3];
  return Math.sqrt(s * s + f * f + p * p + m * m);
}
function Nb(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2], m = a[3] - t[3];
  return s * s + f * f + p * p + m * m;
}
function d3(t) {
  var a = t[0], s = t[1], f = t[2], p = t[3];
  return Math.sqrt(a * a + s * s + f * f + p * p);
}
function p3(t) {
  var a = t[0], s = t[1], f = t[2], p = t[3];
  return a * a + s * s + f * f + p * p;
}
function c4(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = -a[3], t;
}
function f4(t, a) {
  return t[0] = 1 / a[0], t[1] = 1 / a[1], t[2] = 1 / a[2], t[3] = 1 / a[3], t;
}
function zb(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s * s + f * f + p * p + m * m;
  return v > 0 && (v = 1 / Math.sqrt(v)), t[0] = s * v, t[1] = f * v, t[2] = p * v, t[3] = m * v, t;
}
function v3(t, a) {
  return t[0] * a[0] + t[1] * a[1] + t[2] * a[2] + t[3] * a[3];
}
function d4(t, a, s, f) {
  var p = s[0] * f[1] - s[1] * f[0], m = s[0] * f[2] - s[2] * f[0], v = s[0] * f[3] - s[3] * f[0], g = s[1] * f[2] - s[2] * f[1], S = s[1] * f[3] - s[3] * f[1], E = s[2] * f[3] - s[3] * f[2], C = a[0], b = a[1], R = a[2], D = a[3];
  return t[0] = b * E - R * S + D * g, t[1] = -(C * E) + R * v - D * m, t[2] = C * S - b * v + D * p, t[3] = -(C * g) + b * m - R * p, t;
}
function Ub(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2], g = a[3];
  return t[0] = p + f * (s[0] - p), t[1] = m + f * (s[1] - m), t[2] = v + f * (s[2] - v), t[3] = g + f * (s[3] - g), t;
}
function p4(t, a) {
  a = a === void 0 ? 1 : a;
  var s, f, p, m, v, g, S;
  S = to(), s = S * 2 - 1, f = (4 * to() - 2) * Math.sqrt(S * -S + S), v = s * s + f * f, S = to(), p = S * 2 - 1, m = (4 * to() - 2) * Math.sqrt(S * -S + S), g = p * p + m * m;
  var E = Math.sqrt((1 - v) / g);
  return t[0] = a * s, t[1] = a * f, t[2] = a * p * E, t[3] = a * m * E, t;
}
function v4(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3];
  return t[0] = s[0] * f + s[4] * p + s[8] * m + s[12] * v, t[1] = s[1] * f + s[5] * p + s[9] * m + s[13] * v, t[2] = s[2] * f + s[6] * p + s[10] * m + s[14] * v, t[3] = s[3] * f + s[7] * p + s[11] * m + s[15] * v, t;
}
function h4(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v = s[3], g = a[0], S = a[1], E = a[2], C = p * E - m * S, b = m * g - f * E, R = f * S - p * g;
  return C = C + C, b = b + b, R = R + R, t[0] = g + v * C + p * R - m * b, t[1] = S + v * b + m * C - f * R, t[2] = E + v * R + f * b - p * C, t[3] = a[3], t;
}
function m4(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t;
}
function y4(t) {
  return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
}
function jb(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3];
}
function g4(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = a[0], g = a[1], S = a[2], E = a[3];
  return Math.abs(s - v) <= Rt * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(f - g) <= Rt * Math.max(1, Math.abs(f), Math.abs(g)) && Math.abs(p - S) <= Rt * Math.max(1, Math.abs(p), Math.abs(S)) && Math.abs(m - E) <= Rt * Math.max(1, Math.abs(m), Math.abs(E));
}
var S4 = Db, x4 = kb, E4 = Ob, w4 = Lb, C4 = Nb, b4 = d3, T4 = p3, R4 = (function() {
  var t = Cb();
  return function(a, s, f, p, m, v) {
    var g, S;
    for (s || (s = 4), f || (f = 0), p ? S = Math.min(p * s + f, a.length) : S = a.length, g = f; g < S; g += s)
      t[0] = a[g], t[1] = a[g + 1], t[2] = a[g + 2], t[3] = a[g + 3], m(t, t, v), a[g] = t[0], a[g + 1] = t[1], a[g + 2] = t[2], a[g + 3] = t[3];
    return a;
  };
})();
const M4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: _b,
  ceil: a4,
  clone: bb,
  copy: Rb,
  create: Cb,
  cross: d4,
  dist: w4,
  distance: Lb,
  div: E4,
  divide: Ob,
  dot: v3,
  equals: g4,
  exactEquals: jb,
  floor: i4,
  forEach: R4,
  fromValues: Tb,
  inverse: f4,
  len: b4,
  length: d3,
  lerp: Ub,
  max: o4,
  min: l4,
  mul: x4,
  multiply: kb,
  negate: c4,
  normalize: zb,
  random: p4,
  round: s4,
  scale: Ab,
  scaleAndAdd: u4,
  set: Mb,
  sqrDist: C4,
  sqrLen: T4,
  squaredDistance: Nb,
  squaredLength: p3,
  str: y4,
  sub: S4,
  subtract: Db,
  transformMat4: v4,
  transformQuat: h4,
  zero: m4
}, Symbol.toStringTag, { value: "Module" }));
function J0() {
  var t = new cn(4);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t[3] = 1, t;
}
function _4(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t;
}
function Fb(t, a, s) {
  s = s * 0.5;
  var f = Math.sin(s);
  return t[0] = f * a[0], t[1] = f * a[1], t[2] = f * a[2], t[3] = Math.cos(s), t;
}
function D4(t, a) {
  var s = Math.acos(a[3]) * 2, f = Math.sin(s / 2);
  return f > Rt ? (t[0] = a[0] / f, t[1] = a[1] / f, t[2] = a[2] / f) : (t[0] = 1, t[1] = 0, t[2] = 0), s;
}
function k4(t, a) {
  var s = m3(t, a);
  return Math.acos(2 * s * s - 1);
}
function Pb(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = s[0], S = s[1], E = s[2], C = s[3];
  return t[0] = f * C + v * g + p * E - m * S, t[1] = p * C + v * S + m * g - f * E, t[2] = m * C + v * E + f * S - p * g, t[3] = v * C - f * g - p * S - m * E, t;
}
function $b(t, a, s) {
  s *= 0.5;
  var f = a[0], p = a[1], m = a[2], v = a[3], g = Math.sin(s), S = Math.cos(s);
  return t[0] = f * S + v * g, t[1] = p * S + m * g, t[2] = m * S - p * g, t[3] = v * S - f * g, t;
}
function Hb(t, a, s) {
  s *= 0.5;
  var f = a[0], p = a[1], m = a[2], v = a[3], g = Math.sin(s), S = Math.cos(s);
  return t[0] = f * S - m * g, t[1] = p * S + v * g, t[2] = m * S + f * g, t[3] = v * S - p * g, t;
}
function Vb(t, a, s) {
  s *= 0.5;
  var f = a[0], p = a[1], m = a[2], v = a[3], g = Math.sin(s), S = Math.cos(s);
  return t[0] = f * S + p * g, t[1] = p * S - f * g, t[2] = m * S + v * g, t[3] = v * S - m * g, t;
}
function O4(t, a) {
  var s = a[0], f = a[1], p = a[2];
  return t[0] = s, t[1] = f, t[2] = p, t[3] = Math.sqrt(Math.abs(1 - s * s - f * f - p * p)), t;
}
function Ib(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = Math.sqrt(s * s + f * f + p * p), g = Math.exp(m), S = v > 0 ? g * Math.sin(v) / v : 0;
  return t[0] = s * S, t[1] = f * S, t[2] = p * S, t[3] = g * Math.cos(v), t;
}
function qb(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = Math.sqrt(s * s + f * f + p * p), g = v > 0 ? Math.atan2(v, m) / v : 0;
  return t[0] = s * g, t[1] = f * g, t[2] = p * g, t[3] = 0.5 * Math.log(s * s + f * f + p * p + m * m), t;
}
function A4(t, a, s) {
  return qb(t, a), Wb(t, t, s), Ib(t, t), t;
}
function B0(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2], g = a[3], S = s[0], E = s[1], C = s[2], b = s[3], R, D, _, A, L;
  return D = p * S + m * E + v * C + g * b, D < 0 && (D = -D, S = -S, E = -E, C = -C, b = -b), 1 - D > Rt ? (R = Math.acos(D), _ = Math.sin(R), A = Math.sin((1 - f) * R) / _, L = Math.sin(f * R) / _) : (A = 1 - f, L = f), t[0] = A * p + L * S, t[1] = A * m + L * E, t[2] = A * v + L * C, t[3] = A * g + L * b, t;
}
function L4(t) {
  var a = to(), s = to(), f = to(), p = Math.sqrt(1 - a), m = Math.sqrt(a);
  return t[0] = p * Math.sin(2 * Math.PI * s), t[1] = p * Math.cos(2 * Math.PI * s), t[2] = m * Math.sin(2 * Math.PI * f), t[3] = m * Math.cos(2 * Math.PI * f), t;
}
function N4(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s * s + f * f + p * p + m * m, g = v ? 1 / v : 0;
  return t[0] = -s * g, t[1] = -f * g, t[2] = -p * g, t[3] = m * g, t;
}
function z4(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = a[3], t;
}
function Yb(t, a) {
  var s = a[0] + a[4] + a[8], f;
  if (s > 0)
    f = Math.sqrt(s + 1), t[3] = 0.5 * f, f = 0.5 / f, t[0] = (a[5] - a[7]) * f, t[1] = (a[6] - a[2]) * f, t[2] = (a[1] - a[3]) * f;
  else {
    var p = 0;
    a[4] > a[0] && (p = 1), a[8] > a[p * 3 + p] && (p = 2);
    var m = (p + 1) % 3, v = (p + 2) % 3;
    f = Math.sqrt(a[p * 3 + p] - a[m * 3 + m] - a[v * 3 + v] + 1), t[p] = 0.5 * f, f = 0.5 / f, t[3] = (a[m * 3 + v] - a[v * 3 + m]) * f, t[m] = (a[m * 3 + p] + a[p * 3 + m]) * f, t[v] = (a[v * 3 + p] + a[p * 3 + v]) * f;
  }
  return t;
}
function U4(t, a, s, f) {
  var p = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : BC, m = Math.PI / 360;
  a *= m, f *= m, s *= m;
  var v = Math.sin(a), g = Math.cos(a), S = Math.sin(s), E = Math.cos(s), C = Math.sin(f), b = Math.cos(f);
  switch (p) {
    case "xyz":
      t[0] = v * E * b + g * S * C, t[1] = g * S * b - v * E * C, t[2] = g * E * C + v * S * b, t[3] = g * E * b - v * S * C;
      break;
    case "xzy":
      t[0] = v * E * b - g * S * C, t[1] = g * S * b - v * E * C, t[2] = g * E * C + v * S * b, t[3] = g * E * b + v * S * C;
      break;
    case "yxz":
      t[0] = v * E * b + g * S * C, t[1] = g * S * b - v * E * C, t[2] = g * E * C - v * S * b, t[3] = g * E * b + v * S * C;
      break;
    case "yzx":
      t[0] = v * E * b + g * S * C, t[1] = g * S * b + v * E * C, t[2] = g * E * C - v * S * b, t[3] = g * E * b - v * S * C;
      break;
    case "zxy":
      t[0] = v * E * b - g * S * C, t[1] = g * S * b + v * E * C, t[2] = g * E * C + v * S * b, t[3] = g * E * b - v * S * C;
      break;
    case "zyx":
      t[0] = v * E * b - g * S * C, t[1] = g * S * b + v * E * C, t[2] = g * E * C - v * S * b, t[3] = g * E * b + v * S * C;
      break;
    default:
      throw new Error("Unknown angle order " + p);
  }
  return t;
}
function j4(t) {
  return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
}
var F4 = bb, P4 = Tb, h3 = Rb, $4 = Mb, H4 = _b, V4 = Pb, Wb = Ab, m3 = v3, I4 = Ub, y3 = d3, q4 = y3, g3 = p3, Y4 = g3, S3 = zb, W4 = jb;
function B4(t, a) {
  return Math.abs(v3(t, a)) >= 1 - Rt;
}
var G4 = (function() {
  var t = f3(), a = B2(1, 0, 0), s = B2(0, 1, 0);
  return function(f, p, m) {
    var v = f1(p, m);
    return v < -0.999999 ? (W0(t, a, p), wb(t) < 1e-6 && W0(t, s, p), xb(t, t), Fb(f, t, Math.PI), f) : v > 0.999999 ? (f[0] = 0, f[1] = 0, f[2] = 0, f[3] = 1, f) : (W0(t, p, m), f[0] = t[0], f[1] = t[1], f[2] = t[2], f[3] = 1 + v, S3(f, f));
  };
})(), Q4 = (function() {
  var t = J0(), a = J0();
  return function(s, f, p, m, v, g) {
    return B0(t, f, v, g), B0(a, p, m, g), B0(s, t, a, 2 * g * (1 - g)), s;
  };
})(), X4 = (function() {
  var t = ZC();
  return function(a, s, f, p) {
    return t[0] = f[0], t[3] = f[1], t[6] = f[2], t[1] = p[0], t[4] = p[1], t[7] = p[2], t[2] = -s[0], t[5] = -s[1], t[8] = -s[2], S3(a, Yb(a, t));
  };
})();
const K4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: H4,
  calculateW: O4,
  clone: F4,
  conjugate: z4,
  copy: h3,
  create: J0,
  dot: m3,
  equals: B4,
  exactEquals: W4,
  exp: Ib,
  fromEuler: U4,
  fromMat3: Yb,
  fromValues: P4,
  getAngle: k4,
  getAxisAngle: D4,
  identity: _4,
  invert: N4,
  len: q4,
  length: y3,
  lerp: I4,
  ln: qb,
  mul: V4,
  multiply: Pb,
  normalize: S3,
  pow: A4,
  random: L4,
  rotateX: $b,
  rotateY: Hb,
  rotateZ: Vb,
  rotationTo: G4,
  scale: Wb,
  set: $4,
  setAxes: X4,
  setAxisAngle: Fb,
  slerp: B0,
  sqlerp: Q4,
  sqrLen: Y4,
  squaredLength: g3,
  str: j4
}, Symbol.toStringTag, { value: "Module" }));
function Z4() {
  var t = new cn(8);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[3] = 1, t;
}
function J4(t) {
  var a = new cn(8);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a;
}
function eL(t, a, s, f, p, m, v, g) {
  var S = new cn(8);
  return S[0] = t, S[1] = a, S[2] = s, S[3] = f, S[4] = p, S[5] = m, S[6] = v, S[7] = g, S;
}
function tL(t, a, s, f, p, m, v) {
  var g = new cn(8);
  g[0] = t, g[1] = a, g[2] = s, g[3] = f;
  var S = p * 0.5, E = m * 0.5, C = v * 0.5;
  return g[4] = S * f + E * s - C * a, g[5] = E * f + C * t - S * s, g[6] = C * f + S * a - E * t, g[7] = -S * t - E * a - C * s, g;
}
function Bb(t, a, s) {
  var f = s[0] * 0.5, p = s[1] * 0.5, m = s[2] * 0.5, v = a[0], g = a[1], S = a[2], E = a[3];
  return t[0] = v, t[1] = g, t[2] = S, t[3] = E, t[4] = f * E + p * S - m * g, t[5] = p * E + m * v - f * S, t[6] = m * E + f * g - p * v, t[7] = -f * v - p * g - m * S, t;
}
function nL(t, a) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = a[0] * 0.5, t[5] = a[1] * 0.5, t[6] = a[2] * 0.5, t[7] = 0, t;
}
function rL(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0, t;
}
function aL(t, a) {
  var s = J0();
  ob(s, a);
  var f = new cn(3);
  return ib(f, a), Bb(t, s, f), t;
}
function Gb(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t;
}
function iL(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0, t;
}
function lL(t, a, s, f, p, m, v, g, S) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t[6] = g, t[7] = S, t;
}
var oL = h3;
function sL(t, a) {
  return t[0] = a[4], t[1] = a[5], t[2] = a[6], t[3] = a[7], t;
}
var uL = h3;
function cL(t, a) {
  return t[4] = a[0], t[5] = a[1], t[6] = a[2], t[7] = a[3], t;
}
function fL(t, a) {
  var s = a[4], f = a[5], p = a[6], m = a[7], v = -a[0], g = -a[1], S = -a[2], E = a[3];
  return t[0] = (s * E + m * v + f * S - p * g) * 2, t[1] = (f * E + m * g + p * v - s * S) * 2, t[2] = (p * E + m * S + s * g - f * v) * 2, t;
}
function dL(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = s[0] * 0.5, S = s[1] * 0.5, E = s[2] * 0.5, C = a[4], b = a[5], R = a[6], D = a[7];
  return t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = v * g + p * E - m * S + C, t[5] = v * S + m * g - f * E + b, t[6] = v * E + f * S - p * g + R, t[7] = -f * g - p * S - m * E + D, t;
}
function pL(t, a, s) {
  var f = -a[0], p = -a[1], m = -a[2], v = a[3], g = a[4], S = a[5], E = a[6], C = a[7], b = g * v + C * f + S * m - E * p, R = S * v + C * p + E * f - g * m, D = E * v + C * m + g * p - S * f, _ = C * v - g * f - S * p - E * m;
  return $b(t, a, s), f = t[0], p = t[1], m = t[2], v = t[3], t[4] = b * v + _ * f + R * m - D * p, t[5] = R * v + _ * p + D * f - b * m, t[6] = D * v + _ * m + b * p - R * f, t[7] = _ * v - b * f - R * p - D * m, t;
}
function vL(t, a, s) {
  var f = -a[0], p = -a[1], m = -a[2], v = a[3], g = a[4], S = a[5], E = a[6], C = a[7], b = g * v + C * f + S * m - E * p, R = S * v + C * p + E * f - g * m, D = E * v + C * m + g * p - S * f, _ = C * v - g * f - S * p - E * m;
  return Hb(t, a, s), f = t[0], p = t[1], m = t[2], v = t[3], t[4] = b * v + _ * f + R * m - D * p, t[5] = R * v + _ * p + D * f - b * m, t[6] = D * v + _ * m + b * p - R * f, t[7] = _ * v - b * f - R * p - D * m, t;
}
function hL(t, a, s) {
  var f = -a[0], p = -a[1], m = -a[2], v = a[3], g = a[4], S = a[5], E = a[6], C = a[7], b = g * v + C * f + S * m - E * p, R = S * v + C * p + E * f - g * m, D = E * v + C * m + g * p - S * f, _ = C * v - g * f - S * p - E * m;
  return Vb(t, a, s), f = t[0], p = t[1], m = t[2], v = t[3], t[4] = b * v + _ * f + R * m - D * p, t[5] = R * v + _ * p + D * f - b * m, t[6] = D * v + _ * m + b * p - R * f, t[7] = _ * v - b * f - R * p - D * m, t;
}
function mL(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v = s[3], g = a[0], S = a[1], E = a[2], C = a[3];
  return t[0] = g * v + C * f + S * m - E * p, t[1] = S * v + C * p + E * f - g * m, t[2] = E * v + C * m + g * p - S * f, t[3] = C * v - g * f - S * p - E * m, g = a[4], S = a[5], E = a[6], C = a[7], t[4] = g * v + C * f + S * m - E * p, t[5] = S * v + C * p + E * f - g * m, t[6] = E * v + C * m + g * p - S * f, t[7] = C * v - g * f - S * p - E * m, t;
}
function yL(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = s[0], S = s[1], E = s[2], C = s[3];
  return t[0] = f * C + v * g + p * E - m * S, t[1] = p * C + v * S + m * g - f * E, t[2] = m * C + v * E + f * S - p * g, t[3] = v * C - f * g - p * S - m * E, g = s[4], S = s[5], E = s[6], C = s[7], t[4] = f * C + v * g + p * E - m * S, t[5] = p * C + v * S + m * g - f * E, t[6] = m * C + v * E + f * S - p * g, t[7] = v * C - f * g - p * S - m * E, t;
}
function gL(t, a, s, f) {
  if (Math.abs(f) < Rt)
    return Gb(t, a);
  var p = Math.sqrt(s[0] * s[0] + s[1] * s[1] + s[2] * s[2]);
  f = f * 0.5;
  var m = Math.sin(f), v = m * s[0] / p, g = m * s[1] / p, S = m * s[2] / p, E = Math.cos(f), C = a[0], b = a[1], R = a[2], D = a[3];
  t[0] = C * E + D * v + b * S - R * g, t[1] = b * E + D * g + R * v - C * S, t[2] = R * E + D * S + C * g - b * v, t[3] = D * E - C * v - b * g - R * S;
  var _ = a[4], A = a[5], L = a[6], U = a[7];
  return t[4] = _ * E + U * v + A * S - L * g, t[5] = A * E + U * g + L * v - _ * S, t[6] = L * E + U * S + _ * g - A * v, t[7] = U * E - _ * v - A * g - L * S, t;
}
function SL(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t[4] = a[4] + s[4], t[5] = a[5] + s[5], t[6] = a[6] + s[6], t[7] = a[7] + s[7], t;
}
function Qb(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], g = s[4], S = s[5], E = s[6], C = s[7], b = a[4], R = a[5], D = a[6], _ = a[7], A = s[0], L = s[1], U = s[2], q = s[3];
  return t[0] = f * q + v * A + p * U - m * L, t[1] = p * q + v * L + m * A - f * U, t[2] = m * q + v * U + f * L - p * A, t[3] = v * q - f * A - p * L - m * U, t[4] = f * C + v * g + p * E - m * S + b * q + _ * A + R * U - D * L, t[5] = p * C + v * S + m * g - f * E + R * q + _ * L + D * A - b * U, t[6] = m * C + v * E + f * S - p * g + D * q + _ * U + b * L - R * A, t[7] = v * C - f * g - p * S - m * E + _ * q - b * A - R * L - D * U, t;
}
var xL = Qb;
function EL(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t[4] = a[4] * s, t[5] = a[5] * s, t[6] = a[6] * s, t[7] = a[7] * s, t;
}
var Xb = m3;
function wL(t, a, s, f) {
  var p = 1 - f;
  return Xb(a, s) < 0 && (f = -f), t[0] = a[0] * p + s[0] * f, t[1] = a[1] * p + s[1] * f, t[2] = a[2] * p + s[2] * f, t[3] = a[3] * p + s[3] * f, t[4] = a[4] * p + s[4] * f, t[5] = a[5] * p + s[5] * f, t[6] = a[6] * p + s[6] * f, t[7] = a[7] * p + s[7] * f, t;
}
function CL(t, a) {
  var s = d1(a);
  return t[0] = -a[0] / s, t[1] = -a[1] / s, t[2] = -a[2] / s, t[3] = a[3] / s, t[4] = -a[4] / s, t[5] = -a[5] / s, t[6] = -a[6] / s, t[7] = a[7] / s, t;
}
function bL(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = a[3], t[4] = -a[4], t[5] = -a[5], t[6] = -a[6], t[7] = a[7], t;
}
var Kb = y3, TL = Kb, d1 = g3, RL = d1;
function ML(t, a) {
  var s = d1(a);
  if (s > 0) {
    s = Math.sqrt(s);
    var f = a[0] / s, p = a[1] / s, m = a[2] / s, v = a[3] / s, g = a[4], S = a[5], E = a[6], C = a[7], b = f * g + p * S + m * E + v * C;
    t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = (g - f * b) / s, t[5] = (S - p * b) / s, t[6] = (E - m * b) / s, t[7] = (C - v * b) / s;
  }
  return t;
}
function _L(t) {
  return "quat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ")";
}
function DL(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7];
}
function kL(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = t[4], g = t[5], S = t[6], E = t[7], C = a[0], b = a[1], R = a[2], D = a[3], _ = a[4], A = a[5], L = a[6], U = a[7];
  return Math.abs(s - C) <= Rt * Math.max(1, Math.abs(s), Math.abs(C)) && Math.abs(f - b) <= Rt * Math.max(1, Math.abs(f), Math.abs(b)) && Math.abs(p - R) <= Rt * Math.max(1, Math.abs(p), Math.abs(R)) && Math.abs(m - D) <= Rt * Math.max(1, Math.abs(m), Math.abs(D)) && Math.abs(v - _) <= Rt * Math.max(1, Math.abs(v), Math.abs(_)) && Math.abs(g - A) <= Rt * Math.max(1, Math.abs(g), Math.abs(A)) && Math.abs(S - L) <= Rt * Math.max(1, Math.abs(S), Math.abs(L)) && Math.abs(E - U) <= Rt * Math.max(1, Math.abs(E), Math.abs(U));
}
const OL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: SL,
  clone: J4,
  conjugate: bL,
  copy: Gb,
  create: Z4,
  dot: Xb,
  equals: kL,
  exactEquals: DL,
  fromMat4: aL,
  fromRotation: rL,
  fromRotationTranslation: Bb,
  fromRotationTranslationValues: tL,
  fromTranslation: nL,
  fromValues: eL,
  getDual: sL,
  getReal: oL,
  getTranslation: fL,
  identity: iL,
  invert: CL,
  len: TL,
  length: Kb,
  lerp: wL,
  mul: xL,
  multiply: Qb,
  normalize: ML,
  rotateAroundAxis: gL,
  rotateByQuatAppend: mL,
  rotateByQuatPrepend: yL,
  rotateX: pL,
  rotateY: vL,
  rotateZ: hL,
  scale: EL,
  set: lL,
  setDual: cL,
  setReal: uL,
  sqrLen: RL,
  squaredLength: d1,
  str: _L,
  translate: dL
}, Symbol.toStringTag, { value: "Module" }));
function Zb() {
  var t = new cn(2);
  return cn != Float32Array && (t[0] = 0, t[1] = 0), t;
}
function AL(t) {
  var a = new cn(2);
  return a[0] = t[0], a[1] = t[1], a;
}
function LL(t, a) {
  var s = new cn(2);
  return s[0] = t, s[1] = a, s;
}
function NL(t, a) {
  return t[0] = a[0], t[1] = a[1], t;
}
function zL(t, a, s) {
  return t[0] = a, t[1] = s, t;
}
function UL(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t;
}
function Jb(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t;
}
function eT(t, a, s) {
  return t[0] = a[0] * s[0], t[1] = a[1] * s[1], t;
}
function tT(t, a, s) {
  return t[0] = a[0] / s[0], t[1] = a[1] / s[1], t;
}
function jL(t, a) {
  return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t;
}
function FL(t, a) {
  return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t;
}
function PL(t, a, s) {
  return t[0] = Math.min(a[0], s[0]), t[1] = Math.min(a[1], s[1]), t;
}
function $L(t, a, s) {
  return t[0] = Math.max(a[0], s[0]), t[1] = Math.max(a[1], s[1]), t;
}
function HL(t, a) {
  return t[0] = Yo(a[0]), t[1] = Yo(a[1]), t;
}
function VL(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t;
}
function IL(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t;
}
function nT(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1];
  return Math.sqrt(s * s + f * f);
}
function rT(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1];
  return s * s + f * f;
}
function aT(t) {
  var a = t[0], s = t[1];
  return Math.sqrt(a * a + s * s);
}
function iT(t) {
  var a = t[0], s = t[1];
  return a * a + s * s;
}
function qL(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t;
}
function YL(t, a) {
  return t[0] = 1 / a[0], t[1] = 1 / a[1], t;
}
function WL(t, a) {
  var s = a[0], f = a[1], p = s * s + f * f;
  return p > 0 && (p = 1 / Math.sqrt(p)), t[0] = a[0] * p, t[1] = a[1] * p, t;
}
function BL(t, a) {
  return t[0] * a[0] + t[1] * a[1];
}
function GL(t, a, s) {
  var f = a[0] * s[1] - a[1] * s[0];
  return t[0] = t[1] = 0, t[2] = f, t;
}
function QL(t, a, s, f) {
  var p = a[0], m = a[1];
  return t[0] = p + f * (s[0] - p), t[1] = m + f * (s[1] - m), t;
}
function XL(t, a) {
  a = a === void 0 ? 1 : a;
  var s = to() * 2 * Math.PI;
  return t[0] = Math.cos(s) * a, t[1] = Math.sin(s) * a, t;
}
function KL(t, a, s) {
  var f = a[0], p = a[1];
  return t[0] = s[0] * f + s[2] * p, t[1] = s[1] * f + s[3] * p, t;
}
function ZL(t, a, s) {
  var f = a[0], p = a[1];
  return t[0] = s[0] * f + s[2] * p + s[4], t[1] = s[1] * f + s[3] * p + s[5], t;
}
function JL(t, a, s) {
  var f = a[0], p = a[1];
  return t[0] = s[0] * f + s[3] * p + s[6], t[1] = s[1] * f + s[4] * p + s[7], t;
}
function eN(t, a, s) {
  var f = a[0], p = a[1];
  return t[0] = s[0] * f + s[4] * p + s[12], t[1] = s[1] * f + s[5] * p + s[13], t;
}
function tN(t, a, s, f) {
  var p = a[0] - s[0], m = a[1] - s[1], v = Math.sin(f), g = Math.cos(f);
  return t[0] = p * g - m * v + s[0], t[1] = p * v + m * g + s[1], t;
}
function nN(t, a) {
  var s = t[0], f = t[1], p = a[0], m = a[1];
  return Math.abs(Math.atan2(f * p - s * m, s * p + f * m));
}
function rN(t, a) {
  var s = t[0], f = t[1], p = a[0], m = a[1];
  return Math.atan2(s * m - f * p, s * p + f * m);
}
function aN(t) {
  return t[0] = 0, t[1] = 0, t;
}
function iN(t) {
  return "vec2(" + t[0] + ", " + t[1] + ")";
}
function lN(t, a) {
  return t[0] === a[0] && t[1] === a[1];
}
function oN(t, a) {
  var s = t[0], f = t[1], p = a[0], m = a[1];
  return Math.abs(s - p) <= Rt * Math.max(1, Math.abs(s), Math.abs(p)) && Math.abs(f - m) <= Rt * Math.max(1, Math.abs(f), Math.abs(m));
}
var sN = aT, uN = Jb, cN = eT, fN = tT, dN = nT, pN = rT, vN = iT, hN = (function() {
  var t = Zb();
  return function(a, s, f, p, m, v) {
    var g, S;
    for (s || (s = 2), f || (f = 0), p ? S = Math.min(p * s + f, a.length) : S = a.length, g = f; g < S; g += s)
      t[0] = a[g], t[1] = a[g + 1], m(t, t, v), a[g] = t[0], a[g + 1] = t[1];
    return a;
  };
})();
const mN = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: UL,
  angle: nN,
  ceil: jL,
  clone: AL,
  copy: NL,
  create: Zb,
  cross: GL,
  dist: dN,
  distance: nT,
  div: fN,
  divide: tT,
  dot: BL,
  equals: oN,
  exactEquals: lN,
  floor: FL,
  forEach: hN,
  fromValues: LL,
  inverse: YL,
  len: sN,
  length: aT,
  lerp: QL,
  max: $L,
  min: PL,
  mul: cN,
  multiply: eT,
  negate: qL,
  normalize: WL,
  random: XL,
  rotate: tN,
  round: HL,
  scale: VL,
  scaleAndAdd: IL,
  set: zL,
  signedAngle: rN,
  sqrDist: pN,
  sqrLen: vN,
  squaredDistance: rT,
  squaredLength: iT,
  str: iN,
  sub: uN,
  subtract: Jb,
  transformMat2: KL,
  transformMat2d: ZL,
  transformMat3: JL,
  transformMat4: eN,
  zero: aN
}, Symbol.toStringTag, { value: "Module" })), yN = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: f5,
  mat2: U5,
  mat2d: lO,
  mat3: UO,
  mat4: db,
  quat: K4,
  quat2: OL,
  vec2: mN,
  vec3: r4,
  vec4: M4
}, Symbol.toStringTag, { value: "Module" })), p1 = c1;
function v1() {
  Vn.call(this), this.events = {
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
var Bn = v1.prototype = Object.create(Vn.prototype), Qi = new Float32Array([0, 0, 0]), wl = new Float32Array(16);
Bn.constructor = v1;
Bn.local = null;
Bn.worldMatrix = null;
Bn.worldToLocal = null;
Bn.children = null;
Bn.parent = null;
Bn.dirtyW = !0;
Bn.dirtyL = !0;
Bn.onParentUpdate = null;
Bn.addChild = function(t) {
  this.children[this.children.length] = t, t.setParent(this);
};
Bn.removeChild = function(t) {
  this.children.splice(this.children.indexOf(t), 1), t.removeParent();
};
Bn.setParent = function(t) {
  this.parent = t, t.gameObject.world !== null && t.gameObject.world.addGameObject(this.gameObject);
};
Bn.setGameObject = function(t) {
  Vn.prototype.setGameObject.call(this, t), t.transform = this;
};
Bn.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
Bn.removeParent = function() {
  this.parent = null;
};
Bn.translate = function(t, a, s, f) {
  Qi[0] = t, Qi[1] = a, Qi[2] = s, f === "world" ? (c3(wl), W2(wl, wl, Qi), p1(this.local, wl, this.local)) : W2(this.local, this.local, Qi);
};
Bn.rotate = function(t, a, s, f) {
  var p = Math.PI / 180, m = db;
  f === "world" ? (m.identity(wl), m.rotateZ(wl, wl, s * p), m.rotateY(wl, wl, a * p), m.rotateX(wl, wl, t * p), p1(this.local, wl, this.local)) : (m.rotateZ(this.local, this.local, s * p), m.rotateY(this.local, this.local, a * p), m.rotateX(this.local, this.local, t * p));
};
Bn.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.worldMatrix.set(this.local) : p1(this.worldMatrix, this.parent.getLocalToWorld(), this.local)), this.worldMatrix;
};
Bn.getWorldToLocal = function() {
  return this.dirtyW === !0 && tb(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
};
Bn.getPosition = function(t) {
  t === void 0 && (t = []);
  var a = this.getLocalToWorld();
  return t[0] = a[12], t[1] = a[13], t[2] = a[14], t;
};
Bn.getLocalPosition = function(t) {
  t === void 0 && (t = []);
  var a = this.local;
  return t[0] = a[12], t[1] = a[13], t[2] = a[14], t;
};
Bn.getRotation = function() {
  throw "TransformComponent.getRotation not implemented yet";
};
Bn.getLocalRotation = function() {
  throw "TransformComponent.getLocalRotation not implemented yet";
};
Bn.setPosition = function(t, a, s) {
  Qi[0] = t, Qi[1] = a, Qi[2] = s, this.parent !== null && Eb(
    Qi,
    Qi,
    this.parent.getWorldToLocal()
  ), this.local[12] = Qi[0], this.local[13] = Qi[1], this.local[14] = Qi[2];
};
Bn.setLocalPosition = function(t, a, s) {
  this.local[12] = t, this.local[13] = a, this.local[14] = s;
};
Bn.scale = function(t, a, s) {
  rb(this.local, this.local, [t, a, s]);
};
Bn.updateWorldMatrix = function(t = !1) {
  this.parent === null ? this.worldMatrix.set(this.local) : (t && this.parent.updateWorldMatrix(t), p1(this.worldMatrix, this.parent.worldMatrix, this.local));
};
function ai(t) {
  this.instanceId = ai.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new v1()), this.name = t || "gameObject";
}
var Rl = ai.prototype;
Rl.instanceId = 0;
Rl.name = null;
Rl.layer = 0;
Rl.scene = null;
Rl.world = null;
Rl.transform = null;
Rl.components = null;
Rl.componentsCount = 0;
Rl.setScene = function(t) {
  this.scene = t;
};
Rl.addComponent = function(t) {
  return this.components[this.componentsCount++] = t, t.setGameObject(this), t;
};
Rl.removeComponent = function(t) {
  t.unsetGameObject();
};
Rl.getComponent = function(t) {
  for (var a = 0; a < this.components.length; a++) {
    var s = this.components[a];
    if (s instanceof t) return s;
  }
  return null;
};
const x3 = {
  NONE: 0,
  RADIAL: 1,
  RADIAL_FAST: 2,
  LINEAR: 3
};
function hr(t) {
  Vn.call(this), this.transform = t, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ], this.zoom = 1;
}
hr.prototype = Object.create(Vn.prototype);
hr.prototype.constructor = hr;
hr.prototype.frustumSize = null;
hr.prototype.projectionMatrix = null;
hr.prototype.clipSpaceMatrix = null;
hr.prototype.nearClippingPane = 0;
hr.prototype.farClippingPane = 1e3;
hr.prototype.fogType = x3.LINEAR;
hr.prototype.fogNearPane = 250;
hr.prototype.fogFarPane = 750;
hr.prototype.fogColor = 9868950;
hr.prototype.bgColor = 9868950;
hr.prototype.ambientLight = 8421504;
hr.prototype.flush = !1;
hr.prototype.depthSorting = !0;
hr.prototype.setup = function(t, a) {
  const s = t / this.zoom, f = a / this.zoom;
  this.frustumSize = [
    [-s / 2, -f / 2, 0],
    [s / 2, f / 2, this.farClippingPane]
  ], cb(
    this.projectionMatrix,
    -s / 2,
    s / 2,
    -f / 2,
    f / 2,
    this.nearClippingPane,
    this.farClippingPane
  );
};
hr.prototype.setGameObject = function(t) {
  Vn.prototype.setGameObject.call(this, t), t.camera = this;
};
hr.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, Vn.prototype.unsetGameObject.call(this);
};
hr.prototype.getClipSpaceMatrix = function() {
  const t = this.transform.getWorldToLocal();
  return c1(this.clipSpaceMatrix, this.projectionMatrix, t), this.clipSpaceMatrix;
};
hr.FogType = x3;
function lT(t) {
  ai.call(this, t || "camera"), this.addComponent(new hr(this.transform));
}
lT.prototype = Object.create(ai.prototype);
function sr() {
  Vn.call(this), this.depthBias = 0;
}
var ir = sr.prototype = Object.create(Vn.prototype);
ir.constructor = sr;
ir.depthBias = 0;
ir.layer = 0;
ir.vertices = null;
ir.faces = null;
ir.pivot = [0, 0, 0];
ir.color = null;
ir.colors = null;
ir.uvs = null;
ir._texture = null;
ir.textureImage = null;
ir.texturePattern = null;
ir.shaderType = 0;
Object.defineProperty(ir, "texture", {
  get: function() {
    return this._texture;
  },
  set: function(t) {
    this._texture !== t && (this._texture = t, this.texturePattern = null, t ? (this.textureImage || (this.textureImage = new Image()), this.textureImage.src = t) : this.textureImage = null);
  }
});
ir.faceNormals = null;
ir.vertexNormals = null;
ir.bounds = null;
ir.weldMap = null;
ir.adjTri = null;
ir.adjEdge = null;
ir.updateNormals = function(t = 1) {
  const a = this.faces, s = this.vertices, f = a.length;
  (!this.faceNormals || this.faceNormals.length !== f) && (this.faceNormals = new Float32Array(f)), !this.vertexNormals || this.vertexNormals.length !== s.length ? this.vertexNormals = new Float32Array(s.length) : this.vertexNormals.fill(0);
  for (let p = 0; p < f; p += 3) {
    const m = a[p] * 3, v = a[p + 1] * 3, g = a[p + 2] * 3, S = s[v] - s[m], E = s[v + 1] - s[m + 1], C = s[v + 2] - s[m + 2], b = s[g] - s[m], R = s[g + 1] - s[m + 1], D = s[g + 2] - s[m + 2];
    let _ = (E * D - C * R) * t, A = (C * b - S * D) * t, L = (S * R - E * b) * t;
    const U = Math.sqrt(_ * _ + A * A + L * L);
    if (U > 1e-10) {
      const q = 1 / U;
      this.faceNormals[p] = _ * q, this.faceNormals[p + 1] = A * q, this.faceNormals[p + 2] = L * q, this.vertexNormals[m] += _, this.vertexNormals[m + 1] += A, this.vertexNormals[m + 2] += L, this.vertexNormals[v] += _, this.vertexNormals[v + 1] += A, this.vertexNormals[v + 2] += L, this.vertexNormals[g] += _, this.vertexNormals[g + 1] += A, this.vertexNormals[g + 2] += L;
    }
  }
  for (let p = 0; p < this.vertexNormals.length; p += 3) {
    const m = this.vertexNormals[p], v = this.vertexNormals[p + 1], g = this.vertexNormals[p + 2], S = Math.sqrt(m * m + v * v + g * g);
    if (S > 1e-10) {
      const E = 1 / S;
      this.vertexNormals[p] *= E, this.vertexNormals[p + 1] *= E, this.vertexNormals[p + 2] *= E;
    } else
      this.vertexNormals[p + 1] = 1;
  }
};
ir.updateWeldMap = function(t) {
  this.weldMap = sr.computeWeldMap(this.vertices, this.weldMap, t);
};
ir.updateAdjacency = function() {
  const t = sr.computeAdjacency(
    this.faces,
    this.weldMap,
    this.adjTri,
    this.adjEdge
  );
  return this.adjTri = t.adjTri, this.adjEdge = t.adjEdge, t;
};
ir.setGameObject = function(t) {
  Vn.prototype.setGameObject.call(this, t), t.meshRenderer = this;
};
ir.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, Vn.prototype.unsetGameObject.call(this);
};
sr.computeNormalMatrix = function(t, a) {
  const s = a[0], f = a[1], p = a[2], m = a[4], v = a[5], g = a[6], S = a[8], E = a[9], C = a[10], b = v * C - g * E, R = -(m * C - g * S), D = m * E - v * S, _ = s * b + f * R + p * D;
  if (Math.abs(_) < 1e-6) return null;
  const A = 1 / _;
  t[0] = b * A, t[1] = R * A, t[2] = D * A, t[3] = -(f * C - p * E) * A, t[4] = (s * C - p * S) * A, t[5] = -(s * E - f * S) * A, t[6] = (f * g - p * v) * A, t[7] = -(s * g - p * m) * A, t[8] = (s * v - f * m) * A;
};
sr.computeBoundsFlatArray = function(t, a, s) {
  if (s.length !== 0) {
    for (var f = s[0], p = f, m = s[1], v = m, g = s[2], S = g, E = 3; E < s.length; E += 3) {
      var C = s[E], b = s[E + 1], R = s[E + 2];
      C < f ? f = C : C > p && (p = C), b < m ? m = b : b > v && (v = b), R < g ? g = R : R > S && (S = R);
    }
    return t[a] = f, t[a + 1] = m, t[a + 2] = g, t[a + 3] = p, t[a + 4] = m, t[a + 5] = g, t[a + 6] = f, t[a + 7] = v, t[a + 8] = g, t[a + 9] = p, t[a + 10] = v, t[a + 11] = g, t[a + 12] = f, t[a + 13] = m, t[a + 14] = S, t[a + 15] = p, t[a + 16] = m, t[a + 17] = S, t[a + 18] = f, t[a + 19] = v, t[a + 20] = S, t[a + 21] = p, t[a + 22] = v, t[a + 23] = S, t;
  }
};
sr.computeBoundingSphere = function(t, a, s) {
  let f = 1 / 0, p = 1 / 0, m = 1 / 0, v = -1 / 0, g = -1 / 0, S = -1 / 0;
  for (let L = 0; L < s.length; L += 3) {
    const U = s[L], q = s[L + 1], $ = s[L + 2];
    U < f && (f = U), U > v && (v = U), q < p && (p = q), q > g && (g = q), $ < m && (m = $), $ > S && (S = $);
  }
  const E = (f + v) * 0.5, C = (p + g) * 0.5, b = (m + S) * 0.5, R = v - E, D = g - C, _ = S - b, A = Math.sqrt(R * R + D * D + _ * _);
  t[a] = E, t[a + 1] = C, t[a + 2] = b, t[a + 3] = A;
};
sr.computeWeldMap = function(t, a, s = 1e-4) {
  const f = t.length / 3 | 0, p = a && a.length === f ? a : new Uint32Array(f), m = {};
  for (let v = 0; v < f; v++) {
    const g = v * 3;
    let S = t[g], E = t[g + 1], C = t[g + 2];
    Math.abs(S) < s && (S = 0), Math.abs(E) < s && (E = 0), Math.abs(C) < s && (C = 0);
    const b = S.toFixed(4) + "," + E.toFixed(4) + "," + C.toFixed(4), R = m[b];
    R === void 0 ? (m[b] = v, p[v] = v) : p[v] = R;
  }
  return p;
};
sr.computeAdjacency = function(t, a, s, f) {
  const p = t.length / 3 | 0, m = p * 3, v = s && s.length === m ? s : new Int32Array(m), g = f && f.length === m ? f : new Int32Array(m);
  v.fill(-1), g.fill(-1);
  const S = /* @__PURE__ */ new Map();
  for (let C = 0; C < p; C++)
    for (let b = 0; b < 3; b++) {
      const R = t[C * 3 + b], D = t[C * 3 + (b + 1) % 3], _ = a ? a[R] : R, A = a ? a[D] : D;
      if (_ === A) continue;
      const L = C * 3 + b, U = S.get(A * 4294967296 + _), q = U === void 0 ? -1 : U / 3 | 0;
      U !== void 0 && v[U] === -1 && q !== C && (v[L] = q, g[L] = U - q * 3, v[U] = C, g[U] = b), S.has(_ * 4294967296 + A) || S.set(_ * 4294967296 + A, L);
    }
  let E = 0;
  for (let C = 0; C < m; C++) v[C] === -1 && E++;
  return { adjTri: v, adjEdge: g, boundaryEdges: E };
};
function E3(t) {
  Vn.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var Fs = E3.prototype = Object.create(Vn.prototype);
Fs.constructor = E3;
Fs.sprite = null;
Fs.pivotX = 0;
Fs.pivotY = 0;
Fs.layer = 0;
Fs.setGameObject = function(t) {
  Vn.prototype.setGameObject.call(this, t), t.spriteRenderer = this;
};
Fs.setSprite = function(t) {
  return this.sprite = t, this.enabled = !0, this;
};
Fs.setPivot = function(t, a) {
  return this.pivotX = t, this.pivotY = a, this;
};
Fs.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, Vn.prototype.unsetGameObject.call(this);
};
function w3() {
  Vn.call(this), this.points = [];
}
var yf = w3.prototype = Object.create(Vn.prototype);
yf.constructor = w3;
yf.points = null;
yf.color = "white";
yf.width = 1;
yf.layer = 0;
yf.setGameObject = function(t) {
  Vn.prototype.setGameObject.call(this, t), t.pathRenderer = this;
};
yf.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, Vn.prototype.unsetGameObject.call(this);
};
function C3() {
  Vn.call(this);
}
var Ps = C3.prototype = Object.create(Vn.prototype);
Ps.constructor = C3;
Ps.text = "sample text";
Ps.color = "white";
Ps.style = "normal 12px arial";
Ps.layer = 0;
Ps.align = "center";
Ps.valign = "middle";
Ps.setGameObject = function(t) {
  Vn.prototype.setGameObject.call(this, t), t.textRenderer = this;
};
Ps.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, Vn.prototype.unsetGameObject.call(this);
};
function gN(t, a, s) {
  const f = [], p = [], m = t / 2, v = a / 2, g = t / s, S = a / s;
  for (let C = 0; C <= s; C++) {
    const b = C * S - v;
    for (let R = 0; R <= s; R++) {
      const D = R * g - m;
      f.push(D, 0, b);
    }
  }
  const E = s + 1;
  for (let C = 0; C < s; C++)
    for (let b = 0; b < s; b++) {
      const R = C * E + b, D = C * E + (b + 1), _ = (C + 1) * E + b, A = (C + 1) * E + (b + 1);
      p.push(R, _, D), p.push(A, D, _);
    }
  return {
    vertices: new Float32Array(f),
    faces: new Uint16Array(p),
    colors: new Uint32Array(f.length / 3).fill(255)
  };
}
const Nh = gN(1, 1, 1), b3 = new Float32Array(32);
sr.computeBoundsFlatArray(b3, 0, Nh.vertices);
sr.computeBoundingSphere(b3, 28, Nh.vertices);
function oT() {
  ai.call(this);
  const t = new sr();
  t.faces = Nh.faces, t.vertices = Nh.vertices, t.colors = Nh.colors, t.bounds = b3, t.updateNormals(), this.addComponent(t);
}
oT.prototype = Object.create(ai.prototype);
function SN(t, a, s, f) {
  const p = [], m = [], v = [];
  function g(E, C, b, R, D, _) {
    const A = `${E.toFixed(5)},${C.toFixed(5)},${b.toFixed(5)}`;
    if (_[A] !== void 0) return _[A];
    const L = p.length / 3;
    return p.push(E, C, b), m.push(R, D), _[A] = L, L;
  }
  function S(E, C, b, R, D, _, A, L, U, q) {
    const $ = {}, F = A / q, H = L / q, V = A / 2, Y = L / 2, ie = U / 2 * _, Q = [];
    for (let P = 0; P <= q; P++) {
      const ne = [], re = P * H - Y;
      for (let G = 0; G <= q; G++) {
        const Z = G * F - V, le = [0, 0, 0];
        le[E] = Z * R, le[C] = re * D, le[b] = ie;
        const de = G / q, oe = 1 - P / q;
        ne.push(g(le[0], le[1], le[2], de, oe, $));
      }
      Q.push(ne);
    }
    for (let P = 0; P < q; P++)
      for (let ne = 0; ne < q; ne++) {
        const re = Q[P][ne], G = Q[P + 1][ne], Z = Q[P + 1][ne + 1], le = Q[P][ne + 1];
        v.push(re, le, G), v.push(G, le, Z);
      }
  }
  return S(0, 1, 2, 1, 1, 1, t, a, s, f), S(0, 1, 2, -1, 1, -1, t, a, s, f), S(2, 1, 0, -1, 1, 1, s, a, t, f), S(2, 1, 0, 1, 1, -1, s, a, t, f), S(0, 2, 1, 1, -1, 1, t, s, a, f), S(0, 2, 1, 1, 1, -1, t, s, a, f), {
    vertices: new Float32Array(p),
    uvs: new Float32Array(m),
    faces: new Uint16Array(v),
    colors: new Uint32Array(p.length / 3).fill(255)
  };
}
const ap = SN(1, 1, 1, 1), T3 = new Float32Array(32);
sr.computeBoundsFlatArray(T3, 0, ap.vertices);
sr.computeBoundingSphere(T3, 28, ap.vertices);
function sT() {
  ai.call(this);
  const t = new sr();
  t.vertices = ap.vertices, t.uvs = ap.uvs, t.faces = ap.faces, t.colors = ap.colors, t.bounds = T3, t.updateNormals(), this.addComponent(t);
}
sT.prototype = Object.create(ai.prototype);
function xN(t, a, s) {
  const f = [], p = [];
  f.push(0, s, 0), f.push(0, 0, 0);
  for (let m = 0; m < t; m++) {
    const v = m / t * Math.PI * 2, g = Math.cos(v) * a, S = Math.sin(v) * a;
    f.push(g, 0, S);
  }
  for (let m = 0; m < t; m++) {
    const v = m + 2, g = m === t - 1 ? 2 : m + 3;
    p.push(0, g, v), p.push(1, v, g);
  }
  return {
    vertices: new Float32Array(f),
    faces: new Uint16Array(p),
    colors: new Uint32Array(f.length / 3).fill(255)
  };
}
const zh = xN(7, 0.5, 1), R3 = new Float32Array(32);
sr.computeBoundsFlatArray(R3, 0, zh.vertices);
sr.computeBoundingSphere(R3, 28, zh.vertices);
function uT() {
  ai.call(this);
  const t = new sr();
  t.vertices = zh.vertices, t.faces = zh.faces, t.colors = zh.colors, t.bounds = R3, t.updateNormals(), this.addComponent(t);
}
uT.prototype = Object.create(ai.prototype);
function EN(t, a, s) {
  const f = [], p = [], m = [], v = {};
  function g(E, C, b, R, D) {
    const _ = `${E.toFixed(5)},${C.toFixed(5)},${b.toFixed(5)}`;
    if (v[_] !== void 0) return v[_];
    const A = f.length / 3;
    return f.push(E, C, b), p.push(R, D), v[_] = A, A;
  }
  const S = [];
  for (let E = 0; E <= t; E++) {
    const C = [], b = E * Math.PI / t, R = Math.sin(b), D = Math.cos(b);
    for (let _ = 0; _ <= a; _++) {
      const A = _ * 2 * Math.PI / a, L = Math.cos(A) * R * s, U = D * s, q = Math.sin(A) * R * s, $ = _ / a, F = E / t;
      C.push(g(L, U, q, $, F));
    }
    S.push(C);
  }
  for (let E = 0; E < t; E++)
    for (let C = 0; C < a; C++) {
      const b = S[E][C], R = S[E][C + 1], D = S[E + 1][C], _ = S[E + 1][C + 1];
      E !== 0 && m.push(b, R, D), E !== t - 1 && m.push(D, R, _);
    }
  return {
    vertices: new Float32Array(f),
    uvs: new Float32Array(p),
    faces: new Uint16Array(m),
    colors: new Uint32Array(f.length / 3).fill(255)
  };
}
function wN(t) {
  const a = t.vertices, s = t.vertexNormals, f = {};
  for (let p = 0; p < a.length; p += 3) {
    const m = Math.abs(a[p]) < 1e-4 ? 0 : a[p], v = Math.abs(a[p + 1]) < 1e-4 ? 0 : a[p + 1], g = Math.abs(a[p + 2]) < 1e-4 ? 0 : a[p + 2], S = `${m.toFixed(4)},${v.toFixed(4)},${g.toFixed(4)}`;
    f[S] || (f[S] = []), f[S].push(p);
  }
  for (const p in f) {
    const m = f[p];
    if (m.length < 2) continue;
    let v = 0, g = 0, S = 0;
    for (let C = 0; C < m.length; C++) {
      const b = m[C];
      v += s[b], g += s[b + 1], S += s[b + 2];
    }
    const E = Math.sqrt(v * v + g * g + S * S);
    if (E > 1e-10) {
      const C = 1 / E;
      v *= C, g *= C, S *= C;
    }
    for (let C = 0; C < m.length; C++) {
      const b = m[C];
      s[b] = v, s[b + 1] = g, s[b + 2] = S;
    }
  }
}
function CN(t = 8, a = 8, s = 8) {
  const f = EN(t, a, s), p = new Float32Array(32);
  return sr.computeBoundsFlatArray(p, 0, f.vertices), sr.computeBoundingSphere(p, 28, f.vertices), [
    f.vertices,
    f.faces,
    f.uvs,
    p,
    f.colors
  ];
}
function M3(t, a, s, f, p) {
  ai.call(this);
  const m = new sr();
  m.vertices = t, m.faces = a, m.uvs = s, m.colors = p || new Uint32Array(t.length / 3).fill(255), m.bounds = f, m.updateNormals(), wN(m), this.addComponent(m);
}
M3.prototype = Object.create(ai.prototype);
M3.generate = CN;
function bN() {
  const t = new Array(65536);
  for (let a = 0; a < 65536; a++) {
    const s = a >> 11 & 31, f = a >> 5 & 63, p = a & 31, m = s << 3 | s >> 2, v = f << 2 | f >> 4, g = p << 3 | p >> 2;
    t[a] = "#" + (m < 16 ? "0" : "") + m.toString(16) + (v < 16 ? "0" : "") + v.toString(16) + (g < 16 ? "0" : "") + g.toString(16);
  }
  return t;
}
const ao = bN(), U0 = 31, qu = 65535, TN = a5, U2 = 25;
function RN(t, a, s, f) {
  const p = s[0], m = s[1], v = s[4], g = s[5], S = s[8], E = s[9], C = new Path2D(), b = new Path2D(), R = new Path2D();
  for (let D = 0; D < t.length; D++) {
    const _ = t[D];
    if (!_ || !_.transform) continue;
    const A = _.transform.getLocalToWorld(), L = A[12], U = A[13], q = A[14];
    TN(
      f,
      0,
      L,
      U,
      q,
      s
    );
    const $ = f[0], F = f[1];
    let H = A[0], V = A[1], Y = A[2], ie = Math.sqrt(H * H + V * V + Y * Y);
    ie < 1e-4 && (H = 1, V = 0, Y = 0, ie = 1);
    const Q = U2 / ie;
    C.moveTo($, F), C.lineTo(
      $ + (H * p + V * v + Y * S) * Q,
      F + (H * m + V * g + Y * E) * Q
    );
    let P = A[4], ne = A[5], re = A[6], G = Math.sqrt(P * P + ne * ne + re * re);
    G < 1e-4 && (P = 0, ne = 1, re = 0, G = 1);
    const Z = U2 / G;
    b.moveTo($, F), b.lineTo(
      $ + (P * p + ne * v + re * S) * Z,
      F + (P * m + ne * g + re * E) * Z
    );
    let le = A[8], de = A[9], oe = A[10], ae = Math.sqrt(le * le + de * de + oe * oe);
    ae < 1e-4 && (le = 0, de = 0, oe = 1, ae = 1);
    const fe = U2 / ae;
    R.moveTo($, F), R.lineTo(
      $ + (le * p + de * v + oe * S) * fe,
      F + (le * m + de * g + oe * E) * fe
    );
  }
  a.strokeStyle = "#ff0000", a.stroke(C), a.strokeStyle = "#00ff00", a.stroke(b), a.strokeStyle = "#0000ff", a.stroke(R);
}
function MN(t, a, s, f, p, m, v, g, S, E, C, b = 10) {
  const R = S * 0.5, D = E * 0.5, _ = g + v, A = C[0], L = C[1], U = C[4], q = C[5], $ = C[8], F = C[9];
  t.beginPath(), t.strokeStyle = "cyan";
  for (let H = g; H < _; H++) {
    const V = f[H], Y = s[V * 3], ie = s[V * 3 + 1], Q = s[V * 3 + 2], P = a[Y] * R + R, ne = a[Y + 1] * D + D, re = a[ie] * R + R, G = a[ie + 1] * D + D, Z = a[Q] * R + R, le = a[Q + 1] * D + D, de = (P + re + Z) * 0.33333, oe = (ne + G + le) * 0.33333, ae = V * 3, fe = p[ae], ve = p[ae + 1], j = p[ae + 2], X = fe * A + ve * U + j * $, xe = fe * L + ve * q + j * F;
    t.moveTo(de, oe), t.lineTo(de + X * b, oe - xe * b);
  }
  t.stroke(), t.beginPath(), t.strokeStyle = "yellow";
  for (let H = g; H < _; H++) {
    const V = f[H], Y = s[V * 3], ie = s[V * 3 + 1], Q = s[V * 3 + 2], P = a[Y] * R + R, ne = a[Y + 1] * D + D, re = a[ie] * R + R, G = a[ie + 1] * D + D, Z = a[Q] * R + R, le = a[Q + 1] * D + D, de = m[Y], oe = m[Y + 1], ae = m[Y + 2], fe = de * A + oe * U + ae * $, ve = de * L + oe * q + ae * F;
    t.moveTo(P, ne), t.lineTo(P + fe * b, ne - ve * b);
    const j = m[ie], X = m[ie + 1], xe = m[ie + 2], be = j * A + X * U + xe * $, ze = j * L + X * q + xe * F;
    t.moveTo(re, G), t.lineTo(re + be * b, G - ze * b);
    const _e = m[Q], Ve = m[Q + 1], Be = m[Q + 2], Fe = _e * A + Ve * U + Be * $, ct = _e * L + Ve * q + Be * F;
    t.moveTo(Z, le), t.lineTo(Z + Fe * b, le - ct * b);
  }
  t.stroke();
}
function _N(t, a, s, f, p, m, v, g, S) {
  if (v <= 1) return;
  const E = S - g > 1e-4 ? 65535 / (S - g) : 0;
  m.fill(0);
  for (let b = 0; b < v; b++) {
    const R = t[b], D = p[R] & 255;
    m[D]++;
  }
  let C = 0;
  for (let b = 0; b < 256; b++) {
    const R = m[b];
    m[b] = C, C += R;
  }
  for (let b = 0; b < v; b++) {
    const R = t[b], D = p[R] & 255;
    a[m[D]++] = R;
  }
  m.fill(0);
  for (let b = 0; b < v; b++) {
    const R = a[b], D = f[R] & 255;
    m[D]++;
  }
  C = 0;
  for (let b = 0; b < 256; b++) {
    const R = m[b];
    m[b] = C, C += R;
  }
  for (let b = 0; b < v; b++) {
    const R = a[b], D = f[R] & 255;
    t[m[D]++] = R;
  }
  m.fill(0);
  for (let b = 0; b < v; b++) {
    const R = t[b];
    let _ = (s[R] - g) * E;
    _ < 0 ? _ = 0 : _ > 65535 && (_ = 65535);
    const A = 65535 - (_ | 0) & 255;
    m[A]++;
  }
  C = 0;
  for (let b = 0; b < 256; b++) {
    const R = m[b];
    m[b] = b & 1 ? C + R - 1 : C, C += R;
  }
  for (let b = 0; b < v; b++) {
    const R = t[b];
    let _ = (s[R] - g) * E;
    _ < 0 ? _ = 0 : _ > 65535 && (_ = 65535);
    const A = 65535 - (_ | 0) & 255;
    A & 1 ? a[m[A]--] = R : a[m[A]++] = R;
  }
  m.fill(0);
  for (let b = 0; b < v; b++) {
    const R = a[b];
    let _ = (s[R] - g) * E;
    _ < 0 ? _ = 0 : _ > 65535 && (_ = 65535);
    const A = 65535 - (_ | 0) >> 8 & 255;
    m[A]++;
  }
  C = 0;
  for (let b = 0; b < 256; b++) {
    const R = m[b];
    m[b] = C, C += R;
  }
  for (let b = 0; b < v; b++) {
    const R = a[b];
    let _ = (s[R] - g) * E;
    _ < 0 ? _ = 0 : _ > 65535 && (_ = 65535);
    const A = 65535 - (_ | 0) >> 8 & 255;
    t[m[A]++] = R;
  }
}
const zs = 0, Us = 3, pf = 8, ip = -1, j2 = -2, js = 0, vf = 2, up = 6, gC = js + up, G2 = vf + up, DN = 3;
function cT(t, a, s, f, p, m, v, g, S, E, C) {
  if (E[S] !== g) {
    const R = ao[g];
    t.fillStyle = R, t.strokeStyle = R, E[S] = g, S === Us && g !== qu && (E[pf] = 1);
  }
  t.beginPath(), t.moveTo(a, s), t.lineTo(f, p), t.lineTo(m, v), t.closePath(), t.stroke(), t.fill();
  const b = S === Us ? vf : js;
  C[b]++, C[b + up] += DN;
}
function _3(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U, q, $, F, H, V, Y, ie, Q, P, ne, re) {
  cT(
    t,
    a,
    s,
    f,
    p,
    m,
    v,
    qu,
    Us,
    Q,
    P
  );
}
function D3(t, a, s, f, p, m) {
  for (let v = a; v < s; v++) p[t[v]] = v;
  for (let v = a; v < s; v++) {
    const g = t[v], S = g * 3, E = f[S], C = f[S + 1], b = f[S + 2];
    m[g] = (E === ip || E >= 0 && p[E] > v ? 1 : 0) | (C === ip || C >= 0 && p[C] > v ? 2 : 0) | (b === ip || b >= 0 && p[b] > v ? 4 : 0);
  }
  for (let v = a; v < s; v++) p[t[v]] = -1;
}
const hf = 64, Mi = hf + 31 >> 5, Uh = 128, cp = 1, Pu = 2 * cp, kN = 6, Q2 = 32, SC = Q2 - 1, X2 = 2048, ON = 8, fT = 0, dT = 1, _i = 2, Ra = 3, $u = 4, Vo = 5, Hh = 4096, Ph = Hh - 1, AN = 4, cf = 0, ff = 1, df = 2, e1 = 3, Gi = 8, qo = 0, kh = 1, Uu = 2, uf = 3, qi = 4, Yi = 5, Wi = 6, Bi = 7, mf = 1, Vh = 2, pT = 3, h1 = 4;
function k3() {
  const t = new ArrayBuffer(hf * Gi * 4), a = new ArrayBuffer(X2 * ON * 4), s = {
    slots: new Int32Array(t),
    slotsF: new Float32Array(t),
    // SLOT_WORDS int32 of slot bits per bucket, one table per axis. Bucket-major, so a bucket's
    // words are adjacent and the common case - one bucket, every word - is one cache line.
    colBits: new Int32Array(Q2 * Mi),
    rowBits: new Int32Array(Q2 * Mi),
    // One bit per slot, set where the slot is free.
    freeMask: new Int32Array(Mi),
    // Buckets each slot last published into, as [cx0, cy0, cx1, cy1]; -1 = not published.
    spanRect: new Int32Array(hf * 4),
    nodes: new Int32Array(a),
    nodesF: new Float32Array(a),
    edges: new Int32Array(Hh * AN),
    scal: new Int32Array(8),
    emitX: new Float32Array(Uh),
    emitY: new Float32Array(Uh),
    emitF: new Uint8Array(Uh),
    frameId: -1,
    evictions: 0
  };
  return s.scal[Vh] = 1, m1(s), s;
}
function m1(t) {
  const a = t.slots;
  for (let p = 0; p < hf; p++) a[p * Gi + qo] = -1;
  const s = t.freeMask;
  for (let p = 0; p < Mi; p++) {
    const m = hf - (p << 5);
    s[p] = m >= 32 ? -1 : (1 << m) - 1;
  }
  const f = t.nodes;
  for (let p = 0; p < X2; p++) {
    const m = p << 3;
    f[m + Ra] = p === X2 - 1 ? -1 : p + 1, f[m + $u] = -1;
  }
  t.scal[mf] = 0, t.scal[h1] = 0, t.colBits.fill(0), t.rowBits.fill(0), t.spanRect.fill(-1), t.scal[Vh]++, t.scal[pT] = 0;
}
function t1(t, a) {
  let s = Math.imul(t, 2654435761) ^ Math.imul(a, 2246822519);
  return s ^= s >>> 15, s = Math.imul(s, 625341585), s ^= s >>> 13, s & Ph;
}
function F2(t, a, s) {
  const f = t.scal[Vh], p = t.edges;
  let m = t1(a, s);
  for (let v = 0; v < Hh; v++) {
    const g = m << 2;
    if (p[g + cf] !== f) return -1;
    if (p[g + ff] === a && p[g + df] === s) return p[g + e1];
    m = m + 1 & Ph;
  }
  return -1;
}
function LN(t, a, s, f) {
  const p = t.scal[Vh], m = t.edges;
  let v = t1(a, s);
  for (let g = 0; g < Hh; g++) {
    const S = v << 2;
    if (m[S + cf] !== p) {
      m[S + cf] = p, m[S + ff] = a, m[S + df] = s, m[S + e1] = f;
      return;
    }
    if (m[S + ff] === a && m[S + df] === s) return;
    v = v + 1 & Ph;
  }
}
function y1(t, a, s) {
  const f = t.scal[Vh], p = t.edges;
  let m = t1(a, s), v = !1;
  for (let S = 0; S < Hh; S++) {
    const E = m << 2;
    if (p[E + cf] !== f) break;
    if (p[E + ff] === a && p[E + df] === s) {
      v = !0;
      break;
    }
    m = m + 1 & Ph;
  }
  if (!v) return;
  let g = m;
  for (; ; ) {
    const S = m << 2;
    p[S + cf] = f - 1, g = g + 1 & Ph;
    const E = g << 2;
    if (p[E + cf] !== f) return;
    const C = t1(p[E + ff], p[E + df]);
    (m <= g ? m < C && C <= g : m < C || C <= g) || (p[S + cf] = f, p[S + ff] = p[E + ff], p[S + df] = p[E + df], p[S + e1] = p[E + e1], m = g);
  }
}
function j0(t, a, s, f, p) {
  const m = t.scal[mf];
  if (m === -1) return -1;
  const v = t.nodes, g = m << 3;
  return t.scal[mf] = v[g + Ra], t.nodesF[g + fT] = a, t.nodesF[g + dT] = s, v[g + _i] = f, v[g + Ra] = -1, v[g + $u] = p, t.scal[h1]++, m;
}
function Eh(t, a) {
  const s = t.nodes, f = a << 3, p = s[f + Ra];
  p !== -1 && y1(t, s[f + _i], s[(p << 3) + _i]), s[f + $u] = -1, s[f + _i] = -1, s[f + Ra] = t.scal[mf], t.scal[mf] = a, t.scal[h1]--;
}
function zu(t, a, s) {
  const f = t.nodes, p = a << 3, m = f[p + Ra];
  m !== -1 && y1(t, f[p + _i], f[(m << 3) + _i]), f[p + Ra] = s, s !== -1 && LN(t, f[p + _i], f[(s << 3) + _i], a);
}
function Hu(t) {
  const a = t > 0 ? t >>> kN : 0;
  return a > SC ? SC : a;
}
function F0(t, a) {
  const s = t.slotsF, f = a << 3, p = Hu(s[f + qi] - Pu), m = Hu(s[f + Yi] - Pu), v = Hu(s[f + Wi] + Pu), g = Hu(s[f + Bi] + Pu), S = a << 2, E = t.spanRect;
  if (E[S] === p && E[S + 1] === m && E[S + 2] === v && E[S + 3] === g)
    return;
  O3(t, a), E[S] = p, E[S + 1] = m, E[S + 2] = v, E[S + 3] = g;
  const C = a >> 5, b = 1 << (a & 31), R = t.colBits, D = t.rowBits;
  for (let _ = p; _ <= v; _++) R[_ * Mi + C] |= b;
  for (let _ = m; _ <= g; _++) D[_ * Mi + C] |= b;
}
function O3(t, a) {
  const s = a << 2, f = t.spanRect, p = f[s];
  if (p === -1) return;
  const m = f[s + 1], v = f[s + 2], g = f[s + 3];
  f[s] = -1;
  const S = a >> 5, E = ~(1 << (a & 31)), C = t.colBits, b = t.rowBits;
  for (let R = p; R <= v; R++) C[R * Mi + S] &= E;
  for (let R = m; R <= g; R++) b[R * Mi + S] &= E;
}
function K2(t, a, s, f, p, m, v, g, S) {
  const E = t.slots, C = a * Gi, b = E[C + qo];
  if (b === -1) return;
  const R = E[C + kh], D = E[C + Uu], _ = t.nodes, A = t.nodesF, L = t.emitX, U = t.emitY, q = t.emitF;
  let $ = t.scal[mf];
  const F = _[(R << 3) + _i], H = S * S;
  let V = 0, Y = R;
  for (let ne = 0; ne < D; ne++) {
    const re = Y << 3, G = _[re + Ra], Z = A[re + fT], le = A[re + dT], de = _[re + Vo];
    if (V < 2)
      L[V] = Z, U[V] = le, q[V] = de, V++;
    else {
      const oe = L[V - 2], ae = U[V - 2], fe = L[V - 1], ve = U[V - 1], j = fe - oe, X = ve - ae, xe = Z - oe, be = le - ae, ze = j * be - X * xe;
      q[V - 2] === q[V - 1] && ze * ze <= H * (xe * xe + be * be) ? (L[V - 1] = Z, U[V - 1] = le, q[V - 1] = de) : (L[V] = Z, U[V] = le, q[V] = de, V++);
    }
    G !== -1 && y1(
      t,
      _[re + _i],
      G === R ? F : _[(G << 3) + _i]
    ), _[re + $u] = -1, _[re + _i] = -1, _[re + Ra] = $, $ = Y, Y = G;
  }
  t.scal[mf] = $, t.scal[h1] -= D, E[C + qo] = -1, O3(t, a), t.freeMask[a >> 5] |= 1 << (a & 31);
  let ie = 0;
  for (; V - ie >= 4; ) {
    const ne = L[V - 2], re = U[V - 2], G = L[V - 1], Z = U[V - 1], le = L[ie], de = U[ie], oe = G - ne, ae = Z - re, fe = le - ne, ve = de - re, j = oe * ve - ae * fe;
    if (j * j > H * (fe * fe + ve * ve) || q[V - 2] !== q[V - 1]) break;
    V--;
  }
  for (; V - ie >= 4; ) {
    const ne = L[V - 1], re = U[V - 1], G = L[ie], Z = U[ie], le = L[ie + 1], de = U[ie + 1], oe = G - ne, ae = Z - re, fe = le - ne, ve = de - re, j = oe * ve - ae * fe;
    if (j * j > H * (fe * fe + ve * ve) || q[V - 1] !== q[ie]) break;
    ie++;
  }
  if (V - ie < 3) return;
  if (f[p] !== b) {
    const ne = ao[b];
    s.fillStyle = ne, s.strokeStyle = ne, f[p] = b, m !== -1 && b !== qu && (f[m] = 1);
  }
  const Q = V - ie;
  let P = Q;
  s.beginPath();
  for (let ne = 0; ne < Q; ne++) {
    const re = ie + ne;
    if (ne === 0 ? s.moveTo(L[re], U[re]) : s.lineTo(L[re], U[re]), q[re] === 0) continue;
    const G = ie + (ne + 1 === Q ? 0 : ne + 1), Z = L[G] - L[re], le = U[G] - U[re], de = Z < 0 ? -Z : Z, oe = le < 0 ? -le : le, ae = de > oe ? de + 0.4 * oe : oe + 0.4 * de;
    if (ae < 1e-6) continue;
    const fe = cp / ae, ve = le * fe, j = -Z * fe;
    s.lineTo(L[re] + ve, U[re] + j), s.lineTo(L[G] + ve, U[G] + j), P += 2;
  }
  s.fill(), v[g]++, v[g + up] += P;
}
function A3(t, a, s, f, p, m, v, g) {
  const S = t.slots;
  for (; ; ) {
    let E = -1, C = 2147483647;
    for (let b = 0; b < hf; b++) {
      const R = b * Gi;
      S[R + qo] !== -1 && S[R + uf] < C && (C = S[R + uf], E = b);
    }
    if (E === -1) return;
    K2(
      t,
      E,
      a,
      s,
      f,
      p,
      m,
      v,
      g
    );
  }
}
function L3(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U, q, $ = 0) {
  const F = t.slots, H = t.nodes, V = C < D ? C < L ? C : L : D < L ? D : L, Y = C > D ? C > L ? C : L : D > L ? D : L, ie = b < _ ? b < U ? b : U : _ < U ? _ : U, Q = b > _ ? b > U ? b : U : _ > U ? _ : U, P = t.slotsF, ne = Y + Pu, re = V - Pu, G = Q + Pu, Z = ie - Pu, le = t.colBits, de = t.rowBits, oe = Hu(V), ae = Hu(Y), fe = Hu(ie), ve = Hu(Q);
  for (let Ye = 0; Ye < Mi; Ye++) {
    let Pe = le[oe * Mi + Ye];
    for (let Se = oe + 1; Se <= ae; Se++) Pe |= le[Se * Mi + Ye];
    if (Pe === 0) continue;
    let $e = de[fe * Mi + Ye];
    for (let Se = fe + 1; Se <= ve; Se++) $e |= de[Se * Mi + Ye];
    let Xe = Pe & $e;
    const Ct = Ye << 5;
    let Te = 0;
    for (; Xe !== 0; ) {
      const Se = 31 - Math.clz32(Xe & -Xe);
      Xe &= Xe - 1;
      const Ke = Ct + Se << 3;
      F[Ke + qo] !== S && (P[Ke + qi] > ne || P[Ke + Wi] < re || P[Ke + Yi] > G || P[Ke + Bi] < Z || (Te |= 1 << Se));
    }
    for (; Te !== 0; ) {
      const Se = 31 - Math.clz32(Te & -Te);
      Te &= Te - 1, K2(
        t,
        Ct + Se,
        a,
        s,
        f,
        p,
        m,
        v,
        g
      );
    }
  }
  const j = ++t.scal[pT];
  let X = F2(t, A, R), xe = F2(t, q, A), be = F2(t, R, q), ze = X === -1 ? -1 : H[(X << 3) + $u], _e = xe === -1 ? -1 : H[(xe << 3) + $u], Ve = be === -1 ? -1 : H[(be << 3) + $u];
  ze !== -1 && F[ze * Gi + qo] !== S && (X = -1, ze = -1), _e !== -1 && F[_e * Gi + qo] !== S && (xe = -1, _e = -1), Ve !== -1 && F[Ve * Gi + qo] !== S && (be = -1, Ve = -1);
  const Be = (X !== -1 ? 1 : 0) + (xe !== -1 ? 1 : 0) + (be !== -1 ? 1 : 0);
  if (Be === 2) {
    let Ye, Pe, $e, Xe, Ct;
    if (X !== -1 && xe !== -1 ? (Ye = 0, Pe = X, $e = xe, Xe = ze, Ct = _e) : xe !== -1 && be !== -1 ? (Ye = 1, Pe = xe, $e = be, Xe = _e, Ct = Ve) : (Ye = 2, Pe = be, $e = X, Xe = Ve, Ct = ze), Xe === Ct) {
      if (H[($e << 3) + Ra] === Pe) {
        const Te = Xe * Gi;
        zu(t, $e, H[(Pe << 3) + Ra]), H[($e << 3) + Vo] = $ >> (Ye + 2) % 3 & 1, F[Te + kh] === Pe && (F[Te + kh] = $e), Eh(t, Pe), F[Te + Uu]--, F[Te + uf] = j, V < P[Te + qi] && (P[Te + qi] = V), ie < P[Te + Yi] && (P[Te + Yi] = ie), Y > P[Te + Wi] && (P[Te + Wi] = Y), Q > P[Te + Bi] && (P[Te + Bi] = Q), F0(t, Xe);
        return;
      }
    } else {
      const Te = Xe * Gi, Se = Ct * Gi, Ke = F[Te + Uu] + F[Se + Uu] - 1;
      if (Ke <= Uh) {
        const Ot = H[(Pe << 3) + Ra], ot = H[($e << 3) + Ra], wt = H[(ot << 3) + Ra];
        wt !== -1 && y1(
          t,
          H[(ot << 3) + _i],
          H[(wt << 3) + _i]
        ), H[(ot << 3) + Ra] = -1;
        const at = H[(ot << 3) + Vo];
        zu(t, Pe, wt), zu(t, $e, Ot), H[(Pe << 3) + Vo] = at, H[($e << 3) + Vo] = $ >> (Ye + 2) % 3 & 1, Eh(t, ot);
        let mt = Pe;
        for (let It = 0; It < Ke; It++) {
          const nn = mt << 3;
          if (H[nn + $u] = Xe, mt = H[nn + Ra], mt === -1) break;
        }
        F[Te + kh] = Pe, F[Te + Uu] = Ke, F[Te + uf] = j, P[Se + qi] < P[Te + qi] && (P[Te + qi] = P[Se + qi]), P[Se + Yi] < P[Te + Yi] && (P[Te + Yi] = P[Se + Yi]), P[Se + Wi] > P[Te + Wi] && (P[Te + Wi] = P[Se + Wi]), P[Se + Bi] > P[Te + Bi] && (P[Te + Bi] = P[Se + Bi]), V < P[Te + qi] && (P[Te + qi] = V), ie < P[Te + Yi] && (P[Te + Yi] = ie), Y > P[Te + Wi] && (P[Te + Wi] = Y), Q > P[Te + Bi] && (P[Te + Bi] = Q), O3(t, Ct), F0(t, Xe), F[Se + qo] = -1, t.freeMask[Ct >> 5] |= 1 << (Ct & 31);
        return;
      }
    }
  } else if (Be === 1) {
    const Ye = X !== -1 ? X : xe !== -1 ? xe : be, Pe = X !== -1 ? ze : xe !== -1 ? _e : Ve, $e = Pe * Gi;
    if (F[$e + Uu] < Uh) {
      const Se = j0(t, X !== -1 ? L : xe !== -1 ? C : D, X !== -1 ? U : xe !== -1 ? b : _, X !== -1 ? q : xe !== -1 ? R : A, Pe);
      if (Se !== -1) {
        zu(t, Se, H[(Ye << 3) + Ra]), zu(t, Ye, Se);
        const Ke = X !== -1 ? 0 : xe !== -1 ? 1 : 2;
        H[(Ye << 3) + Vo] = $ >> (Ke + 1) % 3 & 1, H[(Se << 3) + Vo] = $ >> (Ke + 2) % 3 & 1, F[$e + Uu]++, F[$e + uf] = j, V < P[$e + qi] && (P[$e + qi] = V), ie < P[$e + Yi] && (P[$e + Yi] = ie), Y > P[$e + Wi] && (P[$e + Wi] = Y), Q > P[$e + Bi] && (P[$e + Bi] = Q), F0(t, Pe);
        return;
      }
    }
  }
  let Fe = -1;
  const ct = t.freeMask;
  for (let Ye = 0; Ye < Mi; Ye++) {
    const Pe = ct[Ye];
    if (Pe !== 0) {
      Fe = (Ye << 5) + 31 - Math.clz32(Pe & -Pe);
      break;
    }
  }
  if (Fe === -1) {
    let Ye = 2147483647;
    for (let Pe = 0; Pe < hf; Pe++) {
      const $e = F[Pe * Gi + uf];
      $e < Ye && (Ye = $e, Fe = Pe);
    }
    K2(
      t,
      Fe,
      a,
      s,
      f,
      p,
      m,
      v,
      g
    ), t.evictions++;
  }
  const vt = j0(t, C, b, R, Fe), Le = j0(t, D, _, A, Fe), Je = j0(t, L, U, q, Fe);
  if (vt === -1 || Le === -1 || Je === -1) {
    vt !== -1 && Eh(t, vt), Le !== -1 && Eh(t, Le), Je !== -1 && Eh(t, Je);
    return;
  }
  zu(t, vt, Le), zu(t, Le, Je), zu(t, Je, vt), H[(vt << 3) + Vo] = $ & 1, H[(Le << 3) + Vo] = $ >> 1 & 1, H[(Je << 3) + Vo] = $ >> 2 & 1;
  const Re = Fe * Gi;
  F[Re + qo] = S, F[Re + kh] = vt, F[Re + Uu] = 3, F[Re + uf] = j, P[Re + qi] = V, P[Re + Yi] = ie, P[Re + Wi] = Y, P[Re + Bi] = Q, F0(t, Fe), t.freeMask[Fe >> 5] &= ~(1 << (Fe & 31));
}
const wh = k3(), xC = 0.05;
function Yu(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U, q, $, F, H, V, Y, ie, Q, P, ne, re, G) {
  wh.frameId !== ne && (m1(wh), wh.frameId = ne);
  const Z = _ * 3, le = S[Z], de = S[Z + 1], oe = S[Z + 2];
  let ae;
  if (le === de && de === oe)
    ae = (le >>> 16 & 248) << 8 | (le >>> 8 & 252) << 3 | (le & 248) >> 3;
  else {
    const fe = ((le >>> 16) + (de >>> 16) + (oe >>> 16)) / 3, ve = ((le >>> 8 & 255) + (de >>> 8 & 255) + (oe >>> 8 & 255)) / 3, j = ((le & 255) + (de & 255) + (oe & 255)) / 3;
    ae = (fe & 248) << 8 | (ve & 252) << 3 | (j & 248) >> 3;
  }
  L3(
    wh,
    t,
    Q,
    0,
    -1,
    P,
    js,
    xC,
    ae,
    ie,
    a,
    s,
    b,
    f,
    p,
    R,
    m,
    v,
    D,
    G
  ), re && A3(
    wh,
    t,
    Q,
    zs,
    -1,
    P,
    js,
    xC
  );
}
const Ri = 32, no = 12, NN = 0.9999, tp = 0.5, P0 = 2 * cp, Oh = 2048, g1 = Oh - 1, bl = 4, Vu = 0, ju = 1, jh = 2;
function zN() {
  return {
    slots: new Int32Array(Ri * bl),
    // Six affine terms per chart, fitted from the face that seeded it.
    affine: new Float32Array(Ri * 6),
    // The chart's plane normal, for the coplanarity test.
    normal: new Float32Array(Ri * 3),
    // Screen bounds per chart, [x0, y0, x1, y1] - the overlap guard's only input.
    aabb: new Float32Array(Ri * 4),
    // Boundary rings as flat arrays rather than linked nodes: short enough that an insert is a
    // handful of element moves, and an array cannot be corrupted by pointer surgery.
    bu: new Float32Array(Ri * no),
    bv: new Float32Array(Ri * no),
    bid: new Int32Array(Ri * no),
    // 1 where the boundary edge LEAVING vertex i must be pushed outward at flush, i.e. the face
    // across it is drawn later. See computeExpandMasks in shared/shaders.js.
    bexp: new Uint8Array(Ri * no),
    // The mesh each chart came from, to reach its texture pattern at flush.
    meshRef: new Array(Ri).fill(null),
    // Directed-edge table: (from -> to) -> slot, cleared in O(1) by bumping the generation.
    eFrom: new Int32Array(Oh),
    eTo: new Int32Array(Oh),
    eSlot: new Int32Array(Oh),
    eStamp: new Int32Array(Oh),
    gen: 1,
    seq: 0,
    live: 0,
    frameId: -1
  };
}
function UN(t) {
  const a = t.slots;
  for (let s = 0; s < Ri; s++)
    a[s * bl + Vu] = 0, t.meshRef[s] = null;
  t.gen++, t.seq = 0, t.live = 0;
}
function N3(t, a) {
  let s = Math.imul(t, 2654435761) ^ Math.imul(a, 2246822519);
  return s ^= s >>> 15, s = Math.imul(s, 625341585), s ^= s >>> 13, s & g1;
}
function P2(t, a, s) {
  const f = t.gen;
  let p = N3(a, s);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return -1;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === s)
      return t.eSlot[p];
    p = p + 1 & g1;
  }
  return -1;
}
function G0(t, a, s, f) {
  const p = t.gen;
  let m = N3(a, s);
  for (let v = 0; v < 32; v++) {
    if (t.eStamp[m] !== p) {
      t.eStamp[m] = p, t.eFrom[m] = a, t.eTo[m] = s, t.eSlot[m] = f;
      return;
    }
    if (t.eFrom[m] === a && t.eTo[m] === s) return;
    m = m + 1 & g1;
  }
}
function Q0(t, a, s) {
  const f = t.gen;
  let p = N3(a, s);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === s) {
      t.eStamp[p] = -1;
      return;
    }
    p = p + 1 & g1;
  }
}
function jN(t, a) {
  const s = a * no, f = t.slots[a * bl + ju];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    G0(t, t.bid[s + p], t.bid[s + m], a);
  }
}
function FN(t, a) {
  const s = a * no, f = t.slots[a * bl + ju];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    Q0(t, t.bid[s + p], t.bid[s + m]);
  }
}
function PN(t) {
  if (typeof document > "u") return t;
  const a = document.createElement("canvas");
  return a.width = t.naturalWidth, a.height = t.naturalHeight, a.getContext("2d").drawImage(t, 0, 0), a;
}
function Z2(t, a, s, f, p, m) {
  const v = t.slots, g = a * bl;
  if (v[g + Vu] === 0) return;
  const S = v[g + ju];
  FN(t, a), v[g + Vu] = 0, t.live--;
  const E = t.meshRef[a];
  if (t.meshRef[a] = null, S < 3 || E === null) return;
  const C = a * no, b = t.bu, R = t.bv, D = a * 6;
  let _ = E.texturePattern;
  _ || (_ = s.createPattern(
    PN(E.textureImage),
    "repeat"
  ), E.texturePattern = _), s.fillStyle = _, f[zs] = -1;
  const A = t.affine[D], L = t.affine[D + 1], U = t.affine[D + 2], q = t.affine[D + 3];
  s.setTransform(A, L, U, q, t.affine[D + 4], t.affine[D + 5]);
  const $ = A * q - L * U, F = $ > 1e-12 || $ < -1e-12 ? 1 / $ : 0, H = t.bexp;
  let V = S;
  s.beginPath();
  for (let Y = 0; Y < S; Y++) {
    const ie = b[C + Y], Q = R[C + Y];
    if (Y === 0 ? s.moveTo(ie, Q) : s.lineTo(ie, Q), H[C + Y] === 0) continue;
    const P = Y + 1 === S ? 0 : Y + 1, ne = b[C + P], re = R[C + P], G = A * (ne - ie) + U * (re - Q), Z = L * (ne - ie) + q * (re - Q), le = G < 0 ? -G : G, de = Z < 0 ? -Z : Z, oe = le > de ? le + 0.4 * de : de + 0.4 * le;
    if (oe < 1e-6) continue;
    const ae = cp / oe, fe = Z * ae, ve = -G * ae, j = (q * fe - U * ve) * F, X = (A * ve - L * fe) * F;
    s.lineTo(ie + j, Q + X), s.lineTo(ne + j, re + X), V += 2;
  }
  s.fill(), s.setTransform(1, 0, 0, 1, 0, 0), p[m]++, p[m + up] += V;
}
function EC(t, a, s, f, p) {
  const m = t.slots;
  for (; t.live > 0; ) {
    let v = -1, g = 2147483647;
    for (let S = 0; S < Ri; S++) {
      const E = S * bl;
      m[E + Vu] !== 0 && m[E + jh] < g && (g = m[E + jh], v = S);
    }
    if (v === -1) return;
    Z2(t, v, a, s, f, p);
  }
}
function $N(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U, q, $, F, H, V, Y, ie = 0) {
  const Q = t.slots, P = ++t.seq, ne = R < U ? R < V ? R : V : U < V ? U : V, re = R > U ? R > V ? R : V : U > V ? U : V, G = D < q ? D < Y ? D : Y : q < Y ? q : Y, Z = D > q ? D > Y ? D : Y : q > Y ? q : Y;
  let le = -1, de = -1, oe = -1, ae = 0, fe = 0, ve = -1, j = -1, X = -1;
  if (t.live > 0) {
    const Le = P2(t, L, b), Je = P2(t, H, L), Re = P2(t, b, H);
    for (let Ye = 0; Ye < 3 && le === -1; Ye++) {
      const Pe = Ye === 0 ? Le : Ye === 1 ? Je : Re;
      if (Pe === -1) continue;
      const $e = Pe * bl;
      if (Q[$e + Vu] === 0 || t.meshRef[Pe] !== m) continue;
      const Xe = Pe * 3;
      if (t.normal[Xe] * v + t.normal[Xe + 1] * g + t.normal[Xe + 2] * S < NN) continue;
      const Te = Pe * 6, Se = t.affine[Te], Ke = t.affine[Te + 1], Ot = t.affine[Te + 2], ot = t.affine[Te + 3], wt = t.affine[Te + 4], at = t.affine[Te + 5];
      let mt = Se * E + Ot * C + wt - R, It = Ke * E + ot * C + at - D;
      if (mt * mt + It * It > tp * tp || (mt = Se * _ + Ot * A + wt - U, It = Ke * _ + ot * A + at - q, mt * mt + It * It > tp * tp) || (mt = Se * $ + Ot * F + wt - V, It = Ke * $ + ot * F + at - Y, mt * mt + It * It > tp * tp)) continue;
      const nn = Pe * no, De = Q[$e + ju], He = t.bid;
      let rt = -1, Ze = -1, qt = -1;
      for (let Tt = 0; Tt < De; Tt++) {
        const Qe = Tt + 1 === De ? 0 : Tt + 1, gt = He[nn + Tt], yt = He[nn + Qe];
        gt === L && yt === b ? rt = Tt : gt === H && yt === L ? Ze = Tt : gt === b && yt === H && (qt = Tt);
      }
      const en = (rt !== -1 ? 1 : 0) + (Ze !== -1 ? 1 : 0) + (qt !== -1 ? 1 : 0);
      if (en !== 0) {
        if (en === 1) {
          if (De >= no) continue;
          rt !== -1 ? (de = rt, ae = $, fe = F, ve = H, j = 0) : Ze !== -1 ? (de = Ze, ae = E, fe = C, ve = b, j = 1) : (de = qt, ae = _, fe = A, ve = L, j = 2), le = Pe;
        } else if (en === 2) {
          const Tt = rt !== -1 ? rt : Ze, Qe = qt !== -1 ? qt : Ze !== -1 ? Ze : rt, gt = (Tt + 1) % De === Qe ? Tt : (Qe + 1) % De === Tt ? Qe : -1;
          if (gt === -1) continue;
          de = gt, oe = (gt + 1) % De, X = rt === -1 ? 0 : Ze === -1 ? 1 : 2, le = Pe;
        }
      }
    }
  }
  const xe = t.aabb;
  if (t.live > 0)
    for (let Le = 0; Le < Ri; Le++) {
      if (Le === le || Q[Le * bl + Vu] === 0) continue;
      const Je = Le << 2;
      xe[Je] > re + P0 || xe[Je + 2] < ne - P0 || xe[Je + 1] > Z + P0 || xe[Je + 3] < G - P0 || Z2(t, Le, a, s, f, p);
    }
  if (le !== -1) {
    const Le = le * no, Je = le * bl, Re = Q[Je + ju], Ye = t.bu, Pe = t.bv, $e = t.bid, Xe = t.bexp;
    if (oe === -1) {
      const Te = $e[Le + de], Se = $e[Le + (de + 1) % Re];
      Q0(t, Te, Se);
      for (let Ke = Re; Ke > de + 1; Ke--)
        Ye[Le + Ke] = Ye[Le + Ke - 1], Pe[Le + Ke] = Pe[Le + Ke - 1], $e[Le + Ke] = $e[Le + Ke - 1], Xe[Le + Ke] = Xe[Le + Ke - 1];
      Ye[Le + de + 1] = ae, Pe[Le + de + 1] = fe, $e[Le + de + 1] = ve, Xe[Le + de] = ie >> (j + 1) % 3 & 1, Xe[Le + de + 1] = ie >> (j + 2) % 3 & 1, Q[Je + ju] = Re + 1, G0(t, Te, ve, le), G0(t, ve, Se, le);
    } else {
      const Te = (de + 1) % Re, Se = $e[Le + de], Ke = $e[Le + Te], Ot = $e[Le + (Te + 1) % Re];
      Q0(t, Se, Ke), Q0(t, Ke, Ot);
      for (let ot = Te; ot < Re - 1; ot++)
        Ye[Le + ot] = Ye[Le + ot + 1], Pe[Le + ot] = Pe[Le + ot + 1], $e[Le + ot] = $e[Le + ot + 1], Xe[Le + ot] = Xe[Le + ot + 1];
      Xe[Le + (de < Te ? de : de - 1)] = ie >> X & 1, Q[Je + ju] = Re - 1, G0(t, Se, Ot, le);
    }
    Q[Je + jh] = P;
    const Ct = le << 2;
    ne < xe[Ct] && (xe[Ct] = ne), G < xe[Ct + 1] && (xe[Ct + 1] = G), re > xe[Ct + 2] && (xe[Ct + 2] = re), Z > xe[Ct + 3] && (xe[Ct + 3] = Z);
    return;
  }
  let be = -1;
  for (let Le = 0; Le < Ri; Le++)
    if (Q[Le * bl + Vu] === 0) {
      be = Le;
      break;
    }
  if (be === -1) {
    let Le = 2147483647;
    for (let Je = 0; Je < Ri; Je++) {
      const Re = Q[Je * bl + jh];
      Re < Le && (Le = Re, be = Je);
    }
    Z2(t, be, a, s, f, p);
  }
  const _e = 1 / (E * (A - F) - C * (_ - $) + (_ * F - $ * A)), Ve = be * 6;
  t.affine[Ve] = (R * (A - F) + U * (F - C) + V * (C - A)) * _e, t.affine[Ve + 1] = (D * (A - F) + q * (F - C) + Y * (C - A)) * _e, t.affine[Ve + 2] = (R * ($ - _) + U * (E - $) + V * (_ - E)) * _e, t.affine[Ve + 3] = (D * ($ - _) + q * (E - $) + Y * (_ - E)) * _e, t.affine[Ve + 4] = (R * (_ * F - $ * A) + U * ($ * C - E * F) + V * (E * A - _ * C)) * _e, t.affine[Ve + 5] = (D * (_ * F - $ * A) + q * ($ * C - E * F) + Y * (E * A - _ * C)) * _e;
  const Be = be * 3;
  t.normal[Be] = v, t.normal[Be + 1] = g, t.normal[Be + 2] = S;
  const Fe = be * no;
  t.bu[Fe] = E, t.bv[Fe] = C, t.bid[Fe] = b, t.bu[Fe + 1] = _, t.bv[Fe + 1] = A, t.bid[Fe + 1] = L, t.bu[Fe + 2] = $, t.bv[Fe + 2] = F, t.bid[Fe + 2] = H, t.bexp[Fe] = ie & 1, t.bexp[Fe + 1] = ie >> 1 & 1, t.bexp[Fe + 2] = ie >> 2 & 1;
  const ct = be * bl;
  Q[ct + Vu] = 1, Q[ct + ju] = 3, Q[ct + jh] = P, t.meshRef[be] = m, t.live++;
  const vt = be << 2;
  xe[vt] = ne, xe[vt + 1] = G, xe[vt + 2] = re, xe[vt + 3] = Z, jN(t, be);
}
const np = zN();
function z3(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U, q, $, F, H, V, Y, ie, Q, P, ne, re, G) {
  np.frameId !== ne && (UN(np), np.frameId = ne);
  const Z = A.textureImage;
  if (Z && Z.complete && Z.naturalWidth > 0 && A.uvs) {
    const oe = A.uvs, ae = A.faces[L] * 2, fe = A.faces[L + 1] * 2, ve = A.faces[L + 2] * 2, j = Z.width, X = Z.height, xe = oe[ae] * j, be = oe[ae + 1] * X, ze = oe[fe] * j, _e = oe[fe + 1] * X, Ve = oe[ve] * j, Be = oe[ve + 1] * X, Fe = xe * (_e - Be) - be * (ze - Ve) + (ze * Be - Ve * _e);
    if (Math.abs(Fe) > 1e-5) {
      $N(
        np,
        t,
        Q,
        P,
        js,
        A,
        C[_ * 3],
        C[_ * 3 + 1],
        C[_ * 3 + 2],
        xe,
        be,
        b,
        a,
        s,
        ze,
        _e,
        R,
        f,
        p,
        Ve,
        Be,
        D,
        m,
        v,
        G
      ), re && EC(
        np,
        t,
        Q,
        P,
        js
      );
      return;
    }
  }
  EC(
    np,
    t,
    Q,
    P,
    js
  );
  const le = S[_ * 3], de = (le >>> 16 & 248) << 8 | (le >>> 8 & 252) << 3 | (le & 248) >> 3;
  cT(
    t,
    a,
    s,
    f,
    p,
    m,
    v,
    de,
    0,
    Q,
    P
  );
}
const Ch = k3(), wC = 0.05;
function U3(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U, q, $, F, H, V, Y, ie, Q, P, ne, re, G) {
  let Z = U >>> 16 & 255, le = U >>> 8 & 255, de = U & 255;
  const oe = C[_ * 3], ae = C[_ * 3 + 1], fe = C[_ * 3 + 2], ve = q[0];
  for (let ze = 1; ze <= ve; ze++) {
    const _e = $[q[ze]];
    if (_e.light.type === 0) {
      const Ve = -_e.transform.worldMatrix[8], Be = -_e.transform.worldMatrix[9], Fe = -_e.transform.worldMatrix[10], ct = oe * Ve + ae * Be + fe * Fe;
      if (ct > 0) {
        const vt = _e.light.color;
        Z += (vt >>> 16 & 255) * ct, le += (vt >>> 8 & 255) * ct, de += (vt & 255) * ct;
      }
    }
  }
  Z *= 39215e-7, le *= 39215e-7, de *= 39215e-7, Z > 1 && (Z = 1), le > 1 && (le = 1), de > 1 && (de = 1);
  const j = Z * 255 | 0, X = le * 255 | 0, xe = de * 255 | 0, be = (j & 248) << 8 | (X & 252) << 3 | (xe & 248) >> 3;
  Ch.frameId !== ne && (m1(Ch), Ch.frameId = ne), L3(
    Ch,
    t,
    Q,
    Us,
    pf,
    P,
    vf,
    wC,
    be,
    ie,
    a,
    s,
    b,
    f,
    p,
    R,
    m,
    v,
    D,
    G
  ), re && A3(
    Ch,
    t,
    Q,
    Us,
    pf,
    P,
    vf,
    wC
  );
}
const Cl = 32, ro = 16, aa = 4, CC = 1e-3, HN = 1e-3, VN = 1e-12, $0 = 2 * cp, Ah = 2048, S1 = Ah - 1, Tl = 4, Iu = 0, Fu = 1, Fh = 2, n1 = 8, J2 = 0, e3 = 1, t3 = 2, r1 = 3, n3 = 4, a1 = 5, r3 = 6, i1 = 7;
function bC(t, a, s) {
  const f = t < 0 ? 0 : t > 255 ? 255 : t | 0, p = a < 0 ? 0 : a > 255 ? 255 : a | 0, m = s < 0 ? 0 : s > 255 ? 255 : s | 0;
  return (f & 248) << 8 | (p & 252) << 3 | (m & 248) >> 3;
}
function IN() {
  return {
    slots: new Int32Array(Cl * Tl),
    // The shading field per chart, fitted from the face that seeded it (see the FD_* lanes).
    field: new Float32Array(Cl * n1),
    // Screen bounds per chart, [x0, y0, x1, y1] - the overlap guard's only input.
    aabb: new Float32Array(Cl * 4),
    // Boundary rings as flat arrays rather than linked nodes: short enough that an insert is a
    // handful of element moves, and an array cannot be corrupted by pointer surgery.
    bx: new Float32Array(Cl * ro),
    by: new Float32Array(Cl * ro),
    bid: new Int32Array(Cl * ro),
    // 1 where the boundary edge LEAVING vertex i must be pushed outward at flush, i.e. the face
    // across it is drawn later. See computeExpandMasks in shared/shaders.js.
    bexp: new Uint8Array(Cl * ro),
    // Directed-edge table: (from -> to) -> slot, cleared in O(1) by bumping the generation.
    eFrom: new Int32Array(Ah),
    eTo: new Int32Array(Ah),
    eSlot: new Int32Array(Ah),
    eStamp: new Int32Array(Ah),
    gen: 1,
    seq: 0,
    live: 0,
    frameId: -1
  };
}
function qN(t) {
  const a = t.slots;
  for (let s = 0; s < Cl; s++) a[s * Tl + Iu] = 0;
  t.gen++, t.seq = 0, t.live = 0;
}
function j3(t, a) {
  let s = Math.imul(t, 2654435761) ^ Math.imul(a, 2246822519);
  return s ^= s >>> 15, s = Math.imul(s, 625341585), s ^= s >>> 13, s & S1;
}
function $2(t, a, s) {
  const f = t.gen;
  let p = j3(a, s);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return -1;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === s)
      return t.eSlot[p];
    p = p + 1 & S1;
  }
  return -1;
}
function X0(t, a, s, f) {
  const p = t.gen;
  let m = j3(a, s);
  for (let v = 0; v < 32; v++) {
    if (t.eStamp[m] !== p) {
      t.eStamp[m] = p, t.eFrom[m] = a, t.eTo[m] = s, t.eSlot[m] = f;
      return;
    }
    if (t.eFrom[m] === a && t.eTo[m] === s) return;
    m = m + 1 & S1;
  }
}
function K0(t, a, s) {
  const f = t.gen;
  let p = j3(a, s);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === s) {
      t.eStamp[p] = -1;
      return;
    }
    p = p + 1 & S1;
  }
}
function YN(t, a) {
  const s = a * ro, f = t.slots[a * Tl + Fu];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    X0(t, t.bid[s + p], t.bid[s + m], a);
  }
}
function WN(t, a) {
  const s = a * ro, f = t.slots[a * Tl + Fu];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    K0(t, t.bid[s + p], t.bid[s + m]);
  }
}
function a3(t, a, s, f, p) {
  const m = t.slots, v = a * Tl;
  if (m[v + Iu] === 0) return;
  const g = m[v + Fu];
  if (WN(t, a), m[v + Iu] = 0, t.live--, g < 3) return;
  const S = a * ro, E = t.bx, C = t.by, b = t.bexp, R = a * n1, D = t.field[R + J2], _ = t.field[R + e3];
  let A = 1 / 0, L = -1 / 0;
  for (let Y = 0; Y < g; Y++) {
    const ie = E[S + Y] * D + C[S + Y] * _;
    ie < A && (A = ie), ie > L && (L = ie);
  }
  const U = t.field[R + t3], q = t.field[R + n3], $ = t.field[R + r3], F = bC(
    t.field[R + r1] + U * A,
    t.field[R + a1] + q * A,
    t.field[R + i1] + $ * A
  ), H = bC(
    t.field[R + r1] + U * L,
    t.field[R + a1] + q * L,
    t.field[R + i1] + $ * L
  );
  if (F === H || L - A < HN)
    f[Us] !== F && (s.fillStyle = ao[F], f[Us] = F, F !== qu && (f[pf] = 1));
  else {
    const Y = s.createLinearGradient(
      D * A,
      _ * A,
      D * L,
      _ * L
    );
    Y.addColorStop(0, ao[F]), Y.addColorStop(1, ao[H]), s.fillStyle = Y, f[Us] = -1, f[pf] = 1;
  }
  let V = g;
  s.beginPath();
  for (let Y = 0; Y < g; Y++) {
    const ie = E[S + Y], Q = C[S + Y];
    if (Y === 0 ? s.moveTo(ie, Q) : s.lineTo(ie, Q), b[S + Y] === 0) continue;
    const P = Y + 1 === g ? 0 : Y + 1, ne = E[S + P], re = C[S + P], G = ne - ie, Z = re - Q, le = G < 0 ? -G : G, de = Z < 0 ? -Z : Z, oe = le > de ? le + 0.4 * de : de + 0.4 * le;
    if (oe < 1e-6) continue;
    const ae = cp / oe, fe = Z * ae, ve = -G * ae;
    s.lineTo(ie + fe, Q + ve), s.lineTo(ne + fe, re + ve), V += 2;
  }
  s.fill(), p[vf]++, p[G2] += V;
}
function BN(t, a, s, f) {
  const p = t.slots;
  for (; t.live > 0; ) {
    let m = -1, v = 2147483647;
    for (let g = 0; g < Cl; g++) {
      const S = g * Tl;
      p[S + Iu] !== 0 && p[S + Fh] < v && (v = p[S + Fh], m = g);
    }
    if (m === -1) return;
    a3(t, m, a, s, f);
  }
}
function GN(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U, q, $, F, H, V = 0) {
  const Y = t.slots, ie = ++t.seq, Q = g < D ? g < $ ? g : $ : D < $ ? D : $, P = g > D ? g > $ ? g : $ : D > $ ? D : $, ne = S < _ ? S < F ? S : F : _ < F ? _ : F, re = S > _ ? S > F ? S : F : _ > F ? _ : F;
  let G = -1, Z = -1, le = -1, de = 0, oe = 0, ae = -1, fe = -1, ve = -1;
  if (t.live > 0) {
    const Se = $2(t, A, E), Ke = $2(t, H, A), Ot = $2(t, E, H);
    for (let ot = 0; ot < 3 && G === -1; ot++) {
      const wt = ot === 0 ? Se : ot === 1 ? Ke : Ot;
      if (wt === -1) continue;
      const at = wt * Tl;
      if (Y[at + Iu] === 0) continue;
      const mt = wt * n1, It = t.field[mt + J2], nn = t.field[mt + e3], De = t.field[mt + t3], He = t.field[mt + r1], rt = t.field[mt + n3], Ze = t.field[mt + a1], qt = t.field[mt + r3], en = t.field[mt + i1];
      let Tt = g * It + S * nn, Qe = He + De * Tt - p;
      if (Qe > aa || Qe < -aa || (Qe = Ze + rt * Tt - m, Qe > aa || Qe < -aa) || (Qe = en + qt * Tt - v, Qe > aa || Qe < -aa) || (Tt = D * It + _ * nn, Qe = He + De * Tt - C, Qe > aa || Qe < -aa) || (Qe = Ze + rt * Tt - b, Qe > aa || Qe < -aa) || (Qe = en + qt * Tt - R, Qe > aa || Qe < -aa) || (Tt = $ * It + F * nn, Qe = He + De * Tt - L, Qe > aa || Qe < -aa) || (Qe = Ze + rt * Tt - U, Qe > aa || Qe < -aa) || (Qe = en + qt * Tt - q, Qe > aa || Qe < -aa)) continue;
      const gt = wt * ro, yt = Y[at + Fu], At = t.bid;
      let $t = -1, Ge = -1, fn = -1;
      for (let Fn = 0; Fn < yt; Fn++) {
        const mr = Fn + 1 === yt ? 0 : Fn + 1, lr = At[gt + Fn], Zn = At[gt + mr];
        lr === A && Zn === E ? $t = Fn : lr === H && Zn === A ? Ge = Fn : lr === E && Zn === H && (fn = Fn);
      }
      const On = ($t !== -1 ? 1 : 0) + (Ge !== -1 ? 1 : 0) + (fn !== -1 ? 1 : 0);
      if (On !== 0) {
        if (On === 1) {
          if (yt >= ro) continue;
          $t !== -1 ? (Z = $t, de = $, oe = F, ae = H, fe = 0) : Ge !== -1 ? (Z = Ge, de = g, oe = S, ae = E, fe = 1) : (Z = fn, de = D, oe = _, ae = A, fe = 2), G = wt;
        } else if (On === 2) {
          const Fn = $t !== -1 ? $t : Ge, mr = fn !== -1 ? fn : Ge !== -1 ? Ge : $t, lr = (Fn + 1) % yt === mr ? Fn : (mr + 1) % yt === Fn ? mr : -1;
          if (lr === -1) continue;
          Z = lr, le = (lr + 1) % yt, ve = $t === -1 ? 0 : Ge === -1 ? 1 : 2, G = wt;
        }
      }
    }
  }
  const j = t.aabb;
  if (t.live > 0)
    for (let Se = 0; Se < Cl; Se++) {
      if (Se === G || Y[Se * Tl + Iu] === 0) continue;
      const Ke = Se << 2;
      j[Ke] > P + $0 || j[Ke + 2] < Q - $0 || j[Ke + 1] > re + $0 || j[Ke + 3] < ne - $0 || a3(t, Se, a, s, f);
    }
  if (G !== -1) {
    const Se = G * ro, Ke = G * Tl, Ot = Y[Ke + Fu], ot = t.bx, wt = t.by, at = t.bid, mt = t.bexp;
    if (le === -1) {
      const nn = at[Se + Z], De = at[Se + (Z + 1) % Ot];
      K0(t, nn, De);
      for (let He = Ot; He > Z + 1; He--)
        ot[Se + He] = ot[Se + He - 1], wt[Se + He] = wt[Se + He - 1], at[Se + He] = at[Se + He - 1], mt[Se + He] = mt[Se + He - 1];
      ot[Se + Z + 1] = de, wt[Se + Z + 1] = oe, at[Se + Z + 1] = ae, mt[Se + Z] = V >> (fe + 1) % 3 & 1, mt[Se + Z + 1] = V >> (fe + 2) % 3 & 1, Y[Ke + Fu] = Ot + 1, X0(t, nn, ae, G), X0(t, ae, De, G);
    } else {
      const nn = (Z + 1) % Ot, De = at[Se + Z], He = at[Se + nn], rt = at[Se + (nn + 1) % Ot];
      K0(t, De, He), K0(t, He, rt);
      for (let Ze = nn; Ze < Ot - 1; Ze++)
        ot[Se + Ze] = ot[Se + Ze + 1], wt[Se + Ze] = wt[Se + Ze + 1], at[Se + Ze] = at[Se + Ze + 1], mt[Se + Ze] = mt[Se + Ze + 1];
      mt[Se + (Z < nn ? Z : Z - 1)] = V >> ve & 1, Y[Ke + Fu] = Ot - 1, X0(t, De, rt, G);
    }
    Y[Ke + Fh] = ie;
    const It = G << 2;
    Q < j[It] && (j[It] = Q), ne < j[It + 1] && (j[It + 1] = ne), P > j[It + 2] && (j[It + 2] = P), re > j[It + 3] && (j[It + 3] = re);
    return;
  }
  let X = -1;
  for (let Se = 0; Se < Cl; Se++)
    if (Y[Se * Tl + Iu] === 0) {
      X = Se;
      break;
    }
  if (X === -1) {
    let Se = 2147483647;
    for (let Ke = 0; Ke < Cl; Ke++) {
      const Ot = Y[Ke * Tl + Fh];
      Ot < Se && (Se = Ot, X = Ke);
    }
    a3(t, X, a, s, f);
  }
  const xe = D - g, be = _ - S, ze = $ - g, _e = F - S, Ve = xe * _e - ze * be, Be = (p + C + L) * 0.33333334, Fe = (m + b + U) * 0.33333334, ct = (v + R + q) * 0.33333334;
  let vt = 1, Le = 0, Je = 0, Re = 0, Ye = 0;
  if (Ve > CC || Ve < -CC) {
    const Se = 1 / Ve, Ke = C - p, Ot = L - p, ot = b - m, wt = U - m, at = R - v, mt = q - v, It = (Ke * _e - Ot * be) * Se, nn = (xe * Ot - ze * Ke) * Se, De = (ot * _e - wt * be) * Se, He = (xe * wt - ze * ot) * Se, rt = (at * _e - mt * be) * Se, Ze = (xe * mt - ze * at) * Se, qt = It * It + nn * nn, en = De * De + He * He, Tt = rt * rt + Ze * Ze;
    let Qe, gt, yt;
    if (qt >= en && qt >= Tt ? (Qe = It, gt = nn, yt = qt) : en >= Tt ? (Qe = De, gt = He, yt = en) : (Qe = rt, gt = Ze, yt = Tt), yt > VN) {
      const At = 1 / Math.sqrt(yt);
      vt = Qe * At, Le = gt * At, Je = It * vt + nn * Le, Re = De * vt + He * Le, Ye = rt * vt + Ze * Le;
    }
  }
  const Pe = ((g + D + $) * vt + (S + _ + F) * Le) * 0.33333334, $e = X * n1;
  t.field[$e + J2] = vt, t.field[$e + e3] = Le, t.field[$e + t3] = Je, t.field[$e + r1] = Be - Je * Pe, t.field[$e + n3] = Re, t.field[$e + a1] = Fe - Re * Pe, t.field[$e + r3] = Ye, t.field[$e + i1] = ct - Ye * Pe;
  const Xe = X * ro;
  t.bx[Xe] = g, t.by[Xe] = S, t.bid[Xe] = E, t.bx[Xe + 1] = D, t.by[Xe + 1] = _, t.bid[Xe + 1] = A, t.bx[Xe + 2] = $, t.by[Xe + 2] = F, t.bid[Xe + 2] = H, t.bexp[Xe] = V & 1, t.bexp[Xe + 1] = V >> 1 & 1, t.bexp[Xe + 2] = V >> 2 & 1;
  const Ct = X * Tl;
  Y[Ct + Iu] = 1, Y[Ct + Fu] = 3, Y[Ct + Fh] = ie, t.live++;
  const Te = X << 2;
  j[Te] = Q, j[Te + 1] = ne, j[Te + 2] = P, j[Te + 3] = re, YN(t, X);
}
const bh = IN();
function lp(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U, q, $, F, H, V, Y, ie, Q, P, ne, re, G) {
  const Z = U >>> 16 & 255, le = U >>> 8 & 255, de = U & 255;
  let oe = Z, ae = le, fe = de, ve = Z, j = le, X = de, xe = Z, be = le, ze = de;
  const _e = E[b], Ve = E[b + 1], Be = E[b + 2], Fe = E[R], ct = E[R + 1], vt = E[R + 2], Le = E[D], Je = E[D + 1], Re = E[D + 2], Ye = q[0];
  for (let Pe = 1; Pe <= Ye; Pe++) {
    const $e = $[q[Pe]];
    if ($e.light.type !== 0) continue;
    const Xe = $e.light.color, Ct = Xe >>> 16 & 255, Te = Xe >>> 8 & 255, Se = Xe & 255, Ke = -$e.transform.worldMatrix[8], Ot = -$e.transform.worldMatrix[9], ot = -$e.transform.worldMatrix[10], wt = _e * Ke + Ve * Ot + Be * ot, at = Fe * Ke + ct * Ot + vt * ot, mt = Le * Ke + Je * Ot + Re * ot;
    wt > 0 && (oe += Ct * wt, ae += Te * wt, fe += Se * wt), at > 0 && (ve += Ct * at, j += Te * at, X += Se * at), mt > 0 && (xe += Ct * mt, be += Te * mt, ze += Se * mt);
  }
  oe > 255 && (oe = 255), ae > 255 && (ae = 255), fe > 255 && (fe = 255), ve > 255 && (ve = 255), j > 255 && (j = 255), X > 255 && (X = 255), xe > 255 && (xe = 255), be > 255 && (be = 255), ze > 255 && (ze = 255), bh.frameId !== ne && (qN(bh), bh.frameId = ne), GN(
    bh,
    t,
    Q,
    P,
    oe,
    ae,
    fe,
    a,
    s,
    b,
    ve,
    j,
    X,
    f,
    p,
    R,
    xe,
    be,
    ze,
    m,
    v,
    D,
    G
  ), re && BN(bh, t, Q, P);
}
const fp = [], dp = [];
let QN = 6;
const pp = 0, vp = 1, Ih = 2, hp = 4;
fp[pp] = Yu;
dp[pp] = U3;
fp[vp] = z3;
dp[vp] = lp;
fp[Ih] = Yu;
dp[Ih] = _3;
fp[hp] = Yu;
dp[hp] = lp;
function XN(t, a) {
  const s = QN++;
  return fp[s] = t, a && (dp[s] = a), s;
}
const Th = k3();
let Rh = new Float32Array(0), H2 = new Uint8Array(0);
const Io = new Int32Array(4), V2 = 0, Z0 = 1, i3 = 2, Ya = new Float32Array(4), TC = 0.05, l3 = 9, $h = 1, RC = $h + up, o3 = 4, s3 = 5, MC = 0;
function KN(t, a, s, f, p) {
  let m = 0;
  if (s === 2 || s === 1) {
    const v = a[t * 9], g = a[t * 9 + 1], S = a[t * 9 + 2], E = a[t * 9 + 3], C = a[t * 9 + 4], b = a[t * 9 + 5], R = a[t * 9 + 6], D = a[t * 9 + 7], _ = a[t * 9 + 8], A = (v + E + R) * 0.33333, L = (g + C + D) * 0.33333, U = (S + b + _) * 0.33333;
    if (s === 2) {
      const q = f * f, F = 1 / (p * p - q);
      m = (A * A + L * L + U * U - q) * F;
    } else
      m = (Math.sqrt(A * A + L * L + U * U) - f) / (p - f);
  } else if (s === 3) {
    const v = a[t * 9 + 2], g = a[t * 9 + 5], S = a[t * 9 + 8];
    m = ((v + g + S) * 0.33333 - f) / (p - f);
  }
  return m < 0 ? m = 0 : m > 1 && (m = 1), m;
}
function ZN(t, a, s, f, p, m, v, g, S, E, C, b, R) {
  Io[V2] = 0, Io[Z0] = 0, Io[i3] = 0, Ya[0] = 1 / 0, Ya[1] = 1 / 0, Ya[2] = -1 / 0, Ya[3] = -1 / 0;
  let D = 0, _ = 0;
  for (let $ = 0; $ < g; $++) {
    const F = t[$], H = a[F];
    if (H !== pp && H !== vp && H !== hp) {
      v[F] = 1;
      continue;
    }
    const V = KN(
      F,
      s,
      C,
      b,
      R
    );
    if (m[F] = V, v[F] = 0, D++, V > 0 && (Io[Z0] = 1), V >= 1) {
      _++;
      continue;
    }
    const Y = p[F * 3], ie = p[F * 3 + 1], Q = p[F * 3 + 2], P = f[Y] * S + S, ne = f[Y + 1] * E + E, re = f[ie] * S + S, G = f[ie + 1] * E + E, Z = f[Q] * S + S, le = f[Q + 1] * E + E;
    let de = P < re ? P : re;
    Z < de && (de = Z);
    let oe = P > re ? P : re;
    Z > oe && (oe = Z);
    let ae = ne < G ? ne : G;
    le < ae && (ae = le);
    let fe = ne > G ? ne : G;
    le > fe && (fe = le), de < Ya[0] && (Ya[0] = de), ae < Ya[1] && (Ya[1] = ae), oe > Ya[2] && (Ya[2] = oe), fe > Ya[3] && (Ya[3] = fe);
  }
  if (Io[V2] = D, Io[Z0] === 0 || D === 0) return;
  if (_ === D) {
    Io[i3] = 1;
    return;
  }
  if (_ === 0) return;
  const A = Ya[0], L = Ya[1], U = Ya[2], q = Ya[3];
  for (let $ = 0; $ < g; $++) {
    const F = t[$];
    if (v[F] === 1 || m[F] < 1) continue;
    const H = p[F * 3], V = p[F * 3 + 1], Y = p[F * 3 + 2], ie = f[H] * S + S, Q = f[H + 1] * E + E, P = f[V] * S + S, ne = f[V + 1] * E + E, re = f[Y] * S + S, G = f[Y + 1] * E + E;
    let Z = ie < P ? ie : P;
    if (re < Z && (Z = re), Z > U) {
      v[F] = 1, D--;
      continue;
    }
    let le = ie > P ? ie : P;
    if (re > le && (le = re), le < A) {
      v[F] = 1, D--;
      continue;
    }
    let de = Q < ne ? Q : ne;
    if (G < de && (de = G), de > q) {
      v[F] = 1, D--;
      continue;
    }
    let oe = Q > ne ? Q : ne;
    G > oe && (oe = G), oe < L && (v[F] = 1, D--);
  }
  Io[V2] = D;
}
function JN(t, a, s, f, p, m, v, g, S, E, C) {
  if (S === 0) return 0;
  const b = C - E > 1e-4 ? 65535 / (C - E) : 0;
  g.fill(0, 0, 32);
  let R = 0;
  for (let _ = 0; _ < S; _++) {
    const A = t[_];
    if (v[A] === 1) continue;
    const L = (255 * (1 - m[A]) & 248) >> 3;
    g[L]++, R++;
  }
  let D = 0;
  for (let _ = 0; _ < 32; _++) {
    const A = g[_];
    g[_] = D, D += A;
  }
  for (let _ = 0; _ < S; _++) {
    const A = t[_];
    if (v[A] === 1) continue;
    const L = (255 * (1 - m[A]) & 248) >> 3;
    s[g[L]++] = A;
  }
  g.fill(0, 0, 256);
  for (let _ = 0; _ < R; _++)
    g[f[s[_]] & 255]++;
  D = 0;
  for (let _ = 0; _ < 256; _++) {
    const A = g[_];
    g[_] = D, D += A;
  }
  for (let _ = 0; _ < R; _++) {
    const A = s[_];
    a[g[f[A] & 255]++] = A;
  }
  g.fill(0, 0, 256);
  for (let _ = 0; _ < R; _++) {
    const A = a[_];
    let U = (p[A] - E) * b;
    U < 0 ? U = 0 : U > 65535 && (U = 65535), g[65535 - (U | 0) & 255]++;
  }
  D = 0;
  for (let _ = 0; _ < 256; _++) {
    const A = g[_];
    g[_] = D, D += A;
  }
  for (let _ = 0; _ < R; _++) {
    const A = a[_];
    let U = (p[A] - E) * b;
    U < 0 ? U = 0 : U > 65535 && (U = 65535), s[g[65535 - (U | 0) & 255]++] = A;
  }
  g.fill(0, 0, 256);
  for (let _ = 0; _ < R; _++) {
    const A = s[_];
    let U = (p[A] - E) * b;
    U < 0 ? U = 0 : U > 65535 && (U = 65535), g[65535 - (U | 0) >> 8 & 255]++;
  }
  D = 0;
  for (let _ = 0; _ < 256; _++) {
    const A = g[_];
    g[_] = D, D += A;
  }
  for (let _ = 0; _ < R; _++) {
    const A = s[_];
    let U = (p[A] - E) * b;
    U < 0 ? U = 0 : U > 65535 && (U = 65535), a[g[65535 - (U | 0) >> 8 & 255]++] = A;
  }
  return R;
}
function ez(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U) {
  const q = 255 * (1 - C) & 248, $ = (q & 248) << 8 | (q & 252) << 3 | (q & 248) >> 3;
  return Th.frameId !== A && (m1(Th), Th.frameId = A), (R || $ !== MC) && ($ !== MC && (R = !0), L3(
    Th,
    t,
    D,
    l3,
    -1,
    _,
    $h,
    TC,
    $,
    b,
    a,
    s,
    g,
    f,
    p,
    S,
    m,
    v,
    E,
    U
  )), L && A3(
    Th,
    t,
    D,
    l3,
    -1,
    _,
    $h,
    TC
  ), R;
}
function tz(t, a, s, f) {
  const p = t.canvas, m = a.canvas, v = s.canvas, g = p.width, S = p.height, E = m.width, C = m.height;
  t.globalCompositeOperation = "multiply", t.drawImage(m, 0, 0, g, S);
  const b = f >>> 16, R = f >>> 8 & 255, D = f & 255, _ = (b & 248) << 8 | (R & 252) << 3 | (D & 248) >> 3;
  a.globalCompositeOperation = "screen", a.fillStyle = ao[_ ^ qu], a.fillRect(0, 0, E, C), a.globalCompositeOperation = "source-over", s.drawImage(m, 0, 0, E, C), s.globalCompositeOperation = "difference", s.fillStyle = "#ffffff", s.fillRect(0, 0, E, C), s.globalCompositeOperation = "source-over", t.globalCompositeOperation = "lighter", t.drawImage(v, 0, 0, g, S), t.globalCompositeOperation = "source-over";
}
function nz(t, a, s, f, p, m, v, g, S, E, C, b, R, D) {
  const _ = t.canvas, A = _.width, L = _.height, U = A * 0.5, q = L * 0.5;
  t.fillStyle = "#000000", t.fillRect(0, 0, A, L), D3(
    p,
    0,
    E,
    g,
    S,
    v
  );
  let $ = !1;
  for (let F = 0; F < E; F++) {
    const H = p[F], V = s[H * 3], Y = s[H * 3 + 1], ie = s[H * 3 + 2], Q = f[H * 3], P = f[H * 3 + 1], ne = f[H * 3 + 2], re = a[V] * U + U, G = a[V + 1] * q + q, Z = a[Y] * U + U, le = a[Y + 1] * q + q, de = a[ie] * U + U, oe = a[ie + 1] * q + q, ae = F === E - 1;
    $ = ez(
      t,
      re,
      G,
      Z,
      le,
      de,
      oe,
      Q,
      P,
      ne,
      C[H],
      m[H],
      $,
      b,
      R,
      D,
      ae,
      v[H]
    );
  }
}
function rz(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U, q, $, F, H, V, Y, ie, Q, P) {
  const ne = a.canvas;
  if (Rh.length < U && (Rh = new Float32Array(U), H2 = new Uint8Array(U)), ZN(
    v,
    E,
    R,
    f,
    p,
    Rh,
    H2,
    U,
    ne.width * 0.5,
    ne.height * 0.5,
    F,
    H,
    V
  ), Io[Z0] === 0) return;
  if (Io[i3] === 1) {
    const le = Y >>> 16, de = Y >>> 8 & 255, oe = Y & 255, ae = (le & 248) << 8 | (de & 252) << 3 | (oe & 248) >> 3;
    t.fillStyle = ao[ae], t.fillRect(0, 0, t.canvas.width, t.canvas.height), ie[zs] = -1;
    return;
  }
  const re = performance.now(), G = JN(
    v,
    g,
    S,
    C,
    b,
    Rh,
    H2,
    L,
    U,
    q,
    $
  );
  Q[o3] = performance.now() - re;
  const Z = performance.now();
  nz(
    a,
    f,
    p,
    m,
    g,
    C,
    D,
    _,
    A,
    G,
    Rh,
    ie,
    Q,
    P
  ), Q[s3] = performance.now() - Z, tz(t, a, s, Y);
}
const az = sr.computeNormalMatrix, I2 = r5, _C = c1, iz = RN, lz = MN;
function oz(t, a, s, f, p) {
  if (f === 1)
    return t;
  const m = t[0] + 1;
  s.fill(0);
  for (let g = 1; g < m; g++) {
    const S = t[g], E = a[S];
    E.meshRenderer && s[E.meshRenderer.layer]++;
  }
  let v = 0;
  for (let g = 0; g < f; g++) {
    const S = s[g];
    s[g] = v, p[v] = 0, v += 1 + S;
  }
  for (let g = 1; g < m; g++) {
    const S = t[g], E = a[S];
    if (E.meshRenderer) {
      const C = E.meshRenderer.layer, b = s[C], R = p[b];
      p[b + 1 + R] = S, p[b] = R + 1;
    }
  }
  return p;
}
function vT() {
  this.layerBuffers = new Uint32Array(0), this.layerBuffersOffsets = new Uint32Array(l1.layersCount), this.drawCalls = 0, this.faces = 0, this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.colorBuffer = new Uint32Array(0), this.shaderTypeBuffer = new Uint8Array(0), this.shaderPassBuffer = new Uint8Array(0), this.faceNormalsBuffer = new Float32Array(0), this.vertexNormalsBuffer = new Float32Array(0), this.meshIndexBuffer = new Uint32Array(0), this.meshFaceIndexBuffer = new Uint32Array(0), this.weldIdBuffer = new Uint32Array(0), this.expandMaskBuffer = new Uint8Array(0), this.neighbourFaceBuffer = new Int32Array(0), this.faceRankBuffer = new Int32Array(0), this.triToFace = new Int32Array(0), this.triToFaceStamp = new Int32Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.lightsIndexBuffer = new Uint32Array(10), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0), this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0), this.tempIndexBuffer = new Uint32Array(0), this.fogSortScratchBuffer = new Uint32Array(0), this.counters = new Uint32Array(256), this.ctxStateBuffer = new Int32Array(10), this.statsBuffer = new Float32Array(9);
}
var Xi = vT.prototype;
Xi.vec3Cache1 = new Float32Array([0, 0, 0]);
Xi.vec3Cache2 = new Float32Array([0, 0, 0]);
Xi.vec4Cache = new Float32Array([0, 0, 0]);
Xi.mat4Scratchpad1 = new Float32Array(16);
Xi.mat4Scratchpad2 = new Float32Array(16);
Xi.mat3Scratchpad1 = new Float32Array(9);
Xi.wireframe = !1;
Xi.debugNormals = !1;
Xi.debugAxis = !1;
Xi.fillEnabled = !0;
Xi.shadeEnabled = !0;
Xi.fogEnabled = !0;
Xi.render = function(t, a, s) {
  let f = performance.now();
  const p = performance.now();
  let m = t.scene.retrieve();
  const v = performance.now() - p;
  let g = l1.layersCount, S = a.width, E = a.height, C, b = this.vec3Cache1, R = this.vec3Cache2, D = this.vec4Cache, _ = this.depthBuffer, A = this.indexBuffer, L = this.vertexIndexBuffer, U = this.vertexBuffer, q = this.clipGeometryBuffer, $ = this.colorBuffer, F = this.shaderTypeBuffer, H = this.shaderPassBuffer, V = this.faceNormalsBuffer, Y = this.vertexNormalsBuffer, ie = this.meshIndexBuffer, Q = this.meshFaceIndexBuffer, P = this.weldIdBuffer, ne = this.expandMaskBuffer, re = this.neighbourFaceBuffer, G = this.faceRankBuffer, Z = this.visibleObjectsBuffer, le = this.lightsIndexBuffer, de = this.layerBuffersOffsets, oe = this.mat4Scratchpad1, ae = this.mat4Scratchpad2, fe = a.getWorldToScreen(), ve = t.transform.getWorldToLocal(), j = t.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let X = this.tempIndexBuffer, xe = this.fogSortScratchBuffer, be = this.counters, ze = this.ctxStateBuffer, _e = this.statsBuffer;
  const Ve = ++cz;
  let Be = 0, Fe = 0, ct = 0, vt = 0, Le = 0, Je = 0, Re = 0, Ye = 0, Pe = 0, $e = 0, Xe = 0, Ct = 0;
  const Te = t.camera, Se = Te.flush || this.wireframe || !this.fillEnabled || !this.shadeEnabled || !this.fogEnabled;
  if (Z.length < m.length) {
    const rt = Z;
    this.visibleObjectsBuffer = Z = new Uint32Array(
      m.length
    ), Z.set(rt);
  }
  if (le.length < m.length) {
    const rt = le;
    this.lightsIndexBuffer = le = new Uint32Array(
      m.length
    ), le.set(rt);
  }
  const Ke = performance.now();
  sz(
    m,
    j,
    Z,
    le
  ), uz(Z, m, j);
  const Ot = performance.now() - Ke, ot = Z[0] + 1, wt = Z[0];
  g > 1 && this.layerBuffers.length < wt + g && (this.layerBuffers = new Uint32Array((wt + g) * 2));
  const at = performance.now();
  let mt = oz(
    Z,
    m,
    de,
    g,
    this.layerBuffers
  );
  const It = performance.now() - at;
  let nn = 0, De = 0, He = 0;
  for (C = 0; C < g; C++) {
    const rt = mt[He];
    if (rt === 0) {
      He += 1;
      continue;
    }
    const Ze = a.layers[C], qt = a.shadeLayers[C], en = a.fogLayers[C], Tt = a.fogCompositeLayers[C];
    let Qe = 0, gt = 0;
    for (let Ge = 0; Ge < rt; Ge++) {
      const fn = m[mt[He + 1 + Ge]].meshRenderer;
      Qe += fn.faces.length;
      const On = fn.vertices.length;
      On > gt && (gt = On);
    }
    Qe = Qe / 3 | 0;
    const yt = gt / 3 | 0;
    if (this.vMapping.length < yt && (this.vMapping = new Int32Array(yt), this.vTags = new Uint32Array(yt)), b.length < gt && (this.vec3Cache1 = b = new Float32Array(gt), this.vec3Cache2 = R = new Float32Array(gt), this.vec4Cache = D = new Float32Array(gt * 4 / 3)), _.length < Qe) {
      let Ge = new Float32Array(Qe);
      Ge.set(_), this.depthBuffer = _ = Ge, Ge = new Uint32Array(Qe), Ge.set(A), this.indexBuffer = A = Ge, Ge = new Uint32Array(Qe), Ge.set(X), this.tempIndexBuffer = X = Ge, Ge = new Uint32Array(Qe), Ge.set(xe), this.fogSortScratchBuffer = xe = Ge, Ge = new Uint32Array(Qe * 3), Ge.set($), this.colorBuffer = $ = Ge, Ge = new Uint8Array(Qe), Ge.set(F), this.shaderTypeBuffer = F = Ge, Ge = new Uint8Array(Qe), Ge.set(H), this.shaderPassBuffer = H = Ge, Ge = new Float32Array(Qe * 9), Ge.set(q), this.clipGeometryBuffer = q = Ge, Ge = new Float32Array(Qe * 3), Ge.set(V), this.faceNormalsBuffer = V = Ge, Ge = new Float32Array(Qe * 9), Ge.set(Y), this.vertexNormalsBuffer = Y = Ge, Ge = new Uint32Array(Qe), Ge.set(ie), this.meshIndexBuffer = ie = Ge, Ge = new Uint32Array(Qe), Ge.set(Q), this.meshFaceIndexBuffer = Q = Ge;
      let fn = new Float32Array(Qe * 6);
      fn.set(U), this.vertexBuffer = U = fn;
      let On = new Uint32Array(Qe * 3);
      On.set(L), this.vertexIndexBuffer = L = On;
      let Fn = new Uint32Array(Qe * 3);
      Fn.set(P), this.weldIdBuffer = P = Fn;
      const mr = new Uint8Array(Qe);
      mr.set(ne), this.expandMaskBuffer = ne = mr;
      const lr = new Int32Array(Qe * 3);
      lr.set(re), this.neighbourFaceBuffer = re = lr;
      const Zn = new Int32Array(Qe).fill(-1);
      Zn.set(G), this.faceRankBuffer = G = Zn, this.triToFace = new Int32Array(Qe), this.triToFaceStamp = new Int32Array(Qe);
    }
    const At = performance.now(), $t = fz(
      mt,
      He + 1,
      m,
      rt,
      R,
      D,
      A,
      _,
      $,
      F,
      H,
      q,
      ve,
      j,
      ae,
      oe,
      this.mat3Scratchpad1,
      V,
      Y,
      U,
      L,
      P,
      ie,
      Q,
      re,
      this.triToFace,
      this.triToFaceStamp,
      this.vMapping,
      this.vTags
    );
    if (De += performance.now() - At, Te.depthSorting) {
      const Ge = performance.now();
      _N(
        A,
        X,
        _,
        ie,
        H,
        be,
        $t,
        Te.nearClippingPane,
        Te.farClippingPane
      ), nn += performance.now() - Ge;
    }
    if (ze[zs] = -1, ze[Us] = -1, ze[l3] = -1, ze[pf] = 0, _e[js] = 0, _e[$h] = 0, _e[vf] = 0, _e[gC] = 0, _e[RC] = 0, _e[G2] = 0, _e[o3] = 0, _e[s3] = 0, this.wireframe)
      dz(
        Ze,
        U,
        L,
        A,
        $t,
        0,
        S,
        E,
        ze
      );
    else {
      if (this.fillEnabled) {
        const Ge = performance.now();
        pz(
          Ze,
          U,
          L,
          P,
          A,
          $,
          F,
          $t,
          0,
          Se,
          q,
          Te.bgColor,
          Te.fogType,
          Te.fogColor,
          Te.fogNearPane,
          Te.fogFarPane,
          Te.ambientLight,
          V,
          Y,
          ie,
          Q,
          ne,
          re,
          G,
          mt,
          He + 1,
          le,
          m,
          ze,
          _e,
          Ve
        ), Pe += performance.now() - Ge;
      } else
        ze[zs] !== qu && (Ze.fillStyle = ao[qu], ze[zs] = qu), Ze.fillRect(0, 0, Ze.canvas.width, Ze.canvas.height);
      if (this.shadeEnabled) {
        const Ge = performance.now();
        vz(
          qt,
          Se,
          U,
          L,
          P,
          A,
          $,
          F,
          $t,
          0,
          q,
          Te.fogType,
          Te.fogColor,
          Te.fogNearPane,
          Te.fogFarPane,
          Te.ambientLight,
          V,
          Y,
          ie,
          Q,
          ne,
          re,
          G,
          mt,
          He + 1,
          le,
          m,
          ze,
          _e,
          Ve
        ), $e += performance.now() - Ge, ze[pf] && (Ze.globalCompositeOperation = "multiply", Ze.drawImage(
          qt.canvas,
          0,
          0,
          Ze.canvas.width,
          Ze.canvas.height
        ), Ze.globalCompositeOperation = "source-over");
      }
      this.fogEnabled && Te.fogType !== x3.NONE && rz(
        Ze,
        en,
        Tt,
        U,
        L,
        P,
        A,
        X,
        xe,
        F,
        ie,
        _,
        q,
        ne,
        re,
        G,
        be,
        $t,
        Te.nearClippingPane,
        Te.farClippingPane,
        Te.fogType,
        Te.fogNearPane,
        Te.fogFarPane,
        Te.fogColor,
        ze,
        _e,
        Ve
      ), ct += _e[js], vt += _e[$h], Le += _e[vf], Je += _e[gC], Re += _e[RC], Ye += _e[G2], Xe += _e[o3], Ct += _e[s3];
    }
    this.debugNormals && lz(
      Ze,
      U,
      L,
      A,
      V,
      Y,
      $t,
      0,
      S,
      E,
      ve
    ), Se && a.context.clearRect(0, 0, S, E), a.context.drawImage(Ze.canvas, 0, 0), Be += $t, Fe += $t, He += 1 + rt;
  }
  this.debugAxis && iz(m, a.context, fe, b), s.totalObjects = m.length, s.visibleObjects = ot, s.drawCalls = Be, s.faces = Fe, s.fillDrawCalls = ct, s.fogDrawCalls = vt, s.shadeDrawCalls = Le, s.drawCallsTotal = ct + vt + Le, s.fillVertices = Je, s.fogVertices = Re, s.shadeVertices = Ye, s.sortTime = nn, s.cullTime = Ot, s.groupTime = It, s.processTime = De, s.fillRasterTime = Pe, s.shadeRasterTime = $e, s.fogSortTime = Xe, s.fogRasterTime = Ct, s.updateTime = t.scene && t.scene.world ? t.scene.world.lastTickTime : 0, s.retrieveTime = v, s.dt = performance.now() - f;
};
function sz(t, a, s, f) {
  let p = 0, m = 0;
  const v = a[0], g = a[1], S = a[2], E = a[3], C = a[4], b = a[5], R = a[6], D = a[7], _ = a[8], A = a[9], L = a[10], U = a[11], q = a[12], $ = a[13], F = a[14], H = a[15];
  let V = E + v, Y = D + C, ie = U + _, Q = H + q, P = 1 / Math.sqrt(V * V + Y * Y + ie * ie);
  V *= P, Y *= P, ie *= P, Q *= P;
  let ne = E - v, re = D - C, G = U - _, Z = H - q;
  P = 1 / Math.sqrt(ne * ne + re * re + G * G), ne *= P, re *= P, G *= P, Z *= P;
  let le = E + g, de = D + b, oe = U + A, ae = H + $;
  P = 1 / Math.sqrt(le * le + de * de + oe * oe), le *= P, de *= P, oe *= P, ae *= P;
  let fe = E - g, ve = D - b, j = U - A, X = H - $;
  P = 1 / Math.sqrt(fe * fe + ve * ve + j * j), fe *= P, ve *= P, j *= P, X *= P;
  let xe = E + S, be = D + R, ze = U + L, _e = H + F;
  P = 1 / Math.sqrt(xe * xe + be * be + ze * ze), xe *= P, be *= P, ze *= P, _e *= P;
  let Ve = E - S, Be = D - R, Fe = U - L, ct = H - F;
  P = 1 / Math.sqrt(Ve * Ve + Be * Be + Fe * Fe), Ve *= P, Be *= P, Fe *= P, ct *= P;
  const vt = t.length;
  for (let Le = 0; Le < vt; Le++) {
    const Je = t[Le];
    if (Je.meshRenderer && Je.meshRenderer.enabled) {
      const Re = Je.transform.worldMatrix, Ye = Je.meshRenderer.bounds, Pe = Ye[28], $e = Ye[29], Xe = Ye[30], Ct = Re[0] * Pe + Re[4] * $e + Re[8] * Xe + Re[12], Te = Re[1] * Pe + Re[5] * $e + Re[9] * Xe + Re[13], Se = Re[2] * Pe + Re[6] * $e + Re[10] * Xe + Re[14], Ke = Re[0] * Re[0] + Re[1] * Re[1] + Re[2] * Re[2], Ot = Re[4] * Re[4] + Re[5] * Re[5] + Re[6] * Re[6], ot = Re[8] * Re[8] + Re[9] * Re[9] + Re[10] * Re[10], wt = Ye[31] * Math.sqrt(Math.max(Ke, Ot, ot));
      if (V * Ct + Y * Te + ie * Se + Q < -wt || ne * Ct + re * Te + G * Se + Z < -wt || le * Ct + de * Te + oe * Se + ae < -wt || fe * Ct + ve * Te + j * Se + X < -wt || xe * Ct + be * Te + ze * Se + _e < -wt || Ve * Ct + Be * Te + Fe * Se + ct < -wt) continue;
      s[++p] = Le;
    }
    if (Je.light)
      if (Je.light.type === 1) {
        const Re = Je.transform.worldMatrix, Ye = Re[12], Pe = Re[13], $e = Re[14], Xe = Re[0] * Re[0] + Re[1] * Re[1] + Re[2] * Re[2], Ct = Re[4] * Re[4] + Re[5] * Re[5] + Re[6] * Re[6], Te = Re[8] * Re[8] + Re[9] * Re[9] + Re[10] * Re[10], Se = Je.light.range * Math.sqrt(Math.max(Xe, Ct, Te));
        if (V * Ye + Y * Pe + ie * $e + Q < -Se || ne * Ye + re * Pe + G * $e + Z < -Se || le * Ye + de * Pe + oe * $e + ae < -Se || fe * Ye + ve * Pe + j * $e + X < -Se || xe * Ye + be * Pe + ze * $e + _e < -Se || Ve * Ye + Be * Pe + Fe * $e + ct < -Se) continue;
        f[++m] = Le;
      } else
        f[++m] = Le;
  }
  s[0] = p, f[0] = m;
}
function uz(t, a, s) {
  const f = s, p = f[0], m = f[1], v = f[2], g = f[3], S = f[4], E = f[5], C = f[6], b = f[7], R = f[8], D = f[9], _ = f[10], A = f[11], L = f[12], U = f[13], q = f[14], $ = f[15];
  let F = 0;
  const H = t[0] + 1;
  for (let V = 1; V < H; V++) {
    const Y = t[V], ie = a[Y], Q = ie.transform.worldMatrix, P = ie.meshRenderer;
    if (P && P.enabled && P.bounds) {
      const ne = P.bounds;
      let re = 63;
      for (let G = 0; G < 24; G += 3) {
        const Z = ne[G], le = ne[G + 1], de = ne[G + 2], oe = Q[0] * Z + Q[4] * le + Q[8] * de + Q[12], ae = Q[1] * Z + Q[5] * le + Q[9] * de + Q[13], fe = Q[2] * Z + Q[6] * le + Q[10] * de + Q[14], ve = p * oe + S * ae + R * fe + L, j = m * oe + E * ae + D * fe + U, X = v * oe + C * ae + _ * fe + q, xe = g * oe + b * ae + A * fe + $;
        let be = 0;
        ve < -xe && (be |= 1), ve > xe && (be |= 2), j < -xe && (be |= 4), j > xe && (be |= 8), X < -xe && (be |= 16), X > xe && (be |= 32), re &= be;
      }
      re === 0 && (t[++F] = Y);
    } else {
      const ne = Q[12], re = Q[13], G = Q[14], Z = p * ne + S * re + R * G + L, le = m * ne + E * re + D * G + U, de = v * ne + C * re + _ * G + q, oe = g * ne + b * re + A * G + $;
      Z >= -oe && Z <= oe && le >= -oe && le <= oe && de >= -oe && de <= oe && (t[++F] = Y);
    }
  }
  t[0] = F;
}
let sf = 0, cz = 0;
function fz(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U, q, $, F, H, V, Y, ie, Q, P, ne, re) {
  let G = 0, Z = 0, le = 0;
  for (let de = 0; de < f; de++) {
    const oe = t[a + de], ae = s[oe], fe = ae.meshRenderer;
    if (fe.constructor !== sr) continue;
    ++sf;
    const ve = ae.transform.worldMatrix, j = fe.depthBias || 0;
    _C(A, D, ve), _C(_, R, ve);
    const X = A[0], xe = A[1], be = A[2], ze = A[3], _e = A[4], Ve = A[5], Be = A[6], Fe = A[7], ct = A[8], vt = A[9], Le = A[10], Je = A[11], Re = A[12], Ye = A[13], Pe = A[14], $e = A[15], Xe = fe.weldMap, Ct = Z;
    Z += (fe.vertices.length / 3 | 0) + 1, fe.adjTri === null && fe.updateAdjacency();
    const Te = fe.adjTri, Se = de + 1, Ke = G, Ot = fe.faces, ot = fe.vertices, wt = fe.faceNormals, at = fe.vertexNormals;
    az(L, ve);
    const mt = L, It = mt[0], nn = mt[1], De = mt[2], He = mt[3], rt = mt[4], Ze = mt[5], qt = mt[6], en = mt[7], Tt = mt[8], Qe = Ot.length;
    for (let gt = 0; gt < Qe; gt += 3) {
      const yt = Ot[gt], At = Ot[gt + 1], $t = Ot[gt + 2], Ge = yt << 2, fn = At << 2, On = $t << 2;
      if (re[yt] !== sf) {
        const on = yt * 3, zt = ot[on], an = ot[on + 1], un = ot[on + 2];
        m[Ge] = X * zt + _e * an + ct * un + Re, m[Ge + 1] = xe * zt + Ve * an + vt * un + Ye, m[Ge + 2] = be * zt + Be * an + Le * un + Pe, m[Ge + 3] = ze * zt + Fe * an + Je * un + $e, re[yt] = sf, ne[yt] = -1;
      }
      if (re[At] !== sf) {
        const on = At * 3, zt = ot[on], an = ot[on + 1], un = ot[on + 2];
        m[fn] = X * zt + _e * an + ct * un + Re, m[fn + 1] = xe * zt + Ve * an + vt * un + Ye, m[fn + 2] = be * zt + Be * an + Le * un + Pe, m[fn + 3] = ze * zt + Fe * an + Je * un + $e, re[At] = sf, ne[At] = -1;
      }
      if (re[$t] !== sf) {
        const on = $t * 3, zt = ot[on], an = ot[on + 1], un = ot[on + 2];
        m[On] = X * zt + _e * an + ct * un + Re, m[On + 1] = xe * zt + Ve * an + vt * un + Ye, m[On + 2] = be * zt + Be * an + Le * un + Pe, m[On + 3] = ze * zt + Fe * an + Je * un + $e, re[$t] = sf, ne[$t] = -1;
      }
      const Fn = m[Ge], mr = m[Ge + 1], lr = m[Ge + 2], Zn = m[Ge + 3], Di = m[fn], Rr = m[fn + 1], Lr = m[fn + 2], In = m[fn + 3], Ma = m[On], oa = m[On + 1], Wa = m[On + 2], Nr = m[On + 3];
      if (Fn < -Zn && Di < -In && Ma < -Nr || Fn > Zn && Di > In && Ma > Nr || mr < -Zn && Rr < -In && oa < -Nr || mr > Zn && Rr > In && oa > Nr || lr < -Zn && Lr < -In && Wa < -Nr || lr > Zn && Lr > In && Wa > Nr) continue;
      const B = 1 / Zn, ke = 1 / In, et = 1 / Nr, ut = Fn * B, Yt = mr * B, Ht = Di * ke, tn = Rr * ke, Zt = Ma * et, Gn = oa * et;
      if ((Ht - ut) * (Gn - Yt) - (tn - Yt) * (Zt - ut) > 0) continue;
      const gn = yt * 3, En = At * 3, qn = $t * 3;
      v[G] = G, V[G] = de, Y[G] = gt;
      const _a = gt / 3 | 0;
      Q[_a] = G, P[_a] = Se;
      const sa = wt[gt], Wt = wt[gt + 1], Qt = wt[gt + 2], ua = sa * It + Wt * He + Qt * qt, ki = sa * nn + Wt * rt + Qt * en, Oi = sa * De + Wt * Ze + Qt * Tt, Ai = Math.sqrt(ua * ua + ki * ki + Oi * Oi), Ki = Ai > 0 ? 1 / Ai : 0, ii = G * 3;
      if (S[ii] = fe.colors[yt], S[ii + 1] = fe.colors[At], S[ii + 2] = fe.colors[$t], E[G] = fe.shaderType, C[G] = 0, ne[yt] === -1) {
        const on = le * 3;
        I2(
          p,
          gn,
          ot[gn],
          ot[gn + 1],
          ot[gn + 2],
          _
        ), $[on] = ut, $[on + 1] = -Yt, ne[yt] = on, le++;
        const zt = yt * 3, an = at[zt] * It + at[zt + 1] * He + at[zt + 2] * qt, un = at[zt] * nn + at[zt + 1] * rt + at[zt + 2] * en, Jn = at[zt] * De + at[zt + 1] * Ze + at[zt + 2] * Tt, ca = Math.sqrt(an * an + un * un + Jn * Jn), Mr = ca > 0 ? 1 / ca : 0;
        q[on] = an * Mr, q[on + 1] = un * Mr, q[on + 2] = Jn * Mr;
      }
      if (F[G * 3] = ne[yt], H[G * 3] = Ct + (Xe ? Xe[yt] : yt), ne[At] === -1) {
        const on = le * 3;
        I2(
          p,
          En,
          ot[En],
          ot[En + 1],
          ot[En + 2],
          _
        ), $[on] = Ht, $[on + 1] = -tn, ne[At] = on, le++;
        const zt = At * 3, an = at[zt] * It + at[zt + 1] * He + at[zt + 2] * qt, un = at[zt] * nn + at[zt + 1] * rt + at[zt + 2] * en, Jn = at[zt] * De + at[zt + 1] * Ze + at[zt + 2] * Tt, ca = Math.sqrt(an * an + un * un + Jn * Jn), Mr = ca > 0 ? 1 / ca : 0;
        q[on] = an * Mr, q[on + 1] = un * Mr, q[on + 2] = Jn * Mr;
      }
      if (F[G * 3 + 1] = ne[At], H[G * 3 + 1] = Ct + (Xe ? Xe[At] : At), ne[$t] === -1) {
        const on = le * 3;
        I2(
          p,
          qn,
          ot[qn],
          ot[qn + 1],
          ot[qn + 2],
          _
        ), $[on] = Zt, $[on + 1] = -Gn, ne[$t] = on, le++;
        const zt = $t * 3, an = at[zt] * It + at[zt + 1] * He + at[zt + 2] * qt, un = at[zt] * nn + at[zt + 1] * rt + at[zt + 2] * en, Jn = at[zt] * De + at[zt + 1] * Ze + at[zt + 2] * Tt, ca = Math.sqrt(an * an + un * un + Jn * Jn), Mr = ca > 0 ? 1 / ca : 0;
        q[on] = an * Mr, q[on + 1] = un * Mr, q[on + 2] = Jn * Mr;
      }
      F[G * 3 + 2] = ne[$t], H[G * 3 + 2] = Ct + (Xe ? Xe[$t] : $t);
      const Qn = G * 9;
      b[Qn] = p[gn], b[Qn + 1] = p[gn + 1];
      const Wo = b[Qn + 2] = p[gn + 2];
      b[Qn + 3] = p[En], b[Qn + 4] = p[En + 1];
      const $r = b[Qn + 5] = p[En + 2];
      b[Qn + 6] = p[qn], b[Qn + 7] = p[qn + 1];
      const $s = b[Qn + 8] = p[qn + 2];
      g[G] = (Wo + $r + $s) * 0.33333 + j;
      const io = G * 3;
      U[io] = ua * Ki, U[io + 1] = ki * Ki, U[io + 2] = Oi * Ki, G++;
    }
    for (let gt = Ke; gt < G; gt++) {
      const yt = Y[gt], At = gt * 3, $t = Te[yt], Ge = Te[yt + 1], fn = Te[yt + 2];
      ie[At] = $t < 0 ? ip : P[$t] === Se ? Q[$t] : j2, ie[At + 1] = Ge < 0 ? ip : P[Ge] === Se ? Q[Ge] : j2, ie[At + 2] = fn < 0 ? ip : P[fn] === Se ? Q[fn] : j2;
    }
  }
  return G;
}
function dz(t, a, s, f, p, m, v, g, S) {
  const E = v * 0.5, C = g * 0.5, b = m + p;
  t.clearRect(0, 0, t.canvas.width, t.canvas.height), S[zs] = -1, t.beginPath(), S[zs] !== U0 && (t.fillStyle = ao[U0], t.strokeStyle = ao[U0], S[zs] = U0);
  for (let R = m; R < b; R++) {
    const D = f[R], _ = s[D * 3], A = s[D * 3 + 1], L = s[D * 3 + 2], U = a[_] * E + E, q = a[_ + 1] * C + C, $ = a[A] * E + E, F = a[A + 1] * C + C, H = a[L] * E + E, V = a[L + 1] * C + C;
    t.moveTo(U, q), t.lineTo($, F), t.lineTo(H, V), t.lineTo(U, q);
  }
  t.stroke();
}
function pz(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U, q, $, F, H, V, Y, ie, Q, P, ne, re, G, Z) {
  const le = t.canvas, de = le.width, oe = le.height, ae = de * 0.5, fe = oe * 0.5, ve = S + g;
  if (E)
    if (b !== -1) {
      const j = b >>> 16, X = b >>> 8 & 255, xe = b & 255, be = j & 248, ze = X & 252, _e = xe & 248, Ve = be << 8 | ze << 3 | _e >> 3;
      t.fillStyle = ao[Ve], t.fillRect(0, 0, de, oe);
    } else
      t.clearRect(0, 0, de, oe);
  D3(
    p,
    S,
    ve,
    V,
    Y,
    H
  );
  for (let j = S; j < ve; j++) {
    const X = p[j], xe = s[X * 3], be = s[X * 3 + 1], ze = s[X * 3 + 2], _e = f[X * 3], Ve = f[X * 3 + 1], Be = f[X * 3 + 2], Fe = a[xe] * ae + ae, ct = a[xe + 1] * fe + fe, vt = a[be] * ae + ae, Le = a[be + 1] * fe + fe, Je = a[ze] * ae + ae, Re = a[ze + 1] * fe + fe, Ye = $[X], Pe = ne[ie[Q + Ye]].meshRenderer, $e = v[X], Xe = j === ve - 1 || v[p[j + 1]] !== $e;
    switch ($e) {
      case pp: {
        Yu(
          t,
          Fe,
          ct,
          vt,
          Le,
          Je,
          Re,
          C,
          m,
          q,
          U,
          _e,
          Ve,
          Be,
          X,
          Pe,
          F[X],
          L,
          P,
          ne,
          R,
          D,
          _,
          A,
          Ye,
          re,
          G,
          Z,
          Xe,
          H[X]
        );
        break;
      }
      case vp: {
        z3(
          t,
          Fe,
          ct,
          vt,
          Le,
          Je,
          Re,
          C,
          m,
          q,
          U,
          _e,
          Ve,
          Be,
          X,
          Pe,
          F[X],
          L,
          P,
          ne,
          R,
          D,
          _,
          A,
          Ye,
          re,
          G,
          Z,
          Xe,
          H[X]
        );
        break;
      }
      case Ih: {
        Yu(
          t,
          Fe,
          ct,
          vt,
          Le,
          Je,
          Re,
          C,
          m,
          q,
          U,
          _e,
          Ve,
          Be,
          X,
          Pe,
          F[X],
          L,
          P,
          ne,
          R,
          D,
          _,
          A,
          Ye,
          re,
          G,
          Z,
          Xe,
          H[X]
        );
        break;
      }
      case hp: {
        Yu(
          t,
          Fe,
          ct,
          vt,
          Le,
          Je,
          Re,
          C,
          m,
          q,
          U,
          _e,
          Ve,
          Be,
          X,
          Pe,
          F[X],
          L,
          P,
          ne,
          R,
          D,
          _,
          A,
          Ye,
          re,
          G,
          Z,
          Xe,
          H[X]
        );
        break;
      }
      default: {
        const Ct = fp[$e];
        Ct(
          t,
          Fe,
          ct,
          vt,
          Le,
          Je,
          Re,
          C,
          m,
          q,
          U,
          _e,
          Ve,
          Be,
          X,
          Pe,
          F[X],
          L,
          P,
          ne,
          R,
          D,
          _,
          A,
          Ye,
          re,
          G,
          Z,
          Xe
        );
        break;
      }
    }
  }
}
function vz(t, a, s, f, p, m, v, g, S, E, C, b, R, D, _, A, L, U, q, $, F, H, V, Y, ie, Q, P, ne, re, G) {
  const Z = t.canvas, le = Z.width, de = Z.height;
  a && t.clearRect(0, 0, le, de);
  const oe = le * 0.5, ae = de * 0.5, fe = E + S;
  D3(
    m,
    E,
    fe,
    H,
    V,
    F
  );
  for (let ve = E; ve < fe; ve++) {
    const j = m[ve], X = f[j * 3], xe = f[j * 3 + 1], be = f[j * 3 + 2], ze = p[j * 3], _e = p[j * 3 + 1], Ve = p[j * 3 + 2], Be = s[X] * oe + oe, Fe = s[X + 1] * ae + ae, ct = s[xe] * oe + oe, vt = s[xe + 1] * ae + ae, Le = s[be] * oe + oe, Je = s[be + 1] * ae + ae, Re = q[j], Ye = P[Y[ie + Re]].meshRenderer, Pe = g[j], $e = ve === fe - 1 || g[m[ve + 1]] !== Pe;
    switch (Pe) {
      case pp: {
        U3(
          t,
          Be,
          Fe,
          ct,
          vt,
          Le,
          Je,
          C,
          v,
          U,
          L,
          ze,
          _e,
          Ve,
          j,
          Ye,
          $[j],
          A,
          Q,
          P,
          b,
          R,
          D,
          _,
          Re,
          ne,
          re,
          G,
          $e,
          F[j]
        );
        break;
      }
      case vp: {
        lp(
          t,
          Be,
          Fe,
          ct,
          vt,
          Le,
          Je,
          C,
          v,
          U,
          L,
          X,
          xe,
          be,
          j,
          Ye,
          $[j],
          A,
          Q,
          P,
          b,
          R,
          D,
          _,
          Re,
          ne,
          re,
          G,
          $e,
          F[j]
        );
        break;
      }
      case Ih: {
        _3(
          t,
          Be,
          Fe,
          ct,
          vt,
          Le,
          Je,
          C,
          v,
          U,
          L,
          ze,
          _e,
          Ve,
          j,
          Ye,
          $[j],
          A,
          Q,
          P,
          b,
          R,
          D,
          _,
          Re,
          ne,
          re
        );
        break;
      }
      case hp: {
        lp(
          t,
          Be,
          Fe,
          ct,
          vt,
          Le,
          Je,
          C,
          v,
          U,
          L,
          X,
          xe,
          be,
          j,
          Ye,
          $[j],
          A,
          Q,
          P,
          b,
          R,
          D,
          _,
          Re,
          ne,
          re,
          G,
          $e,
          F[j]
        );
        break;
      }
      default: {
        const Xe = dp[Pe];
        Xe(
          t,
          Be,
          Fe,
          ct,
          vt,
          Le,
          Je,
          C,
          v,
          U,
          L,
          ze,
          _e,
          Ve,
          j,
          Ye,
          $[j],
          A,
          Q,
          P,
          b,
          R,
          D,
          _,
          Re,
          ne,
          re,
          G,
          $e
        );
        break;
      }
    }
  }
}
const DC = c1, Mh = !0;
function hT(t, a) {
  this.canvas = a || document.createElement("canvas"), this.canvas.style.filter = "url(#stripBlue)", this.context = this.canvas.getContext("2d", { alpha: Mh }), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new vT(), this.camera = t, this.scale = 1, this.layers = [], this.shadeLayers = [], this.fogLayers = [], this.fogCompositeLayers = [];
  for (var s = 0; s < l1.layersCount; s++) {
    var f = document.createElement("canvas");
    this.layers[s] = f.getContext("2d", { alpha: Mh }), this.layers[s].imageSmoothingEnabled = !1, this.layers[s].webkitImageSmoothingEnabled = !1;
    var p = document.createElement("canvas");
    this.shadeLayers[s] = p.getContext("2d", { alpha: Mh }), this.shadeLayers[s].imageSmoothingEnabled = !1, this.shadeLayers[s].webkitImageSmoothingEnabled = !1;
    var m = document.createElement("canvas");
    this.fogLayers[s] = m.getContext("2d", { alpha: Mh }), this.fogLayers[s].imageSmoothingEnabled = !1, this.fogLayers[s].webkitImageSmoothingEnabled = !1;
    var v = document.createElement("canvas");
    this.fogCompositeLayers[s] = v.getContext("2d", {
      alpha: Mh
    }), this.fogCompositeLayers[s].imageSmoothingEnabled = !1, this.fogCompositeLayers[s].webkitImageSmoothingEnabled = !1;
  }
  var g = this;
  window.addEventListener("resize", function() {
    g.setSize(g.canvas.offsetWidth, g.canvas.offsetHeight);
  }), this.lastRenderStats = {
    dt: 0,
    fps: 0,
    frameTime: 0,
    sortTime: 0,
    cullTime: 0,
    groupTime: 0,
    processTime: 0,
    updateTime: 0,
    retrieveTime: 0
  };
  let S = performance.now(), E = 0, C = performance.now();
  const b = this;
  this.startRenderLoop = function R() {
    requestAnimationFrame(() => {
      const D = performance.now(), _ = D - S;
      S = D, E++, D - C >= 500 && (b.lastRenderStats.fps = Math.round(
        E * 1e3 / (D - C)
      ), E = 0, C = D), b.lastRenderStats.frameTime = _, b.render(), requestAnimationFrame(R);
    });
  };
}
var la = hT.prototype;
la.size = null;
la.scale = 1;
la.width = null;
la.height = null;
la.viewportMatrix = null;
la.camera = null;
la.canvas = null;
la.context = null;
Object.defineProperty(la, "wireframe", {
  get: function() {
    return this.renderer.wireframe;
  },
  set: function(t) {
    this.renderer.wireframe = t;
  }
});
Object.defineProperty(la, "debugNormals", {
  get: function() {
    return this.renderer.debugNormals;
  },
  set: function(t) {
    this.renderer.debugNormals = t;
  }
});
Object.defineProperty(la, "debugAxis", {
  get: function() {
    return this.renderer.debugAxis;
  },
  set: function(t) {
    this.renderer.debugAxis = t;
  }
});
Object.defineProperty(la, "fillEnabled", {
  get: function() {
    return this.renderer.fillEnabled;
  },
  set: function(t) {
    this.renderer.fillEnabled = t;
  }
});
Object.defineProperty(la, "shadeEnabled", {
  get: function() {
    return this.renderer.shadeEnabled;
  },
  set: function(t) {
    this.renderer.shadeEnabled = t;
  }
});
Object.defineProperty(la, "fogEnabled", {
  get: function() {
    return this.renderer.fogEnabled;
  },
  set: function(t) {
    this.renderer.fogEnabled = t;
  }
});
la.start = function() {
  this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight), this.startRenderLoop();
};
la.render = function() {
  this.camera !== null && this.renderer.render(this.camera.gameObject, this, this.lastRenderStats);
};
la.setSize = function(t, a) {
  const s = t * this.scale, f = a * this.scale;
  this.width = s, this.height = f, this.canvas.width = s, this.canvas.height = f, this.viewportMatrix[0] = s / 2, this.viewportMatrix[5] = -f / 2, this.viewportMatrix[12] = s / 2, this.viewportMatrix[13] = f / 2;
  for (var p = 0; p < this.layers.length; p++) {
    var m = this.layers[p];
    m.canvas.width = s, m.canvas.height = f;
    var v = this.shadeLayers[p];
    v.canvas.width = Math.ceil(s / 1), v.canvas.height = Math.ceil(f / 1);
    var g = this.fogLayers[p];
    g.canvas.width = Math.ceil(s / 1), g.canvas.height = Math.ceil(f / 1);
    var S = this.fogCompositeLayers[p];
    S.canvas.width = g.canvas.width, S.canvas.height = g.canvas.height;
  }
  this.camera.setup(t, a);
};
la.getWorldToScreen = function() {
  return DC(
    this.worldToScreenMatrix,
    this.viewportMatrix,
    this.camera.projectionMatrix
  ), DC(
    this.worldToScreenMatrix,
    this.worldToScreenMatrix,
    this.camera.gameObject.transform.getWorldToLocal()
  ), this.worldToScreenMatrix;
};
op.Type = {
  DIRECTIONAL: 0,
  POINT: 1,
  SPOT: 2
};
function Wu() {
  Vn.call(this);
}
Wu.prototype = Object.create(Vn.prototype);
Wu.prototype.constructor = Wu;
Wu.prototype.color = 16777215;
Wu.prototype.range = 10;
Wu.prototype.type = op.Type.DIRECTIONAL;
Wu.prototype.setGameObject = function(t) {
  Vn.prototype.setGameObject.call(this, t), t.light = this;
};
function op(t) {
  ai.call(this, t || "light"), this.addComponent(this.light = new Wu());
}
op.prototype = Object.create(ai.prototype);
op.prototype.constructor = op;
var H0 = { exports: {} }, _h = {}, V0 = { exports: {} }, pn = {};
var kC;
function hz() {
  if (kC) return pn;
  kC = 1;
  var t = /* @__PURE__ */ Symbol.for("react.element"), a = /* @__PURE__ */ Symbol.for("react.portal"), s = /* @__PURE__ */ Symbol.for("react.fragment"), f = /* @__PURE__ */ Symbol.for("react.strict_mode"), p = /* @__PURE__ */ Symbol.for("react.profiler"), m = /* @__PURE__ */ Symbol.for("react.provider"), v = /* @__PURE__ */ Symbol.for("react.context"), g = /* @__PURE__ */ Symbol.for("react.forward_ref"), S = /* @__PURE__ */ Symbol.for("react.suspense"), E = /* @__PURE__ */ Symbol.for("react.memo"), C = /* @__PURE__ */ Symbol.for("react.lazy"), b = Symbol.iterator;
  function R(j) {
    return j === null || typeof j != "object" ? null : (j = b && j[b] || j["@@iterator"], typeof j == "function" ? j : null);
  }
  var D = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, _ = Object.assign, A = {};
  function L(j, X, xe) {
    this.props = j, this.context = X, this.refs = A, this.updater = xe || D;
  }
  L.prototype.isReactComponent = {}, L.prototype.setState = function(j, X) {
    if (typeof j != "object" && typeof j != "function" && j != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, j, X, "setState");
  }, L.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function U() {
  }
  U.prototype = L.prototype;
  function q(j, X, xe) {
    this.props = j, this.context = X, this.refs = A, this.updater = xe || D;
  }
  var $ = q.prototype = new U();
  $.constructor = q, _($, L.prototype), $.isPureReactComponent = !0;
  var F = Array.isArray, H = Object.prototype.hasOwnProperty, V = { current: null }, Y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ie(j, X, xe) {
    var be, ze = {}, _e = null, Ve = null;
    if (X != null) for (be in X.ref !== void 0 && (Ve = X.ref), X.key !== void 0 && (_e = "" + X.key), X) H.call(X, be) && !Y.hasOwnProperty(be) && (ze[be] = X[be]);
    var Be = arguments.length - 2;
    if (Be === 1) ze.children = xe;
    else if (1 < Be) {
      for (var Fe = Array(Be), ct = 0; ct < Be; ct++) Fe[ct] = arguments[ct + 2];
      ze.children = Fe;
    }
    if (j && j.defaultProps) for (be in Be = j.defaultProps, Be) ze[be] === void 0 && (ze[be] = Be[be]);
    return { $$typeof: t, type: j, key: _e, ref: Ve, props: ze, _owner: V.current };
  }
  function Q(j, X) {
    return { $$typeof: t, type: j.type, key: X, ref: j.ref, props: j.props, _owner: j._owner };
  }
  function P(j) {
    return typeof j == "object" && j !== null && j.$$typeof === t;
  }
  function ne(j) {
    var X = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(xe) {
      return X[xe];
    });
  }
  var re = /\/+/g;
  function G(j, X) {
    return typeof j == "object" && j !== null && j.key != null ? ne("" + j.key) : X.toString(36);
  }
  function Z(j, X, xe, be, ze) {
    var _e = typeof j;
    (_e === "undefined" || _e === "boolean") && (j = null);
    var Ve = !1;
    if (j === null) Ve = !0;
    else switch (_e) {
      case "string":
      case "number":
        Ve = !0;
        break;
      case "object":
        switch (j.$$typeof) {
          case t:
          case a:
            Ve = !0;
        }
    }
    if (Ve) return Ve = j, ze = ze(Ve), j = be === "" ? "." + G(Ve, 0) : be, F(ze) ? (xe = "", j != null && (xe = j.replace(re, "$&/") + "/"), Z(ze, X, xe, "", function(ct) {
      return ct;
    })) : ze != null && (P(ze) && (ze = Q(ze, xe + (!ze.key || Ve && Ve.key === ze.key ? "" : ("" + ze.key).replace(re, "$&/") + "/") + j)), X.push(ze)), 1;
    if (Ve = 0, be = be === "" ? "." : be + ":", F(j)) for (var Be = 0; Be < j.length; Be++) {
      _e = j[Be];
      var Fe = be + G(_e, Be);
      Ve += Z(_e, X, xe, Fe, ze);
    }
    else if (Fe = R(j), typeof Fe == "function") for (j = Fe.call(j), Be = 0; !(_e = j.next()).done; ) _e = _e.value, Fe = be + G(_e, Be++), Ve += Z(_e, X, xe, Fe, ze);
    else if (_e === "object") throw X = String(j), Error("Objects are not valid as a React child (found: " + (X === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : X) + "). If you meant to render a collection of children, use an array instead.");
    return Ve;
  }
  function le(j, X, xe) {
    if (j == null) return j;
    var be = [], ze = 0;
    return Z(j, be, "", "", function(_e) {
      return X.call(xe, _e, ze++);
    }), be;
  }
  function de(j) {
    if (j._status === -1) {
      var X = j._result;
      X = X(), X.then(function(xe) {
        (j._status === 0 || j._status === -1) && (j._status = 1, j._result = xe);
      }, function(xe) {
        (j._status === 0 || j._status === -1) && (j._status = 2, j._result = xe);
      }), j._status === -1 && (j._status = 0, j._result = X);
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var oe = { current: null }, ae = { transition: null }, fe = { ReactCurrentDispatcher: oe, ReactCurrentBatchConfig: ae, ReactCurrentOwner: V };
  function ve() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return pn.Children = { map: le, forEach: function(j, X, xe) {
    le(j, function() {
      X.apply(this, arguments);
    }, xe);
  }, count: function(j) {
    var X = 0;
    return le(j, function() {
      X++;
    }), X;
  }, toArray: function(j) {
    return le(j, function(X) {
      return X;
    }) || [];
  }, only: function(j) {
    if (!P(j)) throw Error("React.Children.only expected to receive a single React element child.");
    return j;
  } }, pn.Component = L, pn.Fragment = s, pn.Profiler = p, pn.PureComponent = q, pn.StrictMode = f, pn.Suspense = S, pn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fe, pn.act = ve, pn.cloneElement = function(j, X, xe) {
    if (j == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + j + ".");
    var be = _({}, j.props), ze = j.key, _e = j.ref, Ve = j._owner;
    if (X != null) {
      if (X.ref !== void 0 && (_e = X.ref, Ve = V.current), X.key !== void 0 && (ze = "" + X.key), j.type && j.type.defaultProps) var Be = j.type.defaultProps;
      for (Fe in X) H.call(X, Fe) && !Y.hasOwnProperty(Fe) && (be[Fe] = X[Fe] === void 0 && Be !== void 0 ? Be[Fe] : X[Fe]);
    }
    var Fe = arguments.length - 2;
    if (Fe === 1) be.children = xe;
    else if (1 < Fe) {
      Be = Array(Fe);
      for (var ct = 0; ct < Fe; ct++) Be[ct] = arguments[ct + 2];
      be.children = Be;
    }
    return { $$typeof: t, type: j.type, key: ze, ref: _e, props: be, _owner: Ve };
  }, pn.createContext = function(j) {
    return j = { $$typeof: v, _currentValue: j, _currentValue2: j, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, j.Provider = { $$typeof: m, _context: j }, j.Consumer = j;
  }, pn.createElement = ie, pn.createFactory = function(j) {
    var X = ie.bind(null, j);
    return X.type = j, X;
  }, pn.createRef = function() {
    return { current: null };
  }, pn.forwardRef = function(j) {
    return { $$typeof: g, render: j };
  }, pn.isValidElement = P, pn.lazy = function(j) {
    return { $$typeof: C, _payload: { _status: -1, _result: j }, _init: de };
  }, pn.memo = function(j, X) {
    return { $$typeof: E, type: j, compare: X === void 0 ? null : X };
  }, pn.startTransition = function(j) {
    var X = ae.transition;
    ae.transition = {};
    try {
      j();
    } finally {
      ae.transition = X;
    }
  }, pn.unstable_act = ve, pn.useCallback = function(j, X) {
    return oe.current.useCallback(j, X);
  }, pn.useContext = function(j) {
    return oe.current.useContext(j);
  }, pn.useDebugValue = function() {
  }, pn.useDeferredValue = function(j) {
    return oe.current.useDeferredValue(j);
  }, pn.useEffect = function(j, X) {
    return oe.current.useEffect(j, X);
  }, pn.useId = function() {
    return oe.current.useId();
  }, pn.useImperativeHandle = function(j, X, xe) {
    return oe.current.useImperativeHandle(j, X, xe);
  }, pn.useInsertionEffect = function(j, X) {
    return oe.current.useInsertionEffect(j, X);
  }, pn.useLayoutEffect = function(j, X) {
    return oe.current.useLayoutEffect(j, X);
  }, pn.useMemo = function(j, X) {
    return oe.current.useMemo(j, X);
  }, pn.useReducer = function(j, X, xe) {
    return oe.current.useReducer(j, X, xe);
  }, pn.useRef = function(j) {
    return oe.current.useRef(j);
  }, pn.useState = function(j) {
    return oe.current.useState(j);
  }, pn.useSyncExternalStore = function(j, X, xe) {
    return oe.current.useSyncExternalStore(j, X, xe);
  }, pn.useTransition = function() {
    return oe.current.useTransition();
  }, pn.version = "18.3.1", pn;
}
var Lh = { exports: {} };
Lh.exports;
var OC;
function mz() {
  return OC || (OC = 1, (function(t, a) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var s = "18.3.1", f = /* @__PURE__ */ Symbol.for("react.element"), p = /* @__PURE__ */ Symbol.for("react.portal"), m = /* @__PURE__ */ Symbol.for("react.fragment"), v = /* @__PURE__ */ Symbol.for("react.strict_mode"), g = /* @__PURE__ */ Symbol.for("react.profiler"), S = /* @__PURE__ */ Symbol.for("react.provider"), E = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), b = /* @__PURE__ */ Symbol.for("react.suspense"), R = /* @__PURE__ */ Symbol.for("react.suspense_list"), D = /* @__PURE__ */ Symbol.for("react.memo"), _ = /* @__PURE__ */ Symbol.for("react.lazy"), A = /* @__PURE__ */ Symbol.for("react.offscreen"), L = Symbol.iterator, U = "@@iterator";
      function q(k) {
        if (k === null || typeof k != "object")
          return null;
        var W = L && k[L] || k[U];
        return typeof W == "function" ? W : null;
      }
      var $ = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, F = {
        transition: null
      }, H = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, V = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Y = {}, ie = null;
      function Q(k) {
        ie = k;
      }
      Y.setExtraStackFrame = function(k) {
        ie = k;
      }, Y.getCurrentStack = null, Y.getStackAddendum = function() {
        var k = "";
        ie && (k += ie);
        var W = Y.getCurrentStack;
        return W && (k += W() || ""), k;
      };
      var P = !1, ne = !1, re = !1, G = !1, Z = !1, le = {
        ReactCurrentDispatcher: $,
        ReactCurrentBatchConfig: F,
        ReactCurrentOwner: V
      };
      le.ReactDebugCurrentFrame = Y, le.ReactCurrentActQueue = H;
      function de(k) {
        {
          for (var W = arguments.length, me = new Array(W > 1 ? W - 1 : 0), Ee = 1; Ee < W; Ee++)
            me[Ee - 1] = arguments[Ee];
          ae("warn", k, me);
        }
      }
      function oe(k) {
        {
          for (var W = arguments.length, me = new Array(W > 1 ? W - 1 : 0), Ee = 1; Ee < W; Ee++)
            me[Ee - 1] = arguments[Ee];
          ae("error", k, me);
        }
      }
      function ae(k, W, me) {
        {
          var Ee = le.ReactDebugCurrentFrame, We = Ee.getStackAddendum();
          We !== "" && (W += "%s", me = me.concat([We]));
          var Lt = me.map(function(nt) {
            return String(nt);
          });
          Lt.unshift("Warning: " + W), Function.prototype.apply.call(console[k], console, Lt);
        }
      }
      var fe = {};
      function ve(k, W) {
        {
          var me = k.constructor, Ee = me && (me.displayName || me.name) || "ReactClass", We = Ee + "." + W;
          if (fe[We])
            return;
          oe("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", W, Ee), fe[We] = !0;
        }
      }
      var j = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(k) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(k, W, me) {
          ve(k, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(k, W, me, Ee) {
          ve(k, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(k, W, me, Ee) {
          ve(k, "setState");
        }
      }, X = Object.assign, xe = {};
      Object.freeze(xe);
      function be(k, W, me) {
        this.props = k, this.context = W, this.refs = xe, this.updater = me || j;
      }
      be.prototype.isReactComponent = {}, be.prototype.setState = function(k, W) {
        if (typeof k != "object" && typeof k != "function" && k != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, k, W, "setState");
      }, be.prototype.forceUpdate = function(k) {
        this.updater.enqueueForceUpdate(this, k, "forceUpdate");
      };
      {
        var ze = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, _e = function(k, W) {
          Object.defineProperty(be.prototype, k, {
            get: function() {
              de("%s(...) is deprecated in plain JavaScript React classes. %s", W[0], W[1]);
            }
          });
        };
        for (var Ve in ze)
          ze.hasOwnProperty(Ve) && _e(Ve, ze[Ve]);
      }
      function Be() {
      }
      Be.prototype = be.prototype;
      function Fe(k, W, me) {
        this.props = k, this.context = W, this.refs = xe, this.updater = me || j;
      }
      var ct = Fe.prototype = new Be();
      ct.constructor = Fe, X(ct, be.prototype), ct.isPureReactComponent = !0;
      function vt() {
        var k = {
          current: null
        };
        return Object.seal(k), k;
      }
      var Le = Array.isArray;
      function Je(k) {
        return Le(k);
      }
      function Re(k) {
        {
          var W = typeof Symbol == "function" && Symbol.toStringTag, me = W && k[Symbol.toStringTag] || k.constructor.name || "Object";
          return me;
        }
      }
      function Ye(k) {
        try {
          return Pe(k), !1;
        } catch {
          return !0;
        }
      }
      function Pe(k) {
        return "" + k;
      }
      function $e(k) {
        if (Ye(k))
          return oe("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Re(k)), Pe(k);
      }
      function Xe(k, W, me) {
        var Ee = k.displayName;
        if (Ee)
          return Ee;
        var We = W.displayName || W.name || "";
        return We !== "" ? me + "(" + We + ")" : me;
      }
      function Ct(k) {
        return k.displayName || "Context";
      }
      function Te(k) {
        if (k == null)
          return null;
        if (typeof k.tag == "number" && oe("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof k == "function")
          return k.displayName || k.name || null;
        if (typeof k == "string")
          return k;
        switch (k) {
          case m:
            return "Fragment";
          case p:
            return "Portal";
          case g:
            return "Profiler";
          case v:
            return "StrictMode";
          case b:
            return "Suspense";
          case R:
            return "SuspenseList";
        }
        if (typeof k == "object")
          switch (k.$$typeof) {
            case E:
              var W = k;
              return Ct(W) + ".Consumer";
            case S:
              var me = k;
              return Ct(me._context) + ".Provider";
            case C:
              return Xe(k, k.render, "ForwardRef");
            case D:
              var Ee = k.displayName || null;
              return Ee !== null ? Ee : Te(k.type) || "Memo";
            case _: {
              var We = k, Lt = We._payload, nt = We._init;
              try {
                return Te(nt(Lt));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Se = Object.prototype.hasOwnProperty, Ke = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Ot, ot, wt;
      wt = {};
      function at(k) {
        if (Se.call(k, "ref")) {
          var W = Object.getOwnPropertyDescriptor(k, "ref").get;
          if (W && W.isReactWarning)
            return !1;
        }
        return k.ref !== void 0;
      }
      function mt(k) {
        if (Se.call(k, "key")) {
          var W = Object.getOwnPropertyDescriptor(k, "key").get;
          if (W && W.isReactWarning)
            return !1;
        }
        return k.key !== void 0;
      }
      function It(k, W) {
        var me = function() {
          Ot || (Ot = !0, oe("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", W));
        };
        me.isReactWarning = !0, Object.defineProperty(k, "key", {
          get: me,
          configurable: !0
        });
      }
      function nn(k, W) {
        var me = function() {
          ot || (ot = !0, oe("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", W));
        };
        me.isReactWarning = !0, Object.defineProperty(k, "ref", {
          get: me,
          configurable: !0
        });
      }
      function De(k) {
        if (typeof k.ref == "string" && V.current && k.__self && V.current.stateNode !== k.__self) {
          var W = Te(V.current.type);
          wt[W] || (oe('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', W, k.ref), wt[W] = !0);
        }
      }
      var He = function(k, W, me, Ee, We, Lt, nt) {
        var jt = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: f,
          // Built-in properties that belong on the element
          type: k,
          key: W,
          ref: me,
          props: nt,
          // Record the component responsible for creating this element.
          _owner: Lt
        };
        return jt._store = {}, Object.defineProperty(jt._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(jt, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Ee
        }), Object.defineProperty(jt, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: We
        }), Object.freeze && (Object.freeze(jt.props), Object.freeze(jt)), jt;
      };
      function rt(k, W, me) {
        var Ee, We = {}, Lt = null, nt = null, jt = null, sn = null;
        if (W != null) {
          at(W) && (nt = W.ref, De(W)), mt(W) && ($e(W.key), Lt = "" + W.key), jt = W.__self === void 0 ? null : W.__self, sn = W.__source === void 0 ? null : W.__source;
          for (Ee in W)
            Se.call(W, Ee) && !Ke.hasOwnProperty(Ee) && (We[Ee] = W[Ee]);
        }
        var xn = arguments.length - 2;
        if (xn === 1)
          We.children = me;
        else if (xn > 1) {
          for (var $n = Array(xn), Ln = 0; Ln < xn; Ln++)
            $n[Ln] = arguments[Ln + 2];
          Object.freeze && Object.freeze($n), We.children = $n;
        }
        if (k && k.defaultProps) {
          var rn = k.defaultProps;
          for (Ee in rn)
            We[Ee] === void 0 && (We[Ee] = rn[Ee]);
        }
        if (Lt || nt) {
          var Nn = typeof k == "function" ? k.displayName || k.name || "Unknown" : k;
          Lt && It(We, Nn), nt && nn(We, Nn);
        }
        return He(k, Lt, nt, jt, sn, V.current, We);
      }
      function Ze(k, W) {
        var me = He(k.type, W, k.ref, k._self, k._source, k._owner, k.props);
        return me;
      }
      function qt(k, W, me) {
        if (k == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + k + ".");
        var Ee, We = X({}, k.props), Lt = k.key, nt = k.ref, jt = k._self, sn = k._source, xn = k._owner;
        if (W != null) {
          at(W) && (nt = W.ref, xn = V.current), mt(W) && ($e(W.key), Lt = "" + W.key);
          var $n;
          k.type && k.type.defaultProps && ($n = k.type.defaultProps);
          for (Ee in W)
            Se.call(W, Ee) && !Ke.hasOwnProperty(Ee) && (W[Ee] === void 0 && $n !== void 0 ? We[Ee] = $n[Ee] : We[Ee] = W[Ee]);
        }
        var Ln = arguments.length - 2;
        if (Ln === 1)
          We.children = me;
        else if (Ln > 1) {
          for (var rn = Array(Ln), Nn = 0; Nn < Ln; Nn++)
            rn[Nn] = arguments[Nn + 2];
          We.children = rn;
        }
        return He(k.type, Lt, nt, jt, sn, xn, We);
      }
      function en(k) {
        return typeof k == "object" && k !== null && k.$$typeof === f;
      }
      var Tt = ".", Qe = ":";
      function gt(k) {
        var W = /[=:]/g, me = {
          "=": "=0",
          ":": "=2"
        }, Ee = k.replace(W, function(We) {
          return me[We];
        });
        return "$" + Ee;
      }
      var yt = !1, At = /\/+/g;
      function $t(k) {
        return k.replace(At, "$&/");
      }
      function Ge(k, W) {
        return typeof k == "object" && k !== null && k.key != null ? ($e(k.key), gt("" + k.key)) : W.toString(36);
      }
      function fn(k, W, me, Ee, We) {
        var Lt = typeof k;
        (Lt === "undefined" || Lt === "boolean") && (k = null);
        var nt = !1;
        if (k === null)
          nt = !0;
        else
          switch (Lt) {
            case "string":
            case "number":
              nt = !0;
              break;
            case "object":
              switch (k.$$typeof) {
                case f:
                case p:
                  nt = !0;
              }
          }
        if (nt) {
          var jt = k, sn = We(jt), xn = Ee === "" ? Tt + Ge(jt, 0) : Ee;
          if (Je(sn)) {
            var $n = "";
            xn != null && ($n = $t(xn) + "/"), fn(sn, W, $n, "", function(Sp) {
              return Sp;
            });
          } else sn != null && (en(sn) && (sn.key && (!jt || jt.key !== sn.key) && $e(sn.key), sn = Ze(
            sn,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            me + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (sn.key && (!jt || jt.key !== sn.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              $t("" + sn.key) + "/"
            ) : "") + xn
          )), W.push(sn));
          return 1;
        }
        var Ln, rn, Nn = 0, er = Ee === "" ? Tt : Ee + Qe;
        if (Je(k))
          for (var co = 0; co < k.length; co++)
            Ln = k[co], rn = er + Ge(Ln, co), Nn += fn(Ln, W, me, rn, We);
        else {
          var Xu = q(k);
          if (typeof Xu == "function") {
            var Dl = k;
            Xu === Dl.entries && (yt || de("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), yt = !0);
            for (var Ku = Xu.call(Dl), Xo, gp = 0; !(Xo = Ku.next()).done; )
              Ln = Xo.value, rn = er + Ge(Ln, gp++), Nn += fn(Ln, W, me, rn, We);
          } else if (Lt === "object") {
            var gf = String(k);
            throw new Error("Objects are not valid as a React child (found: " + (gf === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : gf) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Nn;
      }
      function On(k, W, me) {
        if (k == null)
          return k;
        var Ee = [], We = 0;
        return fn(k, Ee, "", "", function(Lt) {
          return W.call(me, Lt, We++);
        }), Ee;
      }
      function Fn(k) {
        var W = 0;
        return On(k, function() {
          W++;
        }), W;
      }
      function mr(k, W, me) {
        On(k, function() {
          W.apply(this, arguments);
        }, me);
      }
      function lr(k) {
        return On(k, function(W) {
          return W;
        }) || [];
      }
      function Zn(k) {
        if (!en(k))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return k;
      }
      function Di(k) {
        var W = {
          $$typeof: E,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: k,
          _currentValue2: k,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        W.Provider = {
          $$typeof: S,
          _context: W
        };
        var me = !1, Ee = !1, We = !1;
        {
          var Lt = {
            $$typeof: E,
            _context: W
          };
          Object.defineProperties(Lt, {
            Provider: {
              get: function() {
                return Ee || (Ee = !0, oe("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), W.Provider;
              },
              set: function(nt) {
                W.Provider = nt;
              }
            },
            _currentValue: {
              get: function() {
                return W._currentValue;
              },
              set: function(nt) {
                W._currentValue = nt;
              }
            },
            _currentValue2: {
              get: function() {
                return W._currentValue2;
              },
              set: function(nt) {
                W._currentValue2 = nt;
              }
            },
            _threadCount: {
              get: function() {
                return W._threadCount;
              },
              set: function(nt) {
                W._threadCount = nt;
              }
            },
            Consumer: {
              get: function() {
                return me || (me = !0, oe("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), W.Consumer;
              }
            },
            displayName: {
              get: function() {
                return W.displayName;
              },
              set: function(nt) {
                We || (de("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", nt), We = !0);
              }
            }
          }), W.Consumer = Lt;
        }
        return W._currentRenderer = null, W._currentRenderer2 = null, W;
      }
      var Rr = -1, Lr = 0, In = 1, Ma = 2;
      function oa(k) {
        if (k._status === Rr) {
          var W = k._result, me = W();
          if (me.then(function(Lt) {
            if (k._status === Lr || k._status === Rr) {
              var nt = k;
              nt._status = In, nt._result = Lt;
            }
          }, function(Lt) {
            if (k._status === Lr || k._status === Rr) {
              var nt = k;
              nt._status = Ma, nt._result = Lt;
            }
          }), k._status === Rr) {
            var Ee = k;
            Ee._status = Lr, Ee._result = me;
          }
        }
        if (k._status === In) {
          var We = k._result;
          return We === void 0 && oe(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, We), "default" in We || oe(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, We), We.default;
        } else
          throw k._result;
      }
      function Wa(k) {
        var W = {
          // We use these fields to store the result.
          _status: Rr,
          _result: k
        }, me = {
          $$typeof: _,
          _payload: W,
          _init: oa
        };
        {
          var Ee, We;
          Object.defineProperties(me, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return Ee;
              },
              set: function(Lt) {
                oe("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Ee = Lt, Object.defineProperty(me, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return We;
              },
              set: function(Lt) {
                oe("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), We = Lt, Object.defineProperty(me, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return me;
      }
      function Nr(k) {
        k != null && k.$$typeof === D ? oe("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof k != "function" ? oe("forwardRef requires a render function but was given %s.", k === null ? "null" : typeof k) : k.length !== 0 && k.length !== 2 && oe("forwardRef render functions accept exactly two parameters: props and ref. %s", k.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), k != null && (k.defaultProps != null || k.propTypes != null) && oe("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var W = {
          $$typeof: C,
          render: k
        };
        {
          var me;
          Object.defineProperty(W, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return me;
            },
            set: function(Ee) {
              me = Ee, !k.name && !k.displayName && (k.displayName = Ee);
            }
          });
        }
        return W;
      }
      var B;
      B = /* @__PURE__ */ Symbol.for("react.module.reference");
      function ke(k) {
        return !!(typeof k == "string" || typeof k == "function" || k === m || k === g || Z || k === v || k === b || k === R || G || k === A || P || ne || re || typeof k == "object" && k !== null && (k.$$typeof === _ || k.$$typeof === D || k.$$typeof === S || k.$$typeof === E || k.$$typeof === C || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        k.$$typeof === B || k.getModuleId !== void 0));
      }
      function et(k, W) {
        ke(k) || oe("memo: The first argument must be a component. Instead received: %s", k === null ? "null" : typeof k);
        var me = {
          $$typeof: D,
          type: k,
          compare: W === void 0 ? null : W
        };
        {
          var Ee;
          Object.defineProperty(me, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return Ee;
            },
            set: function(We) {
              Ee = We, !k.name && !k.displayName && (k.displayName = We);
            }
          });
        }
        return me;
      }
      function ut() {
        var k = $.current;
        return k === null && oe(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), k;
      }
      function Yt(k) {
        var W = ut();
        if (k._context !== void 0) {
          var me = k._context;
          me.Consumer === k ? oe("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : me.Provider === k && oe("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return W.useContext(k);
      }
      function Ht(k) {
        var W = ut();
        return W.useState(k);
      }
      function tn(k, W, me) {
        var Ee = ut();
        return Ee.useReducer(k, W, me);
      }
      function Zt(k) {
        var W = ut();
        return W.useRef(k);
      }
      function Gn(k, W) {
        var me = ut();
        return me.useEffect(k, W);
      }
      function gn(k, W) {
        var me = ut();
        return me.useInsertionEffect(k, W);
      }
      function En(k, W) {
        var me = ut();
        return me.useLayoutEffect(k, W);
      }
      function qn(k, W) {
        var me = ut();
        return me.useCallback(k, W);
      }
      function _a(k, W) {
        var me = ut();
        return me.useMemo(k, W);
      }
      function sa(k, W, me) {
        var Ee = ut();
        return Ee.useImperativeHandle(k, W, me);
      }
      function Wt(k, W) {
        {
          var me = ut();
          return me.useDebugValue(k, W);
        }
      }
      function Qt() {
        var k = ut();
        return k.useTransition();
      }
      function ua(k) {
        var W = ut();
        return W.useDeferredValue(k);
      }
      function ki() {
        var k = ut();
        return k.useId();
      }
      function Oi(k, W, me) {
        var Ee = ut();
        return Ee.useSyncExternalStore(k, W, me);
      }
      var Ai = 0, Ki, ii, Qn, Wo, $r, $s, io;
      function on() {
      }
      on.__reactDisabledLog = !0;
      function zt() {
        {
          if (Ai === 0) {
            Ki = console.log, ii = console.info, Qn = console.warn, Wo = console.error, $r = console.group, $s = console.groupCollapsed, io = console.groupEnd;
            var k = {
              configurable: !0,
              enumerable: !0,
              value: on,
              writable: !0
            };
            Object.defineProperties(console, {
              info: k,
              log: k,
              warn: k,
              error: k,
              group: k,
              groupCollapsed: k,
              groupEnd: k
            });
          }
          Ai++;
        }
      }
      function an() {
        {
          if (Ai--, Ai === 0) {
            var k = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: X({}, k, {
                value: Ki
              }),
              info: X({}, k, {
                value: ii
              }),
              warn: X({}, k, {
                value: Qn
              }),
              error: X({}, k, {
                value: Wo
              }),
              group: X({}, k, {
                value: $r
              }),
              groupCollapsed: X({}, k, {
                value: $s
              }),
              groupEnd: X({}, k, {
                value: io
              })
            });
          }
          Ai < 0 && oe("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var un = le.ReactCurrentDispatcher, Jn;
      function ca(k, W, me) {
        {
          if (Jn === void 0)
            try {
              throw Error();
            } catch (We) {
              var Ee = We.stack.trim().match(/\n( *(at )?)/);
              Jn = Ee && Ee[1] || "";
            }
          return `
` + Jn + k;
        }
      }
      var Mr = !1, lo;
      {
        var Hs = typeof WeakMap == "function" ? WeakMap : Map;
        lo = new Hs();
      }
      function Vs(k, W) {
        if (!k || Mr)
          return "";
        {
          var me = lo.get(k);
          if (me !== void 0)
            return me;
        }
        var Ee;
        Mr = !0;
        var We = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Lt;
        Lt = un.current, un.current = null, zt();
        try {
          if (W) {
            var nt = function() {
              throw Error();
            };
            if (Object.defineProperty(nt.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(nt, []);
              } catch (er) {
                Ee = er;
              }
              Reflect.construct(k, [], nt);
            } else {
              try {
                nt.call();
              } catch (er) {
                Ee = er;
              }
              k.call(nt.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (er) {
              Ee = er;
            }
            k();
          }
        } catch (er) {
          if (er && Ee && typeof er.stack == "string") {
            for (var jt = er.stack.split(`
`), sn = Ee.stack.split(`
`), xn = jt.length - 1, $n = sn.length - 1; xn >= 1 && $n >= 0 && jt[xn] !== sn[$n]; )
              $n--;
            for (; xn >= 1 && $n >= 0; xn--, $n--)
              if (jt[xn] !== sn[$n]) {
                if (xn !== 1 || $n !== 1)
                  do
                    if (xn--, $n--, $n < 0 || jt[xn] !== sn[$n]) {
                      var Ln = `
` + jt[xn].replace(" at new ", " at ");
                      return k.displayName && Ln.includes("<anonymous>") && (Ln = Ln.replace("<anonymous>", k.displayName)), typeof k == "function" && lo.set(k, Ln), Ln;
                    }
                  while (xn >= 1 && $n >= 0);
                break;
              }
          }
        } finally {
          Mr = !1, un.current = Lt, an(), Error.prepareStackTrace = We;
        }
        var rn = k ? k.displayName || k.name : "", Nn = rn ? ca(rn) : "";
        return typeof k == "function" && lo.set(k, Nn), Nn;
      }
      function Ml(k, W, me) {
        return Vs(k, !1);
      }
      function mp(k) {
        var W = k.prototype;
        return !!(W && W.isReactComponent);
      }
      function _l(k, W, me) {
        if (k == null)
          return "";
        if (typeof k == "function")
          return Vs(k, mp(k));
        if (typeof k == "string")
          return ca(k);
        switch (k) {
          case b:
            return ca("Suspense");
          case R:
            return ca("SuspenseList");
        }
        if (typeof k == "object")
          switch (k.$$typeof) {
            case C:
              return Ml(k.render);
            case D:
              return _l(k.type, W, me);
            case _: {
              var Ee = k, We = Ee._payload, Lt = Ee._init;
              try {
                return _l(Lt(We), W, me);
              } catch {
              }
            }
          }
        return "";
      }
      var Cn = {}, Is = le.ReactDebugCurrentFrame;
      function Sn(k) {
        if (k) {
          var W = k._owner, me = _l(k.type, k._source, W ? W.type : null);
          Is.setExtraStackFrame(me);
        } else
          Is.setExtraStackFrame(null);
      }
      function Bu(k, W, me, Ee, We) {
        {
          var Lt = Function.call.bind(Se);
          for (var nt in k)
            if (Lt(k, nt)) {
              var jt = void 0;
              try {
                if (typeof k[nt] != "function") {
                  var sn = Error((Ee || "React class") + ": " + me + " type `" + nt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof k[nt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw sn.name = "Invariant Violation", sn;
                }
                jt = k[nt](W, nt, Ee, me, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (xn) {
                jt = xn;
              }
              jt && !(jt instanceof Error) && (Sn(We), oe("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ee || "React class", me, nt, typeof jt), Sn(null)), jt instanceof Error && !(jt.message in Cn) && (Cn[jt.message] = !0, Sn(We), oe("Failed %s type: %s", me, jt.message), Sn(null));
            }
        }
      }
      function Zi(k) {
        if (k) {
          var W = k._owner, me = _l(k.type, k._source, W ? W.type : null);
          Q(me);
        } else
          Q(null);
      }
      var Gt;
      Gt = !1;
      function qs() {
        if (V.current) {
          var k = Te(V.current.type);
          if (k)
            return `

Check the render method of \`` + k + "`.";
        }
        return "";
      }
      function Hr(k) {
        if (k !== void 0) {
          var W = k.fileName.replace(/^.*[\\\/]/, ""), me = k.lineNumber;
          return `

Check your code at ` + W + ":" + me + ".";
        }
        return "";
      }
      function Ji(k) {
        return k != null ? Hr(k.__source) : "";
      }
      var fa = {};
      function el(k) {
        var W = qs();
        if (!W) {
          var me = typeof k == "string" ? k : k.displayName || k.name;
          me && (W = `

Check the top-level render call using <` + me + ">.");
        }
        return W;
      }
      function Yn(k, W) {
        if (!(!k._store || k._store.validated || k.key != null)) {
          k._store.validated = !0;
          var me = el(W);
          if (!fa[me]) {
            fa[me] = !0;
            var Ee = "";
            k && k._owner && k._owner !== V.current && (Ee = " It was passed a child from " + Te(k._owner.type) + "."), Zi(k), oe('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', me, Ee), Zi(null);
          }
        }
      }
      function An(k, W) {
        if (typeof k == "object") {
          if (Je(k))
            for (var me = 0; me < k.length; me++) {
              var Ee = k[me];
              en(Ee) && Yn(Ee, W);
            }
          else if (en(k))
            k._store && (k._store.validated = !0);
          else if (k) {
            var We = q(k);
            if (typeof We == "function" && We !== k.entries)
              for (var Lt = We.call(k), nt; !(nt = Lt.next()).done; )
                en(nt.value) && Yn(nt.value, W);
          }
        }
      }
      function oo(k) {
        {
          var W = k.type;
          if (W == null || typeof W == "string")
            return;
          var me;
          if (typeof W == "function")
            me = W.propTypes;
          else if (typeof W == "object" && (W.$$typeof === C || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          W.$$typeof === D))
            me = W.propTypes;
          else
            return;
          if (me) {
            var Ee = Te(W);
            Bu(me, k.props, "prop", Ee, k);
          } else if (W.PropTypes !== void 0 && !Gt) {
            Gt = !0;
            var We = Te(W);
            oe("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", We || "Unknown");
          }
          typeof W.getDefaultProps == "function" && !W.getDefaultProps.isReactClassApproved && oe("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function _r(k) {
        {
          for (var W = Object.keys(k.props), me = 0; me < W.length; me++) {
            var Ee = W[me];
            if (Ee !== "children" && Ee !== "key") {
              Zi(k), oe("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ee), Zi(null);
              break;
            }
          }
          k.ref !== null && (Zi(k), oe("Invalid attribute `ref` supplied to `React.Fragment`."), Zi(null));
        }
      }
      function da(k, W, me) {
        var Ee = ke(k);
        if (!Ee) {
          var We = "";
          (k === void 0 || typeof k == "object" && k !== null && Object.keys(k).length === 0) && (We += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Lt = Ji(W);
          Lt ? We += Lt : We += qs();
          var nt;
          k === null ? nt = "null" : Je(k) ? nt = "array" : k !== void 0 && k.$$typeof === f ? (nt = "<" + (Te(k.type) || "Unknown") + " />", We = " Did you accidentally export a JSX literal instead of a component?") : nt = typeof k, oe("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", nt, We);
        }
        var jt = rt.apply(this, arguments);
        if (jt == null)
          return jt;
        if (Ee)
          for (var sn = 2; sn < arguments.length; sn++)
            An(arguments[sn], k);
        return k === m ? _r(jt) : oo(jt), jt;
      }
      var li = !1;
      function Bo(k) {
        var W = da.bind(null, k);
        return W.type = k, li || (li = !0, de("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(W, "type", {
          enumerable: !1,
          get: function() {
            return de("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: k
            }), k;
          }
        }), W;
      }
      function Gu(k, W, me) {
        for (var Ee = qt.apply(this, arguments), We = 2; We < arguments.length; We++)
          An(arguments[We], Ee.type);
        return oo(Ee), Ee;
      }
      function Qu(k, W) {
        var me = F.transition;
        F.transition = {};
        var Ee = F.transition;
        F.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          k();
        } finally {
          if (F.transition = me, me === null && Ee._updatedFibers) {
            var We = Ee._updatedFibers.size;
            We > 10 && de("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), Ee._updatedFibers.clear();
          }
        }
      }
      var so = !1, Go = null;
      function yp(k) {
        if (Go === null)
          try {
            var W = ("require" + Math.random()).slice(0, 7), me = t && t[W];
            Go = me.call(t, "timers").setImmediate;
          } catch {
            Go = function(We) {
              so === !1 && (so = !0, typeof MessageChannel > "u" && oe("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Lt = new MessageChannel();
              Lt.port1.onmessage = We, Lt.port2.postMessage(void 0);
            };
          }
        return Go(k);
      }
      var oi = 0, Li = !1;
      function tl(k) {
        {
          var W = oi;
          oi++, H.current === null && (H.current = []);
          var me = H.isBatchingLegacy, Ee;
          try {
            if (H.isBatchingLegacy = !0, Ee = k(), !me && H.didScheduleLegacyUpdate) {
              var We = H.current;
              We !== null && (H.didScheduleLegacyUpdate = !1, uo(We));
            }
          } catch (rn) {
            throw si(W), rn;
          } finally {
            H.isBatchingLegacy = me;
          }
          if (Ee !== null && typeof Ee == "object" && typeof Ee.then == "function") {
            var Lt = Ee, nt = !1, jt = {
              then: function(rn, Nn) {
                nt = !0, Lt.then(function(er) {
                  si(W), oi === 0 ? Ys(er, rn, Nn) : rn(er);
                }, function(er) {
                  si(W), Nn(er);
                });
              }
            };
            return !Li && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              nt || (Li = !0, oe("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), jt;
          } else {
            var sn = Ee;
            if (si(W), oi === 0) {
              var xn = H.current;
              xn !== null && (uo(xn), H.current = null);
              var $n = {
                then: function(rn, Nn) {
                  H.current === null ? (H.current = [], Ys(sn, rn, Nn)) : rn(sn);
                }
              };
              return $n;
            } else {
              var Ln = {
                then: function(rn, Nn) {
                  rn(sn);
                }
              };
              return Ln;
            }
          }
        }
      }
      function si(k) {
        k !== oi - 1 && oe("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), oi = k;
      }
      function Ys(k, W, me) {
        {
          var Ee = H.current;
          if (Ee !== null)
            try {
              uo(Ee), yp(function() {
                Ee.length === 0 ? (H.current = null, W(k)) : Ys(k, W, me);
              });
            } catch (We) {
              me(We);
            }
          else
            W(k);
        }
      }
      var Ws = !1;
      function uo(k) {
        if (!Ws) {
          Ws = !0;
          var W = 0;
          try {
            for (; W < k.length; W++) {
              var me = k[W];
              do
                me = me(!0);
              while (me !== null);
            }
            k.length = 0;
          } catch (Ee) {
            throw k = k.slice(W + 1), Ee;
          } finally {
            Ws = !1;
          }
        }
      }
      var Qo = da, Bs = Gu, Gs = Bo, Ni = {
        map: On,
        forEach: mr,
        count: Fn,
        toArray: lr,
        only: Zn
      };
      a.Children = Ni, a.Component = be, a.Fragment = m, a.Profiler = g, a.PureComponent = Fe, a.StrictMode = v, a.Suspense = b, a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = le, a.act = tl, a.cloneElement = Bs, a.createContext = Di, a.createElement = Qo, a.createFactory = Gs, a.createRef = vt, a.forwardRef = Nr, a.isValidElement = en, a.lazy = Wa, a.memo = et, a.startTransition = Qu, a.unstable_act = tl, a.useCallback = qn, a.useContext = Yt, a.useDebugValue = Wt, a.useDeferredValue = ua, a.useEffect = Gn, a.useId = ki, a.useImperativeHandle = sa, a.useInsertionEffect = gn, a.useLayoutEffect = En, a.useMemo = _a, a.useReducer = tn, a.useRef = Zt, a.useState = Ht, a.useSyncExternalStore = Oi, a.useTransition = Qt, a.version = s, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(Lh, Lh.exports)), Lh.exports;
}
var AC;
function qh() {
  return AC || (AC = 1, process.env.NODE_ENV === "production" ? V0.exports = hz() : V0.exports = mz()), V0.exports;
}
var LC;
function yz() {
  if (LC) return _h;
  LC = 1;
  var t = qh(), a = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.fragment"), f = Object.prototype.hasOwnProperty, p = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function v(g, S, E) {
    var C, b = {}, R = null, D = null;
    E !== void 0 && (R = "" + E), S.key !== void 0 && (R = "" + S.key), S.ref !== void 0 && (D = S.ref);
    for (C in S) f.call(S, C) && !m.hasOwnProperty(C) && (b[C] = S[C]);
    if (g && g.defaultProps) for (C in S = g.defaultProps, S) b[C] === void 0 && (b[C] = S[C]);
    return { $$typeof: a, type: g, key: R, ref: D, props: b, _owner: p.current };
  }
  return _h.Fragment = s, _h.jsx = v, _h.jsxs = v, _h;
}
var Dh = {};
var NC;
function gz() {
  return NC || (NC = 1, process.env.NODE_ENV !== "production" && (function() {
    var t = qh(), a = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.portal"), f = /* @__PURE__ */ Symbol.for("react.fragment"), p = /* @__PURE__ */ Symbol.for("react.strict_mode"), m = /* @__PURE__ */ Symbol.for("react.profiler"), v = /* @__PURE__ */ Symbol.for("react.provider"), g = /* @__PURE__ */ Symbol.for("react.context"), S = /* @__PURE__ */ Symbol.for("react.forward_ref"), E = /* @__PURE__ */ Symbol.for("react.suspense"), C = /* @__PURE__ */ Symbol.for("react.suspense_list"), b = /* @__PURE__ */ Symbol.for("react.memo"), R = /* @__PURE__ */ Symbol.for("react.lazy"), D = /* @__PURE__ */ Symbol.for("react.offscreen"), _ = Symbol.iterator, A = "@@iterator";
    function L(B) {
      if (B === null || typeof B != "object")
        return null;
      var ke = _ && B[_] || B[A];
      return typeof ke == "function" ? ke : null;
    }
    var U = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function q(B) {
      {
        for (var ke = arguments.length, et = new Array(ke > 1 ? ke - 1 : 0), ut = 1; ut < ke; ut++)
          et[ut - 1] = arguments[ut];
        $("error", B, et);
      }
    }
    function $(B, ke, et) {
      {
        var ut = U.ReactDebugCurrentFrame, Yt = ut.getStackAddendum();
        Yt !== "" && (ke += "%s", et = et.concat([Yt]));
        var Ht = et.map(function(tn) {
          return String(tn);
        });
        Ht.unshift("Warning: " + ke), Function.prototype.apply.call(console[B], console, Ht);
      }
    }
    var F = !1, H = !1, V = !1, Y = !1, ie = !1, Q;
    Q = /* @__PURE__ */ Symbol.for("react.module.reference");
    function P(B) {
      return !!(typeof B == "string" || typeof B == "function" || B === f || B === m || ie || B === p || B === E || B === C || Y || B === D || F || H || V || typeof B == "object" && B !== null && (B.$$typeof === R || B.$$typeof === b || B.$$typeof === v || B.$$typeof === g || B.$$typeof === S || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      B.$$typeof === Q || B.getModuleId !== void 0));
    }
    function ne(B, ke, et) {
      var ut = B.displayName;
      if (ut)
        return ut;
      var Yt = ke.displayName || ke.name || "";
      return Yt !== "" ? et + "(" + Yt + ")" : et;
    }
    function re(B) {
      return B.displayName || "Context";
    }
    function G(B) {
      if (B == null)
        return null;
      if (typeof B.tag == "number" && q("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof B == "function")
        return B.displayName || B.name || null;
      if (typeof B == "string")
        return B;
      switch (B) {
        case f:
          return "Fragment";
        case s:
          return "Portal";
        case m:
          return "Profiler";
        case p:
          return "StrictMode";
        case E:
          return "Suspense";
        case C:
          return "SuspenseList";
      }
      if (typeof B == "object")
        switch (B.$$typeof) {
          case g:
            var ke = B;
            return re(ke) + ".Consumer";
          case v:
            var et = B;
            return re(et._context) + ".Provider";
          case S:
            return ne(B, B.render, "ForwardRef");
          case b:
            var ut = B.displayName || null;
            return ut !== null ? ut : G(B.type) || "Memo";
          case R: {
            var Yt = B, Ht = Yt._payload, tn = Yt._init;
            try {
              return G(tn(Ht));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Z = Object.assign, le = 0, de, oe, ae, fe, ve, j, X;
    function xe() {
    }
    xe.__reactDisabledLog = !0;
    function be() {
      {
        if (le === 0) {
          de = console.log, oe = console.info, ae = console.warn, fe = console.error, ve = console.group, j = console.groupCollapsed, X = console.groupEnd;
          var B = {
            configurable: !0,
            enumerable: !0,
            value: xe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: B,
            log: B,
            warn: B,
            error: B,
            group: B,
            groupCollapsed: B,
            groupEnd: B
          });
        }
        le++;
      }
    }
    function ze() {
      {
        if (le--, le === 0) {
          var B = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Z({}, B, {
              value: de
            }),
            info: Z({}, B, {
              value: oe
            }),
            warn: Z({}, B, {
              value: ae
            }),
            error: Z({}, B, {
              value: fe
            }),
            group: Z({}, B, {
              value: ve
            }),
            groupCollapsed: Z({}, B, {
              value: j
            }),
            groupEnd: Z({}, B, {
              value: X
            })
          });
        }
        le < 0 && q("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var _e = U.ReactCurrentDispatcher, Ve;
    function Be(B, ke, et) {
      {
        if (Ve === void 0)
          try {
            throw Error();
          } catch (Yt) {
            var ut = Yt.stack.trim().match(/\n( *(at )?)/);
            Ve = ut && ut[1] || "";
          }
        return `
` + Ve + B;
      }
    }
    var Fe = !1, ct;
    {
      var vt = typeof WeakMap == "function" ? WeakMap : Map;
      ct = new vt();
    }
    function Le(B, ke) {
      if (!B || Fe)
        return "";
      {
        var et = ct.get(B);
        if (et !== void 0)
          return et;
      }
      var ut;
      Fe = !0;
      var Yt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Ht;
      Ht = _e.current, _e.current = null, be();
      try {
        if (ke) {
          var tn = function() {
            throw Error();
          };
          if (Object.defineProperty(tn.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(tn, []);
            } catch (Wt) {
              ut = Wt;
            }
            Reflect.construct(B, [], tn);
          } else {
            try {
              tn.call();
            } catch (Wt) {
              ut = Wt;
            }
            B.call(tn.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Wt) {
            ut = Wt;
          }
          B();
        }
      } catch (Wt) {
        if (Wt && ut && typeof Wt.stack == "string") {
          for (var Zt = Wt.stack.split(`
`), Gn = ut.stack.split(`
`), gn = Zt.length - 1, En = Gn.length - 1; gn >= 1 && En >= 0 && Zt[gn] !== Gn[En]; )
            En--;
          for (; gn >= 1 && En >= 0; gn--, En--)
            if (Zt[gn] !== Gn[En]) {
              if (gn !== 1 || En !== 1)
                do
                  if (gn--, En--, En < 0 || Zt[gn] !== Gn[En]) {
                    var qn = `
` + Zt[gn].replace(" at new ", " at ");
                    return B.displayName && qn.includes("<anonymous>") && (qn = qn.replace("<anonymous>", B.displayName)), typeof B == "function" && ct.set(B, qn), qn;
                  }
                while (gn >= 1 && En >= 0);
              break;
            }
        }
      } finally {
        Fe = !1, _e.current = Ht, ze(), Error.prepareStackTrace = Yt;
      }
      var _a = B ? B.displayName || B.name : "", sa = _a ? Be(_a) : "";
      return typeof B == "function" && ct.set(B, sa), sa;
    }
    function Je(B, ke, et) {
      return Le(B, !1);
    }
    function Re(B) {
      var ke = B.prototype;
      return !!(ke && ke.isReactComponent);
    }
    function Ye(B, ke, et) {
      if (B == null)
        return "";
      if (typeof B == "function")
        return Le(B, Re(B));
      if (typeof B == "string")
        return Be(B);
      switch (B) {
        case E:
          return Be("Suspense");
        case C:
          return Be("SuspenseList");
      }
      if (typeof B == "object")
        switch (B.$$typeof) {
          case S:
            return Je(B.render);
          case b:
            return Ye(B.type, ke, et);
          case R: {
            var ut = B, Yt = ut._payload, Ht = ut._init;
            try {
              return Ye(Ht(Yt), ke, et);
            } catch {
            }
          }
        }
      return "";
    }
    var Pe = Object.prototype.hasOwnProperty, $e = {}, Xe = U.ReactDebugCurrentFrame;
    function Ct(B) {
      if (B) {
        var ke = B._owner, et = Ye(B.type, B._source, ke ? ke.type : null);
        Xe.setExtraStackFrame(et);
      } else
        Xe.setExtraStackFrame(null);
    }
    function Te(B, ke, et, ut, Yt) {
      {
        var Ht = Function.call.bind(Pe);
        for (var tn in B)
          if (Ht(B, tn)) {
            var Zt = void 0;
            try {
              if (typeof B[tn] != "function") {
                var Gn = Error((ut || "React class") + ": " + et + " type `" + tn + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof B[tn] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Gn.name = "Invariant Violation", Gn;
              }
              Zt = B[tn](ke, tn, ut, et, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (gn) {
              Zt = gn;
            }
            Zt && !(Zt instanceof Error) && (Ct(Yt), q("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ut || "React class", et, tn, typeof Zt), Ct(null)), Zt instanceof Error && !(Zt.message in $e) && ($e[Zt.message] = !0, Ct(Yt), q("Failed %s type: %s", et, Zt.message), Ct(null));
          }
      }
    }
    var Se = Array.isArray;
    function Ke(B) {
      return Se(B);
    }
    function Ot(B) {
      {
        var ke = typeof Symbol == "function" && Symbol.toStringTag, et = ke && B[Symbol.toStringTag] || B.constructor.name || "Object";
        return et;
      }
    }
    function ot(B) {
      try {
        return wt(B), !1;
      } catch {
        return !0;
      }
    }
    function wt(B) {
      return "" + B;
    }
    function at(B) {
      if (ot(B))
        return q("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ot(B)), wt(B);
    }
    var mt = U.ReactCurrentOwner, It = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, nn, De;
    function He(B) {
      if (Pe.call(B, "ref")) {
        var ke = Object.getOwnPropertyDescriptor(B, "ref").get;
        if (ke && ke.isReactWarning)
          return !1;
      }
      return B.ref !== void 0;
    }
    function rt(B) {
      if (Pe.call(B, "key")) {
        var ke = Object.getOwnPropertyDescriptor(B, "key").get;
        if (ke && ke.isReactWarning)
          return !1;
      }
      return B.key !== void 0;
    }
    function Ze(B, ke) {
      typeof B.ref == "string" && mt.current;
    }
    function qt(B, ke) {
      {
        var et = function() {
          nn || (nn = !0, q("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ke));
        };
        et.isReactWarning = !0, Object.defineProperty(B, "key", {
          get: et,
          configurable: !0
        });
      }
    }
    function en(B, ke) {
      {
        var et = function() {
          De || (De = !0, q("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ke));
        };
        et.isReactWarning = !0, Object.defineProperty(B, "ref", {
          get: et,
          configurable: !0
        });
      }
    }
    var Tt = function(B, ke, et, ut, Yt, Ht, tn) {
      var Zt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: B,
        key: ke,
        ref: et,
        props: tn,
        // Record the component responsible for creating this element.
        _owner: Ht
      };
      return Zt._store = {}, Object.defineProperty(Zt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Zt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ut
      }), Object.defineProperty(Zt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Yt
      }), Object.freeze && (Object.freeze(Zt.props), Object.freeze(Zt)), Zt;
    };
    function Qe(B, ke, et, ut, Yt) {
      {
        var Ht, tn = {}, Zt = null, Gn = null;
        et !== void 0 && (at(et), Zt = "" + et), rt(ke) && (at(ke.key), Zt = "" + ke.key), He(ke) && (Gn = ke.ref, Ze(ke, Yt));
        for (Ht in ke)
          Pe.call(ke, Ht) && !It.hasOwnProperty(Ht) && (tn[Ht] = ke[Ht]);
        if (B && B.defaultProps) {
          var gn = B.defaultProps;
          for (Ht in gn)
            tn[Ht] === void 0 && (tn[Ht] = gn[Ht]);
        }
        if (Zt || Gn) {
          var En = typeof B == "function" ? B.displayName || B.name || "Unknown" : B;
          Zt && qt(tn, En), Gn && en(tn, En);
        }
        return Tt(B, Zt, Gn, Yt, ut, mt.current, tn);
      }
    }
    var gt = U.ReactCurrentOwner, yt = U.ReactDebugCurrentFrame;
    function At(B) {
      if (B) {
        var ke = B._owner, et = Ye(B.type, B._source, ke ? ke.type : null);
        yt.setExtraStackFrame(et);
      } else
        yt.setExtraStackFrame(null);
    }
    var $t;
    $t = !1;
    function Ge(B) {
      return typeof B == "object" && B !== null && B.$$typeof === a;
    }
    function fn() {
      {
        if (gt.current) {
          var B = G(gt.current.type);
          if (B)
            return `

Check the render method of \`` + B + "`.";
        }
        return "";
      }
    }
    function On(B) {
      return "";
    }
    var Fn = {};
    function mr(B) {
      {
        var ke = fn();
        if (!ke) {
          var et = typeof B == "string" ? B : B.displayName || B.name;
          et && (ke = `

Check the top-level render call using <` + et + ">.");
        }
        return ke;
      }
    }
    function lr(B, ke) {
      {
        if (!B._store || B._store.validated || B.key != null)
          return;
        B._store.validated = !0;
        var et = mr(ke);
        if (Fn[et])
          return;
        Fn[et] = !0;
        var ut = "";
        B && B._owner && B._owner !== gt.current && (ut = " It was passed a child from " + G(B._owner.type) + "."), At(B), q('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', et, ut), At(null);
      }
    }
    function Zn(B, ke) {
      {
        if (typeof B != "object")
          return;
        if (Ke(B))
          for (var et = 0; et < B.length; et++) {
            var ut = B[et];
            Ge(ut) && lr(ut, ke);
          }
        else if (Ge(B))
          B._store && (B._store.validated = !0);
        else if (B) {
          var Yt = L(B);
          if (typeof Yt == "function" && Yt !== B.entries)
            for (var Ht = Yt.call(B), tn; !(tn = Ht.next()).done; )
              Ge(tn.value) && lr(tn.value, ke);
        }
      }
    }
    function Di(B) {
      {
        var ke = B.type;
        if (ke == null || typeof ke == "string")
          return;
        var et;
        if (typeof ke == "function")
          et = ke.propTypes;
        else if (typeof ke == "object" && (ke.$$typeof === S || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        ke.$$typeof === b))
          et = ke.propTypes;
        else
          return;
        if (et) {
          var ut = G(ke);
          Te(et, B.props, "prop", ut, B);
        } else if (ke.PropTypes !== void 0 && !$t) {
          $t = !0;
          var Yt = G(ke);
          q("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Yt || "Unknown");
        }
        typeof ke.getDefaultProps == "function" && !ke.getDefaultProps.isReactClassApproved && q("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Rr(B) {
      {
        for (var ke = Object.keys(B.props), et = 0; et < ke.length; et++) {
          var ut = ke[et];
          if (ut !== "children" && ut !== "key") {
            At(B), q("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ut), At(null);
            break;
          }
        }
        B.ref !== null && (At(B), q("Invalid attribute `ref` supplied to `React.Fragment`."), At(null));
      }
    }
    var Lr = {};
    function In(B, ke, et, ut, Yt, Ht) {
      {
        var tn = P(B);
        if (!tn) {
          var Zt = "";
          (B === void 0 || typeof B == "object" && B !== null && Object.keys(B).length === 0) && (Zt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Gn = On();
          Gn ? Zt += Gn : Zt += fn();
          var gn;
          B === null ? gn = "null" : Ke(B) ? gn = "array" : B !== void 0 && B.$$typeof === a ? (gn = "<" + (G(B.type) || "Unknown") + " />", Zt = " Did you accidentally export a JSX literal instead of a component?") : gn = typeof B, q("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", gn, Zt);
        }
        var En = Qe(B, ke, et, Yt, Ht);
        if (En == null)
          return En;
        if (tn) {
          var qn = ke.children;
          if (qn !== void 0)
            if (ut)
              if (Ke(qn)) {
                for (var _a = 0; _a < qn.length; _a++)
                  Zn(qn[_a], B);
                Object.freeze && Object.freeze(qn);
              } else
                q("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Zn(qn, B);
        }
        if (Pe.call(ke, "key")) {
          var sa = G(B), Wt = Object.keys(ke).filter(function(ki) {
            return ki !== "key";
          }), Qt = Wt.length > 0 ? "{key: someKey, " + Wt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Lr[sa + Qt]) {
            var ua = Wt.length > 0 ? "{" + Wt.join(": ..., ") + ": ...}" : "{}";
            q(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Qt, sa, ua, sa), Lr[sa + Qt] = !0;
          }
        }
        return B === f ? Rr(En) : Di(En), En;
      }
    }
    function Ma(B, ke, et) {
      return In(B, ke, et, !0);
    }
    function oa(B, ke, et) {
      return In(B, ke, et, !1);
    }
    var Wa = oa, Nr = Ma;
    Dh.Fragment = f, Dh.jsx = Wa, Dh.jsxs = Nr;
  })()), Dh;
}
var zC;
function Sz() {
  return zC || (zC = 1, process.env.NODE_ENV === "production" ? H0.exports = yz() : H0.exports = gz()), H0.exports;
}
var Oe = Sz(), ia = qh(), rp = {}, I0 = { exports: {} }, bi = {}, q0 = { exports: {} }, q2 = {};
var UC;
function xz() {
  return UC || (UC = 1, (function(t) {
    function a(ae, fe) {
      var ve = ae.length;
      ae.push(fe);
      e: for (; 0 < ve; ) {
        var j = ve - 1 >>> 1, X = ae[j];
        if (0 < p(X, fe)) ae[j] = fe, ae[ve] = X, ve = j;
        else break e;
      }
    }
    function s(ae) {
      return ae.length === 0 ? null : ae[0];
    }
    function f(ae) {
      if (ae.length === 0) return null;
      var fe = ae[0], ve = ae.pop();
      if (ve !== fe) {
        ae[0] = ve;
        e: for (var j = 0, X = ae.length, xe = X >>> 1; j < xe; ) {
          var be = 2 * (j + 1) - 1, ze = ae[be], _e = be + 1, Ve = ae[_e];
          if (0 > p(ze, ve)) _e < X && 0 > p(Ve, ze) ? (ae[j] = Ve, ae[_e] = ve, j = _e) : (ae[j] = ze, ae[be] = ve, j = be);
          else if (_e < X && 0 > p(Ve, ve)) ae[j] = Ve, ae[_e] = ve, j = _e;
          else break e;
        }
      }
      return fe;
    }
    function p(ae, fe) {
      var ve = ae.sortIndex - fe.sortIndex;
      return ve !== 0 ? ve : ae.id - fe.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      t.unstable_now = function() {
        return m.now();
      };
    } else {
      var v = Date, g = v.now();
      t.unstable_now = function() {
        return v.now() - g;
      };
    }
    var S = [], E = [], C = 1, b = null, R = 3, D = !1, _ = !1, A = !1, L = typeof setTimeout == "function" ? setTimeout : null, U = typeof clearTimeout == "function" ? clearTimeout : null, q = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function $(ae) {
      for (var fe = s(E); fe !== null; ) {
        if (fe.callback === null) f(E);
        else if (fe.startTime <= ae) f(E), fe.sortIndex = fe.expirationTime, a(S, fe);
        else break;
        fe = s(E);
      }
    }
    function F(ae) {
      if (A = !1, $(ae), !_) if (s(S) !== null) _ = !0, de(H);
      else {
        var fe = s(E);
        fe !== null && oe(F, fe.startTime - ae);
      }
    }
    function H(ae, fe) {
      _ = !1, A && (A = !1, U(ie), ie = -1), D = !0;
      var ve = R;
      try {
        for ($(fe), b = s(S); b !== null && (!(b.expirationTime > fe) || ae && !ne()); ) {
          var j = b.callback;
          if (typeof j == "function") {
            b.callback = null, R = b.priorityLevel;
            var X = j(b.expirationTime <= fe);
            fe = t.unstable_now(), typeof X == "function" ? b.callback = X : b === s(S) && f(S), $(fe);
          } else f(S);
          b = s(S);
        }
        if (b !== null) var xe = !0;
        else {
          var be = s(E);
          be !== null && oe(F, be.startTime - fe), xe = !1;
        }
        return xe;
      } finally {
        b = null, R = ve, D = !1;
      }
    }
    var V = !1, Y = null, ie = -1, Q = 5, P = -1;
    function ne() {
      return !(t.unstable_now() - P < Q);
    }
    function re() {
      if (Y !== null) {
        var ae = t.unstable_now();
        P = ae;
        var fe = !0;
        try {
          fe = Y(!0, ae);
        } finally {
          fe ? G() : (V = !1, Y = null);
        }
      } else V = !1;
    }
    var G;
    if (typeof q == "function") G = function() {
      q(re);
    };
    else if (typeof MessageChannel < "u") {
      var Z = new MessageChannel(), le = Z.port2;
      Z.port1.onmessage = re, G = function() {
        le.postMessage(null);
      };
    } else G = function() {
      L(re, 0);
    };
    function de(ae) {
      Y = ae, V || (V = !0, G());
    }
    function oe(ae, fe) {
      ie = L(function() {
        ae(t.unstable_now());
      }, fe);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(ae) {
      ae.callback = null;
    }, t.unstable_continueExecution = function() {
      _ || D || (_ = !0, de(H));
    }, t.unstable_forceFrameRate = function(ae) {
      0 > ae || 125 < ae ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Q = 0 < ae ? Math.floor(1e3 / ae) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return R;
    }, t.unstable_getFirstCallbackNode = function() {
      return s(S);
    }, t.unstable_next = function(ae) {
      switch (R) {
        case 1:
        case 2:
        case 3:
          var fe = 3;
          break;
        default:
          fe = R;
      }
      var ve = R;
      R = fe;
      try {
        return ae();
      } finally {
        R = ve;
      }
    }, t.unstable_pauseExecution = function() {
    }, t.unstable_requestPaint = function() {
    }, t.unstable_runWithPriority = function(ae, fe) {
      switch (ae) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          ae = 3;
      }
      var ve = R;
      R = ae;
      try {
        return fe();
      } finally {
        R = ve;
      }
    }, t.unstable_scheduleCallback = function(ae, fe, ve) {
      var j = t.unstable_now();
      switch (typeof ve == "object" && ve !== null ? (ve = ve.delay, ve = typeof ve == "number" && 0 < ve ? j + ve : j) : ve = j, ae) {
        case 1:
          var X = -1;
          break;
        case 2:
          X = 250;
          break;
        case 5:
          X = 1073741823;
          break;
        case 4:
          X = 1e4;
          break;
        default:
          X = 5e3;
      }
      return X = ve + X, ae = { id: C++, callback: fe, priorityLevel: ae, startTime: ve, expirationTime: X, sortIndex: -1 }, ve > j ? (ae.sortIndex = ve, a(E, ae), s(S) === null && ae === s(E) && (A ? (U(ie), ie = -1) : A = !0, oe(F, ve - j))) : (ae.sortIndex = X, a(S, ae), _ || D || (_ = !0, de(H))), ae;
    }, t.unstable_shouldYield = ne, t.unstable_wrapCallback = function(ae) {
      var fe = R;
      return function() {
        var ve = R;
        R = fe;
        try {
          return ae.apply(this, arguments);
        } finally {
          R = ve;
        }
      };
    };
  })(q2)), q2;
}
var Y2 = {};
var jC;
function Ez() {
  return jC || (jC = 1, (function(t) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var a = !1, s = 5;
      function f(De, He) {
        var rt = De.length;
        De.push(He), v(De, He, rt);
      }
      function p(De) {
        return De.length === 0 ? null : De[0];
      }
      function m(De) {
        if (De.length === 0)
          return null;
        var He = De[0], rt = De.pop();
        return rt !== He && (De[0] = rt, g(De, rt, 0)), He;
      }
      function v(De, He, rt) {
        for (var Ze = rt; Ze > 0; ) {
          var qt = Ze - 1 >>> 1, en = De[qt];
          if (S(en, He) > 0)
            De[qt] = He, De[Ze] = en, Ze = qt;
          else
            return;
        }
      }
      function g(De, He, rt) {
        for (var Ze = rt, qt = De.length, en = qt >>> 1; Ze < en; ) {
          var Tt = (Ze + 1) * 2 - 1, Qe = De[Tt], gt = Tt + 1, yt = De[gt];
          if (S(Qe, He) < 0)
            gt < qt && S(yt, Qe) < 0 ? (De[Ze] = yt, De[gt] = He, Ze = gt) : (De[Ze] = Qe, De[Tt] = He, Ze = Tt);
          else if (gt < qt && S(yt, He) < 0)
            De[Ze] = yt, De[gt] = He, Ze = gt;
          else
            return;
        }
      }
      function S(De, He) {
        var rt = De.sortIndex - He.sortIndex;
        return rt !== 0 ? rt : De.id - He.id;
      }
      var E = 1, C = 2, b = 3, R = 4, D = 5;
      function _(De, He) {
      }
      var A = typeof performance == "object" && typeof performance.now == "function";
      if (A) {
        var L = performance;
        t.unstable_now = function() {
          return L.now();
        };
      } else {
        var U = Date, q = U.now();
        t.unstable_now = function() {
          return U.now() - q;
        };
      }
      var $ = 1073741823, F = -1, H = 250, V = 5e3, Y = 1e4, ie = $, Q = [], P = [], ne = 1, re = null, G = b, Z = !1, le = !1, de = !1, oe = typeof setTimeout == "function" ? setTimeout : null, ae = typeof clearTimeout == "function" ? clearTimeout : null, fe = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ve(De) {
        for (var He = p(P); He !== null; ) {
          if (He.callback === null)
            m(P);
          else if (He.startTime <= De)
            m(P), He.sortIndex = He.expirationTime, f(Q, He);
          else
            return;
          He = p(P);
        }
      }
      function j(De) {
        if (de = !1, ve(De), !le)
          if (p(Q) !== null)
            le = !0, wt(X);
          else {
            var He = p(P);
            He !== null && at(j, He.startTime - De);
          }
      }
      function X(De, He) {
        le = !1, de && (de = !1, mt()), Z = !0;
        var rt = G;
        try {
          var Ze;
          if (!a) return xe(De, He);
        } finally {
          re = null, G = rt, Z = !1;
        }
      }
      function xe(De, He) {
        var rt = He;
        for (ve(rt), re = p(Q); re !== null && !(re.expirationTime > rt && (!De || Xe())); ) {
          var Ze = re.callback;
          if (typeof Ze == "function") {
            re.callback = null, G = re.priorityLevel;
            var qt = re.expirationTime <= rt, en = Ze(qt);
            rt = t.unstable_now(), typeof en == "function" ? re.callback = en : re === p(Q) && m(Q), ve(rt);
          } else
            m(Q);
          re = p(Q);
        }
        if (re !== null)
          return !0;
        var Tt = p(P);
        return Tt !== null && at(j, Tt.startTime - rt), !1;
      }
      function be(De, He) {
        switch (De) {
          case E:
          case C:
          case b:
          case R:
          case D:
            break;
          default:
            De = b;
        }
        var rt = G;
        G = De;
        try {
          return He();
        } finally {
          G = rt;
        }
      }
      function ze(De) {
        var He;
        switch (G) {
          case E:
          case C:
          case b:
            He = b;
            break;
          default:
            He = G;
            break;
        }
        var rt = G;
        G = He;
        try {
          return De();
        } finally {
          G = rt;
        }
      }
      function _e(De) {
        var He = G;
        return function() {
          var rt = G;
          G = He;
          try {
            return De.apply(this, arguments);
          } finally {
            G = rt;
          }
        };
      }
      function Ve(De, He, rt) {
        var Ze = t.unstable_now(), qt;
        if (typeof rt == "object" && rt !== null) {
          var en = rt.delay;
          typeof en == "number" && en > 0 ? qt = Ze + en : qt = Ze;
        } else
          qt = Ze;
        var Tt;
        switch (De) {
          case E:
            Tt = F;
            break;
          case C:
            Tt = H;
            break;
          case D:
            Tt = ie;
            break;
          case R:
            Tt = Y;
            break;
          case b:
          default:
            Tt = V;
            break;
        }
        var Qe = qt + Tt, gt = {
          id: ne++,
          callback: He,
          priorityLevel: De,
          startTime: qt,
          expirationTime: Qe,
          sortIndex: -1
        };
        return qt > Ze ? (gt.sortIndex = qt, f(P, gt), p(Q) === null && gt === p(P) && (de ? mt() : de = !0, at(j, qt - Ze))) : (gt.sortIndex = Qe, f(Q, gt), !le && !Z && (le = !0, wt(X))), gt;
      }
      function Be() {
      }
      function Fe() {
        !le && !Z && (le = !0, wt(X));
      }
      function ct() {
        return p(Q);
      }
      function vt(De) {
        De.callback = null;
      }
      function Le() {
        return G;
      }
      var Je = !1, Re = null, Ye = -1, Pe = s, $e = -1;
      function Xe() {
        var De = t.unstable_now() - $e;
        return !(De < Pe);
      }
      function Ct() {
      }
      function Te(De) {
        if (De < 0 || De > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        De > 0 ? Pe = Math.floor(1e3 / De) : Pe = s;
      }
      var Se = function() {
        if (Re !== null) {
          var De = t.unstable_now();
          $e = De;
          var He = !0, rt = !0;
          try {
            rt = Re(He, De);
          } finally {
            rt ? Ke() : (Je = !1, Re = null);
          }
        } else
          Je = !1;
      }, Ke;
      if (typeof fe == "function")
        Ke = function() {
          fe(Se);
        };
      else if (typeof MessageChannel < "u") {
        var Ot = new MessageChannel(), ot = Ot.port2;
        Ot.port1.onmessage = Se, Ke = function() {
          ot.postMessage(null);
        };
      } else
        Ke = function() {
          oe(Se, 0);
        };
      function wt(De) {
        Re = De, Je || (Je = !0, Ke());
      }
      function at(De, He) {
        Ye = oe(function() {
          De(t.unstable_now());
        }, He);
      }
      function mt() {
        ae(Ye), Ye = -1;
      }
      var It = Ct, nn = null;
      t.unstable_IdlePriority = D, t.unstable_ImmediatePriority = E, t.unstable_LowPriority = R, t.unstable_NormalPriority = b, t.unstable_Profiling = nn, t.unstable_UserBlockingPriority = C, t.unstable_cancelCallback = vt, t.unstable_continueExecution = Fe, t.unstable_forceFrameRate = Te, t.unstable_getCurrentPriorityLevel = Le, t.unstable_getFirstCallbackNode = ct, t.unstable_next = ze, t.unstable_pauseExecution = Be, t.unstable_requestPaint = It, t.unstable_runWithPriority = be, t.unstable_scheduleCallback = Ve, t.unstable_shouldYield = Xe, t.unstable_wrapCallback = _e, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(Y2)), Y2;
}
var FC;
function mT() {
  return FC || (FC = 1, process.env.NODE_ENV === "production" ? q0.exports = xz() : q0.exports = Ez()), q0.exports;
}
var PC;
function wz() {
  if (PC) return bi;
  PC = 1;
  var t = qh(), a = mT();
  function s(r) {
    for (var i = "https://reactjs.org/docs/error-decoder.html?invariant=" + r, u = 1; u < arguments.length; u++) i += "&args[]=" + encodeURIComponent(arguments[u]);
    return "Minified React error #" + r + "; visit " + i + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var f = /* @__PURE__ */ new Set(), p = {};
  function m(r, i) {
    v(r, i), v(r + "Capture", i);
  }
  function v(r, i) {
    for (p[r] = i, r = 0; r < i.length; r++) f.add(i[r]);
  }
  var g = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), S = Object.prototype.hasOwnProperty, E = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, C = {}, b = {};
  function R(r) {
    return S.call(b, r) ? !0 : S.call(C, r) ? !1 : E.test(r) ? b[r] = !0 : (C[r] = !0, !1);
  }
  function D(r, i, u, d) {
    if (u !== null && u.type === 0) return !1;
    switch (typeof i) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return d ? !1 : u !== null ? !u.acceptsBooleans : (r = r.toLowerCase().slice(0, 5), r !== "data-" && r !== "aria-");
      default:
        return !1;
    }
  }
  function _(r, i, u, d) {
    if (i === null || typeof i > "u" || D(r, i, u, d)) return !0;
    if (d) return !1;
    if (u !== null) switch (u.type) {
      case 3:
        return !i;
      case 4:
        return i === !1;
      case 5:
        return isNaN(i);
      case 6:
        return isNaN(i) || 1 > i;
    }
    return !1;
  }
  function A(r, i, u, d, y, w, O) {
    this.acceptsBooleans = i === 2 || i === 3 || i === 4, this.attributeName = d, this.attributeNamespace = y, this.mustUseProperty = u, this.propertyName = r, this.type = i, this.sanitizeURL = w, this.removeEmptyString = O;
  }
  var L = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(r) {
    L[r] = new A(r, 0, !1, r, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(r) {
    var i = r[0];
    L[i] = new A(i, 1, !1, r[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(r) {
    L[r] = new A(r, 2, !1, r.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(r) {
    L[r] = new A(r, 2, !1, r, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(r) {
    L[r] = new A(r, 3, !1, r.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(r) {
    L[r] = new A(r, 3, !0, r, null, !1, !1);
  }), ["capture", "download"].forEach(function(r) {
    L[r] = new A(r, 4, !1, r, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(r) {
    L[r] = new A(r, 6, !1, r, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(r) {
    L[r] = new A(r, 5, !1, r.toLowerCase(), null, !1, !1);
  });
  var U = /[\-:]([a-z])/g;
  function q(r) {
    return r[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(r) {
    var i = r.replace(
      U,
      q
    );
    L[i] = new A(i, 1, !1, r, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(r) {
    var i = r.replace(U, q);
    L[i] = new A(i, 1, !1, r, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(r) {
    var i = r.replace(U, q);
    L[i] = new A(i, 1, !1, r, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(r) {
    L[r] = new A(r, 1, !1, r.toLowerCase(), null, !1, !1);
  }), L.xlinkHref = new A("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(r) {
    L[r] = new A(r, 1, !1, r.toLowerCase(), null, !0, !0);
  });
  function $(r, i, u, d) {
    var y = L.hasOwnProperty(i) ? L[i] : null;
    (y !== null ? y.type !== 0 : d || !(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (_(i, u, y, d) && (u = null), d || y === null ? R(i) && (u === null ? r.removeAttribute(i) : r.setAttribute(i, "" + u)) : y.mustUseProperty ? r[y.propertyName] = u === null ? y.type === 3 ? !1 : "" : u : (i = y.attributeName, d = y.attributeNamespace, u === null ? r.removeAttribute(i) : (y = y.type, u = y === 3 || y === 4 && u === !0 ? "" : "" + u, d ? r.setAttributeNS(d, i, u) : r.setAttribute(i, u))));
  }
  var F = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, H = /* @__PURE__ */ Symbol.for("react.element"), V = /* @__PURE__ */ Symbol.for("react.portal"), Y = /* @__PURE__ */ Symbol.for("react.fragment"), ie = /* @__PURE__ */ Symbol.for("react.strict_mode"), Q = /* @__PURE__ */ Symbol.for("react.profiler"), P = /* @__PURE__ */ Symbol.for("react.provider"), ne = /* @__PURE__ */ Symbol.for("react.context"), re = /* @__PURE__ */ Symbol.for("react.forward_ref"), G = /* @__PURE__ */ Symbol.for("react.suspense"), Z = /* @__PURE__ */ Symbol.for("react.suspense_list"), le = /* @__PURE__ */ Symbol.for("react.memo"), de = /* @__PURE__ */ Symbol.for("react.lazy"), oe = /* @__PURE__ */ Symbol.for("react.offscreen"), ae = Symbol.iterator;
  function fe(r) {
    return r === null || typeof r != "object" ? null : (r = ae && r[ae] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var ve = Object.assign, j;
  function X(r) {
    if (j === void 0) try {
      throw Error();
    } catch (u) {
      var i = u.stack.trim().match(/\n( *(at )?)/);
      j = i && i[1] || "";
    }
    return `
` + j + r;
  }
  var xe = !1;
  function be(r, i) {
    if (!r || xe) return "";
    xe = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (i) if (i = function() {
        throw Error();
      }, Object.defineProperty(i.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(i, []);
        } catch (ye) {
          var d = ye;
        }
        Reflect.construct(r, [], i);
      } else {
        try {
          i.call();
        } catch (ye) {
          d = ye;
        }
        r.call(i.prototype);
      }
      else {
        try {
          throw Error();
        } catch (ye) {
          d = ye;
        }
        r();
      }
    } catch (ye) {
      if (ye && d && typeof ye.stack == "string") {
        for (var y = ye.stack.split(`
`), w = d.stack.split(`
`), O = y.length - 1, I = w.length - 1; 1 <= O && 0 <= I && y[O] !== w[I]; ) I--;
        for (; 1 <= O && 0 <= I; O--, I--) if (y[O] !== w[I]) {
          if (O !== 1 || I !== 1)
            do
              if (O--, I--, 0 > I || y[O] !== w[I]) {
                var K = `
` + y[O].replace(" at new ", " at ");
                return r.displayName && K.includes("<anonymous>") && (K = K.replace("<anonymous>", r.displayName)), K;
              }
            while (1 <= O && 0 <= I);
          break;
        }
      }
    } finally {
      xe = !1, Error.prepareStackTrace = u;
    }
    return (r = r ? r.displayName || r.name : "") ? X(r) : "";
  }
  function ze(r) {
    switch (r.tag) {
      case 5:
        return X(r.type);
      case 16:
        return X("Lazy");
      case 13:
        return X("Suspense");
      case 19:
        return X("SuspenseList");
      case 0:
      case 2:
      case 15:
        return r = be(r.type, !1), r;
      case 11:
        return r = be(r.type.render, !1), r;
      case 1:
        return r = be(r.type, !0), r;
      default:
        return "";
    }
  }
  function _e(r) {
    if (r == null) return null;
    if (typeof r == "function") return r.displayName || r.name || null;
    if (typeof r == "string") return r;
    switch (r) {
      case Y:
        return "Fragment";
      case V:
        return "Portal";
      case Q:
        return "Profiler";
      case ie:
        return "StrictMode";
      case G:
        return "Suspense";
      case Z:
        return "SuspenseList";
    }
    if (typeof r == "object") switch (r.$$typeof) {
      case ne:
        return (r.displayName || "Context") + ".Consumer";
      case P:
        return (r._context.displayName || "Context") + ".Provider";
      case re:
        var i = r.render;
        return r = r.displayName, r || (r = i.displayName || i.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
      case le:
        return i = r.displayName || null, i !== null ? i : _e(r.type) || "Memo";
      case de:
        i = r._payload, r = r._init;
        try {
          return _e(r(i));
        } catch {
        }
    }
    return null;
  }
  function Ve(r) {
    var i = r.type;
    switch (r.tag) {
      case 24:
        return "Cache";
      case 9:
        return (i.displayName || "Context") + ".Consumer";
      case 10:
        return (i._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return r = i.render, r = r.displayName || r.name || "", i.displayName || (r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return i;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return _e(i);
      case 8:
        return i === ie ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof i == "function") return i.displayName || i.name || null;
        if (typeof i == "string") return i;
    }
    return null;
  }
  function Be(r) {
    switch (typeof r) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return r;
      case "object":
        return r;
      default:
        return "";
    }
  }
  function Fe(r) {
    var i = r.type;
    return (r = r.nodeName) && r.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
  }
  function ct(r) {
    var i = Fe(r) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(r.constructor.prototype, i), d = "" + r[i];
    if (!r.hasOwnProperty(i) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var y = u.get, w = u.set;
      return Object.defineProperty(r, i, { configurable: !0, get: function() {
        return y.call(this);
      }, set: function(O) {
        d = "" + O, w.call(this, O);
      } }), Object.defineProperty(r, i, { enumerable: u.enumerable }), { getValue: function() {
        return d;
      }, setValue: function(O) {
        d = "" + O;
      }, stopTracking: function() {
        r._valueTracker = null, delete r[i];
      } };
    }
  }
  function vt(r) {
    r._valueTracker || (r._valueTracker = ct(r));
  }
  function Le(r) {
    if (!r) return !1;
    var i = r._valueTracker;
    if (!i) return !0;
    var u = i.getValue(), d = "";
    return r && (d = Fe(r) ? r.checked ? "true" : "false" : r.value), r = d, r !== u ? (i.setValue(r), !0) : !1;
  }
  function Je(r) {
    if (r = r || (typeof document < "u" ? document : void 0), typeof r > "u") return null;
    try {
      return r.activeElement || r.body;
    } catch {
      return r.body;
    }
  }
  function Re(r, i) {
    var u = i.checked;
    return ve({}, i, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: u ?? r._wrapperState.initialChecked });
  }
  function Ye(r, i) {
    var u = i.defaultValue == null ? "" : i.defaultValue, d = i.checked != null ? i.checked : i.defaultChecked;
    u = Be(i.value != null ? i.value : u), r._wrapperState = { initialChecked: d, initialValue: u, controlled: i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null };
  }
  function Pe(r, i) {
    i = i.checked, i != null && $(r, "checked", i, !1);
  }
  function $e(r, i) {
    Pe(r, i);
    var u = Be(i.value), d = i.type;
    if (u != null) d === "number" ? (u === 0 && r.value === "" || r.value != u) && (r.value = "" + u) : r.value !== "" + u && (r.value = "" + u);
    else if (d === "submit" || d === "reset") {
      r.removeAttribute("value");
      return;
    }
    i.hasOwnProperty("value") ? Ct(r, i.type, u) : i.hasOwnProperty("defaultValue") && Ct(r, i.type, Be(i.defaultValue)), i.checked == null && i.defaultChecked != null && (r.defaultChecked = !!i.defaultChecked);
  }
  function Xe(r, i, u) {
    if (i.hasOwnProperty("value") || i.hasOwnProperty("defaultValue")) {
      var d = i.type;
      if (!(d !== "submit" && d !== "reset" || i.value !== void 0 && i.value !== null)) return;
      i = "" + r._wrapperState.initialValue, u || i === r.value || (r.value = i), r.defaultValue = i;
    }
    u = r.name, u !== "" && (r.name = ""), r.defaultChecked = !!r._wrapperState.initialChecked, u !== "" && (r.name = u);
  }
  function Ct(r, i, u) {
    (i !== "number" || Je(r.ownerDocument) !== r) && (u == null ? r.defaultValue = "" + r._wrapperState.initialValue : r.defaultValue !== "" + u && (r.defaultValue = "" + u));
  }
  var Te = Array.isArray;
  function Se(r, i, u, d) {
    if (r = r.options, i) {
      i = {};
      for (var y = 0; y < u.length; y++) i["$" + u[y]] = !0;
      for (u = 0; u < r.length; u++) y = i.hasOwnProperty("$" + r[u].value), r[u].selected !== y && (r[u].selected = y), y && d && (r[u].defaultSelected = !0);
    } else {
      for (u = "" + Be(u), i = null, y = 0; y < r.length; y++) {
        if (r[y].value === u) {
          r[y].selected = !0, d && (r[y].defaultSelected = !0);
          return;
        }
        i !== null || r[y].disabled || (i = r[y]);
      }
      i !== null && (i.selected = !0);
    }
  }
  function Ke(r, i) {
    if (i.dangerouslySetInnerHTML != null) throw Error(s(91));
    return ve({}, i, { value: void 0, defaultValue: void 0, children: "" + r._wrapperState.initialValue });
  }
  function Ot(r, i) {
    var u = i.value;
    if (u == null) {
      if (u = i.children, i = i.defaultValue, u != null) {
        if (i != null) throw Error(s(92));
        if (Te(u)) {
          if (1 < u.length) throw Error(s(93));
          u = u[0];
        }
        i = u;
      }
      i == null && (i = ""), u = i;
    }
    r._wrapperState = { initialValue: Be(u) };
  }
  function ot(r, i) {
    var u = Be(i.value), d = Be(i.defaultValue);
    u != null && (u = "" + u, u !== r.value && (r.value = u), i.defaultValue == null && r.defaultValue !== u && (r.defaultValue = u)), d != null && (r.defaultValue = "" + d);
  }
  function wt(r) {
    var i = r.textContent;
    i === r._wrapperState.initialValue && i !== "" && i !== null && (r.value = i);
  }
  function at(r) {
    switch (r) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function mt(r, i) {
    return r == null || r === "http://www.w3.org/1999/xhtml" ? at(i) : r === "http://www.w3.org/2000/svg" && i === "foreignObject" ? "http://www.w3.org/1999/xhtml" : r;
  }
  var It, nn = (function(r) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(i, u, d, y) {
      MSApp.execUnsafeLocalFunction(function() {
        return r(i, u, d, y);
      });
    } : r;
  })(function(r, i) {
    if (r.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in r) r.innerHTML = i;
    else {
      for (It = It || document.createElement("div"), It.innerHTML = "<svg>" + i.valueOf().toString() + "</svg>", i = It.firstChild; r.firstChild; ) r.removeChild(r.firstChild);
      for (; i.firstChild; ) r.appendChild(i.firstChild);
    }
  });
  function De(r, i) {
    if (i) {
      var u = r.firstChild;
      if (u && u === r.lastChild && u.nodeType === 3) {
        u.nodeValue = i;
        return;
      }
    }
    r.textContent = i;
  }
  var He = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, rt = ["Webkit", "ms", "Moz", "O"];
  Object.keys(He).forEach(function(r) {
    rt.forEach(function(i) {
      i = i + r.charAt(0).toUpperCase() + r.substring(1), He[i] = He[r];
    });
  });
  function Ze(r, i, u) {
    return i == null || typeof i == "boolean" || i === "" ? "" : u || typeof i != "number" || i === 0 || He.hasOwnProperty(r) && He[r] ? ("" + i).trim() : i + "px";
  }
  function qt(r, i) {
    r = r.style;
    for (var u in i) if (i.hasOwnProperty(u)) {
      var d = u.indexOf("--") === 0, y = Ze(u, i[u], d);
      u === "float" && (u = "cssFloat"), d ? r.setProperty(u, y) : r[u] = y;
    }
  }
  var en = ve({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Tt(r, i) {
    if (i) {
      if (en[r] && (i.children != null || i.dangerouslySetInnerHTML != null)) throw Error(s(137, r));
      if (i.dangerouslySetInnerHTML != null) {
        if (i.children != null) throw Error(s(60));
        if (typeof i.dangerouslySetInnerHTML != "object" || !("__html" in i.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (i.style != null && typeof i.style != "object") throw Error(s(62));
    }
  }
  function Qe(r, i) {
    if (r.indexOf("-") === -1) return typeof i.is == "string";
    switch (r) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var gt = null;
  function yt(r) {
    return r = r.target || r.srcElement || window, r.correspondingUseElement && (r = r.correspondingUseElement), r.nodeType === 3 ? r.parentNode : r;
  }
  var At = null, $t = null, Ge = null;
  function fn(r) {
    if (r = Dt(r)) {
      if (typeof At != "function") throw Error(s(280));
      var i = r.stateNode;
      i && (i = tr(i), At(r.stateNode, r.type, i));
    }
  }
  function On(r) {
    $t ? Ge ? Ge.push(r) : Ge = [r] : $t = r;
  }
  function Fn() {
    if ($t) {
      var r = $t, i = Ge;
      if (Ge = $t = null, fn(r), i) for (r = 0; r < i.length; r++) fn(i[r]);
    }
  }
  function mr(r, i) {
    return r(i);
  }
  function lr() {
  }
  var Zn = !1;
  function Di(r, i, u) {
    if (Zn) return r(i, u);
    Zn = !0;
    try {
      return mr(r, i, u);
    } finally {
      Zn = !1, ($t !== null || Ge !== null) && (lr(), Fn());
    }
  }
  function Rr(r, i) {
    var u = r.stateNode;
    if (u === null) return null;
    var d = tr(u);
    if (d === null) return null;
    u = d[i];
    e: switch (i) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (r = r.type, d = !(r === "button" || r === "input" || r === "select" || r === "textarea")), r = !d;
        break e;
      default:
        r = !1;
    }
    if (r) return null;
    if (u && typeof u != "function") throw Error(s(231, i, typeof u));
    return u;
  }
  var Lr = !1;
  if (g) try {
    var In = {};
    Object.defineProperty(In, "passive", { get: function() {
      Lr = !0;
    } }), window.addEventListener("test", In, In), window.removeEventListener("test", In, In);
  } catch {
    Lr = !1;
  }
  function Ma(r, i, u, d, y, w, O, I, K) {
    var ye = Array.prototype.slice.call(arguments, 3);
    try {
      i.apply(u, ye);
    } catch (Ue) {
      this.onError(Ue);
    }
  }
  var oa = !1, Wa = null, Nr = !1, B = null, ke = { onError: function(r) {
    oa = !0, Wa = r;
  } };
  function et(r, i, u, d, y, w, O, I, K) {
    oa = !1, Wa = null, Ma.apply(ke, arguments);
  }
  function ut(r, i, u, d, y, w, O, I, K) {
    if (et.apply(this, arguments), oa) {
      if (oa) {
        var ye = Wa;
        oa = !1, Wa = null;
      } else throw Error(s(198));
      Nr || (Nr = !0, B = ye);
    }
  }
  function Yt(r) {
    var i = r, u = r;
    if (r.alternate) for (; i.return; ) i = i.return;
    else {
      r = i;
      do
        i = r, (i.flags & 4098) !== 0 && (u = i.return), r = i.return;
      while (r);
    }
    return i.tag === 3 ? u : null;
  }
  function Ht(r) {
    if (r.tag === 13) {
      var i = r.memoizedState;
      if (i === null && (r = r.alternate, r !== null && (i = r.memoizedState)), i !== null) return i.dehydrated;
    }
    return null;
  }
  function tn(r) {
    if (Yt(r) !== r) throw Error(s(188));
  }
  function Zt(r) {
    var i = r.alternate;
    if (!i) {
      if (i = Yt(r), i === null) throw Error(s(188));
      return i !== r ? null : r;
    }
    for (var u = r, d = i; ; ) {
      var y = u.return;
      if (y === null) break;
      var w = y.alternate;
      if (w === null) {
        if (d = y.return, d !== null) {
          u = d;
          continue;
        }
        break;
      }
      if (y.child === w.child) {
        for (w = y.child; w; ) {
          if (w === u) return tn(y), r;
          if (w === d) return tn(y), i;
          w = w.sibling;
        }
        throw Error(s(188));
      }
      if (u.return !== d.return) u = y, d = w;
      else {
        for (var O = !1, I = y.child; I; ) {
          if (I === u) {
            O = !0, u = y, d = w;
            break;
          }
          if (I === d) {
            O = !0, d = y, u = w;
            break;
          }
          I = I.sibling;
        }
        if (!O) {
          for (I = w.child; I; ) {
            if (I === u) {
              O = !0, u = w, d = y;
              break;
            }
            if (I === d) {
              O = !0, d = w, u = y;
              break;
            }
            I = I.sibling;
          }
          if (!O) throw Error(s(189));
        }
      }
      if (u.alternate !== d) throw Error(s(190));
    }
    if (u.tag !== 3) throw Error(s(188));
    return u.stateNode.current === u ? r : i;
  }
  function Gn(r) {
    return r = Zt(r), r !== null ? gn(r) : null;
  }
  function gn(r) {
    if (r.tag === 5 || r.tag === 6) return r;
    for (r = r.child; r !== null; ) {
      var i = gn(r);
      if (i !== null) return i;
      r = r.sibling;
    }
    return null;
  }
  var En = a.unstable_scheduleCallback, qn = a.unstable_cancelCallback, _a = a.unstable_shouldYield, sa = a.unstable_requestPaint, Wt = a.unstable_now, Qt = a.unstable_getCurrentPriorityLevel, ua = a.unstable_ImmediatePriority, ki = a.unstable_UserBlockingPriority, Oi = a.unstable_NormalPriority, Ai = a.unstable_LowPriority, Ki = a.unstable_IdlePriority, ii = null, Qn = null;
  function Wo(r) {
    if (Qn && typeof Qn.onCommitFiberRoot == "function") try {
      Qn.onCommitFiberRoot(ii, r, void 0, (r.current.flags & 128) === 128);
    } catch {
    }
  }
  var $r = Math.clz32 ? Math.clz32 : on, $s = Math.log, io = Math.LN2;
  function on(r) {
    return r >>>= 0, r === 0 ? 32 : 31 - ($s(r) / io | 0) | 0;
  }
  var zt = 64, an = 4194304;
  function un(r) {
    switch (r & -r) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return r & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return r;
    }
  }
  function Jn(r, i) {
    var u = r.pendingLanes;
    if (u === 0) return 0;
    var d = 0, y = r.suspendedLanes, w = r.pingedLanes, O = u & 268435455;
    if (O !== 0) {
      var I = O & ~y;
      I !== 0 ? d = un(I) : (w &= O, w !== 0 && (d = un(w)));
    } else O = u & ~y, O !== 0 ? d = un(O) : w !== 0 && (d = un(w));
    if (d === 0) return 0;
    if (i !== 0 && i !== d && (i & y) === 0 && (y = d & -d, w = i & -i, y >= w || y === 16 && (w & 4194240) !== 0)) return i;
    if ((d & 4) !== 0 && (d |= u & 16), i = r.entangledLanes, i !== 0) for (r = r.entanglements, i &= d; 0 < i; ) u = 31 - $r(i), y = 1 << u, d |= r[u], i &= ~y;
    return d;
  }
  function ca(r, i) {
    switch (r) {
      case 1:
      case 2:
      case 4:
        return i + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return i + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Mr(r, i) {
    for (var u = r.suspendedLanes, d = r.pingedLanes, y = r.expirationTimes, w = r.pendingLanes; 0 < w; ) {
      var O = 31 - $r(w), I = 1 << O, K = y[O];
      K === -1 ? ((I & u) === 0 || (I & d) !== 0) && (y[O] = ca(I, i)) : K <= i && (r.expiredLanes |= I), w &= ~I;
    }
  }
  function lo(r) {
    return r = r.pendingLanes & -1073741825, r !== 0 ? r : r & 1073741824 ? 1073741824 : 0;
  }
  function Hs() {
    var r = zt;
    return zt <<= 1, (zt & 4194240) === 0 && (zt = 64), r;
  }
  function Vs(r) {
    for (var i = [], u = 0; 31 > u; u++) i.push(r);
    return i;
  }
  function Ml(r, i, u) {
    r.pendingLanes |= i, i !== 536870912 && (r.suspendedLanes = 0, r.pingedLanes = 0), r = r.eventTimes, i = 31 - $r(i), r[i] = u;
  }
  function mp(r, i) {
    var u = r.pendingLanes & ~i;
    r.pendingLanes = i, r.suspendedLanes = 0, r.pingedLanes = 0, r.expiredLanes &= i, r.mutableReadLanes &= i, r.entangledLanes &= i, i = r.entanglements;
    var d = r.eventTimes;
    for (r = r.expirationTimes; 0 < u; ) {
      var y = 31 - $r(u), w = 1 << y;
      i[y] = 0, d[y] = -1, r[y] = -1, u &= ~w;
    }
  }
  function _l(r, i) {
    var u = r.entangledLanes |= i;
    for (r = r.entanglements; u; ) {
      var d = 31 - $r(u), y = 1 << d;
      y & i | r[d] & i && (r[d] |= i), u &= ~y;
    }
  }
  var Cn = 0;
  function Is(r) {
    return r &= -r, 1 < r ? 4 < r ? (r & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Sn, Bu, Zi, Gt, qs, Hr = !1, Ji = [], fa = null, el = null, Yn = null, An = /* @__PURE__ */ new Map(), oo = /* @__PURE__ */ new Map(), _r = [], da = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function li(r, i) {
    switch (r) {
      case "focusin":
      case "focusout":
        fa = null;
        break;
      case "dragenter":
      case "dragleave":
        el = null;
        break;
      case "mouseover":
      case "mouseout":
        Yn = null;
        break;
      case "pointerover":
      case "pointerout":
        An.delete(i.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        oo.delete(i.pointerId);
    }
  }
  function Bo(r, i, u, d, y, w) {
    return r === null || r.nativeEvent !== w ? (r = { blockedOn: i, domEventName: u, eventSystemFlags: d, nativeEvent: w, targetContainers: [y] }, i !== null && (i = Dt(i), i !== null && Bu(i)), r) : (r.eventSystemFlags |= d, i = r.targetContainers, y !== null && i.indexOf(y) === -1 && i.push(y), r);
  }
  function Gu(r, i, u, d, y) {
    switch (i) {
      case "focusin":
        return fa = Bo(fa, r, i, u, d, y), !0;
      case "dragenter":
        return el = Bo(el, r, i, u, d, y), !0;
      case "mouseover":
        return Yn = Bo(Yn, r, i, u, d, y), !0;
      case "pointerover":
        var w = y.pointerId;
        return An.set(w, Bo(An.get(w) || null, r, i, u, d, y)), !0;
      case "gotpointercapture":
        return w = y.pointerId, oo.set(w, Bo(oo.get(w) || null, r, i, u, d, y)), !0;
    }
    return !1;
  }
  function Qu(r) {
    var i = ns(r.target);
    if (i !== null) {
      var u = Yt(i);
      if (u !== null) {
        if (i = u.tag, i === 13) {
          if (i = Ht(u), i !== null) {
            r.blockedOn = i, qs(r.priority, function() {
              Zi(u);
            });
            return;
          }
        } else if (i === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          r.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    r.blockedOn = null;
  }
  function so(r) {
    if (r.blockedOn !== null) return !1;
    for (var i = r.targetContainers; 0 < i.length; ) {
      var u = Bs(r.domEventName, r.eventSystemFlags, i[0], r.nativeEvent);
      if (u === null) {
        u = r.nativeEvent;
        var d = new u.constructor(u.type, u);
        gt = d, u.target.dispatchEvent(d), gt = null;
      } else return i = Dt(u), i !== null && Bu(i), r.blockedOn = u, !1;
      i.shift();
    }
    return !0;
  }
  function Go(r, i, u) {
    so(r) && u.delete(i);
  }
  function yp() {
    Hr = !1, fa !== null && so(fa) && (fa = null), el !== null && so(el) && (el = null), Yn !== null && so(Yn) && (Yn = null), An.forEach(Go), oo.forEach(Go);
  }
  function oi(r, i) {
    r.blockedOn === i && (r.blockedOn = null, Hr || (Hr = !0, a.unstable_scheduleCallback(a.unstable_NormalPriority, yp)));
  }
  function Li(r) {
    function i(y) {
      return oi(y, r);
    }
    if (0 < Ji.length) {
      oi(Ji[0], r);
      for (var u = 1; u < Ji.length; u++) {
        var d = Ji[u];
        d.blockedOn === r && (d.blockedOn = null);
      }
    }
    for (fa !== null && oi(fa, r), el !== null && oi(el, r), Yn !== null && oi(Yn, r), An.forEach(i), oo.forEach(i), u = 0; u < _r.length; u++) d = _r[u], d.blockedOn === r && (d.blockedOn = null);
    for (; 0 < _r.length && (u = _r[0], u.blockedOn === null); ) Qu(u), u.blockedOn === null && _r.shift();
  }
  var tl = F.ReactCurrentBatchConfig, si = !0;
  function Ys(r, i, u, d) {
    var y = Cn, w = tl.transition;
    tl.transition = null;
    try {
      Cn = 1, uo(r, i, u, d);
    } finally {
      Cn = y, tl.transition = w;
    }
  }
  function Ws(r, i, u, d) {
    var y = Cn, w = tl.transition;
    tl.transition = null;
    try {
      Cn = 4, uo(r, i, u, d);
    } finally {
      Cn = y, tl.transition = w;
    }
  }
  function uo(r, i, u, d) {
    if (si) {
      var y = Bs(r, i, u, d);
      if (y === null) Df(r, i, d, Qo, u), li(r, d);
      else if (Gu(y, r, i, u, d)) d.stopPropagation();
      else if (li(r, d), i & 4 && -1 < da.indexOf(r)) {
        for (; y !== null; ) {
          var w = Dt(y);
          if (w !== null && Sn(w), w = Bs(r, i, u, d), w === null && Df(r, i, d, Qo, u), w === y) break;
          y = w;
        }
        y !== null && d.stopPropagation();
      } else Df(r, i, d, null, u);
    }
  }
  var Qo = null;
  function Bs(r, i, u, d) {
    if (Qo = null, r = yt(d), r = ns(r), r !== null) if (i = Yt(r), i === null) r = null;
    else if (u = i.tag, u === 13) {
      if (r = Ht(i), r !== null) return r;
      r = null;
    } else if (u === 3) {
      if (i.stateNode.current.memoizedState.isDehydrated) return i.tag === 3 ? i.stateNode.containerInfo : null;
      r = null;
    } else i !== r && (r = null);
    return Qo = r, null;
  }
  function Gs(r) {
    switch (r) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Qt()) {
          case ua:
            return 1;
          case ki:
            return 4;
          case Oi:
          case Ai:
            return 16;
          case Ki:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Ni = null, k = null, W = null;
  function me() {
    if (W) return W;
    var r, i = k, u = i.length, d, y = "value" in Ni ? Ni.value : Ni.textContent, w = y.length;
    for (r = 0; r < u && i[r] === y[r]; r++) ;
    var O = u - r;
    for (d = 1; d <= O && i[u - d] === y[w - d]; d++) ;
    return W = y.slice(r, 1 < d ? 1 - d : void 0);
  }
  function Ee(r) {
    var i = r.keyCode;
    return "charCode" in r ? (r = r.charCode, r === 0 && i === 13 && (r = 13)) : r = i, r === 10 && (r = 13), 32 <= r || r === 13 ? r : 0;
  }
  function We() {
    return !0;
  }
  function Lt() {
    return !1;
  }
  function nt(r) {
    function i(u, d, y, w, O) {
      this._reactName = u, this._targetInst = y, this.type = d, this.nativeEvent = w, this.target = O, this.currentTarget = null;
      for (var I in r) r.hasOwnProperty(I) && (u = r[I], this[I] = u ? u(w) : w[I]);
      return this.isDefaultPrevented = (w.defaultPrevented != null ? w.defaultPrevented : w.returnValue === !1) ? We : Lt, this.isPropagationStopped = Lt, this;
    }
    return ve(i.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = We);
    }, stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = We);
    }, persist: function() {
    }, isPersistent: We }), i;
  }
  var jt = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(r) {
    return r.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, sn = nt(jt), xn = ve({}, jt, { view: 0, detail: 0 }), $n = nt(xn), Ln, rn, Nn, er = ve({}, xn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: wp, button: 0, buttons: 0, relatedTarget: function(r) {
    return r.relatedTarget === void 0 ? r.fromElement === r.srcElement ? r.toElement : r.fromElement : r.relatedTarget;
  }, movementX: function(r) {
    return "movementX" in r ? r.movementX : (r !== Nn && (Nn && r.type === "mousemove" ? (Ln = r.screenX - Nn.screenX, rn = r.screenY - Nn.screenY) : rn = Ln = 0, Nn = r), Ln);
  }, movementY: function(r) {
    return "movementY" in r ? r.movementY : rn;
  } }), co = nt(er), Xu = ve({}, er, { dataTransfer: 0 }), Dl = nt(Xu), Ku = ve({}, xn, { relatedTarget: 0 }), Xo = nt(Ku), gp = ve({}, jt, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), gf = nt(gp), Sp = ve({}, jt, { clipboardData: function(r) {
    return "clipboardData" in r ? r.clipboardData : window.clipboardData;
  } }), Yh = nt(Sp), xp = ve({}, jt, { data: 0 }), Ep = nt(xp), Wh = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Bh = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, x1 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function kl(r) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(r) : (r = x1[r]) ? !!i[r] : !1;
  }
  function wp() {
    return kl;
  }
  var Cp = ve({}, xn, { key: function(r) {
    if (r.key) {
      var i = Wh[r.key] || r.key;
      if (i !== "Unidentified") return i;
    }
    return r.type === "keypress" ? (r = Ee(r), r === 13 ? "Enter" : String.fromCharCode(r)) : r.type === "keydown" || r.type === "keyup" ? Bh[r.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: wp, charCode: function(r) {
    return r.type === "keypress" ? Ee(r) : 0;
  }, keyCode: function(r) {
    return r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  }, which: function(r) {
    return r.type === "keypress" ? Ee(r) : r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  } }), bp = nt(Cp), Tp = ve({}, er, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Gh = nt(Tp), Sf = ve({}, xn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: wp }), Qh = nt(Sf), Da = ve({}, jt, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Ol = nt(Da), yr = ve({}, er, {
    deltaX: function(r) {
      return "deltaX" in r ? r.deltaX : "wheelDeltaX" in r ? -r.wheelDeltaX : 0;
    },
    deltaY: function(r) {
      return "deltaY" in r ? r.deltaY : "wheelDeltaY" in r ? -r.wheelDeltaY : "wheelDelta" in r ? -r.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Al = nt(yr), Rp = [9, 13, 27, 32], Qs = g && "CompositionEvent" in window, Zu = null;
  g && "documentMode" in document && (Zu = document.documentMode);
  var Ju = g && "TextEvent" in window && !Zu, Xh = g && (!Qs || Zu && 8 < Zu && 11 >= Zu), Kh = " ", xf = !1;
  function Zh(r, i) {
    switch (r) {
      case "keyup":
        return Rp.indexOf(i.keyCode) !== -1;
      case "keydown":
        return i.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Jh(r) {
    return r = r.detail, typeof r == "object" && "data" in r ? r.data : null;
  }
  var Xs = !1;
  function em(r, i) {
    switch (r) {
      case "compositionend":
        return Jh(i);
      case "keypress":
        return i.which !== 32 ? null : (xf = !0, Kh);
      case "textInput":
        return r = i.data, r === Kh && xf ? null : r;
      default:
        return null;
    }
  }
  function E1(r, i) {
    if (Xs) return r === "compositionend" || !Qs && Zh(r, i) ? (r = me(), W = k = Ni = null, Xs = !1, r) : null;
    switch (r) {
      case "paste":
        return null;
      case "keypress":
        if (!(i.ctrlKey || i.altKey || i.metaKey) || i.ctrlKey && i.altKey) {
          if (i.char && 1 < i.char.length) return i.char;
          if (i.which) return String.fromCharCode(i.which);
        }
        return null;
      case "compositionend":
        return Xh && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var w1 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function tm(r) {
    var i = r && r.nodeName && r.nodeName.toLowerCase();
    return i === "input" ? !!w1[r.type] : i === "textarea";
  }
  function Mp(r, i, u, d) {
    On(d), i = ic(i, "onChange"), 0 < i.length && (u = new sn("onChange", "change", null, u, d), r.push({ event: u, listeners: i }));
  }
  var nl = null, Ko = null;
  function nm(r) {
    es(r, 0);
  }
  function ec(r) {
    var i = Ui(r);
    if (Le(i)) return r;
  }
  function C1(r, i) {
    if (r === "change") return i;
  }
  var rm = !1;
  if (g) {
    var _p;
    if (g) {
      var Dp = "oninput" in document;
      if (!Dp) {
        var am = document.createElement("div");
        am.setAttribute("oninput", "return;"), Dp = typeof am.oninput == "function";
      }
      _p = Dp;
    } else _p = !1;
    rm = _p && (!document.documentMode || 9 < document.documentMode);
  }
  function im() {
    nl && (nl.detachEvent("onpropertychange", lm), Ko = nl = null);
  }
  function lm(r) {
    if (r.propertyName === "value" && ec(Ko)) {
      var i = [];
      Mp(i, Ko, r, yt(r)), Di(nm, i);
    }
  }
  function b1(r, i, u) {
    r === "focusin" ? (im(), nl = i, Ko = u, nl.attachEvent("onpropertychange", lm)) : r === "focusout" && im();
  }
  function om(r) {
    if (r === "selectionchange" || r === "keyup" || r === "keydown") return ec(Ko);
  }
  function T1(r, i) {
    if (r === "click") return ec(i);
  }
  function sm(r, i) {
    if (r === "input" || r === "change") return ec(i);
  }
  function R1(r, i) {
    return r === i && (r !== 0 || 1 / r === 1 / i) || r !== r && i !== i;
  }
  var zi = typeof Object.is == "function" ? Object.is : R1;
  function tc(r, i) {
    if (zi(r, i)) return !0;
    if (typeof r != "object" || r === null || typeof i != "object" || i === null) return !1;
    var u = Object.keys(r), d = Object.keys(i);
    if (u.length !== d.length) return !1;
    for (d = 0; d < u.length; d++) {
      var y = u[d];
      if (!S.call(i, y) || !zi(r[y], i[y])) return !1;
    }
    return !0;
  }
  function um(r) {
    for (; r && r.firstChild; ) r = r.firstChild;
    return r;
  }
  function Ef(r, i) {
    var u = um(r);
    r = 0;
    for (var d; u; ) {
      if (u.nodeType === 3) {
        if (d = r + u.textContent.length, r <= i && d >= i) return { node: u, offset: i - r };
        r = d;
      }
      e: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break e;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = um(u);
    }
  }
  function fo(r, i) {
    return r && i ? r === i ? !0 : r && r.nodeType === 3 ? !1 : i && i.nodeType === 3 ? fo(r, i.parentNode) : "contains" in r ? r.contains(i) : r.compareDocumentPosition ? !!(r.compareDocumentPosition(i) & 16) : !1 : !1;
  }
  function nc() {
    for (var r = window, i = Je(); i instanceof r.HTMLIFrameElement; ) {
      try {
        var u = typeof i.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) r = i.contentWindow;
      else break;
      i = Je(r.document);
    }
    return i;
  }
  function wf(r) {
    var i = r && r.nodeName && r.nodeName.toLowerCase();
    return i && (i === "input" && (r.type === "text" || r.type === "search" || r.type === "tel" || r.type === "url" || r.type === "password") || i === "textarea" || r.contentEditable === "true");
  }
  function Ks(r) {
    var i = nc(), u = r.focusedElem, d = r.selectionRange;
    if (i !== u && u && u.ownerDocument && fo(u.ownerDocument.documentElement, u)) {
      if (d !== null && wf(u)) {
        if (i = d.start, r = d.end, r === void 0 && (r = i), "selectionStart" in u) u.selectionStart = i, u.selectionEnd = Math.min(r, u.value.length);
        else if (r = (i = u.ownerDocument || document) && i.defaultView || window, r.getSelection) {
          r = r.getSelection();
          var y = u.textContent.length, w = Math.min(d.start, y);
          d = d.end === void 0 ? w : Math.min(d.end, y), !r.extend && w > d && (y = d, d = w, w = y), y = Ef(u, w);
          var O = Ef(
            u,
            d
          );
          y && O && (r.rangeCount !== 1 || r.anchorNode !== y.node || r.anchorOffset !== y.offset || r.focusNode !== O.node || r.focusOffset !== O.offset) && (i = i.createRange(), i.setStart(y.node, y.offset), r.removeAllRanges(), w > d ? (r.addRange(i), r.extend(O.node, O.offset)) : (i.setEnd(O.node, O.offset), r.addRange(i)));
        }
      }
      for (i = [], r = u; r = r.parentNode; ) r.nodeType === 1 && i.push({ element: r, left: r.scrollLeft, top: r.scrollTop });
      for (typeof u.focus == "function" && u.focus(), u = 0; u < i.length; u++) r = i[u], r.element.scrollLeft = r.left, r.element.scrollTop = r.top;
    }
  }
  var M1 = g && "documentMode" in document && 11 >= document.documentMode, Zs = null, kp = null, rc = null, Op = !1;
  function Ap(r, i, u) {
    var d = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    Op || Zs == null || Zs !== Je(d) || (d = Zs, "selectionStart" in d && wf(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), rc && tc(rc, d) || (rc = d, d = ic(kp, "onSelect"), 0 < d.length && (i = new sn("onSelect", "select", null, i, u), r.push({ event: i, listeners: d }), i.target = Zs)));
  }
  function Cf(r, i) {
    var u = {};
    return u[r.toLowerCase()] = i.toLowerCase(), u["Webkit" + r] = "webkit" + i, u["Moz" + r] = "moz" + i, u;
  }
  var Zo = { animationend: Cf("Animation", "AnimationEnd"), animationiteration: Cf("Animation", "AnimationIteration"), animationstart: Cf("Animation", "AnimationStart"), transitionend: Cf("Transition", "TransitionEnd") }, Vr = {}, Lp = {};
  g && (Lp = document.createElement("div").style, "AnimationEvent" in window || (delete Zo.animationend.animation, delete Zo.animationiteration.animation, delete Zo.animationstart.animation), "TransitionEvent" in window || delete Zo.transitionend.transition);
  function bf(r) {
    if (Vr[r]) return Vr[r];
    if (!Zo[r]) return r;
    var i = Zo[r], u;
    for (u in i) if (i.hasOwnProperty(u) && u in Lp) return Vr[r] = i[u];
    return r;
  }
  var cm = bf("animationend"), fm = bf("animationiteration"), dm = bf("animationstart"), pm = bf("transitionend"), Np = /* @__PURE__ */ new Map(), Tf = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ui(r, i) {
    Np.set(r, i), m(i, [r]);
  }
  for (var zp = 0; zp < Tf.length; zp++) {
    var Jo = Tf[zp], _1 = Jo.toLowerCase(), D1 = Jo[0].toUpperCase() + Jo.slice(1);
    ui(_1, "on" + D1);
  }
  ui(cm, "onAnimationEnd"), ui(fm, "onAnimationIteration"), ui(dm, "onAnimationStart"), ui("dblclick", "onDoubleClick"), ui("focusin", "onFocus"), ui("focusout", "onBlur"), ui(pm, "onTransitionEnd"), v("onMouseEnter", ["mouseout", "mouseover"]), v("onMouseLeave", ["mouseout", "mouseover"]), v("onPointerEnter", ["pointerout", "pointerover"]), v("onPointerLeave", ["pointerout", "pointerover"]), m("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), m("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), m("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), m("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ac = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Up = new Set("cancel close invalid load scroll toggle".split(" ").concat(ac));
  function Rf(r, i, u) {
    var d = r.type || "unknown-event";
    r.currentTarget = u, ut(d, i, void 0, r), r.currentTarget = null;
  }
  function es(r, i) {
    i = (i & 4) !== 0;
    for (var u = 0; u < r.length; u++) {
      var d = r[u], y = d.event;
      d = d.listeners;
      e: {
        var w = void 0;
        if (i) for (var O = d.length - 1; 0 <= O; O--) {
          var I = d[O], K = I.instance, ye = I.currentTarget;
          if (I = I.listener, K !== w && y.isPropagationStopped()) break e;
          Rf(y, I, ye), w = K;
        }
        else for (O = 0; O < d.length; O++) {
          if (I = d[O], K = I.instance, ye = I.currentTarget, I = I.listener, K !== w && y.isPropagationStopped()) break e;
          Rf(y, I, ye), w = K;
        }
      }
    }
    if (Nr) throw r = B, Nr = !1, B = null, r;
  }
  function Dn(r, i) {
    var u = i[sc];
    u === void 0 && (u = i[sc] = /* @__PURE__ */ new Set());
    var d = r + "__bubble";
    u.has(d) || (vm(i, r, 2, !1), u.add(d));
  }
  function Mf(r, i, u) {
    var d = 0;
    i && (d |= 4), vm(u, r, d, i);
  }
  var _f = "_reactListening" + Math.random().toString(36).slice(2);
  function Js(r) {
    if (!r[_f]) {
      r[_f] = !0, f.forEach(function(u) {
        u !== "selectionchange" && (Up.has(u) || Mf(u, !1, r), Mf(u, !0, r));
      });
      var i = r.nodeType === 9 ? r : r.ownerDocument;
      i === null || i[_f] || (i[_f] = !0, Mf("selectionchange", !1, i));
    }
  }
  function vm(r, i, u, d) {
    switch (Gs(i)) {
      case 1:
        var y = Ys;
        break;
      case 4:
        y = Ws;
        break;
      default:
        y = uo;
    }
    u = y.bind(null, i, u, r), y = void 0, !Lr || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (y = !0), d ? y !== void 0 ? r.addEventListener(i, u, { capture: !0, passive: y }) : r.addEventListener(i, u, !0) : y !== void 0 ? r.addEventListener(i, u, { passive: y }) : r.addEventListener(i, u, !1);
  }
  function Df(r, i, u, d, y) {
    var w = d;
    if ((i & 1) === 0 && (i & 2) === 0 && d !== null) e: for (; ; ) {
      if (d === null) return;
      var O = d.tag;
      if (O === 3 || O === 4) {
        var I = d.stateNode.containerInfo;
        if (I === y || I.nodeType === 8 && I.parentNode === y) break;
        if (O === 4) for (O = d.return; O !== null; ) {
          var K = O.tag;
          if ((K === 3 || K === 4) && (K = O.stateNode.containerInfo, K === y || K.nodeType === 8 && K.parentNode === y)) return;
          O = O.return;
        }
        for (; I !== null; ) {
          if (O = ns(I), O === null) return;
          if (K = O.tag, K === 5 || K === 6) {
            d = w = O;
            continue e;
          }
          I = I.parentNode;
        }
      }
      d = d.return;
    }
    Di(function() {
      var ye = w, Ue = yt(u), Ie = [];
      e: {
        var Ne = Np.get(r);
        if (Ne !== void 0) {
          var ft = sn, St = r;
          switch (r) {
            case "keypress":
              if (Ee(u) === 0) break e;
            case "keydown":
            case "keyup":
              ft = bp;
              break;
            case "focusin":
              St = "focus", ft = Xo;
              break;
            case "focusout":
              St = "blur", ft = Xo;
              break;
            case "beforeblur":
            case "afterblur":
              ft = Xo;
              break;
            case "click":
              if (u.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ft = co;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ft = Dl;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ft = Qh;
              break;
            case cm:
            case fm:
            case dm:
              ft = gf;
              break;
            case pm:
              ft = Ol;
              break;
            case "scroll":
              ft = $n;
              break;
            case "wheel":
              ft = Al;
              break;
            case "copy":
            case "cut":
            case "paste":
              ft = Yh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ft = Gh;
          }
          var bt = (i & 4) !== 0, pr = !bt && r === "scroll", se = bt ? Ne !== null ? Ne + "Capture" : null : Ne;
          bt = [];
          for (var ee = ye, pe; ee !== null; ) {
            pe = ee;
            var je = pe.stateNode;
            if (pe.tag === 5 && je !== null && (pe = je, se !== null && (je = Rr(ee, se), je != null && bt.push(eu(ee, je, pe)))), pr) break;
            ee = ee.return;
          }
          0 < bt.length && (Ne = new ft(Ne, St, null, u, Ue), Ie.push({ event: Ne, listeners: bt }));
        }
      }
      if ((i & 7) === 0) {
        e: {
          if (Ne = r === "mouseover" || r === "pointerover", ft = r === "mouseout" || r === "pointerout", Ne && u !== gt && (St = u.relatedTarget || u.fromElement) && (ns(St) || St[Ll])) break e;
          if ((ft || Ne) && (Ne = Ue.window === Ue ? Ue : (Ne = Ue.ownerDocument) ? Ne.defaultView || Ne.parentWindow : window, ft ? (St = u.relatedTarget || u.toElement, ft = ye, St = St ? ns(St) : null, St !== null && (pr = Yt(St), St !== pr || St.tag !== 5 && St.tag !== 6) && (St = null)) : (ft = null, St = ye), ft !== St)) {
            if (bt = co, je = "onMouseLeave", se = "onMouseEnter", ee = "mouse", (r === "pointerout" || r === "pointerover") && (bt = Gh, je = "onPointerLeave", se = "onPointerEnter", ee = "pointer"), pr = ft == null ? Ne : Ui(ft), pe = St == null ? Ne : Ui(St), Ne = new bt(je, ee + "leave", ft, u, Ue), Ne.target = pr, Ne.relatedTarget = pe, je = null, ns(Ue) === ye && (bt = new bt(se, ee + "enter", St, u, Ue), bt.target = pe, bt.relatedTarget = pr, je = bt), pr = je, ft && St) t: {
              for (bt = ft, se = St, ee = 0, pe = bt; pe; pe = po(pe)) ee++;
              for (pe = 0, je = se; je; je = po(je)) pe++;
              for (; 0 < ee - pe; ) bt = po(bt), ee--;
              for (; 0 < pe - ee; ) se = po(se), pe--;
              for (; ee--; ) {
                if (bt === se || se !== null && bt === se.alternate) break t;
                bt = po(bt), se = po(se);
              }
              bt = null;
            }
            else bt = null;
            ft !== null && hm(Ie, Ne, ft, bt, !1), St !== null && pr !== null && hm(Ie, pr, St, bt, !0);
          }
        }
        e: {
          if (Ne = ye ? Ui(ye) : window, ft = Ne.nodeName && Ne.nodeName.toLowerCase(), ft === "select" || ft === "input" && Ne.type === "file") var xt = C1;
          else if (tm(Ne)) if (rm) xt = sm;
          else {
            xt = om;
            var Ut = b1;
          }
          else (ft = Ne.nodeName) && ft.toLowerCase() === "input" && (Ne.type === "checkbox" || Ne.type === "radio") && (xt = T1);
          if (xt && (xt = xt(r, ye))) {
            Mp(Ie, xt, u, Ue);
            break e;
          }
          Ut && Ut(r, Ne, ye), r === "focusout" && (Ut = Ne._wrapperState) && Ut.controlled && Ne.type === "number" && Ct(Ne, "number", Ne.value);
        }
        switch (Ut = ye ? Ui(ye) : window, r) {
          case "focusin":
            (tm(Ut) || Ut.contentEditable === "true") && (Zs = Ut, kp = ye, rc = null);
            break;
          case "focusout":
            rc = kp = Zs = null;
            break;
          case "mousedown":
            Op = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Op = !1, Ap(Ie, u, Ue);
            break;
          case "selectionchange":
            if (M1) break;
          case "keydown":
          case "keyup":
            Ap(Ie, u, Ue);
        }
        var Ft;
        if (Qs) e: {
          switch (r) {
            case "compositionstart":
              var Bt = "onCompositionStart";
              break e;
            case "compositionend":
              Bt = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Bt = "onCompositionUpdate";
              break e;
          }
          Bt = void 0;
        }
        else Xs ? Zh(r, u) && (Bt = "onCompositionEnd") : r === "keydown" && u.keyCode === 229 && (Bt = "onCompositionStart");
        Bt && (Xh && u.locale !== "ko" && (Xs || Bt !== "onCompositionStart" ? Bt === "onCompositionEnd" && Xs && (Ft = me()) : (Ni = Ue, k = "value" in Ni ? Ni.value : Ni.textContent, Xs = !0)), Ut = ic(ye, Bt), 0 < Ut.length && (Bt = new Ep(Bt, r, null, u, Ue), Ie.push({ event: Bt, listeners: Ut }), Ft ? Bt.data = Ft : (Ft = Jh(u), Ft !== null && (Bt.data = Ft)))), (Ft = Ju ? em(r, u) : E1(r, u)) && (ye = ic(ye, "onBeforeInput"), 0 < ye.length && (Ue = new Ep("onBeforeInput", "beforeinput", null, u, Ue), Ie.push({ event: Ue, listeners: ye }), Ue.data = Ft));
      }
      es(Ie, i);
    });
  }
  function eu(r, i, u) {
    return { instance: r, listener: i, currentTarget: u };
  }
  function ic(r, i) {
    for (var u = i + "Capture", d = []; r !== null; ) {
      var y = r, w = y.stateNode;
      y.tag === 5 && w !== null && (y = w, w = Rr(r, u), w != null && d.unshift(eu(r, w, y)), w = Rr(r, i), w != null && d.push(eu(r, w, y))), r = r.return;
    }
    return d;
  }
  function po(r) {
    if (r === null) return null;
    do
      r = r.return;
    while (r && r.tag !== 5);
    return r || null;
  }
  function hm(r, i, u, d, y) {
    for (var w = i._reactName, O = []; u !== null && u !== d; ) {
      var I = u, K = I.alternate, ye = I.stateNode;
      if (K !== null && K === d) break;
      I.tag === 5 && ye !== null && (I = ye, y ? (K = Rr(u, w), K != null && O.unshift(eu(u, K, I))) : y || (K = Rr(u, w), K != null && O.push(eu(u, K, I)))), u = u.return;
    }
    O.length !== 0 && r.push({ event: i, listeners: O });
  }
  var mm = /\r\n?/g, k1 = /\u0000|\uFFFD/g;
  function ym(r) {
    return (typeof r == "string" ? r : "" + r).replace(mm, `
`).replace(k1, "");
  }
  function kf(r, i, u) {
    if (i = ym(i), ym(r) !== i && u) throw Error(s(425));
  }
  function vo() {
  }
  var lc = null, ts = null;
  function Of(r, i) {
    return r === "textarea" || r === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  }
  var Af = typeof setTimeout == "function" ? setTimeout : void 0, jp = typeof clearTimeout == "function" ? clearTimeout : void 0, gm = typeof Promise == "function" ? Promise : void 0, tu = typeof queueMicrotask == "function" ? queueMicrotask : typeof gm < "u" ? function(r) {
    return gm.resolve(null).then(r).catch(Lf);
  } : Af;
  function Lf(r) {
    setTimeout(function() {
      throw r;
    });
  }
  function nu(r, i) {
    var u = i, d = 0;
    do {
      var y = u.nextSibling;
      if (r.removeChild(u), y && y.nodeType === 8) if (u = y.data, u === "/$") {
        if (d === 0) {
          r.removeChild(y), Li(i);
          return;
        }
        d--;
      } else u !== "$" && u !== "$?" && u !== "$!" || d++;
      u = y;
    } while (u);
    Li(i);
  }
  function rl(r) {
    for (; r != null; r = r.nextSibling) {
      var i = r.nodeType;
      if (i === 1 || i === 3) break;
      if (i === 8) {
        if (i = r.data, i === "$" || i === "$!" || i === "$?") break;
        if (i === "/$") return null;
      }
    }
    return r;
  }
  function Sm(r) {
    r = r.previousSibling;
    for (var i = 0; r; ) {
      if (r.nodeType === 8) {
        var u = r.data;
        if (u === "$" || u === "$!" || u === "$?") {
          if (i === 0) return r;
          i--;
        } else u === "/$" && i++;
      }
      r = r.previousSibling;
    }
    return null;
  }
  var ho = Math.random().toString(36).slice(2), al = "__reactFiber$" + ho, oc = "__reactProps$" + ho, Ll = "__reactContainer$" + ho, sc = "__reactEvents$" + ho, ru = "__reactListeners$" + ho, O1 = "__reactHandles$" + ho;
  function ns(r) {
    var i = r[al];
    if (i) return i;
    for (var u = r.parentNode; u; ) {
      if (i = u[Ll] || u[al]) {
        if (u = i.alternate, i.child !== null || u !== null && u.child !== null) for (r = Sm(r); r !== null; ) {
          if (u = r[al]) return u;
          r = Sm(r);
        }
        return i;
      }
      r = u, u = r.parentNode;
    }
    return null;
  }
  function Dt(r) {
    return r = r[al] || r[Ll], !r || r.tag !== 5 && r.tag !== 6 && r.tag !== 13 && r.tag !== 3 ? null : r;
  }
  function Ui(r) {
    if (r.tag === 5 || r.tag === 6) return r.stateNode;
    throw Error(s(33));
  }
  function tr(r) {
    return r[oc] || null;
  }
  var vn = [], ci = -1;
  function fi(r) {
    return { current: r };
  }
  function Hn(r) {
    0 > ci || (r.current = vn[ci], vn[ci] = null, ci--);
  }
  function _t(r, i) {
    ci++, vn[ci] = r.current, r.current = i;
  }
  var ea = {}, or = fi(ea), Dr = fi(!1), ka = ea;
  function Oa(r, i) {
    var u = r.type.contextTypes;
    if (!u) return ea;
    var d = r.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === i) return d.__reactInternalMemoizedMaskedChildContext;
    var y = {}, w;
    for (w in u) y[w] = i[w];
    return d && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = i, r.__reactInternalMemoizedMaskedChildContext = y), y;
  }
  function gr(r) {
    return r = r.childContextTypes, r != null;
  }
  function au() {
    Hn(Dr), Hn(or);
  }
  function xm(r, i, u) {
    if (or.current !== ea) throw Error(s(168));
    _t(or, i), _t(Dr, u);
  }
  function uc(r, i, u) {
    var d = r.stateNode;
    if (i = i.childContextTypes, typeof d.getChildContext != "function") return u;
    d = d.getChildContext();
    for (var y in d) if (!(y in i)) throw Error(s(108, Ve(r) || "Unknown", y));
    return ve({}, u, d);
  }
  function zr(r) {
    return r = (r = r.stateNode) && r.__reactInternalMemoizedMergedChildContext || ea, ka = or.current, _t(or, r), _t(Dr, Dr.current), !0;
  }
  function Nf(r, i, u) {
    var d = r.stateNode;
    if (!d) throw Error(s(169));
    u ? (r = uc(r, i, ka), d.__reactInternalMemoizedMergedChildContext = r, Hn(Dr), Hn(or), _t(or, r)) : Hn(Dr), _t(Dr, u);
  }
  var il = null, iu = !1, Nl = !1;
  function zf(r) {
    il === null ? il = [r] : il.push(r);
  }
  function mo(r) {
    iu = !0, zf(r);
  }
  function ll() {
    if (!Nl && il !== null) {
      Nl = !0;
      var r = 0, i = Cn;
      try {
        var u = il;
        for (Cn = 1; r < u.length; r++) {
          var d = u[r];
          do
            d = d(!0);
          while (d !== null);
        }
        il = null, iu = !1;
      } catch (y) {
        throw il !== null && (il = il.slice(r + 1)), En(ua, ll), y;
      } finally {
        Cn = i, Nl = !1;
      }
    }
    return null;
  }
  var yo = [], go = 0, So = null, zl = 0, Sr = [], di = 0, Ba = null, ol = 1, sl = "";
  function rs(r, i) {
    yo[go++] = zl, yo[go++] = So, So = r, zl = i;
  }
  function Em(r, i, u) {
    Sr[di++] = ol, Sr[di++] = sl, Sr[di++] = Ba, Ba = r;
    var d = ol;
    r = sl;
    var y = 32 - $r(d) - 1;
    d &= ~(1 << y), u += 1;
    var w = 32 - $r(i) + y;
    if (30 < w) {
      var O = y - y % 5;
      w = (d & (1 << O) - 1).toString(32), d >>= O, y -= O, ol = 1 << 32 - $r(i) + y | u << y | d, sl = w + r;
    } else ol = 1 << w | u << y | d, sl = r;
  }
  function Uf(r) {
    r.return !== null && (rs(r, 1), Em(r, 1, 0));
  }
  function jf(r) {
    for (; r === So; ) So = yo[--go], yo[go] = null, zl = yo[--go], yo[go] = null;
    for (; r === Ba; ) Ba = Sr[--di], Sr[di] = null, sl = Sr[--di], Sr[di] = null, ol = Sr[--di], Sr[di] = null;
  }
  var Aa = null, La = null, Xn = !1, pi = null;
  function Fp(r, i) {
    var u = gi(5, null, null, 0);
    u.elementType = "DELETED", u.stateNode = i, u.return = r, i = r.deletions, i === null ? (r.deletions = [u], r.flags |= 16) : i.push(u);
  }
  function wm(r, i) {
    switch (r.tag) {
      case 5:
        var u = r.type;
        return i = i.nodeType !== 1 || u.toLowerCase() !== i.nodeName.toLowerCase() ? null : i, i !== null ? (r.stateNode = i, Aa = r, La = rl(i.firstChild), !0) : !1;
      case 6:
        return i = r.pendingProps === "" || i.nodeType !== 3 ? null : i, i !== null ? (r.stateNode = i, Aa = r, La = null, !0) : !1;
      case 13:
        return i = i.nodeType !== 8 ? null : i, i !== null ? (u = Ba !== null ? { id: ol, overflow: sl } : null, r.memoizedState = { dehydrated: i, treeContext: u, retryLane: 1073741824 }, u = gi(18, null, null, 0), u.stateNode = i, u.return = r, r.child = u, Aa = r, La = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Pp(r) {
    return (r.mode & 1) !== 0 && (r.flags & 128) === 0;
  }
  function $p(r) {
    if (Xn) {
      var i = La;
      if (i) {
        var u = i;
        if (!wm(r, i)) {
          if (Pp(r)) throw Error(s(418));
          i = rl(u.nextSibling);
          var d = Aa;
          i && wm(r, i) ? Fp(d, u) : (r.flags = r.flags & -4097 | 2, Xn = !1, Aa = r);
        }
      } else {
        if (Pp(r)) throw Error(s(418));
        r.flags = r.flags & -4097 | 2, Xn = !1, Aa = r;
      }
    }
  }
  function kr(r) {
    for (r = r.return; r !== null && r.tag !== 5 && r.tag !== 3 && r.tag !== 13; ) r = r.return;
    Aa = r;
  }
  function Ff(r) {
    if (r !== Aa) return !1;
    if (!Xn) return kr(r), Xn = !0, !1;
    var i;
    if ((i = r.tag !== 3) && !(i = r.tag !== 5) && (i = r.type, i = i !== "head" && i !== "body" && !Of(r.type, r.memoizedProps)), i && (i = La)) {
      if (Pp(r)) throw cc(), Error(s(418));
      for (; i; ) Fp(r, i), i = rl(i.nextSibling);
    }
    if (kr(r), r.tag === 13) {
      if (r = r.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(s(317));
      e: {
        for (r = r.nextSibling, i = 0; r; ) {
          if (r.nodeType === 8) {
            var u = r.data;
            if (u === "/$") {
              if (i === 0) {
                La = rl(r.nextSibling);
                break e;
              }
              i--;
            } else u !== "$" && u !== "$!" && u !== "$?" || i++;
          }
          r = r.nextSibling;
        }
        La = null;
      }
    } else La = Aa ? rl(r.stateNode.nextSibling) : null;
    return !0;
  }
  function cc() {
    for (var r = La; r; ) r = rl(r.nextSibling);
  }
  function xo() {
    La = Aa = null, Xn = !1;
  }
  function Ul(r) {
    pi === null ? pi = [r] : pi.push(r);
  }
  var A1 = F.ReactCurrentBatchConfig;
  function as(r, i, u) {
    if (r = u.ref, r !== null && typeof r != "function" && typeof r != "object") {
      if (u._owner) {
        if (u = u._owner, u) {
          if (u.tag !== 1) throw Error(s(309));
          var d = u.stateNode;
        }
        if (!d) throw Error(s(147, r));
        var y = d, w = "" + r;
        return i !== null && i.ref !== null && typeof i.ref == "function" && i.ref._stringRef === w ? i.ref : (i = function(O) {
          var I = y.refs;
          O === null ? delete I[w] : I[w] = O;
        }, i._stringRef = w, i);
      }
      if (typeof r != "string") throw Error(s(284));
      if (!u._owner) throw Error(s(290, r));
    }
    return r;
  }
  function Pf(r, i) {
    throw r = Object.prototype.toString.call(i), Error(s(31, r === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : r));
  }
  function Cm(r) {
    var i = r._init;
    return i(r._payload);
  }
  function is(r) {
    function i(se, ee) {
      if (r) {
        var pe = se.deletions;
        pe === null ? (se.deletions = [ee], se.flags |= 16) : pe.push(ee);
      }
    }
    function u(se, ee) {
      if (!r) return null;
      for (; ee !== null; ) i(se, ee), ee = ee.sibling;
      return null;
    }
    function d(se, ee) {
      for (se = /* @__PURE__ */ new Map(); ee !== null; ) ee.key !== null ? se.set(ee.key, ee) : se.set(ee.index, ee), ee = ee.sibling;
      return se;
    }
    function y(se, ee) {
      return se = _o(se, ee), se.index = 0, se.sibling = null, se;
    }
    function w(se, ee, pe) {
      return se.index = pe, r ? (pe = se.alternate, pe !== null ? (pe = pe.index, pe < ee ? (se.flags |= 2, ee) : pe) : (se.flags |= 2, ee)) : (se.flags |= 1048576, ee);
    }
    function O(se) {
      return r && se.alternate === null && (se.flags |= 2), se;
    }
    function I(se, ee, pe, je) {
      return ee === null || ee.tag !== 6 ? (ee = yv(pe, se.mode, je), ee.return = se, ee) : (ee = y(ee, pe), ee.return = se, ee);
    }
    function K(se, ee, pe, je) {
      var xt = pe.type;
      return xt === Y ? Ue(se, ee, pe.props.children, je, pe.key) : ee !== null && (ee.elementType === xt || typeof xt == "object" && xt !== null && xt.$$typeof === de && Cm(xt) === ee.type) ? (je = y(ee, pe.props), je.ref = as(se, ee, pe), je.return = se, je) : (je = $c(pe.type, pe.key, pe.props, null, se.mode, je), je.ref = as(se, ee, pe), je.return = se, je);
    }
    function ye(se, ee, pe, je) {
      return ee === null || ee.tag !== 4 || ee.stateNode.containerInfo !== pe.containerInfo || ee.stateNode.implementation !== pe.implementation ? (ee = gd(pe, se.mode, je), ee.return = se, ee) : (ee = y(ee, pe.children || []), ee.return = se, ee);
    }
    function Ue(se, ee, pe, je, xt) {
      return ee === null || ee.tag !== 7 ? (ee = Vl(pe, se.mode, je, xt), ee.return = se, ee) : (ee = y(ee, pe), ee.return = se, ee);
    }
    function Ie(se, ee, pe) {
      if (typeof ee == "string" && ee !== "" || typeof ee == "number") return ee = yv("" + ee, se.mode, pe), ee.return = se, ee;
      if (typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case H:
            return pe = $c(ee.type, ee.key, ee.props, null, se.mode, pe), pe.ref = as(se, null, ee), pe.return = se, pe;
          case V:
            return ee = gd(ee, se.mode, pe), ee.return = se, ee;
          case de:
            var je = ee._init;
            return Ie(se, je(ee._payload), pe);
        }
        if (Te(ee) || fe(ee)) return ee = Vl(ee, se.mode, pe, null), ee.return = se, ee;
        Pf(se, ee);
      }
      return null;
    }
    function Ne(se, ee, pe, je) {
      var xt = ee !== null ? ee.key : null;
      if (typeof pe == "string" && pe !== "" || typeof pe == "number") return xt !== null ? null : I(se, ee, "" + pe, je);
      if (typeof pe == "object" && pe !== null) {
        switch (pe.$$typeof) {
          case H:
            return pe.key === xt ? K(se, ee, pe, je) : null;
          case V:
            return pe.key === xt ? ye(se, ee, pe, je) : null;
          case de:
            return xt = pe._init, Ne(
              se,
              ee,
              xt(pe._payload),
              je
            );
        }
        if (Te(pe) || fe(pe)) return xt !== null ? null : Ue(se, ee, pe, je, null);
        Pf(se, pe);
      }
      return null;
    }
    function ft(se, ee, pe, je, xt) {
      if (typeof je == "string" && je !== "" || typeof je == "number") return se = se.get(pe) || null, I(ee, se, "" + je, xt);
      if (typeof je == "object" && je !== null) {
        switch (je.$$typeof) {
          case H:
            return se = se.get(je.key === null ? pe : je.key) || null, K(ee, se, je, xt);
          case V:
            return se = se.get(je.key === null ? pe : je.key) || null, ye(ee, se, je, xt);
          case de:
            var Ut = je._init;
            return ft(se, ee, pe, Ut(je._payload), xt);
        }
        if (Te(je) || fe(je)) return se = se.get(pe) || null, Ue(ee, se, je, xt, null);
        Pf(ee, je);
      }
      return null;
    }
    function St(se, ee, pe, je) {
      for (var xt = null, Ut = null, Ft = ee, Bt = ee = 0, Fr = null; Ft !== null && Bt < pe.length; Bt++) {
        Ft.index > Bt ? (Fr = Ft, Ft = null) : Fr = Ft.sibling;
        var Rn = Ne(se, Ft, pe[Bt], je);
        if (Rn === null) {
          Ft === null && (Ft = Fr);
          break;
        }
        r && Ft && Rn.alternate === null && i(se, Ft), ee = w(Rn, ee, Bt), Ut === null ? xt = Rn : Ut.sibling = Rn, Ut = Rn, Ft = Fr;
      }
      if (Bt === pe.length) return u(se, Ft), Xn && rs(se, Bt), xt;
      if (Ft === null) {
        for (; Bt < pe.length; Bt++) Ft = Ie(se, pe[Bt], je), Ft !== null && (ee = w(Ft, ee, Bt), Ut === null ? xt = Ft : Ut.sibling = Ft, Ut = Ft);
        return Xn && rs(se, Bt), xt;
      }
      for (Ft = d(se, Ft); Bt < pe.length; Bt++) Fr = ft(Ft, se, Bt, pe[Bt], je), Fr !== null && (r && Fr.alternate !== null && Ft.delete(Fr.key === null ? Bt : Fr.key), ee = w(Fr, ee, Bt), Ut === null ? xt = Fr : Ut.sibling = Fr, Ut = Fr);
      return r && Ft.forEach(function(Oo) {
        return i(se, Oo);
      }), Xn && rs(se, Bt), xt;
    }
    function bt(se, ee, pe, je) {
      var xt = fe(pe);
      if (typeof xt != "function") throw Error(s(150));
      if (pe = xt.call(pe), pe == null) throw Error(s(151));
      for (var Ut = xt = null, Ft = ee, Bt = ee = 0, Fr = null, Rn = pe.next(); Ft !== null && !Rn.done; Bt++, Rn = pe.next()) {
        Ft.index > Bt ? (Fr = Ft, Ft = null) : Fr = Ft.sibling;
        var Oo = Ne(se, Ft, Rn.value, je);
        if (Oo === null) {
          Ft === null && (Ft = Fr);
          break;
        }
        r && Ft && Oo.alternate === null && i(se, Ft), ee = w(Oo, ee, Bt), Ut === null ? xt = Oo : Ut.sibling = Oo, Ut = Oo, Ft = Fr;
      }
      if (Rn.done) return u(
        se,
        Ft
      ), Xn && rs(se, Bt), xt;
      if (Ft === null) {
        for (; !Rn.done; Bt++, Rn = pe.next()) Rn = Ie(se, Rn.value, je), Rn !== null && (ee = w(Rn, ee, Bt), Ut === null ? xt = Rn : Ut.sibling = Rn, Ut = Rn);
        return Xn && rs(se, Bt), xt;
      }
      for (Ft = d(se, Ft); !Rn.done; Bt++, Rn = pe.next()) Rn = ft(Ft, se, Bt, Rn.value, je), Rn !== null && (r && Rn.alternate !== null && Ft.delete(Rn.key === null ? Bt : Rn.key), ee = w(Rn, ee, Bt), Ut === null ? xt = Rn : Ut.sibling = Rn, Ut = Rn);
      return r && Ft.forEach(function(iy) {
        return i(se, iy);
      }), Xn && rs(se, Bt), xt;
    }
    function pr(se, ee, pe, je) {
      if (typeof pe == "object" && pe !== null && pe.type === Y && pe.key === null && (pe = pe.props.children), typeof pe == "object" && pe !== null) {
        switch (pe.$$typeof) {
          case H:
            e: {
              for (var xt = pe.key, Ut = ee; Ut !== null; ) {
                if (Ut.key === xt) {
                  if (xt = pe.type, xt === Y) {
                    if (Ut.tag === 7) {
                      u(se, Ut.sibling), ee = y(Ut, pe.props.children), ee.return = se, se = ee;
                      break e;
                    }
                  } else if (Ut.elementType === xt || typeof xt == "object" && xt !== null && xt.$$typeof === de && Cm(xt) === Ut.type) {
                    u(se, Ut.sibling), ee = y(Ut, pe.props), ee.ref = as(se, Ut, pe), ee.return = se, se = ee;
                    break e;
                  }
                  u(se, Ut);
                  break;
                } else i(se, Ut);
                Ut = Ut.sibling;
              }
              pe.type === Y ? (ee = Vl(pe.props.children, se.mode, je, pe.key), ee.return = se, se = ee) : (je = $c(pe.type, pe.key, pe.props, null, se.mode, je), je.ref = as(se, ee, pe), je.return = se, se = je);
            }
            return O(se);
          case V:
            e: {
              for (Ut = pe.key; ee !== null; ) {
                if (ee.key === Ut) if (ee.tag === 4 && ee.stateNode.containerInfo === pe.containerInfo && ee.stateNode.implementation === pe.implementation) {
                  u(se, ee.sibling), ee = y(ee, pe.children || []), ee.return = se, se = ee;
                  break e;
                } else {
                  u(se, ee);
                  break;
                }
                else i(se, ee);
                ee = ee.sibling;
              }
              ee = gd(pe, se.mode, je), ee.return = se, se = ee;
            }
            return O(se);
          case de:
            return Ut = pe._init, pr(se, ee, Ut(pe._payload), je);
        }
        if (Te(pe)) return St(se, ee, pe, je);
        if (fe(pe)) return bt(se, ee, pe, je);
        Pf(se, pe);
      }
      return typeof pe == "string" && pe !== "" || typeof pe == "number" ? (pe = "" + pe, ee !== null && ee.tag === 6 ? (u(se, ee.sibling), ee = y(ee, pe), ee.return = se, se = ee) : (u(se, ee), ee = yv(pe, se.mode, je), ee.return = se, se = ee), O(se)) : u(se, ee);
    }
    return pr;
  }
  var ur = is(!0), it = is(!1), Ga = fi(null), Na = null, lu = null, Hp = null;
  function Vp() {
    Hp = lu = Na = null;
  }
  function Ip(r) {
    var i = Ga.current;
    Hn(Ga), r._currentValue = i;
  }
  function qp(r, i, u) {
    for (; r !== null; ) {
      var d = r.alternate;
      if ((r.childLanes & i) !== i ? (r.childLanes |= i, d !== null && (d.childLanes |= i)) : d !== null && (d.childLanes & i) !== i && (d.childLanes |= i), r === u) break;
      r = r.return;
    }
  }
  function nr(r, i) {
    Na = r, Hp = lu = null, r = r.dependencies, r !== null && r.firstContext !== null && ((r.lanes & i) !== 0 && (Er = !0), r.firstContext = null);
  }
  function vi(r) {
    var i = r._currentValue;
    if (Hp !== r) if (r = { context: r, memoizedValue: i, next: null }, lu === null) {
      if (Na === null) throw Error(s(308));
      lu = r, Na.dependencies = { lanes: 0, firstContext: r };
    } else lu = lu.next = r;
    return i;
  }
  var ls = null;
  function Yp(r) {
    ls === null ? ls = [r] : ls.push(r);
  }
  function Wp(r, i, u, d) {
    var y = i.interleaved;
    return y === null ? (u.next = u, Yp(i)) : (u.next = y.next, y.next = u), i.interleaved = u, Qa(r, d);
  }
  function Qa(r, i) {
    r.lanes |= i;
    var u = r.alternate;
    for (u !== null && (u.lanes |= i), u = r, r = r.return; r !== null; ) r.childLanes |= i, u = r.alternate, u !== null && (u.childLanes |= i), u = r, r = r.return;
    return u.tag === 3 ? u.stateNode : null;
  }
  var Xa = !1;
  function Bp(r) {
    r.updateQueue = { baseState: r.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function bm(r, i) {
    r = r.updateQueue, i.updateQueue === r && (i.updateQueue = { baseState: r.baseState, firstBaseUpdate: r.firstBaseUpdate, lastBaseUpdate: r.lastBaseUpdate, shared: r.shared, effects: r.effects });
  }
  function jl(r, i) {
    return { eventTime: r, lane: i, tag: 0, payload: null, callback: null, next: null };
  }
  function Eo(r, i, u) {
    var d = r.updateQueue;
    if (d === null) return null;
    if (d = d.shared, (hn & 2) !== 0) {
      var y = d.pending;
      return y === null ? i.next = i : (i.next = y.next, y.next = i), d.pending = i, Qa(r, u);
    }
    return y = d.interleaved, y === null ? (i.next = i, Yp(d)) : (i.next = y.next, y.next = i), d.interleaved = i, Qa(r, u);
  }
  function $f(r, i, u) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (u & 4194240) !== 0)) {
      var d = i.lanes;
      d &= r.pendingLanes, u |= d, i.lanes = u, _l(r, u);
    }
  }
  function Tm(r, i) {
    var u = r.updateQueue, d = r.alternate;
    if (d !== null && (d = d.updateQueue, u === d)) {
      var y = null, w = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var O = { eventTime: u.eventTime, lane: u.lane, tag: u.tag, payload: u.payload, callback: u.callback, next: null };
          w === null ? y = w = O : w = w.next = O, u = u.next;
        } while (u !== null);
        w === null ? y = w = i : w = w.next = i;
      } else y = w = i;
      u = { baseState: d.baseState, firstBaseUpdate: y, lastBaseUpdate: w, shared: d.shared, effects: d.effects }, r.updateQueue = u;
      return;
    }
    r = u.lastBaseUpdate, r === null ? u.firstBaseUpdate = i : r.next = i, u.lastBaseUpdate = i;
  }
  function fc(r, i, u, d) {
    var y = r.updateQueue;
    Xa = !1;
    var w = y.firstBaseUpdate, O = y.lastBaseUpdate, I = y.shared.pending;
    if (I !== null) {
      y.shared.pending = null;
      var K = I, ye = K.next;
      K.next = null, O === null ? w = ye : O.next = ye, O = K;
      var Ue = r.alternate;
      Ue !== null && (Ue = Ue.updateQueue, I = Ue.lastBaseUpdate, I !== O && (I === null ? Ue.firstBaseUpdate = ye : I.next = ye, Ue.lastBaseUpdate = K));
    }
    if (w !== null) {
      var Ie = y.baseState;
      O = 0, Ue = ye = K = null, I = w;
      do {
        var Ne = I.lane, ft = I.eventTime;
        if ((d & Ne) === Ne) {
          Ue !== null && (Ue = Ue.next = {
            eventTime: ft,
            lane: 0,
            tag: I.tag,
            payload: I.payload,
            callback: I.callback,
            next: null
          });
          e: {
            var St = r, bt = I;
            switch (Ne = i, ft = u, bt.tag) {
              case 1:
                if (St = bt.payload, typeof St == "function") {
                  Ie = St.call(ft, Ie, Ne);
                  break e;
                }
                Ie = St;
                break e;
              case 3:
                St.flags = St.flags & -65537 | 128;
              case 0:
                if (St = bt.payload, Ne = typeof St == "function" ? St.call(ft, Ie, Ne) : St, Ne == null) break e;
                Ie = ve({}, Ie, Ne);
                break e;
              case 2:
                Xa = !0;
            }
          }
          I.callback !== null && I.lane !== 0 && (r.flags |= 64, Ne = y.effects, Ne === null ? y.effects = [I] : Ne.push(I));
        } else ft = { eventTime: ft, lane: Ne, tag: I.tag, payload: I.payload, callback: I.callback, next: null }, Ue === null ? (ye = Ue = ft, K = Ie) : Ue = Ue.next = ft, O |= Ne;
        if (I = I.next, I === null) {
          if (I = y.shared.pending, I === null) break;
          Ne = I, I = Ne.next, Ne.next = null, y.lastBaseUpdate = Ne, y.shared.pending = null;
        }
      } while (!0);
      if (Ue === null && (K = Ie), y.baseState = K, y.firstBaseUpdate = ye, y.lastBaseUpdate = Ue, i = y.shared.interleaved, i !== null) {
        y = i;
        do
          O |= y.lane, y = y.next;
        while (y !== i);
      } else w === null && (y.shared.lanes = 0);
      pl |= O, r.lanes = O, r.memoizedState = Ie;
    }
  }
  function Gp(r, i, u) {
    if (r = i.effects, i.effects = null, r !== null) for (i = 0; i < r.length; i++) {
      var d = r[i], y = d.callback;
      if (y !== null) {
        if (d.callback = null, d = u, typeof y != "function") throw Error(s(191, y));
        y.call(d);
      }
    }
  }
  var dc = {}, ul = fi(dc), pc = fi(dc), vc = fi(dc);
  function os(r) {
    if (r === dc) throw Error(s(174));
    return r;
  }
  function Qp(r, i) {
    switch (_t(vc, i), _t(pc, r), _t(ul, dc), r = i.nodeType, r) {
      case 9:
      case 11:
        i = (i = i.documentElement) ? i.namespaceURI : mt(null, "");
        break;
      default:
        r = r === 8 ? i.parentNode : i, i = r.namespaceURI || null, r = r.tagName, i = mt(i, r);
    }
    Hn(ul), _t(ul, i);
  }
  function ss() {
    Hn(ul), Hn(pc), Hn(vc);
  }
  function Rm(r) {
    os(vc.current);
    var i = os(ul.current), u = mt(i, r.type);
    i !== u && (_t(pc, r), _t(ul, u));
  }
  function Hf(r) {
    pc.current === r && (Hn(ul), Hn(pc));
  }
  var rr = fi(0);
  function Vf(r) {
    for (var i = r; i !== null; ) {
      if (i.tag === 13) {
        var u = i.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || u.data === "$!")) return i;
      } else if (i.tag === 19 && i.memoizedProps.revealOrder !== void 0) {
        if ((i.flags & 128) !== 0) return i;
      } else if (i.child !== null) {
        i.child.return = i, i = i.child;
        continue;
      }
      if (i === r) break;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === r) return null;
        i = i.return;
      }
      i.sibling.return = i.return, i = i.sibling;
    }
    return null;
  }
  var hc = [];
  function kt() {
    for (var r = 0; r < hc.length; r++) hc[r]._workInProgressVersionPrimary = null;
    hc.length = 0;
  }
  var ln = F.ReactCurrentDispatcher, bn = F.ReactCurrentBatchConfig, zn = 0, Tn = null, xr = null, Ur = null, If = !1, mc = !1, us = 0, Ae = 0;
  function wn() {
    throw Error(s(321));
  }
  function Pt(r, i) {
    if (i === null) return !1;
    for (var u = 0; u < i.length && u < r.length; u++) if (!zi(r[u], i[u])) return !1;
    return !0;
  }
  function wo(r, i, u, d, y, w) {
    if (zn = w, Tn = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, ln.current = r === null || r.memoizedState === null ? ad : wc, r = u(d, y), mc) {
      w = 0;
      do {
        if (mc = !1, us = 0, 25 <= w) throw Error(s(301));
        w += 1, Ur = xr = null, i.updateQueue = null, ln.current = id, r = u(d, y);
      } while (mc);
    }
    if (ln.current = vs, i = xr !== null && xr.next !== null, zn = 0, Ur = xr = Tn = null, If = !1, i) throw Error(s(300));
    return r;
  }
  function ji() {
    var r = us !== 0;
    return us = 0, r;
  }
  function ta() {
    var r = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ur === null ? Tn.memoizedState = Ur = r : Ur = Ur.next = r, Ur;
  }
  function cr() {
    if (xr === null) {
      var r = Tn.alternate;
      r = r !== null ? r.memoizedState : null;
    } else r = xr.next;
    var i = Ur === null ? Tn.memoizedState : Ur.next;
    if (i !== null) Ur = i, xr = r;
    else {
      if (r === null) throw Error(s(310));
      xr = r, r = { memoizedState: xr.memoizedState, baseState: xr.baseState, baseQueue: xr.baseQueue, queue: xr.queue, next: null }, Ur === null ? Tn.memoizedState = Ur = r : Ur = Ur.next = r;
    }
    return Ur;
  }
  function Fl(r, i) {
    return typeof i == "function" ? i(r) : i;
  }
  function Co(r) {
    var i = cr(), u = i.queue;
    if (u === null) throw Error(s(311));
    u.lastRenderedReducer = r;
    var d = xr, y = d.baseQueue, w = u.pending;
    if (w !== null) {
      if (y !== null) {
        var O = y.next;
        y.next = w.next, w.next = O;
      }
      d.baseQueue = y = w, u.pending = null;
    }
    if (y !== null) {
      w = y.next, d = d.baseState;
      var I = O = null, K = null, ye = w;
      do {
        var Ue = ye.lane;
        if ((zn & Ue) === Ue) K !== null && (K = K.next = { lane: 0, action: ye.action, hasEagerState: ye.hasEagerState, eagerState: ye.eagerState, next: null }), d = ye.hasEagerState ? ye.eagerState : r(d, ye.action);
        else {
          var Ie = {
            lane: Ue,
            action: ye.action,
            hasEagerState: ye.hasEagerState,
            eagerState: ye.eagerState,
            next: null
          };
          K === null ? (I = K = Ie, O = d) : K = K.next = Ie, Tn.lanes |= Ue, pl |= Ue;
        }
        ye = ye.next;
      } while (ye !== null && ye !== w);
      K === null ? O = d : K.next = I, zi(d, i.memoizedState) || (Er = !0), i.memoizedState = d, i.baseState = O, i.baseQueue = K, u.lastRenderedState = d;
    }
    if (r = u.interleaved, r !== null) {
      y = r;
      do
        w = y.lane, Tn.lanes |= w, pl |= w, y = y.next;
      while (y !== r);
    } else y === null && (u.lanes = 0);
    return [i.memoizedState, u.dispatch];
  }
  function cs(r) {
    var i = cr(), u = i.queue;
    if (u === null) throw Error(s(311));
    u.lastRenderedReducer = r;
    var d = u.dispatch, y = u.pending, w = i.memoizedState;
    if (y !== null) {
      u.pending = null;
      var O = y = y.next;
      do
        w = r(w, O.action), O = O.next;
      while (O !== y);
      zi(w, i.memoizedState) || (Er = !0), i.memoizedState = w, i.baseQueue === null && (i.baseState = w), u.lastRenderedState = w;
    }
    return [w, d];
  }
  function qf() {
  }
  function Yf(r, i) {
    var u = Tn, d = cr(), y = i(), w = !zi(d.memoizedState, y);
    if (w && (d.memoizedState = y, Er = !0), d = d.queue, yc(Gf.bind(null, u, d, r), [r]), d.getSnapshot !== i || w || Ur !== null && Ur.memoizedState.tag & 1) {
      if (u.flags |= 2048, fs(9, Bf.bind(null, u, d, y, i), void 0, null), Or === null) throw Error(s(349));
      (zn & 30) !== 0 || Wf(u, i, y);
    }
    return y;
  }
  function Wf(r, i, u) {
    r.flags |= 16384, r = { getSnapshot: i, value: u }, i = Tn.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Tn.updateQueue = i, i.stores = [r]) : (u = i.stores, u === null ? i.stores = [r] : u.push(r));
  }
  function Bf(r, i, u, d) {
    i.value = u, i.getSnapshot = d, Qf(i) && Xf(r);
  }
  function Gf(r, i, u) {
    return u(function() {
      Qf(i) && Xf(r);
    });
  }
  function Qf(r) {
    var i = r.getSnapshot;
    r = r.value;
    try {
      var u = i();
      return !zi(r, u);
    } catch {
      return !0;
    }
  }
  function Xf(r) {
    var i = Qa(r, 1);
    i !== null && ma(i, r, 1, -1);
  }
  function Kf(r) {
    var i = ta();
    return typeof r == "function" && (r = r()), i.memoizedState = i.baseState = r, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Fl, lastRenderedState: r }, i.queue = r, r = r.dispatch = ps.bind(null, Tn, r), [i.memoizedState, r];
  }
  function fs(r, i, u, d) {
    return r = { tag: r, create: i, destroy: u, deps: d, next: null }, i = Tn.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Tn.updateQueue = i, i.lastEffect = r.next = r) : (u = i.lastEffect, u === null ? i.lastEffect = r.next = r : (d = u.next, u.next = r, r.next = d, i.lastEffect = r)), r;
  }
  function Zf() {
    return cr().memoizedState;
  }
  function ou(r, i, u, d) {
    var y = ta();
    Tn.flags |= r, y.memoizedState = fs(1 | i, u, void 0, d === void 0 ? null : d);
  }
  function su(r, i, u, d) {
    var y = cr();
    d = d === void 0 ? null : d;
    var w = void 0;
    if (xr !== null) {
      var O = xr.memoizedState;
      if (w = O.destroy, d !== null && Pt(d, O.deps)) {
        y.memoizedState = fs(i, u, w, d);
        return;
      }
    }
    Tn.flags |= r, y.memoizedState = fs(1 | i, u, w, d);
  }
  function Jf(r, i) {
    return ou(8390656, 8, r, i);
  }
  function yc(r, i) {
    return su(2048, 8, r, i);
  }
  function ed(r, i) {
    return su(4, 2, r, i);
  }
  function gc(r, i) {
    return su(4, 4, r, i);
  }
  function ds(r, i) {
    if (typeof i == "function") return r = r(), i(r), function() {
      i(null);
    };
    if (i != null) return r = r(), i.current = r, function() {
      i.current = null;
    };
  }
  function td(r, i, u) {
    return u = u != null ? u.concat([r]) : null, su(4, 4, ds.bind(null, i, r), u);
  }
  function Sc() {
  }
  function nd(r, i) {
    var u = cr();
    i = i === void 0 ? null : i;
    var d = u.memoizedState;
    return d !== null && i !== null && Pt(i, d[1]) ? d[0] : (u.memoizedState = [r, i], r);
  }
  function rd(r, i) {
    var u = cr();
    i = i === void 0 ? null : i;
    var d = u.memoizedState;
    return d !== null && i !== null && Pt(i, d[1]) ? d[0] : (r = r(), u.memoizedState = [r, i], r);
  }
  function Xp(r, i, u) {
    return (zn & 21) === 0 ? (r.baseState && (r.baseState = !1, Er = !0), r.memoizedState = u) : (zi(u, i) || (u = Hs(), Tn.lanes |= u, pl |= u, r.baseState = !0), i);
  }
  function xc(r, i) {
    var u = Cn;
    Cn = u !== 0 && 4 > u ? u : 4, r(!0);
    var d = bn.transition;
    bn.transition = {};
    try {
      r(!1), i();
    } finally {
      Cn = u, bn.transition = d;
    }
  }
  function Kp() {
    return cr().memoizedState;
  }
  function Ec(r, i, u) {
    var d = vl(r);
    if (u = { lane: d, action: u, hasEagerState: !1, eagerState: null, next: null }, za(r)) Mm(i, u);
    else if (u = Wp(r, i, u, d), u !== null) {
      var y = br();
      ma(u, r, d, y), Pn(u, i, d);
    }
  }
  function ps(r, i, u) {
    var d = vl(r), y = { lane: d, action: u, hasEagerState: !1, eagerState: null, next: null };
    if (za(r)) Mm(i, y);
    else {
      var w = r.alternate;
      if (r.lanes === 0 && (w === null || w.lanes === 0) && (w = i.lastRenderedReducer, w !== null)) try {
        var O = i.lastRenderedState, I = w(O, u);
        if (y.hasEagerState = !0, y.eagerState = I, zi(I, O)) {
          var K = i.interleaved;
          K === null ? (y.next = y, Yp(i)) : (y.next = K.next, K.next = y), i.interleaved = y;
          return;
        }
      } catch {
      }
      u = Wp(r, i, y, d), u !== null && (y = br(), ma(u, r, d, y), Pn(u, i, d));
    }
  }
  function za(r) {
    var i = r.alternate;
    return r === Tn || i !== null && i === Tn;
  }
  function Mm(r, i) {
    mc = If = !0;
    var u = r.pending;
    u === null ? i.next = i : (i.next = u.next, u.next = i), r.pending = i;
  }
  function Pn(r, i, u) {
    if ((u & 4194240) !== 0) {
      var d = i.lanes;
      d &= r.pendingLanes, u |= d, i.lanes = u, _l(r, u);
    }
  }
  var vs = { readContext: vi, useCallback: wn, useContext: wn, useEffect: wn, useImperativeHandle: wn, useInsertionEffect: wn, useLayoutEffect: wn, useMemo: wn, useReducer: wn, useRef: wn, useState: wn, useDebugValue: wn, useDeferredValue: wn, useTransition: wn, useMutableSource: wn, useSyncExternalStore: wn, useId: wn, unstable_isNewReconciler: !1 }, ad = { readContext: vi, useCallback: function(r, i) {
    return ta().memoizedState = [r, i === void 0 ? null : i], r;
  }, useContext: vi, useEffect: Jf, useImperativeHandle: function(r, i, u) {
    return u = u != null ? u.concat([r]) : null, ou(
      4194308,
      4,
      ds.bind(null, i, r),
      u
    );
  }, useLayoutEffect: function(r, i) {
    return ou(4194308, 4, r, i);
  }, useInsertionEffect: function(r, i) {
    return ou(4, 2, r, i);
  }, useMemo: function(r, i) {
    var u = ta();
    return i = i === void 0 ? null : i, r = r(), u.memoizedState = [r, i], r;
  }, useReducer: function(r, i, u) {
    var d = ta();
    return i = u !== void 0 ? u(i) : i, d.memoizedState = d.baseState = i, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: r, lastRenderedState: i }, d.queue = r, r = r.dispatch = Ec.bind(null, Tn, r), [d.memoizedState, r];
  }, useRef: function(r) {
    var i = ta();
    return r = { current: r }, i.memoizedState = r;
  }, useState: Kf, useDebugValue: Sc, useDeferredValue: function(r) {
    return ta().memoizedState = r;
  }, useTransition: function() {
    var r = Kf(!1), i = r[0];
    return r = xc.bind(null, r[1]), ta().memoizedState = r, [i, r];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(r, i, u) {
    var d = Tn, y = ta();
    if (Xn) {
      if (u === void 0) throw Error(s(407));
      u = u();
    } else {
      if (u = i(), Or === null) throw Error(s(349));
      (zn & 30) !== 0 || Wf(d, i, u);
    }
    y.memoizedState = u;
    var w = { value: u, getSnapshot: i };
    return y.queue = w, Jf(Gf.bind(
      null,
      d,
      w,
      r
    ), [r]), d.flags |= 2048, fs(9, Bf.bind(null, d, w, u, i), void 0, null), u;
  }, useId: function() {
    var r = ta(), i = Or.identifierPrefix;
    if (Xn) {
      var u = sl, d = ol;
      u = (d & ~(1 << 32 - $r(d) - 1)).toString(32) + u, i = ":" + i + "R" + u, u = us++, 0 < u && (i += "H" + u.toString(32)), i += ":";
    } else u = Ae++, i = ":" + i + "r" + u.toString(32) + ":";
    return r.memoizedState = i;
  }, unstable_isNewReconciler: !1 }, wc = {
    readContext: vi,
    useCallback: nd,
    useContext: vi,
    useEffect: yc,
    useImperativeHandle: td,
    useInsertionEffect: ed,
    useLayoutEffect: gc,
    useMemo: rd,
    useReducer: Co,
    useRef: Zf,
    useState: function() {
      return Co(Fl);
    },
    useDebugValue: Sc,
    useDeferredValue: function(r) {
      var i = cr();
      return Xp(i, xr.memoizedState, r);
    },
    useTransition: function() {
      var r = Co(Fl)[0], i = cr().memoizedState;
      return [r, i];
    },
    useMutableSource: qf,
    useSyncExternalStore: Yf,
    useId: Kp,
    unstable_isNewReconciler: !1
  }, id = { readContext: vi, useCallback: nd, useContext: vi, useEffect: yc, useImperativeHandle: td, useInsertionEffect: ed, useLayoutEffect: gc, useMemo: rd, useReducer: cs, useRef: Zf, useState: function() {
    return cs(Fl);
  }, useDebugValue: Sc, useDeferredValue: function(r) {
    var i = cr();
    return xr === null ? i.memoizedState = r : Xp(i, xr.memoizedState, r);
  }, useTransition: function() {
    var r = cs(Fl)[0], i = cr().memoizedState;
    return [r, i];
  }, useMutableSource: qf, useSyncExternalStore: Yf, useId: Kp, unstable_isNewReconciler: !1 };
  function Fi(r, i) {
    if (r && r.defaultProps) {
      i = ve({}, i), r = r.defaultProps;
      for (var u in r) i[u] === void 0 && (i[u] = r[u]);
      return i;
    }
    return i;
  }
  function Zp(r, i, u, d) {
    i = r.memoizedState, u = u(d, i), u = u == null ? i : ve({}, i, u), r.memoizedState = u, r.lanes === 0 && (r.updateQueue.baseState = u);
  }
  var ld = { isMounted: function(r) {
    return (r = r._reactInternals) ? Yt(r) === r : !1;
  }, enqueueSetState: function(r, i, u) {
    r = r._reactInternals;
    var d = br(), y = vl(r), w = jl(d, y);
    w.payload = i, u != null && (w.callback = u), i = Eo(r, w, y), i !== null && (ma(i, r, y, d), $f(i, r, y));
  }, enqueueReplaceState: function(r, i, u) {
    r = r._reactInternals;
    var d = br(), y = vl(r), w = jl(d, y);
    w.tag = 1, w.payload = i, u != null && (w.callback = u), i = Eo(r, w, y), i !== null && (ma(i, r, y, d), $f(i, r, y));
  }, enqueueForceUpdate: function(r, i) {
    r = r._reactInternals;
    var u = br(), d = vl(r), y = jl(u, d);
    y.tag = 2, i != null && (y.callback = i), i = Eo(r, y, d), i !== null && (ma(i, r, d, u), $f(i, r, d));
  } };
  function _m(r, i, u, d, y, w, O) {
    return r = r.stateNode, typeof r.shouldComponentUpdate == "function" ? r.shouldComponentUpdate(d, w, O) : i.prototype && i.prototype.isPureReactComponent ? !tc(u, d) || !tc(y, w) : !0;
  }
  function od(r, i, u) {
    var d = !1, y = ea, w = i.contextType;
    return typeof w == "object" && w !== null ? w = vi(w) : (y = gr(i) ? ka : or.current, d = i.contextTypes, w = (d = d != null) ? Oa(r, y) : ea), i = new i(u, w), r.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = ld, r.stateNode = i, i._reactInternals = r, d && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = y, r.__reactInternalMemoizedMaskedChildContext = w), i;
  }
  function Dm(r, i, u, d) {
    r = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(u, d), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(u, d), i.state !== r && ld.enqueueReplaceState(i, i.state, null);
  }
  function Cc(r, i, u, d) {
    var y = r.stateNode;
    y.props = u, y.state = r.memoizedState, y.refs = {}, Bp(r);
    var w = i.contextType;
    typeof w == "object" && w !== null ? y.context = vi(w) : (w = gr(i) ? ka : or.current, y.context = Oa(r, w)), y.state = r.memoizedState, w = i.getDerivedStateFromProps, typeof w == "function" && (Zp(r, i, w, u), y.state = r.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof y.getSnapshotBeforeUpdate == "function" || typeof y.UNSAFE_componentWillMount != "function" && typeof y.componentWillMount != "function" || (i = y.state, typeof y.componentWillMount == "function" && y.componentWillMount(), typeof y.UNSAFE_componentWillMount == "function" && y.UNSAFE_componentWillMount(), i !== y.state && ld.enqueueReplaceState(y, y.state, null), fc(r, u, y, d), y.state = r.memoizedState), typeof y.componentDidMount == "function" && (r.flags |= 4194308);
  }
  function hs(r, i) {
    try {
      var u = "", d = i;
      do
        u += ze(d), d = d.return;
      while (d);
      var y = u;
    } catch (w) {
      y = `
Error generating stack: ` + w.message + `
` + w.stack;
    }
    return { value: r, source: i, stack: y, digest: null };
  }
  function Jp(r, i, u) {
    return { value: r, source: null, stack: u ?? null, digest: i ?? null };
  }
  function ev(r, i) {
    try {
      console.error(i.value);
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  var sd = typeof WeakMap == "function" ? WeakMap : Map;
  function km(r, i, u) {
    u = jl(-1, u), u.tag = 3, u.payload = { element: null };
    var d = i.value;
    return u.callback = function() {
      vu || (vu = !0, gs = d), ev(r, i);
    }, u;
  }
  function tv(r, i, u) {
    u = jl(-1, u), u.tag = 3;
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var y = i.value;
      u.payload = function() {
        return d(y);
      }, u.callback = function() {
        ev(r, i);
      };
    }
    var w = r.stateNode;
    return w !== null && typeof w.componentDidCatch == "function" && (u.callback = function() {
      ev(r, i), typeof d != "function" && (Ro === null ? Ro = /* @__PURE__ */ new Set([this]) : Ro.add(this));
      var O = i.stack;
      this.componentDidCatch(i.value, { componentStack: O !== null ? O : "" });
    }), u;
  }
  function nv(r, i, u) {
    var d = r.pingCache;
    if (d === null) {
      d = r.pingCache = new sd();
      var y = /* @__PURE__ */ new Set();
      d.set(i, y);
    } else y = d.get(i), y === void 0 && (y = /* @__PURE__ */ new Set(), d.set(i, y));
    y.has(u) || (y.add(u), r = P1.bind(null, r, i, u), i.then(r, r));
  }
  function Om(r) {
    do {
      var i;
      if ((i = r.tag === 13) && (i = r.memoizedState, i = i !== null ? i.dehydrated !== null : !0), i) return r;
      r = r.return;
    } while (r !== null);
    return null;
  }
  function bo(r, i, u, d, y) {
    return (r.mode & 1) === 0 ? (r === i ? r.flags |= 65536 : (r.flags |= 128, u.flags |= 131072, u.flags &= -52805, u.tag === 1 && (u.alternate === null ? u.tag = 17 : (i = jl(-1, 1), i.tag = 2, Eo(u, i, 1))), u.lanes |= 1), r) : (r.flags |= 65536, r.lanes = y, r);
  }
  var bc = F.ReactCurrentOwner, Er = !1;
  function Ir(r, i, u, d) {
    i.child = r === null ? it(i, null, u, d) : ur(i, r.child, u, d);
  }
  function Ua(r, i, u, d, y) {
    u = u.render;
    var w = i.ref;
    return nr(i, y), d = wo(r, i, u, d, w, y), u = ji(), r !== null && !Er ? (i.updateQueue = r.updateQueue, i.flags &= -2053, r.lanes &= ~y, mi(r, i, y)) : (Xn && u && Uf(i), i.flags |= 1, Ir(r, i, d, y), i.child);
  }
  function ms(r, i, u, d, y) {
    if (r === null) {
      var w = u.type;
      return typeof w == "function" && !mv(w) && w.defaultProps === void 0 && u.compare === null && u.defaultProps === void 0 ? (i.tag = 15, i.type = w, Jt(r, i, w, d, y)) : (r = $c(u.type, null, d, i, i.mode, y), r.ref = i.ref, r.return = i, i.child = r);
    }
    if (w = r.child, (r.lanes & y) === 0) {
      var O = w.memoizedProps;
      if (u = u.compare, u = u !== null ? u : tc, u(O, d) && r.ref === i.ref) return mi(r, i, y);
    }
    return i.flags |= 1, r = _o(w, d), r.ref = i.ref, r.return = i, i.child = r;
  }
  function Jt(r, i, u, d, y) {
    if (r !== null) {
      var w = r.memoizedProps;
      if (tc(w, d) && r.ref === i.ref) if (Er = !1, i.pendingProps = d = w, (r.lanes & y) !== 0) (r.flags & 131072) !== 0 && (Er = !0);
      else return i.lanes = r.lanes, mi(r, i, y);
    }
    return Am(r, i, u, d, y);
  }
  function Tc(r, i, u) {
    var d = i.pendingProps, y = d.children, w = r !== null ? r.memoizedState : null;
    if (d.mode === "hidden") if ((i.mode & 1) === 0) i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, _t(fu, Ka), Ka |= u;
    else {
      if ((u & 1073741824) === 0) return r = w !== null ? w.baseLanes | u : u, i.lanes = i.childLanes = 1073741824, i.memoizedState = { baseLanes: r, cachePool: null, transitions: null }, i.updateQueue = null, _t(fu, Ka), Ka |= r, null;
      i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, d = w !== null ? w.baseLanes : u, _t(fu, Ka), Ka |= d;
    }
    else w !== null ? (d = w.baseLanes | u, i.memoizedState = null) : d = u, _t(fu, Ka), Ka |= d;
    return Ir(r, i, y, u), i.child;
  }
  function rv(r, i) {
    var u = i.ref;
    (r === null && u !== null || r !== null && r.ref !== u) && (i.flags |= 512, i.flags |= 2097152);
  }
  function Am(r, i, u, d, y) {
    var w = gr(u) ? ka : or.current;
    return w = Oa(i, w), nr(i, y), u = wo(r, i, u, d, w, y), d = ji(), r !== null && !Er ? (i.updateQueue = r.updateQueue, i.flags &= -2053, r.lanes &= ~y, mi(r, i, y)) : (Xn && d && Uf(i), i.flags |= 1, Ir(r, i, u, y), i.child);
  }
  function Lm(r, i, u, d, y) {
    if (gr(u)) {
      var w = !0;
      zr(i);
    } else w = !1;
    if (nr(i, y), i.stateNode === null) hi(r, i), od(i, u, d), Cc(i, u, d, y), d = !0;
    else if (r === null) {
      var O = i.stateNode, I = i.memoizedProps;
      O.props = I;
      var K = O.context, ye = u.contextType;
      typeof ye == "object" && ye !== null ? ye = vi(ye) : (ye = gr(u) ? ka : or.current, ye = Oa(i, ye));
      var Ue = u.getDerivedStateFromProps, Ie = typeof Ue == "function" || typeof O.getSnapshotBeforeUpdate == "function";
      Ie || typeof O.UNSAFE_componentWillReceiveProps != "function" && typeof O.componentWillReceiveProps != "function" || (I !== d || K !== ye) && Dm(i, O, d, ye), Xa = !1;
      var Ne = i.memoizedState;
      O.state = Ne, fc(i, d, O, y), K = i.memoizedState, I !== d || Ne !== K || Dr.current || Xa ? (typeof Ue == "function" && (Zp(i, u, Ue, d), K = i.memoizedState), (I = Xa || _m(i, u, I, d, Ne, K, ye)) ? (Ie || typeof O.UNSAFE_componentWillMount != "function" && typeof O.componentWillMount != "function" || (typeof O.componentWillMount == "function" && O.componentWillMount(), typeof O.UNSAFE_componentWillMount == "function" && O.UNSAFE_componentWillMount()), typeof O.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof O.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = d, i.memoizedState = K), O.props = d, O.state = K, O.context = ye, d = I) : (typeof O.componentDidMount == "function" && (i.flags |= 4194308), d = !1);
    } else {
      O = i.stateNode, bm(r, i), I = i.memoizedProps, ye = i.type === i.elementType ? I : Fi(i.type, I), O.props = ye, Ie = i.pendingProps, Ne = O.context, K = u.contextType, typeof K == "object" && K !== null ? K = vi(K) : (K = gr(u) ? ka : or.current, K = Oa(i, K));
      var ft = u.getDerivedStateFromProps;
      (Ue = typeof ft == "function" || typeof O.getSnapshotBeforeUpdate == "function") || typeof O.UNSAFE_componentWillReceiveProps != "function" && typeof O.componentWillReceiveProps != "function" || (I !== Ie || Ne !== K) && Dm(i, O, d, K), Xa = !1, Ne = i.memoizedState, O.state = Ne, fc(i, d, O, y);
      var St = i.memoizedState;
      I !== Ie || Ne !== St || Dr.current || Xa ? (typeof ft == "function" && (Zp(i, u, ft, d), St = i.memoizedState), (ye = Xa || _m(i, u, ye, d, Ne, St, K) || !1) ? (Ue || typeof O.UNSAFE_componentWillUpdate != "function" && typeof O.componentWillUpdate != "function" || (typeof O.componentWillUpdate == "function" && O.componentWillUpdate(d, St, K), typeof O.UNSAFE_componentWillUpdate == "function" && O.UNSAFE_componentWillUpdate(d, St, K)), typeof O.componentDidUpdate == "function" && (i.flags |= 4), typeof O.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof O.componentDidUpdate != "function" || I === r.memoizedProps && Ne === r.memoizedState || (i.flags |= 4), typeof O.getSnapshotBeforeUpdate != "function" || I === r.memoizedProps && Ne === r.memoizedState || (i.flags |= 1024), i.memoizedProps = d, i.memoizedState = St), O.props = d, O.state = St, O.context = K, d = ye) : (typeof O.componentDidUpdate != "function" || I === r.memoizedProps && Ne === r.memoizedState || (i.flags |= 4), typeof O.getSnapshotBeforeUpdate != "function" || I === r.memoizedProps && Ne === r.memoizedState || (i.flags |= 1024), d = !1);
    }
    return Rc(r, i, u, d, w, y);
  }
  function Rc(r, i, u, d, y, w) {
    rv(r, i);
    var O = (i.flags & 128) !== 0;
    if (!d && !O) return y && Nf(i, u, !1), mi(r, i, w);
    d = i.stateNode, bc.current = i;
    var I = O && typeof u.getDerivedStateFromError != "function" ? null : d.render();
    return i.flags |= 1, r !== null && O ? (i.child = ur(i, r.child, null, w), i.child = ur(i, null, I, w)) : Ir(r, i, I, w), i.memoizedState = d.state, y && Nf(i, u, !0), i.child;
  }
  function uu(r) {
    var i = r.stateNode;
    i.pendingContext ? xm(r, i.pendingContext, i.pendingContext !== i.context) : i.context && xm(r, i.context, !1), Qp(r, i.containerInfo);
  }
  function Nm(r, i, u, d, y) {
    return xo(), Ul(y), i.flags |= 256, Ir(r, i, u, d), i.child;
  }
  var ud = { dehydrated: null, treeContext: null, retryLane: 0 };
  function av(r) {
    return { baseLanes: r, cachePool: null, transitions: null };
  }
  function cd(r, i, u) {
    var d = i.pendingProps, y = rr.current, w = !1, O = (i.flags & 128) !== 0, I;
    if ((I = O) || (I = r !== null && r.memoizedState === null ? !1 : (y & 2) !== 0), I ? (w = !0, i.flags &= -129) : (r === null || r.memoizedState !== null) && (y |= 1), _t(rr, y & 1), r === null)
      return $p(i), r = i.memoizedState, r !== null && (r = r.dehydrated, r !== null) ? ((i.mode & 1) === 0 ? i.lanes = 1 : r.data === "$!" ? i.lanes = 8 : i.lanes = 1073741824, null) : (O = d.children, r = d.fallback, w ? (d = i.mode, w = i.child, O = { mode: "hidden", children: O }, (d & 1) === 0 && w !== null ? (w.childLanes = 0, w.pendingProps = O) : w = Do(O, d, 0, null), r = Vl(r, d, u, null), w.return = i, r.return = i, w.sibling = r, i.child = w, i.child.memoizedState = av(u), i.memoizedState = ud, r) : iv(i, O));
    if (y = r.memoizedState, y !== null && (I = y.dehydrated, I !== null)) return zm(r, i, O, d, I, y, u);
    if (w) {
      w = d.fallback, O = i.mode, y = r.child, I = y.sibling;
      var K = { mode: "hidden", children: d.children };
      return (O & 1) === 0 && i.child !== y ? (d = i.child, d.childLanes = 0, d.pendingProps = K, i.deletions = null) : (d = _o(y, K), d.subtreeFlags = y.subtreeFlags & 14680064), I !== null ? w = _o(I, w) : (w = Vl(w, O, u, null), w.flags |= 2), w.return = i, d.return = i, d.sibling = w, i.child = d, d = w, w = i.child, O = r.child.memoizedState, O = O === null ? av(u) : { baseLanes: O.baseLanes | u, cachePool: null, transitions: O.transitions }, w.memoizedState = O, w.childLanes = r.childLanes & ~u, i.memoizedState = ud, d;
    }
    return w = r.child, r = w.sibling, d = _o(w, { mode: "visible", children: d.children }), (i.mode & 1) === 0 && (d.lanes = u), d.return = i, d.sibling = null, r !== null && (u = i.deletions, u === null ? (i.deletions = [r], i.flags |= 16) : u.push(r)), i.child = d, i.memoizedState = null, d;
  }
  function iv(r, i) {
    return i = Do({ mode: "visible", children: i }, r.mode, 0, null), i.return = r, r.child = i;
  }
  function Mc(r, i, u, d) {
    return d !== null && Ul(d), ur(i, r.child, null, u), r = iv(i, i.pendingProps.children), r.flags |= 2, i.memoizedState = null, r;
  }
  function zm(r, i, u, d, y, w, O) {
    if (u)
      return i.flags & 256 ? (i.flags &= -257, d = Jp(Error(s(422))), Mc(r, i, O, d)) : i.memoizedState !== null ? (i.child = r.child, i.flags |= 128, null) : (w = d.fallback, y = i.mode, d = Do({ mode: "visible", children: d.children }, y, 0, null), w = Vl(w, y, O, null), w.flags |= 2, d.return = i, w.return = i, d.sibling = w, i.child = d, (i.mode & 1) !== 0 && ur(i, r.child, null, O), i.child.memoizedState = av(O), i.memoizedState = ud, w);
    if ((i.mode & 1) === 0) return Mc(r, i, O, null);
    if (y.data === "$!") {
      if (d = y.nextSibling && y.nextSibling.dataset, d) var I = d.dgst;
      return d = I, w = Error(s(419)), d = Jp(w, d, void 0), Mc(r, i, O, d);
    }
    if (I = (O & r.childLanes) !== 0, Er || I) {
      if (d = Or, d !== null) {
        switch (O & -O) {
          case 4:
            y = 2;
            break;
          case 16:
            y = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            y = 32;
            break;
          case 536870912:
            y = 268435456;
            break;
          default:
            y = 0;
        }
        y = (y & (d.suspendedLanes | O)) !== 0 ? 0 : y, y !== 0 && y !== w.retryLane && (w.retryLane = y, Qa(r, y), ma(d, r, y, -1));
      }
      return hv(), d = Jp(Error(s(421))), Mc(r, i, O, d);
    }
    return y.data === "$?" ? (i.flags |= 128, i.child = r.child, i = $1.bind(null, r), y._reactRetry = i, null) : (r = w.treeContext, La = rl(y.nextSibling), Aa = i, Xn = !0, pi = null, r !== null && (Sr[di++] = ol, Sr[di++] = sl, Sr[di++] = Ba, ol = r.id, sl = r.overflow, Ba = i), i = iv(i, d.children), i.flags |= 4096, i);
  }
  function lv(r, i, u) {
    r.lanes |= i;
    var d = r.alternate;
    d !== null && (d.lanes |= i), qp(r.return, i, u);
  }
  function pa(r, i, u, d, y) {
    var w = r.memoizedState;
    w === null ? r.memoizedState = { isBackwards: i, rendering: null, renderingStartTime: 0, last: d, tail: u, tailMode: y } : (w.isBackwards = i, w.rendering = null, w.renderingStartTime = 0, w.last = d, w.tail = u, w.tailMode = y);
  }
  function cl(r, i, u) {
    var d = i.pendingProps, y = d.revealOrder, w = d.tail;
    if (Ir(r, i, d.children, u), d = rr.current, (d & 2) !== 0) d = d & 1 | 2, i.flags |= 128;
    else {
      if (r !== null && (r.flags & 128) !== 0) e: for (r = i.child; r !== null; ) {
        if (r.tag === 13) r.memoizedState !== null && lv(r, u, i);
        else if (r.tag === 19) lv(r, u, i);
        else if (r.child !== null) {
          r.child.return = r, r = r.child;
          continue;
        }
        if (r === i) break e;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === i) break e;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
      d &= 1;
    }
    if (_t(rr, d), (i.mode & 1) === 0) i.memoizedState = null;
    else switch (y) {
      case "forwards":
        for (u = i.child, y = null; u !== null; ) r = u.alternate, r !== null && Vf(r) === null && (y = u), u = u.sibling;
        u = y, u === null ? (y = i.child, i.child = null) : (y = u.sibling, u.sibling = null), pa(i, !1, y, u, w);
        break;
      case "backwards":
        for (u = null, y = i.child, i.child = null; y !== null; ) {
          if (r = y.alternate, r !== null && Vf(r) === null) {
            i.child = y;
            break;
          }
          r = y.sibling, y.sibling = u, u = y, y = r;
        }
        pa(i, !0, u, null, w);
        break;
      case "together":
        pa(i, !1, null, null, void 0);
        break;
      default:
        i.memoizedState = null;
    }
    return i.child;
  }
  function hi(r, i) {
    (i.mode & 1) === 0 && r !== null && (r.alternate = null, i.alternate = null, i.flags |= 2);
  }
  function mi(r, i, u) {
    if (r !== null && (i.dependencies = r.dependencies), pl |= i.lanes, (u & i.childLanes) === 0) return null;
    if (r !== null && i.child !== r.child) throw Error(s(153));
    if (i.child !== null) {
      for (r = i.child, u = _o(r, r.pendingProps), i.child = u, u.return = i; r.sibling !== null; ) r = r.sibling, u = u.sibling = _o(r, r.pendingProps), u.return = i;
      u.sibling = null;
    }
    return i.child;
  }
  function _c(r, i, u) {
    switch (i.tag) {
      case 3:
        uu(i), xo();
        break;
      case 5:
        Rm(i);
        break;
      case 1:
        gr(i.type) && zr(i);
        break;
      case 4:
        Qp(i, i.stateNode.containerInfo);
        break;
      case 10:
        var d = i.type._context, y = i.memoizedProps.value;
        _t(Ga, d._currentValue), d._currentValue = y;
        break;
      case 13:
        if (d = i.memoizedState, d !== null)
          return d.dehydrated !== null ? (_t(rr, rr.current & 1), i.flags |= 128, null) : (u & i.child.childLanes) !== 0 ? cd(r, i, u) : (_t(rr, rr.current & 1), r = mi(r, i, u), r !== null ? r.sibling : null);
        _t(rr, rr.current & 1);
        break;
      case 19:
        if (d = (u & i.childLanes) !== 0, (r.flags & 128) !== 0) {
          if (d) return cl(r, i, u);
          i.flags |= 128;
        }
        if (y = i.memoizedState, y !== null && (y.rendering = null, y.tail = null, y.lastEffect = null), _t(rr, rr.current), d) break;
        return null;
      case 22:
      case 23:
        return i.lanes = 0, Tc(r, i, u);
    }
    return mi(r, i, u);
  }
  var yi, wr, Um, jm;
  yi = function(r, i) {
    for (var u = i.child; u !== null; ) {
      if (u.tag === 5 || u.tag === 6) r.appendChild(u.stateNode);
      else if (u.tag !== 4 && u.child !== null) {
        u.child.return = u, u = u.child;
        continue;
      }
      if (u === i) break;
      for (; u.sibling === null; ) {
        if (u.return === null || u.return === i) return;
        u = u.return;
      }
      u.sibling.return = u.return, u = u.sibling;
    }
  }, wr = function() {
  }, Um = function(r, i, u, d) {
    var y = r.memoizedProps;
    if (y !== d) {
      r = i.stateNode, os(ul.current);
      var w = null;
      switch (u) {
        case "input":
          y = Re(r, y), d = Re(r, d), w = [];
          break;
        case "select":
          y = ve({}, y, { value: void 0 }), d = ve({}, d, { value: void 0 }), w = [];
          break;
        case "textarea":
          y = Ke(r, y), d = Ke(r, d), w = [];
          break;
        default:
          typeof y.onClick != "function" && typeof d.onClick == "function" && (r.onclick = vo);
      }
      Tt(u, d);
      var O;
      u = null;
      for (ye in y) if (!d.hasOwnProperty(ye) && y.hasOwnProperty(ye) && y[ye] != null) if (ye === "style") {
        var I = y[ye];
        for (O in I) I.hasOwnProperty(O) && (u || (u = {}), u[O] = "");
      } else ye !== "dangerouslySetInnerHTML" && ye !== "children" && ye !== "suppressContentEditableWarning" && ye !== "suppressHydrationWarning" && ye !== "autoFocus" && (p.hasOwnProperty(ye) ? w || (w = []) : (w = w || []).push(ye, null));
      for (ye in d) {
        var K = d[ye];
        if (I = y?.[ye], d.hasOwnProperty(ye) && K !== I && (K != null || I != null)) if (ye === "style") if (I) {
          for (O in I) !I.hasOwnProperty(O) || K && K.hasOwnProperty(O) || (u || (u = {}), u[O] = "");
          for (O in K) K.hasOwnProperty(O) && I[O] !== K[O] && (u || (u = {}), u[O] = K[O]);
        } else u || (w || (w = []), w.push(
          ye,
          u
        )), u = K;
        else ye === "dangerouslySetInnerHTML" ? (K = K ? K.__html : void 0, I = I ? I.__html : void 0, K != null && I !== K && (w = w || []).push(ye, K)) : ye === "children" ? typeof K != "string" && typeof K != "number" || (w = w || []).push(ye, "" + K) : ye !== "suppressContentEditableWarning" && ye !== "suppressHydrationWarning" && (p.hasOwnProperty(ye) ? (K != null && ye === "onScroll" && Dn("scroll", r), w || I === K || (w = [])) : (w = w || []).push(ye, K));
      }
      u && (w = w || []).push("style", u);
      var ye = w;
      (i.updateQueue = ye) && (i.flags |= 4);
    }
  }, jm = function(r, i, u, d) {
    u !== d && (i.flags |= 4);
  };
  function Dc(r, i) {
    if (!Xn) switch (r.tailMode) {
      case "hidden":
        i = r.tail;
        for (var u = null; i !== null; ) i.alternate !== null && (u = i), i = i.sibling;
        u === null ? r.tail = null : u.sibling = null;
        break;
      case "collapsed":
        u = r.tail;
        for (var d = null; u !== null; ) u.alternate !== null && (d = u), u = u.sibling;
        d === null ? i || r.tail === null ? r.tail = null : r.tail.sibling = null : d.sibling = null;
    }
  }
  function jr(r) {
    var i = r.alternate !== null && r.alternate.child === r.child, u = 0, d = 0;
    if (i) for (var y = r.child; y !== null; ) u |= y.lanes | y.childLanes, d |= y.subtreeFlags & 14680064, d |= y.flags & 14680064, y.return = r, y = y.sibling;
    else for (y = r.child; y !== null; ) u |= y.lanes | y.childLanes, d |= y.subtreeFlags, d |= y.flags, y.return = r, y = y.sibling;
    return r.subtreeFlags |= d, r.childLanes = u, i;
  }
  function Fm(r, i, u) {
    var d = i.pendingProps;
    switch (jf(i), i.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return jr(i), null;
      case 1:
        return gr(i.type) && au(), jr(i), null;
      case 3:
        return d = i.stateNode, ss(), Hn(Dr), Hn(or), kt(), d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), (r === null || r.child === null) && (Ff(i) ? i.flags |= 4 : r === null || r.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, pi !== null && (Ss(pi), pi = null))), wr(r, i), jr(i), null;
      case 5:
        Hf(i);
        var y = os(vc.current);
        if (u = i.type, r !== null && i.stateNode != null) Um(r, i, u, d, y), r.ref !== i.ref && (i.flags |= 512, i.flags |= 2097152);
        else {
          if (!d) {
            if (i.stateNode === null) throw Error(s(166));
            return jr(i), null;
          }
          if (r = os(ul.current), Ff(i)) {
            d = i.stateNode, u = i.type;
            var w = i.memoizedProps;
            switch (d[al] = i, d[oc] = w, r = (i.mode & 1) !== 0, u) {
              case "dialog":
                Dn("cancel", d), Dn("close", d);
                break;
              case "iframe":
              case "object":
              case "embed":
                Dn("load", d);
                break;
              case "video":
              case "audio":
                for (y = 0; y < ac.length; y++) Dn(ac[y], d);
                break;
              case "source":
                Dn("error", d);
                break;
              case "img":
              case "image":
              case "link":
                Dn(
                  "error",
                  d
                ), Dn("load", d);
                break;
              case "details":
                Dn("toggle", d);
                break;
              case "input":
                Ye(d, w), Dn("invalid", d);
                break;
              case "select":
                d._wrapperState = { wasMultiple: !!w.multiple }, Dn("invalid", d);
                break;
              case "textarea":
                Ot(d, w), Dn("invalid", d);
            }
            Tt(u, w), y = null;
            for (var O in w) if (w.hasOwnProperty(O)) {
              var I = w[O];
              O === "children" ? typeof I == "string" ? d.textContent !== I && (w.suppressHydrationWarning !== !0 && kf(d.textContent, I, r), y = ["children", I]) : typeof I == "number" && d.textContent !== "" + I && (w.suppressHydrationWarning !== !0 && kf(
                d.textContent,
                I,
                r
              ), y = ["children", "" + I]) : p.hasOwnProperty(O) && I != null && O === "onScroll" && Dn("scroll", d);
            }
            switch (u) {
              case "input":
                vt(d), Xe(d, w, !0);
                break;
              case "textarea":
                vt(d), wt(d);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof w.onClick == "function" && (d.onclick = vo);
            }
            d = y, i.updateQueue = d, d !== null && (i.flags |= 4);
          } else {
            O = y.nodeType === 9 ? y : y.ownerDocument, r === "http://www.w3.org/1999/xhtml" && (r = at(u)), r === "http://www.w3.org/1999/xhtml" ? u === "script" ? (r = O.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(r.firstChild)) : typeof d.is == "string" ? r = O.createElement(u, { is: d.is }) : (r = O.createElement(u), u === "select" && (O = r, d.multiple ? O.multiple = !0 : d.size && (O.size = d.size))) : r = O.createElementNS(r, u), r[al] = i, r[oc] = d, yi(r, i, !1, !1), i.stateNode = r;
            e: {
              switch (O = Qe(u, d), u) {
                case "dialog":
                  Dn("cancel", r), Dn("close", r), y = d;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Dn("load", r), y = d;
                  break;
                case "video":
                case "audio":
                  for (y = 0; y < ac.length; y++) Dn(ac[y], r);
                  y = d;
                  break;
                case "source":
                  Dn("error", r), y = d;
                  break;
                case "img":
                case "image":
                case "link":
                  Dn(
                    "error",
                    r
                  ), Dn("load", r), y = d;
                  break;
                case "details":
                  Dn("toggle", r), y = d;
                  break;
                case "input":
                  Ye(r, d), y = Re(r, d), Dn("invalid", r);
                  break;
                case "option":
                  y = d;
                  break;
                case "select":
                  r._wrapperState = { wasMultiple: !!d.multiple }, y = ve({}, d, { value: void 0 }), Dn("invalid", r);
                  break;
                case "textarea":
                  Ot(r, d), y = Ke(r, d), Dn("invalid", r);
                  break;
                default:
                  y = d;
              }
              Tt(u, y), I = y;
              for (w in I) if (I.hasOwnProperty(w)) {
                var K = I[w];
                w === "style" ? qt(r, K) : w === "dangerouslySetInnerHTML" ? (K = K ? K.__html : void 0, K != null && nn(r, K)) : w === "children" ? typeof K == "string" ? (u !== "textarea" || K !== "") && De(r, K) : typeof K == "number" && De(r, "" + K) : w !== "suppressContentEditableWarning" && w !== "suppressHydrationWarning" && w !== "autoFocus" && (p.hasOwnProperty(w) ? K != null && w === "onScroll" && Dn("scroll", r) : K != null && $(r, w, K, O));
              }
              switch (u) {
                case "input":
                  vt(r), Xe(r, d, !1);
                  break;
                case "textarea":
                  vt(r), wt(r);
                  break;
                case "option":
                  d.value != null && r.setAttribute("value", "" + Be(d.value));
                  break;
                case "select":
                  r.multiple = !!d.multiple, w = d.value, w != null ? Se(r, !!d.multiple, w, !1) : d.defaultValue != null && Se(
                    r,
                    !!d.multiple,
                    d.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof y.onClick == "function" && (r.onclick = vo);
              }
              switch (u) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d = !!d.autoFocus;
                  break e;
                case "img":
                  d = !0;
                  break e;
                default:
                  d = !1;
              }
            }
            d && (i.flags |= 4);
          }
          i.ref !== null && (i.flags |= 512, i.flags |= 2097152);
        }
        return jr(i), null;
      case 6:
        if (r && i.stateNode != null) jm(r, i, r.memoizedProps, d);
        else {
          if (typeof d != "string" && i.stateNode === null) throw Error(s(166));
          if (u = os(vc.current), os(ul.current), Ff(i)) {
            if (d = i.stateNode, u = i.memoizedProps, d[al] = i, (w = d.nodeValue !== u) && (r = Aa, r !== null)) switch (r.tag) {
              case 3:
                kf(d.nodeValue, u, (r.mode & 1) !== 0);
                break;
              case 5:
                r.memoizedProps.suppressHydrationWarning !== !0 && kf(d.nodeValue, u, (r.mode & 1) !== 0);
            }
            w && (i.flags |= 4);
          } else d = (u.nodeType === 9 ? u : u.ownerDocument).createTextNode(d), d[al] = i, i.stateNode = d;
        }
        return jr(i), null;
      case 13:
        if (Hn(rr), d = i.memoizedState, r === null || r.memoizedState !== null && r.memoizedState.dehydrated !== null) {
          if (Xn && La !== null && (i.mode & 1) !== 0 && (i.flags & 128) === 0) cc(), xo(), i.flags |= 98560, w = !1;
          else if (w = Ff(i), d !== null && d.dehydrated !== null) {
            if (r === null) {
              if (!w) throw Error(s(318));
              if (w = i.memoizedState, w = w !== null ? w.dehydrated : null, !w) throw Error(s(317));
              w[al] = i;
            } else xo(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            jr(i), w = !1;
          } else pi !== null && (Ss(pi), pi = null), w = !0;
          if (!w) return i.flags & 65536 ? i : null;
        }
        return (i.flags & 128) !== 0 ? (i.lanes = u, i) : (d = d !== null, d !== (r !== null && r.memoizedState !== null) && d && (i.child.flags |= 8192, (i.mode & 1) !== 0 && (r === null || (rr.current & 1) !== 0 ? dr === 0 && (dr = 3) : hv())), i.updateQueue !== null && (i.flags |= 4), jr(i), null);
      case 4:
        return ss(), wr(r, i), r === null && Js(i.stateNode.containerInfo), jr(i), null;
      case 10:
        return Ip(i.type._context), jr(i), null;
      case 17:
        return gr(i.type) && au(), jr(i), null;
      case 19:
        if (Hn(rr), w = i.memoizedState, w === null) return jr(i), null;
        if (d = (i.flags & 128) !== 0, O = w.rendering, O === null) if (d) Dc(w, !1);
        else {
          if (dr !== 0 || r !== null && (r.flags & 128) !== 0) for (r = i.child; r !== null; ) {
            if (O = Vf(r), O !== null) {
              for (i.flags |= 128, Dc(w, !1), d = O.updateQueue, d !== null && (i.updateQueue = d, i.flags |= 4), i.subtreeFlags = 0, d = u, u = i.child; u !== null; ) w = u, r = d, w.flags &= 14680066, O = w.alternate, O === null ? (w.childLanes = 0, w.lanes = r, w.child = null, w.subtreeFlags = 0, w.memoizedProps = null, w.memoizedState = null, w.updateQueue = null, w.dependencies = null, w.stateNode = null) : (w.childLanes = O.childLanes, w.lanes = O.lanes, w.child = O.child, w.subtreeFlags = 0, w.deletions = null, w.memoizedProps = O.memoizedProps, w.memoizedState = O.memoizedState, w.updateQueue = O.updateQueue, w.type = O.type, r = O.dependencies, w.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }), u = u.sibling;
              return _t(rr, rr.current & 1 | 2), i.child;
            }
            r = r.sibling;
          }
          w.tail !== null && Wt() > pu && (i.flags |= 128, d = !0, Dc(w, !1), i.lanes = 4194304);
        }
        else {
          if (!d) if (r = Vf(O), r !== null) {
            if (i.flags |= 128, d = !0, u = r.updateQueue, u !== null && (i.updateQueue = u, i.flags |= 4), Dc(w, !0), w.tail === null && w.tailMode === "hidden" && !O.alternate && !Xn) return jr(i), null;
          } else 2 * Wt() - w.renderingStartTime > pu && u !== 1073741824 && (i.flags |= 128, d = !0, Dc(w, !1), i.lanes = 4194304);
          w.isBackwards ? (O.sibling = i.child, i.child = O) : (u = w.last, u !== null ? u.sibling = O : i.child = O, w.last = O);
        }
        return w.tail !== null ? (i = w.tail, w.rendering = i, w.tail = i.sibling, w.renderingStartTime = Wt(), i.sibling = null, u = rr.current, _t(rr, d ? u & 1 | 2 : u & 1), i) : (jr(i), null);
      case 22:
      case 23:
        return vv(), d = i.memoizedState !== null, r !== null && r.memoizedState !== null !== d && (i.flags |= 8192), d && (i.mode & 1) !== 0 ? (Ka & 1073741824) !== 0 && (jr(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : jr(i), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, i.tag));
  }
  function fd(r, i) {
    switch (jf(i), i.tag) {
      case 1:
        return gr(i.type) && au(), r = i.flags, r & 65536 ? (i.flags = r & -65537 | 128, i) : null;
      case 3:
        return ss(), Hn(Dr), Hn(or), kt(), r = i.flags, (r & 65536) !== 0 && (r & 128) === 0 ? (i.flags = r & -65537 | 128, i) : null;
      case 5:
        return Hf(i), null;
      case 13:
        if (Hn(rr), r = i.memoizedState, r !== null && r.dehydrated !== null) {
          if (i.alternate === null) throw Error(s(340));
          xo();
        }
        return r = i.flags, r & 65536 ? (i.flags = r & -65537 | 128, i) : null;
      case 19:
        return Hn(rr), null;
      case 4:
        return ss(), null;
      case 10:
        return Ip(i.type._context), null;
      case 22:
      case 23:
        return vv(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var kc = !1, na = !1, L1 = typeof WeakSet == "function" ? WeakSet : Set, ht = null;
  function cu(r, i) {
    var u = r.ref;
    if (u !== null) if (typeof u == "function") try {
      u(null);
    } catch (d) {
      Kn(r, i, d);
    }
    else u.current = null;
  }
  function dd(r, i, u) {
    try {
      u();
    } catch (d) {
      Kn(r, i, d);
    }
  }
  var Pm = !1;
  function $m(r, i) {
    if (lc = si, r = nc(), wf(r)) {
      if ("selectionStart" in r) var u = { start: r.selectionStart, end: r.selectionEnd };
      else e: {
        u = (u = r.ownerDocument) && u.defaultView || window;
        var d = u.getSelection && u.getSelection();
        if (d && d.rangeCount !== 0) {
          u = d.anchorNode;
          var y = d.anchorOffset, w = d.focusNode;
          d = d.focusOffset;
          try {
            u.nodeType, w.nodeType;
          } catch {
            u = null;
            break e;
          }
          var O = 0, I = -1, K = -1, ye = 0, Ue = 0, Ie = r, Ne = null;
          t: for (; ; ) {
            for (var ft; Ie !== u || y !== 0 && Ie.nodeType !== 3 || (I = O + y), Ie !== w || d !== 0 && Ie.nodeType !== 3 || (K = O + d), Ie.nodeType === 3 && (O += Ie.nodeValue.length), (ft = Ie.firstChild) !== null; )
              Ne = Ie, Ie = ft;
            for (; ; ) {
              if (Ie === r) break t;
              if (Ne === u && ++ye === y && (I = O), Ne === w && ++Ue === d && (K = O), (ft = Ie.nextSibling) !== null) break;
              Ie = Ne, Ne = Ie.parentNode;
            }
            Ie = ft;
          }
          u = I === -1 || K === -1 ? null : { start: I, end: K };
        } else u = null;
      }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (ts = { focusedElem: r, selectionRange: u }, si = !1, ht = i; ht !== null; ) if (i = ht, r = i.child, (i.subtreeFlags & 1028) !== 0 && r !== null) r.return = i, ht = r;
    else for (; ht !== null; ) {
      i = ht;
      try {
        var St = i.alternate;
        if ((i.flags & 1024) !== 0) switch (i.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (St !== null) {
              var bt = St.memoizedProps, pr = St.memoizedState, se = i.stateNode, ee = se.getSnapshotBeforeUpdate(i.elementType === i.type ? bt : Fi(i.type, bt), pr);
              se.__reactInternalSnapshotBeforeUpdate = ee;
            }
            break;
          case 3:
            var pe = i.stateNode.containerInfo;
            pe.nodeType === 1 ? pe.textContent = "" : pe.nodeType === 9 && pe.documentElement && pe.removeChild(pe.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(s(163));
        }
      } catch (je) {
        Kn(i, i.return, je);
      }
      if (r = i.sibling, r !== null) {
        r.return = i.return, ht = r;
        break;
      }
      ht = i.return;
    }
    return St = Pm, Pm = !1, St;
  }
  function Oc(r, i, u) {
    var d = i.updateQueue;
    if (d = d !== null ? d.lastEffect : null, d !== null) {
      var y = d = d.next;
      do {
        if ((y.tag & r) === r) {
          var w = y.destroy;
          y.destroy = void 0, w !== void 0 && dd(i, u, w);
        }
        y = y.next;
      } while (y !== d);
    }
  }
  function Ac(r, i) {
    if (i = i.updateQueue, i = i !== null ? i.lastEffect : null, i !== null) {
      var u = i = i.next;
      do {
        if ((u.tag & r) === r) {
          var d = u.create;
          u.destroy = d();
        }
        u = u.next;
      } while (u !== i);
    }
  }
  function ov(r) {
    var i = r.ref;
    if (i !== null) {
      var u = r.stateNode;
      r.tag, r = u, typeof i == "function" ? i(r) : i.current = r;
    }
  }
  function pd(r) {
    var i = r.alternate;
    i !== null && (r.alternate = null, pd(i)), r.child = null, r.deletions = null, r.sibling = null, r.tag === 5 && (i = r.stateNode, i !== null && (delete i[al], delete i[oc], delete i[sc], delete i[ru], delete i[O1])), r.stateNode = null, r.return = null, r.dependencies = null, r.memoizedProps = null, r.memoizedState = null, r.pendingProps = null, r.stateNode = null, r.updateQueue = null;
  }
  function Lc(r) {
    return r.tag === 5 || r.tag === 3 || r.tag === 4;
  }
  function Pl(r) {
    e: for (; ; ) {
      for (; r.sibling === null; ) {
        if (r.return === null || Lc(r.return)) return null;
        r = r.return;
      }
      for (r.sibling.return = r.return, r = r.sibling; r.tag !== 5 && r.tag !== 6 && r.tag !== 18; ) {
        if (r.flags & 2 || r.child === null || r.tag === 4) continue e;
        r.child.return = r, r = r.child;
      }
      if (!(r.flags & 2)) return r.stateNode;
    }
  }
  function fl(r, i, u) {
    var d = r.tag;
    if (d === 5 || d === 6) r = r.stateNode, i ? u.nodeType === 8 ? u.parentNode.insertBefore(r, i) : u.insertBefore(r, i) : (u.nodeType === 8 ? (i = u.parentNode, i.insertBefore(r, u)) : (i = u, i.appendChild(r)), u = u._reactRootContainer, u != null || i.onclick !== null || (i.onclick = vo));
    else if (d !== 4 && (r = r.child, r !== null)) for (fl(r, i, u), r = r.sibling; r !== null; ) fl(r, i, u), r = r.sibling;
  }
  function dl(r, i, u) {
    var d = r.tag;
    if (d === 5 || d === 6) r = r.stateNode, i ? u.insertBefore(r, i) : u.appendChild(r);
    else if (d !== 4 && (r = r.child, r !== null)) for (dl(r, i, u), r = r.sibling; r !== null; ) dl(r, i, u), r = r.sibling;
  }
  var fr = null, va = !1;
  function ha(r, i, u) {
    for (u = u.child; u !== null; ) Hm(r, i, u), u = u.sibling;
  }
  function Hm(r, i, u) {
    if (Qn && typeof Qn.onCommitFiberUnmount == "function") try {
      Qn.onCommitFiberUnmount(ii, u);
    } catch {
    }
    switch (u.tag) {
      case 5:
        na || cu(u, i);
      case 6:
        var d = fr, y = va;
        fr = null, ha(r, i, u), fr = d, va = y, fr !== null && (va ? (r = fr, u = u.stateNode, r.nodeType === 8 ? r.parentNode.removeChild(u) : r.removeChild(u)) : fr.removeChild(u.stateNode));
        break;
      case 18:
        fr !== null && (va ? (r = fr, u = u.stateNode, r.nodeType === 8 ? nu(r.parentNode, u) : r.nodeType === 1 && nu(r, u), Li(r)) : nu(fr, u.stateNode));
        break;
      case 4:
        d = fr, y = va, fr = u.stateNode.containerInfo, va = !0, ha(r, i, u), fr = d, va = y;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!na && (d = u.updateQueue, d !== null && (d = d.lastEffect, d !== null))) {
          y = d = d.next;
          do {
            var w = y, O = w.destroy;
            w = w.tag, O !== void 0 && ((w & 2) !== 0 || (w & 4) !== 0) && dd(u, i, O), y = y.next;
          } while (y !== d);
        }
        ha(r, i, u);
        break;
      case 1:
        if (!na && (cu(u, i), d = u.stateNode, typeof d.componentWillUnmount == "function")) try {
          d.props = u.memoizedProps, d.state = u.memoizedState, d.componentWillUnmount();
        } catch (I) {
          Kn(u, i, I);
        }
        ha(r, i, u);
        break;
      case 21:
        ha(r, i, u);
        break;
      case 22:
        u.mode & 1 ? (na = (d = na) || u.memoizedState !== null, ha(r, i, u), na = d) : ha(r, i, u);
        break;
      default:
        ha(r, i, u);
    }
  }
  function Vm(r) {
    var i = r.updateQueue;
    if (i !== null) {
      r.updateQueue = null;
      var u = r.stateNode;
      u === null && (u = r.stateNode = new L1()), i.forEach(function(d) {
        var y = Km.bind(null, r, d);
        u.has(d) || (u.add(d), d.then(y, y));
      });
    }
  }
  function Pi(r, i) {
    var u = i.deletions;
    if (u !== null) for (var d = 0; d < u.length; d++) {
      var y = u[d];
      try {
        var w = r, O = i, I = O;
        e: for (; I !== null; ) {
          switch (I.tag) {
            case 5:
              fr = I.stateNode, va = !1;
              break e;
            case 3:
              fr = I.stateNode.containerInfo, va = !0;
              break e;
            case 4:
              fr = I.stateNode.containerInfo, va = !0;
              break e;
          }
          I = I.return;
        }
        if (fr === null) throw Error(s(160));
        Hm(w, O, y), fr = null, va = !1;
        var K = y.alternate;
        K !== null && (K.return = null), y.return = null;
      } catch (ye) {
        Kn(y, i, ye);
      }
    }
    if (i.subtreeFlags & 12854) for (i = i.child; i !== null; ) sv(i, r), i = i.sibling;
  }
  function sv(r, i) {
    var u = r.alternate, d = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Pi(i, r), ja(r), d & 4) {
          try {
            Oc(3, r, r.return), Ac(3, r);
          } catch (bt) {
            Kn(r, r.return, bt);
          }
          try {
            Oc(5, r, r.return);
          } catch (bt) {
            Kn(r, r.return, bt);
          }
        }
        break;
      case 1:
        Pi(i, r), ja(r), d & 512 && u !== null && cu(u, u.return);
        break;
      case 5:
        if (Pi(i, r), ja(r), d & 512 && u !== null && cu(u, u.return), r.flags & 32) {
          var y = r.stateNode;
          try {
            De(y, "");
          } catch (bt) {
            Kn(r, r.return, bt);
          }
        }
        if (d & 4 && (y = r.stateNode, y != null)) {
          var w = r.memoizedProps, O = u !== null ? u.memoizedProps : w, I = r.type, K = r.updateQueue;
          if (r.updateQueue = null, K !== null) try {
            I === "input" && w.type === "radio" && w.name != null && Pe(y, w), Qe(I, O);
            var ye = Qe(I, w);
            for (O = 0; O < K.length; O += 2) {
              var Ue = K[O], Ie = K[O + 1];
              Ue === "style" ? qt(y, Ie) : Ue === "dangerouslySetInnerHTML" ? nn(y, Ie) : Ue === "children" ? De(y, Ie) : $(y, Ue, Ie, ye);
            }
            switch (I) {
              case "input":
                $e(y, w);
                break;
              case "textarea":
                ot(y, w);
                break;
              case "select":
                var Ne = y._wrapperState.wasMultiple;
                y._wrapperState.wasMultiple = !!w.multiple;
                var ft = w.value;
                ft != null ? Se(y, !!w.multiple, ft, !1) : Ne !== !!w.multiple && (w.defaultValue != null ? Se(
                  y,
                  !!w.multiple,
                  w.defaultValue,
                  !0
                ) : Se(y, !!w.multiple, w.multiple ? [] : "", !1));
            }
            y[oc] = w;
          } catch (bt) {
            Kn(r, r.return, bt);
          }
        }
        break;
      case 6:
        if (Pi(i, r), ja(r), d & 4) {
          if (r.stateNode === null) throw Error(s(162));
          y = r.stateNode, w = r.memoizedProps;
          try {
            y.nodeValue = w;
          } catch (bt) {
            Kn(r, r.return, bt);
          }
        }
        break;
      case 3:
        if (Pi(i, r), ja(r), d & 4 && u !== null && u.memoizedState.isDehydrated) try {
          Li(i.containerInfo);
        } catch (bt) {
          Kn(r, r.return, bt);
        }
        break;
      case 4:
        Pi(i, r), ja(r);
        break;
      case 13:
        Pi(i, r), ja(r), y = r.child, y.flags & 8192 && (w = y.memoizedState !== null, y.stateNode.isHidden = w, !w || y.alternate !== null && y.alternate.memoizedState !== null || (fv = Wt())), d & 4 && Vm(r);
        break;
      case 22:
        if (Ue = u !== null && u.memoizedState !== null, r.mode & 1 ? (na = (ye = na) || Ue, Pi(i, r), na = ye) : Pi(i, r), ja(r), d & 8192) {
          if (ye = r.memoizedState !== null, (r.stateNode.isHidden = ye) && !Ue && (r.mode & 1) !== 0) for (ht = r, Ue = r.child; Ue !== null; ) {
            for (Ie = ht = Ue; ht !== null; ) {
              switch (Ne = ht, ft = Ne.child, Ne.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Oc(4, Ne, Ne.return);
                  break;
                case 1:
                  cu(Ne, Ne.return);
                  var St = Ne.stateNode;
                  if (typeof St.componentWillUnmount == "function") {
                    d = Ne, u = Ne.return;
                    try {
                      i = d, St.props = i.memoizedProps, St.state = i.memoizedState, St.componentWillUnmount();
                    } catch (bt) {
                      Kn(d, u, bt);
                    }
                  }
                  break;
                case 5:
                  cu(Ne, Ne.return);
                  break;
                case 22:
                  if (Ne.memoizedState !== null) {
                    Nc(Ie);
                    continue;
                  }
              }
              ft !== null ? (ft.return = Ne, ht = ft) : Nc(Ie);
            }
            Ue = Ue.sibling;
          }
          e: for (Ue = null, Ie = r; ; ) {
            if (Ie.tag === 5) {
              if (Ue === null) {
                Ue = Ie;
                try {
                  y = Ie.stateNode, ye ? (w = y.style, typeof w.setProperty == "function" ? w.setProperty("display", "none", "important") : w.display = "none") : (I = Ie.stateNode, K = Ie.memoizedProps.style, O = K != null && K.hasOwnProperty("display") ? K.display : null, I.style.display = Ze("display", O));
                } catch (bt) {
                  Kn(r, r.return, bt);
                }
              }
            } else if (Ie.tag === 6) {
              if (Ue === null) try {
                Ie.stateNode.nodeValue = ye ? "" : Ie.memoizedProps;
              } catch (bt) {
                Kn(r, r.return, bt);
              }
            } else if ((Ie.tag !== 22 && Ie.tag !== 23 || Ie.memoizedState === null || Ie === r) && Ie.child !== null) {
              Ie.child.return = Ie, Ie = Ie.child;
              continue;
            }
            if (Ie === r) break e;
            for (; Ie.sibling === null; ) {
              if (Ie.return === null || Ie.return === r) break e;
              Ue === Ie && (Ue = null), Ie = Ie.return;
            }
            Ue === Ie && (Ue = null), Ie.sibling.return = Ie.return, Ie = Ie.sibling;
          }
        }
        break;
      case 19:
        Pi(i, r), ja(r), d & 4 && Vm(r);
        break;
      case 21:
        break;
      default:
        Pi(
          i,
          r
        ), ja(r);
    }
  }
  function ja(r) {
    var i = r.flags;
    if (i & 2) {
      try {
        e: {
          for (var u = r.return; u !== null; ) {
            if (Lc(u)) {
              var d = u;
              break e;
            }
            u = u.return;
          }
          throw Error(s(160));
        }
        switch (d.tag) {
          case 5:
            var y = d.stateNode;
            d.flags & 32 && (De(y, ""), d.flags &= -33);
            var w = Pl(r);
            dl(r, w, y);
            break;
          case 3:
          case 4:
            var O = d.stateNode.containerInfo, I = Pl(r);
            fl(r, I, O);
            break;
          default:
            throw Error(s(161));
        }
      } catch (K) {
        Kn(r, r.return, K);
      }
      r.flags &= -3;
    }
    i & 4096 && (r.flags &= -4097);
  }
  function N1(r, i, u) {
    ht = r, uv(r);
  }
  function uv(r, i, u) {
    for (var d = (r.mode & 1) !== 0; ht !== null; ) {
      var y = ht, w = y.child;
      if (y.tag === 22 && d) {
        var O = y.memoizedState !== null || kc;
        if (!O) {
          var I = y.alternate, K = I !== null && I.memoizedState !== null || na;
          I = kc;
          var ye = na;
          if (kc = O, (na = K) && !ye) for (ht = y; ht !== null; ) O = ht, K = O.child, O.tag === 22 && O.memoizedState !== null ? cv(y) : K !== null ? (K.return = O, ht = K) : cv(y);
          for (; w !== null; ) ht = w, uv(w), w = w.sibling;
          ht = y, kc = I, na = ye;
        }
        Im(r);
      } else (y.subtreeFlags & 8772) !== 0 && w !== null ? (w.return = y, ht = w) : Im(r);
    }
  }
  function Im(r) {
    for (; ht !== null; ) {
      var i = ht;
      if ((i.flags & 8772) !== 0) {
        var u = i.alternate;
        try {
          if ((i.flags & 8772) !== 0) switch (i.tag) {
            case 0:
            case 11:
            case 15:
              na || Ac(5, i);
              break;
            case 1:
              var d = i.stateNode;
              if (i.flags & 4 && !na) if (u === null) d.componentDidMount();
              else {
                var y = i.elementType === i.type ? u.memoizedProps : Fi(i.type, u.memoizedProps);
                d.componentDidUpdate(y, u.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
              }
              var w = i.updateQueue;
              w !== null && Gp(i, w, d);
              break;
            case 3:
              var O = i.updateQueue;
              if (O !== null) {
                if (u = null, i.child !== null) switch (i.child.tag) {
                  case 5:
                    u = i.child.stateNode;
                    break;
                  case 1:
                    u = i.child.stateNode;
                }
                Gp(i, O, u);
              }
              break;
            case 5:
              var I = i.stateNode;
              if (u === null && i.flags & 4) {
                u = I;
                var K = i.memoizedProps;
                switch (i.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    K.autoFocus && u.focus();
                    break;
                  case "img":
                    K.src && (u.src = K.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (i.memoizedState === null) {
                var ye = i.alternate;
                if (ye !== null) {
                  var Ue = ye.memoizedState;
                  if (Ue !== null) {
                    var Ie = Ue.dehydrated;
                    Ie !== null && Li(Ie);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(s(163));
          }
          na || i.flags & 512 && ov(i);
        } catch (Ne) {
          Kn(i, i.return, Ne);
        }
      }
      if (i === r) {
        ht = null;
        break;
      }
      if (u = i.sibling, u !== null) {
        u.return = i.return, ht = u;
        break;
      }
      ht = i.return;
    }
  }
  function Nc(r) {
    for (; ht !== null; ) {
      var i = ht;
      if (i === r) {
        ht = null;
        break;
      }
      var u = i.sibling;
      if (u !== null) {
        u.return = i.return, ht = u;
        break;
      }
      ht = i.return;
    }
  }
  function cv(r) {
    for (; ht !== null; ) {
      var i = ht;
      try {
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            var u = i.return;
            try {
              Ac(4, i);
            } catch (K) {
              Kn(i, u, K);
            }
            break;
          case 1:
            var d = i.stateNode;
            if (typeof d.componentDidMount == "function") {
              var y = i.return;
              try {
                d.componentDidMount();
              } catch (K) {
                Kn(i, y, K);
              }
            }
            var w = i.return;
            try {
              ov(i);
            } catch (K) {
              Kn(i, w, K);
            }
            break;
          case 5:
            var O = i.return;
            try {
              ov(i);
            } catch (K) {
              Kn(i, O, K);
            }
        }
      } catch (K) {
        Kn(i, i.return, K);
      }
      if (i === r) {
        ht = null;
        break;
      }
      var I = i.sibling;
      if (I !== null) {
        I.return = i.return, ht = I;
        break;
      }
      ht = i.return;
    }
  }
  var z1 = Math.ceil, To = F.ReactCurrentDispatcher, ys = F.ReactCurrentOwner, qr = F.ReactCurrentBatchConfig, hn = 0, Or = null, Cr = null, Yr = 0, Ka = 0, fu = fi(0), dr = 0, zc = null, pl = 0, du = 0, vd = 0, Uc = null, Fa = null, fv = 0, pu = 1 / 0, Za = null, vu = !1, gs = null, Ro = null, hd = !1, $l = null, jc = 0, Mo = 0, hu = null, Fc = -1, ra = 0;
  function br() {
    return (hn & 6) !== 0 ? Wt() : Fc !== -1 ? Fc : Fc = Wt();
  }
  function vl(r) {
    return (r.mode & 1) === 0 ? 1 : (hn & 2) !== 0 && Yr !== 0 ? Yr & -Yr : A1.transition !== null ? (ra === 0 && (ra = Hs()), ra) : (r = Cn, r !== 0 || (r = window.event, r = r === void 0 ? 16 : Gs(r.type)), r);
  }
  function ma(r, i, u, d) {
    if (50 < Mo) throw Mo = 0, hu = null, Error(s(185));
    Ml(r, u, d), ((hn & 2) === 0 || r !== Or) && (r === Or && ((hn & 2) === 0 && (du |= u), dr === 4 && $i(r, Yr)), Pa(r, d), u === 1 && hn === 0 && (i.mode & 1) === 0 && (pu = Wt() + 500, iu && ll()));
  }
  function Pa(r, i) {
    var u = r.callbackNode;
    Mr(r, i);
    var d = Jn(r, r === Or ? Yr : 0);
    if (d === 0) u !== null && qn(u), r.callbackNode = null, r.callbackPriority = 0;
    else if (i = d & -d, r.callbackPriority !== i) {
      if (u != null && qn(u), i === 1) r.tag === 0 ? mo(dv.bind(null, r)) : zf(dv.bind(null, r)), tu(function() {
        (hn & 6) === 0 && ll();
      }), u = null;
      else {
        switch (Is(d)) {
          case 1:
            u = ua;
            break;
          case 4:
            u = ki;
            break;
          case 16:
            u = Oi;
            break;
          case 536870912:
            u = Ki;
            break;
          default:
            u = Oi;
        }
        u = Jm(u, md.bind(null, r));
      }
      r.callbackPriority = i, r.callbackNode = u;
    }
  }
  function md(r, i) {
    if (Fc = -1, ra = 0, (hn & 6) !== 0) throw Error(s(327));
    var u = r.callbackNode;
    if (mu() && r.callbackNode !== u) return null;
    var d = Jn(r, r === Or ? Yr : 0);
    if (d === 0) return null;
    if ((d & 30) !== 0 || (d & r.expiredLanes) !== 0 || i) i = yd(r, d);
    else {
      i = d;
      var y = hn;
      hn |= 2;
      var w = Ym();
      (Or !== r || Yr !== i) && (Za = null, pu = Wt() + 500, Hl(r, i));
      do
        try {
          Wm();
          break;
        } catch (I) {
          qm(r, I);
        }
      while (!0);
      Vp(), To.current = w, hn = y, Cr !== null ? i = 0 : (Or = null, Yr = 0, i = dr);
    }
    if (i !== 0) {
      if (i === 2 && (y = lo(r), y !== 0 && (d = y, i = Pc(r, y))), i === 1) throw u = zc, Hl(r, 0), $i(r, d), Pa(r, Wt()), u;
      if (i === 6) $i(r, d);
      else {
        if (y = r.current.alternate, (d & 30) === 0 && !U1(y) && (i = yd(r, d), i === 2 && (w = lo(r), w !== 0 && (d = w, i = Pc(r, w))), i === 1)) throw u = zc, Hl(r, 0), $i(r, d), Pa(r, Wt()), u;
        switch (r.finishedWork = y, r.finishedLanes = d, i) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            Es(r, Fa, Za);
            break;
          case 3:
            if ($i(r, d), (d & 130023424) === d && (i = fv + 500 - Wt(), 10 < i)) {
              if (Jn(r, 0) !== 0) break;
              if (y = r.suspendedLanes, (y & d) !== d) {
                br(), r.pingedLanes |= r.suspendedLanes & y;
                break;
              }
              r.timeoutHandle = Af(Es.bind(null, r, Fa, Za), i);
              break;
            }
            Es(r, Fa, Za);
            break;
          case 4:
            if ($i(r, d), (d & 4194240) === d) break;
            for (i = r.eventTimes, y = -1; 0 < d; ) {
              var O = 31 - $r(d);
              w = 1 << O, O = i[O], O > y && (y = O), d &= ~w;
            }
            if (d = y, d = Wt() - d, d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * z1(d / 1960)) - d, 10 < d) {
              r.timeoutHandle = Af(Es.bind(null, r, Fa, Za), d);
              break;
            }
            Es(r, Fa, Za);
            break;
          case 5:
            Es(r, Fa, Za);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return Pa(r, Wt()), r.callbackNode === u ? md.bind(null, r) : null;
  }
  function Pc(r, i) {
    var u = Uc;
    return r.current.memoizedState.isDehydrated && (Hl(r, i).flags |= 256), r = yd(r, i), r !== 2 && (i = Fa, Fa = u, i !== null && Ss(i)), r;
  }
  function Ss(r) {
    Fa === null ? Fa = r : Fa.push.apply(Fa, r);
  }
  function U1(r) {
    for (var i = r; ; ) {
      if (i.flags & 16384) {
        var u = i.updateQueue;
        if (u !== null && (u = u.stores, u !== null)) for (var d = 0; d < u.length; d++) {
          var y = u[d], w = y.getSnapshot;
          y = y.value;
          try {
            if (!zi(w(), y)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (u = i.child, i.subtreeFlags & 16384 && u !== null) u.return = i, i = u;
      else {
        if (i === r) break;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === r) return !0;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    return !0;
  }
  function $i(r, i) {
    for (i &= ~vd, i &= ~du, r.suspendedLanes |= i, r.pingedLanes &= ~i, r = r.expirationTimes; 0 < i; ) {
      var u = 31 - $r(i), d = 1 << u;
      r[u] = -1, i &= ~d;
    }
  }
  function dv(r) {
    if ((hn & 6) !== 0) throw Error(s(327));
    mu();
    var i = Jn(r, 0);
    if ((i & 1) === 0) return Pa(r, Wt()), null;
    var u = yd(r, i);
    if (r.tag !== 0 && u === 2) {
      var d = lo(r);
      d !== 0 && (i = d, u = Pc(r, d));
    }
    if (u === 1) throw u = zc, Hl(r, 0), $i(r, i), Pa(r, Wt()), u;
    if (u === 6) throw Error(s(345));
    return r.finishedWork = r.current.alternate, r.finishedLanes = i, Es(r, Fa, Za), Pa(r, Wt()), null;
  }
  function pv(r, i) {
    var u = hn;
    hn |= 1;
    try {
      return r(i);
    } finally {
      hn = u, hn === 0 && (pu = Wt() + 500, iu && ll());
    }
  }
  function xs(r) {
    $l !== null && $l.tag === 0 && (hn & 6) === 0 && mu();
    var i = hn;
    hn |= 1;
    var u = qr.transition, d = Cn;
    try {
      if (qr.transition = null, Cn = 1, r) return r();
    } finally {
      Cn = d, qr.transition = u, hn = i, (hn & 6) === 0 && ll();
    }
  }
  function vv() {
    Ka = fu.current, Hn(fu);
  }
  function Hl(r, i) {
    r.finishedWork = null, r.finishedLanes = 0;
    var u = r.timeoutHandle;
    if (u !== -1 && (r.timeoutHandle = -1, jp(u)), Cr !== null) for (u = Cr.return; u !== null; ) {
      var d = u;
      switch (jf(d), d.tag) {
        case 1:
          d = d.type.childContextTypes, d != null && au();
          break;
        case 3:
          ss(), Hn(Dr), Hn(or), kt();
          break;
        case 5:
          Hf(d);
          break;
        case 4:
          ss();
          break;
        case 13:
          Hn(rr);
          break;
        case 19:
          Hn(rr);
          break;
        case 10:
          Ip(d.type._context);
          break;
        case 22:
        case 23:
          vv();
      }
      u = u.return;
    }
    if (Or = r, Cr = r = _o(r.current, null), Yr = Ka = i, dr = 0, zc = null, vd = du = pl = 0, Fa = Uc = null, ls !== null) {
      for (i = 0; i < ls.length; i++) if (u = ls[i], d = u.interleaved, d !== null) {
        u.interleaved = null;
        var y = d.next, w = u.pending;
        if (w !== null) {
          var O = w.next;
          w.next = y, d.next = O;
        }
        u.pending = d;
      }
      ls = null;
    }
    return r;
  }
  function qm(r, i) {
    do {
      var u = Cr;
      try {
        if (Vp(), ln.current = vs, If) {
          for (var d = Tn.memoizedState; d !== null; ) {
            var y = d.queue;
            y !== null && (y.pending = null), d = d.next;
          }
          If = !1;
        }
        if (zn = 0, Ur = xr = Tn = null, mc = !1, us = 0, ys.current = null, u === null || u.return === null) {
          dr = 1, zc = i, Cr = null;
          break;
        }
        e: {
          var w = r, O = u.return, I = u, K = i;
          if (i = Yr, I.flags |= 32768, K !== null && typeof K == "object" && typeof K.then == "function") {
            var ye = K, Ue = I, Ie = Ue.tag;
            if ((Ue.mode & 1) === 0 && (Ie === 0 || Ie === 11 || Ie === 15)) {
              var Ne = Ue.alternate;
              Ne ? (Ue.updateQueue = Ne.updateQueue, Ue.memoizedState = Ne.memoizedState, Ue.lanes = Ne.lanes) : (Ue.updateQueue = null, Ue.memoizedState = null);
            }
            var ft = Om(O);
            if (ft !== null) {
              ft.flags &= -257, bo(ft, O, I, w, i), ft.mode & 1 && nv(w, ye, i), i = ft, K = ye;
              var St = i.updateQueue;
              if (St === null) {
                var bt = /* @__PURE__ */ new Set();
                bt.add(K), i.updateQueue = bt;
              } else St.add(K);
              break e;
            } else {
              if ((i & 1) === 0) {
                nv(w, ye, i), hv();
                break e;
              }
              K = Error(s(426));
            }
          } else if (Xn && I.mode & 1) {
            var pr = Om(O);
            if (pr !== null) {
              (pr.flags & 65536) === 0 && (pr.flags |= 256), bo(pr, O, I, w, i), Ul(hs(K, I));
              break e;
            }
          }
          w = K = hs(K, I), dr !== 4 && (dr = 2), Uc === null ? Uc = [w] : Uc.push(w), w = O;
          do {
            switch (w.tag) {
              case 3:
                w.flags |= 65536, i &= -i, w.lanes |= i;
                var se = km(w, K, i);
                Tm(w, se);
                break e;
              case 1:
                I = K;
                var ee = w.type, pe = w.stateNode;
                if ((w.flags & 128) === 0 && (typeof ee.getDerivedStateFromError == "function" || pe !== null && typeof pe.componentDidCatch == "function" && (Ro === null || !Ro.has(pe)))) {
                  w.flags |= 65536, i &= -i, w.lanes |= i;
                  var je = tv(w, I, i);
                  Tm(w, je);
                  break e;
                }
            }
            w = w.return;
          } while (w !== null);
        }
        Gm(u);
      } catch (xt) {
        i = xt, Cr === u && u !== null && (Cr = u = u.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Ym() {
    var r = To.current;
    return To.current = vs, r === null ? vs : r;
  }
  function hv() {
    (dr === 0 || dr === 3 || dr === 2) && (dr = 4), Or === null || (pl & 268435455) === 0 && (du & 268435455) === 0 || $i(Or, Yr);
  }
  function yd(r, i) {
    var u = hn;
    hn |= 2;
    var d = Ym();
    (Or !== r || Yr !== i) && (Za = null, Hl(r, i));
    do
      try {
        j1();
        break;
      } catch (y) {
        qm(r, y);
      }
    while (!0);
    if (Vp(), hn = u, To.current = d, Cr !== null) throw Error(s(261));
    return Or = null, Yr = 0, dr;
  }
  function j1() {
    for (; Cr !== null; ) Bm(Cr);
  }
  function Wm() {
    for (; Cr !== null && !_a(); ) Bm(Cr);
  }
  function Bm(r) {
    var i = Zm(r.alternate, r, Ka);
    r.memoizedProps = r.pendingProps, i === null ? Gm(r) : Cr = i, ys.current = null;
  }
  function Gm(r) {
    var i = r;
    do {
      var u = i.alternate;
      if (r = i.return, (i.flags & 32768) === 0) {
        if (u = Fm(u, i, Ka), u !== null) {
          Cr = u;
          return;
        }
      } else {
        if (u = fd(u, i), u !== null) {
          u.flags &= 32767, Cr = u;
          return;
        }
        if (r !== null) r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null;
        else {
          dr = 6, Cr = null;
          return;
        }
      }
      if (i = i.sibling, i !== null) {
        Cr = i;
        return;
      }
      Cr = i = r;
    } while (i !== null);
    dr === 0 && (dr = 5);
  }
  function Es(r, i, u) {
    var d = Cn, y = qr.transition;
    try {
      qr.transition = null, Cn = 1, F1(r, i, u, d);
    } finally {
      qr.transition = y, Cn = d;
    }
    return null;
  }
  function F1(r, i, u, d) {
    do
      mu();
    while ($l !== null);
    if ((hn & 6) !== 0) throw Error(s(327));
    u = r.finishedWork;
    var y = r.finishedLanes;
    if (u === null) return null;
    if (r.finishedWork = null, r.finishedLanes = 0, u === r.current) throw Error(s(177));
    r.callbackNode = null, r.callbackPriority = 0;
    var w = u.lanes | u.childLanes;
    if (mp(r, w), r === Or && (Cr = Or = null, Yr = 0), (u.subtreeFlags & 2064) === 0 && (u.flags & 2064) === 0 || hd || (hd = !0, Jm(Oi, function() {
      return mu(), null;
    })), w = (u.flags & 15990) !== 0, (u.subtreeFlags & 15990) !== 0 || w) {
      w = qr.transition, qr.transition = null;
      var O = Cn;
      Cn = 1;
      var I = hn;
      hn |= 4, ys.current = null, $m(r, u), sv(u, r), Ks(ts), si = !!lc, ts = lc = null, r.current = u, N1(u), sa(), hn = I, Cn = O, qr.transition = w;
    } else r.current = u;
    if (hd && (hd = !1, $l = r, jc = y), w = r.pendingLanes, w === 0 && (Ro = null), Wo(u.stateNode), Pa(r, Wt()), i !== null) for (d = r.onRecoverableError, u = 0; u < i.length; u++) y = i[u], d(y.value, { componentStack: y.stack, digest: y.digest });
    if (vu) throw vu = !1, r = gs, gs = null, r;
    return (jc & 1) !== 0 && r.tag !== 0 && mu(), w = r.pendingLanes, (w & 1) !== 0 ? r === hu ? Mo++ : (Mo = 0, hu = r) : Mo = 0, ll(), null;
  }
  function mu() {
    if ($l !== null) {
      var r = Is(jc), i = qr.transition, u = Cn;
      try {
        if (qr.transition = null, Cn = 16 > r ? 16 : r, $l === null) var d = !1;
        else {
          if (r = $l, $l = null, jc = 0, (hn & 6) !== 0) throw Error(s(331));
          var y = hn;
          for (hn |= 4, ht = r.current; ht !== null; ) {
            var w = ht, O = w.child;
            if ((ht.flags & 16) !== 0) {
              var I = w.deletions;
              if (I !== null) {
                for (var K = 0; K < I.length; K++) {
                  var ye = I[K];
                  for (ht = ye; ht !== null; ) {
                    var Ue = ht;
                    switch (Ue.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Oc(8, Ue, w);
                    }
                    var Ie = Ue.child;
                    if (Ie !== null) Ie.return = Ue, ht = Ie;
                    else for (; ht !== null; ) {
                      Ue = ht;
                      var Ne = Ue.sibling, ft = Ue.return;
                      if (pd(Ue), Ue === ye) {
                        ht = null;
                        break;
                      }
                      if (Ne !== null) {
                        Ne.return = ft, ht = Ne;
                        break;
                      }
                      ht = ft;
                    }
                  }
                }
                var St = w.alternate;
                if (St !== null) {
                  var bt = St.child;
                  if (bt !== null) {
                    St.child = null;
                    do {
                      var pr = bt.sibling;
                      bt.sibling = null, bt = pr;
                    } while (bt !== null);
                  }
                }
                ht = w;
              }
            }
            if ((w.subtreeFlags & 2064) !== 0 && O !== null) O.return = w, ht = O;
            else e: for (; ht !== null; ) {
              if (w = ht, (w.flags & 2048) !== 0) switch (w.tag) {
                case 0:
                case 11:
                case 15:
                  Oc(9, w, w.return);
              }
              var se = w.sibling;
              if (se !== null) {
                se.return = w.return, ht = se;
                break e;
              }
              ht = w.return;
            }
          }
          var ee = r.current;
          for (ht = ee; ht !== null; ) {
            O = ht;
            var pe = O.child;
            if ((O.subtreeFlags & 2064) !== 0 && pe !== null) pe.return = O, ht = pe;
            else e: for (O = ee; ht !== null; ) {
              if (I = ht, (I.flags & 2048) !== 0) try {
                switch (I.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ac(9, I);
                }
              } catch (xt) {
                Kn(I, I.return, xt);
              }
              if (I === O) {
                ht = null;
                break e;
              }
              var je = I.sibling;
              if (je !== null) {
                je.return = I.return, ht = je;
                break e;
              }
              ht = I.return;
            }
          }
          if (hn = y, ll(), Qn && typeof Qn.onPostCommitFiberRoot == "function") try {
            Qn.onPostCommitFiberRoot(ii, r);
          } catch {
          }
          d = !0;
        }
        return d;
      } finally {
        Cn = u, qr.transition = i;
      }
    }
    return !1;
  }
  function Qm(r, i, u) {
    i = hs(u, i), i = km(r, i, 1), r = Eo(r, i, 1), i = br(), r !== null && (Ml(r, 1, i), Pa(r, i));
  }
  function Kn(r, i, u) {
    if (r.tag === 3) Qm(r, r, u);
    else for (; i !== null; ) {
      if (i.tag === 3) {
        Qm(i, r, u);
        break;
      } else if (i.tag === 1) {
        var d = i.stateNode;
        if (typeof i.type.getDerivedStateFromError == "function" || typeof d.componentDidCatch == "function" && (Ro === null || !Ro.has(d))) {
          r = hs(u, r), r = tv(i, r, 1), i = Eo(i, r, 1), r = br(), i !== null && (Ml(i, 1, r), Pa(i, r));
          break;
        }
      }
      i = i.return;
    }
  }
  function P1(r, i, u) {
    var d = r.pingCache;
    d !== null && d.delete(i), i = br(), r.pingedLanes |= r.suspendedLanes & u, Or === r && (Yr & u) === u && (dr === 4 || dr === 3 && (Yr & 130023424) === Yr && 500 > Wt() - fv ? Hl(r, 0) : vd |= u), Pa(r, i);
  }
  function Xm(r, i) {
    i === 0 && ((r.mode & 1) === 0 ? i = 1 : (i = an, an <<= 1, (an & 130023424) === 0 && (an = 4194304)));
    var u = br();
    r = Qa(r, i), r !== null && (Ml(r, i, u), Pa(r, u));
  }
  function $1(r) {
    var i = r.memoizedState, u = 0;
    i !== null && (u = i.retryLane), Xm(r, u);
  }
  function Km(r, i) {
    var u = 0;
    switch (r.tag) {
      case 13:
        var d = r.stateNode, y = r.memoizedState;
        y !== null && (u = y.retryLane);
        break;
      case 19:
        d = r.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    d !== null && d.delete(i), Xm(r, u);
  }
  var Zm;
  Zm = function(r, i, u) {
    if (r !== null) if (r.memoizedProps !== i.pendingProps || Dr.current) Er = !0;
    else {
      if ((r.lanes & u) === 0 && (i.flags & 128) === 0) return Er = !1, _c(r, i, u);
      Er = (r.flags & 131072) !== 0;
    }
    else Er = !1, Xn && (i.flags & 1048576) !== 0 && Em(i, zl, i.index);
    switch (i.lanes = 0, i.tag) {
      case 2:
        var d = i.type;
        hi(r, i), r = i.pendingProps;
        var y = Oa(i, or.current);
        nr(i, u), y = wo(null, i, d, r, y, u);
        var w = ji();
        return i.flags |= 1, typeof y == "object" && y !== null && typeof y.render == "function" && y.$$typeof === void 0 ? (i.tag = 1, i.memoizedState = null, i.updateQueue = null, gr(d) ? (w = !0, zr(i)) : w = !1, i.memoizedState = y.state !== null && y.state !== void 0 ? y.state : null, Bp(i), y.updater = ld, i.stateNode = y, y._reactInternals = i, Cc(i, d, r, u), i = Rc(null, i, d, !0, w, u)) : (i.tag = 0, Xn && w && Uf(i), Ir(null, i, y, u), i = i.child), i;
      case 16:
        d = i.elementType;
        e: {
          switch (hi(r, i), r = i.pendingProps, y = d._init, d = y(d._payload), i.type = d, y = i.tag = V1(d), r = Fi(d, r), y) {
            case 0:
              i = Am(null, i, d, r, u);
              break e;
            case 1:
              i = Lm(null, i, d, r, u);
              break e;
            case 11:
              i = Ua(null, i, d, r, u);
              break e;
            case 14:
              i = ms(null, i, d, Fi(d.type, r), u);
              break e;
          }
          throw Error(s(
            306,
            d,
            ""
          ));
        }
        return i;
      case 0:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Fi(d, y), Am(r, i, d, y, u);
      case 1:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Fi(d, y), Lm(r, i, d, y, u);
      case 3:
        e: {
          if (uu(i), r === null) throw Error(s(387));
          d = i.pendingProps, w = i.memoizedState, y = w.element, bm(r, i), fc(i, d, null, u);
          var O = i.memoizedState;
          if (d = O.element, w.isDehydrated) if (w = { element: d, isDehydrated: !1, cache: O.cache, pendingSuspenseBoundaries: O.pendingSuspenseBoundaries, transitions: O.transitions }, i.updateQueue.baseState = w, i.memoizedState = w, i.flags & 256) {
            y = hs(Error(s(423)), i), i = Nm(r, i, d, u, y);
            break e;
          } else if (d !== y) {
            y = hs(Error(s(424)), i), i = Nm(r, i, d, u, y);
            break e;
          } else for (La = rl(i.stateNode.containerInfo.firstChild), Aa = i, Xn = !0, pi = null, u = it(i, null, d, u), i.child = u; u; ) u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (xo(), d === y) {
              i = mi(r, i, u);
              break e;
            }
            Ir(r, i, d, u);
          }
          i = i.child;
        }
        return i;
      case 5:
        return Rm(i), r === null && $p(i), d = i.type, y = i.pendingProps, w = r !== null ? r.memoizedProps : null, O = y.children, Of(d, y) ? O = null : w !== null && Of(d, w) && (i.flags |= 32), rv(r, i), Ir(r, i, O, u), i.child;
      case 6:
        return r === null && $p(i), null;
      case 13:
        return cd(r, i, u);
      case 4:
        return Qp(i, i.stateNode.containerInfo), d = i.pendingProps, r === null ? i.child = ur(i, null, d, u) : Ir(r, i, d, u), i.child;
      case 11:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Fi(d, y), Ua(r, i, d, y, u);
      case 7:
        return Ir(r, i, i.pendingProps, u), i.child;
      case 8:
        return Ir(r, i, i.pendingProps.children, u), i.child;
      case 12:
        return Ir(r, i, i.pendingProps.children, u), i.child;
      case 10:
        e: {
          if (d = i.type._context, y = i.pendingProps, w = i.memoizedProps, O = y.value, _t(Ga, d._currentValue), d._currentValue = O, w !== null) if (zi(w.value, O)) {
            if (w.children === y.children && !Dr.current) {
              i = mi(r, i, u);
              break e;
            }
          } else for (w = i.child, w !== null && (w.return = i); w !== null; ) {
            var I = w.dependencies;
            if (I !== null) {
              O = w.child;
              for (var K = I.firstContext; K !== null; ) {
                if (K.context === d) {
                  if (w.tag === 1) {
                    K = jl(-1, u & -u), K.tag = 2;
                    var ye = w.updateQueue;
                    if (ye !== null) {
                      ye = ye.shared;
                      var Ue = ye.pending;
                      Ue === null ? K.next = K : (K.next = Ue.next, Ue.next = K), ye.pending = K;
                    }
                  }
                  w.lanes |= u, K = w.alternate, K !== null && (K.lanes |= u), qp(
                    w.return,
                    u,
                    i
                  ), I.lanes |= u;
                  break;
                }
                K = K.next;
              }
            } else if (w.tag === 10) O = w.type === i.type ? null : w.child;
            else if (w.tag === 18) {
              if (O = w.return, O === null) throw Error(s(341));
              O.lanes |= u, I = O.alternate, I !== null && (I.lanes |= u), qp(O, u, i), O = w.sibling;
            } else O = w.child;
            if (O !== null) O.return = w;
            else for (O = w; O !== null; ) {
              if (O === i) {
                O = null;
                break;
              }
              if (w = O.sibling, w !== null) {
                w.return = O.return, O = w;
                break;
              }
              O = O.return;
            }
            w = O;
          }
          Ir(r, i, y.children, u), i = i.child;
        }
        return i;
      case 9:
        return y = i.type, d = i.pendingProps.children, nr(i, u), y = vi(y), d = d(y), i.flags |= 1, Ir(r, i, d, u), i.child;
      case 14:
        return d = i.type, y = Fi(d, i.pendingProps), y = Fi(d.type, y), ms(r, i, d, y, u);
      case 15:
        return Jt(r, i, i.type, i.pendingProps, u);
      case 17:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Fi(d, y), hi(r, i), i.tag = 1, gr(d) ? (r = !0, zr(i)) : r = !1, nr(i, u), od(i, d, y), Cc(i, d, y, u), Rc(null, i, d, !0, r, u);
      case 19:
        return cl(r, i, u);
      case 22:
        return Tc(r, i, u);
    }
    throw Error(s(156, i.tag));
  };
  function Jm(r, i) {
    return En(r, i);
  }
  function H1(r, i, u, d) {
    this.tag = r, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = d, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function gi(r, i, u, d) {
    return new H1(r, i, u, d);
  }
  function mv(r) {
    return r = r.prototype, !(!r || !r.isReactComponent);
  }
  function V1(r) {
    if (typeof r == "function") return mv(r) ? 1 : 0;
    if (r != null) {
      if (r = r.$$typeof, r === re) return 11;
      if (r === le) return 14;
    }
    return 2;
  }
  function _o(r, i) {
    var u = r.alternate;
    return u === null ? (u = gi(r.tag, i, r.key, r.mode), u.elementType = r.elementType, u.type = r.type, u.stateNode = r.stateNode, u.alternate = r, r.alternate = u) : (u.pendingProps = i, u.type = r.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = r.flags & 14680064, u.childLanes = r.childLanes, u.lanes = r.lanes, u.child = r.child, u.memoizedProps = r.memoizedProps, u.memoizedState = r.memoizedState, u.updateQueue = r.updateQueue, i = r.dependencies, u.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, u.sibling = r.sibling, u.index = r.index, u.ref = r.ref, u;
  }
  function $c(r, i, u, d, y, w) {
    var O = 2;
    if (d = r, typeof r == "function") mv(r) && (O = 1);
    else if (typeof r == "string") O = 5;
    else e: switch (r) {
      case Y:
        return Vl(u.children, y, w, i);
      case ie:
        O = 8, y |= 8;
        break;
      case Q:
        return r = gi(12, u, i, y | 2), r.elementType = Q, r.lanes = w, r;
      case G:
        return r = gi(13, u, i, y), r.elementType = G, r.lanes = w, r;
      case Z:
        return r = gi(19, u, i, y), r.elementType = Z, r.lanes = w, r;
      case oe:
        return Do(u, y, w, i);
      default:
        if (typeof r == "object" && r !== null) switch (r.$$typeof) {
          case P:
            O = 10;
            break e;
          case ne:
            O = 9;
            break e;
          case re:
            O = 11;
            break e;
          case le:
            O = 14;
            break e;
          case de:
            O = 16, d = null;
            break e;
        }
        throw Error(s(130, r == null ? r : typeof r, ""));
    }
    return i = gi(O, u, i, y), i.elementType = r, i.type = d, i.lanes = w, i;
  }
  function Vl(r, i, u, d) {
    return r = gi(7, r, d, i), r.lanes = u, r;
  }
  function Do(r, i, u, d) {
    return r = gi(22, r, d, i), r.elementType = oe, r.lanes = u, r.stateNode = { isHidden: !1 }, r;
  }
  function yv(r, i, u) {
    return r = gi(6, r, null, i), r.lanes = u, r;
  }
  function gd(r, i, u) {
    return i = gi(4, r.children !== null ? r.children : [], r.key, i), i.lanes = u, i.stateNode = { containerInfo: r.containerInfo, pendingChildren: null, implementation: r.implementation }, i;
  }
  function ey(r, i, u, d, y) {
    this.tag = i, this.containerInfo = r, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Vs(0), this.expirationTimes = Vs(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vs(0), this.identifierPrefix = d, this.onRecoverableError = y, this.mutableSourceEagerHydrationData = null;
  }
  function Sd(r, i, u, d, y, w, O, I, K) {
    return r = new ey(r, i, u, I, K), i === 1 ? (i = 1, w === !0 && (i |= 8)) : i = 0, w = gi(3, null, null, i), r.current = w, w.stateNode = r, w.memoizedState = { element: d, isDehydrated: u, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Bp(w), r;
  }
  function I1(r, i, u) {
    var d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: V, key: d == null ? null : "" + d, children: r, containerInfo: i, implementation: u };
  }
  function gv(r) {
    if (!r) return ea;
    r = r._reactInternals;
    e: {
      if (Yt(r) !== r || r.tag !== 1) throw Error(s(170));
      var i = r;
      do {
        switch (i.tag) {
          case 3:
            i = i.stateNode.context;
            break e;
          case 1:
            if (gr(i.type)) {
              i = i.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        i = i.return;
      } while (i !== null);
      throw Error(s(171));
    }
    if (r.tag === 1) {
      var u = r.type;
      if (gr(u)) return uc(r, u, i);
    }
    return i;
  }
  function ty(r, i, u, d, y, w, O, I, K) {
    return r = Sd(u, d, !0, r, y, w, O, I, K), r.context = gv(null), u = r.current, d = br(), y = vl(u), w = jl(d, y), w.callback = i ?? null, Eo(u, w, y), r.current.lanes = y, Ml(r, y, d), Pa(r, d), r;
  }
  function xd(r, i, u, d) {
    var y = i.current, w = br(), O = vl(y);
    return u = gv(u), i.context === null ? i.context = u : i.pendingContext = u, i = jl(w, O), i.payload = { element: r }, d = d === void 0 ? null : d, d !== null && (i.callback = d), r = Eo(y, i, O), r !== null && (ma(r, y, O, w), $f(r, y, O)), O;
  }
  function Ed(r) {
    return r = r.current, r.child ? (r.child.tag === 5, r.child.stateNode) : null;
  }
  function Sv(r, i) {
    if (r = r.memoizedState, r !== null && r.dehydrated !== null) {
      var u = r.retryLane;
      r.retryLane = u !== 0 && u < i ? u : i;
    }
  }
  function wd(r, i) {
    Sv(r, i), (r = r.alternate) && Sv(r, i);
  }
  function ny() {
    return null;
  }
  var ws = typeof reportError == "function" ? reportError : function(r) {
    console.error(r);
  };
  function xv(r) {
    this._internalRoot = r;
  }
  Cd.prototype.render = xv.prototype.render = function(r) {
    var i = this._internalRoot;
    if (i === null) throw Error(s(409));
    xd(r, i, null, null);
  }, Cd.prototype.unmount = xv.prototype.unmount = function() {
    var r = this._internalRoot;
    if (r !== null) {
      this._internalRoot = null;
      var i = r.containerInfo;
      xs(function() {
        xd(null, r, null, null);
      }), i[Ll] = null;
    }
  };
  function Cd(r) {
    this._internalRoot = r;
  }
  Cd.prototype.unstable_scheduleHydration = function(r) {
    if (r) {
      var i = Gt();
      r = { blockedOn: null, target: r, priority: i };
      for (var u = 0; u < _r.length && i !== 0 && i < _r[u].priority; u++) ;
      _r.splice(u, 0, r), u === 0 && Qu(r);
    }
  };
  function Ev(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11);
  }
  function bd(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11 && (r.nodeType !== 8 || r.nodeValue !== " react-mount-point-unstable "));
  }
  function ry() {
  }
  function q1(r, i, u, d, y) {
    if (y) {
      if (typeof d == "function") {
        var w = d;
        d = function() {
          var ye = Ed(O);
          w.call(ye);
        };
      }
      var O = ty(i, d, r, 0, null, !1, !1, "", ry);
      return r._reactRootContainer = O, r[Ll] = O.current, Js(r.nodeType === 8 ? r.parentNode : r), xs(), O;
    }
    for (; y = r.lastChild; ) r.removeChild(y);
    if (typeof d == "function") {
      var I = d;
      d = function() {
        var ye = Ed(K);
        I.call(ye);
      };
    }
    var K = Sd(r, 0, !1, null, null, !1, !1, "", ry);
    return r._reactRootContainer = K, r[Ll] = K.current, Js(r.nodeType === 8 ? r.parentNode : r), xs(function() {
      xd(i, K, u, d);
    }), K;
  }
  function Hc(r, i, u, d, y) {
    var w = u._reactRootContainer;
    if (w) {
      var O = w;
      if (typeof y == "function") {
        var I = y;
        y = function() {
          var K = Ed(O);
          I.call(K);
        };
      }
      xd(i, O, r, y);
    } else O = q1(u, i, r, y, d);
    return Ed(O);
  }
  Sn = function(r) {
    switch (r.tag) {
      case 3:
        var i = r.stateNode;
        if (i.current.memoizedState.isDehydrated) {
          var u = un(i.pendingLanes);
          u !== 0 && (_l(i, u | 1), Pa(i, Wt()), (hn & 6) === 0 && (pu = Wt() + 500, ll()));
        }
        break;
      case 13:
        xs(function() {
          var d = Qa(r, 1);
          if (d !== null) {
            var y = br();
            ma(d, r, 1, y);
          }
        }), wd(r, 1);
    }
  }, Bu = function(r) {
    if (r.tag === 13) {
      var i = Qa(r, 134217728);
      if (i !== null) {
        var u = br();
        ma(i, r, 134217728, u);
      }
      wd(r, 134217728);
    }
  }, Zi = function(r) {
    if (r.tag === 13) {
      var i = vl(r), u = Qa(r, i);
      if (u !== null) {
        var d = br();
        ma(u, r, i, d);
      }
      wd(r, i);
    }
  }, Gt = function() {
    return Cn;
  }, qs = function(r, i) {
    var u = Cn;
    try {
      return Cn = r, i();
    } finally {
      Cn = u;
    }
  }, At = function(r, i, u) {
    switch (i) {
      case "input":
        if ($e(r, u), i = u.name, u.type === "radio" && i != null) {
          for (u = r; u.parentNode; ) u = u.parentNode;
          for (u = u.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'), i = 0; i < u.length; i++) {
            var d = u[i];
            if (d !== r && d.form === r.form) {
              var y = tr(d);
              if (!y) throw Error(s(90));
              Le(d), $e(d, y);
            }
          }
        }
        break;
      case "textarea":
        ot(r, u);
        break;
      case "select":
        i = u.value, i != null && Se(r, !!u.multiple, i, !1);
    }
  }, mr = pv, lr = xs;
  var Y1 = { usingClientEntryPoint: !1, Events: [Dt, Ui, tr, On, Fn, pv] }, Vc = { findFiberByHostInstance: ns, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ay = { bundleType: Vc.bundleType, version: Vc.version, rendererPackageName: Vc.rendererPackageName, rendererConfig: Vc.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: F.ReactCurrentDispatcher, findHostInstanceByFiber: function(r) {
    return r = Gn(r), r === null ? null : r.stateNode;
  }, findFiberByHostInstance: Vc.findFiberByHostInstance || ny, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ko = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ko.isDisabled && ko.supportsFiber) try {
      ii = ko.inject(ay), Qn = ko;
    } catch {
    }
  }
  return bi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y1, bi.createPortal = function(r, i) {
    var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Ev(i)) throw Error(s(200));
    return I1(r, i, null, u);
  }, bi.createRoot = function(r, i) {
    if (!Ev(r)) throw Error(s(299));
    var u = !1, d = "", y = ws;
    return i != null && (i.unstable_strictMode === !0 && (u = !0), i.identifierPrefix !== void 0 && (d = i.identifierPrefix), i.onRecoverableError !== void 0 && (y = i.onRecoverableError)), i = Sd(r, 1, !1, null, null, u, !1, d, y), r[Ll] = i.current, Js(r.nodeType === 8 ? r.parentNode : r), new xv(i);
  }, bi.findDOMNode = function(r) {
    if (r == null) return null;
    if (r.nodeType === 1) return r;
    var i = r._reactInternals;
    if (i === void 0)
      throw typeof r.render == "function" ? Error(s(188)) : (r = Object.keys(r).join(","), Error(s(268, r)));
    return r = Gn(i), r = r === null ? null : r.stateNode, r;
  }, bi.flushSync = function(r) {
    return xs(r);
  }, bi.hydrate = function(r, i, u) {
    if (!bd(i)) throw Error(s(200));
    return Hc(null, r, i, !0, u);
  }, bi.hydrateRoot = function(r, i, u) {
    if (!Ev(r)) throw Error(s(405));
    var d = u != null && u.hydratedSources || null, y = !1, w = "", O = ws;
    if (u != null && (u.unstable_strictMode === !0 && (y = !0), u.identifierPrefix !== void 0 && (w = u.identifierPrefix), u.onRecoverableError !== void 0 && (O = u.onRecoverableError)), i = ty(i, null, r, 1, u ?? null, y, !1, w, O), r[Ll] = i.current, Js(r), d) for (r = 0; r < d.length; r++) u = d[r], y = u._getVersion, y = y(u._source), i.mutableSourceEagerHydrationData == null ? i.mutableSourceEagerHydrationData = [u, y] : i.mutableSourceEagerHydrationData.push(
      u,
      y
    );
    return new Cd(i);
  }, bi.render = function(r, i, u) {
    if (!bd(i)) throw Error(s(200));
    return Hc(null, r, i, !1, u);
  }, bi.unmountComponentAtNode = function(r) {
    if (!bd(r)) throw Error(s(40));
    return r._reactRootContainer ? (xs(function() {
      Hc(null, null, r, !1, function() {
        r._reactRootContainer = null, r[Ll] = null;
      });
    }), !0) : !1;
  }, bi.unstable_batchedUpdates = pv, bi.unstable_renderSubtreeIntoContainer = function(r, i, u, d) {
    if (!bd(u)) throw Error(s(200));
    if (r == null || r._reactInternals === void 0) throw Error(s(38));
    return Hc(r, i, u, !1, d);
  }, bi.version = "18.3.1-next-f1338f8080-20240426", bi;
}
var Ti = {};
var $C;
function Cz() {
  return $C || ($C = 1, process.env.NODE_ENV !== "production" && (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var t = qh(), a = mT(), s = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, f = !1;
    function p(e) {
      f = e;
    }
    function m(e) {
      if (!f) {
        for (var n = arguments.length, l = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
          l[o - 1] = arguments[o];
        g("warn", e, l);
      }
    }
    function v(e) {
      if (!f) {
        for (var n = arguments.length, l = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
          l[o - 1] = arguments[o];
        g("error", e, l);
      }
    }
    function g(e, n, l) {
      {
        var o = s.ReactDebugCurrentFrame, c = o.getStackAddendum();
        c !== "" && (n += "%s", l = l.concat([c]));
        var h = l.map(function(x) {
          return String(x);
        });
        h.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, h);
      }
    }
    var S = 0, E = 1, C = 2, b = 3, R = 4, D = 5, _ = 6, A = 7, L = 8, U = 9, q = 10, $ = 11, F = 12, H = 13, V = 14, Y = 15, ie = 16, Q = 17, P = 18, ne = 19, re = 21, G = 22, Z = 23, le = 24, de = 25, oe = !0, ae = !1, fe = !1, ve = !1, j = !1, X = !0, xe = !0, be = !0, ze = !0, _e = /* @__PURE__ */ new Set(), Ve = {}, Be = {};
    function Fe(e, n) {
      ct(e, n), ct(e + "Capture", n);
    }
    function ct(e, n) {
      Ve[e] && v("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Ve[e] = n;
      {
        var l = e.toLowerCase();
        Be[l] = e, e === "onDoubleClick" && (Be.ondblclick = e);
      }
      for (var o = 0; o < n.length; o++)
        _e.add(n[o]);
    }
    var vt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Le = Object.prototype.hasOwnProperty;
    function Je(e) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, l = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return l;
      }
    }
    function Re(e) {
      try {
        return Ye(e), !1;
      } catch {
        return !0;
      }
    }
    function Ye(e) {
      return "" + e;
    }
    function Pe(e, n) {
      if (Re(e))
        return v("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", n, Je(e)), Ye(e);
    }
    function $e(e) {
      if (Re(e))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), Ye(e);
    }
    function Xe(e, n) {
      if (Re(e))
        return v("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", n, Je(e)), Ye(e);
    }
    function Ct(e, n) {
      if (Re(e))
        return v("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", n, Je(e)), Ye(e);
    }
    function Te(e) {
      if (Re(e))
        return v("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), Ye(e);
    }
    function Se(e) {
      if (Re(e))
        return v("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Je(e)), Ye(e);
    }
    var Ke = 0, Ot = 1, ot = 2, wt = 3, at = 4, mt = 5, It = 6, nn = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", De = nn + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", He = new RegExp("^[" + nn + "][" + De + "]*$"), rt = {}, Ze = {};
    function qt(e) {
      return Le.call(Ze, e) ? !0 : Le.call(rt, e) ? !1 : He.test(e) ? (Ze[e] = !0, !0) : (rt[e] = !0, v("Invalid attribute name: `%s`", e), !1);
    }
    function en(e, n, l) {
      return n !== null ? n.type === Ke : l ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function Tt(e, n, l, o) {
      if (l !== null && l.type === Ke)
        return !1;
      switch (typeof n) {
        case "function":
        // $FlowIssue symbol is perfectly valid here
        case "symbol":
          return !0;
        case "boolean": {
          if (o)
            return !1;
          if (l !== null)
            return !l.acceptsBooleans;
          var c = e.toLowerCase().slice(0, 5);
          return c !== "data-" && c !== "aria-";
        }
        default:
          return !1;
      }
    }
    function Qe(e, n, l, o) {
      if (n === null || typeof n > "u" || Tt(e, n, l, o))
        return !0;
      if (o)
        return !1;
      if (l !== null)
        switch (l.type) {
          case wt:
            return !n;
          case at:
            return n === !1;
          case mt:
            return isNaN(n);
          case It:
            return isNaN(n) || n < 1;
        }
      return !1;
    }
    function gt(e) {
      return At.hasOwnProperty(e) ? At[e] : null;
    }
    function yt(e, n, l, o, c, h, x) {
      this.acceptsBooleans = n === ot || n === wt || n === at, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = e, this.type = n, this.sanitizeURL = h, this.removeEmptyString = x;
    }
    var At = {}, $t = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    $t.forEach(function(e) {
      At[e] = new yt(
        e,
        Ke,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var n = e[0], l = e[1];
      At[n] = new yt(
        n,
        Ot,
        !1,
        // mustUseProperty
        l,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      At[e] = new yt(
        e,
        ot,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      At[e] = new yt(
        e,
        ot,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      At[e] = new yt(
        e,
        wt,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      At[e] = new yt(
        e,
        wt,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      At[e] = new yt(
        e,
        at,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      At[e] = new yt(
        e,
        It,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      At[e] = new yt(
        e,
        mt,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Ge = /[\-\:]([a-z])/g, fn = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var n = e.replace(Ge, fn);
      At[n] = new yt(
        n,
        Ot,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var n = e.replace(Ge, fn);
      At[n] = new yt(
        n,
        Ot,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var n = e.replace(Ge, fn);
      At[n] = new yt(
        n,
        Ot,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      At[e] = new yt(
        e,
        Ot,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var On = "xlinkHref";
    At[On] = new yt(
      "xlinkHref",
      Ot,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      At[e] = new yt(
        e,
        Ot,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var Fn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, mr = !1;
    function lr(e) {
      !mr && Fn.test(e) && (mr = !0, v("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function Zn(e, n, l, o) {
      if (o.mustUseProperty) {
        var c = o.propertyName;
        return e[c];
      } else {
        Pe(l, n), o.sanitizeURL && lr("" + l);
        var h = o.attributeName, x = null;
        if (o.type === at) {
          if (e.hasAttribute(h)) {
            var T = e.getAttribute(h);
            return T === "" ? !0 : Qe(n, l, o, !1) ? T : T === "" + l ? l : T;
          }
        } else if (e.hasAttribute(h)) {
          if (Qe(n, l, o, !1))
            return e.getAttribute(h);
          if (o.type === wt)
            return l;
          x = e.getAttribute(h);
        }
        return Qe(n, l, o, !1) ? x === null ? l : x : x === "" + l ? l : x;
      }
    }
    function Di(e, n, l, o) {
      {
        if (!qt(n))
          return;
        if (!e.hasAttribute(n))
          return l === void 0 ? void 0 : null;
        var c = e.getAttribute(n);
        return Pe(l, n), c === "" + l ? l : c;
      }
    }
    function Rr(e, n, l, o) {
      var c = gt(n);
      if (!en(n, c, o)) {
        if (Qe(n, l, c, o) && (l = null), o || c === null) {
          if (qt(n)) {
            var h = n;
            l === null ? e.removeAttribute(h) : (Pe(l, n), e.setAttribute(h, "" + l));
          }
          return;
        }
        var x = c.mustUseProperty;
        if (x) {
          var T = c.propertyName;
          if (l === null) {
            var M = c.type;
            e[T] = M === wt ? !1 : "";
          } else
            e[T] = l;
          return;
        }
        var N = c.attributeName, z = c.attributeNamespace;
        if (l === null)
          e.removeAttribute(N);
        else {
          var te = c.type, J;
          te === wt || te === at && l === !0 ? J = "" : (Pe(l, N), J = "" + l, c.sanitizeURL && lr(J.toString())), z ? e.setAttributeNS(z, N, J) : e.setAttribute(N, J);
        }
      }
    }
    var Lr = /* @__PURE__ */ Symbol.for("react.element"), In = /* @__PURE__ */ Symbol.for("react.portal"), Ma = /* @__PURE__ */ Symbol.for("react.fragment"), oa = /* @__PURE__ */ Symbol.for("react.strict_mode"), Wa = /* @__PURE__ */ Symbol.for("react.profiler"), Nr = /* @__PURE__ */ Symbol.for("react.provider"), B = /* @__PURE__ */ Symbol.for("react.context"), ke = /* @__PURE__ */ Symbol.for("react.forward_ref"), et = /* @__PURE__ */ Symbol.for("react.suspense"), ut = /* @__PURE__ */ Symbol.for("react.suspense_list"), Yt = /* @__PURE__ */ Symbol.for("react.memo"), Ht = /* @__PURE__ */ Symbol.for("react.lazy"), tn = /* @__PURE__ */ Symbol.for("react.scope"), Zt = /* @__PURE__ */ Symbol.for("react.debug_trace_mode"), Gn = /* @__PURE__ */ Symbol.for("react.offscreen"), gn = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), En = /* @__PURE__ */ Symbol.for("react.cache"), qn = /* @__PURE__ */ Symbol.for("react.tracing_marker"), _a = Symbol.iterator, sa = "@@iterator";
    function Wt(e) {
      if (e === null || typeof e != "object")
        return null;
      var n = _a && e[_a] || e[sa];
      return typeof n == "function" ? n : null;
    }
    var Qt = Object.assign, ua = 0, ki, Oi, Ai, Ki, ii, Qn, Wo;
    function $r() {
    }
    $r.__reactDisabledLog = !0;
    function $s() {
      {
        if (ua === 0) {
          ki = console.log, Oi = console.info, Ai = console.warn, Ki = console.error, ii = console.group, Qn = console.groupCollapsed, Wo = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: $r,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        ua++;
      }
    }
    function io() {
      {
        if (ua--, ua === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Qt({}, e, {
              value: ki
            }),
            info: Qt({}, e, {
              value: Oi
            }),
            warn: Qt({}, e, {
              value: Ai
            }),
            error: Qt({}, e, {
              value: Ki
            }),
            group: Qt({}, e, {
              value: ii
            }),
            groupCollapsed: Qt({}, e, {
              value: Qn
            }),
            groupEnd: Qt({}, e, {
              value: Wo
            })
          });
        }
        ua < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var on = s.ReactCurrentDispatcher, zt;
    function an(e, n, l) {
      {
        if (zt === void 0)
          try {
            throw Error();
          } catch (c) {
            var o = c.stack.trim().match(/\n( *(at )?)/);
            zt = o && o[1] || "";
          }
        return `
` + zt + e;
      }
    }
    var un = !1, Jn;
    {
      var ca = typeof WeakMap == "function" ? WeakMap : Map;
      Jn = new ca();
    }
    function Mr(e, n) {
      if (!e || un)
        return "";
      {
        var l = Jn.get(e);
        if (l !== void 0)
          return l;
      }
      var o;
      un = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var h;
      h = on.current, on.current = null, $s();
      try {
        if (n) {
          var x = function() {
            throw Error();
          };
          if (Object.defineProperty(x.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(x, []);
            } catch (ge) {
              o = ge;
            }
            Reflect.construct(e, [], x);
          } else {
            try {
              x.call();
            } catch (ge) {
              o = ge;
            }
            e.call(x.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ge) {
            o = ge;
          }
          e();
        }
      } catch (ge) {
        if (ge && o && typeof ge.stack == "string") {
          for (var T = ge.stack.split(`
`), M = o.stack.split(`
`), N = T.length - 1, z = M.length - 1; N >= 1 && z >= 0 && T[N] !== M[z]; )
            z--;
          for (; N >= 1 && z >= 0; N--, z--)
            if (T[N] !== M[z]) {
              if (N !== 1 || z !== 1)
                do
                  if (N--, z--, z < 0 || T[N] !== M[z]) {
                    var te = `
` + T[N].replace(" at new ", " at ");
                    return e.displayName && te.includes("<anonymous>") && (te = te.replace("<anonymous>", e.displayName)), typeof e == "function" && Jn.set(e, te), te;
                  }
                while (N >= 1 && z >= 0);
              break;
            }
        }
      } finally {
        un = !1, on.current = h, io(), Error.prepareStackTrace = c;
      }
      var J = e ? e.displayName || e.name : "", he = J ? an(J) : "";
      return typeof e == "function" && Jn.set(e, he), he;
    }
    function lo(e, n, l) {
      return Mr(e, !0);
    }
    function Hs(e, n, l) {
      return Mr(e, !1);
    }
    function Vs(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function Ml(e, n, l) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Mr(e, Vs(e));
      if (typeof e == "string")
        return an(e);
      switch (e) {
        case et:
          return an("Suspense");
        case ut:
          return an("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case ke:
            return Hs(e.render);
          case Yt:
            return Ml(e.type, n, l);
          case Ht: {
            var o = e, c = o._payload, h = o._init;
            try {
              return Ml(h(c), n, l);
            } catch {
            }
          }
        }
      return "";
    }
    function mp(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case D:
          return an(e.type);
        case ie:
          return an("Lazy");
        case H:
          return an("Suspense");
        case ne:
          return an("SuspenseList");
        case S:
        case C:
        case Y:
          return Hs(e.type);
        case $:
          return Hs(e.type.render);
        case E:
          return lo(e.type);
        default:
          return "";
      }
    }
    function _l(e) {
      try {
        var n = "", l = e;
        do
          n += mp(l), l = l.return;
        while (l);
        return n;
      } catch (o) {
        return `
Error generating stack: ` + o.message + `
` + o.stack;
      }
    }
    function Cn(e, n, l) {
      var o = e.displayName;
      if (o)
        return o;
      var c = n.displayName || n.name || "";
      return c !== "" ? l + "(" + c + ")" : l;
    }
    function Is(e) {
      return e.displayName || "Context";
    }
    function Sn(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case Ma:
          return "Fragment";
        case In:
          return "Portal";
        case Wa:
          return "Profiler";
        case oa:
          return "StrictMode";
        case et:
          return "Suspense";
        case ut:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case B:
            var n = e;
            return Is(n) + ".Consumer";
          case Nr:
            var l = e;
            return Is(l._context) + ".Provider";
          case ke:
            return Cn(e, e.render, "ForwardRef");
          case Yt:
            var o = e.displayName || null;
            return o !== null ? o : Sn(e.type) || "Memo";
          case Ht: {
            var c = e, h = c._payload, x = c._init;
            try {
              return Sn(x(h));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Bu(e, n, l) {
      var o = n.displayName || n.name || "";
      return e.displayName || (o !== "" ? l + "(" + o + ")" : l);
    }
    function Zi(e) {
      return e.displayName || "Context";
    }
    function Gt(e) {
      var n = e.tag, l = e.type;
      switch (n) {
        case le:
          return "Cache";
        case U:
          var o = l;
          return Zi(o) + ".Consumer";
        case q:
          var c = l;
          return Zi(c._context) + ".Provider";
        case P:
          return "DehydratedFragment";
        case $:
          return Bu(l, l.render, "ForwardRef");
        case A:
          return "Fragment";
        case D:
          return l;
        case R:
          return "Portal";
        case b:
          return "Root";
        case _:
          return "Text";
        case ie:
          return Sn(l);
        case L:
          return l === oa ? "StrictMode" : "Mode";
        case G:
          return "Offscreen";
        case F:
          return "Profiler";
        case re:
          return "Scope";
        case H:
          return "Suspense";
        case ne:
          return "SuspenseList";
        case de:
          return "TracingMarker";
        // The display name for this tags come from the user-provided type:
        case E:
        case S:
        case Q:
        case C:
        case V:
        case Y:
          if (typeof l == "function")
            return l.displayName || l.name || null;
          if (typeof l == "string")
            return l;
          break;
      }
      return null;
    }
    var qs = s.ReactDebugCurrentFrame, Hr = null, Ji = !1;
    function fa() {
      {
        if (Hr === null)
          return null;
        var e = Hr._debugOwner;
        if (e !== null && typeof e < "u")
          return Gt(e);
      }
      return null;
    }
    function el() {
      return Hr === null ? "" : _l(Hr);
    }
    function Yn() {
      qs.getCurrentStack = null, Hr = null, Ji = !1;
    }
    function An(e) {
      qs.getCurrentStack = e === null ? null : el, Hr = e, Ji = !1;
    }
    function oo() {
      return Hr;
    }
    function _r(e) {
      Ji = e;
    }
    function da(e) {
      return "" + e;
    }
    function li(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Se(e), e;
        default:
          return "";
      }
    }
    var Bo = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Gu(e, n) {
      Bo[n.type] || n.onChange || n.onInput || n.readOnly || n.disabled || n.value == null || v("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), n.onChange || n.readOnly || n.disabled || n.checked == null || v("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Qu(e) {
      var n = e.type, l = e.nodeName;
      return l && l.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
    }
    function so(e) {
      return e._valueTracker;
    }
    function Go(e) {
      e._valueTracker = null;
    }
    function yp(e) {
      var n = "";
      return e && (Qu(e) ? n = e.checked ? "true" : "false" : n = e.value), n;
    }
    function oi(e) {
      var n = Qu(e) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(e.constructor.prototype, n);
      Se(e[n]);
      var o = "" + e[n];
      if (!(e.hasOwnProperty(n) || typeof l > "u" || typeof l.get != "function" || typeof l.set != "function")) {
        var c = l.get, h = l.set;
        Object.defineProperty(e, n, {
          configurable: !0,
          get: function() {
            return c.call(this);
          },
          set: function(T) {
            Se(T), o = "" + T, h.call(this, T);
          }
        }), Object.defineProperty(e, n, {
          enumerable: l.enumerable
        });
        var x = {
          getValue: function() {
            return o;
          },
          setValue: function(T) {
            Se(T), o = "" + T;
          },
          stopTracking: function() {
            Go(e), delete e[n];
          }
        };
        return x;
      }
    }
    function Li(e) {
      so(e) || (e._valueTracker = oi(e));
    }
    function tl(e) {
      if (!e)
        return !1;
      var n = so(e);
      if (!n)
        return !0;
      var l = n.getValue(), o = yp(e);
      return o !== l ? (n.setValue(o), !0) : !1;
    }
    function si(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Ys = !1, Ws = !1, uo = !1, Qo = !1;
    function Bs(e) {
      var n = e.type === "checkbox" || e.type === "radio";
      return n ? e.checked != null : e.value != null;
    }
    function Gs(e, n) {
      var l = e, o = n.checked, c = Qt({}, n, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: o ?? l._wrapperState.initialChecked
      });
      return c;
    }
    function Ni(e, n) {
      Gu("input", n), n.checked !== void 0 && n.defaultChecked !== void 0 && !Ws && (v("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", fa() || "A component", n.type), Ws = !0), n.value !== void 0 && n.defaultValue !== void 0 && !Ys && (v("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", fa() || "A component", n.type), Ys = !0);
      var l = e, o = n.defaultValue == null ? "" : n.defaultValue;
      l._wrapperState = {
        initialChecked: n.checked != null ? n.checked : n.defaultChecked,
        initialValue: li(n.value != null ? n.value : o),
        controlled: Bs(n)
      };
    }
    function k(e, n) {
      var l = e, o = n.checked;
      o != null && Rr(l, "checked", o, !1);
    }
    function W(e, n) {
      var l = e;
      {
        var o = Bs(n);
        !l._wrapperState.controlled && o && !Qo && (v("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Qo = !0), l._wrapperState.controlled && !o && !uo && (v("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), uo = !0);
      }
      k(e, n);
      var c = li(n.value), h = n.type;
      if (c != null)
        h === "number" ? (c === 0 && l.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        l.value != c) && (l.value = da(c)) : l.value !== da(c) && (l.value = da(c));
      else if (h === "submit" || h === "reset") {
        l.removeAttribute("value");
        return;
      }
      n.hasOwnProperty("value") ? Lt(l, n.type, c) : n.hasOwnProperty("defaultValue") && Lt(l, n.type, li(n.defaultValue)), n.checked == null && n.defaultChecked != null && (l.defaultChecked = !!n.defaultChecked);
    }
    function me(e, n, l) {
      var o = e;
      if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
        var c = n.type, h = c === "submit" || c === "reset";
        if (h && (n.value === void 0 || n.value === null))
          return;
        var x = da(o._wrapperState.initialValue);
        l || x !== o.value && (o.value = x), o.defaultValue = x;
      }
      var T = o.name;
      T !== "" && (o.name = ""), o.defaultChecked = !o.defaultChecked, o.defaultChecked = !!o._wrapperState.initialChecked, T !== "" && (o.name = T);
    }
    function Ee(e, n) {
      var l = e;
      W(l, n), We(l, n);
    }
    function We(e, n) {
      var l = n.name;
      if (n.type === "radio" && l != null) {
        for (var o = e; o.parentNode; )
          o = o.parentNode;
        Pe(l, "name");
        for (var c = o.querySelectorAll("input[name=" + JSON.stringify("" + l) + '][type="radio"]'), h = 0; h < c.length; h++) {
          var x = c[h];
          if (!(x === e || x.form !== e.form)) {
            var T = wy(x);
            if (!T)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            tl(x), W(x, T);
          }
        }
      }
    }
    function Lt(e, n, l) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (n !== "number" || si(e.ownerDocument) !== e) && (l == null ? e.defaultValue = da(e._wrapperState.initialValue) : e.defaultValue !== da(l) && (e.defaultValue = da(l)));
    }
    var nt = !1, jt = !1, sn = !1;
    function xn(e, n) {
      n.value == null && (typeof n.children == "object" && n.children !== null ? t.Children.forEach(n.children, function(l) {
        l != null && (typeof l == "string" || typeof l == "number" || jt || (jt = !0, v("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : n.dangerouslySetInnerHTML != null && (sn || (sn = !0, v("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), n.selected != null && !nt && (v("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), nt = !0);
    }
    function $n(e, n) {
      n.value != null && e.setAttribute("value", da(li(n.value)));
    }
    var Ln = Array.isArray;
    function rn(e) {
      return Ln(e);
    }
    var Nn;
    Nn = !1;
    function er() {
      var e = fa();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var co = ["value", "defaultValue"];
    function Xu(e) {
      {
        Gu("select", e);
        for (var n = 0; n < co.length; n++) {
          var l = co[n];
          if (e[l] != null) {
            var o = rn(e[l]);
            e.multiple && !o ? v("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", l, er()) : !e.multiple && o && v("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", l, er());
          }
        }
      }
    }
    function Dl(e, n, l, o) {
      var c = e.options;
      if (n) {
        for (var h = l, x = {}, T = 0; T < h.length; T++)
          x["$" + h[T]] = !0;
        for (var M = 0; M < c.length; M++) {
          var N = x.hasOwnProperty("$" + c[M].value);
          c[M].selected !== N && (c[M].selected = N), N && o && (c[M].defaultSelected = !0);
        }
      } else {
        for (var z = da(li(l)), te = null, J = 0; J < c.length; J++) {
          if (c[J].value === z) {
            c[J].selected = !0, o && (c[J].defaultSelected = !0);
            return;
          }
          te === null && !c[J].disabled && (te = c[J]);
        }
        te !== null && (te.selected = !0);
      }
    }
    function Ku(e, n) {
      return Qt({}, n, {
        value: void 0
      });
    }
    function Xo(e, n) {
      var l = e;
      Xu(n), l._wrapperState = {
        wasMultiple: !!n.multiple
      }, n.value !== void 0 && n.defaultValue !== void 0 && !Nn && (v("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Nn = !0);
    }
    function gp(e, n) {
      var l = e;
      l.multiple = !!n.multiple;
      var o = n.value;
      o != null ? Dl(l, !!n.multiple, o, !1) : n.defaultValue != null && Dl(l, !!n.multiple, n.defaultValue, !0);
    }
    function gf(e, n) {
      var l = e, o = l._wrapperState.wasMultiple;
      l._wrapperState.wasMultiple = !!n.multiple;
      var c = n.value;
      c != null ? Dl(l, !!n.multiple, c, !1) : o !== !!n.multiple && (n.defaultValue != null ? Dl(l, !!n.multiple, n.defaultValue, !0) : Dl(l, !!n.multiple, n.multiple ? [] : "", !1));
    }
    function Sp(e, n) {
      var l = e, o = n.value;
      o != null && Dl(l, !!n.multiple, o, !1);
    }
    var Yh = !1;
    function xp(e, n) {
      var l = e;
      if (n.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var o = Qt({}, n, {
        value: void 0,
        defaultValue: void 0,
        children: da(l._wrapperState.initialValue)
      });
      return o;
    }
    function Ep(e, n) {
      var l = e;
      Gu("textarea", n), n.value !== void 0 && n.defaultValue !== void 0 && !Yh && (v("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", fa() || "A component"), Yh = !0);
      var o = n.value;
      if (o == null) {
        var c = n.children, h = n.defaultValue;
        if (c != null) {
          v("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (h != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (rn(c)) {
              if (c.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              c = c[0];
            }
            h = c;
          }
        }
        h == null && (h = ""), o = h;
      }
      l._wrapperState = {
        initialValue: li(o)
      };
    }
    function Wh(e, n) {
      var l = e, o = li(n.value), c = li(n.defaultValue);
      if (o != null) {
        var h = da(o);
        h !== l.value && (l.value = h), n.defaultValue == null && l.defaultValue !== h && (l.defaultValue = h);
      }
      c != null && (l.defaultValue = da(c));
    }
    function Bh(e, n) {
      var l = e, o = l.textContent;
      o === l._wrapperState.initialValue && o !== "" && o !== null && (l.value = o);
    }
    function x1(e, n) {
      Wh(e, n);
    }
    var kl = "http://www.w3.org/1999/xhtml", wp = "http://www.w3.org/1998/Math/MathML", Cp = "http://www.w3.org/2000/svg";
    function bp(e) {
      switch (e) {
        case "svg":
          return Cp;
        case "math":
          return wp;
        default:
          return kl;
      }
    }
    function Tp(e, n) {
      return e == null || e === kl ? bp(n) : e === Cp && n === "foreignObject" ? kl : e;
    }
    var Gh = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, l, o, c) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(n, l, o, c);
        });
      } : e;
    }, Sf, Qh = Gh(function(e, n) {
      if (e.namespaceURI === Cp && !("innerHTML" in e)) {
        Sf = Sf || document.createElement("div"), Sf.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>";
        for (var l = Sf.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; l.firstChild; )
          e.appendChild(l.firstChild);
        return;
      }
      e.innerHTML = n;
    }), Da = 1, Ol = 3, yr = 8, Al = 9, Rp = 11, Qs = function(e, n) {
      if (n) {
        var l = e.firstChild;
        if (l && l === e.lastChild && l.nodeType === Ol) {
          l.nodeValue = n;
          return;
        }
      }
      e.textContent = n;
    }, Zu = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, Ju = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function Xh(e, n) {
      return e + n.charAt(0).toUpperCase() + n.substring(1);
    }
    var Kh = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Ju).forEach(function(e) {
      Kh.forEach(function(n) {
        Ju[Xh(n, e)] = Ju[e];
      });
    });
    function xf(e, n, l) {
      var o = n == null || typeof n == "boolean" || n === "";
      return o ? "" : !l && typeof n == "number" && n !== 0 && !(Ju.hasOwnProperty(e) && Ju[e]) ? n + "px" : (Ct(n, e), ("" + n).trim());
    }
    var Zh = /([A-Z])/g, Jh = /^ms-/;
    function Xs(e) {
      return e.replace(Zh, "-$1").toLowerCase().replace(Jh, "-ms-");
    }
    var em = function() {
    };
    {
      var E1 = /^(?:webkit|moz|o)[A-Z]/, w1 = /^-ms-/, tm = /-(.)/g, Mp = /;\s*$/, nl = {}, Ko = {}, nm = !1, ec = !1, C1 = function(e) {
        return e.replace(tm, function(n, l) {
          return l.toUpperCase();
        });
      }, rm = function(e) {
        nl.hasOwnProperty(e) && nl[e] || (nl[e] = !0, v(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          C1(e.replace(w1, "ms-"))
        ));
      }, _p = function(e) {
        nl.hasOwnProperty(e) && nl[e] || (nl[e] = !0, v("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, Dp = function(e, n) {
        Ko.hasOwnProperty(n) && Ko[n] || (Ko[n] = !0, v(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, n.replace(Mp, "")));
      }, am = function(e, n) {
        nm || (nm = !0, v("`NaN` is an invalid value for the `%s` css style property.", e));
      }, im = function(e, n) {
        ec || (ec = !0, v("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      em = function(e, n) {
        e.indexOf("-") > -1 ? rm(e) : E1.test(e) ? _p(e) : Mp.test(n) && Dp(e, n), typeof n == "number" && (isNaN(n) ? am(e, n) : isFinite(n) || im(e, n));
      };
    }
    var lm = em;
    function b1(e) {
      {
        var n = "", l = "";
        for (var o in e)
          if (e.hasOwnProperty(o)) {
            var c = e[o];
            if (c != null) {
              var h = o.indexOf("--") === 0;
              n += l + (h ? o : Xs(o)) + ":", n += xf(o, c, h), l = ";";
            }
          }
        return n || null;
      }
    }
    function om(e, n) {
      var l = e.style;
      for (var o in n)
        if (n.hasOwnProperty(o)) {
          var c = o.indexOf("--") === 0;
          c || lm(o, n[o]);
          var h = xf(o, n[o], c);
          o === "float" && (o = "cssFloat"), c ? l.setProperty(o, h) : l[o] = h;
        }
    }
    function T1(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function sm(e) {
      var n = {};
      for (var l in e)
        for (var o = Zu[l] || [l], c = 0; c < o.length; c++)
          n[o[c]] = l;
      return n;
    }
    function R1(e, n) {
      {
        if (!n)
          return;
        var l = sm(e), o = sm(n), c = {};
        for (var h in l) {
          var x = l[h], T = o[h];
          if (T && x !== T) {
            var M = x + "," + T;
            if (c[M])
              continue;
            c[M] = !0, v("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", T1(e[x]) ? "Removing" : "Updating", x, T);
          }
        }
      }
    }
    var zi = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, tc = Qt({
      menuitem: !0
    }, zi), um = "__html";
    function Ef(e, n) {
      if (n) {
        if (tc[e] && (n.children != null || n.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (n.dangerouslySetInnerHTML != null) {
          if (n.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof n.dangerouslySetInnerHTML != "object" || !(um in n.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!n.suppressContentEditableWarning && n.contentEditable && n.children != null && v("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), n.style != null && typeof n.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function fo(e, n) {
      if (e.indexOf("-") === -1)
        return typeof n.is == "string";
      switch (e) {
        // These are reserved SVG and MathML elements.
        // We don't mind this list too much because we expect it to never grow.
        // The alternative is to track the namespace in a few places which is convoluted.
        // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var nc = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, wf = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, Ks = {}, M1 = new RegExp("^(aria)-[" + De + "]*$"), Zs = new RegExp("^(aria)[A-Z][" + De + "]*$");
    function kp(e, n) {
      {
        if (Le.call(Ks, n) && Ks[n])
          return !0;
        if (Zs.test(n)) {
          var l = "aria-" + n.slice(4).toLowerCase(), o = wf.hasOwnProperty(l) ? l : null;
          if (o == null)
            return v("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", n), Ks[n] = !0, !0;
          if (n !== o)
            return v("Invalid ARIA attribute `%s`. Did you mean `%s`?", n, o), Ks[n] = !0, !0;
        }
        if (M1.test(n)) {
          var c = n.toLowerCase(), h = wf.hasOwnProperty(c) ? c : null;
          if (h == null)
            return Ks[n] = !0, !1;
          if (n !== h)
            return v("Unknown ARIA attribute `%s`. Did you mean `%s`?", n, h), Ks[n] = !0, !0;
        }
      }
      return !0;
    }
    function rc(e, n) {
      {
        var l = [];
        for (var o in n) {
          var c = kp(e, o);
          c || l.push(o);
        }
        var h = l.map(function(x) {
          return "`" + x + "`";
        }).join(", ");
        l.length === 1 ? v("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", h, e) : l.length > 1 && v("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", h, e);
      }
    }
    function Op(e, n) {
      fo(e, n) || rc(e, n);
    }
    var Ap = !1;
    function Cf(e, n) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        n != null && n.value === null && !Ap && (Ap = !0, e === "select" && n.multiple ? v("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : v("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var Zo = function() {
    };
    {
      var Vr = {}, Lp = /^on./, bf = /^on[^A-Z]/, cm = new RegExp("^(aria)-[" + De + "]*$"), fm = new RegExp("^(aria)[A-Z][" + De + "]*$");
      Zo = function(e, n, l, o) {
        if (Le.call(Vr, n) && Vr[n])
          return !0;
        var c = n.toLowerCase();
        if (c === "onfocusin" || c === "onfocusout")
          return v("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Vr[n] = !0, !0;
        if (o != null) {
          var h = o.registrationNameDependencies, x = o.possibleRegistrationNames;
          if (h.hasOwnProperty(n))
            return !0;
          var T = x.hasOwnProperty(c) ? x[c] : null;
          if (T != null)
            return v("Invalid event handler property `%s`. Did you mean `%s`?", n, T), Vr[n] = !0, !0;
          if (Lp.test(n))
            return v("Unknown event handler property `%s`. It will be ignored.", n), Vr[n] = !0, !0;
        } else if (Lp.test(n))
          return bf.test(n) && v("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", n), Vr[n] = !0, !0;
        if (cm.test(n) || fm.test(n))
          return !0;
        if (c === "innerhtml")
          return v("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Vr[n] = !0, !0;
        if (c === "aria")
          return v("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Vr[n] = !0, !0;
        if (c === "is" && l !== null && l !== void 0 && typeof l != "string")
          return v("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof l), Vr[n] = !0, !0;
        if (typeof l == "number" && isNaN(l))
          return v("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", n), Vr[n] = !0, !0;
        var M = gt(n), N = M !== null && M.type === Ke;
        if (nc.hasOwnProperty(c)) {
          var z = nc[c];
          if (z !== n)
            return v("Invalid DOM property `%s`. Did you mean `%s`?", n, z), Vr[n] = !0, !0;
        } else if (!N && n !== c)
          return v("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", n, c), Vr[n] = !0, !0;
        return typeof l == "boolean" && Tt(n, l, M, !1) ? (l ? v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', l, n, n, l, n) : v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', l, n, n, l, n, n, n), Vr[n] = !0, !0) : N ? !0 : Tt(n, l, M, !1) ? (Vr[n] = !0, !1) : ((l === "false" || l === "true") && M !== null && M.type === wt && (v("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", l, n, l === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', n, l), Vr[n] = !0), !0);
      };
    }
    var dm = function(e, n, l) {
      {
        var o = [];
        for (var c in n) {
          var h = Zo(e, c, n[c], l);
          h || o.push(c);
        }
        var x = o.map(function(T) {
          return "`" + T + "`";
        }).join(", ");
        o.length === 1 ? v("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", x, e) : o.length > 1 && v("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", x, e);
      }
    };
    function pm(e, n, l) {
      fo(e, n) || dm(e, n, l);
    }
    var Np = 1, Tf = 2, ui = 4, zp = Np | Tf | ui, Jo = null;
    function _1(e) {
      Jo !== null && v("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Jo = e;
    }
    function D1() {
      Jo === null && v("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Jo = null;
    }
    function ac(e) {
      return e === Jo;
    }
    function Up(e) {
      var n = e.target || e.srcElement || window;
      return n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === Ol ? n.parentNode : n;
    }
    var Rf = null, es = null, Dn = null;
    function Mf(e) {
      var n = Su(e);
      if (n) {
        if (typeof Rf != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var l = n.stateNode;
        if (l) {
          var o = wy(l);
          Rf(n.stateNode, n.type, o);
        }
      }
    }
    function _f(e) {
      Rf = e;
    }
    function Js(e) {
      es ? Dn ? Dn.push(e) : Dn = [e] : es = e;
    }
    function vm() {
      return es !== null || Dn !== null;
    }
    function Df() {
      if (es) {
        var e = es, n = Dn;
        if (es = null, Dn = null, Mf(e), n)
          for (var l = 0; l < n.length; l++)
            Mf(n[l]);
      }
    }
    var eu = function(e, n) {
      return e(n);
    }, ic = function() {
    }, po = !1;
    function hm() {
      var e = vm();
      e && (ic(), Df());
    }
    function mm(e, n, l) {
      if (po)
        return e(n, l);
      po = !0;
      try {
        return eu(e, n, l);
      } finally {
        po = !1, hm();
      }
    }
    function k1(e, n, l) {
      eu = e, ic = l;
    }
    function ym(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function kf(e, n, l) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(l.disabled && ym(n));
        default:
          return !1;
      }
    }
    function vo(e, n) {
      var l = e.stateNode;
      if (l === null)
        return null;
      var o = wy(l);
      if (o === null)
        return null;
      var c = o[n];
      if (kf(n, e.type, o))
        return null;
      if (c && typeof c != "function")
        throw new Error("Expected `" + n + "` listener to be a function, instead got a value of `" + typeof c + "` type.");
      return c;
    }
    var lc = !1;
    if (vt)
      try {
        var ts = {};
        Object.defineProperty(ts, "passive", {
          get: function() {
            lc = !0;
          }
        }), window.addEventListener("test", ts, ts), window.removeEventListener("test", ts, ts);
      } catch {
        lc = !1;
      }
    function Of(e, n, l, o, c, h, x, T, M) {
      var N = Array.prototype.slice.call(arguments, 3);
      try {
        n.apply(l, N);
      } catch (z) {
        this.onError(z);
      }
    }
    var Af = Of;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var jp = document.createElement("react");
      Af = function(n, l, o, c, h, x, T, M, N) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var z = document.createEvent("Event"), te = !1, J = !0, he = window.event, ge = Object.getOwnPropertyDescriptor(window, "event");
        function we() {
          jp.removeEventListener(Ce, Nt, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = he);
        }
        var lt = Array.prototype.slice.call(arguments, 3);
        function Nt() {
          te = !0, we(), l.apply(o, lt), J = !1;
        }
        var Mt, yn = !1, dn = !1;
        function ue(ce) {
          if (Mt = ce.error, yn = !0, Mt === null && ce.colno === 0 && ce.lineno === 0 && (dn = !0), ce.defaultPrevented && Mt != null && typeof Mt == "object")
            try {
              Mt._suppressLogging = !0;
            } catch {
            }
        }
        var Ce = "react-" + (n || "invokeguardedcallback");
        if (window.addEventListener("error", ue), jp.addEventListener(Ce, Nt, !1), z.initEvent(Ce, !1, !1), jp.dispatchEvent(z), ge && Object.defineProperty(window, "event", ge), te && J && (yn ? dn && (Mt = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Mt = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Mt)), window.removeEventListener("error", ue), !te)
          return we(), Of.apply(this, arguments);
      };
    }
    var gm = Af, tu = !1, Lf = null, nu = !1, rl = null, Sm = {
      onError: function(e) {
        tu = !0, Lf = e;
      }
    };
    function ho(e, n, l, o, c, h, x, T, M) {
      tu = !1, Lf = null, gm.apply(Sm, arguments);
    }
    function al(e, n, l, o, c, h, x, T, M) {
      if (ho.apply(this, arguments), tu) {
        var N = sc();
        nu || (nu = !0, rl = N);
      }
    }
    function oc() {
      if (nu) {
        var e = rl;
        throw nu = !1, rl = null, e;
      }
    }
    function Ll() {
      return tu;
    }
    function sc() {
      if (tu) {
        var e = Lf;
        return tu = !1, Lf = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function ru(e) {
      return e._reactInternals;
    }
    function O1(e) {
      return e._reactInternals !== void 0;
    }
    function ns(e, n) {
      e._reactInternals = n;
    }
    var Dt = (
      /*                      */
      0
    ), Ui = (
      /*                */
      1
    ), tr = (
      /*                    */
      2
    ), vn = (
      /*                       */
      4
    ), ci = (
      /*                */
      16
    ), fi = (
      /*                 */
      32
    ), Hn = (
      /*                     */
      64
    ), _t = (
      /*                   */
      128
    ), ea = (
      /*            */
      256
    ), or = (
      /*                          */
      512
    ), Dr = (
      /*                     */
      1024
    ), ka = (
      /*                      */
      2048
    ), Oa = (
      /*                    */
      4096
    ), gr = (
      /*                   */
      8192
    ), au = (
      /*             */
      16384
    ), xm = (
      /*               */
      32767
    ), uc = (
      /*                   */
      32768
    ), zr = (
      /*                */
      65536
    ), Nf = (
      /* */
      131072
    ), il = (
      /*                       */
      1048576
    ), iu = (
      /*                    */
      2097152
    ), Nl = (
      /*                 */
      4194304
    ), zf = (
      /*                */
      8388608
    ), mo = (
      /*               */
      16777216
    ), ll = (
      /*              */
      33554432
    ), yo = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      vn | Dr | 0
    ), go = tr | vn | ci | fi | or | Oa | gr, So = vn | Hn | or | gr, zl = ka | ci, Sr = Nl | zf | iu, di = s.ReactCurrentOwner;
    function Ba(e) {
      var n = e, l = e;
      if (e.alternate)
        for (; n.return; )
          n = n.return;
      else {
        var o = n;
        do
          n = o, (n.flags & (tr | Oa)) !== Dt && (l = n.return), o = n.return;
        while (o);
      }
      return n.tag === b ? l : null;
    }
    function ol(e) {
      if (e.tag === H) {
        var n = e.memoizedState;
        if (n === null) {
          var l = e.alternate;
          l !== null && (n = l.memoizedState);
        }
        if (n !== null)
          return n.dehydrated;
      }
      return null;
    }
    function sl(e) {
      return e.tag === b ? e.stateNode.containerInfo : null;
    }
    function rs(e) {
      return Ba(e) === e;
    }
    function Em(e) {
      {
        var n = di.current;
        if (n !== null && n.tag === E) {
          var l = n, o = l.stateNode;
          o._warnedAboutRefsInRender || v("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Gt(l) || "A component"), o._warnedAboutRefsInRender = !0;
        }
      }
      var c = ru(e);
      return c ? Ba(c) === c : !1;
    }
    function Uf(e) {
      if (Ba(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function jf(e) {
      var n = e.alternate;
      if (!n) {
        var l = Ba(e);
        if (l === null)
          throw new Error("Unable to find node on an unmounted component.");
        return l !== e ? null : e;
      }
      for (var o = e, c = n; ; ) {
        var h = o.return;
        if (h === null)
          break;
        var x = h.alternate;
        if (x === null) {
          var T = h.return;
          if (T !== null) {
            o = c = T;
            continue;
          }
          break;
        }
        if (h.child === x.child) {
          for (var M = h.child; M; ) {
            if (M === o)
              return Uf(h), e;
            if (M === c)
              return Uf(h), n;
            M = M.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (o.return !== c.return)
          o = h, c = x;
        else {
          for (var N = !1, z = h.child; z; ) {
            if (z === o) {
              N = !0, o = h, c = x;
              break;
            }
            if (z === c) {
              N = !0, c = h, o = x;
              break;
            }
            z = z.sibling;
          }
          if (!N) {
            for (z = x.child; z; ) {
              if (z === o) {
                N = !0, o = x, c = h;
                break;
              }
              if (z === c) {
                N = !0, c = x, o = h;
                break;
              }
              z = z.sibling;
            }
            if (!N)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (o.alternate !== c)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (o.tag !== b)
        throw new Error("Unable to find node on an unmounted component.");
      return o.stateNode.current === o ? e : n;
    }
    function Aa(e) {
      var n = jf(e);
      return n !== null ? La(n) : null;
    }
    function La(e) {
      if (e.tag === D || e.tag === _)
        return e;
      for (var n = e.child; n !== null; ) {
        var l = La(n);
        if (l !== null)
          return l;
        n = n.sibling;
      }
      return null;
    }
    function Xn(e) {
      var n = jf(e);
      return n !== null ? pi(n) : null;
    }
    function pi(e) {
      if (e.tag === D || e.tag === _)
        return e;
      for (var n = e.child; n !== null; ) {
        if (n.tag !== R) {
          var l = pi(n);
          if (l !== null)
            return l;
        }
        n = n.sibling;
      }
      return null;
    }
    var Fp = a.unstable_scheduleCallback, wm = a.unstable_cancelCallback, Pp = a.unstable_shouldYield, $p = a.unstable_requestPaint, kr = a.unstable_now, Ff = a.unstable_getCurrentPriorityLevel, cc = a.unstable_ImmediatePriority, xo = a.unstable_UserBlockingPriority, Ul = a.unstable_NormalPriority, A1 = a.unstable_LowPriority, as = a.unstable_IdlePriority, Pf = a.unstable_yieldValue, Cm = a.unstable_setDisableYieldValue, is = null, ur = null, it = null, Ga = !1, Na = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function lu(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var n = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (n.isDisabled)
        return !0;
      if (!n.supportsFiber)
        return v("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        xe && (e = Qt({}, e, {
          getLaneLabelMap: ls,
          injectProfilingHooks: vi
        })), is = n.inject(e), ur = n;
      } catch (l) {
        v("React instrumentation encountered an error: %s.", l);
      }
      return !!n.checkDCE;
    }
    function Hp(e, n) {
      if (ur && typeof ur.onScheduleFiberRoot == "function")
        try {
          ur.onScheduleFiberRoot(is, e, n);
        } catch (l) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", l));
        }
    }
    function Vp(e, n) {
      if (ur && typeof ur.onCommitFiberRoot == "function")
        try {
          var l = (e.current.flags & _t) === _t;
          if (be) {
            var o;
            switch (n) {
              case pa:
                o = cc;
                break;
              case cl:
                o = xo;
                break;
              case hi:
                o = Ul;
                break;
              case mi:
                o = as;
                break;
              default:
                o = Ul;
                break;
            }
            ur.onCommitFiberRoot(is, e, o, l);
          }
        } catch (c) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", c));
        }
    }
    function Ip(e) {
      if (ur && typeof ur.onPostCommitFiberRoot == "function")
        try {
          ur.onPostCommitFiberRoot(is, e);
        } catch (n) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", n));
        }
    }
    function qp(e) {
      if (ur && typeof ur.onCommitFiberUnmount == "function")
        try {
          ur.onCommitFiberUnmount(is, e);
        } catch (n) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", n));
        }
    }
    function nr(e) {
      if (typeof Pf == "function" && (Cm(e), p(e)), ur && typeof ur.setStrictMode == "function")
        try {
          ur.setStrictMode(is, e);
        } catch (n) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", n));
        }
    }
    function vi(e) {
      it = e;
    }
    function ls() {
      {
        for (var e = /* @__PURE__ */ new Map(), n = 1, l = 0; l < us; l++) {
          var o = Mm(n);
          e.set(n, o), n *= 2;
        }
        return e;
      }
    }
    function Yp(e) {
      it !== null && typeof it.markCommitStarted == "function" && it.markCommitStarted(e);
    }
    function Wp() {
      it !== null && typeof it.markCommitStopped == "function" && it.markCommitStopped();
    }
    function Qa(e) {
      it !== null && typeof it.markComponentRenderStarted == "function" && it.markComponentRenderStarted(e);
    }
    function Xa() {
      it !== null && typeof it.markComponentRenderStopped == "function" && it.markComponentRenderStopped();
    }
    function Bp(e) {
      it !== null && typeof it.markComponentPassiveEffectMountStarted == "function" && it.markComponentPassiveEffectMountStarted(e);
    }
    function bm() {
      it !== null && typeof it.markComponentPassiveEffectMountStopped == "function" && it.markComponentPassiveEffectMountStopped();
    }
    function jl(e) {
      it !== null && typeof it.markComponentPassiveEffectUnmountStarted == "function" && it.markComponentPassiveEffectUnmountStarted(e);
    }
    function Eo() {
      it !== null && typeof it.markComponentPassiveEffectUnmountStopped == "function" && it.markComponentPassiveEffectUnmountStopped();
    }
    function $f(e) {
      it !== null && typeof it.markComponentLayoutEffectMountStarted == "function" && it.markComponentLayoutEffectMountStarted(e);
    }
    function Tm() {
      it !== null && typeof it.markComponentLayoutEffectMountStopped == "function" && it.markComponentLayoutEffectMountStopped();
    }
    function fc(e) {
      it !== null && typeof it.markComponentLayoutEffectUnmountStarted == "function" && it.markComponentLayoutEffectUnmountStarted(e);
    }
    function Gp() {
      it !== null && typeof it.markComponentLayoutEffectUnmountStopped == "function" && it.markComponentLayoutEffectUnmountStopped();
    }
    function dc(e, n, l) {
      it !== null && typeof it.markComponentErrored == "function" && it.markComponentErrored(e, n, l);
    }
    function ul(e, n, l) {
      it !== null && typeof it.markComponentSuspended == "function" && it.markComponentSuspended(e, n, l);
    }
    function pc(e) {
      it !== null && typeof it.markLayoutEffectsStarted == "function" && it.markLayoutEffectsStarted(e);
    }
    function vc() {
      it !== null && typeof it.markLayoutEffectsStopped == "function" && it.markLayoutEffectsStopped();
    }
    function os(e) {
      it !== null && typeof it.markPassiveEffectsStarted == "function" && it.markPassiveEffectsStarted(e);
    }
    function Qp() {
      it !== null && typeof it.markPassiveEffectsStopped == "function" && it.markPassiveEffectsStopped();
    }
    function ss(e) {
      it !== null && typeof it.markRenderStarted == "function" && it.markRenderStarted(e);
    }
    function Rm() {
      it !== null && typeof it.markRenderYielded == "function" && it.markRenderYielded();
    }
    function Hf() {
      it !== null && typeof it.markRenderStopped == "function" && it.markRenderStopped();
    }
    function rr(e) {
      it !== null && typeof it.markRenderScheduled == "function" && it.markRenderScheduled(e);
    }
    function Vf(e, n) {
      it !== null && typeof it.markForceUpdateScheduled == "function" && it.markForceUpdateScheduled(e, n);
    }
    function hc(e, n) {
      it !== null && typeof it.markStateUpdateScheduled == "function" && it.markStateUpdateScheduled(e, n);
    }
    var kt = (
      /*                         */
      0
    ), ln = (
      /*                 */
      1
    ), bn = (
      /*                    */
      2
    ), zn = (
      /*               */
      8
    ), Tn = (
      /*              */
      16
    ), xr = Math.clz32 ? Math.clz32 : mc, Ur = Math.log, If = Math.LN2;
    function mc(e) {
      var n = e >>> 0;
      return n === 0 ? 32 : 31 - (Ur(n) / If | 0) | 0;
    }
    var us = 31, Ae = (
      /*                        */
      0
    ), wn = (
      /*                          */
      0
    ), Pt = (
      /*                        */
      1
    ), wo = (
      /*    */
      2
    ), ji = (
      /*             */
      4
    ), ta = (
      /*            */
      8
    ), cr = (
      /*                     */
      16
    ), Fl = (
      /*                */
      32
    ), Co = (
      /*                       */
      4194240
    ), cs = (
      /*                        */
      64
    ), qf = (
      /*                        */
      128
    ), Yf = (
      /*                        */
      256
    ), Wf = (
      /*                        */
      512
    ), Bf = (
      /*                        */
      1024
    ), Gf = (
      /*                        */
      2048
    ), Qf = (
      /*                        */
      4096
    ), Xf = (
      /*                        */
      8192
    ), Kf = (
      /*                        */
      16384
    ), fs = (
      /*                       */
      32768
    ), Zf = (
      /*                       */
      65536
    ), ou = (
      /*                       */
      131072
    ), su = (
      /*                       */
      262144
    ), Jf = (
      /*                       */
      524288
    ), yc = (
      /*                       */
      1048576
    ), ed = (
      /*                       */
      2097152
    ), gc = (
      /*                            */
      130023424
    ), ds = (
      /*                             */
      4194304
    ), td = (
      /*                             */
      8388608
    ), Sc = (
      /*                             */
      16777216
    ), nd = (
      /*                             */
      33554432
    ), rd = (
      /*                             */
      67108864
    ), Xp = ds, xc = (
      /*          */
      134217728
    ), Kp = (
      /*                          */
      268435455
    ), Ec = (
      /*               */
      268435456
    ), ps = (
      /*                        */
      536870912
    ), za = (
      /*                   */
      1073741824
    );
    function Mm(e) {
      {
        if (e & Pt)
          return "Sync";
        if (e & wo)
          return "InputContinuousHydration";
        if (e & ji)
          return "InputContinuous";
        if (e & ta)
          return "DefaultHydration";
        if (e & cr)
          return "Default";
        if (e & Fl)
          return "TransitionHydration";
        if (e & Co)
          return "Transition";
        if (e & gc)
          return "Retry";
        if (e & xc)
          return "SelectiveHydration";
        if (e & Ec)
          return "IdleHydration";
        if (e & ps)
          return "Idle";
        if (e & za)
          return "Offscreen";
      }
    }
    var Pn = -1, vs = cs, ad = ds;
    function wc(e) {
      switch (bo(e)) {
        case Pt:
          return Pt;
        case wo:
          return wo;
        case ji:
          return ji;
        case ta:
          return ta;
        case cr:
          return cr;
        case Fl:
          return Fl;
        case cs:
        case qf:
        case Yf:
        case Wf:
        case Bf:
        case Gf:
        case Qf:
        case Xf:
        case Kf:
        case fs:
        case Zf:
        case ou:
        case su:
        case Jf:
        case yc:
        case ed:
          return e & Co;
        case ds:
        case td:
        case Sc:
        case nd:
        case rd:
          return e & gc;
        case xc:
          return xc;
        case Ec:
          return Ec;
        case ps:
          return ps;
        case za:
          return za;
        default:
          return v("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function id(e, n) {
      var l = e.pendingLanes;
      if (l === Ae)
        return Ae;
      var o = Ae, c = e.suspendedLanes, h = e.pingedLanes, x = l & Kp;
      if (x !== Ae) {
        var T = x & ~c;
        if (T !== Ae)
          o = wc(T);
        else {
          var M = x & h;
          M !== Ae && (o = wc(M));
        }
      } else {
        var N = l & ~c;
        N !== Ae ? o = wc(N) : h !== Ae && (o = wc(h));
      }
      if (o === Ae)
        return Ae;
      if (n !== Ae && n !== o && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (n & c) === Ae) {
        var z = bo(o), te = bo(n);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          z >= te || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          z === cr && (te & Co) !== Ae
        )
          return n;
      }
      (o & ji) !== Ae && (o |= l & cr);
      var J = e.entangledLanes;
      if (J !== Ae)
        for (var he = e.entanglements, ge = o & J; ge > 0; ) {
          var we = Er(ge), lt = 1 << we;
          o |= he[we], ge &= ~lt;
        }
      return o;
    }
    function Fi(e, n) {
      for (var l = e.eventTimes, o = Pn; n > 0; ) {
        var c = Er(n), h = 1 << c, x = l[c];
        x > o && (o = x), n &= ~h;
      }
      return o;
    }
    function Zp(e, n) {
      switch (e) {
        case Pt:
        case wo:
        case ji:
          return n + 250;
        case ta:
        case cr:
        case Fl:
        case cs:
        case qf:
        case Yf:
        case Wf:
        case Bf:
        case Gf:
        case Qf:
        case Xf:
        case Kf:
        case fs:
        case Zf:
        case ou:
        case su:
        case Jf:
        case yc:
        case ed:
          return n + 5e3;
        case ds:
        case td:
        case Sc:
        case nd:
        case rd:
          return Pn;
        case xc:
        case Ec:
        case ps:
        case za:
          return Pn;
        default:
          return v("Should have found matching lanes. This is a bug in React."), Pn;
      }
    }
    function ld(e, n) {
      for (var l = e.pendingLanes, o = e.suspendedLanes, c = e.pingedLanes, h = e.expirationTimes, x = l; x > 0; ) {
        var T = Er(x), M = 1 << T, N = h[T];
        N === Pn ? ((M & o) === Ae || (M & c) !== Ae) && (h[T] = Zp(M, n)) : N <= n && (e.expiredLanes |= M), x &= ~M;
      }
    }
    function _m(e) {
      return wc(e.pendingLanes);
    }
    function od(e) {
      var n = e.pendingLanes & ~za;
      return n !== Ae ? n : n & za ? za : Ae;
    }
    function Dm(e) {
      return (e & Pt) !== Ae;
    }
    function Cc(e) {
      return (e & Kp) !== Ae;
    }
    function hs(e) {
      return (e & gc) === e;
    }
    function Jp(e) {
      var n = Pt | ji | cr;
      return (e & n) === Ae;
    }
    function ev(e) {
      return (e & Co) === e;
    }
    function sd(e, n) {
      var l = wo | ji | ta | cr;
      return (n & l) !== Ae;
    }
    function km(e, n) {
      return (n & e.expiredLanes) !== Ae;
    }
    function tv(e) {
      return (e & Co) !== Ae;
    }
    function nv() {
      var e = vs;
      return vs <<= 1, (vs & Co) === Ae && (vs = cs), e;
    }
    function Om() {
      var e = ad;
      return ad <<= 1, (ad & gc) === Ae && (ad = ds), e;
    }
    function bo(e) {
      return e & -e;
    }
    function bc(e) {
      return bo(e);
    }
    function Er(e) {
      return 31 - xr(e);
    }
    function Ir(e) {
      return Er(e);
    }
    function Ua(e, n) {
      return (e & n) !== Ae;
    }
    function ms(e, n) {
      return (e & n) === n;
    }
    function Jt(e, n) {
      return e | n;
    }
    function Tc(e, n) {
      return e & ~n;
    }
    function rv(e, n) {
      return e & n;
    }
    function Am(e) {
      return e;
    }
    function Lm(e, n) {
      return e !== wn && e < n ? e : n;
    }
    function Rc(e) {
      for (var n = [], l = 0; l < us; l++)
        n.push(e);
      return n;
    }
    function uu(e, n, l) {
      e.pendingLanes |= n, n !== ps && (e.suspendedLanes = Ae, e.pingedLanes = Ae);
      var o = e.eventTimes, c = Ir(n);
      o[c] = l;
    }
    function Nm(e, n) {
      e.suspendedLanes |= n, e.pingedLanes &= ~n;
      for (var l = e.expirationTimes, o = n; o > 0; ) {
        var c = Er(o), h = 1 << c;
        l[c] = Pn, o &= ~h;
      }
    }
    function ud(e, n, l) {
      e.pingedLanes |= e.suspendedLanes & n;
    }
    function av(e, n) {
      var l = e.pendingLanes & ~n;
      e.pendingLanes = n, e.suspendedLanes = Ae, e.pingedLanes = Ae, e.expiredLanes &= n, e.mutableReadLanes &= n, e.entangledLanes &= n;
      for (var o = e.entanglements, c = e.eventTimes, h = e.expirationTimes, x = l; x > 0; ) {
        var T = Er(x), M = 1 << T;
        o[T] = Ae, c[T] = Pn, h[T] = Pn, x &= ~M;
      }
    }
    function cd(e, n) {
      for (var l = e.entangledLanes |= n, o = e.entanglements, c = l; c; ) {
        var h = Er(c), x = 1 << h;
        // Is this one of the newly entangled lanes?
        x & n | // Is this lane transitively entangled with the newly entangled lanes?
        o[h] & n && (o[h] |= n), c &= ~x;
      }
    }
    function iv(e, n) {
      var l = bo(n), o;
      switch (l) {
        case ji:
          o = wo;
          break;
        case cr:
          o = ta;
          break;
        case cs:
        case qf:
        case Yf:
        case Wf:
        case Bf:
        case Gf:
        case Qf:
        case Xf:
        case Kf:
        case fs:
        case Zf:
        case ou:
        case su:
        case Jf:
        case yc:
        case ed:
        case ds:
        case td:
        case Sc:
        case nd:
        case rd:
          o = Fl;
          break;
        case ps:
          o = Ec;
          break;
        default:
          o = wn;
          break;
      }
      return (o & (e.suspendedLanes | n)) !== wn ? wn : o;
    }
    function Mc(e, n, l) {
      if (Na)
        for (var o = e.pendingUpdatersLaneMap; l > 0; ) {
          var c = Ir(l), h = 1 << c, x = o[c];
          x.add(n), l &= ~h;
        }
    }
    function zm(e, n) {
      if (Na)
        for (var l = e.pendingUpdatersLaneMap, o = e.memoizedUpdaters; n > 0; ) {
          var c = Ir(n), h = 1 << c, x = l[c];
          x.size > 0 && (x.forEach(function(T) {
            var M = T.alternate;
            (M === null || !o.has(M)) && o.add(T);
          }), x.clear()), n &= ~h;
        }
    }
    function lv(e, n) {
      return null;
    }
    var pa = Pt, cl = ji, hi = cr, mi = ps, _c = wn;
    function yi() {
      return _c;
    }
    function wr(e) {
      _c = e;
    }
    function Um(e, n) {
      var l = _c;
      try {
        return _c = e, n();
      } finally {
        _c = l;
      }
    }
    function jm(e, n) {
      return e !== 0 && e < n ? e : n;
    }
    function Dc(e, n) {
      return e > n ? e : n;
    }
    function jr(e, n) {
      return e !== 0 && e < n;
    }
    function Fm(e) {
      var n = bo(e);
      return jr(pa, n) ? jr(cl, n) ? Cc(n) ? hi : mi : cl : pa;
    }
    function fd(e) {
      var n = e.current.memoizedState;
      return n.isDehydrated;
    }
    var kc;
    function na(e) {
      kc = e;
    }
    function L1(e) {
      kc(e);
    }
    var ht;
    function cu(e) {
      ht = e;
    }
    var dd;
    function Pm(e) {
      dd = e;
    }
    var $m;
    function Oc(e) {
      $m = e;
    }
    var Ac;
    function ov(e) {
      Ac = e;
    }
    var pd = !1, Lc = [], Pl = null, fl = null, dl = null, fr = /* @__PURE__ */ new Map(), va = /* @__PURE__ */ new Map(), ha = [], Hm = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function Vm(e) {
      return Hm.indexOf(e) > -1;
    }
    function Pi(e, n, l, o, c) {
      return {
        blockedOn: e,
        domEventName: n,
        eventSystemFlags: l,
        nativeEvent: c,
        targetContainers: [o]
      };
    }
    function sv(e, n) {
      switch (e) {
        case "focusin":
        case "focusout":
          Pl = null;
          break;
        case "dragenter":
        case "dragleave":
          fl = null;
          break;
        case "mouseover":
        case "mouseout":
          dl = null;
          break;
        case "pointerover":
        case "pointerout": {
          var l = n.pointerId;
          fr.delete(l);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var o = n.pointerId;
          va.delete(o);
          break;
        }
      }
    }
    function ja(e, n, l, o, c, h) {
      if (e === null || e.nativeEvent !== h) {
        var x = Pi(n, l, o, c, h);
        if (n !== null) {
          var T = Su(n);
          T !== null && ht(T);
        }
        return x;
      }
      e.eventSystemFlags |= o;
      var M = e.targetContainers;
      return c !== null && M.indexOf(c) === -1 && M.push(c), e;
    }
    function N1(e, n, l, o, c) {
      switch (n) {
        case "focusin": {
          var h = c;
          return Pl = ja(Pl, e, n, l, o, h), !0;
        }
        case "dragenter": {
          var x = c;
          return fl = ja(fl, e, n, l, o, x), !0;
        }
        case "mouseover": {
          var T = c;
          return dl = ja(dl, e, n, l, o, T), !0;
        }
        case "pointerover": {
          var M = c, N = M.pointerId;
          return fr.set(N, ja(fr.get(N) || null, e, n, l, o, M)), !0;
        }
        case "gotpointercapture": {
          var z = c, te = z.pointerId;
          return va.set(te, ja(va.get(te) || null, e, n, l, o, z)), !0;
        }
      }
      return !1;
    }
    function uv(e) {
      var n = Yc(e.target);
      if (n !== null) {
        var l = Ba(n);
        if (l !== null) {
          var o = l.tag;
          if (o === H) {
            var c = ol(l);
            if (c !== null) {
              e.blockedOn = c, Ac(e.priority, function() {
                dd(l);
              });
              return;
            }
          } else if (o === b) {
            var h = l.stateNode;
            if (fd(h)) {
              e.blockedOn = sl(l);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Im(e) {
      for (var n = $m(), l = {
        blockedOn: null,
        target: e,
        priority: n
      }, o = 0; o < ha.length && jr(n, ha[o].priority); o++)
        ;
      ha.splice(o, 0, l), o === 0 && uv(l);
    }
    function Nc(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var n = e.targetContainers; n.length > 0; ) {
        var l = n[0], o = du(e.domEventName, e.eventSystemFlags, l, e.nativeEvent);
        if (o === null) {
          var c = e.nativeEvent, h = new c.constructor(c.type, c);
          _1(h), c.target.dispatchEvent(h), D1();
        } else {
          var x = Su(o);
          return x !== null && ht(x), e.blockedOn = o, !1;
        }
        n.shift();
      }
      return !0;
    }
    function cv(e, n, l) {
      Nc(e) && l.delete(n);
    }
    function z1() {
      pd = !1, Pl !== null && Nc(Pl) && (Pl = null), fl !== null && Nc(fl) && (fl = null), dl !== null && Nc(dl) && (dl = null), fr.forEach(cv), va.forEach(cv);
    }
    function To(e, n) {
      e.blockedOn === n && (e.blockedOn = null, pd || (pd = !0, a.unstable_scheduleCallback(a.unstable_NormalPriority, z1)));
    }
    function ys(e) {
      if (Lc.length > 0) {
        To(Lc[0], e);
        for (var n = 1; n < Lc.length; n++) {
          var l = Lc[n];
          l.blockedOn === e && (l.blockedOn = null);
        }
      }
      Pl !== null && To(Pl, e), fl !== null && To(fl, e), dl !== null && To(dl, e);
      var o = function(T) {
        return To(T, e);
      };
      fr.forEach(o), va.forEach(o);
      for (var c = 0; c < ha.length; c++) {
        var h = ha[c];
        h.blockedOn === e && (h.blockedOn = null);
      }
      for (; ha.length > 0; ) {
        var x = ha[0];
        if (x.blockedOn !== null)
          break;
        uv(x), x.blockedOn === null && ha.shift();
      }
    }
    var qr = s.ReactCurrentBatchConfig, hn = !0;
    function Or(e) {
      hn = !!e;
    }
    function Cr() {
      return hn;
    }
    function Yr(e, n, l) {
      var o = vd(n), c;
      switch (o) {
        case pa:
          c = Ka;
          break;
        case cl:
          c = fu;
          break;
        case hi:
        default:
          c = dr;
          break;
      }
      return c.bind(null, n, l, e);
    }
    function Ka(e, n, l, o) {
      var c = yi(), h = qr.transition;
      qr.transition = null;
      try {
        wr(pa), dr(e, n, l, o);
      } finally {
        wr(c), qr.transition = h;
      }
    }
    function fu(e, n, l, o) {
      var c = yi(), h = qr.transition;
      qr.transition = null;
      try {
        wr(cl), dr(e, n, l, o);
      } finally {
        wr(c), qr.transition = h;
      }
    }
    function dr(e, n, l, o) {
      hn && zc(e, n, l, o);
    }
    function zc(e, n, l, o) {
      var c = du(e, n, l, o);
      if (c === null) {
        Z1(e, n, o, pl, l), sv(e, o);
        return;
      }
      if (N1(c, e, n, l, o)) {
        o.stopPropagation();
        return;
      }
      if (sv(e, o), n & ui && Vm(e)) {
        for (; c !== null; ) {
          var h = Su(c);
          h !== null && L1(h);
          var x = du(e, n, l, o);
          if (x === null && Z1(e, n, o, pl, l), x === c)
            break;
          c = x;
        }
        c !== null && o.stopPropagation();
        return;
      }
      Z1(e, n, o, null, l);
    }
    var pl = null;
    function du(e, n, l, o) {
      pl = null;
      var c = Up(o), h = Yc(c);
      if (h !== null) {
        var x = Ba(h);
        if (x === null)
          h = null;
        else {
          var T = x.tag;
          if (T === H) {
            var M = ol(x);
            if (M !== null)
              return M;
            h = null;
          } else if (T === b) {
            var N = x.stateNode;
            if (fd(N))
              return sl(x);
            h = null;
          } else x !== h && (h = null);
        }
      }
      return pl = h, null;
    }
    function vd(e) {
      switch (e) {
        // Used by SimpleEventPlugin:
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        // Used by polyfills:
        // eslint-disable-next-line no-fallthrough
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        // Only enableCreateEventHandleAPI:
        // eslint-disable-next-line no-fallthrough
        case "beforeblur":
        case "afterblur":
        // Not used by React but could be by user code:
        // eslint-disable-next-line no-fallthrough
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return pa;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        // Not used by React but could be by user code:
        // eslint-disable-next-line no-fallthrough
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return cl;
        case "message": {
          var n = Ff();
          switch (n) {
            case cc:
              return pa;
            case xo:
              return cl;
            case Ul:
            case A1:
              return hi;
            case as:
              return mi;
            default:
              return hi;
          }
        }
        default:
          return hi;
      }
    }
    function Uc(e, n, l) {
      return e.addEventListener(n, l, !1), l;
    }
    function Fa(e, n, l) {
      return e.addEventListener(n, l, !0), l;
    }
    function fv(e, n, l, o) {
      return e.addEventListener(n, l, {
        capture: !0,
        passive: o
      }), l;
    }
    function pu(e, n, l, o) {
      return e.addEventListener(n, l, {
        passive: o
      }), l;
    }
    var Za = null, vu = null, gs = null;
    function Ro(e) {
      return Za = e, vu = jc(), !0;
    }
    function hd() {
      Za = null, vu = null, gs = null;
    }
    function $l() {
      if (gs)
        return gs;
      var e, n = vu, l = n.length, o, c = jc(), h = c.length;
      for (e = 0; e < l && n[e] === c[e]; e++)
        ;
      var x = l - e;
      for (o = 1; o <= x && n[l - o] === c[h - o]; o++)
        ;
      var T = o > 1 ? 1 - o : void 0;
      return gs = c.slice(e, T), gs;
    }
    function jc() {
      return "value" in Za ? Za.value : Za.textContent;
    }
    function Mo(e) {
      var n, l = e.keyCode;
      return "charCode" in e ? (n = e.charCode, n === 0 && l === 13 && (n = 13)) : n = l, n === 10 && (n = 13), n >= 32 || n === 13 ? n : 0;
    }
    function hu() {
      return !0;
    }
    function Fc() {
      return !1;
    }
    function ra(e) {
      function n(l, o, c, h, x) {
        this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = h, this.target = x, this.currentTarget = null;
        for (var T in e)
          if (e.hasOwnProperty(T)) {
            var M = e[T];
            M ? this[T] = M(h) : this[T] = h[T];
          }
        var N = h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1;
        return N ? this.isDefaultPrevented = hu : this.isDefaultPrevented = Fc, this.isPropagationStopped = Fc, this;
      }
      return Qt(n.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = hu);
        },
        stopPropagation: function() {
          var l = this.nativeEvent;
          l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = hu);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: hu
      }), n;
    }
    var br = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, vl = ra(br), ma = Qt({}, br, {
      view: 0,
      detail: 0
    }), Pa = ra(ma), md, Pc, Ss;
    function U1(e) {
      e !== Ss && (Ss && e.type === "mousemove" ? (md = e.screenX - Ss.screenX, Pc = e.screenY - Ss.screenY) : (md = 0, Pc = 0), Ss = e);
    }
    var $i = Qt({}, ma, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Kn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (U1(e), md);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Pc;
      }
    }), dv = ra($i), pv = Qt({}, $i, {
      dataTransfer: 0
    }), xs = ra(pv), vv = Qt({}, ma, {
      relatedTarget: 0
    }), Hl = ra(vv), qm = Qt({}, br, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Ym = ra(qm), hv = Qt({}, br, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), yd = ra(hv), j1 = Qt({}, br, {
      data: 0
    }), Wm = ra(j1), Bm = Wm, Gm = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Es = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function F1(e) {
      if (e.key) {
        var n = Gm[e.key] || e.key;
        if (n !== "Unidentified")
          return n;
      }
      if (e.type === "keypress") {
        var l = Mo(e);
        return l === 13 ? "Enter" : String.fromCharCode(l);
      }
      return e.type === "keydown" || e.type === "keyup" ? Es[e.keyCode] || "Unidentified" : "";
    }
    var mu = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Qm(e) {
      var n = this, l = n.nativeEvent;
      if (l.getModifierState)
        return l.getModifierState(e);
      var o = mu[e];
      return o ? !!l[o] : !1;
    }
    function Kn(e) {
      return Qm;
    }
    var P1 = Qt({}, ma, {
      key: F1,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Kn,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Mo(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Mo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Xm = ra(P1), $1 = Qt({}, $i, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Km = ra($1), Zm = Qt({}, ma, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Kn
    }), Jm = ra(Zm), H1 = Qt({}, br, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), gi = ra(H1), mv = Qt({}, $i, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), V1 = ra(mv), _o = [9, 13, 27, 32], $c = 229, Vl = vt && "CompositionEvent" in window, Do = null;
    vt && "documentMode" in document && (Do = document.documentMode);
    var yv = vt && "TextEvent" in window && !Do, gd = vt && (!Vl || Do && Do > 8 && Do <= 11), ey = 32, Sd = String.fromCharCode(ey);
    function I1() {
      Fe("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Fe("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Fe("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Fe("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var gv = !1;
    function ty(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function xd(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function Ed(e, n) {
      return e === "keydown" && n.keyCode === $c;
    }
    function Sv(e, n) {
      switch (e) {
        case "keyup":
          return _o.indexOf(n.keyCode) !== -1;
        case "keydown":
          return n.keyCode !== $c;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function wd(e) {
      var n = e.detail;
      return typeof n == "object" && "data" in n ? n.data : null;
    }
    function ny(e) {
      return e.locale === "ko";
    }
    var ws = !1;
    function xv(e, n, l, o, c) {
      var h, x;
      if (Vl ? h = xd(n) : ws ? Sv(n, o) && (h = "onCompositionEnd") : Ed(n, o) && (h = "onCompositionStart"), !h)
        return null;
      gd && !ny(o) && (!ws && h === "onCompositionStart" ? ws = Ro(c) : h === "onCompositionEnd" && ws && (x = $l()));
      var T = uy(l, h);
      if (T.length > 0) {
        var M = new Wm(h, n, null, o, c);
        if (e.push({
          event: M,
          listeners: T
        }), x)
          M.data = x;
        else {
          var N = wd(o);
          N !== null && (M.data = N);
        }
      }
    }
    function Cd(e, n) {
      switch (e) {
        case "compositionend":
          return wd(n);
        case "keypress":
          var l = n.which;
          return l !== ey ? null : (gv = !0, Sd);
        case "textInput":
          var o = n.data;
          return o === Sd && gv ? null : o;
        default:
          return null;
      }
    }
    function Ev(e, n) {
      if (ws) {
        if (e === "compositionend" || !Vl && Sv(e, n)) {
          var l = $l();
          return hd(), ws = !1, l;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!ty(n)) {
            if (n.char && n.char.length > 1)
              return n.char;
            if (n.which)
              return String.fromCharCode(n.which);
          }
          return null;
        case "compositionend":
          return gd && !ny(n) ? null : n.data;
        default:
          return null;
      }
    }
    function bd(e, n, l, o, c) {
      var h;
      if (yv ? h = Cd(n, o) : h = Ev(n, o), !h)
        return null;
      var x = uy(l, "onBeforeInput");
      if (x.length > 0) {
        var T = new Bm("onBeforeInput", "beforeinput", null, o, c);
        e.push({
          event: T,
          listeners: x
        }), T.data = h;
      }
    }
    function ry(e, n, l, o, c, h, x) {
      xv(e, n, l, o, c), bd(e, n, l, o, c);
    }
    var q1 = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function Hc(e) {
      var n = e && e.nodeName && e.nodeName.toLowerCase();
      return n === "input" ? !!q1[e.type] : n === "textarea";
    }
    function Y1(e) {
      if (!vt)
        return !1;
      var n = "on" + e, l = n in document;
      if (!l) {
        var o = document.createElement("div");
        o.setAttribute(n, "return;"), l = typeof o[n] == "function";
      }
      return l;
    }
    function Vc() {
      Fe("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function ay(e, n, l, o) {
      Js(o);
      var c = uy(n, "onChange");
      if (c.length > 0) {
        var h = new vl("onChange", "change", null, l, o);
        e.push({
          event: h,
          listeners: c
        });
      }
    }
    var ko = null, r = null;
    function i(e) {
      var n = e.nodeName && e.nodeName.toLowerCase();
      return n === "select" || n === "input" && e.type === "file";
    }
    function u(e) {
      var n = [];
      ay(n, r, e, Up(e)), mm(d, n);
    }
    function d(e) {
      Q3(e, 0);
    }
    function y(e) {
      var n = kd(e);
      if (tl(n))
        return e;
    }
    function w(e, n) {
      if (e === "change")
        return n;
    }
    var O = !1;
    vt && (O = Y1("input") && (!document.documentMode || document.documentMode > 9));
    function I(e, n) {
      ko = e, r = n, ko.attachEvent("onpropertychange", ye);
    }
    function K() {
      ko && (ko.detachEvent("onpropertychange", ye), ko = null, r = null);
    }
    function ye(e) {
      e.propertyName === "value" && y(r) && u(e);
    }
    function Ue(e, n, l) {
      e === "focusin" ? (K(), I(n, l)) : e === "focusout" && K();
    }
    function Ie(e, n) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return y(r);
    }
    function Ne(e) {
      var n = e.nodeName;
      return n && n.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function ft(e, n) {
      if (e === "click")
        return y(n);
    }
    function St(e, n) {
      if (e === "input" || e === "change")
        return y(n);
    }
    function bt(e) {
      var n = e._wrapperState;
      !n || !n.controlled || e.type !== "number" || Lt(e, "number", e.value);
    }
    function pr(e, n, l, o, c, h, x) {
      var T = l ? kd(l) : window, M, N;
      if (i(T) ? M = w : Hc(T) ? O ? M = St : (M = Ie, N = Ue) : Ne(T) && (M = ft), M) {
        var z = M(n, l);
        if (z) {
          ay(e, z, o, c);
          return;
        }
      }
      N && N(n, T, l), n === "focusout" && bt(T);
    }
    function se() {
      ct("onMouseEnter", ["mouseout", "mouseover"]), ct("onMouseLeave", ["mouseout", "mouseover"]), ct("onPointerEnter", ["pointerout", "pointerover"]), ct("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function ee(e, n, l, o, c, h, x) {
      var T = n === "mouseover" || n === "pointerover", M = n === "mouseout" || n === "pointerout";
      if (T && !ac(o)) {
        var N = o.relatedTarget || o.fromElement;
        if (N && (Yc(N) || zv(N)))
          return;
      }
      if (!(!M && !T)) {
        var z;
        if (c.window === c)
          z = c;
        else {
          var te = c.ownerDocument;
          te ? z = te.defaultView || te.parentWindow : z = window;
        }
        var J, he;
        if (M) {
          var ge = o.relatedTarget || o.toElement;
          if (J = l, he = ge ? Yc(ge) : null, he !== null) {
            var we = Ba(he);
            (he !== we || he.tag !== D && he.tag !== _) && (he = null);
          }
        } else
          J = null, he = l;
        if (J !== he) {
          var lt = dv, Nt = "onMouseLeave", Mt = "onMouseEnter", yn = "mouse";
          (n === "pointerout" || n === "pointerover") && (lt = Km, Nt = "onPointerLeave", Mt = "onPointerEnter", yn = "pointer");
          var dn = J == null ? z : kd(J), ue = he == null ? z : kd(he), Ce = new lt(Nt, yn + "leave", J, o, c);
          Ce.target = dn, Ce.relatedTarget = ue;
          var ce = null, qe = Yc(c);
          if (qe === l) {
            var pt = new lt(Mt, yn + "enter", he, o, c);
            pt.target = ue, pt.relatedTarget = dn, ce = pt;
          }
          zT(e, Ce, ce, J, he);
        }
      }
    }
    function pe(e, n) {
      return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
    }
    var je = typeof Object.is == "function" ? Object.is : pe;
    function xt(e, n) {
      if (je(e, n))
        return !0;
      if (typeof e != "object" || e === null || typeof n != "object" || n === null)
        return !1;
      var l = Object.keys(e), o = Object.keys(n);
      if (l.length !== o.length)
        return !1;
      for (var c = 0; c < l.length; c++) {
        var h = l[c];
        if (!Le.call(n, h) || !je(e[h], n[h]))
          return !1;
      }
      return !0;
    }
    function Ut(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Ft(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Bt(e, n) {
      for (var l = Ut(e), o = 0, c = 0; l; ) {
        if (l.nodeType === Ol) {
          if (c = o + l.textContent.length, o <= n && c >= n)
            return {
              node: l,
              offset: n - o
            };
          o = c;
        }
        l = Ut(Ft(l));
      }
    }
    function Fr(e) {
      var n = e.ownerDocument, l = n && n.defaultView || window, o = l.getSelection && l.getSelection();
      if (!o || o.rangeCount === 0)
        return null;
      var c = o.anchorNode, h = o.anchorOffset, x = o.focusNode, T = o.focusOffset;
      try {
        c.nodeType, x.nodeType;
      } catch {
        return null;
      }
      return Rn(e, c, h, x, T);
    }
    function Rn(e, n, l, o, c) {
      var h = 0, x = -1, T = -1, M = 0, N = 0, z = e, te = null;
      e: for (; ; ) {
        for (var J = null; z === n && (l === 0 || z.nodeType === Ol) && (x = h + l), z === o && (c === 0 || z.nodeType === Ol) && (T = h + c), z.nodeType === Ol && (h += z.nodeValue.length), (J = z.firstChild) !== null; )
          te = z, z = J;
        for (; ; ) {
          if (z === e)
            break e;
          if (te === n && ++M === l && (x = h), te === o && ++N === c && (T = h), (J = z.nextSibling) !== null)
            break;
          z = te, te = z.parentNode;
        }
        z = J;
      }
      return x === -1 || T === -1 ? null : {
        start: x,
        end: T
      };
    }
    function Oo(e, n) {
      var l = e.ownerDocument || document, o = l && l.defaultView || window;
      if (o.getSelection) {
        var c = o.getSelection(), h = e.textContent.length, x = Math.min(n.start, h), T = n.end === void 0 ? x : Math.min(n.end, h);
        if (!c.extend && x > T) {
          var M = T;
          T = x, x = M;
        }
        var N = Bt(e, x), z = Bt(e, T);
        if (N && z) {
          if (c.rangeCount === 1 && c.anchorNode === N.node && c.anchorOffset === N.offset && c.focusNode === z.node && c.focusOffset === z.offset)
            return;
          var te = l.createRange();
          te.setStart(N.node, N.offset), c.removeAllRanges(), x > T ? (c.addRange(te), c.extend(z.node, z.offset)) : (te.setEnd(z.node, z.offset), c.addRange(te));
        }
      }
    }
    function iy(e) {
      return e && e.nodeType === Ol;
    }
    function F3(e, n) {
      return !e || !n ? !1 : e === n ? !0 : iy(e) ? !1 : iy(n) ? F3(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1;
    }
    function yT(e) {
      return e && e.ownerDocument && F3(e.ownerDocument.documentElement, e);
    }
    function gT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function P3() {
      for (var e = window, n = si(); n instanceof e.HTMLIFrameElement; ) {
        if (gT(n))
          e = n.contentWindow;
        else
          return n;
        n = si(e.document);
      }
      return n;
    }
    function W1(e) {
      var n = e && e.nodeName && e.nodeName.toLowerCase();
      return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
    }
    function ST() {
      var e = P3();
      return {
        focusedElem: e,
        selectionRange: W1(e) ? ET(e) : null
      };
    }
    function xT(e) {
      var n = P3(), l = e.focusedElem, o = e.selectionRange;
      if (n !== l && yT(l)) {
        o !== null && W1(l) && wT(l, o);
        for (var c = [], h = l; h = h.parentNode; )
          h.nodeType === Da && c.push({
            element: h,
            left: h.scrollLeft,
            top: h.scrollTop
          });
        typeof l.focus == "function" && l.focus();
        for (var x = 0; x < c.length; x++) {
          var T = c[x];
          T.element.scrollLeft = T.left, T.element.scrollTop = T.top;
        }
      }
    }
    function ET(e) {
      var n;
      return "selectionStart" in e ? n = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : n = Fr(e), n || {
        start: 0,
        end: 0
      };
    }
    function wT(e, n) {
      var l = n.start, o = n.end;
      o === void 0 && (o = l), "selectionStart" in e ? (e.selectionStart = l, e.selectionEnd = Math.min(o, e.value.length)) : Oo(e, n);
    }
    var CT = vt && "documentMode" in document && document.documentMode <= 11;
    function bT() {
      Fe("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Td = null, B1 = null, wv = null, G1 = !1;
    function TT(e) {
      if ("selectionStart" in e && W1(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var n = e.ownerDocument && e.ownerDocument.defaultView || window, l = n.getSelection();
      return {
        anchorNode: l.anchorNode,
        anchorOffset: l.anchorOffset,
        focusNode: l.focusNode,
        focusOffset: l.focusOffset
      };
    }
    function RT(e) {
      return e.window === e ? e.document : e.nodeType === Al ? e : e.ownerDocument;
    }
    function $3(e, n, l) {
      var o = RT(l);
      if (!(G1 || Td == null || Td !== si(o))) {
        var c = TT(Td);
        if (!wv || !xt(wv, c)) {
          wv = c;
          var h = uy(B1, "onSelect");
          if (h.length > 0) {
            var x = new vl("onSelect", "select", null, n, l);
            e.push({
              event: x,
              listeners: h
            }), x.target = Td;
          }
        }
      }
    }
    function MT(e, n, l, o, c, h, x) {
      var T = l ? kd(l) : window;
      switch (n) {
        // Track the input node that has focus.
        case "focusin":
          (Hc(T) || T.contentEditable === "true") && (Td = T, B1 = l, wv = null);
          break;
        case "focusout":
          Td = null, B1 = null, wv = null;
          break;
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case "mousedown":
          G1 = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          G1 = !1, $3(e, o, c);
          break;
        // Chrome and IE fire non-standard event when selection is changed (and
        // sometimes when it hasn't). IE's event fires out of order with respect
        // to key and input events on deletion, so we discard it.
        //
        // Firefox doesn't support selectionchange, so check selection status
        // after each key entry. The selection changes after keydown and before
        // keyup, but we check on keydown as well in the case of holding down a
        // key, when multiple keydown events are fired but only one keyup is.
        // This is also our approach for IE handling, for the reason above.
        case "selectionchange":
          if (CT)
            break;
        // falls through
        case "keydown":
        case "keyup":
          $3(e, o, c);
      }
    }
    function ly(e, n) {
      var l = {};
      return l[e.toLowerCase()] = n.toLowerCase(), l["Webkit" + e] = "webkit" + n, l["Moz" + e] = "moz" + n, l;
    }
    var Rd = {
      animationend: ly("Animation", "AnimationEnd"),
      animationiteration: ly("Animation", "AnimationIteration"),
      animationstart: ly("Animation", "AnimationStart"),
      transitionend: ly("Transition", "TransitionEnd")
    }, Q1 = {}, H3 = {};
    vt && (H3 = document.createElement("div").style, "AnimationEvent" in window || (delete Rd.animationend.animation, delete Rd.animationiteration.animation, delete Rd.animationstart.animation), "TransitionEvent" in window || delete Rd.transitionend.transition);
    function oy(e) {
      if (Q1[e])
        return Q1[e];
      if (!Rd[e])
        return e;
      var n = Rd[e];
      for (var l in n)
        if (n.hasOwnProperty(l) && l in H3)
          return Q1[e] = n[l];
      return e;
    }
    var V3 = oy("animationend"), I3 = oy("animationiteration"), q3 = oy("animationstart"), Y3 = oy("transitionend"), W3 = /* @__PURE__ */ new Map(), B3 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function yu(e, n) {
      W3.set(e, n), Fe(n, [e]);
    }
    function _T() {
      for (var e = 0; e < B3.length; e++) {
        var n = B3[e], l = n.toLowerCase(), o = n[0].toUpperCase() + n.slice(1);
        yu(l, "on" + o);
      }
      yu(V3, "onAnimationEnd"), yu(I3, "onAnimationIteration"), yu(q3, "onAnimationStart"), yu("dblclick", "onDoubleClick"), yu("focusin", "onFocus"), yu("focusout", "onBlur"), yu(Y3, "onTransitionEnd");
    }
    function DT(e, n, l, o, c, h, x) {
      var T = W3.get(n);
      if (T !== void 0) {
        var M = vl, N = n;
        switch (n) {
          case "keypress":
            if (Mo(o) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            M = Xm;
            break;
          case "focusin":
            N = "focus", M = Hl;
            break;
          case "focusout":
            N = "blur", M = Hl;
            break;
          case "beforeblur":
          case "afterblur":
            M = Hl;
            break;
          case "click":
            if (o.button === 2)
              return;
          /* falls through */
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          // TODO: Disabled elements should not respond to mouse events
          /* falls through */
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            M = dv;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            M = xs;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            M = Jm;
            break;
          case V3:
          case I3:
          case q3:
            M = Ym;
            break;
          case Y3:
            M = gi;
            break;
          case "scroll":
            M = Pa;
            break;
          case "wheel":
            M = V1;
            break;
          case "copy":
          case "cut":
          case "paste":
            M = yd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            M = Km;
            break;
        }
        var z = (h & ui) !== 0;
        {
          var te = !z && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          n === "scroll", J = LT(l, T, o.type, z, te);
          if (J.length > 0) {
            var he = new M(T, N, null, o, c);
            e.push({
              event: he,
              listeners: J
            });
          }
        }
      }
    }
    _T(), se(), Vc(), bT(), I1();
    function kT(e, n, l, o, c, h, x) {
      DT(e, n, l, o, c, h);
      var T = (h & zp) === 0;
      T && (ee(e, n, l, o, c), pr(e, n, l, o, c), MT(e, n, l, o, c), ry(e, n, l, o, c));
    }
    var Cv = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], X1 = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Cv));
    function G3(e, n, l) {
      var o = e.type || "unknown-event";
      e.currentTarget = l, al(o, n, void 0, e), e.currentTarget = null;
    }
    function OT(e, n, l) {
      var o;
      if (l)
        for (var c = n.length - 1; c >= 0; c--) {
          var h = n[c], x = h.instance, T = h.currentTarget, M = h.listener;
          if (x !== o && e.isPropagationStopped())
            return;
          G3(e, M, T), o = x;
        }
      else
        for (var N = 0; N < n.length; N++) {
          var z = n[N], te = z.instance, J = z.currentTarget, he = z.listener;
          if (te !== o && e.isPropagationStopped())
            return;
          G3(e, he, J), o = te;
        }
    }
    function Q3(e, n) {
      for (var l = (n & ui) !== 0, o = 0; o < e.length; o++) {
        var c = e[o], h = c.event, x = c.listeners;
        OT(h, x, l);
      }
      oc();
    }
    function AT(e, n, l, o, c) {
      var h = Up(l), x = [];
      kT(x, e, o, l, h, n), Q3(x, n);
    }
    function ar(e, n) {
      X1.has(e) || v('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var l = !1, o = sM(n), c = UT(e);
      o.has(c) || (X3(n, e, Tf, l), o.add(c));
    }
    function K1(e, n, l) {
      X1.has(e) && !n && v('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var o = 0;
      n && (o |= ui), X3(l, e, o, n);
    }
    var sy = "_reactListening" + Math.random().toString(36).slice(2);
    function bv(e) {
      if (!e[sy]) {
        e[sy] = !0, _e.forEach(function(l) {
          l !== "selectionchange" && (X1.has(l) || K1(l, !1, e), K1(l, !0, e));
        });
        var n = e.nodeType === Al ? e : e.ownerDocument;
        n !== null && (n[sy] || (n[sy] = !0, K1("selectionchange", !1, n)));
      }
    }
    function X3(e, n, l, o, c) {
      var h = Yr(e, n, l), x = void 0;
      lc && (n === "touchstart" || n === "touchmove" || n === "wheel") && (x = !0), e = e, o ? x !== void 0 ? fv(e, n, h, x) : Fa(e, n, h) : x !== void 0 ? pu(e, n, h, x) : Uc(e, n, h);
    }
    function K3(e, n) {
      return e === n || e.nodeType === yr && e.parentNode === n;
    }
    function Z1(e, n, l, o, c) {
      var h = o;
      if ((n & Np) === 0 && (n & Tf) === 0) {
        var x = c;
        if (o !== null) {
          var T = o;
          e: for (; ; ) {
            if (T === null)
              return;
            var M = T.tag;
            if (M === b || M === R) {
              var N = T.stateNode.containerInfo;
              if (K3(N, x))
                break;
              if (M === R)
                for (var z = T.return; z !== null; ) {
                  var te = z.tag;
                  if (te === b || te === R) {
                    var J = z.stateNode.containerInfo;
                    if (K3(J, x))
                      return;
                  }
                  z = z.return;
                }
              for (; N !== null; ) {
                var he = Yc(N);
                if (he === null)
                  return;
                var ge = he.tag;
                if (ge === D || ge === _) {
                  T = h = he;
                  continue e;
                }
                N = N.parentNode;
              }
            }
            T = T.return;
          }
        }
      }
      mm(function() {
        return AT(e, n, l, h);
      });
    }
    function Tv(e, n, l) {
      return {
        instance: e,
        listener: n,
        currentTarget: l
      };
    }
    function LT(e, n, l, o, c, h) {
      for (var x = n !== null ? n + "Capture" : null, T = o ? x : n, M = [], N = e, z = null; N !== null; ) {
        var te = N, J = te.stateNode, he = te.tag;
        if (he === D && J !== null && (z = J, T !== null)) {
          var ge = vo(N, T);
          ge != null && M.push(Tv(N, ge, z));
        }
        if (c)
          break;
        N = N.return;
      }
      return M;
    }
    function uy(e, n) {
      for (var l = n + "Capture", o = [], c = e; c !== null; ) {
        var h = c, x = h.stateNode, T = h.tag;
        if (T === D && x !== null) {
          var M = x, N = vo(c, l);
          N != null && o.unshift(Tv(c, N, M));
          var z = vo(c, n);
          z != null && o.push(Tv(c, z, M));
        }
        c = c.return;
      }
      return o;
    }
    function Md(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== D);
      return e || null;
    }
    function NT(e, n) {
      for (var l = e, o = n, c = 0, h = l; h; h = Md(h))
        c++;
      for (var x = 0, T = o; T; T = Md(T))
        x++;
      for (; c - x > 0; )
        l = Md(l), c--;
      for (; x - c > 0; )
        o = Md(o), x--;
      for (var M = c; M--; ) {
        if (l === o || o !== null && l === o.alternate)
          return l;
        l = Md(l), o = Md(o);
      }
      return null;
    }
    function Z3(e, n, l, o, c) {
      for (var h = n._reactName, x = [], T = l; T !== null && T !== o; ) {
        var M = T, N = M.alternate, z = M.stateNode, te = M.tag;
        if (N !== null && N === o)
          break;
        if (te === D && z !== null) {
          var J = z;
          if (c) {
            var he = vo(T, h);
            he != null && x.unshift(Tv(T, he, J));
          } else if (!c) {
            var ge = vo(T, h);
            ge != null && x.push(Tv(T, ge, J));
          }
        }
        T = T.return;
      }
      x.length !== 0 && e.push({
        event: n,
        listeners: x
      });
    }
    function zT(e, n, l, o, c) {
      var h = o && c ? NT(o, c) : null;
      o !== null && Z3(e, n, o, h, !1), c !== null && l !== null && Z3(e, l, c, h, !0);
    }
    function UT(e, n) {
      return e + "__bubble";
    }
    var Si = !1, Rv = "dangerouslySetInnerHTML", cy = "suppressContentEditableWarning", gu = "suppressHydrationWarning", J3 = "autoFocus", Ic = "children", qc = "style", fy = "__html", J1, dy, Mv, ex, py, tx, nx;
    J1 = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, dy = function(e, n) {
      Op(e, n), Cf(e, n), pm(e, n, {
        registrationNameDependencies: Ve,
        possibleRegistrationNames: Be
      });
    }, tx = vt && !document.documentMode, Mv = function(e, n, l) {
      if (!Si) {
        var o = vy(l), c = vy(n);
        c !== o && (Si = !0, v("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(c), JSON.stringify(o)));
      }
    }, ex = function(e) {
      if (!Si) {
        Si = !0;
        var n = [];
        e.forEach(function(l) {
          n.push(l);
        }), v("Extra attributes from the server: %s", n);
      }
    }, py = function(e, n) {
      n === !1 ? v("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : v("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof n);
    }, nx = function(e, n) {
      var l = e.namespaceURI === kl ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return l.innerHTML = n, l.innerHTML;
    };
    var jT = /\r\n?/g, FT = /\u0000|\uFFFD/g;
    function vy(e) {
      Te(e);
      var n = typeof e == "string" ? e : "" + e;
      return n.replace(jT, `
`).replace(FT, "");
    }
    function hy(e, n, l, o) {
      var c = vy(n), h = vy(e);
      if (h !== c && (o && (Si || (Si = !0, v('Text content did not match. Server: "%s" Client: "%s"', h, c))), l && oe))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function rx(e) {
      return e.nodeType === Al ? e : e.ownerDocument;
    }
    function PT() {
    }
    function my(e) {
      e.onclick = PT;
    }
    function $T(e, n, l, o, c) {
      for (var h in o)
        if (o.hasOwnProperty(h)) {
          var x = o[h];
          if (h === qc)
            x && Object.freeze(x), om(n, x);
          else if (h === Rv) {
            var T = x ? x[fy] : void 0;
            T != null && Qh(n, T);
          } else if (h === Ic)
            if (typeof x == "string") {
              var M = e !== "textarea" || x !== "";
              M && Qs(n, x);
            } else typeof x == "number" && Qs(n, "" + x);
          else h === cy || h === gu || h === J3 || (Ve.hasOwnProperty(h) ? x != null && (typeof x != "function" && py(h, x), h === "onScroll" && ar("scroll", n)) : x != null && Rr(n, h, x, c));
        }
    }
    function HT(e, n, l, o) {
      for (var c = 0; c < n.length; c += 2) {
        var h = n[c], x = n[c + 1];
        h === qc ? om(e, x) : h === Rv ? Qh(e, x) : h === Ic ? Qs(e, x) : Rr(e, h, x, o);
      }
    }
    function VT(e, n, l, o) {
      var c, h = rx(l), x, T = o;
      if (T === kl && (T = bp(e)), T === kl) {
        if (c = fo(e, n), !c && e !== e.toLowerCase() && v("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var M = h.createElement("div");
          M.innerHTML = "<script><\/script>";
          var N = M.firstChild;
          x = M.removeChild(N);
        } else if (typeof n.is == "string")
          x = h.createElement(e, {
            is: n.is
          });
        else if (x = h.createElement(e), e === "select") {
          var z = x;
          n.multiple ? z.multiple = !0 : n.size && (z.size = n.size);
        }
      } else
        x = h.createElementNS(T, e);
      return T === kl && !c && Object.prototype.toString.call(x) === "[object HTMLUnknownElement]" && !Le.call(J1, e) && (J1[e] = !0, v("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), x;
    }
    function IT(e, n) {
      return rx(n).createTextNode(e);
    }
    function qT(e, n, l, o) {
      var c = fo(n, l);
      dy(n, l);
      var h;
      switch (n) {
        case "dialog":
          ar("cancel", e), ar("close", e), h = l;
          break;
        case "iframe":
        case "object":
        case "embed":
          ar("load", e), h = l;
          break;
        case "video":
        case "audio":
          for (var x = 0; x < Cv.length; x++)
            ar(Cv[x], e);
          h = l;
          break;
        case "source":
          ar("error", e), h = l;
          break;
        case "img":
        case "image":
        case "link":
          ar("error", e), ar("load", e), h = l;
          break;
        case "details":
          ar("toggle", e), h = l;
          break;
        case "input":
          Ni(e, l), h = Gs(e, l), ar("invalid", e);
          break;
        case "option":
          xn(e, l), h = l;
          break;
        case "select":
          Xo(e, l), h = Ku(e, l), ar("invalid", e);
          break;
        case "textarea":
          Ep(e, l), h = xp(e, l), ar("invalid", e);
          break;
        default:
          h = l;
      }
      switch (Ef(n, h), $T(n, e, o, h, c), n) {
        case "input":
          Li(e), me(e, l, !1);
          break;
        case "textarea":
          Li(e), Bh(e);
          break;
        case "option":
          $n(e, l);
          break;
        case "select":
          gp(e, l);
          break;
        default:
          typeof h.onClick == "function" && my(e);
          break;
      }
    }
    function YT(e, n, l, o, c) {
      dy(n, o);
      var h = null, x, T;
      switch (n) {
        case "input":
          x = Gs(e, l), T = Gs(e, o), h = [];
          break;
        case "select":
          x = Ku(e, l), T = Ku(e, o), h = [];
          break;
        case "textarea":
          x = xp(e, l), T = xp(e, o), h = [];
          break;
        default:
          x = l, T = o, typeof x.onClick != "function" && typeof T.onClick == "function" && my(e);
          break;
      }
      Ef(n, T);
      var M, N, z = null;
      for (M in x)
        if (!(T.hasOwnProperty(M) || !x.hasOwnProperty(M) || x[M] == null))
          if (M === qc) {
            var te = x[M];
            for (N in te)
              te.hasOwnProperty(N) && (z || (z = {}), z[N] = "");
          } else M === Rv || M === Ic || M === cy || M === gu || M === J3 || (Ve.hasOwnProperty(M) ? h || (h = []) : (h = h || []).push(M, null));
      for (M in T) {
        var J = T[M], he = x?.[M];
        if (!(!T.hasOwnProperty(M) || J === he || J == null && he == null))
          if (M === qc)
            if (J && Object.freeze(J), he) {
              for (N in he)
                he.hasOwnProperty(N) && (!J || !J.hasOwnProperty(N)) && (z || (z = {}), z[N] = "");
              for (N in J)
                J.hasOwnProperty(N) && he[N] !== J[N] && (z || (z = {}), z[N] = J[N]);
            } else
              z || (h || (h = []), h.push(M, z)), z = J;
          else if (M === Rv) {
            var ge = J ? J[fy] : void 0, we = he ? he[fy] : void 0;
            ge != null && we !== ge && (h = h || []).push(M, ge);
          } else M === Ic ? (typeof J == "string" || typeof J == "number") && (h = h || []).push(M, "" + J) : M === cy || M === gu || (Ve.hasOwnProperty(M) ? (J != null && (typeof J != "function" && py(M, J), M === "onScroll" && ar("scroll", e)), !h && he !== J && (h = [])) : (h = h || []).push(M, J));
      }
      return z && (R1(z, T[qc]), (h = h || []).push(qc, z)), h;
    }
    function WT(e, n, l, o, c) {
      l === "input" && c.type === "radio" && c.name != null && k(e, c);
      var h = fo(l, o), x = fo(l, c);
      switch (HT(e, n, h, x), l) {
        case "input":
          W(e, c);
          break;
        case "textarea":
          Wh(e, c);
          break;
        case "select":
          gf(e, c);
          break;
      }
    }
    function BT(e) {
      {
        var n = e.toLowerCase();
        return nc.hasOwnProperty(n) && nc[n] || null;
      }
    }
    function GT(e, n, l, o, c, h, x) {
      var T, M;
      switch (T = fo(n, l), dy(n, l), n) {
        case "dialog":
          ar("cancel", e), ar("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          ar("load", e);
          break;
        case "video":
        case "audio":
          for (var N = 0; N < Cv.length; N++)
            ar(Cv[N], e);
          break;
        case "source":
          ar("error", e);
          break;
        case "img":
        case "image":
        case "link":
          ar("error", e), ar("load", e);
          break;
        case "details":
          ar("toggle", e);
          break;
        case "input":
          Ni(e, l), ar("invalid", e);
          break;
        case "option":
          xn(e, l);
          break;
        case "select":
          Xo(e, l), ar("invalid", e);
          break;
        case "textarea":
          Ep(e, l), ar("invalid", e);
          break;
      }
      Ef(n, l);
      {
        M = /* @__PURE__ */ new Set();
        for (var z = e.attributes, te = 0; te < z.length; te++) {
          var J = z[te].name.toLowerCase();
          switch (J) {
            // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              M.add(z[te].name);
          }
        }
      }
      var he = null;
      for (var ge in l)
        if (l.hasOwnProperty(ge)) {
          var we = l[ge];
          if (ge === Ic)
            typeof we == "string" ? e.textContent !== we && (l[gu] !== !0 && hy(e.textContent, we, h, x), he = [Ic, we]) : typeof we == "number" && e.textContent !== "" + we && (l[gu] !== !0 && hy(e.textContent, we, h, x), he = [Ic, "" + we]);
          else if (Ve.hasOwnProperty(ge))
            we != null && (typeof we != "function" && py(ge, we), ge === "onScroll" && ar("scroll", e));
          else if (x && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof T == "boolean") {
            var lt = void 0, Nt = gt(ge);
            if (l[gu] !== !0) {
              if (!(ge === cy || ge === gu || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              ge === "value" || ge === "checked" || ge === "selected")) {
                if (ge === Rv) {
                  var Mt = e.innerHTML, yn = we ? we[fy] : void 0;
                  if (yn != null) {
                    var dn = nx(e, yn);
                    dn !== Mt && Mv(ge, Mt, dn);
                  }
                } else if (ge === qc) {
                  if (M.delete(ge), tx) {
                    var ue = b1(we);
                    lt = e.getAttribute("style"), ue !== lt && Mv(ge, lt, ue);
                  }
                } else if (T && !j)
                  M.delete(ge.toLowerCase()), lt = Di(e, ge, we), we !== lt && Mv(ge, lt, we);
                else if (!en(ge, Nt, T) && !Qe(ge, we, Nt, T)) {
                  var Ce = !1;
                  if (Nt !== null)
                    M.delete(Nt.attributeName), lt = Zn(e, ge, we, Nt);
                  else {
                    var ce = o;
                    if (ce === kl && (ce = bp(n)), ce === kl)
                      M.delete(ge.toLowerCase());
                    else {
                      var qe = BT(ge);
                      qe !== null && qe !== ge && (Ce = !0, M.delete(qe)), M.delete(ge);
                    }
                    lt = Di(e, ge, we);
                  }
                  var pt = j;
                  !pt && we !== lt && !Ce && Mv(ge, lt, we);
                }
              }
            }
          }
        }
      switch (x && // $FlowFixMe - Should be inferred as not undefined.
      M.size > 0 && l[gu] !== !0 && ex(M), n) {
        case "input":
          Li(e), me(e, l, !0);
          break;
        case "textarea":
          Li(e), Bh(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof l.onClick == "function" && my(e);
          break;
      }
      return he;
    }
    function QT(e, n, l) {
      var o = e.nodeValue !== n;
      return o;
    }
    function eg(e, n) {
      {
        if (Si)
          return;
        Si = !0, v("Did not expect server HTML to contain a <%s> in <%s>.", n.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function tg(e, n) {
      {
        if (Si)
          return;
        Si = !0, v('Did not expect server HTML to contain the text node "%s" in <%s>.', n.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function ng(e, n, l) {
      {
        if (Si)
          return;
        Si = !0, v("Expected server HTML to contain a matching <%s> in <%s>.", n, e.nodeName.toLowerCase());
      }
    }
    function rg(e, n) {
      {
        if (n === "" || Si)
          return;
        Si = !0, v('Expected server HTML to contain a matching text node for "%s" in <%s>.', n, e.nodeName.toLowerCase());
      }
    }
    function XT(e, n, l) {
      switch (n) {
        case "input":
          Ee(e, l);
          return;
        case "textarea":
          x1(e, l);
          return;
        case "select":
          Sp(e, l);
          return;
      }
    }
    var _v = function() {
    }, Dv = function() {
    };
    {
      var KT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], ax = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], ZT = ax.concat(["button"]), JT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], ix = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      Dv = function(e, n) {
        var l = Qt({}, e || ix), o = {
          tag: n
        };
        return ax.indexOf(n) !== -1 && (l.aTagInScope = null, l.buttonTagInScope = null, l.nobrTagInScope = null), ZT.indexOf(n) !== -1 && (l.pTagInButtonScope = null), KT.indexOf(n) !== -1 && n !== "address" && n !== "div" && n !== "p" && (l.listItemTagAutoclosing = null, l.dlItemTagAutoclosing = null), l.current = o, n === "form" && (l.formTag = o), n === "a" && (l.aTagInScope = o), n === "button" && (l.buttonTagInScope = o), n === "nobr" && (l.nobrTagInScope = o), n === "p" && (l.pTagInButtonScope = o), n === "li" && (l.listItemTagAutoclosing = o), (n === "dd" || n === "dt") && (l.dlItemTagAutoclosing = o), l;
      };
      var eR = function(e, n) {
        switch (n) {
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
          // but
          case "option":
            return e === "#text";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
          // No special behavior since these rules fall back to "in body" mode for
          // all except special table nodes which cause bad parsing behavior anyway.
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
          case "colgroup":
            return e === "col" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return n !== "h1" && n !== "h2" && n !== "h3" && n !== "h4" && n !== "h5" && n !== "h6";
          case "rp":
          case "rt":
            return JT.indexOf(n) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return n == null;
        }
        return !0;
      }, tR = function(e, n) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return n.pTagInButtonScope;
          case "form":
            return n.formTag || n.pTagInButtonScope;
          case "li":
            return n.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return n.dlItemTagAutoclosing;
          case "button":
            return n.buttonTagInScope;
          case "a":
            return n.aTagInScope;
          case "nobr":
            return n.nobrTagInScope;
        }
        return null;
      }, lx = {};
      _v = function(e, n, l) {
        l = l || ix;
        var o = l.current, c = o && o.tag;
        n != null && (e != null && v("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var h = eR(e, c) ? null : o, x = h ? null : tR(e, l), T = h || x;
        if (T) {
          var M = T.tag, N = !!h + "|" + e + "|" + M;
          if (!lx[N]) {
            lx[N] = !0;
            var z = e, te = "";
            if (e === "#text" ? /\S/.test(n) ? z = "Text nodes" : (z = "Whitespace text nodes", te = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : z = "<" + e + ">", h) {
              var J = "";
              M === "table" && e === "tr" && (J += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), v("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", z, M, te, J);
            } else
              v("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", z, M);
          }
        }
      };
    }
    var yy = "suppressHydrationWarning", gy = "$", Sy = "/$", kv = "$?", Ov = "$!", nR = "style", ag = null, ig = null;
    function rR(e) {
      var n, l, o = e.nodeType;
      switch (o) {
        case Al:
        case Rp: {
          n = o === Al ? "#document" : "#fragment";
          var c = e.documentElement;
          l = c ? c.namespaceURI : Tp(null, "");
          break;
        }
        default: {
          var h = o === yr ? e.parentNode : e, x = h.namespaceURI || null;
          n = h.tagName, l = Tp(x, n);
          break;
        }
      }
      {
        var T = n.toLowerCase(), M = Dv(null, T);
        return {
          namespace: l,
          ancestorInfo: M
        };
      }
    }
    function aR(e, n, l) {
      {
        var o = e, c = Tp(o.namespace, n), h = Dv(o.ancestorInfo, n);
        return {
          namespace: c,
          ancestorInfo: h
        };
      }
    }
    function Dz(e) {
      return e;
    }
    function iR(e) {
      ag = Cr(), ig = ST();
      var n = null;
      return Or(!1), n;
    }
    function lR(e) {
      xT(ig), Or(ag), ag = null, ig = null;
    }
    function oR(e, n, l, o, c) {
      var h;
      {
        var x = o;
        if (_v(e, null, x.ancestorInfo), typeof n.children == "string" || typeof n.children == "number") {
          var T = "" + n.children, M = Dv(x.ancestorInfo, e);
          _v(null, T, M);
        }
        h = x.namespace;
      }
      var N = VT(e, n, l, h);
      return Nv(c, N), pg(N, n), N;
    }
    function sR(e, n) {
      e.appendChild(n);
    }
    function uR(e, n, l, o, c) {
      switch (qT(e, n, l, o), n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!l.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function cR(e, n, l, o, c, h) {
      {
        var x = h;
        if (typeof o.children != typeof l.children && (typeof o.children == "string" || typeof o.children == "number")) {
          var T = "" + o.children, M = Dv(x.ancestorInfo, n);
          _v(null, T, M);
        }
      }
      return YT(e, n, l, o);
    }
    function lg(e, n) {
      return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
    }
    function fR(e, n, l, o) {
      {
        var c = l;
        _v(null, e, c.ancestorInfo);
      }
      var h = IT(e, n);
      return Nv(o, h), h;
    }
    function dR() {
      var e = window.event;
      return e === void 0 ? hi : vd(e.type);
    }
    var og = typeof setTimeout == "function" ? setTimeout : void 0, pR = typeof clearTimeout == "function" ? clearTimeout : void 0, sg = -1, ox = typeof Promise == "function" ? Promise : void 0, vR = typeof queueMicrotask == "function" ? queueMicrotask : typeof ox < "u" ? function(e) {
      return ox.resolve(null).then(e).catch(hR);
    } : og;
    function hR(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function mR(e, n, l, o) {
      switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && e.focus();
          return;
        case "img": {
          l.src && (e.src = l.src);
          return;
        }
      }
    }
    function yR(e, n, l, o, c, h) {
      WT(e, n, l, o, c), pg(e, c);
    }
    function sx(e) {
      Qs(e, "");
    }
    function gR(e, n, l) {
      e.nodeValue = l;
    }
    function SR(e, n) {
      e.appendChild(n);
    }
    function xR(e, n) {
      var l;
      e.nodeType === yr ? (l = e.parentNode, l.insertBefore(n, e)) : (l = e, l.appendChild(n));
      var o = e._reactRootContainer;
      o == null && l.onclick === null && my(l);
    }
    function ER(e, n, l) {
      e.insertBefore(n, l);
    }
    function wR(e, n, l) {
      e.nodeType === yr ? e.parentNode.insertBefore(n, l) : e.insertBefore(n, l);
    }
    function CR(e, n) {
      e.removeChild(n);
    }
    function bR(e, n) {
      e.nodeType === yr ? e.parentNode.removeChild(n) : e.removeChild(n);
    }
    function ug(e, n) {
      var l = n, o = 0;
      do {
        var c = l.nextSibling;
        if (e.removeChild(l), c && c.nodeType === yr) {
          var h = c.data;
          if (h === Sy)
            if (o === 0) {
              e.removeChild(c), ys(n);
              return;
            } else
              o--;
          else (h === gy || h === kv || h === Ov) && o++;
        }
        l = c;
      } while (l);
      ys(n);
    }
    function TR(e, n) {
      e.nodeType === yr ? ug(e.parentNode, n) : e.nodeType === Da && ug(e, n), ys(e);
    }
    function RR(e) {
      e = e;
      var n = e.style;
      typeof n.setProperty == "function" ? n.setProperty("display", "none", "important") : n.display = "none";
    }
    function MR(e) {
      e.nodeValue = "";
    }
    function _R(e, n) {
      e = e;
      var l = n[nR], o = l != null && l.hasOwnProperty("display") ? l.display : null;
      e.style.display = xf("display", o);
    }
    function DR(e, n) {
      e.nodeValue = n;
    }
    function kR(e) {
      e.nodeType === Da ? e.textContent = "" : e.nodeType === Al && e.documentElement && e.removeChild(e.documentElement);
    }
    function OR(e, n, l) {
      return e.nodeType !== Da || n.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function AR(e, n) {
      return n === "" || e.nodeType !== Ol ? null : e;
    }
    function LR(e) {
      return e.nodeType !== yr ? null : e;
    }
    function ux(e) {
      return e.data === kv;
    }
    function cg(e) {
      return e.data === Ov;
    }
    function NR(e) {
      var n = e.nextSibling && e.nextSibling.dataset, l, o, c;
      return n && (l = n.dgst, o = n.msg, c = n.stck), {
        message: o,
        digest: l,
        stack: c
      };
    }
    function zR(e, n) {
      e._reactRetry = n;
    }
    function xy(e) {
      for (; e != null; e = e.nextSibling) {
        var n = e.nodeType;
        if (n === Da || n === Ol)
          break;
        if (n === yr) {
          var l = e.data;
          if (l === gy || l === Ov || l === kv)
            break;
          if (l === Sy)
            return null;
        }
      }
      return e;
    }
    function Av(e) {
      return xy(e.nextSibling);
    }
    function UR(e) {
      return xy(e.firstChild);
    }
    function jR(e) {
      return xy(e.firstChild);
    }
    function FR(e) {
      return xy(e.nextSibling);
    }
    function PR(e, n, l, o, c, h, x) {
      Nv(h, e), pg(e, l);
      var T;
      {
        var M = c;
        T = M.namespace;
      }
      var N = (h.mode & ln) !== kt;
      return GT(e, n, l, T, o, N, x);
    }
    function $R(e, n, l, o) {
      return Nv(l, e), l.mode & ln, QT(e, n);
    }
    function HR(e, n) {
      Nv(n, e);
    }
    function VR(e) {
      for (var n = e.nextSibling, l = 0; n; ) {
        if (n.nodeType === yr) {
          var o = n.data;
          if (o === Sy) {
            if (l === 0)
              return Av(n);
            l--;
          } else (o === gy || o === Ov || o === kv) && l++;
        }
        n = n.nextSibling;
      }
      return null;
    }
    function cx(e) {
      for (var n = e.previousSibling, l = 0; n; ) {
        if (n.nodeType === yr) {
          var o = n.data;
          if (o === gy || o === Ov || o === kv) {
            if (l === 0)
              return n;
            l--;
          } else o === Sy && l++;
        }
        n = n.previousSibling;
      }
      return null;
    }
    function IR(e) {
      ys(e);
    }
    function qR(e) {
      ys(e);
    }
    function YR(e) {
      return e !== "head" && e !== "body";
    }
    function WR(e, n, l, o) {
      var c = !0;
      hy(n.nodeValue, l, o, c);
    }
    function BR(e, n, l, o, c, h) {
      if (n[yy] !== !0) {
        var x = !0;
        hy(o.nodeValue, c, h, x);
      }
    }
    function GR(e, n) {
      n.nodeType === Da ? eg(e, n) : n.nodeType === yr || tg(e, n);
    }
    function QR(e, n) {
      {
        var l = e.parentNode;
        l !== null && (n.nodeType === Da ? eg(l, n) : n.nodeType === yr || tg(l, n));
      }
    }
    function XR(e, n, l, o, c) {
      (c || n[yy] !== !0) && (o.nodeType === Da ? eg(l, o) : o.nodeType === yr || tg(l, o));
    }
    function KR(e, n, l) {
      ng(e, n);
    }
    function ZR(e, n) {
      rg(e, n);
    }
    function JR(e, n, l) {
      {
        var o = e.parentNode;
        o !== null && ng(o, n);
      }
    }
    function eM(e, n) {
      {
        var l = e.parentNode;
        l !== null && rg(l, n);
      }
    }
    function tM(e, n, l, o, c, h) {
      (h || n[yy] !== !0) && ng(l, o);
    }
    function nM(e, n, l, o, c) {
      (c || n[yy] !== !0) && rg(l, o);
    }
    function rM(e) {
      v("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function aM(e) {
      bv(e);
    }
    var _d = Math.random().toString(36).slice(2), Dd = "__reactFiber$" + _d, fg = "__reactProps$" + _d, Lv = "__reactContainer$" + _d, dg = "__reactEvents$" + _d, iM = "__reactListeners$" + _d, lM = "__reactHandles$" + _d;
    function oM(e) {
      delete e[Dd], delete e[fg], delete e[dg], delete e[iM], delete e[lM];
    }
    function Nv(e, n) {
      n[Dd] = e;
    }
    function Ey(e, n) {
      n[Lv] = e;
    }
    function fx(e) {
      e[Lv] = null;
    }
    function zv(e) {
      return !!e[Lv];
    }
    function Yc(e) {
      var n = e[Dd];
      if (n)
        return n;
      for (var l = e.parentNode; l; ) {
        if (n = l[Lv] || l[Dd], n) {
          var o = n.alternate;
          if (n.child !== null || o !== null && o.child !== null)
            for (var c = cx(e); c !== null; ) {
              var h = c[Dd];
              if (h)
                return h;
              c = cx(c);
            }
          return n;
        }
        e = l, l = e.parentNode;
      }
      return null;
    }
    function Su(e) {
      var n = e[Dd] || e[Lv];
      return n && (n.tag === D || n.tag === _ || n.tag === H || n.tag === b) ? n : null;
    }
    function kd(e) {
      if (e.tag === D || e.tag === _)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function wy(e) {
      return e[fg] || null;
    }
    function pg(e, n) {
      e[fg] = n;
    }
    function sM(e) {
      var n = e[dg];
      return n === void 0 && (n = e[dg] = /* @__PURE__ */ new Set()), n;
    }
    var dx = {}, px = s.ReactDebugCurrentFrame;
    function Cy(e) {
      if (e) {
        var n = e._owner, l = Ml(e.type, e._source, n ? n.type : null);
        px.setExtraStackFrame(l);
      } else
        px.setExtraStackFrame(null);
    }
    function Il(e, n, l, o, c) {
      {
        var h = Function.call.bind(Le);
        for (var x in e)
          if (h(e, x)) {
            var T = void 0;
            try {
              if (typeof e[x] != "function") {
                var M = Error((o || "React class") + ": " + l + " type `" + x + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[x] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw M.name = "Invariant Violation", M;
              }
              T = e[x](n, x, o, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (N) {
              T = N;
            }
            T && !(T instanceof Error) && (Cy(c), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", l, x, typeof T), Cy(null)), T instanceof Error && !(T.message in dx) && (dx[T.message] = !0, Cy(c), v("Failed %s type: %s", l, T.message), Cy(null));
          }
      }
    }
    var vg = [], by;
    by = [];
    var Cs = -1;
    function xu(e) {
      return {
        current: e
      };
    }
    function $a(e, n) {
      if (Cs < 0) {
        v("Unexpected pop.");
        return;
      }
      n !== by[Cs] && v("Unexpected Fiber popped."), e.current = vg[Cs], vg[Cs] = null, by[Cs] = null, Cs--;
    }
    function Ha(e, n, l) {
      Cs++, vg[Cs] = e.current, by[Cs] = l, e.current = n;
    }
    var hg;
    hg = {};
    var Hi = {};
    Object.freeze(Hi);
    var bs = xu(Hi), Ao = xu(!1), mg = Hi;
    function Od(e, n, l) {
      return l && Lo(n) ? mg : bs.current;
    }
    function vx(e, n, l) {
      {
        var o = e.stateNode;
        o.__reactInternalMemoizedUnmaskedChildContext = n, o.__reactInternalMemoizedMaskedChildContext = l;
      }
    }
    function Ad(e, n) {
      {
        var l = e.type, o = l.contextTypes;
        if (!o)
          return Hi;
        var c = e.stateNode;
        if (c && c.__reactInternalMemoizedUnmaskedChildContext === n)
          return c.__reactInternalMemoizedMaskedChildContext;
        var h = {};
        for (var x in o)
          h[x] = n[x];
        {
          var T = Gt(e) || "Unknown";
          Il(o, h, "context", T);
        }
        return c && vx(e, n, h), h;
      }
    }
    function Ty() {
      return Ao.current;
    }
    function Lo(e) {
      {
        var n = e.childContextTypes;
        return n != null;
      }
    }
    function Ry(e) {
      $a(Ao, e), $a(bs, e);
    }
    function yg(e) {
      $a(Ao, e), $a(bs, e);
    }
    function hx(e, n, l) {
      {
        if (bs.current !== Hi)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        Ha(bs, n, e), Ha(Ao, l, e);
      }
    }
    function mx(e, n, l) {
      {
        var o = e.stateNode, c = n.childContextTypes;
        if (typeof o.getChildContext != "function") {
          {
            var h = Gt(e) || "Unknown";
            hg[h] || (hg[h] = !0, v("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", h, h));
          }
          return l;
        }
        var x = o.getChildContext();
        for (var T in x)
          if (!(T in c))
            throw new Error((Gt(e) || "Unknown") + '.getChildContext(): key "' + T + '" is not defined in childContextTypes.');
        {
          var M = Gt(e) || "Unknown";
          Il(c, x, "child context", M);
        }
        return Qt({}, l, x);
      }
    }
    function My(e) {
      {
        var n = e.stateNode, l = n && n.__reactInternalMemoizedMergedChildContext || Hi;
        return mg = bs.current, Ha(bs, l, e), Ha(Ao, Ao.current, e), !0;
      }
    }
    function yx(e, n, l) {
      {
        var o = e.stateNode;
        if (!o)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (l) {
          var c = mx(e, n, mg);
          o.__reactInternalMemoizedMergedChildContext = c, $a(Ao, e), $a(bs, e), Ha(bs, c, e), Ha(Ao, l, e);
        } else
          $a(Ao, e), Ha(Ao, l, e);
      }
    }
    function uM(e) {
      {
        if (!rs(e) || e.tag !== E)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var n = e;
        do {
          switch (n.tag) {
            case b:
              return n.stateNode.context;
            case E: {
              var l = n.type;
              if (Lo(l))
                return n.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          n = n.return;
        } while (n !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Eu = 0, _y = 1, Ts = null, gg = !1, Sg = !1;
    function gx(e) {
      Ts === null ? Ts = [e] : Ts.push(e);
    }
    function cM(e) {
      gg = !0, gx(e);
    }
    function Sx() {
      gg && wu();
    }
    function wu() {
      if (!Sg && Ts !== null) {
        Sg = !0;
        var e = 0, n = yi();
        try {
          var l = !0, o = Ts;
          for (wr(pa); e < o.length; e++) {
            var c = o[e];
            do
              c = c(l);
            while (c !== null);
          }
          Ts = null, gg = !1;
        } catch (h) {
          throw Ts !== null && (Ts = Ts.slice(e + 1)), Fp(cc, wu), h;
        } finally {
          wr(n), Sg = !1;
        }
      }
      return null;
    }
    var Ld = [], Nd = 0, Dy = null, ky = 0, hl = [], ml = 0, Wc = null, Rs = 1, Ms = "";
    function fM(e) {
      return Gc(), (e.flags & il) !== Dt;
    }
    function dM(e) {
      return Gc(), ky;
    }
    function pM() {
      var e = Ms, n = Rs, l = n & ~vM(n);
      return l.toString(32) + e;
    }
    function Bc(e, n) {
      Gc(), Ld[Nd++] = ky, Ld[Nd++] = Dy, Dy = e, ky = n;
    }
    function xx(e, n, l) {
      Gc(), hl[ml++] = Rs, hl[ml++] = Ms, hl[ml++] = Wc, Wc = e;
      var o = Rs, c = Ms, h = Oy(o) - 1, x = o & ~(1 << h), T = l + 1, M = Oy(n) + h;
      if (M > 30) {
        var N = h - h % 5, z = (1 << N) - 1, te = (x & z).toString(32), J = x >> N, he = h - N, ge = Oy(n) + he, we = T << he, lt = we | J, Nt = te + c;
        Rs = 1 << ge | lt, Ms = Nt;
      } else {
        var Mt = T << h, yn = Mt | x, dn = c;
        Rs = 1 << M | yn, Ms = dn;
      }
    }
    function xg(e) {
      Gc();
      var n = e.return;
      if (n !== null) {
        var l = 1, o = 0;
        Bc(e, l), xx(e, l, o);
      }
    }
    function Oy(e) {
      return 32 - xr(e);
    }
    function vM(e) {
      return 1 << Oy(e) - 1;
    }
    function Eg(e) {
      for (; e === Dy; )
        Dy = Ld[--Nd], Ld[Nd] = null, ky = Ld[--Nd], Ld[Nd] = null;
      for (; e === Wc; )
        Wc = hl[--ml], hl[ml] = null, Ms = hl[--ml], hl[ml] = null, Rs = hl[--ml], hl[ml] = null;
    }
    function hM() {
      return Gc(), Wc !== null ? {
        id: Rs,
        overflow: Ms
      } : null;
    }
    function mM(e, n) {
      Gc(), hl[ml++] = Rs, hl[ml++] = Ms, hl[ml++] = Wc, Rs = n.id, Ms = n.overflow, Wc = e;
    }
    function Gc() {
      ga() || v("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var ya = null, yl = null, ql = !1, Qc = !1, Cu = null;
    function yM() {
      ql && v("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function Ex() {
      Qc = !0;
    }
    function gM() {
      return Qc;
    }
    function SM(e) {
      var n = e.stateNode.containerInfo;
      return yl = jR(n), ya = e, ql = !0, Cu = null, Qc = !1, !0;
    }
    function xM(e, n, l) {
      return yl = FR(n), ya = e, ql = !0, Cu = null, Qc = !1, l !== null && mM(e, l), !0;
    }
    function wx(e, n) {
      switch (e.tag) {
        case b: {
          GR(e.stateNode.containerInfo, n);
          break;
        }
        case D: {
          var l = (e.mode & ln) !== kt;
          XR(
            e.type,
            e.memoizedProps,
            e.stateNode,
            n,
            // TODO: Delete this argument when we remove the legacy root API.
            l
          );
          break;
        }
        case H: {
          var o = e.memoizedState;
          o.dehydrated !== null && QR(o.dehydrated, n);
          break;
        }
      }
    }
    function Cx(e, n) {
      wx(e, n);
      var l = bk();
      l.stateNode = n, l.return = e;
      var o = e.deletions;
      o === null ? (e.deletions = [l], e.flags |= ci) : o.push(l);
    }
    function wg(e, n) {
      {
        if (Qc)
          return;
        switch (e.tag) {
          case b: {
            var l = e.stateNode.containerInfo;
            switch (n.tag) {
              case D:
                var o = n.type;
                n.pendingProps, KR(l, o);
                break;
              case _:
                var c = n.pendingProps;
                ZR(l, c);
                break;
            }
            break;
          }
          case D: {
            var h = e.type, x = e.memoizedProps, T = e.stateNode;
            switch (n.tag) {
              case D: {
                var M = n.type, N = n.pendingProps, z = (e.mode & ln) !== kt;
                tM(
                  h,
                  x,
                  T,
                  M,
                  N,
                  // TODO: Delete this argument when we remove the legacy root API.
                  z
                );
                break;
              }
              case _: {
                var te = n.pendingProps, J = (e.mode & ln) !== kt;
                nM(
                  h,
                  x,
                  T,
                  te,
                  // TODO: Delete this argument when we remove the legacy root API.
                  J
                );
                break;
              }
            }
            break;
          }
          case H: {
            var he = e.memoizedState, ge = he.dehydrated;
            if (ge !== null) switch (n.tag) {
              case D:
                var we = n.type;
                n.pendingProps, JR(ge, we);
                break;
              case _:
                var lt = n.pendingProps;
                eM(ge, lt);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function bx(e, n) {
      n.flags = n.flags & ~Oa | tr, wg(e, n);
    }
    function Tx(e, n) {
      switch (e.tag) {
        case D: {
          var l = e.type;
          e.pendingProps;
          var o = OR(n, l);
          return o !== null ? (e.stateNode = o, ya = e, yl = UR(o), !0) : !1;
        }
        case _: {
          var c = e.pendingProps, h = AR(n, c);
          return h !== null ? (e.stateNode = h, ya = e, yl = null, !0) : !1;
        }
        case H: {
          var x = LR(n);
          if (x !== null) {
            var T = {
              dehydrated: x,
              treeContext: hM(),
              retryLane: za
            };
            e.memoizedState = T;
            var M = Tk(x);
            return M.return = e, e.child = M, ya = e, yl = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function Cg(e) {
      return (e.mode & ln) !== kt && (e.flags & _t) === Dt;
    }
    function bg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function Tg(e) {
      if (ql) {
        var n = yl;
        if (!n) {
          Cg(e) && (wg(ya, e), bg()), bx(ya, e), ql = !1, ya = e;
          return;
        }
        var l = n;
        if (!Tx(e, n)) {
          Cg(e) && (wg(ya, e), bg()), n = Av(l);
          var o = ya;
          if (!n || !Tx(e, n)) {
            bx(ya, e), ql = !1, ya = e;
            return;
          }
          Cx(o, l);
        }
      }
    }
    function EM(e, n, l) {
      var o = e.stateNode, c = !Qc, h = PR(o, e.type, e.memoizedProps, n, l, e, c);
      return e.updateQueue = h, h !== null;
    }
    function wM(e) {
      var n = e.stateNode, l = e.memoizedProps, o = $R(n, l, e);
      if (o) {
        var c = ya;
        if (c !== null)
          switch (c.tag) {
            case b: {
              var h = c.stateNode.containerInfo, x = (c.mode & ln) !== kt;
              WR(
                h,
                n,
                l,
                // TODO: Delete this argument when we remove the legacy root API.
                x
              );
              break;
            }
            case D: {
              var T = c.type, M = c.memoizedProps, N = c.stateNode, z = (c.mode & ln) !== kt;
              BR(
                T,
                M,
                N,
                n,
                l,
                // TODO: Delete this argument when we remove the legacy root API.
                z
              );
              break;
            }
          }
      }
      return o;
    }
    function CM(e) {
      var n = e.memoizedState, l = n !== null ? n.dehydrated : null;
      if (!l)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      HR(l, e);
    }
    function bM(e) {
      var n = e.memoizedState, l = n !== null ? n.dehydrated : null;
      if (!l)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return VR(l);
    }
    function Rx(e) {
      for (var n = e.return; n !== null && n.tag !== D && n.tag !== b && n.tag !== H; )
        n = n.return;
      ya = n;
    }
    function Ay(e) {
      if (e !== ya)
        return !1;
      if (!ql)
        return Rx(e), ql = !0, !1;
      if (e.tag !== b && (e.tag !== D || YR(e.type) && !lg(e.type, e.memoizedProps))) {
        var n = yl;
        if (n)
          if (Cg(e))
            Mx(e), bg();
          else
            for (; n; )
              Cx(e, n), n = Av(n);
      }
      return Rx(e), e.tag === H ? yl = bM(e) : yl = ya ? Av(e.stateNode) : null, !0;
    }
    function TM() {
      return ql && yl !== null;
    }
    function Mx(e) {
      for (var n = yl; n; )
        wx(e, n), n = Av(n);
    }
    function zd() {
      ya = null, yl = null, ql = !1, Qc = !1;
    }
    function _x() {
      Cu !== null && (Ew(Cu), Cu = null);
    }
    function ga() {
      return ql;
    }
    function Rg(e) {
      Cu === null ? Cu = [e] : Cu.push(e);
    }
    var RM = s.ReactCurrentBatchConfig, MM = null;
    function _M() {
      return RM.transition;
    }
    var Yl = {
      recordUnsafeLifecycleWarnings: function(e, n) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, n) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var DM = function(e) {
        for (var n = null, l = e; l !== null; )
          l.mode & zn && (n = l), l = l.return;
        return n;
      }, Xc = function(e) {
        var n = [];
        return e.forEach(function(l) {
          n.push(l);
        }), n.sort().join(", ");
      }, Uv = [], jv = [], Fv = [], Pv = [], $v = [], Hv = [], Kc = /* @__PURE__ */ new Set();
      Yl.recordUnsafeLifecycleWarnings = function(e, n) {
        Kc.has(e.type) || (typeof n.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        n.componentWillMount.__suppressDeprecationWarning !== !0 && Uv.push(e), e.mode & zn && typeof n.UNSAFE_componentWillMount == "function" && jv.push(e), typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Fv.push(e), e.mode & zn && typeof n.UNSAFE_componentWillReceiveProps == "function" && Pv.push(e), typeof n.componentWillUpdate == "function" && n.componentWillUpdate.__suppressDeprecationWarning !== !0 && $v.push(e), e.mode & zn && typeof n.UNSAFE_componentWillUpdate == "function" && Hv.push(e));
      }, Yl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Uv.length > 0 && (Uv.forEach(function(J) {
          e.add(Gt(J) || "Component"), Kc.add(J.type);
        }), Uv = []);
        var n = /* @__PURE__ */ new Set();
        jv.length > 0 && (jv.forEach(function(J) {
          n.add(Gt(J) || "Component"), Kc.add(J.type);
        }), jv = []);
        var l = /* @__PURE__ */ new Set();
        Fv.length > 0 && (Fv.forEach(function(J) {
          l.add(Gt(J) || "Component"), Kc.add(J.type);
        }), Fv = []);
        var o = /* @__PURE__ */ new Set();
        Pv.length > 0 && (Pv.forEach(function(J) {
          o.add(Gt(J) || "Component"), Kc.add(J.type);
        }), Pv = []);
        var c = /* @__PURE__ */ new Set();
        $v.length > 0 && ($v.forEach(function(J) {
          c.add(Gt(J) || "Component"), Kc.add(J.type);
        }), $v = []);
        var h = /* @__PURE__ */ new Set();
        if (Hv.length > 0 && (Hv.forEach(function(J) {
          h.add(Gt(J) || "Component"), Kc.add(J.type);
        }), Hv = []), n.size > 0) {
          var x = Xc(n);
          v(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, x);
        }
        if (o.size > 0) {
          var T = Xc(o);
          v(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, T);
        }
        if (h.size > 0) {
          var M = Xc(h);
          v(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, M);
        }
        if (e.size > 0) {
          var N = Xc(e);
          m(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, N);
        }
        if (l.size > 0) {
          var z = Xc(l);
          m(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, z);
        }
        if (c.size > 0) {
          var te = Xc(c);
          m(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, te);
        }
      };
      var Ly = /* @__PURE__ */ new Map(), Dx = /* @__PURE__ */ new Set();
      Yl.recordLegacyContextWarning = function(e, n) {
        var l = DM(e);
        if (l === null) {
          v("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!Dx.has(e.type)) {
          var o = Ly.get(l);
          (e.type.contextTypes != null || e.type.childContextTypes != null || n !== null && typeof n.getChildContext == "function") && (o === void 0 && (o = [], Ly.set(l, o)), o.push(e));
        }
      }, Yl.flushLegacyContextWarning = function() {
        Ly.forEach(function(e, n) {
          if (e.length !== 0) {
            var l = e[0], o = /* @__PURE__ */ new Set();
            e.forEach(function(h) {
              o.add(Gt(h) || "Component"), Dx.add(h.type);
            });
            var c = Xc(o);
            try {
              An(l), v(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, c);
            } finally {
              Yn();
            }
          }
        });
      }, Yl.discardPendingWarnings = function() {
        Uv = [], jv = [], Fv = [], Pv = [], $v = [], Hv = [], Ly = /* @__PURE__ */ new Map();
      };
    }
    var Mg, _g, Dg, kg, Og, kx = function(e, n) {
    };
    Mg = !1, _g = !1, Dg = {}, kg = {}, Og = {}, kx = function(e, n) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var l = Gt(n) || "Component";
        kg[l] || (kg[l] = !0, v('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function kM(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Vv(e, n, l) {
      var o = l.ref;
      if (o !== null && typeof o != "function" && typeof o != "object") {
        if ((e.mode & zn || X) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(l._owner && l._self && l._owner.stateNode !== l._self) && // Will already throw with "Function components cannot have string refs"
        !(l._owner && l._owner.tag !== E) && // Will already warn with "Function components cannot be given refs"
        !(typeof l.type == "function" && !kM(l.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        l._owner) {
          var c = Gt(e) || "Component";
          Dg[c] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', c, o), Dg[c] = !0);
        }
        if (l._owner) {
          var h = l._owner, x;
          if (h) {
            var T = h;
            if (T.tag !== E)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            x = T.stateNode;
          }
          if (!x)
            throw new Error("Missing owner for string ref " + o + ". This error is likely caused by a bug in React. Please file an issue.");
          var M = x;
          Xe(o, "ref");
          var N = "" + o;
          if (n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === N)
            return n.ref;
          var z = function(te) {
            var J = M.refs;
            te === null ? delete J[N] : J[N] = te;
          };
          return z._stringRef = N, z;
        } else {
          if (typeof o != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!l._owner)
            throw new Error("Element ref was specified as a string (" + o + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return o;
    }
    function Ny(e, n) {
      var l = Object.prototype.toString.call(n);
      throw new Error("Objects are not valid as a React child (found: " + (l === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : l) + "). If you meant to render a collection of children, use an array instead.");
    }
    function zy(e) {
      {
        var n = Gt(e) || "Component";
        if (Og[n])
          return;
        Og[n] = !0, v("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function Ox(e) {
      var n = e._payload, l = e._init;
      return l(n);
    }
    function Ax(e) {
      function n(ue, Ce) {
        if (e) {
          var ce = ue.deletions;
          ce === null ? (ue.deletions = [Ce], ue.flags |= ci) : ce.push(Ce);
        }
      }
      function l(ue, Ce) {
        if (!e)
          return null;
        for (var ce = Ce; ce !== null; )
          n(ue, ce), ce = ce.sibling;
        return null;
      }
      function o(ue, Ce) {
        for (var ce = /* @__PURE__ */ new Map(), qe = Ce; qe !== null; )
          qe.key !== null ? ce.set(qe.key, qe) : ce.set(qe.index, qe), qe = qe.sibling;
        return ce;
      }
      function c(ue, Ce) {
        var ce = of(ue, Ce);
        return ce.index = 0, ce.sibling = null, ce;
      }
      function h(ue, Ce, ce) {
        if (ue.index = ce, !e)
          return ue.flags |= il, Ce;
        var qe = ue.alternate;
        if (qe !== null) {
          var pt = qe.index;
          return pt < Ce ? (ue.flags |= tr, Ce) : pt;
        } else
          return ue.flags |= tr, Ce;
      }
      function x(ue) {
        return e && ue.alternate === null && (ue.flags |= tr), ue;
      }
      function T(ue, Ce, ce, qe) {
        if (Ce === null || Ce.tag !== _) {
          var pt = R2(ce, ue.mode, qe);
          return pt.return = ue, pt;
        } else {
          var st = c(Ce, ce);
          return st.return = ue, st;
        }
      }
      function M(ue, Ce, ce, qe) {
        var pt = ce.type;
        if (pt === Ma)
          return z(ue, Ce, ce.props.children, qe, ce.key);
        if (Ce !== null && (Ce.elementType === pt || // Keep this check inline so it only runs on the false path:
        jw(Ce, ce) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof pt == "object" && pt !== null && pt.$$typeof === Ht && Ox(pt) === Ce.type)) {
          var st = c(Ce, ce.props);
          return st.ref = Vv(ue, Ce, ce), st.return = ue, st._debugSource = ce._source, st._debugOwner = ce._owner, st;
        }
        var Vt = T2(ce, ue.mode, qe);
        return Vt.ref = Vv(ue, Ce, ce), Vt.return = ue, Vt;
      }
      function N(ue, Ce, ce, qe) {
        if (Ce === null || Ce.tag !== R || Ce.stateNode.containerInfo !== ce.containerInfo || Ce.stateNode.implementation !== ce.implementation) {
          var pt = M2(ce, ue.mode, qe);
          return pt.return = ue, pt;
        } else {
          var st = c(Ce, ce.children || []);
          return st.return = ue, st;
        }
      }
      function z(ue, Ce, ce, qe, pt) {
        if (Ce === null || Ce.tag !== A) {
          var st = Nu(ce, ue.mode, qe, pt);
          return st.return = ue, st;
        } else {
          var Vt = c(Ce, ce);
          return Vt.return = ue, Vt;
        }
      }
      function te(ue, Ce, ce) {
        if (typeof Ce == "string" && Ce !== "" || typeof Ce == "number") {
          var qe = R2("" + Ce, ue.mode, ce);
          return qe.return = ue, qe;
        }
        if (typeof Ce == "object" && Ce !== null) {
          switch (Ce.$$typeof) {
            case Lr: {
              var pt = T2(Ce, ue.mode, ce);
              return pt.ref = Vv(ue, null, Ce), pt.return = ue, pt;
            }
            case In: {
              var st = M2(Ce, ue.mode, ce);
              return st.return = ue, st;
            }
            case Ht: {
              var Vt = Ce._payload, Kt = Ce._init;
              return te(ue, Kt(Vt), ce);
            }
          }
          if (rn(Ce) || Wt(Ce)) {
            var jn = Nu(Ce, ue.mode, ce, null);
            return jn.return = ue, jn;
          }
          Ny(ue, Ce);
        }
        return typeof Ce == "function" && zy(ue), null;
      }
      function J(ue, Ce, ce, qe) {
        var pt = Ce !== null ? Ce.key : null;
        if (typeof ce == "string" && ce !== "" || typeof ce == "number")
          return pt !== null ? null : T(ue, Ce, "" + ce, qe);
        if (typeof ce == "object" && ce !== null) {
          switch (ce.$$typeof) {
            case Lr:
              return ce.key === pt ? M(ue, Ce, ce, qe) : null;
            case In:
              return ce.key === pt ? N(ue, Ce, ce, qe) : null;
            case Ht: {
              var st = ce._payload, Vt = ce._init;
              return J(ue, Ce, Vt(st), qe);
            }
          }
          if (rn(ce) || Wt(ce))
            return pt !== null ? null : z(ue, Ce, ce, qe, null);
          Ny(ue, ce);
        }
        return typeof ce == "function" && zy(ue), null;
      }
      function he(ue, Ce, ce, qe, pt) {
        if (typeof qe == "string" && qe !== "" || typeof qe == "number") {
          var st = ue.get(ce) || null;
          return T(Ce, st, "" + qe, pt);
        }
        if (typeof qe == "object" && qe !== null) {
          switch (qe.$$typeof) {
            case Lr: {
              var Vt = ue.get(qe.key === null ? ce : qe.key) || null;
              return M(Ce, Vt, qe, pt);
            }
            case In: {
              var Kt = ue.get(qe.key === null ? ce : qe.key) || null;
              return N(Ce, Kt, qe, pt);
            }
            case Ht:
              var jn = qe._payload, Mn = qe._init;
              return he(ue, Ce, ce, Mn(jn), pt);
          }
          if (rn(qe) || Wt(qe)) {
            var Ar = ue.get(ce) || null;
            return z(Ce, Ar, qe, pt, null);
          }
          Ny(Ce, qe);
        }
        return typeof qe == "function" && zy(Ce), null;
      }
      function ge(ue, Ce, ce) {
        {
          if (typeof ue != "object" || ue === null)
            return Ce;
          switch (ue.$$typeof) {
            case Lr:
            case In:
              kx(ue, ce);
              var qe = ue.key;
              if (typeof qe != "string")
                break;
              if (Ce === null) {
                Ce = /* @__PURE__ */ new Set(), Ce.add(qe);
                break;
              }
              if (!Ce.has(qe)) {
                Ce.add(qe);
                break;
              }
              v("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", qe);
              break;
            case Ht:
              var pt = ue._payload, st = ue._init;
              ge(st(pt), Ce, ce);
              break;
          }
        }
        return Ce;
      }
      function we(ue, Ce, ce, qe) {
        for (var pt = null, st = 0; st < ce.length; st++) {
          var Vt = ce[st];
          pt = ge(Vt, pt, ue);
        }
        for (var Kt = null, jn = null, Mn = Ce, Ar = 0, _n = 0, Tr = null; Mn !== null && _n < ce.length; _n++) {
          Mn.index > _n ? (Tr = Mn, Mn = null) : Tr = Mn.sibling;
          var Ia = J(ue, Mn, ce[_n], qe);
          if (Ia === null) {
            Mn === null && (Mn = Tr);
            break;
          }
          e && Mn && Ia.alternate === null && n(ue, Mn), Ar = h(Ia, Ar, _n), jn === null ? Kt = Ia : jn.sibling = Ia, jn = Ia, Mn = Tr;
        }
        if (_n === ce.length) {
          if (l(ue, Mn), ga()) {
            var Ta = _n;
            Bc(ue, Ta);
          }
          return Kt;
        }
        if (Mn === null) {
          for (; _n < ce.length; _n++) {
            var Ii = te(ue, ce[_n], qe);
            Ii !== null && (Ar = h(Ii, Ar, _n), jn === null ? Kt = Ii : jn.sibling = Ii, jn = Ii);
          }
          if (ga()) {
            var ni = _n;
            Bc(ue, ni);
          }
          return Kt;
        }
        for (var ri = o(ue, Mn); _n < ce.length; _n++) {
          var qa = he(ri, ue, _n, ce[_n], qe);
          qa !== null && (e && qa.alternate !== null && ri.delete(qa.key === null ? _n : qa.key), Ar = h(qa, Ar, _n), jn === null ? Kt = qa : jn.sibling = qa, jn = qa);
        }
        if (e && ri.forEach(function(ep) {
          return n(ue, ep);
        }), ga()) {
          var Ns = _n;
          Bc(ue, Ns);
        }
        return Kt;
      }
      function lt(ue, Ce, ce, qe) {
        var pt = Wt(ce);
        if (typeof pt != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          ce[Symbol.toStringTag] === "Generator" && (_g || v("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), _g = !0), ce.entries === pt && (Mg || v("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Mg = !0);
          var st = pt.call(ce);
          if (st)
            for (var Vt = null, Kt = st.next(); !Kt.done; Kt = st.next()) {
              var jn = Kt.value;
              Vt = ge(jn, Vt, ue);
            }
        }
        var Mn = pt.call(ce);
        if (Mn == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Ar = null, _n = null, Tr = Ce, Ia = 0, Ta = 0, Ii = null, ni = Mn.next(); Tr !== null && !ni.done; Ta++, ni = Mn.next()) {
          Tr.index > Ta ? (Ii = Tr, Tr = null) : Ii = Tr.sibling;
          var ri = J(ue, Tr, ni.value, qe);
          if (ri === null) {
            Tr === null && (Tr = Ii);
            break;
          }
          e && Tr && ri.alternate === null && n(ue, Tr), Ia = h(ri, Ia, Ta), _n === null ? Ar = ri : _n.sibling = ri, _n = ri, Tr = Ii;
        }
        if (ni.done) {
          if (l(ue, Tr), ga()) {
            var qa = Ta;
            Bc(ue, qa);
          }
          return Ar;
        }
        if (Tr === null) {
          for (; !ni.done; Ta++, ni = Mn.next()) {
            var Ns = te(ue, ni.value, qe);
            Ns !== null && (Ia = h(Ns, Ia, Ta), _n === null ? Ar = Ns : _n.sibling = Ns, _n = Ns);
          }
          if (ga()) {
            var ep = Ta;
            Bc(ue, ep);
          }
          return Ar;
        }
        for (var xh = o(ue, Tr); !ni.done; Ta++, ni = Mn.next()) {
          var Ho = he(xh, ue, Ta, ni.value, qe);
          Ho !== null && (e && Ho.alternate !== null && xh.delete(Ho.key === null ? Ta : Ho.key), Ia = h(Ho, Ia, Ta), _n === null ? Ar = Ho : _n.sibling = Ho, _n = Ho);
        }
        if (e && xh.forEach(function(n5) {
          return n(ue, n5);
        }), ga()) {
          var t5 = Ta;
          Bc(ue, t5);
        }
        return Ar;
      }
      function Nt(ue, Ce, ce, qe) {
        if (Ce !== null && Ce.tag === _) {
          l(ue, Ce.sibling);
          var pt = c(Ce, ce);
          return pt.return = ue, pt;
        }
        l(ue, Ce);
        var st = R2(ce, ue.mode, qe);
        return st.return = ue, st;
      }
      function Mt(ue, Ce, ce, qe) {
        for (var pt = ce.key, st = Ce; st !== null; ) {
          if (st.key === pt) {
            var Vt = ce.type;
            if (Vt === Ma) {
              if (st.tag === A) {
                l(ue, st.sibling);
                var Kt = c(st, ce.props.children);
                return Kt.return = ue, Kt._debugSource = ce._source, Kt._debugOwner = ce._owner, Kt;
              }
            } else if (st.elementType === Vt || // Keep this check inline so it only runs on the false path:
            jw(st, ce) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof Vt == "object" && Vt !== null && Vt.$$typeof === Ht && Ox(Vt) === st.type) {
              l(ue, st.sibling);
              var jn = c(st, ce.props);
              return jn.ref = Vv(ue, st, ce), jn.return = ue, jn._debugSource = ce._source, jn._debugOwner = ce._owner, jn;
            }
            l(ue, st);
            break;
          } else
            n(ue, st);
          st = st.sibling;
        }
        if (ce.type === Ma) {
          var Mn = Nu(ce.props.children, ue.mode, qe, ce.key);
          return Mn.return = ue, Mn;
        } else {
          var Ar = T2(ce, ue.mode, qe);
          return Ar.ref = Vv(ue, Ce, ce), Ar.return = ue, Ar;
        }
      }
      function yn(ue, Ce, ce, qe) {
        for (var pt = ce.key, st = Ce; st !== null; ) {
          if (st.key === pt)
            if (st.tag === R && st.stateNode.containerInfo === ce.containerInfo && st.stateNode.implementation === ce.implementation) {
              l(ue, st.sibling);
              var Vt = c(st, ce.children || []);
              return Vt.return = ue, Vt;
            } else {
              l(ue, st);
              break;
            }
          else
            n(ue, st);
          st = st.sibling;
        }
        var Kt = M2(ce, ue.mode, qe);
        return Kt.return = ue, Kt;
      }
      function dn(ue, Ce, ce, qe) {
        var pt = typeof ce == "object" && ce !== null && ce.type === Ma && ce.key === null;
        if (pt && (ce = ce.props.children), typeof ce == "object" && ce !== null) {
          switch (ce.$$typeof) {
            case Lr:
              return x(Mt(ue, Ce, ce, qe));
            case In:
              return x(yn(ue, Ce, ce, qe));
            case Ht:
              var st = ce._payload, Vt = ce._init;
              return dn(ue, Ce, Vt(st), qe);
          }
          if (rn(ce))
            return we(ue, Ce, ce, qe);
          if (Wt(ce))
            return lt(ue, Ce, ce, qe);
          Ny(ue, ce);
        }
        return typeof ce == "string" && ce !== "" || typeof ce == "number" ? x(Nt(ue, Ce, "" + ce, qe)) : (typeof ce == "function" && zy(ue), l(ue, Ce));
      }
      return dn;
    }
    var Ud = Ax(!0), Lx = Ax(!1);
    function OM(e, n) {
      if (e !== null && n.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (n.child !== null) {
        var l = n.child, o = of(l, l.pendingProps);
        for (n.child = o, o.return = n; l.sibling !== null; )
          l = l.sibling, o = o.sibling = of(l, l.pendingProps), o.return = n;
        o.sibling = null;
      }
    }
    function AM(e, n) {
      for (var l = e.child; l !== null; )
        Sk(l, n), l = l.sibling;
    }
    var Ag = xu(null), Lg;
    Lg = {};
    var Uy = null, jd = null, Ng = null, jy = !1;
    function Fy() {
      Uy = null, jd = null, Ng = null, jy = !1;
    }
    function Nx() {
      jy = !0;
    }
    function zx() {
      jy = !1;
    }
    function Ux(e, n, l) {
      Ha(Ag, n._currentValue, e), n._currentValue = l, n._currentRenderer !== void 0 && n._currentRenderer !== null && n._currentRenderer !== Lg && v("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), n._currentRenderer = Lg;
    }
    function zg(e, n) {
      var l = Ag.current;
      $a(Ag, n), e._currentValue = l;
    }
    function Ug(e, n, l) {
      for (var o = e; o !== null; ) {
        var c = o.alternate;
        if (ms(o.childLanes, n) ? c !== null && !ms(c.childLanes, n) && (c.childLanes = Jt(c.childLanes, n)) : (o.childLanes = Jt(o.childLanes, n), c !== null && (c.childLanes = Jt(c.childLanes, n))), o === l)
          break;
        o = o.return;
      }
      o !== l && v("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function LM(e, n, l) {
      NM(e, n, l);
    }
    function NM(e, n, l) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var c = void 0, h = o.dependencies;
        if (h !== null) {
          c = o.child;
          for (var x = h.firstContext; x !== null; ) {
            if (x.context === n) {
              if (o.tag === E) {
                var T = bc(l), M = _s(Pn, T);
                M.tag = $y;
                var N = o.updateQueue;
                if (N !== null) {
                  var z = N.shared, te = z.pending;
                  te === null ? M.next = M : (M.next = te.next, te.next = M), z.pending = M;
                }
              }
              o.lanes = Jt(o.lanes, l);
              var J = o.alternate;
              J !== null && (J.lanes = Jt(J.lanes, l)), Ug(o.return, l, e), h.lanes = Jt(h.lanes, l);
              break;
            }
            x = x.next;
          }
        } else if (o.tag === q)
          c = o.type === e.type ? null : o.child;
        else if (o.tag === P) {
          var he = o.return;
          if (he === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          he.lanes = Jt(he.lanes, l);
          var ge = he.alternate;
          ge !== null && (ge.lanes = Jt(ge.lanes, l)), Ug(he, l, e), c = o.sibling;
        } else
          c = o.child;
        if (c !== null)
          c.return = o;
        else
          for (c = o; c !== null; ) {
            if (c === e) {
              c = null;
              break;
            }
            var we = c.sibling;
            if (we !== null) {
              we.return = c.return, c = we;
              break;
            }
            c = c.return;
          }
        o = c;
      }
    }
    function Fd(e, n) {
      Uy = e, jd = null, Ng = null;
      var l = e.dependencies;
      if (l !== null) {
        var o = l.firstContext;
        o !== null && (Ua(l.lanes, n) && rh(), l.firstContext = null);
      }
    }
    function Pr(e) {
      jy && v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var n = e._currentValue;
      if (Ng !== e) {
        var l = {
          context: e,
          memoizedValue: n,
          next: null
        };
        if (jd === null) {
          if (Uy === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          jd = l, Uy.dependencies = {
            lanes: Ae,
            firstContext: l
          };
        } else
          jd = jd.next = l;
      }
      return n;
    }
    var Zc = null;
    function jg(e) {
      Zc === null ? Zc = [e] : Zc.push(e);
    }
    function zM() {
      if (Zc !== null) {
        for (var e = 0; e < Zc.length; e++) {
          var n = Zc[e], l = n.interleaved;
          if (l !== null) {
            n.interleaved = null;
            var o = l.next, c = n.pending;
            if (c !== null) {
              var h = c.next;
              c.next = o, l.next = h;
            }
            n.pending = l;
          }
        }
        Zc = null;
      }
    }
    function jx(e, n, l, o) {
      var c = n.interleaved;
      return c === null ? (l.next = l, jg(n)) : (l.next = c.next, c.next = l), n.interleaved = l, Py(e, o);
    }
    function UM(e, n, l, o) {
      var c = n.interleaved;
      c === null ? (l.next = l, jg(n)) : (l.next = c.next, c.next = l), n.interleaved = l;
    }
    function jM(e, n, l, o) {
      var c = n.interleaved;
      return c === null ? (l.next = l, jg(n)) : (l.next = c.next, c.next = l), n.interleaved = l, Py(e, o);
    }
    function xi(e, n) {
      return Py(e, n);
    }
    var FM = Py;
    function Py(e, n) {
      e.lanes = Jt(e.lanes, n);
      var l = e.alternate;
      l !== null && (l.lanes = Jt(l.lanes, n)), l === null && (e.flags & (tr | Oa)) !== Dt && Lw(e);
      for (var o = e, c = e.return; c !== null; )
        c.childLanes = Jt(c.childLanes, n), l = c.alternate, l !== null ? l.childLanes = Jt(l.childLanes, n) : (c.flags & (tr | Oa)) !== Dt && Lw(e), o = c, c = c.return;
      if (o.tag === b) {
        var h = o.stateNode;
        return h;
      } else
        return null;
    }
    var Fx = 0, Px = 1, $y = 2, Fg = 3, Hy = !1, Pg, Vy;
    Pg = !1, Vy = null;
    function $g(e) {
      var n = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: Ae
        },
        effects: null
      };
      e.updateQueue = n;
    }
    function $x(e, n) {
      var l = n.updateQueue, o = e.updateQueue;
      if (l === o) {
        var c = {
          baseState: o.baseState,
          firstBaseUpdate: o.firstBaseUpdate,
          lastBaseUpdate: o.lastBaseUpdate,
          shared: o.shared,
          effects: o.effects
        };
        n.updateQueue = c;
      }
    }
    function _s(e, n) {
      var l = {
        eventTime: e,
        lane: n,
        tag: Fx,
        payload: null,
        callback: null,
        next: null
      };
      return l;
    }
    function bu(e, n, l) {
      var o = e.updateQueue;
      if (o === null)
        return null;
      var c = o.shared;
      if (Vy === c && !Pg && (v("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Pg = !0), UD()) {
        var h = c.pending;
        return h === null ? n.next = n : (n.next = h.next, h.next = n), c.pending = n, FM(e, l);
      } else
        return jM(e, c, n, l);
    }
    function Iy(e, n, l) {
      var o = n.updateQueue;
      if (o !== null) {
        var c = o.shared;
        if (tv(l)) {
          var h = c.lanes;
          h = rv(h, e.pendingLanes);
          var x = Jt(h, l);
          c.lanes = x, cd(e, x);
        }
      }
    }
    function Hg(e, n) {
      var l = e.updateQueue, o = e.alternate;
      if (o !== null) {
        var c = o.updateQueue;
        if (l === c) {
          var h = null, x = null, T = l.firstBaseUpdate;
          if (T !== null) {
            var M = T;
            do {
              var N = {
                eventTime: M.eventTime,
                lane: M.lane,
                tag: M.tag,
                payload: M.payload,
                callback: M.callback,
                next: null
              };
              x === null ? h = x = N : (x.next = N, x = N), M = M.next;
            } while (M !== null);
            x === null ? h = x = n : (x.next = n, x = n);
          } else
            h = x = n;
          l = {
            baseState: c.baseState,
            firstBaseUpdate: h,
            lastBaseUpdate: x,
            shared: c.shared,
            effects: c.effects
          }, e.updateQueue = l;
          return;
        }
      }
      var z = l.lastBaseUpdate;
      z === null ? l.firstBaseUpdate = n : z.next = n, l.lastBaseUpdate = n;
    }
    function PM(e, n, l, o, c, h) {
      switch (l.tag) {
        case Px: {
          var x = l.payload;
          if (typeof x == "function") {
            Nx();
            var T = x.call(h, o, c);
            {
              if (e.mode & zn) {
                nr(!0);
                try {
                  x.call(h, o, c);
                } finally {
                  nr(!1);
                }
              }
              zx();
            }
            return T;
          }
          return x;
        }
        case Fg:
          e.flags = e.flags & ~zr | _t;
        // Intentional fallthrough
        case Fx: {
          var M = l.payload, N;
          if (typeof M == "function") {
            Nx(), N = M.call(h, o, c);
            {
              if (e.mode & zn) {
                nr(!0);
                try {
                  M.call(h, o, c);
                } finally {
                  nr(!1);
                }
              }
              zx();
            }
          } else
            N = M;
          return N == null ? o : Qt({}, o, N);
        }
        case $y:
          return Hy = !0, o;
      }
      return o;
    }
    function qy(e, n, l, o) {
      var c = e.updateQueue;
      Hy = !1, Vy = c.shared;
      var h = c.firstBaseUpdate, x = c.lastBaseUpdate, T = c.shared.pending;
      if (T !== null) {
        c.shared.pending = null;
        var M = T, N = M.next;
        M.next = null, x === null ? h = N : x.next = N, x = M;
        var z = e.alternate;
        if (z !== null) {
          var te = z.updateQueue, J = te.lastBaseUpdate;
          J !== x && (J === null ? te.firstBaseUpdate = N : J.next = N, te.lastBaseUpdate = M);
        }
      }
      if (h !== null) {
        var he = c.baseState, ge = Ae, we = null, lt = null, Nt = null, Mt = h;
        do {
          var yn = Mt.lane, dn = Mt.eventTime;
          if (ms(o, yn)) {
            if (Nt !== null) {
              var Ce = {
                eventTime: dn,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: wn,
                tag: Mt.tag,
                payload: Mt.payload,
                callback: Mt.callback,
                next: null
              };
              Nt = Nt.next = Ce;
            }
            he = PM(e, c, Mt, he, n, l);
            var ce = Mt.callback;
            if (ce !== null && // If the update was already committed, we should not queue its
            // callback again.
            Mt.lane !== wn) {
              e.flags |= Hn;
              var qe = c.effects;
              qe === null ? c.effects = [Mt] : qe.push(Mt);
            }
          } else {
            var ue = {
              eventTime: dn,
              lane: yn,
              tag: Mt.tag,
              payload: Mt.payload,
              callback: Mt.callback,
              next: null
            };
            Nt === null ? (lt = Nt = ue, we = he) : Nt = Nt.next = ue, ge = Jt(ge, yn);
          }
          if (Mt = Mt.next, Mt === null) {
            if (T = c.shared.pending, T === null)
              break;
            var pt = T, st = pt.next;
            pt.next = null, Mt = st, c.lastBaseUpdate = pt, c.shared.pending = null;
          }
        } while (!0);
        Nt === null && (we = he), c.baseState = we, c.firstBaseUpdate = lt, c.lastBaseUpdate = Nt;
        var Vt = c.shared.interleaved;
        if (Vt !== null) {
          var Kt = Vt;
          do
            ge = Jt(ge, Kt.lane), Kt = Kt.next;
          while (Kt !== Vt);
        } else h === null && (c.shared.lanes = Ae);
        hh(ge), e.lanes = ge, e.memoizedState = he;
      }
      Vy = null;
    }
    function $M(e, n) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(n);
    }
    function Hx() {
      Hy = !1;
    }
    function Yy() {
      return Hy;
    }
    function Vx(e, n, l) {
      var o = n.effects;
      if (n.effects = null, o !== null)
        for (var c = 0; c < o.length; c++) {
          var h = o[c], x = h.callback;
          x !== null && (h.callback = null, $M(x, l));
        }
    }
    var Iv = {}, Tu = xu(Iv), qv = xu(Iv), Wy = xu(Iv);
    function By(e) {
      if (e === Iv)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function Ix() {
      var e = By(Wy.current);
      return e;
    }
    function Vg(e, n) {
      Ha(Wy, n, e), Ha(qv, e, e), Ha(Tu, Iv, e);
      var l = rR(n);
      $a(Tu, e), Ha(Tu, l, e);
    }
    function Pd(e) {
      $a(Tu, e), $a(qv, e), $a(Wy, e);
    }
    function Ig() {
      var e = By(Tu.current);
      return e;
    }
    function qx(e) {
      By(Wy.current);
      var n = By(Tu.current), l = aR(n, e.type);
      n !== l && (Ha(qv, e, e), Ha(Tu, l, e));
    }
    function qg(e) {
      qv.current === e && ($a(Tu, e), $a(qv, e));
    }
    var HM = 0, Yx = 1, Wx = 1, Yv = 2, Wl = xu(HM);
    function Yg(e, n) {
      return (e & n) !== 0;
    }
    function $d(e) {
      return e & Yx;
    }
    function Wg(e, n) {
      return e & Yx | n;
    }
    function VM(e, n) {
      return e | n;
    }
    function Ru(e, n) {
      Ha(Wl, n, e);
    }
    function Hd(e) {
      $a(Wl, e);
    }
    function IM(e, n) {
      var l = e.memoizedState;
      return l !== null ? l.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Gy(e) {
      for (var n = e; n !== null; ) {
        if (n.tag === H) {
          var l = n.memoizedState;
          if (l !== null) {
            var o = l.dehydrated;
            if (o === null || ux(o) || cg(o))
              return n;
          }
        } else if (n.tag === ne && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        n.memoizedProps.revealOrder !== void 0) {
          var c = (n.flags & _t) !== Dt;
          if (c)
            return n;
        } else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === e)
          return null;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e)
            return null;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      return null;
    }
    var Ei = (
      /*   */
      0
    ), Wr = (
      /* */
      1
    ), No = (
      /*  */
      2
    ), Br = (
      /*    */
      4
    ), Sa = (
      /*   */
      8
    ), Bg = [];
    function Gg() {
      for (var e = 0; e < Bg.length; e++) {
        var n = Bg[e];
        n._workInProgressVersionPrimary = null;
      }
      Bg.length = 0;
    }
    function qM(e, n) {
      var l = n._getVersion, o = l(n._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [n, o] : e.mutableSourceEagerHydrationData.push(n, o);
    }
    var dt = s.ReactCurrentDispatcher, Wv = s.ReactCurrentBatchConfig, Qg, Vd;
    Qg = /* @__PURE__ */ new Set();
    var Jc = Ae, Un = null, Gr = null, Qr = null, Qy = !1, Bv = !1, Gv = 0, YM = 0, WM = 25, Me = null, gl = null, Mu = -1, Xg = !1;
    function kn() {
      {
        var e = Me;
        gl === null ? gl = [e] : gl.push(e);
      }
    }
    function tt() {
      {
        var e = Me;
        gl !== null && (Mu++, gl[Mu] !== e && BM(e));
      }
    }
    function Id(e) {
      e != null && !rn(e) && v("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Me, typeof e);
    }
    function BM(e) {
      {
        var n = Gt(Un);
        if (!Qg.has(n) && (Qg.add(n), gl !== null)) {
          for (var l = "", o = 30, c = 0; c <= Mu; c++) {
            for (var h = gl[c], x = c === Mu ? e : h, T = c + 1 + ". " + h; T.length < o; )
              T += " ";
            T += x + `
`, l += T;
          }
          v(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, n, l);
        }
      }
    }
    function Va() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function Kg(e, n) {
      if (Xg)
        return !1;
      if (n === null)
        return v("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Me), !1;
      e.length !== n.length && v(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, Me, "[" + n.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var l = 0; l < n.length && l < e.length; l++)
        if (!je(e[l], n[l]))
          return !1;
      return !0;
    }
    function qd(e, n, l, o, c, h) {
      Jc = h, Un = n, gl = e !== null ? e._debugHookTypes : null, Mu = -1, Xg = e !== null && e.type !== n.type, n.memoizedState = null, n.updateQueue = null, n.lanes = Ae, e !== null && e.memoizedState !== null ? dt.current = vE : gl !== null ? dt.current = pE : dt.current = dE;
      var x = l(o, c);
      if (Bv) {
        var T = 0;
        do {
          if (Bv = !1, Gv = 0, T >= WM)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          T += 1, Xg = !1, Gr = null, Qr = null, n.updateQueue = null, Mu = -1, dt.current = hE, x = l(o, c);
        } while (Bv);
      }
      dt.current = s0, n._debugHookTypes = gl;
      var M = Gr !== null && Gr.next !== null;
      if (Jc = Ae, Un = null, Gr = null, Qr = null, Me = null, gl = null, Mu = -1, e !== null && (e.flags & Sr) !== (n.flags & Sr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & ln) !== kt && v("Internal React error: Expected static flag was missing. Please notify the React team."), Qy = !1, M)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return x;
    }
    function Yd() {
      var e = Gv !== 0;
      return Gv = 0, e;
    }
    function Bx(e, n, l) {
      n.updateQueue = e.updateQueue, (n.mode & Tn) !== kt ? n.flags &= -50333701 : n.flags &= -2053, e.lanes = Tc(e.lanes, l);
    }
    function Gx() {
      if (dt.current = s0, Qy) {
        for (var e = Un.memoizedState; e !== null; ) {
          var n = e.queue;
          n !== null && (n.pending = null), e = e.next;
        }
        Qy = !1;
      }
      Jc = Ae, Un = null, Gr = null, Qr = null, gl = null, Mu = -1, Me = null, oE = !1, Bv = !1, Gv = 0;
    }
    function zo() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Qr === null ? Un.memoizedState = Qr = e : Qr = Qr.next = e, Qr;
    }
    function Sl() {
      var e;
      if (Gr === null) {
        var n = Un.alternate;
        n !== null ? e = n.memoizedState : e = null;
      } else
        e = Gr.next;
      var l;
      if (Qr === null ? l = Un.memoizedState : l = Qr.next, l !== null)
        Qr = l, l = Qr.next, Gr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        Gr = e;
        var o = {
          memoizedState: Gr.memoizedState,
          baseState: Gr.baseState,
          baseQueue: Gr.baseQueue,
          queue: Gr.queue,
          next: null
        };
        Qr === null ? Un.memoizedState = Qr = o : Qr = Qr.next = o;
      }
      return Qr;
    }
    function Qx() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function Zg(e, n) {
      return typeof n == "function" ? n(e) : n;
    }
    function Jg(e, n, l) {
      var o = zo(), c;
      l !== void 0 ? c = l(n) : c = n, o.memoizedState = o.baseState = c;
      var h = {
        pending: null,
        interleaved: null,
        lanes: Ae,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      };
      o.queue = h;
      var x = h.dispatch = KM.bind(null, Un, h);
      return [o.memoizedState, x];
    }
    function eS(e, n, l) {
      var o = Sl(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var h = Gr, x = h.baseQueue, T = c.pending;
      if (T !== null) {
        if (x !== null) {
          var M = x.next, N = T.next;
          x.next = N, T.next = M;
        }
        h.baseQueue !== x && v("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), h.baseQueue = x = T, c.pending = null;
      }
      if (x !== null) {
        var z = x.next, te = h.baseState, J = null, he = null, ge = null, we = z;
        do {
          var lt = we.lane;
          if (ms(Jc, lt)) {
            if (ge !== null) {
              var Mt = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: wn,
                action: we.action,
                hasEagerState: we.hasEagerState,
                eagerState: we.eagerState,
                next: null
              };
              ge = ge.next = Mt;
            }
            if (we.hasEagerState)
              te = we.eagerState;
            else {
              var yn = we.action;
              te = e(te, yn);
            }
          } else {
            var Nt = {
              lane: lt,
              action: we.action,
              hasEagerState: we.hasEagerState,
              eagerState: we.eagerState,
              next: null
            };
            ge === null ? (he = ge = Nt, J = te) : ge = ge.next = Nt, Un.lanes = Jt(Un.lanes, lt), hh(lt);
          }
          we = we.next;
        } while (we !== null && we !== z);
        ge === null ? J = te : ge.next = he, je(te, o.memoizedState) || rh(), o.memoizedState = te, o.baseState = J, o.baseQueue = ge, c.lastRenderedState = te;
      }
      var dn = c.interleaved;
      if (dn !== null) {
        var ue = dn;
        do {
          var Ce = ue.lane;
          Un.lanes = Jt(Un.lanes, Ce), hh(Ce), ue = ue.next;
        } while (ue !== dn);
      } else x === null && (c.lanes = Ae);
      var ce = c.dispatch;
      return [o.memoizedState, ce];
    }
    function tS(e, n, l) {
      var o = Sl(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var h = c.dispatch, x = c.pending, T = o.memoizedState;
      if (x !== null) {
        c.pending = null;
        var M = x.next, N = M;
        do {
          var z = N.action;
          T = e(T, z), N = N.next;
        } while (N !== M);
        je(T, o.memoizedState) || rh(), o.memoizedState = T, o.baseQueue === null && (o.baseState = T), c.lastRenderedState = T;
      }
      return [T, h];
    }
    function kz(e, n, l) {
    }
    function Oz(e, n, l) {
    }
    function nS(e, n, l) {
      var o = Un, c = zo(), h, x = ga();
      if (x) {
        if (l === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        h = l(), Vd || h !== l() && (v("The result of getServerSnapshot should be cached to avoid an infinite loop"), Vd = !0);
      } else {
        if (h = n(), !Vd) {
          var T = n();
          je(h, T) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), Vd = !0);
        }
        var M = M0();
        if (M === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        sd(M, Jc) || Xx(o, n, h);
      }
      c.memoizedState = h;
      var N = {
        value: h,
        getSnapshot: n
      };
      return c.queue = N, e0(Zx.bind(null, o, N, e), [e]), o.flags |= ka, Qv(Wr | Sa, Kx.bind(null, o, N, h, n), void 0, null), h;
    }
    function Xy(e, n, l) {
      var o = Un, c = Sl(), h = n();
      if (!Vd) {
        var x = n();
        je(h, x) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), Vd = !0);
      }
      var T = c.memoizedState, M = !je(T, h);
      M && (c.memoizedState = h, rh());
      var N = c.queue;
      if (Kv(Zx.bind(null, o, N, e), [e]), N.getSnapshot !== n || M || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      Qr !== null && Qr.memoizedState.tag & Wr) {
        o.flags |= ka, Qv(Wr | Sa, Kx.bind(null, o, N, h, n), void 0, null);
        var z = M0();
        if (z === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        sd(z, Jc) || Xx(o, n, h);
      }
      return h;
    }
    function Xx(e, n, l) {
      e.flags |= au;
      var o = {
        getSnapshot: n,
        value: l
      }, c = Un.updateQueue;
      if (c === null)
        c = Qx(), Un.updateQueue = c, c.stores = [o];
      else {
        var h = c.stores;
        h === null ? c.stores = [o] : h.push(o);
      }
    }
    function Kx(e, n, l, o) {
      n.value = l, n.getSnapshot = o, Jx(n) && eE(e);
    }
    function Zx(e, n, l) {
      var o = function() {
        Jx(n) && eE(e);
      };
      return l(o);
    }
    function Jx(e) {
      var n = e.getSnapshot, l = e.value;
      try {
        var o = n();
        return !je(l, o);
      } catch {
        return !0;
      }
    }
    function eE(e) {
      var n = xi(e, Pt);
      n !== null && Jr(n, e, Pt, Pn);
    }
    function Ky(e) {
      var n = zo();
      typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e;
      var l = {
        pending: null,
        interleaved: null,
        lanes: Ae,
        dispatch: null,
        lastRenderedReducer: Zg,
        lastRenderedState: e
      };
      n.queue = l;
      var o = l.dispatch = ZM.bind(null, Un, l);
      return [n.memoizedState, o];
    }
    function rS(e) {
      return eS(Zg);
    }
    function aS(e) {
      return tS(Zg);
    }
    function Qv(e, n, l, o) {
      var c = {
        tag: e,
        create: n,
        destroy: l,
        deps: o,
        // Circular
        next: null
      }, h = Un.updateQueue;
      if (h === null)
        h = Qx(), Un.updateQueue = h, h.lastEffect = c.next = c;
      else {
        var x = h.lastEffect;
        if (x === null)
          h.lastEffect = c.next = c;
        else {
          var T = x.next;
          x.next = c, c.next = T, h.lastEffect = c;
        }
      }
      return c;
    }
    function iS(e) {
      var n = zo();
      {
        var l = {
          current: e
        };
        return n.memoizedState = l, l;
      }
    }
    function Zy(e) {
      var n = Sl();
      return n.memoizedState;
    }
    function Xv(e, n, l, o) {
      var c = zo(), h = o === void 0 ? null : o;
      Un.flags |= e, c.memoizedState = Qv(Wr | n, l, void 0, h);
    }
    function Jy(e, n, l, o) {
      var c = Sl(), h = o === void 0 ? null : o, x = void 0;
      if (Gr !== null) {
        var T = Gr.memoizedState;
        if (x = T.destroy, h !== null) {
          var M = T.deps;
          if (Kg(h, M)) {
            c.memoizedState = Qv(n, l, x, h);
            return;
          }
        }
      }
      Un.flags |= e, c.memoizedState = Qv(Wr | n, l, x, h);
    }
    function e0(e, n) {
      return (Un.mode & Tn) !== kt ? Xv(ll | ka | zf, Sa, e, n) : Xv(ka | zf, Sa, e, n);
    }
    function Kv(e, n) {
      return Jy(ka, Sa, e, n);
    }
    function lS(e, n) {
      return Xv(vn, No, e, n);
    }
    function t0(e, n) {
      return Jy(vn, No, e, n);
    }
    function oS(e, n) {
      var l = vn;
      return l |= Nl, (Un.mode & Tn) !== kt && (l |= mo), Xv(l, Br, e, n);
    }
    function n0(e, n) {
      return Jy(vn, Br, e, n);
    }
    function tE(e, n) {
      if (typeof n == "function") {
        var l = n, o = e();
        return l(o), function() {
          l(null);
        };
      } else if (n != null) {
        var c = n;
        c.hasOwnProperty("current") || v("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(c).join(", ") + "}");
        var h = e();
        return c.current = h, function() {
          c.current = null;
        };
      }
    }
    function sS(e, n, l) {
      typeof n != "function" && v("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", n !== null ? typeof n : "null");
      var o = l != null ? l.concat([e]) : null, c = vn;
      return c |= Nl, (Un.mode & Tn) !== kt && (c |= mo), Xv(c, Br, tE.bind(null, n, e), o);
    }
    function r0(e, n, l) {
      typeof n != "function" && v("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", n !== null ? typeof n : "null");
      var o = l != null ? l.concat([e]) : null;
      return Jy(vn, Br, tE.bind(null, n, e), o);
    }
    function GM(e, n) {
    }
    var a0 = GM;
    function uS(e, n) {
      var l = zo(), o = n === void 0 ? null : n;
      return l.memoizedState = [e, o], e;
    }
    function i0(e, n) {
      var l = Sl(), o = n === void 0 ? null : n, c = l.memoizedState;
      if (c !== null && o !== null) {
        var h = c[1];
        if (Kg(o, h))
          return c[0];
      }
      return l.memoizedState = [e, o], e;
    }
    function cS(e, n) {
      var l = zo(), o = n === void 0 ? null : n, c = e();
      return l.memoizedState = [c, o], c;
    }
    function l0(e, n) {
      var l = Sl(), o = n === void 0 ? null : n, c = l.memoizedState;
      if (c !== null && o !== null) {
        var h = c[1];
        if (Kg(o, h))
          return c[0];
      }
      var x = e();
      return l.memoizedState = [x, o], x;
    }
    function fS(e) {
      var n = zo();
      return n.memoizedState = e, e;
    }
    function nE(e) {
      var n = Sl(), l = Gr, o = l.memoizedState;
      return aE(n, o, e);
    }
    function rE(e) {
      var n = Sl();
      if (Gr === null)
        return n.memoizedState = e, e;
      var l = Gr.memoizedState;
      return aE(n, l, e);
    }
    function aE(e, n, l) {
      var o = !Jp(Jc);
      if (o) {
        if (!je(l, n)) {
          var c = nv();
          Un.lanes = Jt(Un.lanes, c), hh(c), e.baseState = !0;
        }
        return n;
      } else
        return e.baseState && (e.baseState = !1, rh()), e.memoizedState = l, l;
    }
    function QM(e, n, l) {
      var o = yi();
      wr(jm(o, cl)), e(!0);
      var c = Wv.transition;
      Wv.transition = {};
      var h = Wv.transition;
      Wv.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), n();
      } finally {
        if (wr(o), Wv.transition = c, c === null && h._updatedFibers) {
          var x = h._updatedFibers.size;
          x > 10 && m("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), h._updatedFibers.clear();
        }
      }
    }
    function dS() {
      var e = Ky(!1), n = e[0], l = e[1], o = QM.bind(null, l), c = zo();
      return c.memoizedState = o, [n, o];
    }
    function iE() {
      var e = rS(), n = e[0], l = Sl(), o = l.memoizedState;
      return [n, o];
    }
    function lE() {
      var e = aS(), n = e[0], l = Sl(), o = l.memoizedState;
      return [n, o];
    }
    var oE = !1;
    function XM() {
      return oE;
    }
    function pS() {
      var e = zo(), n = M0(), l = n.identifierPrefix, o;
      if (ga()) {
        var c = pM();
        o = ":" + l + "R" + c;
        var h = Gv++;
        h > 0 && (o += "H" + h.toString(32)), o += ":";
      } else {
        var x = YM++;
        o = ":" + l + "r" + x.toString(32) + ":";
      }
      return e.memoizedState = o, o;
    }
    function o0() {
      var e = Sl(), n = e.memoizedState;
      return n;
    }
    function KM(e, n, l) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = Au(e), c = {
        lane: o,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (sE(e))
        uE(n, c);
      else {
        var h = jx(e, n, c, o);
        if (h !== null) {
          var x = ti();
          Jr(h, e, o, x), cE(h, n, o);
        }
      }
      fE(e, o);
    }
    function ZM(e, n, l) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = Au(e), c = {
        lane: o,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (sE(e))
        uE(n, c);
      else {
        var h = e.alternate;
        if (e.lanes === Ae && (h === null || h.lanes === Ae)) {
          var x = n.lastRenderedReducer;
          if (x !== null) {
            var T;
            T = dt.current, dt.current = Bl;
            try {
              var M = n.lastRenderedState, N = x(M, l);
              if (c.hasEagerState = !0, c.eagerState = N, je(N, M)) {
                UM(e, n, c, o);
                return;
              }
            } catch {
            } finally {
              dt.current = T;
            }
          }
        }
        var z = jx(e, n, c, o);
        if (z !== null) {
          var te = ti();
          Jr(z, e, o, te), cE(z, n, o);
        }
      }
      fE(e, o);
    }
    function sE(e) {
      var n = e.alternate;
      return e === Un || n !== null && n === Un;
    }
    function uE(e, n) {
      Bv = Qy = !0;
      var l = e.pending;
      l === null ? n.next = n : (n.next = l.next, l.next = n), e.pending = n;
    }
    function cE(e, n, l) {
      if (tv(l)) {
        var o = n.lanes;
        o = rv(o, e.pendingLanes);
        var c = Jt(o, l);
        n.lanes = c, cd(e, c);
      }
    }
    function fE(e, n, l) {
      hc(e, n);
    }
    var s0 = {
      readContext: Pr,
      useCallback: Va,
      useContext: Va,
      useEffect: Va,
      useImperativeHandle: Va,
      useInsertionEffect: Va,
      useLayoutEffect: Va,
      useMemo: Va,
      useReducer: Va,
      useRef: Va,
      useState: Va,
      useDebugValue: Va,
      useDeferredValue: Va,
      useTransition: Va,
      useMutableSource: Va,
      useSyncExternalStore: Va,
      useId: Va,
      unstable_isNewReconciler: ae
    }, dE = null, pE = null, vE = null, hE = null, Uo = null, Bl = null, u0 = null;
    {
      var vS = function() {
        v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, Xt = function() {
        v("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      dE = {
        readContext: function(e) {
          return Pr(e);
        },
        useCallback: function(e, n) {
          return Me = "useCallback", kn(), Id(n), uS(e, n);
        },
        useContext: function(e) {
          return Me = "useContext", kn(), Pr(e);
        },
        useEffect: function(e, n) {
          return Me = "useEffect", kn(), Id(n), e0(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Me = "useImperativeHandle", kn(), Id(l), sS(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Me = "useInsertionEffect", kn(), Id(n), lS(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Me = "useLayoutEffect", kn(), Id(n), oS(e, n);
        },
        useMemo: function(e, n) {
          Me = "useMemo", kn(), Id(n);
          var l = dt.current;
          dt.current = Uo;
          try {
            return cS(e, n);
          } finally {
            dt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Me = "useReducer", kn();
          var o = dt.current;
          dt.current = Uo;
          try {
            return Jg(e, n, l);
          } finally {
            dt.current = o;
          }
        },
        useRef: function(e) {
          return Me = "useRef", kn(), iS(e);
        },
        useState: function(e) {
          Me = "useState", kn();
          var n = dt.current;
          dt.current = Uo;
          try {
            return Ky(e);
          } finally {
            dt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Me = "useDebugValue", kn(), void 0;
        },
        useDeferredValue: function(e) {
          return Me = "useDeferredValue", kn(), fS(e);
        },
        useTransition: function() {
          return Me = "useTransition", kn(), dS();
        },
        useMutableSource: function(e, n, l) {
          return Me = "useMutableSource", kn(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Me = "useSyncExternalStore", kn(), nS(e, n, l);
        },
        useId: function() {
          return Me = "useId", kn(), pS();
        },
        unstable_isNewReconciler: ae
      }, pE = {
        readContext: function(e) {
          return Pr(e);
        },
        useCallback: function(e, n) {
          return Me = "useCallback", tt(), uS(e, n);
        },
        useContext: function(e) {
          return Me = "useContext", tt(), Pr(e);
        },
        useEffect: function(e, n) {
          return Me = "useEffect", tt(), e0(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Me = "useImperativeHandle", tt(), sS(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Me = "useInsertionEffect", tt(), lS(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Me = "useLayoutEffect", tt(), oS(e, n);
        },
        useMemo: function(e, n) {
          Me = "useMemo", tt();
          var l = dt.current;
          dt.current = Uo;
          try {
            return cS(e, n);
          } finally {
            dt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Me = "useReducer", tt();
          var o = dt.current;
          dt.current = Uo;
          try {
            return Jg(e, n, l);
          } finally {
            dt.current = o;
          }
        },
        useRef: function(e) {
          return Me = "useRef", tt(), iS(e);
        },
        useState: function(e) {
          Me = "useState", tt();
          var n = dt.current;
          dt.current = Uo;
          try {
            return Ky(e);
          } finally {
            dt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Me = "useDebugValue", tt(), void 0;
        },
        useDeferredValue: function(e) {
          return Me = "useDeferredValue", tt(), fS(e);
        },
        useTransition: function() {
          return Me = "useTransition", tt(), dS();
        },
        useMutableSource: function(e, n, l) {
          return Me = "useMutableSource", tt(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Me = "useSyncExternalStore", tt(), nS(e, n, l);
        },
        useId: function() {
          return Me = "useId", tt(), pS();
        },
        unstable_isNewReconciler: ae
      }, vE = {
        readContext: function(e) {
          return Pr(e);
        },
        useCallback: function(e, n) {
          return Me = "useCallback", tt(), i0(e, n);
        },
        useContext: function(e) {
          return Me = "useContext", tt(), Pr(e);
        },
        useEffect: function(e, n) {
          return Me = "useEffect", tt(), Kv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Me = "useImperativeHandle", tt(), r0(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Me = "useInsertionEffect", tt(), t0(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Me = "useLayoutEffect", tt(), n0(e, n);
        },
        useMemo: function(e, n) {
          Me = "useMemo", tt();
          var l = dt.current;
          dt.current = Bl;
          try {
            return l0(e, n);
          } finally {
            dt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Me = "useReducer", tt();
          var o = dt.current;
          dt.current = Bl;
          try {
            return eS(e, n, l);
          } finally {
            dt.current = o;
          }
        },
        useRef: function(e) {
          return Me = "useRef", tt(), Zy();
        },
        useState: function(e) {
          Me = "useState", tt();
          var n = dt.current;
          dt.current = Bl;
          try {
            return rS(e);
          } finally {
            dt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Me = "useDebugValue", tt(), a0();
        },
        useDeferredValue: function(e) {
          return Me = "useDeferredValue", tt(), nE(e);
        },
        useTransition: function() {
          return Me = "useTransition", tt(), iE();
        },
        useMutableSource: function(e, n, l) {
          return Me = "useMutableSource", tt(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Me = "useSyncExternalStore", tt(), Xy(e, n);
        },
        useId: function() {
          return Me = "useId", tt(), o0();
        },
        unstable_isNewReconciler: ae
      }, hE = {
        readContext: function(e) {
          return Pr(e);
        },
        useCallback: function(e, n) {
          return Me = "useCallback", tt(), i0(e, n);
        },
        useContext: function(e) {
          return Me = "useContext", tt(), Pr(e);
        },
        useEffect: function(e, n) {
          return Me = "useEffect", tt(), Kv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Me = "useImperativeHandle", tt(), r0(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Me = "useInsertionEffect", tt(), t0(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Me = "useLayoutEffect", tt(), n0(e, n);
        },
        useMemo: function(e, n) {
          Me = "useMemo", tt();
          var l = dt.current;
          dt.current = u0;
          try {
            return l0(e, n);
          } finally {
            dt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Me = "useReducer", tt();
          var o = dt.current;
          dt.current = u0;
          try {
            return tS(e, n, l);
          } finally {
            dt.current = o;
          }
        },
        useRef: function(e) {
          return Me = "useRef", tt(), Zy();
        },
        useState: function(e) {
          Me = "useState", tt();
          var n = dt.current;
          dt.current = u0;
          try {
            return aS(e);
          } finally {
            dt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Me = "useDebugValue", tt(), a0();
        },
        useDeferredValue: function(e) {
          return Me = "useDeferredValue", tt(), rE(e);
        },
        useTransition: function() {
          return Me = "useTransition", tt(), lE();
        },
        useMutableSource: function(e, n, l) {
          return Me = "useMutableSource", tt(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Me = "useSyncExternalStore", tt(), Xy(e, n);
        },
        useId: function() {
          return Me = "useId", tt(), o0();
        },
        unstable_isNewReconciler: ae
      }, Uo = {
        readContext: function(e) {
          return vS(), Pr(e);
        },
        useCallback: function(e, n) {
          return Me = "useCallback", Xt(), kn(), uS(e, n);
        },
        useContext: function(e) {
          return Me = "useContext", Xt(), kn(), Pr(e);
        },
        useEffect: function(e, n) {
          return Me = "useEffect", Xt(), kn(), e0(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Me = "useImperativeHandle", Xt(), kn(), sS(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Me = "useInsertionEffect", Xt(), kn(), lS(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Me = "useLayoutEffect", Xt(), kn(), oS(e, n);
        },
        useMemo: function(e, n) {
          Me = "useMemo", Xt(), kn();
          var l = dt.current;
          dt.current = Uo;
          try {
            return cS(e, n);
          } finally {
            dt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Me = "useReducer", Xt(), kn();
          var o = dt.current;
          dt.current = Uo;
          try {
            return Jg(e, n, l);
          } finally {
            dt.current = o;
          }
        },
        useRef: function(e) {
          return Me = "useRef", Xt(), kn(), iS(e);
        },
        useState: function(e) {
          Me = "useState", Xt(), kn();
          var n = dt.current;
          dt.current = Uo;
          try {
            return Ky(e);
          } finally {
            dt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Me = "useDebugValue", Xt(), kn(), void 0;
        },
        useDeferredValue: function(e) {
          return Me = "useDeferredValue", Xt(), kn(), fS(e);
        },
        useTransition: function() {
          return Me = "useTransition", Xt(), kn(), dS();
        },
        useMutableSource: function(e, n, l) {
          return Me = "useMutableSource", Xt(), kn(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Me = "useSyncExternalStore", Xt(), kn(), nS(e, n, l);
        },
        useId: function() {
          return Me = "useId", Xt(), kn(), pS();
        },
        unstable_isNewReconciler: ae
      }, Bl = {
        readContext: function(e) {
          return vS(), Pr(e);
        },
        useCallback: function(e, n) {
          return Me = "useCallback", Xt(), tt(), i0(e, n);
        },
        useContext: function(e) {
          return Me = "useContext", Xt(), tt(), Pr(e);
        },
        useEffect: function(e, n) {
          return Me = "useEffect", Xt(), tt(), Kv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Me = "useImperativeHandle", Xt(), tt(), r0(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Me = "useInsertionEffect", Xt(), tt(), t0(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Me = "useLayoutEffect", Xt(), tt(), n0(e, n);
        },
        useMemo: function(e, n) {
          Me = "useMemo", Xt(), tt();
          var l = dt.current;
          dt.current = Bl;
          try {
            return l0(e, n);
          } finally {
            dt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Me = "useReducer", Xt(), tt();
          var o = dt.current;
          dt.current = Bl;
          try {
            return eS(e, n, l);
          } finally {
            dt.current = o;
          }
        },
        useRef: function(e) {
          return Me = "useRef", Xt(), tt(), Zy();
        },
        useState: function(e) {
          Me = "useState", Xt(), tt();
          var n = dt.current;
          dt.current = Bl;
          try {
            return rS(e);
          } finally {
            dt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Me = "useDebugValue", Xt(), tt(), a0();
        },
        useDeferredValue: function(e) {
          return Me = "useDeferredValue", Xt(), tt(), nE(e);
        },
        useTransition: function() {
          return Me = "useTransition", Xt(), tt(), iE();
        },
        useMutableSource: function(e, n, l) {
          return Me = "useMutableSource", Xt(), tt(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Me = "useSyncExternalStore", Xt(), tt(), Xy(e, n);
        },
        useId: function() {
          return Me = "useId", Xt(), tt(), o0();
        },
        unstable_isNewReconciler: ae
      }, u0 = {
        readContext: function(e) {
          return vS(), Pr(e);
        },
        useCallback: function(e, n) {
          return Me = "useCallback", Xt(), tt(), i0(e, n);
        },
        useContext: function(e) {
          return Me = "useContext", Xt(), tt(), Pr(e);
        },
        useEffect: function(e, n) {
          return Me = "useEffect", Xt(), tt(), Kv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Me = "useImperativeHandle", Xt(), tt(), r0(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Me = "useInsertionEffect", Xt(), tt(), t0(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Me = "useLayoutEffect", Xt(), tt(), n0(e, n);
        },
        useMemo: function(e, n) {
          Me = "useMemo", Xt(), tt();
          var l = dt.current;
          dt.current = Bl;
          try {
            return l0(e, n);
          } finally {
            dt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Me = "useReducer", Xt(), tt();
          var o = dt.current;
          dt.current = Bl;
          try {
            return tS(e, n, l);
          } finally {
            dt.current = o;
          }
        },
        useRef: function(e) {
          return Me = "useRef", Xt(), tt(), Zy();
        },
        useState: function(e) {
          Me = "useState", Xt(), tt();
          var n = dt.current;
          dt.current = Bl;
          try {
            return aS(e);
          } finally {
            dt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Me = "useDebugValue", Xt(), tt(), a0();
        },
        useDeferredValue: function(e) {
          return Me = "useDeferredValue", Xt(), tt(), rE(e);
        },
        useTransition: function() {
          return Me = "useTransition", Xt(), tt(), lE();
        },
        useMutableSource: function(e, n, l) {
          return Me = "useMutableSource", Xt(), tt(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Me = "useSyncExternalStore", Xt(), tt(), Xy(e, n);
        },
        useId: function() {
          return Me = "useId", Xt(), tt(), o0();
        },
        unstable_isNewReconciler: ae
      };
    }
    var _u = a.unstable_now, mE = 0, c0 = -1, Zv = -1, f0 = -1, hS = !1, d0 = !1;
    function yE() {
      return hS;
    }
    function JM() {
      d0 = !0;
    }
    function e_() {
      hS = !1, d0 = !1;
    }
    function t_() {
      hS = d0, d0 = !1;
    }
    function gE() {
      return mE;
    }
    function SE() {
      mE = _u();
    }
    function mS(e) {
      Zv = _u(), e.actualStartTime < 0 && (e.actualStartTime = _u());
    }
    function xE(e) {
      Zv = -1;
    }
    function p0(e, n) {
      if (Zv >= 0) {
        var l = _u() - Zv;
        e.actualDuration += l, n && (e.selfBaseDuration = l), Zv = -1;
      }
    }
    function jo(e) {
      if (c0 >= 0) {
        var n = _u() - c0;
        c0 = -1;
        for (var l = e.return; l !== null; ) {
          switch (l.tag) {
            case b:
              var o = l.stateNode;
              o.effectDuration += n;
              return;
            case F:
              var c = l.stateNode;
              c.effectDuration += n;
              return;
          }
          l = l.return;
        }
      }
    }
    function yS(e) {
      if (f0 >= 0) {
        var n = _u() - f0;
        f0 = -1;
        for (var l = e.return; l !== null; ) {
          switch (l.tag) {
            case b:
              var o = l.stateNode;
              o !== null && (o.passiveEffectDuration += n);
              return;
            case F:
              var c = l.stateNode;
              c !== null && (c.passiveEffectDuration += n);
              return;
          }
          l = l.return;
        }
      }
    }
    function Fo() {
      c0 = _u();
    }
    function gS() {
      f0 = _u();
    }
    function SS(e) {
      for (var n = e.child; n; )
        e.actualDuration += n.actualDuration, n = n.sibling;
    }
    function Gl(e, n) {
      if (e && e.defaultProps) {
        var l = Qt({}, n), o = e.defaultProps;
        for (var c in o)
          l[c] === void 0 && (l[c] = o[c]);
        return l;
      }
      return n;
    }
    var xS = {}, ES, wS, CS, bS, TS, EE, v0, RS, MS, _S, Jv;
    {
      ES = /* @__PURE__ */ new Set(), wS = /* @__PURE__ */ new Set(), CS = /* @__PURE__ */ new Set(), bS = /* @__PURE__ */ new Set(), RS = /* @__PURE__ */ new Set(), TS = /* @__PURE__ */ new Set(), MS = /* @__PURE__ */ new Set(), _S = /* @__PURE__ */ new Set(), Jv = /* @__PURE__ */ new Set();
      var wE = /* @__PURE__ */ new Set();
      v0 = function(e, n) {
        if (!(e === null || typeof e == "function")) {
          var l = n + "_" + e;
          wE.has(l) || (wE.add(l), v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", n, e));
        }
      }, EE = function(e, n) {
        if (n === void 0) {
          var l = Sn(e) || "Component";
          TS.has(l) || (TS.add(l), v("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", l));
        }
      }, Object.defineProperty(xS, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(xS);
    }
    function DS(e, n, l, o) {
      var c = e.memoizedState, h = l(o, c);
      {
        if (e.mode & zn) {
          nr(!0);
          try {
            h = l(o, c);
          } finally {
            nr(!1);
          }
        }
        EE(n, h);
      }
      var x = h == null ? c : Qt({}, c, h);
      if (e.memoizedState = x, e.lanes === Ae) {
        var T = e.updateQueue;
        T.baseState = x;
      }
    }
    var kS = {
      isMounted: Em,
      enqueueSetState: function(e, n, l) {
        var o = ru(e), c = ti(), h = Au(o), x = _s(c, h);
        x.payload = n, l != null && (v0(l, "setState"), x.callback = l);
        var T = bu(o, x, h);
        T !== null && (Jr(T, o, h, c), Iy(T, o, h)), hc(o, h);
      },
      enqueueReplaceState: function(e, n, l) {
        var o = ru(e), c = ti(), h = Au(o), x = _s(c, h);
        x.tag = Px, x.payload = n, l != null && (v0(l, "replaceState"), x.callback = l);
        var T = bu(o, x, h);
        T !== null && (Jr(T, o, h, c), Iy(T, o, h)), hc(o, h);
      },
      enqueueForceUpdate: function(e, n) {
        var l = ru(e), o = ti(), c = Au(l), h = _s(o, c);
        h.tag = $y, n != null && (v0(n, "forceUpdate"), h.callback = n);
        var x = bu(l, h, c);
        x !== null && (Jr(x, l, c, o), Iy(x, l, c)), Vf(l, c);
      }
    };
    function CE(e, n, l, o, c, h, x) {
      var T = e.stateNode;
      if (typeof T.shouldComponentUpdate == "function") {
        var M = T.shouldComponentUpdate(o, h, x);
        {
          if (e.mode & zn) {
            nr(!0);
            try {
              M = T.shouldComponentUpdate(o, h, x);
            } finally {
              nr(!1);
            }
          }
          M === void 0 && v("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Sn(n) || "Component");
        }
        return M;
      }
      return n.prototype && n.prototype.isPureReactComponent ? !xt(l, o) || !xt(c, h) : !0;
    }
    function n_(e, n, l) {
      var o = e.stateNode;
      {
        var c = Sn(n) || "Component", h = o.render;
        h || (n.prototype && typeof n.prototype.render == "function" ? v("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", c) : v("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", c)), o.getInitialState && !o.getInitialState.isReactClassApproved && !o.state && v("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", c), o.getDefaultProps && !o.getDefaultProps.isReactClassApproved && v("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", c), o.propTypes && v("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", c), o.contextType && v("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", c), n.childContextTypes && !Jv.has(n) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & zn) === kt && (Jv.add(n), v(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), n.contextTypes && !Jv.has(n) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & zn) === kt && (Jv.add(n), v(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), o.contextTypes && v("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", c), n.contextType && n.contextTypes && !MS.has(n) && (MS.add(n), v("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", c)), typeof o.componentShouldUpdate == "function" && v("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", c), n.prototype && n.prototype.isPureReactComponent && typeof o.shouldComponentUpdate < "u" && v("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Sn(n) || "A pure component"), typeof o.componentDidUnmount == "function" && v("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", c), typeof o.componentDidReceiveProps == "function" && v("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", c), typeof o.componentWillRecieveProps == "function" && v("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", c), typeof o.UNSAFE_componentWillRecieveProps == "function" && v("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", c);
        var x = o.props !== l;
        o.props !== void 0 && x && v("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", c, c), o.defaultProps && v("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", c, c), typeof o.getSnapshotBeforeUpdate == "function" && typeof o.componentDidUpdate != "function" && !CS.has(n) && (CS.add(n), v("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Sn(n))), typeof o.getDerivedStateFromProps == "function" && v("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof o.getDerivedStateFromError == "function" && v("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof n.getSnapshotBeforeUpdate == "function" && v("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", c);
        var T = o.state;
        T && (typeof T != "object" || rn(T)) && v("%s.state: must be set to an object or null", c), typeof o.getChildContext == "function" && typeof n.childContextTypes != "object" && v("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", c);
      }
    }
    function bE(e, n) {
      n.updater = kS, e.stateNode = n, ns(n, e), n._reactInternalInstance = xS;
    }
    function TE(e, n, l) {
      var o = !1, c = Hi, h = Hi, x = n.contextType;
      if ("contextType" in n) {
        var T = (
          // Allow null for conditional declaration
          x === null || x !== void 0 && x.$$typeof === B && x._context === void 0
        );
        if (!T && !_S.has(n)) {
          _S.add(n);
          var M = "";
          x === void 0 ? M = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof x != "object" ? M = " However, it is set to a " + typeof x + "." : x.$$typeof === Nr ? M = " Did you accidentally pass the Context.Provider instead?" : x._context !== void 0 ? M = " Did you accidentally pass the Context.Consumer instead?" : M = " However, it is set to an object with keys {" + Object.keys(x).join(", ") + "}.", v("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Sn(n) || "Component", M);
        }
      }
      if (typeof x == "object" && x !== null)
        h = Pr(x);
      else {
        c = Od(e, n, !0);
        var N = n.contextTypes;
        o = N != null, h = o ? Ad(e, c) : Hi;
      }
      var z = new n(l, h);
      if (e.mode & zn) {
        nr(!0);
        try {
          z = new n(l, h);
        } finally {
          nr(!1);
        }
      }
      var te = e.memoizedState = z.state !== null && z.state !== void 0 ? z.state : null;
      bE(e, z);
      {
        if (typeof n.getDerivedStateFromProps == "function" && te === null) {
          var J = Sn(n) || "Component";
          wS.has(J) || (wS.add(J), v("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", J, z.state === null ? "null" : "undefined", J));
        }
        if (typeof n.getDerivedStateFromProps == "function" || typeof z.getSnapshotBeforeUpdate == "function") {
          var he = null, ge = null, we = null;
          if (typeof z.componentWillMount == "function" && z.componentWillMount.__suppressDeprecationWarning !== !0 ? he = "componentWillMount" : typeof z.UNSAFE_componentWillMount == "function" && (he = "UNSAFE_componentWillMount"), typeof z.componentWillReceiveProps == "function" && z.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? ge = "componentWillReceiveProps" : typeof z.UNSAFE_componentWillReceiveProps == "function" && (ge = "UNSAFE_componentWillReceiveProps"), typeof z.componentWillUpdate == "function" && z.componentWillUpdate.__suppressDeprecationWarning !== !0 ? we = "componentWillUpdate" : typeof z.UNSAFE_componentWillUpdate == "function" && (we = "UNSAFE_componentWillUpdate"), he !== null || ge !== null || we !== null) {
            var lt = Sn(n) || "Component", Nt = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            bS.has(lt) || (bS.add(lt), v(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, lt, Nt, he !== null ? `
  ` + he : "", ge !== null ? `
  ` + ge : "", we !== null ? `
  ` + we : ""));
          }
        }
      }
      return o && vx(e, c, h), z;
    }
    function r_(e, n) {
      var l = n.state;
      typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), l !== n.state && (v("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Gt(e) || "Component"), kS.enqueueReplaceState(n, n.state, null));
    }
    function RE(e, n, l, o) {
      var c = n.state;
      if (typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(l, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(l, o), n.state !== c) {
        {
          var h = Gt(e) || "Component";
          ES.has(h) || (ES.add(h), v("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", h));
        }
        kS.enqueueReplaceState(n, n.state, null);
      }
    }
    function OS(e, n, l, o) {
      n_(e, n, l);
      var c = e.stateNode;
      c.props = l, c.state = e.memoizedState, c.refs = {}, $g(e);
      var h = n.contextType;
      if (typeof h == "object" && h !== null)
        c.context = Pr(h);
      else {
        var x = Od(e, n, !0);
        c.context = Ad(e, x);
      }
      {
        if (c.state === l) {
          var T = Sn(n) || "Component";
          RS.has(T) || (RS.add(T), v("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", T));
        }
        e.mode & zn && Yl.recordLegacyContextWarning(e, c), Yl.recordUnsafeLifecycleWarnings(e, c);
      }
      c.state = e.memoizedState;
      var M = n.getDerivedStateFromProps;
      if (typeof M == "function" && (DS(e, n, M, l), c.state = e.memoizedState), typeof n.getDerivedStateFromProps != "function" && typeof c.getSnapshotBeforeUpdate != "function" && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (r_(e, c), qy(e, l, c, o), c.state = e.memoizedState), typeof c.componentDidMount == "function") {
        var N = vn;
        N |= Nl, (e.mode & Tn) !== kt && (N |= mo), e.flags |= N;
      }
    }
    function a_(e, n, l, o) {
      var c = e.stateNode, h = e.memoizedProps;
      c.props = h;
      var x = c.context, T = n.contextType, M = Hi;
      if (typeof T == "object" && T !== null)
        M = Pr(T);
      else {
        var N = Od(e, n, !0);
        M = Ad(e, N);
      }
      var z = n.getDerivedStateFromProps, te = typeof z == "function" || typeof c.getSnapshotBeforeUpdate == "function";
      !te && (typeof c.UNSAFE_componentWillReceiveProps == "function" || typeof c.componentWillReceiveProps == "function") && (h !== l || x !== M) && RE(e, c, l, M), Hx();
      var J = e.memoizedState, he = c.state = J;
      if (qy(e, l, c, o), he = e.memoizedState, h === l && J === he && !Ty() && !Yy()) {
        if (typeof c.componentDidMount == "function") {
          var ge = vn;
          ge |= Nl, (e.mode & Tn) !== kt && (ge |= mo), e.flags |= ge;
        }
        return !1;
      }
      typeof z == "function" && (DS(e, n, z, l), he = e.memoizedState);
      var we = Yy() || CE(e, n, h, l, J, he, M);
      if (we) {
        if (!te && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function") {
          var lt = vn;
          lt |= Nl, (e.mode & Tn) !== kt && (lt |= mo), e.flags |= lt;
        }
      } else {
        if (typeof c.componentDidMount == "function") {
          var Nt = vn;
          Nt |= Nl, (e.mode & Tn) !== kt && (Nt |= mo), e.flags |= Nt;
        }
        e.memoizedProps = l, e.memoizedState = he;
      }
      return c.props = l, c.state = he, c.context = M, we;
    }
    function i_(e, n, l, o, c) {
      var h = n.stateNode;
      $x(e, n);
      var x = n.memoizedProps, T = n.type === n.elementType ? x : Gl(n.type, x);
      h.props = T;
      var M = n.pendingProps, N = h.context, z = l.contextType, te = Hi;
      if (typeof z == "object" && z !== null)
        te = Pr(z);
      else {
        var J = Od(n, l, !0);
        te = Ad(n, J);
      }
      var he = l.getDerivedStateFromProps, ge = typeof he == "function" || typeof h.getSnapshotBeforeUpdate == "function";
      !ge && (typeof h.UNSAFE_componentWillReceiveProps == "function" || typeof h.componentWillReceiveProps == "function") && (x !== M || N !== te) && RE(n, h, o, te), Hx();
      var we = n.memoizedState, lt = h.state = we;
      if (qy(n, o, h, c), lt = n.memoizedState, x === M && we === lt && !Ty() && !Yy() && !fe)
        return typeof h.componentDidUpdate == "function" && (x !== e.memoizedProps || we !== e.memoizedState) && (n.flags |= vn), typeof h.getSnapshotBeforeUpdate == "function" && (x !== e.memoizedProps || we !== e.memoizedState) && (n.flags |= Dr), !1;
      typeof he == "function" && (DS(n, l, he, o), lt = n.memoizedState);
      var Nt = Yy() || CE(n, l, T, o, we, lt, te) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      fe;
      return Nt ? (!ge && (typeof h.UNSAFE_componentWillUpdate == "function" || typeof h.componentWillUpdate == "function") && (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, lt, te), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(o, lt, te)), typeof h.componentDidUpdate == "function" && (n.flags |= vn), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= Dr)) : (typeof h.componentDidUpdate == "function" && (x !== e.memoizedProps || we !== e.memoizedState) && (n.flags |= vn), typeof h.getSnapshotBeforeUpdate == "function" && (x !== e.memoizedProps || we !== e.memoizedState) && (n.flags |= Dr), n.memoizedProps = o, n.memoizedState = lt), h.props = o, h.state = lt, h.context = te, Nt;
    }
    function ef(e, n) {
      return {
        value: e,
        source: n,
        stack: _l(n),
        digest: null
      };
    }
    function AS(e, n, l) {
      return {
        value: e,
        source: null,
        stack: l ?? null,
        digest: n ?? null
      };
    }
    function l_(e, n) {
      return !0;
    }
    function LS(e, n) {
      try {
        var l = l_(e, n);
        if (l === !1)
          return;
        var o = n.value, c = n.source, h = n.stack, x = h !== null ? h : "";
        if (o != null && o._suppressLogging) {
          if (e.tag === E)
            return;
          console.error(o);
        }
        var T = c ? Gt(c) : null, M = T ? "The above error occurred in the <" + T + "> component:" : "The above error occurred in one of your React components:", N;
        if (e.tag === b)
          N = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var z = Gt(e) || "Anonymous";
          N = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + z + ".");
        }
        var te = M + `
` + x + `

` + ("" + N);
        console.error(te);
      } catch (J) {
        setTimeout(function() {
          throw J;
        });
      }
    }
    var o_ = typeof WeakMap == "function" ? WeakMap : Map;
    function ME(e, n, l) {
      var o = _s(Pn, l);
      o.tag = Fg, o.payload = {
        element: null
      };
      var c = n.value;
      return o.callback = function() {
        JD(c), LS(e, n);
      }, o;
    }
    function NS(e, n, l) {
      var o = _s(Pn, l);
      o.tag = Fg;
      var c = e.type.getDerivedStateFromError;
      if (typeof c == "function") {
        var h = n.value;
        o.payload = function() {
          return c(h);
        }, o.callback = function() {
          Fw(e), LS(e, n);
        };
      }
      var x = e.stateNode;
      return x !== null && typeof x.componentDidCatch == "function" && (o.callback = function() {
        Fw(e), LS(e, n), typeof c != "function" && KD(this);
        var M = n.value, N = n.stack;
        this.componentDidCatch(M, {
          componentStack: N !== null ? N : ""
        }), typeof c != "function" && (Ua(e.lanes, Pt) || v("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Gt(e) || "Unknown"));
      }), o;
    }
    function _E(e, n, l) {
      var o = e.pingCache, c;
      if (o === null ? (o = e.pingCache = new o_(), c = /* @__PURE__ */ new Set(), o.set(n, c)) : (c = o.get(n), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(n, c))), !c.has(l)) {
        c.add(l);
        var h = ek.bind(null, e, n, l);
        Na && mh(e, l), n.then(h, h);
      }
    }
    function s_(e, n, l, o) {
      var c = e.updateQueue;
      if (c === null) {
        var h = /* @__PURE__ */ new Set();
        h.add(l), e.updateQueue = h;
      } else
        c.add(l);
    }
    function u_(e, n) {
      var l = e.tag;
      if ((e.mode & ln) === kt && (l === S || l === $ || l === Y)) {
        var o = e.alternate;
        o ? (e.updateQueue = o.updateQueue, e.memoizedState = o.memoizedState, e.lanes = o.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function DE(e) {
      var n = e;
      do {
        if (n.tag === H && IM(n))
          return n;
        n = n.return;
      } while (n !== null);
      return null;
    }
    function kE(e, n, l, o, c) {
      if ((e.mode & ln) === kt) {
        if (e === n)
          e.flags |= zr;
        else {
          if (e.flags |= _t, l.flags |= Nf, l.flags &= -52805, l.tag === E) {
            var h = l.alternate;
            if (h === null)
              l.tag = Q;
            else {
              var x = _s(Pn, Pt);
              x.tag = $y, bu(l, x, Pt);
            }
          }
          l.lanes = Jt(l.lanes, Pt);
        }
        return e;
      }
      return e.flags |= zr, e.lanes = c, e;
    }
    function c_(e, n, l, o, c) {
      if (l.flags |= uc, Na && mh(e, c), o !== null && typeof o == "object" && typeof o.then == "function") {
        var h = o;
        u_(l), ga() && l.mode & ln && Ex();
        var x = DE(n);
        if (x !== null) {
          x.flags &= ~ea, kE(x, n, l, e, c), x.mode & ln && _E(e, h, c), s_(x, e, h);
          return;
        } else {
          if (!Dm(c)) {
            _E(e, h, c), p2();
            return;
          }
          var T = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          o = T;
        }
      } else if (ga() && l.mode & ln) {
        Ex();
        var M = DE(n);
        if (M !== null) {
          (M.flags & zr) === Dt && (M.flags |= ea), kE(M, n, l, e, c), Rg(ef(o, l));
          return;
        }
      }
      o = ef(o, l), ID(o);
      var N = n;
      do {
        switch (N.tag) {
          case b: {
            var z = o;
            N.flags |= zr;
            var te = bc(c);
            N.lanes = Jt(N.lanes, te);
            var J = ME(N, z, te);
            Hg(N, J);
            return;
          }
          case E:
            var he = o, ge = N.type, we = N.stateNode;
            if ((N.flags & _t) === Dt && (typeof ge.getDerivedStateFromError == "function" || we !== null && typeof we.componentDidCatch == "function" && !Dw(we))) {
              N.flags |= zr;
              var lt = bc(c);
              N.lanes = Jt(N.lanes, lt);
              var Nt = NS(N, he, lt);
              Hg(N, Nt);
              return;
            }
            break;
        }
        N = N.return;
      } while (N !== null);
    }
    function f_() {
      return null;
    }
    var eh = s.ReactCurrentOwner, Ql = !1, zS, th, US, jS, FS, tf, PS, h0, nh;
    zS = {}, th = {}, US = {}, jS = {}, FS = {}, tf = !1, PS = {}, h0 = {}, nh = {};
    function Ja(e, n, l, o) {
      e === null ? n.child = Lx(n, null, l, o) : n.child = Ud(n, e.child, l, o);
    }
    function d_(e, n, l, o) {
      n.child = Ud(n, e.child, null, o), n.child = Ud(n, null, l, o);
    }
    function OE(e, n, l, o, c) {
      if (n.type !== n.elementType) {
        var h = l.propTypes;
        h && Il(
          h,
          o,
          // Resolved props
          "prop",
          Sn(l)
        );
      }
      var x = l.render, T = n.ref, M, N;
      Fd(n, c), Qa(n);
      {
        if (eh.current = n, _r(!0), M = qd(e, n, x, o, T, c), N = Yd(), n.mode & zn) {
          nr(!0);
          try {
            M = qd(e, n, x, o, T, c), N = Yd();
          } finally {
            nr(!1);
          }
        }
        _r(!1);
      }
      return Xa(), e !== null && !Ql ? (Bx(e, n, c), Ds(e, n, c)) : (ga() && N && xg(n), n.flags |= Ui, Ja(e, n, M, c), n.child);
    }
    function AE(e, n, l, o, c) {
      if (e === null) {
        var h = l.type;
        if (yk(h) && l.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        l.defaultProps === void 0) {
          var x = h;
          return x = Jd(h), n.tag = Y, n.type = x, VS(n, h), LE(e, n, x, o, c);
        }
        {
          var T = h.propTypes;
          if (T && Il(
            T,
            o,
            // Resolved props
            "prop",
            Sn(h)
          ), l.defaultProps !== void 0) {
            var M = Sn(h) || "Unknown";
            nh[M] || (v("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", M), nh[M] = !0);
          }
        }
        var N = b2(l.type, null, o, n, n.mode, c);
        return N.ref = n.ref, N.return = n, n.child = N, N;
      }
      {
        var z = l.type, te = z.propTypes;
        te && Il(
          te,
          o,
          // Resolved props
          "prop",
          Sn(z)
        );
      }
      var J = e.child, he = GS(e, c);
      if (!he) {
        var ge = J.memoizedProps, we = l.compare;
        if (we = we !== null ? we : xt, we(ge, o) && e.ref === n.ref)
          return Ds(e, n, c);
      }
      n.flags |= Ui;
      var lt = of(J, o);
      return lt.ref = n.ref, lt.return = n, n.child = lt, lt;
    }
    function LE(e, n, l, o, c) {
      if (n.type !== n.elementType) {
        var h = n.elementType;
        if (h.$$typeof === Ht) {
          var x = h, T = x._payload, M = x._init;
          try {
            h = M(T);
          } catch {
            h = null;
          }
          var N = h && h.propTypes;
          N && Il(
            N,
            o,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Sn(h)
          );
        }
      }
      if (e !== null) {
        var z = e.memoizedProps;
        if (xt(z, o) && e.ref === n.ref && // Prevent bailout if the implementation changed due to hot reload.
        n.type === e.type)
          if (Ql = !1, n.pendingProps = o = z, GS(e, c))
            (e.flags & Nf) !== Dt && (Ql = !0);
          else return n.lanes = e.lanes, Ds(e, n, c);
      }
      return $S(e, n, l, o, c);
    }
    function NE(e, n, l) {
      var o = n.pendingProps, c = o.children, h = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden" || ve)
        if ((n.mode & ln) === kt) {
          var x = {
            baseLanes: Ae,
            cachePool: null,
            transitions: null
          };
          n.memoizedState = x, _0(n, l);
        } else if (Ua(l, za)) {
          var te = {
            baseLanes: Ae,
            cachePool: null,
            transitions: null
          };
          n.memoizedState = te;
          var J = h !== null ? h.baseLanes : l;
          _0(n, J);
        } else {
          var T = null, M;
          if (h !== null) {
            var N = h.baseLanes;
            M = Jt(N, l);
          } else
            M = l;
          n.lanes = n.childLanes = za;
          var z = {
            baseLanes: M,
            cachePool: T,
            transitions: null
          };
          return n.memoizedState = z, n.updateQueue = null, _0(n, M), null;
        }
      else {
        var he;
        h !== null ? (he = Jt(h.baseLanes, l), n.memoizedState = null) : he = l, _0(n, he);
      }
      return Ja(e, n, c, l), n.child;
    }
    function p_(e, n, l) {
      var o = n.pendingProps;
      return Ja(e, n, o, l), n.child;
    }
    function v_(e, n, l) {
      var o = n.pendingProps.children;
      return Ja(e, n, o, l), n.child;
    }
    function h_(e, n, l) {
      {
        n.flags |= vn;
        {
          var o = n.stateNode;
          o.effectDuration = 0, o.passiveEffectDuration = 0;
        }
      }
      var c = n.pendingProps, h = c.children;
      return Ja(e, n, h, l), n.child;
    }
    function zE(e, n) {
      var l = n.ref;
      (e === null && l !== null || e !== null && e.ref !== l) && (n.flags |= or, n.flags |= iu);
    }
    function $S(e, n, l, o, c) {
      if (n.type !== n.elementType) {
        var h = l.propTypes;
        h && Il(
          h,
          o,
          // Resolved props
          "prop",
          Sn(l)
        );
      }
      var x;
      {
        var T = Od(n, l, !0);
        x = Ad(n, T);
      }
      var M, N;
      Fd(n, c), Qa(n);
      {
        if (eh.current = n, _r(!0), M = qd(e, n, l, o, x, c), N = Yd(), n.mode & zn) {
          nr(!0);
          try {
            M = qd(e, n, l, o, x, c), N = Yd();
          } finally {
            nr(!1);
          }
        }
        _r(!1);
      }
      return Xa(), e !== null && !Ql ? (Bx(e, n, c), Ds(e, n, c)) : (ga() && N && xg(n), n.flags |= Ui, Ja(e, n, M, c), n.child);
    }
    function UE(e, n, l, o, c) {
      {
        switch (Ak(n)) {
          case !1: {
            var h = n.stateNode, x = n.type, T = new x(n.memoizedProps, h.context), M = T.state;
            h.updater.enqueueSetState(h, M, null);
            break;
          }
          case !0: {
            n.flags |= _t, n.flags |= zr;
            var N = new Error("Simulated error coming from DevTools"), z = bc(c);
            n.lanes = Jt(n.lanes, z);
            var te = NS(n, ef(N, n), z);
            Hg(n, te);
            break;
          }
        }
        if (n.type !== n.elementType) {
          var J = l.propTypes;
          J && Il(
            J,
            o,
            // Resolved props
            "prop",
            Sn(l)
          );
        }
      }
      var he;
      Lo(l) ? (he = !0, My(n)) : he = !1, Fd(n, c);
      var ge = n.stateNode, we;
      ge === null ? (y0(e, n), TE(n, l, o), OS(n, l, o, c), we = !0) : e === null ? we = a_(n, l, o, c) : we = i_(e, n, l, o, c);
      var lt = HS(e, n, l, we, he, c);
      {
        var Nt = n.stateNode;
        we && Nt.props !== o && (tf || v("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Gt(n) || "a component"), tf = !0);
      }
      return lt;
    }
    function HS(e, n, l, o, c, h) {
      zE(e, n);
      var x = (n.flags & _t) !== Dt;
      if (!o && !x)
        return c && yx(n, l, !1), Ds(e, n, h);
      var T = n.stateNode;
      eh.current = n;
      var M;
      if (x && typeof l.getDerivedStateFromError != "function")
        M = null, xE();
      else {
        Qa(n);
        {
          if (_r(!0), M = T.render(), n.mode & zn) {
            nr(!0);
            try {
              T.render();
            } finally {
              nr(!1);
            }
          }
          _r(!1);
        }
        Xa();
      }
      return n.flags |= Ui, e !== null && x ? d_(e, n, M, h) : Ja(e, n, M, h), n.memoizedState = T.state, c && yx(n, l, !0), n.child;
    }
    function jE(e) {
      var n = e.stateNode;
      n.pendingContext ? hx(e, n.pendingContext, n.pendingContext !== n.context) : n.context && hx(e, n.context, !1), Vg(e, n.containerInfo);
    }
    function m_(e, n, l) {
      if (jE(n), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var o = n.pendingProps, c = n.memoizedState, h = c.element;
      $x(e, n), qy(n, o, null, l);
      var x = n.memoizedState;
      n.stateNode;
      var T = x.element;
      if (c.isDehydrated) {
        var M = {
          element: T,
          isDehydrated: !1,
          cache: x.cache,
          pendingSuspenseBoundaries: x.pendingSuspenseBoundaries,
          transitions: x.transitions
        }, N = n.updateQueue;
        if (N.baseState = M, n.memoizedState = M, n.flags & ea) {
          var z = ef(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), n);
          return FE(e, n, T, l, z);
        } else if (T !== h) {
          var te = ef(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), n);
          return FE(e, n, T, l, te);
        } else {
          SM(n);
          var J = Lx(n, null, T, l);
          n.child = J;
          for (var he = J; he; )
            he.flags = he.flags & ~tr | Oa, he = he.sibling;
        }
      } else {
        if (zd(), T === h)
          return Ds(e, n, l);
        Ja(e, n, T, l);
      }
      return n.child;
    }
    function FE(e, n, l, o, c) {
      return zd(), Rg(c), n.flags |= ea, Ja(e, n, l, o), n.child;
    }
    function y_(e, n, l) {
      qx(n), e === null && Tg(n);
      var o = n.type, c = n.pendingProps, h = e !== null ? e.memoizedProps : null, x = c.children, T = lg(o, c);
      return T ? x = null : h !== null && lg(o, h) && (n.flags |= fi), zE(e, n), Ja(e, n, x, l), n.child;
    }
    function g_(e, n) {
      return e === null && Tg(n), null;
    }
    function S_(e, n, l, o) {
      y0(e, n);
      var c = n.pendingProps, h = l, x = h._payload, T = h._init, M = T(x);
      n.type = M;
      var N = n.tag = gk(M), z = Gl(M, c), te;
      switch (N) {
        case S:
          return VS(n, M), n.type = M = Jd(M), te = $S(null, n, M, z, o), te;
        case E:
          return n.type = M = g2(M), te = UE(null, n, M, z, o), te;
        case $:
          return n.type = M = S2(M), te = OE(null, n, M, z, o), te;
        case V: {
          if (n.type !== n.elementType) {
            var J = M.propTypes;
            J && Il(
              J,
              z,
              // Resolved for outer only
              "prop",
              Sn(M)
            );
          }
          return te = AE(
            null,
            n,
            M,
            Gl(M.type, z),
            // The inner type can have defaults too
            o
          ), te;
        }
      }
      var he = "";
      throw M !== null && typeof M == "object" && M.$$typeof === Ht && (he = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + M + ". " + ("Lazy element type must resolve to a class or function." + he));
    }
    function x_(e, n, l, o, c) {
      y0(e, n), n.tag = E;
      var h;
      return Lo(l) ? (h = !0, My(n)) : h = !1, Fd(n, c), TE(n, l, o), OS(n, l, o, c), HS(null, n, l, !0, h, c);
    }
    function E_(e, n, l, o) {
      y0(e, n);
      var c = n.pendingProps, h;
      {
        var x = Od(n, l, !1);
        h = Ad(n, x);
      }
      Fd(n, o);
      var T, M;
      Qa(n);
      {
        if (l.prototype && typeof l.prototype.render == "function") {
          var N = Sn(l) || "Unknown";
          zS[N] || (v("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", N, N), zS[N] = !0);
        }
        n.mode & zn && Yl.recordLegacyContextWarning(n, null), _r(!0), eh.current = n, T = qd(null, n, l, c, h, o), M = Yd(), _r(!1);
      }
      if (Xa(), n.flags |= Ui, typeof T == "object" && T !== null && typeof T.render == "function" && T.$$typeof === void 0) {
        var z = Sn(l) || "Unknown";
        th[z] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", z, z, z), th[z] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof T == "object" && T !== null && typeof T.render == "function" && T.$$typeof === void 0
      ) {
        {
          var te = Sn(l) || "Unknown";
          th[te] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", te, te, te), th[te] = !0);
        }
        n.tag = E, n.memoizedState = null, n.updateQueue = null;
        var J = !1;
        return Lo(l) ? (J = !0, My(n)) : J = !1, n.memoizedState = T.state !== null && T.state !== void 0 ? T.state : null, $g(n), bE(n, T), OS(n, l, c, o), HS(null, n, l, !0, J, o);
      } else {
        if (n.tag = S, n.mode & zn) {
          nr(!0);
          try {
            T = qd(null, n, l, c, h, o), M = Yd();
          } finally {
            nr(!1);
          }
        }
        return ga() && M && xg(n), Ja(null, n, T, o), VS(n, l), n.child;
      }
    }
    function VS(e, n) {
      {
        if (n && n.childContextTypes && v("%s(...): childContextTypes cannot be defined on a function component.", n.displayName || n.name || "Component"), e.ref !== null) {
          var l = "", o = fa();
          o && (l += `

Check the render method of \`` + o + "`.");
          var c = o || "", h = e._debugSource;
          h && (c = h.fileName + ":" + h.lineNumber), FS[c] || (FS[c] = !0, v("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", l));
        }
        if (n.defaultProps !== void 0) {
          var x = Sn(n) || "Unknown";
          nh[x] || (v("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", x), nh[x] = !0);
        }
        if (typeof n.getDerivedStateFromProps == "function") {
          var T = Sn(n) || "Unknown";
          jS[T] || (v("%s: Function components do not support getDerivedStateFromProps.", T), jS[T] = !0);
        }
        if (typeof n.contextType == "object" && n.contextType !== null) {
          var M = Sn(n) || "Unknown";
          US[M] || (v("%s: Function components do not support contextType.", M), US[M] = !0);
        }
      }
    }
    var IS = {
      dehydrated: null,
      treeContext: null,
      retryLane: wn
    };
    function qS(e) {
      return {
        baseLanes: e,
        cachePool: f_(),
        transitions: null
      };
    }
    function w_(e, n) {
      var l = null;
      return {
        baseLanes: Jt(e.baseLanes, n),
        cachePool: l,
        transitions: e.transitions
      };
    }
    function C_(e, n, l, o) {
      if (n !== null) {
        var c = n.memoizedState;
        if (c === null)
          return !1;
      }
      return Yg(e, Yv);
    }
    function b_(e, n) {
      return Tc(e.childLanes, n);
    }
    function PE(e, n, l) {
      var o = n.pendingProps;
      Lk(n) && (n.flags |= _t);
      var c = Wl.current, h = !1, x = (n.flags & _t) !== Dt;
      if (x || C_(c, e) ? (h = !0, n.flags &= ~_t) : (e === null || e.memoizedState !== null) && (c = VM(c, Wx)), c = $d(c), Ru(n, c), e === null) {
        Tg(n);
        var T = n.memoizedState;
        if (T !== null) {
          var M = T.dehydrated;
          if (M !== null)
            return D_(n, M);
        }
        var N = o.children, z = o.fallback;
        if (h) {
          var te = T_(n, N, z, l), J = n.child;
          return J.memoizedState = qS(l), n.memoizedState = IS, te;
        } else
          return YS(n, N);
      } else {
        var he = e.memoizedState;
        if (he !== null) {
          var ge = he.dehydrated;
          if (ge !== null)
            return k_(e, n, x, o, ge, he, l);
        }
        if (h) {
          var we = o.fallback, lt = o.children, Nt = M_(e, n, lt, we, l), Mt = n.child, yn = e.child.memoizedState;
          return Mt.memoizedState = yn === null ? qS(l) : w_(yn, l), Mt.childLanes = b_(e, l), n.memoizedState = IS, Nt;
        } else {
          var dn = o.children, ue = R_(e, n, dn, l);
          return n.memoizedState = null, ue;
        }
      }
    }
    function YS(e, n, l) {
      var o = e.mode, c = {
        mode: "visible",
        children: n
      }, h = WS(c, o);
      return h.return = e, e.child = h, h;
    }
    function T_(e, n, l, o) {
      var c = e.mode, h = e.child, x = {
        mode: "hidden",
        children: n
      }, T, M;
      return (c & ln) === kt && h !== null ? (T = h, T.childLanes = Ae, T.pendingProps = x, e.mode & bn && (T.actualDuration = 0, T.actualStartTime = -1, T.selfBaseDuration = 0, T.treeBaseDuration = 0), M = Nu(l, c, o, null)) : (T = WS(x, c), M = Nu(l, c, o, null)), T.return = e, M.return = e, T.sibling = M, e.child = T, M;
    }
    function WS(e, n, l) {
      return $w(e, n, Ae, null);
    }
    function $E(e, n) {
      return of(e, n);
    }
    function R_(e, n, l, o) {
      var c = e.child, h = c.sibling, x = $E(c, {
        mode: "visible",
        children: l
      });
      if ((n.mode & ln) === kt && (x.lanes = o), x.return = n, x.sibling = null, h !== null) {
        var T = n.deletions;
        T === null ? (n.deletions = [h], n.flags |= ci) : T.push(h);
      }
      return n.child = x, x;
    }
    function M_(e, n, l, o, c) {
      var h = n.mode, x = e.child, T = x.sibling, M = {
        mode: "hidden",
        children: l
      }, N;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (h & ln) === kt && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        n.child !== x
      ) {
        var z = n.child;
        N = z, N.childLanes = Ae, N.pendingProps = M, n.mode & bn && (N.actualDuration = 0, N.actualStartTime = -1, N.selfBaseDuration = x.selfBaseDuration, N.treeBaseDuration = x.treeBaseDuration), n.deletions = null;
      } else
        N = $E(x, M), N.subtreeFlags = x.subtreeFlags & Sr;
      var te;
      return T !== null ? te = of(T, o) : (te = Nu(o, h, c, null), te.flags |= tr), te.return = n, N.return = n, N.sibling = te, n.child = N, te;
    }
    function m0(e, n, l, o) {
      o !== null && Rg(o), Ud(n, e.child, null, l);
      var c = n.pendingProps, h = c.children, x = YS(n, h);
      return x.flags |= tr, n.memoizedState = null, x;
    }
    function __(e, n, l, o, c) {
      var h = n.mode, x = {
        mode: "visible",
        children: l
      }, T = WS(x, h), M = Nu(o, h, c, null);
      return M.flags |= tr, T.return = n, M.return = n, T.sibling = M, n.child = T, (n.mode & ln) !== kt && Ud(n, e.child, null, c), M;
    }
    function D_(e, n, l) {
      return (e.mode & ln) === kt ? (v("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Pt) : cg(n) ? e.lanes = ta : e.lanes = za, null;
    }
    function k_(e, n, l, o, c, h, x) {
      if (l)
        if (n.flags & ea) {
          n.flags &= ~ea;
          var ue = AS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return m0(e, n, x, ue);
        } else {
          if (n.memoizedState !== null)
            return n.child = e.child, n.flags |= _t, null;
          var Ce = o.children, ce = o.fallback, qe = __(e, n, Ce, ce, x), pt = n.child;
          return pt.memoizedState = qS(x), n.memoizedState = IS, qe;
        }
      else {
        if (yM(), (n.mode & ln) === kt)
          return m0(
            e,
            n,
            x,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (cg(c)) {
          var T, M, N;
          {
            var z = NR(c);
            T = z.digest, M = z.message, N = z.stack;
          }
          var te;
          M ? te = new Error(M) : te = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var J = AS(te, T, N);
          return m0(e, n, x, J);
        }
        var he = Ua(x, e.childLanes);
        if (Ql || he) {
          var ge = M0();
          if (ge !== null) {
            var we = iv(ge, x);
            if (we !== wn && we !== h.retryLane) {
              h.retryLane = we;
              var lt = Pn;
              xi(e, we), Jr(ge, e, we, lt);
            }
          }
          p2();
          var Nt = AS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return m0(e, n, x, Nt);
        } else if (ux(c)) {
          n.flags |= _t, n.child = e.child;
          var Mt = tk.bind(null, e);
          return zR(c, Mt), null;
        } else {
          xM(n, c, h.treeContext);
          var yn = o.children, dn = YS(n, yn);
          return dn.flags |= Oa, dn;
        }
      }
    }
    function HE(e, n, l) {
      e.lanes = Jt(e.lanes, n);
      var o = e.alternate;
      o !== null && (o.lanes = Jt(o.lanes, n)), Ug(e.return, n, l);
    }
    function O_(e, n, l) {
      for (var o = n; o !== null; ) {
        if (o.tag === H) {
          var c = o.memoizedState;
          c !== null && HE(o, l, e);
        } else if (o.tag === ne)
          HE(o, l, e);
        else if (o.child !== null) {
          o.child.return = o, o = o.child;
          continue;
        }
        if (o === e)
          return;
        for (; o.sibling === null; ) {
          if (o.return === null || o.return === e)
            return;
          o = o.return;
        }
        o.sibling.return = o.return, o = o.sibling;
      }
    }
    function A_(e) {
      for (var n = e, l = null; n !== null; ) {
        var o = n.alternate;
        o !== null && Gy(o) === null && (l = n), n = n.sibling;
      }
      return l;
    }
    function L_(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !PS[e])
        if (PS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              v('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              v('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              v('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          v('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function N_(e, n) {
      e !== void 0 && !h0[e] && (e !== "collapsed" && e !== "hidden" ? (h0[e] = !0, v('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : n !== "forwards" && n !== "backwards" && (h0[e] = !0, v('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function VE(e, n) {
      {
        var l = rn(e), o = !l && typeof Wt(e) == "function";
        if (l || o) {
          var c = l ? "array" : "iterable";
          return v("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", c, n, c), !1;
        }
      }
      return !0;
    }
    function z_(e, n) {
      if ((n === "forwards" || n === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (rn(e)) {
          for (var l = 0; l < e.length; l++)
            if (!VE(e[l], l))
              return;
        } else {
          var o = Wt(e);
          if (typeof o == "function") {
            var c = o.call(e);
            if (c)
              for (var h = c.next(), x = 0; !h.done; h = c.next()) {
                if (!VE(h.value, x))
                  return;
                x++;
              }
          } else
            v('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', n);
        }
    }
    function BS(e, n, l, o, c) {
      var h = e.memoizedState;
      h === null ? e.memoizedState = {
        isBackwards: n,
        rendering: null,
        renderingStartTime: 0,
        last: o,
        tail: l,
        tailMode: c
      } : (h.isBackwards = n, h.rendering = null, h.renderingStartTime = 0, h.last = o, h.tail = l, h.tailMode = c);
    }
    function IE(e, n, l) {
      var o = n.pendingProps, c = o.revealOrder, h = o.tail, x = o.children;
      L_(c), N_(h, c), z_(x, c), Ja(e, n, x, l);
      var T = Wl.current, M = Yg(T, Yv);
      if (M)
        T = Wg(T, Yv), n.flags |= _t;
      else {
        var N = e !== null && (e.flags & _t) !== Dt;
        N && O_(n, n.child, l), T = $d(T);
      }
      if (Ru(n, T), (n.mode & ln) === kt)
        n.memoizedState = null;
      else
        switch (c) {
          case "forwards": {
            var z = A_(n.child), te;
            z === null ? (te = n.child, n.child = null) : (te = z.sibling, z.sibling = null), BS(
              n,
              !1,
              // isBackwards
              te,
              z,
              h
            );
            break;
          }
          case "backwards": {
            var J = null, he = n.child;
            for (n.child = null; he !== null; ) {
              var ge = he.alternate;
              if (ge !== null && Gy(ge) === null) {
                n.child = he;
                break;
              }
              var we = he.sibling;
              he.sibling = J, J = he, he = we;
            }
            BS(
              n,
              !0,
              // isBackwards
              J,
              null,
              // last
              h
            );
            break;
          }
          case "together": {
            BS(
              n,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            n.memoizedState = null;
        }
      return n.child;
    }
    function U_(e, n, l) {
      Vg(n, n.stateNode.containerInfo);
      var o = n.pendingProps;
      return e === null ? n.child = Ud(n, null, o, l) : Ja(e, n, o, l), n.child;
    }
    var qE = !1;
    function j_(e, n, l) {
      var o = n.type, c = o._context, h = n.pendingProps, x = n.memoizedProps, T = h.value;
      {
        "value" in h || qE || (qE = !0, v("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var M = n.type.propTypes;
        M && Il(M, h, "prop", "Context.Provider");
      }
      if (Ux(n, c, T), x !== null) {
        var N = x.value;
        if (je(N, T)) {
          if (x.children === h.children && !Ty())
            return Ds(e, n, l);
        } else
          LM(n, c, l);
      }
      var z = h.children;
      return Ja(e, n, z, l), n.child;
    }
    var YE = !1;
    function F_(e, n, l) {
      var o = n.type;
      o._context === void 0 ? o !== o.Consumer && (YE || (YE = !0, v("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : o = o._context;
      var c = n.pendingProps, h = c.children;
      typeof h != "function" && v("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Fd(n, l);
      var x = Pr(o);
      Qa(n);
      var T;
      return eh.current = n, _r(!0), T = h(x), _r(!1), Xa(), n.flags |= Ui, Ja(e, n, T, l), n.child;
    }
    function rh() {
      Ql = !0;
    }
    function y0(e, n) {
      (n.mode & ln) === kt && e !== null && (e.alternate = null, n.alternate = null, n.flags |= tr);
    }
    function Ds(e, n, l) {
      return e !== null && (n.dependencies = e.dependencies), xE(), hh(n.lanes), Ua(l, n.childLanes) ? (OM(e, n), n.child) : null;
    }
    function P_(e, n, l) {
      {
        var o = n.return;
        if (o === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, n.alternate = null, l.index = n.index, l.sibling = n.sibling, l.return = n.return, l.ref = n.ref, n === o.child)
          o.child = l;
        else {
          var c = o.child;
          if (c === null)
            throw new Error("Expected parent to have a child.");
          for (; c.sibling !== n; )
            if (c = c.sibling, c === null)
              throw new Error("Expected to find the previous sibling.");
          c.sibling = l;
        }
        var h = o.deletions;
        return h === null ? (o.deletions = [e], o.flags |= ci) : h.push(e), l.flags |= tr, l;
      }
    }
    function GS(e, n) {
      var l = e.lanes;
      return !!Ua(l, n);
    }
    function $_(e, n, l) {
      switch (n.tag) {
        case b:
          jE(n), n.stateNode, zd();
          break;
        case D:
          qx(n);
          break;
        case E: {
          var o = n.type;
          Lo(o) && My(n);
          break;
        }
        case R:
          Vg(n, n.stateNode.containerInfo);
          break;
        case q: {
          var c = n.memoizedProps.value, h = n.type._context;
          Ux(n, h, c);
          break;
        }
        case F:
          {
            var x = Ua(l, n.childLanes);
            x && (n.flags |= vn);
            {
              var T = n.stateNode;
              T.effectDuration = 0, T.passiveEffectDuration = 0;
            }
          }
          break;
        case H: {
          var M = n.memoizedState;
          if (M !== null) {
            if (M.dehydrated !== null)
              return Ru(n, $d(Wl.current)), n.flags |= _t, null;
            var N = n.child, z = N.childLanes;
            if (Ua(l, z))
              return PE(e, n, l);
            Ru(n, $d(Wl.current));
            var te = Ds(e, n, l);
            return te !== null ? te.sibling : null;
          } else
            Ru(n, $d(Wl.current));
          break;
        }
        case ne: {
          var J = (e.flags & _t) !== Dt, he = Ua(l, n.childLanes);
          if (J) {
            if (he)
              return IE(e, n, l);
            n.flags |= _t;
          }
          var ge = n.memoizedState;
          if (ge !== null && (ge.rendering = null, ge.tail = null, ge.lastEffect = null), Ru(n, Wl.current), he)
            break;
          return null;
        }
        case G:
        case Z:
          return n.lanes = Ae, NE(e, n, l);
      }
      return Ds(e, n, l);
    }
    function WE(e, n, l) {
      if (n._debugNeedsRemount && e !== null)
        return P_(e, n, b2(n.type, n.key, n.pendingProps, n._debugOwner || null, n.mode, n.lanes));
      if (e !== null) {
        var o = e.memoizedProps, c = n.pendingProps;
        if (o !== c || Ty() || // Force a re-render if the implementation changed due to hot reload:
        n.type !== e.type)
          Ql = !0;
        else {
          var h = GS(e, l);
          if (!h && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (n.flags & _t) === Dt)
            return Ql = !1, $_(e, n, l);
          (e.flags & Nf) !== Dt ? Ql = !0 : Ql = !1;
        }
      } else if (Ql = !1, ga() && fM(n)) {
        var x = n.index, T = dM();
        xx(n, T, x);
      }
      switch (n.lanes = Ae, n.tag) {
        case C:
          return E_(e, n, n.type, l);
        case ie: {
          var M = n.elementType;
          return S_(e, n, M, l);
        }
        case S: {
          var N = n.type, z = n.pendingProps, te = n.elementType === N ? z : Gl(N, z);
          return $S(e, n, N, te, l);
        }
        case E: {
          var J = n.type, he = n.pendingProps, ge = n.elementType === J ? he : Gl(J, he);
          return UE(e, n, J, ge, l);
        }
        case b:
          return m_(e, n, l);
        case D:
          return y_(e, n, l);
        case _:
          return g_(e, n);
        case H:
          return PE(e, n, l);
        case R:
          return U_(e, n, l);
        case $: {
          var we = n.type, lt = n.pendingProps, Nt = n.elementType === we ? lt : Gl(we, lt);
          return OE(e, n, we, Nt, l);
        }
        case A:
          return p_(e, n, l);
        case L:
          return v_(e, n, l);
        case F:
          return h_(e, n, l);
        case q:
          return j_(e, n, l);
        case U:
          return F_(e, n, l);
        case V: {
          var Mt = n.type, yn = n.pendingProps, dn = Gl(Mt, yn);
          if (n.type !== n.elementType) {
            var ue = Mt.propTypes;
            ue && Il(
              ue,
              dn,
              // Resolved for outer only
              "prop",
              Sn(Mt)
            );
          }
          return dn = Gl(Mt.type, dn), AE(e, n, Mt, dn, l);
        }
        case Y:
          return LE(e, n, n.type, n.pendingProps, l);
        case Q: {
          var Ce = n.type, ce = n.pendingProps, qe = n.elementType === Ce ? ce : Gl(Ce, ce);
          return x_(e, n, Ce, qe, l);
        }
        case ne:
          return IE(e, n, l);
        case re:
          break;
        case G:
          return NE(e, n, l);
      }
      throw new Error("Unknown unit of work tag (" + n.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Wd(e) {
      e.flags |= vn;
    }
    function BE(e) {
      e.flags |= or, e.flags |= iu;
    }
    var GE, QS, QE, XE;
    GE = function(e, n, l, o) {
      for (var c = n.child; c !== null; ) {
        if (c.tag === D || c.tag === _)
          sR(e, c.stateNode);
        else if (c.tag !== R) {
          if (c.child !== null) {
            c.child.return = c, c = c.child;
            continue;
          }
        }
        if (c === n)
          return;
        for (; c.sibling === null; ) {
          if (c.return === null || c.return === n)
            return;
          c = c.return;
        }
        c.sibling.return = c.return, c = c.sibling;
      }
    }, QS = function(e, n) {
    }, QE = function(e, n, l, o, c) {
      var h = e.memoizedProps;
      if (h !== o) {
        var x = n.stateNode, T = Ig(), M = cR(x, l, h, o, c, T);
        n.updateQueue = M, M && Wd(n);
      }
    }, XE = function(e, n, l, o) {
      l !== o && Wd(n);
    };
    function ah(e, n) {
      if (!ga())
        switch (e.tailMode) {
          case "hidden": {
            for (var l = e.tail, o = null; l !== null; )
              l.alternate !== null && (o = l), l = l.sibling;
            o === null ? e.tail = null : o.sibling = null;
            break;
          }
          case "collapsed": {
            for (var c = e.tail, h = null; c !== null; )
              c.alternate !== null && (h = c), c = c.sibling;
            h === null ? !n && e.tail !== null ? e.tail.sibling = null : e.tail = null : h.sibling = null;
            break;
          }
        }
    }
    function xa(e) {
      var n = e.alternate !== null && e.alternate.child === e.child, l = Ae, o = Dt;
      if (n) {
        if ((e.mode & bn) !== kt) {
          for (var M = e.selfBaseDuration, N = e.child; N !== null; )
            l = Jt(l, Jt(N.lanes, N.childLanes)), o |= N.subtreeFlags & Sr, o |= N.flags & Sr, M += N.treeBaseDuration, N = N.sibling;
          e.treeBaseDuration = M;
        } else
          for (var z = e.child; z !== null; )
            l = Jt(l, Jt(z.lanes, z.childLanes)), o |= z.subtreeFlags & Sr, o |= z.flags & Sr, z.return = e, z = z.sibling;
        e.subtreeFlags |= o;
      } else {
        if ((e.mode & bn) !== kt) {
          for (var c = e.actualDuration, h = e.selfBaseDuration, x = e.child; x !== null; )
            l = Jt(l, Jt(x.lanes, x.childLanes)), o |= x.subtreeFlags, o |= x.flags, c += x.actualDuration, h += x.treeBaseDuration, x = x.sibling;
          e.actualDuration = c, e.treeBaseDuration = h;
        } else
          for (var T = e.child; T !== null; )
            l = Jt(l, Jt(T.lanes, T.childLanes)), o |= T.subtreeFlags, o |= T.flags, T.return = e, T = T.sibling;
        e.subtreeFlags |= o;
      }
      return e.childLanes = l, n;
    }
    function H_(e, n, l) {
      if (TM() && (n.mode & ln) !== kt && (n.flags & _t) === Dt)
        return Mx(n), zd(), n.flags |= ea | uc | zr, !1;
      var o = Ay(n);
      if (l !== null && l.dehydrated !== null)
        if (e === null) {
          if (!o)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (CM(n), xa(n), (n.mode & bn) !== kt) {
            var c = l !== null;
            if (c) {
              var h = n.child;
              h !== null && (n.treeBaseDuration -= h.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (zd(), (n.flags & _t) === Dt && (n.memoizedState = null), n.flags |= vn, xa(n), (n.mode & bn) !== kt) {
            var x = l !== null;
            if (x) {
              var T = n.child;
              T !== null && (n.treeBaseDuration -= T.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return _x(), !0;
    }
    function KE(e, n, l) {
      var o = n.pendingProps;
      switch (Eg(n), n.tag) {
        case C:
        case ie:
        case Y:
        case S:
        case $:
        case A:
        case L:
        case F:
        case U:
        case V:
          return xa(n), null;
        case E: {
          var c = n.type;
          return Lo(c) && Ry(n), xa(n), null;
        }
        case b: {
          var h = n.stateNode;
          if (Pd(n), yg(n), Gg(), h.pendingContext && (h.context = h.pendingContext, h.pendingContext = null), e === null || e.child === null) {
            var x = Ay(n);
            if (x)
              Wd(n);
            else if (e !== null) {
              var T = e.memoizedState;
              // Check if this is a client root
              (!T.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (n.flags & ea) !== Dt) && (n.flags |= Dr, _x());
            }
          }
          return QS(e, n), xa(n), null;
        }
        case D: {
          qg(n);
          var M = Ix(), N = n.type;
          if (e !== null && n.stateNode != null)
            QE(e, n, N, o, M), e.ref !== n.ref && BE(n);
          else {
            if (!o) {
              if (n.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return xa(n), null;
            }
            var z = Ig(), te = Ay(n);
            if (te)
              EM(n, M, z) && Wd(n);
            else {
              var J = oR(N, o, M, z, n);
              GE(J, n, !1, !1), n.stateNode = J, uR(J, N, o, M) && Wd(n);
            }
            n.ref !== null && BE(n);
          }
          return xa(n), null;
        }
        case _: {
          var he = o;
          if (e && n.stateNode != null) {
            var ge = e.memoizedProps;
            XE(e, n, ge, he);
          } else {
            if (typeof he != "string" && n.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var we = Ix(), lt = Ig(), Nt = Ay(n);
            Nt ? wM(n) && Wd(n) : n.stateNode = fR(he, we, lt, n);
          }
          return xa(n), null;
        }
        case H: {
          Hd(n);
          var Mt = n.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var yn = H_(e, n, Mt);
            if (!yn)
              return n.flags & zr ? n : null;
          }
          if ((n.flags & _t) !== Dt)
            return n.lanes = l, (n.mode & bn) !== kt && SS(n), n;
          var dn = Mt !== null, ue = e !== null && e.memoizedState !== null;
          if (dn !== ue && dn) {
            var Ce = n.child;
            if (Ce.flags |= gr, (n.mode & ln) !== kt) {
              var ce = e === null && (n.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              ce || Yg(Wl.current, Wx) ? VD() : p2();
            }
          }
          var qe = n.updateQueue;
          if (qe !== null && (n.flags |= vn), xa(n), (n.mode & bn) !== kt && dn) {
            var pt = n.child;
            pt !== null && (n.treeBaseDuration -= pt.treeBaseDuration);
          }
          return null;
        }
        case R:
          return Pd(n), QS(e, n), e === null && aM(n.stateNode.containerInfo), xa(n), null;
        case q:
          var st = n.type._context;
          return zg(st, n), xa(n), null;
        case Q: {
          var Vt = n.type;
          return Lo(Vt) && Ry(n), xa(n), null;
        }
        case ne: {
          Hd(n);
          var Kt = n.memoizedState;
          if (Kt === null)
            return xa(n), null;
          var jn = (n.flags & _t) !== Dt, Mn = Kt.rendering;
          if (Mn === null)
            if (jn)
              ah(Kt, !1);
            else {
              var Ar = qD() && (e === null || (e.flags & _t) === Dt);
              if (!Ar)
                for (var _n = n.child; _n !== null; ) {
                  var Tr = Gy(_n);
                  if (Tr !== null) {
                    jn = !0, n.flags |= _t, ah(Kt, !1);
                    var Ia = Tr.updateQueue;
                    return Ia !== null && (n.updateQueue = Ia, n.flags |= vn), n.subtreeFlags = Dt, AM(n, l), Ru(n, Wg(Wl.current, Yv)), n.child;
                  }
                  _n = _n.sibling;
                }
              Kt.tail !== null && kr() > gw() && (n.flags |= _t, jn = !0, ah(Kt, !1), n.lanes = Xp);
            }
          else {
            if (!jn) {
              var Ta = Gy(Mn);
              if (Ta !== null) {
                n.flags |= _t, jn = !0;
                var Ii = Ta.updateQueue;
                if (Ii !== null && (n.updateQueue = Ii, n.flags |= vn), ah(Kt, !0), Kt.tail === null && Kt.tailMode === "hidden" && !Mn.alternate && !ga())
                  return xa(n), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              kr() * 2 - Kt.renderingStartTime > gw() && l !== za && (n.flags |= _t, jn = !0, ah(Kt, !1), n.lanes = Xp);
            }
            if (Kt.isBackwards)
              Mn.sibling = n.child, n.child = Mn;
            else {
              var ni = Kt.last;
              ni !== null ? ni.sibling = Mn : n.child = Mn, Kt.last = Mn;
            }
          }
          if (Kt.tail !== null) {
            var ri = Kt.tail;
            Kt.rendering = ri, Kt.tail = ri.sibling, Kt.renderingStartTime = kr(), ri.sibling = null;
            var qa = Wl.current;
            return jn ? qa = Wg(qa, Yv) : qa = $d(qa), Ru(n, qa), ri;
          }
          return xa(n), null;
        }
        case re:
          break;
        case G:
        case Z: {
          d2(n);
          var Ns = n.memoizedState, ep = Ns !== null;
          if (e !== null) {
            var xh = e.memoizedState, Ho = xh !== null;
            Ho !== ep && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ve && (n.flags |= gr);
          }
          return !ep || (n.mode & ln) === kt ? xa(n) : Ua($o, za) && (xa(n), n.subtreeFlags & (tr | vn) && (n.flags |= gr)), null;
        }
        case le:
          return null;
        case de:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + n.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function V_(e, n, l) {
      switch (Eg(n), n.tag) {
        case E: {
          var o = n.type;
          Lo(o) && Ry(n);
          var c = n.flags;
          return c & zr ? (n.flags = c & ~zr | _t, (n.mode & bn) !== kt && SS(n), n) : null;
        }
        case b: {
          n.stateNode, Pd(n), yg(n), Gg();
          var h = n.flags;
          return (h & zr) !== Dt && (h & _t) === Dt ? (n.flags = h & ~zr | _t, n) : null;
        }
        case D:
          return qg(n), null;
        case H: {
          Hd(n);
          var x = n.memoizedState;
          if (x !== null && x.dehydrated !== null) {
            if (n.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            zd();
          }
          var T = n.flags;
          return T & zr ? (n.flags = T & ~zr | _t, (n.mode & bn) !== kt && SS(n), n) : null;
        }
        case ne:
          return Hd(n), null;
        case R:
          return Pd(n), null;
        case q:
          var M = n.type._context;
          return zg(M, n), null;
        case G:
        case Z:
          return d2(n), null;
        case le:
          return null;
        default:
          return null;
      }
    }
    function ZE(e, n, l) {
      switch (Eg(n), n.tag) {
        case E: {
          var o = n.type.childContextTypes;
          o != null && Ry(n);
          break;
        }
        case b: {
          n.stateNode, Pd(n), yg(n), Gg();
          break;
        }
        case D: {
          qg(n);
          break;
        }
        case R:
          Pd(n);
          break;
        case H:
          Hd(n);
          break;
        case ne:
          Hd(n);
          break;
        case q:
          var c = n.type._context;
          zg(c, n);
          break;
        case G:
        case Z:
          d2(n);
          break;
      }
    }
    var JE = null;
    JE = /* @__PURE__ */ new Set();
    var g0 = !1, Ea = !1, I_ = typeof WeakSet == "function" ? WeakSet : Set, Et = null, Bd = null, Gd = null;
    function q_(e) {
      ho(null, function() {
        throw e;
      }), sc();
    }
    var Y_ = function(e, n) {
      if (n.props = e.memoizedProps, n.state = e.memoizedState, e.mode & bn)
        try {
          Fo(), n.componentWillUnmount();
        } finally {
          jo(e);
        }
      else
        n.componentWillUnmount();
    };
    function ew(e, n) {
      try {
        Du(Br, e);
      } catch (l) {
        Wn(e, n, l);
      }
    }
    function XS(e, n, l) {
      try {
        Y_(e, l);
      } catch (o) {
        Wn(e, n, o);
      }
    }
    function W_(e, n, l) {
      try {
        l.componentDidMount();
      } catch (o) {
        Wn(e, n, o);
      }
    }
    function tw(e, n) {
      try {
        rw(e);
      } catch (l) {
        Wn(e, n, l);
      }
    }
    function Qd(e, n) {
      var l = e.ref;
      if (l !== null)
        if (typeof l == "function") {
          var o;
          try {
            if (be && ze && e.mode & bn)
              try {
                Fo(), o = l(null);
              } finally {
                jo(e);
              }
            else
              o = l(null);
          } catch (c) {
            Wn(e, n, c);
          }
          typeof o == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Gt(e));
        } else
          l.current = null;
    }
    function S0(e, n, l) {
      try {
        l();
      } catch (o) {
        Wn(e, n, o);
      }
    }
    var nw = !1;
    function B_(e, n) {
      iR(e.containerInfo), Et = n, G_();
      var l = nw;
      return nw = !1, l;
    }
    function G_() {
      for (; Et !== null; ) {
        var e = Et, n = e.child;
        (e.subtreeFlags & yo) !== Dt && n !== null ? (n.return = e, Et = n) : Q_();
      }
    }
    function Q_() {
      for (; Et !== null; ) {
        var e = Et;
        An(e);
        try {
          X_(e);
        } catch (l) {
          Wn(e, e.return, l);
        }
        Yn();
        var n = e.sibling;
        if (n !== null) {
          n.return = e.return, Et = n;
          return;
        }
        Et = e.return;
      }
    }
    function X_(e) {
      var n = e.alternate, l = e.flags;
      if ((l & Dr) !== Dt) {
        switch (An(e), e.tag) {
          case S:
          case $:
          case Y:
            break;
          case E: {
            if (n !== null) {
              var o = n.memoizedProps, c = n.memoizedState, h = e.stateNode;
              e.type === e.elementType && !tf && (h.props !== e.memoizedProps && v("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Gt(e) || "instance"), h.state !== e.memoizedState && v("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Gt(e) || "instance"));
              var x = h.getSnapshotBeforeUpdate(e.elementType === e.type ? o : Gl(e.type, o), c);
              {
                var T = JE;
                x === void 0 && !T.has(e.type) && (T.add(e.type), v("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Gt(e)));
              }
              h.__reactInternalSnapshotBeforeUpdate = x;
            }
            break;
          }
          case b: {
            {
              var M = e.stateNode;
              kR(M.containerInfo);
            }
            break;
          }
          case D:
          case _:
          case R:
          case Q:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        Yn();
      }
    }
    function Xl(e, n, l) {
      var o = n.updateQueue, c = o !== null ? o.lastEffect : null;
      if (c !== null) {
        var h = c.next, x = h;
        do {
          if ((x.tag & e) === e) {
            var T = x.destroy;
            x.destroy = void 0, T !== void 0 && ((e & Sa) !== Ei ? jl(n) : (e & Br) !== Ei && fc(n), (e & No) !== Ei && yh(!0), S0(n, l, T), (e & No) !== Ei && yh(!1), (e & Sa) !== Ei ? Eo() : (e & Br) !== Ei && Gp());
          }
          x = x.next;
        } while (x !== h);
      }
    }
    function Du(e, n) {
      var l = n.updateQueue, o = l !== null ? l.lastEffect : null;
      if (o !== null) {
        var c = o.next, h = c;
        do {
          if ((h.tag & e) === e) {
            (e & Sa) !== Ei ? Bp(n) : (e & Br) !== Ei && $f(n);
            var x = h.create;
            (e & No) !== Ei && yh(!0), h.destroy = x(), (e & No) !== Ei && yh(!1), (e & Sa) !== Ei ? bm() : (e & Br) !== Ei && Tm();
            {
              var T = h.destroy;
              if (T !== void 0 && typeof T != "function") {
                var M = void 0;
                (h.tag & Br) !== Dt ? M = "useLayoutEffect" : (h.tag & No) !== Dt ? M = "useInsertionEffect" : M = "useEffect";
                var N = void 0;
                T === null ? N = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof T.then == "function" ? N = `

It looks like you wrote ` + M + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + M + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : N = " You returned: " + T, v("%s must not return anything besides a function, which is used for clean-up.%s", M, N);
              }
            }
          }
          h = h.next;
        } while (h !== c);
      }
    }
    function K_(e, n) {
      if ((n.flags & vn) !== Dt)
        switch (n.tag) {
          case F: {
            var l = n.stateNode.passiveEffectDuration, o = n.memoizedProps, c = o.id, h = o.onPostCommit, x = gE(), T = n.alternate === null ? "mount" : "update";
            yE() && (T = "nested-update"), typeof h == "function" && h(c, T, l, x);
            var M = n.return;
            e: for (; M !== null; ) {
              switch (M.tag) {
                case b:
                  var N = M.stateNode;
                  N.passiveEffectDuration += l;
                  break e;
                case F:
                  var z = M.stateNode;
                  z.passiveEffectDuration += l;
                  break e;
              }
              M = M.return;
            }
            break;
          }
        }
    }
    function Z_(e, n, l, o) {
      if ((l.flags & So) !== Dt)
        switch (l.tag) {
          case S:
          case $:
          case Y: {
            if (!Ea)
              if (l.mode & bn)
                try {
                  Fo(), Du(Br | Wr, l);
                } finally {
                  jo(l);
                }
              else
                Du(Br | Wr, l);
            break;
          }
          case E: {
            var c = l.stateNode;
            if (l.flags & vn && !Ea)
              if (n === null)
                if (l.type === l.elementType && !tf && (c.props !== l.memoizedProps && v("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Gt(l) || "instance"), c.state !== l.memoizedState && v("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Gt(l) || "instance")), l.mode & bn)
                  try {
                    Fo(), c.componentDidMount();
                  } finally {
                    jo(l);
                  }
                else
                  c.componentDidMount();
              else {
                var h = l.elementType === l.type ? n.memoizedProps : Gl(l.type, n.memoizedProps), x = n.memoizedState;
                if (l.type === l.elementType && !tf && (c.props !== l.memoizedProps && v("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Gt(l) || "instance"), c.state !== l.memoizedState && v("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Gt(l) || "instance")), l.mode & bn)
                  try {
                    Fo(), c.componentDidUpdate(h, x, c.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    jo(l);
                  }
                else
                  c.componentDidUpdate(h, x, c.__reactInternalSnapshotBeforeUpdate);
              }
            var T = l.updateQueue;
            T !== null && (l.type === l.elementType && !tf && (c.props !== l.memoizedProps && v("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Gt(l) || "instance"), c.state !== l.memoizedState && v("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Gt(l) || "instance")), Vx(l, T, c));
            break;
          }
          case b: {
            var M = l.updateQueue;
            if (M !== null) {
              var N = null;
              if (l.child !== null)
                switch (l.child.tag) {
                  case D:
                    N = l.child.stateNode;
                    break;
                  case E:
                    N = l.child.stateNode;
                    break;
                }
              Vx(l, M, N);
            }
            break;
          }
          case D: {
            var z = l.stateNode;
            if (n === null && l.flags & vn) {
              var te = l.type, J = l.memoizedProps;
              mR(z, te, J);
            }
            break;
          }
          case _:
            break;
          case R:
            break;
          case F: {
            {
              var he = l.memoizedProps, ge = he.onCommit, we = he.onRender, lt = l.stateNode.effectDuration, Nt = gE(), Mt = n === null ? "mount" : "update";
              yE() && (Mt = "nested-update"), typeof we == "function" && we(l.memoizedProps.id, Mt, l.actualDuration, l.treeBaseDuration, l.actualStartTime, Nt);
              {
                typeof ge == "function" && ge(l.memoizedProps.id, Mt, lt, Nt), QD(l);
                var yn = l.return;
                e: for (; yn !== null; ) {
                  switch (yn.tag) {
                    case b:
                      var dn = yn.stateNode;
                      dn.effectDuration += lt;
                      break e;
                    case F:
                      var ue = yn.stateNode;
                      ue.effectDuration += lt;
                      break e;
                  }
                  yn = yn.return;
                }
              }
            }
            break;
          }
          case H: {
            lD(e, l);
            break;
          }
          case ne:
          case Q:
          case re:
          case G:
          case Z:
          case de:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Ea || l.flags & or && rw(l);
    }
    function J_(e) {
      switch (e.tag) {
        case S:
        case $:
        case Y: {
          if (e.mode & bn)
            try {
              Fo(), ew(e, e.return);
            } finally {
              jo(e);
            }
          else
            ew(e, e.return);
          break;
        }
        case E: {
          var n = e.stateNode;
          typeof n.componentDidMount == "function" && W_(e, e.return, n), tw(e, e.return);
          break;
        }
        case D: {
          tw(e, e.return);
          break;
        }
      }
    }
    function eD(e, n) {
      for (var l = null, o = e; ; ) {
        if (o.tag === D) {
          if (l === null) {
            l = o;
            try {
              var c = o.stateNode;
              n ? RR(c) : _R(o.stateNode, o.memoizedProps);
            } catch (x) {
              Wn(e, e.return, x);
            }
          }
        } else if (o.tag === _) {
          if (l === null)
            try {
              var h = o.stateNode;
              n ? MR(h) : DR(h, o.memoizedProps);
            } catch (x) {
              Wn(e, e.return, x);
            }
        } else if (!((o.tag === G || o.tag === Z) && o.memoizedState !== null && o !== e)) {
          if (o.child !== null) {
            o.child.return = o, o = o.child;
            continue;
          }
        }
        if (o === e)
          return;
        for (; o.sibling === null; ) {
          if (o.return === null || o.return === e)
            return;
          l === o && (l = null), o = o.return;
        }
        l === o && (l = null), o.sibling.return = o.return, o = o.sibling;
      }
    }
    function rw(e) {
      var n = e.ref;
      if (n !== null) {
        var l = e.stateNode, o;
        if (e.tag === D ? o = l : o = l, typeof n == "function") {
          var c;
          if (e.mode & bn)
            try {
              Fo(), c = n(o);
            } finally {
              jo(e);
            }
          else
            c = n(o);
          typeof c == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Gt(e));
        } else
          n.hasOwnProperty("current") || v("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Gt(e)), n.current = o;
      }
    }
    function tD(e) {
      var n = e.alternate;
      n !== null && (n.return = null), e.return = null;
    }
    function aw(e) {
      var n = e.alternate;
      n !== null && (e.alternate = null, aw(n));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === D) {
          var l = e.stateNode;
          l !== null && oM(l);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function nD(e) {
      for (var n = e.return; n !== null; ) {
        if (iw(n))
          return n;
        n = n.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function iw(e) {
      return e.tag === D || e.tag === b || e.tag === R;
    }
    function lw(e) {
      var n = e;
      e: for (; ; ) {
        for (; n.sibling === null; ) {
          if (n.return === null || iw(n.return))
            return null;
          n = n.return;
        }
        for (n.sibling.return = n.return, n = n.sibling; n.tag !== D && n.tag !== _ && n.tag !== P; ) {
          if (n.flags & tr || n.child === null || n.tag === R)
            continue e;
          n.child.return = n, n = n.child;
        }
        if (!(n.flags & tr))
          return n.stateNode;
      }
    }
    function rD(e) {
      var n = nD(e);
      switch (n.tag) {
        case D: {
          var l = n.stateNode;
          n.flags & fi && (sx(l), n.flags &= ~fi);
          var o = lw(e);
          ZS(e, o, l);
          break;
        }
        case b:
        case R: {
          var c = n.stateNode.containerInfo, h = lw(e);
          KS(e, h, c);
          break;
        }
        // eslint-disable-next-line-no-fallthrough
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function KS(e, n, l) {
      var o = e.tag, c = o === D || o === _;
      if (c) {
        var h = e.stateNode;
        n ? wR(l, h, n) : xR(l, h);
      } else if (o !== R) {
        var x = e.child;
        if (x !== null) {
          KS(x, n, l);
          for (var T = x.sibling; T !== null; )
            KS(T, n, l), T = T.sibling;
        }
      }
    }
    function ZS(e, n, l) {
      var o = e.tag, c = o === D || o === _;
      if (c) {
        var h = e.stateNode;
        n ? ER(l, h, n) : SR(l, h);
      } else if (o !== R) {
        var x = e.child;
        if (x !== null) {
          ZS(x, n, l);
          for (var T = x.sibling; T !== null; )
            ZS(T, n, l), T = T.sibling;
        }
      }
    }
    var wa = null, Kl = !1;
    function aD(e, n, l) {
      {
        var o = n;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case D: {
              wa = o.stateNode, Kl = !1;
              break e;
            }
            case b: {
              wa = o.stateNode.containerInfo, Kl = !0;
              break e;
            }
            case R: {
              wa = o.stateNode.containerInfo, Kl = !0;
              break e;
            }
          }
          o = o.return;
        }
        if (wa === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        ow(e, n, l), wa = null, Kl = !1;
      }
      tD(l);
    }
    function ku(e, n, l) {
      for (var o = l.child; o !== null; )
        ow(e, n, o), o = o.sibling;
    }
    function ow(e, n, l) {
      switch (qp(l), l.tag) {
        case D:
          Ea || Qd(l, n);
        // eslint-disable-next-line-no-fallthrough
        case _: {
          {
            var o = wa, c = Kl;
            wa = null, ku(e, n, l), wa = o, Kl = c, wa !== null && (Kl ? bR(wa, l.stateNode) : CR(wa, l.stateNode));
          }
          return;
        }
        case P: {
          wa !== null && (Kl ? TR(wa, l.stateNode) : ug(wa, l.stateNode));
          return;
        }
        case R: {
          {
            var h = wa, x = Kl;
            wa = l.stateNode.containerInfo, Kl = !0, ku(e, n, l), wa = h, Kl = x;
          }
          return;
        }
        case S:
        case $:
        case V:
        case Y: {
          if (!Ea) {
            var T = l.updateQueue;
            if (T !== null) {
              var M = T.lastEffect;
              if (M !== null) {
                var N = M.next, z = N;
                do {
                  var te = z, J = te.destroy, he = te.tag;
                  J !== void 0 && ((he & No) !== Ei ? S0(l, n, J) : (he & Br) !== Ei && (fc(l), l.mode & bn ? (Fo(), S0(l, n, J), jo(l)) : S0(l, n, J), Gp())), z = z.next;
                } while (z !== N);
              }
            }
          }
          ku(e, n, l);
          return;
        }
        case E: {
          if (!Ea) {
            Qd(l, n);
            var ge = l.stateNode;
            typeof ge.componentWillUnmount == "function" && XS(l, n, ge);
          }
          ku(e, n, l);
          return;
        }
        case re: {
          ku(e, n, l);
          return;
        }
        case G: {
          if (
            // TODO: Remove this dead flag
            l.mode & ln
          ) {
            var we = Ea;
            Ea = we || l.memoizedState !== null, ku(e, n, l), Ea = we;
          } else
            ku(e, n, l);
          break;
        }
        default: {
          ku(e, n, l);
          return;
        }
      }
    }
    function iD(e) {
      e.memoizedState;
    }
    function lD(e, n) {
      var l = n.memoizedState;
      if (l === null) {
        var o = n.alternate;
        if (o !== null) {
          var c = o.memoizedState;
          if (c !== null) {
            var h = c.dehydrated;
            h !== null && qR(h);
          }
        }
      }
    }
    function sw(e) {
      var n = e.updateQueue;
      if (n !== null) {
        e.updateQueue = null;
        var l = e.stateNode;
        l === null && (l = e.stateNode = new I_()), n.forEach(function(o) {
          var c = nk.bind(null, e, o);
          if (!l.has(o)) {
            if (l.add(o), Na)
              if (Bd !== null && Gd !== null)
                mh(Gd, Bd);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            o.then(c, c);
          }
        });
      }
    }
    function oD(e, n, l) {
      Bd = l, Gd = e, An(n), uw(n, e), An(n), Bd = null, Gd = null;
    }
    function Zl(e, n, l) {
      var o = n.deletions;
      if (o !== null)
        for (var c = 0; c < o.length; c++) {
          var h = o[c];
          try {
            aD(e, n, h);
          } catch (M) {
            Wn(h, n, M);
          }
        }
      var x = oo();
      if (n.subtreeFlags & go)
        for (var T = n.child; T !== null; )
          An(T), uw(T, e), T = T.sibling;
      An(x);
    }
    function uw(e, n, l) {
      var o = e.alternate, c = e.flags;
      switch (e.tag) {
        case S:
        case $:
        case V:
        case Y: {
          if (Zl(n, e), Po(e), c & vn) {
            try {
              Xl(No | Wr, e, e.return), Du(No | Wr, e);
            } catch (Vt) {
              Wn(e, e.return, Vt);
            }
            if (e.mode & bn) {
              try {
                Fo(), Xl(Br | Wr, e, e.return);
              } catch (Vt) {
                Wn(e, e.return, Vt);
              }
              jo(e);
            } else
              try {
                Xl(Br | Wr, e, e.return);
              } catch (Vt) {
                Wn(e, e.return, Vt);
              }
          }
          return;
        }
        case E: {
          Zl(n, e), Po(e), c & or && o !== null && Qd(o, o.return);
          return;
        }
        case D: {
          Zl(n, e), Po(e), c & or && o !== null && Qd(o, o.return);
          {
            if (e.flags & fi) {
              var h = e.stateNode;
              try {
                sx(h);
              } catch (Vt) {
                Wn(e, e.return, Vt);
              }
            }
            if (c & vn) {
              var x = e.stateNode;
              if (x != null) {
                var T = e.memoizedProps, M = o !== null ? o.memoizedProps : T, N = e.type, z = e.updateQueue;
                if (e.updateQueue = null, z !== null)
                  try {
                    yR(x, z, N, M, T, e);
                  } catch (Vt) {
                    Wn(e, e.return, Vt);
                  }
              }
            }
          }
          return;
        }
        case _: {
          if (Zl(n, e), Po(e), c & vn) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var te = e.stateNode, J = e.memoizedProps, he = o !== null ? o.memoizedProps : J;
            try {
              gR(te, he, J);
            } catch (Vt) {
              Wn(e, e.return, Vt);
            }
          }
          return;
        }
        case b: {
          if (Zl(n, e), Po(e), c & vn && o !== null) {
            var ge = o.memoizedState;
            if (ge.isDehydrated)
              try {
                IR(n.containerInfo);
              } catch (Vt) {
                Wn(e, e.return, Vt);
              }
          }
          return;
        }
        case R: {
          Zl(n, e), Po(e);
          return;
        }
        case H: {
          Zl(n, e), Po(e);
          var we = e.child;
          if (we.flags & gr) {
            var lt = we.stateNode, Nt = we.memoizedState, Mt = Nt !== null;
            if (lt.isHidden = Mt, Mt) {
              var yn = we.alternate !== null && we.alternate.memoizedState !== null;
              yn || HD();
            }
          }
          if (c & vn) {
            try {
              iD(e);
            } catch (Vt) {
              Wn(e, e.return, Vt);
            }
            sw(e);
          }
          return;
        }
        case G: {
          var dn = o !== null && o.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & ln
          ) {
            var ue = Ea;
            Ea = ue || dn, Zl(n, e), Ea = ue;
          } else
            Zl(n, e);
          if (Po(e), c & gr) {
            var Ce = e.stateNode, ce = e.memoizedState, qe = ce !== null, pt = e;
            if (Ce.isHidden = qe, qe && !dn && (pt.mode & ln) !== kt) {
              Et = pt;
              for (var st = pt.child; st !== null; )
                Et = st, uD(st), st = st.sibling;
            }
            eD(pt, qe);
          }
          return;
        }
        case ne: {
          Zl(n, e), Po(e), c & vn && sw(e);
          return;
        }
        case re:
          return;
        default: {
          Zl(n, e), Po(e);
          return;
        }
      }
    }
    function Po(e) {
      var n = e.flags;
      if (n & tr) {
        try {
          rD(e);
        } catch (l) {
          Wn(e, e.return, l);
        }
        e.flags &= ~tr;
      }
      n & Oa && (e.flags &= ~Oa);
    }
    function sD(e, n, l) {
      Bd = l, Gd = n, Et = e, cw(e, n, l), Bd = null, Gd = null;
    }
    function cw(e, n, l) {
      for (var o = (e.mode & ln) !== kt; Et !== null; ) {
        var c = Et, h = c.child;
        if (c.tag === G && o) {
          var x = c.memoizedState !== null, T = x || g0;
          if (T) {
            JS(e, n, l);
            continue;
          } else {
            var M = c.alternate, N = M !== null && M.memoizedState !== null, z = N || Ea, te = g0, J = Ea;
            g0 = T, Ea = z, Ea && !J && (Et = c, cD(c));
            for (var he = h; he !== null; )
              Et = he, cw(
                he,
                // New root; bubble back up to here and stop.
                n,
                l
              ), he = he.sibling;
            Et = c, g0 = te, Ea = J, JS(e, n, l);
            continue;
          }
        }
        (c.subtreeFlags & So) !== Dt && h !== null ? (h.return = c, Et = h) : JS(e, n, l);
      }
    }
    function JS(e, n, l) {
      for (; Et !== null; ) {
        var o = Et;
        if ((o.flags & So) !== Dt) {
          var c = o.alternate;
          An(o);
          try {
            Z_(n, c, o, l);
          } catch (x) {
            Wn(o, o.return, x);
          }
          Yn();
        }
        if (o === e) {
          Et = null;
          return;
        }
        var h = o.sibling;
        if (h !== null) {
          h.return = o.return, Et = h;
          return;
        }
        Et = o.return;
      }
    }
    function uD(e) {
      for (; Et !== null; ) {
        var n = Et, l = n.child;
        switch (n.tag) {
          case S:
          case $:
          case V:
          case Y: {
            if (n.mode & bn)
              try {
                Fo(), Xl(Br, n, n.return);
              } finally {
                jo(n);
              }
            else
              Xl(Br, n, n.return);
            break;
          }
          case E: {
            Qd(n, n.return);
            var o = n.stateNode;
            typeof o.componentWillUnmount == "function" && XS(n, n.return, o);
            break;
          }
          case D: {
            Qd(n, n.return);
            break;
          }
          case G: {
            var c = n.memoizedState !== null;
            if (c) {
              fw(e);
              continue;
            }
            break;
          }
        }
        l !== null ? (l.return = n, Et = l) : fw(e);
      }
    }
    function fw(e) {
      for (; Et !== null; ) {
        var n = Et;
        if (n === e) {
          Et = null;
          return;
        }
        var l = n.sibling;
        if (l !== null) {
          l.return = n.return, Et = l;
          return;
        }
        Et = n.return;
      }
    }
    function cD(e) {
      for (; Et !== null; ) {
        var n = Et, l = n.child;
        if (n.tag === G) {
          var o = n.memoizedState !== null;
          if (o) {
            dw(e);
            continue;
          }
        }
        l !== null ? (l.return = n, Et = l) : dw(e);
      }
    }
    function dw(e) {
      for (; Et !== null; ) {
        var n = Et;
        An(n);
        try {
          J_(n);
        } catch (o) {
          Wn(n, n.return, o);
        }
        if (Yn(), n === e) {
          Et = null;
          return;
        }
        var l = n.sibling;
        if (l !== null) {
          l.return = n.return, Et = l;
          return;
        }
        Et = n.return;
      }
    }
    function fD(e, n, l, o) {
      Et = n, dD(n, e, l, o);
    }
    function dD(e, n, l, o) {
      for (; Et !== null; ) {
        var c = Et, h = c.child;
        (c.subtreeFlags & zl) !== Dt && h !== null ? (h.return = c, Et = h) : pD(e, n, l, o);
      }
    }
    function pD(e, n, l, o) {
      for (; Et !== null; ) {
        var c = Et;
        if ((c.flags & ka) !== Dt) {
          An(c);
          try {
            vD(n, c, l, o);
          } catch (x) {
            Wn(c, c.return, x);
          }
          Yn();
        }
        if (c === e) {
          Et = null;
          return;
        }
        var h = c.sibling;
        if (h !== null) {
          h.return = c.return, Et = h;
          return;
        }
        Et = c.return;
      }
    }
    function vD(e, n, l, o) {
      switch (n.tag) {
        case S:
        case $:
        case Y: {
          if (n.mode & bn) {
            gS();
            try {
              Du(Sa | Wr, n);
            } finally {
              yS(n);
            }
          } else
            Du(Sa | Wr, n);
          break;
        }
      }
    }
    function hD(e) {
      Et = e, mD();
    }
    function mD() {
      for (; Et !== null; ) {
        var e = Et, n = e.child;
        if ((Et.flags & ci) !== Dt) {
          var l = e.deletions;
          if (l !== null) {
            for (var o = 0; o < l.length; o++) {
              var c = l[o];
              Et = c, SD(c, e);
            }
            {
              var h = e.alternate;
              if (h !== null) {
                var x = h.child;
                if (x !== null) {
                  h.child = null;
                  do {
                    var T = x.sibling;
                    x.sibling = null, x = T;
                  } while (x !== null);
                }
              }
            }
            Et = e;
          }
        }
        (e.subtreeFlags & zl) !== Dt && n !== null ? (n.return = e, Et = n) : yD();
      }
    }
    function yD() {
      for (; Et !== null; ) {
        var e = Et;
        (e.flags & ka) !== Dt && (An(e), gD(e), Yn());
        var n = e.sibling;
        if (n !== null) {
          n.return = e.return, Et = n;
          return;
        }
        Et = e.return;
      }
    }
    function gD(e) {
      switch (e.tag) {
        case S:
        case $:
        case Y: {
          e.mode & bn ? (gS(), Xl(Sa | Wr, e, e.return), yS(e)) : Xl(Sa | Wr, e, e.return);
          break;
        }
      }
    }
    function SD(e, n) {
      for (; Et !== null; ) {
        var l = Et;
        An(l), ED(l, n), Yn();
        var o = l.child;
        o !== null ? (o.return = l, Et = o) : xD(e);
      }
    }
    function xD(e) {
      for (; Et !== null; ) {
        var n = Et, l = n.sibling, o = n.return;
        if (aw(n), n === e) {
          Et = null;
          return;
        }
        if (l !== null) {
          l.return = o, Et = l;
          return;
        }
        Et = o;
      }
    }
    function ED(e, n) {
      switch (e.tag) {
        case S:
        case $:
        case Y: {
          e.mode & bn ? (gS(), Xl(Sa, e, n), yS(e)) : Xl(Sa, e, n);
          break;
        }
      }
    }
    function wD(e) {
      switch (e.tag) {
        case S:
        case $:
        case Y: {
          try {
            Du(Br | Wr, e);
          } catch (l) {
            Wn(e, e.return, l);
          }
          break;
        }
        case E: {
          var n = e.stateNode;
          try {
            n.componentDidMount();
          } catch (l) {
            Wn(e, e.return, l);
          }
          break;
        }
      }
    }
    function CD(e) {
      switch (e.tag) {
        case S:
        case $:
        case Y: {
          try {
            Du(Sa | Wr, e);
          } catch (n) {
            Wn(e, e.return, n);
          }
          break;
        }
      }
    }
    function bD(e) {
      switch (e.tag) {
        case S:
        case $:
        case Y: {
          try {
            Xl(Br | Wr, e, e.return);
          } catch (l) {
            Wn(e, e.return, l);
          }
          break;
        }
        case E: {
          var n = e.stateNode;
          typeof n.componentWillUnmount == "function" && XS(e, e.return, n);
          break;
        }
      }
    }
    function TD(e) {
      switch (e.tag) {
        case S:
        case $:
        case Y:
          try {
            Xl(Sa | Wr, e, e.return);
          } catch (n) {
            Wn(e, e.return, n);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var ih = Symbol.for;
      ih("selector.component"), ih("selector.has_pseudo_class"), ih("selector.role"), ih("selector.test_id"), ih("selector.text");
    }
    var RD = [];
    function MD() {
      RD.forEach(function(e) {
        return e();
      });
    }
    var _D = s.ReactCurrentActQueue;
    function DD(e) {
      {
        var n = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), l = typeof jest < "u";
        return l && n !== !1;
      }
    }
    function pw() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && _D.current !== null && v("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var kD = Math.ceil, e2 = s.ReactCurrentDispatcher, t2 = s.ReactCurrentOwner, Ca = s.ReactCurrentBatchConfig, Jl = s.ReactCurrentActQueue, Xr = (
      /*             */
      0
    ), vw = (
      /*               */
      1
    ), ba = (
      /*                */
      2
    ), xl = (
      /*                */
      4
    ), ks = 0, lh = 1, nf = 2, x0 = 3, oh = 4, hw = 5, n2 = 6, mn = Xr, ei = null, vr = null, Kr = Ae, $o = Ae, r2 = xu(Ae), Zr = ks, sh = null, E0 = Ae, uh = Ae, w0 = Ae, ch = null, wi = null, a2 = 0, mw = 500, yw = 1 / 0, OD = 500, Os = null;
    function fh() {
      yw = kr() + OD;
    }
    function gw() {
      return yw;
    }
    var C0 = !1, i2 = null, Xd = null, rf = !1, Ou = null, dh = Ae, l2 = [], o2 = null, AD = 50, ph = 0, s2 = null, u2 = !1, b0 = !1, LD = 50, Kd = 0, T0 = null, vh = Pn, R0 = Ae, Sw = !1;
    function M0() {
      return ei;
    }
    function ti() {
      return (mn & (ba | xl)) !== Xr ? kr() : (vh !== Pn || (vh = kr()), vh);
    }
    function Au(e) {
      var n = e.mode;
      if ((n & ln) === kt)
        return Pt;
      if ((mn & ba) !== Xr && Kr !== Ae)
        return bc(Kr);
      var l = _M() !== MM;
      if (l) {
        if (Ca.transition !== null) {
          var o = Ca.transition;
          o._updatedFibers || (o._updatedFibers = /* @__PURE__ */ new Set()), o._updatedFibers.add(e);
        }
        return R0 === wn && (R0 = nv()), R0;
      }
      var c = yi();
      if (c !== wn)
        return c;
      var h = dR();
      return h;
    }
    function ND(e) {
      var n = e.mode;
      return (n & ln) === kt ? Pt : Om();
    }
    function Jr(e, n, l, o) {
      ak(), Sw && v("useInsertionEffect must not schedule updates."), u2 && (b0 = !0), uu(e, l, o), (mn & ba) !== Ae && e === ei ? ok(n) : (Na && Mc(e, n, l), sk(n), e === ei && ((mn & ba) === Xr && (uh = Jt(uh, l)), Zr === oh && Lu(e, Kr)), Ci(e, o), l === Pt && mn === Xr && (n.mode & ln) === kt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Jl.isBatchingLegacy && (fh(), Sx()));
    }
    function zD(e, n, l) {
      var o = e.current;
      o.lanes = n, uu(e, n, l), Ci(e, l);
    }
    function UD(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (mn & ba) !== Xr
      );
    }
    function Ci(e, n) {
      var l = e.callbackNode;
      ld(e, n);
      var o = id(e, e === ei ? Kr : Ae);
      if (o === Ae) {
        l !== null && zw(l), e.callbackNode = null, e.callbackPriority = wn;
        return;
      }
      var c = bo(o), h = e.callbackPriority;
      if (h === c && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(Jl.current !== null && l !== m2)) {
        l == null && h !== Pt && v("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      l != null && zw(l);
      var x;
      if (c === Pt)
        e.tag === Eu ? (Jl.isBatchingLegacy !== null && (Jl.didScheduleLegacyUpdate = !0), cM(ww.bind(null, e))) : gx(ww.bind(null, e)), Jl.current !== null ? Jl.current.push(wu) : vR(function() {
          (mn & (ba | xl)) === Xr && wu();
        }), x = null;
      else {
        var T;
        switch (Fm(o)) {
          case pa:
            T = cc;
            break;
          case cl:
            T = xo;
            break;
          case hi:
            T = Ul;
            break;
          case mi:
            T = as;
            break;
          default:
            T = Ul;
            break;
        }
        x = y2(T, xw.bind(null, e));
      }
      e.callbackPriority = c, e.callbackNode = x;
    }
    function xw(e, n) {
      if (e_(), vh = Pn, R0 = Ae, (mn & (ba | xl)) !== Xr)
        throw new Error("Should not already be working.");
      var l = e.callbackNode, o = Ls();
      if (o && e.callbackNode !== l)
        return null;
      var c = id(e, e === ei ? Kr : Ae);
      if (c === Ae)
        return null;
      var h = !sd(e, c) && !km(e, c) && !n, x = h ? WD(e, c) : D0(e, c);
      if (x !== ks) {
        if (x === nf) {
          var T = od(e);
          T !== Ae && (c = T, x = c2(e, T));
        }
        if (x === lh) {
          var M = sh;
          throw af(e, Ae), Lu(e, c), Ci(e, kr()), M;
        }
        if (x === n2)
          Lu(e, c);
        else {
          var N = !sd(e, c), z = e.current.alternate;
          if (N && !FD(z)) {
            if (x = D0(e, c), x === nf) {
              var te = od(e);
              te !== Ae && (c = te, x = c2(e, te));
            }
            if (x === lh) {
              var J = sh;
              throw af(e, Ae), Lu(e, c), Ci(e, kr()), J;
            }
          }
          e.finishedWork = z, e.finishedLanes = c, jD(e, x, c);
        }
      }
      return Ci(e, kr()), e.callbackNode === l ? xw.bind(null, e) : null;
    }
    function c2(e, n) {
      var l = ch;
      if (fd(e)) {
        var o = af(e, n);
        o.flags |= ea, rM(e.containerInfo);
      }
      var c = D0(e, n);
      if (c !== nf) {
        var h = wi;
        wi = l, h !== null && Ew(h);
      }
      return c;
    }
    function Ew(e) {
      wi === null ? wi = e : wi.push.apply(wi, e);
    }
    function jD(e, n, l) {
      switch (n) {
        case ks:
        case lh:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case nf: {
          lf(e, wi, Os);
          break;
        }
        case x0: {
          if (Lu(e, l), hs(l) && // do not delay if we're inside an act() scope
          !Uw()) {
            var o = a2 + mw - kr();
            if (o > 10) {
              var c = id(e, Ae);
              if (c !== Ae)
                break;
              var h = e.suspendedLanes;
              if (!ms(h, l)) {
                ti(), ud(e, h);
                break;
              }
              e.timeoutHandle = og(lf.bind(null, e, wi, Os), o);
              break;
            }
          }
          lf(e, wi, Os);
          break;
        }
        case oh: {
          if (Lu(e, l), ev(l))
            break;
          if (!Uw()) {
            var x = Fi(e, l), T = x, M = kr() - T, N = rk(M) - M;
            if (N > 10) {
              e.timeoutHandle = og(lf.bind(null, e, wi, Os), N);
              break;
            }
          }
          lf(e, wi, Os);
          break;
        }
        case hw: {
          lf(e, wi, Os);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function FD(e) {
      for (var n = e; ; ) {
        if (n.flags & au) {
          var l = n.updateQueue;
          if (l !== null) {
            var o = l.stores;
            if (o !== null)
              for (var c = 0; c < o.length; c++) {
                var h = o[c], x = h.getSnapshot, T = h.value;
                try {
                  if (!je(x(), T))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var M = n.child;
        if (n.subtreeFlags & au && M !== null) {
          M.return = n, n = M;
          continue;
        }
        if (n === e)
          return !0;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e)
            return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      return !0;
    }
    function Lu(e, n) {
      n = Tc(n, w0), n = Tc(n, uh), Nm(e, n);
    }
    function ww(e) {
      if (t_(), (mn & (ba | xl)) !== Xr)
        throw new Error("Should not already be working.");
      Ls();
      var n = id(e, Ae);
      if (!Ua(n, Pt))
        return Ci(e, kr()), null;
      var l = D0(e, n);
      if (e.tag !== Eu && l === nf) {
        var o = od(e);
        o !== Ae && (n = o, l = c2(e, o));
      }
      if (l === lh) {
        var c = sh;
        throw af(e, Ae), Lu(e, n), Ci(e, kr()), c;
      }
      if (l === n2)
        throw new Error("Root did not complete. This is a bug in React.");
      var h = e.current.alternate;
      return e.finishedWork = h, e.finishedLanes = n, lf(e, wi, Os), Ci(e, kr()), null;
    }
    function PD(e, n) {
      n !== Ae && (cd(e, Jt(n, Pt)), Ci(e, kr()), (mn & (ba | xl)) === Xr && (fh(), wu()));
    }
    function f2(e, n) {
      var l = mn;
      mn |= vw;
      try {
        return e(n);
      } finally {
        mn = l, mn === Xr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !Jl.isBatchingLegacy && (fh(), Sx());
      }
    }
    function $D(e, n, l, o, c) {
      var h = yi(), x = Ca.transition;
      try {
        return Ca.transition = null, wr(pa), e(n, l, o, c);
      } finally {
        wr(h), Ca.transition = x, mn === Xr && fh();
      }
    }
    function As(e) {
      Ou !== null && Ou.tag === Eu && (mn & (ba | xl)) === Xr && Ls();
      var n = mn;
      mn |= vw;
      var l = Ca.transition, o = yi();
      try {
        return Ca.transition = null, wr(pa), e ? e() : void 0;
      } finally {
        wr(o), Ca.transition = l, mn = n, (mn & (ba | xl)) === Xr && wu();
      }
    }
    function Cw() {
      return (mn & (ba | xl)) !== Xr;
    }
    function _0(e, n) {
      Ha(r2, $o, e), $o = Jt($o, n);
    }
    function d2(e) {
      $o = r2.current, $a(r2, e);
    }
    function af(e, n) {
      e.finishedWork = null, e.finishedLanes = Ae;
      var l = e.timeoutHandle;
      if (l !== sg && (e.timeoutHandle = sg, pR(l)), vr !== null)
        for (var o = vr.return; o !== null; ) {
          var c = o.alternate;
          ZE(c, o), o = o.return;
        }
      ei = e;
      var h = of(e.current, null);
      return vr = h, Kr = $o = n, Zr = ks, sh = null, E0 = Ae, uh = Ae, w0 = Ae, ch = null, wi = null, zM(), Yl.discardPendingWarnings(), h;
    }
    function bw(e, n) {
      do {
        var l = vr;
        try {
          if (Fy(), Gx(), Yn(), t2.current = null, l === null || l.return === null) {
            Zr = lh, sh = n, vr = null;
            return;
          }
          if (be && l.mode & bn && p0(l, !0), xe)
            if (Xa(), n !== null && typeof n == "object" && typeof n.then == "function") {
              var o = n;
              ul(l, o, Kr);
            } else
              dc(l, n, Kr);
          c_(e, l.return, l, n, Kr), _w(l);
        } catch (c) {
          n = c, vr === l && l !== null ? (l = l.return, vr = l) : l = vr;
          continue;
        }
        return;
      } while (!0);
    }
    function Tw() {
      var e = e2.current;
      return e2.current = s0, e === null ? s0 : e;
    }
    function Rw(e) {
      e2.current = e;
    }
    function HD() {
      a2 = kr();
    }
    function hh(e) {
      E0 = Jt(e, E0);
    }
    function VD() {
      Zr === ks && (Zr = x0);
    }
    function p2() {
      (Zr === ks || Zr === x0 || Zr === nf) && (Zr = oh), ei !== null && (Cc(E0) || Cc(uh)) && Lu(ei, Kr);
    }
    function ID(e) {
      Zr !== oh && (Zr = nf), ch === null ? ch = [e] : ch.push(e);
    }
    function qD() {
      return Zr === ks;
    }
    function D0(e, n) {
      var l = mn;
      mn |= ba;
      var o = Tw();
      if (ei !== e || Kr !== n) {
        if (Na) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (mh(e, Kr), c.clear()), zm(e, n);
        }
        Os = lv(), af(e, n);
      }
      ss(n);
      do
        try {
          YD();
          break;
        } catch (h) {
          bw(e, h);
        }
      while (!0);
      if (Fy(), mn = l, Rw(o), vr !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Hf(), ei = null, Kr = Ae, Zr;
    }
    function YD() {
      for (; vr !== null; )
        Mw(vr);
    }
    function WD(e, n) {
      var l = mn;
      mn |= ba;
      var o = Tw();
      if (ei !== e || Kr !== n) {
        if (Na) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (mh(e, Kr), c.clear()), zm(e, n);
        }
        Os = lv(), fh(), af(e, n);
      }
      ss(n);
      do
        try {
          BD();
          break;
        } catch (h) {
          bw(e, h);
        }
      while (!0);
      return Fy(), Rw(o), mn = l, vr !== null ? (Rm(), ks) : (Hf(), ei = null, Kr = Ae, Zr);
    }
    function BD() {
      for (; vr !== null && !Pp(); )
        Mw(vr);
    }
    function Mw(e) {
      var n = e.alternate;
      An(e);
      var l;
      (e.mode & bn) !== kt ? (mS(e), l = v2(n, e, $o), p0(e, !0)) : l = v2(n, e, $o), Yn(), e.memoizedProps = e.pendingProps, l === null ? _w(e) : vr = l, t2.current = null;
    }
    function _w(e) {
      var n = e;
      do {
        var l = n.alternate, o = n.return;
        if ((n.flags & uc) === Dt) {
          An(n);
          var c = void 0;
          if ((n.mode & bn) === kt ? c = KE(l, n, $o) : (mS(n), c = KE(l, n, $o), p0(n, !1)), Yn(), c !== null) {
            vr = c;
            return;
          }
        } else {
          var h = V_(l, n);
          if (h !== null) {
            h.flags &= xm, vr = h;
            return;
          }
          if ((n.mode & bn) !== kt) {
            p0(n, !1);
            for (var x = n.actualDuration, T = n.child; T !== null; )
              x += T.actualDuration, T = T.sibling;
            n.actualDuration = x;
          }
          if (o !== null)
            o.flags |= uc, o.subtreeFlags = Dt, o.deletions = null;
          else {
            Zr = n2, vr = null;
            return;
          }
        }
        var M = n.sibling;
        if (M !== null) {
          vr = M;
          return;
        }
        n = o, vr = n;
      } while (n !== null);
      Zr === ks && (Zr = hw);
    }
    function lf(e, n, l) {
      var o = yi(), c = Ca.transition;
      try {
        Ca.transition = null, wr(pa), GD(e, n, l, o);
      } finally {
        Ca.transition = c, wr(o);
      }
      return null;
    }
    function GD(e, n, l, o) {
      do
        Ls();
      while (Ou !== null);
      if (ik(), (mn & (ba | xl)) !== Xr)
        throw new Error("Should not already be working.");
      var c = e.finishedWork, h = e.finishedLanes;
      if (Yp(h), c === null)
        return Wp(), null;
      if (h === Ae && v("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Ae, c === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = wn;
      var x = Jt(c.lanes, c.childLanes);
      av(e, x), e === ei && (ei = null, vr = null, Kr = Ae), ((c.subtreeFlags & zl) !== Dt || (c.flags & zl) !== Dt) && (rf || (rf = !0, o2 = l, y2(Ul, function() {
        return Ls(), null;
      })));
      var T = (c.subtreeFlags & (yo | go | So | zl)) !== Dt, M = (c.flags & (yo | go | So | zl)) !== Dt;
      if (T || M) {
        var N = Ca.transition;
        Ca.transition = null;
        var z = yi();
        wr(pa);
        var te = mn;
        mn |= xl, t2.current = null, B_(e, c), SE(), oD(e, c, h), lR(e.containerInfo), e.current = c, pc(h), sD(c, e, h), vc(), $p(), mn = te, wr(z), Ca.transition = N;
      } else
        e.current = c, SE();
      var J = rf;
      if (rf ? (rf = !1, Ou = e, dh = h) : (Kd = 0, T0 = null), x = e.pendingLanes, x === Ae && (Xd = null), J || Aw(e.current, !1), Vp(c.stateNode, o), Na && e.memoizedUpdaters.clear(), MD(), Ci(e, kr()), n !== null)
        for (var he = e.onRecoverableError, ge = 0; ge < n.length; ge++) {
          var we = n[ge], lt = we.stack, Nt = we.digest;
          he(we.value, {
            componentStack: lt,
            digest: Nt
          });
        }
      if (C0) {
        C0 = !1;
        var Mt = i2;
        throw i2 = null, Mt;
      }
      return Ua(dh, Pt) && e.tag !== Eu && Ls(), x = e.pendingLanes, Ua(x, Pt) ? (JM(), e === s2 ? ph++ : (ph = 0, s2 = e)) : ph = 0, wu(), Wp(), null;
    }
    function Ls() {
      if (Ou !== null) {
        var e = Fm(dh), n = Dc(hi, e), l = Ca.transition, o = yi();
        try {
          return Ca.transition = null, wr(n), XD();
        } finally {
          wr(o), Ca.transition = l;
        }
      }
      return !1;
    }
    function QD(e) {
      l2.push(e), rf || (rf = !0, y2(Ul, function() {
        return Ls(), null;
      }));
    }
    function XD() {
      if (Ou === null)
        return !1;
      var e = o2;
      o2 = null;
      var n = Ou, l = dh;
      if (Ou = null, dh = Ae, (mn & (ba | xl)) !== Xr)
        throw new Error("Cannot flush passive effects while already rendering.");
      u2 = !0, b0 = !1, os(l);
      var o = mn;
      mn |= xl, hD(n.current), fD(n, n.current, l, e);
      {
        var c = l2;
        l2 = [];
        for (var h = 0; h < c.length; h++) {
          var x = c[h];
          K_(n, x);
        }
      }
      Qp(), Aw(n.current, !0), mn = o, wu(), b0 ? n === T0 ? Kd++ : (Kd = 0, T0 = n) : Kd = 0, u2 = !1, b0 = !1, Ip(n);
      {
        var T = n.current.stateNode;
        T.effectDuration = 0, T.passiveEffectDuration = 0;
      }
      return !0;
    }
    function Dw(e) {
      return Xd !== null && Xd.has(e);
    }
    function KD(e) {
      Xd === null ? Xd = /* @__PURE__ */ new Set([e]) : Xd.add(e);
    }
    function ZD(e) {
      C0 || (C0 = !0, i2 = e);
    }
    var JD = ZD;
    function kw(e, n, l) {
      var o = ef(l, n), c = ME(e, o, Pt), h = bu(e, c, Pt), x = ti();
      h !== null && (uu(h, Pt, x), Ci(h, x));
    }
    function Wn(e, n, l) {
      if (q_(l), yh(!1), e.tag === b) {
        kw(e, e, l);
        return;
      }
      var o = null;
      for (o = n; o !== null; ) {
        if (o.tag === b) {
          kw(o, e, l);
          return;
        } else if (o.tag === E) {
          var c = o.type, h = o.stateNode;
          if (typeof c.getDerivedStateFromError == "function" || typeof h.componentDidCatch == "function" && !Dw(h)) {
            var x = ef(l, e), T = NS(o, x, Pt), M = bu(o, T, Pt), N = ti();
            M !== null && (uu(M, Pt, N), Ci(M, N));
            return;
          }
        }
        o = o.return;
      }
      v(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, l);
    }
    function ek(e, n, l) {
      var o = e.pingCache;
      o !== null && o.delete(n);
      var c = ti();
      ud(e, l), uk(e), ei === e && ms(Kr, l) && (Zr === oh || Zr === x0 && hs(Kr) && kr() - a2 < mw ? af(e, Ae) : w0 = Jt(w0, l)), Ci(e, c);
    }
    function Ow(e, n) {
      n === wn && (n = ND(e));
      var l = ti(), o = xi(e, n);
      o !== null && (uu(o, n, l), Ci(o, l));
    }
    function tk(e) {
      var n = e.memoizedState, l = wn;
      n !== null && (l = n.retryLane), Ow(e, l);
    }
    function nk(e, n) {
      var l = wn, o;
      switch (e.tag) {
        case H:
          o = e.stateNode;
          var c = e.memoizedState;
          c !== null && (l = c.retryLane);
          break;
        case ne:
          o = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      o !== null && o.delete(n), Ow(e, l);
    }
    function rk(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : kD(e / 1960) * 1960;
    }
    function ak() {
      if (ph > AD)
        throw ph = 0, s2 = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Kd > LD && (Kd = 0, T0 = null, v("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function ik() {
      Yl.flushLegacyContextWarning(), Yl.flushPendingUnsafeLifecycleWarnings();
    }
    function Aw(e, n) {
      An(e), k0(e, mo, bD), n && k0(e, ll, TD), k0(e, mo, wD), n && k0(e, ll, CD), Yn();
    }
    function k0(e, n, l) {
      for (var o = e, c = null; o !== null; ) {
        var h = o.subtreeFlags & n;
        o !== c && o.child !== null && h !== Dt ? o = o.child : ((o.flags & n) !== Dt && l(o), o.sibling !== null ? o = o.sibling : o = c = o.return);
      }
    }
    var O0 = null;
    function Lw(e) {
      {
        if ((mn & ba) !== Xr || !(e.mode & ln))
          return;
        var n = e.tag;
        if (n !== C && n !== b && n !== E && n !== S && n !== $ && n !== V && n !== Y)
          return;
        var l = Gt(e) || "ReactComponent";
        if (O0 !== null) {
          if (O0.has(l))
            return;
          O0.add(l);
        } else
          O0 = /* @__PURE__ */ new Set([l]);
        var o = Hr;
        try {
          An(e), v("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          o ? An(e) : Yn();
        }
      }
    }
    var v2;
    {
      var lk = null;
      v2 = function(e, n, l) {
        var o = Hw(lk, n);
        try {
          return WE(e, n, l);
        } catch (h) {
          if (gM() || h !== null && typeof h == "object" && typeof h.then == "function")
            throw h;
          if (Fy(), Gx(), ZE(e, n), Hw(n, o), n.mode & bn && mS(n), ho(null, WE, null, e, n, l), Ll()) {
            var c = sc();
            typeof c == "object" && c !== null && c._suppressLogging && typeof h == "object" && h !== null && !h._suppressLogging && (h._suppressLogging = !0);
          }
          throw h;
        }
      };
    }
    var Nw = !1, h2;
    h2 = /* @__PURE__ */ new Set();
    function ok(e) {
      if (Ji && !XM())
        switch (e.tag) {
          case S:
          case $:
          case Y: {
            var n = vr && Gt(vr) || "Unknown", l = n;
            if (!h2.has(l)) {
              h2.add(l);
              var o = Gt(e) || "Unknown";
              v("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", o, n, n);
            }
            break;
          }
          case E: {
            Nw || (v("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), Nw = !0);
            break;
          }
        }
    }
    function mh(e, n) {
      if (Na) {
        var l = e.memoizedUpdaters;
        l.forEach(function(o) {
          Mc(e, o, n);
        });
      }
    }
    var m2 = {};
    function y2(e, n) {
      {
        var l = Jl.current;
        return l !== null ? (l.push(n), m2) : Fp(e, n);
      }
    }
    function zw(e) {
      if (e !== m2)
        return wm(e);
    }
    function Uw() {
      return Jl.current !== null;
    }
    function sk(e) {
      {
        if (e.mode & ln) {
          if (!pw())
            return;
        } else if (!DD() || mn !== Xr || e.tag !== S && e.tag !== $ && e.tag !== Y)
          return;
        if (Jl.current === null) {
          var n = Hr;
          try {
            An(e), v(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Gt(e));
          } finally {
            n ? An(e) : Yn();
          }
        }
      }
    }
    function uk(e) {
      e.tag !== Eu && pw() && Jl.current === null && v(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function yh(e) {
      Sw = e;
    }
    var El = null, Zd = null, ck = function(e) {
      El = e;
    };
    function Jd(e) {
      {
        if (El === null)
          return e;
        var n = El(e);
        return n === void 0 ? e : n.current;
      }
    }
    function g2(e) {
      return Jd(e);
    }
    function S2(e) {
      {
        if (El === null)
          return e;
        var n = El(e);
        if (n === void 0) {
          if (e != null && typeof e.render == "function") {
            var l = Jd(e.render);
            if (e.render !== l) {
              var o = {
                $$typeof: ke,
                render: l
              };
              return e.displayName !== void 0 && (o.displayName = e.displayName), o;
            }
          }
          return e;
        }
        return n.current;
      }
    }
    function jw(e, n) {
      {
        if (El === null)
          return !1;
        var l = e.elementType, o = n.type, c = !1, h = typeof o == "object" && o !== null ? o.$$typeof : null;
        switch (e.tag) {
          case E: {
            typeof o == "function" && (c = !0);
            break;
          }
          case S: {
            (typeof o == "function" || h === Ht) && (c = !0);
            break;
          }
          case $: {
            (h === ke || h === Ht) && (c = !0);
            break;
          }
          case V:
          case Y: {
            (h === Yt || h === Ht) && (c = !0);
            break;
          }
          default:
            return !1;
        }
        if (c) {
          var x = El(l);
          if (x !== void 0 && x === El(o))
            return !0;
        }
        return !1;
      }
    }
    function Fw(e) {
      {
        if (El === null || typeof WeakSet != "function")
          return;
        Zd === null && (Zd = /* @__PURE__ */ new WeakSet()), Zd.add(e);
      }
    }
    var fk = function(e, n) {
      {
        if (El === null)
          return;
        var l = n.staleFamilies, o = n.updatedFamilies;
        Ls(), As(function() {
          x2(e.current, o, l);
        });
      }
    }, dk = function(e, n) {
      {
        if (e.context !== Hi)
          return;
        Ls(), As(function() {
          gh(n, e, null, null);
        });
      }
    };
    function x2(e, n, l) {
      {
        var o = e.alternate, c = e.child, h = e.sibling, x = e.tag, T = e.type, M = null;
        switch (x) {
          case S:
          case Y:
          case E:
            M = T;
            break;
          case $:
            M = T.render;
            break;
        }
        if (El === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var N = !1, z = !1;
        if (M !== null) {
          var te = El(M);
          te !== void 0 && (l.has(te) ? z = !0 : n.has(te) && (x === E ? z = !0 : N = !0));
        }
        if (Zd !== null && (Zd.has(e) || o !== null && Zd.has(o)) && (z = !0), z && (e._debugNeedsRemount = !0), z || N) {
          var J = xi(e, Pt);
          J !== null && Jr(J, e, Pt, Pn);
        }
        c !== null && !z && x2(c, n, l), h !== null && x2(h, n, l);
      }
    }
    var pk = function(e, n) {
      {
        var l = /* @__PURE__ */ new Set(), o = new Set(n.map(function(c) {
          return c.current;
        }));
        return E2(e.current, o, l), l;
      }
    };
    function E2(e, n, l) {
      {
        var o = e.child, c = e.sibling, h = e.tag, x = e.type, T = null;
        switch (h) {
          case S:
          case Y:
          case E:
            T = x;
            break;
          case $:
            T = x.render;
            break;
        }
        var M = !1;
        T !== null && n.has(T) && (M = !0), M ? vk(e, l) : o !== null && E2(o, n, l), c !== null && E2(c, n, l);
      }
    }
    function vk(e, n) {
      {
        var l = hk(e, n);
        if (l)
          return;
        for (var o = e; ; ) {
          switch (o.tag) {
            case D:
              n.add(o.stateNode);
              return;
            case R:
              n.add(o.stateNode.containerInfo);
              return;
            case b:
              n.add(o.stateNode.containerInfo);
              return;
          }
          if (o.return === null)
            throw new Error("Expected to reach root first.");
          o = o.return;
        }
      }
    }
    function hk(e, n) {
      for (var l = e, o = !1; ; ) {
        if (l.tag === D)
          o = !0, n.add(l.stateNode);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === e)
          return o;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === e)
            return o;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
      return !1;
    }
    var w2;
    {
      w2 = !1;
      try {
        var Pw = Object.preventExtensions({});
      } catch {
        w2 = !0;
      }
    }
    function mk(e, n, l, o) {
      this.tag = e, this.key = l, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = n, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = o, this.flags = Dt, this.subtreeFlags = Dt, this.deletions = null, this.lanes = Ae, this.childLanes = Ae, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !w2 && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var Vi = function(e, n, l, o) {
      return new mk(e, n, l, o);
    };
    function C2(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function yk(e) {
      return typeof e == "function" && !C2(e) && e.defaultProps === void 0;
    }
    function gk(e) {
      if (typeof e == "function")
        return C2(e) ? E : S;
      if (e != null) {
        var n = e.$$typeof;
        if (n === ke)
          return $;
        if (n === Yt)
          return V;
      }
      return C;
    }
    function of(e, n) {
      var l = e.alternate;
      l === null ? (l = Vi(e.tag, n, e.key, e.mode), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l._debugSource = e._debugSource, l._debugOwner = e._debugOwner, l._debugHookTypes = e._debugHookTypes, l.alternate = e, e.alternate = l) : (l.pendingProps = n, l.type = e.type, l.flags = Dt, l.subtreeFlags = Dt, l.deletions = null, l.actualDuration = 0, l.actualStartTime = -1), l.flags = e.flags & Sr, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue;
      var o = e.dependencies;
      switch (l.dependencies = o === null ? null : {
        lanes: o.lanes,
        firstContext: o.firstContext
      }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.selfBaseDuration = e.selfBaseDuration, l.treeBaseDuration = e.treeBaseDuration, l._debugNeedsRemount = e._debugNeedsRemount, l.tag) {
        case C:
        case S:
        case Y:
          l.type = Jd(e.type);
          break;
        case E:
          l.type = g2(e.type);
          break;
        case $:
          l.type = S2(e.type);
          break;
      }
      return l;
    }
    function Sk(e, n) {
      e.flags &= Sr | tr;
      var l = e.alternate;
      if (l === null)
        e.childLanes = Ae, e.lanes = n, e.child = null, e.subtreeFlags = Dt, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = Dt, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type;
        var o = l.dependencies;
        e.dependencies = o === null ? null : {
          lanes: o.lanes,
          firstContext: o.firstContext
        }, e.selfBaseDuration = l.selfBaseDuration, e.treeBaseDuration = l.treeBaseDuration;
      }
      return e;
    }
    function xk(e, n, l) {
      var o;
      return e === _y ? (o = ln, n === !0 && (o |= zn, o |= Tn)) : o = kt, Na && (o |= bn), Vi(b, null, null, o);
    }
    function b2(e, n, l, o, c, h) {
      var x = C, T = e;
      if (typeof e == "function")
        C2(e) ? (x = E, T = g2(T)) : T = Jd(T);
      else if (typeof e == "string")
        x = D;
      else
        e: switch (e) {
          case Ma:
            return Nu(l.children, c, h, n);
          case oa:
            x = L, c |= zn, (c & ln) !== kt && (c |= Tn);
            break;
          case Wa:
            return Ek(l, c, h, n);
          case et:
            return wk(l, c, h, n);
          case ut:
            return Ck(l, c, h, n);
          case Gn:
            return $w(l, c, h, n);
          case gn:
          // eslint-disable-next-line no-fallthrough
          case tn:
          // eslint-disable-next-line no-fallthrough
          case En:
          // eslint-disable-next-line no-fallthrough
          case qn:
          // eslint-disable-next-line no-fallthrough
          case Zt:
          // eslint-disable-next-line no-fallthrough
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case Nr:
                  x = q;
                  break e;
                case B:
                  x = U;
                  break e;
                case ke:
                  x = $, T = S2(T);
                  break e;
                case Yt:
                  x = V;
                  break e;
                case Ht:
                  x = ie, T = null;
                  break e;
              }
            var M = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (M += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var N = o ? Gt(o) : null;
              N && (M += `

Check the render method of \`` + N + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + M));
          }
        }
      var z = Vi(x, l, n, c);
      return z.elementType = e, z.type = T, z.lanes = h, z._debugOwner = o, z;
    }
    function T2(e, n, l) {
      var o = null;
      o = e._owner;
      var c = e.type, h = e.key, x = e.props, T = b2(c, h, x, o, n, l);
      return T._debugSource = e._source, T._debugOwner = e._owner, T;
    }
    function Nu(e, n, l, o) {
      var c = Vi(A, e, o, n);
      return c.lanes = l, c;
    }
    function Ek(e, n, l, o) {
      typeof e.id != "string" && v('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var c = Vi(F, e, o, n | bn);
      return c.elementType = Wa, c.lanes = l, c.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, c;
    }
    function wk(e, n, l, o) {
      var c = Vi(H, e, o, n);
      return c.elementType = et, c.lanes = l, c;
    }
    function Ck(e, n, l, o) {
      var c = Vi(ne, e, o, n);
      return c.elementType = ut, c.lanes = l, c;
    }
    function $w(e, n, l, o) {
      var c = Vi(G, e, o, n);
      c.elementType = Gn, c.lanes = l;
      var h = {
        isHidden: !1
      };
      return c.stateNode = h, c;
    }
    function R2(e, n, l) {
      var o = Vi(_, e, null, n);
      return o.lanes = l, o;
    }
    function bk() {
      var e = Vi(D, null, null, kt);
      return e.elementType = "DELETED", e;
    }
    function Tk(e) {
      var n = Vi(P, null, null, kt);
      return n.stateNode = e, n;
    }
    function M2(e, n, l) {
      var o = e.children !== null ? e.children : [], c = Vi(R, o, e.key, n);
      return c.lanes = l, c.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, c;
    }
    function Hw(e, n) {
      return e === null && (e = Vi(C, null, null, kt)), e.tag = n.tag, e.key = n.key, e.elementType = n.elementType, e.type = n.type, e.stateNode = n.stateNode, e.return = n.return, e.child = n.child, e.sibling = n.sibling, e.index = n.index, e.ref = n.ref, e.pendingProps = n.pendingProps, e.memoizedProps = n.memoizedProps, e.updateQueue = n.updateQueue, e.memoizedState = n.memoizedState, e.dependencies = n.dependencies, e.mode = n.mode, e.flags = n.flags, e.subtreeFlags = n.subtreeFlags, e.deletions = n.deletions, e.lanes = n.lanes, e.childLanes = n.childLanes, e.alternate = n.alternate, e.actualDuration = n.actualDuration, e.actualStartTime = n.actualStartTime, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration, e._debugSource = n._debugSource, e._debugOwner = n._debugOwner, e._debugNeedsRemount = n._debugNeedsRemount, e._debugHookTypes = n._debugHookTypes, e;
    }
    function Rk(e, n, l, o, c) {
      this.tag = n, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = sg, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = wn, this.eventTimes = Rc(Ae), this.expirationTimes = Rc(Pn), this.pendingLanes = Ae, this.suspendedLanes = Ae, this.pingedLanes = Ae, this.expiredLanes = Ae, this.mutableReadLanes = Ae, this.finishedLanes = Ae, this.entangledLanes = Ae, this.entanglements = Rc(Ae), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var h = this.pendingUpdatersLaneMap = [], x = 0; x < us; x++)
          h.push(/* @__PURE__ */ new Set());
      }
      switch (n) {
        case _y:
          this._debugRootType = l ? "hydrateRoot()" : "createRoot()";
          break;
        case Eu:
          this._debugRootType = l ? "hydrate()" : "render()";
          break;
      }
    }
    function Vw(e, n, l, o, c, h, x, T, M, N) {
      var z = new Rk(e, n, l, T, M), te = xk(n, h);
      z.current = te, te.stateNode = z;
      {
        var J = {
          element: o,
          isDehydrated: l,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        te.memoizedState = J;
      }
      return $g(te), z;
    }
    var _2 = "18.3.1";
    function Mk(e, n, l) {
      var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return $e(o), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: In,
        key: o == null ? null : "" + o,
        children: e,
        containerInfo: n,
        implementation: l
      };
    }
    var D2, k2;
    D2 = !1, k2 = {};
    function Iw(e) {
      if (!e)
        return Hi;
      var n = ru(e), l = uM(n);
      if (n.tag === E) {
        var o = n.type;
        if (Lo(o))
          return mx(n, o, l);
      }
      return l;
    }
    function _k(e, n) {
      {
        var l = ru(e);
        if (l === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var o = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + o);
        }
        var c = Aa(l);
        if (c === null)
          return null;
        if (c.mode & zn) {
          var h = Gt(l) || "Component";
          if (!k2[h]) {
            k2[h] = !0;
            var x = Hr;
            try {
              An(c), l.mode & zn ? v("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", n, n, h) : v("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", n, n, h);
            } finally {
              x ? An(x) : Yn();
            }
          }
        }
        return c.stateNode;
      }
    }
    function qw(e, n, l, o, c, h, x, T) {
      var M = !1, N = null;
      return Vw(e, n, M, N, l, o, c, h, x);
    }
    function Yw(e, n, l, o, c, h, x, T, M, N) {
      var z = !0, te = Vw(l, o, z, e, c, h, x, T, M);
      te.context = Iw(null);
      var J = te.current, he = ti(), ge = Au(J), we = _s(he, ge);
      return we.callback = n ?? null, bu(J, we, ge), zD(te, ge, he), te;
    }
    function gh(e, n, l, o) {
      Hp(n, e);
      var c = n.current, h = ti(), x = Au(c);
      rr(x);
      var T = Iw(l);
      n.context === null ? n.context = T : n.pendingContext = T, Ji && Hr !== null && !D2 && (D2 = !0, v(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Gt(Hr) || "Unknown"));
      var M = _s(h, x);
      M.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (typeof o != "function" && v("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", o), M.callback = o);
      var N = bu(c, M, x);
      return N !== null && (Jr(N, c, x, h), Iy(N, c, x)), x;
    }
    function A0(e) {
      var n = e.current;
      return n.child ? n.child.tag === D ? n.child.stateNode : n.child.stateNode : null;
    }
    function Dk(e) {
      switch (e.tag) {
        case b: {
          var n = e.stateNode;
          if (fd(n)) {
            var l = _m(n);
            PD(n, l);
          }
          break;
        }
        case H: {
          As(function() {
            var c = xi(e, Pt);
            if (c !== null) {
              var h = ti();
              Jr(c, e, Pt, h);
            }
          });
          var o = Pt;
          O2(e, o);
          break;
        }
      }
    }
    function Ww(e, n) {
      var l = e.memoizedState;
      l !== null && l.dehydrated !== null && (l.retryLane = Lm(l.retryLane, n));
    }
    function O2(e, n) {
      Ww(e, n);
      var l = e.alternate;
      l && Ww(l, n);
    }
    function kk(e) {
      if (e.tag === H) {
        var n = xc, l = xi(e, n);
        if (l !== null) {
          var o = ti();
          Jr(l, e, n, o);
        }
        O2(e, n);
      }
    }
    function Ok(e) {
      if (e.tag === H) {
        var n = Au(e), l = xi(e, n);
        if (l !== null) {
          var o = ti();
          Jr(l, e, n, o);
        }
        O2(e, n);
      }
    }
    function Bw(e) {
      var n = Xn(e);
      return n === null ? null : n.stateNode;
    }
    var Gw = function(e) {
      return null;
    };
    function Ak(e) {
      return Gw(e);
    }
    var Qw = function(e) {
      return !1;
    };
    function Lk(e) {
      return Qw(e);
    }
    var Xw = null, Kw = null, Zw = null, Jw = null, eC = null, tC = null, nC = null, rC = null, aC = null;
    {
      var iC = function(e, n, l) {
        var o = n[l], c = rn(e) ? e.slice() : Qt({}, e);
        return l + 1 === n.length ? (rn(c) ? c.splice(o, 1) : delete c[o], c) : (c[o] = iC(e[o], n, l + 1), c);
      }, lC = function(e, n) {
        return iC(e, n, 0);
      }, oC = function(e, n, l, o) {
        var c = n[o], h = rn(e) ? e.slice() : Qt({}, e);
        if (o + 1 === n.length) {
          var x = l[o];
          h[x] = h[c], rn(h) ? h.splice(c, 1) : delete h[c];
        } else
          h[c] = oC(
            // $FlowFixMe number or string is fine here
            e[c],
            n,
            l,
            o + 1
          );
        return h;
      }, sC = function(e, n, l) {
        if (n.length !== l.length) {
          m("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var o = 0; o < l.length - 1; o++)
            if (n[o] !== l[o]) {
              m("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return oC(e, n, l, 0);
      }, uC = function(e, n, l, o) {
        if (l >= n.length)
          return o;
        var c = n[l], h = rn(e) ? e.slice() : Qt({}, e);
        return h[c] = uC(e[c], n, l + 1, o), h;
      }, cC = function(e, n, l) {
        return uC(e, n, 0, l);
      }, A2 = function(e, n) {
        for (var l = e.memoizedState; l !== null && n > 0; )
          l = l.next, n--;
        return l;
      };
      Xw = function(e, n, l, o) {
        var c = A2(e, n);
        if (c !== null) {
          var h = cC(c.memoizedState, l, o);
          c.memoizedState = h, c.baseState = h, e.memoizedProps = Qt({}, e.memoizedProps);
          var x = xi(e, Pt);
          x !== null && Jr(x, e, Pt, Pn);
        }
      }, Kw = function(e, n, l) {
        var o = A2(e, n);
        if (o !== null) {
          var c = lC(o.memoizedState, l);
          o.memoizedState = c, o.baseState = c, e.memoizedProps = Qt({}, e.memoizedProps);
          var h = xi(e, Pt);
          h !== null && Jr(h, e, Pt, Pn);
        }
      }, Zw = function(e, n, l, o) {
        var c = A2(e, n);
        if (c !== null) {
          var h = sC(c.memoizedState, l, o);
          c.memoizedState = h, c.baseState = h, e.memoizedProps = Qt({}, e.memoizedProps);
          var x = xi(e, Pt);
          x !== null && Jr(x, e, Pt, Pn);
        }
      }, Jw = function(e, n, l) {
        e.pendingProps = cC(e.memoizedProps, n, l), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = xi(e, Pt);
        o !== null && Jr(o, e, Pt, Pn);
      }, eC = function(e, n) {
        e.pendingProps = lC(e.memoizedProps, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var l = xi(e, Pt);
        l !== null && Jr(l, e, Pt, Pn);
      }, tC = function(e, n, l) {
        e.pendingProps = sC(e.memoizedProps, n, l), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = xi(e, Pt);
        o !== null && Jr(o, e, Pt, Pn);
      }, nC = function(e) {
        var n = xi(e, Pt);
        n !== null && Jr(n, e, Pt, Pn);
      }, rC = function(e) {
        Gw = e;
      }, aC = function(e) {
        Qw = e;
      };
    }
    function Nk(e) {
      var n = Aa(e);
      return n === null ? null : n.stateNode;
    }
    function zk(e) {
      return null;
    }
    function Uk() {
      return Hr;
    }
    function jk(e) {
      var n = e.findFiberByHostInstance, l = s.ReactCurrentDispatcher;
      return lu({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: Xw,
        overrideHookStateDeletePath: Kw,
        overrideHookStateRenamePath: Zw,
        overrideProps: Jw,
        overridePropsDeletePath: eC,
        overridePropsRenamePath: tC,
        setErrorHandler: rC,
        setSuspenseHandler: aC,
        scheduleUpdate: nC,
        currentDispatcherRef: l,
        findHostInstanceByFiber: Nk,
        findFiberByHostInstance: n || zk,
        // React Refresh
        findHostInstancesForRefresh: pk,
        scheduleRefresh: fk,
        scheduleRoot: dk,
        setRefreshHandler: ck,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: Uk,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: _2
      });
    }
    var fC = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function L2(e) {
      this._internalRoot = e;
    }
    L0.prototype.render = L2.prototype.render = function(e) {
      var n = this._internalRoot;
      if (n === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? v("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : N0(arguments[1]) ? v("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && v("You passed a second argument to root.render(...) but it only accepts one argument.");
        var l = n.containerInfo;
        if (l.nodeType !== yr) {
          var o = Bw(n.current);
          o && o.parentNode !== l && v("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      gh(e, n, null, null);
    }, L0.prototype.unmount = L2.prototype.unmount = function() {
      typeof arguments[0] == "function" && v("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var n = e.containerInfo;
        Cw() && v("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), As(function() {
          gh(null, e, null, null);
        }), fx(n);
      }
    };
    function Fk(e, n) {
      if (!N0(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      dC(e);
      var l = !1, o = !1, c = "", h = fC;
      n != null && (n.hydrate ? m("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof n == "object" && n !== null && n.$$typeof === Lr && v(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (c = n.identifierPrefix), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.transitionCallbacks !== void 0 && n.transitionCallbacks);
      var x = qw(e, _y, null, l, o, c, h);
      Ey(x.current, e);
      var T = e.nodeType === yr ? e.parentNode : e;
      return bv(T), new L2(x);
    }
    function L0(e) {
      this._internalRoot = e;
    }
    function Pk(e) {
      e && Im(e);
    }
    L0.prototype.unstable_scheduleHydration = Pk;
    function $k(e, n, l) {
      if (!N0(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      dC(e), n === void 0 && v("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var o = l ?? null, c = l != null && l.hydratedSources || null, h = !1, x = !1, T = "", M = fC;
      l != null && (l.unstable_strictMode === !0 && (h = !0), l.identifierPrefix !== void 0 && (T = l.identifierPrefix), l.onRecoverableError !== void 0 && (M = l.onRecoverableError));
      var N = Yw(n, null, e, _y, o, h, x, T, M);
      if (Ey(N.current, e), bv(e), c)
        for (var z = 0; z < c.length; z++) {
          var te = c[z];
          qM(N, te);
        }
      return new L0(N);
    }
    function N0(e) {
      return !!(e && (e.nodeType === Da || e.nodeType === Al || e.nodeType === Rp));
    }
    function Sh(e) {
      return !!(e && (e.nodeType === Da || e.nodeType === Al || e.nodeType === Rp || e.nodeType === yr && e.nodeValue === " react-mount-point-unstable "));
    }
    function dC(e) {
      e.nodeType === Da && e.tagName && e.tagName.toUpperCase() === "BODY" && v("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), zv(e) && (e._reactRootContainer ? v("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : v("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var Hk = s.ReactCurrentOwner, pC;
    pC = function(e) {
      if (e._reactRootContainer && e.nodeType !== yr) {
        var n = Bw(e._reactRootContainer.current);
        n && n.parentNode !== e && v("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var l = !!e._reactRootContainer, o = N2(e), c = !!(o && Su(o));
      c && !l && v("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Da && e.tagName && e.tagName.toUpperCase() === "BODY" && v("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function N2(e) {
      return e ? e.nodeType === Al ? e.documentElement : e.firstChild : null;
    }
    function vC() {
    }
    function Vk(e, n, l, o, c) {
      if (c) {
        if (typeof o == "function") {
          var h = o;
          o = function() {
            var J = A0(x);
            h.call(J);
          };
        }
        var x = Yw(
          n,
          o,
          e,
          Eu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          vC
        );
        e._reactRootContainer = x, Ey(x.current, e);
        var T = e.nodeType === yr ? e.parentNode : e;
        return bv(T), As(), x;
      } else {
        for (var M; M = e.lastChild; )
          e.removeChild(M);
        if (typeof o == "function") {
          var N = o;
          o = function() {
            var J = A0(z);
            N.call(J);
          };
        }
        var z = qw(
          e,
          Eu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          vC
        );
        e._reactRootContainer = z, Ey(z.current, e);
        var te = e.nodeType === yr ? e.parentNode : e;
        return bv(te), As(function() {
          gh(n, z, l, o);
        }), z;
      }
    }
    function Ik(e, n) {
      e !== null && typeof e != "function" && v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", n, e);
    }
    function z0(e, n, l, o, c) {
      pC(l), Ik(c === void 0 ? null : c, "render");
      var h = l._reactRootContainer, x;
      if (!h)
        x = Vk(l, n, e, c, o);
      else {
        if (x = h, typeof c == "function") {
          var T = c;
          c = function() {
            var M = A0(x);
            T.call(M);
          };
        }
        gh(n, x, e, c);
      }
      return A0(x);
    }
    var hC = !1;
    function qk(e) {
      {
        hC || (hC = !0, v("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var n = Hk.current;
        if (n !== null && n.stateNode !== null) {
          var l = n.stateNode._warnedAboutRefsInRender;
          l || v("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Sn(n.type) || "A component"), n.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Da ? e : _k(e, "findDOMNode");
    }
    function Yk(e, n, l) {
      if (v("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Sh(n))
        throw new Error("Target container is not a DOM element.");
      {
        var o = zv(n) && n._reactRootContainer === void 0;
        o && v("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return z0(null, e, n, !0, l);
    }
    function Wk(e, n, l) {
      if (v("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Sh(n))
        throw new Error("Target container is not a DOM element.");
      {
        var o = zv(n) && n._reactRootContainer === void 0;
        o && v("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return z0(null, e, n, !1, l);
    }
    function Bk(e, n, l, o) {
      if (v("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Sh(l))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !O1(e))
        throw new Error("parentComponent must be a valid React Component");
      return z0(e, n, l, !1, o);
    }
    var mC = !1;
    function Gk(e) {
      if (mC || (mC = !0, v("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Sh(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var n = zv(e) && e._reactRootContainer === void 0;
        n && v("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var l = N2(e), o = l && !Su(l);
          o && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return As(function() {
          z0(null, null, e, !1, function() {
            e._reactRootContainer = null, fx(e);
          });
        }), !0;
      } else {
        {
          var c = N2(e), h = !!(c && Su(c)), x = e.nodeType === Da && Sh(e.parentNode) && !!e.parentNode._reactRootContainer;
          h && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", x ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    na(Dk), cu(kk), Pm(Ok), Oc(yi), ov(Um), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && v("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), _f(XT), k1(f2, $D, As);
    function Qk(e, n) {
      var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!N0(n))
        throw new Error("Target container is not a DOM element.");
      return Mk(e, n, null, l);
    }
    function Xk(e, n, l, o) {
      return Bk(e, n, l, o);
    }
    var z2 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Su, kd, wy, Js, Df, f2]
    };
    function Kk(e, n) {
      return z2.usingClientEntryPoint || v('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Fk(e, n);
    }
    function Zk(e, n, l) {
      return z2.usingClientEntryPoint || v('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), $k(e, n, l);
    }
    function Jk(e) {
      return Cw() && v("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), As(e);
    }
    var e5 = jk({
      findFiberByHostInstance: Yc,
      bundleType: 1,
      version: _2,
      rendererPackageName: "react-dom"
    });
    if (!e5 && vt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var yC = window.location.protocol;
      /^(https?|file):$/.test(yC) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (yC === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Ti.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = z2, Ti.createPortal = Qk, Ti.createRoot = Kk, Ti.findDOMNode = qk, Ti.flushSync = Jk, Ti.hydrate = Yk, Ti.hydrateRoot = Zk, Ti.render = Wk, Ti.unmountComponentAtNode = Gk, Ti.unstable_batchedUpdates = f2, Ti.unstable_renderSubtreeIntoContainer = Xk, Ti.version = _2, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })()), Ti;
}
var HC;
function bz() {
  if (HC) return I0.exports;
  HC = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (t(), I0.exports = wz()) : I0.exports = Cz(), I0.exports;
}
var VC;
function Tz() {
  if (VC) return rp;
  VC = 1;
  var t = bz();
  if (process.env.NODE_ENV === "production")
    rp.createRoot = t.createRoot, rp.hydrateRoot = t.hydrateRoot;
  else {
    var a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    rp.createRoot = function(s, f) {
      a.usingClientEntryPoint = !0;
      try {
        return t.createRoot(s, f);
      } finally {
        a.usingClientEntryPoint = !1;
      }
    }, rp.hydrateRoot = function(s, f, p) {
      a.usingClientEntryPoint = !0;
      try {
        return t.hydrateRoot(s, f, p);
      } finally {
        a.usingClientEntryPoint = !1;
      }
    };
  }
  return rp;
}
var Rz = Tz();
const eo = (t) => typeof t != "number" ? "N/A" : `${Math.round(t)} ms`;
function Y0({ title: t }) {
  return /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-col-span-2 s3d-flex s3d-items-center s3d-gap-1.5 s3d-my-0.5", children: [
    /* @__PURE__ */ Oe.jsx("div", { className: "s3d-flex-1 s3d-border-t s3d-border-slate-700" }),
    /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[8px] s3d-uppercase s3d-tracking-widest s3d-font-semibold", children: t }),
    /* @__PURE__ */ Oe.jsx("div", { className: "s3d-flex-1 s3d-border-t s3d-border-slate-700" })
  ] });
}
function Mz({ viewport: t }) {
  const [a, s] = ia.useState({
    fps: 0,
    maxFps: 0,
    totalObjects: 0,
    visibleObjects: 0,
    faces: 0,
    sortTime: 0,
    cullTime: 0,
    groupTime: 0,
    processTime: 0,
    updateTime: 0,
    retrieveTime: 0,
    frameTime: 0,
    drawCalls: 0,
    dt: 0,
    fillDrawCalls: 0,
    fogDrawCalls: 0,
    shadeDrawCalls: 0,
    drawCallsTotal: 0,
    fillVertices: 0,
    fogVertices: 0,
    shadeVertices: 0,
    fillRasterTime: 0,
    shadeRasterTime: 0,
    fogSortTime: 0,
    fogRasterTime: 0
  }), [f, p] = ia.useState(() => localStorage.getItem("s3d-debug-open") === "true"), [m, v] = ia.useState(() => localStorage.getItem("s3d-wireframe") === "true"), [g, S] = ia.useState(() => localStorage.getItem("s3d-debug-normals") === "true"), [E, C] = ia.useState(() => localStorage.getItem("s3d-debug-axis") === "true"), [b, R] = ia.useState(() => localStorage.getItem("s3d-fill-enabled") !== "false"), [D, _] = ia.useState(() => localStorage.getItem("s3d-shade-enabled") !== "false"), [A, L] = ia.useState(() => localStorage.getItem("s3d-fog-enabled") !== "false");
  ia.useEffect(() => {
    t && (t.wireframe = m, t.debugNormals = g, t.debugAxis = E, t.fillEnabled = b, t.shadeEnabled = D, t.fogEnabled = A);
  }, [t]), ia.useEffect(() => {
    const Y = () => {
      t && (v(!!t.wireframe), S(!!t.debugNormals), C(!!t.debugAxis), R(!!t.fillEnabled), _(!!t.shadeEnabled), L(!!t.fogEnabled));
    };
    Y();
    const ie = setInterval(Y, 500);
    return () => clearInterval(ie);
  }, [t]), ia.useEffect(() => {
    localStorage.setItem("s3d-debug-open", f);
  }, [f]), ia.useEffect(() => {
    localStorage.setItem("s3d-wireframe", m);
  }, [m]), ia.useEffect(() => {
    localStorage.setItem("s3d-debug-normals", g);
  }, [g]), ia.useEffect(() => {
    localStorage.setItem("s3d-debug-axis", E);
  }, [E]), ia.useEffect(() => {
    localStorage.setItem("s3d-fill-enabled", b);
  }, [b]), ia.useEffect(() => {
    localStorage.setItem("s3d-shade-enabled", D);
  }, [D]), ia.useEffect(() => {
    localStorage.setItem("s3d-fog-enabled", A);
  }, [A]), ia.useEffect(() => {
    let Y = 0;
    const ie = setInterval(() => {
      if (t) {
        const Q = t.lastRenderStats || {};
        Y = Math.max(Y, Q.fps || 0), s({
          fps: Q.fps || 0,
          maxFps: Y,
          totalObjects: Q.totalObjects || 0,
          visibleObjects: Q.visibleObjects || 0,
          faces: Q.faces || 0,
          sortTime: Q.sortTime || 0,
          cullTime: Q.cullTime || 0,
          groupTime: Q.groupTime || 0,
          processTime: Q.processTime || 0,
          updateTime: Q.updateTime || 0,
          retrieveTime: Q.retrieveTime || 0,
          frameTime: Q.frameTime || 0,
          drawCalls: Q.drawCalls || 0,
          dt: Q.dt || 0,
          fillDrawCalls: Q.fillDrawCalls || 0,
          fogDrawCalls: Q.fogDrawCalls || 0,
          shadeDrawCalls: Q.shadeDrawCalls || 0,
          drawCallsTotal: Q.drawCallsTotal || 0,
          fillVertices: Q.fillVertices || 0,
          fogVertices: Q.fogVertices || 0,
          shadeVertices: Q.shadeVertices || 0,
          fillRasterTime: Q.fillRasterTime || 0,
          shadeRasterTime: Q.shadeRasterTime || 0,
          fogSortTime: Q.fogSortTime || 0,
          fogRasterTime: Q.fogRasterTime || 0
        });
      }
    }, 100);
    return () => clearInterval(ie);
  }, [t]);
  const U = () => {
    const Y = !m;
    v(Y), t && (t.wireframe = Y), window.dispatchEvent(
      new CustomEvent("s3d-wireframe-change", {
        detail: { enabled: Y }
      })
    );
  }, q = () => {
    const Y = !g;
    S(Y), t && (t.debugNormals = Y);
  }, $ = () => {
    const Y = !E;
    C(Y), t && (t.debugAxis = Y);
  }, F = () => {
    const Y = !b;
    R(Y), t && (t.fillEnabled = Y);
  }, H = () => {
    const Y = !D;
    _(Y), t && (t.shadeEnabled = Y);
  }, V = () => {
    const Y = !A;
    L(Y), t && (t.fogEnabled = Y);
  };
  return /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-debug-container s3d-flex s3d-flex-col s3d-items-end s3d-gap-2 s3d-font-sans", children: [
    /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-gap-2", children: [
      /* @__PURE__ */ Oe.jsx(
        "button",
        {
          onClick: U,
          title: "Toggle Wireframe",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${m ? "s3d-bg-blue-600/80 s3d-border-blue-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Oe.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ Oe.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25m-9-5.25v9l9 5.25M12 12.75v9"
                }
              )
            }
          )
        }
      ),
      /* @__PURE__ */ Oe.jsx(
        "button",
        {
          onClick: q,
          title: "Toggle Debug Normals",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${g ? "s3d-bg-amber-600/80 s3d-border-amber-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Oe.jsxs(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: [
                /* @__PURE__ */ Oe.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M4 17l8-10 8 10H4z"
                  }
                ),
                /* @__PURE__ */ Oe.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 13V3" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ Oe.jsx(
        "button",
        {
          onClick: $,
          title: "Toggle Debug Axis",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${E ? "s3d-bg-purple-600/80 s3d-border-purple-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Oe.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ Oe.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M12 12L20 12M12 12L12 4M12 12L6 18"
                }
              )
            }
          )
        }
      ),
      /* @__PURE__ */ Oe.jsx(
        "button",
        {
          onClick: F,
          title: "Toggle Fill Pass",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${b ? "s3d-bg-cyan-600/80 s3d-border-cyan-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Oe.jsx("svg", { className: "s3d-w-5 s3d-h-5", viewBox: "0 0 24 24", children: /* @__PURE__ */ Oe.jsx(
            "rect",
            {
              x: "4",
              y: "4",
              width: "16",
              height: "16",
              rx: "2",
              fill: "currentColor"
            }
          ) })
        }
      ),
      /* @__PURE__ */ Oe.jsx(
        "button",
        {
          onClick: H,
          title: "Toggle Shade Pass",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${D ? "s3d-bg-orange-600/80 s3d-border-orange-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Oe.jsxs(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: [
                /* @__PURE__ */ Oe.jsx("circle", { cx: "12", cy: "12", r: "9" }),
                /* @__PURE__ */ Oe.jsx("path", { d: "M12 3a9 9 0 000 18z", fill: "currentColor", stroke: "none" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ Oe.jsx(
        "button",
        {
          onClick: V,
          title: "Toggle Fog Pass",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${A ? "s3d-bg-sky-600/80 s3d-border-sky-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Oe.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ Oe.jsx("path", { strokeLinecap: "round", d: "M3 8h13M3 12h17M3 16h10" })
            }
          )
        }
      ),
      /* @__PURE__ */ Oe.jsx(
        "button",
        {
          onClick: () => p(!f),
          title: "Toggle Diagnostics",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${f ? "s3d-bg-emerald-600/80 s3d-border-emerald-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Oe.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ Oe.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9zm0 0v3m-6.36 1.36l2.12 2.12M12 12l3.54-3.54"
                }
              )
            }
          )
        }
      )
    ] }),
    f && /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-w-56 s3d-bg-slate-900/85 s3d-backdrop-blur-md s3d-border s3d-border-slate-700/50 s3d-rounded-lg s3d-p-3 s3d-shadow-2xl s3d-text-slate-300 s3d-flex s3d-flex-col", children: [
      /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-justify-between s3d-items-center s3d-border-b s3d-border-slate-700 s3d-pb-1.5 s3d-mb-2.5", children: [
        /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide s3d-font-semibold", children: "FPS / FPS (max)" }),
        /* @__PURE__ */ Oe.jsxs("span", { className: "s3d-font-mono s3d-text-sm s3d-font-semibold", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-emerald-400", children: a.fps }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500", children: " / " }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-200", children: a.maxFps })
        ] })
      ] }),
      /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-grid s3d-grid-cols-2 s3d-gap-y-2.5 s3d-gap-x-3 s3d-text-[11px]", children: [
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Device DPR" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: (window.devicePixelRatio || 1).toFixed(2) })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Scene)" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.totalObjects })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Screen)" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.visibleObjects })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Faces (screen)" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.faces })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Update" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: eo(a.updateTime) })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Retrieval" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: eo(a.retrieveTime) })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Object Culling" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: eo(a.cullTime) })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Layer Grouping" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: eo(a.groupTime) })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Process Meshes" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: eo(a.processTime) })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Sort Faces" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: eo(a.sortTime) })
        ] }),
        /* @__PURE__ */ Oe.jsx(Y0, { title: "Fill" }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Draw Calls" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.fillDrawCalls })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Vertices" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.fillVertices })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Time (Cpu)" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: eo(a.fillRasterTime) })
        ] }),
        /* @__PURE__ */ Oe.jsx(Y0, { title: "Shade" }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Draw Calls" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.shadeDrawCalls })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Vertices" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.shadeVertices })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Time (Cpu)" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: eo(a.shadeRasterTime) })
        ] }),
        /* @__PURE__ */ Oe.jsx(Y0, { title: "Fog" }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Draw Calls" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.fogDrawCalls })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Vertices" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.fogVertices })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Sort" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: eo(a.fogSortTime) })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Time (Cpu)" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: eo(a.fogRasterTime) })
        ] }),
        /* @__PURE__ */ Oe.jsx(Y0, { title: "Total" }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Draw Calls" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.drawCallsTotal })
        ] }),
        /* @__PURE__ */ Oe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Frame Time (gpu)" }),
          /* @__PURE__ */ Oe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: eo(a.frameTime) })
        ] })
      ] })
    ] })
  ] });
}
function _z(t) {
  if (!t || !t.canvas) {
    console.error("showDebug: Invalid viewport parameter passed.");
    return;
  }
  const s = t.canvas.parentElement || document.body;
  s && getComputedStyle(s).position === "static" && (s.style.position = "relative");
  let f = s.querySelector("#s3d-debug-root");
  if (f)
    return;
  f = document.createElement("div"), f.id = "s3d-debug-root", f.className = "s3d-absolute s3d-top-4 s3d-right-4 s3d-z-[99999]", s.appendChild(f), Rz.createRoot(f).render(/* @__PURE__ */ Oe.jsx(Mz, { viewport: t }));
}
const Az = window.scaliaEngine = {
  config: l1,
  Game: WC,
  GameObject: ai,
  Component: Vn,
  Camera: lT,
  CameraComponent: hr,
  MeshComponent: sr,
  TransformComponent: v1,
  SpriteRenderer: E3,
  glMatrix: yN,
  PathRenderer: w3,
  TextRenderer: C3,
  Plane: oT,
  Box: sT,
  Cone: uT,
  Ball: M3,
  Light: op,
  Canvas2dViewport: hT,
  showDebug: _z,
  registerShader: XN,
  whiteFillShade: _3,
  // Built-in shaderType keys, to set on a MeshComponent as `meshRenderer.shaderType`.
  ShaderType: {
    ALBEDO_FLAT: pp,
    TEXTURE: vp,
    EMISSIVE_FLAT: Ih,
    GOURAUD_SHADE: hp
  },
  shaders: {
    flat: { fill: Yu, shade: U3 },
    texture: { fill: z3, shade: lp },
    gouraud: { fill: Yu, shade: lp }
  }
};
export {
  Az as default
};
