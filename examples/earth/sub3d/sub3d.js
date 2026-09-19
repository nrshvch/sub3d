const W0 = {
  depthSortingMask: parseInt("11", 2),
  //bitmask, bit per layer
  layersCount: 1
};
function wC() {
  this.now = Date.now();
}
var Y2 = wC.prototype;
Y2.time = 0;
Y2.now = 0;
Y2.dt = 60;
function CC() {
  this.gameObjects = [];
}
var B0 = CC.prototype;
B0.gameObjects = null;
B0.addGameObject = function(t) {
  this.gameObjects[this.gameObjects.length++] = t, t.setScene(this);
};
B0.removeGameObject = function(t) {
  this.gameObjects[this.gameObjects.indexOf(t)] = this.gameObjects[this.gameObjects.length - 1], this.gameObjects.length -= 1;
};
B0.retrieve = function() {
  const t = [], a = [];
  let u = 0, f = 0;
  for (let p = this.gameObjects.length - 1; p >= 0; p--)
    t[f++] = this.gameObjects[p];
  for (; f > 0; ) {
    const p = t[--f];
    p.transform.updateWorldMatrix(), a[u++] = p;
    const m = p.transform.children;
    for (let v = m.length - 1; v >= 0; v--)
      t[f++] = m[v].gameObject;
  }
  return a;
};
function bC(t) {
  this.time = new wC(), this.list = [], this.scene = new CC(), this.lastTickTime = 0;
}
var Xd = bC.prototype;
Xd.scene = null;
Xd.time = null;
Xd.tickRegister = function(t) {
  t._tickerIndex === void 0 && (t._tickerIndex = this.list.length, this.list.push(t));
};
Xd.tickUnregister = function(t) {
  const a = t._tickerIndex;
  if (a === void 0) return;
  const u = this.list.pop();
  u !== t && (this.list[a] = u, u._tickerIndex = a), t._tickerIndex = void 0;
};
Xd.update = function(t) {
  const a = this.list;
  for (let u = 0; u < a.length; u++)
    a[u].tick(t);
};
Xd.tick = function() {
  for (var t = Date.now(), a = 0, u = t - this.time.now, f = this.time.dt; u >= f && (u -= f, this.time.now += f, this.time.time += f, this.update(this.time), !(a++ > 200)); )
    ;
};
function TC() {
  this.world = new bC();
  var t = this.world;
  this.tick = function a() {
    const u = performance.now();
    t.tick(), t.lastTickTime = performance.now() - u, requestAnimationFrame(a);
  };
}
var G0 = TC.prototype;
G0.world = null;
G0.render = null;
G0.run = function() {
  this.tick();
};
G0.rafHandler = null;
function $n() {
}
var Q0 = $n.prototype;
Q0.gameObject = null;
Q0.enabled = !0;
Q0.setGameObject = function(t) {
  this.gameObject = t;
};
Q0.unsetGameObject = function() {
  this.gameObject = null;
};
function ND(t, a, u, f, p, m) {
  return t[a] = m[0] * u + m[4] * f + m[8] * p + m[12], t[a + 1] = m[1] * u + m[5] * f + m[9] * p + m[13], t[a + 2] = m[2] * u + m[6] * f + m[10] * p + m[14], t;
}
function zD(t, a, u, f, p, m) {
  return t[a] = m[0] * u + m[4] * f + m[8] * p + m[12], t[a + 1] = m[1] * u + m[5] * f + m[9] * p + m[13], t;
}
function X0(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = a[6], C = a[7], b = a[8], M = a[9], _ = a[10], k = a[11], A = a[12], N = a[13], F = a[14], W = a[15], P = u[0], j = u[1], V = u[2], q = u[3];
  return t[0] = P * f + j * E + V * b + q * A, t[1] = P * p + j * g + V * M + q * N, t[2] = P * m + j * x + V * _ + q * F, t[3] = P * v + j * C + V * k + q * W, P = u[4], j = u[5], V = u[6], q = u[7], t[4] = P * f + j * E + V * b + q * A, t[5] = P * p + j * g + V * M + q * N, t[6] = P * m + j * x + V * _ + q * F, t[7] = P * v + j * C + V * k + q * W, P = u[8], j = u[9], V = u[10], q = u[11], t[8] = P * f + j * E + V * b + q * A, t[9] = P * p + j * g + V * M + q * N, t[10] = P * m + j * x + V * _ + q * F, t[11] = P * v + j * C + V * k + q * W, P = u[12], j = u[13], V = u[14], q = u[15], t[12] = P * f + j * E + V * b + q * A, t[13] = P * p + j * g + V * M + q * N, t[14] = P * m + j * x + V * _ + q * F, t[15] = P * v + j * C + V * k + q * W, t;
}
var wt = 1e-6, cn = typeof Float32Array < "u" ? Float32Array : Array, Gl = Math.random, RC = "zyx";
function jo(t) {
  return t >= 0 ? Math.round(t) : t % 0.5 === 0 ? Math.floor(t) : Math.round(t);
}
function UD(t) {
  cn = t;
}
var jD = Math.PI / 180, FD = 180 / Math.PI;
function PD(t) {
  return t * jD;
}
function $D(t) {
  return t * FD;
}
function HD(t, a) {
  var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : wt;
  return Math.abs(t - a) <= u * Math.max(1, Math.abs(t), Math.abs(a));
}
const VD = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: RC,
  get ARRAY_TYPE() {
    return cn;
  },
  EPSILON: wt,
  RANDOM: Gl,
  equals: HD,
  round: jo,
  setMatrixArrayType: UD,
  toDegree: $D,
  toRadian: PD
}, Symbol.toStringTag, { value: "Module" }));
function ID() {
  var t = new cn(4);
  return cn != Float32Array && (t[1] = 0, t[2] = 0), t[0] = 1, t[3] = 1, t;
}
function qD(t) {
  var a = new cn(4);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a;
}
function YD(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t;
}
function WD(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t;
}
function BD(t, a, u, f) {
  var p = new cn(4);
  return p[0] = t, p[1] = a, p[2] = u, p[3] = f, p;
}
function GD(t, a, u, f, p) {
  return t[0] = a, t[1] = u, t[2] = f, t[3] = p, t;
}
function QD(t, a) {
  if (t === a) {
    var u = a[1];
    t[1] = a[2], t[2] = u;
  } else
    t[0] = a[0], t[1] = a[2], t[2] = a[1], t[3] = a[3];
  return t;
}
function XD(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = u * m - p * f;
  return v ? (v = 1 / v, t[0] = m * v, t[1] = -f * v, t[2] = -p * v, t[3] = u * v, t) : null;
}
function KD(t, a) {
  var u = a[0];
  return t[0] = a[3], t[1] = -a[1], t[2] = -a[2], t[3] = u, t;
}
function ZD(t) {
  return t[0] * t[3] - t[2] * t[1];
}
function MC(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = u[0], g = u[1], x = u[2], C = u[3];
  return t[0] = f * E + m * g, t[1] = p * E + v * g, t[2] = f * x + m * C, t[3] = p * x + v * C, t;
}
function JD(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = Math.sin(u), g = Math.cos(u);
  return t[0] = f * g + m * E, t[1] = p * g + v * E, t[2] = f * -E + m * g, t[3] = p * -E + v * g, t;
}
function e5(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = u[0], g = u[1];
  return t[0] = f * E, t[1] = p * E, t[2] = m * g, t[3] = v * g, t;
}
function t5(t, a) {
  var u = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = u, t[2] = -u, t[3] = f, t;
}
function n5(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = a[1], t;
}
function r5(t) {
  return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
}
function a5(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3]);
}
function i5(t, a, u, f) {
  return t[2] = f[2] / f[0], u[0] = f[0], u[1] = f[1], u[3] = f[3] - t[2] * u[1], [t, a, u];
}
function l5(t, a, u) {
  return t[0] = a[0] + u[0], t[1] = a[1] + u[1], t[2] = a[2] + u[2], t[3] = a[3] + u[3], t;
}
function _C(t, a, u) {
  return t[0] = a[0] - u[0], t[1] = a[1] - u[1], t[2] = a[2] - u[2], t[3] = a[3] - u[3], t;
}
function o5(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3];
}
function u5(t, a) {
  var u = t[0], f = t[1], p = t[2], m = t[3], v = a[0], E = a[1], g = a[2], x = a[3];
  return Math.abs(u - v) <= wt * Math.max(1, Math.abs(u), Math.abs(v)) && Math.abs(f - E) <= wt * Math.max(1, Math.abs(f), Math.abs(E)) && Math.abs(p - g) <= wt * Math.max(1, Math.abs(p), Math.abs(g)) && Math.abs(m - x) <= wt * Math.max(1, Math.abs(m), Math.abs(x));
}
function s5(t, a, u) {
  return t[0] = a[0] * u, t[1] = a[1] * u, t[2] = a[2] * u, t[3] = a[3] * u, t;
}
function c5(t, a, u, f) {
  return t[0] = a[0] + u[0] * f, t[1] = a[1] + u[1] * f, t[2] = a[2] + u[2] * f, t[3] = a[3] + u[3] * f, t;
}
var f5 = MC, d5 = _C;
const p5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: i5,
  add: l5,
  adjoint: KD,
  clone: qD,
  copy: YD,
  create: ID,
  determinant: ZD,
  equals: u5,
  exactEquals: o5,
  frob: a5,
  fromRotation: t5,
  fromScaling: n5,
  fromValues: BD,
  identity: WD,
  invert: XD,
  mul: f5,
  multiply: MC,
  multiplyScalar: s5,
  multiplyScalarAndAdd: c5,
  rotate: JD,
  scale: e5,
  set: GD,
  str: r5,
  sub: d5,
  subtract: _C,
  transpose: QD
}, Symbol.toStringTag, { value: "Module" }));
function v5() {
  var t = new cn(6);
  return cn != Float32Array && (t[1] = 0, t[2] = 0, t[4] = 0, t[5] = 0), t[0] = 1, t[3] = 1, t;
}
function h5(t) {
  var a = new cn(6);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a;
}
function m5(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t;
}
function y5(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
}
function g5(t, a, u, f, p, m) {
  var v = new cn(6);
  return v[0] = t, v[1] = a, v[2] = u, v[3] = f, v[4] = p, v[5] = m, v;
}
function S5(t, a, u, f, p, m, v) {
  return t[0] = a, t[1] = u, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t;
}
function E5(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = a[4], E = a[5], g = u * m - f * p;
  return g ? (g = 1 / g, t[0] = m * g, t[1] = -f * g, t[2] = -p * g, t[3] = u * g, t[4] = (p * E - m * v) * g, t[5] = (f * v - u * E) * g, t) : null;
}
function x5(t) {
  return t[0] * t[3] - t[1] * t[2];
}
function kC(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = u[0], C = u[1], b = u[2], M = u[3], _ = u[4], k = u[5];
  return t[0] = f * x + m * C, t[1] = p * x + v * C, t[2] = f * b + m * M, t[3] = p * b + v * M, t[4] = f * _ + m * k + E, t[5] = p * _ + v * k + g, t;
}
function w5(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = Math.sin(u), C = Math.cos(u);
  return t[0] = f * C + m * x, t[1] = p * C + v * x, t[2] = f * -x + m * C, t[3] = p * -x + v * C, t[4] = E, t[5] = g, t;
}
function C5(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = u[0], C = u[1];
  return t[0] = f * x, t[1] = p * x, t[2] = m * C, t[3] = v * C, t[4] = E, t[5] = g, t;
}
function b5(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = u[0], C = u[1];
  return t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = f * x + m * C + E, t[5] = p * x + v * C + g, t;
}
function T5(t, a) {
  var u = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = u, t[2] = -u, t[3] = f, t[4] = 0, t[5] = 0, t;
}
function R5(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = a[1], t[4] = 0, t[5] = 0, t;
}
function M5(t, a) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = a[0], t[5] = a[1], t;
}
function _5(t) {
  return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")";
}
function k5(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3] + t[4] * t[4] + t[5] * t[5] + 1);
}
function D5(t, a, u) {
  return t[0] = a[0] + u[0], t[1] = a[1] + u[1], t[2] = a[2] + u[2], t[3] = a[3] + u[3], t[4] = a[4] + u[4], t[5] = a[5] + u[5], t;
}
function DC(t, a, u) {
  return t[0] = a[0] - u[0], t[1] = a[1] - u[1], t[2] = a[2] - u[2], t[3] = a[3] - u[3], t[4] = a[4] - u[4], t[5] = a[5] - u[5], t;
}
function O5(t, a, u) {
  return t[0] = a[0] * u, t[1] = a[1] * u, t[2] = a[2] * u, t[3] = a[3] * u, t[4] = a[4] * u, t[5] = a[5] * u, t;
}
function A5(t, a, u, f) {
  return t[0] = a[0] + u[0] * f, t[1] = a[1] + u[1] * f, t[2] = a[2] + u[2] * f, t[3] = a[3] + u[3] * f, t[4] = a[4] + u[4] * f, t[5] = a[5] + u[5] * f, t;
}
function L5(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5];
}
function N5(t, a) {
  var u = t[0], f = t[1], p = t[2], m = t[3], v = t[4], E = t[5], g = a[0], x = a[1], C = a[2], b = a[3], M = a[4], _ = a[5];
  return Math.abs(u - g) <= wt * Math.max(1, Math.abs(u), Math.abs(g)) && Math.abs(f - x) <= wt * Math.max(1, Math.abs(f), Math.abs(x)) && Math.abs(p - C) <= wt * Math.max(1, Math.abs(p), Math.abs(C)) && Math.abs(m - b) <= wt * Math.max(1, Math.abs(m), Math.abs(b)) && Math.abs(v - M) <= wt * Math.max(1, Math.abs(v), Math.abs(M)) && Math.abs(E - _) <= wt * Math.max(1, Math.abs(E), Math.abs(_));
}
var z5 = kC, U5 = DC;
const j5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: D5,
  clone: h5,
  copy: m5,
  create: v5,
  determinant: x5,
  equals: N5,
  exactEquals: L5,
  frob: k5,
  fromRotation: T5,
  fromScaling: R5,
  fromTranslation: M5,
  fromValues: g5,
  identity: y5,
  invert: E5,
  mul: z5,
  multiply: kC,
  multiplyScalar: O5,
  multiplyScalarAndAdd: A5,
  rotate: w5,
  scale: C5,
  set: S5,
  str: _5,
  sub: U5,
  subtract: DC,
  translate: b5
}, Symbol.toStringTag, { value: "Module" }));
function OC() {
  var t = new cn(9);
  return cn != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[0] = 1, t[4] = 1, t[8] = 1, t;
}
function F5(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[4], t[4] = a[5], t[5] = a[6], t[6] = a[8], t[7] = a[9], t[8] = a[10], t;
}
function P5(t) {
  var a = new cn(9);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a;
}
function $5(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t;
}
function H5(t, a, u, f, p, m, v, E, g) {
  var x = new cn(9);
  return x[0] = t, x[1] = a, x[2] = u, x[3] = f, x[4] = p, x[5] = m, x[6] = v, x[7] = E, x[8] = g, x;
}
function V5(t, a, u, f, p, m, v, E, g, x) {
  return t[0] = a, t[1] = u, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t[6] = E, t[7] = g, t[8] = x, t;
}
function I5(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
}
function q5(t, a) {
  if (t === a) {
    var u = a[1], f = a[2], p = a[5];
    t[1] = a[3], t[2] = a[6], t[3] = u, t[5] = a[7], t[6] = f, t[7] = p;
  } else
    t[0] = a[0], t[1] = a[3], t[2] = a[6], t[3] = a[1], t[4] = a[4], t[5] = a[7], t[6] = a[2], t[7] = a[5], t[8] = a[8];
  return t;
}
function Y5(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = a[4], E = a[5], g = a[6], x = a[7], C = a[8], b = C * v - E * x, M = -C * m + E * g, _ = x * m - v * g, k = u * b + f * M + p * _;
  return k ? (k = 1 / k, t[0] = b * k, t[1] = (-C * f + p * x) * k, t[2] = (E * f - p * v) * k, t[3] = M * k, t[4] = (C * u - p * g) * k, t[5] = (-E * u + p * m) * k, t[6] = _ * k, t[7] = (-x * u + f * g) * k, t[8] = (v * u - f * m) * k, t) : null;
}
function W5(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = a[4], E = a[5], g = a[6], x = a[7], C = a[8];
  return t[0] = v * C - E * x, t[1] = p * x - f * C, t[2] = f * E - p * v, t[3] = E * g - m * C, t[4] = u * C - p * g, t[5] = p * m - u * E, t[6] = m * x - v * g, t[7] = f * g - u * x, t[8] = u * v - f * m, t;
}
function B5(t) {
  var a = t[0], u = t[1], f = t[2], p = t[3], m = t[4], v = t[5], E = t[6], g = t[7], x = t[8];
  return a * (x * m - v * g) + u * (-x * p + v * E) + f * (g * p - m * E);
}
function AC(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = a[6], C = a[7], b = a[8], M = u[0], _ = u[1], k = u[2], A = u[3], N = u[4], F = u[5], W = u[6], P = u[7], j = u[8];
  return t[0] = M * f + _ * v + k * x, t[1] = M * p + _ * E + k * C, t[2] = M * m + _ * g + k * b, t[3] = A * f + N * v + F * x, t[4] = A * p + N * E + F * C, t[5] = A * m + N * g + F * b, t[6] = W * f + P * v + j * x, t[7] = W * p + P * E + j * C, t[8] = W * m + P * g + j * b, t;
}
function G5(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = a[6], C = a[7], b = a[8], M = u[0], _ = u[1];
  return t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = E, t[5] = g, t[6] = M * f + _ * v + x, t[7] = M * p + _ * E + C, t[8] = M * m + _ * g + b, t;
}
function Q5(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = a[6], C = a[7], b = a[8], M = Math.sin(u), _ = Math.cos(u);
  return t[0] = _ * f + M * v, t[1] = _ * p + M * E, t[2] = _ * m + M * g, t[3] = _ * v - M * f, t[4] = _ * E - M * p, t[5] = _ * g - M * m, t[6] = x, t[7] = C, t[8] = b, t;
}
function X5(t, a, u) {
  var f = u[0], p = u[1];
  return t[0] = f * a[0], t[1] = f * a[1], t[2] = f * a[2], t[3] = p * a[3], t[4] = p * a[4], t[5] = p * a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t;
}
function K5(t, a) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = a[0], t[7] = a[1], t[8] = 1, t;
}
function Z5(t, a) {
  var u = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = u, t[2] = 0, t[3] = -u, t[4] = f, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
}
function J5(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = a[1], t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
}
function eO(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = 0, t[3] = a[2], t[4] = a[3], t[5] = 0, t[6] = a[4], t[7] = a[5], t[8] = 1, t;
}
function tO(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = u + u, E = f + f, g = p + p, x = u * v, C = f * v, b = f * E, M = p * v, _ = p * E, k = p * g, A = m * v, N = m * E, F = m * g;
  return t[0] = 1 - b - k, t[3] = C - F, t[6] = M + N, t[1] = C + F, t[4] = 1 - x - k, t[7] = _ - A, t[2] = M - N, t[5] = _ + A, t[8] = 1 - x - b, t;
}
function nO(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = a[4], E = a[5], g = a[6], x = a[7], C = a[8], b = a[9], M = a[10], _ = a[11], k = a[12], A = a[13], N = a[14], F = a[15], W = u * E - f * v, P = u * g - p * v, j = u * x - m * v, V = f * g - p * E, q = f * x - m * E, H = p * x - m * g, oe = C * A - b * k, Q = C * N - M * k, $ = C * F - _ * k, ne = b * N - M * A, re = b * F - _ * A, G = M * F - _ * N, X = W * G - P * re + j * ne + V * $ - q * Q + H * oe;
  return X ? (X = 1 / X, t[0] = (E * G - g * re + x * ne) * X, t[1] = (g * $ - v * G - x * Q) * X, t[2] = (v * re - E * $ + x * oe) * X, t[3] = (p * re - f * G - m * ne) * X, t[4] = (u * G - p * $ + m * Q) * X, t[5] = (f * $ - u * re - m * oe) * X, t[6] = (A * H - N * q + F * V) * X, t[7] = (N * j - k * H - F * P) * X, t[8] = (k * q - A * j + F * W) * X, t) : null;
}
function rO(t, a, u) {
  return t[0] = 2 / a, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = -2 / u, t[5] = 0, t[6] = -1, t[7] = 1, t[8] = 1, t;
}
function aO(t) {
  return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")";
}
function iO(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3] + t[4] * t[4] + t[5] * t[5] + t[6] * t[6] + t[7] * t[7] + t[8] * t[8]);
}
function lO(t, a, u) {
  return t[0] = a[0] + u[0], t[1] = a[1] + u[1], t[2] = a[2] + u[2], t[3] = a[3] + u[3], t[4] = a[4] + u[4], t[5] = a[5] + u[5], t[6] = a[6] + u[6], t[7] = a[7] + u[7], t[8] = a[8] + u[8], t;
}
function LC(t, a, u) {
  return t[0] = a[0] - u[0], t[1] = a[1] - u[1], t[2] = a[2] - u[2], t[3] = a[3] - u[3], t[4] = a[4] - u[4], t[5] = a[5] - u[5], t[6] = a[6] - u[6], t[7] = a[7] - u[7], t[8] = a[8] - u[8], t;
}
function oO(t, a, u) {
  return t[0] = a[0] * u, t[1] = a[1] * u, t[2] = a[2] * u, t[3] = a[3] * u, t[4] = a[4] * u, t[5] = a[5] * u, t[6] = a[6] * u, t[7] = a[7] * u, t[8] = a[8] * u, t;
}
function uO(t, a, u, f) {
  return t[0] = a[0] + u[0] * f, t[1] = a[1] + u[1] * f, t[2] = a[2] + u[2] * f, t[3] = a[3] + u[3] * f, t[4] = a[4] + u[4] * f, t[5] = a[5] + u[5] * f, t[6] = a[6] + u[6] * f, t[7] = a[7] + u[7] * f, t[8] = a[8] + u[8] * f, t;
}
function sO(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7] && t[8] === a[8];
}
function cO(t, a) {
  var u = t[0], f = t[1], p = t[2], m = t[3], v = t[4], E = t[5], g = t[6], x = t[7], C = t[8], b = a[0], M = a[1], _ = a[2], k = a[3], A = a[4], N = a[5], F = a[6], W = a[7], P = a[8];
  return Math.abs(u - b) <= wt * Math.max(1, Math.abs(u), Math.abs(b)) && Math.abs(f - M) <= wt * Math.max(1, Math.abs(f), Math.abs(M)) && Math.abs(p - _) <= wt * Math.max(1, Math.abs(p), Math.abs(_)) && Math.abs(m - k) <= wt * Math.max(1, Math.abs(m), Math.abs(k)) && Math.abs(v - A) <= wt * Math.max(1, Math.abs(v), Math.abs(A)) && Math.abs(E - N) <= wt * Math.max(1, Math.abs(E), Math.abs(N)) && Math.abs(g - F) <= wt * Math.max(1, Math.abs(g), Math.abs(F)) && Math.abs(x - W) <= wt * Math.max(1, Math.abs(x), Math.abs(W)) && Math.abs(C - P) <= wt * Math.max(1, Math.abs(C), Math.abs(P));
}
var fO = AC, dO = LC;
const pO = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: lO,
  adjoint: W5,
  clone: P5,
  copy: $5,
  create: OC,
  determinant: B5,
  equals: cO,
  exactEquals: sO,
  frob: iO,
  fromMat2d: eO,
  fromMat4: F5,
  fromQuat: tO,
  fromRotation: Z5,
  fromScaling: J5,
  fromTranslation: K5,
  fromValues: H5,
  identity: I5,
  invert: Y5,
  mul: fO,
  multiply: AC,
  multiplyScalar: oO,
  multiplyScalarAndAdd: uO,
  normalFromMat4: nO,
  projection: rO,
  rotate: Q5,
  scale: X5,
  set: V5,
  str: aO,
  sub: dO,
  subtract: LC,
  translate: G5,
  transpose: q5
}, Symbol.toStringTag, { value: "Module" }));
function vO() {
  var t = new cn(16);
  return cn != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0), t[0] = 1, t[5] = 1, t[10] = 1, t[15] = 1, t;
}
function hO(t) {
  var a = new cn(16);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a[9] = t[9], a[10] = t[10], a[11] = t[11], a[12] = t[12], a[13] = t[13], a[14] = t[14], a[15] = t[15], a;
}
function mO(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t;
}
function yO(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A) {
  var N = new cn(16);
  return N[0] = t, N[1] = a, N[2] = u, N[3] = f, N[4] = p, N[5] = m, N[6] = v, N[7] = E, N[8] = g, N[9] = x, N[10] = C, N[11] = b, N[12] = M, N[13] = _, N[14] = k, N[15] = A, N;
}
function gO(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N) {
  return t[0] = a, t[1] = u, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t[6] = E, t[7] = g, t[8] = x, t[9] = C, t[10] = b, t[11] = M, t[12] = _, t[13] = k, t[14] = A, t[15] = N, t;
}
function W2(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function SO(t, a) {
  if (t === a) {
    var u = a[1], f = a[2], p = a[3], m = a[6], v = a[7], E = a[11];
    t[1] = a[4], t[2] = a[8], t[3] = a[12], t[4] = u, t[6] = a[9], t[7] = a[13], t[8] = f, t[9] = m, t[11] = a[14], t[12] = p, t[13] = v, t[14] = E;
  } else
    t[0] = a[0], t[1] = a[4], t[2] = a[8], t[3] = a[12], t[4] = a[1], t[5] = a[5], t[6] = a[9], t[7] = a[13], t[8] = a[2], t[9] = a[6], t[10] = a[10], t[11] = a[14], t[12] = a[3], t[13] = a[7], t[14] = a[11], t[15] = a[15];
  return t;
}
function NC(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = a[4], E = a[5], g = a[6], x = a[7], C = a[8], b = a[9], M = a[10], _ = a[11], k = a[12], A = a[13], N = a[14], F = a[15], W = u * E - f * v, P = u * g - p * v, j = u * x - m * v, V = f * g - p * E, q = f * x - m * E, H = p * x - m * g, oe = C * A - b * k, Q = C * N - M * k, $ = C * F - _ * k, ne = b * N - M * A, re = b * F - _ * A, G = M * F - _ * N, X = W * G - P * re + j * ne + V * $ - q * Q + H * oe;
  return X ? (X = 1 / X, t[0] = (E * G - g * re + x * ne) * X, t[1] = (p * re - f * G - m * ne) * X, t[2] = (A * H - N * q + F * V) * X, t[3] = (M * q - b * H - _ * V) * X, t[4] = (g * $ - v * G - x * Q) * X, t[5] = (u * G - p * $ + m * Q) * X, t[6] = (N * j - k * H - F * P) * X, t[7] = (C * H - M * j + _ * P) * X, t[8] = (v * re - E * $ + x * oe) * X, t[9] = (f * $ - u * re - m * oe) * X, t[10] = (k * q - A * j + F * W) * X, t[11] = (b * j - C * q - _ * W) * X, t[12] = (E * Q - v * ne - g * oe) * X, t[13] = (u * ne - f * Q + p * oe) * X, t[14] = (A * P - k * V - N * W) * X, t[15] = (C * V - b * P + M * W) * X, t) : null;
}
function EO(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = a[4], E = a[5], g = a[6], x = a[7], C = a[8], b = a[9], M = a[10], _ = a[11], k = a[12], A = a[13], N = a[14], F = a[15], W = u * E - f * v, P = u * g - p * v, j = u * x - m * v, V = f * g - p * E, q = f * x - m * E, H = p * x - m * g, oe = C * A - b * k, Q = C * N - M * k, $ = C * F - _ * k, ne = b * N - M * A, re = b * F - _ * A, G = M * F - _ * N;
  return t[0] = E * G - g * re + x * ne, t[1] = p * re - f * G - m * ne, t[2] = A * H - N * q + F * V, t[3] = M * q - b * H - _ * V, t[4] = g * $ - v * G - x * Q, t[5] = u * G - p * $ + m * Q, t[6] = N * j - k * H - F * P, t[7] = C * H - M * j + _ * P, t[8] = v * re - E * $ + x * oe, t[9] = f * $ - u * re - m * oe, t[10] = k * q - A * j + F * W, t[11] = b * j - C * q - _ * W, t[12] = E * Q - v * ne - g * oe, t[13] = u * ne - f * Q + p * oe, t[14] = A * P - k * V - N * W, t[15] = C * V - b * P + M * W, t;
}
function xO(t) {
  var a = t[0], u = t[1], f = t[2], p = t[3], m = t[4], v = t[5], E = t[6], g = t[7], x = t[8], C = t[9], b = t[10], M = t[11], _ = t[12], k = t[13], A = t[14], N = t[15], F = a * v - u * m, W = a * E - f * m, P = u * E - f * v, j = x * k - C * _, V = x * A - b * _, q = C * A - b * k, H = a * q - u * V + f * j, oe = m * q - v * V + E * j, Q = x * P - C * W + b * F, $ = _ * P - k * W + A * F;
  return g * H - p * oe + N * Q - M * $;
}
function zC(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = a[6], C = a[7], b = a[8], M = a[9], _ = a[10], k = a[11], A = a[12], N = a[13], F = a[14], W = a[15], P = u[0], j = u[1], V = u[2], q = u[3];
  return t[0] = P * f + j * E + V * b + q * A, t[1] = P * p + j * g + V * M + q * N, t[2] = P * m + j * x + V * _ + q * F, t[3] = P * v + j * C + V * k + q * W, P = u[4], j = u[5], V = u[6], q = u[7], t[4] = P * f + j * E + V * b + q * A, t[5] = P * p + j * g + V * M + q * N, t[6] = P * m + j * x + V * _ + q * F, t[7] = P * v + j * C + V * k + q * W, P = u[8], j = u[9], V = u[10], q = u[11], t[8] = P * f + j * E + V * b + q * A, t[9] = P * p + j * g + V * M + q * N, t[10] = P * m + j * x + V * _ + q * F, t[11] = P * v + j * C + V * k + q * W, P = u[12], j = u[13], V = u[14], q = u[15], t[12] = P * f + j * E + V * b + q * A, t[13] = P * p + j * g + V * M + q * N, t[14] = P * m + j * x + V * _ + q * F, t[15] = P * v + j * C + V * k + q * W, t;
}
function O2(t, a, u) {
  var f = u[0], p = u[1], m = u[2], v, E, g, x, C, b, M, _, k, A, N, F;
  return a === t ? (t[12] = a[0] * f + a[4] * p + a[8] * m + a[12], t[13] = a[1] * f + a[5] * p + a[9] * m + a[13], t[14] = a[2] * f + a[6] * p + a[10] * m + a[14], t[15] = a[3] * f + a[7] * p + a[11] * m + a[15]) : (v = a[0], E = a[1], g = a[2], x = a[3], C = a[4], b = a[5], M = a[6], _ = a[7], k = a[8], A = a[9], N = a[10], F = a[11], t[0] = v, t[1] = E, t[2] = g, t[3] = x, t[4] = C, t[5] = b, t[6] = M, t[7] = _, t[8] = k, t[9] = A, t[10] = N, t[11] = F, t[12] = v * f + C * p + k * m + a[12], t[13] = E * f + b * p + A * m + a[13], t[14] = g * f + M * p + N * m + a[14], t[15] = x * f + _ * p + F * m + a[15]), t;
}
function UC(t, a, u) {
  var f = u[0], p = u[1], m = u[2];
  return t[0] = a[0] * f, t[1] = a[1] * f, t[2] = a[2] * f, t[3] = a[3] * f, t[4] = a[4] * p, t[5] = a[5] * p, t[6] = a[6] * p, t[7] = a[7] * p, t[8] = a[8] * m, t[9] = a[9] * m, t[10] = a[10] * m, t[11] = a[11] * m, t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t;
}
function wO(t, a, u, f) {
  var p = f[0], m = f[1], v = f[2], E = Math.sqrt(p * p + m * m + v * v), g, x, C, b, M, _, k, A, N, F, W, P, j, V, q, H, oe, Q, $, ne, re, G, X, ae;
  return E < wt ? null : (E = 1 / E, p *= E, m *= E, v *= E, g = Math.sin(u), x = Math.cos(u), C = 1 - x, b = a[0], M = a[1], _ = a[2], k = a[3], A = a[4], N = a[5], F = a[6], W = a[7], P = a[8], j = a[9], V = a[10], q = a[11], H = p * p * C + x, oe = m * p * C + v * g, Q = v * p * C - m * g, $ = p * m * C - v * g, ne = m * m * C + x, re = v * m * C + p * g, G = p * v * C + m * g, X = m * v * C - p * g, ae = v * v * C + x, t[0] = b * H + A * oe + P * Q, t[1] = M * H + N * oe + j * Q, t[2] = _ * H + F * oe + V * Q, t[3] = k * H + W * oe + q * Q, t[4] = b * $ + A * ne + P * re, t[5] = M * $ + N * ne + j * re, t[6] = _ * $ + F * ne + V * re, t[7] = k * $ + W * ne + q * re, t[8] = b * G + A * X + P * ae, t[9] = M * G + N * X + j * ae, t[10] = _ * G + F * X + V * ae, t[11] = k * G + W * X + q * ae, a !== t && (t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t);
}
function CO(t, a, u) {
  var f = Math.sin(u), p = Math.cos(u), m = a[4], v = a[5], E = a[6], g = a[7], x = a[8], C = a[9], b = a[10], M = a[11];
  return a !== t && (t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[4] = m * p + x * f, t[5] = v * p + C * f, t[6] = E * p + b * f, t[7] = g * p + M * f, t[8] = x * p - m * f, t[9] = C * p - v * f, t[10] = b * p - E * f, t[11] = M * p - g * f, t;
}
function bO(t, a, u) {
  var f = Math.sin(u), p = Math.cos(u), m = a[0], v = a[1], E = a[2], g = a[3], x = a[8], C = a[9], b = a[10], M = a[11];
  return a !== t && (t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[0] = m * p - x * f, t[1] = v * p - C * f, t[2] = E * p - b * f, t[3] = g * p - M * f, t[8] = m * f + x * p, t[9] = v * f + C * p, t[10] = E * f + b * p, t[11] = g * f + M * p, t;
}
function TO(t, a, u) {
  var f = Math.sin(u), p = Math.cos(u), m = a[0], v = a[1], E = a[2], g = a[3], x = a[4], C = a[5], b = a[6], M = a[7];
  return a !== t && (t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[0] = m * p + x * f, t[1] = v * p + C * f, t[2] = E * p + b * f, t[3] = g * p + M * f, t[4] = x * p - m * f, t[5] = C * p - v * f, t[6] = b * p - E * f, t[7] = M * p - g * f, t;
}
function RO(t, a) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = a[0], t[13] = a[1], t[14] = a[2], t[15] = 1, t;
}
function MO(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = a[1], t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = a[2], t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function _O(t, a, u) {
  var f = u[0], p = u[1], m = u[2], v = Math.sqrt(f * f + p * p + m * m), E, g, x;
  return v < wt ? null : (v = 1 / v, f *= v, p *= v, m *= v, E = Math.sin(a), g = Math.cos(a), x = 1 - g, t[0] = f * f * x + g, t[1] = p * f * x + m * E, t[2] = m * f * x - p * E, t[3] = 0, t[4] = f * p * x - m * E, t[5] = p * p * x + g, t[6] = m * p * x + f * E, t[7] = 0, t[8] = f * m * x + p * E, t[9] = p * m * x - f * E, t[10] = m * m * x + g, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t);
}
function kO(t, a) {
  var u = Math.sin(a), f = Math.cos(a);
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = f, t[6] = u, t[7] = 0, t[8] = 0, t[9] = -u, t[10] = f, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function DO(t, a) {
  var u = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = 0, t[2] = -u, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = u, t[9] = 0, t[10] = f, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function OO(t, a) {
  var u = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = u, t[2] = 0, t[3] = 0, t[4] = -u, t[5] = f, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function jC(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = f + f, g = p + p, x = m + m, C = f * E, b = f * g, M = f * x, _ = p * g, k = p * x, A = m * x, N = v * E, F = v * g, W = v * x;
  return t[0] = 1 - (_ + A), t[1] = b + W, t[2] = M - F, t[3] = 0, t[4] = b - W, t[5] = 1 - (C + A), t[6] = k + N, t[7] = 0, t[8] = M + F, t[9] = k - N, t[10] = 1 - (C + _), t[11] = 0, t[12] = u[0], t[13] = u[1], t[14] = u[2], t[15] = 1, t;
}
function AO(t, a) {
  var u = new cn(3), f = -a[0], p = -a[1], m = -a[2], v = a[3], E = a[4], g = a[5], x = a[6], C = a[7], b = f * f + p * p + m * m + v * v;
  return b > 0 ? (u[0] = (E * v + C * f + g * m - x * p) * 2 / b, u[1] = (g * v + C * p + x * f - E * m) * 2 / b, u[2] = (x * v + C * m + E * p - g * f) * 2 / b) : (u[0] = (E * v + C * f + g * m - x * p) * 2, u[1] = (g * v + C * p + x * f - E * m) * 2, u[2] = (x * v + C * m + E * p - g * f) * 2), jC(t, a, u), t;
}
function FC(t, a) {
  return t[0] = a[12], t[1] = a[13], t[2] = a[14], t;
}
function PC(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[4], v = a[5], E = a[6], g = a[8], x = a[9], C = a[10];
  return t[0] = Math.sqrt(u * u + f * f + p * p), t[1] = Math.sqrt(m * m + v * v + E * E), t[2] = Math.sqrt(g * g + x * x + C * C), t;
}
function $C(t, a) {
  var u = new cn(3);
  PC(u, a);
  var f = 1 / u[0], p = 1 / u[1], m = 1 / u[2], v = a[0] * f, E = a[1] * p, g = a[2] * m, x = a[4] * f, C = a[5] * p, b = a[6] * m, M = a[8] * f, _ = a[9] * p, k = a[10] * m, A = v + C + k, N = 0;
  return A > 0 ? (N = Math.sqrt(A + 1) * 2, t[3] = 0.25 * N, t[0] = (b - _) / N, t[1] = (M - g) / N, t[2] = (E - x) / N) : v > C && v > k ? (N = Math.sqrt(1 + v - C - k) * 2, t[3] = (b - _) / N, t[0] = 0.25 * N, t[1] = (E + x) / N, t[2] = (M + g) / N) : C > k ? (N = Math.sqrt(1 + C - v - k) * 2, t[3] = (M - g) / N, t[0] = (E + x) / N, t[1] = 0.25 * N, t[2] = (b + _) / N) : (N = Math.sqrt(1 + k - v - C) * 2, t[3] = (E - x) / N, t[0] = (M + g) / N, t[1] = (b + _) / N, t[2] = 0.25 * N), t;
}
function LO(t, a, u, f) {
  a[0] = f[12], a[1] = f[13], a[2] = f[14];
  var p = f[0], m = f[1], v = f[2], E = f[4], g = f[5], x = f[6], C = f[8], b = f[9], M = f[10];
  u[0] = Math.sqrt(p * p + m * m + v * v), u[1] = Math.sqrt(E * E + g * g + x * x), u[2] = Math.sqrt(C * C + b * b + M * M);
  var _ = 1 / u[0], k = 1 / u[1], A = 1 / u[2], N = p * _, F = m * k, W = v * A, P = E * _, j = g * k, V = x * A, q = C * _, H = b * k, oe = M * A, Q = N + j + oe, $ = 0;
  return Q > 0 ? ($ = Math.sqrt(Q + 1) * 2, t[3] = 0.25 * $, t[0] = (V - H) / $, t[1] = (q - W) / $, t[2] = (F - P) / $) : N > j && N > oe ? ($ = Math.sqrt(1 + N - j - oe) * 2, t[3] = (V - H) / $, t[0] = 0.25 * $, t[1] = (F + P) / $, t[2] = (q + W) / $) : j > oe ? ($ = Math.sqrt(1 + j - N - oe) * 2, t[3] = (q - W) / $, t[0] = (F + P) / $, t[1] = 0.25 * $, t[2] = (V + H) / $) : ($ = Math.sqrt(1 + oe - N - j) * 2, t[3] = (F - P) / $, t[0] = (q + W) / $, t[1] = (V + H) / $, t[2] = 0.25 * $), t;
}
function NO(t, a, u, f) {
  var p = a[0], m = a[1], v = a[2], E = a[3], g = p + p, x = m + m, C = v + v, b = p * g, M = p * x, _ = p * C, k = m * x, A = m * C, N = v * C, F = E * g, W = E * x, P = E * C, j = f[0], V = f[1], q = f[2];
  return t[0] = (1 - (k + N)) * j, t[1] = (M + P) * j, t[2] = (_ - W) * j, t[3] = 0, t[4] = (M - P) * V, t[5] = (1 - (b + N)) * V, t[6] = (A + F) * V, t[7] = 0, t[8] = (_ + W) * q, t[9] = (A - F) * q, t[10] = (1 - (b + k)) * q, t[11] = 0, t[12] = u[0], t[13] = u[1], t[14] = u[2], t[15] = 1, t;
}
function zO(t, a, u, f, p) {
  var m = a[0], v = a[1], E = a[2], g = a[3], x = m + m, C = v + v, b = E + E, M = m * x, _ = m * C, k = m * b, A = v * C, N = v * b, F = E * b, W = g * x, P = g * C, j = g * b, V = f[0], q = f[1], H = f[2], oe = p[0], Q = p[1], $ = p[2], ne = (1 - (A + F)) * V, re = (_ + j) * V, G = (k - P) * V, X = (_ - j) * q, ae = (1 - (M + F)) * q, de = (N + W) * q, le = (k + P) * H, ie = (N - W) * H, ue = (1 - (M + A)) * H;
  return t[0] = ne, t[1] = re, t[2] = G, t[3] = 0, t[4] = X, t[5] = ae, t[6] = de, t[7] = 0, t[8] = le, t[9] = ie, t[10] = ue, t[11] = 0, t[12] = u[0] + oe - (ne * oe + X * Q + le * $), t[13] = u[1] + Q - (re * oe + ae * Q + ie * $), t[14] = u[2] + $ - (G * oe + de * Q + ue * $), t[15] = 1, t;
}
function UO(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = u + u, E = f + f, g = p + p, x = u * v, C = f * v, b = f * E, M = p * v, _ = p * E, k = p * g, A = m * v, N = m * E, F = m * g;
  return t[0] = 1 - b - k, t[1] = C + F, t[2] = M - N, t[3] = 0, t[4] = C - F, t[5] = 1 - x - k, t[6] = _ + A, t[7] = 0, t[8] = M + N, t[9] = _ - A, t[10] = 1 - x - b, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function jO(t, a, u, f, p, m, v) {
  var E = 1 / (u - a), g = 1 / (p - f), x = 1 / (m - v);
  return t[0] = m * 2 * E, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = m * 2 * g, t[6] = 0, t[7] = 0, t[8] = (u + a) * E, t[9] = (p + f) * g, t[10] = (v + m) * x, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = v * m * 2 * x, t[15] = 0, t;
}
function HC(t, a, u, f, p) {
  var m = 1 / Math.tan(a / 2);
  if (t[0] = m / u, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = m, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = -1, t[12] = 0, t[13] = 0, t[15] = 0, p != null && p !== 1 / 0) {
    var v = 1 / (f - p);
    t[10] = (p + f) * v, t[14] = 2 * p * f * v;
  } else
    t[10] = -1, t[14] = -2 * f;
  return t;
}
var FO = HC;
function PO(t, a, u, f, p) {
  var m = 1 / Math.tan(a / 2);
  if (t[0] = m / u, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = m, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = -1, t[12] = 0, t[13] = 0, t[15] = 0, p != null && p !== 1 / 0) {
    var v = 1 / (f - p);
    t[10] = p * v, t[14] = p * f * v;
  } else
    t[10] = -1, t[14] = -f;
  return t;
}
function $O(t, a, u, f) {
  var p = Math.tan(a.upDegrees * Math.PI / 180), m = Math.tan(a.downDegrees * Math.PI / 180), v = Math.tan(a.leftDegrees * Math.PI / 180), E = Math.tan(a.rightDegrees * Math.PI / 180), g = 2 / (v + E), x = 2 / (p + m);
  return t[0] = g, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = x, t[6] = 0, t[7] = 0, t[8] = -((v - E) * g * 0.5), t[9] = (p - m) * x * 0.5, t[10] = f / (u - f), t[11] = -1, t[12] = 0, t[13] = 0, t[14] = f * u / (u - f), t[15] = 0, t;
}
function VC(t, a, u, f, p, m, v) {
  var E = 1 / (a - u), g = 1 / (f - p), x = 1 / (m - v);
  return t[0] = -2 * E, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * g, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * x, t[11] = 0, t[12] = (a + u) * E, t[13] = (p + f) * g, t[14] = (v + m) * x, t[15] = 1, t;
}
var IC = VC;
function HO(t, a, u, f, p, m, v) {
  var E = 1 / (a - u), g = 1 / (f - p), x = 1 / (m - v);
  return t[0] = -2 * E, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * g, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = x, t[11] = 0, t[12] = (a + u) * E, t[13] = (p + f) * g, t[14] = m * x, t[15] = 1, t;
}
function VO(t, a, u, f) {
  var p, m, v, E, g, x, C, b, M, _, k = a[0], A = a[1], N = a[2], F = f[0], W = f[1], P = f[2], j = u[0], V = u[1], q = u[2];
  return Math.abs(k - j) < wt && Math.abs(A - V) < wt && Math.abs(N - q) < wt ? W2(t) : (C = k - j, b = A - V, M = N - q, _ = 1 / Math.sqrt(C * C + b * b + M * M), C *= _, b *= _, M *= _, p = W * M - P * b, m = P * C - F * M, v = F * b - W * C, _ = Math.sqrt(p * p + m * m + v * v), _ ? (_ = 1 / _, p *= _, m *= _, v *= _) : (p = 0, m = 0, v = 0), E = b * v - M * m, g = M * p - C * v, x = C * m - b * p, _ = Math.sqrt(E * E + g * g + x * x), _ ? (_ = 1 / _, E *= _, g *= _, x *= _) : (E = 0, g = 0, x = 0), t[0] = p, t[1] = E, t[2] = C, t[3] = 0, t[4] = m, t[5] = g, t[6] = b, t[7] = 0, t[8] = v, t[9] = x, t[10] = M, t[11] = 0, t[12] = -(p * k + m * A + v * N), t[13] = -(E * k + g * A + x * N), t[14] = -(C * k + b * A + M * N), t[15] = 1, t);
}
function IO(t, a, u, f) {
  var p = a[0], m = a[1], v = a[2], E = f[0], g = f[1], x = f[2], C = p - u[0], b = m - u[1], M = v - u[2], _ = C * C + b * b + M * M;
  _ > 0 && (_ = 1 / Math.sqrt(_), C *= _, b *= _, M *= _);
  var k = g * M - x * b, A = x * C - E * M, N = E * b - g * C;
  return _ = k * k + A * A + N * N, _ > 0 && (_ = 1 / Math.sqrt(_), k *= _, A *= _, N *= _), t[0] = k, t[1] = A, t[2] = N, t[3] = 0, t[4] = b * N - M * A, t[5] = M * k - C * N, t[6] = C * A - b * k, t[7] = 0, t[8] = C, t[9] = b, t[10] = M, t[11] = 0, t[12] = p, t[13] = m, t[14] = v, t[15] = 1, t;
}
function qO(t) {
  return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")";
}
function YO(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3] + t[4] * t[4] + t[5] * t[5] + t[6] * t[6] + t[7] * t[7] + t[8] * t[8] + t[9] * t[9] + t[10] * t[10] + t[11] * t[11] + t[12] * t[12] + t[13] * t[13] + t[14] * t[14] + t[15] * t[15]);
}
function WO(t, a, u) {
  return t[0] = a[0] + u[0], t[1] = a[1] + u[1], t[2] = a[2] + u[2], t[3] = a[3] + u[3], t[4] = a[4] + u[4], t[5] = a[5] + u[5], t[6] = a[6] + u[6], t[7] = a[7] + u[7], t[8] = a[8] + u[8], t[9] = a[9] + u[9], t[10] = a[10] + u[10], t[11] = a[11] + u[11], t[12] = a[12] + u[12], t[13] = a[13] + u[13], t[14] = a[14] + u[14], t[15] = a[15] + u[15], t;
}
function qC(t, a, u) {
  return t[0] = a[0] - u[0], t[1] = a[1] - u[1], t[2] = a[2] - u[2], t[3] = a[3] - u[3], t[4] = a[4] - u[4], t[5] = a[5] - u[5], t[6] = a[6] - u[6], t[7] = a[7] - u[7], t[8] = a[8] - u[8], t[9] = a[9] - u[9], t[10] = a[10] - u[10], t[11] = a[11] - u[11], t[12] = a[12] - u[12], t[13] = a[13] - u[13], t[14] = a[14] - u[14], t[15] = a[15] - u[15], t;
}
function BO(t, a, u) {
  return t[0] = a[0] * u, t[1] = a[1] * u, t[2] = a[2] * u, t[3] = a[3] * u, t[4] = a[4] * u, t[5] = a[5] * u, t[6] = a[6] * u, t[7] = a[7] * u, t[8] = a[8] * u, t[9] = a[9] * u, t[10] = a[10] * u, t[11] = a[11] * u, t[12] = a[12] * u, t[13] = a[13] * u, t[14] = a[14] * u, t[15] = a[15] * u, t;
}
function GO(t, a, u, f) {
  return t[0] = a[0] + u[0] * f, t[1] = a[1] + u[1] * f, t[2] = a[2] + u[2] * f, t[3] = a[3] + u[3] * f, t[4] = a[4] + u[4] * f, t[5] = a[5] + u[5] * f, t[6] = a[6] + u[6] * f, t[7] = a[7] + u[7] * f, t[8] = a[8] + u[8] * f, t[9] = a[9] + u[9] * f, t[10] = a[10] + u[10] * f, t[11] = a[11] + u[11] * f, t[12] = a[12] + u[12] * f, t[13] = a[13] + u[13] * f, t[14] = a[14] + u[14] * f, t[15] = a[15] + u[15] * f, t;
}
function QO(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7] && t[8] === a[8] && t[9] === a[9] && t[10] === a[10] && t[11] === a[11] && t[12] === a[12] && t[13] === a[13] && t[14] === a[14] && t[15] === a[15];
}
function XO(t, a) {
  var u = t[0], f = t[1], p = t[2], m = t[3], v = t[4], E = t[5], g = t[6], x = t[7], C = t[8], b = t[9], M = t[10], _ = t[11], k = t[12], A = t[13], N = t[14], F = t[15], W = a[0], P = a[1], j = a[2], V = a[3], q = a[4], H = a[5], oe = a[6], Q = a[7], $ = a[8], ne = a[9], re = a[10], G = a[11], X = a[12], ae = a[13], de = a[14], le = a[15];
  return Math.abs(u - W) <= wt * Math.max(1, Math.abs(u), Math.abs(W)) && Math.abs(f - P) <= wt * Math.max(1, Math.abs(f), Math.abs(P)) && Math.abs(p - j) <= wt * Math.max(1, Math.abs(p), Math.abs(j)) && Math.abs(m - V) <= wt * Math.max(1, Math.abs(m), Math.abs(V)) && Math.abs(v - q) <= wt * Math.max(1, Math.abs(v), Math.abs(q)) && Math.abs(E - H) <= wt * Math.max(1, Math.abs(E), Math.abs(H)) && Math.abs(g - oe) <= wt * Math.max(1, Math.abs(g), Math.abs(oe)) && Math.abs(x - Q) <= wt * Math.max(1, Math.abs(x), Math.abs(Q)) && Math.abs(C - $) <= wt * Math.max(1, Math.abs(C), Math.abs($)) && Math.abs(b - ne) <= wt * Math.max(1, Math.abs(b), Math.abs(ne)) && Math.abs(M - re) <= wt * Math.max(1, Math.abs(M), Math.abs(re)) && Math.abs(_ - G) <= wt * Math.max(1, Math.abs(_), Math.abs(G)) && Math.abs(k - X) <= wt * Math.max(1, Math.abs(k), Math.abs(X)) && Math.abs(A - ae) <= wt * Math.max(1, Math.abs(A), Math.abs(ae)) && Math.abs(N - de) <= wt * Math.max(1, Math.abs(N), Math.abs(de)) && Math.abs(F - le) <= wt * Math.max(1, Math.abs(F), Math.abs(le));
}
var KO = zC, ZO = qC;
const YC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: WO,
  adjoint: EO,
  clone: hO,
  copy: mO,
  create: vO,
  decompose: LO,
  determinant: xO,
  equals: XO,
  exactEquals: QO,
  frob: YO,
  fromQuat: UO,
  fromQuat2: AO,
  fromRotation: _O,
  fromRotationTranslation: jC,
  fromRotationTranslationScale: NO,
  fromRotationTranslationScaleOrigin: zO,
  fromScaling: MO,
  fromTranslation: RO,
  fromValues: yO,
  fromXRotation: kO,
  fromYRotation: DO,
  fromZRotation: OO,
  frustum: jO,
  getRotation: $C,
  getScaling: PC,
  getTranslation: FC,
  identity: W2,
  invert: NC,
  lookAt: VO,
  mul: KO,
  multiply: zC,
  multiplyScalar: BO,
  multiplyScalarAndAdd: GO,
  ortho: IC,
  orthoNO: VC,
  orthoZO: HO,
  perspective: FO,
  perspectiveFromFieldOfView: $O,
  perspectiveNO: HC,
  perspectiveZO: PO,
  rotate: wO,
  rotateX: CO,
  rotateY: bO,
  rotateZ: TO,
  scale: UC,
  set: gO,
  str: qO,
  sub: ZO,
  subtract: qC,
  targetTo: IO,
  translate: O2,
  transpose: SO
}, Symbol.toStringTag, { value: "Module" }));
function B2() {
  var t = new cn(3);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t;
}
function JO(t) {
  var a = new cn(3);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a;
}
function WC(t) {
  var a = t[0], u = t[1], f = t[2];
  return Math.sqrt(a * a + u * u + f * f);
}
function A2(t, a, u) {
  var f = new cn(3);
  return f[0] = t, f[1] = a, f[2] = u, f;
}
function eA(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t;
}
function tA(t, a, u, f) {
  return t[0] = a, t[1] = u, t[2] = f, t;
}
function nA(t, a, u) {
  return t[0] = a[0] + u[0], t[1] = a[1] + u[1], t[2] = a[2] + u[2], t;
}
function BC(t, a, u) {
  return t[0] = a[0] - u[0], t[1] = a[1] - u[1], t[2] = a[2] - u[2], t;
}
function GC(t, a, u) {
  return t[0] = a[0] * u[0], t[1] = a[1] * u[1], t[2] = a[2] * u[2], t;
}
function QC(t, a, u) {
  return t[0] = a[0] / u[0], t[1] = a[1] / u[1], t[2] = a[2] / u[2], t;
}
function rA(t, a) {
  return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t[2] = Math.ceil(a[2]), t;
}
function aA(t, a) {
  return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t[2] = Math.floor(a[2]), t;
}
function iA(t, a, u) {
  return t[0] = Math.min(a[0], u[0]), t[1] = Math.min(a[1], u[1]), t[2] = Math.min(a[2], u[2]), t;
}
function lA(t, a, u) {
  return t[0] = Math.max(a[0], u[0]), t[1] = Math.max(a[1], u[1]), t[2] = Math.max(a[2], u[2]), t;
}
function oA(t, a) {
  return t[0] = jo(a[0]), t[1] = jo(a[1]), t[2] = jo(a[2]), t;
}
function uA(t, a, u) {
  return t[0] = a[0] * u, t[1] = a[1] * u, t[2] = a[2] * u, t;
}
function sA(t, a, u, f) {
  return t[0] = a[0] + u[0] * f, t[1] = a[1] + u[1] * f, t[2] = a[2] + u[2] * f, t;
}
function XC(t, a) {
  var u = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2];
  return Math.sqrt(u * u + f * f + p * p);
}
function KC(t, a) {
  var u = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2];
  return u * u + f * f + p * p;
}
function ZC(t) {
  var a = t[0], u = t[1], f = t[2];
  return a * a + u * u + f * f;
}
function cA(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t;
}
function fA(t, a) {
  return t[0] = 1 / a[0], t[1] = 1 / a[1], t[2] = 1 / a[2], t;
}
function JC(t, a) {
  var u = a[0], f = a[1], p = a[2], m = u * u + f * f + p * p;
  return m > 0 && (m = 1 / Math.sqrt(m)), t[0] = a[0] * m, t[1] = a[1] * m, t[2] = a[2] * m, t;
}
function K0(t, a) {
  return t[0] * a[0] + t[1] * a[1] + t[2] * a[2];
}
function A0(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = u[0], E = u[1], g = u[2];
  return t[0] = p * g - m * E, t[1] = m * v - f * g, t[2] = f * E - p * v, t;
}
function dA(t, a, u, f) {
  var p = a[0], m = a[1], v = a[2];
  return t[0] = p + f * (u[0] - p), t[1] = m + f * (u[1] - m), t[2] = v + f * (u[2] - v), t;
}
function pA(t, a, u, f) {
  var p = Math.acos(Math.min(Math.max(K0(a, u), -1), 1)), m = Math.sin(p), v = Math.sin((1 - f) * p) / m, E = Math.sin(f * p) / m;
  return t[0] = v * a[0] + E * u[0], t[1] = v * a[1] + E * u[1], t[2] = v * a[2] + E * u[2], t;
}
function vA(t, a, u, f, p, m) {
  var v = m * m, E = v * (2 * m - 3) + 1, g = v * (m - 2) + m, x = v * (m - 1), C = v * (3 - 2 * m);
  return t[0] = a[0] * E + u[0] * g + f[0] * x + p[0] * C, t[1] = a[1] * E + u[1] * g + f[1] * x + p[1] * C, t[2] = a[2] * E + u[2] * g + f[2] * x + p[2] * C, t;
}
function hA(t, a, u, f, p, m) {
  var v = 1 - m, E = v * v, g = m * m, x = E * v, C = 3 * m * E, b = 3 * g * v, M = g * m;
  return t[0] = a[0] * x + u[0] * C + f[0] * b + p[0] * M, t[1] = a[1] * x + u[1] * C + f[1] * b + p[1] * M, t[2] = a[2] * x + u[2] * C + f[2] * b + p[2] * M, t;
}
function mA(t, a) {
  a = a === void 0 ? 1 : a;
  var u = Gl() * 2 * Math.PI, f = Gl() * 2 - 1, p = Math.sqrt(1 - f * f) * a;
  return t[0] = Math.cos(u) * p, t[1] = Math.sin(u) * p, t[2] = f * a, t;
}
function eb(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = u[3] * f + u[7] * p + u[11] * m + u[15];
  return v = v || 1, t[0] = (u[0] * f + u[4] * p + u[8] * m + u[12]) / v, t[1] = (u[1] * f + u[5] * p + u[9] * m + u[13]) / v, t[2] = (u[2] * f + u[6] * p + u[10] * m + u[14]) / v, t;
}
function yA(t, a, u) {
  var f = a[0], p = a[1], m = a[2];
  return t[0] = f * u[0] + p * u[3] + m * u[6], t[1] = f * u[1] + p * u[4] + m * u[7], t[2] = f * u[2] + p * u[5] + m * u[8], t;
}
function gA(t, a, u) {
  var f = u[0], p = u[1], m = u[2], v = u[3], E = a[0], g = a[1], x = a[2], C = p * x - m * g, b = m * E - f * x, M = f * g - p * E;
  return C = C + C, b = b + b, M = M + M, t[0] = E + v * C + p * M - m * b, t[1] = g + v * b + m * C - f * M, t[2] = x + v * M + f * b - p * C, t;
}
function SA(t, a, u, f) {
  var p = [], m = [];
  return p[0] = a[0] - u[0], p[1] = a[1] - u[1], p[2] = a[2] - u[2], m[0] = p[0], m[1] = p[1] * Math.cos(f) - p[2] * Math.sin(f), m[2] = p[1] * Math.sin(f) + p[2] * Math.cos(f), t[0] = m[0] + u[0], t[1] = m[1] + u[1], t[2] = m[2] + u[2], t;
}
function EA(t, a, u, f) {
  var p = [], m = [];
  return p[0] = a[0] - u[0], p[1] = a[1] - u[1], p[2] = a[2] - u[2], m[0] = p[2] * Math.sin(f) + p[0] * Math.cos(f), m[1] = p[1], m[2] = p[2] * Math.cos(f) - p[0] * Math.sin(f), t[0] = m[0] + u[0], t[1] = m[1] + u[1], t[2] = m[2] + u[2], t;
}
function xA(t, a, u, f) {
  var p = [], m = [];
  return p[0] = a[0] - u[0], p[1] = a[1] - u[1], p[2] = a[2] - u[2], m[0] = p[0] * Math.cos(f) - p[1] * Math.sin(f), m[1] = p[0] * Math.sin(f) + p[1] * Math.cos(f), m[2] = p[2], t[0] = m[0] + u[0], t[1] = m[1] + u[1], t[2] = m[2] + u[2], t;
}
function wA(t, a) {
  var u = t[0], f = t[1], p = t[2], m = a[0], v = a[1], E = a[2], g = Math.sqrt((u * u + f * f + p * p) * (m * m + v * v + E * E)), x = g && K0(t, a) / g;
  return Math.acos(Math.min(Math.max(x, -1), 1));
}
function CA(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t;
}
function bA(t) {
  return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
}
function TA(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2];
}
function RA(t, a) {
  var u = t[0], f = t[1], p = t[2], m = a[0], v = a[1], E = a[2];
  return Math.abs(u - m) <= wt * Math.max(1, Math.abs(u), Math.abs(m)) && Math.abs(f - v) <= wt * Math.max(1, Math.abs(f), Math.abs(v)) && Math.abs(p - E) <= wt * Math.max(1, Math.abs(p), Math.abs(E));
}
var MA = BC, _A = GC, kA = QC, DA = XC, OA = KC, tb = WC, AA = ZC, LA = (function() {
  var t = B2();
  return function(a, u, f, p, m, v) {
    var E, g;
    for (u || (u = 3), f || (f = 0), p ? g = Math.min(p * u + f, a.length) : g = a.length, E = f; E < g; E += u)
      t[0] = a[E], t[1] = a[E + 1], t[2] = a[E + 2], m(t, t, v), a[E] = t[0], a[E + 1] = t[1], a[E + 2] = t[2];
    return a;
  };
})();
const NA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: nA,
  angle: wA,
  bezier: hA,
  ceil: rA,
  clone: JO,
  copy: eA,
  create: B2,
  cross: A0,
  dist: DA,
  distance: XC,
  div: kA,
  divide: QC,
  dot: K0,
  equals: RA,
  exactEquals: TA,
  floor: aA,
  forEach: LA,
  fromValues: A2,
  hermite: vA,
  inverse: fA,
  len: tb,
  length: WC,
  lerp: dA,
  max: lA,
  min: iA,
  mul: _A,
  multiply: GC,
  negate: cA,
  normalize: JC,
  random: mA,
  rotateX: SA,
  rotateY: EA,
  rotateZ: xA,
  round: oA,
  scale: uA,
  scaleAndAdd: sA,
  set: tA,
  slerp: pA,
  sqrDist: OA,
  sqrLen: AA,
  squaredDistance: KC,
  squaredLength: ZC,
  str: bA,
  sub: MA,
  subtract: BC,
  transformMat3: yA,
  transformMat4: eb,
  transformQuat: gA,
  zero: CA
}, Symbol.toStringTag, { value: "Module" }));
function nb() {
  var t = new cn(4);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0), t;
}
function rb(t) {
  var a = new cn(4);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a;
}
function ab(t, a, u, f) {
  var p = new cn(4);
  return p[0] = t, p[1] = a, p[2] = u, p[3] = f, p;
}
function ib(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t;
}
function lb(t, a, u, f, p) {
  return t[0] = a, t[1] = u, t[2] = f, t[3] = p, t;
}
function ob(t, a, u) {
  return t[0] = a[0] + u[0], t[1] = a[1] + u[1], t[2] = a[2] + u[2], t[3] = a[3] + u[3], t;
}
function ub(t, a, u) {
  return t[0] = a[0] - u[0], t[1] = a[1] - u[1], t[2] = a[2] - u[2], t[3] = a[3] - u[3], t;
}
function sb(t, a, u) {
  return t[0] = a[0] * u[0], t[1] = a[1] * u[1], t[2] = a[2] * u[2], t[3] = a[3] * u[3], t;
}
function cb(t, a, u) {
  return t[0] = a[0] / u[0], t[1] = a[1] / u[1], t[2] = a[2] / u[2], t[3] = a[3] / u[3], t;
}
function zA(t, a) {
  return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t[2] = Math.ceil(a[2]), t[3] = Math.ceil(a[3]), t;
}
function UA(t, a) {
  return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t[2] = Math.floor(a[2]), t[3] = Math.floor(a[3]), t;
}
function jA(t, a, u) {
  return t[0] = Math.min(a[0], u[0]), t[1] = Math.min(a[1], u[1]), t[2] = Math.min(a[2], u[2]), t[3] = Math.min(a[3], u[3]), t;
}
function FA(t, a, u) {
  return t[0] = Math.max(a[0], u[0]), t[1] = Math.max(a[1], u[1]), t[2] = Math.max(a[2], u[2]), t[3] = Math.max(a[3], u[3]), t;
}
function PA(t, a) {
  return t[0] = jo(a[0]), t[1] = jo(a[1]), t[2] = jo(a[2]), t[3] = jo(a[3]), t;
}
function fb(t, a, u) {
  return t[0] = a[0] * u, t[1] = a[1] * u, t[2] = a[2] * u, t[3] = a[3] * u, t;
}
function $A(t, a, u, f) {
  return t[0] = a[0] + u[0] * f, t[1] = a[1] + u[1] * f, t[2] = a[2] + u[2] * f, t[3] = a[3] + u[3] * f, t;
}
function db(t, a) {
  var u = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2], m = a[3] - t[3];
  return Math.sqrt(u * u + f * f + p * p + m * m);
}
function pb(t, a) {
  var u = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2], m = a[3] - t[3];
  return u * u + f * f + p * p + m * m;
}
function G2(t) {
  var a = t[0], u = t[1], f = t[2], p = t[3];
  return Math.sqrt(a * a + u * u + f * f + p * p);
}
function Q2(t) {
  var a = t[0], u = t[1], f = t[2], p = t[3];
  return a * a + u * u + f * f + p * p;
}
function HA(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = -a[3], t;
}
function VA(t, a) {
  return t[0] = 1 / a[0], t[1] = 1 / a[1], t[2] = 1 / a[2], t[3] = 1 / a[3], t;
}
function vb(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = u * u + f * f + p * p + m * m;
  return v > 0 && (v = 1 / Math.sqrt(v)), t[0] = u * v, t[1] = f * v, t[2] = p * v, t[3] = m * v, t;
}
function X2(t, a) {
  return t[0] * a[0] + t[1] * a[1] + t[2] * a[2] + t[3] * a[3];
}
function IA(t, a, u, f) {
  var p = u[0] * f[1] - u[1] * f[0], m = u[0] * f[2] - u[2] * f[0], v = u[0] * f[3] - u[3] * f[0], E = u[1] * f[2] - u[2] * f[1], g = u[1] * f[3] - u[3] * f[1], x = u[2] * f[3] - u[3] * f[2], C = a[0], b = a[1], M = a[2], _ = a[3];
  return t[0] = b * x - M * g + _ * E, t[1] = -(C * x) + M * v - _ * m, t[2] = C * g - b * v + _ * p, t[3] = -(C * E) + b * m - M * p, t;
}
function hb(t, a, u, f) {
  var p = a[0], m = a[1], v = a[2], E = a[3];
  return t[0] = p + f * (u[0] - p), t[1] = m + f * (u[1] - m), t[2] = v + f * (u[2] - v), t[3] = E + f * (u[3] - E), t;
}
function qA(t, a) {
  a = a === void 0 ? 1 : a;
  var u, f, p, m, v, E, g;
  g = Gl(), u = g * 2 - 1, f = (4 * Gl() - 2) * Math.sqrt(g * -g + g), v = u * u + f * f, g = Gl(), p = g * 2 - 1, m = (4 * Gl() - 2) * Math.sqrt(g * -g + g), E = p * p + m * m;
  var x = Math.sqrt((1 - v) / E);
  return t[0] = a * u, t[1] = a * f, t[2] = a * p * x, t[3] = a * m * x, t;
}
function YA(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3];
  return t[0] = u[0] * f + u[4] * p + u[8] * m + u[12] * v, t[1] = u[1] * f + u[5] * p + u[9] * m + u[13] * v, t[2] = u[2] * f + u[6] * p + u[10] * m + u[14] * v, t[3] = u[3] * f + u[7] * p + u[11] * m + u[15] * v, t;
}
function WA(t, a, u) {
  var f = u[0], p = u[1], m = u[2], v = u[3], E = a[0], g = a[1], x = a[2], C = p * x - m * g, b = m * E - f * x, M = f * g - p * E;
  return C = C + C, b = b + b, M = M + M, t[0] = E + v * C + p * M - m * b, t[1] = g + v * b + m * C - f * M, t[2] = x + v * M + f * b - p * C, t[3] = a[3], t;
}
function BA(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t;
}
function GA(t) {
  return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
}
function mb(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3];
}
function QA(t, a) {
  var u = t[0], f = t[1], p = t[2], m = t[3], v = a[0], E = a[1], g = a[2], x = a[3];
  return Math.abs(u - v) <= wt * Math.max(1, Math.abs(u), Math.abs(v)) && Math.abs(f - E) <= wt * Math.max(1, Math.abs(f), Math.abs(E)) && Math.abs(p - g) <= wt * Math.max(1, Math.abs(p), Math.abs(g)) && Math.abs(m - x) <= wt * Math.max(1, Math.abs(m), Math.abs(x));
}
var XA = ub, KA = sb, ZA = cb, JA = db, e4 = pb, t4 = G2, n4 = Q2, r4 = (function() {
  var t = nb();
  return function(a, u, f, p, m, v) {
    var E, g;
    for (u || (u = 4), f || (f = 0), p ? g = Math.min(p * u + f, a.length) : g = a.length, E = f; E < g; E += u)
      t[0] = a[E], t[1] = a[E + 1], t[2] = a[E + 2], t[3] = a[E + 3], m(t, t, v), a[E] = t[0], a[E + 1] = t[1], a[E + 2] = t[2], a[E + 3] = t[3];
    return a;
  };
})();
const a4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: ob,
  ceil: zA,
  clone: rb,
  copy: ib,
  create: nb,
  cross: IA,
  dist: JA,
  distance: db,
  div: ZA,
  divide: cb,
  dot: X2,
  equals: QA,
  exactEquals: mb,
  floor: UA,
  forEach: r4,
  fromValues: ab,
  inverse: VA,
  len: t4,
  length: G2,
  lerp: hb,
  max: FA,
  min: jA,
  mul: KA,
  multiply: sb,
  negate: HA,
  normalize: vb,
  random: qA,
  round: PA,
  scale: fb,
  scaleAndAdd: $A,
  set: lb,
  sqrDist: e4,
  sqrLen: n4,
  squaredDistance: pb,
  squaredLength: Q2,
  str: GA,
  sub: XA,
  subtract: ub,
  transformMat4: YA,
  transformQuat: WA,
  zero: BA
}, Symbol.toStringTag, { value: "Module" }));
function P0() {
  var t = new cn(4);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t[3] = 1, t;
}
function i4(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t;
}
function yb(t, a, u) {
  u = u * 0.5;
  var f = Math.sin(u);
  return t[0] = f * a[0], t[1] = f * a[1], t[2] = f * a[2], t[3] = Math.cos(u), t;
}
function l4(t, a) {
  var u = Math.acos(a[3]) * 2, f = Math.sin(u / 2);
  return f > wt ? (t[0] = a[0] / f, t[1] = a[1] / f, t[2] = a[2] / f) : (t[0] = 1, t[1] = 0, t[2] = 0), u;
}
function o4(t, a) {
  var u = Z2(t, a);
  return Math.acos(2 * u * u - 1);
}
function gb(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = u[0], g = u[1], x = u[2], C = u[3];
  return t[0] = f * C + v * E + p * x - m * g, t[1] = p * C + v * g + m * E - f * x, t[2] = m * C + v * x + f * g - p * E, t[3] = v * C - f * E - p * g - m * x, t;
}
function Sb(t, a, u) {
  u *= 0.5;
  var f = a[0], p = a[1], m = a[2], v = a[3], E = Math.sin(u), g = Math.cos(u);
  return t[0] = f * g + v * E, t[1] = p * g + m * E, t[2] = m * g - p * E, t[3] = v * g - f * E, t;
}
function Eb(t, a, u) {
  u *= 0.5;
  var f = a[0], p = a[1], m = a[2], v = a[3], E = Math.sin(u), g = Math.cos(u);
  return t[0] = f * g - m * E, t[1] = p * g + v * E, t[2] = m * g + f * E, t[3] = v * g - p * E, t;
}
function xb(t, a, u) {
  u *= 0.5;
  var f = a[0], p = a[1], m = a[2], v = a[3], E = Math.sin(u), g = Math.cos(u);
  return t[0] = f * g + p * E, t[1] = p * g - f * E, t[2] = m * g + v * E, t[3] = v * g - m * E, t;
}
function u4(t, a) {
  var u = a[0], f = a[1], p = a[2];
  return t[0] = u, t[1] = f, t[2] = p, t[3] = Math.sqrt(Math.abs(1 - u * u - f * f - p * p)), t;
}
function wb(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = Math.sqrt(u * u + f * f + p * p), E = Math.exp(m), g = v > 0 ? E * Math.sin(v) / v : 0;
  return t[0] = u * g, t[1] = f * g, t[2] = p * g, t[3] = E * Math.cos(v), t;
}
function Cb(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = Math.sqrt(u * u + f * f + p * p), E = v > 0 ? Math.atan2(v, m) / v : 0;
  return t[0] = u * E, t[1] = f * E, t[2] = p * E, t[3] = 0.5 * Math.log(u * u + f * f + p * p + m * m), t;
}
function s4(t, a, u) {
  return Cb(t, a), Tb(t, t, u), wb(t, t), t;
}
function L0(t, a, u, f) {
  var p = a[0], m = a[1], v = a[2], E = a[3], g = u[0], x = u[1], C = u[2], b = u[3], M, _, k, A, N;
  return _ = p * g + m * x + v * C + E * b, _ < 0 && (_ = -_, g = -g, x = -x, C = -C, b = -b), 1 - _ > wt ? (M = Math.acos(_), k = Math.sin(M), A = Math.sin((1 - f) * M) / k, N = Math.sin(f * M) / k) : (A = 1 - f, N = f), t[0] = A * p + N * g, t[1] = A * m + N * x, t[2] = A * v + N * C, t[3] = A * E + N * b, t;
}
function c4(t) {
  var a = Gl(), u = Gl(), f = Gl(), p = Math.sqrt(1 - a), m = Math.sqrt(a);
  return t[0] = p * Math.sin(2 * Math.PI * u), t[1] = p * Math.cos(2 * Math.PI * u), t[2] = m * Math.sin(2 * Math.PI * f), t[3] = m * Math.cos(2 * Math.PI * f), t;
}
function f4(t, a) {
  var u = a[0], f = a[1], p = a[2], m = a[3], v = u * u + f * f + p * p + m * m, E = v ? 1 / v : 0;
  return t[0] = -u * E, t[1] = -f * E, t[2] = -p * E, t[3] = m * E, t;
}
function d4(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = a[3], t;
}
function bb(t, a) {
  var u = a[0] + a[4] + a[8], f;
  if (u > 0)
    f = Math.sqrt(u + 1), t[3] = 0.5 * f, f = 0.5 / f, t[0] = (a[5] - a[7]) * f, t[1] = (a[6] - a[2]) * f, t[2] = (a[1] - a[3]) * f;
  else {
    var p = 0;
    a[4] > a[0] && (p = 1), a[8] > a[p * 3 + p] && (p = 2);
    var m = (p + 1) % 3, v = (p + 2) % 3;
    f = Math.sqrt(a[p * 3 + p] - a[m * 3 + m] - a[v * 3 + v] + 1), t[p] = 0.5 * f, f = 0.5 / f, t[3] = (a[m * 3 + v] - a[v * 3 + m]) * f, t[m] = (a[m * 3 + p] + a[p * 3 + m]) * f, t[v] = (a[v * 3 + p] + a[p * 3 + v]) * f;
  }
  return t;
}
function p4(t, a, u, f) {
  var p = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : RC, m = Math.PI / 360;
  a *= m, f *= m, u *= m;
  var v = Math.sin(a), E = Math.cos(a), g = Math.sin(u), x = Math.cos(u), C = Math.sin(f), b = Math.cos(f);
  switch (p) {
    case "xyz":
      t[0] = v * x * b + E * g * C, t[1] = E * g * b - v * x * C, t[2] = E * x * C + v * g * b, t[3] = E * x * b - v * g * C;
      break;
    case "xzy":
      t[0] = v * x * b - E * g * C, t[1] = E * g * b - v * x * C, t[2] = E * x * C + v * g * b, t[3] = E * x * b + v * g * C;
      break;
    case "yxz":
      t[0] = v * x * b + E * g * C, t[1] = E * g * b - v * x * C, t[2] = E * x * C - v * g * b, t[3] = E * x * b + v * g * C;
      break;
    case "yzx":
      t[0] = v * x * b + E * g * C, t[1] = E * g * b + v * x * C, t[2] = E * x * C - v * g * b, t[3] = E * x * b - v * g * C;
      break;
    case "zxy":
      t[0] = v * x * b - E * g * C, t[1] = E * g * b + v * x * C, t[2] = E * x * C + v * g * b, t[3] = E * x * b - v * g * C;
      break;
    case "zyx":
      t[0] = v * x * b - E * g * C, t[1] = E * g * b + v * x * C, t[2] = E * x * C - v * g * b, t[3] = E * x * b + v * g * C;
      break;
    default:
      throw new Error("Unknown angle order " + p);
  }
  return t;
}
function v4(t) {
  return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
}
var h4 = rb, m4 = ab, K2 = ib, y4 = lb, g4 = ob, S4 = gb, Tb = fb, Z2 = X2, E4 = hb, J2 = G2, x4 = J2, e3 = Q2, w4 = e3, t3 = vb, C4 = mb;
function b4(t, a) {
  return Math.abs(X2(t, a)) >= 1 - wt;
}
var T4 = (function() {
  var t = B2(), a = A2(1, 0, 0), u = A2(0, 1, 0);
  return function(f, p, m) {
    var v = K0(p, m);
    return v < -0.999999 ? (A0(t, a, p), tb(t) < 1e-6 && A0(t, u, p), JC(t, t), yb(f, t, Math.PI), f) : v > 0.999999 ? (f[0] = 0, f[1] = 0, f[2] = 0, f[3] = 1, f) : (A0(t, p, m), f[0] = t[0], f[1] = t[1], f[2] = t[2], f[3] = 1 + v, t3(f, f));
  };
})(), R4 = (function() {
  var t = P0(), a = P0();
  return function(u, f, p, m, v, E) {
    return L0(t, f, v, E), L0(a, p, m, E), L0(u, t, a, 2 * E * (1 - E)), u;
  };
})(), M4 = (function() {
  var t = OC();
  return function(a, u, f, p) {
    return t[0] = f[0], t[3] = f[1], t[6] = f[2], t[1] = p[0], t[4] = p[1], t[7] = p[2], t[2] = -u[0], t[5] = -u[1], t[8] = -u[2], t3(a, bb(a, t));
  };
})();
const _4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: g4,
  calculateW: u4,
  clone: h4,
  conjugate: d4,
  copy: K2,
  create: P0,
  dot: Z2,
  equals: b4,
  exactEquals: C4,
  exp: wb,
  fromEuler: p4,
  fromMat3: bb,
  fromValues: m4,
  getAngle: o4,
  getAxisAngle: l4,
  identity: i4,
  invert: f4,
  len: x4,
  length: J2,
  lerp: E4,
  ln: Cb,
  mul: S4,
  multiply: gb,
  normalize: t3,
  pow: s4,
  random: c4,
  rotateX: Sb,
  rotateY: Eb,
  rotateZ: xb,
  rotationTo: T4,
  scale: Tb,
  set: y4,
  setAxes: M4,
  setAxisAngle: yb,
  slerp: L0,
  sqlerp: R4,
  sqrLen: w4,
  squaredLength: e3,
  str: v4
}, Symbol.toStringTag, { value: "Module" }));
function k4() {
  var t = new cn(8);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[3] = 1, t;
}
function D4(t) {
  var a = new cn(8);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a;
}
function O4(t, a, u, f, p, m, v, E) {
  var g = new cn(8);
  return g[0] = t, g[1] = a, g[2] = u, g[3] = f, g[4] = p, g[5] = m, g[6] = v, g[7] = E, g;
}
function A4(t, a, u, f, p, m, v) {
  var E = new cn(8);
  E[0] = t, E[1] = a, E[2] = u, E[3] = f;
  var g = p * 0.5, x = m * 0.5, C = v * 0.5;
  return E[4] = g * f + x * u - C * a, E[5] = x * f + C * t - g * u, E[6] = C * f + g * a - x * t, E[7] = -g * t - x * a - C * u, E;
}
function Rb(t, a, u) {
  var f = u[0] * 0.5, p = u[1] * 0.5, m = u[2] * 0.5, v = a[0], E = a[1], g = a[2], x = a[3];
  return t[0] = v, t[1] = E, t[2] = g, t[3] = x, t[4] = f * x + p * g - m * E, t[5] = p * x + m * v - f * g, t[6] = m * x + f * E - p * v, t[7] = -f * v - p * E - m * g, t;
}
function L4(t, a) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = a[0] * 0.5, t[5] = a[1] * 0.5, t[6] = a[2] * 0.5, t[7] = 0, t;
}
function N4(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0, t;
}
function z4(t, a) {
  var u = P0();
  $C(u, a);
  var f = new cn(3);
  return FC(f, a), Rb(t, u, f), t;
}
function Mb(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t;
}
function U4(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0, t;
}
function j4(t, a, u, f, p, m, v, E, g) {
  return t[0] = a, t[1] = u, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t[6] = E, t[7] = g, t;
}
var F4 = K2;
function P4(t, a) {
  return t[0] = a[4], t[1] = a[5], t[2] = a[6], t[3] = a[7], t;
}
var $4 = K2;
function H4(t, a) {
  return t[4] = a[0], t[5] = a[1], t[6] = a[2], t[7] = a[3], t;
}
function V4(t, a) {
  var u = a[4], f = a[5], p = a[6], m = a[7], v = -a[0], E = -a[1], g = -a[2], x = a[3];
  return t[0] = (u * x + m * v + f * g - p * E) * 2, t[1] = (f * x + m * E + p * v - u * g) * 2, t[2] = (p * x + m * g + u * E - f * v) * 2, t;
}
function I4(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = u[0] * 0.5, g = u[1] * 0.5, x = u[2] * 0.5, C = a[4], b = a[5], M = a[6], _ = a[7];
  return t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = v * E + p * x - m * g + C, t[5] = v * g + m * E - f * x + b, t[6] = v * x + f * g - p * E + M, t[7] = -f * E - p * g - m * x + _, t;
}
function q4(t, a, u) {
  var f = -a[0], p = -a[1], m = -a[2], v = a[3], E = a[4], g = a[5], x = a[6], C = a[7], b = E * v + C * f + g * m - x * p, M = g * v + C * p + x * f - E * m, _ = x * v + C * m + E * p - g * f, k = C * v - E * f - g * p - x * m;
  return Sb(t, a, u), f = t[0], p = t[1], m = t[2], v = t[3], t[4] = b * v + k * f + M * m - _ * p, t[5] = M * v + k * p + _ * f - b * m, t[6] = _ * v + k * m + b * p - M * f, t[7] = k * v - b * f - M * p - _ * m, t;
}
function Y4(t, a, u) {
  var f = -a[0], p = -a[1], m = -a[2], v = a[3], E = a[4], g = a[5], x = a[6], C = a[7], b = E * v + C * f + g * m - x * p, M = g * v + C * p + x * f - E * m, _ = x * v + C * m + E * p - g * f, k = C * v - E * f - g * p - x * m;
  return Eb(t, a, u), f = t[0], p = t[1], m = t[2], v = t[3], t[4] = b * v + k * f + M * m - _ * p, t[5] = M * v + k * p + _ * f - b * m, t[6] = _ * v + k * m + b * p - M * f, t[7] = k * v - b * f - M * p - _ * m, t;
}
function W4(t, a, u) {
  var f = -a[0], p = -a[1], m = -a[2], v = a[3], E = a[4], g = a[5], x = a[6], C = a[7], b = E * v + C * f + g * m - x * p, M = g * v + C * p + x * f - E * m, _ = x * v + C * m + E * p - g * f, k = C * v - E * f - g * p - x * m;
  return xb(t, a, u), f = t[0], p = t[1], m = t[2], v = t[3], t[4] = b * v + k * f + M * m - _ * p, t[5] = M * v + k * p + _ * f - b * m, t[6] = _ * v + k * m + b * p - M * f, t[7] = k * v - b * f - M * p - _ * m, t;
}
function B4(t, a, u) {
  var f = u[0], p = u[1], m = u[2], v = u[3], E = a[0], g = a[1], x = a[2], C = a[3];
  return t[0] = E * v + C * f + g * m - x * p, t[1] = g * v + C * p + x * f - E * m, t[2] = x * v + C * m + E * p - g * f, t[3] = C * v - E * f - g * p - x * m, E = a[4], g = a[5], x = a[6], C = a[7], t[4] = E * v + C * f + g * m - x * p, t[5] = g * v + C * p + x * f - E * m, t[6] = x * v + C * m + E * p - g * f, t[7] = C * v - E * f - g * p - x * m, t;
}
function G4(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = u[0], g = u[1], x = u[2], C = u[3];
  return t[0] = f * C + v * E + p * x - m * g, t[1] = p * C + v * g + m * E - f * x, t[2] = m * C + v * x + f * g - p * E, t[3] = v * C - f * E - p * g - m * x, E = u[4], g = u[5], x = u[6], C = u[7], t[4] = f * C + v * E + p * x - m * g, t[5] = p * C + v * g + m * E - f * x, t[6] = m * C + v * x + f * g - p * E, t[7] = v * C - f * E - p * g - m * x, t;
}
function Q4(t, a, u, f) {
  if (Math.abs(f) < wt)
    return Mb(t, a);
  var p = Math.sqrt(u[0] * u[0] + u[1] * u[1] + u[2] * u[2]);
  f = f * 0.5;
  var m = Math.sin(f), v = m * u[0] / p, E = m * u[1] / p, g = m * u[2] / p, x = Math.cos(f), C = a[0], b = a[1], M = a[2], _ = a[3];
  t[0] = C * x + _ * v + b * g - M * E, t[1] = b * x + _ * E + M * v - C * g, t[2] = M * x + _ * g + C * E - b * v, t[3] = _ * x - C * v - b * E - M * g;
  var k = a[4], A = a[5], N = a[6], F = a[7];
  return t[4] = k * x + F * v + A * g - N * E, t[5] = A * x + F * E + N * v - k * g, t[6] = N * x + F * g + k * E - A * v, t[7] = F * x - k * v - A * E - N * g, t;
}
function X4(t, a, u) {
  return t[0] = a[0] + u[0], t[1] = a[1] + u[1], t[2] = a[2] + u[2], t[3] = a[3] + u[3], t[4] = a[4] + u[4], t[5] = a[5] + u[5], t[6] = a[6] + u[6], t[7] = a[7] + u[7], t;
}
function _b(t, a, u) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = u[4], g = u[5], x = u[6], C = u[7], b = a[4], M = a[5], _ = a[6], k = a[7], A = u[0], N = u[1], F = u[2], W = u[3];
  return t[0] = f * W + v * A + p * F - m * N, t[1] = p * W + v * N + m * A - f * F, t[2] = m * W + v * F + f * N - p * A, t[3] = v * W - f * A - p * N - m * F, t[4] = f * C + v * E + p * x - m * g + b * W + k * A + M * F - _ * N, t[5] = p * C + v * g + m * E - f * x + M * W + k * N + _ * A - b * F, t[6] = m * C + v * x + f * g - p * E + _ * W + k * F + b * N - M * A, t[7] = v * C - f * E - p * g - m * x + k * W - b * A - M * N - _ * F, t;
}
var K4 = _b;
function Z4(t, a, u) {
  return t[0] = a[0] * u, t[1] = a[1] * u, t[2] = a[2] * u, t[3] = a[3] * u, t[4] = a[4] * u, t[5] = a[5] * u, t[6] = a[6] * u, t[7] = a[7] * u, t;
}
var kb = Z2;
function J4(t, a, u, f) {
  var p = 1 - f;
  return kb(a, u) < 0 && (f = -f), t[0] = a[0] * p + u[0] * f, t[1] = a[1] * p + u[1] * f, t[2] = a[2] * p + u[2] * f, t[3] = a[3] * p + u[3] * f, t[4] = a[4] * p + u[4] * f, t[5] = a[5] * p + u[5] * f, t[6] = a[6] * p + u[6] * f, t[7] = a[7] * p + u[7] * f, t;
}
function eL(t, a) {
  var u = Z0(a);
  return t[0] = -a[0] / u, t[1] = -a[1] / u, t[2] = -a[2] / u, t[3] = a[3] / u, t[4] = -a[4] / u, t[5] = -a[5] / u, t[6] = -a[6] / u, t[7] = a[7] / u, t;
}
function tL(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = a[3], t[4] = -a[4], t[5] = -a[5], t[6] = -a[6], t[7] = a[7], t;
}
var Db = J2, nL = Db, Z0 = e3, rL = Z0;
function aL(t, a) {
  var u = Z0(a);
  if (u > 0) {
    u = Math.sqrt(u);
    var f = a[0] / u, p = a[1] / u, m = a[2] / u, v = a[3] / u, E = a[4], g = a[5], x = a[6], C = a[7], b = f * E + p * g + m * x + v * C;
    t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = (E - f * b) / u, t[5] = (g - p * b) / u, t[6] = (x - m * b) / u, t[7] = (C - v * b) / u;
  }
  return t;
}
function iL(t) {
  return "quat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ")";
}
function lL(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7];
}
function oL(t, a) {
  var u = t[0], f = t[1], p = t[2], m = t[3], v = t[4], E = t[5], g = t[6], x = t[7], C = a[0], b = a[1], M = a[2], _ = a[3], k = a[4], A = a[5], N = a[6], F = a[7];
  return Math.abs(u - C) <= wt * Math.max(1, Math.abs(u), Math.abs(C)) && Math.abs(f - b) <= wt * Math.max(1, Math.abs(f), Math.abs(b)) && Math.abs(p - M) <= wt * Math.max(1, Math.abs(p), Math.abs(M)) && Math.abs(m - _) <= wt * Math.max(1, Math.abs(m), Math.abs(_)) && Math.abs(v - k) <= wt * Math.max(1, Math.abs(v), Math.abs(k)) && Math.abs(E - A) <= wt * Math.max(1, Math.abs(E), Math.abs(A)) && Math.abs(g - N) <= wt * Math.max(1, Math.abs(g), Math.abs(N)) && Math.abs(x - F) <= wt * Math.max(1, Math.abs(x), Math.abs(F));
}
const uL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: X4,
  clone: D4,
  conjugate: tL,
  copy: Mb,
  create: k4,
  dot: kb,
  equals: oL,
  exactEquals: lL,
  fromMat4: z4,
  fromRotation: N4,
  fromRotationTranslation: Rb,
  fromRotationTranslationValues: A4,
  fromTranslation: L4,
  fromValues: O4,
  getDual: P4,
  getReal: F4,
  getTranslation: V4,
  identity: U4,
  invert: eL,
  len: nL,
  length: Db,
  lerp: J4,
  mul: K4,
  multiply: _b,
  normalize: aL,
  rotateAroundAxis: Q4,
  rotateByQuatAppend: B4,
  rotateByQuatPrepend: G4,
  rotateX: q4,
  rotateY: Y4,
  rotateZ: W4,
  scale: Z4,
  set: j4,
  setDual: H4,
  setReal: $4,
  sqrLen: rL,
  squaredLength: Z0,
  str: iL,
  translate: I4
}, Symbol.toStringTag, { value: "Module" }));
function Ob() {
  var t = new cn(2);
  return cn != Float32Array && (t[0] = 0, t[1] = 0), t;
}
function sL(t) {
  var a = new cn(2);
  return a[0] = t[0], a[1] = t[1], a;
}
function cL(t, a) {
  var u = new cn(2);
  return u[0] = t, u[1] = a, u;
}
function fL(t, a) {
  return t[0] = a[0], t[1] = a[1], t;
}
function dL(t, a, u) {
  return t[0] = a, t[1] = u, t;
}
function pL(t, a, u) {
  return t[0] = a[0] + u[0], t[1] = a[1] + u[1], t;
}
function Ab(t, a, u) {
  return t[0] = a[0] - u[0], t[1] = a[1] - u[1], t;
}
function Lb(t, a, u) {
  return t[0] = a[0] * u[0], t[1] = a[1] * u[1], t;
}
function Nb(t, a, u) {
  return t[0] = a[0] / u[0], t[1] = a[1] / u[1], t;
}
function vL(t, a) {
  return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t;
}
function hL(t, a) {
  return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t;
}
function mL(t, a, u) {
  return t[0] = Math.min(a[0], u[0]), t[1] = Math.min(a[1], u[1]), t;
}
function yL(t, a, u) {
  return t[0] = Math.max(a[0], u[0]), t[1] = Math.max(a[1], u[1]), t;
}
function gL(t, a) {
  return t[0] = jo(a[0]), t[1] = jo(a[1]), t;
}
function SL(t, a, u) {
  return t[0] = a[0] * u, t[1] = a[1] * u, t;
}
function EL(t, a, u, f) {
  return t[0] = a[0] + u[0] * f, t[1] = a[1] + u[1] * f, t;
}
function zb(t, a) {
  var u = a[0] - t[0], f = a[1] - t[1];
  return Math.sqrt(u * u + f * f);
}
function Ub(t, a) {
  var u = a[0] - t[0], f = a[1] - t[1];
  return u * u + f * f;
}
function jb(t) {
  var a = t[0], u = t[1];
  return Math.sqrt(a * a + u * u);
}
function Fb(t) {
  var a = t[0], u = t[1];
  return a * a + u * u;
}
function xL(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t;
}
function wL(t, a) {
  return t[0] = 1 / a[0], t[1] = 1 / a[1], t;
}
function CL(t, a) {
  var u = a[0], f = a[1], p = u * u + f * f;
  return p > 0 && (p = 1 / Math.sqrt(p)), t[0] = a[0] * p, t[1] = a[1] * p, t;
}
function bL(t, a) {
  return t[0] * a[0] + t[1] * a[1];
}
function TL(t, a, u) {
  var f = a[0] * u[1] - a[1] * u[0];
  return t[0] = t[1] = 0, t[2] = f, t;
}
function RL(t, a, u, f) {
  var p = a[0], m = a[1];
  return t[0] = p + f * (u[0] - p), t[1] = m + f * (u[1] - m), t;
}
function ML(t, a) {
  a = a === void 0 ? 1 : a;
  var u = Gl() * 2 * Math.PI;
  return t[0] = Math.cos(u) * a, t[1] = Math.sin(u) * a, t;
}
function _L(t, a, u) {
  var f = a[0], p = a[1];
  return t[0] = u[0] * f + u[2] * p, t[1] = u[1] * f + u[3] * p, t;
}
function kL(t, a, u) {
  var f = a[0], p = a[1];
  return t[0] = u[0] * f + u[2] * p + u[4], t[1] = u[1] * f + u[3] * p + u[5], t;
}
function DL(t, a, u) {
  var f = a[0], p = a[1];
  return t[0] = u[0] * f + u[3] * p + u[6], t[1] = u[1] * f + u[4] * p + u[7], t;
}
function OL(t, a, u) {
  var f = a[0], p = a[1];
  return t[0] = u[0] * f + u[4] * p + u[12], t[1] = u[1] * f + u[5] * p + u[13], t;
}
function AL(t, a, u, f) {
  var p = a[0] - u[0], m = a[1] - u[1], v = Math.sin(f), E = Math.cos(f);
  return t[0] = p * E - m * v + u[0], t[1] = p * v + m * E + u[1], t;
}
function LL(t, a) {
  var u = t[0], f = t[1], p = a[0], m = a[1];
  return Math.abs(Math.atan2(f * p - u * m, u * p + f * m));
}
function NL(t, a) {
  var u = t[0], f = t[1], p = a[0], m = a[1];
  return Math.atan2(u * m - f * p, u * p + f * m);
}
function zL(t) {
  return t[0] = 0, t[1] = 0, t;
}
function UL(t) {
  return "vec2(" + t[0] + ", " + t[1] + ")";
}
function jL(t, a) {
  return t[0] === a[0] && t[1] === a[1];
}
function FL(t, a) {
  var u = t[0], f = t[1], p = a[0], m = a[1];
  return Math.abs(u - p) <= wt * Math.max(1, Math.abs(u), Math.abs(p)) && Math.abs(f - m) <= wt * Math.max(1, Math.abs(f), Math.abs(m));
}
var PL = jb, $L = Ab, HL = Lb, VL = Nb, IL = zb, qL = Ub, YL = Fb, WL = (function() {
  var t = Ob();
  return function(a, u, f, p, m, v) {
    var E, g;
    for (u || (u = 2), f || (f = 0), p ? g = Math.min(p * u + f, a.length) : g = a.length, E = f; E < g; E += u)
      t[0] = a[E], t[1] = a[E + 1], m(t, t, v), a[E] = t[0], a[E + 1] = t[1];
    return a;
  };
})();
const BL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: pL,
  angle: LL,
  ceil: vL,
  clone: sL,
  copy: fL,
  create: Ob,
  cross: TL,
  dist: IL,
  distance: zb,
  div: VL,
  divide: Nb,
  dot: bL,
  equals: FL,
  exactEquals: jL,
  floor: hL,
  forEach: WL,
  fromValues: cL,
  inverse: wL,
  len: PL,
  length: jb,
  lerp: RL,
  max: yL,
  min: mL,
  mul: HL,
  multiply: Lb,
  negate: xL,
  normalize: CL,
  random: ML,
  rotate: AL,
  round: gL,
  scale: SL,
  scaleAndAdd: EL,
  set: dL,
  signedAngle: NL,
  sqrDist: qL,
  sqrLen: YL,
  squaredDistance: Ub,
  squaredLength: Fb,
  str: UL,
  sub: $L,
  subtract: Ab,
  transformMat2: _L,
  transformMat2d: kL,
  transformMat3: DL,
  transformMat4: OL,
  zero: zL
}, Symbol.toStringTag, { value: "Module" })), GL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: VD,
  mat2: p5,
  mat2d: j5,
  mat3: pO,
  mat4: YC,
  quat: _4,
  quat2: uL,
  vec2: BL,
  vec3: NA,
  vec4: a4
}, Symbol.toStringTag, { value: "Module" })), J0 = X0;
function e1() {
  $n.call(this), this.events = {
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
var Wn = e1.prototype = Object.create($n.prototype), Vi = new Float32Array([0, 0, 0]), hl = new Float32Array(16);
Wn.constructor = e1;
Wn.local = null;
Wn.worldMatrix = null;
Wn.worldToLocal = null;
Wn.children = null;
Wn.parent = null;
Wn.dirtyW = !0;
Wn.dirtyL = !0;
Wn.onParentUpdate = null;
Wn.addChild = function(t) {
  this.children[this.children.length] = t, t.setParent(this);
};
Wn.removeChild = function(t) {
  this.children.splice(this.children.indexOf(t), 1), t.removeParent();
};
Wn.setParent = function(t) {
  this.parent = t, t.gameObject.world !== null && t.gameObject.world.addGameObject(this.gameObject);
};
Wn.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.transform = this;
};
Wn.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
Wn.removeParent = function() {
  this.parent = null;
};
Wn.translate = function(t, a, u, f) {
  Vi[0] = t, Vi[1] = a, Vi[2] = u, f === "world" ? (W2(hl), O2(hl, hl, Vi), J0(this.local, hl, this.local)) : O2(this.local, this.local, Vi);
};
Wn.rotate = function(t, a, u, f) {
  var p = Math.PI / 180, m = YC;
  f === "world" ? (m.identity(hl), m.rotateZ(hl, hl, u * p), m.rotateY(hl, hl, a * p), m.rotateX(hl, hl, t * p), J0(this.local, hl, this.local)) : (m.rotateZ(this.local, this.local, u * p), m.rotateY(this.local, this.local, a * p), m.rotateX(this.local, this.local, t * p));
};
Wn.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.worldMatrix.set(this.local) : J0(this.worldMatrix, this.parent.getLocalToWorld(), this.local)), this.worldMatrix;
};
Wn.getWorldToLocal = function() {
  return this.dirtyW === !0 && NC(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
};
Wn.getPosition = function(t) {
  t === void 0 && (t = []);
  var a = this.getLocalToWorld();
  return t[0] = a[12], t[1] = a[13], t[2] = a[14], t;
};
Wn.getLocalPosition = function(t) {
  t === void 0 && (t = []);
  var a = this.local;
  return t[0] = a[12], t[1] = a[13], t[2] = a[14], t;
};
Wn.getRotation = function() {
  throw "TransformComponent.getRotation not implemented yet";
};
Wn.getLocalRotation = function() {
  throw "TransformComponent.getLocalRotation not implemented yet";
};
Wn.setPosition = function(t, a, u) {
  Vi[0] = t, Vi[1] = a, Vi[2] = u, this.parent !== null && eb(
    Vi,
    Vi,
    this.parent.getWorldToLocal()
  ), this.local[12] = Vi[0], this.local[13] = Vi[1], this.local[14] = Vi[2];
};
Wn.setLocalPosition = function(t, a, u) {
  this.local[12] = t, this.local[13] = a, this.local[14] = u;
};
Wn.scale = function(t, a, u) {
  UC(this.local, this.local, [t, a, u]);
};
Wn.updateWorldMatrix = function(t = !1) {
  this.parent === null ? this.worldMatrix.set(this.local) : (t && this.parent.updateWorldMatrix(t), J0(this.worldMatrix, this.parent.worldMatrix, this.local));
};
function ri(t) {
  this.instanceId = ri.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new e1()), this.name = t || "gameObject";
}
var Sl = ri.prototype;
Sl.instanceId = 0;
Sl.name = null;
Sl.layer = 0;
Sl.scene = null;
Sl.world = null;
Sl.transform = null;
Sl.components = null;
Sl.componentsCount = 0;
Sl.setScene = function(t) {
  this.scene = t;
};
Sl.addComponent = function(t) {
  return this.components[this.componentsCount++] = t, t.setGameObject(this), t;
};
Sl.removeComponent = function(t) {
  t.unsetGameObject();
};
Sl.getComponent = function(t) {
  for (var a = 0; a < this.components.length; a++) {
    var u = this.components[a];
    if (u instanceof t) return u;
  }
  return null;
};
const n3 = {
  NONE: 0,
  RADIAL: 1,
  RADIAL_FAST: 2,
  LINEAR: 3
};
function pr(t) {
  $n.call(this), this.transform = t, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ], this.zoom = 1;
}
pr.prototype = Object.create($n.prototype);
pr.prototype.constructor = pr;
pr.prototype.frustumSize = null;
pr.prototype.projectionMatrix = null;
pr.prototype.clipSpaceMatrix = null;
pr.prototype.nearClippingPane = 0;
pr.prototype.farClippingPane = 1e3;
pr.prototype.fogType = n3.LINEAR;
pr.prototype.fogNearPane = 250;
pr.prototype.fogFarPane = 750;
pr.prototype.fogColor = 9868950;
pr.prototype.bgColor = 9868950;
pr.prototype.ambientLight = 8421504;
pr.prototype.flush = !1;
pr.prototype.depthSorting = !0;
pr.prototype.setup = function(t, a) {
  const u = t / this.zoom, f = a / this.zoom;
  this.frustumSize = [
    [-u / 2, -f / 2, 0],
    [u / 2, f / 2, this.farClippingPane]
  ], IC(
    this.projectionMatrix,
    -u / 2,
    u / 2,
    -f / 2,
    f / 2,
    this.nearClippingPane,
    this.farClippingPane
  );
};
pr.prototype.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.camera = this;
};
pr.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, $n.prototype.unsetGameObject.call(this);
};
pr.prototype.getClipSpaceMatrix = function() {
  const t = this.transform.getWorldToLocal();
  return X0(this.clipSpaceMatrix, this.projectionMatrix, t), this.clipSpaceMatrix;
};
pr.FogType = n3;
function Pb(t) {
  ri.call(this, t || "camera"), this.addComponent(new pr(this.transform));
}
Pb.prototype = Object.create(ri.prototype);
function lr() {
  $n.call(this), this.depthBias = 0;
}
var ar = lr.prototype = Object.create($n.prototype);
ar.constructor = lr;
ar.depthBias = 0;
ar.layer = 0;
ar.vertices = null;
ar.faces = null;
ar.pivot = [0, 0, 0];
ar.color = null;
ar.colors = null;
ar.uvs = null;
ar._texture = null;
ar.textureImage = null;
ar.texturePattern = null;
ar.shaderType = 0;
Object.defineProperty(ar, "texture", {
  get: function() {
    return this._texture;
  },
  set: function(t) {
    this._texture !== t && (this._texture = t, this.texturePattern = null, t ? (this.textureImage || (this.textureImage = new Image()), this.textureImage.src = t) : this.textureImage = null);
  }
});
ar.faceNormals = null;
ar.vertexNormals = null;
ar.bounds = null;
ar.weldMap = null;
ar.adjTri = null;
ar.adjEdge = null;
ar.updateNormals = function(t = 1) {
  const a = this.faces, u = this.vertices, f = a.length;
  (!this.faceNormals || this.faceNormals.length !== f) && (this.faceNormals = new Float32Array(f)), !this.vertexNormals || this.vertexNormals.length !== u.length ? this.vertexNormals = new Float32Array(u.length) : this.vertexNormals.fill(0);
  for (let p = 0; p < f; p += 3) {
    const m = a[p] * 3, v = a[p + 1] * 3, E = a[p + 2] * 3, g = u[v] - u[m], x = u[v + 1] - u[m + 1], C = u[v + 2] - u[m + 2], b = u[E] - u[m], M = u[E + 1] - u[m + 1], _ = u[E + 2] - u[m + 2];
    let k = (x * _ - C * M) * t, A = (C * b - g * _) * t, N = (g * M - x * b) * t;
    const F = Math.sqrt(k * k + A * A + N * N);
    if (F > 1e-10) {
      const W = 1 / F;
      this.faceNormals[p] = k * W, this.faceNormals[p + 1] = A * W, this.faceNormals[p + 2] = N * W, this.vertexNormals[m] += k, this.vertexNormals[m + 1] += A, this.vertexNormals[m + 2] += N, this.vertexNormals[v] += k, this.vertexNormals[v + 1] += A, this.vertexNormals[v + 2] += N, this.vertexNormals[E] += k, this.vertexNormals[E + 1] += A, this.vertexNormals[E + 2] += N;
    }
  }
  for (let p = 0; p < this.vertexNormals.length; p += 3) {
    const m = this.vertexNormals[p], v = this.vertexNormals[p + 1], E = this.vertexNormals[p + 2], g = Math.sqrt(m * m + v * v + E * E);
    if (g > 1e-10) {
      const x = 1 / g;
      this.vertexNormals[p] *= x, this.vertexNormals[p + 1] *= x, this.vertexNormals[p + 2] *= x;
    } else
      this.vertexNormals[p + 1] = 1;
  }
};
ar.updateWeldMap = function(t) {
  this.weldMap = lr.computeWeldMap(this.vertices, this.weldMap, t);
};
ar.updateAdjacency = function() {
  const t = lr.computeAdjacency(
    this.faces,
    this.weldMap,
    this.adjTri,
    this.adjEdge
  );
  return this.adjTri = t.adjTri, this.adjEdge = t.adjEdge, t;
};
ar.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.meshRenderer = this;
};
ar.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, $n.prototype.unsetGameObject.call(this);
};
lr.computeNormalMatrix = function(t, a) {
  const u = a[0], f = a[1], p = a[2], m = a[4], v = a[5], E = a[6], g = a[8], x = a[9], C = a[10], b = v * C - E * x, M = -(m * C - E * g), _ = m * x - v * g, k = u * b + f * M + p * _;
  if (Math.abs(k) < 1e-6) return null;
  const A = 1 / k;
  t[0] = b * A, t[1] = M * A, t[2] = _ * A, t[3] = -(f * C - p * x) * A, t[4] = (u * C - p * g) * A, t[5] = -(u * x - f * g) * A, t[6] = (f * E - p * v) * A, t[7] = -(u * E - p * m) * A, t[8] = (u * v - f * m) * A;
};
lr.computeBoundsFlatArray = function(t, a, u) {
  if (u.length !== 0) {
    for (var f = u[0], p = f, m = u[1], v = m, E = u[2], g = E, x = 3; x < u.length; x += 3) {
      var C = u[x], b = u[x + 1], M = u[x + 2];
      C < f ? f = C : C > p && (p = C), b < m ? m = b : b > v && (v = b), M < E ? E = M : M > g && (g = M);
    }
    return t[a] = f, t[a + 1] = m, t[a + 2] = E, t[a + 3] = p, t[a + 4] = m, t[a + 5] = E, t[a + 6] = f, t[a + 7] = v, t[a + 8] = E, t[a + 9] = p, t[a + 10] = v, t[a + 11] = E, t[a + 12] = f, t[a + 13] = m, t[a + 14] = g, t[a + 15] = p, t[a + 16] = m, t[a + 17] = g, t[a + 18] = f, t[a + 19] = v, t[a + 20] = g, t[a + 21] = p, t[a + 22] = v, t[a + 23] = g, t;
  }
};
lr.computeBoundingSphere = function(t, a, u) {
  let f = 1 / 0, p = 1 / 0, m = 1 / 0, v = -1 / 0, E = -1 / 0, g = -1 / 0;
  for (let N = 0; N < u.length; N += 3) {
    const F = u[N], W = u[N + 1], P = u[N + 2];
    F < f && (f = F), F > v && (v = F), W < p && (p = W), W > E && (E = W), P < m && (m = P), P > g && (g = P);
  }
  const x = (f + v) * 0.5, C = (p + E) * 0.5, b = (m + g) * 0.5, M = v - x, _ = E - C, k = g - b, A = Math.sqrt(M * M + _ * _ + k * k);
  t[a] = x, t[a + 1] = C, t[a + 2] = b, t[a + 3] = A;
};
lr.computeWeldMap = function(t, a, u = 1e-4) {
  const f = t.length / 3 | 0, p = a && a.length === f ? a : new Uint32Array(f), m = {};
  for (let v = 0; v < f; v++) {
    const E = v * 3;
    let g = t[E], x = t[E + 1], C = t[E + 2];
    Math.abs(g) < u && (g = 0), Math.abs(x) < u && (x = 0), Math.abs(C) < u && (C = 0);
    const b = g.toFixed(4) + "," + x.toFixed(4) + "," + C.toFixed(4), M = m[b];
    M === void 0 ? (m[b] = v, p[v] = v) : p[v] = M;
  }
  return p;
};
lr.computeAdjacency = function(t, a, u, f) {
  const p = t.length / 3 | 0, m = p * 3, v = u && u.length === m ? u : new Int32Array(m), E = f && f.length === m ? f : new Int32Array(m);
  v.fill(-1), E.fill(-1);
  const g = /* @__PURE__ */ new Map();
  for (let C = 0; C < p; C++)
    for (let b = 0; b < 3; b++) {
      const M = t[C * 3 + b], _ = t[C * 3 + (b + 1) % 3], k = a ? a[M] : M, A = a ? a[_] : _;
      if (k === A) continue;
      const N = C * 3 + b, F = g.get(A * 4294967296 + k), W = F === void 0 ? -1 : F / 3 | 0;
      F !== void 0 && v[F] === -1 && W !== C && (v[N] = W, E[N] = F - W * 3, v[F] = C, E[F] = b), g.has(k * 4294967296 + A) || g.set(k * 4294967296 + A, N);
    }
  let x = 0;
  for (let C = 0; C < m; C++) v[C] === -1 && x++;
  return { adjTri: v, adjEdge: E, boundaryEdges: x };
};
function r3(t) {
  $n.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var Du = r3.prototype = Object.create($n.prototype);
Du.constructor = r3;
Du.sprite = null;
Du.pivotX = 0;
Du.pivotY = 0;
Du.layer = 0;
Du.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.spriteRenderer = this;
};
Du.setSprite = function(t) {
  return this.sprite = t, this.enabled = !0, this;
};
Du.setPivot = function(t, a) {
  return this.pivotX = t, this.pivotY = a, this;
};
Du.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, $n.prototype.unsetGameObject.call(this);
};
function a3() {
  $n.call(this), this.points = [];
}
var tf = a3.prototype = Object.create($n.prototype);
tf.constructor = a3;
tf.points = null;
tf.color = "white";
tf.width = 1;
tf.layer = 0;
tf.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.pathRenderer = this;
};
tf.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, $n.prototype.unsetGameObject.call(this);
};
function i3() {
  $n.call(this);
}
var Ou = i3.prototype = Object.create($n.prototype);
Ou.constructor = i3;
Ou.text = "sample text";
Ou.color = "white";
Ou.style = "normal 12px arial";
Ou.layer = 0;
Ou.align = "center";
Ou.valign = "middle";
Ou.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.textRenderer = this;
};
Ou.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, $n.prototype.unsetGameObject.call(this);
};
function QL(t, a, u) {
  const f = [], p = [], m = t / 2, v = a / 2, E = t / u, g = a / u;
  for (let C = 0; C <= u; C++) {
    const b = C * g - v;
    for (let M = 0; M <= u; M++) {
      const _ = M * E - m;
      f.push(_, 0, b);
    }
  }
  const x = u + 1;
  for (let C = 0; C < u; C++)
    for (let b = 0; b < u; b++) {
      const M = C * x + b, _ = C * x + (b + 1), k = (C + 1) * x + b, A = (C + 1) * x + (b + 1);
      p.push(M, k, _), p.push(A, _, k);
    }
  return {
    vertices: new Float32Array(f),
    faces: new Uint16Array(p),
    colors: new Uint32Array(f.length / 3).fill(255)
  };
}
const Sh = QL(1, 1, 1), l3 = new Float32Array(32);
lr.computeBoundsFlatArray(l3, 0, Sh.vertices);
lr.computeBoundingSphere(l3, 28, Sh.vertices);
function $b() {
  ri.call(this);
  const t = new lr();
  t.faces = Sh.faces, t.vertices = Sh.vertices, t.colors = Sh.colors, t.bounds = l3, t.updateNormals(), this.addComponent(t);
}
$b.prototype = Object.create(ri.prototype);
function XL(t, a, u, f) {
  const p = [], m = [], v = [];
  function E(x, C, b, M, _, k) {
    const A = `${x.toFixed(5)},${C.toFixed(5)},${b.toFixed(5)}`;
    if (k[A] !== void 0) return k[A];
    const N = p.length / 3;
    return p.push(x, C, b), m.push(M, _), k[A] = N, N;
  }
  function g(x, C, b, M, _, k, A, N, F, W) {
    const P = {}, j = A / W, V = N / W, q = A / 2, H = N / 2, oe = F / 2 * k, Q = [];
    for (let $ = 0; $ <= W; $++) {
      const ne = [], re = $ * V - H;
      for (let G = 0; G <= W; G++) {
        const X = G * j - q, ae = [0, 0, 0];
        ae[x] = X * M, ae[C] = re * _, ae[b] = oe;
        const de = G / W, le = 1 - $ / W;
        ne.push(E(ae[0], ae[1], ae[2], de, le, P));
      }
      Q.push(ne);
    }
    for (let $ = 0; $ < W; $++)
      for (let ne = 0; ne < W; ne++) {
        const re = Q[$][ne], G = Q[$ + 1][ne], X = Q[$ + 1][ne + 1], ae = Q[$][ne + 1];
        v.push(re, ae, G), v.push(G, ae, X);
      }
  }
  return g(0, 1, 2, 1, 1, 1, t, a, u, f), g(0, 1, 2, -1, 1, -1, t, a, u, f), g(2, 1, 0, -1, 1, 1, u, a, t, f), g(2, 1, 0, 1, 1, -1, u, a, t, f), g(0, 2, 1, 1, -1, 1, t, u, a, f), g(0, 2, 1, 1, 1, -1, t, u, a, f), {
    vertices: new Float32Array(p),
    uvs: new Float32Array(m),
    faces: new Uint16Array(v),
    colors: new Uint32Array(p.length / 3).fill(255)
  };
}
const qd = XL(1, 1, 1, 1), o3 = new Float32Array(32);
lr.computeBoundsFlatArray(o3, 0, qd.vertices);
lr.computeBoundingSphere(o3, 28, qd.vertices);
function Hb() {
  ri.call(this);
  const t = new lr();
  t.vertices = qd.vertices, t.uvs = qd.uvs, t.faces = qd.faces, t.colors = qd.colors, t.bounds = o3, t.updateNormals(), this.addComponent(t);
}
Hb.prototype = Object.create(ri.prototype);
function KL(t, a, u) {
  const f = [], p = [];
  f.push(0, u, 0), f.push(0, 0, 0);
  for (let m = 0; m < t; m++) {
    const v = m / t * Math.PI * 2, E = Math.cos(v) * a, g = Math.sin(v) * a;
    f.push(E, 0, g);
  }
  for (let m = 0; m < t; m++) {
    const v = m + 2, E = m === t - 1 ? 2 : m + 3;
    p.push(0, E, v), p.push(1, v, E);
  }
  return {
    vertices: new Float32Array(f),
    faces: new Uint16Array(p),
    colors: new Uint32Array(f.length / 3).fill(255)
  };
}
const Eh = KL(7, 0.5, 1), u3 = new Float32Array(32);
lr.computeBoundsFlatArray(u3, 0, Eh.vertices);
lr.computeBoundingSphere(u3, 28, Eh.vertices);
function Vb() {
  ri.call(this);
  const t = new lr();
  t.vertices = Eh.vertices, t.faces = Eh.faces, t.colors = Eh.colors, t.bounds = u3, t.updateNormals(), this.addComponent(t);
}
Vb.prototype = Object.create(ri.prototype);
function ZL(t, a, u) {
  const f = [], p = [], m = [], v = {};
  function E(x, C, b, M, _) {
    const k = `${x.toFixed(5)},${C.toFixed(5)},${b.toFixed(5)}`;
    if (v[k] !== void 0) return v[k];
    const A = f.length / 3;
    return f.push(x, C, b), p.push(M, _), v[k] = A, A;
  }
  const g = [];
  for (let x = 0; x <= t; x++) {
    const C = [], b = x * Math.PI / t, M = Math.sin(b), _ = Math.cos(b);
    for (let k = 0; k <= a; k++) {
      const A = k * 2 * Math.PI / a, N = Math.cos(A) * M * u, F = _ * u, W = Math.sin(A) * M * u, P = k / a, j = x / t;
      C.push(E(N, F, W, P, j));
    }
    g.push(C);
  }
  for (let x = 0; x < t; x++)
    for (let C = 0; C < a; C++) {
      const b = g[x][C], M = g[x][C + 1], _ = g[x + 1][C], k = g[x + 1][C + 1];
      x !== 0 && m.push(b, M, _), x !== t - 1 && m.push(_, M, k);
    }
  return {
    vertices: new Float32Array(f),
    uvs: new Float32Array(p),
    faces: new Uint16Array(m),
    colors: new Uint32Array(f.length / 3).fill(255)
  };
}
function JL(t) {
  const a = t.vertices, u = t.vertexNormals, f = {};
  for (let p = 0; p < a.length; p += 3) {
    const m = Math.abs(a[p]) < 1e-4 ? 0 : a[p], v = Math.abs(a[p + 1]) < 1e-4 ? 0 : a[p + 1], E = Math.abs(a[p + 2]) < 1e-4 ? 0 : a[p + 2], g = `${m.toFixed(4)},${v.toFixed(4)},${E.toFixed(4)}`;
    f[g] || (f[g] = []), f[g].push(p);
  }
  for (const p in f) {
    const m = f[p];
    if (m.length < 2) continue;
    let v = 0, E = 0, g = 0;
    for (let C = 0; C < m.length; C++) {
      const b = m[C];
      v += u[b], E += u[b + 1], g += u[b + 2];
    }
    const x = Math.sqrt(v * v + E * E + g * g);
    if (x > 1e-10) {
      const C = 1 / x;
      v *= C, E *= C, g *= C;
    }
    for (let C = 0; C < m.length; C++) {
      const b = m[C];
      u[b] = v, u[b + 1] = E, u[b + 2] = g;
    }
  }
}
function eN(t = 8, a = 8, u = 8) {
  const f = ZL(t, a, u), p = new Float32Array(32);
  return lr.computeBoundsFlatArray(p, 0, f.vertices), lr.computeBoundingSphere(p, 28, f.vertices), [
    f.vertices,
    f.faces,
    f.uvs,
    p,
    f.colors
  ];
}
function s3(t, a, u, f, p) {
  ri.call(this);
  const m = new lr();
  m.vertices = t, m.faces = a, m.uvs = u, m.colors = p || new Uint32Array(t.length / 3).fill(255), m.bounds = f, m.updateNormals(), JL(m), this.addComponent(m);
}
s3.prototype = Object.create(ri.prototype);
s3.generate = eN;
function tN() {
  const t = new Array(65536);
  for (let a = 0; a < 65536; a++) {
    const u = a >> 11 & 31, f = a >> 5 & 63, p = a & 31, m = u << 3 | u >> 2, v = f << 2 | f >> 4, E = p << 3 | p >> 2;
    t[a] = "#" + (m < 16 ? "0" : "") + m.toString(16) + (v < 16 ? "0" : "") + v.toString(16) + (E < 16 ? "0" : "") + E.toString(16);
  }
  return t;
}
const Kl = tN(), w0 = 31, Jc = 65535, nN = zD, x2 = 25;
function rN(t, a, u, f) {
  const p = u[0], m = u[1], v = u[4], E = u[5], g = u[8], x = u[9], C = new Path2D(), b = new Path2D(), M = new Path2D();
  for (let _ = 0; _ < t.length; _++) {
    const k = t[_];
    if (!k || !k.transform) continue;
    const A = k.transform.getLocalToWorld(), N = A[12], F = A[13], W = A[14];
    nN(
      f,
      0,
      N,
      F,
      W,
      u
    );
    const P = f[0], j = f[1];
    let V = A[0], q = A[1], H = A[2], oe = Math.sqrt(V * V + q * q + H * H);
    oe < 1e-4 && (V = 1, q = 0, H = 0, oe = 1);
    const Q = x2 / oe;
    C.moveTo(P, j), C.lineTo(
      P + (V * p + q * v + H * g) * Q,
      j + (V * m + q * E + H * x) * Q
    );
    let $ = A[4], ne = A[5], re = A[6], G = Math.sqrt($ * $ + ne * ne + re * re);
    G < 1e-4 && ($ = 0, ne = 1, re = 0, G = 1);
    const X = x2 / G;
    b.moveTo(P, j), b.lineTo(
      P + ($ * p + ne * v + re * g) * X,
      j + ($ * m + ne * E + re * x) * X
    );
    let ae = A[8], de = A[9], le = A[10], ie = Math.sqrt(ae * ae + de * de + le * le);
    ie < 1e-4 && (ae = 0, de = 0, le = 1, ie = 1);
    const ue = x2 / ie;
    M.moveTo(P, j), M.lineTo(
      P + (ae * p + de * v + le * g) * ue,
      j + (ae * m + de * E + le * x) * ue
    );
  }
  a.strokeStyle = "#ff0000", a.stroke(C), a.strokeStyle = "#00ff00", a.stroke(b), a.strokeStyle = "#0000ff", a.stroke(M);
}
function aN(t, a, u, f, p, m, v, E, g, x, C, b = 10) {
  const M = g * 0.5, _ = x * 0.5, k = E + v, A = C[0], N = C[1], F = C[4], W = C[5], P = C[8], j = C[9];
  t.beginPath(), t.strokeStyle = "cyan";
  for (let V = E; V < k; V++) {
    const q = f[V], H = u[q * 3], oe = u[q * 3 + 1], Q = u[q * 3 + 2], $ = a[H] * M + M, ne = a[H + 1] * _ + _, re = a[oe] * M + M, G = a[oe + 1] * _ + _, X = a[Q] * M + M, ae = a[Q + 1] * _ + _, de = ($ + re + X) * 0.33333, le = (ne + G + ae) * 0.33333, ie = q * 3, ue = p[ie], he = p[ie + 1], z = p[ie + 2], Z = ue * A + he * F + z * P, we = ue * N + he * W + z * j;
    t.moveTo(de, le), t.lineTo(de + Z * b, le - we * b);
  }
  t.stroke(), t.beginPath(), t.strokeStyle = "yellow";
  for (let V = E; V < k; V++) {
    const q = f[V], H = u[q * 3], oe = u[q * 3 + 1], Q = u[q * 3 + 2], $ = a[H] * M + M, ne = a[H + 1] * _ + _, re = a[oe] * M + M, G = a[oe + 1] * _ + _, X = a[Q] * M + M, ae = a[Q + 1] * _ + _, de = m[H], le = m[H + 1], ie = m[H + 2], ue = de * A + le * F + ie * P, he = de * N + le * W + ie * j;
    t.moveTo($, ne), t.lineTo($ + ue * b, ne - he * b);
    const z = m[oe], Z = m[oe + 1], we = m[oe + 2], be = z * A + Z * F + we * P, Fe = z * N + Z * W + we * j;
    t.moveTo(re, G), t.lineTo(re + be * b, G - Fe * b);
    const _e = m[Q], Pe = m[Q + 1], Be = m[Q + 2], De = _e * A + Pe * F + Be * P, Ve = _e * N + Pe * W + Be * j;
    t.moveTo(X, ae), t.lineTo(X + De * b, ae - Ve * b);
  }
  t.stroke();
}
function iN(t, a, u, f, p, m, v, E, g) {
  if (v <= 1) return;
  const x = g - E > 1e-4 ? 65535 / (g - E) : 0;
  m.fill(0);
  for (let b = 0; b < v; b++) {
    const M = t[b], _ = p[M] & 255;
    m[_]++;
  }
  let C = 0;
  for (let b = 0; b < 256; b++) {
    const M = m[b];
    m[b] = C, C += M;
  }
  for (let b = 0; b < v; b++) {
    const M = t[b], _ = p[M] & 255;
    a[m[_]++] = M;
  }
  m.fill(0);
  for (let b = 0; b < v; b++) {
    const M = a[b], _ = f[M] & 255;
    m[_]++;
  }
  C = 0;
  for (let b = 0; b < 256; b++) {
    const M = m[b];
    m[b] = C, C += M;
  }
  for (let b = 0; b < v; b++) {
    const M = a[b], _ = f[M] & 255;
    t[m[_]++] = M;
  }
  m.fill(0);
  for (let b = 0; b < v; b++) {
    const M = t[b];
    let k = (u[M] - E) * x;
    k < 0 ? k = 0 : k > 65535 && (k = 65535);
    const A = 65535 - (k | 0) & 255;
    m[A]++;
  }
  C = 0;
  for (let b = 0; b < 256; b++) {
    const M = m[b];
    m[b] = b & 1 ? C + M - 1 : C, C += M;
  }
  for (let b = 0; b < v; b++) {
    const M = t[b];
    let k = (u[M] - E) * x;
    k < 0 ? k = 0 : k > 65535 && (k = 65535);
    const A = 65535 - (k | 0) & 255;
    A & 1 ? a[m[A]--] = M : a[m[A]++] = M;
  }
  m.fill(0);
  for (let b = 0; b < v; b++) {
    const M = a[b];
    let k = (u[M] - E) * x;
    k < 0 ? k = 0 : k > 65535 && (k = 65535);
    const A = 65535 - (k | 0) >> 8 & 255;
    m[A]++;
  }
  C = 0;
  for (let b = 0; b < 256; b++) {
    const M = m[b];
    m[b] = C, C += M;
  }
  for (let b = 0; b < v; b++) {
    const M = a[b];
    let k = (u[M] - E) * x;
    k < 0 ? k = 0 : k > 65535 && (k = 65535);
    const A = 65535 - (k | 0) >> 8 & 255;
    t[m[A]++] = M;
  }
}
const _u = 0, ku = 3, ef = 8, Yd = -1, w2 = -2, Ns = 0, Wd = 2;
function Ib(t, a, u, f, p, m, v, E, g, x, C) {
  if (x[g] !== E) {
    const b = Kl[E];
    t.fillStyle = b, t.strokeStyle = b, x[g] = E, g === ku && E !== Jc && (x[ef] = 1);
  }
  t.beginPath(), t.moveTo(a, u), t.lineTo(f, p), t.lineTo(m, v), t.closePath(), t.stroke(), t.fill(), C[g === ku ? Wd : Ns]++;
}
function c3(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F, W, P, j, V, q, H, oe, Q, $, ne, re) {
  Ib(
    t,
    a,
    u,
    f,
    p,
    m,
    v,
    Jc,
    ku,
    Q,
    $
  );
}
function f3(t, a, u, f, p, m) {
  for (let v = a; v < u; v++) p[t[v]] = v;
  for (let v = a; v < u; v++) {
    const E = t[v], g = E * 3, x = f[g], C = f[g + 1], b = f[g + 2];
    m[E] = (x === Yd || x >= 0 && p[x] > v ? 1 : 0) | (C === Yd || C >= 0 && p[C] > v ? 2 : 0) | (b === Yd || b >= 0 && p[b] > v ? 4 : 0);
  }
  for (let v = a; v < u; v++) p[t[v]] = -1;
}
const Bd = 64, xh = 128, Kd = 1, C0 = 2 * Kd, Mu = 2048, Os = 4096, Rh = Os - 1, Ti = 8, Uo = 0, hh = 1, _s = 2, Zc = 3, lN = 4, wh = 0, Ch = 5, Mh = 1, _h = 2, qb = 3, d3 = 4;
function p3() {
  const t = {
    slots: new Int32Array(Bd * Ti),
    // Screen bounds per slot, as [x0, y0, x1, y1]. The overlap guard's only input.
    aabb: new Float32Array(Bd * 4),
    poolX: new Float32Array(Mu),
    poolY: new Float32Array(Mu),
    poolId: new Int32Array(Mu),
    poolNext: new Int32Array(Mu),
    poolSlot: new Int8Array(Mu),
    // 1 where the boundary edge LEAVING this node must be pushed outward at flush, i.e. the face
    // across it is drawn later. See the expansion note in weldFlushSlot.
    poolExpand: new Uint8Array(Mu),
    eFrom: new Int32Array(Os),
    eTo: new Int32Array(Os),
    eNode: new Int32Array(Os),
    eStamp: new Int32Array(Os),
    scal: new Int32Array(8),
    emitX: new Float32Array(xh),
    emitY: new Float32Array(xh),
    emitF: new Uint8Array(xh),
    frameId: -1,
    evictions: 0
  };
  return t.scal[_h] = 1, t1(t), t;
}
function t1(t) {
  const a = t.slots;
  for (let p = 0; p < Bd; p++) a[p * Ti + Uo] = -1;
  t.scal[wh] = -1, t.scal[Ch] = -1;
  const u = t.poolNext, f = t.poolSlot;
  for (let p = 0; p < Mu - 1; p++)
    u[p] = p + 1, f[p] = -1;
  u[Mu - 1] = -1, f[Mu - 1] = -1, t.scal[Mh] = 0, t.scal[d3] = 0, t.scal[_h]++, t.scal[qb] = 0;
}
function $0(t, a) {
  let u = Math.imul(t, 2654435761) ^ Math.imul(a, 2246822519);
  return u ^= u >>> 15, u = Math.imul(u, 625341585), u ^= u >>> 13, u & Rh;
}
function C2(t, a, u) {
  const f = t.scal[_h], p = t.eFrom, m = t.eTo, v = t.eStamp;
  let E = $0(a, u);
  for (let g = 0; g < Os; g++) {
    if (v[E] !== f) return -1;
    if (p[E] === a && m[E] === u) return t.eNode[E];
    E = E + 1 & Rh;
  }
  return -1;
}
function oN(t, a, u, f) {
  const p = t.scal[_h], m = t.eFrom, v = t.eTo, E = t.eStamp;
  let g = $0(a, u);
  for (let x = 0; x < Os; x++) {
    if (E[g] !== p) {
      m[g] = a, v[g] = u, t.eNode[g] = f, E[g] = p;
      return;
    }
    if (m[g] === a && v[g] === u) return;
    g = g + 1 & Rh;
  }
}
function n1(t, a, u) {
  const f = t.scal[_h], p = t.eFrom, m = t.eTo, v = t.eStamp, E = t.eNode;
  let g = $0(a, u), x = !1;
  for (let b = 0; b < Os && v[g] === f; b++) {
    if (p[g] === a && m[g] === u) {
      x = !0;
      break;
    }
    g = g + 1 & Rh;
  }
  if (!x) return;
  let C = g;
  for (; ; ) {
    if (v[g] = f - 1, C = C + 1 & Rh, v[C] !== f) return;
    const b = $0(p[C], m[C]);
    (g <= C ? g < b && b <= C : g < b || b <= C) || (p[g] = p[C], m[g] = m[C], E[g] = E[C], v[g] = f, g = C);
  }
}
function b0(t, a, u, f, p) {
  const m = t.scal[Mh];
  return m === -1 ? -1 : (t.scal[Mh] = t.poolNext[m], t.poolX[m] = a, t.poolY[m] = u, t.poolId[m] = f, t.poolNext[m] = -1, t.poolSlot[m] = p, t.scal[d3]++, m);
}
function Id(t, a) {
  const u = t.poolNext[a];
  u !== -1 && n1(t, t.poolId[a], t.poolId[u]), t.poolSlot[a] = -1, t.poolId[a] = -1, t.poolNext[a] = t.scal[Mh], t.scal[Mh] = a, t.scal[d3]--;
}
function Ms(t, a, u) {
  const f = t.poolNext[a];
  f !== -1 && n1(t, t.poolId[a], t.poolId[f]), t.poolNext[a] = u, u !== -1 && oN(t, t.poolId[a], t.poolId[u], a);
}
function L2(t, a, u, f, p, m, v, E, g) {
  const x = t.slots, C = a * Ti, b = x[C + Uo];
  if (b === -1) return;
  const M = x[C + hh], _ = x[C + _s], k = t.poolNext, A = t.poolX, N = t.poolY, F = t.poolId, W = t.poolExpand, P = t.emitX, j = t.emitY, V = t.emitF, q = g * g;
  let H = 0, oe = M;
  for (let ne = 0; ne < _; ne++) {
    const re = k[oe], G = A[oe], X = N[oe], ae = W[oe];
    if (H < 2)
      P[H] = G, j[H] = X, V[H] = ae, H++;
    else {
      const de = P[H - 2], le = j[H - 2], ie = P[H - 1], ue = j[H - 1], he = ie - de, z = ue - le, Z = G - de, we = X - le, be = he * we - z * Z;
      V[H - 2] === V[H - 1] && be * be <= q * (Z * Z + we * we) ? (P[H - 1] = G, j[H - 1] = X, V[H - 1] = ae) : (P[H] = G, j[H] = X, V[H] = ae, H++);
    }
    re !== -1 && n1(t, F[oe], F[re]), oe = re;
  }
  oe = M;
  for (let ne = 0; ne < _; ne++) {
    const re = k[oe];
    k[oe] = -1, Id(t, oe), oe = re;
  }
  x[C + Uo] = -1, a < 32 ? t.scal[wh] |= 1 << a : t.scal[Ch] |= 1 << a - 32;
  let Q = 0;
  for (; H - Q >= 4; ) {
    const ne = P[H - 2], re = j[H - 2], G = P[H - 1], X = j[H - 1], ae = P[Q], de = j[Q], le = G - ne, ie = X - re, ue = ae - ne, he = de - re, z = le * he - ie * ue;
    if (z * z > q * (ue * ue + he * he) || V[H - 2] !== V[H - 1]) break;
    H--;
  }
  for (; H - Q >= 4; ) {
    const ne = P[H - 1], re = j[H - 1], G = P[Q], X = j[Q], ae = P[Q + 1], de = j[Q + 1], le = G - ne, ie = X - re, ue = ae - ne, he = de - re, z = le * he - ie * ue;
    if (z * z > q * (ue * ue + he * he) || V[H - 1] !== V[Q]) break;
    Q++;
  }
  if (H - Q < 3) return;
  if (f[p] !== b) {
    const ne = Kl[b];
    u.fillStyle = ne, u.strokeStyle = ne, f[p] = b, m !== -1 && b !== Jc && (f[m] = 1);
  }
  const $ = H - Q;
  u.beginPath();
  for (let ne = 0; ne < $; ne++) {
    const re = Q + ne;
    if (ne === 0 ? u.moveTo(P[re], j[re]) : u.lineTo(P[re], j[re]), V[re] === 0) continue;
    const G = Q + (ne + 1 === $ ? 0 : ne + 1), X = P[G] - P[re], ae = j[G] - j[re], de = X < 0 ? -X : X, le = ae < 0 ? -ae : ae, ie = de > le ? de + 0.4 * le : le + 0.4 * de;
    if (ie < 1e-6) continue;
    const ue = Kd / ie, he = ae * ue, z = -X * ue;
    u.lineTo(P[re] + he, j[re] + z), u.lineTo(P[G] + he, j[G] + z);
  }
  u.fill(), v[E]++;
}
function v3(t, a, u, f, p, m, v, E) {
  const g = t.slots;
  for (; ; ) {
    let x = -1, C = 2147483647;
    for (let b = 0; b < Bd; b++) {
      const M = b * Ti;
      g[M + Uo] !== -1 && g[M + Zc] < C && (C = g[M + Zc], x = b);
    }
    if (x === -1) return;
    L2(
      t,
      x,
      a,
      u,
      f,
      p,
      m,
      v,
      E
    );
  }
}
function h3(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F, W, P = 0) {
  const j = t.slots, V = t.poolExpand, q = C < _ ? C < N ? C : N : _ < N ? _ : N, H = C > _ ? C > N ? C : N : _ > N ? _ : N, oe = b < k ? b < F ? b : F : k < F ? k : F, Q = b > k ? b > F ? b : F : k > F ? k : F, $ = t.aabb;
  for (let De = 0; De < Bd; De++) {
    const Ve = j[De * Ti + Uo];
    if (Ve === -1 || Ve === g) continue;
    const Xe = De << 2;
    $[Xe] > H + C0 || $[Xe + 2] < q - C0 || $[Xe + 1] > Q + C0 || $[Xe + 3] < oe - C0 || L2(
      t,
      De,
      a,
      u,
      f,
      p,
      m,
      v,
      E
    );
  }
  const ne = ++t.scal[qb], re = t.poolSlot, G = t.poolNext;
  let X = C2(t, A, M), ae = C2(t, W, A), de = C2(t, M, W), le = X === -1 ? -1 : re[X], ie = ae === -1 ? -1 : re[ae], ue = de === -1 ? -1 : re[de];
  le !== -1 && j[le * Ti + Uo] !== g && (X = -1, le = -1), ie !== -1 && j[ie * Ti + Uo] !== g && (ae = -1, ie = -1), ue !== -1 && j[ue * Ti + Uo] !== g && (de = -1, ue = -1);
  const he = (X !== -1 ? 1 : 0) + (ae !== -1 ? 1 : 0) + (de !== -1 ? 1 : 0);
  if (he === 2) {
    let De, Ve, Xe, Oe, Ke;
    if (X !== -1 && ae !== -1 ? (De = 0, Ve = X, Xe = ae, Oe = le, Ke = ie) : ae !== -1 && de !== -1 ? (De = 1, Ve = ae, Xe = de, Oe = ie, Ke = ue) : (De = 2, Ve = de, Xe = X, Oe = ue, Ke = le), Oe === Ke) {
      if (G[Xe] === Ve) {
        const Te = Oe * Ti;
        Ms(t, Xe, G[Ve]), V[Xe] = P >> (De + 2) % 3 & 1, j[Te + hh] === Ve && (j[Te + hh] = Xe), Id(t, Ve), j[Te + _s]--, j[Te + Zc] = ne;
        const Ge = Oe << 2;
        q < $[Ge] && ($[Ge] = q), oe < $[Ge + 1] && ($[Ge + 1] = oe), H > $[Ge + 2] && ($[Ge + 2] = H), Q > $[Ge + 3] && ($[Ge + 3] = Q);
        return;
      }
    } else {
      const Te = Oe * Ti, Ge = Ke * Ti, et = j[Te + _s] + j[Ge + _s] - 1;
      if (et <= xh) {
        const ze = G[Ve], ut = G[Xe], Ut = G[ut];
        Ut !== -1 && n1(t, t.poolId[ut], t.poolId[Ut]), G[ut] = -1;
        const bt = V[ut];
        Ms(t, Ve, Ut), Ms(t, Xe, ze), V[Ve] = bt, V[Xe] = P >> (De + 2) % 3 & 1, Id(t, ut);
        let Me = Ve;
        for (let nt = 0; nt < et && (re[Me] = Oe, Me = G[Me], Me !== -1); nt++)
          ;
        j[Te + hh] = Ve, j[Te + _s] = et, j[Te + Zc] = ne;
        const Qe = Oe << 2, Et = Ke << 2;
        $[Et] < $[Qe] && ($[Qe] = $[Et]), $[Et + 1] < $[Qe + 1] && ($[Qe + 1] = $[Et + 1]), $[Et + 2] > $[Qe + 2] && ($[Qe + 2] = $[Et + 2]), $[Et + 3] > $[Qe + 3] && ($[Qe + 3] = $[Et + 3]), q < $[Qe] && ($[Qe] = q), oe < $[Qe + 1] && ($[Qe + 1] = oe), H > $[Qe + 2] && ($[Qe + 2] = H), Q > $[Qe + 3] && ($[Qe + 3] = Q), j[Ge + Uo] = -1, Ke < 32 ? t.scal[wh] |= 1 << Ke : t.scal[Ch] |= 1 << Ke - 32;
        return;
      }
    }
  } else if (he === 1) {
    const De = X !== -1 ? X : ae !== -1 ? ae : de, Ve = X !== -1 ? le : ae !== -1 ? ie : ue, Xe = Ve * Ti;
    if (j[Xe + _s] < xh) {
      const Ge = b0(t, X !== -1 ? N : ae !== -1 ? C : _, X !== -1 ? F : ae !== -1 ? b : k, X !== -1 ? W : ae !== -1 ? M : A, Ve);
      if (Ge !== -1) {
        Ms(t, Ge, G[De]), Ms(t, De, Ge);
        const et = X !== -1 ? 0 : ae !== -1 ? 1 : 2;
        V[De] = P >> (et + 1) % 3 & 1, V[Ge] = P >> (et + 2) % 3 & 1, j[Xe + _s]++, j[Xe + Zc] = ne;
        const ze = Ve << 2;
        q < $[ze] && ($[ze] = q), oe < $[ze + 1] && ($[ze + 1] = oe), H > $[ze + 2] && ($[ze + 2] = H), Q > $[ze + 3] && ($[ze + 3] = Q);
        return;
      }
    }
  }
  let z = -1;
  const Z = t.scal[wh], we = t.scal[Ch];
  if (Z !== 0)
    z = 31 - Math.clz32(Z & -Z);
  else if (we !== 0)
    z = 63 - Math.clz32(we & -we);
  else {
    let De = 2147483647;
    for (let Ve = 0; Ve < Bd; Ve++) {
      const Xe = j[Ve * Ti + Zc];
      Xe < De && (De = Xe, z = Ve);
    }
    L2(
      t,
      z,
      a,
      u,
      f,
      p,
      m,
      v,
      E
    ), t.evictions++;
  }
  const be = b0(t, C, b, M, z), Fe = b0(t, _, k, A, z), _e = b0(t, N, F, W, z);
  if (be === -1 || Fe === -1 || _e === -1) {
    be !== -1 && Id(t, be), Fe !== -1 && Id(t, Fe), _e !== -1 && Id(t, _e);
    return;
  }
  Ms(t, be, Fe), Ms(t, Fe, _e), Ms(t, _e, be), V[be] = P & 1, V[Fe] = P >> 1 & 1, V[_e] = P >> 2 & 1;
  const Pe = z * Ti;
  j[Pe + Uo] = g, j[Pe + lN] = x, j[Pe + hh] = be, j[Pe + _s] = 3, j[Pe + Zc] = ne;
  const Be = z << 2;
  $[Be] = q, $[Be + 1] = oe, $[Be + 2] = H, $[Be + 3] = Q, z < 32 ? t.scal[wh] &= ~(1 << z) : t.scal[Ch] &= ~(1 << z - 32);
}
const uh = p3(), eC = 0.05;
function zs(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F, W, P, j, V, q, H, oe, Q, $, ne, re, G) {
  uh.frameId !== ne && (t1(uh), uh.frameId = ne);
  const X = k * 3, ae = g[X], de = g[X + 1], le = g[X + 2];
  let ie;
  if (ae === de && de === le)
    ie = (ae >>> 16 & 248) << 8 | (ae >>> 8 & 252) << 3 | (ae & 248) >> 3;
  else {
    const ue = ((ae >>> 16) + (de >>> 16) + (le >>> 16)) / 3, he = ((ae >>> 8 & 255) + (de >>> 8 & 255) + (le >>> 8 & 255)) / 3, z = ((ae & 255) + (de & 255) + (le & 255)) / 3;
    ie = (ue & 248) << 8 | (he & 252) << 3 | (z & 248) >> 3;
  }
  h3(
    uh,
    t,
    Q,
    0,
    -1,
    $,
    Ns,
    eC,
    ie,
    oe,
    a,
    u,
    b,
    f,
    p,
    M,
    m,
    v,
    _,
    G
  ), re && v3(
    uh,
    t,
    Q,
    _u,
    -1,
    $,
    Ns,
    eC
  );
}
const Ri = 32, Ql = 12, uN = 0.9999, $d = 0.5, T0 = 2 * Kd, mh = 2048, r1 = mh - 1, yl = 4, As = 0, ks = 1, bh = 2;
function sN() {
  return {
    slots: new Int32Array(Ri * yl),
    // Six affine terms per chart, fitted from the face that seeded it.
    affine: new Float32Array(Ri * 6),
    // The chart's plane normal, for the coplanarity test.
    normal: new Float32Array(Ri * 3),
    // Screen bounds per chart, [x0, y0, x1, y1] - the overlap guard's only input.
    aabb: new Float32Array(Ri * 4),
    // Boundary rings as flat arrays rather than linked nodes: short enough that an insert is a
    // handful of element moves, and an array cannot be corrupted by pointer surgery.
    bu: new Float32Array(Ri * Ql),
    bv: new Float32Array(Ri * Ql),
    bid: new Int32Array(Ri * Ql),
    // 1 where the boundary edge LEAVING vertex i must be pushed outward at flush, i.e. the face
    // across it is drawn later. See computeExpandMasks in shared/shaders.js.
    bexp: new Uint8Array(Ri * Ql),
    // The mesh each chart came from, to reach its texture pattern at flush.
    meshRef: new Array(Ri).fill(null),
    // Directed-edge table: (from -> to) -> slot, cleared in O(1) by bumping the generation.
    eFrom: new Int32Array(mh),
    eTo: new Int32Array(mh),
    eSlot: new Int32Array(mh),
    eStamp: new Int32Array(mh),
    gen: 1,
    seq: 0,
    live: 0,
    frameId: -1
  };
}
function cN(t) {
  const a = t.slots;
  for (let u = 0; u < Ri; u++)
    a[u * yl + As] = 0, t.meshRef[u] = null;
  t.gen++, t.seq = 0, t.live = 0;
}
function m3(t, a) {
  let u = Math.imul(t, 2654435761) ^ Math.imul(a, 2246822519);
  return u ^= u >>> 15, u = Math.imul(u, 625341585), u ^= u >>> 13, u & r1;
}
function b2(t, a, u) {
  const f = t.gen;
  let p = m3(a, u);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return -1;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === u)
      return t.eSlot[p];
    p = p + 1 & r1;
  }
  return -1;
}
function N0(t, a, u, f) {
  const p = t.gen;
  let m = m3(a, u);
  for (let v = 0; v < 32; v++) {
    if (t.eStamp[m] !== p) {
      t.eStamp[m] = p, t.eFrom[m] = a, t.eTo[m] = u, t.eSlot[m] = f;
      return;
    }
    if (t.eFrom[m] === a && t.eTo[m] === u) return;
    m = m + 1 & r1;
  }
}
function z0(t, a, u) {
  const f = t.gen;
  let p = m3(a, u);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === u) {
      t.eStamp[p] = -1;
      return;
    }
    p = p + 1 & r1;
  }
}
function fN(t, a) {
  const u = a * Ql, f = t.slots[a * yl + ks];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    N0(t, t.bid[u + p], t.bid[u + m], a);
  }
}
function dN(t, a) {
  const u = a * Ql, f = t.slots[a * yl + ks];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    z0(t, t.bid[u + p], t.bid[u + m]);
  }
}
function pN(t) {
  if (typeof document > "u") return t;
  const a = document.createElement("canvas");
  return a.width = t.naturalWidth, a.height = t.naturalHeight, a.getContext("2d").drawImage(t, 0, 0), a;
}
function N2(t, a, u, f, p, m) {
  const v = t.slots, E = a * yl;
  if (v[E + As] === 0) return;
  const g = v[E + ks];
  dN(t, a), v[E + As] = 0, t.live--;
  const x = t.meshRef[a];
  if (t.meshRef[a] = null, g < 3 || x === null) return;
  const C = a * Ql, b = t.bu, M = t.bv, _ = a * 6;
  let k = x.texturePattern;
  k || (k = u.createPattern(
    pN(x.textureImage),
    "repeat"
  ), x.texturePattern = k), u.fillStyle = k, f[_u] = -1;
  const A = t.affine[_], N = t.affine[_ + 1], F = t.affine[_ + 2], W = t.affine[_ + 3];
  u.setTransform(A, N, F, W, t.affine[_ + 4], t.affine[_ + 5]);
  const P = A * W - N * F, j = P > 1e-12 || P < -1e-12 ? 1 / P : 0, V = t.bexp;
  u.beginPath();
  for (let q = 0; q < g; q++) {
    const H = b[C + q], oe = M[C + q];
    if (q === 0 ? u.moveTo(H, oe) : u.lineTo(H, oe), V[C + q] === 0) continue;
    const Q = q + 1 === g ? 0 : q + 1, $ = b[C + Q], ne = M[C + Q], re = A * ($ - H) + F * (ne - oe), G = N * ($ - H) + W * (ne - oe), X = re < 0 ? -re : re, ae = G < 0 ? -G : G, de = X > ae ? X + 0.4 * ae : ae + 0.4 * X;
    if (de < 1e-6) continue;
    const le = Kd / de, ie = G * le, ue = -re * le, he = (W * ie - F * ue) * j, z = (A * ue - N * ie) * j;
    u.lineTo(H + he, oe + z), u.lineTo($ + he, ne + z);
  }
  u.fill(), u.setTransform(1, 0, 0, 1, 0, 0), p[m]++;
}
function tC(t, a, u, f, p) {
  const m = t.slots;
  for (; t.live > 0; ) {
    let v = -1, E = 2147483647;
    for (let g = 0; g < Ri; g++) {
      const x = g * yl;
      m[x + As] !== 0 && m[x + bh] < E && (E = m[x + bh], v = g);
    }
    if (v === -1) return;
    N2(t, v, a, u, f, p);
  }
}
function vN(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F, W, P, j, V, q, H, oe = 0) {
  const Q = t.slots, $ = ++t.seq, ne = M < F ? M < q ? M : q : F < q ? F : q, re = M > F ? M > q ? M : q : F > q ? F : q, G = _ < W ? _ < H ? _ : H : W < H ? W : H, X = _ > W ? _ > H ? _ : H : W > H ? W : H;
  let ae = -1, de = -1, le = -1, ie = 0, ue = 0, he = -1, z = -1, Z = -1;
  if (t.live > 0) {
    const Oe = b2(t, N, b), Ke = b2(t, V, N), Te = b2(t, b, V);
    for (let Ge = 0; Ge < 3 && ae === -1; Ge++) {
      const et = Ge === 0 ? Oe : Ge === 1 ? Ke : Te;
      if (et === -1) continue;
      const ze = et * yl;
      if (Q[ze + As] === 0 || t.meshRef[et] !== m) continue;
      const ut = et * 3;
      if (t.normal[ut] * v + t.normal[ut + 1] * E + t.normal[ut + 2] * g < uN) continue;
      const bt = et * 6, Me = t.affine[bt], Qe = t.affine[bt + 1], Et = t.affine[bt + 2], nt = t.affine[bt + 3], Rt = t.affine[bt + 4], it = t.affine[bt + 5];
      let Ct = Me * x + Et * C + Rt - M, Pt = Qe * x + nt * C + it - _;
      if (Ct * Ct + Pt * Pt > $d * $d || (Ct = Me * k + Et * A + Rt - F, Pt = Qe * k + nt * A + it - W, Ct * Ct + Pt * Pt > $d * $d) || (Ct = Me * P + Et * j + Rt - q, Pt = Qe * P + nt * j + it - H, Ct * Ct + Pt * Pt > $d * $d)) continue;
      const Xt = et * Ql, Ce = Q[ze + ks], Ie = t.bid;
      let ft = -1, Ye = -1, Lt = -1;
      for (let xt = 0; xt < Ce; xt++) {
        const ht = xt + 1 === Ce ? 0 : xt + 1, Ae = Ie[Xt + xt], dt = Ie[Xt + ht];
        Ae === N && dt === b ? ft = xt : Ae === V && dt === N ? Ye = xt : Ae === b && dt === V && (Lt = xt);
      }
      const Kt = (ft !== -1 ? 1 : 0) + (Ye !== -1 ? 1 : 0) + (Lt !== -1 ? 1 : 0);
      if (Kt !== 0) {
        if (Kt === 1) {
          if (Ce >= Ql) continue;
          ft !== -1 ? (de = ft, ie = P, ue = j, he = V, z = 0) : Ye !== -1 ? (de = Ye, ie = x, ue = C, he = b, z = 1) : (de = Lt, ie = k, ue = A, he = N, z = 2), ae = et;
        } else if (Kt === 2) {
          const xt = ft !== -1 ? ft : Ye, ht = Lt !== -1 ? Lt : Ye !== -1 ? Ye : ft, Ae = (xt + 1) % Ce === ht ? xt : (ht + 1) % Ce === xt ? ht : -1;
          if (Ae === -1) continue;
          de = Ae, le = (Ae + 1) % Ce, Z = ft === -1 ? 0 : Ye === -1 ? 1 : 2, ae = et;
        }
      }
    }
  }
  const we = t.aabb;
  if (t.live > 0)
    for (let Oe = 0; Oe < Ri; Oe++) {
      if (Oe === ae || Q[Oe * yl + As] === 0) continue;
      const Ke = Oe << 2;
      we[Ke] > re + T0 || we[Ke + 2] < ne - T0 || we[Ke + 1] > X + T0 || we[Ke + 3] < G - T0 || N2(t, Oe, a, u, f, p);
    }
  if (ae !== -1) {
    const Oe = ae * Ql, Ke = ae * yl, Te = Q[Ke + ks], Ge = t.bu, et = t.bv, ze = t.bid, ut = t.bexp;
    if (le === -1) {
      const bt = ze[Oe + de], Me = ze[Oe + (de + 1) % Te];
      z0(t, bt, Me);
      for (let Qe = Te; Qe > de + 1; Qe--)
        Ge[Oe + Qe] = Ge[Oe + Qe - 1], et[Oe + Qe] = et[Oe + Qe - 1], ze[Oe + Qe] = ze[Oe + Qe - 1], ut[Oe + Qe] = ut[Oe + Qe - 1];
      Ge[Oe + de + 1] = ie, et[Oe + de + 1] = ue, ze[Oe + de + 1] = he, ut[Oe + de] = oe >> (z + 1) % 3 & 1, ut[Oe + de + 1] = oe >> (z + 2) % 3 & 1, Q[Ke + ks] = Te + 1, N0(t, bt, he, ae), N0(t, he, Me, ae);
    } else {
      const bt = (de + 1) % Te, Me = ze[Oe + de], Qe = ze[Oe + bt], Et = ze[Oe + (bt + 1) % Te];
      z0(t, Me, Qe), z0(t, Qe, Et);
      for (let nt = bt; nt < Te - 1; nt++)
        Ge[Oe + nt] = Ge[Oe + nt + 1], et[Oe + nt] = et[Oe + nt + 1], ze[Oe + nt] = ze[Oe + nt + 1], ut[Oe + nt] = ut[Oe + nt + 1];
      ut[Oe + (de < bt ? de : de - 1)] = oe >> Z & 1, Q[Ke + ks] = Te - 1, N0(t, Me, Et, ae);
    }
    Q[Ke + bh] = $;
    const Ut = ae << 2;
    ne < we[Ut] && (we[Ut] = ne), G < we[Ut + 1] && (we[Ut + 1] = G), re > we[Ut + 2] && (we[Ut + 2] = re), X > we[Ut + 3] && (we[Ut + 3] = X);
    return;
  }
  let be = -1;
  for (let Oe = 0; Oe < Ri; Oe++)
    if (Q[Oe * yl + As] === 0) {
      be = Oe;
      break;
    }
  if (be === -1) {
    let Oe = 2147483647;
    for (let Ke = 0; Ke < Ri; Ke++) {
      const Te = Q[Ke * yl + bh];
      Te < Oe && (Oe = Te, be = Ke);
    }
    N2(t, be, a, u, f, p);
  }
  const _e = 1 / (x * (A - j) - C * (k - P) + (k * j - P * A)), Pe = be * 6;
  t.affine[Pe] = (M * (A - j) + F * (j - C) + q * (C - A)) * _e, t.affine[Pe + 1] = (_ * (A - j) + W * (j - C) + H * (C - A)) * _e, t.affine[Pe + 2] = (M * (P - k) + F * (x - P) + q * (k - x)) * _e, t.affine[Pe + 3] = (_ * (P - k) + W * (x - P) + H * (k - x)) * _e, t.affine[Pe + 4] = (M * (k * j - P * A) + F * (P * C - x * j) + q * (x * A - k * C)) * _e, t.affine[Pe + 5] = (_ * (k * j - P * A) + W * (P * C - x * j) + H * (x * A - k * C)) * _e;
  const Be = be * 3;
  t.normal[Be] = v, t.normal[Be + 1] = E, t.normal[Be + 2] = g;
  const De = be * Ql;
  t.bu[De] = x, t.bv[De] = C, t.bid[De] = b, t.bu[De + 1] = k, t.bv[De + 1] = A, t.bid[De + 1] = N, t.bu[De + 2] = P, t.bv[De + 2] = j, t.bid[De + 2] = V, t.bexp[De] = oe & 1, t.bexp[De + 1] = oe >> 1 & 1, t.bexp[De + 2] = oe >> 2 & 1;
  const Ve = be * yl;
  Q[Ve + As] = 1, Q[Ve + ks] = 3, Q[Ve + bh] = $, t.meshRef[be] = m, t.live++;
  const Xe = be << 2;
  we[Xe] = ne, we[Xe + 1] = G, we[Xe + 2] = re, we[Xe + 3] = X, fN(t, be);
}
const Hd = sN();
function y3(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F, W, P, j, V, q, H, oe, Q, $, ne, re, G) {
  Hd.frameId !== ne && (cN(Hd), Hd.frameId = ne);
  const X = A.textureImage;
  if (X && X.complete && X.naturalWidth > 0 && A.uvs) {
    const le = A.uvs, ie = A.faces[N] * 2, ue = A.faces[N + 1] * 2, he = A.faces[N + 2] * 2, z = X.width, Z = X.height, we = le[ie] * z, be = le[ie + 1] * Z, Fe = le[ue] * z, _e = le[ue + 1] * Z, Pe = le[he] * z, Be = le[he + 1] * Z, De = we * (_e - Be) - be * (Fe - Pe) + (Fe * Be - Pe * _e);
    if (Math.abs(De) > 1e-5) {
      vN(
        Hd,
        t,
        Q,
        $,
        Ns,
        A,
        C[k * 3],
        C[k * 3 + 1],
        C[k * 3 + 2],
        we,
        be,
        b,
        a,
        u,
        Fe,
        _e,
        M,
        f,
        p,
        Pe,
        Be,
        _,
        m,
        v,
        G
      ), re && tC(
        Hd,
        t,
        Q,
        $,
        Ns
      );
      return;
    }
  }
  tC(
    Hd,
    t,
    Q,
    $,
    Ns
  );
  const ae = g[k * 3], de = (ae >>> 16 & 248) << 8 | (ae >>> 8 & 252) << 3 | (ae & 248) >> 3;
  Ib(
    t,
    a,
    u,
    f,
    p,
    m,
    v,
    de,
    0,
    Q,
    $
  );
}
const sh = p3(), nC = 0.05;
function g3(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F, W, P, j, V, q, H, oe, Q, $, ne, re, G) {
  let X = F >>> 16 & 255, ae = F >>> 8 & 255, de = F & 255;
  const le = C[k * 3], ie = C[k * 3 + 1], ue = C[k * 3 + 2], he = W[0];
  for (let Fe = 1; Fe <= he; Fe++) {
    const _e = P[W[Fe]];
    if (_e.light.type === 0) {
      const Pe = -_e.transform.worldMatrix[8], Be = -_e.transform.worldMatrix[9], De = -_e.transform.worldMatrix[10], Ve = le * Pe + ie * Be + ue * De;
      if (Ve > 0) {
        const Xe = _e.light.color;
        X += (Xe >>> 16 & 255) * Ve, ae += (Xe >>> 8 & 255) * Ve, de += (Xe & 255) * Ve;
      }
    }
  }
  X *= 39215e-7, ae *= 39215e-7, de *= 39215e-7, X > 1 && (X = 1), ae > 1 && (ae = 1), de > 1 && (de = 1);
  const z = X * 255 | 0, Z = ae * 255 | 0, we = de * 255 | 0, be = (z & 248) << 8 | (Z & 252) << 3 | (we & 248) >> 3;
  sh.frameId !== ne && (t1(sh), sh.frameId = ne), h3(
    sh,
    t,
    Q,
    ku,
    ef,
    $,
    Wd,
    nC,
    be,
    oe,
    a,
    u,
    b,
    f,
    p,
    M,
    m,
    v,
    _,
    G
  ), re && v3(
    sh,
    t,
    Q,
    ku,
    ef,
    $,
    Wd,
    nC
  );
}
const ml = 32, Xl = 16, aa = 4, rC = 1e-3, hN = 1e-3, mN = 1e-12, R0 = 2 * Kd, yh = 2048, a1 = yh - 1, gl = 4, Ls = 0, Ds = 1, Th = 2, H0 = 8, z2 = 0, U2 = 1, j2 = 2, V0 = 3, F2 = 4, I0 = 5, P2 = 6, q0 = 7;
function aC(t, a, u) {
  const f = t < 0 ? 0 : t > 255 ? 255 : t | 0, p = a < 0 ? 0 : a > 255 ? 255 : a | 0, m = u < 0 ? 0 : u > 255 ? 255 : u | 0;
  return (f & 248) << 8 | (p & 252) << 3 | (m & 248) >> 3;
}
function yN() {
  return {
    slots: new Int32Array(ml * gl),
    // The shading field per chart, fitted from the face that seeded it (see the FD_* lanes).
    field: new Float32Array(ml * H0),
    // Screen bounds per chart, [x0, y0, x1, y1] - the overlap guard's only input.
    aabb: new Float32Array(ml * 4),
    // Boundary rings as flat arrays rather than linked nodes: short enough that an insert is a
    // handful of element moves, and an array cannot be corrupted by pointer surgery.
    bx: new Float32Array(ml * Xl),
    by: new Float32Array(ml * Xl),
    bid: new Int32Array(ml * Xl),
    // 1 where the boundary edge LEAVING vertex i must be pushed outward at flush, i.e. the face
    // across it is drawn later. See computeExpandMasks in shared/shaders.js.
    bexp: new Uint8Array(ml * Xl),
    // Directed-edge table: (from -> to) -> slot, cleared in O(1) by bumping the generation.
    eFrom: new Int32Array(yh),
    eTo: new Int32Array(yh),
    eSlot: new Int32Array(yh),
    eStamp: new Int32Array(yh),
    gen: 1,
    seq: 0,
    live: 0,
    frameId: -1
  };
}
function gN(t) {
  const a = t.slots;
  for (let u = 0; u < ml; u++) a[u * gl + Ls] = 0;
  t.gen++, t.seq = 0, t.live = 0;
}
function S3(t, a) {
  let u = Math.imul(t, 2654435761) ^ Math.imul(a, 2246822519);
  return u ^= u >>> 15, u = Math.imul(u, 625341585), u ^= u >>> 13, u & a1;
}
function T2(t, a, u) {
  const f = t.gen;
  let p = S3(a, u);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return -1;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === u)
      return t.eSlot[p];
    p = p + 1 & a1;
  }
  return -1;
}
function U0(t, a, u, f) {
  const p = t.gen;
  let m = S3(a, u);
  for (let v = 0; v < 32; v++) {
    if (t.eStamp[m] !== p) {
      t.eStamp[m] = p, t.eFrom[m] = a, t.eTo[m] = u, t.eSlot[m] = f;
      return;
    }
    if (t.eFrom[m] === a && t.eTo[m] === u) return;
    m = m + 1 & a1;
  }
}
function j0(t, a, u) {
  const f = t.gen;
  let p = S3(a, u);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === u) {
      t.eStamp[p] = -1;
      return;
    }
    p = p + 1 & a1;
  }
}
function SN(t, a) {
  const u = a * Xl, f = t.slots[a * gl + Ds];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    U0(t, t.bid[u + p], t.bid[u + m], a);
  }
}
function EN(t, a) {
  const u = a * Xl, f = t.slots[a * gl + Ds];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    j0(t, t.bid[u + p], t.bid[u + m]);
  }
}
function $2(t, a, u, f, p) {
  const m = t.slots, v = a * gl;
  if (m[v + Ls] === 0) return;
  const E = m[v + Ds];
  if (EN(t, a), m[v + Ls] = 0, t.live--, E < 3) return;
  const g = a * Xl, x = t.bx, C = t.by, b = t.bexp, M = a * H0, _ = t.field[M + z2], k = t.field[M + U2];
  let A = 1 / 0, N = -1 / 0;
  for (let q = 0; q < E; q++) {
    const H = x[g + q] * _ + C[g + q] * k;
    H < A && (A = H), H > N && (N = H);
  }
  const F = t.field[M + j2], W = t.field[M + F2], P = t.field[M + P2], j = aC(
    t.field[M + V0] + F * A,
    t.field[M + I0] + W * A,
    t.field[M + q0] + P * A
  ), V = aC(
    t.field[M + V0] + F * N,
    t.field[M + I0] + W * N,
    t.field[M + q0] + P * N
  );
  if (j === V || N - A < hN)
    f[ku] !== j && (u.fillStyle = Kl[j], f[ku] = j, j !== Jc && (f[ef] = 1));
  else {
    const q = u.createLinearGradient(
      _ * A,
      k * A,
      _ * N,
      k * N
    );
    q.addColorStop(0, Kl[j]), q.addColorStop(1, Kl[V]), u.fillStyle = q, f[ku] = -1, f[ef] = 1;
  }
  u.beginPath();
  for (let q = 0; q < E; q++) {
    const H = x[g + q], oe = C[g + q];
    if (q === 0 ? u.moveTo(H, oe) : u.lineTo(H, oe), b[g + q] === 0) continue;
    const Q = q + 1 === E ? 0 : q + 1, $ = x[g + Q], ne = C[g + Q], re = $ - H, G = ne - oe, X = re < 0 ? -re : re, ae = G < 0 ? -G : G, de = X > ae ? X + 0.4 * ae : ae + 0.4 * X;
    if (de < 1e-6) continue;
    const le = Kd / de, ie = G * le, ue = -re * le;
    u.lineTo(H + ie, oe + ue), u.lineTo($ + ie, ne + ue);
  }
  u.fill(), p[Wd]++;
}
function xN(t, a, u, f) {
  const p = t.slots;
  for (; t.live > 0; ) {
    let m = -1, v = 2147483647;
    for (let E = 0; E < ml; E++) {
      const g = E * gl;
      p[g + Ls] !== 0 && p[g + Th] < v && (v = p[g + Th], m = E);
    }
    if (m === -1) return;
    $2(t, m, a, u, f);
  }
}
function wN(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F, W, P, j, V, q = 0) {
  const H = t.slots, oe = ++t.seq, Q = E < _ ? E < P ? E : P : _ < P ? _ : P, $ = E > _ ? E > P ? E : P : _ > P ? _ : P, ne = g < k ? g < j ? g : j : k < j ? k : j, re = g > k ? g > j ? g : j : k > j ? k : j;
  let G = -1, X = -1, ae = -1, de = 0, le = 0, ie = -1, ue = -1, he = -1;
  if (t.live > 0) {
    const Me = T2(t, A, x), Qe = T2(t, V, A), Et = T2(t, x, V);
    for (let nt = 0; nt < 3 && G === -1; nt++) {
      const Rt = nt === 0 ? Me : nt === 1 ? Qe : Et;
      if (Rt === -1) continue;
      const it = Rt * gl;
      if (H[it + Ls] === 0) continue;
      const Ct = Rt * H0, Pt = t.field[Ct + z2], Xt = t.field[Ct + U2], Ce = t.field[Ct + j2], Ie = t.field[Ct + V0], ft = t.field[Ct + F2], Ye = t.field[Ct + I0], Lt = t.field[Ct + P2], Kt = t.field[Ct + q0];
      let xt = E * Pt + g * Xt, ht = Ie + Ce * xt - p;
      if (ht > aa || ht < -aa || (ht = Ye + ft * xt - m, ht > aa || ht < -aa) || (ht = Kt + Lt * xt - v, ht > aa || ht < -aa) || (xt = _ * Pt + k * Xt, ht = Ie + Ce * xt - C, ht > aa || ht < -aa) || (ht = Ye + ft * xt - b, ht > aa || ht < -aa) || (ht = Kt + Lt * xt - M, ht > aa || ht < -aa) || (xt = P * Pt + j * Xt, ht = Ie + Ce * xt - N, ht > aa || ht < -aa) || (ht = Ye + ft * xt - F, ht > aa || ht < -aa) || (ht = Kt + Lt * xt - W, ht > aa || ht < -aa)) continue;
      const Ae = Rt * Xl, dt = H[it + Ds], Mt = t.bid;
      let Zt = -1, nn = -1, yn = -1;
      for (let Bn = 0; Bn < dt; Bn++) {
        const Pr = Bn + 1 === dt ? 0 : Bn + 1, br = Mt[Ae + Bn], vr = Mt[Ae + Pr];
        br === A && vr === x ? Zt = Bn : br === V && vr === A ? nn = Bn : br === x && vr === V && (yn = Bn);
      }
      const Hn = (Zt !== -1 ? 1 : 0) + (nn !== -1 ? 1 : 0) + (yn !== -1 ? 1 : 0);
      if (Hn !== 0) {
        if (Hn === 1) {
          if (dt >= Xl) continue;
          Zt !== -1 ? (X = Zt, de = P, le = j, ie = V, ue = 0) : nn !== -1 ? (X = nn, de = E, le = g, ie = x, ue = 1) : (X = yn, de = _, le = k, ie = A, ue = 2), G = Rt;
        } else if (Hn === 2) {
          const Bn = Zt !== -1 ? Zt : nn, Pr = yn !== -1 ? yn : nn !== -1 ? nn : Zt, br = (Bn + 1) % dt === Pr ? Bn : (Pr + 1) % dt === Bn ? Pr : -1;
          if (br === -1) continue;
          X = br, ae = (br + 1) % dt, he = Zt === -1 ? 0 : nn === -1 ? 1 : 2, G = Rt;
        }
      }
    }
  }
  const z = t.aabb;
  if (t.live > 0)
    for (let Me = 0; Me < ml; Me++) {
      if (Me === G || H[Me * gl + Ls] === 0) continue;
      const Qe = Me << 2;
      z[Qe] > $ + R0 || z[Qe + 2] < Q - R0 || z[Qe + 1] > re + R0 || z[Qe + 3] < ne - R0 || $2(t, Me, a, u, f);
    }
  if (G !== -1) {
    const Me = G * Xl, Qe = G * gl, Et = H[Qe + Ds], nt = t.bx, Rt = t.by, it = t.bid, Ct = t.bexp;
    if (ae === -1) {
      const Xt = it[Me + X], Ce = it[Me + (X + 1) % Et];
      j0(t, Xt, Ce);
      for (let Ie = Et; Ie > X + 1; Ie--)
        nt[Me + Ie] = nt[Me + Ie - 1], Rt[Me + Ie] = Rt[Me + Ie - 1], it[Me + Ie] = it[Me + Ie - 1], Ct[Me + Ie] = Ct[Me + Ie - 1];
      nt[Me + X + 1] = de, Rt[Me + X + 1] = le, it[Me + X + 1] = ie, Ct[Me + X] = q >> (ue + 1) % 3 & 1, Ct[Me + X + 1] = q >> (ue + 2) % 3 & 1, H[Qe + Ds] = Et + 1, U0(t, Xt, ie, G), U0(t, ie, Ce, G);
    } else {
      const Xt = (X + 1) % Et, Ce = it[Me + X], Ie = it[Me + Xt], ft = it[Me + (Xt + 1) % Et];
      j0(t, Ce, Ie), j0(t, Ie, ft);
      for (let Ye = Xt; Ye < Et - 1; Ye++)
        nt[Me + Ye] = nt[Me + Ye + 1], Rt[Me + Ye] = Rt[Me + Ye + 1], it[Me + Ye] = it[Me + Ye + 1], Ct[Me + Ye] = Ct[Me + Ye + 1];
      Ct[Me + (X < Xt ? X : X - 1)] = q >> he & 1, H[Qe + Ds] = Et - 1, U0(t, Ce, ft, G);
    }
    H[Qe + Th] = oe;
    const Pt = G << 2;
    Q < z[Pt] && (z[Pt] = Q), ne < z[Pt + 1] && (z[Pt + 1] = ne), $ > z[Pt + 2] && (z[Pt + 2] = $), re > z[Pt + 3] && (z[Pt + 3] = re);
    return;
  }
  let Z = -1;
  for (let Me = 0; Me < ml; Me++)
    if (H[Me * gl + Ls] === 0) {
      Z = Me;
      break;
    }
  if (Z === -1) {
    let Me = 2147483647;
    for (let Qe = 0; Qe < ml; Qe++) {
      const Et = H[Qe * gl + Th];
      Et < Me && (Me = Et, Z = Qe);
    }
    $2(t, Z, a, u, f);
  }
  const we = _ - E, be = k - g, Fe = P - E, _e = j - g, Pe = we * _e - Fe * be, Be = (p + C + N) * 0.33333334, De = (m + b + F) * 0.33333334, Ve = (v + M + W) * 0.33333334;
  let Xe = 1, Oe = 0, Ke = 0, Te = 0, Ge = 0;
  if (Pe > rC || Pe < -rC) {
    const Me = 1 / Pe, Qe = C - p, Et = N - p, nt = b - m, Rt = F - m, it = M - v, Ct = W - v, Pt = (Qe * _e - Et * be) * Me, Xt = (we * Et - Fe * Qe) * Me, Ce = (nt * _e - Rt * be) * Me, Ie = (we * Rt - Fe * nt) * Me, ft = (it * _e - Ct * be) * Me, Ye = (we * Ct - Fe * it) * Me, Lt = Pt * Pt + Xt * Xt, Kt = Ce * Ce + Ie * Ie, xt = ft * ft + Ye * Ye;
    let ht, Ae, dt;
    if (Lt >= Kt && Lt >= xt ? (ht = Pt, Ae = Xt, dt = Lt) : Kt >= xt ? (ht = Ce, Ae = Ie, dt = Kt) : (ht = ft, Ae = Ye, dt = xt), dt > mN) {
      const Mt = 1 / Math.sqrt(dt);
      Xe = ht * Mt, Oe = Ae * Mt, Ke = Pt * Xe + Xt * Oe, Te = Ce * Xe + Ie * Oe, Ge = ft * Xe + Ye * Oe;
    }
  }
  const et = ((E + _ + P) * Xe + (g + k + j) * Oe) * 0.33333334, ze = Z * H0;
  t.field[ze + z2] = Xe, t.field[ze + U2] = Oe, t.field[ze + j2] = Ke, t.field[ze + V0] = Be - Ke * et, t.field[ze + F2] = Te, t.field[ze + I0] = De - Te * et, t.field[ze + P2] = Ge, t.field[ze + q0] = Ve - Ge * et;
  const ut = Z * Xl;
  t.bx[ut] = E, t.by[ut] = g, t.bid[ut] = x, t.bx[ut + 1] = _, t.by[ut + 1] = k, t.bid[ut + 1] = A, t.bx[ut + 2] = P, t.by[ut + 2] = j, t.bid[ut + 2] = V, t.bexp[ut] = q & 1, t.bexp[ut + 1] = q >> 1 & 1, t.bexp[ut + 2] = q >> 2 & 1;
  const Ut = Z * gl;
  H[Ut + Ls] = 1, H[Ut + Ds] = 3, H[Ut + Th] = oe, t.live++;
  const bt = Z << 2;
  z[bt] = Q, z[bt + 1] = ne, z[bt + 2] = $, z[bt + 3] = re, SN(t, Z);
}
const ch = yN();
function Gd(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F, W, P, j, V, q, H, oe, Q, $, ne, re, G) {
  const X = F >>> 16 & 255, ae = F >>> 8 & 255, de = F & 255;
  let le = X, ie = ae, ue = de, he = X, z = ae, Z = de, we = X, be = ae, Fe = de;
  const _e = x[b], Pe = x[b + 1], Be = x[b + 2], De = x[M], Ve = x[M + 1], Xe = x[M + 2], Oe = x[_], Ke = x[_ + 1], Te = x[_ + 2], Ge = W[0];
  for (let et = 1; et <= Ge; et++) {
    const ze = P[W[et]];
    if (ze.light.type !== 0) continue;
    const ut = ze.light.color, Ut = ut >>> 16 & 255, bt = ut >>> 8 & 255, Me = ut & 255, Qe = -ze.transform.worldMatrix[8], Et = -ze.transform.worldMatrix[9], nt = -ze.transform.worldMatrix[10], Rt = _e * Qe + Pe * Et + Be * nt, it = De * Qe + Ve * Et + Xe * nt, Ct = Oe * Qe + Ke * Et + Te * nt;
    Rt > 0 && (le += Ut * Rt, ie += bt * Rt, ue += Me * Rt), it > 0 && (he += Ut * it, z += bt * it, Z += Me * it), Ct > 0 && (we += Ut * Ct, be += bt * Ct, Fe += Me * Ct);
  }
  le > 255 && (le = 255), ie > 255 && (ie = 255), ue > 255 && (ue = 255), he > 255 && (he = 255), z > 255 && (z = 255), Z > 255 && (Z = 255), we > 255 && (we = 255), be > 255 && (be = 255), Fe > 255 && (Fe = 255), ch.frameId !== ne && (gN(ch), ch.frameId = ne), wN(
    ch,
    t,
    Q,
    $,
    le,
    ie,
    ue,
    a,
    u,
    b,
    he,
    z,
    Z,
    f,
    p,
    M,
    we,
    be,
    Fe,
    m,
    v,
    _,
    G
  ), re && xN(ch, t, Q, $);
}
const Zd = [], Jd = [];
let CN = 6;
const ep = 0, tp = 1, kh = 2, np = 4;
Zd[ep] = zs;
Jd[ep] = g3;
Zd[tp] = y3;
Jd[tp] = Gd;
Zd[kh] = zs;
Jd[kh] = c3;
Zd[np] = zs;
Jd[np] = Gd;
function bN(t, a) {
  const u = CN++;
  return Zd[u] = t, a && (Jd[u] = a), u;
}
const fh = p3();
let dh = new Float32Array(0), R2 = new Uint8Array(0);
const zo = new Int32Array(4), M2 = 0, F0 = 1, H2 = 2, qa = new Float32Array(4), iC = 0.05, V2 = 9, Y0 = 1, I2 = 4, q2 = 5, lC = 0;
function TN(t, a, u, f, p) {
  let m = 0;
  if (u === 2 || u === 1) {
    const v = a[t * 9], E = a[t * 9 + 1], g = a[t * 9 + 2], x = a[t * 9 + 3], C = a[t * 9 + 4], b = a[t * 9 + 5], M = a[t * 9 + 6], _ = a[t * 9 + 7], k = a[t * 9 + 8], A = (v + x + M) * 0.33333, N = (E + C + _) * 0.33333, F = (g + b + k) * 0.33333;
    if (u === 2) {
      const W = f * f, j = 1 / (p * p - W);
      m = (A * A + N * N + F * F - W) * j;
    } else
      m = (Math.sqrt(A * A + N * N + F * F) - f) / (p - f);
  } else if (u === 3) {
    const v = a[t * 9 + 2], E = a[t * 9 + 5], g = a[t * 9 + 8];
    m = ((v + E + g) * 0.33333 - f) / (p - f);
  }
  return m < 0 ? m = 0 : m > 1 && (m = 1), m;
}
function RN(t, a, u, f, p, m, v, E, g, x, C, b, M) {
  zo[M2] = 0, zo[F0] = 0, zo[H2] = 0, qa[0] = 1 / 0, qa[1] = 1 / 0, qa[2] = -1 / 0, qa[3] = -1 / 0;
  let _ = 0, k = 0;
  for (let P = 0; P < E; P++) {
    const j = t[P], V = a[j];
    if (V !== ep && V !== tp && V !== np) {
      v[j] = 1;
      continue;
    }
    const q = TN(
      j,
      u,
      C,
      b,
      M
    );
    if (m[j] = q, v[j] = 0, _++, q > 0 && (zo[F0] = 1), q >= 1) {
      k++;
      continue;
    }
    const H = p[j * 3], oe = p[j * 3 + 1], Q = p[j * 3 + 2], $ = f[H] * g + g, ne = f[H + 1] * x + x, re = f[oe] * g + g, G = f[oe + 1] * x + x, X = f[Q] * g + g, ae = f[Q + 1] * x + x;
    let de = $ < re ? $ : re;
    X < de && (de = X);
    let le = $ > re ? $ : re;
    X > le && (le = X);
    let ie = ne < G ? ne : G;
    ae < ie && (ie = ae);
    let ue = ne > G ? ne : G;
    ae > ue && (ue = ae), de < qa[0] && (qa[0] = de), ie < qa[1] && (qa[1] = ie), le > qa[2] && (qa[2] = le), ue > qa[3] && (qa[3] = ue);
  }
  if (zo[M2] = _, zo[F0] === 0 || _ === 0) return;
  if (k === _) {
    zo[H2] = 1;
    return;
  }
  if (k === 0) return;
  const A = qa[0], N = qa[1], F = qa[2], W = qa[3];
  for (let P = 0; P < E; P++) {
    const j = t[P];
    if (v[j] === 1 || m[j] < 1) continue;
    const V = p[j * 3], q = p[j * 3 + 1], H = p[j * 3 + 2], oe = f[V] * g + g, Q = f[V + 1] * x + x, $ = f[q] * g + g, ne = f[q + 1] * x + x, re = f[H] * g + g, G = f[H + 1] * x + x;
    let X = oe < $ ? oe : $;
    if (re < X && (X = re), X > F) {
      v[j] = 1, _--;
      continue;
    }
    let ae = oe > $ ? oe : $;
    if (re > ae && (ae = re), ae < A) {
      v[j] = 1, _--;
      continue;
    }
    let de = Q < ne ? Q : ne;
    if (G < de && (de = G), de > W) {
      v[j] = 1, _--;
      continue;
    }
    let le = Q > ne ? Q : ne;
    G > le && (le = G), le < N && (v[j] = 1, _--);
  }
  zo[M2] = _;
}
function MN(t, a, u, f, p, m, v, E, g, x, C) {
  if (g === 0) return 0;
  const b = C - x > 1e-4 ? 65535 / (C - x) : 0;
  E.fill(0, 0, 32);
  let M = 0;
  for (let k = 0; k < g; k++) {
    const A = t[k];
    if (v[A] === 1) continue;
    const N = (255 * (1 - m[A]) & 248) >> 3;
    E[N]++, M++;
  }
  let _ = 0;
  for (let k = 0; k < 32; k++) {
    const A = E[k];
    E[k] = _, _ += A;
  }
  for (let k = 0; k < g; k++) {
    const A = t[k];
    if (v[A] === 1) continue;
    const N = (255 * (1 - m[A]) & 248) >> 3;
    u[E[N]++] = A;
  }
  E.fill(0, 0, 256);
  for (let k = 0; k < M; k++)
    E[f[u[k]] & 255]++;
  _ = 0;
  for (let k = 0; k < 256; k++) {
    const A = E[k];
    E[k] = _, _ += A;
  }
  for (let k = 0; k < M; k++) {
    const A = u[k];
    a[E[f[A] & 255]++] = A;
  }
  E.fill(0, 0, 256);
  for (let k = 0; k < M; k++) {
    const A = a[k];
    let F = (p[A] - x) * b;
    F < 0 ? F = 0 : F > 65535 && (F = 65535), E[65535 - (F | 0) & 255]++;
  }
  _ = 0;
  for (let k = 0; k < 256; k++) {
    const A = E[k];
    E[k] = _, _ += A;
  }
  for (let k = 0; k < M; k++) {
    const A = a[k];
    let F = (p[A] - x) * b;
    F < 0 ? F = 0 : F > 65535 && (F = 65535), u[E[65535 - (F | 0) & 255]++] = A;
  }
  E.fill(0, 0, 256);
  for (let k = 0; k < M; k++) {
    const A = u[k];
    let F = (p[A] - x) * b;
    F < 0 ? F = 0 : F > 65535 && (F = 65535), E[65535 - (F | 0) >> 8 & 255]++;
  }
  _ = 0;
  for (let k = 0; k < 256; k++) {
    const A = E[k];
    E[k] = _, _ += A;
  }
  for (let k = 0; k < M; k++) {
    const A = u[k];
    let F = (p[A] - x) * b;
    F < 0 ? F = 0 : F > 65535 && (F = 65535), a[E[65535 - (F | 0) >> 8 & 255]++] = A;
  }
  return M;
}
function _N(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F) {
  const W = 255 * (1 - C) & 248, P = (W & 248) << 8 | (W & 252) << 3 | (W & 248) >> 3;
  return fh.frameId !== A && (t1(fh), fh.frameId = A), (M || P !== lC) && (P !== lC && (M = !0), h3(
    fh,
    t,
    _,
    V2,
    -1,
    k,
    Y0,
    iC,
    P,
    b,
    a,
    u,
    E,
    f,
    p,
    g,
    m,
    v,
    x,
    F
  )), N && v3(
    fh,
    t,
    _,
    V2,
    -1,
    k,
    Y0,
    iC
  ), M;
}
function kN(t, a, u) {
  const f = t.canvas, p = a.canvas, m = f.width, v = f.height, E = p.width, g = p.height;
  t.globalCompositeOperation = "multiply", t.drawImage(p, 0, 0, m, v);
  const x = u >>> 16, C = u >>> 8 & 255, b = u & 255, M = (x & 248) << 8 | (C & 252) << 3 | (b & 248) >> 3, _ = Kl[M];
  a.globalCompositeOperation = "difference", a.fillStyle = "#ffffff", a.fillRect(0, 0, E, g), a.globalCompositeOperation = "multiply", a.fillStyle = _, a.fillRect(0, 0, E, g), a.globalCompositeOperation = "source-over", t.globalCompositeOperation = "lighter", t.drawImage(p, 0, 0, m, v), t.globalCompositeOperation = "source-over";
}
function DN(t, a, u, f, p, m, v, E, g, x, C, b, M, _) {
  const k = t.canvas, A = k.width, N = k.height, F = A * 0.5, W = N * 0.5;
  t.fillStyle = "#000000", t.fillRect(0, 0, A, N), f3(
    p,
    0,
    x,
    E,
    g,
    v
  );
  let P = !1;
  for (let j = 0; j < x; j++) {
    const V = p[j], q = u[V * 3], H = u[V * 3 + 1], oe = u[V * 3 + 2], Q = f[V * 3], $ = f[V * 3 + 1], ne = f[V * 3 + 2], re = a[q] * F + F, G = a[q + 1] * W + W, X = a[H] * F + F, ae = a[H + 1] * W + W, de = a[oe] * F + F, le = a[oe + 1] * W + W, ie = j === x - 1;
    P = _N(
      t,
      re,
      G,
      X,
      ae,
      de,
      le,
      Q,
      $,
      ne,
      C[V],
      m[V],
      P,
      b,
      M,
      _,
      ie,
      v[V]
    );
  }
}
function ON(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F, W, P, j, V, q, H, oe, Q) {
  const $ = a.canvas;
  if (dh.length < N && (dh = new Float32Array(N), R2 = new Uint8Array(N)), RN(
    m,
    g,
    b,
    u,
    f,
    dh,
    R2,
    N,
    $.width * 0.5,
    $.height * 0.5,
    P,
    j,
    V
  ), zo[F0] === 0) return;
  if (zo[H2] === 1) {
    const X = q >>> 16, ae = q >>> 8 & 255, de = q & 255, le = (X & 248) << 8 | (ae & 252) << 3 | (de & 248) >> 3;
    t.fillStyle = Kl[le], t.fillRect(0, 0, t.canvas.width, t.canvas.height), H[_u] = -1;
    return;
  }
  const ne = performance.now(), re = MN(
    m,
    v,
    E,
    x,
    C,
    dh,
    R2,
    A,
    N,
    F,
    W
  );
  oe[I2] = performance.now() - ne;
  const G = performance.now();
  DN(
    a,
    u,
    f,
    p,
    v,
    x,
    M,
    _,
    k,
    re,
    dh,
    H,
    oe,
    Q
  ), oe[q2] = performance.now() - G, kN(t, a, q);
}
const AN = lr.computeNormalMatrix, _2 = ND, oC = X0, LN = rN, NN = aN;
function zN(t, a, u, f, p) {
  if (f === 1)
    return t;
  const m = t[0] + 1;
  u.fill(0);
  for (let E = 1; E < m; E++) {
    const g = t[E], x = a[g];
    x.meshRenderer && u[x.meshRenderer.layer]++;
  }
  let v = 0;
  for (let E = 0; E < f; E++) {
    const g = u[E];
    u[E] = v, p[v] = 0, v += 1 + g;
  }
  for (let E = 1; E < m; E++) {
    const g = t[E], x = a[g];
    if (x.meshRenderer) {
      const C = x.meshRenderer.layer, b = u[C], M = p[b];
      p[b + 1 + M] = g, p[b] = M + 1;
    }
  }
  return p;
}
function Yb() {
  this.layerBuffers = new Uint32Array(0), this.layerBuffersOffsets = new Uint32Array(W0.layersCount), this.drawCalls = 0, this.faces = 0, this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.colorBuffer = new Uint32Array(0), this.shaderTypeBuffer = new Uint8Array(0), this.shaderPassBuffer = new Uint8Array(0), this.faceNormalsBuffer = new Float32Array(0), this.vertexNormalsBuffer = new Float32Array(0), this.meshIndexBuffer = new Uint32Array(0), this.meshFaceIndexBuffer = new Uint32Array(0), this.weldIdBuffer = new Uint32Array(0), this.expandMaskBuffer = new Uint8Array(0), this.neighbourFaceBuffer = new Int32Array(0), this.faceRankBuffer = new Int32Array(0), this.triToFace = new Int32Array(0), this.triToFaceStamp = new Int32Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.lightsIndexBuffer = new Uint32Array(10), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0), this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0), this.tempIndexBuffer = new Uint32Array(0), this.fogSortScratchBuffer = new Uint32Array(0), this.counters = new Uint32Array(256), this.ctxStateBuffer = new Int32Array(10), this.statsBuffer = new Float32Array(6);
}
var Ii = Yb.prototype;
Ii.vec3Cache1 = new Float32Array([0, 0, 0]);
Ii.vec3Cache2 = new Float32Array([0, 0, 0]);
Ii.vec4Cache = new Float32Array([0, 0, 0]);
Ii.mat4Scratchpad1 = new Float32Array(16);
Ii.mat4Scratchpad2 = new Float32Array(16);
Ii.mat3Scratchpad1 = new Float32Array(9);
Ii.wireframe = !1;
Ii.debugNormals = !1;
Ii.debugAxis = !1;
Ii.fillEnabled = !0;
Ii.shadeEnabled = !0;
Ii.fogEnabled = !0;
Ii.render = function(t, a, u) {
  let f = performance.now();
  const p = performance.now();
  let m = t.scene.retrieve();
  const v = performance.now() - p;
  let E = W0.layersCount, g = a.width, x = a.height, C, b = this.vec3Cache1, M = this.vec3Cache2, _ = this.vec4Cache, k = this.depthBuffer, A = this.indexBuffer, N = this.vertexIndexBuffer, F = this.vertexBuffer, W = this.clipGeometryBuffer, P = this.colorBuffer, j = this.shaderTypeBuffer, V = this.shaderPassBuffer, q = this.faceNormalsBuffer, H = this.vertexNormalsBuffer, oe = this.meshIndexBuffer, Q = this.meshFaceIndexBuffer, $ = this.weldIdBuffer, ne = this.expandMaskBuffer, re = this.neighbourFaceBuffer, G = this.faceRankBuffer, X = this.visibleObjectsBuffer, ae = this.lightsIndexBuffer, de = this.layerBuffersOffsets, le = this.mat4Scratchpad1, ie = this.mat4Scratchpad2, ue = a.getWorldToScreen(), he = t.transform.getWorldToLocal(), z = t.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let Z = this.tempIndexBuffer, we = this.fogSortScratchBuffer, be = this.counters, Fe = this.ctxStateBuffer, _e = this.statsBuffer;
  const Pe = ++FN;
  let Be = 0, De = 0, Ve = 0, Xe = 0, Oe = 0, Ke = 0, Te = 0, Ge = 0, et = 0;
  const ze = t.camera, ut = ze.flush || this.wireframe || !this.fillEnabled || !this.shadeEnabled || !this.fogEnabled;
  if (X.length < m.length) {
    const Xt = X;
    this.visibleObjectsBuffer = X = new Uint32Array(
      m.length
    ), X.set(Xt);
  }
  if (ae.length < m.length) {
    const Xt = ae;
    this.lightsIndexBuffer = ae = new Uint32Array(
      m.length
    ), ae.set(Xt);
  }
  const Ut = performance.now();
  UN(
    m,
    z,
    X,
    ae
  ), jN(X, m, z);
  const bt = performance.now() - Ut, Me = X[0] + 1, Qe = X[0];
  E > 1 && this.layerBuffers.length < Qe + E && (this.layerBuffers = new Uint32Array((Qe + E) * 2));
  const Et = performance.now();
  let nt = zN(
    X,
    m,
    de,
    E,
    this.layerBuffers
  );
  const Rt = performance.now() - Et;
  let it = 0, Ct = 0, Pt = 0;
  for (C = 0; C < E; C++) {
    const Xt = nt[Pt];
    if (Xt === 0) {
      Pt += 1;
      continue;
    }
    const Ce = a.layers[C], Ie = a.shadeLayers[C], ft = a.fogLayers[C];
    let Ye = 0, Lt = 0;
    for (let Ae = 0; Ae < Xt; Ae++) {
      const dt = m[nt[Pt + 1 + Ae]].meshRenderer;
      Ye += dt.faces.length;
      const Mt = dt.vertices.length;
      Mt > Lt && (Lt = Mt);
    }
    Ye = Ye / 3 | 0;
    const Kt = Lt / 3 | 0;
    if (this.vMapping.length < Kt && (this.vMapping = new Int32Array(Kt), this.vTags = new Uint32Array(Kt)), b.length < Lt && (this.vec3Cache1 = b = new Float32Array(Lt), this.vec3Cache2 = M = new Float32Array(Lt), this.vec4Cache = _ = new Float32Array(Lt * 4 / 3)), k.length < Ye) {
      let Ae = new Float32Array(Ye);
      Ae.set(k), this.depthBuffer = k = Ae, Ae = new Uint32Array(Ye), Ae.set(A), this.indexBuffer = A = Ae, Ae = new Uint32Array(Ye), Ae.set(Z), this.tempIndexBuffer = Z = Ae, Ae = new Uint32Array(Ye), Ae.set(we), this.fogSortScratchBuffer = we = Ae, Ae = new Uint32Array(Ye * 3), Ae.set(P), this.colorBuffer = P = Ae, Ae = new Uint8Array(Ye), Ae.set(j), this.shaderTypeBuffer = j = Ae, Ae = new Uint8Array(Ye), Ae.set(V), this.shaderPassBuffer = V = Ae, Ae = new Float32Array(Ye * 9), Ae.set(W), this.clipGeometryBuffer = W = Ae, Ae = new Float32Array(Ye * 3), Ae.set(q), this.faceNormalsBuffer = q = Ae, Ae = new Float32Array(Ye * 9), Ae.set(H), this.vertexNormalsBuffer = H = Ae, Ae = new Uint32Array(Ye), Ae.set(oe), this.meshIndexBuffer = oe = Ae, Ae = new Uint32Array(Ye), Ae.set(Q), this.meshFaceIndexBuffer = Q = Ae;
      let dt = new Float32Array(Ye * 6);
      dt.set(F), this.vertexBuffer = F = dt;
      let Mt = new Uint32Array(Ye * 3);
      Mt.set(N), this.vertexIndexBuffer = N = Mt;
      let Zt = new Uint32Array(Ye * 3);
      Zt.set($), this.weldIdBuffer = $ = Zt;
      const nn = new Uint8Array(Ye);
      nn.set(ne), this.expandMaskBuffer = ne = nn;
      const yn = new Int32Array(Ye * 3);
      yn.set(re), this.neighbourFaceBuffer = re = yn;
      const Hn = new Int32Array(Ye).fill(-1);
      Hn.set(G), this.faceRankBuffer = G = Hn, this.triToFace = new Int32Array(Ye), this.triToFaceStamp = new Int32Array(Ye);
    }
    const xt = performance.now(), ht = PN(
      nt,
      Pt + 1,
      m,
      Xt,
      M,
      _,
      A,
      k,
      P,
      j,
      V,
      W,
      he,
      z,
      ie,
      le,
      this.mat3Scratchpad1,
      q,
      H,
      F,
      N,
      $,
      oe,
      Q,
      re,
      this.triToFace,
      this.triToFaceStamp,
      this.vMapping,
      this.vTags
    );
    if (Ct += performance.now() - xt, ze.depthSorting) {
      const Ae = performance.now();
      iN(
        A,
        Z,
        k,
        oe,
        V,
        be,
        ht,
        ze.nearClippingPane,
        ze.farClippingPane
      ), it += performance.now() - Ae;
    }
    if (Fe[_u] = -1, Fe[ku] = -1, Fe[V2] = -1, Fe[ef] = 0, _e[Ns] = 0, _e[Y0] = 0, _e[Wd] = 0, _e[I2] = 0, _e[q2] = 0, this.wireframe)
      $N(
        Ce,
        F,
        N,
        A,
        ht,
        0,
        g,
        x,
        Fe
      );
    else {
      if (this.fillEnabled) {
        const Ae = performance.now();
        HN(
          Ce,
          F,
          N,
          $,
          A,
          P,
          j,
          ht,
          0,
          ut,
          W,
          ze.bgColor,
          ze.fogType,
          ze.fogColor,
          ze.fogNearPane,
          ze.fogFarPane,
          ze.ambientLight,
          q,
          H,
          oe,
          Q,
          ne,
          re,
          G,
          nt,
          Pt + 1,
          ae,
          m,
          Fe,
          _e,
          Pe
        ), Ke += performance.now() - Ae;
      } else
        Fe[_u] !== Jc && (Ce.fillStyle = Kl[Jc], Fe[_u] = Jc), Ce.fillRect(0, 0, Ce.canvas.width, Ce.canvas.height);
      if (this.shadeEnabled) {
        const Ae = performance.now();
        VN(
          Ie,
          ut,
          F,
          N,
          $,
          A,
          P,
          j,
          ht,
          0,
          W,
          ze.fogType,
          ze.fogColor,
          ze.fogNearPane,
          ze.fogFarPane,
          ze.ambientLight,
          q,
          H,
          oe,
          Q,
          ne,
          re,
          G,
          nt,
          Pt + 1,
          ae,
          m,
          Fe,
          _e,
          Pe
        ), Te += performance.now() - Ae, Fe[ef] && (Ce.globalCompositeOperation = "multiply", Ce.drawImage(
          Ie.canvas,
          0,
          0,
          Ce.canvas.width,
          Ce.canvas.height
        ), Ce.globalCompositeOperation = "source-over");
      }
      this.fogEnabled && ze.fogType !== n3.NONE && ON(
        Ce,
        ft,
        F,
        N,
        $,
        A,
        Z,
        we,
        j,
        oe,
        k,
        W,
        ne,
        re,
        G,
        be,
        ht,
        ze.nearClippingPane,
        ze.farClippingPane,
        ze.fogType,
        ze.fogNearPane,
        ze.fogFarPane,
        ze.fogColor,
        Fe,
        _e,
        Pe
      ), Ve += _e[Ns], Xe += _e[Y0], Oe += _e[Wd], Ge += _e[I2], et += _e[q2];
    }
    this.debugNormals && NN(
      Ce,
      F,
      N,
      A,
      q,
      H,
      ht,
      0,
      g,
      x,
      he
    ), ut && a.context.clearRect(0, 0, g, x), a.context.drawImage(Ce.canvas, 0, 0), Be += ht, De += ht, Pt += 1 + Xt;
  }
  this.debugAxis && LN(m, a.context, ue, b), u.totalObjects = m.length, u.visibleObjects = Me, u.drawCalls = Be, u.faces = De, u.fillDrawCalls = Ve, u.fogDrawCalls = Xe, u.shadeDrawCalls = Oe, u.drawCallsTotal = Ve + Xe + Oe, u.sortTime = it, u.cullTime = bt, u.groupTime = Rt, u.processTime = Ct, u.fillRasterTime = Ke, u.shadeRasterTime = Te, u.fogSortTime = Ge, u.fogRasterTime = et, u.updateTime = t.scene && t.scene.world ? t.scene.world.lastTickTime : 0, u.retrieveTime = v, u.dt = performance.now() - f;
};
function UN(t, a, u, f) {
  let p = 0, m = 0;
  const v = a[0], E = a[1], g = a[2], x = a[3], C = a[4], b = a[5], M = a[6], _ = a[7], k = a[8], A = a[9], N = a[10], F = a[11], W = a[12], P = a[13], j = a[14], V = a[15];
  let q = x + v, H = _ + C, oe = F + k, Q = V + W, $ = 1 / Math.sqrt(q * q + H * H + oe * oe);
  q *= $, H *= $, oe *= $, Q *= $;
  let ne = x - v, re = _ - C, G = F - k, X = V - W;
  $ = 1 / Math.sqrt(ne * ne + re * re + G * G), ne *= $, re *= $, G *= $, X *= $;
  let ae = x + E, de = _ + b, le = F + A, ie = V + P;
  $ = 1 / Math.sqrt(ae * ae + de * de + le * le), ae *= $, de *= $, le *= $, ie *= $;
  let ue = x - E, he = _ - b, z = F - A, Z = V - P;
  $ = 1 / Math.sqrt(ue * ue + he * he + z * z), ue *= $, he *= $, z *= $, Z *= $;
  let we = x + g, be = _ + M, Fe = F + N, _e = V + j;
  $ = 1 / Math.sqrt(we * we + be * be + Fe * Fe), we *= $, be *= $, Fe *= $, _e *= $;
  let Pe = x - g, Be = _ - M, De = F - N, Ve = V - j;
  $ = 1 / Math.sqrt(Pe * Pe + Be * Be + De * De), Pe *= $, Be *= $, De *= $, Ve *= $;
  const Xe = t.length;
  for (let Oe = 0; Oe < Xe; Oe++) {
    const Ke = t[Oe];
    if (Ke.meshRenderer && Ke.meshRenderer.enabled) {
      const Te = Ke.transform.worldMatrix, Ge = Ke.meshRenderer.bounds, et = Ge[28], ze = Ge[29], ut = Ge[30], Ut = Te[0] * et + Te[4] * ze + Te[8] * ut + Te[12], bt = Te[1] * et + Te[5] * ze + Te[9] * ut + Te[13], Me = Te[2] * et + Te[6] * ze + Te[10] * ut + Te[14], Qe = Te[0] * Te[0] + Te[1] * Te[1] + Te[2] * Te[2], Et = Te[4] * Te[4] + Te[5] * Te[5] + Te[6] * Te[6], nt = Te[8] * Te[8] + Te[9] * Te[9] + Te[10] * Te[10], Rt = Ge[31] * Math.sqrt(Math.max(Qe, Et, nt));
      if (q * Ut + H * bt + oe * Me + Q < -Rt || ne * Ut + re * bt + G * Me + X < -Rt || ae * Ut + de * bt + le * Me + ie < -Rt || ue * Ut + he * bt + z * Me + Z < -Rt || we * Ut + be * bt + Fe * Me + _e < -Rt || Pe * Ut + Be * bt + De * Me + Ve < -Rt) continue;
      u[++p] = Oe;
    }
    if (Ke.light)
      if (Ke.light.type === 1) {
        const Te = Ke.transform.worldMatrix, Ge = Te[12], et = Te[13], ze = Te[14], ut = Te[0] * Te[0] + Te[1] * Te[1] + Te[2] * Te[2], Ut = Te[4] * Te[4] + Te[5] * Te[5] + Te[6] * Te[6], bt = Te[8] * Te[8] + Te[9] * Te[9] + Te[10] * Te[10], Me = Ke.light.range * Math.sqrt(Math.max(ut, Ut, bt));
        if (q * Ge + H * et + oe * ze + Q < -Me || ne * Ge + re * et + G * ze + X < -Me || ae * Ge + de * et + le * ze + ie < -Me || ue * Ge + he * et + z * ze + Z < -Me || we * Ge + be * et + Fe * ze + _e < -Me || Pe * Ge + Be * et + De * ze + Ve < -Me) continue;
        f[++m] = Oe;
      } else
        f[++m] = Oe;
  }
  u[0] = p, f[0] = m;
}
function jN(t, a, u) {
  const f = u, p = f[0], m = f[1], v = f[2], E = f[3], g = f[4], x = f[5], C = f[6], b = f[7], M = f[8], _ = f[9], k = f[10], A = f[11], N = f[12], F = f[13], W = f[14], P = f[15];
  let j = 0;
  const V = t[0] + 1;
  for (let q = 1; q < V; q++) {
    const H = t[q], oe = a[H], Q = oe.transform.worldMatrix, $ = oe.meshRenderer;
    if ($ && $.enabled && $.bounds) {
      const ne = $.bounds;
      let re = 63;
      for (let G = 0; G < 24; G += 3) {
        const X = ne[G], ae = ne[G + 1], de = ne[G + 2], le = Q[0] * X + Q[4] * ae + Q[8] * de + Q[12], ie = Q[1] * X + Q[5] * ae + Q[9] * de + Q[13], ue = Q[2] * X + Q[6] * ae + Q[10] * de + Q[14], he = p * le + g * ie + M * ue + N, z = m * le + x * ie + _ * ue + F, Z = v * le + C * ie + k * ue + W, we = E * le + b * ie + A * ue + P;
        let be = 0;
        he < -we && (be |= 1), he > we && (be |= 2), z < -we && (be |= 4), z > we && (be |= 8), Z < -we && (be |= 16), Z > we && (be |= 32), re &= be;
      }
      re === 0 && (t[++j] = H);
    } else {
      const ne = Q[12], re = Q[13], G = Q[14], X = p * ne + g * re + M * G + N, ae = m * ne + x * re + _ * G + F, de = v * ne + C * re + k * G + W, le = E * ne + b * re + A * G + P;
      X >= -le && X <= le && ae >= -le && ae <= le && de >= -le && de <= le && (t[++j] = H);
    }
  }
  t[0] = j;
}
let Kc = 0, FN = 0;
function PN(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F, W, P, j, V, q, H, oe, Q, $, ne, re) {
  let G = 0, X = 0, ae = 0;
  for (let de = 0; de < f; de++) {
    const le = t[a + de], ie = u[le], ue = ie.meshRenderer;
    if (ue.constructor !== lr) continue;
    ++Kc;
    const he = ie.transform.worldMatrix, z = ue.depthBias || 0;
    oC(A, _, he), oC(k, M, he);
    const Z = A[0], we = A[1], be = A[2], Fe = A[3], _e = A[4], Pe = A[5], Be = A[6], De = A[7], Ve = A[8], Xe = A[9], Oe = A[10], Ke = A[11], Te = A[12], Ge = A[13], et = A[14], ze = A[15], ut = ue.weldMap, Ut = X;
    X += (ue.vertices.length / 3 | 0) + 1, ue.adjTri === null && ue.updateAdjacency();
    const bt = ue.adjTri, Me = de + 1, Qe = G, Et = ue.faces, nt = ue.vertices, Rt = ue.faceNormals, it = ue.vertexNormals;
    AN(N, he);
    const Ct = N, Pt = Ct[0], Xt = Ct[1], Ce = Ct[2], Ie = Ct[3], ft = Ct[4], Ye = Ct[5], Lt = Ct[6], Kt = Ct[7], xt = Ct[8], ht = Et.length;
    for (let Ae = 0; Ae < ht; Ae += 3) {
      const dt = Et[Ae], Mt = Et[Ae + 1], Zt = Et[Ae + 2], nn = dt << 2, yn = Mt << 2, Hn = Zt << 2;
      if (re[dt] !== Kc) {
        const on = dt * 3, Nt = nt[on], an = nt[on + 1], sn = nt[on + 2];
        m[nn] = Z * Nt + _e * an + Ve * sn + Te, m[nn + 1] = we * Nt + Pe * an + Xe * sn + Ge, m[nn + 2] = be * Nt + Be * an + Oe * sn + et, m[nn + 3] = Fe * Nt + De * an + Ke * sn + ze, re[dt] = Kc, ne[dt] = -1;
      }
      if (re[Mt] !== Kc) {
        const on = Mt * 3, Nt = nt[on], an = nt[on + 1], sn = nt[on + 2];
        m[yn] = Z * Nt + _e * an + Ve * sn + Te, m[yn + 1] = we * Nt + Pe * an + Xe * sn + Ge, m[yn + 2] = be * Nt + Be * an + Oe * sn + et, m[yn + 3] = Fe * Nt + De * an + Ke * sn + ze, re[Mt] = Kc, ne[Mt] = -1;
      }
      if (re[Zt] !== Kc) {
        const on = Zt * 3, Nt = nt[on], an = nt[on + 1], sn = nt[on + 2];
        m[Hn] = Z * Nt + _e * an + Ve * sn + Te, m[Hn + 1] = we * Nt + Pe * an + Xe * sn + Ge, m[Hn + 2] = be * Nt + Be * an + Oe * sn + et, m[Hn + 3] = Fe * Nt + De * an + Ke * sn + ze, re[Zt] = Kc, ne[Zt] = -1;
      }
      const Bn = m[nn], Pr = m[nn + 1], br = m[nn + 2], vr = m[nn + 3], Mi = m[yn], Tr = m[yn + 1], Ar = m[yn + 2], Vn = m[yn + 3], Ra = m[Hn], oa = m[Hn + 1], Ya = m[Hn + 2], Lr = m[Hn + 3];
      if (Bn < -vr && Mi < -Vn && Ra < -Lr || Bn > vr && Mi > Vn && Ra > Lr || Pr < -vr && Tr < -Vn && oa < -Lr || Pr > vr && Tr > Vn && oa > Lr || br < -vr && Ar < -Vn && Ya < -Lr || br > vr && Ar > Vn && Ya > Lr) continue;
      const B = 1 / vr, ke = 1 / Vn, Ze = 1 / Lr, ot = Bn * B, It = Pr * B, Ht = Mi * ke, tn = Tr * ke, Jt = Ra * Ze, Gn = oa * Ze;
      if ((Ht - ot) * (Gn - It) - (tn - It) * (Jt - ot) > 0) continue;
      const gn = dt * 3, xn = Mt * 3, In = Zt * 3;
      v[G] = G, q[G] = de, H[G] = Ae;
      const Ma = Ae / 3 | 0;
      Q[Ma] = G, $[Ma] = Me;
      const ua = Rt[Ae], qt = Rt[Ae + 1], Bt = Rt[Ae + 2], sa = ua * Pt + qt * Ie + Bt * Lt, _i = ua * Xt + qt * ft + Bt * Kt, ki = ua * Ce + qt * Ye + Bt * xt, Di = Math.sqrt(sa * sa + _i * _i + ki * ki), qi = Di > 0 ? 1 / Di : 0, ai = G * 3;
      if (g[ai] = ue.colors[dt], g[ai + 1] = ue.colors[Mt], g[ai + 2] = ue.colors[Zt], x[G] = ue.shaderType, C[G] = 0, ne[dt] === -1) {
        const on = ae * 3;
        _2(
          p,
          gn,
          nt[gn],
          nt[gn + 1],
          nt[gn + 2],
          k
        ), P[on] = ot, P[on + 1] = -It, ne[dt] = on, ae++;
        const Nt = dt * 3, an = it[Nt] * Pt + it[Nt + 1] * Ie + it[Nt + 2] * Lt, sn = it[Nt] * Xt + it[Nt + 1] * ft + it[Nt + 2] * Kt, Zn = it[Nt] * Ce + it[Nt + 1] * Ye + it[Nt + 2] * xt, ca = Math.sqrt(an * an + sn * sn + Zn * Zn), Rr = ca > 0 ? 1 / ca : 0;
        W[on] = an * Rr, W[on + 1] = sn * Rr, W[on + 2] = Zn * Rr;
      }
      if (j[G * 3] = ne[dt], V[G * 3] = Ut + (ut ? ut[dt] : dt), ne[Mt] === -1) {
        const on = ae * 3;
        _2(
          p,
          xn,
          nt[xn],
          nt[xn + 1],
          nt[xn + 2],
          k
        ), P[on] = Ht, P[on + 1] = -tn, ne[Mt] = on, ae++;
        const Nt = Mt * 3, an = it[Nt] * Pt + it[Nt + 1] * Ie + it[Nt + 2] * Lt, sn = it[Nt] * Xt + it[Nt + 1] * ft + it[Nt + 2] * Kt, Zn = it[Nt] * Ce + it[Nt + 1] * Ye + it[Nt + 2] * xt, ca = Math.sqrt(an * an + sn * sn + Zn * Zn), Rr = ca > 0 ? 1 / ca : 0;
        W[on] = an * Rr, W[on + 1] = sn * Rr, W[on + 2] = Zn * Rr;
      }
      if (j[G * 3 + 1] = ne[Mt], V[G * 3 + 1] = Ut + (ut ? ut[Mt] : Mt), ne[Zt] === -1) {
        const on = ae * 3;
        _2(
          p,
          In,
          nt[In],
          nt[In + 1],
          nt[In + 2],
          k
        ), P[on] = Jt, P[on + 1] = -Gn, ne[Zt] = on, ae++;
        const Nt = Zt * 3, an = it[Nt] * Pt + it[Nt + 1] * Ie + it[Nt + 2] * Lt, sn = it[Nt] * Xt + it[Nt + 1] * ft + it[Nt + 2] * Kt, Zn = it[Nt] * Ce + it[Nt + 1] * Ye + it[Nt + 2] * xt, ca = Math.sqrt(an * an + sn * sn + Zn * Zn), Rr = ca > 0 ? 1 / ca : 0;
        W[on] = an * Rr, W[on + 1] = sn * Rr, W[on + 2] = Zn * Rr;
      }
      j[G * 3 + 2] = ne[Zt], V[G * 3 + 2] = Ut + (ut ? ut[Zt] : Zt);
      const Qn = G * 9;
      b[Qn] = p[gn], b[Qn + 1] = p[gn + 1];
      const Fo = b[Qn + 2] = p[gn + 2];
      b[Qn + 3] = p[xn], b[Qn + 4] = p[xn + 1];
      const $r = b[Qn + 5] = p[xn + 2];
      b[Qn + 6] = p[In], b[Qn + 7] = p[In + 1];
      const Au = b[Qn + 8] = p[In + 2];
      E[G] = (Fo + $r + Au) * 0.33333 + z;
      const Zl = G * 3;
      F[Zl] = sa * qi, F[Zl + 1] = _i * qi, F[Zl + 2] = ki * qi, G++;
    }
    for (let Ae = Qe; Ae < G; Ae++) {
      const dt = H[Ae], Mt = Ae * 3, Zt = bt[dt], nn = bt[dt + 1], yn = bt[dt + 2];
      oe[Mt] = Zt < 0 ? Yd : $[Zt] === Me ? Q[Zt] : w2, oe[Mt + 1] = nn < 0 ? Yd : $[nn] === Me ? Q[nn] : w2, oe[Mt + 2] = yn < 0 ? Yd : $[yn] === Me ? Q[yn] : w2;
    }
  }
  return G;
}
function $N(t, a, u, f, p, m, v, E, g) {
  const x = v * 0.5, C = E * 0.5, b = m + p;
  t.clearRect(0, 0, t.canvas.width, t.canvas.height), g[_u] = -1, t.beginPath(), g[_u] !== w0 && (t.fillStyle = Kl[w0], t.strokeStyle = Kl[w0], g[_u] = w0);
  for (let M = m; M < b; M++) {
    const _ = f[M], k = u[_ * 3], A = u[_ * 3 + 1], N = u[_ * 3 + 2], F = a[k] * x + x, W = a[k + 1] * C + C, P = a[A] * x + x, j = a[A + 1] * C + C, V = a[N] * x + x, q = a[N + 1] * C + C;
    t.moveTo(F, W), t.lineTo(P, j), t.lineTo(V, q), t.lineTo(F, W);
  }
  t.stroke();
}
function HN(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F, W, P, j, V, q, H, oe, Q, $, ne, re, G, X) {
  const ae = t.canvas, de = ae.width, le = ae.height, ie = de * 0.5, ue = le * 0.5, he = g + E;
  if (x)
    if (b !== -1) {
      const z = b >>> 16, Z = b >>> 8 & 255, we = b & 255, be = z & 248, Fe = Z & 252, _e = we & 248, Pe = be << 8 | Fe << 3 | _e >> 3;
      t.fillStyle = Kl[Pe], t.fillRect(0, 0, de, le);
    } else
      t.clearRect(0, 0, de, le);
  f3(
    p,
    g,
    he,
    q,
    H,
    V
  );
  for (let z = g; z < he; z++) {
    const Z = p[z], we = u[Z * 3], be = u[Z * 3 + 1], Fe = u[Z * 3 + 2], _e = f[Z * 3], Pe = f[Z * 3 + 1], Be = f[Z * 3 + 2], De = a[we] * ie + ie, Ve = a[we + 1] * ue + ue, Xe = a[be] * ie + ie, Oe = a[be + 1] * ue + ue, Ke = a[Fe] * ie + ie, Te = a[Fe + 1] * ue + ue, Ge = P[Z], et = ne[oe[Q + Ge]].meshRenderer, ze = v[Z], ut = z === he - 1 || v[p[z + 1]] !== ze;
    switch (ze) {
      case ep: {
        zs(
          t,
          De,
          Ve,
          Xe,
          Oe,
          Ke,
          Te,
          C,
          m,
          W,
          F,
          _e,
          Pe,
          Be,
          Z,
          et,
          j[Z],
          N,
          $,
          ne,
          M,
          _,
          k,
          A,
          Ge,
          re,
          G,
          X,
          ut,
          V[Z]
        );
        break;
      }
      case tp: {
        y3(
          t,
          De,
          Ve,
          Xe,
          Oe,
          Ke,
          Te,
          C,
          m,
          W,
          F,
          _e,
          Pe,
          Be,
          Z,
          et,
          j[Z],
          N,
          $,
          ne,
          M,
          _,
          k,
          A,
          Ge,
          re,
          G,
          X,
          ut,
          V[Z]
        );
        break;
      }
      case kh: {
        zs(
          t,
          De,
          Ve,
          Xe,
          Oe,
          Ke,
          Te,
          C,
          m,
          W,
          F,
          _e,
          Pe,
          Be,
          Z,
          et,
          j[Z],
          N,
          $,
          ne,
          M,
          _,
          k,
          A,
          Ge,
          re,
          G,
          X,
          ut,
          V[Z]
        );
        break;
      }
      case np: {
        zs(
          t,
          De,
          Ve,
          Xe,
          Oe,
          Ke,
          Te,
          C,
          m,
          W,
          F,
          _e,
          Pe,
          Be,
          Z,
          et,
          j[Z],
          N,
          $,
          ne,
          M,
          _,
          k,
          A,
          Ge,
          re,
          G,
          X,
          ut,
          V[Z]
        );
        break;
      }
      default: {
        const Ut = Zd[ze];
        Ut(
          t,
          De,
          Ve,
          Xe,
          Oe,
          Ke,
          Te,
          C,
          m,
          W,
          F,
          _e,
          Pe,
          Be,
          Z,
          et,
          j[Z],
          N,
          $,
          ne,
          M,
          _,
          k,
          A,
          Ge,
          re,
          G,
          X,
          ut
        );
        break;
      }
    }
  }
}
function VN(t, a, u, f, p, m, v, E, g, x, C, b, M, _, k, A, N, F, W, P, j, V, q, H, oe, Q, $, ne, re, G) {
  const X = t.canvas, ae = X.width, de = X.height;
  a && t.clearRect(0, 0, ae, de);
  const le = ae * 0.5, ie = de * 0.5, ue = x + g;
  f3(
    m,
    x,
    ue,
    V,
    q,
    j
  );
  for (let he = x; he < ue; he++) {
    const z = m[he], Z = f[z * 3], we = f[z * 3 + 1], be = f[z * 3 + 2], Fe = p[z * 3], _e = p[z * 3 + 1], Pe = p[z * 3 + 2], Be = u[Z] * le + le, De = u[Z + 1] * ie + ie, Ve = u[we] * le + le, Xe = u[we + 1] * ie + ie, Oe = u[be] * le + le, Ke = u[be + 1] * ie + ie, Te = W[z], Ge = $[H[oe + Te]].meshRenderer, et = E[z], ze = he === ue - 1 || E[m[he + 1]] !== et;
    switch (et) {
      case ep: {
        g3(
          t,
          Be,
          De,
          Ve,
          Xe,
          Oe,
          Ke,
          C,
          v,
          F,
          N,
          Fe,
          _e,
          Pe,
          z,
          Ge,
          P[z],
          A,
          Q,
          $,
          b,
          M,
          _,
          k,
          Te,
          ne,
          re,
          G,
          ze,
          j[z]
        );
        break;
      }
      case tp: {
        Gd(
          t,
          Be,
          De,
          Ve,
          Xe,
          Oe,
          Ke,
          C,
          v,
          F,
          N,
          Z,
          we,
          be,
          z,
          Ge,
          P[z],
          A,
          Q,
          $,
          b,
          M,
          _,
          k,
          Te,
          ne,
          re,
          G,
          ze,
          j[z]
        );
        break;
      }
      case kh: {
        c3(
          t,
          Be,
          De,
          Ve,
          Xe,
          Oe,
          Ke,
          C,
          v,
          F,
          N,
          Fe,
          _e,
          Pe,
          z,
          Ge,
          P[z],
          A,
          Q,
          $,
          b,
          M,
          _,
          k,
          Te,
          ne,
          re
        );
        break;
      }
      case np: {
        Gd(
          t,
          Be,
          De,
          Ve,
          Xe,
          Oe,
          Ke,
          C,
          v,
          F,
          N,
          Z,
          we,
          be,
          z,
          Ge,
          P[z],
          A,
          Q,
          $,
          b,
          M,
          _,
          k,
          Te,
          ne,
          re,
          G,
          ze,
          j[z]
        );
        break;
      }
      default: {
        const ut = Jd[et];
        ut(
          t,
          Be,
          De,
          Ve,
          Xe,
          Oe,
          Ke,
          C,
          v,
          F,
          N,
          Fe,
          _e,
          Pe,
          z,
          Ge,
          P[z],
          A,
          Q,
          $,
          b,
          M,
          _,
          k,
          Te,
          ne,
          re,
          G,
          ze
        );
        break;
      }
    }
  }
}
const uC = X0, M0 = !0;
function Wb(t, a) {
  this.canvas = a || document.createElement("canvas"), this.canvas.style.filter = "url(#stripBlue)", this.context = this.canvas.getContext("2d", { alpha: M0 }), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new Yb(), this.camera = t, this.scale = 1, this.layers = [], this.shadeLayers = [], this.fogLayers = [];
  for (var u = 0; u < W0.layersCount; u++) {
    var f = document.createElement("canvas");
    this.layers[u] = f.getContext("2d", { alpha: M0 }), this.layers[u].imageSmoothingEnabled = !1, this.layers[u].webkitImageSmoothingEnabled = !1;
    var p = document.createElement("canvas");
    this.shadeLayers[u] = p.getContext("2d", { alpha: M0 }), this.shadeLayers[u].imageSmoothingEnabled = !1, this.shadeLayers[u].webkitImageSmoothingEnabled = !1;
    var m = document.createElement("canvas");
    this.fogLayers[u] = m.getContext("2d", { alpha: M0 }), this.fogLayers[u].imageSmoothingEnabled = !1, this.fogLayers[u].webkitImageSmoothingEnabled = !1;
  }
  var v = this;
  window.addEventListener("resize", function() {
    v.setSize(v.canvas.offsetWidth, v.canvas.offsetHeight);
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
  let E = performance.now(), g = 0, x = performance.now();
  const C = this;
  this.startRenderLoop = function b() {
    requestAnimationFrame(() => {
      const M = performance.now(), _ = M - E;
      E = M, g++, M - x >= 500 && (C.lastRenderStats.fps = Math.round(
        g * 1e3 / (M - x)
      ), g = 0, x = M), C.lastRenderStats.frameTime = _, C.render(), requestAnimationFrame(b);
    });
  };
}
var la = Wb.prototype;
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
  const u = t * this.scale, f = a * this.scale;
  this.width = u, this.height = f, this.canvas.width = u, this.canvas.height = f, this.viewportMatrix[0] = u / 2, this.viewportMatrix[5] = -f / 2, this.viewportMatrix[12] = u / 2, this.viewportMatrix[13] = f / 2;
  for (var p = 0; p < this.layers.length; p++) {
    var m = this.layers[p];
    m.canvas.width = u, m.canvas.height = f;
    var v = this.shadeLayers[p];
    v.canvas.width = Math.ceil(u / 1), v.canvas.height = Math.ceil(f / 1);
    var E = this.fogLayers[p];
    E.canvas.width = Math.ceil(u / 1), E.canvas.height = Math.ceil(f / 1);
  }
  this.camera.setup(t, a);
};
la.getWorldToScreen = function() {
  return uC(
    this.worldToScreenMatrix,
    this.viewportMatrix,
    this.camera.projectionMatrix
  ), uC(
    this.worldToScreenMatrix,
    this.worldToScreenMatrix,
    this.camera.gameObject.transform.getWorldToLocal()
  ), this.worldToScreenMatrix;
};
Qd.Type = {
  DIRECTIONAL: 0,
  POINT: 1,
  SPOT: 2
};
function Us() {
  $n.call(this);
}
Us.prototype = Object.create($n.prototype);
Us.prototype.constructor = Us;
Us.prototype.color = 16777215;
Us.prototype.range = 10;
Us.prototype.type = Qd.Type.DIRECTIONAL;
Us.prototype.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.light = this;
};
function Qd(t) {
  ri.call(this, t || "light"), this.addComponent(this.light = new Us());
}
Qd.prototype = Object.create(ri.prototype);
Qd.prototype.constructor = Qd;
var _0 = { exports: {} }, ph = {}, k0 = { exports: {} }, dn = {};
var sC;
function IN() {
  if (sC) return dn;
  sC = 1;
  var t = /* @__PURE__ */ Symbol.for("react.element"), a = /* @__PURE__ */ Symbol.for("react.portal"), u = /* @__PURE__ */ Symbol.for("react.fragment"), f = /* @__PURE__ */ Symbol.for("react.strict_mode"), p = /* @__PURE__ */ Symbol.for("react.profiler"), m = /* @__PURE__ */ Symbol.for("react.provider"), v = /* @__PURE__ */ Symbol.for("react.context"), E = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), x = /* @__PURE__ */ Symbol.for("react.memo"), C = /* @__PURE__ */ Symbol.for("react.lazy"), b = Symbol.iterator;
  function M(z) {
    return z === null || typeof z != "object" ? null : (z = b && z[b] || z["@@iterator"], typeof z == "function" ? z : null);
  }
  var _ = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, k = Object.assign, A = {};
  function N(z, Z, we) {
    this.props = z, this.context = Z, this.refs = A, this.updater = we || _;
  }
  N.prototype.isReactComponent = {}, N.prototype.setState = function(z, Z) {
    if (typeof z != "object" && typeof z != "function" && z != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, z, Z, "setState");
  }, N.prototype.forceUpdate = function(z) {
    this.updater.enqueueForceUpdate(this, z, "forceUpdate");
  };
  function F() {
  }
  F.prototype = N.prototype;
  function W(z, Z, we) {
    this.props = z, this.context = Z, this.refs = A, this.updater = we || _;
  }
  var P = W.prototype = new F();
  P.constructor = W, k(P, N.prototype), P.isPureReactComponent = !0;
  var j = Array.isArray, V = Object.prototype.hasOwnProperty, q = { current: null }, H = { key: !0, ref: !0, __self: !0, __source: !0 };
  function oe(z, Z, we) {
    var be, Fe = {}, _e = null, Pe = null;
    if (Z != null) for (be in Z.ref !== void 0 && (Pe = Z.ref), Z.key !== void 0 && (_e = "" + Z.key), Z) V.call(Z, be) && !H.hasOwnProperty(be) && (Fe[be] = Z[be]);
    var Be = arguments.length - 2;
    if (Be === 1) Fe.children = we;
    else if (1 < Be) {
      for (var De = Array(Be), Ve = 0; Ve < Be; Ve++) De[Ve] = arguments[Ve + 2];
      Fe.children = De;
    }
    if (z && z.defaultProps) for (be in Be = z.defaultProps, Be) Fe[be] === void 0 && (Fe[be] = Be[be]);
    return { $$typeof: t, type: z, key: _e, ref: Pe, props: Fe, _owner: q.current };
  }
  function Q(z, Z) {
    return { $$typeof: t, type: z.type, key: Z, ref: z.ref, props: z.props, _owner: z._owner };
  }
  function $(z) {
    return typeof z == "object" && z !== null && z.$$typeof === t;
  }
  function ne(z) {
    var Z = { "=": "=0", ":": "=2" };
    return "$" + z.replace(/[=:]/g, function(we) {
      return Z[we];
    });
  }
  var re = /\/+/g;
  function G(z, Z) {
    return typeof z == "object" && z !== null && z.key != null ? ne("" + z.key) : Z.toString(36);
  }
  function X(z, Z, we, be, Fe) {
    var _e = typeof z;
    (_e === "undefined" || _e === "boolean") && (z = null);
    var Pe = !1;
    if (z === null) Pe = !0;
    else switch (_e) {
      case "string":
      case "number":
        Pe = !0;
        break;
      case "object":
        switch (z.$$typeof) {
          case t:
          case a:
            Pe = !0;
        }
    }
    if (Pe) return Pe = z, Fe = Fe(Pe), z = be === "" ? "." + G(Pe, 0) : be, j(Fe) ? (we = "", z != null && (we = z.replace(re, "$&/") + "/"), X(Fe, Z, we, "", function(Ve) {
      return Ve;
    })) : Fe != null && ($(Fe) && (Fe = Q(Fe, we + (!Fe.key || Pe && Pe.key === Fe.key ? "" : ("" + Fe.key).replace(re, "$&/") + "/") + z)), Z.push(Fe)), 1;
    if (Pe = 0, be = be === "" ? "." : be + ":", j(z)) for (var Be = 0; Be < z.length; Be++) {
      _e = z[Be];
      var De = be + G(_e, Be);
      Pe += X(_e, Z, we, De, Fe);
    }
    else if (De = M(z), typeof De == "function") for (z = De.call(z), Be = 0; !(_e = z.next()).done; ) _e = _e.value, De = be + G(_e, Be++), Pe += X(_e, Z, we, De, Fe);
    else if (_e === "object") throw Z = String(z), Error("Objects are not valid as a React child (found: " + (Z === "[object Object]" ? "object with keys {" + Object.keys(z).join(", ") + "}" : Z) + "). If you meant to render a collection of children, use an array instead.");
    return Pe;
  }
  function ae(z, Z, we) {
    if (z == null) return z;
    var be = [], Fe = 0;
    return X(z, be, "", "", function(_e) {
      return Z.call(we, _e, Fe++);
    }), be;
  }
  function de(z) {
    if (z._status === -1) {
      var Z = z._result;
      Z = Z(), Z.then(function(we) {
        (z._status === 0 || z._status === -1) && (z._status = 1, z._result = we);
      }, function(we) {
        (z._status === 0 || z._status === -1) && (z._status = 2, z._result = we);
      }), z._status === -1 && (z._status = 0, z._result = Z);
    }
    if (z._status === 1) return z._result.default;
    throw z._result;
  }
  var le = { current: null }, ie = { transition: null }, ue = { ReactCurrentDispatcher: le, ReactCurrentBatchConfig: ie, ReactCurrentOwner: q };
  function he() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return dn.Children = { map: ae, forEach: function(z, Z, we) {
    ae(z, function() {
      Z.apply(this, arguments);
    }, we);
  }, count: function(z) {
    var Z = 0;
    return ae(z, function() {
      Z++;
    }), Z;
  }, toArray: function(z) {
    return ae(z, function(Z) {
      return Z;
    }) || [];
  }, only: function(z) {
    if (!$(z)) throw Error("React.Children.only expected to receive a single React element child.");
    return z;
  } }, dn.Component = N, dn.Fragment = u, dn.Profiler = p, dn.PureComponent = W, dn.StrictMode = f, dn.Suspense = g, dn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ue, dn.act = he, dn.cloneElement = function(z, Z, we) {
    if (z == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + z + ".");
    var be = k({}, z.props), Fe = z.key, _e = z.ref, Pe = z._owner;
    if (Z != null) {
      if (Z.ref !== void 0 && (_e = Z.ref, Pe = q.current), Z.key !== void 0 && (Fe = "" + Z.key), z.type && z.type.defaultProps) var Be = z.type.defaultProps;
      for (De in Z) V.call(Z, De) && !H.hasOwnProperty(De) && (be[De] = Z[De] === void 0 && Be !== void 0 ? Be[De] : Z[De]);
    }
    var De = arguments.length - 2;
    if (De === 1) be.children = we;
    else if (1 < De) {
      Be = Array(De);
      for (var Ve = 0; Ve < De; Ve++) Be[Ve] = arguments[Ve + 2];
      be.children = Be;
    }
    return { $$typeof: t, type: z.type, key: Fe, ref: _e, props: be, _owner: Pe };
  }, dn.createContext = function(z) {
    return z = { $$typeof: v, _currentValue: z, _currentValue2: z, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, z.Provider = { $$typeof: m, _context: z }, z.Consumer = z;
  }, dn.createElement = oe, dn.createFactory = function(z) {
    var Z = oe.bind(null, z);
    return Z.type = z, Z;
  }, dn.createRef = function() {
    return { current: null };
  }, dn.forwardRef = function(z) {
    return { $$typeof: E, render: z };
  }, dn.isValidElement = $, dn.lazy = function(z) {
    return { $$typeof: C, _payload: { _status: -1, _result: z }, _init: de };
  }, dn.memo = function(z, Z) {
    return { $$typeof: x, type: z, compare: Z === void 0 ? null : Z };
  }, dn.startTransition = function(z) {
    var Z = ie.transition;
    ie.transition = {};
    try {
      z();
    } finally {
      ie.transition = Z;
    }
  }, dn.unstable_act = he, dn.useCallback = function(z, Z) {
    return le.current.useCallback(z, Z);
  }, dn.useContext = function(z) {
    return le.current.useContext(z);
  }, dn.useDebugValue = function() {
  }, dn.useDeferredValue = function(z) {
    return le.current.useDeferredValue(z);
  }, dn.useEffect = function(z, Z) {
    return le.current.useEffect(z, Z);
  }, dn.useId = function() {
    return le.current.useId();
  }, dn.useImperativeHandle = function(z, Z, we) {
    return le.current.useImperativeHandle(z, Z, we);
  }, dn.useInsertionEffect = function(z, Z) {
    return le.current.useInsertionEffect(z, Z);
  }, dn.useLayoutEffect = function(z, Z) {
    return le.current.useLayoutEffect(z, Z);
  }, dn.useMemo = function(z, Z) {
    return le.current.useMemo(z, Z);
  }, dn.useReducer = function(z, Z, we) {
    return le.current.useReducer(z, Z, we);
  }, dn.useRef = function(z) {
    return le.current.useRef(z);
  }, dn.useState = function(z) {
    return le.current.useState(z);
  }, dn.useSyncExternalStore = function(z, Z, we) {
    return le.current.useSyncExternalStore(z, Z, we);
  }, dn.useTransition = function() {
    return le.current.useTransition();
  }, dn.version = "18.3.1", dn;
}
var gh = { exports: {} };
gh.exports;
var cC;
function qN() {
  return cC || (cC = 1, (function(t, a) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var u = "18.3.1", f = /* @__PURE__ */ Symbol.for("react.element"), p = /* @__PURE__ */ Symbol.for("react.portal"), m = /* @__PURE__ */ Symbol.for("react.fragment"), v = /* @__PURE__ */ Symbol.for("react.strict_mode"), E = /* @__PURE__ */ Symbol.for("react.profiler"), g = /* @__PURE__ */ Symbol.for("react.provider"), x = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), b = /* @__PURE__ */ Symbol.for("react.suspense"), M = /* @__PURE__ */ Symbol.for("react.suspense_list"), _ = /* @__PURE__ */ Symbol.for("react.memo"), k = /* @__PURE__ */ Symbol.for("react.lazy"), A = /* @__PURE__ */ Symbol.for("react.offscreen"), N = Symbol.iterator, F = "@@iterator";
      function W(D) {
        if (D === null || typeof D != "object")
          return null;
        var Y = N && D[N] || D[F];
        return typeof Y == "function" ? Y : null;
      }
      var P = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, j = {
        transition: null
      }, V = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, q = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, H = {}, oe = null;
      function Q(D) {
        oe = D;
      }
      H.setExtraStackFrame = function(D) {
        oe = D;
      }, H.getCurrentStack = null, H.getStackAddendum = function() {
        var D = "";
        oe && (D += oe);
        var Y = H.getCurrentStack;
        return Y && (D += Y() || ""), D;
      };
      var $ = !1, ne = !1, re = !1, G = !1, X = !1, ae = {
        ReactCurrentDispatcher: P,
        ReactCurrentBatchConfig: j,
        ReactCurrentOwner: q
      };
      ae.ReactDebugCurrentFrame = H, ae.ReactCurrentActQueue = V;
      function de(D) {
        {
          for (var Y = arguments.length, me = new Array(Y > 1 ? Y - 1 : 0), Se = 1; Se < Y; Se++)
            me[Se - 1] = arguments[Se];
          ie("warn", D, me);
        }
      }
      function le(D) {
        {
          for (var Y = arguments.length, me = new Array(Y > 1 ? Y - 1 : 0), Se = 1; Se < Y; Se++)
            me[Se - 1] = arguments[Se];
          ie("error", D, me);
        }
      }
      function ie(D, Y, me) {
        {
          var Se = ae.ReactDebugCurrentFrame, We = Se.getStackAddendum();
          We !== "" && (Y += "%s", me = me.concat([We]));
          var Ot = me.map(function(tt) {
            return String(tt);
          });
          Ot.unshift("Warning: " + Y), Function.prototype.apply.call(console[D], console, Ot);
        }
      }
      var ue = {};
      function he(D, Y) {
        {
          var me = D.constructor, Se = me && (me.displayName || me.name) || "ReactClass", We = Se + "." + Y;
          if (ue[We])
            return;
          le("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", Y, Se), ue[We] = !0;
        }
      }
      var z = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(D) {
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
        enqueueForceUpdate: function(D, Y, me) {
          he(D, "forceUpdate");
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
        enqueueReplaceState: function(D, Y, me, Se) {
          he(D, "replaceState");
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
        enqueueSetState: function(D, Y, me, Se) {
          he(D, "setState");
        }
      }, Z = Object.assign, we = {};
      Object.freeze(we);
      function be(D, Y, me) {
        this.props = D, this.context = Y, this.refs = we, this.updater = me || z;
      }
      be.prototype.isReactComponent = {}, be.prototype.setState = function(D, Y) {
        if (typeof D != "object" && typeof D != "function" && D != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, D, Y, "setState");
      }, be.prototype.forceUpdate = function(D) {
        this.updater.enqueueForceUpdate(this, D, "forceUpdate");
      };
      {
        var Fe = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, _e = function(D, Y) {
          Object.defineProperty(be.prototype, D, {
            get: function() {
              de("%s(...) is deprecated in plain JavaScript React classes. %s", Y[0], Y[1]);
            }
          });
        };
        for (var Pe in Fe)
          Fe.hasOwnProperty(Pe) && _e(Pe, Fe[Pe]);
      }
      function Be() {
      }
      Be.prototype = be.prototype;
      function De(D, Y, me) {
        this.props = D, this.context = Y, this.refs = we, this.updater = me || z;
      }
      var Ve = De.prototype = new Be();
      Ve.constructor = De, Z(Ve, be.prototype), Ve.isPureReactComponent = !0;
      function Xe() {
        var D = {
          current: null
        };
        return Object.seal(D), D;
      }
      var Oe = Array.isArray;
      function Ke(D) {
        return Oe(D);
      }
      function Te(D) {
        {
          var Y = typeof Symbol == "function" && Symbol.toStringTag, me = Y && D[Symbol.toStringTag] || D.constructor.name || "Object";
          return me;
        }
      }
      function Ge(D) {
        try {
          return et(D), !1;
        } catch {
          return !0;
        }
      }
      function et(D) {
        return "" + D;
      }
      function ze(D) {
        if (Ge(D))
          return le("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Te(D)), et(D);
      }
      function ut(D, Y, me) {
        var Se = D.displayName;
        if (Se)
          return Se;
        var We = Y.displayName || Y.name || "";
        return We !== "" ? me + "(" + We + ")" : me;
      }
      function Ut(D) {
        return D.displayName || "Context";
      }
      function bt(D) {
        if (D == null)
          return null;
        if (typeof D.tag == "number" && le("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof D == "function")
          return D.displayName || D.name || null;
        if (typeof D == "string")
          return D;
        switch (D) {
          case m:
            return "Fragment";
          case p:
            return "Portal";
          case E:
            return "Profiler";
          case v:
            return "StrictMode";
          case b:
            return "Suspense";
          case M:
            return "SuspenseList";
        }
        if (typeof D == "object")
          switch (D.$$typeof) {
            case x:
              var Y = D;
              return Ut(Y) + ".Consumer";
            case g:
              var me = D;
              return Ut(me._context) + ".Provider";
            case C:
              return ut(D, D.render, "ForwardRef");
            case _:
              var Se = D.displayName || null;
              return Se !== null ? Se : bt(D.type) || "Memo";
            case k: {
              var We = D, Ot = We._payload, tt = We._init;
              try {
                return bt(tt(Ot));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Me = Object.prototype.hasOwnProperty, Qe = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Et, nt, Rt;
      Rt = {};
      function it(D) {
        if (Me.call(D, "ref")) {
          var Y = Object.getOwnPropertyDescriptor(D, "ref").get;
          if (Y && Y.isReactWarning)
            return !1;
        }
        return D.ref !== void 0;
      }
      function Ct(D) {
        if (Me.call(D, "key")) {
          var Y = Object.getOwnPropertyDescriptor(D, "key").get;
          if (Y && Y.isReactWarning)
            return !1;
        }
        return D.key !== void 0;
      }
      function Pt(D, Y) {
        var me = function() {
          Et || (Et = !0, le("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Y));
        };
        me.isReactWarning = !0, Object.defineProperty(D, "key", {
          get: me,
          configurable: !0
        });
      }
      function Xt(D, Y) {
        var me = function() {
          nt || (nt = !0, le("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Y));
        };
        me.isReactWarning = !0, Object.defineProperty(D, "ref", {
          get: me,
          configurable: !0
        });
      }
      function Ce(D) {
        if (typeof D.ref == "string" && q.current && D.__self && q.current.stateNode !== D.__self) {
          var Y = bt(q.current.type);
          Rt[Y] || (le('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Y, D.ref), Rt[Y] = !0);
        }
      }
      var Ie = function(D, Y, me, Se, We, Ot, tt) {
        var jt = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: f,
          // Built-in properties that belong on the element
          type: D,
          key: Y,
          ref: me,
          props: tt,
          // Record the component responsible for creating this element.
          _owner: Ot
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
          value: Se
        }), Object.defineProperty(jt, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: We
        }), Object.freeze && (Object.freeze(jt.props), Object.freeze(jt)), jt;
      };
      function ft(D, Y, me) {
        var Se, We = {}, Ot = null, tt = null, jt = null, un = null;
        if (Y != null) {
          it(Y) && (tt = Y.ref, Ce(Y)), Ct(Y) && (ze(Y.key), Ot = "" + Y.key), jt = Y.__self === void 0 ? null : Y.__self, un = Y.__source === void 0 ? null : Y.__source;
          for (Se in Y)
            Me.call(Y, Se) && !Qe.hasOwnProperty(Se) && (We[Se] = Y[Se]);
        }
        var En = arguments.length - 2;
        if (En === 1)
          We.children = me;
        else if (En > 1) {
          for (var Fn = Array(En), An = 0; An < En; An++)
            Fn[An] = arguments[An + 2];
          Object.freeze && Object.freeze(Fn), We.children = Fn;
        }
        if (D && D.defaultProps) {
          var rn = D.defaultProps;
          for (Se in rn)
            We[Se] === void 0 && (We[Se] = rn[Se]);
        }
        if (Ot || tt) {
          var Ln = typeof D == "function" ? D.displayName || D.name || "Unknown" : D;
          Ot && Pt(We, Ln), tt && Xt(We, Ln);
        }
        return Ie(D, Ot, tt, jt, un, q.current, We);
      }
      function Ye(D, Y) {
        var me = Ie(D.type, Y, D.ref, D._self, D._source, D._owner, D.props);
        return me;
      }
      function Lt(D, Y, me) {
        if (D == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + D + ".");
        var Se, We = Z({}, D.props), Ot = D.key, tt = D.ref, jt = D._self, un = D._source, En = D._owner;
        if (Y != null) {
          it(Y) && (tt = Y.ref, En = q.current), Ct(Y) && (ze(Y.key), Ot = "" + Y.key);
          var Fn;
          D.type && D.type.defaultProps && (Fn = D.type.defaultProps);
          for (Se in Y)
            Me.call(Y, Se) && !Qe.hasOwnProperty(Se) && (Y[Se] === void 0 && Fn !== void 0 ? We[Se] = Fn[Se] : We[Se] = Y[Se]);
        }
        var An = arguments.length - 2;
        if (An === 1)
          We.children = me;
        else if (An > 1) {
          for (var rn = Array(An), Ln = 0; Ln < An; Ln++)
            rn[Ln] = arguments[Ln + 2];
          We.children = rn;
        }
        return Ie(D.type, Ot, tt, jt, un, En, We);
      }
      function Kt(D) {
        return typeof D == "object" && D !== null && D.$$typeof === f;
      }
      var xt = ".", ht = ":";
      function Ae(D) {
        var Y = /[=:]/g, me = {
          "=": "=0",
          ":": "=2"
        }, Se = D.replace(Y, function(We) {
          return me[We];
        });
        return "$" + Se;
      }
      var dt = !1, Mt = /\/+/g;
      function Zt(D) {
        return D.replace(Mt, "$&/");
      }
      function nn(D, Y) {
        return typeof D == "object" && D !== null && D.key != null ? (ze(D.key), Ae("" + D.key)) : Y.toString(36);
      }
      function yn(D, Y, me, Se, We) {
        var Ot = typeof D;
        (Ot === "undefined" || Ot === "boolean") && (D = null);
        var tt = !1;
        if (D === null)
          tt = !0;
        else
          switch (Ot) {
            case "string":
            case "number":
              tt = !0;
              break;
            case "object":
              switch (D.$$typeof) {
                case f:
                case p:
                  tt = !0;
              }
          }
        if (tt) {
          var jt = D, un = We(jt), En = Se === "" ? xt + nn(jt, 0) : Se;
          if (Ke(un)) {
            var Fn = "";
            En != null && (Fn = Zt(En) + "/"), yn(un, Y, Fn, "", function(lp) {
              return lp;
            });
          } else un != null && (Kt(un) && (un.key && (!jt || jt.key !== un.key) && ze(un.key), un = Ye(
            un,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            me + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (un.key && (!jt || jt.key !== un.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              Zt("" + un.key) + "/"
            ) : "") + En
          )), Y.push(un));
          return 1;
        }
        var An, rn, Ln = 0, Jn = Se === "" ? xt : Se + ht;
        if (Ke(D))
          for (var ro = 0; ro < D.length; ro++)
            An = D[ro], rn = Jn + nn(An, ro), Ln += yn(An, Y, me, rn, We);
        else {
          var $s = W(D);
          if (typeof $s == "function") {
            var wl = D;
            $s === wl.entries && (dt || de("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), dt = !0);
            for (var Hs = $s.call(wl), Vo, ip = 0; !(Vo = Hs.next()).done; )
              An = Vo.value, rn = Jn + nn(An, ip++), Ln += yn(An, Y, me, rn, We);
          } else if (Ot === "object") {
            var nf = String(D);
            throw new Error("Objects are not valid as a React child (found: " + (nf === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : nf) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Ln;
      }
      function Hn(D, Y, me) {
        if (D == null)
          return D;
        var Se = [], We = 0;
        return yn(D, Se, "", "", function(Ot) {
          return Y.call(me, Ot, We++);
        }), Se;
      }
      function Bn(D) {
        var Y = 0;
        return Hn(D, function() {
          Y++;
        }), Y;
      }
      function Pr(D, Y, me) {
        Hn(D, function() {
          Y.apply(this, arguments);
        }, me);
      }
      function br(D) {
        return Hn(D, function(Y) {
          return Y;
        }) || [];
      }
      function vr(D) {
        if (!Kt(D))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return D;
      }
      function Mi(D) {
        var Y = {
          $$typeof: x,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: D,
          _currentValue2: D,
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
        Y.Provider = {
          $$typeof: g,
          _context: Y
        };
        var me = !1, Se = !1, We = !1;
        {
          var Ot = {
            $$typeof: x,
            _context: Y
          };
          Object.defineProperties(Ot, {
            Provider: {
              get: function() {
                return Se || (Se = !0, le("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), Y.Provider;
              },
              set: function(tt) {
                Y.Provider = tt;
              }
            },
            _currentValue: {
              get: function() {
                return Y._currentValue;
              },
              set: function(tt) {
                Y._currentValue = tt;
              }
            },
            _currentValue2: {
              get: function() {
                return Y._currentValue2;
              },
              set: function(tt) {
                Y._currentValue2 = tt;
              }
            },
            _threadCount: {
              get: function() {
                return Y._threadCount;
              },
              set: function(tt) {
                Y._threadCount = tt;
              }
            },
            Consumer: {
              get: function() {
                return me || (me = !0, le("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), Y.Consumer;
              }
            },
            displayName: {
              get: function() {
                return Y.displayName;
              },
              set: function(tt) {
                We || (de("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", tt), We = !0);
              }
            }
          }), Y.Consumer = Ot;
        }
        return Y._currentRenderer = null, Y._currentRenderer2 = null, Y;
      }
      var Tr = -1, Ar = 0, Vn = 1, Ra = 2;
      function oa(D) {
        if (D._status === Tr) {
          var Y = D._result, me = Y();
          if (me.then(function(Ot) {
            if (D._status === Ar || D._status === Tr) {
              var tt = D;
              tt._status = Vn, tt._result = Ot;
            }
          }, function(Ot) {
            if (D._status === Ar || D._status === Tr) {
              var tt = D;
              tt._status = Ra, tt._result = Ot;
            }
          }), D._status === Tr) {
            var Se = D;
            Se._status = Ar, Se._result = me;
          }
        }
        if (D._status === Vn) {
          var We = D._result;
          return We === void 0 && le(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, We), "default" in We || le(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, We), We.default;
        } else
          throw D._result;
      }
      function Ya(D) {
        var Y = {
          // We use these fields to store the result.
          _status: Tr,
          _result: D
        }, me = {
          $$typeof: k,
          _payload: Y,
          _init: oa
        };
        {
          var Se, We;
          Object.defineProperties(me, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return Se;
              },
              set: function(Ot) {
                le("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Se = Ot, Object.defineProperty(me, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return We;
              },
              set: function(Ot) {
                le("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), We = Ot, Object.defineProperty(me, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return me;
      }
      function Lr(D) {
        D != null && D.$$typeof === _ ? le("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof D != "function" ? le("forwardRef requires a render function but was given %s.", D === null ? "null" : typeof D) : D.length !== 0 && D.length !== 2 && le("forwardRef render functions accept exactly two parameters: props and ref. %s", D.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), D != null && (D.defaultProps != null || D.propTypes != null) && le("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var Y = {
          $$typeof: C,
          render: D
        };
        {
          var me;
          Object.defineProperty(Y, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return me;
            },
            set: function(Se) {
              me = Se, !D.name && !D.displayName && (D.displayName = Se);
            }
          });
        }
        return Y;
      }
      var B;
      B = /* @__PURE__ */ Symbol.for("react.module.reference");
      function ke(D) {
        return !!(typeof D == "string" || typeof D == "function" || D === m || D === E || X || D === v || D === b || D === M || G || D === A || $ || ne || re || typeof D == "object" && D !== null && (D.$$typeof === k || D.$$typeof === _ || D.$$typeof === g || D.$$typeof === x || D.$$typeof === C || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        D.$$typeof === B || D.getModuleId !== void 0));
      }
      function Ze(D, Y) {
        ke(D) || le("memo: The first argument must be a component. Instead received: %s", D === null ? "null" : typeof D);
        var me = {
          $$typeof: _,
          type: D,
          compare: Y === void 0 ? null : Y
        };
        {
          var Se;
          Object.defineProperty(me, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return Se;
            },
            set: function(We) {
              Se = We, !D.name && !D.displayName && (D.displayName = We);
            }
          });
        }
        return me;
      }
      function ot() {
        var D = P.current;
        return D === null && le(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), D;
      }
      function It(D) {
        var Y = ot();
        if (D._context !== void 0) {
          var me = D._context;
          me.Consumer === D ? le("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : me.Provider === D && le("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return Y.useContext(D);
      }
      function Ht(D) {
        var Y = ot();
        return Y.useState(D);
      }
      function tn(D, Y, me) {
        var Se = ot();
        return Se.useReducer(D, Y, me);
      }
      function Jt(D) {
        var Y = ot();
        return Y.useRef(D);
      }
      function Gn(D, Y) {
        var me = ot();
        return me.useEffect(D, Y);
      }
      function gn(D, Y) {
        var me = ot();
        return me.useInsertionEffect(D, Y);
      }
      function xn(D, Y) {
        var me = ot();
        return me.useLayoutEffect(D, Y);
      }
      function In(D, Y) {
        var me = ot();
        return me.useCallback(D, Y);
      }
      function Ma(D, Y) {
        var me = ot();
        return me.useMemo(D, Y);
      }
      function ua(D, Y, me) {
        var Se = ot();
        return Se.useImperativeHandle(D, Y, me);
      }
      function qt(D, Y) {
        {
          var me = ot();
          return me.useDebugValue(D, Y);
        }
      }
      function Bt() {
        var D = ot();
        return D.useTransition();
      }
      function sa(D) {
        var Y = ot();
        return Y.useDeferredValue(D);
      }
      function _i() {
        var D = ot();
        return D.useId();
      }
      function ki(D, Y, me) {
        var Se = ot();
        return Se.useSyncExternalStore(D, Y, me);
      }
      var Di = 0, qi, ai, Qn, Fo, $r, Au, Zl;
      function on() {
      }
      on.__reactDisabledLog = !0;
      function Nt() {
        {
          if (Di === 0) {
            qi = console.log, ai = console.info, Qn = console.warn, Fo = console.error, $r = console.group, Au = console.groupCollapsed, Zl = console.groupEnd;
            var D = {
              configurable: !0,
              enumerable: !0,
              value: on,
              writable: !0
            };
            Object.defineProperties(console, {
              info: D,
              log: D,
              warn: D,
              error: D,
              group: D,
              groupCollapsed: D,
              groupEnd: D
            });
          }
          Di++;
        }
      }
      function an() {
        {
          if (Di--, Di === 0) {
            var D = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: Z({}, D, {
                value: qi
              }),
              info: Z({}, D, {
                value: ai
              }),
              warn: Z({}, D, {
                value: Qn
              }),
              error: Z({}, D, {
                value: Fo
              }),
              group: Z({}, D, {
                value: $r
              }),
              groupCollapsed: Z({}, D, {
                value: Au
              }),
              groupEnd: Z({}, D, {
                value: Zl
              })
            });
          }
          Di < 0 && le("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var sn = ae.ReactCurrentDispatcher, Zn;
      function ca(D, Y, me) {
        {
          if (Zn === void 0)
            try {
              throw Error();
            } catch (We) {
              var Se = We.stack.trim().match(/\n( *(at )?)/);
              Zn = Se && Se[1] || "";
            }
          return `
` + Zn + D;
        }
      }
      var Rr = !1, Jl;
      {
        var Lu = typeof WeakMap == "function" ? WeakMap : Map;
        Jl = new Lu();
      }
      function Nu(D, Y) {
        if (!D || Rr)
          return "";
        {
          var me = Jl.get(D);
          if (me !== void 0)
            return me;
        }
        var Se;
        Rr = !0;
        var We = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Ot;
        Ot = sn.current, sn.current = null, Nt();
        try {
          if (Y) {
            var tt = function() {
              throw Error();
            };
            if (Object.defineProperty(tt.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(tt, []);
              } catch (Jn) {
                Se = Jn;
              }
              Reflect.construct(D, [], tt);
            } else {
              try {
                tt.call();
              } catch (Jn) {
                Se = Jn;
              }
              D.call(tt.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Jn) {
              Se = Jn;
            }
            D();
          }
        } catch (Jn) {
          if (Jn && Se && typeof Jn.stack == "string") {
            for (var jt = Jn.stack.split(`
`), un = Se.stack.split(`
`), En = jt.length - 1, Fn = un.length - 1; En >= 1 && Fn >= 0 && jt[En] !== un[Fn]; )
              Fn--;
            for (; En >= 1 && Fn >= 0; En--, Fn--)
              if (jt[En] !== un[Fn]) {
                if (En !== 1 || Fn !== 1)
                  do
                    if (En--, Fn--, Fn < 0 || jt[En] !== un[Fn]) {
                      var An = `
` + jt[En].replace(" at new ", " at ");
                      return D.displayName && An.includes("<anonymous>") && (An = An.replace("<anonymous>", D.displayName)), typeof D == "function" && Jl.set(D, An), An;
                    }
                  while (En >= 1 && Fn >= 0);
                break;
              }
          }
        } finally {
          Rr = !1, sn.current = Ot, an(), Error.prepareStackTrace = We;
        }
        var rn = D ? D.displayName || D.name : "", Ln = rn ? ca(rn) : "";
        return typeof D == "function" && Jl.set(D, Ln), Ln;
      }
      function El(D, Y, me) {
        return Nu(D, !1);
      }
      function rp(D) {
        var Y = D.prototype;
        return !!(Y && Y.isReactComponent);
      }
      function xl(D, Y, me) {
        if (D == null)
          return "";
        if (typeof D == "function")
          return Nu(D, rp(D));
        if (typeof D == "string")
          return ca(D);
        switch (D) {
          case b:
            return ca("Suspense");
          case M:
            return ca("SuspenseList");
        }
        if (typeof D == "object")
          switch (D.$$typeof) {
            case C:
              return El(D.render);
            case _:
              return xl(D.type, Y, me);
            case k: {
              var Se = D, We = Se._payload, Ot = Se._init;
              try {
                return xl(Ot(We), Y, me);
              } catch {
              }
            }
          }
        return "";
      }
      var Cn = {}, zu = ae.ReactDebugCurrentFrame;
      function Sn(D) {
        if (D) {
          var Y = D._owner, me = xl(D.type, D._source, Y ? Y.type : null);
          zu.setExtraStackFrame(me);
        } else
          zu.setExtraStackFrame(null);
      }
      function js(D, Y, me, Se, We) {
        {
          var Ot = Function.call.bind(Me);
          for (var tt in D)
            if (Ot(D, tt)) {
              var jt = void 0;
              try {
                if (typeof D[tt] != "function") {
                  var un = Error((Se || "React class") + ": " + me + " type `" + tt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof D[tt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw un.name = "Invariant Violation", un;
                }
                jt = D[tt](Y, tt, Se, me, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (En) {
                jt = En;
              }
              jt && !(jt instanceof Error) && (Sn(We), le("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Se || "React class", me, tt, typeof jt), Sn(null)), jt instanceof Error && !(jt.message in Cn) && (Cn[jt.message] = !0, Sn(We), le("Failed %s type: %s", me, jt.message), Sn(null));
            }
        }
      }
      function Yi(D) {
        if (D) {
          var Y = D._owner, me = xl(D.type, D._source, Y ? Y.type : null);
          Q(me);
        } else
          Q(null);
      }
      var Wt;
      Wt = !1;
      function Uu() {
        if (q.current) {
          var D = bt(q.current.type);
          if (D)
            return `

Check the render method of \`` + D + "`.";
        }
        return "";
      }
      function Hr(D) {
        if (D !== void 0) {
          var Y = D.fileName.replace(/^.*[\\\/]/, ""), me = D.lineNumber;
          return `

Check your code at ` + Y + ":" + me + ".";
        }
        return "";
      }
      function Wi(D) {
        return D != null ? Hr(D.__source) : "";
      }
      var fa = {};
      function Bi(D) {
        var Y = Uu();
        if (!Y) {
          var me = typeof D == "string" ? D : D.displayName || D.name;
          me && (Y = `

Check the top-level render call using <` + me + ">.");
        }
        return Y;
      }
      function qn(D, Y) {
        if (!(!D._store || D._store.validated || D.key != null)) {
          D._store.validated = !0;
          var me = Bi(Y);
          if (!fa[me]) {
            fa[me] = !0;
            var Se = "";
            D && D._owner && D._owner !== q.current && (Se = " It was passed a child from " + bt(D._owner.type) + "."), Yi(D), le('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', me, Se), Yi(null);
          }
        }
      }
      function On(D, Y) {
        if (typeof D == "object") {
          if (Ke(D))
            for (var me = 0; me < D.length; me++) {
              var Se = D[me];
              Kt(Se) && qn(Se, Y);
            }
          else if (Kt(D))
            D._store && (D._store.validated = !0);
          else if (D) {
            var We = W(D);
            if (typeof We == "function" && We !== D.entries)
              for (var Ot = We.call(D), tt; !(tt = Ot.next()).done; )
                Kt(tt.value) && qn(tt.value, Y);
          }
        }
      }
      function eo(D) {
        {
          var Y = D.type;
          if (Y == null || typeof Y == "string")
            return;
          var me;
          if (typeof Y == "function")
            me = Y.propTypes;
          else if (typeof Y == "object" && (Y.$$typeof === C || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          Y.$$typeof === _))
            me = Y.propTypes;
          else
            return;
          if (me) {
            var Se = bt(Y);
            js(me, D.props, "prop", Se, D);
          } else if (Y.PropTypes !== void 0 && !Wt) {
            Wt = !0;
            var We = bt(Y);
            le("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", We || "Unknown");
          }
          typeof Y.getDefaultProps == "function" && !Y.getDefaultProps.isReactClassApproved && le("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Mr(D) {
        {
          for (var Y = Object.keys(D.props), me = 0; me < Y.length; me++) {
            var Se = Y[me];
            if (Se !== "children" && Se !== "key") {
              Yi(D), le("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Se), Yi(null);
              break;
            }
          }
          D.ref !== null && (Yi(D), le("Invalid attribute `ref` supplied to `React.Fragment`."), Yi(null));
        }
      }
      function da(D, Y, me) {
        var Se = ke(D);
        if (!Se) {
          var We = "";
          (D === void 0 || typeof D == "object" && D !== null && Object.keys(D).length === 0) && (We += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Ot = Wi(Y);
          Ot ? We += Ot : We += Uu();
          var tt;
          D === null ? tt = "null" : Ke(D) ? tt = "array" : D !== void 0 && D.$$typeof === f ? (tt = "<" + (bt(D.type) || "Unknown") + " />", We = " Did you accidentally export a JSX literal instead of a component?") : tt = typeof D, le("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", tt, We);
        }
        var jt = ft.apply(this, arguments);
        if (jt == null)
          return jt;
        if (Se)
          for (var un = 2; un < arguments.length; un++)
            On(arguments[un], D);
        return D === m ? Mr(jt) : eo(jt), jt;
      }
      var ii = !1;
      function Po(D) {
        var Y = da.bind(null, D);
        return Y.type = D, ii || (ii = !0, de("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(Y, "type", {
          enumerable: !1,
          get: function() {
            return de("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: D
            }), D;
          }
        }), Y;
      }
      function Fs(D, Y, me) {
        for (var Se = Lt.apply(this, arguments), We = 2; We < arguments.length; We++)
          On(arguments[We], Se.type);
        return eo(Se), Se;
      }
      function Ps(D, Y) {
        var me = j.transition;
        j.transition = {};
        var Se = j.transition;
        j.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          D();
        } finally {
          if (j.transition = me, me === null && Se._updatedFibers) {
            var We = Se._updatedFibers.size;
            We > 10 && de("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), Se._updatedFibers.clear();
          }
        }
      }
      var to = !1, $o = null;
      function ap(D) {
        if ($o === null)
          try {
            var Y = ("require" + Math.random()).slice(0, 7), me = t && t[Y];
            $o = me.call(t, "timers").setImmediate;
          } catch {
            $o = function(We) {
              to === !1 && (to = !0, typeof MessageChannel > "u" && le("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Ot = new MessageChannel();
              Ot.port1.onmessage = We, Ot.port2.postMessage(void 0);
            };
          }
        return $o(D);
      }
      var li = 0, Oi = !1;
      function Gi(D) {
        {
          var Y = li;
          li++, V.current === null && (V.current = []);
          var me = V.isBatchingLegacy, Se;
          try {
            if (V.isBatchingLegacy = !0, Se = D(), !me && V.didScheduleLegacyUpdate) {
              var We = V.current;
              We !== null && (V.didScheduleLegacyUpdate = !1, no(We));
            }
          } catch (rn) {
            throw oi(Y), rn;
          } finally {
            V.isBatchingLegacy = me;
          }
          if (Se !== null && typeof Se == "object" && typeof Se.then == "function") {
            var Ot = Se, tt = !1, jt = {
              then: function(rn, Ln) {
                tt = !0, Ot.then(function(Jn) {
                  oi(Y), li === 0 ? ju(Jn, rn, Ln) : rn(Jn);
                }, function(Jn) {
                  oi(Y), Ln(Jn);
                });
              }
            };
            return !Oi && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              tt || (Oi = !0, le("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), jt;
          } else {
            var un = Se;
            if (oi(Y), li === 0) {
              var En = V.current;
              En !== null && (no(En), V.current = null);
              var Fn = {
                then: function(rn, Ln) {
                  V.current === null ? (V.current = [], ju(un, rn, Ln)) : rn(un);
                }
              };
              return Fn;
            } else {
              var An = {
                then: function(rn, Ln) {
                  rn(un);
                }
              };
              return An;
            }
          }
        }
      }
      function oi(D) {
        D !== li - 1 && le("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), li = D;
      }
      function ju(D, Y, me) {
        {
          var Se = V.current;
          if (Se !== null)
            try {
              no(Se), ap(function() {
                Se.length === 0 ? (V.current = null, Y(D)) : ju(D, Y, me);
              });
            } catch (We) {
              me(We);
            }
          else
            Y(D);
        }
      }
      var Fu = !1;
      function no(D) {
        if (!Fu) {
          Fu = !0;
          var Y = 0;
          try {
            for (; Y < D.length; Y++) {
              var me = D[Y];
              do
                me = me(!0);
              while (me !== null);
            }
            D.length = 0;
          } catch (Se) {
            throw D = D.slice(Y + 1), Se;
          } finally {
            Fu = !1;
          }
        }
      }
      var Ho = da, Pu = Fs, $u = Po, Ai = {
        map: Hn,
        forEach: Pr,
        count: Bn,
        toArray: br,
        only: vr
      };
      a.Children = Ai, a.Component = be, a.Fragment = m, a.Profiler = E, a.PureComponent = De, a.StrictMode = v, a.Suspense = b, a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ae, a.act = Gi, a.cloneElement = Pu, a.createContext = Mi, a.createElement = Ho, a.createFactory = $u, a.createRef = Xe, a.forwardRef = Lr, a.isValidElement = Kt, a.lazy = Ya, a.memo = Ze, a.startTransition = Ps, a.unstable_act = Gi, a.useCallback = In, a.useContext = It, a.useDebugValue = qt, a.useDeferredValue = sa, a.useEffect = Gn, a.useId = _i, a.useImperativeHandle = ua, a.useInsertionEffect = gn, a.useLayoutEffect = xn, a.useMemo = Ma, a.useReducer = tn, a.useRef = Jt, a.useState = Ht, a.useSyncExternalStore = ki, a.useTransition = Bt, a.version = u, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(gh, gh.exports)), gh.exports;
}
var fC;
function Dh() {
  return fC || (fC = 1, process.env.NODE_ENV === "production" ? k0.exports = IN() : k0.exports = qN()), k0.exports;
}
var dC;
function YN() {
  if (dC) return ph;
  dC = 1;
  var t = Dh(), a = /* @__PURE__ */ Symbol.for("react.element"), u = /* @__PURE__ */ Symbol.for("react.fragment"), f = Object.prototype.hasOwnProperty, p = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function v(E, g, x) {
    var C, b = {}, M = null, _ = null;
    x !== void 0 && (M = "" + x), g.key !== void 0 && (M = "" + g.key), g.ref !== void 0 && (_ = g.ref);
    for (C in g) f.call(g, C) && !m.hasOwnProperty(C) && (b[C] = g[C]);
    if (E && E.defaultProps) for (C in g = E.defaultProps, g) b[C] === void 0 && (b[C] = g[C]);
    return { $$typeof: a, type: E, key: M, ref: _, props: b, _owner: p.current };
  }
  return ph.Fragment = u, ph.jsx = v, ph.jsxs = v, ph;
}
var vh = {};
var pC;
function WN() {
  return pC || (pC = 1, process.env.NODE_ENV !== "production" && (function() {
    var t = Dh(), a = /* @__PURE__ */ Symbol.for("react.element"), u = /* @__PURE__ */ Symbol.for("react.portal"), f = /* @__PURE__ */ Symbol.for("react.fragment"), p = /* @__PURE__ */ Symbol.for("react.strict_mode"), m = /* @__PURE__ */ Symbol.for("react.profiler"), v = /* @__PURE__ */ Symbol.for("react.provider"), E = /* @__PURE__ */ Symbol.for("react.context"), g = /* @__PURE__ */ Symbol.for("react.forward_ref"), x = /* @__PURE__ */ Symbol.for("react.suspense"), C = /* @__PURE__ */ Symbol.for("react.suspense_list"), b = /* @__PURE__ */ Symbol.for("react.memo"), M = /* @__PURE__ */ Symbol.for("react.lazy"), _ = /* @__PURE__ */ Symbol.for("react.offscreen"), k = Symbol.iterator, A = "@@iterator";
    function N(B) {
      if (B === null || typeof B != "object")
        return null;
      var ke = k && B[k] || B[A];
      return typeof ke == "function" ? ke : null;
    }
    var F = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function W(B) {
      {
        for (var ke = arguments.length, Ze = new Array(ke > 1 ? ke - 1 : 0), ot = 1; ot < ke; ot++)
          Ze[ot - 1] = arguments[ot];
        P("error", B, Ze);
      }
    }
    function P(B, ke, Ze) {
      {
        var ot = F.ReactDebugCurrentFrame, It = ot.getStackAddendum();
        It !== "" && (ke += "%s", Ze = Ze.concat([It]));
        var Ht = Ze.map(function(tn) {
          return String(tn);
        });
        Ht.unshift("Warning: " + ke), Function.prototype.apply.call(console[B], console, Ht);
      }
    }
    var j = !1, V = !1, q = !1, H = !1, oe = !1, Q;
    Q = /* @__PURE__ */ Symbol.for("react.module.reference");
    function $(B) {
      return !!(typeof B == "string" || typeof B == "function" || B === f || B === m || oe || B === p || B === x || B === C || H || B === _ || j || V || q || typeof B == "object" && B !== null && (B.$$typeof === M || B.$$typeof === b || B.$$typeof === v || B.$$typeof === E || B.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      B.$$typeof === Q || B.getModuleId !== void 0));
    }
    function ne(B, ke, Ze) {
      var ot = B.displayName;
      if (ot)
        return ot;
      var It = ke.displayName || ke.name || "";
      return It !== "" ? Ze + "(" + It + ")" : Ze;
    }
    function re(B) {
      return B.displayName || "Context";
    }
    function G(B) {
      if (B == null)
        return null;
      if (typeof B.tag == "number" && W("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof B == "function")
        return B.displayName || B.name || null;
      if (typeof B == "string")
        return B;
      switch (B) {
        case f:
          return "Fragment";
        case u:
          return "Portal";
        case m:
          return "Profiler";
        case p:
          return "StrictMode";
        case x:
          return "Suspense";
        case C:
          return "SuspenseList";
      }
      if (typeof B == "object")
        switch (B.$$typeof) {
          case E:
            var ke = B;
            return re(ke) + ".Consumer";
          case v:
            var Ze = B;
            return re(Ze._context) + ".Provider";
          case g:
            return ne(B, B.render, "ForwardRef");
          case b:
            var ot = B.displayName || null;
            return ot !== null ? ot : G(B.type) || "Memo";
          case M: {
            var It = B, Ht = It._payload, tn = It._init;
            try {
              return G(tn(Ht));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var X = Object.assign, ae = 0, de, le, ie, ue, he, z, Z;
    function we() {
    }
    we.__reactDisabledLog = !0;
    function be() {
      {
        if (ae === 0) {
          de = console.log, le = console.info, ie = console.warn, ue = console.error, he = console.group, z = console.groupCollapsed, Z = console.groupEnd;
          var B = {
            configurable: !0,
            enumerable: !0,
            value: we,
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
        ae++;
      }
    }
    function Fe() {
      {
        if (ae--, ae === 0) {
          var B = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: X({}, B, {
              value: de
            }),
            info: X({}, B, {
              value: le
            }),
            warn: X({}, B, {
              value: ie
            }),
            error: X({}, B, {
              value: ue
            }),
            group: X({}, B, {
              value: he
            }),
            groupCollapsed: X({}, B, {
              value: z
            }),
            groupEnd: X({}, B, {
              value: Z
            })
          });
        }
        ae < 0 && W("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var _e = F.ReactCurrentDispatcher, Pe;
    function Be(B, ke, Ze) {
      {
        if (Pe === void 0)
          try {
            throw Error();
          } catch (It) {
            var ot = It.stack.trim().match(/\n( *(at )?)/);
            Pe = ot && ot[1] || "";
          }
        return `
` + Pe + B;
      }
    }
    var De = !1, Ve;
    {
      var Xe = typeof WeakMap == "function" ? WeakMap : Map;
      Ve = new Xe();
    }
    function Oe(B, ke) {
      if (!B || De)
        return "";
      {
        var Ze = Ve.get(B);
        if (Ze !== void 0)
          return Ze;
      }
      var ot;
      De = !0;
      var It = Error.prepareStackTrace;
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
            } catch (qt) {
              ot = qt;
            }
            Reflect.construct(B, [], tn);
          } else {
            try {
              tn.call();
            } catch (qt) {
              ot = qt;
            }
            B.call(tn.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (qt) {
            ot = qt;
          }
          B();
        }
      } catch (qt) {
        if (qt && ot && typeof qt.stack == "string") {
          for (var Jt = qt.stack.split(`
`), Gn = ot.stack.split(`
`), gn = Jt.length - 1, xn = Gn.length - 1; gn >= 1 && xn >= 0 && Jt[gn] !== Gn[xn]; )
            xn--;
          for (; gn >= 1 && xn >= 0; gn--, xn--)
            if (Jt[gn] !== Gn[xn]) {
              if (gn !== 1 || xn !== 1)
                do
                  if (gn--, xn--, xn < 0 || Jt[gn] !== Gn[xn]) {
                    var In = `
` + Jt[gn].replace(" at new ", " at ");
                    return B.displayName && In.includes("<anonymous>") && (In = In.replace("<anonymous>", B.displayName)), typeof B == "function" && Ve.set(B, In), In;
                  }
                while (gn >= 1 && xn >= 0);
              break;
            }
        }
      } finally {
        De = !1, _e.current = Ht, Fe(), Error.prepareStackTrace = It;
      }
      var Ma = B ? B.displayName || B.name : "", ua = Ma ? Be(Ma) : "";
      return typeof B == "function" && Ve.set(B, ua), ua;
    }
    function Ke(B, ke, Ze) {
      return Oe(B, !1);
    }
    function Te(B) {
      var ke = B.prototype;
      return !!(ke && ke.isReactComponent);
    }
    function Ge(B, ke, Ze) {
      if (B == null)
        return "";
      if (typeof B == "function")
        return Oe(B, Te(B));
      if (typeof B == "string")
        return Be(B);
      switch (B) {
        case x:
          return Be("Suspense");
        case C:
          return Be("SuspenseList");
      }
      if (typeof B == "object")
        switch (B.$$typeof) {
          case g:
            return Ke(B.render);
          case b:
            return Ge(B.type, ke, Ze);
          case M: {
            var ot = B, It = ot._payload, Ht = ot._init;
            try {
              return Ge(Ht(It), ke, Ze);
            } catch {
            }
          }
        }
      return "";
    }
    var et = Object.prototype.hasOwnProperty, ze = {}, ut = F.ReactDebugCurrentFrame;
    function Ut(B) {
      if (B) {
        var ke = B._owner, Ze = Ge(B.type, B._source, ke ? ke.type : null);
        ut.setExtraStackFrame(Ze);
      } else
        ut.setExtraStackFrame(null);
    }
    function bt(B, ke, Ze, ot, It) {
      {
        var Ht = Function.call.bind(et);
        for (var tn in B)
          if (Ht(B, tn)) {
            var Jt = void 0;
            try {
              if (typeof B[tn] != "function") {
                var Gn = Error((ot || "React class") + ": " + Ze + " type `" + tn + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof B[tn] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Gn.name = "Invariant Violation", Gn;
              }
              Jt = B[tn](ke, tn, ot, Ze, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (gn) {
              Jt = gn;
            }
            Jt && !(Jt instanceof Error) && (Ut(It), W("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ot || "React class", Ze, tn, typeof Jt), Ut(null)), Jt instanceof Error && !(Jt.message in ze) && (ze[Jt.message] = !0, Ut(It), W("Failed %s type: %s", Ze, Jt.message), Ut(null));
          }
      }
    }
    var Me = Array.isArray;
    function Qe(B) {
      return Me(B);
    }
    function Et(B) {
      {
        var ke = typeof Symbol == "function" && Symbol.toStringTag, Ze = ke && B[Symbol.toStringTag] || B.constructor.name || "Object";
        return Ze;
      }
    }
    function nt(B) {
      try {
        return Rt(B), !1;
      } catch {
        return !0;
      }
    }
    function Rt(B) {
      return "" + B;
    }
    function it(B) {
      if (nt(B))
        return W("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Et(B)), Rt(B);
    }
    var Ct = F.ReactCurrentOwner, Pt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Xt, Ce;
    function Ie(B) {
      if (et.call(B, "ref")) {
        var ke = Object.getOwnPropertyDescriptor(B, "ref").get;
        if (ke && ke.isReactWarning)
          return !1;
      }
      return B.ref !== void 0;
    }
    function ft(B) {
      if (et.call(B, "key")) {
        var ke = Object.getOwnPropertyDescriptor(B, "key").get;
        if (ke && ke.isReactWarning)
          return !1;
      }
      return B.key !== void 0;
    }
    function Ye(B, ke) {
      typeof B.ref == "string" && Ct.current;
    }
    function Lt(B, ke) {
      {
        var Ze = function() {
          Xt || (Xt = !0, W("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ke));
        };
        Ze.isReactWarning = !0, Object.defineProperty(B, "key", {
          get: Ze,
          configurable: !0
        });
      }
    }
    function Kt(B, ke) {
      {
        var Ze = function() {
          Ce || (Ce = !0, W("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ke));
        };
        Ze.isReactWarning = !0, Object.defineProperty(B, "ref", {
          get: Ze,
          configurable: !0
        });
      }
    }
    var xt = function(B, ke, Ze, ot, It, Ht, tn) {
      var Jt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: B,
        key: ke,
        ref: Ze,
        props: tn,
        // Record the component responsible for creating this element.
        _owner: Ht
      };
      return Jt._store = {}, Object.defineProperty(Jt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Jt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ot
      }), Object.defineProperty(Jt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: It
      }), Object.freeze && (Object.freeze(Jt.props), Object.freeze(Jt)), Jt;
    };
    function ht(B, ke, Ze, ot, It) {
      {
        var Ht, tn = {}, Jt = null, Gn = null;
        Ze !== void 0 && (it(Ze), Jt = "" + Ze), ft(ke) && (it(ke.key), Jt = "" + ke.key), Ie(ke) && (Gn = ke.ref, Ye(ke, It));
        for (Ht in ke)
          et.call(ke, Ht) && !Pt.hasOwnProperty(Ht) && (tn[Ht] = ke[Ht]);
        if (B && B.defaultProps) {
          var gn = B.defaultProps;
          for (Ht in gn)
            tn[Ht] === void 0 && (tn[Ht] = gn[Ht]);
        }
        if (Jt || Gn) {
          var xn = typeof B == "function" ? B.displayName || B.name || "Unknown" : B;
          Jt && Lt(tn, xn), Gn && Kt(tn, xn);
        }
        return xt(B, Jt, Gn, It, ot, Ct.current, tn);
      }
    }
    var Ae = F.ReactCurrentOwner, dt = F.ReactDebugCurrentFrame;
    function Mt(B) {
      if (B) {
        var ke = B._owner, Ze = Ge(B.type, B._source, ke ? ke.type : null);
        dt.setExtraStackFrame(Ze);
      } else
        dt.setExtraStackFrame(null);
    }
    var Zt;
    Zt = !1;
    function nn(B) {
      return typeof B == "object" && B !== null && B.$$typeof === a;
    }
    function yn() {
      {
        if (Ae.current) {
          var B = G(Ae.current.type);
          if (B)
            return `

Check the render method of \`` + B + "`.";
        }
        return "";
      }
    }
    function Hn(B) {
      return "";
    }
    var Bn = {};
    function Pr(B) {
      {
        var ke = yn();
        if (!ke) {
          var Ze = typeof B == "string" ? B : B.displayName || B.name;
          Ze && (ke = `

Check the top-level render call using <` + Ze + ">.");
        }
        return ke;
      }
    }
    function br(B, ke) {
      {
        if (!B._store || B._store.validated || B.key != null)
          return;
        B._store.validated = !0;
        var Ze = Pr(ke);
        if (Bn[Ze])
          return;
        Bn[Ze] = !0;
        var ot = "";
        B && B._owner && B._owner !== Ae.current && (ot = " It was passed a child from " + G(B._owner.type) + "."), Mt(B), W('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Ze, ot), Mt(null);
      }
    }
    function vr(B, ke) {
      {
        if (typeof B != "object")
          return;
        if (Qe(B))
          for (var Ze = 0; Ze < B.length; Ze++) {
            var ot = B[Ze];
            nn(ot) && br(ot, ke);
          }
        else if (nn(B))
          B._store && (B._store.validated = !0);
        else if (B) {
          var It = N(B);
          if (typeof It == "function" && It !== B.entries)
            for (var Ht = It.call(B), tn; !(tn = Ht.next()).done; )
              nn(tn.value) && br(tn.value, ke);
        }
      }
    }
    function Mi(B) {
      {
        var ke = B.type;
        if (ke == null || typeof ke == "string")
          return;
        var Ze;
        if (typeof ke == "function")
          Ze = ke.propTypes;
        else if (typeof ke == "object" && (ke.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        ke.$$typeof === b))
          Ze = ke.propTypes;
        else
          return;
        if (Ze) {
          var ot = G(ke);
          bt(Ze, B.props, "prop", ot, B);
        } else if (ke.PropTypes !== void 0 && !Zt) {
          Zt = !0;
          var It = G(ke);
          W("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", It || "Unknown");
        }
        typeof ke.getDefaultProps == "function" && !ke.getDefaultProps.isReactClassApproved && W("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Tr(B) {
      {
        for (var ke = Object.keys(B.props), Ze = 0; Ze < ke.length; Ze++) {
          var ot = ke[Ze];
          if (ot !== "children" && ot !== "key") {
            Mt(B), W("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ot), Mt(null);
            break;
          }
        }
        B.ref !== null && (Mt(B), W("Invalid attribute `ref` supplied to `React.Fragment`."), Mt(null));
      }
    }
    var Ar = {};
    function Vn(B, ke, Ze, ot, It, Ht) {
      {
        var tn = $(B);
        if (!tn) {
          var Jt = "";
          (B === void 0 || typeof B == "object" && B !== null && Object.keys(B).length === 0) && (Jt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Gn = Hn();
          Gn ? Jt += Gn : Jt += yn();
          var gn;
          B === null ? gn = "null" : Qe(B) ? gn = "array" : B !== void 0 && B.$$typeof === a ? (gn = "<" + (G(B.type) || "Unknown") + " />", Jt = " Did you accidentally export a JSX literal instead of a component?") : gn = typeof B, W("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", gn, Jt);
        }
        var xn = ht(B, ke, Ze, It, Ht);
        if (xn == null)
          return xn;
        if (tn) {
          var In = ke.children;
          if (In !== void 0)
            if (ot)
              if (Qe(In)) {
                for (var Ma = 0; Ma < In.length; Ma++)
                  vr(In[Ma], B);
                Object.freeze && Object.freeze(In);
              } else
                W("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              vr(In, B);
        }
        if (et.call(ke, "key")) {
          var ua = G(B), qt = Object.keys(ke).filter(function(_i) {
            return _i !== "key";
          }), Bt = qt.length > 0 ? "{key: someKey, " + qt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ar[ua + Bt]) {
            var sa = qt.length > 0 ? "{" + qt.join(": ..., ") + ": ...}" : "{}";
            W(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Bt, ua, sa, ua), Ar[ua + Bt] = !0;
          }
        }
        return B === f ? Tr(xn) : Mi(xn), xn;
      }
    }
    function Ra(B, ke, Ze) {
      return Vn(B, ke, Ze, !0);
    }
    function oa(B, ke, Ze) {
      return Vn(B, ke, Ze, !1);
    }
    var Ya = oa, Lr = Ra;
    vh.Fragment = f, vh.jsx = Ya, vh.jsxs = Lr;
  })()), vh;
}
var vC;
function BN() {
  return vC || (vC = 1, process.env.NODE_ENV === "production" ? _0.exports = YN() : _0.exports = WN()), _0.exports;
}
var qe = BN(), ia = Dh(), Vd = {}, D0 = { exports: {} }, Ci = {}, O0 = { exports: {} }, k2 = {};
var hC;
function GN() {
  return hC || (hC = 1, (function(t) {
    function a(ie, ue) {
      var he = ie.length;
      ie.push(ue);
      e: for (; 0 < he; ) {
        var z = he - 1 >>> 1, Z = ie[z];
        if (0 < p(Z, ue)) ie[z] = ue, ie[he] = Z, he = z;
        else break e;
      }
    }
    function u(ie) {
      return ie.length === 0 ? null : ie[0];
    }
    function f(ie) {
      if (ie.length === 0) return null;
      var ue = ie[0], he = ie.pop();
      if (he !== ue) {
        ie[0] = he;
        e: for (var z = 0, Z = ie.length, we = Z >>> 1; z < we; ) {
          var be = 2 * (z + 1) - 1, Fe = ie[be], _e = be + 1, Pe = ie[_e];
          if (0 > p(Fe, he)) _e < Z && 0 > p(Pe, Fe) ? (ie[z] = Pe, ie[_e] = he, z = _e) : (ie[z] = Fe, ie[be] = he, z = be);
          else if (_e < Z && 0 > p(Pe, he)) ie[z] = Pe, ie[_e] = he, z = _e;
          else break e;
        }
      }
      return ue;
    }
    function p(ie, ue) {
      var he = ie.sortIndex - ue.sortIndex;
      return he !== 0 ? he : ie.id - ue.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      t.unstable_now = function() {
        return m.now();
      };
    } else {
      var v = Date, E = v.now();
      t.unstable_now = function() {
        return v.now() - E;
      };
    }
    var g = [], x = [], C = 1, b = null, M = 3, _ = !1, k = !1, A = !1, N = typeof setTimeout == "function" ? setTimeout : null, F = typeof clearTimeout == "function" ? clearTimeout : null, W = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function P(ie) {
      for (var ue = u(x); ue !== null; ) {
        if (ue.callback === null) f(x);
        else if (ue.startTime <= ie) f(x), ue.sortIndex = ue.expirationTime, a(g, ue);
        else break;
        ue = u(x);
      }
    }
    function j(ie) {
      if (A = !1, P(ie), !k) if (u(g) !== null) k = !0, de(V);
      else {
        var ue = u(x);
        ue !== null && le(j, ue.startTime - ie);
      }
    }
    function V(ie, ue) {
      k = !1, A && (A = !1, F(oe), oe = -1), _ = !0;
      var he = M;
      try {
        for (P(ue), b = u(g); b !== null && (!(b.expirationTime > ue) || ie && !ne()); ) {
          var z = b.callback;
          if (typeof z == "function") {
            b.callback = null, M = b.priorityLevel;
            var Z = z(b.expirationTime <= ue);
            ue = t.unstable_now(), typeof Z == "function" ? b.callback = Z : b === u(g) && f(g), P(ue);
          } else f(g);
          b = u(g);
        }
        if (b !== null) var we = !0;
        else {
          var be = u(x);
          be !== null && le(j, be.startTime - ue), we = !1;
        }
        return we;
      } finally {
        b = null, M = he, _ = !1;
      }
    }
    var q = !1, H = null, oe = -1, Q = 5, $ = -1;
    function ne() {
      return !(t.unstable_now() - $ < Q);
    }
    function re() {
      if (H !== null) {
        var ie = t.unstable_now();
        $ = ie;
        var ue = !0;
        try {
          ue = H(!0, ie);
        } finally {
          ue ? G() : (q = !1, H = null);
        }
      } else q = !1;
    }
    var G;
    if (typeof W == "function") G = function() {
      W(re);
    };
    else if (typeof MessageChannel < "u") {
      var X = new MessageChannel(), ae = X.port2;
      X.port1.onmessage = re, G = function() {
        ae.postMessage(null);
      };
    } else G = function() {
      N(re, 0);
    };
    function de(ie) {
      H = ie, q || (q = !0, G());
    }
    function le(ie, ue) {
      oe = N(function() {
        ie(t.unstable_now());
      }, ue);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(ie) {
      ie.callback = null;
    }, t.unstable_continueExecution = function() {
      k || _ || (k = !0, de(V));
    }, t.unstable_forceFrameRate = function(ie) {
      0 > ie || 125 < ie ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Q = 0 < ie ? Math.floor(1e3 / ie) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return M;
    }, t.unstable_getFirstCallbackNode = function() {
      return u(g);
    }, t.unstable_next = function(ie) {
      switch (M) {
        case 1:
        case 2:
        case 3:
          var ue = 3;
          break;
        default:
          ue = M;
      }
      var he = M;
      M = ue;
      try {
        return ie();
      } finally {
        M = he;
      }
    }, t.unstable_pauseExecution = function() {
    }, t.unstable_requestPaint = function() {
    }, t.unstable_runWithPriority = function(ie, ue) {
      switch (ie) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          ie = 3;
      }
      var he = M;
      M = ie;
      try {
        return ue();
      } finally {
        M = he;
      }
    }, t.unstable_scheduleCallback = function(ie, ue, he) {
      var z = t.unstable_now();
      switch (typeof he == "object" && he !== null ? (he = he.delay, he = typeof he == "number" && 0 < he ? z + he : z) : he = z, ie) {
        case 1:
          var Z = -1;
          break;
        case 2:
          Z = 250;
          break;
        case 5:
          Z = 1073741823;
          break;
        case 4:
          Z = 1e4;
          break;
        default:
          Z = 5e3;
      }
      return Z = he + Z, ie = { id: C++, callback: ue, priorityLevel: ie, startTime: he, expirationTime: Z, sortIndex: -1 }, he > z ? (ie.sortIndex = he, a(x, ie), u(g) === null && ie === u(x) && (A ? (F(oe), oe = -1) : A = !0, le(j, he - z))) : (ie.sortIndex = Z, a(g, ie), k || _ || (k = !0, de(V))), ie;
    }, t.unstable_shouldYield = ne, t.unstable_wrapCallback = function(ie) {
      var ue = M;
      return function() {
        var he = M;
        M = ue;
        try {
          return ie.apply(this, arguments);
        } finally {
          M = he;
        }
      };
    };
  })(k2)), k2;
}
var D2 = {};
var mC;
function QN() {
  return mC || (mC = 1, (function(t) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var a = !1, u = 5;
      function f(Ce, Ie) {
        var ft = Ce.length;
        Ce.push(Ie), v(Ce, Ie, ft);
      }
      function p(Ce) {
        return Ce.length === 0 ? null : Ce[0];
      }
      function m(Ce) {
        if (Ce.length === 0)
          return null;
        var Ie = Ce[0], ft = Ce.pop();
        return ft !== Ie && (Ce[0] = ft, E(Ce, ft, 0)), Ie;
      }
      function v(Ce, Ie, ft) {
        for (var Ye = ft; Ye > 0; ) {
          var Lt = Ye - 1 >>> 1, Kt = Ce[Lt];
          if (g(Kt, Ie) > 0)
            Ce[Lt] = Ie, Ce[Ye] = Kt, Ye = Lt;
          else
            return;
        }
      }
      function E(Ce, Ie, ft) {
        for (var Ye = ft, Lt = Ce.length, Kt = Lt >>> 1; Ye < Kt; ) {
          var xt = (Ye + 1) * 2 - 1, ht = Ce[xt], Ae = xt + 1, dt = Ce[Ae];
          if (g(ht, Ie) < 0)
            Ae < Lt && g(dt, ht) < 0 ? (Ce[Ye] = dt, Ce[Ae] = Ie, Ye = Ae) : (Ce[Ye] = ht, Ce[xt] = Ie, Ye = xt);
          else if (Ae < Lt && g(dt, Ie) < 0)
            Ce[Ye] = dt, Ce[Ae] = Ie, Ye = Ae;
          else
            return;
        }
      }
      function g(Ce, Ie) {
        var ft = Ce.sortIndex - Ie.sortIndex;
        return ft !== 0 ? ft : Ce.id - Ie.id;
      }
      var x = 1, C = 2, b = 3, M = 4, _ = 5;
      function k(Ce, Ie) {
      }
      var A = typeof performance == "object" && typeof performance.now == "function";
      if (A) {
        var N = performance;
        t.unstable_now = function() {
          return N.now();
        };
      } else {
        var F = Date, W = F.now();
        t.unstable_now = function() {
          return F.now() - W;
        };
      }
      var P = 1073741823, j = -1, V = 250, q = 5e3, H = 1e4, oe = P, Q = [], $ = [], ne = 1, re = null, G = b, X = !1, ae = !1, de = !1, le = typeof setTimeout == "function" ? setTimeout : null, ie = typeof clearTimeout == "function" ? clearTimeout : null, ue = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function he(Ce) {
        for (var Ie = p($); Ie !== null; ) {
          if (Ie.callback === null)
            m($);
          else if (Ie.startTime <= Ce)
            m($), Ie.sortIndex = Ie.expirationTime, f(Q, Ie);
          else
            return;
          Ie = p($);
        }
      }
      function z(Ce) {
        if (de = !1, he(Ce), !ae)
          if (p(Q) !== null)
            ae = !0, Rt(Z);
          else {
            var Ie = p($);
            Ie !== null && it(z, Ie.startTime - Ce);
          }
      }
      function Z(Ce, Ie) {
        ae = !1, de && (de = !1, Ct()), X = !0;
        var ft = G;
        try {
          var Ye;
          if (!a) return we(Ce, Ie);
        } finally {
          re = null, G = ft, X = !1;
        }
      }
      function we(Ce, Ie) {
        var ft = Ie;
        for (he(ft), re = p(Q); re !== null && !(re.expirationTime > ft && (!Ce || ut())); ) {
          var Ye = re.callback;
          if (typeof Ye == "function") {
            re.callback = null, G = re.priorityLevel;
            var Lt = re.expirationTime <= ft, Kt = Ye(Lt);
            ft = t.unstable_now(), typeof Kt == "function" ? re.callback = Kt : re === p(Q) && m(Q), he(ft);
          } else
            m(Q);
          re = p(Q);
        }
        if (re !== null)
          return !0;
        var xt = p($);
        return xt !== null && it(z, xt.startTime - ft), !1;
      }
      function be(Ce, Ie) {
        switch (Ce) {
          case x:
          case C:
          case b:
          case M:
          case _:
            break;
          default:
            Ce = b;
        }
        var ft = G;
        G = Ce;
        try {
          return Ie();
        } finally {
          G = ft;
        }
      }
      function Fe(Ce) {
        var Ie;
        switch (G) {
          case x:
          case C:
          case b:
            Ie = b;
            break;
          default:
            Ie = G;
            break;
        }
        var ft = G;
        G = Ie;
        try {
          return Ce();
        } finally {
          G = ft;
        }
      }
      function _e(Ce) {
        var Ie = G;
        return function() {
          var ft = G;
          G = Ie;
          try {
            return Ce.apply(this, arguments);
          } finally {
            G = ft;
          }
        };
      }
      function Pe(Ce, Ie, ft) {
        var Ye = t.unstable_now(), Lt;
        if (typeof ft == "object" && ft !== null) {
          var Kt = ft.delay;
          typeof Kt == "number" && Kt > 0 ? Lt = Ye + Kt : Lt = Ye;
        } else
          Lt = Ye;
        var xt;
        switch (Ce) {
          case x:
            xt = j;
            break;
          case C:
            xt = V;
            break;
          case _:
            xt = oe;
            break;
          case M:
            xt = H;
            break;
          case b:
          default:
            xt = q;
            break;
        }
        var ht = Lt + xt, Ae = {
          id: ne++,
          callback: Ie,
          priorityLevel: Ce,
          startTime: Lt,
          expirationTime: ht,
          sortIndex: -1
        };
        return Lt > Ye ? (Ae.sortIndex = Lt, f($, Ae), p(Q) === null && Ae === p($) && (de ? Ct() : de = !0, it(z, Lt - Ye))) : (Ae.sortIndex = ht, f(Q, Ae), !ae && !X && (ae = !0, Rt(Z))), Ae;
      }
      function Be() {
      }
      function De() {
        !ae && !X && (ae = !0, Rt(Z));
      }
      function Ve() {
        return p(Q);
      }
      function Xe(Ce) {
        Ce.callback = null;
      }
      function Oe() {
        return G;
      }
      var Ke = !1, Te = null, Ge = -1, et = u, ze = -1;
      function ut() {
        var Ce = t.unstable_now() - ze;
        return !(Ce < et);
      }
      function Ut() {
      }
      function bt(Ce) {
        if (Ce < 0 || Ce > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        Ce > 0 ? et = Math.floor(1e3 / Ce) : et = u;
      }
      var Me = function() {
        if (Te !== null) {
          var Ce = t.unstable_now();
          ze = Ce;
          var Ie = !0, ft = !0;
          try {
            ft = Te(Ie, Ce);
          } finally {
            ft ? Qe() : (Ke = !1, Te = null);
          }
        } else
          Ke = !1;
      }, Qe;
      if (typeof ue == "function")
        Qe = function() {
          ue(Me);
        };
      else if (typeof MessageChannel < "u") {
        var Et = new MessageChannel(), nt = Et.port2;
        Et.port1.onmessage = Me, Qe = function() {
          nt.postMessage(null);
        };
      } else
        Qe = function() {
          le(Me, 0);
        };
      function Rt(Ce) {
        Te = Ce, Ke || (Ke = !0, Qe());
      }
      function it(Ce, Ie) {
        Ge = le(function() {
          Ce(t.unstable_now());
        }, Ie);
      }
      function Ct() {
        ie(Ge), Ge = -1;
      }
      var Pt = Ut, Xt = null;
      t.unstable_IdlePriority = _, t.unstable_ImmediatePriority = x, t.unstable_LowPriority = M, t.unstable_NormalPriority = b, t.unstable_Profiling = Xt, t.unstable_UserBlockingPriority = C, t.unstable_cancelCallback = Xe, t.unstable_continueExecution = De, t.unstable_forceFrameRate = bt, t.unstable_getCurrentPriorityLevel = Oe, t.unstable_getFirstCallbackNode = Ve, t.unstable_next = Fe, t.unstable_pauseExecution = Be, t.unstable_requestPaint = Pt, t.unstable_runWithPriority = be, t.unstable_scheduleCallback = Pe, t.unstable_shouldYield = ut, t.unstable_wrapCallback = _e, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(D2)), D2;
}
var yC;
function Bb() {
  return yC || (yC = 1, process.env.NODE_ENV === "production" ? O0.exports = GN() : O0.exports = QN()), O0.exports;
}
var gC;
function XN() {
  if (gC) return Ci;
  gC = 1;
  var t = Dh(), a = Bb();
  function u(r) {
    for (var i = "https://reactjs.org/docs/error-decoder.html?invariant=" + r, s = 1; s < arguments.length; s++) i += "&args[]=" + encodeURIComponent(arguments[s]);
    return "Minified React error #" + r + "; visit " + i + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var f = /* @__PURE__ */ new Set(), p = {};
  function m(r, i) {
    v(r, i), v(r + "Capture", i);
  }
  function v(r, i) {
    for (p[r] = i, r = 0; r < i.length; r++) f.add(i[r]);
  }
  var E = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), g = Object.prototype.hasOwnProperty, x = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, C = {}, b = {};
  function M(r) {
    return g.call(b, r) ? !0 : g.call(C, r) ? !1 : x.test(r) ? b[r] = !0 : (C[r] = !0, !1);
  }
  function _(r, i, s, d) {
    if (s !== null && s.type === 0) return !1;
    switch (typeof i) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return d ? !1 : s !== null ? !s.acceptsBooleans : (r = r.toLowerCase().slice(0, 5), r !== "data-" && r !== "aria-");
      default:
        return !1;
    }
  }
  function k(r, i, s, d) {
    if (i === null || typeof i > "u" || _(r, i, s, d)) return !0;
    if (d) return !1;
    if (s !== null) switch (s.type) {
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
  function A(r, i, s, d, y, w, O) {
    this.acceptsBooleans = i === 2 || i === 3 || i === 4, this.attributeName = d, this.attributeNamespace = y, this.mustUseProperty = s, this.propertyName = r, this.type = i, this.sanitizeURL = w, this.removeEmptyString = O;
  }
  var N = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(r) {
    N[r] = new A(r, 0, !1, r, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(r) {
    var i = r[0];
    N[i] = new A(i, 1, !1, r[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(r) {
    N[r] = new A(r, 2, !1, r.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(r) {
    N[r] = new A(r, 2, !1, r, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(r) {
    N[r] = new A(r, 3, !1, r.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(r) {
    N[r] = new A(r, 3, !0, r, null, !1, !1);
  }), ["capture", "download"].forEach(function(r) {
    N[r] = new A(r, 4, !1, r, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(r) {
    N[r] = new A(r, 6, !1, r, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(r) {
    N[r] = new A(r, 5, !1, r.toLowerCase(), null, !1, !1);
  });
  var F = /[\-:]([a-z])/g;
  function W(r) {
    return r[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(r) {
    var i = r.replace(
      F,
      W
    );
    N[i] = new A(i, 1, !1, r, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(r) {
    var i = r.replace(F, W);
    N[i] = new A(i, 1, !1, r, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(r) {
    var i = r.replace(F, W);
    N[i] = new A(i, 1, !1, r, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(r) {
    N[r] = new A(r, 1, !1, r.toLowerCase(), null, !1, !1);
  }), N.xlinkHref = new A("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(r) {
    N[r] = new A(r, 1, !1, r.toLowerCase(), null, !0, !0);
  });
  function P(r, i, s, d) {
    var y = N.hasOwnProperty(i) ? N[i] : null;
    (y !== null ? y.type !== 0 : d || !(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (k(i, s, y, d) && (s = null), d || y === null ? M(i) && (s === null ? r.removeAttribute(i) : r.setAttribute(i, "" + s)) : y.mustUseProperty ? r[y.propertyName] = s === null ? y.type === 3 ? !1 : "" : s : (i = y.attributeName, d = y.attributeNamespace, s === null ? r.removeAttribute(i) : (y = y.type, s = y === 3 || y === 4 && s === !0 ? "" : "" + s, d ? r.setAttributeNS(d, i, s) : r.setAttribute(i, s))));
  }
  var j = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, V = /* @__PURE__ */ Symbol.for("react.element"), q = /* @__PURE__ */ Symbol.for("react.portal"), H = /* @__PURE__ */ Symbol.for("react.fragment"), oe = /* @__PURE__ */ Symbol.for("react.strict_mode"), Q = /* @__PURE__ */ Symbol.for("react.profiler"), $ = /* @__PURE__ */ Symbol.for("react.provider"), ne = /* @__PURE__ */ Symbol.for("react.context"), re = /* @__PURE__ */ Symbol.for("react.forward_ref"), G = /* @__PURE__ */ Symbol.for("react.suspense"), X = /* @__PURE__ */ Symbol.for("react.suspense_list"), ae = /* @__PURE__ */ Symbol.for("react.memo"), de = /* @__PURE__ */ Symbol.for("react.lazy"), le = /* @__PURE__ */ Symbol.for("react.offscreen"), ie = Symbol.iterator;
  function ue(r) {
    return r === null || typeof r != "object" ? null : (r = ie && r[ie] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var he = Object.assign, z;
  function Z(r) {
    if (z === void 0) try {
      throw Error();
    } catch (s) {
      var i = s.stack.trim().match(/\n( *(at )?)/);
      z = i && i[1] || "";
    }
    return `
` + z + r;
  }
  var we = !1;
  function be(r, i) {
    if (!r || we) return "";
    we = !0;
    var s = Error.prepareStackTrace;
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
      we = !1, Error.prepareStackTrace = s;
    }
    return (r = r ? r.displayName || r.name : "") ? Z(r) : "";
  }
  function Fe(r) {
    switch (r.tag) {
      case 5:
        return Z(r.type);
      case 16:
        return Z("Lazy");
      case 13:
        return Z("Suspense");
      case 19:
        return Z("SuspenseList");
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
      case H:
        return "Fragment";
      case q:
        return "Portal";
      case Q:
        return "Profiler";
      case oe:
        return "StrictMode";
      case G:
        return "Suspense";
      case X:
        return "SuspenseList";
    }
    if (typeof r == "object") switch (r.$$typeof) {
      case ne:
        return (r.displayName || "Context") + ".Consumer";
      case $:
        return (r._context.displayName || "Context") + ".Provider";
      case re:
        var i = r.render;
        return r = r.displayName, r || (r = i.displayName || i.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
      case ae:
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
  function Pe(r) {
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
        return i === oe ? "StrictMode" : "Mode";
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
  function De(r) {
    var i = r.type;
    return (r = r.nodeName) && r.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
  }
  function Ve(r) {
    var i = De(r) ? "checked" : "value", s = Object.getOwnPropertyDescriptor(r.constructor.prototype, i), d = "" + r[i];
    if (!r.hasOwnProperty(i) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var y = s.get, w = s.set;
      return Object.defineProperty(r, i, { configurable: !0, get: function() {
        return y.call(this);
      }, set: function(O) {
        d = "" + O, w.call(this, O);
      } }), Object.defineProperty(r, i, { enumerable: s.enumerable }), { getValue: function() {
        return d;
      }, setValue: function(O) {
        d = "" + O;
      }, stopTracking: function() {
        r._valueTracker = null, delete r[i];
      } };
    }
  }
  function Xe(r) {
    r._valueTracker || (r._valueTracker = Ve(r));
  }
  function Oe(r) {
    if (!r) return !1;
    var i = r._valueTracker;
    if (!i) return !0;
    var s = i.getValue(), d = "";
    return r && (d = De(r) ? r.checked ? "true" : "false" : r.value), r = d, r !== s ? (i.setValue(r), !0) : !1;
  }
  function Ke(r) {
    if (r = r || (typeof document < "u" ? document : void 0), typeof r > "u") return null;
    try {
      return r.activeElement || r.body;
    } catch {
      return r.body;
    }
  }
  function Te(r, i) {
    var s = i.checked;
    return he({}, i, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: s ?? r._wrapperState.initialChecked });
  }
  function Ge(r, i) {
    var s = i.defaultValue == null ? "" : i.defaultValue, d = i.checked != null ? i.checked : i.defaultChecked;
    s = Be(i.value != null ? i.value : s), r._wrapperState = { initialChecked: d, initialValue: s, controlled: i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null };
  }
  function et(r, i) {
    i = i.checked, i != null && P(r, "checked", i, !1);
  }
  function ze(r, i) {
    et(r, i);
    var s = Be(i.value), d = i.type;
    if (s != null) d === "number" ? (s === 0 && r.value === "" || r.value != s) && (r.value = "" + s) : r.value !== "" + s && (r.value = "" + s);
    else if (d === "submit" || d === "reset") {
      r.removeAttribute("value");
      return;
    }
    i.hasOwnProperty("value") ? Ut(r, i.type, s) : i.hasOwnProperty("defaultValue") && Ut(r, i.type, Be(i.defaultValue)), i.checked == null && i.defaultChecked != null && (r.defaultChecked = !!i.defaultChecked);
  }
  function ut(r, i, s) {
    if (i.hasOwnProperty("value") || i.hasOwnProperty("defaultValue")) {
      var d = i.type;
      if (!(d !== "submit" && d !== "reset" || i.value !== void 0 && i.value !== null)) return;
      i = "" + r._wrapperState.initialValue, s || i === r.value || (r.value = i), r.defaultValue = i;
    }
    s = r.name, s !== "" && (r.name = ""), r.defaultChecked = !!r._wrapperState.initialChecked, s !== "" && (r.name = s);
  }
  function Ut(r, i, s) {
    (i !== "number" || Ke(r.ownerDocument) !== r) && (s == null ? r.defaultValue = "" + r._wrapperState.initialValue : r.defaultValue !== "" + s && (r.defaultValue = "" + s));
  }
  var bt = Array.isArray;
  function Me(r, i, s, d) {
    if (r = r.options, i) {
      i = {};
      for (var y = 0; y < s.length; y++) i["$" + s[y]] = !0;
      for (s = 0; s < r.length; s++) y = i.hasOwnProperty("$" + r[s].value), r[s].selected !== y && (r[s].selected = y), y && d && (r[s].defaultSelected = !0);
    } else {
      for (s = "" + Be(s), i = null, y = 0; y < r.length; y++) {
        if (r[y].value === s) {
          r[y].selected = !0, d && (r[y].defaultSelected = !0);
          return;
        }
        i !== null || r[y].disabled || (i = r[y]);
      }
      i !== null && (i.selected = !0);
    }
  }
  function Qe(r, i) {
    if (i.dangerouslySetInnerHTML != null) throw Error(u(91));
    return he({}, i, { value: void 0, defaultValue: void 0, children: "" + r._wrapperState.initialValue });
  }
  function Et(r, i) {
    var s = i.value;
    if (s == null) {
      if (s = i.children, i = i.defaultValue, s != null) {
        if (i != null) throw Error(u(92));
        if (bt(s)) {
          if (1 < s.length) throw Error(u(93));
          s = s[0];
        }
        i = s;
      }
      i == null && (i = ""), s = i;
    }
    r._wrapperState = { initialValue: Be(s) };
  }
  function nt(r, i) {
    var s = Be(i.value), d = Be(i.defaultValue);
    s != null && (s = "" + s, s !== r.value && (r.value = s), i.defaultValue == null && r.defaultValue !== s && (r.defaultValue = s)), d != null && (r.defaultValue = "" + d);
  }
  function Rt(r) {
    var i = r.textContent;
    i === r._wrapperState.initialValue && i !== "" && i !== null && (r.value = i);
  }
  function it(r) {
    switch (r) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Ct(r, i) {
    return r == null || r === "http://www.w3.org/1999/xhtml" ? it(i) : r === "http://www.w3.org/2000/svg" && i === "foreignObject" ? "http://www.w3.org/1999/xhtml" : r;
  }
  var Pt, Xt = (function(r) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(i, s, d, y) {
      MSApp.execUnsafeLocalFunction(function() {
        return r(i, s, d, y);
      });
    } : r;
  })(function(r, i) {
    if (r.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in r) r.innerHTML = i;
    else {
      for (Pt = Pt || document.createElement("div"), Pt.innerHTML = "<svg>" + i.valueOf().toString() + "</svg>", i = Pt.firstChild; r.firstChild; ) r.removeChild(r.firstChild);
      for (; i.firstChild; ) r.appendChild(i.firstChild);
    }
  });
  function Ce(r, i) {
    if (i) {
      var s = r.firstChild;
      if (s && s === r.lastChild && s.nodeType === 3) {
        s.nodeValue = i;
        return;
      }
    }
    r.textContent = i;
  }
  var Ie = {
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
  }, ft = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ie).forEach(function(r) {
    ft.forEach(function(i) {
      i = i + r.charAt(0).toUpperCase() + r.substring(1), Ie[i] = Ie[r];
    });
  });
  function Ye(r, i, s) {
    return i == null || typeof i == "boolean" || i === "" ? "" : s || typeof i != "number" || i === 0 || Ie.hasOwnProperty(r) && Ie[r] ? ("" + i).trim() : i + "px";
  }
  function Lt(r, i) {
    r = r.style;
    for (var s in i) if (i.hasOwnProperty(s)) {
      var d = s.indexOf("--") === 0, y = Ye(s, i[s], d);
      s === "float" && (s = "cssFloat"), d ? r.setProperty(s, y) : r[s] = y;
    }
  }
  var Kt = he({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function xt(r, i) {
    if (i) {
      if (Kt[r] && (i.children != null || i.dangerouslySetInnerHTML != null)) throw Error(u(137, r));
      if (i.dangerouslySetInnerHTML != null) {
        if (i.children != null) throw Error(u(60));
        if (typeof i.dangerouslySetInnerHTML != "object" || !("__html" in i.dangerouslySetInnerHTML)) throw Error(u(61));
      }
      if (i.style != null && typeof i.style != "object") throw Error(u(62));
    }
  }
  function ht(r, i) {
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
  var Ae = null;
  function dt(r) {
    return r = r.target || r.srcElement || window, r.correspondingUseElement && (r = r.correspondingUseElement), r.nodeType === 3 ? r.parentNode : r;
  }
  var Mt = null, Zt = null, nn = null;
  function yn(r) {
    if (r = kt(r)) {
      if (typeof Mt != "function") throw Error(u(280));
      var i = r.stateNode;
      i && (i = er(i), Mt(r.stateNode, r.type, i));
    }
  }
  function Hn(r) {
    Zt ? nn ? nn.push(r) : nn = [r] : Zt = r;
  }
  function Bn() {
    if (Zt) {
      var r = Zt, i = nn;
      if (nn = Zt = null, yn(r), i) for (r = 0; r < i.length; r++) yn(i[r]);
    }
  }
  function Pr(r, i) {
    return r(i);
  }
  function br() {
  }
  var vr = !1;
  function Mi(r, i, s) {
    if (vr) return r(i, s);
    vr = !0;
    try {
      return Pr(r, i, s);
    } finally {
      vr = !1, (Zt !== null || nn !== null) && (br(), Bn());
    }
  }
  function Tr(r, i) {
    var s = r.stateNode;
    if (s === null) return null;
    var d = er(s);
    if (d === null) return null;
    s = d[i];
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
    if (s && typeof s != "function") throw Error(u(231, i, typeof s));
    return s;
  }
  var Ar = !1;
  if (E) try {
    var Vn = {};
    Object.defineProperty(Vn, "passive", { get: function() {
      Ar = !0;
    } }), window.addEventListener("test", Vn, Vn), window.removeEventListener("test", Vn, Vn);
  } catch {
    Ar = !1;
  }
  function Ra(r, i, s, d, y, w, O, I, K) {
    var ye = Array.prototype.slice.call(arguments, 3);
    try {
      i.apply(s, ye);
    } catch (Ue) {
      this.onError(Ue);
    }
  }
  var oa = !1, Ya = null, Lr = !1, B = null, ke = { onError: function(r) {
    oa = !0, Ya = r;
  } };
  function Ze(r, i, s, d, y, w, O, I, K) {
    oa = !1, Ya = null, Ra.apply(ke, arguments);
  }
  function ot(r, i, s, d, y, w, O, I, K) {
    if (Ze.apply(this, arguments), oa) {
      if (oa) {
        var ye = Ya;
        oa = !1, Ya = null;
      } else throw Error(u(198));
      Lr || (Lr = !0, B = ye);
    }
  }
  function It(r) {
    var i = r, s = r;
    if (r.alternate) for (; i.return; ) i = i.return;
    else {
      r = i;
      do
        i = r, (i.flags & 4098) !== 0 && (s = i.return), r = i.return;
      while (r);
    }
    return i.tag === 3 ? s : null;
  }
  function Ht(r) {
    if (r.tag === 13) {
      var i = r.memoizedState;
      if (i === null && (r = r.alternate, r !== null && (i = r.memoizedState)), i !== null) return i.dehydrated;
    }
    return null;
  }
  function tn(r) {
    if (It(r) !== r) throw Error(u(188));
  }
  function Jt(r) {
    var i = r.alternate;
    if (!i) {
      if (i = It(r), i === null) throw Error(u(188));
      return i !== r ? null : r;
    }
    for (var s = r, d = i; ; ) {
      var y = s.return;
      if (y === null) break;
      var w = y.alternate;
      if (w === null) {
        if (d = y.return, d !== null) {
          s = d;
          continue;
        }
        break;
      }
      if (y.child === w.child) {
        for (w = y.child; w; ) {
          if (w === s) return tn(y), r;
          if (w === d) return tn(y), i;
          w = w.sibling;
        }
        throw Error(u(188));
      }
      if (s.return !== d.return) s = y, d = w;
      else {
        for (var O = !1, I = y.child; I; ) {
          if (I === s) {
            O = !0, s = y, d = w;
            break;
          }
          if (I === d) {
            O = !0, d = y, s = w;
            break;
          }
          I = I.sibling;
        }
        if (!O) {
          for (I = w.child; I; ) {
            if (I === s) {
              O = !0, s = w, d = y;
              break;
            }
            if (I === d) {
              O = !0, d = w, s = y;
              break;
            }
            I = I.sibling;
          }
          if (!O) throw Error(u(189));
        }
      }
      if (s.alternate !== d) throw Error(u(190));
    }
    if (s.tag !== 3) throw Error(u(188));
    return s.stateNode.current === s ? r : i;
  }
  function Gn(r) {
    return r = Jt(r), r !== null ? gn(r) : null;
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
  var xn = a.unstable_scheduleCallback, In = a.unstable_cancelCallback, Ma = a.unstable_shouldYield, ua = a.unstable_requestPaint, qt = a.unstable_now, Bt = a.unstable_getCurrentPriorityLevel, sa = a.unstable_ImmediatePriority, _i = a.unstable_UserBlockingPriority, ki = a.unstable_NormalPriority, Di = a.unstable_LowPriority, qi = a.unstable_IdlePriority, ai = null, Qn = null;
  function Fo(r) {
    if (Qn && typeof Qn.onCommitFiberRoot == "function") try {
      Qn.onCommitFiberRoot(ai, r, void 0, (r.current.flags & 128) === 128);
    } catch {
    }
  }
  var $r = Math.clz32 ? Math.clz32 : on, Au = Math.log, Zl = Math.LN2;
  function on(r) {
    return r >>>= 0, r === 0 ? 32 : 31 - (Au(r) / Zl | 0) | 0;
  }
  var Nt = 64, an = 4194304;
  function sn(r) {
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
  function Zn(r, i) {
    var s = r.pendingLanes;
    if (s === 0) return 0;
    var d = 0, y = r.suspendedLanes, w = r.pingedLanes, O = s & 268435455;
    if (O !== 0) {
      var I = O & ~y;
      I !== 0 ? d = sn(I) : (w &= O, w !== 0 && (d = sn(w)));
    } else O = s & ~y, O !== 0 ? d = sn(O) : w !== 0 && (d = sn(w));
    if (d === 0) return 0;
    if (i !== 0 && i !== d && (i & y) === 0 && (y = d & -d, w = i & -i, y >= w || y === 16 && (w & 4194240) !== 0)) return i;
    if ((d & 4) !== 0 && (d |= s & 16), i = r.entangledLanes, i !== 0) for (r = r.entanglements, i &= d; 0 < i; ) s = 31 - $r(i), y = 1 << s, d |= r[s], i &= ~y;
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
  function Rr(r, i) {
    for (var s = r.suspendedLanes, d = r.pingedLanes, y = r.expirationTimes, w = r.pendingLanes; 0 < w; ) {
      var O = 31 - $r(w), I = 1 << O, K = y[O];
      K === -1 ? ((I & s) === 0 || (I & d) !== 0) && (y[O] = ca(I, i)) : K <= i && (r.expiredLanes |= I), w &= ~I;
    }
  }
  function Jl(r) {
    return r = r.pendingLanes & -1073741825, r !== 0 ? r : r & 1073741824 ? 1073741824 : 0;
  }
  function Lu() {
    var r = Nt;
    return Nt <<= 1, (Nt & 4194240) === 0 && (Nt = 64), r;
  }
  function Nu(r) {
    for (var i = [], s = 0; 31 > s; s++) i.push(r);
    return i;
  }
  function El(r, i, s) {
    r.pendingLanes |= i, i !== 536870912 && (r.suspendedLanes = 0, r.pingedLanes = 0), r = r.eventTimes, i = 31 - $r(i), r[i] = s;
  }
  function rp(r, i) {
    var s = r.pendingLanes & ~i;
    r.pendingLanes = i, r.suspendedLanes = 0, r.pingedLanes = 0, r.expiredLanes &= i, r.mutableReadLanes &= i, r.entangledLanes &= i, i = r.entanglements;
    var d = r.eventTimes;
    for (r = r.expirationTimes; 0 < s; ) {
      var y = 31 - $r(s), w = 1 << y;
      i[y] = 0, d[y] = -1, r[y] = -1, s &= ~w;
    }
  }
  function xl(r, i) {
    var s = r.entangledLanes |= i;
    for (r = r.entanglements; s; ) {
      var d = 31 - $r(s), y = 1 << d;
      y & i | r[d] & i && (r[d] |= i), s &= ~y;
    }
  }
  var Cn = 0;
  function zu(r) {
    return r &= -r, 1 < r ? 4 < r ? (r & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Sn, js, Yi, Wt, Uu, Hr = !1, Wi = [], fa = null, Bi = null, qn = null, On = /* @__PURE__ */ new Map(), eo = /* @__PURE__ */ new Map(), Mr = [], da = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function ii(r, i) {
    switch (r) {
      case "focusin":
      case "focusout":
        fa = null;
        break;
      case "dragenter":
      case "dragleave":
        Bi = null;
        break;
      case "mouseover":
      case "mouseout":
        qn = null;
        break;
      case "pointerover":
      case "pointerout":
        On.delete(i.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        eo.delete(i.pointerId);
    }
  }
  function Po(r, i, s, d, y, w) {
    return r === null || r.nativeEvent !== w ? (r = { blockedOn: i, domEventName: s, eventSystemFlags: d, nativeEvent: w, targetContainers: [y] }, i !== null && (i = kt(i), i !== null && js(i)), r) : (r.eventSystemFlags |= d, i = r.targetContainers, y !== null && i.indexOf(y) === -1 && i.push(y), r);
  }
  function Fs(r, i, s, d, y) {
    switch (i) {
      case "focusin":
        return fa = Po(fa, r, i, s, d, y), !0;
      case "dragenter":
        return Bi = Po(Bi, r, i, s, d, y), !0;
      case "mouseover":
        return qn = Po(qn, r, i, s, d, y), !0;
      case "pointerover":
        var w = y.pointerId;
        return On.set(w, Po(On.get(w) || null, r, i, s, d, y)), !0;
      case "gotpointercapture":
        return w = y.pointerId, eo.set(w, Po(eo.get(w) || null, r, i, s, d, y)), !0;
    }
    return !1;
  }
  function Ps(r) {
    var i = Go(r.target);
    if (i !== null) {
      var s = It(i);
      if (s !== null) {
        if (i = s.tag, i === 13) {
          if (i = Ht(s), i !== null) {
            r.blockedOn = i, Uu(r.priority, function() {
              Yi(s);
            });
            return;
          }
        } else if (i === 3 && s.stateNode.current.memoizedState.isDehydrated) {
          r.blockedOn = s.tag === 3 ? s.stateNode.containerInfo : null;
          return;
        }
      }
    }
    r.blockedOn = null;
  }
  function to(r) {
    if (r.blockedOn !== null) return !1;
    for (var i = r.targetContainers; 0 < i.length; ) {
      var s = Pu(r.domEventName, r.eventSystemFlags, i[0], r.nativeEvent);
      if (s === null) {
        s = r.nativeEvent;
        var d = new s.constructor(s.type, s);
        Ae = d, s.target.dispatchEvent(d), Ae = null;
      } else return i = kt(s), i !== null && js(i), r.blockedOn = s, !1;
      i.shift();
    }
    return !0;
  }
  function $o(r, i, s) {
    to(r) && s.delete(i);
  }
  function ap() {
    Hr = !1, fa !== null && to(fa) && (fa = null), Bi !== null && to(Bi) && (Bi = null), qn !== null && to(qn) && (qn = null), On.forEach($o), eo.forEach($o);
  }
  function li(r, i) {
    r.blockedOn === i && (r.blockedOn = null, Hr || (Hr = !0, a.unstable_scheduleCallback(a.unstable_NormalPriority, ap)));
  }
  function Oi(r) {
    function i(y) {
      return li(y, r);
    }
    if (0 < Wi.length) {
      li(Wi[0], r);
      for (var s = 1; s < Wi.length; s++) {
        var d = Wi[s];
        d.blockedOn === r && (d.blockedOn = null);
      }
    }
    for (fa !== null && li(fa, r), Bi !== null && li(Bi, r), qn !== null && li(qn, r), On.forEach(i), eo.forEach(i), s = 0; s < Mr.length; s++) d = Mr[s], d.blockedOn === r && (d.blockedOn = null);
    for (; 0 < Mr.length && (s = Mr[0], s.blockedOn === null); ) Ps(s), s.blockedOn === null && Mr.shift();
  }
  var Gi = j.ReactCurrentBatchConfig, oi = !0;
  function ju(r, i, s, d) {
    var y = Cn, w = Gi.transition;
    Gi.transition = null;
    try {
      Cn = 1, no(r, i, s, d);
    } finally {
      Cn = y, Gi.transition = w;
    }
  }
  function Fu(r, i, s, d) {
    var y = Cn, w = Gi.transition;
    Gi.transition = null;
    try {
      Cn = 4, no(r, i, s, d);
    } finally {
      Cn = y, Gi.transition = w;
    }
  }
  function no(r, i, s, d) {
    if (oi) {
      var y = Pu(r, i, s, d);
      if (y === null) vf(r, i, d, Ho, s), ii(r, d);
      else if (Fs(y, r, i, s, d)) d.stopPropagation();
      else if (ii(r, d), i & 4 && -1 < da.indexOf(r)) {
        for (; y !== null; ) {
          var w = kt(y);
          if (w !== null && Sn(w), w = Pu(r, i, s, d), w === null && vf(r, i, d, Ho, s), w === y) break;
          y = w;
        }
        y !== null && d.stopPropagation();
      } else vf(r, i, d, null, s);
    }
  }
  var Ho = null;
  function Pu(r, i, s, d) {
    if (Ho = null, r = dt(d), r = Go(r), r !== null) if (i = It(r), i === null) r = null;
    else if (s = i.tag, s === 13) {
      if (r = Ht(i), r !== null) return r;
      r = null;
    } else if (s === 3) {
      if (i.stateNode.current.memoizedState.isDehydrated) return i.tag === 3 ? i.stateNode.containerInfo : null;
      r = null;
    } else i !== r && (r = null);
    return Ho = r, null;
  }
  function $u(r) {
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
        switch (Bt()) {
          case sa:
            return 1;
          case _i:
            return 4;
          case ki:
          case Di:
            return 16;
          case qi:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Ai = null, D = null, Y = null;
  function me() {
    if (Y) return Y;
    var r, i = D, s = i.length, d, y = "value" in Ai ? Ai.value : Ai.textContent, w = y.length;
    for (r = 0; r < s && i[r] === y[r]; r++) ;
    var O = s - r;
    for (d = 1; d <= O && i[s - d] === y[w - d]; d++) ;
    return Y = y.slice(r, 1 < d ? 1 - d : void 0);
  }
  function Se(r) {
    var i = r.keyCode;
    return "charCode" in r ? (r = r.charCode, r === 0 && i === 13 && (r = 13)) : r = i, r === 10 && (r = 13), 32 <= r || r === 13 ? r : 0;
  }
  function We() {
    return !0;
  }
  function Ot() {
    return !1;
  }
  function tt(r) {
    function i(s, d, y, w, O) {
      this._reactName = s, this._targetInst = y, this.type = d, this.nativeEvent = w, this.target = O, this.currentTarget = null;
      for (var I in r) r.hasOwnProperty(I) && (s = r[I], this[I] = s ? s(w) : w[I]);
      return this.isDefaultPrevented = (w.defaultPrevented != null ? w.defaultPrevented : w.returnValue === !1) ? We : Ot, this.isPropagationStopped = Ot, this;
    }
    return he(i.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var s = this.nativeEvent;
      s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = We);
    }, stopPropagation: function() {
      var s = this.nativeEvent;
      s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = We);
    }, persist: function() {
    }, isPersistent: We }), i;
  }
  var jt = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(r) {
    return r.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, un = tt(jt), En = he({}, jt, { view: 0, detail: 0 }), Fn = tt(En), An, rn, Ln, Jn = he({}, En, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: sp, button: 0, buttons: 0, relatedTarget: function(r) {
    return r.relatedTarget === void 0 ? r.fromElement === r.srcElement ? r.toElement : r.fromElement : r.relatedTarget;
  }, movementX: function(r) {
    return "movementX" in r ? r.movementX : (r !== Ln && (Ln && r.type === "mousemove" ? (An = r.screenX - Ln.screenX, rn = r.screenY - Ln.screenY) : rn = An = 0, Ln = r), An);
  }, movementY: function(r) {
    return "movementY" in r ? r.movementY : rn;
  } }), ro = tt(Jn), $s = he({}, Jn, { dataTransfer: 0 }), wl = tt($s), Hs = he({}, En, { relatedTarget: 0 }), Vo = tt(Hs), ip = he({}, jt, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), nf = tt(ip), lp = he({}, jt, { clipboardData: function(r) {
    return "clipboardData" in r ? r.clipboardData : window.clipboardData;
  } }), Oh = tt(lp), op = he({}, jt, { data: 0 }), up = tt(op), Ah = {
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
  }, Lh = {
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
  }, i1 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Cl(r) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(r) : (r = i1[r]) ? !!i[r] : !1;
  }
  function sp() {
    return Cl;
  }
  var cp = he({}, En, { key: function(r) {
    if (r.key) {
      var i = Ah[r.key] || r.key;
      if (i !== "Unidentified") return i;
    }
    return r.type === "keypress" ? (r = Se(r), r === 13 ? "Enter" : String.fromCharCode(r)) : r.type === "keydown" || r.type === "keyup" ? Lh[r.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: sp, charCode: function(r) {
    return r.type === "keypress" ? Se(r) : 0;
  }, keyCode: function(r) {
    return r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  }, which: function(r) {
    return r.type === "keypress" ? Se(r) : r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  } }), fp = tt(cp), dp = he({}, Jn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Nh = tt(dp), rf = he({}, En, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: sp }), zh = tt(rf), _a = he({}, jt, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), bl = tt(_a), hr = he({}, Jn, {
    deltaX: function(r) {
      return "deltaX" in r ? r.deltaX : "wheelDeltaX" in r ? -r.wheelDeltaX : 0;
    },
    deltaY: function(r) {
      return "deltaY" in r ? r.deltaY : "wheelDeltaY" in r ? -r.wheelDeltaY : "wheelDelta" in r ? -r.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Tl = tt(hr), pp = [9, 13, 27, 32], Hu = E && "CompositionEvent" in window, Vs = null;
  E && "documentMode" in document && (Vs = document.documentMode);
  var Is = E && "TextEvent" in window && !Vs, Uh = E && (!Hu || Vs && 8 < Vs && 11 >= Vs), jh = " ", af = !1;
  function Fh(r, i) {
    switch (r) {
      case "keyup":
        return pp.indexOf(i.keyCode) !== -1;
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
  function Ph(r) {
    return r = r.detail, typeof r == "object" && "data" in r ? r.data : null;
  }
  var Vu = !1;
  function $h(r, i) {
    switch (r) {
      case "compositionend":
        return Ph(i);
      case "keypress":
        return i.which !== 32 ? null : (af = !0, jh);
      case "textInput":
        return r = i.data, r === jh && af ? null : r;
      default:
        return null;
    }
  }
  function l1(r, i) {
    if (Vu) return r === "compositionend" || !Hu && Fh(r, i) ? (r = me(), Y = D = Ai = null, Vu = !1, r) : null;
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
        return Uh && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var o1 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Hh(r) {
    var i = r && r.nodeName && r.nodeName.toLowerCase();
    return i === "input" ? !!o1[r.type] : i === "textarea";
  }
  function vp(r, i, s, d) {
    Hn(d), i = Qs(i, "onChange"), 0 < i.length && (s = new un("onChange", "change", null, s, d), r.push({ event: s, listeners: i }));
  }
  var Qi = null, Io = null;
  function Vh(r) {
    Wo(r, 0);
  }
  function qs(r) {
    var i = Ni(r);
    if (Oe(i)) return r;
  }
  function u1(r, i) {
    if (r === "change") return i;
  }
  var Ih = !1;
  if (E) {
    var hp;
    if (E) {
      var mp = "oninput" in document;
      if (!mp) {
        var qh = document.createElement("div");
        qh.setAttribute("oninput", "return;"), mp = typeof qh.oninput == "function";
      }
      hp = mp;
    } else hp = !1;
    Ih = hp && (!document.documentMode || 9 < document.documentMode);
  }
  function Yh() {
    Qi && (Qi.detachEvent("onpropertychange", Wh), Io = Qi = null);
  }
  function Wh(r) {
    if (r.propertyName === "value" && qs(Io)) {
      var i = [];
      vp(i, Io, r, dt(r)), Mi(Vh, i);
    }
  }
  function s1(r, i, s) {
    r === "focusin" ? (Yh(), Qi = i, Io = s, Qi.attachEvent("onpropertychange", Wh)) : r === "focusout" && Yh();
  }
  function Bh(r) {
    if (r === "selectionchange" || r === "keyup" || r === "keydown") return qs(Io);
  }
  function c1(r, i) {
    if (r === "click") return qs(i);
  }
  function Gh(r, i) {
    if (r === "input" || r === "change") return qs(i);
  }
  function f1(r, i) {
    return r === i && (r !== 0 || 1 / r === 1 / i) || r !== r && i !== i;
  }
  var Li = typeof Object.is == "function" ? Object.is : f1;
  function Ys(r, i) {
    if (Li(r, i)) return !0;
    if (typeof r != "object" || r === null || typeof i != "object" || i === null) return !1;
    var s = Object.keys(r), d = Object.keys(i);
    if (s.length !== d.length) return !1;
    for (d = 0; d < s.length; d++) {
      var y = s[d];
      if (!g.call(i, y) || !Li(r[y], i[y])) return !1;
    }
    return !0;
  }
  function Qh(r) {
    for (; r && r.firstChild; ) r = r.firstChild;
    return r;
  }
  function lf(r, i) {
    var s = Qh(r);
    r = 0;
    for (var d; s; ) {
      if (s.nodeType === 3) {
        if (d = r + s.textContent.length, r <= i && d >= i) return { node: s, offset: i - r };
        r = d;
      }
      e: {
        for (; s; ) {
          if (s.nextSibling) {
            s = s.nextSibling;
            break e;
          }
          s = s.parentNode;
        }
        s = void 0;
      }
      s = Qh(s);
    }
  }
  function ao(r, i) {
    return r && i ? r === i ? !0 : r && r.nodeType === 3 ? !1 : i && i.nodeType === 3 ? ao(r, i.parentNode) : "contains" in r ? r.contains(i) : r.compareDocumentPosition ? !!(r.compareDocumentPosition(i) & 16) : !1 : !1;
  }
  function Ws() {
    for (var r = window, i = Ke(); i instanceof r.HTMLIFrameElement; ) {
      try {
        var s = typeof i.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) r = i.contentWindow;
      else break;
      i = Ke(r.document);
    }
    return i;
  }
  function of(r) {
    var i = r && r.nodeName && r.nodeName.toLowerCase();
    return i && (i === "input" && (r.type === "text" || r.type === "search" || r.type === "tel" || r.type === "url" || r.type === "password") || i === "textarea" || r.contentEditable === "true");
  }
  function Iu(r) {
    var i = Ws(), s = r.focusedElem, d = r.selectionRange;
    if (i !== s && s && s.ownerDocument && ao(s.ownerDocument.documentElement, s)) {
      if (d !== null && of(s)) {
        if (i = d.start, r = d.end, r === void 0 && (r = i), "selectionStart" in s) s.selectionStart = i, s.selectionEnd = Math.min(r, s.value.length);
        else if (r = (i = s.ownerDocument || document) && i.defaultView || window, r.getSelection) {
          r = r.getSelection();
          var y = s.textContent.length, w = Math.min(d.start, y);
          d = d.end === void 0 ? w : Math.min(d.end, y), !r.extend && w > d && (y = d, d = w, w = y), y = lf(s, w);
          var O = lf(
            s,
            d
          );
          y && O && (r.rangeCount !== 1 || r.anchorNode !== y.node || r.anchorOffset !== y.offset || r.focusNode !== O.node || r.focusOffset !== O.offset) && (i = i.createRange(), i.setStart(y.node, y.offset), r.removeAllRanges(), w > d ? (r.addRange(i), r.extend(O.node, O.offset)) : (i.setEnd(O.node, O.offset), r.addRange(i)));
        }
      }
      for (i = [], r = s; r = r.parentNode; ) r.nodeType === 1 && i.push({ element: r, left: r.scrollLeft, top: r.scrollTop });
      for (typeof s.focus == "function" && s.focus(), s = 0; s < i.length; s++) r = i[s], r.element.scrollLeft = r.left, r.element.scrollTop = r.top;
    }
  }
  var d1 = E && "documentMode" in document && 11 >= document.documentMode, qu = null, yp = null, Bs = null, gp = !1;
  function Sp(r, i, s) {
    var d = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    gp || qu == null || qu !== Ke(d) || (d = qu, "selectionStart" in d && of(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Bs && Ys(Bs, d) || (Bs = d, d = Qs(yp, "onSelect"), 0 < d.length && (i = new un("onSelect", "select", null, i, s), r.push({ event: i, listeners: d }), i.target = qu)));
  }
  function uf(r, i) {
    var s = {};
    return s[r.toLowerCase()] = i.toLowerCase(), s["Webkit" + r] = "webkit" + i, s["Moz" + r] = "moz" + i, s;
  }
  var qo = { animationend: uf("Animation", "AnimationEnd"), animationiteration: uf("Animation", "AnimationIteration"), animationstart: uf("Animation", "AnimationStart"), transitionend: uf("Transition", "TransitionEnd") }, Vr = {}, Ep = {};
  E && (Ep = document.createElement("div").style, "AnimationEvent" in window || (delete qo.animationend.animation, delete qo.animationiteration.animation, delete qo.animationstart.animation), "TransitionEvent" in window || delete qo.transitionend.transition);
  function sf(r) {
    if (Vr[r]) return Vr[r];
    if (!qo[r]) return r;
    var i = qo[r], s;
    for (s in i) if (i.hasOwnProperty(s) && s in Ep) return Vr[r] = i[s];
    return r;
  }
  var Xh = sf("animationend"), Kh = sf("animationiteration"), Zh = sf("animationstart"), Jh = sf("transitionend"), xp = /* @__PURE__ */ new Map(), cf = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ui(r, i) {
    xp.set(r, i), m(i, [r]);
  }
  for (var wp = 0; wp < cf.length; wp++) {
    var Yo = cf[wp], p1 = Yo.toLowerCase(), v1 = Yo[0].toUpperCase() + Yo.slice(1);
    ui(p1, "on" + v1);
  }
  ui(Xh, "onAnimationEnd"), ui(Kh, "onAnimationIteration"), ui(Zh, "onAnimationStart"), ui("dblclick", "onDoubleClick"), ui("focusin", "onFocus"), ui("focusout", "onBlur"), ui(Jh, "onTransitionEnd"), v("onMouseEnter", ["mouseout", "mouseover"]), v("onMouseLeave", ["mouseout", "mouseover"]), v("onPointerEnter", ["pointerout", "pointerover"]), v("onPointerLeave", ["pointerout", "pointerover"]), m("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), m("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), m("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), m("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Gs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Cp = new Set("cancel close invalid load scroll toggle".split(" ").concat(Gs));
  function ff(r, i, s) {
    var d = r.type || "unknown-event";
    r.currentTarget = s, ot(d, i, void 0, r), r.currentTarget = null;
  }
  function Wo(r, i) {
    i = (i & 4) !== 0;
    for (var s = 0; s < r.length; s++) {
      var d = r[s], y = d.event;
      d = d.listeners;
      e: {
        var w = void 0;
        if (i) for (var O = d.length - 1; 0 <= O; O--) {
          var I = d[O], K = I.instance, ye = I.currentTarget;
          if (I = I.listener, K !== w && y.isPropagationStopped()) break e;
          ff(y, I, ye), w = K;
        }
        else for (O = 0; O < d.length; O++) {
          if (I = d[O], K = I.instance, ye = I.currentTarget, I = I.listener, K !== w && y.isPropagationStopped()) break e;
          ff(y, I, ye), w = K;
        }
      }
    }
    if (Lr) throw r = B, Lr = !1, B = null, r;
  }
  function kn(r, i) {
    var s = i[Zs];
    s === void 0 && (s = i[Zs] = /* @__PURE__ */ new Set());
    var d = r + "__bubble";
    s.has(d) || (em(i, r, 2, !1), s.add(d));
  }
  function df(r, i, s) {
    var d = 0;
    i && (d |= 4), em(s, r, d, i);
  }
  var pf = "_reactListening" + Math.random().toString(36).slice(2);
  function Yu(r) {
    if (!r[pf]) {
      r[pf] = !0, f.forEach(function(s) {
        s !== "selectionchange" && (Cp.has(s) || df(s, !1, r), df(s, !0, r));
      });
      var i = r.nodeType === 9 ? r : r.ownerDocument;
      i === null || i[pf] || (i[pf] = !0, df("selectionchange", !1, i));
    }
  }
  function em(r, i, s, d) {
    switch ($u(i)) {
      case 1:
        var y = ju;
        break;
      case 4:
        y = Fu;
        break;
      default:
        y = no;
    }
    s = y.bind(null, i, s, r), y = void 0, !Ar || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (y = !0), d ? y !== void 0 ? r.addEventListener(i, s, { capture: !0, passive: y }) : r.addEventListener(i, s, !0) : y !== void 0 ? r.addEventListener(i, s, { passive: y }) : r.addEventListener(i, s, !1);
  }
  function vf(r, i, s, d, y) {
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
          if (O = Go(I), O === null) return;
          if (K = O.tag, K === 5 || K === 6) {
            d = w = O;
            continue e;
          }
          I = I.parentNode;
        }
      }
      d = d.return;
    }
    Mi(function() {
      var ye = w, Ue = dt(s), $e = [];
      e: {
        var Ne = xp.get(r);
        if (Ne !== void 0) {
          var st = un, mt = r;
          switch (r) {
            case "keypress":
              if (Se(s) === 0) break e;
            case "keydown":
            case "keyup":
              st = fp;
              break;
            case "focusin":
              mt = "focus", st = Vo;
              break;
            case "focusout":
              mt = "blur", st = Vo;
              break;
            case "beforeblur":
            case "afterblur":
              st = Vo;
              break;
            case "click":
              if (s.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              st = ro;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              st = wl;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              st = zh;
              break;
            case Xh:
            case Kh:
            case Zh:
              st = nf;
              break;
            case Jh:
              st = bl;
              break;
            case "scroll":
              st = Fn;
              break;
            case "wheel":
              st = Tl;
              break;
            case "copy":
            case "cut":
            case "paste":
              st = Oh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              st = Nh;
          }
          var St = (i & 4) !== 0, fr = !St && r === "scroll", se = St ? Ne !== null ? Ne + "Capture" : null : Ne;
          St = [];
          for (var ee = ye, pe; ee !== null; ) {
            pe = ee;
            var je = pe.stateNode;
            if (pe.tag === 5 && je !== null && (pe = je, se !== null && (je = Tr(ee, se), je != null && St.push(Wu(ee, je, pe)))), fr) break;
            ee = ee.return;
          }
          0 < St.length && (Ne = new st(Ne, mt, null, s, Ue), $e.push({ event: Ne, listeners: St }));
        }
      }
      if ((i & 7) === 0) {
        e: {
          if (Ne = r === "mouseover" || r === "pointerover", st = r === "mouseout" || r === "pointerout", Ne && s !== Ae && (mt = s.relatedTarget || s.fromElement) && (Go(mt) || mt[Rl])) break e;
          if ((st || Ne) && (Ne = Ue.window === Ue ? Ue : (Ne = Ue.ownerDocument) ? Ne.defaultView || Ne.parentWindow : window, st ? (mt = s.relatedTarget || s.toElement, st = ye, mt = mt ? Go(mt) : null, mt !== null && (fr = It(mt), mt !== fr || mt.tag !== 5 && mt.tag !== 6) && (mt = null)) : (st = null, mt = ye), st !== mt)) {
            if (St = ro, je = "onMouseLeave", se = "onMouseEnter", ee = "mouse", (r === "pointerout" || r === "pointerover") && (St = Nh, je = "onPointerLeave", se = "onPointerEnter", ee = "pointer"), fr = st == null ? Ne : Ni(st), pe = mt == null ? Ne : Ni(mt), Ne = new St(je, ee + "leave", st, s, Ue), Ne.target = fr, Ne.relatedTarget = pe, je = null, Go(Ue) === ye && (St = new St(se, ee + "enter", mt, s, Ue), St.target = pe, St.relatedTarget = fr, je = St), fr = je, st && mt) t: {
              for (St = st, se = mt, ee = 0, pe = St; pe; pe = io(pe)) ee++;
              for (pe = 0, je = se; je; je = io(je)) pe++;
              for (; 0 < ee - pe; ) St = io(St), ee--;
              for (; 0 < pe - ee; ) se = io(se), pe--;
              for (; ee--; ) {
                if (St === se || se !== null && St === se.alternate) break t;
                St = io(St), se = io(se);
              }
              St = null;
            }
            else St = null;
            st !== null && tm($e, Ne, st, St, !1), mt !== null && fr !== null && tm($e, fr, mt, St, !0);
          }
        }
        e: {
          if (Ne = ye ? Ni(ye) : window, st = Ne.nodeName && Ne.nodeName.toLowerCase(), st === "select" || st === "input" && Ne.type === "file") var yt = u1;
          else if (Hh(Ne)) if (Ih) yt = Gh;
          else {
            yt = Bh;
            var zt = s1;
          }
          else (st = Ne.nodeName) && st.toLowerCase() === "input" && (Ne.type === "checkbox" || Ne.type === "radio") && (yt = c1);
          if (yt && (yt = yt(r, ye))) {
            vp($e, yt, s, Ue);
            break e;
          }
          zt && zt(r, Ne, ye), r === "focusout" && (zt = Ne._wrapperState) && zt.controlled && Ne.type === "number" && Ut(Ne, "number", Ne.value);
        }
        switch (zt = ye ? Ni(ye) : window, r) {
          case "focusin":
            (Hh(zt) || zt.contentEditable === "true") && (qu = zt, yp = ye, Bs = null);
            break;
          case "focusout":
            Bs = yp = qu = null;
            break;
          case "mousedown":
            gp = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            gp = !1, Sp($e, s, Ue);
            break;
          case "selectionchange":
            if (d1) break;
          case "keydown":
          case "keyup":
            Sp($e, s, Ue);
        }
        var Ft;
        if (Hu) e: {
          switch (r) {
            case "compositionstart":
              var Yt = "onCompositionStart";
              break e;
            case "compositionend":
              Yt = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Yt = "onCompositionUpdate";
              break e;
          }
          Yt = void 0;
        }
        else Vu ? Fh(r, s) && (Yt = "onCompositionEnd") : r === "keydown" && s.keyCode === 229 && (Yt = "onCompositionStart");
        Yt && (Uh && s.locale !== "ko" && (Vu || Yt !== "onCompositionStart" ? Yt === "onCompositionEnd" && Vu && (Ft = me()) : (Ai = Ue, D = "value" in Ai ? Ai.value : Ai.textContent, Vu = !0)), zt = Qs(ye, Yt), 0 < zt.length && (Yt = new up(Yt, r, null, s, Ue), $e.push({ event: Yt, listeners: zt }), Ft ? Yt.data = Ft : (Ft = Ph(s), Ft !== null && (Yt.data = Ft)))), (Ft = Is ? $h(r, s) : l1(r, s)) && (ye = Qs(ye, "onBeforeInput"), 0 < ye.length && (Ue = new up("onBeforeInput", "beforeinput", null, s, Ue), $e.push({ event: Ue, listeners: ye }), Ue.data = Ft));
      }
      Wo($e, i);
    });
  }
  function Wu(r, i, s) {
    return { instance: r, listener: i, currentTarget: s };
  }
  function Qs(r, i) {
    for (var s = i + "Capture", d = []; r !== null; ) {
      var y = r, w = y.stateNode;
      y.tag === 5 && w !== null && (y = w, w = Tr(r, s), w != null && d.unshift(Wu(r, w, y)), w = Tr(r, i), w != null && d.push(Wu(r, w, y))), r = r.return;
    }
    return d;
  }
  function io(r) {
    if (r === null) return null;
    do
      r = r.return;
    while (r && r.tag !== 5);
    return r || null;
  }
  function tm(r, i, s, d, y) {
    for (var w = i._reactName, O = []; s !== null && s !== d; ) {
      var I = s, K = I.alternate, ye = I.stateNode;
      if (K !== null && K === d) break;
      I.tag === 5 && ye !== null && (I = ye, y ? (K = Tr(s, w), K != null && O.unshift(Wu(s, K, I))) : y || (K = Tr(s, w), K != null && O.push(Wu(s, K, I)))), s = s.return;
    }
    O.length !== 0 && r.push({ event: i, listeners: O });
  }
  var nm = /\r\n?/g, h1 = /\u0000|\uFFFD/g;
  function rm(r) {
    return (typeof r == "string" ? r : "" + r).replace(nm, `
`).replace(h1, "");
  }
  function hf(r, i, s) {
    if (i = rm(i), rm(r) !== i && s) throw Error(u(425));
  }
  function lo() {
  }
  var Xs = null, Bo = null;
  function mf(r, i) {
    return r === "textarea" || r === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  }
  var yf = typeof setTimeout == "function" ? setTimeout : void 0, bp = typeof clearTimeout == "function" ? clearTimeout : void 0, am = typeof Promise == "function" ? Promise : void 0, Bu = typeof queueMicrotask == "function" ? queueMicrotask : typeof am < "u" ? function(r) {
    return am.resolve(null).then(r).catch(gf);
  } : yf;
  function gf(r) {
    setTimeout(function() {
      throw r;
    });
  }
  function Gu(r, i) {
    var s = i, d = 0;
    do {
      var y = s.nextSibling;
      if (r.removeChild(s), y && y.nodeType === 8) if (s = y.data, s === "/$") {
        if (d === 0) {
          r.removeChild(y), Oi(i);
          return;
        }
        d--;
      } else s !== "$" && s !== "$?" && s !== "$!" || d++;
      s = y;
    } while (s);
    Oi(i);
  }
  function Xi(r) {
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
  function im(r) {
    r = r.previousSibling;
    for (var i = 0; r; ) {
      if (r.nodeType === 8) {
        var s = r.data;
        if (s === "$" || s === "$!" || s === "$?") {
          if (i === 0) return r;
          i--;
        } else s === "/$" && i++;
      }
      r = r.previousSibling;
    }
    return null;
  }
  var oo = Math.random().toString(36).slice(2), Ki = "__reactFiber$" + oo, Ks = "__reactProps$" + oo, Rl = "__reactContainer$" + oo, Zs = "__reactEvents$" + oo, Qu = "__reactListeners$" + oo, m1 = "__reactHandles$" + oo;
  function Go(r) {
    var i = r[Ki];
    if (i) return i;
    for (var s = r.parentNode; s; ) {
      if (i = s[Rl] || s[Ki]) {
        if (s = i.alternate, i.child !== null || s !== null && s.child !== null) for (r = im(r); r !== null; ) {
          if (s = r[Ki]) return s;
          r = im(r);
        }
        return i;
      }
      r = s, s = r.parentNode;
    }
    return null;
  }
  function kt(r) {
    return r = r[Ki] || r[Rl], !r || r.tag !== 5 && r.tag !== 6 && r.tag !== 13 && r.tag !== 3 ? null : r;
  }
  function Ni(r) {
    if (r.tag === 5 || r.tag === 6) return r.stateNode;
    throw Error(u(33));
  }
  function er(r) {
    return r[Ks] || null;
  }
  var pn = [], si = -1;
  function ci(r) {
    return { current: r };
  }
  function Pn(r) {
    0 > si || (r.current = pn[si], pn[si] = null, si--);
  }
  function _t(r, i) {
    si++, pn[si] = r.current, r.current = i;
  }
  var ea = {}, ir = ci(ea), _r = ci(!1), ka = ea;
  function Da(r, i) {
    var s = r.type.contextTypes;
    if (!s) return ea;
    var d = r.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === i) return d.__reactInternalMemoizedMaskedChildContext;
    var y = {}, w;
    for (w in s) y[w] = i[w];
    return d && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = i, r.__reactInternalMemoizedMaskedChildContext = y), y;
  }
  function mr(r) {
    return r = r.childContextTypes, r != null;
  }
  function Xu() {
    Pn(_r), Pn(ir);
  }
  function lm(r, i, s) {
    if (ir.current !== ea) throw Error(u(168));
    _t(ir, i), _t(_r, s);
  }
  function Js(r, i, s) {
    var d = r.stateNode;
    if (i = i.childContextTypes, typeof d.getChildContext != "function") return s;
    d = d.getChildContext();
    for (var y in d) if (!(y in i)) throw Error(u(108, Pe(r) || "Unknown", y));
    return he({}, s, d);
  }
  function Nr(r) {
    return r = (r = r.stateNode) && r.__reactInternalMemoizedMergedChildContext || ea, ka = ir.current, _t(ir, r), _t(_r, _r.current), !0;
  }
  function Sf(r, i, s) {
    var d = r.stateNode;
    if (!d) throw Error(u(169));
    s ? (r = Js(r, i, ka), d.__reactInternalMemoizedMergedChildContext = r, Pn(_r), Pn(ir), _t(ir, r)) : Pn(_r), _t(_r, s);
  }
  var Zi = null, Ku = !1, Ml = !1;
  function Ef(r) {
    Zi === null ? Zi = [r] : Zi.push(r);
  }
  function uo(r) {
    Ku = !0, Ef(r);
  }
  function Ji() {
    if (!Ml && Zi !== null) {
      Ml = !0;
      var r = 0, i = Cn;
      try {
        var s = Zi;
        for (Cn = 1; r < s.length; r++) {
          var d = s[r];
          do
            d = d(!0);
          while (d !== null);
        }
        Zi = null, Ku = !1;
      } catch (y) {
        throw Zi !== null && (Zi = Zi.slice(r + 1)), xn(sa, Ji), y;
      } finally {
        Cn = i, Ml = !1;
      }
    }
    return null;
  }
  var so = [], co = 0, fo = null, _l = 0, yr = [], fi = 0, Wa = null, el = 1, tl = "";
  function Qo(r, i) {
    so[co++] = _l, so[co++] = fo, fo = r, _l = i;
  }
  function om(r, i, s) {
    yr[fi++] = el, yr[fi++] = tl, yr[fi++] = Wa, Wa = r;
    var d = el;
    r = tl;
    var y = 32 - $r(d) - 1;
    d &= ~(1 << y), s += 1;
    var w = 32 - $r(i) + y;
    if (30 < w) {
      var O = y - y % 5;
      w = (d & (1 << O) - 1).toString(32), d >>= O, y -= O, el = 1 << 32 - $r(i) + y | s << y | d, tl = w + r;
    } else el = 1 << w | s << y | d, tl = r;
  }
  function xf(r) {
    r.return !== null && (Qo(r, 1), om(r, 1, 0));
  }
  function wf(r) {
    for (; r === fo; ) fo = so[--co], so[co] = null, _l = so[--co], so[co] = null;
    for (; r === Wa; ) Wa = yr[--fi], yr[fi] = null, tl = yr[--fi], yr[fi] = null, el = yr[--fi], yr[fi] = null;
  }
  var Oa = null, Aa = null, Xn = !1, di = null;
  function Tp(r, i) {
    var s = yi(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = i, s.return = r, i = r.deletions, i === null ? (r.deletions = [s], r.flags |= 16) : i.push(s);
  }
  function um(r, i) {
    switch (r.tag) {
      case 5:
        var s = r.type;
        return i = i.nodeType !== 1 || s.toLowerCase() !== i.nodeName.toLowerCase() ? null : i, i !== null ? (r.stateNode = i, Oa = r, Aa = Xi(i.firstChild), !0) : !1;
      case 6:
        return i = r.pendingProps === "" || i.nodeType !== 3 ? null : i, i !== null ? (r.stateNode = i, Oa = r, Aa = null, !0) : !1;
      case 13:
        return i = i.nodeType !== 8 ? null : i, i !== null ? (s = Wa !== null ? { id: el, overflow: tl } : null, r.memoizedState = { dehydrated: i, treeContext: s, retryLane: 1073741824 }, s = yi(18, null, null, 0), s.stateNode = i, s.return = r, r.child = s, Oa = r, Aa = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Rp(r) {
    return (r.mode & 1) !== 0 && (r.flags & 128) === 0;
  }
  function Mp(r) {
    if (Xn) {
      var i = Aa;
      if (i) {
        var s = i;
        if (!um(r, i)) {
          if (Rp(r)) throw Error(u(418));
          i = Xi(s.nextSibling);
          var d = Oa;
          i && um(r, i) ? Tp(d, s) : (r.flags = r.flags & -4097 | 2, Xn = !1, Oa = r);
        }
      } else {
        if (Rp(r)) throw Error(u(418));
        r.flags = r.flags & -4097 | 2, Xn = !1, Oa = r;
      }
    }
  }
  function kr(r) {
    for (r = r.return; r !== null && r.tag !== 5 && r.tag !== 3 && r.tag !== 13; ) r = r.return;
    Oa = r;
  }
  function Cf(r) {
    if (r !== Oa) return !1;
    if (!Xn) return kr(r), Xn = !0, !1;
    var i;
    if ((i = r.tag !== 3) && !(i = r.tag !== 5) && (i = r.type, i = i !== "head" && i !== "body" && !mf(r.type, r.memoizedProps)), i && (i = Aa)) {
      if (Rp(r)) throw ec(), Error(u(418));
      for (; i; ) Tp(r, i), i = Xi(i.nextSibling);
    }
    if (kr(r), r.tag === 13) {
      if (r = r.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(u(317));
      e: {
        for (r = r.nextSibling, i = 0; r; ) {
          if (r.nodeType === 8) {
            var s = r.data;
            if (s === "/$") {
              if (i === 0) {
                Aa = Xi(r.nextSibling);
                break e;
              }
              i--;
            } else s !== "$" && s !== "$!" && s !== "$?" || i++;
          }
          r = r.nextSibling;
        }
        Aa = null;
      }
    } else Aa = Oa ? Xi(r.stateNode.nextSibling) : null;
    return !0;
  }
  function ec() {
    for (var r = Aa; r; ) r = Xi(r.nextSibling);
  }
  function po() {
    Aa = Oa = null, Xn = !1;
  }
  function kl(r) {
    di === null ? di = [r] : di.push(r);
  }
  var y1 = j.ReactCurrentBatchConfig;
  function Xo(r, i, s) {
    if (r = s.ref, r !== null && typeof r != "function" && typeof r != "object") {
      if (s._owner) {
        if (s = s._owner, s) {
          if (s.tag !== 1) throw Error(u(309));
          var d = s.stateNode;
        }
        if (!d) throw Error(u(147, r));
        var y = d, w = "" + r;
        return i !== null && i.ref !== null && typeof i.ref == "function" && i.ref._stringRef === w ? i.ref : (i = function(O) {
          var I = y.refs;
          O === null ? delete I[w] : I[w] = O;
        }, i._stringRef = w, i);
      }
      if (typeof r != "string") throw Error(u(284));
      if (!s._owner) throw Error(u(290, r));
    }
    return r;
  }
  function bf(r, i) {
    throw r = Object.prototype.toString.call(i), Error(u(31, r === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : r));
  }
  function sm(r) {
    var i = r._init;
    return i(r._payload);
  }
  function Ko(r) {
    function i(se, ee) {
      if (r) {
        var pe = se.deletions;
        pe === null ? (se.deletions = [ee], se.flags |= 16) : pe.push(ee);
      }
    }
    function s(se, ee) {
      if (!r) return null;
      for (; ee !== null; ) i(se, ee), ee = ee.sibling;
      return null;
    }
    function d(se, ee) {
      for (se = /* @__PURE__ */ new Map(); ee !== null; ) ee.key !== null ? se.set(ee.key, ee) : se.set(ee.index, ee), ee = ee.sibling;
      return se;
    }
    function y(se, ee) {
      return se = xo(se, ee), se.index = 0, se.sibling = null, se;
    }
    function w(se, ee, pe) {
      return se.index = pe, r ? (pe = se.alternate, pe !== null ? (pe = pe.index, pe < ee ? (se.flags |= 2, ee) : pe) : (se.flags |= 2, ee)) : (se.flags |= 1048576, ee);
    }
    function O(se) {
      return r && se.alternate === null && (se.flags |= 2), se;
    }
    function I(se, ee, pe, je) {
      return ee === null || ee.tag !== 6 ? (ee = av(pe, se.mode, je), ee.return = se, ee) : (ee = y(ee, pe), ee.return = se, ee);
    }
    function K(se, ee, pe, je) {
      var yt = pe.type;
      return yt === H ? Ue(se, ee, pe.props.children, je, pe.key) : ee !== null && (ee.elementType === yt || typeof yt == "object" && yt !== null && yt.$$typeof === de && sm(yt) === ee.type) ? (je = y(ee, pe.props), je.ref = Xo(se, ee, pe), je.return = se, je) : (je = Dc(pe.type, pe.key, pe.props, null, se.mode, je), je.ref = Xo(se, ee, pe), je.return = se, je);
    }
    function ye(se, ee, pe, je) {
      return ee === null || ee.tag !== 4 || ee.stateNode.containerInfo !== pe.containerInfo || ee.stateNode.implementation !== pe.implementation ? (ee = rd(pe, se.mode, je), ee.return = se, ee) : (ee = y(ee, pe.children || []), ee.return = se, ee);
    }
    function Ue(se, ee, pe, je, yt) {
      return ee === null || ee.tag !== 7 ? (ee = zl(pe, se.mode, je, yt), ee.return = se, ee) : (ee = y(ee, pe), ee.return = se, ee);
    }
    function $e(se, ee, pe) {
      if (typeof ee == "string" && ee !== "" || typeof ee == "number") return ee = av("" + ee, se.mode, pe), ee.return = se, ee;
      if (typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case V:
            return pe = Dc(ee.type, ee.key, ee.props, null, se.mode, pe), pe.ref = Xo(se, null, ee), pe.return = se, pe;
          case q:
            return ee = rd(ee, se.mode, pe), ee.return = se, ee;
          case de:
            var je = ee._init;
            return $e(se, je(ee._payload), pe);
        }
        if (bt(ee) || ue(ee)) return ee = zl(ee, se.mode, pe, null), ee.return = se, ee;
        bf(se, ee);
      }
      return null;
    }
    function Ne(se, ee, pe, je) {
      var yt = ee !== null ? ee.key : null;
      if (typeof pe == "string" && pe !== "" || typeof pe == "number") return yt !== null ? null : I(se, ee, "" + pe, je);
      if (typeof pe == "object" && pe !== null) {
        switch (pe.$$typeof) {
          case V:
            return pe.key === yt ? K(se, ee, pe, je) : null;
          case q:
            return pe.key === yt ? ye(se, ee, pe, je) : null;
          case de:
            return yt = pe._init, Ne(
              se,
              ee,
              yt(pe._payload),
              je
            );
        }
        if (bt(pe) || ue(pe)) return yt !== null ? null : Ue(se, ee, pe, je, null);
        bf(se, pe);
      }
      return null;
    }
    function st(se, ee, pe, je, yt) {
      if (typeof je == "string" && je !== "" || typeof je == "number") return se = se.get(pe) || null, I(ee, se, "" + je, yt);
      if (typeof je == "object" && je !== null) {
        switch (je.$$typeof) {
          case V:
            return se = se.get(je.key === null ? pe : je.key) || null, K(ee, se, je, yt);
          case q:
            return se = se.get(je.key === null ? pe : je.key) || null, ye(ee, se, je, yt);
          case de:
            var zt = je._init;
            return st(se, ee, pe, zt(je._payload), yt);
        }
        if (bt(je) || ue(je)) return se = se.get(pe) || null, Ue(ee, se, je, yt, null);
        bf(ee, je);
      }
      return null;
    }
    function mt(se, ee, pe, je) {
      for (var yt = null, zt = null, Ft = ee, Yt = ee = 0, jr = null; Ft !== null && Yt < pe.length; Yt++) {
        Ft.index > Yt ? (jr = Ft, Ft = null) : jr = Ft.sibling;
        var Rn = Ne(se, Ft, pe[Yt], je);
        if (Rn === null) {
          Ft === null && (Ft = jr);
          break;
        }
        r && Ft && Rn.alternate === null && i(se, Ft), ee = w(Rn, ee, Yt), zt === null ? yt = Rn : zt.sibling = Rn, zt = Rn, Ft = jr;
      }
      if (Yt === pe.length) return s(se, Ft), Xn && Qo(se, Yt), yt;
      if (Ft === null) {
        for (; Yt < pe.length; Yt++) Ft = $e(se, pe[Yt], je), Ft !== null && (ee = w(Ft, ee, Yt), zt === null ? yt = Ft : zt.sibling = Ft, zt = Ft);
        return Xn && Qo(se, Yt), yt;
      }
      for (Ft = d(se, Ft); Yt < pe.length; Yt++) jr = st(Ft, se, Yt, pe[Yt], je), jr !== null && (r && jr.alternate !== null && Ft.delete(jr.key === null ? Yt : jr.key), ee = w(jr, ee, Yt), zt === null ? yt = jr : zt.sibling = jr, zt = jr);
      return r && Ft.forEach(function(bo) {
        return i(se, bo);
      }), Xn && Qo(se, Yt), yt;
    }
    function St(se, ee, pe, je) {
      var yt = ue(pe);
      if (typeof yt != "function") throw Error(u(150));
      if (pe = yt.call(pe), pe == null) throw Error(u(151));
      for (var zt = yt = null, Ft = ee, Yt = ee = 0, jr = null, Rn = pe.next(); Ft !== null && !Rn.done; Yt++, Rn = pe.next()) {
        Ft.index > Yt ? (jr = Ft, Ft = null) : jr = Ft.sibling;
        var bo = Ne(se, Ft, Rn.value, je);
        if (bo === null) {
          Ft === null && (Ft = jr);
          break;
        }
        r && Ft && bo.alternate === null && i(se, Ft), ee = w(bo, ee, Yt), zt === null ? yt = bo : zt.sibling = bo, zt = bo, Ft = jr;
      }
      if (Rn.done) return s(
        se,
        Ft
      ), Xn && Qo(se, Yt), yt;
      if (Ft === null) {
        for (; !Rn.done; Yt++, Rn = pe.next()) Rn = $e(se, Rn.value, je), Rn !== null && (ee = w(Rn, ee, Yt), zt === null ? yt = Rn : zt.sibling = Rn, zt = Rn);
        return Xn && Qo(se, Yt), yt;
      }
      for (Ft = d(se, Ft); !Rn.done; Yt++, Rn = pe.next()) Rn = st(Ft, se, Yt, Rn.value, je), Rn !== null && (r && Rn.alternate !== null && Ft.delete(Rn.key === null ? Yt : Rn.key), ee = w(Rn, ee, Yt), zt === null ? yt = Rn : zt.sibling = Rn, zt = Rn);
      return r && Ft.forEach(function(Ym) {
        return i(se, Ym);
      }), Xn && Qo(se, Yt), yt;
    }
    function fr(se, ee, pe, je) {
      if (typeof pe == "object" && pe !== null && pe.type === H && pe.key === null && (pe = pe.props.children), typeof pe == "object" && pe !== null) {
        switch (pe.$$typeof) {
          case V:
            e: {
              for (var yt = pe.key, zt = ee; zt !== null; ) {
                if (zt.key === yt) {
                  if (yt = pe.type, yt === H) {
                    if (zt.tag === 7) {
                      s(se, zt.sibling), ee = y(zt, pe.props.children), ee.return = se, se = ee;
                      break e;
                    }
                  } else if (zt.elementType === yt || typeof yt == "object" && yt !== null && yt.$$typeof === de && sm(yt) === zt.type) {
                    s(se, zt.sibling), ee = y(zt, pe.props), ee.ref = Xo(se, zt, pe), ee.return = se, se = ee;
                    break e;
                  }
                  s(se, zt);
                  break;
                } else i(se, zt);
                zt = zt.sibling;
              }
              pe.type === H ? (ee = zl(pe.props.children, se.mode, je, pe.key), ee.return = se, se = ee) : (je = Dc(pe.type, pe.key, pe.props, null, se.mode, je), je.ref = Xo(se, ee, pe), je.return = se, se = je);
            }
            return O(se);
          case q:
            e: {
              for (zt = pe.key; ee !== null; ) {
                if (ee.key === zt) if (ee.tag === 4 && ee.stateNode.containerInfo === pe.containerInfo && ee.stateNode.implementation === pe.implementation) {
                  s(se, ee.sibling), ee = y(ee, pe.children || []), ee.return = se, se = ee;
                  break e;
                } else {
                  s(se, ee);
                  break;
                }
                else i(se, ee);
                ee = ee.sibling;
              }
              ee = rd(pe, se.mode, je), ee.return = se, se = ee;
            }
            return O(se);
          case de:
            return zt = pe._init, fr(se, ee, zt(pe._payload), je);
        }
        if (bt(pe)) return mt(se, ee, pe, je);
        if (ue(pe)) return St(se, ee, pe, je);
        bf(se, pe);
      }
      return typeof pe == "string" && pe !== "" || typeof pe == "number" ? (pe = "" + pe, ee !== null && ee.tag === 6 ? (s(se, ee.sibling), ee = y(ee, pe), ee.return = se, se = ee) : (s(se, ee), ee = av(pe, se.mode, je), ee.return = se, se = ee), O(se)) : s(se, ee);
    }
    return fr;
  }
  var or = Ko(!0), rt = Ko(!1), Ba = ci(null), La = null, Zu = null, _p = null;
  function kp() {
    _p = Zu = La = null;
  }
  function Dp(r) {
    var i = Ba.current;
    Pn(Ba), r._currentValue = i;
  }
  function Op(r, i, s) {
    for (; r !== null; ) {
      var d = r.alternate;
      if ((r.childLanes & i) !== i ? (r.childLanes |= i, d !== null && (d.childLanes |= i)) : d !== null && (d.childLanes & i) !== i && (d.childLanes |= i), r === s) break;
      r = r.return;
    }
  }
  function tr(r, i) {
    La = r, _p = Zu = null, r = r.dependencies, r !== null && r.firstContext !== null && ((r.lanes & i) !== 0 && (Sr = !0), r.firstContext = null);
  }
  function pi(r) {
    var i = r._currentValue;
    if (_p !== r) if (r = { context: r, memoizedValue: i, next: null }, Zu === null) {
      if (La === null) throw Error(u(308));
      Zu = r, La.dependencies = { lanes: 0, firstContext: r };
    } else Zu = Zu.next = r;
    return i;
  }
  var Zo = null;
  function Ap(r) {
    Zo === null ? Zo = [r] : Zo.push(r);
  }
  function Lp(r, i, s, d) {
    var y = i.interleaved;
    return y === null ? (s.next = s, Ap(i)) : (s.next = y.next, y.next = s), i.interleaved = s, Ga(r, d);
  }
  function Ga(r, i) {
    r.lanes |= i;
    var s = r.alternate;
    for (s !== null && (s.lanes |= i), s = r, r = r.return; r !== null; ) r.childLanes |= i, s = r.alternate, s !== null && (s.childLanes |= i), s = r, r = r.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  var Qa = !1;
  function Np(r) {
    r.updateQueue = { baseState: r.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function cm(r, i) {
    r = r.updateQueue, i.updateQueue === r && (i.updateQueue = { baseState: r.baseState, firstBaseUpdate: r.firstBaseUpdate, lastBaseUpdate: r.lastBaseUpdate, shared: r.shared, effects: r.effects });
  }
  function Dl(r, i) {
    return { eventTime: r, lane: i, tag: 0, payload: null, callback: null, next: null };
  }
  function vo(r, i, s) {
    var d = r.updateQueue;
    if (d === null) return null;
    if (d = d.shared, (vn & 2) !== 0) {
      var y = d.pending;
      return y === null ? i.next = i : (i.next = y.next, y.next = i), d.pending = i, Ga(r, s);
    }
    return y = d.interleaved, y === null ? (i.next = i, Ap(d)) : (i.next = y.next, y.next = i), d.interleaved = i, Ga(r, s);
  }
  function Tf(r, i, s) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (s & 4194240) !== 0)) {
      var d = i.lanes;
      d &= r.pendingLanes, s |= d, i.lanes = s, xl(r, s);
    }
  }
  function fm(r, i) {
    var s = r.updateQueue, d = r.alternate;
    if (d !== null && (d = d.updateQueue, s === d)) {
      var y = null, w = null;
      if (s = s.firstBaseUpdate, s !== null) {
        do {
          var O = { eventTime: s.eventTime, lane: s.lane, tag: s.tag, payload: s.payload, callback: s.callback, next: null };
          w === null ? y = w = O : w = w.next = O, s = s.next;
        } while (s !== null);
        w === null ? y = w = i : w = w.next = i;
      } else y = w = i;
      s = { baseState: d.baseState, firstBaseUpdate: y, lastBaseUpdate: w, shared: d.shared, effects: d.effects }, r.updateQueue = s;
      return;
    }
    r = s.lastBaseUpdate, r === null ? s.firstBaseUpdate = i : r.next = i, s.lastBaseUpdate = i;
  }
  function tc(r, i, s, d) {
    var y = r.updateQueue;
    Qa = !1;
    var w = y.firstBaseUpdate, O = y.lastBaseUpdate, I = y.shared.pending;
    if (I !== null) {
      y.shared.pending = null;
      var K = I, ye = K.next;
      K.next = null, O === null ? w = ye : O.next = ye, O = K;
      var Ue = r.alternate;
      Ue !== null && (Ue = Ue.updateQueue, I = Ue.lastBaseUpdate, I !== O && (I === null ? Ue.firstBaseUpdate = ye : I.next = ye, Ue.lastBaseUpdate = K));
    }
    if (w !== null) {
      var $e = y.baseState;
      O = 0, Ue = ye = K = null, I = w;
      do {
        var Ne = I.lane, st = I.eventTime;
        if ((d & Ne) === Ne) {
          Ue !== null && (Ue = Ue.next = {
            eventTime: st,
            lane: 0,
            tag: I.tag,
            payload: I.payload,
            callback: I.callback,
            next: null
          });
          e: {
            var mt = r, St = I;
            switch (Ne = i, st = s, St.tag) {
              case 1:
                if (mt = St.payload, typeof mt == "function") {
                  $e = mt.call(st, $e, Ne);
                  break e;
                }
                $e = mt;
                break e;
              case 3:
                mt.flags = mt.flags & -65537 | 128;
              case 0:
                if (mt = St.payload, Ne = typeof mt == "function" ? mt.call(st, $e, Ne) : mt, Ne == null) break e;
                $e = he({}, $e, Ne);
                break e;
              case 2:
                Qa = !0;
            }
          }
          I.callback !== null && I.lane !== 0 && (r.flags |= 64, Ne = y.effects, Ne === null ? y.effects = [I] : Ne.push(I));
        } else st = { eventTime: st, lane: Ne, tag: I.tag, payload: I.payload, callback: I.callback, next: null }, Ue === null ? (ye = Ue = st, K = $e) : Ue = Ue.next = st, O |= Ne;
        if (I = I.next, I === null) {
          if (I = y.shared.pending, I === null) break;
          Ne = I, I = Ne.next, Ne.next = null, y.lastBaseUpdate = Ne, y.shared.pending = null;
        }
      } while (!0);
      if (Ue === null && (K = $e), y.baseState = K, y.firstBaseUpdate = ye, y.lastBaseUpdate = Ue, i = y.shared.interleaved, i !== null) {
        y = i;
        do
          O |= y.lane, y = y.next;
        while (y !== i);
      } else w === null && (y.shared.lanes = 0);
      ll |= O, r.lanes = O, r.memoizedState = $e;
    }
  }
  function zp(r, i, s) {
    if (r = i.effects, i.effects = null, r !== null) for (i = 0; i < r.length; i++) {
      var d = r[i], y = d.callback;
      if (y !== null) {
        if (d.callback = null, d = s, typeof y != "function") throw Error(u(191, y));
        y.call(d);
      }
    }
  }
  var nc = {}, nl = ci(nc), rc = ci(nc), ac = ci(nc);
  function Jo(r) {
    if (r === nc) throw Error(u(174));
    return r;
  }
  function Up(r, i) {
    switch (_t(ac, i), _t(rc, r), _t(nl, nc), r = i.nodeType, r) {
      case 9:
      case 11:
        i = (i = i.documentElement) ? i.namespaceURI : Ct(null, "");
        break;
      default:
        r = r === 8 ? i.parentNode : i, i = r.namespaceURI || null, r = r.tagName, i = Ct(i, r);
    }
    Pn(nl), _t(nl, i);
  }
  function eu() {
    Pn(nl), Pn(rc), Pn(ac);
  }
  function dm(r) {
    Jo(ac.current);
    var i = Jo(nl.current), s = Ct(i, r.type);
    i !== s && (_t(rc, r), _t(nl, s));
  }
  function Rf(r) {
    rc.current === r && (Pn(nl), Pn(rc));
  }
  var nr = ci(0);
  function Mf(r) {
    for (var i = r; i !== null; ) {
      if (i.tag === 13) {
        var s = i.memoizedState;
        if (s !== null && (s = s.dehydrated, s === null || s.data === "$?" || s.data === "$!")) return i;
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
  var ic = [];
  function Dt() {
    for (var r = 0; r < ic.length; r++) ic[r]._workInProgressVersionPrimary = null;
    ic.length = 0;
  }
  var ln = j.ReactCurrentDispatcher, bn = j.ReactCurrentBatchConfig, Nn = 0, Tn = null, gr = null, zr = null, _f = !1, lc = !1, tu = 0, Le = 0;
  function wn() {
    throw Error(u(321));
  }
  function $t(r, i) {
    if (i === null) return !1;
    for (var s = 0; s < i.length && s < r.length; s++) if (!Li(r[s], i[s])) return !1;
    return !0;
  }
  function ho(r, i, s, d, y, w) {
    if (Nn = w, Tn = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, ln.current = r === null || r.memoizedState === null ? If : dc, r = s(d, y), lc) {
      w = 0;
      do {
        if (lc = !1, tu = 0, 25 <= w) throw Error(u(301));
        w += 1, zr = gr = null, i.updateQueue = null, ln.current = qf, r = s(d, y);
      } while (lc);
    }
    if (ln.current = lu, i = gr !== null && gr.next !== null, Nn = 0, zr = gr = Tn = null, _f = !1, i) throw Error(u(300));
    return r;
  }
  function zi() {
    var r = tu !== 0;
    return tu = 0, r;
  }
  function ta() {
    var r = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return zr === null ? Tn.memoizedState = zr = r : zr = zr.next = r, zr;
  }
  function ur() {
    if (gr === null) {
      var r = Tn.alternate;
      r = r !== null ? r.memoizedState : null;
    } else r = gr.next;
    var i = zr === null ? Tn.memoizedState : zr.next;
    if (i !== null) zr = i, gr = r;
    else {
      if (r === null) throw Error(u(310));
      gr = r, r = { memoizedState: gr.memoizedState, baseState: gr.baseState, baseQueue: gr.baseQueue, queue: gr.queue, next: null }, zr === null ? Tn.memoizedState = zr = r : zr = zr.next = r;
    }
    return zr;
  }
  function Ol(r, i) {
    return typeof i == "function" ? i(r) : i;
  }
  function mo(r) {
    var i = ur(), s = i.queue;
    if (s === null) throw Error(u(311));
    s.lastRenderedReducer = r;
    var d = gr, y = d.baseQueue, w = s.pending;
    if (w !== null) {
      if (y !== null) {
        var O = y.next;
        y.next = w.next, w.next = O;
      }
      d.baseQueue = y = w, s.pending = null;
    }
    if (y !== null) {
      w = y.next, d = d.baseState;
      var I = O = null, K = null, ye = w;
      do {
        var Ue = ye.lane;
        if ((Nn & Ue) === Ue) K !== null && (K = K.next = { lane: 0, action: ye.action, hasEagerState: ye.hasEagerState, eagerState: ye.eagerState, next: null }), d = ye.hasEagerState ? ye.eagerState : r(d, ye.action);
        else {
          var $e = {
            lane: Ue,
            action: ye.action,
            hasEagerState: ye.hasEagerState,
            eagerState: ye.eagerState,
            next: null
          };
          K === null ? (I = K = $e, O = d) : K = K.next = $e, Tn.lanes |= Ue, ll |= Ue;
        }
        ye = ye.next;
      } while (ye !== null && ye !== w);
      K === null ? O = d : K.next = I, Li(d, i.memoizedState) || (Sr = !0), i.memoizedState = d, i.baseState = O, i.baseQueue = K, s.lastRenderedState = d;
    }
    if (r = s.interleaved, r !== null) {
      y = r;
      do
        w = y.lane, Tn.lanes |= w, ll |= w, y = y.next;
      while (y !== r);
    } else y === null && (s.lanes = 0);
    return [i.memoizedState, s.dispatch];
  }
  function nu(r) {
    var i = ur(), s = i.queue;
    if (s === null) throw Error(u(311));
    s.lastRenderedReducer = r;
    var d = s.dispatch, y = s.pending, w = i.memoizedState;
    if (y !== null) {
      s.pending = null;
      var O = y = y.next;
      do
        w = r(w, O.action), O = O.next;
      while (O !== y);
      Li(w, i.memoizedState) || (Sr = !0), i.memoizedState = w, i.baseQueue === null && (i.baseState = w), s.lastRenderedState = w;
    }
    return [w, d];
  }
  function kf() {
  }
  function Df(r, i) {
    var s = Tn, d = ur(), y = i(), w = !Li(d.memoizedState, y);
    if (w && (d.memoizedState = y, Sr = !0), d = d.queue, oc(Lf.bind(null, s, d, r), [r]), d.getSnapshot !== i || w || zr !== null && zr.memoizedState.tag & 1) {
      if (s.flags |= 2048, ru(9, Af.bind(null, s, d, y, i), void 0, null), Dr === null) throw Error(u(349));
      (Nn & 30) !== 0 || Of(s, i, y);
    }
    return y;
  }
  function Of(r, i, s) {
    r.flags |= 16384, r = { getSnapshot: i, value: s }, i = Tn.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Tn.updateQueue = i, i.stores = [r]) : (s = i.stores, s === null ? i.stores = [r] : s.push(r));
  }
  function Af(r, i, s, d) {
    i.value = s, i.getSnapshot = d, Nf(i) && zf(r);
  }
  function Lf(r, i, s) {
    return s(function() {
      Nf(i) && zf(r);
    });
  }
  function Nf(r) {
    var i = r.getSnapshot;
    r = r.value;
    try {
      var s = i();
      return !Li(r, s);
    } catch {
      return !0;
    }
  }
  function zf(r) {
    var i = Ga(r, 1);
    i !== null && ma(i, r, 1, -1);
  }
  function Uf(r) {
    var i = ta();
    return typeof r == "function" && (r = r()), i.memoizedState = i.baseState = r, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ol, lastRenderedState: r }, i.queue = r, r = r.dispatch = iu.bind(null, Tn, r), [i.memoizedState, r];
  }
  function ru(r, i, s, d) {
    return r = { tag: r, create: i, destroy: s, deps: d, next: null }, i = Tn.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Tn.updateQueue = i, i.lastEffect = r.next = r) : (s = i.lastEffect, s === null ? i.lastEffect = r.next = r : (d = s.next, s.next = r, r.next = d, i.lastEffect = r)), r;
  }
  function jf() {
    return ur().memoizedState;
  }
  function Ju(r, i, s, d) {
    var y = ta();
    Tn.flags |= r, y.memoizedState = ru(1 | i, s, void 0, d === void 0 ? null : d);
  }
  function es(r, i, s, d) {
    var y = ur();
    d = d === void 0 ? null : d;
    var w = void 0;
    if (gr !== null) {
      var O = gr.memoizedState;
      if (w = O.destroy, d !== null && $t(d, O.deps)) {
        y.memoizedState = ru(i, s, w, d);
        return;
      }
    }
    Tn.flags |= r, y.memoizedState = ru(1 | i, s, w, d);
  }
  function Ff(r, i) {
    return Ju(8390656, 8, r, i);
  }
  function oc(r, i) {
    return es(2048, 8, r, i);
  }
  function Pf(r, i) {
    return es(4, 2, r, i);
  }
  function uc(r, i) {
    return es(4, 4, r, i);
  }
  function au(r, i) {
    if (typeof i == "function") return r = r(), i(r), function() {
      i(null);
    };
    if (i != null) return r = r(), i.current = r, function() {
      i.current = null;
    };
  }
  function $f(r, i, s) {
    return s = s != null ? s.concat([r]) : null, es(4, 4, au.bind(null, i, r), s);
  }
  function sc() {
  }
  function Hf(r, i) {
    var s = ur();
    i = i === void 0 ? null : i;
    var d = s.memoizedState;
    return d !== null && i !== null && $t(i, d[1]) ? d[0] : (s.memoizedState = [r, i], r);
  }
  function Vf(r, i) {
    var s = ur();
    i = i === void 0 ? null : i;
    var d = s.memoizedState;
    return d !== null && i !== null && $t(i, d[1]) ? d[0] : (r = r(), s.memoizedState = [r, i], r);
  }
  function jp(r, i, s) {
    return (Nn & 21) === 0 ? (r.baseState && (r.baseState = !1, Sr = !0), r.memoizedState = s) : (Li(s, i) || (s = Lu(), Tn.lanes |= s, ll |= s, r.baseState = !0), i);
  }
  function cc(r, i) {
    var s = Cn;
    Cn = s !== 0 && 4 > s ? s : 4, r(!0);
    var d = bn.transition;
    bn.transition = {};
    try {
      r(!1), i();
    } finally {
      Cn = s, bn.transition = d;
    }
  }
  function Fp() {
    return ur().memoizedState;
  }
  function fc(r, i, s) {
    var d = ol(r);
    if (s = { lane: d, action: s, hasEagerState: !1, eagerState: null, next: null }, Na(r)) pm(i, s);
    else if (s = Lp(r, i, s, d), s !== null) {
      var y = wr();
      ma(s, r, d, y), jn(s, i, d);
    }
  }
  function iu(r, i, s) {
    var d = ol(r), y = { lane: d, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (Na(r)) pm(i, y);
    else {
      var w = r.alternate;
      if (r.lanes === 0 && (w === null || w.lanes === 0) && (w = i.lastRenderedReducer, w !== null)) try {
        var O = i.lastRenderedState, I = w(O, s);
        if (y.hasEagerState = !0, y.eagerState = I, Li(I, O)) {
          var K = i.interleaved;
          K === null ? (y.next = y, Ap(i)) : (y.next = K.next, K.next = y), i.interleaved = y;
          return;
        }
      } catch {
      }
      s = Lp(r, i, y, d), s !== null && (y = wr(), ma(s, r, d, y), jn(s, i, d));
    }
  }
  function Na(r) {
    var i = r.alternate;
    return r === Tn || i !== null && i === Tn;
  }
  function pm(r, i) {
    lc = _f = !0;
    var s = r.pending;
    s === null ? i.next = i : (i.next = s.next, s.next = i), r.pending = i;
  }
  function jn(r, i, s) {
    if ((s & 4194240) !== 0) {
      var d = i.lanes;
      d &= r.pendingLanes, s |= d, i.lanes = s, xl(r, s);
    }
  }
  var lu = { readContext: pi, useCallback: wn, useContext: wn, useEffect: wn, useImperativeHandle: wn, useInsertionEffect: wn, useLayoutEffect: wn, useMemo: wn, useReducer: wn, useRef: wn, useState: wn, useDebugValue: wn, useDeferredValue: wn, useTransition: wn, useMutableSource: wn, useSyncExternalStore: wn, useId: wn, unstable_isNewReconciler: !1 }, If = { readContext: pi, useCallback: function(r, i) {
    return ta().memoizedState = [r, i === void 0 ? null : i], r;
  }, useContext: pi, useEffect: Ff, useImperativeHandle: function(r, i, s) {
    return s = s != null ? s.concat([r]) : null, Ju(
      4194308,
      4,
      au.bind(null, i, r),
      s
    );
  }, useLayoutEffect: function(r, i) {
    return Ju(4194308, 4, r, i);
  }, useInsertionEffect: function(r, i) {
    return Ju(4, 2, r, i);
  }, useMemo: function(r, i) {
    var s = ta();
    return i = i === void 0 ? null : i, r = r(), s.memoizedState = [r, i], r;
  }, useReducer: function(r, i, s) {
    var d = ta();
    return i = s !== void 0 ? s(i) : i, d.memoizedState = d.baseState = i, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: r, lastRenderedState: i }, d.queue = r, r = r.dispatch = fc.bind(null, Tn, r), [d.memoizedState, r];
  }, useRef: function(r) {
    var i = ta();
    return r = { current: r }, i.memoizedState = r;
  }, useState: Uf, useDebugValue: sc, useDeferredValue: function(r) {
    return ta().memoizedState = r;
  }, useTransition: function() {
    var r = Uf(!1), i = r[0];
    return r = cc.bind(null, r[1]), ta().memoizedState = r, [i, r];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(r, i, s) {
    var d = Tn, y = ta();
    if (Xn) {
      if (s === void 0) throw Error(u(407));
      s = s();
    } else {
      if (s = i(), Dr === null) throw Error(u(349));
      (Nn & 30) !== 0 || Of(d, i, s);
    }
    y.memoizedState = s;
    var w = { value: s, getSnapshot: i };
    return y.queue = w, Ff(Lf.bind(
      null,
      d,
      w,
      r
    ), [r]), d.flags |= 2048, ru(9, Af.bind(null, d, w, s, i), void 0, null), s;
  }, useId: function() {
    var r = ta(), i = Dr.identifierPrefix;
    if (Xn) {
      var s = tl, d = el;
      s = (d & ~(1 << 32 - $r(d) - 1)).toString(32) + s, i = ":" + i + "R" + s, s = tu++, 0 < s && (i += "H" + s.toString(32)), i += ":";
    } else s = Le++, i = ":" + i + "r" + s.toString(32) + ":";
    return r.memoizedState = i;
  }, unstable_isNewReconciler: !1 }, dc = {
    readContext: pi,
    useCallback: Hf,
    useContext: pi,
    useEffect: oc,
    useImperativeHandle: $f,
    useInsertionEffect: Pf,
    useLayoutEffect: uc,
    useMemo: Vf,
    useReducer: mo,
    useRef: jf,
    useState: function() {
      return mo(Ol);
    },
    useDebugValue: sc,
    useDeferredValue: function(r) {
      var i = ur();
      return jp(i, gr.memoizedState, r);
    },
    useTransition: function() {
      var r = mo(Ol)[0], i = ur().memoizedState;
      return [r, i];
    },
    useMutableSource: kf,
    useSyncExternalStore: Df,
    useId: Fp,
    unstable_isNewReconciler: !1
  }, qf = { readContext: pi, useCallback: Hf, useContext: pi, useEffect: oc, useImperativeHandle: $f, useInsertionEffect: Pf, useLayoutEffect: uc, useMemo: Vf, useReducer: nu, useRef: jf, useState: function() {
    return nu(Ol);
  }, useDebugValue: sc, useDeferredValue: function(r) {
    var i = ur();
    return gr === null ? i.memoizedState = r : jp(i, gr.memoizedState, r);
  }, useTransition: function() {
    var r = nu(Ol)[0], i = ur().memoizedState;
    return [r, i];
  }, useMutableSource: kf, useSyncExternalStore: Df, useId: Fp, unstable_isNewReconciler: !1 };
  function Ui(r, i) {
    if (r && r.defaultProps) {
      i = he({}, i), r = r.defaultProps;
      for (var s in r) i[s] === void 0 && (i[s] = r[s]);
      return i;
    }
    return i;
  }
  function Pp(r, i, s, d) {
    i = r.memoizedState, s = s(d, i), s = s == null ? i : he({}, i, s), r.memoizedState = s, r.lanes === 0 && (r.updateQueue.baseState = s);
  }
  var Yf = { isMounted: function(r) {
    return (r = r._reactInternals) ? It(r) === r : !1;
  }, enqueueSetState: function(r, i, s) {
    r = r._reactInternals;
    var d = wr(), y = ol(r), w = Dl(d, y);
    w.payload = i, s != null && (w.callback = s), i = vo(r, w, y), i !== null && (ma(i, r, y, d), Tf(i, r, y));
  }, enqueueReplaceState: function(r, i, s) {
    r = r._reactInternals;
    var d = wr(), y = ol(r), w = Dl(d, y);
    w.tag = 1, w.payload = i, s != null && (w.callback = s), i = vo(r, w, y), i !== null && (ma(i, r, y, d), Tf(i, r, y));
  }, enqueueForceUpdate: function(r, i) {
    r = r._reactInternals;
    var s = wr(), d = ol(r), y = Dl(s, d);
    y.tag = 2, i != null && (y.callback = i), i = vo(r, y, d), i !== null && (ma(i, r, d, s), Tf(i, r, d));
  } };
  function vm(r, i, s, d, y, w, O) {
    return r = r.stateNode, typeof r.shouldComponentUpdate == "function" ? r.shouldComponentUpdate(d, w, O) : i.prototype && i.prototype.isPureReactComponent ? !Ys(s, d) || !Ys(y, w) : !0;
  }
  function Wf(r, i, s) {
    var d = !1, y = ea, w = i.contextType;
    return typeof w == "object" && w !== null ? w = pi(w) : (y = mr(i) ? ka : ir.current, d = i.contextTypes, w = (d = d != null) ? Da(r, y) : ea), i = new i(s, w), r.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = Yf, r.stateNode = i, i._reactInternals = r, d && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = y, r.__reactInternalMemoizedMaskedChildContext = w), i;
  }
  function hm(r, i, s, d) {
    r = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(s, d), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(s, d), i.state !== r && Yf.enqueueReplaceState(i, i.state, null);
  }
  function pc(r, i, s, d) {
    var y = r.stateNode;
    y.props = s, y.state = r.memoizedState, y.refs = {}, Np(r);
    var w = i.contextType;
    typeof w == "object" && w !== null ? y.context = pi(w) : (w = mr(i) ? ka : ir.current, y.context = Da(r, w)), y.state = r.memoizedState, w = i.getDerivedStateFromProps, typeof w == "function" && (Pp(r, i, w, s), y.state = r.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof y.getSnapshotBeforeUpdate == "function" || typeof y.UNSAFE_componentWillMount != "function" && typeof y.componentWillMount != "function" || (i = y.state, typeof y.componentWillMount == "function" && y.componentWillMount(), typeof y.UNSAFE_componentWillMount == "function" && y.UNSAFE_componentWillMount(), i !== y.state && Yf.enqueueReplaceState(y, y.state, null), tc(r, s, y, d), y.state = r.memoizedState), typeof y.componentDidMount == "function" && (r.flags |= 4194308);
  }
  function ou(r, i) {
    try {
      var s = "", d = i;
      do
        s += Fe(d), d = d.return;
      while (d);
      var y = s;
    } catch (w) {
      y = `
Error generating stack: ` + w.message + `
` + w.stack;
    }
    return { value: r, source: i, stack: y, digest: null };
  }
  function $p(r, i, s) {
    return { value: r, source: null, stack: s ?? null, digest: i ?? null };
  }
  function Hp(r, i) {
    try {
      console.error(i.value);
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  var Bf = typeof WeakMap == "function" ? WeakMap : Map;
  function mm(r, i, s) {
    s = Dl(-1, s), s.tag = 3, s.payload = { element: null };
    var d = i.value;
    return s.callback = function() {
      ls || (ls = !0, cu = d), Hp(r, i);
    }, s;
  }
  function Vp(r, i, s) {
    s = Dl(-1, s), s.tag = 3;
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var y = i.value;
      s.payload = function() {
        return d(y);
      }, s.callback = function() {
        Hp(r, i);
      };
    }
    var w = r.stateNode;
    return w !== null && typeof w.componentDidCatch == "function" && (s.callback = function() {
      Hp(r, i), typeof d != "function" && (So === null ? So = /* @__PURE__ */ new Set([this]) : So.add(this));
      var O = i.stack;
      this.componentDidCatch(i.value, { componentStack: O !== null ? O : "" });
    }), s;
  }
  function Ip(r, i, s) {
    var d = r.pingCache;
    if (d === null) {
      d = r.pingCache = new Bf();
      var y = /* @__PURE__ */ new Set();
      d.set(i, y);
    } else y = d.get(i), y === void 0 && (y = /* @__PURE__ */ new Set(), d.set(i, y));
    y.has(s) || (y.add(s), r = b1.bind(null, r, i, s), i.then(r, r));
  }
  function ym(r) {
    do {
      var i;
      if ((i = r.tag === 13) && (i = r.memoizedState, i = i !== null ? i.dehydrated !== null : !0), i) return r;
      r = r.return;
    } while (r !== null);
    return null;
  }
  function yo(r, i, s, d, y) {
    return (r.mode & 1) === 0 ? (r === i ? r.flags |= 65536 : (r.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (i = Dl(-1, 1), i.tag = 2, vo(s, i, 1))), s.lanes |= 1), r) : (r.flags |= 65536, r.lanes = y, r);
  }
  var vc = j.ReactCurrentOwner, Sr = !1;
  function Ir(r, i, s, d) {
    i.child = r === null ? rt(i, null, s, d) : or(i, r.child, s, d);
  }
  function za(r, i, s, d, y) {
    s = s.render;
    var w = i.ref;
    return tr(i, y), d = ho(r, i, s, d, w, y), s = zi(), r !== null && !Sr ? (i.updateQueue = r.updateQueue, i.flags &= -2053, r.lanes &= ~y, hi(r, i, y)) : (Xn && s && xf(i), i.flags |= 1, Ir(r, i, d, y), i.child);
  }
  function uu(r, i, s, d, y) {
    if (r === null) {
      var w = s.type;
      return typeof w == "function" && !rv(w) && w.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (i.tag = 15, i.type = w, en(r, i, w, d, y)) : (r = Dc(s.type, null, d, i, i.mode, y), r.ref = i.ref, r.return = i, i.child = r);
    }
    if (w = r.child, (r.lanes & y) === 0) {
      var O = w.memoizedProps;
      if (s = s.compare, s = s !== null ? s : Ys, s(O, d) && r.ref === i.ref) return hi(r, i, y);
    }
    return i.flags |= 1, r = xo(w, d), r.ref = i.ref, r.return = i, i.child = r;
  }
  function en(r, i, s, d, y) {
    if (r !== null) {
      var w = r.memoizedProps;
      if (Ys(w, d) && r.ref === i.ref) if (Sr = !1, i.pendingProps = d = w, (r.lanes & y) !== 0) (r.flags & 131072) !== 0 && (Sr = !0);
      else return i.lanes = r.lanes, hi(r, i, y);
    }
    return gm(r, i, s, d, y);
  }
  function hc(r, i, s) {
    var d = i.pendingProps, y = d.children, w = r !== null ? r.memoizedState : null;
    if (d.mode === "hidden") if ((i.mode & 1) === 0) i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, _t(rs, Xa), Xa |= s;
    else {
      if ((s & 1073741824) === 0) return r = w !== null ? w.baseLanes | s : s, i.lanes = i.childLanes = 1073741824, i.memoizedState = { baseLanes: r, cachePool: null, transitions: null }, i.updateQueue = null, _t(rs, Xa), Xa |= r, null;
      i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, d = w !== null ? w.baseLanes : s, _t(rs, Xa), Xa |= d;
    }
    else w !== null ? (d = w.baseLanes | s, i.memoizedState = null) : d = s, _t(rs, Xa), Xa |= d;
    return Ir(r, i, y, s), i.child;
  }
  function qp(r, i) {
    var s = i.ref;
    (r === null && s !== null || r !== null && r.ref !== s) && (i.flags |= 512, i.flags |= 2097152);
  }
  function gm(r, i, s, d, y) {
    var w = mr(s) ? ka : ir.current;
    return w = Da(i, w), tr(i, y), s = ho(r, i, s, d, w, y), d = zi(), r !== null && !Sr ? (i.updateQueue = r.updateQueue, i.flags &= -2053, r.lanes &= ~y, hi(r, i, y)) : (Xn && d && xf(i), i.flags |= 1, Ir(r, i, s, y), i.child);
  }
  function Sm(r, i, s, d, y) {
    if (mr(s)) {
      var w = !0;
      Nr(i);
    } else w = !1;
    if (tr(i, y), i.stateNode === null) vi(r, i), Wf(i, s, d), pc(i, s, d, y), d = !0;
    else if (r === null) {
      var O = i.stateNode, I = i.memoizedProps;
      O.props = I;
      var K = O.context, ye = s.contextType;
      typeof ye == "object" && ye !== null ? ye = pi(ye) : (ye = mr(s) ? ka : ir.current, ye = Da(i, ye));
      var Ue = s.getDerivedStateFromProps, $e = typeof Ue == "function" || typeof O.getSnapshotBeforeUpdate == "function";
      $e || typeof O.UNSAFE_componentWillReceiveProps != "function" && typeof O.componentWillReceiveProps != "function" || (I !== d || K !== ye) && hm(i, O, d, ye), Qa = !1;
      var Ne = i.memoizedState;
      O.state = Ne, tc(i, d, O, y), K = i.memoizedState, I !== d || Ne !== K || _r.current || Qa ? (typeof Ue == "function" && (Pp(i, s, Ue, d), K = i.memoizedState), (I = Qa || vm(i, s, I, d, Ne, K, ye)) ? ($e || typeof O.UNSAFE_componentWillMount != "function" && typeof O.componentWillMount != "function" || (typeof O.componentWillMount == "function" && O.componentWillMount(), typeof O.UNSAFE_componentWillMount == "function" && O.UNSAFE_componentWillMount()), typeof O.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof O.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = d, i.memoizedState = K), O.props = d, O.state = K, O.context = ye, d = I) : (typeof O.componentDidMount == "function" && (i.flags |= 4194308), d = !1);
    } else {
      O = i.stateNode, cm(r, i), I = i.memoizedProps, ye = i.type === i.elementType ? I : Ui(i.type, I), O.props = ye, $e = i.pendingProps, Ne = O.context, K = s.contextType, typeof K == "object" && K !== null ? K = pi(K) : (K = mr(s) ? ka : ir.current, K = Da(i, K));
      var st = s.getDerivedStateFromProps;
      (Ue = typeof st == "function" || typeof O.getSnapshotBeforeUpdate == "function") || typeof O.UNSAFE_componentWillReceiveProps != "function" && typeof O.componentWillReceiveProps != "function" || (I !== $e || Ne !== K) && hm(i, O, d, K), Qa = !1, Ne = i.memoizedState, O.state = Ne, tc(i, d, O, y);
      var mt = i.memoizedState;
      I !== $e || Ne !== mt || _r.current || Qa ? (typeof st == "function" && (Pp(i, s, st, d), mt = i.memoizedState), (ye = Qa || vm(i, s, ye, d, Ne, mt, K) || !1) ? (Ue || typeof O.UNSAFE_componentWillUpdate != "function" && typeof O.componentWillUpdate != "function" || (typeof O.componentWillUpdate == "function" && O.componentWillUpdate(d, mt, K), typeof O.UNSAFE_componentWillUpdate == "function" && O.UNSAFE_componentWillUpdate(d, mt, K)), typeof O.componentDidUpdate == "function" && (i.flags |= 4), typeof O.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof O.componentDidUpdate != "function" || I === r.memoizedProps && Ne === r.memoizedState || (i.flags |= 4), typeof O.getSnapshotBeforeUpdate != "function" || I === r.memoizedProps && Ne === r.memoizedState || (i.flags |= 1024), i.memoizedProps = d, i.memoizedState = mt), O.props = d, O.state = mt, O.context = K, d = ye) : (typeof O.componentDidUpdate != "function" || I === r.memoizedProps && Ne === r.memoizedState || (i.flags |= 4), typeof O.getSnapshotBeforeUpdate != "function" || I === r.memoizedProps && Ne === r.memoizedState || (i.flags |= 1024), d = !1);
    }
    return mc(r, i, s, d, w, y);
  }
  function mc(r, i, s, d, y, w) {
    qp(r, i);
    var O = (i.flags & 128) !== 0;
    if (!d && !O) return y && Sf(i, s, !1), hi(r, i, w);
    d = i.stateNode, vc.current = i;
    var I = O && typeof s.getDerivedStateFromError != "function" ? null : d.render();
    return i.flags |= 1, r !== null && O ? (i.child = or(i, r.child, null, w), i.child = or(i, null, I, w)) : Ir(r, i, I, w), i.memoizedState = d.state, y && Sf(i, s, !0), i.child;
  }
  function ts(r) {
    var i = r.stateNode;
    i.pendingContext ? lm(r, i.pendingContext, i.pendingContext !== i.context) : i.context && lm(r, i.context, !1), Up(r, i.containerInfo);
  }
  function Em(r, i, s, d, y) {
    return po(), kl(y), i.flags |= 256, Ir(r, i, s, d), i.child;
  }
  var Gf = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Yp(r) {
    return { baseLanes: r, cachePool: null, transitions: null };
  }
  function Qf(r, i, s) {
    var d = i.pendingProps, y = nr.current, w = !1, O = (i.flags & 128) !== 0, I;
    if ((I = O) || (I = r !== null && r.memoizedState === null ? !1 : (y & 2) !== 0), I ? (w = !0, i.flags &= -129) : (r === null || r.memoizedState !== null) && (y |= 1), _t(nr, y & 1), r === null)
      return Mp(i), r = i.memoizedState, r !== null && (r = r.dehydrated, r !== null) ? ((i.mode & 1) === 0 ? i.lanes = 1 : r.data === "$!" ? i.lanes = 8 : i.lanes = 1073741824, null) : (O = d.children, r = d.fallback, w ? (d = i.mode, w = i.child, O = { mode: "hidden", children: O }, (d & 1) === 0 && w !== null ? (w.childLanes = 0, w.pendingProps = O) : w = wo(O, d, 0, null), r = zl(r, d, s, null), w.return = i, r.return = i, w.sibling = r, i.child = w, i.child.memoizedState = Yp(s), i.memoizedState = Gf, r) : Wp(i, O));
    if (y = r.memoizedState, y !== null && (I = y.dehydrated, I !== null)) return xm(r, i, O, d, I, y, s);
    if (w) {
      w = d.fallback, O = i.mode, y = r.child, I = y.sibling;
      var K = { mode: "hidden", children: d.children };
      return (O & 1) === 0 && i.child !== y ? (d = i.child, d.childLanes = 0, d.pendingProps = K, i.deletions = null) : (d = xo(y, K), d.subtreeFlags = y.subtreeFlags & 14680064), I !== null ? w = xo(I, w) : (w = zl(w, O, s, null), w.flags |= 2), w.return = i, d.return = i, d.sibling = w, i.child = d, d = w, w = i.child, O = r.child.memoizedState, O = O === null ? Yp(s) : { baseLanes: O.baseLanes | s, cachePool: null, transitions: O.transitions }, w.memoizedState = O, w.childLanes = r.childLanes & ~s, i.memoizedState = Gf, d;
    }
    return w = r.child, r = w.sibling, d = xo(w, { mode: "visible", children: d.children }), (i.mode & 1) === 0 && (d.lanes = s), d.return = i, d.sibling = null, r !== null && (s = i.deletions, s === null ? (i.deletions = [r], i.flags |= 16) : s.push(r)), i.child = d, i.memoizedState = null, d;
  }
  function Wp(r, i) {
    return i = wo({ mode: "visible", children: i }, r.mode, 0, null), i.return = r, r.child = i;
  }
  function yc(r, i, s, d) {
    return d !== null && kl(d), or(i, r.child, null, s), r = Wp(i, i.pendingProps.children), r.flags |= 2, i.memoizedState = null, r;
  }
  function xm(r, i, s, d, y, w, O) {
    if (s)
      return i.flags & 256 ? (i.flags &= -257, d = $p(Error(u(422))), yc(r, i, O, d)) : i.memoizedState !== null ? (i.child = r.child, i.flags |= 128, null) : (w = d.fallback, y = i.mode, d = wo({ mode: "visible", children: d.children }, y, 0, null), w = zl(w, y, O, null), w.flags |= 2, d.return = i, w.return = i, d.sibling = w, i.child = d, (i.mode & 1) !== 0 && or(i, r.child, null, O), i.child.memoizedState = Yp(O), i.memoizedState = Gf, w);
    if ((i.mode & 1) === 0) return yc(r, i, O, null);
    if (y.data === "$!") {
      if (d = y.nextSibling && y.nextSibling.dataset, d) var I = d.dgst;
      return d = I, w = Error(u(419)), d = $p(w, d, void 0), yc(r, i, O, d);
    }
    if (I = (O & r.childLanes) !== 0, Sr || I) {
      if (d = Dr, d !== null) {
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
        y = (y & (d.suspendedLanes | O)) !== 0 ? 0 : y, y !== 0 && y !== w.retryLane && (w.retryLane = y, Ga(r, y), ma(d, r, y, -1));
      }
      return nv(), d = $p(Error(u(421))), yc(r, i, O, d);
    }
    return y.data === "$?" ? (i.flags |= 128, i.child = r.child, i = T1.bind(null, r), y._reactRetry = i, null) : (r = w.treeContext, Aa = Xi(y.nextSibling), Oa = i, Xn = !0, di = null, r !== null && (yr[fi++] = el, yr[fi++] = tl, yr[fi++] = Wa, el = r.id, tl = r.overflow, Wa = i), i = Wp(i, d.children), i.flags |= 4096, i);
  }
  function Bp(r, i, s) {
    r.lanes |= i;
    var d = r.alternate;
    d !== null && (d.lanes |= i), Op(r.return, i, s);
  }
  function pa(r, i, s, d, y) {
    var w = r.memoizedState;
    w === null ? r.memoizedState = { isBackwards: i, rendering: null, renderingStartTime: 0, last: d, tail: s, tailMode: y } : (w.isBackwards = i, w.rendering = null, w.renderingStartTime = 0, w.last = d, w.tail = s, w.tailMode = y);
  }
  function rl(r, i, s) {
    var d = i.pendingProps, y = d.revealOrder, w = d.tail;
    if (Ir(r, i, d.children, s), d = nr.current, (d & 2) !== 0) d = d & 1 | 2, i.flags |= 128;
    else {
      if (r !== null && (r.flags & 128) !== 0) e: for (r = i.child; r !== null; ) {
        if (r.tag === 13) r.memoizedState !== null && Bp(r, s, i);
        else if (r.tag === 19) Bp(r, s, i);
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
    if (_t(nr, d), (i.mode & 1) === 0) i.memoizedState = null;
    else switch (y) {
      case "forwards":
        for (s = i.child, y = null; s !== null; ) r = s.alternate, r !== null && Mf(r) === null && (y = s), s = s.sibling;
        s = y, s === null ? (y = i.child, i.child = null) : (y = s.sibling, s.sibling = null), pa(i, !1, y, s, w);
        break;
      case "backwards":
        for (s = null, y = i.child, i.child = null; y !== null; ) {
          if (r = y.alternate, r !== null && Mf(r) === null) {
            i.child = y;
            break;
          }
          r = y.sibling, y.sibling = s, s = y, y = r;
        }
        pa(i, !0, s, null, w);
        break;
      case "together":
        pa(i, !1, null, null, void 0);
        break;
      default:
        i.memoizedState = null;
    }
    return i.child;
  }
  function vi(r, i) {
    (i.mode & 1) === 0 && r !== null && (r.alternate = null, i.alternate = null, i.flags |= 2);
  }
  function hi(r, i, s) {
    if (r !== null && (i.dependencies = r.dependencies), ll |= i.lanes, (s & i.childLanes) === 0) return null;
    if (r !== null && i.child !== r.child) throw Error(u(153));
    if (i.child !== null) {
      for (r = i.child, s = xo(r, r.pendingProps), i.child = s, s.return = i; r.sibling !== null; ) r = r.sibling, s = s.sibling = xo(r, r.pendingProps), s.return = i;
      s.sibling = null;
    }
    return i.child;
  }
  function gc(r, i, s) {
    switch (i.tag) {
      case 3:
        ts(i), po();
        break;
      case 5:
        dm(i);
        break;
      case 1:
        mr(i.type) && Nr(i);
        break;
      case 4:
        Up(i, i.stateNode.containerInfo);
        break;
      case 10:
        var d = i.type._context, y = i.memoizedProps.value;
        _t(Ba, d._currentValue), d._currentValue = y;
        break;
      case 13:
        if (d = i.memoizedState, d !== null)
          return d.dehydrated !== null ? (_t(nr, nr.current & 1), i.flags |= 128, null) : (s & i.child.childLanes) !== 0 ? Qf(r, i, s) : (_t(nr, nr.current & 1), r = hi(r, i, s), r !== null ? r.sibling : null);
        _t(nr, nr.current & 1);
        break;
      case 19:
        if (d = (s & i.childLanes) !== 0, (r.flags & 128) !== 0) {
          if (d) return rl(r, i, s);
          i.flags |= 128;
        }
        if (y = i.memoizedState, y !== null && (y.rendering = null, y.tail = null, y.lastEffect = null), _t(nr, nr.current), d) break;
        return null;
      case 22:
      case 23:
        return i.lanes = 0, hc(r, i, s);
    }
    return hi(r, i, s);
  }
  var mi, Er, wm, Cm;
  mi = function(r, i) {
    for (var s = i.child; s !== null; ) {
      if (s.tag === 5 || s.tag === 6) r.appendChild(s.stateNode);
      else if (s.tag !== 4 && s.child !== null) {
        s.child.return = s, s = s.child;
        continue;
      }
      if (s === i) break;
      for (; s.sibling === null; ) {
        if (s.return === null || s.return === i) return;
        s = s.return;
      }
      s.sibling.return = s.return, s = s.sibling;
    }
  }, Er = function() {
  }, wm = function(r, i, s, d) {
    var y = r.memoizedProps;
    if (y !== d) {
      r = i.stateNode, Jo(nl.current);
      var w = null;
      switch (s) {
        case "input":
          y = Te(r, y), d = Te(r, d), w = [];
          break;
        case "select":
          y = he({}, y, { value: void 0 }), d = he({}, d, { value: void 0 }), w = [];
          break;
        case "textarea":
          y = Qe(r, y), d = Qe(r, d), w = [];
          break;
        default:
          typeof y.onClick != "function" && typeof d.onClick == "function" && (r.onclick = lo);
      }
      xt(s, d);
      var O;
      s = null;
      for (ye in y) if (!d.hasOwnProperty(ye) && y.hasOwnProperty(ye) && y[ye] != null) if (ye === "style") {
        var I = y[ye];
        for (O in I) I.hasOwnProperty(O) && (s || (s = {}), s[O] = "");
      } else ye !== "dangerouslySetInnerHTML" && ye !== "children" && ye !== "suppressContentEditableWarning" && ye !== "suppressHydrationWarning" && ye !== "autoFocus" && (p.hasOwnProperty(ye) ? w || (w = []) : (w = w || []).push(ye, null));
      for (ye in d) {
        var K = d[ye];
        if (I = y?.[ye], d.hasOwnProperty(ye) && K !== I && (K != null || I != null)) if (ye === "style") if (I) {
          for (O in I) !I.hasOwnProperty(O) || K && K.hasOwnProperty(O) || (s || (s = {}), s[O] = "");
          for (O in K) K.hasOwnProperty(O) && I[O] !== K[O] && (s || (s = {}), s[O] = K[O]);
        } else s || (w || (w = []), w.push(
          ye,
          s
        )), s = K;
        else ye === "dangerouslySetInnerHTML" ? (K = K ? K.__html : void 0, I = I ? I.__html : void 0, K != null && I !== K && (w = w || []).push(ye, K)) : ye === "children" ? typeof K != "string" && typeof K != "number" || (w = w || []).push(ye, "" + K) : ye !== "suppressContentEditableWarning" && ye !== "suppressHydrationWarning" && (p.hasOwnProperty(ye) ? (K != null && ye === "onScroll" && kn("scroll", r), w || I === K || (w = [])) : (w = w || []).push(ye, K));
      }
      s && (w = w || []).push("style", s);
      var ye = w;
      (i.updateQueue = ye) && (i.flags |= 4);
    }
  }, Cm = function(r, i, s, d) {
    s !== d && (i.flags |= 4);
  };
  function Sc(r, i) {
    if (!Xn) switch (r.tailMode) {
      case "hidden":
        i = r.tail;
        for (var s = null; i !== null; ) i.alternate !== null && (s = i), i = i.sibling;
        s === null ? r.tail = null : s.sibling = null;
        break;
      case "collapsed":
        s = r.tail;
        for (var d = null; s !== null; ) s.alternate !== null && (d = s), s = s.sibling;
        d === null ? i || r.tail === null ? r.tail = null : r.tail.sibling = null : d.sibling = null;
    }
  }
  function Ur(r) {
    var i = r.alternate !== null && r.alternate.child === r.child, s = 0, d = 0;
    if (i) for (var y = r.child; y !== null; ) s |= y.lanes | y.childLanes, d |= y.subtreeFlags & 14680064, d |= y.flags & 14680064, y.return = r, y = y.sibling;
    else for (y = r.child; y !== null; ) s |= y.lanes | y.childLanes, d |= y.subtreeFlags, d |= y.flags, y.return = r, y = y.sibling;
    return r.subtreeFlags |= d, r.childLanes = s, i;
  }
  function bm(r, i, s) {
    var d = i.pendingProps;
    switch (wf(i), i.tag) {
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
        return Ur(i), null;
      case 1:
        return mr(i.type) && Xu(), Ur(i), null;
      case 3:
        return d = i.stateNode, eu(), Pn(_r), Pn(ir), Dt(), d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), (r === null || r.child === null) && (Cf(i) ? i.flags |= 4 : r === null || r.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, di !== null && (fu(di), di = null))), Er(r, i), Ur(i), null;
      case 5:
        Rf(i);
        var y = Jo(ac.current);
        if (s = i.type, r !== null && i.stateNode != null) wm(r, i, s, d, y), r.ref !== i.ref && (i.flags |= 512, i.flags |= 2097152);
        else {
          if (!d) {
            if (i.stateNode === null) throw Error(u(166));
            return Ur(i), null;
          }
          if (r = Jo(nl.current), Cf(i)) {
            d = i.stateNode, s = i.type;
            var w = i.memoizedProps;
            switch (d[Ki] = i, d[Ks] = w, r = (i.mode & 1) !== 0, s) {
              case "dialog":
                kn("cancel", d), kn("close", d);
                break;
              case "iframe":
              case "object":
              case "embed":
                kn("load", d);
                break;
              case "video":
              case "audio":
                for (y = 0; y < Gs.length; y++) kn(Gs[y], d);
                break;
              case "source":
                kn("error", d);
                break;
              case "img":
              case "image":
              case "link":
                kn(
                  "error",
                  d
                ), kn("load", d);
                break;
              case "details":
                kn("toggle", d);
                break;
              case "input":
                Ge(d, w), kn("invalid", d);
                break;
              case "select":
                d._wrapperState = { wasMultiple: !!w.multiple }, kn("invalid", d);
                break;
              case "textarea":
                Et(d, w), kn("invalid", d);
            }
            xt(s, w), y = null;
            for (var O in w) if (w.hasOwnProperty(O)) {
              var I = w[O];
              O === "children" ? typeof I == "string" ? d.textContent !== I && (w.suppressHydrationWarning !== !0 && hf(d.textContent, I, r), y = ["children", I]) : typeof I == "number" && d.textContent !== "" + I && (w.suppressHydrationWarning !== !0 && hf(
                d.textContent,
                I,
                r
              ), y = ["children", "" + I]) : p.hasOwnProperty(O) && I != null && O === "onScroll" && kn("scroll", d);
            }
            switch (s) {
              case "input":
                Xe(d), ut(d, w, !0);
                break;
              case "textarea":
                Xe(d), Rt(d);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof w.onClick == "function" && (d.onclick = lo);
            }
            d = y, i.updateQueue = d, d !== null && (i.flags |= 4);
          } else {
            O = y.nodeType === 9 ? y : y.ownerDocument, r === "http://www.w3.org/1999/xhtml" && (r = it(s)), r === "http://www.w3.org/1999/xhtml" ? s === "script" ? (r = O.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(r.firstChild)) : typeof d.is == "string" ? r = O.createElement(s, { is: d.is }) : (r = O.createElement(s), s === "select" && (O = r, d.multiple ? O.multiple = !0 : d.size && (O.size = d.size))) : r = O.createElementNS(r, s), r[Ki] = i, r[Ks] = d, mi(r, i, !1, !1), i.stateNode = r;
            e: {
              switch (O = ht(s, d), s) {
                case "dialog":
                  kn("cancel", r), kn("close", r), y = d;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  kn("load", r), y = d;
                  break;
                case "video":
                case "audio":
                  for (y = 0; y < Gs.length; y++) kn(Gs[y], r);
                  y = d;
                  break;
                case "source":
                  kn("error", r), y = d;
                  break;
                case "img":
                case "image":
                case "link":
                  kn(
                    "error",
                    r
                  ), kn("load", r), y = d;
                  break;
                case "details":
                  kn("toggle", r), y = d;
                  break;
                case "input":
                  Ge(r, d), y = Te(r, d), kn("invalid", r);
                  break;
                case "option":
                  y = d;
                  break;
                case "select":
                  r._wrapperState = { wasMultiple: !!d.multiple }, y = he({}, d, { value: void 0 }), kn("invalid", r);
                  break;
                case "textarea":
                  Et(r, d), y = Qe(r, d), kn("invalid", r);
                  break;
                default:
                  y = d;
              }
              xt(s, y), I = y;
              for (w in I) if (I.hasOwnProperty(w)) {
                var K = I[w];
                w === "style" ? Lt(r, K) : w === "dangerouslySetInnerHTML" ? (K = K ? K.__html : void 0, K != null && Xt(r, K)) : w === "children" ? typeof K == "string" ? (s !== "textarea" || K !== "") && Ce(r, K) : typeof K == "number" && Ce(r, "" + K) : w !== "suppressContentEditableWarning" && w !== "suppressHydrationWarning" && w !== "autoFocus" && (p.hasOwnProperty(w) ? K != null && w === "onScroll" && kn("scroll", r) : K != null && P(r, w, K, O));
              }
              switch (s) {
                case "input":
                  Xe(r), ut(r, d, !1);
                  break;
                case "textarea":
                  Xe(r), Rt(r);
                  break;
                case "option":
                  d.value != null && r.setAttribute("value", "" + Be(d.value));
                  break;
                case "select":
                  r.multiple = !!d.multiple, w = d.value, w != null ? Me(r, !!d.multiple, w, !1) : d.defaultValue != null && Me(
                    r,
                    !!d.multiple,
                    d.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof y.onClick == "function" && (r.onclick = lo);
              }
              switch (s) {
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
        return Ur(i), null;
      case 6:
        if (r && i.stateNode != null) Cm(r, i, r.memoizedProps, d);
        else {
          if (typeof d != "string" && i.stateNode === null) throw Error(u(166));
          if (s = Jo(ac.current), Jo(nl.current), Cf(i)) {
            if (d = i.stateNode, s = i.memoizedProps, d[Ki] = i, (w = d.nodeValue !== s) && (r = Oa, r !== null)) switch (r.tag) {
              case 3:
                hf(d.nodeValue, s, (r.mode & 1) !== 0);
                break;
              case 5:
                r.memoizedProps.suppressHydrationWarning !== !0 && hf(d.nodeValue, s, (r.mode & 1) !== 0);
            }
            w && (i.flags |= 4);
          } else d = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(d), d[Ki] = i, i.stateNode = d;
        }
        return Ur(i), null;
      case 13:
        if (Pn(nr), d = i.memoizedState, r === null || r.memoizedState !== null && r.memoizedState.dehydrated !== null) {
          if (Xn && Aa !== null && (i.mode & 1) !== 0 && (i.flags & 128) === 0) ec(), po(), i.flags |= 98560, w = !1;
          else if (w = Cf(i), d !== null && d.dehydrated !== null) {
            if (r === null) {
              if (!w) throw Error(u(318));
              if (w = i.memoizedState, w = w !== null ? w.dehydrated : null, !w) throw Error(u(317));
              w[Ki] = i;
            } else po(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            Ur(i), w = !1;
          } else di !== null && (fu(di), di = null), w = !0;
          if (!w) return i.flags & 65536 ? i : null;
        }
        return (i.flags & 128) !== 0 ? (i.lanes = s, i) : (d = d !== null, d !== (r !== null && r.memoizedState !== null) && d && (i.child.flags |= 8192, (i.mode & 1) !== 0 && (r === null || (nr.current & 1) !== 0 ? cr === 0 && (cr = 3) : nv())), i.updateQueue !== null && (i.flags |= 4), Ur(i), null);
      case 4:
        return eu(), Er(r, i), r === null && Yu(i.stateNode.containerInfo), Ur(i), null;
      case 10:
        return Dp(i.type._context), Ur(i), null;
      case 17:
        return mr(i.type) && Xu(), Ur(i), null;
      case 19:
        if (Pn(nr), w = i.memoizedState, w === null) return Ur(i), null;
        if (d = (i.flags & 128) !== 0, O = w.rendering, O === null) if (d) Sc(w, !1);
        else {
          if (cr !== 0 || r !== null && (r.flags & 128) !== 0) for (r = i.child; r !== null; ) {
            if (O = Mf(r), O !== null) {
              for (i.flags |= 128, Sc(w, !1), d = O.updateQueue, d !== null && (i.updateQueue = d, i.flags |= 4), i.subtreeFlags = 0, d = s, s = i.child; s !== null; ) w = s, r = d, w.flags &= 14680066, O = w.alternate, O === null ? (w.childLanes = 0, w.lanes = r, w.child = null, w.subtreeFlags = 0, w.memoizedProps = null, w.memoizedState = null, w.updateQueue = null, w.dependencies = null, w.stateNode = null) : (w.childLanes = O.childLanes, w.lanes = O.lanes, w.child = O.child, w.subtreeFlags = 0, w.deletions = null, w.memoizedProps = O.memoizedProps, w.memoizedState = O.memoizedState, w.updateQueue = O.updateQueue, w.type = O.type, r = O.dependencies, w.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }), s = s.sibling;
              return _t(nr, nr.current & 1 | 2), i.child;
            }
            r = r.sibling;
          }
          w.tail !== null && qt() > is && (i.flags |= 128, d = !0, Sc(w, !1), i.lanes = 4194304);
        }
        else {
          if (!d) if (r = Mf(O), r !== null) {
            if (i.flags |= 128, d = !0, s = r.updateQueue, s !== null && (i.updateQueue = s, i.flags |= 4), Sc(w, !0), w.tail === null && w.tailMode === "hidden" && !O.alternate && !Xn) return Ur(i), null;
          } else 2 * qt() - w.renderingStartTime > is && s !== 1073741824 && (i.flags |= 128, d = !0, Sc(w, !1), i.lanes = 4194304);
          w.isBackwards ? (O.sibling = i.child, i.child = O) : (s = w.last, s !== null ? s.sibling = O : i.child = O, w.last = O);
        }
        return w.tail !== null ? (i = w.tail, w.rendering = i, w.tail = i.sibling, w.renderingStartTime = qt(), i.sibling = null, s = nr.current, _t(nr, d ? s & 1 | 2 : s & 1), i) : (Ur(i), null);
      case 22:
      case 23:
        return tv(), d = i.memoizedState !== null, r !== null && r.memoizedState !== null !== d && (i.flags |= 8192), d && (i.mode & 1) !== 0 ? (Xa & 1073741824) !== 0 && (Ur(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : Ur(i), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(u(156, i.tag));
  }
  function Xf(r, i) {
    switch (wf(i), i.tag) {
      case 1:
        return mr(i.type) && Xu(), r = i.flags, r & 65536 ? (i.flags = r & -65537 | 128, i) : null;
      case 3:
        return eu(), Pn(_r), Pn(ir), Dt(), r = i.flags, (r & 65536) !== 0 && (r & 128) === 0 ? (i.flags = r & -65537 | 128, i) : null;
      case 5:
        return Rf(i), null;
      case 13:
        if (Pn(nr), r = i.memoizedState, r !== null && r.dehydrated !== null) {
          if (i.alternate === null) throw Error(u(340));
          po();
        }
        return r = i.flags, r & 65536 ? (i.flags = r & -65537 | 128, i) : null;
      case 19:
        return Pn(nr), null;
      case 4:
        return eu(), null;
      case 10:
        return Dp(i.type._context), null;
      case 22:
      case 23:
        return tv(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ec = !1, na = !1, g1 = typeof WeakSet == "function" ? WeakSet : Set, vt = null;
  function ns(r, i) {
    var s = r.ref;
    if (s !== null) if (typeof s == "function") try {
      s(null);
    } catch (d) {
      Kn(r, i, d);
    }
    else s.current = null;
  }
  function Kf(r, i, s) {
    try {
      s();
    } catch (d) {
      Kn(r, i, d);
    }
  }
  var Tm = !1;
  function Rm(r, i) {
    if (Xs = oi, r = Ws(), of(r)) {
      if ("selectionStart" in r) var s = { start: r.selectionStart, end: r.selectionEnd };
      else e: {
        s = (s = r.ownerDocument) && s.defaultView || window;
        var d = s.getSelection && s.getSelection();
        if (d && d.rangeCount !== 0) {
          s = d.anchorNode;
          var y = d.anchorOffset, w = d.focusNode;
          d = d.focusOffset;
          try {
            s.nodeType, w.nodeType;
          } catch {
            s = null;
            break e;
          }
          var O = 0, I = -1, K = -1, ye = 0, Ue = 0, $e = r, Ne = null;
          t: for (; ; ) {
            for (var st; $e !== s || y !== 0 && $e.nodeType !== 3 || (I = O + y), $e !== w || d !== 0 && $e.nodeType !== 3 || (K = O + d), $e.nodeType === 3 && (O += $e.nodeValue.length), (st = $e.firstChild) !== null; )
              Ne = $e, $e = st;
            for (; ; ) {
              if ($e === r) break t;
              if (Ne === s && ++ye === y && (I = O), Ne === w && ++Ue === d && (K = O), (st = $e.nextSibling) !== null) break;
              $e = Ne, Ne = $e.parentNode;
            }
            $e = st;
          }
          s = I === -1 || K === -1 ? null : { start: I, end: K };
        } else s = null;
      }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (Bo = { focusedElem: r, selectionRange: s }, oi = !1, vt = i; vt !== null; ) if (i = vt, r = i.child, (i.subtreeFlags & 1028) !== 0 && r !== null) r.return = i, vt = r;
    else for (; vt !== null; ) {
      i = vt;
      try {
        var mt = i.alternate;
        if ((i.flags & 1024) !== 0) switch (i.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (mt !== null) {
              var St = mt.memoizedProps, fr = mt.memoizedState, se = i.stateNode, ee = se.getSnapshotBeforeUpdate(i.elementType === i.type ? St : Ui(i.type, St), fr);
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
            throw Error(u(163));
        }
      } catch (je) {
        Kn(i, i.return, je);
      }
      if (r = i.sibling, r !== null) {
        r.return = i.return, vt = r;
        break;
      }
      vt = i.return;
    }
    return mt = Tm, Tm = !1, mt;
  }
  function xc(r, i, s) {
    var d = i.updateQueue;
    if (d = d !== null ? d.lastEffect : null, d !== null) {
      var y = d = d.next;
      do {
        if ((y.tag & r) === r) {
          var w = y.destroy;
          y.destroy = void 0, w !== void 0 && Kf(i, s, w);
        }
        y = y.next;
      } while (y !== d);
    }
  }
  function wc(r, i) {
    if (i = i.updateQueue, i = i !== null ? i.lastEffect : null, i !== null) {
      var s = i = i.next;
      do {
        if ((s.tag & r) === r) {
          var d = s.create;
          s.destroy = d();
        }
        s = s.next;
      } while (s !== i);
    }
  }
  function Gp(r) {
    var i = r.ref;
    if (i !== null) {
      var s = r.stateNode;
      r.tag, r = s, typeof i == "function" ? i(r) : i.current = r;
    }
  }
  function Zf(r) {
    var i = r.alternate;
    i !== null && (r.alternate = null, Zf(i)), r.child = null, r.deletions = null, r.sibling = null, r.tag === 5 && (i = r.stateNode, i !== null && (delete i[Ki], delete i[Ks], delete i[Zs], delete i[Qu], delete i[m1])), r.stateNode = null, r.return = null, r.dependencies = null, r.memoizedProps = null, r.memoizedState = null, r.pendingProps = null, r.stateNode = null, r.updateQueue = null;
  }
  function Cc(r) {
    return r.tag === 5 || r.tag === 3 || r.tag === 4;
  }
  function Al(r) {
    e: for (; ; ) {
      for (; r.sibling === null; ) {
        if (r.return === null || Cc(r.return)) return null;
        r = r.return;
      }
      for (r.sibling.return = r.return, r = r.sibling; r.tag !== 5 && r.tag !== 6 && r.tag !== 18; ) {
        if (r.flags & 2 || r.child === null || r.tag === 4) continue e;
        r.child.return = r, r = r.child;
      }
      if (!(r.flags & 2)) return r.stateNode;
    }
  }
  function al(r, i, s) {
    var d = r.tag;
    if (d === 5 || d === 6) r = r.stateNode, i ? s.nodeType === 8 ? s.parentNode.insertBefore(r, i) : s.insertBefore(r, i) : (s.nodeType === 8 ? (i = s.parentNode, i.insertBefore(r, s)) : (i = s, i.appendChild(r)), s = s._reactRootContainer, s != null || i.onclick !== null || (i.onclick = lo));
    else if (d !== 4 && (r = r.child, r !== null)) for (al(r, i, s), r = r.sibling; r !== null; ) al(r, i, s), r = r.sibling;
  }
  function il(r, i, s) {
    var d = r.tag;
    if (d === 5 || d === 6) r = r.stateNode, i ? s.insertBefore(r, i) : s.appendChild(r);
    else if (d !== 4 && (r = r.child, r !== null)) for (il(r, i, s), r = r.sibling; r !== null; ) il(r, i, s), r = r.sibling;
  }
  var sr = null, va = !1;
  function ha(r, i, s) {
    for (s = s.child; s !== null; ) Mm(r, i, s), s = s.sibling;
  }
  function Mm(r, i, s) {
    if (Qn && typeof Qn.onCommitFiberUnmount == "function") try {
      Qn.onCommitFiberUnmount(ai, s);
    } catch {
    }
    switch (s.tag) {
      case 5:
        na || ns(s, i);
      case 6:
        var d = sr, y = va;
        sr = null, ha(r, i, s), sr = d, va = y, sr !== null && (va ? (r = sr, s = s.stateNode, r.nodeType === 8 ? r.parentNode.removeChild(s) : r.removeChild(s)) : sr.removeChild(s.stateNode));
        break;
      case 18:
        sr !== null && (va ? (r = sr, s = s.stateNode, r.nodeType === 8 ? Gu(r.parentNode, s) : r.nodeType === 1 && Gu(r, s), Oi(r)) : Gu(sr, s.stateNode));
        break;
      case 4:
        d = sr, y = va, sr = s.stateNode.containerInfo, va = !0, ha(r, i, s), sr = d, va = y;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!na && (d = s.updateQueue, d !== null && (d = d.lastEffect, d !== null))) {
          y = d = d.next;
          do {
            var w = y, O = w.destroy;
            w = w.tag, O !== void 0 && ((w & 2) !== 0 || (w & 4) !== 0) && Kf(s, i, O), y = y.next;
          } while (y !== d);
        }
        ha(r, i, s);
        break;
      case 1:
        if (!na && (ns(s, i), d = s.stateNode, typeof d.componentWillUnmount == "function")) try {
          d.props = s.memoizedProps, d.state = s.memoizedState, d.componentWillUnmount();
        } catch (I) {
          Kn(s, i, I);
        }
        ha(r, i, s);
        break;
      case 21:
        ha(r, i, s);
        break;
      case 22:
        s.mode & 1 ? (na = (d = na) || s.memoizedState !== null, ha(r, i, s), na = d) : ha(r, i, s);
        break;
      default:
        ha(r, i, s);
    }
  }
  function _m(r) {
    var i = r.updateQueue;
    if (i !== null) {
      r.updateQueue = null;
      var s = r.stateNode;
      s === null && (s = r.stateNode = new g1()), i.forEach(function(d) {
        var y = jm.bind(null, r, d);
        s.has(d) || (s.add(d), d.then(y, y));
      });
    }
  }
  function ji(r, i) {
    var s = i.deletions;
    if (s !== null) for (var d = 0; d < s.length; d++) {
      var y = s[d];
      try {
        var w = r, O = i, I = O;
        e: for (; I !== null; ) {
          switch (I.tag) {
            case 5:
              sr = I.stateNode, va = !1;
              break e;
            case 3:
              sr = I.stateNode.containerInfo, va = !0;
              break e;
            case 4:
              sr = I.stateNode.containerInfo, va = !0;
              break e;
          }
          I = I.return;
        }
        if (sr === null) throw Error(u(160));
        Mm(w, O, y), sr = null, va = !1;
        var K = y.alternate;
        K !== null && (K.return = null), y.return = null;
      } catch (ye) {
        Kn(y, i, ye);
      }
    }
    if (i.subtreeFlags & 12854) for (i = i.child; i !== null; ) Qp(i, r), i = i.sibling;
  }
  function Qp(r, i) {
    var s = r.alternate, d = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ji(i, r), Ua(r), d & 4) {
          try {
            xc(3, r, r.return), wc(3, r);
          } catch (St) {
            Kn(r, r.return, St);
          }
          try {
            xc(5, r, r.return);
          } catch (St) {
            Kn(r, r.return, St);
          }
        }
        break;
      case 1:
        ji(i, r), Ua(r), d & 512 && s !== null && ns(s, s.return);
        break;
      case 5:
        if (ji(i, r), Ua(r), d & 512 && s !== null && ns(s, s.return), r.flags & 32) {
          var y = r.stateNode;
          try {
            Ce(y, "");
          } catch (St) {
            Kn(r, r.return, St);
          }
        }
        if (d & 4 && (y = r.stateNode, y != null)) {
          var w = r.memoizedProps, O = s !== null ? s.memoizedProps : w, I = r.type, K = r.updateQueue;
          if (r.updateQueue = null, K !== null) try {
            I === "input" && w.type === "radio" && w.name != null && et(y, w), ht(I, O);
            var ye = ht(I, w);
            for (O = 0; O < K.length; O += 2) {
              var Ue = K[O], $e = K[O + 1];
              Ue === "style" ? Lt(y, $e) : Ue === "dangerouslySetInnerHTML" ? Xt(y, $e) : Ue === "children" ? Ce(y, $e) : P(y, Ue, $e, ye);
            }
            switch (I) {
              case "input":
                ze(y, w);
                break;
              case "textarea":
                nt(y, w);
                break;
              case "select":
                var Ne = y._wrapperState.wasMultiple;
                y._wrapperState.wasMultiple = !!w.multiple;
                var st = w.value;
                st != null ? Me(y, !!w.multiple, st, !1) : Ne !== !!w.multiple && (w.defaultValue != null ? Me(
                  y,
                  !!w.multiple,
                  w.defaultValue,
                  !0
                ) : Me(y, !!w.multiple, w.multiple ? [] : "", !1));
            }
            y[Ks] = w;
          } catch (St) {
            Kn(r, r.return, St);
          }
        }
        break;
      case 6:
        if (ji(i, r), Ua(r), d & 4) {
          if (r.stateNode === null) throw Error(u(162));
          y = r.stateNode, w = r.memoizedProps;
          try {
            y.nodeValue = w;
          } catch (St) {
            Kn(r, r.return, St);
          }
        }
        break;
      case 3:
        if (ji(i, r), Ua(r), d & 4 && s !== null && s.memoizedState.isDehydrated) try {
          Oi(i.containerInfo);
        } catch (St) {
          Kn(r, r.return, St);
        }
        break;
      case 4:
        ji(i, r), Ua(r);
        break;
      case 13:
        ji(i, r), Ua(r), y = r.child, y.flags & 8192 && (w = y.memoizedState !== null, y.stateNode.isHidden = w, !w || y.alternate !== null && y.alternate.memoizedState !== null || (Zp = qt())), d & 4 && _m(r);
        break;
      case 22:
        if (Ue = s !== null && s.memoizedState !== null, r.mode & 1 ? (na = (ye = na) || Ue, ji(i, r), na = ye) : ji(i, r), Ua(r), d & 8192) {
          if (ye = r.memoizedState !== null, (r.stateNode.isHidden = ye) && !Ue && (r.mode & 1) !== 0) for (vt = r, Ue = r.child; Ue !== null; ) {
            for ($e = vt = Ue; vt !== null; ) {
              switch (Ne = vt, st = Ne.child, Ne.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  xc(4, Ne, Ne.return);
                  break;
                case 1:
                  ns(Ne, Ne.return);
                  var mt = Ne.stateNode;
                  if (typeof mt.componentWillUnmount == "function") {
                    d = Ne, s = Ne.return;
                    try {
                      i = d, mt.props = i.memoizedProps, mt.state = i.memoizedState, mt.componentWillUnmount();
                    } catch (St) {
                      Kn(d, s, St);
                    }
                  }
                  break;
                case 5:
                  ns(Ne, Ne.return);
                  break;
                case 22:
                  if (Ne.memoizedState !== null) {
                    bc($e);
                    continue;
                  }
              }
              st !== null ? (st.return = Ne, vt = st) : bc($e);
            }
            Ue = Ue.sibling;
          }
          e: for (Ue = null, $e = r; ; ) {
            if ($e.tag === 5) {
              if (Ue === null) {
                Ue = $e;
                try {
                  y = $e.stateNode, ye ? (w = y.style, typeof w.setProperty == "function" ? w.setProperty("display", "none", "important") : w.display = "none") : (I = $e.stateNode, K = $e.memoizedProps.style, O = K != null && K.hasOwnProperty("display") ? K.display : null, I.style.display = Ye("display", O));
                } catch (St) {
                  Kn(r, r.return, St);
                }
              }
            } else if ($e.tag === 6) {
              if (Ue === null) try {
                $e.stateNode.nodeValue = ye ? "" : $e.memoizedProps;
              } catch (St) {
                Kn(r, r.return, St);
              }
            } else if (($e.tag !== 22 && $e.tag !== 23 || $e.memoizedState === null || $e === r) && $e.child !== null) {
              $e.child.return = $e, $e = $e.child;
              continue;
            }
            if ($e === r) break e;
            for (; $e.sibling === null; ) {
              if ($e.return === null || $e.return === r) break e;
              Ue === $e && (Ue = null), $e = $e.return;
            }
            Ue === $e && (Ue = null), $e.sibling.return = $e.return, $e = $e.sibling;
          }
        }
        break;
      case 19:
        ji(i, r), Ua(r), d & 4 && _m(r);
        break;
      case 21:
        break;
      default:
        ji(
          i,
          r
        ), Ua(r);
    }
  }
  function Ua(r) {
    var i = r.flags;
    if (i & 2) {
      try {
        e: {
          for (var s = r.return; s !== null; ) {
            if (Cc(s)) {
              var d = s;
              break e;
            }
            s = s.return;
          }
          throw Error(u(160));
        }
        switch (d.tag) {
          case 5:
            var y = d.stateNode;
            d.flags & 32 && (Ce(y, ""), d.flags &= -33);
            var w = Al(r);
            il(r, w, y);
            break;
          case 3:
          case 4:
            var O = d.stateNode.containerInfo, I = Al(r);
            al(r, I, O);
            break;
          default:
            throw Error(u(161));
        }
      } catch (K) {
        Kn(r, r.return, K);
      }
      r.flags &= -3;
    }
    i & 4096 && (r.flags &= -4097);
  }
  function S1(r, i, s) {
    vt = r, Xp(r);
  }
  function Xp(r, i, s) {
    for (var d = (r.mode & 1) !== 0; vt !== null; ) {
      var y = vt, w = y.child;
      if (y.tag === 22 && d) {
        var O = y.memoizedState !== null || Ec;
        if (!O) {
          var I = y.alternate, K = I !== null && I.memoizedState !== null || na;
          I = Ec;
          var ye = na;
          if (Ec = O, (na = K) && !ye) for (vt = y; vt !== null; ) O = vt, K = O.child, O.tag === 22 && O.memoizedState !== null ? Kp(y) : K !== null ? (K.return = O, vt = K) : Kp(y);
          for (; w !== null; ) vt = w, Xp(w), w = w.sibling;
          vt = y, Ec = I, na = ye;
        }
        km(r);
      } else (y.subtreeFlags & 8772) !== 0 && w !== null ? (w.return = y, vt = w) : km(r);
    }
  }
  function km(r) {
    for (; vt !== null; ) {
      var i = vt;
      if ((i.flags & 8772) !== 0) {
        var s = i.alternate;
        try {
          if ((i.flags & 8772) !== 0) switch (i.tag) {
            case 0:
            case 11:
            case 15:
              na || wc(5, i);
              break;
            case 1:
              var d = i.stateNode;
              if (i.flags & 4 && !na) if (s === null) d.componentDidMount();
              else {
                var y = i.elementType === i.type ? s.memoizedProps : Ui(i.type, s.memoizedProps);
                d.componentDidUpdate(y, s.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
              }
              var w = i.updateQueue;
              w !== null && zp(i, w, d);
              break;
            case 3:
              var O = i.updateQueue;
              if (O !== null) {
                if (s = null, i.child !== null) switch (i.child.tag) {
                  case 5:
                    s = i.child.stateNode;
                    break;
                  case 1:
                    s = i.child.stateNode;
                }
                zp(i, O, s);
              }
              break;
            case 5:
              var I = i.stateNode;
              if (s === null && i.flags & 4) {
                s = I;
                var K = i.memoizedProps;
                switch (i.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    K.autoFocus && s.focus();
                    break;
                  case "img":
                    K.src && (s.src = K.src);
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
                    var $e = Ue.dehydrated;
                    $e !== null && Oi($e);
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
              throw Error(u(163));
          }
          na || i.flags & 512 && Gp(i);
        } catch (Ne) {
          Kn(i, i.return, Ne);
        }
      }
      if (i === r) {
        vt = null;
        break;
      }
      if (s = i.sibling, s !== null) {
        s.return = i.return, vt = s;
        break;
      }
      vt = i.return;
    }
  }
  function bc(r) {
    for (; vt !== null; ) {
      var i = vt;
      if (i === r) {
        vt = null;
        break;
      }
      var s = i.sibling;
      if (s !== null) {
        s.return = i.return, vt = s;
        break;
      }
      vt = i.return;
    }
  }
  function Kp(r) {
    for (; vt !== null; ) {
      var i = vt;
      try {
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            var s = i.return;
            try {
              wc(4, i);
            } catch (K) {
              Kn(i, s, K);
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
              Gp(i);
            } catch (K) {
              Kn(i, w, K);
            }
            break;
          case 5:
            var O = i.return;
            try {
              Gp(i);
            } catch (K) {
              Kn(i, O, K);
            }
        }
      } catch (K) {
        Kn(i, i.return, K);
      }
      if (i === r) {
        vt = null;
        break;
      }
      var I = i.sibling;
      if (I !== null) {
        I.return = i.return, vt = I;
        break;
      }
      vt = i.return;
    }
  }
  var E1 = Math.ceil, go = j.ReactCurrentDispatcher, su = j.ReactCurrentOwner, qr = j.ReactCurrentBatchConfig, vn = 0, Dr = null, xr = null, Yr = 0, Xa = 0, rs = ci(0), cr = 0, Tc = null, ll = 0, as = 0, Jf = 0, Rc = null, ja = null, Zp = 0, is = 1 / 0, Ka = null, ls = !1, cu = null, So = null, ed = !1, Ll = null, Mc = 0, Eo = 0, os = null, _c = -1, ra = 0;
  function wr() {
    return (vn & 6) !== 0 ? qt() : _c !== -1 ? _c : _c = qt();
  }
  function ol(r) {
    return (r.mode & 1) === 0 ? 1 : (vn & 2) !== 0 && Yr !== 0 ? Yr & -Yr : y1.transition !== null ? (ra === 0 && (ra = Lu()), ra) : (r = Cn, r !== 0 || (r = window.event, r = r === void 0 ? 16 : $u(r.type)), r);
  }
  function ma(r, i, s, d) {
    if (50 < Eo) throw Eo = 0, os = null, Error(u(185));
    El(r, s, d), ((vn & 2) === 0 || r !== Dr) && (r === Dr && ((vn & 2) === 0 && (as |= s), cr === 4 && Fi(r, Yr)), Fa(r, d), s === 1 && vn === 0 && (i.mode & 1) === 0 && (is = qt() + 500, Ku && Ji()));
  }
  function Fa(r, i) {
    var s = r.callbackNode;
    Rr(r, i);
    var d = Zn(r, r === Dr ? Yr : 0);
    if (d === 0) s !== null && In(s), r.callbackNode = null, r.callbackPriority = 0;
    else if (i = d & -d, r.callbackPriority !== i) {
      if (s != null && In(s), i === 1) r.tag === 0 ? uo(Jp.bind(null, r)) : Ef(Jp.bind(null, r)), Bu(function() {
        (vn & 6) === 0 && Ji();
      }), s = null;
      else {
        switch (zu(d)) {
          case 1:
            s = sa;
            break;
          case 4:
            s = _i;
            break;
          case 16:
            s = ki;
            break;
          case 536870912:
            s = qi;
            break;
          default:
            s = ki;
        }
        s = Pm(s, td.bind(null, r));
      }
      r.callbackPriority = i, r.callbackNode = s;
    }
  }
  function td(r, i) {
    if (_c = -1, ra = 0, (vn & 6) !== 0) throw Error(u(327));
    var s = r.callbackNode;
    if (us() && r.callbackNode !== s) return null;
    var d = Zn(r, r === Dr ? Yr : 0);
    if (d === 0) return null;
    if ((d & 30) !== 0 || (d & r.expiredLanes) !== 0 || i) i = nd(r, d);
    else {
      i = d;
      var y = vn;
      vn |= 2;
      var w = Om();
      (Dr !== r || Yr !== i) && (Ka = null, is = qt() + 500, Nl(r, i));
      do
        try {
          Am();
          break;
        } catch (I) {
          Dm(r, I);
        }
      while (!0);
      kp(), go.current = w, vn = y, xr !== null ? i = 0 : (Dr = null, Yr = 0, i = cr);
    }
    if (i !== 0) {
      if (i === 2 && (y = Jl(r), y !== 0 && (d = y, i = kc(r, y))), i === 1) throw s = Tc, Nl(r, 0), Fi(r, d), Fa(r, qt()), s;
      if (i === 6) Fi(r, d);
      else {
        if (y = r.current.alternate, (d & 30) === 0 && !x1(y) && (i = nd(r, d), i === 2 && (w = Jl(r), w !== 0 && (d = w, i = kc(r, w))), i === 1)) throw s = Tc, Nl(r, 0), Fi(r, d), Fa(r, qt()), s;
        switch (r.finishedWork = y, r.finishedLanes = d, i) {
          case 0:
          case 1:
            throw Error(u(345));
          case 2:
            pu(r, ja, Ka);
            break;
          case 3:
            if (Fi(r, d), (d & 130023424) === d && (i = Zp + 500 - qt(), 10 < i)) {
              if (Zn(r, 0) !== 0) break;
              if (y = r.suspendedLanes, (y & d) !== d) {
                wr(), r.pingedLanes |= r.suspendedLanes & y;
                break;
              }
              r.timeoutHandle = yf(pu.bind(null, r, ja, Ka), i);
              break;
            }
            pu(r, ja, Ka);
            break;
          case 4:
            if (Fi(r, d), (d & 4194240) === d) break;
            for (i = r.eventTimes, y = -1; 0 < d; ) {
              var O = 31 - $r(d);
              w = 1 << O, O = i[O], O > y && (y = O), d &= ~w;
            }
            if (d = y, d = qt() - d, d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * E1(d / 1960)) - d, 10 < d) {
              r.timeoutHandle = yf(pu.bind(null, r, ja, Ka), d);
              break;
            }
            pu(r, ja, Ka);
            break;
          case 5:
            pu(r, ja, Ka);
            break;
          default:
            throw Error(u(329));
        }
      }
    }
    return Fa(r, qt()), r.callbackNode === s ? td.bind(null, r) : null;
  }
  function kc(r, i) {
    var s = Rc;
    return r.current.memoizedState.isDehydrated && (Nl(r, i).flags |= 256), r = nd(r, i), r !== 2 && (i = ja, ja = s, i !== null && fu(i)), r;
  }
  function fu(r) {
    ja === null ? ja = r : ja.push.apply(ja, r);
  }
  function x1(r) {
    for (var i = r; ; ) {
      if (i.flags & 16384) {
        var s = i.updateQueue;
        if (s !== null && (s = s.stores, s !== null)) for (var d = 0; d < s.length; d++) {
          var y = s[d], w = y.getSnapshot;
          y = y.value;
          try {
            if (!Li(w(), y)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (s = i.child, i.subtreeFlags & 16384 && s !== null) s.return = i, i = s;
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
  function Fi(r, i) {
    for (i &= ~Jf, i &= ~as, r.suspendedLanes |= i, r.pingedLanes &= ~i, r = r.expirationTimes; 0 < i; ) {
      var s = 31 - $r(i), d = 1 << s;
      r[s] = -1, i &= ~d;
    }
  }
  function Jp(r) {
    if ((vn & 6) !== 0) throw Error(u(327));
    us();
    var i = Zn(r, 0);
    if ((i & 1) === 0) return Fa(r, qt()), null;
    var s = nd(r, i);
    if (r.tag !== 0 && s === 2) {
      var d = Jl(r);
      d !== 0 && (i = d, s = kc(r, d));
    }
    if (s === 1) throw s = Tc, Nl(r, 0), Fi(r, i), Fa(r, qt()), s;
    if (s === 6) throw Error(u(345));
    return r.finishedWork = r.current.alternate, r.finishedLanes = i, pu(r, ja, Ka), Fa(r, qt()), null;
  }
  function ev(r, i) {
    var s = vn;
    vn |= 1;
    try {
      return r(i);
    } finally {
      vn = s, vn === 0 && (is = qt() + 500, Ku && Ji());
    }
  }
  function du(r) {
    Ll !== null && Ll.tag === 0 && (vn & 6) === 0 && us();
    var i = vn;
    vn |= 1;
    var s = qr.transition, d = Cn;
    try {
      if (qr.transition = null, Cn = 1, r) return r();
    } finally {
      Cn = d, qr.transition = s, vn = i, (vn & 6) === 0 && Ji();
    }
  }
  function tv() {
    Xa = rs.current, Pn(rs);
  }
  function Nl(r, i) {
    r.finishedWork = null, r.finishedLanes = 0;
    var s = r.timeoutHandle;
    if (s !== -1 && (r.timeoutHandle = -1, bp(s)), xr !== null) for (s = xr.return; s !== null; ) {
      var d = s;
      switch (wf(d), d.tag) {
        case 1:
          d = d.type.childContextTypes, d != null && Xu();
          break;
        case 3:
          eu(), Pn(_r), Pn(ir), Dt();
          break;
        case 5:
          Rf(d);
          break;
        case 4:
          eu();
          break;
        case 13:
          Pn(nr);
          break;
        case 19:
          Pn(nr);
          break;
        case 10:
          Dp(d.type._context);
          break;
        case 22:
        case 23:
          tv();
      }
      s = s.return;
    }
    if (Dr = r, xr = r = xo(r.current, null), Yr = Xa = i, cr = 0, Tc = null, Jf = as = ll = 0, ja = Rc = null, Zo !== null) {
      for (i = 0; i < Zo.length; i++) if (s = Zo[i], d = s.interleaved, d !== null) {
        s.interleaved = null;
        var y = d.next, w = s.pending;
        if (w !== null) {
          var O = w.next;
          w.next = y, d.next = O;
        }
        s.pending = d;
      }
      Zo = null;
    }
    return r;
  }
  function Dm(r, i) {
    do {
      var s = xr;
      try {
        if (kp(), ln.current = lu, _f) {
          for (var d = Tn.memoizedState; d !== null; ) {
            var y = d.queue;
            y !== null && (y.pending = null), d = d.next;
          }
          _f = !1;
        }
        if (Nn = 0, zr = gr = Tn = null, lc = !1, tu = 0, su.current = null, s === null || s.return === null) {
          cr = 1, Tc = i, xr = null;
          break;
        }
        e: {
          var w = r, O = s.return, I = s, K = i;
          if (i = Yr, I.flags |= 32768, K !== null && typeof K == "object" && typeof K.then == "function") {
            var ye = K, Ue = I, $e = Ue.tag;
            if ((Ue.mode & 1) === 0 && ($e === 0 || $e === 11 || $e === 15)) {
              var Ne = Ue.alternate;
              Ne ? (Ue.updateQueue = Ne.updateQueue, Ue.memoizedState = Ne.memoizedState, Ue.lanes = Ne.lanes) : (Ue.updateQueue = null, Ue.memoizedState = null);
            }
            var st = ym(O);
            if (st !== null) {
              st.flags &= -257, yo(st, O, I, w, i), st.mode & 1 && Ip(w, ye, i), i = st, K = ye;
              var mt = i.updateQueue;
              if (mt === null) {
                var St = /* @__PURE__ */ new Set();
                St.add(K), i.updateQueue = St;
              } else mt.add(K);
              break e;
            } else {
              if ((i & 1) === 0) {
                Ip(w, ye, i), nv();
                break e;
              }
              K = Error(u(426));
            }
          } else if (Xn && I.mode & 1) {
            var fr = ym(O);
            if (fr !== null) {
              (fr.flags & 65536) === 0 && (fr.flags |= 256), yo(fr, O, I, w, i), kl(ou(K, I));
              break e;
            }
          }
          w = K = ou(K, I), cr !== 4 && (cr = 2), Rc === null ? Rc = [w] : Rc.push(w), w = O;
          do {
            switch (w.tag) {
              case 3:
                w.flags |= 65536, i &= -i, w.lanes |= i;
                var se = mm(w, K, i);
                fm(w, se);
                break e;
              case 1:
                I = K;
                var ee = w.type, pe = w.stateNode;
                if ((w.flags & 128) === 0 && (typeof ee.getDerivedStateFromError == "function" || pe !== null && typeof pe.componentDidCatch == "function" && (So === null || !So.has(pe)))) {
                  w.flags |= 65536, i &= -i, w.lanes |= i;
                  var je = Vp(w, I, i);
                  fm(w, je);
                  break e;
                }
            }
            w = w.return;
          } while (w !== null);
        }
        Nm(s);
      } catch (yt) {
        i = yt, xr === s && s !== null && (xr = s = s.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Om() {
    var r = go.current;
    return go.current = lu, r === null ? lu : r;
  }
  function nv() {
    (cr === 0 || cr === 3 || cr === 2) && (cr = 4), Dr === null || (ll & 268435455) === 0 && (as & 268435455) === 0 || Fi(Dr, Yr);
  }
  function nd(r, i) {
    var s = vn;
    vn |= 2;
    var d = Om();
    (Dr !== r || Yr !== i) && (Ka = null, Nl(r, i));
    do
      try {
        w1();
        break;
      } catch (y) {
        Dm(r, y);
      }
    while (!0);
    if (kp(), vn = s, go.current = d, xr !== null) throw Error(u(261));
    return Dr = null, Yr = 0, cr;
  }
  function w1() {
    for (; xr !== null; ) Lm(xr);
  }
  function Am() {
    for (; xr !== null && !Ma(); ) Lm(xr);
  }
  function Lm(r) {
    var i = Fm(r.alternate, r, Xa);
    r.memoizedProps = r.pendingProps, i === null ? Nm(r) : xr = i, su.current = null;
  }
  function Nm(r) {
    var i = r;
    do {
      var s = i.alternate;
      if (r = i.return, (i.flags & 32768) === 0) {
        if (s = bm(s, i, Xa), s !== null) {
          xr = s;
          return;
        }
      } else {
        if (s = Xf(s, i), s !== null) {
          s.flags &= 32767, xr = s;
          return;
        }
        if (r !== null) r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null;
        else {
          cr = 6, xr = null;
          return;
        }
      }
      if (i = i.sibling, i !== null) {
        xr = i;
        return;
      }
      xr = i = r;
    } while (i !== null);
    cr === 0 && (cr = 5);
  }
  function pu(r, i, s) {
    var d = Cn, y = qr.transition;
    try {
      qr.transition = null, Cn = 1, C1(r, i, s, d);
    } finally {
      qr.transition = y, Cn = d;
    }
    return null;
  }
  function C1(r, i, s, d) {
    do
      us();
    while (Ll !== null);
    if ((vn & 6) !== 0) throw Error(u(327));
    s = r.finishedWork;
    var y = r.finishedLanes;
    if (s === null) return null;
    if (r.finishedWork = null, r.finishedLanes = 0, s === r.current) throw Error(u(177));
    r.callbackNode = null, r.callbackPriority = 0;
    var w = s.lanes | s.childLanes;
    if (rp(r, w), r === Dr && (xr = Dr = null, Yr = 0), (s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0 || ed || (ed = !0, Pm(ki, function() {
      return us(), null;
    })), w = (s.flags & 15990) !== 0, (s.subtreeFlags & 15990) !== 0 || w) {
      w = qr.transition, qr.transition = null;
      var O = Cn;
      Cn = 1;
      var I = vn;
      vn |= 4, su.current = null, Rm(r, s), Qp(s, r), Iu(Bo), oi = !!Xs, Bo = Xs = null, r.current = s, S1(s), ua(), vn = I, Cn = O, qr.transition = w;
    } else r.current = s;
    if (ed && (ed = !1, Ll = r, Mc = y), w = r.pendingLanes, w === 0 && (So = null), Fo(s.stateNode), Fa(r, qt()), i !== null) for (d = r.onRecoverableError, s = 0; s < i.length; s++) y = i[s], d(y.value, { componentStack: y.stack, digest: y.digest });
    if (ls) throw ls = !1, r = cu, cu = null, r;
    return (Mc & 1) !== 0 && r.tag !== 0 && us(), w = r.pendingLanes, (w & 1) !== 0 ? r === os ? Eo++ : (Eo = 0, os = r) : Eo = 0, Ji(), null;
  }
  function us() {
    if (Ll !== null) {
      var r = zu(Mc), i = qr.transition, s = Cn;
      try {
        if (qr.transition = null, Cn = 16 > r ? 16 : r, Ll === null) var d = !1;
        else {
          if (r = Ll, Ll = null, Mc = 0, (vn & 6) !== 0) throw Error(u(331));
          var y = vn;
          for (vn |= 4, vt = r.current; vt !== null; ) {
            var w = vt, O = w.child;
            if ((vt.flags & 16) !== 0) {
              var I = w.deletions;
              if (I !== null) {
                for (var K = 0; K < I.length; K++) {
                  var ye = I[K];
                  for (vt = ye; vt !== null; ) {
                    var Ue = vt;
                    switch (Ue.tag) {
                      case 0:
                      case 11:
                      case 15:
                        xc(8, Ue, w);
                    }
                    var $e = Ue.child;
                    if ($e !== null) $e.return = Ue, vt = $e;
                    else for (; vt !== null; ) {
                      Ue = vt;
                      var Ne = Ue.sibling, st = Ue.return;
                      if (Zf(Ue), Ue === ye) {
                        vt = null;
                        break;
                      }
                      if (Ne !== null) {
                        Ne.return = st, vt = Ne;
                        break;
                      }
                      vt = st;
                    }
                  }
                }
                var mt = w.alternate;
                if (mt !== null) {
                  var St = mt.child;
                  if (St !== null) {
                    mt.child = null;
                    do {
                      var fr = St.sibling;
                      St.sibling = null, St = fr;
                    } while (St !== null);
                  }
                }
                vt = w;
              }
            }
            if ((w.subtreeFlags & 2064) !== 0 && O !== null) O.return = w, vt = O;
            else e: for (; vt !== null; ) {
              if (w = vt, (w.flags & 2048) !== 0) switch (w.tag) {
                case 0:
                case 11:
                case 15:
                  xc(9, w, w.return);
              }
              var se = w.sibling;
              if (se !== null) {
                se.return = w.return, vt = se;
                break e;
              }
              vt = w.return;
            }
          }
          var ee = r.current;
          for (vt = ee; vt !== null; ) {
            O = vt;
            var pe = O.child;
            if ((O.subtreeFlags & 2064) !== 0 && pe !== null) pe.return = O, vt = pe;
            else e: for (O = ee; vt !== null; ) {
              if (I = vt, (I.flags & 2048) !== 0) try {
                switch (I.tag) {
                  case 0:
                  case 11:
                  case 15:
                    wc(9, I);
                }
              } catch (yt) {
                Kn(I, I.return, yt);
              }
              if (I === O) {
                vt = null;
                break e;
              }
              var je = I.sibling;
              if (je !== null) {
                je.return = I.return, vt = je;
                break e;
              }
              vt = I.return;
            }
          }
          if (vn = y, Ji(), Qn && typeof Qn.onPostCommitFiberRoot == "function") try {
            Qn.onPostCommitFiberRoot(ai, r);
          } catch {
          }
          d = !0;
        }
        return d;
      } finally {
        Cn = s, qr.transition = i;
      }
    }
    return !1;
  }
  function zm(r, i, s) {
    i = ou(s, i), i = mm(r, i, 1), r = vo(r, i, 1), i = wr(), r !== null && (El(r, 1, i), Fa(r, i));
  }
  function Kn(r, i, s) {
    if (r.tag === 3) zm(r, r, s);
    else for (; i !== null; ) {
      if (i.tag === 3) {
        zm(i, r, s);
        break;
      } else if (i.tag === 1) {
        var d = i.stateNode;
        if (typeof i.type.getDerivedStateFromError == "function" || typeof d.componentDidCatch == "function" && (So === null || !So.has(d))) {
          r = ou(s, r), r = Vp(i, r, 1), i = vo(i, r, 1), r = wr(), i !== null && (El(i, 1, r), Fa(i, r));
          break;
        }
      }
      i = i.return;
    }
  }
  function b1(r, i, s) {
    var d = r.pingCache;
    d !== null && d.delete(i), i = wr(), r.pingedLanes |= r.suspendedLanes & s, Dr === r && (Yr & s) === s && (cr === 4 || cr === 3 && (Yr & 130023424) === Yr && 500 > qt() - Zp ? Nl(r, 0) : Jf |= s), Fa(r, i);
  }
  function Um(r, i) {
    i === 0 && ((r.mode & 1) === 0 ? i = 1 : (i = an, an <<= 1, (an & 130023424) === 0 && (an = 4194304)));
    var s = wr();
    r = Ga(r, i), r !== null && (El(r, i, s), Fa(r, s));
  }
  function T1(r) {
    var i = r.memoizedState, s = 0;
    i !== null && (s = i.retryLane), Um(r, s);
  }
  function jm(r, i) {
    var s = 0;
    switch (r.tag) {
      case 13:
        var d = r.stateNode, y = r.memoizedState;
        y !== null && (s = y.retryLane);
        break;
      case 19:
        d = r.stateNode;
        break;
      default:
        throw Error(u(314));
    }
    d !== null && d.delete(i), Um(r, s);
  }
  var Fm;
  Fm = function(r, i, s) {
    if (r !== null) if (r.memoizedProps !== i.pendingProps || _r.current) Sr = !0;
    else {
      if ((r.lanes & s) === 0 && (i.flags & 128) === 0) return Sr = !1, gc(r, i, s);
      Sr = (r.flags & 131072) !== 0;
    }
    else Sr = !1, Xn && (i.flags & 1048576) !== 0 && om(i, _l, i.index);
    switch (i.lanes = 0, i.tag) {
      case 2:
        var d = i.type;
        vi(r, i), r = i.pendingProps;
        var y = Da(i, ir.current);
        tr(i, s), y = ho(null, i, d, r, y, s);
        var w = zi();
        return i.flags |= 1, typeof y == "object" && y !== null && typeof y.render == "function" && y.$$typeof === void 0 ? (i.tag = 1, i.memoizedState = null, i.updateQueue = null, mr(d) ? (w = !0, Nr(i)) : w = !1, i.memoizedState = y.state !== null && y.state !== void 0 ? y.state : null, Np(i), y.updater = Yf, i.stateNode = y, y._reactInternals = i, pc(i, d, r, s), i = mc(null, i, d, !0, w, s)) : (i.tag = 0, Xn && w && xf(i), Ir(null, i, y, s), i = i.child), i;
      case 16:
        d = i.elementType;
        e: {
          switch (vi(r, i), r = i.pendingProps, y = d._init, d = y(d._payload), i.type = d, y = i.tag = M1(d), r = Ui(d, r), y) {
            case 0:
              i = gm(null, i, d, r, s);
              break e;
            case 1:
              i = Sm(null, i, d, r, s);
              break e;
            case 11:
              i = za(null, i, d, r, s);
              break e;
            case 14:
              i = uu(null, i, d, Ui(d.type, r), s);
              break e;
          }
          throw Error(u(
            306,
            d,
            ""
          ));
        }
        return i;
      case 0:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Ui(d, y), gm(r, i, d, y, s);
      case 1:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Ui(d, y), Sm(r, i, d, y, s);
      case 3:
        e: {
          if (ts(i), r === null) throw Error(u(387));
          d = i.pendingProps, w = i.memoizedState, y = w.element, cm(r, i), tc(i, d, null, s);
          var O = i.memoizedState;
          if (d = O.element, w.isDehydrated) if (w = { element: d, isDehydrated: !1, cache: O.cache, pendingSuspenseBoundaries: O.pendingSuspenseBoundaries, transitions: O.transitions }, i.updateQueue.baseState = w, i.memoizedState = w, i.flags & 256) {
            y = ou(Error(u(423)), i), i = Em(r, i, d, s, y);
            break e;
          } else if (d !== y) {
            y = ou(Error(u(424)), i), i = Em(r, i, d, s, y);
            break e;
          } else for (Aa = Xi(i.stateNode.containerInfo.firstChild), Oa = i, Xn = !0, di = null, s = rt(i, null, d, s), i.child = s; s; ) s.flags = s.flags & -3 | 4096, s = s.sibling;
          else {
            if (po(), d === y) {
              i = hi(r, i, s);
              break e;
            }
            Ir(r, i, d, s);
          }
          i = i.child;
        }
        return i;
      case 5:
        return dm(i), r === null && Mp(i), d = i.type, y = i.pendingProps, w = r !== null ? r.memoizedProps : null, O = y.children, mf(d, y) ? O = null : w !== null && mf(d, w) && (i.flags |= 32), qp(r, i), Ir(r, i, O, s), i.child;
      case 6:
        return r === null && Mp(i), null;
      case 13:
        return Qf(r, i, s);
      case 4:
        return Up(i, i.stateNode.containerInfo), d = i.pendingProps, r === null ? i.child = or(i, null, d, s) : Ir(r, i, d, s), i.child;
      case 11:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Ui(d, y), za(r, i, d, y, s);
      case 7:
        return Ir(r, i, i.pendingProps, s), i.child;
      case 8:
        return Ir(r, i, i.pendingProps.children, s), i.child;
      case 12:
        return Ir(r, i, i.pendingProps.children, s), i.child;
      case 10:
        e: {
          if (d = i.type._context, y = i.pendingProps, w = i.memoizedProps, O = y.value, _t(Ba, d._currentValue), d._currentValue = O, w !== null) if (Li(w.value, O)) {
            if (w.children === y.children && !_r.current) {
              i = hi(r, i, s);
              break e;
            }
          } else for (w = i.child, w !== null && (w.return = i); w !== null; ) {
            var I = w.dependencies;
            if (I !== null) {
              O = w.child;
              for (var K = I.firstContext; K !== null; ) {
                if (K.context === d) {
                  if (w.tag === 1) {
                    K = Dl(-1, s & -s), K.tag = 2;
                    var ye = w.updateQueue;
                    if (ye !== null) {
                      ye = ye.shared;
                      var Ue = ye.pending;
                      Ue === null ? K.next = K : (K.next = Ue.next, Ue.next = K), ye.pending = K;
                    }
                  }
                  w.lanes |= s, K = w.alternate, K !== null && (K.lanes |= s), Op(
                    w.return,
                    s,
                    i
                  ), I.lanes |= s;
                  break;
                }
                K = K.next;
              }
            } else if (w.tag === 10) O = w.type === i.type ? null : w.child;
            else if (w.tag === 18) {
              if (O = w.return, O === null) throw Error(u(341));
              O.lanes |= s, I = O.alternate, I !== null && (I.lanes |= s), Op(O, s, i), O = w.sibling;
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
          Ir(r, i, y.children, s), i = i.child;
        }
        return i;
      case 9:
        return y = i.type, d = i.pendingProps.children, tr(i, s), y = pi(y), d = d(y), i.flags |= 1, Ir(r, i, d, s), i.child;
      case 14:
        return d = i.type, y = Ui(d, i.pendingProps), y = Ui(d.type, y), uu(r, i, d, y, s);
      case 15:
        return en(r, i, i.type, i.pendingProps, s);
      case 17:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Ui(d, y), vi(r, i), i.tag = 1, mr(d) ? (r = !0, Nr(i)) : r = !1, tr(i, s), Wf(i, d, y), pc(i, d, y, s), mc(null, i, d, !0, r, s);
      case 19:
        return rl(r, i, s);
      case 22:
        return hc(r, i, s);
    }
    throw Error(u(156, i.tag));
  };
  function Pm(r, i) {
    return xn(r, i);
  }
  function R1(r, i, s, d) {
    this.tag = r, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = d, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yi(r, i, s, d) {
    return new R1(r, i, s, d);
  }
  function rv(r) {
    return r = r.prototype, !(!r || !r.isReactComponent);
  }
  function M1(r) {
    if (typeof r == "function") return rv(r) ? 1 : 0;
    if (r != null) {
      if (r = r.$$typeof, r === re) return 11;
      if (r === ae) return 14;
    }
    return 2;
  }
  function xo(r, i) {
    var s = r.alternate;
    return s === null ? (s = yi(r.tag, i, r.key, r.mode), s.elementType = r.elementType, s.type = r.type, s.stateNode = r.stateNode, s.alternate = r, r.alternate = s) : (s.pendingProps = i, s.type = r.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = r.flags & 14680064, s.childLanes = r.childLanes, s.lanes = r.lanes, s.child = r.child, s.memoizedProps = r.memoizedProps, s.memoizedState = r.memoizedState, s.updateQueue = r.updateQueue, i = r.dependencies, s.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, s.sibling = r.sibling, s.index = r.index, s.ref = r.ref, s;
  }
  function Dc(r, i, s, d, y, w) {
    var O = 2;
    if (d = r, typeof r == "function") rv(r) && (O = 1);
    else if (typeof r == "string") O = 5;
    else e: switch (r) {
      case H:
        return zl(s.children, y, w, i);
      case oe:
        O = 8, y |= 8;
        break;
      case Q:
        return r = yi(12, s, i, y | 2), r.elementType = Q, r.lanes = w, r;
      case G:
        return r = yi(13, s, i, y), r.elementType = G, r.lanes = w, r;
      case X:
        return r = yi(19, s, i, y), r.elementType = X, r.lanes = w, r;
      case le:
        return wo(s, y, w, i);
      default:
        if (typeof r == "object" && r !== null) switch (r.$$typeof) {
          case $:
            O = 10;
            break e;
          case ne:
            O = 9;
            break e;
          case re:
            O = 11;
            break e;
          case ae:
            O = 14;
            break e;
          case de:
            O = 16, d = null;
            break e;
        }
        throw Error(u(130, r == null ? r : typeof r, ""));
    }
    return i = yi(O, s, i, y), i.elementType = r, i.type = d, i.lanes = w, i;
  }
  function zl(r, i, s, d) {
    return r = yi(7, r, d, i), r.lanes = s, r;
  }
  function wo(r, i, s, d) {
    return r = yi(22, r, d, i), r.elementType = le, r.lanes = s, r.stateNode = { isHidden: !1 }, r;
  }
  function av(r, i, s) {
    return r = yi(6, r, null, i), r.lanes = s, r;
  }
  function rd(r, i, s) {
    return i = yi(4, r.children !== null ? r.children : [], r.key, i), i.lanes = s, i.stateNode = { containerInfo: r.containerInfo, pendingChildren: null, implementation: r.implementation }, i;
  }
  function $m(r, i, s, d, y) {
    this.tag = i, this.containerInfo = r, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Nu(0), this.expirationTimes = Nu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Nu(0), this.identifierPrefix = d, this.onRecoverableError = y, this.mutableSourceEagerHydrationData = null;
  }
  function ad(r, i, s, d, y, w, O, I, K) {
    return r = new $m(r, i, s, I, K), i === 1 ? (i = 1, w === !0 && (i |= 8)) : i = 0, w = yi(3, null, null, i), r.current = w, w.stateNode = r, w.memoizedState = { element: d, isDehydrated: s, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Np(w), r;
  }
  function _1(r, i, s) {
    var d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: q, key: d == null ? null : "" + d, children: r, containerInfo: i, implementation: s };
  }
  function iv(r) {
    if (!r) return ea;
    r = r._reactInternals;
    e: {
      if (It(r) !== r || r.tag !== 1) throw Error(u(170));
      var i = r;
      do {
        switch (i.tag) {
          case 3:
            i = i.stateNode.context;
            break e;
          case 1:
            if (mr(i.type)) {
              i = i.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        i = i.return;
      } while (i !== null);
      throw Error(u(171));
    }
    if (r.tag === 1) {
      var s = r.type;
      if (mr(s)) return Js(r, s, i);
    }
    return i;
  }
  function Hm(r, i, s, d, y, w, O, I, K) {
    return r = ad(s, d, !0, r, y, w, O, I, K), r.context = iv(null), s = r.current, d = wr(), y = ol(s), w = Dl(d, y), w.callback = i ?? null, vo(s, w, y), r.current.lanes = y, El(r, y, d), Fa(r, d), r;
  }
  function id(r, i, s, d) {
    var y = i.current, w = wr(), O = ol(y);
    return s = iv(s), i.context === null ? i.context = s : i.pendingContext = s, i = Dl(w, O), i.payload = { element: r }, d = d === void 0 ? null : d, d !== null && (i.callback = d), r = vo(y, i, O), r !== null && (ma(r, y, O, w), Tf(r, y, O)), O;
  }
  function ld(r) {
    return r = r.current, r.child ? (r.child.tag === 5, r.child.stateNode) : null;
  }
  function lv(r, i) {
    if (r = r.memoizedState, r !== null && r.dehydrated !== null) {
      var s = r.retryLane;
      r.retryLane = s !== 0 && s < i ? s : i;
    }
  }
  function od(r, i) {
    lv(r, i), (r = r.alternate) && lv(r, i);
  }
  function Vm() {
    return null;
  }
  var vu = typeof reportError == "function" ? reportError : function(r) {
    console.error(r);
  };
  function ov(r) {
    this._internalRoot = r;
  }
  ud.prototype.render = ov.prototype.render = function(r) {
    var i = this._internalRoot;
    if (i === null) throw Error(u(409));
    id(r, i, null, null);
  }, ud.prototype.unmount = ov.prototype.unmount = function() {
    var r = this._internalRoot;
    if (r !== null) {
      this._internalRoot = null;
      var i = r.containerInfo;
      du(function() {
        id(null, r, null, null);
      }), i[Rl] = null;
    }
  };
  function ud(r) {
    this._internalRoot = r;
  }
  ud.prototype.unstable_scheduleHydration = function(r) {
    if (r) {
      var i = Wt();
      r = { blockedOn: null, target: r, priority: i };
      for (var s = 0; s < Mr.length && i !== 0 && i < Mr[s].priority; s++) ;
      Mr.splice(s, 0, r), s === 0 && Ps(r);
    }
  };
  function uv(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11);
  }
  function sd(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11 && (r.nodeType !== 8 || r.nodeValue !== " react-mount-point-unstable "));
  }
  function Im() {
  }
  function k1(r, i, s, d, y) {
    if (y) {
      if (typeof d == "function") {
        var w = d;
        d = function() {
          var ye = ld(O);
          w.call(ye);
        };
      }
      var O = Hm(i, d, r, 0, null, !1, !1, "", Im);
      return r._reactRootContainer = O, r[Rl] = O.current, Yu(r.nodeType === 8 ? r.parentNode : r), du(), O;
    }
    for (; y = r.lastChild; ) r.removeChild(y);
    if (typeof d == "function") {
      var I = d;
      d = function() {
        var ye = ld(K);
        I.call(ye);
      };
    }
    var K = ad(r, 0, !1, null, null, !1, !1, "", Im);
    return r._reactRootContainer = K, r[Rl] = K.current, Yu(r.nodeType === 8 ? r.parentNode : r), du(function() {
      id(i, K, s, d);
    }), K;
  }
  function Oc(r, i, s, d, y) {
    var w = s._reactRootContainer;
    if (w) {
      var O = w;
      if (typeof y == "function") {
        var I = y;
        y = function() {
          var K = ld(O);
          I.call(K);
        };
      }
      id(i, O, r, y);
    } else O = k1(s, i, r, y, d);
    return ld(O);
  }
  Sn = function(r) {
    switch (r.tag) {
      case 3:
        var i = r.stateNode;
        if (i.current.memoizedState.isDehydrated) {
          var s = sn(i.pendingLanes);
          s !== 0 && (xl(i, s | 1), Fa(i, qt()), (vn & 6) === 0 && (is = qt() + 500, Ji()));
        }
        break;
      case 13:
        du(function() {
          var d = Ga(r, 1);
          if (d !== null) {
            var y = wr();
            ma(d, r, 1, y);
          }
        }), od(r, 1);
    }
  }, js = function(r) {
    if (r.tag === 13) {
      var i = Ga(r, 134217728);
      if (i !== null) {
        var s = wr();
        ma(i, r, 134217728, s);
      }
      od(r, 134217728);
    }
  }, Yi = function(r) {
    if (r.tag === 13) {
      var i = ol(r), s = Ga(r, i);
      if (s !== null) {
        var d = wr();
        ma(s, r, i, d);
      }
      od(r, i);
    }
  }, Wt = function() {
    return Cn;
  }, Uu = function(r, i) {
    var s = Cn;
    try {
      return Cn = r, i();
    } finally {
      Cn = s;
    }
  }, Mt = function(r, i, s) {
    switch (i) {
      case "input":
        if (ze(r, s), i = s.name, s.type === "radio" && i != null) {
          for (s = r; s.parentNode; ) s = s.parentNode;
          for (s = s.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'), i = 0; i < s.length; i++) {
            var d = s[i];
            if (d !== r && d.form === r.form) {
              var y = er(d);
              if (!y) throw Error(u(90));
              Oe(d), ze(d, y);
            }
          }
        }
        break;
      case "textarea":
        nt(r, s);
        break;
      case "select":
        i = s.value, i != null && Me(r, !!s.multiple, i, !1);
    }
  }, Pr = ev, br = du;
  var D1 = { usingClientEntryPoint: !1, Events: [kt, Ni, er, Hn, Bn, ev] }, Ac = { findFiberByHostInstance: Go, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, qm = { bundleType: Ac.bundleType, version: Ac.version, rendererPackageName: Ac.rendererPackageName, rendererConfig: Ac.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: j.ReactCurrentDispatcher, findHostInstanceByFiber: function(r) {
    return r = Gn(r), r === null ? null : r.stateNode;
  }, findFiberByHostInstance: Ac.findFiberByHostInstance || Vm, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Co = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Co.isDisabled && Co.supportsFiber) try {
      ai = Co.inject(qm), Qn = Co;
    } catch {
    }
  }
  return Ci.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = D1, Ci.createPortal = function(r, i) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!uv(i)) throw Error(u(200));
    return _1(r, i, null, s);
  }, Ci.createRoot = function(r, i) {
    if (!uv(r)) throw Error(u(299));
    var s = !1, d = "", y = vu;
    return i != null && (i.unstable_strictMode === !0 && (s = !0), i.identifierPrefix !== void 0 && (d = i.identifierPrefix), i.onRecoverableError !== void 0 && (y = i.onRecoverableError)), i = ad(r, 1, !1, null, null, s, !1, d, y), r[Rl] = i.current, Yu(r.nodeType === 8 ? r.parentNode : r), new ov(i);
  }, Ci.findDOMNode = function(r) {
    if (r == null) return null;
    if (r.nodeType === 1) return r;
    var i = r._reactInternals;
    if (i === void 0)
      throw typeof r.render == "function" ? Error(u(188)) : (r = Object.keys(r).join(","), Error(u(268, r)));
    return r = Gn(i), r = r === null ? null : r.stateNode, r;
  }, Ci.flushSync = function(r) {
    return du(r);
  }, Ci.hydrate = function(r, i, s) {
    if (!sd(i)) throw Error(u(200));
    return Oc(null, r, i, !0, s);
  }, Ci.hydrateRoot = function(r, i, s) {
    if (!uv(r)) throw Error(u(405));
    var d = s != null && s.hydratedSources || null, y = !1, w = "", O = vu;
    if (s != null && (s.unstable_strictMode === !0 && (y = !0), s.identifierPrefix !== void 0 && (w = s.identifierPrefix), s.onRecoverableError !== void 0 && (O = s.onRecoverableError)), i = Hm(i, null, r, 1, s ?? null, y, !1, w, O), r[Rl] = i.current, Yu(r), d) for (r = 0; r < d.length; r++) s = d[r], y = s._getVersion, y = y(s._source), i.mutableSourceEagerHydrationData == null ? i.mutableSourceEagerHydrationData = [s, y] : i.mutableSourceEagerHydrationData.push(
      s,
      y
    );
    return new ud(i);
  }, Ci.render = function(r, i, s) {
    if (!sd(i)) throw Error(u(200));
    return Oc(null, r, i, !1, s);
  }, Ci.unmountComponentAtNode = function(r) {
    if (!sd(r)) throw Error(u(40));
    return r._reactRootContainer ? (du(function() {
      Oc(null, null, r, !1, function() {
        r._reactRootContainer = null, r[Rl] = null;
      });
    }), !0) : !1;
  }, Ci.unstable_batchedUpdates = ev, Ci.unstable_renderSubtreeIntoContainer = function(r, i, s, d) {
    if (!sd(s)) throw Error(u(200));
    if (r == null || r._reactInternals === void 0) throw Error(u(38));
    return Oc(r, i, s, !1, d);
  }, Ci.version = "18.3.1-next-f1338f8080-20240426", Ci;
}
var bi = {};
var SC;
function KN() {
  return SC || (SC = 1, process.env.NODE_ENV !== "production" && (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var t = Dh(), a = Bb(), u = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, f = !1;
    function p(e) {
      f = e;
    }
    function m(e) {
      if (!f) {
        for (var n = arguments.length, l = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
          l[o - 1] = arguments[o];
        E("warn", e, l);
      }
    }
    function v(e) {
      if (!f) {
        for (var n = arguments.length, l = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
          l[o - 1] = arguments[o];
        E("error", e, l);
      }
    }
    function E(e, n, l) {
      {
        var o = u.ReactDebugCurrentFrame, c = o.getStackAddendum();
        c !== "" && (n += "%s", l = l.concat([c]));
        var h = l.map(function(S) {
          return String(S);
        });
        h.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, h);
      }
    }
    var g = 0, x = 1, C = 2, b = 3, M = 4, _ = 5, k = 6, A = 7, N = 8, F = 9, W = 10, P = 11, j = 12, V = 13, q = 14, H = 15, oe = 16, Q = 17, $ = 18, ne = 19, re = 21, G = 22, X = 23, ae = 24, de = 25, le = !0, ie = !1, ue = !1, he = !1, z = !1, Z = !0, we = !0, be = !0, Fe = !0, _e = /* @__PURE__ */ new Set(), Pe = {}, Be = {};
    function De(e, n) {
      Ve(e, n), Ve(e + "Capture", n);
    }
    function Ve(e, n) {
      Pe[e] && v("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Pe[e] = n;
      {
        var l = e.toLowerCase();
        Be[l] = e, e === "onDoubleClick" && (Be.ondblclick = e);
      }
      for (var o = 0; o < n.length; o++)
        _e.add(n[o]);
    }
    var Xe = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Oe = Object.prototype.hasOwnProperty;
    function Ke(e) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, l = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return l;
      }
    }
    function Te(e) {
      try {
        return Ge(e), !1;
      } catch {
        return !0;
      }
    }
    function Ge(e) {
      return "" + e;
    }
    function et(e, n) {
      if (Te(e))
        return v("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", n, Ke(e)), Ge(e);
    }
    function ze(e) {
      if (Te(e))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), Ge(e);
    }
    function ut(e, n) {
      if (Te(e))
        return v("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", n, Ke(e)), Ge(e);
    }
    function Ut(e, n) {
      if (Te(e))
        return v("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", n, Ke(e)), Ge(e);
    }
    function bt(e) {
      if (Te(e))
        return v("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), Ge(e);
    }
    function Me(e) {
      if (Te(e))
        return v("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Ke(e)), Ge(e);
    }
    var Qe = 0, Et = 1, nt = 2, Rt = 3, it = 4, Ct = 5, Pt = 6, Xt = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Ce = Xt + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Ie = new RegExp("^[" + Xt + "][" + Ce + "]*$"), ft = {}, Ye = {};
    function Lt(e) {
      return Oe.call(Ye, e) ? !0 : Oe.call(ft, e) ? !1 : Ie.test(e) ? (Ye[e] = !0, !0) : (ft[e] = !0, v("Invalid attribute name: `%s`", e), !1);
    }
    function Kt(e, n, l) {
      return n !== null ? n.type === Qe : l ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function xt(e, n, l, o) {
      if (l !== null && l.type === Qe)
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
    function ht(e, n, l, o) {
      if (n === null || typeof n > "u" || xt(e, n, l, o))
        return !0;
      if (o)
        return !1;
      if (l !== null)
        switch (l.type) {
          case Rt:
            return !n;
          case it:
            return n === !1;
          case Ct:
            return isNaN(n);
          case Pt:
            return isNaN(n) || n < 1;
        }
      return !1;
    }
    function Ae(e) {
      return Mt.hasOwnProperty(e) ? Mt[e] : null;
    }
    function dt(e, n, l, o, c, h, S) {
      this.acceptsBooleans = n === nt || n === Rt || n === it, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = e, this.type = n, this.sanitizeURL = h, this.removeEmptyString = S;
    }
    var Mt = {}, Zt = [
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
    Zt.forEach(function(e) {
      Mt[e] = new dt(
        e,
        Qe,
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
      Mt[n] = new dt(
        n,
        Et,
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
      Mt[e] = new dt(
        e,
        nt,
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
      Mt[e] = new dt(
        e,
        nt,
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
      Mt[e] = new dt(
        e,
        Rt,
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
      Mt[e] = new dt(
        e,
        Rt,
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
      Mt[e] = new dt(
        e,
        it,
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
      Mt[e] = new dt(
        e,
        Pt,
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
      Mt[e] = new dt(
        e,
        Ct,
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
    var nn = /[\-\:]([a-z])/g, yn = function(e) {
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
      var n = e.replace(nn, yn);
      Mt[n] = new dt(
        n,
        Et,
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
      var n = e.replace(nn, yn);
      Mt[n] = new dt(
        n,
        Et,
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
      var n = e.replace(nn, yn);
      Mt[n] = new dt(
        n,
        Et,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      Mt[e] = new dt(
        e,
        Et,
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
    var Hn = "xlinkHref";
    Mt[Hn] = new dt(
      "xlinkHref",
      Et,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      Mt[e] = new dt(
        e,
        Et,
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
    var Bn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Pr = !1;
    function br(e) {
      !Pr && Bn.test(e) && (Pr = !0, v("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function vr(e, n, l, o) {
      if (o.mustUseProperty) {
        var c = o.propertyName;
        return e[c];
      } else {
        et(l, n), o.sanitizeURL && br("" + l);
        var h = o.attributeName, S = null;
        if (o.type === it) {
          if (e.hasAttribute(h)) {
            var T = e.getAttribute(h);
            return T === "" ? !0 : ht(n, l, o, !1) ? T : T === "" + l ? l : T;
          }
        } else if (e.hasAttribute(h)) {
          if (ht(n, l, o, !1))
            return e.getAttribute(h);
          if (o.type === Rt)
            return l;
          S = e.getAttribute(h);
        }
        return ht(n, l, o, !1) ? S === null ? l : S : S === "" + l ? l : S;
      }
    }
    function Mi(e, n, l, o) {
      {
        if (!Lt(n))
          return;
        if (!e.hasAttribute(n))
          return l === void 0 ? void 0 : null;
        var c = e.getAttribute(n);
        return et(l, n), c === "" + l ? l : c;
      }
    }
    function Tr(e, n, l, o) {
      var c = Ae(n);
      if (!Kt(n, c, o)) {
        if (ht(n, l, c, o) && (l = null), o || c === null) {
          if (Lt(n)) {
            var h = n;
            l === null ? e.removeAttribute(h) : (et(l, n), e.setAttribute(h, "" + l));
          }
          return;
        }
        var S = c.mustUseProperty;
        if (S) {
          var T = c.propertyName;
          if (l === null) {
            var R = c.type;
            e[T] = R === Rt ? !1 : "";
          } else
            e[T] = l;
          return;
        }
        var L = c.attributeName, U = c.attributeNamespace;
        if (l === null)
          e.removeAttribute(L);
        else {
          var te = c.type, J;
          te === Rt || te === it && l === !0 ? J = "" : (et(l, L), J = "" + l, c.sanitizeURL && br(J.toString())), U ? e.setAttributeNS(U, L, J) : e.setAttribute(L, J);
        }
      }
    }
    var Ar = /* @__PURE__ */ Symbol.for("react.element"), Vn = /* @__PURE__ */ Symbol.for("react.portal"), Ra = /* @__PURE__ */ Symbol.for("react.fragment"), oa = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ya = /* @__PURE__ */ Symbol.for("react.profiler"), Lr = /* @__PURE__ */ Symbol.for("react.provider"), B = /* @__PURE__ */ Symbol.for("react.context"), ke = /* @__PURE__ */ Symbol.for("react.forward_ref"), Ze = /* @__PURE__ */ Symbol.for("react.suspense"), ot = /* @__PURE__ */ Symbol.for("react.suspense_list"), It = /* @__PURE__ */ Symbol.for("react.memo"), Ht = /* @__PURE__ */ Symbol.for("react.lazy"), tn = /* @__PURE__ */ Symbol.for("react.scope"), Jt = /* @__PURE__ */ Symbol.for("react.debug_trace_mode"), Gn = /* @__PURE__ */ Symbol.for("react.offscreen"), gn = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), xn = /* @__PURE__ */ Symbol.for("react.cache"), In = /* @__PURE__ */ Symbol.for("react.tracing_marker"), Ma = Symbol.iterator, ua = "@@iterator";
    function qt(e) {
      if (e === null || typeof e != "object")
        return null;
      var n = Ma && e[Ma] || e[ua];
      return typeof n == "function" ? n : null;
    }
    var Bt = Object.assign, sa = 0, _i, ki, Di, qi, ai, Qn, Fo;
    function $r() {
    }
    $r.__reactDisabledLog = !0;
    function Au() {
      {
        if (sa === 0) {
          _i = console.log, ki = console.info, Di = console.warn, qi = console.error, ai = console.group, Qn = console.groupCollapsed, Fo = console.groupEnd;
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
        sa++;
      }
    }
    function Zl() {
      {
        if (sa--, sa === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Bt({}, e, {
              value: _i
            }),
            info: Bt({}, e, {
              value: ki
            }),
            warn: Bt({}, e, {
              value: Di
            }),
            error: Bt({}, e, {
              value: qi
            }),
            group: Bt({}, e, {
              value: ai
            }),
            groupCollapsed: Bt({}, e, {
              value: Qn
            }),
            groupEnd: Bt({}, e, {
              value: Fo
            })
          });
        }
        sa < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var on = u.ReactCurrentDispatcher, Nt;
    function an(e, n, l) {
      {
        if (Nt === void 0)
          try {
            throw Error();
          } catch (c) {
            var o = c.stack.trim().match(/\n( *(at )?)/);
            Nt = o && o[1] || "";
          }
        return `
` + Nt + e;
      }
    }
    var sn = !1, Zn;
    {
      var ca = typeof WeakMap == "function" ? WeakMap : Map;
      Zn = new ca();
    }
    function Rr(e, n) {
      if (!e || sn)
        return "";
      {
        var l = Zn.get(e);
        if (l !== void 0)
          return l;
      }
      var o;
      sn = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var h;
      h = on.current, on.current = null, Au();
      try {
        if (n) {
          var S = function() {
            throw Error();
          };
          if (Object.defineProperty(S.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(S, []);
            } catch (ge) {
              o = ge;
            }
            Reflect.construct(e, [], S);
          } else {
            try {
              S.call();
            } catch (ge) {
              o = ge;
            }
            e.call(S.prototype);
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
`), R = o.stack.split(`
`), L = T.length - 1, U = R.length - 1; L >= 1 && U >= 0 && T[L] !== R[U]; )
            U--;
          for (; L >= 1 && U >= 0; L--, U--)
            if (T[L] !== R[U]) {
              if (L !== 1 || U !== 1)
                do
                  if (L--, U--, U < 0 || T[L] !== R[U]) {
                    var te = `
` + T[L].replace(" at new ", " at ");
                    return e.displayName && te.includes("<anonymous>") && (te = te.replace("<anonymous>", e.displayName)), typeof e == "function" && Zn.set(e, te), te;
                  }
                while (L >= 1 && U >= 0);
              break;
            }
        }
      } finally {
        sn = !1, on.current = h, Zl(), Error.prepareStackTrace = c;
      }
      var J = e ? e.displayName || e.name : "", ve = J ? an(J) : "";
      return typeof e == "function" && Zn.set(e, ve), ve;
    }
    function Jl(e, n, l) {
      return Rr(e, !0);
    }
    function Lu(e, n, l) {
      return Rr(e, !1);
    }
    function Nu(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function El(e, n, l) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Rr(e, Nu(e));
      if (typeof e == "string")
        return an(e);
      switch (e) {
        case Ze:
          return an("Suspense");
        case ot:
          return an("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case ke:
            return Lu(e.render);
          case It:
            return El(e.type, n, l);
          case Ht: {
            var o = e, c = o._payload, h = o._init;
            try {
              return El(h(c), n, l);
            } catch {
            }
          }
        }
      return "";
    }
    function rp(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case _:
          return an(e.type);
        case oe:
          return an("Lazy");
        case V:
          return an("Suspense");
        case ne:
          return an("SuspenseList");
        case g:
        case C:
        case H:
          return Lu(e.type);
        case P:
          return Lu(e.type.render);
        case x:
          return Jl(e.type);
        default:
          return "";
      }
    }
    function xl(e) {
      try {
        var n = "", l = e;
        do
          n += rp(l), l = l.return;
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
    function zu(e) {
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
        case Ra:
          return "Fragment";
        case Vn:
          return "Portal";
        case Ya:
          return "Profiler";
        case oa:
          return "StrictMode";
        case Ze:
          return "Suspense";
        case ot:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case B:
            var n = e;
            return zu(n) + ".Consumer";
          case Lr:
            var l = e;
            return zu(l._context) + ".Provider";
          case ke:
            return Cn(e, e.render, "ForwardRef");
          case It:
            var o = e.displayName || null;
            return o !== null ? o : Sn(e.type) || "Memo";
          case Ht: {
            var c = e, h = c._payload, S = c._init;
            try {
              return Sn(S(h));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function js(e, n, l) {
      var o = n.displayName || n.name || "";
      return e.displayName || (o !== "" ? l + "(" + o + ")" : l);
    }
    function Yi(e) {
      return e.displayName || "Context";
    }
    function Wt(e) {
      var n = e.tag, l = e.type;
      switch (n) {
        case ae:
          return "Cache";
        case F:
          var o = l;
          return Yi(o) + ".Consumer";
        case W:
          var c = l;
          return Yi(c._context) + ".Provider";
        case $:
          return "DehydratedFragment";
        case P:
          return js(l, l.render, "ForwardRef");
        case A:
          return "Fragment";
        case _:
          return l;
        case M:
          return "Portal";
        case b:
          return "Root";
        case k:
          return "Text";
        case oe:
          return Sn(l);
        case N:
          return l === oa ? "StrictMode" : "Mode";
        case G:
          return "Offscreen";
        case j:
          return "Profiler";
        case re:
          return "Scope";
        case V:
          return "Suspense";
        case ne:
          return "SuspenseList";
        case de:
          return "TracingMarker";
        // The display name for this tags come from the user-provided type:
        case x:
        case g:
        case Q:
        case C:
        case q:
        case H:
          if (typeof l == "function")
            return l.displayName || l.name || null;
          if (typeof l == "string")
            return l;
          break;
      }
      return null;
    }
    var Uu = u.ReactDebugCurrentFrame, Hr = null, Wi = !1;
    function fa() {
      {
        if (Hr === null)
          return null;
        var e = Hr._debugOwner;
        if (e !== null && typeof e < "u")
          return Wt(e);
      }
      return null;
    }
    function Bi() {
      return Hr === null ? "" : xl(Hr);
    }
    function qn() {
      Uu.getCurrentStack = null, Hr = null, Wi = !1;
    }
    function On(e) {
      Uu.getCurrentStack = e === null ? null : Bi, Hr = e, Wi = !1;
    }
    function eo() {
      return Hr;
    }
    function Mr(e) {
      Wi = e;
    }
    function da(e) {
      return "" + e;
    }
    function ii(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Me(e), e;
        default:
          return "";
      }
    }
    var Po = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Fs(e, n) {
      Po[n.type] || n.onChange || n.onInput || n.readOnly || n.disabled || n.value == null || v("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), n.onChange || n.readOnly || n.disabled || n.checked == null || v("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Ps(e) {
      var n = e.type, l = e.nodeName;
      return l && l.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
    }
    function to(e) {
      return e._valueTracker;
    }
    function $o(e) {
      e._valueTracker = null;
    }
    function ap(e) {
      var n = "";
      return e && (Ps(e) ? n = e.checked ? "true" : "false" : n = e.value), n;
    }
    function li(e) {
      var n = Ps(e) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(e.constructor.prototype, n);
      Me(e[n]);
      var o = "" + e[n];
      if (!(e.hasOwnProperty(n) || typeof l > "u" || typeof l.get != "function" || typeof l.set != "function")) {
        var c = l.get, h = l.set;
        Object.defineProperty(e, n, {
          configurable: !0,
          get: function() {
            return c.call(this);
          },
          set: function(T) {
            Me(T), o = "" + T, h.call(this, T);
          }
        }), Object.defineProperty(e, n, {
          enumerable: l.enumerable
        });
        var S = {
          getValue: function() {
            return o;
          },
          setValue: function(T) {
            Me(T), o = "" + T;
          },
          stopTracking: function() {
            $o(e), delete e[n];
          }
        };
        return S;
      }
    }
    function Oi(e) {
      to(e) || (e._valueTracker = li(e));
    }
    function Gi(e) {
      if (!e)
        return !1;
      var n = to(e);
      if (!n)
        return !0;
      var l = n.getValue(), o = ap(e);
      return o !== l ? (n.setValue(o), !0) : !1;
    }
    function oi(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var ju = !1, Fu = !1, no = !1, Ho = !1;
    function Pu(e) {
      var n = e.type === "checkbox" || e.type === "radio";
      return n ? e.checked != null : e.value != null;
    }
    function $u(e, n) {
      var l = e, o = n.checked, c = Bt({}, n, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: o ?? l._wrapperState.initialChecked
      });
      return c;
    }
    function Ai(e, n) {
      Fs("input", n), n.checked !== void 0 && n.defaultChecked !== void 0 && !Fu && (v("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", fa() || "A component", n.type), Fu = !0), n.value !== void 0 && n.defaultValue !== void 0 && !ju && (v("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", fa() || "A component", n.type), ju = !0);
      var l = e, o = n.defaultValue == null ? "" : n.defaultValue;
      l._wrapperState = {
        initialChecked: n.checked != null ? n.checked : n.defaultChecked,
        initialValue: ii(n.value != null ? n.value : o),
        controlled: Pu(n)
      };
    }
    function D(e, n) {
      var l = e, o = n.checked;
      o != null && Tr(l, "checked", o, !1);
    }
    function Y(e, n) {
      var l = e;
      {
        var o = Pu(n);
        !l._wrapperState.controlled && o && !Ho && (v("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Ho = !0), l._wrapperState.controlled && !o && !no && (v("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), no = !0);
      }
      D(e, n);
      var c = ii(n.value), h = n.type;
      if (c != null)
        h === "number" ? (c === 0 && l.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        l.value != c) && (l.value = da(c)) : l.value !== da(c) && (l.value = da(c));
      else if (h === "submit" || h === "reset") {
        l.removeAttribute("value");
        return;
      }
      n.hasOwnProperty("value") ? Ot(l, n.type, c) : n.hasOwnProperty("defaultValue") && Ot(l, n.type, ii(n.defaultValue)), n.checked == null && n.defaultChecked != null && (l.defaultChecked = !!n.defaultChecked);
    }
    function me(e, n, l) {
      var o = e;
      if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
        var c = n.type, h = c === "submit" || c === "reset";
        if (h && (n.value === void 0 || n.value === null))
          return;
        var S = da(o._wrapperState.initialValue);
        l || S !== o.value && (o.value = S), o.defaultValue = S;
      }
      var T = o.name;
      T !== "" && (o.name = ""), o.defaultChecked = !o.defaultChecked, o.defaultChecked = !!o._wrapperState.initialChecked, T !== "" && (o.name = T);
    }
    function Se(e, n) {
      var l = e;
      Y(l, n), We(l, n);
    }
    function We(e, n) {
      var l = n.name;
      if (n.type === "radio" && l != null) {
        for (var o = e; o.parentNode; )
          o = o.parentNode;
        et(l, "name");
        for (var c = o.querySelectorAll("input[name=" + JSON.stringify("" + l) + '][type="radio"]'), h = 0; h < c.length; h++) {
          var S = c[h];
          if (!(S === e || S.form !== e.form)) {
            var T = uy(S);
            if (!T)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            Gi(S), Y(S, T);
          }
        }
      }
    }
    function Ot(e, n, l) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (n !== "number" || oi(e.ownerDocument) !== e) && (l == null ? e.defaultValue = da(e._wrapperState.initialValue) : e.defaultValue !== da(l) && (e.defaultValue = da(l)));
    }
    var tt = !1, jt = !1, un = !1;
    function En(e, n) {
      n.value == null && (typeof n.children == "object" && n.children !== null ? t.Children.forEach(n.children, function(l) {
        l != null && (typeof l == "string" || typeof l == "number" || jt || (jt = !0, v("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : n.dangerouslySetInnerHTML != null && (un || (un = !0, v("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), n.selected != null && !tt && (v("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), tt = !0);
    }
    function Fn(e, n) {
      n.value != null && e.setAttribute("value", da(ii(n.value)));
    }
    var An = Array.isArray;
    function rn(e) {
      return An(e);
    }
    var Ln;
    Ln = !1;
    function Jn() {
      var e = fa();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var ro = ["value", "defaultValue"];
    function $s(e) {
      {
        Fs("select", e);
        for (var n = 0; n < ro.length; n++) {
          var l = ro[n];
          if (e[l] != null) {
            var o = rn(e[l]);
            e.multiple && !o ? v("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", l, Jn()) : !e.multiple && o && v("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", l, Jn());
          }
        }
      }
    }
    function wl(e, n, l, o) {
      var c = e.options;
      if (n) {
        for (var h = l, S = {}, T = 0; T < h.length; T++)
          S["$" + h[T]] = !0;
        for (var R = 0; R < c.length; R++) {
          var L = S.hasOwnProperty("$" + c[R].value);
          c[R].selected !== L && (c[R].selected = L), L && o && (c[R].defaultSelected = !0);
        }
      } else {
        for (var U = da(ii(l)), te = null, J = 0; J < c.length; J++) {
          if (c[J].value === U) {
            c[J].selected = !0, o && (c[J].defaultSelected = !0);
            return;
          }
          te === null && !c[J].disabled && (te = c[J]);
        }
        te !== null && (te.selected = !0);
      }
    }
    function Hs(e, n) {
      return Bt({}, n, {
        value: void 0
      });
    }
    function Vo(e, n) {
      var l = e;
      $s(n), l._wrapperState = {
        wasMultiple: !!n.multiple
      }, n.value !== void 0 && n.defaultValue !== void 0 && !Ln && (v("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Ln = !0);
    }
    function ip(e, n) {
      var l = e;
      l.multiple = !!n.multiple;
      var o = n.value;
      o != null ? wl(l, !!n.multiple, o, !1) : n.defaultValue != null && wl(l, !!n.multiple, n.defaultValue, !0);
    }
    function nf(e, n) {
      var l = e, o = l._wrapperState.wasMultiple;
      l._wrapperState.wasMultiple = !!n.multiple;
      var c = n.value;
      c != null ? wl(l, !!n.multiple, c, !1) : o !== !!n.multiple && (n.defaultValue != null ? wl(l, !!n.multiple, n.defaultValue, !0) : wl(l, !!n.multiple, n.multiple ? [] : "", !1));
    }
    function lp(e, n) {
      var l = e, o = n.value;
      o != null && wl(l, !!n.multiple, o, !1);
    }
    var Oh = !1;
    function op(e, n) {
      var l = e;
      if (n.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var o = Bt({}, n, {
        value: void 0,
        defaultValue: void 0,
        children: da(l._wrapperState.initialValue)
      });
      return o;
    }
    function up(e, n) {
      var l = e;
      Fs("textarea", n), n.value !== void 0 && n.defaultValue !== void 0 && !Oh && (v("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", fa() || "A component"), Oh = !0);
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
        initialValue: ii(o)
      };
    }
    function Ah(e, n) {
      var l = e, o = ii(n.value), c = ii(n.defaultValue);
      if (o != null) {
        var h = da(o);
        h !== l.value && (l.value = h), n.defaultValue == null && l.defaultValue !== h && (l.defaultValue = h);
      }
      c != null && (l.defaultValue = da(c));
    }
    function Lh(e, n) {
      var l = e, o = l.textContent;
      o === l._wrapperState.initialValue && o !== "" && o !== null && (l.value = o);
    }
    function i1(e, n) {
      Ah(e, n);
    }
    var Cl = "http://www.w3.org/1999/xhtml", sp = "http://www.w3.org/1998/Math/MathML", cp = "http://www.w3.org/2000/svg";
    function fp(e) {
      switch (e) {
        case "svg":
          return cp;
        case "math":
          return sp;
        default:
          return Cl;
      }
    }
    function dp(e, n) {
      return e == null || e === Cl ? fp(n) : e === cp && n === "foreignObject" ? Cl : e;
    }
    var Nh = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, l, o, c) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(n, l, o, c);
        });
      } : e;
    }, rf, zh = Nh(function(e, n) {
      if (e.namespaceURI === cp && !("innerHTML" in e)) {
        rf = rf || document.createElement("div"), rf.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>";
        for (var l = rf.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; l.firstChild; )
          e.appendChild(l.firstChild);
        return;
      }
      e.innerHTML = n;
    }), _a = 1, bl = 3, hr = 8, Tl = 9, pp = 11, Hu = function(e, n) {
      if (n) {
        var l = e.firstChild;
        if (l && l === e.lastChild && l.nodeType === bl) {
          l.nodeValue = n;
          return;
        }
      }
      e.textContent = n;
    }, Vs = {
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
    }, Is = {
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
    function Uh(e, n) {
      return e + n.charAt(0).toUpperCase() + n.substring(1);
    }
    var jh = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Is).forEach(function(e) {
      jh.forEach(function(n) {
        Is[Uh(n, e)] = Is[e];
      });
    });
    function af(e, n, l) {
      var o = n == null || typeof n == "boolean" || n === "";
      return o ? "" : !l && typeof n == "number" && n !== 0 && !(Is.hasOwnProperty(e) && Is[e]) ? n + "px" : (Ut(n, e), ("" + n).trim());
    }
    var Fh = /([A-Z])/g, Ph = /^ms-/;
    function Vu(e) {
      return e.replace(Fh, "-$1").toLowerCase().replace(Ph, "-ms-");
    }
    var $h = function() {
    };
    {
      var l1 = /^(?:webkit|moz|o)[A-Z]/, o1 = /^-ms-/, Hh = /-(.)/g, vp = /;\s*$/, Qi = {}, Io = {}, Vh = !1, qs = !1, u1 = function(e) {
        return e.replace(Hh, function(n, l) {
          return l.toUpperCase();
        });
      }, Ih = function(e) {
        Qi.hasOwnProperty(e) && Qi[e] || (Qi[e] = !0, v(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          u1(e.replace(o1, "ms-"))
        ));
      }, hp = function(e) {
        Qi.hasOwnProperty(e) && Qi[e] || (Qi[e] = !0, v("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, mp = function(e, n) {
        Io.hasOwnProperty(n) && Io[n] || (Io[n] = !0, v(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, n.replace(vp, "")));
      }, qh = function(e, n) {
        Vh || (Vh = !0, v("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Yh = function(e, n) {
        qs || (qs = !0, v("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      $h = function(e, n) {
        e.indexOf("-") > -1 ? Ih(e) : l1.test(e) ? hp(e) : vp.test(n) && mp(e, n), typeof n == "number" && (isNaN(n) ? qh(e, n) : isFinite(n) || Yh(e, n));
      };
    }
    var Wh = $h;
    function s1(e) {
      {
        var n = "", l = "";
        for (var o in e)
          if (e.hasOwnProperty(o)) {
            var c = e[o];
            if (c != null) {
              var h = o.indexOf("--") === 0;
              n += l + (h ? o : Vu(o)) + ":", n += af(o, c, h), l = ";";
            }
          }
        return n || null;
      }
    }
    function Bh(e, n) {
      var l = e.style;
      for (var o in n)
        if (n.hasOwnProperty(o)) {
          var c = o.indexOf("--") === 0;
          c || Wh(o, n[o]);
          var h = af(o, n[o], c);
          o === "float" && (o = "cssFloat"), c ? l.setProperty(o, h) : l[o] = h;
        }
    }
    function c1(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Gh(e) {
      var n = {};
      for (var l in e)
        for (var o = Vs[l] || [l], c = 0; c < o.length; c++)
          n[o[c]] = l;
      return n;
    }
    function f1(e, n) {
      {
        if (!n)
          return;
        var l = Gh(e), o = Gh(n), c = {};
        for (var h in l) {
          var S = l[h], T = o[h];
          if (T && S !== T) {
            var R = S + "," + T;
            if (c[R])
              continue;
            c[R] = !0, v("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", c1(e[S]) ? "Removing" : "Updating", S, T);
          }
        }
      }
    }
    var Li = {
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
    }, Ys = Bt({
      menuitem: !0
    }, Li), Qh = "__html";
    function lf(e, n) {
      if (n) {
        if (Ys[e] && (n.children != null || n.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (n.dangerouslySetInnerHTML != null) {
          if (n.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof n.dangerouslySetInnerHTML != "object" || !(Qh in n.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!n.suppressContentEditableWarning && n.contentEditable && n.children != null && v("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), n.style != null && typeof n.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function ao(e, n) {
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
    var Ws = {
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
    }, of = {
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
    }, Iu = {}, d1 = new RegExp("^(aria)-[" + Ce + "]*$"), qu = new RegExp("^(aria)[A-Z][" + Ce + "]*$");
    function yp(e, n) {
      {
        if (Oe.call(Iu, n) && Iu[n])
          return !0;
        if (qu.test(n)) {
          var l = "aria-" + n.slice(4).toLowerCase(), o = of.hasOwnProperty(l) ? l : null;
          if (o == null)
            return v("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", n), Iu[n] = !0, !0;
          if (n !== o)
            return v("Invalid ARIA attribute `%s`. Did you mean `%s`?", n, o), Iu[n] = !0, !0;
        }
        if (d1.test(n)) {
          var c = n.toLowerCase(), h = of.hasOwnProperty(c) ? c : null;
          if (h == null)
            return Iu[n] = !0, !1;
          if (n !== h)
            return v("Unknown ARIA attribute `%s`. Did you mean `%s`?", n, h), Iu[n] = !0, !0;
        }
      }
      return !0;
    }
    function Bs(e, n) {
      {
        var l = [];
        for (var o in n) {
          var c = yp(e, o);
          c || l.push(o);
        }
        var h = l.map(function(S) {
          return "`" + S + "`";
        }).join(", ");
        l.length === 1 ? v("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", h, e) : l.length > 1 && v("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", h, e);
      }
    }
    function gp(e, n) {
      ao(e, n) || Bs(e, n);
    }
    var Sp = !1;
    function uf(e, n) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        n != null && n.value === null && !Sp && (Sp = !0, e === "select" && n.multiple ? v("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : v("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var qo = function() {
    };
    {
      var Vr = {}, Ep = /^on./, sf = /^on[^A-Z]/, Xh = new RegExp("^(aria)-[" + Ce + "]*$"), Kh = new RegExp("^(aria)[A-Z][" + Ce + "]*$");
      qo = function(e, n, l, o) {
        if (Oe.call(Vr, n) && Vr[n])
          return !0;
        var c = n.toLowerCase();
        if (c === "onfocusin" || c === "onfocusout")
          return v("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Vr[n] = !0, !0;
        if (o != null) {
          var h = o.registrationNameDependencies, S = o.possibleRegistrationNames;
          if (h.hasOwnProperty(n))
            return !0;
          var T = S.hasOwnProperty(c) ? S[c] : null;
          if (T != null)
            return v("Invalid event handler property `%s`. Did you mean `%s`?", n, T), Vr[n] = !0, !0;
          if (Ep.test(n))
            return v("Unknown event handler property `%s`. It will be ignored.", n), Vr[n] = !0, !0;
        } else if (Ep.test(n))
          return sf.test(n) && v("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", n), Vr[n] = !0, !0;
        if (Xh.test(n) || Kh.test(n))
          return !0;
        if (c === "innerhtml")
          return v("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Vr[n] = !0, !0;
        if (c === "aria")
          return v("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Vr[n] = !0, !0;
        if (c === "is" && l !== null && l !== void 0 && typeof l != "string")
          return v("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof l), Vr[n] = !0, !0;
        if (typeof l == "number" && isNaN(l))
          return v("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", n), Vr[n] = !0, !0;
        var R = Ae(n), L = R !== null && R.type === Qe;
        if (Ws.hasOwnProperty(c)) {
          var U = Ws[c];
          if (U !== n)
            return v("Invalid DOM property `%s`. Did you mean `%s`?", n, U), Vr[n] = !0, !0;
        } else if (!L && n !== c)
          return v("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", n, c), Vr[n] = !0, !0;
        return typeof l == "boolean" && xt(n, l, R, !1) ? (l ? v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', l, n, n, l, n) : v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', l, n, n, l, n, n, n), Vr[n] = !0, !0) : L ? !0 : xt(n, l, R, !1) ? (Vr[n] = !0, !1) : ((l === "false" || l === "true") && R !== null && R.type === Rt && (v("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", l, n, l === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', n, l), Vr[n] = !0), !0);
      };
    }
    var Zh = function(e, n, l) {
      {
        var o = [];
        for (var c in n) {
          var h = qo(e, c, n[c], l);
          h || o.push(c);
        }
        var S = o.map(function(T) {
          return "`" + T + "`";
        }).join(", ");
        o.length === 1 ? v("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", S, e) : o.length > 1 && v("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", S, e);
      }
    };
    function Jh(e, n, l) {
      ao(e, n) || Zh(e, n, l);
    }
    var xp = 1, cf = 2, ui = 4, wp = xp | cf | ui, Yo = null;
    function p1(e) {
      Yo !== null && v("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Yo = e;
    }
    function v1() {
      Yo === null && v("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Yo = null;
    }
    function Gs(e) {
      return e === Yo;
    }
    function Cp(e) {
      var n = e.target || e.srcElement || window;
      return n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === bl ? n.parentNode : n;
    }
    var ff = null, Wo = null, kn = null;
    function df(e) {
      var n = fs(e);
      if (n) {
        if (typeof ff != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var l = n.stateNode;
        if (l) {
          var o = uy(l);
          ff(n.stateNode, n.type, o);
        }
      }
    }
    function pf(e) {
      ff = e;
    }
    function Yu(e) {
      Wo ? kn ? kn.push(e) : kn = [e] : Wo = e;
    }
    function em() {
      return Wo !== null || kn !== null;
    }
    function vf() {
      if (Wo) {
        var e = Wo, n = kn;
        if (Wo = null, kn = null, df(e), n)
          for (var l = 0; l < n.length; l++)
            df(n[l]);
      }
    }
    var Wu = function(e, n) {
      return e(n);
    }, Qs = function() {
    }, io = !1;
    function tm() {
      var e = em();
      e && (Qs(), vf());
    }
    function nm(e, n, l) {
      if (io)
        return e(n, l);
      io = !0;
      try {
        return Wu(e, n, l);
      } finally {
        io = !1, tm();
      }
    }
    function h1(e, n, l) {
      Wu = e, Qs = l;
    }
    function rm(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function hf(e, n, l) {
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
          return !!(l.disabled && rm(n));
        default:
          return !1;
      }
    }
    function lo(e, n) {
      var l = e.stateNode;
      if (l === null)
        return null;
      var o = uy(l);
      if (o === null)
        return null;
      var c = o[n];
      if (hf(n, e.type, o))
        return null;
      if (c && typeof c != "function")
        throw new Error("Expected `" + n + "` listener to be a function, instead got a value of `" + typeof c + "` type.");
      return c;
    }
    var Xs = !1;
    if (Xe)
      try {
        var Bo = {};
        Object.defineProperty(Bo, "passive", {
          get: function() {
            Xs = !0;
          }
        }), window.addEventListener("test", Bo, Bo), window.removeEventListener("test", Bo, Bo);
      } catch {
        Xs = !1;
      }
    function mf(e, n, l, o, c, h, S, T, R) {
      var L = Array.prototype.slice.call(arguments, 3);
      try {
        n.apply(l, L);
      } catch (U) {
        this.onError(U);
      }
    }
    var yf = mf;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var bp = document.createElement("react");
      yf = function(n, l, o, c, h, S, T, R, L) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var U = document.createEvent("Event"), te = !1, J = !0, ve = window.event, ge = Object.getOwnPropertyDescriptor(window, "event");
        function Ee() {
          bp.removeEventListener(xe, At, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = ve);
        }
        var at = Array.prototype.slice.call(arguments, 3);
        function At() {
          te = !0, Ee(), l.apply(o, at), J = !1;
        }
        var Tt, mn = !1, fn = !1;
        function ce(fe) {
          if (Tt = fe.error, mn = !0, Tt === null && fe.colno === 0 && fe.lineno === 0 && (fn = !0), fe.defaultPrevented && Tt != null && typeof Tt == "object")
            try {
              Tt._suppressLogging = !0;
            } catch {
            }
        }
        var xe = "react-" + (n || "invokeguardedcallback");
        if (window.addEventListener("error", ce), bp.addEventListener(xe, At, !1), U.initEvent(xe, !1, !1), bp.dispatchEvent(U), ge && Object.defineProperty(window, "event", ge), te && J && (mn ? fn && (Tt = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Tt = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Tt)), window.removeEventListener("error", ce), !te)
          return Ee(), mf.apply(this, arguments);
      };
    }
    var am = yf, Bu = !1, gf = null, Gu = !1, Xi = null, im = {
      onError: function(e) {
        Bu = !0, gf = e;
      }
    };
    function oo(e, n, l, o, c, h, S, T, R) {
      Bu = !1, gf = null, am.apply(im, arguments);
    }
    function Ki(e, n, l, o, c, h, S, T, R) {
      if (oo.apply(this, arguments), Bu) {
        var L = Zs();
        Gu || (Gu = !0, Xi = L);
      }
    }
    function Ks() {
      if (Gu) {
        var e = Xi;
        throw Gu = !1, Xi = null, e;
      }
    }
    function Rl() {
      return Bu;
    }
    function Zs() {
      if (Bu) {
        var e = gf;
        return Bu = !1, gf = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Qu(e) {
      return e._reactInternals;
    }
    function m1(e) {
      return e._reactInternals !== void 0;
    }
    function Go(e, n) {
      e._reactInternals = n;
    }
    var kt = (
      /*                      */
      0
    ), Ni = (
      /*                */
      1
    ), er = (
      /*                    */
      2
    ), pn = (
      /*                       */
      4
    ), si = (
      /*                */
      16
    ), ci = (
      /*                 */
      32
    ), Pn = (
      /*                     */
      64
    ), _t = (
      /*                   */
      128
    ), ea = (
      /*            */
      256
    ), ir = (
      /*                          */
      512
    ), _r = (
      /*                     */
      1024
    ), ka = (
      /*                      */
      2048
    ), Da = (
      /*                    */
      4096
    ), mr = (
      /*                   */
      8192
    ), Xu = (
      /*             */
      16384
    ), lm = (
      /*               */
      32767
    ), Js = (
      /*                   */
      32768
    ), Nr = (
      /*                */
      65536
    ), Sf = (
      /* */
      131072
    ), Zi = (
      /*                       */
      1048576
    ), Ku = (
      /*                    */
      2097152
    ), Ml = (
      /*                 */
      4194304
    ), Ef = (
      /*                */
      8388608
    ), uo = (
      /*               */
      16777216
    ), Ji = (
      /*              */
      33554432
    ), so = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      pn | _r | 0
    ), co = er | pn | si | ci | ir | Da | mr, fo = pn | Pn | ir | mr, _l = ka | si, yr = Ml | Ef | Ku, fi = u.ReactCurrentOwner;
    function Wa(e) {
      var n = e, l = e;
      if (e.alternate)
        for (; n.return; )
          n = n.return;
      else {
        var o = n;
        do
          n = o, (n.flags & (er | Da)) !== kt && (l = n.return), o = n.return;
        while (o);
      }
      return n.tag === b ? l : null;
    }
    function el(e) {
      if (e.tag === V) {
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
    function tl(e) {
      return e.tag === b ? e.stateNode.containerInfo : null;
    }
    function Qo(e) {
      return Wa(e) === e;
    }
    function om(e) {
      {
        var n = fi.current;
        if (n !== null && n.tag === x) {
          var l = n, o = l.stateNode;
          o._warnedAboutRefsInRender || v("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Wt(l) || "A component"), o._warnedAboutRefsInRender = !0;
        }
      }
      var c = Qu(e);
      return c ? Wa(c) === c : !1;
    }
    function xf(e) {
      if (Wa(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function wf(e) {
      var n = e.alternate;
      if (!n) {
        var l = Wa(e);
        if (l === null)
          throw new Error("Unable to find node on an unmounted component.");
        return l !== e ? null : e;
      }
      for (var o = e, c = n; ; ) {
        var h = o.return;
        if (h === null)
          break;
        var S = h.alternate;
        if (S === null) {
          var T = h.return;
          if (T !== null) {
            o = c = T;
            continue;
          }
          break;
        }
        if (h.child === S.child) {
          for (var R = h.child; R; ) {
            if (R === o)
              return xf(h), e;
            if (R === c)
              return xf(h), n;
            R = R.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (o.return !== c.return)
          o = h, c = S;
        else {
          for (var L = !1, U = h.child; U; ) {
            if (U === o) {
              L = !0, o = h, c = S;
              break;
            }
            if (U === c) {
              L = !0, c = h, o = S;
              break;
            }
            U = U.sibling;
          }
          if (!L) {
            for (U = S.child; U; ) {
              if (U === o) {
                L = !0, o = S, c = h;
                break;
              }
              if (U === c) {
                L = !0, c = S, o = h;
                break;
              }
              U = U.sibling;
            }
            if (!L)
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
    function Oa(e) {
      var n = wf(e);
      return n !== null ? Aa(n) : null;
    }
    function Aa(e) {
      if (e.tag === _ || e.tag === k)
        return e;
      for (var n = e.child; n !== null; ) {
        var l = Aa(n);
        if (l !== null)
          return l;
        n = n.sibling;
      }
      return null;
    }
    function Xn(e) {
      var n = wf(e);
      return n !== null ? di(n) : null;
    }
    function di(e) {
      if (e.tag === _ || e.tag === k)
        return e;
      for (var n = e.child; n !== null; ) {
        if (n.tag !== M) {
          var l = di(n);
          if (l !== null)
            return l;
        }
        n = n.sibling;
      }
      return null;
    }
    var Tp = a.unstable_scheduleCallback, um = a.unstable_cancelCallback, Rp = a.unstable_shouldYield, Mp = a.unstable_requestPaint, kr = a.unstable_now, Cf = a.unstable_getCurrentPriorityLevel, ec = a.unstable_ImmediatePriority, po = a.unstable_UserBlockingPriority, kl = a.unstable_NormalPriority, y1 = a.unstable_LowPriority, Xo = a.unstable_IdlePriority, bf = a.unstable_yieldValue, sm = a.unstable_setDisableYieldValue, Ko = null, or = null, rt = null, Ba = !1, La = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function Zu(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var n = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (n.isDisabled)
        return !0;
      if (!n.supportsFiber)
        return v("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        we && (e = Bt({}, e, {
          getLaneLabelMap: Zo,
          injectProfilingHooks: pi
        })), Ko = n.inject(e), or = n;
      } catch (l) {
        v("React instrumentation encountered an error: %s.", l);
      }
      return !!n.checkDCE;
    }
    function _p(e, n) {
      if (or && typeof or.onScheduleFiberRoot == "function")
        try {
          or.onScheduleFiberRoot(Ko, e, n);
        } catch (l) {
          Ba || (Ba = !0, v("React instrumentation encountered an error: %s", l));
        }
    }
    function kp(e, n) {
      if (or && typeof or.onCommitFiberRoot == "function")
        try {
          var l = (e.current.flags & _t) === _t;
          if (be) {
            var o;
            switch (n) {
              case pa:
                o = ec;
                break;
              case rl:
                o = po;
                break;
              case vi:
                o = kl;
                break;
              case hi:
                o = Xo;
                break;
              default:
                o = kl;
                break;
            }
            or.onCommitFiberRoot(Ko, e, o, l);
          }
        } catch (c) {
          Ba || (Ba = !0, v("React instrumentation encountered an error: %s", c));
        }
    }
    function Dp(e) {
      if (or && typeof or.onPostCommitFiberRoot == "function")
        try {
          or.onPostCommitFiberRoot(Ko, e);
        } catch (n) {
          Ba || (Ba = !0, v("React instrumentation encountered an error: %s", n));
        }
    }
    function Op(e) {
      if (or && typeof or.onCommitFiberUnmount == "function")
        try {
          or.onCommitFiberUnmount(Ko, e);
        } catch (n) {
          Ba || (Ba = !0, v("React instrumentation encountered an error: %s", n));
        }
    }
    function tr(e) {
      if (typeof bf == "function" && (sm(e), p(e)), or && typeof or.setStrictMode == "function")
        try {
          or.setStrictMode(Ko, e);
        } catch (n) {
          Ba || (Ba = !0, v("React instrumentation encountered an error: %s", n));
        }
    }
    function pi(e) {
      rt = e;
    }
    function Zo() {
      {
        for (var e = /* @__PURE__ */ new Map(), n = 1, l = 0; l < tu; l++) {
          var o = pm(n);
          e.set(n, o), n *= 2;
        }
        return e;
      }
    }
    function Ap(e) {
      rt !== null && typeof rt.markCommitStarted == "function" && rt.markCommitStarted(e);
    }
    function Lp() {
      rt !== null && typeof rt.markCommitStopped == "function" && rt.markCommitStopped();
    }
    function Ga(e) {
      rt !== null && typeof rt.markComponentRenderStarted == "function" && rt.markComponentRenderStarted(e);
    }
    function Qa() {
      rt !== null && typeof rt.markComponentRenderStopped == "function" && rt.markComponentRenderStopped();
    }
    function Np(e) {
      rt !== null && typeof rt.markComponentPassiveEffectMountStarted == "function" && rt.markComponentPassiveEffectMountStarted(e);
    }
    function cm() {
      rt !== null && typeof rt.markComponentPassiveEffectMountStopped == "function" && rt.markComponentPassiveEffectMountStopped();
    }
    function Dl(e) {
      rt !== null && typeof rt.markComponentPassiveEffectUnmountStarted == "function" && rt.markComponentPassiveEffectUnmountStarted(e);
    }
    function vo() {
      rt !== null && typeof rt.markComponentPassiveEffectUnmountStopped == "function" && rt.markComponentPassiveEffectUnmountStopped();
    }
    function Tf(e) {
      rt !== null && typeof rt.markComponentLayoutEffectMountStarted == "function" && rt.markComponentLayoutEffectMountStarted(e);
    }
    function fm() {
      rt !== null && typeof rt.markComponentLayoutEffectMountStopped == "function" && rt.markComponentLayoutEffectMountStopped();
    }
    function tc(e) {
      rt !== null && typeof rt.markComponentLayoutEffectUnmountStarted == "function" && rt.markComponentLayoutEffectUnmountStarted(e);
    }
    function zp() {
      rt !== null && typeof rt.markComponentLayoutEffectUnmountStopped == "function" && rt.markComponentLayoutEffectUnmountStopped();
    }
    function nc(e, n, l) {
      rt !== null && typeof rt.markComponentErrored == "function" && rt.markComponentErrored(e, n, l);
    }
    function nl(e, n, l) {
      rt !== null && typeof rt.markComponentSuspended == "function" && rt.markComponentSuspended(e, n, l);
    }
    function rc(e) {
      rt !== null && typeof rt.markLayoutEffectsStarted == "function" && rt.markLayoutEffectsStarted(e);
    }
    function ac() {
      rt !== null && typeof rt.markLayoutEffectsStopped == "function" && rt.markLayoutEffectsStopped();
    }
    function Jo(e) {
      rt !== null && typeof rt.markPassiveEffectsStarted == "function" && rt.markPassiveEffectsStarted(e);
    }
    function Up() {
      rt !== null && typeof rt.markPassiveEffectsStopped == "function" && rt.markPassiveEffectsStopped();
    }
    function eu(e) {
      rt !== null && typeof rt.markRenderStarted == "function" && rt.markRenderStarted(e);
    }
    function dm() {
      rt !== null && typeof rt.markRenderYielded == "function" && rt.markRenderYielded();
    }
    function Rf() {
      rt !== null && typeof rt.markRenderStopped == "function" && rt.markRenderStopped();
    }
    function nr(e) {
      rt !== null && typeof rt.markRenderScheduled == "function" && rt.markRenderScheduled(e);
    }
    function Mf(e, n) {
      rt !== null && typeof rt.markForceUpdateScheduled == "function" && rt.markForceUpdateScheduled(e, n);
    }
    function ic(e, n) {
      rt !== null && typeof rt.markStateUpdateScheduled == "function" && rt.markStateUpdateScheduled(e, n);
    }
    var Dt = (
      /*                         */
      0
    ), ln = (
      /*                 */
      1
    ), bn = (
      /*                    */
      2
    ), Nn = (
      /*               */
      8
    ), Tn = (
      /*              */
      16
    ), gr = Math.clz32 ? Math.clz32 : lc, zr = Math.log, _f = Math.LN2;
    function lc(e) {
      var n = e >>> 0;
      return n === 0 ? 32 : 31 - (zr(n) / _f | 0) | 0;
    }
    var tu = 31, Le = (
      /*                        */
      0
    ), wn = (
      /*                          */
      0
    ), $t = (
      /*                        */
      1
    ), ho = (
      /*    */
      2
    ), zi = (
      /*             */
      4
    ), ta = (
      /*            */
      8
    ), ur = (
      /*                     */
      16
    ), Ol = (
      /*                */
      32
    ), mo = (
      /*                       */
      4194240
    ), nu = (
      /*                        */
      64
    ), kf = (
      /*                        */
      128
    ), Df = (
      /*                        */
      256
    ), Of = (
      /*                        */
      512
    ), Af = (
      /*                        */
      1024
    ), Lf = (
      /*                        */
      2048
    ), Nf = (
      /*                        */
      4096
    ), zf = (
      /*                        */
      8192
    ), Uf = (
      /*                        */
      16384
    ), ru = (
      /*                       */
      32768
    ), jf = (
      /*                       */
      65536
    ), Ju = (
      /*                       */
      131072
    ), es = (
      /*                       */
      262144
    ), Ff = (
      /*                       */
      524288
    ), oc = (
      /*                       */
      1048576
    ), Pf = (
      /*                       */
      2097152
    ), uc = (
      /*                            */
      130023424
    ), au = (
      /*                             */
      4194304
    ), $f = (
      /*                             */
      8388608
    ), sc = (
      /*                             */
      16777216
    ), Hf = (
      /*                             */
      33554432
    ), Vf = (
      /*                             */
      67108864
    ), jp = au, cc = (
      /*          */
      134217728
    ), Fp = (
      /*                          */
      268435455
    ), fc = (
      /*               */
      268435456
    ), iu = (
      /*                        */
      536870912
    ), Na = (
      /*                   */
      1073741824
    );
    function pm(e) {
      {
        if (e & $t)
          return "Sync";
        if (e & ho)
          return "InputContinuousHydration";
        if (e & zi)
          return "InputContinuous";
        if (e & ta)
          return "DefaultHydration";
        if (e & ur)
          return "Default";
        if (e & Ol)
          return "TransitionHydration";
        if (e & mo)
          return "Transition";
        if (e & uc)
          return "Retry";
        if (e & cc)
          return "SelectiveHydration";
        if (e & fc)
          return "IdleHydration";
        if (e & iu)
          return "Idle";
        if (e & Na)
          return "Offscreen";
      }
    }
    var jn = -1, lu = nu, If = au;
    function dc(e) {
      switch (yo(e)) {
        case $t:
          return $t;
        case ho:
          return ho;
        case zi:
          return zi;
        case ta:
          return ta;
        case ur:
          return ur;
        case Ol:
          return Ol;
        case nu:
        case kf:
        case Df:
        case Of:
        case Af:
        case Lf:
        case Nf:
        case zf:
        case Uf:
        case ru:
        case jf:
        case Ju:
        case es:
        case Ff:
        case oc:
        case Pf:
          return e & mo;
        case au:
        case $f:
        case sc:
        case Hf:
        case Vf:
          return e & uc;
        case cc:
          return cc;
        case fc:
          return fc;
        case iu:
          return iu;
        case Na:
          return Na;
        default:
          return v("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function qf(e, n) {
      var l = e.pendingLanes;
      if (l === Le)
        return Le;
      var o = Le, c = e.suspendedLanes, h = e.pingedLanes, S = l & Fp;
      if (S !== Le) {
        var T = S & ~c;
        if (T !== Le)
          o = dc(T);
        else {
          var R = S & h;
          R !== Le && (o = dc(R));
        }
      } else {
        var L = l & ~c;
        L !== Le ? o = dc(L) : h !== Le && (o = dc(h));
      }
      if (o === Le)
        return Le;
      if (n !== Le && n !== o && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (n & c) === Le) {
        var U = yo(o), te = yo(n);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          U >= te || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          U === ur && (te & mo) !== Le
        )
          return n;
      }
      (o & zi) !== Le && (o |= l & ur);
      var J = e.entangledLanes;
      if (J !== Le)
        for (var ve = e.entanglements, ge = o & J; ge > 0; ) {
          var Ee = Sr(ge), at = 1 << Ee;
          o |= ve[Ee], ge &= ~at;
        }
      return o;
    }
    function Ui(e, n) {
      for (var l = e.eventTimes, o = jn; n > 0; ) {
        var c = Sr(n), h = 1 << c, S = l[c];
        S > o && (o = S), n &= ~h;
      }
      return o;
    }
    function Pp(e, n) {
      switch (e) {
        case $t:
        case ho:
        case zi:
          return n + 250;
        case ta:
        case ur:
        case Ol:
        case nu:
        case kf:
        case Df:
        case Of:
        case Af:
        case Lf:
        case Nf:
        case zf:
        case Uf:
        case ru:
        case jf:
        case Ju:
        case es:
        case Ff:
        case oc:
        case Pf:
          return n + 5e3;
        case au:
        case $f:
        case sc:
        case Hf:
        case Vf:
          return jn;
        case cc:
        case fc:
        case iu:
        case Na:
          return jn;
        default:
          return v("Should have found matching lanes. This is a bug in React."), jn;
      }
    }
    function Yf(e, n) {
      for (var l = e.pendingLanes, o = e.suspendedLanes, c = e.pingedLanes, h = e.expirationTimes, S = l; S > 0; ) {
        var T = Sr(S), R = 1 << T, L = h[T];
        L === jn ? ((R & o) === Le || (R & c) !== Le) && (h[T] = Pp(R, n)) : L <= n && (e.expiredLanes |= R), S &= ~R;
      }
    }
    function vm(e) {
      return dc(e.pendingLanes);
    }
    function Wf(e) {
      var n = e.pendingLanes & ~Na;
      return n !== Le ? n : n & Na ? Na : Le;
    }
    function hm(e) {
      return (e & $t) !== Le;
    }
    function pc(e) {
      return (e & Fp) !== Le;
    }
    function ou(e) {
      return (e & uc) === e;
    }
    function $p(e) {
      var n = $t | zi | ur;
      return (e & n) === Le;
    }
    function Hp(e) {
      return (e & mo) === e;
    }
    function Bf(e, n) {
      var l = ho | zi | ta | ur;
      return (n & l) !== Le;
    }
    function mm(e, n) {
      return (n & e.expiredLanes) !== Le;
    }
    function Vp(e) {
      return (e & mo) !== Le;
    }
    function Ip() {
      var e = lu;
      return lu <<= 1, (lu & mo) === Le && (lu = nu), e;
    }
    function ym() {
      var e = If;
      return If <<= 1, (If & uc) === Le && (If = au), e;
    }
    function yo(e) {
      return e & -e;
    }
    function vc(e) {
      return yo(e);
    }
    function Sr(e) {
      return 31 - gr(e);
    }
    function Ir(e) {
      return Sr(e);
    }
    function za(e, n) {
      return (e & n) !== Le;
    }
    function uu(e, n) {
      return (e & n) === n;
    }
    function en(e, n) {
      return e | n;
    }
    function hc(e, n) {
      return e & ~n;
    }
    function qp(e, n) {
      return e & n;
    }
    function gm(e) {
      return e;
    }
    function Sm(e, n) {
      return e !== wn && e < n ? e : n;
    }
    function mc(e) {
      for (var n = [], l = 0; l < tu; l++)
        n.push(e);
      return n;
    }
    function ts(e, n, l) {
      e.pendingLanes |= n, n !== iu && (e.suspendedLanes = Le, e.pingedLanes = Le);
      var o = e.eventTimes, c = Ir(n);
      o[c] = l;
    }
    function Em(e, n) {
      e.suspendedLanes |= n, e.pingedLanes &= ~n;
      for (var l = e.expirationTimes, o = n; o > 0; ) {
        var c = Sr(o), h = 1 << c;
        l[c] = jn, o &= ~h;
      }
    }
    function Gf(e, n, l) {
      e.pingedLanes |= e.suspendedLanes & n;
    }
    function Yp(e, n) {
      var l = e.pendingLanes & ~n;
      e.pendingLanes = n, e.suspendedLanes = Le, e.pingedLanes = Le, e.expiredLanes &= n, e.mutableReadLanes &= n, e.entangledLanes &= n;
      for (var o = e.entanglements, c = e.eventTimes, h = e.expirationTimes, S = l; S > 0; ) {
        var T = Sr(S), R = 1 << T;
        o[T] = Le, c[T] = jn, h[T] = jn, S &= ~R;
      }
    }
    function Qf(e, n) {
      for (var l = e.entangledLanes |= n, o = e.entanglements, c = l; c; ) {
        var h = Sr(c), S = 1 << h;
        // Is this one of the newly entangled lanes?
        S & n | // Is this lane transitively entangled with the newly entangled lanes?
        o[h] & n && (o[h] |= n), c &= ~S;
      }
    }
    function Wp(e, n) {
      var l = yo(n), o;
      switch (l) {
        case zi:
          o = ho;
          break;
        case ur:
          o = ta;
          break;
        case nu:
        case kf:
        case Df:
        case Of:
        case Af:
        case Lf:
        case Nf:
        case zf:
        case Uf:
        case ru:
        case jf:
        case Ju:
        case es:
        case Ff:
        case oc:
        case Pf:
        case au:
        case $f:
        case sc:
        case Hf:
        case Vf:
          o = Ol;
          break;
        case iu:
          o = fc;
          break;
        default:
          o = wn;
          break;
      }
      return (o & (e.suspendedLanes | n)) !== wn ? wn : o;
    }
    function yc(e, n, l) {
      if (La)
        for (var o = e.pendingUpdatersLaneMap; l > 0; ) {
          var c = Ir(l), h = 1 << c, S = o[c];
          S.add(n), l &= ~h;
        }
    }
    function xm(e, n) {
      if (La)
        for (var l = e.pendingUpdatersLaneMap, o = e.memoizedUpdaters; n > 0; ) {
          var c = Ir(n), h = 1 << c, S = l[c];
          S.size > 0 && (S.forEach(function(T) {
            var R = T.alternate;
            (R === null || !o.has(R)) && o.add(T);
          }), S.clear()), n &= ~h;
        }
    }
    function Bp(e, n) {
      return null;
    }
    var pa = $t, rl = zi, vi = ur, hi = iu, gc = wn;
    function mi() {
      return gc;
    }
    function Er(e) {
      gc = e;
    }
    function wm(e, n) {
      var l = gc;
      try {
        return gc = e, n();
      } finally {
        gc = l;
      }
    }
    function Cm(e, n) {
      return e !== 0 && e < n ? e : n;
    }
    function Sc(e, n) {
      return e > n ? e : n;
    }
    function Ur(e, n) {
      return e !== 0 && e < n;
    }
    function bm(e) {
      var n = yo(e);
      return Ur(pa, n) ? Ur(rl, n) ? pc(n) ? vi : hi : rl : pa;
    }
    function Xf(e) {
      var n = e.current.memoizedState;
      return n.isDehydrated;
    }
    var Ec;
    function na(e) {
      Ec = e;
    }
    function g1(e) {
      Ec(e);
    }
    var vt;
    function ns(e) {
      vt = e;
    }
    var Kf;
    function Tm(e) {
      Kf = e;
    }
    var Rm;
    function xc(e) {
      Rm = e;
    }
    var wc;
    function Gp(e) {
      wc = e;
    }
    var Zf = !1, Cc = [], Al = null, al = null, il = null, sr = /* @__PURE__ */ new Map(), va = /* @__PURE__ */ new Map(), ha = [], Mm = [
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
    function _m(e) {
      return Mm.indexOf(e) > -1;
    }
    function ji(e, n, l, o, c) {
      return {
        blockedOn: e,
        domEventName: n,
        eventSystemFlags: l,
        nativeEvent: c,
        targetContainers: [o]
      };
    }
    function Qp(e, n) {
      switch (e) {
        case "focusin":
        case "focusout":
          Al = null;
          break;
        case "dragenter":
        case "dragleave":
          al = null;
          break;
        case "mouseover":
        case "mouseout":
          il = null;
          break;
        case "pointerover":
        case "pointerout": {
          var l = n.pointerId;
          sr.delete(l);
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
    function Ua(e, n, l, o, c, h) {
      if (e === null || e.nativeEvent !== h) {
        var S = ji(n, l, o, c, h);
        if (n !== null) {
          var T = fs(n);
          T !== null && vt(T);
        }
        return S;
      }
      e.eventSystemFlags |= o;
      var R = e.targetContainers;
      return c !== null && R.indexOf(c) === -1 && R.push(c), e;
    }
    function S1(e, n, l, o, c) {
      switch (n) {
        case "focusin": {
          var h = c;
          return Al = Ua(Al, e, n, l, o, h), !0;
        }
        case "dragenter": {
          var S = c;
          return al = Ua(al, e, n, l, o, S), !0;
        }
        case "mouseover": {
          var T = c;
          return il = Ua(il, e, n, l, o, T), !0;
        }
        case "pointerover": {
          var R = c, L = R.pointerId;
          return sr.set(L, Ua(sr.get(L) || null, e, n, l, o, R)), !0;
        }
        case "gotpointercapture": {
          var U = c, te = U.pointerId;
          return va.set(te, Ua(va.get(te) || null, e, n, l, o, U)), !0;
        }
      }
      return !1;
    }
    function Xp(e) {
      var n = zc(e.target);
      if (n !== null) {
        var l = Wa(n);
        if (l !== null) {
          var o = l.tag;
          if (o === V) {
            var c = el(l);
            if (c !== null) {
              e.blockedOn = c, wc(e.priority, function() {
                Kf(l);
              });
              return;
            }
          } else if (o === b) {
            var h = l.stateNode;
            if (Xf(h)) {
              e.blockedOn = tl(l);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function km(e) {
      for (var n = Rm(), l = {
        blockedOn: null,
        target: e,
        priority: n
      }, o = 0; o < ha.length && Ur(n, ha[o].priority); o++)
        ;
      ha.splice(o, 0, l), o === 0 && Xp(l);
    }
    function bc(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var n = e.targetContainers; n.length > 0; ) {
        var l = n[0], o = as(e.domEventName, e.eventSystemFlags, l, e.nativeEvent);
        if (o === null) {
          var c = e.nativeEvent, h = new c.constructor(c.type, c);
          p1(h), c.target.dispatchEvent(h), v1();
        } else {
          var S = fs(o);
          return S !== null && vt(S), e.blockedOn = o, !1;
        }
        n.shift();
      }
      return !0;
    }
    function Kp(e, n, l) {
      bc(e) && l.delete(n);
    }
    function E1() {
      Zf = !1, Al !== null && bc(Al) && (Al = null), al !== null && bc(al) && (al = null), il !== null && bc(il) && (il = null), sr.forEach(Kp), va.forEach(Kp);
    }
    function go(e, n) {
      e.blockedOn === n && (e.blockedOn = null, Zf || (Zf = !0, a.unstable_scheduleCallback(a.unstable_NormalPriority, E1)));
    }
    function su(e) {
      if (Cc.length > 0) {
        go(Cc[0], e);
        for (var n = 1; n < Cc.length; n++) {
          var l = Cc[n];
          l.blockedOn === e && (l.blockedOn = null);
        }
      }
      Al !== null && go(Al, e), al !== null && go(al, e), il !== null && go(il, e);
      var o = function(T) {
        return go(T, e);
      };
      sr.forEach(o), va.forEach(o);
      for (var c = 0; c < ha.length; c++) {
        var h = ha[c];
        h.blockedOn === e && (h.blockedOn = null);
      }
      for (; ha.length > 0; ) {
        var S = ha[0];
        if (S.blockedOn !== null)
          break;
        Xp(S), S.blockedOn === null && ha.shift();
      }
    }
    var qr = u.ReactCurrentBatchConfig, vn = !0;
    function Dr(e) {
      vn = !!e;
    }
    function xr() {
      return vn;
    }
    function Yr(e, n, l) {
      var o = Jf(n), c;
      switch (o) {
        case pa:
          c = Xa;
          break;
        case rl:
          c = rs;
          break;
        case vi:
        default:
          c = cr;
          break;
      }
      return c.bind(null, n, l, e);
    }
    function Xa(e, n, l, o) {
      var c = mi(), h = qr.transition;
      qr.transition = null;
      try {
        Er(pa), cr(e, n, l, o);
      } finally {
        Er(c), qr.transition = h;
      }
    }
    function rs(e, n, l, o) {
      var c = mi(), h = qr.transition;
      qr.transition = null;
      try {
        Er(rl), cr(e, n, l, o);
      } finally {
        Er(c), qr.transition = h;
      }
    }
    function cr(e, n, l, o) {
      vn && Tc(e, n, l, o);
    }
    function Tc(e, n, l, o) {
      var c = as(e, n, l, o);
      if (c === null) {
        j1(e, n, o, ll, l), Qp(e, o);
        return;
      }
      if (S1(c, e, n, l, o)) {
        o.stopPropagation();
        return;
      }
      if (Qp(e, o), n & ui && _m(e)) {
        for (; c !== null; ) {
          var h = fs(c);
          h !== null && g1(h);
          var S = as(e, n, l, o);
          if (S === null && j1(e, n, o, ll, l), S === c)
            break;
          c = S;
        }
        c !== null && o.stopPropagation();
        return;
      }
      j1(e, n, o, null, l);
    }
    var ll = null;
    function as(e, n, l, o) {
      ll = null;
      var c = Cp(o), h = zc(c);
      if (h !== null) {
        var S = Wa(h);
        if (S === null)
          h = null;
        else {
          var T = S.tag;
          if (T === V) {
            var R = el(S);
            if (R !== null)
              return R;
            h = null;
          } else if (T === b) {
            var L = S.stateNode;
            if (Xf(L))
              return tl(S);
            h = null;
          } else S !== h && (h = null);
        }
      }
      return ll = h, null;
    }
    function Jf(e) {
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
          return rl;
        case "message": {
          var n = Cf();
          switch (n) {
            case ec:
              return pa;
            case po:
              return rl;
            case kl:
            case y1:
              return vi;
            case Xo:
              return hi;
            default:
              return vi;
          }
        }
        default:
          return vi;
      }
    }
    function Rc(e, n, l) {
      return e.addEventListener(n, l, !1), l;
    }
    function ja(e, n, l) {
      return e.addEventListener(n, l, !0), l;
    }
    function Zp(e, n, l, o) {
      return e.addEventListener(n, l, {
        capture: !0,
        passive: o
      }), l;
    }
    function is(e, n, l, o) {
      return e.addEventListener(n, l, {
        passive: o
      }), l;
    }
    var Ka = null, ls = null, cu = null;
    function So(e) {
      return Ka = e, ls = Mc(), !0;
    }
    function ed() {
      Ka = null, ls = null, cu = null;
    }
    function Ll() {
      if (cu)
        return cu;
      var e, n = ls, l = n.length, o, c = Mc(), h = c.length;
      for (e = 0; e < l && n[e] === c[e]; e++)
        ;
      var S = l - e;
      for (o = 1; o <= S && n[l - o] === c[h - o]; o++)
        ;
      var T = o > 1 ? 1 - o : void 0;
      return cu = c.slice(e, T), cu;
    }
    function Mc() {
      return "value" in Ka ? Ka.value : Ka.textContent;
    }
    function Eo(e) {
      var n, l = e.keyCode;
      return "charCode" in e ? (n = e.charCode, n === 0 && l === 13 && (n = 13)) : n = l, n === 10 && (n = 13), n >= 32 || n === 13 ? n : 0;
    }
    function os() {
      return !0;
    }
    function _c() {
      return !1;
    }
    function ra(e) {
      function n(l, o, c, h, S) {
        this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = h, this.target = S, this.currentTarget = null;
        for (var T in e)
          if (e.hasOwnProperty(T)) {
            var R = e[T];
            R ? this[T] = R(h) : this[T] = h[T];
          }
        var L = h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1;
        return L ? this.isDefaultPrevented = os : this.isDefaultPrevented = _c, this.isPropagationStopped = _c, this;
      }
      return Bt(n.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = os);
        },
        stopPropagation: function() {
          var l = this.nativeEvent;
          l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = os);
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
        isPersistent: os
      }), n;
    }
    var wr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, ol = ra(wr), ma = Bt({}, wr, {
      view: 0,
      detail: 0
    }), Fa = ra(ma), td, kc, fu;
    function x1(e) {
      e !== fu && (fu && e.type === "mousemove" ? (td = e.screenX - fu.screenX, kc = e.screenY - fu.screenY) : (td = 0, kc = 0), fu = e);
    }
    var Fi = Bt({}, ma, {
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
        return "movementX" in e ? e.movementX : (x1(e), td);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : kc;
      }
    }), Jp = ra(Fi), ev = Bt({}, Fi, {
      dataTransfer: 0
    }), du = ra(ev), tv = Bt({}, ma, {
      relatedTarget: 0
    }), Nl = ra(tv), Dm = Bt({}, wr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Om = ra(Dm), nv = Bt({}, wr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), nd = ra(nv), w1 = Bt({}, wr, {
      data: 0
    }), Am = ra(w1), Lm = Am, Nm = {
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
    }, pu = {
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
    function C1(e) {
      if (e.key) {
        var n = Nm[e.key] || e.key;
        if (n !== "Unidentified")
          return n;
      }
      if (e.type === "keypress") {
        var l = Eo(e);
        return l === 13 ? "Enter" : String.fromCharCode(l);
      }
      return e.type === "keydown" || e.type === "keyup" ? pu[e.keyCode] || "Unidentified" : "";
    }
    var us = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function zm(e) {
      var n = this, l = n.nativeEvent;
      if (l.getModifierState)
        return l.getModifierState(e);
      var o = us[e];
      return o ? !!l[o] : !1;
    }
    function Kn(e) {
      return zm;
    }
    var b1 = Bt({}, ma, {
      key: C1,
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
        return e.type === "keypress" ? Eo(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Eo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Um = ra(b1), T1 = Bt({}, Fi, {
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
    }), jm = ra(T1), Fm = Bt({}, ma, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Kn
    }), Pm = ra(Fm), R1 = Bt({}, wr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), yi = ra(R1), rv = Bt({}, Fi, {
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
    }), M1 = ra(rv), xo = [9, 13, 27, 32], Dc = 229, zl = Xe && "CompositionEvent" in window, wo = null;
    Xe && "documentMode" in document && (wo = document.documentMode);
    var av = Xe && "TextEvent" in window && !wo, rd = Xe && (!zl || wo && wo > 8 && wo <= 11), $m = 32, ad = String.fromCharCode($m);
    function _1() {
      De("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), De("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), De("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), De("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var iv = !1;
    function Hm(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function id(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function ld(e, n) {
      return e === "keydown" && n.keyCode === Dc;
    }
    function lv(e, n) {
      switch (e) {
        case "keyup":
          return xo.indexOf(n.keyCode) !== -1;
        case "keydown":
          return n.keyCode !== Dc;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function od(e) {
      var n = e.detail;
      return typeof n == "object" && "data" in n ? n.data : null;
    }
    function Vm(e) {
      return e.locale === "ko";
    }
    var vu = !1;
    function ov(e, n, l, o, c) {
      var h, S;
      if (zl ? h = id(n) : vu ? lv(n, o) && (h = "onCompositionEnd") : ld(n, o) && (h = "onCompositionStart"), !h)
        return null;
      rd && !Vm(o) && (!vu && h === "onCompositionStart" ? vu = So(c) : h === "onCompositionEnd" && vu && (S = Ll()));
      var T = Qm(l, h);
      if (T.length > 0) {
        var R = new Am(h, n, null, o, c);
        if (e.push({
          event: R,
          listeners: T
        }), S)
          R.data = S;
        else {
          var L = od(o);
          L !== null && (R.data = L);
        }
      }
    }
    function ud(e, n) {
      switch (e) {
        case "compositionend":
          return od(n);
        case "keypress":
          var l = n.which;
          return l !== $m ? null : (iv = !0, ad);
        case "textInput":
          var o = n.data;
          return o === ad && iv ? null : o;
        default:
          return null;
      }
    }
    function uv(e, n) {
      if (vu) {
        if (e === "compositionend" || !zl && lv(e, n)) {
          var l = Ll();
          return ed(), vu = !1, l;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Hm(n)) {
            if (n.char && n.char.length > 1)
              return n.char;
            if (n.which)
              return String.fromCharCode(n.which);
          }
          return null;
        case "compositionend":
          return rd && !Vm(n) ? null : n.data;
        default:
          return null;
      }
    }
    function sd(e, n, l, o, c) {
      var h;
      if (av ? h = ud(n, o) : h = uv(n, o), !h)
        return null;
      var S = Qm(l, "onBeforeInput");
      if (S.length > 0) {
        var T = new Lm("onBeforeInput", "beforeinput", null, o, c);
        e.push({
          event: T,
          listeners: S
        }), T.data = h;
      }
    }
    function Im(e, n, l, o, c, h, S) {
      ov(e, n, l, o, c), sd(e, n, l, o, c);
    }
    var k1 = {
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
    function Oc(e) {
      var n = e && e.nodeName && e.nodeName.toLowerCase();
      return n === "input" ? !!k1[e.type] : n === "textarea";
    }
    function D1(e) {
      if (!Xe)
        return !1;
      var n = "on" + e, l = n in document;
      if (!l) {
        var o = document.createElement("div");
        o.setAttribute(n, "return;"), l = typeof o[n] == "function";
      }
      return l;
    }
    function Ac() {
      De("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function qm(e, n, l, o) {
      Yu(o);
      var c = Qm(n, "onChange");
      if (c.length > 0) {
        var h = new ol("onChange", "change", null, l, o);
        e.push({
          event: h,
          listeners: c
        });
      }
    }
    var Co = null, r = null;
    function i(e) {
      var n = e.nodeName && e.nodeName.toLowerCase();
      return n === "select" || n === "input" && e.type === "file";
    }
    function s(e) {
      var n = [];
      qm(n, r, e, Cp(e)), nm(d, n);
    }
    function d(e) {
      O3(e, 0);
    }
    function y(e) {
      var n = hd(e);
      if (Gi(n))
        return e;
    }
    function w(e, n) {
      if (e === "change")
        return n;
    }
    var O = !1;
    Xe && (O = D1("input") && (!document.documentMode || document.documentMode > 9));
    function I(e, n) {
      Co = e, r = n, Co.attachEvent("onpropertychange", ye);
    }
    function K() {
      Co && (Co.detachEvent("onpropertychange", ye), Co = null, r = null);
    }
    function ye(e) {
      e.propertyName === "value" && y(r) && s(e);
    }
    function Ue(e, n, l) {
      e === "focusin" ? (K(), I(n, l)) : e === "focusout" && K();
    }
    function $e(e, n) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return y(r);
    }
    function Ne(e) {
      var n = e.nodeName;
      return n && n.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function st(e, n) {
      if (e === "click")
        return y(n);
    }
    function mt(e, n) {
      if (e === "input" || e === "change")
        return y(n);
    }
    function St(e) {
      var n = e._wrapperState;
      !n || !n.controlled || e.type !== "number" || Ot(e, "number", e.value);
    }
    function fr(e, n, l, o, c, h, S) {
      var T = l ? hd(l) : window, R, L;
      if (i(T) ? R = w : Oc(T) ? O ? R = mt : (R = $e, L = Ue) : Ne(T) && (R = st), R) {
        var U = R(n, l);
        if (U) {
          qm(e, U, o, c);
          return;
        }
      }
      L && L(n, T, l), n === "focusout" && St(T);
    }
    function se() {
      Ve("onMouseEnter", ["mouseout", "mouseover"]), Ve("onMouseLeave", ["mouseout", "mouseover"]), Ve("onPointerEnter", ["pointerout", "pointerover"]), Ve("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function ee(e, n, l, o, c, h, S) {
      var T = n === "mouseover" || n === "pointerover", R = n === "mouseout" || n === "pointerout";
      if (T && !Gs(o)) {
        var L = o.relatedTarget || o.fromElement;
        if (L && (zc(L) || wv(L)))
          return;
      }
      if (!(!R && !T)) {
        var U;
        if (c.window === c)
          U = c;
        else {
          var te = c.ownerDocument;
          te ? U = te.defaultView || te.parentWindow : U = window;
        }
        var J, ve;
        if (R) {
          var ge = o.relatedTarget || o.toElement;
          if (J = l, ve = ge ? zc(ge) : null, ve !== null) {
            var Ee = Wa(ve);
            (ve !== Ee || ve.tag !== _ && ve.tag !== k) && (ve = null);
          }
        } else
          J = null, ve = l;
        if (J !== ve) {
          var at = Jp, At = "onMouseLeave", Tt = "onMouseEnter", mn = "mouse";
          (n === "pointerout" || n === "pointerover") && (at = jm, At = "onPointerLeave", Tt = "onPointerEnter", mn = "pointer");
          var fn = J == null ? U : hd(J), ce = ve == null ? U : hd(ve), xe = new at(At, mn + "leave", J, o, c);
          xe.target = fn, xe.relatedTarget = ce;
          var fe = null, He = zc(c);
          if (He === l) {
            var pt = new at(Tt, mn + "enter", ve, o, c);
            pt.target = ce, pt.relatedTarget = fn, fe = pt;
          }
          dT(e, xe, fe, J, ve);
        }
      }
    }
    function pe(e, n) {
      return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
    }
    var je = typeof Object.is == "function" ? Object.is : pe;
    function yt(e, n) {
      if (je(e, n))
        return !0;
      if (typeof e != "object" || e === null || typeof n != "object" || n === null)
        return !1;
      var l = Object.keys(e), o = Object.keys(n);
      if (l.length !== o.length)
        return !1;
      for (var c = 0; c < l.length; c++) {
        var h = l[c];
        if (!Oe.call(n, h) || !je(e[h], n[h]))
          return !1;
      }
      return !0;
    }
    function zt(e) {
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
    function Yt(e, n) {
      for (var l = zt(e), o = 0, c = 0; l; ) {
        if (l.nodeType === bl) {
          if (c = o + l.textContent.length, o <= n && c >= n)
            return {
              node: l,
              offset: n - o
            };
          o = c;
        }
        l = zt(Ft(l));
      }
    }
    function jr(e) {
      var n = e.ownerDocument, l = n && n.defaultView || window, o = l.getSelection && l.getSelection();
      if (!o || o.rangeCount === 0)
        return null;
      var c = o.anchorNode, h = o.anchorOffset, S = o.focusNode, T = o.focusOffset;
      try {
        c.nodeType, S.nodeType;
      } catch {
        return null;
      }
      return Rn(e, c, h, S, T);
    }
    function Rn(e, n, l, o, c) {
      var h = 0, S = -1, T = -1, R = 0, L = 0, U = e, te = null;
      e: for (; ; ) {
        for (var J = null; U === n && (l === 0 || U.nodeType === bl) && (S = h + l), U === o && (c === 0 || U.nodeType === bl) && (T = h + c), U.nodeType === bl && (h += U.nodeValue.length), (J = U.firstChild) !== null; )
          te = U, U = J;
        for (; ; ) {
          if (U === e)
            break e;
          if (te === n && ++R === l && (S = h), te === o && ++L === c && (T = h), (J = U.nextSibling) !== null)
            break;
          U = te, te = U.parentNode;
        }
        U = J;
      }
      return S === -1 || T === -1 ? null : {
        start: S,
        end: T
      };
    }
    function bo(e, n) {
      var l = e.ownerDocument || document, o = l && l.defaultView || window;
      if (o.getSelection) {
        var c = o.getSelection(), h = e.textContent.length, S = Math.min(n.start, h), T = n.end === void 0 ? S : Math.min(n.end, h);
        if (!c.extend && S > T) {
          var R = T;
          T = S, S = R;
        }
        var L = Yt(e, S), U = Yt(e, T);
        if (L && U) {
          if (c.rangeCount === 1 && c.anchorNode === L.node && c.anchorOffset === L.offset && c.focusNode === U.node && c.focusOffset === U.offset)
            return;
          var te = l.createRange();
          te.setStart(L.node, L.offset), c.removeAllRanges(), S > T ? (c.addRange(te), c.extend(U.node, U.offset)) : (te.setEnd(U.node, U.offset), c.addRange(te));
        }
      }
    }
    function Ym(e) {
      return e && e.nodeType === bl;
    }
    function E3(e, n) {
      return !e || !n ? !1 : e === n ? !0 : Ym(e) ? !1 : Ym(n) ? E3(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1;
    }
    function Gb(e) {
      return e && e.ownerDocument && E3(e.ownerDocument.documentElement, e);
    }
    function Qb(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function x3() {
      for (var e = window, n = oi(); n instanceof e.HTMLIFrameElement; ) {
        if (Qb(n))
          e = n.contentWindow;
        else
          return n;
        n = oi(e.document);
      }
      return n;
    }
    function O1(e) {
      var n = e && e.nodeName && e.nodeName.toLowerCase();
      return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
    }
    function Xb() {
      var e = x3();
      return {
        focusedElem: e,
        selectionRange: O1(e) ? Zb(e) : null
      };
    }
    function Kb(e) {
      var n = x3(), l = e.focusedElem, o = e.selectionRange;
      if (n !== l && Gb(l)) {
        o !== null && O1(l) && Jb(l, o);
        for (var c = [], h = l; h = h.parentNode; )
          h.nodeType === _a && c.push({
            element: h,
            left: h.scrollLeft,
            top: h.scrollTop
          });
        typeof l.focus == "function" && l.focus();
        for (var S = 0; S < c.length; S++) {
          var T = c[S];
          T.element.scrollLeft = T.left, T.element.scrollTop = T.top;
        }
      }
    }
    function Zb(e) {
      var n;
      return "selectionStart" in e ? n = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : n = jr(e), n || {
        start: 0,
        end: 0
      };
    }
    function Jb(e, n) {
      var l = n.start, o = n.end;
      o === void 0 && (o = l), "selectionStart" in e ? (e.selectionStart = l, e.selectionEnd = Math.min(o, e.value.length)) : bo(e, n);
    }
    var eT = Xe && "documentMode" in document && document.documentMode <= 11;
    function tT() {
      De("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var cd = null, A1 = null, sv = null, L1 = !1;
    function nT(e) {
      if ("selectionStart" in e && O1(e))
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
    function rT(e) {
      return e.window === e ? e.document : e.nodeType === Tl ? e : e.ownerDocument;
    }
    function w3(e, n, l) {
      var o = rT(l);
      if (!(L1 || cd == null || cd !== oi(o))) {
        var c = nT(cd);
        if (!sv || !yt(sv, c)) {
          sv = c;
          var h = Qm(A1, "onSelect");
          if (h.length > 0) {
            var S = new ol("onSelect", "select", null, n, l);
            e.push({
              event: S,
              listeners: h
            }), S.target = cd;
          }
        }
      }
    }
    function aT(e, n, l, o, c, h, S) {
      var T = l ? hd(l) : window;
      switch (n) {
        // Track the input node that has focus.
        case "focusin":
          (Oc(T) || T.contentEditable === "true") && (cd = T, A1 = l, sv = null);
          break;
        case "focusout":
          cd = null, A1 = null, sv = null;
          break;
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case "mousedown":
          L1 = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          L1 = !1, w3(e, o, c);
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
          if (eT)
            break;
        // falls through
        case "keydown":
        case "keyup":
          w3(e, o, c);
      }
    }
    function Wm(e, n) {
      var l = {};
      return l[e.toLowerCase()] = n.toLowerCase(), l["Webkit" + e] = "webkit" + n, l["Moz" + e] = "moz" + n, l;
    }
    var fd = {
      animationend: Wm("Animation", "AnimationEnd"),
      animationiteration: Wm("Animation", "AnimationIteration"),
      animationstart: Wm("Animation", "AnimationStart"),
      transitionend: Wm("Transition", "TransitionEnd")
    }, N1 = {}, C3 = {};
    Xe && (C3 = document.createElement("div").style, "AnimationEvent" in window || (delete fd.animationend.animation, delete fd.animationiteration.animation, delete fd.animationstart.animation), "TransitionEvent" in window || delete fd.transitionend.transition);
    function Bm(e) {
      if (N1[e])
        return N1[e];
      if (!fd[e])
        return e;
      var n = fd[e];
      for (var l in n)
        if (n.hasOwnProperty(l) && l in C3)
          return N1[e] = n[l];
      return e;
    }
    var b3 = Bm("animationend"), T3 = Bm("animationiteration"), R3 = Bm("animationstart"), M3 = Bm("transitionend"), _3 = /* @__PURE__ */ new Map(), k3 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function ss(e, n) {
      _3.set(e, n), De(n, [e]);
    }
    function iT() {
      for (var e = 0; e < k3.length; e++) {
        var n = k3[e], l = n.toLowerCase(), o = n[0].toUpperCase() + n.slice(1);
        ss(l, "on" + o);
      }
      ss(b3, "onAnimationEnd"), ss(T3, "onAnimationIteration"), ss(R3, "onAnimationStart"), ss("dblclick", "onDoubleClick"), ss("focusin", "onFocus"), ss("focusout", "onBlur"), ss(M3, "onTransitionEnd");
    }
    function lT(e, n, l, o, c, h, S) {
      var T = _3.get(n);
      if (T !== void 0) {
        var R = ol, L = n;
        switch (n) {
          case "keypress":
            if (Eo(o) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            R = Um;
            break;
          case "focusin":
            L = "focus", R = Nl;
            break;
          case "focusout":
            L = "blur", R = Nl;
            break;
          case "beforeblur":
          case "afterblur":
            R = Nl;
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
            R = Jp;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            R = du;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            R = Pm;
            break;
          case b3:
          case T3:
          case R3:
            R = Om;
            break;
          case M3:
            R = yi;
            break;
          case "scroll":
            R = Fa;
            break;
          case "wheel":
            R = M1;
            break;
          case "copy":
          case "cut":
          case "paste":
            R = nd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            R = jm;
            break;
        }
        var U = (h & ui) !== 0;
        {
          var te = !U && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          n === "scroll", J = cT(l, T, o.type, U, te);
          if (J.length > 0) {
            var ve = new R(T, L, null, o, c);
            e.push({
              event: ve,
              listeners: J
            });
          }
        }
      }
    }
    iT(), se(), Ac(), tT(), _1();
    function oT(e, n, l, o, c, h, S) {
      lT(e, n, l, o, c, h);
      var T = (h & wp) === 0;
      T && (ee(e, n, l, o, c), fr(e, n, l, o, c), aT(e, n, l, o, c), Im(e, n, l, o, c));
    }
    var cv = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], z1 = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(cv));
    function D3(e, n, l) {
      var o = e.type || "unknown-event";
      e.currentTarget = l, Ki(o, n, void 0, e), e.currentTarget = null;
    }
    function uT(e, n, l) {
      var o;
      if (l)
        for (var c = n.length - 1; c >= 0; c--) {
          var h = n[c], S = h.instance, T = h.currentTarget, R = h.listener;
          if (S !== o && e.isPropagationStopped())
            return;
          D3(e, R, T), o = S;
        }
      else
        for (var L = 0; L < n.length; L++) {
          var U = n[L], te = U.instance, J = U.currentTarget, ve = U.listener;
          if (te !== o && e.isPropagationStopped())
            return;
          D3(e, ve, J), o = te;
        }
    }
    function O3(e, n) {
      for (var l = (n & ui) !== 0, o = 0; o < e.length; o++) {
        var c = e[o], h = c.event, S = c.listeners;
        uT(h, S, l);
      }
      Ks();
    }
    function sT(e, n, l, o, c) {
      var h = Cp(l), S = [];
      oT(S, e, o, l, h, n), O3(S, n);
    }
    function rr(e, n) {
      z1.has(e) || v('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var l = !1, o = PR(n), c = pT(e);
      o.has(c) || (A3(n, e, cf, l), o.add(c));
    }
    function U1(e, n, l) {
      z1.has(e) && !n && v('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var o = 0;
      n && (o |= ui), A3(l, e, o, n);
    }
    var Gm = "_reactListening" + Math.random().toString(36).slice(2);
    function fv(e) {
      if (!e[Gm]) {
        e[Gm] = !0, _e.forEach(function(l) {
          l !== "selectionchange" && (z1.has(l) || U1(l, !1, e), U1(l, !0, e));
        });
        var n = e.nodeType === Tl ? e : e.ownerDocument;
        n !== null && (n[Gm] || (n[Gm] = !0, U1("selectionchange", !1, n)));
      }
    }
    function A3(e, n, l, o, c) {
      var h = Yr(e, n, l), S = void 0;
      Xs && (n === "touchstart" || n === "touchmove" || n === "wheel") && (S = !0), e = e, o ? S !== void 0 ? Zp(e, n, h, S) : ja(e, n, h) : S !== void 0 ? is(e, n, h, S) : Rc(e, n, h);
    }
    function L3(e, n) {
      return e === n || e.nodeType === hr && e.parentNode === n;
    }
    function j1(e, n, l, o, c) {
      var h = o;
      if ((n & xp) === 0 && (n & cf) === 0) {
        var S = c;
        if (o !== null) {
          var T = o;
          e: for (; ; ) {
            if (T === null)
              return;
            var R = T.tag;
            if (R === b || R === M) {
              var L = T.stateNode.containerInfo;
              if (L3(L, S))
                break;
              if (R === M)
                for (var U = T.return; U !== null; ) {
                  var te = U.tag;
                  if (te === b || te === M) {
                    var J = U.stateNode.containerInfo;
                    if (L3(J, S))
                      return;
                  }
                  U = U.return;
                }
              for (; L !== null; ) {
                var ve = zc(L);
                if (ve === null)
                  return;
                var ge = ve.tag;
                if (ge === _ || ge === k) {
                  T = h = ve;
                  continue e;
                }
                L = L.parentNode;
              }
            }
            T = T.return;
          }
        }
      }
      nm(function() {
        return sT(e, n, l, h);
      });
    }
    function dv(e, n, l) {
      return {
        instance: e,
        listener: n,
        currentTarget: l
      };
    }
    function cT(e, n, l, o, c, h) {
      for (var S = n !== null ? n + "Capture" : null, T = o ? S : n, R = [], L = e, U = null; L !== null; ) {
        var te = L, J = te.stateNode, ve = te.tag;
        if (ve === _ && J !== null && (U = J, T !== null)) {
          var ge = lo(L, T);
          ge != null && R.push(dv(L, ge, U));
        }
        if (c)
          break;
        L = L.return;
      }
      return R;
    }
    function Qm(e, n) {
      for (var l = n + "Capture", o = [], c = e; c !== null; ) {
        var h = c, S = h.stateNode, T = h.tag;
        if (T === _ && S !== null) {
          var R = S, L = lo(c, l);
          L != null && o.unshift(dv(c, L, R));
          var U = lo(c, n);
          U != null && o.push(dv(c, U, R));
        }
        c = c.return;
      }
      return o;
    }
    function dd(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== _);
      return e || null;
    }
    function fT(e, n) {
      for (var l = e, o = n, c = 0, h = l; h; h = dd(h))
        c++;
      for (var S = 0, T = o; T; T = dd(T))
        S++;
      for (; c - S > 0; )
        l = dd(l), c--;
      for (; S - c > 0; )
        o = dd(o), S--;
      for (var R = c; R--; ) {
        if (l === o || o !== null && l === o.alternate)
          return l;
        l = dd(l), o = dd(o);
      }
      return null;
    }
    function N3(e, n, l, o, c) {
      for (var h = n._reactName, S = [], T = l; T !== null && T !== o; ) {
        var R = T, L = R.alternate, U = R.stateNode, te = R.tag;
        if (L !== null && L === o)
          break;
        if (te === _ && U !== null) {
          var J = U;
          if (c) {
            var ve = lo(T, h);
            ve != null && S.unshift(dv(T, ve, J));
          } else if (!c) {
            var ge = lo(T, h);
            ge != null && S.push(dv(T, ge, J));
          }
        }
        T = T.return;
      }
      S.length !== 0 && e.push({
        event: n,
        listeners: S
      });
    }
    function dT(e, n, l, o, c) {
      var h = o && c ? fT(o, c) : null;
      o !== null && N3(e, n, o, h, !1), c !== null && l !== null && N3(e, l, c, h, !0);
    }
    function pT(e, n) {
      return e + "__bubble";
    }
    var gi = !1, pv = "dangerouslySetInnerHTML", Xm = "suppressContentEditableWarning", cs = "suppressHydrationWarning", z3 = "autoFocus", Lc = "children", Nc = "style", Km = "__html", F1, Zm, vv, U3, Jm, j3, F3;
    F1 = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Zm = function(e, n) {
      gp(e, n), uf(e, n), Jh(e, n, {
        registrationNameDependencies: Pe,
        possibleRegistrationNames: Be
      });
    }, j3 = Xe && !document.documentMode, vv = function(e, n, l) {
      if (!gi) {
        var o = ey(l), c = ey(n);
        c !== o && (gi = !0, v("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(c), JSON.stringify(o)));
      }
    }, U3 = function(e) {
      if (!gi) {
        gi = !0;
        var n = [];
        e.forEach(function(l) {
          n.push(l);
        }), v("Extra attributes from the server: %s", n);
      }
    }, Jm = function(e, n) {
      n === !1 ? v("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : v("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof n);
    }, F3 = function(e, n) {
      var l = e.namespaceURI === Cl ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return l.innerHTML = n, l.innerHTML;
    };
    var vT = /\r\n?/g, hT = /\u0000|\uFFFD/g;
    function ey(e) {
      bt(e);
      var n = typeof e == "string" ? e : "" + e;
      return n.replace(vT, `
`).replace(hT, "");
    }
    function ty(e, n, l, o) {
      var c = ey(n), h = ey(e);
      if (h !== c && (o && (gi || (gi = !0, v('Text content did not match. Server: "%s" Client: "%s"', h, c))), l && le))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function P3(e) {
      return e.nodeType === Tl ? e : e.ownerDocument;
    }
    function mT() {
    }
    function ny(e) {
      e.onclick = mT;
    }
    function yT(e, n, l, o, c) {
      for (var h in o)
        if (o.hasOwnProperty(h)) {
          var S = o[h];
          if (h === Nc)
            S && Object.freeze(S), Bh(n, S);
          else if (h === pv) {
            var T = S ? S[Km] : void 0;
            T != null && zh(n, T);
          } else if (h === Lc)
            if (typeof S == "string") {
              var R = e !== "textarea" || S !== "";
              R && Hu(n, S);
            } else typeof S == "number" && Hu(n, "" + S);
          else h === Xm || h === cs || h === z3 || (Pe.hasOwnProperty(h) ? S != null && (typeof S != "function" && Jm(h, S), h === "onScroll" && rr("scroll", n)) : S != null && Tr(n, h, S, c));
        }
    }
    function gT(e, n, l, o) {
      for (var c = 0; c < n.length; c += 2) {
        var h = n[c], S = n[c + 1];
        h === Nc ? Bh(e, S) : h === pv ? zh(e, S) : h === Lc ? Hu(e, S) : Tr(e, h, S, o);
      }
    }
    function ST(e, n, l, o) {
      var c, h = P3(l), S, T = o;
      if (T === Cl && (T = fp(e)), T === Cl) {
        if (c = ao(e, n), !c && e !== e.toLowerCase() && v("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var R = h.createElement("div");
          R.innerHTML = "<script><\/script>";
          var L = R.firstChild;
          S = R.removeChild(L);
        } else if (typeof n.is == "string")
          S = h.createElement(e, {
            is: n.is
          });
        else if (S = h.createElement(e), e === "select") {
          var U = S;
          n.multiple ? U.multiple = !0 : n.size && (U.size = n.size);
        }
      } else
        S = h.createElementNS(T, e);
      return T === Cl && !c && Object.prototype.toString.call(S) === "[object HTMLUnknownElement]" && !Oe.call(F1, e) && (F1[e] = !0, v("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), S;
    }
    function ET(e, n) {
      return P3(n).createTextNode(e);
    }
    function xT(e, n, l, o) {
      var c = ao(n, l);
      Zm(n, l);
      var h;
      switch (n) {
        case "dialog":
          rr("cancel", e), rr("close", e), h = l;
          break;
        case "iframe":
        case "object":
        case "embed":
          rr("load", e), h = l;
          break;
        case "video":
        case "audio":
          for (var S = 0; S < cv.length; S++)
            rr(cv[S], e);
          h = l;
          break;
        case "source":
          rr("error", e), h = l;
          break;
        case "img":
        case "image":
        case "link":
          rr("error", e), rr("load", e), h = l;
          break;
        case "details":
          rr("toggle", e), h = l;
          break;
        case "input":
          Ai(e, l), h = $u(e, l), rr("invalid", e);
          break;
        case "option":
          En(e, l), h = l;
          break;
        case "select":
          Vo(e, l), h = Hs(e, l), rr("invalid", e);
          break;
        case "textarea":
          up(e, l), h = op(e, l), rr("invalid", e);
          break;
        default:
          h = l;
      }
      switch (lf(n, h), yT(n, e, o, h, c), n) {
        case "input":
          Oi(e), me(e, l, !1);
          break;
        case "textarea":
          Oi(e), Lh(e);
          break;
        case "option":
          Fn(e, l);
          break;
        case "select":
          ip(e, l);
          break;
        default:
          typeof h.onClick == "function" && ny(e);
          break;
      }
    }
    function wT(e, n, l, o, c) {
      Zm(n, o);
      var h = null, S, T;
      switch (n) {
        case "input":
          S = $u(e, l), T = $u(e, o), h = [];
          break;
        case "select":
          S = Hs(e, l), T = Hs(e, o), h = [];
          break;
        case "textarea":
          S = op(e, l), T = op(e, o), h = [];
          break;
        default:
          S = l, T = o, typeof S.onClick != "function" && typeof T.onClick == "function" && ny(e);
          break;
      }
      lf(n, T);
      var R, L, U = null;
      for (R in S)
        if (!(T.hasOwnProperty(R) || !S.hasOwnProperty(R) || S[R] == null))
          if (R === Nc) {
            var te = S[R];
            for (L in te)
              te.hasOwnProperty(L) && (U || (U = {}), U[L] = "");
          } else R === pv || R === Lc || R === Xm || R === cs || R === z3 || (Pe.hasOwnProperty(R) ? h || (h = []) : (h = h || []).push(R, null));
      for (R in T) {
        var J = T[R], ve = S?.[R];
        if (!(!T.hasOwnProperty(R) || J === ve || J == null && ve == null))
          if (R === Nc)
            if (J && Object.freeze(J), ve) {
              for (L in ve)
                ve.hasOwnProperty(L) && (!J || !J.hasOwnProperty(L)) && (U || (U = {}), U[L] = "");
              for (L in J)
                J.hasOwnProperty(L) && ve[L] !== J[L] && (U || (U = {}), U[L] = J[L]);
            } else
              U || (h || (h = []), h.push(R, U)), U = J;
          else if (R === pv) {
            var ge = J ? J[Km] : void 0, Ee = ve ? ve[Km] : void 0;
            ge != null && Ee !== ge && (h = h || []).push(R, ge);
          } else R === Lc ? (typeof J == "string" || typeof J == "number") && (h = h || []).push(R, "" + J) : R === Xm || R === cs || (Pe.hasOwnProperty(R) ? (J != null && (typeof J != "function" && Jm(R, J), R === "onScroll" && rr("scroll", e)), !h && ve !== J && (h = [])) : (h = h || []).push(R, J));
      }
      return U && (f1(U, T[Nc]), (h = h || []).push(Nc, U)), h;
    }
    function CT(e, n, l, o, c) {
      l === "input" && c.type === "radio" && c.name != null && D(e, c);
      var h = ao(l, o), S = ao(l, c);
      switch (gT(e, n, h, S), l) {
        case "input":
          Y(e, c);
          break;
        case "textarea":
          Ah(e, c);
          break;
        case "select":
          nf(e, c);
          break;
      }
    }
    function bT(e) {
      {
        var n = e.toLowerCase();
        return Ws.hasOwnProperty(n) && Ws[n] || null;
      }
    }
    function TT(e, n, l, o, c, h, S) {
      var T, R;
      switch (T = ao(n, l), Zm(n, l), n) {
        case "dialog":
          rr("cancel", e), rr("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          rr("load", e);
          break;
        case "video":
        case "audio":
          for (var L = 0; L < cv.length; L++)
            rr(cv[L], e);
          break;
        case "source":
          rr("error", e);
          break;
        case "img":
        case "image":
        case "link":
          rr("error", e), rr("load", e);
          break;
        case "details":
          rr("toggle", e);
          break;
        case "input":
          Ai(e, l), rr("invalid", e);
          break;
        case "option":
          En(e, l);
          break;
        case "select":
          Vo(e, l), rr("invalid", e);
          break;
        case "textarea":
          up(e, l), rr("invalid", e);
          break;
      }
      lf(n, l);
      {
        R = /* @__PURE__ */ new Set();
        for (var U = e.attributes, te = 0; te < U.length; te++) {
          var J = U[te].name.toLowerCase();
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
              R.add(U[te].name);
          }
        }
      }
      var ve = null;
      for (var ge in l)
        if (l.hasOwnProperty(ge)) {
          var Ee = l[ge];
          if (ge === Lc)
            typeof Ee == "string" ? e.textContent !== Ee && (l[cs] !== !0 && ty(e.textContent, Ee, h, S), ve = [Lc, Ee]) : typeof Ee == "number" && e.textContent !== "" + Ee && (l[cs] !== !0 && ty(e.textContent, Ee, h, S), ve = [Lc, "" + Ee]);
          else if (Pe.hasOwnProperty(ge))
            Ee != null && (typeof Ee != "function" && Jm(ge, Ee), ge === "onScroll" && rr("scroll", e));
          else if (S && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof T == "boolean") {
            var at = void 0, At = Ae(ge);
            if (l[cs] !== !0) {
              if (!(ge === Xm || ge === cs || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              ge === "value" || ge === "checked" || ge === "selected")) {
                if (ge === pv) {
                  var Tt = e.innerHTML, mn = Ee ? Ee[Km] : void 0;
                  if (mn != null) {
                    var fn = F3(e, mn);
                    fn !== Tt && vv(ge, Tt, fn);
                  }
                } else if (ge === Nc) {
                  if (R.delete(ge), j3) {
                    var ce = s1(Ee);
                    at = e.getAttribute("style"), ce !== at && vv(ge, at, ce);
                  }
                } else if (T && !z)
                  R.delete(ge.toLowerCase()), at = Mi(e, ge, Ee), Ee !== at && vv(ge, at, Ee);
                else if (!Kt(ge, At, T) && !ht(ge, Ee, At, T)) {
                  var xe = !1;
                  if (At !== null)
                    R.delete(At.attributeName), at = vr(e, ge, Ee, At);
                  else {
                    var fe = o;
                    if (fe === Cl && (fe = fp(n)), fe === Cl)
                      R.delete(ge.toLowerCase());
                    else {
                      var He = bT(ge);
                      He !== null && He !== ge && (xe = !0, R.delete(He)), R.delete(ge);
                    }
                    at = Mi(e, ge, Ee);
                  }
                  var pt = z;
                  !pt && Ee !== at && !xe && vv(ge, at, Ee);
                }
              }
            }
          }
        }
      switch (S && // $FlowFixMe - Should be inferred as not undefined.
      R.size > 0 && l[cs] !== !0 && U3(R), n) {
        case "input":
          Oi(e), me(e, l, !0);
          break;
        case "textarea":
          Oi(e), Lh(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof l.onClick == "function" && ny(e);
          break;
      }
      return ve;
    }
    function RT(e, n, l) {
      var o = e.nodeValue !== n;
      return o;
    }
    function P1(e, n) {
      {
        if (gi)
          return;
        gi = !0, v("Did not expect server HTML to contain a <%s> in <%s>.", n.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function $1(e, n) {
      {
        if (gi)
          return;
        gi = !0, v('Did not expect server HTML to contain the text node "%s" in <%s>.', n.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function H1(e, n, l) {
      {
        if (gi)
          return;
        gi = !0, v("Expected server HTML to contain a matching <%s> in <%s>.", n, e.nodeName.toLowerCase());
      }
    }
    function V1(e, n) {
      {
        if (n === "" || gi)
          return;
        gi = !0, v('Expected server HTML to contain a matching text node for "%s" in <%s>.', n, e.nodeName.toLowerCase());
      }
    }
    function MT(e, n, l) {
      switch (n) {
        case "input":
          Se(e, l);
          return;
        case "textarea":
          i1(e, l);
          return;
        case "select":
          lp(e, l);
          return;
      }
    }
    var hv = function() {
    }, mv = function() {
    };
    {
      var _T = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], $3 = [
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
      ], kT = $3.concat(["button"]), DT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], H3 = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      mv = function(e, n) {
        var l = Bt({}, e || H3), o = {
          tag: n
        };
        return $3.indexOf(n) !== -1 && (l.aTagInScope = null, l.buttonTagInScope = null, l.nobrTagInScope = null), kT.indexOf(n) !== -1 && (l.pTagInButtonScope = null), _T.indexOf(n) !== -1 && n !== "address" && n !== "div" && n !== "p" && (l.listItemTagAutoclosing = null, l.dlItemTagAutoclosing = null), l.current = o, n === "form" && (l.formTag = o), n === "a" && (l.aTagInScope = o), n === "button" && (l.buttonTagInScope = o), n === "nobr" && (l.nobrTagInScope = o), n === "p" && (l.pTagInButtonScope = o), n === "li" && (l.listItemTagAutoclosing = o), (n === "dd" || n === "dt") && (l.dlItemTagAutoclosing = o), l;
      };
      var OT = function(e, n) {
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
            return DT.indexOf(n) === -1;
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
      }, AT = function(e, n) {
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
      }, V3 = {};
      hv = function(e, n, l) {
        l = l || H3;
        var o = l.current, c = o && o.tag;
        n != null && (e != null && v("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var h = OT(e, c) ? null : o, S = h ? null : AT(e, l), T = h || S;
        if (T) {
          var R = T.tag, L = !!h + "|" + e + "|" + R;
          if (!V3[L]) {
            V3[L] = !0;
            var U = e, te = "";
            if (e === "#text" ? /\S/.test(n) ? U = "Text nodes" : (U = "Whitespace text nodes", te = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : U = "<" + e + ">", h) {
              var J = "";
              R === "table" && e === "tr" && (J += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), v("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", U, R, te, J);
            } else
              v("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", U, R);
          }
        }
      };
    }
    var ry = "suppressHydrationWarning", ay = "$", iy = "/$", yv = "$?", gv = "$!", LT = "style", I1 = null, q1 = null;
    function NT(e) {
      var n, l, o = e.nodeType;
      switch (o) {
        case Tl:
        case pp: {
          n = o === Tl ? "#document" : "#fragment";
          var c = e.documentElement;
          l = c ? c.namespaceURI : dp(null, "");
          break;
        }
        default: {
          var h = o === hr ? e.parentNode : e, S = h.namespaceURI || null;
          n = h.tagName, l = dp(S, n);
          break;
        }
      }
      {
        var T = n.toLowerCase(), R = mv(null, T);
        return {
          namespace: l,
          ancestorInfo: R
        };
      }
    }
    function zT(e, n, l) {
      {
        var o = e, c = dp(o.namespace, n), h = mv(o.ancestorInfo, n);
        return {
          namespace: c,
          ancestorInfo: h
        };
      }
    }
    function rz(e) {
      return e;
    }
    function UT(e) {
      I1 = xr(), q1 = Xb();
      var n = null;
      return Dr(!1), n;
    }
    function jT(e) {
      Kb(q1), Dr(I1), I1 = null, q1 = null;
    }
    function FT(e, n, l, o, c) {
      var h;
      {
        var S = o;
        if (hv(e, null, S.ancestorInfo), typeof n.children == "string" || typeof n.children == "number") {
          var T = "" + n.children, R = mv(S.ancestorInfo, e);
          hv(null, T, R);
        }
        h = S.namespace;
      }
      var L = ST(e, n, l, h);
      return xv(c, L), Z1(L, n), L;
    }
    function PT(e, n) {
      e.appendChild(n);
    }
    function $T(e, n, l, o, c) {
      switch (xT(e, n, l, o), n) {
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
    function HT(e, n, l, o, c, h) {
      {
        var S = h;
        if (typeof o.children != typeof l.children && (typeof o.children == "string" || typeof o.children == "number")) {
          var T = "" + o.children, R = mv(S.ancestorInfo, n);
          hv(null, T, R);
        }
      }
      return wT(e, n, l, o);
    }
    function Y1(e, n) {
      return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
    }
    function VT(e, n, l, o) {
      {
        var c = l;
        hv(null, e, c.ancestorInfo);
      }
      var h = ET(e, n);
      return xv(o, h), h;
    }
    function IT() {
      var e = window.event;
      return e === void 0 ? vi : Jf(e.type);
    }
    var W1 = typeof setTimeout == "function" ? setTimeout : void 0, qT = typeof clearTimeout == "function" ? clearTimeout : void 0, B1 = -1, I3 = typeof Promise == "function" ? Promise : void 0, YT = typeof queueMicrotask == "function" ? queueMicrotask : typeof I3 < "u" ? function(e) {
      return I3.resolve(null).then(e).catch(WT);
    } : W1;
    function WT(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function BT(e, n, l, o) {
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
    function GT(e, n, l, o, c, h) {
      CT(e, n, l, o, c), Z1(e, c);
    }
    function q3(e) {
      Hu(e, "");
    }
    function QT(e, n, l) {
      e.nodeValue = l;
    }
    function XT(e, n) {
      e.appendChild(n);
    }
    function KT(e, n) {
      var l;
      e.nodeType === hr ? (l = e.parentNode, l.insertBefore(n, e)) : (l = e, l.appendChild(n));
      var o = e._reactRootContainer;
      o == null && l.onclick === null && ny(l);
    }
    function ZT(e, n, l) {
      e.insertBefore(n, l);
    }
    function JT(e, n, l) {
      e.nodeType === hr ? e.parentNode.insertBefore(n, l) : e.insertBefore(n, l);
    }
    function eR(e, n) {
      e.removeChild(n);
    }
    function tR(e, n) {
      e.nodeType === hr ? e.parentNode.removeChild(n) : e.removeChild(n);
    }
    function G1(e, n) {
      var l = n, o = 0;
      do {
        var c = l.nextSibling;
        if (e.removeChild(l), c && c.nodeType === hr) {
          var h = c.data;
          if (h === iy)
            if (o === 0) {
              e.removeChild(c), su(n);
              return;
            } else
              o--;
          else (h === ay || h === yv || h === gv) && o++;
        }
        l = c;
      } while (l);
      su(n);
    }
    function nR(e, n) {
      e.nodeType === hr ? G1(e.parentNode, n) : e.nodeType === _a && G1(e, n), su(e);
    }
    function rR(e) {
      e = e;
      var n = e.style;
      typeof n.setProperty == "function" ? n.setProperty("display", "none", "important") : n.display = "none";
    }
    function aR(e) {
      e.nodeValue = "";
    }
    function iR(e, n) {
      e = e;
      var l = n[LT], o = l != null && l.hasOwnProperty("display") ? l.display : null;
      e.style.display = af("display", o);
    }
    function lR(e, n) {
      e.nodeValue = n;
    }
    function oR(e) {
      e.nodeType === _a ? e.textContent = "" : e.nodeType === Tl && e.documentElement && e.removeChild(e.documentElement);
    }
    function uR(e, n, l) {
      return e.nodeType !== _a || n.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function sR(e, n) {
      return n === "" || e.nodeType !== bl ? null : e;
    }
    function cR(e) {
      return e.nodeType !== hr ? null : e;
    }
    function Y3(e) {
      return e.data === yv;
    }
    function Q1(e) {
      return e.data === gv;
    }
    function fR(e) {
      var n = e.nextSibling && e.nextSibling.dataset, l, o, c;
      return n && (l = n.dgst, o = n.msg, c = n.stck), {
        message: o,
        digest: l,
        stack: c
      };
    }
    function dR(e, n) {
      e._reactRetry = n;
    }
    function ly(e) {
      for (; e != null; e = e.nextSibling) {
        var n = e.nodeType;
        if (n === _a || n === bl)
          break;
        if (n === hr) {
          var l = e.data;
          if (l === ay || l === gv || l === yv)
            break;
          if (l === iy)
            return null;
        }
      }
      return e;
    }
    function Sv(e) {
      return ly(e.nextSibling);
    }
    function pR(e) {
      return ly(e.firstChild);
    }
    function vR(e) {
      return ly(e.firstChild);
    }
    function hR(e) {
      return ly(e.nextSibling);
    }
    function mR(e, n, l, o, c, h, S) {
      xv(h, e), Z1(e, l);
      var T;
      {
        var R = c;
        T = R.namespace;
      }
      var L = (h.mode & ln) !== Dt;
      return TT(e, n, l, T, o, L, S);
    }
    function yR(e, n, l, o) {
      return xv(l, e), l.mode & ln, RT(e, n);
    }
    function gR(e, n) {
      xv(n, e);
    }
    function SR(e) {
      for (var n = e.nextSibling, l = 0; n; ) {
        if (n.nodeType === hr) {
          var o = n.data;
          if (o === iy) {
            if (l === 0)
              return Sv(n);
            l--;
          } else (o === ay || o === gv || o === yv) && l++;
        }
        n = n.nextSibling;
      }
      return null;
    }
    function W3(e) {
      for (var n = e.previousSibling, l = 0; n; ) {
        if (n.nodeType === hr) {
          var o = n.data;
          if (o === ay || o === gv || o === yv) {
            if (l === 0)
              return n;
            l--;
          } else o === iy && l++;
        }
        n = n.previousSibling;
      }
      return null;
    }
    function ER(e) {
      su(e);
    }
    function xR(e) {
      su(e);
    }
    function wR(e) {
      return e !== "head" && e !== "body";
    }
    function CR(e, n, l, o) {
      var c = !0;
      ty(n.nodeValue, l, o, c);
    }
    function bR(e, n, l, o, c, h) {
      if (n[ry] !== !0) {
        var S = !0;
        ty(o.nodeValue, c, h, S);
      }
    }
    function TR(e, n) {
      n.nodeType === _a ? P1(e, n) : n.nodeType === hr || $1(e, n);
    }
    function RR(e, n) {
      {
        var l = e.parentNode;
        l !== null && (n.nodeType === _a ? P1(l, n) : n.nodeType === hr || $1(l, n));
      }
    }
    function MR(e, n, l, o, c) {
      (c || n[ry] !== !0) && (o.nodeType === _a ? P1(l, o) : o.nodeType === hr || $1(l, o));
    }
    function _R(e, n, l) {
      H1(e, n);
    }
    function kR(e, n) {
      V1(e, n);
    }
    function DR(e, n, l) {
      {
        var o = e.parentNode;
        o !== null && H1(o, n);
      }
    }
    function OR(e, n) {
      {
        var l = e.parentNode;
        l !== null && V1(l, n);
      }
    }
    function AR(e, n, l, o, c, h) {
      (h || n[ry] !== !0) && H1(l, o);
    }
    function LR(e, n, l, o, c) {
      (c || n[ry] !== !0) && V1(l, o);
    }
    function NR(e) {
      v("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function zR(e) {
      fv(e);
    }
    var pd = Math.random().toString(36).slice(2), vd = "__reactFiber$" + pd, X1 = "__reactProps$" + pd, Ev = "__reactContainer$" + pd, K1 = "__reactEvents$" + pd, UR = "__reactListeners$" + pd, jR = "__reactHandles$" + pd;
    function FR(e) {
      delete e[vd], delete e[X1], delete e[K1], delete e[UR], delete e[jR];
    }
    function xv(e, n) {
      n[vd] = e;
    }
    function oy(e, n) {
      n[Ev] = e;
    }
    function B3(e) {
      e[Ev] = null;
    }
    function wv(e) {
      return !!e[Ev];
    }
    function zc(e) {
      var n = e[vd];
      if (n)
        return n;
      for (var l = e.parentNode; l; ) {
        if (n = l[Ev] || l[vd], n) {
          var o = n.alternate;
          if (n.child !== null || o !== null && o.child !== null)
            for (var c = W3(e); c !== null; ) {
              var h = c[vd];
              if (h)
                return h;
              c = W3(c);
            }
          return n;
        }
        e = l, l = e.parentNode;
      }
      return null;
    }
    function fs(e) {
      var n = e[vd] || e[Ev];
      return n && (n.tag === _ || n.tag === k || n.tag === V || n.tag === b) ? n : null;
    }
    function hd(e) {
      if (e.tag === _ || e.tag === k)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function uy(e) {
      return e[X1] || null;
    }
    function Z1(e, n) {
      e[X1] = n;
    }
    function PR(e) {
      var n = e[K1];
      return n === void 0 && (n = e[K1] = /* @__PURE__ */ new Set()), n;
    }
    var G3 = {}, Q3 = u.ReactDebugCurrentFrame;
    function sy(e) {
      if (e) {
        var n = e._owner, l = El(e.type, e._source, n ? n.type : null);
        Q3.setExtraStackFrame(l);
      } else
        Q3.setExtraStackFrame(null);
    }
    function Ul(e, n, l, o, c) {
      {
        var h = Function.call.bind(Oe);
        for (var S in e)
          if (h(e, S)) {
            var T = void 0;
            try {
              if (typeof e[S] != "function") {
                var R = Error((o || "React class") + ": " + l + " type `" + S + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[S] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw R.name = "Invariant Violation", R;
              }
              T = e[S](n, S, o, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (L) {
              T = L;
            }
            T && !(T instanceof Error) && (sy(c), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", l, S, typeof T), sy(null)), T instanceof Error && !(T.message in G3) && (G3[T.message] = !0, sy(c), v("Failed %s type: %s", l, T.message), sy(null));
          }
      }
    }
    var J1 = [], cy;
    cy = [];
    var hu = -1;
    function ds(e) {
      return {
        current: e
      };
    }
    function Pa(e, n) {
      if (hu < 0) {
        v("Unexpected pop.");
        return;
      }
      n !== cy[hu] && v("Unexpected Fiber popped."), e.current = J1[hu], J1[hu] = null, cy[hu] = null, hu--;
    }
    function $a(e, n, l) {
      hu++, J1[hu] = e.current, cy[hu] = l, e.current = n;
    }
    var eg;
    eg = {};
    var Pi = {};
    Object.freeze(Pi);
    var mu = ds(Pi), To = ds(!1), tg = Pi;
    function md(e, n, l) {
      return l && Ro(n) ? tg : mu.current;
    }
    function X3(e, n, l) {
      {
        var o = e.stateNode;
        o.__reactInternalMemoizedUnmaskedChildContext = n, o.__reactInternalMemoizedMaskedChildContext = l;
      }
    }
    function yd(e, n) {
      {
        var l = e.type, o = l.contextTypes;
        if (!o)
          return Pi;
        var c = e.stateNode;
        if (c && c.__reactInternalMemoizedUnmaskedChildContext === n)
          return c.__reactInternalMemoizedMaskedChildContext;
        var h = {};
        for (var S in o)
          h[S] = n[S];
        {
          var T = Wt(e) || "Unknown";
          Ul(o, h, "context", T);
        }
        return c && X3(e, n, h), h;
      }
    }
    function fy() {
      return To.current;
    }
    function Ro(e) {
      {
        var n = e.childContextTypes;
        return n != null;
      }
    }
    function dy(e) {
      Pa(To, e), Pa(mu, e);
    }
    function ng(e) {
      Pa(To, e), Pa(mu, e);
    }
    function K3(e, n, l) {
      {
        if (mu.current !== Pi)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        $a(mu, n, e), $a(To, l, e);
      }
    }
    function Z3(e, n, l) {
      {
        var o = e.stateNode, c = n.childContextTypes;
        if (typeof o.getChildContext != "function") {
          {
            var h = Wt(e) || "Unknown";
            eg[h] || (eg[h] = !0, v("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", h, h));
          }
          return l;
        }
        var S = o.getChildContext();
        for (var T in S)
          if (!(T in c))
            throw new Error((Wt(e) || "Unknown") + '.getChildContext(): key "' + T + '" is not defined in childContextTypes.');
        {
          var R = Wt(e) || "Unknown";
          Ul(c, S, "child context", R);
        }
        return Bt({}, l, S);
      }
    }
    function py(e) {
      {
        var n = e.stateNode, l = n && n.__reactInternalMemoizedMergedChildContext || Pi;
        return tg = mu.current, $a(mu, l, e), $a(To, To.current, e), !0;
      }
    }
    function J3(e, n, l) {
      {
        var o = e.stateNode;
        if (!o)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (l) {
          var c = Z3(e, n, tg);
          o.__reactInternalMemoizedMergedChildContext = c, Pa(To, e), Pa(mu, e), $a(mu, c, e), $a(To, l, e);
        } else
          Pa(To, e), $a(To, l, e);
      }
    }
    function $R(e) {
      {
        if (!Qo(e) || e.tag !== x)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var n = e;
        do {
          switch (n.tag) {
            case b:
              return n.stateNode.context;
            case x: {
              var l = n.type;
              if (Ro(l))
                return n.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          n = n.return;
        } while (n !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var ps = 0, vy = 1, yu = null, rg = !1, ag = !1;
    function eE(e) {
      yu === null ? yu = [e] : yu.push(e);
    }
    function HR(e) {
      rg = !0, eE(e);
    }
    function tE() {
      rg && vs();
    }
    function vs() {
      if (!ag && yu !== null) {
        ag = !0;
        var e = 0, n = mi();
        try {
          var l = !0, o = yu;
          for (Er(pa); e < o.length; e++) {
            var c = o[e];
            do
              c = c(l);
            while (c !== null);
          }
          yu = null, rg = !1;
        } catch (h) {
          throw yu !== null && (yu = yu.slice(e + 1)), Tp(ec, vs), h;
        } finally {
          Er(n), ag = !1;
        }
      }
      return null;
    }
    var gd = [], Sd = 0, hy = null, my = 0, ul = [], sl = 0, Uc = null, gu = 1, Su = "";
    function VR(e) {
      return Fc(), (e.flags & Zi) !== kt;
    }
    function IR(e) {
      return Fc(), my;
    }
    function qR() {
      var e = Su, n = gu, l = n & ~YR(n);
      return l.toString(32) + e;
    }
    function jc(e, n) {
      Fc(), gd[Sd++] = my, gd[Sd++] = hy, hy = e, my = n;
    }
    function nE(e, n, l) {
      Fc(), ul[sl++] = gu, ul[sl++] = Su, ul[sl++] = Uc, Uc = e;
      var o = gu, c = Su, h = yy(o) - 1, S = o & ~(1 << h), T = l + 1, R = yy(n) + h;
      if (R > 30) {
        var L = h - h % 5, U = (1 << L) - 1, te = (S & U).toString(32), J = S >> L, ve = h - L, ge = yy(n) + ve, Ee = T << ve, at = Ee | J, At = te + c;
        gu = 1 << ge | at, Su = At;
      } else {
        var Tt = T << h, mn = Tt | S, fn = c;
        gu = 1 << R | mn, Su = fn;
      }
    }
    function ig(e) {
      Fc();
      var n = e.return;
      if (n !== null) {
        var l = 1, o = 0;
        jc(e, l), nE(e, l, o);
      }
    }
    function yy(e) {
      return 32 - gr(e);
    }
    function YR(e) {
      return 1 << yy(e) - 1;
    }
    function lg(e) {
      for (; e === hy; )
        hy = gd[--Sd], gd[Sd] = null, my = gd[--Sd], gd[Sd] = null;
      for (; e === Uc; )
        Uc = ul[--sl], ul[sl] = null, Su = ul[--sl], ul[sl] = null, gu = ul[--sl], ul[sl] = null;
    }
    function WR() {
      return Fc(), Uc !== null ? {
        id: gu,
        overflow: Su
      } : null;
    }
    function BR(e, n) {
      Fc(), ul[sl++] = gu, ul[sl++] = Su, ul[sl++] = Uc, gu = n.id, Su = n.overflow, Uc = e;
    }
    function Fc() {
      ga() || v("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var ya = null, cl = null, jl = !1, Pc = !1, hs = null;
    function GR() {
      jl && v("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function rE() {
      Pc = !0;
    }
    function QR() {
      return Pc;
    }
    function XR(e) {
      var n = e.stateNode.containerInfo;
      return cl = vR(n), ya = e, jl = !0, hs = null, Pc = !1, !0;
    }
    function KR(e, n, l) {
      return cl = hR(n), ya = e, jl = !0, hs = null, Pc = !1, l !== null && BR(e, l), !0;
    }
    function aE(e, n) {
      switch (e.tag) {
        case b: {
          TR(e.stateNode.containerInfo, n);
          break;
        }
        case _: {
          var l = (e.mode & ln) !== Dt;
          MR(
            e.type,
            e.memoizedProps,
            e.stateNode,
            n,
            // TODO: Delete this argument when we remove the legacy root API.
            l
          );
          break;
        }
        case V: {
          var o = e.memoizedState;
          o.dehydrated !== null && RR(o.dehydrated, n);
          break;
        }
      }
    }
    function iE(e, n) {
      aE(e, n);
      var l = tD();
      l.stateNode = n, l.return = e;
      var o = e.deletions;
      o === null ? (e.deletions = [l], e.flags |= si) : o.push(l);
    }
    function og(e, n) {
      {
        if (Pc)
          return;
        switch (e.tag) {
          case b: {
            var l = e.stateNode.containerInfo;
            switch (n.tag) {
              case _:
                var o = n.type;
                n.pendingProps, _R(l, o);
                break;
              case k:
                var c = n.pendingProps;
                kR(l, c);
                break;
            }
            break;
          }
          case _: {
            var h = e.type, S = e.memoizedProps, T = e.stateNode;
            switch (n.tag) {
              case _: {
                var R = n.type, L = n.pendingProps, U = (e.mode & ln) !== Dt;
                AR(
                  h,
                  S,
                  T,
                  R,
                  L,
                  // TODO: Delete this argument when we remove the legacy root API.
                  U
                );
                break;
              }
              case k: {
                var te = n.pendingProps, J = (e.mode & ln) !== Dt;
                LR(
                  h,
                  S,
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
          case V: {
            var ve = e.memoizedState, ge = ve.dehydrated;
            if (ge !== null) switch (n.tag) {
              case _:
                var Ee = n.type;
                n.pendingProps, DR(ge, Ee);
                break;
              case k:
                var at = n.pendingProps;
                OR(ge, at);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function lE(e, n) {
      n.flags = n.flags & ~Da | er, og(e, n);
    }
    function oE(e, n) {
      switch (e.tag) {
        case _: {
          var l = e.type;
          e.pendingProps;
          var o = uR(n, l);
          return o !== null ? (e.stateNode = o, ya = e, cl = pR(o), !0) : !1;
        }
        case k: {
          var c = e.pendingProps, h = sR(n, c);
          return h !== null ? (e.stateNode = h, ya = e, cl = null, !0) : !1;
        }
        case V: {
          var S = cR(n);
          if (S !== null) {
            var T = {
              dehydrated: S,
              treeContext: WR(),
              retryLane: Na
            };
            e.memoizedState = T;
            var R = nD(S);
            return R.return = e, e.child = R, ya = e, cl = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function ug(e) {
      return (e.mode & ln) !== Dt && (e.flags & _t) === kt;
    }
    function sg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function cg(e) {
      if (jl) {
        var n = cl;
        if (!n) {
          ug(e) && (og(ya, e), sg()), lE(ya, e), jl = !1, ya = e;
          return;
        }
        var l = n;
        if (!oE(e, n)) {
          ug(e) && (og(ya, e), sg()), n = Sv(l);
          var o = ya;
          if (!n || !oE(e, n)) {
            lE(ya, e), jl = !1, ya = e;
            return;
          }
          iE(o, l);
        }
      }
    }
    function ZR(e, n, l) {
      var o = e.stateNode, c = !Pc, h = mR(o, e.type, e.memoizedProps, n, l, e, c);
      return e.updateQueue = h, h !== null;
    }
    function JR(e) {
      var n = e.stateNode, l = e.memoizedProps, o = yR(n, l, e);
      if (o) {
        var c = ya;
        if (c !== null)
          switch (c.tag) {
            case b: {
              var h = c.stateNode.containerInfo, S = (c.mode & ln) !== Dt;
              CR(
                h,
                n,
                l,
                // TODO: Delete this argument when we remove the legacy root API.
                S
              );
              break;
            }
            case _: {
              var T = c.type, R = c.memoizedProps, L = c.stateNode, U = (c.mode & ln) !== Dt;
              bR(
                T,
                R,
                L,
                n,
                l,
                // TODO: Delete this argument when we remove the legacy root API.
                U
              );
              break;
            }
          }
      }
      return o;
    }
    function eM(e) {
      var n = e.memoizedState, l = n !== null ? n.dehydrated : null;
      if (!l)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      gR(l, e);
    }
    function tM(e) {
      var n = e.memoizedState, l = n !== null ? n.dehydrated : null;
      if (!l)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return SR(l);
    }
    function uE(e) {
      for (var n = e.return; n !== null && n.tag !== _ && n.tag !== b && n.tag !== V; )
        n = n.return;
      ya = n;
    }
    function gy(e) {
      if (e !== ya)
        return !1;
      if (!jl)
        return uE(e), jl = !0, !1;
      if (e.tag !== b && (e.tag !== _ || wR(e.type) && !Y1(e.type, e.memoizedProps))) {
        var n = cl;
        if (n)
          if (ug(e))
            sE(e), sg();
          else
            for (; n; )
              iE(e, n), n = Sv(n);
      }
      return uE(e), e.tag === V ? cl = tM(e) : cl = ya ? Sv(e.stateNode) : null, !0;
    }
    function nM() {
      return jl && cl !== null;
    }
    function sE(e) {
      for (var n = cl; n; )
        aE(e, n), n = Sv(n);
    }
    function Ed() {
      ya = null, cl = null, jl = !1, Pc = !1;
    }
    function cE() {
      hs !== null && (rw(hs), hs = null);
    }
    function ga() {
      return jl;
    }
    function fg(e) {
      hs === null ? hs = [e] : hs.push(e);
    }
    var rM = u.ReactCurrentBatchConfig, aM = null;
    function iM() {
      return rM.transition;
    }
    var Fl = {
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
      var lM = function(e) {
        for (var n = null, l = e; l !== null; )
          l.mode & Nn && (n = l), l = l.return;
        return n;
      }, $c = function(e) {
        var n = [];
        return e.forEach(function(l) {
          n.push(l);
        }), n.sort().join(", ");
      }, Cv = [], bv = [], Tv = [], Rv = [], Mv = [], _v = [], Hc = /* @__PURE__ */ new Set();
      Fl.recordUnsafeLifecycleWarnings = function(e, n) {
        Hc.has(e.type) || (typeof n.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        n.componentWillMount.__suppressDeprecationWarning !== !0 && Cv.push(e), e.mode & Nn && typeof n.UNSAFE_componentWillMount == "function" && bv.push(e), typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Tv.push(e), e.mode & Nn && typeof n.UNSAFE_componentWillReceiveProps == "function" && Rv.push(e), typeof n.componentWillUpdate == "function" && n.componentWillUpdate.__suppressDeprecationWarning !== !0 && Mv.push(e), e.mode & Nn && typeof n.UNSAFE_componentWillUpdate == "function" && _v.push(e));
      }, Fl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Cv.length > 0 && (Cv.forEach(function(J) {
          e.add(Wt(J) || "Component"), Hc.add(J.type);
        }), Cv = []);
        var n = /* @__PURE__ */ new Set();
        bv.length > 0 && (bv.forEach(function(J) {
          n.add(Wt(J) || "Component"), Hc.add(J.type);
        }), bv = []);
        var l = /* @__PURE__ */ new Set();
        Tv.length > 0 && (Tv.forEach(function(J) {
          l.add(Wt(J) || "Component"), Hc.add(J.type);
        }), Tv = []);
        var o = /* @__PURE__ */ new Set();
        Rv.length > 0 && (Rv.forEach(function(J) {
          o.add(Wt(J) || "Component"), Hc.add(J.type);
        }), Rv = []);
        var c = /* @__PURE__ */ new Set();
        Mv.length > 0 && (Mv.forEach(function(J) {
          c.add(Wt(J) || "Component"), Hc.add(J.type);
        }), Mv = []);
        var h = /* @__PURE__ */ new Set();
        if (_v.length > 0 && (_v.forEach(function(J) {
          h.add(Wt(J) || "Component"), Hc.add(J.type);
        }), _v = []), n.size > 0) {
          var S = $c(n);
          v(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, S);
        }
        if (o.size > 0) {
          var T = $c(o);
          v(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, T);
        }
        if (h.size > 0) {
          var R = $c(h);
          v(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, R);
        }
        if (e.size > 0) {
          var L = $c(e);
          m(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, L);
        }
        if (l.size > 0) {
          var U = $c(l);
          m(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, U);
        }
        if (c.size > 0) {
          var te = $c(c);
          m(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, te);
        }
      };
      var Sy = /* @__PURE__ */ new Map(), fE = /* @__PURE__ */ new Set();
      Fl.recordLegacyContextWarning = function(e, n) {
        var l = lM(e);
        if (l === null) {
          v("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!fE.has(e.type)) {
          var o = Sy.get(l);
          (e.type.contextTypes != null || e.type.childContextTypes != null || n !== null && typeof n.getChildContext == "function") && (o === void 0 && (o = [], Sy.set(l, o)), o.push(e));
        }
      }, Fl.flushLegacyContextWarning = function() {
        Sy.forEach(function(e, n) {
          if (e.length !== 0) {
            var l = e[0], o = /* @__PURE__ */ new Set();
            e.forEach(function(h) {
              o.add(Wt(h) || "Component"), fE.add(h.type);
            });
            var c = $c(o);
            try {
              On(l), v(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, c);
            } finally {
              qn();
            }
          }
        });
      }, Fl.discardPendingWarnings = function() {
        Cv = [], bv = [], Tv = [], Rv = [], Mv = [], _v = [], Sy = /* @__PURE__ */ new Map();
      };
    }
    var dg, pg, vg, hg, mg, dE = function(e, n) {
    };
    dg = !1, pg = !1, vg = {}, hg = {}, mg = {}, dE = function(e, n) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var l = Wt(n) || "Component";
        hg[l] || (hg[l] = !0, v('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function oM(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function kv(e, n, l) {
      var o = l.ref;
      if (o !== null && typeof o != "function" && typeof o != "object") {
        if ((e.mode & Nn || Z) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(l._owner && l._self && l._owner.stateNode !== l._self) && // Will already throw with "Function components cannot have string refs"
        !(l._owner && l._owner.tag !== x) && // Will already warn with "Function components cannot be given refs"
        !(typeof l.type == "function" && !oM(l.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        l._owner) {
          var c = Wt(e) || "Component";
          vg[c] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', c, o), vg[c] = !0);
        }
        if (l._owner) {
          var h = l._owner, S;
          if (h) {
            var T = h;
            if (T.tag !== x)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            S = T.stateNode;
          }
          if (!S)
            throw new Error("Missing owner for string ref " + o + ". This error is likely caused by a bug in React. Please file an issue.");
          var R = S;
          ut(o, "ref");
          var L = "" + o;
          if (n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === L)
            return n.ref;
          var U = function(te) {
            var J = R.refs;
            te === null ? delete J[L] : J[L] = te;
          };
          return U._stringRef = L, U;
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
    function Ey(e, n) {
      var l = Object.prototype.toString.call(n);
      throw new Error("Objects are not valid as a React child (found: " + (l === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : l) + "). If you meant to render a collection of children, use an array instead.");
    }
    function xy(e) {
      {
        var n = Wt(e) || "Component";
        if (mg[n])
          return;
        mg[n] = !0, v("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function pE(e) {
      var n = e._payload, l = e._init;
      return l(n);
    }
    function vE(e) {
      function n(ce, xe) {
        if (e) {
          var fe = ce.deletions;
          fe === null ? (ce.deletions = [xe], ce.flags |= si) : fe.push(xe);
        }
      }
      function l(ce, xe) {
        if (!e)
          return null;
        for (var fe = xe; fe !== null; )
          n(ce, fe), fe = fe.sibling;
        return null;
      }
      function o(ce, xe) {
        for (var fe = /* @__PURE__ */ new Map(), He = xe; He !== null; )
          He.key !== null ? fe.set(He.key, He) : fe.set(He.index, He), He = He.sibling;
        return fe;
      }
      function c(ce, xe) {
        var fe = Xc(ce, xe);
        return fe.index = 0, fe.sibling = null, fe;
      }
      function h(ce, xe, fe) {
        if (ce.index = fe, !e)
          return ce.flags |= Zi, xe;
        var He = ce.alternate;
        if (He !== null) {
          var pt = He.index;
          return pt < xe ? (ce.flags |= er, xe) : pt;
        } else
          return ce.flags |= er, xe;
      }
      function S(ce) {
        return e && ce.alternate === null && (ce.flags |= er), ce;
      }
      function T(ce, xe, fe, He) {
        if (xe === null || xe.tag !== k) {
          var pt = f2(fe, ce.mode, He);
          return pt.return = ce, pt;
        } else {
          var lt = c(xe, fe);
          return lt.return = ce, lt;
        }
      }
      function R(ce, xe, fe, He) {
        var pt = fe.type;
        if (pt === Ra)
          return U(ce, xe, fe.props.children, He, fe.key);
        if (xe !== null && (xe.elementType === pt || // Keep this check inline so it only runs on the false path:
        Sw(xe, fe) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof pt == "object" && pt !== null && pt.$$typeof === Ht && pE(pt) === xe.type)) {
          var lt = c(xe, fe.props);
          return lt.ref = kv(ce, xe, fe), lt.return = ce, lt._debugSource = fe._source, lt._debugOwner = fe._owner, lt;
        }
        var Vt = c2(fe, ce.mode, He);
        return Vt.ref = kv(ce, xe, fe), Vt.return = ce, Vt;
      }
      function L(ce, xe, fe, He) {
        if (xe === null || xe.tag !== M || xe.stateNode.containerInfo !== fe.containerInfo || xe.stateNode.implementation !== fe.implementation) {
          var pt = d2(fe, ce.mode, He);
          return pt.return = ce, pt;
        } else {
          var lt = c(xe, fe.children || []);
          return lt.return = ce, lt;
        }
      }
      function U(ce, xe, fe, He, pt) {
        if (xe === null || xe.tag !== A) {
          var lt = Rs(fe, ce.mode, He, pt);
          return lt.return = ce, lt;
        } else {
          var Vt = c(xe, fe);
          return Vt.return = ce, Vt;
        }
      }
      function te(ce, xe, fe) {
        if (typeof xe == "string" && xe !== "" || typeof xe == "number") {
          var He = f2("" + xe, ce.mode, fe);
          return He.return = ce, He;
        }
        if (typeof xe == "object" && xe !== null) {
          switch (xe.$$typeof) {
            case Ar: {
              var pt = c2(xe, ce.mode, fe);
              return pt.ref = kv(ce, null, xe), pt.return = ce, pt;
            }
            case Vn: {
              var lt = d2(xe, ce.mode, fe);
              return lt.return = ce, lt;
            }
            case Ht: {
              var Vt = xe._payload, Qt = xe._init;
              return te(ce, Qt(Vt), fe);
            }
          }
          if (rn(xe) || qt(xe)) {
            var Un = Rs(xe, ce.mode, fe, null);
            return Un.return = ce, Un;
          }
          Ey(ce, xe);
        }
        return typeof xe == "function" && xy(ce), null;
      }
      function J(ce, xe, fe, He) {
        var pt = xe !== null ? xe.key : null;
        if (typeof fe == "string" && fe !== "" || typeof fe == "number")
          return pt !== null ? null : T(ce, xe, "" + fe, He);
        if (typeof fe == "object" && fe !== null) {
          switch (fe.$$typeof) {
            case Ar:
              return fe.key === pt ? R(ce, xe, fe, He) : null;
            case Vn:
              return fe.key === pt ? L(ce, xe, fe, He) : null;
            case Ht: {
              var lt = fe._payload, Vt = fe._init;
              return J(ce, xe, Vt(lt), He);
            }
          }
          if (rn(fe) || qt(fe))
            return pt !== null ? null : U(ce, xe, fe, He, null);
          Ey(ce, fe);
        }
        return typeof fe == "function" && xy(ce), null;
      }
      function ve(ce, xe, fe, He, pt) {
        if (typeof He == "string" && He !== "" || typeof He == "number") {
          var lt = ce.get(fe) || null;
          return T(xe, lt, "" + He, pt);
        }
        if (typeof He == "object" && He !== null) {
          switch (He.$$typeof) {
            case Ar: {
              var Vt = ce.get(He.key === null ? fe : He.key) || null;
              return R(xe, Vt, He, pt);
            }
            case Vn: {
              var Qt = ce.get(He.key === null ? fe : He.key) || null;
              return L(xe, Qt, He, pt);
            }
            case Ht:
              var Un = He._payload, Mn = He._init;
              return ve(ce, xe, fe, Mn(Un), pt);
          }
          if (rn(He) || qt(He)) {
            var Or = ce.get(fe) || null;
            return U(xe, Or, He, pt, null);
          }
          Ey(xe, He);
        }
        return typeof He == "function" && xy(xe), null;
      }
      function ge(ce, xe, fe) {
        {
          if (typeof ce != "object" || ce === null)
            return xe;
          switch (ce.$$typeof) {
            case Ar:
            case Vn:
              dE(ce, fe);
              var He = ce.key;
              if (typeof He != "string")
                break;
              if (xe === null) {
                xe = /* @__PURE__ */ new Set(), xe.add(He);
                break;
              }
              if (!xe.has(He)) {
                xe.add(He);
                break;
              }
              v("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", He);
              break;
            case Ht:
              var pt = ce._payload, lt = ce._init;
              ge(lt(pt), xe, fe);
              break;
          }
        }
        return xe;
      }
      function Ee(ce, xe, fe, He) {
        for (var pt = null, lt = 0; lt < fe.length; lt++) {
          var Vt = fe[lt];
          pt = ge(Vt, pt, ce);
        }
        for (var Qt = null, Un = null, Mn = xe, Or = 0, _n = 0, Cr = null; Mn !== null && _n < fe.length; _n++) {
          Mn.index > _n ? (Cr = Mn, Mn = null) : Cr = Mn.sibling;
          var Va = J(ce, Mn, fe[_n], He);
          if (Va === null) {
            Mn === null && (Mn = Cr);
            break;
          }
          e && Mn && Va.alternate === null && n(ce, Mn), Or = h(Va, Or, _n), Un === null ? Qt = Va : Un.sibling = Va, Un = Va, Mn = Cr;
        }
        if (_n === fe.length) {
          if (l(ce, Mn), ga()) {
            var Ta = _n;
            jc(ce, Ta);
          }
          return Qt;
        }
        if (Mn === null) {
          for (; _n < fe.length; _n++) {
            var Hi = te(ce, fe[_n], He);
            Hi !== null && (Or = h(Hi, Or, _n), Un === null ? Qt = Hi : Un.sibling = Hi, Un = Hi);
          }
          if (ga()) {
            var ti = _n;
            jc(ce, ti);
          }
          return Qt;
        }
        for (var ni = o(ce, Mn); _n < fe.length; _n++) {
          var Ia = ve(ni, ce, _n, fe[_n], He);
          Ia !== null && (e && Ia.alternate !== null && ni.delete(Ia.key === null ? _n : Ia.key), Or = h(Ia, Or, _n), Un === null ? Qt = Ia : Un.sibling = Ia, Un = Ia);
        }
        if (e && ni.forEach(function(Pd) {
          return n(ce, Pd);
        }), ga()) {
          var Ru = _n;
          jc(ce, Ru);
        }
        return Qt;
      }
      function at(ce, xe, fe, He) {
        var pt = qt(fe);
        if (typeof pt != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          fe[Symbol.toStringTag] === "Generator" && (pg || v("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), pg = !0), fe.entries === pt && (dg || v("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), dg = !0);
          var lt = pt.call(fe);
          if (lt)
            for (var Vt = null, Qt = lt.next(); !Qt.done; Qt = lt.next()) {
              var Un = Qt.value;
              Vt = ge(Un, Vt, ce);
            }
        }
        var Mn = pt.call(fe);
        if (Mn == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Or = null, _n = null, Cr = xe, Va = 0, Ta = 0, Hi = null, ti = Mn.next(); Cr !== null && !ti.done; Ta++, ti = Mn.next()) {
          Cr.index > Ta ? (Hi = Cr, Cr = null) : Hi = Cr.sibling;
          var ni = J(ce, Cr, ti.value, He);
          if (ni === null) {
            Cr === null && (Cr = Hi);
            break;
          }
          e && Cr && ni.alternate === null && n(ce, Cr), Va = h(ni, Va, Ta), _n === null ? Or = ni : _n.sibling = ni, _n = ni, Cr = Hi;
        }
        if (ti.done) {
          if (l(ce, Cr), ga()) {
            var Ia = Ta;
            jc(ce, Ia);
          }
          return Or;
        }
        if (Cr === null) {
          for (; !ti.done; Ta++, ti = Mn.next()) {
            var Ru = te(ce, ti.value, He);
            Ru !== null && (Va = h(Ru, Va, Ta), _n === null ? Or = Ru : _n.sibling = Ru, _n = Ru);
          }
          if (ga()) {
            var Pd = Ta;
            jc(ce, Pd);
          }
          return Or;
        }
        for (var oh = o(ce, Cr); !ti.done; Ta++, ti = Mn.next()) {
          var No = ve(oh, ce, Ta, ti.value, He);
          No !== null && (e && No.alternate !== null && oh.delete(No.key === null ? Ta : No.key), Va = h(No, Va, Ta), _n === null ? Or = No : _n.sibling = No, _n = No);
        }
        if (e && oh.forEach(function(LD) {
          return n(ce, LD);
        }), ga()) {
          var AD = Ta;
          jc(ce, AD);
        }
        return Or;
      }
      function At(ce, xe, fe, He) {
        if (xe !== null && xe.tag === k) {
          l(ce, xe.sibling);
          var pt = c(xe, fe);
          return pt.return = ce, pt;
        }
        l(ce, xe);
        var lt = f2(fe, ce.mode, He);
        return lt.return = ce, lt;
      }
      function Tt(ce, xe, fe, He) {
        for (var pt = fe.key, lt = xe; lt !== null; ) {
          if (lt.key === pt) {
            var Vt = fe.type;
            if (Vt === Ra) {
              if (lt.tag === A) {
                l(ce, lt.sibling);
                var Qt = c(lt, fe.props.children);
                return Qt.return = ce, Qt._debugSource = fe._source, Qt._debugOwner = fe._owner, Qt;
              }
            } else if (lt.elementType === Vt || // Keep this check inline so it only runs on the false path:
            Sw(lt, fe) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof Vt == "object" && Vt !== null && Vt.$$typeof === Ht && pE(Vt) === lt.type) {
              l(ce, lt.sibling);
              var Un = c(lt, fe.props);
              return Un.ref = kv(ce, lt, fe), Un.return = ce, Un._debugSource = fe._source, Un._debugOwner = fe._owner, Un;
            }
            l(ce, lt);
            break;
          } else
            n(ce, lt);
          lt = lt.sibling;
        }
        if (fe.type === Ra) {
          var Mn = Rs(fe.props.children, ce.mode, He, fe.key);
          return Mn.return = ce, Mn;
        } else {
          var Or = c2(fe, ce.mode, He);
          return Or.ref = kv(ce, xe, fe), Or.return = ce, Or;
        }
      }
      function mn(ce, xe, fe, He) {
        for (var pt = fe.key, lt = xe; lt !== null; ) {
          if (lt.key === pt)
            if (lt.tag === M && lt.stateNode.containerInfo === fe.containerInfo && lt.stateNode.implementation === fe.implementation) {
              l(ce, lt.sibling);
              var Vt = c(lt, fe.children || []);
              return Vt.return = ce, Vt;
            } else {
              l(ce, lt);
              break;
            }
          else
            n(ce, lt);
          lt = lt.sibling;
        }
        var Qt = d2(fe, ce.mode, He);
        return Qt.return = ce, Qt;
      }
      function fn(ce, xe, fe, He) {
        var pt = typeof fe == "object" && fe !== null && fe.type === Ra && fe.key === null;
        if (pt && (fe = fe.props.children), typeof fe == "object" && fe !== null) {
          switch (fe.$$typeof) {
            case Ar:
              return S(Tt(ce, xe, fe, He));
            case Vn:
              return S(mn(ce, xe, fe, He));
            case Ht:
              var lt = fe._payload, Vt = fe._init;
              return fn(ce, xe, Vt(lt), He);
          }
          if (rn(fe))
            return Ee(ce, xe, fe, He);
          if (qt(fe))
            return at(ce, xe, fe, He);
          Ey(ce, fe);
        }
        return typeof fe == "string" && fe !== "" || typeof fe == "number" ? S(At(ce, xe, "" + fe, He)) : (typeof fe == "function" && xy(ce), l(ce, xe));
      }
      return fn;
    }
    var xd = vE(!0), hE = vE(!1);
    function uM(e, n) {
      if (e !== null && n.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (n.child !== null) {
        var l = n.child, o = Xc(l, l.pendingProps);
        for (n.child = o, o.return = n; l.sibling !== null; )
          l = l.sibling, o = o.sibling = Xc(l, l.pendingProps), o.return = n;
        o.sibling = null;
      }
    }
    function sM(e, n) {
      for (var l = e.child; l !== null; )
        Xk(l, n), l = l.sibling;
    }
    var yg = ds(null), gg;
    gg = {};
    var wy = null, wd = null, Sg = null, Cy = !1;
    function by() {
      wy = null, wd = null, Sg = null, Cy = !1;
    }
    function mE() {
      Cy = !0;
    }
    function yE() {
      Cy = !1;
    }
    function gE(e, n, l) {
      $a(yg, n._currentValue, e), n._currentValue = l, n._currentRenderer !== void 0 && n._currentRenderer !== null && n._currentRenderer !== gg && v("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), n._currentRenderer = gg;
    }
    function Eg(e, n) {
      var l = yg.current;
      Pa(yg, n), e._currentValue = l;
    }
    function xg(e, n, l) {
      for (var o = e; o !== null; ) {
        var c = o.alternate;
        if (uu(o.childLanes, n) ? c !== null && !uu(c.childLanes, n) && (c.childLanes = en(c.childLanes, n)) : (o.childLanes = en(o.childLanes, n), c !== null && (c.childLanes = en(c.childLanes, n))), o === l)
          break;
        o = o.return;
      }
      o !== l && v("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function cM(e, n, l) {
      fM(e, n, l);
    }
    function fM(e, n, l) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var c = void 0, h = o.dependencies;
        if (h !== null) {
          c = o.child;
          for (var S = h.firstContext; S !== null; ) {
            if (S.context === n) {
              if (o.tag === x) {
                var T = vc(l), R = Eu(jn, T);
                R.tag = Ry;
                var L = o.updateQueue;
                if (L !== null) {
                  var U = L.shared, te = U.pending;
                  te === null ? R.next = R : (R.next = te.next, te.next = R), U.pending = R;
                }
              }
              o.lanes = en(o.lanes, l);
              var J = o.alternate;
              J !== null && (J.lanes = en(J.lanes, l)), xg(o.return, l, e), h.lanes = en(h.lanes, l);
              break;
            }
            S = S.next;
          }
        } else if (o.tag === W)
          c = o.type === e.type ? null : o.child;
        else if (o.tag === $) {
          var ve = o.return;
          if (ve === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          ve.lanes = en(ve.lanes, l);
          var ge = ve.alternate;
          ge !== null && (ge.lanes = en(ge.lanes, l)), xg(ve, l, e), c = o.sibling;
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
            var Ee = c.sibling;
            if (Ee !== null) {
              Ee.return = c.return, c = Ee;
              break;
            }
            c = c.return;
          }
        o = c;
      }
    }
    function Cd(e, n) {
      wy = e, wd = null, Sg = null;
      var l = e.dependencies;
      if (l !== null) {
        var o = l.firstContext;
        o !== null && (za(l.lanes, n) && qv(), l.firstContext = null);
      }
    }
    function Fr(e) {
      Cy && v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var n = e._currentValue;
      if (Sg !== e) {
        var l = {
          context: e,
          memoizedValue: n,
          next: null
        };
        if (wd === null) {
          if (wy === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          wd = l, wy.dependencies = {
            lanes: Le,
            firstContext: l
          };
        } else
          wd = wd.next = l;
      }
      return n;
    }
    var Vc = null;
    function wg(e) {
      Vc === null ? Vc = [e] : Vc.push(e);
    }
    function dM() {
      if (Vc !== null) {
        for (var e = 0; e < Vc.length; e++) {
          var n = Vc[e], l = n.interleaved;
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
        Vc = null;
      }
    }
    function SE(e, n, l, o) {
      var c = n.interleaved;
      return c === null ? (l.next = l, wg(n)) : (l.next = c.next, c.next = l), n.interleaved = l, Ty(e, o);
    }
    function pM(e, n, l, o) {
      var c = n.interleaved;
      c === null ? (l.next = l, wg(n)) : (l.next = c.next, c.next = l), n.interleaved = l;
    }
    function vM(e, n, l, o) {
      var c = n.interleaved;
      return c === null ? (l.next = l, wg(n)) : (l.next = c.next, c.next = l), n.interleaved = l, Ty(e, o);
    }
    function Si(e, n) {
      return Ty(e, n);
    }
    var hM = Ty;
    function Ty(e, n) {
      e.lanes = en(e.lanes, n);
      var l = e.alternate;
      l !== null && (l.lanes = en(l.lanes, n)), l === null && (e.flags & (er | Da)) !== kt && hw(e);
      for (var o = e, c = e.return; c !== null; )
        c.childLanes = en(c.childLanes, n), l = c.alternate, l !== null ? l.childLanes = en(l.childLanes, n) : (c.flags & (er | Da)) !== kt && hw(e), o = c, c = c.return;
      if (o.tag === b) {
        var h = o.stateNode;
        return h;
      } else
        return null;
    }
    var EE = 0, xE = 1, Ry = 2, Cg = 3, My = !1, bg, _y;
    bg = !1, _y = null;
    function Tg(e) {
      var n = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: Le
        },
        effects: null
      };
      e.updateQueue = n;
    }
    function wE(e, n) {
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
    function Eu(e, n) {
      var l = {
        eventTime: e,
        lane: n,
        tag: EE,
        payload: null,
        callback: null,
        next: null
      };
      return l;
    }
    function ms(e, n, l) {
      var o = e.updateQueue;
      if (o === null)
        return null;
      var c = o.shared;
      if (_y === c && !bg && (v("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), bg = !0), pk()) {
        var h = c.pending;
        return h === null ? n.next = n : (n.next = h.next, h.next = n), c.pending = n, hM(e, l);
      } else
        return vM(e, c, n, l);
    }
    function ky(e, n, l) {
      var o = n.updateQueue;
      if (o !== null) {
        var c = o.shared;
        if (Vp(l)) {
          var h = c.lanes;
          h = qp(h, e.pendingLanes);
          var S = en(h, l);
          c.lanes = S, Qf(e, S);
        }
      }
    }
    function Rg(e, n) {
      var l = e.updateQueue, o = e.alternate;
      if (o !== null) {
        var c = o.updateQueue;
        if (l === c) {
          var h = null, S = null, T = l.firstBaseUpdate;
          if (T !== null) {
            var R = T;
            do {
              var L = {
                eventTime: R.eventTime,
                lane: R.lane,
                tag: R.tag,
                payload: R.payload,
                callback: R.callback,
                next: null
              };
              S === null ? h = S = L : (S.next = L, S = L), R = R.next;
            } while (R !== null);
            S === null ? h = S = n : (S.next = n, S = n);
          } else
            h = S = n;
          l = {
            baseState: c.baseState,
            firstBaseUpdate: h,
            lastBaseUpdate: S,
            shared: c.shared,
            effects: c.effects
          }, e.updateQueue = l;
          return;
        }
      }
      var U = l.lastBaseUpdate;
      U === null ? l.firstBaseUpdate = n : U.next = n, l.lastBaseUpdate = n;
    }
    function mM(e, n, l, o, c, h) {
      switch (l.tag) {
        case xE: {
          var S = l.payload;
          if (typeof S == "function") {
            mE();
            var T = S.call(h, o, c);
            {
              if (e.mode & Nn) {
                tr(!0);
                try {
                  S.call(h, o, c);
                } finally {
                  tr(!1);
                }
              }
              yE();
            }
            return T;
          }
          return S;
        }
        case Cg:
          e.flags = e.flags & ~Nr | _t;
        // Intentional fallthrough
        case EE: {
          var R = l.payload, L;
          if (typeof R == "function") {
            mE(), L = R.call(h, o, c);
            {
              if (e.mode & Nn) {
                tr(!0);
                try {
                  R.call(h, o, c);
                } finally {
                  tr(!1);
                }
              }
              yE();
            }
          } else
            L = R;
          return L == null ? o : Bt({}, o, L);
        }
        case Ry:
          return My = !0, o;
      }
      return o;
    }
    function Dy(e, n, l, o) {
      var c = e.updateQueue;
      My = !1, _y = c.shared;
      var h = c.firstBaseUpdate, S = c.lastBaseUpdate, T = c.shared.pending;
      if (T !== null) {
        c.shared.pending = null;
        var R = T, L = R.next;
        R.next = null, S === null ? h = L : S.next = L, S = R;
        var U = e.alternate;
        if (U !== null) {
          var te = U.updateQueue, J = te.lastBaseUpdate;
          J !== S && (J === null ? te.firstBaseUpdate = L : J.next = L, te.lastBaseUpdate = R);
        }
      }
      if (h !== null) {
        var ve = c.baseState, ge = Le, Ee = null, at = null, At = null, Tt = h;
        do {
          var mn = Tt.lane, fn = Tt.eventTime;
          if (uu(o, mn)) {
            if (At !== null) {
              var xe = {
                eventTime: fn,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: wn,
                tag: Tt.tag,
                payload: Tt.payload,
                callback: Tt.callback,
                next: null
              };
              At = At.next = xe;
            }
            ve = mM(e, c, Tt, ve, n, l);
            var fe = Tt.callback;
            if (fe !== null && // If the update was already committed, we should not queue its
            // callback again.
            Tt.lane !== wn) {
              e.flags |= Pn;
              var He = c.effects;
              He === null ? c.effects = [Tt] : He.push(Tt);
            }
          } else {
            var ce = {
              eventTime: fn,
              lane: mn,
              tag: Tt.tag,
              payload: Tt.payload,
              callback: Tt.callback,
              next: null
            };
            At === null ? (at = At = ce, Ee = ve) : At = At.next = ce, ge = en(ge, mn);
          }
          if (Tt = Tt.next, Tt === null) {
            if (T = c.shared.pending, T === null)
              break;
            var pt = T, lt = pt.next;
            pt.next = null, Tt = lt, c.lastBaseUpdate = pt, c.shared.pending = null;
          }
        } while (!0);
        At === null && (Ee = ve), c.baseState = Ee, c.firstBaseUpdate = at, c.lastBaseUpdate = At;
        var Vt = c.shared.interleaved;
        if (Vt !== null) {
          var Qt = Vt;
          do
            ge = en(ge, Qt.lane), Qt = Qt.next;
          while (Qt !== Vt);
        } else h === null && (c.shared.lanes = Le);
        nh(ge), e.lanes = ge, e.memoizedState = ve;
      }
      _y = null;
    }
    function yM(e, n) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(n);
    }
    function CE() {
      My = !1;
    }
    function Oy() {
      return My;
    }
    function bE(e, n, l) {
      var o = n.effects;
      if (n.effects = null, o !== null)
        for (var c = 0; c < o.length; c++) {
          var h = o[c], S = h.callback;
          S !== null && (h.callback = null, yM(S, l));
        }
    }
    var Dv = {}, ys = ds(Dv), Ov = ds(Dv), Ay = ds(Dv);
    function Ly(e) {
      if (e === Dv)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function TE() {
      var e = Ly(Ay.current);
      return e;
    }
    function Mg(e, n) {
      $a(Ay, n, e), $a(Ov, e, e), $a(ys, Dv, e);
      var l = NT(n);
      Pa(ys, e), $a(ys, l, e);
    }
    function bd(e) {
      Pa(ys, e), Pa(Ov, e), Pa(Ay, e);
    }
    function _g() {
      var e = Ly(ys.current);
      return e;
    }
    function RE(e) {
      Ly(Ay.current);
      var n = Ly(ys.current), l = zT(n, e.type);
      n !== l && ($a(Ov, e, e), $a(ys, l, e));
    }
    function kg(e) {
      Ov.current === e && (Pa(ys, e), Pa(Ov, e));
    }
    var gM = 0, ME = 1, _E = 1, Av = 2, Pl = ds(gM);
    function Dg(e, n) {
      return (e & n) !== 0;
    }
    function Td(e) {
      return e & ME;
    }
    function Og(e, n) {
      return e & ME | n;
    }
    function SM(e, n) {
      return e | n;
    }
    function gs(e, n) {
      $a(Pl, n, e);
    }
    function Rd(e) {
      Pa(Pl, e);
    }
    function EM(e, n) {
      var l = e.memoizedState;
      return l !== null ? l.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Ny(e) {
      for (var n = e; n !== null; ) {
        if (n.tag === V) {
          var l = n.memoizedState;
          if (l !== null) {
            var o = l.dehydrated;
            if (o === null || Y3(o) || Q1(o))
              return n;
          }
        } else if (n.tag === ne && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        n.memoizedProps.revealOrder !== void 0) {
          var c = (n.flags & _t) !== kt;
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
    ), Mo = (
      /*  */
      2
    ), Br = (
      /*    */
      4
    ), Sa = (
      /*   */
      8
    ), Ag = [];
    function Lg() {
      for (var e = 0; e < Ag.length; e++) {
        var n = Ag[e];
        n._workInProgressVersionPrimary = null;
      }
      Ag.length = 0;
    }
    function xM(e, n) {
      var l = n._getVersion, o = l(n._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [n, o] : e.mutableSourceEagerHydrationData.push(n, o);
    }
    var ct = u.ReactCurrentDispatcher, Lv = u.ReactCurrentBatchConfig, Ng, Md;
    Ng = /* @__PURE__ */ new Set();
    var Ic = Le, zn = null, Gr = null, Qr = null, zy = !1, Nv = !1, zv = 0, wM = 0, CM = 25, Re = null, fl = null, Ss = -1, zg = !1;
    function Dn() {
      {
        var e = Re;
        fl === null ? fl = [e] : fl.push(e);
      }
    }
    function Je() {
      {
        var e = Re;
        fl !== null && (Ss++, fl[Ss] !== e && bM(e));
      }
    }
    function _d(e) {
      e != null && !rn(e) && v("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Re, typeof e);
    }
    function bM(e) {
      {
        var n = Wt(zn);
        if (!Ng.has(n) && (Ng.add(n), fl !== null)) {
          for (var l = "", o = 30, c = 0; c <= Ss; c++) {
            for (var h = fl[c], S = c === Ss ? e : h, T = c + 1 + ". " + h; T.length < o; )
              T += " ";
            T += S + `
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
    function Ha() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function Ug(e, n) {
      if (zg)
        return !1;
      if (n === null)
        return v("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Re), !1;
      e.length !== n.length && v(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, Re, "[" + n.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var l = 0; l < n.length && l < e.length; l++)
        if (!je(e[l], n[l]))
          return !1;
      return !0;
    }
    function kd(e, n, l, o, c, h) {
      Ic = h, zn = n, fl = e !== null ? e._debugHookTypes : null, Ss = -1, zg = e !== null && e.type !== n.type, n.memoizedState = null, n.updateQueue = null, n.lanes = Le, e !== null && e.memoizedState !== null ? ct.current = XE : fl !== null ? ct.current = QE : ct.current = GE;
      var S = l(o, c);
      if (Nv) {
        var T = 0;
        do {
          if (Nv = !1, zv = 0, T >= CM)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          T += 1, zg = !1, Gr = null, Qr = null, n.updateQueue = null, Ss = -1, ct.current = KE, S = l(o, c);
        } while (Nv);
      }
      ct.current = Gy, n._debugHookTypes = fl;
      var R = Gr !== null && Gr.next !== null;
      if (Ic = Le, zn = null, Gr = null, Qr = null, Re = null, fl = null, Ss = -1, e !== null && (e.flags & yr) !== (n.flags & yr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & ln) !== Dt && v("Internal React error: Expected static flag was missing. Please notify the React team."), zy = !1, R)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return S;
    }
    function Dd() {
      var e = zv !== 0;
      return zv = 0, e;
    }
    function kE(e, n, l) {
      n.updateQueue = e.updateQueue, (n.mode & Tn) !== Dt ? n.flags &= -50333701 : n.flags &= -2053, e.lanes = hc(e.lanes, l);
    }
    function DE() {
      if (ct.current = Gy, zy) {
        for (var e = zn.memoizedState; e !== null; ) {
          var n = e.queue;
          n !== null && (n.pending = null), e = e.next;
        }
        zy = !1;
      }
      Ic = Le, zn = null, Gr = null, Qr = null, fl = null, Ss = -1, Re = null, IE = !1, Nv = !1, zv = 0;
    }
    function _o() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Qr === null ? zn.memoizedState = Qr = e : Qr = Qr.next = e, Qr;
    }
    function dl() {
      var e;
      if (Gr === null) {
        var n = zn.alternate;
        n !== null ? e = n.memoizedState : e = null;
      } else
        e = Gr.next;
      var l;
      if (Qr === null ? l = zn.memoizedState : l = Qr.next, l !== null)
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
        Qr === null ? zn.memoizedState = Qr = o : Qr = Qr.next = o;
      }
      return Qr;
    }
    function OE() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function jg(e, n) {
      return typeof n == "function" ? n(e) : n;
    }
    function Fg(e, n, l) {
      var o = _o(), c;
      l !== void 0 ? c = l(n) : c = n, o.memoizedState = o.baseState = c;
      var h = {
        pending: null,
        interleaved: null,
        lanes: Le,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      };
      o.queue = h;
      var S = h.dispatch = _M.bind(null, zn, h);
      return [o.memoizedState, S];
    }
    function Pg(e, n, l) {
      var o = dl(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var h = Gr, S = h.baseQueue, T = c.pending;
      if (T !== null) {
        if (S !== null) {
          var R = S.next, L = T.next;
          S.next = L, T.next = R;
        }
        h.baseQueue !== S && v("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), h.baseQueue = S = T, c.pending = null;
      }
      if (S !== null) {
        var U = S.next, te = h.baseState, J = null, ve = null, ge = null, Ee = U;
        do {
          var at = Ee.lane;
          if (uu(Ic, at)) {
            if (ge !== null) {
              var Tt = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: wn,
                action: Ee.action,
                hasEagerState: Ee.hasEagerState,
                eagerState: Ee.eagerState,
                next: null
              };
              ge = ge.next = Tt;
            }
            if (Ee.hasEagerState)
              te = Ee.eagerState;
            else {
              var mn = Ee.action;
              te = e(te, mn);
            }
          } else {
            var At = {
              lane: at,
              action: Ee.action,
              hasEagerState: Ee.hasEagerState,
              eagerState: Ee.eagerState,
              next: null
            };
            ge === null ? (ve = ge = At, J = te) : ge = ge.next = At, zn.lanes = en(zn.lanes, at), nh(at);
          }
          Ee = Ee.next;
        } while (Ee !== null && Ee !== U);
        ge === null ? J = te : ge.next = ve, je(te, o.memoizedState) || qv(), o.memoizedState = te, o.baseState = J, o.baseQueue = ge, c.lastRenderedState = te;
      }
      var fn = c.interleaved;
      if (fn !== null) {
        var ce = fn;
        do {
          var xe = ce.lane;
          zn.lanes = en(zn.lanes, xe), nh(xe), ce = ce.next;
        } while (ce !== fn);
      } else S === null && (c.lanes = Le);
      var fe = c.dispatch;
      return [o.memoizedState, fe];
    }
    function $g(e, n, l) {
      var o = dl(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var h = c.dispatch, S = c.pending, T = o.memoizedState;
      if (S !== null) {
        c.pending = null;
        var R = S.next, L = R;
        do {
          var U = L.action;
          T = e(T, U), L = L.next;
        } while (L !== R);
        je(T, o.memoizedState) || qv(), o.memoizedState = T, o.baseQueue === null && (o.baseState = T), c.lastRenderedState = T;
      }
      return [T, h];
    }
    function az(e, n, l) {
    }
    function iz(e, n, l) {
    }
    function Hg(e, n, l) {
      var o = zn, c = _o(), h, S = ga();
      if (S) {
        if (l === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        h = l(), Md || h !== l() && (v("The result of getServerSnapshot should be cached to avoid an infinite loop"), Md = !0);
      } else {
        if (h = n(), !Md) {
          var T = n();
          je(h, T) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), Md = !0);
        }
        var R = p0();
        if (R === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Bf(R, Ic) || AE(o, n, h);
      }
      c.memoizedState = h;
      var L = {
        value: h,
        getSnapshot: n
      };
      return c.queue = L, $y(NE.bind(null, o, L, e), [e]), o.flags |= ka, Uv(Wr | Sa, LE.bind(null, o, L, h, n), void 0, null), h;
    }
    function Uy(e, n, l) {
      var o = zn, c = dl(), h = n();
      if (!Md) {
        var S = n();
        je(h, S) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), Md = !0);
      }
      var T = c.memoizedState, R = !je(T, h);
      R && (c.memoizedState = h, qv());
      var L = c.queue;
      if (Fv(NE.bind(null, o, L, e), [e]), L.getSnapshot !== n || R || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      Qr !== null && Qr.memoizedState.tag & Wr) {
        o.flags |= ka, Uv(Wr | Sa, LE.bind(null, o, L, h, n), void 0, null);
        var U = p0();
        if (U === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Bf(U, Ic) || AE(o, n, h);
      }
      return h;
    }
    function AE(e, n, l) {
      e.flags |= Xu;
      var o = {
        getSnapshot: n,
        value: l
      }, c = zn.updateQueue;
      if (c === null)
        c = OE(), zn.updateQueue = c, c.stores = [o];
      else {
        var h = c.stores;
        h === null ? c.stores = [o] : h.push(o);
      }
    }
    function LE(e, n, l, o) {
      n.value = l, n.getSnapshot = o, zE(n) && UE(e);
    }
    function NE(e, n, l) {
      var o = function() {
        zE(n) && UE(e);
      };
      return l(o);
    }
    function zE(e) {
      var n = e.getSnapshot, l = e.value;
      try {
        var o = n();
        return !je(l, o);
      } catch {
        return !0;
      }
    }
    function UE(e) {
      var n = Si(e, $t);
      n !== null && Jr(n, e, $t, jn);
    }
    function jy(e) {
      var n = _o();
      typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e;
      var l = {
        pending: null,
        interleaved: null,
        lanes: Le,
        dispatch: null,
        lastRenderedReducer: jg,
        lastRenderedState: e
      };
      n.queue = l;
      var o = l.dispatch = kM.bind(null, zn, l);
      return [n.memoizedState, o];
    }
    function Vg(e) {
      return Pg(jg);
    }
    function Ig(e) {
      return $g(jg);
    }
    function Uv(e, n, l, o) {
      var c = {
        tag: e,
        create: n,
        destroy: l,
        deps: o,
        // Circular
        next: null
      }, h = zn.updateQueue;
      if (h === null)
        h = OE(), zn.updateQueue = h, h.lastEffect = c.next = c;
      else {
        var S = h.lastEffect;
        if (S === null)
          h.lastEffect = c.next = c;
        else {
          var T = S.next;
          S.next = c, c.next = T, h.lastEffect = c;
        }
      }
      return c;
    }
    function qg(e) {
      var n = _o();
      {
        var l = {
          current: e
        };
        return n.memoizedState = l, l;
      }
    }
    function Fy(e) {
      var n = dl();
      return n.memoizedState;
    }
    function jv(e, n, l, o) {
      var c = _o(), h = o === void 0 ? null : o;
      zn.flags |= e, c.memoizedState = Uv(Wr | n, l, void 0, h);
    }
    function Py(e, n, l, o) {
      var c = dl(), h = o === void 0 ? null : o, S = void 0;
      if (Gr !== null) {
        var T = Gr.memoizedState;
        if (S = T.destroy, h !== null) {
          var R = T.deps;
          if (Ug(h, R)) {
            c.memoizedState = Uv(n, l, S, h);
            return;
          }
        }
      }
      zn.flags |= e, c.memoizedState = Uv(Wr | n, l, S, h);
    }
    function $y(e, n) {
      return (zn.mode & Tn) !== Dt ? jv(Ji | ka | Ef, Sa, e, n) : jv(ka | Ef, Sa, e, n);
    }
    function Fv(e, n) {
      return Py(ka, Sa, e, n);
    }
    function Yg(e, n) {
      return jv(pn, Mo, e, n);
    }
    function Hy(e, n) {
      return Py(pn, Mo, e, n);
    }
    function Wg(e, n) {
      var l = pn;
      return l |= Ml, (zn.mode & Tn) !== Dt && (l |= uo), jv(l, Br, e, n);
    }
    function Vy(e, n) {
      return Py(pn, Br, e, n);
    }
    function jE(e, n) {
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
    function Bg(e, n, l) {
      typeof n != "function" && v("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", n !== null ? typeof n : "null");
      var o = l != null ? l.concat([e]) : null, c = pn;
      return c |= Ml, (zn.mode & Tn) !== Dt && (c |= uo), jv(c, Br, jE.bind(null, n, e), o);
    }
    function Iy(e, n, l) {
      typeof n != "function" && v("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", n !== null ? typeof n : "null");
      var o = l != null ? l.concat([e]) : null;
      return Py(pn, Br, jE.bind(null, n, e), o);
    }
    function TM(e, n) {
    }
    var qy = TM;
    function Gg(e, n) {
      var l = _o(), o = n === void 0 ? null : n;
      return l.memoizedState = [e, o], e;
    }
    function Yy(e, n) {
      var l = dl(), o = n === void 0 ? null : n, c = l.memoizedState;
      if (c !== null && o !== null) {
        var h = c[1];
        if (Ug(o, h))
          return c[0];
      }
      return l.memoizedState = [e, o], e;
    }
    function Qg(e, n) {
      var l = _o(), o = n === void 0 ? null : n, c = e();
      return l.memoizedState = [c, o], c;
    }
    function Wy(e, n) {
      var l = dl(), o = n === void 0 ? null : n, c = l.memoizedState;
      if (c !== null && o !== null) {
        var h = c[1];
        if (Ug(o, h))
          return c[0];
      }
      var S = e();
      return l.memoizedState = [S, o], S;
    }
    function Xg(e) {
      var n = _o();
      return n.memoizedState = e, e;
    }
    function FE(e) {
      var n = dl(), l = Gr, o = l.memoizedState;
      return $E(n, o, e);
    }
    function PE(e) {
      var n = dl();
      if (Gr === null)
        return n.memoizedState = e, e;
      var l = Gr.memoizedState;
      return $E(n, l, e);
    }
    function $E(e, n, l) {
      var o = !$p(Ic);
      if (o) {
        if (!je(l, n)) {
          var c = Ip();
          zn.lanes = en(zn.lanes, c), nh(c), e.baseState = !0;
        }
        return n;
      } else
        return e.baseState && (e.baseState = !1, qv()), e.memoizedState = l, l;
    }
    function RM(e, n, l) {
      var o = mi();
      Er(Cm(o, rl)), e(!0);
      var c = Lv.transition;
      Lv.transition = {};
      var h = Lv.transition;
      Lv.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), n();
      } finally {
        if (Er(o), Lv.transition = c, c === null && h._updatedFibers) {
          var S = h._updatedFibers.size;
          S > 10 && m("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), h._updatedFibers.clear();
        }
      }
    }
    function Kg() {
      var e = jy(!1), n = e[0], l = e[1], o = RM.bind(null, l), c = _o();
      return c.memoizedState = o, [n, o];
    }
    function HE() {
      var e = Vg(), n = e[0], l = dl(), o = l.memoizedState;
      return [n, o];
    }
    function VE() {
      var e = Ig(), n = e[0], l = dl(), o = l.memoizedState;
      return [n, o];
    }
    var IE = !1;
    function MM() {
      return IE;
    }
    function Zg() {
      var e = _o(), n = p0(), l = n.identifierPrefix, o;
      if (ga()) {
        var c = qR();
        o = ":" + l + "R" + c;
        var h = zv++;
        h > 0 && (o += "H" + h.toString(32)), o += ":";
      } else {
        var S = wM++;
        o = ":" + l + "r" + S.toString(32) + ":";
      }
      return e.memoizedState = o, o;
    }
    function By() {
      var e = dl(), n = e.memoizedState;
      return n;
    }
    function _M(e, n, l) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = bs(e), c = {
        lane: o,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (qE(e))
        YE(n, c);
      else {
        var h = SE(e, n, c, o);
        if (h !== null) {
          var S = ei();
          Jr(h, e, o, S), WE(h, n, o);
        }
      }
      BE(e, o);
    }
    function kM(e, n, l) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = bs(e), c = {
        lane: o,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (qE(e))
        YE(n, c);
      else {
        var h = e.alternate;
        if (e.lanes === Le && (h === null || h.lanes === Le)) {
          var S = n.lastRenderedReducer;
          if (S !== null) {
            var T;
            T = ct.current, ct.current = $l;
            try {
              var R = n.lastRenderedState, L = S(R, l);
              if (c.hasEagerState = !0, c.eagerState = L, je(L, R)) {
                pM(e, n, c, o);
                return;
              }
            } catch {
            } finally {
              ct.current = T;
            }
          }
        }
        var U = SE(e, n, c, o);
        if (U !== null) {
          var te = ei();
          Jr(U, e, o, te), WE(U, n, o);
        }
      }
      BE(e, o);
    }
    function qE(e) {
      var n = e.alternate;
      return e === zn || n !== null && n === zn;
    }
    function YE(e, n) {
      Nv = zy = !0;
      var l = e.pending;
      l === null ? n.next = n : (n.next = l.next, l.next = n), e.pending = n;
    }
    function WE(e, n, l) {
      if (Vp(l)) {
        var o = n.lanes;
        o = qp(o, e.pendingLanes);
        var c = en(o, l);
        n.lanes = c, Qf(e, c);
      }
    }
    function BE(e, n, l) {
      ic(e, n);
    }
    var Gy = {
      readContext: Fr,
      useCallback: Ha,
      useContext: Ha,
      useEffect: Ha,
      useImperativeHandle: Ha,
      useInsertionEffect: Ha,
      useLayoutEffect: Ha,
      useMemo: Ha,
      useReducer: Ha,
      useRef: Ha,
      useState: Ha,
      useDebugValue: Ha,
      useDeferredValue: Ha,
      useTransition: Ha,
      useMutableSource: Ha,
      useSyncExternalStore: Ha,
      useId: Ha,
      unstable_isNewReconciler: ie
    }, GE = null, QE = null, XE = null, KE = null, ko = null, $l = null, Qy = null;
    {
      var Jg = function() {
        v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, Gt = function() {
        v("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      GE = {
        readContext: function(e) {
          return Fr(e);
        },
        useCallback: function(e, n) {
          return Re = "useCallback", Dn(), _d(n), Gg(e, n);
        },
        useContext: function(e) {
          return Re = "useContext", Dn(), Fr(e);
        },
        useEffect: function(e, n) {
          return Re = "useEffect", Dn(), _d(n), $y(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Re = "useImperativeHandle", Dn(), _d(l), Bg(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Re = "useInsertionEffect", Dn(), _d(n), Yg(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Re = "useLayoutEffect", Dn(), _d(n), Wg(e, n);
        },
        useMemo: function(e, n) {
          Re = "useMemo", Dn(), _d(n);
          var l = ct.current;
          ct.current = ko;
          try {
            return Qg(e, n);
          } finally {
            ct.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Re = "useReducer", Dn();
          var o = ct.current;
          ct.current = ko;
          try {
            return Fg(e, n, l);
          } finally {
            ct.current = o;
          }
        },
        useRef: function(e) {
          return Re = "useRef", Dn(), qg(e);
        },
        useState: function(e) {
          Re = "useState", Dn();
          var n = ct.current;
          ct.current = ko;
          try {
            return jy(e);
          } finally {
            ct.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Re = "useDebugValue", Dn(), void 0;
        },
        useDeferredValue: function(e) {
          return Re = "useDeferredValue", Dn(), Xg(e);
        },
        useTransition: function() {
          return Re = "useTransition", Dn(), Kg();
        },
        useMutableSource: function(e, n, l) {
          return Re = "useMutableSource", Dn(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Re = "useSyncExternalStore", Dn(), Hg(e, n, l);
        },
        useId: function() {
          return Re = "useId", Dn(), Zg();
        },
        unstable_isNewReconciler: ie
      }, QE = {
        readContext: function(e) {
          return Fr(e);
        },
        useCallback: function(e, n) {
          return Re = "useCallback", Je(), Gg(e, n);
        },
        useContext: function(e) {
          return Re = "useContext", Je(), Fr(e);
        },
        useEffect: function(e, n) {
          return Re = "useEffect", Je(), $y(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Re = "useImperativeHandle", Je(), Bg(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Re = "useInsertionEffect", Je(), Yg(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Re = "useLayoutEffect", Je(), Wg(e, n);
        },
        useMemo: function(e, n) {
          Re = "useMemo", Je();
          var l = ct.current;
          ct.current = ko;
          try {
            return Qg(e, n);
          } finally {
            ct.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Re = "useReducer", Je();
          var o = ct.current;
          ct.current = ko;
          try {
            return Fg(e, n, l);
          } finally {
            ct.current = o;
          }
        },
        useRef: function(e) {
          return Re = "useRef", Je(), qg(e);
        },
        useState: function(e) {
          Re = "useState", Je();
          var n = ct.current;
          ct.current = ko;
          try {
            return jy(e);
          } finally {
            ct.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Re = "useDebugValue", Je(), void 0;
        },
        useDeferredValue: function(e) {
          return Re = "useDeferredValue", Je(), Xg(e);
        },
        useTransition: function() {
          return Re = "useTransition", Je(), Kg();
        },
        useMutableSource: function(e, n, l) {
          return Re = "useMutableSource", Je(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Re = "useSyncExternalStore", Je(), Hg(e, n, l);
        },
        useId: function() {
          return Re = "useId", Je(), Zg();
        },
        unstable_isNewReconciler: ie
      }, XE = {
        readContext: function(e) {
          return Fr(e);
        },
        useCallback: function(e, n) {
          return Re = "useCallback", Je(), Yy(e, n);
        },
        useContext: function(e) {
          return Re = "useContext", Je(), Fr(e);
        },
        useEffect: function(e, n) {
          return Re = "useEffect", Je(), Fv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Re = "useImperativeHandle", Je(), Iy(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Re = "useInsertionEffect", Je(), Hy(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Re = "useLayoutEffect", Je(), Vy(e, n);
        },
        useMemo: function(e, n) {
          Re = "useMemo", Je();
          var l = ct.current;
          ct.current = $l;
          try {
            return Wy(e, n);
          } finally {
            ct.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Re = "useReducer", Je();
          var o = ct.current;
          ct.current = $l;
          try {
            return Pg(e, n, l);
          } finally {
            ct.current = o;
          }
        },
        useRef: function(e) {
          return Re = "useRef", Je(), Fy();
        },
        useState: function(e) {
          Re = "useState", Je();
          var n = ct.current;
          ct.current = $l;
          try {
            return Vg(e);
          } finally {
            ct.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Re = "useDebugValue", Je(), qy();
        },
        useDeferredValue: function(e) {
          return Re = "useDeferredValue", Je(), FE(e);
        },
        useTransition: function() {
          return Re = "useTransition", Je(), HE();
        },
        useMutableSource: function(e, n, l) {
          return Re = "useMutableSource", Je(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Re = "useSyncExternalStore", Je(), Uy(e, n);
        },
        useId: function() {
          return Re = "useId", Je(), By();
        },
        unstable_isNewReconciler: ie
      }, KE = {
        readContext: function(e) {
          return Fr(e);
        },
        useCallback: function(e, n) {
          return Re = "useCallback", Je(), Yy(e, n);
        },
        useContext: function(e) {
          return Re = "useContext", Je(), Fr(e);
        },
        useEffect: function(e, n) {
          return Re = "useEffect", Je(), Fv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Re = "useImperativeHandle", Je(), Iy(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Re = "useInsertionEffect", Je(), Hy(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Re = "useLayoutEffect", Je(), Vy(e, n);
        },
        useMemo: function(e, n) {
          Re = "useMemo", Je();
          var l = ct.current;
          ct.current = Qy;
          try {
            return Wy(e, n);
          } finally {
            ct.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Re = "useReducer", Je();
          var o = ct.current;
          ct.current = Qy;
          try {
            return $g(e, n, l);
          } finally {
            ct.current = o;
          }
        },
        useRef: function(e) {
          return Re = "useRef", Je(), Fy();
        },
        useState: function(e) {
          Re = "useState", Je();
          var n = ct.current;
          ct.current = Qy;
          try {
            return Ig(e);
          } finally {
            ct.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Re = "useDebugValue", Je(), qy();
        },
        useDeferredValue: function(e) {
          return Re = "useDeferredValue", Je(), PE(e);
        },
        useTransition: function() {
          return Re = "useTransition", Je(), VE();
        },
        useMutableSource: function(e, n, l) {
          return Re = "useMutableSource", Je(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Re = "useSyncExternalStore", Je(), Uy(e, n);
        },
        useId: function() {
          return Re = "useId", Je(), By();
        },
        unstable_isNewReconciler: ie
      }, ko = {
        readContext: function(e) {
          return Jg(), Fr(e);
        },
        useCallback: function(e, n) {
          return Re = "useCallback", Gt(), Dn(), Gg(e, n);
        },
        useContext: function(e) {
          return Re = "useContext", Gt(), Dn(), Fr(e);
        },
        useEffect: function(e, n) {
          return Re = "useEffect", Gt(), Dn(), $y(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Re = "useImperativeHandle", Gt(), Dn(), Bg(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Re = "useInsertionEffect", Gt(), Dn(), Yg(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Re = "useLayoutEffect", Gt(), Dn(), Wg(e, n);
        },
        useMemo: function(e, n) {
          Re = "useMemo", Gt(), Dn();
          var l = ct.current;
          ct.current = ko;
          try {
            return Qg(e, n);
          } finally {
            ct.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Re = "useReducer", Gt(), Dn();
          var o = ct.current;
          ct.current = ko;
          try {
            return Fg(e, n, l);
          } finally {
            ct.current = o;
          }
        },
        useRef: function(e) {
          return Re = "useRef", Gt(), Dn(), qg(e);
        },
        useState: function(e) {
          Re = "useState", Gt(), Dn();
          var n = ct.current;
          ct.current = ko;
          try {
            return jy(e);
          } finally {
            ct.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Re = "useDebugValue", Gt(), Dn(), void 0;
        },
        useDeferredValue: function(e) {
          return Re = "useDeferredValue", Gt(), Dn(), Xg(e);
        },
        useTransition: function() {
          return Re = "useTransition", Gt(), Dn(), Kg();
        },
        useMutableSource: function(e, n, l) {
          return Re = "useMutableSource", Gt(), Dn(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Re = "useSyncExternalStore", Gt(), Dn(), Hg(e, n, l);
        },
        useId: function() {
          return Re = "useId", Gt(), Dn(), Zg();
        },
        unstable_isNewReconciler: ie
      }, $l = {
        readContext: function(e) {
          return Jg(), Fr(e);
        },
        useCallback: function(e, n) {
          return Re = "useCallback", Gt(), Je(), Yy(e, n);
        },
        useContext: function(e) {
          return Re = "useContext", Gt(), Je(), Fr(e);
        },
        useEffect: function(e, n) {
          return Re = "useEffect", Gt(), Je(), Fv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Re = "useImperativeHandle", Gt(), Je(), Iy(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Re = "useInsertionEffect", Gt(), Je(), Hy(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Re = "useLayoutEffect", Gt(), Je(), Vy(e, n);
        },
        useMemo: function(e, n) {
          Re = "useMemo", Gt(), Je();
          var l = ct.current;
          ct.current = $l;
          try {
            return Wy(e, n);
          } finally {
            ct.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Re = "useReducer", Gt(), Je();
          var o = ct.current;
          ct.current = $l;
          try {
            return Pg(e, n, l);
          } finally {
            ct.current = o;
          }
        },
        useRef: function(e) {
          return Re = "useRef", Gt(), Je(), Fy();
        },
        useState: function(e) {
          Re = "useState", Gt(), Je();
          var n = ct.current;
          ct.current = $l;
          try {
            return Vg(e);
          } finally {
            ct.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Re = "useDebugValue", Gt(), Je(), qy();
        },
        useDeferredValue: function(e) {
          return Re = "useDeferredValue", Gt(), Je(), FE(e);
        },
        useTransition: function() {
          return Re = "useTransition", Gt(), Je(), HE();
        },
        useMutableSource: function(e, n, l) {
          return Re = "useMutableSource", Gt(), Je(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Re = "useSyncExternalStore", Gt(), Je(), Uy(e, n);
        },
        useId: function() {
          return Re = "useId", Gt(), Je(), By();
        },
        unstable_isNewReconciler: ie
      }, Qy = {
        readContext: function(e) {
          return Jg(), Fr(e);
        },
        useCallback: function(e, n) {
          return Re = "useCallback", Gt(), Je(), Yy(e, n);
        },
        useContext: function(e) {
          return Re = "useContext", Gt(), Je(), Fr(e);
        },
        useEffect: function(e, n) {
          return Re = "useEffect", Gt(), Je(), Fv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Re = "useImperativeHandle", Gt(), Je(), Iy(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Re = "useInsertionEffect", Gt(), Je(), Hy(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Re = "useLayoutEffect", Gt(), Je(), Vy(e, n);
        },
        useMemo: function(e, n) {
          Re = "useMemo", Gt(), Je();
          var l = ct.current;
          ct.current = $l;
          try {
            return Wy(e, n);
          } finally {
            ct.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Re = "useReducer", Gt(), Je();
          var o = ct.current;
          ct.current = $l;
          try {
            return $g(e, n, l);
          } finally {
            ct.current = o;
          }
        },
        useRef: function(e) {
          return Re = "useRef", Gt(), Je(), Fy();
        },
        useState: function(e) {
          Re = "useState", Gt(), Je();
          var n = ct.current;
          ct.current = $l;
          try {
            return Ig(e);
          } finally {
            ct.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Re = "useDebugValue", Gt(), Je(), qy();
        },
        useDeferredValue: function(e) {
          return Re = "useDeferredValue", Gt(), Je(), PE(e);
        },
        useTransition: function() {
          return Re = "useTransition", Gt(), Je(), VE();
        },
        useMutableSource: function(e, n, l) {
          return Re = "useMutableSource", Gt(), Je(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Re = "useSyncExternalStore", Gt(), Je(), Uy(e, n);
        },
        useId: function() {
          return Re = "useId", Gt(), Je(), By();
        },
        unstable_isNewReconciler: ie
      };
    }
    var Es = a.unstable_now, ZE = 0, Xy = -1, Pv = -1, Ky = -1, eS = !1, Zy = !1;
    function JE() {
      return eS;
    }
    function DM() {
      Zy = !0;
    }
    function OM() {
      eS = !1, Zy = !1;
    }
    function AM() {
      eS = Zy, Zy = !1;
    }
    function ex() {
      return ZE;
    }
    function tx() {
      ZE = Es();
    }
    function tS(e) {
      Pv = Es(), e.actualStartTime < 0 && (e.actualStartTime = Es());
    }
    function nx(e) {
      Pv = -1;
    }
    function Jy(e, n) {
      if (Pv >= 0) {
        var l = Es() - Pv;
        e.actualDuration += l, n && (e.selfBaseDuration = l), Pv = -1;
      }
    }
    function Do(e) {
      if (Xy >= 0) {
        var n = Es() - Xy;
        Xy = -1;
        for (var l = e.return; l !== null; ) {
          switch (l.tag) {
            case b:
              var o = l.stateNode;
              o.effectDuration += n;
              return;
            case j:
              var c = l.stateNode;
              c.effectDuration += n;
              return;
          }
          l = l.return;
        }
      }
    }
    function nS(e) {
      if (Ky >= 0) {
        var n = Es() - Ky;
        Ky = -1;
        for (var l = e.return; l !== null; ) {
          switch (l.tag) {
            case b:
              var o = l.stateNode;
              o !== null && (o.passiveEffectDuration += n);
              return;
            case j:
              var c = l.stateNode;
              c !== null && (c.passiveEffectDuration += n);
              return;
          }
          l = l.return;
        }
      }
    }
    function Oo() {
      Xy = Es();
    }
    function rS() {
      Ky = Es();
    }
    function aS(e) {
      for (var n = e.child; n; )
        e.actualDuration += n.actualDuration, n = n.sibling;
    }
    function Hl(e, n) {
      if (e && e.defaultProps) {
        var l = Bt({}, n), o = e.defaultProps;
        for (var c in o)
          l[c] === void 0 && (l[c] = o[c]);
        return l;
      }
      return n;
    }
    var iS = {}, lS, oS, uS, sS, cS, rx, e0, fS, dS, pS, $v;
    {
      lS = /* @__PURE__ */ new Set(), oS = /* @__PURE__ */ new Set(), uS = /* @__PURE__ */ new Set(), sS = /* @__PURE__ */ new Set(), fS = /* @__PURE__ */ new Set(), cS = /* @__PURE__ */ new Set(), dS = /* @__PURE__ */ new Set(), pS = /* @__PURE__ */ new Set(), $v = /* @__PURE__ */ new Set();
      var ax = /* @__PURE__ */ new Set();
      e0 = function(e, n) {
        if (!(e === null || typeof e == "function")) {
          var l = n + "_" + e;
          ax.has(l) || (ax.add(l), v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", n, e));
        }
      }, rx = function(e, n) {
        if (n === void 0) {
          var l = Sn(e) || "Component";
          cS.has(l) || (cS.add(l), v("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", l));
        }
      }, Object.defineProperty(iS, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(iS);
    }
    function vS(e, n, l, o) {
      var c = e.memoizedState, h = l(o, c);
      {
        if (e.mode & Nn) {
          tr(!0);
          try {
            h = l(o, c);
          } finally {
            tr(!1);
          }
        }
        rx(n, h);
      }
      var S = h == null ? c : Bt({}, c, h);
      if (e.memoizedState = S, e.lanes === Le) {
        var T = e.updateQueue;
        T.baseState = S;
      }
    }
    var hS = {
      isMounted: om,
      enqueueSetState: function(e, n, l) {
        var o = Qu(e), c = ei(), h = bs(o), S = Eu(c, h);
        S.payload = n, l != null && (e0(l, "setState"), S.callback = l);
        var T = ms(o, S, h);
        T !== null && (Jr(T, o, h, c), ky(T, o, h)), ic(o, h);
      },
      enqueueReplaceState: function(e, n, l) {
        var o = Qu(e), c = ei(), h = bs(o), S = Eu(c, h);
        S.tag = xE, S.payload = n, l != null && (e0(l, "replaceState"), S.callback = l);
        var T = ms(o, S, h);
        T !== null && (Jr(T, o, h, c), ky(T, o, h)), ic(o, h);
      },
      enqueueForceUpdate: function(e, n) {
        var l = Qu(e), o = ei(), c = bs(l), h = Eu(o, c);
        h.tag = Ry, n != null && (e0(n, "forceUpdate"), h.callback = n);
        var S = ms(l, h, c);
        S !== null && (Jr(S, l, c, o), ky(S, l, c)), Mf(l, c);
      }
    };
    function ix(e, n, l, o, c, h, S) {
      var T = e.stateNode;
      if (typeof T.shouldComponentUpdate == "function") {
        var R = T.shouldComponentUpdate(o, h, S);
        {
          if (e.mode & Nn) {
            tr(!0);
            try {
              R = T.shouldComponentUpdate(o, h, S);
            } finally {
              tr(!1);
            }
          }
          R === void 0 && v("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Sn(n) || "Component");
        }
        return R;
      }
      return n.prototype && n.prototype.isPureReactComponent ? !yt(l, o) || !yt(c, h) : !0;
    }
    function LM(e, n, l) {
      var o = e.stateNode;
      {
        var c = Sn(n) || "Component", h = o.render;
        h || (n.prototype && typeof n.prototype.render == "function" ? v("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", c) : v("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", c)), o.getInitialState && !o.getInitialState.isReactClassApproved && !o.state && v("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", c), o.getDefaultProps && !o.getDefaultProps.isReactClassApproved && v("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", c), o.propTypes && v("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", c), o.contextType && v("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", c), n.childContextTypes && !$v.has(n) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Nn) === Dt && ($v.add(n), v(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), n.contextTypes && !$v.has(n) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Nn) === Dt && ($v.add(n), v(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), o.contextTypes && v("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", c), n.contextType && n.contextTypes && !dS.has(n) && (dS.add(n), v("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", c)), typeof o.componentShouldUpdate == "function" && v("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", c), n.prototype && n.prototype.isPureReactComponent && typeof o.shouldComponentUpdate < "u" && v("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Sn(n) || "A pure component"), typeof o.componentDidUnmount == "function" && v("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", c), typeof o.componentDidReceiveProps == "function" && v("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", c), typeof o.componentWillRecieveProps == "function" && v("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", c), typeof o.UNSAFE_componentWillRecieveProps == "function" && v("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", c);
        var S = o.props !== l;
        o.props !== void 0 && S && v("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", c, c), o.defaultProps && v("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", c, c), typeof o.getSnapshotBeforeUpdate == "function" && typeof o.componentDidUpdate != "function" && !uS.has(n) && (uS.add(n), v("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Sn(n))), typeof o.getDerivedStateFromProps == "function" && v("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof o.getDerivedStateFromError == "function" && v("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof n.getSnapshotBeforeUpdate == "function" && v("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", c);
        var T = o.state;
        T && (typeof T != "object" || rn(T)) && v("%s.state: must be set to an object or null", c), typeof o.getChildContext == "function" && typeof n.childContextTypes != "object" && v("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", c);
      }
    }
    function lx(e, n) {
      n.updater = hS, e.stateNode = n, Go(n, e), n._reactInternalInstance = iS;
    }
    function ox(e, n, l) {
      var o = !1, c = Pi, h = Pi, S = n.contextType;
      if ("contextType" in n) {
        var T = (
          // Allow null for conditional declaration
          S === null || S !== void 0 && S.$$typeof === B && S._context === void 0
        );
        if (!T && !pS.has(n)) {
          pS.add(n);
          var R = "";
          S === void 0 ? R = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof S != "object" ? R = " However, it is set to a " + typeof S + "." : S.$$typeof === Lr ? R = " Did you accidentally pass the Context.Provider instead?" : S._context !== void 0 ? R = " Did you accidentally pass the Context.Consumer instead?" : R = " However, it is set to an object with keys {" + Object.keys(S).join(", ") + "}.", v("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Sn(n) || "Component", R);
        }
      }
      if (typeof S == "object" && S !== null)
        h = Fr(S);
      else {
        c = md(e, n, !0);
        var L = n.contextTypes;
        o = L != null, h = o ? yd(e, c) : Pi;
      }
      var U = new n(l, h);
      if (e.mode & Nn) {
        tr(!0);
        try {
          U = new n(l, h);
        } finally {
          tr(!1);
        }
      }
      var te = e.memoizedState = U.state !== null && U.state !== void 0 ? U.state : null;
      lx(e, U);
      {
        if (typeof n.getDerivedStateFromProps == "function" && te === null) {
          var J = Sn(n) || "Component";
          oS.has(J) || (oS.add(J), v("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", J, U.state === null ? "null" : "undefined", J));
        }
        if (typeof n.getDerivedStateFromProps == "function" || typeof U.getSnapshotBeforeUpdate == "function") {
          var ve = null, ge = null, Ee = null;
          if (typeof U.componentWillMount == "function" && U.componentWillMount.__suppressDeprecationWarning !== !0 ? ve = "componentWillMount" : typeof U.UNSAFE_componentWillMount == "function" && (ve = "UNSAFE_componentWillMount"), typeof U.componentWillReceiveProps == "function" && U.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? ge = "componentWillReceiveProps" : typeof U.UNSAFE_componentWillReceiveProps == "function" && (ge = "UNSAFE_componentWillReceiveProps"), typeof U.componentWillUpdate == "function" && U.componentWillUpdate.__suppressDeprecationWarning !== !0 ? Ee = "componentWillUpdate" : typeof U.UNSAFE_componentWillUpdate == "function" && (Ee = "UNSAFE_componentWillUpdate"), ve !== null || ge !== null || Ee !== null) {
            var at = Sn(n) || "Component", At = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            sS.has(at) || (sS.add(at), v(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, at, At, ve !== null ? `
  ` + ve : "", ge !== null ? `
  ` + ge : "", Ee !== null ? `
  ` + Ee : ""));
          }
        }
      }
      return o && X3(e, c, h), U;
    }
    function NM(e, n) {
      var l = n.state;
      typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), l !== n.state && (v("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Wt(e) || "Component"), hS.enqueueReplaceState(n, n.state, null));
    }
    function ux(e, n, l, o) {
      var c = n.state;
      if (typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(l, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(l, o), n.state !== c) {
        {
          var h = Wt(e) || "Component";
          lS.has(h) || (lS.add(h), v("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", h));
        }
        hS.enqueueReplaceState(n, n.state, null);
      }
    }
    function mS(e, n, l, o) {
      LM(e, n, l);
      var c = e.stateNode;
      c.props = l, c.state = e.memoizedState, c.refs = {}, Tg(e);
      var h = n.contextType;
      if (typeof h == "object" && h !== null)
        c.context = Fr(h);
      else {
        var S = md(e, n, !0);
        c.context = yd(e, S);
      }
      {
        if (c.state === l) {
          var T = Sn(n) || "Component";
          fS.has(T) || (fS.add(T), v("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", T));
        }
        e.mode & Nn && Fl.recordLegacyContextWarning(e, c), Fl.recordUnsafeLifecycleWarnings(e, c);
      }
      c.state = e.memoizedState;
      var R = n.getDerivedStateFromProps;
      if (typeof R == "function" && (vS(e, n, R, l), c.state = e.memoizedState), typeof n.getDerivedStateFromProps != "function" && typeof c.getSnapshotBeforeUpdate != "function" && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (NM(e, c), Dy(e, l, c, o), c.state = e.memoizedState), typeof c.componentDidMount == "function") {
        var L = pn;
        L |= Ml, (e.mode & Tn) !== Dt && (L |= uo), e.flags |= L;
      }
    }
    function zM(e, n, l, o) {
      var c = e.stateNode, h = e.memoizedProps;
      c.props = h;
      var S = c.context, T = n.contextType, R = Pi;
      if (typeof T == "object" && T !== null)
        R = Fr(T);
      else {
        var L = md(e, n, !0);
        R = yd(e, L);
      }
      var U = n.getDerivedStateFromProps, te = typeof U == "function" || typeof c.getSnapshotBeforeUpdate == "function";
      !te && (typeof c.UNSAFE_componentWillReceiveProps == "function" || typeof c.componentWillReceiveProps == "function") && (h !== l || S !== R) && ux(e, c, l, R), CE();
      var J = e.memoizedState, ve = c.state = J;
      if (Dy(e, l, c, o), ve = e.memoizedState, h === l && J === ve && !fy() && !Oy()) {
        if (typeof c.componentDidMount == "function") {
          var ge = pn;
          ge |= Ml, (e.mode & Tn) !== Dt && (ge |= uo), e.flags |= ge;
        }
        return !1;
      }
      typeof U == "function" && (vS(e, n, U, l), ve = e.memoizedState);
      var Ee = Oy() || ix(e, n, h, l, J, ve, R);
      if (Ee) {
        if (!te && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function") {
          var at = pn;
          at |= Ml, (e.mode & Tn) !== Dt && (at |= uo), e.flags |= at;
        }
      } else {
        if (typeof c.componentDidMount == "function") {
          var At = pn;
          At |= Ml, (e.mode & Tn) !== Dt && (At |= uo), e.flags |= At;
        }
        e.memoizedProps = l, e.memoizedState = ve;
      }
      return c.props = l, c.state = ve, c.context = R, Ee;
    }
    function UM(e, n, l, o, c) {
      var h = n.stateNode;
      wE(e, n);
      var S = n.memoizedProps, T = n.type === n.elementType ? S : Hl(n.type, S);
      h.props = T;
      var R = n.pendingProps, L = h.context, U = l.contextType, te = Pi;
      if (typeof U == "object" && U !== null)
        te = Fr(U);
      else {
        var J = md(n, l, !0);
        te = yd(n, J);
      }
      var ve = l.getDerivedStateFromProps, ge = typeof ve == "function" || typeof h.getSnapshotBeforeUpdate == "function";
      !ge && (typeof h.UNSAFE_componentWillReceiveProps == "function" || typeof h.componentWillReceiveProps == "function") && (S !== R || L !== te) && ux(n, h, o, te), CE();
      var Ee = n.memoizedState, at = h.state = Ee;
      if (Dy(n, o, h, c), at = n.memoizedState, S === R && Ee === at && !fy() && !Oy() && !ue)
        return typeof h.componentDidUpdate == "function" && (S !== e.memoizedProps || Ee !== e.memoizedState) && (n.flags |= pn), typeof h.getSnapshotBeforeUpdate == "function" && (S !== e.memoizedProps || Ee !== e.memoizedState) && (n.flags |= _r), !1;
      typeof ve == "function" && (vS(n, l, ve, o), at = n.memoizedState);
      var At = Oy() || ix(n, l, T, o, Ee, at, te) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      ue;
      return At ? (!ge && (typeof h.UNSAFE_componentWillUpdate == "function" || typeof h.componentWillUpdate == "function") && (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, at, te), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(o, at, te)), typeof h.componentDidUpdate == "function" && (n.flags |= pn), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= _r)) : (typeof h.componentDidUpdate == "function" && (S !== e.memoizedProps || Ee !== e.memoizedState) && (n.flags |= pn), typeof h.getSnapshotBeforeUpdate == "function" && (S !== e.memoizedProps || Ee !== e.memoizedState) && (n.flags |= _r), n.memoizedProps = o, n.memoizedState = at), h.props = o, h.state = at, h.context = te, At;
    }
    function qc(e, n) {
      return {
        value: e,
        source: n,
        stack: xl(n),
        digest: null
      };
    }
    function yS(e, n, l) {
      return {
        value: e,
        source: null,
        stack: l ?? null,
        digest: n ?? null
      };
    }
    function jM(e, n) {
      return !0;
    }
    function gS(e, n) {
      try {
        var l = jM(e, n);
        if (l === !1)
          return;
        var o = n.value, c = n.source, h = n.stack, S = h !== null ? h : "";
        if (o != null && o._suppressLogging) {
          if (e.tag === x)
            return;
          console.error(o);
        }
        var T = c ? Wt(c) : null, R = T ? "The above error occurred in the <" + T + "> component:" : "The above error occurred in one of your React components:", L;
        if (e.tag === b)
          L = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var U = Wt(e) || "Anonymous";
          L = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + U + ".");
        }
        var te = R + `
` + S + `

` + ("" + L);
        console.error(te);
      } catch (J) {
        setTimeout(function() {
          throw J;
        });
      }
    }
    var FM = typeof WeakMap == "function" ? WeakMap : Map;
    function sx(e, n, l) {
      var o = Eu(jn, l);
      o.tag = Cg, o.payload = {
        element: null
      };
      var c = n.value;
      return o.callback = function() {
        Dk(c), gS(e, n);
      }, o;
    }
    function SS(e, n, l) {
      var o = Eu(jn, l);
      o.tag = Cg;
      var c = e.type.getDerivedStateFromError;
      if (typeof c == "function") {
        var h = n.value;
        o.payload = function() {
          return c(h);
        }, o.callback = function() {
          Ew(e), gS(e, n);
        };
      }
      var S = e.stateNode;
      return S !== null && typeof S.componentDidCatch == "function" && (o.callback = function() {
        Ew(e), gS(e, n), typeof c != "function" && _k(this);
        var R = n.value, L = n.stack;
        this.componentDidCatch(R, {
          componentStack: L !== null ? L : ""
        }), typeof c != "function" && (za(e.lanes, $t) || v("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Wt(e) || "Unknown"));
      }), o;
    }
    function cx(e, n, l) {
      var o = e.pingCache, c;
      if (o === null ? (o = e.pingCache = new FM(), c = /* @__PURE__ */ new Set(), o.set(n, c)) : (c = o.get(n), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(n, c))), !c.has(l)) {
        c.add(l);
        var h = Ok.bind(null, e, n, l);
        La && rh(e, l), n.then(h, h);
      }
    }
    function PM(e, n, l, o) {
      var c = e.updateQueue;
      if (c === null) {
        var h = /* @__PURE__ */ new Set();
        h.add(l), e.updateQueue = h;
      } else
        c.add(l);
    }
    function $M(e, n) {
      var l = e.tag;
      if ((e.mode & ln) === Dt && (l === g || l === P || l === H)) {
        var o = e.alternate;
        o ? (e.updateQueue = o.updateQueue, e.memoizedState = o.memoizedState, e.lanes = o.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function fx(e) {
      var n = e;
      do {
        if (n.tag === V && EM(n))
          return n;
        n = n.return;
      } while (n !== null);
      return null;
    }
    function dx(e, n, l, o, c) {
      if ((e.mode & ln) === Dt) {
        if (e === n)
          e.flags |= Nr;
        else {
          if (e.flags |= _t, l.flags |= Sf, l.flags &= -52805, l.tag === x) {
            var h = l.alternate;
            if (h === null)
              l.tag = Q;
            else {
              var S = Eu(jn, $t);
              S.tag = Ry, ms(l, S, $t);
            }
          }
          l.lanes = en(l.lanes, $t);
        }
        return e;
      }
      return e.flags |= Nr, e.lanes = c, e;
    }
    function HM(e, n, l, o, c) {
      if (l.flags |= Js, La && rh(e, c), o !== null && typeof o == "object" && typeof o.then == "function") {
        var h = o;
        $M(l), ga() && l.mode & ln && rE();
        var S = fx(n);
        if (S !== null) {
          S.flags &= ~ea, dx(S, n, l, e, c), S.mode & ln && cx(e, h, c), PM(S, e, h);
          return;
        } else {
          if (!hm(c)) {
            cx(e, h, c), ZS();
            return;
          }
          var T = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          o = T;
        }
      } else if (ga() && l.mode & ln) {
        rE();
        var R = fx(n);
        if (R !== null) {
          (R.flags & Nr) === kt && (R.flags |= ea), dx(R, n, l, e, c), fg(qc(o, l));
          return;
        }
      }
      o = qc(o, l), Ek(o);
      var L = n;
      do {
        switch (L.tag) {
          case b: {
            var U = o;
            L.flags |= Nr;
            var te = vc(c);
            L.lanes = en(L.lanes, te);
            var J = sx(L, U, te);
            Rg(L, J);
            return;
          }
          case x:
            var ve = o, ge = L.type, Ee = L.stateNode;
            if ((L.flags & _t) === kt && (typeof ge.getDerivedStateFromError == "function" || Ee !== null && typeof Ee.componentDidCatch == "function" && !fw(Ee))) {
              L.flags |= Nr;
              var at = vc(c);
              L.lanes = en(L.lanes, at);
              var At = SS(L, ve, at);
              Rg(L, At);
              return;
            }
            break;
        }
        L = L.return;
      } while (L !== null);
    }
    function VM() {
      return null;
    }
    var Hv = u.ReactCurrentOwner, Vl = !1, ES, Vv, xS, wS, CS, Yc, bS, t0, Iv;
    ES = {}, Vv = {}, xS = {}, wS = {}, CS = {}, Yc = !1, bS = {}, t0 = {}, Iv = {};
    function Za(e, n, l, o) {
      e === null ? n.child = hE(n, null, l, o) : n.child = xd(n, e.child, l, o);
    }
    function IM(e, n, l, o) {
      n.child = xd(n, e.child, null, o), n.child = xd(n, null, l, o);
    }
    function px(e, n, l, o, c) {
      if (n.type !== n.elementType) {
        var h = l.propTypes;
        h && Ul(
          h,
          o,
          // Resolved props
          "prop",
          Sn(l)
        );
      }
      var S = l.render, T = n.ref, R, L;
      Cd(n, c), Ga(n);
      {
        if (Hv.current = n, Mr(!0), R = kd(e, n, S, o, T, c), L = Dd(), n.mode & Nn) {
          tr(!0);
          try {
            R = kd(e, n, S, o, T, c), L = Dd();
          } finally {
            tr(!1);
          }
        }
        Mr(!1);
      }
      return Qa(), e !== null && !Vl ? (kE(e, n, c), xu(e, n, c)) : (ga() && L && ig(n), n.flags |= Ni, Za(e, n, R, c), n.child);
    }
    function vx(e, n, l, o, c) {
      if (e === null) {
        var h = l.type;
        if (Gk(h) && l.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        l.defaultProps === void 0) {
          var S = h;
          return S = Fd(h), n.tag = H, n.type = S, MS(n, h), hx(e, n, S, o, c);
        }
        {
          var T = h.propTypes;
          if (T && Ul(
            T,
            o,
            // Resolved props
            "prop",
            Sn(h)
          ), l.defaultProps !== void 0) {
            var R = Sn(h) || "Unknown";
            Iv[R] || (v("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", R), Iv[R] = !0);
          }
        }
        var L = s2(l.type, null, o, n, n.mode, c);
        return L.ref = n.ref, L.return = n, n.child = L, L;
      }
      {
        var U = l.type, te = U.propTypes;
        te && Ul(
          te,
          o,
          // Resolved props
          "prop",
          Sn(U)
        );
      }
      var J = e.child, ve = LS(e, c);
      if (!ve) {
        var ge = J.memoizedProps, Ee = l.compare;
        if (Ee = Ee !== null ? Ee : yt, Ee(ge, o) && e.ref === n.ref)
          return xu(e, n, c);
      }
      n.flags |= Ni;
      var at = Xc(J, o);
      return at.ref = n.ref, at.return = n, n.child = at, at;
    }
    function hx(e, n, l, o, c) {
      if (n.type !== n.elementType) {
        var h = n.elementType;
        if (h.$$typeof === Ht) {
          var S = h, T = S._payload, R = S._init;
          try {
            h = R(T);
          } catch {
            h = null;
          }
          var L = h && h.propTypes;
          L && Ul(
            L,
            o,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Sn(h)
          );
        }
      }
      if (e !== null) {
        var U = e.memoizedProps;
        if (yt(U, o) && e.ref === n.ref && // Prevent bailout if the implementation changed due to hot reload.
        n.type === e.type)
          if (Vl = !1, n.pendingProps = o = U, LS(e, c))
            (e.flags & Sf) !== kt && (Vl = !0);
          else return n.lanes = e.lanes, xu(e, n, c);
      }
      return TS(e, n, l, o, c);
    }
    function mx(e, n, l) {
      var o = n.pendingProps, c = o.children, h = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden" || he)
        if ((n.mode & ln) === Dt) {
          var S = {
            baseLanes: Le,
            cachePool: null,
            transitions: null
          };
          n.memoizedState = S, v0(n, l);
        } else if (za(l, Na)) {
          var te = {
            baseLanes: Le,
            cachePool: null,
            transitions: null
          };
          n.memoizedState = te;
          var J = h !== null ? h.baseLanes : l;
          v0(n, J);
        } else {
          var T = null, R;
          if (h !== null) {
            var L = h.baseLanes;
            R = en(L, l);
          } else
            R = l;
          n.lanes = n.childLanes = Na;
          var U = {
            baseLanes: R,
            cachePool: T,
            transitions: null
          };
          return n.memoizedState = U, n.updateQueue = null, v0(n, R), null;
        }
      else {
        var ve;
        h !== null ? (ve = en(h.baseLanes, l), n.memoizedState = null) : ve = l, v0(n, ve);
      }
      return Za(e, n, c, l), n.child;
    }
    function qM(e, n, l) {
      var o = n.pendingProps;
      return Za(e, n, o, l), n.child;
    }
    function YM(e, n, l) {
      var o = n.pendingProps.children;
      return Za(e, n, o, l), n.child;
    }
    function WM(e, n, l) {
      {
        n.flags |= pn;
        {
          var o = n.stateNode;
          o.effectDuration = 0, o.passiveEffectDuration = 0;
        }
      }
      var c = n.pendingProps, h = c.children;
      return Za(e, n, h, l), n.child;
    }
    function yx(e, n) {
      var l = n.ref;
      (e === null && l !== null || e !== null && e.ref !== l) && (n.flags |= ir, n.flags |= Ku);
    }
    function TS(e, n, l, o, c) {
      if (n.type !== n.elementType) {
        var h = l.propTypes;
        h && Ul(
          h,
          o,
          // Resolved props
          "prop",
          Sn(l)
        );
      }
      var S;
      {
        var T = md(n, l, !0);
        S = yd(n, T);
      }
      var R, L;
      Cd(n, c), Ga(n);
      {
        if (Hv.current = n, Mr(!0), R = kd(e, n, l, o, S, c), L = Dd(), n.mode & Nn) {
          tr(!0);
          try {
            R = kd(e, n, l, o, S, c), L = Dd();
          } finally {
            tr(!1);
          }
        }
        Mr(!1);
      }
      return Qa(), e !== null && !Vl ? (kE(e, n, c), xu(e, n, c)) : (ga() && L && ig(n), n.flags |= Ni, Za(e, n, R, c), n.child);
    }
    function gx(e, n, l, o, c) {
      {
        switch (sD(n)) {
          case !1: {
            var h = n.stateNode, S = n.type, T = new S(n.memoizedProps, h.context), R = T.state;
            h.updater.enqueueSetState(h, R, null);
            break;
          }
          case !0: {
            n.flags |= _t, n.flags |= Nr;
            var L = new Error("Simulated error coming from DevTools"), U = vc(c);
            n.lanes = en(n.lanes, U);
            var te = SS(n, qc(L, n), U);
            Rg(n, te);
            break;
          }
        }
        if (n.type !== n.elementType) {
          var J = l.propTypes;
          J && Ul(
            J,
            o,
            // Resolved props
            "prop",
            Sn(l)
          );
        }
      }
      var ve;
      Ro(l) ? (ve = !0, py(n)) : ve = !1, Cd(n, c);
      var ge = n.stateNode, Ee;
      ge === null ? (r0(e, n), ox(n, l, o), mS(n, l, o, c), Ee = !0) : e === null ? Ee = zM(n, l, o, c) : Ee = UM(e, n, l, o, c);
      var at = RS(e, n, l, Ee, ve, c);
      {
        var At = n.stateNode;
        Ee && At.props !== o && (Yc || v("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Wt(n) || "a component"), Yc = !0);
      }
      return at;
    }
    function RS(e, n, l, o, c, h) {
      yx(e, n);
      var S = (n.flags & _t) !== kt;
      if (!o && !S)
        return c && J3(n, l, !1), xu(e, n, h);
      var T = n.stateNode;
      Hv.current = n;
      var R;
      if (S && typeof l.getDerivedStateFromError != "function")
        R = null, nx();
      else {
        Ga(n);
        {
          if (Mr(!0), R = T.render(), n.mode & Nn) {
            tr(!0);
            try {
              T.render();
            } finally {
              tr(!1);
            }
          }
          Mr(!1);
        }
        Qa();
      }
      return n.flags |= Ni, e !== null && S ? IM(e, n, R, h) : Za(e, n, R, h), n.memoizedState = T.state, c && J3(n, l, !0), n.child;
    }
    function Sx(e) {
      var n = e.stateNode;
      n.pendingContext ? K3(e, n.pendingContext, n.pendingContext !== n.context) : n.context && K3(e, n.context, !1), Mg(e, n.containerInfo);
    }
    function BM(e, n, l) {
      if (Sx(n), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var o = n.pendingProps, c = n.memoizedState, h = c.element;
      wE(e, n), Dy(n, o, null, l);
      var S = n.memoizedState;
      n.stateNode;
      var T = S.element;
      if (c.isDehydrated) {
        var R = {
          element: T,
          isDehydrated: !1,
          cache: S.cache,
          pendingSuspenseBoundaries: S.pendingSuspenseBoundaries,
          transitions: S.transitions
        }, L = n.updateQueue;
        if (L.baseState = R, n.memoizedState = R, n.flags & ea) {
          var U = qc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), n);
          return Ex(e, n, T, l, U);
        } else if (T !== h) {
          var te = qc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), n);
          return Ex(e, n, T, l, te);
        } else {
          XR(n);
          var J = hE(n, null, T, l);
          n.child = J;
          for (var ve = J; ve; )
            ve.flags = ve.flags & ~er | Da, ve = ve.sibling;
        }
      } else {
        if (Ed(), T === h)
          return xu(e, n, l);
        Za(e, n, T, l);
      }
      return n.child;
    }
    function Ex(e, n, l, o, c) {
      return Ed(), fg(c), n.flags |= ea, Za(e, n, l, o), n.child;
    }
    function GM(e, n, l) {
      RE(n), e === null && cg(n);
      var o = n.type, c = n.pendingProps, h = e !== null ? e.memoizedProps : null, S = c.children, T = Y1(o, c);
      return T ? S = null : h !== null && Y1(o, h) && (n.flags |= ci), yx(e, n), Za(e, n, S, l), n.child;
    }
    function QM(e, n) {
      return e === null && cg(n), null;
    }
    function XM(e, n, l, o) {
      r0(e, n);
      var c = n.pendingProps, h = l, S = h._payload, T = h._init, R = T(S);
      n.type = R;
      var L = n.tag = Qk(R), U = Hl(R, c), te;
      switch (L) {
        case g:
          return MS(n, R), n.type = R = Fd(R), te = TS(null, n, R, U, o), te;
        case x:
          return n.type = R = r2(R), te = gx(null, n, R, U, o), te;
        case P:
          return n.type = R = a2(R), te = px(null, n, R, U, o), te;
        case q: {
          if (n.type !== n.elementType) {
            var J = R.propTypes;
            J && Ul(
              J,
              U,
              // Resolved for outer only
              "prop",
              Sn(R)
            );
          }
          return te = vx(
            null,
            n,
            R,
            Hl(R.type, U),
            // The inner type can have defaults too
            o
          ), te;
        }
      }
      var ve = "";
      throw R !== null && typeof R == "object" && R.$$typeof === Ht && (ve = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + R + ". " + ("Lazy element type must resolve to a class or function." + ve));
    }
    function KM(e, n, l, o, c) {
      r0(e, n), n.tag = x;
      var h;
      return Ro(l) ? (h = !0, py(n)) : h = !1, Cd(n, c), ox(n, l, o), mS(n, l, o, c), RS(null, n, l, !0, h, c);
    }
    function ZM(e, n, l, o) {
      r0(e, n);
      var c = n.pendingProps, h;
      {
        var S = md(n, l, !1);
        h = yd(n, S);
      }
      Cd(n, o);
      var T, R;
      Ga(n);
      {
        if (l.prototype && typeof l.prototype.render == "function") {
          var L = Sn(l) || "Unknown";
          ES[L] || (v("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", L, L), ES[L] = !0);
        }
        n.mode & Nn && Fl.recordLegacyContextWarning(n, null), Mr(!0), Hv.current = n, T = kd(null, n, l, c, h, o), R = Dd(), Mr(!1);
      }
      if (Qa(), n.flags |= Ni, typeof T == "object" && T !== null && typeof T.render == "function" && T.$$typeof === void 0) {
        var U = Sn(l) || "Unknown";
        Vv[U] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", U, U, U), Vv[U] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof T == "object" && T !== null && typeof T.render == "function" && T.$$typeof === void 0
      ) {
        {
          var te = Sn(l) || "Unknown";
          Vv[te] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", te, te, te), Vv[te] = !0);
        }
        n.tag = x, n.memoizedState = null, n.updateQueue = null;
        var J = !1;
        return Ro(l) ? (J = !0, py(n)) : J = !1, n.memoizedState = T.state !== null && T.state !== void 0 ? T.state : null, Tg(n), lx(n, T), mS(n, l, c, o), RS(null, n, l, !0, J, o);
      } else {
        if (n.tag = g, n.mode & Nn) {
          tr(!0);
          try {
            T = kd(null, n, l, c, h, o), R = Dd();
          } finally {
            tr(!1);
          }
        }
        return ga() && R && ig(n), Za(null, n, T, o), MS(n, l), n.child;
      }
    }
    function MS(e, n) {
      {
        if (n && n.childContextTypes && v("%s(...): childContextTypes cannot be defined on a function component.", n.displayName || n.name || "Component"), e.ref !== null) {
          var l = "", o = fa();
          o && (l += `

Check the render method of \`` + o + "`.");
          var c = o || "", h = e._debugSource;
          h && (c = h.fileName + ":" + h.lineNumber), CS[c] || (CS[c] = !0, v("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", l));
        }
        if (n.defaultProps !== void 0) {
          var S = Sn(n) || "Unknown";
          Iv[S] || (v("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", S), Iv[S] = !0);
        }
        if (typeof n.getDerivedStateFromProps == "function") {
          var T = Sn(n) || "Unknown";
          wS[T] || (v("%s: Function components do not support getDerivedStateFromProps.", T), wS[T] = !0);
        }
        if (typeof n.contextType == "object" && n.contextType !== null) {
          var R = Sn(n) || "Unknown";
          xS[R] || (v("%s: Function components do not support contextType.", R), xS[R] = !0);
        }
      }
    }
    var _S = {
      dehydrated: null,
      treeContext: null,
      retryLane: wn
    };
    function kS(e) {
      return {
        baseLanes: e,
        cachePool: VM(),
        transitions: null
      };
    }
    function JM(e, n) {
      var l = null;
      return {
        baseLanes: en(e.baseLanes, n),
        cachePool: l,
        transitions: e.transitions
      };
    }
    function e_(e, n, l, o) {
      if (n !== null) {
        var c = n.memoizedState;
        if (c === null)
          return !1;
      }
      return Dg(e, Av);
    }
    function t_(e, n) {
      return hc(e.childLanes, n);
    }
    function xx(e, n, l) {
      var o = n.pendingProps;
      cD(n) && (n.flags |= _t);
      var c = Pl.current, h = !1, S = (n.flags & _t) !== kt;
      if (S || e_(c, e) ? (h = !0, n.flags &= ~_t) : (e === null || e.memoizedState !== null) && (c = SM(c, _E)), c = Td(c), gs(n, c), e === null) {
        cg(n);
        var T = n.memoizedState;
        if (T !== null) {
          var R = T.dehydrated;
          if (R !== null)
            return l_(n, R);
        }
        var L = o.children, U = o.fallback;
        if (h) {
          var te = n_(n, L, U, l), J = n.child;
          return J.memoizedState = kS(l), n.memoizedState = _S, te;
        } else
          return DS(n, L);
      } else {
        var ve = e.memoizedState;
        if (ve !== null) {
          var ge = ve.dehydrated;
          if (ge !== null)
            return o_(e, n, S, o, ge, ve, l);
        }
        if (h) {
          var Ee = o.fallback, at = o.children, At = a_(e, n, at, Ee, l), Tt = n.child, mn = e.child.memoizedState;
          return Tt.memoizedState = mn === null ? kS(l) : JM(mn, l), Tt.childLanes = t_(e, l), n.memoizedState = _S, At;
        } else {
          var fn = o.children, ce = r_(e, n, fn, l);
          return n.memoizedState = null, ce;
        }
      }
    }
    function DS(e, n, l) {
      var o = e.mode, c = {
        mode: "visible",
        children: n
      }, h = OS(c, o);
      return h.return = e, e.child = h, h;
    }
    function n_(e, n, l, o) {
      var c = e.mode, h = e.child, S = {
        mode: "hidden",
        children: n
      }, T, R;
      return (c & ln) === Dt && h !== null ? (T = h, T.childLanes = Le, T.pendingProps = S, e.mode & bn && (T.actualDuration = 0, T.actualStartTime = -1, T.selfBaseDuration = 0, T.treeBaseDuration = 0), R = Rs(l, c, o, null)) : (T = OS(S, c), R = Rs(l, c, o, null)), T.return = e, R.return = e, T.sibling = R, e.child = T, R;
    }
    function OS(e, n, l) {
      return ww(e, n, Le, null);
    }
    function wx(e, n) {
      return Xc(e, n);
    }
    function r_(e, n, l, o) {
      var c = e.child, h = c.sibling, S = wx(c, {
        mode: "visible",
        children: l
      });
      if ((n.mode & ln) === Dt && (S.lanes = o), S.return = n, S.sibling = null, h !== null) {
        var T = n.deletions;
        T === null ? (n.deletions = [h], n.flags |= si) : T.push(h);
      }
      return n.child = S, S;
    }
    function a_(e, n, l, o, c) {
      var h = n.mode, S = e.child, T = S.sibling, R = {
        mode: "hidden",
        children: l
      }, L;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (h & ln) === Dt && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        n.child !== S
      ) {
        var U = n.child;
        L = U, L.childLanes = Le, L.pendingProps = R, n.mode & bn && (L.actualDuration = 0, L.actualStartTime = -1, L.selfBaseDuration = S.selfBaseDuration, L.treeBaseDuration = S.treeBaseDuration), n.deletions = null;
      } else
        L = wx(S, R), L.subtreeFlags = S.subtreeFlags & yr;
      var te;
      return T !== null ? te = Xc(T, o) : (te = Rs(o, h, c, null), te.flags |= er), te.return = n, L.return = n, L.sibling = te, n.child = L, te;
    }
    function n0(e, n, l, o) {
      o !== null && fg(o), xd(n, e.child, null, l);
      var c = n.pendingProps, h = c.children, S = DS(n, h);
      return S.flags |= er, n.memoizedState = null, S;
    }
    function i_(e, n, l, o, c) {
      var h = n.mode, S = {
        mode: "visible",
        children: l
      }, T = OS(S, h), R = Rs(o, h, c, null);
      return R.flags |= er, T.return = n, R.return = n, T.sibling = R, n.child = T, (n.mode & ln) !== Dt && xd(n, e.child, null, c), R;
    }
    function l_(e, n, l) {
      return (e.mode & ln) === Dt ? (v("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = $t) : Q1(n) ? e.lanes = ta : e.lanes = Na, null;
    }
    function o_(e, n, l, o, c, h, S) {
      if (l)
        if (n.flags & ea) {
          n.flags &= ~ea;
          var ce = yS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return n0(e, n, S, ce);
        } else {
          if (n.memoizedState !== null)
            return n.child = e.child, n.flags |= _t, null;
          var xe = o.children, fe = o.fallback, He = i_(e, n, xe, fe, S), pt = n.child;
          return pt.memoizedState = kS(S), n.memoizedState = _S, He;
        }
      else {
        if (GR(), (n.mode & ln) === Dt)
          return n0(
            e,
            n,
            S,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Q1(c)) {
          var T, R, L;
          {
            var U = fR(c);
            T = U.digest, R = U.message, L = U.stack;
          }
          var te;
          R ? te = new Error(R) : te = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var J = yS(te, T, L);
          return n0(e, n, S, J);
        }
        var ve = za(S, e.childLanes);
        if (Vl || ve) {
          var ge = p0();
          if (ge !== null) {
            var Ee = Wp(ge, S);
            if (Ee !== wn && Ee !== h.retryLane) {
              h.retryLane = Ee;
              var at = jn;
              Si(e, Ee), Jr(ge, e, Ee, at);
            }
          }
          ZS();
          var At = yS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return n0(e, n, S, At);
        } else if (Y3(c)) {
          n.flags |= _t, n.child = e.child;
          var Tt = Ak.bind(null, e);
          return dR(c, Tt), null;
        } else {
          KR(n, c, h.treeContext);
          var mn = o.children, fn = DS(n, mn);
          return fn.flags |= Da, fn;
        }
      }
    }
    function Cx(e, n, l) {
      e.lanes = en(e.lanes, n);
      var o = e.alternate;
      o !== null && (o.lanes = en(o.lanes, n)), xg(e.return, n, l);
    }
    function u_(e, n, l) {
      for (var o = n; o !== null; ) {
        if (o.tag === V) {
          var c = o.memoizedState;
          c !== null && Cx(o, l, e);
        } else if (o.tag === ne)
          Cx(o, l, e);
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
    function s_(e) {
      for (var n = e, l = null; n !== null; ) {
        var o = n.alternate;
        o !== null && Ny(o) === null && (l = n), n = n.sibling;
      }
      return l;
    }
    function c_(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !bS[e])
        if (bS[e] = !0, typeof e == "string")
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
    function f_(e, n) {
      e !== void 0 && !t0[e] && (e !== "collapsed" && e !== "hidden" ? (t0[e] = !0, v('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : n !== "forwards" && n !== "backwards" && (t0[e] = !0, v('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function bx(e, n) {
      {
        var l = rn(e), o = !l && typeof qt(e) == "function";
        if (l || o) {
          var c = l ? "array" : "iterable";
          return v("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", c, n, c), !1;
        }
      }
      return !0;
    }
    function d_(e, n) {
      if ((n === "forwards" || n === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (rn(e)) {
          for (var l = 0; l < e.length; l++)
            if (!bx(e[l], l))
              return;
        } else {
          var o = qt(e);
          if (typeof o == "function") {
            var c = o.call(e);
            if (c)
              for (var h = c.next(), S = 0; !h.done; h = c.next()) {
                if (!bx(h.value, S))
                  return;
                S++;
              }
          } else
            v('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', n);
        }
    }
    function AS(e, n, l, o, c) {
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
    function Tx(e, n, l) {
      var o = n.pendingProps, c = o.revealOrder, h = o.tail, S = o.children;
      c_(c), f_(h, c), d_(S, c), Za(e, n, S, l);
      var T = Pl.current, R = Dg(T, Av);
      if (R)
        T = Og(T, Av), n.flags |= _t;
      else {
        var L = e !== null && (e.flags & _t) !== kt;
        L && u_(n, n.child, l), T = Td(T);
      }
      if (gs(n, T), (n.mode & ln) === Dt)
        n.memoizedState = null;
      else
        switch (c) {
          case "forwards": {
            var U = s_(n.child), te;
            U === null ? (te = n.child, n.child = null) : (te = U.sibling, U.sibling = null), AS(
              n,
              !1,
              // isBackwards
              te,
              U,
              h
            );
            break;
          }
          case "backwards": {
            var J = null, ve = n.child;
            for (n.child = null; ve !== null; ) {
              var ge = ve.alternate;
              if (ge !== null && Ny(ge) === null) {
                n.child = ve;
                break;
              }
              var Ee = ve.sibling;
              ve.sibling = J, J = ve, ve = Ee;
            }
            AS(
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
            AS(
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
    function p_(e, n, l) {
      Mg(n, n.stateNode.containerInfo);
      var o = n.pendingProps;
      return e === null ? n.child = xd(n, null, o, l) : Za(e, n, o, l), n.child;
    }
    var Rx = !1;
    function v_(e, n, l) {
      var o = n.type, c = o._context, h = n.pendingProps, S = n.memoizedProps, T = h.value;
      {
        "value" in h || Rx || (Rx = !0, v("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var R = n.type.propTypes;
        R && Ul(R, h, "prop", "Context.Provider");
      }
      if (gE(n, c, T), S !== null) {
        var L = S.value;
        if (je(L, T)) {
          if (S.children === h.children && !fy())
            return xu(e, n, l);
        } else
          cM(n, c, l);
      }
      var U = h.children;
      return Za(e, n, U, l), n.child;
    }
    var Mx = !1;
    function h_(e, n, l) {
      var o = n.type;
      o._context === void 0 ? o !== o.Consumer && (Mx || (Mx = !0, v("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : o = o._context;
      var c = n.pendingProps, h = c.children;
      typeof h != "function" && v("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Cd(n, l);
      var S = Fr(o);
      Ga(n);
      var T;
      return Hv.current = n, Mr(!0), T = h(S), Mr(!1), Qa(), n.flags |= Ni, Za(e, n, T, l), n.child;
    }
    function qv() {
      Vl = !0;
    }
    function r0(e, n) {
      (n.mode & ln) === Dt && e !== null && (e.alternate = null, n.alternate = null, n.flags |= er);
    }
    function xu(e, n, l) {
      return e !== null && (n.dependencies = e.dependencies), nx(), nh(n.lanes), za(l, n.childLanes) ? (uM(e, n), n.child) : null;
    }
    function m_(e, n, l) {
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
        return h === null ? (o.deletions = [e], o.flags |= si) : h.push(e), l.flags |= er, l;
      }
    }
    function LS(e, n) {
      var l = e.lanes;
      return !!za(l, n);
    }
    function y_(e, n, l) {
      switch (n.tag) {
        case b:
          Sx(n), n.stateNode, Ed();
          break;
        case _:
          RE(n);
          break;
        case x: {
          var o = n.type;
          Ro(o) && py(n);
          break;
        }
        case M:
          Mg(n, n.stateNode.containerInfo);
          break;
        case W: {
          var c = n.memoizedProps.value, h = n.type._context;
          gE(n, h, c);
          break;
        }
        case j:
          {
            var S = za(l, n.childLanes);
            S && (n.flags |= pn);
            {
              var T = n.stateNode;
              T.effectDuration = 0, T.passiveEffectDuration = 0;
            }
          }
          break;
        case V: {
          var R = n.memoizedState;
          if (R !== null) {
            if (R.dehydrated !== null)
              return gs(n, Td(Pl.current)), n.flags |= _t, null;
            var L = n.child, U = L.childLanes;
            if (za(l, U))
              return xx(e, n, l);
            gs(n, Td(Pl.current));
            var te = xu(e, n, l);
            return te !== null ? te.sibling : null;
          } else
            gs(n, Td(Pl.current));
          break;
        }
        case ne: {
          var J = (e.flags & _t) !== kt, ve = za(l, n.childLanes);
          if (J) {
            if (ve)
              return Tx(e, n, l);
            n.flags |= _t;
          }
          var ge = n.memoizedState;
          if (ge !== null && (ge.rendering = null, ge.tail = null, ge.lastEffect = null), gs(n, Pl.current), ve)
            break;
          return null;
        }
        case G:
        case X:
          return n.lanes = Le, mx(e, n, l);
      }
      return xu(e, n, l);
    }
    function _x(e, n, l) {
      if (n._debugNeedsRemount && e !== null)
        return m_(e, n, s2(n.type, n.key, n.pendingProps, n._debugOwner || null, n.mode, n.lanes));
      if (e !== null) {
        var o = e.memoizedProps, c = n.pendingProps;
        if (o !== c || fy() || // Force a re-render if the implementation changed due to hot reload:
        n.type !== e.type)
          Vl = !0;
        else {
          var h = LS(e, l);
          if (!h && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (n.flags & _t) === kt)
            return Vl = !1, y_(e, n, l);
          (e.flags & Sf) !== kt ? Vl = !0 : Vl = !1;
        }
      } else if (Vl = !1, ga() && VR(n)) {
        var S = n.index, T = IR();
        nE(n, T, S);
      }
      switch (n.lanes = Le, n.tag) {
        case C:
          return ZM(e, n, n.type, l);
        case oe: {
          var R = n.elementType;
          return XM(e, n, R, l);
        }
        case g: {
          var L = n.type, U = n.pendingProps, te = n.elementType === L ? U : Hl(L, U);
          return TS(e, n, L, te, l);
        }
        case x: {
          var J = n.type, ve = n.pendingProps, ge = n.elementType === J ? ve : Hl(J, ve);
          return gx(e, n, J, ge, l);
        }
        case b:
          return BM(e, n, l);
        case _:
          return GM(e, n, l);
        case k:
          return QM(e, n);
        case V:
          return xx(e, n, l);
        case M:
          return p_(e, n, l);
        case P: {
          var Ee = n.type, at = n.pendingProps, At = n.elementType === Ee ? at : Hl(Ee, at);
          return px(e, n, Ee, At, l);
        }
        case A:
          return qM(e, n, l);
        case N:
          return YM(e, n, l);
        case j:
          return WM(e, n, l);
        case W:
          return v_(e, n, l);
        case F:
          return h_(e, n, l);
        case q: {
          var Tt = n.type, mn = n.pendingProps, fn = Hl(Tt, mn);
          if (n.type !== n.elementType) {
            var ce = Tt.propTypes;
            ce && Ul(
              ce,
              fn,
              // Resolved for outer only
              "prop",
              Sn(Tt)
            );
          }
          return fn = Hl(Tt.type, fn), vx(e, n, Tt, fn, l);
        }
        case H:
          return hx(e, n, n.type, n.pendingProps, l);
        case Q: {
          var xe = n.type, fe = n.pendingProps, He = n.elementType === xe ? fe : Hl(xe, fe);
          return KM(e, n, xe, He, l);
        }
        case ne:
          return Tx(e, n, l);
        case re:
          break;
        case G:
          return mx(e, n, l);
      }
      throw new Error("Unknown unit of work tag (" + n.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Od(e) {
      e.flags |= pn;
    }
    function kx(e) {
      e.flags |= ir, e.flags |= Ku;
    }
    var Dx, NS, Ox, Ax;
    Dx = function(e, n, l, o) {
      for (var c = n.child; c !== null; ) {
        if (c.tag === _ || c.tag === k)
          PT(e, c.stateNode);
        else if (c.tag !== M) {
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
    }, NS = function(e, n) {
    }, Ox = function(e, n, l, o, c) {
      var h = e.memoizedProps;
      if (h !== o) {
        var S = n.stateNode, T = _g(), R = HT(S, l, h, o, c, T);
        n.updateQueue = R, R && Od(n);
      }
    }, Ax = function(e, n, l, o) {
      l !== o && Od(n);
    };
    function Yv(e, n) {
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
    function Ea(e) {
      var n = e.alternate !== null && e.alternate.child === e.child, l = Le, o = kt;
      if (n) {
        if ((e.mode & bn) !== Dt) {
          for (var R = e.selfBaseDuration, L = e.child; L !== null; )
            l = en(l, en(L.lanes, L.childLanes)), o |= L.subtreeFlags & yr, o |= L.flags & yr, R += L.treeBaseDuration, L = L.sibling;
          e.treeBaseDuration = R;
        } else
          for (var U = e.child; U !== null; )
            l = en(l, en(U.lanes, U.childLanes)), o |= U.subtreeFlags & yr, o |= U.flags & yr, U.return = e, U = U.sibling;
        e.subtreeFlags |= o;
      } else {
        if ((e.mode & bn) !== Dt) {
          for (var c = e.actualDuration, h = e.selfBaseDuration, S = e.child; S !== null; )
            l = en(l, en(S.lanes, S.childLanes)), o |= S.subtreeFlags, o |= S.flags, c += S.actualDuration, h += S.treeBaseDuration, S = S.sibling;
          e.actualDuration = c, e.treeBaseDuration = h;
        } else
          for (var T = e.child; T !== null; )
            l = en(l, en(T.lanes, T.childLanes)), o |= T.subtreeFlags, o |= T.flags, T.return = e, T = T.sibling;
        e.subtreeFlags |= o;
      }
      return e.childLanes = l, n;
    }
    function g_(e, n, l) {
      if (nM() && (n.mode & ln) !== Dt && (n.flags & _t) === kt)
        return sE(n), Ed(), n.flags |= ea | Js | Nr, !1;
      var o = gy(n);
      if (l !== null && l.dehydrated !== null)
        if (e === null) {
          if (!o)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (eM(n), Ea(n), (n.mode & bn) !== Dt) {
            var c = l !== null;
            if (c) {
              var h = n.child;
              h !== null && (n.treeBaseDuration -= h.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Ed(), (n.flags & _t) === kt && (n.memoizedState = null), n.flags |= pn, Ea(n), (n.mode & bn) !== Dt) {
            var S = l !== null;
            if (S) {
              var T = n.child;
              T !== null && (n.treeBaseDuration -= T.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return cE(), !0;
    }
    function Lx(e, n, l) {
      var o = n.pendingProps;
      switch (lg(n), n.tag) {
        case C:
        case oe:
        case H:
        case g:
        case P:
        case A:
        case N:
        case j:
        case F:
        case q:
          return Ea(n), null;
        case x: {
          var c = n.type;
          return Ro(c) && dy(n), Ea(n), null;
        }
        case b: {
          var h = n.stateNode;
          if (bd(n), ng(n), Lg(), h.pendingContext && (h.context = h.pendingContext, h.pendingContext = null), e === null || e.child === null) {
            var S = gy(n);
            if (S)
              Od(n);
            else if (e !== null) {
              var T = e.memoizedState;
              // Check if this is a client root
              (!T.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (n.flags & ea) !== kt) && (n.flags |= _r, cE());
            }
          }
          return NS(e, n), Ea(n), null;
        }
        case _: {
          kg(n);
          var R = TE(), L = n.type;
          if (e !== null && n.stateNode != null)
            Ox(e, n, L, o, R), e.ref !== n.ref && kx(n);
          else {
            if (!o) {
              if (n.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Ea(n), null;
            }
            var U = _g(), te = gy(n);
            if (te)
              ZR(n, R, U) && Od(n);
            else {
              var J = FT(L, o, R, U, n);
              Dx(J, n, !1, !1), n.stateNode = J, $T(J, L, o, R) && Od(n);
            }
            n.ref !== null && kx(n);
          }
          return Ea(n), null;
        }
        case k: {
          var ve = o;
          if (e && n.stateNode != null) {
            var ge = e.memoizedProps;
            Ax(e, n, ge, ve);
          } else {
            if (typeof ve != "string" && n.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var Ee = TE(), at = _g(), At = gy(n);
            At ? JR(n) && Od(n) : n.stateNode = VT(ve, Ee, at, n);
          }
          return Ea(n), null;
        }
        case V: {
          Rd(n);
          var Tt = n.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var mn = g_(e, n, Tt);
            if (!mn)
              return n.flags & Nr ? n : null;
          }
          if ((n.flags & _t) !== kt)
            return n.lanes = l, (n.mode & bn) !== Dt && aS(n), n;
          var fn = Tt !== null, ce = e !== null && e.memoizedState !== null;
          if (fn !== ce && fn) {
            var xe = n.child;
            if (xe.flags |= mr, (n.mode & ln) !== Dt) {
              var fe = e === null && (n.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              fe || Dg(Pl.current, _E) ? Sk() : ZS();
            }
          }
          var He = n.updateQueue;
          if (He !== null && (n.flags |= pn), Ea(n), (n.mode & bn) !== Dt && fn) {
            var pt = n.child;
            pt !== null && (n.treeBaseDuration -= pt.treeBaseDuration);
          }
          return null;
        }
        case M:
          return bd(n), NS(e, n), e === null && zR(n.stateNode.containerInfo), Ea(n), null;
        case W:
          var lt = n.type._context;
          return Eg(lt, n), Ea(n), null;
        case Q: {
          var Vt = n.type;
          return Ro(Vt) && dy(n), Ea(n), null;
        }
        case ne: {
          Rd(n);
          var Qt = n.memoizedState;
          if (Qt === null)
            return Ea(n), null;
          var Un = (n.flags & _t) !== kt, Mn = Qt.rendering;
          if (Mn === null)
            if (Un)
              Yv(Qt, !1);
            else {
              var Or = xk() && (e === null || (e.flags & _t) === kt);
              if (!Or)
                for (var _n = n.child; _n !== null; ) {
                  var Cr = Ny(_n);
                  if (Cr !== null) {
                    Un = !0, n.flags |= _t, Yv(Qt, !1);
                    var Va = Cr.updateQueue;
                    return Va !== null && (n.updateQueue = Va, n.flags |= pn), n.subtreeFlags = kt, sM(n, l), gs(n, Og(Pl.current, Av)), n.child;
                  }
                  _n = _n.sibling;
                }
              Qt.tail !== null && kr() > ew() && (n.flags |= _t, Un = !0, Yv(Qt, !1), n.lanes = jp);
            }
          else {
            if (!Un) {
              var Ta = Ny(Mn);
              if (Ta !== null) {
                n.flags |= _t, Un = !0;
                var Hi = Ta.updateQueue;
                if (Hi !== null && (n.updateQueue = Hi, n.flags |= pn), Yv(Qt, !0), Qt.tail === null && Qt.tailMode === "hidden" && !Mn.alternate && !ga())
                  return Ea(n), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              kr() * 2 - Qt.renderingStartTime > ew() && l !== Na && (n.flags |= _t, Un = !0, Yv(Qt, !1), n.lanes = jp);
            }
            if (Qt.isBackwards)
              Mn.sibling = n.child, n.child = Mn;
            else {
              var ti = Qt.last;
              ti !== null ? ti.sibling = Mn : n.child = Mn, Qt.last = Mn;
            }
          }
          if (Qt.tail !== null) {
            var ni = Qt.tail;
            Qt.rendering = ni, Qt.tail = ni.sibling, Qt.renderingStartTime = kr(), ni.sibling = null;
            var Ia = Pl.current;
            return Un ? Ia = Og(Ia, Av) : Ia = Td(Ia), gs(n, Ia), ni;
          }
          return Ea(n), null;
        }
        case re:
          break;
        case G:
        case X: {
          KS(n);
          var Ru = n.memoizedState, Pd = Ru !== null;
          if (e !== null) {
            var oh = e.memoizedState, No = oh !== null;
            No !== Pd && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !he && (n.flags |= mr);
          }
          return !Pd || (n.mode & ln) === Dt ? Ea(n) : za(Lo, Na) && (Ea(n), n.subtreeFlags & (er | pn) && (n.flags |= mr)), null;
        }
        case ae:
          return null;
        case de:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + n.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function S_(e, n, l) {
      switch (lg(n), n.tag) {
        case x: {
          var o = n.type;
          Ro(o) && dy(n);
          var c = n.flags;
          return c & Nr ? (n.flags = c & ~Nr | _t, (n.mode & bn) !== Dt && aS(n), n) : null;
        }
        case b: {
          n.stateNode, bd(n), ng(n), Lg();
          var h = n.flags;
          return (h & Nr) !== kt && (h & _t) === kt ? (n.flags = h & ~Nr | _t, n) : null;
        }
        case _:
          return kg(n), null;
        case V: {
          Rd(n);
          var S = n.memoizedState;
          if (S !== null && S.dehydrated !== null) {
            if (n.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Ed();
          }
          var T = n.flags;
          return T & Nr ? (n.flags = T & ~Nr | _t, (n.mode & bn) !== Dt && aS(n), n) : null;
        }
        case ne:
          return Rd(n), null;
        case M:
          return bd(n), null;
        case W:
          var R = n.type._context;
          return Eg(R, n), null;
        case G:
        case X:
          return KS(n), null;
        case ae:
          return null;
        default:
          return null;
      }
    }
    function Nx(e, n, l) {
      switch (lg(n), n.tag) {
        case x: {
          var o = n.type.childContextTypes;
          o != null && dy(n);
          break;
        }
        case b: {
          n.stateNode, bd(n), ng(n), Lg();
          break;
        }
        case _: {
          kg(n);
          break;
        }
        case M:
          bd(n);
          break;
        case V:
          Rd(n);
          break;
        case ne:
          Rd(n);
          break;
        case W:
          var c = n.type._context;
          Eg(c, n);
          break;
        case G:
        case X:
          KS(n);
          break;
      }
    }
    var zx = null;
    zx = /* @__PURE__ */ new Set();
    var a0 = !1, xa = !1, E_ = typeof WeakSet == "function" ? WeakSet : Set, gt = null, Ad = null, Ld = null;
    function x_(e) {
      oo(null, function() {
        throw e;
      }), Zs();
    }
    var w_ = function(e, n) {
      if (n.props = e.memoizedProps, n.state = e.memoizedState, e.mode & bn)
        try {
          Oo(), n.componentWillUnmount();
        } finally {
          Do(e);
        }
      else
        n.componentWillUnmount();
    };
    function Ux(e, n) {
      try {
        xs(Br, e);
      } catch (l) {
        Yn(e, n, l);
      }
    }
    function zS(e, n, l) {
      try {
        w_(e, l);
      } catch (o) {
        Yn(e, n, o);
      }
    }
    function C_(e, n, l) {
      try {
        l.componentDidMount();
      } catch (o) {
        Yn(e, n, o);
      }
    }
    function jx(e, n) {
      try {
        Px(e);
      } catch (l) {
        Yn(e, n, l);
      }
    }
    function Nd(e, n) {
      var l = e.ref;
      if (l !== null)
        if (typeof l == "function") {
          var o;
          try {
            if (be && Fe && e.mode & bn)
              try {
                Oo(), o = l(null);
              } finally {
                Do(e);
              }
            else
              o = l(null);
          } catch (c) {
            Yn(e, n, c);
          }
          typeof o == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Wt(e));
        } else
          l.current = null;
    }
    function i0(e, n, l) {
      try {
        l();
      } catch (o) {
        Yn(e, n, o);
      }
    }
    var Fx = !1;
    function b_(e, n) {
      UT(e.containerInfo), gt = n, T_();
      var l = Fx;
      return Fx = !1, l;
    }
    function T_() {
      for (; gt !== null; ) {
        var e = gt, n = e.child;
        (e.subtreeFlags & so) !== kt && n !== null ? (n.return = e, gt = n) : R_();
      }
    }
    function R_() {
      for (; gt !== null; ) {
        var e = gt;
        On(e);
        try {
          M_(e);
        } catch (l) {
          Yn(e, e.return, l);
        }
        qn();
        var n = e.sibling;
        if (n !== null) {
          n.return = e.return, gt = n;
          return;
        }
        gt = e.return;
      }
    }
    function M_(e) {
      var n = e.alternate, l = e.flags;
      if ((l & _r) !== kt) {
        switch (On(e), e.tag) {
          case g:
          case P:
          case H:
            break;
          case x: {
            if (n !== null) {
              var o = n.memoizedProps, c = n.memoizedState, h = e.stateNode;
              e.type === e.elementType && !Yc && (h.props !== e.memoizedProps && v("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Wt(e) || "instance"), h.state !== e.memoizedState && v("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Wt(e) || "instance"));
              var S = h.getSnapshotBeforeUpdate(e.elementType === e.type ? o : Hl(e.type, o), c);
              {
                var T = zx;
                S === void 0 && !T.has(e.type) && (T.add(e.type), v("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Wt(e)));
              }
              h.__reactInternalSnapshotBeforeUpdate = S;
            }
            break;
          }
          case b: {
            {
              var R = e.stateNode;
              oR(R.containerInfo);
            }
            break;
          }
          case _:
          case k:
          case M:
          case Q:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        qn();
      }
    }
    function Il(e, n, l) {
      var o = n.updateQueue, c = o !== null ? o.lastEffect : null;
      if (c !== null) {
        var h = c.next, S = h;
        do {
          if ((S.tag & e) === e) {
            var T = S.destroy;
            S.destroy = void 0, T !== void 0 && ((e & Sa) !== Ei ? Dl(n) : (e & Br) !== Ei && tc(n), (e & Mo) !== Ei && ah(!0), i0(n, l, T), (e & Mo) !== Ei && ah(!1), (e & Sa) !== Ei ? vo() : (e & Br) !== Ei && zp());
          }
          S = S.next;
        } while (S !== h);
      }
    }
    function xs(e, n) {
      var l = n.updateQueue, o = l !== null ? l.lastEffect : null;
      if (o !== null) {
        var c = o.next, h = c;
        do {
          if ((h.tag & e) === e) {
            (e & Sa) !== Ei ? Np(n) : (e & Br) !== Ei && Tf(n);
            var S = h.create;
            (e & Mo) !== Ei && ah(!0), h.destroy = S(), (e & Mo) !== Ei && ah(!1), (e & Sa) !== Ei ? cm() : (e & Br) !== Ei && fm();
            {
              var T = h.destroy;
              if (T !== void 0 && typeof T != "function") {
                var R = void 0;
                (h.tag & Br) !== kt ? R = "useLayoutEffect" : (h.tag & Mo) !== kt ? R = "useInsertionEffect" : R = "useEffect";
                var L = void 0;
                T === null ? L = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof T.then == "function" ? L = `

It looks like you wrote ` + R + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + R + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : L = " You returned: " + T, v("%s must not return anything besides a function, which is used for clean-up.%s", R, L);
              }
            }
          }
          h = h.next;
        } while (h !== c);
      }
    }
    function __(e, n) {
      if ((n.flags & pn) !== kt)
        switch (n.tag) {
          case j: {
            var l = n.stateNode.passiveEffectDuration, o = n.memoizedProps, c = o.id, h = o.onPostCommit, S = ex(), T = n.alternate === null ? "mount" : "update";
            JE() && (T = "nested-update"), typeof h == "function" && h(c, T, l, S);
            var R = n.return;
            e: for (; R !== null; ) {
              switch (R.tag) {
                case b:
                  var L = R.stateNode;
                  L.passiveEffectDuration += l;
                  break e;
                case j:
                  var U = R.stateNode;
                  U.passiveEffectDuration += l;
                  break e;
              }
              R = R.return;
            }
            break;
          }
        }
    }
    function k_(e, n, l, o) {
      if ((l.flags & fo) !== kt)
        switch (l.tag) {
          case g:
          case P:
          case H: {
            if (!xa)
              if (l.mode & bn)
                try {
                  Oo(), xs(Br | Wr, l);
                } finally {
                  Do(l);
                }
              else
                xs(Br | Wr, l);
            break;
          }
          case x: {
            var c = l.stateNode;
            if (l.flags & pn && !xa)
              if (n === null)
                if (l.type === l.elementType && !Yc && (c.props !== l.memoizedProps && v("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Wt(l) || "instance"), c.state !== l.memoizedState && v("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Wt(l) || "instance")), l.mode & bn)
                  try {
                    Oo(), c.componentDidMount();
                  } finally {
                    Do(l);
                  }
                else
                  c.componentDidMount();
              else {
                var h = l.elementType === l.type ? n.memoizedProps : Hl(l.type, n.memoizedProps), S = n.memoizedState;
                if (l.type === l.elementType && !Yc && (c.props !== l.memoizedProps && v("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Wt(l) || "instance"), c.state !== l.memoizedState && v("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Wt(l) || "instance")), l.mode & bn)
                  try {
                    Oo(), c.componentDidUpdate(h, S, c.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Do(l);
                  }
                else
                  c.componentDidUpdate(h, S, c.__reactInternalSnapshotBeforeUpdate);
              }
            var T = l.updateQueue;
            T !== null && (l.type === l.elementType && !Yc && (c.props !== l.memoizedProps && v("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Wt(l) || "instance"), c.state !== l.memoizedState && v("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Wt(l) || "instance")), bE(l, T, c));
            break;
          }
          case b: {
            var R = l.updateQueue;
            if (R !== null) {
              var L = null;
              if (l.child !== null)
                switch (l.child.tag) {
                  case _:
                    L = l.child.stateNode;
                    break;
                  case x:
                    L = l.child.stateNode;
                    break;
                }
              bE(l, R, L);
            }
            break;
          }
          case _: {
            var U = l.stateNode;
            if (n === null && l.flags & pn) {
              var te = l.type, J = l.memoizedProps;
              BT(U, te, J);
            }
            break;
          }
          case k:
            break;
          case M:
            break;
          case j: {
            {
              var ve = l.memoizedProps, ge = ve.onCommit, Ee = ve.onRender, at = l.stateNode.effectDuration, At = ex(), Tt = n === null ? "mount" : "update";
              JE() && (Tt = "nested-update"), typeof Ee == "function" && Ee(l.memoizedProps.id, Tt, l.actualDuration, l.treeBaseDuration, l.actualStartTime, At);
              {
                typeof ge == "function" && ge(l.memoizedProps.id, Tt, at, At), Rk(l);
                var mn = l.return;
                e: for (; mn !== null; ) {
                  switch (mn.tag) {
                    case b:
                      var fn = mn.stateNode;
                      fn.effectDuration += at;
                      break e;
                    case j:
                      var ce = mn.stateNode;
                      ce.effectDuration += at;
                      break e;
                  }
                  mn = mn.return;
                }
              }
            }
            break;
          }
          case V: {
            j_(e, l);
            break;
          }
          case ne:
          case Q:
          case re:
          case G:
          case X:
          case de:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      xa || l.flags & ir && Px(l);
    }
    function D_(e) {
      switch (e.tag) {
        case g:
        case P:
        case H: {
          if (e.mode & bn)
            try {
              Oo(), Ux(e, e.return);
            } finally {
              Do(e);
            }
          else
            Ux(e, e.return);
          break;
        }
        case x: {
          var n = e.stateNode;
          typeof n.componentDidMount == "function" && C_(e, e.return, n), jx(e, e.return);
          break;
        }
        case _: {
          jx(e, e.return);
          break;
        }
      }
    }
    function O_(e, n) {
      for (var l = null, o = e; ; ) {
        if (o.tag === _) {
          if (l === null) {
            l = o;
            try {
              var c = o.stateNode;
              n ? rR(c) : iR(o.stateNode, o.memoizedProps);
            } catch (S) {
              Yn(e, e.return, S);
            }
          }
        } else if (o.tag === k) {
          if (l === null)
            try {
              var h = o.stateNode;
              n ? aR(h) : lR(h, o.memoizedProps);
            } catch (S) {
              Yn(e, e.return, S);
            }
        } else if (!((o.tag === G || o.tag === X) && o.memoizedState !== null && o !== e)) {
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
    function Px(e) {
      var n = e.ref;
      if (n !== null) {
        var l = e.stateNode, o;
        if (e.tag === _ ? o = l : o = l, typeof n == "function") {
          var c;
          if (e.mode & bn)
            try {
              Oo(), c = n(o);
            } finally {
              Do(e);
            }
          else
            c = n(o);
          typeof c == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Wt(e));
        } else
          n.hasOwnProperty("current") || v("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Wt(e)), n.current = o;
      }
    }
    function A_(e) {
      var n = e.alternate;
      n !== null && (n.return = null), e.return = null;
    }
    function $x(e) {
      var n = e.alternate;
      n !== null && (e.alternate = null, $x(n));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === _) {
          var l = e.stateNode;
          l !== null && FR(l);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function L_(e) {
      for (var n = e.return; n !== null; ) {
        if (Hx(n))
          return n;
        n = n.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Hx(e) {
      return e.tag === _ || e.tag === b || e.tag === M;
    }
    function Vx(e) {
      var n = e;
      e: for (; ; ) {
        for (; n.sibling === null; ) {
          if (n.return === null || Hx(n.return))
            return null;
          n = n.return;
        }
        for (n.sibling.return = n.return, n = n.sibling; n.tag !== _ && n.tag !== k && n.tag !== $; ) {
          if (n.flags & er || n.child === null || n.tag === M)
            continue e;
          n.child.return = n, n = n.child;
        }
        if (!(n.flags & er))
          return n.stateNode;
      }
    }
    function N_(e) {
      var n = L_(e);
      switch (n.tag) {
        case _: {
          var l = n.stateNode;
          n.flags & ci && (q3(l), n.flags &= ~ci);
          var o = Vx(e);
          jS(e, o, l);
          break;
        }
        case b:
        case M: {
          var c = n.stateNode.containerInfo, h = Vx(e);
          US(e, h, c);
          break;
        }
        // eslint-disable-next-line-no-fallthrough
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function US(e, n, l) {
      var o = e.tag, c = o === _ || o === k;
      if (c) {
        var h = e.stateNode;
        n ? JT(l, h, n) : KT(l, h);
      } else if (o !== M) {
        var S = e.child;
        if (S !== null) {
          US(S, n, l);
          for (var T = S.sibling; T !== null; )
            US(T, n, l), T = T.sibling;
        }
      }
    }
    function jS(e, n, l) {
      var o = e.tag, c = o === _ || o === k;
      if (c) {
        var h = e.stateNode;
        n ? ZT(l, h, n) : XT(l, h);
      } else if (o !== M) {
        var S = e.child;
        if (S !== null) {
          jS(S, n, l);
          for (var T = S.sibling; T !== null; )
            jS(T, n, l), T = T.sibling;
        }
      }
    }
    var wa = null, ql = !1;
    function z_(e, n, l) {
      {
        var o = n;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case _: {
              wa = o.stateNode, ql = !1;
              break e;
            }
            case b: {
              wa = o.stateNode.containerInfo, ql = !0;
              break e;
            }
            case M: {
              wa = o.stateNode.containerInfo, ql = !0;
              break e;
            }
          }
          o = o.return;
        }
        if (wa === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        Ix(e, n, l), wa = null, ql = !1;
      }
      A_(l);
    }
    function ws(e, n, l) {
      for (var o = l.child; o !== null; )
        Ix(e, n, o), o = o.sibling;
    }
    function Ix(e, n, l) {
      switch (Op(l), l.tag) {
        case _:
          xa || Nd(l, n);
        // eslint-disable-next-line-no-fallthrough
        case k: {
          {
            var o = wa, c = ql;
            wa = null, ws(e, n, l), wa = o, ql = c, wa !== null && (ql ? tR(wa, l.stateNode) : eR(wa, l.stateNode));
          }
          return;
        }
        case $: {
          wa !== null && (ql ? nR(wa, l.stateNode) : G1(wa, l.stateNode));
          return;
        }
        case M: {
          {
            var h = wa, S = ql;
            wa = l.stateNode.containerInfo, ql = !0, ws(e, n, l), wa = h, ql = S;
          }
          return;
        }
        case g:
        case P:
        case q:
        case H: {
          if (!xa) {
            var T = l.updateQueue;
            if (T !== null) {
              var R = T.lastEffect;
              if (R !== null) {
                var L = R.next, U = L;
                do {
                  var te = U, J = te.destroy, ve = te.tag;
                  J !== void 0 && ((ve & Mo) !== Ei ? i0(l, n, J) : (ve & Br) !== Ei && (tc(l), l.mode & bn ? (Oo(), i0(l, n, J), Do(l)) : i0(l, n, J), zp())), U = U.next;
                } while (U !== L);
              }
            }
          }
          ws(e, n, l);
          return;
        }
        case x: {
          if (!xa) {
            Nd(l, n);
            var ge = l.stateNode;
            typeof ge.componentWillUnmount == "function" && zS(l, n, ge);
          }
          ws(e, n, l);
          return;
        }
        case re: {
          ws(e, n, l);
          return;
        }
        case G: {
          if (
            // TODO: Remove this dead flag
            l.mode & ln
          ) {
            var Ee = xa;
            xa = Ee || l.memoizedState !== null, ws(e, n, l), xa = Ee;
          } else
            ws(e, n, l);
          break;
        }
        default: {
          ws(e, n, l);
          return;
        }
      }
    }
    function U_(e) {
      e.memoizedState;
    }
    function j_(e, n) {
      var l = n.memoizedState;
      if (l === null) {
        var o = n.alternate;
        if (o !== null) {
          var c = o.memoizedState;
          if (c !== null) {
            var h = c.dehydrated;
            h !== null && xR(h);
          }
        }
      }
    }
    function qx(e) {
      var n = e.updateQueue;
      if (n !== null) {
        e.updateQueue = null;
        var l = e.stateNode;
        l === null && (l = e.stateNode = new E_()), n.forEach(function(o) {
          var c = Lk.bind(null, e, o);
          if (!l.has(o)) {
            if (l.add(o), La)
              if (Ad !== null && Ld !== null)
                rh(Ld, Ad);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            o.then(c, c);
          }
        });
      }
    }
    function F_(e, n, l) {
      Ad = l, Ld = e, On(n), Yx(n, e), On(n), Ad = null, Ld = null;
    }
    function Yl(e, n, l) {
      var o = n.deletions;
      if (o !== null)
        for (var c = 0; c < o.length; c++) {
          var h = o[c];
          try {
            z_(e, n, h);
          } catch (R) {
            Yn(h, n, R);
          }
        }
      var S = eo();
      if (n.subtreeFlags & co)
        for (var T = n.child; T !== null; )
          On(T), Yx(T, e), T = T.sibling;
      On(S);
    }
    function Yx(e, n, l) {
      var o = e.alternate, c = e.flags;
      switch (e.tag) {
        case g:
        case P:
        case q:
        case H: {
          if (Yl(n, e), Ao(e), c & pn) {
            try {
              Il(Mo | Wr, e, e.return), xs(Mo | Wr, e);
            } catch (Vt) {
              Yn(e, e.return, Vt);
            }
            if (e.mode & bn) {
              try {
                Oo(), Il(Br | Wr, e, e.return);
              } catch (Vt) {
                Yn(e, e.return, Vt);
              }
              Do(e);
            } else
              try {
                Il(Br | Wr, e, e.return);
              } catch (Vt) {
                Yn(e, e.return, Vt);
              }
          }
          return;
        }
        case x: {
          Yl(n, e), Ao(e), c & ir && o !== null && Nd(o, o.return);
          return;
        }
        case _: {
          Yl(n, e), Ao(e), c & ir && o !== null && Nd(o, o.return);
          {
            if (e.flags & ci) {
              var h = e.stateNode;
              try {
                q3(h);
              } catch (Vt) {
                Yn(e, e.return, Vt);
              }
            }
            if (c & pn) {
              var S = e.stateNode;
              if (S != null) {
                var T = e.memoizedProps, R = o !== null ? o.memoizedProps : T, L = e.type, U = e.updateQueue;
                if (e.updateQueue = null, U !== null)
                  try {
                    GT(S, U, L, R, T, e);
                  } catch (Vt) {
                    Yn(e, e.return, Vt);
                  }
              }
            }
          }
          return;
        }
        case k: {
          if (Yl(n, e), Ao(e), c & pn) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var te = e.stateNode, J = e.memoizedProps, ve = o !== null ? o.memoizedProps : J;
            try {
              QT(te, ve, J);
            } catch (Vt) {
              Yn(e, e.return, Vt);
            }
          }
          return;
        }
        case b: {
          if (Yl(n, e), Ao(e), c & pn && o !== null) {
            var ge = o.memoizedState;
            if (ge.isDehydrated)
              try {
                ER(n.containerInfo);
              } catch (Vt) {
                Yn(e, e.return, Vt);
              }
          }
          return;
        }
        case M: {
          Yl(n, e), Ao(e);
          return;
        }
        case V: {
          Yl(n, e), Ao(e);
          var Ee = e.child;
          if (Ee.flags & mr) {
            var at = Ee.stateNode, At = Ee.memoizedState, Tt = At !== null;
            if (at.isHidden = Tt, Tt) {
              var mn = Ee.alternate !== null && Ee.alternate.memoizedState !== null;
              mn || gk();
            }
          }
          if (c & pn) {
            try {
              U_(e);
            } catch (Vt) {
              Yn(e, e.return, Vt);
            }
            qx(e);
          }
          return;
        }
        case G: {
          var fn = o !== null && o.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & ln
          ) {
            var ce = xa;
            xa = ce || fn, Yl(n, e), xa = ce;
          } else
            Yl(n, e);
          if (Ao(e), c & mr) {
            var xe = e.stateNode, fe = e.memoizedState, He = fe !== null, pt = e;
            if (xe.isHidden = He, He && !fn && (pt.mode & ln) !== Dt) {
              gt = pt;
              for (var lt = pt.child; lt !== null; )
                gt = lt, $_(lt), lt = lt.sibling;
            }
            O_(pt, He);
          }
          return;
        }
        case ne: {
          Yl(n, e), Ao(e), c & pn && qx(e);
          return;
        }
        case re:
          return;
        default: {
          Yl(n, e), Ao(e);
          return;
        }
      }
    }
    function Ao(e) {
      var n = e.flags;
      if (n & er) {
        try {
          N_(e);
        } catch (l) {
          Yn(e, e.return, l);
        }
        e.flags &= ~er;
      }
      n & Da && (e.flags &= ~Da);
    }
    function P_(e, n, l) {
      Ad = l, Ld = n, gt = e, Wx(e, n, l), Ad = null, Ld = null;
    }
    function Wx(e, n, l) {
      for (var o = (e.mode & ln) !== Dt; gt !== null; ) {
        var c = gt, h = c.child;
        if (c.tag === G && o) {
          var S = c.memoizedState !== null, T = S || a0;
          if (T) {
            FS(e, n, l);
            continue;
          } else {
            var R = c.alternate, L = R !== null && R.memoizedState !== null, U = L || xa, te = a0, J = xa;
            a0 = T, xa = U, xa && !J && (gt = c, H_(c));
            for (var ve = h; ve !== null; )
              gt = ve, Wx(
                ve,
                // New root; bubble back up to here and stop.
                n,
                l
              ), ve = ve.sibling;
            gt = c, a0 = te, xa = J, FS(e, n, l);
            continue;
          }
        }
        (c.subtreeFlags & fo) !== kt && h !== null ? (h.return = c, gt = h) : FS(e, n, l);
      }
    }
    function FS(e, n, l) {
      for (; gt !== null; ) {
        var o = gt;
        if ((o.flags & fo) !== kt) {
          var c = o.alternate;
          On(o);
          try {
            k_(n, c, o, l);
          } catch (S) {
            Yn(o, o.return, S);
          }
          qn();
        }
        if (o === e) {
          gt = null;
          return;
        }
        var h = o.sibling;
        if (h !== null) {
          h.return = o.return, gt = h;
          return;
        }
        gt = o.return;
      }
    }
    function $_(e) {
      for (; gt !== null; ) {
        var n = gt, l = n.child;
        switch (n.tag) {
          case g:
          case P:
          case q:
          case H: {
            if (n.mode & bn)
              try {
                Oo(), Il(Br, n, n.return);
              } finally {
                Do(n);
              }
            else
              Il(Br, n, n.return);
            break;
          }
          case x: {
            Nd(n, n.return);
            var o = n.stateNode;
            typeof o.componentWillUnmount == "function" && zS(n, n.return, o);
            break;
          }
          case _: {
            Nd(n, n.return);
            break;
          }
          case G: {
            var c = n.memoizedState !== null;
            if (c) {
              Bx(e);
              continue;
            }
            break;
          }
        }
        l !== null ? (l.return = n, gt = l) : Bx(e);
      }
    }
    function Bx(e) {
      for (; gt !== null; ) {
        var n = gt;
        if (n === e) {
          gt = null;
          return;
        }
        var l = n.sibling;
        if (l !== null) {
          l.return = n.return, gt = l;
          return;
        }
        gt = n.return;
      }
    }
    function H_(e) {
      for (; gt !== null; ) {
        var n = gt, l = n.child;
        if (n.tag === G) {
          var o = n.memoizedState !== null;
          if (o) {
            Gx(e);
            continue;
          }
        }
        l !== null ? (l.return = n, gt = l) : Gx(e);
      }
    }
    function Gx(e) {
      for (; gt !== null; ) {
        var n = gt;
        On(n);
        try {
          D_(n);
        } catch (o) {
          Yn(n, n.return, o);
        }
        if (qn(), n === e) {
          gt = null;
          return;
        }
        var l = n.sibling;
        if (l !== null) {
          l.return = n.return, gt = l;
          return;
        }
        gt = n.return;
      }
    }
    function V_(e, n, l, o) {
      gt = n, I_(n, e, l, o);
    }
    function I_(e, n, l, o) {
      for (; gt !== null; ) {
        var c = gt, h = c.child;
        (c.subtreeFlags & _l) !== kt && h !== null ? (h.return = c, gt = h) : q_(e, n, l, o);
      }
    }
    function q_(e, n, l, o) {
      for (; gt !== null; ) {
        var c = gt;
        if ((c.flags & ka) !== kt) {
          On(c);
          try {
            Y_(n, c, l, o);
          } catch (S) {
            Yn(c, c.return, S);
          }
          qn();
        }
        if (c === e) {
          gt = null;
          return;
        }
        var h = c.sibling;
        if (h !== null) {
          h.return = c.return, gt = h;
          return;
        }
        gt = c.return;
      }
    }
    function Y_(e, n, l, o) {
      switch (n.tag) {
        case g:
        case P:
        case H: {
          if (n.mode & bn) {
            rS();
            try {
              xs(Sa | Wr, n);
            } finally {
              nS(n);
            }
          } else
            xs(Sa | Wr, n);
          break;
        }
      }
    }
    function W_(e) {
      gt = e, B_();
    }
    function B_() {
      for (; gt !== null; ) {
        var e = gt, n = e.child;
        if ((gt.flags & si) !== kt) {
          var l = e.deletions;
          if (l !== null) {
            for (var o = 0; o < l.length; o++) {
              var c = l[o];
              gt = c, X_(c, e);
            }
            {
              var h = e.alternate;
              if (h !== null) {
                var S = h.child;
                if (S !== null) {
                  h.child = null;
                  do {
                    var T = S.sibling;
                    S.sibling = null, S = T;
                  } while (S !== null);
                }
              }
            }
            gt = e;
          }
        }
        (e.subtreeFlags & _l) !== kt && n !== null ? (n.return = e, gt = n) : G_();
      }
    }
    function G_() {
      for (; gt !== null; ) {
        var e = gt;
        (e.flags & ka) !== kt && (On(e), Q_(e), qn());
        var n = e.sibling;
        if (n !== null) {
          n.return = e.return, gt = n;
          return;
        }
        gt = e.return;
      }
    }
    function Q_(e) {
      switch (e.tag) {
        case g:
        case P:
        case H: {
          e.mode & bn ? (rS(), Il(Sa | Wr, e, e.return), nS(e)) : Il(Sa | Wr, e, e.return);
          break;
        }
      }
    }
    function X_(e, n) {
      for (; gt !== null; ) {
        var l = gt;
        On(l), Z_(l, n), qn();
        var o = l.child;
        o !== null ? (o.return = l, gt = o) : K_(e);
      }
    }
    function K_(e) {
      for (; gt !== null; ) {
        var n = gt, l = n.sibling, o = n.return;
        if ($x(n), n === e) {
          gt = null;
          return;
        }
        if (l !== null) {
          l.return = o, gt = l;
          return;
        }
        gt = o;
      }
    }
    function Z_(e, n) {
      switch (e.tag) {
        case g:
        case P:
        case H: {
          e.mode & bn ? (rS(), Il(Sa, e, n), nS(e)) : Il(Sa, e, n);
          break;
        }
      }
    }
    function J_(e) {
      switch (e.tag) {
        case g:
        case P:
        case H: {
          try {
            xs(Br | Wr, e);
          } catch (l) {
            Yn(e, e.return, l);
          }
          break;
        }
        case x: {
          var n = e.stateNode;
          try {
            n.componentDidMount();
          } catch (l) {
            Yn(e, e.return, l);
          }
          break;
        }
      }
    }
    function ek(e) {
      switch (e.tag) {
        case g:
        case P:
        case H: {
          try {
            xs(Sa | Wr, e);
          } catch (n) {
            Yn(e, e.return, n);
          }
          break;
        }
      }
    }
    function tk(e) {
      switch (e.tag) {
        case g:
        case P:
        case H: {
          try {
            Il(Br | Wr, e, e.return);
          } catch (l) {
            Yn(e, e.return, l);
          }
          break;
        }
        case x: {
          var n = e.stateNode;
          typeof n.componentWillUnmount == "function" && zS(e, e.return, n);
          break;
        }
      }
    }
    function nk(e) {
      switch (e.tag) {
        case g:
        case P:
        case H:
          try {
            Il(Sa | Wr, e, e.return);
          } catch (n) {
            Yn(e, e.return, n);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Wv = Symbol.for;
      Wv("selector.component"), Wv("selector.has_pseudo_class"), Wv("selector.role"), Wv("selector.test_id"), Wv("selector.text");
    }
    var rk = [];
    function ak() {
      rk.forEach(function(e) {
        return e();
      });
    }
    var ik = u.ReactCurrentActQueue;
    function lk(e) {
      {
        var n = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), l = typeof jest < "u";
        return l && n !== !1;
      }
    }
    function Qx() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && ik.current !== null && v("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var ok = Math.ceil, PS = u.ReactCurrentDispatcher, $S = u.ReactCurrentOwner, Ca = u.ReactCurrentBatchConfig, Wl = u.ReactCurrentActQueue, Xr = (
      /*             */
      0
    ), Xx = (
      /*               */
      1
    ), ba = (
      /*                */
      2
    ), pl = (
      /*                */
      4
    ), wu = 0, Bv = 1, Wc = 2, l0 = 3, Gv = 4, Kx = 5, HS = 6, hn = Xr, Ja = null, dr = null, Kr = Le, Lo = Le, VS = ds(Le), Zr = wu, Qv = null, o0 = Le, Xv = Le, u0 = Le, Kv = null, xi = null, IS = 0, Zx = 500, Jx = 1 / 0, uk = 500, Cu = null;
    function Zv() {
      Jx = kr() + uk;
    }
    function ew() {
      return Jx;
    }
    var s0 = !1, qS = null, zd = null, Bc = !1, Cs = null, Jv = Le, YS = [], WS = null, sk = 50, eh = 0, BS = null, GS = !1, c0 = !1, ck = 50, Ud = 0, f0 = null, th = jn, d0 = Le, tw = !1;
    function p0() {
      return Ja;
    }
    function ei() {
      return (hn & (ba | pl)) !== Xr ? kr() : (th !== jn || (th = kr()), th);
    }
    function bs(e) {
      var n = e.mode;
      if ((n & ln) === Dt)
        return $t;
      if ((hn & ba) !== Xr && Kr !== Le)
        return vc(Kr);
      var l = iM() !== aM;
      if (l) {
        if (Ca.transition !== null) {
          var o = Ca.transition;
          o._updatedFibers || (o._updatedFibers = /* @__PURE__ */ new Set()), o._updatedFibers.add(e);
        }
        return d0 === wn && (d0 = Ip()), d0;
      }
      var c = mi();
      if (c !== wn)
        return c;
      var h = IT();
      return h;
    }
    function fk(e) {
      var n = e.mode;
      return (n & ln) === Dt ? $t : ym();
    }
    function Jr(e, n, l, o) {
      zk(), tw && v("useInsertionEffect must not schedule updates."), GS && (c0 = !0), ts(e, l, o), (hn & ba) !== Le && e === Ja ? Fk(n) : (La && yc(e, n, l), Pk(n), e === Ja && ((hn & ba) === Xr && (Xv = en(Xv, l)), Zr === Gv && Ts(e, Kr)), wi(e, o), l === $t && hn === Xr && (n.mode & ln) === Dt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Wl.isBatchingLegacy && (Zv(), tE()));
    }
    function dk(e, n, l) {
      var o = e.current;
      o.lanes = n, ts(e, n, l), wi(e, l);
    }
    function pk(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (hn & ba) !== Xr
      );
    }
    function wi(e, n) {
      var l = e.callbackNode;
      Yf(e, n);
      var o = qf(e, e === Ja ? Kr : Le);
      if (o === Le) {
        l !== null && yw(l), e.callbackNode = null, e.callbackPriority = wn;
        return;
      }
      var c = yo(o), h = e.callbackPriority;
      if (h === c && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(Wl.current !== null && l !== t2)) {
        l == null && h !== $t && v("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      l != null && yw(l);
      var S;
      if (c === $t)
        e.tag === ps ? (Wl.isBatchingLegacy !== null && (Wl.didScheduleLegacyUpdate = !0), HR(aw.bind(null, e))) : eE(aw.bind(null, e)), Wl.current !== null ? Wl.current.push(vs) : YT(function() {
          (hn & (ba | pl)) === Xr && vs();
        }), S = null;
      else {
        var T;
        switch (bm(o)) {
          case pa:
            T = ec;
            break;
          case rl:
            T = po;
            break;
          case vi:
            T = kl;
            break;
          case hi:
            T = Xo;
            break;
          default:
            T = kl;
            break;
        }
        S = n2(T, nw.bind(null, e));
      }
      e.callbackPriority = c, e.callbackNode = S;
    }
    function nw(e, n) {
      if (OM(), th = jn, d0 = Le, (hn & (ba | pl)) !== Xr)
        throw new Error("Should not already be working.");
      var l = e.callbackNode, o = Tu();
      if (o && e.callbackNode !== l)
        return null;
      var c = qf(e, e === Ja ? Kr : Le);
      if (c === Le)
        return null;
      var h = !Bf(e, c) && !mm(e, c) && !n, S = h ? Ck(e, c) : h0(e, c);
      if (S !== wu) {
        if (S === Wc) {
          var T = Wf(e);
          T !== Le && (c = T, S = QS(e, T));
        }
        if (S === Bv) {
          var R = Qv;
          throw Gc(e, Le), Ts(e, c), wi(e, kr()), R;
        }
        if (S === HS)
          Ts(e, c);
        else {
          var L = !Bf(e, c), U = e.current.alternate;
          if (L && !hk(U)) {
            if (S = h0(e, c), S === Wc) {
              var te = Wf(e);
              te !== Le && (c = te, S = QS(e, te));
            }
            if (S === Bv) {
              var J = Qv;
              throw Gc(e, Le), Ts(e, c), wi(e, kr()), J;
            }
          }
          e.finishedWork = U, e.finishedLanes = c, vk(e, S, c);
        }
      }
      return wi(e, kr()), e.callbackNode === l ? nw.bind(null, e) : null;
    }
    function QS(e, n) {
      var l = Kv;
      if (Xf(e)) {
        var o = Gc(e, n);
        o.flags |= ea, NR(e.containerInfo);
      }
      var c = h0(e, n);
      if (c !== Wc) {
        var h = xi;
        xi = l, h !== null && rw(h);
      }
      return c;
    }
    function rw(e) {
      xi === null ? xi = e : xi.push.apply(xi, e);
    }
    function vk(e, n, l) {
      switch (n) {
        case wu:
        case Bv:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case Wc: {
          Qc(e, xi, Cu);
          break;
        }
        case l0: {
          if (Ts(e, l), ou(l) && // do not delay if we're inside an act() scope
          !gw()) {
            var o = IS + Zx - kr();
            if (o > 10) {
              var c = qf(e, Le);
              if (c !== Le)
                break;
              var h = e.suspendedLanes;
              if (!uu(h, l)) {
                ei(), Gf(e, h);
                break;
              }
              e.timeoutHandle = W1(Qc.bind(null, e, xi, Cu), o);
              break;
            }
          }
          Qc(e, xi, Cu);
          break;
        }
        case Gv: {
          if (Ts(e, l), Hp(l))
            break;
          if (!gw()) {
            var S = Ui(e, l), T = S, R = kr() - T, L = Nk(R) - R;
            if (L > 10) {
              e.timeoutHandle = W1(Qc.bind(null, e, xi, Cu), L);
              break;
            }
          }
          Qc(e, xi, Cu);
          break;
        }
        case Kx: {
          Qc(e, xi, Cu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function hk(e) {
      for (var n = e; ; ) {
        if (n.flags & Xu) {
          var l = n.updateQueue;
          if (l !== null) {
            var o = l.stores;
            if (o !== null)
              for (var c = 0; c < o.length; c++) {
                var h = o[c], S = h.getSnapshot, T = h.value;
                try {
                  if (!je(S(), T))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var R = n.child;
        if (n.subtreeFlags & Xu && R !== null) {
          R.return = n, n = R;
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
    function Ts(e, n) {
      n = hc(n, u0), n = hc(n, Xv), Em(e, n);
    }
    function aw(e) {
      if (AM(), (hn & (ba | pl)) !== Xr)
        throw new Error("Should not already be working.");
      Tu();
      var n = qf(e, Le);
      if (!za(n, $t))
        return wi(e, kr()), null;
      var l = h0(e, n);
      if (e.tag !== ps && l === Wc) {
        var o = Wf(e);
        o !== Le && (n = o, l = QS(e, o));
      }
      if (l === Bv) {
        var c = Qv;
        throw Gc(e, Le), Ts(e, n), wi(e, kr()), c;
      }
      if (l === HS)
        throw new Error("Root did not complete. This is a bug in React.");
      var h = e.current.alternate;
      return e.finishedWork = h, e.finishedLanes = n, Qc(e, xi, Cu), wi(e, kr()), null;
    }
    function mk(e, n) {
      n !== Le && (Qf(e, en(n, $t)), wi(e, kr()), (hn & (ba | pl)) === Xr && (Zv(), vs()));
    }
    function XS(e, n) {
      var l = hn;
      hn |= Xx;
      try {
        return e(n);
      } finally {
        hn = l, hn === Xr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !Wl.isBatchingLegacy && (Zv(), tE());
      }
    }
    function yk(e, n, l, o, c) {
      var h = mi(), S = Ca.transition;
      try {
        return Ca.transition = null, Er(pa), e(n, l, o, c);
      } finally {
        Er(h), Ca.transition = S, hn === Xr && Zv();
      }
    }
    function bu(e) {
      Cs !== null && Cs.tag === ps && (hn & (ba | pl)) === Xr && Tu();
      var n = hn;
      hn |= Xx;
      var l = Ca.transition, o = mi();
      try {
        return Ca.transition = null, Er(pa), e ? e() : void 0;
      } finally {
        Er(o), Ca.transition = l, hn = n, (hn & (ba | pl)) === Xr && vs();
      }
    }
    function iw() {
      return (hn & (ba | pl)) !== Xr;
    }
    function v0(e, n) {
      $a(VS, Lo, e), Lo = en(Lo, n);
    }
    function KS(e) {
      Lo = VS.current, Pa(VS, e);
    }
    function Gc(e, n) {
      e.finishedWork = null, e.finishedLanes = Le;
      var l = e.timeoutHandle;
      if (l !== B1 && (e.timeoutHandle = B1, qT(l)), dr !== null)
        for (var o = dr.return; o !== null; ) {
          var c = o.alternate;
          Nx(c, o), o = o.return;
        }
      Ja = e;
      var h = Xc(e.current, null);
      return dr = h, Kr = Lo = n, Zr = wu, Qv = null, o0 = Le, Xv = Le, u0 = Le, Kv = null, xi = null, dM(), Fl.discardPendingWarnings(), h;
    }
    function lw(e, n) {
      do {
        var l = dr;
        try {
          if (by(), DE(), qn(), $S.current = null, l === null || l.return === null) {
            Zr = Bv, Qv = n, dr = null;
            return;
          }
          if (be && l.mode & bn && Jy(l, !0), we)
            if (Qa(), n !== null && typeof n == "object" && typeof n.then == "function") {
              var o = n;
              nl(l, o, Kr);
            } else
              nc(l, n, Kr);
          HM(e, l.return, l, n, Kr), cw(l);
        } catch (c) {
          n = c, dr === l && l !== null ? (l = l.return, dr = l) : l = dr;
          continue;
        }
        return;
      } while (!0);
    }
    function ow() {
      var e = PS.current;
      return PS.current = Gy, e === null ? Gy : e;
    }
    function uw(e) {
      PS.current = e;
    }
    function gk() {
      IS = kr();
    }
    function nh(e) {
      o0 = en(e, o0);
    }
    function Sk() {
      Zr === wu && (Zr = l0);
    }
    function ZS() {
      (Zr === wu || Zr === l0 || Zr === Wc) && (Zr = Gv), Ja !== null && (pc(o0) || pc(Xv)) && Ts(Ja, Kr);
    }
    function Ek(e) {
      Zr !== Gv && (Zr = Wc), Kv === null ? Kv = [e] : Kv.push(e);
    }
    function xk() {
      return Zr === wu;
    }
    function h0(e, n) {
      var l = hn;
      hn |= ba;
      var o = ow();
      if (Ja !== e || Kr !== n) {
        if (La) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (rh(e, Kr), c.clear()), xm(e, n);
        }
        Cu = Bp(), Gc(e, n);
      }
      eu(n);
      do
        try {
          wk();
          break;
        } catch (h) {
          lw(e, h);
        }
      while (!0);
      if (by(), hn = l, uw(o), dr !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Rf(), Ja = null, Kr = Le, Zr;
    }
    function wk() {
      for (; dr !== null; )
        sw(dr);
    }
    function Ck(e, n) {
      var l = hn;
      hn |= ba;
      var o = ow();
      if (Ja !== e || Kr !== n) {
        if (La) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (rh(e, Kr), c.clear()), xm(e, n);
        }
        Cu = Bp(), Zv(), Gc(e, n);
      }
      eu(n);
      do
        try {
          bk();
          break;
        } catch (h) {
          lw(e, h);
        }
      while (!0);
      return by(), uw(o), hn = l, dr !== null ? (dm(), wu) : (Rf(), Ja = null, Kr = Le, Zr);
    }
    function bk() {
      for (; dr !== null && !Rp(); )
        sw(dr);
    }
    function sw(e) {
      var n = e.alternate;
      On(e);
      var l;
      (e.mode & bn) !== Dt ? (tS(e), l = JS(n, e, Lo), Jy(e, !0)) : l = JS(n, e, Lo), qn(), e.memoizedProps = e.pendingProps, l === null ? cw(e) : dr = l, $S.current = null;
    }
    function cw(e) {
      var n = e;
      do {
        var l = n.alternate, o = n.return;
        if ((n.flags & Js) === kt) {
          On(n);
          var c = void 0;
          if ((n.mode & bn) === Dt ? c = Lx(l, n, Lo) : (tS(n), c = Lx(l, n, Lo), Jy(n, !1)), qn(), c !== null) {
            dr = c;
            return;
          }
        } else {
          var h = S_(l, n);
          if (h !== null) {
            h.flags &= lm, dr = h;
            return;
          }
          if ((n.mode & bn) !== Dt) {
            Jy(n, !1);
            for (var S = n.actualDuration, T = n.child; T !== null; )
              S += T.actualDuration, T = T.sibling;
            n.actualDuration = S;
          }
          if (o !== null)
            o.flags |= Js, o.subtreeFlags = kt, o.deletions = null;
          else {
            Zr = HS, dr = null;
            return;
          }
        }
        var R = n.sibling;
        if (R !== null) {
          dr = R;
          return;
        }
        n = o, dr = n;
      } while (n !== null);
      Zr === wu && (Zr = Kx);
    }
    function Qc(e, n, l) {
      var o = mi(), c = Ca.transition;
      try {
        Ca.transition = null, Er(pa), Tk(e, n, l, o);
      } finally {
        Ca.transition = c, Er(o);
      }
      return null;
    }
    function Tk(e, n, l, o) {
      do
        Tu();
      while (Cs !== null);
      if (Uk(), (hn & (ba | pl)) !== Xr)
        throw new Error("Should not already be working.");
      var c = e.finishedWork, h = e.finishedLanes;
      if (Ap(h), c === null)
        return Lp(), null;
      if (h === Le && v("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Le, c === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = wn;
      var S = en(c.lanes, c.childLanes);
      Yp(e, S), e === Ja && (Ja = null, dr = null, Kr = Le), ((c.subtreeFlags & _l) !== kt || (c.flags & _l) !== kt) && (Bc || (Bc = !0, WS = l, n2(kl, function() {
        return Tu(), null;
      })));
      var T = (c.subtreeFlags & (so | co | fo | _l)) !== kt, R = (c.flags & (so | co | fo | _l)) !== kt;
      if (T || R) {
        var L = Ca.transition;
        Ca.transition = null;
        var U = mi();
        Er(pa);
        var te = hn;
        hn |= pl, $S.current = null, b_(e, c), tx(), F_(e, c, h), jT(e.containerInfo), e.current = c, rc(h), P_(c, e, h), ac(), Mp(), hn = te, Er(U), Ca.transition = L;
      } else
        e.current = c, tx();
      var J = Bc;
      if (Bc ? (Bc = !1, Cs = e, Jv = h) : (Ud = 0, f0 = null), S = e.pendingLanes, S === Le && (zd = null), J || vw(e.current, !1), kp(c.stateNode, o), La && e.memoizedUpdaters.clear(), ak(), wi(e, kr()), n !== null)
        for (var ve = e.onRecoverableError, ge = 0; ge < n.length; ge++) {
          var Ee = n[ge], at = Ee.stack, At = Ee.digest;
          ve(Ee.value, {
            componentStack: at,
            digest: At
          });
        }
      if (s0) {
        s0 = !1;
        var Tt = qS;
        throw qS = null, Tt;
      }
      return za(Jv, $t) && e.tag !== ps && Tu(), S = e.pendingLanes, za(S, $t) ? (DM(), e === BS ? eh++ : (eh = 0, BS = e)) : eh = 0, vs(), Lp(), null;
    }
    function Tu() {
      if (Cs !== null) {
        var e = bm(Jv), n = Sc(vi, e), l = Ca.transition, o = mi();
        try {
          return Ca.transition = null, Er(n), Mk();
        } finally {
          Er(o), Ca.transition = l;
        }
      }
      return !1;
    }
    function Rk(e) {
      YS.push(e), Bc || (Bc = !0, n2(kl, function() {
        return Tu(), null;
      }));
    }
    function Mk() {
      if (Cs === null)
        return !1;
      var e = WS;
      WS = null;
      var n = Cs, l = Jv;
      if (Cs = null, Jv = Le, (hn & (ba | pl)) !== Xr)
        throw new Error("Cannot flush passive effects while already rendering.");
      GS = !0, c0 = !1, Jo(l);
      var o = hn;
      hn |= pl, W_(n.current), V_(n, n.current, l, e);
      {
        var c = YS;
        YS = [];
        for (var h = 0; h < c.length; h++) {
          var S = c[h];
          __(n, S);
        }
      }
      Up(), vw(n.current, !0), hn = o, vs(), c0 ? n === f0 ? Ud++ : (Ud = 0, f0 = n) : Ud = 0, GS = !1, c0 = !1, Dp(n);
      {
        var T = n.current.stateNode;
        T.effectDuration = 0, T.passiveEffectDuration = 0;
      }
      return !0;
    }
    function fw(e) {
      return zd !== null && zd.has(e);
    }
    function _k(e) {
      zd === null ? zd = /* @__PURE__ */ new Set([e]) : zd.add(e);
    }
    function kk(e) {
      s0 || (s0 = !0, qS = e);
    }
    var Dk = kk;
    function dw(e, n, l) {
      var o = qc(l, n), c = sx(e, o, $t), h = ms(e, c, $t), S = ei();
      h !== null && (ts(h, $t, S), wi(h, S));
    }
    function Yn(e, n, l) {
      if (x_(l), ah(!1), e.tag === b) {
        dw(e, e, l);
        return;
      }
      var o = null;
      for (o = n; o !== null; ) {
        if (o.tag === b) {
          dw(o, e, l);
          return;
        } else if (o.tag === x) {
          var c = o.type, h = o.stateNode;
          if (typeof c.getDerivedStateFromError == "function" || typeof h.componentDidCatch == "function" && !fw(h)) {
            var S = qc(l, e), T = SS(o, S, $t), R = ms(o, T, $t), L = ei();
            R !== null && (ts(R, $t, L), wi(R, L));
            return;
          }
        }
        o = o.return;
      }
      v(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, l);
    }
    function Ok(e, n, l) {
      var o = e.pingCache;
      o !== null && o.delete(n);
      var c = ei();
      Gf(e, l), $k(e), Ja === e && uu(Kr, l) && (Zr === Gv || Zr === l0 && ou(Kr) && kr() - IS < Zx ? Gc(e, Le) : u0 = en(u0, l)), wi(e, c);
    }
    function pw(e, n) {
      n === wn && (n = fk(e));
      var l = ei(), o = Si(e, n);
      o !== null && (ts(o, n, l), wi(o, l));
    }
    function Ak(e) {
      var n = e.memoizedState, l = wn;
      n !== null && (l = n.retryLane), pw(e, l);
    }
    function Lk(e, n) {
      var l = wn, o;
      switch (e.tag) {
        case V:
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
      o !== null && o.delete(n), pw(e, l);
    }
    function Nk(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : ok(e / 1960) * 1960;
    }
    function zk() {
      if (eh > sk)
        throw eh = 0, BS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Ud > ck && (Ud = 0, f0 = null, v("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function Uk() {
      Fl.flushLegacyContextWarning(), Fl.flushPendingUnsafeLifecycleWarnings();
    }
    function vw(e, n) {
      On(e), m0(e, uo, tk), n && m0(e, Ji, nk), m0(e, uo, J_), n && m0(e, Ji, ek), qn();
    }
    function m0(e, n, l) {
      for (var o = e, c = null; o !== null; ) {
        var h = o.subtreeFlags & n;
        o !== c && o.child !== null && h !== kt ? o = o.child : ((o.flags & n) !== kt && l(o), o.sibling !== null ? o = o.sibling : o = c = o.return);
      }
    }
    var y0 = null;
    function hw(e) {
      {
        if ((hn & ba) !== Xr || !(e.mode & ln))
          return;
        var n = e.tag;
        if (n !== C && n !== b && n !== x && n !== g && n !== P && n !== q && n !== H)
          return;
        var l = Wt(e) || "ReactComponent";
        if (y0 !== null) {
          if (y0.has(l))
            return;
          y0.add(l);
        } else
          y0 = /* @__PURE__ */ new Set([l]);
        var o = Hr;
        try {
          On(e), v("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          o ? On(e) : qn();
        }
      }
    }
    var JS;
    {
      var jk = null;
      JS = function(e, n, l) {
        var o = Cw(jk, n);
        try {
          return _x(e, n, l);
        } catch (h) {
          if (QR() || h !== null && typeof h == "object" && typeof h.then == "function")
            throw h;
          if (by(), DE(), Nx(e, n), Cw(n, o), n.mode & bn && tS(n), oo(null, _x, null, e, n, l), Rl()) {
            var c = Zs();
            typeof c == "object" && c !== null && c._suppressLogging && typeof h == "object" && h !== null && !h._suppressLogging && (h._suppressLogging = !0);
          }
          throw h;
        }
      };
    }
    var mw = !1, e2;
    e2 = /* @__PURE__ */ new Set();
    function Fk(e) {
      if (Wi && !MM())
        switch (e.tag) {
          case g:
          case P:
          case H: {
            var n = dr && Wt(dr) || "Unknown", l = n;
            if (!e2.has(l)) {
              e2.add(l);
              var o = Wt(e) || "Unknown";
              v("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", o, n, n);
            }
            break;
          }
          case x: {
            mw || (v("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), mw = !0);
            break;
          }
        }
    }
    function rh(e, n) {
      if (La) {
        var l = e.memoizedUpdaters;
        l.forEach(function(o) {
          yc(e, o, n);
        });
      }
    }
    var t2 = {};
    function n2(e, n) {
      {
        var l = Wl.current;
        return l !== null ? (l.push(n), t2) : Tp(e, n);
      }
    }
    function yw(e) {
      if (e !== t2)
        return um(e);
    }
    function gw() {
      return Wl.current !== null;
    }
    function Pk(e) {
      {
        if (e.mode & ln) {
          if (!Qx())
            return;
        } else if (!lk() || hn !== Xr || e.tag !== g && e.tag !== P && e.tag !== H)
          return;
        if (Wl.current === null) {
          var n = Hr;
          try {
            On(e), v(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Wt(e));
          } finally {
            n ? On(e) : qn();
          }
        }
      }
    }
    function $k(e) {
      e.tag !== ps && Qx() && Wl.current === null && v(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function ah(e) {
      tw = e;
    }
    var vl = null, jd = null, Hk = function(e) {
      vl = e;
    };
    function Fd(e) {
      {
        if (vl === null)
          return e;
        var n = vl(e);
        return n === void 0 ? e : n.current;
      }
    }
    function r2(e) {
      return Fd(e);
    }
    function a2(e) {
      {
        if (vl === null)
          return e;
        var n = vl(e);
        if (n === void 0) {
          if (e != null && typeof e.render == "function") {
            var l = Fd(e.render);
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
    function Sw(e, n) {
      {
        if (vl === null)
          return !1;
        var l = e.elementType, o = n.type, c = !1, h = typeof o == "object" && o !== null ? o.$$typeof : null;
        switch (e.tag) {
          case x: {
            typeof o == "function" && (c = !0);
            break;
          }
          case g: {
            (typeof o == "function" || h === Ht) && (c = !0);
            break;
          }
          case P: {
            (h === ke || h === Ht) && (c = !0);
            break;
          }
          case q:
          case H: {
            (h === It || h === Ht) && (c = !0);
            break;
          }
          default:
            return !1;
        }
        if (c) {
          var S = vl(l);
          if (S !== void 0 && S === vl(o))
            return !0;
        }
        return !1;
      }
    }
    function Ew(e) {
      {
        if (vl === null || typeof WeakSet != "function")
          return;
        jd === null && (jd = /* @__PURE__ */ new WeakSet()), jd.add(e);
      }
    }
    var Vk = function(e, n) {
      {
        if (vl === null)
          return;
        var l = n.staleFamilies, o = n.updatedFamilies;
        Tu(), bu(function() {
          i2(e.current, o, l);
        });
      }
    }, Ik = function(e, n) {
      {
        if (e.context !== Pi)
          return;
        Tu(), bu(function() {
          ih(n, e, null, null);
        });
      }
    };
    function i2(e, n, l) {
      {
        var o = e.alternate, c = e.child, h = e.sibling, S = e.tag, T = e.type, R = null;
        switch (S) {
          case g:
          case H:
          case x:
            R = T;
            break;
          case P:
            R = T.render;
            break;
        }
        if (vl === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var L = !1, U = !1;
        if (R !== null) {
          var te = vl(R);
          te !== void 0 && (l.has(te) ? U = !0 : n.has(te) && (S === x ? U = !0 : L = !0));
        }
        if (jd !== null && (jd.has(e) || o !== null && jd.has(o)) && (U = !0), U && (e._debugNeedsRemount = !0), U || L) {
          var J = Si(e, $t);
          J !== null && Jr(J, e, $t, jn);
        }
        c !== null && !U && i2(c, n, l), h !== null && i2(h, n, l);
      }
    }
    var qk = function(e, n) {
      {
        var l = /* @__PURE__ */ new Set(), o = new Set(n.map(function(c) {
          return c.current;
        }));
        return l2(e.current, o, l), l;
      }
    };
    function l2(e, n, l) {
      {
        var o = e.child, c = e.sibling, h = e.tag, S = e.type, T = null;
        switch (h) {
          case g:
          case H:
          case x:
            T = S;
            break;
          case P:
            T = S.render;
            break;
        }
        var R = !1;
        T !== null && n.has(T) && (R = !0), R ? Yk(e, l) : o !== null && l2(o, n, l), c !== null && l2(c, n, l);
      }
    }
    function Yk(e, n) {
      {
        var l = Wk(e, n);
        if (l)
          return;
        for (var o = e; ; ) {
          switch (o.tag) {
            case _:
              n.add(o.stateNode);
              return;
            case M:
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
    function Wk(e, n) {
      for (var l = e, o = !1; ; ) {
        if (l.tag === _)
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
    var o2;
    {
      o2 = !1;
      try {
        var xw = Object.preventExtensions({});
      } catch {
        o2 = !0;
      }
    }
    function Bk(e, n, l, o) {
      this.tag = e, this.key = l, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = n, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = o, this.flags = kt, this.subtreeFlags = kt, this.deletions = null, this.lanes = Le, this.childLanes = Le, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !o2 && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var $i = function(e, n, l, o) {
      return new Bk(e, n, l, o);
    };
    function u2(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function Gk(e) {
      return typeof e == "function" && !u2(e) && e.defaultProps === void 0;
    }
    function Qk(e) {
      if (typeof e == "function")
        return u2(e) ? x : g;
      if (e != null) {
        var n = e.$$typeof;
        if (n === ke)
          return P;
        if (n === It)
          return q;
      }
      return C;
    }
    function Xc(e, n) {
      var l = e.alternate;
      l === null ? (l = $i(e.tag, n, e.key, e.mode), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l._debugSource = e._debugSource, l._debugOwner = e._debugOwner, l._debugHookTypes = e._debugHookTypes, l.alternate = e, e.alternate = l) : (l.pendingProps = n, l.type = e.type, l.flags = kt, l.subtreeFlags = kt, l.deletions = null, l.actualDuration = 0, l.actualStartTime = -1), l.flags = e.flags & yr, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue;
      var o = e.dependencies;
      switch (l.dependencies = o === null ? null : {
        lanes: o.lanes,
        firstContext: o.firstContext
      }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.selfBaseDuration = e.selfBaseDuration, l.treeBaseDuration = e.treeBaseDuration, l._debugNeedsRemount = e._debugNeedsRemount, l.tag) {
        case C:
        case g:
        case H:
          l.type = Fd(e.type);
          break;
        case x:
          l.type = r2(e.type);
          break;
        case P:
          l.type = a2(e.type);
          break;
      }
      return l;
    }
    function Xk(e, n) {
      e.flags &= yr | er;
      var l = e.alternate;
      if (l === null)
        e.childLanes = Le, e.lanes = n, e.child = null, e.subtreeFlags = kt, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = kt, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type;
        var o = l.dependencies;
        e.dependencies = o === null ? null : {
          lanes: o.lanes,
          firstContext: o.firstContext
        }, e.selfBaseDuration = l.selfBaseDuration, e.treeBaseDuration = l.treeBaseDuration;
      }
      return e;
    }
    function Kk(e, n, l) {
      var o;
      return e === vy ? (o = ln, n === !0 && (o |= Nn, o |= Tn)) : o = Dt, La && (o |= bn), $i(b, null, null, o);
    }
    function s2(e, n, l, o, c, h) {
      var S = C, T = e;
      if (typeof e == "function")
        u2(e) ? (S = x, T = r2(T)) : T = Fd(T);
      else if (typeof e == "string")
        S = _;
      else
        e: switch (e) {
          case Ra:
            return Rs(l.children, c, h, n);
          case oa:
            S = N, c |= Nn, (c & ln) !== Dt && (c |= Tn);
            break;
          case Ya:
            return Zk(l, c, h, n);
          case Ze:
            return Jk(l, c, h, n);
          case ot:
            return eD(l, c, h, n);
          case Gn:
            return ww(l, c, h, n);
          case gn:
          // eslint-disable-next-line no-fallthrough
          case tn:
          // eslint-disable-next-line no-fallthrough
          case xn:
          // eslint-disable-next-line no-fallthrough
          case In:
          // eslint-disable-next-line no-fallthrough
          case Jt:
          // eslint-disable-next-line no-fallthrough
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case Lr:
                  S = W;
                  break e;
                case B:
                  S = F;
                  break e;
                case ke:
                  S = P, T = a2(T);
                  break e;
                case It:
                  S = q;
                  break e;
                case Ht:
                  S = oe, T = null;
                  break e;
              }
            var R = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var L = o ? Wt(o) : null;
              L && (R += `

Check the render method of \`` + L + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + R));
          }
        }
      var U = $i(S, l, n, c);
      return U.elementType = e, U.type = T, U.lanes = h, U._debugOwner = o, U;
    }
    function c2(e, n, l) {
      var o = null;
      o = e._owner;
      var c = e.type, h = e.key, S = e.props, T = s2(c, h, S, o, n, l);
      return T._debugSource = e._source, T._debugOwner = e._owner, T;
    }
    function Rs(e, n, l, o) {
      var c = $i(A, e, o, n);
      return c.lanes = l, c;
    }
    function Zk(e, n, l, o) {
      typeof e.id != "string" && v('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var c = $i(j, e, o, n | bn);
      return c.elementType = Ya, c.lanes = l, c.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, c;
    }
    function Jk(e, n, l, o) {
      var c = $i(V, e, o, n);
      return c.elementType = Ze, c.lanes = l, c;
    }
    function eD(e, n, l, o) {
      var c = $i(ne, e, o, n);
      return c.elementType = ot, c.lanes = l, c;
    }
    function ww(e, n, l, o) {
      var c = $i(G, e, o, n);
      c.elementType = Gn, c.lanes = l;
      var h = {
        isHidden: !1
      };
      return c.stateNode = h, c;
    }
    function f2(e, n, l) {
      var o = $i(k, e, null, n);
      return o.lanes = l, o;
    }
    function tD() {
      var e = $i(_, null, null, Dt);
      return e.elementType = "DELETED", e;
    }
    function nD(e) {
      var n = $i($, null, null, Dt);
      return n.stateNode = e, n;
    }
    function d2(e, n, l) {
      var o = e.children !== null ? e.children : [], c = $i(M, o, e.key, n);
      return c.lanes = l, c.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, c;
    }
    function Cw(e, n) {
      return e === null && (e = $i(C, null, null, Dt)), e.tag = n.tag, e.key = n.key, e.elementType = n.elementType, e.type = n.type, e.stateNode = n.stateNode, e.return = n.return, e.child = n.child, e.sibling = n.sibling, e.index = n.index, e.ref = n.ref, e.pendingProps = n.pendingProps, e.memoizedProps = n.memoizedProps, e.updateQueue = n.updateQueue, e.memoizedState = n.memoizedState, e.dependencies = n.dependencies, e.mode = n.mode, e.flags = n.flags, e.subtreeFlags = n.subtreeFlags, e.deletions = n.deletions, e.lanes = n.lanes, e.childLanes = n.childLanes, e.alternate = n.alternate, e.actualDuration = n.actualDuration, e.actualStartTime = n.actualStartTime, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration, e._debugSource = n._debugSource, e._debugOwner = n._debugOwner, e._debugNeedsRemount = n._debugNeedsRemount, e._debugHookTypes = n._debugHookTypes, e;
    }
    function rD(e, n, l, o, c) {
      this.tag = n, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = B1, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = wn, this.eventTimes = mc(Le), this.expirationTimes = mc(jn), this.pendingLanes = Le, this.suspendedLanes = Le, this.pingedLanes = Le, this.expiredLanes = Le, this.mutableReadLanes = Le, this.finishedLanes = Le, this.entangledLanes = Le, this.entanglements = mc(Le), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var h = this.pendingUpdatersLaneMap = [], S = 0; S < tu; S++)
          h.push(/* @__PURE__ */ new Set());
      }
      switch (n) {
        case vy:
          this._debugRootType = l ? "hydrateRoot()" : "createRoot()";
          break;
        case ps:
          this._debugRootType = l ? "hydrate()" : "render()";
          break;
      }
    }
    function bw(e, n, l, o, c, h, S, T, R, L) {
      var U = new rD(e, n, l, T, R), te = Kk(n, h);
      U.current = te, te.stateNode = U;
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
      return Tg(te), U;
    }
    var p2 = "18.3.1";
    function aD(e, n, l) {
      var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return ze(o), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: Vn,
        key: o == null ? null : "" + o,
        children: e,
        containerInfo: n,
        implementation: l
      };
    }
    var v2, h2;
    v2 = !1, h2 = {};
    function Tw(e) {
      if (!e)
        return Pi;
      var n = Qu(e), l = $R(n);
      if (n.tag === x) {
        var o = n.type;
        if (Ro(o))
          return Z3(n, o, l);
      }
      return l;
    }
    function iD(e, n) {
      {
        var l = Qu(e);
        if (l === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var o = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + o);
        }
        var c = Oa(l);
        if (c === null)
          return null;
        if (c.mode & Nn) {
          var h = Wt(l) || "Component";
          if (!h2[h]) {
            h2[h] = !0;
            var S = Hr;
            try {
              On(c), l.mode & Nn ? v("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", n, n, h) : v("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", n, n, h);
            } finally {
              S ? On(S) : qn();
            }
          }
        }
        return c.stateNode;
      }
    }
    function Rw(e, n, l, o, c, h, S, T) {
      var R = !1, L = null;
      return bw(e, n, R, L, l, o, c, h, S);
    }
    function Mw(e, n, l, o, c, h, S, T, R, L) {
      var U = !0, te = bw(l, o, U, e, c, h, S, T, R);
      te.context = Tw(null);
      var J = te.current, ve = ei(), ge = bs(J), Ee = Eu(ve, ge);
      return Ee.callback = n ?? null, ms(J, Ee, ge), dk(te, ge, ve), te;
    }
    function ih(e, n, l, o) {
      _p(n, e);
      var c = n.current, h = ei(), S = bs(c);
      nr(S);
      var T = Tw(l);
      n.context === null ? n.context = T : n.pendingContext = T, Wi && Hr !== null && !v2 && (v2 = !0, v(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Wt(Hr) || "Unknown"));
      var R = Eu(h, S);
      R.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (typeof o != "function" && v("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", o), R.callback = o);
      var L = ms(c, R, S);
      return L !== null && (Jr(L, c, S, h), ky(L, c, S)), S;
    }
    function g0(e) {
      var n = e.current;
      return n.child ? n.child.tag === _ ? n.child.stateNode : n.child.stateNode : null;
    }
    function lD(e) {
      switch (e.tag) {
        case b: {
          var n = e.stateNode;
          if (Xf(n)) {
            var l = vm(n);
            mk(n, l);
          }
          break;
        }
        case V: {
          bu(function() {
            var c = Si(e, $t);
            if (c !== null) {
              var h = ei();
              Jr(c, e, $t, h);
            }
          });
          var o = $t;
          m2(e, o);
          break;
        }
      }
    }
    function _w(e, n) {
      var l = e.memoizedState;
      l !== null && l.dehydrated !== null && (l.retryLane = Sm(l.retryLane, n));
    }
    function m2(e, n) {
      _w(e, n);
      var l = e.alternate;
      l && _w(l, n);
    }
    function oD(e) {
      if (e.tag === V) {
        var n = cc, l = Si(e, n);
        if (l !== null) {
          var o = ei();
          Jr(l, e, n, o);
        }
        m2(e, n);
      }
    }
    function uD(e) {
      if (e.tag === V) {
        var n = bs(e), l = Si(e, n);
        if (l !== null) {
          var o = ei();
          Jr(l, e, n, o);
        }
        m2(e, n);
      }
    }
    function kw(e) {
      var n = Xn(e);
      return n === null ? null : n.stateNode;
    }
    var Dw = function(e) {
      return null;
    };
    function sD(e) {
      return Dw(e);
    }
    var Ow = function(e) {
      return !1;
    };
    function cD(e) {
      return Ow(e);
    }
    var Aw = null, Lw = null, Nw = null, zw = null, Uw = null, jw = null, Fw = null, Pw = null, $w = null;
    {
      var Hw = function(e, n, l) {
        var o = n[l], c = rn(e) ? e.slice() : Bt({}, e);
        return l + 1 === n.length ? (rn(c) ? c.splice(o, 1) : delete c[o], c) : (c[o] = Hw(e[o], n, l + 1), c);
      }, Vw = function(e, n) {
        return Hw(e, n, 0);
      }, Iw = function(e, n, l, o) {
        var c = n[o], h = rn(e) ? e.slice() : Bt({}, e);
        if (o + 1 === n.length) {
          var S = l[o];
          h[S] = h[c], rn(h) ? h.splice(c, 1) : delete h[c];
        } else
          h[c] = Iw(
            // $FlowFixMe number or string is fine here
            e[c],
            n,
            l,
            o + 1
          );
        return h;
      }, qw = function(e, n, l) {
        if (n.length !== l.length) {
          m("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var o = 0; o < l.length - 1; o++)
            if (n[o] !== l[o]) {
              m("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return Iw(e, n, l, 0);
      }, Yw = function(e, n, l, o) {
        if (l >= n.length)
          return o;
        var c = n[l], h = rn(e) ? e.slice() : Bt({}, e);
        return h[c] = Yw(e[c], n, l + 1, o), h;
      }, Ww = function(e, n, l) {
        return Yw(e, n, 0, l);
      }, y2 = function(e, n) {
        for (var l = e.memoizedState; l !== null && n > 0; )
          l = l.next, n--;
        return l;
      };
      Aw = function(e, n, l, o) {
        var c = y2(e, n);
        if (c !== null) {
          var h = Ww(c.memoizedState, l, o);
          c.memoizedState = h, c.baseState = h, e.memoizedProps = Bt({}, e.memoizedProps);
          var S = Si(e, $t);
          S !== null && Jr(S, e, $t, jn);
        }
      }, Lw = function(e, n, l) {
        var o = y2(e, n);
        if (o !== null) {
          var c = Vw(o.memoizedState, l);
          o.memoizedState = c, o.baseState = c, e.memoizedProps = Bt({}, e.memoizedProps);
          var h = Si(e, $t);
          h !== null && Jr(h, e, $t, jn);
        }
      }, Nw = function(e, n, l, o) {
        var c = y2(e, n);
        if (c !== null) {
          var h = qw(c.memoizedState, l, o);
          c.memoizedState = h, c.baseState = h, e.memoizedProps = Bt({}, e.memoizedProps);
          var S = Si(e, $t);
          S !== null && Jr(S, e, $t, jn);
        }
      }, zw = function(e, n, l) {
        e.pendingProps = Ww(e.memoizedProps, n, l), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Si(e, $t);
        o !== null && Jr(o, e, $t, jn);
      }, Uw = function(e, n) {
        e.pendingProps = Vw(e.memoizedProps, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var l = Si(e, $t);
        l !== null && Jr(l, e, $t, jn);
      }, jw = function(e, n, l) {
        e.pendingProps = qw(e.memoizedProps, n, l), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Si(e, $t);
        o !== null && Jr(o, e, $t, jn);
      }, Fw = function(e) {
        var n = Si(e, $t);
        n !== null && Jr(n, e, $t, jn);
      }, Pw = function(e) {
        Dw = e;
      }, $w = function(e) {
        Ow = e;
      };
    }
    function fD(e) {
      var n = Oa(e);
      return n === null ? null : n.stateNode;
    }
    function dD(e) {
      return null;
    }
    function pD() {
      return Hr;
    }
    function vD(e) {
      var n = e.findFiberByHostInstance, l = u.ReactCurrentDispatcher;
      return Zu({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: Aw,
        overrideHookStateDeletePath: Lw,
        overrideHookStateRenamePath: Nw,
        overrideProps: zw,
        overridePropsDeletePath: Uw,
        overridePropsRenamePath: jw,
        setErrorHandler: Pw,
        setSuspenseHandler: $w,
        scheduleUpdate: Fw,
        currentDispatcherRef: l,
        findHostInstanceByFiber: fD,
        findFiberByHostInstance: n || dD,
        // React Refresh
        findHostInstancesForRefresh: qk,
        scheduleRefresh: Vk,
        scheduleRoot: Ik,
        setRefreshHandler: Hk,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: pD,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: p2
      });
    }
    var Bw = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function g2(e) {
      this._internalRoot = e;
    }
    S0.prototype.render = g2.prototype.render = function(e) {
      var n = this._internalRoot;
      if (n === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? v("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : E0(arguments[1]) ? v("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && v("You passed a second argument to root.render(...) but it only accepts one argument.");
        var l = n.containerInfo;
        if (l.nodeType !== hr) {
          var o = kw(n.current);
          o && o.parentNode !== l && v("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      ih(e, n, null, null);
    }, S0.prototype.unmount = g2.prototype.unmount = function() {
      typeof arguments[0] == "function" && v("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var n = e.containerInfo;
        iw() && v("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), bu(function() {
          ih(null, e, null, null);
        }), B3(n);
      }
    };
    function hD(e, n) {
      if (!E0(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      Gw(e);
      var l = !1, o = !1, c = "", h = Bw;
      n != null && (n.hydrate ? m("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof n == "object" && n !== null && n.$$typeof === Ar && v(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (c = n.identifierPrefix), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.transitionCallbacks !== void 0 && n.transitionCallbacks);
      var S = Rw(e, vy, null, l, o, c, h);
      oy(S.current, e);
      var T = e.nodeType === hr ? e.parentNode : e;
      return fv(T), new g2(S);
    }
    function S0(e) {
      this._internalRoot = e;
    }
    function mD(e) {
      e && km(e);
    }
    S0.prototype.unstable_scheduleHydration = mD;
    function yD(e, n, l) {
      if (!E0(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      Gw(e), n === void 0 && v("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var o = l ?? null, c = l != null && l.hydratedSources || null, h = !1, S = !1, T = "", R = Bw;
      l != null && (l.unstable_strictMode === !0 && (h = !0), l.identifierPrefix !== void 0 && (T = l.identifierPrefix), l.onRecoverableError !== void 0 && (R = l.onRecoverableError));
      var L = Mw(n, null, e, vy, o, h, S, T, R);
      if (oy(L.current, e), fv(e), c)
        for (var U = 0; U < c.length; U++) {
          var te = c[U];
          xM(L, te);
        }
      return new S0(L);
    }
    function E0(e) {
      return !!(e && (e.nodeType === _a || e.nodeType === Tl || e.nodeType === pp));
    }
    function lh(e) {
      return !!(e && (e.nodeType === _a || e.nodeType === Tl || e.nodeType === pp || e.nodeType === hr && e.nodeValue === " react-mount-point-unstable "));
    }
    function Gw(e) {
      e.nodeType === _a && e.tagName && e.tagName.toUpperCase() === "BODY" && v("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), wv(e) && (e._reactRootContainer ? v("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : v("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var gD = u.ReactCurrentOwner, Qw;
    Qw = function(e) {
      if (e._reactRootContainer && e.nodeType !== hr) {
        var n = kw(e._reactRootContainer.current);
        n && n.parentNode !== e && v("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var l = !!e._reactRootContainer, o = S2(e), c = !!(o && fs(o));
      c && !l && v("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === _a && e.tagName && e.tagName.toUpperCase() === "BODY" && v("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function S2(e) {
      return e ? e.nodeType === Tl ? e.documentElement : e.firstChild : null;
    }
    function Xw() {
    }
    function SD(e, n, l, o, c) {
      if (c) {
        if (typeof o == "function") {
          var h = o;
          o = function() {
            var J = g0(S);
            h.call(J);
          };
        }
        var S = Mw(
          n,
          o,
          e,
          ps,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          Xw
        );
        e._reactRootContainer = S, oy(S.current, e);
        var T = e.nodeType === hr ? e.parentNode : e;
        return fv(T), bu(), S;
      } else {
        for (var R; R = e.lastChild; )
          e.removeChild(R);
        if (typeof o == "function") {
          var L = o;
          o = function() {
            var J = g0(U);
            L.call(J);
          };
        }
        var U = Rw(
          e,
          ps,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          Xw
        );
        e._reactRootContainer = U, oy(U.current, e);
        var te = e.nodeType === hr ? e.parentNode : e;
        return fv(te), bu(function() {
          ih(n, U, l, o);
        }), U;
      }
    }
    function ED(e, n) {
      e !== null && typeof e != "function" && v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", n, e);
    }
    function x0(e, n, l, o, c) {
      Qw(l), ED(c === void 0 ? null : c, "render");
      var h = l._reactRootContainer, S;
      if (!h)
        S = SD(l, n, e, c, o);
      else {
        if (S = h, typeof c == "function") {
          var T = c;
          c = function() {
            var R = g0(S);
            T.call(R);
          };
        }
        ih(n, S, e, c);
      }
      return g0(S);
    }
    var Kw = !1;
    function xD(e) {
      {
        Kw || (Kw = !0, v("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var n = gD.current;
        if (n !== null && n.stateNode !== null) {
          var l = n.stateNode._warnedAboutRefsInRender;
          l || v("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Sn(n.type) || "A component"), n.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === _a ? e : iD(e, "findDOMNode");
    }
    function wD(e, n, l) {
      if (v("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lh(n))
        throw new Error("Target container is not a DOM element.");
      {
        var o = wv(n) && n._reactRootContainer === void 0;
        o && v("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return x0(null, e, n, !0, l);
    }
    function CD(e, n, l) {
      if (v("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lh(n))
        throw new Error("Target container is not a DOM element.");
      {
        var o = wv(n) && n._reactRootContainer === void 0;
        o && v("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return x0(null, e, n, !1, l);
    }
    function bD(e, n, l, o) {
      if (v("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lh(l))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !m1(e))
        throw new Error("parentComponent must be a valid React Component");
      return x0(e, n, l, !1, o);
    }
    var Zw = !1;
    function TD(e) {
      if (Zw || (Zw = !0, v("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !lh(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var n = wv(e) && e._reactRootContainer === void 0;
        n && v("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var l = S2(e), o = l && !fs(l);
          o && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return bu(function() {
          x0(null, null, e, !1, function() {
            e._reactRootContainer = null, B3(e);
          });
        }), !0;
      } else {
        {
          var c = S2(e), h = !!(c && fs(c)), S = e.nodeType === _a && lh(e.parentNode) && !!e.parentNode._reactRootContainer;
          h && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", S ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    na(lD), ns(oD), Tm(uD), xc(mi), Gp(wm), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && v("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), pf(MT), h1(XS, yk, bu);
    function RD(e, n) {
      var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!E0(n))
        throw new Error("Target container is not a DOM element.");
      return aD(e, n, null, l);
    }
    function MD(e, n, l, o) {
      return bD(e, n, l, o);
    }
    var E2 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [fs, hd, uy, Yu, vf, XS]
    };
    function _D(e, n) {
      return E2.usingClientEntryPoint || v('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), hD(e, n);
    }
    function kD(e, n, l) {
      return E2.usingClientEntryPoint || v('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), yD(e, n, l);
    }
    function DD(e) {
      return iw() && v("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), bu(e);
    }
    var OD = vD({
      findFiberByHostInstance: zc,
      bundleType: 1,
      version: p2,
      rendererPackageName: "react-dom"
    });
    if (!OD && Xe && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var Jw = window.location.protocol;
      /^(https?|file):$/.test(Jw) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (Jw === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    bi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = E2, bi.createPortal = RD, bi.createRoot = _D, bi.findDOMNode = xD, bi.flushSync = DD, bi.hydrate = wD, bi.hydrateRoot = kD, bi.render = CD, bi.unmountComponentAtNode = TD, bi.unstable_batchedUpdates = XS, bi.unstable_renderSubtreeIntoContainer = MD, bi.version = p2, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })()), bi;
}
var EC;
function ZN() {
  if (EC) return D0.exports;
  EC = 1;
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
  return process.env.NODE_ENV === "production" ? (t(), D0.exports = XN()) : D0.exports = KN(), D0.exports;
}
var xC;
function JN() {
  if (xC) return Vd;
  xC = 1;
  var t = ZN();
  if (process.env.NODE_ENV === "production")
    Vd.createRoot = t.createRoot, Vd.hydrateRoot = t.hydrateRoot;
  else {
    var a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    Vd.createRoot = function(u, f) {
      a.usingClientEntryPoint = !0;
      try {
        return t.createRoot(u, f);
      } finally {
        a.usingClientEntryPoint = !1;
      }
    }, Vd.hydrateRoot = function(u, f, p) {
      a.usingClientEntryPoint = !0;
      try {
        return t.hydrateRoot(u, f, p);
      } finally {
        a.usingClientEntryPoint = !1;
      }
    };
  }
  return Vd;
}
var ez = JN();
const Bl = (t) => typeof t != "number" ? "N/A" : `${Math.round(t)} ms`;
function tz({ viewport: t }) {
  const [a, u] = ia.useState({
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
    fillRasterTime: 0,
    shadeRasterTime: 0,
    fogSortTime: 0,
    fogRasterTime: 0
  }), [f, p] = ia.useState(() => localStorage.getItem("s3d-debug-open") === "true"), [m, v] = ia.useState(() => localStorage.getItem("s3d-wireframe") === "true"), [E, g] = ia.useState(() => localStorage.getItem("s3d-debug-normals") === "true"), [x, C] = ia.useState(() => localStorage.getItem("s3d-debug-axis") === "true"), [b, M] = ia.useState(() => localStorage.getItem("s3d-fill-enabled") !== "false"), [_, k] = ia.useState(() => localStorage.getItem("s3d-shade-enabled") !== "false"), [A, N] = ia.useState(() => localStorage.getItem("s3d-fog-enabled") !== "false");
  ia.useEffect(() => {
    t && (t.wireframe = m, t.debugNormals = E, t.debugAxis = x, t.fillEnabled = b, t.shadeEnabled = _, t.fogEnabled = A);
  }, [t]), ia.useEffect(() => {
    const H = () => {
      t && (v(!!t.wireframe), g(!!t.debugNormals), C(!!t.debugAxis), M(!!t.fillEnabled), k(!!t.shadeEnabled), N(!!t.fogEnabled));
    };
    H();
    const oe = setInterval(H, 500);
    return () => clearInterval(oe);
  }, [t]), ia.useEffect(() => {
    localStorage.setItem("s3d-debug-open", f);
  }, [f]), ia.useEffect(() => {
    localStorage.setItem("s3d-wireframe", m);
  }, [m]), ia.useEffect(() => {
    localStorage.setItem("s3d-debug-normals", E);
  }, [E]), ia.useEffect(() => {
    localStorage.setItem("s3d-debug-axis", x);
  }, [x]), ia.useEffect(() => {
    localStorage.setItem("s3d-fill-enabled", b);
  }, [b]), ia.useEffect(() => {
    localStorage.setItem("s3d-shade-enabled", _);
  }, [_]), ia.useEffect(() => {
    localStorage.setItem("s3d-fog-enabled", A);
  }, [A]), ia.useEffect(() => {
    let H = 0;
    const oe = setInterval(() => {
      if (t) {
        const Q = t.lastRenderStats || {};
        H = Math.max(H, Q.fps || 0), u({
          fps: Q.fps || 0,
          maxFps: H,
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
          fillRasterTime: Q.fillRasterTime || 0,
          shadeRasterTime: Q.shadeRasterTime || 0,
          fogSortTime: Q.fogSortTime || 0,
          fogRasterTime: Q.fogRasterTime || 0
        });
      }
    }, 100);
    return () => clearInterval(oe);
  }, [t]);
  const F = () => {
    const H = !m;
    v(H), t && (t.wireframe = H), window.dispatchEvent(
      new CustomEvent("s3d-wireframe-change", {
        detail: { enabled: H }
      })
    );
  }, W = () => {
    const H = !E;
    g(H), t && (t.debugNormals = H);
  }, P = () => {
    const H = !x;
    C(H), t && (t.debugAxis = H);
  }, j = () => {
    const H = !b;
    M(H), t && (t.fillEnabled = H);
  }, V = () => {
    const H = !_;
    k(H), t && (t.shadeEnabled = H);
  }, q = () => {
    const H = !A;
    N(H), t && (t.fogEnabled = H);
  };
  return /* @__PURE__ */ qe.jsxs("div", { className: "s3d-debug-container s3d-flex s3d-flex-col s3d-items-end s3d-gap-2 s3d-font-sans", children: [
    /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-gap-2", children: [
      /* @__PURE__ */ qe.jsx(
        "button",
        {
          onClick: F,
          title: "Toggle Wireframe",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${m ? "s3d-bg-blue-600/80 s3d-border-blue-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ qe.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ qe.jsx(
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
      /* @__PURE__ */ qe.jsx(
        "button",
        {
          onClick: W,
          title: "Toggle Debug Normals",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${E ? "s3d-bg-amber-600/80 s3d-border-amber-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ qe.jsxs(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: [
                /* @__PURE__ */ qe.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M4 17l8-10 8 10H4z"
                  }
                ),
                /* @__PURE__ */ qe.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 13V3" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ qe.jsx(
        "button",
        {
          onClick: P,
          title: "Toggle Debug Axis",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${x ? "s3d-bg-purple-600/80 s3d-border-purple-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ qe.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ qe.jsx(
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
      /* @__PURE__ */ qe.jsx(
        "button",
        {
          onClick: j,
          title: "Toggle Fill Pass",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${b ? "s3d-bg-cyan-600/80 s3d-border-cyan-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ qe.jsx("svg", { className: "s3d-w-5 s3d-h-5", viewBox: "0 0 24 24", children: /* @__PURE__ */ qe.jsx(
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
      /* @__PURE__ */ qe.jsx(
        "button",
        {
          onClick: V,
          title: "Toggle Shade Pass",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${_ ? "s3d-bg-orange-600/80 s3d-border-orange-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ qe.jsxs(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: [
                /* @__PURE__ */ qe.jsx("circle", { cx: "12", cy: "12", r: "9" }),
                /* @__PURE__ */ qe.jsx("path", { d: "M12 3a9 9 0 000 18z", fill: "currentColor", stroke: "none" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ qe.jsx(
        "button",
        {
          onClick: q,
          title: "Toggle Fog Pass",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${A ? "s3d-bg-sky-600/80 s3d-border-sky-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ qe.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ qe.jsx("path", { strokeLinecap: "round", d: "M3 8h13M3 12h17M3 16h10" })
            }
          )
        }
      ),
      /* @__PURE__ */ qe.jsx(
        "button",
        {
          onClick: () => p(!f),
          title: "Toggle Diagnostics",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${f ? "s3d-bg-emerald-600/80 s3d-border-emerald-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ qe.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ qe.jsx(
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
    f && /* @__PURE__ */ qe.jsxs("div", { className: "s3d-w-56 s3d-bg-slate-900/85 s3d-backdrop-blur-md s3d-border s3d-border-slate-700/50 s3d-rounded-lg s3d-p-3 s3d-shadow-2xl s3d-text-slate-300 s3d-flex s3d-flex-col", children: [
      /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-justify-between s3d-items-center s3d-border-b s3d-border-slate-800 s3d-pb-1.5 s3d-mb-2.5", children: [
        /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide s3d-font-semibold", children: "FPS / FPS (max)" }),
        /* @__PURE__ */ qe.jsxs("span", { className: "s3d-font-mono s3d-text-sm s3d-font-semibold", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-emerald-400", children: a.fps }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500", children: " / " }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-200", children: a.maxFps })
        ] })
      ] }),
      /* @__PURE__ */ qe.jsxs("div", { className: "s3d-grid s3d-grid-cols-2 s3d-gap-y-2.5 s3d-gap-x-3 s3d-text-[11px]", children: [
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Device DPR" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: (window.devicePixelRatio || 1).toFixed(2) })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Scene)" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.totalObjects })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Screen)" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.visibleObjects })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Faces (screen)" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.faces })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Update" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Bl(a.updateTime) })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Retrieval" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Bl(a.retrieveTime) })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Object Culling" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Bl(a.cullTime) })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Layer Grouping" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Bl(a.groupTime) })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Process Meshes" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Bl(a.processTime) })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Sort Faces" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Bl(a.sortTime) })
        ] }),
        /* @__PURE__ */ qe.jsx("div", { className: "s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5" }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fill Draw Calls" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.fillDrawCalls })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fill Time (Cpu)" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Bl(a.fillRasterTime) })
        ] }),
        /* @__PURE__ */ qe.jsx("div", { className: "s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5" }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Shade Draw Calls" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.shadeDrawCalls })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Shade Time (Cpu)" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Bl(a.shadeRasterTime) })
        ] }),
        /* @__PURE__ */ qe.jsx("div", { className: "s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5" }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col s3d-col-span-2", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fog Sort" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Bl(a.fogSortTime) })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fog Draw Calls" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.fogDrawCalls })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fog Time (Cpu)" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Bl(a.fogRasterTime) })
        ] }),
        /* @__PURE__ */ qe.jsx("div", { className: "s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5" }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Draw Calls" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.drawCallsTotal })
        ] }),
        /* @__PURE__ */ qe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Frame Time (gpu)" }),
          /* @__PURE__ */ qe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Bl(a.frameTime) })
        ] })
      ] })
    ] })
  ] });
}
function nz(t) {
  if (!t || !t.canvas) {
    console.error("showDebug: Invalid viewport parameter passed.");
    return;
  }
  const u = t.canvas.parentElement || document.body;
  u && getComputedStyle(u).position === "static" && (u.style.position = "relative");
  let f = u.querySelector("#s3d-debug-root");
  if (f)
    return;
  f = document.createElement("div"), f.id = "s3d-debug-root", f.className = "s3d-absolute s3d-top-4 s3d-right-4 s3d-z-[99999]", u.appendChild(f), ez.createRoot(f).render(/* @__PURE__ */ qe.jsx(tz, { viewport: t }));
}
const lz = window.scaliaEngine = {
  config: W0,
  Game: TC,
  GameObject: ri,
  Component: $n,
  Camera: Pb,
  CameraComponent: pr,
  MeshComponent: lr,
  TransformComponent: e1,
  SpriteRenderer: r3,
  glMatrix: GL,
  PathRenderer: a3,
  TextRenderer: i3,
  Plane: $b,
  Box: Hb,
  Cone: Vb,
  Ball: s3,
  Light: Qd,
  Canvas2dViewport: Wb,
  showDebug: nz,
  registerShader: bN,
  whiteFillShade: c3,
  // Built-in shaderType keys, to set on a MeshComponent as `meshRenderer.shaderType`.
  ShaderType: {
    ALBEDO_FLAT: ep,
    TEXTURE: tp,
    EMISSIVE_FLAT: kh,
    GOURAUD_SHADE: np
  },
  shaders: {
    flat: { fill: zs, shade: g3 },
    texture: { fill: y3, shade: Gd },
    gouraud: { fill: zs, shade: Gd }
  }
};
export {
  lz as default
};
