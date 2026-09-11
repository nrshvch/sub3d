const Q0 = {
  depthSortingMask: parseInt("11", 2),
  //bitmask, bit per layer
  layersCount: 1
};
function Rb() {
  this.now = Date.now();
}
var Q2 = Rb.prototype;
Q2.time = 0;
Q2.now = 0;
Q2.dt = 60;
function Mb() {
  this.gameObjects = [];
}
var B0 = Mb.prototype;
B0.gameObjects = null;
B0.addGameObject = function(t) {
  this.gameObjects[this.gameObjects.length++] = t, t.setScene(this);
};
B0.removeGameObject = function(t) {
  this.gameObjects[this.gameObjects.indexOf(t)] = this.gameObjects[this.gameObjects.length - 1], this.gameObjects.length -= 1;
};
B0.retrieve = function() {
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
function _b(t) {
  this.time = new Rb(), this.list = [], this.scene = new Mb(), this.lastTickTime = 0;
}
var Zd = _b.prototype;
Zd.scene = null;
Zd.time = null;
Zd.tickRegister = function(t) {
  t._tickerIndex === void 0 && (t._tickerIndex = this.list.length, this.list.push(t));
};
Zd.tickUnregister = function(t) {
  const a = t._tickerIndex;
  if (a === void 0) return;
  const s = this.list.pop();
  s !== t && (this.list[a] = s, s._tickerIndex = a), t._tickerIndex = void 0;
};
Zd.update = function(t) {
  const a = this.list;
  for (let s = 0; s < a.length; s++)
    a[s].tick(t);
};
Zd.tick = function() {
  for (var t = Date.now(), a = 0, s = t - this.time.now, f = this.time.dt; s >= f && (s -= f, this.time.now += f, this.time.time += f, this.update(this.time), !(a++ > 200)); )
    ;
};
function kb() {
  this.world = new _b();
  var t = this.world;
  this.tick = function a() {
    const s = performance.now();
    t.tick(), t.lastTickTime = performance.now() - s, requestAnimationFrame(a);
  };
}
var X0 = kb.prototype;
X0.world = null;
X0.render = null;
X0.run = function() {
  this.tick();
};
X0.rafHandler = null;
function $n() {
}
var K0 = $n.prototype;
K0.gameObject = null;
K0.enabled = !0;
K0.setGameObject = function(t) {
  this.gameObject = t;
};
K0.unsetGameObject = function() {
  this.gameObject = null;
};
function FD(t, a, s, f, p, m) {
  return t[a] = m[0] * s + m[4] * f + m[8] * p + m[12], t[a + 1] = m[1] * s + m[5] * f + m[9] * p + m[13], t[a + 2] = m[2] * s + m[6] * f + m[10] * p + m[14], t;
}
function PD(t, a, s, f, p, m) {
  return t[a] = m[0] * s + m[4] * f + m[8] * p + m[12], t[a + 1] = m[1] * s + m[5] * f + m[9] * p + m[13], t;
}
function Z0(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = a[6], b = a[7], C = a[8], R = a[9], _ = a[10], k = a[11], O = a[12], z = a[13], F = a[14], Y = a[15], P = s[0], N = s[1], H = s[2], I = s[3];
  return t[0] = P * f + N * E + H * C + I * O, t[1] = P * p + N * g + H * R + I * z, t[2] = P * m + N * x + H * _ + I * F, t[3] = P * v + N * b + H * k + I * Y, P = s[4], N = s[5], H = s[6], I = s[7], t[4] = P * f + N * E + H * C + I * O, t[5] = P * p + N * g + H * R + I * z, t[6] = P * m + N * x + H * _ + I * F, t[7] = P * v + N * b + H * k + I * Y, P = s[8], N = s[9], H = s[10], I = s[11], t[8] = P * f + N * E + H * C + I * O, t[9] = P * p + N * g + H * R + I * z, t[10] = P * m + N * x + H * _ + I * F, t[11] = P * v + N * b + H * k + I * Y, P = s[12], N = s[13], H = s[14], I = s[15], t[12] = P * f + N * E + H * C + I * O, t[13] = P * p + N * g + H * R + I * z, t[14] = P * m + N * x + H * _ + I * F, t[15] = P * v + N * b + H * k + I * Y, t;
}
var Rt = 1e-6, cn = typeof Float32Array < "u" ? Float32Array : Array, Bl = Math.random, Db = "zyx";
function jo(t) {
  return t >= 0 ? Math.round(t) : t % 0.5 === 0 ? Math.floor(t) : Math.round(t);
}
function $D(t) {
  cn = t;
}
var HD = Math.PI / 180, VD = 180 / Math.PI;
function ID(t) {
  return t * HD;
}
function qD(t) {
  return t * VD;
}
function YD(t, a) {
  var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Rt;
  return Math.abs(t - a) <= s * Math.max(1, Math.abs(t), Math.abs(a));
}
const WD = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: Db,
  get ARRAY_TYPE() {
    return cn;
  },
  EPSILON: Rt,
  RANDOM: Bl,
  equals: YD,
  round: jo,
  setMatrixArrayType: $D,
  toDegree: qD,
  toRadian: ID
}, Symbol.toStringTag, { value: "Module" }));
function GD() {
  var t = new cn(4);
  return cn != Float32Array && (t[1] = 0, t[2] = 0), t[0] = 1, t[3] = 1, t;
}
function QD(t) {
  var a = new cn(4);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a;
}
function BD(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t;
}
function XD(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t;
}
function KD(t, a, s, f) {
  var p = new cn(4);
  return p[0] = t, p[1] = a, p[2] = s, p[3] = f, p;
}
function ZD(t, a, s, f, p) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t;
}
function JD(t, a) {
  if (t === a) {
    var s = a[1];
    t[1] = a[2], t[2] = s;
  } else
    t[0] = a[0], t[1] = a[2], t[2] = a[1], t[3] = a[3];
  return t;
}
function e5(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s * m - p * f;
  return v ? (v = 1 / v, t[0] = m * v, t[1] = -f * v, t[2] = -p * v, t[3] = s * v, t) : null;
}
function t5(t, a) {
  var s = a[0];
  return t[0] = a[3], t[1] = -a[1], t[2] = -a[2], t[3] = s, t;
}
function n5(t) {
  return t[0] * t[3] - t[2] * t[1];
}
function Ob(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = s[0], g = s[1], x = s[2], b = s[3];
  return t[0] = f * E + m * g, t[1] = p * E + v * g, t[2] = f * x + m * b, t[3] = p * x + v * b, t;
}
function r5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = Math.sin(s), g = Math.cos(s);
  return t[0] = f * g + m * E, t[1] = p * g + v * E, t[2] = f * -E + m * g, t[3] = p * -E + v * g, t;
}
function a5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = s[0], g = s[1];
  return t[0] = f * E, t[1] = p * E, t[2] = m * g, t[3] = v * g, t;
}
function i5(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = s, t[2] = -s, t[3] = f, t;
}
function l5(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = a[1], t;
}
function o5(t) {
  return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
}
function s5(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3]);
}
function u5(t, a, s, f) {
  return t[2] = f[2] / f[0], s[0] = f[0], s[1] = f[1], s[3] = f[3] - t[2] * s[1], [t, a, s];
}
function c5(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t;
}
function Ab(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t;
}
function f5(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3];
}
function d5(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = a[0], E = a[1], g = a[2], x = a[3];
  return Math.abs(s - v) <= Rt * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(f - E) <= Rt * Math.max(1, Math.abs(f), Math.abs(E)) && Math.abs(p - g) <= Rt * Math.max(1, Math.abs(p), Math.abs(g)) && Math.abs(m - x) <= Rt * Math.max(1, Math.abs(m), Math.abs(x));
}
function p5(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t;
}
function v5(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t;
}
var h5 = Ob, m5 = Ab;
const y5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: u5,
  add: c5,
  adjoint: t5,
  clone: QD,
  copy: BD,
  create: GD,
  determinant: n5,
  equals: d5,
  exactEquals: f5,
  frob: s5,
  fromRotation: i5,
  fromScaling: l5,
  fromValues: KD,
  identity: XD,
  invert: e5,
  mul: h5,
  multiply: Ob,
  multiplyScalar: p5,
  multiplyScalarAndAdd: v5,
  rotate: r5,
  scale: a5,
  set: ZD,
  str: o5,
  sub: m5,
  subtract: Ab,
  transpose: JD
}, Symbol.toStringTag, { value: "Module" }));
function g5() {
  var t = new cn(6);
  return cn != Float32Array && (t[1] = 0, t[2] = 0, t[4] = 0, t[5] = 0), t[0] = 1, t[3] = 1, t;
}
function S5(t) {
  var a = new cn(6);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a;
}
function E5(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t;
}
function x5(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
}
function w5(t, a, s, f, p, m) {
  var v = new cn(6);
  return v[0] = t, v[1] = a, v[2] = s, v[3] = f, v[4] = p, v[5] = m, v;
}
function b5(t, a, s, f, p, m, v) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t;
}
function C5(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], E = a[5], g = s * m - f * p;
  return g ? (g = 1 / g, t[0] = m * g, t[1] = -f * g, t[2] = -p * g, t[3] = s * g, t[4] = (p * E - m * v) * g, t[5] = (f * v - s * E) * g, t) : null;
}
function T5(t) {
  return t[0] * t[3] - t[1] * t[2];
}
function zb(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = s[0], b = s[1], C = s[2], R = s[3], _ = s[4], k = s[5];
  return t[0] = f * x + m * b, t[1] = p * x + v * b, t[2] = f * C + m * R, t[3] = p * C + v * R, t[4] = f * _ + m * k + E, t[5] = p * _ + v * k + g, t;
}
function R5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = Math.sin(s), b = Math.cos(s);
  return t[0] = f * b + m * x, t[1] = p * b + v * x, t[2] = f * -x + m * b, t[3] = p * -x + v * b, t[4] = E, t[5] = g, t;
}
function M5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = s[0], b = s[1];
  return t[0] = f * x, t[1] = p * x, t[2] = m * b, t[3] = v * b, t[4] = E, t[5] = g, t;
}
function _5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = s[0], b = s[1];
  return t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = f * x + m * b + E, t[5] = p * x + v * b + g, t;
}
function k5(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = s, t[2] = -s, t[3] = f, t[4] = 0, t[5] = 0, t;
}
function D5(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = a[1], t[4] = 0, t[5] = 0, t;
}
function O5(t, a) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = a[0], t[5] = a[1], t;
}
function A5(t) {
  return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")";
}
function z5(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3] + t[4] * t[4] + t[5] * t[5] + 1);
}
function L5(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t[4] = a[4] + s[4], t[5] = a[5] + s[5], t;
}
function Lb(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t[4] = a[4] - s[4], t[5] = a[5] - s[5], t;
}
function N5(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t[4] = a[4] * s, t[5] = a[5] * s, t;
}
function U5(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t[4] = a[4] + s[4] * f, t[5] = a[5] + s[5] * f, t;
}
function j5(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5];
}
function F5(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = t[4], E = t[5], g = a[0], x = a[1], b = a[2], C = a[3], R = a[4], _ = a[5];
  return Math.abs(s - g) <= Rt * Math.max(1, Math.abs(s), Math.abs(g)) && Math.abs(f - x) <= Rt * Math.max(1, Math.abs(f), Math.abs(x)) && Math.abs(p - b) <= Rt * Math.max(1, Math.abs(p), Math.abs(b)) && Math.abs(m - C) <= Rt * Math.max(1, Math.abs(m), Math.abs(C)) && Math.abs(v - R) <= Rt * Math.max(1, Math.abs(v), Math.abs(R)) && Math.abs(E - _) <= Rt * Math.max(1, Math.abs(E), Math.abs(_));
}
var P5 = zb, $5 = Lb;
const H5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: L5,
  clone: S5,
  copy: E5,
  create: g5,
  determinant: T5,
  equals: F5,
  exactEquals: j5,
  frob: z5,
  fromRotation: k5,
  fromScaling: D5,
  fromTranslation: O5,
  fromValues: w5,
  identity: x5,
  invert: C5,
  mul: P5,
  multiply: zb,
  multiplyScalar: N5,
  multiplyScalarAndAdd: U5,
  rotate: R5,
  scale: M5,
  set: b5,
  str: A5,
  sub: $5,
  subtract: Lb,
  translate: _5
}, Symbol.toStringTag, { value: "Module" }));
function Nb() {
  var t = new cn(9);
  return cn != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[0] = 1, t[4] = 1, t[8] = 1, t;
}
function V5(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[4], t[4] = a[5], t[5] = a[6], t[6] = a[8], t[7] = a[9], t[8] = a[10], t;
}
function I5(t) {
  var a = new cn(9);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a;
}
function q5(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t;
}
function Y5(t, a, s, f, p, m, v, E, g) {
  var x = new cn(9);
  return x[0] = t, x[1] = a, x[2] = s, x[3] = f, x[4] = p, x[5] = m, x[6] = v, x[7] = E, x[8] = g, x;
}
function W5(t, a, s, f, p, m, v, E, g, x) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t[6] = E, t[7] = g, t[8] = x, t;
}
function G5(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
}
function Q5(t, a) {
  if (t === a) {
    var s = a[1], f = a[2], p = a[5];
    t[1] = a[3], t[2] = a[6], t[3] = s, t[5] = a[7], t[6] = f, t[7] = p;
  } else
    t[0] = a[0], t[1] = a[3], t[2] = a[6], t[3] = a[1], t[4] = a[4], t[5] = a[7], t[6] = a[2], t[7] = a[5], t[8] = a[8];
  return t;
}
function B5(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], E = a[5], g = a[6], x = a[7], b = a[8], C = b * v - E * x, R = -b * m + E * g, _ = x * m - v * g, k = s * C + f * R + p * _;
  return k ? (k = 1 / k, t[0] = C * k, t[1] = (-b * f + p * x) * k, t[2] = (E * f - p * v) * k, t[3] = R * k, t[4] = (b * s - p * g) * k, t[5] = (-E * s + p * m) * k, t[6] = _ * k, t[7] = (-x * s + f * g) * k, t[8] = (v * s - f * m) * k, t) : null;
}
function X5(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], E = a[5], g = a[6], x = a[7], b = a[8];
  return t[0] = v * b - E * x, t[1] = p * x - f * b, t[2] = f * E - p * v, t[3] = E * g - m * b, t[4] = s * b - p * g, t[5] = p * m - s * E, t[6] = m * x - v * g, t[7] = f * g - s * x, t[8] = s * v - f * m, t;
}
function K5(t) {
  var a = t[0], s = t[1], f = t[2], p = t[3], m = t[4], v = t[5], E = t[6], g = t[7], x = t[8];
  return a * (x * m - v * g) + s * (-x * p + v * E) + f * (g * p - m * E);
}
function Ub(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = a[6], b = a[7], C = a[8], R = s[0], _ = s[1], k = s[2], O = s[3], z = s[4], F = s[5], Y = s[6], P = s[7], N = s[8];
  return t[0] = R * f + _ * v + k * x, t[1] = R * p + _ * E + k * b, t[2] = R * m + _ * g + k * C, t[3] = O * f + z * v + F * x, t[4] = O * p + z * E + F * b, t[5] = O * m + z * g + F * C, t[6] = Y * f + P * v + N * x, t[7] = Y * p + P * E + N * b, t[8] = Y * m + P * g + N * C, t;
}
function Z5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = a[6], b = a[7], C = a[8], R = s[0], _ = s[1];
  return t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = E, t[5] = g, t[6] = R * f + _ * v + x, t[7] = R * p + _ * E + b, t[8] = R * m + _ * g + C, t;
}
function J5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = a[6], b = a[7], C = a[8], R = Math.sin(s), _ = Math.cos(s);
  return t[0] = _ * f + R * v, t[1] = _ * p + R * E, t[2] = _ * m + R * g, t[3] = _ * v - R * f, t[4] = _ * E - R * p, t[5] = _ * g - R * m, t[6] = x, t[7] = b, t[8] = C, t;
}
function eO(t, a, s) {
  var f = s[0], p = s[1];
  return t[0] = f * a[0], t[1] = f * a[1], t[2] = f * a[2], t[3] = p * a[3], t[4] = p * a[4], t[5] = p * a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t;
}
function tO(t, a) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = a[0], t[7] = a[1], t[8] = 1, t;
}
function nO(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = s, t[2] = 0, t[3] = -s, t[4] = f, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
}
function rO(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = a[1], t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
}
function aO(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = 0, t[3] = a[2], t[4] = a[3], t[5] = 0, t[6] = a[4], t[7] = a[5], t[8] = 1, t;
}
function iO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s + s, E = f + f, g = p + p, x = s * v, b = f * v, C = f * E, R = p * v, _ = p * E, k = p * g, O = m * v, z = m * E, F = m * g;
  return t[0] = 1 - C - k, t[3] = b - F, t[6] = R + z, t[1] = b + F, t[4] = 1 - x - k, t[7] = _ - O, t[2] = R - z, t[5] = _ + O, t[8] = 1 - x - C, t;
}
function lO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], E = a[5], g = a[6], x = a[7], b = a[8], C = a[9], R = a[10], _ = a[11], k = a[12], O = a[13], z = a[14], F = a[15], Y = s * E - f * v, P = s * g - p * v, N = s * x - m * v, H = f * g - p * E, I = f * x - m * E, V = p * x - m * g, oe = b * O - C * k, B = b * z - R * k, $ = b * F - _ * k, J = C * z - R * O, ee = C * F - _ * O, W = R * F - _ * z, X = Y * W - P * ee + N * J + H * $ - I * B + V * oe;
  return X ? (X = 1 / X, t[0] = (E * W - g * ee + x * J) * X, t[1] = (g * $ - v * W - x * B) * X, t[2] = (v * ee - E * $ + x * oe) * X, t[3] = (p * ee - f * W - m * J) * X, t[4] = (s * W - p * $ + m * B) * X, t[5] = (f * $ - s * ee - m * oe) * X, t[6] = (O * V - z * I + F * H) * X, t[7] = (z * N - k * V - F * P) * X, t[8] = (k * I - O * N + F * Y) * X, t) : null;
}
function oO(t, a, s) {
  return t[0] = 2 / a, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = -2 / s, t[5] = 0, t[6] = -1, t[7] = 1, t[8] = 1, t;
}
function sO(t) {
  return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")";
}
function uO(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3] + t[4] * t[4] + t[5] * t[5] + t[6] * t[6] + t[7] * t[7] + t[8] * t[8]);
}
function cO(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t[4] = a[4] + s[4], t[5] = a[5] + s[5], t[6] = a[6] + s[6], t[7] = a[7] + s[7], t[8] = a[8] + s[8], t;
}
function jb(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t[4] = a[4] - s[4], t[5] = a[5] - s[5], t[6] = a[6] - s[6], t[7] = a[7] - s[7], t[8] = a[8] - s[8], t;
}
function fO(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t[4] = a[4] * s, t[5] = a[5] * s, t[6] = a[6] * s, t[7] = a[7] * s, t[8] = a[8] * s, t;
}
function dO(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t[4] = a[4] + s[4] * f, t[5] = a[5] + s[5] * f, t[6] = a[6] + s[6] * f, t[7] = a[7] + s[7] * f, t[8] = a[8] + s[8] * f, t;
}
function pO(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7] && t[8] === a[8];
}
function vO(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = t[4], E = t[5], g = t[6], x = t[7], b = t[8], C = a[0], R = a[1], _ = a[2], k = a[3], O = a[4], z = a[5], F = a[6], Y = a[7], P = a[8];
  return Math.abs(s - C) <= Rt * Math.max(1, Math.abs(s), Math.abs(C)) && Math.abs(f - R) <= Rt * Math.max(1, Math.abs(f), Math.abs(R)) && Math.abs(p - _) <= Rt * Math.max(1, Math.abs(p), Math.abs(_)) && Math.abs(m - k) <= Rt * Math.max(1, Math.abs(m), Math.abs(k)) && Math.abs(v - O) <= Rt * Math.max(1, Math.abs(v), Math.abs(O)) && Math.abs(E - z) <= Rt * Math.max(1, Math.abs(E), Math.abs(z)) && Math.abs(g - F) <= Rt * Math.max(1, Math.abs(g), Math.abs(F)) && Math.abs(x - Y) <= Rt * Math.max(1, Math.abs(x), Math.abs(Y)) && Math.abs(b - P) <= Rt * Math.max(1, Math.abs(b), Math.abs(P));
}
var hO = Ub, mO = jb;
const yO = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: cO,
  adjoint: X5,
  clone: I5,
  copy: q5,
  create: Nb,
  determinant: K5,
  equals: vO,
  exactEquals: pO,
  frob: uO,
  fromMat2d: aO,
  fromMat4: V5,
  fromQuat: iO,
  fromRotation: nO,
  fromScaling: rO,
  fromTranslation: tO,
  fromValues: Y5,
  identity: G5,
  invert: B5,
  mul: hO,
  multiply: Ub,
  multiplyScalar: fO,
  multiplyScalarAndAdd: dO,
  normalFromMat4: lO,
  projection: oO,
  rotate: J5,
  scale: eO,
  set: W5,
  str: sO,
  sub: mO,
  subtract: jb,
  translate: Z5,
  transpose: Q5
}, Symbol.toStringTag, { value: "Module" }));
function gO() {
  var t = new cn(16);
  return cn != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0), t[0] = 1, t[5] = 1, t[10] = 1, t[15] = 1, t;
}
function SO(t) {
  var a = new cn(16);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a[9] = t[9], a[10] = t[10], a[11] = t[11], a[12] = t[12], a[13] = t[13], a[14] = t[14], a[15] = t[15], a;
}
function EO(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t;
}
function xO(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O) {
  var z = new cn(16);
  return z[0] = t, z[1] = a, z[2] = s, z[3] = f, z[4] = p, z[5] = m, z[6] = v, z[7] = E, z[8] = g, z[9] = x, z[10] = b, z[11] = C, z[12] = R, z[13] = _, z[14] = k, z[15] = O, z;
}
function wO(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t[6] = E, t[7] = g, t[8] = x, t[9] = b, t[10] = C, t[11] = R, t[12] = _, t[13] = k, t[14] = O, t[15] = z, t;
}
function B2(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function bO(t, a) {
  if (t === a) {
    var s = a[1], f = a[2], p = a[3], m = a[6], v = a[7], E = a[11];
    t[1] = a[4], t[2] = a[8], t[3] = a[12], t[4] = s, t[6] = a[9], t[7] = a[13], t[8] = f, t[9] = m, t[11] = a[14], t[12] = p, t[13] = v, t[14] = E;
  } else
    t[0] = a[0], t[1] = a[4], t[2] = a[8], t[3] = a[12], t[4] = a[1], t[5] = a[5], t[6] = a[9], t[7] = a[13], t[8] = a[2], t[9] = a[6], t[10] = a[10], t[11] = a[14], t[12] = a[3], t[13] = a[7], t[14] = a[11], t[15] = a[15];
  return t;
}
function Fb(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], E = a[5], g = a[6], x = a[7], b = a[8], C = a[9], R = a[10], _ = a[11], k = a[12], O = a[13], z = a[14], F = a[15], Y = s * E - f * v, P = s * g - p * v, N = s * x - m * v, H = f * g - p * E, I = f * x - m * E, V = p * x - m * g, oe = b * O - C * k, B = b * z - R * k, $ = b * F - _ * k, J = C * z - R * O, ee = C * F - _ * O, W = R * F - _ * z, X = Y * W - P * ee + N * J + H * $ - I * B + V * oe;
  return X ? (X = 1 / X, t[0] = (E * W - g * ee + x * J) * X, t[1] = (p * ee - f * W - m * J) * X, t[2] = (O * V - z * I + F * H) * X, t[3] = (R * I - C * V - _ * H) * X, t[4] = (g * $ - v * W - x * B) * X, t[5] = (s * W - p * $ + m * B) * X, t[6] = (z * N - k * V - F * P) * X, t[7] = (b * V - R * N + _ * P) * X, t[8] = (v * ee - E * $ + x * oe) * X, t[9] = (f * $ - s * ee - m * oe) * X, t[10] = (k * I - O * N + F * Y) * X, t[11] = (C * N - b * I - _ * Y) * X, t[12] = (E * B - v * J - g * oe) * X, t[13] = (s * J - f * B + p * oe) * X, t[14] = (O * P - k * H - z * Y) * X, t[15] = (b * H - C * P + R * Y) * X, t) : null;
}
function CO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], E = a[5], g = a[6], x = a[7], b = a[8], C = a[9], R = a[10], _ = a[11], k = a[12], O = a[13], z = a[14], F = a[15], Y = s * E - f * v, P = s * g - p * v, N = s * x - m * v, H = f * g - p * E, I = f * x - m * E, V = p * x - m * g, oe = b * O - C * k, B = b * z - R * k, $ = b * F - _ * k, J = C * z - R * O, ee = C * F - _ * O, W = R * F - _ * z;
  return t[0] = E * W - g * ee + x * J, t[1] = p * ee - f * W - m * J, t[2] = O * V - z * I + F * H, t[3] = R * I - C * V - _ * H, t[4] = g * $ - v * W - x * B, t[5] = s * W - p * $ + m * B, t[6] = z * N - k * V - F * P, t[7] = b * V - R * N + _ * P, t[8] = v * ee - E * $ + x * oe, t[9] = f * $ - s * ee - m * oe, t[10] = k * I - O * N + F * Y, t[11] = C * N - b * I - _ * Y, t[12] = E * B - v * J - g * oe, t[13] = s * J - f * B + p * oe, t[14] = O * P - k * H - z * Y, t[15] = b * H - C * P + R * Y, t;
}
function TO(t) {
  var a = t[0], s = t[1], f = t[2], p = t[3], m = t[4], v = t[5], E = t[6], g = t[7], x = t[8], b = t[9], C = t[10], R = t[11], _ = t[12], k = t[13], O = t[14], z = t[15], F = a * v - s * m, Y = a * E - f * m, P = s * E - f * v, N = x * k - b * _, H = x * O - C * _, I = b * O - C * k, V = a * I - s * H + f * N, oe = m * I - v * H + E * N, B = x * P - b * Y + C * F, $ = _ * P - k * Y + O * F;
  return g * V - p * oe + z * B - R * $;
}
function Pb(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = a[4], g = a[5], x = a[6], b = a[7], C = a[8], R = a[9], _ = a[10], k = a[11], O = a[12], z = a[13], F = a[14], Y = a[15], P = s[0], N = s[1], H = s[2], I = s[3];
  return t[0] = P * f + N * E + H * C + I * O, t[1] = P * p + N * g + H * R + I * z, t[2] = P * m + N * x + H * _ + I * F, t[3] = P * v + N * b + H * k + I * Y, P = s[4], N = s[5], H = s[6], I = s[7], t[4] = P * f + N * E + H * C + I * O, t[5] = P * p + N * g + H * R + I * z, t[6] = P * m + N * x + H * _ + I * F, t[7] = P * v + N * b + H * k + I * Y, P = s[8], N = s[9], H = s[10], I = s[11], t[8] = P * f + N * E + H * C + I * O, t[9] = P * p + N * g + H * R + I * z, t[10] = P * m + N * x + H * _ + I * F, t[11] = P * v + N * b + H * k + I * Y, P = s[12], N = s[13], H = s[14], I = s[15], t[12] = P * f + N * E + H * C + I * O, t[13] = P * p + N * g + H * R + I * z, t[14] = P * m + N * x + H * _ + I * F, t[15] = P * v + N * b + H * k + I * Y, t;
}
function L2(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v, E, g, x, b, C, R, _, k, O, z, F;
  return a === t ? (t[12] = a[0] * f + a[4] * p + a[8] * m + a[12], t[13] = a[1] * f + a[5] * p + a[9] * m + a[13], t[14] = a[2] * f + a[6] * p + a[10] * m + a[14], t[15] = a[3] * f + a[7] * p + a[11] * m + a[15]) : (v = a[0], E = a[1], g = a[2], x = a[3], b = a[4], C = a[5], R = a[6], _ = a[7], k = a[8], O = a[9], z = a[10], F = a[11], t[0] = v, t[1] = E, t[2] = g, t[3] = x, t[4] = b, t[5] = C, t[6] = R, t[7] = _, t[8] = k, t[9] = O, t[10] = z, t[11] = F, t[12] = v * f + b * p + k * m + a[12], t[13] = E * f + C * p + O * m + a[13], t[14] = g * f + R * p + z * m + a[14], t[15] = x * f + _ * p + F * m + a[15]), t;
}
function $b(t, a, s) {
  var f = s[0], p = s[1], m = s[2];
  return t[0] = a[0] * f, t[1] = a[1] * f, t[2] = a[2] * f, t[3] = a[3] * f, t[4] = a[4] * p, t[5] = a[5] * p, t[6] = a[6] * p, t[7] = a[7] * p, t[8] = a[8] * m, t[9] = a[9] * m, t[10] = a[10] * m, t[11] = a[11] * m, t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t;
}
function RO(t, a, s, f) {
  var p = f[0], m = f[1], v = f[2], E = Math.sqrt(p * p + m * m + v * v), g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe, B, $, J, ee, W, X, ae;
  return E < Rt ? null : (E = 1 / E, p *= E, m *= E, v *= E, g = Math.sin(s), x = Math.cos(s), b = 1 - x, C = a[0], R = a[1], _ = a[2], k = a[3], O = a[4], z = a[5], F = a[6], Y = a[7], P = a[8], N = a[9], H = a[10], I = a[11], V = p * p * b + x, oe = m * p * b + v * g, B = v * p * b - m * g, $ = p * m * b - v * g, J = m * m * b + x, ee = v * m * b + p * g, W = p * v * b + m * g, X = m * v * b - p * g, ae = v * v * b + x, t[0] = C * V + O * oe + P * B, t[1] = R * V + z * oe + N * B, t[2] = _ * V + F * oe + H * B, t[3] = k * V + Y * oe + I * B, t[4] = C * $ + O * J + P * ee, t[5] = R * $ + z * J + N * ee, t[6] = _ * $ + F * J + H * ee, t[7] = k * $ + Y * J + I * ee, t[8] = C * W + O * X + P * ae, t[9] = R * W + z * X + N * ae, t[10] = _ * W + F * X + H * ae, t[11] = k * W + Y * X + I * ae, a !== t && (t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t);
}
function MO(t, a, s) {
  var f = Math.sin(s), p = Math.cos(s), m = a[4], v = a[5], E = a[6], g = a[7], x = a[8], b = a[9], C = a[10], R = a[11];
  return a !== t && (t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[4] = m * p + x * f, t[5] = v * p + b * f, t[6] = E * p + C * f, t[7] = g * p + R * f, t[8] = x * p - m * f, t[9] = b * p - v * f, t[10] = C * p - E * f, t[11] = R * p - g * f, t;
}
function _O(t, a, s) {
  var f = Math.sin(s), p = Math.cos(s), m = a[0], v = a[1], E = a[2], g = a[3], x = a[8], b = a[9], C = a[10], R = a[11];
  return a !== t && (t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[0] = m * p - x * f, t[1] = v * p - b * f, t[2] = E * p - C * f, t[3] = g * p - R * f, t[8] = m * f + x * p, t[9] = v * f + b * p, t[10] = E * f + C * p, t[11] = g * f + R * p, t;
}
function kO(t, a, s) {
  var f = Math.sin(s), p = Math.cos(s), m = a[0], v = a[1], E = a[2], g = a[3], x = a[4], b = a[5], C = a[6], R = a[7];
  return a !== t && (t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[0] = m * p + x * f, t[1] = v * p + b * f, t[2] = E * p + C * f, t[3] = g * p + R * f, t[4] = x * p - m * f, t[5] = b * p - v * f, t[6] = C * p - E * f, t[7] = R * p - g * f, t;
}
function DO(t, a) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = a[0], t[13] = a[1], t[14] = a[2], t[15] = 1, t;
}
function OO(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = a[1], t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = a[2], t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function AO(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v = Math.sqrt(f * f + p * p + m * m), E, g, x;
  return v < Rt ? null : (v = 1 / v, f *= v, p *= v, m *= v, E = Math.sin(a), g = Math.cos(a), x = 1 - g, t[0] = f * f * x + g, t[1] = p * f * x + m * E, t[2] = m * f * x - p * E, t[3] = 0, t[4] = f * p * x - m * E, t[5] = p * p * x + g, t[6] = m * p * x + f * E, t[7] = 0, t[8] = f * m * x + p * E, t[9] = p * m * x - f * E, t[10] = m * m * x + g, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t);
}
function zO(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = f, t[6] = s, t[7] = 0, t[8] = 0, t[9] = -s, t[10] = f, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function LO(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = 0, t[2] = -s, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = s, t[9] = 0, t[10] = f, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function NO(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = s, t[2] = 0, t[3] = 0, t[4] = -s, t[5] = f, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function Hb(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = f + f, g = p + p, x = m + m, b = f * E, C = f * g, R = f * x, _ = p * g, k = p * x, O = m * x, z = v * E, F = v * g, Y = v * x;
  return t[0] = 1 - (_ + O), t[1] = C + Y, t[2] = R - F, t[3] = 0, t[4] = C - Y, t[5] = 1 - (b + O), t[6] = k + z, t[7] = 0, t[8] = R + F, t[9] = k - z, t[10] = 1 - (b + _), t[11] = 0, t[12] = s[0], t[13] = s[1], t[14] = s[2], t[15] = 1, t;
}
function UO(t, a) {
  var s = new cn(3), f = -a[0], p = -a[1], m = -a[2], v = a[3], E = a[4], g = a[5], x = a[6], b = a[7], C = f * f + p * p + m * m + v * v;
  return C > 0 ? (s[0] = (E * v + b * f + g * m - x * p) * 2 / C, s[1] = (g * v + b * p + x * f - E * m) * 2 / C, s[2] = (x * v + b * m + E * p - g * f) * 2 / C) : (s[0] = (E * v + b * f + g * m - x * p) * 2, s[1] = (g * v + b * p + x * f - E * m) * 2, s[2] = (x * v + b * m + E * p - g * f) * 2), Hb(t, a, s), t;
}
function Vb(t, a) {
  return t[0] = a[12], t[1] = a[13], t[2] = a[14], t;
}
function Ib(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[4], v = a[5], E = a[6], g = a[8], x = a[9], b = a[10];
  return t[0] = Math.sqrt(s * s + f * f + p * p), t[1] = Math.sqrt(m * m + v * v + E * E), t[2] = Math.sqrt(g * g + x * x + b * b), t;
}
function qb(t, a) {
  var s = new cn(3);
  Ib(s, a);
  var f = 1 / s[0], p = 1 / s[1], m = 1 / s[2], v = a[0] * f, E = a[1] * p, g = a[2] * m, x = a[4] * f, b = a[5] * p, C = a[6] * m, R = a[8] * f, _ = a[9] * p, k = a[10] * m, O = v + b + k, z = 0;
  return O > 0 ? (z = Math.sqrt(O + 1) * 2, t[3] = 0.25 * z, t[0] = (C - _) / z, t[1] = (R - g) / z, t[2] = (E - x) / z) : v > b && v > k ? (z = Math.sqrt(1 + v - b - k) * 2, t[3] = (C - _) / z, t[0] = 0.25 * z, t[1] = (E + x) / z, t[2] = (R + g) / z) : b > k ? (z = Math.sqrt(1 + b - v - k) * 2, t[3] = (R - g) / z, t[0] = (E + x) / z, t[1] = 0.25 * z, t[2] = (C + _) / z) : (z = Math.sqrt(1 + k - v - b) * 2, t[3] = (E - x) / z, t[0] = (R + g) / z, t[1] = (C + _) / z, t[2] = 0.25 * z), t;
}
function jO(t, a, s, f) {
  a[0] = f[12], a[1] = f[13], a[2] = f[14];
  var p = f[0], m = f[1], v = f[2], E = f[4], g = f[5], x = f[6], b = f[8], C = f[9], R = f[10];
  s[0] = Math.sqrt(p * p + m * m + v * v), s[1] = Math.sqrt(E * E + g * g + x * x), s[2] = Math.sqrt(b * b + C * C + R * R);
  var _ = 1 / s[0], k = 1 / s[1], O = 1 / s[2], z = p * _, F = m * k, Y = v * O, P = E * _, N = g * k, H = x * O, I = b * _, V = C * k, oe = R * O, B = z + N + oe, $ = 0;
  return B > 0 ? ($ = Math.sqrt(B + 1) * 2, t[3] = 0.25 * $, t[0] = (H - V) / $, t[1] = (I - Y) / $, t[2] = (F - P) / $) : z > N && z > oe ? ($ = Math.sqrt(1 + z - N - oe) * 2, t[3] = (H - V) / $, t[0] = 0.25 * $, t[1] = (F + P) / $, t[2] = (I + Y) / $) : N > oe ? ($ = Math.sqrt(1 + N - z - oe) * 2, t[3] = (I - Y) / $, t[0] = (F + P) / $, t[1] = 0.25 * $, t[2] = (H + V) / $) : ($ = Math.sqrt(1 + oe - z - N) * 2, t[3] = (F - P) / $, t[0] = (I + Y) / $, t[1] = (H + V) / $, t[2] = 0.25 * $), t;
}
function FO(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2], E = a[3], g = p + p, x = m + m, b = v + v, C = p * g, R = p * x, _ = p * b, k = m * x, O = m * b, z = v * b, F = E * g, Y = E * x, P = E * b, N = f[0], H = f[1], I = f[2];
  return t[0] = (1 - (k + z)) * N, t[1] = (R + P) * N, t[2] = (_ - Y) * N, t[3] = 0, t[4] = (R - P) * H, t[5] = (1 - (C + z)) * H, t[6] = (O + F) * H, t[7] = 0, t[8] = (_ + Y) * I, t[9] = (O - F) * I, t[10] = (1 - (C + k)) * I, t[11] = 0, t[12] = s[0], t[13] = s[1], t[14] = s[2], t[15] = 1, t;
}
function PO(t, a, s, f, p) {
  var m = a[0], v = a[1], E = a[2], g = a[3], x = m + m, b = v + v, C = E + E, R = m * x, _ = m * b, k = m * C, O = v * b, z = v * C, F = E * C, Y = g * x, P = g * b, N = g * C, H = f[0], I = f[1], V = f[2], oe = p[0], B = p[1], $ = p[2], J = (1 - (O + F)) * H, ee = (_ + N) * H, W = (k - P) * H, X = (_ - N) * I, ae = (1 - (R + F)) * I, de = (z + Y) * I, le = (k + P) * V, ie = (z - Y) * V, se = (1 - (R + O)) * V;
  return t[0] = J, t[1] = ee, t[2] = W, t[3] = 0, t[4] = X, t[5] = ae, t[6] = de, t[7] = 0, t[8] = le, t[9] = ie, t[10] = se, t[11] = 0, t[12] = s[0] + oe - (J * oe + X * B + le * $), t[13] = s[1] + B - (ee * oe + ae * B + ie * $), t[14] = s[2] + $ - (W * oe + de * B + se * $), t[15] = 1, t;
}
function $O(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s + s, E = f + f, g = p + p, x = s * v, b = f * v, C = f * E, R = p * v, _ = p * E, k = p * g, O = m * v, z = m * E, F = m * g;
  return t[0] = 1 - C - k, t[1] = b + F, t[2] = R - z, t[3] = 0, t[4] = b - F, t[5] = 1 - x - k, t[6] = _ + O, t[7] = 0, t[8] = R + z, t[9] = _ - O, t[10] = 1 - x - C, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function HO(t, a, s, f, p, m, v) {
  var E = 1 / (s - a), g = 1 / (p - f), x = 1 / (m - v);
  return t[0] = m * 2 * E, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = m * 2 * g, t[6] = 0, t[7] = 0, t[8] = (s + a) * E, t[9] = (p + f) * g, t[10] = (v + m) * x, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = v * m * 2 * x, t[15] = 0, t;
}
function Yb(t, a, s, f, p) {
  var m = 1 / Math.tan(a / 2);
  if (t[0] = m / s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = m, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = -1, t[12] = 0, t[13] = 0, t[15] = 0, p != null && p !== 1 / 0) {
    var v = 1 / (f - p);
    t[10] = (p + f) * v, t[14] = 2 * p * f * v;
  } else
    t[10] = -1, t[14] = -2 * f;
  return t;
}
var VO = Yb;
function IO(t, a, s, f, p) {
  var m = 1 / Math.tan(a / 2);
  if (t[0] = m / s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = m, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = -1, t[12] = 0, t[13] = 0, t[15] = 0, p != null && p !== 1 / 0) {
    var v = 1 / (f - p);
    t[10] = p * v, t[14] = p * f * v;
  } else
    t[10] = -1, t[14] = -f;
  return t;
}
function qO(t, a, s, f) {
  var p = Math.tan(a.upDegrees * Math.PI / 180), m = Math.tan(a.downDegrees * Math.PI / 180), v = Math.tan(a.leftDegrees * Math.PI / 180), E = Math.tan(a.rightDegrees * Math.PI / 180), g = 2 / (v + E), x = 2 / (p + m);
  return t[0] = g, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = x, t[6] = 0, t[7] = 0, t[8] = -((v - E) * g * 0.5), t[9] = (p - m) * x * 0.5, t[10] = f / (s - f), t[11] = -1, t[12] = 0, t[13] = 0, t[14] = f * s / (s - f), t[15] = 0, t;
}
function Wb(t, a, s, f, p, m, v) {
  var E = 1 / (a - s), g = 1 / (f - p), x = 1 / (m - v);
  return t[0] = -2 * E, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * g, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * x, t[11] = 0, t[12] = (a + s) * E, t[13] = (p + f) * g, t[14] = (v + m) * x, t[15] = 1, t;
}
var Gb = Wb;
function YO(t, a, s, f, p, m, v) {
  var E = 1 / (a - s), g = 1 / (f - p), x = 1 / (m - v);
  return t[0] = -2 * E, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * g, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = x, t[11] = 0, t[12] = (a + s) * E, t[13] = (p + f) * g, t[14] = m * x, t[15] = 1, t;
}
function WO(t, a, s, f) {
  var p, m, v, E, g, x, b, C, R, _, k = a[0], O = a[1], z = a[2], F = f[0], Y = f[1], P = f[2], N = s[0], H = s[1], I = s[2];
  return Math.abs(k - N) < Rt && Math.abs(O - H) < Rt && Math.abs(z - I) < Rt ? B2(t) : (b = k - N, C = O - H, R = z - I, _ = 1 / Math.sqrt(b * b + C * C + R * R), b *= _, C *= _, R *= _, p = Y * R - P * C, m = P * b - F * R, v = F * C - Y * b, _ = Math.sqrt(p * p + m * m + v * v), _ ? (_ = 1 / _, p *= _, m *= _, v *= _) : (p = 0, m = 0, v = 0), E = C * v - R * m, g = R * p - b * v, x = b * m - C * p, _ = Math.sqrt(E * E + g * g + x * x), _ ? (_ = 1 / _, E *= _, g *= _, x *= _) : (E = 0, g = 0, x = 0), t[0] = p, t[1] = E, t[2] = b, t[3] = 0, t[4] = m, t[5] = g, t[6] = C, t[7] = 0, t[8] = v, t[9] = x, t[10] = R, t[11] = 0, t[12] = -(p * k + m * O + v * z), t[13] = -(E * k + g * O + x * z), t[14] = -(b * k + C * O + R * z), t[15] = 1, t);
}
function GO(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2], E = f[0], g = f[1], x = f[2], b = p - s[0], C = m - s[1], R = v - s[2], _ = b * b + C * C + R * R;
  _ > 0 && (_ = 1 / Math.sqrt(_), b *= _, C *= _, R *= _);
  var k = g * R - x * C, O = x * b - E * R, z = E * C - g * b;
  return _ = k * k + O * O + z * z, _ > 0 && (_ = 1 / Math.sqrt(_), k *= _, O *= _, z *= _), t[0] = k, t[1] = O, t[2] = z, t[3] = 0, t[4] = C * z - R * O, t[5] = R * k - b * z, t[6] = b * O - C * k, t[7] = 0, t[8] = b, t[9] = C, t[10] = R, t[11] = 0, t[12] = p, t[13] = m, t[14] = v, t[15] = 1, t;
}
function QO(t) {
  return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")";
}
function BO(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3] + t[4] * t[4] + t[5] * t[5] + t[6] * t[6] + t[7] * t[7] + t[8] * t[8] + t[9] * t[9] + t[10] * t[10] + t[11] * t[11] + t[12] * t[12] + t[13] * t[13] + t[14] * t[14] + t[15] * t[15]);
}
function XO(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t[4] = a[4] + s[4], t[5] = a[5] + s[5], t[6] = a[6] + s[6], t[7] = a[7] + s[7], t[8] = a[8] + s[8], t[9] = a[9] + s[9], t[10] = a[10] + s[10], t[11] = a[11] + s[11], t[12] = a[12] + s[12], t[13] = a[13] + s[13], t[14] = a[14] + s[14], t[15] = a[15] + s[15], t;
}
function Qb(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t[4] = a[4] - s[4], t[5] = a[5] - s[5], t[6] = a[6] - s[6], t[7] = a[7] - s[7], t[8] = a[8] - s[8], t[9] = a[9] - s[9], t[10] = a[10] - s[10], t[11] = a[11] - s[11], t[12] = a[12] - s[12], t[13] = a[13] - s[13], t[14] = a[14] - s[14], t[15] = a[15] - s[15], t;
}
function KO(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t[4] = a[4] * s, t[5] = a[5] * s, t[6] = a[6] * s, t[7] = a[7] * s, t[8] = a[8] * s, t[9] = a[9] * s, t[10] = a[10] * s, t[11] = a[11] * s, t[12] = a[12] * s, t[13] = a[13] * s, t[14] = a[14] * s, t[15] = a[15] * s, t;
}
function ZO(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t[4] = a[4] + s[4] * f, t[5] = a[5] + s[5] * f, t[6] = a[6] + s[6] * f, t[7] = a[7] + s[7] * f, t[8] = a[8] + s[8] * f, t[9] = a[9] + s[9] * f, t[10] = a[10] + s[10] * f, t[11] = a[11] + s[11] * f, t[12] = a[12] + s[12] * f, t[13] = a[13] + s[13] * f, t[14] = a[14] + s[14] * f, t[15] = a[15] + s[15] * f, t;
}
function JO(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7] && t[8] === a[8] && t[9] === a[9] && t[10] === a[10] && t[11] === a[11] && t[12] === a[12] && t[13] === a[13] && t[14] === a[14] && t[15] === a[15];
}
function eA(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = t[4], E = t[5], g = t[6], x = t[7], b = t[8], C = t[9], R = t[10], _ = t[11], k = t[12], O = t[13], z = t[14], F = t[15], Y = a[0], P = a[1], N = a[2], H = a[3], I = a[4], V = a[5], oe = a[6], B = a[7], $ = a[8], J = a[9], ee = a[10], W = a[11], X = a[12], ae = a[13], de = a[14], le = a[15];
  return Math.abs(s - Y) <= Rt * Math.max(1, Math.abs(s), Math.abs(Y)) && Math.abs(f - P) <= Rt * Math.max(1, Math.abs(f), Math.abs(P)) && Math.abs(p - N) <= Rt * Math.max(1, Math.abs(p), Math.abs(N)) && Math.abs(m - H) <= Rt * Math.max(1, Math.abs(m), Math.abs(H)) && Math.abs(v - I) <= Rt * Math.max(1, Math.abs(v), Math.abs(I)) && Math.abs(E - V) <= Rt * Math.max(1, Math.abs(E), Math.abs(V)) && Math.abs(g - oe) <= Rt * Math.max(1, Math.abs(g), Math.abs(oe)) && Math.abs(x - B) <= Rt * Math.max(1, Math.abs(x), Math.abs(B)) && Math.abs(b - $) <= Rt * Math.max(1, Math.abs(b), Math.abs($)) && Math.abs(C - J) <= Rt * Math.max(1, Math.abs(C), Math.abs(J)) && Math.abs(R - ee) <= Rt * Math.max(1, Math.abs(R), Math.abs(ee)) && Math.abs(_ - W) <= Rt * Math.max(1, Math.abs(_), Math.abs(W)) && Math.abs(k - X) <= Rt * Math.max(1, Math.abs(k), Math.abs(X)) && Math.abs(O - ae) <= Rt * Math.max(1, Math.abs(O), Math.abs(ae)) && Math.abs(z - de) <= Rt * Math.max(1, Math.abs(z), Math.abs(de)) && Math.abs(F - le) <= Rt * Math.max(1, Math.abs(F), Math.abs(le));
}
var tA = Pb, nA = Qb;
const Bb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: XO,
  adjoint: CO,
  clone: SO,
  copy: EO,
  create: gO,
  decompose: jO,
  determinant: TO,
  equals: eA,
  exactEquals: JO,
  frob: BO,
  fromQuat: $O,
  fromQuat2: UO,
  fromRotation: AO,
  fromRotationTranslation: Hb,
  fromRotationTranslationScale: FO,
  fromRotationTranslationScaleOrigin: PO,
  fromScaling: OO,
  fromTranslation: DO,
  fromValues: xO,
  fromXRotation: zO,
  fromYRotation: LO,
  fromZRotation: NO,
  frustum: HO,
  getRotation: qb,
  getScaling: Ib,
  getTranslation: Vb,
  identity: B2,
  invert: Fb,
  lookAt: WO,
  mul: tA,
  multiply: Pb,
  multiplyScalar: KO,
  multiplyScalarAndAdd: ZO,
  ortho: Gb,
  orthoNO: Wb,
  orthoZO: YO,
  perspective: VO,
  perspectiveFromFieldOfView: qO,
  perspectiveNO: Yb,
  perspectiveZO: IO,
  rotate: RO,
  rotateX: MO,
  rotateY: _O,
  rotateZ: kO,
  scale: $b,
  set: wO,
  str: QO,
  sub: nA,
  subtract: Qb,
  targetTo: GO,
  translate: L2,
  transpose: bO
}, Symbol.toStringTag, { value: "Module" }));
function X2() {
  var t = new cn(3);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t;
}
function rA(t) {
  var a = new cn(3);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a;
}
function Xb(t) {
  var a = t[0], s = t[1], f = t[2];
  return Math.sqrt(a * a + s * s + f * f);
}
function N2(t, a, s) {
  var f = new cn(3);
  return f[0] = t, f[1] = a, f[2] = s, f;
}
function aA(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t;
}
function iA(t, a, s, f) {
  return t[0] = a, t[1] = s, t[2] = f, t;
}
function lA(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t;
}
function Kb(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t;
}
function Zb(t, a, s) {
  return t[0] = a[0] * s[0], t[1] = a[1] * s[1], t[2] = a[2] * s[2], t;
}
function Jb(t, a, s) {
  return t[0] = a[0] / s[0], t[1] = a[1] / s[1], t[2] = a[2] / s[2], t;
}
function oA(t, a) {
  return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t[2] = Math.ceil(a[2]), t;
}
function sA(t, a) {
  return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t[2] = Math.floor(a[2]), t;
}
function uA(t, a, s) {
  return t[0] = Math.min(a[0], s[0]), t[1] = Math.min(a[1], s[1]), t[2] = Math.min(a[2], s[2]), t;
}
function cA(t, a, s) {
  return t[0] = Math.max(a[0], s[0]), t[1] = Math.max(a[1], s[1]), t[2] = Math.max(a[2], s[2]), t;
}
function fA(t, a) {
  return t[0] = jo(a[0]), t[1] = jo(a[1]), t[2] = jo(a[2]), t;
}
function dA(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t;
}
function pA(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t;
}
function eC(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2];
  return Math.sqrt(s * s + f * f + p * p);
}
function tC(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2];
  return s * s + f * f + p * p;
}
function nC(t) {
  var a = t[0], s = t[1], f = t[2];
  return a * a + s * s + f * f;
}
function vA(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t;
}
function hA(t, a) {
  return t[0] = 1 / a[0], t[1] = 1 / a[1], t[2] = 1 / a[2], t;
}
function rC(t, a) {
  var s = a[0], f = a[1], p = a[2], m = s * s + f * f + p * p;
  return m > 0 && (m = 1 / Math.sqrt(m)), t[0] = a[0] * m, t[1] = a[1] * m, t[2] = a[2] * m, t;
}
function J0(t, a) {
  return t[0] * a[0] + t[1] * a[1] + t[2] * a[2];
}
function L0(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = s[0], E = s[1], g = s[2];
  return t[0] = p * g - m * E, t[1] = m * v - f * g, t[2] = f * E - p * v, t;
}
function mA(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2];
  return t[0] = p + f * (s[0] - p), t[1] = m + f * (s[1] - m), t[2] = v + f * (s[2] - v), t;
}
function yA(t, a, s, f) {
  var p = Math.acos(Math.min(Math.max(J0(a, s), -1), 1)), m = Math.sin(p), v = Math.sin((1 - f) * p) / m, E = Math.sin(f * p) / m;
  return t[0] = v * a[0] + E * s[0], t[1] = v * a[1] + E * s[1], t[2] = v * a[2] + E * s[2], t;
}
function gA(t, a, s, f, p, m) {
  var v = m * m, E = v * (2 * m - 3) + 1, g = v * (m - 2) + m, x = v * (m - 1), b = v * (3 - 2 * m);
  return t[0] = a[0] * E + s[0] * g + f[0] * x + p[0] * b, t[1] = a[1] * E + s[1] * g + f[1] * x + p[1] * b, t[2] = a[2] * E + s[2] * g + f[2] * x + p[2] * b, t;
}
function SA(t, a, s, f, p, m) {
  var v = 1 - m, E = v * v, g = m * m, x = E * v, b = 3 * m * E, C = 3 * g * v, R = g * m;
  return t[0] = a[0] * x + s[0] * b + f[0] * C + p[0] * R, t[1] = a[1] * x + s[1] * b + f[1] * C + p[1] * R, t[2] = a[2] * x + s[2] * b + f[2] * C + p[2] * R, t;
}
function EA(t, a) {
  a = a === void 0 ? 1 : a;
  var s = Bl() * 2 * Math.PI, f = Bl() * 2 - 1, p = Math.sqrt(1 - f * f) * a;
  return t[0] = Math.cos(s) * p, t[1] = Math.sin(s) * p, t[2] = f * a, t;
}
function aC(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = s[3] * f + s[7] * p + s[11] * m + s[15];
  return v = v || 1, t[0] = (s[0] * f + s[4] * p + s[8] * m + s[12]) / v, t[1] = (s[1] * f + s[5] * p + s[9] * m + s[13]) / v, t[2] = (s[2] * f + s[6] * p + s[10] * m + s[14]) / v, t;
}
function xA(t, a, s) {
  var f = a[0], p = a[1], m = a[2];
  return t[0] = f * s[0] + p * s[3] + m * s[6], t[1] = f * s[1] + p * s[4] + m * s[7], t[2] = f * s[2] + p * s[5] + m * s[8], t;
}
function wA(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v = s[3], E = a[0], g = a[1], x = a[2], b = p * x - m * g, C = m * E - f * x, R = f * g - p * E;
  return b = b + b, C = C + C, R = R + R, t[0] = E + v * b + p * R - m * C, t[1] = g + v * C + m * b - f * R, t[2] = x + v * R + f * C - p * b, t;
}
function bA(t, a, s, f) {
  var p = [], m = [];
  return p[0] = a[0] - s[0], p[1] = a[1] - s[1], p[2] = a[2] - s[2], m[0] = p[0], m[1] = p[1] * Math.cos(f) - p[2] * Math.sin(f), m[2] = p[1] * Math.sin(f) + p[2] * Math.cos(f), t[0] = m[0] + s[0], t[1] = m[1] + s[1], t[2] = m[2] + s[2], t;
}
function CA(t, a, s, f) {
  var p = [], m = [];
  return p[0] = a[0] - s[0], p[1] = a[1] - s[1], p[2] = a[2] - s[2], m[0] = p[2] * Math.sin(f) + p[0] * Math.cos(f), m[1] = p[1], m[2] = p[2] * Math.cos(f) - p[0] * Math.sin(f), t[0] = m[0] + s[0], t[1] = m[1] + s[1], t[2] = m[2] + s[2], t;
}
function TA(t, a, s, f) {
  var p = [], m = [];
  return p[0] = a[0] - s[0], p[1] = a[1] - s[1], p[2] = a[2] - s[2], m[0] = p[0] * Math.cos(f) - p[1] * Math.sin(f), m[1] = p[0] * Math.sin(f) + p[1] * Math.cos(f), m[2] = p[2], t[0] = m[0] + s[0], t[1] = m[1] + s[1], t[2] = m[2] + s[2], t;
}
function RA(t, a) {
  var s = t[0], f = t[1], p = t[2], m = a[0], v = a[1], E = a[2], g = Math.sqrt((s * s + f * f + p * p) * (m * m + v * v + E * E)), x = g && J0(t, a) / g;
  return Math.acos(Math.min(Math.max(x, -1), 1));
}
function MA(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t;
}
function _A(t) {
  return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
}
function kA(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2];
}
function DA(t, a) {
  var s = t[0], f = t[1], p = t[2], m = a[0], v = a[1], E = a[2];
  return Math.abs(s - m) <= Rt * Math.max(1, Math.abs(s), Math.abs(m)) && Math.abs(f - v) <= Rt * Math.max(1, Math.abs(f), Math.abs(v)) && Math.abs(p - E) <= Rt * Math.max(1, Math.abs(p), Math.abs(E));
}
var OA = Kb, AA = Zb, zA = Jb, LA = eC, NA = tC, iC = Xb, UA = nC, jA = (function() {
  var t = X2();
  return function(a, s, f, p, m, v) {
    var E, g;
    for (s || (s = 3), f || (f = 0), p ? g = Math.min(p * s + f, a.length) : g = a.length, E = f; E < g; E += s)
      t[0] = a[E], t[1] = a[E + 1], t[2] = a[E + 2], m(t, t, v), a[E] = t[0], a[E + 1] = t[1], a[E + 2] = t[2];
    return a;
  };
})();
const FA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: lA,
  angle: RA,
  bezier: SA,
  ceil: oA,
  clone: rA,
  copy: aA,
  create: X2,
  cross: L0,
  dist: LA,
  distance: eC,
  div: zA,
  divide: Jb,
  dot: J0,
  equals: DA,
  exactEquals: kA,
  floor: sA,
  forEach: jA,
  fromValues: N2,
  hermite: gA,
  inverse: hA,
  len: iC,
  length: Xb,
  lerp: mA,
  max: cA,
  min: uA,
  mul: AA,
  multiply: Zb,
  negate: vA,
  normalize: rC,
  random: EA,
  rotateX: bA,
  rotateY: CA,
  rotateZ: TA,
  round: fA,
  scale: dA,
  scaleAndAdd: pA,
  set: iA,
  slerp: yA,
  sqrDist: NA,
  sqrLen: UA,
  squaredDistance: tC,
  squaredLength: nC,
  str: _A,
  sub: OA,
  subtract: Kb,
  transformMat3: xA,
  transformMat4: aC,
  transformQuat: wA,
  zero: MA
}, Symbol.toStringTag, { value: "Module" }));
function lC() {
  var t = new cn(4);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0), t;
}
function oC(t) {
  var a = new cn(4);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a;
}
function sC(t, a, s, f) {
  var p = new cn(4);
  return p[0] = t, p[1] = a, p[2] = s, p[3] = f, p;
}
function uC(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t;
}
function cC(t, a, s, f, p) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t;
}
function fC(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t;
}
function dC(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t;
}
function pC(t, a, s) {
  return t[0] = a[0] * s[0], t[1] = a[1] * s[1], t[2] = a[2] * s[2], t[3] = a[3] * s[3], t;
}
function vC(t, a, s) {
  return t[0] = a[0] / s[0], t[1] = a[1] / s[1], t[2] = a[2] / s[2], t[3] = a[3] / s[3], t;
}
function PA(t, a) {
  return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t[2] = Math.ceil(a[2]), t[3] = Math.ceil(a[3]), t;
}
function $A(t, a) {
  return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t[2] = Math.floor(a[2]), t[3] = Math.floor(a[3]), t;
}
function HA(t, a, s) {
  return t[0] = Math.min(a[0], s[0]), t[1] = Math.min(a[1], s[1]), t[2] = Math.min(a[2], s[2]), t[3] = Math.min(a[3], s[3]), t;
}
function VA(t, a, s) {
  return t[0] = Math.max(a[0], s[0]), t[1] = Math.max(a[1], s[1]), t[2] = Math.max(a[2], s[2]), t[3] = Math.max(a[3], s[3]), t;
}
function IA(t, a) {
  return t[0] = jo(a[0]), t[1] = jo(a[1]), t[2] = jo(a[2]), t[3] = jo(a[3]), t;
}
function hC(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t;
}
function qA(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t;
}
function mC(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2], m = a[3] - t[3];
  return Math.sqrt(s * s + f * f + p * p + m * m);
}
function yC(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2], m = a[3] - t[3];
  return s * s + f * f + p * p + m * m;
}
function K2(t) {
  var a = t[0], s = t[1], f = t[2], p = t[3];
  return Math.sqrt(a * a + s * s + f * f + p * p);
}
function Z2(t) {
  var a = t[0], s = t[1], f = t[2], p = t[3];
  return a * a + s * s + f * f + p * p;
}
function YA(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = -a[3], t;
}
function WA(t, a) {
  return t[0] = 1 / a[0], t[1] = 1 / a[1], t[2] = 1 / a[2], t[3] = 1 / a[3], t;
}
function gC(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s * s + f * f + p * p + m * m;
  return v > 0 && (v = 1 / Math.sqrt(v)), t[0] = s * v, t[1] = f * v, t[2] = p * v, t[3] = m * v, t;
}
function J2(t, a) {
  return t[0] * a[0] + t[1] * a[1] + t[2] * a[2] + t[3] * a[3];
}
function GA(t, a, s, f) {
  var p = s[0] * f[1] - s[1] * f[0], m = s[0] * f[2] - s[2] * f[0], v = s[0] * f[3] - s[3] * f[0], E = s[1] * f[2] - s[2] * f[1], g = s[1] * f[3] - s[3] * f[1], x = s[2] * f[3] - s[3] * f[2], b = a[0], C = a[1], R = a[2], _ = a[3];
  return t[0] = C * x - R * g + _ * E, t[1] = -(b * x) + R * v - _ * m, t[2] = b * g - C * v + _ * p, t[3] = -(b * E) + C * m - R * p, t;
}
function SC(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2], E = a[3];
  return t[0] = p + f * (s[0] - p), t[1] = m + f * (s[1] - m), t[2] = v + f * (s[2] - v), t[3] = E + f * (s[3] - E), t;
}
function QA(t, a) {
  a = a === void 0 ? 1 : a;
  var s, f, p, m, v, E, g;
  g = Bl(), s = g * 2 - 1, f = (4 * Bl() - 2) * Math.sqrt(g * -g + g), v = s * s + f * f, g = Bl(), p = g * 2 - 1, m = (4 * Bl() - 2) * Math.sqrt(g * -g + g), E = p * p + m * m;
  var x = Math.sqrt((1 - v) / E);
  return t[0] = a * s, t[1] = a * f, t[2] = a * p * x, t[3] = a * m * x, t;
}
function BA(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3];
  return t[0] = s[0] * f + s[4] * p + s[8] * m + s[12] * v, t[1] = s[1] * f + s[5] * p + s[9] * m + s[13] * v, t[2] = s[2] * f + s[6] * p + s[10] * m + s[14] * v, t[3] = s[3] * f + s[7] * p + s[11] * m + s[15] * v, t;
}
function XA(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v = s[3], E = a[0], g = a[1], x = a[2], b = p * x - m * g, C = m * E - f * x, R = f * g - p * E;
  return b = b + b, C = C + C, R = R + R, t[0] = E + v * b + p * R - m * C, t[1] = g + v * C + m * b - f * R, t[2] = x + v * R + f * C - p * b, t[3] = a[3], t;
}
function KA(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t;
}
function ZA(t) {
  return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
}
function EC(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3];
}
function JA(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = a[0], E = a[1], g = a[2], x = a[3];
  return Math.abs(s - v) <= Rt * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(f - E) <= Rt * Math.max(1, Math.abs(f), Math.abs(E)) && Math.abs(p - g) <= Rt * Math.max(1, Math.abs(p), Math.abs(g)) && Math.abs(m - x) <= Rt * Math.max(1, Math.abs(m), Math.abs(x));
}
var e4 = dC, t4 = pC, n4 = vC, r4 = mC, a4 = yC, i4 = K2, l4 = Z2, o4 = (function() {
  var t = lC();
  return function(a, s, f, p, m, v) {
    var E, g;
    for (s || (s = 4), f || (f = 0), p ? g = Math.min(p * s + f, a.length) : g = a.length, E = f; E < g; E += s)
      t[0] = a[E], t[1] = a[E + 1], t[2] = a[E + 2], t[3] = a[E + 3], m(t, t, v), a[E] = t[0], a[E + 1] = t[1], a[E + 2] = t[2], a[E + 3] = t[3];
    return a;
  };
})();
const s4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: fC,
  ceil: PA,
  clone: oC,
  copy: uC,
  create: lC,
  cross: GA,
  dist: r4,
  distance: mC,
  div: n4,
  divide: vC,
  dot: J2,
  equals: JA,
  exactEquals: EC,
  floor: $A,
  forEach: o4,
  fromValues: sC,
  inverse: WA,
  len: i4,
  length: K2,
  lerp: SC,
  max: VA,
  min: HA,
  mul: t4,
  multiply: pC,
  negate: YA,
  normalize: gC,
  random: QA,
  round: IA,
  scale: hC,
  scaleAndAdd: qA,
  set: cC,
  sqrDist: a4,
  sqrLen: l4,
  squaredDistance: yC,
  squaredLength: Z2,
  str: ZA,
  sub: e4,
  subtract: dC,
  transformMat4: BA,
  transformQuat: XA,
  zero: KA
}, Symbol.toStringTag, { value: "Module" }));
function H0() {
  var t = new cn(4);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t[3] = 1, t;
}
function u4(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t;
}
function xC(t, a, s) {
  s = s * 0.5;
  var f = Math.sin(s);
  return t[0] = f * a[0], t[1] = f * a[1], t[2] = f * a[2], t[3] = Math.cos(s), t;
}
function c4(t, a) {
  var s = Math.acos(a[3]) * 2, f = Math.sin(s / 2);
  return f > Rt ? (t[0] = a[0] / f, t[1] = a[1] / f, t[2] = a[2] / f) : (t[0] = 1, t[1] = 0, t[2] = 0), s;
}
function f4(t, a) {
  var s = t3(t, a);
  return Math.acos(2 * s * s - 1);
}
function wC(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = s[0], g = s[1], x = s[2], b = s[3];
  return t[0] = f * b + v * E + p * x - m * g, t[1] = p * b + v * g + m * E - f * x, t[2] = m * b + v * x + f * g - p * E, t[3] = v * b - f * E - p * g - m * x, t;
}
function bC(t, a, s) {
  s *= 0.5;
  var f = a[0], p = a[1], m = a[2], v = a[3], E = Math.sin(s), g = Math.cos(s);
  return t[0] = f * g + v * E, t[1] = p * g + m * E, t[2] = m * g - p * E, t[3] = v * g - f * E, t;
}
function CC(t, a, s) {
  s *= 0.5;
  var f = a[0], p = a[1], m = a[2], v = a[3], E = Math.sin(s), g = Math.cos(s);
  return t[0] = f * g - m * E, t[1] = p * g + v * E, t[2] = m * g + f * E, t[3] = v * g - p * E, t;
}
function TC(t, a, s) {
  s *= 0.5;
  var f = a[0], p = a[1], m = a[2], v = a[3], E = Math.sin(s), g = Math.cos(s);
  return t[0] = f * g + p * E, t[1] = p * g - f * E, t[2] = m * g + v * E, t[3] = v * g - m * E, t;
}
function d4(t, a) {
  var s = a[0], f = a[1], p = a[2];
  return t[0] = s, t[1] = f, t[2] = p, t[3] = Math.sqrt(Math.abs(1 - s * s - f * f - p * p)), t;
}
function RC(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = Math.sqrt(s * s + f * f + p * p), E = Math.exp(m), g = v > 0 ? E * Math.sin(v) / v : 0;
  return t[0] = s * g, t[1] = f * g, t[2] = p * g, t[3] = E * Math.cos(v), t;
}
function MC(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = Math.sqrt(s * s + f * f + p * p), E = v > 0 ? Math.atan2(v, m) / v : 0;
  return t[0] = s * E, t[1] = f * E, t[2] = p * E, t[3] = 0.5 * Math.log(s * s + f * f + p * p + m * m), t;
}
function p4(t, a, s) {
  return MC(t, a), kC(t, t, s), RC(t, t), t;
}
function N0(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2], E = a[3], g = s[0], x = s[1], b = s[2], C = s[3], R, _, k, O, z;
  return _ = p * g + m * x + v * b + E * C, _ < 0 && (_ = -_, g = -g, x = -x, b = -b, C = -C), 1 - _ > Rt ? (R = Math.acos(_), k = Math.sin(R), O = Math.sin((1 - f) * R) / k, z = Math.sin(f * R) / k) : (O = 1 - f, z = f), t[0] = O * p + z * g, t[1] = O * m + z * x, t[2] = O * v + z * b, t[3] = O * E + z * C, t;
}
function v4(t) {
  var a = Bl(), s = Bl(), f = Bl(), p = Math.sqrt(1 - a), m = Math.sqrt(a);
  return t[0] = p * Math.sin(2 * Math.PI * s), t[1] = p * Math.cos(2 * Math.PI * s), t[2] = m * Math.sin(2 * Math.PI * f), t[3] = m * Math.cos(2 * Math.PI * f), t;
}
function h4(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s * s + f * f + p * p + m * m, E = v ? 1 / v : 0;
  return t[0] = -s * E, t[1] = -f * E, t[2] = -p * E, t[3] = m * E, t;
}
function m4(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = a[3], t;
}
function _C(t, a) {
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
function y4(t, a, s, f) {
  var p = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : Db, m = Math.PI / 360;
  a *= m, f *= m, s *= m;
  var v = Math.sin(a), E = Math.cos(a), g = Math.sin(s), x = Math.cos(s), b = Math.sin(f), C = Math.cos(f);
  switch (p) {
    case "xyz":
      t[0] = v * x * C + E * g * b, t[1] = E * g * C - v * x * b, t[2] = E * x * b + v * g * C, t[3] = E * x * C - v * g * b;
      break;
    case "xzy":
      t[0] = v * x * C - E * g * b, t[1] = E * g * C - v * x * b, t[2] = E * x * b + v * g * C, t[3] = E * x * C + v * g * b;
      break;
    case "yxz":
      t[0] = v * x * C + E * g * b, t[1] = E * g * C - v * x * b, t[2] = E * x * b - v * g * C, t[3] = E * x * C + v * g * b;
      break;
    case "yzx":
      t[0] = v * x * C + E * g * b, t[1] = E * g * C + v * x * b, t[2] = E * x * b - v * g * C, t[3] = E * x * C - v * g * b;
      break;
    case "zxy":
      t[0] = v * x * C - E * g * b, t[1] = E * g * C + v * x * b, t[2] = E * x * b + v * g * C, t[3] = E * x * C - v * g * b;
      break;
    case "zyx":
      t[0] = v * x * C - E * g * b, t[1] = E * g * C + v * x * b, t[2] = E * x * b - v * g * C, t[3] = E * x * C + v * g * b;
      break;
    default:
      throw new Error("Unknown angle order " + p);
  }
  return t;
}
function g4(t) {
  return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
}
var S4 = oC, E4 = sC, e3 = uC, x4 = cC, w4 = fC, b4 = wC, kC = hC, t3 = J2, C4 = SC, n3 = K2, T4 = n3, r3 = Z2, R4 = r3, a3 = gC, M4 = EC;
function _4(t, a) {
  return Math.abs(J2(t, a)) >= 1 - Rt;
}
var k4 = (function() {
  var t = X2(), a = N2(1, 0, 0), s = N2(0, 1, 0);
  return function(f, p, m) {
    var v = J0(p, m);
    return v < -0.999999 ? (L0(t, a, p), iC(t) < 1e-6 && L0(t, s, p), rC(t, t), xC(f, t, Math.PI), f) : v > 0.999999 ? (f[0] = 0, f[1] = 0, f[2] = 0, f[3] = 1, f) : (L0(t, p, m), f[0] = t[0], f[1] = t[1], f[2] = t[2], f[3] = 1 + v, a3(f, f));
  };
})(), D4 = (function() {
  var t = H0(), a = H0();
  return function(s, f, p, m, v, E) {
    return N0(t, f, v, E), N0(a, p, m, E), N0(s, t, a, 2 * E * (1 - E)), s;
  };
})(), O4 = (function() {
  var t = Nb();
  return function(a, s, f, p) {
    return t[0] = f[0], t[3] = f[1], t[6] = f[2], t[1] = p[0], t[4] = p[1], t[7] = p[2], t[2] = -s[0], t[5] = -s[1], t[8] = -s[2], a3(a, _C(a, t));
  };
})();
const A4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: w4,
  calculateW: d4,
  clone: S4,
  conjugate: m4,
  copy: e3,
  create: H0,
  dot: t3,
  equals: _4,
  exactEquals: M4,
  exp: RC,
  fromEuler: y4,
  fromMat3: _C,
  fromValues: E4,
  getAngle: f4,
  getAxisAngle: c4,
  identity: u4,
  invert: h4,
  len: T4,
  length: n3,
  lerp: C4,
  ln: MC,
  mul: b4,
  multiply: wC,
  normalize: a3,
  pow: p4,
  random: v4,
  rotateX: bC,
  rotateY: CC,
  rotateZ: TC,
  rotationTo: k4,
  scale: kC,
  set: x4,
  setAxes: O4,
  setAxisAngle: xC,
  slerp: N0,
  sqlerp: D4,
  sqrLen: R4,
  squaredLength: r3,
  str: g4
}, Symbol.toStringTag, { value: "Module" }));
function z4() {
  var t = new cn(8);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[3] = 1, t;
}
function L4(t) {
  var a = new cn(8);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a;
}
function N4(t, a, s, f, p, m, v, E) {
  var g = new cn(8);
  return g[0] = t, g[1] = a, g[2] = s, g[3] = f, g[4] = p, g[5] = m, g[6] = v, g[7] = E, g;
}
function U4(t, a, s, f, p, m, v) {
  var E = new cn(8);
  E[0] = t, E[1] = a, E[2] = s, E[3] = f;
  var g = p * 0.5, x = m * 0.5, b = v * 0.5;
  return E[4] = g * f + x * s - b * a, E[5] = x * f + b * t - g * s, E[6] = b * f + g * a - x * t, E[7] = -g * t - x * a - b * s, E;
}
function DC(t, a, s) {
  var f = s[0] * 0.5, p = s[1] * 0.5, m = s[2] * 0.5, v = a[0], E = a[1], g = a[2], x = a[3];
  return t[0] = v, t[1] = E, t[2] = g, t[3] = x, t[4] = f * x + p * g - m * E, t[5] = p * x + m * v - f * g, t[6] = m * x + f * E - p * v, t[7] = -f * v - p * E - m * g, t;
}
function j4(t, a) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = a[0] * 0.5, t[5] = a[1] * 0.5, t[6] = a[2] * 0.5, t[7] = 0, t;
}
function F4(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0, t;
}
function P4(t, a) {
  var s = H0();
  qb(s, a);
  var f = new cn(3);
  return Vb(f, a), DC(t, s, f), t;
}
function OC(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t;
}
function $4(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0, t;
}
function H4(t, a, s, f, p, m, v, E, g) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t[6] = E, t[7] = g, t;
}
var V4 = e3;
function I4(t, a) {
  return t[0] = a[4], t[1] = a[5], t[2] = a[6], t[3] = a[7], t;
}
var q4 = e3;
function Y4(t, a) {
  return t[4] = a[0], t[5] = a[1], t[6] = a[2], t[7] = a[3], t;
}
function W4(t, a) {
  var s = a[4], f = a[5], p = a[6], m = a[7], v = -a[0], E = -a[1], g = -a[2], x = a[3];
  return t[0] = (s * x + m * v + f * g - p * E) * 2, t[1] = (f * x + m * E + p * v - s * g) * 2, t[2] = (p * x + m * g + s * E - f * v) * 2, t;
}
function G4(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = s[0] * 0.5, g = s[1] * 0.5, x = s[2] * 0.5, b = a[4], C = a[5], R = a[6], _ = a[7];
  return t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = v * E + p * x - m * g + b, t[5] = v * g + m * E - f * x + C, t[6] = v * x + f * g - p * E + R, t[7] = -f * E - p * g - m * x + _, t;
}
function Q4(t, a, s) {
  var f = -a[0], p = -a[1], m = -a[2], v = a[3], E = a[4], g = a[5], x = a[6], b = a[7], C = E * v + b * f + g * m - x * p, R = g * v + b * p + x * f - E * m, _ = x * v + b * m + E * p - g * f, k = b * v - E * f - g * p - x * m;
  return bC(t, a, s), f = t[0], p = t[1], m = t[2], v = t[3], t[4] = C * v + k * f + R * m - _ * p, t[5] = R * v + k * p + _ * f - C * m, t[6] = _ * v + k * m + C * p - R * f, t[7] = k * v - C * f - R * p - _ * m, t;
}
function B4(t, a, s) {
  var f = -a[0], p = -a[1], m = -a[2], v = a[3], E = a[4], g = a[5], x = a[6], b = a[7], C = E * v + b * f + g * m - x * p, R = g * v + b * p + x * f - E * m, _ = x * v + b * m + E * p - g * f, k = b * v - E * f - g * p - x * m;
  return CC(t, a, s), f = t[0], p = t[1], m = t[2], v = t[3], t[4] = C * v + k * f + R * m - _ * p, t[5] = R * v + k * p + _ * f - C * m, t[6] = _ * v + k * m + C * p - R * f, t[7] = k * v - C * f - R * p - _ * m, t;
}
function X4(t, a, s) {
  var f = -a[0], p = -a[1], m = -a[2], v = a[3], E = a[4], g = a[5], x = a[6], b = a[7], C = E * v + b * f + g * m - x * p, R = g * v + b * p + x * f - E * m, _ = x * v + b * m + E * p - g * f, k = b * v - E * f - g * p - x * m;
  return TC(t, a, s), f = t[0], p = t[1], m = t[2], v = t[3], t[4] = C * v + k * f + R * m - _ * p, t[5] = R * v + k * p + _ * f - C * m, t[6] = _ * v + k * m + C * p - R * f, t[7] = k * v - C * f - R * p - _ * m, t;
}
function K4(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v = s[3], E = a[0], g = a[1], x = a[2], b = a[3];
  return t[0] = E * v + b * f + g * m - x * p, t[1] = g * v + b * p + x * f - E * m, t[2] = x * v + b * m + E * p - g * f, t[3] = b * v - E * f - g * p - x * m, E = a[4], g = a[5], x = a[6], b = a[7], t[4] = E * v + b * f + g * m - x * p, t[5] = g * v + b * p + x * f - E * m, t[6] = x * v + b * m + E * p - g * f, t[7] = b * v - E * f - g * p - x * m, t;
}
function Z4(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = s[0], g = s[1], x = s[2], b = s[3];
  return t[0] = f * b + v * E + p * x - m * g, t[1] = p * b + v * g + m * E - f * x, t[2] = m * b + v * x + f * g - p * E, t[3] = v * b - f * E - p * g - m * x, E = s[4], g = s[5], x = s[6], b = s[7], t[4] = f * b + v * E + p * x - m * g, t[5] = p * b + v * g + m * E - f * x, t[6] = m * b + v * x + f * g - p * E, t[7] = v * b - f * E - p * g - m * x, t;
}
function J4(t, a, s, f) {
  if (Math.abs(f) < Rt)
    return OC(t, a);
  var p = Math.sqrt(s[0] * s[0] + s[1] * s[1] + s[2] * s[2]);
  f = f * 0.5;
  var m = Math.sin(f), v = m * s[0] / p, E = m * s[1] / p, g = m * s[2] / p, x = Math.cos(f), b = a[0], C = a[1], R = a[2], _ = a[3];
  t[0] = b * x + _ * v + C * g - R * E, t[1] = C * x + _ * E + R * v - b * g, t[2] = R * x + _ * g + b * E - C * v, t[3] = _ * x - b * v - C * E - R * g;
  var k = a[4], O = a[5], z = a[6], F = a[7];
  return t[4] = k * x + F * v + O * g - z * E, t[5] = O * x + F * E + z * v - k * g, t[6] = z * x + F * g + k * E - O * v, t[7] = F * x - k * v - O * E - z * g, t;
}
function ez(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t[4] = a[4] + s[4], t[5] = a[5] + s[5], t[6] = a[6] + s[6], t[7] = a[7] + s[7], t;
}
function AC(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], E = s[4], g = s[5], x = s[6], b = s[7], C = a[4], R = a[5], _ = a[6], k = a[7], O = s[0], z = s[1], F = s[2], Y = s[3];
  return t[0] = f * Y + v * O + p * F - m * z, t[1] = p * Y + v * z + m * O - f * F, t[2] = m * Y + v * F + f * z - p * O, t[3] = v * Y - f * O - p * z - m * F, t[4] = f * b + v * E + p * x - m * g + C * Y + k * O + R * F - _ * z, t[5] = p * b + v * g + m * E - f * x + R * Y + k * z + _ * O - C * F, t[6] = m * b + v * x + f * g - p * E + _ * Y + k * F + C * z - R * O, t[7] = v * b - f * E - p * g - m * x + k * Y - C * O - R * z - _ * F, t;
}
var tz = AC;
function nz(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t[4] = a[4] * s, t[5] = a[5] * s, t[6] = a[6] * s, t[7] = a[7] * s, t;
}
var zC = t3;
function rz(t, a, s, f) {
  var p = 1 - f;
  return zC(a, s) < 0 && (f = -f), t[0] = a[0] * p + s[0] * f, t[1] = a[1] * p + s[1] * f, t[2] = a[2] * p + s[2] * f, t[3] = a[3] * p + s[3] * f, t[4] = a[4] * p + s[4] * f, t[5] = a[5] * p + s[5] * f, t[6] = a[6] * p + s[6] * f, t[7] = a[7] * p + s[7] * f, t;
}
function az(t, a) {
  var s = e1(a);
  return t[0] = -a[0] / s, t[1] = -a[1] / s, t[2] = -a[2] / s, t[3] = a[3] / s, t[4] = -a[4] / s, t[5] = -a[5] / s, t[6] = -a[6] / s, t[7] = a[7] / s, t;
}
function iz(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = a[3], t[4] = -a[4], t[5] = -a[5], t[6] = -a[6], t[7] = a[7], t;
}
var LC = n3, lz = LC, e1 = r3, oz = e1;
function sz(t, a) {
  var s = e1(a);
  if (s > 0) {
    s = Math.sqrt(s);
    var f = a[0] / s, p = a[1] / s, m = a[2] / s, v = a[3] / s, E = a[4], g = a[5], x = a[6], b = a[7], C = f * E + p * g + m * x + v * b;
    t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = (E - f * C) / s, t[5] = (g - p * C) / s, t[6] = (x - m * C) / s, t[7] = (b - v * C) / s;
  }
  return t;
}
function uz(t) {
  return "quat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ")";
}
function cz(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7];
}
function fz(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = t[4], E = t[5], g = t[6], x = t[7], b = a[0], C = a[1], R = a[2], _ = a[3], k = a[4], O = a[5], z = a[6], F = a[7];
  return Math.abs(s - b) <= Rt * Math.max(1, Math.abs(s), Math.abs(b)) && Math.abs(f - C) <= Rt * Math.max(1, Math.abs(f), Math.abs(C)) && Math.abs(p - R) <= Rt * Math.max(1, Math.abs(p), Math.abs(R)) && Math.abs(m - _) <= Rt * Math.max(1, Math.abs(m), Math.abs(_)) && Math.abs(v - k) <= Rt * Math.max(1, Math.abs(v), Math.abs(k)) && Math.abs(E - O) <= Rt * Math.max(1, Math.abs(E), Math.abs(O)) && Math.abs(g - z) <= Rt * Math.max(1, Math.abs(g), Math.abs(z)) && Math.abs(x - F) <= Rt * Math.max(1, Math.abs(x), Math.abs(F));
}
const dz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: ez,
  clone: L4,
  conjugate: iz,
  copy: OC,
  create: z4,
  dot: zC,
  equals: fz,
  exactEquals: cz,
  fromMat4: P4,
  fromRotation: F4,
  fromRotationTranslation: DC,
  fromRotationTranslationValues: U4,
  fromTranslation: j4,
  fromValues: N4,
  getDual: I4,
  getReal: V4,
  getTranslation: W4,
  identity: $4,
  invert: az,
  len: lz,
  length: LC,
  lerp: rz,
  mul: tz,
  multiply: AC,
  normalize: sz,
  rotateAroundAxis: J4,
  rotateByQuatAppend: K4,
  rotateByQuatPrepend: Z4,
  rotateX: Q4,
  rotateY: B4,
  rotateZ: X4,
  scale: nz,
  set: H4,
  setDual: Y4,
  setReal: q4,
  sqrLen: oz,
  squaredLength: e1,
  str: uz,
  translate: G4
}, Symbol.toStringTag, { value: "Module" }));
function NC() {
  var t = new cn(2);
  return cn != Float32Array && (t[0] = 0, t[1] = 0), t;
}
function pz(t) {
  var a = new cn(2);
  return a[0] = t[0], a[1] = t[1], a;
}
function vz(t, a) {
  var s = new cn(2);
  return s[0] = t, s[1] = a, s;
}
function hz(t, a) {
  return t[0] = a[0], t[1] = a[1], t;
}
function mz(t, a, s) {
  return t[0] = a, t[1] = s, t;
}
function yz(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t;
}
function UC(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t;
}
function jC(t, a, s) {
  return t[0] = a[0] * s[0], t[1] = a[1] * s[1], t;
}
function FC(t, a, s) {
  return t[0] = a[0] / s[0], t[1] = a[1] / s[1], t;
}
function gz(t, a) {
  return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t;
}
function Sz(t, a) {
  return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t;
}
function Ez(t, a, s) {
  return t[0] = Math.min(a[0], s[0]), t[1] = Math.min(a[1], s[1]), t;
}
function xz(t, a, s) {
  return t[0] = Math.max(a[0], s[0]), t[1] = Math.max(a[1], s[1]), t;
}
function wz(t, a) {
  return t[0] = jo(a[0]), t[1] = jo(a[1]), t;
}
function bz(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t;
}
function Cz(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t;
}
function PC(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1];
  return Math.sqrt(s * s + f * f);
}
function $C(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1];
  return s * s + f * f;
}
function HC(t) {
  var a = t[0], s = t[1];
  return Math.sqrt(a * a + s * s);
}
function VC(t) {
  var a = t[0], s = t[1];
  return a * a + s * s;
}
function Tz(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t;
}
function Rz(t, a) {
  return t[0] = 1 / a[0], t[1] = 1 / a[1], t;
}
function Mz(t, a) {
  var s = a[0], f = a[1], p = s * s + f * f;
  return p > 0 && (p = 1 / Math.sqrt(p)), t[0] = a[0] * p, t[1] = a[1] * p, t;
}
function _z(t, a) {
  return t[0] * a[0] + t[1] * a[1];
}
function kz(t, a, s) {
  var f = a[0] * s[1] - a[1] * s[0];
  return t[0] = t[1] = 0, t[2] = f, t;
}
function Dz(t, a, s, f) {
  var p = a[0], m = a[1];
  return t[0] = p + f * (s[0] - p), t[1] = m + f * (s[1] - m), t;
}
function Oz(t, a) {
  a = a === void 0 ? 1 : a;
  var s = Bl() * 2 * Math.PI;
  return t[0] = Math.cos(s) * a, t[1] = Math.sin(s) * a, t;
}
function Az(t, a, s) {
  var f = a[0], p = a[1];
  return t[0] = s[0] * f + s[2] * p, t[1] = s[1] * f + s[3] * p, t;
}
function zz(t, a, s) {
  var f = a[0], p = a[1];
  return t[0] = s[0] * f + s[2] * p + s[4], t[1] = s[1] * f + s[3] * p + s[5], t;
}
function Lz(t, a, s) {
  var f = a[0], p = a[1];
  return t[0] = s[0] * f + s[3] * p + s[6], t[1] = s[1] * f + s[4] * p + s[7], t;
}
function Nz(t, a, s) {
  var f = a[0], p = a[1];
  return t[0] = s[0] * f + s[4] * p + s[12], t[1] = s[1] * f + s[5] * p + s[13], t;
}
function Uz(t, a, s, f) {
  var p = a[0] - s[0], m = a[1] - s[1], v = Math.sin(f), E = Math.cos(f);
  return t[0] = p * E - m * v + s[0], t[1] = p * v + m * E + s[1], t;
}
function jz(t, a) {
  var s = t[0], f = t[1], p = a[0], m = a[1];
  return Math.abs(Math.atan2(f * p - s * m, s * p + f * m));
}
function Fz(t, a) {
  var s = t[0], f = t[1], p = a[0], m = a[1];
  return Math.atan2(s * m - f * p, s * p + f * m);
}
function Pz(t) {
  return t[0] = 0, t[1] = 0, t;
}
function $z(t) {
  return "vec2(" + t[0] + ", " + t[1] + ")";
}
function Hz(t, a) {
  return t[0] === a[0] && t[1] === a[1];
}
function Vz(t, a) {
  var s = t[0], f = t[1], p = a[0], m = a[1];
  return Math.abs(s - p) <= Rt * Math.max(1, Math.abs(s), Math.abs(p)) && Math.abs(f - m) <= Rt * Math.max(1, Math.abs(f), Math.abs(m));
}
var Iz = HC, qz = UC, Yz = jC, Wz = FC, Gz = PC, Qz = $C, Bz = VC, Xz = (function() {
  var t = NC();
  return function(a, s, f, p, m, v) {
    var E, g;
    for (s || (s = 2), f || (f = 0), p ? g = Math.min(p * s + f, a.length) : g = a.length, E = f; E < g; E += s)
      t[0] = a[E], t[1] = a[E + 1], m(t, t, v), a[E] = t[0], a[E + 1] = t[1];
    return a;
  };
})();
const Kz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: yz,
  angle: jz,
  ceil: gz,
  clone: pz,
  copy: hz,
  create: NC,
  cross: kz,
  dist: Gz,
  distance: PC,
  div: Wz,
  divide: FC,
  dot: _z,
  equals: Vz,
  exactEquals: Hz,
  floor: Sz,
  forEach: Xz,
  fromValues: vz,
  inverse: Rz,
  len: Iz,
  length: HC,
  lerp: Dz,
  max: xz,
  min: Ez,
  mul: Yz,
  multiply: jC,
  negate: Tz,
  normalize: Mz,
  random: Oz,
  rotate: Uz,
  round: wz,
  scale: bz,
  scaleAndAdd: Cz,
  set: mz,
  signedAngle: Fz,
  sqrDist: Qz,
  sqrLen: Bz,
  squaredDistance: $C,
  squaredLength: VC,
  str: $z,
  sub: qz,
  subtract: UC,
  transformMat2: Az,
  transformMat2d: zz,
  transformMat3: Lz,
  transformMat4: Nz,
  zero: Pz
}, Symbol.toStringTag, { value: "Module" })), Zz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: WD,
  mat2: y5,
  mat2d: H5,
  mat3: yO,
  mat4: Bb,
  quat: A4,
  quat2: dz,
  vec2: Kz,
  vec3: FA,
  vec4: s4
}, Symbol.toStringTag, { value: "Module" })), t1 = Z0;
function n1() {
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
var Wn = n1.prototype = Object.create($n.prototype), Vi = new Float32Array([0, 0, 0]), hl = new Float32Array(16);
Wn.constructor = n1;
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
Wn.translate = function(t, a, s, f) {
  Vi[0] = t, Vi[1] = a, Vi[2] = s, f === "world" ? (B2(hl), L2(hl, hl, Vi), t1(this.local, hl, this.local)) : L2(this.local, this.local, Vi);
};
Wn.rotate = function(t, a, s, f) {
  var p = Math.PI / 180, m = Bb;
  f === "world" ? (m.identity(hl), m.rotateZ(hl, hl, s * p), m.rotateY(hl, hl, a * p), m.rotateX(hl, hl, t * p), t1(this.local, hl, this.local)) : (m.rotateZ(this.local, this.local, s * p), m.rotateY(this.local, this.local, a * p), m.rotateX(this.local, this.local, t * p));
};
Wn.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.worldMatrix.set(this.local) : t1(this.worldMatrix, this.parent.getLocalToWorld(), this.local)), this.worldMatrix;
};
Wn.getWorldToLocal = function() {
  return this.dirtyW === !0 && Fb(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
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
Wn.setPosition = function(t, a, s) {
  Vi[0] = t, Vi[1] = a, Vi[2] = s, this.parent !== null && aC(
    Vi,
    Vi,
    this.parent.getWorldToLocal()
  ), this.local[12] = Vi[0], this.local[13] = Vi[1], this.local[14] = Vi[2];
};
Wn.setLocalPosition = function(t, a, s) {
  this.local[12] = t, this.local[13] = a, this.local[14] = s;
};
Wn.scale = function(t, a, s) {
  $b(this.local, this.local, [t, a, s]);
};
Wn.updateWorldMatrix = function(t = !1) {
  this.parent === null ? this.worldMatrix.set(this.local) : (t && this.parent.updateWorldMatrix(t), t1(this.worldMatrix, this.parent.worldMatrix, this.local));
};
function ri(t) {
  this.instanceId = ri.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new n1()), this.name = t || "gameObject";
}
var El = ri.prototype;
El.instanceId = 0;
El.name = null;
El.layer = 0;
El.scene = null;
El.world = null;
El.transform = null;
El.components = null;
El.componentsCount = 0;
El.setScene = function(t) {
  this.scene = t;
};
El.addComponent = function(t) {
  return this.components[this.componentsCount++] = t, t.setGameObject(this), t;
};
El.removeComponent = function(t) {
  t.unsetGameObject();
};
El.getComponent = function(t) {
  for (var a = 0; a < this.components.length; a++) {
    var s = this.components[a];
    if (s instanceof t) return s;
  }
  return null;
};
const i3 = {
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
pr.prototype.fogType = i3.LINEAR;
pr.prototype.fogNearPane = 250;
pr.prototype.fogFarPane = 750;
pr.prototype.fogColor = 9868950;
pr.prototype.bgColor = 9868950;
pr.prototype.ambientLight = 8421504;
pr.prototype.flush = !1;
pr.prototype.depthSorting = !0;
pr.prototype.setup = function(t, a) {
  const s = t / this.zoom, f = a / this.zoom;
  this.frustumSize = [
    [-s / 2, -f / 2, 0],
    [s / 2, f / 2, this.farClippingPane]
  ], Gb(
    this.projectionMatrix,
    -s / 2,
    s / 2,
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
  return Z0(this.clipSpaceMatrix, this.projectionMatrix, t), this.clipSpaceMatrix;
};
pr.FogType = i3;
function IC(t) {
  ri.call(this, t || "camera"), this.addComponent(new pr(this.transform));
}
IC.prototype = Object.create(ri.prototype);
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
  const a = this.faces, s = this.vertices, f = a.length;
  (!this.faceNormals || this.faceNormals.length !== f) && (this.faceNormals = new Float32Array(f)), !this.vertexNormals || this.vertexNormals.length !== s.length ? this.vertexNormals = new Float32Array(s.length) : this.vertexNormals.fill(0);
  for (let p = 0; p < f; p += 3) {
    const m = a[p] * 3, v = a[p + 1] * 3, E = a[p + 2] * 3, g = s[v] - s[m], x = s[v + 1] - s[m + 1], b = s[v + 2] - s[m + 2], C = s[E] - s[m], R = s[E + 1] - s[m + 1], _ = s[E + 2] - s[m + 2];
    let k = (x * _ - b * R) * t, O = (b * C - g * _) * t, z = (g * R - x * C) * t;
    const F = Math.sqrt(k * k + O * O + z * z);
    if (F > 1e-10) {
      const Y = 1 / F;
      this.faceNormals[p] = k * Y, this.faceNormals[p + 1] = O * Y, this.faceNormals[p + 2] = z * Y, this.vertexNormals[m] += k, this.vertexNormals[m + 1] += O, this.vertexNormals[m + 2] += z, this.vertexNormals[v] += k, this.vertexNormals[v + 1] += O, this.vertexNormals[v + 2] += z, this.vertexNormals[E] += k, this.vertexNormals[E + 1] += O, this.vertexNormals[E + 2] += z;
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
  const s = a[0], f = a[1], p = a[2], m = a[4], v = a[5], E = a[6], g = a[8], x = a[9], b = a[10], C = v * b - E * x, R = -(m * b - E * g), _ = m * x - v * g, k = s * C + f * R + p * _;
  if (Math.abs(k) < 1e-6) return null;
  const O = 1 / k;
  t[0] = C * O, t[1] = R * O, t[2] = _ * O, t[3] = -(f * b - p * x) * O, t[4] = (s * b - p * g) * O, t[5] = -(s * x - f * g) * O, t[6] = (f * E - p * v) * O, t[7] = -(s * E - p * m) * O, t[8] = (s * v - f * m) * O;
};
lr.computeBoundsFlatArray = function(t, a, s) {
  if (s.length !== 0) {
    for (var f = s[0], p = f, m = s[1], v = m, E = s[2], g = E, x = 3; x < s.length; x += 3) {
      var b = s[x], C = s[x + 1], R = s[x + 2];
      b < f ? f = b : b > p && (p = b), C < m ? m = C : C > v && (v = C), R < E ? E = R : R > g && (g = R);
    }
    return t[a] = f, t[a + 1] = m, t[a + 2] = E, t[a + 3] = p, t[a + 4] = m, t[a + 5] = E, t[a + 6] = f, t[a + 7] = v, t[a + 8] = E, t[a + 9] = p, t[a + 10] = v, t[a + 11] = E, t[a + 12] = f, t[a + 13] = m, t[a + 14] = g, t[a + 15] = p, t[a + 16] = m, t[a + 17] = g, t[a + 18] = f, t[a + 19] = v, t[a + 20] = g, t[a + 21] = p, t[a + 22] = v, t[a + 23] = g, t;
  }
};
lr.computeBoundingSphere = function(t, a, s) {
  let f = 1 / 0, p = 1 / 0, m = 1 / 0, v = -1 / 0, E = -1 / 0, g = -1 / 0;
  for (let z = 0; z < s.length; z += 3) {
    const F = s[z], Y = s[z + 1], P = s[z + 2];
    F < f && (f = F), F > v && (v = F), Y < p && (p = Y), Y > E && (E = Y), P < m && (m = P), P > g && (g = P);
  }
  const x = (f + v) * 0.5, b = (p + E) * 0.5, C = (m + g) * 0.5, R = v - x, _ = E - b, k = g - C, O = Math.sqrt(R * R + _ * _ + k * k);
  t[a] = x, t[a + 1] = b, t[a + 2] = C, t[a + 3] = O;
};
lr.computeWeldMap = function(t, a, s = 1e-4) {
  const f = t.length / 3 | 0, p = a && a.length === f ? a : new Uint32Array(f), m = {};
  for (let v = 0; v < f; v++) {
    const E = v * 3;
    let g = t[E], x = t[E + 1], b = t[E + 2];
    Math.abs(g) < s && (g = 0), Math.abs(x) < s && (x = 0), Math.abs(b) < s && (b = 0);
    const C = g.toFixed(4) + "," + x.toFixed(4) + "," + b.toFixed(4), R = m[C];
    R === void 0 ? (m[C] = v, p[v] = v) : p[v] = R;
  }
  return p;
};
lr.computeAdjacency = function(t, a, s, f) {
  const p = t.length / 3 | 0, m = p * 3, v = s && s.length === m ? s : new Int32Array(m), E = f && f.length === m ? f : new Int32Array(m);
  v.fill(-1), E.fill(-1);
  const g = /* @__PURE__ */ new Map();
  for (let b = 0; b < p; b++)
    for (let C = 0; C < 3; C++) {
      const R = t[b * 3 + C], _ = t[b * 3 + (C + 1) % 3], k = a ? a[R] : R, O = a ? a[_] : _;
      if (k === O) continue;
      const z = b * 3 + C, F = g.get(O * 4294967296 + k), Y = F === void 0 ? -1 : F / 3 | 0;
      F !== void 0 && v[F] === -1 && Y !== b && (v[z] = Y, E[z] = F - Y * 3, v[F] = b, E[F] = C), g.has(k * 4294967296 + O) || g.set(k * 4294967296 + O, z);
    }
  let x = 0;
  for (let b = 0; b < m; b++) v[b] === -1 && x++;
  return { adjTri: v, adjEdge: E, boundaryEdges: x };
};
function l3(t) {
  $n.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var Os = l3.prototype = Object.create($n.prototype);
Os.constructor = l3;
Os.sprite = null;
Os.pivotX = 0;
Os.pivotY = 0;
Os.layer = 0;
Os.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.spriteRenderer = this;
};
Os.setSprite = function(t) {
  return this.sprite = t, this.enabled = !0, this;
};
Os.setPivot = function(t, a) {
  return this.pivotX = t, this.pivotY = a, this;
};
Os.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, $n.prototype.unsetGameObject.call(this);
};
function o3() {
  $n.call(this), this.points = [];
}
var tf = o3.prototype = Object.create($n.prototype);
tf.constructor = o3;
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
function s3() {
  $n.call(this);
}
var As = s3.prototype = Object.create($n.prototype);
As.constructor = s3;
As.text = "sample text";
As.color = "white";
As.style = "normal 12px arial";
As.layer = 0;
As.align = "center";
As.valign = "middle";
As.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.textRenderer = this;
};
As.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, $n.prototype.unsetGameObject.call(this);
};
function Jz(t, a, s) {
  const f = [], p = [], m = t / 2, v = a / 2, E = t / s, g = a / s;
  for (let b = 0; b <= s; b++) {
    const C = b * g - v;
    for (let R = 0; R <= s; R++) {
      const _ = R * E - m;
      f.push(_, 0, C);
    }
  }
  const x = s + 1;
  for (let b = 0; b < s; b++)
    for (let C = 0; C < s; C++) {
      const R = b * x + C, _ = b * x + (C + 1), k = (b + 1) * x + C, O = (b + 1) * x + (C + 1);
      p.push(R, k, _), p.push(O, _, k);
    }
  return {
    vertices: new Float32Array(f),
    faces: new Uint16Array(p),
    colors: new Uint32Array(f.length / 3).fill(255)
  };
}
const Sh = Jz(1, 1, 1), u3 = new Float32Array(32);
lr.computeBoundsFlatArray(u3, 0, Sh.vertices);
lr.computeBoundingSphere(u3, 28, Sh.vertices);
function qC() {
  ri.call(this);
  const t = new lr();
  t.faces = Sh.faces, t.vertices = Sh.vertices, t.colors = Sh.colors, t.bounds = u3, t.updateNormals(), this.addComponent(t);
}
qC.prototype = Object.create(ri.prototype);
function eL(t, a, s, f) {
  const p = [], m = [], v = [];
  function E(x, b, C, R, _, k) {
    const O = `${x.toFixed(5)},${b.toFixed(5)},${C.toFixed(5)}`;
    if (k[O] !== void 0) return k[O];
    const z = p.length / 3;
    return p.push(x, b, C), m.push(R, _), k[O] = z, z;
  }
  function g(x, b, C, R, _, k, O, z, F, Y) {
    const P = {}, N = O / Y, H = z / Y, I = O / 2, V = z / 2, oe = F / 2 * k, B = [];
    for (let $ = 0; $ <= Y; $++) {
      const J = [], ee = $ * H - V;
      for (let W = 0; W <= Y; W++) {
        const X = W * N - I, ae = [0, 0, 0];
        ae[x] = X * R, ae[b] = ee * _, ae[C] = oe;
        const de = W / Y, le = 1 - $ / Y;
        J.push(E(ae[0], ae[1], ae[2], de, le, P));
      }
      B.push(J);
    }
    for (let $ = 0; $ < Y; $++)
      for (let J = 0; J < Y; J++) {
        const ee = B[$][J], W = B[$ + 1][J], X = B[$ + 1][J + 1], ae = B[$][J + 1];
        v.push(ee, ae, W), v.push(W, ae, X);
      }
  }
  return g(0, 1, 2, 1, 1, 1, t, a, s, f), g(0, 1, 2, -1, 1, -1, t, a, s, f), g(2, 1, 0, -1, 1, 1, s, a, t, f), g(2, 1, 0, 1, 1, -1, s, a, t, f), g(0, 2, 1, 1, -1, 1, t, s, a, f), g(0, 2, 1, 1, 1, -1, t, s, a, f), {
    vertices: new Float32Array(p),
    uvs: new Float32Array(m),
    faces: new Uint16Array(v),
    colors: new Uint32Array(p.length / 3).fill(255)
  };
}
const Wd = eL(1, 1, 1, 1), c3 = new Float32Array(32);
lr.computeBoundsFlatArray(c3, 0, Wd.vertices);
lr.computeBoundingSphere(c3, 28, Wd.vertices);
function YC() {
  ri.call(this);
  const t = new lr();
  t.vertices = Wd.vertices, t.uvs = Wd.uvs, t.faces = Wd.faces, t.colors = Wd.colors, t.bounds = c3, t.updateNormals(), this.addComponent(t);
}
YC.prototype = Object.create(ri.prototype);
function tL(t, a, s) {
  const f = [], p = [];
  f.push(0, s, 0), f.push(0, 0, 0);
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
const Eh = tL(7, 0.5, 1), f3 = new Float32Array(32);
lr.computeBoundsFlatArray(f3, 0, Eh.vertices);
lr.computeBoundingSphere(f3, 28, Eh.vertices);
function WC() {
  ri.call(this);
  const t = new lr();
  t.vertices = Eh.vertices, t.faces = Eh.faces, t.colors = Eh.colors, t.bounds = f3, t.updateNormals(), this.addComponent(t);
}
WC.prototype = Object.create(ri.prototype);
function nL(t, a, s) {
  const f = [], p = [], m = [], v = {};
  function E(x, b, C, R, _) {
    const k = `${x.toFixed(5)},${b.toFixed(5)},${C.toFixed(5)}`;
    if (v[k] !== void 0) return v[k];
    const O = f.length / 3;
    return f.push(x, b, C), p.push(R, _), v[k] = O, O;
  }
  const g = [];
  for (let x = 0; x <= t; x++) {
    const b = [], C = x * Math.PI / t, R = Math.sin(C), _ = Math.cos(C);
    for (let k = 0; k <= a; k++) {
      const O = k * 2 * Math.PI / a, z = Math.cos(O) * R * s, F = _ * s, Y = Math.sin(O) * R * s, P = k / a, N = x / t;
      b.push(E(z, F, Y, P, N));
    }
    g.push(b);
  }
  for (let x = 0; x < t; x++)
    for (let b = 0; b < a; b++) {
      const C = g[x][b], R = g[x][b + 1], _ = g[x + 1][b], k = g[x + 1][b + 1];
      x !== 0 && m.push(C, R, _), x !== t - 1 && m.push(_, R, k);
    }
  return {
    vertices: new Float32Array(f),
    uvs: new Float32Array(p),
    faces: new Uint16Array(m),
    colors: new Uint32Array(f.length / 3).fill(255)
  };
}
function rL(t) {
  const a = t.vertices, s = t.vertexNormals, f = {};
  for (let p = 0; p < a.length; p += 3) {
    const m = Math.abs(a[p]) < 1e-4 ? 0 : a[p], v = Math.abs(a[p + 1]) < 1e-4 ? 0 : a[p + 1], E = Math.abs(a[p + 2]) < 1e-4 ? 0 : a[p + 2], g = `${m.toFixed(4)},${v.toFixed(4)},${E.toFixed(4)}`;
    f[g] || (f[g] = []), f[g].push(p);
  }
  for (const p in f) {
    const m = f[p];
    if (m.length < 2) continue;
    let v = 0, E = 0, g = 0;
    for (let b = 0; b < m.length; b++) {
      const C = m[b];
      v += s[C], E += s[C + 1], g += s[C + 2];
    }
    const x = Math.sqrt(v * v + E * E + g * g);
    if (x > 1e-10) {
      const b = 1 / x;
      v *= b, E *= b, g *= b;
    }
    for (let b = 0; b < m.length; b++) {
      const C = m[b];
      s[C] = v, s[C + 1] = E, s[C + 2] = g;
    }
  }
}
function aL(t = 8, a = 8, s = 8) {
  const f = nL(t, a, s), p = new Float32Array(32);
  return lr.computeBoundsFlatArray(p, 0, f.vertices), lr.computeBoundingSphere(p, 28, f.vertices), [
    f.vertices,
    f.faces,
    f.uvs,
    p,
    f.colors
  ];
}
function d3(t, a, s, f, p) {
  ri.call(this);
  const m = new lr();
  m.vertices = t, m.faces = a, m.uvs = s, m.colors = p || new Uint32Array(t.length / 3).fill(255), m.bounds = f, m.updateNormals(), rL(m), this.addComponent(m);
}
d3.prototype = Object.create(ri.prototype);
d3.generate = aL;
function iL() {
  const t = new Array(65536);
  for (let a = 0; a < 65536; a++) {
    const s = a >> 11 & 31, f = a >> 5 & 63, p = a & 31, m = s << 3 | s >> 2, v = f << 2 | f >> 4, E = p << 3 | p >> 2;
    t[a] = "#" + (m < 16 ? "0" : "") + m.toString(16) + (v < 16 ? "0" : "") + v.toString(16) + (E < 16 ? "0" : "") + E.toString(16);
  }
  return t;
}
const Sl = iL(), C0 = 31, Jc = 65535, lL = PD, C2 = 25;
function oL(t, a, s, f) {
  const p = s[0], m = s[1], v = s[4], E = s[5], g = s[8], x = s[9], b = new Path2D(), C = new Path2D(), R = new Path2D();
  for (let _ = 0; _ < t.length; _++) {
    const k = t[_];
    if (!k || !k.transform) continue;
    const O = k.transform.getLocalToWorld(), z = O[12], F = O[13], Y = O[14];
    lL(
      f,
      0,
      z,
      F,
      Y,
      s
    );
    const P = f[0], N = f[1];
    let H = O[0], I = O[1], V = O[2], oe = Math.sqrt(H * H + I * I + V * V);
    oe < 1e-4 && (H = 1, I = 0, V = 0, oe = 1);
    const B = C2 / oe;
    b.moveTo(P, N), b.lineTo(
      P + (H * p + I * v + V * g) * B,
      N + (H * m + I * E + V * x) * B
    );
    let $ = O[4], J = O[5], ee = O[6], W = Math.sqrt($ * $ + J * J + ee * ee);
    W < 1e-4 && ($ = 0, J = 1, ee = 0, W = 1);
    const X = C2 / W;
    C.moveTo(P, N), C.lineTo(
      P + ($ * p + J * v + ee * g) * X,
      N + ($ * m + J * E + ee * x) * X
    );
    let ae = O[8], de = O[9], le = O[10], ie = Math.sqrt(ae * ae + de * de + le * le);
    ie < 1e-4 && (ae = 0, de = 0, le = 1, ie = 1);
    const se = C2 / ie;
    R.moveTo(P, N), R.lineTo(
      P + (ae * p + de * v + le * g) * se,
      N + (ae * m + de * E + le * x) * se
    );
  }
  a.strokeStyle = "#ff0000", a.stroke(b), a.strokeStyle = "#00ff00", a.stroke(C), a.strokeStyle = "#0000ff", a.stroke(R);
}
function sL(t, a, s, f, p, m, v, E, g, x, b, C = 10) {
  const R = g * 0.5, _ = x * 0.5, k = E + v, O = b[0], z = b[1], F = b[4], Y = b[5], P = b[8], N = b[9];
  t.beginPath(), t.strokeStyle = "cyan";
  for (let H = E; H < k; H++) {
    const I = f[H], V = s[I * 3], oe = s[I * 3 + 1], B = s[I * 3 + 2], $ = a[V] * R + R, J = a[V + 1] * _ + _, ee = a[oe] * R + R, W = a[oe + 1] * _ + _, X = a[B] * R + R, ae = a[B + 1] * _ + _, de = ($ + ee + X) * 0.33333, le = (J + W + ae) * 0.33333, ie = I * 3, se = p[ie], ve = p[ie + 1], U = p[ie + 2], Z = se * O + ve * F + U * P, xe = se * z + ve * Y + U * N;
    t.moveTo(de, le), t.lineTo(de + Z * C, le - xe * C);
  }
  t.stroke(), t.beginPath(), t.strokeStyle = "yellow";
  for (let H = E; H < k; H++) {
    const I = f[H], V = s[I * 3], oe = s[I * 3 + 1], B = s[I * 3 + 2], $ = a[V] * R + R, J = a[V + 1] * _ + _, ee = a[oe] * R + R, W = a[oe + 1] * _ + _, X = a[B] * R + R, ae = a[B + 1] * _ + _, de = m[V], le = m[V + 1], ie = m[V + 2], se = de * O + le * F + ie * P, ve = de * z + le * Y + ie * N;
    t.moveTo($, J), t.lineTo($ + se * C, J - ve * C);
    const U = m[oe], Z = m[oe + 1], xe = m[oe + 2], be = U * O + Z * F + xe * P, Le = U * z + Z * Y + xe * N;
    t.moveTo(ee, W), t.lineTo(ee + be * C, W - Le * C);
    const Me = m[B], Oe = m[B + 1], Pe = m[B + 2], _e = Me * O + Oe * F + Pe * P, je = Me * z + Oe * Y + Pe * N;
    t.moveTo(X, ae), t.lineTo(X + _e * C, ae - je * C);
  }
  t.stroke();
}
function uL(t, a, s, f, p, m, v, E, g) {
  if (v <= 1) return;
  const x = g - E > 1e-4 ? 65535 / (g - E) : 0;
  m.fill(0);
  for (let C = 0; C < v; C++) {
    const R = t[C], _ = p[R] & 255;
    m[_]++;
  }
  let b = 0;
  for (let C = 0; C < 256; C++) {
    const R = m[C];
    m[C] = b, b += R;
  }
  for (let C = 0; C < v; C++) {
    const R = t[C], _ = p[R] & 255;
    a[m[_]++] = R;
  }
  m.fill(0);
  for (let C = 0; C < v; C++) {
    const R = a[C], _ = f[R] & 255;
    m[_]++;
  }
  b = 0;
  for (let C = 0; C < 256; C++) {
    const R = m[C];
    m[C] = b, b += R;
  }
  for (let C = 0; C < v; C++) {
    const R = a[C], _ = f[R] & 255;
    t[m[_]++] = R;
  }
  m.fill(0);
  for (let C = 0; C < v; C++) {
    const R = t[C];
    let k = (s[R] - E) * x;
    k < 0 ? k = 0 : k > 65535 && (k = 65535);
    const O = 65535 - (k | 0) & 255;
    m[O]++;
  }
  b = 0;
  for (let C = 0; C < 256; C++) {
    const R = m[C];
    m[C] = C & 1 ? b + R - 1 : b, b += R;
  }
  for (let C = 0; C < v; C++) {
    const R = t[C];
    let k = (s[R] - E) * x;
    k < 0 ? k = 0 : k > 65535 && (k = 65535);
    const O = 65535 - (k | 0) & 255;
    O & 1 ? a[m[O]--] = R : a[m[O]++] = R;
  }
  m.fill(0);
  for (let C = 0; C < v; C++) {
    const R = a[C];
    let k = (s[R] - E) * x;
    k < 0 ? k = 0 : k > 65535 && (k = 65535);
    const O = 65535 - (k | 0) >> 8 & 255;
    m[O]++;
  }
  b = 0;
  for (let C = 0; C < 256; C++) {
    const R = m[C];
    m[C] = b, b += R;
  }
  for (let C = 0; C < v; C++) {
    const R = a[C];
    let k = (s[R] - E) * x;
    k < 0 ? k = 0 : k > 65535 && (k = 65535);
    const O = 65535 - (k | 0) >> 8 & 255;
    t[m[O]++] = R;
  }
}
const Ds = 0, Fo = 3, ef = 8, Gd = -1, T2 = -2, Po = 0, Qd = 2;
function Rh(t, a, s, f, p, m, v, E, g, x, b) {
  if (x[g] !== E) {
    const C = Sl[E];
    t.fillStyle = C, t.strokeStyle = C, x[g] = E, g === Fo && E !== Jc && (x[ef] = 1);
  }
  t.beginPath(), t.moveTo(a, s), t.lineTo(f, p), t.lineTo(m, v), t.closePath(), t.stroke(), t.fill(), b[g === Fo ? Qd : Po]++;
}
function r1(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe, B, $, J, ee) {
  Rh(
    t,
    a,
    s,
    f,
    p,
    m,
    v,
    Jc,
    Fo,
    B,
    $
  );
}
function p3(t, a, s, f, p, m) {
  for (let v = a; v < s; v++) p[t[v]] = v;
  for (let v = a; v < s; v++) {
    const E = t[v], g = E * 3, x = f[g], b = f[g + 1], C = f[g + 2];
    m[E] = (x === Gd || x >= 0 && p[x] > v ? 1 : 0) | (b === Gd || b >= 0 && p[b] > v ? 2 : 0) | (C === Gd || C >= 0 && p[C] > v ? 4 : 0);
  }
  for (let v = a; v < s; v++) p[t[v]] = -1;
}
const Bd = 64, xh = 128, Jd = 1, T0 = 2 * Jd, ks = 2048, Au = 4096, Mh = Au - 1, Ti = 8, Uo = 0, hh = 1, ku = 2, Zc = 3, cL = 4, wh = 0, bh = 5, _h = 1, kh = 2, GC = 3, v3 = 4;
function h3() {
  const t = {
    slots: new Int32Array(Bd * Ti),
    // Screen bounds per slot, as [x0, y0, x1, y1]. The overlap guard's only input.
    aabb: new Float32Array(Bd * 4),
    poolX: new Float32Array(ks),
    poolY: new Float32Array(ks),
    poolId: new Int32Array(ks),
    poolNext: new Int32Array(ks),
    poolSlot: new Int8Array(ks),
    // 1 where the boundary edge LEAVING this node must be pushed outward at flush, i.e. the face
    // across it is drawn later. See the expansion note in weldFlushSlot.
    poolExpand: new Uint8Array(ks),
    eFrom: new Int32Array(Au),
    eTo: new Int32Array(Au),
    eNode: new Int32Array(Au),
    eStamp: new Int32Array(Au),
    scal: new Int32Array(8),
    emitX: new Float32Array(xh),
    emitY: new Float32Array(xh),
    emitF: new Uint8Array(xh),
    frameId: -1,
    evictions: 0
  };
  return t.scal[kh] = 1, a1(t), t;
}
function a1(t) {
  const a = t.slots;
  for (let p = 0; p < Bd; p++) a[p * Ti + Uo] = -1;
  t.scal[wh] = -1, t.scal[bh] = -1;
  const s = t.poolNext, f = t.poolSlot;
  for (let p = 0; p < ks - 1; p++)
    s[p] = p + 1, f[p] = -1;
  s[ks - 1] = -1, f[ks - 1] = -1, t.scal[_h] = 0, t.scal[v3] = 0, t.scal[kh]++, t.scal[GC] = 0;
}
function V0(t, a) {
  let s = Math.imul(t, 2654435761) ^ Math.imul(a, 2246822519);
  return s ^= s >>> 15, s = Math.imul(s, 625341585), s ^= s >>> 13, s & Mh;
}
function R2(t, a, s) {
  const f = t.scal[kh], p = t.eFrom, m = t.eTo, v = t.eStamp;
  let E = V0(a, s);
  for (let g = 0; g < Au; g++) {
    if (v[E] !== f) return -1;
    if (p[E] === a && m[E] === s) return t.eNode[E];
    E = E + 1 & Mh;
  }
  return -1;
}
function fL(t, a, s, f) {
  const p = t.scal[kh], m = t.eFrom, v = t.eTo, E = t.eStamp;
  let g = V0(a, s);
  for (let x = 0; x < Au; x++) {
    if (E[g] !== p) {
      m[g] = a, v[g] = s, t.eNode[g] = f, E[g] = p;
      return;
    }
    if (m[g] === a && v[g] === s) return;
    g = g + 1 & Mh;
  }
}
function i1(t, a, s) {
  const f = t.scal[kh], p = t.eFrom, m = t.eTo, v = t.eStamp, E = t.eNode;
  let g = V0(a, s), x = !1;
  for (let C = 0; C < Au && v[g] === f; C++) {
    if (p[g] === a && m[g] === s) {
      x = !0;
      break;
    }
    g = g + 1 & Mh;
  }
  if (!x) return;
  let b = g;
  for (; ; ) {
    if (v[g] = f - 1, b = b + 1 & Mh, v[b] !== f) return;
    const C = V0(p[b], m[b]);
    (g <= b ? g < C && C <= b : g < C || C <= b) || (p[g] = p[b], m[g] = m[b], E[g] = E[b], v[g] = f, g = b);
  }
}
function R0(t, a, s, f, p) {
  const m = t.scal[_h];
  return m === -1 ? -1 : (t.scal[_h] = t.poolNext[m], t.poolX[m] = a, t.poolY[m] = s, t.poolId[m] = f, t.poolNext[m] = -1, t.poolSlot[m] = p, t.scal[v3]++, m);
}
function Yd(t, a) {
  const s = t.poolNext[a];
  s !== -1 && i1(t, t.poolId[a], t.poolId[s]), t.poolSlot[a] = -1, t.poolId[a] = -1, t.poolNext[a] = t.scal[_h], t.scal[_h] = a, t.scal[v3]--;
}
function _u(t, a, s) {
  const f = t.poolNext[a];
  f !== -1 && i1(t, t.poolId[a], t.poolId[f]), t.poolNext[a] = s, s !== -1 && fL(t, t.poolId[a], t.poolId[s], a);
}
function U2(t, a, s, f, p, m, v, E, g) {
  const x = t.slots, b = a * Ti, C = x[b + Uo];
  if (C === -1) return;
  const R = x[b + hh], _ = x[b + ku], k = t.poolNext, O = t.poolX, z = t.poolY, F = t.poolId, Y = t.poolExpand, P = t.emitX, N = t.emitY, H = t.emitF, I = g * g;
  let V = 0, oe = R;
  for (let J = 0; J < _; J++) {
    const ee = k[oe], W = O[oe], X = z[oe], ae = Y[oe];
    if (V < 2)
      P[V] = W, N[V] = X, H[V] = ae, V++;
    else {
      const de = P[V - 2], le = N[V - 2], ie = P[V - 1], se = N[V - 1], ve = ie - de, U = se - le, Z = W - de, xe = X - le, be = ve * xe - U * Z;
      H[V - 2] === H[V - 1] && be * be <= I * (Z * Z + xe * xe) ? (P[V - 1] = W, N[V - 1] = X, H[V - 1] = ae) : (P[V] = W, N[V] = X, H[V] = ae, V++);
    }
    ee !== -1 && i1(t, F[oe], F[ee]), oe = ee;
  }
  oe = R;
  for (let J = 0; J < _; J++) {
    const ee = k[oe];
    k[oe] = -1, Yd(t, oe), oe = ee;
  }
  x[b + Uo] = -1, a < 32 ? t.scal[wh] |= 1 << a : t.scal[bh] |= 1 << a - 32;
  let B = 0;
  for (; V - B >= 4; ) {
    const J = P[V - 2], ee = N[V - 2], W = P[V - 1], X = N[V - 1], ae = P[B], de = N[B], le = W - J, ie = X - ee, se = ae - J, ve = de - ee, U = le * ve - ie * se;
    if (U * U > I * (se * se + ve * ve) || H[V - 2] !== H[V - 1]) break;
    V--;
  }
  for (; V - B >= 4; ) {
    const J = P[V - 1], ee = N[V - 1], W = P[B], X = N[B], ae = P[B + 1], de = N[B + 1], le = W - J, ie = X - ee, se = ae - J, ve = de - ee, U = le * ve - ie * se;
    if (U * U > I * (se * se + ve * ve) || H[V - 1] !== H[B]) break;
    B++;
  }
  if (V - B < 3) return;
  if (f[p] !== C) {
    const J = Sl[C];
    s.fillStyle = J, s.strokeStyle = J, f[p] = C, m !== -1 && C !== Jc && (f[m] = 1);
  }
  const $ = V - B;
  s.beginPath();
  for (let J = 0; J < $; J++) {
    const ee = B + J;
    if (J === 0 ? s.moveTo(P[ee], N[ee]) : s.lineTo(P[ee], N[ee]), H[ee] === 0) continue;
    const W = B + (J + 1 === $ ? 0 : J + 1), X = P[W] - P[ee], ae = N[W] - N[ee], de = X < 0 ? -X : X, le = ae < 0 ? -ae : ae, ie = de > le ? de + 0.4 * le : le + 0.4 * de;
    if (ie < 1e-6) continue;
    const se = Jd / ie, ve = ae * se, U = -X * se;
    s.lineTo(P[ee] + ve, N[ee] + U), s.lineTo(P[W] + ve, N[W] + U);
  }
  s.fill(), v[E]++;
}
function m3(t, a, s, f, p, m, v, E) {
  const g = t.slots;
  for (; ; ) {
    let x = -1, b = 2147483647;
    for (let C = 0; C < Bd; C++) {
      const R = C * Ti;
      g[R + Uo] !== -1 && g[R + Zc] < b && (b = g[R + Zc], x = C);
    }
    if (x === -1) return;
    U2(
      t,
      x,
      a,
      s,
      f,
      p,
      m,
      v,
      E
    );
  }
}
function y3(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P = 0) {
  const N = t.slots, H = t.poolExpand, I = b < _ ? b < z ? b : z : _ < z ? _ : z, V = b > _ ? b > z ? b : z : _ > z ? _ : z, oe = C < k ? C < F ? C : F : k < F ? k : F, B = C > k ? C > F ? C : F : k > F ? k : F, $ = t.aabb;
  for (let _e = 0; _e < Bd; _e++) {
    const je = N[_e * Ti + Uo];
    if (je === -1 || je === g) continue;
    const Be = _e << 2;
    $[Be] > V + T0 || $[Be + 2] < I - T0 || $[Be + 1] > B + T0 || $[Be + 3] < oe - T0 || U2(
      t,
      _e,
      a,
      s,
      f,
      p,
      m,
      v,
      E
    );
  }
  const J = ++t.scal[GC], ee = t.poolSlot, W = t.poolNext;
  let X = R2(t, O, R), ae = R2(t, Y, O), de = R2(t, R, Y), le = X === -1 ? -1 : ee[X], ie = ae === -1 ? -1 : ee[ae], se = de === -1 ? -1 : ee[de];
  le !== -1 && N[le * Ti + Uo] !== g && (X = -1, le = -1), ie !== -1 && N[ie * Ti + Uo] !== g && (ae = -1, ie = -1), se !== -1 && N[se * Ti + Uo] !== g && (de = -1, se = -1);
  const ve = (X !== -1 ? 1 : 0) + (ae !== -1 ? 1 : 0) + (de !== -1 ? 1 : 0);
  if (ve === 2) {
    let _e, je, Be, ke, $e;
    if (X !== -1 && ae !== -1 ? (_e = 0, je = X, Be = ae, ke = le, $e = ie) : ae !== -1 && de !== -1 ? (_e = 1, je = ae, Be = de, ke = ie, $e = se) : (_e = 2, je = de, Be = X, ke = se, $e = le), ke === $e) {
      if (W[Be] === je) {
        const Se = ke * Ti;
        _u(t, Be, W[je]), H[Be] = P >> (_e + 2) % 3 & 1, N[Se + hh] === je && (N[Se + hh] = Be), Yd(t, je), N[Se + ku]--, N[Se + Zc] = J;
        const Ye = ke << 2;
        I < $[Ye] && ($[Ye] = I), oe < $[Ye + 1] && ($[Ye + 1] = oe), V > $[Ye + 2] && ($[Ye + 2] = V), B > $[Ye + 3] && ($[Ye + 3] = B);
        return;
      }
    } else {
      const Se = ke * Ti, Ye = $e * Ti, Ze = N[Se + ku] + N[Ye + ku] - 1;
      if (Ze <= xh) {
        const Ae = W[je], tt = W[Be], yt = W[tt];
        yt !== -1 && i1(t, t.poolId[tt], t.poolId[yt]), W[tt] = -1;
        const ct = H[tt];
        _u(t, je, yt), _u(t, Be, Ae), H[je] = ct, H[Be] = P >> (_e + 2) % 3 & 1, Yd(t, tt);
        let Ce = je;
        for (let Je = 0; Je < Ze && (ee[Ce] = ke, Ce = W[Ce], Ce !== -1); Je++)
          ;
        N[Se + hh] = je, N[Se + ku] = Ze, N[Se + Zc] = J;
        const qe = ke << 2, lt = $e << 2;
        $[lt] < $[qe] && ($[qe] = $[lt]), $[lt + 1] < $[qe + 1] && ($[qe + 1] = $[lt + 1]), $[lt + 2] > $[qe + 2] && ($[qe + 2] = $[lt + 2]), $[lt + 3] > $[qe + 3] && ($[qe + 3] = $[lt + 3]), I < $[qe] && ($[qe] = I), oe < $[qe + 1] && ($[qe + 1] = oe), V > $[qe + 2] && ($[qe + 2] = V), B > $[qe + 3] && ($[qe + 3] = B), N[Ye + Uo] = -1, $e < 32 ? t.scal[wh] |= 1 << $e : t.scal[bh] |= 1 << $e - 32;
        return;
      }
    }
  } else if (ve === 1) {
    const _e = X !== -1 ? X : ae !== -1 ? ae : de, je = X !== -1 ? le : ae !== -1 ? ie : se, Be = je * Ti;
    if (N[Be + ku] < xh) {
      const Ye = R0(t, X !== -1 ? z : ae !== -1 ? b : _, X !== -1 ? F : ae !== -1 ? C : k, X !== -1 ? Y : ae !== -1 ? R : O, je);
      if (Ye !== -1) {
        _u(t, Ye, W[_e]), _u(t, _e, Ye);
        const Ze = X !== -1 ? 0 : ae !== -1 ? 1 : 2;
        H[_e] = P >> (Ze + 1) % 3 & 1, H[Ye] = P >> (Ze + 2) % 3 & 1, N[Be + ku]++, N[Be + Zc] = J;
        const Ae = je << 2;
        I < $[Ae] && ($[Ae] = I), oe < $[Ae + 1] && ($[Ae + 1] = oe), V > $[Ae + 2] && ($[Ae + 2] = V), B > $[Ae + 3] && ($[Ae + 3] = B);
        return;
      }
    }
  }
  let U = -1;
  const Z = t.scal[wh], xe = t.scal[bh];
  if (Z !== 0)
    U = 31 - Math.clz32(Z & -Z);
  else if (xe !== 0)
    U = 63 - Math.clz32(xe & -xe);
  else {
    let _e = 2147483647;
    for (let je = 0; je < Bd; je++) {
      const Be = N[je * Ti + Zc];
      Be < _e && (_e = Be, U = je);
    }
    U2(
      t,
      U,
      a,
      s,
      f,
      p,
      m,
      v,
      E
    ), t.evictions++;
  }
  const be = R0(t, b, C, R, U), Le = R0(t, _, k, O, U), Me = R0(t, z, F, Y, U);
  if (be === -1 || Le === -1 || Me === -1) {
    be !== -1 && Yd(t, be), Le !== -1 && Yd(t, Le), Me !== -1 && Yd(t, Me);
    return;
  }
  _u(t, be, Le), _u(t, Le, Me), _u(t, Me, be), H[be] = P & 1, H[Le] = P >> 1 & 1, H[Me] = P >> 2 & 1;
  const Oe = U * Ti;
  N[Oe + Uo] = g, N[Oe + cL] = x, N[Oe + hh] = be, N[Oe + ku] = 3, N[Oe + Zc] = J;
  const Pe = U << 2;
  $[Pe] = I, $[Pe + 1] = oe, $[Pe + 2] = V, $[Pe + 3] = B, U < 32 ? t.scal[wh] &= ~(1 << U) : t.scal[bh] &= ~(1 << U - 32);
}
const sh = h3(), ab = 0.05;
function Nu(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe, B, $, J, ee, W) {
  sh.frameId !== J && (a1(sh), sh.frameId = J);
  const X = g[k * 3], ae = (X >>> 16 & 248) << 8 | (X >>> 8 & 252) << 3 | (X & 248) >> 3;
  y3(
    sh,
    t,
    B,
    0,
    -1,
    $,
    Po,
    ab,
    ae,
    oe,
    a,
    s,
    C,
    f,
    p,
    R,
    m,
    v,
    _,
    W
  ), ee && m3(
    sh,
    t,
    B,
    Ds,
    -1,
    $,
    Po,
    ab
  );
}
const Ri = 32, Xl = 12, dL = 0.9999, Vd = 0.5, M0 = 2 * Jd, mh = 2048, l1 = mh - 1, yl = 4, zu = 0, Du = 1, Ch = 2;
function pL() {
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
    bu: new Float32Array(Ri * Xl),
    bv: new Float32Array(Ri * Xl),
    bid: new Int32Array(Ri * Xl),
    // 1 where the boundary edge LEAVING vertex i must be pushed outward at flush, i.e. the face
    // across it is drawn later. See computeExpandMasks in shared/shaders.js.
    bexp: new Uint8Array(Ri * Xl),
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
function vL(t) {
  const a = t.slots;
  for (let s = 0; s < Ri; s++)
    a[s * yl + zu] = 0, t.meshRef[s] = null;
  t.gen++, t.seq = 0, t.live = 0;
}
function g3(t, a) {
  let s = Math.imul(t, 2654435761) ^ Math.imul(a, 2246822519);
  return s ^= s >>> 15, s = Math.imul(s, 625341585), s ^= s >>> 13, s & l1;
}
function M2(t, a, s) {
  const f = t.gen;
  let p = g3(a, s);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return -1;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === s)
      return t.eSlot[p];
    p = p + 1 & l1;
  }
  return -1;
}
function U0(t, a, s, f) {
  const p = t.gen;
  let m = g3(a, s);
  for (let v = 0; v < 32; v++) {
    if (t.eStamp[m] !== p) {
      t.eStamp[m] = p, t.eFrom[m] = a, t.eTo[m] = s, t.eSlot[m] = f;
      return;
    }
    if (t.eFrom[m] === a && t.eTo[m] === s) return;
    m = m + 1 & l1;
  }
}
function j0(t, a, s) {
  const f = t.gen;
  let p = g3(a, s);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === s) {
      t.eStamp[p] = -1;
      return;
    }
    p = p + 1 & l1;
  }
}
function hL(t, a) {
  const s = a * Xl, f = t.slots[a * yl + Du];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    U0(t, t.bid[s + p], t.bid[s + m], a);
  }
}
function mL(t, a) {
  const s = a * Xl, f = t.slots[a * yl + Du];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    j0(t, t.bid[s + p], t.bid[s + m]);
  }
}
function j2(t, a, s, f, p, m) {
  const v = t.slots, E = a * yl;
  if (v[E + zu] === 0) return;
  const g = v[E + Du];
  mL(t, a), v[E + zu] = 0, t.live--;
  const x = t.meshRef[a];
  if (t.meshRef[a] = null, g < 3 || x === null) return;
  const b = a * Xl, C = t.bu, R = t.bv, _ = a * 6;
  let k = x.texturePattern;
  k || (k = s.createPattern(x.textureImage, "repeat"), x.texturePattern = k), s.fillStyle = k, f[Ds] = -1;
  const O = t.affine[_], z = t.affine[_ + 1], F = t.affine[_ + 2], Y = t.affine[_ + 3];
  s.setTransform(O, z, F, Y, t.affine[_ + 4], t.affine[_ + 5]);
  const P = O * Y - z * F, N = P > 1e-12 || P < -1e-12 ? 1 / P : 0, H = t.bexp;
  s.beginPath();
  for (let I = 0; I < g; I++) {
    const V = C[b + I], oe = R[b + I];
    if (I === 0 ? s.moveTo(V, oe) : s.lineTo(V, oe), H[b + I] === 0) continue;
    const B = I + 1 === g ? 0 : I + 1, $ = C[b + B], J = R[b + B], ee = O * ($ - V) + F * (J - oe), W = z * ($ - V) + Y * (J - oe), X = ee < 0 ? -ee : ee, ae = W < 0 ? -W : W, de = X > ae ? X + 0.4 * ae : ae + 0.4 * X;
    if (de < 1e-6) continue;
    const le = Jd / de, ie = W * le, se = -ee * le, ve = (Y * ie - F * se) * N, U = (O * se - z * ie) * N;
    s.lineTo(V + ve, oe + U), s.lineTo($ + ve, J + U);
  }
  s.fill(), s.setTransform(1, 0, 0, 1, 0, 0), p[m]++;
}
function ib(t, a, s, f, p) {
  const m = t.slots;
  for (; t.live > 0; ) {
    let v = -1, E = 2147483647;
    for (let g = 0; g < Ri; g++) {
      const x = g * yl;
      m[x + zu] !== 0 && m[x + Ch] < E && (E = m[x + Ch], v = g);
    }
    if (v === -1) return;
    j2(t, v, a, s, f, p);
  }
}
function yL(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe = 0) {
  const B = t.slots, $ = ++t.seq, J = R < F ? R < I ? R : I : F < I ? F : I, ee = R > F ? R > I ? R : I : F > I ? F : I, W = _ < Y ? _ < V ? _ : V : Y < V ? Y : V, X = _ > Y ? _ > V ? _ : V : Y > V ? Y : V;
  let ae = -1, de = -1, le = -1, ie = 0, se = 0, ve = -1, U = -1, Z = -1;
  if (t.live > 0) {
    const ke = M2(t, z, C), $e = M2(t, H, z), Se = M2(t, C, H);
    for (let Ye = 0; Ye < 3 && ae === -1; Ye++) {
      const Ze = Ye === 0 ? ke : Ye === 1 ? $e : Se;
      if (Ze === -1) continue;
      const Ae = Ze * yl;
      if (B[Ae + zu] === 0 || t.meshRef[Ze] !== m) continue;
      const tt = Ze * 3;
      if (t.normal[tt] * v + t.normal[tt + 1] * E + t.normal[tt + 2] * g < dL) continue;
      const ct = Ze * 6, Ce = t.affine[ct], qe = t.affine[ct + 1], lt = t.affine[ct + 2], Je = t.affine[ct + 3], St = t.affine[ct + 4], et = t.affine[ct + 5];
      let Et = Ce * x + lt * b + St - R, Ot = qe * x + Je * b + et - _;
      if (Et * Et + Ot * Ot > Vd * Vd || (Et = Ce * k + lt * O + St - F, Ot = qe * k + Je * O + et - Y, Et * Et + Ot * Ot > Vd * Vd) || (Et = Ce * P + lt * N + St - I, Ot = qe * P + Je * N + et - V, Et * Et + Ot * Ot > Vd * Vd)) continue;
      const $t = Ze * Xl, we = B[Ae + Du], Ie = t.bid;
      let it = -1, We = -1, Mt = -1;
      for (let Ct = 0; Ct < we; Ct++) {
        const ht = Ct + 1 === we ? 0 : Ct + 1, Ne = Ie[$t + Ct], ft = Ie[$t + ht];
        Ne === z && ft === C ? it = Ct : Ne === H && ft === z ? We = Ct : Ne === C && ft === H && (Mt = Ct);
      }
      const Ht = (it !== -1 ? 1 : 0) + (We !== -1 ? 1 : 0) + (Mt !== -1 ? 1 : 0);
      if (Ht !== 0) {
        if (Ht === 1) {
          if (we >= Xl) continue;
          it !== -1 ? (de = it, ie = P, se = N, ve = H, U = 0) : We !== -1 ? (de = We, ie = x, se = b, ve = C, U = 1) : (de = Mt, ie = k, se = O, ve = z, U = 2), ae = Ze;
        } else if (Ht === 2) {
          const Ct = it !== -1 ? it : We, ht = Mt !== -1 ? Mt : We !== -1 ? We : it, Ne = (Ct + 1) % we === ht ? Ct : (ht + 1) % we === Ct ? ht : -1;
          if (Ne === -1) continue;
          de = Ne, le = (Ne + 1) % we, Z = it === -1 ? 0 : We === -1 ? 1 : 2, ae = Ze;
        }
      }
    }
  }
  const xe = t.aabb;
  if (t.live > 0)
    for (let ke = 0; ke < Ri; ke++) {
      if (ke === ae || B[ke * yl + zu] === 0) continue;
      const $e = ke << 2;
      xe[$e] > ee + M0 || xe[$e + 2] < J - M0 || xe[$e + 1] > X + M0 || xe[$e + 3] < W - M0 || j2(t, ke, a, s, f, p);
    }
  if (ae !== -1) {
    const ke = ae * Xl, $e = ae * yl, Se = B[$e + Du], Ye = t.bu, Ze = t.bv, Ae = t.bid, tt = t.bexp;
    if (le === -1) {
      const ct = Ae[ke + de], Ce = Ae[ke + (de + 1) % Se];
      j0(t, ct, Ce);
      for (let qe = Se; qe > de + 1; qe--)
        Ye[ke + qe] = Ye[ke + qe - 1], Ze[ke + qe] = Ze[ke + qe - 1], Ae[ke + qe] = Ae[ke + qe - 1], tt[ke + qe] = tt[ke + qe - 1];
      Ye[ke + de + 1] = ie, Ze[ke + de + 1] = se, Ae[ke + de + 1] = ve, tt[ke + de] = oe >> (U + 1) % 3 & 1, tt[ke + de + 1] = oe >> (U + 2) % 3 & 1, B[$e + Du] = Se + 1, U0(t, ct, ve, ae), U0(t, ve, Ce, ae);
    } else {
      const ct = (de + 1) % Se, Ce = Ae[ke + de], qe = Ae[ke + ct], lt = Ae[ke + (ct + 1) % Se];
      j0(t, Ce, qe), j0(t, qe, lt);
      for (let Je = ct; Je < Se - 1; Je++)
        Ye[ke + Je] = Ye[ke + Je + 1], Ze[ke + Je] = Ze[ke + Je + 1], Ae[ke + Je] = Ae[ke + Je + 1], tt[ke + Je] = tt[ke + Je + 1];
      tt[ke + (de < ct ? de : de - 1)] = oe >> Z & 1, B[$e + Du] = Se - 1, U0(t, Ce, lt, ae);
    }
    B[$e + Ch] = $;
    const yt = ae << 2;
    J < xe[yt] && (xe[yt] = J), W < xe[yt + 1] && (xe[yt + 1] = W), ee > xe[yt + 2] && (xe[yt + 2] = ee), X > xe[yt + 3] && (xe[yt + 3] = X);
    return;
  }
  let be = -1;
  for (let ke = 0; ke < Ri; ke++)
    if (B[ke * yl + zu] === 0) {
      be = ke;
      break;
    }
  if (be === -1) {
    let ke = 2147483647;
    for (let $e = 0; $e < Ri; $e++) {
      const Se = B[$e * yl + Ch];
      Se < ke && (ke = Se, be = $e);
    }
    j2(t, be, a, s, f, p);
  }
  const Me = 1 / (x * (O - N) - b * (k - P) + (k * N - P * O)), Oe = be * 6;
  t.affine[Oe] = (R * (O - N) + F * (N - b) + I * (b - O)) * Me, t.affine[Oe + 1] = (_ * (O - N) + Y * (N - b) + V * (b - O)) * Me, t.affine[Oe + 2] = (R * (P - k) + F * (x - P) + I * (k - x)) * Me, t.affine[Oe + 3] = (_ * (P - k) + Y * (x - P) + V * (k - x)) * Me, t.affine[Oe + 4] = (R * (k * N - P * O) + F * (P * b - x * N) + I * (x * O - k * b)) * Me, t.affine[Oe + 5] = (_ * (k * N - P * O) + Y * (P * b - x * N) + V * (x * O - k * b)) * Me;
  const Pe = be * 3;
  t.normal[Pe] = v, t.normal[Pe + 1] = E, t.normal[Pe + 2] = g;
  const _e = be * Xl;
  t.bu[_e] = x, t.bv[_e] = b, t.bid[_e] = C, t.bu[_e + 1] = k, t.bv[_e + 1] = O, t.bid[_e + 1] = z, t.bu[_e + 2] = P, t.bv[_e + 2] = N, t.bid[_e + 2] = H, t.bexp[_e] = oe & 1, t.bexp[_e + 1] = oe >> 1 & 1, t.bexp[_e + 2] = oe >> 2 & 1;
  const je = be * yl;
  B[je + zu] = 1, B[je + Du] = 3, B[je + Ch] = $, t.meshRef[be] = m, t.live++;
  const Be = be << 2;
  xe[Be] = J, xe[Be + 1] = W, xe[Be + 2] = ee, xe[Be + 3] = X, hL(t, be);
}
const Id = pL();
function S3(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe, B, $, J, ee, W) {
  Id.frameId !== J && (vL(Id), Id.frameId = J);
  const X = O.textureImage;
  if (X && X.complete && X.naturalWidth > 0 && O.uvs) {
    const le = O.uvs, ie = O.faces[z] * 2, se = O.faces[z + 1] * 2, ve = O.faces[z + 2] * 2, U = X.width, Z = X.height, xe = le[ie] * U, be = le[ie + 1] * Z, Le = le[se] * U, Me = le[se + 1] * Z, Oe = le[ve] * U, Pe = le[ve + 1] * Z, _e = xe * (Me - Pe) - be * (Le - Oe) + (Le * Pe - Oe * Me);
    if (Math.abs(_e) > 1e-5) {
      yL(
        Id,
        t,
        B,
        $,
        Po,
        O,
        b[k * 3],
        b[k * 3 + 1],
        b[k * 3 + 2],
        xe,
        be,
        C,
        a,
        s,
        Le,
        Me,
        R,
        f,
        p,
        Oe,
        Pe,
        _,
        m,
        v,
        W
      ), ee && ib(
        Id,
        t,
        B,
        $,
        Po
      );
      return;
    }
  }
  ib(
    Id,
    t,
    B,
    $,
    Po
  );
  const ae = g[k * 3], de = (ae >>> 16 & 248) << 8 | (ae >>> 8 & 252) << 3 | (ae & 248) >> 3;
  Rh(
    t,
    a,
    s,
    f,
    p,
    m,
    v,
    de,
    0,
    B,
    $
  );
}
function QC(t, a, s, f, p) {
  let m = 0, v = 0, E = 0;
  if (s === 2 || s === 1) {
    const x = a[t * 9], b = a[t * 9 + 1], C = a[t * 9 + 2], R = a[t * 9 + 3], _ = a[t * 9 + 4], k = a[t * 9 + 5], O = a[t * 9 + 6], z = a[t * 9 + 7], F = a[t * 9 + 8];
    if (s === 2) {
      const Y = f * f, N = 1 / (p * p - Y);
      m = (x * x + b * b + C * C - Y) * N, v = (R * R + _ * _ + k * k - Y) * N, E = (O * O + z * z + F * F - Y) * N;
    } else {
      const Y = Math.sqrt(x * x + b * b + C * C), P = Math.sqrt(R * R + _ * _ + k * k), N = Math.sqrt(O * O + z * z + F * F);
      m = (Y - f) / (p - f), v = (P - f) / (p - f), E = (N - f) / (p - f);
    }
  } else if (s === 3) {
    const x = 1 / (p - f);
    m = (a[t * 9 + 2] - f) * x, v = (a[t * 9 + 5] - f) * x, E = (a[t * 9 + 8] - f) * x;
  }
  let g = (m + v + E) * 0.33333;
  return g < 0 ? g = 0 : g > 1 && (g = 1), g;
}
function E3(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe, B, $) {
  const J = QC(
    k,
    E,
    N,
    I,
    V
  );
  if (J >= 1) {
    const $e = H >>> 16, Se = H >>> 8 & 255, Ye = H & 255, Ze = $e & 248, Ae = Se & 252, tt = Ye & 248, yt = Ze << 8 | Ae << 3 | tt >> 3;
    Rh(
      t,
      a,
      s,
      f,
      p,
      m,
      v,
      yt,
      0,
      B,
      $
    );
    return;
  }
  const ee = O.textureImage;
  if (ee && ee.complete && ee.naturalWidth > 0 && O.uvs) {
    const $e = O.uvs, Se = O.faces[z] * 2, Ye = O.faces[z + 1] * 2, Ze = O.faces[z + 2] * 2, Ae = ee.width, tt = ee.height, yt = $e[Se] * Ae, ct = $e[Se + 1] * tt, Ce = $e[Ye] * Ae, qe = $e[Ye + 1] * tt, lt = $e[Ze] * Ae, Je = $e[Ze + 1] * tt, St = yt * (qe - Je) - ct * (Ce - lt) + (Ce * Je - lt * qe);
    if (Math.abs(St) > 1e-5) {
      const et = 1 / St, Et = (a * (qe - Je) + f * (Je - ct) + m * (ct - qe)) * et, Ot = (a * (lt - Ce) + f * (yt - lt) + m * (Ce - yt)) * et, $t = (a * (Ce * Je - lt * qe) + f * (lt * ct - yt * Je) + m * (yt * qe - Ce * ct)) * et, we = (s * (qe - Je) + p * (Je - ct) + v * (ct - qe)) * et, Ie = (s * (lt - Ce) + p * (yt - lt) + v * (Ce - yt)) * et, it = (s * (Ce * Je - lt * qe) + p * (lt * ct - yt * Je) + v * (yt * qe - Ce * ct)) * et;
      if (t.save(), t.beginPath(), t.moveTo(a, s), t.lineTo(f, p), t.lineTo(m, v), t.closePath(), t.clip(), t.setTransform(Et, we, Ot, Ie, $t, it), t.drawImage(ee, 0, 0), t.restore(), $[Po]++, J > 0) {
        const We = H >>> 16, Mt = H >>> 8 & 255, Ht = H & 255, Ct = We & 248, ht = Mt & 252, Ne = Ht & 248, ft = Ct << 8 | ht << 3 | Ne >> 3;
        t.globalAlpha = J, t.fillStyle = Sl[ft], t.fill(), $[Po]++, t.globalAlpha = 1;
      }
      return;
    }
  }
  const W = k * 3, X = g[W], ae = g[W + 1], de = g[W + 2], le = X >>> 16, ie = X >>> 8 & 255, se = X & 255, ve = ae >>> 16, U = ae >>> 8 & 255, Z = ae & 255, xe = de >>> 16, be = de >>> 8 & 255, Le = de & 255;
  let Me = (le + ve + xe) * 0.33333, Oe = (ie + U + be) * 0.33333, Pe = (se + Z + Le) * 0.33333;
  if (J > 0) {
    const $e = H >>> 16, Se = H >>> 8 & 255, Ye = H & 255, Ze = 1 - J;
    Me = Me * Ze + $e * J, Oe = Oe * Ze + Se * J, Pe = Pe * Ze + Ye * J;
  }
  Me = Math.min(255, Me) | 0, Oe = Math.min(255, Oe) | 0, Pe = Math.min(255, Pe) | 0;
  const _e = Me & 248, je = Oe & 252, Be = Pe & 248, ke = _e << 8 | je << 3 | Be >> 3;
  Rh(
    t,
    a,
    s,
    f,
    p,
    m,
    v,
    ke,
    0,
    B,
    $
  );
}
function x3(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe, B, $, J, ee) {
  const W = QC(
    k,
    E,
    N,
    I,
    V
  );
  if (W >= 1) {
    r1(
      t,
      a,
      s,
      f,
      p,
      m,
      v,
      E,
      g,
      x,
      b,
      C,
      R,
      _,
      k,
      O,
      z,
      F,
      Y,
      P,
      N,
      H,
      I,
      V,
      oe,
      B,
      $
    );
    return;
  }
  const X = x[C], ae = x[C + 1], de = x[C + 2], le = x[R], ie = x[R + 1], se = x[R + 2], ve = x[_], U = x[_ + 1], Z = x[_ + 2], xe = F >>> 16 & 255, be = F >>> 8 & 255, Le = F & 255;
  let Me = xe, Oe = be, Pe = Le, _e = xe, je = be, Be = Le, ke = xe, $e = be, Se = Le;
  const Ye = Y[0];
  for (let Je = 1; Je <= Ye; Je++) {
    const St = P[Y[Je]];
    if (St.light.type === 0) {
      const et = -St.transform.worldMatrix[8], Et = -St.transform.worldMatrix[9], Ot = -St.transform.worldMatrix[10], $t = St.light.color, we = $t >>> 16 & 255, Ie = $t >>> 8 & 255, it = $t & 255, We = Math.max(0, X * et + ae * Et + de * Ot);
      Me += we * We, Oe += Ie * We, Pe += it * We;
      const Mt = Math.max(0, le * et + ie * Et + se * Ot);
      _e += we * Mt, je += Ie * Mt, Be += it * Mt;
      const Ht = Math.max(0, ve * et + U * Et + Z * Ot);
      ke += we * Ht, $e += Ie * Ht, Se += it * Ht;
    }
  }
  Me *= 39215e-7, Oe *= 39215e-7, Pe *= 39215e-7, _e *= 39215e-7, je *= 39215e-7, Be *= 39215e-7, ke *= 39215e-7, $e *= 39215e-7, Se *= 39215e-7, Me > 1 && (Me = 1), Oe > 1 && (Oe = 1), Pe > 1 && (Pe = 1), _e > 1 && (_e = 1), je > 1 && (je = 1), Be > 1 && (Be = 1), ke > 1 && (ke = 1), $e > 1 && ($e = 1), Se > 1 && (Se = 1);
  const Ze = (Me + _e + ke) * 0.33333, Ae = (Oe + je + $e) * 0.33333, tt = (Pe + Be + Se) * 0.33333, yt = 1 - W, ct = (Ze * yt + W) * 255 | 0, Ce = (Ae * yt + W) * 255 | 0, qe = (tt * yt + W) * 255 | 0, lt = (ct & 248) << 8 | (Ce & 252) << 3 | (qe & 248) >> 3;
  Rh(
    t,
    a,
    s,
    f,
    p,
    m,
    v,
    lt,
    Fo,
    B,
    $
  );
}
const uh = h3(), lb = 0.05;
function w3(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe, B, $, J, ee, W) {
  let X = F >>> 16 & 255, ae = F >>> 8 & 255, de = F & 255;
  const le = b[k * 3], ie = b[k * 3 + 1], se = b[k * 3 + 2], ve = Y[0];
  for (let Le = 1; Le <= ve; Le++) {
    const Me = P[Y[Le]];
    if (Me.light.type === 0) {
      const Oe = -Me.transform.worldMatrix[8], Pe = -Me.transform.worldMatrix[9], _e = -Me.transform.worldMatrix[10], je = le * Oe + ie * Pe + se * _e;
      if (je > 0) {
        const Be = Me.light.color;
        X += (Be >>> 16 & 255) * je, ae += (Be >>> 8 & 255) * je, de += (Be & 255) * je;
      }
    }
  }
  X *= 39215e-7, ae *= 39215e-7, de *= 39215e-7, X > 1 && (X = 1), ae > 1 && (ae = 1), de > 1 && (de = 1);
  const U = X * 255 | 0, Z = ae * 255 | 0, xe = de * 255 | 0, be = (U & 248) << 8 | (Z & 252) << 3 | (xe & 248) >> 3;
  uh.frameId !== J && (a1(uh), uh.frameId = J), y3(
    uh,
    t,
    B,
    Fo,
    ef,
    $,
    Qd,
    lb,
    be,
    oe,
    a,
    s,
    C,
    f,
    p,
    R,
    m,
    v,
    _,
    W
  ), ee && m3(
    uh,
    t,
    B,
    Fo,
    ef,
    $,
    Qd,
    lb
  );
}
const ml = 32, Kl = 16, aa = 4, ob = 1e-3, gL = 1e-3, SL = 1e-12, _0 = 2 * Jd, yh = 2048, o1 = yh - 1, gl = 4, Lu = 0, Ou = 1, Th = 2, I0 = 8, F2 = 0, P2 = 1, $2 = 2, q0 = 3, H2 = 4, Y0 = 5, V2 = 6, W0 = 7;
function sb(t, a, s) {
  const f = t < 0 ? 0 : t > 255 ? 255 : t | 0, p = a < 0 ? 0 : a > 255 ? 255 : a | 0, m = s < 0 ? 0 : s > 255 ? 255 : s | 0;
  return (f & 248) << 8 | (p & 252) << 3 | (m & 248) >> 3;
}
function EL() {
  return {
    slots: new Int32Array(ml * gl),
    // The shading field per chart, fitted from the face that seeded it (see the FD_* lanes).
    field: new Float32Array(ml * I0),
    // Screen bounds per chart, [x0, y0, x1, y1] - the overlap guard's only input.
    aabb: new Float32Array(ml * 4),
    // Boundary rings as flat arrays rather than linked nodes: short enough that an insert is a
    // handful of element moves, and an array cannot be corrupted by pointer surgery.
    bx: new Float32Array(ml * Kl),
    by: new Float32Array(ml * Kl),
    bid: new Int32Array(ml * Kl),
    // 1 where the boundary edge LEAVING vertex i must be pushed outward at flush, i.e. the face
    // across it is drawn later. See computeExpandMasks in shared/shaders.js.
    bexp: new Uint8Array(ml * Kl),
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
function xL(t) {
  const a = t.slots;
  for (let s = 0; s < ml; s++) a[s * gl + Lu] = 0;
  t.gen++, t.seq = 0, t.live = 0;
}
function b3(t, a) {
  let s = Math.imul(t, 2654435761) ^ Math.imul(a, 2246822519);
  return s ^= s >>> 15, s = Math.imul(s, 625341585), s ^= s >>> 13, s & o1;
}
function _2(t, a, s) {
  const f = t.gen;
  let p = b3(a, s);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return -1;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === s)
      return t.eSlot[p];
    p = p + 1 & o1;
  }
  return -1;
}
function F0(t, a, s, f) {
  const p = t.gen;
  let m = b3(a, s);
  for (let v = 0; v < 32; v++) {
    if (t.eStamp[m] !== p) {
      t.eStamp[m] = p, t.eFrom[m] = a, t.eTo[m] = s, t.eSlot[m] = f;
      return;
    }
    if (t.eFrom[m] === a && t.eTo[m] === s) return;
    m = m + 1 & o1;
  }
}
function P0(t, a, s) {
  const f = t.gen;
  let p = b3(a, s);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === s) {
      t.eStamp[p] = -1;
      return;
    }
    p = p + 1 & o1;
  }
}
function wL(t, a) {
  const s = a * Kl, f = t.slots[a * gl + Ou];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    F0(t, t.bid[s + p], t.bid[s + m], a);
  }
}
function bL(t, a) {
  const s = a * Kl, f = t.slots[a * gl + Ou];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    P0(t, t.bid[s + p], t.bid[s + m]);
  }
}
function I2(t, a, s, f, p) {
  const m = t.slots, v = a * gl;
  if (m[v + Lu] === 0) return;
  const E = m[v + Ou];
  if (bL(t, a), m[v + Lu] = 0, t.live--, E < 3) return;
  const g = a * Kl, x = t.bx, b = t.by, C = t.bexp, R = a * I0, _ = t.field[R + F2], k = t.field[R + P2];
  let O = 1 / 0, z = -1 / 0;
  for (let I = 0; I < E; I++) {
    const V = x[g + I] * _ + b[g + I] * k;
    V < O && (O = V), V > z && (z = V);
  }
  const F = t.field[R + $2], Y = t.field[R + H2], P = t.field[R + V2], N = sb(
    t.field[R + q0] + F * O,
    t.field[R + Y0] + Y * O,
    t.field[R + W0] + P * O
  ), H = sb(
    t.field[R + q0] + F * z,
    t.field[R + Y0] + Y * z,
    t.field[R + W0] + P * z
  );
  if (N === H || z - O < gL)
    f[Fo] !== N && (s.fillStyle = Sl[N], f[Fo] = N, N !== Jc && (f[ef] = 1));
  else {
    const I = s.createLinearGradient(
      _ * O,
      k * O,
      _ * z,
      k * z
    );
    I.addColorStop(0, Sl[N]), I.addColorStop(1, Sl[H]), s.fillStyle = I, f[Fo] = -1, f[ef] = 1;
  }
  s.beginPath();
  for (let I = 0; I < E; I++) {
    const V = x[g + I], oe = b[g + I];
    if (I === 0 ? s.moveTo(V, oe) : s.lineTo(V, oe), C[g + I] === 0) continue;
    const B = I + 1 === E ? 0 : I + 1, $ = x[g + B], J = b[g + B], ee = $ - V, W = J - oe, X = ee < 0 ? -ee : ee, ae = W < 0 ? -W : W, de = X > ae ? X + 0.4 * ae : ae + 0.4 * X;
    if (de < 1e-6) continue;
    const le = Jd / de, ie = W * le, se = -ee * le;
    s.lineTo(V + ie, oe + se), s.lineTo($ + ie, J + se);
  }
  s.fill(), p[Qd]++;
}
function CL(t, a, s, f) {
  const p = t.slots;
  for (; t.live > 0; ) {
    let m = -1, v = 2147483647;
    for (let E = 0; E < ml; E++) {
      const g = E * gl;
      p[g + Lu] !== 0 && p[g + Th] < v && (v = p[g + Th], m = E);
    }
    if (m === -1) return;
    I2(t, m, a, s, f);
  }
}
function TL(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I = 0) {
  const V = t.slots, oe = ++t.seq, B = E < _ ? E < P ? E : P : _ < P ? _ : P, $ = E > _ ? E > P ? E : P : _ > P ? _ : P, J = g < k ? g < N ? g : N : k < N ? k : N, ee = g > k ? g > N ? g : N : k > N ? k : N;
  let W = -1, X = -1, ae = -1, de = 0, le = 0, ie = -1, se = -1, ve = -1;
  if (t.live > 0) {
    const Ce = _2(t, O, x), qe = _2(t, H, O), lt = _2(t, x, H);
    for (let Je = 0; Je < 3 && W === -1; Je++) {
      const St = Je === 0 ? Ce : Je === 1 ? qe : lt;
      if (St === -1) continue;
      const et = St * gl;
      if (V[et + Lu] === 0) continue;
      const Et = St * I0, Ot = t.field[Et + F2], $t = t.field[Et + P2], we = t.field[Et + $2], Ie = t.field[Et + q0], it = t.field[Et + H2], We = t.field[Et + Y0], Mt = t.field[Et + V2], Ht = t.field[Et + W0];
      let Ct = E * Ot + g * $t, ht = Ie + we * Ct - p;
      if (ht > aa || ht < -aa || (ht = We + it * Ct - m, ht > aa || ht < -aa) || (ht = Ht + Mt * Ct - v, ht > aa || ht < -aa) || (Ct = _ * Ot + k * $t, ht = Ie + we * Ct - b, ht > aa || ht < -aa) || (ht = We + it * Ct - C, ht > aa || ht < -aa) || (ht = Ht + Mt * Ct - R, ht > aa || ht < -aa) || (Ct = P * Ot + N * $t, ht = Ie + we * Ct - z, ht > aa || ht < -aa) || (ht = We + it * Ct - F, ht > aa || ht < -aa) || (ht = Ht + Mt * Ct - Y, ht > aa || ht < -aa)) continue;
      const Ne = St * Kl, ft = V[et + Ou], kt = t.bid;
      let Zt = -1, nn = -1, yn = -1;
      for (let Gn = 0; Gn < ft; Gn++) {
        const Pr = Gn + 1 === ft ? 0 : Gn + 1, Cr = kt[Ne + Gn], vr = kt[Ne + Pr];
        Cr === O && vr === x ? Zt = Gn : Cr === H && vr === O ? nn = Gn : Cr === x && vr === H && (yn = Gn);
      }
      const Hn = (Zt !== -1 ? 1 : 0) + (nn !== -1 ? 1 : 0) + (yn !== -1 ? 1 : 0);
      if (Hn !== 0) {
        if (Hn === 1) {
          if (ft >= Kl) continue;
          Zt !== -1 ? (X = Zt, de = P, le = N, ie = H, se = 0) : nn !== -1 ? (X = nn, de = E, le = g, ie = x, se = 1) : (X = yn, de = _, le = k, ie = O, se = 2), W = St;
        } else if (Hn === 2) {
          const Gn = Zt !== -1 ? Zt : nn, Pr = yn !== -1 ? yn : nn !== -1 ? nn : Zt, Cr = (Gn + 1) % ft === Pr ? Gn : (Pr + 1) % ft === Gn ? Pr : -1;
          if (Cr === -1) continue;
          X = Cr, ae = (Cr + 1) % ft, ve = Zt === -1 ? 0 : nn === -1 ? 1 : 2, W = St;
        }
      }
    }
  }
  const U = t.aabb;
  if (t.live > 0)
    for (let Ce = 0; Ce < ml; Ce++) {
      if (Ce === W || V[Ce * gl + Lu] === 0) continue;
      const qe = Ce << 2;
      U[qe] > $ + _0 || U[qe + 2] < B - _0 || U[qe + 1] > ee + _0 || U[qe + 3] < J - _0 || I2(t, Ce, a, s, f);
    }
  if (W !== -1) {
    const Ce = W * Kl, qe = W * gl, lt = V[qe + Ou], Je = t.bx, St = t.by, et = t.bid, Et = t.bexp;
    if (ae === -1) {
      const $t = et[Ce + X], we = et[Ce + (X + 1) % lt];
      P0(t, $t, we);
      for (let Ie = lt; Ie > X + 1; Ie--)
        Je[Ce + Ie] = Je[Ce + Ie - 1], St[Ce + Ie] = St[Ce + Ie - 1], et[Ce + Ie] = et[Ce + Ie - 1], Et[Ce + Ie] = Et[Ce + Ie - 1];
      Je[Ce + X + 1] = de, St[Ce + X + 1] = le, et[Ce + X + 1] = ie, Et[Ce + X] = I >> (se + 1) % 3 & 1, Et[Ce + X + 1] = I >> (se + 2) % 3 & 1, V[qe + Ou] = lt + 1, F0(t, $t, ie, W), F0(t, ie, we, W);
    } else {
      const $t = (X + 1) % lt, we = et[Ce + X], Ie = et[Ce + $t], it = et[Ce + ($t + 1) % lt];
      P0(t, we, Ie), P0(t, Ie, it);
      for (let We = $t; We < lt - 1; We++)
        Je[Ce + We] = Je[Ce + We + 1], St[Ce + We] = St[Ce + We + 1], et[Ce + We] = et[Ce + We + 1], Et[Ce + We] = Et[Ce + We + 1];
      Et[Ce + (X < $t ? X : X - 1)] = I >> ve & 1, V[qe + Ou] = lt - 1, F0(t, we, it, W);
    }
    V[qe + Th] = oe;
    const Ot = W << 2;
    B < U[Ot] && (U[Ot] = B), J < U[Ot + 1] && (U[Ot + 1] = J), $ > U[Ot + 2] && (U[Ot + 2] = $), ee > U[Ot + 3] && (U[Ot + 3] = ee);
    return;
  }
  let Z = -1;
  for (let Ce = 0; Ce < ml; Ce++)
    if (V[Ce * gl + Lu] === 0) {
      Z = Ce;
      break;
    }
  if (Z === -1) {
    let Ce = 2147483647;
    for (let qe = 0; qe < ml; qe++) {
      const lt = V[qe * gl + Th];
      lt < Ce && (Ce = lt, Z = qe);
    }
    I2(t, Z, a, s, f);
  }
  const xe = _ - E, be = k - g, Le = P - E, Me = N - g, Oe = xe * Me - Le * be, Pe = (p + b + z) * 0.33333334, _e = (m + C + F) * 0.33333334, je = (v + R + Y) * 0.33333334;
  let Be = 1, ke = 0, $e = 0, Se = 0, Ye = 0;
  if (Oe > ob || Oe < -ob) {
    const Ce = 1 / Oe, qe = b - p, lt = z - p, Je = C - m, St = F - m, et = R - v, Et = Y - v, Ot = (qe * Me - lt * be) * Ce, $t = (xe * lt - Le * qe) * Ce, we = (Je * Me - St * be) * Ce, Ie = (xe * St - Le * Je) * Ce, it = (et * Me - Et * be) * Ce, We = (xe * Et - Le * et) * Ce, Mt = Ot * Ot + $t * $t, Ht = we * we + Ie * Ie, Ct = it * it + We * We;
    let ht, Ne, ft;
    if (Mt >= Ht && Mt >= Ct ? (ht = Ot, Ne = $t, ft = Mt) : Ht >= Ct ? (ht = we, Ne = Ie, ft = Ht) : (ht = it, Ne = We, ft = Ct), ft > SL) {
      const kt = 1 / Math.sqrt(ft);
      Be = ht * kt, ke = Ne * kt, $e = Ot * Be + $t * ke, Se = we * Be + Ie * ke, Ye = it * Be + We * ke;
    }
  }
  const Ze = ((E + _ + P) * Be + (g + k + N) * ke) * 0.33333334, Ae = Z * I0;
  t.field[Ae + F2] = Be, t.field[Ae + P2] = ke, t.field[Ae + $2] = $e, t.field[Ae + q0] = Pe - $e * Ze, t.field[Ae + H2] = Se, t.field[Ae + Y0] = _e - Se * Ze, t.field[Ae + V2] = Ye, t.field[Ae + W0] = je - Ye * Ze;
  const tt = Z * Kl;
  t.bx[tt] = E, t.by[tt] = g, t.bid[tt] = x, t.bx[tt + 1] = _, t.by[tt + 1] = k, t.bid[tt + 1] = O, t.bx[tt + 2] = P, t.by[tt + 2] = N, t.bid[tt + 2] = H, t.bexp[tt] = I & 1, t.bexp[tt + 1] = I >> 1 & 1, t.bexp[tt + 2] = I >> 2 & 1;
  const yt = Z * gl;
  V[yt + Lu] = 1, V[yt + Ou] = 3, V[yt + Th] = oe, t.live++;
  const ct = Z << 2;
  U[ct] = B, U[ct + 1] = J, U[ct + 2] = $, U[ct + 3] = ee, wL(t, Z);
}
const ch = EL();
function Xd(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe, B, $, J, ee, W) {
  const X = F >>> 16 & 255, ae = F >>> 8 & 255, de = F & 255;
  let le = X, ie = ae, se = de, ve = X, U = ae, Z = de, xe = X, be = ae, Le = de;
  const Me = x[C], Oe = x[C + 1], Pe = x[C + 2], _e = x[R], je = x[R + 1], Be = x[R + 2], ke = x[_], $e = x[_ + 1], Se = x[_ + 2], Ye = Y[0];
  for (let Ze = 1; Ze <= Ye; Ze++) {
    const Ae = P[Y[Ze]];
    if (Ae.light.type !== 0) continue;
    const tt = Ae.light.color, yt = tt >>> 16 & 255, ct = tt >>> 8 & 255, Ce = tt & 255, qe = -Ae.transform.worldMatrix[8], lt = -Ae.transform.worldMatrix[9], Je = -Ae.transform.worldMatrix[10], St = Me * qe + Oe * lt + Pe * Je, et = _e * qe + je * lt + Be * Je, Et = ke * qe + $e * lt + Se * Je;
    St > 0 && (le += yt * St, ie += ct * St, se += Ce * St), et > 0 && (ve += yt * et, U += ct * et, Z += Ce * et), Et > 0 && (xe += yt * Et, be += ct * Et, Le += Ce * Et);
  }
  le > 255 && (le = 255), ie > 255 && (ie = 255), se > 255 && (se = 255), ve > 255 && (ve = 255), U > 255 && (U = 255), Z > 255 && (Z = 255), xe > 255 && (xe = 255), be > 255 && (be = 255), Le > 255 && (Le = 255), ch.frameId !== J && (xL(ch), ch.frameId = J), TL(
    ch,
    t,
    B,
    $,
    le,
    ie,
    se,
    a,
    s,
    C,
    ve,
    U,
    Z,
    f,
    p,
    R,
    xe,
    be,
    Le,
    m,
    v,
    _,
    W
  ), ee && CL(ch, t, B, $);
}
const nf = [], rf = [];
let RL = 6;
const ep = 0, tp = 1, Dh = 2, Oh = 3, np = 4;
nf[ep] = Nu;
rf[ep] = w3;
nf[tp] = S3;
rf[tp] = Xd;
nf[Dh] = Nu;
rf[Dh] = r1;
nf[Oh] = E3;
rf[Oh] = x3;
nf[np] = Nu;
rf[np] = Xd;
function ML(t, a) {
  const s = RL++;
  return nf[s] = t, a && (rf[s] = a), s;
}
const fh = h3();
let dh = new Float32Array(0), k2 = new Uint8Array(0);
const No = new Int32Array(4), D2 = 0, $0 = 1, q2 = 2, qa = new Float32Array(4), ub = 0.05, Y2 = 9, G0 = 1, W2 = 4, G2 = 5, cb = 0;
function _L(t, a, s, f, p) {
  let m = 0;
  if (s === 2 || s === 1) {
    const v = a[t * 9], E = a[t * 9 + 1], g = a[t * 9 + 2], x = a[t * 9 + 3], b = a[t * 9 + 4], C = a[t * 9 + 5], R = a[t * 9 + 6], _ = a[t * 9 + 7], k = a[t * 9 + 8], O = (v + x + R) * 0.33333, z = (E + b + _) * 0.33333, F = (g + C + k) * 0.33333;
    if (s === 2) {
      const Y = f * f, N = 1 / (p * p - Y);
      m = (O * O + z * z + F * F - Y) * N;
    } else
      m = (Math.sqrt(O * O + z * z + F * F) - f) / (p - f);
  } else if (s === 3) {
    const v = a[t * 9 + 2], E = a[t * 9 + 5], g = a[t * 9 + 8];
    m = ((v + E + g) * 0.33333 - f) / (p - f);
  }
  return m < 0 ? m = 0 : m > 1 && (m = 1), m;
}
function kL(t, a, s, f, p, m, v, E, g, x, b, C, R) {
  No[D2] = 0, No[$0] = 0, No[q2] = 0, qa[0] = 1 / 0, qa[1] = 1 / 0, qa[2] = -1 / 0, qa[3] = -1 / 0;
  let _ = 0, k = 0;
  for (let P = 0; P < E; P++) {
    const N = t[P], H = a[N];
    if (H !== ep && H !== tp && H !== np) {
      v[N] = 1;
      continue;
    }
    const I = _L(
      N,
      s,
      b,
      C,
      R
    );
    if (m[N] = I, v[N] = 0, _++, I > 0 && (No[$0] = 1), I >= 1) {
      k++;
      continue;
    }
    const V = p[N * 3], oe = p[N * 3 + 1], B = p[N * 3 + 2], $ = f[V] * g + g, J = f[V + 1] * x + x, ee = f[oe] * g + g, W = f[oe + 1] * x + x, X = f[B] * g + g, ae = f[B + 1] * x + x;
    let de = $ < ee ? $ : ee;
    X < de && (de = X);
    let le = $ > ee ? $ : ee;
    X > le && (le = X);
    let ie = J < W ? J : W;
    ae < ie && (ie = ae);
    let se = J > W ? J : W;
    ae > se && (se = ae), de < qa[0] && (qa[0] = de), ie < qa[1] && (qa[1] = ie), le > qa[2] && (qa[2] = le), se > qa[3] && (qa[3] = se);
  }
  if (No[D2] = _, No[$0] === 0 || _ === 0) return;
  if (k === _) {
    No[q2] = 1;
    return;
  }
  if (k === 0) return;
  const O = qa[0], z = qa[1], F = qa[2], Y = qa[3];
  for (let P = 0; P < E; P++) {
    const N = t[P];
    if (v[N] === 1 || m[N] < 1) continue;
    const H = p[N * 3], I = p[N * 3 + 1], V = p[N * 3 + 2], oe = f[H] * g + g, B = f[H + 1] * x + x, $ = f[I] * g + g, J = f[I + 1] * x + x, ee = f[V] * g + g, W = f[V + 1] * x + x;
    let X = oe < $ ? oe : $;
    if (ee < X && (X = ee), X > F) {
      v[N] = 1, _--;
      continue;
    }
    let ae = oe > $ ? oe : $;
    if (ee > ae && (ae = ee), ae < O) {
      v[N] = 1, _--;
      continue;
    }
    let de = B < J ? B : J;
    if (W < de && (de = W), de > Y) {
      v[N] = 1, _--;
      continue;
    }
    let le = B > J ? B : J;
    W > le && (le = W), le < z && (v[N] = 1, _--);
  }
  No[D2] = _;
}
function DL(t, a, s, f, p, m, v, E, g, x, b) {
  if (g === 0) return 0;
  const C = b - x > 1e-4 ? 65535 / (b - x) : 0;
  E.fill(0, 0, 32);
  let R = 0;
  for (let k = 0; k < g; k++) {
    const O = t[k];
    if (v[O] === 1) continue;
    const z = (255 * (1 - m[O]) & 248) >> 3;
    E[z]++, R++;
  }
  let _ = 0;
  for (let k = 0; k < 32; k++) {
    const O = E[k];
    E[k] = _, _ += O;
  }
  for (let k = 0; k < g; k++) {
    const O = t[k];
    if (v[O] === 1) continue;
    const z = (255 * (1 - m[O]) & 248) >> 3;
    s[E[z]++] = O;
  }
  E.fill(0, 0, 256);
  for (let k = 0; k < R; k++)
    E[f[s[k]] & 255]++;
  _ = 0;
  for (let k = 0; k < 256; k++) {
    const O = E[k];
    E[k] = _, _ += O;
  }
  for (let k = 0; k < R; k++) {
    const O = s[k];
    a[E[f[O] & 255]++] = O;
  }
  E.fill(0, 0, 256);
  for (let k = 0; k < R; k++) {
    const O = a[k];
    let F = (p[O] - x) * C;
    F < 0 ? F = 0 : F > 65535 && (F = 65535), E[65535 - (F | 0) & 255]++;
  }
  _ = 0;
  for (let k = 0; k < 256; k++) {
    const O = E[k];
    E[k] = _, _ += O;
  }
  for (let k = 0; k < R; k++) {
    const O = a[k];
    let F = (p[O] - x) * C;
    F < 0 ? F = 0 : F > 65535 && (F = 65535), s[E[65535 - (F | 0) & 255]++] = O;
  }
  E.fill(0, 0, 256);
  for (let k = 0; k < R; k++) {
    const O = s[k];
    let F = (p[O] - x) * C;
    F < 0 ? F = 0 : F > 65535 && (F = 65535), E[65535 - (F | 0) >> 8 & 255]++;
  }
  _ = 0;
  for (let k = 0; k < 256; k++) {
    const O = E[k];
    E[k] = _, _ += O;
  }
  for (let k = 0; k < R; k++) {
    const O = s[k];
    let F = (p[O] - x) * C;
    F < 0 ? F = 0 : F > 65535 && (F = 65535), a[E[65535 - (F | 0) >> 8 & 255]++] = O;
  }
  return R;
}
function OL(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F) {
  const Y = 255 * (1 - b) & 248, P = (Y & 248) << 8 | (Y & 252) << 3 | (Y & 248) >> 3;
  return fh.frameId !== O && (a1(fh), fh.frameId = O), (R || P !== cb) && (P !== cb && (R = !0), y3(
    fh,
    t,
    _,
    Y2,
    -1,
    k,
    G0,
    ub,
    P,
    C,
    a,
    s,
    E,
    f,
    p,
    g,
    m,
    v,
    x,
    F
  )), z && m3(
    fh,
    t,
    _,
    Y2,
    -1,
    k,
    G0,
    ub
  ), R;
}
function AL(t, a, s) {
  const f = t.canvas, p = a.canvas, m = f.width, v = f.height, E = p.width, g = p.height;
  t.globalCompositeOperation = "multiply", t.drawImage(p, 0, 0, m, v);
  const x = s >>> 16, b = s >>> 8 & 255, C = s & 255, R = (x & 248) << 8 | (b & 252) << 3 | (C & 248) >> 3, _ = Sl[R];
  a.globalCompositeOperation = "difference", a.fillStyle = "#ffffff", a.fillRect(0, 0, E, g), a.globalCompositeOperation = "multiply", a.fillStyle = _, a.fillRect(0, 0, E, g), a.globalCompositeOperation = "source-over", t.globalCompositeOperation = "lighter", t.drawImage(p, 0, 0, m, v), t.globalCompositeOperation = "source-over";
}
function zL(t, a, s, f, p, m, v, E, g, x, b, C, R, _) {
  const k = t.canvas, O = k.width, z = k.height, F = O * 0.5, Y = z * 0.5;
  t.fillStyle = "#000000", t.fillRect(0, 0, O, z), p3(
    p,
    0,
    x,
    E,
    g,
    v
  );
  let P = !1;
  for (let N = 0; N < x; N++) {
    const H = p[N], I = s[H * 3], V = s[H * 3 + 1], oe = s[H * 3 + 2], B = f[H * 3], $ = f[H * 3 + 1], J = f[H * 3 + 2], ee = a[I] * F + F, W = a[I + 1] * Y + Y, X = a[V] * F + F, ae = a[V + 1] * Y + Y, de = a[oe] * F + F, le = a[oe + 1] * Y + Y, ie = N === x - 1;
    P = OL(
      t,
      ee,
      W,
      X,
      ae,
      de,
      le,
      B,
      $,
      J,
      b[H],
      m[H],
      P,
      C,
      R,
      _,
      ie,
      v[H]
    );
  }
}
function LL(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe, B) {
  const $ = a.canvas;
  if (dh.length < z && (dh = new Float32Array(z), k2 = new Uint8Array(z)), kL(
    m,
    g,
    C,
    s,
    f,
    dh,
    k2,
    z,
    $.width * 0.5,
    $.height * 0.5,
    P,
    N,
    H
  ), No[$0] === 0) return;
  if (No[q2] === 1) {
    const X = I >>> 16, ae = I >>> 8 & 255, de = I & 255, le = (X & 248) << 8 | (ae & 252) << 3 | (de & 248) >> 3;
    t.fillStyle = Sl[le], t.fillRect(0, 0, t.canvas.width, t.canvas.height), V[Ds] = -1;
    return;
  }
  const J = performance.now(), ee = DL(
    m,
    v,
    E,
    x,
    b,
    dh,
    k2,
    O,
    z,
    F,
    Y
  );
  oe[W2] = performance.now() - J;
  const W = performance.now();
  zL(
    a,
    s,
    f,
    p,
    v,
    x,
    R,
    _,
    k,
    ee,
    dh,
    V,
    oe,
    B
  ), oe[G2] = performance.now() - W, AL(t, a, I);
}
const NL = lr.computeNormalMatrix, O2 = FD, fb = Z0, UL = oL, jL = sL;
function FL(t, a, s, f, p) {
  if (f === 1)
    return t;
  const m = t[0] + 1;
  s.fill(0);
  for (let E = 1; E < m; E++) {
    const g = t[E], x = a[g];
    x.meshRenderer && s[x.meshRenderer.layer]++;
  }
  let v = 0;
  for (let E = 0; E < f; E++) {
    const g = s[E];
    s[E] = v, p[v] = 0, v += 1 + g;
  }
  for (let E = 1; E < m; E++) {
    const g = t[E], x = a[g];
    if (x.meshRenderer) {
      const b = x.meshRenderer.layer, C = s[b], R = p[C];
      p[C + 1 + R] = g, p[C] = R + 1;
    }
  }
  return p;
}
function BC() {
  this.layerBuffers = new Uint32Array(0), this.layerBuffersOffsets = new Uint32Array(Q0.layersCount), this.drawCalls = 0, this.faces = 0, this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.colorBuffer = new Uint32Array(0), this.shaderTypeBuffer = new Uint8Array(0), this.shaderPassBuffer = new Uint8Array(0), this.faceNormalsBuffer = new Float32Array(0), this.vertexNormalsBuffer = new Float32Array(0), this.meshIndexBuffer = new Uint32Array(0), this.meshFaceIndexBuffer = new Uint32Array(0), this.weldIdBuffer = new Uint32Array(0), this.expandMaskBuffer = new Uint8Array(0), this.neighbourFaceBuffer = new Int32Array(0), this.faceRankBuffer = new Int32Array(0), this.triToFace = new Int32Array(0), this.triToFaceStamp = new Int32Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.lightsIndexBuffer = new Uint32Array(10), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0), this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0), this.tempIndexBuffer = new Uint32Array(0), this.fogSortScratchBuffer = new Uint32Array(0), this.counters = new Uint32Array(256), this.ctxStateBuffer = new Int32Array(10), this.statsBuffer = new Float32Array(6);
}
var Ii = BC.prototype;
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
Ii.render = function(t, a, s) {
  let f = performance.now();
  const p = performance.now();
  let m = t.scene.retrieve();
  const v = performance.now() - p;
  let E = Q0.layersCount, g = a.width, x = a.height, b, C = this.vec3Cache1, R = this.vec3Cache2, _ = this.vec4Cache, k = this.depthBuffer, O = this.indexBuffer, z = this.vertexIndexBuffer, F = this.vertexBuffer, Y = this.clipGeometryBuffer, P = this.colorBuffer, N = this.shaderTypeBuffer, H = this.shaderPassBuffer, I = this.faceNormalsBuffer, V = this.vertexNormalsBuffer, oe = this.meshIndexBuffer, B = this.meshFaceIndexBuffer, $ = this.weldIdBuffer, J = this.expandMaskBuffer, ee = this.neighbourFaceBuffer, W = this.faceRankBuffer, X = this.visibleObjectsBuffer, ae = this.lightsIndexBuffer, de = this.layerBuffersOffsets, le = this.mat4Scratchpad1, ie = this.mat4Scratchpad2, se = a.getWorldToScreen(), ve = t.transform.getWorldToLocal(), U = t.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let Z = this.tempIndexBuffer, xe = this.fogSortScratchBuffer, be = this.counters, Le = this.ctxStateBuffer, Me = this.statsBuffer;
  const Oe = ++HL;
  let Pe = 0, _e = 0, je = 0, Be = 0, ke = 0, $e = 0, Se = 0, Ye = 0, Ze = 0;
  const Ae = t.camera, tt = Ae.flush || this.wireframe || !this.fillEnabled || !this.shadeEnabled || !this.fogEnabled;
  if (X.length < m.length) {
    const $t = X;
    this.visibleObjectsBuffer = X = new Uint32Array(
      m.length
    ), X.set($t);
  }
  if (ae.length < m.length) {
    const $t = ae;
    this.lightsIndexBuffer = ae = new Uint32Array(
      m.length
    ), ae.set($t);
  }
  const yt = performance.now();
  PL(
    m,
    U,
    X,
    ae
  ), $L(X, m, U);
  const ct = performance.now() - yt, Ce = X[0] + 1, qe = X[0];
  E > 1 && this.layerBuffers.length < qe + E && (this.layerBuffers = new Uint32Array((qe + E) * 2));
  const lt = performance.now();
  let Je = FL(
    X,
    m,
    de,
    E,
    this.layerBuffers
  );
  const St = performance.now() - lt;
  let et = 0, Et = 0, Ot = 0;
  for (b = 0; b < E; b++) {
    const $t = Je[Ot];
    if ($t === 0) {
      Ot += 1;
      continue;
    }
    const we = a.layers[b], Ie = a.shadeLayers[b], it = a.fogLayers[b];
    let We = 0, Mt = 0;
    for (let Ne = 0; Ne < $t; Ne++) {
      const ft = m[Je[Ot + 1 + Ne]].meshRenderer;
      We += ft.faces.length;
      const kt = ft.vertices.length;
      kt > Mt && (Mt = kt);
    }
    We = We / 3 | 0;
    const Ht = Mt / 3 | 0;
    if (this.vMapping.length < Ht && (this.vMapping = new Int32Array(Ht), this.vTags = new Uint32Array(Ht)), C.length < Mt && (this.vec3Cache1 = C = new Float32Array(Mt), this.vec3Cache2 = R = new Float32Array(Mt), this.vec4Cache = _ = new Float32Array(Mt * 4 / 3)), k.length < We) {
      let Ne = new Float32Array(We);
      Ne.set(k), this.depthBuffer = k = Ne, Ne = new Uint32Array(We), Ne.set(O), this.indexBuffer = O = Ne, Ne = new Uint32Array(We), Ne.set(Z), this.tempIndexBuffer = Z = Ne, Ne = new Uint32Array(We), Ne.set(xe), this.fogSortScratchBuffer = xe = Ne, Ne = new Uint32Array(We * 3), Ne.set(P), this.colorBuffer = P = Ne, Ne = new Uint8Array(We), Ne.set(N), this.shaderTypeBuffer = N = Ne, Ne = new Uint8Array(We), Ne.set(H), this.shaderPassBuffer = H = Ne, Ne = new Float32Array(We * 9), Ne.set(Y), this.clipGeometryBuffer = Y = Ne, Ne = new Float32Array(We * 3), Ne.set(I), this.faceNormalsBuffer = I = Ne, Ne = new Float32Array(We * 9), Ne.set(V), this.vertexNormalsBuffer = V = Ne, Ne = new Uint32Array(We), Ne.set(oe), this.meshIndexBuffer = oe = Ne, Ne = new Uint32Array(We), Ne.set(B), this.meshFaceIndexBuffer = B = Ne;
      let ft = new Float32Array(We * 6);
      ft.set(F), this.vertexBuffer = F = ft;
      let kt = new Uint32Array(We * 3);
      kt.set(z), this.vertexIndexBuffer = z = kt;
      let Zt = new Uint32Array(We * 3);
      Zt.set($), this.weldIdBuffer = $ = Zt;
      const nn = new Uint8Array(We);
      nn.set(J), this.expandMaskBuffer = J = nn;
      const yn = new Int32Array(We * 3);
      yn.set(ee), this.neighbourFaceBuffer = ee = yn;
      const Hn = new Int32Array(We).fill(-1);
      Hn.set(W), this.faceRankBuffer = W = Hn, this.triToFace = new Int32Array(We), this.triToFaceStamp = new Int32Array(We);
    }
    const Ct = performance.now(), ht = VL(
      Je,
      Ot + 1,
      m,
      $t,
      R,
      _,
      O,
      k,
      P,
      N,
      H,
      Y,
      ve,
      U,
      ie,
      le,
      this.mat3Scratchpad1,
      I,
      V,
      F,
      z,
      $,
      oe,
      B,
      ee,
      this.triToFace,
      this.triToFaceStamp,
      this.vMapping,
      this.vTags
    );
    if (Et += performance.now() - Ct, Ae.depthSorting) {
      const Ne = performance.now();
      uL(
        O,
        Z,
        k,
        oe,
        H,
        be,
        ht,
        Ae.nearClippingPane,
        Ae.farClippingPane
      ), et += performance.now() - Ne;
    }
    if (Le[Ds] = -1, Le[Fo] = -1, Le[Y2] = -1, Le[ef] = 0, Me[Po] = 0, Me[G0] = 0, Me[Qd] = 0, Me[W2] = 0, Me[G2] = 0, this.wireframe)
      IL(
        we,
        F,
        z,
        O,
        ht,
        0,
        g,
        x,
        Le
      );
    else {
      if (this.fillEnabled) {
        const Ne = performance.now();
        qL(
          we,
          F,
          z,
          $,
          O,
          P,
          N,
          ht,
          0,
          tt,
          Y,
          Ae.bgColor,
          Ae.fogType,
          Ae.fogColor,
          Ae.fogNearPane,
          Ae.fogFarPane,
          Ae.ambientLight,
          I,
          V,
          oe,
          B,
          J,
          ee,
          W,
          Je,
          Ot + 1,
          ae,
          m,
          Le,
          Me,
          Oe
        ), $e += performance.now() - Ne;
      } else
        Le[Ds] !== Jc && (we.fillStyle = Sl[Jc], Le[Ds] = Jc), we.fillRect(0, 0, we.canvas.width, we.canvas.height);
      if (this.shadeEnabled) {
        const Ne = performance.now();
        YL(
          Ie,
          tt,
          F,
          z,
          $,
          O,
          P,
          N,
          ht,
          0,
          Y,
          Ae.fogType,
          Ae.fogColor,
          Ae.fogNearPane,
          Ae.fogFarPane,
          Ae.ambientLight,
          I,
          V,
          oe,
          B,
          J,
          ee,
          W,
          Je,
          Ot + 1,
          ae,
          m,
          Le,
          Me,
          Oe
        ), Se += performance.now() - Ne, Le[ef] && (we.globalCompositeOperation = "multiply", we.drawImage(
          Ie.canvas,
          0,
          0,
          we.canvas.width,
          we.canvas.height
        ), we.globalCompositeOperation = "source-over");
      }
      this.fogEnabled && Ae.fogType !== i3.NONE && LL(
        we,
        it,
        F,
        z,
        $,
        O,
        Z,
        xe,
        N,
        oe,
        k,
        Y,
        J,
        ee,
        W,
        be,
        ht,
        Ae.nearClippingPane,
        Ae.farClippingPane,
        Ae.fogType,
        Ae.fogNearPane,
        Ae.fogFarPane,
        Ae.fogColor,
        Le,
        Me,
        Oe
      ), je += Me[Po], Be += Me[G0], ke += Me[Qd], Ye += Me[W2], Ze += Me[G2];
    }
    this.debugNormals && jL(
      we,
      F,
      z,
      O,
      I,
      V,
      ht,
      0,
      g,
      x,
      ve
    ), tt && a.context.clearRect(0, 0, g, x), a.context.drawImage(we.canvas, 0, 0), Pe += ht, _e += ht, Ot += 1 + $t;
  }
  this.debugAxis && UL(m, a.context, se, C), s.totalObjects = m.length, s.visibleObjects = Ce, s.drawCalls = Pe, s.faces = _e, s.fillDrawCalls = je, s.fogDrawCalls = Be, s.shadeDrawCalls = ke, s.drawCallsTotal = je + Be + ke, s.sortTime = et, s.cullTime = ct, s.groupTime = St, s.processTime = Et, s.fillRasterTime = $e, s.shadeRasterTime = Se, s.fogSortTime = Ye, s.fogRasterTime = Ze, s.updateTime = t.scene && t.scene.world ? t.scene.world.lastTickTime : 0, s.retrieveTime = v, s.dt = performance.now() - f;
};
function PL(t, a, s, f) {
  let p = 0, m = 0;
  const v = a[0], E = a[1], g = a[2], x = a[3], b = a[4], C = a[5], R = a[6], _ = a[7], k = a[8], O = a[9], z = a[10], F = a[11], Y = a[12], P = a[13], N = a[14], H = a[15];
  let I = x + v, V = _ + b, oe = F + k, B = H + Y, $ = 1 / Math.sqrt(I * I + V * V + oe * oe);
  I *= $, V *= $, oe *= $, B *= $;
  let J = x - v, ee = _ - b, W = F - k, X = H - Y;
  $ = 1 / Math.sqrt(J * J + ee * ee + W * W), J *= $, ee *= $, W *= $, X *= $;
  let ae = x + E, de = _ + C, le = F + O, ie = H + P;
  $ = 1 / Math.sqrt(ae * ae + de * de + le * le), ae *= $, de *= $, le *= $, ie *= $;
  let se = x - E, ve = _ - C, U = F - O, Z = H - P;
  $ = 1 / Math.sqrt(se * se + ve * ve + U * U), se *= $, ve *= $, U *= $, Z *= $;
  let xe = x + g, be = _ + R, Le = F + z, Me = H + N;
  $ = 1 / Math.sqrt(xe * xe + be * be + Le * Le), xe *= $, be *= $, Le *= $, Me *= $;
  let Oe = x - g, Pe = _ - R, _e = F - z, je = H - N;
  $ = 1 / Math.sqrt(Oe * Oe + Pe * Pe + _e * _e), Oe *= $, Pe *= $, _e *= $, je *= $;
  const Be = t.length;
  for (let ke = 0; ke < Be; ke++) {
    const $e = t[ke];
    if ($e.meshRenderer && $e.meshRenderer.enabled) {
      const Se = $e.transform.worldMatrix, Ye = $e.meshRenderer.bounds, Ze = Ye[28], Ae = Ye[29], tt = Ye[30], yt = Se[0] * Ze + Se[4] * Ae + Se[8] * tt + Se[12], ct = Se[1] * Ze + Se[5] * Ae + Se[9] * tt + Se[13], Ce = Se[2] * Ze + Se[6] * Ae + Se[10] * tt + Se[14], qe = Se[0] * Se[0] + Se[1] * Se[1] + Se[2] * Se[2], lt = Se[4] * Se[4] + Se[5] * Se[5] + Se[6] * Se[6], Je = Se[8] * Se[8] + Se[9] * Se[9] + Se[10] * Se[10], St = Ye[31] * Math.sqrt(Math.max(qe, lt, Je));
      if (I * yt + V * ct + oe * Ce + B < -St || J * yt + ee * ct + W * Ce + X < -St || ae * yt + de * ct + le * Ce + ie < -St || se * yt + ve * ct + U * Ce + Z < -St || xe * yt + be * ct + Le * Ce + Me < -St || Oe * yt + Pe * ct + _e * Ce + je < -St) continue;
      s[++p] = ke;
    }
    if ($e.light)
      if ($e.light.type === 1) {
        const Se = $e.transform.worldMatrix, Ye = Se[12], Ze = Se[13], Ae = Se[14], tt = Se[0] * Se[0] + Se[1] * Se[1] + Se[2] * Se[2], yt = Se[4] * Se[4] + Se[5] * Se[5] + Se[6] * Se[6], ct = Se[8] * Se[8] + Se[9] * Se[9] + Se[10] * Se[10], Ce = $e.light.range * Math.sqrt(Math.max(tt, yt, ct));
        if (I * Ye + V * Ze + oe * Ae + B < -Ce || J * Ye + ee * Ze + W * Ae + X < -Ce || ae * Ye + de * Ze + le * Ae + ie < -Ce || se * Ye + ve * Ze + U * Ae + Z < -Ce || xe * Ye + be * Ze + Le * Ae + Me < -Ce || Oe * Ye + Pe * Ze + _e * Ae + je < -Ce) continue;
        f[++m] = ke;
      } else
        f[++m] = ke;
  }
  s[0] = p, f[0] = m;
}
function $L(t, a, s) {
  const f = s, p = f[0], m = f[1], v = f[2], E = f[3], g = f[4], x = f[5], b = f[6], C = f[7], R = f[8], _ = f[9], k = f[10], O = f[11], z = f[12], F = f[13], Y = f[14], P = f[15];
  let N = 0;
  const H = t[0] + 1;
  for (let I = 1; I < H; I++) {
    const V = t[I], oe = a[V], B = oe.transform.worldMatrix, $ = oe.meshRenderer;
    if ($ && $.enabled && $.bounds) {
      const J = $.bounds;
      let ee = 63;
      for (let W = 0; W < 24; W += 3) {
        const X = J[W], ae = J[W + 1], de = J[W + 2], le = B[0] * X + B[4] * ae + B[8] * de + B[12], ie = B[1] * X + B[5] * ae + B[9] * de + B[13], se = B[2] * X + B[6] * ae + B[10] * de + B[14], ve = p * le + g * ie + R * se + z, U = m * le + x * ie + _ * se + F, Z = v * le + b * ie + k * se + Y, xe = E * le + C * ie + O * se + P;
        let be = 0;
        ve < -xe && (be |= 1), ve > xe && (be |= 2), U < -xe && (be |= 4), U > xe && (be |= 8), Z < -xe && (be |= 16), Z > xe && (be |= 32), ee &= be;
      }
      ee === 0 && (t[++N] = V);
    } else {
      const J = B[12], ee = B[13], W = B[14], X = p * J + g * ee + R * W + z, ae = m * J + x * ee + _ * W + F, de = v * J + b * ee + k * W + Y, le = E * J + C * ee + O * W + P;
      X >= -le && X <= le && ae >= -le && ae <= le && de >= -le && de <= le && (t[++N] = V);
    }
  }
  t[0] = N;
}
let Kc = 0, HL = 0;
function VL(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe, B, $, J, ee) {
  let W = 0, X = 0, ae = 0;
  for (let de = 0; de < f; de++) {
    const le = t[a + de], ie = s[le], se = ie.meshRenderer;
    if (se.constructor !== lr) continue;
    ++Kc;
    const ve = ie.transform.worldMatrix, U = se.depthBias || 0;
    fb(O, _, ve), fb(k, R, ve);
    const Z = O[0], xe = O[1], be = O[2], Le = O[3], Me = O[4], Oe = O[5], Pe = O[6], _e = O[7], je = O[8], Be = O[9], ke = O[10], $e = O[11], Se = O[12], Ye = O[13], Ze = O[14], Ae = O[15], tt = se.weldMap, yt = X;
    X += (se.vertices.length / 3 | 0) + 1, se.adjTri === null && se.updateAdjacency();
    const ct = se.adjTri, Ce = de + 1, qe = W, lt = se.faces, Je = se.vertices, St = se.faceNormals, et = se.vertexNormals;
    NL(z, ve);
    const Et = z, Ot = Et[0], $t = Et[1], we = Et[2], Ie = Et[3], it = Et[4], We = Et[5], Mt = Et[6], Ht = Et[7], Ct = Et[8], ht = lt.length;
    for (let Ne = 0; Ne < ht; Ne += 3) {
      const ft = lt[Ne], kt = lt[Ne + 1], Zt = lt[Ne + 2], nn = ft << 2, yn = kt << 2, Hn = Zt << 2;
      if (ee[ft] !== Kc) {
        const on = ft * 3, Ut = Je[on], an = Je[on + 1], un = Je[on + 2];
        m[nn] = Z * Ut + Me * an + je * un + Se, m[nn + 1] = xe * Ut + Oe * an + Be * un + Ye, m[nn + 2] = be * Ut + Pe * an + ke * un + Ze, m[nn + 3] = Le * Ut + _e * an + $e * un + Ae, ee[ft] = Kc, J[ft] = -1;
      }
      if (ee[kt] !== Kc) {
        const on = kt * 3, Ut = Je[on], an = Je[on + 1], un = Je[on + 2];
        m[yn] = Z * Ut + Me * an + je * un + Se, m[yn + 1] = xe * Ut + Oe * an + Be * un + Ye, m[yn + 2] = be * Ut + Pe * an + ke * un + Ze, m[yn + 3] = Le * Ut + _e * an + $e * un + Ae, ee[kt] = Kc, J[kt] = -1;
      }
      if (ee[Zt] !== Kc) {
        const on = Zt * 3, Ut = Je[on], an = Je[on + 1], un = Je[on + 2];
        m[Hn] = Z * Ut + Me * an + je * un + Se, m[Hn + 1] = xe * Ut + Oe * an + Be * un + Ye, m[Hn + 2] = be * Ut + Pe * an + ke * un + Ze, m[Hn + 3] = Le * Ut + _e * an + $e * un + Ae, ee[Zt] = Kc, J[Zt] = -1;
      }
      const Gn = m[nn], Pr = m[nn + 1], Cr = m[nn + 2], vr = m[nn + 3], Mi = m[yn], Tr = m[yn + 1], Ar = m[yn + 2], Vn = m[yn + 3], Ra = m[Hn], oa = m[Hn + 1], Ya = m[Hn + 2], zr = m[Hn + 3];
      if (Gn < -vr && Mi < -Vn && Ra < -zr || Gn > vr && Mi > Vn && Ra > zr || Pr < -vr && Tr < -Vn && oa < -zr || Pr > vr && Tr > Vn && oa > zr || Cr < -vr && Ar < -Vn && Ya < -zr || Cr > vr && Ar > Vn && Ya > zr) continue;
      const Q = 1 / vr, ze = 1 / Vn, nt = 1 / zr, dt = Gn * Q, Yt = Pr * Q, It = Mi * ze, tn = Tr * ze, Jt = Ra * nt, Qn = oa * nt;
      if ((It - dt) * (Qn - Yt) - (tn - Yt) * (Jt - dt) > 0) continue;
      const gn = ft * 3, xn = kt * 3, In = Zt * 3;
      v[W] = W, I[W] = de, V[W] = Ne;
      const Ma = Ne / 3 | 0;
      B[Ma] = W, $[Ma] = Ce;
      const sa = St[Ne], Wt = St[Ne + 1], Bt = St[Ne + 2], ua = sa * Ot + Wt * Ie + Bt * Mt, _i = sa * $t + Wt * it + Bt * Ht, ki = sa * we + Wt * We + Bt * Ct, Di = Math.sqrt(ua * ua + _i * _i + ki * ki), qi = Di > 0 ? 1 / Di : 0, ai = W * 3;
      if (g[ai] = se.colors[ft], g[ai + 1] = se.colors[kt], g[ai + 2] = se.colors[Zt], x[W] = se.shaderType, b[W] = 0, J[ft] === -1) {
        const on = ae * 3;
        O2(
          p,
          gn,
          Je[gn],
          Je[gn + 1],
          Je[gn + 2],
          k
        ), P[on] = dt, P[on + 1] = -Yt, J[ft] = on, ae++;
        const Ut = ft * 3, an = et[Ut] * Ot + et[Ut + 1] * Ie + et[Ut + 2] * Mt, un = et[Ut] * $t + et[Ut + 1] * it + et[Ut + 2] * Ht, Zn = et[Ut] * we + et[Ut + 1] * We + et[Ut + 2] * Ct, ca = Math.sqrt(an * an + un * un + Zn * Zn), Rr = ca > 0 ? 1 / ca : 0;
        Y[on] = an * Rr, Y[on + 1] = un * Rr, Y[on + 2] = Zn * Rr;
      }
      if (N[W * 3] = J[ft], H[W * 3] = yt + (tt ? tt[ft] : ft), J[kt] === -1) {
        const on = ae * 3;
        O2(
          p,
          xn,
          Je[xn],
          Je[xn + 1],
          Je[xn + 2],
          k
        ), P[on] = It, P[on + 1] = -tn, J[kt] = on, ae++;
        const Ut = kt * 3, an = et[Ut] * Ot + et[Ut + 1] * Ie + et[Ut + 2] * Mt, un = et[Ut] * $t + et[Ut + 1] * it + et[Ut + 2] * Ht, Zn = et[Ut] * we + et[Ut + 1] * We + et[Ut + 2] * Ct, ca = Math.sqrt(an * an + un * un + Zn * Zn), Rr = ca > 0 ? 1 / ca : 0;
        Y[on] = an * Rr, Y[on + 1] = un * Rr, Y[on + 2] = Zn * Rr;
      }
      if (N[W * 3 + 1] = J[kt], H[W * 3 + 1] = yt + (tt ? tt[kt] : kt), J[Zt] === -1) {
        const on = ae * 3;
        O2(
          p,
          In,
          Je[In],
          Je[In + 1],
          Je[In + 2],
          k
        ), P[on] = Jt, P[on + 1] = -Qn, J[Zt] = on, ae++;
        const Ut = Zt * 3, an = et[Ut] * Ot + et[Ut + 1] * Ie + et[Ut + 2] * Mt, un = et[Ut] * $t + et[Ut + 1] * it + et[Ut + 2] * Ht, Zn = et[Ut] * we + et[Ut + 1] * We + et[Ut + 2] * Ct, ca = Math.sqrt(an * an + un * un + Zn * Zn), Rr = ca > 0 ? 1 / ca : 0;
        Y[on] = an * Rr, Y[on + 1] = un * Rr, Y[on + 2] = Zn * Rr;
      }
      N[W * 3 + 2] = J[Zt], H[W * 3 + 2] = yt + (tt ? tt[Zt] : Zt);
      const Bn = W * 9;
      C[Bn] = p[gn], C[Bn + 1] = p[gn + 1];
      const $o = C[Bn + 2] = p[gn + 2];
      C[Bn + 3] = p[xn], C[Bn + 4] = p[xn + 1];
      const $r = C[Bn + 5] = p[xn + 2];
      C[Bn + 6] = p[In], C[Bn + 7] = p[In + 1];
      const zs = C[Bn + 8] = p[In + 2];
      E[W] = ($o + $r + zs) * 0.33333 + U;
      const Zl = W * 3;
      F[Zl] = ua * qi, F[Zl + 1] = _i * qi, F[Zl + 2] = ki * qi, W++;
    }
    for (let Ne = qe; Ne < W; Ne++) {
      const ft = V[Ne], kt = Ne * 3, Zt = ct[ft], nn = ct[ft + 1], yn = ct[ft + 2];
      oe[kt] = Zt < 0 ? Gd : $[Zt] === Ce ? B[Zt] : T2, oe[kt + 1] = nn < 0 ? Gd : $[nn] === Ce ? B[nn] : T2, oe[kt + 2] = yn < 0 ? Gd : $[yn] === Ce ? B[yn] : T2;
    }
  }
  return W;
}
function IL(t, a, s, f, p, m, v, E, g) {
  const x = v * 0.5, b = E * 0.5, C = m + p;
  t.clearRect(0, 0, t.canvas.width, t.canvas.height), g[Ds] = -1, t.beginPath(), g[Ds] !== C0 && (t.fillStyle = Sl[C0], t.strokeStyle = Sl[C0], g[Ds] = C0);
  for (let R = m; R < C; R++) {
    const _ = f[R], k = s[_ * 3], O = s[_ * 3 + 1], z = s[_ * 3 + 2], F = a[k] * x + x, Y = a[k + 1] * b + b, P = a[O] * x + x, N = a[O + 1] * b + b, H = a[z] * x + x, I = a[z + 1] * b + b;
    t.moveTo(F, Y), t.lineTo(P, N), t.lineTo(H, I), t.lineTo(F, Y);
  }
  t.stroke();
}
function qL(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe, B, $, J, ee, W, X) {
  const ae = t.canvas, de = ae.width, le = ae.height, ie = de * 0.5, se = le * 0.5, ve = g + E;
  if (x)
    if (C !== -1) {
      const U = C >>> 16, Z = C >>> 8 & 255, xe = C & 255, be = U & 248, Le = Z & 252, Me = xe & 248, Oe = be << 8 | Le << 3 | Me >> 3;
      t.fillStyle = Sl[Oe], t.fillRect(0, 0, de, le);
    } else
      t.clearRect(0, 0, de, le);
  p3(
    p,
    g,
    ve,
    I,
    V,
    H
  );
  for (let U = g; U < ve; U++) {
    const Z = p[U], xe = s[Z * 3], be = s[Z * 3 + 1], Le = s[Z * 3 + 2], Me = f[Z * 3], Oe = f[Z * 3 + 1], Pe = f[Z * 3 + 2], _e = a[xe] * ie + ie, je = a[xe + 1] * se + se, Be = a[be] * ie + ie, ke = a[be + 1] * se + se, $e = a[Le] * ie + ie, Se = a[Le + 1] * se + se, Ye = P[Z], Ze = J[oe[B + Ye]].meshRenderer, Ae = v[Z], tt = U === ve - 1 || v[p[U + 1]] !== Ae;
    switch (Ae) {
      case ep: {
        Nu(
          t,
          _e,
          je,
          Be,
          ke,
          $e,
          Se,
          b,
          m,
          Y,
          F,
          Me,
          Oe,
          Pe,
          Z,
          Ze,
          N[Z],
          z,
          $,
          J,
          R,
          _,
          k,
          O,
          Ye,
          ee,
          W,
          X,
          tt,
          H[Z]
        );
        break;
      }
      case tp: {
        S3(
          t,
          _e,
          je,
          Be,
          ke,
          $e,
          Se,
          b,
          m,
          Y,
          F,
          Me,
          Oe,
          Pe,
          Z,
          Ze,
          N[Z],
          z,
          $,
          J,
          R,
          _,
          k,
          O,
          Ye,
          ee,
          W,
          X,
          tt,
          H[Z]
        );
        break;
      }
      case Dh: {
        Nu(
          t,
          _e,
          je,
          Be,
          ke,
          $e,
          Se,
          b,
          m,
          Y,
          F,
          Me,
          Oe,
          Pe,
          Z,
          Ze,
          N[Z],
          z,
          $,
          J,
          R,
          _,
          k,
          O,
          Ye,
          ee,
          W,
          X,
          tt,
          H[Z]
        );
        break;
      }
      case Oh: {
        E3(
          t,
          _e,
          je,
          Be,
          ke,
          $e,
          Se,
          b,
          m,
          Y,
          F,
          Me,
          Oe,
          Pe,
          Z,
          Ze,
          N[Z],
          z,
          $,
          J,
          R,
          _,
          k,
          O,
          Ye,
          ee,
          W
        );
        break;
      }
      case np: {
        Nu(
          t,
          _e,
          je,
          Be,
          ke,
          $e,
          Se,
          b,
          m,
          Y,
          F,
          Me,
          Oe,
          Pe,
          Z,
          Ze,
          N[Z],
          z,
          $,
          J,
          R,
          _,
          k,
          O,
          Ye,
          ee,
          W,
          X,
          tt,
          H[Z]
        );
        break;
      }
      default: {
        const yt = nf[Ae];
        yt(
          t,
          _e,
          je,
          Be,
          ke,
          $e,
          Se,
          b,
          m,
          Y,
          F,
          Me,
          Oe,
          Pe,
          Z,
          Ze,
          N[Z],
          z,
          $,
          J,
          R,
          _,
          k,
          O,
          Ye,
          ee,
          W,
          X,
          tt
        );
        break;
      }
    }
  }
}
function YL(t, a, s, f, p, m, v, E, g, x, b, C, R, _, k, O, z, F, Y, P, N, H, I, V, oe, B, $, J, ee, W) {
  const X = t.canvas, ae = X.width, de = X.height;
  a && t.clearRect(0, 0, ae, de);
  const le = ae * 0.5, ie = de * 0.5, se = x + g;
  p3(
    m,
    x,
    se,
    H,
    I,
    N
  );
  for (let ve = x; ve < se; ve++) {
    const U = m[ve], Z = f[U * 3], xe = f[U * 3 + 1], be = f[U * 3 + 2], Le = p[U * 3], Me = p[U * 3 + 1], Oe = p[U * 3 + 2], Pe = s[Z] * le + le, _e = s[Z + 1] * ie + ie, je = s[xe] * le + le, Be = s[xe + 1] * ie + ie, ke = s[be] * le + le, $e = s[be + 1] * ie + ie, Se = Y[U], Ye = $[V[oe + Se]].meshRenderer, Ze = E[U], Ae = ve === se - 1 || E[m[ve + 1]] !== Ze;
    switch (Ze) {
      case ep: {
        w3(
          t,
          Pe,
          _e,
          je,
          Be,
          ke,
          $e,
          b,
          v,
          F,
          z,
          Le,
          Me,
          Oe,
          U,
          Ye,
          P[U],
          O,
          B,
          $,
          C,
          R,
          _,
          k,
          Se,
          J,
          ee,
          W,
          Ae,
          N[U]
        );
        break;
      }
      case tp: {
        Xd(
          t,
          Pe,
          _e,
          je,
          Be,
          ke,
          $e,
          b,
          v,
          F,
          z,
          Z,
          xe,
          be,
          U,
          Ye,
          P[U],
          O,
          B,
          $,
          C,
          R,
          _,
          k,
          Se,
          J,
          ee,
          W,
          Ae,
          N[U]
        );
        break;
      }
      case Dh: {
        r1(
          t,
          Pe,
          _e,
          je,
          Be,
          ke,
          $e,
          b,
          v,
          F,
          z,
          Le,
          Me,
          Oe,
          U,
          Ye,
          P[U],
          O,
          B,
          $,
          C,
          R,
          _,
          k,
          Se,
          J,
          ee
        );
        break;
      }
      case Oh: {
        x3(
          t,
          Pe,
          _e,
          je,
          Be,
          ke,
          $e,
          b,
          v,
          F,
          z,
          Le,
          Me,
          Oe,
          U,
          Ye,
          P[U],
          O,
          B,
          $,
          C,
          R,
          _,
          k,
          Se,
          J,
          ee
        );
        break;
      }
      case np: {
        Xd(
          t,
          Pe,
          _e,
          je,
          Be,
          ke,
          $e,
          b,
          v,
          F,
          z,
          Z,
          xe,
          be,
          U,
          Ye,
          P[U],
          O,
          B,
          $,
          C,
          R,
          _,
          k,
          Se,
          J,
          ee,
          W,
          Ae,
          N[U]
        );
        break;
      }
      default: {
        const tt = rf[Ze];
        tt(
          t,
          Pe,
          _e,
          je,
          Be,
          ke,
          $e,
          b,
          v,
          F,
          z,
          Le,
          Me,
          Oe,
          U,
          Ye,
          P[U],
          O,
          B,
          $,
          C,
          R,
          _,
          k,
          Se,
          J,
          ee,
          W,
          Ae
        );
        break;
      }
    }
  }
}
const db = Z0, k0 = !0;
function XC(t, a) {
  this.canvas = a || document.createElement("canvas"), this.canvas.style.filter = "url(#stripBlue)", this.context = this.canvas.getContext("2d", { alpha: k0 }), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new BC(), this.camera = t, this.scale = 1, this.layers = [], this.shadeLayers = [], this.fogLayers = [];
  for (var s = 0; s < Q0.layersCount; s++) {
    var f = document.createElement("canvas");
    this.layers[s] = f.getContext("2d", { alpha: k0 }), this.layers[s].imageSmoothingEnabled = !1, this.layers[s].webkitImageSmoothingEnabled = !1;
    var p = document.createElement("canvas");
    this.shadeLayers[s] = p.getContext("2d", { alpha: k0 }), this.shadeLayers[s].imageSmoothingEnabled = !1, this.shadeLayers[s].webkitImageSmoothingEnabled = !1;
    var m = document.createElement("canvas");
    this.fogLayers[s] = m.getContext("2d", { alpha: k0 }), this.fogLayers[s].imageSmoothingEnabled = !1, this.fogLayers[s].webkitImageSmoothingEnabled = !1;
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
  const b = this;
  this.startRenderLoop = function C() {
    requestAnimationFrame(() => {
      const R = performance.now(), _ = R - E;
      E = R, g++, R - x >= 500 && (b.lastRenderStats.fps = Math.round(
        g * 1e3 / (R - x)
      ), g = 0, x = R), b.lastRenderStats.frameTime = _, b.render(), requestAnimationFrame(C);
    });
  };
}
var la = XC.prototype;
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
    var E = this.fogLayers[p];
    E.canvas.width = Math.ceil(s / 1), E.canvas.height = Math.ceil(f / 1);
  }
  this.camera.setup(t, a);
};
la.getWorldToScreen = function() {
  return db(
    this.worldToScreenMatrix,
    this.viewportMatrix,
    this.camera.projectionMatrix
  ), db(
    this.worldToScreenMatrix,
    this.worldToScreenMatrix,
    this.camera.gameObject.transform.getWorldToLocal()
  ), this.worldToScreenMatrix;
};
Kd.Type = {
  DIRECTIONAL: 0,
  POINT: 1,
  SPOT: 2
};
function Uu() {
  $n.call(this);
}
Uu.prototype = Object.create($n.prototype);
Uu.prototype.constructor = Uu;
Uu.prototype.color = 16777215;
Uu.prototype.range = 10;
Uu.prototype.type = Kd.Type.DIRECTIONAL;
Uu.prototype.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.light = this;
};
function Kd(t) {
  ri.call(this, t || "light"), this.addComponent(this.light = new Uu());
}
Kd.prototype = Object.create(ri.prototype);
Kd.prototype.constructor = Kd;
var D0 = { exports: {} }, ph = {}, O0 = { exports: {} }, dn = {};
var pb;
function WL() {
  if (pb) return dn;
  pb = 1;
  var t = /* @__PURE__ */ Symbol.for("react.element"), a = /* @__PURE__ */ Symbol.for("react.portal"), s = /* @__PURE__ */ Symbol.for("react.fragment"), f = /* @__PURE__ */ Symbol.for("react.strict_mode"), p = /* @__PURE__ */ Symbol.for("react.profiler"), m = /* @__PURE__ */ Symbol.for("react.provider"), v = /* @__PURE__ */ Symbol.for("react.context"), E = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), x = /* @__PURE__ */ Symbol.for("react.memo"), b = /* @__PURE__ */ Symbol.for("react.lazy"), C = Symbol.iterator;
  function R(U) {
    return U === null || typeof U != "object" ? null : (U = C && U[C] || U["@@iterator"], typeof U == "function" ? U : null);
  }
  var _ = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, k = Object.assign, O = {};
  function z(U, Z, xe) {
    this.props = U, this.context = Z, this.refs = O, this.updater = xe || _;
  }
  z.prototype.isReactComponent = {}, z.prototype.setState = function(U, Z) {
    if (typeof U != "object" && typeof U != "function" && U != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, U, Z, "setState");
  }, z.prototype.forceUpdate = function(U) {
    this.updater.enqueueForceUpdate(this, U, "forceUpdate");
  };
  function F() {
  }
  F.prototype = z.prototype;
  function Y(U, Z, xe) {
    this.props = U, this.context = Z, this.refs = O, this.updater = xe || _;
  }
  var P = Y.prototype = new F();
  P.constructor = Y, k(P, z.prototype), P.isPureReactComponent = !0;
  var N = Array.isArray, H = Object.prototype.hasOwnProperty, I = { current: null }, V = { key: !0, ref: !0, __self: !0, __source: !0 };
  function oe(U, Z, xe) {
    var be, Le = {}, Me = null, Oe = null;
    if (Z != null) for (be in Z.ref !== void 0 && (Oe = Z.ref), Z.key !== void 0 && (Me = "" + Z.key), Z) H.call(Z, be) && !V.hasOwnProperty(be) && (Le[be] = Z[be]);
    var Pe = arguments.length - 2;
    if (Pe === 1) Le.children = xe;
    else if (1 < Pe) {
      for (var _e = Array(Pe), je = 0; je < Pe; je++) _e[je] = arguments[je + 2];
      Le.children = _e;
    }
    if (U && U.defaultProps) for (be in Pe = U.defaultProps, Pe) Le[be] === void 0 && (Le[be] = Pe[be]);
    return { $$typeof: t, type: U, key: Me, ref: Oe, props: Le, _owner: I.current };
  }
  function B(U, Z) {
    return { $$typeof: t, type: U.type, key: Z, ref: U.ref, props: U.props, _owner: U._owner };
  }
  function $(U) {
    return typeof U == "object" && U !== null && U.$$typeof === t;
  }
  function J(U) {
    var Z = { "=": "=0", ":": "=2" };
    return "$" + U.replace(/[=:]/g, function(xe) {
      return Z[xe];
    });
  }
  var ee = /\/+/g;
  function W(U, Z) {
    return typeof U == "object" && U !== null && U.key != null ? J("" + U.key) : Z.toString(36);
  }
  function X(U, Z, xe, be, Le) {
    var Me = typeof U;
    (Me === "undefined" || Me === "boolean") && (U = null);
    var Oe = !1;
    if (U === null) Oe = !0;
    else switch (Me) {
      case "string":
      case "number":
        Oe = !0;
        break;
      case "object":
        switch (U.$$typeof) {
          case t:
          case a:
            Oe = !0;
        }
    }
    if (Oe) return Oe = U, Le = Le(Oe), U = be === "" ? "." + W(Oe, 0) : be, N(Le) ? (xe = "", U != null && (xe = U.replace(ee, "$&/") + "/"), X(Le, Z, xe, "", function(je) {
      return je;
    })) : Le != null && ($(Le) && (Le = B(Le, xe + (!Le.key || Oe && Oe.key === Le.key ? "" : ("" + Le.key).replace(ee, "$&/") + "/") + U)), Z.push(Le)), 1;
    if (Oe = 0, be = be === "" ? "." : be + ":", N(U)) for (var Pe = 0; Pe < U.length; Pe++) {
      Me = U[Pe];
      var _e = be + W(Me, Pe);
      Oe += X(Me, Z, xe, _e, Le);
    }
    else if (_e = R(U), typeof _e == "function") for (U = _e.call(U), Pe = 0; !(Me = U.next()).done; ) Me = Me.value, _e = be + W(Me, Pe++), Oe += X(Me, Z, xe, _e, Le);
    else if (Me === "object") throw Z = String(U), Error("Objects are not valid as a React child (found: " + (Z === "[object Object]" ? "object with keys {" + Object.keys(U).join(", ") + "}" : Z) + "). If you meant to render a collection of children, use an array instead.");
    return Oe;
  }
  function ae(U, Z, xe) {
    if (U == null) return U;
    var be = [], Le = 0;
    return X(U, be, "", "", function(Me) {
      return Z.call(xe, Me, Le++);
    }), be;
  }
  function de(U) {
    if (U._status === -1) {
      var Z = U._result;
      Z = Z(), Z.then(function(xe) {
        (U._status === 0 || U._status === -1) && (U._status = 1, U._result = xe);
      }, function(xe) {
        (U._status === 0 || U._status === -1) && (U._status = 2, U._result = xe);
      }), U._status === -1 && (U._status = 0, U._result = Z);
    }
    if (U._status === 1) return U._result.default;
    throw U._result;
  }
  var le = { current: null }, ie = { transition: null }, se = { ReactCurrentDispatcher: le, ReactCurrentBatchConfig: ie, ReactCurrentOwner: I };
  function ve() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return dn.Children = { map: ae, forEach: function(U, Z, xe) {
    ae(U, function() {
      Z.apply(this, arguments);
    }, xe);
  }, count: function(U) {
    var Z = 0;
    return ae(U, function() {
      Z++;
    }), Z;
  }, toArray: function(U) {
    return ae(U, function(Z) {
      return Z;
    }) || [];
  }, only: function(U) {
    if (!$(U)) throw Error("React.Children.only expected to receive a single React element child.");
    return U;
  } }, dn.Component = z, dn.Fragment = s, dn.Profiler = p, dn.PureComponent = Y, dn.StrictMode = f, dn.Suspense = g, dn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = se, dn.act = ve, dn.cloneElement = function(U, Z, xe) {
    if (U == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + U + ".");
    var be = k({}, U.props), Le = U.key, Me = U.ref, Oe = U._owner;
    if (Z != null) {
      if (Z.ref !== void 0 && (Me = Z.ref, Oe = I.current), Z.key !== void 0 && (Le = "" + Z.key), U.type && U.type.defaultProps) var Pe = U.type.defaultProps;
      for (_e in Z) H.call(Z, _e) && !V.hasOwnProperty(_e) && (be[_e] = Z[_e] === void 0 && Pe !== void 0 ? Pe[_e] : Z[_e]);
    }
    var _e = arguments.length - 2;
    if (_e === 1) be.children = xe;
    else if (1 < _e) {
      Pe = Array(_e);
      for (var je = 0; je < _e; je++) Pe[je] = arguments[je + 2];
      be.children = Pe;
    }
    return { $$typeof: t, type: U.type, key: Le, ref: Me, props: be, _owner: Oe };
  }, dn.createContext = function(U) {
    return U = { $$typeof: v, _currentValue: U, _currentValue2: U, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, U.Provider = { $$typeof: m, _context: U }, U.Consumer = U;
  }, dn.createElement = oe, dn.createFactory = function(U) {
    var Z = oe.bind(null, U);
    return Z.type = U, Z;
  }, dn.createRef = function() {
    return { current: null };
  }, dn.forwardRef = function(U) {
    return { $$typeof: E, render: U };
  }, dn.isValidElement = $, dn.lazy = function(U) {
    return { $$typeof: b, _payload: { _status: -1, _result: U }, _init: de };
  }, dn.memo = function(U, Z) {
    return { $$typeof: x, type: U, compare: Z === void 0 ? null : Z };
  }, dn.startTransition = function(U) {
    var Z = ie.transition;
    ie.transition = {};
    try {
      U();
    } finally {
      ie.transition = Z;
    }
  }, dn.unstable_act = ve, dn.useCallback = function(U, Z) {
    return le.current.useCallback(U, Z);
  }, dn.useContext = function(U) {
    return le.current.useContext(U);
  }, dn.useDebugValue = function() {
  }, dn.useDeferredValue = function(U) {
    return le.current.useDeferredValue(U);
  }, dn.useEffect = function(U, Z) {
    return le.current.useEffect(U, Z);
  }, dn.useId = function() {
    return le.current.useId();
  }, dn.useImperativeHandle = function(U, Z, xe) {
    return le.current.useImperativeHandle(U, Z, xe);
  }, dn.useInsertionEffect = function(U, Z) {
    return le.current.useInsertionEffect(U, Z);
  }, dn.useLayoutEffect = function(U, Z) {
    return le.current.useLayoutEffect(U, Z);
  }, dn.useMemo = function(U, Z) {
    return le.current.useMemo(U, Z);
  }, dn.useReducer = function(U, Z, xe) {
    return le.current.useReducer(U, Z, xe);
  }, dn.useRef = function(U) {
    return le.current.useRef(U);
  }, dn.useState = function(U) {
    return le.current.useState(U);
  }, dn.useSyncExternalStore = function(U, Z, xe) {
    return le.current.useSyncExternalStore(U, Z, xe);
  }, dn.useTransition = function() {
    return le.current.useTransition();
  }, dn.version = "18.3.1", dn;
}
var gh = { exports: {} };
gh.exports;
var vb;
function GL() {
  return vb || (vb = 1, (function(t, a) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var s = "18.3.1", f = /* @__PURE__ */ Symbol.for("react.element"), p = /* @__PURE__ */ Symbol.for("react.portal"), m = /* @__PURE__ */ Symbol.for("react.fragment"), v = /* @__PURE__ */ Symbol.for("react.strict_mode"), E = /* @__PURE__ */ Symbol.for("react.profiler"), g = /* @__PURE__ */ Symbol.for("react.provider"), x = /* @__PURE__ */ Symbol.for("react.context"), b = /* @__PURE__ */ Symbol.for("react.forward_ref"), C = /* @__PURE__ */ Symbol.for("react.suspense"), R = /* @__PURE__ */ Symbol.for("react.suspense_list"), _ = /* @__PURE__ */ Symbol.for("react.memo"), k = /* @__PURE__ */ Symbol.for("react.lazy"), O = /* @__PURE__ */ Symbol.for("react.offscreen"), z = Symbol.iterator, F = "@@iterator";
      function Y(D) {
        if (D === null || typeof D != "object")
          return null;
        var G = z && D[z] || D[F];
        return typeof G == "function" ? G : null;
      }
      var P = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, N = {
        transition: null
      }, H = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, I = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, V = {}, oe = null;
      function B(D) {
        oe = D;
      }
      V.setExtraStackFrame = function(D) {
        oe = D;
      }, V.getCurrentStack = null, V.getStackAddendum = function() {
        var D = "";
        oe && (D += oe);
        var G = V.getCurrentStack;
        return G && (D += G() || ""), D;
      };
      var $ = !1, J = !1, ee = !1, W = !1, X = !1, ae = {
        ReactCurrentDispatcher: P,
        ReactCurrentBatchConfig: N,
        ReactCurrentOwner: I
      };
      ae.ReactDebugCurrentFrame = V, ae.ReactCurrentActQueue = H;
      function de(D) {
        {
          for (var G = arguments.length, me = new Array(G > 1 ? G - 1 : 0), Ee = 1; Ee < G; Ee++)
            me[Ee - 1] = arguments[Ee];
          ie("warn", D, me);
        }
      }
      function le(D) {
        {
          for (var G = arguments.length, me = new Array(G > 1 ? G - 1 : 0), Ee = 1; Ee < G; Ee++)
            me[Ee - 1] = arguments[Ee];
          ie("error", D, me);
        }
      }
      function ie(D, G, me) {
        {
          var Ee = ae.ReactDebugCurrentFrame, Ke = Ee.getStackAddendum();
          Ke !== "" && (G += "%s", me = me.concat([Ke]));
          var Lt = me.map(function(at) {
            return String(at);
          });
          Lt.unshift("Warning: " + G), Function.prototype.apply.call(console[D], console, Lt);
        }
      }
      var se = {};
      function ve(D, G) {
        {
          var me = D.constructor, Ee = me && (me.displayName || me.name) || "ReactClass", Ke = Ee + "." + G;
          if (se[Ke])
            return;
          le("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", G, Ee), se[Ke] = !0;
        }
      }
      var U = {
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
        enqueueForceUpdate: function(D, G, me) {
          ve(D, "forceUpdate");
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
        enqueueReplaceState: function(D, G, me, Ee) {
          ve(D, "replaceState");
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
        enqueueSetState: function(D, G, me, Ee) {
          ve(D, "setState");
        }
      }, Z = Object.assign, xe = {};
      Object.freeze(xe);
      function be(D, G, me) {
        this.props = D, this.context = G, this.refs = xe, this.updater = me || U;
      }
      be.prototype.isReactComponent = {}, be.prototype.setState = function(D, G) {
        if (typeof D != "object" && typeof D != "function" && D != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, D, G, "setState");
      }, be.prototype.forceUpdate = function(D) {
        this.updater.enqueueForceUpdate(this, D, "forceUpdate");
      };
      {
        var Le = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, Me = function(D, G) {
          Object.defineProperty(be.prototype, D, {
            get: function() {
              de("%s(...) is deprecated in plain JavaScript React classes. %s", G[0], G[1]);
            }
          });
        };
        for (var Oe in Le)
          Le.hasOwnProperty(Oe) && Me(Oe, Le[Oe]);
      }
      function Pe() {
      }
      Pe.prototype = be.prototype;
      function _e(D, G, me) {
        this.props = D, this.context = G, this.refs = xe, this.updater = me || U;
      }
      var je = _e.prototype = new Pe();
      je.constructor = _e, Z(je, be.prototype), je.isPureReactComponent = !0;
      function Be() {
        var D = {
          current: null
        };
        return Object.seal(D), D;
      }
      var ke = Array.isArray;
      function $e(D) {
        return ke(D);
      }
      function Se(D) {
        {
          var G = typeof Symbol == "function" && Symbol.toStringTag, me = G && D[Symbol.toStringTag] || D.constructor.name || "Object";
          return me;
        }
      }
      function Ye(D) {
        try {
          return Ze(D), !1;
        } catch {
          return !0;
        }
      }
      function Ze(D) {
        return "" + D;
      }
      function Ae(D) {
        if (Ye(D))
          return le("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Se(D)), Ze(D);
      }
      function tt(D, G, me) {
        var Ee = D.displayName;
        if (Ee)
          return Ee;
        var Ke = G.displayName || G.name || "";
        return Ke !== "" ? me + "(" + Ke + ")" : me;
      }
      function yt(D) {
        return D.displayName || "Context";
      }
      function ct(D) {
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
          case C:
            return "Suspense";
          case R:
            return "SuspenseList";
        }
        if (typeof D == "object")
          switch (D.$$typeof) {
            case x:
              var G = D;
              return yt(G) + ".Consumer";
            case g:
              var me = D;
              return yt(me._context) + ".Provider";
            case b:
              return tt(D, D.render, "ForwardRef");
            case _:
              var Ee = D.displayName || null;
              return Ee !== null ? Ee : ct(D.type) || "Memo";
            case k: {
              var Ke = D, Lt = Ke._payload, at = Ke._init;
              try {
                return ct(at(Lt));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Ce = Object.prototype.hasOwnProperty, qe = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, lt, Je, St;
      St = {};
      function et(D) {
        if (Ce.call(D, "ref")) {
          var G = Object.getOwnPropertyDescriptor(D, "ref").get;
          if (G && G.isReactWarning)
            return !1;
        }
        return D.ref !== void 0;
      }
      function Et(D) {
        if (Ce.call(D, "key")) {
          var G = Object.getOwnPropertyDescriptor(D, "key").get;
          if (G && G.isReactWarning)
            return !1;
        }
        return D.key !== void 0;
      }
      function Ot(D, G) {
        var me = function() {
          lt || (lt = !0, le("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
        };
        me.isReactWarning = !0, Object.defineProperty(D, "key", {
          get: me,
          configurable: !0
        });
      }
      function $t(D, G) {
        var me = function() {
          Je || (Je = !0, le("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
        };
        me.isReactWarning = !0, Object.defineProperty(D, "ref", {
          get: me,
          configurable: !0
        });
      }
      function we(D) {
        if (typeof D.ref == "string" && I.current && D.__self && I.current.stateNode !== D.__self) {
          var G = ct(I.current.type);
          St[G] || (le('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', G, D.ref), St[G] = !0);
        }
      }
      var Ie = function(D, G, me, Ee, Ke, Lt, at) {
        var Ft = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: f,
          // Built-in properties that belong on the element
          type: D,
          key: G,
          ref: me,
          props: at,
          // Record the component responsible for creating this element.
          _owner: Lt
        };
        return Ft._store = {}, Object.defineProperty(Ft._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(Ft, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Ee
        }), Object.defineProperty(Ft, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Ke
        }), Object.freeze && (Object.freeze(Ft.props), Object.freeze(Ft)), Ft;
      };
      function it(D, G, me) {
        var Ee, Ke = {}, Lt = null, at = null, Ft = null, sn = null;
        if (G != null) {
          et(G) && (at = G.ref, we(G)), Et(G) && (Ae(G.key), Lt = "" + G.key), Ft = G.__self === void 0 ? null : G.__self, sn = G.__source === void 0 ? null : G.__source;
          for (Ee in G)
            Ce.call(G, Ee) && !qe.hasOwnProperty(Ee) && (Ke[Ee] = G[Ee]);
        }
        var En = arguments.length - 2;
        if (En === 1)
          Ke.children = me;
        else if (En > 1) {
          for (var Fn = Array(En), An = 0; An < En; An++)
            Fn[An] = arguments[An + 2];
          Object.freeze && Object.freeze(Fn), Ke.children = Fn;
        }
        if (D && D.defaultProps) {
          var rn = D.defaultProps;
          for (Ee in rn)
            Ke[Ee] === void 0 && (Ke[Ee] = rn[Ee]);
        }
        if (Lt || at) {
          var zn = typeof D == "function" ? D.displayName || D.name || "Unknown" : D;
          Lt && Ot(Ke, zn), at && $t(Ke, zn);
        }
        return Ie(D, Lt, at, Ft, sn, I.current, Ke);
      }
      function We(D, G) {
        var me = Ie(D.type, G, D.ref, D._self, D._source, D._owner, D.props);
        return me;
      }
      function Mt(D, G, me) {
        if (D == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + D + ".");
        var Ee, Ke = Z({}, D.props), Lt = D.key, at = D.ref, Ft = D._self, sn = D._source, En = D._owner;
        if (G != null) {
          et(G) && (at = G.ref, En = I.current), Et(G) && (Ae(G.key), Lt = "" + G.key);
          var Fn;
          D.type && D.type.defaultProps && (Fn = D.type.defaultProps);
          for (Ee in G)
            Ce.call(G, Ee) && !qe.hasOwnProperty(Ee) && (G[Ee] === void 0 && Fn !== void 0 ? Ke[Ee] = Fn[Ee] : Ke[Ee] = G[Ee]);
        }
        var An = arguments.length - 2;
        if (An === 1)
          Ke.children = me;
        else if (An > 1) {
          for (var rn = Array(An), zn = 0; zn < An; zn++)
            rn[zn] = arguments[zn + 2];
          Ke.children = rn;
        }
        return Ie(D.type, Lt, at, Ft, sn, En, Ke);
      }
      function Ht(D) {
        return typeof D == "object" && D !== null && D.$$typeof === f;
      }
      var Ct = ".", ht = ":";
      function Ne(D) {
        var G = /[=:]/g, me = {
          "=": "=0",
          ":": "=2"
        }, Ee = D.replace(G, function(Ke) {
          return me[Ke];
        });
        return "$" + Ee;
      }
      var ft = !1, kt = /\/+/g;
      function Zt(D) {
        return D.replace(kt, "$&/");
      }
      function nn(D, G) {
        return typeof D == "object" && D !== null && D.key != null ? (Ae(D.key), Ne("" + D.key)) : G.toString(36);
      }
      function yn(D, G, me, Ee, Ke) {
        var Lt = typeof D;
        (Lt === "undefined" || Lt === "boolean") && (D = null);
        var at = !1;
        if (D === null)
          at = !0;
        else
          switch (Lt) {
            case "string":
            case "number":
              at = !0;
              break;
            case "object":
              switch (D.$$typeof) {
                case f:
                case p:
                  at = !0;
              }
          }
        if (at) {
          var Ft = D, sn = Ke(Ft), En = Ee === "" ? Ct + nn(Ft, 0) : Ee;
          if ($e(sn)) {
            var Fn = "";
            En != null && (Fn = Zt(En) + "/"), yn(sn, G, Fn, "", function(lp) {
              return lp;
            });
          } else sn != null && (Ht(sn) && (sn.key && (!Ft || Ft.key !== sn.key) && Ae(sn.key), sn = We(
            sn,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            me + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (sn.key && (!Ft || Ft.key !== sn.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              Zt("" + sn.key) + "/"
            ) : "") + En
          )), G.push(sn));
          return 1;
        }
        var An, rn, zn = 0, Jn = Ee === "" ? Ct : Ee + ht;
        if ($e(D))
          for (var ro = 0; ro < D.length; ro++)
            An = D[ro], rn = Jn + nn(An, ro), zn += yn(An, G, me, rn, Ke);
        else {
          var $u = Y(D);
          if (typeof $u == "function") {
            var bl = D;
            $u === bl.entries && (ft || de("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), ft = !0);
            for (var Hu = $u.call(bl), qo, ip = 0; !(qo = Hu.next()).done; )
              An = qo.value, rn = Jn + nn(An, ip++), zn += yn(An, G, me, rn, Ke);
          } else if (Lt === "object") {
            var af = String(D);
            throw new Error("Objects are not valid as a React child (found: " + (af === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : af) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return zn;
      }
      function Hn(D, G, me) {
        if (D == null)
          return D;
        var Ee = [], Ke = 0;
        return yn(D, Ee, "", "", function(Lt) {
          return G.call(me, Lt, Ke++);
        }), Ee;
      }
      function Gn(D) {
        var G = 0;
        return Hn(D, function() {
          G++;
        }), G;
      }
      function Pr(D, G, me) {
        Hn(D, function() {
          G.apply(this, arguments);
        }, me);
      }
      function Cr(D) {
        return Hn(D, function(G) {
          return G;
        }) || [];
      }
      function vr(D) {
        if (!Ht(D))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return D;
      }
      function Mi(D) {
        var G = {
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
        G.Provider = {
          $$typeof: g,
          _context: G
        };
        var me = !1, Ee = !1, Ke = !1;
        {
          var Lt = {
            $$typeof: x,
            _context: G
          };
          Object.defineProperties(Lt, {
            Provider: {
              get: function() {
                return Ee || (Ee = !0, le("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), G.Provider;
              },
              set: function(at) {
                G.Provider = at;
              }
            },
            _currentValue: {
              get: function() {
                return G._currentValue;
              },
              set: function(at) {
                G._currentValue = at;
              }
            },
            _currentValue2: {
              get: function() {
                return G._currentValue2;
              },
              set: function(at) {
                G._currentValue2 = at;
              }
            },
            _threadCount: {
              get: function() {
                return G._threadCount;
              },
              set: function(at) {
                G._threadCount = at;
              }
            },
            Consumer: {
              get: function() {
                return me || (me = !0, le("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), G.Consumer;
              }
            },
            displayName: {
              get: function() {
                return G.displayName;
              },
              set: function(at) {
                Ke || (de("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", at), Ke = !0);
              }
            }
          }), G.Consumer = Lt;
        }
        return G._currentRenderer = null, G._currentRenderer2 = null, G;
      }
      var Tr = -1, Ar = 0, Vn = 1, Ra = 2;
      function oa(D) {
        if (D._status === Tr) {
          var G = D._result, me = G();
          if (me.then(function(Lt) {
            if (D._status === Ar || D._status === Tr) {
              var at = D;
              at._status = Vn, at._result = Lt;
            }
          }, function(Lt) {
            if (D._status === Ar || D._status === Tr) {
              var at = D;
              at._status = Ra, at._result = Lt;
            }
          }), D._status === Tr) {
            var Ee = D;
            Ee._status = Ar, Ee._result = me;
          }
        }
        if (D._status === Vn) {
          var Ke = D._result;
          return Ke === void 0 && le(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, Ke), "default" in Ke || le(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, Ke), Ke.default;
        } else
          throw D._result;
      }
      function Ya(D) {
        var G = {
          // We use these fields to store the result.
          _status: Tr,
          _result: D
        }, me = {
          $$typeof: k,
          _payload: G,
          _init: oa
        };
        {
          var Ee, Ke;
          Object.defineProperties(me, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return Ee;
              },
              set: function(Lt) {
                le("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Ee = Lt, Object.defineProperty(me, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return Ke;
              },
              set: function(Lt) {
                le("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Ke = Lt, Object.defineProperty(me, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return me;
      }
      function zr(D) {
        D != null && D.$$typeof === _ ? le("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof D != "function" ? le("forwardRef requires a render function but was given %s.", D === null ? "null" : typeof D) : D.length !== 0 && D.length !== 2 && le("forwardRef render functions accept exactly two parameters: props and ref. %s", D.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), D != null && (D.defaultProps != null || D.propTypes != null) && le("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var G = {
          $$typeof: b,
          render: D
        };
        {
          var me;
          Object.defineProperty(G, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return me;
            },
            set: function(Ee) {
              me = Ee, !D.name && !D.displayName && (D.displayName = Ee);
            }
          });
        }
        return G;
      }
      var Q;
      Q = /* @__PURE__ */ Symbol.for("react.module.reference");
      function ze(D) {
        return !!(typeof D == "string" || typeof D == "function" || D === m || D === E || X || D === v || D === C || D === R || W || D === O || $ || J || ee || typeof D == "object" && D !== null && (D.$$typeof === k || D.$$typeof === _ || D.$$typeof === g || D.$$typeof === x || D.$$typeof === b || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        D.$$typeof === Q || D.getModuleId !== void 0));
      }
      function nt(D, G) {
        ze(D) || le("memo: The first argument must be a component. Instead received: %s", D === null ? "null" : typeof D);
        var me = {
          $$typeof: _,
          type: D,
          compare: G === void 0 ? null : G
        };
        {
          var Ee;
          Object.defineProperty(me, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return Ee;
            },
            set: function(Ke) {
              Ee = Ke, !D.name && !D.displayName && (D.displayName = Ke);
            }
          });
        }
        return me;
      }
      function dt() {
        var D = P.current;
        return D === null && le(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), D;
      }
      function Yt(D) {
        var G = dt();
        if (D._context !== void 0) {
          var me = D._context;
          me.Consumer === D ? le("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : me.Provider === D && le("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return G.useContext(D);
      }
      function It(D) {
        var G = dt();
        return G.useState(D);
      }
      function tn(D, G, me) {
        var Ee = dt();
        return Ee.useReducer(D, G, me);
      }
      function Jt(D) {
        var G = dt();
        return G.useRef(D);
      }
      function Qn(D, G) {
        var me = dt();
        return me.useEffect(D, G);
      }
      function gn(D, G) {
        var me = dt();
        return me.useInsertionEffect(D, G);
      }
      function xn(D, G) {
        var me = dt();
        return me.useLayoutEffect(D, G);
      }
      function In(D, G) {
        var me = dt();
        return me.useCallback(D, G);
      }
      function Ma(D, G) {
        var me = dt();
        return me.useMemo(D, G);
      }
      function sa(D, G, me) {
        var Ee = dt();
        return Ee.useImperativeHandle(D, G, me);
      }
      function Wt(D, G) {
        {
          var me = dt();
          return me.useDebugValue(D, G);
        }
      }
      function Bt() {
        var D = dt();
        return D.useTransition();
      }
      function ua(D) {
        var G = dt();
        return G.useDeferredValue(D);
      }
      function _i() {
        var D = dt();
        return D.useId();
      }
      function ki(D, G, me) {
        var Ee = dt();
        return Ee.useSyncExternalStore(D, G, me);
      }
      var Di = 0, qi, ai, Bn, $o, $r, zs, Zl;
      function on() {
      }
      on.__reactDisabledLog = !0;
      function Ut() {
        {
          if (Di === 0) {
            qi = console.log, ai = console.info, Bn = console.warn, $o = console.error, $r = console.group, zs = console.groupCollapsed, Zl = console.groupEnd;
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
                value: Bn
              }),
              error: Z({}, D, {
                value: $o
              }),
              group: Z({}, D, {
                value: $r
              }),
              groupCollapsed: Z({}, D, {
                value: zs
              }),
              groupEnd: Z({}, D, {
                value: Zl
              })
            });
          }
          Di < 0 && le("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var un = ae.ReactCurrentDispatcher, Zn;
      function ca(D, G, me) {
        {
          if (Zn === void 0)
            try {
              throw Error();
            } catch (Ke) {
              var Ee = Ke.stack.trim().match(/\n( *(at )?)/);
              Zn = Ee && Ee[1] || "";
            }
          return `
` + Zn + D;
        }
      }
      var Rr = !1, Jl;
      {
        var Ls = typeof WeakMap == "function" ? WeakMap : Map;
        Jl = new Ls();
      }
      function Ns(D, G) {
        if (!D || Rr)
          return "";
        {
          var me = Jl.get(D);
          if (me !== void 0)
            return me;
        }
        var Ee;
        Rr = !0;
        var Ke = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Lt;
        Lt = un.current, un.current = null, Ut();
        try {
          if (G) {
            var at = function() {
              throw Error();
            };
            if (Object.defineProperty(at.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(at, []);
              } catch (Jn) {
                Ee = Jn;
              }
              Reflect.construct(D, [], at);
            } else {
              try {
                at.call();
              } catch (Jn) {
                Ee = Jn;
              }
              D.call(at.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Jn) {
              Ee = Jn;
            }
            D();
          }
        } catch (Jn) {
          if (Jn && Ee && typeof Jn.stack == "string") {
            for (var Ft = Jn.stack.split(`
`), sn = Ee.stack.split(`
`), En = Ft.length - 1, Fn = sn.length - 1; En >= 1 && Fn >= 0 && Ft[En] !== sn[Fn]; )
              Fn--;
            for (; En >= 1 && Fn >= 0; En--, Fn--)
              if (Ft[En] !== sn[Fn]) {
                if (En !== 1 || Fn !== 1)
                  do
                    if (En--, Fn--, Fn < 0 || Ft[En] !== sn[Fn]) {
                      var An = `
` + Ft[En].replace(" at new ", " at ");
                      return D.displayName && An.includes("<anonymous>") && (An = An.replace("<anonymous>", D.displayName)), typeof D == "function" && Jl.set(D, An), An;
                    }
                  while (En >= 1 && Fn >= 0);
                break;
              }
          }
        } finally {
          Rr = !1, un.current = Lt, an(), Error.prepareStackTrace = Ke;
        }
        var rn = D ? D.displayName || D.name : "", zn = rn ? ca(rn) : "";
        return typeof D == "function" && Jl.set(D, zn), zn;
      }
      function xl(D, G, me) {
        return Ns(D, !1);
      }
      function rp(D) {
        var G = D.prototype;
        return !!(G && G.isReactComponent);
      }
      function wl(D, G, me) {
        if (D == null)
          return "";
        if (typeof D == "function")
          return Ns(D, rp(D));
        if (typeof D == "string")
          return ca(D);
        switch (D) {
          case C:
            return ca("Suspense");
          case R:
            return ca("SuspenseList");
        }
        if (typeof D == "object")
          switch (D.$$typeof) {
            case b:
              return xl(D.render);
            case _:
              return wl(D.type, G, me);
            case k: {
              var Ee = D, Ke = Ee._payload, Lt = Ee._init;
              try {
                return wl(Lt(Ke), G, me);
              } catch {
              }
            }
          }
        return "";
      }
      var bn = {}, Us = ae.ReactDebugCurrentFrame;
      function Sn(D) {
        if (D) {
          var G = D._owner, me = wl(D.type, D._source, G ? G.type : null);
          Us.setExtraStackFrame(me);
        } else
          Us.setExtraStackFrame(null);
      }
      function ju(D, G, me, Ee, Ke) {
        {
          var Lt = Function.call.bind(Ce);
          for (var at in D)
            if (Lt(D, at)) {
              var Ft = void 0;
              try {
                if (typeof D[at] != "function") {
                  var sn = Error((Ee || "React class") + ": " + me + " type `" + at + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof D[at] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw sn.name = "Invariant Violation", sn;
                }
                Ft = D[at](G, at, Ee, me, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (En) {
                Ft = En;
              }
              Ft && !(Ft instanceof Error) && (Sn(Ke), le("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ee || "React class", me, at, typeof Ft), Sn(null)), Ft instanceof Error && !(Ft.message in bn) && (bn[Ft.message] = !0, Sn(Ke), le("Failed %s type: %s", me, Ft.message), Sn(null));
            }
        }
      }
      function Yi(D) {
        if (D) {
          var G = D._owner, me = wl(D.type, D._source, G ? G.type : null);
          B(me);
        } else
          B(null);
      }
      var Qt;
      Qt = !1;
      function js() {
        if (I.current) {
          var D = ct(I.current.type);
          if (D)
            return `

Check the render method of \`` + D + "`.";
        }
        return "";
      }
      function Hr(D) {
        if (D !== void 0) {
          var G = D.fileName.replace(/^.*[\\\/]/, ""), me = D.lineNumber;
          return `

Check your code at ` + G + ":" + me + ".";
        }
        return "";
      }
      function Wi(D) {
        return D != null ? Hr(D.__source) : "";
      }
      var fa = {};
      function Gi(D) {
        var G = js();
        if (!G) {
          var me = typeof D == "string" ? D : D.displayName || D.name;
          me && (G = `

Check the top-level render call using <` + me + ">.");
        }
        return G;
      }
      function qn(D, G) {
        if (!(!D._store || D._store.validated || D.key != null)) {
          D._store.validated = !0;
          var me = Gi(G);
          if (!fa[me]) {
            fa[me] = !0;
            var Ee = "";
            D && D._owner && D._owner !== I.current && (Ee = " It was passed a child from " + ct(D._owner.type) + "."), Yi(D), le('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', me, Ee), Yi(null);
          }
        }
      }
      function On(D, G) {
        if (typeof D == "object") {
          if ($e(D))
            for (var me = 0; me < D.length; me++) {
              var Ee = D[me];
              Ht(Ee) && qn(Ee, G);
            }
          else if (Ht(D))
            D._store && (D._store.validated = !0);
          else if (D) {
            var Ke = Y(D);
            if (typeof Ke == "function" && Ke !== D.entries)
              for (var Lt = Ke.call(D), at; !(at = Lt.next()).done; )
                Ht(at.value) && qn(at.value, G);
          }
        }
      }
      function eo(D) {
        {
          var G = D.type;
          if (G == null || typeof G == "string")
            return;
          var me;
          if (typeof G == "function")
            me = G.propTypes;
          else if (typeof G == "object" && (G.$$typeof === b || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          G.$$typeof === _))
            me = G.propTypes;
          else
            return;
          if (me) {
            var Ee = ct(G);
            ju(me, D.props, "prop", Ee, D);
          } else if (G.PropTypes !== void 0 && !Qt) {
            Qt = !0;
            var Ke = ct(G);
            le("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ke || "Unknown");
          }
          typeof G.getDefaultProps == "function" && !G.getDefaultProps.isReactClassApproved && le("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Mr(D) {
        {
          for (var G = Object.keys(D.props), me = 0; me < G.length; me++) {
            var Ee = G[me];
            if (Ee !== "children" && Ee !== "key") {
              Yi(D), le("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ee), Yi(null);
              break;
            }
          }
          D.ref !== null && (Yi(D), le("Invalid attribute `ref` supplied to `React.Fragment`."), Yi(null));
        }
      }
      function da(D, G, me) {
        var Ee = ze(D);
        if (!Ee) {
          var Ke = "";
          (D === void 0 || typeof D == "object" && D !== null && Object.keys(D).length === 0) && (Ke += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Lt = Wi(G);
          Lt ? Ke += Lt : Ke += js();
          var at;
          D === null ? at = "null" : $e(D) ? at = "array" : D !== void 0 && D.$$typeof === f ? (at = "<" + (ct(D.type) || "Unknown") + " />", Ke = " Did you accidentally export a JSX literal instead of a component?") : at = typeof D, le("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", at, Ke);
        }
        var Ft = it.apply(this, arguments);
        if (Ft == null)
          return Ft;
        if (Ee)
          for (var sn = 2; sn < arguments.length; sn++)
            On(arguments[sn], D);
        return D === m ? Mr(Ft) : eo(Ft), Ft;
      }
      var ii = !1;
      function Ho(D) {
        var G = da.bind(null, D);
        return G.type = D, ii || (ii = !0, de("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(G, "type", {
          enumerable: !1,
          get: function() {
            return de("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: D
            }), D;
          }
        }), G;
      }
      function Fu(D, G, me) {
        for (var Ee = Mt.apply(this, arguments), Ke = 2; Ke < arguments.length; Ke++)
          On(arguments[Ke], Ee.type);
        return eo(Ee), Ee;
      }
      function Pu(D, G) {
        var me = N.transition;
        N.transition = {};
        var Ee = N.transition;
        N.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          D();
        } finally {
          if (N.transition = me, me === null && Ee._updatedFibers) {
            var Ke = Ee._updatedFibers.size;
            Ke > 10 && de("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), Ee._updatedFibers.clear();
          }
        }
      }
      var to = !1, Vo = null;
      function ap(D) {
        if (Vo === null)
          try {
            var G = ("require" + Math.random()).slice(0, 7), me = t && t[G];
            Vo = me.call(t, "timers").setImmediate;
          } catch {
            Vo = function(Ke) {
              to === !1 && (to = !0, typeof MessageChannel > "u" && le("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Lt = new MessageChannel();
              Lt.port1.onmessage = Ke, Lt.port2.postMessage(void 0);
            };
          }
        return Vo(D);
      }
      var li = 0, Oi = !1;
      function Qi(D) {
        {
          var G = li;
          li++, H.current === null && (H.current = []);
          var me = H.isBatchingLegacy, Ee;
          try {
            if (H.isBatchingLegacy = !0, Ee = D(), !me && H.didScheduleLegacyUpdate) {
              var Ke = H.current;
              Ke !== null && (H.didScheduleLegacyUpdate = !1, no(Ke));
            }
          } catch (rn) {
            throw oi(G), rn;
          } finally {
            H.isBatchingLegacy = me;
          }
          if (Ee !== null && typeof Ee == "object" && typeof Ee.then == "function") {
            var Lt = Ee, at = !1, Ft = {
              then: function(rn, zn) {
                at = !0, Lt.then(function(Jn) {
                  oi(G), li === 0 ? Fs(Jn, rn, zn) : rn(Jn);
                }, function(Jn) {
                  oi(G), zn(Jn);
                });
              }
            };
            return !Oi && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              at || (Oi = !0, le("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), Ft;
          } else {
            var sn = Ee;
            if (oi(G), li === 0) {
              var En = H.current;
              En !== null && (no(En), H.current = null);
              var Fn = {
                then: function(rn, zn) {
                  H.current === null ? (H.current = [], Fs(sn, rn, zn)) : rn(sn);
                }
              };
              return Fn;
            } else {
              var An = {
                then: function(rn, zn) {
                  rn(sn);
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
      function Fs(D, G, me) {
        {
          var Ee = H.current;
          if (Ee !== null)
            try {
              no(Ee), ap(function() {
                Ee.length === 0 ? (H.current = null, G(D)) : Fs(D, G, me);
              });
            } catch (Ke) {
              me(Ke);
            }
          else
            G(D);
        }
      }
      var Ps = !1;
      function no(D) {
        if (!Ps) {
          Ps = !0;
          var G = 0;
          try {
            for (; G < D.length; G++) {
              var me = D[G];
              do
                me = me(!0);
              while (me !== null);
            }
            D.length = 0;
          } catch (Ee) {
            throw D = D.slice(G + 1), Ee;
          } finally {
            Ps = !1;
          }
        }
      }
      var Io = da, $s = Fu, Hs = Ho, Ai = {
        map: Hn,
        forEach: Pr,
        count: Gn,
        toArray: Cr,
        only: vr
      };
      a.Children = Ai, a.Component = be, a.Fragment = m, a.Profiler = E, a.PureComponent = _e, a.StrictMode = v, a.Suspense = C, a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ae, a.act = Qi, a.cloneElement = $s, a.createContext = Mi, a.createElement = Io, a.createFactory = Hs, a.createRef = Be, a.forwardRef = zr, a.isValidElement = Ht, a.lazy = Ya, a.memo = nt, a.startTransition = Pu, a.unstable_act = Qi, a.useCallback = In, a.useContext = Yt, a.useDebugValue = Wt, a.useDeferredValue = ua, a.useEffect = Qn, a.useId = _i, a.useImperativeHandle = sa, a.useInsertionEffect = gn, a.useLayoutEffect = xn, a.useMemo = Ma, a.useReducer = tn, a.useRef = Jt, a.useState = It, a.useSyncExternalStore = ki, a.useTransition = Bt, a.version = s, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(gh, gh.exports)), gh.exports;
}
var hb;
function Ah() {
  return hb || (hb = 1, process.env.NODE_ENV === "production" ? O0.exports = WL() : O0.exports = GL()), O0.exports;
}
var mb;
function QL() {
  if (mb) return ph;
  mb = 1;
  var t = Ah(), a = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.fragment"), f = Object.prototype.hasOwnProperty, p = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function v(E, g, x) {
    var b, C = {}, R = null, _ = null;
    x !== void 0 && (R = "" + x), g.key !== void 0 && (R = "" + g.key), g.ref !== void 0 && (_ = g.ref);
    for (b in g) f.call(g, b) && !m.hasOwnProperty(b) && (C[b] = g[b]);
    if (E && E.defaultProps) for (b in g = E.defaultProps, g) C[b] === void 0 && (C[b] = g[b]);
    return { $$typeof: a, type: E, key: R, ref: _, props: C, _owner: p.current };
  }
  return ph.Fragment = s, ph.jsx = v, ph.jsxs = v, ph;
}
var vh = {};
var yb;
function BL() {
  return yb || (yb = 1, process.env.NODE_ENV !== "production" && (function() {
    var t = Ah(), a = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.portal"), f = /* @__PURE__ */ Symbol.for("react.fragment"), p = /* @__PURE__ */ Symbol.for("react.strict_mode"), m = /* @__PURE__ */ Symbol.for("react.profiler"), v = /* @__PURE__ */ Symbol.for("react.provider"), E = /* @__PURE__ */ Symbol.for("react.context"), g = /* @__PURE__ */ Symbol.for("react.forward_ref"), x = /* @__PURE__ */ Symbol.for("react.suspense"), b = /* @__PURE__ */ Symbol.for("react.suspense_list"), C = /* @__PURE__ */ Symbol.for("react.memo"), R = /* @__PURE__ */ Symbol.for("react.lazy"), _ = /* @__PURE__ */ Symbol.for("react.offscreen"), k = Symbol.iterator, O = "@@iterator";
    function z(Q) {
      if (Q === null || typeof Q != "object")
        return null;
      var ze = k && Q[k] || Q[O];
      return typeof ze == "function" ? ze : null;
    }
    var F = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function Y(Q) {
      {
        for (var ze = arguments.length, nt = new Array(ze > 1 ? ze - 1 : 0), dt = 1; dt < ze; dt++)
          nt[dt - 1] = arguments[dt];
        P("error", Q, nt);
      }
    }
    function P(Q, ze, nt) {
      {
        var dt = F.ReactDebugCurrentFrame, Yt = dt.getStackAddendum();
        Yt !== "" && (ze += "%s", nt = nt.concat([Yt]));
        var It = nt.map(function(tn) {
          return String(tn);
        });
        It.unshift("Warning: " + ze), Function.prototype.apply.call(console[Q], console, It);
      }
    }
    var N = !1, H = !1, I = !1, V = !1, oe = !1, B;
    B = /* @__PURE__ */ Symbol.for("react.module.reference");
    function $(Q) {
      return !!(typeof Q == "string" || typeof Q == "function" || Q === f || Q === m || oe || Q === p || Q === x || Q === b || V || Q === _ || N || H || I || typeof Q == "object" && Q !== null && (Q.$$typeof === R || Q.$$typeof === C || Q.$$typeof === v || Q.$$typeof === E || Q.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      Q.$$typeof === B || Q.getModuleId !== void 0));
    }
    function J(Q, ze, nt) {
      var dt = Q.displayName;
      if (dt)
        return dt;
      var Yt = ze.displayName || ze.name || "";
      return Yt !== "" ? nt + "(" + Yt + ")" : nt;
    }
    function ee(Q) {
      return Q.displayName || "Context";
    }
    function W(Q) {
      if (Q == null)
        return null;
      if (typeof Q.tag == "number" && Y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof Q == "function")
        return Q.displayName || Q.name || null;
      if (typeof Q == "string")
        return Q;
      switch (Q) {
        case f:
          return "Fragment";
        case s:
          return "Portal";
        case m:
          return "Profiler";
        case p:
          return "StrictMode";
        case x:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof Q == "object")
        switch (Q.$$typeof) {
          case E:
            var ze = Q;
            return ee(ze) + ".Consumer";
          case v:
            var nt = Q;
            return ee(nt._context) + ".Provider";
          case g:
            return J(Q, Q.render, "ForwardRef");
          case C:
            var dt = Q.displayName || null;
            return dt !== null ? dt : W(Q.type) || "Memo";
          case R: {
            var Yt = Q, It = Yt._payload, tn = Yt._init;
            try {
              return W(tn(It));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var X = Object.assign, ae = 0, de, le, ie, se, ve, U, Z;
    function xe() {
    }
    xe.__reactDisabledLog = !0;
    function be() {
      {
        if (ae === 0) {
          de = console.log, le = console.info, ie = console.warn, se = console.error, ve = console.group, U = console.groupCollapsed, Z = console.groupEnd;
          var Q = {
            configurable: !0,
            enumerable: !0,
            value: xe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: Q,
            log: Q,
            warn: Q,
            error: Q,
            group: Q,
            groupCollapsed: Q,
            groupEnd: Q
          });
        }
        ae++;
      }
    }
    function Le() {
      {
        if (ae--, ae === 0) {
          var Q = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: X({}, Q, {
              value: de
            }),
            info: X({}, Q, {
              value: le
            }),
            warn: X({}, Q, {
              value: ie
            }),
            error: X({}, Q, {
              value: se
            }),
            group: X({}, Q, {
              value: ve
            }),
            groupCollapsed: X({}, Q, {
              value: U
            }),
            groupEnd: X({}, Q, {
              value: Z
            })
          });
        }
        ae < 0 && Y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Me = F.ReactCurrentDispatcher, Oe;
    function Pe(Q, ze, nt) {
      {
        if (Oe === void 0)
          try {
            throw Error();
          } catch (Yt) {
            var dt = Yt.stack.trim().match(/\n( *(at )?)/);
            Oe = dt && dt[1] || "";
          }
        return `
` + Oe + Q;
      }
    }
    var _e = !1, je;
    {
      var Be = typeof WeakMap == "function" ? WeakMap : Map;
      je = new Be();
    }
    function ke(Q, ze) {
      if (!Q || _e)
        return "";
      {
        var nt = je.get(Q);
        if (nt !== void 0)
          return nt;
      }
      var dt;
      _e = !0;
      var Yt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var It;
      It = Me.current, Me.current = null, be();
      try {
        if (ze) {
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
              dt = Wt;
            }
            Reflect.construct(Q, [], tn);
          } else {
            try {
              tn.call();
            } catch (Wt) {
              dt = Wt;
            }
            Q.call(tn.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Wt) {
            dt = Wt;
          }
          Q();
        }
      } catch (Wt) {
        if (Wt && dt && typeof Wt.stack == "string") {
          for (var Jt = Wt.stack.split(`
`), Qn = dt.stack.split(`
`), gn = Jt.length - 1, xn = Qn.length - 1; gn >= 1 && xn >= 0 && Jt[gn] !== Qn[xn]; )
            xn--;
          for (; gn >= 1 && xn >= 0; gn--, xn--)
            if (Jt[gn] !== Qn[xn]) {
              if (gn !== 1 || xn !== 1)
                do
                  if (gn--, xn--, xn < 0 || Jt[gn] !== Qn[xn]) {
                    var In = `
` + Jt[gn].replace(" at new ", " at ");
                    return Q.displayName && In.includes("<anonymous>") && (In = In.replace("<anonymous>", Q.displayName)), typeof Q == "function" && je.set(Q, In), In;
                  }
                while (gn >= 1 && xn >= 0);
              break;
            }
        }
      } finally {
        _e = !1, Me.current = It, Le(), Error.prepareStackTrace = Yt;
      }
      var Ma = Q ? Q.displayName || Q.name : "", sa = Ma ? Pe(Ma) : "";
      return typeof Q == "function" && je.set(Q, sa), sa;
    }
    function $e(Q, ze, nt) {
      return ke(Q, !1);
    }
    function Se(Q) {
      var ze = Q.prototype;
      return !!(ze && ze.isReactComponent);
    }
    function Ye(Q, ze, nt) {
      if (Q == null)
        return "";
      if (typeof Q == "function")
        return ke(Q, Se(Q));
      if (typeof Q == "string")
        return Pe(Q);
      switch (Q) {
        case x:
          return Pe("Suspense");
        case b:
          return Pe("SuspenseList");
      }
      if (typeof Q == "object")
        switch (Q.$$typeof) {
          case g:
            return $e(Q.render);
          case C:
            return Ye(Q.type, ze, nt);
          case R: {
            var dt = Q, Yt = dt._payload, It = dt._init;
            try {
              return Ye(It(Yt), ze, nt);
            } catch {
            }
          }
        }
      return "";
    }
    var Ze = Object.prototype.hasOwnProperty, Ae = {}, tt = F.ReactDebugCurrentFrame;
    function yt(Q) {
      if (Q) {
        var ze = Q._owner, nt = Ye(Q.type, Q._source, ze ? ze.type : null);
        tt.setExtraStackFrame(nt);
      } else
        tt.setExtraStackFrame(null);
    }
    function ct(Q, ze, nt, dt, Yt) {
      {
        var It = Function.call.bind(Ze);
        for (var tn in Q)
          if (It(Q, tn)) {
            var Jt = void 0;
            try {
              if (typeof Q[tn] != "function") {
                var Qn = Error((dt || "React class") + ": " + nt + " type `" + tn + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof Q[tn] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Qn.name = "Invariant Violation", Qn;
              }
              Jt = Q[tn](ze, tn, dt, nt, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (gn) {
              Jt = gn;
            }
            Jt && !(Jt instanceof Error) && (yt(Yt), Y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", dt || "React class", nt, tn, typeof Jt), yt(null)), Jt instanceof Error && !(Jt.message in Ae) && (Ae[Jt.message] = !0, yt(Yt), Y("Failed %s type: %s", nt, Jt.message), yt(null));
          }
      }
    }
    var Ce = Array.isArray;
    function qe(Q) {
      return Ce(Q);
    }
    function lt(Q) {
      {
        var ze = typeof Symbol == "function" && Symbol.toStringTag, nt = ze && Q[Symbol.toStringTag] || Q.constructor.name || "Object";
        return nt;
      }
    }
    function Je(Q) {
      try {
        return St(Q), !1;
      } catch {
        return !0;
      }
    }
    function St(Q) {
      return "" + Q;
    }
    function et(Q) {
      if (Je(Q))
        return Y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", lt(Q)), St(Q);
    }
    var Et = F.ReactCurrentOwner, Ot = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, $t, we;
    function Ie(Q) {
      if (Ze.call(Q, "ref")) {
        var ze = Object.getOwnPropertyDescriptor(Q, "ref").get;
        if (ze && ze.isReactWarning)
          return !1;
      }
      return Q.ref !== void 0;
    }
    function it(Q) {
      if (Ze.call(Q, "key")) {
        var ze = Object.getOwnPropertyDescriptor(Q, "key").get;
        if (ze && ze.isReactWarning)
          return !1;
      }
      return Q.key !== void 0;
    }
    function We(Q, ze) {
      typeof Q.ref == "string" && Et.current;
    }
    function Mt(Q, ze) {
      {
        var nt = function() {
          $t || ($t = !0, Y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ze));
        };
        nt.isReactWarning = !0, Object.defineProperty(Q, "key", {
          get: nt,
          configurable: !0
        });
      }
    }
    function Ht(Q, ze) {
      {
        var nt = function() {
          we || (we = !0, Y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ze));
        };
        nt.isReactWarning = !0, Object.defineProperty(Q, "ref", {
          get: nt,
          configurable: !0
        });
      }
    }
    var Ct = function(Q, ze, nt, dt, Yt, It, tn) {
      var Jt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: Q,
        key: ze,
        ref: nt,
        props: tn,
        // Record the component responsible for creating this element.
        _owner: It
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
        value: dt
      }), Object.defineProperty(Jt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Yt
      }), Object.freeze && (Object.freeze(Jt.props), Object.freeze(Jt)), Jt;
    };
    function ht(Q, ze, nt, dt, Yt) {
      {
        var It, tn = {}, Jt = null, Qn = null;
        nt !== void 0 && (et(nt), Jt = "" + nt), it(ze) && (et(ze.key), Jt = "" + ze.key), Ie(ze) && (Qn = ze.ref, We(ze, Yt));
        for (It in ze)
          Ze.call(ze, It) && !Ot.hasOwnProperty(It) && (tn[It] = ze[It]);
        if (Q && Q.defaultProps) {
          var gn = Q.defaultProps;
          for (It in gn)
            tn[It] === void 0 && (tn[It] = gn[It]);
        }
        if (Jt || Qn) {
          var xn = typeof Q == "function" ? Q.displayName || Q.name || "Unknown" : Q;
          Jt && Mt(tn, xn), Qn && Ht(tn, xn);
        }
        return Ct(Q, Jt, Qn, Yt, dt, Et.current, tn);
      }
    }
    var Ne = F.ReactCurrentOwner, ft = F.ReactDebugCurrentFrame;
    function kt(Q) {
      if (Q) {
        var ze = Q._owner, nt = Ye(Q.type, Q._source, ze ? ze.type : null);
        ft.setExtraStackFrame(nt);
      } else
        ft.setExtraStackFrame(null);
    }
    var Zt;
    Zt = !1;
    function nn(Q) {
      return typeof Q == "object" && Q !== null && Q.$$typeof === a;
    }
    function yn() {
      {
        if (Ne.current) {
          var Q = W(Ne.current.type);
          if (Q)
            return `

Check the render method of \`` + Q + "`.";
        }
        return "";
      }
    }
    function Hn(Q) {
      return "";
    }
    var Gn = {};
    function Pr(Q) {
      {
        var ze = yn();
        if (!ze) {
          var nt = typeof Q == "string" ? Q : Q.displayName || Q.name;
          nt && (ze = `

Check the top-level render call using <` + nt + ">.");
        }
        return ze;
      }
    }
    function Cr(Q, ze) {
      {
        if (!Q._store || Q._store.validated || Q.key != null)
          return;
        Q._store.validated = !0;
        var nt = Pr(ze);
        if (Gn[nt])
          return;
        Gn[nt] = !0;
        var dt = "";
        Q && Q._owner && Q._owner !== Ne.current && (dt = " It was passed a child from " + W(Q._owner.type) + "."), kt(Q), Y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', nt, dt), kt(null);
      }
    }
    function vr(Q, ze) {
      {
        if (typeof Q != "object")
          return;
        if (qe(Q))
          for (var nt = 0; nt < Q.length; nt++) {
            var dt = Q[nt];
            nn(dt) && Cr(dt, ze);
          }
        else if (nn(Q))
          Q._store && (Q._store.validated = !0);
        else if (Q) {
          var Yt = z(Q);
          if (typeof Yt == "function" && Yt !== Q.entries)
            for (var It = Yt.call(Q), tn; !(tn = It.next()).done; )
              nn(tn.value) && Cr(tn.value, ze);
        }
      }
    }
    function Mi(Q) {
      {
        var ze = Q.type;
        if (ze == null || typeof ze == "string")
          return;
        var nt;
        if (typeof ze == "function")
          nt = ze.propTypes;
        else if (typeof ze == "object" && (ze.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        ze.$$typeof === C))
          nt = ze.propTypes;
        else
          return;
        if (nt) {
          var dt = W(ze);
          ct(nt, Q.props, "prop", dt, Q);
        } else if (ze.PropTypes !== void 0 && !Zt) {
          Zt = !0;
          var Yt = W(ze);
          Y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Yt || "Unknown");
        }
        typeof ze.getDefaultProps == "function" && !ze.getDefaultProps.isReactClassApproved && Y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Tr(Q) {
      {
        for (var ze = Object.keys(Q.props), nt = 0; nt < ze.length; nt++) {
          var dt = ze[nt];
          if (dt !== "children" && dt !== "key") {
            kt(Q), Y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", dt), kt(null);
            break;
          }
        }
        Q.ref !== null && (kt(Q), Y("Invalid attribute `ref` supplied to `React.Fragment`."), kt(null));
      }
    }
    var Ar = {};
    function Vn(Q, ze, nt, dt, Yt, It) {
      {
        var tn = $(Q);
        if (!tn) {
          var Jt = "";
          (Q === void 0 || typeof Q == "object" && Q !== null && Object.keys(Q).length === 0) && (Jt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Qn = Hn();
          Qn ? Jt += Qn : Jt += yn();
          var gn;
          Q === null ? gn = "null" : qe(Q) ? gn = "array" : Q !== void 0 && Q.$$typeof === a ? (gn = "<" + (W(Q.type) || "Unknown") + " />", Jt = " Did you accidentally export a JSX literal instead of a component?") : gn = typeof Q, Y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", gn, Jt);
        }
        var xn = ht(Q, ze, nt, Yt, It);
        if (xn == null)
          return xn;
        if (tn) {
          var In = ze.children;
          if (In !== void 0)
            if (dt)
              if (qe(In)) {
                for (var Ma = 0; Ma < In.length; Ma++)
                  vr(In[Ma], Q);
                Object.freeze && Object.freeze(In);
              } else
                Y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              vr(In, Q);
        }
        if (Ze.call(ze, "key")) {
          var sa = W(Q), Wt = Object.keys(ze).filter(function(_i) {
            return _i !== "key";
          }), Bt = Wt.length > 0 ? "{key: someKey, " + Wt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ar[sa + Bt]) {
            var ua = Wt.length > 0 ? "{" + Wt.join(": ..., ") + ": ...}" : "{}";
            Y(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Bt, sa, ua, sa), Ar[sa + Bt] = !0;
          }
        }
        return Q === f ? Tr(xn) : Mi(xn), xn;
      }
    }
    function Ra(Q, ze, nt) {
      return Vn(Q, ze, nt, !0);
    }
    function oa(Q, ze, nt) {
      return Vn(Q, ze, nt, !1);
    }
    var Ya = oa, zr = Ra;
    vh.Fragment = f, vh.jsx = Ya, vh.jsxs = zr;
  })()), vh;
}
var gb;
function XL() {
  return gb || (gb = 1, process.env.NODE_ENV === "production" ? D0.exports = QL() : D0.exports = BL()), D0.exports;
}
var Xe = XL(), ia = Ah(), qd = {}, A0 = { exports: {} }, bi = {}, z0 = { exports: {} }, A2 = {};
var Sb;
function KL() {
  return Sb || (Sb = 1, (function(t) {
    function a(ie, se) {
      var ve = ie.length;
      ie.push(se);
      e: for (; 0 < ve; ) {
        var U = ve - 1 >>> 1, Z = ie[U];
        if (0 < p(Z, se)) ie[U] = se, ie[ve] = Z, ve = U;
        else break e;
      }
    }
    function s(ie) {
      return ie.length === 0 ? null : ie[0];
    }
    function f(ie) {
      if (ie.length === 0) return null;
      var se = ie[0], ve = ie.pop();
      if (ve !== se) {
        ie[0] = ve;
        e: for (var U = 0, Z = ie.length, xe = Z >>> 1; U < xe; ) {
          var be = 2 * (U + 1) - 1, Le = ie[be], Me = be + 1, Oe = ie[Me];
          if (0 > p(Le, ve)) Me < Z && 0 > p(Oe, Le) ? (ie[U] = Oe, ie[Me] = ve, U = Me) : (ie[U] = Le, ie[be] = ve, U = be);
          else if (Me < Z && 0 > p(Oe, ve)) ie[U] = Oe, ie[Me] = ve, U = Me;
          else break e;
        }
      }
      return se;
    }
    function p(ie, se) {
      var ve = ie.sortIndex - se.sortIndex;
      return ve !== 0 ? ve : ie.id - se.id;
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
    var g = [], x = [], b = 1, C = null, R = 3, _ = !1, k = !1, O = !1, z = typeof setTimeout == "function" ? setTimeout : null, F = typeof clearTimeout == "function" ? clearTimeout : null, Y = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function P(ie) {
      for (var se = s(x); se !== null; ) {
        if (se.callback === null) f(x);
        else if (se.startTime <= ie) f(x), se.sortIndex = se.expirationTime, a(g, se);
        else break;
        se = s(x);
      }
    }
    function N(ie) {
      if (O = !1, P(ie), !k) if (s(g) !== null) k = !0, de(H);
      else {
        var se = s(x);
        se !== null && le(N, se.startTime - ie);
      }
    }
    function H(ie, se) {
      k = !1, O && (O = !1, F(oe), oe = -1), _ = !0;
      var ve = R;
      try {
        for (P(se), C = s(g); C !== null && (!(C.expirationTime > se) || ie && !J()); ) {
          var U = C.callback;
          if (typeof U == "function") {
            C.callback = null, R = C.priorityLevel;
            var Z = U(C.expirationTime <= se);
            se = t.unstable_now(), typeof Z == "function" ? C.callback = Z : C === s(g) && f(g), P(se);
          } else f(g);
          C = s(g);
        }
        if (C !== null) var xe = !0;
        else {
          var be = s(x);
          be !== null && le(N, be.startTime - se), xe = !1;
        }
        return xe;
      } finally {
        C = null, R = ve, _ = !1;
      }
    }
    var I = !1, V = null, oe = -1, B = 5, $ = -1;
    function J() {
      return !(t.unstable_now() - $ < B);
    }
    function ee() {
      if (V !== null) {
        var ie = t.unstable_now();
        $ = ie;
        var se = !0;
        try {
          se = V(!0, ie);
        } finally {
          se ? W() : (I = !1, V = null);
        }
      } else I = !1;
    }
    var W;
    if (typeof Y == "function") W = function() {
      Y(ee);
    };
    else if (typeof MessageChannel < "u") {
      var X = new MessageChannel(), ae = X.port2;
      X.port1.onmessage = ee, W = function() {
        ae.postMessage(null);
      };
    } else W = function() {
      z(ee, 0);
    };
    function de(ie) {
      V = ie, I || (I = !0, W());
    }
    function le(ie, se) {
      oe = z(function() {
        ie(t.unstable_now());
      }, se);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(ie) {
      ie.callback = null;
    }, t.unstable_continueExecution = function() {
      k || _ || (k = !0, de(H));
    }, t.unstable_forceFrameRate = function(ie) {
      0 > ie || 125 < ie ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : B = 0 < ie ? Math.floor(1e3 / ie) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return R;
    }, t.unstable_getFirstCallbackNode = function() {
      return s(g);
    }, t.unstable_next = function(ie) {
      switch (R) {
        case 1:
        case 2:
        case 3:
          var se = 3;
          break;
        default:
          se = R;
      }
      var ve = R;
      R = se;
      try {
        return ie();
      } finally {
        R = ve;
      }
    }, t.unstable_pauseExecution = function() {
    }, t.unstable_requestPaint = function() {
    }, t.unstable_runWithPriority = function(ie, se) {
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
      var ve = R;
      R = ie;
      try {
        return se();
      } finally {
        R = ve;
      }
    }, t.unstable_scheduleCallback = function(ie, se, ve) {
      var U = t.unstable_now();
      switch (typeof ve == "object" && ve !== null ? (ve = ve.delay, ve = typeof ve == "number" && 0 < ve ? U + ve : U) : ve = U, ie) {
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
      return Z = ve + Z, ie = { id: b++, callback: se, priorityLevel: ie, startTime: ve, expirationTime: Z, sortIndex: -1 }, ve > U ? (ie.sortIndex = ve, a(x, ie), s(g) === null && ie === s(x) && (O ? (F(oe), oe = -1) : O = !0, le(N, ve - U))) : (ie.sortIndex = Z, a(g, ie), k || _ || (k = !0, de(H))), ie;
    }, t.unstable_shouldYield = J, t.unstable_wrapCallback = function(ie) {
      var se = R;
      return function() {
        var ve = R;
        R = se;
        try {
          return ie.apply(this, arguments);
        } finally {
          R = ve;
        }
      };
    };
  })(A2)), A2;
}
var z2 = {};
var Eb;
function ZL() {
  return Eb || (Eb = 1, (function(t) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var a = !1, s = 5;
      function f(we, Ie) {
        var it = we.length;
        we.push(Ie), v(we, Ie, it);
      }
      function p(we) {
        return we.length === 0 ? null : we[0];
      }
      function m(we) {
        if (we.length === 0)
          return null;
        var Ie = we[0], it = we.pop();
        return it !== Ie && (we[0] = it, E(we, it, 0)), Ie;
      }
      function v(we, Ie, it) {
        for (var We = it; We > 0; ) {
          var Mt = We - 1 >>> 1, Ht = we[Mt];
          if (g(Ht, Ie) > 0)
            we[Mt] = Ie, we[We] = Ht, We = Mt;
          else
            return;
        }
      }
      function E(we, Ie, it) {
        for (var We = it, Mt = we.length, Ht = Mt >>> 1; We < Ht; ) {
          var Ct = (We + 1) * 2 - 1, ht = we[Ct], Ne = Ct + 1, ft = we[Ne];
          if (g(ht, Ie) < 0)
            Ne < Mt && g(ft, ht) < 0 ? (we[We] = ft, we[Ne] = Ie, We = Ne) : (we[We] = ht, we[Ct] = Ie, We = Ct);
          else if (Ne < Mt && g(ft, Ie) < 0)
            we[We] = ft, we[Ne] = Ie, We = Ne;
          else
            return;
        }
      }
      function g(we, Ie) {
        var it = we.sortIndex - Ie.sortIndex;
        return it !== 0 ? it : we.id - Ie.id;
      }
      var x = 1, b = 2, C = 3, R = 4, _ = 5;
      function k(we, Ie) {
      }
      var O = typeof performance == "object" && typeof performance.now == "function";
      if (O) {
        var z = performance;
        t.unstable_now = function() {
          return z.now();
        };
      } else {
        var F = Date, Y = F.now();
        t.unstable_now = function() {
          return F.now() - Y;
        };
      }
      var P = 1073741823, N = -1, H = 250, I = 5e3, V = 1e4, oe = P, B = [], $ = [], J = 1, ee = null, W = C, X = !1, ae = !1, de = !1, le = typeof setTimeout == "function" ? setTimeout : null, ie = typeof clearTimeout == "function" ? clearTimeout : null, se = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ve(we) {
        for (var Ie = p($); Ie !== null; ) {
          if (Ie.callback === null)
            m($);
          else if (Ie.startTime <= we)
            m($), Ie.sortIndex = Ie.expirationTime, f(B, Ie);
          else
            return;
          Ie = p($);
        }
      }
      function U(we) {
        if (de = !1, ve(we), !ae)
          if (p(B) !== null)
            ae = !0, St(Z);
          else {
            var Ie = p($);
            Ie !== null && et(U, Ie.startTime - we);
          }
      }
      function Z(we, Ie) {
        ae = !1, de && (de = !1, Et()), X = !0;
        var it = W;
        try {
          var We;
          if (!a) return xe(we, Ie);
        } finally {
          ee = null, W = it, X = !1;
        }
      }
      function xe(we, Ie) {
        var it = Ie;
        for (ve(it), ee = p(B); ee !== null && !(ee.expirationTime > it && (!we || tt())); ) {
          var We = ee.callback;
          if (typeof We == "function") {
            ee.callback = null, W = ee.priorityLevel;
            var Mt = ee.expirationTime <= it, Ht = We(Mt);
            it = t.unstable_now(), typeof Ht == "function" ? ee.callback = Ht : ee === p(B) && m(B), ve(it);
          } else
            m(B);
          ee = p(B);
        }
        if (ee !== null)
          return !0;
        var Ct = p($);
        return Ct !== null && et(U, Ct.startTime - it), !1;
      }
      function be(we, Ie) {
        switch (we) {
          case x:
          case b:
          case C:
          case R:
          case _:
            break;
          default:
            we = C;
        }
        var it = W;
        W = we;
        try {
          return Ie();
        } finally {
          W = it;
        }
      }
      function Le(we) {
        var Ie;
        switch (W) {
          case x:
          case b:
          case C:
            Ie = C;
            break;
          default:
            Ie = W;
            break;
        }
        var it = W;
        W = Ie;
        try {
          return we();
        } finally {
          W = it;
        }
      }
      function Me(we) {
        var Ie = W;
        return function() {
          var it = W;
          W = Ie;
          try {
            return we.apply(this, arguments);
          } finally {
            W = it;
          }
        };
      }
      function Oe(we, Ie, it) {
        var We = t.unstable_now(), Mt;
        if (typeof it == "object" && it !== null) {
          var Ht = it.delay;
          typeof Ht == "number" && Ht > 0 ? Mt = We + Ht : Mt = We;
        } else
          Mt = We;
        var Ct;
        switch (we) {
          case x:
            Ct = N;
            break;
          case b:
            Ct = H;
            break;
          case _:
            Ct = oe;
            break;
          case R:
            Ct = V;
            break;
          case C:
          default:
            Ct = I;
            break;
        }
        var ht = Mt + Ct, Ne = {
          id: J++,
          callback: Ie,
          priorityLevel: we,
          startTime: Mt,
          expirationTime: ht,
          sortIndex: -1
        };
        return Mt > We ? (Ne.sortIndex = Mt, f($, Ne), p(B) === null && Ne === p($) && (de ? Et() : de = !0, et(U, Mt - We))) : (Ne.sortIndex = ht, f(B, Ne), !ae && !X && (ae = !0, St(Z))), Ne;
      }
      function Pe() {
      }
      function _e() {
        !ae && !X && (ae = !0, St(Z));
      }
      function je() {
        return p(B);
      }
      function Be(we) {
        we.callback = null;
      }
      function ke() {
        return W;
      }
      var $e = !1, Se = null, Ye = -1, Ze = s, Ae = -1;
      function tt() {
        var we = t.unstable_now() - Ae;
        return !(we < Ze);
      }
      function yt() {
      }
      function ct(we) {
        if (we < 0 || we > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        we > 0 ? Ze = Math.floor(1e3 / we) : Ze = s;
      }
      var Ce = function() {
        if (Se !== null) {
          var we = t.unstable_now();
          Ae = we;
          var Ie = !0, it = !0;
          try {
            it = Se(Ie, we);
          } finally {
            it ? qe() : ($e = !1, Se = null);
          }
        } else
          $e = !1;
      }, qe;
      if (typeof se == "function")
        qe = function() {
          se(Ce);
        };
      else if (typeof MessageChannel < "u") {
        var lt = new MessageChannel(), Je = lt.port2;
        lt.port1.onmessage = Ce, qe = function() {
          Je.postMessage(null);
        };
      } else
        qe = function() {
          le(Ce, 0);
        };
      function St(we) {
        Se = we, $e || ($e = !0, qe());
      }
      function et(we, Ie) {
        Ye = le(function() {
          we(t.unstable_now());
        }, Ie);
      }
      function Et() {
        ie(Ye), Ye = -1;
      }
      var Ot = yt, $t = null;
      t.unstable_IdlePriority = _, t.unstable_ImmediatePriority = x, t.unstable_LowPriority = R, t.unstable_NormalPriority = C, t.unstable_Profiling = $t, t.unstable_UserBlockingPriority = b, t.unstable_cancelCallback = Be, t.unstable_continueExecution = _e, t.unstable_forceFrameRate = ct, t.unstable_getCurrentPriorityLevel = ke, t.unstable_getFirstCallbackNode = je, t.unstable_next = Le, t.unstable_pauseExecution = Pe, t.unstable_requestPaint = Ot, t.unstable_runWithPriority = be, t.unstable_scheduleCallback = Oe, t.unstable_shouldYield = tt, t.unstable_wrapCallback = Me, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(z2)), z2;
}
var xb;
function KC() {
  return xb || (xb = 1, process.env.NODE_ENV === "production" ? z0.exports = KL() : z0.exports = ZL()), z0.exports;
}
var wb;
function JL() {
  if (wb) return bi;
  wb = 1;
  var t = Ah(), a = KC();
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
  var E = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), g = Object.prototype.hasOwnProperty, x = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, b = {}, C = {};
  function R(r) {
    return g.call(C, r) ? !0 : g.call(b, r) ? !1 : x.test(r) ? C[r] = !0 : (b[r] = !0, !1);
  }
  function _(r, i, u, d) {
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
  function k(r, i, u, d) {
    if (i === null || typeof i > "u" || _(r, i, u, d)) return !0;
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
  function O(r, i, u, d, y, w, A) {
    this.acceptsBooleans = i === 2 || i === 3 || i === 4, this.attributeName = d, this.attributeNamespace = y, this.mustUseProperty = u, this.propertyName = r, this.type = i, this.sanitizeURL = w, this.removeEmptyString = A;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(r) {
    z[r] = new O(r, 0, !1, r, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(r) {
    var i = r[0];
    z[i] = new O(i, 1, !1, r[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(r) {
    z[r] = new O(r, 2, !1, r.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(r) {
    z[r] = new O(r, 2, !1, r, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(r) {
    z[r] = new O(r, 3, !1, r.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(r) {
    z[r] = new O(r, 3, !0, r, null, !1, !1);
  }), ["capture", "download"].forEach(function(r) {
    z[r] = new O(r, 4, !1, r, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(r) {
    z[r] = new O(r, 6, !1, r, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(r) {
    z[r] = new O(r, 5, !1, r.toLowerCase(), null, !1, !1);
  });
  var F = /[\-:]([a-z])/g;
  function Y(r) {
    return r[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(r) {
    var i = r.replace(
      F,
      Y
    );
    z[i] = new O(i, 1, !1, r, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(r) {
    var i = r.replace(F, Y);
    z[i] = new O(i, 1, !1, r, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(r) {
    var i = r.replace(F, Y);
    z[i] = new O(i, 1, !1, r, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(r) {
    z[r] = new O(r, 1, !1, r.toLowerCase(), null, !1, !1);
  }), z.xlinkHref = new O("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(r) {
    z[r] = new O(r, 1, !1, r.toLowerCase(), null, !0, !0);
  });
  function P(r, i, u, d) {
    var y = z.hasOwnProperty(i) ? z[i] : null;
    (y !== null ? y.type !== 0 : d || !(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (k(i, u, y, d) && (u = null), d || y === null ? R(i) && (u === null ? r.removeAttribute(i) : r.setAttribute(i, "" + u)) : y.mustUseProperty ? r[y.propertyName] = u === null ? y.type === 3 ? !1 : "" : u : (i = y.attributeName, d = y.attributeNamespace, u === null ? r.removeAttribute(i) : (y = y.type, u = y === 3 || y === 4 && u === !0 ? "" : "" + u, d ? r.setAttributeNS(d, i, u) : r.setAttribute(i, u))));
  }
  var N = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, H = /* @__PURE__ */ Symbol.for("react.element"), I = /* @__PURE__ */ Symbol.for("react.portal"), V = /* @__PURE__ */ Symbol.for("react.fragment"), oe = /* @__PURE__ */ Symbol.for("react.strict_mode"), B = /* @__PURE__ */ Symbol.for("react.profiler"), $ = /* @__PURE__ */ Symbol.for("react.provider"), J = /* @__PURE__ */ Symbol.for("react.context"), ee = /* @__PURE__ */ Symbol.for("react.forward_ref"), W = /* @__PURE__ */ Symbol.for("react.suspense"), X = /* @__PURE__ */ Symbol.for("react.suspense_list"), ae = /* @__PURE__ */ Symbol.for("react.memo"), de = /* @__PURE__ */ Symbol.for("react.lazy"), le = /* @__PURE__ */ Symbol.for("react.offscreen"), ie = Symbol.iterator;
  function se(r) {
    return r === null || typeof r != "object" ? null : (r = ie && r[ie] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var ve = Object.assign, U;
  function Z(r) {
    if (U === void 0) try {
      throw Error();
    } catch (u) {
      var i = u.stack.trim().match(/\n( *(at )?)/);
      U = i && i[1] || "";
    }
    return `
` + U + r;
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
`), A = y.length - 1, q = w.length - 1; 1 <= A && 0 <= q && y[A] !== w[q]; ) q--;
        for (; 1 <= A && 0 <= q; A--, q--) if (y[A] !== w[q]) {
          if (A !== 1 || q !== 1)
            do
              if (A--, q--, 0 > q || y[A] !== w[q]) {
                var K = `
` + y[A].replace(" at new ", " at ");
                return r.displayName && K.includes("<anonymous>") && (K = K.replace("<anonymous>", r.displayName)), K;
              }
            while (1 <= A && 0 <= q);
          break;
        }
      }
    } finally {
      xe = !1, Error.prepareStackTrace = u;
    }
    return (r = r ? r.displayName || r.name : "") ? Z(r) : "";
  }
  function Le(r) {
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
  function Me(r) {
    if (r == null) return null;
    if (typeof r == "function") return r.displayName || r.name || null;
    if (typeof r == "string") return r;
    switch (r) {
      case V:
        return "Fragment";
      case I:
        return "Portal";
      case B:
        return "Profiler";
      case oe:
        return "StrictMode";
      case W:
        return "Suspense";
      case X:
        return "SuspenseList";
    }
    if (typeof r == "object") switch (r.$$typeof) {
      case J:
        return (r.displayName || "Context") + ".Consumer";
      case $:
        return (r._context.displayName || "Context") + ".Provider";
      case ee:
        var i = r.render;
        return r = r.displayName, r || (r = i.displayName || i.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
      case ae:
        return i = r.displayName || null, i !== null ? i : Me(r.type) || "Memo";
      case de:
        i = r._payload, r = r._init;
        try {
          return Me(r(i));
        } catch {
        }
    }
    return null;
  }
  function Oe(r) {
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
        return Me(i);
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
  function Pe(r) {
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
  function _e(r) {
    var i = r.type;
    return (r = r.nodeName) && r.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
  }
  function je(r) {
    var i = _e(r) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(r.constructor.prototype, i), d = "" + r[i];
    if (!r.hasOwnProperty(i) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var y = u.get, w = u.set;
      return Object.defineProperty(r, i, { configurable: !0, get: function() {
        return y.call(this);
      }, set: function(A) {
        d = "" + A, w.call(this, A);
      } }), Object.defineProperty(r, i, { enumerable: u.enumerable }), { getValue: function() {
        return d;
      }, setValue: function(A) {
        d = "" + A;
      }, stopTracking: function() {
        r._valueTracker = null, delete r[i];
      } };
    }
  }
  function Be(r) {
    r._valueTracker || (r._valueTracker = je(r));
  }
  function ke(r) {
    if (!r) return !1;
    var i = r._valueTracker;
    if (!i) return !0;
    var u = i.getValue(), d = "";
    return r && (d = _e(r) ? r.checked ? "true" : "false" : r.value), r = d, r !== u ? (i.setValue(r), !0) : !1;
  }
  function $e(r) {
    if (r = r || (typeof document < "u" ? document : void 0), typeof r > "u") return null;
    try {
      return r.activeElement || r.body;
    } catch {
      return r.body;
    }
  }
  function Se(r, i) {
    var u = i.checked;
    return ve({}, i, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: u ?? r._wrapperState.initialChecked });
  }
  function Ye(r, i) {
    var u = i.defaultValue == null ? "" : i.defaultValue, d = i.checked != null ? i.checked : i.defaultChecked;
    u = Pe(i.value != null ? i.value : u), r._wrapperState = { initialChecked: d, initialValue: u, controlled: i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null };
  }
  function Ze(r, i) {
    i = i.checked, i != null && P(r, "checked", i, !1);
  }
  function Ae(r, i) {
    Ze(r, i);
    var u = Pe(i.value), d = i.type;
    if (u != null) d === "number" ? (u === 0 && r.value === "" || r.value != u) && (r.value = "" + u) : r.value !== "" + u && (r.value = "" + u);
    else if (d === "submit" || d === "reset") {
      r.removeAttribute("value");
      return;
    }
    i.hasOwnProperty("value") ? yt(r, i.type, u) : i.hasOwnProperty("defaultValue") && yt(r, i.type, Pe(i.defaultValue)), i.checked == null && i.defaultChecked != null && (r.defaultChecked = !!i.defaultChecked);
  }
  function tt(r, i, u) {
    if (i.hasOwnProperty("value") || i.hasOwnProperty("defaultValue")) {
      var d = i.type;
      if (!(d !== "submit" && d !== "reset" || i.value !== void 0 && i.value !== null)) return;
      i = "" + r._wrapperState.initialValue, u || i === r.value || (r.value = i), r.defaultValue = i;
    }
    u = r.name, u !== "" && (r.name = ""), r.defaultChecked = !!r._wrapperState.initialChecked, u !== "" && (r.name = u);
  }
  function yt(r, i, u) {
    (i !== "number" || $e(r.ownerDocument) !== r) && (u == null ? r.defaultValue = "" + r._wrapperState.initialValue : r.defaultValue !== "" + u && (r.defaultValue = "" + u));
  }
  var ct = Array.isArray;
  function Ce(r, i, u, d) {
    if (r = r.options, i) {
      i = {};
      for (var y = 0; y < u.length; y++) i["$" + u[y]] = !0;
      for (u = 0; u < r.length; u++) y = i.hasOwnProperty("$" + r[u].value), r[u].selected !== y && (r[u].selected = y), y && d && (r[u].defaultSelected = !0);
    } else {
      for (u = "" + Pe(u), i = null, y = 0; y < r.length; y++) {
        if (r[y].value === u) {
          r[y].selected = !0, d && (r[y].defaultSelected = !0);
          return;
        }
        i !== null || r[y].disabled || (i = r[y]);
      }
      i !== null && (i.selected = !0);
    }
  }
  function qe(r, i) {
    if (i.dangerouslySetInnerHTML != null) throw Error(s(91));
    return ve({}, i, { value: void 0, defaultValue: void 0, children: "" + r._wrapperState.initialValue });
  }
  function lt(r, i) {
    var u = i.value;
    if (u == null) {
      if (u = i.children, i = i.defaultValue, u != null) {
        if (i != null) throw Error(s(92));
        if (ct(u)) {
          if (1 < u.length) throw Error(s(93));
          u = u[0];
        }
        i = u;
      }
      i == null && (i = ""), u = i;
    }
    r._wrapperState = { initialValue: Pe(u) };
  }
  function Je(r, i) {
    var u = Pe(i.value), d = Pe(i.defaultValue);
    u != null && (u = "" + u, u !== r.value && (r.value = u), i.defaultValue == null && r.defaultValue !== u && (r.defaultValue = u)), d != null && (r.defaultValue = "" + d);
  }
  function St(r) {
    var i = r.textContent;
    i === r._wrapperState.initialValue && i !== "" && i !== null && (r.value = i);
  }
  function et(r) {
    switch (r) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Et(r, i) {
    return r == null || r === "http://www.w3.org/1999/xhtml" ? et(i) : r === "http://www.w3.org/2000/svg" && i === "foreignObject" ? "http://www.w3.org/1999/xhtml" : r;
  }
  var Ot, $t = (function(r) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(i, u, d, y) {
      MSApp.execUnsafeLocalFunction(function() {
        return r(i, u, d, y);
      });
    } : r;
  })(function(r, i) {
    if (r.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in r) r.innerHTML = i;
    else {
      for (Ot = Ot || document.createElement("div"), Ot.innerHTML = "<svg>" + i.valueOf().toString() + "</svg>", i = Ot.firstChild; r.firstChild; ) r.removeChild(r.firstChild);
      for (; i.firstChild; ) r.appendChild(i.firstChild);
    }
  });
  function we(r, i) {
    if (i) {
      var u = r.firstChild;
      if (u && u === r.lastChild && u.nodeType === 3) {
        u.nodeValue = i;
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
  }, it = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ie).forEach(function(r) {
    it.forEach(function(i) {
      i = i + r.charAt(0).toUpperCase() + r.substring(1), Ie[i] = Ie[r];
    });
  });
  function We(r, i, u) {
    return i == null || typeof i == "boolean" || i === "" ? "" : u || typeof i != "number" || i === 0 || Ie.hasOwnProperty(r) && Ie[r] ? ("" + i).trim() : i + "px";
  }
  function Mt(r, i) {
    r = r.style;
    for (var u in i) if (i.hasOwnProperty(u)) {
      var d = u.indexOf("--") === 0, y = We(u, i[u], d);
      u === "float" && (u = "cssFloat"), d ? r.setProperty(u, y) : r[u] = y;
    }
  }
  var Ht = ve({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Ct(r, i) {
    if (i) {
      if (Ht[r] && (i.children != null || i.dangerouslySetInnerHTML != null)) throw Error(s(137, r));
      if (i.dangerouslySetInnerHTML != null) {
        if (i.children != null) throw Error(s(60));
        if (typeof i.dangerouslySetInnerHTML != "object" || !("__html" in i.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (i.style != null && typeof i.style != "object") throw Error(s(62));
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
  var Ne = null;
  function ft(r) {
    return r = r.target || r.srcElement || window, r.correspondingUseElement && (r = r.correspondingUseElement), r.nodeType === 3 ? r.parentNode : r;
  }
  var kt = null, Zt = null, nn = null;
  function yn(r) {
    if (r = At(r)) {
      if (typeof kt != "function") throw Error(s(280));
      var i = r.stateNode;
      i && (i = er(i), kt(r.stateNode, r.type, i));
    }
  }
  function Hn(r) {
    Zt ? nn ? nn.push(r) : nn = [r] : Zt = r;
  }
  function Gn() {
    if (Zt) {
      var r = Zt, i = nn;
      if (nn = Zt = null, yn(r), i) for (r = 0; r < i.length; r++) yn(i[r]);
    }
  }
  function Pr(r, i) {
    return r(i);
  }
  function Cr() {
  }
  var vr = !1;
  function Mi(r, i, u) {
    if (vr) return r(i, u);
    vr = !0;
    try {
      return Pr(r, i, u);
    } finally {
      vr = !1, (Zt !== null || nn !== null) && (Cr(), Gn());
    }
  }
  function Tr(r, i) {
    var u = r.stateNode;
    if (u === null) return null;
    var d = er(u);
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
  var Ar = !1;
  if (E) try {
    var Vn = {};
    Object.defineProperty(Vn, "passive", { get: function() {
      Ar = !0;
    } }), window.addEventListener("test", Vn, Vn), window.removeEventListener("test", Vn, Vn);
  } catch {
    Ar = !1;
  }
  function Ra(r, i, u, d, y, w, A, q, K) {
    var ye = Array.prototype.slice.call(arguments, 3);
    try {
      i.apply(u, ye);
    } catch (He) {
      this.onError(He);
    }
  }
  var oa = !1, Ya = null, zr = !1, Q = null, ze = { onError: function(r) {
    oa = !0, Ya = r;
  } };
  function nt(r, i, u, d, y, w, A, q, K) {
    oa = !1, Ya = null, Ra.apply(ze, arguments);
  }
  function dt(r, i, u, d, y, w, A, q, K) {
    if (nt.apply(this, arguments), oa) {
      if (oa) {
        var ye = Ya;
        oa = !1, Ya = null;
      } else throw Error(s(198));
      zr || (zr = !0, Q = ye);
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
  function It(r) {
    if (r.tag === 13) {
      var i = r.memoizedState;
      if (i === null && (r = r.alternate, r !== null && (i = r.memoizedState)), i !== null) return i.dehydrated;
    }
    return null;
  }
  function tn(r) {
    if (Yt(r) !== r) throw Error(s(188));
  }
  function Jt(r) {
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
        for (var A = !1, q = y.child; q; ) {
          if (q === u) {
            A = !0, u = y, d = w;
            break;
          }
          if (q === d) {
            A = !0, d = y, u = w;
            break;
          }
          q = q.sibling;
        }
        if (!A) {
          for (q = w.child; q; ) {
            if (q === u) {
              A = !0, u = w, d = y;
              break;
            }
            if (q === d) {
              A = !0, d = w, u = y;
              break;
            }
            q = q.sibling;
          }
          if (!A) throw Error(s(189));
        }
      }
      if (u.alternate !== d) throw Error(s(190));
    }
    if (u.tag !== 3) throw Error(s(188));
    return u.stateNode.current === u ? r : i;
  }
  function Qn(r) {
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
  var xn = a.unstable_scheduleCallback, In = a.unstable_cancelCallback, Ma = a.unstable_shouldYield, sa = a.unstable_requestPaint, Wt = a.unstable_now, Bt = a.unstable_getCurrentPriorityLevel, ua = a.unstable_ImmediatePriority, _i = a.unstable_UserBlockingPriority, ki = a.unstable_NormalPriority, Di = a.unstable_LowPriority, qi = a.unstable_IdlePriority, ai = null, Bn = null;
  function $o(r) {
    if (Bn && typeof Bn.onCommitFiberRoot == "function") try {
      Bn.onCommitFiberRoot(ai, r, void 0, (r.current.flags & 128) === 128);
    } catch {
    }
  }
  var $r = Math.clz32 ? Math.clz32 : on, zs = Math.log, Zl = Math.LN2;
  function on(r) {
    return r >>>= 0, r === 0 ? 32 : 31 - (zs(r) / Zl | 0) | 0;
  }
  var Ut = 64, an = 4194304;
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
  function Zn(r, i) {
    var u = r.pendingLanes;
    if (u === 0) return 0;
    var d = 0, y = r.suspendedLanes, w = r.pingedLanes, A = u & 268435455;
    if (A !== 0) {
      var q = A & ~y;
      q !== 0 ? d = un(q) : (w &= A, w !== 0 && (d = un(w)));
    } else A = u & ~y, A !== 0 ? d = un(A) : w !== 0 && (d = un(w));
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
  function Rr(r, i) {
    for (var u = r.suspendedLanes, d = r.pingedLanes, y = r.expirationTimes, w = r.pendingLanes; 0 < w; ) {
      var A = 31 - $r(w), q = 1 << A, K = y[A];
      K === -1 ? ((q & u) === 0 || (q & d) !== 0) && (y[A] = ca(q, i)) : K <= i && (r.expiredLanes |= q), w &= ~q;
    }
  }
  function Jl(r) {
    return r = r.pendingLanes & -1073741825, r !== 0 ? r : r & 1073741824 ? 1073741824 : 0;
  }
  function Ls() {
    var r = Ut;
    return Ut <<= 1, (Ut & 4194240) === 0 && (Ut = 64), r;
  }
  function Ns(r) {
    for (var i = [], u = 0; 31 > u; u++) i.push(r);
    return i;
  }
  function xl(r, i, u) {
    r.pendingLanes |= i, i !== 536870912 && (r.suspendedLanes = 0, r.pingedLanes = 0), r = r.eventTimes, i = 31 - $r(i), r[i] = u;
  }
  function rp(r, i) {
    var u = r.pendingLanes & ~i;
    r.pendingLanes = i, r.suspendedLanes = 0, r.pingedLanes = 0, r.expiredLanes &= i, r.mutableReadLanes &= i, r.entangledLanes &= i, i = r.entanglements;
    var d = r.eventTimes;
    for (r = r.expirationTimes; 0 < u; ) {
      var y = 31 - $r(u), w = 1 << y;
      i[y] = 0, d[y] = -1, r[y] = -1, u &= ~w;
    }
  }
  function wl(r, i) {
    var u = r.entangledLanes |= i;
    for (r = r.entanglements; u; ) {
      var d = 31 - $r(u), y = 1 << d;
      y & i | r[d] & i && (r[d] |= i), u &= ~y;
    }
  }
  var bn = 0;
  function Us(r) {
    return r &= -r, 1 < r ? 4 < r ? (r & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Sn, ju, Yi, Qt, js, Hr = !1, Wi = [], fa = null, Gi = null, qn = null, On = /* @__PURE__ */ new Map(), eo = /* @__PURE__ */ new Map(), Mr = [], da = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function ii(r, i) {
    switch (r) {
      case "focusin":
      case "focusout":
        fa = null;
        break;
      case "dragenter":
      case "dragleave":
        Gi = null;
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
  function Ho(r, i, u, d, y, w) {
    return r === null || r.nativeEvent !== w ? (r = { blockedOn: i, domEventName: u, eventSystemFlags: d, nativeEvent: w, targetContainers: [y] }, i !== null && (i = At(i), i !== null && ju(i)), r) : (r.eventSystemFlags |= d, i = r.targetContainers, y !== null && i.indexOf(y) === -1 && i.push(y), r);
  }
  function Fu(r, i, u, d, y) {
    switch (i) {
      case "focusin":
        return fa = Ho(fa, r, i, u, d, y), !0;
      case "dragenter":
        return Gi = Ho(Gi, r, i, u, d, y), !0;
      case "mouseover":
        return qn = Ho(qn, r, i, u, d, y), !0;
      case "pointerover":
        var w = y.pointerId;
        return On.set(w, Ho(On.get(w) || null, r, i, u, d, y)), !0;
      case "gotpointercapture":
        return w = y.pointerId, eo.set(w, Ho(eo.get(w) || null, r, i, u, d, y)), !0;
    }
    return !1;
  }
  function Pu(r) {
    var i = Xo(r.target);
    if (i !== null) {
      var u = Yt(i);
      if (u !== null) {
        if (i = u.tag, i === 13) {
          if (i = It(u), i !== null) {
            r.blockedOn = i, js(r.priority, function() {
              Yi(u);
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
  function to(r) {
    if (r.blockedOn !== null) return !1;
    for (var i = r.targetContainers; 0 < i.length; ) {
      var u = $s(r.domEventName, r.eventSystemFlags, i[0], r.nativeEvent);
      if (u === null) {
        u = r.nativeEvent;
        var d = new u.constructor(u.type, u);
        Ne = d, u.target.dispatchEvent(d), Ne = null;
      } else return i = At(u), i !== null && ju(i), r.blockedOn = u, !1;
      i.shift();
    }
    return !0;
  }
  function Vo(r, i, u) {
    to(r) && u.delete(i);
  }
  function ap() {
    Hr = !1, fa !== null && to(fa) && (fa = null), Gi !== null && to(Gi) && (Gi = null), qn !== null && to(qn) && (qn = null), On.forEach(Vo), eo.forEach(Vo);
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
      for (var u = 1; u < Wi.length; u++) {
        var d = Wi[u];
        d.blockedOn === r && (d.blockedOn = null);
      }
    }
    for (fa !== null && li(fa, r), Gi !== null && li(Gi, r), qn !== null && li(qn, r), On.forEach(i), eo.forEach(i), u = 0; u < Mr.length; u++) d = Mr[u], d.blockedOn === r && (d.blockedOn = null);
    for (; 0 < Mr.length && (u = Mr[0], u.blockedOn === null); ) Pu(u), u.blockedOn === null && Mr.shift();
  }
  var Qi = N.ReactCurrentBatchConfig, oi = !0;
  function Fs(r, i, u, d) {
    var y = bn, w = Qi.transition;
    Qi.transition = null;
    try {
      bn = 1, no(r, i, u, d);
    } finally {
      bn = y, Qi.transition = w;
    }
  }
  function Ps(r, i, u, d) {
    var y = bn, w = Qi.transition;
    Qi.transition = null;
    try {
      bn = 4, no(r, i, u, d);
    } finally {
      bn = y, Qi.transition = w;
    }
  }
  function no(r, i, u, d) {
    if (oi) {
      var y = $s(r, i, u, d);
      if (y === null) mf(r, i, d, Io, u), ii(r, d);
      else if (Fu(y, r, i, u, d)) d.stopPropagation();
      else if (ii(r, d), i & 4 && -1 < da.indexOf(r)) {
        for (; y !== null; ) {
          var w = At(y);
          if (w !== null && Sn(w), w = $s(r, i, u, d), w === null && mf(r, i, d, Io, u), w === y) break;
          y = w;
        }
        y !== null && d.stopPropagation();
      } else mf(r, i, d, null, u);
    }
  }
  var Io = null;
  function $s(r, i, u, d) {
    if (Io = null, r = ft(d), r = Xo(r), r !== null) if (i = Yt(r), i === null) r = null;
    else if (u = i.tag, u === 13) {
      if (r = It(i), r !== null) return r;
      r = null;
    } else if (u === 3) {
      if (i.stateNode.current.memoizedState.isDehydrated) return i.tag === 3 ? i.stateNode.containerInfo : null;
      r = null;
    } else i !== r && (r = null);
    return Io = r, null;
  }
  function Hs(r) {
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
          case ua:
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
  var Ai = null, D = null, G = null;
  function me() {
    if (G) return G;
    var r, i = D, u = i.length, d, y = "value" in Ai ? Ai.value : Ai.textContent, w = y.length;
    for (r = 0; r < u && i[r] === y[r]; r++) ;
    var A = u - r;
    for (d = 1; d <= A && i[u - d] === y[w - d]; d++) ;
    return G = y.slice(r, 1 < d ? 1 - d : void 0);
  }
  function Ee(r) {
    var i = r.keyCode;
    return "charCode" in r ? (r = r.charCode, r === 0 && i === 13 && (r = 13)) : r = i, r === 10 && (r = 13), 32 <= r || r === 13 ? r : 0;
  }
  function Ke() {
    return !0;
  }
  function Lt() {
    return !1;
  }
  function at(r) {
    function i(u, d, y, w, A) {
      this._reactName = u, this._targetInst = y, this.type = d, this.nativeEvent = w, this.target = A, this.currentTarget = null;
      for (var q in r) r.hasOwnProperty(q) && (u = r[q], this[q] = u ? u(w) : w[q]);
      return this.isDefaultPrevented = (w.defaultPrevented != null ? w.defaultPrevented : w.returnValue === !1) ? Ke : Lt, this.isPropagationStopped = Lt, this;
    }
    return ve(i.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Ke);
    }, stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Ke);
    }, persist: function() {
    }, isPersistent: Ke }), i;
  }
  var Ft = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(r) {
    return r.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, sn = at(Ft), En = ve({}, Ft, { view: 0, detail: 0 }), Fn = at(En), An, rn, zn, Jn = ve({}, En, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: up, button: 0, buttons: 0, relatedTarget: function(r) {
    return r.relatedTarget === void 0 ? r.fromElement === r.srcElement ? r.toElement : r.fromElement : r.relatedTarget;
  }, movementX: function(r) {
    return "movementX" in r ? r.movementX : (r !== zn && (zn && r.type === "mousemove" ? (An = r.screenX - zn.screenX, rn = r.screenY - zn.screenY) : rn = An = 0, zn = r), An);
  }, movementY: function(r) {
    return "movementY" in r ? r.movementY : rn;
  } }), ro = at(Jn), $u = ve({}, Jn, { dataTransfer: 0 }), bl = at($u), Hu = ve({}, En, { relatedTarget: 0 }), qo = at(Hu), ip = ve({}, Ft, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), af = at(ip), lp = ve({}, Ft, { clipboardData: function(r) {
    return "clipboardData" in r ? r.clipboardData : window.clipboardData;
  } }), zh = at(lp), op = ve({}, Ft, { data: 0 }), sp = at(op), Lh = {
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
  }, Nh = {
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
  }, s1 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Cl(r) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(r) : (r = s1[r]) ? !!i[r] : !1;
  }
  function up() {
    return Cl;
  }
  var cp = ve({}, En, { key: function(r) {
    if (r.key) {
      var i = Lh[r.key] || r.key;
      if (i !== "Unidentified") return i;
    }
    return r.type === "keypress" ? (r = Ee(r), r === 13 ? "Enter" : String.fromCharCode(r)) : r.type === "keydown" || r.type === "keyup" ? Nh[r.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: up, charCode: function(r) {
    return r.type === "keypress" ? Ee(r) : 0;
  }, keyCode: function(r) {
    return r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  }, which: function(r) {
    return r.type === "keypress" ? Ee(r) : r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  } }), fp = at(cp), dp = ve({}, Jn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Uh = at(dp), lf = ve({}, En, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: up }), jh = at(lf), _a = ve({}, Ft, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Tl = at(_a), hr = ve({}, Jn, {
    deltaX: function(r) {
      return "deltaX" in r ? r.deltaX : "wheelDeltaX" in r ? -r.wheelDeltaX : 0;
    },
    deltaY: function(r) {
      return "deltaY" in r ? r.deltaY : "wheelDeltaY" in r ? -r.wheelDeltaY : "wheelDelta" in r ? -r.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Rl = at(hr), pp = [9, 13, 27, 32], Vs = E && "CompositionEvent" in window, Vu = null;
  E && "documentMode" in document && (Vu = document.documentMode);
  var Iu = E && "TextEvent" in window && !Vu, Fh = E && (!Vs || Vu && 8 < Vu && 11 >= Vu), Ph = " ", of = !1;
  function $h(r, i) {
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
  function Hh(r) {
    return r = r.detail, typeof r == "object" && "data" in r ? r.data : null;
  }
  var Is = !1;
  function Vh(r, i) {
    switch (r) {
      case "compositionend":
        return Hh(i);
      case "keypress":
        return i.which !== 32 ? null : (of = !0, Ph);
      case "textInput":
        return r = i.data, r === Ph && of ? null : r;
      default:
        return null;
    }
  }
  function u1(r, i) {
    if (Is) return r === "compositionend" || !Vs && $h(r, i) ? (r = me(), G = D = Ai = null, Is = !1, r) : null;
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
        return Fh && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var c1 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Ih(r) {
    var i = r && r.nodeName && r.nodeName.toLowerCase();
    return i === "input" ? !!c1[r.type] : i === "textarea";
  }
  function vp(r, i, u, d) {
    Hn(d), i = Bu(i, "onChange"), 0 < i.length && (u = new sn("onChange", "change", null, u, d), r.push({ event: u, listeners: i }));
  }
  var Bi = null, Yo = null;
  function qh(r) {
    Qo(r, 0);
  }
  function qu(r) {
    var i = Li(r);
    if (ke(i)) return r;
  }
  function f1(r, i) {
    if (r === "change") return i;
  }
  var Yh = !1;
  if (E) {
    var hp;
    if (E) {
      var mp = "oninput" in document;
      if (!mp) {
        var Wh = document.createElement("div");
        Wh.setAttribute("oninput", "return;"), mp = typeof Wh.oninput == "function";
      }
      hp = mp;
    } else hp = !1;
    Yh = hp && (!document.documentMode || 9 < document.documentMode);
  }
  function Gh() {
    Bi && (Bi.detachEvent("onpropertychange", Qh), Yo = Bi = null);
  }
  function Qh(r) {
    if (r.propertyName === "value" && qu(Yo)) {
      var i = [];
      vp(i, Yo, r, ft(r)), Mi(qh, i);
    }
  }
  function d1(r, i, u) {
    r === "focusin" ? (Gh(), Bi = i, Yo = u, Bi.attachEvent("onpropertychange", Qh)) : r === "focusout" && Gh();
  }
  function Bh(r) {
    if (r === "selectionchange" || r === "keyup" || r === "keydown") return qu(Yo);
  }
  function p1(r, i) {
    if (r === "click") return qu(i);
  }
  function Xh(r, i) {
    if (r === "input" || r === "change") return qu(i);
  }
  function v1(r, i) {
    return r === i && (r !== 0 || 1 / r === 1 / i) || r !== r && i !== i;
  }
  var zi = typeof Object.is == "function" ? Object.is : v1;
  function Yu(r, i) {
    if (zi(r, i)) return !0;
    if (typeof r != "object" || r === null || typeof i != "object" || i === null) return !1;
    var u = Object.keys(r), d = Object.keys(i);
    if (u.length !== d.length) return !1;
    for (d = 0; d < u.length; d++) {
      var y = u[d];
      if (!g.call(i, y) || !zi(r[y], i[y])) return !1;
    }
    return !0;
  }
  function Kh(r) {
    for (; r && r.firstChild; ) r = r.firstChild;
    return r;
  }
  function sf(r, i) {
    var u = Kh(r);
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
      u = Kh(u);
    }
  }
  function ao(r, i) {
    return r && i ? r === i ? !0 : r && r.nodeType === 3 ? !1 : i && i.nodeType === 3 ? ao(r, i.parentNode) : "contains" in r ? r.contains(i) : r.compareDocumentPosition ? !!(r.compareDocumentPosition(i) & 16) : !1 : !1;
  }
  function Wu() {
    for (var r = window, i = $e(); i instanceof r.HTMLIFrameElement; ) {
      try {
        var u = typeof i.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) r = i.contentWindow;
      else break;
      i = $e(r.document);
    }
    return i;
  }
  function uf(r) {
    var i = r && r.nodeName && r.nodeName.toLowerCase();
    return i && (i === "input" && (r.type === "text" || r.type === "search" || r.type === "tel" || r.type === "url" || r.type === "password") || i === "textarea" || r.contentEditable === "true");
  }
  function qs(r) {
    var i = Wu(), u = r.focusedElem, d = r.selectionRange;
    if (i !== u && u && u.ownerDocument && ao(u.ownerDocument.documentElement, u)) {
      if (d !== null && uf(u)) {
        if (i = d.start, r = d.end, r === void 0 && (r = i), "selectionStart" in u) u.selectionStart = i, u.selectionEnd = Math.min(r, u.value.length);
        else if (r = (i = u.ownerDocument || document) && i.defaultView || window, r.getSelection) {
          r = r.getSelection();
          var y = u.textContent.length, w = Math.min(d.start, y);
          d = d.end === void 0 ? w : Math.min(d.end, y), !r.extend && w > d && (y = d, d = w, w = y), y = sf(u, w);
          var A = sf(
            u,
            d
          );
          y && A && (r.rangeCount !== 1 || r.anchorNode !== y.node || r.anchorOffset !== y.offset || r.focusNode !== A.node || r.focusOffset !== A.offset) && (i = i.createRange(), i.setStart(y.node, y.offset), r.removeAllRanges(), w > d ? (r.addRange(i), r.extend(A.node, A.offset)) : (i.setEnd(A.node, A.offset), r.addRange(i)));
        }
      }
      for (i = [], r = u; r = r.parentNode; ) r.nodeType === 1 && i.push({ element: r, left: r.scrollLeft, top: r.scrollTop });
      for (typeof u.focus == "function" && u.focus(), u = 0; u < i.length; u++) r = i[u], r.element.scrollLeft = r.left, r.element.scrollTop = r.top;
    }
  }
  var h1 = E && "documentMode" in document && 11 >= document.documentMode, Ys = null, yp = null, Gu = null, gp = !1;
  function Sp(r, i, u) {
    var d = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    gp || Ys == null || Ys !== $e(d) || (d = Ys, "selectionStart" in d && uf(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Gu && Yu(Gu, d) || (Gu = d, d = Bu(yp, "onSelect"), 0 < d.length && (i = new sn("onSelect", "select", null, i, u), r.push({ event: i, listeners: d }), i.target = Ys)));
  }
  function cf(r, i) {
    var u = {};
    return u[r.toLowerCase()] = i.toLowerCase(), u["Webkit" + r] = "webkit" + i, u["Moz" + r] = "moz" + i, u;
  }
  var Wo = { animationend: cf("Animation", "AnimationEnd"), animationiteration: cf("Animation", "AnimationIteration"), animationstart: cf("Animation", "AnimationStart"), transitionend: cf("Transition", "TransitionEnd") }, Vr = {}, Ep = {};
  E && (Ep = document.createElement("div").style, "AnimationEvent" in window || (delete Wo.animationend.animation, delete Wo.animationiteration.animation, delete Wo.animationstart.animation), "TransitionEvent" in window || delete Wo.transitionend.transition);
  function ff(r) {
    if (Vr[r]) return Vr[r];
    if (!Wo[r]) return r;
    var i = Wo[r], u;
    for (u in i) if (i.hasOwnProperty(u) && u in Ep) return Vr[r] = i[u];
    return r;
  }
  var Zh = ff("animationend"), Jh = ff("animationiteration"), em = ff("animationstart"), tm = ff("transitionend"), xp = /* @__PURE__ */ new Map(), df = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function si(r, i) {
    xp.set(r, i), m(i, [r]);
  }
  for (var wp = 0; wp < df.length; wp++) {
    var Go = df[wp], m1 = Go.toLowerCase(), y1 = Go[0].toUpperCase() + Go.slice(1);
    si(m1, "on" + y1);
  }
  si(Zh, "onAnimationEnd"), si(Jh, "onAnimationIteration"), si(em, "onAnimationStart"), si("dblclick", "onDoubleClick"), si("focusin", "onFocus"), si("focusout", "onBlur"), si(tm, "onTransitionEnd"), v("onMouseEnter", ["mouseout", "mouseover"]), v("onMouseLeave", ["mouseout", "mouseover"]), v("onPointerEnter", ["pointerout", "pointerover"]), v("onPointerLeave", ["pointerout", "pointerover"]), m("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), m("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), m("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), m("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Qu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), bp = new Set("cancel close invalid load scroll toggle".split(" ").concat(Qu));
  function pf(r, i, u) {
    var d = r.type || "unknown-event";
    r.currentTarget = u, dt(d, i, void 0, r), r.currentTarget = null;
  }
  function Qo(r, i) {
    i = (i & 4) !== 0;
    for (var u = 0; u < r.length; u++) {
      var d = r[u], y = d.event;
      d = d.listeners;
      e: {
        var w = void 0;
        if (i) for (var A = d.length - 1; 0 <= A; A--) {
          var q = d[A], K = q.instance, ye = q.currentTarget;
          if (q = q.listener, K !== w && y.isPropagationStopped()) break e;
          pf(y, q, ye), w = K;
        }
        else for (A = 0; A < d.length; A++) {
          if (q = d[A], K = q.instance, ye = q.currentTarget, q = q.listener, K !== w && y.isPropagationStopped()) break e;
          pf(y, q, ye), w = K;
        }
      }
    }
    if (zr) throw r = Q, zr = !1, Q = null, r;
  }
  function kn(r, i) {
    var u = i[Zu];
    u === void 0 && (u = i[Zu] = /* @__PURE__ */ new Set());
    var d = r + "__bubble";
    u.has(d) || (nm(i, r, 2, !1), u.add(d));
  }
  function vf(r, i, u) {
    var d = 0;
    i && (d |= 4), nm(u, r, d, i);
  }
  var hf = "_reactListening" + Math.random().toString(36).slice(2);
  function Ws(r) {
    if (!r[hf]) {
      r[hf] = !0, f.forEach(function(u) {
        u !== "selectionchange" && (bp.has(u) || vf(u, !1, r), vf(u, !0, r));
      });
      var i = r.nodeType === 9 ? r : r.ownerDocument;
      i === null || i[hf] || (i[hf] = !0, vf("selectionchange", !1, i));
    }
  }
  function nm(r, i, u, d) {
    switch (Hs(i)) {
      case 1:
        var y = Fs;
        break;
      case 4:
        y = Ps;
        break;
      default:
        y = no;
    }
    u = y.bind(null, i, u, r), y = void 0, !Ar || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (y = !0), d ? y !== void 0 ? r.addEventListener(i, u, { capture: !0, passive: y }) : r.addEventListener(i, u, !0) : y !== void 0 ? r.addEventListener(i, u, { passive: y }) : r.addEventListener(i, u, !1);
  }
  function mf(r, i, u, d, y) {
    var w = d;
    if ((i & 1) === 0 && (i & 2) === 0 && d !== null) e: for (; ; ) {
      if (d === null) return;
      var A = d.tag;
      if (A === 3 || A === 4) {
        var q = d.stateNode.containerInfo;
        if (q === y || q.nodeType === 8 && q.parentNode === y) break;
        if (A === 4) for (A = d.return; A !== null; ) {
          var K = A.tag;
          if ((K === 3 || K === 4) && (K = A.stateNode.containerInfo, K === y || K.nodeType === 8 && K.parentNode === y)) return;
          A = A.return;
        }
        for (; q !== null; ) {
          if (A = Xo(q), A === null) return;
          if (K = A.tag, K === 5 || K === 6) {
            d = w = A;
            continue e;
          }
          q = q.parentNode;
        }
      }
      d = d.return;
    }
    Mi(function() {
      var ye = w, He = ft(u), Ge = [];
      e: {
        var Fe = xp.get(r);
        if (Fe !== void 0) {
          var pt = sn, xt = r;
          switch (r) {
            case "keypress":
              if (Ee(u) === 0) break e;
            case "keydown":
            case "keyup":
              pt = fp;
              break;
            case "focusin":
              xt = "focus", pt = qo;
              break;
            case "focusout":
              xt = "blur", pt = qo;
              break;
            case "beforeblur":
            case "afterblur":
              pt = qo;
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
              pt = ro;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              pt = bl;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              pt = jh;
              break;
            case Zh:
            case Jh:
            case em:
              pt = af;
              break;
            case tm:
              pt = Tl;
              break;
            case "scroll":
              pt = Fn;
              break;
            case "wheel":
              pt = Rl;
              break;
            case "copy":
            case "cut":
            case "paste":
              pt = zh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              pt = Uh;
          }
          var Tt = (i & 4) !== 0, fr = !Tt && r === "scroll", ue = Tt ? Fe !== null ? Fe + "Capture" : null : Fe;
          Tt = [];
          for (var ne = ye, pe; ne !== null; ) {
            pe = ne;
            var Ve = pe.stateNode;
            if (pe.tag === 5 && Ve !== null && (pe = Ve, ue !== null && (Ve = Tr(ne, ue), Ve != null && Tt.push(Gs(ne, Ve, pe)))), fr) break;
            ne = ne.return;
          }
          0 < Tt.length && (Fe = new pt(Fe, xt, null, u, He), Ge.push({ event: Fe, listeners: Tt }));
        }
      }
      if ((i & 7) === 0) {
        e: {
          if (Fe = r === "mouseover" || r === "pointerover", pt = r === "mouseout" || r === "pointerout", Fe && u !== Ne && (xt = u.relatedTarget || u.fromElement) && (Xo(xt) || xt[Ml])) break e;
          if ((pt || Fe) && (Fe = He.window === He ? He : (Fe = He.ownerDocument) ? Fe.defaultView || Fe.parentWindow : window, pt ? (xt = u.relatedTarget || u.toElement, pt = ye, xt = xt ? Xo(xt) : null, xt !== null && (fr = Yt(xt), xt !== fr || xt.tag !== 5 && xt.tag !== 6) && (xt = null)) : (pt = null, xt = ye), pt !== xt)) {
            if (Tt = ro, Ve = "onMouseLeave", ue = "onMouseEnter", ne = "mouse", (r === "pointerout" || r === "pointerover") && (Tt = Uh, Ve = "onPointerLeave", ue = "onPointerEnter", ne = "pointer"), fr = pt == null ? Fe : Li(pt), pe = xt == null ? Fe : Li(xt), Fe = new Tt(Ve, ne + "leave", pt, u, He), Fe.target = fr, Fe.relatedTarget = pe, Ve = null, Xo(He) === ye && (Tt = new Tt(ue, ne + "enter", xt, u, He), Tt.target = pe, Tt.relatedTarget = fr, Ve = Tt), fr = Ve, pt && xt) t: {
              for (Tt = pt, ue = xt, ne = 0, pe = Tt; pe; pe = io(pe)) ne++;
              for (pe = 0, Ve = ue; Ve; Ve = io(Ve)) pe++;
              for (; 0 < ne - pe; ) Tt = io(Tt), ne--;
              for (; 0 < pe - ne; ) ue = io(ue), pe--;
              for (; ne--; ) {
                if (Tt === ue || ue !== null && Tt === ue.alternate) break t;
                Tt = io(Tt), ue = io(ue);
              }
              Tt = null;
            }
            else Tt = null;
            pt !== null && rm(Ge, Fe, pt, Tt, !1), xt !== null && fr !== null && rm(Ge, fr, xt, Tt, !0);
          }
        }
        e: {
          if (Fe = ye ? Li(ye) : window, pt = Fe.nodeName && Fe.nodeName.toLowerCase(), pt === "select" || pt === "input" && Fe.type === "file") var wt = f1;
          else if (Ih(Fe)) if (Yh) wt = Xh;
          else {
            wt = Bh;
            var jt = d1;
          }
          else (pt = Fe.nodeName) && pt.toLowerCase() === "input" && (Fe.type === "checkbox" || Fe.type === "radio") && (wt = p1);
          if (wt && (wt = wt(r, ye))) {
            vp(Ge, wt, u, He);
            break e;
          }
          jt && jt(r, Fe, ye), r === "focusout" && (jt = Fe._wrapperState) && jt.controlled && Fe.type === "number" && yt(Fe, "number", Fe.value);
        }
        switch (jt = ye ? Li(ye) : window, r) {
          case "focusin":
            (Ih(jt) || jt.contentEditable === "true") && (Ys = jt, yp = ye, Gu = null);
            break;
          case "focusout":
            Gu = yp = Ys = null;
            break;
          case "mousedown":
            gp = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            gp = !1, Sp(Ge, u, He);
            break;
          case "selectionchange":
            if (h1) break;
          case "keydown":
          case "keyup":
            Sp(Ge, u, He);
        }
        var Pt;
        if (Vs) e: {
          switch (r) {
            case "compositionstart":
              var Gt = "onCompositionStart";
              break e;
            case "compositionend":
              Gt = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Gt = "onCompositionUpdate";
              break e;
          }
          Gt = void 0;
        }
        else Is ? $h(r, u) && (Gt = "onCompositionEnd") : r === "keydown" && u.keyCode === 229 && (Gt = "onCompositionStart");
        Gt && (Fh && u.locale !== "ko" && (Is || Gt !== "onCompositionStart" ? Gt === "onCompositionEnd" && Is && (Pt = me()) : (Ai = He, D = "value" in Ai ? Ai.value : Ai.textContent, Is = !0)), jt = Bu(ye, Gt), 0 < jt.length && (Gt = new sp(Gt, r, null, u, He), Ge.push({ event: Gt, listeners: jt }), Pt ? Gt.data = Pt : (Pt = Hh(u), Pt !== null && (Gt.data = Pt)))), (Pt = Iu ? Vh(r, u) : u1(r, u)) && (ye = Bu(ye, "onBeforeInput"), 0 < ye.length && (He = new sp("onBeforeInput", "beforeinput", null, u, He), Ge.push({ event: He, listeners: ye }), He.data = Pt));
      }
      Qo(Ge, i);
    });
  }
  function Gs(r, i, u) {
    return { instance: r, listener: i, currentTarget: u };
  }
  function Bu(r, i) {
    for (var u = i + "Capture", d = []; r !== null; ) {
      var y = r, w = y.stateNode;
      y.tag === 5 && w !== null && (y = w, w = Tr(r, u), w != null && d.unshift(Gs(r, w, y)), w = Tr(r, i), w != null && d.push(Gs(r, w, y))), r = r.return;
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
  function rm(r, i, u, d, y) {
    for (var w = i._reactName, A = []; u !== null && u !== d; ) {
      var q = u, K = q.alternate, ye = q.stateNode;
      if (K !== null && K === d) break;
      q.tag === 5 && ye !== null && (q = ye, y ? (K = Tr(u, w), K != null && A.unshift(Gs(u, K, q))) : y || (K = Tr(u, w), K != null && A.push(Gs(u, K, q)))), u = u.return;
    }
    A.length !== 0 && r.push({ event: i, listeners: A });
  }
  var am = /\r\n?/g, g1 = /\u0000|\uFFFD/g;
  function im(r) {
    return (typeof r == "string" ? r : "" + r).replace(am, `
`).replace(g1, "");
  }
  function yf(r, i, u) {
    if (i = im(i), im(r) !== i && u) throw Error(s(425));
  }
  function lo() {
  }
  var Xu = null, Bo = null;
  function gf(r, i) {
    return r === "textarea" || r === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  }
  var Sf = typeof setTimeout == "function" ? setTimeout : void 0, Cp = typeof clearTimeout == "function" ? clearTimeout : void 0, lm = typeof Promise == "function" ? Promise : void 0, Qs = typeof queueMicrotask == "function" ? queueMicrotask : typeof lm < "u" ? function(r) {
    return lm.resolve(null).then(r).catch(Ef);
  } : Sf;
  function Ef(r) {
    setTimeout(function() {
      throw r;
    });
  }
  function Bs(r, i) {
    var u = i, d = 0;
    do {
      var y = u.nextSibling;
      if (r.removeChild(u), y && y.nodeType === 8) if (u = y.data, u === "/$") {
        if (d === 0) {
          r.removeChild(y), Oi(i);
          return;
        }
        d--;
      } else u !== "$" && u !== "$?" && u !== "$!" || d++;
      u = y;
    } while (u);
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
  function om(r) {
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
  var oo = Math.random().toString(36).slice(2), Ki = "__reactFiber$" + oo, Ku = "__reactProps$" + oo, Ml = "__reactContainer$" + oo, Zu = "__reactEvents$" + oo, Xs = "__reactListeners$" + oo, S1 = "__reactHandles$" + oo;
  function Xo(r) {
    var i = r[Ki];
    if (i) return i;
    for (var u = r.parentNode; u; ) {
      if (i = u[Ml] || u[Ki]) {
        if (u = i.alternate, i.child !== null || u !== null && u.child !== null) for (r = om(r); r !== null; ) {
          if (u = r[Ki]) return u;
          r = om(r);
        }
        return i;
      }
      r = u, u = r.parentNode;
    }
    return null;
  }
  function At(r) {
    return r = r[Ki] || r[Ml], !r || r.tag !== 5 && r.tag !== 6 && r.tag !== 13 && r.tag !== 3 ? null : r;
  }
  function Li(r) {
    if (r.tag === 5 || r.tag === 6) return r.stateNode;
    throw Error(s(33));
  }
  function er(r) {
    return r[Ku] || null;
  }
  var pn = [], ui = -1;
  function ci(r) {
    return { current: r };
  }
  function Pn(r) {
    0 > ui || (r.current = pn[ui], pn[ui] = null, ui--);
  }
  function Dt(r, i) {
    ui++, pn[ui] = r.current, r.current = i;
  }
  var ea = {}, ir = ci(ea), _r = ci(!1), ka = ea;
  function Da(r, i) {
    var u = r.type.contextTypes;
    if (!u) return ea;
    var d = r.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === i) return d.__reactInternalMemoizedMaskedChildContext;
    var y = {}, w;
    for (w in u) y[w] = i[w];
    return d && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = i, r.__reactInternalMemoizedMaskedChildContext = y), y;
  }
  function mr(r) {
    return r = r.childContextTypes, r != null;
  }
  function Ks() {
    Pn(_r), Pn(ir);
  }
  function sm(r, i, u) {
    if (ir.current !== ea) throw Error(s(168));
    Dt(ir, i), Dt(_r, u);
  }
  function Ju(r, i, u) {
    var d = r.stateNode;
    if (i = i.childContextTypes, typeof d.getChildContext != "function") return u;
    d = d.getChildContext();
    for (var y in d) if (!(y in i)) throw Error(s(108, Oe(r) || "Unknown", y));
    return ve({}, u, d);
  }
  function Lr(r) {
    return r = (r = r.stateNode) && r.__reactInternalMemoizedMergedChildContext || ea, ka = ir.current, Dt(ir, r), Dt(_r, _r.current), !0;
  }
  function xf(r, i, u) {
    var d = r.stateNode;
    if (!d) throw Error(s(169));
    u ? (r = Ju(r, i, ka), d.__reactInternalMemoizedMergedChildContext = r, Pn(_r), Pn(ir), Dt(ir, r)) : Pn(_r), Dt(_r, u);
  }
  var Zi = null, Zs = !1, _l = !1;
  function wf(r) {
    Zi === null ? Zi = [r] : Zi.push(r);
  }
  function so(r) {
    Zs = !0, wf(r);
  }
  function Ji() {
    if (!_l && Zi !== null) {
      _l = !0;
      var r = 0, i = bn;
      try {
        var u = Zi;
        for (bn = 1; r < u.length; r++) {
          var d = u[r];
          do
            d = d(!0);
          while (d !== null);
        }
        Zi = null, Zs = !1;
      } catch (y) {
        throw Zi !== null && (Zi = Zi.slice(r + 1)), xn(ua, Ji), y;
      } finally {
        bn = i, _l = !1;
      }
    }
    return null;
  }
  var uo = [], co = 0, fo = null, kl = 0, yr = [], fi = 0, Wa = null, el = 1, tl = "";
  function Ko(r, i) {
    uo[co++] = kl, uo[co++] = fo, fo = r, kl = i;
  }
  function um(r, i, u) {
    yr[fi++] = el, yr[fi++] = tl, yr[fi++] = Wa, Wa = r;
    var d = el;
    r = tl;
    var y = 32 - $r(d) - 1;
    d &= ~(1 << y), u += 1;
    var w = 32 - $r(i) + y;
    if (30 < w) {
      var A = y - y % 5;
      w = (d & (1 << A) - 1).toString(32), d >>= A, y -= A, el = 1 << 32 - $r(i) + y | u << y | d, tl = w + r;
    } else el = 1 << w | u << y | d, tl = r;
  }
  function bf(r) {
    r.return !== null && (Ko(r, 1), um(r, 1, 0));
  }
  function Cf(r) {
    for (; r === fo; ) fo = uo[--co], uo[co] = null, kl = uo[--co], uo[co] = null;
    for (; r === Wa; ) Wa = yr[--fi], yr[fi] = null, tl = yr[--fi], yr[fi] = null, el = yr[--fi], yr[fi] = null;
  }
  var Oa = null, Aa = null, Xn = !1, di = null;
  function Tp(r, i) {
    var u = yi(5, null, null, 0);
    u.elementType = "DELETED", u.stateNode = i, u.return = r, i = r.deletions, i === null ? (r.deletions = [u], r.flags |= 16) : i.push(u);
  }
  function cm(r, i) {
    switch (r.tag) {
      case 5:
        var u = r.type;
        return i = i.nodeType !== 1 || u.toLowerCase() !== i.nodeName.toLowerCase() ? null : i, i !== null ? (r.stateNode = i, Oa = r, Aa = Xi(i.firstChild), !0) : !1;
      case 6:
        return i = r.pendingProps === "" || i.nodeType !== 3 ? null : i, i !== null ? (r.stateNode = i, Oa = r, Aa = null, !0) : !1;
      case 13:
        return i = i.nodeType !== 8 ? null : i, i !== null ? (u = Wa !== null ? { id: el, overflow: tl } : null, r.memoizedState = { dehydrated: i, treeContext: u, retryLane: 1073741824 }, u = yi(18, null, null, 0), u.stateNode = i, u.return = r, r.child = u, Oa = r, Aa = null, !0) : !1;
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
        var u = i;
        if (!cm(r, i)) {
          if (Rp(r)) throw Error(s(418));
          i = Xi(u.nextSibling);
          var d = Oa;
          i && cm(r, i) ? Tp(d, u) : (r.flags = r.flags & -4097 | 2, Xn = !1, Oa = r);
        }
      } else {
        if (Rp(r)) throw Error(s(418));
        r.flags = r.flags & -4097 | 2, Xn = !1, Oa = r;
      }
    }
  }
  function kr(r) {
    for (r = r.return; r !== null && r.tag !== 5 && r.tag !== 3 && r.tag !== 13; ) r = r.return;
    Oa = r;
  }
  function Tf(r) {
    if (r !== Oa) return !1;
    if (!Xn) return kr(r), Xn = !0, !1;
    var i;
    if ((i = r.tag !== 3) && !(i = r.tag !== 5) && (i = r.type, i = i !== "head" && i !== "body" && !gf(r.type, r.memoizedProps)), i && (i = Aa)) {
      if (Rp(r)) throw ec(), Error(s(418));
      for (; i; ) Tp(r, i), i = Xi(i.nextSibling);
    }
    if (kr(r), r.tag === 13) {
      if (r = r.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(s(317));
      e: {
        for (r = r.nextSibling, i = 0; r; ) {
          if (r.nodeType === 8) {
            var u = r.data;
            if (u === "/$") {
              if (i === 0) {
                Aa = Xi(r.nextSibling);
                break e;
              }
              i--;
            } else u !== "$" && u !== "$!" && u !== "$?" || i++;
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
  function Dl(r) {
    di === null ? di = [r] : di.push(r);
  }
  var E1 = N.ReactCurrentBatchConfig;
  function Zo(r, i, u) {
    if (r = u.ref, r !== null && typeof r != "function" && typeof r != "object") {
      if (u._owner) {
        if (u = u._owner, u) {
          if (u.tag !== 1) throw Error(s(309));
          var d = u.stateNode;
        }
        if (!d) throw Error(s(147, r));
        var y = d, w = "" + r;
        return i !== null && i.ref !== null && typeof i.ref == "function" && i.ref._stringRef === w ? i.ref : (i = function(A) {
          var q = y.refs;
          A === null ? delete q[w] : q[w] = A;
        }, i._stringRef = w, i);
      }
      if (typeof r != "string") throw Error(s(284));
      if (!u._owner) throw Error(s(290, r));
    }
    return r;
  }
  function Rf(r, i) {
    throw r = Object.prototype.toString.call(i), Error(s(31, r === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : r));
  }
  function fm(r) {
    var i = r._init;
    return i(r._payload);
  }
  function Jo(r) {
    function i(ue, ne) {
      if (r) {
        var pe = ue.deletions;
        pe === null ? (ue.deletions = [ne], ue.flags |= 16) : pe.push(ne);
      }
    }
    function u(ue, ne) {
      if (!r) return null;
      for (; ne !== null; ) i(ue, ne), ne = ne.sibling;
      return null;
    }
    function d(ue, ne) {
      for (ue = /* @__PURE__ */ new Map(); ne !== null; ) ne.key !== null ? ue.set(ne.key, ne) : ue.set(ne.index, ne), ne = ne.sibling;
      return ue;
    }
    function y(ue, ne) {
      return ue = xo(ue, ne), ue.index = 0, ue.sibling = null, ue;
    }
    function w(ue, ne, pe) {
      return ue.index = pe, r ? (pe = ue.alternate, pe !== null ? (pe = pe.index, pe < ne ? (ue.flags |= 2, ne) : pe) : (ue.flags |= 2, ne)) : (ue.flags |= 1048576, ne);
    }
    function A(ue) {
      return r && ue.alternate === null && (ue.flags |= 2), ue;
    }
    function q(ue, ne, pe, Ve) {
      return ne === null || ne.tag !== 6 ? (ne = av(pe, ue.mode, Ve), ne.return = ue, ne) : (ne = y(ne, pe), ne.return = ue, ne);
    }
    function K(ue, ne, pe, Ve) {
      var wt = pe.type;
      return wt === V ? He(ue, ne, pe.props.children, Ve, pe.key) : ne !== null && (ne.elementType === wt || typeof wt == "object" && wt !== null && wt.$$typeof === de && fm(wt) === ne.type) ? (Ve = y(ne, pe.props), Ve.ref = Zo(ue, ne, pe), Ve.return = ue, Ve) : (Ve = Dc(pe.type, pe.key, pe.props, null, ue.mode, Ve), Ve.ref = Zo(ue, ne, pe), Ve.return = ue, Ve);
    }
    function ye(ue, ne, pe, Ve) {
      return ne === null || ne.tag !== 4 || ne.stateNode.containerInfo !== pe.containerInfo || ne.stateNode.implementation !== pe.implementation ? (ne = id(pe, ue.mode, Ve), ne.return = ue, ne) : (ne = y(ne, pe.children || []), ne.return = ue, ne);
    }
    function He(ue, ne, pe, Ve, wt) {
      return ne === null || ne.tag !== 7 ? (ne = Ul(pe, ue.mode, Ve, wt), ne.return = ue, ne) : (ne = y(ne, pe), ne.return = ue, ne);
    }
    function Ge(ue, ne, pe) {
      if (typeof ne == "string" && ne !== "" || typeof ne == "number") return ne = av("" + ne, ue.mode, pe), ne.return = ue, ne;
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case H:
            return pe = Dc(ne.type, ne.key, ne.props, null, ue.mode, pe), pe.ref = Zo(ue, null, ne), pe.return = ue, pe;
          case I:
            return ne = id(ne, ue.mode, pe), ne.return = ue, ne;
          case de:
            var Ve = ne._init;
            return Ge(ue, Ve(ne._payload), pe);
        }
        if (ct(ne) || se(ne)) return ne = Ul(ne, ue.mode, pe, null), ne.return = ue, ne;
        Rf(ue, ne);
      }
      return null;
    }
    function Fe(ue, ne, pe, Ve) {
      var wt = ne !== null ? ne.key : null;
      if (typeof pe == "string" && pe !== "" || typeof pe == "number") return wt !== null ? null : q(ue, ne, "" + pe, Ve);
      if (typeof pe == "object" && pe !== null) {
        switch (pe.$$typeof) {
          case H:
            return pe.key === wt ? K(ue, ne, pe, Ve) : null;
          case I:
            return pe.key === wt ? ye(ue, ne, pe, Ve) : null;
          case de:
            return wt = pe._init, Fe(
              ue,
              ne,
              wt(pe._payload),
              Ve
            );
        }
        if (ct(pe) || se(pe)) return wt !== null ? null : He(ue, ne, pe, Ve, null);
        Rf(ue, pe);
      }
      return null;
    }
    function pt(ue, ne, pe, Ve, wt) {
      if (typeof Ve == "string" && Ve !== "" || typeof Ve == "number") return ue = ue.get(pe) || null, q(ne, ue, "" + Ve, wt);
      if (typeof Ve == "object" && Ve !== null) {
        switch (Ve.$$typeof) {
          case H:
            return ue = ue.get(Ve.key === null ? pe : Ve.key) || null, K(ne, ue, Ve, wt);
          case I:
            return ue = ue.get(Ve.key === null ? pe : Ve.key) || null, ye(ne, ue, Ve, wt);
          case de:
            var jt = Ve._init;
            return pt(ue, ne, pe, jt(Ve._payload), wt);
        }
        if (ct(Ve) || se(Ve)) return ue = ue.get(pe) || null, He(ne, ue, Ve, wt, null);
        Rf(ne, Ve);
      }
      return null;
    }
    function xt(ue, ne, pe, Ve) {
      for (var wt = null, jt = null, Pt = ne, Gt = ne = 0, jr = null; Pt !== null && Gt < pe.length; Gt++) {
        Pt.index > Gt ? (jr = Pt, Pt = null) : jr = Pt.sibling;
        var Rn = Fe(ue, Pt, pe[Gt], Ve);
        if (Rn === null) {
          Pt === null && (Pt = jr);
          break;
        }
        r && Pt && Rn.alternate === null && i(ue, Pt), ne = w(Rn, ne, Gt), jt === null ? wt = Rn : jt.sibling = Rn, jt = Rn, Pt = jr;
      }
      if (Gt === pe.length) return u(ue, Pt), Xn && Ko(ue, Gt), wt;
      if (Pt === null) {
        for (; Gt < pe.length; Gt++) Pt = Ge(ue, pe[Gt], Ve), Pt !== null && (ne = w(Pt, ne, Gt), jt === null ? wt = Pt : jt.sibling = Pt, jt = Pt);
        return Xn && Ko(ue, Gt), wt;
      }
      for (Pt = d(ue, Pt); Gt < pe.length; Gt++) jr = pt(Pt, ue, Gt, pe[Gt], Ve), jr !== null && (r && jr.alternate !== null && Pt.delete(jr.key === null ? Gt : jr.key), ne = w(jr, ne, Gt), jt === null ? wt = jr : jt.sibling = jr, jt = jr);
      return r && Pt.forEach(function(Co) {
        return i(ue, Co);
      }), Xn && Ko(ue, Gt), wt;
    }
    function Tt(ue, ne, pe, Ve) {
      var wt = se(pe);
      if (typeof wt != "function") throw Error(s(150));
      if (pe = wt.call(pe), pe == null) throw Error(s(151));
      for (var jt = wt = null, Pt = ne, Gt = ne = 0, jr = null, Rn = pe.next(); Pt !== null && !Rn.done; Gt++, Rn = pe.next()) {
        Pt.index > Gt ? (jr = Pt, Pt = null) : jr = Pt.sibling;
        var Co = Fe(ue, Pt, Rn.value, Ve);
        if (Co === null) {
          Pt === null && (Pt = jr);
          break;
        }
        r && Pt && Co.alternate === null && i(ue, Pt), ne = w(Co, ne, Gt), jt === null ? wt = Co : jt.sibling = Co, jt = Co, Pt = jr;
      }
      if (Rn.done) return u(
        ue,
        Pt
      ), Xn && Ko(ue, Gt), wt;
      if (Pt === null) {
        for (; !Rn.done; Gt++, Rn = pe.next()) Rn = Ge(ue, Rn.value, Ve), Rn !== null && (ne = w(Rn, ne, Gt), jt === null ? wt = Rn : jt.sibling = Rn, jt = Rn);
        return Xn && Ko(ue, Gt), wt;
      }
      for (Pt = d(ue, Pt); !Rn.done; Gt++, Rn = pe.next()) Rn = pt(Pt, ue, Gt, Rn.value, Ve), Rn !== null && (r && Rn.alternate !== null && Pt.delete(Rn.key === null ? Gt : Rn.key), ne = w(Rn, ne, Gt), jt === null ? wt = Rn : jt.sibling = Rn, jt = Rn);
      return r && Pt.forEach(function(Gm) {
        return i(ue, Gm);
      }), Xn && Ko(ue, Gt), wt;
    }
    function fr(ue, ne, pe, Ve) {
      if (typeof pe == "object" && pe !== null && pe.type === V && pe.key === null && (pe = pe.props.children), typeof pe == "object" && pe !== null) {
        switch (pe.$$typeof) {
          case H:
            e: {
              for (var wt = pe.key, jt = ne; jt !== null; ) {
                if (jt.key === wt) {
                  if (wt = pe.type, wt === V) {
                    if (jt.tag === 7) {
                      u(ue, jt.sibling), ne = y(jt, pe.props.children), ne.return = ue, ue = ne;
                      break e;
                    }
                  } else if (jt.elementType === wt || typeof wt == "object" && wt !== null && wt.$$typeof === de && fm(wt) === jt.type) {
                    u(ue, jt.sibling), ne = y(jt, pe.props), ne.ref = Zo(ue, jt, pe), ne.return = ue, ue = ne;
                    break e;
                  }
                  u(ue, jt);
                  break;
                } else i(ue, jt);
                jt = jt.sibling;
              }
              pe.type === V ? (ne = Ul(pe.props.children, ue.mode, Ve, pe.key), ne.return = ue, ue = ne) : (Ve = Dc(pe.type, pe.key, pe.props, null, ue.mode, Ve), Ve.ref = Zo(ue, ne, pe), Ve.return = ue, ue = Ve);
            }
            return A(ue);
          case I:
            e: {
              for (jt = pe.key; ne !== null; ) {
                if (ne.key === jt) if (ne.tag === 4 && ne.stateNode.containerInfo === pe.containerInfo && ne.stateNode.implementation === pe.implementation) {
                  u(ue, ne.sibling), ne = y(ne, pe.children || []), ne.return = ue, ue = ne;
                  break e;
                } else {
                  u(ue, ne);
                  break;
                }
                else i(ue, ne);
                ne = ne.sibling;
              }
              ne = id(pe, ue.mode, Ve), ne.return = ue, ue = ne;
            }
            return A(ue);
          case de:
            return jt = pe._init, fr(ue, ne, jt(pe._payload), Ve);
        }
        if (ct(pe)) return xt(ue, ne, pe, Ve);
        if (se(pe)) return Tt(ue, ne, pe, Ve);
        Rf(ue, pe);
      }
      return typeof pe == "string" && pe !== "" || typeof pe == "number" ? (pe = "" + pe, ne !== null && ne.tag === 6 ? (u(ue, ne.sibling), ne = y(ne, pe), ne.return = ue, ue = ne) : (u(ue, ne), ne = av(pe, ue.mode, Ve), ne.return = ue, ue = ne), A(ue)) : u(ue, ne);
    }
    return fr;
  }
  var or = Jo(!0), ot = Jo(!1), Ga = ci(null), za = null, Js = null, _p = null;
  function kp() {
    _p = Js = za = null;
  }
  function Dp(r) {
    var i = Ga.current;
    Pn(Ga), r._currentValue = i;
  }
  function Op(r, i, u) {
    for (; r !== null; ) {
      var d = r.alternate;
      if ((r.childLanes & i) !== i ? (r.childLanes |= i, d !== null && (d.childLanes |= i)) : d !== null && (d.childLanes & i) !== i && (d.childLanes |= i), r === u) break;
      r = r.return;
    }
  }
  function tr(r, i) {
    za = r, _p = Js = null, r = r.dependencies, r !== null && r.firstContext !== null && ((r.lanes & i) !== 0 && (Sr = !0), r.firstContext = null);
  }
  function pi(r) {
    var i = r._currentValue;
    if (_p !== r) if (r = { context: r, memoizedValue: i, next: null }, Js === null) {
      if (za === null) throw Error(s(308));
      Js = r, za.dependencies = { lanes: 0, firstContext: r };
    } else Js = Js.next = r;
    return i;
  }
  var es = null;
  function Ap(r) {
    es === null ? es = [r] : es.push(r);
  }
  function zp(r, i, u, d) {
    var y = i.interleaved;
    return y === null ? (u.next = u, Ap(i)) : (u.next = y.next, y.next = u), i.interleaved = u, Qa(r, d);
  }
  function Qa(r, i) {
    r.lanes |= i;
    var u = r.alternate;
    for (u !== null && (u.lanes |= i), u = r, r = r.return; r !== null; ) r.childLanes |= i, u = r.alternate, u !== null && (u.childLanes |= i), u = r, r = r.return;
    return u.tag === 3 ? u.stateNode : null;
  }
  var Ba = !1;
  function Lp(r) {
    r.updateQueue = { baseState: r.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function dm(r, i) {
    r = r.updateQueue, i.updateQueue === r && (i.updateQueue = { baseState: r.baseState, firstBaseUpdate: r.firstBaseUpdate, lastBaseUpdate: r.lastBaseUpdate, shared: r.shared, effects: r.effects });
  }
  function Ol(r, i) {
    return { eventTime: r, lane: i, tag: 0, payload: null, callback: null, next: null };
  }
  function vo(r, i, u) {
    var d = r.updateQueue;
    if (d === null) return null;
    if (d = d.shared, (vn & 2) !== 0) {
      var y = d.pending;
      return y === null ? i.next = i : (i.next = y.next, y.next = i), d.pending = i, Qa(r, u);
    }
    return y = d.interleaved, y === null ? (i.next = i, Ap(d)) : (i.next = y.next, y.next = i), d.interleaved = i, Qa(r, u);
  }
  function Mf(r, i, u) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (u & 4194240) !== 0)) {
      var d = i.lanes;
      d &= r.pendingLanes, u |= d, i.lanes = u, wl(r, u);
    }
  }
  function pm(r, i) {
    var u = r.updateQueue, d = r.alternate;
    if (d !== null && (d = d.updateQueue, u === d)) {
      var y = null, w = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var A = { eventTime: u.eventTime, lane: u.lane, tag: u.tag, payload: u.payload, callback: u.callback, next: null };
          w === null ? y = w = A : w = w.next = A, u = u.next;
        } while (u !== null);
        w === null ? y = w = i : w = w.next = i;
      } else y = w = i;
      u = { baseState: d.baseState, firstBaseUpdate: y, lastBaseUpdate: w, shared: d.shared, effects: d.effects }, r.updateQueue = u;
      return;
    }
    r = u.lastBaseUpdate, r === null ? u.firstBaseUpdate = i : r.next = i, u.lastBaseUpdate = i;
  }
  function tc(r, i, u, d) {
    var y = r.updateQueue;
    Ba = !1;
    var w = y.firstBaseUpdate, A = y.lastBaseUpdate, q = y.shared.pending;
    if (q !== null) {
      y.shared.pending = null;
      var K = q, ye = K.next;
      K.next = null, A === null ? w = ye : A.next = ye, A = K;
      var He = r.alternate;
      He !== null && (He = He.updateQueue, q = He.lastBaseUpdate, q !== A && (q === null ? He.firstBaseUpdate = ye : q.next = ye, He.lastBaseUpdate = K));
    }
    if (w !== null) {
      var Ge = y.baseState;
      A = 0, He = ye = K = null, q = w;
      do {
        var Fe = q.lane, pt = q.eventTime;
        if ((d & Fe) === Fe) {
          He !== null && (He = He.next = {
            eventTime: pt,
            lane: 0,
            tag: q.tag,
            payload: q.payload,
            callback: q.callback,
            next: null
          });
          e: {
            var xt = r, Tt = q;
            switch (Fe = i, pt = u, Tt.tag) {
              case 1:
                if (xt = Tt.payload, typeof xt == "function") {
                  Ge = xt.call(pt, Ge, Fe);
                  break e;
                }
                Ge = xt;
                break e;
              case 3:
                xt.flags = xt.flags & -65537 | 128;
              case 0:
                if (xt = Tt.payload, Fe = typeof xt == "function" ? xt.call(pt, Ge, Fe) : xt, Fe == null) break e;
                Ge = ve({}, Ge, Fe);
                break e;
              case 2:
                Ba = !0;
            }
          }
          q.callback !== null && q.lane !== 0 && (r.flags |= 64, Fe = y.effects, Fe === null ? y.effects = [q] : Fe.push(q));
        } else pt = { eventTime: pt, lane: Fe, tag: q.tag, payload: q.payload, callback: q.callback, next: null }, He === null ? (ye = He = pt, K = Ge) : He = He.next = pt, A |= Fe;
        if (q = q.next, q === null) {
          if (q = y.shared.pending, q === null) break;
          Fe = q, q = Fe.next, Fe.next = null, y.lastBaseUpdate = Fe, y.shared.pending = null;
        }
      } while (!0);
      if (He === null && (K = Ge), y.baseState = K, y.firstBaseUpdate = ye, y.lastBaseUpdate = He, i = y.shared.interleaved, i !== null) {
        y = i;
        do
          A |= y.lane, y = y.next;
        while (y !== i);
      } else w === null && (y.shared.lanes = 0);
      ll |= A, r.lanes = A, r.memoizedState = Ge;
    }
  }
  function Np(r, i, u) {
    if (r = i.effects, i.effects = null, r !== null) for (i = 0; i < r.length; i++) {
      var d = r[i], y = d.callback;
      if (y !== null) {
        if (d.callback = null, d = u, typeof y != "function") throw Error(s(191, y));
        y.call(d);
      }
    }
  }
  var nc = {}, nl = ci(nc), rc = ci(nc), ac = ci(nc);
  function ts(r) {
    if (r === nc) throw Error(s(174));
    return r;
  }
  function Up(r, i) {
    switch (Dt(ac, i), Dt(rc, r), Dt(nl, nc), r = i.nodeType, r) {
      case 9:
      case 11:
        i = (i = i.documentElement) ? i.namespaceURI : Et(null, "");
        break;
      default:
        r = r === 8 ? i.parentNode : i, i = r.namespaceURI || null, r = r.tagName, i = Et(i, r);
    }
    Pn(nl), Dt(nl, i);
  }
  function ns() {
    Pn(nl), Pn(rc), Pn(ac);
  }
  function vm(r) {
    ts(ac.current);
    var i = ts(nl.current), u = Et(i, r.type);
    i !== u && (Dt(rc, r), Dt(nl, u));
  }
  function _f(r) {
    rc.current === r && (Pn(nl), Pn(rc));
  }
  var nr = ci(0);
  function kf(r) {
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
  var ic = [];
  function zt() {
    for (var r = 0; r < ic.length; r++) ic[r]._workInProgressVersionPrimary = null;
    ic.length = 0;
  }
  var ln = N.ReactCurrentDispatcher, Cn = N.ReactCurrentBatchConfig, Ln = 0, Tn = null, gr = null, Nr = null, Df = !1, lc = !1, rs = 0, Ue = 0;
  function wn() {
    throw Error(s(321));
  }
  function Vt(r, i) {
    if (i === null) return !1;
    for (var u = 0; u < i.length && u < r.length; u++) if (!zi(r[u], i[u])) return !1;
    return !0;
  }
  function ho(r, i, u, d, y, w) {
    if (Ln = w, Tn = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, ln.current = r === null || r.memoizedState === null ? Yf : dc, r = u(d, y), lc) {
      w = 0;
      do {
        if (lc = !1, rs = 0, 25 <= w) throw Error(s(301));
        w += 1, Nr = gr = null, i.updateQueue = null, ln.current = Wf, r = u(d, y);
      } while (lc);
    }
    if (ln.current = ss, i = gr !== null && gr.next !== null, Ln = 0, Nr = gr = Tn = null, Df = !1, i) throw Error(s(300));
    return r;
  }
  function Ni() {
    var r = rs !== 0;
    return rs = 0, r;
  }
  function ta() {
    var r = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Nr === null ? Tn.memoizedState = Nr = r : Nr = Nr.next = r, Nr;
  }
  function sr() {
    if (gr === null) {
      var r = Tn.alternate;
      r = r !== null ? r.memoizedState : null;
    } else r = gr.next;
    var i = Nr === null ? Tn.memoizedState : Nr.next;
    if (i !== null) Nr = i, gr = r;
    else {
      if (r === null) throw Error(s(310));
      gr = r, r = { memoizedState: gr.memoizedState, baseState: gr.baseState, baseQueue: gr.baseQueue, queue: gr.queue, next: null }, Nr === null ? Tn.memoizedState = Nr = r : Nr = Nr.next = r;
    }
    return Nr;
  }
  function Al(r, i) {
    return typeof i == "function" ? i(r) : i;
  }
  function mo(r) {
    var i = sr(), u = i.queue;
    if (u === null) throw Error(s(311));
    u.lastRenderedReducer = r;
    var d = gr, y = d.baseQueue, w = u.pending;
    if (w !== null) {
      if (y !== null) {
        var A = y.next;
        y.next = w.next, w.next = A;
      }
      d.baseQueue = y = w, u.pending = null;
    }
    if (y !== null) {
      w = y.next, d = d.baseState;
      var q = A = null, K = null, ye = w;
      do {
        var He = ye.lane;
        if ((Ln & He) === He) K !== null && (K = K.next = { lane: 0, action: ye.action, hasEagerState: ye.hasEagerState, eagerState: ye.eagerState, next: null }), d = ye.hasEagerState ? ye.eagerState : r(d, ye.action);
        else {
          var Ge = {
            lane: He,
            action: ye.action,
            hasEagerState: ye.hasEagerState,
            eagerState: ye.eagerState,
            next: null
          };
          K === null ? (q = K = Ge, A = d) : K = K.next = Ge, Tn.lanes |= He, ll |= He;
        }
        ye = ye.next;
      } while (ye !== null && ye !== w);
      K === null ? A = d : K.next = q, zi(d, i.memoizedState) || (Sr = !0), i.memoizedState = d, i.baseState = A, i.baseQueue = K, u.lastRenderedState = d;
    }
    if (r = u.interleaved, r !== null) {
      y = r;
      do
        w = y.lane, Tn.lanes |= w, ll |= w, y = y.next;
      while (y !== r);
    } else y === null && (u.lanes = 0);
    return [i.memoizedState, u.dispatch];
  }
  function as(r) {
    var i = sr(), u = i.queue;
    if (u === null) throw Error(s(311));
    u.lastRenderedReducer = r;
    var d = u.dispatch, y = u.pending, w = i.memoizedState;
    if (y !== null) {
      u.pending = null;
      var A = y = y.next;
      do
        w = r(w, A.action), A = A.next;
      while (A !== y);
      zi(w, i.memoizedState) || (Sr = !0), i.memoizedState = w, i.baseQueue === null && (i.baseState = w), u.lastRenderedState = w;
    }
    return [w, d];
  }
  function Of() {
  }
  function Af(r, i) {
    var u = Tn, d = sr(), y = i(), w = !zi(d.memoizedState, y);
    if (w && (d.memoizedState = y, Sr = !0), d = d.queue, oc(Nf.bind(null, u, d, r), [r]), d.getSnapshot !== i || w || Nr !== null && Nr.memoizedState.tag & 1) {
      if (u.flags |= 2048, is(9, Lf.bind(null, u, d, y, i), void 0, null), Dr === null) throw Error(s(349));
      (Ln & 30) !== 0 || zf(u, i, y);
    }
    return y;
  }
  function zf(r, i, u) {
    r.flags |= 16384, r = { getSnapshot: i, value: u }, i = Tn.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Tn.updateQueue = i, i.stores = [r]) : (u = i.stores, u === null ? i.stores = [r] : u.push(r));
  }
  function Lf(r, i, u, d) {
    i.value = u, i.getSnapshot = d, Uf(i) && jf(r);
  }
  function Nf(r, i, u) {
    return u(function() {
      Uf(i) && jf(r);
    });
  }
  function Uf(r) {
    var i = r.getSnapshot;
    r = r.value;
    try {
      var u = i();
      return !zi(r, u);
    } catch {
      return !0;
    }
  }
  function jf(r) {
    var i = Qa(r, 1);
    i !== null && ma(i, r, 1, -1);
  }
  function Ff(r) {
    var i = ta();
    return typeof r == "function" && (r = r()), i.memoizedState = i.baseState = r, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Al, lastRenderedState: r }, i.queue = r, r = r.dispatch = os.bind(null, Tn, r), [i.memoizedState, r];
  }
  function is(r, i, u, d) {
    return r = { tag: r, create: i, destroy: u, deps: d, next: null }, i = Tn.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Tn.updateQueue = i, i.lastEffect = r.next = r) : (u = i.lastEffect, u === null ? i.lastEffect = r.next = r : (d = u.next, u.next = r, r.next = d, i.lastEffect = r)), r;
  }
  function Pf() {
    return sr().memoizedState;
  }
  function eu(r, i, u, d) {
    var y = ta();
    Tn.flags |= r, y.memoizedState = is(1 | i, u, void 0, d === void 0 ? null : d);
  }
  function tu(r, i, u, d) {
    var y = sr();
    d = d === void 0 ? null : d;
    var w = void 0;
    if (gr !== null) {
      var A = gr.memoizedState;
      if (w = A.destroy, d !== null && Vt(d, A.deps)) {
        y.memoizedState = is(i, u, w, d);
        return;
      }
    }
    Tn.flags |= r, y.memoizedState = is(1 | i, u, w, d);
  }
  function $f(r, i) {
    return eu(8390656, 8, r, i);
  }
  function oc(r, i) {
    return tu(2048, 8, r, i);
  }
  function Hf(r, i) {
    return tu(4, 2, r, i);
  }
  function sc(r, i) {
    return tu(4, 4, r, i);
  }
  function ls(r, i) {
    if (typeof i == "function") return r = r(), i(r), function() {
      i(null);
    };
    if (i != null) return r = r(), i.current = r, function() {
      i.current = null;
    };
  }
  function Vf(r, i, u) {
    return u = u != null ? u.concat([r]) : null, tu(4, 4, ls.bind(null, i, r), u);
  }
  function uc() {
  }
  function If(r, i) {
    var u = sr();
    i = i === void 0 ? null : i;
    var d = u.memoizedState;
    return d !== null && i !== null && Vt(i, d[1]) ? d[0] : (u.memoizedState = [r, i], r);
  }
  function qf(r, i) {
    var u = sr();
    i = i === void 0 ? null : i;
    var d = u.memoizedState;
    return d !== null && i !== null && Vt(i, d[1]) ? d[0] : (r = r(), u.memoizedState = [r, i], r);
  }
  function jp(r, i, u) {
    return (Ln & 21) === 0 ? (r.baseState && (r.baseState = !1, Sr = !0), r.memoizedState = u) : (zi(u, i) || (u = Ls(), Tn.lanes |= u, ll |= u, r.baseState = !0), i);
  }
  function cc(r, i) {
    var u = bn;
    bn = u !== 0 && 4 > u ? u : 4, r(!0);
    var d = Cn.transition;
    Cn.transition = {};
    try {
      r(!1), i();
    } finally {
      bn = u, Cn.transition = d;
    }
  }
  function Fp() {
    return sr().memoizedState;
  }
  function fc(r, i, u) {
    var d = ol(r);
    if (u = { lane: d, action: u, hasEagerState: !1, eagerState: null, next: null }, La(r)) hm(i, u);
    else if (u = zp(r, i, u, d), u !== null) {
      var y = wr();
      ma(u, r, d, y), jn(u, i, d);
    }
  }
  function os(r, i, u) {
    var d = ol(r), y = { lane: d, action: u, hasEagerState: !1, eagerState: null, next: null };
    if (La(r)) hm(i, y);
    else {
      var w = r.alternate;
      if (r.lanes === 0 && (w === null || w.lanes === 0) && (w = i.lastRenderedReducer, w !== null)) try {
        var A = i.lastRenderedState, q = w(A, u);
        if (y.hasEagerState = !0, y.eagerState = q, zi(q, A)) {
          var K = i.interleaved;
          K === null ? (y.next = y, Ap(i)) : (y.next = K.next, K.next = y), i.interleaved = y;
          return;
        }
      } catch {
      }
      u = zp(r, i, y, d), u !== null && (y = wr(), ma(u, r, d, y), jn(u, i, d));
    }
  }
  function La(r) {
    var i = r.alternate;
    return r === Tn || i !== null && i === Tn;
  }
  function hm(r, i) {
    lc = Df = !0;
    var u = r.pending;
    u === null ? i.next = i : (i.next = u.next, u.next = i), r.pending = i;
  }
  function jn(r, i, u) {
    if ((u & 4194240) !== 0) {
      var d = i.lanes;
      d &= r.pendingLanes, u |= d, i.lanes = u, wl(r, u);
    }
  }
  var ss = { readContext: pi, useCallback: wn, useContext: wn, useEffect: wn, useImperativeHandle: wn, useInsertionEffect: wn, useLayoutEffect: wn, useMemo: wn, useReducer: wn, useRef: wn, useState: wn, useDebugValue: wn, useDeferredValue: wn, useTransition: wn, useMutableSource: wn, useSyncExternalStore: wn, useId: wn, unstable_isNewReconciler: !1 }, Yf = { readContext: pi, useCallback: function(r, i) {
    return ta().memoizedState = [r, i === void 0 ? null : i], r;
  }, useContext: pi, useEffect: $f, useImperativeHandle: function(r, i, u) {
    return u = u != null ? u.concat([r]) : null, eu(
      4194308,
      4,
      ls.bind(null, i, r),
      u
    );
  }, useLayoutEffect: function(r, i) {
    return eu(4194308, 4, r, i);
  }, useInsertionEffect: function(r, i) {
    return eu(4, 2, r, i);
  }, useMemo: function(r, i) {
    var u = ta();
    return i = i === void 0 ? null : i, r = r(), u.memoizedState = [r, i], r;
  }, useReducer: function(r, i, u) {
    var d = ta();
    return i = u !== void 0 ? u(i) : i, d.memoizedState = d.baseState = i, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: r, lastRenderedState: i }, d.queue = r, r = r.dispatch = fc.bind(null, Tn, r), [d.memoizedState, r];
  }, useRef: function(r) {
    var i = ta();
    return r = { current: r }, i.memoizedState = r;
  }, useState: Ff, useDebugValue: uc, useDeferredValue: function(r) {
    return ta().memoizedState = r;
  }, useTransition: function() {
    var r = Ff(!1), i = r[0];
    return r = cc.bind(null, r[1]), ta().memoizedState = r, [i, r];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(r, i, u) {
    var d = Tn, y = ta();
    if (Xn) {
      if (u === void 0) throw Error(s(407));
      u = u();
    } else {
      if (u = i(), Dr === null) throw Error(s(349));
      (Ln & 30) !== 0 || zf(d, i, u);
    }
    y.memoizedState = u;
    var w = { value: u, getSnapshot: i };
    return y.queue = w, $f(Nf.bind(
      null,
      d,
      w,
      r
    ), [r]), d.flags |= 2048, is(9, Lf.bind(null, d, w, u, i), void 0, null), u;
  }, useId: function() {
    var r = ta(), i = Dr.identifierPrefix;
    if (Xn) {
      var u = tl, d = el;
      u = (d & ~(1 << 32 - $r(d) - 1)).toString(32) + u, i = ":" + i + "R" + u, u = rs++, 0 < u && (i += "H" + u.toString(32)), i += ":";
    } else u = Ue++, i = ":" + i + "r" + u.toString(32) + ":";
    return r.memoizedState = i;
  }, unstable_isNewReconciler: !1 }, dc = {
    readContext: pi,
    useCallback: If,
    useContext: pi,
    useEffect: oc,
    useImperativeHandle: Vf,
    useInsertionEffect: Hf,
    useLayoutEffect: sc,
    useMemo: qf,
    useReducer: mo,
    useRef: Pf,
    useState: function() {
      return mo(Al);
    },
    useDebugValue: uc,
    useDeferredValue: function(r) {
      var i = sr();
      return jp(i, gr.memoizedState, r);
    },
    useTransition: function() {
      var r = mo(Al)[0], i = sr().memoizedState;
      return [r, i];
    },
    useMutableSource: Of,
    useSyncExternalStore: Af,
    useId: Fp,
    unstable_isNewReconciler: !1
  }, Wf = { readContext: pi, useCallback: If, useContext: pi, useEffect: oc, useImperativeHandle: Vf, useInsertionEffect: Hf, useLayoutEffect: sc, useMemo: qf, useReducer: as, useRef: Pf, useState: function() {
    return as(Al);
  }, useDebugValue: uc, useDeferredValue: function(r) {
    var i = sr();
    return gr === null ? i.memoizedState = r : jp(i, gr.memoizedState, r);
  }, useTransition: function() {
    var r = as(Al)[0], i = sr().memoizedState;
    return [r, i];
  }, useMutableSource: Of, useSyncExternalStore: Af, useId: Fp, unstable_isNewReconciler: !1 };
  function Ui(r, i) {
    if (r && r.defaultProps) {
      i = ve({}, i), r = r.defaultProps;
      for (var u in r) i[u] === void 0 && (i[u] = r[u]);
      return i;
    }
    return i;
  }
  function Pp(r, i, u, d) {
    i = r.memoizedState, u = u(d, i), u = u == null ? i : ve({}, i, u), r.memoizedState = u, r.lanes === 0 && (r.updateQueue.baseState = u);
  }
  var Gf = { isMounted: function(r) {
    return (r = r._reactInternals) ? Yt(r) === r : !1;
  }, enqueueSetState: function(r, i, u) {
    r = r._reactInternals;
    var d = wr(), y = ol(r), w = Ol(d, y);
    w.payload = i, u != null && (w.callback = u), i = vo(r, w, y), i !== null && (ma(i, r, y, d), Mf(i, r, y));
  }, enqueueReplaceState: function(r, i, u) {
    r = r._reactInternals;
    var d = wr(), y = ol(r), w = Ol(d, y);
    w.tag = 1, w.payload = i, u != null && (w.callback = u), i = vo(r, w, y), i !== null && (ma(i, r, y, d), Mf(i, r, y));
  }, enqueueForceUpdate: function(r, i) {
    r = r._reactInternals;
    var u = wr(), d = ol(r), y = Ol(u, d);
    y.tag = 2, i != null && (y.callback = i), i = vo(r, y, d), i !== null && (ma(i, r, d, u), Mf(i, r, d));
  } };
  function mm(r, i, u, d, y, w, A) {
    return r = r.stateNode, typeof r.shouldComponentUpdate == "function" ? r.shouldComponentUpdate(d, w, A) : i.prototype && i.prototype.isPureReactComponent ? !Yu(u, d) || !Yu(y, w) : !0;
  }
  function Qf(r, i, u) {
    var d = !1, y = ea, w = i.contextType;
    return typeof w == "object" && w !== null ? w = pi(w) : (y = mr(i) ? ka : ir.current, d = i.contextTypes, w = (d = d != null) ? Da(r, y) : ea), i = new i(u, w), r.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = Gf, r.stateNode = i, i._reactInternals = r, d && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = y, r.__reactInternalMemoizedMaskedChildContext = w), i;
  }
  function ym(r, i, u, d) {
    r = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(u, d), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(u, d), i.state !== r && Gf.enqueueReplaceState(i, i.state, null);
  }
  function pc(r, i, u, d) {
    var y = r.stateNode;
    y.props = u, y.state = r.memoizedState, y.refs = {}, Lp(r);
    var w = i.contextType;
    typeof w == "object" && w !== null ? y.context = pi(w) : (w = mr(i) ? ka : ir.current, y.context = Da(r, w)), y.state = r.memoizedState, w = i.getDerivedStateFromProps, typeof w == "function" && (Pp(r, i, w, u), y.state = r.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof y.getSnapshotBeforeUpdate == "function" || typeof y.UNSAFE_componentWillMount != "function" && typeof y.componentWillMount != "function" || (i = y.state, typeof y.componentWillMount == "function" && y.componentWillMount(), typeof y.UNSAFE_componentWillMount == "function" && y.UNSAFE_componentWillMount(), i !== y.state && Gf.enqueueReplaceState(y, y.state, null), tc(r, u, y, d), y.state = r.memoizedState), typeof y.componentDidMount == "function" && (r.flags |= 4194308);
  }
  function us(r, i) {
    try {
      var u = "", d = i;
      do
        u += Le(d), d = d.return;
      while (d);
      var y = u;
    } catch (w) {
      y = `
Error generating stack: ` + w.message + `
` + w.stack;
    }
    return { value: r, source: i, stack: y, digest: null };
  }
  function $p(r, i, u) {
    return { value: r, source: null, stack: u ?? null, digest: i ?? null };
  }
  function Hp(r, i) {
    try {
      console.error(i.value);
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  var Bf = typeof WeakMap == "function" ? WeakMap : Map;
  function gm(r, i, u) {
    u = Ol(-1, u), u.tag = 3, u.payload = { element: null };
    var d = i.value;
    return u.callback = function() {
      ou || (ou = !0, ds = d), Hp(r, i);
    }, u;
  }
  function Vp(r, i, u) {
    u = Ol(-1, u), u.tag = 3;
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var y = i.value;
      u.payload = function() {
        return d(y);
      }, u.callback = function() {
        Hp(r, i);
      };
    }
    var w = r.stateNode;
    return w !== null && typeof w.componentDidCatch == "function" && (u.callback = function() {
      Hp(r, i), typeof d != "function" && (So === null ? So = /* @__PURE__ */ new Set([this]) : So.add(this));
      var A = i.stack;
      this.componentDidCatch(i.value, { componentStack: A !== null ? A : "" });
    }), u;
  }
  function Ip(r, i, u) {
    var d = r.pingCache;
    if (d === null) {
      d = r.pingCache = new Bf();
      var y = /* @__PURE__ */ new Set();
      d.set(i, y);
    } else y = d.get(i), y === void 0 && (y = /* @__PURE__ */ new Set(), d.set(i, y));
    y.has(u) || (y.add(u), r = M1.bind(null, r, i, u), i.then(r, r));
  }
  function Sm(r) {
    do {
      var i;
      if ((i = r.tag === 13) && (i = r.memoizedState, i = i !== null ? i.dehydrated !== null : !0), i) return r;
      r = r.return;
    } while (r !== null);
    return null;
  }
  function yo(r, i, u, d, y) {
    return (r.mode & 1) === 0 ? (r === i ? r.flags |= 65536 : (r.flags |= 128, u.flags |= 131072, u.flags &= -52805, u.tag === 1 && (u.alternate === null ? u.tag = 17 : (i = Ol(-1, 1), i.tag = 2, vo(u, i, 1))), u.lanes |= 1), r) : (r.flags |= 65536, r.lanes = y, r);
  }
  var vc = N.ReactCurrentOwner, Sr = !1;
  function Ir(r, i, u, d) {
    i.child = r === null ? ot(i, null, u, d) : or(i, r.child, u, d);
  }
  function Na(r, i, u, d, y) {
    u = u.render;
    var w = i.ref;
    return tr(i, y), d = ho(r, i, u, d, w, y), u = Ni(), r !== null && !Sr ? (i.updateQueue = r.updateQueue, i.flags &= -2053, r.lanes &= ~y, hi(r, i, y)) : (Xn && u && bf(i), i.flags |= 1, Ir(r, i, d, y), i.child);
  }
  function cs(r, i, u, d, y) {
    if (r === null) {
      var w = u.type;
      return typeof w == "function" && !rv(w) && w.defaultProps === void 0 && u.compare === null && u.defaultProps === void 0 ? (i.tag = 15, i.type = w, en(r, i, w, d, y)) : (r = Dc(u.type, null, d, i, i.mode, y), r.ref = i.ref, r.return = i, i.child = r);
    }
    if (w = r.child, (r.lanes & y) === 0) {
      var A = w.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Yu, u(A, d) && r.ref === i.ref) return hi(r, i, y);
    }
    return i.flags |= 1, r = xo(w, d), r.ref = i.ref, r.return = i, i.child = r;
  }
  function en(r, i, u, d, y) {
    if (r !== null) {
      var w = r.memoizedProps;
      if (Yu(w, d) && r.ref === i.ref) if (Sr = !1, i.pendingProps = d = w, (r.lanes & y) !== 0) (r.flags & 131072) !== 0 && (Sr = !0);
      else return i.lanes = r.lanes, hi(r, i, y);
    }
    return Em(r, i, u, d, y);
  }
  function hc(r, i, u) {
    var d = i.pendingProps, y = d.children, w = r !== null ? r.memoizedState : null;
    if (d.mode === "hidden") if ((i.mode & 1) === 0) i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Dt(au, Xa), Xa |= u;
    else {
      if ((u & 1073741824) === 0) return r = w !== null ? w.baseLanes | u : u, i.lanes = i.childLanes = 1073741824, i.memoizedState = { baseLanes: r, cachePool: null, transitions: null }, i.updateQueue = null, Dt(au, Xa), Xa |= r, null;
      i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, d = w !== null ? w.baseLanes : u, Dt(au, Xa), Xa |= d;
    }
    else w !== null ? (d = w.baseLanes | u, i.memoizedState = null) : d = u, Dt(au, Xa), Xa |= d;
    return Ir(r, i, y, u), i.child;
  }
  function qp(r, i) {
    var u = i.ref;
    (r === null && u !== null || r !== null && r.ref !== u) && (i.flags |= 512, i.flags |= 2097152);
  }
  function Em(r, i, u, d, y) {
    var w = mr(u) ? ka : ir.current;
    return w = Da(i, w), tr(i, y), u = ho(r, i, u, d, w, y), d = Ni(), r !== null && !Sr ? (i.updateQueue = r.updateQueue, i.flags &= -2053, r.lanes &= ~y, hi(r, i, y)) : (Xn && d && bf(i), i.flags |= 1, Ir(r, i, u, y), i.child);
  }
  function xm(r, i, u, d, y) {
    if (mr(u)) {
      var w = !0;
      Lr(i);
    } else w = !1;
    if (tr(i, y), i.stateNode === null) vi(r, i), Qf(i, u, d), pc(i, u, d, y), d = !0;
    else if (r === null) {
      var A = i.stateNode, q = i.memoizedProps;
      A.props = q;
      var K = A.context, ye = u.contextType;
      typeof ye == "object" && ye !== null ? ye = pi(ye) : (ye = mr(u) ? ka : ir.current, ye = Da(i, ye));
      var He = u.getDerivedStateFromProps, Ge = typeof He == "function" || typeof A.getSnapshotBeforeUpdate == "function";
      Ge || typeof A.UNSAFE_componentWillReceiveProps != "function" && typeof A.componentWillReceiveProps != "function" || (q !== d || K !== ye) && ym(i, A, d, ye), Ba = !1;
      var Fe = i.memoizedState;
      A.state = Fe, tc(i, d, A, y), K = i.memoizedState, q !== d || Fe !== K || _r.current || Ba ? (typeof He == "function" && (Pp(i, u, He, d), K = i.memoizedState), (q = Ba || mm(i, u, q, d, Fe, K, ye)) ? (Ge || typeof A.UNSAFE_componentWillMount != "function" && typeof A.componentWillMount != "function" || (typeof A.componentWillMount == "function" && A.componentWillMount(), typeof A.UNSAFE_componentWillMount == "function" && A.UNSAFE_componentWillMount()), typeof A.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof A.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = d, i.memoizedState = K), A.props = d, A.state = K, A.context = ye, d = q) : (typeof A.componentDidMount == "function" && (i.flags |= 4194308), d = !1);
    } else {
      A = i.stateNode, dm(r, i), q = i.memoizedProps, ye = i.type === i.elementType ? q : Ui(i.type, q), A.props = ye, Ge = i.pendingProps, Fe = A.context, K = u.contextType, typeof K == "object" && K !== null ? K = pi(K) : (K = mr(u) ? ka : ir.current, K = Da(i, K));
      var pt = u.getDerivedStateFromProps;
      (He = typeof pt == "function" || typeof A.getSnapshotBeforeUpdate == "function") || typeof A.UNSAFE_componentWillReceiveProps != "function" && typeof A.componentWillReceiveProps != "function" || (q !== Ge || Fe !== K) && ym(i, A, d, K), Ba = !1, Fe = i.memoizedState, A.state = Fe, tc(i, d, A, y);
      var xt = i.memoizedState;
      q !== Ge || Fe !== xt || _r.current || Ba ? (typeof pt == "function" && (Pp(i, u, pt, d), xt = i.memoizedState), (ye = Ba || mm(i, u, ye, d, Fe, xt, K) || !1) ? (He || typeof A.UNSAFE_componentWillUpdate != "function" && typeof A.componentWillUpdate != "function" || (typeof A.componentWillUpdate == "function" && A.componentWillUpdate(d, xt, K), typeof A.UNSAFE_componentWillUpdate == "function" && A.UNSAFE_componentWillUpdate(d, xt, K)), typeof A.componentDidUpdate == "function" && (i.flags |= 4), typeof A.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof A.componentDidUpdate != "function" || q === r.memoizedProps && Fe === r.memoizedState || (i.flags |= 4), typeof A.getSnapshotBeforeUpdate != "function" || q === r.memoizedProps && Fe === r.memoizedState || (i.flags |= 1024), i.memoizedProps = d, i.memoizedState = xt), A.props = d, A.state = xt, A.context = K, d = ye) : (typeof A.componentDidUpdate != "function" || q === r.memoizedProps && Fe === r.memoizedState || (i.flags |= 4), typeof A.getSnapshotBeforeUpdate != "function" || q === r.memoizedProps && Fe === r.memoizedState || (i.flags |= 1024), d = !1);
    }
    return mc(r, i, u, d, w, y);
  }
  function mc(r, i, u, d, y, w) {
    qp(r, i);
    var A = (i.flags & 128) !== 0;
    if (!d && !A) return y && xf(i, u, !1), hi(r, i, w);
    d = i.stateNode, vc.current = i;
    var q = A && typeof u.getDerivedStateFromError != "function" ? null : d.render();
    return i.flags |= 1, r !== null && A ? (i.child = or(i, r.child, null, w), i.child = or(i, null, q, w)) : Ir(r, i, q, w), i.memoizedState = d.state, y && xf(i, u, !0), i.child;
  }
  function nu(r) {
    var i = r.stateNode;
    i.pendingContext ? sm(r, i.pendingContext, i.pendingContext !== i.context) : i.context && sm(r, i.context, !1), Up(r, i.containerInfo);
  }
  function wm(r, i, u, d, y) {
    return po(), Dl(y), i.flags |= 256, Ir(r, i, u, d), i.child;
  }
  var Xf = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Yp(r) {
    return { baseLanes: r, cachePool: null, transitions: null };
  }
  function Kf(r, i, u) {
    var d = i.pendingProps, y = nr.current, w = !1, A = (i.flags & 128) !== 0, q;
    if ((q = A) || (q = r !== null && r.memoizedState === null ? !1 : (y & 2) !== 0), q ? (w = !0, i.flags &= -129) : (r === null || r.memoizedState !== null) && (y |= 1), Dt(nr, y & 1), r === null)
      return Mp(i), r = i.memoizedState, r !== null && (r = r.dehydrated, r !== null) ? ((i.mode & 1) === 0 ? i.lanes = 1 : r.data === "$!" ? i.lanes = 8 : i.lanes = 1073741824, null) : (A = d.children, r = d.fallback, w ? (d = i.mode, w = i.child, A = { mode: "hidden", children: A }, (d & 1) === 0 && w !== null ? (w.childLanes = 0, w.pendingProps = A) : w = wo(A, d, 0, null), r = Ul(r, d, u, null), w.return = i, r.return = i, w.sibling = r, i.child = w, i.child.memoizedState = Yp(u), i.memoizedState = Xf, r) : Wp(i, A));
    if (y = r.memoizedState, y !== null && (q = y.dehydrated, q !== null)) return bm(r, i, A, d, q, y, u);
    if (w) {
      w = d.fallback, A = i.mode, y = r.child, q = y.sibling;
      var K = { mode: "hidden", children: d.children };
      return (A & 1) === 0 && i.child !== y ? (d = i.child, d.childLanes = 0, d.pendingProps = K, i.deletions = null) : (d = xo(y, K), d.subtreeFlags = y.subtreeFlags & 14680064), q !== null ? w = xo(q, w) : (w = Ul(w, A, u, null), w.flags |= 2), w.return = i, d.return = i, d.sibling = w, i.child = d, d = w, w = i.child, A = r.child.memoizedState, A = A === null ? Yp(u) : { baseLanes: A.baseLanes | u, cachePool: null, transitions: A.transitions }, w.memoizedState = A, w.childLanes = r.childLanes & ~u, i.memoizedState = Xf, d;
    }
    return w = r.child, r = w.sibling, d = xo(w, { mode: "visible", children: d.children }), (i.mode & 1) === 0 && (d.lanes = u), d.return = i, d.sibling = null, r !== null && (u = i.deletions, u === null ? (i.deletions = [r], i.flags |= 16) : u.push(r)), i.child = d, i.memoizedState = null, d;
  }
  function Wp(r, i) {
    return i = wo({ mode: "visible", children: i }, r.mode, 0, null), i.return = r, r.child = i;
  }
  function yc(r, i, u, d) {
    return d !== null && Dl(d), or(i, r.child, null, u), r = Wp(i, i.pendingProps.children), r.flags |= 2, i.memoizedState = null, r;
  }
  function bm(r, i, u, d, y, w, A) {
    if (u)
      return i.flags & 256 ? (i.flags &= -257, d = $p(Error(s(422))), yc(r, i, A, d)) : i.memoizedState !== null ? (i.child = r.child, i.flags |= 128, null) : (w = d.fallback, y = i.mode, d = wo({ mode: "visible", children: d.children }, y, 0, null), w = Ul(w, y, A, null), w.flags |= 2, d.return = i, w.return = i, d.sibling = w, i.child = d, (i.mode & 1) !== 0 && or(i, r.child, null, A), i.child.memoizedState = Yp(A), i.memoizedState = Xf, w);
    if ((i.mode & 1) === 0) return yc(r, i, A, null);
    if (y.data === "$!") {
      if (d = y.nextSibling && y.nextSibling.dataset, d) var q = d.dgst;
      return d = q, w = Error(s(419)), d = $p(w, d, void 0), yc(r, i, A, d);
    }
    if (q = (A & r.childLanes) !== 0, Sr || q) {
      if (d = Dr, d !== null) {
        switch (A & -A) {
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
        y = (y & (d.suspendedLanes | A)) !== 0 ? 0 : y, y !== 0 && y !== w.retryLane && (w.retryLane = y, Qa(r, y), ma(d, r, y, -1));
      }
      return nv(), d = $p(Error(s(421))), yc(r, i, A, d);
    }
    return y.data === "$?" ? (i.flags |= 128, i.child = r.child, i = _1.bind(null, r), y._reactRetry = i, null) : (r = w.treeContext, Aa = Xi(y.nextSibling), Oa = i, Xn = !0, di = null, r !== null && (yr[fi++] = el, yr[fi++] = tl, yr[fi++] = Wa, el = r.id, tl = r.overflow, Wa = i), i = Wp(i, d.children), i.flags |= 4096, i);
  }
  function Gp(r, i, u) {
    r.lanes |= i;
    var d = r.alternate;
    d !== null && (d.lanes |= i), Op(r.return, i, u);
  }
  function pa(r, i, u, d, y) {
    var w = r.memoizedState;
    w === null ? r.memoizedState = { isBackwards: i, rendering: null, renderingStartTime: 0, last: d, tail: u, tailMode: y } : (w.isBackwards = i, w.rendering = null, w.renderingStartTime = 0, w.last = d, w.tail = u, w.tailMode = y);
  }
  function rl(r, i, u) {
    var d = i.pendingProps, y = d.revealOrder, w = d.tail;
    if (Ir(r, i, d.children, u), d = nr.current, (d & 2) !== 0) d = d & 1 | 2, i.flags |= 128;
    else {
      if (r !== null && (r.flags & 128) !== 0) e: for (r = i.child; r !== null; ) {
        if (r.tag === 13) r.memoizedState !== null && Gp(r, u, i);
        else if (r.tag === 19) Gp(r, u, i);
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
    if (Dt(nr, d), (i.mode & 1) === 0) i.memoizedState = null;
    else switch (y) {
      case "forwards":
        for (u = i.child, y = null; u !== null; ) r = u.alternate, r !== null && kf(r) === null && (y = u), u = u.sibling;
        u = y, u === null ? (y = i.child, i.child = null) : (y = u.sibling, u.sibling = null), pa(i, !1, y, u, w);
        break;
      case "backwards":
        for (u = null, y = i.child, i.child = null; y !== null; ) {
          if (r = y.alternate, r !== null && kf(r) === null) {
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
  function vi(r, i) {
    (i.mode & 1) === 0 && r !== null && (r.alternate = null, i.alternate = null, i.flags |= 2);
  }
  function hi(r, i, u) {
    if (r !== null && (i.dependencies = r.dependencies), ll |= i.lanes, (u & i.childLanes) === 0) return null;
    if (r !== null && i.child !== r.child) throw Error(s(153));
    if (i.child !== null) {
      for (r = i.child, u = xo(r, r.pendingProps), i.child = u, u.return = i; r.sibling !== null; ) r = r.sibling, u = u.sibling = xo(r, r.pendingProps), u.return = i;
      u.sibling = null;
    }
    return i.child;
  }
  function gc(r, i, u) {
    switch (i.tag) {
      case 3:
        nu(i), po();
        break;
      case 5:
        vm(i);
        break;
      case 1:
        mr(i.type) && Lr(i);
        break;
      case 4:
        Up(i, i.stateNode.containerInfo);
        break;
      case 10:
        var d = i.type._context, y = i.memoizedProps.value;
        Dt(Ga, d._currentValue), d._currentValue = y;
        break;
      case 13:
        if (d = i.memoizedState, d !== null)
          return d.dehydrated !== null ? (Dt(nr, nr.current & 1), i.flags |= 128, null) : (u & i.child.childLanes) !== 0 ? Kf(r, i, u) : (Dt(nr, nr.current & 1), r = hi(r, i, u), r !== null ? r.sibling : null);
        Dt(nr, nr.current & 1);
        break;
      case 19:
        if (d = (u & i.childLanes) !== 0, (r.flags & 128) !== 0) {
          if (d) return rl(r, i, u);
          i.flags |= 128;
        }
        if (y = i.memoizedState, y !== null && (y.rendering = null, y.tail = null, y.lastEffect = null), Dt(nr, nr.current), d) break;
        return null;
      case 22:
      case 23:
        return i.lanes = 0, hc(r, i, u);
    }
    return hi(r, i, u);
  }
  var mi, Er, Cm, Tm;
  mi = function(r, i) {
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
  }, Er = function() {
  }, Cm = function(r, i, u, d) {
    var y = r.memoizedProps;
    if (y !== d) {
      r = i.stateNode, ts(nl.current);
      var w = null;
      switch (u) {
        case "input":
          y = Se(r, y), d = Se(r, d), w = [];
          break;
        case "select":
          y = ve({}, y, { value: void 0 }), d = ve({}, d, { value: void 0 }), w = [];
          break;
        case "textarea":
          y = qe(r, y), d = qe(r, d), w = [];
          break;
        default:
          typeof y.onClick != "function" && typeof d.onClick == "function" && (r.onclick = lo);
      }
      Ct(u, d);
      var A;
      u = null;
      for (ye in y) if (!d.hasOwnProperty(ye) && y.hasOwnProperty(ye) && y[ye] != null) if (ye === "style") {
        var q = y[ye];
        for (A in q) q.hasOwnProperty(A) && (u || (u = {}), u[A] = "");
      } else ye !== "dangerouslySetInnerHTML" && ye !== "children" && ye !== "suppressContentEditableWarning" && ye !== "suppressHydrationWarning" && ye !== "autoFocus" && (p.hasOwnProperty(ye) ? w || (w = []) : (w = w || []).push(ye, null));
      for (ye in d) {
        var K = d[ye];
        if (q = y?.[ye], d.hasOwnProperty(ye) && K !== q && (K != null || q != null)) if (ye === "style") if (q) {
          for (A in q) !q.hasOwnProperty(A) || K && K.hasOwnProperty(A) || (u || (u = {}), u[A] = "");
          for (A in K) K.hasOwnProperty(A) && q[A] !== K[A] && (u || (u = {}), u[A] = K[A]);
        } else u || (w || (w = []), w.push(
          ye,
          u
        )), u = K;
        else ye === "dangerouslySetInnerHTML" ? (K = K ? K.__html : void 0, q = q ? q.__html : void 0, K != null && q !== K && (w = w || []).push(ye, K)) : ye === "children" ? typeof K != "string" && typeof K != "number" || (w = w || []).push(ye, "" + K) : ye !== "suppressContentEditableWarning" && ye !== "suppressHydrationWarning" && (p.hasOwnProperty(ye) ? (K != null && ye === "onScroll" && kn("scroll", r), w || q === K || (w = [])) : (w = w || []).push(ye, K));
      }
      u && (w = w || []).push("style", u);
      var ye = w;
      (i.updateQueue = ye) && (i.flags |= 4);
    }
  }, Tm = function(r, i, u, d) {
    u !== d && (i.flags |= 4);
  };
  function Sc(r, i) {
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
  function Ur(r) {
    var i = r.alternate !== null && r.alternate.child === r.child, u = 0, d = 0;
    if (i) for (var y = r.child; y !== null; ) u |= y.lanes | y.childLanes, d |= y.subtreeFlags & 14680064, d |= y.flags & 14680064, y.return = r, y = y.sibling;
    else for (y = r.child; y !== null; ) u |= y.lanes | y.childLanes, d |= y.subtreeFlags, d |= y.flags, y.return = r, y = y.sibling;
    return r.subtreeFlags |= d, r.childLanes = u, i;
  }
  function Rm(r, i, u) {
    var d = i.pendingProps;
    switch (Cf(i), i.tag) {
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
        return mr(i.type) && Ks(), Ur(i), null;
      case 3:
        return d = i.stateNode, ns(), Pn(_r), Pn(ir), zt(), d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), (r === null || r.child === null) && (Tf(i) ? i.flags |= 4 : r === null || r.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, di !== null && (ps(di), di = null))), Er(r, i), Ur(i), null;
      case 5:
        _f(i);
        var y = ts(ac.current);
        if (u = i.type, r !== null && i.stateNode != null) Cm(r, i, u, d, y), r.ref !== i.ref && (i.flags |= 512, i.flags |= 2097152);
        else {
          if (!d) {
            if (i.stateNode === null) throw Error(s(166));
            return Ur(i), null;
          }
          if (r = ts(nl.current), Tf(i)) {
            d = i.stateNode, u = i.type;
            var w = i.memoizedProps;
            switch (d[Ki] = i, d[Ku] = w, r = (i.mode & 1) !== 0, u) {
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
                for (y = 0; y < Qu.length; y++) kn(Qu[y], d);
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
                Ye(d, w), kn("invalid", d);
                break;
              case "select":
                d._wrapperState = { wasMultiple: !!w.multiple }, kn("invalid", d);
                break;
              case "textarea":
                lt(d, w), kn("invalid", d);
            }
            Ct(u, w), y = null;
            for (var A in w) if (w.hasOwnProperty(A)) {
              var q = w[A];
              A === "children" ? typeof q == "string" ? d.textContent !== q && (w.suppressHydrationWarning !== !0 && yf(d.textContent, q, r), y = ["children", q]) : typeof q == "number" && d.textContent !== "" + q && (w.suppressHydrationWarning !== !0 && yf(
                d.textContent,
                q,
                r
              ), y = ["children", "" + q]) : p.hasOwnProperty(A) && q != null && A === "onScroll" && kn("scroll", d);
            }
            switch (u) {
              case "input":
                Be(d), tt(d, w, !0);
                break;
              case "textarea":
                Be(d), St(d);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof w.onClick == "function" && (d.onclick = lo);
            }
            d = y, i.updateQueue = d, d !== null && (i.flags |= 4);
          } else {
            A = y.nodeType === 9 ? y : y.ownerDocument, r === "http://www.w3.org/1999/xhtml" && (r = et(u)), r === "http://www.w3.org/1999/xhtml" ? u === "script" ? (r = A.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(r.firstChild)) : typeof d.is == "string" ? r = A.createElement(u, { is: d.is }) : (r = A.createElement(u), u === "select" && (A = r, d.multiple ? A.multiple = !0 : d.size && (A.size = d.size))) : r = A.createElementNS(r, u), r[Ki] = i, r[Ku] = d, mi(r, i, !1, !1), i.stateNode = r;
            e: {
              switch (A = ht(u, d), u) {
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
                  for (y = 0; y < Qu.length; y++) kn(Qu[y], r);
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
                  Ye(r, d), y = Se(r, d), kn("invalid", r);
                  break;
                case "option":
                  y = d;
                  break;
                case "select":
                  r._wrapperState = { wasMultiple: !!d.multiple }, y = ve({}, d, { value: void 0 }), kn("invalid", r);
                  break;
                case "textarea":
                  lt(r, d), y = qe(r, d), kn("invalid", r);
                  break;
                default:
                  y = d;
              }
              Ct(u, y), q = y;
              for (w in q) if (q.hasOwnProperty(w)) {
                var K = q[w];
                w === "style" ? Mt(r, K) : w === "dangerouslySetInnerHTML" ? (K = K ? K.__html : void 0, K != null && $t(r, K)) : w === "children" ? typeof K == "string" ? (u !== "textarea" || K !== "") && we(r, K) : typeof K == "number" && we(r, "" + K) : w !== "suppressContentEditableWarning" && w !== "suppressHydrationWarning" && w !== "autoFocus" && (p.hasOwnProperty(w) ? K != null && w === "onScroll" && kn("scroll", r) : K != null && P(r, w, K, A));
              }
              switch (u) {
                case "input":
                  Be(r), tt(r, d, !1);
                  break;
                case "textarea":
                  Be(r), St(r);
                  break;
                case "option":
                  d.value != null && r.setAttribute("value", "" + Pe(d.value));
                  break;
                case "select":
                  r.multiple = !!d.multiple, w = d.value, w != null ? Ce(r, !!d.multiple, w, !1) : d.defaultValue != null && Ce(
                    r,
                    !!d.multiple,
                    d.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof y.onClick == "function" && (r.onclick = lo);
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
        return Ur(i), null;
      case 6:
        if (r && i.stateNode != null) Tm(r, i, r.memoizedProps, d);
        else {
          if (typeof d != "string" && i.stateNode === null) throw Error(s(166));
          if (u = ts(ac.current), ts(nl.current), Tf(i)) {
            if (d = i.stateNode, u = i.memoizedProps, d[Ki] = i, (w = d.nodeValue !== u) && (r = Oa, r !== null)) switch (r.tag) {
              case 3:
                yf(d.nodeValue, u, (r.mode & 1) !== 0);
                break;
              case 5:
                r.memoizedProps.suppressHydrationWarning !== !0 && yf(d.nodeValue, u, (r.mode & 1) !== 0);
            }
            w && (i.flags |= 4);
          } else d = (u.nodeType === 9 ? u : u.ownerDocument).createTextNode(d), d[Ki] = i, i.stateNode = d;
        }
        return Ur(i), null;
      case 13:
        if (Pn(nr), d = i.memoizedState, r === null || r.memoizedState !== null && r.memoizedState.dehydrated !== null) {
          if (Xn && Aa !== null && (i.mode & 1) !== 0 && (i.flags & 128) === 0) ec(), po(), i.flags |= 98560, w = !1;
          else if (w = Tf(i), d !== null && d.dehydrated !== null) {
            if (r === null) {
              if (!w) throw Error(s(318));
              if (w = i.memoizedState, w = w !== null ? w.dehydrated : null, !w) throw Error(s(317));
              w[Ki] = i;
            } else po(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            Ur(i), w = !1;
          } else di !== null && (ps(di), di = null), w = !0;
          if (!w) return i.flags & 65536 ? i : null;
        }
        return (i.flags & 128) !== 0 ? (i.lanes = u, i) : (d = d !== null, d !== (r !== null && r.memoizedState !== null) && d && (i.child.flags |= 8192, (i.mode & 1) !== 0 && (r === null || (nr.current & 1) !== 0 ? cr === 0 && (cr = 3) : nv())), i.updateQueue !== null && (i.flags |= 4), Ur(i), null);
      case 4:
        return ns(), Er(r, i), r === null && Ws(i.stateNode.containerInfo), Ur(i), null;
      case 10:
        return Dp(i.type._context), Ur(i), null;
      case 17:
        return mr(i.type) && Ks(), Ur(i), null;
      case 19:
        if (Pn(nr), w = i.memoizedState, w === null) return Ur(i), null;
        if (d = (i.flags & 128) !== 0, A = w.rendering, A === null) if (d) Sc(w, !1);
        else {
          if (cr !== 0 || r !== null && (r.flags & 128) !== 0) for (r = i.child; r !== null; ) {
            if (A = kf(r), A !== null) {
              for (i.flags |= 128, Sc(w, !1), d = A.updateQueue, d !== null && (i.updateQueue = d, i.flags |= 4), i.subtreeFlags = 0, d = u, u = i.child; u !== null; ) w = u, r = d, w.flags &= 14680066, A = w.alternate, A === null ? (w.childLanes = 0, w.lanes = r, w.child = null, w.subtreeFlags = 0, w.memoizedProps = null, w.memoizedState = null, w.updateQueue = null, w.dependencies = null, w.stateNode = null) : (w.childLanes = A.childLanes, w.lanes = A.lanes, w.child = A.child, w.subtreeFlags = 0, w.deletions = null, w.memoizedProps = A.memoizedProps, w.memoizedState = A.memoizedState, w.updateQueue = A.updateQueue, w.type = A.type, r = A.dependencies, w.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }), u = u.sibling;
              return Dt(nr, nr.current & 1 | 2), i.child;
            }
            r = r.sibling;
          }
          w.tail !== null && Wt() > lu && (i.flags |= 128, d = !0, Sc(w, !1), i.lanes = 4194304);
        }
        else {
          if (!d) if (r = kf(A), r !== null) {
            if (i.flags |= 128, d = !0, u = r.updateQueue, u !== null && (i.updateQueue = u, i.flags |= 4), Sc(w, !0), w.tail === null && w.tailMode === "hidden" && !A.alternate && !Xn) return Ur(i), null;
          } else 2 * Wt() - w.renderingStartTime > lu && u !== 1073741824 && (i.flags |= 128, d = !0, Sc(w, !1), i.lanes = 4194304);
          w.isBackwards ? (A.sibling = i.child, i.child = A) : (u = w.last, u !== null ? u.sibling = A : i.child = A, w.last = A);
        }
        return w.tail !== null ? (i = w.tail, w.rendering = i, w.tail = i.sibling, w.renderingStartTime = Wt(), i.sibling = null, u = nr.current, Dt(nr, d ? u & 1 | 2 : u & 1), i) : (Ur(i), null);
      case 22:
      case 23:
        return tv(), d = i.memoizedState !== null, r !== null && r.memoizedState !== null !== d && (i.flags |= 8192), d && (i.mode & 1) !== 0 ? (Xa & 1073741824) !== 0 && (Ur(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : Ur(i), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, i.tag));
  }
  function Zf(r, i) {
    switch (Cf(i), i.tag) {
      case 1:
        return mr(i.type) && Ks(), r = i.flags, r & 65536 ? (i.flags = r & -65537 | 128, i) : null;
      case 3:
        return ns(), Pn(_r), Pn(ir), zt(), r = i.flags, (r & 65536) !== 0 && (r & 128) === 0 ? (i.flags = r & -65537 | 128, i) : null;
      case 5:
        return _f(i), null;
      case 13:
        if (Pn(nr), r = i.memoizedState, r !== null && r.dehydrated !== null) {
          if (i.alternate === null) throw Error(s(340));
          po();
        }
        return r = i.flags, r & 65536 ? (i.flags = r & -65537 | 128, i) : null;
      case 19:
        return Pn(nr), null;
      case 4:
        return ns(), null;
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
  var Ec = !1, na = !1, x1 = typeof WeakSet == "function" ? WeakSet : Set, gt = null;
  function ru(r, i) {
    var u = r.ref;
    if (u !== null) if (typeof u == "function") try {
      u(null);
    } catch (d) {
      Kn(r, i, d);
    }
    else u.current = null;
  }
  function Jf(r, i, u) {
    try {
      u();
    } catch (d) {
      Kn(r, i, d);
    }
  }
  var Mm = !1;
  function _m(r, i) {
    if (Xu = oi, r = Wu(), uf(r)) {
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
          var A = 0, q = -1, K = -1, ye = 0, He = 0, Ge = r, Fe = null;
          t: for (; ; ) {
            for (var pt; Ge !== u || y !== 0 && Ge.nodeType !== 3 || (q = A + y), Ge !== w || d !== 0 && Ge.nodeType !== 3 || (K = A + d), Ge.nodeType === 3 && (A += Ge.nodeValue.length), (pt = Ge.firstChild) !== null; )
              Fe = Ge, Ge = pt;
            for (; ; ) {
              if (Ge === r) break t;
              if (Fe === u && ++ye === y && (q = A), Fe === w && ++He === d && (K = A), (pt = Ge.nextSibling) !== null) break;
              Ge = Fe, Fe = Ge.parentNode;
            }
            Ge = pt;
          }
          u = q === -1 || K === -1 ? null : { start: q, end: K };
        } else u = null;
      }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (Bo = { focusedElem: r, selectionRange: u }, oi = !1, gt = i; gt !== null; ) if (i = gt, r = i.child, (i.subtreeFlags & 1028) !== 0 && r !== null) r.return = i, gt = r;
    else for (; gt !== null; ) {
      i = gt;
      try {
        var xt = i.alternate;
        if ((i.flags & 1024) !== 0) switch (i.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (xt !== null) {
              var Tt = xt.memoizedProps, fr = xt.memoizedState, ue = i.stateNode, ne = ue.getSnapshotBeforeUpdate(i.elementType === i.type ? Tt : Ui(i.type, Tt), fr);
              ue.__reactInternalSnapshotBeforeUpdate = ne;
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
      } catch (Ve) {
        Kn(i, i.return, Ve);
      }
      if (r = i.sibling, r !== null) {
        r.return = i.return, gt = r;
        break;
      }
      gt = i.return;
    }
    return xt = Mm, Mm = !1, xt;
  }
  function xc(r, i, u) {
    var d = i.updateQueue;
    if (d = d !== null ? d.lastEffect : null, d !== null) {
      var y = d = d.next;
      do {
        if ((y.tag & r) === r) {
          var w = y.destroy;
          y.destroy = void 0, w !== void 0 && Jf(i, u, w);
        }
        y = y.next;
      } while (y !== d);
    }
  }
  function wc(r, i) {
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
  function Qp(r) {
    var i = r.ref;
    if (i !== null) {
      var u = r.stateNode;
      r.tag, r = u, typeof i == "function" ? i(r) : i.current = r;
    }
  }
  function ed(r) {
    var i = r.alternate;
    i !== null && (r.alternate = null, ed(i)), r.child = null, r.deletions = null, r.sibling = null, r.tag === 5 && (i = r.stateNode, i !== null && (delete i[Ki], delete i[Ku], delete i[Zu], delete i[Xs], delete i[S1])), r.stateNode = null, r.return = null, r.dependencies = null, r.memoizedProps = null, r.memoizedState = null, r.pendingProps = null, r.stateNode = null, r.updateQueue = null;
  }
  function bc(r) {
    return r.tag === 5 || r.tag === 3 || r.tag === 4;
  }
  function zl(r) {
    e: for (; ; ) {
      for (; r.sibling === null; ) {
        if (r.return === null || bc(r.return)) return null;
        r = r.return;
      }
      for (r.sibling.return = r.return, r = r.sibling; r.tag !== 5 && r.tag !== 6 && r.tag !== 18; ) {
        if (r.flags & 2 || r.child === null || r.tag === 4) continue e;
        r.child.return = r, r = r.child;
      }
      if (!(r.flags & 2)) return r.stateNode;
    }
  }
  function al(r, i, u) {
    var d = r.tag;
    if (d === 5 || d === 6) r = r.stateNode, i ? u.nodeType === 8 ? u.parentNode.insertBefore(r, i) : u.insertBefore(r, i) : (u.nodeType === 8 ? (i = u.parentNode, i.insertBefore(r, u)) : (i = u, i.appendChild(r)), u = u._reactRootContainer, u != null || i.onclick !== null || (i.onclick = lo));
    else if (d !== 4 && (r = r.child, r !== null)) for (al(r, i, u), r = r.sibling; r !== null; ) al(r, i, u), r = r.sibling;
  }
  function il(r, i, u) {
    var d = r.tag;
    if (d === 5 || d === 6) r = r.stateNode, i ? u.insertBefore(r, i) : u.appendChild(r);
    else if (d !== 4 && (r = r.child, r !== null)) for (il(r, i, u), r = r.sibling; r !== null; ) il(r, i, u), r = r.sibling;
  }
  var ur = null, va = !1;
  function ha(r, i, u) {
    for (u = u.child; u !== null; ) km(r, i, u), u = u.sibling;
  }
  function km(r, i, u) {
    if (Bn && typeof Bn.onCommitFiberUnmount == "function") try {
      Bn.onCommitFiberUnmount(ai, u);
    } catch {
    }
    switch (u.tag) {
      case 5:
        na || ru(u, i);
      case 6:
        var d = ur, y = va;
        ur = null, ha(r, i, u), ur = d, va = y, ur !== null && (va ? (r = ur, u = u.stateNode, r.nodeType === 8 ? r.parentNode.removeChild(u) : r.removeChild(u)) : ur.removeChild(u.stateNode));
        break;
      case 18:
        ur !== null && (va ? (r = ur, u = u.stateNode, r.nodeType === 8 ? Bs(r.parentNode, u) : r.nodeType === 1 && Bs(r, u), Oi(r)) : Bs(ur, u.stateNode));
        break;
      case 4:
        d = ur, y = va, ur = u.stateNode.containerInfo, va = !0, ha(r, i, u), ur = d, va = y;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!na && (d = u.updateQueue, d !== null && (d = d.lastEffect, d !== null))) {
          y = d = d.next;
          do {
            var w = y, A = w.destroy;
            w = w.tag, A !== void 0 && ((w & 2) !== 0 || (w & 4) !== 0) && Jf(u, i, A), y = y.next;
          } while (y !== d);
        }
        ha(r, i, u);
        break;
      case 1:
        if (!na && (ru(u, i), d = u.stateNode, typeof d.componentWillUnmount == "function")) try {
          d.props = u.memoizedProps, d.state = u.memoizedState, d.componentWillUnmount();
        } catch (q) {
          Kn(u, i, q);
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
  function Dm(r) {
    var i = r.updateQueue;
    if (i !== null) {
      r.updateQueue = null;
      var u = r.stateNode;
      u === null && (u = r.stateNode = new x1()), i.forEach(function(d) {
        var y = Pm.bind(null, r, d);
        u.has(d) || (u.add(d), d.then(y, y));
      });
    }
  }
  function ji(r, i) {
    var u = i.deletions;
    if (u !== null) for (var d = 0; d < u.length; d++) {
      var y = u[d];
      try {
        var w = r, A = i, q = A;
        e: for (; q !== null; ) {
          switch (q.tag) {
            case 5:
              ur = q.stateNode, va = !1;
              break e;
            case 3:
              ur = q.stateNode.containerInfo, va = !0;
              break e;
            case 4:
              ur = q.stateNode.containerInfo, va = !0;
              break e;
          }
          q = q.return;
        }
        if (ur === null) throw Error(s(160));
        km(w, A, y), ur = null, va = !1;
        var K = y.alternate;
        K !== null && (K.return = null), y.return = null;
      } catch (ye) {
        Kn(y, i, ye);
      }
    }
    if (i.subtreeFlags & 12854) for (i = i.child; i !== null; ) Bp(i, r), i = i.sibling;
  }
  function Bp(r, i) {
    var u = r.alternate, d = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ji(i, r), Ua(r), d & 4) {
          try {
            xc(3, r, r.return), wc(3, r);
          } catch (Tt) {
            Kn(r, r.return, Tt);
          }
          try {
            xc(5, r, r.return);
          } catch (Tt) {
            Kn(r, r.return, Tt);
          }
        }
        break;
      case 1:
        ji(i, r), Ua(r), d & 512 && u !== null && ru(u, u.return);
        break;
      case 5:
        if (ji(i, r), Ua(r), d & 512 && u !== null && ru(u, u.return), r.flags & 32) {
          var y = r.stateNode;
          try {
            we(y, "");
          } catch (Tt) {
            Kn(r, r.return, Tt);
          }
        }
        if (d & 4 && (y = r.stateNode, y != null)) {
          var w = r.memoizedProps, A = u !== null ? u.memoizedProps : w, q = r.type, K = r.updateQueue;
          if (r.updateQueue = null, K !== null) try {
            q === "input" && w.type === "radio" && w.name != null && Ze(y, w), ht(q, A);
            var ye = ht(q, w);
            for (A = 0; A < K.length; A += 2) {
              var He = K[A], Ge = K[A + 1];
              He === "style" ? Mt(y, Ge) : He === "dangerouslySetInnerHTML" ? $t(y, Ge) : He === "children" ? we(y, Ge) : P(y, He, Ge, ye);
            }
            switch (q) {
              case "input":
                Ae(y, w);
                break;
              case "textarea":
                Je(y, w);
                break;
              case "select":
                var Fe = y._wrapperState.wasMultiple;
                y._wrapperState.wasMultiple = !!w.multiple;
                var pt = w.value;
                pt != null ? Ce(y, !!w.multiple, pt, !1) : Fe !== !!w.multiple && (w.defaultValue != null ? Ce(
                  y,
                  !!w.multiple,
                  w.defaultValue,
                  !0
                ) : Ce(y, !!w.multiple, w.multiple ? [] : "", !1));
            }
            y[Ku] = w;
          } catch (Tt) {
            Kn(r, r.return, Tt);
          }
        }
        break;
      case 6:
        if (ji(i, r), Ua(r), d & 4) {
          if (r.stateNode === null) throw Error(s(162));
          y = r.stateNode, w = r.memoizedProps;
          try {
            y.nodeValue = w;
          } catch (Tt) {
            Kn(r, r.return, Tt);
          }
        }
        break;
      case 3:
        if (ji(i, r), Ua(r), d & 4 && u !== null && u.memoizedState.isDehydrated) try {
          Oi(i.containerInfo);
        } catch (Tt) {
          Kn(r, r.return, Tt);
        }
        break;
      case 4:
        ji(i, r), Ua(r);
        break;
      case 13:
        ji(i, r), Ua(r), y = r.child, y.flags & 8192 && (w = y.memoizedState !== null, y.stateNode.isHidden = w, !w || y.alternate !== null && y.alternate.memoizedState !== null || (Zp = Wt())), d & 4 && Dm(r);
        break;
      case 22:
        if (He = u !== null && u.memoizedState !== null, r.mode & 1 ? (na = (ye = na) || He, ji(i, r), na = ye) : ji(i, r), Ua(r), d & 8192) {
          if (ye = r.memoizedState !== null, (r.stateNode.isHidden = ye) && !He && (r.mode & 1) !== 0) for (gt = r, He = r.child; He !== null; ) {
            for (Ge = gt = He; gt !== null; ) {
              switch (Fe = gt, pt = Fe.child, Fe.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  xc(4, Fe, Fe.return);
                  break;
                case 1:
                  ru(Fe, Fe.return);
                  var xt = Fe.stateNode;
                  if (typeof xt.componentWillUnmount == "function") {
                    d = Fe, u = Fe.return;
                    try {
                      i = d, xt.props = i.memoizedProps, xt.state = i.memoizedState, xt.componentWillUnmount();
                    } catch (Tt) {
                      Kn(d, u, Tt);
                    }
                  }
                  break;
                case 5:
                  ru(Fe, Fe.return);
                  break;
                case 22:
                  if (Fe.memoizedState !== null) {
                    Cc(Ge);
                    continue;
                  }
              }
              pt !== null ? (pt.return = Fe, gt = pt) : Cc(Ge);
            }
            He = He.sibling;
          }
          e: for (He = null, Ge = r; ; ) {
            if (Ge.tag === 5) {
              if (He === null) {
                He = Ge;
                try {
                  y = Ge.stateNode, ye ? (w = y.style, typeof w.setProperty == "function" ? w.setProperty("display", "none", "important") : w.display = "none") : (q = Ge.stateNode, K = Ge.memoizedProps.style, A = K != null && K.hasOwnProperty("display") ? K.display : null, q.style.display = We("display", A));
                } catch (Tt) {
                  Kn(r, r.return, Tt);
                }
              }
            } else if (Ge.tag === 6) {
              if (He === null) try {
                Ge.stateNode.nodeValue = ye ? "" : Ge.memoizedProps;
              } catch (Tt) {
                Kn(r, r.return, Tt);
              }
            } else if ((Ge.tag !== 22 && Ge.tag !== 23 || Ge.memoizedState === null || Ge === r) && Ge.child !== null) {
              Ge.child.return = Ge, Ge = Ge.child;
              continue;
            }
            if (Ge === r) break e;
            for (; Ge.sibling === null; ) {
              if (Ge.return === null || Ge.return === r) break e;
              He === Ge && (He = null), Ge = Ge.return;
            }
            He === Ge && (He = null), Ge.sibling.return = Ge.return, Ge = Ge.sibling;
          }
        }
        break;
      case 19:
        ji(i, r), Ua(r), d & 4 && Dm(r);
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
          for (var u = r.return; u !== null; ) {
            if (bc(u)) {
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
            d.flags & 32 && (we(y, ""), d.flags &= -33);
            var w = zl(r);
            il(r, w, y);
            break;
          case 3:
          case 4:
            var A = d.stateNode.containerInfo, q = zl(r);
            al(r, q, A);
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
  function w1(r, i, u) {
    gt = r, Xp(r);
  }
  function Xp(r, i, u) {
    for (var d = (r.mode & 1) !== 0; gt !== null; ) {
      var y = gt, w = y.child;
      if (y.tag === 22 && d) {
        var A = y.memoizedState !== null || Ec;
        if (!A) {
          var q = y.alternate, K = q !== null && q.memoizedState !== null || na;
          q = Ec;
          var ye = na;
          if (Ec = A, (na = K) && !ye) for (gt = y; gt !== null; ) A = gt, K = A.child, A.tag === 22 && A.memoizedState !== null ? Kp(y) : K !== null ? (K.return = A, gt = K) : Kp(y);
          for (; w !== null; ) gt = w, Xp(w), w = w.sibling;
          gt = y, Ec = q, na = ye;
        }
        Om(r);
      } else (y.subtreeFlags & 8772) !== 0 && w !== null ? (w.return = y, gt = w) : Om(r);
    }
  }
  function Om(r) {
    for (; gt !== null; ) {
      var i = gt;
      if ((i.flags & 8772) !== 0) {
        var u = i.alternate;
        try {
          if ((i.flags & 8772) !== 0) switch (i.tag) {
            case 0:
            case 11:
            case 15:
              na || wc(5, i);
              break;
            case 1:
              var d = i.stateNode;
              if (i.flags & 4 && !na) if (u === null) d.componentDidMount();
              else {
                var y = i.elementType === i.type ? u.memoizedProps : Ui(i.type, u.memoizedProps);
                d.componentDidUpdate(y, u.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
              }
              var w = i.updateQueue;
              w !== null && Np(i, w, d);
              break;
            case 3:
              var A = i.updateQueue;
              if (A !== null) {
                if (u = null, i.child !== null) switch (i.child.tag) {
                  case 5:
                    u = i.child.stateNode;
                    break;
                  case 1:
                    u = i.child.stateNode;
                }
                Np(i, A, u);
              }
              break;
            case 5:
              var q = i.stateNode;
              if (u === null && i.flags & 4) {
                u = q;
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
                  var He = ye.memoizedState;
                  if (He !== null) {
                    var Ge = He.dehydrated;
                    Ge !== null && Oi(Ge);
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
          na || i.flags & 512 && Qp(i);
        } catch (Fe) {
          Kn(i, i.return, Fe);
        }
      }
      if (i === r) {
        gt = null;
        break;
      }
      if (u = i.sibling, u !== null) {
        u.return = i.return, gt = u;
        break;
      }
      gt = i.return;
    }
  }
  function Cc(r) {
    for (; gt !== null; ) {
      var i = gt;
      if (i === r) {
        gt = null;
        break;
      }
      var u = i.sibling;
      if (u !== null) {
        u.return = i.return, gt = u;
        break;
      }
      gt = i.return;
    }
  }
  function Kp(r) {
    for (; gt !== null; ) {
      var i = gt;
      try {
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            var u = i.return;
            try {
              wc(4, i);
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
              Qp(i);
            } catch (K) {
              Kn(i, w, K);
            }
            break;
          case 5:
            var A = i.return;
            try {
              Qp(i);
            } catch (K) {
              Kn(i, A, K);
            }
        }
      } catch (K) {
        Kn(i, i.return, K);
      }
      if (i === r) {
        gt = null;
        break;
      }
      var q = i.sibling;
      if (q !== null) {
        q.return = i.return, gt = q;
        break;
      }
      gt = i.return;
    }
  }
  var b1 = Math.ceil, go = N.ReactCurrentDispatcher, fs = N.ReactCurrentOwner, qr = N.ReactCurrentBatchConfig, vn = 0, Dr = null, xr = null, Yr = 0, Xa = 0, au = ci(0), cr = 0, Tc = null, ll = 0, iu = 0, td = 0, Rc = null, ja = null, Zp = 0, lu = 1 / 0, Ka = null, ou = !1, ds = null, So = null, nd = !1, Ll = null, Mc = 0, Eo = 0, su = null, _c = -1, ra = 0;
  function wr() {
    return (vn & 6) !== 0 ? Wt() : _c !== -1 ? _c : _c = Wt();
  }
  function ol(r) {
    return (r.mode & 1) === 0 ? 1 : (vn & 2) !== 0 && Yr !== 0 ? Yr & -Yr : E1.transition !== null ? (ra === 0 && (ra = Ls()), ra) : (r = bn, r !== 0 || (r = window.event, r = r === void 0 ? 16 : Hs(r.type)), r);
  }
  function ma(r, i, u, d) {
    if (50 < Eo) throw Eo = 0, su = null, Error(s(185));
    xl(r, u, d), ((vn & 2) === 0 || r !== Dr) && (r === Dr && ((vn & 2) === 0 && (iu |= u), cr === 4 && Fi(r, Yr)), Fa(r, d), u === 1 && vn === 0 && (i.mode & 1) === 0 && (lu = Wt() + 500, Zs && Ji()));
  }
  function Fa(r, i) {
    var u = r.callbackNode;
    Rr(r, i);
    var d = Zn(r, r === Dr ? Yr : 0);
    if (d === 0) u !== null && In(u), r.callbackNode = null, r.callbackPriority = 0;
    else if (i = d & -d, r.callbackPriority !== i) {
      if (u != null && In(u), i === 1) r.tag === 0 ? so(Jp.bind(null, r)) : wf(Jp.bind(null, r)), Qs(function() {
        (vn & 6) === 0 && Ji();
      }), u = null;
      else {
        switch (Us(d)) {
          case 1:
            u = ua;
            break;
          case 4:
            u = _i;
            break;
          case 16:
            u = ki;
            break;
          case 536870912:
            u = qi;
            break;
          default:
            u = ki;
        }
        u = Hm(u, rd.bind(null, r));
      }
      r.callbackPriority = i, r.callbackNode = u;
    }
  }
  function rd(r, i) {
    if (_c = -1, ra = 0, (vn & 6) !== 0) throw Error(s(327));
    var u = r.callbackNode;
    if (uu() && r.callbackNode !== u) return null;
    var d = Zn(r, r === Dr ? Yr : 0);
    if (d === 0) return null;
    if ((d & 30) !== 0 || (d & r.expiredLanes) !== 0 || i) i = ad(r, d);
    else {
      i = d;
      var y = vn;
      vn |= 2;
      var w = zm();
      (Dr !== r || Yr !== i) && (Ka = null, lu = Wt() + 500, Nl(r, i));
      do
        try {
          Lm();
          break;
        } catch (q) {
          Am(r, q);
        }
      while (!0);
      kp(), go.current = w, vn = y, xr !== null ? i = 0 : (Dr = null, Yr = 0, i = cr);
    }
    if (i !== 0) {
      if (i === 2 && (y = Jl(r), y !== 0 && (d = y, i = kc(r, y))), i === 1) throw u = Tc, Nl(r, 0), Fi(r, d), Fa(r, Wt()), u;
      if (i === 6) Fi(r, d);
      else {
        if (y = r.current.alternate, (d & 30) === 0 && !C1(y) && (i = ad(r, d), i === 2 && (w = Jl(r), w !== 0 && (d = w, i = kc(r, w))), i === 1)) throw u = Tc, Nl(r, 0), Fi(r, d), Fa(r, Wt()), u;
        switch (r.finishedWork = y, r.finishedLanes = d, i) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            hs(r, ja, Ka);
            break;
          case 3:
            if (Fi(r, d), (d & 130023424) === d && (i = Zp + 500 - Wt(), 10 < i)) {
              if (Zn(r, 0) !== 0) break;
              if (y = r.suspendedLanes, (y & d) !== d) {
                wr(), r.pingedLanes |= r.suspendedLanes & y;
                break;
              }
              r.timeoutHandle = Sf(hs.bind(null, r, ja, Ka), i);
              break;
            }
            hs(r, ja, Ka);
            break;
          case 4:
            if (Fi(r, d), (d & 4194240) === d) break;
            for (i = r.eventTimes, y = -1; 0 < d; ) {
              var A = 31 - $r(d);
              w = 1 << A, A = i[A], A > y && (y = A), d &= ~w;
            }
            if (d = y, d = Wt() - d, d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * b1(d / 1960)) - d, 10 < d) {
              r.timeoutHandle = Sf(hs.bind(null, r, ja, Ka), d);
              break;
            }
            hs(r, ja, Ka);
            break;
          case 5:
            hs(r, ja, Ka);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return Fa(r, Wt()), r.callbackNode === u ? rd.bind(null, r) : null;
  }
  function kc(r, i) {
    var u = Rc;
    return r.current.memoizedState.isDehydrated && (Nl(r, i).flags |= 256), r = ad(r, i), r !== 2 && (i = ja, ja = u, i !== null && ps(i)), r;
  }
  function ps(r) {
    ja === null ? ja = r : ja.push.apply(ja, r);
  }
  function C1(r) {
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
  function Fi(r, i) {
    for (i &= ~td, i &= ~iu, r.suspendedLanes |= i, r.pingedLanes &= ~i, r = r.expirationTimes; 0 < i; ) {
      var u = 31 - $r(i), d = 1 << u;
      r[u] = -1, i &= ~d;
    }
  }
  function Jp(r) {
    if ((vn & 6) !== 0) throw Error(s(327));
    uu();
    var i = Zn(r, 0);
    if ((i & 1) === 0) return Fa(r, Wt()), null;
    var u = ad(r, i);
    if (r.tag !== 0 && u === 2) {
      var d = Jl(r);
      d !== 0 && (i = d, u = kc(r, d));
    }
    if (u === 1) throw u = Tc, Nl(r, 0), Fi(r, i), Fa(r, Wt()), u;
    if (u === 6) throw Error(s(345));
    return r.finishedWork = r.current.alternate, r.finishedLanes = i, hs(r, ja, Ka), Fa(r, Wt()), null;
  }
  function ev(r, i) {
    var u = vn;
    vn |= 1;
    try {
      return r(i);
    } finally {
      vn = u, vn === 0 && (lu = Wt() + 500, Zs && Ji());
    }
  }
  function vs(r) {
    Ll !== null && Ll.tag === 0 && (vn & 6) === 0 && uu();
    var i = vn;
    vn |= 1;
    var u = qr.transition, d = bn;
    try {
      if (qr.transition = null, bn = 1, r) return r();
    } finally {
      bn = d, qr.transition = u, vn = i, (vn & 6) === 0 && Ji();
    }
  }
  function tv() {
    Xa = au.current, Pn(au);
  }
  function Nl(r, i) {
    r.finishedWork = null, r.finishedLanes = 0;
    var u = r.timeoutHandle;
    if (u !== -1 && (r.timeoutHandle = -1, Cp(u)), xr !== null) for (u = xr.return; u !== null; ) {
      var d = u;
      switch (Cf(d), d.tag) {
        case 1:
          d = d.type.childContextTypes, d != null && Ks();
          break;
        case 3:
          ns(), Pn(_r), Pn(ir), zt();
          break;
        case 5:
          _f(d);
          break;
        case 4:
          ns();
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
      u = u.return;
    }
    if (Dr = r, xr = r = xo(r.current, null), Yr = Xa = i, cr = 0, Tc = null, td = iu = ll = 0, ja = Rc = null, es !== null) {
      for (i = 0; i < es.length; i++) if (u = es[i], d = u.interleaved, d !== null) {
        u.interleaved = null;
        var y = d.next, w = u.pending;
        if (w !== null) {
          var A = w.next;
          w.next = y, d.next = A;
        }
        u.pending = d;
      }
      es = null;
    }
    return r;
  }
  function Am(r, i) {
    do {
      var u = xr;
      try {
        if (kp(), ln.current = ss, Df) {
          for (var d = Tn.memoizedState; d !== null; ) {
            var y = d.queue;
            y !== null && (y.pending = null), d = d.next;
          }
          Df = !1;
        }
        if (Ln = 0, Nr = gr = Tn = null, lc = !1, rs = 0, fs.current = null, u === null || u.return === null) {
          cr = 1, Tc = i, xr = null;
          break;
        }
        e: {
          var w = r, A = u.return, q = u, K = i;
          if (i = Yr, q.flags |= 32768, K !== null && typeof K == "object" && typeof K.then == "function") {
            var ye = K, He = q, Ge = He.tag;
            if ((He.mode & 1) === 0 && (Ge === 0 || Ge === 11 || Ge === 15)) {
              var Fe = He.alternate;
              Fe ? (He.updateQueue = Fe.updateQueue, He.memoizedState = Fe.memoizedState, He.lanes = Fe.lanes) : (He.updateQueue = null, He.memoizedState = null);
            }
            var pt = Sm(A);
            if (pt !== null) {
              pt.flags &= -257, yo(pt, A, q, w, i), pt.mode & 1 && Ip(w, ye, i), i = pt, K = ye;
              var xt = i.updateQueue;
              if (xt === null) {
                var Tt = /* @__PURE__ */ new Set();
                Tt.add(K), i.updateQueue = Tt;
              } else xt.add(K);
              break e;
            } else {
              if ((i & 1) === 0) {
                Ip(w, ye, i), nv();
                break e;
              }
              K = Error(s(426));
            }
          } else if (Xn && q.mode & 1) {
            var fr = Sm(A);
            if (fr !== null) {
              (fr.flags & 65536) === 0 && (fr.flags |= 256), yo(fr, A, q, w, i), Dl(us(K, q));
              break e;
            }
          }
          w = K = us(K, q), cr !== 4 && (cr = 2), Rc === null ? Rc = [w] : Rc.push(w), w = A;
          do {
            switch (w.tag) {
              case 3:
                w.flags |= 65536, i &= -i, w.lanes |= i;
                var ue = gm(w, K, i);
                pm(w, ue);
                break e;
              case 1:
                q = K;
                var ne = w.type, pe = w.stateNode;
                if ((w.flags & 128) === 0 && (typeof ne.getDerivedStateFromError == "function" || pe !== null && typeof pe.componentDidCatch == "function" && (So === null || !So.has(pe)))) {
                  w.flags |= 65536, i &= -i, w.lanes |= i;
                  var Ve = Vp(w, q, i);
                  pm(w, Ve);
                  break e;
                }
            }
            w = w.return;
          } while (w !== null);
        }
        Um(u);
      } catch (wt) {
        i = wt, xr === u && u !== null && (xr = u = u.return);
        continue;
      }
      break;
    } while (!0);
  }
  function zm() {
    var r = go.current;
    return go.current = ss, r === null ? ss : r;
  }
  function nv() {
    (cr === 0 || cr === 3 || cr === 2) && (cr = 4), Dr === null || (ll & 268435455) === 0 && (iu & 268435455) === 0 || Fi(Dr, Yr);
  }
  function ad(r, i) {
    var u = vn;
    vn |= 2;
    var d = zm();
    (Dr !== r || Yr !== i) && (Ka = null, Nl(r, i));
    do
      try {
        T1();
        break;
      } catch (y) {
        Am(r, y);
      }
    while (!0);
    if (kp(), vn = u, go.current = d, xr !== null) throw Error(s(261));
    return Dr = null, Yr = 0, cr;
  }
  function T1() {
    for (; xr !== null; ) Nm(xr);
  }
  function Lm() {
    for (; xr !== null && !Ma(); ) Nm(xr);
  }
  function Nm(r) {
    var i = $m(r.alternate, r, Xa);
    r.memoizedProps = r.pendingProps, i === null ? Um(r) : xr = i, fs.current = null;
  }
  function Um(r) {
    var i = r;
    do {
      var u = i.alternate;
      if (r = i.return, (i.flags & 32768) === 0) {
        if (u = Rm(u, i, Xa), u !== null) {
          xr = u;
          return;
        }
      } else {
        if (u = Zf(u, i), u !== null) {
          u.flags &= 32767, xr = u;
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
  function hs(r, i, u) {
    var d = bn, y = qr.transition;
    try {
      qr.transition = null, bn = 1, R1(r, i, u, d);
    } finally {
      qr.transition = y, bn = d;
    }
    return null;
  }
  function R1(r, i, u, d) {
    do
      uu();
    while (Ll !== null);
    if ((vn & 6) !== 0) throw Error(s(327));
    u = r.finishedWork;
    var y = r.finishedLanes;
    if (u === null) return null;
    if (r.finishedWork = null, r.finishedLanes = 0, u === r.current) throw Error(s(177));
    r.callbackNode = null, r.callbackPriority = 0;
    var w = u.lanes | u.childLanes;
    if (rp(r, w), r === Dr && (xr = Dr = null, Yr = 0), (u.subtreeFlags & 2064) === 0 && (u.flags & 2064) === 0 || nd || (nd = !0, Hm(ki, function() {
      return uu(), null;
    })), w = (u.flags & 15990) !== 0, (u.subtreeFlags & 15990) !== 0 || w) {
      w = qr.transition, qr.transition = null;
      var A = bn;
      bn = 1;
      var q = vn;
      vn |= 4, fs.current = null, _m(r, u), Bp(u, r), qs(Bo), oi = !!Xu, Bo = Xu = null, r.current = u, w1(u), sa(), vn = q, bn = A, qr.transition = w;
    } else r.current = u;
    if (nd && (nd = !1, Ll = r, Mc = y), w = r.pendingLanes, w === 0 && (So = null), $o(u.stateNode), Fa(r, Wt()), i !== null) for (d = r.onRecoverableError, u = 0; u < i.length; u++) y = i[u], d(y.value, { componentStack: y.stack, digest: y.digest });
    if (ou) throw ou = !1, r = ds, ds = null, r;
    return (Mc & 1) !== 0 && r.tag !== 0 && uu(), w = r.pendingLanes, (w & 1) !== 0 ? r === su ? Eo++ : (Eo = 0, su = r) : Eo = 0, Ji(), null;
  }
  function uu() {
    if (Ll !== null) {
      var r = Us(Mc), i = qr.transition, u = bn;
      try {
        if (qr.transition = null, bn = 16 > r ? 16 : r, Ll === null) var d = !1;
        else {
          if (r = Ll, Ll = null, Mc = 0, (vn & 6) !== 0) throw Error(s(331));
          var y = vn;
          for (vn |= 4, gt = r.current; gt !== null; ) {
            var w = gt, A = w.child;
            if ((gt.flags & 16) !== 0) {
              var q = w.deletions;
              if (q !== null) {
                for (var K = 0; K < q.length; K++) {
                  var ye = q[K];
                  for (gt = ye; gt !== null; ) {
                    var He = gt;
                    switch (He.tag) {
                      case 0:
                      case 11:
                      case 15:
                        xc(8, He, w);
                    }
                    var Ge = He.child;
                    if (Ge !== null) Ge.return = He, gt = Ge;
                    else for (; gt !== null; ) {
                      He = gt;
                      var Fe = He.sibling, pt = He.return;
                      if (ed(He), He === ye) {
                        gt = null;
                        break;
                      }
                      if (Fe !== null) {
                        Fe.return = pt, gt = Fe;
                        break;
                      }
                      gt = pt;
                    }
                  }
                }
                var xt = w.alternate;
                if (xt !== null) {
                  var Tt = xt.child;
                  if (Tt !== null) {
                    xt.child = null;
                    do {
                      var fr = Tt.sibling;
                      Tt.sibling = null, Tt = fr;
                    } while (Tt !== null);
                  }
                }
                gt = w;
              }
            }
            if ((w.subtreeFlags & 2064) !== 0 && A !== null) A.return = w, gt = A;
            else e: for (; gt !== null; ) {
              if (w = gt, (w.flags & 2048) !== 0) switch (w.tag) {
                case 0:
                case 11:
                case 15:
                  xc(9, w, w.return);
              }
              var ue = w.sibling;
              if (ue !== null) {
                ue.return = w.return, gt = ue;
                break e;
              }
              gt = w.return;
            }
          }
          var ne = r.current;
          for (gt = ne; gt !== null; ) {
            A = gt;
            var pe = A.child;
            if ((A.subtreeFlags & 2064) !== 0 && pe !== null) pe.return = A, gt = pe;
            else e: for (A = ne; gt !== null; ) {
              if (q = gt, (q.flags & 2048) !== 0) try {
                switch (q.tag) {
                  case 0:
                  case 11:
                  case 15:
                    wc(9, q);
                }
              } catch (wt) {
                Kn(q, q.return, wt);
              }
              if (q === A) {
                gt = null;
                break e;
              }
              var Ve = q.sibling;
              if (Ve !== null) {
                Ve.return = q.return, gt = Ve;
                break e;
              }
              gt = q.return;
            }
          }
          if (vn = y, Ji(), Bn && typeof Bn.onPostCommitFiberRoot == "function") try {
            Bn.onPostCommitFiberRoot(ai, r);
          } catch {
          }
          d = !0;
        }
        return d;
      } finally {
        bn = u, qr.transition = i;
      }
    }
    return !1;
  }
  function jm(r, i, u) {
    i = us(u, i), i = gm(r, i, 1), r = vo(r, i, 1), i = wr(), r !== null && (xl(r, 1, i), Fa(r, i));
  }
  function Kn(r, i, u) {
    if (r.tag === 3) jm(r, r, u);
    else for (; i !== null; ) {
      if (i.tag === 3) {
        jm(i, r, u);
        break;
      } else if (i.tag === 1) {
        var d = i.stateNode;
        if (typeof i.type.getDerivedStateFromError == "function" || typeof d.componentDidCatch == "function" && (So === null || !So.has(d))) {
          r = us(u, r), r = Vp(i, r, 1), i = vo(i, r, 1), r = wr(), i !== null && (xl(i, 1, r), Fa(i, r));
          break;
        }
      }
      i = i.return;
    }
  }
  function M1(r, i, u) {
    var d = r.pingCache;
    d !== null && d.delete(i), i = wr(), r.pingedLanes |= r.suspendedLanes & u, Dr === r && (Yr & u) === u && (cr === 4 || cr === 3 && (Yr & 130023424) === Yr && 500 > Wt() - Zp ? Nl(r, 0) : td |= u), Fa(r, i);
  }
  function Fm(r, i) {
    i === 0 && ((r.mode & 1) === 0 ? i = 1 : (i = an, an <<= 1, (an & 130023424) === 0 && (an = 4194304)));
    var u = wr();
    r = Qa(r, i), r !== null && (xl(r, i, u), Fa(r, u));
  }
  function _1(r) {
    var i = r.memoizedState, u = 0;
    i !== null && (u = i.retryLane), Fm(r, u);
  }
  function Pm(r, i) {
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
    d !== null && d.delete(i), Fm(r, u);
  }
  var $m;
  $m = function(r, i, u) {
    if (r !== null) if (r.memoizedProps !== i.pendingProps || _r.current) Sr = !0;
    else {
      if ((r.lanes & u) === 0 && (i.flags & 128) === 0) return Sr = !1, gc(r, i, u);
      Sr = (r.flags & 131072) !== 0;
    }
    else Sr = !1, Xn && (i.flags & 1048576) !== 0 && um(i, kl, i.index);
    switch (i.lanes = 0, i.tag) {
      case 2:
        var d = i.type;
        vi(r, i), r = i.pendingProps;
        var y = Da(i, ir.current);
        tr(i, u), y = ho(null, i, d, r, y, u);
        var w = Ni();
        return i.flags |= 1, typeof y == "object" && y !== null && typeof y.render == "function" && y.$$typeof === void 0 ? (i.tag = 1, i.memoizedState = null, i.updateQueue = null, mr(d) ? (w = !0, Lr(i)) : w = !1, i.memoizedState = y.state !== null && y.state !== void 0 ? y.state : null, Lp(i), y.updater = Gf, i.stateNode = y, y._reactInternals = i, pc(i, d, r, u), i = mc(null, i, d, !0, w, u)) : (i.tag = 0, Xn && w && bf(i), Ir(null, i, y, u), i = i.child), i;
      case 16:
        d = i.elementType;
        e: {
          switch (vi(r, i), r = i.pendingProps, y = d._init, d = y(d._payload), i.type = d, y = i.tag = D1(d), r = Ui(d, r), y) {
            case 0:
              i = Em(null, i, d, r, u);
              break e;
            case 1:
              i = xm(null, i, d, r, u);
              break e;
            case 11:
              i = Na(null, i, d, r, u);
              break e;
            case 14:
              i = cs(null, i, d, Ui(d.type, r), u);
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
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Ui(d, y), Em(r, i, d, y, u);
      case 1:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Ui(d, y), xm(r, i, d, y, u);
      case 3:
        e: {
          if (nu(i), r === null) throw Error(s(387));
          d = i.pendingProps, w = i.memoizedState, y = w.element, dm(r, i), tc(i, d, null, u);
          var A = i.memoizedState;
          if (d = A.element, w.isDehydrated) if (w = { element: d, isDehydrated: !1, cache: A.cache, pendingSuspenseBoundaries: A.pendingSuspenseBoundaries, transitions: A.transitions }, i.updateQueue.baseState = w, i.memoizedState = w, i.flags & 256) {
            y = us(Error(s(423)), i), i = wm(r, i, d, u, y);
            break e;
          } else if (d !== y) {
            y = us(Error(s(424)), i), i = wm(r, i, d, u, y);
            break e;
          } else for (Aa = Xi(i.stateNode.containerInfo.firstChild), Oa = i, Xn = !0, di = null, u = ot(i, null, d, u), i.child = u; u; ) u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (po(), d === y) {
              i = hi(r, i, u);
              break e;
            }
            Ir(r, i, d, u);
          }
          i = i.child;
        }
        return i;
      case 5:
        return vm(i), r === null && Mp(i), d = i.type, y = i.pendingProps, w = r !== null ? r.memoizedProps : null, A = y.children, gf(d, y) ? A = null : w !== null && gf(d, w) && (i.flags |= 32), qp(r, i), Ir(r, i, A, u), i.child;
      case 6:
        return r === null && Mp(i), null;
      case 13:
        return Kf(r, i, u);
      case 4:
        return Up(i, i.stateNode.containerInfo), d = i.pendingProps, r === null ? i.child = or(i, null, d, u) : Ir(r, i, d, u), i.child;
      case 11:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Ui(d, y), Na(r, i, d, y, u);
      case 7:
        return Ir(r, i, i.pendingProps, u), i.child;
      case 8:
        return Ir(r, i, i.pendingProps.children, u), i.child;
      case 12:
        return Ir(r, i, i.pendingProps.children, u), i.child;
      case 10:
        e: {
          if (d = i.type._context, y = i.pendingProps, w = i.memoizedProps, A = y.value, Dt(Ga, d._currentValue), d._currentValue = A, w !== null) if (zi(w.value, A)) {
            if (w.children === y.children && !_r.current) {
              i = hi(r, i, u);
              break e;
            }
          } else for (w = i.child, w !== null && (w.return = i); w !== null; ) {
            var q = w.dependencies;
            if (q !== null) {
              A = w.child;
              for (var K = q.firstContext; K !== null; ) {
                if (K.context === d) {
                  if (w.tag === 1) {
                    K = Ol(-1, u & -u), K.tag = 2;
                    var ye = w.updateQueue;
                    if (ye !== null) {
                      ye = ye.shared;
                      var He = ye.pending;
                      He === null ? K.next = K : (K.next = He.next, He.next = K), ye.pending = K;
                    }
                  }
                  w.lanes |= u, K = w.alternate, K !== null && (K.lanes |= u), Op(
                    w.return,
                    u,
                    i
                  ), q.lanes |= u;
                  break;
                }
                K = K.next;
              }
            } else if (w.tag === 10) A = w.type === i.type ? null : w.child;
            else if (w.tag === 18) {
              if (A = w.return, A === null) throw Error(s(341));
              A.lanes |= u, q = A.alternate, q !== null && (q.lanes |= u), Op(A, u, i), A = w.sibling;
            } else A = w.child;
            if (A !== null) A.return = w;
            else for (A = w; A !== null; ) {
              if (A === i) {
                A = null;
                break;
              }
              if (w = A.sibling, w !== null) {
                w.return = A.return, A = w;
                break;
              }
              A = A.return;
            }
            w = A;
          }
          Ir(r, i, y.children, u), i = i.child;
        }
        return i;
      case 9:
        return y = i.type, d = i.pendingProps.children, tr(i, u), y = pi(y), d = d(y), i.flags |= 1, Ir(r, i, d, u), i.child;
      case 14:
        return d = i.type, y = Ui(d, i.pendingProps), y = Ui(d.type, y), cs(r, i, d, y, u);
      case 15:
        return en(r, i, i.type, i.pendingProps, u);
      case 17:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Ui(d, y), vi(r, i), i.tag = 1, mr(d) ? (r = !0, Lr(i)) : r = !1, tr(i, u), Qf(i, d, y), pc(i, d, y, u), mc(null, i, d, !0, r, u);
      case 19:
        return rl(r, i, u);
      case 22:
        return hc(r, i, u);
    }
    throw Error(s(156, i.tag));
  };
  function Hm(r, i) {
    return xn(r, i);
  }
  function k1(r, i, u, d) {
    this.tag = r, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = d, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yi(r, i, u, d) {
    return new k1(r, i, u, d);
  }
  function rv(r) {
    return r = r.prototype, !(!r || !r.isReactComponent);
  }
  function D1(r) {
    if (typeof r == "function") return rv(r) ? 1 : 0;
    if (r != null) {
      if (r = r.$$typeof, r === ee) return 11;
      if (r === ae) return 14;
    }
    return 2;
  }
  function xo(r, i) {
    var u = r.alternate;
    return u === null ? (u = yi(r.tag, i, r.key, r.mode), u.elementType = r.elementType, u.type = r.type, u.stateNode = r.stateNode, u.alternate = r, r.alternate = u) : (u.pendingProps = i, u.type = r.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = r.flags & 14680064, u.childLanes = r.childLanes, u.lanes = r.lanes, u.child = r.child, u.memoizedProps = r.memoizedProps, u.memoizedState = r.memoizedState, u.updateQueue = r.updateQueue, i = r.dependencies, u.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, u.sibling = r.sibling, u.index = r.index, u.ref = r.ref, u;
  }
  function Dc(r, i, u, d, y, w) {
    var A = 2;
    if (d = r, typeof r == "function") rv(r) && (A = 1);
    else if (typeof r == "string") A = 5;
    else e: switch (r) {
      case V:
        return Ul(u.children, y, w, i);
      case oe:
        A = 8, y |= 8;
        break;
      case B:
        return r = yi(12, u, i, y | 2), r.elementType = B, r.lanes = w, r;
      case W:
        return r = yi(13, u, i, y), r.elementType = W, r.lanes = w, r;
      case X:
        return r = yi(19, u, i, y), r.elementType = X, r.lanes = w, r;
      case le:
        return wo(u, y, w, i);
      default:
        if (typeof r == "object" && r !== null) switch (r.$$typeof) {
          case $:
            A = 10;
            break e;
          case J:
            A = 9;
            break e;
          case ee:
            A = 11;
            break e;
          case ae:
            A = 14;
            break e;
          case de:
            A = 16, d = null;
            break e;
        }
        throw Error(s(130, r == null ? r : typeof r, ""));
    }
    return i = yi(A, u, i, y), i.elementType = r, i.type = d, i.lanes = w, i;
  }
  function Ul(r, i, u, d) {
    return r = yi(7, r, d, i), r.lanes = u, r;
  }
  function wo(r, i, u, d) {
    return r = yi(22, r, d, i), r.elementType = le, r.lanes = u, r.stateNode = { isHidden: !1 }, r;
  }
  function av(r, i, u) {
    return r = yi(6, r, null, i), r.lanes = u, r;
  }
  function id(r, i, u) {
    return i = yi(4, r.children !== null ? r.children : [], r.key, i), i.lanes = u, i.stateNode = { containerInfo: r.containerInfo, pendingChildren: null, implementation: r.implementation }, i;
  }
  function Vm(r, i, u, d, y) {
    this.tag = i, this.containerInfo = r, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ns(0), this.expirationTimes = Ns(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ns(0), this.identifierPrefix = d, this.onRecoverableError = y, this.mutableSourceEagerHydrationData = null;
  }
  function ld(r, i, u, d, y, w, A, q, K) {
    return r = new Vm(r, i, u, q, K), i === 1 ? (i = 1, w === !0 && (i |= 8)) : i = 0, w = yi(3, null, null, i), r.current = w, w.stateNode = r, w.memoizedState = { element: d, isDehydrated: u, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Lp(w), r;
  }
  function O1(r, i, u) {
    var d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: I, key: d == null ? null : "" + d, children: r, containerInfo: i, implementation: u };
  }
  function iv(r) {
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
            if (mr(i.type)) {
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
      if (mr(u)) return Ju(r, u, i);
    }
    return i;
  }
  function Im(r, i, u, d, y, w, A, q, K) {
    return r = ld(u, d, !0, r, y, w, A, q, K), r.context = iv(null), u = r.current, d = wr(), y = ol(u), w = Ol(d, y), w.callback = i ?? null, vo(u, w, y), r.current.lanes = y, xl(r, y, d), Fa(r, d), r;
  }
  function od(r, i, u, d) {
    var y = i.current, w = wr(), A = ol(y);
    return u = iv(u), i.context === null ? i.context = u : i.pendingContext = u, i = Ol(w, A), i.payload = { element: r }, d = d === void 0 ? null : d, d !== null && (i.callback = d), r = vo(y, i, A), r !== null && (ma(r, y, A, w), Mf(r, y, A)), A;
  }
  function sd(r) {
    return r = r.current, r.child ? (r.child.tag === 5, r.child.stateNode) : null;
  }
  function lv(r, i) {
    if (r = r.memoizedState, r !== null && r.dehydrated !== null) {
      var u = r.retryLane;
      r.retryLane = u !== 0 && u < i ? u : i;
    }
  }
  function ud(r, i) {
    lv(r, i), (r = r.alternate) && lv(r, i);
  }
  function qm() {
    return null;
  }
  var ms = typeof reportError == "function" ? reportError : function(r) {
    console.error(r);
  };
  function ov(r) {
    this._internalRoot = r;
  }
  cd.prototype.render = ov.prototype.render = function(r) {
    var i = this._internalRoot;
    if (i === null) throw Error(s(409));
    od(r, i, null, null);
  }, cd.prototype.unmount = ov.prototype.unmount = function() {
    var r = this._internalRoot;
    if (r !== null) {
      this._internalRoot = null;
      var i = r.containerInfo;
      vs(function() {
        od(null, r, null, null);
      }), i[Ml] = null;
    }
  };
  function cd(r) {
    this._internalRoot = r;
  }
  cd.prototype.unstable_scheduleHydration = function(r) {
    if (r) {
      var i = Qt();
      r = { blockedOn: null, target: r, priority: i };
      for (var u = 0; u < Mr.length && i !== 0 && i < Mr[u].priority; u++) ;
      Mr.splice(u, 0, r), u === 0 && Pu(r);
    }
  };
  function sv(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11);
  }
  function fd(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11 && (r.nodeType !== 8 || r.nodeValue !== " react-mount-point-unstable "));
  }
  function Ym() {
  }
  function A1(r, i, u, d, y) {
    if (y) {
      if (typeof d == "function") {
        var w = d;
        d = function() {
          var ye = sd(A);
          w.call(ye);
        };
      }
      var A = Im(i, d, r, 0, null, !1, !1, "", Ym);
      return r._reactRootContainer = A, r[Ml] = A.current, Ws(r.nodeType === 8 ? r.parentNode : r), vs(), A;
    }
    for (; y = r.lastChild; ) r.removeChild(y);
    if (typeof d == "function") {
      var q = d;
      d = function() {
        var ye = sd(K);
        q.call(ye);
      };
    }
    var K = ld(r, 0, !1, null, null, !1, !1, "", Ym);
    return r._reactRootContainer = K, r[Ml] = K.current, Ws(r.nodeType === 8 ? r.parentNode : r), vs(function() {
      od(i, K, u, d);
    }), K;
  }
  function Oc(r, i, u, d, y) {
    var w = u._reactRootContainer;
    if (w) {
      var A = w;
      if (typeof y == "function") {
        var q = y;
        y = function() {
          var K = sd(A);
          q.call(K);
        };
      }
      od(i, A, r, y);
    } else A = A1(u, i, r, y, d);
    return sd(A);
  }
  Sn = function(r) {
    switch (r.tag) {
      case 3:
        var i = r.stateNode;
        if (i.current.memoizedState.isDehydrated) {
          var u = un(i.pendingLanes);
          u !== 0 && (wl(i, u | 1), Fa(i, Wt()), (vn & 6) === 0 && (lu = Wt() + 500, Ji()));
        }
        break;
      case 13:
        vs(function() {
          var d = Qa(r, 1);
          if (d !== null) {
            var y = wr();
            ma(d, r, 1, y);
          }
        }), ud(r, 1);
    }
  }, ju = function(r) {
    if (r.tag === 13) {
      var i = Qa(r, 134217728);
      if (i !== null) {
        var u = wr();
        ma(i, r, 134217728, u);
      }
      ud(r, 134217728);
    }
  }, Yi = function(r) {
    if (r.tag === 13) {
      var i = ol(r), u = Qa(r, i);
      if (u !== null) {
        var d = wr();
        ma(u, r, i, d);
      }
      ud(r, i);
    }
  }, Qt = function() {
    return bn;
  }, js = function(r, i) {
    var u = bn;
    try {
      return bn = r, i();
    } finally {
      bn = u;
    }
  }, kt = function(r, i, u) {
    switch (i) {
      case "input":
        if (Ae(r, u), i = u.name, u.type === "radio" && i != null) {
          for (u = r; u.parentNode; ) u = u.parentNode;
          for (u = u.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'), i = 0; i < u.length; i++) {
            var d = u[i];
            if (d !== r && d.form === r.form) {
              var y = er(d);
              if (!y) throw Error(s(90));
              ke(d), Ae(d, y);
            }
          }
        }
        break;
      case "textarea":
        Je(r, u);
        break;
      case "select":
        i = u.value, i != null && Ce(r, !!u.multiple, i, !1);
    }
  }, Pr = ev, Cr = vs;
  var z1 = { usingClientEntryPoint: !1, Events: [At, Li, er, Hn, Gn, ev] }, Ac = { findFiberByHostInstance: Xo, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Wm = { bundleType: Ac.bundleType, version: Ac.version, rendererPackageName: Ac.rendererPackageName, rendererConfig: Ac.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: N.ReactCurrentDispatcher, findHostInstanceByFiber: function(r) {
    return r = Qn(r), r === null ? null : r.stateNode;
  }, findFiberByHostInstance: Ac.findFiberByHostInstance || qm, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var bo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!bo.isDisabled && bo.supportsFiber) try {
      ai = bo.inject(Wm), Bn = bo;
    } catch {
    }
  }
  return bi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = z1, bi.createPortal = function(r, i) {
    var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!sv(i)) throw Error(s(200));
    return O1(r, i, null, u);
  }, bi.createRoot = function(r, i) {
    if (!sv(r)) throw Error(s(299));
    var u = !1, d = "", y = ms;
    return i != null && (i.unstable_strictMode === !0 && (u = !0), i.identifierPrefix !== void 0 && (d = i.identifierPrefix), i.onRecoverableError !== void 0 && (y = i.onRecoverableError)), i = ld(r, 1, !1, null, null, u, !1, d, y), r[Ml] = i.current, Ws(r.nodeType === 8 ? r.parentNode : r), new ov(i);
  }, bi.findDOMNode = function(r) {
    if (r == null) return null;
    if (r.nodeType === 1) return r;
    var i = r._reactInternals;
    if (i === void 0)
      throw typeof r.render == "function" ? Error(s(188)) : (r = Object.keys(r).join(","), Error(s(268, r)));
    return r = Qn(i), r = r === null ? null : r.stateNode, r;
  }, bi.flushSync = function(r) {
    return vs(r);
  }, bi.hydrate = function(r, i, u) {
    if (!fd(i)) throw Error(s(200));
    return Oc(null, r, i, !0, u);
  }, bi.hydrateRoot = function(r, i, u) {
    if (!sv(r)) throw Error(s(405));
    var d = u != null && u.hydratedSources || null, y = !1, w = "", A = ms;
    if (u != null && (u.unstable_strictMode === !0 && (y = !0), u.identifierPrefix !== void 0 && (w = u.identifierPrefix), u.onRecoverableError !== void 0 && (A = u.onRecoverableError)), i = Im(i, null, r, 1, u ?? null, y, !1, w, A), r[Ml] = i.current, Ws(r), d) for (r = 0; r < d.length; r++) u = d[r], y = u._getVersion, y = y(u._source), i.mutableSourceEagerHydrationData == null ? i.mutableSourceEagerHydrationData = [u, y] : i.mutableSourceEagerHydrationData.push(
      u,
      y
    );
    return new cd(i);
  }, bi.render = function(r, i, u) {
    if (!fd(i)) throw Error(s(200));
    return Oc(null, r, i, !1, u);
  }, bi.unmountComponentAtNode = function(r) {
    if (!fd(r)) throw Error(s(40));
    return r._reactRootContainer ? (vs(function() {
      Oc(null, null, r, !1, function() {
        r._reactRootContainer = null, r[Ml] = null;
      });
    }), !0) : !1;
  }, bi.unstable_batchedUpdates = ev, bi.unstable_renderSubtreeIntoContainer = function(r, i, u, d) {
    if (!fd(u)) throw Error(s(200));
    if (r == null || r._reactInternals === void 0) throw Error(s(38));
    return Oc(r, i, u, !1, d);
  }, bi.version = "18.3.1-next-f1338f8080-20240426", bi;
}
var Ci = {};
var bb;
function eN() {
  return bb || (bb = 1, process.env.NODE_ENV !== "production" && (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var t = Ah(), a = KC(), s = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, f = !1;
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
        var o = s.ReactDebugCurrentFrame, c = o.getStackAddendum();
        c !== "" && (n += "%s", l = l.concat([c]));
        var h = l.map(function(S) {
          return String(S);
        });
        h.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, h);
      }
    }
    var g = 0, x = 1, b = 2, C = 3, R = 4, _ = 5, k = 6, O = 7, z = 8, F = 9, Y = 10, P = 11, N = 12, H = 13, I = 14, V = 15, oe = 16, B = 17, $ = 18, J = 19, ee = 21, W = 22, X = 23, ae = 24, de = 25, le = !0, ie = !1, se = !1, ve = !1, U = !1, Z = !0, xe = !0, be = !0, Le = !0, Me = /* @__PURE__ */ new Set(), Oe = {}, Pe = {};
    function _e(e, n) {
      je(e, n), je(e + "Capture", n);
    }
    function je(e, n) {
      Oe[e] && v("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Oe[e] = n;
      {
        var l = e.toLowerCase();
        Pe[l] = e, e === "onDoubleClick" && (Pe.ondblclick = e);
      }
      for (var o = 0; o < n.length; o++)
        Me.add(n[o]);
    }
    var Be = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", ke = Object.prototype.hasOwnProperty;
    function $e(e) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, l = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return l;
      }
    }
    function Se(e) {
      try {
        return Ye(e), !1;
      } catch {
        return !0;
      }
    }
    function Ye(e) {
      return "" + e;
    }
    function Ze(e, n) {
      if (Se(e))
        return v("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", n, $e(e)), Ye(e);
    }
    function Ae(e) {
      if (Se(e))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", $e(e)), Ye(e);
    }
    function tt(e, n) {
      if (Se(e))
        return v("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", n, $e(e)), Ye(e);
    }
    function yt(e, n) {
      if (Se(e))
        return v("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", n, $e(e)), Ye(e);
    }
    function ct(e) {
      if (Se(e))
        return v("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", $e(e)), Ye(e);
    }
    function Ce(e) {
      if (Se(e))
        return v("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", $e(e)), Ye(e);
    }
    var qe = 0, lt = 1, Je = 2, St = 3, et = 4, Et = 5, Ot = 6, $t = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", we = $t + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Ie = new RegExp("^[" + $t + "][" + we + "]*$"), it = {}, We = {};
    function Mt(e) {
      return ke.call(We, e) ? !0 : ke.call(it, e) ? !1 : Ie.test(e) ? (We[e] = !0, !0) : (it[e] = !0, v("Invalid attribute name: `%s`", e), !1);
    }
    function Ht(e, n, l) {
      return n !== null ? n.type === qe : l ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function Ct(e, n, l, o) {
      if (l !== null && l.type === qe)
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
      if (n === null || typeof n > "u" || Ct(e, n, l, o))
        return !0;
      if (o)
        return !1;
      if (l !== null)
        switch (l.type) {
          case St:
            return !n;
          case et:
            return n === !1;
          case Et:
            return isNaN(n);
          case Ot:
            return isNaN(n) || n < 1;
        }
      return !1;
    }
    function Ne(e) {
      return kt.hasOwnProperty(e) ? kt[e] : null;
    }
    function ft(e, n, l, o, c, h, S) {
      this.acceptsBooleans = n === Je || n === St || n === et, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = e, this.type = n, this.sanitizeURL = h, this.removeEmptyString = S;
    }
    var kt = {}, Zt = [
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
      kt[e] = new ft(
        e,
        qe,
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
      kt[n] = new ft(
        n,
        lt,
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
      kt[e] = new ft(
        e,
        Je,
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
      kt[e] = new ft(
        e,
        Je,
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
      kt[e] = new ft(
        e,
        St,
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
      kt[e] = new ft(
        e,
        St,
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
      kt[e] = new ft(
        e,
        et,
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
      kt[e] = new ft(
        e,
        Ot,
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
      kt[e] = new ft(
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
      kt[n] = new ft(
        n,
        lt,
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
      kt[n] = new ft(
        n,
        lt,
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
      kt[n] = new ft(
        n,
        lt,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      kt[e] = new ft(
        e,
        lt,
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
    kt[Hn] = new ft(
      "xlinkHref",
      lt,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      kt[e] = new ft(
        e,
        lt,
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
    var Gn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Pr = !1;
    function Cr(e) {
      !Pr && Gn.test(e) && (Pr = !0, v("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function vr(e, n, l, o) {
      if (o.mustUseProperty) {
        var c = o.propertyName;
        return e[c];
      } else {
        Ze(l, n), o.sanitizeURL && Cr("" + l);
        var h = o.attributeName, S = null;
        if (o.type === et) {
          if (e.hasAttribute(h)) {
            var T = e.getAttribute(h);
            return T === "" ? !0 : ht(n, l, o, !1) ? T : T === "" + l ? l : T;
          }
        } else if (e.hasAttribute(h)) {
          if (ht(n, l, o, !1))
            return e.getAttribute(h);
          if (o.type === St)
            return l;
          S = e.getAttribute(h);
        }
        return ht(n, l, o, !1) ? S === null ? l : S : S === "" + l ? l : S;
      }
    }
    function Mi(e, n, l, o) {
      {
        if (!Mt(n))
          return;
        if (!e.hasAttribute(n))
          return l === void 0 ? void 0 : null;
        var c = e.getAttribute(n);
        return Ze(l, n), c === "" + l ? l : c;
      }
    }
    function Tr(e, n, l, o) {
      var c = Ne(n);
      if (!Ht(n, c, o)) {
        if (ht(n, l, c, o) && (l = null), o || c === null) {
          if (Mt(n)) {
            var h = n;
            l === null ? e.removeAttribute(h) : (Ze(l, n), e.setAttribute(h, "" + l));
          }
          return;
        }
        var S = c.mustUseProperty;
        if (S) {
          var T = c.propertyName;
          if (l === null) {
            var M = c.type;
            e[T] = M === St ? !1 : "";
          } else
            e[T] = l;
          return;
        }
        var L = c.attributeName, j = c.attributeNamespace;
        if (l === null)
          e.removeAttribute(L);
        else {
          var re = c.type, te;
          re === St || re === et && l === !0 ? te = "" : (Ze(l, L), te = "" + l, c.sanitizeURL && Cr(te.toString())), j ? e.setAttributeNS(j, L, te) : e.setAttribute(L, te);
        }
      }
    }
    var Ar = /* @__PURE__ */ Symbol.for("react.element"), Vn = /* @__PURE__ */ Symbol.for("react.portal"), Ra = /* @__PURE__ */ Symbol.for("react.fragment"), oa = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ya = /* @__PURE__ */ Symbol.for("react.profiler"), zr = /* @__PURE__ */ Symbol.for("react.provider"), Q = /* @__PURE__ */ Symbol.for("react.context"), ze = /* @__PURE__ */ Symbol.for("react.forward_ref"), nt = /* @__PURE__ */ Symbol.for("react.suspense"), dt = /* @__PURE__ */ Symbol.for("react.suspense_list"), Yt = /* @__PURE__ */ Symbol.for("react.memo"), It = /* @__PURE__ */ Symbol.for("react.lazy"), tn = /* @__PURE__ */ Symbol.for("react.scope"), Jt = /* @__PURE__ */ Symbol.for("react.debug_trace_mode"), Qn = /* @__PURE__ */ Symbol.for("react.offscreen"), gn = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), xn = /* @__PURE__ */ Symbol.for("react.cache"), In = /* @__PURE__ */ Symbol.for("react.tracing_marker"), Ma = Symbol.iterator, sa = "@@iterator";
    function Wt(e) {
      if (e === null || typeof e != "object")
        return null;
      var n = Ma && e[Ma] || e[sa];
      return typeof n == "function" ? n : null;
    }
    var Bt = Object.assign, ua = 0, _i, ki, Di, qi, ai, Bn, $o;
    function $r() {
    }
    $r.__reactDisabledLog = !0;
    function zs() {
      {
        if (ua === 0) {
          _i = console.log, ki = console.info, Di = console.warn, qi = console.error, ai = console.group, Bn = console.groupCollapsed, $o = console.groupEnd;
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
    function Zl() {
      {
        if (ua--, ua === 0) {
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
              value: Bn
            }),
            groupEnd: Bt({}, e, {
              value: $o
            })
          });
        }
        ua < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var on = s.ReactCurrentDispatcher, Ut;
    function an(e, n, l) {
      {
        if (Ut === void 0)
          try {
            throw Error();
          } catch (c) {
            var o = c.stack.trim().match(/\n( *(at )?)/);
            Ut = o && o[1] || "";
          }
        return `
` + Ut + e;
      }
    }
    var un = !1, Zn;
    {
      var ca = typeof WeakMap == "function" ? WeakMap : Map;
      Zn = new ca();
    }
    function Rr(e, n) {
      if (!e || un)
        return "";
      {
        var l = Zn.get(e);
        if (l !== void 0)
          return l;
      }
      var o;
      un = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var h;
      h = on.current, on.current = null, zs();
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
`), M = o.stack.split(`
`), L = T.length - 1, j = M.length - 1; L >= 1 && j >= 0 && T[L] !== M[j]; )
            j--;
          for (; L >= 1 && j >= 0; L--, j--)
            if (T[L] !== M[j]) {
              if (L !== 1 || j !== 1)
                do
                  if (L--, j--, j < 0 || T[L] !== M[j]) {
                    var re = `
` + T[L].replace(" at new ", " at ");
                    return e.displayName && re.includes("<anonymous>") && (re = re.replace("<anonymous>", e.displayName)), typeof e == "function" && Zn.set(e, re), re;
                  }
                while (L >= 1 && j >= 0);
              break;
            }
        }
      } finally {
        un = !1, on.current = h, Zl(), Error.prepareStackTrace = c;
      }
      var te = e ? e.displayName || e.name : "", he = te ? an(te) : "";
      return typeof e == "function" && Zn.set(e, he), he;
    }
    function Jl(e, n, l) {
      return Rr(e, !0);
    }
    function Ls(e, n, l) {
      return Rr(e, !1);
    }
    function Ns(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function xl(e, n, l) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Rr(e, Ns(e));
      if (typeof e == "string")
        return an(e);
      switch (e) {
        case nt:
          return an("Suspense");
        case dt:
          return an("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case ze:
            return Ls(e.render);
          case Yt:
            return xl(e.type, n, l);
          case It: {
            var o = e, c = o._payload, h = o._init;
            try {
              return xl(h(c), n, l);
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
        case H:
          return an("Suspense");
        case J:
          return an("SuspenseList");
        case g:
        case b:
        case V:
          return Ls(e.type);
        case P:
          return Ls(e.type.render);
        case x:
          return Jl(e.type);
        default:
          return "";
      }
    }
    function wl(e) {
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
    function bn(e, n, l) {
      var o = e.displayName;
      if (o)
        return o;
      var c = n.displayName || n.name || "";
      return c !== "" ? l + "(" + c + ")" : l;
    }
    function Us(e) {
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
        case nt:
          return "Suspense";
        case dt:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case Q:
            var n = e;
            return Us(n) + ".Consumer";
          case zr:
            var l = e;
            return Us(l._context) + ".Provider";
          case ze:
            return bn(e, e.render, "ForwardRef");
          case Yt:
            var o = e.displayName || null;
            return o !== null ? o : Sn(e.type) || "Memo";
          case It: {
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
    function ju(e, n, l) {
      var o = n.displayName || n.name || "";
      return e.displayName || (o !== "" ? l + "(" + o + ")" : l);
    }
    function Yi(e) {
      return e.displayName || "Context";
    }
    function Qt(e) {
      var n = e.tag, l = e.type;
      switch (n) {
        case ae:
          return "Cache";
        case F:
          var o = l;
          return Yi(o) + ".Consumer";
        case Y:
          var c = l;
          return Yi(c._context) + ".Provider";
        case $:
          return "DehydratedFragment";
        case P:
          return ju(l, l.render, "ForwardRef");
        case O:
          return "Fragment";
        case _:
          return l;
        case R:
          return "Portal";
        case C:
          return "Root";
        case k:
          return "Text";
        case oe:
          return Sn(l);
        case z:
          return l === oa ? "StrictMode" : "Mode";
        case W:
          return "Offscreen";
        case N:
          return "Profiler";
        case ee:
          return "Scope";
        case H:
          return "Suspense";
        case J:
          return "SuspenseList";
        case de:
          return "TracingMarker";
        // The display name for this tags come from the user-provided type:
        case x:
        case g:
        case B:
        case b:
        case I:
        case V:
          if (typeof l == "function")
            return l.displayName || l.name || null;
          if (typeof l == "string")
            return l;
          break;
      }
      return null;
    }
    var js = s.ReactDebugCurrentFrame, Hr = null, Wi = !1;
    function fa() {
      {
        if (Hr === null)
          return null;
        var e = Hr._debugOwner;
        if (e !== null && typeof e < "u")
          return Qt(e);
      }
      return null;
    }
    function Gi() {
      return Hr === null ? "" : wl(Hr);
    }
    function qn() {
      js.getCurrentStack = null, Hr = null, Wi = !1;
    }
    function On(e) {
      js.getCurrentStack = e === null ? null : Gi, Hr = e, Wi = !1;
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
          return Ce(e), e;
        default:
          return "";
      }
    }
    var Ho = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Fu(e, n) {
      Ho[n.type] || n.onChange || n.onInput || n.readOnly || n.disabled || n.value == null || v("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), n.onChange || n.readOnly || n.disabled || n.checked == null || v("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Pu(e) {
      var n = e.type, l = e.nodeName;
      return l && l.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
    }
    function to(e) {
      return e._valueTracker;
    }
    function Vo(e) {
      e._valueTracker = null;
    }
    function ap(e) {
      var n = "";
      return e && (Pu(e) ? n = e.checked ? "true" : "false" : n = e.value), n;
    }
    function li(e) {
      var n = Pu(e) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(e.constructor.prototype, n);
      Ce(e[n]);
      var o = "" + e[n];
      if (!(e.hasOwnProperty(n) || typeof l > "u" || typeof l.get != "function" || typeof l.set != "function")) {
        var c = l.get, h = l.set;
        Object.defineProperty(e, n, {
          configurable: !0,
          get: function() {
            return c.call(this);
          },
          set: function(T) {
            Ce(T), o = "" + T, h.call(this, T);
          }
        }), Object.defineProperty(e, n, {
          enumerable: l.enumerable
        });
        var S = {
          getValue: function() {
            return o;
          },
          setValue: function(T) {
            Ce(T), o = "" + T;
          },
          stopTracking: function() {
            Vo(e), delete e[n];
          }
        };
        return S;
      }
    }
    function Oi(e) {
      to(e) || (e._valueTracker = li(e));
    }
    function Qi(e) {
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
    var Fs = !1, Ps = !1, no = !1, Io = !1;
    function $s(e) {
      var n = e.type === "checkbox" || e.type === "radio";
      return n ? e.checked != null : e.value != null;
    }
    function Hs(e, n) {
      var l = e, o = n.checked, c = Bt({}, n, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: o ?? l._wrapperState.initialChecked
      });
      return c;
    }
    function Ai(e, n) {
      Fu("input", n), n.checked !== void 0 && n.defaultChecked !== void 0 && !Ps && (v("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", fa() || "A component", n.type), Ps = !0), n.value !== void 0 && n.defaultValue !== void 0 && !Fs && (v("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", fa() || "A component", n.type), Fs = !0);
      var l = e, o = n.defaultValue == null ? "" : n.defaultValue;
      l._wrapperState = {
        initialChecked: n.checked != null ? n.checked : n.defaultChecked,
        initialValue: ii(n.value != null ? n.value : o),
        controlled: $s(n)
      };
    }
    function D(e, n) {
      var l = e, o = n.checked;
      o != null && Tr(l, "checked", o, !1);
    }
    function G(e, n) {
      var l = e;
      {
        var o = $s(n);
        !l._wrapperState.controlled && o && !Io && (v("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Io = !0), l._wrapperState.controlled && !o && !no && (v("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), no = !0);
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
      n.hasOwnProperty("value") ? Lt(l, n.type, c) : n.hasOwnProperty("defaultValue") && Lt(l, n.type, ii(n.defaultValue)), n.checked == null && n.defaultChecked != null && (l.defaultChecked = !!n.defaultChecked);
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
    function Ee(e, n) {
      var l = e;
      G(l, n), Ke(l, n);
    }
    function Ke(e, n) {
      var l = n.name;
      if (n.type === "radio" && l != null) {
        for (var o = e; o.parentNode; )
          o = o.parentNode;
        Ze(l, "name");
        for (var c = o.querySelectorAll("input[name=" + JSON.stringify("" + l) + '][type="radio"]'), h = 0; h < c.length; h++) {
          var S = c[h];
          if (!(S === e || S.form !== e.form)) {
            var T = cy(S);
            if (!T)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            Qi(S), G(S, T);
          }
        }
      }
    }
    function Lt(e, n, l) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (n !== "number" || oi(e.ownerDocument) !== e) && (l == null ? e.defaultValue = da(e._wrapperState.initialValue) : e.defaultValue !== da(l) && (e.defaultValue = da(l)));
    }
    var at = !1, Ft = !1, sn = !1;
    function En(e, n) {
      n.value == null && (typeof n.children == "object" && n.children !== null ? t.Children.forEach(n.children, function(l) {
        l != null && (typeof l == "string" || typeof l == "number" || Ft || (Ft = !0, v("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : n.dangerouslySetInnerHTML != null && (sn || (sn = !0, v("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), n.selected != null && !at && (v("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), at = !0);
    }
    function Fn(e, n) {
      n.value != null && e.setAttribute("value", da(ii(n.value)));
    }
    var An = Array.isArray;
    function rn(e) {
      return An(e);
    }
    var zn;
    zn = !1;
    function Jn() {
      var e = fa();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var ro = ["value", "defaultValue"];
    function $u(e) {
      {
        Fu("select", e);
        for (var n = 0; n < ro.length; n++) {
          var l = ro[n];
          if (e[l] != null) {
            var o = rn(e[l]);
            e.multiple && !o ? v("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", l, Jn()) : !e.multiple && o && v("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", l, Jn());
          }
        }
      }
    }
    function bl(e, n, l, o) {
      var c = e.options;
      if (n) {
        for (var h = l, S = {}, T = 0; T < h.length; T++)
          S["$" + h[T]] = !0;
        for (var M = 0; M < c.length; M++) {
          var L = S.hasOwnProperty("$" + c[M].value);
          c[M].selected !== L && (c[M].selected = L), L && o && (c[M].defaultSelected = !0);
        }
      } else {
        for (var j = da(ii(l)), re = null, te = 0; te < c.length; te++) {
          if (c[te].value === j) {
            c[te].selected = !0, o && (c[te].defaultSelected = !0);
            return;
          }
          re === null && !c[te].disabled && (re = c[te]);
        }
        re !== null && (re.selected = !0);
      }
    }
    function Hu(e, n) {
      return Bt({}, n, {
        value: void 0
      });
    }
    function qo(e, n) {
      var l = e;
      $u(n), l._wrapperState = {
        wasMultiple: !!n.multiple
      }, n.value !== void 0 && n.defaultValue !== void 0 && !zn && (v("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), zn = !0);
    }
    function ip(e, n) {
      var l = e;
      l.multiple = !!n.multiple;
      var o = n.value;
      o != null ? bl(l, !!n.multiple, o, !1) : n.defaultValue != null && bl(l, !!n.multiple, n.defaultValue, !0);
    }
    function af(e, n) {
      var l = e, o = l._wrapperState.wasMultiple;
      l._wrapperState.wasMultiple = !!n.multiple;
      var c = n.value;
      c != null ? bl(l, !!n.multiple, c, !1) : o !== !!n.multiple && (n.defaultValue != null ? bl(l, !!n.multiple, n.defaultValue, !0) : bl(l, !!n.multiple, n.multiple ? [] : "", !1));
    }
    function lp(e, n) {
      var l = e, o = n.value;
      o != null && bl(l, !!n.multiple, o, !1);
    }
    var zh = !1;
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
    function sp(e, n) {
      var l = e;
      Fu("textarea", n), n.value !== void 0 && n.defaultValue !== void 0 && !zh && (v("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", fa() || "A component"), zh = !0);
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
    function Lh(e, n) {
      var l = e, o = ii(n.value), c = ii(n.defaultValue);
      if (o != null) {
        var h = da(o);
        h !== l.value && (l.value = h), n.defaultValue == null && l.defaultValue !== h && (l.defaultValue = h);
      }
      c != null && (l.defaultValue = da(c));
    }
    function Nh(e, n) {
      var l = e, o = l.textContent;
      o === l._wrapperState.initialValue && o !== "" && o !== null && (l.value = o);
    }
    function s1(e, n) {
      Lh(e, n);
    }
    var Cl = "http://www.w3.org/1999/xhtml", up = "http://www.w3.org/1998/Math/MathML", cp = "http://www.w3.org/2000/svg";
    function fp(e) {
      switch (e) {
        case "svg":
          return cp;
        case "math":
          return up;
        default:
          return Cl;
      }
    }
    function dp(e, n) {
      return e == null || e === Cl ? fp(n) : e === cp && n === "foreignObject" ? Cl : e;
    }
    var Uh = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, l, o, c) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(n, l, o, c);
        });
      } : e;
    }, lf, jh = Uh(function(e, n) {
      if (e.namespaceURI === cp && !("innerHTML" in e)) {
        lf = lf || document.createElement("div"), lf.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>";
        for (var l = lf.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; l.firstChild; )
          e.appendChild(l.firstChild);
        return;
      }
      e.innerHTML = n;
    }), _a = 1, Tl = 3, hr = 8, Rl = 9, pp = 11, Vs = function(e, n) {
      if (n) {
        var l = e.firstChild;
        if (l && l === e.lastChild && l.nodeType === Tl) {
          l.nodeValue = n;
          return;
        }
      }
      e.textContent = n;
    }, Vu = {
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
    }, Iu = {
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
    function Fh(e, n) {
      return e + n.charAt(0).toUpperCase() + n.substring(1);
    }
    var Ph = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Iu).forEach(function(e) {
      Ph.forEach(function(n) {
        Iu[Fh(n, e)] = Iu[e];
      });
    });
    function of(e, n, l) {
      var o = n == null || typeof n == "boolean" || n === "";
      return o ? "" : !l && typeof n == "number" && n !== 0 && !(Iu.hasOwnProperty(e) && Iu[e]) ? n + "px" : (yt(n, e), ("" + n).trim());
    }
    var $h = /([A-Z])/g, Hh = /^ms-/;
    function Is(e) {
      return e.replace($h, "-$1").toLowerCase().replace(Hh, "-ms-");
    }
    var Vh = function() {
    };
    {
      var u1 = /^(?:webkit|moz|o)[A-Z]/, c1 = /^-ms-/, Ih = /-(.)/g, vp = /;\s*$/, Bi = {}, Yo = {}, qh = !1, qu = !1, f1 = function(e) {
        return e.replace(Ih, function(n, l) {
          return l.toUpperCase();
        });
      }, Yh = function(e) {
        Bi.hasOwnProperty(e) && Bi[e] || (Bi[e] = !0, v(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          f1(e.replace(c1, "ms-"))
        ));
      }, hp = function(e) {
        Bi.hasOwnProperty(e) && Bi[e] || (Bi[e] = !0, v("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, mp = function(e, n) {
        Yo.hasOwnProperty(n) && Yo[n] || (Yo[n] = !0, v(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, n.replace(vp, "")));
      }, Wh = function(e, n) {
        qh || (qh = !0, v("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Gh = function(e, n) {
        qu || (qu = !0, v("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Vh = function(e, n) {
        e.indexOf("-") > -1 ? Yh(e) : u1.test(e) ? hp(e) : vp.test(n) && mp(e, n), typeof n == "number" && (isNaN(n) ? Wh(e, n) : isFinite(n) || Gh(e, n));
      };
    }
    var Qh = Vh;
    function d1(e) {
      {
        var n = "", l = "";
        for (var o in e)
          if (e.hasOwnProperty(o)) {
            var c = e[o];
            if (c != null) {
              var h = o.indexOf("--") === 0;
              n += l + (h ? o : Is(o)) + ":", n += of(o, c, h), l = ";";
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
          c || Qh(o, n[o]);
          var h = of(o, n[o], c);
          o === "float" && (o = "cssFloat"), c ? l.setProperty(o, h) : l[o] = h;
        }
    }
    function p1(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Xh(e) {
      var n = {};
      for (var l in e)
        for (var o = Vu[l] || [l], c = 0; c < o.length; c++)
          n[o[c]] = l;
      return n;
    }
    function v1(e, n) {
      {
        if (!n)
          return;
        var l = Xh(e), o = Xh(n), c = {};
        for (var h in l) {
          var S = l[h], T = o[h];
          if (T && S !== T) {
            var M = S + "," + T;
            if (c[M])
              continue;
            c[M] = !0, v("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", p1(e[S]) ? "Removing" : "Updating", S, T);
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
    }, Yu = Bt({
      menuitem: !0
    }, zi), Kh = "__html";
    function sf(e, n) {
      if (n) {
        if (Yu[e] && (n.children != null || n.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (n.dangerouslySetInnerHTML != null) {
          if (n.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof n.dangerouslySetInnerHTML != "object" || !(Kh in n.dangerouslySetInnerHTML))
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
    var Wu = {
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
    }, uf = {
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
    }, qs = {}, h1 = new RegExp("^(aria)-[" + we + "]*$"), Ys = new RegExp("^(aria)[A-Z][" + we + "]*$");
    function yp(e, n) {
      {
        if (ke.call(qs, n) && qs[n])
          return !0;
        if (Ys.test(n)) {
          var l = "aria-" + n.slice(4).toLowerCase(), o = uf.hasOwnProperty(l) ? l : null;
          if (o == null)
            return v("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", n), qs[n] = !0, !0;
          if (n !== o)
            return v("Invalid ARIA attribute `%s`. Did you mean `%s`?", n, o), qs[n] = !0, !0;
        }
        if (h1.test(n)) {
          var c = n.toLowerCase(), h = uf.hasOwnProperty(c) ? c : null;
          if (h == null)
            return qs[n] = !0, !1;
          if (n !== h)
            return v("Unknown ARIA attribute `%s`. Did you mean `%s`?", n, h), qs[n] = !0, !0;
        }
      }
      return !0;
    }
    function Gu(e, n) {
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
      ao(e, n) || Gu(e, n);
    }
    var Sp = !1;
    function cf(e, n) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        n != null && n.value === null && !Sp && (Sp = !0, e === "select" && n.multiple ? v("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : v("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var Wo = function() {
    };
    {
      var Vr = {}, Ep = /^on./, ff = /^on[^A-Z]/, Zh = new RegExp("^(aria)-[" + we + "]*$"), Jh = new RegExp("^(aria)[A-Z][" + we + "]*$");
      Wo = function(e, n, l, o) {
        if (ke.call(Vr, n) && Vr[n])
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
          return ff.test(n) && v("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", n), Vr[n] = !0, !0;
        if (Zh.test(n) || Jh.test(n))
          return !0;
        if (c === "innerhtml")
          return v("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Vr[n] = !0, !0;
        if (c === "aria")
          return v("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Vr[n] = !0, !0;
        if (c === "is" && l !== null && l !== void 0 && typeof l != "string")
          return v("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof l), Vr[n] = !0, !0;
        if (typeof l == "number" && isNaN(l))
          return v("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", n), Vr[n] = !0, !0;
        var M = Ne(n), L = M !== null && M.type === qe;
        if (Wu.hasOwnProperty(c)) {
          var j = Wu[c];
          if (j !== n)
            return v("Invalid DOM property `%s`. Did you mean `%s`?", n, j), Vr[n] = !0, !0;
        } else if (!L && n !== c)
          return v("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", n, c), Vr[n] = !0, !0;
        return typeof l == "boolean" && Ct(n, l, M, !1) ? (l ? v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', l, n, n, l, n) : v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', l, n, n, l, n, n, n), Vr[n] = !0, !0) : L ? !0 : Ct(n, l, M, !1) ? (Vr[n] = !0, !1) : ((l === "false" || l === "true") && M !== null && M.type === St && (v("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", l, n, l === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', n, l), Vr[n] = !0), !0);
      };
    }
    var em = function(e, n, l) {
      {
        var o = [];
        for (var c in n) {
          var h = Wo(e, c, n[c], l);
          h || o.push(c);
        }
        var S = o.map(function(T) {
          return "`" + T + "`";
        }).join(", ");
        o.length === 1 ? v("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", S, e) : o.length > 1 && v("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", S, e);
      }
    };
    function tm(e, n, l) {
      ao(e, n) || em(e, n, l);
    }
    var xp = 1, df = 2, si = 4, wp = xp | df | si, Go = null;
    function m1(e) {
      Go !== null && v("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Go = e;
    }
    function y1() {
      Go === null && v("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Go = null;
    }
    function Qu(e) {
      return e === Go;
    }
    function bp(e) {
      var n = e.target || e.srcElement || window;
      return n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === Tl ? n.parentNode : n;
    }
    var pf = null, Qo = null, kn = null;
    function vf(e) {
      var n = du(e);
      if (n) {
        if (typeof pf != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var l = n.stateNode;
        if (l) {
          var o = cy(l);
          pf(n.stateNode, n.type, o);
        }
      }
    }
    function hf(e) {
      pf = e;
    }
    function Ws(e) {
      Qo ? kn ? kn.push(e) : kn = [e] : Qo = e;
    }
    function nm() {
      return Qo !== null || kn !== null;
    }
    function mf() {
      if (Qo) {
        var e = Qo, n = kn;
        if (Qo = null, kn = null, vf(e), n)
          for (var l = 0; l < n.length; l++)
            vf(n[l]);
      }
    }
    var Gs = function(e, n) {
      return e(n);
    }, Bu = function() {
    }, io = !1;
    function rm() {
      var e = nm();
      e && (Bu(), mf());
    }
    function am(e, n, l) {
      if (io)
        return e(n, l);
      io = !0;
      try {
        return Gs(e, n, l);
      } finally {
        io = !1, rm();
      }
    }
    function g1(e, n, l) {
      Gs = e, Bu = l;
    }
    function im(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function yf(e, n, l) {
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
          return !!(l.disabled && im(n));
        default:
          return !1;
      }
    }
    function lo(e, n) {
      var l = e.stateNode;
      if (l === null)
        return null;
      var o = cy(l);
      if (o === null)
        return null;
      var c = o[n];
      if (yf(n, e.type, o))
        return null;
      if (c && typeof c != "function")
        throw new Error("Expected `" + n + "` listener to be a function, instead got a value of `" + typeof c + "` type.");
      return c;
    }
    var Xu = !1;
    if (Be)
      try {
        var Bo = {};
        Object.defineProperty(Bo, "passive", {
          get: function() {
            Xu = !0;
          }
        }), window.addEventListener("test", Bo, Bo), window.removeEventListener("test", Bo, Bo);
      } catch {
        Xu = !1;
      }
    function gf(e, n, l, o, c, h, S, T, M) {
      var L = Array.prototype.slice.call(arguments, 3);
      try {
        n.apply(l, L);
      } catch (j) {
        this.onError(j);
      }
    }
    var Sf = gf;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Cp = document.createElement("react");
      Sf = function(n, l, o, c, h, S, T, M, L) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var j = document.createEvent("Event"), re = !1, te = !0, he = window.event, ge = Object.getOwnPropertyDescriptor(window, "event");
        function Te() {
          Cp.removeEventListener(Re, Nt, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = he);
        }
        var st = Array.prototype.slice.call(arguments, 3);
        function Nt() {
          re = !0, Te(), l.apply(o, st), te = !1;
        }
        var _t, mn = !1, fn = !1;
        function ce(fe) {
          if (_t = fe.error, mn = !0, _t === null && fe.colno === 0 && fe.lineno === 0 && (fn = !0), fe.defaultPrevented && _t != null && typeof _t == "object")
            try {
              _t._suppressLogging = !0;
            } catch {
            }
        }
        var Re = "react-" + (n || "invokeguardedcallback");
        if (window.addEventListener("error", ce), Cp.addEventListener(Re, Nt, !1), j.initEvent(Re, !1, !1), Cp.dispatchEvent(j), ge && Object.defineProperty(window, "event", ge), re && te && (mn ? fn && (_t = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : _t = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(_t)), window.removeEventListener("error", ce), !re)
          return Te(), gf.apply(this, arguments);
      };
    }
    var lm = Sf, Qs = !1, Ef = null, Bs = !1, Xi = null, om = {
      onError: function(e) {
        Qs = !0, Ef = e;
      }
    };
    function oo(e, n, l, o, c, h, S, T, M) {
      Qs = !1, Ef = null, lm.apply(om, arguments);
    }
    function Ki(e, n, l, o, c, h, S, T, M) {
      if (oo.apply(this, arguments), Qs) {
        var L = Zu();
        Bs || (Bs = !0, Xi = L);
      }
    }
    function Ku() {
      if (Bs) {
        var e = Xi;
        throw Bs = !1, Xi = null, e;
      }
    }
    function Ml() {
      return Qs;
    }
    function Zu() {
      if (Qs) {
        var e = Ef;
        return Qs = !1, Ef = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Xs(e) {
      return e._reactInternals;
    }
    function S1(e) {
      return e._reactInternals !== void 0;
    }
    function Xo(e, n) {
      e._reactInternals = n;
    }
    var At = (
      /*                      */
      0
    ), Li = (
      /*                */
      1
    ), er = (
      /*                    */
      2
    ), pn = (
      /*                       */
      4
    ), ui = (
      /*                */
      16
    ), ci = (
      /*                 */
      32
    ), Pn = (
      /*                     */
      64
    ), Dt = (
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
    ), Ks = (
      /*             */
      16384
    ), sm = (
      /*               */
      32767
    ), Ju = (
      /*                   */
      32768
    ), Lr = (
      /*                */
      65536
    ), xf = (
      /* */
      131072
    ), Zi = (
      /*                       */
      1048576
    ), Zs = (
      /*                    */
      2097152
    ), _l = (
      /*                 */
      4194304
    ), wf = (
      /*                */
      8388608
    ), so = (
      /*               */
      16777216
    ), Ji = (
      /*              */
      33554432
    ), uo = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      pn | _r | 0
    ), co = er | pn | ui | ci | ir | Da | mr, fo = pn | Pn | ir | mr, kl = ka | ui, yr = _l | wf | Zs, fi = s.ReactCurrentOwner;
    function Wa(e) {
      var n = e, l = e;
      if (e.alternate)
        for (; n.return; )
          n = n.return;
      else {
        var o = n;
        do
          n = o, (n.flags & (er | Da)) !== At && (l = n.return), o = n.return;
        while (o);
      }
      return n.tag === C ? l : null;
    }
    function el(e) {
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
    function tl(e) {
      return e.tag === C ? e.stateNode.containerInfo : null;
    }
    function Ko(e) {
      return Wa(e) === e;
    }
    function um(e) {
      {
        var n = fi.current;
        if (n !== null && n.tag === x) {
          var l = n, o = l.stateNode;
          o._warnedAboutRefsInRender || v("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Qt(l) || "A component"), o._warnedAboutRefsInRender = !0;
        }
      }
      var c = Xs(e);
      return c ? Wa(c) === c : !1;
    }
    function bf(e) {
      if (Wa(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Cf(e) {
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
          for (var M = h.child; M; ) {
            if (M === o)
              return bf(h), e;
            if (M === c)
              return bf(h), n;
            M = M.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (o.return !== c.return)
          o = h, c = S;
        else {
          for (var L = !1, j = h.child; j; ) {
            if (j === o) {
              L = !0, o = h, c = S;
              break;
            }
            if (j === c) {
              L = !0, c = h, o = S;
              break;
            }
            j = j.sibling;
          }
          if (!L) {
            for (j = S.child; j; ) {
              if (j === o) {
                L = !0, o = S, c = h;
                break;
              }
              if (j === c) {
                L = !0, c = S, o = h;
                break;
              }
              j = j.sibling;
            }
            if (!L)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (o.alternate !== c)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (o.tag !== C)
        throw new Error("Unable to find node on an unmounted component.");
      return o.stateNode.current === o ? e : n;
    }
    function Oa(e) {
      var n = Cf(e);
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
      var n = Cf(e);
      return n !== null ? di(n) : null;
    }
    function di(e) {
      if (e.tag === _ || e.tag === k)
        return e;
      for (var n = e.child; n !== null; ) {
        if (n.tag !== R) {
          var l = di(n);
          if (l !== null)
            return l;
        }
        n = n.sibling;
      }
      return null;
    }
    var Tp = a.unstable_scheduleCallback, cm = a.unstable_cancelCallback, Rp = a.unstable_shouldYield, Mp = a.unstable_requestPaint, kr = a.unstable_now, Tf = a.unstable_getCurrentPriorityLevel, ec = a.unstable_ImmediatePriority, po = a.unstable_UserBlockingPriority, Dl = a.unstable_NormalPriority, E1 = a.unstable_LowPriority, Zo = a.unstable_IdlePriority, Rf = a.unstable_yieldValue, fm = a.unstable_setDisableYieldValue, Jo = null, or = null, ot = null, Ga = !1, za = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function Js(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var n = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (n.isDisabled)
        return !0;
      if (!n.supportsFiber)
        return v("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        xe && (e = Bt({}, e, {
          getLaneLabelMap: es,
          injectProfilingHooks: pi
        })), Jo = n.inject(e), or = n;
      } catch (l) {
        v("React instrumentation encountered an error: %s.", l);
      }
      return !!n.checkDCE;
    }
    function _p(e, n) {
      if (or && typeof or.onScheduleFiberRoot == "function")
        try {
          or.onScheduleFiberRoot(Jo, e, n);
        } catch (l) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", l));
        }
    }
    function kp(e, n) {
      if (or && typeof or.onCommitFiberRoot == "function")
        try {
          var l = (e.current.flags & Dt) === Dt;
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
                o = Dl;
                break;
              case hi:
                o = Zo;
                break;
              default:
                o = Dl;
                break;
            }
            or.onCommitFiberRoot(Jo, e, o, l);
          }
        } catch (c) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", c));
        }
    }
    function Dp(e) {
      if (or && typeof or.onPostCommitFiberRoot == "function")
        try {
          or.onPostCommitFiberRoot(Jo, e);
        } catch (n) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", n));
        }
    }
    function Op(e) {
      if (or && typeof or.onCommitFiberUnmount == "function")
        try {
          or.onCommitFiberUnmount(Jo, e);
        } catch (n) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", n));
        }
    }
    function tr(e) {
      if (typeof Rf == "function" && (fm(e), p(e)), or && typeof or.setStrictMode == "function")
        try {
          or.setStrictMode(Jo, e);
        } catch (n) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", n));
        }
    }
    function pi(e) {
      ot = e;
    }
    function es() {
      {
        for (var e = /* @__PURE__ */ new Map(), n = 1, l = 0; l < rs; l++) {
          var o = hm(n);
          e.set(n, o), n *= 2;
        }
        return e;
      }
    }
    function Ap(e) {
      ot !== null && typeof ot.markCommitStarted == "function" && ot.markCommitStarted(e);
    }
    function zp() {
      ot !== null && typeof ot.markCommitStopped == "function" && ot.markCommitStopped();
    }
    function Qa(e) {
      ot !== null && typeof ot.markComponentRenderStarted == "function" && ot.markComponentRenderStarted(e);
    }
    function Ba() {
      ot !== null && typeof ot.markComponentRenderStopped == "function" && ot.markComponentRenderStopped();
    }
    function Lp(e) {
      ot !== null && typeof ot.markComponentPassiveEffectMountStarted == "function" && ot.markComponentPassiveEffectMountStarted(e);
    }
    function dm() {
      ot !== null && typeof ot.markComponentPassiveEffectMountStopped == "function" && ot.markComponentPassiveEffectMountStopped();
    }
    function Ol(e) {
      ot !== null && typeof ot.markComponentPassiveEffectUnmountStarted == "function" && ot.markComponentPassiveEffectUnmountStarted(e);
    }
    function vo() {
      ot !== null && typeof ot.markComponentPassiveEffectUnmountStopped == "function" && ot.markComponentPassiveEffectUnmountStopped();
    }
    function Mf(e) {
      ot !== null && typeof ot.markComponentLayoutEffectMountStarted == "function" && ot.markComponentLayoutEffectMountStarted(e);
    }
    function pm() {
      ot !== null && typeof ot.markComponentLayoutEffectMountStopped == "function" && ot.markComponentLayoutEffectMountStopped();
    }
    function tc(e) {
      ot !== null && typeof ot.markComponentLayoutEffectUnmountStarted == "function" && ot.markComponentLayoutEffectUnmountStarted(e);
    }
    function Np() {
      ot !== null && typeof ot.markComponentLayoutEffectUnmountStopped == "function" && ot.markComponentLayoutEffectUnmountStopped();
    }
    function nc(e, n, l) {
      ot !== null && typeof ot.markComponentErrored == "function" && ot.markComponentErrored(e, n, l);
    }
    function nl(e, n, l) {
      ot !== null && typeof ot.markComponentSuspended == "function" && ot.markComponentSuspended(e, n, l);
    }
    function rc(e) {
      ot !== null && typeof ot.markLayoutEffectsStarted == "function" && ot.markLayoutEffectsStarted(e);
    }
    function ac() {
      ot !== null && typeof ot.markLayoutEffectsStopped == "function" && ot.markLayoutEffectsStopped();
    }
    function ts(e) {
      ot !== null && typeof ot.markPassiveEffectsStarted == "function" && ot.markPassiveEffectsStarted(e);
    }
    function Up() {
      ot !== null && typeof ot.markPassiveEffectsStopped == "function" && ot.markPassiveEffectsStopped();
    }
    function ns(e) {
      ot !== null && typeof ot.markRenderStarted == "function" && ot.markRenderStarted(e);
    }
    function vm() {
      ot !== null && typeof ot.markRenderYielded == "function" && ot.markRenderYielded();
    }
    function _f() {
      ot !== null && typeof ot.markRenderStopped == "function" && ot.markRenderStopped();
    }
    function nr(e) {
      ot !== null && typeof ot.markRenderScheduled == "function" && ot.markRenderScheduled(e);
    }
    function kf(e, n) {
      ot !== null && typeof ot.markForceUpdateScheduled == "function" && ot.markForceUpdateScheduled(e, n);
    }
    function ic(e, n) {
      ot !== null && typeof ot.markStateUpdateScheduled == "function" && ot.markStateUpdateScheduled(e, n);
    }
    var zt = (
      /*                         */
      0
    ), ln = (
      /*                 */
      1
    ), Cn = (
      /*                    */
      2
    ), Ln = (
      /*               */
      8
    ), Tn = (
      /*              */
      16
    ), gr = Math.clz32 ? Math.clz32 : lc, Nr = Math.log, Df = Math.LN2;
    function lc(e) {
      var n = e >>> 0;
      return n === 0 ? 32 : 31 - (Nr(n) / Df | 0) | 0;
    }
    var rs = 31, Ue = (
      /*                        */
      0
    ), wn = (
      /*                          */
      0
    ), Vt = (
      /*                        */
      1
    ), ho = (
      /*    */
      2
    ), Ni = (
      /*             */
      4
    ), ta = (
      /*            */
      8
    ), sr = (
      /*                     */
      16
    ), Al = (
      /*                */
      32
    ), mo = (
      /*                       */
      4194240
    ), as = (
      /*                        */
      64
    ), Of = (
      /*                        */
      128
    ), Af = (
      /*                        */
      256
    ), zf = (
      /*                        */
      512
    ), Lf = (
      /*                        */
      1024
    ), Nf = (
      /*                        */
      2048
    ), Uf = (
      /*                        */
      4096
    ), jf = (
      /*                        */
      8192
    ), Ff = (
      /*                        */
      16384
    ), is = (
      /*                       */
      32768
    ), Pf = (
      /*                       */
      65536
    ), eu = (
      /*                       */
      131072
    ), tu = (
      /*                       */
      262144
    ), $f = (
      /*                       */
      524288
    ), oc = (
      /*                       */
      1048576
    ), Hf = (
      /*                       */
      2097152
    ), sc = (
      /*                            */
      130023424
    ), ls = (
      /*                             */
      4194304
    ), Vf = (
      /*                             */
      8388608
    ), uc = (
      /*                             */
      16777216
    ), If = (
      /*                             */
      33554432
    ), qf = (
      /*                             */
      67108864
    ), jp = ls, cc = (
      /*          */
      134217728
    ), Fp = (
      /*                          */
      268435455
    ), fc = (
      /*               */
      268435456
    ), os = (
      /*                        */
      536870912
    ), La = (
      /*                   */
      1073741824
    );
    function hm(e) {
      {
        if (e & Vt)
          return "Sync";
        if (e & ho)
          return "InputContinuousHydration";
        if (e & Ni)
          return "InputContinuous";
        if (e & ta)
          return "DefaultHydration";
        if (e & sr)
          return "Default";
        if (e & Al)
          return "TransitionHydration";
        if (e & mo)
          return "Transition";
        if (e & sc)
          return "Retry";
        if (e & cc)
          return "SelectiveHydration";
        if (e & fc)
          return "IdleHydration";
        if (e & os)
          return "Idle";
        if (e & La)
          return "Offscreen";
      }
    }
    var jn = -1, ss = as, Yf = ls;
    function dc(e) {
      switch (yo(e)) {
        case Vt:
          return Vt;
        case ho:
          return ho;
        case Ni:
          return Ni;
        case ta:
          return ta;
        case sr:
          return sr;
        case Al:
          return Al;
        case as:
        case Of:
        case Af:
        case zf:
        case Lf:
        case Nf:
        case Uf:
        case jf:
        case Ff:
        case is:
        case Pf:
        case eu:
        case tu:
        case $f:
        case oc:
        case Hf:
          return e & mo;
        case ls:
        case Vf:
        case uc:
        case If:
        case qf:
          return e & sc;
        case cc:
          return cc;
        case fc:
          return fc;
        case os:
          return os;
        case La:
          return La;
        default:
          return v("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function Wf(e, n) {
      var l = e.pendingLanes;
      if (l === Ue)
        return Ue;
      var o = Ue, c = e.suspendedLanes, h = e.pingedLanes, S = l & Fp;
      if (S !== Ue) {
        var T = S & ~c;
        if (T !== Ue)
          o = dc(T);
        else {
          var M = S & h;
          M !== Ue && (o = dc(M));
        }
      } else {
        var L = l & ~c;
        L !== Ue ? o = dc(L) : h !== Ue && (o = dc(h));
      }
      if (o === Ue)
        return Ue;
      if (n !== Ue && n !== o && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (n & c) === Ue) {
        var j = yo(o), re = yo(n);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          j >= re || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          j === sr && (re & mo) !== Ue
        )
          return n;
      }
      (o & Ni) !== Ue && (o |= l & sr);
      var te = e.entangledLanes;
      if (te !== Ue)
        for (var he = e.entanglements, ge = o & te; ge > 0; ) {
          var Te = Sr(ge), st = 1 << Te;
          o |= he[Te], ge &= ~st;
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
        case Vt:
        case ho:
        case Ni:
          return n + 250;
        case ta:
        case sr:
        case Al:
        case as:
        case Of:
        case Af:
        case zf:
        case Lf:
        case Nf:
        case Uf:
        case jf:
        case Ff:
        case is:
        case Pf:
        case eu:
        case tu:
        case $f:
        case oc:
        case Hf:
          return n + 5e3;
        case ls:
        case Vf:
        case uc:
        case If:
        case qf:
          return jn;
        case cc:
        case fc:
        case os:
        case La:
          return jn;
        default:
          return v("Should have found matching lanes. This is a bug in React."), jn;
      }
    }
    function Gf(e, n) {
      for (var l = e.pendingLanes, o = e.suspendedLanes, c = e.pingedLanes, h = e.expirationTimes, S = l; S > 0; ) {
        var T = Sr(S), M = 1 << T, L = h[T];
        L === jn ? ((M & o) === Ue || (M & c) !== Ue) && (h[T] = Pp(M, n)) : L <= n && (e.expiredLanes |= M), S &= ~M;
      }
    }
    function mm(e) {
      return dc(e.pendingLanes);
    }
    function Qf(e) {
      var n = e.pendingLanes & ~La;
      return n !== Ue ? n : n & La ? La : Ue;
    }
    function ym(e) {
      return (e & Vt) !== Ue;
    }
    function pc(e) {
      return (e & Fp) !== Ue;
    }
    function us(e) {
      return (e & sc) === e;
    }
    function $p(e) {
      var n = Vt | Ni | sr;
      return (e & n) === Ue;
    }
    function Hp(e) {
      return (e & mo) === e;
    }
    function Bf(e, n) {
      var l = ho | Ni | ta | sr;
      return (n & l) !== Ue;
    }
    function gm(e, n) {
      return (n & e.expiredLanes) !== Ue;
    }
    function Vp(e) {
      return (e & mo) !== Ue;
    }
    function Ip() {
      var e = ss;
      return ss <<= 1, (ss & mo) === Ue && (ss = as), e;
    }
    function Sm() {
      var e = Yf;
      return Yf <<= 1, (Yf & sc) === Ue && (Yf = ls), e;
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
    function Na(e, n) {
      return (e & n) !== Ue;
    }
    function cs(e, n) {
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
    function Em(e) {
      return e;
    }
    function xm(e, n) {
      return e !== wn && e < n ? e : n;
    }
    function mc(e) {
      for (var n = [], l = 0; l < rs; l++)
        n.push(e);
      return n;
    }
    function nu(e, n, l) {
      e.pendingLanes |= n, n !== os && (e.suspendedLanes = Ue, e.pingedLanes = Ue);
      var o = e.eventTimes, c = Ir(n);
      o[c] = l;
    }
    function wm(e, n) {
      e.suspendedLanes |= n, e.pingedLanes &= ~n;
      for (var l = e.expirationTimes, o = n; o > 0; ) {
        var c = Sr(o), h = 1 << c;
        l[c] = jn, o &= ~h;
      }
    }
    function Xf(e, n, l) {
      e.pingedLanes |= e.suspendedLanes & n;
    }
    function Yp(e, n) {
      var l = e.pendingLanes & ~n;
      e.pendingLanes = n, e.suspendedLanes = Ue, e.pingedLanes = Ue, e.expiredLanes &= n, e.mutableReadLanes &= n, e.entangledLanes &= n;
      for (var o = e.entanglements, c = e.eventTimes, h = e.expirationTimes, S = l; S > 0; ) {
        var T = Sr(S), M = 1 << T;
        o[T] = Ue, c[T] = jn, h[T] = jn, S &= ~M;
      }
    }
    function Kf(e, n) {
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
        case Ni:
          o = ho;
          break;
        case sr:
          o = ta;
          break;
        case as:
        case Of:
        case Af:
        case zf:
        case Lf:
        case Nf:
        case Uf:
        case jf:
        case Ff:
        case is:
        case Pf:
        case eu:
        case tu:
        case $f:
        case oc:
        case Hf:
        case ls:
        case Vf:
        case uc:
        case If:
        case qf:
          o = Al;
          break;
        case os:
          o = fc;
          break;
        default:
          o = wn;
          break;
      }
      return (o & (e.suspendedLanes | n)) !== wn ? wn : o;
    }
    function yc(e, n, l) {
      if (za)
        for (var o = e.pendingUpdatersLaneMap; l > 0; ) {
          var c = Ir(l), h = 1 << c, S = o[c];
          S.add(n), l &= ~h;
        }
    }
    function bm(e, n) {
      if (za)
        for (var l = e.pendingUpdatersLaneMap, o = e.memoizedUpdaters; n > 0; ) {
          var c = Ir(n), h = 1 << c, S = l[c];
          S.size > 0 && (S.forEach(function(T) {
            var M = T.alternate;
            (M === null || !o.has(M)) && o.add(T);
          }), S.clear()), n &= ~h;
        }
    }
    function Gp(e, n) {
      return null;
    }
    var pa = Vt, rl = Ni, vi = sr, hi = os, gc = wn;
    function mi() {
      return gc;
    }
    function Er(e) {
      gc = e;
    }
    function Cm(e, n) {
      var l = gc;
      try {
        return gc = e, n();
      } finally {
        gc = l;
      }
    }
    function Tm(e, n) {
      return e !== 0 && e < n ? e : n;
    }
    function Sc(e, n) {
      return e > n ? e : n;
    }
    function Ur(e, n) {
      return e !== 0 && e < n;
    }
    function Rm(e) {
      var n = yo(e);
      return Ur(pa, n) ? Ur(rl, n) ? pc(n) ? vi : hi : rl : pa;
    }
    function Zf(e) {
      var n = e.current.memoizedState;
      return n.isDehydrated;
    }
    var Ec;
    function na(e) {
      Ec = e;
    }
    function x1(e) {
      Ec(e);
    }
    var gt;
    function ru(e) {
      gt = e;
    }
    var Jf;
    function Mm(e) {
      Jf = e;
    }
    var _m;
    function xc(e) {
      _m = e;
    }
    var wc;
    function Qp(e) {
      wc = e;
    }
    var ed = !1, bc = [], zl = null, al = null, il = null, ur = /* @__PURE__ */ new Map(), va = /* @__PURE__ */ new Map(), ha = [], km = [
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
    function Dm(e) {
      return km.indexOf(e) > -1;
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
    function Bp(e, n) {
      switch (e) {
        case "focusin":
        case "focusout":
          zl = null;
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
          ur.delete(l);
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
          var T = du(n);
          T !== null && gt(T);
        }
        return S;
      }
      e.eventSystemFlags |= o;
      var M = e.targetContainers;
      return c !== null && M.indexOf(c) === -1 && M.push(c), e;
    }
    function w1(e, n, l, o, c) {
      switch (n) {
        case "focusin": {
          var h = c;
          return zl = Ua(zl, e, n, l, o, h), !0;
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
          var M = c, L = M.pointerId;
          return ur.set(L, Ua(ur.get(L) || null, e, n, l, o, M)), !0;
        }
        case "gotpointercapture": {
          var j = c, re = j.pointerId;
          return va.set(re, Ua(va.get(re) || null, e, n, l, o, j)), !0;
        }
      }
      return !1;
    }
    function Xp(e) {
      var n = Nc(e.target);
      if (n !== null) {
        var l = Wa(n);
        if (l !== null) {
          var o = l.tag;
          if (o === H) {
            var c = el(l);
            if (c !== null) {
              e.blockedOn = c, wc(e.priority, function() {
                Jf(l);
              });
              return;
            }
          } else if (o === C) {
            var h = l.stateNode;
            if (Zf(h)) {
              e.blockedOn = tl(l);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Om(e) {
      for (var n = _m(), l = {
        blockedOn: null,
        target: e,
        priority: n
      }, o = 0; o < ha.length && Ur(n, ha[o].priority); o++)
        ;
      ha.splice(o, 0, l), o === 0 && Xp(l);
    }
    function Cc(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var n = e.targetContainers; n.length > 0; ) {
        var l = n[0], o = iu(e.domEventName, e.eventSystemFlags, l, e.nativeEvent);
        if (o === null) {
          var c = e.nativeEvent, h = new c.constructor(c.type, c);
          m1(h), c.target.dispatchEvent(h), y1();
        } else {
          var S = du(o);
          return S !== null && gt(S), e.blockedOn = o, !1;
        }
        n.shift();
      }
      return !0;
    }
    function Kp(e, n, l) {
      Cc(e) && l.delete(n);
    }
    function b1() {
      ed = !1, zl !== null && Cc(zl) && (zl = null), al !== null && Cc(al) && (al = null), il !== null && Cc(il) && (il = null), ur.forEach(Kp), va.forEach(Kp);
    }
    function go(e, n) {
      e.blockedOn === n && (e.blockedOn = null, ed || (ed = !0, a.unstable_scheduleCallback(a.unstable_NormalPriority, b1)));
    }
    function fs(e) {
      if (bc.length > 0) {
        go(bc[0], e);
        for (var n = 1; n < bc.length; n++) {
          var l = bc[n];
          l.blockedOn === e && (l.blockedOn = null);
        }
      }
      zl !== null && go(zl, e), al !== null && go(al, e), il !== null && go(il, e);
      var o = function(T) {
        return go(T, e);
      };
      ur.forEach(o), va.forEach(o);
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
    var qr = s.ReactCurrentBatchConfig, vn = !0;
    function Dr(e) {
      vn = !!e;
    }
    function xr() {
      return vn;
    }
    function Yr(e, n, l) {
      var o = td(n), c;
      switch (o) {
        case pa:
          c = Xa;
          break;
        case rl:
          c = au;
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
    function au(e, n, l, o) {
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
      var c = iu(e, n, l, o);
      if (c === null) {
        $1(e, n, o, ll, l), Bp(e, o);
        return;
      }
      if (w1(c, e, n, l, o)) {
        o.stopPropagation();
        return;
      }
      if (Bp(e, o), n & si && Dm(e)) {
        for (; c !== null; ) {
          var h = du(c);
          h !== null && x1(h);
          var S = iu(e, n, l, o);
          if (S === null && $1(e, n, o, ll, l), S === c)
            break;
          c = S;
        }
        c !== null && o.stopPropagation();
        return;
      }
      $1(e, n, o, null, l);
    }
    var ll = null;
    function iu(e, n, l, o) {
      ll = null;
      var c = bp(o), h = Nc(c);
      if (h !== null) {
        var S = Wa(h);
        if (S === null)
          h = null;
        else {
          var T = S.tag;
          if (T === H) {
            var M = el(S);
            if (M !== null)
              return M;
            h = null;
          } else if (T === C) {
            var L = S.stateNode;
            if (Zf(L))
              return tl(S);
            h = null;
          } else S !== h && (h = null);
        }
      }
      return ll = h, null;
    }
    function td(e) {
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
          var n = Tf();
          switch (n) {
            case ec:
              return pa;
            case po:
              return rl;
            case Dl:
            case E1:
              return vi;
            case Zo:
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
    function lu(e, n, l, o) {
      return e.addEventListener(n, l, {
        passive: o
      }), l;
    }
    var Ka = null, ou = null, ds = null;
    function So(e) {
      return Ka = e, ou = Mc(), !0;
    }
    function nd() {
      Ka = null, ou = null, ds = null;
    }
    function Ll() {
      if (ds)
        return ds;
      var e, n = ou, l = n.length, o, c = Mc(), h = c.length;
      for (e = 0; e < l && n[e] === c[e]; e++)
        ;
      var S = l - e;
      for (o = 1; o <= S && n[l - o] === c[h - o]; o++)
        ;
      var T = o > 1 ? 1 - o : void 0;
      return ds = c.slice(e, T), ds;
    }
    function Mc() {
      return "value" in Ka ? Ka.value : Ka.textContent;
    }
    function Eo(e) {
      var n, l = e.keyCode;
      return "charCode" in e ? (n = e.charCode, n === 0 && l === 13 && (n = 13)) : n = l, n === 10 && (n = 13), n >= 32 || n === 13 ? n : 0;
    }
    function su() {
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
            var M = e[T];
            M ? this[T] = M(h) : this[T] = h[T];
          }
        var L = h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1;
        return L ? this.isDefaultPrevented = su : this.isDefaultPrevented = _c, this.isPropagationStopped = _c, this;
      }
      return Bt(n.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = su);
        },
        stopPropagation: function() {
          var l = this.nativeEvent;
          l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = su);
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
        isPersistent: su
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
    }), Fa = ra(ma), rd, kc, ps;
    function C1(e) {
      e !== ps && (ps && e.type === "mousemove" ? (rd = e.screenX - ps.screenX, kc = e.screenY - ps.screenY) : (rd = 0, kc = 0), ps = e);
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
        return "movementX" in e ? e.movementX : (C1(e), rd);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : kc;
      }
    }), Jp = ra(Fi), ev = Bt({}, Fi, {
      dataTransfer: 0
    }), vs = ra(ev), tv = Bt({}, ma, {
      relatedTarget: 0
    }), Nl = ra(tv), Am = Bt({}, wr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), zm = ra(Am), nv = Bt({}, wr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), ad = ra(nv), T1 = Bt({}, wr, {
      data: 0
    }), Lm = ra(T1), Nm = Lm, Um = {
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
    }, hs = {
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
    function R1(e) {
      if (e.key) {
        var n = Um[e.key] || e.key;
        if (n !== "Unidentified")
          return n;
      }
      if (e.type === "keypress") {
        var l = Eo(e);
        return l === 13 ? "Enter" : String.fromCharCode(l);
      }
      return e.type === "keydown" || e.type === "keyup" ? hs[e.keyCode] || "Unidentified" : "";
    }
    var uu = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function jm(e) {
      var n = this, l = n.nativeEvent;
      if (l.getModifierState)
        return l.getModifierState(e);
      var o = uu[e];
      return o ? !!l[o] : !1;
    }
    function Kn(e) {
      return jm;
    }
    var M1 = Bt({}, ma, {
      key: R1,
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
    }), Fm = ra(M1), _1 = Bt({}, Fi, {
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
    }), Pm = ra(_1), $m = Bt({}, ma, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Kn
    }), Hm = ra($m), k1 = Bt({}, wr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), yi = ra(k1), rv = Bt({}, Fi, {
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
    }), D1 = ra(rv), xo = [9, 13, 27, 32], Dc = 229, Ul = Be && "CompositionEvent" in window, wo = null;
    Be && "documentMode" in document && (wo = document.documentMode);
    var av = Be && "TextEvent" in window && !wo, id = Be && (!Ul || wo && wo > 8 && wo <= 11), Vm = 32, ld = String.fromCharCode(Vm);
    function O1() {
      _e("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), _e("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), _e("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), _e("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var iv = !1;
    function Im(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function od(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function sd(e, n) {
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
    function ud(e) {
      var n = e.detail;
      return typeof n == "object" && "data" in n ? n.data : null;
    }
    function qm(e) {
      return e.locale === "ko";
    }
    var ms = !1;
    function ov(e, n, l, o, c) {
      var h, S;
      if (Ul ? h = od(n) : ms ? lv(n, o) && (h = "onCompositionEnd") : sd(n, o) && (h = "onCompositionStart"), !h)
        return null;
      id && !qm(o) && (!ms && h === "onCompositionStart" ? ms = So(c) : h === "onCompositionEnd" && ms && (S = Ll()));
      var T = Km(l, h);
      if (T.length > 0) {
        var M = new Lm(h, n, null, o, c);
        if (e.push({
          event: M,
          listeners: T
        }), S)
          M.data = S;
        else {
          var L = ud(o);
          L !== null && (M.data = L);
        }
      }
    }
    function cd(e, n) {
      switch (e) {
        case "compositionend":
          return ud(n);
        case "keypress":
          var l = n.which;
          return l !== Vm ? null : (iv = !0, ld);
        case "textInput":
          var o = n.data;
          return o === ld && iv ? null : o;
        default:
          return null;
      }
    }
    function sv(e, n) {
      if (ms) {
        if (e === "compositionend" || !Ul && lv(e, n)) {
          var l = Ll();
          return nd(), ms = !1, l;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Im(n)) {
            if (n.char && n.char.length > 1)
              return n.char;
            if (n.which)
              return String.fromCharCode(n.which);
          }
          return null;
        case "compositionend":
          return id && !qm(n) ? null : n.data;
        default:
          return null;
      }
    }
    function fd(e, n, l, o, c) {
      var h;
      if (av ? h = cd(n, o) : h = sv(n, o), !h)
        return null;
      var S = Km(l, "onBeforeInput");
      if (S.length > 0) {
        var T = new Nm("onBeforeInput", "beforeinput", null, o, c);
        e.push({
          event: T,
          listeners: S
        }), T.data = h;
      }
    }
    function Ym(e, n, l, o, c, h, S) {
      ov(e, n, l, o, c), fd(e, n, l, o, c);
    }
    var A1 = {
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
      return n === "input" ? !!A1[e.type] : n === "textarea";
    }
    function z1(e) {
      if (!Be)
        return !1;
      var n = "on" + e, l = n in document;
      if (!l) {
        var o = document.createElement("div");
        o.setAttribute(n, "return;"), l = typeof o[n] == "function";
      }
      return l;
    }
    function Ac() {
      _e("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function Wm(e, n, l, o) {
      Ws(o);
      var c = Km(n, "onChange");
      if (c.length > 0) {
        var h = new ol("onChange", "change", null, l, o);
        e.push({
          event: h,
          listeners: c
        });
      }
    }
    var bo = null, r = null;
    function i(e) {
      var n = e.nodeName && e.nodeName.toLowerCase();
      return n === "select" || n === "input" && e.type === "file";
    }
    function u(e) {
      var n = [];
      Wm(n, r, e, bp(e)), am(d, n);
    }
    function d(e) {
      N3(e, 0);
    }
    function y(e) {
      var n = yd(e);
      if (Qi(n))
        return e;
    }
    function w(e, n) {
      if (e === "change")
        return n;
    }
    var A = !1;
    Be && (A = z1("input") && (!document.documentMode || document.documentMode > 9));
    function q(e, n) {
      bo = e, r = n, bo.attachEvent("onpropertychange", ye);
    }
    function K() {
      bo && (bo.detachEvent("onpropertychange", ye), bo = null, r = null);
    }
    function ye(e) {
      e.propertyName === "value" && y(r) && u(e);
    }
    function He(e, n, l) {
      e === "focusin" ? (K(), q(n, l)) : e === "focusout" && K();
    }
    function Ge(e, n) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return y(r);
    }
    function Fe(e) {
      var n = e.nodeName;
      return n && n.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function pt(e, n) {
      if (e === "click")
        return y(n);
    }
    function xt(e, n) {
      if (e === "input" || e === "change")
        return y(n);
    }
    function Tt(e) {
      var n = e._wrapperState;
      !n || !n.controlled || e.type !== "number" || Lt(e, "number", e.value);
    }
    function fr(e, n, l, o, c, h, S) {
      var T = l ? yd(l) : window, M, L;
      if (i(T) ? M = w : Oc(T) ? A ? M = xt : (M = Ge, L = He) : Fe(T) && (M = pt), M) {
        var j = M(n, l);
        if (j) {
          Wm(e, j, o, c);
          return;
        }
      }
      L && L(n, T, l), n === "focusout" && Tt(T);
    }
    function ue() {
      je("onMouseEnter", ["mouseout", "mouseover"]), je("onMouseLeave", ["mouseout", "mouseover"]), je("onPointerEnter", ["pointerout", "pointerover"]), je("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function ne(e, n, l, o, c, h, S) {
      var T = n === "mouseover" || n === "pointerover", M = n === "mouseout" || n === "pointerout";
      if (T && !Qu(o)) {
        var L = o.relatedTarget || o.fromElement;
        if (L && (Nc(L) || wv(L)))
          return;
      }
      if (!(!M && !T)) {
        var j;
        if (c.window === c)
          j = c;
        else {
          var re = c.ownerDocument;
          re ? j = re.defaultView || re.parentWindow : j = window;
        }
        var te, he;
        if (M) {
          var ge = o.relatedTarget || o.toElement;
          if (te = l, he = ge ? Nc(ge) : null, he !== null) {
            var Te = Wa(he);
            (he !== Te || he.tag !== _ && he.tag !== k) && (he = null);
          }
        } else
          te = null, he = l;
        if (te !== he) {
          var st = Jp, Nt = "onMouseLeave", _t = "onMouseEnter", mn = "mouse";
          (n === "pointerout" || n === "pointerover") && (st = Pm, Nt = "onPointerLeave", _t = "onPointerEnter", mn = "pointer");
          var fn = te == null ? j : yd(te), ce = he == null ? j : yd(he), Re = new st(Nt, mn + "leave", te, o, c);
          Re.target = fn, Re.relatedTarget = ce;
          var fe = null, Qe = Nc(c);
          if (Qe === l) {
            var mt = new st(_t, mn + "enter", he, o, c);
            mt.target = ce, mt.relatedTarget = fn, fe = mt;
          }
          mT(e, Re, fe, te, he);
        }
      }
    }
    function pe(e, n) {
      return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
    }
    var Ve = typeof Object.is == "function" ? Object.is : pe;
    function wt(e, n) {
      if (Ve(e, n))
        return !0;
      if (typeof e != "object" || e === null || typeof n != "object" || n === null)
        return !1;
      var l = Object.keys(e), o = Object.keys(n);
      if (l.length !== o.length)
        return !1;
      for (var c = 0; c < l.length; c++) {
        var h = l[c];
        if (!ke.call(n, h) || !Ve(e[h], n[h]))
          return !1;
      }
      return !0;
    }
    function jt(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Pt(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Gt(e, n) {
      for (var l = jt(e), o = 0, c = 0; l; ) {
        if (l.nodeType === Tl) {
          if (c = o + l.textContent.length, o <= n && c >= n)
            return {
              node: l,
              offset: n - o
            };
          o = c;
        }
        l = jt(Pt(l));
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
      var h = 0, S = -1, T = -1, M = 0, L = 0, j = e, re = null;
      e: for (; ; ) {
        for (var te = null; j === n && (l === 0 || j.nodeType === Tl) && (S = h + l), j === o && (c === 0 || j.nodeType === Tl) && (T = h + c), j.nodeType === Tl && (h += j.nodeValue.length), (te = j.firstChild) !== null; )
          re = j, j = te;
        for (; ; ) {
          if (j === e)
            break e;
          if (re === n && ++M === l && (S = h), re === o && ++L === c && (T = h), (te = j.nextSibling) !== null)
            break;
          j = re, re = j.parentNode;
        }
        j = te;
      }
      return S === -1 || T === -1 ? null : {
        start: S,
        end: T
      };
    }
    function Co(e, n) {
      var l = e.ownerDocument || document, o = l && l.defaultView || window;
      if (o.getSelection) {
        var c = o.getSelection(), h = e.textContent.length, S = Math.min(n.start, h), T = n.end === void 0 ? S : Math.min(n.end, h);
        if (!c.extend && S > T) {
          var M = T;
          T = S, S = M;
        }
        var L = Gt(e, S), j = Gt(e, T);
        if (L && j) {
          if (c.rangeCount === 1 && c.anchorNode === L.node && c.anchorOffset === L.offset && c.focusNode === j.node && c.focusOffset === j.offset)
            return;
          var re = l.createRange();
          re.setStart(L.node, L.offset), c.removeAllRanges(), S > T ? (c.addRange(re), c.extend(j.node, j.offset)) : (re.setEnd(j.node, j.offset), c.addRange(re));
        }
      }
    }
    function Gm(e) {
      return e && e.nodeType === Tl;
    }
    function C3(e, n) {
      return !e || !n ? !1 : e === n ? !0 : Gm(e) ? !1 : Gm(n) ? C3(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1;
    }
    function ZC(e) {
      return e && e.ownerDocument && C3(e.ownerDocument.documentElement, e);
    }
    function JC(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function T3() {
      for (var e = window, n = oi(); n instanceof e.HTMLIFrameElement; ) {
        if (JC(n))
          e = n.contentWindow;
        else
          return n;
        n = oi(e.document);
      }
      return n;
    }
    function L1(e) {
      var n = e && e.nodeName && e.nodeName.toLowerCase();
      return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
    }
    function eT() {
      var e = T3();
      return {
        focusedElem: e,
        selectionRange: L1(e) ? nT(e) : null
      };
    }
    function tT(e) {
      var n = T3(), l = e.focusedElem, o = e.selectionRange;
      if (n !== l && ZC(l)) {
        o !== null && L1(l) && rT(l, o);
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
    function nT(e) {
      var n;
      return "selectionStart" in e ? n = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : n = jr(e), n || {
        start: 0,
        end: 0
      };
    }
    function rT(e, n) {
      var l = n.start, o = n.end;
      o === void 0 && (o = l), "selectionStart" in e ? (e.selectionStart = l, e.selectionEnd = Math.min(o, e.value.length)) : Co(e, n);
    }
    var aT = Be && "documentMode" in document && document.documentMode <= 11;
    function iT() {
      _e("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var dd = null, N1 = null, uv = null, U1 = !1;
    function lT(e) {
      if ("selectionStart" in e && L1(e))
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
    function oT(e) {
      return e.window === e ? e.document : e.nodeType === Rl ? e : e.ownerDocument;
    }
    function R3(e, n, l) {
      var o = oT(l);
      if (!(U1 || dd == null || dd !== oi(o))) {
        var c = lT(dd);
        if (!uv || !wt(uv, c)) {
          uv = c;
          var h = Km(N1, "onSelect");
          if (h.length > 0) {
            var S = new ol("onSelect", "select", null, n, l);
            e.push({
              event: S,
              listeners: h
            }), S.target = dd;
          }
        }
      }
    }
    function sT(e, n, l, o, c, h, S) {
      var T = l ? yd(l) : window;
      switch (n) {
        // Track the input node that has focus.
        case "focusin":
          (Oc(T) || T.contentEditable === "true") && (dd = T, N1 = l, uv = null);
          break;
        case "focusout":
          dd = null, N1 = null, uv = null;
          break;
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case "mousedown":
          U1 = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          U1 = !1, R3(e, o, c);
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
          if (aT)
            break;
        // falls through
        case "keydown":
        case "keyup":
          R3(e, o, c);
      }
    }
    function Qm(e, n) {
      var l = {};
      return l[e.toLowerCase()] = n.toLowerCase(), l["Webkit" + e] = "webkit" + n, l["Moz" + e] = "moz" + n, l;
    }
    var pd = {
      animationend: Qm("Animation", "AnimationEnd"),
      animationiteration: Qm("Animation", "AnimationIteration"),
      animationstart: Qm("Animation", "AnimationStart"),
      transitionend: Qm("Transition", "TransitionEnd")
    }, j1 = {}, M3 = {};
    Be && (M3 = document.createElement("div").style, "AnimationEvent" in window || (delete pd.animationend.animation, delete pd.animationiteration.animation, delete pd.animationstart.animation), "TransitionEvent" in window || delete pd.transitionend.transition);
    function Bm(e) {
      if (j1[e])
        return j1[e];
      if (!pd[e])
        return e;
      var n = pd[e];
      for (var l in n)
        if (n.hasOwnProperty(l) && l in M3)
          return j1[e] = n[l];
      return e;
    }
    var _3 = Bm("animationend"), k3 = Bm("animationiteration"), D3 = Bm("animationstart"), O3 = Bm("transitionend"), A3 = /* @__PURE__ */ new Map(), z3 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function cu(e, n) {
      A3.set(e, n), _e(n, [e]);
    }
    function uT() {
      for (var e = 0; e < z3.length; e++) {
        var n = z3[e], l = n.toLowerCase(), o = n[0].toUpperCase() + n.slice(1);
        cu(l, "on" + o);
      }
      cu(_3, "onAnimationEnd"), cu(k3, "onAnimationIteration"), cu(D3, "onAnimationStart"), cu("dblclick", "onDoubleClick"), cu("focusin", "onFocus"), cu("focusout", "onBlur"), cu(O3, "onTransitionEnd");
    }
    function cT(e, n, l, o, c, h, S) {
      var T = A3.get(n);
      if (T !== void 0) {
        var M = ol, L = n;
        switch (n) {
          case "keypress":
            if (Eo(o) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            M = Fm;
            break;
          case "focusin":
            L = "focus", M = Nl;
            break;
          case "focusout":
            L = "blur", M = Nl;
            break;
          case "beforeblur":
          case "afterblur":
            M = Nl;
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
            M = Jp;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            M = vs;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            M = Hm;
            break;
          case _3:
          case k3:
          case D3:
            M = zm;
            break;
          case O3:
            M = yi;
            break;
          case "scroll":
            M = Fa;
            break;
          case "wheel":
            M = D1;
            break;
          case "copy":
          case "cut":
          case "paste":
            M = ad;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            M = Pm;
            break;
        }
        var j = (h & si) !== 0;
        {
          var re = !j && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          n === "scroll", te = vT(l, T, o.type, j, re);
          if (te.length > 0) {
            var he = new M(T, L, null, o, c);
            e.push({
              event: he,
              listeners: te
            });
          }
        }
      }
    }
    uT(), ue(), Ac(), iT(), O1();
    function fT(e, n, l, o, c, h, S) {
      cT(e, n, l, o, c, h);
      var T = (h & wp) === 0;
      T && (ne(e, n, l, o, c), fr(e, n, l, o, c), sT(e, n, l, o, c), Ym(e, n, l, o, c));
    }
    var cv = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], F1 = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(cv));
    function L3(e, n, l) {
      var o = e.type || "unknown-event";
      e.currentTarget = l, Ki(o, n, void 0, e), e.currentTarget = null;
    }
    function dT(e, n, l) {
      var o;
      if (l)
        for (var c = n.length - 1; c >= 0; c--) {
          var h = n[c], S = h.instance, T = h.currentTarget, M = h.listener;
          if (S !== o && e.isPropagationStopped())
            return;
          L3(e, M, T), o = S;
        }
      else
        for (var L = 0; L < n.length; L++) {
          var j = n[L], re = j.instance, te = j.currentTarget, he = j.listener;
          if (re !== o && e.isPropagationStopped())
            return;
          L3(e, he, te), o = re;
        }
    }
    function N3(e, n) {
      for (var l = (n & si) !== 0, o = 0; o < e.length; o++) {
        var c = e[o], h = c.event, S = c.listeners;
        dT(h, S, l);
      }
      Ku();
    }
    function pT(e, n, l, o, c) {
      var h = bp(l), S = [];
      fT(S, e, o, l, h, n), N3(S, n);
    }
    function rr(e, n) {
      F1.has(e) || v('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var l = !1, o = IR(n), c = yT(e);
      o.has(c) || (U3(n, e, df, l), o.add(c));
    }
    function P1(e, n, l) {
      F1.has(e) && !n && v('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var o = 0;
      n && (o |= si), U3(l, e, o, n);
    }
    var Xm = "_reactListening" + Math.random().toString(36).slice(2);
    function fv(e) {
      if (!e[Xm]) {
        e[Xm] = !0, Me.forEach(function(l) {
          l !== "selectionchange" && (F1.has(l) || P1(l, !1, e), P1(l, !0, e));
        });
        var n = e.nodeType === Rl ? e : e.ownerDocument;
        n !== null && (n[Xm] || (n[Xm] = !0, P1("selectionchange", !1, n)));
      }
    }
    function U3(e, n, l, o, c) {
      var h = Yr(e, n, l), S = void 0;
      Xu && (n === "touchstart" || n === "touchmove" || n === "wheel") && (S = !0), e = e, o ? S !== void 0 ? Zp(e, n, h, S) : ja(e, n, h) : S !== void 0 ? lu(e, n, h, S) : Rc(e, n, h);
    }
    function j3(e, n) {
      return e === n || e.nodeType === hr && e.parentNode === n;
    }
    function $1(e, n, l, o, c) {
      var h = o;
      if ((n & xp) === 0 && (n & df) === 0) {
        var S = c;
        if (o !== null) {
          var T = o;
          e: for (; ; ) {
            if (T === null)
              return;
            var M = T.tag;
            if (M === C || M === R) {
              var L = T.stateNode.containerInfo;
              if (j3(L, S))
                break;
              if (M === R)
                for (var j = T.return; j !== null; ) {
                  var re = j.tag;
                  if (re === C || re === R) {
                    var te = j.stateNode.containerInfo;
                    if (j3(te, S))
                      return;
                  }
                  j = j.return;
                }
              for (; L !== null; ) {
                var he = Nc(L);
                if (he === null)
                  return;
                var ge = he.tag;
                if (ge === _ || ge === k) {
                  T = h = he;
                  continue e;
                }
                L = L.parentNode;
              }
            }
            T = T.return;
          }
        }
      }
      am(function() {
        return pT(e, n, l, h);
      });
    }
    function dv(e, n, l) {
      return {
        instance: e,
        listener: n,
        currentTarget: l
      };
    }
    function vT(e, n, l, o, c, h) {
      for (var S = n !== null ? n + "Capture" : null, T = o ? S : n, M = [], L = e, j = null; L !== null; ) {
        var re = L, te = re.stateNode, he = re.tag;
        if (he === _ && te !== null && (j = te, T !== null)) {
          var ge = lo(L, T);
          ge != null && M.push(dv(L, ge, j));
        }
        if (c)
          break;
        L = L.return;
      }
      return M;
    }
    function Km(e, n) {
      for (var l = n + "Capture", o = [], c = e; c !== null; ) {
        var h = c, S = h.stateNode, T = h.tag;
        if (T === _ && S !== null) {
          var M = S, L = lo(c, l);
          L != null && o.unshift(dv(c, L, M));
          var j = lo(c, n);
          j != null && o.push(dv(c, j, M));
        }
        c = c.return;
      }
      return o;
    }
    function vd(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== _);
      return e || null;
    }
    function hT(e, n) {
      for (var l = e, o = n, c = 0, h = l; h; h = vd(h))
        c++;
      for (var S = 0, T = o; T; T = vd(T))
        S++;
      for (; c - S > 0; )
        l = vd(l), c--;
      for (; S - c > 0; )
        o = vd(o), S--;
      for (var M = c; M--; ) {
        if (l === o || o !== null && l === o.alternate)
          return l;
        l = vd(l), o = vd(o);
      }
      return null;
    }
    function F3(e, n, l, o, c) {
      for (var h = n._reactName, S = [], T = l; T !== null && T !== o; ) {
        var M = T, L = M.alternate, j = M.stateNode, re = M.tag;
        if (L !== null && L === o)
          break;
        if (re === _ && j !== null) {
          var te = j;
          if (c) {
            var he = lo(T, h);
            he != null && S.unshift(dv(T, he, te));
          } else if (!c) {
            var ge = lo(T, h);
            ge != null && S.push(dv(T, ge, te));
          }
        }
        T = T.return;
      }
      S.length !== 0 && e.push({
        event: n,
        listeners: S
      });
    }
    function mT(e, n, l, o, c) {
      var h = o && c ? hT(o, c) : null;
      o !== null && F3(e, n, o, h, !1), c !== null && l !== null && F3(e, l, c, h, !0);
    }
    function yT(e, n) {
      return e + "__bubble";
    }
    var gi = !1, pv = "dangerouslySetInnerHTML", Zm = "suppressContentEditableWarning", fu = "suppressHydrationWarning", P3 = "autoFocus", zc = "children", Lc = "style", Jm = "__html", H1, ey, vv, $3, ty, H3, V3;
    H1 = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, ey = function(e, n) {
      gp(e, n), cf(e, n), tm(e, n, {
        registrationNameDependencies: Oe,
        possibleRegistrationNames: Pe
      });
    }, H3 = Be && !document.documentMode, vv = function(e, n, l) {
      if (!gi) {
        var o = ny(l), c = ny(n);
        c !== o && (gi = !0, v("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(c), JSON.stringify(o)));
      }
    }, $3 = function(e) {
      if (!gi) {
        gi = !0;
        var n = [];
        e.forEach(function(l) {
          n.push(l);
        }), v("Extra attributes from the server: %s", n);
      }
    }, ty = function(e, n) {
      n === !1 ? v("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : v("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof n);
    }, V3 = function(e, n) {
      var l = e.namespaceURI === Cl ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return l.innerHTML = n, l.innerHTML;
    };
    var gT = /\r\n?/g, ST = /\u0000|\uFFFD/g;
    function ny(e) {
      ct(e);
      var n = typeof e == "string" ? e : "" + e;
      return n.replace(gT, `
`).replace(ST, "");
    }
    function ry(e, n, l, o) {
      var c = ny(n), h = ny(e);
      if (h !== c && (o && (gi || (gi = !0, v('Text content did not match. Server: "%s" Client: "%s"', h, c))), l && le))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function I3(e) {
      return e.nodeType === Rl ? e : e.ownerDocument;
    }
    function ET() {
    }
    function ay(e) {
      e.onclick = ET;
    }
    function xT(e, n, l, o, c) {
      for (var h in o)
        if (o.hasOwnProperty(h)) {
          var S = o[h];
          if (h === Lc)
            S && Object.freeze(S), Bh(n, S);
          else if (h === pv) {
            var T = S ? S[Jm] : void 0;
            T != null && jh(n, T);
          } else if (h === zc)
            if (typeof S == "string") {
              var M = e !== "textarea" || S !== "";
              M && Vs(n, S);
            } else typeof S == "number" && Vs(n, "" + S);
          else h === Zm || h === fu || h === P3 || (Oe.hasOwnProperty(h) ? S != null && (typeof S != "function" && ty(h, S), h === "onScroll" && rr("scroll", n)) : S != null && Tr(n, h, S, c));
        }
    }
    function wT(e, n, l, o) {
      for (var c = 0; c < n.length; c += 2) {
        var h = n[c], S = n[c + 1];
        h === Lc ? Bh(e, S) : h === pv ? jh(e, S) : h === zc ? Vs(e, S) : Tr(e, h, S, o);
      }
    }
    function bT(e, n, l, o) {
      var c, h = I3(l), S, T = o;
      if (T === Cl && (T = fp(e)), T === Cl) {
        if (c = ao(e, n), !c && e !== e.toLowerCase() && v("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var M = h.createElement("div");
          M.innerHTML = "<script><\/script>";
          var L = M.firstChild;
          S = M.removeChild(L);
        } else if (typeof n.is == "string")
          S = h.createElement(e, {
            is: n.is
          });
        else if (S = h.createElement(e), e === "select") {
          var j = S;
          n.multiple ? j.multiple = !0 : n.size && (j.size = n.size);
        }
      } else
        S = h.createElementNS(T, e);
      return T === Cl && !c && Object.prototype.toString.call(S) === "[object HTMLUnknownElement]" && !ke.call(H1, e) && (H1[e] = !0, v("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), S;
    }
    function CT(e, n) {
      return I3(n).createTextNode(e);
    }
    function TT(e, n, l, o) {
      var c = ao(n, l);
      ey(n, l);
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
          Ai(e, l), h = Hs(e, l), rr("invalid", e);
          break;
        case "option":
          En(e, l), h = l;
          break;
        case "select":
          qo(e, l), h = Hu(e, l), rr("invalid", e);
          break;
        case "textarea":
          sp(e, l), h = op(e, l), rr("invalid", e);
          break;
        default:
          h = l;
      }
      switch (sf(n, h), xT(n, e, o, h, c), n) {
        case "input":
          Oi(e), me(e, l, !1);
          break;
        case "textarea":
          Oi(e), Nh(e);
          break;
        case "option":
          Fn(e, l);
          break;
        case "select":
          ip(e, l);
          break;
        default:
          typeof h.onClick == "function" && ay(e);
          break;
      }
    }
    function RT(e, n, l, o, c) {
      ey(n, o);
      var h = null, S, T;
      switch (n) {
        case "input":
          S = Hs(e, l), T = Hs(e, o), h = [];
          break;
        case "select":
          S = Hu(e, l), T = Hu(e, o), h = [];
          break;
        case "textarea":
          S = op(e, l), T = op(e, o), h = [];
          break;
        default:
          S = l, T = o, typeof S.onClick != "function" && typeof T.onClick == "function" && ay(e);
          break;
      }
      sf(n, T);
      var M, L, j = null;
      for (M in S)
        if (!(T.hasOwnProperty(M) || !S.hasOwnProperty(M) || S[M] == null))
          if (M === Lc) {
            var re = S[M];
            for (L in re)
              re.hasOwnProperty(L) && (j || (j = {}), j[L] = "");
          } else M === pv || M === zc || M === Zm || M === fu || M === P3 || (Oe.hasOwnProperty(M) ? h || (h = []) : (h = h || []).push(M, null));
      for (M in T) {
        var te = T[M], he = S?.[M];
        if (!(!T.hasOwnProperty(M) || te === he || te == null && he == null))
          if (M === Lc)
            if (te && Object.freeze(te), he) {
              for (L in he)
                he.hasOwnProperty(L) && (!te || !te.hasOwnProperty(L)) && (j || (j = {}), j[L] = "");
              for (L in te)
                te.hasOwnProperty(L) && he[L] !== te[L] && (j || (j = {}), j[L] = te[L]);
            } else
              j || (h || (h = []), h.push(M, j)), j = te;
          else if (M === pv) {
            var ge = te ? te[Jm] : void 0, Te = he ? he[Jm] : void 0;
            ge != null && Te !== ge && (h = h || []).push(M, ge);
          } else M === zc ? (typeof te == "string" || typeof te == "number") && (h = h || []).push(M, "" + te) : M === Zm || M === fu || (Oe.hasOwnProperty(M) ? (te != null && (typeof te != "function" && ty(M, te), M === "onScroll" && rr("scroll", e)), !h && he !== te && (h = [])) : (h = h || []).push(M, te));
      }
      return j && (v1(j, T[Lc]), (h = h || []).push(Lc, j)), h;
    }
    function MT(e, n, l, o, c) {
      l === "input" && c.type === "radio" && c.name != null && D(e, c);
      var h = ao(l, o), S = ao(l, c);
      switch (wT(e, n, h, S), l) {
        case "input":
          G(e, c);
          break;
        case "textarea":
          Lh(e, c);
          break;
        case "select":
          af(e, c);
          break;
      }
    }
    function _T(e) {
      {
        var n = e.toLowerCase();
        return Wu.hasOwnProperty(n) && Wu[n] || null;
      }
    }
    function kT(e, n, l, o, c, h, S) {
      var T, M;
      switch (T = ao(n, l), ey(n, l), n) {
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
          qo(e, l), rr("invalid", e);
          break;
        case "textarea":
          sp(e, l), rr("invalid", e);
          break;
      }
      sf(n, l);
      {
        M = /* @__PURE__ */ new Set();
        for (var j = e.attributes, re = 0; re < j.length; re++) {
          var te = j[re].name.toLowerCase();
          switch (te) {
            // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              M.add(j[re].name);
          }
        }
      }
      var he = null;
      for (var ge in l)
        if (l.hasOwnProperty(ge)) {
          var Te = l[ge];
          if (ge === zc)
            typeof Te == "string" ? e.textContent !== Te && (l[fu] !== !0 && ry(e.textContent, Te, h, S), he = [zc, Te]) : typeof Te == "number" && e.textContent !== "" + Te && (l[fu] !== !0 && ry(e.textContent, Te, h, S), he = [zc, "" + Te]);
          else if (Oe.hasOwnProperty(ge))
            Te != null && (typeof Te != "function" && ty(ge, Te), ge === "onScroll" && rr("scroll", e));
          else if (S && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof T == "boolean") {
            var st = void 0, Nt = Ne(ge);
            if (l[fu] !== !0) {
              if (!(ge === Zm || ge === fu || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              ge === "value" || ge === "checked" || ge === "selected")) {
                if (ge === pv) {
                  var _t = e.innerHTML, mn = Te ? Te[Jm] : void 0;
                  if (mn != null) {
                    var fn = V3(e, mn);
                    fn !== _t && vv(ge, _t, fn);
                  }
                } else if (ge === Lc) {
                  if (M.delete(ge), H3) {
                    var ce = d1(Te);
                    st = e.getAttribute("style"), ce !== st && vv(ge, st, ce);
                  }
                } else if (T && !U)
                  M.delete(ge.toLowerCase()), st = Mi(e, ge, Te), Te !== st && vv(ge, st, Te);
                else if (!Ht(ge, Nt, T) && !ht(ge, Te, Nt, T)) {
                  var Re = !1;
                  if (Nt !== null)
                    M.delete(Nt.attributeName), st = vr(e, ge, Te, Nt);
                  else {
                    var fe = o;
                    if (fe === Cl && (fe = fp(n)), fe === Cl)
                      M.delete(ge.toLowerCase());
                    else {
                      var Qe = _T(ge);
                      Qe !== null && Qe !== ge && (Re = !0, M.delete(Qe)), M.delete(ge);
                    }
                    st = Mi(e, ge, Te);
                  }
                  var mt = U;
                  !mt && Te !== st && !Re && vv(ge, st, Te);
                }
              }
            }
          }
        }
      switch (S && // $FlowFixMe - Should be inferred as not undefined.
      M.size > 0 && l[fu] !== !0 && $3(M), n) {
        case "input":
          Oi(e), me(e, l, !0);
          break;
        case "textarea":
          Oi(e), Nh(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof l.onClick == "function" && ay(e);
          break;
      }
      return he;
    }
    function DT(e, n, l) {
      var o = e.nodeValue !== n;
      return o;
    }
    function V1(e, n) {
      {
        if (gi)
          return;
        gi = !0, v("Did not expect server HTML to contain a <%s> in <%s>.", n.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function I1(e, n) {
      {
        if (gi)
          return;
        gi = !0, v('Did not expect server HTML to contain the text node "%s" in <%s>.', n.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function q1(e, n, l) {
      {
        if (gi)
          return;
        gi = !0, v("Expected server HTML to contain a matching <%s> in <%s>.", n, e.nodeName.toLowerCase());
      }
    }
    function Y1(e, n) {
      {
        if (n === "" || gi)
          return;
        gi = !0, v('Expected server HTML to contain a matching text node for "%s" in <%s>.', n, e.nodeName.toLowerCase());
      }
    }
    function OT(e, n, l) {
      switch (n) {
        case "input":
          Ee(e, l);
          return;
        case "textarea":
          s1(e, l);
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
      var AT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], q3 = [
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
      ], zT = q3.concat(["button"]), LT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Y3 = {
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
        var l = Bt({}, e || Y3), o = {
          tag: n
        };
        return q3.indexOf(n) !== -1 && (l.aTagInScope = null, l.buttonTagInScope = null, l.nobrTagInScope = null), zT.indexOf(n) !== -1 && (l.pTagInButtonScope = null), AT.indexOf(n) !== -1 && n !== "address" && n !== "div" && n !== "p" && (l.listItemTagAutoclosing = null, l.dlItemTagAutoclosing = null), l.current = o, n === "form" && (l.formTag = o), n === "a" && (l.aTagInScope = o), n === "button" && (l.buttonTagInScope = o), n === "nobr" && (l.nobrTagInScope = o), n === "p" && (l.pTagInButtonScope = o), n === "li" && (l.listItemTagAutoclosing = o), (n === "dd" || n === "dt") && (l.dlItemTagAutoclosing = o), l;
      };
      var NT = function(e, n) {
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
            return LT.indexOf(n) === -1;
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
      }, UT = function(e, n) {
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
      }, W3 = {};
      hv = function(e, n, l) {
        l = l || Y3;
        var o = l.current, c = o && o.tag;
        n != null && (e != null && v("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var h = NT(e, c) ? null : o, S = h ? null : UT(e, l), T = h || S;
        if (T) {
          var M = T.tag, L = !!h + "|" + e + "|" + M;
          if (!W3[L]) {
            W3[L] = !0;
            var j = e, re = "";
            if (e === "#text" ? /\S/.test(n) ? j = "Text nodes" : (j = "Whitespace text nodes", re = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : j = "<" + e + ">", h) {
              var te = "";
              M === "table" && e === "tr" && (te += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), v("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", j, M, re, te);
            } else
              v("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", j, M);
          }
        }
      };
    }
    var iy = "suppressHydrationWarning", ly = "$", oy = "/$", yv = "$?", gv = "$!", jT = "style", W1 = null, G1 = null;
    function FT(e) {
      var n, l, o = e.nodeType;
      switch (o) {
        case Rl:
        case pp: {
          n = o === Rl ? "#document" : "#fragment";
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
        var T = n.toLowerCase(), M = mv(null, T);
        return {
          namespace: l,
          ancestorInfo: M
        };
      }
    }
    function PT(e, n, l) {
      {
        var o = e, c = dp(o.namespace, n), h = mv(o.ancestorInfo, n);
        return {
          namespace: c,
          ancestorInfo: h
        };
      }
    }
    function lN(e) {
      return e;
    }
    function $T(e) {
      W1 = xr(), G1 = eT();
      var n = null;
      return Dr(!1), n;
    }
    function HT(e) {
      tT(G1), Dr(W1), W1 = null, G1 = null;
    }
    function VT(e, n, l, o, c) {
      var h;
      {
        var S = o;
        if (hv(e, null, S.ancestorInfo), typeof n.children == "string" || typeof n.children == "number") {
          var T = "" + n.children, M = mv(S.ancestorInfo, e);
          hv(null, T, M);
        }
        h = S.namespace;
      }
      var L = bT(e, n, l, h);
      return xv(c, L), tg(L, n), L;
    }
    function IT(e, n) {
      e.appendChild(n);
    }
    function qT(e, n, l, o, c) {
      switch (TT(e, n, l, o), n) {
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
    function YT(e, n, l, o, c, h) {
      {
        var S = h;
        if (typeof o.children != typeof l.children && (typeof o.children == "string" || typeof o.children == "number")) {
          var T = "" + o.children, M = mv(S.ancestorInfo, n);
          hv(null, T, M);
        }
      }
      return RT(e, n, l, o);
    }
    function Q1(e, n) {
      return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
    }
    function WT(e, n, l, o) {
      {
        var c = l;
        hv(null, e, c.ancestorInfo);
      }
      var h = CT(e, n);
      return xv(o, h), h;
    }
    function GT() {
      var e = window.event;
      return e === void 0 ? vi : td(e.type);
    }
    var B1 = typeof setTimeout == "function" ? setTimeout : void 0, QT = typeof clearTimeout == "function" ? clearTimeout : void 0, X1 = -1, G3 = typeof Promise == "function" ? Promise : void 0, BT = typeof queueMicrotask == "function" ? queueMicrotask : typeof G3 < "u" ? function(e) {
      return G3.resolve(null).then(e).catch(XT);
    } : B1;
    function XT(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function KT(e, n, l, o) {
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
    function ZT(e, n, l, o, c, h) {
      MT(e, n, l, o, c), tg(e, c);
    }
    function Q3(e) {
      Vs(e, "");
    }
    function JT(e, n, l) {
      e.nodeValue = l;
    }
    function eR(e, n) {
      e.appendChild(n);
    }
    function tR(e, n) {
      var l;
      e.nodeType === hr ? (l = e.parentNode, l.insertBefore(n, e)) : (l = e, l.appendChild(n));
      var o = e._reactRootContainer;
      o == null && l.onclick === null && ay(l);
    }
    function nR(e, n, l) {
      e.insertBefore(n, l);
    }
    function rR(e, n, l) {
      e.nodeType === hr ? e.parentNode.insertBefore(n, l) : e.insertBefore(n, l);
    }
    function aR(e, n) {
      e.removeChild(n);
    }
    function iR(e, n) {
      e.nodeType === hr ? e.parentNode.removeChild(n) : e.removeChild(n);
    }
    function K1(e, n) {
      var l = n, o = 0;
      do {
        var c = l.nextSibling;
        if (e.removeChild(l), c && c.nodeType === hr) {
          var h = c.data;
          if (h === oy)
            if (o === 0) {
              e.removeChild(c), fs(n);
              return;
            } else
              o--;
          else (h === ly || h === yv || h === gv) && o++;
        }
        l = c;
      } while (l);
      fs(n);
    }
    function lR(e, n) {
      e.nodeType === hr ? K1(e.parentNode, n) : e.nodeType === _a && K1(e, n), fs(e);
    }
    function oR(e) {
      e = e;
      var n = e.style;
      typeof n.setProperty == "function" ? n.setProperty("display", "none", "important") : n.display = "none";
    }
    function sR(e) {
      e.nodeValue = "";
    }
    function uR(e, n) {
      e = e;
      var l = n[jT], o = l != null && l.hasOwnProperty("display") ? l.display : null;
      e.style.display = of("display", o);
    }
    function cR(e, n) {
      e.nodeValue = n;
    }
    function fR(e) {
      e.nodeType === _a ? e.textContent = "" : e.nodeType === Rl && e.documentElement && e.removeChild(e.documentElement);
    }
    function dR(e, n, l) {
      return e.nodeType !== _a || n.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function pR(e, n) {
      return n === "" || e.nodeType !== Tl ? null : e;
    }
    function vR(e) {
      return e.nodeType !== hr ? null : e;
    }
    function B3(e) {
      return e.data === yv;
    }
    function Z1(e) {
      return e.data === gv;
    }
    function hR(e) {
      var n = e.nextSibling && e.nextSibling.dataset, l, o, c;
      return n && (l = n.dgst, o = n.msg, c = n.stck), {
        message: o,
        digest: l,
        stack: c
      };
    }
    function mR(e, n) {
      e._reactRetry = n;
    }
    function sy(e) {
      for (; e != null; e = e.nextSibling) {
        var n = e.nodeType;
        if (n === _a || n === Tl)
          break;
        if (n === hr) {
          var l = e.data;
          if (l === ly || l === gv || l === yv)
            break;
          if (l === oy)
            return null;
        }
      }
      return e;
    }
    function Sv(e) {
      return sy(e.nextSibling);
    }
    function yR(e) {
      return sy(e.firstChild);
    }
    function gR(e) {
      return sy(e.firstChild);
    }
    function SR(e) {
      return sy(e.nextSibling);
    }
    function ER(e, n, l, o, c, h, S) {
      xv(h, e), tg(e, l);
      var T;
      {
        var M = c;
        T = M.namespace;
      }
      var L = (h.mode & ln) !== zt;
      return kT(e, n, l, T, o, L, S);
    }
    function xR(e, n, l, o) {
      return xv(l, e), l.mode & ln, DT(e, n);
    }
    function wR(e, n) {
      xv(n, e);
    }
    function bR(e) {
      for (var n = e.nextSibling, l = 0; n; ) {
        if (n.nodeType === hr) {
          var o = n.data;
          if (o === oy) {
            if (l === 0)
              return Sv(n);
            l--;
          } else (o === ly || o === gv || o === yv) && l++;
        }
        n = n.nextSibling;
      }
      return null;
    }
    function X3(e) {
      for (var n = e.previousSibling, l = 0; n; ) {
        if (n.nodeType === hr) {
          var o = n.data;
          if (o === ly || o === gv || o === yv) {
            if (l === 0)
              return n;
            l--;
          } else o === oy && l++;
        }
        n = n.previousSibling;
      }
      return null;
    }
    function CR(e) {
      fs(e);
    }
    function TR(e) {
      fs(e);
    }
    function RR(e) {
      return e !== "head" && e !== "body";
    }
    function MR(e, n, l, o) {
      var c = !0;
      ry(n.nodeValue, l, o, c);
    }
    function _R(e, n, l, o, c, h) {
      if (n[iy] !== !0) {
        var S = !0;
        ry(o.nodeValue, c, h, S);
      }
    }
    function kR(e, n) {
      n.nodeType === _a ? V1(e, n) : n.nodeType === hr || I1(e, n);
    }
    function DR(e, n) {
      {
        var l = e.parentNode;
        l !== null && (n.nodeType === _a ? V1(l, n) : n.nodeType === hr || I1(l, n));
      }
    }
    function OR(e, n, l, o, c) {
      (c || n[iy] !== !0) && (o.nodeType === _a ? V1(l, o) : o.nodeType === hr || I1(l, o));
    }
    function AR(e, n, l) {
      q1(e, n);
    }
    function zR(e, n) {
      Y1(e, n);
    }
    function LR(e, n, l) {
      {
        var o = e.parentNode;
        o !== null && q1(o, n);
      }
    }
    function NR(e, n) {
      {
        var l = e.parentNode;
        l !== null && Y1(l, n);
      }
    }
    function UR(e, n, l, o, c, h) {
      (h || n[iy] !== !0) && q1(l, o);
    }
    function jR(e, n, l, o, c) {
      (c || n[iy] !== !0) && Y1(l, o);
    }
    function FR(e) {
      v("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function PR(e) {
      fv(e);
    }
    var hd = Math.random().toString(36).slice(2), md = "__reactFiber$" + hd, J1 = "__reactProps$" + hd, Ev = "__reactContainer$" + hd, eg = "__reactEvents$" + hd, $R = "__reactListeners$" + hd, HR = "__reactHandles$" + hd;
    function VR(e) {
      delete e[md], delete e[J1], delete e[eg], delete e[$R], delete e[HR];
    }
    function xv(e, n) {
      n[md] = e;
    }
    function uy(e, n) {
      n[Ev] = e;
    }
    function K3(e) {
      e[Ev] = null;
    }
    function wv(e) {
      return !!e[Ev];
    }
    function Nc(e) {
      var n = e[md];
      if (n)
        return n;
      for (var l = e.parentNode; l; ) {
        if (n = l[Ev] || l[md], n) {
          var o = n.alternate;
          if (n.child !== null || o !== null && o.child !== null)
            for (var c = X3(e); c !== null; ) {
              var h = c[md];
              if (h)
                return h;
              c = X3(c);
            }
          return n;
        }
        e = l, l = e.parentNode;
      }
      return null;
    }
    function du(e) {
      var n = e[md] || e[Ev];
      return n && (n.tag === _ || n.tag === k || n.tag === H || n.tag === C) ? n : null;
    }
    function yd(e) {
      if (e.tag === _ || e.tag === k)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function cy(e) {
      return e[J1] || null;
    }
    function tg(e, n) {
      e[J1] = n;
    }
    function IR(e) {
      var n = e[eg];
      return n === void 0 && (n = e[eg] = /* @__PURE__ */ new Set()), n;
    }
    var Z3 = {}, J3 = s.ReactDebugCurrentFrame;
    function fy(e) {
      if (e) {
        var n = e._owner, l = xl(e.type, e._source, n ? n.type : null);
        J3.setExtraStackFrame(l);
      } else
        J3.setExtraStackFrame(null);
    }
    function jl(e, n, l, o, c) {
      {
        var h = Function.call.bind(ke);
        for (var S in e)
          if (h(e, S)) {
            var T = void 0;
            try {
              if (typeof e[S] != "function") {
                var M = Error((o || "React class") + ": " + l + " type `" + S + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[S] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw M.name = "Invariant Violation", M;
              }
              T = e[S](n, S, o, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (L) {
              T = L;
            }
            T && !(T instanceof Error) && (fy(c), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", l, S, typeof T), fy(null)), T instanceof Error && !(T.message in Z3) && (Z3[T.message] = !0, fy(c), v("Failed %s type: %s", l, T.message), fy(null));
          }
      }
    }
    var ng = [], dy;
    dy = [];
    var ys = -1;
    function pu(e) {
      return {
        current: e
      };
    }
    function Pa(e, n) {
      if (ys < 0) {
        v("Unexpected pop.");
        return;
      }
      n !== dy[ys] && v("Unexpected Fiber popped."), e.current = ng[ys], ng[ys] = null, dy[ys] = null, ys--;
    }
    function $a(e, n, l) {
      ys++, ng[ys] = e.current, dy[ys] = l, e.current = n;
    }
    var rg;
    rg = {};
    var Pi = {};
    Object.freeze(Pi);
    var gs = pu(Pi), To = pu(!1), ag = Pi;
    function gd(e, n, l) {
      return l && Ro(n) ? ag : gs.current;
    }
    function eE(e, n, l) {
      {
        var o = e.stateNode;
        o.__reactInternalMemoizedUnmaskedChildContext = n, o.__reactInternalMemoizedMaskedChildContext = l;
      }
    }
    function Sd(e, n) {
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
          var T = Qt(e) || "Unknown";
          jl(o, h, "context", T);
        }
        return c && eE(e, n, h), h;
      }
    }
    function py() {
      return To.current;
    }
    function Ro(e) {
      {
        var n = e.childContextTypes;
        return n != null;
      }
    }
    function vy(e) {
      Pa(To, e), Pa(gs, e);
    }
    function ig(e) {
      Pa(To, e), Pa(gs, e);
    }
    function tE(e, n, l) {
      {
        if (gs.current !== Pi)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        $a(gs, n, e), $a(To, l, e);
      }
    }
    function nE(e, n, l) {
      {
        var o = e.stateNode, c = n.childContextTypes;
        if (typeof o.getChildContext != "function") {
          {
            var h = Qt(e) || "Unknown";
            rg[h] || (rg[h] = !0, v("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", h, h));
          }
          return l;
        }
        var S = o.getChildContext();
        for (var T in S)
          if (!(T in c))
            throw new Error((Qt(e) || "Unknown") + '.getChildContext(): key "' + T + '" is not defined in childContextTypes.');
        {
          var M = Qt(e) || "Unknown";
          jl(c, S, "child context", M);
        }
        return Bt({}, l, S);
      }
    }
    function hy(e) {
      {
        var n = e.stateNode, l = n && n.__reactInternalMemoizedMergedChildContext || Pi;
        return ag = gs.current, $a(gs, l, e), $a(To, To.current, e), !0;
      }
    }
    function rE(e, n, l) {
      {
        var o = e.stateNode;
        if (!o)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (l) {
          var c = nE(e, n, ag);
          o.__reactInternalMemoizedMergedChildContext = c, Pa(To, e), Pa(gs, e), $a(gs, c, e), $a(To, l, e);
        } else
          Pa(To, e), $a(To, l, e);
      }
    }
    function qR(e) {
      {
        if (!Ko(e) || e.tag !== x)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var n = e;
        do {
          switch (n.tag) {
            case C:
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
    var vu = 0, my = 1, Ss = null, lg = !1, og = !1;
    function aE(e) {
      Ss === null ? Ss = [e] : Ss.push(e);
    }
    function YR(e) {
      lg = !0, aE(e);
    }
    function iE() {
      lg && hu();
    }
    function hu() {
      if (!og && Ss !== null) {
        og = !0;
        var e = 0, n = mi();
        try {
          var l = !0, o = Ss;
          for (Er(pa); e < o.length; e++) {
            var c = o[e];
            do
              c = c(l);
            while (c !== null);
          }
          Ss = null, lg = !1;
        } catch (h) {
          throw Ss !== null && (Ss = Ss.slice(e + 1)), Tp(ec, hu), h;
        } finally {
          Er(n), og = !1;
        }
      }
      return null;
    }
    var Ed = [], xd = 0, yy = null, gy = 0, sl = [], ul = 0, Uc = null, Es = 1, xs = "";
    function WR(e) {
      return Fc(), (e.flags & Zi) !== At;
    }
    function GR(e) {
      return Fc(), gy;
    }
    function QR() {
      var e = xs, n = Es, l = n & ~BR(n);
      return l.toString(32) + e;
    }
    function jc(e, n) {
      Fc(), Ed[xd++] = gy, Ed[xd++] = yy, yy = e, gy = n;
    }
    function lE(e, n, l) {
      Fc(), sl[ul++] = Es, sl[ul++] = xs, sl[ul++] = Uc, Uc = e;
      var o = Es, c = xs, h = Sy(o) - 1, S = o & ~(1 << h), T = l + 1, M = Sy(n) + h;
      if (M > 30) {
        var L = h - h % 5, j = (1 << L) - 1, re = (S & j).toString(32), te = S >> L, he = h - L, ge = Sy(n) + he, Te = T << he, st = Te | te, Nt = re + c;
        Es = 1 << ge | st, xs = Nt;
      } else {
        var _t = T << h, mn = _t | S, fn = c;
        Es = 1 << M | mn, xs = fn;
      }
    }
    function sg(e) {
      Fc();
      var n = e.return;
      if (n !== null) {
        var l = 1, o = 0;
        jc(e, l), lE(e, l, o);
      }
    }
    function Sy(e) {
      return 32 - gr(e);
    }
    function BR(e) {
      return 1 << Sy(e) - 1;
    }
    function ug(e) {
      for (; e === yy; )
        yy = Ed[--xd], Ed[xd] = null, gy = Ed[--xd], Ed[xd] = null;
      for (; e === Uc; )
        Uc = sl[--ul], sl[ul] = null, xs = sl[--ul], sl[ul] = null, Es = sl[--ul], sl[ul] = null;
    }
    function XR() {
      return Fc(), Uc !== null ? {
        id: Es,
        overflow: xs
      } : null;
    }
    function KR(e, n) {
      Fc(), sl[ul++] = Es, sl[ul++] = xs, sl[ul++] = Uc, Es = n.id, xs = n.overflow, Uc = e;
    }
    function Fc() {
      ga() || v("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var ya = null, cl = null, Fl = !1, Pc = !1, mu = null;
    function ZR() {
      Fl && v("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function oE() {
      Pc = !0;
    }
    function JR() {
      return Pc;
    }
    function eM(e) {
      var n = e.stateNode.containerInfo;
      return cl = gR(n), ya = e, Fl = !0, mu = null, Pc = !1, !0;
    }
    function tM(e, n, l) {
      return cl = SR(n), ya = e, Fl = !0, mu = null, Pc = !1, l !== null && KR(e, l), !0;
    }
    function sE(e, n) {
      switch (e.tag) {
        case C: {
          kR(e.stateNode.containerInfo, n);
          break;
        }
        case _: {
          var l = (e.mode & ln) !== zt;
          OR(
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
          o.dehydrated !== null && DR(o.dehydrated, n);
          break;
        }
      }
    }
    function uE(e, n) {
      sE(e, n);
      var l = iD();
      l.stateNode = n, l.return = e;
      var o = e.deletions;
      o === null ? (e.deletions = [l], e.flags |= ui) : o.push(l);
    }
    function cg(e, n) {
      {
        if (Pc)
          return;
        switch (e.tag) {
          case C: {
            var l = e.stateNode.containerInfo;
            switch (n.tag) {
              case _:
                var o = n.type;
                n.pendingProps, AR(l, o);
                break;
              case k:
                var c = n.pendingProps;
                zR(l, c);
                break;
            }
            break;
          }
          case _: {
            var h = e.type, S = e.memoizedProps, T = e.stateNode;
            switch (n.tag) {
              case _: {
                var M = n.type, L = n.pendingProps, j = (e.mode & ln) !== zt;
                UR(
                  h,
                  S,
                  T,
                  M,
                  L,
                  // TODO: Delete this argument when we remove the legacy root API.
                  j
                );
                break;
              }
              case k: {
                var re = n.pendingProps, te = (e.mode & ln) !== zt;
                jR(
                  h,
                  S,
                  T,
                  re,
                  // TODO: Delete this argument when we remove the legacy root API.
                  te
                );
                break;
              }
            }
            break;
          }
          case H: {
            var he = e.memoizedState, ge = he.dehydrated;
            if (ge !== null) switch (n.tag) {
              case _:
                var Te = n.type;
                n.pendingProps, LR(ge, Te);
                break;
              case k:
                var st = n.pendingProps;
                NR(ge, st);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function cE(e, n) {
      n.flags = n.flags & ~Da | er, cg(e, n);
    }
    function fE(e, n) {
      switch (e.tag) {
        case _: {
          var l = e.type;
          e.pendingProps;
          var o = dR(n, l);
          return o !== null ? (e.stateNode = o, ya = e, cl = yR(o), !0) : !1;
        }
        case k: {
          var c = e.pendingProps, h = pR(n, c);
          return h !== null ? (e.stateNode = h, ya = e, cl = null, !0) : !1;
        }
        case H: {
          var S = vR(n);
          if (S !== null) {
            var T = {
              dehydrated: S,
              treeContext: XR(),
              retryLane: La
            };
            e.memoizedState = T;
            var M = lD(S);
            return M.return = e, e.child = M, ya = e, cl = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function fg(e) {
      return (e.mode & ln) !== zt && (e.flags & Dt) === At;
    }
    function dg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function pg(e) {
      if (Fl) {
        var n = cl;
        if (!n) {
          fg(e) && (cg(ya, e), dg()), cE(ya, e), Fl = !1, ya = e;
          return;
        }
        var l = n;
        if (!fE(e, n)) {
          fg(e) && (cg(ya, e), dg()), n = Sv(l);
          var o = ya;
          if (!n || !fE(e, n)) {
            cE(ya, e), Fl = !1, ya = e;
            return;
          }
          uE(o, l);
        }
      }
    }
    function nM(e, n, l) {
      var o = e.stateNode, c = !Pc, h = ER(o, e.type, e.memoizedProps, n, l, e, c);
      return e.updateQueue = h, h !== null;
    }
    function rM(e) {
      var n = e.stateNode, l = e.memoizedProps, o = xR(n, l, e);
      if (o) {
        var c = ya;
        if (c !== null)
          switch (c.tag) {
            case C: {
              var h = c.stateNode.containerInfo, S = (c.mode & ln) !== zt;
              MR(
                h,
                n,
                l,
                // TODO: Delete this argument when we remove the legacy root API.
                S
              );
              break;
            }
            case _: {
              var T = c.type, M = c.memoizedProps, L = c.stateNode, j = (c.mode & ln) !== zt;
              _R(
                T,
                M,
                L,
                n,
                l,
                // TODO: Delete this argument when we remove the legacy root API.
                j
              );
              break;
            }
          }
      }
      return o;
    }
    function aM(e) {
      var n = e.memoizedState, l = n !== null ? n.dehydrated : null;
      if (!l)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      wR(l, e);
    }
    function iM(e) {
      var n = e.memoizedState, l = n !== null ? n.dehydrated : null;
      if (!l)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return bR(l);
    }
    function dE(e) {
      for (var n = e.return; n !== null && n.tag !== _ && n.tag !== C && n.tag !== H; )
        n = n.return;
      ya = n;
    }
    function Ey(e) {
      if (e !== ya)
        return !1;
      if (!Fl)
        return dE(e), Fl = !0, !1;
      if (e.tag !== C && (e.tag !== _ || RR(e.type) && !Q1(e.type, e.memoizedProps))) {
        var n = cl;
        if (n)
          if (fg(e))
            pE(e), dg();
          else
            for (; n; )
              uE(e, n), n = Sv(n);
      }
      return dE(e), e.tag === H ? cl = iM(e) : cl = ya ? Sv(e.stateNode) : null, !0;
    }
    function lM() {
      return Fl && cl !== null;
    }
    function pE(e) {
      for (var n = cl; n; )
        sE(e, n), n = Sv(n);
    }
    function wd() {
      ya = null, cl = null, Fl = !1, Pc = !1;
    }
    function vE() {
      mu !== null && (ow(mu), mu = null);
    }
    function ga() {
      return Fl;
    }
    function vg(e) {
      mu === null ? mu = [e] : mu.push(e);
    }
    var oM = s.ReactCurrentBatchConfig, sM = null;
    function uM() {
      return oM.transition;
    }
    var Pl = {
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
      var cM = function(e) {
        for (var n = null, l = e; l !== null; )
          l.mode & Ln && (n = l), l = l.return;
        return n;
      }, $c = function(e) {
        var n = [];
        return e.forEach(function(l) {
          n.push(l);
        }), n.sort().join(", ");
      }, bv = [], Cv = [], Tv = [], Rv = [], Mv = [], _v = [], Hc = /* @__PURE__ */ new Set();
      Pl.recordUnsafeLifecycleWarnings = function(e, n) {
        Hc.has(e.type) || (typeof n.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        n.componentWillMount.__suppressDeprecationWarning !== !0 && bv.push(e), e.mode & Ln && typeof n.UNSAFE_componentWillMount == "function" && Cv.push(e), typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Tv.push(e), e.mode & Ln && typeof n.UNSAFE_componentWillReceiveProps == "function" && Rv.push(e), typeof n.componentWillUpdate == "function" && n.componentWillUpdate.__suppressDeprecationWarning !== !0 && Mv.push(e), e.mode & Ln && typeof n.UNSAFE_componentWillUpdate == "function" && _v.push(e));
      }, Pl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        bv.length > 0 && (bv.forEach(function(te) {
          e.add(Qt(te) || "Component"), Hc.add(te.type);
        }), bv = []);
        var n = /* @__PURE__ */ new Set();
        Cv.length > 0 && (Cv.forEach(function(te) {
          n.add(Qt(te) || "Component"), Hc.add(te.type);
        }), Cv = []);
        var l = /* @__PURE__ */ new Set();
        Tv.length > 0 && (Tv.forEach(function(te) {
          l.add(Qt(te) || "Component"), Hc.add(te.type);
        }), Tv = []);
        var o = /* @__PURE__ */ new Set();
        Rv.length > 0 && (Rv.forEach(function(te) {
          o.add(Qt(te) || "Component"), Hc.add(te.type);
        }), Rv = []);
        var c = /* @__PURE__ */ new Set();
        Mv.length > 0 && (Mv.forEach(function(te) {
          c.add(Qt(te) || "Component"), Hc.add(te.type);
        }), Mv = []);
        var h = /* @__PURE__ */ new Set();
        if (_v.length > 0 && (_v.forEach(function(te) {
          h.add(Qt(te) || "Component"), Hc.add(te.type);
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
          var M = $c(h);
          v(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, M);
        }
        if (e.size > 0) {
          var L = $c(e);
          m(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, L);
        }
        if (l.size > 0) {
          var j = $c(l);
          m(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, j);
        }
        if (c.size > 0) {
          var re = $c(c);
          m(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, re);
        }
      };
      var xy = /* @__PURE__ */ new Map(), hE = /* @__PURE__ */ new Set();
      Pl.recordLegacyContextWarning = function(e, n) {
        var l = cM(e);
        if (l === null) {
          v("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!hE.has(e.type)) {
          var o = xy.get(l);
          (e.type.contextTypes != null || e.type.childContextTypes != null || n !== null && typeof n.getChildContext == "function") && (o === void 0 && (o = [], xy.set(l, o)), o.push(e));
        }
      }, Pl.flushLegacyContextWarning = function() {
        xy.forEach(function(e, n) {
          if (e.length !== 0) {
            var l = e[0], o = /* @__PURE__ */ new Set();
            e.forEach(function(h) {
              o.add(Qt(h) || "Component"), hE.add(h.type);
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
      }, Pl.discardPendingWarnings = function() {
        bv = [], Cv = [], Tv = [], Rv = [], Mv = [], _v = [], xy = /* @__PURE__ */ new Map();
      };
    }
    var hg, mg, yg, gg, Sg, mE = function(e, n) {
    };
    hg = !1, mg = !1, yg = {}, gg = {}, Sg = {}, mE = function(e, n) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var l = Qt(n) || "Component";
        gg[l] || (gg[l] = !0, v('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function fM(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function kv(e, n, l) {
      var o = l.ref;
      if (o !== null && typeof o != "function" && typeof o != "object") {
        if ((e.mode & Ln || Z) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(l._owner && l._self && l._owner.stateNode !== l._self) && // Will already throw with "Function components cannot have string refs"
        !(l._owner && l._owner.tag !== x) && // Will already warn with "Function components cannot be given refs"
        !(typeof l.type == "function" && !fM(l.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        l._owner) {
          var c = Qt(e) || "Component";
          yg[c] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', c, o), yg[c] = !0);
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
          var M = S;
          tt(o, "ref");
          var L = "" + o;
          if (n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === L)
            return n.ref;
          var j = function(re) {
            var te = M.refs;
            re === null ? delete te[L] : te[L] = re;
          };
          return j._stringRef = L, j;
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
    function wy(e, n) {
      var l = Object.prototype.toString.call(n);
      throw new Error("Objects are not valid as a React child (found: " + (l === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : l) + "). If you meant to render a collection of children, use an array instead.");
    }
    function by(e) {
      {
        var n = Qt(e) || "Component";
        if (Sg[n])
          return;
        Sg[n] = !0, v("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function yE(e) {
      var n = e._payload, l = e._init;
      return l(n);
    }
    function gE(e) {
      function n(ce, Re) {
        if (e) {
          var fe = ce.deletions;
          fe === null ? (ce.deletions = [Re], ce.flags |= ui) : fe.push(Re);
        }
      }
      function l(ce, Re) {
        if (!e)
          return null;
        for (var fe = Re; fe !== null; )
          n(ce, fe), fe = fe.sibling;
        return null;
      }
      function o(ce, Re) {
        for (var fe = /* @__PURE__ */ new Map(), Qe = Re; Qe !== null; )
          Qe.key !== null ? fe.set(Qe.key, Qe) : fe.set(Qe.index, Qe), Qe = Qe.sibling;
        return fe;
      }
      function c(ce, Re) {
        var fe = Xc(ce, Re);
        return fe.index = 0, fe.sibling = null, fe;
      }
      function h(ce, Re, fe) {
        if (ce.index = fe, !e)
          return ce.flags |= Zi, Re;
        var Qe = ce.alternate;
        if (Qe !== null) {
          var mt = Qe.index;
          return mt < Re ? (ce.flags |= er, Re) : mt;
        } else
          return ce.flags |= er, Re;
      }
      function S(ce) {
        return e && ce.alternate === null && (ce.flags |= er), ce;
      }
      function T(ce, Re, fe, Qe) {
        if (Re === null || Re.tag !== k) {
          var mt = v2(fe, ce.mode, Qe);
          return mt.return = ce, mt;
        } else {
          var ut = c(Re, fe);
          return ut.return = ce, ut;
        }
      }
      function M(ce, Re, fe, Qe) {
        var mt = fe.type;
        if (mt === Ra)
          return j(ce, Re, fe.props.children, Qe, fe.key);
        if (Re !== null && (Re.elementType === mt || // Keep this check inline so it only runs on the false path:
        bw(Re, fe) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof mt == "object" && mt !== null && mt.$$typeof === It && yE(mt) === Re.type)) {
          var ut = c(Re, fe.props);
          return ut.ref = kv(ce, Re, fe), ut.return = ce, ut._debugSource = fe._source, ut._debugOwner = fe._owner, ut;
        }
        var qt = p2(fe, ce.mode, Qe);
        return qt.ref = kv(ce, Re, fe), qt.return = ce, qt;
      }
      function L(ce, Re, fe, Qe) {
        if (Re === null || Re.tag !== R || Re.stateNode.containerInfo !== fe.containerInfo || Re.stateNode.implementation !== fe.implementation) {
          var mt = h2(fe, ce.mode, Qe);
          return mt.return = ce, mt;
        } else {
          var ut = c(Re, fe.children || []);
          return ut.return = ce, ut;
        }
      }
      function j(ce, Re, fe, Qe, mt) {
        if (Re === null || Re.tag !== O) {
          var ut = Mu(fe, ce.mode, Qe, mt);
          return ut.return = ce, ut;
        } else {
          var qt = c(Re, fe);
          return qt.return = ce, qt;
        }
      }
      function re(ce, Re, fe) {
        if (typeof Re == "string" && Re !== "" || typeof Re == "number") {
          var Qe = v2("" + Re, ce.mode, fe);
          return Qe.return = ce, Qe;
        }
        if (typeof Re == "object" && Re !== null) {
          switch (Re.$$typeof) {
            case Ar: {
              var mt = p2(Re, ce.mode, fe);
              return mt.ref = kv(ce, null, Re), mt.return = ce, mt;
            }
            case Vn: {
              var ut = h2(Re, ce.mode, fe);
              return ut.return = ce, ut;
            }
            case It: {
              var qt = Re._payload, Kt = Re._init;
              return re(ce, Kt(qt), fe);
            }
          }
          if (rn(Re) || Wt(Re)) {
            var Un = Mu(Re, ce.mode, fe, null);
            return Un.return = ce, Un;
          }
          wy(ce, Re);
        }
        return typeof Re == "function" && by(ce), null;
      }
      function te(ce, Re, fe, Qe) {
        var mt = Re !== null ? Re.key : null;
        if (typeof fe == "string" && fe !== "" || typeof fe == "number")
          return mt !== null ? null : T(ce, Re, "" + fe, Qe);
        if (typeof fe == "object" && fe !== null) {
          switch (fe.$$typeof) {
            case Ar:
              return fe.key === mt ? M(ce, Re, fe, Qe) : null;
            case Vn:
              return fe.key === mt ? L(ce, Re, fe, Qe) : null;
            case It: {
              var ut = fe._payload, qt = fe._init;
              return te(ce, Re, qt(ut), Qe);
            }
          }
          if (rn(fe) || Wt(fe))
            return mt !== null ? null : j(ce, Re, fe, Qe, null);
          wy(ce, fe);
        }
        return typeof fe == "function" && by(ce), null;
      }
      function he(ce, Re, fe, Qe, mt) {
        if (typeof Qe == "string" && Qe !== "" || typeof Qe == "number") {
          var ut = ce.get(fe) || null;
          return T(Re, ut, "" + Qe, mt);
        }
        if (typeof Qe == "object" && Qe !== null) {
          switch (Qe.$$typeof) {
            case Ar: {
              var qt = ce.get(Qe.key === null ? fe : Qe.key) || null;
              return M(Re, qt, Qe, mt);
            }
            case Vn: {
              var Kt = ce.get(Qe.key === null ? fe : Qe.key) || null;
              return L(Re, Kt, Qe, mt);
            }
            case It:
              var Un = Qe._payload, Mn = Qe._init;
              return he(ce, Re, fe, Mn(Un), mt);
          }
          if (rn(Qe) || Wt(Qe)) {
            var Or = ce.get(fe) || null;
            return j(Re, Or, Qe, mt, null);
          }
          wy(Re, Qe);
        }
        return typeof Qe == "function" && by(Re), null;
      }
      function ge(ce, Re, fe) {
        {
          if (typeof ce != "object" || ce === null)
            return Re;
          switch (ce.$$typeof) {
            case Ar:
            case Vn:
              mE(ce, fe);
              var Qe = ce.key;
              if (typeof Qe != "string")
                break;
              if (Re === null) {
                Re = /* @__PURE__ */ new Set(), Re.add(Qe);
                break;
              }
              if (!Re.has(Qe)) {
                Re.add(Qe);
                break;
              }
              v("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", Qe);
              break;
            case It:
              var mt = ce._payload, ut = ce._init;
              ge(ut(mt), Re, fe);
              break;
          }
        }
        return Re;
      }
      function Te(ce, Re, fe, Qe) {
        for (var mt = null, ut = 0; ut < fe.length; ut++) {
          var qt = fe[ut];
          mt = ge(qt, mt, ce);
        }
        for (var Kt = null, Un = null, Mn = Re, Or = 0, _n = 0, br = null; Mn !== null && _n < fe.length; _n++) {
          Mn.index > _n ? (br = Mn, Mn = null) : br = Mn.sibling;
          var Va = te(ce, Mn, fe[_n], Qe);
          if (Va === null) {
            Mn === null && (Mn = br);
            break;
          }
          e && Mn && Va.alternate === null && n(ce, Mn), Or = h(Va, Or, _n), Un === null ? Kt = Va : Un.sibling = Va, Un = Va, Mn = br;
        }
        if (_n === fe.length) {
          if (l(ce, Mn), ga()) {
            var Ta = _n;
            jc(ce, Ta);
          }
          return Kt;
        }
        if (Mn === null) {
          for (; _n < fe.length; _n++) {
            var Hi = re(ce, fe[_n], Qe);
            Hi !== null && (Or = h(Hi, Or, _n), Un === null ? Kt = Hi : Un.sibling = Hi, Un = Hi);
          }
          if (ga()) {
            var ti = _n;
            jc(ce, ti);
          }
          return Kt;
        }
        for (var ni = o(ce, Mn); _n < fe.length; _n++) {
          var Ia = he(ni, ce, _n, fe[_n], Qe);
          Ia !== null && (e && Ia.alternate !== null && ni.delete(Ia.key === null ? _n : Ia.key), Or = h(Ia, Or, _n), Un === null ? Kt = Ia : Un.sibling = Ia, Un = Ia);
        }
        if (e && ni.forEach(function(Hd) {
          return n(ce, Hd);
        }), ga()) {
          var _s = _n;
          jc(ce, _s);
        }
        return Kt;
      }
      function st(ce, Re, fe, Qe) {
        var mt = Wt(fe);
        if (typeof mt != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          fe[Symbol.toStringTag] === "Generator" && (mg || v("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), mg = !0), fe.entries === mt && (hg || v("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), hg = !0);
          var ut = mt.call(fe);
          if (ut)
            for (var qt = null, Kt = ut.next(); !Kt.done; Kt = ut.next()) {
              var Un = Kt.value;
              qt = ge(Un, qt, ce);
            }
        }
        var Mn = mt.call(fe);
        if (Mn == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Or = null, _n = null, br = Re, Va = 0, Ta = 0, Hi = null, ti = Mn.next(); br !== null && !ti.done; Ta++, ti = Mn.next()) {
          br.index > Ta ? (Hi = br, br = null) : Hi = br.sibling;
          var ni = te(ce, br, ti.value, Qe);
          if (ni === null) {
            br === null && (br = Hi);
            break;
          }
          e && br && ni.alternate === null && n(ce, br), Va = h(ni, Va, Ta), _n === null ? Or = ni : _n.sibling = ni, _n = ni, br = Hi;
        }
        if (ti.done) {
          if (l(ce, br), ga()) {
            var Ia = Ta;
            jc(ce, Ia);
          }
          return Or;
        }
        if (br === null) {
          for (; !ti.done; Ta++, ti = Mn.next()) {
            var _s = re(ce, ti.value, Qe);
            _s !== null && (Va = h(_s, Va, Ta), _n === null ? Or = _s : _n.sibling = _s, _n = _s);
          }
          if (ga()) {
            var Hd = Ta;
            jc(ce, Hd);
          }
          return Or;
        }
        for (var oh = o(ce, br); !ti.done; Ta++, ti = Mn.next()) {
          var Lo = he(oh, ce, Ta, ti.value, Qe);
          Lo !== null && (e && Lo.alternate !== null && oh.delete(Lo.key === null ? Ta : Lo.key), Va = h(Lo, Va, Ta), _n === null ? Or = Lo : _n.sibling = Lo, _n = Lo);
        }
        if (e && oh.forEach(function(jD) {
          return n(ce, jD);
        }), ga()) {
          var UD = Ta;
          jc(ce, UD);
        }
        return Or;
      }
      function Nt(ce, Re, fe, Qe) {
        if (Re !== null && Re.tag === k) {
          l(ce, Re.sibling);
          var mt = c(Re, fe);
          return mt.return = ce, mt;
        }
        l(ce, Re);
        var ut = v2(fe, ce.mode, Qe);
        return ut.return = ce, ut;
      }
      function _t(ce, Re, fe, Qe) {
        for (var mt = fe.key, ut = Re; ut !== null; ) {
          if (ut.key === mt) {
            var qt = fe.type;
            if (qt === Ra) {
              if (ut.tag === O) {
                l(ce, ut.sibling);
                var Kt = c(ut, fe.props.children);
                return Kt.return = ce, Kt._debugSource = fe._source, Kt._debugOwner = fe._owner, Kt;
              }
            } else if (ut.elementType === qt || // Keep this check inline so it only runs on the false path:
            bw(ut, fe) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof qt == "object" && qt !== null && qt.$$typeof === It && yE(qt) === ut.type) {
              l(ce, ut.sibling);
              var Un = c(ut, fe.props);
              return Un.ref = kv(ce, ut, fe), Un.return = ce, Un._debugSource = fe._source, Un._debugOwner = fe._owner, Un;
            }
            l(ce, ut);
            break;
          } else
            n(ce, ut);
          ut = ut.sibling;
        }
        if (fe.type === Ra) {
          var Mn = Mu(fe.props.children, ce.mode, Qe, fe.key);
          return Mn.return = ce, Mn;
        } else {
          var Or = p2(fe, ce.mode, Qe);
          return Or.ref = kv(ce, Re, fe), Or.return = ce, Or;
        }
      }
      function mn(ce, Re, fe, Qe) {
        for (var mt = fe.key, ut = Re; ut !== null; ) {
          if (ut.key === mt)
            if (ut.tag === R && ut.stateNode.containerInfo === fe.containerInfo && ut.stateNode.implementation === fe.implementation) {
              l(ce, ut.sibling);
              var qt = c(ut, fe.children || []);
              return qt.return = ce, qt;
            } else {
              l(ce, ut);
              break;
            }
          else
            n(ce, ut);
          ut = ut.sibling;
        }
        var Kt = h2(fe, ce.mode, Qe);
        return Kt.return = ce, Kt;
      }
      function fn(ce, Re, fe, Qe) {
        var mt = typeof fe == "object" && fe !== null && fe.type === Ra && fe.key === null;
        if (mt && (fe = fe.props.children), typeof fe == "object" && fe !== null) {
          switch (fe.$$typeof) {
            case Ar:
              return S(_t(ce, Re, fe, Qe));
            case Vn:
              return S(mn(ce, Re, fe, Qe));
            case It:
              var ut = fe._payload, qt = fe._init;
              return fn(ce, Re, qt(ut), Qe);
          }
          if (rn(fe))
            return Te(ce, Re, fe, Qe);
          if (Wt(fe))
            return st(ce, Re, fe, Qe);
          wy(ce, fe);
        }
        return typeof fe == "string" && fe !== "" || typeof fe == "number" ? S(Nt(ce, Re, "" + fe, Qe)) : (typeof fe == "function" && by(ce), l(ce, Re));
      }
      return fn;
    }
    var bd = gE(!0), SE = gE(!1);
    function dM(e, n) {
      if (e !== null && n.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (n.child !== null) {
        var l = n.child, o = Xc(l, l.pendingProps);
        for (n.child = o, o.return = n; l.sibling !== null; )
          l = l.sibling, o = o.sibling = Xc(l, l.pendingProps), o.return = n;
        o.sibling = null;
      }
    }
    function pM(e, n) {
      for (var l = e.child; l !== null; )
        eD(l, n), l = l.sibling;
    }
    var Eg = pu(null), xg;
    xg = {};
    var Cy = null, Cd = null, wg = null, Ty = !1;
    function Ry() {
      Cy = null, Cd = null, wg = null, Ty = !1;
    }
    function EE() {
      Ty = !0;
    }
    function xE() {
      Ty = !1;
    }
    function wE(e, n, l) {
      $a(Eg, n._currentValue, e), n._currentValue = l, n._currentRenderer !== void 0 && n._currentRenderer !== null && n._currentRenderer !== xg && v("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), n._currentRenderer = xg;
    }
    function bg(e, n) {
      var l = Eg.current;
      Pa(Eg, n), e._currentValue = l;
    }
    function Cg(e, n, l) {
      for (var o = e; o !== null; ) {
        var c = o.alternate;
        if (cs(o.childLanes, n) ? c !== null && !cs(c.childLanes, n) && (c.childLanes = en(c.childLanes, n)) : (o.childLanes = en(o.childLanes, n), c !== null && (c.childLanes = en(c.childLanes, n))), o === l)
          break;
        o = o.return;
      }
      o !== l && v("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function vM(e, n, l) {
      hM(e, n, l);
    }
    function hM(e, n, l) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var c = void 0, h = o.dependencies;
        if (h !== null) {
          c = o.child;
          for (var S = h.firstContext; S !== null; ) {
            if (S.context === n) {
              if (o.tag === x) {
                var T = vc(l), M = ws(jn, T);
                M.tag = _y;
                var L = o.updateQueue;
                if (L !== null) {
                  var j = L.shared, re = j.pending;
                  re === null ? M.next = M : (M.next = re.next, re.next = M), j.pending = M;
                }
              }
              o.lanes = en(o.lanes, l);
              var te = o.alternate;
              te !== null && (te.lanes = en(te.lanes, l)), Cg(o.return, l, e), h.lanes = en(h.lanes, l);
              break;
            }
            S = S.next;
          }
        } else if (o.tag === Y)
          c = o.type === e.type ? null : o.child;
        else if (o.tag === $) {
          var he = o.return;
          if (he === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          he.lanes = en(he.lanes, l);
          var ge = he.alternate;
          ge !== null && (ge.lanes = en(ge.lanes, l)), Cg(he, l, e), c = o.sibling;
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
            var Te = c.sibling;
            if (Te !== null) {
              Te.return = c.return, c = Te;
              break;
            }
            c = c.return;
          }
        o = c;
      }
    }
    function Td(e, n) {
      Cy = e, Cd = null, wg = null;
      var l = e.dependencies;
      if (l !== null) {
        var o = l.firstContext;
        o !== null && (Na(l.lanes, n) && qv(), l.firstContext = null);
      }
    }
    function Fr(e) {
      Ty && v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var n = e._currentValue;
      if (wg !== e) {
        var l = {
          context: e,
          memoizedValue: n,
          next: null
        };
        if (Cd === null) {
          if (Cy === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Cd = l, Cy.dependencies = {
            lanes: Ue,
            firstContext: l
          };
        } else
          Cd = Cd.next = l;
      }
      return n;
    }
    var Vc = null;
    function Tg(e) {
      Vc === null ? Vc = [e] : Vc.push(e);
    }
    function mM() {
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
    function bE(e, n, l, o) {
      var c = n.interleaved;
      return c === null ? (l.next = l, Tg(n)) : (l.next = c.next, c.next = l), n.interleaved = l, My(e, o);
    }
    function yM(e, n, l, o) {
      var c = n.interleaved;
      c === null ? (l.next = l, Tg(n)) : (l.next = c.next, c.next = l), n.interleaved = l;
    }
    function gM(e, n, l, o) {
      var c = n.interleaved;
      return c === null ? (l.next = l, Tg(n)) : (l.next = c.next, c.next = l), n.interleaved = l, My(e, o);
    }
    function Si(e, n) {
      return My(e, n);
    }
    var SM = My;
    function My(e, n) {
      e.lanes = en(e.lanes, n);
      var l = e.alternate;
      l !== null && (l.lanes = en(l.lanes, n)), l === null && (e.flags & (er | Da)) !== At && Sw(e);
      for (var o = e, c = e.return; c !== null; )
        c.childLanes = en(c.childLanes, n), l = c.alternate, l !== null ? l.childLanes = en(l.childLanes, n) : (c.flags & (er | Da)) !== At && Sw(e), o = c, c = c.return;
      if (o.tag === C) {
        var h = o.stateNode;
        return h;
      } else
        return null;
    }
    var CE = 0, TE = 1, _y = 2, Rg = 3, ky = !1, Mg, Dy;
    Mg = !1, Dy = null;
    function _g(e) {
      var n = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: Ue
        },
        effects: null
      };
      e.updateQueue = n;
    }
    function RE(e, n) {
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
    function ws(e, n) {
      var l = {
        eventTime: e,
        lane: n,
        tag: CE,
        payload: null,
        callback: null,
        next: null
      };
      return l;
    }
    function yu(e, n, l) {
      var o = e.updateQueue;
      if (o === null)
        return null;
      var c = o.shared;
      if (Dy === c && !Mg && (v("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Mg = !0), yk()) {
        var h = c.pending;
        return h === null ? n.next = n : (n.next = h.next, h.next = n), c.pending = n, SM(e, l);
      } else
        return gM(e, c, n, l);
    }
    function Oy(e, n, l) {
      var o = n.updateQueue;
      if (o !== null) {
        var c = o.shared;
        if (Vp(l)) {
          var h = c.lanes;
          h = qp(h, e.pendingLanes);
          var S = en(h, l);
          c.lanes = S, Kf(e, S);
        }
      }
    }
    function kg(e, n) {
      var l = e.updateQueue, o = e.alternate;
      if (o !== null) {
        var c = o.updateQueue;
        if (l === c) {
          var h = null, S = null, T = l.firstBaseUpdate;
          if (T !== null) {
            var M = T;
            do {
              var L = {
                eventTime: M.eventTime,
                lane: M.lane,
                tag: M.tag,
                payload: M.payload,
                callback: M.callback,
                next: null
              };
              S === null ? h = S = L : (S.next = L, S = L), M = M.next;
            } while (M !== null);
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
      var j = l.lastBaseUpdate;
      j === null ? l.firstBaseUpdate = n : j.next = n, l.lastBaseUpdate = n;
    }
    function EM(e, n, l, o, c, h) {
      switch (l.tag) {
        case TE: {
          var S = l.payload;
          if (typeof S == "function") {
            EE();
            var T = S.call(h, o, c);
            {
              if (e.mode & Ln) {
                tr(!0);
                try {
                  S.call(h, o, c);
                } finally {
                  tr(!1);
                }
              }
              xE();
            }
            return T;
          }
          return S;
        }
        case Rg:
          e.flags = e.flags & ~Lr | Dt;
        // Intentional fallthrough
        case CE: {
          var M = l.payload, L;
          if (typeof M == "function") {
            EE(), L = M.call(h, o, c);
            {
              if (e.mode & Ln) {
                tr(!0);
                try {
                  M.call(h, o, c);
                } finally {
                  tr(!1);
                }
              }
              xE();
            }
          } else
            L = M;
          return L == null ? o : Bt({}, o, L);
        }
        case _y:
          return ky = !0, o;
      }
      return o;
    }
    function Ay(e, n, l, o) {
      var c = e.updateQueue;
      ky = !1, Dy = c.shared;
      var h = c.firstBaseUpdate, S = c.lastBaseUpdate, T = c.shared.pending;
      if (T !== null) {
        c.shared.pending = null;
        var M = T, L = M.next;
        M.next = null, S === null ? h = L : S.next = L, S = M;
        var j = e.alternate;
        if (j !== null) {
          var re = j.updateQueue, te = re.lastBaseUpdate;
          te !== S && (te === null ? re.firstBaseUpdate = L : te.next = L, re.lastBaseUpdate = M);
        }
      }
      if (h !== null) {
        var he = c.baseState, ge = Ue, Te = null, st = null, Nt = null, _t = h;
        do {
          var mn = _t.lane, fn = _t.eventTime;
          if (cs(o, mn)) {
            if (Nt !== null) {
              var Re = {
                eventTime: fn,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: wn,
                tag: _t.tag,
                payload: _t.payload,
                callback: _t.callback,
                next: null
              };
              Nt = Nt.next = Re;
            }
            he = EM(e, c, _t, he, n, l);
            var fe = _t.callback;
            if (fe !== null && // If the update was already committed, we should not queue its
            // callback again.
            _t.lane !== wn) {
              e.flags |= Pn;
              var Qe = c.effects;
              Qe === null ? c.effects = [_t] : Qe.push(_t);
            }
          } else {
            var ce = {
              eventTime: fn,
              lane: mn,
              tag: _t.tag,
              payload: _t.payload,
              callback: _t.callback,
              next: null
            };
            Nt === null ? (st = Nt = ce, Te = he) : Nt = Nt.next = ce, ge = en(ge, mn);
          }
          if (_t = _t.next, _t === null) {
            if (T = c.shared.pending, T === null)
              break;
            var mt = T, ut = mt.next;
            mt.next = null, _t = ut, c.lastBaseUpdate = mt, c.shared.pending = null;
          }
        } while (!0);
        Nt === null && (Te = he), c.baseState = Te, c.firstBaseUpdate = st, c.lastBaseUpdate = Nt;
        var qt = c.shared.interleaved;
        if (qt !== null) {
          var Kt = qt;
          do
            ge = en(ge, Kt.lane), Kt = Kt.next;
          while (Kt !== qt);
        } else h === null && (c.shared.lanes = Ue);
        nh(ge), e.lanes = ge, e.memoizedState = he;
      }
      Dy = null;
    }
    function xM(e, n) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(n);
    }
    function ME() {
      ky = !1;
    }
    function zy() {
      return ky;
    }
    function _E(e, n, l) {
      var o = n.effects;
      if (n.effects = null, o !== null)
        for (var c = 0; c < o.length; c++) {
          var h = o[c], S = h.callback;
          S !== null && (h.callback = null, xM(S, l));
        }
    }
    var Dv = {}, gu = pu(Dv), Ov = pu(Dv), Ly = pu(Dv);
    function Ny(e) {
      if (e === Dv)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function kE() {
      var e = Ny(Ly.current);
      return e;
    }
    function Dg(e, n) {
      $a(Ly, n, e), $a(Ov, e, e), $a(gu, Dv, e);
      var l = FT(n);
      Pa(gu, e), $a(gu, l, e);
    }
    function Rd(e) {
      Pa(gu, e), Pa(Ov, e), Pa(Ly, e);
    }
    function Og() {
      var e = Ny(gu.current);
      return e;
    }
    function DE(e) {
      Ny(Ly.current);
      var n = Ny(gu.current), l = PT(n, e.type);
      n !== l && ($a(Ov, e, e), $a(gu, l, e));
    }
    function Ag(e) {
      Ov.current === e && (Pa(gu, e), Pa(Ov, e));
    }
    var wM = 0, OE = 1, AE = 1, Av = 2, $l = pu(wM);
    function zg(e, n) {
      return (e & n) !== 0;
    }
    function Md(e) {
      return e & OE;
    }
    function Lg(e, n) {
      return e & OE | n;
    }
    function bM(e, n) {
      return e | n;
    }
    function Su(e, n) {
      $a($l, n, e);
    }
    function _d(e) {
      Pa($l, e);
    }
    function CM(e, n) {
      var l = e.memoizedState;
      return l !== null ? l.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Uy(e) {
      for (var n = e; n !== null; ) {
        if (n.tag === H) {
          var l = n.memoizedState;
          if (l !== null) {
            var o = l.dehydrated;
            if (o === null || B3(o) || Z1(o))
              return n;
          }
        } else if (n.tag === J && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        n.memoizedProps.revealOrder !== void 0) {
          var c = (n.flags & Dt) !== At;
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
    ), Gr = (
      /*    */
      4
    ), Sa = (
      /*   */
      8
    ), Ng = [];
    function Ug() {
      for (var e = 0; e < Ng.length; e++) {
        var n = Ng[e];
        n._workInProgressVersionPrimary = null;
      }
      Ng.length = 0;
    }
    function TM(e, n) {
      var l = n._getVersion, o = l(n._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [n, o] : e.mutableSourceEagerHydrationData.push(n, o);
    }
    var vt = s.ReactCurrentDispatcher, zv = s.ReactCurrentBatchConfig, jg, kd;
    jg = /* @__PURE__ */ new Set();
    var Ic = Ue, Nn = null, Qr = null, Br = null, jy = !1, Lv = !1, Nv = 0, RM = 0, MM = 25, De = null, fl = null, Eu = -1, Fg = !1;
    function Dn() {
      {
        var e = De;
        fl === null ? fl = [e] : fl.push(e);
      }
    }
    function rt() {
      {
        var e = De;
        fl !== null && (Eu++, fl[Eu] !== e && _M(e));
      }
    }
    function Dd(e) {
      e != null && !rn(e) && v("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", De, typeof e);
    }
    function _M(e) {
      {
        var n = Qt(Nn);
        if (!jg.has(n) && (jg.add(n), fl !== null)) {
          for (var l = "", o = 30, c = 0; c <= Eu; c++) {
            for (var h = fl[c], S = c === Eu ? e : h, T = c + 1 + ". " + h; T.length < o; )
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
    function Pg(e, n) {
      if (Fg)
        return !1;
      if (n === null)
        return v("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", De), !1;
      e.length !== n.length && v(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, De, "[" + n.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var l = 0; l < n.length && l < e.length; l++)
        if (!Ve(e[l], n[l]))
          return !1;
      return !0;
    }
    function Od(e, n, l, o, c, h) {
      Ic = h, Nn = n, fl = e !== null ? e._debugHookTypes : null, Eu = -1, Fg = e !== null && e.type !== n.type, n.memoizedState = null, n.updateQueue = null, n.lanes = Ue, e !== null && e.memoizedState !== null ? vt.current = ex : fl !== null ? vt.current = JE : vt.current = ZE;
      var S = l(o, c);
      if (Lv) {
        var T = 0;
        do {
          if (Lv = !1, Nv = 0, T >= MM)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          T += 1, Fg = !1, Qr = null, Br = null, n.updateQueue = null, Eu = -1, vt.current = tx, S = l(o, c);
        } while (Lv);
      }
      vt.current = Xy, n._debugHookTypes = fl;
      var M = Qr !== null && Qr.next !== null;
      if (Ic = Ue, Nn = null, Qr = null, Br = null, De = null, fl = null, Eu = -1, e !== null && (e.flags & yr) !== (n.flags & yr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & ln) !== zt && v("Internal React error: Expected static flag was missing. Please notify the React team."), jy = !1, M)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return S;
    }
    function Ad() {
      var e = Nv !== 0;
      return Nv = 0, e;
    }
    function zE(e, n, l) {
      n.updateQueue = e.updateQueue, (n.mode & Tn) !== zt ? n.flags &= -50333701 : n.flags &= -2053, e.lanes = hc(e.lanes, l);
    }
    function LE() {
      if (vt.current = Xy, jy) {
        for (var e = Nn.memoizedState; e !== null; ) {
          var n = e.queue;
          n !== null && (n.pending = null), e = e.next;
        }
        jy = !1;
      }
      Ic = Ue, Nn = null, Qr = null, Br = null, fl = null, Eu = -1, De = null, GE = !1, Lv = !1, Nv = 0;
    }
    function _o() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Br === null ? Nn.memoizedState = Br = e : Br = Br.next = e, Br;
    }
    function dl() {
      var e;
      if (Qr === null) {
        var n = Nn.alternate;
        n !== null ? e = n.memoizedState : e = null;
      } else
        e = Qr.next;
      var l;
      if (Br === null ? l = Nn.memoizedState : l = Br.next, l !== null)
        Br = l, l = Br.next, Qr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        Qr = e;
        var o = {
          memoizedState: Qr.memoizedState,
          baseState: Qr.baseState,
          baseQueue: Qr.baseQueue,
          queue: Qr.queue,
          next: null
        };
        Br === null ? Nn.memoizedState = Br = o : Br = Br.next = o;
      }
      return Br;
    }
    function NE() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function $g(e, n) {
      return typeof n == "function" ? n(e) : n;
    }
    function Hg(e, n, l) {
      var o = _o(), c;
      l !== void 0 ? c = l(n) : c = n, o.memoizedState = o.baseState = c;
      var h = {
        pending: null,
        interleaved: null,
        lanes: Ue,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      };
      o.queue = h;
      var S = h.dispatch = AM.bind(null, Nn, h);
      return [o.memoizedState, S];
    }
    function Vg(e, n, l) {
      var o = dl(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var h = Qr, S = h.baseQueue, T = c.pending;
      if (T !== null) {
        if (S !== null) {
          var M = S.next, L = T.next;
          S.next = L, T.next = M;
        }
        h.baseQueue !== S && v("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), h.baseQueue = S = T, c.pending = null;
      }
      if (S !== null) {
        var j = S.next, re = h.baseState, te = null, he = null, ge = null, Te = j;
        do {
          var st = Te.lane;
          if (cs(Ic, st)) {
            if (ge !== null) {
              var _t = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: wn,
                action: Te.action,
                hasEagerState: Te.hasEagerState,
                eagerState: Te.eagerState,
                next: null
              };
              ge = ge.next = _t;
            }
            if (Te.hasEagerState)
              re = Te.eagerState;
            else {
              var mn = Te.action;
              re = e(re, mn);
            }
          } else {
            var Nt = {
              lane: st,
              action: Te.action,
              hasEagerState: Te.hasEagerState,
              eagerState: Te.eagerState,
              next: null
            };
            ge === null ? (he = ge = Nt, te = re) : ge = ge.next = Nt, Nn.lanes = en(Nn.lanes, st), nh(st);
          }
          Te = Te.next;
        } while (Te !== null && Te !== j);
        ge === null ? te = re : ge.next = he, Ve(re, o.memoizedState) || qv(), o.memoizedState = re, o.baseState = te, o.baseQueue = ge, c.lastRenderedState = re;
      }
      var fn = c.interleaved;
      if (fn !== null) {
        var ce = fn;
        do {
          var Re = ce.lane;
          Nn.lanes = en(Nn.lanes, Re), nh(Re), ce = ce.next;
        } while (ce !== fn);
      } else S === null && (c.lanes = Ue);
      var fe = c.dispatch;
      return [o.memoizedState, fe];
    }
    function Ig(e, n, l) {
      var o = dl(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var h = c.dispatch, S = c.pending, T = o.memoizedState;
      if (S !== null) {
        c.pending = null;
        var M = S.next, L = M;
        do {
          var j = L.action;
          T = e(T, j), L = L.next;
        } while (L !== M);
        Ve(T, o.memoizedState) || qv(), o.memoizedState = T, o.baseQueue === null && (o.baseState = T), c.lastRenderedState = T;
      }
      return [T, h];
    }
    function oN(e, n, l) {
    }
    function sN(e, n, l) {
    }
    function qg(e, n, l) {
      var o = Nn, c = _o(), h, S = ga();
      if (S) {
        if (l === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        h = l(), kd || h !== l() && (v("The result of getServerSnapshot should be cached to avoid an infinite loop"), kd = !0);
      } else {
        if (h = n(), !kd) {
          var T = n();
          Ve(h, T) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), kd = !0);
        }
        var M = h0();
        if (M === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Bf(M, Ic) || UE(o, n, h);
      }
      c.memoizedState = h;
      var L = {
        value: h,
        getSnapshot: n
      };
      return c.queue = L, Vy(FE.bind(null, o, L, e), [e]), o.flags |= ka, Uv(Wr | Sa, jE.bind(null, o, L, h, n), void 0, null), h;
    }
    function Fy(e, n, l) {
      var o = Nn, c = dl(), h = n();
      if (!kd) {
        var S = n();
        Ve(h, S) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), kd = !0);
      }
      var T = c.memoizedState, M = !Ve(T, h);
      M && (c.memoizedState = h, qv());
      var L = c.queue;
      if (Fv(FE.bind(null, o, L, e), [e]), L.getSnapshot !== n || M || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      Br !== null && Br.memoizedState.tag & Wr) {
        o.flags |= ka, Uv(Wr | Sa, jE.bind(null, o, L, h, n), void 0, null);
        var j = h0();
        if (j === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Bf(j, Ic) || UE(o, n, h);
      }
      return h;
    }
    function UE(e, n, l) {
      e.flags |= Ks;
      var o = {
        getSnapshot: n,
        value: l
      }, c = Nn.updateQueue;
      if (c === null)
        c = NE(), Nn.updateQueue = c, c.stores = [o];
      else {
        var h = c.stores;
        h === null ? c.stores = [o] : h.push(o);
      }
    }
    function jE(e, n, l, o) {
      n.value = l, n.getSnapshot = o, PE(n) && $E(e);
    }
    function FE(e, n, l) {
      var o = function() {
        PE(n) && $E(e);
      };
      return l(o);
    }
    function PE(e) {
      var n = e.getSnapshot, l = e.value;
      try {
        var o = n();
        return !Ve(l, o);
      } catch {
        return !0;
      }
    }
    function $E(e) {
      var n = Si(e, Vt);
      n !== null && Jr(n, e, Vt, jn);
    }
    function Py(e) {
      var n = _o();
      typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e;
      var l = {
        pending: null,
        interleaved: null,
        lanes: Ue,
        dispatch: null,
        lastRenderedReducer: $g,
        lastRenderedState: e
      };
      n.queue = l;
      var o = l.dispatch = zM.bind(null, Nn, l);
      return [n.memoizedState, o];
    }
    function Yg(e) {
      return Vg($g);
    }
    function Wg(e) {
      return Ig($g);
    }
    function Uv(e, n, l, o) {
      var c = {
        tag: e,
        create: n,
        destroy: l,
        deps: o,
        // Circular
        next: null
      }, h = Nn.updateQueue;
      if (h === null)
        h = NE(), Nn.updateQueue = h, h.lastEffect = c.next = c;
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
    function Gg(e) {
      var n = _o();
      {
        var l = {
          current: e
        };
        return n.memoizedState = l, l;
      }
    }
    function $y(e) {
      var n = dl();
      return n.memoizedState;
    }
    function jv(e, n, l, o) {
      var c = _o(), h = o === void 0 ? null : o;
      Nn.flags |= e, c.memoizedState = Uv(Wr | n, l, void 0, h);
    }
    function Hy(e, n, l, o) {
      var c = dl(), h = o === void 0 ? null : o, S = void 0;
      if (Qr !== null) {
        var T = Qr.memoizedState;
        if (S = T.destroy, h !== null) {
          var M = T.deps;
          if (Pg(h, M)) {
            c.memoizedState = Uv(n, l, S, h);
            return;
          }
        }
      }
      Nn.flags |= e, c.memoizedState = Uv(Wr | n, l, S, h);
    }
    function Vy(e, n) {
      return (Nn.mode & Tn) !== zt ? jv(Ji | ka | wf, Sa, e, n) : jv(ka | wf, Sa, e, n);
    }
    function Fv(e, n) {
      return Hy(ka, Sa, e, n);
    }
    function Qg(e, n) {
      return jv(pn, Mo, e, n);
    }
    function Iy(e, n) {
      return Hy(pn, Mo, e, n);
    }
    function Bg(e, n) {
      var l = pn;
      return l |= _l, (Nn.mode & Tn) !== zt && (l |= so), jv(l, Gr, e, n);
    }
    function qy(e, n) {
      return Hy(pn, Gr, e, n);
    }
    function HE(e, n) {
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
    function Xg(e, n, l) {
      typeof n != "function" && v("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", n !== null ? typeof n : "null");
      var o = l != null ? l.concat([e]) : null, c = pn;
      return c |= _l, (Nn.mode & Tn) !== zt && (c |= so), jv(c, Gr, HE.bind(null, n, e), o);
    }
    function Yy(e, n, l) {
      typeof n != "function" && v("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", n !== null ? typeof n : "null");
      var o = l != null ? l.concat([e]) : null;
      return Hy(pn, Gr, HE.bind(null, n, e), o);
    }
    function kM(e, n) {
    }
    var Wy = kM;
    function Kg(e, n) {
      var l = _o(), o = n === void 0 ? null : n;
      return l.memoizedState = [e, o], e;
    }
    function Gy(e, n) {
      var l = dl(), o = n === void 0 ? null : n, c = l.memoizedState;
      if (c !== null && o !== null) {
        var h = c[1];
        if (Pg(o, h))
          return c[0];
      }
      return l.memoizedState = [e, o], e;
    }
    function Zg(e, n) {
      var l = _o(), o = n === void 0 ? null : n, c = e();
      return l.memoizedState = [c, o], c;
    }
    function Qy(e, n) {
      var l = dl(), o = n === void 0 ? null : n, c = l.memoizedState;
      if (c !== null && o !== null) {
        var h = c[1];
        if (Pg(o, h))
          return c[0];
      }
      var S = e();
      return l.memoizedState = [S, o], S;
    }
    function Jg(e) {
      var n = _o();
      return n.memoizedState = e, e;
    }
    function VE(e) {
      var n = dl(), l = Qr, o = l.memoizedState;
      return qE(n, o, e);
    }
    function IE(e) {
      var n = dl();
      if (Qr === null)
        return n.memoizedState = e, e;
      var l = Qr.memoizedState;
      return qE(n, l, e);
    }
    function qE(e, n, l) {
      var o = !$p(Ic);
      if (o) {
        if (!Ve(l, n)) {
          var c = Ip();
          Nn.lanes = en(Nn.lanes, c), nh(c), e.baseState = !0;
        }
        return n;
      } else
        return e.baseState && (e.baseState = !1, qv()), e.memoizedState = l, l;
    }
    function DM(e, n, l) {
      var o = mi();
      Er(Tm(o, rl)), e(!0);
      var c = zv.transition;
      zv.transition = {};
      var h = zv.transition;
      zv.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), n();
      } finally {
        if (Er(o), zv.transition = c, c === null && h._updatedFibers) {
          var S = h._updatedFibers.size;
          S > 10 && m("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), h._updatedFibers.clear();
        }
      }
    }
    function eS() {
      var e = Py(!1), n = e[0], l = e[1], o = DM.bind(null, l), c = _o();
      return c.memoizedState = o, [n, o];
    }
    function YE() {
      var e = Yg(), n = e[0], l = dl(), o = l.memoizedState;
      return [n, o];
    }
    function WE() {
      var e = Wg(), n = e[0], l = dl(), o = l.memoizedState;
      return [n, o];
    }
    var GE = !1;
    function OM() {
      return GE;
    }
    function tS() {
      var e = _o(), n = h0(), l = n.identifierPrefix, o;
      if (ga()) {
        var c = QR();
        o = ":" + l + "R" + c;
        var h = Nv++;
        h > 0 && (o += "H" + h.toString(32)), o += ":";
      } else {
        var S = RM++;
        o = ":" + l + "r" + S.toString(32) + ":";
      }
      return e.memoizedState = o, o;
    }
    function By() {
      var e = dl(), n = e.memoizedState;
      return n;
    }
    function AM(e, n, l) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = Tu(e), c = {
        lane: o,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (QE(e))
        BE(n, c);
      else {
        var h = bE(e, n, c, o);
        if (h !== null) {
          var S = ei();
          Jr(h, e, o, S), XE(h, n, o);
        }
      }
      KE(e, o);
    }
    function zM(e, n, l) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = Tu(e), c = {
        lane: o,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (QE(e))
        BE(n, c);
      else {
        var h = e.alternate;
        if (e.lanes === Ue && (h === null || h.lanes === Ue)) {
          var S = n.lastRenderedReducer;
          if (S !== null) {
            var T;
            T = vt.current, vt.current = Hl;
            try {
              var M = n.lastRenderedState, L = S(M, l);
              if (c.hasEagerState = !0, c.eagerState = L, Ve(L, M)) {
                yM(e, n, c, o);
                return;
              }
            } catch {
            } finally {
              vt.current = T;
            }
          }
        }
        var j = bE(e, n, c, o);
        if (j !== null) {
          var re = ei();
          Jr(j, e, o, re), XE(j, n, o);
        }
      }
      KE(e, o);
    }
    function QE(e) {
      var n = e.alternate;
      return e === Nn || n !== null && n === Nn;
    }
    function BE(e, n) {
      Lv = jy = !0;
      var l = e.pending;
      l === null ? n.next = n : (n.next = l.next, l.next = n), e.pending = n;
    }
    function XE(e, n, l) {
      if (Vp(l)) {
        var o = n.lanes;
        o = qp(o, e.pendingLanes);
        var c = en(o, l);
        n.lanes = c, Kf(e, c);
      }
    }
    function KE(e, n, l) {
      ic(e, n);
    }
    var Xy = {
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
    }, ZE = null, JE = null, ex = null, tx = null, ko = null, Hl = null, Ky = null;
    {
      var nS = function() {
        v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, Xt = function() {
        v("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      ZE = {
        readContext: function(e) {
          return Fr(e);
        },
        useCallback: function(e, n) {
          return De = "useCallback", Dn(), Dd(n), Kg(e, n);
        },
        useContext: function(e) {
          return De = "useContext", Dn(), Fr(e);
        },
        useEffect: function(e, n) {
          return De = "useEffect", Dn(), Dd(n), Vy(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return De = "useImperativeHandle", Dn(), Dd(l), Xg(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return De = "useInsertionEffect", Dn(), Dd(n), Qg(e, n);
        },
        useLayoutEffect: function(e, n) {
          return De = "useLayoutEffect", Dn(), Dd(n), Bg(e, n);
        },
        useMemo: function(e, n) {
          De = "useMemo", Dn(), Dd(n);
          var l = vt.current;
          vt.current = ko;
          try {
            return Zg(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          De = "useReducer", Dn();
          var o = vt.current;
          vt.current = ko;
          try {
            return Hg(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return De = "useRef", Dn(), Gg(e);
        },
        useState: function(e) {
          De = "useState", Dn();
          var n = vt.current;
          vt.current = ko;
          try {
            return Py(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return De = "useDebugValue", Dn(), void 0;
        },
        useDeferredValue: function(e) {
          return De = "useDeferredValue", Dn(), Jg(e);
        },
        useTransition: function() {
          return De = "useTransition", Dn(), eS();
        },
        useMutableSource: function(e, n, l) {
          return De = "useMutableSource", Dn(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return De = "useSyncExternalStore", Dn(), qg(e, n, l);
        },
        useId: function() {
          return De = "useId", Dn(), tS();
        },
        unstable_isNewReconciler: ie
      }, JE = {
        readContext: function(e) {
          return Fr(e);
        },
        useCallback: function(e, n) {
          return De = "useCallback", rt(), Kg(e, n);
        },
        useContext: function(e) {
          return De = "useContext", rt(), Fr(e);
        },
        useEffect: function(e, n) {
          return De = "useEffect", rt(), Vy(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return De = "useImperativeHandle", rt(), Xg(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return De = "useInsertionEffect", rt(), Qg(e, n);
        },
        useLayoutEffect: function(e, n) {
          return De = "useLayoutEffect", rt(), Bg(e, n);
        },
        useMemo: function(e, n) {
          De = "useMemo", rt();
          var l = vt.current;
          vt.current = ko;
          try {
            return Zg(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          De = "useReducer", rt();
          var o = vt.current;
          vt.current = ko;
          try {
            return Hg(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return De = "useRef", rt(), Gg(e);
        },
        useState: function(e) {
          De = "useState", rt();
          var n = vt.current;
          vt.current = ko;
          try {
            return Py(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return De = "useDebugValue", rt(), void 0;
        },
        useDeferredValue: function(e) {
          return De = "useDeferredValue", rt(), Jg(e);
        },
        useTransition: function() {
          return De = "useTransition", rt(), eS();
        },
        useMutableSource: function(e, n, l) {
          return De = "useMutableSource", rt(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return De = "useSyncExternalStore", rt(), qg(e, n, l);
        },
        useId: function() {
          return De = "useId", rt(), tS();
        },
        unstable_isNewReconciler: ie
      }, ex = {
        readContext: function(e) {
          return Fr(e);
        },
        useCallback: function(e, n) {
          return De = "useCallback", rt(), Gy(e, n);
        },
        useContext: function(e) {
          return De = "useContext", rt(), Fr(e);
        },
        useEffect: function(e, n) {
          return De = "useEffect", rt(), Fv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return De = "useImperativeHandle", rt(), Yy(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return De = "useInsertionEffect", rt(), Iy(e, n);
        },
        useLayoutEffect: function(e, n) {
          return De = "useLayoutEffect", rt(), qy(e, n);
        },
        useMemo: function(e, n) {
          De = "useMemo", rt();
          var l = vt.current;
          vt.current = Hl;
          try {
            return Qy(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          De = "useReducer", rt();
          var o = vt.current;
          vt.current = Hl;
          try {
            return Vg(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return De = "useRef", rt(), $y();
        },
        useState: function(e) {
          De = "useState", rt();
          var n = vt.current;
          vt.current = Hl;
          try {
            return Yg(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return De = "useDebugValue", rt(), Wy();
        },
        useDeferredValue: function(e) {
          return De = "useDeferredValue", rt(), VE(e);
        },
        useTransition: function() {
          return De = "useTransition", rt(), YE();
        },
        useMutableSource: function(e, n, l) {
          return De = "useMutableSource", rt(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return De = "useSyncExternalStore", rt(), Fy(e, n);
        },
        useId: function() {
          return De = "useId", rt(), By();
        },
        unstable_isNewReconciler: ie
      }, tx = {
        readContext: function(e) {
          return Fr(e);
        },
        useCallback: function(e, n) {
          return De = "useCallback", rt(), Gy(e, n);
        },
        useContext: function(e) {
          return De = "useContext", rt(), Fr(e);
        },
        useEffect: function(e, n) {
          return De = "useEffect", rt(), Fv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return De = "useImperativeHandle", rt(), Yy(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return De = "useInsertionEffect", rt(), Iy(e, n);
        },
        useLayoutEffect: function(e, n) {
          return De = "useLayoutEffect", rt(), qy(e, n);
        },
        useMemo: function(e, n) {
          De = "useMemo", rt();
          var l = vt.current;
          vt.current = Ky;
          try {
            return Qy(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          De = "useReducer", rt();
          var o = vt.current;
          vt.current = Ky;
          try {
            return Ig(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return De = "useRef", rt(), $y();
        },
        useState: function(e) {
          De = "useState", rt();
          var n = vt.current;
          vt.current = Ky;
          try {
            return Wg(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return De = "useDebugValue", rt(), Wy();
        },
        useDeferredValue: function(e) {
          return De = "useDeferredValue", rt(), IE(e);
        },
        useTransition: function() {
          return De = "useTransition", rt(), WE();
        },
        useMutableSource: function(e, n, l) {
          return De = "useMutableSource", rt(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return De = "useSyncExternalStore", rt(), Fy(e, n);
        },
        useId: function() {
          return De = "useId", rt(), By();
        },
        unstable_isNewReconciler: ie
      }, ko = {
        readContext: function(e) {
          return nS(), Fr(e);
        },
        useCallback: function(e, n) {
          return De = "useCallback", Xt(), Dn(), Kg(e, n);
        },
        useContext: function(e) {
          return De = "useContext", Xt(), Dn(), Fr(e);
        },
        useEffect: function(e, n) {
          return De = "useEffect", Xt(), Dn(), Vy(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return De = "useImperativeHandle", Xt(), Dn(), Xg(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return De = "useInsertionEffect", Xt(), Dn(), Qg(e, n);
        },
        useLayoutEffect: function(e, n) {
          return De = "useLayoutEffect", Xt(), Dn(), Bg(e, n);
        },
        useMemo: function(e, n) {
          De = "useMemo", Xt(), Dn();
          var l = vt.current;
          vt.current = ko;
          try {
            return Zg(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          De = "useReducer", Xt(), Dn();
          var o = vt.current;
          vt.current = ko;
          try {
            return Hg(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return De = "useRef", Xt(), Dn(), Gg(e);
        },
        useState: function(e) {
          De = "useState", Xt(), Dn();
          var n = vt.current;
          vt.current = ko;
          try {
            return Py(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return De = "useDebugValue", Xt(), Dn(), void 0;
        },
        useDeferredValue: function(e) {
          return De = "useDeferredValue", Xt(), Dn(), Jg(e);
        },
        useTransition: function() {
          return De = "useTransition", Xt(), Dn(), eS();
        },
        useMutableSource: function(e, n, l) {
          return De = "useMutableSource", Xt(), Dn(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return De = "useSyncExternalStore", Xt(), Dn(), qg(e, n, l);
        },
        useId: function() {
          return De = "useId", Xt(), Dn(), tS();
        },
        unstable_isNewReconciler: ie
      }, Hl = {
        readContext: function(e) {
          return nS(), Fr(e);
        },
        useCallback: function(e, n) {
          return De = "useCallback", Xt(), rt(), Gy(e, n);
        },
        useContext: function(e) {
          return De = "useContext", Xt(), rt(), Fr(e);
        },
        useEffect: function(e, n) {
          return De = "useEffect", Xt(), rt(), Fv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return De = "useImperativeHandle", Xt(), rt(), Yy(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return De = "useInsertionEffect", Xt(), rt(), Iy(e, n);
        },
        useLayoutEffect: function(e, n) {
          return De = "useLayoutEffect", Xt(), rt(), qy(e, n);
        },
        useMemo: function(e, n) {
          De = "useMemo", Xt(), rt();
          var l = vt.current;
          vt.current = Hl;
          try {
            return Qy(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          De = "useReducer", Xt(), rt();
          var o = vt.current;
          vt.current = Hl;
          try {
            return Vg(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return De = "useRef", Xt(), rt(), $y();
        },
        useState: function(e) {
          De = "useState", Xt(), rt();
          var n = vt.current;
          vt.current = Hl;
          try {
            return Yg(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return De = "useDebugValue", Xt(), rt(), Wy();
        },
        useDeferredValue: function(e) {
          return De = "useDeferredValue", Xt(), rt(), VE(e);
        },
        useTransition: function() {
          return De = "useTransition", Xt(), rt(), YE();
        },
        useMutableSource: function(e, n, l) {
          return De = "useMutableSource", Xt(), rt(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return De = "useSyncExternalStore", Xt(), rt(), Fy(e, n);
        },
        useId: function() {
          return De = "useId", Xt(), rt(), By();
        },
        unstable_isNewReconciler: ie
      }, Ky = {
        readContext: function(e) {
          return nS(), Fr(e);
        },
        useCallback: function(e, n) {
          return De = "useCallback", Xt(), rt(), Gy(e, n);
        },
        useContext: function(e) {
          return De = "useContext", Xt(), rt(), Fr(e);
        },
        useEffect: function(e, n) {
          return De = "useEffect", Xt(), rt(), Fv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return De = "useImperativeHandle", Xt(), rt(), Yy(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return De = "useInsertionEffect", Xt(), rt(), Iy(e, n);
        },
        useLayoutEffect: function(e, n) {
          return De = "useLayoutEffect", Xt(), rt(), qy(e, n);
        },
        useMemo: function(e, n) {
          De = "useMemo", Xt(), rt();
          var l = vt.current;
          vt.current = Hl;
          try {
            return Qy(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          De = "useReducer", Xt(), rt();
          var o = vt.current;
          vt.current = Hl;
          try {
            return Ig(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return De = "useRef", Xt(), rt(), $y();
        },
        useState: function(e) {
          De = "useState", Xt(), rt();
          var n = vt.current;
          vt.current = Hl;
          try {
            return Wg(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return De = "useDebugValue", Xt(), rt(), Wy();
        },
        useDeferredValue: function(e) {
          return De = "useDeferredValue", Xt(), rt(), IE(e);
        },
        useTransition: function() {
          return De = "useTransition", Xt(), rt(), WE();
        },
        useMutableSource: function(e, n, l) {
          return De = "useMutableSource", Xt(), rt(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return De = "useSyncExternalStore", Xt(), rt(), Fy(e, n);
        },
        useId: function() {
          return De = "useId", Xt(), rt(), By();
        },
        unstable_isNewReconciler: ie
      };
    }
    var xu = a.unstable_now, nx = 0, Zy = -1, Pv = -1, Jy = -1, rS = !1, e0 = !1;
    function rx() {
      return rS;
    }
    function LM() {
      e0 = !0;
    }
    function NM() {
      rS = !1, e0 = !1;
    }
    function UM() {
      rS = e0, e0 = !1;
    }
    function ax() {
      return nx;
    }
    function ix() {
      nx = xu();
    }
    function aS(e) {
      Pv = xu(), e.actualStartTime < 0 && (e.actualStartTime = xu());
    }
    function lx(e) {
      Pv = -1;
    }
    function t0(e, n) {
      if (Pv >= 0) {
        var l = xu() - Pv;
        e.actualDuration += l, n && (e.selfBaseDuration = l), Pv = -1;
      }
    }
    function Do(e) {
      if (Zy >= 0) {
        var n = xu() - Zy;
        Zy = -1;
        for (var l = e.return; l !== null; ) {
          switch (l.tag) {
            case C:
              var o = l.stateNode;
              o.effectDuration += n;
              return;
            case N:
              var c = l.stateNode;
              c.effectDuration += n;
              return;
          }
          l = l.return;
        }
      }
    }
    function iS(e) {
      if (Jy >= 0) {
        var n = xu() - Jy;
        Jy = -1;
        for (var l = e.return; l !== null; ) {
          switch (l.tag) {
            case C:
              var o = l.stateNode;
              o !== null && (o.passiveEffectDuration += n);
              return;
            case N:
              var c = l.stateNode;
              c !== null && (c.passiveEffectDuration += n);
              return;
          }
          l = l.return;
        }
      }
    }
    function Oo() {
      Zy = xu();
    }
    function lS() {
      Jy = xu();
    }
    function oS(e) {
      for (var n = e.child; n; )
        e.actualDuration += n.actualDuration, n = n.sibling;
    }
    function Vl(e, n) {
      if (e && e.defaultProps) {
        var l = Bt({}, n), o = e.defaultProps;
        for (var c in o)
          l[c] === void 0 && (l[c] = o[c]);
        return l;
      }
      return n;
    }
    var sS = {}, uS, cS, fS, dS, pS, ox, n0, vS, hS, mS, $v;
    {
      uS = /* @__PURE__ */ new Set(), cS = /* @__PURE__ */ new Set(), fS = /* @__PURE__ */ new Set(), dS = /* @__PURE__ */ new Set(), vS = /* @__PURE__ */ new Set(), pS = /* @__PURE__ */ new Set(), hS = /* @__PURE__ */ new Set(), mS = /* @__PURE__ */ new Set(), $v = /* @__PURE__ */ new Set();
      var sx = /* @__PURE__ */ new Set();
      n0 = function(e, n) {
        if (!(e === null || typeof e == "function")) {
          var l = n + "_" + e;
          sx.has(l) || (sx.add(l), v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", n, e));
        }
      }, ox = function(e, n) {
        if (n === void 0) {
          var l = Sn(e) || "Component";
          pS.has(l) || (pS.add(l), v("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", l));
        }
      }, Object.defineProperty(sS, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(sS);
    }
    function yS(e, n, l, o) {
      var c = e.memoizedState, h = l(o, c);
      {
        if (e.mode & Ln) {
          tr(!0);
          try {
            h = l(o, c);
          } finally {
            tr(!1);
          }
        }
        ox(n, h);
      }
      var S = h == null ? c : Bt({}, c, h);
      if (e.memoizedState = S, e.lanes === Ue) {
        var T = e.updateQueue;
        T.baseState = S;
      }
    }
    var gS = {
      isMounted: um,
      enqueueSetState: function(e, n, l) {
        var o = Xs(e), c = ei(), h = Tu(o), S = ws(c, h);
        S.payload = n, l != null && (n0(l, "setState"), S.callback = l);
        var T = yu(o, S, h);
        T !== null && (Jr(T, o, h, c), Oy(T, o, h)), ic(o, h);
      },
      enqueueReplaceState: function(e, n, l) {
        var o = Xs(e), c = ei(), h = Tu(o), S = ws(c, h);
        S.tag = TE, S.payload = n, l != null && (n0(l, "replaceState"), S.callback = l);
        var T = yu(o, S, h);
        T !== null && (Jr(T, o, h, c), Oy(T, o, h)), ic(o, h);
      },
      enqueueForceUpdate: function(e, n) {
        var l = Xs(e), o = ei(), c = Tu(l), h = ws(o, c);
        h.tag = _y, n != null && (n0(n, "forceUpdate"), h.callback = n);
        var S = yu(l, h, c);
        S !== null && (Jr(S, l, c, o), Oy(S, l, c)), kf(l, c);
      }
    };
    function ux(e, n, l, o, c, h, S) {
      var T = e.stateNode;
      if (typeof T.shouldComponentUpdate == "function") {
        var M = T.shouldComponentUpdate(o, h, S);
        {
          if (e.mode & Ln) {
            tr(!0);
            try {
              M = T.shouldComponentUpdate(o, h, S);
            } finally {
              tr(!1);
            }
          }
          M === void 0 && v("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Sn(n) || "Component");
        }
        return M;
      }
      return n.prototype && n.prototype.isPureReactComponent ? !wt(l, o) || !wt(c, h) : !0;
    }
    function jM(e, n, l) {
      var o = e.stateNode;
      {
        var c = Sn(n) || "Component", h = o.render;
        h || (n.prototype && typeof n.prototype.render == "function" ? v("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", c) : v("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", c)), o.getInitialState && !o.getInitialState.isReactClassApproved && !o.state && v("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", c), o.getDefaultProps && !o.getDefaultProps.isReactClassApproved && v("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", c), o.propTypes && v("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", c), o.contextType && v("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", c), n.childContextTypes && !$v.has(n) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Ln) === zt && ($v.add(n), v(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), n.contextTypes && !$v.has(n) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Ln) === zt && ($v.add(n), v(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), o.contextTypes && v("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", c), n.contextType && n.contextTypes && !hS.has(n) && (hS.add(n), v("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", c)), typeof o.componentShouldUpdate == "function" && v("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", c), n.prototype && n.prototype.isPureReactComponent && typeof o.shouldComponentUpdate < "u" && v("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Sn(n) || "A pure component"), typeof o.componentDidUnmount == "function" && v("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", c), typeof o.componentDidReceiveProps == "function" && v("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", c), typeof o.componentWillRecieveProps == "function" && v("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", c), typeof o.UNSAFE_componentWillRecieveProps == "function" && v("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", c);
        var S = o.props !== l;
        o.props !== void 0 && S && v("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", c, c), o.defaultProps && v("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", c, c), typeof o.getSnapshotBeforeUpdate == "function" && typeof o.componentDidUpdate != "function" && !fS.has(n) && (fS.add(n), v("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Sn(n))), typeof o.getDerivedStateFromProps == "function" && v("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof o.getDerivedStateFromError == "function" && v("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof n.getSnapshotBeforeUpdate == "function" && v("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", c);
        var T = o.state;
        T && (typeof T != "object" || rn(T)) && v("%s.state: must be set to an object or null", c), typeof o.getChildContext == "function" && typeof n.childContextTypes != "object" && v("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", c);
      }
    }
    function cx(e, n) {
      n.updater = gS, e.stateNode = n, Xo(n, e), n._reactInternalInstance = sS;
    }
    function fx(e, n, l) {
      var o = !1, c = Pi, h = Pi, S = n.contextType;
      if ("contextType" in n) {
        var T = (
          // Allow null for conditional declaration
          S === null || S !== void 0 && S.$$typeof === Q && S._context === void 0
        );
        if (!T && !mS.has(n)) {
          mS.add(n);
          var M = "";
          S === void 0 ? M = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof S != "object" ? M = " However, it is set to a " + typeof S + "." : S.$$typeof === zr ? M = " Did you accidentally pass the Context.Provider instead?" : S._context !== void 0 ? M = " Did you accidentally pass the Context.Consumer instead?" : M = " However, it is set to an object with keys {" + Object.keys(S).join(", ") + "}.", v("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Sn(n) || "Component", M);
        }
      }
      if (typeof S == "object" && S !== null)
        h = Fr(S);
      else {
        c = gd(e, n, !0);
        var L = n.contextTypes;
        o = L != null, h = o ? Sd(e, c) : Pi;
      }
      var j = new n(l, h);
      if (e.mode & Ln) {
        tr(!0);
        try {
          j = new n(l, h);
        } finally {
          tr(!1);
        }
      }
      var re = e.memoizedState = j.state !== null && j.state !== void 0 ? j.state : null;
      cx(e, j);
      {
        if (typeof n.getDerivedStateFromProps == "function" && re === null) {
          var te = Sn(n) || "Component";
          cS.has(te) || (cS.add(te), v("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", te, j.state === null ? "null" : "undefined", te));
        }
        if (typeof n.getDerivedStateFromProps == "function" || typeof j.getSnapshotBeforeUpdate == "function") {
          var he = null, ge = null, Te = null;
          if (typeof j.componentWillMount == "function" && j.componentWillMount.__suppressDeprecationWarning !== !0 ? he = "componentWillMount" : typeof j.UNSAFE_componentWillMount == "function" && (he = "UNSAFE_componentWillMount"), typeof j.componentWillReceiveProps == "function" && j.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? ge = "componentWillReceiveProps" : typeof j.UNSAFE_componentWillReceiveProps == "function" && (ge = "UNSAFE_componentWillReceiveProps"), typeof j.componentWillUpdate == "function" && j.componentWillUpdate.__suppressDeprecationWarning !== !0 ? Te = "componentWillUpdate" : typeof j.UNSAFE_componentWillUpdate == "function" && (Te = "UNSAFE_componentWillUpdate"), he !== null || ge !== null || Te !== null) {
            var st = Sn(n) || "Component", Nt = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            dS.has(st) || (dS.add(st), v(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, st, Nt, he !== null ? `
  ` + he : "", ge !== null ? `
  ` + ge : "", Te !== null ? `
  ` + Te : ""));
          }
        }
      }
      return o && eE(e, c, h), j;
    }
    function FM(e, n) {
      var l = n.state;
      typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), l !== n.state && (v("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Qt(e) || "Component"), gS.enqueueReplaceState(n, n.state, null));
    }
    function dx(e, n, l, o) {
      var c = n.state;
      if (typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(l, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(l, o), n.state !== c) {
        {
          var h = Qt(e) || "Component";
          uS.has(h) || (uS.add(h), v("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", h));
        }
        gS.enqueueReplaceState(n, n.state, null);
      }
    }
    function SS(e, n, l, o) {
      jM(e, n, l);
      var c = e.stateNode;
      c.props = l, c.state = e.memoizedState, c.refs = {}, _g(e);
      var h = n.contextType;
      if (typeof h == "object" && h !== null)
        c.context = Fr(h);
      else {
        var S = gd(e, n, !0);
        c.context = Sd(e, S);
      }
      {
        if (c.state === l) {
          var T = Sn(n) || "Component";
          vS.has(T) || (vS.add(T), v("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", T));
        }
        e.mode & Ln && Pl.recordLegacyContextWarning(e, c), Pl.recordUnsafeLifecycleWarnings(e, c);
      }
      c.state = e.memoizedState;
      var M = n.getDerivedStateFromProps;
      if (typeof M == "function" && (yS(e, n, M, l), c.state = e.memoizedState), typeof n.getDerivedStateFromProps != "function" && typeof c.getSnapshotBeforeUpdate != "function" && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (FM(e, c), Ay(e, l, c, o), c.state = e.memoizedState), typeof c.componentDidMount == "function") {
        var L = pn;
        L |= _l, (e.mode & Tn) !== zt && (L |= so), e.flags |= L;
      }
    }
    function PM(e, n, l, o) {
      var c = e.stateNode, h = e.memoizedProps;
      c.props = h;
      var S = c.context, T = n.contextType, M = Pi;
      if (typeof T == "object" && T !== null)
        M = Fr(T);
      else {
        var L = gd(e, n, !0);
        M = Sd(e, L);
      }
      var j = n.getDerivedStateFromProps, re = typeof j == "function" || typeof c.getSnapshotBeforeUpdate == "function";
      !re && (typeof c.UNSAFE_componentWillReceiveProps == "function" || typeof c.componentWillReceiveProps == "function") && (h !== l || S !== M) && dx(e, c, l, M), ME();
      var te = e.memoizedState, he = c.state = te;
      if (Ay(e, l, c, o), he = e.memoizedState, h === l && te === he && !py() && !zy()) {
        if (typeof c.componentDidMount == "function") {
          var ge = pn;
          ge |= _l, (e.mode & Tn) !== zt && (ge |= so), e.flags |= ge;
        }
        return !1;
      }
      typeof j == "function" && (yS(e, n, j, l), he = e.memoizedState);
      var Te = zy() || ux(e, n, h, l, te, he, M);
      if (Te) {
        if (!re && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function") {
          var st = pn;
          st |= _l, (e.mode & Tn) !== zt && (st |= so), e.flags |= st;
        }
      } else {
        if (typeof c.componentDidMount == "function") {
          var Nt = pn;
          Nt |= _l, (e.mode & Tn) !== zt && (Nt |= so), e.flags |= Nt;
        }
        e.memoizedProps = l, e.memoizedState = he;
      }
      return c.props = l, c.state = he, c.context = M, Te;
    }
    function $M(e, n, l, o, c) {
      var h = n.stateNode;
      RE(e, n);
      var S = n.memoizedProps, T = n.type === n.elementType ? S : Vl(n.type, S);
      h.props = T;
      var M = n.pendingProps, L = h.context, j = l.contextType, re = Pi;
      if (typeof j == "object" && j !== null)
        re = Fr(j);
      else {
        var te = gd(n, l, !0);
        re = Sd(n, te);
      }
      var he = l.getDerivedStateFromProps, ge = typeof he == "function" || typeof h.getSnapshotBeforeUpdate == "function";
      !ge && (typeof h.UNSAFE_componentWillReceiveProps == "function" || typeof h.componentWillReceiveProps == "function") && (S !== M || L !== re) && dx(n, h, o, re), ME();
      var Te = n.memoizedState, st = h.state = Te;
      if (Ay(n, o, h, c), st = n.memoizedState, S === M && Te === st && !py() && !zy() && !se)
        return typeof h.componentDidUpdate == "function" && (S !== e.memoizedProps || Te !== e.memoizedState) && (n.flags |= pn), typeof h.getSnapshotBeforeUpdate == "function" && (S !== e.memoizedProps || Te !== e.memoizedState) && (n.flags |= _r), !1;
      typeof he == "function" && (yS(n, l, he, o), st = n.memoizedState);
      var Nt = zy() || ux(n, l, T, o, Te, st, re) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      se;
      return Nt ? (!ge && (typeof h.UNSAFE_componentWillUpdate == "function" || typeof h.componentWillUpdate == "function") && (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, st, re), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(o, st, re)), typeof h.componentDidUpdate == "function" && (n.flags |= pn), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= _r)) : (typeof h.componentDidUpdate == "function" && (S !== e.memoizedProps || Te !== e.memoizedState) && (n.flags |= pn), typeof h.getSnapshotBeforeUpdate == "function" && (S !== e.memoizedProps || Te !== e.memoizedState) && (n.flags |= _r), n.memoizedProps = o, n.memoizedState = st), h.props = o, h.state = st, h.context = re, Nt;
    }
    function qc(e, n) {
      return {
        value: e,
        source: n,
        stack: wl(n),
        digest: null
      };
    }
    function ES(e, n, l) {
      return {
        value: e,
        source: null,
        stack: l ?? null,
        digest: n ?? null
      };
    }
    function HM(e, n) {
      return !0;
    }
    function xS(e, n) {
      try {
        var l = HM(e, n);
        if (l === !1)
          return;
        var o = n.value, c = n.source, h = n.stack, S = h !== null ? h : "";
        if (o != null && o._suppressLogging) {
          if (e.tag === x)
            return;
          console.error(o);
        }
        var T = c ? Qt(c) : null, M = T ? "The above error occurred in the <" + T + "> component:" : "The above error occurred in one of your React components:", L;
        if (e.tag === C)
          L = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var j = Qt(e) || "Anonymous";
          L = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + j + ".");
        }
        var re = M + `
` + S + `

` + ("" + L);
        console.error(re);
      } catch (te) {
        setTimeout(function() {
          throw te;
        });
      }
    }
    var VM = typeof WeakMap == "function" ? WeakMap : Map;
    function px(e, n, l) {
      var o = ws(jn, l);
      o.tag = Rg, o.payload = {
        element: null
      };
      var c = n.value;
      return o.callback = function() {
        Lk(c), xS(e, n);
      }, o;
    }
    function wS(e, n, l) {
      var o = ws(jn, l);
      o.tag = Rg;
      var c = e.type.getDerivedStateFromError;
      if (typeof c == "function") {
        var h = n.value;
        o.payload = function() {
          return c(h);
        }, o.callback = function() {
          Cw(e), xS(e, n);
        };
      }
      var S = e.stateNode;
      return S !== null && typeof S.componentDidCatch == "function" && (o.callback = function() {
        Cw(e), xS(e, n), typeof c != "function" && Ak(this);
        var M = n.value, L = n.stack;
        this.componentDidCatch(M, {
          componentStack: L !== null ? L : ""
        }), typeof c != "function" && (Na(e.lanes, Vt) || v("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Qt(e) || "Unknown"));
      }), o;
    }
    function vx(e, n, l) {
      var o = e.pingCache, c;
      if (o === null ? (o = e.pingCache = new VM(), c = /* @__PURE__ */ new Set(), o.set(n, c)) : (c = o.get(n), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(n, c))), !c.has(l)) {
        c.add(l);
        var h = Nk.bind(null, e, n, l);
        za && rh(e, l), n.then(h, h);
      }
    }
    function IM(e, n, l, o) {
      var c = e.updateQueue;
      if (c === null) {
        var h = /* @__PURE__ */ new Set();
        h.add(l), e.updateQueue = h;
      } else
        c.add(l);
    }
    function qM(e, n) {
      var l = e.tag;
      if ((e.mode & ln) === zt && (l === g || l === P || l === V)) {
        var o = e.alternate;
        o ? (e.updateQueue = o.updateQueue, e.memoizedState = o.memoizedState, e.lanes = o.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function hx(e) {
      var n = e;
      do {
        if (n.tag === H && CM(n))
          return n;
        n = n.return;
      } while (n !== null);
      return null;
    }
    function mx(e, n, l, o, c) {
      if ((e.mode & ln) === zt) {
        if (e === n)
          e.flags |= Lr;
        else {
          if (e.flags |= Dt, l.flags |= xf, l.flags &= -52805, l.tag === x) {
            var h = l.alternate;
            if (h === null)
              l.tag = B;
            else {
              var S = ws(jn, Vt);
              S.tag = _y, yu(l, S, Vt);
            }
          }
          l.lanes = en(l.lanes, Vt);
        }
        return e;
      }
      return e.flags |= Lr, e.lanes = c, e;
    }
    function YM(e, n, l, o, c) {
      if (l.flags |= Ju, za && rh(e, c), o !== null && typeof o == "object" && typeof o.then == "function") {
        var h = o;
        qM(l), ga() && l.mode & ln && oE();
        var S = hx(n);
        if (S !== null) {
          S.flags &= ~ea, mx(S, n, l, e, c), S.mode & ln && vx(e, h, c), IM(S, e, h);
          return;
        } else {
          if (!ym(c)) {
            vx(e, h, c), t2();
            return;
          }
          var T = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          o = T;
        }
      } else if (ga() && l.mode & ln) {
        oE();
        var M = hx(n);
        if (M !== null) {
          (M.flags & Lr) === At && (M.flags |= ea), mx(M, n, l, e, c), vg(qc(o, l));
          return;
        }
      }
      o = qc(o, l), Ck(o);
      var L = n;
      do {
        switch (L.tag) {
          case C: {
            var j = o;
            L.flags |= Lr;
            var re = vc(c);
            L.lanes = en(L.lanes, re);
            var te = px(L, j, re);
            kg(L, te);
            return;
          }
          case x:
            var he = o, ge = L.type, Te = L.stateNode;
            if ((L.flags & Dt) === At && (typeof ge.getDerivedStateFromError == "function" || Te !== null && typeof Te.componentDidCatch == "function" && !hw(Te))) {
              L.flags |= Lr;
              var st = vc(c);
              L.lanes = en(L.lanes, st);
              var Nt = wS(L, he, st);
              kg(L, Nt);
              return;
            }
            break;
        }
        L = L.return;
      } while (L !== null);
    }
    function WM() {
      return null;
    }
    var Hv = s.ReactCurrentOwner, Il = !1, bS, Vv, CS, TS, RS, Yc, MS, r0, Iv;
    bS = {}, Vv = {}, CS = {}, TS = {}, RS = {}, Yc = !1, MS = {}, r0 = {}, Iv = {};
    function Za(e, n, l, o) {
      e === null ? n.child = SE(n, null, l, o) : n.child = bd(n, e.child, l, o);
    }
    function GM(e, n, l, o) {
      n.child = bd(n, e.child, null, o), n.child = bd(n, null, l, o);
    }
    function yx(e, n, l, o, c) {
      if (n.type !== n.elementType) {
        var h = l.propTypes;
        h && jl(
          h,
          o,
          // Resolved props
          "prop",
          Sn(l)
        );
      }
      var S = l.render, T = n.ref, M, L;
      Td(n, c), Qa(n);
      {
        if (Hv.current = n, Mr(!0), M = Od(e, n, S, o, T, c), L = Ad(), n.mode & Ln) {
          tr(!0);
          try {
            M = Od(e, n, S, o, T, c), L = Ad();
          } finally {
            tr(!1);
          }
        }
        Mr(!1);
      }
      return Ba(), e !== null && !Il ? (zE(e, n, c), bs(e, n, c)) : (ga() && L && sg(n), n.flags |= Li, Za(e, n, M, c), n.child);
    }
    function gx(e, n, l, o, c) {
      if (e === null) {
        var h = l.type;
        if (Zk(h) && l.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        l.defaultProps === void 0) {
          var S = h;
          return S = $d(h), n.tag = V, n.type = S, DS(n, h), Sx(e, n, S, o, c);
        }
        {
          var T = h.propTypes;
          if (T && jl(
            T,
            o,
            // Resolved props
            "prop",
            Sn(h)
          ), l.defaultProps !== void 0) {
            var M = Sn(h) || "Unknown";
            Iv[M] || (v("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", M), Iv[M] = !0);
          }
        }
        var L = d2(l.type, null, o, n, n.mode, c);
        return L.ref = n.ref, L.return = n, n.child = L, L;
      }
      {
        var j = l.type, re = j.propTypes;
        re && jl(
          re,
          o,
          // Resolved props
          "prop",
          Sn(j)
        );
      }
      var te = e.child, he = US(e, c);
      if (!he) {
        var ge = te.memoizedProps, Te = l.compare;
        if (Te = Te !== null ? Te : wt, Te(ge, o) && e.ref === n.ref)
          return bs(e, n, c);
      }
      n.flags |= Li;
      var st = Xc(te, o);
      return st.ref = n.ref, st.return = n, n.child = st, st;
    }
    function Sx(e, n, l, o, c) {
      if (n.type !== n.elementType) {
        var h = n.elementType;
        if (h.$$typeof === It) {
          var S = h, T = S._payload, M = S._init;
          try {
            h = M(T);
          } catch {
            h = null;
          }
          var L = h && h.propTypes;
          L && jl(
            L,
            o,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Sn(h)
          );
        }
      }
      if (e !== null) {
        var j = e.memoizedProps;
        if (wt(j, o) && e.ref === n.ref && // Prevent bailout if the implementation changed due to hot reload.
        n.type === e.type)
          if (Il = !1, n.pendingProps = o = j, US(e, c))
            (e.flags & xf) !== At && (Il = !0);
          else return n.lanes = e.lanes, bs(e, n, c);
      }
      return _S(e, n, l, o, c);
    }
    function Ex(e, n, l) {
      var o = n.pendingProps, c = o.children, h = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden" || ve)
        if ((n.mode & ln) === zt) {
          var S = {
            baseLanes: Ue,
            cachePool: null,
            transitions: null
          };
          n.memoizedState = S, m0(n, l);
        } else if (Na(l, La)) {
          var re = {
            baseLanes: Ue,
            cachePool: null,
            transitions: null
          };
          n.memoizedState = re;
          var te = h !== null ? h.baseLanes : l;
          m0(n, te);
        } else {
          var T = null, M;
          if (h !== null) {
            var L = h.baseLanes;
            M = en(L, l);
          } else
            M = l;
          n.lanes = n.childLanes = La;
          var j = {
            baseLanes: M,
            cachePool: T,
            transitions: null
          };
          return n.memoizedState = j, n.updateQueue = null, m0(n, M), null;
        }
      else {
        var he;
        h !== null ? (he = en(h.baseLanes, l), n.memoizedState = null) : he = l, m0(n, he);
      }
      return Za(e, n, c, l), n.child;
    }
    function QM(e, n, l) {
      var o = n.pendingProps;
      return Za(e, n, o, l), n.child;
    }
    function BM(e, n, l) {
      var o = n.pendingProps.children;
      return Za(e, n, o, l), n.child;
    }
    function XM(e, n, l) {
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
    function xx(e, n) {
      var l = n.ref;
      (e === null && l !== null || e !== null && e.ref !== l) && (n.flags |= ir, n.flags |= Zs);
    }
    function _S(e, n, l, o, c) {
      if (n.type !== n.elementType) {
        var h = l.propTypes;
        h && jl(
          h,
          o,
          // Resolved props
          "prop",
          Sn(l)
        );
      }
      var S;
      {
        var T = gd(n, l, !0);
        S = Sd(n, T);
      }
      var M, L;
      Td(n, c), Qa(n);
      {
        if (Hv.current = n, Mr(!0), M = Od(e, n, l, o, S, c), L = Ad(), n.mode & Ln) {
          tr(!0);
          try {
            M = Od(e, n, l, o, S, c), L = Ad();
          } finally {
            tr(!1);
          }
        }
        Mr(!1);
      }
      return Ba(), e !== null && !Il ? (zE(e, n, c), bs(e, n, c)) : (ga() && L && sg(n), n.flags |= Li, Za(e, n, M, c), n.child);
    }
    function wx(e, n, l, o, c) {
      {
        switch (pD(n)) {
          case !1: {
            var h = n.stateNode, S = n.type, T = new S(n.memoizedProps, h.context), M = T.state;
            h.updater.enqueueSetState(h, M, null);
            break;
          }
          case !0: {
            n.flags |= Dt, n.flags |= Lr;
            var L = new Error("Simulated error coming from DevTools"), j = vc(c);
            n.lanes = en(n.lanes, j);
            var re = wS(n, qc(L, n), j);
            kg(n, re);
            break;
          }
        }
        if (n.type !== n.elementType) {
          var te = l.propTypes;
          te && jl(
            te,
            o,
            // Resolved props
            "prop",
            Sn(l)
          );
        }
      }
      var he;
      Ro(l) ? (he = !0, hy(n)) : he = !1, Td(n, c);
      var ge = n.stateNode, Te;
      ge === null ? (i0(e, n), fx(n, l, o), SS(n, l, o, c), Te = !0) : e === null ? Te = PM(n, l, o, c) : Te = $M(e, n, l, o, c);
      var st = kS(e, n, l, Te, he, c);
      {
        var Nt = n.stateNode;
        Te && Nt.props !== o && (Yc || v("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Qt(n) || "a component"), Yc = !0);
      }
      return st;
    }
    function kS(e, n, l, o, c, h) {
      xx(e, n);
      var S = (n.flags & Dt) !== At;
      if (!o && !S)
        return c && rE(n, l, !1), bs(e, n, h);
      var T = n.stateNode;
      Hv.current = n;
      var M;
      if (S && typeof l.getDerivedStateFromError != "function")
        M = null, lx();
      else {
        Qa(n);
        {
          if (Mr(!0), M = T.render(), n.mode & Ln) {
            tr(!0);
            try {
              T.render();
            } finally {
              tr(!1);
            }
          }
          Mr(!1);
        }
        Ba();
      }
      return n.flags |= Li, e !== null && S ? GM(e, n, M, h) : Za(e, n, M, h), n.memoizedState = T.state, c && rE(n, l, !0), n.child;
    }
    function bx(e) {
      var n = e.stateNode;
      n.pendingContext ? tE(e, n.pendingContext, n.pendingContext !== n.context) : n.context && tE(e, n.context, !1), Dg(e, n.containerInfo);
    }
    function KM(e, n, l) {
      if (bx(n), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var o = n.pendingProps, c = n.memoizedState, h = c.element;
      RE(e, n), Ay(n, o, null, l);
      var S = n.memoizedState;
      n.stateNode;
      var T = S.element;
      if (c.isDehydrated) {
        var M = {
          element: T,
          isDehydrated: !1,
          cache: S.cache,
          pendingSuspenseBoundaries: S.pendingSuspenseBoundaries,
          transitions: S.transitions
        }, L = n.updateQueue;
        if (L.baseState = M, n.memoizedState = M, n.flags & ea) {
          var j = qc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), n);
          return Cx(e, n, T, l, j);
        } else if (T !== h) {
          var re = qc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), n);
          return Cx(e, n, T, l, re);
        } else {
          eM(n);
          var te = SE(n, null, T, l);
          n.child = te;
          for (var he = te; he; )
            he.flags = he.flags & ~er | Da, he = he.sibling;
        }
      } else {
        if (wd(), T === h)
          return bs(e, n, l);
        Za(e, n, T, l);
      }
      return n.child;
    }
    function Cx(e, n, l, o, c) {
      return wd(), vg(c), n.flags |= ea, Za(e, n, l, o), n.child;
    }
    function ZM(e, n, l) {
      DE(n), e === null && pg(n);
      var o = n.type, c = n.pendingProps, h = e !== null ? e.memoizedProps : null, S = c.children, T = Q1(o, c);
      return T ? S = null : h !== null && Q1(o, h) && (n.flags |= ci), xx(e, n), Za(e, n, S, l), n.child;
    }
    function JM(e, n) {
      return e === null && pg(n), null;
    }
    function e_(e, n, l, o) {
      i0(e, n);
      var c = n.pendingProps, h = l, S = h._payload, T = h._init, M = T(S);
      n.type = M;
      var L = n.tag = Jk(M), j = Vl(M, c), re;
      switch (L) {
        case g:
          return DS(n, M), n.type = M = $d(M), re = _S(null, n, M, j, o), re;
        case x:
          return n.type = M = l2(M), re = wx(null, n, M, j, o), re;
        case P:
          return n.type = M = o2(M), re = yx(null, n, M, j, o), re;
        case I: {
          if (n.type !== n.elementType) {
            var te = M.propTypes;
            te && jl(
              te,
              j,
              // Resolved for outer only
              "prop",
              Sn(M)
            );
          }
          return re = gx(
            null,
            n,
            M,
            Vl(M.type, j),
            // The inner type can have defaults too
            o
          ), re;
        }
      }
      var he = "";
      throw M !== null && typeof M == "object" && M.$$typeof === It && (he = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + M + ". " + ("Lazy element type must resolve to a class or function." + he));
    }
    function t_(e, n, l, o, c) {
      i0(e, n), n.tag = x;
      var h;
      return Ro(l) ? (h = !0, hy(n)) : h = !1, Td(n, c), fx(n, l, o), SS(n, l, o, c), kS(null, n, l, !0, h, c);
    }
    function n_(e, n, l, o) {
      i0(e, n);
      var c = n.pendingProps, h;
      {
        var S = gd(n, l, !1);
        h = Sd(n, S);
      }
      Td(n, o);
      var T, M;
      Qa(n);
      {
        if (l.prototype && typeof l.prototype.render == "function") {
          var L = Sn(l) || "Unknown";
          bS[L] || (v("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", L, L), bS[L] = !0);
        }
        n.mode & Ln && Pl.recordLegacyContextWarning(n, null), Mr(!0), Hv.current = n, T = Od(null, n, l, c, h, o), M = Ad(), Mr(!1);
      }
      if (Ba(), n.flags |= Li, typeof T == "object" && T !== null && typeof T.render == "function" && T.$$typeof === void 0) {
        var j = Sn(l) || "Unknown";
        Vv[j] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", j, j, j), Vv[j] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof T == "object" && T !== null && typeof T.render == "function" && T.$$typeof === void 0
      ) {
        {
          var re = Sn(l) || "Unknown";
          Vv[re] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", re, re, re), Vv[re] = !0);
        }
        n.tag = x, n.memoizedState = null, n.updateQueue = null;
        var te = !1;
        return Ro(l) ? (te = !0, hy(n)) : te = !1, n.memoizedState = T.state !== null && T.state !== void 0 ? T.state : null, _g(n), cx(n, T), SS(n, l, c, o), kS(null, n, l, !0, te, o);
      } else {
        if (n.tag = g, n.mode & Ln) {
          tr(!0);
          try {
            T = Od(null, n, l, c, h, o), M = Ad();
          } finally {
            tr(!1);
          }
        }
        return ga() && M && sg(n), Za(null, n, T, o), DS(n, l), n.child;
      }
    }
    function DS(e, n) {
      {
        if (n && n.childContextTypes && v("%s(...): childContextTypes cannot be defined on a function component.", n.displayName || n.name || "Component"), e.ref !== null) {
          var l = "", o = fa();
          o && (l += `

Check the render method of \`` + o + "`.");
          var c = o || "", h = e._debugSource;
          h && (c = h.fileName + ":" + h.lineNumber), RS[c] || (RS[c] = !0, v("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", l));
        }
        if (n.defaultProps !== void 0) {
          var S = Sn(n) || "Unknown";
          Iv[S] || (v("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", S), Iv[S] = !0);
        }
        if (typeof n.getDerivedStateFromProps == "function") {
          var T = Sn(n) || "Unknown";
          TS[T] || (v("%s: Function components do not support getDerivedStateFromProps.", T), TS[T] = !0);
        }
        if (typeof n.contextType == "object" && n.contextType !== null) {
          var M = Sn(n) || "Unknown";
          CS[M] || (v("%s: Function components do not support contextType.", M), CS[M] = !0);
        }
      }
    }
    var OS = {
      dehydrated: null,
      treeContext: null,
      retryLane: wn
    };
    function AS(e) {
      return {
        baseLanes: e,
        cachePool: WM(),
        transitions: null
      };
    }
    function r_(e, n) {
      var l = null;
      return {
        baseLanes: en(e.baseLanes, n),
        cachePool: l,
        transitions: e.transitions
      };
    }
    function a_(e, n, l, o) {
      if (n !== null) {
        var c = n.memoizedState;
        if (c === null)
          return !1;
      }
      return zg(e, Av);
    }
    function i_(e, n) {
      return hc(e.childLanes, n);
    }
    function Tx(e, n, l) {
      var o = n.pendingProps;
      vD(n) && (n.flags |= Dt);
      var c = $l.current, h = !1, S = (n.flags & Dt) !== At;
      if (S || a_(c, e) ? (h = !0, n.flags &= ~Dt) : (e === null || e.memoizedState !== null) && (c = bM(c, AE)), c = Md(c), Su(n, c), e === null) {
        pg(n);
        var T = n.memoizedState;
        if (T !== null) {
          var M = T.dehydrated;
          if (M !== null)
            return c_(n, M);
        }
        var L = o.children, j = o.fallback;
        if (h) {
          var re = l_(n, L, j, l), te = n.child;
          return te.memoizedState = AS(l), n.memoizedState = OS, re;
        } else
          return zS(n, L);
      } else {
        var he = e.memoizedState;
        if (he !== null) {
          var ge = he.dehydrated;
          if (ge !== null)
            return f_(e, n, S, o, ge, he, l);
        }
        if (h) {
          var Te = o.fallback, st = o.children, Nt = s_(e, n, st, Te, l), _t = n.child, mn = e.child.memoizedState;
          return _t.memoizedState = mn === null ? AS(l) : r_(mn, l), _t.childLanes = i_(e, l), n.memoizedState = OS, Nt;
        } else {
          var fn = o.children, ce = o_(e, n, fn, l);
          return n.memoizedState = null, ce;
        }
      }
    }
    function zS(e, n, l) {
      var o = e.mode, c = {
        mode: "visible",
        children: n
      }, h = LS(c, o);
      return h.return = e, e.child = h, h;
    }
    function l_(e, n, l, o) {
      var c = e.mode, h = e.child, S = {
        mode: "hidden",
        children: n
      }, T, M;
      return (c & ln) === zt && h !== null ? (T = h, T.childLanes = Ue, T.pendingProps = S, e.mode & Cn && (T.actualDuration = 0, T.actualStartTime = -1, T.selfBaseDuration = 0, T.treeBaseDuration = 0), M = Mu(l, c, o, null)) : (T = LS(S, c), M = Mu(l, c, o, null)), T.return = e, M.return = e, T.sibling = M, e.child = T, M;
    }
    function LS(e, n, l) {
      return Rw(e, n, Ue, null);
    }
    function Rx(e, n) {
      return Xc(e, n);
    }
    function o_(e, n, l, o) {
      var c = e.child, h = c.sibling, S = Rx(c, {
        mode: "visible",
        children: l
      });
      if ((n.mode & ln) === zt && (S.lanes = o), S.return = n, S.sibling = null, h !== null) {
        var T = n.deletions;
        T === null ? (n.deletions = [h], n.flags |= ui) : T.push(h);
      }
      return n.child = S, S;
    }
    function s_(e, n, l, o, c) {
      var h = n.mode, S = e.child, T = S.sibling, M = {
        mode: "hidden",
        children: l
      }, L;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (h & ln) === zt && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        n.child !== S
      ) {
        var j = n.child;
        L = j, L.childLanes = Ue, L.pendingProps = M, n.mode & Cn && (L.actualDuration = 0, L.actualStartTime = -1, L.selfBaseDuration = S.selfBaseDuration, L.treeBaseDuration = S.treeBaseDuration), n.deletions = null;
      } else
        L = Rx(S, M), L.subtreeFlags = S.subtreeFlags & yr;
      var re;
      return T !== null ? re = Xc(T, o) : (re = Mu(o, h, c, null), re.flags |= er), re.return = n, L.return = n, L.sibling = re, n.child = L, re;
    }
    function a0(e, n, l, o) {
      o !== null && vg(o), bd(n, e.child, null, l);
      var c = n.pendingProps, h = c.children, S = zS(n, h);
      return S.flags |= er, n.memoizedState = null, S;
    }
    function u_(e, n, l, o, c) {
      var h = n.mode, S = {
        mode: "visible",
        children: l
      }, T = LS(S, h), M = Mu(o, h, c, null);
      return M.flags |= er, T.return = n, M.return = n, T.sibling = M, n.child = T, (n.mode & ln) !== zt && bd(n, e.child, null, c), M;
    }
    function c_(e, n, l) {
      return (e.mode & ln) === zt ? (v("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Vt) : Z1(n) ? e.lanes = ta : e.lanes = La, null;
    }
    function f_(e, n, l, o, c, h, S) {
      if (l)
        if (n.flags & ea) {
          n.flags &= ~ea;
          var ce = ES(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return a0(e, n, S, ce);
        } else {
          if (n.memoizedState !== null)
            return n.child = e.child, n.flags |= Dt, null;
          var Re = o.children, fe = o.fallback, Qe = u_(e, n, Re, fe, S), mt = n.child;
          return mt.memoizedState = AS(S), n.memoizedState = OS, Qe;
        }
      else {
        if (ZR(), (n.mode & ln) === zt)
          return a0(
            e,
            n,
            S,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Z1(c)) {
          var T, M, L;
          {
            var j = hR(c);
            T = j.digest, M = j.message, L = j.stack;
          }
          var re;
          M ? re = new Error(M) : re = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var te = ES(re, T, L);
          return a0(e, n, S, te);
        }
        var he = Na(S, e.childLanes);
        if (Il || he) {
          var ge = h0();
          if (ge !== null) {
            var Te = Wp(ge, S);
            if (Te !== wn && Te !== h.retryLane) {
              h.retryLane = Te;
              var st = jn;
              Si(e, Te), Jr(ge, e, Te, st);
            }
          }
          t2();
          var Nt = ES(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return a0(e, n, S, Nt);
        } else if (B3(c)) {
          n.flags |= Dt, n.child = e.child;
          var _t = Uk.bind(null, e);
          return mR(c, _t), null;
        } else {
          tM(n, c, h.treeContext);
          var mn = o.children, fn = zS(n, mn);
          return fn.flags |= Da, fn;
        }
      }
    }
    function Mx(e, n, l) {
      e.lanes = en(e.lanes, n);
      var o = e.alternate;
      o !== null && (o.lanes = en(o.lanes, n)), Cg(e.return, n, l);
    }
    function d_(e, n, l) {
      for (var o = n; o !== null; ) {
        if (o.tag === H) {
          var c = o.memoizedState;
          c !== null && Mx(o, l, e);
        } else if (o.tag === J)
          Mx(o, l, e);
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
    function p_(e) {
      for (var n = e, l = null; n !== null; ) {
        var o = n.alternate;
        o !== null && Uy(o) === null && (l = n), n = n.sibling;
      }
      return l;
    }
    function v_(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !MS[e])
        if (MS[e] = !0, typeof e == "string")
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
    function h_(e, n) {
      e !== void 0 && !r0[e] && (e !== "collapsed" && e !== "hidden" ? (r0[e] = !0, v('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : n !== "forwards" && n !== "backwards" && (r0[e] = !0, v('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function _x(e, n) {
      {
        var l = rn(e), o = !l && typeof Wt(e) == "function";
        if (l || o) {
          var c = l ? "array" : "iterable";
          return v("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", c, n, c), !1;
        }
      }
      return !0;
    }
    function m_(e, n) {
      if ((n === "forwards" || n === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (rn(e)) {
          for (var l = 0; l < e.length; l++)
            if (!_x(e[l], l))
              return;
        } else {
          var o = Wt(e);
          if (typeof o == "function") {
            var c = o.call(e);
            if (c)
              for (var h = c.next(), S = 0; !h.done; h = c.next()) {
                if (!_x(h.value, S))
                  return;
                S++;
              }
          } else
            v('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', n);
        }
    }
    function NS(e, n, l, o, c) {
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
    function kx(e, n, l) {
      var o = n.pendingProps, c = o.revealOrder, h = o.tail, S = o.children;
      v_(c), h_(h, c), m_(S, c), Za(e, n, S, l);
      var T = $l.current, M = zg(T, Av);
      if (M)
        T = Lg(T, Av), n.flags |= Dt;
      else {
        var L = e !== null && (e.flags & Dt) !== At;
        L && d_(n, n.child, l), T = Md(T);
      }
      if (Su(n, T), (n.mode & ln) === zt)
        n.memoizedState = null;
      else
        switch (c) {
          case "forwards": {
            var j = p_(n.child), re;
            j === null ? (re = n.child, n.child = null) : (re = j.sibling, j.sibling = null), NS(
              n,
              !1,
              // isBackwards
              re,
              j,
              h
            );
            break;
          }
          case "backwards": {
            var te = null, he = n.child;
            for (n.child = null; he !== null; ) {
              var ge = he.alternate;
              if (ge !== null && Uy(ge) === null) {
                n.child = he;
                break;
              }
              var Te = he.sibling;
              he.sibling = te, te = he, he = Te;
            }
            NS(
              n,
              !0,
              // isBackwards
              te,
              null,
              // last
              h
            );
            break;
          }
          case "together": {
            NS(
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
    function y_(e, n, l) {
      Dg(n, n.stateNode.containerInfo);
      var o = n.pendingProps;
      return e === null ? n.child = bd(n, null, o, l) : Za(e, n, o, l), n.child;
    }
    var Dx = !1;
    function g_(e, n, l) {
      var o = n.type, c = o._context, h = n.pendingProps, S = n.memoizedProps, T = h.value;
      {
        "value" in h || Dx || (Dx = !0, v("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var M = n.type.propTypes;
        M && jl(M, h, "prop", "Context.Provider");
      }
      if (wE(n, c, T), S !== null) {
        var L = S.value;
        if (Ve(L, T)) {
          if (S.children === h.children && !py())
            return bs(e, n, l);
        } else
          vM(n, c, l);
      }
      var j = h.children;
      return Za(e, n, j, l), n.child;
    }
    var Ox = !1;
    function S_(e, n, l) {
      var o = n.type;
      o._context === void 0 ? o !== o.Consumer && (Ox || (Ox = !0, v("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : o = o._context;
      var c = n.pendingProps, h = c.children;
      typeof h != "function" && v("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Td(n, l);
      var S = Fr(o);
      Qa(n);
      var T;
      return Hv.current = n, Mr(!0), T = h(S), Mr(!1), Ba(), n.flags |= Li, Za(e, n, T, l), n.child;
    }
    function qv() {
      Il = !0;
    }
    function i0(e, n) {
      (n.mode & ln) === zt && e !== null && (e.alternate = null, n.alternate = null, n.flags |= er);
    }
    function bs(e, n, l) {
      return e !== null && (n.dependencies = e.dependencies), lx(), nh(n.lanes), Na(l, n.childLanes) ? (dM(e, n), n.child) : null;
    }
    function E_(e, n, l) {
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
        return h === null ? (o.deletions = [e], o.flags |= ui) : h.push(e), l.flags |= er, l;
      }
    }
    function US(e, n) {
      var l = e.lanes;
      return !!Na(l, n);
    }
    function x_(e, n, l) {
      switch (n.tag) {
        case C:
          bx(n), n.stateNode, wd();
          break;
        case _:
          DE(n);
          break;
        case x: {
          var o = n.type;
          Ro(o) && hy(n);
          break;
        }
        case R:
          Dg(n, n.stateNode.containerInfo);
          break;
        case Y: {
          var c = n.memoizedProps.value, h = n.type._context;
          wE(n, h, c);
          break;
        }
        case N:
          {
            var S = Na(l, n.childLanes);
            S && (n.flags |= pn);
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
              return Su(n, Md($l.current)), n.flags |= Dt, null;
            var L = n.child, j = L.childLanes;
            if (Na(l, j))
              return Tx(e, n, l);
            Su(n, Md($l.current));
            var re = bs(e, n, l);
            return re !== null ? re.sibling : null;
          } else
            Su(n, Md($l.current));
          break;
        }
        case J: {
          var te = (e.flags & Dt) !== At, he = Na(l, n.childLanes);
          if (te) {
            if (he)
              return kx(e, n, l);
            n.flags |= Dt;
          }
          var ge = n.memoizedState;
          if (ge !== null && (ge.rendering = null, ge.tail = null, ge.lastEffect = null), Su(n, $l.current), he)
            break;
          return null;
        }
        case W:
        case X:
          return n.lanes = Ue, Ex(e, n, l);
      }
      return bs(e, n, l);
    }
    function Ax(e, n, l) {
      if (n._debugNeedsRemount && e !== null)
        return E_(e, n, d2(n.type, n.key, n.pendingProps, n._debugOwner || null, n.mode, n.lanes));
      if (e !== null) {
        var o = e.memoizedProps, c = n.pendingProps;
        if (o !== c || py() || // Force a re-render if the implementation changed due to hot reload:
        n.type !== e.type)
          Il = !0;
        else {
          var h = US(e, l);
          if (!h && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (n.flags & Dt) === At)
            return Il = !1, x_(e, n, l);
          (e.flags & xf) !== At ? Il = !0 : Il = !1;
        }
      } else if (Il = !1, ga() && WR(n)) {
        var S = n.index, T = GR();
        lE(n, T, S);
      }
      switch (n.lanes = Ue, n.tag) {
        case b:
          return n_(e, n, n.type, l);
        case oe: {
          var M = n.elementType;
          return e_(e, n, M, l);
        }
        case g: {
          var L = n.type, j = n.pendingProps, re = n.elementType === L ? j : Vl(L, j);
          return _S(e, n, L, re, l);
        }
        case x: {
          var te = n.type, he = n.pendingProps, ge = n.elementType === te ? he : Vl(te, he);
          return wx(e, n, te, ge, l);
        }
        case C:
          return KM(e, n, l);
        case _:
          return ZM(e, n, l);
        case k:
          return JM(e, n);
        case H:
          return Tx(e, n, l);
        case R:
          return y_(e, n, l);
        case P: {
          var Te = n.type, st = n.pendingProps, Nt = n.elementType === Te ? st : Vl(Te, st);
          return yx(e, n, Te, Nt, l);
        }
        case O:
          return QM(e, n, l);
        case z:
          return BM(e, n, l);
        case N:
          return XM(e, n, l);
        case Y:
          return g_(e, n, l);
        case F:
          return S_(e, n, l);
        case I: {
          var _t = n.type, mn = n.pendingProps, fn = Vl(_t, mn);
          if (n.type !== n.elementType) {
            var ce = _t.propTypes;
            ce && jl(
              ce,
              fn,
              // Resolved for outer only
              "prop",
              Sn(_t)
            );
          }
          return fn = Vl(_t.type, fn), gx(e, n, _t, fn, l);
        }
        case V:
          return Sx(e, n, n.type, n.pendingProps, l);
        case B: {
          var Re = n.type, fe = n.pendingProps, Qe = n.elementType === Re ? fe : Vl(Re, fe);
          return t_(e, n, Re, Qe, l);
        }
        case J:
          return kx(e, n, l);
        case ee:
          break;
        case W:
          return Ex(e, n, l);
      }
      throw new Error("Unknown unit of work tag (" + n.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function zd(e) {
      e.flags |= pn;
    }
    function zx(e) {
      e.flags |= ir, e.flags |= Zs;
    }
    var Lx, jS, Nx, Ux;
    Lx = function(e, n, l, o) {
      for (var c = n.child; c !== null; ) {
        if (c.tag === _ || c.tag === k)
          IT(e, c.stateNode);
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
    }, jS = function(e, n) {
    }, Nx = function(e, n, l, o, c) {
      var h = e.memoizedProps;
      if (h !== o) {
        var S = n.stateNode, T = Og(), M = YT(S, l, h, o, c, T);
        n.updateQueue = M, M && zd(n);
      }
    }, Ux = function(e, n, l, o) {
      l !== o && zd(n);
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
      var n = e.alternate !== null && e.alternate.child === e.child, l = Ue, o = At;
      if (n) {
        if ((e.mode & Cn) !== zt) {
          for (var M = e.selfBaseDuration, L = e.child; L !== null; )
            l = en(l, en(L.lanes, L.childLanes)), o |= L.subtreeFlags & yr, o |= L.flags & yr, M += L.treeBaseDuration, L = L.sibling;
          e.treeBaseDuration = M;
        } else
          for (var j = e.child; j !== null; )
            l = en(l, en(j.lanes, j.childLanes)), o |= j.subtreeFlags & yr, o |= j.flags & yr, j.return = e, j = j.sibling;
        e.subtreeFlags |= o;
      } else {
        if ((e.mode & Cn) !== zt) {
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
    function w_(e, n, l) {
      if (lM() && (n.mode & ln) !== zt && (n.flags & Dt) === At)
        return pE(n), wd(), n.flags |= ea | Ju | Lr, !1;
      var o = Ey(n);
      if (l !== null && l.dehydrated !== null)
        if (e === null) {
          if (!o)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (aM(n), Ea(n), (n.mode & Cn) !== zt) {
            var c = l !== null;
            if (c) {
              var h = n.child;
              h !== null && (n.treeBaseDuration -= h.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (wd(), (n.flags & Dt) === At && (n.memoizedState = null), n.flags |= pn, Ea(n), (n.mode & Cn) !== zt) {
            var S = l !== null;
            if (S) {
              var T = n.child;
              T !== null && (n.treeBaseDuration -= T.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return vE(), !0;
    }
    function jx(e, n, l) {
      var o = n.pendingProps;
      switch (ug(n), n.tag) {
        case b:
        case oe:
        case V:
        case g:
        case P:
        case O:
        case z:
        case N:
        case F:
        case I:
          return Ea(n), null;
        case x: {
          var c = n.type;
          return Ro(c) && vy(n), Ea(n), null;
        }
        case C: {
          var h = n.stateNode;
          if (Rd(n), ig(n), Ug(), h.pendingContext && (h.context = h.pendingContext, h.pendingContext = null), e === null || e.child === null) {
            var S = Ey(n);
            if (S)
              zd(n);
            else if (e !== null) {
              var T = e.memoizedState;
              // Check if this is a client root
              (!T.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (n.flags & ea) !== At) && (n.flags |= _r, vE());
            }
          }
          return jS(e, n), Ea(n), null;
        }
        case _: {
          Ag(n);
          var M = kE(), L = n.type;
          if (e !== null && n.stateNode != null)
            Nx(e, n, L, o, M), e.ref !== n.ref && zx(n);
          else {
            if (!o) {
              if (n.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Ea(n), null;
            }
            var j = Og(), re = Ey(n);
            if (re)
              nM(n, M, j) && zd(n);
            else {
              var te = VT(L, o, M, j, n);
              Lx(te, n, !1, !1), n.stateNode = te, qT(te, L, o, M) && zd(n);
            }
            n.ref !== null && zx(n);
          }
          return Ea(n), null;
        }
        case k: {
          var he = o;
          if (e && n.stateNode != null) {
            var ge = e.memoizedProps;
            Ux(e, n, ge, he);
          } else {
            if (typeof he != "string" && n.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var Te = kE(), st = Og(), Nt = Ey(n);
            Nt ? rM(n) && zd(n) : n.stateNode = WT(he, Te, st, n);
          }
          return Ea(n), null;
        }
        case H: {
          _d(n);
          var _t = n.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var mn = w_(e, n, _t);
            if (!mn)
              return n.flags & Lr ? n : null;
          }
          if ((n.flags & Dt) !== At)
            return n.lanes = l, (n.mode & Cn) !== zt && oS(n), n;
          var fn = _t !== null, ce = e !== null && e.memoizedState !== null;
          if (fn !== ce && fn) {
            var Re = n.child;
            if (Re.flags |= mr, (n.mode & ln) !== zt) {
              var fe = e === null && (n.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              fe || zg($l.current, AE) ? bk() : t2();
            }
          }
          var Qe = n.updateQueue;
          if (Qe !== null && (n.flags |= pn), Ea(n), (n.mode & Cn) !== zt && fn) {
            var mt = n.child;
            mt !== null && (n.treeBaseDuration -= mt.treeBaseDuration);
          }
          return null;
        }
        case R:
          return Rd(n), jS(e, n), e === null && PR(n.stateNode.containerInfo), Ea(n), null;
        case Y:
          var ut = n.type._context;
          return bg(ut, n), Ea(n), null;
        case B: {
          var qt = n.type;
          return Ro(qt) && vy(n), Ea(n), null;
        }
        case J: {
          _d(n);
          var Kt = n.memoizedState;
          if (Kt === null)
            return Ea(n), null;
          var Un = (n.flags & Dt) !== At, Mn = Kt.rendering;
          if (Mn === null)
            if (Un)
              Yv(Kt, !1);
            else {
              var Or = Tk() && (e === null || (e.flags & Dt) === At);
              if (!Or)
                for (var _n = n.child; _n !== null; ) {
                  var br = Uy(_n);
                  if (br !== null) {
                    Un = !0, n.flags |= Dt, Yv(Kt, !1);
                    var Va = br.updateQueue;
                    return Va !== null && (n.updateQueue = Va, n.flags |= pn), n.subtreeFlags = At, pM(n, l), Su(n, Lg($l.current, Av)), n.child;
                  }
                  _n = _n.sibling;
                }
              Kt.tail !== null && kr() > aw() && (n.flags |= Dt, Un = !0, Yv(Kt, !1), n.lanes = jp);
            }
          else {
            if (!Un) {
              var Ta = Uy(Mn);
              if (Ta !== null) {
                n.flags |= Dt, Un = !0;
                var Hi = Ta.updateQueue;
                if (Hi !== null && (n.updateQueue = Hi, n.flags |= pn), Yv(Kt, !0), Kt.tail === null && Kt.tailMode === "hidden" && !Mn.alternate && !ga())
                  return Ea(n), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              kr() * 2 - Kt.renderingStartTime > aw() && l !== La && (n.flags |= Dt, Un = !0, Yv(Kt, !1), n.lanes = jp);
            }
            if (Kt.isBackwards)
              Mn.sibling = n.child, n.child = Mn;
            else {
              var ti = Kt.last;
              ti !== null ? ti.sibling = Mn : n.child = Mn, Kt.last = Mn;
            }
          }
          if (Kt.tail !== null) {
            var ni = Kt.tail;
            Kt.rendering = ni, Kt.tail = ni.sibling, Kt.renderingStartTime = kr(), ni.sibling = null;
            var Ia = $l.current;
            return Un ? Ia = Lg(Ia, Av) : Ia = Md(Ia), Su(n, Ia), ni;
          }
          return Ea(n), null;
        }
        case ee:
          break;
        case W:
        case X: {
          e2(n);
          var _s = n.memoizedState, Hd = _s !== null;
          if (e !== null) {
            var oh = e.memoizedState, Lo = oh !== null;
            Lo !== Hd && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ve && (n.flags |= mr);
          }
          return !Hd || (n.mode & ln) === zt ? Ea(n) : Na(zo, La) && (Ea(n), n.subtreeFlags & (er | pn) && (n.flags |= mr)), null;
        }
        case ae:
          return null;
        case de:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + n.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function b_(e, n, l) {
      switch (ug(n), n.tag) {
        case x: {
          var o = n.type;
          Ro(o) && vy(n);
          var c = n.flags;
          return c & Lr ? (n.flags = c & ~Lr | Dt, (n.mode & Cn) !== zt && oS(n), n) : null;
        }
        case C: {
          n.stateNode, Rd(n), ig(n), Ug();
          var h = n.flags;
          return (h & Lr) !== At && (h & Dt) === At ? (n.flags = h & ~Lr | Dt, n) : null;
        }
        case _:
          return Ag(n), null;
        case H: {
          _d(n);
          var S = n.memoizedState;
          if (S !== null && S.dehydrated !== null) {
            if (n.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            wd();
          }
          var T = n.flags;
          return T & Lr ? (n.flags = T & ~Lr | Dt, (n.mode & Cn) !== zt && oS(n), n) : null;
        }
        case J:
          return _d(n), null;
        case R:
          return Rd(n), null;
        case Y:
          var M = n.type._context;
          return bg(M, n), null;
        case W:
        case X:
          return e2(n), null;
        case ae:
          return null;
        default:
          return null;
      }
    }
    function Fx(e, n, l) {
      switch (ug(n), n.tag) {
        case x: {
          var o = n.type.childContextTypes;
          o != null && vy(n);
          break;
        }
        case C: {
          n.stateNode, Rd(n), ig(n), Ug();
          break;
        }
        case _: {
          Ag(n);
          break;
        }
        case R:
          Rd(n);
          break;
        case H:
          _d(n);
          break;
        case J:
          _d(n);
          break;
        case Y:
          var c = n.type._context;
          bg(c, n);
          break;
        case W:
        case X:
          e2(n);
          break;
      }
    }
    var Px = null;
    Px = /* @__PURE__ */ new Set();
    var l0 = !1, xa = !1, C_ = typeof WeakSet == "function" ? WeakSet : Set, bt = null, Ld = null, Nd = null;
    function T_(e) {
      oo(null, function() {
        throw e;
      }), Zu();
    }
    var R_ = function(e, n) {
      if (n.props = e.memoizedProps, n.state = e.memoizedState, e.mode & Cn)
        try {
          Oo(), n.componentWillUnmount();
        } finally {
          Do(e);
        }
      else
        n.componentWillUnmount();
    };
    function $x(e, n) {
      try {
        wu(Gr, e);
      } catch (l) {
        Yn(e, n, l);
      }
    }
    function FS(e, n, l) {
      try {
        R_(e, l);
      } catch (o) {
        Yn(e, n, o);
      }
    }
    function M_(e, n, l) {
      try {
        l.componentDidMount();
      } catch (o) {
        Yn(e, n, o);
      }
    }
    function Hx(e, n) {
      try {
        Ix(e);
      } catch (l) {
        Yn(e, n, l);
      }
    }
    function Ud(e, n) {
      var l = e.ref;
      if (l !== null)
        if (typeof l == "function") {
          var o;
          try {
            if (be && Le && e.mode & Cn)
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
          typeof o == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Qt(e));
        } else
          l.current = null;
    }
    function o0(e, n, l) {
      try {
        l();
      } catch (o) {
        Yn(e, n, o);
      }
    }
    var Vx = !1;
    function __(e, n) {
      $T(e.containerInfo), bt = n, k_();
      var l = Vx;
      return Vx = !1, l;
    }
    function k_() {
      for (; bt !== null; ) {
        var e = bt, n = e.child;
        (e.subtreeFlags & uo) !== At && n !== null ? (n.return = e, bt = n) : D_();
      }
    }
    function D_() {
      for (; bt !== null; ) {
        var e = bt;
        On(e);
        try {
          O_(e);
        } catch (l) {
          Yn(e, e.return, l);
        }
        qn();
        var n = e.sibling;
        if (n !== null) {
          n.return = e.return, bt = n;
          return;
        }
        bt = e.return;
      }
    }
    function O_(e) {
      var n = e.alternate, l = e.flags;
      if ((l & _r) !== At) {
        switch (On(e), e.tag) {
          case g:
          case P:
          case V:
            break;
          case x: {
            if (n !== null) {
              var o = n.memoizedProps, c = n.memoizedState, h = e.stateNode;
              e.type === e.elementType && !Yc && (h.props !== e.memoizedProps && v("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Qt(e) || "instance"), h.state !== e.memoizedState && v("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Qt(e) || "instance"));
              var S = h.getSnapshotBeforeUpdate(e.elementType === e.type ? o : Vl(e.type, o), c);
              {
                var T = Px;
                S === void 0 && !T.has(e.type) && (T.add(e.type), v("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Qt(e)));
              }
              h.__reactInternalSnapshotBeforeUpdate = S;
            }
            break;
          }
          case C: {
            {
              var M = e.stateNode;
              fR(M.containerInfo);
            }
            break;
          }
          case _:
          case k:
          case R:
          case B:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        qn();
      }
    }
    function ql(e, n, l) {
      var o = n.updateQueue, c = o !== null ? o.lastEffect : null;
      if (c !== null) {
        var h = c.next, S = h;
        do {
          if ((S.tag & e) === e) {
            var T = S.destroy;
            S.destroy = void 0, T !== void 0 && ((e & Sa) !== Ei ? Ol(n) : (e & Gr) !== Ei && tc(n), (e & Mo) !== Ei && ah(!0), o0(n, l, T), (e & Mo) !== Ei && ah(!1), (e & Sa) !== Ei ? vo() : (e & Gr) !== Ei && Np());
          }
          S = S.next;
        } while (S !== h);
      }
    }
    function wu(e, n) {
      var l = n.updateQueue, o = l !== null ? l.lastEffect : null;
      if (o !== null) {
        var c = o.next, h = c;
        do {
          if ((h.tag & e) === e) {
            (e & Sa) !== Ei ? Lp(n) : (e & Gr) !== Ei && Mf(n);
            var S = h.create;
            (e & Mo) !== Ei && ah(!0), h.destroy = S(), (e & Mo) !== Ei && ah(!1), (e & Sa) !== Ei ? dm() : (e & Gr) !== Ei && pm();
            {
              var T = h.destroy;
              if (T !== void 0 && typeof T != "function") {
                var M = void 0;
                (h.tag & Gr) !== At ? M = "useLayoutEffect" : (h.tag & Mo) !== At ? M = "useInsertionEffect" : M = "useEffect";
                var L = void 0;
                T === null ? L = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof T.then == "function" ? L = `

It looks like you wrote ` + M + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + M + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : L = " You returned: " + T, v("%s must not return anything besides a function, which is used for clean-up.%s", M, L);
              }
            }
          }
          h = h.next;
        } while (h !== c);
      }
    }
    function A_(e, n) {
      if ((n.flags & pn) !== At)
        switch (n.tag) {
          case N: {
            var l = n.stateNode.passiveEffectDuration, o = n.memoizedProps, c = o.id, h = o.onPostCommit, S = ax(), T = n.alternate === null ? "mount" : "update";
            rx() && (T = "nested-update"), typeof h == "function" && h(c, T, l, S);
            var M = n.return;
            e: for (; M !== null; ) {
              switch (M.tag) {
                case C:
                  var L = M.stateNode;
                  L.passiveEffectDuration += l;
                  break e;
                case N:
                  var j = M.stateNode;
                  j.passiveEffectDuration += l;
                  break e;
              }
              M = M.return;
            }
            break;
          }
        }
    }
    function z_(e, n, l, o) {
      if ((l.flags & fo) !== At)
        switch (l.tag) {
          case g:
          case P:
          case V: {
            if (!xa)
              if (l.mode & Cn)
                try {
                  Oo(), wu(Gr | Wr, l);
                } finally {
                  Do(l);
                }
              else
                wu(Gr | Wr, l);
            break;
          }
          case x: {
            var c = l.stateNode;
            if (l.flags & pn && !xa)
              if (n === null)
                if (l.type === l.elementType && !Yc && (c.props !== l.memoizedProps && v("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Qt(l) || "instance"), c.state !== l.memoizedState && v("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Qt(l) || "instance")), l.mode & Cn)
                  try {
                    Oo(), c.componentDidMount();
                  } finally {
                    Do(l);
                  }
                else
                  c.componentDidMount();
              else {
                var h = l.elementType === l.type ? n.memoizedProps : Vl(l.type, n.memoizedProps), S = n.memoizedState;
                if (l.type === l.elementType && !Yc && (c.props !== l.memoizedProps && v("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Qt(l) || "instance"), c.state !== l.memoizedState && v("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Qt(l) || "instance")), l.mode & Cn)
                  try {
                    Oo(), c.componentDidUpdate(h, S, c.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Do(l);
                  }
                else
                  c.componentDidUpdate(h, S, c.__reactInternalSnapshotBeforeUpdate);
              }
            var T = l.updateQueue;
            T !== null && (l.type === l.elementType && !Yc && (c.props !== l.memoizedProps && v("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Qt(l) || "instance"), c.state !== l.memoizedState && v("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Qt(l) || "instance")), _E(l, T, c));
            break;
          }
          case C: {
            var M = l.updateQueue;
            if (M !== null) {
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
              _E(l, M, L);
            }
            break;
          }
          case _: {
            var j = l.stateNode;
            if (n === null && l.flags & pn) {
              var re = l.type, te = l.memoizedProps;
              KT(j, re, te);
            }
            break;
          }
          case k:
            break;
          case R:
            break;
          case N: {
            {
              var he = l.memoizedProps, ge = he.onCommit, Te = he.onRender, st = l.stateNode.effectDuration, Nt = ax(), _t = n === null ? "mount" : "update";
              rx() && (_t = "nested-update"), typeof Te == "function" && Te(l.memoizedProps.id, _t, l.actualDuration, l.treeBaseDuration, l.actualStartTime, Nt);
              {
                typeof ge == "function" && ge(l.memoizedProps.id, _t, st, Nt), Dk(l);
                var mn = l.return;
                e: for (; mn !== null; ) {
                  switch (mn.tag) {
                    case C:
                      var fn = mn.stateNode;
                      fn.effectDuration += st;
                      break e;
                    case N:
                      var ce = mn.stateNode;
                      ce.effectDuration += st;
                      break e;
                  }
                  mn = mn.return;
                }
              }
            }
            break;
          }
          case H: {
            H_(e, l);
            break;
          }
          case J:
          case B:
          case ee:
          case W:
          case X:
          case de:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      xa || l.flags & ir && Ix(l);
    }
    function L_(e) {
      switch (e.tag) {
        case g:
        case P:
        case V: {
          if (e.mode & Cn)
            try {
              Oo(), $x(e, e.return);
            } finally {
              Do(e);
            }
          else
            $x(e, e.return);
          break;
        }
        case x: {
          var n = e.stateNode;
          typeof n.componentDidMount == "function" && M_(e, e.return, n), Hx(e, e.return);
          break;
        }
        case _: {
          Hx(e, e.return);
          break;
        }
      }
    }
    function N_(e, n) {
      for (var l = null, o = e; ; ) {
        if (o.tag === _) {
          if (l === null) {
            l = o;
            try {
              var c = o.stateNode;
              n ? oR(c) : uR(o.stateNode, o.memoizedProps);
            } catch (S) {
              Yn(e, e.return, S);
            }
          }
        } else if (o.tag === k) {
          if (l === null)
            try {
              var h = o.stateNode;
              n ? sR(h) : cR(h, o.memoizedProps);
            } catch (S) {
              Yn(e, e.return, S);
            }
        } else if (!((o.tag === W || o.tag === X) && o.memoizedState !== null && o !== e)) {
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
    function Ix(e) {
      var n = e.ref;
      if (n !== null) {
        var l = e.stateNode, o;
        if (e.tag === _ ? o = l : o = l, typeof n == "function") {
          var c;
          if (e.mode & Cn)
            try {
              Oo(), c = n(o);
            } finally {
              Do(e);
            }
          else
            c = n(o);
          typeof c == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Qt(e));
        } else
          n.hasOwnProperty("current") || v("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Qt(e)), n.current = o;
      }
    }
    function U_(e) {
      var n = e.alternate;
      n !== null && (n.return = null), e.return = null;
    }
    function qx(e) {
      var n = e.alternate;
      n !== null && (e.alternate = null, qx(n));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === _) {
          var l = e.stateNode;
          l !== null && VR(l);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function j_(e) {
      for (var n = e.return; n !== null; ) {
        if (Yx(n))
          return n;
        n = n.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Yx(e) {
      return e.tag === _ || e.tag === C || e.tag === R;
    }
    function Wx(e) {
      var n = e;
      e: for (; ; ) {
        for (; n.sibling === null; ) {
          if (n.return === null || Yx(n.return))
            return null;
          n = n.return;
        }
        for (n.sibling.return = n.return, n = n.sibling; n.tag !== _ && n.tag !== k && n.tag !== $; ) {
          if (n.flags & er || n.child === null || n.tag === R)
            continue e;
          n.child.return = n, n = n.child;
        }
        if (!(n.flags & er))
          return n.stateNode;
      }
    }
    function F_(e) {
      var n = j_(e);
      switch (n.tag) {
        case _: {
          var l = n.stateNode;
          n.flags & ci && (Q3(l), n.flags &= ~ci);
          var o = Wx(e);
          $S(e, o, l);
          break;
        }
        case C:
        case R: {
          var c = n.stateNode.containerInfo, h = Wx(e);
          PS(e, h, c);
          break;
        }
        // eslint-disable-next-line-no-fallthrough
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function PS(e, n, l) {
      var o = e.tag, c = o === _ || o === k;
      if (c) {
        var h = e.stateNode;
        n ? rR(l, h, n) : tR(l, h);
      } else if (o !== R) {
        var S = e.child;
        if (S !== null) {
          PS(S, n, l);
          for (var T = S.sibling; T !== null; )
            PS(T, n, l), T = T.sibling;
        }
      }
    }
    function $S(e, n, l) {
      var o = e.tag, c = o === _ || o === k;
      if (c) {
        var h = e.stateNode;
        n ? nR(l, h, n) : eR(l, h);
      } else if (o !== R) {
        var S = e.child;
        if (S !== null) {
          $S(S, n, l);
          for (var T = S.sibling; T !== null; )
            $S(T, n, l), T = T.sibling;
        }
      }
    }
    var wa = null, Yl = !1;
    function P_(e, n, l) {
      {
        var o = n;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case _: {
              wa = o.stateNode, Yl = !1;
              break e;
            }
            case C: {
              wa = o.stateNode.containerInfo, Yl = !0;
              break e;
            }
            case R: {
              wa = o.stateNode.containerInfo, Yl = !0;
              break e;
            }
          }
          o = o.return;
        }
        if (wa === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        Gx(e, n, l), wa = null, Yl = !1;
      }
      U_(l);
    }
    function bu(e, n, l) {
      for (var o = l.child; o !== null; )
        Gx(e, n, o), o = o.sibling;
    }
    function Gx(e, n, l) {
      switch (Op(l), l.tag) {
        case _:
          xa || Ud(l, n);
        // eslint-disable-next-line-no-fallthrough
        case k: {
          {
            var o = wa, c = Yl;
            wa = null, bu(e, n, l), wa = o, Yl = c, wa !== null && (Yl ? iR(wa, l.stateNode) : aR(wa, l.stateNode));
          }
          return;
        }
        case $: {
          wa !== null && (Yl ? lR(wa, l.stateNode) : K1(wa, l.stateNode));
          return;
        }
        case R: {
          {
            var h = wa, S = Yl;
            wa = l.stateNode.containerInfo, Yl = !0, bu(e, n, l), wa = h, Yl = S;
          }
          return;
        }
        case g:
        case P:
        case I:
        case V: {
          if (!xa) {
            var T = l.updateQueue;
            if (T !== null) {
              var M = T.lastEffect;
              if (M !== null) {
                var L = M.next, j = L;
                do {
                  var re = j, te = re.destroy, he = re.tag;
                  te !== void 0 && ((he & Mo) !== Ei ? o0(l, n, te) : (he & Gr) !== Ei && (tc(l), l.mode & Cn ? (Oo(), o0(l, n, te), Do(l)) : o0(l, n, te), Np())), j = j.next;
                } while (j !== L);
              }
            }
          }
          bu(e, n, l);
          return;
        }
        case x: {
          if (!xa) {
            Ud(l, n);
            var ge = l.stateNode;
            typeof ge.componentWillUnmount == "function" && FS(l, n, ge);
          }
          bu(e, n, l);
          return;
        }
        case ee: {
          bu(e, n, l);
          return;
        }
        case W: {
          if (
            // TODO: Remove this dead flag
            l.mode & ln
          ) {
            var Te = xa;
            xa = Te || l.memoizedState !== null, bu(e, n, l), xa = Te;
          } else
            bu(e, n, l);
          break;
        }
        default: {
          bu(e, n, l);
          return;
        }
      }
    }
    function $_(e) {
      e.memoizedState;
    }
    function H_(e, n) {
      var l = n.memoizedState;
      if (l === null) {
        var o = n.alternate;
        if (o !== null) {
          var c = o.memoizedState;
          if (c !== null) {
            var h = c.dehydrated;
            h !== null && TR(h);
          }
        }
      }
    }
    function Qx(e) {
      var n = e.updateQueue;
      if (n !== null) {
        e.updateQueue = null;
        var l = e.stateNode;
        l === null && (l = e.stateNode = new C_()), n.forEach(function(o) {
          var c = jk.bind(null, e, o);
          if (!l.has(o)) {
            if (l.add(o), za)
              if (Ld !== null && Nd !== null)
                rh(Nd, Ld);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            o.then(c, c);
          }
        });
      }
    }
    function V_(e, n, l) {
      Ld = l, Nd = e, On(n), Bx(n, e), On(n), Ld = null, Nd = null;
    }
    function Wl(e, n, l) {
      var o = n.deletions;
      if (o !== null)
        for (var c = 0; c < o.length; c++) {
          var h = o[c];
          try {
            P_(e, n, h);
          } catch (M) {
            Yn(h, n, M);
          }
        }
      var S = eo();
      if (n.subtreeFlags & co)
        for (var T = n.child; T !== null; )
          On(T), Bx(T, e), T = T.sibling;
      On(S);
    }
    function Bx(e, n, l) {
      var o = e.alternate, c = e.flags;
      switch (e.tag) {
        case g:
        case P:
        case I:
        case V: {
          if (Wl(n, e), Ao(e), c & pn) {
            try {
              ql(Mo | Wr, e, e.return), wu(Mo | Wr, e);
            } catch (qt) {
              Yn(e, e.return, qt);
            }
            if (e.mode & Cn) {
              try {
                Oo(), ql(Gr | Wr, e, e.return);
              } catch (qt) {
                Yn(e, e.return, qt);
              }
              Do(e);
            } else
              try {
                ql(Gr | Wr, e, e.return);
              } catch (qt) {
                Yn(e, e.return, qt);
              }
          }
          return;
        }
        case x: {
          Wl(n, e), Ao(e), c & ir && o !== null && Ud(o, o.return);
          return;
        }
        case _: {
          Wl(n, e), Ao(e), c & ir && o !== null && Ud(o, o.return);
          {
            if (e.flags & ci) {
              var h = e.stateNode;
              try {
                Q3(h);
              } catch (qt) {
                Yn(e, e.return, qt);
              }
            }
            if (c & pn) {
              var S = e.stateNode;
              if (S != null) {
                var T = e.memoizedProps, M = o !== null ? o.memoizedProps : T, L = e.type, j = e.updateQueue;
                if (e.updateQueue = null, j !== null)
                  try {
                    ZT(S, j, L, M, T, e);
                  } catch (qt) {
                    Yn(e, e.return, qt);
                  }
              }
            }
          }
          return;
        }
        case k: {
          if (Wl(n, e), Ao(e), c & pn) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var re = e.stateNode, te = e.memoizedProps, he = o !== null ? o.memoizedProps : te;
            try {
              JT(re, he, te);
            } catch (qt) {
              Yn(e, e.return, qt);
            }
          }
          return;
        }
        case C: {
          if (Wl(n, e), Ao(e), c & pn && o !== null) {
            var ge = o.memoizedState;
            if (ge.isDehydrated)
              try {
                CR(n.containerInfo);
              } catch (qt) {
                Yn(e, e.return, qt);
              }
          }
          return;
        }
        case R: {
          Wl(n, e), Ao(e);
          return;
        }
        case H: {
          Wl(n, e), Ao(e);
          var Te = e.child;
          if (Te.flags & mr) {
            var st = Te.stateNode, Nt = Te.memoizedState, _t = Nt !== null;
            if (st.isHidden = _t, _t) {
              var mn = Te.alternate !== null && Te.alternate.memoizedState !== null;
              mn || wk();
            }
          }
          if (c & pn) {
            try {
              $_(e);
            } catch (qt) {
              Yn(e, e.return, qt);
            }
            Qx(e);
          }
          return;
        }
        case W: {
          var fn = o !== null && o.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & ln
          ) {
            var ce = xa;
            xa = ce || fn, Wl(n, e), xa = ce;
          } else
            Wl(n, e);
          if (Ao(e), c & mr) {
            var Re = e.stateNode, fe = e.memoizedState, Qe = fe !== null, mt = e;
            if (Re.isHidden = Qe, Qe && !fn && (mt.mode & ln) !== zt) {
              bt = mt;
              for (var ut = mt.child; ut !== null; )
                bt = ut, q_(ut), ut = ut.sibling;
            }
            N_(mt, Qe);
          }
          return;
        }
        case J: {
          Wl(n, e), Ao(e), c & pn && Qx(e);
          return;
        }
        case ee:
          return;
        default: {
          Wl(n, e), Ao(e);
          return;
        }
      }
    }
    function Ao(e) {
      var n = e.flags;
      if (n & er) {
        try {
          F_(e);
        } catch (l) {
          Yn(e, e.return, l);
        }
        e.flags &= ~er;
      }
      n & Da && (e.flags &= ~Da);
    }
    function I_(e, n, l) {
      Ld = l, Nd = n, bt = e, Xx(e, n, l), Ld = null, Nd = null;
    }
    function Xx(e, n, l) {
      for (var o = (e.mode & ln) !== zt; bt !== null; ) {
        var c = bt, h = c.child;
        if (c.tag === W && o) {
          var S = c.memoizedState !== null, T = S || l0;
          if (T) {
            HS(e, n, l);
            continue;
          } else {
            var M = c.alternate, L = M !== null && M.memoizedState !== null, j = L || xa, re = l0, te = xa;
            l0 = T, xa = j, xa && !te && (bt = c, Y_(c));
            for (var he = h; he !== null; )
              bt = he, Xx(
                he,
                // New root; bubble back up to here and stop.
                n,
                l
              ), he = he.sibling;
            bt = c, l0 = re, xa = te, HS(e, n, l);
            continue;
          }
        }
        (c.subtreeFlags & fo) !== At && h !== null ? (h.return = c, bt = h) : HS(e, n, l);
      }
    }
    function HS(e, n, l) {
      for (; bt !== null; ) {
        var o = bt;
        if ((o.flags & fo) !== At) {
          var c = o.alternate;
          On(o);
          try {
            z_(n, c, o, l);
          } catch (S) {
            Yn(o, o.return, S);
          }
          qn();
        }
        if (o === e) {
          bt = null;
          return;
        }
        var h = o.sibling;
        if (h !== null) {
          h.return = o.return, bt = h;
          return;
        }
        bt = o.return;
      }
    }
    function q_(e) {
      for (; bt !== null; ) {
        var n = bt, l = n.child;
        switch (n.tag) {
          case g:
          case P:
          case I:
          case V: {
            if (n.mode & Cn)
              try {
                Oo(), ql(Gr, n, n.return);
              } finally {
                Do(n);
              }
            else
              ql(Gr, n, n.return);
            break;
          }
          case x: {
            Ud(n, n.return);
            var o = n.stateNode;
            typeof o.componentWillUnmount == "function" && FS(n, n.return, o);
            break;
          }
          case _: {
            Ud(n, n.return);
            break;
          }
          case W: {
            var c = n.memoizedState !== null;
            if (c) {
              Kx(e);
              continue;
            }
            break;
          }
        }
        l !== null ? (l.return = n, bt = l) : Kx(e);
      }
    }
    function Kx(e) {
      for (; bt !== null; ) {
        var n = bt;
        if (n === e) {
          bt = null;
          return;
        }
        var l = n.sibling;
        if (l !== null) {
          l.return = n.return, bt = l;
          return;
        }
        bt = n.return;
      }
    }
    function Y_(e) {
      for (; bt !== null; ) {
        var n = bt, l = n.child;
        if (n.tag === W) {
          var o = n.memoizedState !== null;
          if (o) {
            Zx(e);
            continue;
          }
        }
        l !== null ? (l.return = n, bt = l) : Zx(e);
      }
    }
    function Zx(e) {
      for (; bt !== null; ) {
        var n = bt;
        On(n);
        try {
          L_(n);
        } catch (o) {
          Yn(n, n.return, o);
        }
        if (qn(), n === e) {
          bt = null;
          return;
        }
        var l = n.sibling;
        if (l !== null) {
          l.return = n.return, bt = l;
          return;
        }
        bt = n.return;
      }
    }
    function W_(e, n, l, o) {
      bt = n, G_(n, e, l, o);
    }
    function G_(e, n, l, o) {
      for (; bt !== null; ) {
        var c = bt, h = c.child;
        (c.subtreeFlags & kl) !== At && h !== null ? (h.return = c, bt = h) : Q_(e, n, l, o);
      }
    }
    function Q_(e, n, l, o) {
      for (; bt !== null; ) {
        var c = bt;
        if ((c.flags & ka) !== At) {
          On(c);
          try {
            B_(n, c, l, o);
          } catch (S) {
            Yn(c, c.return, S);
          }
          qn();
        }
        if (c === e) {
          bt = null;
          return;
        }
        var h = c.sibling;
        if (h !== null) {
          h.return = c.return, bt = h;
          return;
        }
        bt = c.return;
      }
    }
    function B_(e, n, l, o) {
      switch (n.tag) {
        case g:
        case P:
        case V: {
          if (n.mode & Cn) {
            lS();
            try {
              wu(Sa | Wr, n);
            } finally {
              iS(n);
            }
          } else
            wu(Sa | Wr, n);
          break;
        }
      }
    }
    function X_(e) {
      bt = e, K_();
    }
    function K_() {
      for (; bt !== null; ) {
        var e = bt, n = e.child;
        if ((bt.flags & ui) !== At) {
          var l = e.deletions;
          if (l !== null) {
            for (var o = 0; o < l.length; o++) {
              var c = l[o];
              bt = c, ek(c, e);
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
            bt = e;
          }
        }
        (e.subtreeFlags & kl) !== At && n !== null ? (n.return = e, bt = n) : Z_();
      }
    }
    function Z_() {
      for (; bt !== null; ) {
        var e = bt;
        (e.flags & ka) !== At && (On(e), J_(e), qn());
        var n = e.sibling;
        if (n !== null) {
          n.return = e.return, bt = n;
          return;
        }
        bt = e.return;
      }
    }
    function J_(e) {
      switch (e.tag) {
        case g:
        case P:
        case V: {
          e.mode & Cn ? (lS(), ql(Sa | Wr, e, e.return), iS(e)) : ql(Sa | Wr, e, e.return);
          break;
        }
      }
    }
    function ek(e, n) {
      for (; bt !== null; ) {
        var l = bt;
        On(l), nk(l, n), qn();
        var o = l.child;
        o !== null ? (o.return = l, bt = o) : tk(e);
      }
    }
    function tk(e) {
      for (; bt !== null; ) {
        var n = bt, l = n.sibling, o = n.return;
        if (qx(n), n === e) {
          bt = null;
          return;
        }
        if (l !== null) {
          l.return = o, bt = l;
          return;
        }
        bt = o;
      }
    }
    function nk(e, n) {
      switch (e.tag) {
        case g:
        case P:
        case V: {
          e.mode & Cn ? (lS(), ql(Sa, e, n), iS(e)) : ql(Sa, e, n);
          break;
        }
      }
    }
    function rk(e) {
      switch (e.tag) {
        case g:
        case P:
        case V: {
          try {
            wu(Gr | Wr, e);
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
    function ak(e) {
      switch (e.tag) {
        case g:
        case P:
        case V: {
          try {
            wu(Sa | Wr, e);
          } catch (n) {
            Yn(e, e.return, n);
          }
          break;
        }
      }
    }
    function ik(e) {
      switch (e.tag) {
        case g:
        case P:
        case V: {
          try {
            ql(Gr | Wr, e, e.return);
          } catch (l) {
            Yn(e, e.return, l);
          }
          break;
        }
        case x: {
          var n = e.stateNode;
          typeof n.componentWillUnmount == "function" && FS(e, e.return, n);
          break;
        }
      }
    }
    function lk(e) {
      switch (e.tag) {
        case g:
        case P:
        case V:
          try {
            ql(Sa | Wr, e, e.return);
          } catch (n) {
            Yn(e, e.return, n);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Wv = Symbol.for;
      Wv("selector.component"), Wv("selector.has_pseudo_class"), Wv("selector.role"), Wv("selector.test_id"), Wv("selector.text");
    }
    var ok = [];
    function sk() {
      ok.forEach(function(e) {
        return e();
      });
    }
    var uk = s.ReactCurrentActQueue;
    function ck(e) {
      {
        var n = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), l = typeof jest < "u";
        return l && n !== !1;
      }
    }
    function Jx() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && uk.current !== null && v("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var fk = Math.ceil, VS = s.ReactCurrentDispatcher, IS = s.ReactCurrentOwner, ba = s.ReactCurrentBatchConfig, Gl = s.ReactCurrentActQueue, Xr = (
      /*             */
      0
    ), ew = (
      /*               */
      1
    ), Ca = (
      /*                */
      2
    ), pl = (
      /*                */
      4
    ), Cs = 0, Gv = 1, Wc = 2, s0 = 3, Qv = 4, tw = 5, qS = 6, hn = Xr, Ja = null, dr = null, Kr = Ue, zo = Ue, YS = pu(Ue), Zr = Cs, Bv = null, u0 = Ue, Xv = Ue, c0 = Ue, Kv = null, xi = null, WS = 0, nw = 500, rw = 1 / 0, dk = 500, Ts = null;
    function Zv() {
      rw = kr() + dk;
    }
    function aw() {
      return rw;
    }
    var f0 = !1, GS = null, jd = null, Gc = !1, Cu = null, Jv = Ue, QS = [], BS = null, pk = 50, eh = 0, XS = null, KS = !1, d0 = !1, vk = 50, Fd = 0, p0 = null, th = jn, v0 = Ue, iw = !1;
    function h0() {
      return Ja;
    }
    function ei() {
      return (hn & (Ca | pl)) !== Xr ? kr() : (th !== jn || (th = kr()), th);
    }
    function Tu(e) {
      var n = e.mode;
      if ((n & ln) === zt)
        return Vt;
      if ((hn & Ca) !== Xr && Kr !== Ue)
        return vc(Kr);
      var l = uM() !== sM;
      if (l) {
        if (ba.transition !== null) {
          var o = ba.transition;
          o._updatedFibers || (o._updatedFibers = /* @__PURE__ */ new Set()), o._updatedFibers.add(e);
        }
        return v0 === wn && (v0 = Ip()), v0;
      }
      var c = mi();
      if (c !== wn)
        return c;
      var h = GT();
      return h;
    }
    function hk(e) {
      var n = e.mode;
      return (n & ln) === zt ? Vt : Sm();
    }
    function Jr(e, n, l, o) {
      Pk(), iw && v("useInsertionEffect must not schedule updates."), KS && (d0 = !0), nu(e, l, o), (hn & Ca) !== Ue && e === Ja ? Vk(n) : (za && yc(e, n, l), Ik(n), e === Ja && ((hn & Ca) === Xr && (Xv = en(Xv, l)), Zr === Qv && Ru(e, Kr)), wi(e, o), l === Vt && hn === Xr && (n.mode & ln) === zt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Gl.isBatchingLegacy && (Zv(), iE()));
    }
    function mk(e, n, l) {
      var o = e.current;
      o.lanes = n, nu(e, n, l), wi(e, l);
    }
    function yk(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (hn & Ca) !== Xr
      );
    }
    function wi(e, n) {
      var l = e.callbackNode;
      Gf(e, n);
      var o = Wf(e, e === Ja ? Kr : Ue);
      if (o === Ue) {
        l !== null && xw(l), e.callbackNode = null, e.callbackPriority = wn;
        return;
      }
      var c = yo(o), h = e.callbackPriority;
      if (h === c && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(Gl.current !== null && l !== a2)) {
        l == null && h !== Vt && v("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      l != null && xw(l);
      var S;
      if (c === Vt)
        e.tag === vu ? (Gl.isBatchingLegacy !== null && (Gl.didScheduleLegacyUpdate = !0), YR(sw.bind(null, e))) : aE(sw.bind(null, e)), Gl.current !== null ? Gl.current.push(hu) : BT(function() {
          (hn & (Ca | pl)) === Xr && hu();
        }), S = null;
      else {
        var T;
        switch (Rm(o)) {
          case pa:
            T = ec;
            break;
          case rl:
            T = po;
            break;
          case vi:
            T = Dl;
            break;
          case hi:
            T = Zo;
            break;
          default:
            T = Dl;
            break;
        }
        S = i2(T, lw.bind(null, e));
      }
      e.callbackPriority = c, e.callbackNode = S;
    }
    function lw(e, n) {
      if (NM(), th = jn, v0 = Ue, (hn & (Ca | pl)) !== Xr)
        throw new Error("Should not already be working.");
      var l = e.callbackNode, o = Ms();
      if (o && e.callbackNode !== l)
        return null;
      var c = Wf(e, e === Ja ? Kr : Ue);
      if (c === Ue)
        return null;
      var h = !Bf(e, c) && !gm(e, c) && !n, S = h ? Mk(e, c) : y0(e, c);
      if (S !== Cs) {
        if (S === Wc) {
          var T = Qf(e);
          T !== Ue && (c = T, S = ZS(e, T));
        }
        if (S === Gv) {
          var M = Bv;
          throw Qc(e, Ue), Ru(e, c), wi(e, kr()), M;
        }
        if (S === qS)
          Ru(e, c);
        else {
          var L = !Bf(e, c), j = e.current.alternate;
          if (L && !Sk(j)) {
            if (S = y0(e, c), S === Wc) {
              var re = Qf(e);
              re !== Ue && (c = re, S = ZS(e, re));
            }
            if (S === Gv) {
              var te = Bv;
              throw Qc(e, Ue), Ru(e, c), wi(e, kr()), te;
            }
          }
          e.finishedWork = j, e.finishedLanes = c, gk(e, S, c);
        }
      }
      return wi(e, kr()), e.callbackNode === l ? lw.bind(null, e) : null;
    }
    function ZS(e, n) {
      var l = Kv;
      if (Zf(e)) {
        var o = Qc(e, n);
        o.flags |= ea, FR(e.containerInfo);
      }
      var c = y0(e, n);
      if (c !== Wc) {
        var h = xi;
        xi = l, h !== null && ow(h);
      }
      return c;
    }
    function ow(e) {
      xi === null ? xi = e : xi.push.apply(xi, e);
    }
    function gk(e, n, l) {
      switch (n) {
        case Cs:
        case Gv:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case Wc: {
          Bc(e, xi, Ts);
          break;
        }
        case s0: {
          if (Ru(e, l), us(l) && // do not delay if we're inside an act() scope
          !ww()) {
            var o = WS + nw - kr();
            if (o > 10) {
              var c = Wf(e, Ue);
              if (c !== Ue)
                break;
              var h = e.suspendedLanes;
              if (!cs(h, l)) {
                ei(), Xf(e, h);
                break;
              }
              e.timeoutHandle = B1(Bc.bind(null, e, xi, Ts), o);
              break;
            }
          }
          Bc(e, xi, Ts);
          break;
        }
        case Qv: {
          if (Ru(e, l), Hp(l))
            break;
          if (!ww()) {
            var S = Ui(e, l), T = S, M = kr() - T, L = Fk(M) - M;
            if (L > 10) {
              e.timeoutHandle = B1(Bc.bind(null, e, xi, Ts), L);
              break;
            }
          }
          Bc(e, xi, Ts);
          break;
        }
        case tw: {
          Bc(e, xi, Ts);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function Sk(e) {
      for (var n = e; ; ) {
        if (n.flags & Ks) {
          var l = n.updateQueue;
          if (l !== null) {
            var o = l.stores;
            if (o !== null)
              for (var c = 0; c < o.length; c++) {
                var h = o[c], S = h.getSnapshot, T = h.value;
                try {
                  if (!Ve(S(), T))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var M = n.child;
        if (n.subtreeFlags & Ks && M !== null) {
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
    function Ru(e, n) {
      n = hc(n, c0), n = hc(n, Xv), wm(e, n);
    }
    function sw(e) {
      if (UM(), (hn & (Ca | pl)) !== Xr)
        throw new Error("Should not already be working.");
      Ms();
      var n = Wf(e, Ue);
      if (!Na(n, Vt))
        return wi(e, kr()), null;
      var l = y0(e, n);
      if (e.tag !== vu && l === Wc) {
        var o = Qf(e);
        o !== Ue && (n = o, l = ZS(e, o));
      }
      if (l === Gv) {
        var c = Bv;
        throw Qc(e, Ue), Ru(e, n), wi(e, kr()), c;
      }
      if (l === qS)
        throw new Error("Root did not complete. This is a bug in React.");
      var h = e.current.alternate;
      return e.finishedWork = h, e.finishedLanes = n, Bc(e, xi, Ts), wi(e, kr()), null;
    }
    function Ek(e, n) {
      n !== Ue && (Kf(e, en(n, Vt)), wi(e, kr()), (hn & (Ca | pl)) === Xr && (Zv(), hu()));
    }
    function JS(e, n) {
      var l = hn;
      hn |= ew;
      try {
        return e(n);
      } finally {
        hn = l, hn === Xr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !Gl.isBatchingLegacy && (Zv(), iE());
      }
    }
    function xk(e, n, l, o, c) {
      var h = mi(), S = ba.transition;
      try {
        return ba.transition = null, Er(pa), e(n, l, o, c);
      } finally {
        Er(h), ba.transition = S, hn === Xr && Zv();
      }
    }
    function Rs(e) {
      Cu !== null && Cu.tag === vu && (hn & (Ca | pl)) === Xr && Ms();
      var n = hn;
      hn |= ew;
      var l = ba.transition, o = mi();
      try {
        return ba.transition = null, Er(pa), e ? e() : void 0;
      } finally {
        Er(o), ba.transition = l, hn = n, (hn & (Ca | pl)) === Xr && hu();
      }
    }
    function uw() {
      return (hn & (Ca | pl)) !== Xr;
    }
    function m0(e, n) {
      $a(YS, zo, e), zo = en(zo, n);
    }
    function e2(e) {
      zo = YS.current, Pa(YS, e);
    }
    function Qc(e, n) {
      e.finishedWork = null, e.finishedLanes = Ue;
      var l = e.timeoutHandle;
      if (l !== X1 && (e.timeoutHandle = X1, QT(l)), dr !== null)
        for (var o = dr.return; o !== null; ) {
          var c = o.alternate;
          Fx(c, o), o = o.return;
        }
      Ja = e;
      var h = Xc(e.current, null);
      return dr = h, Kr = zo = n, Zr = Cs, Bv = null, u0 = Ue, Xv = Ue, c0 = Ue, Kv = null, xi = null, mM(), Pl.discardPendingWarnings(), h;
    }
    function cw(e, n) {
      do {
        var l = dr;
        try {
          if (Ry(), LE(), qn(), IS.current = null, l === null || l.return === null) {
            Zr = Gv, Bv = n, dr = null;
            return;
          }
          if (be && l.mode & Cn && t0(l, !0), xe)
            if (Ba(), n !== null && typeof n == "object" && typeof n.then == "function") {
              var o = n;
              nl(l, o, Kr);
            } else
              nc(l, n, Kr);
          YM(e, l.return, l, n, Kr), vw(l);
        } catch (c) {
          n = c, dr === l && l !== null ? (l = l.return, dr = l) : l = dr;
          continue;
        }
        return;
      } while (!0);
    }
    function fw() {
      var e = VS.current;
      return VS.current = Xy, e === null ? Xy : e;
    }
    function dw(e) {
      VS.current = e;
    }
    function wk() {
      WS = kr();
    }
    function nh(e) {
      u0 = en(e, u0);
    }
    function bk() {
      Zr === Cs && (Zr = s0);
    }
    function t2() {
      (Zr === Cs || Zr === s0 || Zr === Wc) && (Zr = Qv), Ja !== null && (pc(u0) || pc(Xv)) && Ru(Ja, Kr);
    }
    function Ck(e) {
      Zr !== Qv && (Zr = Wc), Kv === null ? Kv = [e] : Kv.push(e);
    }
    function Tk() {
      return Zr === Cs;
    }
    function y0(e, n) {
      var l = hn;
      hn |= Ca;
      var o = fw();
      if (Ja !== e || Kr !== n) {
        if (za) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (rh(e, Kr), c.clear()), bm(e, n);
        }
        Ts = Gp(), Qc(e, n);
      }
      ns(n);
      do
        try {
          Rk();
          break;
        } catch (h) {
          cw(e, h);
        }
      while (!0);
      if (Ry(), hn = l, dw(o), dr !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return _f(), Ja = null, Kr = Ue, Zr;
    }
    function Rk() {
      for (; dr !== null; )
        pw(dr);
    }
    function Mk(e, n) {
      var l = hn;
      hn |= Ca;
      var o = fw();
      if (Ja !== e || Kr !== n) {
        if (za) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (rh(e, Kr), c.clear()), bm(e, n);
        }
        Ts = Gp(), Zv(), Qc(e, n);
      }
      ns(n);
      do
        try {
          _k();
          break;
        } catch (h) {
          cw(e, h);
        }
      while (!0);
      return Ry(), dw(o), hn = l, dr !== null ? (vm(), Cs) : (_f(), Ja = null, Kr = Ue, Zr);
    }
    function _k() {
      for (; dr !== null && !Rp(); )
        pw(dr);
    }
    function pw(e) {
      var n = e.alternate;
      On(e);
      var l;
      (e.mode & Cn) !== zt ? (aS(e), l = n2(n, e, zo), t0(e, !0)) : l = n2(n, e, zo), qn(), e.memoizedProps = e.pendingProps, l === null ? vw(e) : dr = l, IS.current = null;
    }
    function vw(e) {
      var n = e;
      do {
        var l = n.alternate, o = n.return;
        if ((n.flags & Ju) === At) {
          On(n);
          var c = void 0;
          if ((n.mode & Cn) === zt ? c = jx(l, n, zo) : (aS(n), c = jx(l, n, zo), t0(n, !1)), qn(), c !== null) {
            dr = c;
            return;
          }
        } else {
          var h = b_(l, n);
          if (h !== null) {
            h.flags &= sm, dr = h;
            return;
          }
          if ((n.mode & Cn) !== zt) {
            t0(n, !1);
            for (var S = n.actualDuration, T = n.child; T !== null; )
              S += T.actualDuration, T = T.sibling;
            n.actualDuration = S;
          }
          if (o !== null)
            o.flags |= Ju, o.subtreeFlags = At, o.deletions = null;
          else {
            Zr = qS, dr = null;
            return;
          }
        }
        var M = n.sibling;
        if (M !== null) {
          dr = M;
          return;
        }
        n = o, dr = n;
      } while (n !== null);
      Zr === Cs && (Zr = tw);
    }
    function Bc(e, n, l) {
      var o = mi(), c = ba.transition;
      try {
        ba.transition = null, Er(pa), kk(e, n, l, o);
      } finally {
        ba.transition = c, Er(o);
      }
      return null;
    }
    function kk(e, n, l, o) {
      do
        Ms();
      while (Cu !== null);
      if ($k(), (hn & (Ca | pl)) !== Xr)
        throw new Error("Should not already be working.");
      var c = e.finishedWork, h = e.finishedLanes;
      if (Ap(h), c === null)
        return zp(), null;
      if (h === Ue && v("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Ue, c === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = wn;
      var S = en(c.lanes, c.childLanes);
      Yp(e, S), e === Ja && (Ja = null, dr = null, Kr = Ue), ((c.subtreeFlags & kl) !== At || (c.flags & kl) !== At) && (Gc || (Gc = !0, BS = l, i2(Dl, function() {
        return Ms(), null;
      })));
      var T = (c.subtreeFlags & (uo | co | fo | kl)) !== At, M = (c.flags & (uo | co | fo | kl)) !== At;
      if (T || M) {
        var L = ba.transition;
        ba.transition = null;
        var j = mi();
        Er(pa);
        var re = hn;
        hn |= pl, IS.current = null, __(e, c), ix(), V_(e, c, h), HT(e.containerInfo), e.current = c, rc(h), I_(c, e, h), ac(), Mp(), hn = re, Er(j), ba.transition = L;
      } else
        e.current = c, ix();
      var te = Gc;
      if (Gc ? (Gc = !1, Cu = e, Jv = h) : (Fd = 0, p0 = null), S = e.pendingLanes, S === Ue && (jd = null), te || gw(e.current, !1), kp(c.stateNode, o), za && e.memoizedUpdaters.clear(), sk(), wi(e, kr()), n !== null)
        for (var he = e.onRecoverableError, ge = 0; ge < n.length; ge++) {
          var Te = n[ge], st = Te.stack, Nt = Te.digest;
          he(Te.value, {
            componentStack: st,
            digest: Nt
          });
        }
      if (f0) {
        f0 = !1;
        var _t = GS;
        throw GS = null, _t;
      }
      return Na(Jv, Vt) && e.tag !== vu && Ms(), S = e.pendingLanes, Na(S, Vt) ? (LM(), e === XS ? eh++ : (eh = 0, XS = e)) : eh = 0, hu(), zp(), null;
    }
    function Ms() {
      if (Cu !== null) {
        var e = Rm(Jv), n = Sc(vi, e), l = ba.transition, o = mi();
        try {
          return ba.transition = null, Er(n), Ok();
        } finally {
          Er(o), ba.transition = l;
        }
      }
      return !1;
    }
    function Dk(e) {
      QS.push(e), Gc || (Gc = !0, i2(Dl, function() {
        return Ms(), null;
      }));
    }
    function Ok() {
      if (Cu === null)
        return !1;
      var e = BS;
      BS = null;
      var n = Cu, l = Jv;
      if (Cu = null, Jv = Ue, (hn & (Ca | pl)) !== Xr)
        throw new Error("Cannot flush passive effects while already rendering.");
      KS = !0, d0 = !1, ts(l);
      var o = hn;
      hn |= pl, X_(n.current), W_(n, n.current, l, e);
      {
        var c = QS;
        QS = [];
        for (var h = 0; h < c.length; h++) {
          var S = c[h];
          A_(n, S);
        }
      }
      Up(), gw(n.current, !0), hn = o, hu(), d0 ? n === p0 ? Fd++ : (Fd = 0, p0 = n) : Fd = 0, KS = !1, d0 = !1, Dp(n);
      {
        var T = n.current.stateNode;
        T.effectDuration = 0, T.passiveEffectDuration = 0;
      }
      return !0;
    }
    function hw(e) {
      return jd !== null && jd.has(e);
    }
    function Ak(e) {
      jd === null ? jd = /* @__PURE__ */ new Set([e]) : jd.add(e);
    }
    function zk(e) {
      f0 || (f0 = !0, GS = e);
    }
    var Lk = zk;
    function mw(e, n, l) {
      var o = qc(l, n), c = px(e, o, Vt), h = yu(e, c, Vt), S = ei();
      h !== null && (nu(h, Vt, S), wi(h, S));
    }
    function Yn(e, n, l) {
      if (T_(l), ah(!1), e.tag === C) {
        mw(e, e, l);
        return;
      }
      var o = null;
      for (o = n; o !== null; ) {
        if (o.tag === C) {
          mw(o, e, l);
          return;
        } else if (o.tag === x) {
          var c = o.type, h = o.stateNode;
          if (typeof c.getDerivedStateFromError == "function" || typeof h.componentDidCatch == "function" && !hw(h)) {
            var S = qc(l, e), T = wS(o, S, Vt), M = yu(o, T, Vt), L = ei();
            M !== null && (nu(M, Vt, L), wi(M, L));
            return;
          }
        }
        o = o.return;
      }
      v(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, l);
    }
    function Nk(e, n, l) {
      var o = e.pingCache;
      o !== null && o.delete(n);
      var c = ei();
      Xf(e, l), qk(e), Ja === e && cs(Kr, l) && (Zr === Qv || Zr === s0 && us(Kr) && kr() - WS < nw ? Qc(e, Ue) : c0 = en(c0, l)), wi(e, c);
    }
    function yw(e, n) {
      n === wn && (n = hk(e));
      var l = ei(), o = Si(e, n);
      o !== null && (nu(o, n, l), wi(o, l));
    }
    function Uk(e) {
      var n = e.memoizedState, l = wn;
      n !== null && (l = n.retryLane), yw(e, l);
    }
    function jk(e, n) {
      var l = wn, o;
      switch (e.tag) {
        case H:
          o = e.stateNode;
          var c = e.memoizedState;
          c !== null && (l = c.retryLane);
          break;
        case J:
          o = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      o !== null && o.delete(n), yw(e, l);
    }
    function Fk(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : fk(e / 1960) * 1960;
    }
    function Pk() {
      if (eh > pk)
        throw eh = 0, XS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Fd > vk && (Fd = 0, p0 = null, v("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function $k() {
      Pl.flushLegacyContextWarning(), Pl.flushPendingUnsafeLifecycleWarnings();
    }
    function gw(e, n) {
      On(e), g0(e, so, ik), n && g0(e, Ji, lk), g0(e, so, rk), n && g0(e, Ji, ak), qn();
    }
    function g0(e, n, l) {
      for (var o = e, c = null; o !== null; ) {
        var h = o.subtreeFlags & n;
        o !== c && o.child !== null && h !== At ? o = o.child : ((o.flags & n) !== At && l(o), o.sibling !== null ? o = o.sibling : o = c = o.return);
      }
    }
    var S0 = null;
    function Sw(e) {
      {
        if ((hn & Ca) !== Xr || !(e.mode & ln))
          return;
        var n = e.tag;
        if (n !== b && n !== C && n !== x && n !== g && n !== P && n !== I && n !== V)
          return;
        var l = Qt(e) || "ReactComponent";
        if (S0 !== null) {
          if (S0.has(l))
            return;
          S0.add(l);
        } else
          S0 = /* @__PURE__ */ new Set([l]);
        var o = Hr;
        try {
          On(e), v("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          o ? On(e) : qn();
        }
      }
    }
    var n2;
    {
      var Hk = null;
      n2 = function(e, n, l) {
        var o = Mw(Hk, n);
        try {
          return Ax(e, n, l);
        } catch (h) {
          if (JR() || h !== null && typeof h == "object" && typeof h.then == "function")
            throw h;
          if (Ry(), LE(), Fx(e, n), Mw(n, o), n.mode & Cn && aS(n), oo(null, Ax, null, e, n, l), Ml()) {
            var c = Zu();
            typeof c == "object" && c !== null && c._suppressLogging && typeof h == "object" && h !== null && !h._suppressLogging && (h._suppressLogging = !0);
          }
          throw h;
        }
      };
    }
    var Ew = !1, r2;
    r2 = /* @__PURE__ */ new Set();
    function Vk(e) {
      if (Wi && !OM())
        switch (e.tag) {
          case g:
          case P:
          case V: {
            var n = dr && Qt(dr) || "Unknown", l = n;
            if (!r2.has(l)) {
              r2.add(l);
              var o = Qt(e) || "Unknown";
              v("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", o, n, n);
            }
            break;
          }
          case x: {
            Ew || (v("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), Ew = !0);
            break;
          }
        }
    }
    function rh(e, n) {
      if (za) {
        var l = e.memoizedUpdaters;
        l.forEach(function(o) {
          yc(e, o, n);
        });
      }
    }
    var a2 = {};
    function i2(e, n) {
      {
        var l = Gl.current;
        return l !== null ? (l.push(n), a2) : Tp(e, n);
      }
    }
    function xw(e) {
      if (e !== a2)
        return cm(e);
    }
    function ww() {
      return Gl.current !== null;
    }
    function Ik(e) {
      {
        if (e.mode & ln) {
          if (!Jx())
            return;
        } else if (!ck() || hn !== Xr || e.tag !== g && e.tag !== P && e.tag !== V)
          return;
        if (Gl.current === null) {
          var n = Hr;
          try {
            On(e), v(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Qt(e));
          } finally {
            n ? On(e) : qn();
          }
        }
      }
    }
    function qk(e) {
      e.tag !== vu && Jx() && Gl.current === null && v(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function ah(e) {
      iw = e;
    }
    var vl = null, Pd = null, Yk = function(e) {
      vl = e;
    };
    function $d(e) {
      {
        if (vl === null)
          return e;
        var n = vl(e);
        return n === void 0 ? e : n.current;
      }
    }
    function l2(e) {
      return $d(e);
    }
    function o2(e) {
      {
        if (vl === null)
          return e;
        var n = vl(e);
        if (n === void 0) {
          if (e != null && typeof e.render == "function") {
            var l = $d(e.render);
            if (e.render !== l) {
              var o = {
                $$typeof: ze,
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
    function bw(e, n) {
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
            (typeof o == "function" || h === It) && (c = !0);
            break;
          }
          case P: {
            (h === ze || h === It) && (c = !0);
            break;
          }
          case I:
          case V: {
            (h === Yt || h === It) && (c = !0);
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
    function Cw(e) {
      {
        if (vl === null || typeof WeakSet != "function")
          return;
        Pd === null && (Pd = /* @__PURE__ */ new WeakSet()), Pd.add(e);
      }
    }
    var Wk = function(e, n) {
      {
        if (vl === null)
          return;
        var l = n.staleFamilies, o = n.updatedFamilies;
        Ms(), Rs(function() {
          s2(e.current, o, l);
        });
      }
    }, Gk = function(e, n) {
      {
        if (e.context !== Pi)
          return;
        Ms(), Rs(function() {
          ih(n, e, null, null);
        });
      }
    };
    function s2(e, n, l) {
      {
        var o = e.alternate, c = e.child, h = e.sibling, S = e.tag, T = e.type, M = null;
        switch (S) {
          case g:
          case V:
          case x:
            M = T;
            break;
          case P:
            M = T.render;
            break;
        }
        if (vl === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var L = !1, j = !1;
        if (M !== null) {
          var re = vl(M);
          re !== void 0 && (l.has(re) ? j = !0 : n.has(re) && (S === x ? j = !0 : L = !0));
        }
        if (Pd !== null && (Pd.has(e) || o !== null && Pd.has(o)) && (j = !0), j && (e._debugNeedsRemount = !0), j || L) {
          var te = Si(e, Vt);
          te !== null && Jr(te, e, Vt, jn);
        }
        c !== null && !j && s2(c, n, l), h !== null && s2(h, n, l);
      }
    }
    var Qk = function(e, n) {
      {
        var l = /* @__PURE__ */ new Set(), o = new Set(n.map(function(c) {
          return c.current;
        }));
        return u2(e.current, o, l), l;
      }
    };
    function u2(e, n, l) {
      {
        var o = e.child, c = e.sibling, h = e.tag, S = e.type, T = null;
        switch (h) {
          case g:
          case V:
          case x:
            T = S;
            break;
          case P:
            T = S.render;
            break;
        }
        var M = !1;
        T !== null && n.has(T) && (M = !0), M ? Bk(e, l) : o !== null && u2(o, n, l), c !== null && u2(c, n, l);
      }
    }
    function Bk(e, n) {
      {
        var l = Xk(e, n);
        if (l)
          return;
        for (var o = e; ; ) {
          switch (o.tag) {
            case _:
              n.add(o.stateNode);
              return;
            case R:
              n.add(o.stateNode.containerInfo);
              return;
            case C:
              n.add(o.stateNode.containerInfo);
              return;
          }
          if (o.return === null)
            throw new Error("Expected to reach root first.");
          o = o.return;
        }
      }
    }
    function Xk(e, n) {
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
    var c2;
    {
      c2 = !1;
      try {
        var Tw = Object.preventExtensions({});
      } catch {
        c2 = !0;
      }
    }
    function Kk(e, n, l, o) {
      this.tag = e, this.key = l, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = n, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = o, this.flags = At, this.subtreeFlags = At, this.deletions = null, this.lanes = Ue, this.childLanes = Ue, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !c2 && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var $i = function(e, n, l, o) {
      return new Kk(e, n, l, o);
    };
    function f2(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function Zk(e) {
      return typeof e == "function" && !f2(e) && e.defaultProps === void 0;
    }
    function Jk(e) {
      if (typeof e == "function")
        return f2(e) ? x : g;
      if (e != null) {
        var n = e.$$typeof;
        if (n === ze)
          return P;
        if (n === Yt)
          return I;
      }
      return b;
    }
    function Xc(e, n) {
      var l = e.alternate;
      l === null ? (l = $i(e.tag, n, e.key, e.mode), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l._debugSource = e._debugSource, l._debugOwner = e._debugOwner, l._debugHookTypes = e._debugHookTypes, l.alternate = e, e.alternate = l) : (l.pendingProps = n, l.type = e.type, l.flags = At, l.subtreeFlags = At, l.deletions = null, l.actualDuration = 0, l.actualStartTime = -1), l.flags = e.flags & yr, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue;
      var o = e.dependencies;
      switch (l.dependencies = o === null ? null : {
        lanes: o.lanes,
        firstContext: o.firstContext
      }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.selfBaseDuration = e.selfBaseDuration, l.treeBaseDuration = e.treeBaseDuration, l._debugNeedsRemount = e._debugNeedsRemount, l.tag) {
        case b:
        case g:
        case V:
          l.type = $d(e.type);
          break;
        case x:
          l.type = l2(e.type);
          break;
        case P:
          l.type = o2(e.type);
          break;
      }
      return l;
    }
    function eD(e, n) {
      e.flags &= yr | er;
      var l = e.alternate;
      if (l === null)
        e.childLanes = Ue, e.lanes = n, e.child = null, e.subtreeFlags = At, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = At, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type;
        var o = l.dependencies;
        e.dependencies = o === null ? null : {
          lanes: o.lanes,
          firstContext: o.firstContext
        }, e.selfBaseDuration = l.selfBaseDuration, e.treeBaseDuration = l.treeBaseDuration;
      }
      return e;
    }
    function tD(e, n, l) {
      var o;
      return e === my ? (o = ln, n === !0 && (o |= Ln, o |= Tn)) : o = zt, za && (o |= Cn), $i(C, null, null, o);
    }
    function d2(e, n, l, o, c, h) {
      var S = b, T = e;
      if (typeof e == "function")
        f2(e) ? (S = x, T = l2(T)) : T = $d(T);
      else if (typeof e == "string")
        S = _;
      else
        e: switch (e) {
          case Ra:
            return Mu(l.children, c, h, n);
          case oa:
            S = z, c |= Ln, (c & ln) !== zt && (c |= Tn);
            break;
          case Ya:
            return nD(l, c, h, n);
          case nt:
            return rD(l, c, h, n);
          case dt:
            return aD(l, c, h, n);
          case Qn:
            return Rw(l, c, h, n);
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
                case zr:
                  S = Y;
                  break e;
                case Q:
                  S = F;
                  break e;
                case ze:
                  S = P, T = o2(T);
                  break e;
                case Yt:
                  S = I;
                  break e;
                case It:
                  S = oe, T = null;
                  break e;
              }
            var M = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (M += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var L = o ? Qt(o) : null;
              L && (M += `

Check the render method of \`` + L + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + M));
          }
        }
      var j = $i(S, l, n, c);
      return j.elementType = e, j.type = T, j.lanes = h, j._debugOwner = o, j;
    }
    function p2(e, n, l) {
      var o = null;
      o = e._owner;
      var c = e.type, h = e.key, S = e.props, T = d2(c, h, S, o, n, l);
      return T._debugSource = e._source, T._debugOwner = e._owner, T;
    }
    function Mu(e, n, l, o) {
      var c = $i(O, e, o, n);
      return c.lanes = l, c;
    }
    function nD(e, n, l, o) {
      typeof e.id != "string" && v('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var c = $i(N, e, o, n | Cn);
      return c.elementType = Ya, c.lanes = l, c.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, c;
    }
    function rD(e, n, l, o) {
      var c = $i(H, e, o, n);
      return c.elementType = nt, c.lanes = l, c;
    }
    function aD(e, n, l, o) {
      var c = $i(J, e, o, n);
      return c.elementType = dt, c.lanes = l, c;
    }
    function Rw(e, n, l, o) {
      var c = $i(W, e, o, n);
      c.elementType = Qn, c.lanes = l;
      var h = {
        isHidden: !1
      };
      return c.stateNode = h, c;
    }
    function v2(e, n, l) {
      var o = $i(k, e, null, n);
      return o.lanes = l, o;
    }
    function iD() {
      var e = $i(_, null, null, zt);
      return e.elementType = "DELETED", e;
    }
    function lD(e) {
      var n = $i($, null, null, zt);
      return n.stateNode = e, n;
    }
    function h2(e, n, l) {
      var o = e.children !== null ? e.children : [], c = $i(R, o, e.key, n);
      return c.lanes = l, c.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, c;
    }
    function Mw(e, n) {
      return e === null && (e = $i(b, null, null, zt)), e.tag = n.tag, e.key = n.key, e.elementType = n.elementType, e.type = n.type, e.stateNode = n.stateNode, e.return = n.return, e.child = n.child, e.sibling = n.sibling, e.index = n.index, e.ref = n.ref, e.pendingProps = n.pendingProps, e.memoizedProps = n.memoizedProps, e.updateQueue = n.updateQueue, e.memoizedState = n.memoizedState, e.dependencies = n.dependencies, e.mode = n.mode, e.flags = n.flags, e.subtreeFlags = n.subtreeFlags, e.deletions = n.deletions, e.lanes = n.lanes, e.childLanes = n.childLanes, e.alternate = n.alternate, e.actualDuration = n.actualDuration, e.actualStartTime = n.actualStartTime, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration, e._debugSource = n._debugSource, e._debugOwner = n._debugOwner, e._debugNeedsRemount = n._debugNeedsRemount, e._debugHookTypes = n._debugHookTypes, e;
    }
    function oD(e, n, l, o, c) {
      this.tag = n, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = X1, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = wn, this.eventTimes = mc(Ue), this.expirationTimes = mc(jn), this.pendingLanes = Ue, this.suspendedLanes = Ue, this.pingedLanes = Ue, this.expiredLanes = Ue, this.mutableReadLanes = Ue, this.finishedLanes = Ue, this.entangledLanes = Ue, this.entanglements = mc(Ue), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var h = this.pendingUpdatersLaneMap = [], S = 0; S < rs; S++)
          h.push(/* @__PURE__ */ new Set());
      }
      switch (n) {
        case my:
          this._debugRootType = l ? "hydrateRoot()" : "createRoot()";
          break;
        case vu:
          this._debugRootType = l ? "hydrate()" : "render()";
          break;
      }
    }
    function _w(e, n, l, o, c, h, S, T, M, L) {
      var j = new oD(e, n, l, T, M), re = tD(n, h);
      j.current = re, re.stateNode = j;
      {
        var te = {
          element: o,
          isDehydrated: l,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        re.memoizedState = te;
      }
      return _g(re), j;
    }
    var m2 = "18.3.1";
    function sD(e, n, l) {
      var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return Ae(o), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: Vn,
        key: o == null ? null : "" + o,
        children: e,
        containerInfo: n,
        implementation: l
      };
    }
    var y2, g2;
    y2 = !1, g2 = {};
    function kw(e) {
      if (!e)
        return Pi;
      var n = Xs(e), l = qR(n);
      if (n.tag === x) {
        var o = n.type;
        if (Ro(o))
          return nE(n, o, l);
      }
      return l;
    }
    function uD(e, n) {
      {
        var l = Xs(e);
        if (l === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var o = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + o);
        }
        var c = Oa(l);
        if (c === null)
          return null;
        if (c.mode & Ln) {
          var h = Qt(l) || "Component";
          if (!g2[h]) {
            g2[h] = !0;
            var S = Hr;
            try {
              On(c), l.mode & Ln ? v("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", n, n, h) : v("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", n, n, h);
            } finally {
              S ? On(S) : qn();
            }
          }
        }
        return c.stateNode;
      }
    }
    function Dw(e, n, l, o, c, h, S, T) {
      var M = !1, L = null;
      return _w(e, n, M, L, l, o, c, h, S);
    }
    function Ow(e, n, l, o, c, h, S, T, M, L) {
      var j = !0, re = _w(l, o, j, e, c, h, S, T, M);
      re.context = kw(null);
      var te = re.current, he = ei(), ge = Tu(te), Te = ws(he, ge);
      return Te.callback = n ?? null, yu(te, Te, ge), mk(re, ge, he), re;
    }
    function ih(e, n, l, o) {
      _p(n, e);
      var c = n.current, h = ei(), S = Tu(c);
      nr(S);
      var T = kw(l);
      n.context === null ? n.context = T : n.pendingContext = T, Wi && Hr !== null && !y2 && (y2 = !0, v(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Qt(Hr) || "Unknown"));
      var M = ws(h, S);
      M.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (typeof o != "function" && v("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", o), M.callback = o);
      var L = yu(c, M, S);
      return L !== null && (Jr(L, c, S, h), Oy(L, c, S)), S;
    }
    function E0(e) {
      var n = e.current;
      return n.child ? n.child.tag === _ ? n.child.stateNode : n.child.stateNode : null;
    }
    function cD(e) {
      switch (e.tag) {
        case C: {
          var n = e.stateNode;
          if (Zf(n)) {
            var l = mm(n);
            Ek(n, l);
          }
          break;
        }
        case H: {
          Rs(function() {
            var c = Si(e, Vt);
            if (c !== null) {
              var h = ei();
              Jr(c, e, Vt, h);
            }
          });
          var o = Vt;
          S2(e, o);
          break;
        }
      }
    }
    function Aw(e, n) {
      var l = e.memoizedState;
      l !== null && l.dehydrated !== null && (l.retryLane = xm(l.retryLane, n));
    }
    function S2(e, n) {
      Aw(e, n);
      var l = e.alternate;
      l && Aw(l, n);
    }
    function fD(e) {
      if (e.tag === H) {
        var n = cc, l = Si(e, n);
        if (l !== null) {
          var o = ei();
          Jr(l, e, n, o);
        }
        S2(e, n);
      }
    }
    function dD(e) {
      if (e.tag === H) {
        var n = Tu(e), l = Si(e, n);
        if (l !== null) {
          var o = ei();
          Jr(l, e, n, o);
        }
        S2(e, n);
      }
    }
    function zw(e) {
      var n = Xn(e);
      return n === null ? null : n.stateNode;
    }
    var Lw = function(e) {
      return null;
    };
    function pD(e) {
      return Lw(e);
    }
    var Nw = function(e) {
      return !1;
    };
    function vD(e) {
      return Nw(e);
    }
    var Uw = null, jw = null, Fw = null, Pw = null, $w = null, Hw = null, Vw = null, Iw = null, qw = null;
    {
      var Yw = function(e, n, l) {
        var o = n[l], c = rn(e) ? e.slice() : Bt({}, e);
        return l + 1 === n.length ? (rn(c) ? c.splice(o, 1) : delete c[o], c) : (c[o] = Yw(e[o], n, l + 1), c);
      }, Ww = function(e, n) {
        return Yw(e, n, 0);
      }, Gw = function(e, n, l, o) {
        var c = n[o], h = rn(e) ? e.slice() : Bt({}, e);
        if (o + 1 === n.length) {
          var S = l[o];
          h[S] = h[c], rn(h) ? h.splice(c, 1) : delete h[c];
        } else
          h[c] = Gw(
            // $FlowFixMe number or string is fine here
            e[c],
            n,
            l,
            o + 1
          );
        return h;
      }, Qw = function(e, n, l) {
        if (n.length !== l.length) {
          m("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var o = 0; o < l.length - 1; o++)
            if (n[o] !== l[o]) {
              m("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return Gw(e, n, l, 0);
      }, Bw = function(e, n, l, o) {
        if (l >= n.length)
          return o;
        var c = n[l], h = rn(e) ? e.slice() : Bt({}, e);
        return h[c] = Bw(e[c], n, l + 1, o), h;
      }, Xw = function(e, n, l) {
        return Bw(e, n, 0, l);
      }, E2 = function(e, n) {
        for (var l = e.memoizedState; l !== null && n > 0; )
          l = l.next, n--;
        return l;
      };
      Uw = function(e, n, l, o) {
        var c = E2(e, n);
        if (c !== null) {
          var h = Xw(c.memoizedState, l, o);
          c.memoizedState = h, c.baseState = h, e.memoizedProps = Bt({}, e.memoizedProps);
          var S = Si(e, Vt);
          S !== null && Jr(S, e, Vt, jn);
        }
      }, jw = function(e, n, l) {
        var o = E2(e, n);
        if (o !== null) {
          var c = Ww(o.memoizedState, l);
          o.memoizedState = c, o.baseState = c, e.memoizedProps = Bt({}, e.memoizedProps);
          var h = Si(e, Vt);
          h !== null && Jr(h, e, Vt, jn);
        }
      }, Fw = function(e, n, l, o) {
        var c = E2(e, n);
        if (c !== null) {
          var h = Qw(c.memoizedState, l, o);
          c.memoizedState = h, c.baseState = h, e.memoizedProps = Bt({}, e.memoizedProps);
          var S = Si(e, Vt);
          S !== null && Jr(S, e, Vt, jn);
        }
      }, Pw = function(e, n, l) {
        e.pendingProps = Xw(e.memoizedProps, n, l), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Si(e, Vt);
        o !== null && Jr(o, e, Vt, jn);
      }, $w = function(e, n) {
        e.pendingProps = Ww(e.memoizedProps, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var l = Si(e, Vt);
        l !== null && Jr(l, e, Vt, jn);
      }, Hw = function(e, n, l) {
        e.pendingProps = Qw(e.memoizedProps, n, l), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Si(e, Vt);
        o !== null && Jr(o, e, Vt, jn);
      }, Vw = function(e) {
        var n = Si(e, Vt);
        n !== null && Jr(n, e, Vt, jn);
      }, Iw = function(e) {
        Lw = e;
      }, qw = function(e) {
        Nw = e;
      };
    }
    function hD(e) {
      var n = Oa(e);
      return n === null ? null : n.stateNode;
    }
    function mD(e) {
      return null;
    }
    function yD() {
      return Hr;
    }
    function gD(e) {
      var n = e.findFiberByHostInstance, l = s.ReactCurrentDispatcher;
      return Js({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: Uw,
        overrideHookStateDeletePath: jw,
        overrideHookStateRenamePath: Fw,
        overrideProps: Pw,
        overridePropsDeletePath: $w,
        overridePropsRenamePath: Hw,
        setErrorHandler: Iw,
        setSuspenseHandler: qw,
        scheduleUpdate: Vw,
        currentDispatcherRef: l,
        findHostInstanceByFiber: hD,
        findFiberByHostInstance: n || mD,
        // React Refresh
        findHostInstancesForRefresh: Qk,
        scheduleRefresh: Wk,
        scheduleRoot: Gk,
        setRefreshHandler: Yk,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: yD,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: m2
      });
    }
    var Kw = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function x2(e) {
      this._internalRoot = e;
    }
    x0.prototype.render = x2.prototype.render = function(e) {
      var n = this._internalRoot;
      if (n === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? v("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : w0(arguments[1]) ? v("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && v("You passed a second argument to root.render(...) but it only accepts one argument.");
        var l = n.containerInfo;
        if (l.nodeType !== hr) {
          var o = zw(n.current);
          o && o.parentNode !== l && v("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      ih(e, n, null, null);
    }, x0.prototype.unmount = x2.prototype.unmount = function() {
      typeof arguments[0] == "function" && v("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var n = e.containerInfo;
        uw() && v("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Rs(function() {
          ih(null, e, null, null);
        }), K3(n);
      }
    };
    function SD(e, n) {
      if (!w0(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      Zw(e);
      var l = !1, o = !1, c = "", h = Kw;
      n != null && (n.hydrate ? m("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof n == "object" && n !== null && n.$$typeof === Ar && v(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (c = n.identifierPrefix), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.transitionCallbacks !== void 0 && n.transitionCallbacks);
      var S = Dw(e, my, null, l, o, c, h);
      uy(S.current, e);
      var T = e.nodeType === hr ? e.parentNode : e;
      return fv(T), new x2(S);
    }
    function x0(e) {
      this._internalRoot = e;
    }
    function ED(e) {
      e && Om(e);
    }
    x0.prototype.unstable_scheduleHydration = ED;
    function xD(e, n, l) {
      if (!w0(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      Zw(e), n === void 0 && v("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var o = l ?? null, c = l != null && l.hydratedSources || null, h = !1, S = !1, T = "", M = Kw;
      l != null && (l.unstable_strictMode === !0 && (h = !0), l.identifierPrefix !== void 0 && (T = l.identifierPrefix), l.onRecoverableError !== void 0 && (M = l.onRecoverableError));
      var L = Ow(n, null, e, my, o, h, S, T, M);
      if (uy(L.current, e), fv(e), c)
        for (var j = 0; j < c.length; j++) {
          var re = c[j];
          TM(L, re);
        }
      return new x0(L);
    }
    function w0(e) {
      return !!(e && (e.nodeType === _a || e.nodeType === Rl || e.nodeType === pp));
    }
    function lh(e) {
      return !!(e && (e.nodeType === _a || e.nodeType === Rl || e.nodeType === pp || e.nodeType === hr && e.nodeValue === " react-mount-point-unstable "));
    }
    function Zw(e) {
      e.nodeType === _a && e.tagName && e.tagName.toUpperCase() === "BODY" && v("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), wv(e) && (e._reactRootContainer ? v("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : v("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var wD = s.ReactCurrentOwner, Jw;
    Jw = function(e) {
      if (e._reactRootContainer && e.nodeType !== hr) {
        var n = zw(e._reactRootContainer.current);
        n && n.parentNode !== e && v("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var l = !!e._reactRootContainer, o = w2(e), c = !!(o && du(o));
      c && !l && v("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === _a && e.tagName && e.tagName.toUpperCase() === "BODY" && v("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function w2(e) {
      return e ? e.nodeType === Rl ? e.documentElement : e.firstChild : null;
    }
    function eb() {
    }
    function bD(e, n, l, o, c) {
      if (c) {
        if (typeof o == "function") {
          var h = o;
          o = function() {
            var te = E0(S);
            h.call(te);
          };
        }
        var S = Ow(
          n,
          o,
          e,
          vu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          eb
        );
        e._reactRootContainer = S, uy(S.current, e);
        var T = e.nodeType === hr ? e.parentNode : e;
        return fv(T), Rs(), S;
      } else {
        for (var M; M = e.lastChild; )
          e.removeChild(M);
        if (typeof o == "function") {
          var L = o;
          o = function() {
            var te = E0(j);
            L.call(te);
          };
        }
        var j = Dw(
          e,
          vu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          eb
        );
        e._reactRootContainer = j, uy(j.current, e);
        var re = e.nodeType === hr ? e.parentNode : e;
        return fv(re), Rs(function() {
          ih(n, j, l, o);
        }), j;
      }
    }
    function CD(e, n) {
      e !== null && typeof e != "function" && v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", n, e);
    }
    function b0(e, n, l, o, c) {
      Jw(l), CD(c === void 0 ? null : c, "render");
      var h = l._reactRootContainer, S;
      if (!h)
        S = bD(l, n, e, c, o);
      else {
        if (S = h, typeof c == "function") {
          var T = c;
          c = function() {
            var M = E0(S);
            T.call(M);
          };
        }
        ih(n, S, e, c);
      }
      return E0(S);
    }
    var tb = !1;
    function TD(e) {
      {
        tb || (tb = !0, v("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var n = wD.current;
        if (n !== null && n.stateNode !== null) {
          var l = n.stateNode._warnedAboutRefsInRender;
          l || v("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Sn(n.type) || "A component"), n.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === _a ? e : uD(e, "findDOMNode");
    }
    function RD(e, n, l) {
      if (v("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lh(n))
        throw new Error("Target container is not a DOM element.");
      {
        var o = wv(n) && n._reactRootContainer === void 0;
        o && v("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return b0(null, e, n, !0, l);
    }
    function MD(e, n, l) {
      if (v("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lh(n))
        throw new Error("Target container is not a DOM element.");
      {
        var o = wv(n) && n._reactRootContainer === void 0;
        o && v("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return b0(null, e, n, !1, l);
    }
    function _D(e, n, l, o) {
      if (v("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lh(l))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !S1(e))
        throw new Error("parentComponent must be a valid React Component");
      return b0(e, n, l, !1, o);
    }
    var nb = !1;
    function kD(e) {
      if (nb || (nb = !0, v("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !lh(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var n = wv(e) && e._reactRootContainer === void 0;
        n && v("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var l = w2(e), o = l && !du(l);
          o && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Rs(function() {
          b0(null, null, e, !1, function() {
            e._reactRootContainer = null, K3(e);
          });
        }), !0;
      } else {
        {
          var c = w2(e), h = !!(c && du(c)), S = e.nodeType === _a && lh(e.parentNode) && !!e.parentNode._reactRootContainer;
          h && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", S ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    na(cD), ru(fD), Mm(dD), xc(mi), Qp(Cm), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && v("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), hf(OT), g1(JS, xk, Rs);
    function DD(e, n) {
      var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!w0(n))
        throw new Error("Target container is not a DOM element.");
      return sD(e, n, null, l);
    }
    function OD(e, n, l, o) {
      return _D(e, n, l, o);
    }
    var b2 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [du, yd, cy, Ws, mf, JS]
    };
    function AD(e, n) {
      return b2.usingClientEntryPoint || v('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), SD(e, n);
    }
    function zD(e, n, l) {
      return b2.usingClientEntryPoint || v('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), xD(e, n, l);
    }
    function LD(e) {
      return uw() && v("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Rs(e);
    }
    var ND = gD({
      findFiberByHostInstance: Nc,
      bundleType: 1,
      version: m2,
      rendererPackageName: "react-dom"
    });
    if (!ND && Be && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var rb = window.location.protocol;
      /^(https?|file):$/.test(rb) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (rb === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Ci.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = b2, Ci.createPortal = DD, Ci.createRoot = AD, Ci.findDOMNode = TD, Ci.flushSync = LD, Ci.hydrate = RD, Ci.hydrateRoot = zD, Ci.render = MD, Ci.unmountComponentAtNode = kD, Ci.unstable_batchedUpdates = JS, Ci.unstable_renderSubtreeIntoContainer = OD, Ci.version = m2, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })()), Ci;
}
var Cb;
function tN() {
  if (Cb) return A0.exports;
  Cb = 1;
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
  return process.env.NODE_ENV === "production" ? (t(), A0.exports = JL()) : A0.exports = eN(), A0.exports;
}
var Tb;
function nN() {
  if (Tb) return qd;
  Tb = 1;
  var t = tN();
  if (process.env.NODE_ENV === "production")
    qd.createRoot = t.createRoot, qd.hydrateRoot = t.hydrateRoot;
  else {
    var a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    qd.createRoot = function(s, f) {
      a.usingClientEntryPoint = !0;
      try {
        return t.createRoot(s, f);
      } finally {
        a.usingClientEntryPoint = !1;
      }
    }, qd.hydrateRoot = function(s, f, p) {
      a.usingClientEntryPoint = !0;
      try {
        return t.hydrateRoot(s, f, p);
      } finally {
        a.usingClientEntryPoint = !1;
      }
    };
  }
  return qd;
}
var rN = nN();
const Ql = (t) => typeof t != "number" ? "N/A" : `${Math.round(t)} ms`;
function aN({ viewport: t }) {
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
    fillRasterTime: 0,
    shadeRasterTime: 0,
    fogSortTime: 0,
    fogRasterTime: 0
  }), [f, p] = ia.useState(() => localStorage.getItem("s3d-debug-open") === "true"), [m, v] = ia.useState(() => localStorage.getItem("s3d-wireframe") === "true"), [E, g] = ia.useState(() => localStorage.getItem("s3d-debug-normals") === "true"), [x, b] = ia.useState(() => localStorage.getItem("s3d-debug-axis") === "true"), [C, R] = ia.useState(() => localStorage.getItem("s3d-fill-enabled") !== "false"), [_, k] = ia.useState(() => localStorage.getItem("s3d-shade-enabled") !== "false"), [O, z] = ia.useState(() => localStorage.getItem("s3d-fog-enabled") !== "false");
  ia.useEffect(() => {
    t && (t.wireframe = m, t.debugNormals = E, t.debugAxis = x, t.fillEnabled = C, t.shadeEnabled = _, t.fogEnabled = O);
  }, [t]), ia.useEffect(() => {
    const V = () => {
      t && (v(!!t.wireframe), g(!!t.debugNormals), b(!!t.debugAxis), R(!!t.fillEnabled), k(!!t.shadeEnabled), z(!!t.fogEnabled));
    };
    V();
    const oe = setInterval(V, 500);
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
    localStorage.setItem("s3d-fill-enabled", C);
  }, [C]), ia.useEffect(() => {
    localStorage.setItem("s3d-shade-enabled", _);
  }, [_]), ia.useEffect(() => {
    localStorage.setItem("s3d-fog-enabled", O);
  }, [O]), ia.useEffect(() => {
    let V = 0;
    const oe = setInterval(() => {
      if (t) {
        const B = t.lastRenderStats || {};
        V = Math.max(V, B.fps || 0), s({
          fps: B.fps || 0,
          maxFps: V,
          totalObjects: B.totalObjects || 0,
          visibleObjects: B.visibleObjects || 0,
          faces: B.faces || 0,
          sortTime: B.sortTime || 0,
          cullTime: B.cullTime || 0,
          groupTime: B.groupTime || 0,
          processTime: B.processTime || 0,
          updateTime: B.updateTime || 0,
          retrieveTime: B.retrieveTime || 0,
          frameTime: B.frameTime || 0,
          drawCalls: B.drawCalls || 0,
          dt: B.dt || 0,
          fillDrawCalls: B.fillDrawCalls || 0,
          fogDrawCalls: B.fogDrawCalls || 0,
          shadeDrawCalls: B.shadeDrawCalls || 0,
          drawCallsTotal: B.drawCallsTotal || 0,
          fillRasterTime: B.fillRasterTime || 0,
          shadeRasterTime: B.shadeRasterTime || 0,
          fogSortTime: B.fogSortTime || 0,
          fogRasterTime: B.fogRasterTime || 0
        });
      }
    }, 100);
    return () => clearInterval(oe);
  }, [t]);
  const F = () => {
    const V = !m;
    v(V), t && (t.wireframe = V), window.dispatchEvent(
      new CustomEvent("s3d-wireframe-change", {
        detail: { enabled: V }
      })
    );
  }, Y = () => {
    const V = !E;
    g(V), t && (t.debugNormals = V);
  }, P = () => {
    const V = !x;
    b(V), t && (t.debugAxis = V);
  }, N = () => {
    const V = !C;
    R(V), t && (t.fillEnabled = V);
  }, H = () => {
    const V = !_;
    k(V), t && (t.shadeEnabled = V);
  }, I = () => {
    const V = !O;
    z(V), t && (t.fogEnabled = V);
  };
  return /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-debug-container s3d-flex s3d-flex-col s3d-items-end s3d-gap-2 s3d-font-sans", children: [
    /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-gap-2", children: [
      /* @__PURE__ */ Xe.jsx(
        "button",
        {
          onClick: F,
          title: "Toggle Wireframe",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${m ? "s3d-bg-blue-600/80 s3d-border-blue-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Xe.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ Xe.jsx(
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
      /* @__PURE__ */ Xe.jsx(
        "button",
        {
          onClick: Y,
          title: "Toggle Debug Normals",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${E ? "s3d-bg-amber-600/80 s3d-border-amber-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Xe.jsxs(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: [
                /* @__PURE__ */ Xe.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M4 17l8-10 8 10H4z"
                  }
                ),
                /* @__PURE__ */ Xe.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 13V3" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ Xe.jsx(
        "button",
        {
          onClick: P,
          title: "Toggle Debug Axis",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${x ? "s3d-bg-purple-600/80 s3d-border-purple-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Xe.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ Xe.jsx(
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
      /* @__PURE__ */ Xe.jsx(
        "button",
        {
          onClick: N,
          title: "Toggle Fill Pass",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${C ? "s3d-bg-cyan-600/80 s3d-border-cyan-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Xe.jsx("svg", { className: "s3d-w-5 s3d-h-5", viewBox: "0 0 24 24", children: /* @__PURE__ */ Xe.jsx(
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
      /* @__PURE__ */ Xe.jsx(
        "button",
        {
          onClick: H,
          title: "Toggle Shade Pass",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${_ ? "s3d-bg-orange-600/80 s3d-border-orange-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Xe.jsxs(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: [
                /* @__PURE__ */ Xe.jsx("circle", { cx: "12", cy: "12", r: "9" }),
                /* @__PURE__ */ Xe.jsx("path", { d: "M12 3a9 9 0 000 18z", fill: "currentColor", stroke: "none" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ Xe.jsx(
        "button",
        {
          onClick: I,
          title: "Toggle Fog Pass",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${O ? "s3d-bg-sky-600/80 s3d-border-sky-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Xe.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ Xe.jsx("path", { strokeLinecap: "round", d: "M3 8h13M3 12h17M3 16h10" })
            }
          )
        }
      ),
      /* @__PURE__ */ Xe.jsx(
        "button",
        {
          onClick: () => p(!f),
          title: "Toggle Diagnostics",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${f ? "s3d-bg-emerald-600/80 s3d-border-emerald-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ Xe.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ Xe.jsx(
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
    f && /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-w-56 s3d-bg-slate-900/85 s3d-backdrop-blur-md s3d-border s3d-border-slate-700/50 s3d-rounded-lg s3d-p-3 s3d-shadow-2xl s3d-text-slate-300 s3d-flex s3d-flex-col", children: [
      /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-justify-between s3d-items-center s3d-border-b s3d-border-slate-800 s3d-pb-1.5 s3d-mb-2.5", children: [
        /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide s3d-font-semibold", children: "FPS / FPS (max)" }),
        /* @__PURE__ */ Xe.jsxs("span", { className: "s3d-font-mono s3d-text-sm s3d-font-semibold", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-emerald-400", children: a.fps }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500", children: " / " }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-200", children: a.maxFps })
        ] })
      ] }),
      /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-grid s3d-grid-cols-2 s3d-gap-y-2.5 s3d-gap-x-3 s3d-text-[11px]", children: [
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Device DPR" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: (window.devicePixelRatio || 1).toFixed(2) })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Scene)" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.totalObjects })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Screen)" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.visibleObjects })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Faces (screen)" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.faces })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Update" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Ql(a.updateTime) })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Retrieval" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Ql(a.retrieveTime) })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Object Culling" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Ql(a.cullTime) })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Layer Grouping" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Ql(a.groupTime) })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Process Meshes" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Ql(a.processTime) })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Sort Faces" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Ql(a.sortTime) })
        ] }),
        /* @__PURE__ */ Xe.jsx("div", { className: "s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5" }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fill Draw Calls" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.fillDrawCalls })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fill Time (Cpu)" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Ql(a.fillRasterTime) })
        ] }),
        /* @__PURE__ */ Xe.jsx("div", { className: "s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5" }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Shade Draw Calls" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.shadeDrawCalls })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Shade Time (Cpu)" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Ql(a.shadeRasterTime) })
        ] }),
        /* @__PURE__ */ Xe.jsx("div", { className: "s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5" }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col s3d-col-span-2", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fog Sort" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Ql(a.fogSortTime) })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fog Draw Calls" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.fogDrawCalls })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fog Time (Cpu)" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Ql(a.fogRasterTime) })
        ] }),
        /* @__PURE__ */ Xe.jsx("div", { className: "s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5" }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Draw Calls" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.drawCallsTotal })
        ] }),
        /* @__PURE__ */ Xe.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Frame Time (gpu)" }),
          /* @__PURE__ */ Xe.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Ql(a.frameTime) })
        ] })
      ] })
    ] })
  ] });
}
function iN(t) {
  if (!t || !t.canvas) {
    console.error("showDebug: Invalid viewport parameter passed.");
    return;
  }
  const s = t.canvas.parentElement || document.body;
  s && getComputedStyle(s).position === "static" && (s.style.position = "relative");
  let f = s.querySelector("#s3d-debug-root");
  if (f)
    return;
  f = document.createElement("div"), f.id = "s3d-debug-root", f.className = "s3d-absolute s3d-top-4 s3d-right-4 s3d-z-[99999]", s.appendChild(f), rN.createRoot(f).render(/* @__PURE__ */ Xe.jsx(aN, { viewport: t }));
}
const uN = window.scaliaEngine = {
  config: Q0,
  Game: kb,
  GameObject: ri,
  Component: $n,
  Camera: IC,
  CameraComponent: pr,
  MeshComponent: lr,
  TransformComponent: n1,
  SpriteRenderer: l3,
  glMatrix: Zz,
  PathRenderer: o3,
  TextRenderer: s3,
  Plane: qC,
  Box: YC,
  Cone: WC,
  Ball: d3,
  Light: Kd,
  Canvas2dViewport: XC,
  showDebug: iN,
  registerShader: ML,
  whiteFillShade: r1,
  // Built-in shaderType keys, to set on a MeshComponent as `meshRenderer.shaderType`.
  ShaderType: {
    ALBEDO_FLAT: ep,
    TEXTURE: tp,
    EMISSIVE_FLAT: Dh,
    AVG_ALBEDO_FLAT: Oh,
    GOURAUD_SHADE: np
  },
  shaders: {
    flat: { fill: Nu, shade: w3 },
    texture: { fill: S3, shade: Xd },
    avgFlat: { fill: E3, shade: x3 },
    gouraud: { fill: Nu, shade: Xd }
  }
};
export {
  uN as default
};
