const l1 = {
  depthSortingMask: parseInt("11", 2),
  //bitmask, bit per layer
  layersCount: 1
};
function PC() {
  this.now = Date.now();
}
var o3 = PC.prototype;
o3.time = 0;
o3.now = 0;
o3.dt = 60;
function $C() {
  this.gameObjects = [];
}
var o1 = $C.prototype;
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
function HC(t) {
  this.time = new PC(), this.list = [], this.scene = new $C(), this.lastTickTime = 0;
}
var lp = HC.prototype;
lp.scene = null;
lp.time = null;
lp.tickRegister = function(t) {
  t._tickerIndex === void 0 && (t._tickerIndex = this.list.length, this.list.push(t));
};
lp.tickUnregister = function(t) {
  const a = t._tickerIndex;
  if (a === void 0) return;
  const s = this.list.pop();
  s !== t && (this.list[a] = s, s._tickerIndex = a), t._tickerIndex = void 0;
};
lp.update = function(t) {
  const a = this.list;
  for (let s = 0; s < a.length; s++)
    a[s].tick(t);
};
lp.tick = function() {
  for (var t = Date.now(), a = 0, s = t - this.time.now, f = this.time.dt; s >= f && (s -= f, this.time.now += f, this.time.time += f, this.update(this.time), !(a++ > 200)); )
    ;
};
function VC() {
  this.world = new HC();
  var t = this.world;
  this.tick = function a() {
    const s = performance.now();
    t.tick(), t.lastTickTime = performance.now() - s, requestAnimationFrame(a);
  };
}
var s1 = VC.prototype;
s1.world = null;
s1.render = null;
s1.run = function() {
  this.tick();
};
s1.rafHandler = null;
function $n() {
}
var u1 = $n.prototype;
u1.gameObject = null;
u1.enabled = !0;
u1.setGameObject = function(t) {
  this.gameObject = t;
};
u1.unsetGameObject = function() {
  this.gameObject = null;
};
function Jk(t, a, s, f, p, m) {
  return t[a] = m[0] * s + m[4] * f + m[8] * p + m[12], t[a + 1] = m[1] * s + m[5] * f + m[9] * p + m[13], t[a + 2] = m[2] * s + m[6] * f + m[10] * p + m[14], t;
}
function e5(t, a, s, f, p, m) {
  return t[a] = m[0] * s + m[4] * f + m[8] * p + m[12], t[a + 1] = m[1] * s + m[5] * f + m[9] * p + m[13], t;
}
function c1(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = a[4], g = a[5], x = a[6], C = a[7], b = a[8], R = a[9], D = a[10], _ = a[11], A = a[12], L = a[13], U = a[14], q = a[15], H = s[0], $ = s[1], V = s[2], F = s[3];
  return t[0] = H * f + $ * S + V * b + F * A, t[1] = H * p + $ * g + V * R + F * L, t[2] = H * m + $ * x + V * D + F * U, t[3] = H * v + $ * C + V * _ + F * q, H = s[4], $ = s[5], V = s[6], F = s[7], t[4] = H * f + $ * S + V * b + F * A, t[5] = H * p + $ * g + V * R + F * L, t[6] = H * m + $ * x + V * D + F * U, t[7] = H * v + $ * C + V * _ + F * q, H = s[8], $ = s[9], V = s[10], F = s[11], t[8] = H * f + $ * S + V * b + F * A, t[9] = H * p + $ * g + V * R + F * L, t[10] = H * m + $ * x + V * D + F * U, t[11] = H * v + $ * C + V * _ + F * q, H = s[12], $ = s[13], V = s[14], F = s[15], t[12] = H * f + $ * S + V * b + F * A, t[13] = H * p + $ * g + V * R + F * L, t[14] = H * m + $ * x + V * D + F * U, t[15] = H * v + $ * C + V * _ + F * q, t;
}
var Mt = 1e-6, cn = typeof Float32Array < "u" ? Float32Array : Array, to = Math.random, IC = "zyx";
function qo(t) {
  return t >= 0 ? Math.round(t) : t % 0.5 === 0 ? Math.floor(t) : Math.round(t);
}
function t5(t) {
  cn = t;
}
var n5 = Math.PI / 180, r5 = 180 / Math.PI;
function a5(t) {
  return t * n5;
}
function i5(t) {
  return t * r5;
}
function l5(t, a) {
  var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Mt;
  return Math.abs(t - a) <= s * Math.max(1, Math.abs(t), Math.abs(a));
}
const o5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: IC,
  get ARRAY_TYPE() {
    return cn;
  },
  EPSILON: Mt,
  RANDOM: to,
  equals: l5,
  round: qo,
  setMatrixArrayType: t5,
  toDegree: i5,
  toRadian: a5
}, Symbol.toStringTag, { value: "Module" }));
function s5() {
  var t = new cn(4);
  return cn != Float32Array && (t[1] = 0, t[2] = 0), t[0] = 1, t[3] = 1, t;
}
function u5(t) {
  var a = new cn(4);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a;
}
function c5(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t;
}
function f5(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t;
}
function d5(t, a, s, f) {
  var p = new cn(4);
  return p[0] = t, p[1] = a, p[2] = s, p[3] = f, p;
}
function p5(t, a, s, f, p) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t;
}
function v5(t, a) {
  if (t === a) {
    var s = a[1];
    t[1] = a[2], t[2] = s;
  } else
    t[0] = a[0], t[1] = a[2], t[2] = a[1], t[3] = a[3];
  return t;
}
function h5(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s * m - p * f;
  return v ? (v = 1 / v, t[0] = m * v, t[1] = -f * v, t[2] = -p * v, t[3] = s * v, t) : null;
}
function m5(t, a) {
  var s = a[0];
  return t[0] = a[3], t[1] = -a[1], t[2] = -a[2], t[3] = s, t;
}
function y5(t) {
  return t[0] * t[3] - t[2] * t[1];
}
function qC(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = s[0], g = s[1], x = s[2], C = s[3];
  return t[0] = f * S + m * g, t[1] = p * S + v * g, t[2] = f * x + m * C, t[3] = p * x + v * C, t;
}
function g5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = Math.sin(s), g = Math.cos(s);
  return t[0] = f * g + m * S, t[1] = p * g + v * S, t[2] = f * -S + m * g, t[3] = p * -S + v * g, t;
}
function S5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = s[0], g = s[1];
  return t[0] = f * S, t[1] = p * S, t[2] = m * g, t[3] = v * g, t;
}
function E5(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = s, t[2] = -s, t[3] = f, t;
}
function x5(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = a[1], t;
}
function w5(t) {
  return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
}
function C5(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3]);
}
function b5(t, a, s, f) {
  return t[2] = f[2] / f[0], s[0] = f[0], s[1] = f[1], s[3] = f[3] - t[2] * s[1], [t, a, s];
}
function T5(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t;
}
function YC(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t;
}
function R5(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3];
}
function M5(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = a[0], S = a[1], g = a[2], x = a[3];
  return Math.abs(s - v) <= Mt * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(f - S) <= Mt * Math.max(1, Math.abs(f), Math.abs(S)) && Math.abs(p - g) <= Mt * Math.max(1, Math.abs(p), Math.abs(g)) && Math.abs(m - x) <= Mt * Math.max(1, Math.abs(m), Math.abs(x));
}
function _5(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t;
}
function D5(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t;
}
var k5 = qC, O5 = YC;
const A5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: b5,
  add: T5,
  adjoint: m5,
  clone: u5,
  copy: c5,
  create: s5,
  determinant: y5,
  equals: M5,
  exactEquals: R5,
  frob: C5,
  fromRotation: E5,
  fromScaling: x5,
  fromValues: d5,
  identity: f5,
  invert: h5,
  mul: k5,
  multiply: qC,
  multiplyScalar: _5,
  multiplyScalarAndAdd: D5,
  rotate: g5,
  scale: S5,
  set: p5,
  str: w5,
  sub: O5,
  subtract: YC,
  transpose: v5
}, Symbol.toStringTag, { value: "Module" }));
function L5() {
  var t = new cn(6);
  return cn != Float32Array && (t[1] = 0, t[2] = 0, t[4] = 0, t[5] = 0), t[0] = 1, t[3] = 1, t;
}
function z5(t) {
  var a = new cn(6);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a;
}
function N5(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t;
}
function U5(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
}
function j5(t, a, s, f, p, m) {
  var v = new cn(6);
  return v[0] = t, v[1] = a, v[2] = s, v[3] = f, v[4] = p, v[5] = m, v;
}
function F5(t, a, s, f, p, m, v) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t;
}
function P5(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], S = a[5], g = s * m - f * p;
  return g ? (g = 1 / g, t[0] = m * g, t[1] = -f * g, t[2] = -p * g, t[3] = s * g, t[4] = (p * S - m * v) * g, t[5] = (f * v - s * S) * g, t) : null;
}
function $5(t) {
  return t[0] * t[3] - t[1] * t[2];
}
function WC(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = a[4], g = a[5], x = s[0], C = s[1], b = s[2], R = s[3], D = s[4], _ = s[5];
  return t[0] = f * x + m * C, t[1] = p * x + v * C, t[2] = f * b + m * R, t[3] = p * b + v * R, t[4] = f * D + m * _ + S, t[5] = p * D + v * _ + g, t;
}
function H5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = a[4], g = a[5], x = Math.sin(s), C = Math.cos(s);
  return t[0] = f * C + m * x, t[1] = p * C + v * x, t[2] = f * -x + m * C, t[3] = p * -x + v * C, t[4] = S, t[5] = g, t;
}
function V5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = a[4], g = a[5], x = s[0], C = s[1];
  return t[0] = f * x, t[1] = p * x, t[2] = m * C, t[3] = v * C, t[4] = S, t[5] = g, t;
}
function I5(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = a[4], g = a[5], x = s[0], C = s[1];
  return t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = f * x + m * C + S, t[5] = p * x + v * C + g, t;
}
function q5(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = s, t[2] = -s, t[3] = f, t[4] = 0, t[5] = 0, t;
}
function Y5(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = a[1], t[4] = 0, t[5] = 0, t;
}
function W5(t, a) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = a[0], t[5] = a[1], t;
}
function B5(t) {
  return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")";
}
function G5(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3] + t[4] * t[4] + t[5] * t[5] + 1);
}
function Q5(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t[4] = a[4] + s[4], t[5] = a[5] + s[5], t;
}
function BC(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t[4] = a[4] - s[4], t[5] = a[5] - s[5], t;
}
function X5(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t[4] = a[4] * s, t[5] = a[5] * s, t;
}
function K5(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t[4] = a[4] + s[4] * f, t[5] = a[5] + s[5] * f, t;
}
function Z5(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5];
}
function J5(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = t[4], S = t[5], g = a[0], x = a[1], C = a[2], b = a[3], R = a[4], D = a[5];
  return Math.abs(s - g) <= Mt * Math.max(1, Math.abs(s), Math.abs(g)) && Math.abs(f - x) <= Mt * Math.max(1, Math.abs(f), Math.abs(x)) && Math.abs(p - C) <= Mt * Math.max(1, Math.abs(p), Math.abs(C)) && Math.abs(m - b) <= Mt * Math.max(1, Math.abs(m), Math.abs(b)) && Math.abs(v - R) <= Mt * Math.max(1, Math.abs(v), Math.abs(R)) && Math.abs(S - D) <= Mt * Math.max(1, Math.abs(S), Math.abs(D));
}
var eO = WC, tO = BC;
const nO = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Q5,
  clone: z5,
  copy: N5,
  create: L5,
  determinant: $5,
  equals: J5,
  exactEquals: Z5,
  frob: G5,
  fromRotation: q5,
  fromScaling: Y5,
  fromTranslation: W5,
  fromValues: j5,
  identity: U5,
  invert: P5,
  mul: eO,
  multiply: WC,
  multiplyScalar: X5,
  multiplyScalarAndAdd: K5,
  rotate: H5,
  scale: V5,
  set: F5,
  str: B5,
  sub: tO,
  subtract: BC,
  translate: I5
}, Symbol.toStringTag, { value: "Module" }));
function GC() {
  var t = new cn(9);
  return cn != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[0] = 1, t[4] = 1, t[8] = 1, t;
}
function rO(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[4], t[4] = a[5], t[5] = a[6], t[6] = a[8], t[7] = a[9], t[8] = a[10], t;
}
function aO(t) {
  var a = new cn(9);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a;
}
function iO(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t;
}
function lO(t, a, s, f, p, m, v, S, g) {
  var x = new cn(9);
  return x[0] = t, x[1] = a, x[2] = s, x[3] = f, x[4] = p, x[5] = m, x[6] = v, x[7] = S, x[8] = g, x;
}
function oO(t, a, s, f, p, m, v, S, g, x) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t[6] = S, t[7] = g, t[8] = x, t;
}
function sO(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
}
function uO(t, a) {
  if (t === a) {
    var s = a[1], f = a[2], p = a[5];
    t[1] = a[3], t[2] = a[6], t[3] = s, t[5] = a[7], t[6] = f, t[7] = p;
  } else
    t[0] = a[0], t[1] = a[3], t[2] = a[6], t[3] = a[1], t[4] = a[4], t[5] = a[7], t[6] = a[2], t[7] = a[5], t[8] = a[8];
  return t;
}
function cO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], S = a[5], g = a[6], x = a[7], C = a[8], b = C * v - S * x, R = -C * m + S * g, D = x * m - v * g, _ = s * b + f * R + p * D;
  return _ ? (_ = 1 / _, t[0] = b * _, t[1] = (-C * f + p * x) * _, t[2] = (S * f - p * v) * _, t[3] = R * _, t[4] = (C * s - p * g) * _, t[5] = (-S * s + p * m) * _, t[6] = D * _, t[7] = (-x * s + f * g) * _, t[8] = (v * s - f * m) * _, t) : null;
}
function fO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], S = a[5], g = a[6], x = a[7], C = a[8];
  return t[0] = v * C - S * x, t[1] = p * x - f * C, t[2] = f * S - p * v, t[3] = S * g - m * C, t[4] = s * C - p * g, t[5] = p * m - s * S, t[6] = m * x - v * g, t[7] = f * g - s * x, t[8] = s * v - f * m, t;
}
function dO(t) {
  var a = t[0], s = t[1], f = t[2], p = t[3], m = t[4], v = t[5], S = t[6], g = t[7], x = t[8];
  return a * (x * m - v * g) + s * (-x * p + v * S) + f * (g * p - m * S);
}
function QC(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = a[4], g = a[5], x = a[6], C = a[7], b = a[8], R = s[0], D = s[1], _ = s[2], A = s[3], L = s[4], U = s[5], q = s[6], H = s[7], $ = s[8];
  return t[0] = R * f + D * v + _ * x, t[1] = R * p + D * S + _ * C, t[2] = R * m + D * g + _ * b, t[3] = A * f + L * v + U * x, t[4] = A * p + L * S + U * C, t[5] = A * m + L * g + U * b, t[6] = q * f + H * v + $ * x, t[7] = q * p + H * S + $ * C, t[8] = q * m + H * g + $ * b, t;
}
function pO(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = a[4], g = a[5], x = a[6], C = a[7], b = a[8], R = s[0], D = s[1];
  return t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = S, t[5] = g, t[6] = R * f + D * v + x, t[7] = R * p + D * S + C, t[8] = R * m + D * g + b, t;
}
function vO(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = a[4], g = a[5], x = a[6], C = a[7], b = a[8], R = Math.sin(s), D = Math.cos(s);
  return t[0] = D * f + R * v, t[1] = D * p + R * S, t[2] = D * m + R * g, t[3] = D * v - R * f, t[4] = D * S - R * p, t[5] = D * g - R * m, t[6] = x, t[7] = C, t[8] = b, t;
}
function hO(t, a, s) {
  var f = s[0], p = s[1];
  return t[0] = f * a[0], t[1] = f * a[1], t[2] = f * a[2], t[3] = p * a[3], t[4] = p * a[4], t[5] = p * a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t;
}
function mO(t, a) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = a[0], t[7] = a[1], t[8] = 1, t;
}
function yO(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = s, t[2] = 0, t[3] = -s, t[4] = f, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
}
function gO(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = a[1], t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
}
function SO(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = 0, t[3] = a[2], t[4] = a[3], t[5] = 0, t[6] = a[4], t[7] = a[5], t[8] = 1, t;
}
function EO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s + s, S = f + f, g = p + p, x = s * v, C = f * v, b = f * S, R = p * v, D = p * S, _ = p * g, A = m * v, L = m * S, U = m * g;
  return t[0] = 1 - b - _, t[3] = C - U, t[6] = R + L, t[1] = C + U, t[4] = 1 - x - _, t[7] = D - A, t[2] = R - L, t[5] = D + A, t[8] = 1 - x - b, t;
}
function xO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], S = a[5], g = a[6], x = a[7], C = a[8], b = a[9], R = a[10], D = a[11], _ = a[12], A = a[13], L = a[14], U = a[15], q = s * S - f * v, H = s * g - p * v, $ = s * x - m * v, V = f * g - p * S, F = f * x - m * S, B = p * x - m * g, ie = C * A - b * _, X = C * L - R * _, j = C * U - D * _, ne = b * L - R * A, ae = b * U - D * A, G = R * U - D * L, K = q * G - H * ae + $ * ne + V * j - F * X + B * ie;
  return K ? (K = 1 / K, t[0] = (S * G - g * ae + x * ne) * K, t[1] = (g * j - v * G - x * X) * K, t[2] = (v * ae - S * j + x * ie) * K, t[3] = (p * ae - f * G - m * ne) * K, t[4] = (s * G - p * j + m * X) * K, t[5] = (f * j - s * ae - m * ie) * K, t[6] = (A * B - L * F + U * V) * K, t[7] = (L * $ - _ * B - U * H) * K, t[8] = (_ * F - A * $ + U * q) * K, t) : null;
}
function wO(t, a, s) {
  return t[0] = 2 / a, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = -2 / s, t[5] = 0, t[6] = -1, t[7] = 1, t[8] = 1, t;
}
function CO(t) {
  return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")";
}
function bO(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3] + t[4] * t[4] + t[5] * t[5] + t[6] * t[6] + t[7] * t[7] + t[8] * t[8]);
}
function TO(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t[4] = a[4] + s[4], t[5] = a[5] + s[5], t[6] = a[6] + s[6], t[7] = a[7] + s[7], t[8] = a[8] + s[8], t;
}
function XC(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t[4] = a[4] - s[4], t[5] = a[5] - s[5], t[6] = a[6] - s[6], t[7] = a[7] - s[7], t[8] = a[8] - s[8], t;
}
function RO(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t[4] = a[4] * s, t[5] = a[5] * s, t[6] = a[6] * s, t[7] = a[7] * s, t[8] = a[8] * s, t;
}
function MO(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t[4] = a[4] + s[4] * f, t[5] = a[5] + s[5] * f, t[6] = a[6] + s[6] * f, t[7] = a[7] + s[7] * f, t[8] = a[8] + s[8] * f, t;
}
function _O(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7] && t[8] === a[8];
}
function DO(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = t[4], S = t[5], g = t[6], x = t[7], C = t[8], b = a[0], R = a[1], D = a[2], _ = a[3], A = a[4], L = a[5], U = a[6], q = a[7], H = a[8];
  return Math.abs(s - b) <= Mt * Math.max(1, Math.abs(s), Math.abs(b)) && Math.abs(f - R) <= Mt * Math.max(1, Math.abs(f), Math.abs(R)) && Math.abs(p - D) <= Mt * Math.max(1, Math.abs(p), Math.abs(D)) && Math.abs(m - _) <= Mt * Math.max(1, Math.abs(m), Math.abs(_)) && Math.abs(v - A) <= Mt * Math.max(1, Math.abs(v), Math.abs(A)) && Math.abs(S - L) <= Mt * Math.max(1, Math.abs(S), Math.abs(L)) && Math.abs(g - U) <= Mt * Math.max(1, Math.abs(g), Math.abs(U)) && Math.abs(x - q) <= Mt * Math.max(1, Math.abs(x), Math.abs(q)) && Math.abs(C - H) <= Mt * Math.max(1, Math.abs(C), Math.abs(H));
}
var kO = QC, OO = XC;
const AO = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: TO,
  adjoint: fO,
  clone: aO,
  copy: iO,
  create: GC,
  determinant: dO,
  equals: DO,
  exactEquals: _O,
  frob: bO,
  fromMat2d: SO,
  fromMat4: rO,
  fromQuat: EO,
  fromRotation: yO,
  fromScaling: gO,
  fromTranslation: mO,
  fromValues: lO,
  identity: sO,
  invert: cO,
  mul: kO,
  multiply: QC,
  multiplyScalar: RO,
  multiplyScalarAndAdd: MO,
  normalFromMat4: xO,
  projection: wO,
  rotate: vO,
  scale: hO,
  set: oO,
  str: CO,
  sub: OO,
  subtract: XC,
  translate: pO,
  transpose: uO
}, Symbol.toStringTag, { value: "Module" }));
function LO() {
  var t = new cn(16);
  return cn != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0), t[0] = 1, t[5] = 1, t[10] = 1, t[15] = 1, t;
}
function zO(t) {
  var a = new cn(16);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a[9] = t[9], a[10] = t[10], a[11] = t[11], a[12] = t[12], a[13] = t[13], a[14] = t[14], a[15] = t[15], a;
}
function NO(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t;
}
function UO(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A) {
  var L = new cn(16);
  return L[0] = t, L[1] = a, L[2] = s, L[3] = f, L[4] = p, L[5] = m, L[6] = v, L[7] = S, L[8] = g, L[9] = x, L[10] = C, L[11] = b, L[12] = R, L[13] = D, L[14] = _, L[15] = A, L;
}
function jO(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t[6] = S, t[7] = g, t[8] = x, t[9] = C, t[10] = b, t[11] = R, t[12] = D, t[13] = _, t[14] = A, t[15] = L, t;
}
function s3(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function FO(t, a) {
  if (t === a) {
    var s = a[1], f = a[2], p = a[3], m = a[6], v = a[7], S = a[11];
    t[1] = a[4], t[2] = a[8], t[3] = a[12], t[4] = s, t[6] = a[9], t[7] = a[13], t[8] = f, t[9] = m, t[11] = a[14], t[12] = p, t[13] = v, t[14] = S;
  } else
    t[0] = a[0], t[1] = a[4], t[2] = a[8], t[3] = a[12], t[4] = a[1], t[5] = a[5], t[6] = a[9], t[7] = a[13], t[8] = a[2], t[9] = a[6], t[10] = a[10], t[11] = a[14], t[12] = a[3], t[13] = a[7], t[14] = a[11], t[15] = a[15];
  return t;
}
function KC(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], S = a[5], g = a[6], x = a[7], C = a[8], b = a[9], R = a[10], D = a[11], _ = a[12], A = a[13], L = a[14], U = a[15], q = s * S - f * v, H = s * g - p * v, $ = s * x - m * v, V = f * g - p * S, F = f * x - m * S, B = p * x - m * g, ie = C * A - b * _, X = C * L - R * _, j = C * U - D * _, ne = b * L - R * A, ae = b * U - D * A, G = R * U - D * L, K = q * G - H * ae + $ * ne + V * j - F * X + B * ie;
  return K ? (K = 1 / K, t[0] = (S * G - g * ae + x * ne) * K, t[1] = (p * ae - f * G - m * ne) * K, t[2] = (A * B - L * F + U * V) * K, t[3] = (R * F - b * B - D * V) * K, t[4] = (g * j - v * G - x * X) * K, t[5] = (s * G - p * j + m * X) * K, t[6] = (L * $ - _ * B - U * H) * K, t[7] = (C * B - R * $ + D * H) * K, t[8] = (v * ae - S * j + x * ie) * K, t[9] = (f * j - s * ae - m * ie) * K, t[10] = (_ * F - A * $ + U * q) * K, t[11] = (b * $ - C * F - D * q) * K, t[12] = (S * X - v * ne - g * ie) * K, t[13] = (s * ne - f * X + p * ie) * K, t[14] = (A * H - _ * V - L * q) * K, t[15] = (C * V - b * H + R * q) * K, t) : null;
}
function PO(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = a[4], S = a[5], g = a[6], x = a[7], C = a[8], b = a[9], R = a[10], D = a[11], _ = a[12], A = a[13], L = a[14], U = a[15], q = s * S - f * v, H = s * g - p * v, $ = s * x - m * v, V = f * g - p * S, F = f * x - m * S, B = p * x - m * g, ie = C * A - b * _, X = C * L - R * _, j = C * U - D * _, ne = b * L - R * A, ae = b * U - D * A, G = R * U - D * L;
  return t[0] = S * G - g * ae + x * ne, t[1] = p * ae - f * G - m * ne, t[2] = A * B - L * F + U * V, t[3] = R * F - b * B - D * V, t[4] = g * j - v * G - x * X, t[5] = s * G - p * j + m * X, t[6] = L * $ - _ * B - U * H, t[7] = C * B - R * $ + D * H, t[8] = v * ae - S * j + x * ie, t[9] = f * j - s * ae - m * ie, t[10] = _ * F - A * $ + U * q, t[11] = b * $ - C * F - D * q, t[12] = S * X - v * ne - g * ie, t[13] = s * ne - f * X + p * ie, t[14] = A * H - _ * V - L * q, t[15] = C * V - b * H + R * q, t;
}
function $O(t) {
  var a = t[0], s = t[1], f = t[2], p = t[3], m = t[4], v = t[5], S = t[6], g = t[7], x = t[8], C = t[9], b = t[10], R = t[11], D = t[12], _ = t[13], A = t[14], L = t[15], U = a * v - s * m, q = a * S - f * m, H = s * S - f * v, $ = x * _ - C * D, V = x * A - b * D, F = C * A - b * _, B = a * F - s * V + f * $, ie = m * F - v * V + S * $, X = x * H - C * q + b * U, j = D * H - _ * q + A * U;
  return g * B - p * ie + L * X - R * j;
}
function ZC(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = a[4], g = a[5], x = a[6], C = a[7], b = a[8], R = a[9], D = a[10], _ = a[11], A = a[12], L = a[13], U = a[14], q = a[15], H = s[0], $ = s[1], V = s[2], F = s[3];
  return t[0] = H * f + $ * S + V * b + F * A, t[1] = H * p + $ * g + V * R + F * L, t[2] = H * m + $ * x + V * D + F * U, t[3] = H * v + $ * C + V * _ + F * q, H = s[4], $ = s[5], V = s[6], F = s[7], t[4] = H * f + $ * S + V * b + F * A, t[5] = H * p + $ * g + V * R + F * L, t[6] = H * m + $ * x + V * D + F * U, t[7] = H * v + $ * C + V * _ + F * q, H = s[8], $ = s[9], V = s[10], F = s[11], t[8] = H * f + $ * S + V * b + F * A, t[9] = H * p + $ * g + V * R + F * L, t[10] = H * m + $ * x + V * D + F * U, t[11] = H * v + $ * C + V * _ + F * q, H = s[12], $ = s[13], V = s[14], F = s[15], t[12] = H * f + $ * S + V * b + F * A, t[13] = H * p + $ * g + V * R + F * L, t[14] = H * m + $ * x + V * D + F * U, t[15] = H * v + $ * C + V * _ + F * q, t;
}
function W2(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v, S, g, x, C, b, R, D, _, A, L, U;
  return a === t ? (t[12] = a[0] * f + a[4] * p + a[8] * m + a[12], t[13] = a[1] * f + a[5] * p + a[9] * m + a[13], t[14] = a[2] * f + a[6] * p + a[10] * m + a[14], t[15] = a[3] * f + a[7] * p + a[11] * m + a[15]) : (v = a[0], S = a[1], g = a[2], x = a[3], C = a[4], b = a[5], R = a[6], D = a[7], _ = a[8], A = a[9], L = a[10], U = a[11], t[0] = v, t[1] = S, t[2] = g, t[3] = x, t[4] = C, t[5] = b, t[6] = R, t[7] = D, t[8] = _, t[9] = A, t[10] = L, t[11] = U, t[12] = v * f + C * p + _ * m + a[12], t[13] = S * f + b * p + A * m + a[13], t[14] = g * f + R * p + L * m + a[14], t[15] = x * f + D * p + U * m + a[15]), t;
}
function JC(t, a, s) {
  var f = s[0], p = s[1], m = s[2];
  return t[0] = a[0] * f, t[1] = a[1] * f, t[2] = a[2] * f, t[3] = a[3] * f, t[4] = a[4] * p, t[5] = a[5] * p, t[6] = a[6] * p, t[7] = a[7] * p, t[8] = a[8] * m, t[9] = a[9] * m, t[10] = a[10] * m, t[11] = a[11] * m, t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t;
}
function HO(t, a, s, f) {
  var p = f[0], m = f[1], v = f[2], S = Math.sqrt(p * p + m * m + v * v), g, x, C, b, R, D, _, A, L, U, q, H, $, V, F, B, ie, X, j, ne, ae, G, K, le;
  return S < Mt ? null : (S = 1 / S, p *= S, m *= S, v *= S, g = Math.sin(s), x = Math.cos(s), C = 1 - x, b = a[0], R = a[1], D = a[2], _ = a[3], A = a[4], L = a[5], U = a[6], q = a[7], H = a[8], $ = a[9], V = a[10], F = a[11], B = p * p * C + x, ie = m * p * C + v * g, X = v * p * C - m * g, j = p * m * C - v * g, ne = m * m * C + x, ae = v * m * C + p * g, G = p * v * C + m * g, K = m * v * C - p * g, le = v * v * C + x, t[0] = b * B + A * ie + H * X, t[1] = R * B + L * ie + $ * X, t[2] = D * B + U * ie + V * X, t[3] = _ * B + q * ie + F * X, t[4] = b * j + A * ne + H * ae, t[5] = R * j + L * ne + $ * ae, t[6] = D * j + U * ne + V * ae, t[7] = _ * j + q * ne + F * ae, t[8] = b * G + A * K + H * le, t[9] = R * G + L * K + $ * le, t[10] = D * G + U * K + V * le, t[11] = _ * G + q * K + F * le, a !== t && (t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t);
}
function VO(t, a, s) {
  var f = Math.sin(s), p = Math.cos(s), m = a[4], v = a[5], S = a[6], g = a[7], x = a[8], C = a[9], b = a[10], R = a[11];
  return a !== t && (t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[4] = m * p + x * f, t[5] = v * p + C * f, t[6] = S * p + b * f, t[7] = g * p + R * f, t[8] = x * p - m * f, t[9] = C * p - v * f, t[10] = b * p - S * f, t[11] = R * p - g * f, t;
}
function IO(t, a, s) {
  var f = Math.sin(s), p = Math.cos(s), m = a[0], v = a[1], S = a[2], g = a[3], x = a[8], C = a[9], b = a[10], R = a[11];
  return a !== t && (t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[0] = m * p - x * f, t[1] = v * p - C * f, t[2] = S * p - b * f, t[3] = g * p - R * f, t[8] = m * f + x * p, t[9] = v * f + C * p, t[10] = S * f + b * p, t[11] = g * f + R * p, t;
}
function qO(t, a, s) {
  var f = Math.sin(s), p = Math.cos(s), m = a[0], v = a[1], S = a[2], g = a[3], x = a[4], C = a[5], b = a[6], R = a[7];
  return a !== t && (t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[0] = m * p + x * f, t[1] = v * p + C * f, t[2] = S * p + b * f, t[3] = g * p + R * f, t[4] = x * p - m * f, t[5] = C * p - v * f, t[6] = b * p - S * f, t[7] = R * p - g * f, t;
}
function YO(t, a) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = a[0], t[13] = a[1], t[14] = a[2], t[15] = 1, t;
}
function WO(t, a) {
  return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = a[1], t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = a[2], t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function BO(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v = Math.sqrt(f * f + p * p + m * m), S, g, x;
  return v < Mt ? null : (v = 1 / v, f *= v, p *= v, m *= v, S = Math.sin(a), g = Math.cos(a), x = 1 - g, t[0] = f * f * x + g, t[1] = p * f * x + m * S, t[2] = m * f * x - p * S, t[3] = 0, t[4] = f * p * x - m * S, t[5] = p * p * x + g, t[6] = m * p * x + f * S, t[7] = 0, t[8] = f * m * x + p * S, t[9] = p * m * x - f * S, t[10] = m * m * x + g, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t);
}
function GO(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = f, t[6] = s, t[7] = 0, t[8] = 0, t[9] = -s, t[10] = f, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function QO(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = 0, t[2] = -s, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = s, t[9] = 0, t[10] = f, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function XO(t, a) {
  var s = Math.sin(a), f = Math.cos(a);
  return t[0] = f, t[1] = s, t[2] = 0, t[3] = 0, t[4] = -s, t[5] = f, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function eb(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = f + f, g = p + p, x = m + m, C = f * S, b = f * g, R = f * x, D = p * g, _ = p * x, A = m * x, L = v * S, U = v * g, q = v * x;
  return t[0] = 1 - (D + A), t[1] = b + q, t[2] = R - U, t[3] = 0, t[4] = b - q, t[5] = 1 - (C + A), t[6] = _ + L, t[7] = 0, t[8] = R + U, t[9] = _ - L, t[10] = 1 - (C + D), t[11] = 0, t[12] = s[0], t[13] = s[1], t[14] = s[2], t[15] = 1, t;
}
function KO(t, a) {
  var s = new cn(3), f = -a[0], p = -a[1], m = -a[2], v = a[3], S = a[4], g = a[5], x = a[6], C = a[7], b = f * f + p * p + m * m + v * v;
  return b > 0 ? (s[0] = (S * v + C * f + g * m - x * p) * 2 / b, s[1] = (g * v + C * p + x * f - S * m) * 2 / b, s[2] = (x * v + C * m + S * p - g * f) * 2 / b) : (s[0] = (S * v + C * f + g * m - x * p) * 2, s[1] = (g * v + C * p + x * f - S * m) * 2, s[2] = (x * v + C * m + S * p - g * f) * 2), eb(t, a, s), t;
}
function tb(t, a) {
  return t[0] = a[12], t[1] = a[13], t[2] = a[14], t;
}
function nb(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[4], v = a[5], S = a[6], g = a[8], x = a[9], C = a[10];
  return t[0] = Math.sqrt(s * s + f * f + p * p), t[1] = Math.sqrt(m * m + v * v + S * S), t[2] = Math.sqrt(g * g + x * x + C * C), t;
}
function rb(t, a) {
  var s = new cn(3);
  nb(s, a);
  var f = 1 / s[0], p = 1 / s[1], m = 1 / s[2], v = a[0] * f, S = a[1] * p, g = a[2] * m, x = a[4] * f, C = a[5] * p, b = a[6] * m, R = a[8] * f, D = a[9] * p, _ = a[10] * m, A = v + C + _, L = 0;
  return A > 0 ? (L = Math.sqrt(A + 1) * 2, t[3] = 0.25 * L, t[0] = (b - D) / L, t[1] = (R - g) / L, t[2] = (S - x) / L) : v > C && v > _ ? (L = Math.sqrt(1 + v - C - _) * 2, t[3] = (b - D) / L, t[0] = 0.25 * L, t[1] = (S + x) / L, t[2] = (R + g) / L) : C > _ ? (L = Math.sqrt(1 + C - v - _) * 2, t[3] = (R - g) / L, t[0] = (S + x) / L, t[1] = 0.25 * L, t[2] = (b + D) / L) : (L = Math.sqrt(1 + _ - v - C) * 2, t[3] = (S - x) / L, t[0] = (R + g) / L, t[1] = (b + D) / L, t[2] = 0.25 * L), t;
}
function ZO(t, a, s, f) {
  a[0] = f[12], a[1] = f[13], a[2] = f[14];
  var p = f[0], m = f[1], v = f[2], S = f[4], g = f[5], x = f[6], C = f[8], b = f[9], R = f[10];
  s[0] = Math.sqrt(p * p + m * m + v * v), s[1] = Math.sqrt(S * S + g * g + x * x), s[2] = Math.sqrt(C * C + b * b + R * R);
  var D = 1 / s[0], _ = 1 / s[1], A = 1 / s[2], L = p * D, U = m * _, q = v * A, H = S * D, $ = g * _, V = x * A, F = C * D, B = b * _, ie = R * A, X = L + $ + ie, j = 0;
  return X > 0 ? (j = Math.sqrt(X + 1) * 2, t[3] = 0.25 * j, t[0] = (V - B) / j, t[1] = (F - q) / j, t[2] = (U - H) / j) : L > $ && L > ie ? (j = Math.sqrt(1 + L - $ - ie) * 2, t[3] = (V - B) / j, t[0] = 0.25 * j, t[1] = (U + H) / j, t[2] = (F + q) / j) : $ > ie ? (j = Math.sqrt(1 + $ - L - ie) * 2, t[3] = (F - q) / j, t[0] = (U + H) / j, t[1] = 0.25 * j, t[2] = (V + B) / j) : (j = Math.sqrt(1 + ie - L - $) * 2, t[3] = (U - H) / j, t[0] = (F + q) / j, t[1] = (V + B) / j, t[2] = 0.25 * j), t;
}
function JO(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2], S = a[3], g = p + p, x = m + m, C = v + v, b = p * g, R = p * x, D = p * C, _ = m * x, A = m * C, L = v * C, U = S * g, q = S * x, H = S * C, $ = f[0], V = f[1], F = f[2];
  return t[0] = (1 - (_ + L)) * $, t[1] = (R + H) * $, t[2] = (D - q) * $, t[3] = 0, t[4] = (R - H) * V, t[5] = (1 - (b + L)) * V, t[6] = (A + U) * V, t[7] = 0, t[8] = (D + q) * F, t[9] = (A - U) * F, t[10] = (1 - (b + _)) * F, t[11] = 0, t[12] = s[0], t[13] = s[1], t[14] = s[2], t[15] = 1, t;
}
function eA(t, a, s, f, p) {
  var m = a[0], v = a[1], S = a[2], g = a[3], x = m + m, C = v + v, b = S + S, R = m * x, D = m * C, _ = m * b, A = v * C, L = v * b, U = S * b, q = g * x, H = g * C, $ = g * b, V = f[0], F = f[1], B = f[2], ie = p[0], X = p[1], j = p[2], ne = (1 - (A + U)) * V, ae = (D + $) * V, G = (_ - H) * V, K = (D - $) * F, le = (1 - (R + U)) * F, de = (L + q) * F, oe = (_ + H) * B, re = (L - q) * B, ue = (1 - (R + A)) * B;
  return t[0] = ne, t[1] = ae, t[2] = G, t[3] = 0, t[4] = K, t[5] = le, t[6] = de, t[7] = 0, t[8] = oe, t[9] = re, t[10] = ue, t[11] = 0, t[12] = s[0] + ie - (ne * ie + K * X + oe * j), t[13] = s[1] + X - (ae * ie + le * X + re * j), t[14] = s[2] + j - (G * ie + de * X + ue * j), t[15] = 1, t;
}
function tA(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s + s, S = f + f, g = p + p, x = s * v, C = f * v, b = f * S, R = p * v, D = p * S, _ = p * g, A = m * v, L = m * S, U = m * g;
  return t[0] = 1 - b - _, t[1] = C + U, t[2] = R - L, t[3] = 0, t[4] = C - U, t[5] = 1 - x - _, t[6] = D + A, t[7] = 0, t[8] = R + L, t[9] = D - A, t[10] = 1 - x - b, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function nA(t, a, s, f, p, m, v) {
  var S = 1 / (s - a), g = 1 / (p - f), x = 1 / (m - v);
  return t[0] = m * 2 * S, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = m * 2 * g, t[6] = 0, t[7] = 0, t[8] = (s + a) * S, t[9] = (p + f) * g, t[10] = (v + m) * x, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = v * m * 2 * x, t[15] = 0, t;
}
function ab(t, a, s, f, p) {
  var m = 1 / Math.tan(a / 2);
  if (t[0] = m / s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = m, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = -1, t[12] = 0, t[13] = 0, t[15] = 0, p != null && p !== 1 / 0) {
    var v = 1 / (f - p);
    t[10] = (p + f) * v, t[14] = 2 * p * f * v;
  } else
    t[10] = -1, t[14] = -2 * f;
  return t;
}
var rA = ab;
function aA(t, a, s, f, p) {
  var m = 1 / Math.tan(a / 2);
  if (t[0] = m / s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = m, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = -1, t[12] = 0, t[13] = 0, t[15] = 0, p != null && p !== 1 / 0) {
    var v = 1 / (f - p);
    t[10] = p * v, t[14] = p * f * v;
  } else
    t[10] = -1, t[14] = -f;
  return t;
}
function iA(t, a, s, f) {
  var p = Math.tan(a.upDegrees * Math.PI / 180), m = Math.tan(a.downDegrees * Math.PI / 180), v = Math.tan(a.leftDegrees * Math.PI / 180), S = Math.tan(a.rightDegrees * Math.PI / 180), g = 2 / (v + S), x = 2 / (p + m);
  return t[0] = g, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = x, t[6] = 0, t[7] = 0, t[8] = -((v - S) * g * 0.5), t[9] = (p - m) * x * 0.5, t[10] = f / (s - f), t[11] = -1, t[12] = 0, t[13] = 0, t[14] = f * s / (s - f), t[15] = 0, t;
}
function ib(t, a, s, f, p, m, v) {
  var S = 1 / (a - s), g = 1 / (f - p), x = 1 / (m - v);
  return t[0] = -2 * S, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * g, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * x, t[11] = 0, t[12] = (a + s) * S, t[13] = (p + f) * g, t[14] = (v + m) * x, t[15] = 1, t;
}
var lb = ib;
function lA(t, a, s, f, p, m, v) {
  var S = 1 / (a - s), g = 1 / (f - p), x = 1 / (m - v);
  return t[0] = -2 * S, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * g, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = x, t[11] = 0, t[12] = (a + s) * S, t[13] = (p + f) * g, t[14] = m * x, t[15] = 1, t;
}
function oA(t, a, s, f) {
  var p, m, v, S, g, x, C, b, R, D, _ = a[0], A = a[1], L = a[2], U = f[0], q = f[1], H = f[2], $ = s[0], V = s[1], F = s[2];
  return Math.abs(_ - $) < Mt && Math.abs(A - V) < Mt && Math.abs(L - F) < Mt ? s3(t) : (C = _ - $, b = A - V, R = L - F, D = 1 / Math.sqrt(C * C + b * b + R * R), C *= D, b *= D, R *= D, p = q * R - H * b, m = H * C - U * R, v = U * b - q * C, D = Math.sqrt(p * p + m * m + v * v), D ? (D = 1 / D, p *= D, m *= D, v *= D) : (p = 0, m = 0, v = 0), S = b * v - R * m, g = R * p - C * v, x = C * m - b * p, D = Math.sqrt(S * S + g * g + x * x), D ? (D = 1 / D, S *= D, g *= D, x *= D) : (S = 0, g = 0, x = 0), t[0] = p, t[1] = S, t[2] = C, t[3] = 0, t[4] = m, t[5] = g, t[6] = b, t[7] = 0, t[8] = v, t[9] = x, t[10] = R, t[11] = 0, t[12] = -(p * _ + m * A + v * L), t[13] = -(S * _ + g * A + x * L), t[14] = -(C * _ + b * A + R * L), t[15] = 1, t);
}
function sA(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2], S = f[0], g = f[1], x = f[2], C = p - s[0], b = m - s[1], R = v - s[2], D = C * C + b * b + R * R;
  D > 0 && (D = 1 / Math.sqrt(D), C *= D, b *= D, R *= D);
  var _ = g * R - x * b, A = x * C - S * R, L = S * b - g * C;
  return D = _ * _ + A * A + L * L, D > 0 && (D = 1 / Math.sqrt(D), _ *= D, A *= D, L *= D), t[0] = _, t[1] = A, t[2] = L, t[3] = 0, t[4] = b * L - R * A, t[5] = R * _ - C * L, t[6] = C * A - b * _, t[7] = 0, t[8] = C, t[9] = b, t[10] = R, t[11] = 0, t[12] = p, t[13] = m, t[14] = v, t[15] = 1, t;
}
function uA(t) {
  return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")";
}
function cA(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3] + t[4] * t[4] + t[5] * t[5] + t[6] * t[6] + t[7] * t[7] + t[8] * t[8] + t[9] * t[9] + t[10] * t[10] + t[11] * t[11] + t[12] * t[12] + t[13] * t[13] + t[14] * t[14] + t[15] * t[15]);
}
function fA(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t[4] = a[4] + s[4], t[5] = a[5] + s[5], t[6] = a[6] + s[6], t[7] = a[7] + s[7], t[8] = a[8] + s[8], t[9] = a[9] + s[9], t[10] = a[10] + s[10], t[11] = a[11] + s[11], t[12] = a[12] + s[12], t[13] = a[13] + s[13], t[14] = a[14] + s[14], t[15] = a[15] + s[15], t;
}
function ob(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t[4] = a[4] - s[4], t[5] = a[5] - s[5], t[6] = a[6] - s[6], t[7] = a[7] - s[7], t[8] = a[8] - s[8], t[9] = a[9] - s[9], t[10] = a[10] - s[10], t[11] = a[11] - s[11], t[12] = a[12] - s[12], t[13] = a[13] - s[13], t[14] = a[14] - s[14], t[15] = a[15] - s[15], t;
}
function dA(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t[4] = a[4] * s, t[5] = a[5] * s, t[6] = a[6] * s, t[7] = a[7] * s, t[8] = a[8] * s, t[9] = a[9] * s, t[10] = a[10] * s, t[11] = a[11] * s, t[12] = a[12] * s, t[13] = a[13] * s, t[14] = a[14] * s, t[15] = a[15] * s, t;
}
function pA(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t[4] = a[4] + s[4] * f, t[5] = a[5] + s[5] * f, t[6] = a[6] + s[6] * f, t[7] = a[7] + s[7] * f, t[8] = a[8] + s[8] * f, t[9] = a[9] + s[9] * f, t[10] = a[10] + s[10] * f, t[11] = a[11] + s[11] * f, t[12] = a[12] + s[12] * f, t[13] = a[13] + s[13] * f, t[14] = a[14] + s[14] * f, t[15] = a[15] + s[15] * f, t;
}
function vA(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7] && t[8] === a[8] && t[9] === a[9] && t[10] === a[10] && t[11] === a[11] && t[12] === a[12] && t[13] === a[13] && t[14] === a[14] && t[15] === a[15];
}
function hA(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = t[4], S = t[5], g = t[6], x = t[7], C = t[8], b = t[9], R = t[10], D = t[11], _ = t[12], A = t[13], L = t[14], U = t[15], q = a[0], H = a[1], $ = a[2], V = a[3], F = a[4], B = a[5], ie = a[6], X = a[7], j = a[8], ne = a[9], ae = a[10], G = a[11], K = a[12], le = a[13], de = a[14], oe = a[15];
  return Math.abs(s - q) <= Mt * Math.max(1, Math.abs(s), Math.abs(q)) && Math.abs(f - H) <= Mt * Math.max(1, Math.abs(f), Math.abs(H)) && Math.abs(p - $) <= Mt * Math.max(1, Math.abs(p), Math.abs($)) && Math.abs(m - V) <= Mt * Math.max(1, Math.abs(m), Math.abs(V)) && Math.abs(v - F) <= Mt * Math.max(1, Math.abs(v), Math.abs(F)) && Math.abs(S - B) <= Mt * Math.max(1, Math.abs(S), Math.abs(B)) && Math.abs(g - ie) <= Mt * Math.max(1, Math.abs(g), Math.abs(ie)) && Math.abs(x - X) <= Mt * Math.max(1, Math.abs(x), Math.abs(X)) && Math.abs(C - j) <= Mt * Math.max(1, Math.abs(C), Math.abs(j)) && Math.abs(b - ne) <= Mt * Math.max(1, Math.abs(b), Math.abs(ne)) && Math.abs(R - ae) <= Mt * Math.max(1, Math.abs(R), Math.abs(ae)) && Math.abs(D - G) <= Mt * Math.max(1, Math.abs(D), Math.abs(G)) && Math.abs(_ - K) <= Mt * Math.max(1, Math.abs(_), Math.abs(K)) && Math.abs(A - le) <= Mt * Math.max(1, Math.abs(A), Math.abs(le)) && Math.abs(L - de) <= Mt * Math.max(1, Math.abs(L), Math.abs(de)) && Math.abs(U - oe) <= Mt * Math.max(1, Math.abs(U), Math.abs(oe));
}
var mA = ZC, yA = ob;
const sb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: fA,
  adjoint: PO,
  clone: zO,
  copy: NO,
  create: LO,
  decompose: ZO,
  determinant: $O,
  equals: hA,
  exactEquals: vA,
  frob: cA,
  fromQuat: tA,
  fromQuat2: KO,
  fromRotation: BO,
  fromRotationTranslation: eb,
  fromRotationTranslationScale: JO,
  fromRotationTranslationScaleOrigin: eA,
  fromScaling: WO,
  fromTranslation: YO,
  fromValues: UO,
  fromXRotation: GO,
  fromYRotation: QO,
  fromZRotation: XO,
  frustum: nA,
  getRotation: rb,
  getScaling: nb,
  getTranslation: tb,
  identity: s3,
  invert: KC,
  lookAt: oA,
  mul: mA,
  multiply: ZC,
  multiplyScalar: dA,
  multiplyScalarAndAdd: pA,
  ortho: lb,
  orthoNO: ib,
  orthoZO: lA,
  perspective: rA,
  perspectiveFromFieldOfView: iA,
  perspectiveNO: ab,
  perspectiveZO: aA,
  rotate: HO,
  rotateX: VO,
  rotateY: IO,
  rotateZ: qO,
  scale: JC,
  set: jO,
  str: uA,
  sub: yA,
  subtract: ob,
  targetTo: sA,
  translate: W2,
  transpose: FO
}, Symbol.toStringTag, { value: "Module" }));
function u3() {
  var t = new cn(3);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t;
}
function gA(t) {
  var a = new cn(3);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a;
}
function ub(t) {
  var a = t[0], s = t[1], f = t[2];
  return Math.sqrt(a * a + s * s + f * f);
}
function B2(t, a, s) {
  var f = new cn(3);
  return f[0] = t, f[1] = a, f[2] = s, f;
}
function SA(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t;
}
function EA(t, a, s, f) {
  return t[0] = a, t[1] = s, t[2] = f, t;
}
function xA(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t;
}
function cb(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t;
}
function fb(t, a, s) {
  return t[0] = a[0] * s[0], t[1] = a[1] * s[1], t[2] = a[2] * s[2], t;
}
function db(t, a, s) {
  return t[0] = a[0] / s[0], t[1] = a[1] / s[1], t[2] = a[2] / s[2], t;
}
function wA(t, a) {
  return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t[2] = Math.ceil(a[2]), t;
}
function CA(t, a) {
  return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t[2] = Math.floor(a[2]), t;
}
function bA(t, a, s) {
  return t[0] = Math.min(a[0], s[0]), t[1] = Math.min(a[1], s[1]), t[2] = Math.min(a[2], s[2]), t;
}
function TA(t, a, s) {
  return t[0] = Math.max(a[0], s[0]), t[1] = Math.max(a[1], s[1]), t[2] = Math.max(a[2], s[2]), t;
}
function RA(t, a) {
  return t[0] = qo(a[0]), t[1] = qo(a[1]), t[2] = qo(a[2]), t;
}
function MA(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t;
}
function _A(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t;
}
function pb(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2];
  return Math.sqrt(s * s + f * f + p * p);
}
function vb(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2];
  return s * s + f * f + p * p;
}
function hb(t) {
  var a = t[0], s = t[1], f = t[2];
  return a * a + s * s + f * f;
}
function DA(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t;
}
function kA(t, a) {
  return t[0] = 1 / a[0], t[1] = 1 / a[1], t[2] = 1 / a[2], t;
}
function mb(t, a) {
  var s = a[0], f = a[1], p = a[2], m = s * s + f * f + p * p;
  return m > 0 && (m = 1 / Math.sqrt(m)), t[0] = a[0] * m, t[1] = a[1] * m, t[2] = a[2] * m, t;
}
function f1(t, a) {
  return t[0] * a[0] + t[1] * a[1] + t[2] * a[2];
}
function q0(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = s[0], S = s[1], g = s[2];
  return t[0] = p * g - m * S, t[1] = m * v - f * g, t[2] = f * S - p * v, t;
}
function OA(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2];
  return t[0] = p + f * (s[0] - p), t[1] = m + f * (s[1] - m), t[2] = v + f * (s[2] - v), t;
}
function AA(t, a, s, f) {
  var p = Math.acos(Math.min(Math.max(f1(a, s), -1), 1)), m = Math.sin(p), v = Math.sin((1 - f) * p) / m, S = Math.sin(f * p) / m;
  return t[0] = v * a[0] + S * s[0], t[1] = v * a[1] + S * s[1], t[2] = v * a[2] + S * s[2], t;
}
function LA(t, a, s, f, p, m) {
  var v = m * m, S = v * (2 * m - 3) + 1, g = v * (m - 2) + m, x = v * (m - 1), C = v * (3 - 2 * m);
  return t[0] = a[0] * S + s[0] * g + f[0] * x + p[0] * C, t[1] = a[1] * S + s[1] * g + f[1] * x + p[1] * C, t[2] = a[2] * S + s[2] * g + f[2] * x + p[2] * C, t;
}
function zA(t, a, s, f, p, m) {
  var v = 1 - m, S = v * v, g = m * m, x = S * v, C = 3 * m * S, b = 3 * g * v, R = g * m;
  return t[0] = a[0] * x + s[0] * C + f[0] * b + p[0] * R, t[1] = a[1] * x + s[1] * C + f[1] * b + p[1] * R, t[2] = a[2] * x + s[2] * C + f[2] * b + p[2] * R, t;
}
function NA(t, a) {
  a = a === void 0 ? 1 : a;
  var s = to() * 2 * Math.PI, f = to() * 2 - 1, p = Math.sqrt(1 - f * f) * a;
  return t[0] = Math.cos(s) * p, t[1] = Math.sin(s) * p, t[2] = f * a, t;
}
function yb(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = s[3] * f + s[7] * p + s[11] * m + s[15];
  return v = v || 1, t[0] = (s[0] * f + s[4] * p + s[8] * m + s[12]) / v, t[1] = (s[1] * f + s[5] * p + s[9] * m + s[13]) / v, t[2] = (s[2] * f + s[6] * p + s[10] * m + s[14]) / v, t;
}
function UA(t, a, s) {
  var f = a[0], p = a[1], m = a[2];
  return t[0] = f * s[0] + p * s[3] + m * s[6], t[1] = f * s[1] + p * s[4] + m * s[7], t[2] = f * s[2] + p * s[5] + m * s[8], t;
}
function jA(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v = s[3], S = a[0], g = a[1], x = a[2], C = p * x - m * g, b = m * S - f * x, R = f * g - p * S;
  return C = C + C, b = b + b, R = R + R, t[0] = S + v * C + p * R - m * b, t[1] = g + v * b + m * C - f * R, t[2] = x + v * R + f * b - p * C, t;
}
function FA(t, a, s, f) {
  var p = [], m = [];
  return p[0] = a[0] - s[0], p[1] = a[1] - s[1], p[2] = a[2] - s[2], m[0] = p[0], m[1] = p[1] * Math.cos(f) - p[2] * Math.sin(f), m[2] = p[1] * Math.sin(f) + p[2] * Math.cos(f), t[0] = m[0] + s[0], t[1] = m[1] + s[1], t[2] = m[2] + s[2], t;
}
function PA(t, a, s, f) {
  var p = [], m = [];
  return p[0] = a[0] - s[0], p[1] = a[1] - s[1], p[2] = a[2] - s[2], m[0] = p[2] * Math.sin(f) + p[0] * Math.cos(f), m[1] = p[1], m[2] = p[2] * Math.cos(f) - p[0] * Math.sin(f), t[0] = m[0] + s[0], t[1] = m[1] + s[1], t[2] = m[2] + s[2], t;
}
function $A(t, a, s, f) {
  var p = [], m = [];
  return p[0] = a[0] - s[0], p[1] = a[1] - s[1], p[2] = a[2] - s[2], m[0] = p[0] * Math.cos(f) - p[1] * Math.sin(f), m[1] = p[0] * Math.sin(f) + p[1] * Math.cos(f), m[2] = p[2], t[0] = m[0] + s[0], t[1] = m[1] + s[1], t[2] = m[2] + s[2], t;
}
function HA(t, a) {
  var s = t[0], f = t[1], p = t[2], m = a[0], v = a[1], S = a[2], g = Math.sqrt((s * s + f * f + p * p) * (m * m + v * v + S * S)), x = g && f1(t, a) / g;
  return Math.acos(Math.min(Math.max(x, -1), 1));
}
function VA(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t;
}
function IA(t) {
  return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
}
function qA(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2];
}
function YA(t, a) {
  var s = t[0], f = t[1], p = t[2], m = a[0], v = a[1], S = a[2];
  return Math.abs(s - m) <= Mt * Math.max(1, Math.abs(s), Math.abs(m)) && Math.abs(f - v) <= Mt * Math.max(1, Math.abs(f), Math.abs(v)) && Math.abs(p - S) <= Mt * Math.max(1, Math.abs(p), Math.abs(S));
}
var WA = cb, BA = fb, GA = db, QA = pb, XA = vb, gb = ub, KA = hb, ZA = (function() {
  var t = u3();
  return function(a, s, f, p, m, v) {
    var S, g;
    for (s || (s = 3), f || (f = 0), p ? g = Math.min(p * s + f, a.length) : g = a.length, S = f; S < g; S += s)
      t[0] = a[S], t[1] = a[S + 1], t[2] = a[S + 2], m(t, t, v), a[S] = t[0], a[S + 1] = t[1], a[S + 2] = t[2];
    return a;
  };
})();
const JA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: xA,
  angle: HA,
  bezier: zA,
  ceil: wA,
  clone: gA,
  copy: SA,
  create: u3,
  cross: q0,
  dist: QA,
  distance: pb,
  div: GA,
  divide: db,
  dot: f1,
  equals: YA,
  exactEquals: qA,
  floor: CA,
  forEach: ZA,
  fromValues: B2,
  hermite: LA,
  inverse: kA,
  len: gb,
  length: ub,
  lerp: OA,
  max: TA,
  min: bA,
  mul: BA,
  multiply: fb,
  negate: DA,
  normalize: mb,
  random: NA,
  rotateX: FA,
  rotateY: PA,
  rotateZ: $A,
  round: RA,
  scale: MA,
  scaleAndAdd: _A,
  set: EA,
  slerp: AA,
  sqrDist: XA,
  sqrLen: KA,
  squaredDistance: vb,
  squaredLength: hb,
  str: IA,
  sub: WA,
  subtract: cb,
  transformMat3: UA,
  transformMat4: yb,
  transformQuat: jA,
  zero: VA
}, Symbol.toStringTag, { value: "Module" }));
function Sb() {
  var t = new cn(4);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0), t;
}
function Eb(t) {
  var a = new cn(4);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a;
}
function xb(t, a, s, f) {
  var p = new cn(4);
  return p[0] = t, p[1] = a, p[2] = s, p[3] = f, p;
}
function wb(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t;
}
function Cb(t, a, s, f, p) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t;
}
function bb(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t;
}
function Tb(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t[2] = a[2] - s[2], t[3] = a[3] - s[3], t;
}
function Rb(t, a, s) {
  return t[0] = a[0] * s[0], t[1] = a[1] * s[1], t[2] = a[2] * s[2], t[3] = a[3] * s[3], t;
}
function Mb(t, a, s) {
  return t[0] = a[0] / s[0], t[1] = a[1] / s[1], t[2] = a[2] / s[2], t[3] = a[3] / s[3], t;
}
function e4(t, a) {
  return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t[2] = Math.ceil(a[2]), t[3] = Math.ceil(a[3]), t;
}
function t4(t, a) {
  return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t[2] = Math.floor(a[2]), t[3] = Math.floor(a[3]), t;
}
function n4(t, a, s) {
  return t[0] = Math.min(a[0], s[0]), t[1] = Math.min(a[1], s[1]), t[2] = Math.min(a[2], s[2]), t[3] = Math.min(a[3], s[3]), t;
}
function r4(t, a, s) {
  return t[0] = Math.max(a[0], s[0]), t[1] = Math.max(a[1], s[1]), t[2] = Math.max(a[2], s[2]), t[3] = Math.max(a[3], s[3]), t;
}
function a4(t, a) {
  return t[0] = qo(a[0]), t[1] = qo(a[1]), t[2] = qo(a[2]), t[3] = qo(a[3]), t;
}
function _b(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t;
}
function i4(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t[2] = a[2] + s[2] * f, t[3] = a[3] + s[3] * f, t;
}
function Db(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2], m = a[3] - t[3];
  return Math.sqrt(s * s + f * f + p * p + m * m);
}
function kb(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1], p = a[2] - t[2], m = a[3] - t[3];
  return s * s + f * f + p * p + m * m;
}
function c3(t) {
  var a = t[0], s = t[1], f = t[2], p = t[3];
  return Math.sqrt(a * a + s * s + f * f + p * p);
}
function f3(t) {
  var a = t[0], s = t[1], f = t[2], p = t[3];
  return a * a + s * s + f * f + p * p;
}
function l4(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = -a[3], t;
}
function o4(t, a) {
  return t[0] = 1 / a[0], t[1] = 1 / a[1], t[2] = 1 / a[2], t[3] = 1 / a[3], t;
}
function Ob(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s * s + f * f + p * p + m * m;
  return v > 0 && (v = 1 / Math.sqrt(v)), t[0] = s * v, t[1] = f * v, t[2] = p * v, t[3] = m * v, t;
}
function d3(t, a) {
  return t[0] * a[0] + t[1] * a[1] + t[2] * a[2] + t[3] * a[3];
}
function s4(t, a, s, f) {
  var p = s[0] * f[1] - s[1] * f[0], m = s[0] * f[2] - s[2] * f[0], v = s[0] * f[3] - s[3] * f[0], S = s[1] * f[2] - s[2] * f[1], g = s[1] * f[3] - s[3] * f[1], x = s[2] * f[3] - s[3] * f[2], C = a[0], b = a[1], R = a[2], D = a[3];
  return t[0] = b * x - R * g + D * S, t[1] = -(C * x) + R * v - D * m, t[2] = C * g - b * v + D * p, t[3] = -(C * S) + b * m - R * p, t;
}
function Ab(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2], S = a[3];
  return t[0] = p + f * (s[0] - p), t[1] = m + f * (s[1] - m), t[2] = v + f * (s[2] - v), t[3] = S + f * (s[3] - S), t;
}
function u4(t, a) {
  a = a === void 0 ? 1 : a;
  var s, f, p, m, v, S, g;
  g = to(), s = g * 2 - 1, f = (4 * to() - 2) * Math.sqrt(g * -g + g), v = s * s + f * f, g = to(), p = g * 2 - 1, m = (4 * to() - 2) * Math.sqrt(g * -g + g), S = p * p + m * m;
  var x = Math.sqrt((1 - v) / S);
  return t[0] = a * s, t[1] = a * f, t[2] = a * p * x, t[3] = a * m * x, t;
}
function c4(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3];
  return t[0] = s[0] * f + s[4] * p + s[8] * m + s[12] * v, t[1] = s[1] * f + s[5] * p + s[9] * m + s[13] * v, t[2] = s[2] * f + s[6] * p + s[10] * m + s[14] * v, t[3] = s[3] * f + s[7] * p + s[11] * m + s[15] * v, t;
}
function f4(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v = s[3], S = a[0], g = a[1], x = a[2], C = p * x - m * g, b = m * S - f * x, R = f * g - p * S;
  return C = C + C, b = b + b, R = R + R, t[0] = S + v * C + p * R - m * b, t[1] = g + v * b + m * C - f * R, t[2] = x + v * R + f * b - p * C, t[3] = a[3], t;
}
function d4(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t;
}
function p4(t) {
  return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
}
function Lb(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3];
}
function v4(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = a[0], S = a[1], g = a[2], x = a[3];
  return Math.abs(s - v) <= Mt * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(f - S) <= Mt * Math.max(1, Math.abs(f), Math.abs(S)) && Math.abs(p - g) <= Mt * Math.max(1, Math.abs(p), Math.abs(g)) && Math.abs(m - x) <= Mt * Math.max(1, Math.abs(m), Math.abs(x));
}
var h4 = Tb, m4 = Rb, y4 = Mb, g4 = Db, S4 = kb, E4 = c3, x4 = f3, w4 = (function() {
  var t = Sb();
  return function(a, s, f, p, m, v) {
    var S, g;
    for (s || (s = 4), f || (f = 0), p ? g = Math.min(p * s + f, a.length) : g = a.length, S = f; S < g; S += s)
      t[0] = a[S], t[1] = a[S + 1], t[2] = a[S + 2], t[3] = a[S + 3], m(t, t, v), a[S] = t[0], a[S + 1] = t[1], a[S + 2] = t[2], a[S + 3] = t[3];
    return a;
  };
})();
const C4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: bb,
  ceil: e4,
  clone: Eb,
  copy: wb,
  create: Sb,
  cross: s4,
  dist: g4,
  distance: Db,
  div: y4,
  divide: Mb,
  dot: d3,
  equals: v4,
  exactEquals: Lb,
  floor: t4,
  forEach: w4,
  fromValues: xb,
  inverse: o4,
  len: E4,
  length: c3,
  lerp: Ab,
  max: r4,
  min: n4,
  mul: m4,
  multiply: Rb,
  negate: l4,
  normalize: Ob,
  random: u4,
  round: a4,
  scale: _b,
  scaleAndAdd: i4,
  set: Cb,
  sqrDist: S4,
  sqrLen: x4,
  squaredDistance: kb,
  squaredLength: f3,
  str: p4,
  sub: h4,
  subtract: Tb,
  transformMat4: c4,
  transformQuat: f4,
  zero: d4
}, Symbol.toStringTag, { value: "Module" }));
function Z0() {
  var t = new cn(4);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t[3] = 1, t;
}
function b4(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t;
}
function zb(t, a, s) {
  s = s * 0.5;
  var f = Math.sin(s);
  return t[0] = f * a[0], t[1] = f * a[1], t[2] = f * a[2], t[3] = Math.cos(s), t;
}
function T4(t, a) {
  var s = Math.acos(a[3]) * 2, f = Math.sin(s / 2);
  return f > Mt ? (t[0] = a[0] / f, t[1] = a[1] / f, t[2] = a[2] / f) : (t[0] = 1, t[1] = 0, t[2] = 0), s;
}
function R4(t, a) {
  var s = v3(t, a);
  return Math.acos(2 * s * s - 1);
}
function Nb(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = s[0], g = s[1], x = s[2], C = s[3];
  return t[0] = f * C + v * S + p * x - m * g, t[1] = p * C + v * g + m * S - f * x, t[2] = m * C + v * x + f * g - p * S, t[3] = v * C - f * S - p * g - m * x, t;
}
function Ub(t, a, s) {
  s *= 0.5;
  var f = a[0], p = a[1], m = a[2], v = a[3], S = Math.sin(s), g = Math.cos(s);
  return t[0] = f * g + v * S, t[1] = p * g + m * S, t[2] = m * g - p * S, t[3] = v * g - f * S, t;
}
function jb(t, a, s) {
  s *= 0.5;
  var f = a[0], p = a[1], m = a[2], v = a[3], S = Math.sin(s), g = Math.cos(s);
  return t[0] = f * g - m * S, t[1] = p * g + v * S, t[2] = m * g + f * S, t[3] = v * g - p * S, t;
}
function Fb(t, a, s) {
  s *= 0.5;
  var f = a[0], p = a[1], m = a[2], v = a[3], S = Math.sin(s), g = Math.cos(s);
  return t[0] = f * g + p * S, t[1] = p * g - f * S, t[2] = m * g + v * S, t[3] = v * g - m * S, t;
}
function M4(t, a) {
  var s = a[0], f = a[1], p = a[2];
  return t[0] = s, t[1] = f, t[2] = p, t[3] = Math.sqrt(Math.abs(1 - s * s - f * f - p * p)), t;
}
function Pb(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = Math.sqrt(s * s + f * f + p * p), S = Math.exp(m), g = v > 0 ? S * Math.sin(v) / v : 0;
  return t[0] = s * g, t[1] = f * g, t[2] = p * g, t[3] = S * Math.cos(v), t;
}
function $b(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = Math.sqrt(s * s + f * f + p * p), S = v > 0 ? Math.atan2(v, m) / v : 0;
  return t[0] = s * S, t[1] = f * S, t[2] = p * S, t[3] = 0.5 * Math.log(s * s + f * f + p * p + m * m), t;
}
function _4(t, a, s) {
  return $b(t, a), Vb(t, t, s), Pb(t, t), t;
}
function Y0(t, a, s, f) {
  var p = a[0], m = a[1], v = a[2], S = a[3], g = s[0], x = s[1], C = s[2], b = s[3], R, D, _, A, L;
  return D = p * g + m * x + v * C + S * b, D < 0 && (D = -D, g = -g, x = -x, C = -C, b = -b), 1 - D > Mt ? (R = Math.acos(D), _ = Math.sin(R), A = Math.sin((1 - f) * R) / _, L = Math.sin(f * R) / _) : (A = 1 - f, L = f), t[0] = A * p + L * g, t[1] = A * m + L * x, t[2] = A * v + L * C, t[3] = A * S + L * b, t;
}
function D4(t) {
  var a = to(), s = to(), f = to(), p = Math.sqrt(1 - a), m = Math.sqrt(a);
  return t[0] = p * Math.sin(2 * Math.PI * s), t[1] = p * Math.cos(2 * Math.PI * s), t[2] = m * Math.sin(2 * Math.PI * f), t[3] = m * Math.cos(2 * Math.PI * f), t;
}
function k4(t, a) {
  var s = a[0], f = a[1], p = a[2], m = a[3], v = s * s + f * f + p * p + m * m, S = v ? 1 / v : 0;
  return t[0] = -s * S, t[1] = -f * S, t[2] = -p * S, t[3] = m * S, t;
}
function O4(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = a[3], t;
}
function Hb(t, a) {
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
function A4(t, a, s, f) {
  var p = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : IC, m = Math.PI / 360;
  a *= m, f *= m, s *= m;
  var v = Math.sin(a), S = Math.cos(a), g = Math.sin(s), x = Math.cos(s), C = Math.sin(f), b = Math.cos(f);
  switch (p) {
    case "xyz":
      t[0] = v * x * b + S * g * C, t[1] = S * g * b - v * x * C, t[2] = S * x * C + v * g * b, t[3] = S * x * b - v * g * C;
      break;
    case "xzy":
      t[0] = v * x * b - S * g * C, t[1] = S * g * b - v * x * C, t[2] = S * x * C + v * g * b, t[3] = S * x * b + v * g * C;
      break;
    case "yxz":
      t[0] = v * x * b + S * g * C, t[1] = S * g * b - v * x * C, t[2] = S * x * C - v * g * b, t[3] = S * x * b + v * g * C;
      break;
    case "yzx":
      t[0] = v * x * b + S * g * C, t[1] = S * g * b + v * x * C, t[2] = S * x * C - v * g * b, t[3] = S * x * b - v * g * C;
      break;
    case "zxy":
      t[0] = v * x * b - S * g * C, t[1] = S * g * b + v * x * C, t[2] = S * x * C + v * g * b, t[3] = S * x * b - v * g * C;
      break;
    case "zyx":
      t[0] = v * x * b - S * g * C, t[1] = S * g * b + v * x * C, t[2] = S * x * C - v * g * b, t[3] = S * x * b + v * g * C;
      break;
    default:
      throw new Error("Unknown angle order " + p);
  }
  return t;
}
function L4(t) {
  return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
}
var z4 = Eb, N4 = xb, p3 = wb, U4 = Cb, j4 = bb, F4 = Nb, Vb = _b, v3 = d3, P4 = Ab, h3 = c3, $4 = h3, m3 = f3, H4 = m3, y3 = Ob, V4 = Lb;
function I4(t, a) {
  return Math.abs(d3(t, a)) >= 1 - Mt;
}
var q4 = (function() {
  var t = u3(), a = B2(1, 0, 0), s = B2(0, 1, 0);
  return function(f, p, m) {
    var v = f1(p, m);
    return v < -0.999999 ? (q0(t, a, p), gb(t) < 1e-6 && q0(t, s, p), mb(t, t), zb(f, t, Math.PI), f) : v > 0.999999 ? (f[0] = 0, f[1] = 0, f[2] = 0, f[3] = 1, f) : (q0(t, p, m), f[0] = t[0], f[1] = t[1], f[2] = t[2], f[3] = 1 + v, y3(f, f));
  };
})(), Y4 = (function() {
  var t = Z0(), a = Z0();
  return function(s, f, p, m, v, S) {
    return Y0(t, f, v, S), Y0(a, p, m, S), Y0(s, t, a, 2 * S * (1 - S)), s;
  };
})(), W4 = (function() {
  var t = GC();
  return function(a, s, f, p) {
    return t[0] = f[0], t[3] = f[1], t[6] = f[2], t[1] = p[0], t[4] = p[1], t[7] = p[2], t[2] = -s[0], t[5] = -s[1], t[8] = -s[2], y3(a, Hb(a, t));
  };
})();
const B4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: j4,
  calculateW: M4,
  clone: z4,
  conjugate: O4,
  copy: p3,
  create: Z0,
  dot: v3,
  equals: I4,
  exactEquals: V4,
  exp: Pb,
  fromEuler: A4,
  fromMat3: Hb,
  fromValues: N4,
  getAngle: R4,
  getAxisAngle: T4,
  identity: b4,
  invert: k4,
  len: $4,
  length: h3,
  lerp: P4,
  ln: $b,
  mul: F4,
  multiply: Nb,
  normalize: y3,
  pow: _4,
  random: D4,
  rotateX: Ub,
  rotateY: jb,
  rotateZ: Fb,
  rotationTo: q4,
  scale: Vb,
  set: U4,
  setAxes: W4,
  setAxisAngle: zb,
  slerp: Y0,
  sqlerp: Y4,
  sqrLen: H4,
  squaredLength: m3,
  str: L4
}, Symbol.toStringTag, { value: "Module" }));
function G4() {
  var t = new cn(8);
  return cn != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[3] = 1, t;
}
function Q4(t) {
  var a = new cn(8);
  return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a;
}
function X4(t, a, s, f, p, m, v, S) {
  var g = new cn(8);
  return g[0] = t, g[1] = a, g[2] = s, g[3] = f, g[4] = p, g[5] = m, g[6] = v, g[7] = S, g;
}
function K4(t, a, s, f, p, m, v) {
  var S = new cn(8);
  S[0] = t, S[1] = a, S[2] = s, S[3] = f;
  var g = p * 0.5, x = m * 0.5, C = v * 0.5;
  return S[4] = g * f + x * s - C * a, S[5] = x * f + C * t - g * s, S[6] = C * f + g * a - x * t, S[7] = -g * t - x * a - C * s, S;
}
function Ib(t, a, s) {
  var f = s[0] * 0.5, p = s[1] * 0.5, m = s[2] * 0.5, v = a[0], S = a[1], g = a[2], x = a[3];
  return t[0] = v, t[1] = S, t[2] = g, t[3] = x, t[4] = f * x + p * g - m * S, t[5] = p * x + m * v - f * g, t[6] = m * x + f * S - p * v, t[7] = -f * v - p * S - m * g, t;
}
function Z4(t, a) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = a[0] * 0.5, t[5] = a[1] * 0.5, t[6] = a[2] * 0.5, t[7] = 0, t;
}
function J4(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0, t;
}
function eL(t, a) {
  var s = Z0();
  rb(s, a);
  var f = new cn(3);
  return tb(f, a), Ib(t, s, f), t;
}
function qb(t, a) {
  return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t;
}
function tL(t) {
  return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0, t;
}
function nL(t, a, s, f, p, m, v, S, g) {
  return t[0] = a, t[1] = s, t[2] = f, t[3] = p, t[4] = m, t[5] = v, t[6] = S, t[7] = g, t;
}
var rL = p3;
function aL(t, a) {
  return t[0] = a[4], t[1] = a[5], t[2] = a[6], t[3] = a[7], t;
}
var iL = p3;
function lL(t, a) {
  return t[4] = a[0], t[5] = a[1], t[6] = a[2], t[7] = a[3], t;
}
function oL(t, a) {
  var s = a[4], f = a[5], p = a[6], m = a[7], v = -a[0], S = -a[1], g = -a[2], x = a[3];
  return t[0] = (s * x + m * v + f * g - p * S) * 2, t[1] = (f * x + m * S + p * v - s * g) * 2, t[2] = (p * x + m * g + s * S - f * v) * 2, t;
}
function sL(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = s[0] * 0.5, g = s[1] * 0.5, x = s[2] * 0.5, C = a[4], b = a[5], R = a[6], D = a[7];
  return t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = v * S + p * x - m * g + C, t[5] = v * g + m * S - f * x + b, t[6] = v * x + f * g - p * S + R, t[7] = -f * S - p * g - m * x + D, t;
}
function uL(t, a, s) {
  var f = -a[0], p = -a[1], m = -a[2], v = a[3], S = a[4], g = a[5], x = a[6], C = a[7], b = S * v + C * f + g * m - x * p, R = g * v + C * p + x * f - S * m, D = x * v + C * m + S * p - g * f, _ = C * v - S * f - g * p - x * m;
  return Ub(t, a, s), f = t[0], p = t[1], m = t[2], v = t[3], t[4] = b * v + _ * f + R * m - D * p, t[5] = R * v + _ * p + D * f - b * m, t[6] = D * v + _ * m + b * p - R * f, t[7] = _ * v - b * f - R * p - D * m, t;
}
function cL(t, a, s) {
  var f = -a[0], p = -a[1], m = -a[2], v = a[3], S = a[4], g = a[5], x = a[6], C = a[7], b = S * v + C * f + g * m - x * p, R = g * v + C * p + x * f - S * m, D = x * v + C * m + S * p - g * f, _ = C * v - S * f - g * p - x * m;
  return jb(t, a, s), f = t[0], p = t[1], m = t[2], v = t[3], t[4] = b * v + _ * f + R * m - D * p, t[5] = R * v + _ * p + D * f - b * m, t[6] = D * v + _ * m + b * p - R * f, t[7] = _ * v - b * f - R * p - D * m, t;
}
function fL(t, a, s) {
  var f = -a[0], p = -a[1], m = -a[2], v = a[3], S = a[4], g = a[5], x = a[6], C = a[7], b = S * v + C * f + g * m - x * p, R = g * v + C * p + x * f - S * m, D = x * v + C * m + S * p - g * f, _ = C * v - S * f - g * p - x * m;
  return Fb(t, a, s), f = t[0], p = t[1], m = t[2], v = t[3], t[4] = b * v + _ * f + R * m - D * p, t[5] = R * v + _ * p + D * f - b * m, t[6] = D * v + _ * m + b * p - R * f, t[7] = _ * v - b * f - R * p - D * m, t;
}
function dL(t, a, s) {
  var f = s[0], p = s[1], m = s[2], v = s[3], S = a[0], g = a[1], x = a[2], C = a[3];
  return t[0] = S * v + C * f + g * m - x * p, t[1] = g * v + C * p + x * f - S * m, t[2] = x * v + C * m + S * p - g * f, t[3] = C * v - S * f - g * p - x * m, S = a[4], g = a[5], x = a[6], C = a[7], t[4] = S * v + C * f + g * m - x * p, t[5] = g * v + C * p + x * f - S * m, t[6] = x * v + C * m + S * p - g * f, t[7] = C * v - S * f - g * p - x * m, t;
}
function pL(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = s[0], g = s[1], x = s[2], C = s[3];
  return t[0] = f * C + v * S + p * x - m * g, t[1] = p * C + v * g + m * S - f * x, t[2] = m * C + v * x + f * g - p * S, t[3] = v * C - f * S - p * g - m * x, S = s[4], g = s[5], x = s[6], C = s[7], t[4] = f * C + v * S + p * x - m * g, t[5] = p * C + v * g + m * S - f * x, t[6] = m * C + v * x + f * g - p * S, t[7] = v * C - f * S - p * g - m * x, t;
}
function vL(t, a, s, f) {
  if (Math.abs(f) < Mt)
    return qb(t, a);
  var p = Math.sqrt(s[0] * s[0] + s[1] * s[1] + s[2] * s[2]);
  f = f * 0.5;
  var m = Math.sin(f), v = m * s[0] / p, S = m * s[1] / p, g = m * s[2] / p, x = Math.cos(f), C = a[0], b = a[1], R = a[2], D = a[3];
  t[0] = C * x + D * v + b * g - R * S, t[1] = b * x + D * S + R * v - C * g, t[2] = R * x + D * g + C * S - b * v, t[3] = D * x - C * v - b * S - R * g;
  var _ = a[4], A = a[5], L = a[6], U = a[7];
  return t[4] = _ * x + U * v + A * g - L * S, t[5] = A * x + U * S + L * v - _ * g, t[6] = L * x + U * g + _ * S - A * v, t[7] = U * x - _ * v - A * S - L * g, t;
}
function hL(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t[2] = a[2] + s[2], t[3] = a[3] + s[3], t[4] = a[4] + s[4], t[5] = a[5] + s[5], t[6] = a[6] + s[6], t[7] = a[7] + s[7], t;
}
function Yb(t, a, s) {
  var f = a[0], p = a[1], m = a[2], v = a[3], S = s[4], g = s[5], x = s[6], C = s[7], b = a[4], R = a[5], D = a[6], _ = a[7], A = s[0], L = s[1], U = s[2], q = s[3];
  return t[0] = f * q + v * A + p * U - m * L, t[1] = p * q + v * L + m * A - f * U, t[2] = m * q + v * U + f * L - p * A, t[3] = v * q - f * A - p * L - m * U, t[4] = f * C + v * S + p * x - m * g + b * q + _ * A + R * U - D * L, t[5] = p * C + v * g + m * S - f * x + R * q + _ * L + D * A - b * U, t[6] = m * C + v * x + f * g - p * S + D * q + _ * U + b * L - R * A, t[7] = v * C - f * S - p * g - m * x + _ * q - b * A - R * L - D * U, t;
}
var mL = Yb;
function yL(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t[2] = a[2] * s, t[3] = a[3] * s, t[4] = a[4] * s, t[5] = a[5] * s, t[6] = a[6] * s, t[7] = a[7] * s, t;
}
var Wb = v3;
function gL(t, a, s, f) {
  var p = 1 - f;
  return Wb(a, s) < 0 && (f = -f), t[0] = a[0] * p + s[0] * f, t[1] = a[1] * p + s[1] * f, t[2] = a[2] * p + s[2] * f, t[3] = a[3] * p + s[3] * f, t[4] = a[4] * p + s[4] * f, t[5] = a[5] * p + s[5] * f, t[6] = a[6] * p + s[6] * f, t[7] = a[7] * p + s[7] * f, t;
}
function SL(t, a) {
  var s = d1(a);
  return t[0] = -a[0] / s, t[1] = -a[1] / s, t[2] = -a[2] / s, t[3] = a[3] / s, t[4] = -a[4] / s, t[5] = -a[5] / s, t[6] = -a[6] / s, t[7] = a[7] / s, t;
}
function EL(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = a[3], t[4] = -a[4], t[5] = -a[5], t[6] = -a[6], t[7] = a[7], t;
}
var Bb = h3, xL = Bb, d1 = m3, wL = d1;
function CL(t, a) {
  var s = d1(a);
  if (s > 0) {
    s = Math.sqrt(s);
    var f = a[0] / s, p = a[1] / s, m = a[2] / s, v = a[3] / s, S = a[4], g = a[5], x = a[6], C = a[7], b = f * S + p * g + m * x + v * C;
    t[0] = f, t[1] = p, t[2] = m, t[3] = v, t[4] = (S - f * b) / s, t[5] = (g - p * b) / s, t[6] = (x - m * b) / s, t[7] = (C - v * b) / s;
  }
  return t;
}
function bL(t) {
  return "quat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ")";
}
function TL(t, a) {
  return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7];
}
function RL(t, a) {
  var s = t[0], f = t[1], p = t[2], m = t[3], v = t[4], S = t[5], g = t[6], x = t[7], C = a[0], b = a[1], R = a[2], D = a[3], _ = a[4], A = a[5], L = a[6], U = a[7];
  return Math.abs(s - C) <= Mt * Math.max(1, Math.abs(s), Math.abs(C)) && Math.abs(f - b) <= Mt * Math.max(1, Math.abs(f), Math.abs(b)) && Math.abs(p - R) <= Mt * Math.max(1, Math.abs(p), Math.abs(R)) && Math.abs(m - D) <= Mt * Math.max(1, Math.abs(m), Math.abs(D)) && Math.abs(v - _) <= Mt * Math.max(1, Math.abs(v), Math.abs(_)) && Math.abs(S - A) <= Mt * Math.max(1, Math.abs(S), Math.abs(A)) && Math.abs(g - L) <= Mt * Math.max(1, Math.abs(g), Math.abs(L)) && Math.abs(x - U) <= Mt * Math.max(1, Math.abs(x), Math.abs(U));
}
const ML = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: hL,
  clone: Q4,
  conjugate: EL,
  copy: qb,
  create: G4,
  dot: Wb,
  equals: RL,
  exactEquals: TL,
  fromMat4: eL,
  fromRotation: J4,
  fromRotationTranslation: Ib,
  fromRotationTranslationValues: K4,
  fromTranslation: Z4,
  fromValues: X4,
  getDual: aL,
  getReal: rL,
  getTranslation: oL,
  identity: tL,
  invert: SL,
  len: xL,
  length: Bb,
  lerp: gL,
  mul: mL,
  multiply: Yb,
  normalize: CL,
  rotateAroundAxis: vL,
  rotateByQuatAppend: dL,
  rotateByQuatPrepend: pL,
  rotateX: uL,
  rotateY: cL,
  rotateZ: fL,
  scale: yL,
  set: nL,
  setDual: lL,
  setReal: iL,
  sqrLen: wL,
  squaredLength: d1,
  str: bL,
  translate: sL
}, Symbol.toStringTag, { value: "Module" }));
function Gb() {
  var t = new cn(2);
  return cn != Float32Array && (t[0] = 0, t[1] = 0), t;
}
function _L(t) {
  var a = new cn(2);
  return a[0] = t[0], a[1] = t[1], a;
}
function DL(t, a) {
  var s = new cn(2);
  return s[0] = t, s[1] = a, s;
}
function kL(t, a) {
  return t[0] = a[0], t[1] = a[1], t;
}
function OL(t, a, s) {
  return t[0] = a, t[1] = s, t;
}
function AL(t, a, s) {
  return t[0] = a[0] + s[0], t[1] = a[1] + s[1], t;
}
function Qb(t, a, s) {
  return t[0] = a[0] - s[0], t[1] = a[1] - s[1], t;
}
function Xb(t, a, s) {
  return t[0] = a[0] * s[0], t[1] = a[1] * s[1], t;
}
function Kb(t, a, s) {
  return t[0] = a[0] / s[0], t[1] = a[1] / s[1], t;
}
function LL(t, a) {
  return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t;
}
function zL(t, a) {
  return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t;
}
function NL(t, a, s) {
  return t[0] = Math.min(a[0], s[0]), t[1] = Math.min(a[1], s[1]), t;
}
function UL(t, a, s) {
  return t[0] = Math.max(a[0], s[0]), t[1] = Math.max(a[1], s[1]), t;
}
function jL(t, a) {
  return t[0] = qo(a[0]), t[1] = qo(a[1]), t;
}
function FL(t, a, s) {
  return t[0] = a[0] * s, t[1] = a[1] * s, t;
}
function PL(t, a, s, f) {
  return t[0] = a[0] + s[0] * f, t[1] = a[1] + s[1] * f, t;
}
function Zb(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1];
  return Math.sqrt(s * s + f * f);
}
function Jb(t, a) {
  var s = a[0] - t[0], f = a[1] - t[1];
  return s * s + f * f;
}
function eT(t) {
  var a = t[0], s = t[1];
  return Math.sqrt(a * a + s * s);
}
function tT(t) {
  var a = t[0], s = t[1];
  return a * a + s * s;
}
function $L(t, a) {
  return t[0] = -a[0], t[1] = -a[1], t;
}
function HL(t, a) {
  return t[0] = 1 / a[0], t[1] = 1 / a[1], t;
}
function VL(t, a) {
  var s = a[0], f = a[1], p = s * s + f * f;
  return p > 0 && (p = 1 / Math.sqrt(p)), t[0] = a[0] * p, t[1] = a[1] * p, t;
}
function IL(t, a) {
  return t[0] * a[0] + t[1] * a[1];
}
function qL(t, a, s) {
  var f = a[0] * s[1] - a[1] * s[0];
  return t[0] = t[1] = 0, t[2] = f, t;
}
function YL(t, a, s, f) {
  var p = a[0], m = a[1];
  return t[0] = p + f * (s[0] - p), t[1] = m + f * (s[1] - m), t;
}
function WL(t, a) {
  a = a === void 0 ? 1 : a;
  var s = to() * 2 * Math.PI;
  return t[0] = Math.cos(s) * a, t[1] = Math.sin(s) * a, t;
}
function BL(t, a, s) {
  var f = a[0], p = a[1];
  return t[0] = s[0] * f + s[2] * p, t[1] = s[1] * f + s[3] * p, t;
}
function GL(t, a, s) {
  var f = a[0], p = a[1];
  return t[0] = s[0] * f + s[2] * p + s[4], t[1] = s[1] * f + s[3] * p + s[5], t;
}
function QL(t, a, s) {
  var f = a[0], p = a[1];
  return t[0] = s[0] * f + s[3] * p + s[6], t[1] = s[1] * f + s[4] * p + s[7], t;
}
function XL(t, a, s) {
  var f = a[0], p = a[1];
  return t[0] = s[0] * f + s[4] * p + s[12], t[1] = s[1] * f + s[5] * p + s[13], t;
}
function KL(t, a, s, f) {
  var p = a[0] - s[0], m = a[1] - s[1], v = Math.sin(f), S = Math.cos(f);
  return t[0] = p * S - m * v + s[0], t[1] = p * v + m * S + s[1], t;
}
function ZL(t, a) {
  var s = t[0], f = t[1], p = a[0], m = a[1];
  return Math.abs(Math.atan2(f * p - s * m, s * p + f * m));
}
function JL(t, a) {
  var s = t[0], f = t[1], p = a[0], m = a[1];
  return Math.atan2(s * m - f * p, s * p + f * m);
}
function ez(t) {
  return t[0] = 0, t[1] = 0, t;
}
function tz(t) {
  return "vec2(" + t[0] + ", " + t[1] + ")";
}
function nz(t, a) {
  return t[0] === a[0] && t[1] === a[1];
}
function rz(t, a) {
  var s = t[0], f = t[1], p = a[0], m = a[1];
  return Math.abs(s - p) <= Mt * Math.max(1, Math.abs(s), Math.abs(p)) && Math.abs(f - m) <= Mt * Math.max(1, Math.abs(f), Math.abs(m));
}
var az = eT, iz = Qb, lz = Xb, oz = Kb, sz = Zb, uz = Jb, cz = tT, fz = (function() {
  var t = Gb();
  return function(a, s, f, p, m, v) {
    var S, g;
    for (s || (s = 2), f || (f = 0), p ? g = Math.min(p * s + f, a.length) : g = a.length, S = f; S < g; S += s)
      t[0] = a[S], t[1] = a[S + 1], m(t, t, v), a[S] = t[0], a[S + 1] = t[1];
    return a;
  };
})();
const dz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: AL,
  angle: ZL,
  ceil: LL,
  clone: _L,
  copy: kL,
  create: Gb,
  cross: qL,
  dist: sz,
  distance: Zb,
  div: oz,
  divide: Kb,
  dot: IL,
  equals: rz,
  exactEquals: nz,
  floor: zL,
  forEach: fz,
  fromValues: DL,
  inverse: HL,
  len: az,
  length: eT,
  lerp: YL,
  max: UL,
  min: NL,
  mul: lz,
  multiply: Xb,
  negate: $L,
  normalize: VL,
  random: WL,
  rotate: KL,
  round: jL,
  scale: FL,
  scaleAndAdd: PL,
  set: OL,
  signedAngle: JL,
  sqrDist: uz,
  sqrLen: cz,
  squaredDistance: Jb,
  squaredLength: tT,
  str: tz,
  sub: iz,
  subtract: Qb,
  transformMat2: BL,
  transformMat2d: GL,
  transformMat3: QL,
  transformMat4: XL,
  zero: ez
}, Symbol.toStringTag, { value: "Module" })), pz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: o5,
  mat2: A5,
  mat2d: nO,
  mat3: AO,
  mat4: sb,
  quat: B4,
  quat2: ML,
  vec2: dz,
  vec3: JA,
  vec4: C4
}, Symbol.toStringTag, { value: "Module" })), p1 = c1;
function v1() {
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
var Wn = v1.prototype = Object.create($n.prototype), Gi = new Float32Array([0, 0, 0]), xl = new Float32Array(16);
Wn.constructor = v1;
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
  Gi[0] = t, Gi[1] = a, Gi[2] = s, f === "world" ? (s3(xl), W2(xl, xl, Gi), p1(this.local, xl, this.local)) : W2(this.local, this.local, Gi);
};
Wn.rotate = function(t, a, s, f) {
  var p = Math.PI / 180, m = sb;
  f === "world" ? (m.identity(xl), m.rotateZ(xl, xl, s * p), m.rotateY(xl, xl, a * p), m.rotateX(xl, xl, t * p), p1(this.local, xl, this.local)) : (m.rotateZ(this.local, this.local, s * p), m.rotateY(this.local, this.local, a * p), m.rotateX(this.local, this.local, t * p));
};
Wn.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.worldMatrix.set(this.local) : p1(this.worldMatrix, this.parent.getLocalToWorld(), this.local)), this.worldMatrix;
};
Wn.getWorldToLocal = function() {
  return this.dirtyW === !0 && KC(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
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
  Gi[0] = t, Gi[1] = a, Gi[2] = s, this.parent !== null && yb(
    Gi,
    Gi,
    this.parent.getWorldToLocal()
  ), this.local[12] = Gi[0], this.local[13] = Gi[1], this.local[14] = Gi[2];
};
Wn.setLocalPosition = function(t, a, s) {
  this.local[12] = t, this.local[13] = a, this.local[14] = s;
};
Wn.scale = function(t, a, s) {
  JC(this.local, this.local, [t, a, s]);
};
Wn.updateWorldMatrix = function(t = !1) {
  this.parent === null ? this.worldMatrix.set(this.local) : (t && this.parent.updateWorldMatrix(t), p1(this.worldMatrix, this.parent.worldMatrix, this.local));
};
function ai(t) {
  this.instanceId = ai.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new v1()), this.name = t || "gameObject";
}
var Tl = ai.prototype;
Tl.instanceId = 0;
Tl.name = null;
Tl.layer = 0;
Tl.scene = null;
Tl.world = null;
Tl.transform = null;
Tl.components = null;
Tl.componentsCount = 0;
Tl.setScene = function(t) {
  this.scene = t;
};
Tl.addComponent = function(t) {
  return this.components[this.componentsCount++] = t, t.setGameObject(this), t;
};
Tl.removeComponent = function(t) {
  t.unsetGameObject();
};
Tl.getComponent = function(t) {
  for (var a = 0; a < this.components.length; a++) {
    var s = this.components[a];
    if (s instanceof t) return s;
  }
  return null;
};
const g3 = {
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
pr.prototype.fogType = g3.LINEAR;
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
  ], lb(
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
  return c1(this.clipSpaceMatrix, this.projectionMatrix, t), this.clipSpaceMatrix;
};
pr.FogType = g3;
function nT(t) {
  ai.call(this, t || "camera"), this.addComponent(new pr(this.transform));
}
nT.prototype = Object.create(ai.prototype);
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
    const m = a[p] * 3, v = a[p + 1] * 3, S = a[p + 2] * 3, g = s[v] - s[m], x = s[v + 1] - s[m + 1], C = s[v + 2] - s[m + 2], b = s[S] - s[m], R = s[S + 1] - s[m + 1], D = s[S + 2] - s[m + 2];
    let _ = (x * D - C * R) * t, A = (C * b - g * D) * t, L = (g * R - x * b) * t;
    const U = Math.sqrt(_ * _ + A * A + L * L);
    if (U > 1e-10) {
      const q = 1 / U;
      this.faceNormals[p] = _ * q, this.faceNormals[p + 1] = A * q, this.faceNormals[p + 2] = L * q, this.vertexNormals[m] += _, this.vertexNormals[m + 1] += A, this.vertexNormals[m + 2] += L, this.vertexNormals[v] += _, this.vertexNormals[v + 1] += A, this.vertexNormals[v + 2] += L, this.vertexNormals[S] += _, this.vertexNormals[S + 1] += A, this.vertexNormals[S + 2] += L;
    }
  }
  for (let p = 0; p < this.vertexNormals.length; p += 3) {
    const m = this.vertexNormals[p], v = this.vertexNormals[p + 1], S = this.vertexNormals[p + 2], g = Math.sqrt(m * m + v * v + S * S);
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
  const s = a[0], f = a[1], p = a[2], m = a[4], v = a[5], S = a[6], g = a[8], x = a[9], C = a[10], b = v * C - S * x, R = -(m * C - S * g), D = m * x - v * g, _ = s * b + f * R + p * D;
  if (Math.abs(_) < 1e-6) return null;
  const A = 1 / _;
  t[0] = b * A, t[1] = R * A, t[2] = D * A, t[3] = -(f * C - p * x) * A, t[4] = (s * C - p * g) * A, t[5] = -(s * x - f * g) * A, t[6] = (f * S - p * v) * A, t[7] = -(s * S - p * m) * A, t[8] = (s * v - f * m) * A;
};
lr.computeBoundsFlatArray = function(t, a, s) {
  if (s.length !== 0) {
    for (var f = s[0], p = f, m = s[1], v = m, S = s[2], g = S, x = 3; x < s.length; x += 3) {
      var C = s[x], b = s[x + 1], R = s[x + 2];
      C < f ? f = C : C > p && (p = C), b < m ? m = b : b > v && (v = b), R < S ? S = R : R > g && (g = R);
    }
    return t[a] = f, t[a + 1] = m, t[a + 2] = S, t[a + 3] = p, t[a + 4] = m, t[a + 5] = S, t[a + 6] = f, t[a + 7] = v, t[a + 8] = S, t[a + 9] = p, t[a + 10] = v, t[a + 11] = S, t[a + 12] = f, t[a + 13] = m, t[a + 14] = g, t[a + 15] = p, t[a + 16] = m, t[a + 17] = g, t[a + 18] = f, t[a + 19] = v, t[a + 20] = g, t[a + 21] = p, t[a + 22] = v, t[a + 23] = g, t;
  }
};
lr.computeBoundingSphere = function(t, a, s) {
  let f = 1 / 0, p = 1 / 0, m = 1 / 0, v = -1 / 0, S = -1 / 0, g = -1 / 0;
  for (let L = 0; L < s.length; L += 3) {
    const U = s[L], q = s[L + 1], H = s[L + 2];
    U < f && (f = U), U > v && (v = U), q < p && (p = q), q > S && (S = q), H < m && (m = H), H > g && (g = H);
  }
  const x = (f + v) * 0.5, C = (p + S) * 0.5, b = (m + g) * 0.5, R = v - x, D = S - C, _ = g - b, A = Math.sqrt(R * R + D * D + _ * _);
  t[a] = x, t[a + 1] = C, t[a + 2] = b, t[a + 3] = A;
};
lr.computeWeldMap = function(t, a, s = 1e-4) {
  const f = t.length / 3 | 0, p = a && a.length === f ? a : new Uint32Array(f), m = {};
  for (let v = 0; v < f; v++) {
    const S = v * 3;
    let g = t[S], x = t[S + 1], C = t[S + 2];
    Math.abs(g) < s && (g = 0), Math.abs(x) < s && (x = 0), Math.abs(C) < s && (C = 0);
    const b = g.toFixed(4) + "," + x.toFixed(4) + "," + C.toFixed(4), R = m[b];
    R === void 0 ? (m[b] = v, p[v] = v) : p[v] = R;
  }
  return p;
};
lr.computeAdjacency = function(t, a, s, f) {
  const p = t.length / 3 | 0, m = p * 3, v = s && s.length === m ? s : new Int32Array(m), S = f && f.length === m ? f : new Int32Array(m);
  v.fill(-1), S.fill(-1);
  const g = /* @__PURE__ */ new Map();
  for (let C = 0; C < p; C++)
    for (let b = 0; b < 3; b++) {
      const R = t[C * 3 + b], D = t[C * 3 + (b + 1) % 3], _ = a ? a[R] : R, A = a ? a[D] : D;
      if (_ === A) continue;
      const L = C * 3 + b, U = g.get(A * 4294967296 + _), q = U === void 0 ? -1 : U / 3 | 0;
      U !== void 0 && v[U] === -1 && q !== C && (v[L] = q, S[L] = U - q * 3, v[U] = C, S[U] = b), g.has(_ * 4294967296 + A) || g.set(_ * 4294967296 + A, L);
    }
  let x = 0;
  for (let C = 0; C < m; C++) v[C] === -1 && x++;
  return { adjTri: v, adjEdge: S, boundaryEdges: x };
};
function S3(t) {
  $n.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var Us = S3.prototype = Object.create($n.prototype);
Us.constructor = S3;
Us.sprite = null;
Us.pivotX = 0;
Us.pivotY = 0;
Us.layer = 0;
Us.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.spriteRenderer = this;
};
Us.setSprite = function(t) {
  return this.sprite = t, this.enabled = !0, this;
};
Us.setPivot = function(t, a) {
  return this.pivotX = t, this.pivotY = a, this;
};
Us.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, $n.prototype.unsetGameObject.call(this);
};
function E3() {
  $n.call(this), this.points = [];
}
var vf = E3.prototype = Object.create($n.prototype);
vf.constructor = E3;
vf.points = null;
vf.color = "white";
vf.width = 1;
vf.layer = 0;
vf.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.pathRenderer = this;
};
vf.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, $n.prototype.unsetGameObject.call(this);
};
function x3() {
  $n.call(this);
}
var js = x3.prototype = Object.create($n.prototype);
js.constructor = x3;
js.text = "sample text";
js.color = "white";
js.style = "normal 12px arial";
js.layer = 0;
js.align = "center";
js.valign = "middle";
js.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.textRenderer = this;
};
js.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, $n.prototype.unsetGameObject.call(this);
};
function vz(t, a, s) {
  const f = [], p = [], m = t / 2, v = a / 2, S = t / s, g = a / s;
  for (let C = 0; C <= s; C++) {
    const b = C * g - v;
    for (let R = 0; R <= s; R++) {
      const D = R * S - m;
      f.push(D, 0, b);
    }
  }
  const x = s + 1;
  for (let C = 0; C < s; C++)
    for (let b = 0; b < s; b++) {
      const R = C * x + b, D = C * x + (b + 1), _ = (C + 1) * x + b, A = (C + 1) * x + (b + 1);
      p.push(R, _, D), p.push(A, D, _);
    }
  return {
    vertices: new Float32Array(f),
    faces: new Uint16Array(p),
    colors: new Uint32Array(f.length / 3).fill(255)
  };
}
const kh = vz(1, 1, 1), w3 = new Float32Array(32);
lr.computeBoundsFlatArray(w3, 0, kh.vertices);
lr.computeBoundingSphere(w3, 28, kh.vertices);
function rT() {
  ai.call(this);
  const t = new lr();
  t.faces = kh.faces, t.vertices = kh.vertices, t.colors = kh.colors, t.bounds = w3, t.updateNormals(), this.addComponent(t);
}
rT.prototype = Object.create(ai.prototype);
function hz(t, a, s, f) {
  const p = [], m = [], v = [];
  function S(x, C, b, R, D, _) {
    const A = `${x.toFixed(5)},${C.toFixed(5)},${b.toFixed(5)}`;
    if (_[A] !== void 0) return _[A];
    const L = p.length / 3;
    return p.push(x, C, b), m.push(R, D), _[A] = L, L;
  }
  function g(x, C, b, R, D, _, A, L, U, q) {
    const H = {}, $ = A / q, V = L / q, F = A / 2, B = L / 2, ie = U / 2 * _, X = [];
    for (let j = 0; j <= q; j++) {
      const ne = [], ae = j * V - B;
      for (let G = 0; G <= q; G++) {
        const K = G * $ - F, le = [0, 0, 0];
        le[x] = K * R, le[C] = ae * D, le[b] = ie;
        const de = G / q, oe = 1 - j / q;
        ne.push(S(le[0], le[1], le[2], de, oe, H));
      }
      X.push(ne);
    }
    for (let j = 0; j < q; j++)
      for (let ne = 0; ne < q; ne++) {
        const ae = X[j][ne], G = X[j + 1][ne], K = X[j + 1][ne + 1], le = X[j][ne + 1];
        v.push(ae, le, G), v.push(G, le, K);
      }
  }
  return g(0, 1, 2, 1, 1, 1, t, a, s, f), g(0, 1, 2, -1, 1, -1, t, a, s, f), g(2, 1, 0, -1, 1, 1, s, a, t, f), g(2, 1, 0, 1, 1, -1, s, a, t, f), g(0, 2, 1, 1, -1, 1, t, s, a, f), g(0, 2, 1, 1, 1, -1, t, s, a, f), {
    vertices: new Float32Array(p),
    uvs: new Float32Array(m),
    faces: new Uint16Array(v),
    colors: new Uint32Array(p.length / 3).fill(255)
  };
}
const tp = hz(1, 1, 1, 1), C3 = new Float32Array(32);
lr.computeBoundsFlatArray(C3, 0, tp.vertices);
lr.computeBoundingSphere(C3, 28, tp.vertices);
function aT() {
  ai.call(this);
  const t = new lr();
  t.vertices = tp.vertices, t.uvs = tp.uvs, t.faces = tp.faces, t.colors = tp.colors, t.bounds = C3, t.updateNormals(), this.addComponent(t);
}
aT.prototype = Object.create(ai.prototype);
function mz(t, a, s) {
  const f = [], p = [];
  f.push(0, s, 0), f.push(0, 0, 0);
  for (let m = 0; m < t; m++) {
    const v = m / t * Math.PI * 2, S = Math.cos(v) * a, g = Math.sin(v) * a;
    f.push(S, 0, g);
  }
  for (let m = 0; m < t; m++) {
    const v = m + 2, S = m === t - 1 ? 2 : m + 3;
    p.push(0, S, v), p.push(1, v, S);
  }
  return {
    vertices: new Float32Array(f),
    faces: new Uint16Array(p),
    colors: new Uint32Array(f.length / 3).fill(255)
  };
}
const Oh = mz(7, 0.5, 1), b3 = new Float32Array(32);
lr.computeBoundsFlatArray(b3, 0, Oh.vertices);
lr.computeBoundingSphere(b3, 28, Oh.vertices);
function iT() {
  ai.call(this);
  const t = new lr();
  t.vertices = Oh.vertices, t.faces = Oh.faces, t.colors = Oh.colors, t.bounds = b3, t.updateNormals(), this.addComponent(t);
}
iT.prototype = Object.create(ai.prototype);
function yz(t, a, s) {
  const f = [], p = [], m = [], v = {};
  function S(x, C, b, R, D) {
    const _ = `${x.toFixed(5)},${C.toFixed(5)},${b.toFixed(5)}`;
    if (v[_] !== void 0) return v[_];
    const A = f.length / 3;
    return f.push(x, C, b), p.push(R, D), v[_] = A, A;
  }
  const g = [];
  for (let x = 0; x <= t; x++) {
    const C = [], b = x * Math.PI / t, R = Math.sin(b), D = Math.cos(b);
    for (let _ = 0; _ <= a; _++) {
      const A = _ * 2 * Math.PI / a, L = Math.cos(A) * R * s, U = D * s, q = Math.sin(A) * R * s, H = _ / a, $ = x / t;
      C.push(S(L, U, q, H, $));
    }
    g.push(C);
  }
  for (let x = 0; x < t; x++)
    for (let C = 0; C < a; C++) {
      const b = g[x][C], R = g[x][C + 1], D = g[x + 1][C], _ = g[x + 1][C + 1];
      x !== 0 && m.push(b, R, D), x !== t - 1 && m.push(D, R, _);
    }
  return {
    vertices: new Float32Array(f),
    uvs: new Float32Array(p),
    faces: new Uint16Array(m),
    colors: new Uint32Array(f.length / 3).fill(255)
  };
}
function gz(t) {
  const a = t.vertices, s = t.vertexNormals, f = {};
  for (let p = 0; p < a.length; p += 3) {
    const m = Math.abs(a[p]) < 1e-4 ? 0 : a[p], v = Math.abs(a[p + 1]) < 1e-4 ? 0 : a[p + 1], S = Math.abs(a[p + 2]) < 1e-4 ? 0 : a[p + 2], g = `${m.toFixed(4)},${v.toFixed(4)},${S.toFixed(4)}`;
    f[g] || (f[g] = []), f[g].push(p);
  }
  for (const p in f) {
    const m = f[p];
    if (m.length < 2) continue;
    let v = 0, S = 0, g = 0;
    for (let C = 0; C < m.length; C++) {
      const b = m[C];
      v += s[b], S += s[b + 1], g += s[b + 2];
    }
    const x = Math.sqrt(v * v + S * S + g * g);
    if (x > 1e-10) {
      const C = 1 / x;
      v *= C, S *= C, g *= C;
    }
    for (let C = 0; C < m.length; C++) {
      const b = m[C];
      s[b] = v, s[b + 1] = S, s[b + 2] = g;
    }
  }
}
function Sz(t = 8, a = 8, s = 8) {
  const f = yz(t, a, s), p = new Float32Array(32);
  return lr.computeBoundsFlatArray(p, 0, f.vertices), lr.computeBoundingSphere(p, 28, f.vertices), [
    f.vertices,
    f.faces,
    f.uvs,
    p,
    f.colors
  ];
}
function T3(t, a, s, f, p) {
  ai.call(this);
  const m = new lr();
  m.vertices = t, m.faces = a, m.uvs = s, m.colors = p || new Uint32Array(t.length / 3).fill(255), m.bounds = f, m.updateNormals(), gz(m), this.addComponent(m);
}
T3.prototype = Object.create(ai.prototype);
T3.generate = Sz;
function Ez() {
  const t = new Array(65536);
  for (let a = 0; a < 65536; a++) {
    const s = a >> 11 & 31, f = a >> 5 & 63, p = a & 31, m = s << 3 | s >> 2, v = f << 2 | f >> 4, S = p << 3 | p >> 2;
    t[a] = "#" + (m < 16 ? "0" : "") + m.toString(16) + (v < 16 ? "0" : "") + v.toString(16) + (S < 16 ? "0" : "") + S.toString(16);
  }
  return t;
}
const ao = Ez(), z0 = 31, ff = 65535, xz = e5, U2 = 25;
function wz(t, a, s, f) {
  const p = s[0], m = s[1], v = s[4], S = s[5], g = s[8], x = s[9], C = new Path2D(), b = new Path2D(), R = new Path2D();
  for (let D = 0; D < t.length; D++) {
    const _ = t[D];
    if (!_ || !_.transform) continue;
    const A = _.transform.getLocalToWorld(), L = A[12], U = A[13], q = A[14];
    xz(
      f,
      0,
      L,
      U,
      q,
      s
    );
    const H = f[0], $ = f[1];
    let V = A[0], F = A[1], B = A[2], ie = Math.sqrt(V * V + F * F + B * B);
    ie < 1e-4 && (V = 1, F = 0, B = 0, ie = 1);
    const X = U2 / ie;
    C.moveTo(H, $), C.lineTo(
      H + (V * p + F * v + B * g) * X,
      $ + (V * m + F * S + B * x) * X
    );
    let j = A[4], ne = A[5], ae = A[6], G = Math.sqrt(j * j + ne * ne + ae * ae);
    G < 1e-4 && (j = 0, ne = 1, ae = 0, G = 1);
    const K = U2 / G;
    b.moveTo(H, $), b.lineTo(
      H + (j * p + ne * v + ae * g) * K,
      $ + (j * m + ne * S + ae * x) * K
    );
    let le = A[8], de = A[9], oe = A[10], re = Math.sqrt(le * le + de * de + oe * oe);
    re < 1e-4 && (le = 0, de = 0, oe = 1, re = 1);
    const ue = U2 / re;
    R.moveTo(H, $), R.lineTo(
      H + (le * p + de * v + oe * g) * ue,
      $ + (le * m + de * S + oe * x) * ue
    );
  }
  a.strokeStyle = "#ff0000", a.stroke(C), a.strokeStyle = "#00ff00", a.stroke(b), a.strokeStyle = "#0000ff", a.stroke(R);
}
function Cz(t, a, s, f, p, m, v, S, g, x, C, b = 10) {
  const R = g * 0.5, D = x * 0.5, _ = S + v, A = C[0], L = C[1], U = C[4], q = C[5], H = C[8], $ = C[9];
  t.beginPath(), t.strokeStyle = "cyan";
  for (let V = S; V < _; V++) {
    const F = f[V], B = s[F * 3], ie = s[F * 3 + 1], X = s[F * 3 + 2], j = a[B] * R + R, ne = a[B + 1] * D + D, ae = a[ie] * R + R, G = a[ie + 1] * D + D, K = a[X] * R + R, le = a[X + 1] * D + D, de = (j + ae + K) * 0.33333, oe = (ne + G + le) * 0.33333, re = F * 3, ue = p[re], ye = p[re + 1], P = p[re + 2], Z = ue * A + ye * U + P * H, Ce = ue * L + ye * q + P * $;
    t.moveTo(de, oe), t.lineTo(de + Z * b, oe - Ce * b);
  }
  t.stroke(), t.beginPath(), t.strokeStyle = "yellow";
  for (let V = S; V < _; V++) {
    const F = f[V], B = s[F * 3], ie = s[F * 3 + 1], X = s[F * 3 + 2], j = a[B] * R + R, ne = a[B + 1] * D + D, ae = a[ie] * R + R, G = a[ie + 1] * D + D, K = a[X] * R + R, le = a[X + 1] * D + D, de = m[B], oe = m[B + 1], re = m[B + 2], ue = de * A + oe * U + re * H, ye = de * L + oe * q + re * $;
    t.moveTo(j, ne), t.lineTo(j + ue * b, ne - ye * b);
    const P = m[ie], Z = m[ie + 1], Ce = m[ie + 2], be = P * A + Z * U + Ce * H, $e = P * L + Z * q + Ce * $;
    t.moveTo(ae, G), t.lineTo(ae + be * b, G - $e * b);
    const _e = m[X], He = m[X + 1], Ge = m[X + 2], Ye = _e * A + He * U + Ge * H, Xe = _e * L + He * q + Ge * $;
    t.moveTo(K, le), t.lineTo(K + Ye * b, le - Xe * b);
  }
  t.stroke();
}
function bz(t, a, s, f, p, m, v, S, g) {
  if (v <= 1) return;
  const x = g - S > 1e-4 ? 65535 / (g - S) : 0;
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
    let _ = (s[R] - S) * x;
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
    let _ = (s[R] - S) * x;
    _ < 0 ? _ = 0 : _ > 65535 && (_ = 65535);
    const A = 65535 - (_ | 0) & 255;
    A & 1 ? a[m[A]--] = R : a[m[A]++] = R;
  }
  m.fill(0);
  for (let b = 0; b < v; b++) {
    const R = a[b];
    let _ = (s[R] - S) * x;
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
    let _ = (s[R] - S) * x;
    _ < 0 ? _ = 0 : _ > 65535 && (_ = 65535);
    const A = 65535 - (_ | 0) >> 8 & 255;
    t[m[A]++] = R;
  }
}
const zs = 0, Ns = 3, df = 8, np = -1, j2 = -2, Vu = 0, rp = 2;
function lT(t, a, s, f, p, m, v, S, g, x, C) {
  if (x[g] !== S) {
    const b = ao[S];
    t.fillStyle = b, t.strokeStyle = b, x[g] = S, g === Ns && S !== ff && (x[df] = 1);
  }
  t.beginPath(), t.moveTo(a, s), t.lineTo(f, p), t.lineTo(m, v), t.closePath(), t.stroke(), t.fill(), C[g === Ns ? rp : Vu]++;
}
function R3(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U, q, H, $, V, F, B, ie, X, j, ne, ae) {
  lT(
    t,
    a,
    s,
    f,
    p,
    m,
    v,
    ff,
    Ns,
    X,
    j
  );
}
function M3(t, a, s, f, p, m) {
  for (let v = a; v < s; v++) p[t[v]] = v;
  for (let v = a; v < s; v++) {
    const S = t[v], g = S * 3, x = f[g], C = f[g + 1], b = f[g + 2];
    m[S] = (x === np || x >= 0 && p[x] > v ? 1 : 0) | (C === np || C >= 0 && p[C] > v ? 2 : 0) | (b === np || b >= 0 && p[b] > v ? 4 : 0);
  }
  for (let v = a; v < s; v++) p[t[v]] = -1;
}
const jh = 64, Ah = 128, op = 1, ju = 2 * op, Tz = 6, G2 = 32, mC = G2 - 1, Q2 = 2048, Rz = 8, oT = 0, sT = 1, Oi = 2, Ra = 3, Fu = 4, Vo = 5, Ph = 4096, Fh = Ph - 1, Mz = 4, sf = 0, uf = 1, cf = 2, J0 = 3, Bi = 8, eo = 0, Rh = 1, zu = 2, of = 3, Ri = 4, Mi = 5, _i = 6, Di = 7, Lh = 0, zh = 5, pf = 1, $h = 2, uT = 3, h1 = 4;
function _3() {
  const t = new ArrayBuffer(jh * Bi * 4), a = new ArrayBuffer(Q2 * Rz * 4), s = {
    slots: new Int32Array(t),
    slotsF: new Float32Array(t),
    // Two int32 words of slot bits per bucket, one table per axis.
    colBits: new Int32Array(G2 * 2),
    rowBits: new Int32Array(G2 * 2),
    // Buckets each slot last published into, as [cx0, cy0, cx1, cy1]; -1 = not published.
    spanRect: new Int32Array(jh * 4),
    nodes: new Int32Array(a),
    nodesF: new Float32Array(a),
    edges: new Int32Array(Ph * Mz),
    scal: new Int32Array(8),
    emitX: new Float32Array(Ah),
    emitY: new Float32Array(Ah),
    emitF: new Uint8Array(Ah),
    frameId: -1,
    evictions: 0
  };
  return s.scal[$h] = 1, m1(s), s;
}
function m1(t) {
  const a = t.slots;
  for (let f = 0; f < jh; f++) a[f * Bi + eo] = -1;
  t.scal[Lh] = -1, t.scal[zh] = -1;
  const s = t.nodes;
  for (let f = 0; f < Q2; f++) {
    const p = f << 3;
    s[p + Ra] = f === Q2 - 1 ? -1 : f + 1, s[p + Fu] = -1;
  }
  t.scal[pf] = 0, t.scal[h1] = 0, t.colBits.fill(0), t.rowBits.fill(0), t.spanRect.fill(-1), t.scal[$h]++, t.scal[uT] = 0;
}
function e1(t, a) {
  let s = Math.imul(t, 2654435761) ^ Math.imul(a, 2246822519);
  return s ^= s >>> 15, s = Math.imul(s, 625341585), s ^= s >>> 13, s & Fh;
}
function F2(t, a, s) {
  const f = t.scal[$h], p = t.edges;
  let m = e1(a, s);
  for (let v = 0; v < Ph; v++) {
    const S = m << 2;
    if (p[S + sf] !== f) return -1;
    if (p[S + uf] === a && p[S + cf] === s) return p[S + J0];
    m = m + 1 & Fh;
  }
  return -1;
}
function _z(t, a, s, f) {
  const p = t.scal[$h], m = t.edges;
  let v = e1(a, s);
  for (let S = 0; S < Ph; S++) {
    const g = v << 2;
    if (m[g + sf] !== p) {
      m[g + sf] = p, m[g + uf] = a, m[g + cf] = s, m[g + J0] = f;
      return;
    }
    if (m[g + uf] === a && m[g + cf] === s) return;
    v = v + 1 & Fh;
  }
}
function y1(t, a, s) {
  const f = t.scal[$h], p = t.edges;
  let m = e1(a, s), v = !1;
  for (let g = 0; g < Ph; g++) {
    const x = m << 2;
    if (p[x + sf] !== f) break;
    if (p[x + uf] === a && p[x + cf] === s) {
      v = !0;
      break;
    }
    m = m + 1 & Fh;
  }
  if (!v) return;
  let S = m;
  for (; ; ) {
    const g = m << 2;
    p[g + sf] = f - 1, S = S + 1 & Fh;
    const x = S << 2;
    if (p[x + sf] !== f) return;
    const C = e1(p[x + uf], p[x + cf]);
    (m <= S ? m < C && C <= S : m < C || C <= S) || (p[g + sf] = f, p[g + uf] = p[x + uf], p[g + cf] = p[x + cf], p[g + J0] = p[x + J0], m = S);
  }
}
function N0(t, a, s, f, p) {
  const m = t.scal[pf];
  if (m === -1) return -1;
  const v = t.nodes, S = m << 3;
  return t.scal[pf] = v[S + Ra], t.nodesF[S + oT] = a, t.nodesF[S + sT] = s, v[S + Oi] = f, v[S + Ra] = -1, v[S + Fu] = p, t.scal[h1]++, m;
}
function gh(t, a) {
  const s = t.nodes, f = a << 3, p = s[f + Ra];
  p !== -1 && y1(t, s[f + Oi], s[(p << 3) + Oi]), s[f + Fu] = -1, s[f + Oi] = -1, s[f + Ra] = t.scal[pf], t.scal[pf] = a, t.scal[h1]--;
}
function Lu(t, a, s) {
  const f = t.nodes, p = a << 3, m = f[p + Ra];
  m !== -1 && y1(t, f[p + Oi], f[(m << 3) + Oi]), f[p + Ra] = s, s !== -1 && _z(t, f[p + Oi], f[(s << 3) + Oi], a);
}
function Pu(t) {
  const a = t > 0 ? t >>> Tz : 0;
  return a > mC ? mC : a;
}
function U0(t, a) {
  const s = t.slotsF, f = a << 3, p = Pu(s[f + Ri] - ju), m = Pu(s[f + Mi] - ju), v = Pu(s[f + _i] + ju), S = Pu(s[f + Di] + ju), g = a << 2, x = t.spanRect;
  if (x[g] === p && x[g + 1] === m && x[g + 2] === v && x[g + 3] === S)
    return;
  D3(t, a), x[g] = p, x[g + 1] = m, x[g + 2] = v, x[g + 3] = S;
  const C = a >> 5, b = 1 << (a & 31), R = t.colBits, D = t.rowBits;
  for (let _ = p; _ <= v; _++) R[(_ << 1) + C] |= b;
  for (let _ = m; _ <= S; _++) D[(_ << 1) + C] |= b;
}
function D3(t, a) {
  const s = a << 2, f = t.spanRect, p = f[s];
  if (p === -1) return;
  const m = f[s + 1], v = f[s + 2], S = f[s + 3];
  f[s] = -1;
  const g = a >> 5, x = ~(1 << (a & 31)), C = t.colBits, b = t.rowBits;
  for (let R = p; R <= v; R++) C[(R << 1) + g] &= x;
  for (let R = m; R <= S; R++) b[(R << 1) + g] &= x;
}
function W0(t, a, s, f, p, m, v, S, g) {
  const x = t.slots, C = a * Bi, b = x[C + eo];
  if (b === -1) return;
  const R = x[C + Rh], D = x[C + zu], _ = t.nodes, A = t.nodesF, L = t.emitX, U = t.emitY, q = t.emitF;
  let H = t.scal[pf];
  const $ = _[(R << 3) + Oi], V = g * g;
  let F = 0, B = R;
  for (let j = 0; j < D; j++) {
    const ne = B << 3, ae = _[ne + Ra], G = A[ne + oT], K = A[ne + sT], le = _[ne + Vo];
    if (F < 2)
      L[F] = G, U[F] = K, q[F] = le, F++;
    else {
      const de = L[F - 2], oe = U[F - 2], re = L[F - 1], ue = U[F - 1], ye = re - de, P = ue - oe, Z = G - de, Ce = K - oe, be = ye * Ce - P * Z;
      q[F - 2] === q[F - 1] && be * be <= V * (Z * Z + Ce * Ce) ? (L[F - 1] = G, U[F - 1] = K, q[F - 1] = le) : (L[F] = G, U[F] = K, q[F] = le, F++);
    }
    ae !== -1 && y1(
      t,
      _[ne + Oi],
      ae === R ? $ : _[(ae << 3) + Oi]
    ), _[ne + Fu] = -1, _[ne + Oi] = -1, _[ne + Ra] = H, H = B, B = ae;
  }
  t.scal[pf] = H, t.scal[h1] -= D, x[C + eo] = -1, D3(t, a), a < 32 ? t.scal[Lh] |= 1 << a : t.scal[zh] |= 1 << a - 32;
  let ie = 0;
  for (; F - ie >= 4; ) {
    const j = L[F - 2], ne = U[F - 2], ae = L[F - 1], G = U[F - 1], K = L[ie], le = U[ie], de = ae - j, oe = G - ne, re = K - j, ue = le - ne, ye = de * ue - oe * re;
    if (ye * ye > V * (re * re + ue * ue) || q[F - 2] !== q[F - 1]) break;
    F--;
  }
  for (; F - ie >= 4; ) {
    const j = L[F - 1], ne = U[F - 1], ae = L[ie], G = U[ie], K = L[ie + 1], le = U[ie + 1], de = ae - j, oe = G - ne, re = K - j, ue = le - ne, ye = de * ue - oe * re;
    if (ye * ye > V * (re * re + ue * ue) || q[F - 1] !== q[ie]) break;
    ie++;
  }
  if (F - ie < 3) return;
  if (f[p] !== b) {
    const j = ao[b];
    s.fillStyle = j, s.strokeStyle = j, f[p] = b, m !== -1 && b !== ff && (f[m] = 1);
  }
  const X = F - ie;
  s.beginPath();
  for (let j = 0; j < X; j++) {
    const ne = ie + j;
    if (j === 0 ? s.moveTo(L[ne], U[ne]) : s.lineTo(L[ne], U[ne]), q[ne] === 0) continue;
    const ae = ie + (j + 1 === X ? 0 : j + 1), G = L[ae] - L[ne], K = U[ae] - U[ne], le = G < 0 ? -G : G, de = K < 0 ? -K : K, oe = le > de ? le + 0.4 * de : de + 0.4 * le;
    if (oe < 1e-6) continue;
    const re = op / oe, ue = K * re, ye = -G * re;
    s.lineTo(L[ne] + ue, U[ne] + ye), s.lineTo(L[ae] + ue, U[ae] + ye);
  }
  s.fill(), v[S]++;
}
function k3(t, a, s, f, p, m, v, S) {
  const g = t.slots;
  for (; ; ) {
    let x = -1, C = 2147483647;
    for (let b = 0; b < jh; b++) {
      const R = b * Bi;
      g[R + eo] !== -1 && g[R + of] < C && (C = g[R + of], x = b);
    }
    if (x === -1) return;
    W0(
      t,
      x,
      a,
      s,
      f,
      p,
      m,
      v,
      S
    );
  }
}
function O3(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U, q, H = 0) {
  const $ = t.slots, V = t.nodes, F = C < D ? C < L ? C : L : D < L ? D : L, B = C > D ? C > L ? C : L : D > L ? D : L, ie = b < _ ? b < U ? b : U : _ < U ? _ : U, X = b > _ ? b > U ? b : U : _ > U ? _ : U, j = t.slotsF, ne = B + ju, ae = F - ju, G = X + ju, K = ie - ju, le = t.colBits, de = t.rowBits, oe = Pu(F) << 1, re = Pu(B) << 1, ue = Pu(ie) << 1, ye = Pu(X) << 1;
  let P = le[oe], Z = le[oe + 1];
  for (let Ae = oe + 2; Ae <= re; Ae += 2)
    P |= le[Ae], Z |= le[Ae + 1];
  let Ce = de[ue], be = de[ue + 1];
  for (let Ae = ue + 2; Ae <= ye; Ae += 2)
    Ce |= de[Ae], be |= de[Ae + 1];
  let $e = P & Ce, _e = Z & be, He = 0, Ge = 0;
  for (; $e !== 0; ) {
    const Ae = 31 - Math.clz32($e & -$e);
    $e &= $e - 1;
    const Be = Ae << 3;
    $[Be + eo] !== g && (j[Be + Ri] > ne || j[Be + _i] < ae || j[Be + Mi] > G || j[Be + Di] < K || (He |= 1 << Ae));
  }
  for (; _e !== 0; ) {
    const Ae = 31 - Math.clz32(_e & -_e);
    _e &= _e - 1;
    const Be = Ae + 32 << 3;
    $[Be + eo] !== g && (j[Be + Ri] > ne || j[Be + _i] < ae || j[Be + Mi] > G || j[Be + Di] < K || (Ge |= 1 << Ae));
  }
  for (; He !== 0; ) {
    const Ae = 31 - Math.clz32(He & -He);
    He &= He - 1, W0(
      t,
      Ae,
      a,
      s,
      f,
      p,
      m,
      v,
      S
    );
  }
  for (; Ge !== 0; ) {
    const Ae = 63 - Math.clz32(Ge & -Ge);
    Ge &= Ge - 1, W0(
      t,
      Ae,
      a,
      s,
      f,
      p,
      m,
      v,
      S
    );
  }
  const Ye = ++t.scal[uT];
  let Xe = F2(t, A, R), nt = F2(t, q, A), Oe = F2(t, R, q), Ke = Xe === -1 ? -1 : V[(Xe << 3) + Fu], Re = nt === -1 ? -1 : V[(nt << 3) + Fu], rt = Oe === -1 ? -1 : V[(Oe << 3) + Fu];
  Ke !== -1 && $[Ke * Bi + eo] !== g && (Xe = -1, Ke = -1), Re !== -1 && $[Re * Bi + eo] !== g && (nt = -1, Re = -1), rt !== -1 && $[rt * Bi + eo] !== g && (Oe = -1, rt = -1);
  const ot = (Xe !== -1 ? 1 : 0) + (nt !== -1 ? 1 : 0) + (Oe !== -1 ? 1 : 0);
  if (ot === 2) {
    let Ae, Be, Pe, ut, bt;
    if (Xe !== -1 && nt !== -1 ? (Ae = 0, Be = Xe, Pe = nt, ut = Ke, bt = Re) : nt !== -1 && Oe !== -1 ? (Ae = 1, Be = nt, Pe = Oe, ut = Re, bt = rt) : (Ae = 2, Be = Oe, Pe = Xe, ut = rt, bt = Ke), ut === bt) {
      if (V[(Pe << 3) + Ra] === Be) {
        const Ze = ut * Bi;
        Lu(t, Pe, V[(Be << 3) + Ra]), V[(Pe << 3) + Vo] = H >> (Ae + 2) % 3 & 1, $[Ze + Rh] === Be && ($[Ze + Rh] = Pe), gh(t, Be), $[Ze + zu]--, $[Ze + of] = Ye, F < j[Ze + Ri] && (j[Ze + Ri] = F), ie < j[Ze + Mi] && (j[Ze + Mi] = ie), B > j[Ze + _i] && (j[Ze + _i] = B), X > j[Ze + Di] && (j[Ze + Di] = X), U0(t, ut);
        return;
      }
    } else {
      const Ze = ut * Bi, Se = bt * Bi, Fe = $[Ze + zu] + $[Se + zu] - 1;
      if (Fe <= Ah) {
        const ct = V[(Be << 3) + Ra], Ve = V[(Pe << 3) + Ra], Ot = V[(Ve << 3) + Ra];
        Ot !== -1 && y1(
          t,
          V[(Ve << 3) + Oi],
          V[(Ot << 3) + Oi]
        ), V[(Ve << 3) + Ra] = -1;
        const Gt = V[(Ve << 3) + Vo];
        Lu(t, Be, Ot), Lu(t, Pe, ct), V[(Be << 3) + Vo] = Gt, V[(Pe << 3) + Vo] = H >> (Ae + 2) % 3 & 1, gh(t, Ve);
        let Et = Be;
        for (let dt = 0; dt < Fe; dt++) {
          const ke = Et << 3;
          if (V[ke + Fu] = ut, Et = V[ke + Ra], Et === -1) break;
        }
        $[Ze + Rh] = Be, $[Ze + zu] = Fe, $[Ze + of] = Ye, j[Se + Ri] < j[Ze + Ri] && (j[Ze + Ri] = j[Se + Ri]), j[Se + Mi] < j[Ze + Mi] && (j[Ze + Mi] = j[Se + Mi]), j[Se + _i] > j[Ze + _i] && (j[Ze + _i] = j[Se + _i]), j[Se + Di] > j[Ze + Di] && (j[Ze + Di] = j[Se + Di]), F < j[Ze + Ri] && (j[Ze + Ri] = F), ie < j[Ze + Mi] && (j[Ze + Mi] = ie), B > j[Ze + _i] && (j[Ze + _i] = B), X > j[Ze + Di] && (j[Ze + Di] = X), D3(t, bt), U0(t, ut), $[Se + eo] = -1, bt < 32 ? t.scal[Lh] |= 1 << bt : t.scal[zh] |= 1 << bt - 32;
        return;
      }
    }
  } else if (ot === 1) {
    const Ae = Xe !== -1 ? Xe : nt !== -1 ? nt : Oe, Be = Xe !== -1 ? Ke : nt !== -1 ? Re : rt, Pe = Be * Bi;
    if ($[Pe + zu] < Ah) {
      const Se = N0(t, Xe !== -1 ? L : nt !== -1 ? C : D, Xe !== -1 ? U : nt !== -1 ? b : _, Xe !== -1 ? q : nt !== -1 ? R : A, Be);
      if (Se !== -1) {
        Lu(t, Se, V[(Ae << 3) + Ra]), Lu(t, Ae, Se);
        const Fe = Xe !== -1 ? 0 : nt !== -1 ? 1 : 2;
        V[(Ae << 3) + Vo] = H >> (Fe + 1) % 3 & 1, V[(Se << 3) + Vo] = H >> (Fe + 2) % 3 & 1, $[Pe + zu]++, $[Pe + of] = Ye, F < j[Pe + Ri] && (j[Pe + Ri] = F), ie < j[Pe + Mi] && (j[Pe + Mi] = ie), B > j[Pe + _i] && (j[Pe + _i] = B), X > j[Pe + Di] && (j[Pe + Di] = X), U0(t, Be);
        return;
      }
    }
  }
  let ze = -1;
  const yt = t.scal[Lh], Ft = t.scal[zh];
  if (yt !== 0)
    ze = 31 - Math.clz32(yt & -yt);
  else if (Ft !== 0)
    ze = 63 - Math.clz32(Ft & -Ft);
  else {
    let Ae = 2147483647;
    for (let Be = 0; Be < jh; Be++) {
      const Pe = $[Be * Bi + of];
      Pe < Ae && (Ae = Pe, ze = Be);
    }
    W0(
      t,
      ze,
      a,
      s,
      f,
      p,
      m,
      v,
      S
    ), t.evictions++;
  }
  const St = N0(t, C, b, R, ze), Me = N0(t, D, _, A, ze), at = N0(t, L, U, q, ze);
  if (St === -1 || Me === -1 || at === -1) {
    St !== -1 && gh(t, St), Me !== -1 && gh(t, Me), at !== -1 && gh(t, at);
    return;
  }
  Lu(t, St, Me), Lu(t, Me, at), Lu(t, at, St), V[(St << 3) + Vo] = H & 1, V[(Me << 3) + Vo] = H >> 1 & 1, V[(at << 3) + Vo] = H >> 2 & 1;
  const Rt = ze * Bi;
  $[Rt + eo] = g, $[Rt + Rh] = St, $[Rt + zu] = 3, $[Rt + of] = Ye, j[Rt + Ri] = F, j[Rt + Mi] = ie, j[Rt + _i] = B, j[Rt + Di] = X, U0(t, ze), ze < 32 ? t.scal[Lh] &= ~(1 << ze) : t.scal[zh] &= ~(1 << ze - 32);
}
const Sh = _3(), yC = 0.05;
function Iu(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U, q, H, $, V, F, B, ie, X, j, ne, ae, G) {
  Sh.frameId !== ne && (m1(Sh), Sh.frameId = ne);
  const K = _ * 3, le = g[K], de = g[K + 1], oe = g[K + 2];
  let re;
  if (le === de && de === oe)
    re = (le >>> 16 & 248) << 8 | (le >>> 8 & 252) << 3 | (le & 248) >> 3;
  else {
    const ue = ((le >>> 16) + (de >>> 16) + (oe >>> 16)) / 3, ye = ((le >>> 8 & 255) + (de >>> 8 & 255) + (oe >>> 8 & 255)) / 3, P = ((le & 255) + (de & 255) + (oe & 255)) / 3;
    re = (ue & 248) << 8 | (ye & 252) << 3 | (P & 248) >> 3;
  }
  O3(
    Sh,
    t,
    X,
    0,
    -1,
    j,
    Vu,
    yC,
    re,
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
  ), ae && k3(
    Sh,
    t,
    X,
    zs,
    -1,
    j,
    Vu,
    yC
  );
}
const ki = 32, no = 12, Dz = 0.9999, Zd = 0.5, j0 = 2 * op, Mh = 2048, g1 = Mh - 1, Cl = 4, $u = 0, Nu = 1, Nh = 2;
function kz() {
  return {
    slots: new Int32Array(ki * Cl),
    // Six affine terms per chart, fitted from the face that seeded it.
    affine: new Float32Array(ki * 6),
    // The chart's plane normal, for the coplanarity test.
    normal: new Float32Array(ki * 3),
    // Screen bounds per chart, [x0, y0, x1, y1] - the overlap guard's only input.
    aabb: new Float32Array(ki * 4),
    // Boundary rings as flat arrays rather than linked nodes: short enough that an insert is a
    // handful of element moves, and an array cannot be corrupted by pointer surgery.
    bu: new Float32Array(ki * no),
    bv: new Float32Array(ki * no),
    bid: new Int32Array(ki * no),
    // 1 where the boundary edge LEAVING vertex i must be pushed outward at flush, i.e. the face
    // across it is drawn later. See computeExpandMasks in shared/shaders.js.
    bexp: new Uint8Array(ki * no),
    // The mesh each chart came from, to reach its texture pattern at flush.
    meshRef: new Array(ki).fill(null),
    // Directed-edge table: (from -> to) -> slot, cleared in O(1) by bumping the generation.
    eFrom: new Int32Array(Mh),
    eTo: new Int32Array(Mh),
    eSlot: new Int32Array(Mh),
    eStamp: new Int32Array(Mh),
    gen: 1,
    seq: 0,
    live: 0,
    frameId: -1
  };
}
function Oz(t) {
  const a = t.slots;
  for (let s = 0; s < ki; s++)
    a[s * Cl + $u] = 0, t.meshRef[s] = null;
  t.gen++, t.seq = 0, t.live = 0;
}
function A3(t, a) {
  let s = Math.imul(t, 2654435761) ^ Math.imul(a, 2246822519);
  return s ^= s >>> 15, s = Math.imul(s, 625341585), s ^= s >>> 13, s & g1;
}
function P2(t, a, s) {
  const f = t.gen;
  let p = A3(a, s);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return -1;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === s)
      return t.eSlot[p];
    p = p + 1 & g1;
  }
  return -1;
}
function B0(t, a, s, f) {
  const p = t.gen;
  let m = A3(a, s);
  for (let v = 0; v < 32; v++) {
    if (t.eStamp[m] !== p) {
      t.eStamp[m] = p, t.eFrom[m] = a, t.eTo[m] = s, t.eSlot[m] = f;
      return;
    }
    if (t.eFrom[m] === a && t.eTo[m] === s) return;
    m = m + 1 & g1;
  }
}
function G0(t, a, s) {
  const f = t.gen;
  let p = A3(a, s);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === s) {
      t.eStamp[p] = -1;
      return;
    }
    p = p + 1 & g1;
  }
}
function Az(t, a) {
  const s = a * no, f = t.slots[a * Cl + Nu];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    B0(t, t.bid[s + p], t.bid[s + m], a);
  }
}
function Lz(t, a) {
  const s = a * no, f = t.slots[a * Cl + Nu];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    G0(t, t.bid[s + p], t.bid[s + m]);
  }
}
function zz(t) {
  if (typeof document > "u") return t;
  const a = document.createElement("canvas");
  return a.width = t.naturalWidth, a.height = t.naturalHeight, a.getContext("2d").drawImage(t, 0, 0), a;
}
function X2(t, a, s, f, p, m) {
  const v = t.slots, S = a * Cl;
  if (v[S + $u] === 0) return;
  const g = v[S + Nu];
  Lz(t, a), v[S + $u] = 0, t.live--;
  const x = t.meshRef[a];
  if (t.meshRef[a] = null, g < 3 || x === null) return;
  const C = a * no, b = t.bu, R = t.bv, D = a * 6;
  let _ = x.texturePattern;
  _ || (_ = s.createPattern(
    zz(x.textureImage),
    "repeat"
  ), x.texturePattern = _), s.fillStyle = _, f[zs] = -1;
  const A = t.affine[D], L = t.affine[D + 1], U = t.affine[D + 2], q = t.affine[D + 3];
  s.setTransform(A, L, U, q, t.affine[D + 4], t.affine[D + 5]);
  const H = A * q - L * U, $ = H > 1e-12 || H < -1e-12 ? 1 / H : 0, V = t.bexp;
  s.beginPath();
  for (let F = 0; F < g; F++) {
    const B = b[C + F], ie = R[C + F];
    if (F === 0 ? s.moveTo(B, ie) : s.lineTo(B, ie), V[C + F] === 0) continue;
    const X = F + 1 === g ? 0 : F + 1, j = b[C + X], ne = R[C + X], ae = A * (j - B) + U * (ne - ie), G = L * (j - B) + q * (ne - ie), K = ae < 0 ? -ae : ae, le = G < 0 ? -G : G, de = K > le ? K + 0.4 * le : le + 0.4 * K;
    if (de < 1e-6) continue;
    const oe = op / de, re = G * oe, ue = -ae * oe, ye = (q * re - U * ue) * $, P = (A * ue - L * re) * $;
    s.lineTo(B + ye, ie + P), s.lineTo(j + ye, ne + P);
  }
  s.fill(), s.setTransform(1, 0, 0, 1, 0, 0), p[m]++;
}
function gC(t, a, s, f, p) {
  const m = t.slots;
  for (; t.live > 0; ) {
    let v = -1, S = 2147483647;
    for (let g = 0; g < ki; g++) {
      const x = g * Cl;
      m[x + $u] !== 0 && m[x + Nh] < S && (S = m[x + Nh], v = g);
    }
    if (v === -1) return;
    X2(t, v, a, s, f, p);
  }
}
function Nz(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U, q, H, $, V, F, B, ie = 0) {
  const X = t.slots, j = ++t.seq, ne = R < U ? R < F ? R : F : U < F ? U : F, ae = R > U ? R > F ? R : F : U > F ? U : F, G = D < q ? D < B ? D : B : q < B ? q : B, K = D > q ? D > B ? D : B : q > B ? q : B;
  let le = -1, de = -1, oe = -1, re = 0, ue = 0, ye = -1, P = -1, Z = -1;
  if (t.live > 0) {
    const Oe = P2(t, L, b), Ke = P2(t, V, L), Re = P2(t, b, V);
    for (let rt = 0; rt < 3 && le === -1; rt++) {
      const ot = rt === 0 ? Oe : rt === 1 ? Ke : Re;
      if (ot === -1) continue;
      const ze = ot * Cl;
      if (X[ze + $u] === 0 || t.meshRef[ot] !== m) continue;
      const yt = ot * 3;
      if (t.normal[yt] * v + t.normal[yt + 1] * S + t.normal[yt + 2] * g < Dz) continue;
      const St = ot * 6, Me = t.affine[St], at = t.affine[St + 1], Rt = t.affine[St + 2], Ae = t.affine[St + 3], Be = t.affine[St + 4], Pe = t.affine[St + 5];
      let ut = Me * x + Rt * C + Be - R, bt = at * x + Ae * C + Pe - D;
      if (ut * ut + bt * bt > Zd * Zd || (ut = Me * _ + Rt * A + Be - U, bt = at * _ + Ae * A + Pe - q, ut * ut + bt * bt > Zd * Zd) || (ut = Me * H + Rt * $ + Be - F, bt = at * H + Ae * $ + Pe - B, ut * ut + bt * bt > Zd * Zd)) continue;
      const Ze = ot * no, Se = X[ze + Nu], Fe = t.bid;
      let ct = -1, Ve = -1, Ot = -1;
      for (let Et = 0; Et < Se; Et++) {
        const dt = Et + 1 === Se ? 0 : Et + 1, ke = Fe[Ze + Et], ht = Fe[Ze + dt];
        ke === L && ht === b ? ct = Et : ke === V && ht === L ? Ve = Et : ke === b && ht === V && (Ot = Et);
      }
      const Gt = (ct !== -1 ? 1 : 0) + (Ve !== -1 ? 1 : 0) + (Ot !== -1 ? 1 : 0);
      if (Gt !== 0) {
        if (Gt === 1) {
          if (Se >= no) continue;
          ct !== -1 ? (de = ct, re = H, ue = $, ye = V, P = 0) : Ve !== -1 ? (de = Ve, re = x, ue = C, ye = b, P = 1) : (de = Ot, re = _, ue = A, ye = L, P = 2), le = ot;
        } else if (Gt === 2) {
          const Et = ct !== -1 ? ct : Ve, dt = Ot !== -1 ? Ot : Ve !== -1 ? Ve : ct, ke = (Et + 1) % Se === dt ? Et : (dt + 1) % Se === Et ? dt : -1;
          if (ke === -1) continue;
          de = ke, oe = (ke + 1) % Se, Z = ct === -1 ? 0 : Ve === -1 ? 1 : 2, le = ot;
        }
      }
    }
  }
  const Ce = t.aabb;
  if (t.live > 0)
    for (let Oe = 0; Oe < ki; Oe++) {
      if (Oe === le || X[Oe * Cl + $u] === 0) continue;
      const Ke = Oe << 2;
      Ce[Ke] > ae + j0 || Ce[Ke + 2] < ne - j0 || Ce[Ke + 1] > K + j0 || Ce[Ke + 3] < G - j0 || X2(t, Oe, a, s, f, p);
    }
  if (le !== -1) {
    const Oe = le * no, Ke = le * Cl, Re = X[Ke + Nu], rt = t.bu, ot = t.bv, ze = t.bid, yt = t.bexp;
    if (oe === -1) {
      const St = ze[Oe + de], Me = ze[Oe + (de + 1) % Re];
      G0(t, St, Me);
      for (let at = Re; at > de + 1; at--)
        rt[Oe + at] = rt[Oe + at - 1], ot[Oe + at] = ot[Oe + at - 1], ze[Oe + at] = ze[Oe + at - 1], yt[Oe + at] = yt[Oe + at - 1];
      rt[Oe + de + 1] = re, ot[Oe + de + 1] = ue, ze[Oe + de + 1] = ye, yt[Oe + de] = ie >> (P + 1) % 3 & 1, yt[Oe + de + 1] = ie >> (P + 2) % 3 & 1, X[Ke + Nu] = Re + 1, B0(t, St, ye, le), B0(t, ye, Me, le);
    } else {
      const St = (de + 1) % Re, Me = ze[Oe + de], at = ze[Oe + St], Rt = ze[Oe + (St + 1) % Re];
      G0(t, Me, at), G0(t, at, Rt);
      for (let Ae = St; Ae < Re - 1; Ae++)
        rt[Oe + Ae] = rt[Oe + Ae + 1], ot[Oe + Ae] = ot[Oe + Ae + 1], ze[Oe + Ae] = ze[Oe + Ae + 1], yt[Oe + Ae] = yt[Oe + Ae + 1];
      yt[Oe + (de < St ? de : de - 1)] = ie >> Z & 1, X[Ke + Nu] = Re - 1, B0(t, Me, Rt, le);
    }
    X[Ke + Nh] = j;
    const Ft = le << 2;
    ne < Ce[Ft] && (Ce[Ft] = ne), G < Ce[Ft + 1] && (Ce[Ft + 1] = G), ae > Ce[Ft + 2] && (Ce[Ft + 2] = ae), K > Ce[Ft + 3] && (Ce[Ft + 3] = K);
    return;
  }
  let be = -1;
  for (let Oe = 0; Oe < ki; Oe++)
    if (X[Oe * Cl + $u] === 0) {
      be = Oe;
      break;
    }
  if (be === -1) {
    let Oe = 2147483647;
    for (let Ke = 0; Ke < ki; Ke++) {
      const Re = X[Ke * Cl + Nh];
      Re < Oe && (Oe = Re, be = Ke);
    }
    X2(t, be, a, s, f, p);
  }
  const _e = 1 / (x * (A - $) - C * (_ - H) + (_ * $ - H * A)), He = be * 6;
  t.affine[He] = (R * (A - $) + U * ($ - C) + F * (C - A)) * _e, t.affine[He + 1] = (D * (A - $) + q * ($ - C) + B * (C - A)) * _e, t.affine[He + 2] = (R * (H - _) + U * (x - H) + F * (_ - x)) * _e, t.affine[He + 3] = (D * (H - _) + q * (x - H) + B * (_ - x)) * _e, t.affine[He + 4] = (R * (_ * $ - H * A) + U * (H * C - x * $) + F * (x * A - _ * C)) * _e, t.affine[He + 5] = (D * (_ * $ - H * A) + q * (H * C - x * $) + B * (x * A - _ * C)) * _e;
  const Ge = be * 3;
  t.normal[Ge] = v, t.normal[Ge + 1] = S, t.normal[Ge + 2] = g;
  const Ye = be * no;
  t.bu[Ye] = x, t.bv[Ye] = C, t.bid[Ye] = b, t.bu[Ye + 1] = _, t.bv[Ye + 1] = A, t.bid[Ye + 1] = L, t.bu[Ye + 2] = H, t.bv[Ye + 2] = $, t.bid[Ye + 2] = V, t.bexp[Ye] = ie & 1, t.bexp[Ye + 1] = ie >> 1 & 1, t.bexp[Ye + 2] = ie >> 2 & 1;
  const Xe = be * Cl;
  X[Xe + $u] = 1, X[Xe + Nu] = 3, X[Xe + Nh] = j, t.meshRef[be] = m, t.live++;
  const nt = be << 2;
  Ce[nt] = ne, Ce[nt + 1] = G, Ce[nt + 2] = ae, Ce[nt + 3] = K, Az(t, be);
}
const Jd = kz();
function L3(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U, q, H, $, V, F, B, ie, X, j, ne, ae, G) {
  Jd.frameId !== ne && (Oz(Jd), Jd.frameId = ne);
  const K = A.textureImage;
  if (K && K.complete && K.naturalWidth > 0 && A.uvs) {
    const oe = A.uvs, re = A.faces[L] * 2, ue = A.faces[L + 1] * 2, ye = A.faces[L + 2] * 2, P = K.width, Z = K.height, Ce = oe[re] * P, be = oe[re + 1] * Z, $e = oe[ue] * P, _e = oe[ue + 1] * Z, He = oe[ye] * P, Ge = oe[ye + 1] * Z, Ye = Ce * (_e - Ge) - be * ($e - He) + ($e * Ge - He * _e);
    if (Math.abs(Ye) > 1e-5) {
      Nz(
        Jd,
        t,
        X,
        j,
        Vu,
        A,
        C[_ * 3],
        C[_ * 3 + 1],
        C[_ * 3 + 2],
        Ce,
        be,
        b,
        a,
        s,
        $e,
        _e,
        R,
        f,
        p,
        He,
        Ge,
        D,
        m,
        v,
        G
      ), ae && gC(
        Jd,
        t,
        X,
        j,
        Vu
      );
      return;
    }
  }
  gC(
    Jd,
    t,
    X,
    j,
    Vu
  );
  const le = g[_ * 3], de = (le >>> 16 & 248) << 8 | (le >>> 8 & 252) << 3 | (le & 248) >> 3;
  lT(
    t,
    a,
    s,
    f,
    p,
    m,
    v,
    de,
    0,
    X,
    j
  );
}
const Eh = _3(), SC = 0.05;
function z3(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U, q, H, $, V, F, B, ie, X, j, ne, ae, G) {
  let K = U >>> 16 & 255, le = U >>> 8 & 255, de = U & 255;
  const oe = C[_ * 3], re = C[_ * 3 + 1], ue = C[_ * 3 + 2], ye = q[0];
  for (let $e = 1; $e <= ye; $e++) {
    const _e = H[q[$e]];
    if (_e.light.type === 0) {
      const He = -_e.transform.worldMatrix[8], Ge = -_e.transform.worldMatrix[9], Ye = -_e.transform.worldMatrix[10], Xe = oe * He + re * Ge + ue * Ye;
      if (Xe > 0) {
        const nt = _e.light.color;
        K += (nt >>> 16 & 255) * Xe, le += (nt >>> 8 & 255) * Xe, de += (nt & 255) * Xe;
      }
    }
  }
  K *= 39215e-7, le *= 39215e-7, de *= 39215e-7, K > 1 && (K = 1), le > 1 && (le = 1), de > 1 && (de = 1);
  const P = K * 255 | 0, Z = le * 255 | 0, Ce = de * 255 | 0, be = (P & 248) << 8 | (Z & 252) << 3 | (Ce & 248) >> 3;
  Eh.frameId !== ne && (m1(Eh), Eh.frameId = ne), O3(
    Eh,
    t,
    X,
    Ns,
    df,
    j,
    rp,
    SC,
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
  ), ae && k3(
    Eh,
    t,
    X,
    Ns,
    df,
    j,
    rp,
    SC
  );
}
const wl = 32, ro = 16, aa = 4, EC = 1e-3, Uz = 1e-3, jz = 1e-12, F0 = 2 * op, _h = 2048, S1 = _h - 1, bl = 4, Hu = 0, Uu = 1, Uh = 2, t1 = 8, K2 = 0, Z2 = 1, J2 = 2, n1 = 3, e3 = 4, r1 = 5, t3 = 6, a1 = 7;
function xC(t, a, s) {
  const f = t < 0 ? 0 : t > 255 ? 255 : t | 0, p = a < 0 ? 0 : a > 255 ? 255 : a | 0, m = s < 0 ? 0 : s > 255 ? 255 : s | 0;
  return (f & 248) << 8 | (p & 252) << 3 | (m & 248) >> 3;
}
function Fz() {
  return {
    slots: new Int32Array(wl * bl),
    // The shading field per chart, fitted from the face that seeded it (see the FD_* lanes).
    field: new Float32Array(wl * t1),
    // Screen bounds per chart, [x0, y0, x1, y1] - the overlap guard's only input.
    aabb: new Float32Array(wl * 4),
    // Boundary rings as flat arrays rather than linked nodes: short enough that an insert is a
    // handful of element moves, and an array cannot be corrupted by pointer surgery.
    bx: new Float32Array(wl * ro),
    by: new Float32Array(wl * ro),
    bid: new Int32Array(wl * ro),
    // 1 where the boundary edge LEAVING vertex i must be pushed outward at flush, i.e. the face
    // across it is drawn later. See computeExpandMasks in shared/shaders.js.
    bexp: new Uint8Array(wl * ro),
    // Directed-edge table: (from -> to) -> slot, cleared in O(1) by bumping the generation.
    eFrom: new Int32Array(_h),
    eTo: new Int32Array(_h),
    eSlot: new Int32Array(_h),
    eStamp: new Int32Array(_h),
    gen: 1,
    seq: 0,
    live: 0,
    frameId: -1
  };
}
function Pz(t) {
  const a = t.slots;
  for (let s = 0; s < wl; s++) a[s * bl + Hu] = 0;
  t.gen++, t.seq = 0, t.live = 0;
}
function N3(t, a) {
  let s = Math.imul(t, 2654435761) ^ Math.imul(a, 2246822519);
  return s ^= s >>> 15, s = Math.imul(s, 625341585), s ^= s >>> 13, s & S1;
}
function $2(t, a, s) {
  const f = t.gen;
  let p = N3(a, s);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return -1;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === s)
      return t.eSlot[p];
    p = p + 1 & S1;
  }
  return -1;
}
function Q0(t, a, s, f) {
  const p = t.gen;
  let m = N3(a, s);
  for (let v = 0; v < 32; v++) {
    if (t.eStamp[m] !== p) {
      t.eStamp[m] = p, t.eFrom[m] = a, t.eTo[m] = s, t.eSlot[m] = f;
      return;
    }
    if (t.eFrom[m] === a && t.eTo[m] === s) return;
    m = m + 1 & S1;
  }
}
function X0(t, a, s) {
  const f = t.gen;
  let p = N3(a, s);
  for (let m = 0; m < 32; m++) {
    if (t.eStamp[p] === 0) return;
    if (t.eStamp[p] === f && t.eFrom[p] === a && t.eTo[p] === s) {
      t.eStamp[p] = -1;
      return;
    }
    p = p + 1 & S1;
  }
}
function $z(t, a) {
  const s = a * ro, f = t.slots[a * bl + Uu];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    Q0(t, t.bid[s + p], t.bid[s + m], a);
  }
}
function Hz(t, a) {
  const s = a * ro, f = t.slots[a * bl + Uu];
  for (let p = 0; p < f; p++) {
    const m = p + 1 === f ? 0 : p + 1;
    X0(t, t.bid[s + p], t.bid[s + m]);
  }
}
function n3(t, a, s, f, p) {
  const m = t.slots, v = a * bl;
  if (m[v + Hu] === 0) return;
  const S = m[v + Uu];
  if (Hz(t, a), m[v + Hu] = 0, t.live--, S < 3) return;
  const g = a * ro, x = t.bx, C = t.by, b = t.bexp, R = a * t1, D = t.field[R + K2], _ = t.field[R + Z2];
  let A = 1 / 0, L = -1 / 0;
  for (let F = 0; F < S; F++) {
    const B = x[g + F] * D + C[g + F] * _;
    B < A && (A = B), B > L && (L = B);
  }
  const U = t.field[R + J2], q = t.field[R + e3], H = t.field[R + t3], $ = xC(
    t.field[R + n1] + U * A,
    t.field[R + r1] + q * A,
    t.field[R + a1] + H * A
  ), V = xC(
    t.field[R + n1] + U * L,
    t.field[R + r1] + q * L,
    t.field[R + a1] + H * L
  );
  if ($ === V || L - A < Uz)
    f[Ns] !== $ && (s.fillStyle = ao[$], f[Ns] = $, $ !== ff && (f[df] = 1));
  else {
    const F = s.createLinearGradient(
      D * A,
      _ * A,
      D * L,
      _ * L
    );
    F.addColorStop(0, ao[$]), F.addColorStop(1, ao[V]), s.fillStyle = F, f[Ns] = -1, f[df] = 1;
  }
  s.beginPath();
  for (let F = 0; F < S; F++) {
    const B = x[g + F], ie = C[g + F];
    if (F === 0 ? s.moveTo(B, ie) : s.lineTo(B, ie), b[g + F] === 0) continue;
    const X = F + 1 === S ? 0 : F + 1, j = x[g + X], ne = C[g + X], ae = j - B, G = ne - ie, K = ae < 0 ? -ae : ae, le = G < 0 ? -G : G, de = K > le ? K + 0.4 * le : le + 0.4 * K;
    if (de < 1e-6) continue;
    const oe = op / de, re = G * oe, ue = -ae * oe;
    s.lineTo(B + re, ie + ue), s.lineTo(j + re, ne + ue);
  }
  s.fill(), p[rp]++;
}
function Vz(t, a, s, f) {
  const p = t.slots;
  for (; t.live > 0; ) {
    let m = -1, v = 2147483647;
    for (let S = 0; S < wl; S++) {
      const g = S * bl;
      p[g + Hu] !== 0 && p[g + Uh] < v && (v = p[g + Uh], m = S);
    }
    if (m === -1) return;
    n3(t, m, a, s, f);
  }
}
function Iz(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U, q, H, $, V, F = 0) {
  const B = t.slots, ie = ++t.seq, X = S < D ? S < H ? S : H : D < H ? D : H, j = S > D ? S > H ? S : H : D > H ? D : H, ne = g < _ ? g < $ ? g : $ : _ < $ ? _ : $, ae = g > _ ? g > $ ? g : $ : _ > $ ? _ : $;
  let G = -1, K = -1, le = -1, de = 0, oe = 0, re = -1, ue = -1, ye = -1;
  if (t.live > 0) {
    const Me = $2(t, A, x), at = $2(t, V, A), Rt = $2(t, x, V);
    for (let Ae = 0; Ae < 3 && G === -1; Ae++) {
      const Be = Ae === 0 ? Me : Ae === 1 ? at : Rt;
      if (Be === -1) continue;
      const Pe = Be * bl;
      if (B[Pe + Hu] === 0) continue;
      const ut = Be * t1, bt = t.field[ut + K2], Ze = t.field[ut + Z2], Se = t.field[ut + J2], Fe = t.field[ut + n1], ct = t.field[ut + e3], Ve = t.field[ut + r1], Ot = t.field[ut + t3], Gt = t.field[ut + a1];
      let Et = S * bt + g * Ze, dt = Fe + Se * Et - p;
      if (dt > aa || dt < -aa || (dt = Ve + ct * Et - m, dt > aa || dt < -aa) || (dt = Gt + Ot * Et - v, dt > aa || dt < -aa) || (Et = D * bt + _ * Ze, dt = Fe + Se * Et - C, dt > aa || dt < -aa) || (dt = Ve + ct * Et - b, dt > aa || dt < -aa) || (dt = Gt + Ot * Et - R, dt > aa || dt < -aa) || (Et = H * bt + $ * Ze, dt = Fe + Se * Et - L, dt > aa || dt < -aa) || (dt = Ve + ct * Et - U, dt > aa || dt < -aa) || (dt = Gt + Ot * Et - q, dt > aa || dt < -aa)) continue;
      const ke = Be * ro, ht = B[Pe + Uu], Dt = t.bid;
      let Zt = -1, nn = -1, yn = -1;
      for (let Bn = 0; Bn < ht; Bn++) {
        const Pr = Bn + 1 === ht ? 0 : Bn + 1, br = Dt[ke + Bn], vr = Dt[ke + Pr];
        br === A && vr === x ? Zt = Bn : br === V && vr === A ? nn = Bn : br === x && vr === V && (yn = Bn);
      }
      const Hn = (Zt !== -1 ? 1 : 0) + (nn !== -1 ? 1 : 0) + (yn !== -1 ? 1 : 0);
      if (Hn !== 0) {
        if (Hn === 1) {
          if (ht >= ro) continue;
          Zt !== -1 ? (K = Zt, de = H, oe = $, re = V, ue = 0) : nn !== -1 ? (K = nn, de = S, oe = g, re = x, ue = 1) : (K = yn, de = D, oe = _, re = A, ue = 2), G = Be;
        } else if (Hn === 2) {
          const Bn = Zt !== -1 ? Zt : nn, Pr = yn !== -1 ? yn : nn !== -1 ? nn : Zt, br = (Bn + 1) % ht === Pr ? Bn : (Pr + 1) % ht === Bn ? Pr : -1;
          if (br === -1) continue;
          K = br, le = (br + 1) % ht, ye = Zt === -1 ? 0 : nn === -1 ? 1 : 2, G = Be;
        }
      }
    }
  }
  const P = t.aabb;
  if (t.live > 0)
    for (let Me = 0; Me < wl; Me++) {
      if (Me === G || B[Me * bl + Hu] === 0) continue;
      const at = Me << 2;
      P[at] > j + F0 || P[at + 2] < X - F0 || P[at + 1] > ae + F0 || P[at + 3] < ne - F0 || n3(t, Me, a, s, f);
    }
  if (G !== -1) {
    const Me = G * ro, at = G * bl, Rt = B[at + Uu], Ae = t.bx, Be = t.by, Pe = t.bid, ut = t.bexp;
    if (le === -1) {
      const Ze = Pe[Me + K], Se = Pe[Me + (K + 1) % Rt];
      X0(t, Ze, Se);
      for (let Fe = Rt; Fe > K + 1; Fe--)
        Ae[Me + Fe] = Ae[Me + Fe - 1], Be[Me + Fe] = Be[Me + Fe - 1], Pe[Me + Fe] = Pe[Me + Fe - 1], ut[Me + Fe] = ut[Me + Fe - 1];
      Ae[Me + K + 1] = de, Be[Me + K + 1] = oe, Pe[Me + K + 1] = re, ut[Me + K] = F >> (ue + 1) % 3 & 1, ut[Me + K + 1] = F >> (ue + 2) % 3 & 1, B[at + Uu] = Rt + 1, Q0(t, Ze, re, G), Q0(t, re, Se, G);
    } else {
      const Ze = (K + 1) % Rt, Se = Pe[Me + K], Fe = Pe[Me + Ze], ct = Pe[Me + (Ze + 1) % Rt];
      X0(t, Se, Fe), X0(t, Fe, ct);
      for (let Ve = Ze; Ve < Rt - 1; Ve++)
        Ae[Me + Ve] = Ae[Me + Ve + 1], Be[Me + Ve] = Be[Me + Ve + 1], Pe[Me + Ve] = Pe[Me + Ve + 1], ut[Me + Ve] = ut[Me + Ve + 1];
      ut[Me + (K < Ze ? K : K - 1)] = F >> ye & 1, B[at + Uu] = Rt - 1, Q0(t, Se, ct, G);
    }
    B[at + Uh] = ie;
    const bt = G << 2;
    X < P[bt] && (P[bt] = X), ne < P[bt + 1] && (P[bt + 1] = ne), j > P[bt + 2] && (P[bt + 2] = j), ae > P[bt + 3] && (P[bt + 3] = ae);
    return;
  }
  let Z = -1;
  for (let Me = 0; Me < wl; Me++)
    if (B[Me * bl + Hu] === 0) {
      Z = Me;
      break;
    }
  if (Z === -1) {
    let Me = 2147483647;
    for (let at = 0; at < wl; at++) {
      const Rt = B[at * bl + Uh];
      Rt < Me && (Me = Rt, Z = at);
    }
    n3(t, Z, a, s, f);
  }
  const Ce = D - S, be = _ - g, $e = H - S, _e = $ - g, He = Ce * _e - $e * be, Ge = (p + C + L) * 0.33333334, Ye = (m + b + U) * 0.33333334, Xe = (v + R + q) * 0.33333334;
  let nt = 1, Oe = 0, Ke = 0, Re = 0, rt = 0;
  if (He > EC || He < -EC) {
    const Me = 1 / He, at = C - p, Rt = L - p, Ae = b - m, Be = U - m, Pe = R - v, ut = q - v, bt = (at * _e - Rt * be) * Me, Ze = (Ce * Rt - $e * at) * Me, Se = (Ae * _e - Be * be) * Me, Fe = (Ce * Be - $e * Ae) * Me, ct = (Pe * _e - ut * be) * Me, Ve = (Ce * ut - $e * Pe) * Me, Ot = bt * bt + Ze * Ze, Gt = Se * Se + Fe * Fe, Et = ct * ct + Ve * Ve;
    let dt, ke, ht;
    if (Ot >= Gt && Ot >= Et ? (dt = bt, ke = Ze, ht = Ot) : Gt >= Et ? (dt = Se, ke = Fe, ht = Gt) : (dt = ct, ke = Ve, ht = Et), ht > jz) {
      const Dt = 1 / Math.sqrt(ht);
      nt = dt * Dt, Oe = ke * Dt, Ke = bt * nt + Ze * Oe, Re = Se * nt + Fe * Oe, rt = ct * nt + Ve * Oe;
    }
  }
  const ot = ((S + D + H) * nt + (g + _ + $) * Oe) * 0.33333334, ze = Z * t1;
  t.field[ze + K2] = nt, t.field[ze + Z2] = Oe, t.field[ze + J2] = Ke, t.field[ze + n1] = Ge - Ke * ot, t.field[ze + e3] = Re, t.field[ze + r1] = Ye - Re * ot, t.field[ze + t3] = rt, t.field[ze + a1] = Xe - rt * ot;
  const yt = Z * ro;
  t.bx[yt] = S, t.by[yt] = g, t.bid[yt] = x, t.bx[yt + 1] = D, t.by[yt + 1] = _, t.bid[yt + 1] = A, t.bx[yt + 2] = H, t.by[yt + 2] = $, t.bid[yt + 2] = V, t.bexp[yt] = F & 1, t.bexp[yt + 1] = F >> 1 & 1, t.bexp[yt + 2] = F >> 2 & 1;
  const Ft = Z * bl;
  B[Ft + Hu] = 1, B[Ft + Uu] = 3, B[Ft + Uh] = ie, t.live++;
  const St = Z << 2;
  P[St] = X, P[St + 1] = ne, P[St + 2] = j, P[St + 3] = ae, $z(t, Z);
}
const xh = Fz();
function ap(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U, q, H, $, V, F, B, ie, X, j, ne, ae, G) {
  const K = U >>> 16 & 255, le = U >>> 8 & 255, de = U & 255;
  let oe = K, re = le, ue = de, ye = K, P = le, Z = de, Ce = K, be = le, $e = de;
  const _e = x[b], He = x[b + 1], Ge = x[b + 2], Ye = x[R], Xe = x[R + 1], nt = x[R + 2], Oe = x[D], Ke = x[D + 1], Re = x[D + 2], rt = q[0];
  for (let ot = 1; ot <= rt; ot++) {
    const ze = H[q[ot]];
    if (ze.light.type !== 0) continue;
    const yt = ze.light.color, Ft = yt >>> 16 & 255, St = yt >>> 8 & 255, Me = yt & 255, at = -ze.transform.worldMatrix[8], Rt = -ze.transform.worldMatrix[9], Ae = -ze.transform.worldMatrix[10], Be = _e * at + He * Rt + Ge * Ae, Pe = Ye * at + Xe * Rt + nt * Ae, ut = Oe * at + Ke * Rt + Re * Ae;
    Be > 0 && (oe += Ft * Be, re += St * Be, ue += Me * Be), Pe > 0 && (ye += Ft * Pe, P += St * Pe, Z += Me * Pe), ut > 0 && (Ce += Ft * ut, be += St * ut, $e += Me * ut);
  }
  oe > 255 && (oe = 255), re > 255 && (re = 255), ue > 255 && (ue = 255), ye > 255 && (ye = 255), P > 255 && (P = 255), Z > 255 && (Z = 255), Ce > 255 && (Ce = 255), be > 255 && (be = 255), $e > 255 && ($e = 255), xh.frameId !== ne && (Pz(xh), xh.frameId = ne), Iz(
    xh,
    t,
    X,
    j,
    oe,
    re,
    ue,
    a,
    s,
    b,
    ye,
    P,
    Z,
    f,
    p,
    R,
    Ce,
    be,
    $e,
    m,
    v,
    D,
    G
  ), ae && Vz(xh, t, X, j);
}
const sp = [], up = [];
let qz = 6;
const cp = 0, fp = 1, Hh = 2, dp = 4;
sp[cp] = Iu;
up[cp] = z3;
sp[fp] = L3;
up[fp] = ap;
sp[Hh] = Iu;
up[Hh] = R3;
sp[dp] = Iu;
up[dp] = ap;
function Yz(t, a) {
  const s = qz++;
  return sp[s] = t, a && (up[s] = a), s;
}
const wh = _3();
let Ch = new Float32Array(0), H2 = new Uint8Array(0);
const Io = new Int32Array(4), V2 = 0, K0 = 1, r3 = 2, Ya = new Float32Array(4), wC = 0.05, a3 = 9, i1 = 1, i3 = 4, l3 = 5, CC = 0;
function Wz(t, a, s, f, p) {
  let m = 0;
  if (s === 2 || s === 1) {
    const v = a[t * 9], S = a[t * 9 + 1], g = a[t * 9 + 2], x = a[t * 9 + 3], C = a[t * 9 + 4], b = a[t * 9 + 5], R = a[t * 9 + 6], D = a[t * 9 + 7], _ = a[t * 9 + 8], A = (v + x + R) * 0.33333, L = (S + C + D) * 0.33333, U = (g + b + _) * 0.33333;
    if (s === 2) {
      const q = f * f, $ = 1 / (p * p - q);
      m = (A * A + L * L + U * U - q) * $;
    } else
      m = (Math.sqrt(A * A + L * L + U * U) - f) / (p - f);
  } else if (s === 3) {
    const v = a[t * 9 + 2], S = a[t * 9 + 5], g = a[t * 9 + 8];
    m = ((v + S + g) * 0.33333 - f) / (p - f);
  }
  return m < 0 ? m = 0 : m > 1 && (m = 1), m;
}
function Bz(t, a, s, f, p, m, v, S, g, x, C, b, R) {
  Io[V2] = 0, Io[K0] = 0, Io[r3] = 0, Ya[0] = 1 / 0, Ya[1] = 1 / 0, Ya[2] = -1 / 0, Ya[3] = -1 / 0;
  let D = 0, _ = 0;
  for (let H = 0; H < S; H++) {
    const $ = t[H], V = a[$];
    if (V !== cp && V !== fp && V !== dp) {
      v[$] = 1;
      continue;
    }
    const F = Wz(
      $,
      s,
      C,
      b,
      R
    );
    if (m[$] = F, v[$] = 0, D++, F > 0 && (Io[K0] = 1), F >= 1) {
      _++;
      continue;
    }
    const B = p[$ * 3], ie = p[$ * 3 + 1], X = p[$ * 3 + 2], j = f[B] * g + g, ne = f[B + 1] * x + x, ae = f[ie] * g + g, G = f[ie + 1] * x + x, K = f[X] * g + g, le = f[X + 1] * x + x;
    let de = j < ae ? j : ae;
    K < de && (de = K);
    let oe = j > ae ? j : ae;
    K > oe && (oe = K);
    let re = ne < G ? ne : G;
    le < re && (re = le);
    let ue = ne > G ? ne : G;
    le > ue && (ue = le), de < Ya[0] && (Ya[0] = de), re < Ya[1] && (Ya[1] = re), oe > Ya[2] && (Ya[2] = oe), ue > Ya[3] && (Ya[3] = ue);
  }
  if (Io[V2] = D, Io[K0] === 0 || D === 0) return;
  if (_ === D) {
    Io[r3] = 1;
    return;
  }
  if (_ === 0) return;
  const A = Ya[0], L = Ya[1], U = Ya[2], q = Ya[3];
  for (let H = 0; H < S; H++) {
    const $ = t[H];
    if (v[$] === 1 || m[$] < 1) continue;
    const V = p[$ * 3], F = p[$ * 3 + 1], B = p[$ * 3 + 2], ie = f[V] * g + g, X = f[V + 1] * x + x, j = f[F] * g + g, ne = f[F + 1] * x + x, ae = f[B] * g + g, G = f[B + 1] * x + x;
    let K = ie < j ? ie : j;
    if (ae < K && (K = ae), K > U) {
      v[$] = 1, D--;
      continue;
    }
    let le = ie > j ? ie : j;
    if (ae > le && (le = ae), le < A) {
      v[$] = 1, D--;
      continue;
    }
    let de = X < ne ? X : ne;
    if (G < de && (de = G), de > q) {
      v[$] = 1, D--;
      continue;
    }
    let oe = X > ne ? X : ne;
    G > oe && (oe = G), oe < L && (v[$] = 1, D--);
  }
  Io[V2] = D;
}
function Gz(t, a, s, f, p, m, v, S, g, x, C) {
  if (g === 0) return 0;
  const b = C - x > 1e-4 ? 65535 / (C - x) : 0;
  S.fill(0, 0, 32);
  let R = 0;
  for (let _ = 0; _ < g; _++) {
    const A = t[_];
    if (v[A] === 1) continue;
    const L = (255 * (1 - m[A]) & 248) >> 3;
    S[L]++, R++;
  }
  let D = 0;
  for (let _ = 0; _ < 32; _++) {
    const A = S[_];
    S[_] = D, D += A;
  }
  for (let _ = 0; _ < g; _++) {
    const A = t[_];
    if (v[A] === 1) continue;
    const L = (255 * (1 - m[A]) & 248) >> 3;
    s[S[L]++] = A;
  }
  S.fill(0, 0, 256);
  for (let _ = 0; _ < R; _++)
    S[f[s[_]] & 255]++;
  D = 0;
  for (let _ = 0; _ < 256; _++) {
    const A = S[_];
    S[_] = D, D += A;
  }
  for (let _ = 0; _ < R; _++) {
    const A = s[_];
    a[S[f[A] & 255]++] = A;
  }
  S.fill(0, 0, 256);
  for (let _ = 0; _ < R; _++) {
    const A = a[_];
    let U = (p[A] - x) * b;
    U < 0 ? U = 0 : U > 65535 && (U = 65535), S[65535 - (U | 0) & 255]++;
  }
  D = 0;
  for (let _ = 0; _ < 256; _++) {
    const A = S[_];
    S[_] = D, D += A;
  }
  for (let _ = 0; _ < R; _++) {
    const A = a[_];
    let U = (p[A] - x) * b;
    U < 0 ? U = 0 : U > 65535 && (U = 65535), s[S[65535 - (U | 0) & 255]++] = A;
  }
  S.fill(0, 0, 256);
  for (let _ = 0; _ < R; _++) {
    const A = s[_];
    let U = (p[A] - x) * b;
    U < 0 ? U = 0 : U > 65535 && (U = 65535), S[65535 - (U | 0) >> 8 & 255]++;
  }
  D = 0;
  for (let _ = 0; _ < 256; _++) {
    const A = S[_];
    S[_] = D, D += A;
  }
  for (let _ = 0; _ < R; _++) {
    const A = s[_];
    let U = (p[A] - x) * b;
    U < 0 ? U = 0 : U > 65535 && (U = 65535), a[S[65535 - (U | 0) >> 8 & 255]++] = A;
  }
  return R;
}
function Qz(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U) {
  const q = 255 * (1 - C) & 248, H = (q & 248) << 8 | (q & 252) << 3 | (q & 248) >> 3;
  return wh.frameId !== A && (m1(wh), wh.frameId = A), (R || H !== CC) && (H !== CC && (R = !0), O3(
    wh,
    t,
    D,
    a3,
    -1,
    _,
    i1,
    wC,
    H,
    b,
    a,
    s,
    S,
    f,
    p,
    g,
    m,
    v,
    x,
    U
  )), L && k3(
    wh,
    t,
    D,
    a3,
    -1,
    _,
    i1,
    wC
  ), R;
}
function Xz(t, a, s) {
  const f = t.canvas, p = a.canvas, m = f.width, v = f.height, S = p.width, g = p.height;
  t.globalCompositeOperation = "multiply", t.drawImage(p, 0, 0, m, v);
  const x = s >>> 16, C = s >>> 8 & 255, b = s & 255, R = (x & 248) << 8 | (C & 252) << 3 | (b & 248) >> 3, D = ao[R];
  a.globalCompositeOperation = "difference", a.fillStyle = "#ffffff", a.fillRect(0, 0, S, g), a.globalCompositeOperation = "multiply", a.fillStyle = D, a.fillRect(0, 0, S, g), a.globalCompositeOperation = "source-over", t.globalCompositeOperation = "lighter", t.drawImage(p, 0, 0, m, v), t.globalCompositeOperation = "source-over";
}
function Kz(t, a, s, f, p, m, v, S, g, x, C, b, R, D) {
  const _ = t.canvas, A = _.width, L = _.height, U = A * 0.5, q = L * 0.5;
  t.fillStyle = "#000000", t.fillRect(0, 0, A, L), M3(
    p,
    0,
    x,
    S,
    g,
    v
  );
  let H = !1;
  for (let $ = 0; $ < x; $++) {
    const V = p[$], F = s[V * 3], B = s[V * 3 + 1], ie = s[V * 3 + 2], X = f[V * 3], j = f[V * 3 + 1], ne = f[V * 3 + 2], ae = a[F] * U + U, G = a[F + 1] * q + q, K = a[B] * U + U, le = a[B + 1] * q + q, de = a[ie] * U + U, oe = a[ie + 1] * q + q, re = $ === x - 1;
    H = Qz(
      t,
      ae,
      G,
      K,
      le,
      de,
      oe,
      X,
      j,
      ne,
      C[V],
      m[V],
      H,
      b,
      R,
      D,
      re,
      v[V]
    );
  }
}
function Zz(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U, q, H, $, V, F, B, ie, X) {
  const j = a.canvas;
  if (Ch.length < L && (Ch = new Float32Array(L), H2 = new Uint8Array(L)), Bz(
    m,
    g,
    b,
    s,
    f,
    Ch,
    H2,
    L,
    j.width * 0.5,
    j.height * 0.5,
    H,
    $,
    V
  ), Io[K0] === 0) return;
  if (Io[r3] === 1) {
    const K = F >>> 16, le = F >>> 8 & 255, de = F & 255, oe = (K & 248) << 8 | (le & 252) << 3 | (de & 248) >> 3;
    t.fillStyle = ao[oe], t.fillRect(0, 0, t.canvas.width, t.canvas.height), B[zs] = -1;
    return;
  }
  const ne = performance.now(), ae = Gz(
    m,
    v,
    S,
    x,
    C,
    Ch,
    H2,
    A,
    L,
    U,
    q
  );
  ie[i3] = performance.now() - ne;
  const G = performance.now();
  Kz(
    a,
    s,
    f,
    p,
    v,
    x,
    R,
    D,
    _,
    ae,
    Ch,
    B,
    ie,
    X
  ), ie[l3] = performance.now() - G, Xz(t, a, F);
}
const Jz = lr.computeNormalMatrix, I2 = Jk, bC = c1, eN = wz, tN = Cz;
function nN(t, a, s, f, p) {
  if (f === 1)
    return t;
  const m = t[0] + 1;
  s.fill(0);
  for (let S = 1; S < m; S++) {
    const g = t[S], x = a[g];
    x.meshRenderer && s[x.meshRenderer.layer]++;
  }
  let v = 0;
  for (let S = 0; S < f; S++) {
    const g = s[S];
    s[S] = v, p[v] = 0, v += 1 + g;
  }
  for (let S = 1; S < m; S++) {
    const g = t[S], x = a[g];
    if (x.meshRenderer) {
      const C = x.meshRenderer.layer, b = s[C], R = p[b];
      p[b + 1 + R] = g, p[b] = R + 1;
    }
  }
  return p;
}
function cT() {
  this.layerBuffers = new Uint32Array(0), this.layerBuffersOffsets = new Uint32Array(l1.layersCount), this.drawCalls = 0, this.faces = 0, this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.colorBuffer = new Uint32Array(0), this.shaderTypeBuffer = new Uint8Array(0), this.shaderPassBuffer = new Uint8Array(0), this.faceNormalsBuffer = new Float32Array(0), this.vertexNormalsBuffer = new Float32Array(0), this.meshIndexBuffer = new Uint32Array(0), this.meshFaceIndexBuffer = new Uint32Array(0), this.weldIdBuffer = new Uint32Array(0), this.expandMaskBuffer = new Uint8Array(0), this.neighbourFaceBuffer = new Int32Array(0), this.faceRankBuffer = new Int32Array(0), this.triToFace = new Int32Array(0), this.triToFaceStamp = new Int32Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.lightsIndexBuffer = new Uint32Array(10), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0), this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0), this.tempIndexBuffer = new Uint32Array(0), this.fogSortScratchBuffer = new Uint32Array(0), this.counters = new Uint32Array(256), this.ctxStateBuffer = new Int32Array(10), this.statsBuffer = new Float32Array(6);
}
var Qi = cT.prototype;
Qi.vec3Cache1 = new Float32Array([0, 0, 0]);
Qi.vec3Cache2 = new Float32Array([0, 0, 0]);
Qi.vec4Cache = new Float32Array([0, 0, 0]);
Qi.mat4Scratchpad1 = new Float32Array(16);
Qi.mat4Scratchpad2 = new Float32Array(16);
Qi.mat3Scratchpad1 = new Float32Array(9);
Qi.wireframe = !1;
Qi.debugNormals = !1;
Qi.debugAxis = !1;
Qi.fillEnabled = !0;
Qi.shadeEnabled = !0;
Qi.fogEnabled = !0;
Qi.render = function(t, a, s) {
  let f = performance.now();
  const p = performance.now();
  let m = t.scene.retrieve();
  const v = performance.now() - p;
  let S = l1.layersCount, g = a.width, x = a.height, C, b = this.vec3Cache1, R = this.vec3Cache2, D = this.vec4Cache, _ = this.depthBuffer, A = this.indexBuffer, L = this.vertexIndexBuffer, U = this.vertexBuffer, q = this.clipGeometryBuffer, H = this.colorBuffer, $ = this.shaderTypeBuffer, V = this.shaderPassBuffer, F = this.faceNormalsBuffer, B = this.vertexNormalsBuffer, ie = this.meshIndexBuffer, X = this.meshFaceIndexBuffer, j = this.weldIdBuffer, ne = this.expandMaskBuffer, ae = this.neighbourFaceBuffer, G = this.faceRankBuffer, K = this.visibleObjectsBuffer, le = this.lightsIndexBuffer, de = this.layerBuffersOffsets, oe = this.mat4Scratchpad1, re = this.mat4Scratchpad2, ue = a.getWorldToScreen(), ye = t.transform.getWorldToLocal(), P = t.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let Z = this.tempIndexBuffer, Ce = this.fogSortScratchBuffer, be = this.counters, $e = this.ctxStateBuffer, _e = this.statsBuffer;
  const He = ++iN;
  let Ge = 0, Ye = 0, Xe = 0, nt = 0, Oe = 0, Ke = 0, Re = 0, rt = 0, ot = 0;
  const ze = t.camera, yt = ze.flush || this.wireframe || !this.fillEnabled || !this.shadeEnabled || !this.fogEnabled;
  if (K.length < m.length) {
    const Ze = K;
    this.visibleObjectsBuffer = K = new Uint32Array(
      m.length
    ), K.set(Ze);
  }
  if (le.length < m.length) {
    const Ze = le;
    this.lightsIndexBuffer = le = new Uint32Array(
      m.length
    ), le.set(Ze);
  }
  const Ft = performance.now();
  rN(
    m,
    P,
    K,
    le
  ), aN(K, m, P);
  const St = performance.now() - Ft, Me = K[0] + 1, at = K[0];
  S > 1 && this.layerBuffers.length < at + S && (this.layerBuffers = new Uint32Array((at + S) * 2));
  const Rt = performance.now();
  let Ae = nN(
    K,
    m,
    de,
    S,
    this.layerBuffers
  );
  const Be = performance.now() - Rt;
  let Pe = 0, ut = 0, bt = 0;
  for (C = 0; C < S; C++) {
    const Ze = Ae[bt];
    if (Ze === 0) {
      bt += 1;
      continue;
    }
    const Se = a.layers[C], Fe = a.shadeLayers[C], ct = a.fogLayers[C];
    let Ve = 0, Ot = 0;
    for (let ke = 0; ke < Ze; ke++) {
      const ht = m[Ae[bt + 1 + ke]].meshRenderer;
      Ve += ht.faces.length;
      const Dt = ht.vertices.length;
      Dt > Ot && (Ot = Dt);
    }
    Ve = Ve / 3 | 0;
    const Gt = Ot / 3 | 0;
    if (this.vMapping.length < Gt && (this.vMapping = new Int32Array(Gt), this.vTags = new Uint32Array(Gt)), b.length < Ot && (this.vec3Cache1 = b = new Float32Array(Ot), this.vec3Cache2 = R = new Float32Array(Ot), this.vec4Cache = D = new Float32Array(Ot * 4 / 3)), _.length < Ve) {
      let ke = new Float32Array(Ve);
      ke.set(_), this.depthBuffer = _ = ke, ke = new Uint32Array(Ve), ke.set(A), this.indexBuffer = A = ke, ke = new Uint32Array(Ve), ke.set(Z), this.tempIndexBuffer = Z = ke, ke = new Uint32Array(Ve), ke.set(Ce), this.fogSortScratchBuffer = Ce = ke, ke = new Uint32Array(Ve * 3), ke.set(H), this.colorBuffer = H = ke, ke = new Uint8Array(Ve), ke.set($), this.shaderTypeBuffer = $ = ke, ke = new Uint8Array(Ve), ke.set(V), this.shaderPassBuffer = V = ke, ke = new Float32Array(Ve * 9), ke.set(q), this.clipGeometryBuffer = q = ke, ke = new Float32Array(Ve * 3), ke.set(F), this.faceNormalsBuffer = F = ke, ke = new Float32Array(Ve * 9), ke.set(B), this.vertexNormalsBuffer = B = ke, ke = new Uint32Array(Ve), ke.set(ie), this.meshIndexBuffer = ie = ke, ke = new Uint32Array(Ve), ke.set(X), this.meshFaceIndexBuffer = X = ke;
      let ht = new Float32Array(Ve * 6);
      ht.set(U), this.vertexBuffer = U = ht;
      let Dt = new Uint32Array(Ve * 3);
      Dt.set(L), this.vertexIndexBuffer = L = Dt;
      let Zt = new Uint32Array(Ve * 3);
      Zt.set(j), this.weldIdBuffer = j = Zt;
      const nn = new Uint8Array(Ve);
      nn.set(ne), this.expandMaskBuffer = ne = nn;
      const yn = new Int32Array(Ve * 3);
      yn.set(ae), this.neighbourFaceBuffer = ae = yn;
      const Hn = new Int32Array(Ve).fill(-1);
      Hn.set(G), this.faceRankBuffer = G = Hn, this.triToFace = new Int32Array(Ve), this.triToFaceStamp = new Int32Array(Ve);
    }
    const Et = performance.now(), dt = lN(
      Ae,
      bt + 1,
      m,
      Ze,
      R,
      D,
      A,
      _,
      H,
      $,
      V,
      q,
      ye,
      P,
      re,
      oe,
      this.mat3Scratchpad1,
      F,
      B,
      U,
      L,
      j,
      ie,
      X,
      ae,
      this.triToFace,
      this.triToFaceStamp,
      this.vMapping,
      this.vTags
    );
    if (ut += performance.now() - Et, ze.depthSorting) {
      const ke = performance.now();
      bz(
        A,
        Z,
        _,
        ie,
        V,
        be,
        dt,
        ze.nearClippingPane,
        ze.farClippingPane
      ), Pe += performance.now() - ke;
    }
    if ($e[zs] = -1, $e[Ns] = -1, $e[a3] = -1, $e[df] = 0, _e[Vu] = 0, _e[i1] = 0, _e[rp] = 0, _e[i3] = 0, _e[l3] = 0, this.wireframe)
      oN(
        Se,
        U,
        L,
        A,
        dt,
        0,
        g,
        x,
        $e
      );
    else {
      if (this.fillEnabled) {
        const ke = performance.now();
        sN(
          Se,
          U,
          L,
          j,
          A,
          H,
          $,
          dt,
          0,
          yt,
          q,
          ze.bgColor,
          ze.fogType,
          ze.fogColor,
          ze.fogNearPane,
          ze.fogFarPane,
          ze.ambientLight,
          F,
          B,
          ie,
          X,
          ne,
          ae,
          G,
          Ae,
          bt + 1,
          le,
          m,
          $e,
          _e,
          He
        ), Ke += performance.now() - ke;
      } else
        $e[zs] !== ff && (Se.fillStyle = ao[ff], $e[zs] = ff), Se.fillRect(0, 0, Se.canvas.width, Se.canvas.height);
      if (this.shadeEnabled) {
        const ke = performance.now();
        uN(
          Fe,
          yt,
          U,
          L,
          j,
          A,
          H,
          $,
          dt,
          0,
          q,
          ze.fogType,
          ze.fogColor,
          ze.fogNearPane,
          ze.fogFarPane,
          ze.ambientLight,
          F,
          B,
          ie,
          X,
          ne,
          ae,
          G,
          Ae,
          bt + 1,
          le,
          m,
          $e,
          _e,
          He
        ), Re += performance.now() - ke, $e[df] && (Se.globalCompositeOperation = "multiply", Se.drawImage(
          Fe.canvas,
          0,
          0,
          Se.canvas.width,
          Se.canvas.height
        ), Se.globalCompositeOperation = "source-over");
      }
      this.fogEnabled && ze.fogType !== g3.NONE && Zz(
        Se,
        ct,
        U,
        L,
        j,
        A,
        Z,
        Ce,
        $,
        ie,
        _,
        q,
        ne,
        ae,
        G,
        be,
        dt,
        ze.nearClippingPane,
        ze.farClippingPane,
        ze.fogType,
        ze.fogNearPane,
        ze.fogFarPane,
        ze.fogColor,
        $e,
        _e,
        He
      ), Xe += _e[Vu], nt += _e[i1], Oe += _e[rp], rt += _e[i3], ot += _e[l3];
    }
    this.debugNormals && tN(
      Se,
      U,
      L,
      A,
      F,
      B,
      dt,
      0,
      g,
      x,
      ye
    ), yt && a.context.clearRect(0, 0, g, x), a.context.drawImage(Se.canvas, 0, 0), Ge += dt, Ye += dt, bt += 1 + Ze;
  }
  this.debugAxis && eN(m, a.context, ue, b), s.totalObjects = m.length, s.visibleObjects = Me, s.drawCalls = Ge, s.faces = Ye, s.fillDrawCalls = Xe, s.fogDrawCalls = nt, s.shadeDrawCalls = Oe, s.drawCallsTotal = Xe + nt + Oe, s.sortTime = Pe, s.cullTime = St, s.groupTime = Be, s.processTime = ut, s.fillRasterTime = Ke, s.shadeRasterTime = Re, s.fogSortTime = rt, s.fogRasterTime = ot, s.updateTime = t.scene && t.scene.world ? t.scene.world.lastTickTime : 0, s.retrieveTime = v, s.dt = performance.now() - f;
};
function rN(t, a, s, f) {
  let p = 0, m = 0;
  const v = a[0], S = a[1], g = a[2], x = a[3], C = a[4], b = a[5], R = a[6], D = a[7], _ = a[8], A = a[9], L = a[10], U = a[11], q = a[12], H = a[13], $ = a[14], V = a[15];
  let F = x + v, B = D + C, ie = U + _, X = V + q, j = 1 / Math.sqrt(F * F + B * B + ie * ie);
  F *= j, B *= j, ie *= j, X *= j;
  let ne = x - v, ae = D - C, G = U - _, K = V - q;
  j = 1 / Math.sqrt(ne * ne + ae * ae + G * G), ne *= j, ae *= j, G *= j, K *= j;
  let le = x + S, de = D + b, oe = U + A, re = V + H;
  j = 1 / Math.sqrt(le * le + de * de + oe * oe), le *= j, de *= j, oe *= j, re *= j;
  let ue = x - S, ye = D - b, P = U - A, Z = V - H;
  j = 1 / Math.sqrt(ue * ue + ye * ye + P * P), ue *= j, ye *= j, P *= j, Z *= j;
  let Ce = x + g, be = D + R, $e = U + L, _e = V + $;
  j = 1 / Math.sqrt(Ce * Ce + be * be + $e * $e), Ce *= j, be *= j, $e *= j, _e *= j;
  let He = x - g, Ge = D - R, Ye = U - L, Xe = V - $;
  j = 1 / Math.sqrt(He * He + Ge * Ge + Ye * Ye), He *= j, Ge *= j, Ye *= j, Xe *= j;
  const nt = t.length;
  for (let Oe = 0; Oe < nt; Oe++) {
    const Ke = t[Oe];
    if (Ke.meshRenderer && Ke.meshRenderer.enabled) {
      const Re = Ke.transform.worldMatrix, rt = Ke.meshRenderer.bounds, ot = rt[28], ze = rt[29], yt = rt[30], Ft = Re[0] * ot + Re[4] * ze + Re[8] * yt + Re[12], St = Re[1] * ot + Re[5] * ze + Re[9] * yt + Re[13], Me = Re[2] * ot + Re[6] * ze + Re[10] * yt + Re[14], at = Re[0] * Re[0] + Re[1] * Re[1] + Re[2] * Re[2], Rt = Re[4] * Re[4] + Re[5] * Re[5] + Re[6] * Re[6], Ae = Re[8] * Re[8] + Re[9] * Re[9] + Re[10] * Re[10], Be = rt[31] * Math.sqrt(Math.max(at, Rt, Ae));
      if (F * Ft + B * St + ie * Me + X < -Be || ne * Ft + ae * St + G * Me + K < -Be || le * Ft + de * St + oe * Me + re < -Be || ue * Ft + ye * St + P * Me + Z < -Be || Ce * Ft + be * St + $e * Me + _e < -Be || He * Ft + Ge * St + Ye * Me + Xe < -Be) continue;
      s[++p] = Oe;
    }
    if (Ke.light)
      if (Ke.light.type === 1) {
        const Re = Ke.transform.worldMatrix, rt = Re[12], ot = Re[13], ze = Re[14], yt = Re[0] * Re[0] + Re[1] * Re[1] + Re[2] * Re[2], Ft = Re[4] * Re[4] + Re[5] * Re[5] + Re[6] * Re[6], St = Re[8] * Re[8] + Re[9] * Re[9] + Re[10] * Re[10], Me = Ke.light.range * Math.sqrt(Math.max(yt, Ft, St));
        if (F * rt + B * ot + ie * ze + X < -Me || ne * rt + ae * ot + G * ze + K < -Me || le * rt + de * ot + oe * ze + re < -Me || ue * rt + ye * ot + P * ze + Z < -Me || Ce * rt + be * ot + $e * ze + _e < -Me || He * rt + Ge * ot + Ye * ze + Xe < -Me) continue;
        f[++m] = Oe;
      } else
        f[++m] = Oe;
  }
  s[0] = p, f[0] = m;
}
function aN(t, a, s) {
  const f = s, p = f[0], m = f[1], v = f[2], S = f[3], g = f[4], x = f[5], C = f[6], b = f[7], R = f[8], D = f[9], _ = f[10], A = f[11], L = f[12], U = f[13], q = f[14], H = f[15];
  let $ = 0;
  const V = t[0] + 1;
  for (let F = 1; F < V; F++) {
    const B = t[F], ie = a[B], X = ie.transform.worldMatrix, j = ie.meshRenderer;
    if (j && j.enabled && j.bounds) {
      const ne = j.bounds;
      let ae = 63;
      for (let G = 0; G < 24; G += 3) {
        const K = ne[G], le = ne[G + 1], de = ne[G + 2], oe = X[0] * K + X[4] * le + X[8] * de + X[12], re = X[1] * K + X[5] * le + X[9] * de + X[13], ue = X[2] * K + X[6] * le + X[10] * de + X[14], ye = p * oe + g * re + R * ue + L, P = m * oe + x * re + D * ue + U, Z = v * oe + C * re + _ * ue + q, Ce = S * oe + b * re + A * ue + H;
        let be = 0;
        ye < -Ce && (be |= 1), ye > Ce && (be |= 2), P < -Ce && (be |= 4), P > Ce && (be |= 8), Z < -Ce && (be |= 16), Z > Ce && (be |= 32), ae &= be;
      }
      ae === 0 && (t[++$] = B);
    } else {
      const ne = X[12], ae = X[13], G = X[14], K = p * ne + g * ae + R * G + L, le = m * ne + x * ae + D * G + U, de = v * ne + C * ae + _ * G + q, oe = S * ne + b * ae + A * G + H;
      K >= -oe && K <= oe && le >= -oe && le <= oe && de >= -oe && de <= oe && (t[++$] = B);
    }
  }
  t[0] = $;
}
let lf = 0, iN = 0;
function lN(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U, q, H, $, V, F, B, ie, X, j, ne, ae) {
  let G = 0, K = 0, le = 0;
  for (let de = 0; de < f; de++) {
    const oe = t[a + de], re = s[oe], ue = re.meshRenderer;
    if (ue.constructor !== lr) continue;
    ++lf;
    const ye = re.transform.worldMatrix, P = ue.depthBias || 0;
    bC(A, D, ye), bC(_, R, ye);
    const Z = A[0], Ce = A[1], be = A[2], $e = A[3], _e = A[4], He = A[5], Ge = A[6], Ye = A[7], Xe = A[8], nt = A[9], Oe = A[10], Ke = A[11], Re = A[12], rt = A[13], ot = A[14], ze = A[15], yt = ue.weldMap, Ft = K;
    K += (ue.vertices.length / 3 | 0) + 1, ue.adjTri === null && ue.updateAdjacency();
    const St = ue.adjTri, Me = de + 1, at = G, Rt = ue.faces, Ae = ue.vertices, Be = ue.faceNormals, Pe = ue.vertexNormals;
    Jz(L, ye);
    const ut = L, bt = ut[0], Ze = ut[1], Se = ut[2], Fe = ut[3], ct = ut[4], Ve = ut[5], Ot = ut[6], Gt = ut[7], Et = ut[8], dt = Rt.length;
    for (let ke = 0; ke < dt; ke += 3) {
      const ht = Rt[ke], Dt = Rt[ke + 1], Zt = Rt[ke + 2], nn = ht << 2, yn = Dt << 2, Hn = Zt << 2;
      if (ae[ht] !== lf) {
        const on = ht * 3, Ut = Ae[on], an = Ae[on + 1], un = Ae[on + 2];
        m[nn] = Z * Ut + _e * an + Xe * un + Re, m[nn + 1] = Ce * Ut + He * an + nt * un + rt, m[nn + 2] = be * Ut + Ge * an + Oe * un + ot, m[nn + 3] = $e * Ut + Ye * an + Ke * un + ze, ae[ht] = lf, ne[ht] = -1;
      }
      if (ae[Dt] !== lf) {
        const on = Dt * 3, Ut = Ae[on], an = Ae[on + 1], un = Ae[on + 2];
        m[yn] = Z * Ut + _e * an + Xe * un + Re, m[yn + 1] = Ce * Ut + He * an + nt * un + rt, m[yn + 2] = be * Ut + Ge * an + Oe * un + ot, m[yn + 3] = $e * Ut + Ye * an + Ke * un + ze, ae[Dt] = lf, ne[Dt] = -1;
      }
      if (ae[Zt] !== lf) {
        const on = Zt * 3, Ut = Ae[on], an = Ae[on + 1], un = Ae[on + 2];
        m[Hn] = Z * Ut + _e * an + Xe * un + Re, m[Hn + 1] = Ce * Ut + He * an + nt * un + rt, m[Hn + 2] = be * Ut + Ge * an + Oe * un + ot, m[Hn + 3] = $e * Ut + Ye * an + Ke * un + ze, ae[Zt] = lf, ne[Zt] = -1;
      }
      const Bn = m[nn], Pr = m[nn + 1], br = m[nn + 2], vr = m[nn + 3], Ai = m[yn], Tr = m[yn + 1], Ar = m[yn + 2], Vn = m[yn + 3], Ma = m[Hn], oa = m[Hn + 1], Wa = m[Hn + 2], Lr = m[Hn + 3];
      if (Bn < -vr && Ai < -Vn && Ma < -Lr || Bn > vr && Ai > Vn && Ma > Lr || Pr < -vr && Tr < -Vn && oa < -Lr || Pr > vr && Tr > Vn && oa > Lr || br < -vr && Ar < -Vn && Wa < -Lr || br > vr && Ar > Vn && Wa > Lr) continue;
      const W = 1 / vr, De = 1 / Vn, Je = 1 / Lr, ft = Bn * W, qt = Pr * W, Vt = Ai * De, tn = Tr * De, Jt = Ma * Je, Gn = oa * Je;
      if ((Vt - ft) * (Gn - qt) - (tn - qt) * (Jt - ft) > 0) continue;
      const gn = ht * 3, xn = Dt * 3, In = Zt * 3;
      v[G] = G, F[G] = de, B[G] = ke;
      const _a = ke / 3 | 0;
      X[_a] = G, j[_a] = Me;
      const sa = Be[ke], Yt = Be[ke + 1], Qt = Be[ke + 2], ua = sa * bt + Yt * Fe + Qt * Ot, Li = sa * Ze + Yt * ct + Qt * Gt, zi = sa * Se + Yt * Ve + Qt * Et, Ni = Math.sqrt(ua * ua + Li * Li + zi * zi), Xi = Ni > 0 ? 1 / Ni : 0, ii = G * 3;
      if (g[ii] = ue.colors[ht], g[ii + 1] = ue.colors[Dt], g[ii + 2] = ue.colors[Zt], x[G] = ue.shaderType, C[G] = 0, ne[ht] === -1) {
        const on = le * 3;
        I2(
          p,
          gn,
          Ae[gn],
          Ae[gn + 1],
          Ae[gn + 2],
          _
        ), H[on] = ft, H[on + 1] = -qt, ne[ht] = on, le++;
        const Ut = ht * 3, an = Pe[Ut] * bt + Pe[Ut + 1] * Fe + Pe[Ut + 2] * Ot, un = Pe[Ut] * Ze + Pe[Ut + 1] * ct + Pe[Ut + 2] * Gt, Zn = Pe[Ut] * Se + Pe[Ut + 1] * Ve + Pe[Ut + 2] * Et, ca = Math.sqrt(an * an + un * un + Zn * Zn), Rr = ca > 0 ? 1 / ca : 0;
        q[on] = an * Rr, q[on + 1] = un * Rr, q[on + 2] = Zn * Rr;
      }
      if ($[G * 3] = ne[ht], V[G * 3] = Ft + (yt ? yt[ht] : ht), ne[Dt] === -1) {
        const on = le * 3;
        I2(
          p,
          xn,
          Ae[xn],
          Ae[xn + 1],
          Ae[xn + 2],
          _
        ), H[on] = Vt, H[on + 1] = -tn, ne[Dt] = on, le++;
        const Ut = Dt * 3, an = Pe[Ut] * bt + Pe[Ut + 1] * Fe + Pe[Ut + 2] * Ot, un = Pe[Ut] * Ze + Pe[Ut + 1] * ct + Pe[Ut + 2] * Gt, Zn = Pe[Ut] * Se + Pe[Ut + 1] * Ve + Pe[Ut + 2] * Et, ca = Math.sqrt(an * an + un * un + Zn * Zn), Rr = ca > 0 ? 1 / ca : 0;
        q[on] = an * Rr, q[on + 1] = un * Rr, q[on + 2] = Zn * Rr;
      }
      if ($[G * 3 + 1] = ne[Dt], V[G * 3 + 1] = Ft + (yt ? yt[Dt] : Dt), ne[Zt] === -1) {
        const on = le * 3;
        I2(
          p,
          In,
          Ae[In],
          Ae[In + 1],
          Ae[In + 2],
          _
        ), H[on] = Jt, H[on + 1] = -Gn, ne[Zt] = on, le++;
        const Ut = Zt * 3, an = Pe[Ut] * bt + Pe[Ut + 1] * Fe + Pe[Ut + 2] * Ot, un = Pe[Ut] * Ze + Pe[Ut + 1] * ct + Pe[Ut + 2] * Gt, Zn = Pe[Ut] * Se + Pe[Ut + 1] * Ve + Pe[Ut + 2] * Et, ca = Math.sqrt(an * an + un * un + Zn * Zn), Rr = ca > 0 ? 1 / ca : 0;
        q[on] = an * Rr, q[on + 1] = un * Rr, q[on + 2] = Zn * Rr;
      }
      $[G * 3 + 2] = ne[Zt], V[G * 3 + 2] = Ft + (yt ? yt[Zt] : Zt);
      const Qn = G * 9;
      b[Qn] = p[gn], b[Qn + 1] = p[gn + 1];
      const Yo = b[Qn + 2] = p[gn + 2];
      b[Qn + 3] = p[xn], b[Qn + 4] = p[xn + 1];
      const $r = b[Qn + 5] = p[xn + 2];
      b[Qn + 6] = p[In], b[Qn + 7] = p[In + 1];
      const Fs = b[Qn + 8] = p[In + 2];
      S[G] = (Yo + $r + Fs) * 0.33333 + P;
      const io = G * 3;
      U[io] = ua * Xi, U[io + 1] = Li * Xi, U[io + 2] = zi * Xi, G++;
    }
    for (let ke = at; ke < G; ke++) {
      const ht = B[ke], Dt = ke * 3, Zt = St[ht], nn = St[ht + 1], yn = St[ht + 2];
      ie[Dt] = Zt < 0 ? np : j[Zt] === Me ? X[Zt] : j2, ie[Dt + 1] = nn < 0 ? np : j[nn] === Me ? X[nn] : j2, ie[Dt + 2] = yn < 0 ? np : j[yn] === Me ? X[yn] : j2;
    }
  }
  return G;
}
function oN(t, a, s, f, p, m, v, S, g) {
  const x = v * 0.5, C = S * 0.5, b = m + p;
  t.clearRect(0, 0, t.canvas.width, t.canvas.height), g[zs] = -1, t.beginPath(), g[zs] !== z0 && (t.fillStyle = ao[z0], t.strokeStyle = ao[z0], g[zs] = z0);
  for (let R = m; R < b; R++) {
    const D = f[R], _ = s[D * 3], A = s[D * 3 + 1], L = s[D * 3 + 2], U = a[_] * x + x, q = a[_ + 1] * C + C, H = a[A] * x + x, $ = a[A + 1] * C + C, V = a[L] * x + x, F = a[L + 1] * C + C;
    t.moveTo(U, q), t.lineTo(H, $), t.lineTo(V, F), t.lineTo(U, q);
  }
  t.stroke();
}
function sN(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U, q, H, $, V, F, B, ie, X, j, ne, ae, G, K) {
  const le = t.canvas, de = le.width, oe = le.height, re = de * 0.5, ue = oe * 0.5, ye = g + S;
  if (x)
    if (b !== -1) {
      const P = b >>> 16, Z = b >>> 8 & 255, Ce = b & 255, be = P & 248, $e = Z & 252, _e = Ce & 248, He = be << 8 | $e << 3 | _e >> 3;
      t.fillStyle = ao[He], t.fillRect(0, 0, de, oe);
    } else
      t.clearRect(0, 0, de, oe);
  M3(
    p,
    g,
    ye,
    F,
    B,
    V
  );
  for (let P = g; P < ye; P++) {
    const Z = p[P], Ce = s[Z * 3], be = s[Z * 3 + 1], $e = s[Z * 3 + 2], _e = f[Z * 3], He = f[Z * 3 + 1], Ge = f[Z * 3 + 2], Ye = a[Ce] * re + re, Xe = a[Ce + 1] * ue + ue, nt = a[be] * re + re, Oe = a[be + 1] * ue + ue, Ke = a[$e] * re + re, Re = a[$e + 1] * ue + ue, rt = H[Z], ot = ne[ie[X + rt]].meshRenderer, ze = v[Z], yt = P === ye - 1 || v[p[P + 1]] !== ze;
    switch (ze) {
      case cp: {
        Iu(
          t,
          Ye,
          Xe,
          nt,
          Oe,
          Ke,
          Re,
          C,
          m,
          q,
          U,
          _e,
          He,
          Ge,
          Z,
          ot,
          $[Z],
          L,
          j,
          ne,
          R,
          D,
          _,
          A,
          rt,
          ae,
          G,
          K,
          yt,
          V[Z]
        );
        break;
      }
      case fp: {
        L3(
          t,
          Ye,
          Xe,
          nt,
          Oe,
          Ke,
          Re,
          C,
          m,
          q,
          U,
          _e,
          He,
          Ge,
          Z,
          ot,
          $[Z],
          L,
          j,
          ne,
          R,
          D,
          _,
          A,
          rt,
          ae,
          G,
          K,
          yt,
          V[Z]
        );
        break;
      }
      case Hh: {
        Iu(
          t,
          Ye,
          Xe,
          nt,
          Oe,
          Ke,
          Re,
          C,
          m,
          q,
          U,
          _e,
          He,
          Ge,
          Z,
          ot,
          $[Z],
          L,
          j,
          ne,
          R,
          D,
          _,
          A,
          rt,
          ae,
          G,
          K,
          yt,
          V[Z]
        );
        break;
      }
      case dp: {
        Iu(
          t,
          Ye,
          Xe,
          nt,
          Oe,
          Ke,
          Re,
          C,
          m,
          q,
          U,
          _e,
          He,
          Ge,
          Z,
          ot,
          $[Z],
          L,
          j,
          ne,
          R,
          D,
          _,
          A,
          rt,
          ae,
          G,
          K,
          yt,
          V[Z]
        );
        break;
      }
      default: {
        const Ft = sp[ze];
        Ft(
          t,
          Ye,
          Xe,
          nt,
          Oe,
          Ke,
          Re,
          C,
          m,
          q,
          U,
          _e,
          He,
          Ge,
          Z,
          ot,
          $[Z],
          L,
          j,
          ne,
          R,
          D,
          _,
          A,
          rt,
          ae,
          G,
          K,
          yt
        );
        break;
      }
    }
  }
}
function uN(t, a, s, f, p, m, v, S, g, x, C, b, R, D, _, A, L, U, q, H, $, V, F, B, ie, X, j, ne, ae, G) {
  const K = t.canvas, le = K.width, de = K.height;
  a && t.clearRect(0, 0, le, de);
  const oe = le * 0.5, re = de * 0.5, ue = x + g;
  M3(
    m,
    x,
    ue,
    V,
    F,
    $
  );
  for (let ye = x; ye < ue; ye++) {
    const P = m[ye], Z = f[P * 3], Ce = f[P * 3 + 1], be = f[P * 3 + 2], $e = p[P * 3], _e = p[P * 3 + 1], He = p[P * 3 + 2], Ge = s[Z] * oe + oe, Ye = s[Z + 1] * re + re, Xe = s[Ce] * oe + oe, nt = s[Ce + 1] * re + re, Oe = s[be] * oe + oe, Ke = s[be + 1] * re + re, Re = q[P], rt = j[B[ie + Re]].meshRenderer, ot = S[P], ze = ye === ue - 1 || S[m[ye + 1]] !== ot;
    switch (ot) {
      case cp: {
        z3(
          t,
          Ge,
          Ye,
          Xe,
          nt,
          Oe,
          Ke,
          C,
          v,
          U,
          L,
          $e,
          _e,
          He,
          P,
          rt,
          H[P],
          A,
          X,
          j,
          b,
          R,
          D,
          _,
          Re,
          ne,
          ae,
          G,
          ze,
          $[P]
        );
        break;
      }
      case fp: {
        ap(
          t,
          Ge,
          Ye,
          Xe,
          nt,
          Oe,
          Ke,
          C,
          v,
          U,
          L,
          Z,
          Ce,
          be,
          P,
          rt,
          H[P],
          A,
          X,
          j,
          b,
          R,
          D,
          _,
          Re,
          ne,
          ae,
          G,
          ze,
          $[P]
        );
        break;
      }
      case Hh: {
        R3(
          t,
          Ge,
          Ye,
          Xe,
          nt,
          Oe,
          Ke,
          C,
          v,
          U,
          L,
          $e,
          _e,
          He,
          P,
          rt,
          H[P],
          A,
          X,
          j,
          b,
          R,
          D,
          _,
          Re,
          ne,
          ae
        );
        break;
      }
      case dp: {
        ap(
          t,
          Ge,
          Ye,
          Xe,
          nt,
          Oe,
          Ke,
          C,
          v,
          U,
          L,
          Z,
          Ce,
          be,
          P,
          rt,
          H[P],
          A,
          X,
          j,
          b,
          R,
          D,
          _,
          Re,
          ne,
          ae,
          G,
          ze,
          $[P]
        );
        break;
      }
      default: {
        const yt = up[ot];
        yt(
          t,
          Ge,
          Ye,
          Xe,
          nt,
          Oe,
          Ke,
          C,
          v,
          U,
          L,
          $e,
          _e,
          He,
          P,
          rt,
          H[P],
          A,
          X,
          j,
          b,
          R,
          D,
          _,
          Re,
          ne,
          ae,
          G,
          ze
        );
        break;
      }
    }
  }
}
const TC = c1, P0 = !0;
function fT(t, a) {
  this.canvas = a || document.createElement("canvas"), this.canvas.style.filter = "url(#stripBlue)", this.context = this.canvas.getContext("2d", { alpha: P0 }), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new cT(), this.camera = t, this.scale = 1, this.layers = [], this.shadeLayers = [], this.fogLayers = [];
  for (var s = 0; s < l1.layersCount; s++) {
    var f = document.createElement("canvas");
    this.layers[s] = f.getContext("2d", { alpha: P0 }), this.layers[s].imageSmoothingEnabled = !1, this.layers[s].webkitImageSmoothingEnabled = !1;
    var p = document.createElement("canvas");
    this.shadeLayers[s] = p.getContext("2d", { alpha: P0 }), this.shadeLayers[s].imageSmoothingEnabled = !1, this.shadeLayers[s].webkitImageSmoothingEnabled = !1;
    var m = document.createElement("canvas");
    this.fogLayers[s] = m.getContext("2d", { alpha: P0 }), this.fogLayers[s].imageSmoothingEnabled = !1, this.fogLayers[s].webkitImageSmoothingEnabled = !1;
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
  let S = performance.now(), g = 0, x = performance.now();
  const C = this;
  this.startRenderLoop = function b() {
    requestAnimationFrame(() => {
      const R = performance.now(), D = R - S;
      S = R, g++, R - x >= 500 && (C.lastRenderStats.fps = Math.round(
        g * 1e3 / (R - x)
      ), g = 0, x = R), C.lastRenderStats.frameTime = D, C.render(), requestAnimationFrame(b);
    });
  };
}
var la = fT.prototype;
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
    var S = this.fogLayers[p];
    S.canvas.width = Math.ceil(s / 1), S.canvas.height = Math.ceil(f / 1);
  }
  this.camera.setup(t, a);
};
la.getWorldToScreen = function() {
  return TC(
    this.worldToScreenMatrix,
    this.viewportMatrix,
    this.camera.projectionMatrix
  ), TC(
    this.worldToScreenMatrix,
    this.worldToScreenMatrix,
    this.camera.gameObject.transform.getWorldToLocal()
  ), this.worldToScreenMatrix;
};
ip.Type = {
  DIRECTIONAL: 0,
  POINT: 1,
  SPOT: 2
};
function qu() {
  $n.call(this);
}
qu.prototype = Object.create($n.prototype);
qu.prototype.constructor = qu;
qu.prototype.color = 16777215;
qu.prototype.range = 10;
qu.prototype.type = ip.Type.DIRECTIONAL;
qu.prototype.setGameObject = function(t) {
  $n.prototype.setGameObject.call(this, t), t.light = this;
};
function ip(t) {
  ai.call(this, t || "light"), this.addComponent(this.light = new qu());
}
ip.prototype = Object.create(ai.prototype);
ip.prototype.constructor = ip;
var $0 = { exports: {} }, bh = {}, H0 = { exports: {} }, dn = {};
var RC;
function cN() {
  if (RC) return dn;
  RC = 1;
  var t = /* @__PURE__ */ Symbol.for("react.element"), a = /* @__PURE__ */ Symbol.for("react.portal"), s = /* @__PURE__ */ Symbol.for("react.fragment"), f = /* @__PURE__ */ Symbol.for("react.strict_mode"), p = /* @__PURE__ */ Symbol.for("react.profiler"), m = /* @__PURE__ */ Symbol.for("react.provider"), v = /* @__PURE__ */ Symbol.for("react.context"), S = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), x = /* @__PURE__ */ Symbol.for("react.memo"), C = /* @__PURE__ */ Symbol.for("react.lazy"), b = Symbol.iterator;
  function R(P) {
    return P === null || typeof P != "object" ? null : (P = b && P[b] || P["@@iterator"], typeof P == "function" ? P : null);
  }
  var D = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, _ = Object.assign, A = {};
  function L(P, Z, Ce) {
    this.props = P, this.context = Z, this.refs = A, this.updater = Ce || D;
  }
  L.prototype.isReactComponent = {}, L.prototype.setState = function(P, Z) {
    if (typeof P != "object" && typeof P != "function" && P != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, P, Z, "setState");
  }, L.prototype.forceUpdate = function(P) {
    this.updater.enqueueForceUpdate(this, P, "forceUpdate");
  };
  function U() {
  }
  U.prototype = L.prototype;
  function q(P, Z, Ce) {
    this.props = P, this.context = Z, this.refs = A, this.updater = Ce || D;
  }
  var H = q.prototype = new U();
  H.constructor = q, _(H, L.prototype), H.isPureReactComponent = !0;
  var $ = Array.isArray, V = Object.prototype.hasOwnProperty, F = { current: null }, B = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ie(P, Z, Ce) {
    var be, $e = {}, _e = null, He = null;
    if (Z != null) for (be in Z.ref !== void 0 && (He = Z.ref), Z.key !== void 0 && (_e = "" + Z.key), Z) V.call(Z, be) && !B.hasOwnProperty(be) && ($e[be] = Z[be]);
    var Ge = arguments.length - 2;
    if (Ge === 1) $e.children = Ce;
    else if (1 < Ge) {
      for (var Ye = Array(Ge), Xe = 0; Xe < Ge; Xe++) Ye[Xe] = arguments[Xe + 2];
      $e.children = Ye;
    }
    if (P && P.defaultProps) for (be in Ge = P.defaultProps, Ge) $e[be] === void 0 && ($e[be] = Ge[be]);
    return { $$typeof: t, type: P, key: _e, ref: He, props: $e, _owner: F.current };
  }
  function X(P, Z) {
    return { $$typeof: t, type: P.type, key: Z, ref: P.ref, props: P.props, _owner: P._owner };
  }
  function j(P) {
    return typeof P == "object" && P !== null && P.$$typeof === t;
  }
  function ne(P) {
    var Z = { "=": "=0", ":": "=2" };
    return "$" + P.replace(/[=:]/g, function(Ce) {
      return Z[Ce];
    });
  }
  var ae = /\/+/g;
  function G(P, Z) {
    return typeof P == "object" && P !== null && P.key != null ? ne("" + P.key) : Z.toString(36);
  }
  function K(P, Z, Ce, be, $e) {
    var _e = typeof P;
    (_e === "undefined" || _e === "boolean") && (P = null);
    var He = !1;
    if (P === null) He = !0;
    else switch (_e) {
      case "string":
      case "number":
        He = !0;
        break;
      case "object":
        switch (P.$$typeof) {
          case t:
          case a:
            He = !0;
        }
    }
    if (He) return He = P, $e = $e(He), P = be === "" ? "." + G(He, 0) : be, $($e) ? (Ce = "", P != null && (Ce = P.replace(ae, "$&/") + "/"), K($e, Z, Ce, "", function(Xe) {
      return Xe;
    })) : $e != null && (j($e) && ($e = X($e, Ce + (!$e.key || He && He.key === $e.key ? "" : ("" + $e.key).replace(ae, "$&/") + "/") + P)), Z.push($e)), 1;
    if (He = 0, be = be === "" ? "." : be + ":", $(P)) for (var Ge = 0; Ge < P.length; Ge++) {
      _e = P[Ge];
      var Ye = be + G(_e, Ge);
      He += K(_e, Z, Ce, Ye, $e);
    }
    else if (Ye = R(P), typeof Ye == "function") for (P = Ye.call(P), Ge = 0; !(_e = P.next()).done; ) _e = _e.value, Ye = be + G(_e, Ge++), He += K(_e, Z, Ce, Ye, $e);
    else if (_e === "object") throw Z = String(P), Error("Objects are not valid as a React child (found: " + (Z === "[object Object]" ? "object with keys {" + Object.keys(P).join(", ") + "}" : Z) + "). If you meant to render a collection of children, use an array instead.");
    return He;
  }
  function le(P, Z, Ce) {
    if (P == null) return P;
    var be = [], $e = 0;
    return K(P, be, "", "", function(_e) {
      return Z.call(Ce, _e, $e++);
    }), be;
  }
  function de(P) {
    if (P._status === -1) {
      var Z = P._result;
      Z = Z(), Z.then(function(Ce) {
        (P._status === 0 || P._status === -1) && (P._status = 1, P._result = Ce);
      }, function(Ce) {
        (P._status === 0 || P._status === -1) && (P._status = 2, P._result = Ce);
      }), P._status === -1 && (P._status = 0, P._result = Z);
    }
    if (P._status === 1) return P._result.default;
    throw P._result;
  }
  var oe = { current: null }, re = { transition: null }, ue = { ReactCurrentDispatcher: oe, ReactCurrentBatchConfig: re, ReactCurrentOwner: F };
  function ye() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return dn.Children = { map: le, forEach: function(P, Z, Ce) {
    le(P, function() {
      Z.apply(this, arguments);
    }, Ce);
  }, count: function(P) {
    var Z = 0;
    return le(P, function() {
      Z++;
    }), Z;
  }, toArray: function(P) {
    return le(P, function(Z) {
      return Z;
    }) || [];
  }, only: function(P) {
    if (!j(P)) throw Error("React.Children.only expected to receive a single React element child.");
    return P;
  } }, dn.Component = L, dn.Fragment = s, dn.Profiler = p, dn.PureComponent = q, dn.StrictMode = f, dn.Suspense = g, dn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ue, dn.act = ye, dn.cloneElement = function(P, Z, Ce) {
    if (P == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + P + ".");
    var be = _({}, P.props), $e = P.key, _e = P.ref, He = P._owner;
    if (Z != null) {
      if (Z.ref !== void 0 && (_e = Z.ref, He = F.current), Z.key !== void 0 && ($e = "" + Z.key), P.type && P.type.defaultProps) var Ge = P.type.defaultProps;
      for (Ye in Z) V.call(Z, Ye) && !B.hasOwnProperty(Ye) && (be[Ye] = Z[Ye] === void 0 && Ge !== void 0 ? Ge[Ye] : Z[Ye]);
    }
    var Ye = arguments.length - 2;
    if (Ye === 1) be.children = Ce;
    else if (1 < Ye) {
      Ge = Array(Ye);
      for (var Xe = 0; Xe < Ye; Xe++) Ge[Xe] = arguments[Xe + 2];
      be.children = Ge;
    }
    return { $$typeof: t, type: P.type, key: $e, ref: _e, props: be, _owner: He };
  }, dn.createContext = function(P) {
    return P = { $$typeof: v, _currentValue: P, _currentValue2: P, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, P.Provider = { $$typeof: m, _context: P }, P.Consumer = P;
  }, dn.createElement = ie, dn.createFactory = function(P) {
    var Z = ie.bind(null, P);
    return Z.type = P, Z;
  }, dn.createRef = function() {
    return { current: null };
  }, dn.forwardRef = function(P) {
    return { $$typeof: S, render: P };
  }, dn.isValidElement = j, dn.lazy = function(P) {
    return { $$typeof: C, _payload: { _status: -1, _result: P }, _init: de };
  }, dn.memo = function(P, Z) {
    return { $$typeof: x, type: P, compare: Z === void 0 ? null : Z };
  }, dn.startTransition = function(P) {
    var Z = re.transition;
    re.transition = {};
    try {
      P();
    } finally {
      re.transition = Z;
    }
  }, dn.unstable_act = ye, dn.useCallback = function(P, Z) {
    return oe.current.useCallback(P, Z);
  }, dn.useContext = function(P) {
    return oe.current.useContext(P);
  }, dn.useDebugValue = function() {
  }, dn.useDeferredValue = function(P) {
    return oe.current.useDeferredValue(P);
  }, dn.useEffect = function(P, Z) {
    return oe.current.useEffect(P, Z);
  }, dn.useId = function() {
    return oe.current.useId();
  }, dn.useImperativeHandle = function(P, Z, Ce) {
    return oe.current.useImperativeHandle(P, Z, Ce);
  }, dn.useInsertionEffect = function(P, Z) {
    return oe.current.useInsertionEffect(P, Z);
  }, dn.useLayoutEffect = function(P, Z) {
    return oe.current.useLayoutEffect(P, Z);
  }, dn.useMemo = function(P, Z) {
    return oe.current.useMemo(P, Z);
  }, dn.useReducer = function(P, Z, Ce) {
    return oe.current.useReducer(P, Z, Ce);
  }, dn.useRef = function(P) {
    return oe.current.useRef(P);
  }, dn.useState = function(P) {
    return oe.current.useState(P);
  }, dn.useSyncExternalStore = function(P, Z, Ce) {
    return oe.current.useSyncExternalStore(P, Z, Ce);
  }, dn.useTransition = function() {
    return oe.current.useTransition();
  }, dn.version = "18.3.1", dn;
}
var Dh = { exports: {} };
Dh.exports;
var MC;
function fN() {
  return MC || (MC = 1, (function(t, a) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var s = "18.3.1", f = /* @__PURE__ */ Symbol.for("react.element"), p = /* @__PURE__ */ Symbol.for("react.portal"), m = /* @__PURE__ */ Symbol.for("react.fragment"), v = /* @__PURE__ */ Symbol.for("react.strict_mode"), S = /* @__PURE__ */ Symbol.for("react.profiler"), g = /* @__PURE__ */ Symbol.for("react.provider"), x = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), b = /* @__PURE__ */ Symbol.for("react.suspense"), R = /* @__PURE__ */ Symbol.for("react.suspense_list"), D = /* @__PURE__ */ Symbol.for("react.memo"), _ = /* @__PURE__ */ Symbol.for("react.lazy"), A = /* @__PURE__ */ Symbol.for("react.offscreen"), L = Symbol.iterator, U = "@@iterator";
      function q(k) {
        if (k === null || typeof k != "object")
          return null;
        var Y = L && k[L] || k[U];
        return typeof Y == "function" ? Y : null;
      }
      var H = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, $ = {
        transition: null
      }, V = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, F = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, B = {}, ie = null;
      function X(k) {
        ie = k;
      }
      B.setExtraStackFrame = function(k) {
        ie = k;
      }, B.getCurrentStack = null, B.getStackAddendum = function() {
        var k = "";
        ie && (k += ie);
        var Y = B.getCurrentStack;
        return Y && (k += Y() || ""), k;
      };
      var j = !1, ne = !1, ae = !1, G = !1, K = !1, le = {
        ReactCurrentDispatcher: H,
        ReactCurrentBatchConfig: $,
        ReactCurrentOwner: F
      };
      le.ReactDebugCurrentFrame = B, le.ReactCurrentActQueue = V;
      function de(k) {
        {
          for (var Y = arguments.length, he = new Array(Y > 1 ? Y - 1 : 0), Ee = 1; Ee < Y; Ee++)
            he[Ee - 1] = arguments[Ee];
          re("warn", k, he);
        }
      }
      function oe(k) {
        {
          for (var Y = arguments.length, he = new Array(Y > 1 ? Y - 1 : 0), Ee = 1; Ee < Y; Ee++)
            he[Ee - 1] = arguments[Ee];
          re("error", k, he);
        }
      }
      function re(k, Y, he) {
        {
          var Ee = le.ReactDebugCurrentFrame, Qe = Ee.getStackAddendum();
          Qe !== "" && (Y += "%s", he = he.concat([Qe]));
          var zt = he.map(function(tt) {
            return String(tt);
          });
          zt.unshift("Warning: " + Y), Function.prototype.apply.call(console[k], console, zt);
        }
      }
      var ue = {};
      function ye(k, Y) {
        {
          var he = k.constructor, Ee = he && (he.displayName || he.name) || "ReactClass", Qe = Ee + "." + Y;
          if (ue[Qe])
            return;
          oe("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", Y, Ee), ue[Qe] = !0;
        }
      }
      var P = {
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
        enqueueForceUpdate: function(k, Y, he) {
          ye(k, "forceUpdate");
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
        enqueueReplaceState: function(k, Y, he, Ee) {
          ye(k, "replaceState");
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
        enqueueSetState: function(k, Y, he, Ee) {
          ye(k, "setState");
        }
      }, Z = Object.assign, Ce = {};
      Object.freeze(Ce);
      function be(k, Y, he) {
        this.props = k, this.context = Y, this.refs = Ce, this.updater = he || P;
      }
      be.prototype.isReactComponent = {}, be.prototype.setState = function(k, Y) {
        if (typeof k != "object" && typeof k != "function" && k != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, k, Y, "setState");
      }, be.prototype.forceUpdate = function(k) {
        this.updater.enqueueForceUpdate(this, k, "forceUpdate");
      };
      {
        var $e = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, _e = function(k, Y) {
          Object.defineProperty(be.prototype, k, {
            get: function() {
              de("%s(...) is deprecated in plain JavaScript React classes. %s", Y[0], Y[1]);
            }
          });
        };
        for (var He in $e)
          $e.hasOwnProperty(He) && _e(He, $e[He]);
      }
      function Ge() {
      }
      Ge.prototype = be.prototype;
      function Ye(k, Y, he) {
        this.props = k, this.context = Y, this.refs = Ce, this.updater = he || P;
      }
      var Xe = Ye.prototype = new Ge();
      Xe.constructor = Ye, Z(Xe, be.prototype), Xe.isPureReactComponent = !0;
      function nt() {
        var k = {
          current: null
        };
        return Object.seal(k), k;
      }
      var Oe = Array.isArray;
      function Ke(k) {
        return Oe(k);
      }
      function Re(k) {
        {
          var Y = typeof Symbol == "function" && Symbol.toStringTag, he = Y && k[Symbol.toStringTag] || k.constructor.name || "Object";
          return he;
        }
      }
      function rt(k) {
        try {
          return ot(k), !1;
        } catch {
          return !0;
        }
      }
      function ot(k) {
        return "" + k;
      }
      function ze(k) {
        if (rt(k))
          return oe("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Re(k)), ot(k);
      }
      function yt(k, Y, he) {
        var Ee = k.displayName;
        if (Ee)
          return Ee;
        var Qe = Y.displayName || Y.name || "";
        return Qe !== "" ? he + "(" + Qe + ")" : he;
      }
      function Ft(k) {
        return k.displayName || "Context";
      }
      function St(k) {
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
          case S:
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
            case x:
              var Y = k;
              return Ft(Y) + ".Consumer";
            case g:
              var he = k;
              return Ft(he._context) + ".Provider";
            case C:
              return yt(k, k.render, "ForwardRef");
            case D:
              var Ee = k.displayName || null;
              return Ee !== null ? Ee : St(k.type) || "Memo";
            case _: {
              var Qe = k, zt = Qe._payload, tt = Qe._init;
              try {
                return St(tt(zt));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Me = Object.prototype.hasOwnProperty, at = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Rt, Ae, Be;
      Be = {};
      function Pe(k) {
        if (Me.call(k, "ref")) {
          var Y = Object.getOwnPropertyDescriptor(k, "ref").get;
          if (Y && Y.isReactWarning)
            return !1;
        }
        return k.ref !== void 0;
      }
      function ut(k) {
        if (Me.call(k, "key")) {
          var Y = Object.getOwnPropertyDescriptor(k, "key").get;
          if (Y && Y.isReactWarning)
            return !1;
        }
        return k.key !== void 0;
      }
      function bt(k, Y) {
        var he = function() {
          Rt || (Rt = !0, oe("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Y));
        };
        he.isReactWarning = !0, Object.defineProperty(k, "key", {
          get: he,
          configurable: !0
        });
      }
      function Ze(k, Y) {
        var he = function() {
          Ae || (Ae = !0, oe("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Y));
        };
        he.isReactWarning = !0, Object.defineProperty(k, "ref", {
          get: he,
          configurable: !0
        });
      }
      function Se(k) {
        if (typeof k.ref == "string" && F.current && k.__self && F.current.stateNode !== k.__self) {
          var Y = St(F.current.type);
          Be[Y] || (oe('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Y, k.ref), Be[Y] = !0);
        }
      }
      var Fe = function(k, Y, he, Ee, Qe, zt, tt) {
        var Pt = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: f,
          // Built-in properties that belong on the element
          type: k,
          key: Y,
          ref: he,
          props: tt,
          // Record the component responsible for creating this element.
          _owner: zt
        };
        return Pt._store = {}, Object.defineProperty(Pt._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(Pt, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Ee
        }), Object.defineProperty(Pt, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Qe
        }), Object.freeze && (Object.freeze(Pt.props), Object.freeze(Pt)), Pt;
      };
      function ct(k, Y, he) {
        var Ee, Qe = {}, zt = null, tt = null, Pt = null, sn = null;
        if (Y != null) {
          Pe(Y) && (tt = Y.ref, Se(Y)), ut(Y) && (ze(Y.key), zt = "" + Y.key), Pt = Y.__self === void 0 ? null : Y.__self, sn = Y.__source === void 0 ? null : Y.__source;
          for (Ee in Y)
            Me.call(Y, Ee) && !at.hasOwnProperty(Ee) && (Qe[Ee] = Y[Ee]);
        }
        var En = arguments.length - 2;
        if (En === 1)
          Qe.children = he;
        else if (En > 1) {
          for (var Fn = Array(En), An = 0; An < En; An++)
            Fn[An] = arguments[An + 2];
          Object.freeze && Object.freeze(Fn), Qe.children = Fn;
        }
        if (k && k.defaultProps) {
          var rn = k.defaultProps;
          for (Ee in rn)
            Qe[Ee] === void 0 && (Qe[Ee] = rn[Ee]);
        }
        if (zt || tt) {
          var Ln = typeof k == "function" ? k.displayName || k.name || "Unknown" : k;
          zt && bt(Qe, Ln), tt && Ze(Qe, Ln);
        }
        return Fe(k, zt, tt, Pt, sn, F.current, Qe);
      }
      function Ve(k, Y) {
        var he = Fe(k.type, Y, k.ref, k._self, k._source, k._owner, k.props);
        return he;
      }
      function Ot(k, Y, he) {
        if (k == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + k + ".");
        var Ee, Qe = Z({}, k.props), zt = k.key, tt = k.ref, Pt = k._self, sn = k._source, En = k._owner;
        if (Y != null) {
          Pe(Y) && (tt = Y.ref, En = F.current), ut(Y) && (ze(Y.key), zt = "" + Y.key);
          var Fn;
          k.type && k.type.defaultProps && (Fn = k.type.defaultProps);
          for (Ee in Y)
            Me.call(Y, Ee) && !at.hasOwnProperty(Ee) && (Y[Ee] === void 0 && Fn !== void 0 ? Qe[Ee] = Fn[Ee] : Qe[Ee] = Y[Ee]);
        }
        var An = arguments.length - 2;
        if (An === 1)
          Qe.children = he;
        else if (An > 1) {
          for (var rn = Array(An), Ln = 0; Ln < An; Ln++)
            rn[Ln] = arguments[Ln + 2];
          Qe.children = rn;
        }
        return Fe(k.type, zt, tt, Pt, sn, En, Qe);
      }
      function Gt(k) {
        return typeof k == "object" && k !== null && k.$$typeof === f;
      }
      var Et = ".", dt = ":";
      function ke(k) {
        var Y = /[=:]/g, he = {
          "=": "=0",
          ":": "=2"
        }, Ee = k.replace(Y, function(Qe) {
          return he[Qe];
        });
        return "$" + Ee;
      }
      var ht = !1, Dt = /\/+/g;
      function Zt(k) {
        return k.replace(Dt, "$&/");
      }
      function nn(k, Y) {
        return typeof k == "object" && k !== null && k.key != null ? (ze(k.key), ke("" + k.key)) : Y.toString(36);
      }
      function yn(k, Y, he, Ee, Qe) {
        var zt = typeof k;
        (zt === "undefined" || zt === "boolean") && (k = null);
        var tt = !1;
        if (k === null)
          tt = !0;
        else
          switch (zt) {
            case "string":
            case "number":
              tt = !0;
              break;
            case "object":
              switch (k.$$typeof) {
                case f:
                case p:
                  tt = !0;
              }
          }
        if (tt) {
          var Pt = k, sn = Qe(Pt), En = Ee === "" ? Et + nn(Pt, 0) : Ee;
          if (Ke(sn)) {
            var Fn = "";
            En != null && (Fn = Zt(En) + "/"), yn(sn, Y, Fn, "", function(mp) {
              return mp;
            });
          } else sn != null && (Gt(sn) && (sn.key && (!Pt || Pt.key !== sn.key) && ze(sn.key), sn = Ve(
            sn,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            he + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (sn.key && (!Pt || Pt.key !== sn.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              Zt("" + sn.key) + "/"
            ) : "") + En
          )), Y.push(sn));
          return 1;
        }
        var An, rn, Ln = 0, Jn = Ee === "" ? Et : Ee + dt;
        if (Ke(k))
          for (var co = 0; co < k.length; co++)
            An = k[co], rn = Jn + nn(An, co), Ln += yn(An, Y, he, rn, Qe);
        else {
          var Gu = q(k);
          if (typeof Gu == "function") {
            var _l = k;
            Gu === _l.entries && (ht || de("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), ht = !0);
            for (var Qu = Gu.call(_l), Qo, hp = 0; !(Qo = Qu.next()).done; )
              An = Qo.value, rn = Jn + nn(An, hp++), Ln += yn(An, Y, he, rn, Qe);
          } else if (zt === "object") {
            var hf = String(k);
            throw new Error("Objects are not valid as a React child (found: " + (hf === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : hf) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Ln;
      }
      function Hn(k, Y, he) {
        if (k == null)
          return k;
        var Ee = [], Qe = 0;
        return yn(k, Ee, "", "", function(zt) {
          return Y.call(he, zt, Qe++);
        }), Ee;
      }
      function Bn(k) {
        var Y = 0;
        return Hn(k, function() {
          Y++;
        }), Y;
      }
      function Pr(k, Y, he) {
        Hn(k, function() {
          Y.apply(this, arguments);
        }, he);
      }
      function br(k) {
        return Hn(k, function(Y) {
          return Y;
        }) || [];
      }
      function vr(k) {
        if (!Gt(k))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return k;
      }
      function Ai(k) {
        var Y = {
          $$typeof: x,
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
        Y.Provider = {
          $$typeof: g,
          _context: Y
        };
        var he = !1, Ee = !1, Qe = !1;
        {
          var zt = {
            $$typeof: x,
            _context: Y
          };
          Object.defineProperties(zt, {
            Provider: {
              get: function() {
                return Ee || (Ee = !0, oe("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), Y.Provider;
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
                return he || (he = !0, oe("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), Y.Consumer;
              }
            },
            displayName: {
              get: function() {
                return Y.displayName;
              },
              set: function(tt) {
                Qe || (de("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", tt), Qe = !0);
              }
            }
          }), Y.Consumer = zt;
        }
        return Y._currentRenderer = null, Y._currentRenderer2 = null, Y;
      }
      var Tr = -1, Ar = 0, Vn = 1, Ma = 2;
      function oa(k) {
        if (k._status === Tr) {
          var Y = k._result, he = Y();
          if (he.then(function(zt) {
            if (k._status === Ar || k._status === Tr) {
              var tt = k;
              tt._status = Vn, tt._result = zt;
            }
          }, function(zt) {
            if (k._status === Ar || k._status === Tr) {
              var tt = k;
              tt._status = Ma, tt._result = zt;
            }
          }), k._status === Tr) {
            var Ee = k;
            Ee._status = Ar, Ee._result = he;
          }
        }
        if (k._status === Vn) {
          var Qe = k._result;
          return Qe === void 0 && oe(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, Qe), "default" in Qe || oe(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, Qe), Qe.default;
        } else
          throw k._result;
      }
      function Wa(k) {
        var Y = {
          // We use these fields to store the result.
          _status: Tr,
          _result: k
        }, he = {
          $$typeof: _,
          _payload: Y,
          _init: oa
        };
        {
          var Ee, Qe;
          Object.defineProperties(he, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return Ee;
              },
              set: function(zt) {
                oe("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Ee = zt, Object.defineProperty(he, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return Qe;
              },
              set: function(zt) {
                oe("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Qe = zt, Object.defineProperty(he, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return he;
      }
      function Lr(k) {
        k != null && k.$$typeof === D ? oe("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof k != "function" ? oe("forwardRef requires a render function but was given %s.", k === null ? "null" : typeof k) : k.length !== 0 && k.length !== 2 && oe("forwardRef render functions accept exactly two parameters: props and ref. %s", k.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), k != null && (k.defaultProps != null || k.propTypes != null) && oe("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var Y = {
          $$typeof: C,
          render: k
        };
        {
          var he;
          Object.defineProperty(Y, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return he;
            },
            set: function(Ee) {
              he = Ee, !k.name && !k.displayName && (k.displayName = Ee);
            }
          });
        }
        return Y;
      }
      var W;
      W = /* @__PURE__ */ Symbol.for("react.module.reference");
      function De(k) {
        return !!(typeof k == "string" || typeof k == "function" || k === m || k === S || K || k === v || k === b || k === R || G || k === A || j || ne || ae || typeof k == "object" && k !== null && (k.$$typeof === _ || k.$$typeof === D || k.$$typeof === g || k.$$typeof === x || k.$$typeof === C || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        k.$$typeof === W || k.getModuleId !== void 0));
      }
      function Je(k, Y) {
        De(k) || oe("memo: The first argument must be a component. Instead received: %s", k === null ? "null" : typeof k);
        var he = {
          $$typeof: D,
          type: k,
          compare: Y === void 0 ? null : Y
        };
        {
          var Ee;
          Object.defineProperty(he, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return Ee;
            },
            set: function(Qe) {
              Ee = Qe, !k.name && !k.displayName && (k.displayName = Qe);
            }
          });
        }
        return he;
      }
      function ft() {
        var k = H.current;
        return k === null && oe(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), k;
      }
      function qt(k) {
        var Y = ft();
        if (k._context !== void 0) {
          var he = k._context;
          he.Consumer === k ? oe("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : he.Provider === k && oe("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return Y.useContext(k);
      }
      function Vt(k) {
        var Y = ft();
        return Y.useState(k);
      }
      function tn(k, Y, he) {
        var Ee = ft();
        return Ee.useReducer(k, Y, he);
      }
      function Jt(k) {
        var Y = ft();
        return Y.useRef(k);
      }
      function Gn(k, Y) {
        var he = ft();
        return he.useEffect(k, Y);
      }
      function gn(k, Y) {
        var he = ft();
        return he.useInsertionEffect(k, Y);
      }
      function xn(k, Y) {
        var he = ft();
        return he.useLayoutEffect(k, Y);
      }
      function In(k, Y) {
        var he = ft();
        return he.useCallback(k, Y);
      }
      function _a(k, Y) {
        var he = ft();
        return he.useMemo(k, Y);
      }
      function sa(k, Y, he) {
        var Ee = ft();
        return Ee.useImperativeHandle(k, Y, he);
      }
      function Yt(k, Y) {
        {
          var he = ft();
          return he.useDebugValue(k, Y);
        }
      }
      function Qt() {
        var k = ft();
        return k.useTransition();
      }
      function ua(k) {
        var Y = ft();
        return Y.useDeferredValue(k);
      }
      function Li() {
        var k = ft();
        return k.useId();
      }
      function zi(k, Y, he) {
        var Ee = ft();
        return Ee.useSyncExternalStore(k, Y, he);
      }
      var Ni = 0, Xi, ii, Qn, Yo, $r, Fs, io;
      function on() {
      }
      on.__reactDisabledLog = !0;
      function Ut() {
        {
          if (Ni === 0) {
            Xi = console.log, ii = console.info, Qn = console.warn, Yo = console.error, $r = console.group, Fs = console.groupCollapsed, io = console.groupEnd;
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
          Ni++;
        }
      }
      function an() {
        {
          if (Ni--, Ni === 0) {
            var k = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: Z({}, k, {
                value: Xi
              }),
              info: Z({}, k, {
                value: ii
              }),
              warn: Z({}, k, {
                value: Qn
              }),
              error: Z({}, k, {
                value: Yo
              }),
              group: Z({}, k, {
                value: $r
              }),
              groupCollapsed: Z({}, k, {
                value: Fs
              }),
              groupEnd: Z({}, k, {
                value: io
              })
            });
          }
          Ni < 0 && oe("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var un = le.ReactCurrentDispatcher, Zn;
      function ca(k, Y, he) {
        {
          if (Zn === void 0)
            try {
              throw Error();
            } catch (Qe) {
              var Ee = Qe.stack.trim().match(/\n( *(at )?)/);
              Zn = Ee && Ee[1] || "";
            }
          return `
` + Zn + k;
        }
      }
      var Rr = !1, lo;
      {
        var Ps = typeof WeakMap == "function" ? WeakMap : Map;
        lo = new Ps();
      }
      function $s(k, Y) {
        if (!k || Rr)
          return "";
        {
          var he = lo.get(k);
          if (he !== void 0)
            return he;
        }
        var Ee;
        Rr = !0;
        var Qe = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var zt;
        zt = un.current, un.current = null, Ut();
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
                Ee = Jn;
              }
              Reflect.construct(k, [], tt);
            } else {
              try {
                tt.call();
              } catch (Jn) {
                Ee = Jn;
              }
              k.call(tt.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Jn) {
              Ee = Jn;
            }
            k();
          }
        } catch (Jn) {
          if (Jn && Ee && typeof Jn.stack == "string") {
            for (var Pt = Jn.stack.split(`
`), sn = Ee.stack.split(`
`), En = Pt.length - 1, Fn = sn.length - 1; En >= 1 && Fn >= 0 && Pt[En] !== sn[Fn]; )
              Fn--;
            for (; En >= 1 && Fn >= 0; En--, Fn--)
              if (Pt[En] !== sn[Fn]) {
                if (En !== 1 || Fn !== 1)
                  do
                    if (En--, Fn--, Fn < 0 || Pt[En] !== sn[Fn]) {
                      var An = `
` + Pt[En].replace(" at new ", " at ");
                      return k.displayName && An.includes("<anonymous>") && (An = An.replace("<anonymous>", k.displayName)), typeof k == "function" && lo.set(k, An), An;
                    }
                  while (En >= 1 && Fn >= 0);
                break;
              }
          }
        } finally {
          Rr = !1, un.current = zt, an(), Error.prepareStackTrace = Qe;
        }
        var rn = k ? k.displayName || k.name : "", Ln = rn ? ca(rn) : "";
        return typeof k == "function" && lo.set(k, Ln), Ln;
      }
      function Rl(k, Y, he) {
        return $s(k, !1);
      }
      function pp(k) {
        var Y = k.prototype;
        return !!(Y && Y.isReactComponent);
      }
      function Ml(k, Y, he) {
        if (k == null)
          return "";
        if (typeof k == "function")
          return $s(k, pp(k));
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
              return Rl(k.render);
            case D:
              return Ml(k.type, Y, he);
            case _: {
              var Ee = k, Qe = Ee._payload, zt = Ee._init;
              try {
                return Ml(zt(Qe), Y, he);
              } catch {
              }
            }
          }
        return "";
      }
      var Cn = {}, Hs = le.ReactDebugCurrentFrame;
      function Sn(k) {
        if (k) {
          var Y = k._owner, he = Ml(k.type, k._source, Y ? Y.type : null);
          Hs.setExtraStackFrame(he);
        } else
          Hs.setExtraStackFrame(null);
      }
      function Yu(k, Y, he, Ee, Qe) {
        {
          var zt = Function.call.bind(Me);
          for (var tt in k)
            if (zt(k, tt)) {
              var Pt = void 0;
              try {
                if (typeof k[tt] != "function") {
                  var sn = Error((Ee || "React class") + ": " + he + " type `" + tt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof k[tt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw sn.name = "Invariant Violation", sn;
                }
                Pt = k[tt](Y, tt, Ee, he, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (En) {
                Pt = En;
              }
              Pt && !(Pt instanceof Error) && (Sn(Qe), oe("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ee || "React class", he, tt, typeof Pt), Sn(null)), Pt instanceof Error && !(Pt.message in Cn) && (Cn[Pt.message] = !0, Sn(Qe), oe("Failed %s type: %s", he, Pt.message), Sn(null));
            }
        }
      }
      function Ki(k) {
        if (k) {
          var Y = k._owner, he = Ml(k.type, k._source, Y ? Y.type : null);
          X(he);
        } else
          X(null);
      }
      var Bt;
      Bt = !1;
      function Vs() {
        if (F.current) {
          var k = St(F.current.type);
          if (k)
            return `

Check the render method of \`` + k + "`.";
        }
        return "";
      }
      function Hr(k) {
        if (k !== void 0) {
          var Y = k.fileName.replace(/^.*[\\\/]/, ""), he = k.lineNumber;
          return `

Check your code at ` + Y + ":" + he + ".";
        }
        return "";
      }
      function Zi(k) {
        return k != null ? Hr(k.__source) : "";
      }
      var fa = {};
      function Ji(k) {
        var Y = Vs();
        if (!Y) {
          var he = typeof k == "string" ? k : k.displayName || k.name;
          he && (Y = `

Check the top-level render call using <` + he + ">.");
        }
        return Y;
      }
      function qn(k, Y) {
        if (!(!k._store || k._store.validated || k.key != null)) {
          k._store.validated = !0;
          var he = Ji(Y);
          if (!fa[he]) {
            fa[he] = !0;
            var Ee = "";
            k && k._owner && k._owner !== F.current && (Ee = " It was passed a child from " + St(k._owner.type) + "."), Ki(k), oe('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', he, Ee), Ki(null);
          }
        }
      }
      function On(k, Y) {
        if (typeof k == "object") {
          if (Ke(k))
            for (var he = 0; he < k.length; he++) {
              var Ee = k[he];
              Gt(Ee) && qn(Ee, Y);
            }
          else if (Gt(k))
            k._store && (k._store.validated = !0);
          else if (k) {
            var Qe = q(k);
            if (typeof Qe == "function" && Qe !== k.entries)
              for (var zt = Qe.call(k), tt; !(tt = zt.next()).done; )
                Gt(tt.value) && qn(tt.value, Y);
          }
        }
      }
      function oo(k) {
        {
          var Y = k.type;
          if (Y == null || typeof Y == "string")
            return;
          var he;
          if (typeof Y == "function")
            he = Y.propTypes;
          else if (typeof Y == "object" && (Y.$$typeof === C || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          Y.$$typeof === D))
            he = Y.propTypes;
          else
            return;
          if (he) {
            var Ee = St(Y);
            Yu(he, k.props, "prop", Ee, k);
          } else if (Y.PropTypes !== void 0 && !Bt) {
            Bt = !0;
            var Qe = St(Y);
            oe("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Qe || "Unknown");
          }
          typeof Y.getDefaultProps == "function" && !Y.getDefaultProps.isReactClassApproved && oe("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Mr(k) {
        {
          for (var Y = Object.keys(k.props), he = 0; he < Y.length; he++) {
            var Ee = Y[he];
            if (Ee !== "children" && Ee !== "key") {
              Ki(k), oe("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ee), Ki(null);
              break;
            }
          }
          k.ref !== null && (Ki(k), oe("Invalid attribute `ref` supplied to `React.Fragment`."), Ki(null));
        }
      }
      function da(k, Y, he) {
        var Ee = De(k);
        if (!Ee) {
          var Qe = "";
          (k === void 0 || typeof k == "object" && k !== null && Object.keys(k).length === 0) && (Qe += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var zt = Zi(Y);
          zt ? Qe += zt : Qe += Vs();
          var tt;
          k === null ? tt = "null" : Ke(k) ? tt = "array" : k !== void 0 && k.$$typeof === f ? (tt = "<" + (St(k.type) || "Unknown") + " />", Qe = " Did you accidentally export a JSX literal instead of a component?") : tt = typeof k, oe("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", tt, Qe);
        }
        var Pt = ct.apply(this, arguments);
        if (Pt == null)
          return Pt;
        if (Ee)
          for (var sn = 2; sn < arguments.length; sn++)
            On(arguments[sn], k);
        return k === m ? Mr(Pt) : oo(Pt), Pt;
      }
      var li = !1;
      function Wo(k) {
        var Y = da.bind(null, k);
        return Y.type = k, li || (li = !0, de("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(Y, "type", {
          enumerable: !1,
          get: function() {
            return de("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: k
            }), k;
          }
        }), Y;
      }
      function Wu(k, Y, he) {
        for (var Ee = Ot.apply(this, arguments), Qe = 2; Qe < arguments.length; Qe++)
          On(arguments[Qe], Ee.type);
        return oo(Ee), Ee;
      }
      function Bu(k, Y) {
        var he = $.transition;
        $.transition = {};
        var Ee = $.transition;
        $.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          k();
        } finally {
          if ($.transition = he, he === null && Ee._updatedFibers) {
            var Qe = Ee._updatedFibers.size;
            Qe > 10 && de("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), Ee._updatedFibers.clear();
          }
        }
      }
      var so = !1, Bo = null;
      function vp(k) {
        if (Bo === null)
          try {
            var Y = ("require" + Math.random()).slice(0, 7), he = t && t[Y];
            Bo = he.call(t, "timers").setImmediate;
          } catch {
            Bo = function(Qe) {
              so === !1 && (so = !0, typeof MessageChannel > "u" && oe("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var zt = new MessageChannel();
              zt.port1.onmessage = Qe, zt.port2.postMessage(void 0);
            };
          }
        return Bo(k);
      }
      var oi = 0, Ui = !1;
      function el(k) {
        {
          var Y = oi;
          oi++, V.current === null && (V.current = []);
          var he = V.isBatchingLegacy, Ee;
          try {
            if (V.isBatchingLegacy = !0, Ee = k(), !he && V.didScheduleLegacyUpdate) {
              var Qe = V.current;
              Qe !== null && (V.didScheduleLegacyUpdate = !1, uo(Qe));
            }
          } catch (rn) {
            throw si(Y), rn;
          } finally {
            V.isBatchingLegacy = he;
          }
          if (Ee !== null && typeof Ee == "object" && typeof Ee.then == "function") {
            var zt = Ee, tt = !1, Pt = {
              then: function(rn, Ln) {
                tt = !0, zt.then(function(Jn) {
                  si(Y), oi === 0 ? Is(Jn, rn, Ln) : rn(Jn);
                }, function(Jn) {
                  si(Y), Ln(Jn);
                });
              }
            };
            return !Ui && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              tt || (Ui = !0, oe("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), Pt;
          } else {
            var sn = Ee;
            if (si(Y), oi === 0) {
              var En = V.current;
              En !== null && (uo(En), V.current = null);
              var Fn = {
                then: function(rn, Ln) {
                  V.current === null ? (V.current = [], Is(sn, rn, Ln)) : rn(sn);
                }
              };
              return Fn;
            } else {
              var An = {
                then: function(rn, Ln) {
                  rn(sn);
                }
              };
              return An;
            }
          }
        }
      }
      function si(k) {
        k !== oi - 1 && oe("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), oi = k;
      }
      function Is(k, Y, he) {
        {
          var Ee = V.current;
          if (Ee !== null)
            try {
              uo(Ee), vp(function() {
                Ee.length === 0 ? (V.current = null, Y(k)) : Is(k, Y, he);
              });
            } catch (Qe) {
              he(Qe);
            }
          else
            Y(k);
        }
      }
      var qs = !1;
      function uo(k) {
        if (!qs) {
          qs = !0;
          var Y = 0;
          try {
            for (; Y < k.length; Y++) {
              var he = k[Y];
              do
                he = he(!0);
              while (he !== null);
            }
            k.length = 0;
          } catch (Ee) {
            throw k = k.slice(Y + 1), Ee;
          } finally {
            qs = !1;
          }
        }
      }
      var Go = da, Ys = Wu, Ws = Wo, ji = {
        map: Hn,
        forEach: Pr,
        count: Bn,
        toArray: br,
        only: vr
      };
      a.Children = ji, a.Component = be, a.Fragment = m, a.Profiler = S, a.PureComponent = Ye, a.StrictMode = v, a.Suspense = b, a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = le, a.act = el, a.cloneElement = Ys, a.createContext = Ai, a.createElement = Go, a.createFactory = Ws, a.createRef = nt, a.forwardRef = Lr, a.isValidElement = Gt, a.lazy = Wa, a.memo = Je, a.startTransition = Bu, a.unstable_act = el, a.useCallback = In, a.useContext = qt, a.useDebugValue = Yt, a.useDeferredValue = ua, a.useEffect = Gn, a.useId = Li, a.useImperativeHandle = sa, a.useInsertionEffect = gn, a.useLayoutEffect = xn, a.useMemo = _a, a.useReducer = tn, a.useRef = Jt, a.useState = Vt, a.useSyncExternalStore = zi, a.useTransition = Qt, a.version = s, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(Dh, Dh.exports)), Dh.exports;
}
var _C;
function Vh() {
  return _C || (_C = 1, process.env.NODE_ENV === "production" ? H0.exports = cN() : H0.exports = fN()), H0.exports;
}
var DC;
function dN() {
  if (DC) return bh;
  DC = 1;
  var t = Vh(), a = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.fragment"), f = Object.prototype.hasOwnProperty, p = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function v(S, g, x) {
    var C, b = {}, R = null, D = null;
    x !== void 0 && (R = "" + x), g.key !== void 0 && (R = "" + g.key), g.ref !== void 0 && (D = g.ref);
    for (C in g) f.call(g, C) && !m.hasOwnProperty(C) && (b[C] = g[C]);
    if (S && S.defaultProps) for (C in g = S.defaultProps, g) b[C] === void 0 && (b[C] = g[C]);
    return { $$typeof: a, type: S, key: R, ref: D, props: b, _owner: p.current };
  }
  return bh.Fragment = s, bh.jsx = v, bh.jsxs = v, bh;
}
var Th = {};
var kC;
function pN() {
  return kC || (kC = 1, process.env.NODE_ENV !== "production" && (function() {
    var t = Vh(), a = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.portal"), f = /* @__PURE__ */ Symbol.for("react.fragment"), p = /* @__PURE__ */ Symbol.for("react.strict_mode"), m = /* @__PURE__ */ Symbol.for("react.profiler"), v = /* @__PURE__ */ Symbol.for("react.provider"), S = /* @__PURE__ */ Symbol.for("react.context"), g = /* @__PURE__ */ Symbol.for("react.forward_ref"), x = /* @__PURE__ */ Symbol.for("react.suspense"), C = /* @__PURE__ */ Symbol.for("react.suspense_list"), b = /* @__PURE__ */ Symbol.for("react.memo"), R = /* @__PURE__ */ Symbol.for("react.lazy"), D = /* @__PURE__ */ Symbol.for("react.offscreen"), _ = Symbol.iterator, A = "@@iterator";
    function L(W) {
      if (W === null || typeof W != "object")
        return null;
      var De = _ && W[_] || W[A];
      return typeof De == "function" ? De : null;
    }
    var U = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function q(W) {
      {
        for (var De = arguments.length, Je = new Array(De > 1 ? De - 1 : 0), ft = 1; ft < De; ft++)
          Je[ft - 1] = arguments[ft];
        H("error", W, Je);
      }
    }
    function H(W, De, Je) {
      {
        var ft = U.ReactDebugCurrentFrame, qt = ft.getStackAddendum();
        qt !== "" && (De += "%s", Je = Je.concat([qt]));
        var Vt = Je.map(function(tn) {
          return String(tn);
        });
        Vt.unshift("Warning: " + De), Function.prototype.apply.call(console[W], console, Vt);
      }
    }
    var $ = !1, V = !1, F = !1, B = !1, ie = !1, X;
    X = /* @__PURE__ */ Symbol.for("react.module.reference");
    function j(W) {
      return !!(typeof W == "string" || typeof W == "function" || W === f || W === m || ie || W === p || W === x || W === C || B || W === D || $ || V || F || typeof W == "object" && W !== null && (W.$$typeof === R || W.$$typeof === b || W.$$typeof === v || W.$$typeof === S || W.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      W.$$typeof === X || W.getModuleId !== void 0));
    }
    function ne(W, De, Je) {
      var ft = W.displayName;
      if (ft)
        return ft;
      var qt = De.displayName || De.name || "";
      return qt !== "" ? Je + "(" + qt + ")" : Je;
    }
    function ae(W) {
      return W.displayName || "Context";
    }
    function G(W) {
      if (W == null)
        return null;
      if (typeof W.tag == "number" && q("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof W == "function")
        return W.displayName || W.name || null;
      if (typeof W == "string")
        return W;
      switch (W) {
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
        case C:
          return "SuspenseList";
      }
      if (typeof W == "object")
        switch (W.$$typeof) {
          case S:
            var De = W;
            return ae(De) + ".Consumer";
          case v:
            var Je = W;
            return ae(Je._context) + ".Provider";
          case g:
            return ne(W, W.render, "ForwardRef");
          case b:
            var ft = W.displayName || null;
            return ft !== null ? ft : G(W.type) || "Memo";
          case R: {
            var qt = W, Vt = qt._payload, tn = qt._init;
            try {
              return G(tn(Vt));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var K = Object.assign, le = 0, de, oe, re, ue, ye, P, Z;
    function Ce() {
    }
    Ce.__reactDisabledLog = !0;
    function be() {
      {
        if (le === 0) {
          de = console.log, oe = console.info, re = console.warn, ue = console.error, ye = console.group, P = console.groupCollapsed, Z = console.groupEnd;
          var W = {
            configurable: !0,
            enumerable: !0,
            value: Ce,
            writable: !0
          };
          Object.defineProperties(console, {
            info: W,
            log: W,
            warn: W,
            error: W,
            group: W,
            groupCollapsed: W,
            groupEnd: W
          });
        }
        le++;
      }
    }
    function $e() {
      {
        if (le--, le === 0) {
          var W = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: K({}, W, {
              value: de
            }),
            info: K({}, W, {
              value: oe
            }),
            warn: K({}, W, {
              value: re
            }),
            error: K({}, W, {
              value: ue
            }),
            group: K({}, W, {
              value: ye
            }),
            groupCollapsed: K({}, W, {
              value: P
            }),
            groupEnd: K({}, W, {
              value: Z
            })
          });
        }
        le < 0 && q("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var _e = U.ReactCurrentDispatcher, He;
    function Ge(W, De, Je) {
      {
        if (He === void 0)
          try {
            throw Error();
          } catch (qt) {
            var ft = qt.stack.trim().match(/\n( *(at )?)/);
            He = ft && ft[1] || "";
          }
        return `
` + He + W;
      }
    }
    var Ye = !1, Xe;
    {
      var nt = typeof WeakMap == "function" ? WeakMap : Map;
      Xe = new nt();
    }
    function Oe(W, De) {
      if (!W || Ye)
        return "";
      {
        var Je = Xe.get(W);
        if (Je !== void 0)
          return Je;
      }
      var ft;
      Ye = !0;
      var qt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Vt;
      Vt = _e.current, _e.current = null, be();
      try {
        if (De) {
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
            } catch (Yt) {
              ft = Yt;
            }
            Reflect.construct(W, [], tn);
          } else {
            try {
              tn.call();
            } catch (Yt) {
              ft = Yt;
            }
            W.call(tn.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Yt) {
            ft = Yt;
          }
          W();
        }
      } catch (Yt) {
        if (Yt && ft && typeof Yt.stack == "string") {
          for (var Jt = Yt.stack.split(`
`), Gn = ft.stack.split(`
`), gn = Jt.length - 1, xn = Gn.length - 1; gn >= 1 && xn >= 0 && Jt[gn] !== Gn[xn]; )
            xn--;
          for (; gn >= 1 && xn >= 0; gn--, xn--)
            if (Jt[gn] !== Gn[xn]) {
              if (gn !== 1 || xn !== 1)
                do
                  if (gn--, xn--, xn < 0 || Jt[gn] !== Gn[xn]) {
                    var In = `
` + Jt[gn].replace(" at new ", " at ");
                    return W.displayName && In.includes("<anonymous>") && (In = In.replace("<anonymous>", W.displayName)), typeof W == "function" && Xe.set(W, In), In;
                  }
                while (gn >= 1 && xn >= 0);
              break;
            }
        }
      } finally {
        Ye = !1, _e.current = Vt, $e(), Error.prepareStackTrace = qt;
      }
      var _a = W ? W.displayName || W.name : "", sa = _a ? Ge(_a) : "";
      return typeof W == "function" && Xe.set(W, sa), sa;
    }
    function Ke(W, De, Je) {
      return Oe(W, !1);
    }
    function Re(W) {
      var De = W.prototype;
      return !!(De && De.isReactComponent);
    }
    function rt(W, De, Je) {
      if (W == null)
        return "";
      if (typeof W == "function")
        return Oe(W, Re(W));
      if (typeof W == "string")
        return Ge(W);
      switch (W) {
        case x:
          return Ge("Suspense");
        case C:
          return Ge("SuspenseList");
      }
      if (typeof W == "object")
        switch (W.$$typeof) {
          case g:
            return Ke(W.render);
          case b:
            return rt(W.type, De, Je);
          case R: {
            var ft = W, qt = ft._payload, Vt = ft._init;
            try {
              return rt(Vt(qt), De, Je);
            } catch {
            }
          }
        }
      return "";
    }
    var ot = Object.prototype.hasOwnProperty, ze = {}, yt = U.ReactDebugCurrentFrame;
    function Ft(W) {
      if (W) {
        var De = W._owner, Je = rt(W.type, W._source, De ? De.type : null);
        yt.setExtraStackFrame(Je);
      } else
        yt.setExtraStackFrame(null);
    }
    function St(W, De, Je, ft, qt) {
      {
        var Vt = Function.call.bind(ot);
        for (var tn in W)
          if (Vt(W, tn)) {
            var Jt = void 0;
            try {
              if (typeof W[tn] != "function") {
                var Gn = Error((ft || "React class") + ": " + Je + " type `" + tn + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof W[tn] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Gn.name = "Invariant Violation", Gn;
              }
              Jt = W[tn](De, tn, ft, Je, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (gn) {
              Jt = gn;
            }
            Jt && !(Jt instanceof Error) && (Ft(qt), q("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ft || "React class", Je, tn, typeof Jt), Ft(null)), Jt instanceof Error && !(Jt.message in ze) && (ze[Jt.message] = !0, Ft(qt), q("Failed %s type: %s", Je, Jt.message), Ft(null));
          }
      }
    }
    var Me = Array.isArray;
    function at(W) {
      return Me(W);
    }
    function Rt(W) {
      {
        var De = typeof Symbol == "function" && Symbol.toStringTag, Je = De && W[Symbol.toStringTag] || W.constructor.name || "Object";
        return Je;
      }
    }
    function Ae(W) {
      try {
        return Be(W), !1;
      } catch {
        return !0;
      }
    }
    function Be(W) {
      return "" + W;
    }
    function Pe(W) {
      if (Ae(W))
        return q("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rt(W)), Be(W);
    }
    var ut = U.ReactCurrentOwner, bt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ze, Se;
    function Fe(W) {
      if (ot.call(W, "ref")) {
        var De = Object.getOwnPropertyDescriptor(W, "ref").get;
        if (De && De.isReactWarning)
          return !1;
      }
      return W.ref !== void 0;
    }
    function ct(W) {
      if (ot.call(W, "key")) {
        var De = Object.getOwnPropertyDescriptor(W, "key").get;
        if (De && De.isReactWarning)
          return !1;
      }
      return W.key !== void 0;
    }
    function Ve(W, De) {
      typeof W.ref == "string" && ut.current;
    }
    function Ot(W, De) {
      {
        var Je = function() {
          Ze || (Ze = !0, q("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", De));
        };
        Je.isReactWarning = !0, Object.defineProperty(W, "key", {
          get: Je,
          configurable: !0
        });
      }
    }
    function Gt(W, De) {
      {
        var Je = function() {
          Se || (Se = !0, q("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", De));
        };
        Je.isReactWarning = !0, Object.defineProperty(W, "ref", {
          get: Je,
          configurable: !0
        });
      }
    }
    var Et = function(W, De, Je, ft, qt, Vt, tn) {
      var Jt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: W,
        key: De,
        ref: Je,
        props: tn,
        // Record the component responsible for creating this element.
        _owner: Vt
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
        value: ft
      }), Object.defineProperty(Jt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: qt
      }), Object.freeze && (Object.freeze(Jt.props), Object.freeze(Jt)), Jt;
    };
    function dt(W, De, Je, ft, qt) {
      {
        var Vt, tn = {}, Jt = null, Gn = null;
        Je !== void 0 && (Pe(Je), Jt = "" + Je), ct(De) && (Pe(De.key), Jt = "" + De.key), Fe(De) && (Gn = De.ref, Ve(De, qt));
        for (Vt in De)
          ot.call(De, Vt) && !bt.hasOwnProperty(Vt) && (tn[Vt] = De[Vt]);
        if (W && W.defaultProps) {
          var gn = W.defaultProps;
          for (Vt in gn)
            tn[Vt] === void 0 && (tn[Vt] = gn[Vt]);
        }
        if (Jt || Gn) {
          var xn = typeof W == "function" ? W.displayName || W.name || "Unknown" : W;
          Jt && Ot(tn, xn), Gn && Gt(tn, xn);
        }
        return Et(W, Jt, Gn, qt, ft, ut.current, tn);
      }
    }
    var ke = U.ReactCurrentOwner, ht = U.ReactDebugCurrentFrame;
    function Dt(W) {
      if (W) {
        var De = W._owner, Je = rt(W.type, W._source, De ? De.type : null);
        ht.setExtraStackFrame(Je);
      } else
        ht.setExtraStackFrame(null);
    }
    var Zt;
    Zt = !1;
    function nn(W) {
      return typeof W == "object" && W !== null && W.$$typeof === a;
    }
    function yn() {
      {
        if (ke.current) {
          var W = G(ke.current.type);
          if (W)
            return `

Check the render method of \`` + W + "`.";
        }
        return "";
      }
    }
    function Hn(W) {
      return "";
    }
    var Bn = {};
    function Pr(W) {
      {
        var De = yn();
        if (!De) {
          var Je = typeof W == "string" ? W : W.displayName || W.name;
          Je && (De = `

Check the top-level render call using <` + Je + ">.");
        }
        return De;
      }
    }
    function br(W, De) {
      {
        if (!W._store || W._store.validated || W.key != null)
          return;
        W._store.validated = !0;
        var Je = Pr(De);
        if (Bn[Je])
          return;
        Bn[Je] = !0;
        var ft = "";
        W && W._owner && W._owner !== ke.current && (ft = " It was passed a child from " + G(W._owner.type) + "."), Dt(W), q('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Je, ft), Dt(null);
      }
    }
    function vr(W, De) {
      {
        if (typeof W != "object")
          return;
        if (at(W))
          for (var Je = 0; Je < W.length; Je++) {
            var ft = W[Je];
            nn(ft) && br(ft, De);
          }
        else if (nn(W))
          W._store && (W._store.validated = !0);
        else if (W) {
          var qt = L(W);
          if (typeof qt == "function" && qt !== W.entries)
            for (var Vt = qt.call(W), tn; !(tn = Vt.next()).done; )
              nn(tn.value) && br(tn.value, De);
        }
      }
    }
    function Ai(W) {
      {
        var De = W.type;
        if (De == null || typeof De == "string")
          return;
        var Je;
        if (typeof De == "function")
          Je = De.propTypes;
        else if (typeof De == "object" && (De.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        De.$$typeof === b))
          Je = De.propTypes;
        else
          return;
        if (Je) {
          var ft = G(De);
          St(Je, W.props, "prop", ft, W);
        } else if (De.PropTypes !== void 0 && !Zt) {
          Zt = !0;
          var qt = G(De);
          q("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", qt || "Unknown");
        }
        typeof De.getDefaultProps == "function" && !De.getDefaultProps.isReactClassApproved && q("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Tr(W) {
      {
        for (var De = Object.keys(W.props), Je = 0; Je < De.length; Je++) {
          var ft = De[Je];
          if (ft !== "children" && ft !== "key") {
            Dt(W), q("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ft), Dt(null);
            break;
          }
        }
        W.ref !== null && (Dt(W), q("Invalid attribute `ref` supplied to `React.Fragment`."), Dt(null));
      }
    }
    var Ar = {};
    function Vn(W, De, Je, ft, qt, Vt) {
      {
        var tn = j(W);
        if (!tn) {
          var Jt = "";
          (W === void 0 || typeof W == "object" && W !== null && Object.keys(W).length === 0) && (Jt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Gn = Hn();
          Gn ? Jt += Gn : Jt += yn();
          var gn;
          W === null ? gn = "null" : at(W) ? gn = "array" : W !== void 0 && W.$$typeof === a ? (gn = "<" + (G(W.type) || "Unknown") + " />", Jt = " Did you accidentally export a JSX literal instead of a component?") : gn = typeof W, q("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", gn, Jt);
        }
        var xn = dt(W, De, Je, qt, Vt);
        if (xn == null)
          return xn;
        if (tn) {
          var In = De.children;
          if (In !== void 0)
            if (ft)
              if (at(In)) {
                for (var _a = 0; _a < In.length; _a++)
                  vr(In[_a], W);
                Object.freeze && Object.freeze(In);
              } else
                q("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              vr(In, W);
        }
        if (ot.call(De, "key")) {
          var sa = G(W), Yt = Object.keys(De).filter(function(Li) {
            return Li !== "key";
          }), Qt = Yt.length > 0 ? "{key: someKey, " + Yt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ar[sa + Qt]) {
            var ua = Yt.length > 0 ? "{" + Yt.join(": ..., ") + ": ...}" : "{}";
            q(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Qt, sa, ua, sa), Ar[sa + Qt] = !0;
          }
        }
        return W === f ? Tr(xn) : Ai(xn), xn;
      }
    }
    function Ma(W, De, Je) {
      return Vn(W, De, Je, !0);
    }
    function oa(W, De, Je) {
      return Vn(W, De, Je, !1);
    }
    var Wa = oa, Lr = Ma;
    Th.Fragment = f, Th.jsx = Wa, Th.jsxs = Lr;
  })()), Th;
}
var OC;
function vN() {
  return OC || (OC = 1, process.env.NODE_ENV === "production" ? $0.exports = dN() : $0.exports = pN()), $0.exports;
}
var We = vN(), ia = Vh(), ep = {}, V0 = { exports: {} }, bi = {}, I0 = { exports: {} }, q2 = {};
var AC;
function hN() {
  return AC || (AC = 1, (function(t) {
    function a(re, ue) {
      var ye = re.length;
      re.push(ue);
      e: for (; 0 < ye; ) {
        var P = ye - 1 >>> 1, Z = re[P];
        if (0 < p(Z, ue)) re[P] = ue, re[ye] = Z, ye = P;
        else break e;
      }
    }
    function s(re) {
      return re.length === 0 ? null : re[0];
    }
    function f(re) {
      if (re.length === 0) return null;
      var ue = re[0], ye = re.pop();
      if (ye !== ue) {
        re[0] = ye;
        e: for (var P = 0, Z = re.length, Ce = Z >>> 1; P < Ce; ) {
          var be = 2 * (P + 1) - 1, $e = re[be], _e = be + 1, He = re[_e];
          if (0 > p($e, ye)) _e < Z && 0 > p(He, $e) ? (re[P] = He, re[_e] = ye, P = _e) : (re[P] = $e, re[be] = ye, P = be);
          else if (_e < Z && 0 > p(He, ye)) re[P] = He, re[_e] = ye, P = _e;
          else break e;
        }
      }
      return ue;
    }
    function p(re, ue) {
      var ye = re.sortIndex - ue.sortIndex;
      return ye !== 0 ? ye : re.id - ue.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      t.unstable_now = function() {
        return m.now();
      };
    } else {
      var v = Date, S = v.now();
      t.unstable_now = function() {
        return v.now() - S;
      };
    }
    var g = [], x = [], C = 1, b = null, R = 3, D = !1, _ = !1, A = !1, L = typeof setTimeout == "function" ? setTimeout : null, U = typeof clearTimeout == "function" ? clearTimeout : null, q = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function H(re) {
      for (var ue = s(x); ue !== null; ) {
        if (ue.callback === null) f(x);
        else if (ue.startTime <= re) f(x), ue.sortIndex = ue.expirationTime, a(g, ue);
        else break;
        ue = s(x);
      }
    }
    function $(re) {
      if (A = !1, H(re), !_) if (s(g) !== null) _ = !0, de(V);
      else {
        var ue = s(x);
        ue !== null && oe($, ue.startTime - re);
      }
    }
    function V(re, ue) {
      _ = !1, A && (A = !1, U(ie), ie = -1), D = !0;
      var ye = R;
      try {
        for (H(ue), b = s(g); b !== null && (!(b.expirationTime > ue) || re && !ne()); ) {
          var P = b.callback;
          if (typeof P == "function") {
            b.callback = null, R = b.priorityLevel;
            var Z = P(b.expirationTime <= ue);
            ue = t.unstable_now(), typeof Z == "function" ? b.callback = Z : b === s(g) && f(g), H(ue);
          } else f(g);
          b = s(g);
        }
        if (b !== null) var Ce = !0;
        else {
          var be = s(x);
          be !== null && oe($, be.startTime - ue), Ce = !1;
        }
        return Ce;
      } finally {
        b = null, R = ye, D = !1;
      }
    }
    var F = !1, B = null, ie = -1, X = 5, j = -1;
    function ne() {
      return !(t.unstable_now() - j < X);
    }
    function ae() {
      if (B !== null) {
        var re = t.unstable_now();
        j = re;
        var ue = !0;
        try {
          ue = B(!0, re);
        } finally {
          ue ? G() : (F = !1, B = null);
        }
      } else F = !1;
    }
    var G;
    if (typeof q == "function") G = function() {
      q(ae);
    };
    else if (typeof MessageChannel < "u") {
      var K = new MessageChannel(), le = K.port2;
      K.port1.onmessage = ae, G = function() {
        le.postMessage(null);
      };
    } else G = function() {
      L(ae, 0);
    };
    function de(re) {
      B = re, F || (F = !0, G());
    }
    function oe(re, ue) {
      ie = L(function() {
        re(t.unstable_now());
      }, ue);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(re) {
      re.callback = null;
    }, t.unstable_continueExecution = function() {
      _ || D || (_ = !0, de(V));
    }, t.unstable_forceFrameRate = function(re) {
      0 > re || 125 < re ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : X = 0 < re ? Math.floor(1e3 / re) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return R;
    }, t.unstable_getFirstCallbackNode = function() {
      return s(g);
    }, t.unstable_next = function(re) {
      switch (R) {
        case 1:
        case 2:
        case 3:
          var ue = 3;
          break;
        default:
          ue = R;
      }
      var ye = R;
      R = ue;
      try {
        return re();
      } finally {
        R = ye;
      }
    }, t.unstable_pauseExecution = function() {
    }, t.unstable_requestPaint = function() {
    }, t.unstable_runWithPriority = function(re, ue) {
      switch (re) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          re = 3;
      }
      var ye = R;
      R = re;
      try {
        return ue();
      } finally {
        R = ye;
      }
    }, t.unstable_scheduleCallback = function(re, ue, ye) {
      var P = t.unstable_now();
      switch (typeof ye == "object" && ye !== null ? (ye = ye.delay, ye = typeof ye == "number" && 0 < ye ? P + ye : P) : ye = P, re) {
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
      return Z = ye + Z, re = { id: C++, callback: ue, priorityLevel: re, startTime: ye, expirationTime: Z, sortIndex: -1 }, ye > P ? (re.sortIndex = ye, a(x, re), s(g) === null && re === s(x) && (A ? (U(ie), ie = -1) : A = !0, oe($, ye - P))) : (re.sortIndex = Z, a(g, re), _ || D || (_ = !0, de(V))), re;
    }, t.unstable_shouldYield = ne, t.unstable_wrapCallback = function(re) {
      var ue = R;
      return function() {
        var ye = R;
        R = ue;
        try {
          return re.apply(this, arguments);
        } finally {
          R = ye;
        }
      };
    };
  })(q2)), q2;
}
var Y2 = {};
var LC;
function mN() {
  return LC || (LC = 1, (function(t) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var a = !1, s = 5;
      function f(Se, Fe) {
        var ct = Se.length;
        Se.push(Fe), v(Se, Fe, ct);
      }
      function p(Se) {
        return Se.length === 0 ? null : Se[0];
      }
      function m(Se) {
        if (Se.length === 0)
          return null;
        var Fe = Se[0], ct = Se.pop();
        return ct !== Fe && (Se[0] = ct, S(Se, ct, 0)), Fe;
      }
      function v(Se, Fe, ct) {
        for (var Ve = ct; Ve > 0; ) {
          var Ot = Ve - 1 >>> 1, Gt = Se[Ot];
          if (g(Gt, Fe) > 0)
            Se[Ot] = Fe, Se[Ve] = Gt, Ve = Ot;
          else
            return;
        }
      }
      function S(Se, Fe, ct) {
        for (var Ve = ct, Ot = Se.length, Gt = Ot >>> 1; Ve < Gt; ) {
          var Et = (Ve + 1) * 2 - 1, dt = Se[Et], ke = Et + 1, ht = Se[ke];
          if (g(dt, Fe) < 0)
            ke < Ot && g(ht, dt) < 0 ? (Se[Ve] = ht, Se[ke] = Fe, Ve = ke) : (Se[Ve] = dt, Se[Et] = Fe, Ve = Et);
          else if (ke < Ot && g(ht, Fe) < 0)
            Se[Ve] = ht, Se[ke] = Fe, Ve = ke;
          else
            return;
        }
      }
      function g(Se, Fe) {
        var ct = Se.sortIndex - Fe.sortIndex;
        return ct !== 0 ? ct : Se.id - Fe.id;
      }
      var x = 1, C = 2, b = 3, R = 4, D = 5;
      function _(Se, Fe) {
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
      var H = 1073741823, $ = -1, V = 250, F = 5e3, B = 1e4, ie = H, X = [], j = [], ne = 1, ae = null, G = b, K = !1, le = !1, de = !1, oe = typeof setTimeout == "function" ? setTimeout : null, re = typeof clearTimeout == "function" ? clearTimeout : null, ue = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ye(Se) {
        for (var Fe = p(j); Fe !== null; ) {
          if (Fe.callback === null)
            m(j);
          else if (Fe.startTime <= Se)
            m(j), Fe.sortIndex = Fe.expirationTime, f(X, Fe);
          else
            return;
          Fe = p(j);
        }
      }
      function P(Se) {
        if (de = !1, ye(Se), !le)
          if (p(X) !== null)
            le = !0, Be(Z);
          else {
            var Fe = p(j);
            Fe !== null && Pe(P, Fe.startTime - Se);
          }
      }
      function Z(Se, Fe) {
        le = !1, de && (de = !1, ut()), K = !0;
        var ct = G;
        try {
          var Ve;
          if (!a) return Ce(Se, Fe);
        } finally {
          ae = null, G = ct, K = !1;
        }
      }
      function Ce(Se, Fe) {
        var ct = Fe;
        for (ye(ct), ae = p(X); ae !== null && !(ae.expirationTime > ct && (!Se || yt())); ) {
          var Ve = ae.callback;
          if (typeof Ve == "function") {
            ae.callback = null, G = ae.priorityLevel;
            var Ot = ae.expirationTime <= ct, Gt = Ve(Ot);
            ct = t.unstable_now(), typeof Gt == "function" ? ae.callback = Gt : ae === p(X) && m(X), ye(ct);
          } else
            m(X);
          ae = p(X);
        }
        if (ae !== null)
          return !0;
        var Et = p(j);
        return Et !== null && Pe(P, Et.startTime - ct), !1;
      }
      function be(Se, Fe) {
        switch (Se) {
          case x:
          case C:
          case b:
          case R:
          case D:
            break;
          default:
            Se = b;
        }
        var ct = G;
        G = Se;
        try {
          return Fe();
        } finally {
          G = ct;
        }
      }
      function $e(Se) {
        var Fe;
        switch (G) {
          case x:
          case C:
          case b:
            Fe = b;
            break;
          default:
            Fe = G;
            break;
        }
        var ct = G;
        G = Fe;
        try {
          return Se();
        } finally {
          G = ct;
        }
      }
      function _e(Se) {
        var Fe = G;
        return function() {
          var ct = G;
          G = Fe;
          try {
            return Se.apply(this, arguments);
          } finally {
            G = ct;
          }
        };
      }
      function He(Se, Fe, ct) {
        var Ve = t.unstable_now(), Ot;
        if (typeof ct == "object" && ct !== null) {
          var Gt = ct.delay;
          typeof Gt == "number" && Gt > 0 ? Ot = Ve + Gt : Ot = Ve;
        } else
          Ot = Ve;
        var Et;
        switch (Se) {
          case x:
            Et = $;
            break;
          case C:
            Et = V;
            break;
          case D:
            Et = ie;
            break;
          case R:
            Et = B;
            break;
          case b:
          default:
            Et = F;
            break;
        }
        var dt = Ot + Et, ke = {
          id: ne++,
          callback: Fe,
          priorityLevel: Se,
          startTime: Ot,
          expirationTime: dt,
          sortIndex: -1
        };
        return Ot > Ve ? (ke.sortIndex = Ot, f(j, ke), p(X) === null && ke === p(j) && (de ? ut() : de = !0, Pe(P, Ot - Ve))) : (ke.sortIndex = dt, f(X, ke), !le && !K && (le = !0, Be(Z))), ke;
      }
      function Ge() {
      }
      function Ye() {
        !le && !K && (le = !0, Be(Z));
      }
      function Xe() {
        return p(X);
      }
      function nt(Se) {
        Se.callback = null;
      }
      function Oe() {
        return G;
      }
      var Ke = !1, Re = null, rt = -1, ot = s, ze = -1;
      function yt() {
        var Se = t.unstable_now() - ze;
        return !(Se < ot);
      }
      function Ft() {
      }
      function St(Se) {
        if (Se < 0 || Se > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        Se > 0 ? ot = Math.floor(1e3 / Se) : ot = s;
      }
      var Me = function() {
        if (Re !== null) {
          var Se = t.unstable_now();
          ze = Se;
          var Fe = !0, ct = !0;
          try {
            ct = Re(Fe, Se);
          } finally {
            ct ? at() : (Ke = !1, Re = null);
          }
        } else
          Ke = !1;
      }, at;
      if (typeof ue == "function")
        at = function() {
          ue(Me);
        };
      else if (typeof MessageChannel < "u") {
        var Rt = new MessageChannel(), Ae = Rt.port2;
        Rt.port1.onmessage = Me, at = function() {
          Ae.postMessage(null);
        };
      } else
        at = function() {
          oe(Me, 0);
        };
      function Be(Se) {
        Re = Se, Ke || (Ke = !0, at());
      }
      function Pe(Se, Fe) {
        rt = oe(function() {
          Se(t.unstable_now());
        }, Fe);
      }
      function ut() {
        re(rt), rt = -1;
      }
      var bt = Ft, Ze = null;
      t.unstable_IdlePriority = D, t.unstable_ImmediatePriority = x, t.unstable_LowPriority = R, t.unstable_NormalPriority = b, t.unstable_Profiling = Ze, t.unstable_UserBlockingPriority = C, t.unstable_cancelCallback = nt, t.unstable_continueExecution = Ye, t.unstable_forceFrameRate = St, t.unstable_getCurrentPriorityLevel = Oe, t.unstable_getFirstCallbackNode = Xe, t.unstable_next = $e, t.unstable_pauseExecution = Ge, t.unstable_requestPaint = bt, t.unstable_runWithPriority = be, t.unstable_scheduleCallback = He, t.unstable_shouldYield = yt, t.unstable_wrapCallback = _e, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(Y2)), Y2;
}
var zC;
function dT() {
  return zC || (zC = 1, process.env.NODE_ENV === "production" ? I0.exports = hN() : I0.exports = mN()), I0.exports;
}
var NC;
function yN() {
  if (NC) return bi;
  NC = 1;
  var t = Vh(), a = dT();
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
  var S = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), g = Object.prototype.hasOwnProperty, x = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, C = {}, b = {};
  function R(r) {
    return g.call(b, r) ? !0 : g.call(C, r) ? !1 : x.test(r) ? b[r] = !0 : (C[r] = !0, !1);
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
  function H(r, i, u, d) {
    var y = L.hasOwnProperty(i) ? L[i] : null;
    (y !== null ? y.type !== 0 : d || !(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (_(i, u, y, d) && (u = null), d || y === null ? R(i) && (u === null ? r.removeAttribute(i) : r.setAttribute(i, "" + u)) : y.mustUseProperty ? r[y.propertyName] = u === null ? y.type === 3 ? !1 : "" : u : (i = y.attributeName, d = y.attributeNamespace, u === null ? r.removeAttribute(i) : (y = y.type, u = y === 3 || y === 4 && u === !0 ? "" : "" + u, d ? r.setAttributeNS(d, i, u) : r.setAttribute(i, u))));
  }
  var $ = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, V = /* @__PURE__ */ Symbol.for("react.element"), F = /* @__PURE__ */ Symbol.for("react.portal"), B = /* @__PURE__ */ Symbol.for("react.fragment"), ie = /* @__PURE__ */ Symbol.for("react.strict_mode"), X = /* @__PURE__ */ Symbol.for("react.profiler"), j = /* @__PURE__ */ Symbol.for("react.provider"), ne = /* @__PURE__ */ Symbol.for("react.context"), ae = /* @__PURE__ */ Symbol.for("react.forward_ref"), G = /* @__PURE__ */ Symbol.for("react.suspense"), K = /* @__PURE__ */ Symbol.for("react.suspense_list"), le = /* @__PURE__ */ Symbol.for("react.memo"), de = /* @__PURE__ */ Symbol.for("react.lazy"), oe = /* @__PURE__ */ Symbol.for("react.offscreen"), re = Symbol.iterator;
  function ue(r) {
    return r === null || typeof r != "object" ? null : (r = re && r[re] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var ye = Object.assign, P;
  function Z(r) {
    if (P === void 0) try {
      throw Error();
    } catch (u) {
      var i = u.stack.trim().match(/\n( *(at )?)/);
      P = i && i[1] || "";
    }
    return `
` + P + r;
  }
  var Ce = !1;
  function be(r, i) {
    if (!r || Ce) return "";
    Ce = !0;
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
        } catch (me) {
          var d = me;
        }
        Reflect.construct(r, [], i);
      } else {
        try {
          i.call();
        } catch (me) {
          d = me;
        }
        r.call(i.prototype);
      }
      else {
        try {
          throw Error();
        } catch (me) {
          d = me;
        }
        r();
      }
    } catch (me) {
      if (me && d && typeof me.stack == "string") {
        for (var y = me.stack.split(`
`), w = d.stack.split(`
`), O = y.length - 1, I = w.length - 1; 1 <= O && 0 <= I && y[O] !== w[I]; ) I--;
        for (; 1 <= O && 0 <= I; O--, I--) if (y[O] !== w[I]) {
          if (O !== 1 || I !== 1)
            do
              if (O--, I--, 0 > I || y[O] !== w[I]) {
                var Q = `
` + y[O].replace(" at new ", " at ");
                return r.displayName && Q.includes("<anonymous>") && (Q = Q.replace("<anonymous>", r.displayName)), Q;
              }
            while (1 <= O && 0 <= I);
          break;
        }
      }
    } finally {
      Ce = !1, Error.prepareStackTrace = u;
    }
    return (r = r ? r.displayName || r.name : "") ? Z(r) : "";
  }
  function $e(r) {
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
      case B:
        return "Fragment";
      case F:
        return "Portal";
      case X:
        return "Profiler";
      case ie:
        return "StrictMode";
      case G:
        return "Suspense";
      case K:
        return "SuspenseList";
    }
    if (typeof r == "object") switch (r.$$typeof) {
      case ne:
        return (r.displayName || "Context") + ".Consumer";
      case j:
        return (r._context.displayName || "Context") + ".Provider";
      case ae:
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
  function He(r) {
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
  function Ge(r) {
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
  function Ye(r) {
    var i = r.type;
    return (r = r.nodeName) && r.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
  }
  function Xe(r) {
    var i = Ye(r) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(r.constructor.prototype, i), d = "" + r[i];
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
  function nt(r) {
    r._valueTracker || (r._valueTracker = Xe(r));
  }
  function Oe(r) {
    if (!r) return !1;
    var i = r._valueTracker;
    if (!i) return !0;
    var u = i.getValue(), d = "";
    return r && (d = Ye(r) ? r.checked ? "true" : "false" : r.value), r = d, r !== u ? (i.setValue(r), !0) : !1;
  }
  function Ke(r) {
    if (r = r || (typeof document < "u" ? document : void 0), typeof r > "u") return null;
    try {
      return r.activeElement || r.body;
    } catch {
      return r.body;
    }
  }
  function Re(r, i) {
    var u = i.checked;
    return ye({}, i, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: u ?? r._wrapperState.initialChecked });
  }
  function rt(r, i) {
    var u = i.defaultValue == null ? "" : i.defaultValue, d = i.checked != null ? i.checked : i.defaultChecked;
    u = Ge(i.value != null ? i.value : u), r._wrapperState = { initialChecked: d, initialValue: u, controlled: i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null };
  }
  function ot(r, i) {
    i = i.checked, i != null && H(r, "checked", i, !1);
  }
  function ze(r, i) {
    ot(r, i);
    var u = Ge(i.value), d = i.type;
    if (u != null) d === "number" ? (u === 0 && r.value === "" || r.value != u) && (r.value = "" + u) : r.value !== "" + u && (r.value = "" + u);
    else if (d === "submit" || d === "reset") {
      r.removeAttribute("value");
      return;
    }
    i.hasOwnProperty("value") ? Ft(r, i.type, u) : i.hasOwnProperty("defaultValue") && Ft(r, i.type, Ge(i.defaultValue)), i.checked == null && i.defaultChecked != null && (r.defaultChecked = !!i.defaultChecked);
  }
  function yt(r, i, u) {
    if (i.hasOwnProperty("value") || i.hasOwnProperty("defaultValue")) {
      var d = i.type;
      if (!(d !== "submit" && d !== "reset" || i.value !== void 0 && i.value !== null)) return;
      i = "" + r._wrapperState.initialValue, u || i === r.value || (r.value = i), r.defaultValue = i;
    }
    u = r.name, u !== "" && (r.name = ""), r.defaultChecked = !!r._wrapperState.initialChecked, u !== "" && (r.name = u);
  }
  function Ft(r, i, u) {
    (i !== "number" || Ke(r.ownerDocument) !== r) && (u == null ? r.defaultValue = "" + r._wrapperState.initialValue : r.defaultValue !== "" + u && (r.defaultValue = "" + u));
  }
  var St = Array.isArray;
  function Me(r, i, u, d) {
    if (r = r.options, i) {
      i = {};
      for (var y = 0; y < u.length; y++) i["$" + u[y]] = !0;
      for (u = 0; u < r.length; u++) y = i.hasOwnProperty("$" + r[u].value), r[u].selected !== y && (r[u].selected = y), y && d && (r[u].defaultSelected = !0);
    } else {
      for (u = "" + Ge(u), i = null, y = 0; y < r.length; y++) {
        if (r[y].value === u) {
          r[y].selected = !0, d && (r[y].defaultSelected = !0);
          return;
        }
        i !== null || r[y].disabled || (i = r[y]);
      }
      i !== null && (i.selected = !0);
    }
  }
  function at(r, i) {
    if (i.dangerouslySetInnerHTML != null) throw Error(s(91));
    return ye({}, i, { value: void 0, defaultValue: void 0, children: "" + r._wrapperState.initialValue });
  }
  function Rt(r, i) {
    var u = i.value;
    if (u == null) {
      if (u = i.children, i = i.defaultValue, u != null) {
        if (i != null) throw Error(s(92));
        if (St(u)) {
          if (1 < u.length) throw Error(s(93));
          u = u[0];
        }
        i = u;
      }
      i == null && (i = ""), u = i;
    }
    r._wrapperState = { initialValue: Ge(u) };
  }
  function Ae(r, i) {
    var u = Ge(i.value), d = Ge(i.defaultValue);
    u != null && (u = "" + u, u !== r.value && (r.value = u), i.defaultValue == null && r.defaultValue !== u && (r.defaultValue = u)), d != null && (r.defaultValue = "" + d);
  }
  function Be(r) {
    var i = r.textContent;
    i === r._wrapperState.initialValue && i !== "" && i !== null && (r.value = i);
  }
  function Pe(r) {
    switch (r) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function ut(r, i) {
    return r == null || r === "http://www.w3.org/1999/xhtml" ? Pe(i) : r === "http://www.w3.org/2000/svg" && i === "foreignObject" ? "http://www.w3.org/1999/xhtml" : r;
  }
  var bt, Ze = (function(r) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(i, u, d, y) {
      MSApp.execUnsafeLocalFunction(function() {
        return r(i, u, d, y);
      });
    } : r;
  })(function(r, i) {
    if (r.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in r) r.innerHTML = i;
    else {
      for (bt = bt || document.createElement("div"), bt.innerHTML = "<svg>" + i.valueOf().toString() + "</svg>", i = bt.firstChild; r.firstChild; ) r.removeChild(r.firstChild);
      for (; i.firstChild; ) r.appendChild(i.firstChild);
    }
  });
  function Se(r, i) {
    if (i) {
      var u = r.firstChild;
      if (u && u === r.lastChild && u.nodeType === 3) {
        u.nodeValue = i;
        return;
      }
    }
    r.textContent = i;
  }
  var Fe = {
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
  }, ct = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Fe).forEach(function(r) {
    ct.forEach(function(i) {
      i = i + r.charAt(0).toUpperCase() + r.substring(1), Fe[i] = Fe[r];
    });
  });
  function Ve(r, i, u) {
    return i == null || typeof i == "boolean" || i === "" ? "" : u || typeof i != "number" || i === 0 || Fe.hasOwnProperty(r) && Fe[r] ? ("" + i).trim() : i + "px";
  }
  function Ot(r, i) {
    r = r.style;
    for (var u in i) if (i.hasOwnProperty(u)) {
      var d = u.indexOf("--") === 0, y = Ve(u, i[u], d);
      u === "float" && (u = "cssFloat"), d ? r.setProperty(u, y) : r[u] = y;
    }
  }
  var Gt = ye({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Et(r, i) {
    if (i) {
      if (Gt[r] && (i.children != null || i.dangerouslySetInnerHTML != null)) throw Error(s(137, r));
      if (i.dangerouslySetInnerHTML != null) {
        if (i.children != null) throw Error(s(60));
        if (typeof i.dangerouslySetInnerHTML != "object" || !("__html" in i.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (i.style != null && typeof i.style != "object") throw Error(s(62));
    }
  }
  function dt(r, i) {
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
  var ke = null;
  function ht(r) {
    return r = r.target || r.srcElement || window, r.correspondingUseElement && (r = r.correspondingUseElement), r.nodeType === 3 ? r.parentNode : r;
  }
  var Dt = null, Zt = null, nn = null;
  function yn(r) {
    if (r = At(r)) {
      if (typeof Dt != "function") throw Error(s(280));
      var i = r.stateNode;
      i && (i = er(i), Dt(r.stateNode, r.type, i));
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
  function Ai(r, i, u) {
    if (vr) return r(i, u);
    vr = !0;
    try {
      return Pr(r, i, u);
    } finally {
      vr = !1, (Zt !== null || nn !== null) && (br(), Bn());
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
  if (S) try {
    var Vn = {};
    Object.defineProperty(Vn, "passive", { get: function() {
      Ar = !0;
    } }), window.addEventListener("test", Vn, Vn), window.removeEventListener("test", Vn, Vn);
  } catch {
    Ar = !1;
  }
  function Ma(r, i, u, d, y, w, O, I, Q) {
    var me = Array.prototype.slice.call(arguments, 3);
    try {
      i.apply(u, me);
    } catch (Ue) {
      this.onError(Ue);
    }
  }
  var oa = !1, Wa = null, Lr = !1, W = null, De = { onError: function(r) {
    oa = !0, Wa = r;
  } };
  function Je(r, i, u, d, y, w, O, I, Q) {
    oa = !1, Wa = null, Ma.apply(De, arguments);
  }
  function ft(r, i, u, d, y, w, O, I, Q) {
    if (Je.apply(this, arguments), oa) {
      if (oa) {
        var me = Wa;
        oa = !1, Wa = null;
      } else throw Error(s(198));
      Lr || (Lr = !0, W = me);
    }
  }
  function qt(r) {
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
  function Vt(r) {
    if (r.tag === 13) {
      var i = r.memoizedState;
      if (i === null && (r = r.alternate, r !== null && (i = r.memoizedState)), i !== null) return i.dehydrated;
    }
    return null;
  }
  function tn(r) {
    if (qt(r) !== r) throw Error(s(188));
  }
  function Jt(r) {
    var i = r.alternate;
    if (!i) {
      if (i = qt(r), i === null) throw Error(s(188));
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
  var xn = a.unstable_scheduleCallback, In = a.unstable_cancelCallback, _a = a.unstable_shouldYield, sa = a.unstable_requestPaint, Yt = a.unstable_now, Qt = a.unstable_getCurrentPriorityLevel, ua = a.unstable_ImmediatePriority, Li = a.unstable_UserBlockingPriority, zi = a.unstable_NormalPriority, Ni = a.unstable_LowPriority, Xi = a.unstable_IdlePriority, ii = null, Qn = null;
  function Yo(r) {
    if (Qn && typeof Qn.onCommitFiberRoot == "function") try {
      Qn.onCommitFiberRoot(ii, r, void 0, (r.current.flags & 128) === 128);
    } catch {
    }
  }
  var $r = Math.clz32 ? Math.clz32 : on, Fs = Math.log, io = Math.LN2;
  function on(r) {
    return r >>>= 0, r === 0 ? 32 : 31 - (Fs(r) / io | 0) | 0;
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
  function Rr(r, i) {
    for (var u = r.suspendedLanes, d = r.pingedLanes, y = r.expirationTimes, w = r.pendingLanes; 0 < w; ) {
      var O = 31 - $r(w), I = 1 << O, Q = y[O];
      Q === -1 ? ((I & u) === 0 || (I & d) !== 0) && (y[O] = ca(I, i)) : Q <= i && (r.expiredLanes |= I), w &= ~I;
    }
  }
  function lo(r) {
    return r = r.pendingLanes & -1073741825, r !== 0 ? r : r & 1073741824 ? 1073741824 : 0;
  }
  function Ps() {
    var r = Ut;
    return Ut <<= 1, (Ut & 4194240) === 0 && (Ut = 64), r;
  }
  function $s(r) {
    for (var i = [], u = 0; 31 > u; u++) i.push(r);
    return i;
  }
  function Rl(r, i, u) {
    r.pendingLanes |= i, i !== 536870912 && (r.suspendedLanes = 0, r.pingedLanes = 0), r = r.eventTimes, i = 31 - $r(i), r[i] = u;
  }
  function pp(r, i) {
    var u = r.pendingLanes & ~i;
    r.pendingLanes = i, r.suspendedLanes = 0, r.pingedLanes = 0, r.expiredLanes &= i, r.mutableReadLanes &= i, r.entangledLanes &= i, i = r.entanglements;
    var d = r.eventTimes;
    for (r = r.expirationTimes; 0 < u; ) {
      var y = 31 - $r(u), w = 1 << y;
      i[y] = 0, d[y] = -1, r[y] = -1, u &= ~w;
    }
  }
  function Ml(r, i) {
    var u = r.entangledLanes |= i;
    for (r = r.entanglements; u; ) {
      var d = 31 - $r(u), y = 1 << d;
      y & i | r[d] & i && (r[d] |= i), u &= ~y;
    }
  }
  var Cn = 0;
  function Hs(r) {
    return r &= -r, 1 < r ? 4 < r ? (r & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Sn, Yu, Ki, Bt, Vs, Hr = !1, Zi = [], fa = null, Ji = null, qn = null, On = /* @__PURE__ */ new Map(), oo = /* @__PURE__ */ new Map(), Mr = [], da = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function li(r, i) {
    switch (r) {
      case "focusin":
      case "focusout":
        fa = null;
        break;
      case "dragenter":
      case "dragleave":
        Ji = null;
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
        oo.delete(i.pointerId);
    }
  }
  function Wo(r, i, u, d, y, w) {
    return r === null || r.nativeEvent !== w ? (r = { blockedOn: i, domEventName: u, eventSystemFlags: d, nativeEvent: w, targetContainers: [y] }, i !== null && (i = At(i), i !== null && Yu(i)), r) : (r.eventSystemFlags |= d, i = r.targetContainers, y !== null && i.indexOf(y) === -1 && i.push(y), r);
  }
  function Wu(r, i, u, d, y) {
    switch (i) {
      case "focusin":
        return fa = Wo(fa, r, i, u, d, y), !0;
      case "dragenter":
        return Ji = Wo(Ji, r, i, u, d, y), !0;
      case "mouseover":
        return qn = Wo(qn, r, i, u, d, y), !0;
      case "pointerover":
        var w = y.pointerId;
        return On.set(w, Wo(On.get(w) || null, r, i, u, d, y)), !0;
      case "gotpointercapture":
        return w = y.pointerId, oo.set(w, Wo(oo.get(w) || null, r, i, u, d, y)), !0;
    }
    return !1;
  }
  function Bu(r) {
    var i = ts(r.target);
    if (i !== null) {
      var u = qt(i);
      if (u !== null) {
        if (i = u.tag, i === 13) {
          if (i = Vt(u), i !== null) {
            r.blockedOn = i, Vs(r.priority, function() {
              Ki(u);
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
      var u = Ys(r.domEventName, r.eventSystemFlags, i[0], r.nativeEvent);
      if (u === null) {
        u = r.nativeEvent;
        var d = new u.constructor(u.type, u);
        ke = d, u.target.dispatchEvent(d), ke = null;
      } else return i = At(u), i !== null && Yu(i), r.blockedOn = u, !1;
      i.shift();
    }
    return !0;
  }
  function Bo(r, i, u) {
    so(r) && u.delete(i);
  }
  function vp() {
    Hr = !1, fa !== null && so(fa) && (fa = null), Ji !== null && so(Ji) && (Ji = null), qn !== null && so(qn) && (qn = null), On.forEach(Bo), oo.forEach(Bo);
  }
  function oi(r, i) {
    r.blockedOn === i && (r.blockedOn = null, Hr || (Hr = !0, a.unstable_scheduleCallback(a.unstable_NormalPriority, vp)));
  }
  function Ui(r) {
    function i(y) {
      return oi(y, r);
    }
    if (0 < Zi.length) {
      oi(Zi[0], r);
      for (var u = 1; u < Zi.length; u++) {
        var d = Zi[u];
        d.blockedOn === r && (d.blockedOn = null);
      }
    }
    for (fa !== null && oi(fa, r), Ji !== null && oi(Ji, r), qn !== null && oi(qn, r), On.forEach(i), oo.forEach(i), u = 0; u < Mr.length; u++) d = Mr[u], d.blockedOn === r && (d.blockedOn = null);
    for (; 0 < Mr.length && (u = Mr[0], u.blockedOn === null); ) Bu(u), u.blockedOn === null && Mr.shift();
  }
  var el = $.ReactCurrentBatchConfig, si = !0;
  function Is(r, i, u, d) {
    var y = Cn, w = el.transition;
    el.transition = null;
    try {
      Cn = 1, uo(r, i, u, d);
    } finally {
      Cn = y, el.transition = w;
    }
  }
  function qs(r, i, u, d) {
    var y = Cn, w = el.transition;
    el.transition = null;
    try {
      Cn = 4, uo(r, i, u, d);
    } finally {
      Cn = y, el.transition = w;
    }
  }
  function uo(r, i, u, d) {
    if (si) {
      var y = Ys(r, i, u, d);
      if (y === null) Rf(r, i, d, Go, u), li(r, d);
      else if (Wu(y, r, i, u, d)) d.stopPropagation();
      else if (li(r, d), i & 4 && -1 < da.indexOf(r)) {
        for (; y !== null; ) {
          var w = At(y);
          if (w !== null && Sn(w), w = Ys(r, i, u, d), w === null && Rf(r, i, d, Go, u), w === y) break;
          y = w;
        }
        y !== null && d.stopPropagation();
      } else Rf(r, i, d, null, u);
    }
  }
  var Go = null;
  function Ys(r, i, u, d) {
    if (Go = null, r = ht(d), r = ts(r), r !== null) if (i = qt(r), i === null) r = null;
    else if (u = i.tag, u === 13) {
      if (r = Vt(i), r !== null) return r;
      r = null;
    } else if (u === 3) {
      if (i.stateNode.current.memoizedState.isDehydrated) return i.tag === 3 ? i.stateNode.containerInfo : null;
      r = null;
    } else i !== r && (r = null);
    return Go = r, null;
  }
  function Ws(r) {
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
          case Li:
            return 4;
          case zi:
          case Ni:
            return 16;
          case Xi:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var ji = null, k = null, Y = null;
  function he() {
    if (Y) return Y;
    var r, i = k, u = i.length, d, y = "value" in ji ? ji.value : ji.textContent, w = y.length;
    for (r = 0; r < u && i[r] === y[r]; r++) ;
    var O = u - r;
    for (d = 1; d <= O && i[u - d] === y[w - d]; d++) ;
    return Y = y.slice(r, 1 < d ? 1 - d : void 0);
  }
  function Ee(r) {
    var i = r.keyCode;
    return "charCode" in r ? (r = r.charCode, r === 0 && i === 13 && (r = 13)) : r = i, r === 10 && (r = 13), 32 <= r || r === 13 ? r : 0;
  }
  function Qe() {
    return !0;
  }
  function zt() {
    return !1;
  }
  function tt(r) {
    function i(u, d, y, w, O) {
      this._reactName = u, this._targetInst = y, this.type = d, this.nativeEvent = w, this.target = O, this.currentTarget = null;
      for (var I in r) r.hasOwnProperty(I) && (u = r[I], this[I] = u ? u(w) : w[I]);
      return this.isDefaultPrevented = (w.defaultPrevented != null ? w.defaultPrevented : w.returnValue === !1) ? Qe : zt, this.isPropagationStopped = zt, this;
    }
    return ye(i.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Qe);
    }, stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Qe);
    }, persist: function() {
    }, isPersistent: Qe }), i;
  }
  var Pt = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(r) {
    return r.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, sn = tt(Pt), En = ye({}, Pt, { view: 0, detail: 0 }), Fn = tt(En), An, rn, Ln, Jn = ye({}, En, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Sp, button: 0, buttons: 0, relatedTarget: function(r) {
    return r.relatedTarget === void 0 ? r.fromElement === r.srcElement ? r.toElement : r.fromElement : r.relatedTarget;
  }, movementX: function(r) {
    return "movementX" in r ? r.movementX : (r !== Ln && (Ln && r.type === "mousemove" ? (An = r.screenX - Ln.screenX, rn = r.screenY - Ln.screenY) : rn = An = 0, Ln = r), An);
  }, movementY: function(r) {
    return "movementY" in r ? r.movementY : rn;
  } }), co = tt(Jn), Gu = ye({}, Jn, { dataTransfer: 0 }), _l = tt(Gu), Qu = ye({}, En, { relatedTarget: 0 }), Qo = tt(Qu), hp = ye({}, Pt, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), hf = tt(hp), mp = ye({}, Pt, { clipboardData: function(r) {
    return "clipboardData" in r ? r.clipboardData : window.clipboardData;
  } }), Ih = tt(mp), yp = ye({}, Pt, { data: 0 }), gp = tt(yp), qh = {
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
  }, Yh = {
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
  }, E1 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Dl(r) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(r) : (r = E1[r]) ? !!i[r] : !1;
  }
  function Sp() {
    return Dl;
  }
  var Ep = ye({}, En, { key: function(r) {
    if (r.key) {
      var i = qh[r.key] || r.key;
      if (i !== "Unidentified") return i;
    }
    return r.type === "keypress" ? (r = Ee(r), r === 13 ? "Enter" : String.fromCharCode(r)) : r.type === "keydown" || r.type === "keyup" ? Yh[r.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Sp, charCode: function(r) {
    return r.type === "keypress" ? Ee(r) : 0;
  }, keyCode: function(r) {
    return r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  }, which: function(r) {
    return r.type === "keypress" ? Ee(r) : r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  } }), xp = tt(Ep), wp = ye({}, Jn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Wh = tt(wp), mf = ye({}, En, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Sp }), Bh = tt(mf), Da = ye({}, Pt, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), kl = tt(Da), hr = ye({}, Jn, {
    deltaX: function(r) {
      return "deltaX" in r ? r.deltaX : "wheelDeltaX" in r ? -r.wheelDeltaX : 0;
    },
    deltaY: function(r) {
      return "deltaY" in r ? r.deltaY : "wheelDeltaY" in r ? -r.wheelDeltaY : "wheelDelta" in r ? -r.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ol = tt(hr), Cp = [9, 13, 27, 32], Bs = S && "CompositionEvent" in window, Xu = null;
  S && "documentMode" in document && (Xu = document.documentMode);
  var Ku = S && "TextEvent" in window && !Xu, Gh = S && (!Bs || Xu && 8 < Xu && 11 >= Xu), Qh = " ", yf = !1;
  function Xh(r, i) {
    switch (r) {
      case "keyup":
        return Cp.indexOf(i.keyCode) !== -1;
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
  function Kh(r) {
    return r = r.detail, typeof r == "object" && "data" in r ? r.data : null;
  }
  var Gs = !1;
  function Zh(r, i) {
    switch (r) {
      case "compositionend":
        return Kh(i);
      case "keypress":
        return i.which !== 32 ? null : (yf = !0, Qh);
      case "textInput":
        return r = i.data, r === Qh && yf ? null : r;
      default:
        return null;
    }
  }
  function x1(r, i) {
    if (Gs) return r === "compositionend" || !Bs && Xh(r, i) ? (r = he(), Y = k = ji = null, Gs = !1, r) : null;
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
        return Gh && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var w1 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Jh(r) {
    var i = r && r.nodeName && r.nodeName.toLowerCase();
    return i === "input" ? !!w1[r.type] : i === "textarea";
  }
  function bp(r, i, u, d) {
    Hn(d), i = rc(i, "onChange"), 0 < i.length && (u = new sn("onChange", "change", null, u, d), r.push({ event: u, listeners: i }));
  }
  var tl = null, Xo = null;
  function em(r) {
    Jo(r, 0);
  }
  function Zu(r) {
    var i = Pi(r);
    if (Oe(i)) return r;
  }
  function C1(r, i) {
    if (r === "change") return i;
  }
  var tm = !1;
  if (S) {
    var Tp;
    if (S) {
      var Rp = "oninput" in document;
      if (!Rp) {
        var nm = document.createElement("div");
        nm.setAttribute("oninput", "return;"), Rp = typeof nm.oninput == "function";
      }
      Tp = Rp;
    } else Tp = !1;
    tm = Tp && (!document.documentMode || 9 < document.documentMode);
  }
  function rm() {
    tl && (tl.detachEvent("onpropertychange", am), Xo = tl = null);
  }
  function am(r) {
    if (r.propertyName === "value" && Zu(Xo)) {
      var i = [];
      bp(i, Xo, r, ht(r)), Ai(em, i);
    }
  }
  function b1(r, i, u) {
    r === "focusin" ? (rm(), tl = i, Xo = u, tl.attachEvent("onpropertychange", am)) : r === "focusout" && rm();
  }
  function im(r) {
    if (r === "selectionchange" || r === "keyup" || r === "keydown") return Zu(Xo);
  }
  function T1(r, i) {
    if (r === "click") return Zu(i);
  }
  function lm(r, i) {
    if (r === "input" || r === "change") return Zu(i);
  }
  function R1(r, i) {
    return r === i && (r !== 0 || 1 / r === 1 / i) || r !== r && i !== i;
  }
  var Fi = typeof Object.is == "function" ? Object.is : R1;
  function Ju(r, i) {
    if (Fi(r, i)) return !0;
    if (typeof r != "object" || r === null || typeof i != "object" || i === null) return !1;
    var u = Object.keys(r), d = Object.keys(i);
    if (u.length !== d.length) return !1;
    for (d = 0; d < u.length; d++) {
      var y = u[d];
      if (!g.call(i, y) || !Fi(r[y], i[y])) return !1;
    }
    return !0;
  }
  function om(r) {
    for (; r && r.firstChild; ) r = r.firstChild;
    return r;
  }
  function gf(r, i) {
    var u = om(r);
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
      u = om(u);
    }
  }
  function fo(r, i) {
    return r && i ? r === i ? !0 : r && r.nodeType === 3 ? !1 : i && i.nodeType === 3 ? fo(r, i.parentNode) : "contains" in r ? r.contains(i) : r.compareDocumentPosition ? !!(r.compareDocumentPosition(i) & 16) : !1 : !1;
  }
  function ec() {
    for (var r = window, i = Ke(); i instanceof r.HTMLIFrameElement; ) {
      try {
        var u = typeof i.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) r = i.contentWindow;
      else break;
      i = Ke(r.document);
    }
    return i;
  }
  function Sf(r) {
    var i = r && r.nodeName && r.nodeName.toLowerCase();
    return i && (i === "input" && (r.type === "text" || r.type === "search" || r.type === "tel" || r.type === "url" || r.type === "password") || i === "textarea" || r.contentEditable === "true");
  }
  function Qs(r) {
    var i = ec(), u = r.focusedElem, d = r.selectionRange;
    if (i !== u && u && u.ownerDocument && fo(u.ownerDocument.documentElement, u)) {
      if (d !== null && Sf(u)) {
        if (i = d.start, r = d.end, r === void 0 && (r = i), "selectionStart" in u) u.selectionStart = i, u.selectionEnd = Math.min(r, u.value.length);
        else if (r = (i = u.ownerDocument || document) && i.defaultView || window, r.getSelection) {
          r = r.getSelection();
          var y = u.textContent.length, w = Math.min(d.start, y);
          d = d.end === void 0 ? w : Math.min(d.end, y), !r.extend && w > d && (y = d, d = w, w = y), y = gf(u, w);
          var O = gf(
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
  var M1 = S && "documentMode" in document && 11 >= document.documentMode, Xs = null, Mp = null, tc = null, _p = !1;
  function Dp(r, i, u) {
    var d = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    _p || Xs == null || Xs !== Ke(d) || (d = Xs, "selectionStart" in d && Sf(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), tc && Ju(tc, d) || (tc = d, d = rc(Mp, "onSelect"), 0 < d.length && (i = new sn("onSelect", "select", null, i, u), r.push({ event: i, listeners: d }), i.target = Xs)));
  }
  function Ef(r, i) {
    var u = {};
    return u[r.toLowerCase()] = i.toLowerCase(), u["Webkit" + r] = "webkit" + i, u["Moz" + r] = "moz" + i, u;
  }
  var Ko = { animationend: Ef("Animation", "AnimationEnd"), animationiteration: Ef("Animation", "AnimationIteration"), animationstart: Ef("Animation", "AnimationStart"), transitionend: Ef("Transition", "TransitionEnd") }, Vr = {}, kp = {};
  S && (kp = document.createElement("div").style, "AnimationEvent" in window || (delete Ko.animationend.animation, delete Ko.animationiteration.animation, delete Ko.animationstart.animation), "TransitionEvent" in window || delete Ko.transitionend.transition);
  function xf(r) {
    if (Vr[r]) return Vr[r];
    if (!Ko[r]) return r;
    var i = Ko[r], u;
    for (u in i) if (i.hasOwnProperty(u) && u in kp) return Vr[r] = i[u];
    return r;
  }
  var sm = xf("animationend"), um = xf("animationiteration"), cm = xf("animationstart"), fm = xf("transitionend"), Op = /* @__PURE__ */ new Map(), wf = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ui(r, i) {
    Op.set(r, i), m(i, [r]);
  }
  for (var Ap = 0; Ap < wf.length; Ap++) {
    var Zo = wf[Ap], _1 = Zo.toLowerCase(), D1 = Zo[0].toUpperCase() + Zo.slice(1);
    ui(_1, "on" + D1);
  }
  ui(sm, "onAnimationEnd"), ui(um, "onAnimationIteration"), ui(cm, "onAnimationStart"), ui("dblclick", "onDoubleClick"), ui("focusin", "onFocus"), ui("focusout", "onBlur"), ui(fm, "onTransitionEnd"), v("onMouseEnter", ["mouseout", "mouseover"]), v("onMouseLeave", ["mouseout", "mouseover"]), v("onPointerEnter", ["pointerout", "pointerover"]), v("onPointerLeave", ["pointerout", "pointerover"]), m("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), m("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), m("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), m("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var nc = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Lp = new Set("cancel close invalid load scroll toggle".split(" ").concat(nc));
  function Cf(r, i, u) {
    var d = r.type || "unknown-event";
    r.currentTarget = u, ft(d, i, void 0, r), r.currentTarget = null;
  }
  function Jo(r, i) {
    i = (i & 4) !== 0;
    for (var u = 0; u < r.length; u++) {
      var d = r[u], y = d.event;
      d = d.listeners;
      e: {
        var w = void 0;
        if (i) for (var O = d.length - 1; 0 <= O; O--) {
          var I = d[O], Q = I.instance, me = I.currentTarget;
          if (I = I.listener, Q !== w && y.isPropagationStopped()) break e;
          Cf(y, I, me), w = Q;
        }
        else for (O = 0; O < d.length; O++) {
          if (I = d[O], Q = I.instance, me = I.currentTarget, I = I.listener, Q !== w && y.isPropagationStopped()) break e;
          Cf(y, I, me), w = Q;
        }
      }
    }
    if (Lr) throw r = W, Lr = !1, W = null, r;
  }
  function Dn(r, i) {
    var u = i[lc];
    u === void 0 && (u = i[lc] = /* @__PURE__ */ new Set());
    var d = r + "__bubble";
    u.has(d) || (dm(i, r, 2, !1), u.add(d));
  }
  function bf(r, i, u) {
    var d = 0;
    i && (d |= 4), dm(u, r, d, i);
  }
  var Tf = "_reactListening" + Math.random().toString(36).slice(2);
  function Ks(r) {
    if (!r[Tf]) {
      r[Tf] = !0, f.forEach(function(u) {
        u !== "selectionchange" && (Lp.has(u) || bf(u, !1, r), bf(u, !0, r));
      });
      var i = r.nodeType === 9 ? r : r.ownerDocument;
      i === null || i[Tf] || (i[Tf] = !0, bf("selectionchange", !1, i));
    }
  }
  function dm(r, i, u, d) {
    switch (Ws(i)) {
      case 1:
        var y = Is;
        break;
      case 4:
        y = qs;
        break;
      default:
        y = uo;
    }
    u = y.bind(null, i, u, r), y = void 0, !Ar || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (y = !0), d ? y !== void 0 ? r.addEventListener(i, u, { capture: !0, passive: y }) : r.addEventListener(i, u, !0) : y !== void 0 ? r.addEventListener(i, u, { passive: y }) : r.addEventListener(i, u, !1);
  }
  function Rf(r, i, u, d, y) {
    var w = d;
    if ((i & 1) === 0 && (i & 2) === 0 && d !== null) e: for (; ; ) {
      if (d === null) return;
      var O = d.tag;
      if (O === 3 || O === 4) {
        var I = d.stateNode.containerInfo;
        if (I === y || I.nodeType === 8 && I.parentNode === y) break;
        if (O === 4) for (O = d.return; O !== null; ) {
          var Q = O.tag;
          if ((Q === 3 || Q === 4) && (Q = O.stateNode.containerInfo, Q === y || Q.nodeType === 8 && Q.parentNode === y)) return;
          O = O.return;
        }
        for (; I !== null; ) {
          if (O = ts(I), O === null) return;
          if (Q = O.tag, Q === 5 || Q === 6) {
            d = w = O;
            continue e;
          }
          I = I.parentNode;
        }
      }
      d = d.return;
    }
    Ai(function() {
      var me = w, Ue = ht(u), Ie = [];
      e: {
        var Ne = Op.get(r);
        if (Ne !== void 0) {
          var pt = sn, xt = r;
          switch (r) {
            case "keypress":
              if (Ee(u) === 0) break e;
            case "keydown":
            case "keyup":
              pt = xp;
              break;
            case "focusin":
              xt = "focus", pt = Qo;
              break;
            case "focusout":
              xt = "blur", pt = Qo;
              break;
            case "beforeblur":
            case "afterblur":
              pt = Qo;
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
              pt = co;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              pt = _l;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              pt = Bh;
              break;
            case sm:
            case um:
            case cm:
              pt = hf;
              break;
            case fm:
              pt = kl;
              break;
            case "scroll":
              pt = Fn;
              break;
            case "wheel":
              pt = Ol;
              break;
            case "copy":
            case "cut":
            case "paste":
              pt = Ih;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              pt = Wh;
          }
          var Tt = (i & 4) !== 0, fr = !Tt && r === "scroll", se = Tt ? Ne !== null ? Ne + "Capture" : null : Ne;
          Tt = [];
          for (var ee = me, pe; ee !== null; ) {
            pe = ee;
            var je = pe.stateNode;
            if (pe.tag === 5 && je !== null && (pe = je, se !== null && (je = Tr(ee, se), je != null && Tt.push(Zs(ee, je, pe)))), fr) break;
            ee = ee.return;
          }
          0 < Tt.length && (Ne = new pt(Ne, xt, null, u, Ue), Ie.push({ event: Ne, listeners: Tt }));
        }
      }
      if ((i & 7) === 0) {
        e: {
          if (Ne = r === "mouseover" || r === "pointerover", pt = r === "mouseout" || r === "pointerout", Ne && u !== ke && (xt = u.relatedTarget || u.fromElement) && (ts(xt) || xt[Al])) break e;
          if ((pt || Ne) && (Ne = Ue.window === Ue ? Ue : (Ne = Ue.ownerDocument) ? Ne.defaultView || Ne.parentWindow : window, pt ? (xt = u.relatedTarget || u.toElement, pt = me, xt = xt ? ts(xt) : null, xt !== null && (fr = qt(xt), xt !== fr || xt.tag !== 5 && xt.tag !== 6) && (xt = null)) : (pt = null, xt = me), pt !== xt)) {
            if (Tt = co, je = "onMouseLeave", se = "onMouseEnter", ee = "mouse", (r === "pointerout" || r === "pointerover") && (Tt = Wh, je = "onPointerLeave", se = "onPointerEnter", ee = "pointer"), fr = pt == null ? Ne : Pi(pt), pe = xt == null ? Ne : Pi(xt), Ne = new Tt(je, ee + "leave", pt, u, Ue), Ne.target = fr, Ne.relatedTarget = pe, je = null, ts(Ue) === me && (Tt = new Tt(se, ee + "enter", xt, u, Ue), Tt.target = pe, Tt.relatedTarget = fr, je = Tt), fr = je, pt && xt) t: {
              for (Tt = pt, se = xt, ee = 0, pe = Tt; pe; pe = po(pe)) ee++;
              for (pe = 0, je = se; je; je = po(je)) pe++;
              for (; 0 < ee - pe; ) Tt = po(Tt), ee--;
              for (; 0 < pe - ee; ) se = po(se), pe--;
              for (; ee--; ) {
                if (Tt === se || se !== null && Tt === se.alternate) break t;
                Tt = po(Tt), se = po(se);
              }
              Tt = null;
            }
            else Tt = null;
            pt !== null && pm(Ie, Ne, pt, Tt, !1), xt !== null && fr !== null && pm(Ie, fr, xt, Tt, !0);
          }
        }
        e: {
          if (Ne = me ? Pi(me) : window, pt = Ne.nodeName && Ne.nodeName.toLowerCase(), pt === "select" || pt === "input" && Ne.type === "file") var wt = C1;
          else if (Jh(Ne)) if (tm) wt = lm;
          else {
            wt = im;
            var jt = b1;
          }
          else (pt = Ne.nodeName) && pt.toLowerCase() === "input" && (Ne.type === "checkbox" || Ne.type === "radio") && (wt = T1);
          if (wt && (wt = wt(r, me))) {
            bp(Ie, wt, u, Ue);
            break e;
          }
          jt && jt(r, Ne, me), r === "focusout" && (jt = Ne._wrapperState) && jt.controlled && Ne.type === "number" && Ft(Ne, "number", Ne.value);
        }
        switch (jt = me ? Pi(me) : window, r) {
          case "focusin":
            (Jh(jt) || jt.contentEditable === "true") && (Xs = jt, Mp = me, tc = null);
            break;
          case "focusout":
            tc = Mp = Xs = null;
            break;
          case "mousedown":
            _p = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            _p = !1, Dp(Ie, u, Ue);
            break;
          case "selectionchange":
            if (M1) break;
          case "keydown":
          case "keyup":
            Dp(Ie, u, Ue);
        }
        var $t;
        if (Bs) e: {
          switch (r) {
            case "compositionstart":
              var Wt = "onCompositionStart";
              break e;
            case "compositionend":
              Wt = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Wt = "onCompositionUpdate";
              break e;
          }
          Wt = void 0;
        }
        else Gs ? Xh(r, u) && (Wt = "onCompositionEnd") : r === "keydown" && u.keyCode === 229 && (Wt = "onCompositionStart");
        Wt && (Gh && u.locale !== "ko" && (Gs || Wt !== "onCompositionStart" ? Wt === "onCompositionEnd" && Gs && ($t = he()) : (ji = Ue, k = "value" in ji ? ji.value : ji.textContent, Gs = !0)), jt = rc(me, Wt), 0 < jt.length && (Wt = new gp(Wt, r, null, u, Ue), Ie.push({ event: Wt, listeners: jt }), $t ? Wt.data = $t : ($t = Kh(u), $t !== null && (Wt.data = $t)))), ($t = Ku ? Zh(r, u) : x1(r, u)) && (me = rc(me, "onBeforeInput"), 0 < me.length && (Ue = new gp("onBeforeInput", "beforeinput", null, u, Ue), Ie.push({ event: Ue, listeners: me }), Ue.data = $t));
      }
      Jo(Ie, i);
    });
  }
  function Zs(r, i, u) {
    return { instance: r, listener: i, currentTarget: u };
  }
  function rc(r, i) {
    for (var u = i + "Capture", d = []; r !== null; ) {
      var y = r, w = y.stateNode;
      y.tag === 5 && w !== null && (y = w, w = Tr(r, u), w != null && d.unshift(Zs(r, w, y)), w = Tr(r, i), w != null && d.push(Zs(r, w, y))), r = r.return;
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
  function pm(r, i, u, d, y) {
    for (var w = i._reactName, O = []; u !== null && u !== d; ) {
      var I = u, Q = I.alternate, me = I.stateNode;
      if (Q !== null && Q === d) break;
      I.tag === 5 && me !== null && (I = me, y ? (Q = Tr(u, w), Q != null && O.unshift(Zs(u, Q, I))) : y || (Q = Tr(u, w), Q != null && O.push(Zs(u, Q, I)))), u = u.return;
    }
    O.length !== 0 && r.push({ event: i, listeners: O });
  }
  var vm = /\r\n?/g, k1 = /\u0000|\uFFFD/g;
  function hm(r) {
    return (typeof r == "string" ? r : "" + r).replace(vm, `
`).replace(k1, "");
  }
  function Mf(r, i, u) {
    if (i = hm(i), hm(r) !== i && u) throw Error(s(425));
  }
  function vo() {
  }
  var ac = null, es = null;
  function _f(r, i) {
    return r === "textarea" || r === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  }
  var Df = typeof setTimeout == "function" ? setTimeout : void 0, zp = typeof clearTimeout == "function" ? clearTimeout : void 0, mm = typeof Promise == "function" ? Promise : void 0, Js = typeof queueMicrotask == "function" ? queueMicrotask : typeof mm < "u" ? function(r) {
    return mm.resolve(null).then(r).catch(kf);
  } : Df;
  function kf(r) {
    setTimeout(function() {
      throw r;
    });
  }
  function eu(r, i) {
    var u = i, d = 0;
    do {
      var y = u.nextSibling;
      if (r.removeChild(u), y && y.nodeType === 8) if (u = y.data, u === "/$") {
        if (d === 0) {
          r.removeChild(y), Ui(i);
          return;
        }
        d--;
      } else u !== "$" && u !== "$?" && u !== "$!" || d++;
      u = y;
    } while (u);
    Ui(i);
  }
  function nl(r) {
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
  function ym(r) {
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
  var ho = Math.random().toString(36).slice(2), rl = "__reactFiber$" + ho, ic = "__reactProps$" + ho, Al = "__reactContainer$" + ho, lc = "__reactEvents$" + ho, tu = "__reactListeners$" + ho, O1 = "__reactHandles$" + ho;
  function ts(r) {
    var i = r[rl];
    if (i) return i;
    for (var u = r.parentNode; u; ) {
      if (i = u[Al] || u[rl]) {
        if (u = i.alternate, i.child !== null || u !== null && u.child !== null) for (r = ym(r); r !== null; ) {
          if (u = r[rl]) return u;
          r = ym(r);
        }
        return i;
      }
      r = u, u = r.parentNode;
    }
    return null;
  }
  function At(r) {
    return r = r[rl] || r[Al], !r || r.tag !== 5 && r.tag !== 6 && r.tag !== 13 && r.tag !== 3 ? null : r;
  }
  function Pi(r) {
    if (r.tag === 5 || r.tag === 6) return r.stateNode;
    throw Error(s(33));
  }
  function er(r) {
    return r[ic] || null;
  }
  var pn = [], ci = -1;
  function fi(r) {
    return { current: r };
  }
  function Pn(r) {
    0 > ci || (r.current = pn[ci], pn[ci] = null, ci--);
  }
  function kt(r, i) {
    ci++, pn[ci] = r.current, r.current = i;
  }
  var ea = {}, ir = fi(ea), _r = fi(!1), ka = ea;
  function Oa(r, i) {
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
  function nu() {
    Pn(_r), Pn(ir);
  }
  function gm(r, i, u) {
    if (ir.current !== ea) throw Error(s(168));
    kt(ir, i), kt(_r, u);
  }
  function oc(r, i, u) {
    var d = r.stateNode;
    if (i = i.childContextTypes, typeof d.getChildContext != "function") return u;
    d = d.getChildContext();
    for (var y in d) if (!(y in i)) throw Error(s(108, He(r) || "Unknown", y));
    return ye({}, u, d);
  }
  function zr(r) {
    return r = (r = r.stateNode) && r.__reactInternalMemoizedMergedChildContext || ea, ka = ir.current, kt(ir, r), kt(_r, _r.current), !0;
  }
  function Of(r, i, u) {
    var d = r.stateNode;
    if (!d) throw Error(s(169));
    u ? (r = oc(r, i, ka), d.__reactInternalMemoizedMergedChildContext = r, Pn(_r), Pn(ir), kt(ir, r)) : Pn(_r), kt(_r, u);
  }
  var al = null, ru = !1, Ll = !1;
  function Af(r) {
    al === null ? al = [r] : al.push(r);
  }
  function mo(r) {
    ru = !0, Af(r);
  }
  function il() {
    if (!Ll && al !== null) {
      Ll = !0;
      var r = 0, i = Cn;
      try {
        var u = al;
        for (Cn = 1; r < u.length; r++) {
          var d = u[r];
          do
            d = d(!0);
          while (d !== null);
        }
        al = null, ru = !1;
      } catch (y) {
        throw al !== null && (al = al.slice(r + 1)), xn(ua, il), y;
      } finally {
        Cn = i, Ll = !1;
      }
    }
    return null;
  }
  var yo = [], go = 0, So = null, zl = 0, yr = [], di = 0, Ba = null, ll = 1, ol = "";
  function ns(r, i) {
    yo[go++] = zl, yo[go++] = So, So = r, zl = i;
  }
  function Sm(r, i, u) {
    yr[di++] = ll, yr[di++] = ol, yr[di++] = Ba, Ba = r;
    var d = ll;
    r = ol;
    var y = 32 - $r(d) - 1;
    d &= ~(1 << y), u += 1;
    var w = 32 - $r(i) + y;
    if (30 < w) {
      var O = y - y % 5;
      w = (d & (1 << O) - 1).toString(32), d >>= O, y -= O, ll = 1 << 32 - $r(i) + y | u << y | d, ol = w + r;
    } else ll = 1 << w | u << y | d, ol = r;
  }
  function Lf(r) {
    r.return !== null && (ns(r, 1), Sm(r, 1, 0));
  }
  function zf(r) {
    for (; r === So; ) So = yo[--go], yo[go] = null, zl = yo[--go], yo[go] = null;
    for (; r === Ba; ) Ba = yr[--di], yr[di] = null, ol = yr[--di], yr[di] = null, ll = yr[--di], yr[di] = null;
  }
  var Aa = null, La = null, Xn = !1, pi = null;
  function Np(r, i) {
    var u = gi(5, null, null, 0);
    u.elementType = "DELETED", u.stateNode = i, u.return = r, i = r.deletions, i === null ? (r.deletions = [u], r.flags |= 16) : i.push(u);
  }
  function Em(r, i) {
    switch (r.tag) {
      case 5:
        var u = r.type;
        return i = i.nodeType !== 1 || u.toLowerCase() !== i.nodeName.toLowerCase() ? null : i, i !== null ? (r.stateNode = i, Aa = r, La = nl(i.firstChild), !0) : !1;
      case 6:
        return i = r.pendingProps === "" || i.nodeType !== 3 ? null : i, i !== null ? (r.stateNode = i, Aa = r, La = null, !0) : !1;
      case 13:
        return i = i.nodeType !== 8 ? null : i, i !== null ? (u = Ba !== null ? { id: ll, overflow: ol } : null, r.memoizedState = { dehydrated: i, treeContext: u, retryLane: 1073741824 }, u = gi(18, null, null, 0), u.stateNode = i, u.return = r, r.child = u, Aa = r, La = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Up(r) {
    return (r.mode & 1) !== 0 && (r.flags & 128) === 0;
  }
  function jp(r) {
    if (Xn) {
      var i = La;
      if (i) {
        var u = i;
        if (!Em(r, i)) {
          if (Up(r)) throw Error(s(418));
          i = nl(u.nextSibling);
          var d = Aa;
          i && Em(r, i) ? Np(d, u) : (r.flags = r.flags & -4097 | 2, Xn = !1, Aa = r);
        }
      } else {
        if (Up(r)) throw Error(s(418));
        r.flags = r.flags & -4097 | 2, Xn = !1, Aa = r;
      }
    }
  }
  function Dr(r) {
    for (r = r.return; r !== null && r.tag !== 5 && r.tag !== 3 && r.tag !== 13; ) r = r.return;
    Aa = r;
  }
  function Nf(r) {
    if (r !== Aa) return !1;
    if (!Xn) return Dr(r), Xn = !0, !1;
    var i;
    if ((i = r.tag !== 3) && !(i = r.tag !== 5) && (i = r.type, i = i !== "head" && i !== "body" && !_f(r.type, r.memoizedProps)), i && (i = La)) {
      if (Up(r)) throw sc(), Error(s(418));
      for (; i; ) Np(r, i), i = nl(i.nextSibling);
    }
    if (Dr(r), r.tag === 13) {
      if (r = r.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(s(317));
      e: {
        for (r = r.nextSibling, i = 0; r; ) {
          if (r.nodeType === 8) {
            var u = r.data;
            if (u === "/$") {
              if (i === 0) {
                La = nl(r.nextSibling);
                break e;
              }
              i--;
            } else u !== "$" && u !== "$!" && u !== "$?" || i++;
          }
          r = r.nextSibling;
        }
        La = null;
      }
    } else La = Aa ? nl(r.stateNode.nextSibling) : null;
    return !0;
  }
  function sc() {
    for (var r = La; r; ) r = nl(r.nextSibling);
  }
  function Eo() {
    La = Aa = null, Xn = !1;
  }
  function Nl(r) {
    pi === null ? pi = [r] : pi.push(r);
  }
  var A1 = $.ReactCurrentBatchConfig;
  function rs(r, i, u) {
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
  function Uf(r, i) {
    throw r = Object.prototype.toString.call(i), Error(s(31, r === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : r));
  }
  function xm(r) {
    var i = r._init;
    return i(r._payload);
  }
  function as(r) {
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
      return ee === null || ee.tag !== 6 ? (ee = vv(pe, se.mode, je), ee.return = se, ee) : (ee = y(ee, pe), ee.return = se, ee);
    }
    function Q(se, ee, pe, je) {
      var wt = pe.type;
      return wt === B ? Ue(se, ee, pe.props.children, je, pe.key) : ee !== null && (ee.elementType === wt || typeof wt == "object" && wt !== null && wt.$$typeof === de && xm(wt) === ee.type) ? (je = y(ee, pe.props), je.ref = rs(se, ee, pe), je.return = se, je) : (je = Fc(pe.type, pe.key, pe.props, null, se.mode, je), je.ref = rs(se, ee, pe), je.return = se, je);
    }
    function me(se, ee, pe, je) {
      return ee === null || ee.tag !== 4 || ee.stateNode.containerInfo !== pe.containerInfo || ee.stateNode.implementation !== pe.implementation ? (ee = hd(pe, se.mode, je), ee.return = se, ee) : (ee = y(ee, pe.children || []), ee.return = se, ee);
    }
    function Ue(se, ee, pe, je, wt) {
      return ee === null || ee.tag !== 7 ? (ee = Hl(pe, se.mode, je, wt), ee.return = se, ee) : (ee = y(ee, pe), ee.return = se, ee);
    }
    function Ie(se, ee, pe) {
      if (typeof ee == "string" && ee !== "" || typeof ee == "number") return ee = vv("" + ee, se.mode, pe), ee.return = se, ee;
      if (typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case V:
            return pe = Fc(ee.type, ee.key, ee.props, null, se.mode, pe), pe.ref = rs(se, null, ee), pe.return = se, pe;
          case F:
            return ee = hd(ee, se.mode, pe), ee.return = se, ee;
          case de:
            var je = ee._init;
            return Ie(se, je(ee._payload), pe);
        }
        if (St(ee) || ue(ee)) return ee = Hl(ee, se.mode, pe, null), ee.return = se, ee;
        Uf(se, ee);
      }
      return null;
    }
    function Ne(se, ee, pe, je) {
      var wt = ee !== null ? ee.key : null;
      if (typeof pe == "string" && pe !== "" || typeof pe == "number") return wt !== null ? null : I(se, ee, "" + pe, je);
      if (typeof pe == "object" && pe !== null) {
        switch (pe.$$typeof) {
          case V:
            return pe.key === wt ? Q(se, ee, pe, je) : null;
          case F:
            return pe.key === wt ? me(se, ee, pe, je) : null;
          case de:
            return wt = pe._init, Ne(
              se,
              ee,
              wt(pe._payload),
              je
            );
        }
        if (St(pe) || ue(pe)) return wt !== null ? null : Ue(se, ee, pe, je, null);
        Uf(se, pe);
      }
      return null;
    }
    function pt(se, ee, pe, je, wt) {
      if (typeof je == "string" && je !== "" || typeof je == "number") return se = se.get(pe) || null, I(ee, se, "" + je, wt);
      if (typeof je == "object" && je !== null) {
        switch (je.$$typeof) {
          case V:
            return se = se.get(je.key === null ? pe : je.key) || null, Q(ee, se, je, wt);
          case F:
            return se = se.get(je.key === null ? pe : je.key) || null, me(ee, se, je, wt);
          case de:
            var jt = je._init;
            return pt(se, ee, pe, jt(je._payload), wt);
        }
        if (St(je) || ue(je)) return se = se.get(pe) || null, Ue(ee, se, je, wt, null);
        Uf(ee, je);
      }
      return null;
    }
    function xt(se, ee, pe, je) {
      for (var wt = null, jt = null, $t = ee, Wt = ee = 0, jr = null; $t !== null && Wt < pe.length; Wt++) {
        $t.index > Wt ? (jr = $t, $t = null) : jr = $t.sibling;
        var Rn = Ne(se, $t, pe[Wt], je);
        if (Rn === null) {
          $t === null && ($t = jr);
          break;
        }
        r && $t && Rn.alternate === null && i(se, $t), ee = w(Rn, ee, Wt), jt === null ? wt = Rn : jt.sibling = Rn, jt = Rn, $t = jr;
      }
      if (Wt === pe.length) return u(se, $t), Xn && ns(se, Wt), wt;
      if ($t === null) {
        for (; Wt < pe.length; Wt++) $t = Ie(se, pe[Wt], je), $t !== null && (ee = w($t, ee, Wt), jt === null ? wt = $t : jt.sibling = $t, jt = $t);
        return Xn && ns(se, Wt), wt;
      }
      for ($t = d(se, $t); Wt < pe.length; Wt++) jr = pt($t, se, Wt, pe[Wt], je), jr !== null && (r && jr.alternate !== null && $t.delete(jr.key === null ? Wt : jr.key), ee = w(jr, ee, Wt), jt === null ? wt = jr : jt.sibling = jr, jt = jr);
      return r && $t.forEach(function(Oo) {
        return i(se, Oo);
      }), Xn && ns(se, Wt), wt;
    }
    function Tt(se, ee, pe, je) {
      var wt = ue(pe);
      if (typeof wt != "function") throw Error(s(150));
      if (pe = wt.call(pe), pe == null) throw Error(s(151));
      for (var jt = wt = null, $t = ee, Wt = ee = 0, jr = null, Rn = pe.next(); $t !== null && !Rn.done; Wt++, Rn = pe.next()) {
        $t.index > Wt ? (jr = $t, $t = null) : jr = $t.sibling;
        var Oo = Ne(se, $t, Rn.value, je);
        if (Oo === null) {
          $t === null && ($t = jr);
          break;
        }
        r && $t && Oo.alternate === null && i(se, $t), ee = w(Oo, ee, Wt), jt === null ? wt = Oo : jt.sibling = Oo, jt = Oo, $t = jr;
      }
      if (Rn.done) return u(
        se,
        $t
      ), Xn && ns(se, Wt), wt;
      if ($t === null) {
        for (; !Rn.done; Wt++, Rn = pe.next()) Rn = Ie(se, Rn.value, je), Rn !== null && (ee = w(Rn, ee, Wt), jt === null ? wt = Rn : jt.sibling = Rn, jt = Rn);
        return Xn && ns(se, Wt), wt;
      }
      for ($t = d(se, $t); !Rn.done; Wt++, Rn = pe.next()) Rn = pt($t, se, Wt, Rn.value, je), Rn !== null && (r && Rn.alternate !== null && $t.delete(Rn.key === null ? Wt : Rn.key), ee = w(Rn, ee, Wt), jt === null ? wt = Rn : jt.sibling = Rn, jt = Rn);
      return r && $t.forEach(function(ry) {
        return i(se, ry);
      }), Xn && ns(se, Wt), wt;
    }
    function fr(se, ee, pe, je) {
      if (typeof pe == "object" && pe !== null && pe.type === B && pe.key === null && (pe = pe.props.children), typeof pe == "object" && pe !== null) {
        switch (pe.$$typeof) {
          case V:
            e: {
              for (var wt = pe.key, jt = ee; jt !== null; ) {
                if (jt.key === wt) {
                  if (wt = pe.type, wt === B) {
                    if (jt.tag === 7) {
                      u(se, jt.sibling), ee = y(jt, pe.props.children), ee.return = se, se = ee;
                      break e;
                    }
                  } else if (jt.elementType === wt || typeof wt == "object" && wt !== null && wt.$$typeof === de && xm(wt) === jt.type) {
                    u(se, jt.sibling), ee = y(jt, pe.props), ee.ref = rs(se, jt, pe), ee.return = se, se = ee;
                    break e;
                  }
                  u(se, jt);
                  break;
                } else i(se, jt);
                jt = jt.sibling;
              }
              pe.type === B ? (ee = Hl(pe.props.children, se.mode, je, pe.key), ee.return = se, se = ee) : (je = Fc(pe.type, pe.key, pe.props, null, se.mode, je), je.ref = rs(se, ee, pe), je.return = se, se = je);
            }
            return O(se);
          case F:
            e: {
              for (jt = pe.key; ee !== null; ) {
                if (ee.key === jt) if (ee.tag === 4 && ee.stateNode.containerInfo === pe.containerInfo && ee.stateNode.implementation === pe.implementation) {
                  u(se, ee.sibling), ee = y(ee, pe.children || []), ee.return = se, se = ee;
                  break e;
                } else {
                  u(se, ee);
                  break;
                }
                else i(se, ee);
                ee = ee.sibling;
              }
              ee = hd(pe, se.mode, je), ee.return = se, se = ee;
            }
            return O(se);
          case de:
            return jt = pe._init, fr(se, ee, jt(pe._payload), je);
        }
        if (St(pe)) return xt(se, ee, pe, je);
        if (ue(pe)) return Tt(se, ee, pe, je);
        Uf(se, pe);
      }
      return typeof pe == "string" && pe !== "" || typeof pe == "number" ? (pe = "" + pe, ee !== null && ee.tag === 6 ? (u(se, ee.sibling), ee = y(ee, pe), ee.return = se, se = ee) : (u(se, ee), ee = vv(pe, se.mode, je), ee.return = se, se = ee), O(se)) : u(se, ee);
    }
    return fr;
  }
  var or = as(!0), it = as(!1), Ga = fi(null), za = null, au = null, Fp = null;
  function Pp() {
    Fp = au = za = null;
  }
  function $p(r) {
    var i = Ga.current;
    Pn(Ga), r._currentValue = i;
  }
  function Hp(r, i, u) {
    for (; r !== null; ) {
      var d = r.alternate;
      if ((r.childLanes & i) !== i ? (r.childLanes |= i, d !== null && (d.childLanes |= i)) : d !== null && (d.childLanes & i) !== i && (d.childLanes |= i), r === u) break;
      r = r.return;
    }
  }
  function tr(r, i) {
    za = r, Fp = au = null, r = r.dependencies, r !== null && r.firstContext !== null && ((r.lanes & i) !== 0 && (Sr = !0), r.firstContext = null);
  }
  function vi(r) {
    var i = r._currentValue;
    if (Fp !== r) if (r = { context: r, memoizedValue: i, next: null }, au === null) {
      if (za === null) throw Error(s(308));
      au = r, za.dependencies = { lanes: 0, firstContext: r };
    } else au = au.next = r;
    return i;
  }
  var is = null;
  function Vp(r) {
    is === null ? is = [r] : is.push(r);
  }
  function Ip(r, i, u, d) {
    var y = i.interleaved;
    return y === null ? (u.next = u, Vp(i)) : (u.next = y.next, y.next = u), i.interleaved = u, Qa(r, d);
  }
  function Qa(r, i) {
    r.lanes |= i;
    var u = r.alternate;
    for (u !== null && (u.lanes |= i), u = r, r = r.return; r !== null; ) r.childLanes |= i, u = r.alternate, u !== null && (u.childLanes |= i), u = r, r = r.return;
    return u.tag === 3 ? u.stateNode : null;
  }
  var Xa = !1;
  function qp(r) {
    r.updateQueue = { baseState: r.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function wm(r, i) {
    r = r.updateQueue, i.updateQueue === r && (i.updateQueue = { baseState: r.baseState, firstBaseUpdate: r.firstBaseUpdate, lastBaseUpdate: r.lastBaseUpdate, shared: r.shared, effects: r.effects });
  }
  function Ul(r, i) {
    return { eventTime: r, lane: i, tag: 0, payload: null, callback: null, next: null };
  }
  function xo(r, i, u) {
    var d = r.updateQueue;
    if (d === null) return null;
    if (d = d.shared, (vn & 2) !== 0) {
      var y = d.pending;
      return y === null ? i.next = i : (i.next = y.next, y.next = i), d.pending = i, Qa(r, u);
    }
    return y = d.interleaved, y === null ? (i.next = i, Vp(d)) : (i.next = y.next, y.next = i), d.interleaved = i, Qa(r, u);
  }
  function jf(r, i, u) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (u & 4194240) !== 0)) {
      var d = i.lanes;
      d &= r.pendingLanes, u |= d, i.lanes = u, Ml(r, u);
    }
  }
  function Cm(r, i) {
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
  function uc(r, i, u, d) {
    var y = r.updateQueue;
    Xa = !1;
    var w = y.firstBaseUpdate, O = y.lastBaseUpdate, I = y.shared.pending;
    if (I !== null) {
      y.shared.pending = null;
      var Q = I, me = Q.next;
      Q.next = null, O === null ? w = me : O.next = me, O = Q;
      var Ue = r.alternate;
      Ue !== null && (Ue = Ue.updateQueue, I = Ue.lastBaseUpdate, I !== O && (I === null ? Ue.firstBaseUpdate = me : I.next = me, Ue.lastBaseUpdate = Q));
    }
    if (w !== null) {
      var Ie = y.baseState;
      O = 0, Ue = me = Q = null, I = w;
      do {
        var Ne = I.lane, pt = I.eventTime;
        if ((d & Ne) === Ne) {
          Ue !== null && (Ue = Ue.next = {
            eventTime: pt,
            lane: 0,
            tag: I.tag,
            payload: I.payload,
            callback: I.callback,
            next: null
          });
          e: {
            var xt = r, Tt = I;
            switch (Ne = i, pt = u, Tt.tag) {
              case 1:
                if (xt = Tt.payload, typeof xt == "function") {
                  Ie = xt.call(pt, Ie, Ne);
                  break e;
                }
                Ie = xt;
                break e;
              case 3:
                xt.flags = xt.flags & -65537 | 128;
              case 0:
                if (xt = Tt.payload, Ne = typeof xt == "function" ? xt.call(pt, Ie, Ne) : xt, Ne == null) break e;
                Ie = ye({}, Ie, Ne);
                break e;
              case 2:
                Xa = !0;
            }
          }
          I.callback !== null && I.lane !== 0 && (r.flags |= 64, Ne = y.effects, Ne === null ? y.effects = [I] : Ne.push(I));
        } else pt = { eventTime: pt, lane: Ne, tag: I.tag, payload: I.payload, callback: I.callback, next: null }, Ue === null ? (me = Ue = pt, Q = Ie) : Ue = Ue.next = pt, O |= Ne;
        if (I = I.next, I === null) {
          if (I = y.shared.pending, I === null) break;
          Ne = I, I = Ne.next, Ne.next = null, y.lastBaseUpdate = Ne, y.shared.pending = null;
        }
      } while (!0);
      if (Ue === null && (Q = Ie), y.baseState = Q, y.firstBaseUpdate = me, y.lastBaseUpdate = Ue, i = y.shared.interleaved, i !== null) {
        y = i;
        do
          O |= y.lane, y = y.next;
        while (y !== i);
      } else w === null && (y.shared.lanes = 0);
      dl |= O, r.lanes = O, r.memoizedState = Ie;
    }
  }
  function Yp(r, i, u) {
    if (r = i.effects, i.effects = null, r !== null) for (i = 0; i < r.length; i++) {
      var d = r[i], y = d.callback;
      if (y !== null) {
        if (d.callback = null, d = u, typeof y != "function") throw Error(s(191, y));
        y.call(d);
      }
    }
  }
  var cc = {}, sl = fi(cc), fc = fi(cc), dc = fi(cc);
  function ls(r) {
    if (r === cc) throw Error(s(174));
    return r;
  }
  function Wp(r, i) {
    switch (kt(dc, i), kt(fc, r), kt(sl, cc), r = i.nodeType, r) {
      case 9:
      case 11:
        i = (i = i.documentElement) ? i.namespaceURI : ut(null, "");
        break;
      default:
        r = r === 8 ? i.parentNode : i, i = r.namespaceURI || null, r = r.tagName, i = ut(i, r);
    }
    Pn(sl), kt(sl, i);
  }
  function os() {
    Pn(sl), Pn(fc), Pn(dc);
  }
  function bm(r) {
    ls(dc.current);
    var i = ls(sl.current), u = ut(i, r.type);
    i !== u && (kt(fc, r), kt(sl, u));
  }
  function Ff(r) {
    fc.current === r && (Pn(sl), Pn(fc));
  }
  var nr = fi(0);
  function Pf(r) {
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
  var pc = [];
  function Lt() {
    for (var r = 0; r < pc.length; r++) pc[r]._workInProgressVersionPrimary = null;
    pc.length = 0;
  }
  var ln = $.ReactCurrentDispatcher, bn = $.ReactCurrentBatchConfig, zn = 0, Tn = null, gr = null, Nr = null, $f = !1, vc = !1, ss = 0, Le = 0;
  function wn() {
    throw Error(s(321));
  }
  function Ht(r, i) {
    if (i === null) return !1;
    for (var u = 0; u < i.length && u < r.length; u++) if (!Fi(r[u], i[u])) return !1;
    return !0;
  }
  function wo(r, i, u, d, y, w) {
    if (zn = w, Tn = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, ln.current = r === null || r.memoizedState === null ? td : Ec, r = u(d, y), vc) {
      w = 0;
      do {
        if (vc = !1, ss = 0, 25 <= w) throw Error(s(301));
        w += 1, Nr = gr = null, i.updateQueue = null, ln.current = nd, r = u(d, y);
      } while (vc);
    }
    if (ln.current = ps, i = gr !== null && gr.next !== null, zn = 0, Nr = gr = Tn = null, $f = !1, i) throw Error(s(300));
    return r;
  }
  function $i() {
    var r = ss !== 0;
    return ss = 0, r;
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
  function jl(r, i) {
    return typeof i == "function" ? i(r) : i;
  }
  function Co(r) {
    var i = sr(), u = i.queue;
    if (u === null) throw Error(s(311));
    u.lastRenderedReducer = r;
    var d = gr, y = d.baseQueue, w = u.pending;
    if (w !== null) {
      if (y !== null) {
        var O = y.next;
        y.next = w.next, w.next = O;
      }
      d.baseQueue = y = w, u.pending = null;
    }
    if (y !== null) {
      w = y.next, d = d.baseState;
      var I = O = null, Q = null, me = w;
      do {
        var Ue = me.lane;
        if ((zn & Ue) === Ue) Q !== null && (Q = Q.next = { lane: 0, action: me.action, hasEagerState: me.hasEagerState, eagerState: me.eagerState, next: null }), d = me.hasEagerState ? me.eagerState : r(d, me.action);
        else {
          var Ie = {
            lane: Ue,
            action: me.action,
            hasEagerState: me.hasEagerState,
            eagerState: me.eagerState,
            next: null
          };
          Q === null ? (I = Q = Ie, O = d) : Q = Q.next = Ie, Tn.lanes |= Ue, dl |= Ue;
        }
        me = me.next;
      } while (me !== null && me !== w);
      Q === null ? O = d : Q.next = I, Fi(d, i.memoizedState) || (Sr = !0), i.memoizedState = d, i.baseState = O, i.baseQueue = Q, u.lastRenderedState = d;
    }
    if (r = u.interleaved, r !== null) {
      y = r;
      do
        w = y.lane, Tn.lanes |= w, dl |= w, y = y.next;
      while (y !== r);
    } else y === null && (u.lanes = 0);
    return [i.memoizedState, u.dispatch];
  }
  function us(r) {
    var i = sr(), u = i.queue;
    if (u === null) throw Error(s(311));
    u.lastRenderedReducer = r;
    var d = u.dispatch, y = u.pending, w = i.memoizedState;
    if (y !== null) {
      u.pending = null;
      var O = y = y.next;
      do
        w = r(w, O.action), O = O.next;
      while (O !== y);
      Fi(w, i.memoizedState) || (Sr = !0), i.memoizedState = w, i.baseQueue === null && (i.baseState = w), u.lastRenderedState = w;
    }
    return [w, d];
  }
  function Hf() {
  }
  function Vf(r, i) {
    var u = Tn, d = sr(), y = i(), w = !Fi(d.memoizedState, y);
    if (w && (d.memoizedState = y, Sr = !0), d = d.queue, hc(Yf.bind(null, u, d, r), [r]), d.getSnapshot !== i || w || Nr !== null && Nr.memoizedState.tag & 1) {
      if (u.flags |= 2048, cs(9, qf.bind(null, u, d, y, i), void 0, null), kr === null) throw Error(s(349));
      (zn & 30) !== 0 || If(u, i, y);
    }
    return y;
  }
  function If(r, i, u) {
    r.flags |= 16384, r = { getSnapshot: i, value: u }, i = Tn.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Tn.updateQueue = i, i.stores = [r]) : (u = i.stores, u === null ? i.stores = [r] : u.push(r));
  }
  function qf(r, i, u, d) {
    i.value = u, i.getSnapshot = d, Wf(i) && Bf(r);
  }
  function Yf(r, i, u) {
    return u(function() {
      Wf(i) && Bf(r);
    });
  }
  function Wf(r) {
    var i = r.getSnapshot;
    r = r.value;
    try {
      var u = i();
      return !Fi(r, u);
    } catch {
      return !0;
    }
  }
  function Bf(r) {
    var i = Qa(r, 1);
    i !== null && ma(i, r, 1, -1);
  }
  function Gf(r) {
    var i = ta();
    return typeof r == "function" && (r = r()), i.memoizedState = i.baseState = r, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: jl, lastRenderedState: r }, i.queue = r, r = r.dispatch = ds.bind(null, Tn, r), [i.memoizedState, r];
  }
  function cs(r, i, u, d) {
    return r = { tag: r, create: i, destroy: u, deps: d, next: null }, i = Tn.updateQueue, i === null ? (i = { lastEffect: null, stores: null }, Tn.updateQueue = i, i.lastEffect = r.next = r) : (u = i.lastEffect, u === null ? i.lastEffect = r.next = r : (d = u.next, u.next = r, r.next = d, i.lastEffect = r)), r;
  }
  function Qf() {
    return sr().memoizedState;
  }
  function iu(r, i, u, d) {
    var y = ta();
    Tn.flags |= r, y.memoizedState = cs(1 | i, u, void 0, d === void 0 ? null : d);
  }
  function lu(r, i, u, d) {
    var y = sr();
    d = d === void 0 ? null : d;
    var w = void 0;
    if (gr !== null) {
      var O = gr.memoizedState;
      if (w = O.destroy, d !== null && Ht(d, O.deps)) {
        y.memoizedState = cs(i, u, w, d);
        return;
      }
    }
    Tn.flags |= r, y.memoizedState = cs(1 | i, u, w, d);
  }
  function Xf(r, i) {
    return iu(8390656, 8, r, i);
  }
  function hc(r, i) {
    return lu(2048, 8, r, i);
  }
  function Kf(r, i) {
    return lu(4, 2, r, i);
  }
  function mc(r, i) {
    return lu(4, 4, r, i);
  }
  function fs(r, i) {
    if (typeof i == "function") return r = r(), i(r), function() {
      i(null);
    };
    if (i != null) return r = r(), i.current = r, function() {
      i.current = null;
    };
  }
  function Zf(r, i, u) {
    return u = u != null ? u.concat([r]) : null, lu(4, 4, fs.bind(null, i, r), u);
  }
  function yc() {
  }
  function Jf(r, i) {
    var u = sr();
    i = i === void 0 ? null : i;
    var d = u.memoizedState;
    return d !== null && i !== null && Ht(i, d[1]) ? d[0] : (u.memoizedState = [r, i], r);
  }
  function ed(r, i) {
    var u = sr();
    i = i === void 0 ? null : i;
    var d = u.memoizedState;
    return d !== null && i !== null && Ht(i, d[1]) ? d[0] : (r = r(), u.memoizedState = [r, i], r);
  }
  function Bp(r, i, u) {
    return (zn & 21) === 0 ? (r.baseState && (r.baseState = !1, Sr = !0), r.memoizedState = u) : (Fi(u, i) || (u = Ps(), Tn.lanes |= u, dl |= u, r.baseState = !0), i);
  }
  function gc(r, i) {
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
  function Gp() {
    return sr().memoizedState;
  }
  function Sc(r, i, u) {
    var d = pl(r);
    if (u = { lane: d, action: u, hasEagerState: !1, eagerState: null, next: null }, Na(r)) Tm(i, u);
    else if (u = Ip(r, i, u, d), u !== null) {
      var y = wr();
      ma(u, r, d, y), jn(u, i, d);
    }
  }
  function ds(r, i, u) {
    var d = pl(r), y = { lane: d, action: u, hasEagerState: !1, eagerState: null, next: null };
    if (Na(r)) Tm(i, y);
    else {
      var w = r.alternate;
      if (r.lanes === 0 && (w === null || w.lanes === 0) && (w = i.lastRenderedReducer, w !== null)) try {
        var O = i.lastRenderedState, I = w(O, u);
        if (y.hasEagerState = !0, y.eagerState = I, Fi(I, O)) {
          var Q = i.interleaved;
          Q === null ? (y.next = y, Vp(i)) : (y.next = Q.next, Q.next = y), i.interleaved = y;
          return;
        }
      } catch {
      }
      u = Ip(r, i, y, d), u !== null && (y = wr(), ma(u, r, d, y), jn(u, i, d));
    }
  }
  function Na(r) {
    var i = r.alternate;
    return r === Tn || i !== null && i === Tn;
  }
  function Tm(r, i) {
    vc = $f = !0;
    var u = r.pending;
    u === null ? i.next = i : (i.next = u.next, u.next = i), r.pending = i;
  }
  function jn(r, i, u) {
    if ((u & 4194240) !== 0) {
      var d = i.lanes;
      d &= r.pendingLanes, u |= d, i.lanes = u, Ml(r, u);
    }
  }
  var ps = { readContext: vi, useCallback: wn, useContext: wn, useEffect: wn, useImperativeHandle: wn, useInsertionEffect: wn, useLayoutEffect: wn, useMemo: wn, useReducer: wn, useRef: wn, useState: wn, useDebugValue: wn, useDeferredValue: wn, useTransition: wn, useMutableSource: wn, useSyncExternalStore: wn, useId: wn, unstable_isNewReconciler: !1 }, td = { readContext: vi, useCallback: function(r, i) {
    return ta().memoizedState = [r, i === void 0 ? null : i], r;
  }, useContext: vi, useEffect: Xf, useImperativeHandle: function(r, i, u) {
    return u = u != null ? u.concat([r]) : null, iu(
      4194308,
      4,
      fs.bind(null, i, r),
      u
    );
  }, useLayoutEffect: function(r, i) {
    return iu(4194308, 4, r, i);
  }, useInsertionEffect: function(r, i) {
    return iu(4, 2, r, i);
  }, useMemo: function(r, i) {
    var u = ta();
    return i = i === void 0 ? null : i, r = r(), u.memoizedState = [r, i], r;
  }, useReducer: function(r, i, u) {
    var d = ta();
    return i = u !== void 0 ? u(i) : i, d.memoizedState = d.baseState = i, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: r, lastRenderedState: i }, d.queue = r, r = r.dispatch = Sc.bind(null, Tn, r), [d.memoizedState, r];
  }, useRef: function(r) {
    var i = ta();
    return r = { current: r }, i.memoizedState = r;
  }, useState: Gf, useDebugValue: yc, useDeferredValue: function(r) {
    return ta().memoizedState = r;
  }, useTransition: function() {
    var r = Gf(!1), i = r[0];
    return r = gc.bind(null, r[1]), ta().memoizedState = r, [i, r];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(r, i, u) {
    var d = Tn, y = ta();
    if (Xn) {
      if (u === void 0) throw Error(s(407));
      u = u();
    } else {
      if (u = i(), kr === null) throw Error(s(349));
      (zn & 30) !== 0 || If(d, i, u);
    }
    y.memoizedState = u;
    var w = { value: u, getSnapshot: i };
    return y.queue = w, Xf(Yf.bind(
      null,
      d,
      w,
      r
    ), [r]), d.flags |= 2048, cs(9, qf.bind(null, d, w, u, i), void 0, null), u;
  }, useId: function() {
    var r = ta(), i = kr.identifierPrefix;
    if (Xn) {
      var u = ol, d = ll;
      u = (d & ~(1 << 32 - $r(d) - 1)).toString(32) + u, i = ":" + i + "R" + u, u = ss++, 0 < u && (i += "H" + u.toString(32)), i += ":";
    } else u = Le++, i = ":" + i + "r" + u.toString(32) + ":";
    return r.memoizedState = i;
  }, unstable_isNewReconciler: !1 }, Ec = {
    readContext: vi,
    useCallback: Jf,
    useContext: vi,
    useEffect: hc,
    useImperativeHandle: Zf,
    useInsertionEffect: Kf,
    useLayoutEffect: mc,
    useMemo: ed,
    useReducer: Co,
    useRef: Qf,
    useState: function() {
      return Co(jl);
    },
    useDebugValue: yc,
    useDeferredValue: function(r) {
      var i = sr();
      return Bp(i, gr.memoizedState, r);
    },
    useTransition: function() {
      var r = Co(jl)[0], i = sr().memoizedState;
      return [r, i];
    },
    useMutableSource: Hf,
    useSyncExternalStore: Vf,
    useId: Gp,
    unstable_isNewReconciler: !1
  }, nd = { readContext: vi, useCallback: Jf, useContext: vi, useEffect: hc, useImperativeHandle: Zf, useInsertionEffect: Kf, useLayoutEffect: mc, useMemo: ed, useReducer: us, useRef: Qf, useState: function() {
    return us(jl);
  }, useDebugValue: yc, useDeferredValue: function(r) {
    var i = sr();
    return gr === null ? i.memoizedState = r : Bp(i, gr.memoizedState, r);
  }, useTransition: function() {
    var r = us(jl)[0], i = sr().memoizedState;
    return [r, i];
  }, useMutableSource: Hf, useSyncExternalStore: Vf, useId: Gp, unstable_isNewReconciler: !1 };
  function Hi(r, i) {
    if (r && r.defaultProps) {
      i = ye({}, i), r = r.defaultProps;
      for (var u in r) i[u] === void 0 && (i[u] = r[u]);
      return i;
    }
    return i;
  }
  function Qp(r, i, u, d) {
    i = r.memoizedState, u = u(d, i), u = u == null ? i : ye({}, i, u), r.memoizedState = u, r.lanes === 0 && (r.updateQueue.baseState = u);
  }
  var rd = { isMounted: function(r) {
    return (r = r._reactInternals) ? qt(r) === r : !1;
  }, enqueueSetState: function(r, i, u) {
    r = r._reactInternals;
    var d = wr(), y = pl(r), w = Ul(d, y);
    w.payload = i, u != null && (w.callback = u), i = xo(r, w, y), i !== null && (ma(i, r, y, d), jf(i, r, y));
  }, enqueueReplaceState: function(r, i, u) {
    r = r._reactInternals;
    var d = wr(), y = pl(r), w = Ul(d, y);
    w.tag = 1, w.payload = i, u != null && (w.callback = u), i = xo(r, w, y), i !== null && (ma(i, r, y, d), jf(i, r, y));
  }, enqueueForceUpdate: function(r, i) {
    r = r._reactInternals;
    var u = wr(), d = pl(r), y = Ul(u, d);
    y.tag = 2, i != null && (y.callback = i), i = xo(r, y, d), i !== null && (ma(i, r, d, u), jf(i, r, d));
  } };
  function Rm(r, i, u, d, y, w, O) {
    return r = r.stateNode, typeof r.shouldComponentUpdate == "function" ? r.shouldComponentUpdate(d, w, O) : i.prototype && i.prototype.isPureReactComponent ? !Ju(u, d) || !Ju(y, w) : !0;
  }
  function ad(r, i, u) {
    var d = !1, y = ea, w = i.contextType;
    return typeof w == "object" && w !== null ? w = vi(w) : (y = mr(i) ? ka : ir.current, d = i.contextTypes, w = (d = d != null) ? Oa(r, y) : ea), i = new i(u, w), r.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = rd, r.stateNode = i, i._reactInternals = r, d && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = y, r.__reactInternalMemoizedMaskedChildContext = w), i;
  }
  function Mm(r, i, u, d) {
    r = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(u, d), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(u, d), i.state !== r && rd.enqueueReplaceState(i, i.state, null);
  }
  function xc(r, i, u, d) {
    var y = r.stateNode;
    y.props = u, y.state = r.memoizedState, y.refs = {}, qp(r);
    var w = i.contextType;
    typeof w == "object" && w !== null ? y.context = vi(w) : (w = mr(i) ? ka : ir.current, y.context = Oa(r, w)), y.state = r.memoizedState, w = i.getDerivedStateFromProps, typeof w == "function" && (Qp(r, i, w, u), y.state = r.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof y.getSnapshotBeforeUpdate == "function" || typeof y.UNSAFE_componentWillMount != "function" && typeof y.componentWillMount != "function" || (i = y.state, typeof y.componentWillMount == "function" && y.componentWillMount(), typeof y.UNSAFE_componentWillMount == "function" && y.UNSAFE_componentWillMount(), i !== y.state && rd.enqueueReplaceState(y, y.state, null), uc(r, u, y, d), y.state = r.memoizedState), typeof y.componentDidMount == "function" && (r.flags |= 4194308);
  }
  function vs(r, i) {
    try {
      var u = "", d = i;
      do
        u += $e(d), d = d.return;
      while (d);
      var y = u;
    } catch (w) {
      y = `
Error generating stack: ` + w.message + `
` + w.stack;
    }
    return { value: r, source: i, stack: y, digest: null };
  }
  function Xp(r, i, u) {
    return { value: r, source: null, stack: u ?? null, digest: i ?? null };
  }
  function Kp(r, i) {
    try {
      console.error(i.value);
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  var id = typeof WeakMap == "function" ? WeakMap : Map;
  function _m(r, i, u) {
    u = Ul(-1, u), u.tag = 3, u.payload = { element: null };
    var d = i.value;
    return u.callback = function() {
      du || (du = !0, ys = d), Kp(r, i);
    }, u;
  }
  function Zp(r, i, u) {
    u = Ul(-1, u), u.tag = 3;
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var y = i.value;
      u.payload = function() {
        return d(y);
      }, u.callback = function() {
        Kp(r, i);
      };
    }
    var w = r.stateNode;
    return w !== null && typeof w.componentDidCatch == "function" && (u.callback = function() {
      Kp(r, i), typeof d != "function" && (Ro === null ? Ro = /* @__PURE__ */ new Set([this]) : Ro.add(this));
      var O = i.stack;
      this.componentDidCatch(i.value, { componentStack: O !== null ? O : "" });
    }), u;
  }
  function Jp(r, i, u) {
    var d = r.pingCache;
    if (d === null) {
      d = r.pingCache = new id();
      var y = /* @__PURE__ */ new Set();
      d.set(i, y);
    } else y = d.get(i), y === void 0 && (y = /* @__PURE__ */ new Set(), d.set(i, y));
    y.has(u) || (y.add(u), r = P1.bind(null, r, i, u), i.then(r, r));
  }
  function Dm(r) {
    do {
      var i;
      if ((i = r.tag === 13) && (i = r.memoizedState, i = i !== null ? i.dehydrated !== null : !0), i) return r;
      r = r.return;
    } while (r !== null);
    return null;
  }
  function bo(r, i, u, d, y) {
    return (r.mode & 1) === 0 ? (r === i ? r.flags |= 65536 : (r.flags |= 128, u.flags |= 131072, u.flags &= -52805, u.tag === 1 && (u.alternate === null ? u.tag = 17 : (i = Ul(-1, 1), i.tag = 2, xo(u, i, 1))), u.lanes |= 1), r) : (r.flags |= 65536, r.lanes = y, r);
  }
  var wc = $.ReactCurrentOwner, Sr = !1;
  function Ir(r, i, u, d) {
    i.child = r === null ? it(i, null, u, d) : or(i, r.child, u, d);
  }
  function Ua(r, i, u, d, y) {
    u = u.render;
    var w = i.ref;
    return tr(i, y), d = wo(r, i, u, d, w, y), u = $i(), r !== null && !Sr ? (i.updateQueue = r.updateQueue, i.flags &= -2053, r.lanes &= ~y, mi(r, i, y)) : (Xn && u && Lf(i), i.flags |= 1, Ir(r, i, d, y), i.child);
  }
  function hs(r, i, u, d, y) {
    if (r === null) {
      var w = u.type;
      return typeof w == "function" && !pv(w) && w.defaultProps === void 0 && u.compare === null && u.defaultProps === void 0 ? (i.tag = 15, i.type = w, en(r, i, w, d, y)) : (r = Fc(u.type, null, d, i, i.mode, y), r.ref = i.ref, r.return = i, i.child = r);
    }
    if (w = r.child, (r.lanes & y) === 0) {
      var O = w.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Ju, u(O, d) && r.ref === i.ref) return mi(r, i, y);
    }
    return i.flags |= 1, r = _o(w, d), r.ref = i.ref, r.return = i, i.child = r;
  }
  function en(r, i, u, d, y) {
    if (r !== null) {
      var w = r.memoizedProps;
      if (Ju(w, d) && r.ref === i.ref) if (Sr = !1, i.pendingProps = d = w, (r.lanes & y) !== 0) (r.flags & 131072) !== 0 && (Sr = !0);
      else return i.lanes = r.lanes, mi(r, i, y);
    }
    return km(r, i, u, d, y);
  }
  function Cc(r, i, u) {
    var d = i.pendingProps, y = d.children, w = r !== null ? r.memoizedState : null;
    if (d.mode === "hidden") if ((i.mode & 1) === 0) i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, kt(uu, Ka), Ka |= u;
    else {
      if ((u & 1073741824) === 0) return r = w !== null ? w.baseLanes | u : u, i.lanes = i.childLanes = 1073741824, i.memoizedState = { baseLanes: r, cachePool: null, transitions: null }, i.updateQueue = null, kt(uu, Ka), Ka |= r, null;
      i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, d = w !== null ? w.baseLanes : u, kt(uu, Ka), Ka |= d;
    }
    else w !== null ? (d = w.baseLanes | u, i.memoizedState = null) : d = u, kt(uu, Ka), Ka |= d;
    return Ir(r, i, y, u), i.child;
  }
  function ev(r, i) {
    var u = i.ref;
    (r === null && u !== null || r !== null && r.ref !== u) && (i.flags |= 512, i.flags |= 2097152);
  }
  function km(r, i, u, d, y) {
    var w = mr(u) ? ka : ir.current;
    return w = Oa(i, w), tr(i, y), u = wo(r, i, u, d, w, y), d = $i(), r !== null && !Sr ? (i.updateQueue = r.updateQueue, i.flags &= -2053, r.lanes &= ~y, mi(r, i, y)) : (Xn && d && Lf(i), i.flags |= 1, Ir(r, i, u, y), i.child);
  }
  function Om(r, i, u, d, y) {
    if (mr(u)) {
      var w = !0;
      zr(i);
    } else w = !1;
    if (tr(i, y), i.stateNode === null) hi(r, i), ad(i, u, d), xc(i, u, d, y), d = !0;
    else if (r === null) {
      var O = i.stateNode, I = i.memoizedProps;
      O.props = I;
      var Q = O.context, me = u.contextType;
      typeof me == "object" && me !== null ? me = vi(me) : (me = mr(u) ? ka : ir.current, me = Oa(i, me));
      var Ue = u.getDerivedStateFromProps, Ie = typeof Ue == "function" || typeof O.getSnapshotBeforeUpdate == "function";
      Ie || typeof O.UNSAFE_componentWillReceiveProps != "function" && typeof O.componentWillReceiveProps != "function" || (I !== d || Q !== me) && Mm(i, O, d, me), Xa = !1;
      var Ne = i.memoizedState;
      O.state = Ne, uc(i, d, O, y), Q = i.memoizedState, I !== d || Ne !== Q || _r.current || Xa ? (typeof Ue == "function" && (Qp(i, u, Ue, d), Q = i.memoizedState), (I = Xa || Rm(i, u, I, d, Ne, Q, me)) ? (Ie || typeof O.UNSAFE_componentWillMount != "function" && typeof O.componentWillMount != "function" || (typeof O.componentWillMount == "function" && O.componentWillMount(), typeof O.UNSAFE_componentWillMount == "function" && O.UNSAFE_componentWillMount()), typeof O.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof O.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = d, i.memoizedState = Q), O.props = d, O.state = Q, O.context = me, d = I) : (typeof O.componentDidMount == "function" && (i.flags |= 4194308), d = !1);
    } else {
      O = i.stateNode, wm(r, i), I = i.memoizedProps, me = i.type === i.elementType ? I : Hi(i.type, I), O.props = me, Ie = i.pendingProps, Ne = O.context, Q = u.contextType, typeof Q == "object" && Q !== null ? Q = vi(Q) : (Q = mr(u) ? ka : ir.current, Q = Oa(i, Q));
      var pt = u.getDerivedStateFromProps;
      (Ue = typeof pt == "function" || typeof O.getSnapshotBeforeUpdate == "function") || typeof O.UNSAFE_componentWillReceiveProps != "function" && typeof O.componentWillReceiveProps != "function" || (I !== Ie || Ne !== Q) && Mm(i, O, d, Q), Xa = !1, Ne = i.memoizedState, O.state = Ne, uc(i, d, O, y);
      var xt = i.memoizedState;
      I !== Ie || Ne !== xt || _r.current || Xa ? (typeof pt == "function" && (Qp(i, u, pt, d), xt = i.memoizedState), (me = Xa || Rm(i, u, me, d, Ne, xt, Q) || !1) ? (Ue || typeof O.UNSAFE_componentWillUpdate != "function" && typeof O.componentWillUpdate != "function" || (typeof O.componentWillUpdate == "function" && O.componentWillUpdate(d, xt, Q), typeof O.UNSAFE_componentWillUpdate == "function" && O.UNSAFE_componentWillUpdate(d, xt, Q)), typeof O.componentDidUpdate == "function" && (i.flags |= 4), typeof O.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof O.componentDidUpdate != "function" || I === r.memoizedProps && Ne === r.memoizedState || (i.flags |= 4), typeof O.getSnapshotBeforeUpdate != "function" || I === r.memoizedProps && Ne === r.memoizedState || (i.flags |= 1024), i.memoizedProps = d, i.memoizedState = xt), O.props = d, O.state = xt, O.context = Q, d = me) : (typeof O.componentDidUpdate != "function" || I === r.memoizedProps && Ne === r.memoizedState || (i.flags |= 4), typeof O.getSnapshotBeforeUpdate != "function" || I === r.memoizedProps && Ne === r.memoizedState || (i.flags |= 1024), d = !1);
    }
    return bc(r, i, u, d, w, y);
  }
  function bc(r, i, u, d, y, w) {
    ev(r, i);
    var O = (i.flags & 128) !== 0;
    if (!d && !O) return y && Of(i, u, !1), mi(r, i, w);
    d = i.stateNode, wc.current = i;
    var I = O && typeof u.getDerivedStateFromError != "function" ? null : d.render();
    return i.flags |= 1, r !== null && O ? (i.child = or(i, r.child, null, w), i.child = or(i, null, I, w)) : Ir(r, i, I, w), i.memoizedState = d.state, y && Of(i, u, !0), i.child;
  }
  function ou(r) {
    var i = r.stateNode;
    i.pendingContext ? gm(r, i.pendingContext, i.pendingContext !== i.context) : i.context && gm(r, i.context, !1), Wp(r, i.containerInfo);
  }
  function Am(r, i, u, d, y) {
    return Eo(), Nl(y), i.flags |= 256, Ir(r, i, u, d), i.child;
  }
  var ld = { dehydrated: null, treeContext: null, retryLane: 0 };
  function tv(r) {
    return { baseLanes: r, cachePool: null, transitions: null };
  }
  function od(r, i, u) {
    var d = i.pendingProps, y = nr.current, w = !1, O = (i.flags & 128) !== 0, I;
    if ((I = O) || (I = r !== null && r.memoizedState === null ? !1 : (y & 2) !== 0), I ? (w = !0, i.flags &= -129) : (r === null || r.memoizedState !== null) && (y |= 1), kt(nr, y & 1), r === null)
      return jp(i), r = i.memoizedState, r !== null && (r = r.dehydrated, r !== null) ? ((i.mode & 1) === 0 ? i.lanes = 1 : r.data === "$!" ? i.lanes = 8 : i.lanes = 1073741824, null) : (O = d.children, r = d.fallback, w ? (d = i.mode, w = i.child, O = { mode: "hidden", children: O }, (d & 1) === 0 && w !== null ? (w.childLanes = 0, w.pendingProps = O) : w = Do(O, d, 0, null), r = Hl(r, d, u, null), w.return = i, r.return = i, w.sibling = r, i.child = w, i.child.memoizedState = tv(u), i.memoizedState = ld, r) : nv(i, O));
    if (y = r.memoizedState, y !== null && (I = y.dehydrated, I !== null)) return Lm(r, i, O, d, I, y, u);
    if (w) {
      w = d.fallback, O = i.mode, y = r.child, I = y.sibling;
      var Q = { mode: "hidden", children: d.children };
      return (O & 1) === 0 && i.child !== y ? (d = i.child, d.childLanes = 0, d.pendingProps = Q, i.deletions = null) : (d = _o(y, Q), d.subtreeFlags = y.subtreeFlags & 14680064), I !== null ? w = _o(I, w) : (w = Hl(w, O, u, null), w.flags |= 2), w.return = i, d.return = i, d.sibling = w, i.child = d, d = w, w = i.child, O = r.child.memoizedState, O = O === null ? tv(u) : { baseLanes: O.baseLanes | u, cachePool: null, transitions: O.transitions }, w.memoizedState = O, w.childLanes = r.childLanes & ~u, i.memoizedState = ld, d;
    }
    return w = r.child, r = w.sibling, d = _o(w, { mode: "visible", children: d.children }), (i.mode & 1) === 0 && (d.lanes = u), d.return = i, d.sibling = null, r !== null && (u = i.deletions, u === null ? (i.deletions = [r], i.flags |= 16) : u.push(r)), i.child = d, i.memoizedState = null, d;
  }
  function nv(r, i) {
    return i = Do({ mode: "visible", children: i }, r.mode, 0, null), i.return = r, r.child = i;
  }
  function Tc(r, i, u, d) {
    return d !== null && Nl(d), or(i, r.child, null, u), r = nv(i, i.pendingProps.children), r.flags |= 2, i.memoizedState = null, r;
  }
  function Lm(r, i, u, d, y, w, O) {
    if (u)
      return i.flags & 256 ? (i.flags &= -257, d = Xp(Error(s(422))), Tc(r, i, O, d)) : i.memoizedState !== null ? (i.child = r.child, i.flags |= 128, null) : (w = d.fallback, y = i.mode, d = Do({ mode: "visible", children: d.children }, y, 0, null), w = Hl(w, y, O, null), w.flags |= 2, d.return = i, w.return = i, d.sibling = w, i.child = d, (i.mode & 1) !== 0 && or(i, r.child, null, O), i.child.memoizedState = tv(O), i.memoizedState = ld, w);
    if ((i.mode & 1) === 0) return Tc(r, i, O, null);
    if (y.data === "$!") {
      if (d = y.nextSibling && y.nextSibling.dataset, d) var I = d.dgst;
      return d = I, w = Error(s(419)), d = Xp(w, d, void 0), Tc(r, i, O, d);
    }
    if (I = (O & r.childLanes) !== 0, Sr || I) {
      if (d = kr, d !== null) {
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
      return dv(), d = Xp(Error(s(421))), Tc(r, i, O, d);
    }
    return y.data === "$?" ? (i.flags |= 128, i.child = r.child, i = $1.bind(null, r), y._reactRetry = i, null) : (r = w.treeContext, La = nl(y.nextSibling), Aa = i, Xn = !0, pi = null, r !== null && (yr[di++] = ll, yr[di++] = ol, yr[di++] = Ba, ll = r.id, ol = r.overflow, Ba = i), i = nv(i, d.children), i.flags |= 4096, i);
  }
  function rv(r, i, u) {
    r.lanes |= i;
    var d = r.alternate;
    d !== null && (d.lanes |= i), Hp(r.return, i, u);
  }
  function pa(r, i, u, d, y) {
    var w = r.memoizedState;
    w === null ? r.memoizedState = { isBackwards: i, rendering: null, renderingStartTime: 0, last: d, tail: u, tailMode: y } : (w.isBackwards = i, w.rendering = null, w.renderingStartTime = 0, w.last = d, w.tail = u, w.tailMode = y);
  }
  function ul(r, i, u) {
    var d = i.pendingProps, y = d.revealOrder, w = d.tail;
    if (Ir(r, i, d.children, u), d = nr.current, (d & 2) !== 0) d = d & 1 | 2, i.flags |= 128;
    else {
      if (r !== null && (r.flags & 128) !== 0) e: for (r = i.child; r !== null; ) {
        if (r.tag === 13) r.memoizedState !== null && rv(r, u, i);
        else if (r.tag === 19) rv(r, u, i);
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
    if (kt(nr, d), (i.mode & 1) === 0) i.memoizedState = null;
    else switch (y) {
      case "forwards":
        for (u = i.child, y = null; u !== null; ) r = u.alternate, r !== null && Pf(r) === null && (y = u), u = u.sibling;
        u = y, u === null ? (y = i.child, i.child = null) : (y = u.sibling, u.sibling = null), pa(i, !1, y, u, w);
        break;
      case "backwards":
        for (u = null, y = i.child, i.child = null; y !== null; ) {
          if (r = y.alternate, r !== null && Pf(r) === null) {
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
    if (r !== null && (i.dependencies = r.dependencies), dl |= i.lanes, (u & i.childLanes) === 0) return null;
    if (r !== null && i.child !== r.child) throw Error(s(153));
    if (i.child !== null) {
      for (r = i.child, u = _o(r, r.pendingProps), i.child = u, u.return = i; r.sibling !== null; ) r = r.sibling, u = u.sibling = _o(r, r.pendingProps), u.return = i;
      u.sibling = null;
    }
    return i.child;
  }
  function Rc(r, i, u) {
    switch (i.tag) {
      case 3:
        ou(i), Eo();
        break;
      case 5:
        bm(i);
        break;
      case 1:
        mr(i.type) && zr(i);
        break;
      case 4:
        Wp(i, i.stateNode.containerInfo);
        break;
      case 10:
        var d = i.type._context, y = i.memoizedProps.value;
        kt(Ga, d._currentValue), d._currentValue = y;
        break;
      case 13:
        if (d = i.memoizedState, d !== null)
          return d.dehydrated !== null ? (kt(nr, nr.current & 1), i.flags |= 128, null) : (u & i.child.childLanes) !== 0 ? od(r, i, u) : (kt(nr, nr.current & 1), r = mi(r, i, u), r !== null ? r.sibling : null);
        kt(nr, nr.current & 1);
        break;
      case 19:
        if (d = (u & i.childLanes) !== 0, (r.flags & 128) !== 0) {
          if (d) return ul(r, i, u);
          i.flags |= 128;
        }
        if (y = i.memoizedState, y !== null && (y.rendering = null, y.tail = null, y.lastEffect = null), kt(nr, nr.current), d) break;
        return null;
      case 22:
      case 23:
        return i.lanes = 0, Cc(r, i, u);
    }
    return mi(r, i, u);
  }
  var yi, Er, zm, Nm;
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
  }, Er = function() {
  }, zm = function(r, i, u, d) {
    var y = r.memoizedProps;
    if (y !== d) {
      r = i.stateNode, ls(sl.current);
      var w = null;
      switch (u) {
        case "input":
          y = Re(r, y), d = Re(r, d), w = [];
          break;
        case "select":
          y = ye({}, y, { value: void 0 }), d = ye({}, d, { value: void 0 }), w = [];
          break;
        case "textarea":
          y = at(r, y), d = at(r, d), w = [];
          break;
        default:
          typeof y.onClick != "function" && typeof d.onClick == "function" && (r.onclick = vo);
      }
      Et(u, d);
      var O;
      u = null;
      for (me in y) if (!d.hasOwnProperty(me) && y.hasOwnProperty(me) && y[me] != null) if (me === "style") {
        var I = y[me];
        for (O in I) I.hasOwnProperty(O) && (u || (u = {}), u[O] = "");
      } else me !== "dangerouslySetInnerHTML" && me !== "children" && me !== "suppressContentEditableWarning" && me !== "suppressHydrationWarning" && me !== "autoFocus" && (p.hasOwnProperty(me) ? w || (w = []) : (w = w || []).push(me, null));
      for (me in d) {
        var Q = d[me];
        if (I = y?.[me], d.hasOwnProperty(me) && Q !== I && (Q != null || I != null)) if (me === "style") if (I) {
          for (O in I) !I.hasOwnProperty(O) || Q && Q.hasOwnProperty(O) || (u || (u = {}), u[O] = "");
          for (O in Q) Q.hasOwnProperty(O) && I[O] !== Q[O] && (u || (u = {}), u[O] = Q[O]);
        } else u || (w || (w = []), w.push(
          me,
          u
        )), u = Q;
        else me === "dangerouslySetInnerHTML" ? (Q = Q ? Q.__html : void 0, I = I ? I.__html : void 0, Q != null && I !== Q && (w = w || []).push(me, Q)) : me === "children" ? typeof Q != "string" && typeof Q != "number" || (w = w || []).push(me, "" + Q) : me !== "suppressContentEditableWarning" && me !== "suppressHydrationWarning" && (p.hasOwnProperty(me) ? (Q != null && me === "onScroll" && Dn("scroll", r), w || I === Q || (w = [])) : (w = w || []).push(me, Q));
      }
      u && (w = w || []).push("style", u);
      var me = w;
      (i.updateQueue = me) && (i.flags |= 4);
    }
  }, Nm = function(r, i, u, d) {
    u !== d && (i.flags |= 4);
  };
  function Mc(r, i) {
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
  function Um(r, i, u) {
    var d = i.pendingProps;
    switch (zf(i), i.tag) {
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
        return mr(i.type) && nu(), Ur(i), null;
      case 3:
        return d = i.stateNode, os(), Pn(_r), Pn(ir), Lt(), d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), (r === null || r.child === null) && (Nf(i) ? i.flags |= 4 : r === null || r.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, pi !== null && (gs(pi), pi = null))), Er(r, i), Ur(i), null;
      case 5:
        Ff(i);
        var y = ls(dc.current);
        if (u = i.type, r !== null && i.stateNode != null) zm(r, i, u, d, y), r.ref !== i.ref && (i.flags |= 512, i.flags |= 2097152);
        else {
          if (!d) {
            if (i.stateNode === null) throw Error(s(166));
            return Ur(i), null;
          }
          if (r = ls(sl.current), Nf(i)) {
            d = i.stateNode, u = i.type;
            var w = i.memoizedProps;
            switch (d[rl] = i, d[ic] = w, r = (i.mode & 1) !== 0, u) {
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
                for (y = 0; y < nc.length; y++) Dn(nc[y], d);
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
                rt(d, w), Dn("invalid", d);
                break;
              case "select":
                d._wrapperState = { wasMultiple: !!w.multiple }, Dn("invalid", d);
                break;
              case "textarea":
                Rt(d, w), Dn("invalid", d);
            }
            Et(u, w), y = null;
            for (var O in w) if (w.hasOwnProperty(O)) {
              var I = w[O];
              O === "children" ? typeof I == "string" ? d.textContent !== I && (w.suppressHydrationWarning !== !0 && Mf(d.textContent, I, r), y = ["children", I]) : typeof I == "number" && d.textContent !== "" + I && (w.suppressHydrationWarning !== !0 && Mf(
                d.textContent,
                I,
                r
              ), y = ["children", "" + I]) : p.hasOwnProperty(O) && I != null && O === "onScroll" && Dn("scroll", d);
            }
            switch (u) {
              case "input":
                nt(d), yt(d, w, !0);
                break;
              case "textarea":
                nt(d), Be(d);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof w.onClick == "function" && (d.onclick = vo);
            }
            d = y, i.updateQueue = d, d !== null && (i.flags |= 4);
          } else {
            O = y.nodeType === 9 ? y : y.ownerDocument, r === "http://www.w3.org/1999/xhtml" && (r = Pe(u)), r === "http://www.w3.org/1999/xhtml" ? u === "script" ? (r = O.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(r.firstChild)) : typeof d.is == "string" ? r = O.createElement(u, { is: d.is }) : (r = O.createElement(u), u === "select" && (O = r, d.multiple ? O.multiple = !0 : d.size && (O.size = d.size))) : r = O.createElementNS(r, u), r[rl] = i, r[ic] = d, yi(r, i, !1, !1), i.stateNode = r;
            e: {
              switch (O = dt(u, d), u) {
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
                  for (y = 0; y < nc.length; y++) Dn(nc[y], r);
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
                  rt(r, d), y = Re(r, d), Dn("invalid", r);
                  break;
                case "option":
                  y = d;
                  break;
                case "select":
                  r._wrapperState = { wasMultiple: !!d.multiple }, y = ye({}, d, { value: void 0 }), Dn("invalid", r);
                  break;
                case "textarea":
                  Rt(r, d), y = at(r, d), Dn("invalid", r);
                  break;
                default:
                  y = d;
              }
              Et(u, y), I = y;
              for (w in I) if (I.hasOwnProperty(w)) {
                var Q = I[w];
                w === "style" ? Ot(r, Q) : w === "dangerouslySetInnerHTML" ? (Q = Q ? Q.__html : void 0, Q != null && Ze(r, Q)) : w === "children" ? typeof Q == "string" ? (u !== "textarea" || Q !== "") && Se(r, Q) : typeof Q == "number" && Se(r, "" + Q) : w !== "suppressContentEditableWarning" && w !== "suppressHydrationWarning" && w !== "autoFocus" && (p.hasOwnProperty(w) ? Q != null && w === "onScroll" && Dn("scroll", r) : Q != null && H(r, w, Q, O));
              }
              switch (u) {
                case "input":
                  nt(r), yt(r, d, !1);
                  break;
                case "textarea":
                  nt(r), Be(r);
                  break;
                case "option":
                  d.value != null && r.setAttribute("value", "" + Ge(d.value));
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
        return Ur(i), null;
      case 6:
        if (r && i.stateNode != null) Nm(r, i, r.memoizedProps, d);
        else {
          if (typeof d != "string" && i.stateNode === null) throw Error(s(166));
          if (u = ls(dc.current), ls(sl.current), Nf(i)) {
            if (d = i.stateNode, u = i.memoizedProps, d[rl] = i, (w = d.nodeValue !== u) && (r = Aa, r !== null)) switch (r.tag) {
              case 3:
                Mf(d.nodeValue, u, (r.mode & 1) !== 0);
                break;
              case 5:
                r.memoizedProps.suppressHydrationWarning !== !0 && Mf(d.nodeValue, u, (r.mode & 1) !== 0);
            }
            w && (i.flags |= 4);
          } else d = (u.nodeType === 9 ? u : u.ownerDocument).createTextNode(d), d[rl] = i, i.stateNode = d;
        }
        return Ur(i), null;
      case 13:
        if (Pn(nr), d = i.memoizedState, r === null || r.memoizedState !== null && r.memoizedState.dehydrated !== null) {
          if (Xn && La !== null && (i.mode & 1) !== 0 && (i.flags & 128) === 0) sc(), Eo(), i.flags |= 98560, w = !1;
          else if (w = Nf(i), d !== null && d.dehydrated !== null) {
            if (r === null) {
              if (!w) throw Error(s(318));
              if (w = i.memoizedState, w = w !== null ? w.dehydrated : null, !w) throw Error(s(317));
              w[rl] = i;
            } else Eo(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            Ur(i), w = !1;
          } else pi !== null && (gs(pi), pi = null), w = !0;
          if (!w) return i.flags & 65536 ? i : null;
        }
        return (i.flags & 128) !== 0 ? (i.lanes = u, i) : (d = d !== null, d !== (r !== null && r.memoizedState !== null) && d && (i.child.flags |= 8192, (i.mode & 1) !== 0 && (r === null || (nr.current & 1) !== 0 ? cr === 0 && (cr = 3) : dv())), i.updateQueue !== null && (i.flags |= 4), Ur(i), null);
      case 4:
        return os(), Er(r, i), r === null && Ks(i.stateNode.containerInfo), Ur(i), null;
      case 10:
        return $p(i.type._context), Ur(i), null;
      case 17:
        return mr(i.type) && nu(), Ur(i), null;
      case 19:
        if (Pn(nr), w = i.memoizedState, w === null) return Ur(i), null;
        if (d = (i.flags & 128) !== 0, O = w.rendering, O === null) if (d) Mc(w, !1);
        else {
          if (cr !== 0 || r !== null && (r.flags & 128) !== 0) for (r = i.child; r !== null; ) {
            if (O = Pf(r), O !== null) {
              for (i.flags |= 128, Mc(w, !1), d = O.updateQueue, d !== null && (i.updateQueue = d, i.flags |= 4), i.subtreeFlags = 0, d = u, u = i.child; u !== null; ) w = u, r = d, w.flags &= 14680066, O = w.alternate, O === null ? (w.childLanes = 0, w.lanes = r, w.child = null, w.subtreeFlags = 0, w.memoizedProps = null, w.memoizedState = null, w.updateQueue = null, w.dependencies = null, w.stateNode = null) : (w.childLanes = O.childLanes, w.lanes = O.lanes, w.child = O.child, w.subtreeFlags = 0, w.deletions = null, w.memoizedProps = O.memoizedProps, w.memoizedState = O.memoizedState, w.updateQueue = O.updateQueue, w.type = O.type, r = O.dependencies, w.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }), u = u.sibling;
              return kt(nr, nr.current & 1 | 2), i.child;
            }
            r = r.sibling;
          }
          w.tail !== null && Yt() > fu && (i.flags |= 128, d = !0, Mc(w, !1), i.lanes = 4194304);
        }
        else {
          if (!d) if (r = Pf(O), r !== null) {
            if (i.flags |= 128, d = !0, u = r.updateQueue, u !== null && (i.updateQueue = u, i.flags |= 4), Mc(w, !0), w.tail === null && w.tailMode === "hidden" && !O.alternate && !Xn) return Ur(i), null;
          } else 2 * Yt() - w.renderingStartTime > fu && u !== 1073741824 && (i.flags |= 128, d = !0, Mc(w, !1), i.lanes = 4194304);
          w.isBackwards ? (O.sibling = i.child, i.child = O) : (u = w.last, u !== null ? u.sibling = O : i.child = O, w.last = O);
        }
        return w.tail !== null ? (i = w.tail, w.rendering = i, w.tail = i.sibling, w.renderingStartTime = Yt(), i.sibling = null, u = nr.current, kt(nr, d ? u & 1 | 2 : u & 1), i) : (Ur(i), null);
      case 22:
      case 23:
        return fv(), d = i.memoizedState !== null, r !== null && r.memoizedState !== null !== d && (i.flags |= 8192), d && (i.mode & 1) !== 0 ? (Ka & 1073741824) !== 0 && (Ur(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : Ur(i), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, i.tag));
  }
  function sd(r, i) {
    switch (zf(i), i.tag) {
      case 1:
        return mr(i.type) && nu(), r = i.flags, r & 65536 ? (i.flags = r & -65537 | 128, i) : null;
      case 3:
        return os(), Pn(_r), Pn(ir), Lt(), r = i.flags, (r & 65536) !== 0 && (r & 128) === 0 ? (i.flags = r & -65537 | 128, i) : null;
      case 5:
        return Ff(i), null;
      case 13:
        if (Pn(nr), r = i.memoizedState, r !== null && r.dehydrated !== null) {
          if (i.alternate === null) throw Error(s(340));
          Eo();
        }
        return r = i.flags, r & 65536 ? (i.flags = r & -65537 | 128, i) : null;
      case 19:
        return Pn(nr), null;
      case 4:
        return os(), null;
      case 10:
        return $p(i.type._context), null;
      case 22:
      case 23:
        return fv(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var _c = !1, na = !1, L1 = typeof WeakSet == "function" ? WeakSet : Set, gt = null;
  function su(r, i) {
    var u = r.ref;
    if (u !== null) if (typeof u == "function") try {
      u(null);
    } catch (d) {
      Kn(r, i, d);
    }
    else u.current = null;
  }
  function ud(r, i, u) {
    try {
      u();
    } catch (d) {
      Kn(r, i, d);
    }
  }
  var jm = !1;
  function Fm(r, i) {
    if (ac = si, r = ec(), Sf(r)) {
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
          var O = 0, I = -1, Q = -1, me = 0, Ue = 0, Ie = r, Ne = null;
          t: for (; ; ) {
            for (var pt; Ie !== u || y !== 0 && Ie.nodeType !== 3 || (I = O + y), Ie !== w || d !== 0 && Ie.nodeType !== 3 || (Q = O + d), Ie.nodeType === 3 && (O += Ie.nodeValue.length), (pt = Ie.firstChild) !== null; )
              Ne = Ie, Ie = pt;
            for (; ; ) {
              if (Ie === r) break t;
              if (Ne === u && ++me === y && (I = O), Ne === w && ++Ue === d && (Q = O), (pt = Ie.nextSibling) !== null) break;
              Ie = Ne, Ne = Ie.parentNode;
            }
            Ie = pt;
          }
          u = I === -1 || Q === -1 ? null : { start: I, end: Q };
        } else u = null;
      }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (es = { focusedElem: r, selectionRange: u }, si = !1, gt = i; gt !== null; ) if (i = gt, r = i.child, (i.subtreeFlags & 1028) !== 0 && r !== null) r.return = i, gt = r;
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
              var Tt = xt.memoizedProps, fr = xt.memoizedState, se = i.stateNode, ee = se.getSnapshotBeforeUpdate(i.elementType === i.type ? Tt : Hi(i.type, Tt), fr);
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
        r.return = i.return, gt = r;
        break;
      }
      gt = i.return;
    }
    return xt = jm, jm = !1, xt;
  }
  function Dc(r, i, u) {
    var d = i.updateQueue;
    if (d = d !== null ? d.lastEffect : null, d !== null) {
      var y = d = d.next;
      do {
        if ((y.tag & r) === r) {
          var w = y.destroy;
          y.destroy = void 0, w !== void 0 && ud(i, u, w);
        }
        y = y.next;
      } while (y !== d);
    }
  }
  function kc(r, i) {
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
  function av(r) {
    var i = r.ref;
    if (i !== null) {
      var u = r.stateNode;
      r.tag, r = u, typeof i == "function" ? i(r) : i.current = r;
    }
  }
  function cd(r) {
    var i = r.alternate;
    i !== null && (r.alternate = null, cd(i)), r.child = null, r.deletions = null, r.sibling = null, r.tag === 5 && (i = r.stateNode, i !== null && (delete i[rl], delete i[ic], delete i[lc], delete i[tu], delete i[O1])), r.stateNode = null, r.return = null, r.dependencies = null, r.memoizedProps = null, r.memoizedState = null, r.pendingProps = null, r.stateNode = null, r.updateQueue = null;
  }
  function Oc(r) {
    return r.tag === 5 || r.tag === 3 || r.tag === 4;
  }
  function Fl(r) {
    e: for (; ; ) {
      for (; r.sibling === null; ) {
        if (r.return === null || Oc(r.return)) return null;
        r = r.return;
      }
      for (r.sibling.return = r.return, r = r.sibling; r.tag !== 5 && r.tag !== 6 && r.tag !== 18; ) {
        if (r.flags & 2 || r.child === null || r.tag === 4) continue e;
        r.child.return = r, r = r.child;
      }
      if (!(r.flags & 2)) return r.stateNode;
    }
  }
  function cl(r, i, u) {
    var d = r.tag;
    if (d === 5 || d === 6) r = r.stateNode, i ? u.nodeType === 8 ? u.parentNode.insertBefore(r, i) : u.insertBefore(r, i) : (u.nodeType === 8 ? (i = u.parentNode, i.insertBefore(r, u)) : (i = u, i.appendChild(r)), u = u._reactRootContainer, u != null || i.onclick !== null || (i.onclick = vo));
    else if (d !== 4 && (r = r.child, r !== null)) for (cl(r, i, u), r = r.sibling; r !== null; ) cl(r, i, u), r = r.sibling;
  }
  function fl(r, i, u) {
    var d = r.tag;
    if (d === 5 || d === 6) r = r.stateNode, i ? u.insertBefore(r, i) : u.appendChild(r);
    else if (d !== 4 && (r = r.child, r !== null)) for (fl(r, i, u), r = r.sibling; r !== null; ) fl(r, i, u), r = r.sibling;
  }
  var ur = null, va = !1;
  function ha(r, i, u) {
    for (u = u.child; u !== null; ) Pm(r, i, u), u = u.sibling;
  }
  function Pm(r, i, u) {
    if (Qn && typeof Qn.onCommitFiberUnmount == "function") try {
      Qn.onCommitFiberUnmount(ii, u);
    } catch {
    }
    switch (u.tag) {
      case 5:
        na || su(u, i);
      case 6:
        var d = ur, y = va;
        ur = null, ha(r, i, u), ur = d, va = y, ur !== null && (va ? (r = ur, u = u.stateNode, r.nodeType === 8 ? r.parentNode.removeChild(u) : r.removeChild(u)) : ur.removeChild(u.stateNode));
        break;
      case 18:
        ur !== null && (va ? (r = ur, u = u.stateNode, r.nodeType === 8 ? eu(r.parentNode, u) : r.nodeType === 1 && eu(r, u), Ui(r)) : eu(ur, u.stateNode));
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
            var w = y, O = w.destroy;
            w = w.tag, O !== void 0 && ((w & 2) !== 0 || (w & 4) !== 0) && ud(u, i, O), y = y.next;
          } while (y !== d);
        }
        ha(r, i, u);
        break;
      case 1:
        if (!na && (su(u, i), d = u.stateNode, typeof d.componentWillUnmount == "function")) try {
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
  function $m(r) {
    var i = r.updateQueue;
    if (i !== null) {
      r.updateQueue = null;
      var u = r.stateNode;
      u === null && (u = r.stateNode = new L1()), i.forEach(function(d) {
        var y = Qm.bind(null, r, d);
        u.has(d) || (u.add(d), d.then(y, y));
      });
    }
  }
  function Vi(r, i) {
    var u = i.deletions;
    if (u !== null) for (var d = 0; d < u.length; d++) {
      var y = u[d];
      try {
        var w = r, O = i, I = O;
        e: for (; I !== null; ) {
          switch (I.tag) {
            case 5:
              ur = I.stateNode, va = !1;
              break e;
            case 3:
              ur = I.stateNode.containerInfo, va = !0;
              break e;
            case 4:
              ur = I.stateNode.containerInfo, va = !0;
              break e;
          }
          I = I.return;
        }
        if (ur === null) throw Error(s(160));
        Pm(w, O, y), ur = null, va = !1;
        var Q = y.alternate;
        Q !== null && (Q.return = null), y.return = null;
      } catch (me) {
        Kn(y, i, me);
      }
    }
    if (i.subtreeFlags & 12854) for (i = i.child; i !== null; ) iv(i, r), i = i.sibling;
  }
  function iv(r, i) {
    var u = r.alternate, d = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Vi(i, r), ja(r), d & 4) {
          try {
            Dc(3, r, r.return), kc(3, r);
          } catch (Tt) {
            Kn(r, r.return, Tt);
          }
          try {
            Dc(5, r, r.return);
          } catch (Tt) {
            Kn(r, r.return, Tt);
          }
        }
        break;
      case 1:
        Vi(i, r), ja(r), d & 512 && u !== null && su(u, u.return);
        break;
      case 5:
        if (Vi(i, r), ja(r), d & 512 && u !== null && su(u, u.return), r.flags & 32) {
          var y = r.stateNode;
          try {
            Se(y, "");
          } catch (Tt) {
            Kn(r, r.return, Tt);
          }
        }
        if (d & 4 && (y = r.stateNode, y != null)) {
          var w = r.memoizedProps, O = u !== null ? u.memoizedProps : w, I = r.type, Q = r.updateQueue;
          if (r.updateQueue = null, Q !== null) try {
            I === "input" && w.type === "radio" && w.name != null && ot(y, w), dt(I, O);
            var me = dt(I, w);
            for (O = 0; O < Q.length; O += 2) {
              var Ue = Q[O], Ie = Q[O + 1];
              Ue === "style" ? Ot(y, Ie) : Ue === "dangerouslySetInnerHTML" ? Ze(y, Ie) : Ue === "children" ? Se(y, Ie) : H(y, Ue, Ie, me);
            }
            switch (I) {
              case "input":
                ze(y, w);
                break;
              case "textarea":
                Ae(y, w);
                break;
              case "select":
                var Ne = y._wrapperState.wasMultiple;
                y._wrapperState.wasMultiple = !!w.multiple;
                var pt = w.value;
                pt != null ? Me(y, !!w.multiple, pt, !1) : Ne !== !!w.multiple && (w.defaultValue != null ? Me(
                  y,
                  !!w.multiple,
                  w.defaultValue,
                  !0
                ) : Me(y, !!w.multiple, w.multiple ? [] : "", !1));
            }
            y[ic] = w;
          } catch (Tt) {
            Kn(r, r.return, Tt);
          }
        }
        break;
      case 6:
        if (Vi(i, r), ja(r), d & 4) {
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
        if (Vi(i, r), ja(r), d & 4 && u !== null && u.memoizedState.isDehydrated) try {
          Ui(i.containerInfo);
        } catch (Tt) {
          Kn(r, r.return, Tt);
        }
        break;
      case 4:
        Vi(i, r), ja(r);
        break;
      case 13:
        Vi(i, r), ja(r), y = r.child, y.flags & 8192 && (w = y.memoizedState !== null, y.stateNode.isHidden = w, !w || y.alternate !== null && y.alternate.memoizedState !== null || (sv = Yt())), d & 4 && $m(r);
        break;
      case 22:
        if (Ue = u !== null && u.memoizedState !== null, r.mode & 1 ? (na = (me = na) || Ue, Vi(i, r), na = me) : Vi(i, r), ja(r), d & 8192) {
          if (me = r.memoizedState !== null, (r.stateNode.isHidden = me) && !Ue && (r.mode & 1) !== 0) for (gt = r, Ue = r.child; Ue !== null; ) {
            for (Ie = gt = Ue; gt !== null; ) {
              switch (Ne = gt, pt = Ne.child, Ne.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Dc(4, Ne, Ne.return);
                  break;
                case 1:
                  su(Ne, Ne.return);
                  var xt = Ne.stateNode;
                  if (typeof xt.componentWillUnmount == "function") {
                    d = Ne, u = Ne.return;
                    try {
                      i = d, xt.props = i.memoizedProps, xt.state = i.memoizedState, xt.componentWillUnmount();
                    } catch (Tt) {
                      Kn(d, u, Tt);
                    }
                  }
                  break;
                case 5:
                  su(Ne, Ne.return);
                  break;
                case 22:
                  if (Ne.memoizedState !== null) {
                    Ac(Ie);
                    continue;
                  }
              }
              pt !== null ? (pt.return = Ne, gt = pt) : Ac(Ie);
            }
            Ue = Ue.sibling;
          }
          e: for (Ue = null, Ie = r; ; ) {
            if (Ie.tag === 5) {
              if (Ue === null) {
                Ue = Ie;
                try {
                  y = Ie.stateNode, me ? (w = y.style, typeof w.setProperty == "function" ? w.setProperty("display", "none", "important") : w.display = "none") : (I = Ie.stateNode, Q = Ie.memoizedProps.style, O = Q != null && Q.hasOwnProperty("display") ? Q.display : null, I.style.display = Ve("display", O));
                } catch (Tt) {
                  Kn(r, r.return, Tt);
                }
              }
            } else if (Ie.tag === 6) {
              if (Ue === null) try {
                Ie.stateNode.nodeValue = me ? "" : Ie.memoizedProps;
              } catch (Tt) {
                Kn(r, r.return, Tt);
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
        Vi(i, r), ja(r), d & 4 && $m(r);
        break;
      case 21:
        break;
      default:
        Vi(
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
            if (Oc(u)) {
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
            d.flags & 32 && (Se(y, ""), d.flags &= -33);
            var w = Fl(r);
            fl(r, w, y);
            break;
          case 3:
          case 4:
            var O = d.stateNode.containerInfo, I = Fl(r);
            cl(r, I, O);
            break;
          default:
            throw Error(s(161));
        }
      } catch (Q) {
        Kn(r, r.return, Q);
      }
      r.flags &= -3;
    }
    i & 4096 && (r.flags &= -4097);
  }
  function z1(r, i, u) {
    gt = r, lv(r);
  }
  function lv(r, i, u) {
    for (var d = (r.mode & 1) !== 0; gt !== null; ) {
      var y = gt, w = y.child;
      if (y.tag === 22 && d) {
        var O = y.memoizedState !== null || _c;
        if (!O) {
          var I = y.alternate, Q = I !== null && I.memoizedState !== null || na;
          I = _c;
          var me = na;
          if (_c = O, (na = Q) && !me) for (gt = y; gt !== null; ) O = gt, Q = O.child, O.tag === 22 && O.memoizedState !== null ? ov(y) : Q !== null ? (Q.return = O, gt = Q) : ov(y);
          for (; w !== null; ) gt = w, lv(w), w = w.sibling;
          gt = y, _c = I, na = me;
        }
        Hm(r);
      } else (y.subtreeFlags & 8772) !== 0 && w !== null ? (w.return = y, gt = w) : Hm(r);
    }
  }
  function Hm(r) {
    for (; gt !== null; ) {
      var i = gt;
      if ((i.flags & 8772) !== 0) {
        var u = i.alternate;
        try {
          if ((i.flags & 8772) !== 0) switch (i.tag) {
            case 0:
            case 11:
            case 15:
              na || kc(5, i);
              break;
            case 1:
              var d = i.stateNode;
              if (i.flags & 4 && !na) if (u === null) d.componentDidMount();
              else {
                var y = i.elementType === i.type ? u.memoizedProps : Hi(i.type, u.memoizedProps);
                d.componentDidUpdate(y, u.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
              }
              var w = i.updateQueue;
              w !== null && Yp(i, w, d);
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
                Yp(i, O, u);
              }
              break;
            case 5:
              var I = i.stateNode;
              if (u === null && i.flags & 4) {
                u = I;
                var Q = i.memoizedProps;
                switch (i.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    Q.autoFocus && u.focus();
                    break;
                  case "img":
                    Q.src && (u.src = Q.src);
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
                var me = i.alternate;
                if (me !== null) {
                  var Ue = me.memoizedState;
                  if (Ue !== null) {
                    var Ie = Ue.dehydrated;
                    Ie !== null && Ui(Ie);
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
          na || i.flags & 512 && av(i);
        } catch (Ne) {
          Kn(i, i.return, Ne);
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
  function Ac(r) {
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
  function ov(r) {
    for (; gt !== null; ) {
      var i = gt;
      try {
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            var u = i.return;
            try {
              kc(4, i);
            } catch (Q) {
              Kn(i, u, Q);
            }
            break;
          case 1:
            var d = i.stateNode;
            if (typeof d.componentDidMount == "function") {
              var y = i.return;
              try {
                d.componentDidMount();
              } catch (Q) {
                Kn(i, y, Q);
              }
            }
            var w = i.return;
            try {
              av(i);
            } catch (Q) {
              Kn(i, w, Q);
            }
            break;
          case 5:
            var O = i.return;
            try {
              av(i);
            } catch (Q) {
              Kn(i, O, Q);
            }
        }
      } catch (Q) {
        Kn(i, i.return, Q);
      }
      if (i === r) {
        gt = null;
        break;
      }
      var I = i.sibling;
      if (I !== null) {
        I.return = i.return, gt = I;
        break;
      }
      gt = i.return;
    }
  }
  var N1 = Math.ceil, To = $.ReactCurrentDispatcher, ms = $.ReactCurrentOwner, qr = $.ReactCurrentBatchConfig, vn = 0, kr = null, xr = null, Yr = 0, Ka = 0, uu = fi(0), cr = 0, Lc = null, dl = 0, cu = 0, fd = 0, zc = null, Fa = null, sv = 0, fu = 1 / 0, Za = null, du = !1, ys = null, Ro = null, dd = !1, Pl = null, Nc = 0, Mo = 0, pu = null, Uc = -1, ra = 0;
  function wr() {
    return (vn & 6) !== 0 ? Yt() : Uc !== -1 ? Uc : Uc = Yt();
  }
  function pl(r) {
    return (r.mode & 1) === 0 ? 1 : (vn & 2) !== 0 && Yr !== 0 ? Yr & -Yr : A1.transition !== null ? (ra === 0 && (ra = Ps()), ra) : (r = Cn, r !== 0 || (r = window.event, r = r === void 0 ? 16 : Ws(r.type)), r);
  }
  function ma(r, i, u, d) {
    if (50 < Mo) throw Mo = 0, pu = null, Error(s(185));
    Rl(r, u, d), ((vn & 2) === 0 || r !== kr) && (r === kr && ((vn & 2) === 0 && (cu |= u), cr === 4 && Ii(r, Yr)), Pa(r, d), u === 1 && vn === 0 && (i.mode & 1) === 0 && (fu = Yt() + 500, ru && il()));
  }
  function Pa(r, i) {
    var u = r.callbackNode;
    Rr(r, i);
    var d = Zn(r, r === kr ? Yr : 0);
    if (d === 0) u !== null && In(u), r.callbackNode = null, r.callbackPriority = 0;
    else if (i = d & -d, r.callbackPriority !== i) {
      if (u != null && In(u), i === 1) r.tag === 0 ? mo(uv.bind(null, r)) : Af(uv.bind(null, r)), Js(function() {
        (vn & 6) === 0 && il();
      }), u = null;
      else {
        switch (Hs(d)) {
          case 1:
            u = ua;
            break;
          case 4:
            u = Li;
            break;
          case 16:
            u = zi;
            break;
          case 536870912:
            u = Xi;
            break;
          default:
            u = zi;
        }
        u = Km(u, pd.bind(null, r));
      }
      r.callbackPriority = i, r.callbackNode = u;
    }
  }
  function pd(r, i) {
    if (Uc = -1, ra = 0, (vn & 6) !== 0) throw Error(s(327));
    var u = r.callbackNode;
    if (vu() && r.callbackNode !== u) return null;
    var d = Zn(r, r === kr ? Yr : 0);
    if (d === 0) return null;
    if ((d & 30) !== 0 || (d & r.expiredLanes) !== 0 || i) i = vd(r, d);
    else {
      i = d;
      var y = vn;
      vn |= 2;
      var w = Im();
      (kr !== r || Yr !== i) && (Za = null, fu = Yt() + 500, $l(r, i));
      do
        try {
          qm();
          break;
        } catch (I) {
          Vm(r, I);
        }
      while (!0);
      Pp(), To.current = w, vn = y, xr !== null ? i = 0 : (kr = null, Yr = 0, i = cr);
    }
    if (i !== 0) {
      if (i === 2 && (y = lo(r), y !== 0 && (d = y, i = jc(r, y))), i === 1) throw u = Lc, $l(r, 0), Ii(r, d), Pa(r, Yt()), u;
      if (i === 6) Ii(r, d);
      else {
        if (y = r.current.alternate, (d & 30) === 0 && !U1(y) && (i = vd(r, d), i === 2 && (w = lo(r), w !== 0 && (d = w, i = jc(r, w))), i === 1)) throw u = Lc, $l(r, 0), Ii(r, d), Pa(r, Yt()), u;
        switch (r.finishedWork = y, r.finishedLanes = d, i) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            Es(r, Fa, Za);
            break;
          case 3:
            if (Ii(r, d), (d & 130023424) === d && (i = sv + 500 - Yt(), 10 < i)) {
              if (Zn(r, 0) !== 0) break;
              if (y = r.suspendedLanes, (y & d) !== d) {
                wr(), r.pingedLanes |= r.suspendedLanes & y;
                break;
              }
              r.timeoutHandle = Df(Es.bind(null, r, Fa, Za), i);
              break;
            }
            Es(r, Fa, Za);
            break;
          case 4:
            if (Ii(r, d), (d & 4194240) === d) break;
            for (i = r.eventTimes, y = -1; 0 < d; ) {
              var O = 31 - $r(d);
              w = 1 << O, O = i[O], O > y && (y = O), d &= ~w;
            }
            if (d = y, d = Yt() - d, d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * N1(d / 1960)) - d, 10 < d) {
              r.timeoutHandle = Df(Es.bind(null, r, Fa, Za), d);
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
    return Pa(r, Yt()), r.callbackNode === u ? pd.bind(null, r) : null;
  }
  function jc(r, i) {
    var u = zc;
    return r.current.memoizedState.isDehydrated && ($l(r, i).flags |= 256), r = vd(r, i), r !== 2 && (i = Fa, Fa = u, i !== null && gs(i)), r;
  }
  function gs(r) {
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
            if (!Fi(w(), y)) return !1;
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
  function Ii(r, i) {
    for (i &= ~fd, i &= ~cu, r.suspendedLanes |= i, r.pingedLanes &= ~i, r = r.expirationTimes; 0 < i; ) {
      var u = 31 - $r(i), d = 1 << u;
      r[u] = -1, i &= ~d;
    }
  }
  function uv(r) {
    if ((vn & 6) !== 0) throw Error(s(327));
    vu();
    var i = Zn(r, 0);
    if ((i & 1) === 0) return Pa(r, Yt()), null;
    var u = vd(r, i);
    if (r.tag !== 0 && u === 2) {
      var d = lo(r);
      d !== 0 && (i = d, u = jc(r, d));
    }
    if (u === 1) throw u = Lc, $l(r, 0), Ii(r, i), Pa(r, Yt()), u;
    if (u === 6) throw Error(s(345));
    return r.finishedWork = r.current.alternate, r.finishedLanes = i, Es(r, Fa, Za), Pa(r, Yt()), null;
  }
  function cv(r, i) {
    var u = vn;
    vn |= 1;
    try {
      return r(i);
    } finally {
      vn = u, vn === 0 && (fu = Yt() + 500, ru && il());
    }
  }
  function Ss(r) {
    Pl !== null && Pl.tag === 0 && (vn & 6) === 0 && vu();
    var i = vn;
    vn |= 1;
    var u = qr.transition, d = Cn;
    try {
      if (qr.transition = null, Cn = 1, r) return r();
    } finally {
      Cn = d, qr.transition = u, vn = i, (vn & 6) === 0 && il();
    }
  }
  function fv() {
    Ka = uu.current, Pn(uu);
  }
  function $l(r, i) {
    r.finishedWork = null, r.finishedLanes = 0;
    var u = r.timeoutHandle;
    if (u !== -1 && (r.timeoutHandle = -1, zp(u)), xr !== null) for (u = xr.return; u !== null; ) {
      var d = u;
      switch (zf(d), d.tag) {
        case 1:
          d = d.type.childContextTypes, d != null && nu();
          break;
        case 3:
          os(), Pn(_r), Pn(ir), Lt();
          break;
        case 5:
          Ff(d);
          break;
        case 4:
          os();
          break;
        case 13:
          Pn(nr);
          break;
        case 19:
          Pn(nr);
          break;
        case 10:
          $p(d.type._context);
          break;
        case 22:
        case 23:
          fv();
      }
      u = u.return;
    }
    if (kr = r, xr = r = _o(r.current, null), Yr = Ka = i, cr = 0, Lc = null, fd = cu = dl = 0, Fa = zc = null, is !== null) {
      for (i = 0; i < is.length; i++) if (u = is[i], d = u.interleaved, d !== null) {
        u.interleaved = null;
        var y = d.next, w = u.pending;
        if (w !== null) {
          var O = w.next;
          w.next = y, d.next = O;
        }
        u.pending = d;
      }
      is = null;
    }
    return r;
  }
  function Vm(r, i) {
    do {
      var u = xr;
      try {
        if (Pp(), ln.current = ps, $f) {
          for (var d = Tn.memoizedState; d !== null; ) {
            var y = d.queue;
            y !== null && (y.pending = null), d = d.next;
          }
          $f = !1;
        }
        if (zn = 0, Nr = gr = Tn = null, vc = !1, ss = 0, ms.current = null, u === null || u.return === null) {
          cr = 1, Lc = i, xr = null;
          break;
        }
        e: {
          var w = r, O = u.return, I = u, Q = i;
          if (i = Yr, I.flags |= 32768, Q !== null && typeof Q == "object" && typeof Q.then == "function") {
            var me = Q, Ue = I, Ie = Ue.tag;
            if ((Ue.mode & 1) === 0 && (Ie === 0 || Ie === 11 || Ie === 15)) {
              var Ne = Ue.alternate;
              Ne ? (Ue.updateQueue = Ne.updateQueue, Ue.memoizedState = Ne.memoizedState, Ue.lanes = Ne.lanes) : (Ue.updateQueue = null, Ue.memoizedState = null);
            }
            var pt = Dm(O);
            if (pt !== null) {
              pt.flags &= -257, bo(pt, O, I, w, i), pt.mode & 1 && Jp(w, me, i), i = pt, Q = me;
              var xt = i.updateQueue;
              if (xt === null) {
                var Tt = /* @__PURE__ */ new Set();
                Tt.add(Q), i.updateQueue = Tt;
              } else xt.add(Q);
              break e;
            } else {
              if ((i & 1) === 0) {
                Jp(w, me, i), dv();
                break e;
              }
              Q = Error(s(426));
            }
          } else if (Xn && I.mode & 1) {
            var fr = Dm(O);
            if (fr !== null) {
              (fr.flags & 65536) === 0 && (fr.flags |= 256), bo(fr, O, I, w, i), Nl(vs(Q, I));
              break e;
            }
          }
          w = Q = vs(Q, I), cr !== 4 && (cr = 2), zc === null ? zc = [w] : zc.push(w), w = O;
          do {
            switch (w.tag) {
              case 3:
                w.flags |= 65536, i &= -i, w.lanes |= i;
                var se = _m(w, Q, i);
                Cm(w, se);
                break e;
              case 1:
                I = Q;
                var ee = w.type, pe = w.stateNode;
                if ((w.flags & 128) === 0 && (typeof ee.getDerivedStateFromError == "function" || pe !== null && typeof pe.componentDidCatch == "function" && (Ro === null || !Ro.has(pe)))) {
                  w.flags |= 65536, i &= -i, w.lanes |= i;
                  var je = Zp(w, I, i);
                  Cm(w, je);
                  break e;
                }
            }
            w = w.return;
          } while (w !== null);
        }
        Wm(u);
      } catch (wt) {
        i = wt, xr === u && u !== null && (xr = u = u.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Im() {
    var r = To.current;
    return To.current = ps, r === null ? ps : r;
  }
  function dv() {
    (cr === 0 || cr === 3 || cr === 2) && (cr = 4), kr === null || (dl & 268435455) === 0 && (cu & 268435455) === 0 || Ii(kr, Yr);
  }
  function vd(r, i) {
    var u = vn;
    vn |= 2;
    var d = Im();
    (kr !== r || Yr !== i) && (Za = null, $l(r, i));
    do
      try {
        j1();
        break;
      } catch (y) {
        Vm(r, y);
      }
    while (!0);
    if (Pp(), vn = u, To.current = d, xr !== null) throw Error(s(261));
    return kr = null, Yr = 0, cr;
  }
  function j1() {
    for (; xr !== null; ) Ym(xr);
  }
  function qm() {
    for (; xr !== null && !_a(); ) Ym(xr);
  }
  function Ym(r) {
    var i = Xm(r.alternate, r, Ka);
    r.memoizedProps = r.pendingProps, i === null ? Wm(r) : xr = i, ms.current = null;
  }
  function Wm(r) {
    var i = r;
    do {
      var u = i.alternate;
      if (r = i.return, (i.flags & 32768) === 0) {
        if (u = Um(u, i, Ka), u !== null) {
          xr = u;
          return;
        }
      } else {
        if (u = sd(u, i), u !== null) {
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
      vu();
    while (Pl !== null);
    if ((vn & 6) !== 0) throw Error(s(327));
    u = r.finishedWork;
    var y = r.finishedLanes;
    if (u === null) return null;
    if (r.finishedWork = null, r.finishedLanes = 0, u === r.current) throw Error(s(177));
    r.callbackNode = null, r.callbackPriority = 0;
    var w = u.lanes | u.childLanes;
    if (pp(r, w), r === kr && (xr = kr = null, Yr = 0), (u.subtreeFlags & 2064) === 0 && (u.flags & 2064) === 0 || dd || (dd = !0, Km(zi, function() {
      return vu(), null;
    })), w = (u.flags & 15990) !== 0, (u.subtreeFlags & 15990) !== 0 || w) {
      w = qr.transition, qr.transition = null;
      var O = Cn;
      Cn = 1;
      var I = vn;
      vn |= 4, ms.current = null, Fm(r, u), iv(u, r), Qs(es), si = !!ac, es = ac = null, r.current = u, z1(u), sa(), vn = I, Cn = O, qr.transition = w;
    } else r.current = u;
    if (dd && (dd = !1, Pl = r, Nc = y), w = r.pendingLanes, w === 0 && (Ro = null), Yo(u.stateNode), Pa(r, Yt()), i !== null) for (d = r.onRecoverableError, u = 0; u < i.length; u++) y = i[u], d(y.value, { componentStack: y.stack, digest: y.digest });
    if (du) throw du = !1, r = ys, ys = null, r;
    return (Nc & 1) !== 0 && r.tag !== 0 && vu(), w = r.pendingLanes, (w & 1) !== 0 ? r === pu ? Mo++ : (Mo = 0, pu = r) : Mo = 0, il(), null;
  }
  function vu() {
    if (Pl !== null) {
      var r = Hs(Nc), i = qr.transition, u = Cn;
      try {
        if (qr.transition = null, Cn = 16 > r ? 16 : r, Pl === null) var d = !1;
        else {
          if (r = Pl, Pl = null, Nc = 0, (vn & 6) !== 0) throw Error(s(331));
          var y = vn;
          for (vn |= 4, gt = r.current; gt !== null; ) {
            var w = gt, O = w.child;
            if ((gt.flags & 16) !== 0) {
              var I = w.deletions;
              if (I !== null) {
                for (var Q = 0; Q < I.length; Q++) {
                  var me = I[Q];
                  for (gt = me; gt !== null; ) {
                    var Ue = gt;
                    switch (Ue.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Dc(8, Ue, w);
                    }
                    var Ie = Ue.child;
                    if (Ie !== null) Ie.return = Ue, gt = Ie;
                    else for (; gt !== null; ) {
                      Ue = gt;
                      var Ne = Ue.sibling, pt = Ue.return;
                      if (cd(Ue), Ue === me) {
                        gt = null;
                        break;
                      }
                      if (Ne !== null) {
                        Ne.return = pt, gt = Ne;
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
            if ((w.subtreeFlags & 2064) !== 0 && O !== null) O.return = w, gt = O;
            else e: for (; gt !== null; ) {
              if (w = gt, (w.flags & 2048) !== 0) switch (w.tag) {
                case 0:
                case 11:
                case 15:
                  Dc(9, w, w.return);
              }
              var se = w.sibling;
              if (se !== null) {
                se.return = w.return, gt = se;
                break e;
              }
              gt = w.return;
            }
          }
          var ee = r.current;
          for (gt = ee; gt !== null; ) {
            O = gt;
            var pe = O.child;
            if ((O.subtreeFlags & 2064) !== 0 && pe !== null) pe.return = O, gt = pe;
            else e: for (O = ee; gt !== null; ) {
              if (I = gt, (I.flags & 2048) !== 0) try {
                switch (I.tag) {
                  case 0:
                  case 11:
                  case 15:
                    kc(9, I);
                }
              } catch (wt) {
                Kn(I, I.return, wt);
              }
              if (I === O) {
                gt = null;
                break e;
              }
              var je = I.sibling;
              if (je !== null) {
                je.return = I.return, gt = je;
                break e;
              }
              gt = I.return;
            }
          }
          if (vn = y, il(), Qn && typeof Qn.onPostCommitFiberRoot == "function") try {
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
  function Bm(r, i, u) {
    i = vs(u, i), i = _m(r, i, 1), r = xo(r, i, 1), i = wr(), r !== null && (Rl(r, 1, i), Pa(r, i));
  }
  function Kn(r, i, u) {
    if (r.tag === 3) Bm(r, r, u);
    else for (; i !== null; ) {
      if (i.tag === 3) {
        Bm(i, r, u);
        break;
      } else if (i.tag === 1) {
        var d = i.stateNode;
        if (typeof i.type.getDerivedStateFromError == "function" || typeof d.componentDidCatch == "function" && (Ro === null || !Ro.has(d))) {
          r = vs(u, r), r = Zp(i, r, 1), i = xo(i, r, 1), r = wr(), i !== null && (Rl(i, 1, r), Pa(i, r));
          break;
        }
      }
      i = i.return;
    }
  }
  function P1(r, i, u) {
    var d = r.pingCache;
    d !== null && d.delete(i), i = wr(), r.pingedLanes |= r.suspendedLanes & u, kr === r && (Yr & u) === u && (cr === 4 || cr === 3 && (Yr & 130023424) === Yr && 500 > Yt() - sv ? $l(r, 0) : fd |= u), Pa(r, i);
  }
  function Gm(r, i) {
    i === 0 && ((r.mode & 1) === 0 ? i = 1 : (i = an, an <<= 1, (an & 130023424) === 0 && (an = 4194304)));
    var u = wr();
    r = Qa(r, i), r !== null && (Rl(r, i, u), Pa(r, u));
  }
  function $1(r) {
    var i = r.memoizedState, u = 0;
    i !== null && (u = i.retryLane), Gm(r, u);
  }
  function Qm(r, i) {
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
    d !== null && d.delete(i), Gm(r, u);
  }
  var Xm;
  Xm = function(r, i, u) {
    if (r !== null) if (r.memoizedProps !== i.pendingProps || _r.current) Sr = !0;
    else {
      if ((r.lanes & u) === 0 && (i.flags & 128) === 0) return Sr = !1, Rc(r, i, u);
      Sr = (r.flags & 131072) !== 0;
    }
    else Sr = !1, Xn && (i.flags & 1048576) !== 0 && Sm(i, zl, i.index);
    switch (i.lanes = 0, i.tag) {
      case 2:
        var d = i.type;
        hi(r, i), r = i.pendingProps;
        var y = Oa(i, ir.current);
        tr(i, u), y = wo(null, i, d, r, y, u);
        var w = $i();
        return i.flags |= 1, typeof y == "object" && y !== null && typeof y.render == "function" && y.$$typeof === void 0 ? (i.tag = 1, i.memoizedState = null, i.updateQueue = null, mr(d) ? (w = !0, zr(i)) : w = !1, i.memoizedState = y.state !== null && y.state !== void 0 ? y.state : null, qp(i), y.updater = rd, i.stateNode = y, y._reactInternals = i, xc(i, d, r, u), i = bc(null, i, d, !0, w, u)) : (i.tag = 0, Xn && w && Lf(i), Ir(null, i, y, u), i = i.child), i;
      case 16:
        d = i.elementType;
        e: {
          switch (hi(r, i), r = i.pendingProps, y = d._init, d = y(d._payload), i.type = d, y = i.tag = V1(d), r = Hi(d, r), y) {
            case 0:
              i = km(null, i, d, r, u);
              break e;
            case 1:
              i = Om(null, i, d, r, u);
              break e;
            case 11:
              i = Ua(null, i, d, r, u);
              break e;
            case 14:
              i = hs(null, i, d, Hi(d.type, r), u);
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
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Hi(d, y), km(r, i, d, y, u);
      case 1:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Hi(d, y), Om(r, i, d, y, u);
      case 3:
        e: {
          if (ou(i), r === null) throw Error(s(387));
          d = i.pendingProps, w = i.memoizedState, y = w.element, wm(r, i), uc(i, d, null, u);
          var O = i.memoizedState;
          if (d = O.element, w.isDehydrated) if (w = { element: d, isDehydrated: !1, cache: O.cache, pendingSuspenseBoundaries: O.pendingSuspenseBoundaries, transitions: O.transitions }, i.updateQueue.baseState = w, i.memoizedState = w, i.flags & 256) {
            y = vs(Error(s(423)), i), i = Am(r, i, d, u, y);
            break e;
          } else if (d !== y) {
            y = vs(Error(s(424)), i), i = Am(r, i, d, u, y);
            break e;
          } else for (La = nl(i.stateNode.containerInfo.firstChild), Aa = i, Xn = !0, pi = null, u = it(i, null, d, u), i.child = u; u; ) u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (Eo(), d === y) {
              i = mi(r, i, u);
              break e;
            }
            Ir(r, i, d, u);
          }
          i = i.child;
        }
        return i;
      case 5:
        return bm(i), r === null && jp(i), d = i.type, y = i.pendingProps, w = r !== null ? r.memoizedProps : null, O = y.children, _f(d, y) ? O = null : w !== null && _f(d, w) && (i.flags |= 32), ev(r, i), Ir(r, i, O, u), i.child;
      case 6:
        return r === null && jp(i), null;
      case 13:
        return od(r, i, u);
      case 4:
        return Wp(i, i.stateNode.containerInfo), d = i.pendingProps, r === null ? i.child = or(i, null, d, u) : Ir(r, i, d, u), i.child;
      case 11:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Hi(d, y), Ua(r, i, d, y, u);
      case 7:
        return Ir(r, i, i.pendingProps, u), i.child;
      case 8:
        return Ir(r, i, i.pendingProps.children, u), i.child;
      case 12:
        return Ir(r, i, i.pendingProps.children, u), i.child;
      case 10:
        e: {
          if (d = i.type._context, y = i.pendingProps, w = i.memoizedProps, O = y.value, kt(Ga, d._currentValue), d._currentValue = O, w !== null) if (Fi(w.value, O)) {
            if (w.children === y.children && !_r.current) {
              i = mi(r, i, u);
              break e;
            }
          } else for (w = i.child, w !== null && (w.return = i); w !== null; ) {
            var I = w.dependencies;
            if (I !== null) {
              O = w.child;
              for (var Q = I.firstContext; Q !== null; ) {
                if (Q.context === d) {
                  if (w.tag === 1) {
                    Q = Ul(-1, u & -u), Q.tag = 2;
                    var me = w.updateQueue;
                    if (me !== null) {
                      me = me.shared;
                      var Ue = me.pending;
                      Ue === null ? Q.next = Q : (Q.next = Ue.next, Ue.next = Q), me.pending = Q;
                    }
                  }
                  w.lanes |= u, Q = w.alternate, Q !== null && (Q.lanes |= u), Hp(
                    w.return,
                    u,
                    i
                  ), I.lanes |= u;
                  break;
                }
                Q = Q.next;
              }
            } else if (w.tag === 10) O = w.type === i.type ? null : w.child;
            else if (w.tag === 18) {
              if (O = w.return, O === null) throw Error(s(341));
              O.lanes |= u, I = O.alternate, I !== null && (I.lanes |= u), Hp(O, u, i), O = w.sibling;
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
        return y = i.type, d = i.pendingProps.children, tr(i, u), y = vi(y), d = d(y), i.flags |= 1, Ir(r, i, d, u), i.child;
      case 14:
        return d = i.type, y = Hi(d, i.pendingProps), y = Hi(d.type, y), hs(r, i, d, y, u);
      case 15:
        return en(r, i, i.type, i.pendingProps, u);
      case 17:
        return d = i.type, y = i.pendingProps, y = i.elementType === d ? y : Hi(d, y), hi(r, i), i.tag = 1, mr(d) ? (r = !0, zr(i)) : r = !1, tr(i, u), ad(i, d, y), xc(i, d, y, u), bc(null, i, d, !0, r, u);
      case 19:
        return ul(r, i, u);
      case 22:
        return Cc(r, i, u);
    }
    throw Error(s(156, i.tag));
  };
  function Km(r, i) {
    return xn(r, i);
  }
  function H1(r, i, u, d) {
    this.tag = r, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = d, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function gi(r, i, u, d) {
    return new H1(r, i, u, d);
  }
  function pv(r) {
    return r = r.prototype, !(!r || !r.isReactComponent);
  }
  function V1(r) {
    if (typeof r == "function") return pv(r) ? 1 : 0;
    if (r != null) {
      if (r = r.$$typeof, r === ae) return 11;
      if (r === le) return 14;
    }
    return 2;
  }
  function _o(r, i) {
    var u = r.alternate;
    return u === null ? (u = gi(r.tag, i, r.key, r.mode), u.elementType = r.elementType, u.type = r.type, u.stateNode = r.stateNode, u.alternate = r, r.alternate = u) : (u.pendingProps = i, u.type = r.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = r.flags & 14680064, u.childLanes = r.childLanes, u.lanes = r.lanes, u.child = r.child, u.memoizedProps = r.memoizedProps, u.memoizedState = r.memoizedState, u.updateQueue = r.updateQueue, i = r.dependencies, u.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, u.sibling = r.sibling, u.index = r.index, u.ref = r.ref, u;
  }
  function Fc(r, i, u, d, y, w) {
    var O = 2;
    if (d = r, typeof r == "function") pv(r) && (O = 1);
    else if (typeof r == "string") O = 5;
    else e: switch (r) {
      case B:
        return Hl(u.children, y, w, i);
      case ie:
        O = 8, y |= 8;
        break;
      case X:
        return r = gi(12, u, i, y | 2), r.elementType = X, r.lanes = w, r;
      case G:
        return r = gi(13, u, i, y), r.elementType = G, r.lanes = w, r;
      case K:
        return r = gi(19, u, i, y), r.elementType = K, r.lanes = w, r;
      case oe:
        return Do(u, y, w, i);
      default:
        if (typeof r == "object" && r !== null) switch (r.$$typeof) {
          case j:
            O = 10;
            break e;
          case ne:
            O = 9;
            break e;
          case ae:
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
  function Hl(r, i, u, d) {
    return r = gi(7, r, d, i), r.lanes = u, r;
  }
  function Do(r, i, u, d) {
    return r = gi(22, r, d, i), r.elementType = oe, r.lanes = u, r.stateNode = { isHidden: !1 }, r;
  }
  function vv(r, i, u) {
    return r = gi(6, r, null, i), r.lanes = u, r;
  }
  function hd(r, i, u) {
    return i = gi(4, r.children !== null ? r.children : [], r.key, i), i.lanes = u, i.stateNode = { containerInfo: r.containerInfo, pendingChildren: null, implementation: r.implementation }, i;
  }
  function Zm(r, i, u, d, y) {
    this.tag = i, this.containerInfo = r, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = $s(0), this.expirationTimes = $s(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $s(0), this.identifierPrefix = d, this.onRecoverableError = y, this.mutableSourceEagerHydrationData = null;
  }
  function md(r, i, u, d, y, w, O, I, Q) {
    return r = new Zm(r, i, u, I, Q), i === 1 ? (i = 1, w === !0 && (i |= 8)) : i = 0, w = gi(3, null, null, i), r.current = w, w.stateNode = r, w.memoizedState = { element: d, isDehydrated: u, cache: null, transitions: null, pendingSuspenseBoundaries: null }, qp(w), r;
  }
  function I1(r, i, u) {
    var d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: F, key: d == null ? null : "" + d, children: r, containerInfo: i, implementation: u };
  }
  function hv(r) {
    if (!r) return ea;
    r = r._reactInternals;
    e: {
      if (qt(r) !== r || r.tag !== 1) throw Error(s(170));
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
      if (mr(u)) return oc(r, u, i);
    }
    return i;
  }
  function Jm(r, i, u, d, y, w, O, I, Q) {
    return r = md(u, d, !0, r, y, w, O, I, Q), r.context = hv(null), u = r.current, d = wr(), y = pl(u), w = Ul(d, y), w.callback = i ?? null, xo(u, w, y), r.current.lanes = y, Rl(r, y, d), Pa(r, d), r;
  }
  function yd(r, i, u, d) {
    var y = i.current, w = wr(), O = pl(y);
    return u = hv(u), i.context === null ? i.context = u : i.pendingContext = u, i = Ul(w, O), i.payload = { element: r }, d = d === void 0 ? null : d, d !== null && (i.callback = d), r = xo(y, i, O), r !== null && (ma(r, y, O, w), jf(r, y, O)), O;
  }
  function gd(r) {
    return r = r.current, r.child ? (r.child.tag === 5, r.child.stateNode) : null;
  }
  function mv(r, i) {
    if (r = r.memoizedState, r !== null && r.dehydrated !== null) {
      var u = r.retryLane;
      r.retryLane = u !== 0 && u < i ? u : i;
    }
  }
  function Sd(r, i) {
    mv(r, i), (r = r.alternate) && mv(r, i);
  }
  function ey() {
    return null;
  }
  var xs = typeof reportError == "function" ? reportError : function(r) {
    console.error(r);
  };
  function yv(r) {
    this._internalRoot = r;
  }
  Ed.prototype.render = yv.prototype.render = function(r) {
    var i = this._internalRoot;
    if (i === null) throw Error(s(409));
    yd(r, i, null, null);
  }, Ed.prototype.unmount = yv.prototype.unmount = function() {
    var r = this._internalRoot;
    if (r !== null) {
      this._internalRoot = null;
      var i = r.containerInfo;
      Ss(function() {
        yd(null, r, null, null);
      }), i[Al] = null;
    }
  };
  function Ed(r) {
    this._internalRoot = r;
  }
  Ed.prototype.unstable_scheduleHydration = function(r) {
    if (r) {
      var i = Bt();
      r = { blockedOn: null, target: r, priority: i };
      for (var u = 0; u < Mr.length && i !== 0 && i < Mr[u].priority; u++) ;
      Mr.splice(u, 0, r), u === 0 && Bu(r);
    }
  };
  function gv(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11);
  }
  function xd(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11 && (r.nodeType !== 8 || r.nodeValue !== " react-mount-point-unstable "));
  }
  function ty() {
  }
  function q1(r, i, u, d, y) {
    if (y) {
      if (typeof d == "function") {
        var w = d;
        d = function() {
          var me = gd(O);
          w.call(me);
        };
      }
      var O = Jm(i, d, r, 0, null, !1, !1, "", ty);
      return r._reactRootContainer = O, r[Al] = O.current, Ks(r.nodeType === 8 ? r.parentNode : r), Ss(), O;
    }
    for (; y = r.lastChild; ) r.removeChild(y);
    if (typeof d == "function") {
      var I = d;
      d = function() {
        var me = gd(Q);
        I.call(me);
      };
    }
    var Q = md(r, 0, !1, null, null, !1, !1, "", ty);
    return r._reactRootContainer = Q, r[Al] = Q.current, Ks(r.nodeType === 8 ? r.parentNode : r), Ss(function() {
      yd(i, Q, u, d);
    }), Q;
  }
  function Pc(r, i, u, d, y) {
    var w = u._reactRootContainer;
    if (w) {
      var O = w;
      if (typeof y == "function") {
        var I = y;
        y = function() {
          var Q = gd(O);
          I.call(Q);
        };
      }
      yd(i, O, r, y);
    } else O = q1(u, i, r, y, d);
    return gd(O);
  }
  Sn = function(r) {
    switch (r.tag) {
      case 3:
        var i = r.stateNode;
        if (i.current.memoizedState.isDehydrated) {
          var u = un(i.pendingLanes);
          u !== 0 && (Ml(i, u | 1), Pa(i, Yt()), (vn & 6) === 0 && (fu = Yt() + 500, il()));
        }
        break;
      case 13:
        Ss(function() {
          var d = Qa(r, 1);
          if (d !== null) {
            var y = wr();
            ma(d, r, 1, y);
          }
        }), Sd(r, 1);
    }
  }, Yu = function(r) {
    if (r.tag === 13) {
      var i = Qa(r, 134217728);
      if (i !== null) {
        var u = wr();
        ma(i, r, 134217728, u);
      }
      Sd(r, 134217728);
    }
  }, Ki = function(r) {
    if (r.tag === 13) {
      var i = pl(r), u = Qa(r, i);
      if (u !== null) {
        var d = wr();
        ma(u, r, i, d);
      }
      Sd(r, i);
    }
  }, Bt = function() {
    return Cn;
  }, Vs = function(r, i) {
    var u = Cn;
    try {
      return Cn = r, i();
    } finally {
      Cn = u;
    }
  }, Dt = function(r, i, u) {
    switch (i) {
      case "input":
        if (ze(r, u), i = u.name, u.type === "radio" && i != null) {
          for (u = r; u.parentNode; ) u = u.parentNode;
          for (u = u.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'), i = 0; i < u.length; i++) {
            var d = u[i];
            if (d !== r && d.form === r.form) {
              var y = er(d);
              if (!y) throw Error(s(90));
              Oe(d), ze(d, y);
            }
          }
        }
        break;
      case "textarea":
        Ae(r, u);
        break;
      case "select":
        i = u.value, i != null && Me(r, !!u.multiple, i, !1);
    }
  }, Pr = cv, br = Ss;
  var Y1 = { usingClientEntryPoint: !1, Events: [At, Pi, er, Hn, Bn, cv] }, $c = { findFiberByHostInstance: ts, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ny = { bundleType: $c.bundleType, version: $c.version, rendererPackageName: $c.rendererPackageName, rendererConfig: $c.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: $.ReactCurrentDispatcher, findHostInstanceByFiber: function(r) {
    return r = Gn(r), r === null ? null : r.stateNode;
  }, findFiberByHostInstance: $c.findFiberByHostInstance || ey, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ko = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ko.isDisabled && ko.supportsFiber) try {
      ii = ko.inject(ny), Qn = ko;
    } catch {
    }
  }
  return bi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y1, bi.createPortal = function(r, i) {
    var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!gv(i)) throw Error(s(200));
    return I1(r, i, null, u);
  }, bi.createRoot = function(r, i) {
    if (!gv(r)) throw Error(s(299));
    var u = !1, d = "", y = xs;
    return i != null && (i.unstable_strictMode === !0 && (u = !0), i.identifierPrefix !== void 0 && (d = i.identifierPrefix), i.onRecoverableError !== void 0 && (y = i.onRecoverableError)), i = md(r, 1, !1, null, null, u, !1, d, y), r[Al] = i.current, Ks(r.nodeType === 8 ? r.parentNode : r), new yv(i);
  }, bi.findDOMNode = function(r) {
    if (r == null) return null;
    if (r.nodeType === 1) return r;
    var i = r._reactInternals;
    if (i === void 0)
      throw typeof r.render == "function" ? Error(s(188)) : (r = Object.keys(r).join(","), Error(s(268, r)));
    return r = Gn(i), r = r === null ? null : r.stateNode, r;
  }, bi.flushSync = function(r) {
    return Ss(r);
  }, bi.hydrate = function(r, i, u) {
    if (!xd(i)) throw Error(s(200));
    return Pc(null, r, i, !0, u);
  }, bi.hydrateRoot = function(r, i, u) {
    if (!gv(r)) throw Error(s(405));
    var d = u != null && u.hydratedSources || null, y = !1, w = "", O = xs;
    if (u != null && (u.unstable_strictMode === !0 && (y = !0), u.identifierPrefix !== void 0 && (w = u.identifierPrefix), u.onRecoverableError !== void 0 && (O = u.onRecoverableError)), i = Jm(i, null, r, 1, u ?? null, y, !1, w, O), r[Al] = i.current, Ks(r), d) for (r = 0; r < d.length; r++) u = d[r], y = u._getVersion, y = y(u._source), i.mutableSourceEagerHydrationData == null ? i.mutableSourceEagerHydrationData = [u, y] : i.mutableSourceEagerHydrationData.push(
      u,
      y
    );
    return new Ed(i);
  }, bi.render = function(r, i, u) {
    if (!xd(i)) throw Error(s(200));
    return Pc(null, r, i, !1, u);
  }, bi.unmountComponentAtNode = function(r) {
    if (!xd(r)) throw Error(s(40));
    return r._reactRootContainer ? (Ss(function() {
      Pc(null, null, r, !1, function() {
        r._reactRootContainer = null, r[Al] = null;
      });
    }), !0) : !1;
  }, bi.unstable_batchedUpdates = cv, bi.unstable_renderSubtreeIntoContainer = function(r, i, u, d) {
    if (!xd(u)) throw Error(s(200));
    if (r == null || r._reactInternals === void 0) throw Error(s(38));
    return Pc(r, i, u, !1, d);
  }, bi.version = "18.3.1-next-f1338f8080-20240426", bi;
}
var Ti = {};
var UC;
function gN() {
  return UC || (UC = 1, process.env.NODE_ENV !== "production" && (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var t = Vh(), a = dT(), s = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, f = !1;
    function p(e) {
      f = e;
    }
    function m(e) {
      if (!f) {
        for (var n = arguments.length, l = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
          l[o - 1] = arguments[o];
        S("warn", e, l);
      }
    }
    function v(e) {
      if (!f) {
        for (var n = arguments.length, l = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
          l[o - 1] = arguments[o];
        S("error", e, l);
      }
    }
    function S(e, n, l) {
      {
        var o = s.ReactDebugCurrentFrame, c = o.getStackAddendum();
        c !== "" && (n += "%s", l = l.concat([c]));
        var h = l.map(function(E) {
          return String(E);
        });
        h.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, h);
      }
    }
    var g = 0, x = 1, C = 2, b = 3, R = 4, D = 5, _ = 6, A = 7, L = 8, U = 9, q = 10, H = 11, $ = 12, V = 13, F = 14, B = 15, ie = 16, X = 17, j = 18, ne = 19, ae = 21, G = 22, K = 23, le = 24, de = 25, oe = !0, re = !1, ue = !1, ye = !1, P = !1, Z = !0, Ce = !0, be = !0, $e = !0, _e = /* @__PURE__ */ new Set(), He = {}, Ge = {};
    function Ye(e, n) {
      Xe(e, n), Xe(e + "Capture", n);
    }
    function Xe(e, n) {
      He[e] && v("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), He[e] = n;
      {
        var l = e.toLowerCase();
        Ge[l] = e, e === "onDoubleClick" && (Ge.ondblclick = e);
      }
      for (var o = 0; o < n.length; o++)
        _e.add(n[o]);
    }
    var nt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Oe = Object.prototype.hasOwnProperty;
    function Ke(e) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, l = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return l;
      }
    }
    function Re(e) {
      try {
        return rt(e), !1;
      } catch {
        return !0;
      }
    }
    function rt(e) {
      return "" + e;
    }
    function ot(e, n) {
      if (Re(e))
        return v("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", n, Ke(e)), rt(e);
    }
    function ze(e) {
      if (Re(e))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), rt(e);
    }
    function yt(e, n) {
      if (Re(e))
        return v("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", n, Ke(e)), rt(e);
    }
    function Ft(e, n) {
      if (Re(e))
        return v("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", n, Ke(e)), rt(e);
    }
    function St(e) {
      if (Re(e))
        return v("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), rt(e);
    }
    function Me(e) {
      if (Re(e))
        return v("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Ke(e)), rt(e);
    }
    var at = 0, Rt = 1, Ae = 2, Be = 3, Pe = 4, ut = 5, bt = 6, Ze = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Se = Ze + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Fe = new RegExp("^[" + Ze + "][" + Se + "]*$"), ct = {}, Ve = {};
    function Ot(e) {
      return Oe.call(Ve, e) ? !0 : Oe.call(ct, e) ? !1 : Fe.test(e) ? (Ve[e] = !0, !0) : (ct[e] = !0, v("Invalid attribute name: `%s`", e), !1);
    }
    function Gt(e, n, l) {
      return n !== null ? n.type === at : l ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function Et(e, n, l, o) {
      if (l !== null && l.type === at)
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
    function dt(e, n, l, o) {
      if (n === null || typeof n > "u" || Et(e, n, l, o))
        return !0;
      if (o)
        return !1;
      if (l !== null)
        switch (l.type) {
          case Be:
            return !n;
          case Pe:
            return n === !1;
          case ut:
            return isNaN(n);
          case bt:
            return isNaN(n) || n < 1;
        }
      return !1;
    }
    function ke(e) {
      return Dt.hasOwnProperty(e) ? Dt[e] : null;
    }
    function ht(e, n, l, o, c, h, E) {
      this.acceptsBooleans = n === Ae || n === Be || n === Pe, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = e, this.type = n, this.sanitizeURL = h, this.removeEmptyString = E;
    }
    var Dt = {}, Zt = [
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
      Dt[e] = new ht(
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
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var n = e[0], l = e[1];
      Dt[n] = new ht(
        n,
        Rt,
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
      Dt[e] = new ht(
        e,
        Ae,
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
      Dt[e] = new ht(
        e,
        Ae,
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
      Dt[e] = new ht(
        e,
        Be,
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
      Dt[e] = new ht(
        e,
        Be,
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
      Dt[e] = new ht(
        e,
        Pe,
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
      Dt[e] = new ht(
        e,
        bt,
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
      Dt[e] = new ht(
        e,
        ut,
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
      Dt[n] = new ht(
        n,
        Rt,
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
      Dt[n] = new ht(
        n,
        Rt,
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
      Dt[n] = new ht(
        n,
        Rt,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      Dt[e] = new ht(
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
    });
    var Hn = "xlinkHref";
    Dt[Hn] = new ht(
      "xlinkHref",
      Rt,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      Dt[e] = new ht(
        e,
        Rt,
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
        ot(l, n), o.sanitizeURL && br("" + l);
        var h = o.attributeName, E = null;
        if (o.type === Pe) {
          if (e.hasAttribute(h)) {
            var T = e.getAttribute(h);
            return T === "" ? !0 : dt(n, l, o, !1) ? T : T === "" + l ? l : T;
          }
        } else if (e.hasAttribute(h)) {
          if (dt(n, l, o, !1))
            return e.getAttribute(h);
          if (o.type === Be)
            return l;
          E = e.getAttribute(h);
        }
        return dt(n, l, o, !1) ? E === null ? l : E : E === "" + l ? l : E;
      }
    }
    function Ai(e, n, l, o) {
      {
        if (!Ot(n))
          return;
        if (!e.hasAttribute(n))
          return l === void 0 ? void 0 : null;
        var c = e.getAttribute(n);
        return ot(l, n), c === "" + l ? l : c;
      }
    }
    function Tr(e, n, l, o) {
      var c = ke(n);
      if (!Gt(n, c, o)) {
        if (dt(n, l, c, o) && (l = null), o || c === null) {
          if (Ot(n)) {
            var h = n;
            l === null ? e.removeAttribute(h) : (ot(l, n), e.setAttribute(h, "" + l));
          }
          return;
        }
        var E = c.mustUseProperty;
        if (E) {
          var T = c.propertyName;
          if (l === null) {
            var M = c.type;
            e[T] = M === Be ? !1 : "";
          } else
            e[T] = l;
          return;
        }
        var z = c.attributeName, N = c.attributeNamespace;
        if (l === null)
          e.removeAttribute(z);
        else {
          var te = c.type, J;
          te === Be || te === Pe && l === !0 ? J = "" : (ot(l, z), J = "" + l, c.sanitizeURL && br(J.toString())), N ? e.setAttributeNS(N, z, J) : e.setAttribute(z, J);
        }
      }
    }
    var Ar = /* @__PURE__ */ Symbol.for("react.element"), Vn = /* @__PURE__ */ Symbol.for("react.portal"), Ma = /* @__PURE__ */ Symbol.for("react.fragment"), oa = /* @__PURE__ */ Symbol.for("react.strict_mode"), Wa = /* @__PURE__ */ Symbol.for("react.profiler"), Lr = /* @__PURE__ */ Symbol.for("react.provider"), W = /* @__PURE__ */ Symbol.for("react.context"), De = /* @__PURE__ */ Symbol.for("react.forward_ref"), Je = /* @__PURE__ */ Symbol.for("react.suspense"), ft = /* @__PURE__ */ Symbol.for("react.suspense_list"), qt = /* @__PURE__ */ Symbol.for("react.memo"), Vt = /* @__PURE__ */ Symbol.for("react.lazy"), tn = /* @__PURE__ */ Symbol.for("react.scope"), Jt = /* @__PURE__ */ Symbol.for("react.debug_trace_mode"), Gn = /* @__PURE__ */ Symbol.for("react.offscreen"), gn = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), xn = /* @__PURE__ */ Symbol.for("react.cache"), In = /* @__PURE__ */ Symbol.for("react.tracing_marker"), _a = Symbol.iterator, sa = "@@iterator";
    function Yt(e) {
      if (e === null || typeof e != "object")
        return null;
      var n = _a && e[_a] || e[sa];
      return typeof n == "function" ? n : null;
    }
    var Qt = Object.assign, ua = 0, Li, zi, Ni, Xi, ii, Qn, Yo;
    function $r() {
    }
    $r.__reactDisabledLog = !0;
    function Fs() {
      {
        if (ua === 0) {
          Li = console.log, zi = console.info, Ni = console.warn, Xi = console.error, ii = console.group, Qn = console.groupCollapsed, Yo = console.groupEnd;
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
              value: Li
            }),
            info: Qt({}, e, {
              value: zi
            }),
            warn: Qt({}, e, {
              value: Ni
            }),
            error: Qt({}, e, {
              value: Xi
            }),
            group: Qt({}, e, {
              value: ii
            }),
            groupCollapsed: Qt({}, e, {
              value: Qn
            }),
            groupEnd: Qt({}, e, {
              value: Yo
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
      h = on.current, on.current = null, Fs();
      try {
        if (n) {
          var E = function() {
            throw Error();
          };
          if (Object.defineProperty(E.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(E, []);
            } catch (ge) {
              o = ge;
            }
            Reflect.construct(e, [], E);
          } else {
            try {
              E.call();
            } catch (ge) {
              o = ge;
            }
            e.call(E.prototype);
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
`), z = T.length - 1, N = M.length - 1; z >= 1 && N >= 0 && T[z] !== M[N]; )
            N--;
          for (; z >= 1 && N >= 0; z--, N--)
            if (T[z] !== M[N]) {
              if (z !== 1 || N !== 1)
                do
                  if (z--, N--, N < 0 || T[z] !== M[N]) {
                    var te = `
` + T[z].replace(" at new ", " at ");
                    return e.displayName && te.includes("<anonymous>") && (te = te.replace("<anonymous>", e.displayName)), typeof e == "function" && Zn.set(e, te), te;
                  }
                while (z >= 1 && N >= 0);
              break;
            }
        }
      } finally {
        un = !1, on.current = h, io(), Error.prepareStackTrace = c;
      }
      var J = e ? e.displayName || e.name : "", ve = J ? an(J) : "";
      return typeof e == "function" && Zn.set(e, ve), ve;
    }
    function lo(e, n, l) {
      return Rr(e, !0);
    }
    function Ps(e, n, l) {
      return Rr(e, !1);
    }
    function $s(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function Rl(e, n, l) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Rr(e, $s(e));
      if (typeof e == "string")
        return an(e);
      switch (e) {
        case Je:
          return an("Suspense");
        case ft:
          return an("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case De:
            return Ps(e.render);
          case qt:
            return Rl(e.type, n, l);
          case Vt: {
            var o = e, c = o._payload, h = o._init;
            try {
              return Rl(h(c), n, l);
            } catch {
            }
          }
        }
      return "";
    }
    function pp(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case D:
          return an(e.type);
        case ie:
          return an("Lazy");
        case V:
          return an("Suspense");
        case ne:
          return an("SuspenseList");
        case g:
        case C:
        case B:
          return Ps(e.type);
        case H:
          return Ps(e.type.render);
        case x:
          return lo(e.type);
        default:
          return "";
      }
    }
    function Ml(e) {
      try {
        var n = "", l = e;
        do
          n += pp(l), l = l.return;
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
    function Hs(e) {
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
        case Vn:
          return "Portal";
        case Wa:
          return "Profiler";
        case oa:
          return "StrictMode";
        case Je:
          return "Suspense";
        case ft:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case W:
            var n = e;
            return Hs(n) + ".Consumer";
          case Lr:
            var l = e;
            return Hs(l._context) + ".Provider";
          case De:
            return Cn(e, e.render, "ForwardRef");
          case qt:
            var o = e.displayName || null;
            return o !== null ? o : Sn(e.type) || "Memo";
          case Vt: {
            var c = e, h = c._payload, E = c._init;
            try {
              return Sn(E(h));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Yu(e, n, l) {
      var o = n.displayName || n.name || "";
      return e.displayName || (o !== "" ? l + "(" + o + ")" : l);
    }
    function Ki(e) {
      return e.displayName || "Context";
    }
    function Bt(e) {
      var n = e.tag, l = e.type;
      switch (n) {
        case le:
          return "Cache";
        case U:
          var o = l;
          return Ki(o) + ".Consumer";
        case q:
          var c = l;
          return Ki(c._context) + ".Provider";
        case j:
          return "DehydratedFragment";
        case H:
          return Yu(l, l.render, "ForwardRef");
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
        case $:
          return "Profiler";
        case ae:
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
        case X:
        case C:
        case F:
        case B:
          if (typeof l == "function")
            return l.displayName || l.name || null;
          if (typeof l == "string")
            return l;
          break;
      }
      return null;
    }
    var Vs = s.ReactDebugCurrentFrame, Hr = null, Zi = !1;
    function fa() {
      {
        if (Hr === null)
          return null;
        var e = Hr._debugOwner;
        if (e !== null && typeof e < "u")
          return Bt(e);
      }
      return null;
    }
    function Ji() {
      return Hr === null ? "" : Ml(Hr);
    }
    function qn() {
      Vs.getCurrentStack = null, Hr = null, Zi = !1;
    }
    function On(e) {
      Vs.getCurrentStack = e === null ? null : Ji, Hr = e, Zi = !1;
    }
    function oo() {
      return Hr;
    }
    function Mr(e) {
      Zi = e;
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
          return Me(e), e;
        default:
          return "";
      }
    }
    var Wo = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Wu(e, n) {
      Wo[n.type] || n.onChange || n.onInput || n.readOnly || n.disabled || n.value == null || v("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), n.onChange || n.readOnly || n.disabled || n.checked == null || v("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Bu(e) {
      var n = e.type, l = e.nodeName;
      return l && l.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
    }
    function so(e) {
      return e._valueTracker;
    }
    function Bo(e) {
      e._valueTracker = null;
    }
    function vp(e) {
      var n = "";
      return e && (Bu(e) ? n = e.checked ? "true" : "false" : n = e.value), n;
    }
    function oi(e) {
      var n = Bu(e) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(e.constructor.prototype, n);
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
        var E = {
          getValue: function() {
            return o;
          },
          setValue: function(T) {
            Me(T), o = "" + T;
          },
          stopTracking: function() {
            Bo(e), delete e[n];
          }
        };
        return E;
      }
    }
    function Ui(e) {
      so(e) || (e._valueTracker = oi(e));
    }
    function el(e) {
      if (!e)
        return !1;
      var n = so(e);
      if (!n)
        return !0;
      var l = n.getValue(), o = vp(e);
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
    var Is = !1, qs = !1, uo = !1, Go = !1;
    function Ys(e) {
      var n = e.type === "checkbox" || e.type === "radio";
      return n ? e.checked != null : e.value != null;
    }
    function Ws(e, n) {
      var l = e, o = n.checked, c = Qt({}, n, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: o ?? l._wrapperState.initialChecked
      });
      return c;
    }
    function ji(e, n) {
      Wu("input", n), n.checked !== void 0 && n.defaultChecked !== void 0 && !qs && (v("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", fa() || "A component", n.type), qs = !0), n.value !== void 0 && n.defaultValue !== void 0 && !Is && (v("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", fa() || "A component", n.type), Is = !0);
      var l = e, o = n.defaultValue == null ? "" : n.defaultValue;
      l._wrapperState = {
        initialChecked: n.checked != null ? n.checked : n.defaultChecked,
        initialValue: li(n.value != null ? n.value : o),
        controlled: Ys(n)
      };
    }
    function k(e, n) {
      var l = e, o = n.checked;
      o != null && Tr(l, "checked", o, !1);
    }
    function Y(e, n) {
      var l = e;
      {
        var o = Ys(n);
        !l._wrapperState.controlled && o && !Go && (v("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Go = !0), l._wrapperState.controlled && !o && !uo && (v("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), uo = !0);
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
      n.hasOwnProperty("value") ? zt(l, n.type, c) : n.hasOwnProperty("defaultValue") && zt(l, n.type, li(n.defaultValue)), n.checked == null && n.defaultChecked != null && (l.defaultChecked = !!n.defaultChecked);
    }
    function he(e, n, l) {
      var o = e;
      if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
        var c = n.type, h = c === "submit" || c === "reset";
        if (h && (n.value === void 0 || n.value === null))
          return;
        var E = da(o._wrapperState.initialValue);
        l || E !== o.value && (o.value = E), o.defaultValue = E;
      }
      var T = o.name;
      T !== "" && (o.name = ""), o.defaultChecked = !o.defaultChecked, o.defaultChecked = !!o._wrapperState.initialChecked, T !== "" && (o.name = T);
    }
    function Ee(e, n) {
      var l = e;
      Y(l, n), Qe(l, n);
    }
    function Qe(e, n) {
      var l = n.name;
      if (n.type === "radio" && l != null) {
        for (var o = e; o.parentNode; )
          o = o.parentNode;
        ot(l, "name");
        for (var c = o.querySelectorAll("input[name=" + JSON.stringify("" + l) + '][type="radio"]'), h = 0; h < c.length; h++) {
          var E = c[h];
          if (!(E === e || E.form !== e.form)) {
            var T = Ey(E);
            if (!T)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            el(E), Y(E, T);
          }
        }
      }
    }
    function zt(e, n, l) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (n !== "number" || si(e.ownerDocument) !== e) && (l == null ? e.defaultValue = da(e._wrapperState.initialValue) : e.defaultValue !== da(l) && (e.defaultValue = da(l)));
    }
    var tt = !1, Pt = !1, sn = !1;
    function En(e, n) {
      n.value == null && (typeof n.children == "object" && n.children !== null ? t.Children.forEach(n.children, function(l) {
        l != null && (typeof l == "string" || typeof l == "number" || Pt || (Pt = !0, v("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : n.dangerouslySetInnerHTML != null && (sn || (sn = !0, v("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), n.selected != null && !tt && (v("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), tt = !0);
    }
    function Fn(e, n) {
      n.value != null && e.setAttribute("value", da(li(n.value)));
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
    var co = ["value", "defaultValue"];
    function Gu(e) {
      {
        Wu("select", e);
        for (var n = 0; n < co.length; n++) {
          var l = co[n];
          if (e[l] != null) {
            var o = rn(e[l]);
            e.multiple && !o ? v("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", l, Jn()) : !e.multiple && o && v("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", l, Jn());
          }
        }
      }
    }
    function _l(e, n, l, o) {
      var c = e.options;
      if (n) {
        for (var h = l, E = {}, T = 0; T < h.length; T++)
          E["$" + h[T]] = !0;
        for (var M = 0; M < c.length; M++) {
          var z = E.hasOwnProperty("$" + c[M].value);
          c[M].selected !== z && (c[M].selected = z), z && o && (c[M].defaultSelected = !0);
        }
      } else {
        for (var N = da(li(l)), te = null, J = 0; J < c.length; J++) {
          if (c[J].value === N) {
            c[J].selected = !0, o && (c[J].defaultSelected = !0);
            return;
          }
          te === null && !c[J].disabled && (te = c[J]);
        }
        te !== null && (te.selected = !0);
      }
    }
    function Qu(e, n) {
      return Qt({}, n, {
        value: void 0
      });
    }
    function Qo(e, n) {
      var l = e;
      Gu(n), l._wrapperState = {
        wasMultiple: !!n.multiple
      }, n.value !== void 0 && n.defaultValue !== void 0 && !Ln && (v("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Ln = !0);
    }
    function hp(e, n) {
      var l = e;
      l.multiple = !!n.multiple;
      var o = n.value;
      o != null ? _l(l, !!n.multiple, o, !1) : n.defaultValue != null && _l(l, !!n.multiple, n.defaultValue, !0);
    }
    function hf(e, n) {
      var l = e, o = l._wrapperState.wasMultiple;
      l._wrapperState.wasMultiple = !!n.multiple;
      var c = n.value;
      c != null ? _l(l, !!n.multiple, c, !1) : o !== !!n.multiple && (n.defaultValue != null ? _l(l, !!n.multiple, n.defaultValue, !0) : _l(l, !!n.multiple, n.multiple ? [] : "", !1));
    }
    function mp(e, n) {
      var l = e, o = n.value;
      o != null && _l(l, !!n.multiple, o, !1);
    }
    var Ih = !1;
    function yp(e, n) {
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
    function gp(e, n) {
      var l = e;
      Wu("textarea", n), n.value !== void 0 && n.defaultValue !== void 0 && !Ih && (v("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", fa() || "A component"), Ih = !0);
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
    function qh(e, n) {
      var l = e, o = li(n.value), c = li(n.defaultValue);
      if (o != null) {
        var h = da(o);
        h !== l.value && (l.value = h), n.defaultValue == null && l.defaultValue !== h && (l.defaultValue = h);
      }
      c != null && (l.defaultValue = da(c));
    }
    function Yh(e, n) {
      var l = e, o = l.textContent;
      o === l._wrapperState.initialValue && o !== "" && o !== null && (l.value = o);
    }
    function E1(e, n) {
      qh(e, n);
    }
    var Dl = "http://www.w3.org/1999/xhtml", Sp = "http://www.w3.org/1998/Math/MathML", Ep = "http://www.w3.org/2000/svg";
    function xp(e) {
      switch (e) {
        case "svg":
          return Ep;
        case "math":
          return Sp;
        default:
          return Dl;
      }
    }
    function wp(e, n) {
      return e == null || e === Dl ? xp(n) : e === Ep && n === "foreignObject" ? Dl : e;
    }
    var Wh = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, l, o, c) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(n, l, o, c);
        });
      } : e;
    }, mf, Bh = Wh(function(e, n) {
      if (e.namespaceURI === Ep && !("innerHTML" in e)) {
        mf = mf || document.createElement("div"), mf.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>";
        for (var l = mf.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; l.firstChild; )
          e.appendChild(l.firstChild);
        return;
      }
      e.innerHTML = n;
    }), Da = 1, kl = 3, hr = 8, Ol = 9, Cp = 11, Bs = function(e, n) {
      if (n) {
        var l = e.firstChild;
        if (l && l === e.lastChild && l.nodeType === kl) {
          l.nodeValue = n;
          return;
        }
      }
      e.textContent = n;
    }, Xu = {
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
    }, Ku = {
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
    function Gh(e, n) {
      return e + n.charAt(0).toUpperCase() + n.substring(1);
    }
    var Qh = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Ku).forEach(function(e) {
      Qh.forEach(function(n) {
        Ku[Gh(n, e)] = Ku[e];
      });
    });
    function yf(e, n, l) {
      var o = n == null || typeof n == "boolean" || n === "";
      return o ? "" : !l && typeof n == "number" && n !== 0 && !(Ku.hasOwnProperty(e) && Ku[e]) ? n + "px" : (Ft(n, e), ("" + n).trim());
    }
    var Xh = /([A-Z])/g, Kh = /^ms-/;
    function Gs(e) {
      return e.replace(Xh, "-$1").toLowerCase().replace(Kh, "-ms-");
    }
    var Zh = function() {
    };
    {
      var x1 = /^(?:webkit|moz|o)[A-Z]/, w1 = /^-ms-/, Jh = /-(.)/g, bp = /;\s*$/, tl = {}, Xo = {}, em = !1, Zu = !1, C1 = function(e) {
        return e.replace(Jh, function(n, l) {
          return l.toUpperCase();
        });
      }, tm = function(e) {
        tl.hasOwnProperty(e) && tl[e] || (tl[e] = !0, v(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          C1(e.replace(w1, "ms-"))
        ));
      }, Tp = function(e) {
        tl.hasOwnProperty(e) && tl[e] || (tl[e] = !0, v("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, Rp = function(e, n) {
        Xo.hasOwnProperty(n) && Xo[n] || (Xo[n] = !0, v(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, n.replace(bp, "")));
      }, nm = function(e, n) {
        em || (em = !0, v("`NaN` is an invalid value for the `%s` css style property.", e));
      }, rm = function(e, n) {
        Zu || (Zu = !0, v("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Zh = function(e, n) {
        e.indexOf("-") > -1 ? tm(e) : x1.test(e) ? Tp(e) : bp.test(n) && Rp(e, n), typeof n == "number" && (isNaN(n) ? nm(e, n) : isFinite(n) || rm(e, n));
      };
    }
    var am = Zh;
    function b1(e) {
      {
        var n = "", l = "";
        for (var o in e)
          if (e.hasOwnProperty(o)) {
            var c = e[o];
            if (c != null) {
              var h = o.indexOf("--") === 0;
              n += l + (h ? o : Gs(o)) + ":", n += yf(o, c, h), l = ";";
            }
          }
        return n || null;
      }
    }
    function im(e, n) {
      var l = e.style;
      for (var o in n)
        if (n.hasOwnProperty(o)) {
          var c = o.indexOf("--") === 0;
          c || am(o, n[o]);
          var h = yf(o, n[o], c);
          o === "float" && (o = "cssFloat"), c ? l.setProperty(o, h) : l[o] = h;
        }
    }
    function T1(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function lm(e) {
      var n = {};
      for (var l in e)
        for (var o = Xu[l] || [l], c = 0; c < o.length; c++)
          n[o[c]] = l;
      return n;
    }
    function R1(e, n) {
      {
        if (!n)
          return;
        var l = lm(e), o = lm(n), c = {};
        for (var h in l) {
          var E = l[h], T = o[h];
          if (T && E !== T) {
            var M = E + "," + T;
            if (c[M])
              continue;
            c[M] = !0, v("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", T1(e[E]) ? "Removing" : "Updating", E, T);
          }
        }
      }
    }
    var Fi = {
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
    }, Ju = Qt({
      menuitem: !0
    }, Fi), om = "__html";
    function gf(e, n) {
      if (n) {
        if (Ju[e] && (n.children != null || n.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (n.dangerouslySetInnerHTML != null) {
          if (n.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof n.dangerouslySetInnerHTML != "object" || !(om in n.dangerouslySetInnerHTML))
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
    var ec = {
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
    }, Sf = {
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
    }, Qs = {}, M1 = new RegExp("^(aria)-[" + Se + "]*$"), Xs = new RegExp("^(aria)[A-Z][" + Se + "]*$");
    function Mp(e, n) {
      {
        if (Oe.call(Qs, n) && Qs[n])
          return !0;
        if (Xs.test(n)) {
          var l = "aria-" + n.slice(4).toLowerCase(), o = Sf.hasOwnProperty(l) ? l : null;
          if (o == null)
            return v("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", n), Qs[n] = !0, !0;
          if (n !== o)
            return v("Invalid ARIA attribute `%s`. Did you mean `%s`?", n, o), Qs[n] = !0, !0;
        }
        if (M1.test(n)) {
          var c = n.toLowerCase(), h = Sf.hasOwnProperty(c) ? c : null;
          if (h == null)
            return Qs[n] = !0, !1;
          if (n !== h)
            return v("Unknown ARIA attribute `%s`. Did you mean `%s`?", n, h), Qs[n] = !0, !0;
        }
      }
      return !0;
    }
    function tc(e, n) {
      {
        var l = [];
        for (var o in n) {
          var c = Mp(e, o);
          c || l.push(o);
        }
        var h = l.map(function(E) {
          return "`" + E + "`";
        }).join(", ");
        l.length === 1 ? v("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", h, e) : l.length > 1 && v("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", h, e);
      }
    }
    function _p(e, n) {
      fo(e, n) || tc(e, n);
    }
    var Dp = !1;
    function Ef(e, n) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        n != null && n.value === null && !Dp && (Dp = !0, e === "select" && n.multiple ? v("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : v("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var Ko = function() {
    };
    {
      var Vr = {}, kp = /^on./, xf = /^on[^A-Z]/, sm = new RegExp("^(aria)-[" + Se + "]*$"), um = new RegExp("^(aria)[A-Z][" + Se + "]*$");
      Ko = function(e, n, l, o) {
        if (Oe.call(Vr, n) && Vr[n])
          return !0;
        var c = n.toLowerCase();
        if (c === "onfocusin" || c === "onfocusout")
          return v("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Vr[n] = !0, !0;
        if (o != null) {
          var h = o.registrationNameDependencies, E = o.possibleRegistrationNames;
          if (h.hasOwnProperty(n))
            return !0;
          var T = E.hasOwnProperty(c) ? E[c] : null;
          if (T != null)
            return v("Invalid event handler property `%s`. Did you mean `%s`?", n, T), Vr[n] = !0, !0;
          if (kp.test(n))
            return v("Unknown event handler property `%s`. It will be ignored.", n), Vr[n] = !0, !0;
        } else if (kp.test(n))
          return xf.test(n) && v("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", n), Vr[n] = !0, !0;
        if (sm.test(n) || um.test(n))
          return !0;
        if (c === "innerhtml")
          return v("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Vr[n] = !0, !0;
        if (c === "aria")
          return v("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Vr[n] = !0, !0;
        if (c === "is" && l !== null && l !== void 0 && typeof l != "string")
          return v("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof l), Vr[n] = !0, !0;
        if (typeof l == "number" && isNaN(l))
          return v("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", n), Vr[n] = !0, !0;
        var M = ke(n), z = M !== null && M.type === at;
        if (ec.hasOwnProperty(c)) {
          var N = ec[c];
          if (N !== n)
            return v("Invalid DOM property `%s`. Did you mean `%s`?", n, N), Vr[n] = !0, !0;
        } else if (!z && n !== c)
          return v("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", n, c), Vr[n] = !0, !0;
        return typeof l == "boolean" && Et(n, l, M, !1) ? (l ? v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', l, n, n, l, n) : v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', l, n, n, l, n, n, n), Vr[n] = !0, !0) : z ? !0 : Et(n, l, M, !1) ? (Vr[n] = !0, !1) : ((l === "false" || l === "true") && M !== null && M.type === Be && (v("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", l, n, l === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', n, l), Vr[n] = !0), !0);
      };
    }
    var cm = function(e, n, l) {
      {
        var o = [];
        for (var c in n) {
          var h = Ko(e, c, n[c], l);
          h || o.push(c);
        }
        var E = o.map(function(T) {
          return "`" + T + "`";
        }).join(", ");
        o.length === 1 ? v("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", E, e) : o.length > 1 && v("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", E, e);
      }
    };
    function fm(e, n, l) {
      fo(e, n) || cm(e, n, l);
    }
    var Op = 1, wf = 2, ui = 4, Ap = Op | wf | ui, Zo = null;
    function _1(e) {
      Zo !== null && v("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Zo = e;
    }
    function D1() {
      Zo === null && v("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Zo = null;
    }
    function nc(e) {
      return e === Zo;
    }
    function Lp(e) {
      var n = e.target || e.srcElement || window;
      return n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === kl ? n.parentNode : n;
    }
    var Cf = null, Jo = null, Dn = null;
    function bf(e) {
      var n = yu(e);
      if (n) {
        if (typeof Cf != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var l = n.stateNode;
        if (l) {
          var o = Ey(l);
          Cf(n.stateNode, n.type, o);
        }
      }
    }
    function Tf(e) {
      Cf = e;
    }
    function Ks(e) {
      Jo ? Dn ? Dn.push(e) : Dn = [e] : Jo = e;
    }
    function dm() {
      return Jo !== null || Dn !== null;
    }
    function Rf() {
      if (Jo) {
        var e = Jo, n = Dn;
        if (Jo = null, Dn = null, bf(e), n)
          for (var l = 0; l < n.length; l++)
            bf(n[l]);
      }
    }
    var Zs = function(e, n) {
      return e(n);
    }, rc = function() {
    }, po = !1;
    function pm() {
      var e = dm();
      e && (rc(), Rf());
    }
    function vm(e, n, l) {
      if (po)
        return e(n, l);
      po = !0;
      try {
        return Zs(e, n, l);
      } finally {
        po = !1, pm();
      }
    }
    function k1(e, n, l) {
      Zs = e, rc = l;
    }
    function hm(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Mf(e, n, l) {
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
          return !!(l.disabled && hm(n));
        default:
          return !1;
      }
    }
    function vo(e, n) {
      var l = e.stateNode;
      if (l === null)
        return null;
      var o = Ey(l);
      if (o === null)
        return null;
      var c = o[n];
      if (Mf(n, e.type, o))
        return null;
      if (c && typeof c != "function")
        throw new Error("Expected `" + n + "` listener to be a function, instead got a value of `" + typeof c + "` type.");
      return c;
    }
    var ac = !1;
    if (nt)
      try {
        var es = {};
        Object.defineProperty(es, "passive", {
          get: function() {
            ac = !0;
          }
        }), window.addEventListener("test", es, es), window.removeEventListener("test", es, es);
      } catch {
        ac = !1;
      }
    function _f(e, n, l, o, c, h, E, T, M) {
      var z = Array.prototype.slice.call(arguments, 3);
      try {
        n.apply(l, z);
      } catch (N) {
        this.onError(N);
      }
    }
    var Df = _f;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var zp = document.createElement("react");
      Df = function(n, l, o, c, h, E, T, M, z) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var N = document.createEvent("Event"), te = !1, J = !0, ve = window.event, ge = Object.getOwnPropertyDescriptor(window, "event");
        function xe() {
          zp.removeEventListener(we, Nt, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = ve);
        }
        var lt = Array.prototype.slice.call(arguments, 3);
        function Nt() {
          te = !0, xe(), l.apply(o, lt), J = !1;
        }
        var _t, mn = !1, fn = !1;
        function ce(fe) {
          if (_t = fe.error, mn = !0, _t === null && fe.colno === 0 && fe.lineno === 0 && (fn = !0), fe.defaultPrevented && _t != null && typeof _t == "object")
            try {
              _t._suppressLogging = !0;
            } catch {
            }
        }
        var we = "react-" + (n || "invokeguardedcallback");
        if (window.addEventListener("error", ce), zp.addEventListener(we, Nt, !1), N.initEvent(we, !1, !1), zp.dispatchEvent(N), ge && Object.defineProperty(window, "event", ge), te && J && (mn ? fn && (_t = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : _t = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(_t)), window.removeEventListener("error", ce), !te)
          return xe(), _f.apply(this, arguments);
      };
    }
    var mm = Df, Js = !1, kf = null, eu = !1, nl = null, ym = {
      onError: function(e) {
        Js = !0, kf = e;
      }
    };
    function ho(e, n, l, o, c, h, E, T, M) {
      Js = !1, kf = null, mm.apply(ym, arguments);
    }
    function rl(e, n, l, o, c, h, E, T, M) {
      if (ho.apply(this, arguments), Js) {
        var z = lc();
        eu || (eu = !0, nl = z);
      }
    }
    function ic() {
      if (eu) {
        var e = nl;
        throw eu = !1, nl = null, e;
      }
    }
    function Al() {
      return Js;
    }
    function lc() {
      if (Js) {
        var e = kf;
        return Js = !1, kf = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function tu(e) {
      return e._reactInternals;
    }
    function O1(e) {
      return e._reactInternals !== void 0;
    }
    function ts(e, n) {
      e._reactInternals = n;
    }
    var At = (
      /*                      */
      0
    ), Pi = (
      /*                */
      1
    ), er = (
      /*                    */
      2
    ), pn = (
      /*                       */
      4
    ), ci = (
      /*                */
      16
    ), fi = (
      /*                 */
      32
    ), Pn = (
      /*                     */
      64
    ), kt = (
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
    ), Oa = (
      /*                    */
      4096
    ), mr = (
      /*                   */
      8192
    ), nu = (
      /*             */
      16384
    ), gm = (
      /*               */
      32767
    ), oc = (
      /*                   */
      32768
    ), zr = (
      /*                */
      65536
    ), Of = (
      /* */
      131072
    ), al = (
      /*                       */
      1048576
    ), ru = (
      /*                    */
      2097152
    ), Ll = (
      /*                 */
      4194304
    ), Af = (
      /*                */
      8388608
    ), mo = (
      /*               */
      16777216
    ), il = (
      /*              */
      33554432
    ), yo = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      pn | _r | 0
    ), go = er | pn | ci | fi | ir | Oa | mr, So = pn | Pn | ir | mr, zl = ka | ci, yr = Ll | Af | ru, di = s.ReactCurrentOwner;
    function Ba(e) {
      var n = e, l = e;
      if (e.alternate)
        for (; n.return; )
          n = n.return;
      else {
        var o = n;
        do
          n = o, (n.flags & (er | Oa)) !== At && (l = n.return), o = n.return;
        while (o);
      }
      return n.tag === b ? l : null;
    }
    function ll(e) {
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
    function ol(e) {
      return e.tag === b ? e.stateNode.containerInfo : null;
    }
    function ns(e) {
      return Ba(e) === e;
    }
    function Sm(e) {
      {
        var n = di.current;
        if (n !== null && n.tag === x) {
          var l = n, o = l.stateNode;
          o._warnedAboutRefsInRender || v("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Bt(l) || "A component"), o._warnedAboutRefsInRender = !0;
        }
      }
      var c = tu(e);
      return c ? Ba(c) === c : !1;
    }
    function Lf(e) {
      if (Ba(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function zf(e) {
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
        var E = h.alternate;
        if (E === null) {
          var T = h.return;
          if (T !== null) {
            o = c = T;
            continue;
          }
          break;
        }
        if (h.child === E.child) {
          for (var M = h.child; M; ) {
            if (M === o)
              return Lf(h), e;
            if (M === c)
              return Lf(h), n;
            M = M.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (o.return !== c.return)
          o = h, c = E;
        else {
          for (var z = !1, N = h.child; N; ) {
            if (N === o) {
              z = !0, o = h, c = E;
              break;
            }
            if (N === c) {
              z = !0, c = h, o = E;
              break;
            }
            N = N.sibling;
          }
          if (!z) {
            for (N = E.child; N; ) {
              if (N === o) {
                z = !0, o = E, c = h;
                break;
              }
              if (N === c) {
                z = !0, c = E, o = h;
                break;
              }
              N = N.sibling;
            }
            if (!z)
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
      var n = zf(e);
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
      var n = zf(e);
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
    var Np = a.unstable_scheduleCallback, Em = a.unstable_cancelCallback, Up = a.unstable_shouldYield, jp = a.unstable_requestPaint, Dr = a.unstable_now, Nf = a.unstable_getCurrentPriorityLevel, sc = a.unstable_ImmediatePriority, Eo = a.unstable_UserBlockingPriority, Nl = a.unstable_NormalPriority, A1 = a.unstable_LowPriority, rs = a.unstable_IdlePriority, Uf = a.unstable_yieldValue, xm = a.unstable_setDisableYieldValue, as = null, or = null, it = null, Ga = !1, za = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function au(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var n = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (n.isDisabled)
        return !0;
      if (!n.supportsFiber)
        return v("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        Ce && (e = Qt({}, e, {
          getLaneLabelMap: is,
          injectProfilingHooks: vi
        })), as = n.inject(e), or = n;
      } catch (l) {
        v("React instrumentation encountered an error: %s.", l);
      }
      return !!n.checkDCE;
    }
    function Fp(e, n) {
      if (or && typeof or.onScheduleFiberRoot == "function")
        try {
          or.onScheduleFiberRoot(as, e, n);
        } catch (l) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", l));
        }
    }
    function Pp(e, n) {
      if (or && typeof or.onCommitFiberRoot == "function")
        try {
          var l = (e.current.flags & kt) === kt;
          if (be) {
            var o;
            switch (n) {
              case pa:
                o = sc;
                break;
              case ul:
                o = Eo;
                break;
              case hi:
                o = Nl;
                break;
              case mi:
                o = rs;
                break;
              default:
                o = Nl;
                break;
            }
            or.onCommitFiberRoot(as, e, o, l);
          }
        } catch (c) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", c));
        }
    }
    function $p(e) {
      if (or && typeof or.onPostCommitFiberRoot == "function")
        try {
          or.onPostCommitFiberRoot(as, e);
        } catch (n) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", n));
        }
    }
    function Hp(e) {
      if (or && typeof or.onCommitFiberUnmount == "function")
        try {
          or.onCommitFiberUnmount(as, e);
        } catch (n) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", n));
        }
    }
    function tr(e) {
      if (typeof Uf == "function" && (xm(e), p(e)), or && typeof or.setStrictMode == "function")
        try {
          or.setStrictMode(as, e);
        } catch (n) {
          Ga || (Ga = !0, v("React instrumentation encountered an error: %s", n));
        }
    }
    function vi(e) {
      it = e;
    }
    function is() {
      {
        for (var e = /* @__PURE__ */ new Map(), n = 1, l = 0; l < ss; l++) {
          var o = Tm(n);
          e.set(n, o), n *= 2;
        }
        return e;
      }
    }
    function Vp(e) {
      it !== null && typeof it.markCommitStarted == "function" && it.markCommitStarted(e);
    }
    function Ip() {
      it !== null && typeof it.markCommitStopped == "function" && it.markCommitStopped();
    }
    function Qa(e) {
      it !== null && typeof it.markComponentRenderStarted == "function" && it.markComponentRenderStarted(e);
    }
    function Xa() {
      it !== null && typeof it.markComponentRenderStopped == "function" && it.markComponentRenderStopped();
    }
    function qp(e) {
      it !== null && typeof it.markComponentPassiveEffectMountStarted == "function" && it.markComponentPassiveEffectMountStarted(e);
    }
    function wm() {
      it !== null && typeof it.markComponentPassiveEffectMountStopped == "function" && it.markComponentPassiveEffectMountStopped();
    }
    function Ul(e) {
      it !== null && typeof it.markComponentPassiveEffectUnmountStarted == "function" && it.markComponentPassiveEffectUnmountStarted(e);
    }
    function xo() {
      it !== null && typeof it.markComponentPassiveEffectUnmountStopped == "function" && it.markComponentPassiveEffectUnmountStopped();
    }
    function jf(e) {
      it !== null && typeof it.markComponentLayoutEffectMountStarted == "function" && it.markComponentLayoutEffectMountStarted(e);
    }
    function Cm() {
      it !== null && typeof it.markComponentLayoutEffectMountStopped == "function" && it.markComponentLayoutEffectMountStopped();
    }
    function uc(e) {
      it !== null && typeof it.markComponentLayoutEffectUnmountStarted == "function" && it.markComponentLayoutEffectUnmountStarted(e);
    }
    function Yp() {
      it !== null && typeof it.markComponentLayoutEffectUnmountStopped == "function" && it.markComponentLayoutEffectUnmountStopped();
    }
    function cc(e, n, l) {
      it !== null && typeof it.markComponentErrored == "function" && it.markComponentErrored(e, n, l);
    }
    function sl(e, n, l) {
      it !== null && typeof it.markComponentSuspended == "function" && it.markComponentSuspended(e, n, l);
    }
    function fc(e) {
      it !== null && typeof it.markLayoutEffectsStarted == "function" && it.markLayoutEffectsStarted(e);
    }
    function dc() {
      it !== null && typeof it.markLayoutEffectsStopped == "function" && it.markLayoutEffectsStopped();
    }
    function ls(e) {
      it !== null && typeof it.markPassiveEffectsStarted == "function" && it.markPassiveEffectsStarted(e);
    }
    function Wp() {
      it !== null && typeof it.markPassiveEffectsStopped == "function" && it.markPassiveEffectsStopped();
    }
    function os(e) {
      it !== null && typeof it.markRenderStarted == "function" && it.markRenderStarted(e);
    }
    function bm() {
      it !== null && typeof it.markRenderYielded == "function" && it.markRenderYielded();
    }
    function Ff() {
      it !== null && typeof it.markRenderStopped == "function" && it.markRenderStopped();
    }
    function nr(e) {
      it !== null && typeof it.markRenderScheduled == "function" && it.markRenderScheduled(e);
    }
    function Pf(e, n) {
      it !== null && typeof it.markForceUpdateScheduled == "function" && it.markForceUpdateScheduled(e, n);
    }
    function pc(e, n) {
      it !== null && typeof it.markStateUpdateScheduled == "function" && it.markStateUpdateScheduled(e, n);
    }
    var Lt = (
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
    ), gr = Math.clz32 ? Math.clz32 : vc, Nr = Math.log, $f = Math.LN2;
    function vc(e) {
      var n = e >>> 0;
      return n === 0 ? 32 : 31 - (Nr(n) / $f | 0) | 0;
    }
    var ss = 31, Le = (
      /*                        */
      0
    ), wn = (
      /*                          */
      0
    ), Ht = (
      /*                        */
      1
    ), wo = (
      /*    */
      2
    ), $i = (
      /*             */
      4
    ), ta = (
      /*            */
      8
    ), sr = (
      /*                     */
      16
    ), jl = (
      /*                */
      32
    ), Co = (
      /*                       */
      4194240
    ), us = (
      /*                        */
      64
    ), Hf = (
      /*                        */
      128
    ), Vf = (
      /*                        */
      256
    ), If = (
      /*                        */
      512
    ), qf = (
      /*                        */
      1024
    ), Yf = (
      /*                        */
      2048
    ), Wf = (
      /*                        */
      4096
    ), Bf = (
      /*                        */
      8192
    ), Gf = (
      /*                        */
      16384
    ), cs = (
      /*                       */
      32768
    ), Qf = (
      /*                       */
      65536
    ), iu = (
      /*                       */
      131072
    ), lu = (
      /*                       */
      262144
    ), Xf = (
      /*                       */
      524288
    ), hc = (
      /*                       */
      1048576
    ), Kf = (
      /*                       */
      2097152
    ), mc = (
      /*                            */
      130023424
    ), fs = (
      /*                             */
      4194304
    ), Zf = (
      /*                             */
      8388608
    ), yc = (
      /*                             */
      16777216
    ), Jf = (
      /*                             */
      33554432
    ), ed = (
      /*                             */
      67108864
    ), Bp = fs, gc = (
      /*          */
      134217728
    ), Gp = (
      /*                          */
      268435455
    ), Sc = (
      /*               */
      268435456
    ), ds = (
      /*                        */
      536870912
    ), Na = (
      /*                   */
      1073741824
    );
    function Tm(e) {
      {
        if (e & Ht)
          return "Sync";
        if (e & wo)
          return "InputContinuousHydration";
        if (e & $i)
          return "InputContinuous";
        if (e & ta)
          return "DefaultHydration";
        if (e & sr)
          return "Default";
        if (e & jl)
          return "TransitionHydration";
        if (e & Co)
          return "Transition";
        if (e & mc)
          return "Retry";
        if (e & gc)
          return "SelectiveHydration";
        if (e & Sc)
          return "IdleHydration";
        if (e & ds)
          return "Idle";
        if (e & Na)
          return "Offscreen";
      }
    }
    var jn = -1, ps = us, td = fs;
    function Ec(e) {
      switch (bo(e)) {
        case Ht:
          return Ht;
        case wo:
          return wo;
        case $i:
          return $i;
        case ta:
          return ta;
        case sr:
          return sr;
        case jl:
          return jl;
        case us:
        case Hf:
        case Vf:
        case If:
        case qf:
        case Yf:
        case Wf:
        case Bf:
        case Gf:
        case cs:
        case Qf:
        case iu:
        case lu:
        case Xf:
        case hc:
        case Kf:
          return e & Co;
        case fs:
        case Zf:
        case yc:
        case Jf:
        case ed:
          return e & mc;
        case gc:
          return gc;
        case Sc:
          return Sc;
        case ds:
          return ds;
        case Na:
          return Na;
        default:
          return v("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function nd(e, n) {
      var l = e.pendingLanes;
      if (l === Le)
        return Le;
      var o = Le, c = e.suspendedLanes, h = e.pingedLanes, E = l & Gp;
      if (E !== Le) {
        var T = E & ~c;
        if (T !== Le)
          o = Ec(T);
        else {
          var M = E & h;
          M !== Le && (o = Ec(M));
        }
      } else {
        var z = l & ~c;
        z !== Le ? o = Ec(z) : h !== Le && (o = Ec(h));
      }
      if (o === Le)
        return Le;
      if (n !== Le && n !== o && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (n & c) === Le) {
        var N = bo(o), te = bo(n);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          N >= te || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          N === sr && (te & Co) !== Le
        )
          return n;
      }
      (o & $i) !== Le && (o |= l & sr);
      var J = e.entangledLanes;
      if (J !== Le)
        for (var ve = e.entanglements, ge = o & J; ge > 0; ) {
          var xe = Sr(ge), lt = 1 << xe;
          o |= ve[xe], ge &= ~lt;
        }
      return o;
    }
    function Hi(e, n) {
      for (var l = e.eventTimes, o = jn; n > 0; ) {
        var c = Sr(n), h = 1 << c, E = l[c];
        E > o && (o = E), n &= ~h;
      }
      return o;
    }
    function Qp(e, n) {
      switch (e) {
        case Ht:
        case wo:
        case $i:
          return n + 250;
        case ta:
        case sr:
        case jl:
        case us:
        case Hf:
        case Vf:
        case If:
        case qf:
        case Yf:
        case Wf:
        case Bf:
        case Gf:
        case cs:
        case Qf:
        case iu:
        case lu:
        case Xf:
        case hc:
        case Kf:
          return n + 5e3;
        case fs:
        case Zf:
        case yc:
        case Jf:
        case ed:
          return jn;
        case gc:
        case Sc:
        case ds:
        case Na:
          return jn;
        default:
          return v("Should have found matching lanes. This is a bug in React."), jn;
      }
    }
    function rd(e, n) {
      for (var l = e.pendingLanes, o = e.suspendedLanes, c = e.pingedLanes, h = e.expirationTimes, E = l; E > 0; ) {
        var T = Sr(E), M = 1 << T, z = h[T];
        z === jn ? ((M & o) === Le || (M & c) !== Le) && (h[T] = Qp(M, n)) : z <= n && (e.expiredLanes |= M), E &= ~M;
      }
    }
    function Rm(e) {
      return Ec(e.pendingLanes);
    }
    function ad(e) {
      var n = e.pendingLanes & ~Na;
      return n !== Le ? n : n & Na ? Na : Le;
    }
    function Mm(e) {
      return (e & Ht) !== Le;
    }
    function xc(e) {
      return (e & Gp) !== Le;
    }
    function vs(e) {
      return (e & mc) === e;
    }
    function Xp(e) {
      var n = Ht | $i | sr;
      return (e & n) === Le;
    }
    function Kp(e) {
      return (e & Co) === e;
    }
    function id(e, n) {
      var l = wo | $i | ta | sr;
      return (n & l) !== Le;
    }
    function _m(e, n) {
      return (n & e.expiredLanes) !== Le;
    }
    function Zp(e) {
      return (e & Co) !== Le;
    }
    function Jp() {
      var e = ps;
      return ps <<= 1, (ps & Co) === Le && (ps = us), e;
    }
    function Dm() {
      var e = td;
      return td <<= 1, (td & mc) === Le && (td = fs), e;
    }
    function bo(e) {
      return e & -e;
    }
    function wc(e) {
      return bo(e);
    }
    function Sr(e) {
      return 31 - gr(e);
    }
    function Ir(e) {
      return Sr(e);
    }
    function Ua(e, n) {
      return (e & n) !== Le;
    }
    function hs(e, n) {
      return (e & n) === n;
    }
    function en(e, n) {
      return e | n;
    }
    function Cc(e, n) {
      return e & ~n;
    }
    function ev(e, n) {
      return e & n;
    }
    function km(e) {
      return e;
    }
    function Om(e, n) {
      return e !== wn && e < n ? e : n;
    }
    function bc(e) {
      for (var n = [], l = 0; l < ss; l++)
        n.push(e);
      return n;
    }
    function ou(e, n, l) {
      e.pendingLanes |= n, n !== ds && (e.suspendedLanes = Le, e.pingedLanes = Le);
      var o = e.eventTimes, c = Ir(n);
      o[c] = l;
    }
    function Am(e, n) {
      e.suspendedLanes |= n, e.pingedLanes &= ~n;
      for (var l = e.expirationTimes, o = n; o > 0; ) {
        var c = Sr(o), h = 1 << c;
        l[c] = jn, o &= ~h;
      }
    }
    function ld(e, n, l) {
      e.pingedLanes |= e.suspendedLanes & n;
    }
    function tv(e, n) {
      var l = e.pendingLanes & ~n;
      e.pendingLanes = n, e.suspendedLanes = Le, e.pingedLanes = Le, e.expiredLanes &= n, e.mutableReadLanes &= n, e.entangledLanes &= n;
      for (var o = e.entanglements, c = e.eventTimes, h = e.expirationTimes, E = l; E > 0; ) {
        var T = Sr(E), M = 1 << T;
        o[T] = Le, c[T] = jn, h[T] = jn, E &= ~M;
      }
    }
    function od(e, n) {
      for (var l = e.entangledLanes |= n, o = e.entanglements, c = l; c; ) {
        var h = Sr(c), E = 1 << h;
        // Is this one of the newly entangled lanes?
        E & n | // Is this lane transitively entangled with the newly entangled lanes?
        o[h] & n && (o[h] |= n), c &= ~E;
      }
    }
    function nv(e, n) {
      var l = bo(n), o;
      switch (l) {
        case $i:
          o = wo;
          break;
        case sr:
          o = ta;
          break;
        case us:
        case Hf:
        case Vf:
        case If:
        case qf:
        case Yf:
        case Wf:
        case Bf:
        case Gf:
        case cs:
        case Qf:
        case iu:
        case lu:
        case Xf:
        case hc:
        case Kf:
        case fs:
        case Zf:
        case yc:
        case Jf:
        case ed:
          o = jl;
          break;
        case ds:
          o = Sc;
          break;
        default:
          o = wn;
          break;
      }
      return (o & (e.suspendedLanes | n)) !== wn ? wn : o;
    }
    function Tc(e, n, l) {
      if (za)
        for (var o = e.pendingUpdatersLaneMap; l > 0; ) {
          var c = Ir(l), h = 1 << c, E = o[c];
          E.add(n), l &= ~h;
        }
    }
    function Lm(e, n) {
      if (za)
        for (var l = e.pendingUpdatersLaneMap, o = e.memoizedUpdaters; n > 0; ) {
          var c = Ir(n), h = 1 << c, E = l[c];
          E.size > 0 && (E.forEach(function(T) {
            var M = T.alternate;
            (M === null || !o.has(M)) && o.add(T);
          }), E.clear()), n &= ~h;
        }
    }
    function rv(e, n) {
      return null;
    }
    var pa = Ht, ul = $i, hi = sr, mi = ds, Rc = wn;
    function yi() {
      return Rc;
    }
    function Er(e) {
      Rc = e;
    }
    function zm(e, n) {
      var l = Rc;
      try {
        return Rc = e, n();
      } finally {
        Rc = l;
      }
    }
    function Nm(e, n) {
      return e !== 0 && e < n ? e : n;
    }
    function Mc(e, n) {
      return e > n ? e : n;
    }
    function Ur(e, n) {
      return e !== 0 && e < n;
    }
    function Um(e) {
      var n = bo(e);
      return Ur(pa, n) ? Ur(ul, n) ? xc(n) ? hi : mi : ul : pa;
    }
    function sd(e) {
      var n = e.current.memoizedState;
      return n.isDehydrated;
    }
    var _c;
    function na(e) {
      _c = e;
    }
    function L1(e) {
      _c(e);
    }
    var gt;
    function su(e) {
      gt = e;
    }
    var ud;
    function jm(e) {
      ud = e;
    }
    var Fm;
    function Dc(e) {
      Fm = e;
    }
    var kc;
    function av(e) {
      kc = e;
    }
    var cd = !1, Oc = [], Fl = null, cl = null, fl = null, ur = /* @__PURE__ */ new Map(), va = /* @__PURE__ */ new Map(), ha = [], Pm = [
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
    function $m(e) {
      return Pm.indexOf(e) > -1;
    }
    function Vi(e, n, l, o, c) {
      return {
        blockedOn: e,
        domEventName: n,
        eventSystemFlags: l,
        nativeEvent: c,
        targetContainers: [o]
      };
    }
    function iv(e, n) {
      switch (e) {
        case "focusin":
        case "focusout":
          Fl = null;
          break;
        case "dragenter":
        case "dragleave":
          cl = null;
          break;
        case "mouseover":
        case "mouseout":
          fl = null;
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
    function ja(e, n, l, o, c, h) {
      if (e === null || e.nativeEvent !== h) {
        var E = Vi(n, l, o, c, h);
        if (n !== null) {
          var T = yu(n);
          T !== null && gt(T);
        }
        return E;
      }
      e.eventSystemFlags |= o;
      var M = e.targetContainers;
      return c !== null && M.indexOf(c) === -1 && M.push(c), e;
    }
    function z1(e, n, l, o, c) {
      switch (n) {
        case "focusin": {
          var h = c;
          return Fl = ja(Fl, e, n, l, o, h), !0;
        }
        case "dragenter": {
          var E = c;
          return cl = ja(cl, e, n, l, o, E), !0;
        }
        case "mouseover": {
          var T = c;
          return fl = ja(fl, e, n, l, o, T), !0;
        }
        case "pointerover": {
          var M = c, z = M.pointerId;
          return ur.set(z, ja(ur.get(z) || null, e, n, l, o, M)), !0;
        }
        case "gotpointercapture": {
          var N = c, te = N.pointerId;
          return va.set(te, ja(va.get(te) || null, e, n, l, o, N)), !0;
        }
      }
      return !1;
    }
    function lv(e) {
      var n = Ic(e.target);
      if (n !== null) {
        var l = Ba(n);
        if (l !== null) {
          var o = l.tag;
          if (o === V) {
            var c = ll(l);
            if (c !== null) {
              e.blockedOn = c, kc(e.priority, function() {
                ud(l);
              });
              return;
            }
          } else if (o === b) {
            var h = l.stateNode;
            if (sd(h)) {
              e.blockedOn = ol(l);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Hm(e) {
      for (var n = Fm(), l = {
        blockedOn: null,
        target: e,
        priority: n
      }, o = 0; o < ha.length && Ur(n, ha[o].priority); o++)
        ;
      ha.splice(o, 0, l), o === 0 && lv(l);
    }
    function Ac(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var n = e.targetContainers; n.length > 0; ) {
        var l = n[0], o = cu(e.domEventName, e.eventSystemFlags, l, e.nativeEvent);
        if (o === null) {
          var c = e.nativeEvent, h = new c.constructor(c.type, c);
          _1(h), c.target.dispatchEvent(h), D1();
        } else {
          var E = yu(o);
          return E !== null && gt(E), e.blockedOn = o, !1;
        }
        n.shift();
      }
      return !0;
    }
    function ov(e, n, l) {
      Ac(e) && l.delete(n);
    }
    function N1() {
      cd = !1, Fl !== null && Ac(Fl) && (Fl = null), cl !== null && Ac(cl) && (cl = null), fl !== null && Ac(fl) && (fl = null), ur.forEach(ov), va.forEach(ov);
    }
    function To(e, n) {
      e.blockedOn === n && (e.blockedOn = null, cd || (cd = !0, a.unstable_scheduleCallback(a.unstable_NormalPriority, N1)));
    }
    function ms(e) {
      if (Oc.length > 0) {
        To(Oc[0], e);
        for (var n = 1; n < Oc.length; n++) {
          var l = Oc[n];
          l.blockedOn === e && (l.blockedOn = null);
        }
      }
      Fl !== null && To(Fl, e), cl !== null && To(cl, e), fl !== null && To(fl, e);
      var o = function(T) {
        return To(T, e);
      };
      ur.forEach(o), va.forEach(o);
      for (var c = 0; c < ha.length; c++) {
        var h = ha[c];
        h.blockedOn === e && (h.blockedOn = null);
      }
      for (; ha.length > 0; ) {
        var E = ha[0];
        if (E.blockedOn !== null)
          break;
        lv(E), E.blockedOn === null && ha.shift();
      }
    }
    var qr = s.ReactCurrentBatchConfig, vn = !0;
    function kr(e) {
      vn = !!e;
    }
    function xr() {
      return vn;
    }
    function Yr(e, n, l) {
      var o = fd(n), c;
      switch (o) {
        case pa:
          c = Ka;
          break;
        case ul:
          c = uu;
          break;
        case hi:
        default:
          c = cr;
          break;
      }
      return c.bind(null, n, l, e);
    }
    function Ka(e, n, l, o) {
      var c = yi(), h = qr.transition;
      qr.transition = null;
      try {
        Er(pa), cr(e, n, l, o);
      } finally {
        Er(c), qr.transition = h;
      }
    }
    function uu(e, n, l, o) {
      var c = yi(), h = qr.transition;
      qr.transition = null;
      try {
        Er(ul), cr(e, n, l, o);
      } finally {
        Er(c), qr.transition = h;
      }
    }
    function cr(e, n, l, o) {
      vn && Lc(e, n, l, o);
    }
    function Lc(e, n, l, o) {
      var c = cu(e, n, l, o);
      if (c === null) {
        Z1(e, n, o, dl, l), iv(e, o);
        return;
      }
      if (z1(c, e, n, l, o)) {
        o.stopPropagation();
        return;
      }
      if (iv(e, o), n & ui && $m(e)) {
        for (; c !== null; ) {
          var h = yu(c);
          h !== null && L1(h);
          var E = cu(e, n, l, o);
          if (E === null && Z1(e, n, o, dl, l), E === c)
            break;
          c = E;
        }
        c !== null && o.stopPropagation();
        return;
      }
      Z1(e, n, o, null, l);
    }
    var dl = null;
    function cu(e, n, l, o) {
      dl = null;
      var c = Lp(o), h = Ic(c);
      if (h !== null) {
        var E = Ba(h);
        if (E === null)
          h = null;
        else {
          var T = E.tag;
          if (T === V) {
            var M = ll(E);
            if (M !== null)
              return M;
            h = null;
          } else if (T === b) {
            var z = E.stateNode;
            if (sd(z))
              return ol(E);
            h = null;
          } else E !== h && (h = null);
        }
      }
      return dl = h, null;
    }
    function fd(e) {
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
          return ul;
        case "message": {
          var n = Nf();
          switch (n) {
            case sc:
              return pa;
            case Eo:
              return ul;
            case Nl:
            case A1:
              return hi;
            case rs:
              return mi;
            default:
              return hi;
          }
        }
        default:
          return hi;
      }
    }
    function zc(e, n, l) {
      return e.addEventListener(n, l, !1), l;
    }
    function Fa(e, n, l) {
      return e.addEventListener(n, l, !0), l;
    }
    function sv(e, n, l, o) {
      return e.addEventListener(n, l, {
        capture: !0,
        passive: o
      }), l;
    }
    function fu(e, n, l, o) {
      return e.addEventListener(n, l, {
        passive: o
      }), l;
    }
    var Za = null, du = null, ys = null;
    function Ro(e) {
      return Za = e, du = Nc(), !0;
    }
    function dd() {
      Za = null, du = null, ys = null;
    }
    function Pl() {
      if (ys)
        return ys;
      var e, n = du, l = n.length, o, c = Nc(), h = c.length;
      for (e = 0; e < l && n[e] === c[e]; e++)
        ;
      var E = l - e;
      for (o = 1; o <= E && n[l - o] === c[h - o]; o++)
        ;
      var T = o > 1 ? 1 - o : void 0;
      return ys = c.slice(e, T), ys;
    }
    function Nc() {
      return "value" in Za ? Za.value : Za.textContent;
    }
    function Mo(e) {
      var n, l = e.keyCode;
      return "charCode" in e ? (n = e.charCode, n === 0 && l === 13 && (n = 13)) : n = l, n === 10 && (n = 13), n >= 32 || n === 13 ? n : 0;
    }
    function pu() {
      return !0;
    }
    function Uc() {
      return !1;
    }
    function ra(e) {
      function n(l, o, c, h, E) {
        this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = h, this.target = E, this.currentTarget = null;
        for (var T in e)
          if (e.hasOwnProperty(T)) {
            var M = e[T];
            M ? this[T] = M(h) : this[T] = h[T];
          }
        var z = h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1;
        return z ? this.isDefaultPrevented = pu : this.isDefaultPrevented = Uc, this.isPropagationStopped = Uc, this;
      }
      return Qt(n.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = pu);
        },
        stopPropagation: function() {
          var l = this.nativeEvent;
          l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = pu);
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
        isPersistent: pu
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
    }, pl = ra(wr), ma = Qt({}, wr, {
      view: 0,
      detail: 0
    }), Pa = ra(ma), pd, jc, gs;
    function U1(e) {
      e !== gs && (gs && e.type === "mousemove" ? (pd = e.screenX - gs.screenX, jc = e.screenY - gs.screenY) : (pd = 0, jc = 0), gs = e);
    }
    var Ii = Qt({}, ma, {
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
        return "movementX" in e ? e.movementX : (U1(e), pd);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : jc;
      }
    }), uv = ra(Ii), cv = Qt({}, Ii, {
      dataTransfer: 0
    }), Ss = ra(cv), fv = Qt({}, ma, {
      relatedTarget: 0
    }), $l = ra(fv), Vm = Qt({}, wr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Im = ra(Vm), dv = Qt({}, wr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), vd = ra(dv), j1 = Qt({}, wr, {
      data: 0
    }), qm = ra(j1), Ym = qm, Wm = {
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
        var n = Wm[e.key] || e.key;
        if (n !== "Unidentified")
          return n;
      }
      if (e.type === "keypress") {
        var l = Mo(e);
        return l === 13 ? "Enter" : String.fromCharCode(l);
      }
      return e.type === "keydown" || e.type === "keyup" ? Es[e.keyCode] || "Unidentified" : "";
    }
    var vu = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Bm(e) {
      var n = this, l = n.nativeEvent;
      if (l.getModifierState)
        return l.getModifierState(e);
      var o = vu[e];
      return o ? !!l[o] : !1;
    }
    function Kn(e) {
      return Bm;
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
    }), Gm = ra(P1), $1 = Qt({}, Ii, {
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
    }), Qm = ra($1), Xm = Qt({}, ma, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Kn
    }), Km = ra(Xm), H1 = Qt({}, wr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), gi = ra(H1), pv = Qt({}, Ii, {
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
    }), V1 = ra(pv), _o = [9, 13, 27, 32], Fc = 229, Hl = nt && "CompositionEvent" in window, Do = null;
    nt && "documentMode" in document && (Do = document.documentMode);
    var vv = nt && "TextEvent" in window && !Do, hd = nt && (!Hl || Do && Do > 8 && Do <= 11), Zm = 32, md = String.fromCharCode(Zm);
    function I1() {
      Ye("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ye("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ye("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ye("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var hv = !1;
    function Jm(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function yd(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function gd(e, n) {
      return e === "keydown" && n.keyCode === Fc;
    }
    function mv(e, n) {
      switch (e) {
        case "keyup":
          return _o.indexOf(n.keyCode) !== -1;
        case "keydown":
          return n.keyCode !== Fc;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Sd(e) {
      var n = e.detail;
      return typeof n == "object" && "data" in n ? n.data : null;
    }
    function ey(e) {
      return e.locale === "ko";
    }
    var xs = !1;
    function yv(e, n, l, o, c) {
      var h, E;
      if (Hl ? h = yd(n) : xs ? mv(n, o) && (h = "onCompositionEnd") : gd(n, o) && (h = "onCompositionStart"), !h)
        return null;
      hd && !ey(o) && (!xs && h === "onCompositionStart" ? xs = Ro(c) : h === "onCompositionEnd" && xs && (E = Pl()));
      var T = oy(l, h);
      if (T.length > 0) {
        var M = new qm(h, n, null, o, c);
        if (e.push({
          event: M,
          listeners: T
        }), E)
          M.data = E;
        else {
          var z = Sd(o);
          z !== null && (M.data = z);
        }
      }
    }
    function Ed(e, n) {
      switch (e) {
        case "compositionend":
          return Sd(n);
        case "keypress":
          var l = n.which;
          return l !== Zm ? null : (hv = !0, md);
        case "textInput":
          var o = n.data;
          return o === md && hv ? null : o;
        default:
          return null;
      }
    }
    function gv(e, n) {
      if (xs) {
        if (e === "compositionend" || !Hl && mv(e, n)) {
          var l = Pl();
          return dd(), xs = !1, l;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Jm(n)) {
            if (n.char && n.char.length > 1)
              return n.char;
            if (n.which)
              return String.fromCharCode(n.which);
          }
          return null;
        case "compositionend":
          return hd && !ey(n) ? null : n.data;
        default:
          return null;
      }
    }
    function xd(e, n, l, o, c) {
      var h;
      if (vv ? h = Ed(n, o) : h = gv(n, o), !h)
        return null;
      var E = oy(l, "onBeforeInput");
      if (E.length > 0) {
        var T = new Ym("onBeforeInput", "beforeinput", null, o, c);
        e.push({
          event: T,
          listeners: E
        }), T.data = h;
      }
    }
    function ty(e, n, l, o, c, h, E) {
      yv(e, n, l, o, c), xd(e, n, l, o, c);
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
    function Pc(e) {
      var n = e && e.nodeName && e.nodeName.toLowerCase();
      return n === "input" ? !!q1[e.type] : n === "textarea";
    }
    function Y1(e) {
      if (!nt)
        return !1;
      var n = "on" + e, l = n in document;
      if (!l) {
        var o = document.createElement("div");
        o.setAttribute(n, "return;"), l = typeof o[n] == "function";
      }
      return l;
    }
    function $c() {
      Ye("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function ny(e, n, l, o) {
      Ks(o);
      var c = oy(n, "onChange");
      if (c.length > 0) {
        var h = new pl("onChange", "change", null, l, o);
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
      ny(n, r, e, Lp(e)), vm(d, n);
    }
    function d(e) {
      B3(e, 0);
    }
    function y(e) {
      var n = Md(e);
      if (el(n))
        return e;
    }
    function w(e, n) {
      if (e === "change")
        return n;
    }
    var O = !1;
    nt && (O = Y1("input") && (!document.documentMode || document.documentMode > 9));
    function I(e, n) {
      ko = e, r = n, ko.attachEvent("onpropertychange", me);
    }
    function Q() {
      ko && (ko.detachEvent("onpropertychange", me), ko = null, r = null);
    }
    function me(e) {
      e.propertyName === "value" && y(r) && u(e);
    }
    function Ue(e, n, l) {
      e === "focusin" ? (Q(), I(n, l)) : e === "focusout" && Q();
    }
    function Ie(e, n) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return y(r);
    }
    function Ne(e) {
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
      !n || !n.controlled || e.type !== "number" || zt(e, "number", e.value);
    }
    function fr(e, n, l, o, c, h, E) {
      var T = l ? Md(l) : window, M, z;
      if (i(T) ? M = w : Pc(T) ? O ? M = xt : (M = Ie, z = Ue) : Ne(T) && (M = pt), M) {
        var N = M(n, l);
        if (N) {
          ny(e, N, o, c);
          return;
        }
      }
      z && z(n, T, l), n === "focusout" && Tt(T);
    }
    function se() {
      Xe("onMouseEnter", ["mouseout", "mouseover"]), Xe("onMouseLeave", ["mouseout", "mouseover"]), Xe("onPointerEnter", ["pointerout", "pointerover"]), Xe("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function ee(e, n, l, o, c, h, E) {
      var T = n === "mouseover" || n === "pointerover", M = n === "mouseout" || n === "pointerout";
      if (T && !nc(o)) {
        var z = o.relatedTarget || o.fromElement;
        if (z && (Ic(z) || Av(z)))
          return;
      }
      if (!(!M && !T)) {
        var N;
        if (c.window === c)
          N = c;
        else {
          var te = c.ownerDocument;
          te ? N = te.defaultView || te.parentWindow : N = window;
        }
        var J, ve;
        if (M) {
          var ge = o.relatedTarget || o.toElement;
          if (J = l, ve = ge ? Ic(ge) : null, ve !== null) {
            var xe = Ba(ve);
            (ve !== xe || ve.tag !== D && ve.tag !== _) && (ve = null);
          }
        } else
          J = null, ve = l;
        if (J !== ve) {
          var lt = uv, Nt = "onMouseLeave", _t = "onMouseEnter", mn = "mouse";
          (n === "pointerout" || n === "pointerover") && (lt = Qm, Nt = "onPointerLeave", _t = "onPointerEnter", mn = "pointer");
          var fn = J == null ? N : Md(J), ce = ve == null ? N : Md(ve), we = new lt(Nt, mn + "leave", J, o, c);
          we.target = fn, we.relatedTarget = ce;
          var fe = null, qe = Ic(c);
          if (qe === l) {
            var mt = new lt(_t, mn + "enter", ve, o, c);
            mt.target = ce, mt.relatedTarget = fn, fe = mt;
          }
          OT(e, we, fe, J, ve);
        }
      }
    }
    function pe(e, n) {
      return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
    }
    var je = typeof Object.is == "function" ? Object.is : pe;
    function wt(e, n) {
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
    function jt(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function $t(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Wt(e, n) {
      for (var l = jt(e), o = 0, c = 0; l; ) {
        if (l.nodeType === kl) {
          if (c = o + l.textContent.length, o <= n && c >= n)
            return {
              node: l,
              offset: n - o
            };
          o = c;
        }
        l = jt($t(l));
      }
    }
    function jr(e) {
      var n = e.ownerDocument, l = n && n.defaultView || window, o = l.getSelection && l.getSelection();
      if (!o || o.rangeCount === 0)
        return null;
      var c = o.anchorNode, h = o.anchorOffset, E = o.focusNode, T = o.focusOffset;
      try {
        c.nodeType, E.nodeType;
      } catch {
        return null;
      }
      return Rn(e, c, h, E, T);
    }
    function Rn(e, n, l, o, c) {
      var h = 0, E = -1, T = -1, M = 0, z = 0, N = e, te = null;
      e: for (; ; ) {
        for (var J = null; N === n && (l === 0 || N.nodeType === kl) && (E = h + l), N === o && (c === 0 || N.nodeType === kl) && (T = h + c), N.nodeType === kl && (h += N.nodeValue.length), (J = N.firstChild) !== null; )
          te = N, N = J;
        for (; ; ) {
          if (N === e)
            break e;
          if (te === n && ++M === l && (E = h), te === o && ++z === c && (T = h), (J = N.nextSibling) !== null)
            break;
          N = te, te = N.parentNode;
        }
        N = J;
      }
      return E === -1 || T === -1 ? null : {
        start: E,
        end: T
      };
    }
    function Oo(e, n) {
      var l = e.ownerDocument || document, o = l && l.defaultView || window;
      if (o.getSelection) {
        var c = o.getSelection(), h = e.textContent.length, E = Math.min(n.start, h), T = n.end === void 0 ? E : Math.min(n.end, h);
        if (!c.extend && E > T) {
          var M = T;
          T = E, E = M;
        }
        var z = Wt(e, E), N = Wt(e, T);
        if (z && N) {
          if (c.rangeCount === 1 && c.anchorNode === z.node && c.anchorOffset === z.offset && c.focusNode === N.node && c.focusOffset === N.offset)
            return;
          var te = l.createRange();
          te.setStart(z.node, z.offset), c.removeAllRanges(), E > T ? (c.addRange(te), c.extend(N.node, N.offset)) : (te.setEnd(N.node, N.offset), c.addRange(te));
        }
      }
    }
    function ry(e) {
      return e && e.nodeType === kl;
    }
    function U3(e, n) {
      return !e || !n ? !1 : e === n ? !0 : ry(e) ? !1 : ry(n) ? U3(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1;
    }
    function pT(e) {
      return e && e.ownerDocument && U3(e.ownerDocument.documentElement, e);
    }
    function vT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function j3() {
      for (var e = window, n = si(); n instanceof e.HTMLIFrameElement; ) {
        if (vT(n))
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
    function hT() {
      var e = j3();
      return {
        focusedElem: e,
        selectionRange: W1(e) ? yT(e) : null
      };
    }
    function mT(e) {
      var n = j3(), l = e.focusedElem, o = e.selectionRange;
      if (n !== l && pT(l)) {
        o !== null && W1(l) && gT(l, o);
        for (var c = [], h = l; h = h.parentNode; )
          h.nodeType === Da && c.push({
            element: h,
            left: h.scrollLeft,
            top: h.scrollTop
          });
        typeof l.focus == "function" && l.focus();
        for (var E = 0; E < c.length; E++) {
          var T = c[E];
          T.element.scrollLeft = T.left, T.element.scrollTop = T.top;
        }
      }
    }
    function yT(e) {
      var n;
      return "selectionStart" in e ? n = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : n = jr(e), n || {
        start: 0,
        end: 0
      };
    }
    function gT(e, n) {
      var l = n.start, o = n.end;
      o === void 0 && (o = l), "selectionStart" in e ? (e.selectionStart = l, e.selectionEnd = Math.min(o, e.value.length)) : Oo(e, n);
    }
    var ST = nt && "documentMode" in document && document.documentMode <= 11;
    function ET() {
      Ye("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var wd = null, B1 = null, Sv = null, G1 = !1;
    function xT(e) {
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
    function wT(e) {
      return e.window === e ? e.document : e.nodeType === Ol ? e : e.ownerDocument;
    }
    function F3(e, n, l) {
      var o = wT(l);
      if (!(G1 || wd == null || wd !== si(o))) {
        var c = xT(wd);
        if (!Sv || !wt(Sv, c)) {
          Sv = c;
          var h = oy(B1, "onSelect");
          if (h.length > 0) {
            var E = new pl("onSelect", "select", null, n, l);
            e.push({
              event: E,
              listeners: h
            }), E.target = wd;
          }
        }
      }
    }
    function CT(e, n, l, o, c, h, E) {
      var T = l ? Md(l) : window;
      switch (n) {
        // Track the input node that has focus.
        case "focusin":
          (Pc(T) || T.contentEditable === "true") && (wd = T, B1 = l, Sv = null);
          break;
        case "focusout":
          wd = null, B1 = null, Sv = null;
          break;
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case "mousedown":
          G1 = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          G1 = !1, F3(e, o, c);
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
          if (ST)
            break;
        // falls through
        case "keydown":
        case "keyup":
          F3(e, o, c);
      }
    }
    function ay(e, n) {
      var l = {};
      return l[e.toLowerCase()] = n.toLowerCase(), l["Webkit" + e] = "webkit" + n, l["Moz" + e] = "moz" + n, l;
    }
    var Cd = {
      animationend: ay("Animation", "AnimationEnd"),
      animationiteration: ay("Animation", "AnimationIteration"),
      animationstart: ay("Animation", "AnimationStart"),
      transitionend: ay("Transition", "TransitionEnd")
    }, Q1 = {}, P3 = {};
    nt && (P3 = document.createElement("div").style, "AnimationEvent" in window || (delete Cd.animationend.animation, delete Cd.animationiteration.animation, delete Cd.animationstart.animation), "TransitionEvent" in window || delete Cd.transitionend.transition);
    function iy(e) {
      if (Q1[e])
        return Q1[e];
      if (!Cd[e])
        return e;
      var n = Cd[e];
      for (var l in n)
        if (n.hasOwnProperty(l) && l in P3)
          return Q1[e] = n[l];
      return e;
    }
    var $3 = iy("animationend"), H3 = iy("animationiteration"), V3 = iy("animationstart"), I3 = iy("transitionend"), q3 = /* @__PURE__ */ new Map(), Y3 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function hu(e, n) {
      q3.set(e, n), Ye(n, [e]);
    }
    function bT() {
      for (var e = 0; e < Y3.length; e++) {
        var n = Y3[e], l = n.toLowerCase(), o = n[0].toUpperCase() + n.slice(1);
        hu(l, "on" + o);
      }
      hu($3, "onAnimationEnd"), hu(H3, "onAnimationIteration"), hu(V3, "onAnimationStart"), hu("dblclick", "onDoubleClick"), hu("focusin", "onFocus"), hu("focusout", "onBlur"), hu(I3, "onTransitionEnd");
    }
    function TT(e, n, l, o, c, h, E) {
      var T = q3.get(n);
      if (T !== void 0) {
        var M = pl, z = n;
        switch (n) {
          case "keypress":
            if (Mo(o) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            M = Gm;
            break;
          case "focusin":
            z = "focus", M = $l;
            break;
          case "focusout":
            z = "blur", M = $l;
            break;
          case "beforeblur":
          case "afterblur":
            M = $l;
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
            M = uv;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            M = Ss;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            M = Km;
            break;
          case $3:
          case H3:
          case V3:
            M = Im;
            break;
          case I3:
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
            M = vd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            M = Qm;
            break;
        }
        var N = (h & ui) !== 0;
        {
          var te = !N && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          n === "scroll", J = DT(l, T, o.type, N, te);
          if (J.length > 0) {
            var ve = new M(T, z, null, o, c);
            e.push({
              event: ve,
              listeners: J
            });
          }
        }
      }
    }
    bT(), se(), $c(), ET(), I1();
    function RT(e, n, l, o, c, h, E) {
      TT(e, n, l, o, c, h);
      var T = (h & Ap) === 0;
      T && (ee(e, n, l, o, c), fr(e, n, l, o, c), CT(e, n, l, o, c), ty(e, n, l, o, c));
    }
    var Ev = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], X1 = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Ev));
    function W3(e, n, l) {
      var o = e.type || "unknown-event";
      e.currentTarget = l, rl(o, n, void 0, e), e.currentTarget = null;
    }
    function MT(e, n, l) {
      var o;
      if (l)
        for (var c = n.length - 1; c >= 0; c--) {
          var h = n[c], E = h.instance, T = h.currentTarget, M = h.listener;
          if (E !== o && e.isPropagationStopped())
            return;
          W3(e, M, T), o = E;
        }
      else
        for (var z = 0; z < n.length; z++) {
          var N = n[z], te = N.instance, J = N.currentTarget, ve = N.listener;
          if (te !== o && e.isPropagationStopped())
            return;
          W3(e, ve, J), o = te;
        }
    }
    function B3(e, n) {
      for (var l = (n & ui) !== 0, o = 0; o < e.length; o++) {
        var c = e[o], h = c.event, E = c.listeners;
        MT(h, E, l);
      }
      ic();
    }
    function _T(e, n, l, o, c) {
      var h = Lp(l), E = [];
      RT(E, e, o, l, h, n), B3(E, n);
    }
    function rr(e, n) {
      X1.has(e) || v('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var l = !1, o = aM(n), c = AT(e);
      o.has(c) || (G3(n, e, wf, l), o.add(c));
    }
    function K1(e, n, l) {
      X1.has(e) && !n && v('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var o = 0;
      n && (o |= ui), G3(l, e, o, n);
    }
    var ly = "_reactListening" + Math.random().toString(36).slice(2);
    function xv(e) {
      if (!e[ly]) {
        e[ly] = !0, _e.forEach(function(l) {
          l !== "selectionchange" && (X1.has(l) || K1(l, !1, e), K1(l, !0, e));
        });
        var n = e.nodeType === Ol ? e : e.ownerDocument;
        n !== null && (n[ly] || (n[ly] = !0, K1("selectionchange", !1, n)));
      }
    }
    function G3(e, n, l, o, c) {
      var h = Yr(e, n, l), E = void 0;
      ac && (n === "touchstart" || n === "touchmove" || n === "wheel") && (E = !0), e = e, o ? E !== void 0 ? sv(e, n, h, E) : Fa(e, n, h) : E !== void 0 ? fu(e, n, h, E) : zc(e, n, h);
    }
    function Q3(e, n) {
      return e === n || e.nodeType === hr && e.parentNode === n;
    }
    function Z1(e, n, l, o, c) {
      var h = o;
      if ((n & Op) === 0 && (n & wf) === 0) {
        var E = c;
        if (o !== null) {
          var T = o;
          e: for (; ; ) {
            if (T === null)
              return;
            var M = T.tag;
            if (M === b || M === R) {
              var z = T.stateNode.containerInfo;
              if (Q3(z, E))
                break;
              if (M === R)
                for (var N = T.return; N !== null; ) {
                  var te = N.tag;
                  if (te === b || te === R) {
                    var J = N.stateNode.containerInfo;
                    if (Q3(J, E))
                      return;
                  }
                  N = N.return;
                }
              for (; z !== null; ) {
                var ve = Ic(z);
                if (ve === null)
                  return;
                var ge = ve.tag;
                if (ge === D || ge === _) {
                  T = h = ve;
                  continue e;
                }
                z = z.parentNode;
              }
            }
            T = T.return;
          }
        }
      }
      vm(function() {
        return _T(e, n, l, h);
      });
    }
    function wv(e, n, l) {
      return {
        instance: e,
        listener: n,
        currentTarget: l
      };
    }
    function DT(e, n, l, o, c, h) {
      for (var E = n !== null ? n + "Capture" : null, T = o ? E : n, M = [], z = e, N = null; z !== null; ) {
        var te = z, J = te.stateNode, ve = te.tag;
        if (ve === D && J !== null && (N = J, T !== null)) {
          var ge = vo(z, T);
          ge != null && M.push(wv(z, ge, N));
        }
        if (c)
          break;
        z = z.return;
      }
      return M;
    }
    function oy(e, n) {
      for (var l = n + "Capture", o = [], c = e; c !== null; ) {
        var h = c, E = h.stateNode, T = h.tag;
        if (T === D && E !== null) {
          var M = E, z = vo(c, l);
          z != null && o.unshift(wv(c, z, M));
          var N = vo(c, n);
          N != null && o.push(wv(c, N, M));
        }
        c = c.return;
      }
      return o;
    }
    function bd(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== D);
      return e || null;
    }
    function kT(e, n) {
      for (var l = e, o = n, c = 0, h = l; h; h = bd(h))
        c++;
      for (var E = 0, T = o; T; T = bd(T))
        E++;
      for (; c - E > 0; )
        l = bd(l), c--;
      for (; E - c > 0; )
        o = bd(o), E--;
      for (var M = c; M--; ) {
        if (l === o || o !== null && l === o.alternate)
          return l;
        l = bd(l), o = bd(o);
      }
      return null;
    }
    function X3(e, n, l, o, c) {
      for (var h = n._reactName, E = [], T = l; T !== null && T !== o; ) {
        var M = T, z = M.alternate, N = M.stateNode, te = M.tag;
        if (z !== null && z === o)
          break;
        if (te === D && N !== null) {
          var J = N;
          if (c) {
            var ve = vo(T, h);
            ve != null && E.unshift(wv(T, ve, J));
          } else if (!c) {
            var ge = vo(T, h);
            ge != null && E.push(wv(T, ge, J));
          }
        }
        T = T.return;
      }
      E.length !== 0 && e.push({
        event: n,
        listeners: E
      });
    }
    function OT(e, n, l, o, c) {
      var h = o && c ? kT(o, c) : null;
      o !== null && X3(e, n, o, h, !1), c !== null && l !== null && X3(e, l, c, h, !0);
    }
    function AT(e, n) {
      return e + "__bubble";
    }
    var Si = !1, Cv = "dangerouslySetInnerHTML", sy = "suppressContentEditableWarning", mu = "suppressHydrationWarning", K3 = "autoFocus", Hc = "children", Vc = "style", uy = "__html", J1, cy, bv, Z3, fy, J3, eE;
    J1 = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, cy = function(e, n) {
      _p(e, n), Ef(e, n), fm(e, n, {
        registrationNameDependencies: He,
        possibleRegistrationNames: Ge
      });
    }, J3 = nt && !document.documentMode, bv = function(e, n, l) {
      if (!Si) {
        var o = dy(l), c = dy(n);
        c !== o && (Si = !0, v("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(c), JSON.stringify(o)));
      }
    }, Z3 = function(e) {
      if (!Si) {
        Si = !0;
        var n = [];
        e.forEach(function(l) {
          n.push(l);
        }), v("Extra attributes from the server: %s", n);
      }
    }, fy = function(e, n) {
      n === !1 ? v("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : v("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof n);
    }, eE = function(e, n) {
      var l = e.namespaceURI === Dl ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return l.innerHTML = n, l.innerHTML;
    };
    var LT = /\r\n?/g, zT = /\u0000|\uFFFD/g;
    function dy(e) {
      St(e);
      var n = typeof e == "string" ? e : "" + e;
      return n.replace(LT, `
`).replace(zT, "");
    }
    function py(e, n, l, o) {
      var c = dy(n), h = dy(e);
      if (h !== c && (o && (Si || (Si = !0, v('Text content did not match. Server: "%s" Client: "%s"', h, c))), l && oe))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function tE(e) {
      return e.nodeType === Ol ? e : e.ownerDocument;
    }
    function NT() {
    }
    function vy(e) {
      e.onclick = NT;
    }
    function UT(e, n, l, o, c) {
      for (var h in o)
        if (o.hasOwnProperty(h)) {
          var E = o[h];
          if (h === Vc)
            E && Object.freeze(E), im(n, E);
          else if (h === Cv) {
            var T = E ? E[uy] : void 0;
            T != null && Bh(n, T);
          } else if (h === Hc)
            if (typeof E == "string") {
              var M = e !== "textarea" || E !== "";
              M && Bs(n, E);
            } else typeof E == "number" && Bs(n, "" + E);
          else h === sy || h === mu || h === K3 || (He.hasOwnProperty(h) ? E != null && (typeof E != "function" && fy(h, E), h === "onScroll" && rr("scroll", n)) : E != null && Tr(n, h, E, c));
        }
    }
    function jT(e, n, l, o) {
      for (var c = 0; c < n.length; c += 2) {
        var h = n[c], E = n[c + 1];
        h === Vc ? im(e, E) : h === Cv ? Bh(e, E) : h === Hc ? Bs(e, E) : Tr(e, h, E, o);
      }
    }
    function FT(e, n, l, o) {
      var c, h = tE(l), E, T = o;
      if (T === Dl && (T = xp(e)), T === Dl) {
        if (c = fo(e, n), !c && e !== e.toLowerCase() && v("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var M = h.createElement("div");
          M.innerHTML = "<script><\/script>";
          var z = M.firstChild;
          E = M.removeChild(z);
        } else if (typeof n.is == "string")
          E = h.createElement(e, {
            is: n.is
          });
        else if (E = h.createElement(e), e === "select") {
          var N = E;
          n.multiple ? N.multiple = !0 : n.size && (N.size = n.size);
        }
      } else
        E = h.createElementNS(T, e);
      return T === Dl && !c && Object.prototype.toString.call(E) === "[object HTMLUnknownElement]" && !Oe.call(J1, e) && (J1[e] = !0, v("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), E;
    }
    function PT(e, n) {
      return tE(n).createTextNode(e);
    }
    function $T(e, n, l, o) {
      var c = fo(n, l);
      cy(n, l);
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
          for (var E = 0; E < Ev.length; E++)
            rr(Ev[E], e);
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
          ji(e, l), h = Ws(e, l), rr("invalid", e);
          break;
        case "option":
          En(e, l), h = l;
          break;
        case "select":
          Qo(e, l), h = Qu(e, l), rr("invalid", e);
          break;
        case "textarea":
          gp(e, l), h = yp(e, l), rr("invalid", e);
          break;
        default:
          h = l;
      }
      switch (gf(n, h), UT(n, e, o, h, c), n) {
        case "input":
          Ui(e), he(e, l, !1);
          break;
        case "textarea":
          Ui(e), Yh(e);
          break;
        case "option":
          Fn(e, l);
          break;
        case "select":
          hp(e, l);
          break;
        default:
          typeof h.onClick == "function" && vy(e);
          break;
      }
    }
    function HT(e, n, l, o, c) {
      cy(n, o);
      var h = null, E, T;
      switch (n) {
        case "input":
          E = Ws(e, l), T = Ws(e, o), h = [];
          break;
        case "select":
          E = Qu(e, l), T = Qu(e, o), h = [];
          break;
        case "textarea":
          E = yp(e, l), T = yp(e, o), h = [];
          break;
        default:
          E = l, T = o, typeof E.onClick != "function" && typeof T.onClick == "function" && vy(e);
          break;
      }
      gf(n, T);
      var M, z, N = null;
      for (M in E)
        if (!(T.hasOwnProperty(M) || !E.hasOwnProperty(M) || E[M] == null))
          if (M === Vc) {
            var te = E[M];
            for (z in te)
              te.hasOwnProperty(z) && (N || (N = {}), N[z] = "");
          } else M === Cv || M === Hc || M === sy || M === mu || M === K3 || (He.hasOwnProperty(M) ? h || (h = []) : (h = h || []).push(M, null));
      for (M in T) {
        var J = T[M], ve = E?.[M];
        if (!(!T.hasOwnProperty(M) || J === ve || J == null && ve == null))
          if (M === Vc)
            if (J && Object.freeze(J), ve) {
              for (z in ve)
                ve.hasOwnProperty(z) && (!J || !J.hasOwnProperty(z)) && (N || (N = {}), N[z] = "");
              for (z in J)
                J.hasOwnProperty(z) && ve[z] !== J[z] && (N || (N = {}), N[z] = J[z]);
            } else
              N || (h || (h = []), h.push(M, N)), N = J;
          else if (M === Cv) {
            var ge = J ? J[uy] : void 0, xe = ve ? ve[uy] : void 0;
            ge != null && xe !== ge && (h = h || []).push(M, ge);
          } else M === Hc ? (typeof J == "string" || typeof J == "number") && (h = h || []).push(M, "" + J) : M === sy || M === mu || (He.hasOwnProperty(M) ? (J != null && (typeof J != "function" && fy(M, J), M === "onScroll" && rr("scroll", e)), !h && ve !== J && (h = [])) : (h = h || []).push(M, J));
      }
      return N && (R1(N, T[Vc]), (h = h || []).push(Vc, N)), h;
    }
    function VT(e, n, l, o, c) {
      l === "input" && c.type === "radio" && c.name != null && k(e, c);
      var h = fo(l, o), E = fo(l, c);
      switch (jT(e, n, h, E), l) {
        case "input":
          Y(e, c);
          break;
        case "textarea":
          qh(e, c);
          break;
        case "select":
          hf(e, c);
          break;
      }
    }
    function IT(e) {
      {
        var n = e.toLowerCase();
        return ec.hasOwnProperty(n) && ec[n] || null;
      }
    }
    function qT(e, n, l, o, c, h, E) {
      var T, M;
      switch (T = fo(n, l), cy(n, l), n) {
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
          for (var z = 0; z < Ev.length; z++)
            rr(Ev[z], e);
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
          ji(e, l), rr("invalid", e);
          break;
        case "option":
          En(e, l);
          break;
        case "select":
          Qo(e, l), rr("invalid", e);
          break;
        case "textarea":
          gp(e, l), rr("invalid", e);
          break;
      }
      gf(n, l);
      {
        M = /* @__PURE__ */ new Set();
        for (var N = e.attributes, te = 0; te < N.length; te++) {
          var J = N[te].name.toLowerCase();
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
              M.add(N[te].name);
          }
        }
      }
      var ve = null;
      for (var ge in l)
        if (l.hasOwnProperty(ge)) {
          var xe = l[ge];
          if (ge === Hc)
            typeof xe == "string" ? e.textContent !== xe && (l[mu] !== !0 && py(e.textContent, xe, h, E), ve = [Hc, xe]) : typeof xe == "number" && e.textContent !== "" + xe && (l[mu] !== !0 && py(e.textContent, xe, h, E), ve = [Hc, "" + xe]);
          else if (He.hasOwnProperty(ge))
            xe != null && (typeof xe != "function" && fy(ge, xe), ge === "onScroll" && rr("scroll", e));
          else if (E && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof T == "boolean") {
            var lt = void 0, Nt = ke(ge);
            if (l[mu] !== !0) {
              if (!(ge === sy || ge === mu || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              ge === "value" || ge === "checked" || ge === "selected")) {
                if (ge === Cv) {
                  var _t = e.innerHTML, mn = xe ? xe[uy] : void 0;
                  if (mn != null) {
                    var fn = eE(e, mn);
                    fn !== _t && bv(ge, _t, fn);
                  }
                } else if (ge === Vc) {
                  if (M.delete(ge), J3) {
                    var ce = b1(xe);
                    lt = e.getAttribute("style"), ce !== lt && bv(ge, lt, ce);
                  }
                } else if (T && !P)
                  M.delete(ge.toLowerCase()), lt = Ai(e, ge, xe), xe !== lt && bv(ge, lt, xe);
                else if (!Gt(ge, Nt, T) && !dt(ge, xe, Nt, T)) {
                  var we = !1;
                  if (Nt !== null)
                    M.delete(Nt.attributeName), lt = vr(e, ge, xe, Nt);
                  else {
                    var fe = o;
                    if (fe === Dl && (fe = xp(n)), fe === Dl)
                      M.delete(ge.toLowerCase());
                    else {
                      var qe = IT(ge);
                      qe !== null && qe !== ge && (we = !0, M.delete(qe)), M.delete(ge);
                    }
                    lt = Ai(e, ge, xe);
                  }
                  var mt = P;
                  !mt && xe !== lt && !we && bv(ge, lt, xe);
                }
              }
            }
          }
        }
      switch (E && // $FlowFixMe - Should be inferred as not undefined.
      M.size > 0 && l[mu] !== !0 && Z3(M), n) {
        case "input":
          Ui(e), he(e, l, !0);
          break;
        case "textarea":
          Ui(e), Yh(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof l.onClick == "function" && vy(e);
          break;
      }
      return ve;
    }
    function YT(e, n, l) {
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
    function WT(e, n, l) {
      switch (n) {
        case "input":
          Ee(e, l);
          return;
        case "textarea":
          E1(e, l);
          return;
        case "select":
          mp(e, l);
          return;
      }
    }
    var Tv = function() {
    }, Rv = function() {
    };
    {
      var BT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], nE = [
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
      ], GT = nE.concat(["button"]), QT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], rE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      Rv = function(e, n) {
        var l = Qt({}, e || rE), o = {
          tag: n
        };
        return nE.indexOf(n) !== -1 && (l.aTagInScope = null, l.buttonTagInScope = null, l.nobrTagInScope = null), GT.indexOf(n) !== -1 && (l.pTagInButtonScope = null), BT.indexOf(n) !== -1 && n !== "address" && n !== "div" && n !== "p" && (l.listItemTagAutoclosing = null, l.dlItemTagAutoclosing = null), l.current = o, n === "form" && (l.formTag = o), n === "a" && (l.aTagInScope = o), n === "button" && (l.buttonTagInScope = o), n === "nobr" && (l.nobrTagInScope = o), n === "p" && (l.pTagInButtonScope = o), n === "li" && (l.listItemTagAutoclosing = o), (n === "dd" || n === "dt") && (l.dlItemTagAutoclosing = o), l;
      };
      var XT = function(e, n) {
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
            return QT.indexOf(n) === -1;
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
      }, KT = function(e, n) {
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
      }, aE = {};
      Tv = function(e, n, l) {
        l = l || rE;
        var o = l.current, c = o && o.tag;
        n != null && (e != null && v("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var h = XT(e, c) ? null : o, E = h ? null : KT(e, l), T = h || E;
        if (T) {
          var M = T.tag, z = !!h + "|" + e + "|" + M;
          if (!aE[z]) {
            aE[z] = !0;
            var N = e, te = "";
            if (e === "#text" ? /\S/.test(n) ? N = "Text nodes" : (N = "Whitespace text nodes", te = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : N = "<" + e + ">", h) {
              var J = "";
              M === "table" && e === "tr" && (J += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), v("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", N, M, te, J);
            } else
              v("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", N, M);
          }
        }
      };
    }
    var hy = "suppressHydrationWarning", my = "$", yy = "/$", Mv = "$?", _v = "$!", ZT = "style", ag = null, ig = null;
    function JT(e) {
      var n, l, o = e.nodeType;
      switch (o) {
        case Ol:
        case Cp: {
          n = o === Ol ? "#document" : "#fragment";
          var c = e.documentElement;
          l = c ? c.namespaceURI : wp(null, "");
          break;
        }
        default: {
          var h = o === hr ? e.parentNode : e, E = h.namespaceURI || null;
          n = h.tagName, l = wp(E, n);
          break;
        }
      }
      {
        var T = n.toLowerCase(), M = Rv(null, T);
        return {
          namespace: l,
          ancestorInfo: M
        };
      }
    }
    function eR(e, n, l) {
      {
        var o = e, c = wp(o.namespace, n), h = Rv(o.ancestorInfo, n);
        return {
          namespace: c,
          ancestorInfo: h
        };
      }
    }
    function bN(e) {
      return e;
    }
    function tR(e) {
      ag = xr(), ig = hT();
      var n = null;
      return kr(!1), n;
    }
    function nR(e) {
      mT(ig), kr(ag), ag = null, ig = null;
    }
    function rR(e, n, l, o, c) {
      var h;
      {
        var E = o;
        if (Tv(e, null, E.ancestorInfo), typeof n.children == "string" || typeof n.children == "number") {
          var T = "" + n.children, M = Rv(E.ancestorInfo, e);
          Tv(null, T, M);
        }
        h = E.namespace;
      }
      var z = FT(e, n, l, h);
      return Ov(c, z), pg(z, n), z;
    }
    function aR(e, n) {
      e.appendChild(n);
    }
    function iR(e, n, l, o, c) {
      switch ($T(e, n, l, o), n) {
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
    function lR(e, n, l, o, c, h) {
      {
        var E = h;
        if (typeof o.children != typeof l.children && (typeof o.children == "string" || typeof o.children == "number")) {
          var T = "" + o.children, M = Rv(E.ancestorInfo, n);
          Tv(null, T, M);
        }
      }
      return HT(e, n, l, o);
    }
    function lg(e, n) {
      return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
    }
    function oR(e, n, l, o) {
      {
        var c = l;
        Tv(null, e, c.ancestorInfo);
      }
      var h = PT(e, n);
      return Ov(o, h), h;
    }
    function sR() {
      var e = window.event;
      return e === void 0 ? hi : fd(e.type);
    }
    var og = typeof setTimeout == "function" ? setTimeout : void 0, uR = typeof clearTimeout == "function" ? clearTimeout : void 0, sg = -1, iE = typeof Promise == "function" ? Promise : void 0, cR = typeof queueMicrotask == "function" ? queueMicrotask : typeof iE < "u" ? function(e) {
      return iE.resolve(null).then(e).catch(fR);
    } : og;
    function fR(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function dR(e, n, l, o) {
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
    function pR(e, n, l, o, c, h) {
      VT(e, n, l, o, c), pg(e, c);
    }
    function lE(e) {
      Bs(e, "");
    }
    function vR(e, n, l) {
      e.nodeValue = l;
    }
    function hR(e, n) {
      e.appendChild(n);
    }
    function mR(e, n) {
      var l;
      e.nodeType === hr ? (l = e.parentNode, l.insertBefore(n, e)) : (l = e, l.appendChild(n));
      var o = e._reactRootContainer;
      o == null && l.onclick === null && vy(l);
    }
    function yR(e, n, l) {
      e.insertBefore(n, l);
    }
    function gR(e, n, l) {
      e.nodeType === hr ? e.parentNode.insertBefore(n, l) : e.insertBefore(n, l);
    }
    function SR(e, n) {
      e.removeChild(n);
    }
    function ER(e, n) {
      e.nodeType === hr ? e.parentNode.removeChild(n) : e.removeChild(n);
    }
    function ug(e, n) {
      var l = n, o = 0;
      do {
        var c = l.nextSibling;
        if (e.removeChild(l), c && c.nodeType === hr) {
          var h = c.data;
          if (h === yy)
            if (o === 0) {
              e.removeChild(c), ms(n);
              return;
            } else
              o--;
          else (h === my || h === Mv || h === _v) && o++;
        }
        l = c;
      } while (l);
      ms(n);
    }
    function xR(e, n) {
      e.nodeType === hr ? ug(e.parentNode, n) : e.nodeType === Da && ug(e, n), ms(e);
    }
    function wR(e) {
      e = e;
      var n = e.style;
      typeof n.setProperty == "function" ? n.setProperty("display", "none", "important") : n.display = "none";
    }
    function CR(e) {
      e.nodeValue = "";
    }
    function bR(e, n) {
      e = e;
      var l = n[ZT], o = l != null && l.hasOwnProperty("display") ? l.display : null;
      e.style.display = yf("display", o);
    }
    function TR(e, n) {
      e.nodeValue = n;
    }
    function RR(e) {
      e.nodeType === Da ? e.textContent = "" : e.nodeType === Ol && e.documentElement && e.removeChild(e.documentElement);
    }
    function MR(e, n, l) {
      return e.nodeType !== Da || n.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function _R(e, n) {
      return n === "" || e.nodeType !== kl ? null : e;
    }
    function DR(e) {
      return e.nodeType !== hr ? null : e;
    }
    function oE(e) {
      return e.data === Mv;
    }
    function cg(e) {
      return e.data === _v;
    }
    function kR(e) {
      var n = e.nextSibling && e.nextSibling.dataset, l, o, c;
      return n && (l = n.dgst, o = n.msg, c = n.stck), {
        message: o,
        digest: l,
        stack: c
      };
    }
    function OR(e, n) {
      e._reactRetry = n;
    }
    function gy(e) {
      for (; e != null; e = e.nextSibling) {
        var n = e.nodeType;
        if (n === Da || n === kl)
          break;
        if (n === hr) {
          var l = e.data;
          if (l === my || l === _v || l === Mv)
            break;
          if (l === yy)
            return null;
        }
      }
      return e;
    }
    function Dv(e) {
      return gy(e.nextSibling);
    }
    function AR(e) {
      return gy(e.firstChild);
    }
    function LR(e) {
      return gy(e.firstChild);
    }
    function zR(e) {
      return gy(e.nextSibling);
    }
    function NR(e, n, l, o, c, h, E) {
      Ov(h, e), pg(e, l);
      var T;
      {
        var M = c;
        T = M.namespace;
      }
      var z = (h.mode & ln) !== Lt;
      return qT(e, n, l, T, o, z, E);
    }
    function UR(e, n, l, o) {
      return Ov(l, e), l.mode & ln, YT(e, n);
    }
    function jR(e, n) {
      Ov(n, e);
    }
    function FR(e) {
      for (var n = e.nextSibling, l = 0; n; ) {
        if (n.nodeType === hr) {
          var o = n.data;
          if (o === yy) {
            if (l === 0)
              return Dv(n);
            l--;
          } else (o === my || o === _v || o === Mv) && l++;
        }
        n = n.nextSibling;
      }
      return null;
    }
    function sE(e) {
      for (var n = e.previousSibling, l = 0; n; ) {
        if (n.nodeType === hr) {
          var o = n.data;
          if (o === my || o === _v || o === Mv) {
            if (l === 0)
              return n;
            l--;
          } else o === yy && l++;
        }
        n = n.previousSibling;
      }
      return null;
    }
    function PR(e) {
      ms(e);
    }
    function $R(e) {
      ms(e);
    }
    function HR(e) {
      return e !== "head" && e !== "body";
    }
    function VR(e, n, l, o) {
      var c = !0;
      py(n.nodeValue, l, o, c);
    }
    function IR(e, n, l, o, c, h) {
      if (n[hy] !== !0) {
        var E = !0;
        py(o.nodeValue, c, h, E);
      }
    }
    function qR(e, n) {
      n.nodeType === Da ? eg(e, n) : n.nodeType === hr || tg(e, n);
    }
    function YR(e, n) {
      {
        var l = e.parentNode;
        l !== null && (n.nodeType === Da ? eg(l, n) : n.nodeType === hr || tg(l, n));
      }
    }
    function WR(e, n, l, o, c) {
      (c || n[hy] !== !0) && (o.nodeType === Da ? eg(l, o) : o.nodeType === hr || tg(l, o));
    }
    function BR(e, n, l) {
      ng(e, n);
    }
    function GR(e, n) {
      rg(e, n);
    }
    function QR(e, n, l) {
      {
        var o = e.parentNode;
        o !== null && ng(o, n);
      }
    }
    function XR(e, n) {
      {
        var l = e.parentNode;
        l !== null && rg(l, n);
      }
    }
    function KR(e, n, l, o, c, h) {
      (h || n[hy] !== !0) && ng(l, o);
    }
    function ZR(e, n, l, o, c) {
      (c || n[hy] !== !0) && rg(l, o);
    }
    function JR(e) {
      v("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function eM(e) {
      xv(e);
    }
    var Td = Math.random().toString(36).slice(2), Rd = "__reactFiber$" + Td, fg = "__reactProps$" + Td, kv = "__reactContainer$" + Td, dg = "__reactEvents$" + Td, tM = "__reactListeners$" + Td, nM = "__reactHandles$" + Td;
    function rM(e) {
      delete e[Rd], delete e[fg], delete e[dg], delete e[tM], delete e[nM];
    }
    function Ov(e, n) {
      n[Rd] = e;
    }
    function Sy(e, n) {
      n[kv] = e;
    }
    function uE(e) {
      e[kv] = null;
    }
    function Av(e) {
      return !!e[kv];
    }
    function Ic(e) {
      var n = e[Rd];
      if (n)
        return n;
      for (var l = e.parentNode; l; ) {
        if (n = l[kv] || l[Rd], n) {
          var o = n.alternate;
          if (n.child !== null || o !== null && o.child !== null)
            for (var c = sE(e); c !== null; ) {
              var h = c[Rd];
              if (h)
                return h;
              c = sE(c);
            }
          return n;
        }
        e = l, l = e.parentNode;
      }
      return null;
    }
    function yu(e) {
      var n = e[Rd] || e[kv];
      return n && (n.tag === D || n.tag === _ || n.tag === V || n.tag === b) ? n : null;
    }
    function Md(e) {
      if (e.tag === D || e.tag === _)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Ey(e) {
      return e[fg] || null;
    }
    function pg(e, n) {
      e[fg] = n;
    }
    function aM(e) {
      var n = e[dg];
      return n === void 0 && (n = e[dg] = /* @__PURE__ */ new Set()), n;
    }
    var cE = {}, fE = s.ReactDebugCurrentFrame;
    function xy(e) {
      if (e) {
        var n = e._owner, l = Rl(e.type, e._source, n ? n.type : null);
        fE.setExtraStackFrame(l);
      } else
        fE.setExtraStackFrame(null);
    }
    function Vl(e, n, l, o, c) {
      {
        var h = Function.call.bind(Oe);
        for (var E in e)
          if (h(e, E)) {
            var T = void 0;
            try {
              if (typeof e[E] != "function") {
                var M = Error((o || "React class") + ": " + l + " type `" + E + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[E] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw M.name = "Invariant Violation", M;
              }
              T = e[E](n, E, o, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (z) {
              T = z;
            }
            T && !(T instanceof Error) && (xy(c), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", l, E, typeof T), xy(null)), T instanceof Error && !(T.message in cE) && (cE[T.message] = !0, xy(c), v("Failed %s type: %s", l, T.message), xy(null));
          }
      }
    }
    var vg = [], wy;
    wy = [];
    var ws = -1;
    function gu(e) {
      return {
        current: e
      };
    }
    function $a(e, n) {
      if (ws < 0) {
        v("Unexpected pop.");
        return;
      }
      n !== wy[ws] && v("Unexpected Fiber popped."), e.current = vg[ws], vg[ws] = null, wy[ws] = null, ws--;
    }
    function Ha(e, n, l) {
      ws++, vg[ws] = e.current, wy[ws] = l, e.current = n;
    }
    var hg;
    hg = {};
    var qi = {};
    Object.freeze(qi);
    var Cs = gu(qi), Ao = gu(!1), mg = qi;
    function _d(e, n, l) {
      return l && Lo(n) ? mg : Cs.current;
    }
    function dE(e, n, l) {
      {
        var o = e.stateNode;
        o.__reactInternalMemoizedUnmaskedChildContext = n, o.__reactInternalMemoizedMaskedChildContext = l;
      }
    }
    function Dd(e, n) {
      {
        var l = e.type, o = l.contextTypes;
        if (!o)
          return qi;
        var c = e.stateNode;
        if (c && c.__reactInternalMemoizedUnmaskedChildContext === n)
          return c.__reactInternalMemoizedMaskedChildContext;
        var h = {};
        for (var E in o)
          h[E] = n[E];
        {
          var T = Bt(e) || "Unknown";
          Vl(o, h, "context", T);
        }
        return c && dE(e, n, h), h;
      }
    }
    function Cy() {
      return Ao.current;
    }
    function Lo(e) {
      {
        var n = e.childContextTypes;
        return n != null;
      }
    }
    function by(e) {
      $a(Ao, e), $a(Cs, e);
    }
    function yg(e) {
      $a(Ao, e), $a(Cs, e);
    }
    function pE(e, n, l) {
      {
        if (Cs.current !== qi)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        Ha(Cs, n, e), Ha(Ao, l, e);
      }
    }
    function vE(e, n, l) {
      {
        var o = e.stateNode, c = n.childContextTypes;
        if (typeof o.getChildContext != "function") {
          {
            var h = Bt(e) || "Unknown";
            hg[h] || (hg[h] = !0, v("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", h, h));
          }
          return l;
        }
        var E = o.getChildContext();
        for (var T in E)
          if (!(T in c))
            throw new Error((Bt(e) || "Unknown") + '.getChildContext(): key "' + T + '" is not defined in childContextTypes.');
        {
          var M = Bt(e) || "Unknown";
          Vl(c, E, "child context", M);
        }
        return Qt({}, l, E);
      }
    }
    function Ty(e) {
      {
        var n = e.stateNode, l = n && n.__reactInternalMemoizedMergedChildContext || qi;
        return mg = Cs.current, Ha(Cs, l, e), Ha(Ao, Ao.current, e), !0;
      }
    }
    function hE(e, n, l) {
      {
        var o = e.stateNode;
        if (!o)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (l) {
          var c = vE(e, n, mg);
          o.__reactInternalMemoizedMergedChildContext = c, $a(Ao, e), $a(Cs, e), Ha(Cs, c, e), Ha(Ao, l, e);
        } else
          $a(Ao, e), Ha(Ao, l, e);
      }
    }
    function iM(e) {
      {
        if (!ns(e) || e.tag !== x)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var n = e;
        do {
          switch (n.tag) {
            case b:
              return n.stateNode.context;
            case x: {
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
    var Su = 0, Ry = 1, bs = null, gg = !1, Sg = !1;
    function mE(e) {
      bs === null ? bs = [e] : bs.push(e);
    }
    function lM(e) {
      gg = !0, mE(e);
    }
    function yE() {
      gg && Eu();
    }
    function Eu() {
      if (!Sg && bs !== null) {
        Sg = !0;
        var e = 0, n = yi();
        try {
          var l = !0, o = bs;
          for (Er(pa); e < o.length; e++) {
            var c = o[e];
            do
              c = c(l);
            while (c !== null);
          }
          bs = null, gg = !1;
        } catch (h) {
          throw bs !== null && (bs = bs.slice(e + 1)), Np(sc, Eu), h;
        } finally {
          Er(n), Sg = !1;
        }
      }
      return null;
    }
    var kd = [], Od = 0, My = null, _y = 0, vl = [], hl = 0, qc = null, Ts = 1, Rs = "";
    function oM(e) {
      return Wc(), (e.flags & al) !== At;
    }
    function sM(e) {
      return Wc(), _y;
    }
    function uM() {
      var e = Rs, n = Ts, l = n & ~cM(n);
      return l.toString(32) + e;
    }
    function Yc(e, n) {
      Wc(), kd[Od++] = _y, kd[Od++] = My, My = e, _y = n;
    }
    function gE(e, n, l) {
      Wc(), vl[hl++] = Ts, vl[hl++] = Rs, vl[hl++] = qc, qc = e;
      var o = Ts, c = Rs, h = Dy(o) - 1, E = o & ~(1 << h), T = l + 1, M = Dy(n) + h;
      if (M > 30) {
        var z = h - h % 5, N = (1 << z) - 1, te = (E & N).toString(32), J = E >> z, ve = h - z, ge = Dy(n) + ve, xe = T << ve, lt = xe | J, Nt = te + c;
        Ts = 1 << ge | lt, Rs = Nt;
      } else {
        var _t = T << h, mn = _t | E, fn = c;
        Ts = 1 << M | mn, Rs = fn;
      }
    }
    function Eg(e) {
      Wc();
      var n = e.return;
      if (n !== null) {
        var l = 1, o = 0;
        Yc(e, l), gE(e, l, o);
      }
    }
    function Dy(e) {
      return 32 - gr(e);
    }
    function cM(e) {
      return 1 << Dy(e) - 1;
    }
    function xg(e) {
      for (; e === My; )
        My = kd[--Od], kd[Od] = null, _y = kd[--Od], kd[Od] = null;
      for (; e === qc; )
        qc = vl[--hl], vl[hl] = null, Rs = vl[--hl], vl[hl] = null, Ts = vl[--hl], vl[hl] = null;
    }
    function fM() {
      return Wc(), qc !== null ? {
        id: Ts,
        overflow: Rs
      } : null;
    }
    function dM(e, n) {
      Wc(), vl[hl++] = Ts, vl[hl++] = Rs, vl[hl++] = qc, Ts = n.id, Rs = n.overflow, qc = e;
    }
    function Wc() {
      ga() || v("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var ya = null, ml = null, Il = !1, Bc = !1, xu = null;
    function pM() {
      Il && v("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function SE() {
      Bc = !0;
    }
    function vM() {
      return Bc;
    }
    function hM(e) {
      var n = e.stateNode.containerInfo;
      return ml = LR(n), ya = e, Il = !0, xu = null, Bc = !1, !0;
    }
    function mM(e, n, l) {
      return ml = zR(n), ya = e, Il = !0, xu = null, Bc = !1, l !== null && dM(e, l), !0;
    }
    function EE(e, n) {
      switch (e.tag) {
        case b: {
          qR(e.stateNode.containerInfo, n);
          break;
        }
        case D: {
          var l = (e.mode & ln) !== Lt;
          WR(
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
          o.dehydrated !== null && YR(o.dehydrated, n);
          break;
        }
      }
    }
    function xE(e, n) {
      EE(e, n);
      var l = Ek();
      l.stateNode = n, l.return = e;
      var o = e.deletions;
      o === null ? (e.deletions = [l], e.flags |= ci) : o.push(l);
    }
    function wg(e, n) {
      {
        if (Bc)
          return;
        switch (e.tag) {
          case b: {
            var l = e.stateNode.containerInfo;
            switch (n.tag) {
              case D:
                var o = n.type;
                n.pendingProps, BR(l, o);
                break;
              case _:
                var c = n.pendingProps;
                GR(l, c);
                break;
            }
            break;
          }
          case D: {
            var h = e.type, E = e.memoizedProps, T = e.stateNode;
            switch (n.tag) {
              case D: {
                var M = n.type, z = n.pendingProps, N = (e.mode & ln) !== Lt;
                KR(
                  h,
                  E,
                  T,
                  M,
                  z,
                  // TODO: Delete this argument when we remove the legacy root API.
                  N
                );
                break;
              }
              case _: {
                var te = n.pendingProps, J = (e.mode & ln) !== Lt;
                ZR(
                  h,
                  E,
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
              case D:
                var xe = n.type;
                n.pendingProps, QR(ge, xe);
                break;
              case _:
                var lt = n.pendingProps;
                XR(ge, lt);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function wE(e, n) {
      n.flags = n.flags & ~Oa | er, wg(e, n);
    }
    function CE(e, n) {
      switch (e.tag) {
        case D: {
          var l = e.type;
          e.pendingProps;
          var o = MR(n, l);
          return o !== null ? (e.stateNode = o, ya = e, ml = AR(o), !0) : !1;
        }
        case _: {
          var c = e.pendingProps, h = _R(n, c);
          return h !== null ? (e.stateNode = h, ya = e, ml = null, !0) : !1;
        }
        case V: {
          var E = DR(n);
          if (E !== null) {
            var T = {
              dehydrated: E,
              treeContext: fM(),
              retryLane: Na
            };
            e.memoizedState = T;
            var M = xk(E);
            return M.return = e, e.child = M, ya = e, ml = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function Cg(e) {
      return (e.mode & ln) !== Lt && (e.flags & kt) === At;
    }
    function bg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function Tg(e) {
      if (Il) {
        var n = ml;
        if (!n) {
          Cg(e) && (wg(ya, e), bg()), wE(ya, e), Il = !1, ya = e;
          return;
        }
        var l = n;
        if (!CE(e, n)) {
          Cg(e) && (wg(ya, e), bg()), n = Dv(l);
          var o = ya;
          if (!n || !CE(e, n)) {
            wE(ya, e), Il = !1, ya = e;
            return;
          }
          xE(o, l);
        }
      }
    }
    function yM(e, n, l) {
      var o = e.stateNode, c = !Bc, h = NR(o, e.type, e.memoizedProps, n, l, e, c);
      return e.updateQueue = h, h !== null;
    }
    function gM(e) {
      var n = e.stateNode, l = e.memoizedProps, o = UR(n, l, e);
      if (o) {
        var c = ya;
        if (c !== null)
          switch (c.tag) {
            case b: {
              var h = c.stateNode.containerInfo, E = (c.mode & ln) !== Lt;
              VR(
                h,
                n,
                l,
                // TODO: Delete this argument when we remove the legacy root API.
                E
              );
              break;
            }
            case D: {
              var T = c.type, M = c.memoizedProps, z = c.stateNode, N = (c.mode & ln) !== Lt;
              IR(
                T,
                M,
                z,
                n,
                l,
                // TODO: Delete this argument when we remove the legacy root API.
                N
              );
              break;
            }
          }
      }
      return o;
    }
    function SM(e) {
      var n = e.memoizedState, l = n !== null ? n.dehydrated : null;
      if (!l)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      jR(l, e);
    }
    function EM(e) {
      var n = e.memoizedState, l = n !== null ? n.dehydrated : null;
      if (!l)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return FR(l);
    }
    function bE(e) {
      for (var n = e.return; n !== null && n.tag !== D && n.tag !== b && n.tag !== V; )
        n = n.return;
      ya = n;
    }
    function ky(e) {
      if (e !== ya)
        return !1;
      if (!Il)
        return bE(e), Il = !0, !1;
      if (e.tag !== b && (e.tag !== D || HR(e.type) && !lg(e.type, e.memoizedProps))) {
        var n = ml;
        if (n)
          if (Cg(e))
            TE(e), bg();
          else
            for (; n; )
              xE(e, n), n = Dv(n);
      }
      return bE(e), e.tag === V ? ml = EM(e) : ml = ya ? Dv(e.stateNode) : null, !0;
    }
    function xM() {
      return Il && ml !== null;
    }
    function TE(e) {
      for (var n = ml; n; )
        EE(e, n), n = Dv(n);
    }
    function Ad() {
      ya = null, ml = null, Il = !1, Bc = !1;
    }
    function RE() {
      xu !== null && (Sw(xu), xu = null);
    }
    function ga() {
      return Il;
    }
    function Rg(e) {
      xu === null ? xu = [e] : xu.push(e);
    }
    var wM = s.ReactCurrentBatchConfig, CM = null;
    function bM() {
      return wM.transition;
    }
    var ql = {
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
      var TM = function(e) {
        for (var n = null, l = e; l !== null; )
          l.mode & zn && (n = l), l = l.return;
        return n;
      }, Gc = function(e) {
        var n = [];
        return e.forEach(function(l) {
          n.push(l);
        }), n.sort().join(", ");
      }, Lv = [], zv = [], Nv = [], Uv = [], jv = [], Fv = [], Qc = /* @__PURE__ */ new Set();
      ql.recordUnsafeLifecycleWarnings = function(e, n) {
        Qc.has(e.type) || (typeof n.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        n.componentWillMount.__suppressDeprecationWarning !== !0 && Lv.push(e), e.mode & zn && typeof n.UNSAFE_componentWillMount == "function" && zv.push(e), typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Nv.push(e), e.mode & zn && typeof n.UNSAFE_componentWillReceiveProps == "function" && Uv.push(e), typeof n.componentWillUpdate == "function" && n.componentWillUpdate.__suppressDeprecationWarning !== !0 && jv.push(e), e.mode & zn && typeof n.UNSAFE_componentWillUpdate == "function" && Fv.push(e));
      }, ql.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Lv.length > 0 && (Lv.forEach(function(J) {
          e.add(Bt(J) || "Component"), Qc.add(J.type);
        }), Lv = []);
        var n = /* @__PURE__ */ new Set();
        zv.length > 0 && (zv.forEach(function(J) {
          n.add(Bt(J) || "Component"), Qc.add(J.type);
        }), zv = []);
        var l = /* @__PURE__ */ new Set();
        Nv.length > 0 && (Nv.forEach(function(J) {
          l.add(Bt(J) || "Component"), Qc.add(J.type);
        }), Nv = []);
        var o = /* @__PURE__ */ new Set();
        Uv.length > 0 && (Uv.forEach(function(J) {
          o.add(Bt(J) || "Component"), Qc.add(J.type);
        }), Uv = []);
        var c = /* @__PURE__ */ new Set();
        jv.length > 0 && (jv.forEach(function(J) {
          c.add(Bt(J) || "Component"), Qc.add(J.type);
        }), jv = []);
        var h = /* @__PURE__ */ new Set();
        if (Fv.length > 0 && (Fv.forEach(function(J) {
          h.add(Bt(J) || "Component"), Qc.add(J.type);
        }), Fv = []), n.size > 0) {
          var E = Gc(n);
          v(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, E);
        }
        if (o.size > 0) {
          var T = Gc(o);
          v(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, T);
        }
        if (h.size > 0) {
          var M = Gc(h);
          v(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, M);
        }
        if (e.size > 0) {
          var z = Gc(e);
          m(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, z);
        }
        if (l.size > 0) {
          var N = Gc(l);
          m(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, N);
        }
        if (c.size > 0) {
          var te = Gc(c);
          m(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, te);
        }
      };
      var Oy = /* @__PURE__ */ new Map(), ME = /* @__PURE__ */ new Set();
      ql.recordLegacyContextWarning = function(e, n) {
        var l = TM(e);
        if (l === null) {
          v("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!ME.has(e.type)) {
          var o = Oy.get(l);
          (e.type.contextTypes != null || e.type.childContextTypes != null || n !== null && typeof n.getChildContext == "function") && (o === void 0 && (o = [], Oy.set(l, o)), o.push(e));
        }
      }, ql.flushLegacyContextWarning = function() {
        Oy.forEach(function(e, n) {
          if (e.length !== 0) {
            var l = e[0], o = /* @__PURE__ */ new Set();
            e.forEach(function(h) {
              o.add(Bt(h) || "Component"), ME.add(h.type);
            });
            var c = Gc(o);
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
      }, ql.discardPendingWarnings = function() {
        Lv = [], zv = [], Nv = [], Uv = [], jv = [], Fv = [], Oy = /* @__PURE__ */ new Map();
      };
    }
    var Mg, _g, Dg, kg, Og, _E = function(e, n) {
    };
    Mg = !1, _g = !1, Dg = {}, kg = {}, Og = {}, _E = function(e, n) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var l = Bt(n) || "Component";
        kg[l] || (kg[l] = !0, v('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function RM(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Pv(e, n, l) {
      var o = l.ref;
      if (o !== null && typeof o != "function" && typeof o != "object") {
        if ((e.mode & zn || Z) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(l._owner && l._self && l._owner.stateNode !== l._self) && // Will already throw with "Function components cannot have string refs"
        !(l._owner && l._owner.tag !== x) && // Will already warn with "Function components cannot be given refs"
        !(typeof l.type == "function" && !RM(l.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        l._owner) {
          var c = Bt(e) || "Component";
          Dg[c] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', c, o), Dg[c] = !0);
        }
        if (l._owner) {
          var h = l._owner, E;
          if (h) {
            var T = h;
            if (T.tag !== x)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            E = T.stateNode;
          }
          if (!E)
            throw new Error("Missing owner for string ref " + o + ". This error is likely caused by a bug in React. Please file an issue.");
          var M = E;
          yt(o, "ref");
          var z = "" + o;
          if (n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === z)
            return n.ref;
          var N = function(te) {
            var J = M.refs;
            te === null ? delete J[z] : J[z] = te;
          };
          return N._stringRef = z, N;
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
    function Ay(e, n) {
      var l = Object.prototype.toString.call(n);
      throw new Error("Objects are not valid as a React child (found: " + (l === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : l) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Ly(e) {
      {
        var n = Bt(e) || "Component";
        if (Og[n])
          return;
        Og[n] = !0, v("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function DE(e) {
      var n = e._payload, l = e._init;
      return l(n);
    }
    function kE(e) {
      function n(ce, we) {
        if (e) {
          var fe = ce.deletions;
          fe === null ? (ce.deletions = [we], ce.flags |= ci) : fe.push(we);
        }
      }
      function l(ce, we) {
        if (!e)
          return null;
        for (var fe = we; fe !== null; )
          n(ce, fe), fe = fe.sibling;
        return null;
      }
      function o(ce, we) {
        for (var fe = /* @__PURE__ */ new Map(), qe = we; qe !== null; )
          qe.key !== null ? fe.set(qe.key, qe) : fe.set(qe.index, qe), qe = qe.sibling;
        return fe;
      }
      function c(ce, we) {
        var fe = af(ce, we);
        return fe.index = 0, fe.sibling = null, fe;
      }
      function h(ce, we, fe) {
        if (ce.index = fe, !e)
          return ce.flags |= al, we;
        var qe = ce.alternate;
        if (qe !== null) {
          var mt = qe.index;
          return mt < we ? (ce.flags |= er, we) : mt;
        } else
          return ce.flags |= er, we;
      }
      function E(ce) {
        return e && ce.alternate === null && (ce.flags |= er), ce;
      }
      function T(ce, we, fe, qe) {
        if (we === null || we.tag !== _) {
          var mt = R2(fe, ce.mode, qe);
          return mt.return = ce, mt;
        } else {
          var st = c(we, fe);
          return st.return = ce, st;
        }
      }
      function M(ce, we, fe, qe) {
        var mt = fe.type;
        if (mt === Ma)
          return N(ce, we, fe.props.children, qe, fe.key);
        if (we !== null && (we.elementType === mt || // Keep this check inline so it only runs on the false path:
        Nw(we, fe) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof mt == "object" && mt !== null && mt.$$typeof === Vt && DE(mt) === we.type)) {
          var st = c(we, fe.props);
          return st.ref = Pv(ce, we, fe), st.return = ce, st._debugSource = fe._source, st._debugOwner = fe._owner, st;
        }
        var It = T2(fe, ce.mode, qe);
        return It.ref = Pv(ce, we, fe), It.return = ce, It;
      }
      function z(ce, we, fe, qe) {
        if (we === null || we.tag !== R || we.stateNode.containerInfo !== fe.containerInfo || we.stateNode.implementation !== fe.implementation) {
          var mt = M2(fe, ce.mode, qe);
          return mt.return = ce, mt;
        } else {
          var st = c(we, fe.children || []);
          return st.return = ce, st;
        }
      }
      function N(ce, we, fe, qe, mt) {
        if (we === null || we.tag !== A) {
          var st = Au(fe, ce.mode, qe, mt);
          return st.return = ce, st;
        } else {
          var It = c(we, fe);
          return It.return = ce, It;
        }
      }
      function te(ce, we, fe) {
        if (typeof we == "string" && we !== "" || typeof we == "number") {
          var qe = R2("" + we, ce.mode, fe);
          return qe.return = ce, qe;
        }
        if (typeof we == "object" && we !== null) {
          switch (we.$$typeof) {
            case Ar: {
              var mt = T2(we, ce.mode, fe);
              return mt.ref = Pv(ce, null, we), mt.return = ce, mt;
            }
            case Vn: {
              var st = M2(we, ce.mode, fe);
              return st.return = ce, st;
            }
            case Vt: {
              var It = we._payload, Kt = we._init;
              return te(ce, Kt(It), fe);
            }
          }
          if (rn(we) || Yt(we)) {
            var Un = Au(we, ce.mode, fe, null);
            return Un.return = ce, Un;
          }
          Ay(ce, we);
        }
        return typeof we == "function" && Ly(ce), null;
      }
      function J(ce, we, fe, qe) {
        var mt = we !== null ? we.key : null;
        if (typeof fe == "string" && fe !== "" || typeof fe == "number")
          return mt !== null ? null : T(ce, we, "" + fe, qe);
        if (typeof fe == "object" && fe !== null) {
          switch (fe.$$typeof) {
            case Ar:
              return fe.key === mt ? M(ce, we, fe, qe) : null;
            case Vn:
              return fe.key === mt ? z(ce, we, fe, qe) : null;
            case Vt: {
              var st = fe._payload, It = fe._init;
              return J(ce, we, It(st), qe);
            }
          }
          if (rn(fe) || Yt(fe))
            return mt !== null ? null : N(ce, we, fe, qe, null);
          Ay(ce, fe);
        }
        return typeof fe == "function" && Ly(ce), null;
      }
      function ve(ce, we, fe, qe, mt) {
        if (typeof qe == "string" && qe !== "" || typeof qe == "number") {
          var st = ce.get(fe) || null;
          return T(we, st, "" + qe, mt);
        }
        if (typeof qe == "object" && qe !== null) {
          switch (qe.$$typeof) {
            case Ar: {
              var It = ce.get(qe.key === null ? fe : qe.key) || null;
              return M(we, It, qe, mt);
            }
            case Vn: {
              var Kt = ce.get(qe.key === null ? fe : qe.key) || null;
              return z(we, Kt, qe, mt);
            }
            case Vt:
              var Un = qe._payload, Mn = qe._init;
              return ve(ce, we, fe, Mn(Un), mt);
          }
          if (rn(qe) || Yt(qe)) {
            var Or = ce.get(fe) || null;
            return N(we, Or, qe, mt, null);
          }
          Ay(we, qe);
        }
        return typeof qe == "function" && Ly(we), null;
      }
      function ge(ce, we, fe) {
        {
          if (typeof ce != "object" || ce === null)
            return we;
          switch (ce.$$typeof) {
            case Ar:
            case Vn:
              _E(ce, fe);
              var qe = ce.key;
              if (typeof qe != "string")
                break;
              if (we === null) {
                we = /* @__PURE__ */ new Set(), we.add(qe);
                break;
              }
              if (!we.has(qe)) {
                we.add(qe);
                break;
              }
              v("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", qe);
              break;
            case Vt:
              var mt = ce._payload, st = ce._init;
              ge(st(mt), we, fe);
              break;
          }
        }
        return we;
      }
      function xe(ce, we, fe, qe) {
        for (var mt = null, st = 0; st < fe.length; st++) {
          var It = fe[st];
          mt = ge(It, mt, ce);
        }
        for (var Kt = null, Un = null, Mn = we, Or = 0, _n = 0, Cr = null; Mn !== null && _n < fe.length; _n++) {
          Mn.index > _n ? (Cr = Mn, Mn = null) : Cr = Mn.sibling;
          var Ia = J(ce, Mn, fe[_n], qe);
          if (Ia === null) {
            Mn === null && (Mn = Cr);
            break;
          }
          e && Mn && Ia.alternate === null && n(ce, Mn), Or = h(Ia, Or, _n), Un === null ? Kt = Ia : Un.sibling = Ia, Un = Ia, Mn = Cr;
        }
        if (_n === fe.length) {
          if (l(ce, Mn), ga()) {
            var Ta = _n;
            Yc(ce, Ta);
          }
          return Kt;
        }
        if (Mn === null) {
          for (; _n < fe.length; _n++) {
            var Wi = te(ce, fe[_n], qe);
            Wi !== null && (Or = h(Wi, Or, _n), Un === null ? Kt = Wi : Un.sibling = Wi, Un = Wi);
          }
          if (ga()) {
            var ni = _n;
            Yc(ce, ni);
          }
          return Kt;
        }
        for (var ri = o(ce, Mn); _n < fe.length; _n++) {
          var qa = ve(ri, ce, _n, fe[_n], qe);
          qa !== null && (e && qa.alternate !== null && ri.delete(qa.key === null ? _n : qa.key), Or = h(qa, Or, _n), Un === null ? Kt = qa : Un.sibling = qa, Un = qa);
        }
        if (e && ri.forEach(function(Kd) {
          return n(ce, Kd);
        }), ga()) {
          var Ls = _n;
          Yc(ce, Ls);
        }
        return Kt;
      }
      function lt(ce, we, fe, qe) {
        var mt = Yt(fe);
        if (typeof mt != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          fe[Symbol.toStringTag] === "Generator" && (_g || v("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), _g = !0), fe.entries === mt && (Mg || v("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Mg = !0);
          var st = mt.call(fe);
          if (st)
            for (var It = null, Kt = st.next(); !Kt.done; Kt = st.next()) {
              var Un = Kt.value;
              It = ge(Un, It, ce);
            }
        }
        var Mn = mt.call(fe);
        if (Mn == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Or = null, _n = null, Cr = we, Ia = 0, Ta = 0, Wi = null, ni = Mn.next(); Cr !== null && !ni.done; Ta++, ni = Mn.next()) {
          Cr.index > Ta ? (Wi = Cr, Cr = null) : Wi = Cr.sibling;
          var ri = J(ce, Cr, ni.value, qe);
          if (ri === null) {
            Cr === null && (Cr = Wi);
            break;
          }
          e && Cr && ri.alternate === null && n(ce, Cr), Ia = h(ri, Ia, Ta), _n === null ? Or = ri : _n.sibling = ri, _n = ri, Cr = Wi;
        }
        if (ni.done) {
          if (l(ce, Cr), ga()) {
            var qa = Ta;
            Yc(ce, qa);
          }
          return Or;
        }
        if (Cr === null) {
          for (; !ni.done; Ta++, ni = Mn.next()) {
            var Ls = te(ce, ni.value, qe);
            Ls !== null && (Ia = h(Ls, Ia, Ta), _n === null ? Or = Ls : _n.sibling = Ls, _n = Ls);
          }
          if (ga()) {
            var Kd = Ta;
            Yc(ce, Kd);
          }
          return Or;
        }
        for (var yh = o(ce, Cr); !ni.done; Ta++, ni = Mn.next()) {
          var Ho = ve(yh, ce, Ta, ni.value, qe);
          Ho !== null && (e && Ho.alternate !== null && yh.delete(Ho.key === null ? Ta : Ho.key), Ia = h(Ho, Ia, Ta), _n === null ? Or = Ho : _n.sibling = Ho, _n = Ho);
        }
        if (e && yh.forEach(function(Zk) {
          return n(ce, Zk);
        }), ga()) {
          var Kk = Ta;
          Yc(ce, Kk);
        }
        return Or;
      }
      function Nt(ce, we, fe, qe) {
        if (we !== null && we.tag === _) {
          l(ce, we.sibling);
          var mt = c(we, fe);
          return mt.return = ce, mt;
        }
        l(ce, we);
        var st = R2(fe, ce.mode, qe);
        return st.return = ce, st;
      }
      function _t(ce, we, fe, qe) {
        for (var mt = fe.key, st = we; st !== null; ) {
          if (st.key === mt) {
            var It = fe.type;
            if (It === Ma) {
              if (st.tag === A) {
                l(ce, st.sibling);
                var Kt = c(st, fe.props.children);
                return Kt.return = ce, Kt._debugSource = fe._source, Kt._debugOwner = fe._owner, Kt;
              }
            } else if (st.elementType === It || // Keep this check inline so it only runs on the false path:
            Nw(st, fe) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof It == "object" && It !== null && It.$$typeof === Vt && DE(It) === st.type) {
              l(ce, st.sibling);
              var Un = c(st, fe.props);
              return Un.ref = Pv(ce, st, fe), Un.return = ce, Un._debugSource = fe._source, Un._debugOwner = fe._owner, Un;
            }
            l(ce, st);
            break;
          } else
            n(ce, st);
          st = st.sibling;
        }
        if (fe.type === Ma) {
          var Mn = Au(fe.props.children, ce.mode, qe, fe.key);
          return Mn.return = ce, Mn;
        } else {
          var Or = T2(fe, ce.mode, qe);
          return Or.ref = Pv(ce, we, fe), Or.return = ce, Or;
        }
      }
      function mn(ce, we, fe, qe) {
        for (var mt = fe.key, st = we; st !== null; ) {
          if (st.key === mt)
            if (st.tag === R && st.stateNode.containerInfo === fe.containerInfo && st.stateNode.implementation === fe.implementation) {
              l(ce, st.sibling);
              var It = c(st, fe.children || []);
              return It.return = ce, It;
            } else {
              l(ce, st);
              break;
            }
          else
            n(ce, st);
          st = st.sibling;
        }
        var Kt = M2(fe, ce.mode, qe);
        return Kt.return = ce, Kt;
      }
      function fn(ce, we, fe, qe) {
        var mt = typeof fe == "object" && fe !== null && fe.type === Ma && fe.key === null;
        if (mt && (fe = fe.props.children), typeof fe == "object" && fe !== null) {
          switch (fe.$$typeof) {
            case Ar:
              return E(_t(ce, we, fe, qe));
            case Vn:
              return E(mn(ce, we, fe, qe));
            case Vt:
              var st = fe._payload, It = fe._init;
              return fn(ce, we, It(st), qe);
          }
          if (rn(fe))
            return xe(ce, we, fe, qe);
          if (Yt(fe))
            return lt(ce, we, fe, qe);
          Ay(ce, fe);
        }
        return typeof fe == "string" && fe !== "" || typeof fe == "number" ? E(Nt(ce, we, "" + fe, qe)) : (typeof fe == "function" && Ly(ce), l(ce, we));
      }
      return fn;
    }
    var Ld = kE(!0), OE = kE(!1);
    function MM(e, n) {
      if (e !== null && n.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (n.child !== null) {
        var l = n.child, o = af(l, l.pendingProps);
        for (n.child = o, o.return = n; l.sibling !== null; )
          l = l.sibling, o = o.sibling = af(l, l.pendingProps), o.return = n;
        o.sibling = null;
      }
    }
    function _M(e, n) {
      for (var l = e.child; l !== null; )
        hk(l, n), l = l.sibling;
    }
    var Ag = gu(null), Lg;
    Lg = {};
    var zy = null, zd = null, zg = null, Ny = !1;
    function Uy() {
      zy = null, zd = null, zg = null, Ny = !1;
    }
    function AE() {
      Ny = !0;
    }
    function LE() {
      Ny = !1;
    }
    function zE(e, n, l) {
      Ha(Ag, n._currentValue, e), n._currentValue = l, n._currentRenderer !== void 0 && n._currentRenderer !== null && n._currentRenderer !== Lg && v("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), n._currentRenderer = Lg;
    }
    function Ng(e, n) {
      var l = Ag.current;
      $a(Ag, n), e._currentValue = l;
    }
    function Ug(e, n, l) {
      for (var o = e; o !== null; ) {
        var c = o.alternate;
        if (hs(o.childLanes, n) ? c !== null && !hs(c.childLanes, n) && (c.childLanes = en(c.childLanes, n)) : (o.childLanes = en(o.childLanes, n), c !== null && (c.childLanes = en(c.childLanes, n))), o === l)
          break;
        o = o.return;
      }
      o !== l && v("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function DM(e, n, l) {
      kM(e, n, l);
    }
    function kM(e, n, l) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var c = void 0, h = o.dependencies;
        if (h !== null) {
          c = o.child;
          for (var E = h.firstContext; E !== null; ) {
            if (E.context === n) {
              if (o.tag === x) {
                var T = wc(l), M = Ms(jn, T);
                M.tag = Fy;
                var z = o.updateQueue;
                if (z !== null) {
                  var N = z.shared, te = N.pending;
                  te === null ? M.next = M : (M.next = te.next, te.next = M), N.pending = M;
                }
              }
              o.lanes = en(o.lanes, l);
              var J = o.alternate;
              J !== null && (J.lanes = en(J.lanes, l)), Ug(o.return, l, e), h.lanes = en(h.lanes, l);
              break;
            }
            E = E.next;
          }
        } else if (o.tag === q)
          c = o.type === e.type ? null : o.child;
        else if (o.tag === j) {
          var ve = o.return;
          if (ve === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          ve.lanes = en(ve.lanes, l);
          var ge = ve.alternate;
          ge !== null && (ge.lanes = en(ge.lanes, l)), Ug(ve, l, e), c = o.sibling;
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
            var xe = c.sibling;
            if (xe !== null) {
              xe.return = c.return, c = xe;
              break;
            }
            c = c.return;
          }
        o = c;
      }
    }
    function Nd(e, n) {
      zy = e, zd = null, zg = null;
      var l = e.dependencies;
      if (l !== null) {
        var o = l.firstContext;
        o !== null && (Ua(l.lanes, n) && eh(), l.firstContext = null);
      }
    }
    function Fr(e) {
      Ny && v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var n = e._currentValue;
      if (zg !== e) {
        var l = {
          context: e,
          memoizedValue: n,
          next: null
        };
        if (zd === null) {
          if (zy === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          zd = l, zy.dependencies = {
            lanes: Le,
            firstContext: l
          };
        } else
          zd = zd.next = l;
      }
      return n;
    }
    var Xc = null;
    function jg(e) {
      Xc === null ? Xc = [e] : Xc.push(e);
    }
    function OM() {
      if (Xc !== null) {
        for (var e = 0; e < Xc.length; e++) {
          var n = Xc[e], l = n.interleaved;
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
        Xc = null;
      }
    }
    function NE(e, n, l, o) {
      var c = n.interleaved;
      return c === null ? (l.next = l, jg(n)) : (l.next = c.next, c.next = l), n.interleaved = l, jy(e, o);
    }
    function AM(e, n, l, o) {
      var c = n.interleaved;
      c === null ? (l.next = l, jg(n)) : (l.next = c.next, c.next = l), n.interleaved = l;
    }
    function LM(e, n, l, o) {
      var c = n.interleaved;
      return c === null ? (l.next = l, jg(n)) : (l.next = c.next, c.next = l), n.interleaved = l, jy(e, o);
    }
    function Ei(e, n) {
      return jy(e, n);
    }
    var zM = jy;
    function jy(e, n) {
      e.lanes = en(e.lanes, n);
      var l = e.alternate;
      l !== null && (l.lanes = en(l.lanes, n)), l === null && (e.flags & (er | Oa)) !== At && Ow(e);
      for (var o = e, c = e.return; c !== null; )
        c.childLanes = en(c.childLanes, n), l = c.alternate, l !== null ? l.childLanes = en(l.childLanes, n) : (c.flags & (er | Oa)) !== At && Ow(e), o = c, c = c.return;
      if (o.tag === b) {
        var h = o.stateNode;
        return h;
      } else
        return null;
    }
    var UE = 0, jE = 1, Fy = 2, Fg = 3, Py = !1, Pg, $y;
    Pg = !1, $y = null;
    function $g(e) {
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
    function FE(e, n) {
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
    function Ms(e, n) {
      var l = {
        eventTime: e,
        lane: n,
        tag: UE,
        payload: null,
        callback: null,
        next: null
      };
      return l;
    }
    function wu(e, n, l) {
      var o = e.updateQueue;
      if (o === null)
        return null;
      var c = o.shared;
      if ($y === c && !Pg && (v("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Pg = !0), AD()) {
        var h = c.pending;
        return h === null ? n.next = n : (n.next = h.next, h.next = n), c.pending = n, zM(e, l);
      } else
        return LM(e, c, n, l);
    }
    function Hy(e, n, l) {
      var o = n.updateQueue;
      if (o !== null) {
        var c = o.shared;
        if (Zp(l)) {
          var h = c.lanes;
          h = ev(h, e.pendingLanes);
          var E = en(h, l);
          c.lanes = E, od(e, E);
        }
      }
    }
    function Hg(e, n) {
      var l = e.updateQueue, o = e.alternate;
      if (o !== null) {
        var c = o.updateQueue;
        if (l === c) {
          var h = null, E = null, T = l.firstBaseUpdate;
          if (T !== null) {
            var M = T;
            do {
              var z = {
                eventTime: M.eventTime,
                lane: M.lane,
                tag: M.tag,
                payload: M.payload,
                callback: M.callback,
                next: null
              };
              E === null ? h = E = z : (E.next = z, E = z), M = M.next;
            } while (M !== null);
            E === null ? h = E = n : (E.next = n, E = n);
          } else
            h = E = n;
          l = {
            baseState: c.baseState,
            firstBaseUpdate: h,
            lastBaseUpdate: E,
            shared: c.shared,
            effects: c.effects
          }, e.updateQueue = l;
          return;
        }
      }
      var N = l.lastBaseUpdate;
      N === null ? l.firstBaseUpdate = n : N.next = n, l.lastBaseUpdate = n;
    }
    function NM(e, n, l, o, c, h) {
      switch (l.tag) {
        case jE: {
          var E = l.payload;
          if (typeof E == "function") {
            AE();
            var T = E.call(h, o, c);
            {
              if (e.mode & zn) {
                tr(!0);
                try {
                  E.call(h, o, c);
                } finally {
                  tr(!1);
                }
              }
              LE();
            }
            return T;
          }
          return E;
        }
        case Fg:
          e.flags = e.flags & ~zr | kt;
        // Intentional fallthrough
        case UE: {
          var M = l.payload, z;
          if (typeof M == "function") {
            AE(), z = M.call(h, o, c);
            {
              if (e.mode & zn) {
                tr(!0);
                try {
                  M.call(h, o, c);
                } finally {
                  tr(!1);
                }
              }
              LE();
            }
          } else
            z = M;
          return z == null ? o : Qt({}, o, z);
        }
        case Fy:
          return Py = !0, o;
      }
      return o;
    }
    function Vy(e, n, l, o) {
      var c = e.updateQueue;
      Py = !1, $y = c.shared;
      var h = c.firstBaseUpdate, E = c.lastBaseUpdate, T = c.shared.pending;
      if (T !== null) {
        c.shared.pending = null;
        var M = T, z = M.next;
        M.next = null, E === null ? h = z : E.next = z, E = M;
        var N = e.alternate;
        if (N !== null) {
          var te = N.updateQueue, J = te.lastBaseUpdate;
          J !== E && (J === null ? te.firstBaseUpdate = z : J.next = z, te.lastBaseUpdate = M);
        }
      }
      if (h !== null) {
        var ve = c.baseState, ge = Le, xe = null, lt = null, Nt = null, _t = h;
        do {
          var mn = _t.lane, fn = _t.eventTime;
          if (hs(o, mn)) {
            if (Nt !== null) {
              var we = {
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
              Nt = Nt.next = we;
            }
            ve = NM(e, c, _t, ve, n, l);
            var fe = _t.callback;
            if (fe !== null && // If the update was already committed, we should not queue its
            // callback again.
            _t.lane !== wn) {
              e.flags |= Pn;
              var qe = c.effects;
              qe === null ? c.effects = [_t] : qe.push(_t);
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
            Nt === null ? (lt = Nt = ce, xe = ve) : Nt = Nt.next = ce, ge = en(ge, mn);
          }
          if (_t = _t.next, _t === null) {
            if (T = c.shared.pending, T === null)
              break;
            var mt = T, st = mt.next;
            mt.next = null, _t = st, c.lastBaseUpdate = mt, c.shared.pending = null;
          }
        } while (!0);
        Nt === null && (xe = ve), c.baseState = xe, c.firstBaseUpdate = lt, c.lastBaseUpdate = Nt;
        var It = c.shared.interleaved;
        if (It !== null) {
          var Kt = It;
          do
            ge = en(ge, Kt.lane), Kt = Kt.next;
          while (Kt !== It);
        } else h === null && (c.shared.lanes = Le);
        dh(ge), e.lanes = ge, e.memoizedState = ve;
      }
      $y = null;
    }
    function UM(e, n) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(n);
    }
    function PE() {
      Py = !1;
    }
    function Iy() {
      return Py;
    }
    function $E(e, n, l) {
      var o = n.effects;
      if (n.effects = null, o !== null)
        for (var c = 0; c < o.length; c++) {
          var h = o[c], E = h.callback;
          E !== null && (h.callback = null, UM(E, l));
        }
    }
    var $v = {}, Cu = gu($v), Hv = gu($v), qy = gu($v);
    function Yy(e) {
      if (e === $v)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function HE() {
      var e = Yy(qy.current);
      return e;
    }
    function Vg(e, n) {
      Ha(qy, n, e), Ha(Hv, e, e), Ha(Cu, $v, e);
      var l = JT(n);
      $a(Cu, e), Ha(Cu, l, e);
    }
    function Ud(e) {
      $a(Cu, e), $a(Hv, e), $a(qy, e);
    }
    function Ig() {
      var e = Yy(Cu.current);
      return e;
    }
    function VE(e) {
      Yy(qy.current);
      var n = Yy(Cu.current), l = eR(n, e.type);
      n !== l && (Ha(Hv, e, e), Ha(Cu, l, e));
    }
    function qg(e) {
      Hv.current === e && ($a(Cu, e), $a(Hv, e));
    }
    var jM = 0, IE = 1, qE = 1, Vv = 2, Yl = gu(jM);
    function Yg(e, n) {
      return (e & n) !== 0;
    }
    function jd(e) {
      return e & IE;
    }
    function Wg(e, n) {
      return e & IE | n;
    }
    function FM(e, n) {
      return e | n;
    }
    function bu(e, n) {
      Ha(Yl, n, e);
    }
    function Fd(e) {
      $a(Yl, e);
    }
    function PM(e, n) {
      var l = e.memoizedState;
      return l !== null ? l.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Wy(e) {
      for (var n = e; n !== null; ) {
        if (n.tag === V) {
          var l = n.memoizedState;
          if (l !== null) {
            var o = l.dehydrated;
            if (o === null || oE(o) || cg(o))
              return n;
          }
        } else if (n.tag === ne && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        n.memoizedProps.revealOrder !== void 0) {
          var c = (n.flags & kt) !== At;
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
    var xi = (
      /*   */
      0
    ), Wr = (
      /* */
      1
    ), zo = (
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
    function $M(e, n) {
      var l = n._getVersion, o = l(n._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [n, o] : e.mutableSourceEagerHydrationData.push(n, o);
    }
    var vt = s.ReactCurrentDispatcher, Iv = s.ReactCurrentBatchConfig, Qg, Pd;
    Qg = /* @__PURE__ */ new Set();
    var Kc = Le, Nn = null, Gr = null, Qr = null, By = !1, qv = !1, Yv = 0, HM = 0, VM = 25, Te = null, yl = null, Tu = -1, Xg = !1;
    function kn() {
      {
        var e = Te;
        yl === null ? yl = [e] : yl.push(e);
      }
    }
    function et() {
      {
        var e = Te;
        yl !== null && (Tu++, yl[Tu] !== e && IM(e));
      }
    }
    function $d(e) {
      e != null && !rn(e) && v("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Te, typeof e);
    }
    function IM(e) {
      {
        var n = Bt(Nn);
        if (!Qg.has(n) && (Qg.add(n), yl !== null)) {
          for (var l = "", o = 30, c = 0; c <= Tu; c++) {
            for (var h = yl[c], E = c === Tu ? e : h, T = c + 1 + ". " + h; T.length < o; )
              T += " ";
            T += E + `
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
        return v("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Te), !1;
      e.length !== n.length && v(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, Te, "[" + n.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var l = 0; l < n.length && l < e.length; l++)
        if (!je(e[l], n[l]))
          return !1;
      return !0;
    }
    function Hd(e, n, l, o, c, h) {
      Kc = h, Nn = n, yl = e !== null ? e._debugHookTypes : null, Tu = -1, Xg = e !== null && e.type !== n.type, n.memoizedState = null, n.updateQueue = null, n.lanes = Le, e !== null && e.memoizedState !== null ? vt.current = dx : yl !== null ? vt.current = fx : vt.current = cx;
      var E = l(o, c);
      if (qv) {
        var T = 0;
        do {
          if (qv = !1, Yv = 0, T >= VM)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          T += 1, Xg = !1, Gr = null, Qr = null, n.updateQueue = null, Tu = -1, vt.current = px, E = l(o, c);
        } while (qv);
      }
      vt.current = l0, n._debugHookTypes = yl;
      var M = Gr !== null && Gr.next !== null;
      if (Kc = Le, Nn = null, Gr = null, Qr = null, Te = null, yl = null, Tu = -1, e !== null && (e.flags & yr) !== (n.flags & yr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & ln) !== Lt && v("Internal React error: Expected static flag was missing. Please notify the React team."), By = !1, M)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return E;
    }
    function Vd() {
      var e = Yv !== 0;
      return Yv = 0, e;
    }
    function YE(e, n, l) {
      n.updateQueue = e.updateQueue, (n.mode & Tn) !== Lt ? n.flags &= -50333701 : n.flags &= -2053, e.lanes = Cc(e.lanes, l);
    }
    function WE() {
      if (vt.current = l0, By) {
        for (var e = Nn.memoizedState; e !== null; ) {
          var n = e.queue;
          n !== null && (n.pending = null), e = e.next;
        }
        By = !1;
      }
      Kc = Le, Nn = null, Gr = null, Qr = null, yl = null, Tu = -1, Te = null, ix = !1, qv = !1, Yv = 0;
    }
    function No() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Qr === null ? Nn.memoizedState = Qr = e : Qr = Qr.next = e, Qr;
    }
    function gl() {
      var e;
      if (Gr === null) {
        var n = Nn.alternate;
        n !== null ? e = n.memoizedState : e = null;
      } else
        e = Gr.next;
      var l;
      if (Qr === null ? l = Nn.memoizedState : l = Qr.next, l !== null)
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
        Qr === null ? Nn.memoizedState = Qr = o : Qr = Qr.next = o;
      }
      return Qr;
    }
    function BE() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function Zg(e, n) {
      return typeof n == "function" ? n(e) : n;
    }
    function Jg(e, n, l) {
      var o = No(), c;
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
      var E = h.dispatch = BM.bind(null, Nn, h);
      return [o.memoizedState, E];
    }
    function eS(e, n, l) {
      var o = gl(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var h = Gr, E = h.baseQueue, T = c.pending;
      if (T !== null) {
        if (E !== null) {
          var M = E.next, z = T.next;
          E.next = z, T.next = M;
        }
        h.baseQueue !== E && v("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), h.baseQueue = E = T, c.pending = null;
      }
      if (E !== null) {
        var N = E.next, te = h.baseState, J = null, ve = null, ge = null, xe = N;
        do {
          var lt = xe.lane;
          if (hs(Kc, lt)) {
            if (ge !== null) {
              var _t = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: wn,
                action: xe.action,
                hasEagerState: xe.hasEagerState,
                eagerState: xe.eagerState,
                next: null
              };
              ge = ge.next = _t;
            }
            if (xe.hasEagerState)
              te = xe.eagerState;
            else {
              var mn = xe.action;
              te = e(te, mn);
            }
          } else {
            var Nt = {
              lane: lt,
              action: xe.action,
              hasEagerState: xe.hasEagerState,
              eagerState: xe.eagerState,
              next: null
            };
            ge === null ? (ve = ge = Nt, J = te) : ge = ge.next = Nt, Nn.lanes = en(Nn.lanes, lt), dh(lt);
          }
          xe = xe.next;
        } while (xe !== null && xe !== N);
        ge === null ? J = te : ge.next = ve, je(te, o.memoizedState) || eh(), o.memoizedState = te, o.baseState = J, o.baseQueue = ge, c.lastRenderedState = te;
      }
      var fn = c.interleaved;
      if (fn !== null) {
        var ce = fn;
        do {
          var we = ce.lane;
          Nn.lanes = en(Nn.lanes, we), dh(we), ce = ce.next;
        } while (ce !== fn);
      } else E === null && (c.lanes = Le);
      var fe = c.dispatch;
      return [o.memoizedState, fe];
    }
    function tS(e, n, l) {
      var o = gl(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var h = c.dispatch, E = c.pending, T = o.memoizedState;
      if (E !== null) {
        c.pending = null;
        var M = E.next, z = M;
        do {
          var N = z.action;
          T = e(T, N), z = z.next;
        } while (z !== M);
        je(T, o.memoizedState) || eh(), o.memoizedState = T, o.baseQueue === null && (o.baseState = T), c.lastRenderedState = T;
      }
      return [T, h];
    }
    function TN(e, n, l) {
    }
    function RN(e, n, l) {
    }
    function nS(e, n, l) {
      var o = Nn, c = No(), h, E = ga();
      if (E) {
        if (l === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        h = l(), Pd || h !== l() && (v("The result of getServerSnapshot should be cached to avoid an infinite loop"), Pd = !0);
      } else {
        if (h = n(), !Pd) {
          var T = n();
          je(h, T) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), Pd = !0);
        }
        var M = T0();
        if (M === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        id(M, Kc) || GE(o, n, h);
      }
      c.memoizedState = h;
      var z = {
        value: h,
        getSnapshot: n
      };
      return c.queue = z, Zy(XE.bind(null, o, z, e), [e]), o.flags |= ka, Wv(Wr | Sa, QE.bind(null, o, z, h, n), void 0, null), h;
    }
    function Gy(e, n, l) {
      var o = Nn, c = gl(), h = n();
      if (!Pd) {
        var E = n();
        je(h, E) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), Pd = !0);
      }
      var T = c.memoizedState, M = !je(T, h);
      M && (c.memoizedState = h, eh());
      var z = c.queue;
      if (Gv(XE.bind(null, o, z, e), [e]), z.getSnapshot !== n || M || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      Qr !== null && Qr.memoizedState.tag & Wr) {
        o.flags |= ka, Wv(Wr | Sa, QE.bind(null, o, z, h, n), void 0, null);
        var N = T0();
        if (N === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        id(N, Kc) || GE(o, n, h);
      }
      return h;
    }
    function GE(e, n, l) {
      e.flags |= nu;
      var o = {
        getSnapshot: n,
        value: l
      }, c = Nn.updateQueue;
      if (c === null)
        c = BE(), Nn.updateQueue = c, c.stores = [o];
      else {
        var h = c.stores;
        h === null ? c.stores = [o] : h.push(o);
      }
    }
    function QE(e, n, l, o) {
      n.value = l, n.getSnapshot = o, KE(n) && ZE(e);
    }
    function XE(e, n, l) {
      var o = function() {
        KE(n) && ZE(e);
      };
      return l(o);
    }
    function KE(e) {
      var n = e.getSnapshot, l = e.value;
      try {
        var o = n();
        return !je(l, o);
      } catch {
        return !0;
      }
    }
    function ZE(e) {
      var n = Ei(e, Ht);
      n !== null && Jr(n, e, Ht, jn);
    }
    function Qy(e) {
      var n = No();
      typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e;
      var l = {
        pending: null,
        interleaved: null,
        lanes: Le,
        dispatch: null,
        lastRenderedReducer: Zg,
        lastRenderedState: e
      };
      n.queue = l;
      var o = l.dispatch = GM.bind(null, Nn, l);
      return [n.memoizedState, o];
    }
    function rS(e) {
      return eS(Zg);
    }
    function aS(e) {
      return tS(Zg);
    }
    function Wv(e, n, l, o) {
      var c = {
        tag: e,
        create: n,
        destroy: l,
        deps: o,
        // Circular
        next: null
      }, h = Nn.updateQueue;
      if (h === null)
        h = BE(), Nn.updateQueue = h, h.lastEffect = c.next = c;
      else {
        var E = h.lastEffect;
        if (E === null)
          h.lastEffect = c.next = c;
        else {
          var T = E.next;
          E.next = c, c.next = T, h.lastEffect = c;
        }
      }
      return c;
    }
    function iS(e) {
      var n = No();
      {
        var l = {
          current: e
        };
        return n.memoizedState = l, l;
      }
    }
    function Xy(e) {
      var n = gl();
      return n.memoizedState;
    }
    function Bv(e, n, l, o) {
      var c = No(), h = o === void 0 ? null : o;
      Nn.flags |= e, c.memoizedState = Wv(Wr | n, l, void 0, h);
    }
    function Ky(e, n, l, o) {
      var c = gl(), h = o === void 0 ? null : o, E = void 0;
      if (Gr !== null) {
        var T = Gr.memoizedState;
        if (E = T.destroy, h !== null) {
          var M = T.deps;
          if (Kg(h, M)) {
            c.memoizedState = Wv(n, l, E, h);
            return;
          }
        }
      }
      Nn.flags |= e, c.memoizedState = Wv(Wr | n, l, E, h);
    }
    function Zy(e, n) {
      return (Nn.mode & Tn) !== Lt ? Bv(il | ka | Af, Sa, e, n) : Bv(ka | Af, Sa, e, n);
    }
    function Gv(e, n) {
      return Ky(ka, Sa, e, n);
    }
    function lS(e, n) {
      return Bv(pn, zo, e, n);
    }
    function Jy(e, n) {
      return Ky(pn, zo, e, n);
    }
    function oS(e, n) {
      var l = pn;
      return l |= Ll, (Nn.mode & Tn) !== Lt && (l |= mo), Bv(l, Br, e, n);
    }
    function e0(e, n) {
      return Ky(pn, Br, e, n);
    }
    function JE(e, n) {
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
      var o = l != null ? l.concat([e]) : null, c = pn;
      return c |= Ll, (Nn.mode & Tn) !== Lt && (c |= mo), Bv(c, Br, JE.bind(null, n, e), o);
    }
    function t0(e, n, l) {
      typeof n != "function" && v("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", n !== null ? typeof n : "null");
      var o = l != null ? l.concat([e]) : null;
      return Ky(pn, Br, JE.bind(null, n, e), o);
    }
    function qM(e, n) {
    }
    var n0 = qM;
    function uS(e, n) {
      var l = No(), o = n === void 0 ? null : n;
      return l.memoizedState = [e, o], e;
    }
    function r0(e, n) {
      var l = gl(), o = n === void 0 ? null : n, c = l.memoizedState;
      if (c !== null && o !== null) {
        var h = c[1];
        if (Kg(o, h))
          return c[0];
      }
      return l.memoizedState = [e, o], e;
    }
    function cS(e, n) {
      var l = No(), o = n === void 0 ? null : n, c = e();
      return l.memoizedState = [c, o], c;
    }
    function a0(e, n) {
      var l = gl(), o = n === void 0 ? null : n, c = l.memoizedState;
      if (c !== null && o !== null) {
        var h = c[1];
        if (Kg(o, h))
          return c[0];
      }
      var E = e();
      return l.memoizedState = [E, o], E;
    }
    function fS(e) {
      var n = No();
      return n.memoizedState = e, e;
    }
    function ex(e) {
      var n = gl(), l = Gr, o = l.memoizedState;
      return nx(n, o, e);
    }
    function tx(e) {
      var n = gl();
      if (Gr === null)
        return n.memoizedState = e, e;
      var l = Gr.memoizedState;
      return nx(n, l, e);
    }
    function nx(e, n, l) {
      var o = !Xp(Kc);
      if (o) {
        if (!je(l, n)) {
          var c = Jp();
          Nn.lanes = en(Nn.lanes, c), dh(c), e.baseState = !0;
        }
        return n;
      } else
        return e.baseState && (e.baseState = !1, eh()), e.memoizedState = l, l;
    }
    function YM(e, n, l) {
      var o = yi();
      Er(Nm(o, ul)), e(!0);
      var c = Iv.transition;
      Iv.transition = {};
      var h = Iv.transition;
      Iv.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), n();
      } finally {
        if (Er(o), Iv.transition = c, c === null && h._updatedFibers) {
          var E = h._updatedFibers.size;
          E > 10 && m("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), h._updatedFibers.clear();
        }
      }
    }
    function dS() {
      var e = Qy(!1), n = e[0], l = e[1], o = YM.bind(null, l), c = No();
      return c.memoizedState = o, [n, o];
    }
    function rx() {
      var e = rS(), n = e[0], l = gl(), o = l.memoizedState;
      return [n, o];
    }
    function ax() {
      var e = aS(), n = e[0], l = gl(), o = l.memoizedState;
      return [n, o];
    }
    var ix = !1;
    function WM() {
      return ix;
    }
    function pS() {
      var e = No(), n = T0(), l = n.identifierPrefix, o;
      if (ga()) {
        var c = uM();
        o = ":" + l + "R" + c;
        var h = Yv++;
        h > 0 && (o += "H" + h.toString(32)), o += ":";
      } else {
        var E = HM++;
        o = ":" + l + "r" + E.toString(32) + ":";
      }
      return e.memoizedState = o, o;
    }
    function i0() {
      var e = gl(), n = e.memoizedState;
      return n;
    }
    function BM(e, n, l) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = ku(e), c = {
        lane: o,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (lx(e))
        ox(n, c);
      else {
        var h = NE(e, n, c, o);
        if (h !== null) {
          var E = ti();
          Jr(h, e, o, E), sx(h, n, o);
        }
      }
      ux(e, o);
    }
    function GM(e, n, l) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = ku(e), c = {
        lane: o,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (lx(e))
        ox(n, c);
      else {
        var h = e.alternate;
        if (e.lanes === Le && (h === null || h.lanes === Le)) {
          var E = n.lastRenderedReducer;
          if (E !== null) {
            var T;
            T = vt.current, vt.current = Wl;
            try {
              var M = n.lastRenderedState, z = E(M, l);
              if (c.hasEagerState = !0, c.eagerState = z, je(z, M)) {
                AM(e, n, c, o);
                return;
              }
            } catch {
            } finally {
              vt.current = T;
            }
          }
        }
        var N = NE(e, n, c, o);
        if (N !== null) {
          var te = ti();
          Jr(N, e, o, te), sx(N, n, o);
        }
      }
      ux(e, o);
    }
    function lx(e) {
      var n = e.alternate;
      return e === Nn || n !== null && n === Nn;
    }
    function ox(e, n) {
      qv = By = !0;
      var l = e.pending;
      l === null ? n.next = n : (n.next = l.next, l.next = n), e.pending = n;
    }
    function sx(e, n, l) {
      if (Zp(l)) {
        var o = n.lanes;
        o = ev(o, e.pendingLanes);
        var c = en(o, l);
        n.lanes = c, od(e, c);
      }
    }
    function ux(e, n, l) {
      pc(e, n);
    }
    var l0 = {
      readContext: Fr,
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
      unstable_isNewReconciler: re
    }, cx = null, fx = null, dx = null, px = null, Uo = null, Wl = null, o0 = null;
    {
      var vS = function() {
        v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, Xt = function() {
        v("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      cx = {
        readContext: function(e) {
          return Fr(e);
        },
        useCallback: function(e, n) {
          return Te = "useCallback", kn(), $d(n), uS(e, n);
        },
        useContext: function(e) {
          return Te = "useContext", kn(), Fr(e);
        },
        useEffect: function(e, n) {
          return Te = "useEffect", kn(), $d(n), Zy(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Te = "useImperativeHandle", kn(), $d(l), sS(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Te = "useInsertionEffect", kn(), $d(n), lS(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Te = "useLayoutEffect", kn(), $d(n), oS(e, n);
        },
        useMemo: function(e, n) {
          Te = "useMemo", kn(), $d(n);
          var l = vt.current;
          vt.current = Uo;
          try {
            return cS(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Te = "useReducer", kn();
          var o = vt.current;
          vt.current = Uo;
          try {
            return Jg(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return Te = "useRef", kn(), iS(e);
        },
        useState: function(e) {
          Te = "useState", kn();
          var n = vt.current;
          vt.current = Uo;
          try {
            return Qy(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Te = "useDebugValue", kn(), void 0;
        },
        useDeferredValue: function(e) {
          return Te = "useDeferredValue", kn(), fS(e);
        },
        useTransition: function() {
          return Te = "useTransition", kn(), dS();
        },
        useMutableSource: function(e, n, l) {
          return Te = "useMutableSource", kn(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Te = "useSyncExternalStore", kn(), nS(e, n, l);
        },
        useId: function() {
          return Te = "useId", kn(), pS();
        },
        unstable_isNewReconciler: re
      }, fx = {
        readContext: function(e) {
          return Fr(e);
        },
        useCallback: function(e, n) {
          return Te = "useCallback", et(), uS(e, n);
        },
        useContext: function(e) {
          return Te = "useContext", et(), Fr(e);
        },
        useEffect: function(e, n) {
          return Te = "useEffect", et(), Zy(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Te = "useImperativeHandle", et(), sS(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Te = "useInsertionEffect", et(), lS(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Te = "useLayoutEffect", et(), oS(e, n);
        },
        useMemo: function(e, n) {
          Te = "useMemo", et();
          var l = vt.current;
          vt.current = Uo;
          try {
            return cS(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Te = "useReducer", et();
          var o = vt.current;
          vt.current = Uo;
          try {
            return Jg(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return Te = "useRef", et(), iS(e);
        },
        useState: function(e) {
          Te = "useState", et();
          var n = vt.current;
          vt.current = Uo;
          try {
            return Qy(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Te = "useDebugValue", et(), void 0;
        },
        useDeferredValue: function(e) {
          return Te = "useDeferredValue", et(), fS(e);
        },
        useTransition: function() {
          return Te = "useTransition", et(), dS();
        },
        useMutableSource: function(e, n, l) {
          return Te = "useMutableSource", et(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Te = "useSyncExternalStore", et(), nS(e, n, l);
        },
        useId: function() {
          return Te = "useId", et(), pS();
        },
        unstable_isNewReconciler: re
      }, dx = {
        readContext: function(e) {
          return Fr(e);
        },
        useCallback: function(e, n) {
          return Te = "useCallback", et(), r0(e, n);
        },
        useContext: function(e) {
          return Te = "useContext", et(), Fr(e);
        },
        useEffect: function(e, n) {
          return Te = "useEffect", et(), Gv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Te = "useImperativeHandle", et(), t0(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Te = "useInsertionEffect", et(), Jy(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Te = "useLayoutEffect", et(), e0(e, n);
        },
        useMemo: function(e, n) {
          Te = "useMemo", et();
          var l = vt.current;
          vt.current = Wl;
          try {
            return a0(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Te = "useReducer", et();
          var o = vt.current;
          vt.current = Wl;
          try {
            return eS(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return Te = "useRef", et(), Xy();
        },
        useState: function(e) {
          Te = "useState", et();
          var n = vt.current;
          vt.current = Wl;
          try {
            return rS(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Te = "useDebugValue", et(), n0();
        },
        useDeferredValue: function(e) {
          return Te = "useDeferredValue", et(), ex(e);
        },
        useTransition: function() {
          return Te = "useTransition", et(), rx();
        },
        useMutableSource: function(e, n, l) {
          return Te = "useMutableSource", et(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Te = "useSyncExternalStore", et(), Gy(e, n);
        },
        useId: function() {
          return Te = "useId", et(), i0();
        },
        unstable_isNewReconciler: re
      }, px = {
        readContext: function(e) {
          return Fr(e);
        },
        useCallback: function(e, n) {
          return Te = "useCallback", et(), r0(e, n);
        },
        useContext: function(e) {
          return Te = "useContext", et(), Fr(e);
        },
        useEffect: function(e, n) {
          return Te = "useEffect", et(), Gv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Te = "useImperativeHandle", et(), t0(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Te = "useInsertionEffect", et(), Jy(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Te = "useLayoutEffect", et(), e0(e, n);
        },
        useMemo: function(e, n) {
          Te = "useMemo", et();
          var l = vt.current;
          vt.current = o0;
          try {
            return a0(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Te = "useReducer", et();
          var o = vt.current;
          vt.current = o0;
          try {
            return tS(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return Te = "useRef", et(), Xy();
        },
        useState: function(e) {
          Te = "useState", et();
          var n = vt.current;
          vt.current = o0;
          try {
            return aS(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Te = "useDebugValue", et(), n0();
        },
        useDeferredValue: function(e) {
          return Te = "useDeferredValue", et(), tx(e);
        },
        useTransition: function() {
          return Te = "useTransition", et(), ax();
        },
        useMutableSource: function(e, n, l) {
          return Te = "useMutableSource", et(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Te = "useSyncExternalStore", et(), Gy(e, n);
        },
        useId: function() {
          return Te = "useId", et(), i0();
        },
        unstable_isNewReconciler: re
      }, Uo = {
        readContext: function(e) {
          return vS(), Fr(e);
        },
        useCallback: function(e, n) {
          return Te = "useCallback", Xt(), kn(), uS(e, n);
        },
        useContext: function(e) {
          return Te = "useContext", Xt(), kn(), Fr(e);
        },
        useEffect: function(e, n) {
          return Te = "useEffect", Xt(), kn(), Zy(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Te = "useImperativeHandle", Xt(), kn(), sS(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Te = "useInsertionEffect", Xt(), kn(), lS(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Te = "useLayoutEffect", Xt(), kn(), oS(e, n);
        },
        useMemo: function(e, n) {
          Te = "useMemo", Xt(), kn();
          var l = vt.current;
          vt.current = Uo;
          try {
            return cS(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Te = "useReducer", Xt(), kn();
          var o = vt.current;
          vt.current = Uo;
          try {
            return Jg(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return Te = "useRef", Xt(), kn(), iS(e);
        },
        useState: function(e) {
          Te = "useState", Xt(), kn();
          var n = vt.current;
          vt.current = Uo;
          try {
            return Qy(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Te = "useDebugValue", Xt(), kn(), void 0;
        },
        useDeferredValue: function(e) {
          return Te = "useDeferredValue", Xt(), kn(), fS(e);
        },
        useTransition: function() {
          return Te = "useTransition", Xt(), kn(), dS();
        },
        useMutableSource: function(e, n, l) {
          return Te = "useMutableSource", Xt(), kn(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Te = "useSyncExternalStore", Xt(), kn(), nS(e, n, l);
        },
        useId: function() {
          return Te = "useId", Xt(), kn(), pS();
        },
        unstable_isNewReconciler: re
      }, Wl = {
        readContext: function(e) {
          return vS(), Fr(e);
        },
        useCallback: function(e, n) {
          return Te = "useCallback", Xt(), et(), r0(e, n);
        },
        useContext: function(e) {
          return Te = "useContext", Xt(), et(), Fr(e);
        },
        useEffect: function(e, n) {
          return Te = "useEffect", Xt(), et(), Gv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Te = "useImperativeHandle", Xt(), et(), t0(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Te = "useInsertionEffect", Xt(), et(), Jy(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Te = "useLayoutEffect", Xt(), et(), e0(e, n);
        },
        useMemo: function(e, n) {
          Te = "useMemo", Xt(), et();
          var l = vt.current;
          vt.current = Wl;
          try {
            return a0(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Te = "useReducer", Xt(), et();
          var o = vt.current;
          vt.current = Wl;
          try {
            return eS(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return Te = "useRef", Xt(), et(), Xy();
        },
        useState: function(e) {
          Te = "useState", Xt(), et();
          var n = vt.current;
          vt.current = Wl;
          try {
            return rS(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Te = "useDebugValue", Xt(), et(), n0();
        },
        useDeferredValue: function(e) {
          return Te = "useDeferredValue", Xt(), et(), ex(e);
        },
        useTransition: function() {
          return Te = "useTransition", Xt(), et(), rx();
        },
        useMutableSource: function(e, n, l) {
          return Te = "useMutableSource", Xt(), et(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Te = "useSyncExternalStore", Xt(), et(), Gy(e, n);
        },
        useId: function() {
          return Te = "useId", Xt(), et(), i0();
        },
        unstable_isNewReconciler: re
      }, o0 = {
        readContext: function(e) {
          return vS(), Fr(e);
        },
        useCallback: function(e, n) {
          return Te = "useCallback", Xt(), et(), r0(e, n);
        },
        useContext: function(e) {
          return Te = "useContext", Xt(), et(), Fr(e);
        },
        useEffect: function(e, n) {
          return Te = "useEffect", Xt(), et(), Gv(e, n);
        },
        useImperativeHandle: function(e, n, l) {
          return Te = "useImperativeHandle", Xt(), et(), t0(e, n, l);
        },
        useInsertionEffect: function(e, n) {
          return Te = "useInsertionEffect", Xt(), et(), Jy(e, n);
        },
        useLayoutEffect: function(e, n) {
          return Te = "useLayoutEffect", Xt(), et(), e0(e, n);
        },
        useMemo: function(e, n) {
          Te = "useMemo", Xt(), et();
          var l = vt.current;
          vt.current = Wl;
          try {
            return a0(e, n);
          } finally {
            vt.current = l;
          }
        },
        useReducer: function(e, n, l) {
          Te = "useReducer", Xt(), et();
          var o = vt.current;
          vt.current = Wl;
          try {
            return tS(e, n, l);
          } finally {
            vt.current = o;
          }
        },
        useRef: function(e) {
          return Te = "useRef", Xt(), et(), Xy();
        },
        useState: function(e) {
          Te = "useState", Xt(), et();
          var n = vt.current;
          vt.current = Wl;
          try {
            return aS(e);
          } finally {
            vt.current = n;
          }
        },
        useDebugValue: function(e, n) {
          return Te = "useDebugValue", Xt(), et(), n0();
        },
        useDeferredValue: function(e) {
          return Te = "useDeferredValue", Xt(), et(), tx(e);
        },
        useTransition: function() {
          return Te = "useTransition", Xt(), et(), ax();
        },
        useMutableSource: function(e, n, l) {
          return Te = "useMutableSource", Xt(), et(), void 0;
        },
        useSyncExternalStore: function(e, n, l) {
          return Te = "useSyncExternalStore", Xt(), et(), Gy(e, n);
        },
        useId: function() {
          return Te = "useId", Xt(), et(), i0();
        },
        unstable_isNewReconciler: re
      };
    }
    var Ru = a.unstable_now, vx = 0, s0 = -1, Qv = -1, u0 = -1, hS = !1, c0 = !1;
    function hx() {
      return hS;
    }
    function QM() {
      c0 = !0;
    }
    function XM() {
      hS = !1, c0 = !1;
    }
    function KM() {
      hS = c0, c0 = !1;
    }
    function mx() {
      return vx;
    }
    function yx() {
      vx = Ru();
    }
    function mS(e) {
      Qv = Ru(), e.actualStartTime < 0 && (e.actualStartTime = Ru());
    }
    function gx(e) {
      Qv = -1;
    }
    function f0(e, n) {
      if (Qv >= 0) {
        var l = Ru() - Qv;
        e.actualDuration += l, n && (e.selfBaseDuration = l), Qv = -1;
      }
    }
    function jo(e) {
      if (s0 >= 0) {
        var n = Ru() - s0;
        s0 = -1;
        for (var l = e.return; l !== null; ) {
          switch (l.tag) {
            case b:
              var o = l.stateNode;
              o.effectDuration += n;
              return;
            case $:
              var c = l.stateNode;
              c.effectDuration += n;
              return;
          }
          l = l.return;
        }
      }
    }
    function yS(e) {
      if (u0 >= 0) {
        var n = Ru() - u0;
        u0 = -1;
        for (var l = e.return; l !== null; ) {
          switch (l.tag) {
            case b:
              var o = l.stateNode;
              o !== null && (o.passiveEffectDuration += n);
              return;
            case $:
              var c = l.stateNode;
              c !== null && (c.passiveEffectDuration += n);
              return;
          }
          l = l.return;
        }
      }
    }
    function Fo() {
      s0 = Ru();
    }
    function gS() {
      u0 = Ru();
    }
    function SS(e) {
      for (var n = e.child; n; )
        e.actualDuration += n.actualDuration, n = n.sibling;
    }
    function Bl(e, n) {
      if (e && e.defaultProps) {
        var l = Qt({}, n), o = e.defaultProps;
        for (var c in o)
          l[c] === void 0 && (l[c] = o[c]);
        return l;
      }
      return n;
    }
    var ES = {}, xS, wS, CS, bS, TS, Sx, d0, RS, MS, _S, Xv;
    {
      xS = /* @__PURE__ */ new Set(), wS = /* @__PURE__ */ new Set(), CS = /* @__PURE__ */ new Set(), bS = /* @__PURE__ */ new Set(), RS = /* @__PURE__ */ new Set(), TS = /* @__PURE__ */ new Set(), MS = /* @__PURE__ */ new Set(), _S = /* @__PURE__ */ new Set(), Xv = /* @__PURE__ */ new Set();
      var Ex = /* @__PURE__ */ new Set();
      d0 = function(e, n) {
        if (!(e === null || typeof e == "function")) {
          var l = n + "_" + e;
          Ex.has(l) || (Ex.add(l), v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", n, e));
        }
      }, Sx = function(e, n) {
        if (n === void 0) {
          var l = Sn(e) || "Component";
          TS.has(l) || (TS.add(l), v("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", l));
        }
      }, Object.defineProperty(ES, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(ES);
    }
    function DS(e, n, l, o) {
      var c = e.memoizedState, h = l(o, c);
      {
        if (e.mode & zn) {
          tr(!0);
          try {
            h = l(o, c);
          } finally {
            tr(!1);
          }
        }
        Sx(n, h);
      }
      var E = h == null ? c : Qt({}, c, h);
      if (e.memoizedState = E, e.lanes === Le) {
        var T = e.updateQueue;
        T.baseState = E;
      }
    }
    var kS = {
      isMounted: Sm,
      enqueueSetState: function(e, n, l) {
        var o = tu(e), c = ti(), h = ku(o), E = Ms(c, h);
        E.payload = n, l != null && (d0(l, "setState"), E.callback = l);
        var T = wu(o, E, h);
        T !== null && (Jr(T, o, h, c), Hy(T, o, h)), pc(o, h);
      },
      enqueueReplaceState: function(e, n, l) {
        var o = tu(e), c = ti(), h = ku(o), E = Ms(c, h);
        E.tag = jE, E.payload = n, l != null && (d0(l, "replaceState"), E.callback = l);
        var T = wu(o, E, h);
        T !== null && (Jr(T, o, h, c), Hy(T, o, h)), pc(o, h);
      },
      enqueueForceUpdate: function(e, n) {
        var l = tu(e), o = ti(), c = ku(l), h = Ms(o, c);
        h.tag = Fy, n != null && (d0(n, "forceUpdate"), h.callback = n);
        var E = wu(l, h, c);
        E !== null && (Jr(E, l, c, o), Hy(E, l, c)), Pf(l, c);
      }
    };
    function xx(e, n, l, o, c, h, E) {
      var T = e.stateNode;
      if (typeof T.shouldComponentUpdate == "function") {
        var M = T.shouldComponentUpdate(o, h, E);
        {
          if (e.mode & zn) {
            tr(!0);
            try {
              M = T.shouldComponentUpdate(o, h, E);
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
    function ZM(e, n, l) {
      var o = e.stateNode;
      {
        var c = Sn(n) || "Component", h = o.render;
        h || (n.prototype && typeof n.prototype.render == "function" ? v("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", c) : v("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", c)), o.getInitialState && !o.getInitialState.isReactClassApproved && !o.state && v("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", c), o.getDefaultProps && !o.getDefaultProps.isReactClassApproved && v("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", c), o.propTypes && v("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", c), o.contextType && v("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", c), n.childContextTypes && !Xv.has(n) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & zn) === Lt && (Xv.add(n), v(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), n.contextTypes && !Xv.has(n) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & zn) === Lt && (Xv.add(n), v(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), o.contextTypes && v("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", c), n.contextType && n.contextTypes && !MS.has(n) && (MS.add(n), v("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", c)), typeof o.componentShouldUpdate == "function" && v("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", c), n.prototype && n.prototype.isPureReactComponent && typeof o.shouldComponentUpdate < "u" && v("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Sn(n) || "A pure component"), typeof o.componentDidUnmount == "function" && v("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", c), typeof o.componentDidReceiveProps == "function" && v("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", c), typeof o.componentWillRecieveProps == "function" && v("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", c), typeof o.UNSAFE_componentWillRecieveProps == "function" && v("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", c);
        var E = o.props !== l;
        o.props !== void 0 && E && v("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", c, c), o.defaultProps && v("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", c, c), typeof o.getSnapshotBeforeUpdate == "function" && typeof o.componentDidUpdate != "function" && !CS.has(n) && (CS.add(n), v("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Sn(n))), typeof o.getDerivedStateFromProps == "function" && v("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof o.getDerivedStateFromError == "function" && v("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof n.getSnapshotBeforeUpdate == "function" && v("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", c);
        var T = o.state;
        T && (typeof T != "object" || rn(T)) && v("%s.state: must be set to an object or null", c), typeof o.getChildContext == "function" && typeof n.childContextTypes != "object" && v("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", c);
      }
    }
    function wx(e, n) {
      n.updater = kS, e.stateNode = n, ts(n, e), n._reactInternalInstance = ES;
    }
    function Cx(e, n, l) {
      var o = !1, c = qi, h = qi, E = n.contextType;
      if ("contextType" in n) {
        var T = (
          // Allow null for conditional declaration
          E === null || E !== void 0 && E.$$typeof === W && E._context === void 0
        );
        if (!T && !_S.has(n)) {
          _S.add(n);
          var M = "";
          E === void 0 ? M = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof E != "object" ? M = " However, it is set to a " + typeof E + "." : E.$$typeof === Lr ? M = " Did you accidentally pass the Context.Provider instead?" : E._context !== void 0 ? M = " Did you accidentally pass the Context.Consumer instead?" : M = " However, it is set to an object with keys {" + Object.keys(E).join(", ") + "}.", v("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Sn(n) || "Component", M);
        }
      }
      if (typeof E == "object" && E !== null)
        h = Fr(E);
      else {
        c = _d(e, n, !0);
        var z = n.contextTypes;
        o = z != null, h = o ? Dd(e, c) : qi;
      }
      var N = new n(l, h);
      if (e.mode & zn) {
        tr(!0);
        try {
          N = new n(l, h);
        } finally {
          tr(!1);
        }
      }
      var te = e.memoizedState = N.state !== null && N.state !== void 0 ? N.state : null;
      wx(e, N);
      {
        if (typeof n.getDerivedStateFromProps == "function" && te === null) {
          var J = Sn(n) || "Component";
          wS.has(J) || (wS.add(J), v("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", J, N.state === null ? "null" : "undefined", J));
        }
        if (typeof n.getDerivedStateFromProps == "function" || typeof N.getSnapshotBeforeUpdate == "function") {
          var ve = null, ge = null, xe = null;
          if (typeof N.componentWillMount == "function" && N.componentWillMount.__suppressDeprecationWarning !== !0 ? ve = "componentWillMount" : typeof N.UNSAFE_componentWillMount == "function" && (ve = "UNSAFE_componentWillMount"), typeof N.componentWillReceiveProps == "function" && N.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? ge = "componentWillReceiveProps" : typeof N.UNSAFE_componentWillReceiveProps == "function" && (ge = "UNSAFE_componentWillReceiveProps"), typeof N.componentWillUpdate == "function" && N.componentWillUpdate.__suppressDeprecationWarning !== !0 ? xe = "componentWillUpdate" : typeof N.UNSAFE_componentWillUpdate == "function" && (xe = "UNSAFE_componentWillUpdate"), ve !== null || ge !== null || xe !== null) {
            var lt = Sn(n) || "Component", Nt = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            bS.has(lt) || (bS.add(lt), v(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, lt, Nt, ve !== null ? `
  ` + ve : "", ge !== null ? `
  ` + ge : "", xe !== null ? `
  ` + xe : ""));
          }
        }
      }
      return o && dE(e, c, h), N;
    }
    function JM(e, n) {
      var l = n.state;
      typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), l !== n.state && (v("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Bt(e) || "Component"), kS.enqueueReplaceState(n, n.state, null));
    }
    function bx(e, n, l, o) {
      var c = n.state;
      if (typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(l, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(l, o), n.state !== c) {
        {
          var h = Bt(e) || "Component";
          xS.has(h) || (xS.add(h), v("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", h));
        }
        kS.enqueueReplaceState(n, n.state, null);
      }
    }
    function OS(e, n, l, o) {
      ZM(e, n, l);
      var c = e.stateNode;
      c.props = l, c.state = e.memoizedState, c.refs = {}, $g(e);
      var h = n.contextType;
      if (typeof h == "object" && h !== null)
        c.context = Fr(h);
      else {
        var E = _d(e, n, !0);
        c.context = Dd(e, E);
      }
      {
        if (c.state === l) {
          var T = Sn(n) || "Component";
          RS.has(T) || (RS.add(T), v("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", T));
        }
        e.mode & zn && ql.recordLegacyContextWarning(e, c), ql.recordUnsafeLifecycleWarnings(e, c);
      }
      c.state = e.memoizedState;
      var M = n.getDerivedStateFromProps;
      if (typeof M == "function" && (DS(e, n, M, l), c.state = e.memoizedState), typeof n.getDerivedStateFromProps != "function" && typeof c.getSnapshotBeforeUpdate != "function" && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (JM(e, c), Vy(e, l, c, o), c.state = e.memoizedState), typeof c.componentDidMount == "function") {
        var z = pn;
        z |= Ll, (e.mode & Tn) !== Lt && (z |= mo), e.flags |= z;
      }
    }
    function e_(e, n, l, o) {
      var c = e.stateNode, h = e.memoizedProps;
      c.props = h;
      var E = c.context, T = n.contextType, M = qi;
      if (typeof T == "object" && T !== null)
        M = Fr(T);
      else {
        var z = _d(e, n, !0);
        M = Dd(e, z);
      }
      var N = n.getDerivedStateFromProps, te = typeof N == "function" || typeof c.getSnapshotBeforeUpdate == "function";
      !te && (typeof c.UNSAFE_componentWillReceiveProps == "function" || typeof c.componentWillReceiveProps == "function") && (h !== l || E !== M) && bx(e, c, l, M), PE();
      var J = e.memoizedState, ve = c.state = J;
      if (Vy(e, l, c, o), ve = e.memoizedState, h === l && J === ve && !Cy() && !Iy()) {
        if (typeof c.componentDidMount == "function") {
          var ge = pn;
          ge |= Ll, (e.mode & Tn) !== Lt && (ge |= mo), e.flags |= ge;
        }
        return !1;
      }
      typeof N == "function" && (DS(e, n, N, l), ve = e.memoizedState);
      var xe = Iy() || xx(e, n, h, l, J, ve, M);
      if (xe) {
        if (!te && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function") {
          var lt = pn;
          lt |= Ll, (e.mode & Tn) !== Lt && (lt |= mo), e.flags |= lt;
        }
      } else {
        if (typeof c.componentDidMount == "function") {
          var Nt = pn;
          Nt |= Ll, (e.mode & Tn) !== Lt && (Nt |= mo), e.flags |= Nt;
        }
        e.memoizedProps = l, e.memoizedState = ve;
      }
      return c.props = l, c.state = ve, c.context = M, xe;
    }
    function t_(e, n, l, o, c) {
      var h = n.stateNode;
      FE(e, n);
      var E = n.memoizedProps, T = n.type === n.elementType ? E : Bl(n.type, E);
      h.props = T;
      var M = n.pendingProps, z = h.context, N = l.contextType, te = qi;
      if (typeof N == "object" && N !== null)
        te = Fr(N);
      else {
        var J = _d(n, l, !0);
        te = Dd(n, J);
      }
      var ve = l.getDerivedStateFromProps, ge = typeof ve == "function" || typeof h.getSnapshotBeforeUpdate == "function";
      !ge && (typeof h.UNSAFE_componentWillReceiveProps == "function" || typeof h.componentWillReceiveProps == "function") && (E !== M || z !== te) && bx(n, h, o, te), PE();
      var xe = n.memoizedState, lt = h.state = xe;
      if (Vy(n, o, h, c), lt = n.memoizedState, E === M && xe === lt && !Cy() && !Iy() && !ue)
        return typeof h.componentDidUpdate == "function" && (E !== e.memoizedProps || xe !== e.memoizedState) && (n.flags |= pn), typeof h.getSnapshotBeforeUpdate == "function" && (E !== e.memoizedProps || xe !== e.memoizedState) && (n.flags |= _r), !1;
      typeof ve == "function" && (DS(n, l, ve, o), lt = n.memoizedState);
      var Nt = Iy() || xx(n, l, T, o, xe, lt, te) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      ue;
      return Nt ? (!ge && (typeof h.UNSAFE_componentWillUpdate == "function" || typeof h.componentWillUpdate == "function") && (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, lt, te), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(o, lt, te)), typeof h.componentDidUpdate == "function" && (n.flags |= pn), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= _r)) : (typeof h.componentDidUpdate == "function" && (E !== e.memoizedProps || xe !== e.memoizedState) && (n.flags |= pn), typeof h.getSnapshotBeforeUpdate == "function" && (E !== e.memoizedProps || xe !== e.memoizedState) && (n.flags |= _r), n.memoizedProps = o, n.memoizedState = lt), h.props = o, h.state = lt, h.context = te, Nt;
    }
    function Zc(e, n) {
      return {
        value: e,
        source: n,
        stack: Ml(n),
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
    function n_(e, n) {
      return !0;
    }
    function LS(e, n) {
      try {
        var l = n_(e, n);
        if (l === !1)
          return;
        var o = n.value, c = n.source, h = n.stack, E = h !== null ? h : "";
        if (o != null && o._suppressLogging) {
          if (e.tag === x)
            return;
          console.error(o);
        }
        var T = c ? Bt(c) : null, M = T ? "The above error occurred in the <" + T + "> component:" : "The above error occurred in one of your React components:", z;
        if (e.tag === b)
          z = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var N = Bt(e) || "Anonymous";
          z = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + N + ".");
        }
        var te = M + `
` + E + `

` + ("" + z);
        console.error(te);
      } catch (J) {
        setTimeout(function() {
          throw J;
        });
      }
    }
    var r_ = typeof WeakMap == "function" ? WeakMap : Map;
    function Tx(e, n, l) {
      var o = Ms(jn, l);
      o.tag = Fg, o.payload = {
        element: null
      };
      var c = n.value;
      return o.callback = function() {
        QD(c), LS(e, n);
      }, o;
    }
    function zS(e, n, l) {
      var o = Ms(jn, l);
      o.tag = Fg;
      var c = e.type.getDerivedStateFromError;
      if (typeof c == "function") {
        var h = n.value;
        o.payload = function() {
          return c(h);
        }, o.callback = function() {
          Uw(e), LS(e, n);
        };
      }
      var E = e.stateNode;
      return E !== null && typeof E.componentDidCatch == "function" && (o.callback = function() {
        Uw(e), LS(e, n), typeof c != "function" && BD(this);
        var M = n.value, z = n.stack;
        this.componentDidCatch(M, {
          componentStack: z !== null ? z : ""
        }), typeof c != "function" && (Ua(e.lanes, Ht) || v("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Bt(e) || "Unknown"));
      }), o;
    }
    function Rx(e, n, l) {
      var o = e.pingCache, c;
      if (o === null ? (o = e.pingCache = new r_(), c = /* @__PURE__ */ new Set(), o.set(n, c)) : (c = o.get(n), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(n, c))), !c.has(l)) {
        c.add(l);
        var h = XD.bind(null, e, n, l);
        za && ph(e, l), n.then(h, h);
      }
    }
    function a_(e, n, l, o) {
      var c = e.updateQueue;
      if (c === null) {
        var h = /* @__PURE__ */ new Set();
        h.add(l), e.updateQueue = h;
      } else
        c.add(l);
    }
    function i_(e, n) {
      var l = e.tag;
      if ((e.mode & ln) === Lt && (l === g || l === H || l === B)) {
        var o = e.alternate;
        o ? (e.updateQueue = o.updateQueue, e.memoizedState = o.memoizedState, e.lanes = o.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function Mx(e) {
      var n = e;
      do {
        if (n.tag === V && PM(n))
          return n;
        n = n.return;
      } while (n !== null);
      return null;
    }
    function _x(e, n, l, o, c) {
      if ((e.mode & ln) === Lt) {
        if (e === n)
          e.flags |= zr;
        else {
          if (e.flags |= kt, l.flags |= Of, l.flags &= -52805, l.tag === x) {
            var h = l.alternate;
            if (h === null)
              l.tag = X;
            else {
              var E = Ms(jn, Ht);
              E.tag = Fy, wu(l, E, Ht);
            }
          }
          l.lanes = en(l.lanes, Ht);
        }
        return e;
      }
      return e.flags |= zr, e.lanes = c, e;
    }
    function l_(e, n, l, o, c) {
      if (l.flags |= oc, za && ph(e, c), o !== null && typeof o == "object" && typeof o.then == "function") {
        var h = o;
        i_(l), ga() && l.mode & ln && SE();
        var E = Mx(n);
        if (E !== null) {
          E.flags &= ~ea, _x(E, n, l, e, c), E.mode & ln && Rx(e, h, c), a_(E, e, h);
          return;
        } else {
          if (!Mm(c)) {
            Rx(e, h, c), p2();
            return;
          }
          var T = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          o = T;
        }
      } else if (ga() && l.mode & ln) {
        SE();
        var M = Mx(n);
        if (M !== null) {
          (M.flags & zr) === At && (M.flags |= ea), _x(M, n, l, e, c), Rg(Zc(o, l));
          return;
        }
      }
      o = Zc(o, l), PD(o);
      var z = n;
      do {
        switch (z.tag) {
          case b: {
            var N = o;
            z.flags |= zr;
            var te = wc(c);
            z.lanes = en(z.lanes, te);
            var J = Tx(z, N, te);
            Hg(z, J);
            return;
          }
          case x:
            var ve = o, ge = z.type, xe = z.stateNode;
            if ((z.flags & kt) === At && (typeof ge.getDerivedStateFromError == "function" || xe !== null && typeof xe.componentDidCatch == "function" && !Mw(xe))) {
              z.flags |= zr;
              var lt = wc(c);
              z.lanes = en(z.lanes, lt);
              var Nt = zS(z, ve, lt);
              Hg(z, Nt);
              return;
            }
            break;
        }
        z = z.return;
      } while (z !== null);
    }
    function o_() {
      return null;
    }
    var Kv = s.ReactCurrentOwner, Gl = !1, NS, Zv, US, jS, FS, Jc, PS, p0, Jv;
    NS = {}, Zv = {}, US = {}, jS = {}, FS = {}, Jc = !1, PS = {}, p0 = {}, Jv = {};
    function Ja(e, n, l, o) {
      e === null ? n.child = OE(n, null, l, o) : n.child = Ld(n, e.child, l, o);
    }
    function s_(e, n, l, o) {
      n.child = Ld(n, e.child, null, o), n.child = Ld(n, null, l, o);
    }
    function Dx(e, n, l, o, c) {
      if (n.type !== n.elementType) {
        var h = l.propTypes;
        h && Vl(
          h,
          o,
          // Resolved props
          "prop",
          Sn(l)
        );
      }
      var E = l.render, T = n.ref, M, z;
      Nd(n, c), Qa(n);
      {
        if (Kv.current = n, Mr(!0), M = Hd(e, n, E, o, T, c), z = Vd(), n.mode & zn) {
          tr(!0);
          try {
            M = Hd(e, n, E, o, T, c), z = Vd();
          } finally {
            tr(!1);
          }
        }
        Mr(!1);
      }
      return Xa(), e !== null && !Gl ? (YE(e, n, c), _s(e, n, c)) : (ga() && z && Eg(n), n.flags |= Pi, Ja(e, n, M, c), n.child);
    }
    function kx(e, n, l, o, c) {
      if (e === null) {
        var h = l.type;
        if (pk(h) && l.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        l.defaultProps === void 0) {
          var E = h;
          return E = Xd(h), n.tag = B, n.type = E, VS(n, h), Ox(e, n, E, o, c);
        }
        {
          var T = h.propTypes;
          if (T && Vl(
            T,
            o,
            // Resolved props
            "prop",
            Sn(h)
          ), l.defaultProps !== void 0) {
            var M = Sn(h) || "Unknown";
            Jv[M] || (v("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", M), Jv[M] = !0);
          }
        }
        var z = b2(l.type, null, o, n, n.mode, c);
        return z.ref = n.ref, z.return = n, n.child = z, z;
      }
      {
        var N = l.type, te = N.propTypes;
        te && Vl(
          te,
          o,
          // Resolved props
          "prop",
          Sn(N)
        );
      }
      var J = e.child, ve = GS(e, c);
      if (!ve) {
        var ge = J.memoizedProps, xe = l.compare;
        if (xe = xe !== null ? xe : wt, xe(ge, o) && e.ref === n.ref)
          return _s(e, n, c);
      }
      n.flags |= Pi;
      var lt = af(J, o);
      return lt.ref = n.ref, lt.return = n, n.child = lt, lt;
    }
    function Ox(e, n, l, o, c) {
      if (n.type !== n.elementType) {
        var h = n.elementType;
        if (h.$$typeof === Vt) {
          var E = h, T = E._payload, M = E._init;
          try {
            h = M(T);
          } catch {
            h = null;
          }
          var z = h && h.propTypes;
          z && Vl(
            z,
            o,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Sn(h)
          );
        }
      }
      if (e !== null) {
        var N = e.memoizedProps;
        if (wt(N, o) && e.ref === n.ref && // Prevent bailout if the implementation changed due to hot reload.
        n.type === e.type)
          if (Gl = !1, n.pendingProps = o = N, GS(e, c))
            (e.flags & Of) !== At && (Gl = !0);
          else return n.lanes = e.lanes, _s(e, n, c);
      }
      return $S(e, n, l, o, c);
    }
    function Ax(e, n, l) {
      var o = n.pendingProps, c = o.children, h = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden" || ye)
        if ((n.mode & ln) === Lt) {
          var E = {
            baseLanes: Le,
            cachePool: null,
            transitions: null
          };
          n.memoizedState = E, R0(n, l);
        } else if (Ua(l, Na)) {
          var te = {
            baseLanes: Le,
            cachePool: null,
            transitions: null
          };
          n.memoizedState = te;
          var J = h !== null ? h.baseLanes : l;
          R0(n, J);
        } else {
          var T = null, M;
          if (h !== null) {
            var z = h.baseLanes;
            M = en(z, l);
          } else
            M = l;
          n.lanes = n.childLanes = Na;
          var N = {
            baseLanes: M,
            cachePool: T,
            transitions: null
          };
          return n.memoizedState = N, n.updateQueue = null, R0(n, M), null;
        }
      else {
        var ve;
        h !== null ? (ve = en(h.baseLanes, l), n.memoizedState = null) : ve = l, R0(n, ve);
      }
      return Ja(e, n, c, l), n.child;
    }
    function u_(e, n, l) {
      var o = n.pendingProps;
      return Ja(e, n, o, l), n.child;
    }
    function c_(e, n, l) {
      var o = n.pendingProps.children;
      return Ja(e, n, o, l), n.child;
    }
    function f_(e, n, l) {
      {
        n.flags |= pn;
        {
          var o = n.stateNode;
          o.effectDuration = 0, o.passiveEffectDuration = 0;
        }
      }
      var c = n.pendingProps, h = c.children;
      return Ja(e, n, h, l), n.child;
    }
    function Lx(e, n) {
      var l = n.ref;
      (e === null && l !== null || e !== null && e.ref !== l) && (n.flags |= ir, n.flags |= ru);
    }
    function $S(e, n, l, o, c) {
      if (n.type !== n.elementType) {
        var h = l.propTypes;
        h && Vl(
          h,
          o,
          // Resolved props
          "prop",
          Sn(l)
        );
      }
      var E;
      {
        var T = _d(n, l, !0);
        E = Dd(n, T);
      }
      var M, z;
      Nd(n, c), Qa(n);
      {
        if (Kv.current = n, Mr(!0), M = Hd(e, n, l, o, E, c), z = Vd(), n.mode & zn) {
          tr(!0);
          try {
            M = Hd(e, n, l, o, E, c), z = Vd();
          } finally {
            tr(!1);
          }
        }
        Mr(!1);
      }
      return Xa(), e !== null && !Gl ? (YE(e, n, c), _s(e, n, c)) : (ga() && z && Eg(n), n.flags |= Pi, Ja(e, n, M, c), n.child);
    }
    function zx(e, n, l, o, c) {
      {
        switch (_k(n)) {
          case !1: {
            var h = n.stateNode, E = n.type, T = new E(n.memoizedProps, h.context), M = T.state;
            h.updater.enqueueSetState(h, M, null);
            break;
          }
          case !0: {
            n.flags |= kt, n.flags |= zr;
            var z = new Error("Simulated error coming from DevTools"), N = wc(c);
            n.lanes = en(n.lanes, N);
            var te = zS(n, Zc(z, n), N);
            Hg(n, te);
            break;
          }
        }
        if (n.type !== n.elementType) {
          var J = l.propTypes;
          J && Vl(
            J,
            o,
            // Resolved props
            "prop",
            Sn(l)
          );
        }
      }
      var ve;
      Lo(l) ? (ve = !0, Ty(n)) : ve = !1, Nd(n, c);
      var ge = n.stateNode, xe;
      ge === null ? (h0(e, n), Cx(n, l, o), OS(n, l, o, c), xe = !0) : e === null ? xe = e_(n, l, o, c) : xe = t_(e, n, l, o, c);
      var lt = HS(e, n, l, xe, ve, c);
      {
        var Nt = n.stateNode;
        xe && Nt.props !== o && (Jc || v("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Bt(n) || "a component"), Jc = !0);
      }
      return lt;
    }
    function HS(e, n, l, o, c, h) {
      Lx(e, n);
      var E = (n.flags & kt) !== At;
      if (!o && !E)
        return c && hE(n, l, !1), _s(e, n, h);
      var T = n.stateNode;
      Kv.current = n;
      var M;
      if (E && typeof l.getDerivedStateFromError != "function")
        M = null, gx();
      else {
        Qa(n);
        {
          if (Mr(!0), M = T.render(), n.mode & zn) {
            tr(!0);
            try {
              T.render();
            } finally {
              tr(!1);
            }
          }
          Mr(!1);
        }
        Xa();
      }
      return n.flags |= Pi, e !== null && E ? s_(e, n, M, h) : Ja(e, n, M, h), n.memoizedState = T.state, c && hE(n, l, !0), n.child;
    }
    function Nx(e) {
      var n = e.stateNode;
      n.pendingContext ? pE(e, n.pendingContext, n.pendingContext !== n.context) : n.context && pE(e, n.context, !1), Vg(e, n.containerInfo);
    }
    function d_(e, n, l) {
      if (Nx(n), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var o = n.pendingProps, c = n.memoizedState, h = c.element;
      FE(e, n), Vy(n, o, null, l);
      var E = n.memoizedState;
      n.stateNode;
      var T = E.element;
      if (c.isDehydrated) {
        var M = {
          element: T,
          isDehydrated: !1,
          cache: E.cache,
          pendingSuspenseBoundaries: E.pendingSuspenseBoundaries,
          transitions: E.transitions
        }, z = n.updateQueue;
        if (z.baseState = M, n.memoizedState = M, n.flags & ea) {
          var N = Zc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), n);
          return Ux(e, n, T, l, N);
        } else if (T !== h) {
          var te = Zc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), n);
          return Ux(e, n, T, l, te);
        } else {
          hM(n);
          var J = OE(n, null, T, l);
          n.child = J;
          for (var ve = J; ve; )
            ve.flags = ve.flags & ~er | Oa, ve = ve.sibling;
        }
      } else {
        if (Ad(), T === h)
          return _s(e, n, l);
        Ja(e, n, T, l);
      }
      return n.child;
    }
    function Ux(e, n, l, o, c) {
      return Ad(), Rg(c), n.flags |= ea, Ja(e, n, l, o), n.child;
    }
    function p_(e, n, l) {
      VE(n), e === null && Tg(n);
      var o = n.type, c = n.pendingProps, h = e !== null ? e.memoizedProps : null, E = c.children, T = lg(o, c);
      return T ? E = null : h !== null && lg(o, h) && (n.flags |= fi), Lx(e, n), Ja(e, n, E, l), n.child;
    }
    function v_(e, n) {
      return e === null && Tg(n), null;
    }
    function h_(e, n, l, o) {
      h0(e, n);
      var c = n.pendingProps, h = l, E = h._payload, T = h._init, M = T(E);
      n.type = M;
      var z = n.tag = vk(M), N = Bl(M, c), te;
      switch (z) {
        case g:
          return VS(n, M), n.type = M = Xd(M), te = $S(null, n, M, N, o), te;
        case x:
          return n.type = M = g2(M), te = zx(null, n, M, N, o), te;
        case H:
          return n.type = M = S2(M), te = Dx(null, n, M, N, o), te;
        case F: {
          if (n.type !== n.elementType) {
            var J = M.propTypes;
            J && Vl(
              J,
              N,
              // Resolved for outer only
              "prop",
              Sn(M)
            );
          }
          return te = kx(
            null,
            n,
            M,
            Bl(M.type, N),
            // The inner type can have defaults too
            o
          ), te;
        }
      }
      var ve = "";
      throw M !== null && typeof M == "object" && M.$$typeof === Vt && (ve = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + M + ". " + ("Lazy element type must resolve to a class or function." + ve));
    }
    function m_(e, n, l, o, c) {
      h0(e, n), n.tag = x;
      var h;
      return Lo(l) ? (h = !0, Ty(n)) : h = !1, Nd(n, c), Cx(n, l, o), OS(n, l, o, c), HS(null, n, l, !0, h, c);
    }
    function y_(e, n, l, o) {
      h0(e, n);
      var c = n.pendingProps, h;
      {
        var E = _d(n, l, !1);
        h = Dd(n, E);
      }
      Nd(n, o);
      var T, M;
      Qa(n);
      {
        if (l.prototype && typeof l.prototype.render == "function") {
          var z = Sn(l) || "Unknown";
          NS[z] || (v("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", z, z), NS[z] = !0);
        }
        n.mode & zn && ql.recordLegacyContextWarning(n, null), Mr(!0), Kv.current = n, T = Hd(null, n, l, c, h, o), M = Vd(), Mr(!1);
      }
      if (Xa(), n.flags |= Pi, typeof T == "object" && T !== null && typeof T.render == "function" && T.$$typeof === void 0) {
        var N = Sn(l) || "Unknown";
        Zv[N] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", N, N, N), Zv[N] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof T == "object" && T !== null && typeof T.render == "function" && T.$$typeof === void 0
      ) {
        {
          var te = Sn(l) || "Unknown";
          Zv[te] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", te, te, te), Zv[te] = !0);
        }
        n.tag = x, n.memoizedState = null, n.updateQueue = null;
        var J = !1;
        return Lo(l) ? (J = !0, Ty(n)) : J = !1, n.memoizedState = T.state !== null && T.state !== void 0 ? T.state : null, $g(n), wx(n, T), OS(n, l, c, o), HS(null, n, l, !0, J, o);
      } else {
        if (n.tag = g, n.mode & zn) {
          tr(!0);
          try {
            T = Hd(null, n, l, c, h, o), M = Vd();
          } finally {
            tr(!1);
          }
        }
        return ga() && M && Eg(n), Ja(null, n, T, o), VS(n, l), n.child;
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
          var E = Sn(n) || "Unknown";
          Jv[E] || (v("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", E), Jv[E] = !0);
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
        cachePool: o_(),
        transitions: null
      };
    }
    function g_(e, n) {
      var l = null;
      return {
        baseLanes: en(e.baseLanes, n),
        cachePool: l,
        transitions: e.transitions
      };
    }
    function S_(e, n, l, o) {
      if (n !== null) {
        var c = n.memoizedState;
        if (c === null)
          return !1;
      }
      return Yg(e, Vv);
    }
    function E_(e, n) {
      return Cc(e.childLanes, n);
    }
    function jx(e, n, l) {
      var o = n.pendingProps;
      Dk(n) && (n.flags |= kt);
      var c = Yl.current, h = !1, E = (n.flags & kt) !== At;
      if (E || S_(c, e) ? (h = !0, n.flags &= ~kt) : (e === null || e.memoizedState !== null) && (c = FM(c, qE)), c = jd(c), bu(n, c), e === null) {
        Tg(n);
        var T = n.memoizedState;
        if (T !== null) {
          var M = T.dehydrated;
          if (M !== null)
            return T_(n, M);
        }
        var z = o.children, N = o.fallback;
        if (h) {
          var te = x_(n, z, N, l), J = n.child;
          return J.memoizedState = qS(l), n.memoizedState = IS, te;
        } else
          return YS(n, z);
      } else {
        var ve = e.memoizedState;
        if (ve !== null) {
          var ge = ve.dehydrated;
          if (ge !== null)
            return R_(e, n, E, o, ge, ve, l);
        }
        if (h) {
          var xe = o.fallback, lt = o.children, Nt = C_(e, n, lt, xe, l), _t = n.child, mn = e.child.memoizedState;
          return _t.memoizedState = mn === null ? qS(l) : g_(mn, l), _t.childLanes = E_(e, l), n.memoizedState = IS, Nt;
        } else {
          var fn = o.children, ce = w_(e, n, fn, l);
          return n.memoizedState = null, ce;
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
    function x_(e, n, l, o) {
      var c = e.mode, h = e.child, E = {
        mode: "hidden",
        children: n
      }, T, M;
      return (c & ln) === Lt && h !== null ? (T = h, T.childLanes = Le, T.pendingProps = E, e.mode & bn && (T.actualDuration = 0, T.actualStartTime = -1, T.selfBaseDuration = 0, T.treeBaseDuration = 0), M = Au(l, c, o, null)) : (T = WS(E, c), M = Au(l, c, o, null)), T.return = e, M.return = e, T.sibling = M, e.child = T, M;
    }
    function WS(e, n, l) {
      return Fw(e, n, Le, null);
    }
    function Fx(e, n) {
      return af(e, n);
    }
    function w_(e, n, l, o) {
      var c = e.child, h = c.sibling, E = Fx(c, {
        mode: "visible",
        children: l
      });
      if ((n.mode & ln) === Lt && (E.lanes = o), E.return = n, E.sibling = null, h !== null) {
        var T = n.deletions;
        T === null ? (n.deletions = [h], n.flags |= ci) : T.push(h);
      }
      return n.child = E, E;
    }
    function C_(e, n, l, o, c) {
      var h = n.mode, E = e.child, T = E.sibling, M = {
        mode: "hidden",
        children: l
      }, z;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (h & ln) === Lt && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        n.child !== E
      ) {
        var N = n.child;
        z = N, z.childLanes = Le, z.pendingProps = M, n.mode & bn && (z.actualDuration = 0, z.actualStartTime = -1, z.selfBaseDuration = E.selfBaseDuration, z.treeBaseDuration = E.treeBaseDuration), n.deletions = null;
      } else
        z = Fx(E, M), z.subtreeFlags = E.subtreeFlags & yr;
      var te;
      return T !== null ? te = af(T, o) : (te = Au(o, h, c, null), te.flags |= er), te.return = n, z.return = n, z.sibling = te, n.child = z, te;
    }
    function v0(e, n, l, o) {
      o !== null && Rg(o), Ld(n, e.child, null, l);
      var c = n.pendingProps, h = c.children, E = YS(n, h);
      return E.flags |= er, n.memoizedState = null, E;
    }
    function b_(e, n, l, o, c) {
      var h = n.mode, E = {
        mode: "visible",
        children: l
      }, T = WS(E, h), M = Au(o, h, c, null);
      return M.flags |= er, T.return = n, M.return = n, T.sibling = M, n.child = T, (n.mode & ln) !== Lt && Ld(n, e.child, null, c), M;
    }
    function T_(e, n, l) {
      return (e.mode & ln) === Lt ? (v("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ht) : cg(n) ? e.lanes = ta : e.lanes = Na, null;
    }
    function R_(e, n, l, o, c, h, E) {
      if (l)
        if (n.flags & ea) {
          n.flags &= ~ea;
          var ce = AS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return v0(e, n, E, ce);
        } else {
          if (n.memoizedState !== null)
            return n.child = e.child, n.flags |= kt, null;
          var we = o.children, fe = o.fallback, qe = b_(e, n, we, fe, E), mt = n.child;
          return mt.memoizedState = qS(E), n.memoizedState = IS, qe;
        }
      else {
        if (pM(), (n.mode & ln) === Lt)
          return v0(
            e,
            n,
            E,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (cg(c)) {
          var T, M, z;
          {
            var N = kR(c);
            T = N.digest, M = N.message, z = N.stack;
          }
          var te;
          M ? te = new Error(M) : te = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var J = AS(te, T, z);
          return v0(e, n, E, J);
        }
        var ve = Ua(E, e.childLanes);
        if (Gl || ve) {
          var ge = T0();
          if (ge !== null) {
            var xe = nv(ge, E);
            if (xe !== wn && xe !== h.retryLane) {
              h.retryLane = xe;
              var lt = jn;
              Ei(e, xe), Jr(ge, e, xe, lt);
            }
          }
          p2();
          var Nt = AS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return v0(e, n, E, Nt);
        } else if (oE(c)) {
          n.flags |= kt, n.child = e.child;
          var _t = KD.bind(null, e);
          return OR(c, _t), null;
        } else {
          mM(n, c, h.treeContext);
          var mn = o.children, fn = YS(n, mn);
          return fn.flags |= Oa, fn;
        }
      }
    }
    function Px(e, n, l) {
      e.lanes = en(e.lanes, n);
      var o = e.alternate;
      o !== null && (o.lanes = en(o.lanes, n)), Ug(e.return, n, l);
    }
    function M_(e, n, l) {
      for (var o = n; o !== null; ) {
        if (o.tag === V) {
          var c = o.memoizedState;
          c !== null && Px(o, l, e);
        } else if (o.tag === ne)
          Px(o, l, e);
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
    function __(e) {
      for (var n = e, l = null; n !== null; ) {
        var o = n.alternate;
        o !== null && Wy(o) === null && (l = n), n = n.sibling;
      }
      return l;
    }
    function D_(e) {
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
    function k_(e, n) {
      e !== void 0 && !p0[e] && (e !== "collapsed" && e !== "hidden" ? (p0[e] = !0, v('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : n !== "forwards" && n !== "backwards" && (p0[e] = !0, v('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function $x(e, n) {
      {
        var l = rn(e), o = !l && typeof Yt(e) == "function";
        if (l || o) {
          var c = l ? "array" : "iterable";
          return v("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", c, n, c), !1;
        }
      }
      return !0;
    }
    function O_(e, n) {
      if ((n === "forwards" || n === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (rn(e)) {
          for (var l = 0; l < e.length; l++)
            if (!$x(e[l], l))
              return;
        } else {
          var o = Yt(e);
          if (typeof o == "function") {
            var c = o.call(e);
            if (c)
              for (var h = c.next(), E = 0; !h.done; h = c.next()) {
                if (!$x(h.value, E))
                  return;
                E++;
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
    function Hx(e, n, l) {
      var o = n.pendingProps, c = o.revealOrder, h = o.tail, E = o.children;
      D_(c), k_(h, c), O_(E, c), Ja(e, n, E, l);
      var T = Yl.current, M = Yg(T, Vv);
      if (M)
        T = Wg(T, Vv), n.flags |= kt;
      else {
        var z = e !== null && (e.flags & kt) !== At;
        z && M_(n, n.child, l), T = jd(T);
      }
      if (bu(n, T), (n.mode & ln) === Lt)
        n.memoizedState = null;
      else
        switch (c) {
          case "forwards": {
            var N = __(n.child), te;
            N === null ? (te = n.child, n.child = null) : (te = N.sibling, N.sibling = null), BS(
              n,
              !1,
              // isBackwards
              te,
              N,
              h
            );
            break;
          }
          case "backwards": {
            var J = null, ve = n.child;
            for (n.child = null; ve !== null; ) {
              var ge = ve.alternate;
              if (ge !== null && Wy(ge) === null) {
                n.child = ve;
                break;
              }
              var xe = ve.sibling;
              ve.sibling = J, J = ve, ve = xe;
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
    function A_(e, n, l) {
      Vg(n, n.stateNode.containerInfo);
      var o = n.pendingProps;
      return e === null ? n.child = Ld(n, null, o, l) : Ja(e, n, o, l), n.child;
    }
    var Vx = !1;
    function L_(e, n, l) {
      var o = n.type, c = o._context, h = n.pendingProps, E = n.memoizedProps, T = h.value;
      {
        "value" in h || Vx || (Vx = !0, v("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var M = n.type.propTypes;
        M && Vl(M, h, "prop", "Context.Provider");
      }
      if (zE(n, c, T), E !== null) {
        var z = E.value;
        if (je(z, T)) {
          if (E.children === h.children && !Cy())
            return _s(e, n, l);
        } else
          DM(n, c, l);
      }
      var N = h.children;
      return Ja(e, n, N, l), n.child;
    }
    var Ix = !1;
    function z_(e, n, l) {
      var o = n.type;
      o._context === void 0 ? o !== o.Consumer && (Ix || (Ix = !0, v("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : o = o._context;
      var c = n.pendingProps, h = c.children;
      typeof h != "function" && v("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Nd(n, l);
      var E = Fr(o);
      Qa(n);
      var T;
      return Kv.current = n, Mr(!0), T = h(E), Mr(!1), Xa(), n.flags |= Pi, Ja(e, n, T, l), n.child;
    }
    function eh() {
      Gl = !0;
    }
    function h0(e, n) {
      (n.mode & ln) === Lt && e !== null && (e.alternate = null, n.alternate = null, n.flags |= er);
    }
    function _s(e, n, l) {
      return e !== null && (n.dependencies = e.dependencies), gx(), dh(n.lanes), Ua(l, n.childLanes) ? (MM(e, n), n.child) : null;
    }
    function N_(e, n, l) {
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
        return h === null ? (o.deletions = [e], o.flags |= ci) : h.push(e), l.flags |= er, l;
      }
    }
    function GS(e, n) {
      var l = e.lanes;
      return !!Ua(l, n);
    }
    function U_(e, n, l) {
      switch (n.tag) {
        case b:
          Nx(n), n.stateNode, Ad();
          break;
        case D:
          VE(n);
          break;
        case x: {
          var o = n.type;
          Lo(o) && Ty(n);
          break;
        }
        case R:
          Vg(n, n.stateNode.containerInfo);
          break;
        case q: {
          var c = n.memoizedProps.value, h = n.type._context;
          zE(n, h, c);
          break;
        }
        case $:
          {
            var E = Ua(l, n.childLanes);
            E && (n.flags |= pn);
            {
              var T = n.stateNode;
              T.effectDuration = 0, T.passiveEffectDuration = 0;
            }
          }
          break;
        case V: {
          var M = n.memoizedState;
          if (M !== null) {
            if (M.dehydrated !== null)
              return bu(n, jd(Yl.current)), n.flags |= kt, null;
            var z = n.child, N = z.childLanes;
            if (Ua(l, N))
              return jx(e, n, l);
            bu(n, jd(Yl.current));
            var te = _s(e, n, l);
            return te !== null ? te.sibling : null;
          } else
            bu(n, jd(Yl.current));
          break;
        }
        case ne: {
          var J = (e.flags & kt) !== At, ve = Ua(l, n.childLanes);
          if (J) {
            if (ve)
              return Hx(e, n, l);
            n.flags |= kt;
          }
          var ge = n.memoizedState;
          if (ge !== null && (ge.rendering = null, ge.tail = null, ge.lastEffect = null), bu(n, Yl.current), ve)
            break;
          return null;
        }
        case G:
        case K:
          return n.lanes = Le, Ax(e, n, l);
      }
      return _s(e, n, l);
    }
    function qx(e, n, l) {
      if (n._debugNeedsRemount && e !== null)
        return N_(e, n, b2(n.type, n.key, n.pendingProps, n._debugOwner || null, n.mode, n.lanes));
      if (e !== null) {
        var o = e.memoizedProps, c = n.pendingProps;
        if (o !== c || Cy() || // Force a re-render if the implementation changed due to hot reload:
        n.type !== e.type)
          Gl = !0;
        else {
          var h = GS(e, l);
          if (!h && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (n.flags & kt) === At)
            return Gl = !1, U_(e, n, l);
          (e.flags & Of) !== At ? Gl = !0 : Gl = !1;
        }
      } else if (Gl = !1, ga() && oM(n)) {
        var E = n.index, T = sM();
        gE(n, T, E);
      }
      switch (n.lanes = Le, n.tag) {
        case C:
          return y_(e, n, n.type, l);
        case ie: {
          var M = n.elementType;
          return h_(e, n, M, l);
        }
        case g: {
          var z = n.type, N = n.pendingProps, te = n.elementType === z ? N : Bl(z, N);
          return $S(e, n, z, te, l);
        }
        case x: {
          var J = n.type, ve = n.pendingProps, ge = n.elementType === J ? ve : Bl(J, ve);
          return zx(e, n, J, ge, l);
        }
        case b:
          return d_(e, n, l);
        case D:
          return p_(e, n, l);
        case _:
          return v_(e, n);
        case V:
          return jx(e, n, l);
        case R:
          return A_(e, n, l);
        case H: {
          var xe = n.type, lt = n.pendingProps, Nt = n.elementType === xe ? lt : Bl(xe, lt);
          return Dx(e, n, xe, Nt, l);
        }
        case A:
          return u_(e, n, l);
        case L:
          return c_(e, n, l);
        case $:
          return f_(e, n, l);
        case q:
          return L_(e, n, l);
        case U:
          return z_(e, n, l);
        case F: {
          var _t = n.type, mn = n.pendingProps, fn = Bl(_t, mn);
          if (n.type !== n.elementType) {
            var ce = _t.propTypes;
            ce && Vl(
              ce,
              fn,
              // Resolved for outer only
              "prop",
              Sn(_t)
            );
          }
          return fn = Bl(_t.type, fn), kx(e, n, _t, fn, l);
        }
        case B:
          return Ox(e, n, n.type, n.pendingProps, l);
        case X: {
          var we = n.type, fe = n.pendingProps, qe = n.elementType === we ? fe : Bl(we, fe);
          return m_(e, n, we, qe, l);
        }
        case ne:
          return Hx(e, n, l);
        case ae:
          break;
        case G:
          return Ax(e, n, l);
      }
      throw new Error("Unknown unit of work tag (" + n.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Id(e) {
      e.flags |= pn;
    }
    function Yx(e) {
      e.flags |= ir, e.flags |= ru;
    }
    var Wx, QS, Bx, Gx;
    Wx = function(e, n, l, o) {
      for (var c = n.child; c !== null; ) {
        if (c.tag === D || c.tag === _)
          aR(e, c.stateNode);
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
    }, Bx = function(e, n, l, o, c) {
      var h = e.memoizedProps;
      if (h !== o) {
        var E = n.stateNode, T = Ig(), M = lR(E, l, h, o, c, T);
        n.updateQueue = M, M && Id(n);
      }
    }, Gx = function(e, n, l, o) {
      l !== o && Id(n);
    };
    function th(e, n) {
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
      var n = e.alternate !== null && e.alternate.child === e.child, l = Le, o = At;
      if (n) {
        if ((e.mode & bn) !== Lt) {
          for (var M = e.selfBaseDuration, z = e.child; z !== null; )
            l = en(l, en(z.lanes, z.childLanes)), o |= z.subtreeFlags & yr, o |= z.flags & yr, M += z.treeBaseDuration, z = z.sibling;
          e.treeBaseDuration = M;
        } else
          for (var N = e.child; N !== null; )
            l = en(l, en(N.lanes, N.childLanes)), o |= N.subtreeFlags & yr, o |= N.flags & yr, N.return = e, N = N.sibling;
        e.subtreeFlags |= o;
      } else {
        if ((e.mode & bn) !== Lt) {
          for (var c = e.actualDuration, h = e.selfBaseDuration, E = e.child; E !== null; )
            l = en(l, en(E.lanes, E.childLanes)), o |= E.subtreeFlags, o |= E.flags, c += E.actualDuration, h += E.treeBaseDuration, E = E.sibling;
          e.actualDuration = c, e.treeBaseDuration = h;
        } else
          for (var T = e.child; T !== null; )
            l = en(l, en(T.lanes, T.childLanes)), o |= T.subtreeFlags, o |= T.flags, T.return = e, T = T.sibling;
        e.subtreeFlags |= o;
      }
      return e.childLanes = l, n;
    }
    function j_(e, n, l) {
      if (xM() && (n.mode & ln) !== Lt && (n.flags & kt) === At)
        return TE(n), Ad(), n.flags |= ea | oc | zr, !1;
      var o = ky(n);
      if (l !== null && l.dehydrated !== null)
        if (e === null) {
          if (!o)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (SM(n), Ea(n), (n.mode & bn) !== Lt) {
            var c = l !== null;
            if (c) {
              var h = n.child;
              h !== null && (n.treeBaseDuration -= h.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Ad(), (n.flags & kt) === At && (n.memoizedState = null), n.flags |= pn, Ea(n), (n.mode & bn) !== Lt) {
            var E = l !== null;
            if (E) {
              var T = n.child;
              T !== null && (n.treeBaseDuration -= T.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return RE(), !0;
    }
    function Qx(e, n, l) {
      var o = n.pendingProps;
      switch (xg(n), n.tag) {
        case C:
        case ie:
        case B:
        case g:
        case H:
        case A:
        case L:
        case $:
        case U:
        case F:
          return Ea(n), null;
        case x: {
          var c = n.type;
          return Lo(c) && by(n), Ea(n), null;
        }
        case b: {
          var h = n.stateNode;
          if (Ud(n), yg(n), Gg(), h.pendingContext && (h.context = h.pendingContext, h.pendingContext = null), e === null || e.child === null) {
            var E = ky(n);
            if (E)
              Id(n);
            else if (e !== null) {
              var T = e.memoizedState;
              // Check if this is a client root
              (!T.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (n.flags & ea) !== At) && (n.flags |= _r, RE());
            }
          }
          return QS(e, n), Ea(n), null;
        }
        case D: {
          qg(n);
          var M = HE(), z = n.type;
          if (e !== null && n.stateNode != null)
            Bx(e, n, z, o, M), e.ref !== n.ref && Yx(n);
          else {
            if (!o) {
              if (n.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Ea(n), null;
            }
            var N = Ig(), te = ky(n);
            if (te)
              yM(n, M, N) && Id(n);
            else {
              var J = rR(z, o, M, N, n);
              Wx(J, n, !1, !1), n.stateNode = J, iR(J, z, o, M) && Id(n);
            }
            n.ref !== null && Yx(n);
          }
          return Ea(n), null;
        }
        case _: {
          var ve = o;
          if (e && n.stateNode != null) {
            var ge = e.memoizedProps;
            Gx(e, n, ge, ve);
          } else {
            if (typeof ve != "string" && n.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var xe = HE(), lt = Ig(), Nt = ky(n);
            Nt ? gM(n) && Id(n) : n.stateNode = oR(ve, xe, lt, n);
          }
          return Ea(n), null;
        }
        case V: {
          Fd(n);
          var _t = n.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var mn = j_(e, n, _t);
            if (!mn)
              return n.flags & zr ? n : null;
          }
          if ((n.flags & kt) !== At)
            return n.lanes = l, (n.mode & bn) !== Lt && SS(n), n;
          var fn = _t !== null, ce = e !== null && e.memoizedState !== null;
          if (fn !== ce && fn) {
            var we = n.child;
            if (we.flags |= mr, (n.mode & ln) !== Lt) {
              var fe = e === null && (n.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              fe || Yg(Yl.current, qE) ? FD() : p2();
            }
          }
          var qe = n.updateQueue;
          if (qe !== null && (n.flags |= pn), Ea(n), (n.mode & bn) !== Lt && fn) {
            var mt = n.child;
            mt !== null && (n.treeBaseDuration -= mt.treeBaseDuration);
          }
          return null;
        }
        case R:
          return Ud(n), QS(e, n), e === null && eM(n.stateNode.containerInfo), Ea(n), null;
        case q:
          var st = n.type._context;
          return Ng(st, n), Ea(n), null;
        case X: {
          var It = n.type;
          return Lo(It) && by(n), Ea(n), null;
        }
        case ne: {
          Fd(n);
          var Kt = n.memoizedState;
          if (Kt === null)
            return Ea(n), null;
          var Un = (n.flags & kt) !== At, Mn = Kt.rendering;
          if (Mn === null)
            if (Un)
              th(Kt, !1);
            else {
              var Or = $D() && (e === null || (e.flags & kt) === At);
              if (!Or)
                for (var _n = n.child; _n !== null; ) {
                  var Cr = Wy(_n);
                  if (Cr !== null) {
                    Un = !0, n.flags |= kt, th(Kt, !1);
                    var Ia = Cr.updateQueue;
                    return Ia !== null && (n.updateQueue = Ia, n.flags |= pn), n.subtreeFlags = At, _M(n, l), bu(n, Wg(Yl.current, Vv)), n.child;
                  }
                  _n = _n.sibling;
                }
              Kt.tail !== null && Dr() > mw() && (n.flags |= kt, Un = !0, th(Kt, !1), n.lanes = Bp);
            }
          else {
            if (!Un) {
              var Ta = Wy(Mn);
              if (Ta !== null) {
                n.flags |= kt, Un = !0;
                var Wi = Ta.updateQueue;
                if (Wi !== null && (n.updateQueue = Wi, n.flags |= pn), th(Kt, !0), Kt.tail === null && Kt.tailMode === "hidden" && !Mn.alternate && !ga())
                  return Ea(n), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Dr() * 2 - Kt.renderingStartTime > mw() && l !== Na && (n.flags |= kt, Un = !0, th(Kt, !1), n.lanes = Bp);
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
            Kt.rendering = ri, Kt.tail = ri.sibling, Kt.renderingStartTime = Dr(), ri.sibling = null;
            var qa = Yl.current;
            return Un ? qa = Wg(qa, Vv) : qa = jd(qa), bu(n, qa), ri;
          }
          return Ea(n), null;
        }
        case ae:
          break;
        case G:
        case K: {
          d2(n);
          var Ls = n.memoizedState, Kd = Ls !== null;
          if (e !== null) {
            var yh = e.memoizedState, Ho = yh !== null;
            Ho !== Kd && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ye && (n.flags |= mr);
          }
          return !Kd || (n.mode & ln) === Lt ? Ea(n) : Ua($o, Na) && (Ea(n), n.subtreeFlags & (er | pn) && (n.flags |= mr)), null;
        }
        case le:
          return null;
        case de:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + n.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function F_(e, n, l) {
      switch (xg(n), n.tag) {
        case x: {
          var o = n.type;
          Lo(o) && by(n);
          var c = n.flags;
          return c & zr ? (n.flags = c & ~zr | kt, (n.mode & bn) !== Lt && SS(n), n) : null;
        }
        case b: {
          n.stateNode, Ud(n), yg(n), Gg();
          var h = n.flags;
          return (h & zr) !== At && (h & kt) === At ? (n.flags = h & ~zr | kt, n) : null;
        }
        case D:
          return qg(n), null;
        case V: {
          Fd(n);
          var E = n.memoizedState;
          if (E !== null && E.dehydrated !== null) {
            if (n.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Ad();
          }
          var T = n.flags;
          return T & zr ? (n.flags = T & ~zr | kt, (n.mode & bn) !== Lt && SS(n), n) : null;
        }
        case ne:
          return Fd(n), null;
        case R:
          return Ud(n), null;
        case q:
          var M = n.type._context;
          return Ng(M, n), null;
        case G:
        case K:
          return d2(n), null;
        case le:
          return null;
        default:
          return null;
      }
    }
    function Xx(e, n, l) {
      switch (xg(n), n.tag) {
        case x: {
          var o = n.type.childContextTypes;
          o != null && by(n);
          break;
        }
        case b: {
          n.stateNode, Ud(n), yg(n), Gg();
          break;
        }
        case D: {
          qg(n);
          break;
        }
        case R:
          Ud(n);
          break;
        case V:
          Fd(n);
          break;
        case ne:
          Fd(n);
          break;
        case q:
          var c = n.type._context;
          Ng(c, n);
          break;
        case G:
        case K:
          d2(n);
          break;
      }
    }
    var Kx = null;
    Kx = /* @__PURE__ */ new Set();
    var m0 = !1, xa = !1, P_ = typeof WeakSet == "function" ? WeakSet : Set, Ct = null, qd = null, Yd = null;
    function $_(e) {
      ho(null, function() {
        throw e;
      }), lc();
    }
    var H_ = function(e, n) {
      if (n.props = e.memoizedProps, n.state = e.memoizedState, e.mode & bn)
        try {
          Fo(), n.componentWillUnmount();
        } finally {
          jo(e);
        }
      else
        n.componentWillUnmount();
    };
    function Zx(e, n) {
      try {
        Mu(Br, e);
      } catch (l) {
        Yn(e, n, l);
      }
    }
    function XS(e, n, l) {
      try {
        H_(e, l);
      } catch (o) {
        Yn(e, n, o);
      }
    }
    function V_(e, n, l) {
      try {
        l.componentDidMount();
      } catch (o) {
        Yn(e, n, o);
      }
    }
    function Jx(e, n) {
      try {
        tw(e);
      } catch (l) {
        Yn(e, n, l);
      }
    }
    function Wd(e, n) {
      var l = e.ref;
      if (l !== null)
        if (typeof l == "function") {
          var o;
          try {
            if (be && $e && e.mode & bn)
              try {
                Fo(), o = l(null);
              } finally {
                jo(e);
              }
            else
              o = l(null);
          } catch (c) {
            Yn(e, n, c);
          }
          typeof o == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Bt(e));
        } else
          l.current = null;
    }
    function y0(e, n, l) {
      try {
        l();
      } catch (o) {
        Yn(e, n, o);
      }
    }
    var ew = !1;
    function I_(e, n) {
      tR(e.containerInfo), Ct = n, q_();
      var l = ew;
      return ew = !1, l;
    }
    function q_() {
      for (; Ct !== null; ) {
        var e = Ct, n = e.child;
        (e.subtreeFlags & yo) !== At && n !== null ? (n.return = e, Ct = n) : Y_();
      }
    }
    function Y_() {
      for (; Ct !== null; ) {
        var e = Ct;
        On(e);
        try {
          W_(e);
        } catch (l) {
          Yn(e, e.return, l);
        }
        qn();
        var n = e.sibling;
        if (n !== null) {
          n.return = e.return, Ct = n;
          return;
        }
        Ct = e.return;
      }
    }
    function W_(e) {
      var n = e.alternate, l = e.flags;
      if ((l & _r) !== At) {
        switch (On(e), e.tag) {
          case g:
          case H:
          case B:
            break;
          case x: {
            if (n !== null) {
              var o = n.memoizedProps, c = n.memoizedState, h = e.stateNode;
              e.type === e.elementType && !Jc && (h.props !== e.memoizedProps && v("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Bt(e) || "instance"), h.state !== e.memoizedState && v("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Bt(e) || "instance"));
              var E = h.getSnapshotBeforeUpdate(e.elementType === e.type ? o : Bl(e.type, o), c);
              {
                var T = Kx;
                E === void 0 && !T.has(e.type) && (T.add(e.type), v("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Bt(e)));
              }
              h.__reactInternalSnapshotBeforeUpdate = E;
            }
            break;
          }
          case b: {
            {
              var M = e.stateNode;
              RR(M.containerInfo);
            }
            break;
          }
          case D:
          case _:
          case R:
          case X:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        qn();
      }
    }
    function Ql(e, n, l) {
      var o = n.updateQueue, c = o !== null ? o.lastEffect : null;
      if (c !== null) {
        var h = c.next, E = h;
        do {
          if ((E.tag & e) === e) {
            var T = E.destroy;
            E.destroy = void 0, T !== void 0 && ((e & Sa) !== xi ? Ul(n) : (e & Br) !== xi && uc(n), (e & zo) !== xi && vh(!0), y0(n, l, T), (e & zo) !== xi && vh(!1), (e & Sa) !== xi ? xo() : (e & Br) !== xi && Yp());
          }
          E = E.next;
        } while (E !== h);
      }
    }
    function Mu(e, n) {
      var l = n.updateQueue, o = l !== null ? l.lastEffect : null;
      if (o !== null) {
        var c = o.next, h = c;
        do {
          if ((h.tag & e) === e) {
            (e & Sa) !== xi ? qp(n) : (e & Br) !== xi && jf(n);
            var E = h.create;
            (e & zo) !== xi && vh(!0), h.destroy = E(), (e & zo) !== xi && vh(!1), (e & Sa) !== xi ? wm() : (e & Br) !== xi && Cm();
            {
              var T = h.destroy;
              if (T !== void 0 && typeof T != "function") {
                var M = void 0;
                (h.tag & Br) !== At ? M = "useLayoutEffect" : (h.tag & zo) !== At ? M = "useInsertionEffect" : M = "useEffect";
                var z = void 0;
                T === null ? z = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof T.then == "function" ? z = `

It looks like you wrote ` + M + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + M + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : z = " You returned: " + T, v("%s must not return anything besides a function, which is used for clean-up.%s", M, z);
              }
            }
          }
          h = h.next;
        } while (h !== c);
      }
    }
    function B_(e, n) {
      if ((n.flags & pn) !== At)
        switch (n.tag) {
          case $: {
            var l = n.stateNode.passiveEffectDuration, o = n.memoizedProps, c = o.id, h = o.onPostCommit, E = mx(), T = n.alternate === null ? "mount" : "update";
            hx() && (T = "nested-update"), typeof h == "function" && h(c, T, l, E);
            var M = n.return;
            e: for (; M !== null; ) {
              switch (M.tag) {
                case b:
                  var z = M.stateNode;
                  z.passiveEffectDuration += l;
                  break e;
                case $:
                  var N = M.stateNode;
                  N.passiveEffectDuration += l;
                  break e;
              }
              M = M.return;
            }
            break;
          }
        }
    }
    function G_(e, n, l, o) {
      if ((l.flags & So) !== At)
        switch (l.tag) {
          case g:
          case H:
          case B: {
            if (!xa)
              if (l.mode & bn)
                try {
                  Fo(), Mu(Br | Wr, l);
                } finally {
                  jo(l);
                }
              else
                Mu(Br | Wr, l);
            break;
          }
          case x: {
            var c = l.stateNode;
            if (l.flags & pn && !xa)
              if (n === null)
                if (l.type === l.elementType && !Jc && (c.props !== l.memoizedProps && v("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Bt(l) || "instance"), c.state !== l.memoizedState && v("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Bt(l) || "instance")), l.mode & bn)
                  try {
                    Fo(), c.componentDidMount();
                  } finally {
                    jo(l);
                  }
                else
                  c.componentDidMount();
              else {
                var h = l.elementType === l.type ? n.memoizedProps : Bl(l.type, n.memoizedProps), E = n.memoizedState;
                if (l.type === l.elementType && !Jc && (c.props !== l.memoizedProps && v("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Bt(l) || "instance"), c.state !== l.memoizedState && v("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Bt(l) || "instance")), l.mode & bn)
                  try {
                    Fo(), c.componentDidUpdate(h, E, c.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    jo(l);
                  }
                else
                  c.componentDidUpdate(h, E, c.__reactInternalSnapshotBeforeUpdate);
              }
            var T = l.updateQueue;
            T !== null && (l.type === l.elementType && !Jc && (c.props !== l.memoizedProps && v("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Bt(l) || "instance"), c.state !== l.memoizedState && v("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Bt(l) || "instance")), $E(l, T, c));
            break;
          }
          case b: {
            var M = l.updateQueue;
            if (M !== null) {
              var z = null;
              if (l.child !== null)
                switch (l.child.tag) {
                  case D:
                    z = l.child.stateNode;
                    break;
                  case x:
                    z = l.child.stateNode;
                    break;
                }
              $E(l, M, z);
            }
            break;
          }
          case D: {
            var N = l.stateNode;
            if (n === null && l.flags & pn) {
              var te = l.type, J = l.memoizedProps;
              dR(N, te, J);
            }
            break;
          }
          case _:
            break;
          case R:
            break;
          case $: {
            {
              var ve = l.memoizedProps, ge = ve.onCommit, xe = ve.onRender, lt = l.stateNode.effectDuration, Nt = mx(), _t = n === null ? "mount" : "update";
              hx() && (_t = "nested-update"), typeof xe == "function" && xe(l.memoizedProps.id, _t, l.actualDuration, l.treeBaseDuration, l.actualStartTime, Nt);
              {
                typeof ge == "function" && ge(l.memoizedProps.id, _t, lt, Nt), YD(l);
                var mn = l.return;
                e: for (; mn !== null; ) {
                  switch (mn.tag) {
                    case b:
                      var fn = mn.stateNode;
                      fn.effectDuration += lt;
                      break e;
                    case $:
                      var ce = mn.stateNode;
                      ce.effectDuration += lt;
                      break e;
                  }
                  mn = mn.return;
                }
              }
            }
            break;
          }
          case V: {
            nD(e, l);
            break;
          }
          case ne:
          case X:
          case ae:
          case G:
          case K:
          case de:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      xa || l.flags & ir && tw(l);
    }
    function Q_(e) {
      switch (e.tag) {
        case g:
        case H:
        case B: {
          if (e.mode & bn)
            try {
              Fo(), Zx(e, e.return);
            } finally {
              jo(e);
            }
          else
            Zx(e, e.return);
          break;
        }
        case x: {
          var n = e.stateNode;
          typeof n.componentDidMount == "function" && V_(e, e.return, n), Jx(e, e.return);
          break;
        }
        case D: {
          Jx(e, e.return);
          break;
        }
      }
    }
    function X_(e, n) {
      for (var l = null, o = e; ; ) {
        if (o.tag === D) {
          if (l === null) {
            l = o;
            try {
              var c = o.stateNode;
              n ? wR(c) : bR(o.stateNode, o.memoizedProps);
            } catch (E) {
              Yn(e, e.return, E);
            }
          }
        } else if (o.tag === _) {
          if (l === null)
            try {
              var h = o.stateNode;
              n ? CR(h) : TR(h, o.memoizedProps);
            } catch (E) {
              Yn(e, e.return, E);
            }
        } else if (!((o.tag === G || o.tag === K) && o.memoizedState !== null && o !== e)) {
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
    function tw(e) {
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
          typeof c == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Bt(e));
        } else
          n.hasOwnProperty("current") || v("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Bt(e)), n.current = o;
      }
    }
    function K_(e) {
      var n = e.alternate;
      n !== null && (n.return = null), e.return = null;
    }
    function nw(e) {
      var n = e.alternate;
      n !== null && (e.alternate = null, nw(n));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === D) {
          var l = e.stateNode;
          l !== null && rM(l);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Z_(e) {
      for (var n = e.return; n !== null; ) {
        if (rw(n))
          return n;
        n = n.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function rw(e) {
      return e.tag === D || e.tag === b || e.tag === R;
    }
    function aw(e) {
      var n = e;
      e: for (; ; ) {
        for (; n.sibling === null; ) {
          if (n.return === null || rw(n.return))
            return null;
          n = n.return;
        }
        for (n.sibling.return = n.return, n = n.sibling; n.tag !== D && n.tag !== _ && n.tag !== j; ) {
          if (n.flags & er || n.child === null || n.tag === R)
            continue e;
          n.child.return = n, n = n.child;
        }
        if (!(n.flags & er))
          return n.stateNode;
      }
    }
    function J_(e) {
      var n = Z_(e);
      switch (n.tag) {
        case D: {
          var l = n.stateNode;
          n.flags & fi && (lE(l), n.flags &= ~fi);
          var o = aw(e);
          ZS(e, o, l);
          break;
        }
        case b:
        case R: {
          var c = n.stateNode.containerInfo, h = aw(e);
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
        n ? gR(l, h, n) : mR(l, h);
      } else if (o !== R) {
        var E = e.child;
        if (E !== null) {
          KS(E, n, l);
          for (var T = E.sibling; T !== null; )
            KS(T, n, l), T = T.sibling;
        }
      }
    }
    function ZS(e, n, l) {
      var o = e.tag, c = o === D || o === _;
      if (c) {
        var h = e.stateNode;
        n ? yR(l, h, n) : hR(l, h);
      } else if (o !== R) {
        var E = e.child;
        if (E !== null) {
          ZS(E, n, l);
          for (var T = E.sibling; T !== null; )
            ZS(T, n, l), T = T.sibling;
        }
      }
    }
    var wa = null, Xl = !1;
    function eD(e, n, l) {
      {
        var o = n;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case D: {
              wa = o.stateNode, Xl = !1;
              break e;
            }
            case b: {
              wa = o.stateNode.containerInfo, Xl = !0;
              break e;
            }
            case R: {
              wa = o.stateNode.containerInfo, Xl = !0;
              break e;
            }
          }
          o = o.return;
        }
        if (wa === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        iw(e, n, l), wa = null, Xl = !1;
      }
      K_(l);
    }
    function _u(e, n, l) {
      for (var o = l.child; o !== null; )
        iw(e, n, o), o = o.sibling;
    }
    function iw(e, n, l) {
      switch (Hp(l), l.tag) {
        case D:
          xa || Wd(l, n);
        // eslint-disable-next-line-no-fallthrough
        case _: {
          {
            var o = wa, c = Xl;
            wa = null, _u(e, n, l), wa = o, Xl = c, wa !== null && (Xl ? ER(wa, l.stateNode) : SR(wa, l.stateNode));
          }
          return;
        }
        case j: {
          wa !== null && (Xl ? xR(wa, l.stateNode) : ug(wa, l.stateNode));
          return;
        }
        case R: {
          {
            var h = wa, E = Xl;
            wa = l.stateNode.containerInfo, Xl = !0, _u(e, n, l), wa = h, Xl = E;
          }
          return;
        }
        case g:
        case H:
        case F:
        case B: {
          if (!xa) {
            var T = l.updateQueue;
            if (T !== null) {
              var M = T.lastEffect;
              if (M !== null) {
                var z = M.next, N = z;
                do {
                  var te = N, J = te.destroy, ve = te.tag;
                  J !== void 0 && ((ve & zo) !== xi ? y0(l, n, J) : (ve & Br) !== xi && (uc(l), l.mode & bn ? (Fo(), y0(l, n, J), jo(l)) : y0(l, n, J), Yp())), N = N.next;
                } while (N !== z);
              }
            }
          }
          _u(e, n, l);
          return;
        }
        case x: {
          if (!xa) {
            Wd(l, n);
            var ge = l.stateNode;
            typeof ge.componentWillUnmount == "function" && XS(l, n, ge);
          }
          _u(e, n, l);
          return;
        }
        case ae: {
          _u(e, n, l);
          return;
        }
        case G: {
          if (
            // TODO: Remove this dead flag
            l.mode & ln
          ) {
            var xe = xa;
            xa = xe || l.memoizedState !== null, _u(e, n, l), xa = xe;
          } else
            _u(e, n, l);
          break;
        }
        default: {
          _u(e, n, l);
          return;
        }
      }
    }
    function tD(e) {
      e.memoizedState;
    }
    function nD(e, n) {
      var l = n.memoizedState;
      if (l === null) {
        var o = n.alternate;
        if (o !== null) {
          var c = o.memoizedState;
          if (c !== null) {
            var h = c.dehydrated;
            h !== null && $R(h);
          }
        }
      }
    }
    function lw(e) {
      var n = e.updateQueue;
      if (n !== null) {
        e.updateQueue = null;
        var l = e.stateNode;
        l === null && (l = e.stateNode = new P_()), n.forEach(function(o) {
          var c = ZD.bind(null, e, o);
          if (!l.has(o)) {
            if (l.add(o), za)
              if (qd !== null && Yd !== null)
                ph(Yd, qd);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            o.then(c, c);
          }
        });
      }
    }
    function rD(e, n, l) {
      qd = l, Yd = e, On(n), ow(n, e), On(n), qd = null, Yd = null;
    }
    function Kl(e, n, l) {
      var o = n.deletions;
      if (o !== null)
        for (var c = 0; c < o.length; c++) {
          var h = o[c];
          try {
            eD(e, n, h);
          } catch (M) {
            Yn(h, n, M);
          }
        }
      var E = oo();
      if (n.subtreeFlags & go)
        for (var T = n.child; T !== null; )
          On(T), ow(T, e), T = T.sibling;
      On(E);
    }
    function ow(e, n, l) {
      var o = e.alternate, c = e.flags;
      switch (e.tag) {
        case g:
        case H:
        case F:
        case B: {
          if (Kl(n, e), Po(e), c & pn) {
            try {
              Ql(zo | Wr, e, e.return), Mu(zo | Wr, e);
            } catch (It) {
              Yn(e, e.return, It);
            }
            if (e.mode & bn) {
              try {
                Fo(), Ql(Br | Wr, e, e.return);
              } catch (It) {
                Yn(e, e.return, It);
              }
              jo(e);
            } else
              try {
                Ql(Br | Wr, e, e.return);
              } catch (It) {
                Yn(e, e.return, It);
              }
          }
          return;
        }
        case x: {
          Kl(n, e), Po(e), c & ir && o !== null && Wd(o, o.return);
          return;
        }
        case D: {
          Kl(n, e), Po(e), c & ir && o !== null && Wd(o, o.return);
          {
            if (e.flags & fi) {
              var h = e.stateNode;
              try {
                lE(h);
              } catch (It) {
                Yn(e, e.return, It);
              }
            }
            if (c & pn) {
              var E = e.stateNode;
              if (E != null) {
                var T = e.memoizedProps, M = o !== null ? o.memoizedProps : T, z = e.type, N = e.updateQueue;
                if (e.updateQueue = null, N !== null)
                  try {
                    pR(E, N, z, M, T, e);
                  } catch (It) {
                    Yn(e, e.return, It);
                  }
              }
            }
          }
          return;
        }
        case _: {
          if (Kl(n, e), Po(e), c & pn) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var te = e.stateNode, J = e.memoizedProps, ve = o !== null ? o.memoizedProps : J;
            try {
              vR(te, ve, J);
            } catch (It) {
              Yn(e, e.return, It);
            }
          }
          return;
        }
        case b: {
          if (Kl(n, e), Po(e), c & pn && o !== null) {
            var ge = o.memoizedState;
            if (ge.isDehydrated)
              try {
                PR(n.containerInfo);
              } catch (It) {
                Yn(e, e.return, It);
              }
          }
          return;
        }
        case R: {
          Kl(n, e), Po(e);
          return;
        }
        case V: {
          Kl(n, e), Po(e);
          var xe = e.child;
          if (xe.flags & mr) {
            var lt = xe.stateNode, Nt = xe.memoizedState, _t = Nt !== null;
            if (lt.isHidden = _t, _t) {
              var mn = xe.alternate !== null && xe.alternate.memoizedState !== null;
              mn || jD();
            }
          }
          if (c & pn) {
            try {
              tD(e);
            } catch (It) {
              Yn(e, e.return, It);
            }
            lw(e);
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
            xa = ce || fn, Kl(n, e), xa = ce;
          } else
            Kl(n, e);
          if (Po(e), c & mr) {
            var we = e.stateNode, fe = e.memoizedState, qe = fe !== null, mt = e;
            if (we.isHidden = qe, qe && !fn && (mt.mode & ln) !== Lt) {
              Ct = mt;
              for (var st = mt.child; st !== null; )
                Ct = st, iD(st), st = st.sibling;
            }
            X_(mt, qe);
          }
          return;
        }
        case ne: {
          Kl(n, e), Po(e), c & pn && lw(e);
          return;
        }
        case ae:
          return;
        default: {
          Kl(n, e), Po(e);
          return;
        }
      }
    }
    function Po(e) {
      var n = e.flags;
      if (n & er) {
        try {
          J_(e);
        } catch (l) {
          Yn(e, e.return, l);
        }
        e.flags &= ~er;
      }
      n & Oa && (e.flags &= ~Oa);
    }
    function aD(e, n, l) {
      qd = l, Yd = n, Ct = e, sw(e, n, l), qd = null, Yd = null;
    }
    function sw(e, n, l) {
      for (var o = (e.mode & ln) !== Lt; Ct !== null; ) {
        var c = Ct, h = c.child;
        if (c.tag === G && o) {
          var E = c.memoizedState !== null, T = E || m0;
          if (T) {
            JS(e, n, l);
            continue;
          } else {
            var M = c.alternate, z = M !== null && M.memoizedState !== null, N = z || xa, te = m0, J = xa;
            m0 = T, xa = N, xa && !J && (Ct = c, lD(c));
            for (var ve = h; ve !== null; )
              Ct = ve, sw(
                ve,
                // New root; bubble back up to here and stop.
                n,
                l
              ), ve = ve.sibling;
            Ct = c, m0 = te, xa = J, JS(e, n, l);
            continue;
          }
        }
        (c.subtreeFlags & So) !== At && h !== null ? (h.return = c, Ct = h) : JS(e, n, l);
      }
    }
    function JS(e, n, l) {
      for (; Ct !== null; ) {
        var o = Ct;
        if ((o.flags & So) !== At) {
          var c = o.alternate;
          On(o);
          try {
            G_(n, c, o, l);
          } catch (E) {
            Yn(o, o.return, E);
          }
          qn();
        }
        if (o === e) {
          Ct = null;
          return;
        }
        var h = o.sibling;
        if (h !== null) {
          h.return = o.return, Ct = h;
          return;
        }
        Ct = o.return;
      }
    }
    function iD(e) {
      for (; Ct !== null; ) {
        var n = Ct, l = n.child;
        switch (n.tag) {
          case g:
          case H:
          case F:
          case B: {
            if (n.mode & bn)
              try {
                Fo(), Ql(Br, n, n.return);
              } finally {
                jo(n);
              }
            else
              Ql(Br, n, n.return);
            break;
          }
          case x: {
            Wd(n, n.return);
            var o = n.stateNode;
            typeof o.componentWillUnmount == "function" && XS(n, n.return, o);
            break;
          }
          case D: {
            Wd(n, n.return);
            break;
          }
          case G: {
            var c = n.memoizedState !== null;
            if (c) {
              uw(e);
              continue;
            }
            break;
          }
        }
        l !== null ? (l.return = n, Ct = l) : uw(e);
      }
    }
    function uw(e) {
      for (; Ct !== null; ) {
        var n = Ct;
        if (n === e) {
          Ct = null;
          return;
        }
        var l = n.sibling;
        if (l !== null) {
          l.return = n.return, Ct = l;
          return;
        }
        Ct = n.return;
      }
    }
    function lD(e) {
      for (; Ct !== null; ) {
        var n = Ct, l = n.child;
        if (n.tag === G) {
          var o = n.memoizedState !== null;
          if (o) {
            cw(e);
            continue;
          }
        }
        l !== null ? (l.return = n, Ct = l) : cw(e);
      }
    }
    function cw(e) {
      for (; Ct !== null; ) {
        var n = Ct;
        On(n);
        try {
          Q_(n);
        } catch (o) {
          Yn(n, n.return, o);
        }
        if (qn(), n === e) {
          Ct = null;
          return;
        }
        var l = n.sibling;
        if (l !== null) {
          l.return = n.return, Ct = l;
          return;
        }
        Ct = n.return;
      }
    }
    function oD(e, n, l, o) {
      Ct = n, sD(n, e, l, o);
    }
    function sD(e, n, l, o) {
      for (; Ct !== null; ) {
        var c = Ct, h = c.child;
        (c.subtreeFlags & zl) !== At && h !== null ? (h.return = c, Ct = h) : uD(e, n, l, o);
      }
    }
    function uD(e, n, l, o) {
      for (; Ct !== null; ) {
        var c = Ct;
        if ((c.flags & ka) !== At) {
          On(c);
          try {
            cD(n, c, l, o);
          } catch (E) {
            Yn(c, c.return, E);
          }
          qn();
        }
        if (c === e) {
          Ct = null;
          return;
        }
        var h = c.sibling;
        if (h !== null) {
          h.return = c.return, Ct = h;
          return;
        }
        Ct = c.return;
      }
    }
    function cD(e, n, l, o) {
      switch (n.tag) {
        case g:
        case H:
        case B: {
          if (n.mode & bn) {
            gS();
            try {
              Mu(Sa | Wr, n);
            } finally {
              yS(n);
            }
          } else
            Mu(Sa | Wr, n);
          break;
        }
      }
    }
    function fD(e) {
      Ct = e, dD();
    }
    function dD() {
      for (; Ct !== null; ) {
        var e = Ct, n = e.child;
        if ((Ct.flags & ci) !== At) {
          var l = e.deletions;
          if (l !== null) {
            for (var o = 0; o < l.length; o++) {
              var c = l[o];
              Ct = c, hD(c, e);
            }
            {
              var h = e.alternate;
              if (h !== null) {
                var E = h.child;
                if (E !== null) {
                  h.child = null;
                  do {
                    var T = E.sibling;
                    E.sibling = null, E = T;
                  } while (E !== null);
                }
              }
            }
            Ct = e;
          }
        }
        (e.subtreeFlags & zl) !== At && n !== null ? (n.return = e, Ct = n) : pD();
      }
    }
    function pD() {
      for (; Ct !== null; ) {
        var e = Ct;
        (e.flags & ka) !== At && (On(e), vD(e), qn());
        var n = e.sibling;
        if (n !== null) {
          n.return = e.return, Ct = n;
          return;
        }
        Ct = e.return;
      }
    }
    function vD(e) {
      switch (e.tag) {
        case g:
        case H:
        case B: {
          e.mode & bn ? (gS(), Ql(Sa | Wr, e, e.return), yS(e)) : Ql(Sa | Wr, e, e.return);
          break;
        }
      }
    }
    function hD(e, n) {
      for (; Ct !== null; ) {
        var l = Ct;
        On(l), yD(l, n), qn();
        var o = l.child;
        o !== null ? (o.return = l, Ct = o) : mD(e);
      }
    }
    function mD(e) {
      for (; Ct !== null; ) {
        var n = Ct, l = n.sibling, o = n.return;
        if (nw(n), n === e) {
          Ct = null;
          return;
        }
        if (l !== null) {
          l.return = o, Ct = l;
          return;
        }
        Ct = o;
      }
    }
    function yD(e, n) {
      switch (e.tag) {
        case g:
        case H:
        case B: {
          e.mode & bn ? (gS(), Ql(Sa, e, n), yS(e)) : Ql(Sa, e, n);
          break;
        }
      }
    }
    function gD(e) {
      switch (e.tag) {
        case g:
        case H:
        case B: {
          try {
            Mu(Br | Wr, e);
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
    function SD(e) {
      switch (e.tag) {
        case g:
        case H:
        case B: {
          try {
            Mu(Sa | Wr, e);
          } catch (n) {
            Yn(e, e.return, n);
          }
          break;
        }
      }
    }
    function ED(e) {
      switch (e.tag) {
        case g:
        case H:
        case B: {
          try {
            Ql(Br | Wr, e, e.return);
          } catch (l) {
            Yn(e, e.return, l);
          }
          break;
        }
        case x: {
          var n = e.stateNode;
          typeof n.componentWillUnmount == "function" && XS(e, e.return, n);
          break;
        }
      }
    }
    function xD(e) {
      switch (e.tag) {
        case g:
        case H:
        case B:
          try {
            Ql(Sa | Wr, e, e.return);
          } catch (n) {
            Yn(e, e.return, n);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var nh = Symbol.for;
      nh("selector.component"), nh("selector.has_pseudo_class"), nh("selector.role"), nh("selector.test_id"), nh("selector.text");
    }
    var wD = [];
    function CD() {
      wD.forEach(function(e) {
        return e();
      });
    }
    var bD = s.ReactCurrentActQueue;
    function TD(e) {
      {
        var n = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), l = typeof jest < "u";
        return l && n !== !1;
      }
    }
    function fw() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && bD.current !== null && v("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var RD = Math.ceil, e2 = s.ReactCurrentDispatcher, t2 = s.ReactCurrentOwner, Ca = s.ReactCurrentBatchConfig, Zl = s.ReactCurrentActQueue, Xr = (
      /*             */
      0
    ), dw = (
      /*               */
      1
    ), ba = (
      /*                */
      2
    ), Sl = (
      /*                */
      4
    ), Ds = 0, rh = 1, ef = 2, g0 = 3, ah = 4, pw = 5, n2 = 6, hn = Xr, ei = null, dr = null, Kr = Le, $o = Le, r2 = gu(Le), Zr = Ds, ih = null, S0 = Le, lh = Le, E0 = Le, oh = null, wi = null, a2 = 0, vw = 500, hw = 1 / 0, MD = 500, ks = null;
    function sh() {
      hw = Dr() + MD;
    }
    function mw() {
      return hw;
    }
    var x0 = !1, i2 = null, Bd = null, tf = !1, Du = null, uh = Le, l2 = [], o2 = null, _D = 50, ch = 0, s2 = null, u2 = !1, w0 = !1, DD = 50, Gd = 0, C0 = null, fh = jn, b0 = Le, yw = !1;
    function T0() {
      return ei;
    }
    function ti() {
      return (hn & (ba | Sl)) !== Xr ? Dr() : (fh !== jn || (fh = Dr()), fh);
    }
    function ku(e) {
      var n = e.mode;
      if ((n & ln) === Lt)
        return Ht;
      if ((hn & ba) !== Xr && Kr !== Le)
        return wc(Kr);
      var l = bM() !== CM;
      if (l) {
        if (Ca.transition !== null) {
          var o = Ca.transition;
          o._updatedFibers || (o._updatedFibers = /* @__PURE__ */ new Set()), o._updatedFibers.add(e);
        }
        return b0 === wn && (b0 = Jp()), b0;
      }
      var c = yi();
      if (c !== wn)
        return c;
      var h = sR();
      return h;
    }
    function kD(e) {
      var n = e.mode;
      return (n & ln) === Lt ? Ht : Dm();
    }
    function Jr(e, n, l, o) {
      ek(), yw && v("useInsertionEffect must not schedule updates."), u2 && (w0 = !0), ou(e, l, o), (hn & ba) !== Le && e === ei ? rk(n) : (za && Tc(e, n, l), ak(n), e === ei && ((hn & ba) === Xr && (lh = en(lh, l)), Zr === ah && Ou(e, Kr)), Ci(e, o), l === Ht && hn === Xr && (n.mode & ln) === Lt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Zl.isBatchingLegacy && (sh(), yE()));
    }
    function OD(e, n, l) {
      var o = e.current;
      o.lanes = n, ou(e, n, l), Ci(e, l);
    }
    function AD(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (hn & ba) !== Xr
      );
    }
    function Ci(e, n) {
      var l = e.callbackNode;
      rd(e, n);
      var o = nd(e, e === ei ? Kr : Le);
      if (o === Le) {
        l !== null && Lw(l), e.callbackNode = null, e.callbackPriority = wn;
        return;
      }
      var c = bo(o), h = e.callbackPriority;
      if (h === c && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(Zl.current !== null && l !== m2)) {
        l == null && h !== Ht && v("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      l != null && Lw(l);
      var E;
      if (c === Ht)
        e.tag === Su ? (Zl.isBatchingLegacy !== null && (Zl.didScheduleLegacyUpdate = !0), lM(Ew.bind(null, e))) : mE(Ew.bind(null, e)), Zl.current !== null ? Zl.current.push(Eu) : cR(function() {
          (hn & (ba | Sl)) === Xr && Eu();
        }), E = null;
      else {
        var T;
        switch (Um(o)) {
          case pa:
            T = sc;
            break;
          case ul:
            T = Eo;
            break;
          case hi:
            T = Nl;
            break;
          case mi:
            T = rs;
            break;
          default:
            T = Nl;
            break;
        }
        E = y2(T, gw.bind(null, e));
      }
      e.callbackPriority = c, e.callbackNode = E;
    }
    function gw(e, n) {
      if (XM(), fh = jn, b0 = Le, (hn & (ba | Sl)) !== Xr)
        throw new Error("Should not already be working.");
      var l = e.callbackNode, o = As();
      if (o && e.callbackNode !== l)
        return null;
      var c = nd(e, e === ei ? Kr : Le);
      if (c === Le)
        return null;
      var h = !id(e, c) && !_m(e, c) && !n, E = h ? VD(e, c) : M0(e, c);
      if (E !== Ds) {
        if (E === ef) {
          var T = ad(e);
          T !== Le && (c = T, E = c2(e, T));
        }
        if (E === rh) {
          var M = ih;
          throw nf(e, Le), Ou(e, c), Ci(e, Dr()), M;
        }
        if (E === n2)
          Ou(e, c);
        else {
          var z = !id(e, c), N = e.current.alternate;
          if (z && !zD(N)) {
            if (E = M0(e, c), E === ef) {
              var te = ad(e);
              te !== Le && (c = te, E = c2(e, te));
            }
            if (E === rh) {
              var J = ih;
              throw nf(e, Le), Ou(e, c), Ci(e, Dr()), J;
            }
          }
          e.finishedWork = N, e.finishedLanes = c, LD(e, E, c);
        }
      }
      return Ci(e, Dr()), e.callbackNode === l ? gw.bind(null, e) : null;
    }
    function c2(e, n) {
      var l = oh;
      if (sd(e)) {
        var o = nf(e, n);
        o.flags |= ea, JR(e.containerInfo);
      }
      var c = M0(e, n);
      if (c !== ef) {
        var h = wi;
        wi = l, h !== null && Sw(h);
      }
      return c;
    }
    function Sw(e) {
      wi === null ? wi = e : wi.push.apply(wi, e);
    }
    function LD(e, n, l) {
      switch (n) {
        case Ds:
        case rh:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case ef: {
          rf(e, wi, ks);
          break;
        }
        case g0: {
          if (Ou(e, l), vs(l) && // do not delay if we're inside an act() scope
          !zw()) {
            var o = a2 + vw - Dr();
            if (o > 10) {
              var c = nd(e, Le);
              if (c !== Le)
                break;
              var h = e.suspendedLanes;
              if (!hs(h, l)) {
                ti(), ld(e, h);
                break;
              }
              e.timeoutHandle = og(rf.bind(null, e, wi, ks), o);
              break;
            }
          }
          rf(e, wi, ks);
          break;
        }
        case ah: {
          if (Ou(e, l), Kp(l))
            break;
          if (!zw()) {
            var E = Hi(e, l), T = E, M = Dr() - T, z = JD(M) - M;
            if (z > 10) {
              e.timeoutHandle = og(rf.bind(null, e, wi, ks), z);
              break;
            }
          }
          rf(e, wi, ks);
          break;
        }
        case pw: {
          rf(e, wi, ks);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function zD(e) {
      for (var n = e; ; ) {
        if (n.flags & nu) {
          var l = n.updateQueue;
          if (l !== null) {
            var o = l.stores;
            if (o !== null)
              for (var c = 0; c < o.length; c++) {
                var h = o[c], E = h.getSnapshot, T = h.value;
                try {
                  if (!je(E(), T))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var M = n.child;
        if (n.subtreeFlags & nu && M !== null) {
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
    function Ou(e, n) {
      n = Cc(n, E0), n = Cc(n, lh), Am(e, n);
    }
    function Ew(e) {
      if (KM(), (hn & (ba | Sl)) !== Xr)
        throw new Error("Should not already be working.");
      As();
      var n = nd(e, Le);
      if (!Ua(n, Ht))
        return Ci(e, Dr()), null;
      var l = M0(e, n);
      if (e.tag !== Su && l === ef) {
        var o = ad(e);
        o !== Le && (n = o, l = c2(e, o));
      }
      if (l === rh) {
        var c = ih;
        throw nf(e, Le), Ou(e, n), Ci(e, Dr()), c;
      }
      if (l === n2)
        throw new Error("Root did not complete. This is a bug in React.");
      var h = e.current.alternate;
      return e.finishedWork = h, e.finishedLanes = n, rf(e, wi, ks), Ci(e, Dr()), null;
    }
    function ND(e, n) {
      n !== Le && (od(e, en(n, Ht)), Ci(e, Dr()), (hn & (ba | Sl)) === Xr && (sh(), Eu()));
    }
    function f2(e, n) {
      var l = hn;
      hn |= dw;
      try {
        return e(n);
      } finally {
        hn = l, hn === Xr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !Zl.isBatchingLegacy && (sh(), yE());
      }
    }
    function UD(e, n, l, o, c) {
      var h = yi(), E = Ca.transition;
      try {
        return Ca.transition = null, Er(pa), e(n, l, o, c);
      } finally {
        Er(h), Ca.transition = E, hn === Xr && sh();
      }
    }
    function Os(e) {
      Du !== null && Du.tag === Su && (hn & (ba | Sl)) === Xr && As();
      var n = hn;
      hn |= dw;
      var l = Ca.transition, o = yi();
      try {
        return Ca.transition = null, Er(pa), e ? e() : void 0;
      } finally {
        Er(o), Ca.transition = l, hn = n, (hn & (ba | Sl)) === Xr && Eu();
      }
    }
    function xw() {
      return (hn & (ba | Sl)) !== Xr;
    }
    function R0(e, n) {
      Ha(r2, $o, e), $o = en($o, n);
    }
    function d2(e) {
      $o = r2.current, $a(r2, e);
    }
    function nf(e, n) {
      e.finishedWork = null, e.finishedLanes = Le;
      var l = e.timeoutHandle;
      if (l !== sg && (e.timeoutHandle = sg, uR(l)), dr !== null)
        for (var o = dr.return; o !== null; ) {
          var c = o.alternate;
          Xx(c, o), o = o.return;
        }
      ei = e;
      var h = af(e.current, null);
      return dr = h, Kr = $o = n, Zr = Ds, ih = null, S0 = Le, lh = Le, E0 = Le, oh = null, wi = null, OM(), ql.discardPendingWarnings(), h;
    }
    function ww(e, n) {
      do {
        var l = dr;
        try {
          if (Uy(), WE(), qn(), t2.current = null, l === null || l.return === null) {
            Zr = rh, ih = n, dr = null;
            return;
          }
          if (be && l.mode & bn && f0(l, !0), Ce)
            if (Xa(), n !== null && typeof n == "object" && typeof n.then == "function") {
              var o = n;
              sl(l, o, Kr);
            } else
              cc(l, n, Kr);
          l_(e, l.return, l, n, Kr), Rw(l);
        } catch (c) {
          n = c, dr === l && l !== null ? (l = l.return, dr = l) : l = dr;
          continue;
        }
        return;
      } while (!0);
    }
    function Cw() {
      var e = e2.current;
      return e2.current = l0, e === null ? l0 : e;
    }
    function bw(e) {
      e2.current = e;
    }
    function jD() {
      a2 = Dr();
    }
    function dh(e) {
      S0 = en(e, S0);
    }
    function FD() {
      Zr === Ds && (Zr = g0);
    }
    function p2() {
      (Zr === Ds || Zr === g0 || Zr === ef) && (Zr = ah), ei !== null && (xc(S0) || xc(lh)) && Ou(ei, Kr);
    }
    function PD(e) {
      Zr !== ah && (Zr = ef), oh === null ? oh = [e] : oh.push(e);
    }
    function $D() {
      return Zr === Ds;
    }
    function M0(e, n) {
      var l = hn;
      hn |= ba;
      var o = Cw();
      if (ei !== e || Kr !== n) {
        if (za) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (ph(e, Kr), c.clear()), Lm(e, n);
        }
        ks = rv(), nf(e, n);
      }
      os(n);
      do
        try {
          HD();
          break;
        } catch (h) {
          ww(e, h);
        }
      while (!0);
      if (Uy(), hn = l, bw(o), dr !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Ff(), ei = null, Kr = Le, Zr;
    }
    function HD() {
      for (; dr !== null; )
        Tw(dr);
    }
    function VD(e, n) {
      var l = hn;
      hn |= ba;
      var o = Cw();
      if (ei !== e || Kr !== n) {
        if (za) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (ph(e, Kr), c.clear()), Lm(e, n);
        }
        ks = rv(), sh(), nf(e, n);
      }
      os(n);
      do
        try {
          ID();
          break;
        } catch (h) {
          ww(e, h);
        }
      while (!0);
      return Uy(), bw(o), hn = l, dr !== null ? (bm(), Ds) : (Ff(), ei = null, Kr = Le, Zr);
    }
    function ID() {
      for (; dr !== null && !Up(); )
        Tw(dr);
    }
    function Tw(e) {
      var n = e.alternate;
      On(e);
      var l;
      (e.mode & bn) !== Lt ? (mS(e), l = v2(n, e, $o), f0(e, !0)) : l = v2(n, e, $o), qn(), e.memoizedProps = e.pendingProps, l === null ? Rw(e) : dr = l, t2.current = null;
    }
    function Rw(e) {
      var n = e;
      do {
        var l = n.alternate, o = n.return;
        if ((n.flags & oc) === At) {
          On(n);
          var c = void 0;
          if ((n.mode & bn) === Lt ? c = Qx(l, n, $o) : (mS(n), c = Qx(l, n, $o), f0(n, !1)), qn(), c !== null) {
            dr = c;
            return;
          }
        } else {
          var h = F_(l, n);
          if (h !== null) {
            h.flags &= gm, dr = h;
            return;
          }
          if ((n.mode & bn) !== Lt) {
            f0(n, !1);
            for (var E = n.actualDuration, T = n.child; T !== null; )
              E += T.actualDuration, T = T.sibling;
            n.actualDuration = E;
          }
          if (o !== null)
            o.flags |= oc, o.subtreeFlags = At, o.deletions = null;
          else {
            Zr = n2, dr = null;
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
      Zr === Ds && (Zr = pw);
    }
    function rf(e, n, l) {
      var o = yi(), c = Ca.transition;
      try {
        Ca.transition = null, Er(pa), qD(e, n, l, o);
      } finally {
        Ca.transition = c, Er(o);
      }
      return null;
    }
    function qD(e, n, l, o) {
      do
        As();
      while (Du !== null);
      if (tk(), (hn & (ba | Sl)) !== Xr)
        throw new Error("Should not already be working.");
      var c = e.finishedWork, h = e.finishedLanes;
      if (Vp(h), c === null)
        return Ip(), null;
      if (h === Le && v("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Le, c === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = wn;
      var E = en(c.lanes, c.childLanes);
      tv(e, E), e === ei && (ei = null, dr = null, Kr = Le), ((c.subtreeFlags & zl) !== At || (c.flags & zl) !== At) && (tf || (tf = !0, o2 = l, y2(Nl, function() {
        return As(), null;
      })));
      var T = (c.subtreeFlags & (yo | go | So | zl)) !== At, M = (c.flags & (yo | go | So | zl)) !== At;
      if (T || M) {
        var z = Ca.transition;
        Ca.transition = null;
        var N = yi();
        Er(pa);
        var te = hn;
        hn |= Sl, t2.current = null, I_(e, c), yx(), rD(e, c, h), nR(e.containerInfo), e.current = c, fc(h), aD(c, e, h), dc(), jp(), hn = te, Er(N), Ca.transition = z;
      } else
        e.current = c, yx();
      var J = tf;
      if (tf ? (tf = !1, Du = e, uh = h) : (Gd = 0, C0 = null), E = e.pendingLanes, E === Le && (Bd = null), J || kw(e.current, !1), Pp(c.stateNode, o), za && e.memoizedUpdaters.clear(), CD(), Ci(e, Dr()), n !== null)
        for (var ve = e.onRecoverableError, ge = 0; ge < n.length; ge++) {
          var xe = n[ge], lt = xe.stack, Nt = xe.digest;
          ve(xe.value, {
            componentStack: lt,
            digest: Nt
          });
        }
      if (x0) {
        x0 = !1;
        var _t = i2;
        throw i2 = null, _t;
      }
      return Ua(uh, Ht) && e.tag !== Su && As(), E = e.pendingLanes, Ua(E, Ht) ? (QM(), e === s2 ? ch++ : (ch = 0, s2 = e)) : ch = 0, Eu(), Ip(), null;
    }
    function As() {
      if (Du !== null) {
        var e = Um(uh), n = Mc(hi, e), l = Ca.transition, o = yi();
        try {
          return Ca.transition = null, Er(n), WD();
        } finally {
          Er(o), Ca.transition = l;
        }
      }
      return !1;
    }
    function YD(e) {
      l2.push(e), tf || (tf = !0, y2(Nl, function() {
        return As(), null;
      }));
    }
    function WD() {
      if (Du === null)
        return !1;
      var e = o2;
      o2 = null;
      var n = Du, l = uh;
      if (Du = null, uh = Le, (hn & (ba | Sl)) !== Xr)
        throw new Error("Cannot flush passive effects while already rendering.");
      u2 = !0, w0 = !1, ls(l);
      var o = hn;
      hn |= Sl, fD(n.current), oD(n, n.current, l, e);
      {
        var c = l2;
        l2 = [];
        for (var h = 0; h < c.length; h++) {
          var E = c[h];
          B_(n, E);
        }
      }
      Wp(), kw(n.current, !0), hn = o, Eu(), w0 ? n === C0 ? Gd++ : (Gd = 0, C0 = n) : Gd = 0, u2 = !1, w0 = !1, $p(n);
      {
        var T = n.current.stateNode;
        T.effectDuration = 0, T.passiveEffectDuration = 0;
      }
      return !0;
    }
    function Mw(e) {
      return Bd !== null && Bd.has(e);
    }
    function BD(e) {
      Bd === null ? Bd = /* @__PURE__ */ new Set([e]) : Bd.add(e);
    }
    function GD(e) {
      x0 || (x0 = !0, i2 = e);
    }
    var QD = GD;
    function _w(e, n, l) {
      var o = Zc(l, n), c = Tx(e, o, Ht), h = wu(e, c, Ht), E = ti();
      h !== null && (ou(h, Ht, E), Ci(h, E));
    }
    function Yn(e, n, l) {
      if ($_(l), vh(!1), e.tag === b) {
        _w(e, e, l);
        return;
      }
      var o = null;
      for (o = n; o !== null; ) {
        if (o.tag === b) {
          _w(o, e, l);
          return;
        } else if (o.tag === x) {
          var c = o.type, h = o.stateNode;
          if (typeof c.getDerivedStateFromError == "function" || typeof h.componentDidCatch == "function" && !Mw(h)) {
            var E = Zc(l, e), T = zS(o, E, Ht), M = wu(o, T, Ht), z = ti();
            M !== null && (ou(M, Ht, z), Ci(M, z));
            return;
          }
        }
        o = o.return;
      }
      v(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, l);
    }
    function XD(e, n, l) {
      var o = e.pingCache;
      o !== null && o.delete(n);
      var c = ti();
      ld(e, l), ik(e), ei === e && hs(Kr, l) && (Zr === ah || Zr === g0 && vs(Kr) && Dr() - a2 < vw ? nf(e, Le) : E0 = en(E0, l)), Ci(e, c);
    }
    function Dw(e, n) {
      n === wn && (n = kD(e));
      var l = ti(), o = Ei(e, n);
      o !== null && (ou(o, n, l), Ci(o, l));
    }
    function KD(e) {
      var n = e.memoizedState, l = wn;
      n !== null && (l = n.retryLane), Dw(e, l);
    }
    function ZD(e, n) {
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
      o !== null && o.delete(n), Dw(e, l);
    }
    function JD(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : RD(e / 1960) * 1960;
    }
    function ek() {
      if (ch > _D)
        throw ch = 0, s2 = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Gd > DD && (Gd = 0, C0 = null, v("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function tk() {
      ql.flushLegacyContextWarning(), ql.flushPendingUnsafeLifecycleWarnings();
    }
    function kw(e, n) {
      On(e), _0(e, mo, ED), n && _0(e, il, xD), _0(e, mo, gD), n && _0(e, il, SD), qn();
    }
    function _0(e, n, l) {
      for (var o = e, c = null; o !== null; ) {
        var h = o.subtreeFlags & n;
        o !== c && o.child !== null && h !== At ? o = o.child : ((o.flags & n) !== At && l(o), o.sibling !== null ? o = o.sibling : o = c = o.return);
      }
    }
    var D0 = null;
    function Ow(e) {
      {
        if ((hn & ba) !== Xr || !(e.mode & ln))
          return;
        var n = e.tag;
        if (n !== C && n !== b && n !== x && n !== g && n !== H && n !== F && n !== B)
          return;
        var l = Bt(e) || "ReactComponent";
        if (D0 !== null) {
          if (D0.has(l))
            return;
          D0.add(l);
        } else
          D0 = /* @__PURE__ */ new Set([l]);
        var o = Hr;
        try {
          On(e), v("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          o ? On(e) : qn();
        }
      }
    }
    var v2;
    {
      var nk = null;
      v2 = function(e, n, l) {
        var o = Pw(nk, n);
        try {
          return qx(e, n, l);
        } catch (h) {
          if (vM() || h !== null && typeof h == "object" && typeof h.then == "function")
            throw h;
          if (Uy(), WE(), Xx(e, n), Pw(n, o), n.mode & bn && mS(n), ho(null, qx, null, e, n, l), Al()) {
            var c = lc();
            typeof c == "object" && c !== null && c._suppressLogging && typeof h == "object" && h !== null && !h._suppressLogging && (h._suppressLogging = !0);
          }
          throw h;
        }
      };
    }
    var Aw = !1, h2;
    h2 = /* @__PURE__ */ new Set();
    function rk(e) {
      if (Zi && !WM())
        switch (e.tag) {
          case g:
          case H:
          case B: {
            var n = dr && Bt(dr) || "Unknown", l = n;
            if (!h2.has(l)) {
              h2.add(l);
              var o = Bt(e) || "Unknown";
              v("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", o, n, n);
            }
            break;
          }
          case x: {
            Aw || (v("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), Aw = !0);
            break;
          }
        }
    }
    function ph(e, n) {
      if (za) {
        var l = e.memoizedUpdaters;
        l.forEach(function(o) {
          Tc(e, o, n);
        });
      }
    }
    var m2 = {};
    function y2(e, n) {
      {
        var l = Zl.current;
        return l !== null ? (l.push(n), m2) : Np(e, n);
      }
    }
    function Lw(e) {
      if (e !== m2)
        return Em(e);
    }
    function zw() {
      return Zl.current !== null;
    }
    function ak(e) {
      {
        if (e.mode & ln) {
          if (!fw())
            return;
        } else if (!TD() || hn !== Xr || e.tag !== g && e.tag !== H && e.tag !== B)
          return;
        if (Zl.current === null) {
          var n = Hr;
          try {
            On(e), v(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Bt(e));
          } finally {
            n ? On(e) : qn();
          }
        }
      }
    }
    function ik(e) {
      e.tag !== Su && fw() && Zl.current === null && v(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function vh(e) {
      yw = e;
    }
    var El = null, Qd = null, lk = function(e) {
      El = e;
    };
    function Xd(e) {
      {
        if (El === null)
          return e;
        var n = El(e);
        return n === void 0 ? e : n.current;
      }
    }
    function g2(e) {
      return Xd(e);
    }
    function S2(e) {
      {
        if (El === null)
          return e;
        var n = El(e);
        if (n === void 0) {
          if (e != null && typeof e.render == "function") {
            var l = Xd(e.render);
            if (e.render !== l) {
              var o = {
                $$typeof: De,
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
    function Nw(e, n) {
      {
        if (El === null)
          return !1;
        var l = e.elementType, o = n.type, c = !1, h = typeof o == "object" && o !== null ? o.$$typeof : null;
        switch (e.tag) {
          case x: {
            typeof o == "function" && (c = !0);
            break;
          }
          case g: {
            (typeof o == "function" || h === Vt) && (c = !0);
            break;
          }
          case H: {
            (h === De || h === Vt) && (c = !0);
            break;
          }
          case F:
          case B: {
            (h === qt || h === Vt) && (c = !0);
            break;
          }
          default:
            return !1;
        }
        if (c) {
          var E = El(l);
          if (E !== void 0 && E === El(o))
            return !0;
        }
        return !1;
      }
    }
    function Uw(e) {
      {
        if (El === null || typeof WeakSet != "function")
          return;
        Qd === null && (Qd = /* @__PURE__ */ new WeakSet()), Qd.add(e);
      }
    }
    var ok = function(e, n) {
      {
        if (El === null)
          return;
        var l = n.staleFamilies, o = n.updatedFamilies;
        As(), Os(function() {
          E2(e.current, o, l);
        });
      }
    }, sk = function(e, n) {
      {
        if (e.context !== qi)
          return;
        As(), Os(function() {
          hh(n, e, null, null);
        });
      }
    };
    function E2(e, n, l) {
      {
        var o = e.alternate, c = e.child, h = e.sibling, E = e.tag, T = e.type, M = null;
        switch (E) {
          case g:
          case B:
          case x:
            M = T;
            break;
          case H:
            M = T.render;
            break;
        }
        if (El === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var z = !1, N = !1;
        if (M !== null) {
          var te = El(M);
          te !== void 0 && (l.has(te) ? N = !0 : n.has(te) && (E === x ? N = !0 : z = !0));
        }
        if (Qd !== null && (Qd.has(e) || o !== null && Qd.has(o)) && (N = !0), N && (e._debugNeedsRemount = !0), N || z) {
          var J = Ei(e, Ht);
          J !== null && Jr(J, e, Ht, jn);
        }
        c !== null && !N && E2(c, n, l), h !== null && E2(h, n, l);
      }
    }
    var uk = function(e, n) {
      {
        var l = /* @__PURE__ */ new Set(), o = new Set(n.map(function(c) {
          return c.current;
        }));
        return x2(e.current, o, l), l;
      }
    };
    function x2(e, n, l) {
      {
        var o = e.child, c = e.sibling, h = e.tag, E = e.type, T = null;
        switch (h) {
          case g:
          case B:
          case x:
            T = E;
            break;
          case H:
            T = E.render;
            break;
        }
        var M = !1;
        T !== null && n.has(T) && (M = !0), M ? ck(e, l) : o !== null && x2(o, n, l), c !== null && x2(c, n, l);
      }
    }
    function ck(e, n) {
      {
        var l = fk(e, n);
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
    function fk(e, n) {
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
        var jw = Object.preventExtensions({});
      } catch {
        w2 = !0;
      }
    }
    function dk(e, n, l, o) {
      this.tag = e, this.key = l, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = n, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = o, this.flags = At, this.subtreeFlags = At, this.deletions = null, this.lanes = Le, this.childLanes = Le, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !w2 && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var Yi = function(e, n, l, o) {
      return new dk(e, n, l, o);
    };
    function C2(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function pk(e) {
      return typeof e == "function" && !C2(e) && e.defaultProps === void 0;
    }
    function vk(e) {
      if (typeof e == "function")
        return C2(e) ? x : g;
      if (e != null) {
        var n = e.$$typeof;
        if (n === De)
          return H;
        if (n === qt)
          return F;
      }
      return C;
    }
    function af(e, n) {
      var l = e.alternate;
      l === null ? (l = Yi(e.tag, n, e.key, e.mode), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l._debugSource = e._debugSource, l._debugOwner = e._debugOwner, l._debugHookTypes = e._debugHookTypes, l.alternate = e, e.alternate = l) : (l.pendingProps = n, l.type = e.type, l.flags = At, l.subtreeFlags = At, l.deletions = null, l.actualDuration = 0, l.actualStartTime = -1), l.flags = e.flags & yr, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue;
      var o = e.dependencies;
      switch (l.dependencies = o === null ? null : {
        lanes: o.lanes,
        firstContext: o.firstContext
      }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.selfBaseDuration = e.selfBaseDuration, l.treeBaseDuration = e.treeBaseDuration, l._debugNeedsRemount = e._debugNeedsRemount, l.tag) {
        case C:
        case g:
        case B:
          l.type = Xd(e.type);
          break;
        case x:
          l.type = g2(e.type);
          break;
        case H:
          l.type = S2(e.type);
          break;
      }
      return l;
    }
    function hk(e, n) {
      e.flags &= yr | er;
      var l = e.alternate;
      if (l === null)
        e.childLanes = Le, e.lanes = n, e.child = null, e.subtreeFlags = At, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
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
    function mk(e, n, l) {
      var o;
      return e === Ry ? (o = ln, n === !0 && (o |= zn, o |= Tn)) : o = Lt, za && (o |= bn), Yi(b, null, null, o);
    }
    function b2(e, n, l, o, c, h) {
      var E = C, T = e;
      if (typeof e == "function")
        C2(e) ? (E = x, T = g2(T)) : T = Xd(T);
      else if (typeof e == "string")
        E = D;
      else
        e: switch (e) {
          case Ma:
            return Au(l.children, c, h, n);
          case oa:
            E = L, c |= zn, (c & ln) !== Lt && (c |= Tn);
            break;
          case Wa:
            return yk(l, c, h, n);
          case Je:
            return gk(l, c, h, n);
          case ft:
            return Sk(l, c, h, n);
          case Gn:
            return Fw(l, c, h, n);
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
                  E = q;
                  break e;
                case W:
                  E = U;
                  break e;
                case De:
                  E = H, T = S2(T);
                  break e;
                case qt:
                  E = F;
                  break e;
                case Vt:
                  E = ie, T = null;
                  break e;
              }
            var M = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (M += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var z = o ? Bt(o) : null;
              z && (M += `

Check the render method of \`` + z + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + M));
          }
        }
      var N = Yi(E, l, n, c);
      return N.elementType = e, N.type = T, N.lanes = h, N._debugOwner = o, N;
    }
    function T2(e, n, l) {
      var o = null;
      o = e._owner;
      var c = e.type, h = e.key, E = e.props, T = b2(c, h, E, o, n, l);
      return T._debugSource = e._source, T._debugOwner = e._owner, T;
    }
    function Au(e, n, l, o) {
      var c = Yi(A, e, o, n);
      return c.lanes = l, c;
    }
    function yk(e, n, l, o) {
      typeof e.id != "string" && v('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var c = Yi($, e, o, n | bn);
      return c.elementType = Wa, c.lanes = l, c.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, c;
    }
    function gk(e, n, l, o) {
      var c = Yi(V, e, o, n);
      return c.elementType = Je, c.lanes = l, c;
    }
    function Sk(e, n, l, o) {
      var c = Yi(ne, e, o, n);
      return c.elementType = ft, c.lanes = l, c;
    }
    function Fw(e, n, l, o) {
      var c = Yi(G, e, o, n);
      c.elementType = Gn, c.lanes = l;
      var h = {
        isHidden: !1
      };
      return c.stateNode = h, c;
    }
    function R2(e, n, l) {
      var o = Yi(_, e, null, n);
      return o.lanes = l, o;
    }
    function Ek() {
      var e = Yi(D, null, null, Lt);
      return e.elementType = "DELETED", e;
    }
    function xk(e) {
      var n = Yi(j, null, null, Lt);
      return n.stateNode = e, n;
    }
    function M2(e, n, l) {
      var o = e.children !== null ? e.children : [], c = Yi(R, o, e.key, n);
      return c.lanes = l, c.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, c;
    }
    function Pw(e, n) {
      return e === null && (e = Yi(C, null, null, Lt)), e.tag = n.tag, e.key = n.key, e.elementType = n.elementType, e.type = n.type, e.stateNode = n.stateNode, e.return = n.return, e.child = n.child, e.sibling = n.sibling, e.index = n.index, e.ref = n.ref, e.pendingProps = n.pendingProps, e.memoizedProps = n.memoizedProps, e.updateQueue = n.updateQueue, e.memoizedState = n.memoizedState, e.dependencies = n.dependencies, e.mode = n.mode, e.flags = n.flags, e.subtreeFlags = n.subtreeFlags, e.deletions = n.deletions, e.lanes = n.lanes, e.childLanes = n.childLanes, e.alternate = n.alternate, e.actualDuration = n.actualDuration, e.actualStartTime = n.actualStartTime, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration, e._debugSource = n._debugSource, e._debugOwner = n._debugOwner, e._debugNeedsRemount = n._debugNeedsRemount, e._debugHookTypes = n._debugHookTypes, e;
    }
    function wk(e, n, l, o, c) {
      this.tag = n, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = sg, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = wn, this.eventTimes = bc(Le), this.expirationTimes = bc(jn), this.pendingLanes = Le, this.suspendedLanes = Le, this.pingedLanes = Le, this.expiredLanes = Le, this.mutableReadLanes = Le, this.finishedLanes = Le, this.entangledLanes = Le, this.entanglements = bc(Le), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var h = this.pendingUpdatersLaneMap = [], E = 0; E < ss; E++)
          h.push(/* @__PURE__ */ new Set());
      }
      switch (n) {
        case Ry:
          this._debugRootType = l ? "hydrateRoot()" : "createRoot()";
          break;
        case Su:
          this._debugRootType = l ? "hydrate()" : "render()";
          break;
      }
    }
    function $w(e, n, l, o, c, h, E, T, M, z) {
      var N = new wk(e, n, l, T, M), te = mk(n, h);
      N.current = te, te.stateNode = N;
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
      return $g(te), N;
    }
    var _2 = "18.3.1";
    function Ck(e, n, l) {
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
    var D2, k2;
    D2 = !1, k2 = {};
    function Hw(e) {
      if (!e)
        return qi;
      var n = tu(e), l = iM(n);
      if (n.tag === x) {
        var o = n.type;
        if (Lo(o))
          return vE(n, o, l);
      }
      return l;
    }
    function bk(e, n) {
      {
        var l = tu(e);
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
          var h = Bt(l) || "Component";
          if (!k2[h]) {
            k2[h] = !0;
            var E = Hr;
            try {
              On(c), l.mode & zn ? v("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", n, n, h) : v("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", n, n, h);
            } finally {
              E ? On(E) : qn();
            }
          }
        }
        return c.stateNode;
      }
    }
    function Vw(e, n, l, o, c, h, E, T) {
      var M = !1, z = null;
      return $w(e, n, M, z, l, o, c, h, E);
    }
    function Iw(e, n, l, o, c, h, E, T, M, z) {
      var N = !0, te = $w(l, o, N, e, c, h, E, T, M);
      te.context = Hw(null);
      var J = te.current, ve = ti(), ge = ku(J), xe = Ms(ve, ge);
      return xe.callback = n ?? null, wu(J, xe, ge), OD(te, ge, ve), te;
    }
    function hh(e, n, l, o) {
      Fp(n, e);
      var c = n.current, h = ti(), E = ku(c);
      nr(E);
      var T = Hw(l);
      n.context === null ? n.context = T : n.pendingContext = T, Zi && Hr !== null && !D2 && (D2 = !0, v(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Bt(Hr) || "Unknown"));
      var M = Ms(h, E);
      M.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (typeof o != "function" && v("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", o), M.callback = o);
      var z = wu(c, M, E);
      return z !== null && (Jr(z, c, E, h), Hy(z, c, E)), E;
    }
    function k0(e) {
      var n = e.current;
      return n.child ? n.child.tag === D ? n.child.stateNode : n.child.stateNode : null;
    }
    function Tk(e) {
      switch (e.tag) {
        case b: {
          var n = e.stateNode;
          if (sd(n)) {
            var l = Rm(n);
            ND(n, l);
          }
          break;
        }
        case V: {
          Os(function() {
            var c = Ei(e, Ht);
            if (c !== null) {
              var h = ti();
              Jr(c, e, Ht, h);
            }
          });
          var o = Ht;
          O2(e, o);
          break;
        }
      }
    }
    function qw(e, n) {
      var l = e.memoizedState;
      l !== null && l.dehydrated !== null && (l.retryLane = Om(l.retryLane, n));
    }
    function O2(e, n) {
      qw(e, n);
      var l = e.alternate;
      l && qw(l, n);
    }
    function Rk(e) {
      if (e.tag === V) {
        var n = gc, l = Ei(e, n);
        if (l !== null) {
          var o = ti();
          Jr(l, e, n, o);
        }
        O2(e, n);
      }
    }
    function Mk(e) {
      if (e.tag === V) {
        var n = ku(e), l = Ei(e, n);
        if (l !== null) {
          var o = ti();
          Jr(l, e, n, o);
        }
        O2(e, n);
      }
    }
    function Yw(e) {
      var n = Xn(e);
      return n === null ? null : n.stateNode;
    }
    var Ww = function(e) {
      return null;
    };
    function _k(e) {
      return Ww(e);
    }
    var Bw = function(e) {
      return !1;
    };
    function Dk(e) {
      return Bw(e);
    }
    var Gw = null, Qw = null, Xw = null, Kw = null, Zw = null, Jw = null, eC = null, tC = null, nC = null;
    {
      var rC = function(e, n, l) {
        var o = n[l], c = rn(e) ? e.slice() : Qt({}, e);
        return l + 1 === n.length ? (rn(c) ? c.splice(o, 1) : delete c[o], c) : (c[o] = rC(e[o], n, l + 1), c);
      }, aC = function(e, n) {
        return rC(e, n, 0);
      }, iC = function(e, n, l, o) {
        var c = n[o], h = rn(e) ? e.slice() : Qt({}, e);
        if (o + 1 === n.length) {
          var E = l[o];
          h[E] = h[c], rn(h) ? h.splice(c, 1) : delete h[c];
        } else
          h[c] = iC(
            // $FlowFixMe number or string is fine here
            e[c],
            n,
            l,
            o + 1
          );
        return h;
      }, lC = function(e, n, l) {
        if (n.length !== l.length) {
          m("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var o = 0; o < l.length - 1; o++)
            if (n[o] !== l[o]) {
              m("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return iC(e, n, l, 0);
      }, oC = function(e, n, l, o) {
        if (l >= n.length)
          return o;
        var c = n[l], h = rn(e) ? e.slice() : Qt({}, e);
        return h[c] = oC(e[c], n, l + 1, o), h;
      }, sC = function(e, n, l) {
        return oC(e, n, 0, l);
      }, A2 = function(e, n) {
        for (var l = e.memoizedState; l !== null && n > 0; )
          l = l.next, n--;
        return l;
      };
      Gw = function(e, n, l, o) {
        var c = A2(e, n);
        if (c !== null) {
          var h = sC(c.memoizedState, l, o);
          c.memoizedState = h, c.baseState = h, e.memoizedProps = Qt({}, e.memoizedProps);
          var E = Ei(e, Ht);
          E !== null && Jr(E, e, Ht, jn);
        }
      }, Qw = function(e, n, l) {
        var o = A2(e, n);
        if (o !== null) {
          var c = aC(o.memoizedState, l);
          o.memoizedState = c, o.baseState = c, e.memoizedProps = Qt({}, e.memoizedProps);
          var h = Ei(e, Ht);
          h !== null && Jr(h, e, Ht, jn);
        }
      }, Xw = function(e, n, l, o) {
        var c = A2(e, n);
        if (c !== null) {
          var h = lC(c.memoizedState, l, o);
          c.memoizedState = h, c.baseState = h, e.memoizedProps = Qt({}, e.memoizedProps);
          var E = Ei(e, Ht);
          E !== null && Jr(E, e, Ht, jn);
        }
      }, Kw = function(e, n, l) {
        e.pendingProps = sC(e.memoizedProps, n, l), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Ei(e, Ht);
        o !== null && Jr(o, e, Ht, jn);
      }, Zw = function(e, n) {
        e.pendingProps = aC(e.memoizedProps, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var l = Ei(e, Ht);
        l !== null && Jr(l, e, Ht, jn);
      }, Jw = function(e, n, l) {
        e.pendingProps = lC(e.memoizedProps, n, l), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Ei(e, Ht);
        o !== null && Jr(o, e, Ht, jn);
      }, eC = function(e) {
        var n = Ei(e, Ht);
        n !== null && Jr(n, e, Ht, jn);
      }, tC = function(e) {
        Ww = e;
      }, nC = function(e) {
        Bw = e;
      };
    }
    function kk(e) {
      var n = Aa(e);
      return n === null ? null : n.stateNode;
    }
    function Ok(e) {
      return null;
    }
    function Ak() {
      return Hr;
    }
    function Lk(e) {
      var n = e.findFiberByHostInstance, l = s.ReactCurrentDispatcher;
      return au({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: Gw,
        overrideHookStateDeletePath: Qw,
        overrideHookStateRenamePath: Xw,
        overrideProps: Kw,
        overridePropsDeletePath: Zw,
        overridePropsRenamePath: Jw,
        setErrorHandler: tC,
        setSuspenseHandler: nC,
        scheduleUpdate: eC,
        currentDispatcherRef: l,
        findHostInstanceByFiber: kk,
        findFiberByHostInstance: n || Ok,
        // React Refresh
        findHostInstancesForRefresh: uk,
        scheduleRefresh: ok,
        scheduleRoot: sk,
        setRefreshHandler: lk,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: Ak,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: _2
      });
    }
    var uC = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function L2(e) {
      this._internalRoot = e;
    }
    O0.prototype.render = L2.prototype.render = function(e) {
      var n = this._internalRoot;
      if (n === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? v("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : A0(arguments[1]) ? v("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && v("You passed a second argument to root.render(...) but it only accepts one argument.");
        var l = n.containerInfo;
        if (l.nodeType !== hr) {
          var o = Yw(n.current);
          o && o.parentNode !== l && v("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      hh(e, n, null, null);
    }, O0.prototype.unmount = L2.prototype.unmount = function() {
      typeof arguments[0] == "function" && v("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var n = e.containerInfo;
        xw() && v("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Os(function() {
          hh(null, e, null, null);
        }), uE(n);
      }
    };
    function zk(e, n) {
      if (!A0(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      cC(e);
      var l = !1, o = !1, c = "", h = uC;
      n != null && (n.hydrate ? m("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof n == "object" && n !== null && n.$$typeof === Ar && v(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (c = n.identifierPrefix), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.transitionCallbacks !== void 0 && n.transitionCallbacks);
      var E = Vw(e, Ry, null, l, o, c, h);
      Sy(E.current, e);
      var T = e.nodeType === hr ? e.parentNode : e;
      return xv(T), new L2(E);
    }
    function O0(e) {
      this._internalRoot = e;
    }
    function Nk(e) {
      e && Hm(e);
    }
    O0.prototype.unstable_scheduleHydration = Nk;
    function Uk(e, n, l) {
      if (!A0(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      cC(e), n === void 0 && v("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var o = l ?? null, c = l != null && l.hydratedSources || null, h = !1, E = !1, T = "", M = uC;
      l != null && (l.unstable_strictMode === !0 && (h = !0), l.identifierPrefix !== void 0 && (T = l.identifierPrefix), l.onRecoverableError !== void 0 && (M = l.onRecoverableError));
      var z = Iw(n, null, e, Ry, o, h, E, T, M);
      if (Sy(z.current, e), xv(e), c)
        for (var N = 0; N < c.length; N++) {
          var te = c[N];
          $M(z, te);
        }
      return new O0(z);
    }
    function A0(e) {
      return !!(e && (e.nodeType === Da || e.nodeType === Ol || e.nodeType === Cp));
    }
    function mh(e) {
      return !!(e && (e.nodeType === Da || e.nodeType === Ol || e.nodeType === Cp || e.nodeType === hr && e.nodeValue === " react-mount-point-unstable "));
    }
    function cC(e) {
      e.nodeType === Da && e.tagName && e.tagName.toUpperCase() === "BODY" && v("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Av(e) && (e._reactRootContainer ? v("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : v("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var jk = s.ReactCurrentOwner, fC;
    fC = function(e) {
      if (e._reactRootContainer && e.nodeType !== hr) {
        var n = Yw(e._reactRootContainer.current);
        n && n.parentNode !== e && v("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var l = !!e._reactRootContainer, o = z2(e), c = !!(o && yu(o));
      c && !l && v("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Da && e.tagName && e.tagName.toUpperCase() === "BODY" && v("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function z2(e) {
      return e ? e.nodeType === Ol ? e.documentElement : e.firstChild : null;
    }
    function dC() {
    }
    function Fk(e, n, l, o, c) {
      if (c) {
        if (typeof o == "function") {
          var h = o;
          o = function() {
            var J = k0(E);
            h.call(J);
          };
        }
        var E = Iw(
          n,
          o,
          e,
          Su,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          dC
        );
        e._reactRootContainer = E, Sy(E.current, e);
        var T = e.nodeType === hr ? e.parentNode : e;
        return xv(T), Os(), E;
      } else {
        for (var M; M = e.lastChild; )
          e.removeChild(M);
        if (typeof o == "function") {
          var z = o;
          o = function() {
            var J = k0(N);
            z.call(J);
          };
        }
        var N = Vw(
          e,
          Su,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          dC
        );
        e._reactRootContainer = N, Sy(N.current, e);
        var te = e.nodeType === hr ? e.parentNode : e;
        return xv(te), Os(function() {
          hh(n, N, l, o);
        }), N;
      }
    }
    function Pk(e, n) {
      e !== null && typeof e != "function" && v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", n, e);
    }
    function L0(e, n, l, o, c) {
      fC(l), Pk(c === void 0 ? null : c, "render");
      var h = l._reactRootContainer, E;
      if (!h)
        E = Fk(l, n, e, c, o);
      else {
        if (E = h, typeof c == "function") {
          var T = c;
          c = function() {
            var M = k0(E);
            T.call(M);
          };
        }
        hh(n, E, e, c);
      }
      return k0(E);
    }
    var pC = !1;
    function $k(e) {
      {
        pC || (pC = !0, v("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var n = jk.current;
        if (n !== null && n.stateNode !== null) {
          var l = n.stateNode._warnedAboutRefsInRender;
          l || v("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Sn(n.type) || "A component"), n.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Da ? e : bk(e, "findDOMNode");
    }
    function Hk(e, n, l) {
      if (v("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !mh(n))
        throw new Error("Target container is not a DOM element.");
      {
        var o = Av(n) && n._reactRootContainer === void 0;
        o && v("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return L0(null, e, n, !0, l);
    }
    function Vk(e, n, l) {
      if (v("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !mh(n))
        throw new Error("Target container is not a DOM element.");
      {
        var o = Av(n) && n._reactRootContainer === void 0;
        o && v("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return L0(null, e, n, !1, l);
    }
    function Ik(e, n, l, o) {
      if (v("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !mh(l))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !O1(e))
        throw new Error("parentComponent must be a valid React Component");
      return L0(e, n, l, !1, o);
    }
    var vC = !1;
    function qk(e) {
      if (vC || (vC = !0, v("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !mh(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var n = Av(e) && e._reactRootContainer === void 0;
        n && v("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var l = z2(e), o = l && !yu(l);
          o && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Os(function() {
          L0(null, null, e, !1, function() {
            e._reactRootContainer = null, uE(e);
          });
        }), !0;
      } else {
        {
          var c = z2(e), h = !!(c && yu(c)), E = e.nodeType === Da && mh(e.parentNode) && !!e.parentNode._reactRootContainer;
          h && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", E ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    na(Tk), su(Rk), jm(Mk), Dc(yi), av(zm), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && v("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), Tf(WT), k1(f2, UD, Os);
    function Yk(e, n) {
      var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!A0(n))
        throw new Error("Target container is not a DOM element.");
      return Ck(e, n, null, l);
    }
    function Wk(e, n, l, o) {
      return Ik(e, n, l, o);
    }
    var N2 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [yu, Md, Ey, Ks, Rf, f2]
    };
    function Bk(e, n) {
      return N2.usingClientEntryPoint || v('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), zk(e, n);
    }
    function Gk(e, n, l) {
      return N2.usingClientEntryPoint || v('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Uk(e, n, l);
    }
    function Qk(e) {
      return xw() && v("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Os(e);
    }
    var Xk = Lk({
      findFiberByHostInstance: Ic,
      bundleType: 1,
      version: _2,
      rendererPackageName: "react-dom"
    });
    if (!Xk && nt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var hC = window.location.protocol;
      /^(https?|file):$/.test(hC) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (hC === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Ti.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = N2, Ti.createPortal = Yk, Ti.createRoot = Bk, Ti.findDOMNode = $k, Ti.flushSync = Qk, Ti.hydrate = Hk, Ti.hydrateRoot = Gk, Ti.render = Vk, Ti.unmountComponentAtNode = qk, Ti.unstable_batchedUpdates = f2, Ti.unstable_renderSubtreeIntoContainer = Wk, Ti.version = _2, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })()), Ti;
}
var jC;
function SN() {
  if (jC) return V0.exports;
  jC = 1;
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
  return process.env.NODE_ENV === "production" ? (t(), V0.exports = yN()) : V0.exports = gN(), V0.exports;
}
var FC;
function EN() {
  if (FC) return ep;
  FC = 1;
  var t = SN();
  if (process.env.NODE_ENV === "production")
    ep.createRoot = t.createRoot, ep.hydrateRoot = t.hydrateRoot;
  else {
    var a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    ep.createRoot = function(s, f) {
      a.usingClientEntryPoint = !0;
      try {
        return t.createRoot(s, f);
      } finally {
        a.usingClientEntryPoint = !1;
      }
    }, ep.hydrateRoot = function(s, f, p) {
      a.usingClientEntryPoint = !0;
      try {
        return t.hydrateRoot(s, f, p);
      } finally {
        a.usingClientEntryPoint = !1;
      }
    };
  }
  return ep;
}
var xN = EN();
const Jl = (t) => typeof t != "number" ? "N/A" : `${Math.round(t)} ms`;
function wN({ viewport: t }) {
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
  }), [f, p] = ia.useState(() => localStorage.getItem("s3d-debug-open") === "true"), [m, v] = ia.useState(() => localStorage.getItem("s3d-wireframe") === "true"), [S, g] = ia.useState(() => localStorage.getItem("s3d-debug-normals") === "true"), [x, C] = ia.useState(() => localStorage.getItem("s3d-debug-axis") === "true"), [b, R] = ia.useState(() => localStorage.getItem("s3d-fill-enabled") !== "false"), [D, _] = ia.useState(() => localStorage.getItem("s3d-shade-enabled") !== "false"), [A, L] = ia.useState(() => localStorage.getItem("s3d-fog-enabled") !== "false");
  ia.useEffect(() => {
    t && (t.wireframe = m, t.debugNormals = S, t.debugAxis = x, t.fillEnabled = b, t.shadeEnabled = D, t.fogEnabled = A);
  }, [t]), ia.useEffect(() => {
    const B = () => {
      t && (v(!!t.wireframe), g(!!t.debugNormals), C(!!t.debugAxis), R(!!t.fillEnabled), _(!!t.shadeEnabled), L(!!t.fogEnabled));
    };
    B();
    const ie = setInterval(B, 500);
    return () => clearInterval(ie);
  }, [t]), ia.useEffect(() => {
    localStorage.setItem("s3d-debug-open", f);
  }, [f]), ia.useEffect(() => {
    localStorage.setItem("s3d-wireframe", m);
  }, [m]), ia.useEffect(() => {
    localStorage.setItem("s3d-debug-normals", S);
  }, [S]), ia.useEffect(() => {
    localStorage.setItem("s3d-debug-axis", x);
  }, [x]), ia.useEffect(() => {
    localStorage.setItem("s3d-fill-enabled", b);
  }, [b]), ia.useEffect(() => {
    localStorage.setItem("s3d-shade-enabled", D);
  }, [D]), ia.useEffect(() => {
    localStorage.setItem("s3d-fog-enabled", A);
  }, [A]), ia.useEffect(() => {
    let B = 0;
    const ie = setInterval(() => {
      if (t) {
        const X = t.lastRenderStats || {};
        B = Math.max(B, X.fps || 0), s({
          fps: X.fps || 0,
          maxFps: B,
          totalObjects: X.totalObjects || 0,
          visibleObjects: X.visibleObjects || 0,
          faces: X.faces || 0,
          sortTime: X.sortTime || 0,
          cullTime: X.cullTime || 0,
          groupTime: X.groupTime || 0,
          processTime: X.processTime || 0,
          updateTime: X.updateTime || 0,
          retrieveTime: X.retrieveTime || 0,
          frameTime: X.frameTime || 0,
          drawCalls: X.drawCalls || 0,
          dt: X.dt || 0,
          fillDrawCalls: X.fillDrawCalls || 0,
          fogDrawCalls: X.fogDrawCalls || 0,
          shadeDrawCalls: X.shadeDrawCalls || 0,
          drawCallsTotal: X.drawCallsTotal || 0,
          fillRasterTime: X.fillRasterTime || 0,
          shadeRasterTime: X.shadeRasterTime || 0,
          fogSortTime: X.fogSortTime || 0,
          fogRasterTime: X.fogRasterTime || 0
        });
      }
    }, 100);
    return () => clearInterval(ie);
  }, [t]);
  const U = () => {
    const B = !m;
    v(B), t && (t.wireframe = B), window.dispatchEvent(
      new CustomEvent("s3d-wireframe-change", {
        detail: { enabled: B }
      })
    );
  }, q = () => {
    const B = !S;
    g(B), t && (t.debugNormals = B);
  }, H = () => {
    const B = !x;
    C(B), t && (t.debugAxis = B);
  }, $ = () => {
    const B = !b;
    R(B), t && (t.fillEnabled = B);
  }, V = () => {
    const B = !D;
    _(B), t && (t.shadeEnabled = B);
  }, F = () => {
    const B = !A;
    L(B), t && (t.fogEnabled = B);
  };
  return /* @__PURE__ */ We.jsxs("div", { className: "s3d-debug-container s3d-flex s3d-flex-col s3d-items-end s3d-gap-2 s3d-font-sans", children: [
    /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-gap-2", children: [
      /* @__PURE__ */ We.jsx(
        "button",
        {
          onClick: U,
          title: "Toggle Wireframe",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${m ? "s3d-bg-blue-600/80 s3d-border-blue-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ We.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ We.jsx(
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
      /* @__PURE__ */ We.jsx(
        "button",
        {
          onClick: q,
          title: "Toggle Debug Normals",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${S ? "s3d-bg-amber-600/80 s3d-border-amber-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ We.jsxs(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: [
                /* @__PURE__ */ We.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M4 17l8-10 8 10H4z"
                  }
                ),
                /* @__PURE__ */ We.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 13V3" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ We.jsx(
        "button",
        {
          onClick: H,
          title: "Toggle Debug Axis",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${x ? "s3d-bg-purple-600/80 s3d-border-purple-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ We.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ We.jsx(
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
      /* @__PURE__ */ We.jsx(
        "button",
        {
          onClick: $,
          title: "Toggle Fill Pass",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${b ? "s3d-bg-cyan-600/80 s3d-border-cyan-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ We.jsx("svg", { className: "s3d-w-5 s3d-h-5", viewBox: "0 0 24 24", children: /* @__PURE__ */ We.jsx(
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
      /* @__PURE__ */ We.jsx(
        "button",
        {
          onClick: V,
          title: "Toggle Shade Pass",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${D ? "s3d-bg-orange-600/80 s3d-border-orange-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ We.jsxs(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: [
                /* @__PURE__ */ We.jsx("circle", { cx: "12", cy: "12", r: "9" }),
                /* @__PURE__ */ We.jsx("path", { d: "M12 3a9 9 0 000 18z", fill: "currentColor", stroke: "none" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ We.jsx(
        "button",
        {
          onClick: F,
          title: "Toggle Fog Pass",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${A ? "s3d-bg-sky-600/80 s3d-border-sky-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ We.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ We.jsx("path", { strokeLinecap: "round", d: "M3 8h13M3 12h17M3 16h10" })
            }
          )
        }
      ),
      /* @__PURE__ */ We.jsx(
        "button",
        {
          onClick: () => p(!f),
          title: "Toggle Diagnostics",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${f ? "s3d-bg-emerald-600/80 s3d-border-emerald-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ We.jsx(
            "svg",
            {
              className: "s3d-w-5 s3d-h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 1.5,
              children: /* @__PURE__ */ We.jsx(
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
    f && /* @__PURE__ */ We.jsxs("div", { className: "s3d-w-56 s3d-bg-slate-900/85 s3d-backdrop-blur-md s3d-border s3d-border-slate-700/50 s3d-rounded-lg s3d-p-3 s3d-shadow-2xl s3d-text-slate-300 s3d-flex s3d-flex-col", children: [
      /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-justify-between s3d-items-center s3d-border-b s3d-border-slate-800 s3d-pb-1.5 s3d-mb-2.5", children: [
        /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide s3d-font-semibold", children: "FPS / FPS (max)" }),
        /* @__PURE__ */ We.jsxs("span", { className: "s3d-font-mono s3d-text-sm s3d-font-semibold", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-emerald-400", children: a.fps }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500", children: " / " }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-200", children: a.maxFps })
        ] })
      ] }),
      /* @__PURE__ */ We.jsxs("div", { className: "s3d-grid s3d-grid-cols-2 s3d-gap-y-2.5 s3d-gap-x-3 s3d-text-[11px]", children: [
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Device DPR" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: (window.devicePixelRatio || 1).toFixed(2) })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Scene)" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.totalObjects })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Screen)" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.visibleObjects })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Faces (screen)" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.faces })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Update" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Jl(a.updateTime) })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Retrieval" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Jl(a.retrieveTime) })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Object Culling" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Jl(a.cullTime) })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Layer Grouping" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Jl(a.groupTime) })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Process Meshes" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Jl(a.processTime) })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Sort Faces" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Jl(a.sortTime) })
        ] }),
        /* @__PURE__ */ We.jsx("div", { className: "s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5" }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fill Draw Calls" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.fillDrawCalls })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fill Time (Cpu)" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Jl(a.fillRasterTime) })
        ] }),
        /* @__PURE__ */ We.jsx("div", { className: "s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5" }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Shade Draw Calls" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.shadeDrawCalls })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Shade Time (Cpu)" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Jl(a.shadeRasterTime) })
        ] }),
        /* @__PURE__ */ We.jsx("div", { className: "s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5" }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col s3d-col-span-2", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fog Sort" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Jl(a.fogSortTime) })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fog Draw Calls" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.fogDrawCalls })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Fog Time (Cpu)" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Jl(a.fogRasterTime) })
        ] }),
        /* @__PURE__ */ We.jsx("div", { className: "s3d-col-span-2 s3d-border-t s3d-border-slate-800 s3d-my-0.5" }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Draw Calls" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: a.drawCallsTotal })
        ] }),
        /* @__PURE__ */ We.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ We.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Frame Time (gpu)" }),
          /* @__PURE__ */ We.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Jl(a.frameTime) })
        ] })
      ] })
    ] })
  ] });
}
function CN(t) {
  if (!t || !t.canvas) {
    console.error("showDebug: Invalid viewport parameter passed.");
    return;
  }
  const s = t.canvas.parentElement || document.body;
  s && getComputedStyle(s).position === "static" && (s.style.position = "relative");
  let f = s.querySelector("#s3d-debug-root");
  if (f)
    return;
  f = document.createElement("div"), f.id = "s3d-debug-root", f.className = "s3d-absolute s3d-top-4 s3d-right-4 s3d-z-[99999]", s.appendChild(f), xN.createRoot(f).render(/* @__PURE__ */ We.jsx(wN, { viewport: t }));
}
const MN = window.scaliaEngine = {
  config: l1,
  Game: VC,
  GameObject: ai,
  Component: $n,
  Camera: nT,
  CameraComponent: pr,
  MeshComponent: lr,
  TransformComponent: v1,
  SpriteRenderer: S3,
  glMatrix: pz,
  PathRenderer: E3,
  TextRenderer: x3,
  Plane: rT,
  Box: aT,
  Cone: iT,
  Ball: T3,
  Light: ip,
  Canvas2dViewport: fT,
  showDebug: CN,
  registerShader: Yz,
  whiteFillShade: R3,
  // Built-in shaderType keys, to set on a MeshComponent as `meshRenderer.shaderType`.
  ShaderType: {
    ALBEDO_FLAT: cp,
    TEXTURE: fp,
    EMISSIVE_FLAT: Hh,
    GOURAUD_SHADE: dp
  },
  shaders: {
    flat: { fill: Iu, shade: z3 },
    texture: { fill: L3, shade: ap },
    gouraud: { fill: Iu, shade: ap }
  }
};
export {
  MN as default
};
