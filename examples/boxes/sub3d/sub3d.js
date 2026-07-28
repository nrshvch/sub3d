const yd = {
  depthSortingMask: parseInt("11", 2),
  //bitmask, bit per layer
  layerStrokeMask: parseInt("11", 2),
  //bitmask, bit per layer
  layerClearMask: parseInt("11", 2),
  //bitmask, bit per layer
  layersCount: 1,
  debug: !0
};
function gC() {
  this.now = Date.now();
}
var i2 = gC.prototype;
i2.time = 0;
i2.now = 0;
i2.dt = 60;
function SC() {
  this.gameObjects = [];
}
var _y = SC.prototype;
_y.gameObjects = null;
_y.addGameObject = function(n) {
  this.gameObjects[this.gameObjects.length++] = n, n.setScene(this);
};
_y.removeGameObject = function(n) {
  this.gameObjects[this.gameObjects.indexOf(n)] = this.gameObjects[this.gameObjects.length - 1], this.gameObjects.length -= 1;
};
_y.retrieve = function() {
  const n = [], l = [];
  let s = 0, d = 0;
  for (let h = this.gameObjects.length - 1; h >= 0; h--)
    n[d++] = this.gameObjects[h];
  for (; d > 0; ) {
    const h = n[--d];
    h.transform.updateWorldMatrix(), l[s++] = h;
    const m = h.transform.children;
    for (let p = m.length - 1; p >= 0; p--)
      n[d++] = m[p].gameObject;
  }
  return l;
};
function EC(n) {
  this.time = new gC(), this.list = [], this.scene = new SC(), this.lastTickTime = 0;
}
var Sd = EC.prototype;
Sd.scene = null;
Sd.time = null;
Sd.tickRegister = function(n) {
  n._tickerIndex === void 0 && (n._tickerIndex = this.list.length, this.list.push(n));
};
Sd.tickUnregister = function(n) {
  const l = n._tickerIndex;
  if (l === void 0) return;
  const s = this.list.pop();
  s !== n && (this.list[l] = s, s._tickerIndex = l), n._tickerIndex = void 0;
};
Sd.update = function(n) {
  const l = this.list;
  for (let s = 0; s < l.length; s++)
    l[s].tick(n);
};
Sd.tick = function() {
  for (var n = Date.now(), l = 0, s = n - this.time.now, d = this.time.dt; s >= d && (s -= d, this.time.now += d, this.time.time += d, this.update(this.time), !(l++ > 200)); )
    ;
};
function CC() {
  this.world = new EC();
  var n = this.world;
  this.tick = function l() {
    const s = performance.now();
    n.tick(), n.lastTickTime = performance.now() - s, requestAnimationFrame(l);
  };
}
var ky = CC.prototype;
ky.world = null;
ky.render = null;
ky.run = function() {
  this.tick();
};
ky.rafHandler = null;
function ur() {
}
var Dy = ur.prototype;
Dy.gameObject = null;
Dy.enabled = !0;
Dy.setGameObject = function(n) {
  this.gameObject = n;
};
Dy.unsetGameObject = function() {
  this.gameObject = null;
};
function N_(n, l, s, d, h, m) {
  return n[l] = m[0] * s + m[4] * d + m[8] * h + m[12], n[l + 1] = m[1] * s + m[5] * d + m[9] * h + m[13], n[l + 2] = m[2] * s + m[6] * d + m[10] * h + m[14], n;
}
function U_(n, l, s, d, h, m) {
  return n[l] = m[0] * s + m[4] * d + m[8] * h + m[12], n[l + 1] = m[1] * s + m[5] * d + m[9] * h + m[13], n;
}
function Oy(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = l[4], C = l[5], T = l[6], b = l[7], R = l[8], D = l[9], k = l[10], z = l[11], A = l[12], N = l[13], X = l[14], K = l[15], Y = s[0], P = s[1], $ = s[2], Q = s[3];
  return n[0] = Y * d + P * E + $ * R + Q * A, n[1] = Y * h + P * C + $ * D + Q * N, n[2] = Y * m + P * T + $ * k + Q * X, n[3] = Y * p + P * b + $ * z + Q * K, Y = s[4], P = s[5], $ = s[6], Q = s[7], n[4] = Y * d + P * E + $ * R + Q * A, n[5] = Y * h + P * C + $ * D + Q * N, n[6] = Y * m + P * T + $ * k + Q * X, n[7] = Y * p + P * b + $ * z + Q * K, Y = s[8], P = s[9], $ = s[10], Q = s[11], n[8] = Y * d + P * E + $ * R + Q * A, n[9] = Y * h + P * C + $ * D + Q * N, n[10] = Y * m + P * T + $ * k + Q * X, n[11] = Y * p + P * b + $ * z + Q * K, Y = s[12], P = s[13], $ = s[14], Q = s[15], n[12] = Y * d + P * E + $ * R + Q * A, n[13] = Y * h + P * C + $ * D + Q * N, n[14] = Y * m + P * T + $ * k + Q * X, n[15] = Y * p + P * b + $ * z + Q * K, n;
}
var Ct = 1e-6, En = typeof Float32Array < "u" ? Float32Array : Array, Bl = Math.random, wC = "zyx";
function ko(n) {
  return n >= 0 ? Math.round(n) : n % 0.5 === 0 ? Math.floor(n) : Math.round(n);
}
function j_(n) {
  En = n;
}
var F_ = Math.PI / 180, H_ = 180 / Math.PI;
function P_(n) {
  return n * F_;
}
function $_(n) {
  return n * H_;
}
function V_(n, l) {
  var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ct;
  return Math.abs(n - l) <= s * Math.max(1, Math.abs(n), Math.abs(l));
}
const q_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: wC,
  get ARRAY_TYPE() {
    return En;
  },
  EPSILON: Ct,
  RANDOM: Bl,
  equals: V_,
  round: ko,
  setMatrixArrayType: j_,
  toDegree: $_,
  toRadian: P_
}, Symbol.toStringTag, { value: "Module" }));
function I_() {
  var n = new En(4);
  return En != Float32Array && (n[1] = 0, n[2] = 0), n[0] = 1, n[3] = 1, n;
}
function Y_(n) {
  var l = new En(4);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l;
}
function W_(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n;
}
function B_(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function Q_(n, l, s, d) {
  var h = new En(4);
  return h[0] = n, h[1] = l, h[2] = s, h[3] = d, h;
}
function G_(n, l, s, d, h) {
  return n[0] = l, n[1] = s, n[2] = d, n[3] = h, n;
}
function X_(n, l) {
  if (n === l) {
    var s = l[1];
    n[1] = l[2], n[2] = s;
  } else
    n[0] = l[0], n[1] = l[2], n[2] = l[1], n[3] = l[3];
  return n;
}
function K_(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = s * m - h * d;
  return p ? (p = 1 / p, n[0] = m * p, n[1] = -d * p, n[2] = -h * p, n[3] = s * p, n) : null;
}
function Z_(n, l) {
  var s = l[0];
  return n[0] = l[3], n[1] = -l[1], n[2] = -l[2], n[3] = s, n;
}
function J_(n) {
  return n[0] * n[3] - n[2] * n[1];
}
function TC(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = s[0], C = s[1], T = s[2], b = s[3];
  return n[0] = d * E + m * C, n[1] = h * E + p * C, n[2] = d * T + m * b, n[3] = h * T + p * b, n;
}
function ek(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = Math.sin(s), C = Math.cos(s);
  return n[0] = d * C + m * E, n[1] = h * C + p * E, n[2] = d * -E + m * C, n[3] = h * -E + p * C, n;
}
function tk(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = s[0], C = s[1];
  return n[0] = d * E, n[1] = h * E, n[2] = m * C, n[3] = p * C, n;
}
function nk(n, l) {
  var s = Math.sin(l), d = Math.cos(l);
  return n[0] = d, n[1] = s, n[2] = -s, n[3] = d, n;
}
function rk(n, l) {
  return n[0] = l[0], n[1] = 0, n[2] = 0, n[3] = l[1], n;
}
function ak(n) {
  return "mat2(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
function ik(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3]);
}
function lk(n, l, s, d) {
  return n[2] = d[2] / d[0], s[0] = d[0], s[1] = d[1], s[3] = d[3] - n[2] * s[1], [n, l, s];
}
function ok(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n;
}
function RC(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n[2] = l[2] - s[2], n[3] = l[3] - s[3], n;
}
function uk(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2] && n[3] === l[3];
}
function sk(n, l) {
  var s = n[0], d = n[1], h = n[2], m = n[3], p = l[0], E = l[1], C = l[2], T = l[3];
  return Math.abs(s - p) <= Ct * Math.max(1, Math.abs(s), Math.abs(p)) && Math.abs(d - E) <= Ct * Math.max(1, Math.abs(d), Math.abs(E)) && Math.abs(h - C) <= Ct * Math.max(1, Math.abs(h), Math.abs(C)) && Math.abs(m - T) <= Ct * Math.max(1, Math.abs(m), Math.abs(T));
}
function ck(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n[3] = l[3] * s, n;
}
function fk(n, l, s, d) {
  return n[0] = l[0] + s[0] * d, n[1] = l[1] + s[1] * d, n[2] = l[2] + s[2] * d, n[3] = l[3] + s[3] * d, n;
}
var dk = TC, vk = RC;
const pk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: lk,
  add: ok,
  adjoint: Z_,
  clone: Y_,
  copy: W_,
  create: I_,
  determinant: J_,
  equals: sk,
  exactEquals: uk,
  frob: ik,
  fromRotation: nk,
  fromScaling: rk,
  fromValues: Q_,
  identity: B_,
  invert: K_,
  mul: dk,
  multiply: TC,
  multiplyScalar: ck,
  multiplyScalarAndAdd: fk,
  rotate: ek,
  scale: tk,
  set: G_,
  str: ak,
  sub: vk,
  subtract: RC,
  transpose: X_
}, Symbol.toStringTag, { value: "Module" }));
function hk() {
  var n = new En(6);
  return En != Float32Array && (n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0), n[0] = 1, n[3] = 1, n;
}
function mk(n) {
  var l = new En(6);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l[4] = n[4], l[5] = n[5], l;
}
function yk(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = l[4], n[5] = l[5], n;
}
function gk(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function Sk(n, l, s, d, h, m) {
  var p = new En(6);
  return p[0] = n, p[1] = l, p[2] = s, p[3] = d, p[4] = h, p[5] = m, p;
}
function Ek(n, l, s, d, h, m, p) {
  return n[0] = l, n[1] = s, n[2] = d, n[3] = h, n[4] = m, n[5] = p, n;
}
function Ck(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = l[4], E = l[5], C = s * m - d * h;
  return C ? (C = 1 / C, n[0] = m * C, n[1] = -d * C, n[2] = -h * C, n[3] = s * C, n[4] = (h * E - m * p) * C, n[5] = (d * p - s * E) * C, n) : null;
}
function wk(n) {
  return n[0] * n[3] - n[1] * n[2];
}
function bC(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = l[4], C = l[5], T = s[0], b = s[1], R = s[2], D = s[3], k = s[4], z = s[5];
  return n[0] = d * T + m * b, n[1] = h * T + p * b, n[2] = d * R + m * D, n[3] = h * R + p * D, n[4] = d * k + m * z + E, n[5] = h * k + p * z + C, n;
}
function Tk(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = l[4], C = l[5], T = Math.sin(s), b = Math.cos(s);
  return n[0] = d * b + m * T, n[1] = h * b + p * T, n[2] = d * -T + m * b, n[3] = h * -T + p * b, n[4] = E, n[5] = C, n;
}
function Rk(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = l[4], C = l[5], T = s[0], b = s[1];
  return n[0] = d * T, n[1] = h * T, n[2] = m * b, n[3] = p * b, n[4] = E, n[5] = C, n;
}
function bk(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = l[4], C = l[5], T = s[0], b = s[1];
  return n[0] = d, n[1] = h, n[2] = m, n[3] = p, n[4] = d * T + m * b + E, n[5] = h * T + p * b + C, n;
}
function xk(n, l) {
  var s = Math.sin(l), d = Math.cos(l);
  return n[0] = d, n[1] = s, n[2] = -s, n[3] = d, n[4] = 0, n[5] = 0, n;
}
function Mk(n, l) {
  return n[0] = l[0], n[1] = 0, n[2] = 0, n[3] = l[1], n[4] = 0, n[5] = 0, n;
}
function _k(n, l) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = l[0], n[5] = l[1], n;
}
function kk(n) {
  return "mat2d(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ")";
}
function Dk(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + 1);
}
function Ok(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n[4] = l[4] + s[4], n[5] = l[5] + s[5], n;
}
function xC(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n[2] = l[2] - s[2], n[3] = l[3] - s[3], n[4] = l[4] - s[4], n[5] = l[5] - s[5], n;
}
function zk(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n[3] = l[3] * s, n[4] = l[4] * s, n[5] = l[5] * s, n;
}
function Lk(n, l, s, d) {
  return n[0] = l[0] + s[0] * d, n[1] = l[1] + s[1] * d, n[2] = l[2] + s[2] * d, n[3] = l[3] + s[3] * d, n[4] = l[4] + s[4] * d, n[5] = l[5] + s[5] * d, n;
}
function Ak(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2] && n[3] === l[3] && n[4] === l[4] && n[5] === l[5];
}
function Nk(n, l) {
  var s = n[0], d = n[1], h = n[2], m = n[3], p = n[4], E = n[5], C = l[0], T = l[1], b = l[2], R = l[3], D = l[4], k = l[5];
  return Math.abs(s - C) <= Ct * Math.max(1, Math.abs(s), Math.abs(C)) && Math.abs(d - T) <= Ct * Math.max(1, Math.abs(d), Math.abs(T)) && Math.abs(h - b) <= Ct * Math.max(1, Math.abs(h), Math.abs(b)) && Math.abs(m - R) <= Ct * Math.max(1, Math.abs(m), Math.abs(R)) && Math.abs(p - D) <= Ct * Math.max(1, Math.abs(p), Math.abs(D)) && Math.abs(E - k) <= Ct * Math.max(1, Math.abs(E), Math.abs(k));
}
var Uk = bC, jk = xC;
const Fk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Ok,
  clone: mk,
  copy: yk,
  create: hk,
  determinant: wk,
  equals: Nk,
  exactEquals: Ak,
  frob: Dk,
  fromRotation: xk,
  fromScaling: Mk,
  fromTranslation: _k,
  fromValues: Sk,
  identity: gk,
  invert: Ck,
  mul: Uk,
  multiply: bC,
  multiplyScalar: zk,
  multiplyScalarAndAdd: Lk,
  rotate: Tk,
  scale: Rk,
  set: Ek,
  str: kk,
  sub: jk,
  subtract: xC,
  translate: bk
}, Symbol.toStringTag, { value: "Module" }));
function MC() {
  var n = new En(9);
  return En != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[0] = 1, n[4] = 1, n[8] = 1, n;
}
function Hk(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[4], n[4] = l[5], n[5] = l[6], n[6] = l[8], n[7] = l[9], n[8] = l[10], n;
}
function Pk(n) {
  var l = new En(9);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l[4] = n[4], l[5] = n[5], l[6] = n[6], l[7] = n[7], l[8] = n[8], l;
}
function $k(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = l[4], n[5] = l[5], n[6] = l[6], n[7] = l[7], n[8] = l[8], n;
}
function Vk(n, l, s, d, h, m, p, E, C) {
  var T = new En(9);
  return T[0] = n, T[1] = l, T[2] = s, T[3] = d, T[4] = h, T[5] = m, T[6] = p, T[7] = E, T[8] = C, T;
}
function qk(n, l, s, d, h, m, p, E, C, T) {
  return n[0] = l, n[1] = s, n[2] = d, n[3] = h, n[4] = m, n[5] = p, n[6] = E, n[7] = C, n[8] = T, n;
}
function Ik(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 1, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function Yk(n, l) {
  if (n === l) {
    var s = l[1], d = l[2], h = l[5];
    n[1] = l[3], n[2] = l[6], n[3] = s, n[5] = l[7], n[6] = d, n[7] = h;
  } else
    n[0] = l[0], n[1] = l[3], n[2] = l[6], n[3] = l[1], n[4] = l[4], n[5] = l[7], n[6] = l[2], n[7] = l[5], n[8] = l[8];
  return n;
}
function Wk(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = l[4], E = l[5], C = l[6], T = l[7], b = l[8], R = b * p - E * T, D = -b * m + E * C, k = T * m - p * C, z = s * R + d * D + h * k;
  return z ? (z = 1 / z, n[0] = R * z, n[1] = (-b * d + h * T) * z, n[2] = (E * d - h * p) * z, n[3] = D * z, n[4] = (b * s - h * C) * z, n[5] = (-E * s + h * m) * z, n[6] = k * z, n[7] = (-T * s + d * C) * z, n[8] = (p * s - d * m) * z, n) : null;
}
function Bk(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = l[4], E = l[5], C = l[6], T = l[7], b = l[8];
  return n[0] = p * b - E * T, n[1] = h * T - d * b, n[2] = d * E - h * p, n[3] = E * C - m * b, n[4] = s * b - h * C, n[5] = h * m - s * E, n[6] = m * T - p * C, n[7] = d * C - s * T, n[8] = s * p - d * m, n;
}
function Qk(n) {
  var l = n[0], s = n[1], d = n[2], h = n[3], m = n[4], p = n[5], E = n[6], C = n[7], T = n[8];
  return l * (T * m - p * C) + s * (-T * h + p * E) + d * (C * h - m * E);
}
function _C(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = l[4], C = l[5], T = l[6], b = l[7], R = l[8], D = s[0], k = s[1], z = s[2], A = s[3], N = s[4], X = s[5], K = s[6], Y = s[7], P = s[8];
  return n[0] = D * d + k * p + z * T, n[1] = D * h + k * E + z * b, n[2] = D * m + k * C + z * R, n[3] = A * d + N * p + X * T, n[4] = A * h + N * E + X * b, n[5] = A * m + N * C + X * R, n[6] = K * d + Y * p + P * T, n[7] = K * h + Y * E + P * b, n[8] = K * m + Y * C + P * R, n;
}
function Gk(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = l[4], C = l[5], T = l[6], b = l[7], R = l[8], D = s[0], k = s[1];
  return n[0] = d, n[1] = h, n[2] = m, n[3] = p, n[4] = E, n[5] = C, n[6] = D * d + k * p + T, n[7] = D * h + k * E + b, n[8] = D * m + k * C + R, n;
}
function Xk(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = l[4], C = l[5], T = l[6], b = l[7], R = l[8], D = Math.sin(s), k = Math.cos(s);
  return n[0] = k * d + D * p, n[1] = k * h + D * E, n[2] = k * m + D * C, n[3] = k * p - D * d, n[4] = k * E - D * h, n[5] = k * C - D * m, n[6] = T, n[7] = b, n[8] = R, n;
}
function Kk(n, l, s) {
  var d = s[0], h = s[1];
  return n[0] = d * l[0], n[1] = d * l[1], n[2] = d * l[2], n[3] = h * l[3], n[4] = h * l[4], n[5] = h * l[5], n[6] = l[6], n[7] = l[7], n[8] = l[8], n;
}
function Zk(n, l) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 1, n[5] = 0, n[6] = l[0], n[7] = l[1], n[8] = 1, n;
}
function Jk(n, l) {
  var s = Math.sin(l), d = Math.cos(l);
  return n[0] = d, n[1] = s, n[2] = 0, n[3] = -s, n[4] = d, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function e5(n, l) {
  return n[0] = l[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = l[1], n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function t5(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = 0, n[3] = l[2], n[4] = l[3], n[5] = 0, n[6] = l[4], n[7] = l[5], n[8] = 1, n;
}
function n5(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = s + s, E = d + d, C = h + h, T = s * p, b = d * p, R = d * E, D = h * p, k = h * E, z = h * C, A = m * p, N = m * E, X = m * C;
  return n[0] = 1 - R - z, n[3] = b - X, n[6] = D + N, n[1] = b + X, n[4] = 1 - T - z, n[7] = k - A, n[2] = D - N, n[5] = k + A, n[8] = 1 - T - R, n;
}
function r5(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = l[4], E = l[5], C = l[6], T = l[7], b = l[8], R = l[9], D = l[10], k = l[11], z = l[12], A = l[13], N = l[14], X = l[15], K = s * E - d * p, Y = s * C - h * p, P = s * T - m * p, $ = d * C - h * E, Q = d * T - m * E, re = h * T - m * C, Re = b * A - R * z, he = b * N - D * z, G = b * X - k * z, se = R * N - D * A, fe = R * X - k * A, ae = D * X - k * N, q = K * ae - Y * fe + P * se + $ * G - Q * he + re * Re;
  return q ? (q = 1 / q, n[0] = (E * ae - C * fe + T * se) * q, n[1] = (C * G - p * ae - T * he) * q, n[2] = (p * fe - E * G + T * Re) * q, n[3] = (h * fe - d * ae - m * se) * q, n[4] = (s * ae - h * G + m * he) * q, n[5] = (d * G - s * fe - m * Re) * q, n[6] = (A * re - N * Q + X * $) * q, n[7] = (N * P - z * re - X * Y) * q, n[8] = (z * Q - A * P + X * K) * q, n) : null;
}
function a5(n, l, s) {
  return n[0] = 2 / l, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = -2 / s, n[5] = 0, n[6] = -1, n[7] = 1, n[8] = 1, n;
}
function i5(n) {
  return "mat3(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ", " + n[8] + ")";
}
function l5(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + n[6] * n[6] + n[7] * n[7] + n[8] * n[8]);
}
function o5(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n[4] = l[4] + s[4], n[5] = l[5] + s[5], n[6] = l[6] + s[6], n[7] = l[7] + s[7], n[8] = l[8] + s[8], n;
}
function kC(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n[2] = l[2] - s[2], n[3] = l[3] - s[3], n[4] = l[4] - s[4], n[5] = l[5] - s[5], n[6] = l[6] - s[6], n[7] = l[7] - s[7], n[8] = l[8] - s[8], n;
}
function u5(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n[3] = l[3] * s, n[4] = l[4] * s, n[5] = l[5] * s, n[6] = l[6] * s, n[7] = l[7] * s, n[8] = l[8] * s, n;
}
function s5(n, l, s, d) {
  return n[0] = l[0] + s[0] * d, n[1] = l[1] + s[1] * d, n[2] = l[2] + s[2] * d, n[3] = l[3] + s[3] * d, n[4] = l[4] + s[4] * d, n[5] = l[5] + s[5] * d, n[6] = l[6] + s[6] * d, n[7] = l[7] + s[7] * d, n[8] = l[8] + s[8] * d, n;
}
function c5(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2] && n[3] === l[3] && n[4] === l[4] && n[5] === l[5] && n[6] === l[6] && n[7] === l[7] && n[8] === l[8];
}
function f5(n, l) {
  var s = n[0], d = n[1], h = n[2], m = n[3], p = n[4], E = n[5], C = n[6], T = n[7], b = n[8], R = l[0], D = l[1], k = l[2], z = l[3], A = l[4], N = l[5], X = l[6], K = l[7], Y = l[8];
  return Math.abs(s - R) <= Ct * Math.max(1, Math.abs(s), Math.abs(R)) && Math.abs(d - D) <= Ct * Math.max(1, Math.abs(d), Math.abs(D)) && Math.abs(h - k) <= Ct * Math.max(1, Math.abs(h), Math.abs(k)) && Math.abs(m - z) <= Ct * Math.max(1, Math.abs(m), Math.abs(z)) && Math.abs(p - A) <= Ct * Math.max(1, Math.abs(p), Math.abs(A)) && Math.abs(E - N) <= Ct * Math.max(1, Math.abs(E), Math.abs(N)) && Math.abs(C - X) <= Ct * Math.max(1, Math.abs(C), Math.abs(X)) && Math.abs(T - K) <= Ct * Math.max(1, Math.abs(T), Math.abs(K)) && Math.abs(b - Y) <= Ct * Math.max(1, Math.abs(b), Math.abs(Y));
}
var d5 = _C, v5 = kC;
const p5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: o5,
  adjoint: Bk,
  clone: Pk,
  copy: $k,
  create: MC,
  determinant: Qk,
  equals: f5,
  exactEquals: c5,
  frob: l5,
  fromMat2d: t5,
  fromMat4: Hk,
  fromQuat: n5,
  fromRotation: Jk,
  fromScaling: e5,
  fromTranslation: Zk,
  fromValues: Vk,
  identity: Ik,
  invert: Wk,
  mul: d5,
  multiply: _C,
  multiplyScalar: u5,
  multiplyScalarAndAdd: s5,
  normalFromMat4: r5,
  projection: a5,
  rotate: Xk,
  scale: Kk,
  set: qk,
  str: i5,
  sub: v5,
  subtract: kC,
  translate: Gk,
  transpose: Yk
}, Symbol.toStringTag, { value: "Module" }));
function h5() {
  var n = new En(16);
  return En != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0), n[0] = 1, n[5] = 1, n[10] = 1, n[15] = 1, n;
}
function m5(n) {
  var l = new En(16);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l[4] = n[4], l[5] = n[5], l[6] = n[6], l[7] = n[7], l[8] = n[8], l[9] = n[9], l[10] = n[10], l[11] = n[11], l[12] = n[12], l[13] = n[13], l[14] = n[14], l[15] = n[15], l;
}
function y5(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = l[4], n[5] = l[5], n[6] = l[6], n[7] = l[7], n[8] = l[8], n[9] = l[9], n[10] = l[10], n[11] = l[11], n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15], n;
}
function g5(n, l, s, d, h, m, p, E, C, T, b, R, D, k, z, A) {
  var N = new En(16);
  return N[0] = n, N[1] = l, N[2] = s, N[3] = d, N[4] = h, N[5] = m, N[6] = p, N[7] = E, N[8] = C, N[9] = T, N[10] = b, N[11] = R, N[12] = D, N[13] = k, N[14] = z, N[15] = A, N;
}
function S5(n, l, s, d, h, m, p, E, C, T, b, R, D, k, z, A, N) {
  return n[0] = l, n[1] = s, n[2] = d, n[3] = h, n[4] = m, n[5] = p, n[6] = E, n[7] = C, n[8] = T, n[9] = b, n[10] = R, n[11] = D, n[12] = k, n[13] = z, n[14] = A, n[15] = N, n;
}
function l2(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function E5(n, l) {
  if (n === l) {
    var s = l[1], d = l[2], h = l[3], m = l[6], p = l[7], E = l[11];
    n[1] = l[4], n[2] = l[8], n[3] = l[12], n[4] = s, n[6] = l[9], n[7] = l[13], n[8] = d, n[9] = m, n[11] = l[14], n[12] = h, n[13] = p, n[14] = E;
  } else
    n[0] = l[0], n[1] = l[4], n[2] = l[8], n[3] = l[12], n[4] = l[1], n[5] = l[5], n[6] = l[9], n[7] = l[13], n[8] = l[2], n[9] = l[6], n[10] = l[10], n[11] = l[14], n[12] = l[3], n[13] = l[7], n[14] = l[11], n[15] = l[15];
  return n;
}
function DC(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = l[4], E = l[5], C = l[6], T = l[7], b = l[8], R = l[9], D = l[10], k = l[11], z = l[12], A = l[13], N = l[14], X = l[15], K = s * E - d * p, Y = s * C - h * p, P = s * T - m * p, $ = d * C - h * E, Q = d * T - m * E, re = h * T - m * C, Re = b * A - R * z, he = b * N - D * z, G = b * X - k * z, se = R * N - D * A, fe = R * X - k * A, ae = D * X - k * N, q = K * ae - Y * fe + P * se + $ * G - Q * he + re * Re;
  return q ? (q = 1 / q, n[0] = (E * ae - C * fe + T * se) * q, n[1] = (h * fe - d * ae - m * se) * q, n[2] = (A * re - N * Q + X * $) * q, n[3] = (D * Q - R * re - k * $) * q, n[4] = (C * G - p * ae - T * he) * q, n[5] = (s * ae - h * G + m * he) * q, n[6] = (N * P - z * re - X * Y) * q, n[7] = (b * re - D * P + k * Y) * q, n[8] = (p * fe - E * G + T * Re) * q, n[9] = (d * G - s * fe - m * Re) * q, n[10] = (z * Q - A * P + X * K) * q, n[11] = (R * P - b * Q - k * K) * q, n[12] = (E * he - p * se - C * Re) * q, n[13] = (s * se - d * he + h * Re) * q, n[14] = (A * Y - z * $ - N * K) * q, n[15] = (b * $ - R * Y + D * K) * q, n) : null;
}
function C5(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = l[4], E = l[5], C = l[6], T = l[7], b = l[8], R = l[9], D = l[10], k = l[11], z = l[12], A = l[13], N = l[14], X = l[15], K = s * E - d * p, Y = s * C - h * p, P = s * T - m * p, $ = d * C - h * E, Q = d * T - m * E, re = h * T - m * C, Re = b * A - R * z, he = b * N - D * z, G = b * X - k * z, se = R * N - D * A, fe = R * X - k * A, ae = D * X - k * N;
  return n[0] = E * ae - C * fe + T * se, n[1] = h * fe - d * ae - m * se, n[2] = A * re - N * Q + X * $, n[3] = D * Q - R * re - k * $, n[4] = C * G - p * ae - T * he, n[5] = s * ae - h * G + m * he, n[6] = N * P - z * re - X * Y, n[7] = b * re - D * P + k * Y, n[8] = p * fe - E * G + T * Re, n[9] = d * G - s * fe - m * Re, n[10] = z * Q - A * P + X * K, n[11] = R * P - b * Q - k * K, n[12] = E * he - p * se - C * Re, n[13] = s * se - d * he + h * Re, n[14] = A * Y - z * $ - N * K, n[15] = b * $ - R * Y + D * K, n;
}
function w5(n) {
  var l = n[0], s = n[1], d = n[2], h = n[3], m = n[4], p = n[5], E = n[6], C = n[7], T = n[8], b = n[9], R = n[10], D = n[11], k = n[12], z = n[13], A = n[14], N = n[15], X = l * p - s * m, K = l * E - d * m, Y = s * E - d * p, P = T * z - b * k, $ = T * A - R * k, Q = b * A - R * z, re = l * Q - s * $ + d * P, Re = m * Q - p * $ + E * P, he = T * Y - b * K + R * X, G = k * Y - z * K + A * X;
  return C * re - h * Re + N * he - D * G;
}
function OC(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = l[4], C = l[5], T = l[6], b = l[7], R = l[8], D = l[9], k = l[10], z = l[11], A = l[12], N = l[13], X = l[14], K = l[15], Y = s[0], P = s[1], $ = s[2], Q = s[3];
  return n[0] = Y * d + P * E + $ * R + Q * A, n[1] = Y * h + P * C + $ * D + Q * N, n[2] = Y * m + P * T + $ * k + Q * X, n[3] = Y * p + P * b + $ * z + Q * K, Y = s[4], P = s[5], $ = s[6], Q = s[7], n[4] = Y * d + P * E + $ * R + Q * A, n[5] = Y * h + P * C + $ * D + Q * N, n[6] = Y * m + P * T + $ * k + Q * X, n[7] = Y * p + P * b + $ * z + Q * K, Y = s[8], P = s[9], $ = s[10], Q = s[11], n[8] = Y * d + P * E + $ * R + Q * A, n[9] = Y * h + P * C + $ * D + Q * N, n[10] = Y * m + P * T + $ * k + Q * X, n[11] = Y * p + P * b + $ * z + Q * K, Y = s[12], P = s[13], $ = s[14], Q = s[15], n[12] = Y * d + P * E + $ * R + Q * A, n[13] = Y * h + P * C + $ * D + Q * N, n[14] = Y * m + P * T + $ * k + Q * X, n[15] = Y * p + P * b + $ * z + Q * K, n;
}
function r2(n, l, s) {
  var d = s[0], h = s[1], m = s[2], p, E, C, T, b, R, D, k, z, A, N, X;
  return l === n ? (n[12] = l[0] * d + l[4] * h + l[8] * m + l[12], n[13] = l[1] * d + l[5] * h + l[9] * m + l[13], n[14] = l[2] * d + l[6] * h + l[10] * m + l[14], n[15] = l[3] * d + l[7] * h + l[11] * m + l[15]) : (p = l[0], E = l[1], C = l[2], T = l[3], b = l[4], R = l[5], D = l[6], k = l[7], z = l[8], A = l[9], N = l[10], X = l[11], n[0] = p, n[1] = E, n[2] = C, n[3] = T, n[4] = b, n[5] = R, n[6] = D, n[7] = k, n[8] = z, n[9] = A, n[10] = N, n[11] = X, n[12] = p * d + b * h + z * m + l[12], n[13] = E * d + R * h + A * m + l[13], n[14] = C * d + D * h + N * m + l[14], n[15] = T * d + k * h + X * m + l[15]), n;
}
function zC(n, l, s) {
  var d = s[0], h = s[1], m = s[2];
  return n[0] = l[0] * d, n[1] = l[1] * d, n[2] = l[2] * d, n[3] = l[3] * d, n[4] = l[4] * h, n[5] = l[5] * h, n[6] = l[6] * h, n[7] = l[7] * h, n[8] = l[8] * m, n[9] = l[9] * m, n[10] = l[10] * m, n[11] = l[11] * m, n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15], n;
}
function T5(n, l, s, d) {
  var h = d[0], m = d[1], p = d[2], E = Math.sqrt(h * h + m * m + p * p), C, T, b, R, D, k, z, A, N, X, K, Y, P, $, Q, re, Re, he, G, se, fe, ae, q, we;
  return E < Ct ? null : (E = 1 / E, h *= E, m *= E, p *= E, C = Math.sin(s), T = Math.cos(s), b = 1 - T, R = l[0], D = l[1], k = l[2], z = l[3], A = l[4], N = l[5], X = l[6], K = l[7], Y = l[8], P = l[9], $ = l[10], Q = l[11], re = h * h * b + T, Re = m * h * b + p * C, he = p * h * b - m * C, G = h * m * b - p * C, se = m * m * b + T, fe = p * m * b + h * C, ae = h * p * b + m * C, q = m * p * b - h * C, we = p * p * b + T, n[0] = R * re + A * Re + Y * he, n[1] = D * re + N * Re + P * he, n[2] = k * re + X * Re + $ * he, n[3] = z * re + K * Re + Q * he, n[4] = R * G + A * se + Y * fe, n[5] = D * G + N * se + P * fe, n[6] = k * G + X * se + $ * fe, n[7] = z * G + K * se + Q * fe, n[8] = R * ae + A * q + Y * we, n[9] = D * ae + N * q + P * we, n[10] = k * ae + X * q + $ * we, n[11] = z * ae + K * q + Q * we, l !== n && (n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15]), n);
}
function R5(n, l, s) {
  var d = Math.sin(s), h = Math.cos(s), m = l[4], p = l[5], E = l[6], C = l[7], T = l[8], b = l[9], R = l[10], D = l[11];
  return l !== n && (n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15]), n[4] = m * h + T * d, n[5] = p * h + b * d, n[6] = E * h + R * d, n[7] = C * h + D * d, n[8] = T * h - m * d, n[9] = b * h - p * d, n[10] = R * h - E * d, n[11] = D * h - C * d, n;
}
function b5(n, l, s) {
  var d = Math.sin(s), h = Math.cos(s), m = l[0], p = l[1], E = l[2], C = l[3], T = l[8], b = l[9], R = l[10], D = l[11];
  return l !== n && (n[4] = l[4], n[5] = l[5], n[6] = l[6], n[7] = l[7], n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15]), n[0] = m * h - T * d, n[1] = p * h - b * d, n[2] = E * h - R * d, n[3] = C * h - D * d, n[8] = m * d + T * h, n[9] = p * d + b * h, n[10] = E * d + R * h, n[11] = C * d + D * h, n;
}
function x5(n, l, s) {
  var d = Math.sin(s), h = Math.cos(s), m = l[0], p = l[1], E = l[2], C = l[3], T = l[4], b = l[5], R = l[6], D = l[7];
  return l !== n && (n[8] = l[8], n[9] = l[9], n[10] = l[10], n[11] = l[11], n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15]), n[0] = m * h + T * d, n[1] = p * h + b * d, n[2] = E * h + R * d, n[3] = C * h + D * d, n[4] = T * h - m * d, n[5] = b * h - p * d, n[6] = R * h - E * d, n[7] = D * h - C * d, n;
}
function M5(n, l) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = l[0], n[13] = l[1], n[14] = l[2], n[15] = 1, n;
}
function _5(n, l) {
  return n[0] = l[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = l[1], n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = l[2], n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function k5(n, l, s) {
  var d = s[0], h = s[1], m = s[2], p = Math.sqrt(d * d + h * h + m * m), E, C, T;
  return p < Ct ? null : (p = 1 / p, d *= p, h *= p, m *= p, E = Math.sin(l), C = Math.cos(l), T = 1 - C, n[0] = d * d * T + C, n[1] = h * d * T + m * E, n[2] = m * d * T - h * E, n[3] = 0, n[4] = d * h * T - m * E, n[5] = h * h * T + C, n[6] = m * h * T + d * E, n[7] = 0, n[8] = d * m * T + h * E, n[9] = h * m * T - d * E, n[10] = m * m * T + C, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n);
}
function D5(n, l) {
  var s = Math.sin(l), d = Math.cos(l);
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = d, n[6] = s, n[7] = 0, n[8] = 0, n[9] = -s, n[10] = d, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function O5(n, l) {
  var s = Math.sin(l), d = Math.cos(l);
  return n[0] = d, n[1] = 0, n[2] = -s, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = s, n[9] = 0, n[10] = d, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function z5(n, l) {
  var s = Math.sin(l), d = Math.cos(l);
  return n[0] = d, n[1] = s, n[2] = 0, n[3] = 0, n[4] = -s, n[5] = d, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function LC(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = d + d, C = h + h, T = m + m, b = d * E, R = d * C, D = d * T, k = h * C, z = h * T, A = m * T, N = p * E, X = p * C, K = p * T;
  return n[0] = 1 - (k + A), n[1] = R + K, n[2] = D - X, n[3] = 0, n[4] = R - K, n[5] = 1 - (b + A), n[6] = z + N, n[7] = 0, n[8] = D + X, n[9] = z - N, n[10] = 1 - (b + k), n[11] = 0, n[12] = s[0], n[13] = s[1], n[14] = s[2], n[15] = 1, n;
}
function L5(n, l) {
  var s = new En(3), d = -l[0], h = -l[1], m = -l[2], p = l[3], E = l[4], C = l[5], T = l[6], b = l[7], R = d * d + h * h + m * m + p * p;
  return R > 0 ? (s[0] = (E * p + b * d + C * m - T * h) * 2 / R, s[1] = (C * p + b * h + T * d - E * m) * 2 / R, s[2] = (T * p + b * m + E * h - C * d) * 2 / R) : (s[0] = (E * p + b * d + C * m - T * h) * 2, s[1] = (C * p + b * h + T * d - E * m) * 2, s[2] = (T * p + b * m + E * h - C * d) * 2), LC(n, l, s), n;
}
function AC(n, l) {
  return n[0] = l[12], n[1] = l[13], n[2] = l[14], n;
}
function NC(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[4], p = l[5], E = l[6], C = l[8], T = l[9], b = l[10];
  return n[0] = Math.sqrt(s * s + d * d + h * h), n[1] = Math.sqrt(m * m + p * p + E * E), n[2] = Math.sqrt(C * C + T * T + b * b), n;
}
function UC(n, l) {
  var s = new En(3);
  NC(s, l);
  var d = 1 / s[0], h = 1 / s[1], m = 1 / s[2], p = l[0] * d, E = l[1] * h, C = l[2] * m, T = l[4] * d, b = l[5] * h, R = l[6] * m, D = l[8] * d, k = l[9] * h, z = l[10] * m, A = p + b + z, N = 0;
  return A > 0 ? (N = Math.sqrt(A + 1) * 2, n[3] = 0.25 * N, n[0] = (R - k) / N, n[1] = (D - C) / N, n[2] = (E - T) / N) : p > b && p > z ? (N = Math.sqrt(1 + p - b - z) * 2, n[3] = (R - k) / N, n[0] = 0.25 * N, n[1] = (E + T) / N, n[2] = (D + C) / N) : b > z ? (N = Math.sqrt(1 + b - p - z) * 2, n[3] = (D - C) / N, n[0] = (E + T) / N, n[1] = 0.25 * N, n[2] = (R + k) / N) : (N = Math.sqrt(1 + z - p - b) * 2, n[3] = (E - T) / N, n[0] = (D + C) / N, n[1] = (R + k) / N, n[2] = 0.25 * N), n;
}
function A5(n, l, s, d) {
  l[0] = d[12], l[1] = d[13], l[2] = d[14];
  var h = d[0], m = d[1], p = d[2], E = d[4], C = d[5], T = d[6], b = d[8], R = d[9], D = d[10];
  s[0] = Math.sqrt(h * h + m * m + p * p), s[1] = Math.sqrt(E * E + C * C + T * T), s[2] = Math.sqrt(b * b + R * R + D * D);
  var k = 1 / s[0], z = 1 / s[1], A = 1 / s[2], N = h * k, X = m * z, K = p * A, Y = E * k, P = C * z, $ = T * A, Q = b * k, re = R * z, Re = D * A, he = N + P + Re, G = 0;
  return he > 0 ? (G = Math.sqrt(he + 1) * 2, n[3] = 0.25 * G, n[0] = ($ - re) / G, n[1] = (Q - K) / G, n[2] = (X - Y) / G) : N > P && N > Re ? (G = Math.sqrt(1 + N - P - Re) * 2, n[3] = ($ - re) / G, n[0] = 0.25 * G, n[1] = (X + Y) / G, n[2] = (Q + K) / G) : P > Re ? (G = Math.sqrt(1 + P - N - Re) * 2, n[3] = (Q - K) / G, n[0] = (X + Y) / G, n[1] = 0.25 * G, n[2] = ($ + re) / G) : (G = Math.sqrt(1 + Re - N - P) * 2, n[3] = (X - Y) / G, n[0] = (Q + K) / G, n[1] = ($ + re) / G, n[2] = 0.25 * G), n;
}
function N5(n, l, s, d) {
  var h = l[0], m = l[1], p = l[2], E = l[3], C = h + h, T = m + m, b = p + p, R = h * C, D = h * T, k = h * b, z = m * T, A = m * b, N = p * b, X = E * C, K = E * T, Y = E * b, P = d[0], $ = d[1], Q = d[2];
  return n[0] = (1 - (z + N)) * P, n[1] = (D + Y) * P, n[2] = (k - K) * P, n[3] = 0, n[4] = (D - Y) * $, n[5] = (1 - (R + N)) * $, n[6] = (A + X) * $, n[7] = 0, n[8] = (k + K) * Q, n[9] = (A - X) * Q, n[10] = (1 - (R + z)) * Q, n[11] = 0, n[12] = s[0], n[13] = s[1], n[14] = s[2], n[15] = 1, n;
}
function U5(n, l, s, d, h) {
  var m = l[0], p = l[1], E = l[2], C = l[3], T = m + m, b = p + p, R = E + E, D = m * T, k = m * b, z = m * R, A = p * b, N = p * R, X = E * R, K = C * T, Y = C * b, P = C * R, $ = d[0], Q = d[1], re = d[2], Re = h[0], he = h[1], G = h[2], se = (1 - (A + X)) * $, fe = (k + P) * $, ae = (z - Y) * $, q = (k - P) * Q, we = (1 - (D + X)) * Q, Ne = (N + K) * Q, de = (z + Y) * re, ie = (N - K) * re, Se = (1 - (D + A)) * re;
  return n[0] = se, n[1] = fe, n[2] = ae, n[3] = 0, n[4] = q, n[5] = we, n[6] = Ne, n[7] = 0, n[8] = de, n[9] = ie, n[10] = Se, n[11] = 0, n[12] = s[0] + Re - (se * Re + q * he + de * G), n[13] = s[1] + he - (fe * Re + we * he + ie * G), n[14] = s[2] + G - (ae * Re + Ne * he + Se * G), n[15] = 1, n;
}
function j5(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = s + s, E = d + d, C = h + h, T = s * p, b = d * p, R = d * E, D = h * p, k = h * E, z = h * C, A = m * p, N = m * E, X = m * C;
  return n[0] = 1 - R - z, n[1] = b + X, n[2] = D - N, n[3] = 0, n[4] = b - X, n[5] = 1 - T - z, n[6] = k + A, n[7] = 0, n[8] = D + N, n[9] = k - A, n[10] = 1 - T - R, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function F5(n, l, s, d, h, m, p) {
  var E = 1 / (s - l), C = 1 / (h - d), T = 1 / (m - p);
  return n[0] = m * 2 * E, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = m * 2 * C, n[6] = 0, n[7] = 0, n[8] = (s + l) * E, n[9] = (h + d) * C, n[10] = (p + m) * T, n[11] = -1, n[12] = 0, n[13] = 0, n[14] = p * m * 2 * T, n[15] = 0, n;
}
function jC(n, l, s, d, h) {
  var m = 1 / Math.tan(l / 2);
  if (n[0] = m / s, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = m, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = -1, n[12] = 0, n[13] = 0, n[15] = 0, h != null && h !== 1 / 0) {
    var p = 1 / (d - h);
    n[10] = (h + d) * p, n[14] = 2 * h * d * p;
  } else
    n[10] = -1, n[14] = -2 * d;
  return n;
}
var H5 = jC;
function P5(n, l, s, d, h) {
  var m = 1 / Math.tan(l / 2);
  if (n[0] = m / s, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = m, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = -1, n[12] = 0, n[13] = 0, n[15] = 0, h != null && h !== 1 / 0) {
    var p = 1 / (d - h);
    n[10] = h * p, n[14] = h * d * p;
  } else
    n[10] = -1, n[14] = -d;
  return n;
}
function $5(n, l, s, d) {
  var h = Math.tan(l.upDegrees * Math.PI / 180), m = Math.tan(l.downDegrees * Math.PI / 180), p = Math.tan(l.leftDegrees * Math.PI / 180), E = Math.tan(l.rightDegrees * Math.PI / 180), C = 2 / (p + E), T = 2 / (h + m);
  return n[0] = C, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = T, n[6] = 0, n[7] = 0, n[8] = -((p - E) * C * 0.5), n[9] = (h - m) * T * 0.5, n[10] = d / (s - d), n[11] = -1, n[12] = 0, n[13] = 0, n[14] = d * s / (s - d), n[15] = 0, n;
}
function FC(n, l, s, d, h, m, p) {
  var E = 1 / (l - s), C = 1 / (d - h), T = 1 / (m - p);
  return n[0] = -2 * E, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * C, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 2 * T, n[11] = 0, n[12] = (l + s) * E, n[13] = (h + d) * C, n[14] = (p + m) * T, n[15] = 1, n;
}
var HC = FC;
function V5(n, l, s, d, h, m, p) {
  var E = 1 / (l - s), C = 1 / (d - h), T = 1 / (m - p);
  return n[0] = -2 * E, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * C, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = T, n[11] = 0, n[12] = (l + s) * E, n[13] = (h + d) * C, n[14] = m * T, n[15] = 1, n;
}
function q5(n, l, s, d) {
  var h, m, p, E, C, T, b, R, D, k, z = l[0], A = l[1], N = l[2], X = d[0], K = d[1], Y = d[2], P = s[0], $ = s[1], Q = s[2];
  return Math.abs(z - P) < Ct && Math.abs(A - $) < Ct && Math.abs(N - Q) < Ct ? l2(n) : (b = z - P, R = A - $, D = N - Q, k = 1 / Math.sqrt(b * b + R * R + D * D), b *= k, R *= k, D *= k, h = K * D - Y * R, m = Y * b - X * D, p = X * R - K * b, k = Math.sqrt(h * h + m * m + p * p), k ? (k = 1 / k, h *= k, m *= k, p *= k) : (h = 0, m = 0, p = 0), E = R * p - D * m, C = D * h - b * p, T = b * m - R * h, k = Math.sqrt(E * E + C * C + T * T), k ? (k = 1 / k, E *= k, C *= k, T *= k) : (E = 0, C = 0, T = 0), n[0] = h, n[1] = E, n[2] = b, n[3] = 0, n[4] = m, n[5] = C, n[6] = R, n[7] = 0, n[8] = p, n[9] = T, n[10] = D, n[11] = 0, n[12] = -(h * z + m * A + p * N), n[13] = -(E * z + C * A + T * N), n[14] = -(b * z + R * A + D * N), n[15] = 1, n);
}
function I5(n, l, s, d) {
  var h = l[0], m = l[1], p = l[2], E = d[0], C = d[1], T = d[2], b = h - s[0], R = m - s[1], D = p - s[2], k = b * b + R * R + D * D;
  k > 0 && (k = 1 / Math.sqrt(k), b *= k, R *= k, D *= k);
  var z = C * D - T * R, A = T * b - E * D, N = E * R - C * b;
  return k = z * z + A * A + N * N, k > 0 && (k = 1 / Math.sqrt(k), z *= k, A *= k, N *= k), n[0] = z, n[1] = A, n[2] = N, n[3] = 0, n[4] = R * N - D * A, n[5] = D * z - b * N, n[6] = b * A - R * z, n[7] = 0, n[8] = b, n[9] = R, n[10] = D, n[11] = 0, n[12] = h, n[13] = m, n[14] = p, n[15] = 1, n;
}
function Y5(n) {
  return "mat4(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ", " + n[8] + ", " + n[9] + ", " + n[10] + ", " + n[11] + ", " + n[12] + ", " + n[13] + ", " + n[14] + ", " + n[15] + ")";
}
function W5(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + n[6] * n[6] + n[7] * n[7] + n[8] * n[8] + n[9] * n[9] + n[10] * n[10] + n[11] * n[11] + n[12] * n[12] + n[13] * n[13] + n[14] * n[14] + n[15] * n[15]);
}
function B5(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n[4] = l[4] + s[4], n[5] = l[5] + s[5], n[6] = l[6] + s[6], n[7] = l[7] + s[7], n[8] = l[8] + s[8], n[9] = l[9] + s[9], n[10] = l[10] + s[10], n[11] = l[11] + s[11], n[12] = l[12] + s[12], n[13] = l[13] + s[13], n[14] = l[14] + s[14], n[15] = l[15] + s[15], n;
}
function PC(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n[2] = l[2] - s[2], n[3] = l[3] - s[3], n[4] = l[4] - s[4], n[5] = l[5] - s[5], n[6] = l[6] - s[6], n[7] = l[7] - s[7], n[8] = l[8] - s[8], n[9] = l[9] - s[9], n[10] = l[10] - s[10], n[11] = l[11] - s[11], n[12] = l[12] - s[12], n[13] = l[13] - s[13], n[14] = l[14] - s[14], n[15] = l[15] - s[15], n;
}
function Q5(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n[3] = l[3] * s, n[4] = l[4] * s, n[5] = l[5] * s, n[6] = l[6] * s, n[7] = l[7] * s, n[8] = l[8] * s, n[9] = l[9] * s, n[10] = l[10] * s, n[11] = l[11] * s, n[12] = l[12] * s, n[13] = l[13] * s, n[14] = l[14] * s, n[15] = l[15] * s, n;
}
function G5(n, l, s, d) {
  return n[0] = l[0] + s[0] * d, n[1] = l[1] + s[1] * d, n[2] = l[2] + s[2] * d, n[3] = l[3] + s[3] * d, n[4] = l[4] + s[4] * d, n[5] = l[5] + s[5] * d, n[6] = l[6] + s[6] * d, n[7] = l[7] + s[7] * d, n[8] = l[8] + s[8] * d, n[9] = l[9] + s[9] * d, n[10] = l[10] + s[10] * d, n[11] = l[11] + s[11] * d, n[12] = l[12] + s[12] * d, n[13] = l[13] + s[13] * d, n[14] = l[14] + s[14] * d, n[15] = l[15] + s[15] * d, n;
}
function X5(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2] && n[3] === l[3] && n[4] === l[4] && n[5] === l[5] && n[6] === l[6] && n[7] === l[7] && n[8] === l[8] && n[9] === l[9] && n[10] === l[10] && n[11] === l[11] && n[12] === l[12] && n[13] === l[13] && n[14] === l[14] && n[15] === l[15];
}
function K5(n, l) {
  var s = n[0], d = n[1], h = n[2], m = n[3], p = n[4], E = n[5], C = n[6], T = n[7], b = n[8], R = n[9], D = n[10], k = n[11], z = n[12], A = n[13], N = n[14], X = n[15], K = l[0], Y = l[1], P = l[2], $ = l[3], Q = l[4], re = l[5], Re = l[6], he = l[7], G = l[8], se = l[9], fe = l[10], ae = l[11], q = l[12], we = l[13], Ne = l[14], de = l[15];
  return Math.abs(s - K) <= Ct * Math.max(1, Math.abs(s), Math.abs(K)) && Math.abs(d - Y) <= Ct * Math.max(1, Math.abs(d), Math.abs(Y)) && Math.abs(h - P) <= Ct * Math.max(1, Math.abs(h), Math.abs(P)) && Math.abs(m - $) <= Ct * Math.max(1, Math.abs(m), Math.abs($)) && Math.abs(p - Q) <= Ct * Math.max(1, Math.abs(p), Math.abs(Q)) && Math.abs(E - re) <= Ct * Math.max(1, Math.abs(E), Math.abs(re)) && Math.abs(C - Re) <= Ct * Math.max(1, Math.abs(C), Math.abs(Re)) && Math.abs(T - he) <= Ct * Math.max(1, Math.abs(T), Math.abs(he)) && Math.abs(b - G) <= Ct * Math.max(1, Math.abs(b), Math.abs(G)) && Math.abs(R - se) <= Ct * Math.max(1, Math.abs(R), Math.abs(se)) && Math.abs(D - fe) <= Ct * Math.max(1, Math.abs(D), Math.abs(fe)) && Math.abs(k - ae) <= Ct * Math.max(1, Math.abs(k), Math.abs(ae)) && Math.abs(z - q) <= Ct * Math.max(1, Math.abs(z), Math.abs(q)) && Math.abs(A - we) <= Ct * Math.max(1, Math.abs(A), Math.abs(we)) && Math.abs(N - Ne) <= Ct * Math.max(1, Math.abs(N), Math.abs(Ne)) && Math.abs(X - de) <= Ct * Math.max(1, Math.abs(X), Math.abs(de));
}
var Z5 = OC, J5 = PC;
const $C = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: B5,
  adjoint: C5,
  clone: m5,
  copy: y5,
  create: h5,
  decompose: A5,
  determinant: w5,
  equals: K5,
  exactEquals: X5,
  frob: W5,
  fromQuat: j5,
  fromQuat2: L5,
  fromRotation: k5,
  fromRotationTranslation: LC,
  fromRotationTranslationScale: N5,
  fromRotationTranslationScaleOrigin: U5,
  fromScaling: _5,
  fromTranslation: M5,
  fromValues: g5,
  fromXRotation: D5,
  fromYRotation: O5,
  fromZRotation: z5,
  frustum: F5,
  getRotation: UC,
  getScaling: NC,
  getTranslation: AC,
  identity: l2,
  invert: DC,
  lookAt: q5,
  mul: Z5,
  multiply: OC,
  multiplyScalar: Q5,
  multiplyScalarAndAdd: G5,
  ortho: HC,
  orthoNO: FC,
  orthoZO: V5,
  perspective: H5,
  perspectiveFromFieldOfView: $5,
  perspectiveNO: jC,
  perspectiveZO: P5,
  rotate: T5,
  rotateX: R5,
  rotateY: b5,
  rotateZ: x5,
  scale: zC,
  set: S5,
  str: Y5,
  sub: J5,
  subtract: PC,
  targetTo: I5,
  translate: r2,
  transpose: E5
}, Symbol.toStringTag, { value: "Module" }));
function o2() {
  var n = new En(3);
  return En != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n;
}
function eD(n) {
  var l = new En(3);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l;
}
function VC(n) {
  var l = n[0], s = n[1], d = n[2];
  return Math.sqrt(l * l + s * s + d * d);
}
function a2(n, l, s) {
  var d = new En(3);
  return d[0] = n, d[1] = l, d[2] = s, d;
}
function tD(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n;
}
function nD(n, l, s, d) {
  return n[0] = l, n[1] = s, n[2] = d, n;
}
function rD(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n;
}
function qC(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n[2] = l[2] - s[2], n;
}
function IC(n, l, s) {
  return n[0] = l[0] * s[0], n[1] = l[1] * s[1], n[2] = l[2] * s[2], n;
}
function YC(n, l, s) {
  return n[0] = l[0] / s[0], n[1] = l[1] / s[1], n[2] = l[2] / s[2], n;
}
function aD(n, l) {
  return n[0] = Math.ceil(l[0]), n[1] = Math.ceil(l[1]), n[2] = Math.ceil(l[2]), n;
}
function iD(n, l) {
  return n[0] = Math.floor(l[0]), n[1] = Math.floor(l[1]), n[2] = Math.floor(l[2]), n;
}
function lD(n, l, s) {
  return n[0] = Math.min(l[0], s[0]), n[1] = Math.min(l[1], s[1]), n[2] = Math.min(l[2], s[2]), n;
}
function oD(n, l, s) {
  return n[0] = Math.max(l[0], s[0]), n[1] = Math.max(l[1], s[1]), n[2] = Math.max(l[2], s[2]), n;
}
function uD(n, l) {
  return n[0] = ko(l[0]), n[1] = ko(l[1]), n[2] = ko(l[2]), n;
}
function sD(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n;
}
function cD(n, l, s, d) {
  return n[0] = l[0] + s[0] * d, n[1] = l[1] + s[1] * d, n[2] = l[2] + s[2] * d, n;
}
function WC(n, l) {
  var s = l[0] - n[0], d = l[1] - n[1], h = l[2] - n[2];
  return Math.sqrt(s * s + d * d + h * h);
}
function BC(n, l) {
  var s = l[0] - n[0], d = l[1] - n[1], h = l[2] - n[2];
  return s * s + d * d + h * h;
}
function QC(n) {
  var l = n[0], s = n[1], d = n[2];
  return l * l + s * s + d * d;
}
function fD(n, l) {
  return n[0] = -l[0], n[1] = -l[1], n[2] = -l[2], n;
}
function dD(n, l) {
  return n[0] = 1 / l[0], n[1] = 1 / l[1], n[2] = 1 / l[2], n;
}
function GC(n, l) {
  var s = l[0], d = l[1], h = l[2], m = s * s + d * d + h * h;
  return m > 0 && (m = 1 / Math.sqrt(m)), n[0] = l[0] * m, n[1] = l[1] * m, n[2] = l[2] * m, n;
}
function zy(n, l) {
  return n[0] * l[0] + n[1] * l[1] + n[2] * l[2];
}
function by(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = s[0], E = s[1], C = s[2];
  return n[0] = h * C - m * E, n[1] = m * p - d * C, n[2] = d * E - h * p, n;
}
function vD(n, l, s, d) {
  var h = l[0], m = l[1], p = l[2];
  return n[0] = h + d * (s[0] - h), n[1] = m + d * (s[1] - m), n[2] = p + d * (s[2] - p), n;
}
function pD(n, l, s, d) {
  var h = Math.acos(Math.min(Math.max(zy(l, s), -1), 1)), m = Math.sin(h), p = Math.sin((1 - d) * h) / m, E = Math.sin(d * h) / m;
  return n[0] = p * l[0] + E * s[0], n[1] = p * l[1] + E * s[1], n[2] = p * l[2] + E * s[2], n;
}
function hD(n, l, s, d, h, m) {
  var p = m * m, E = p * (2 * m - 3) + 1, C = p * (m - 2) + m, T = p * (m - 1), b = p * (3 - 2 * m);
  return n[0] = l[0] * E + s[0] * C + d[0] * T + h[0] * b, n[1] = l[1] * E + s[1] * C + d[1] * T + h[1] * b, n[2] = l[2] * E + s[2] * C + d[2] * T + h[2] * b, n;
}
function mD(n, l, s, d, h, m) {
  var p = 1 - m, E = p * p, C = m * m, T = E * p, b = 3 * m * E, R = 3 * C * p, D = C * m;
  return n[0] = l[0] * T + s[0] * b + d[0] * R + h[0] * D, n[1] = l[1] * T + s[1] * b + d[1] * R + h[1] * D, n[2] = l[2] * T + s[2] * b + d[2] * R + h[2] * D, n;
}
function yD(n, l) {
  l = l === void 0 ? 1 : l;
  var s = Bl() * 2 * Math.PI, d = Bl() * 2 - 1, h = Math.sqrt(1 - d * d) * l;
  return n[0] = Math.cos(s) * h, n[1] = Math.sin(s) * h, n[2] = d * l, n;
}
function XC(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = s[3] * d + s[7] * h + s[11] * m + s[15];
  return p = p || 1, n[0] = (s[0] * d + s[4] * h + s[8] * m + s[12]) / p, n[1] = (s[1] * d + s[5] * h + s[9] * m + s[13]) / p, n[2] = (s[2] * d + s[6] * h + s[10] * m + s[14]) / p, n;
}
function gD(n, l, s) {
  var d = l[0], h = l[1], m = l[2];
  return n[0] = d * s[0] + h * s[3] + m * s[6], n[1] = d * s[1] + h * s[4] + m * s[7], n[2] = d * s[2] + h * s[5] + m * s[8], n;
}
function SD(n, l, s) {
  var d = s[0], h = s[1], m = s[2], p = s[3], E = l[0], C = l[1], T = l[2], b = h * T - m * C, R = m * E - d * T, D = d * C - h * E;
  return b = b + b, R = R + R, D = D + D, n[0] = E + p * b + h * D - m * R, n[1] = C + p * R + m * b - d * D, n[2] = T + p * D + d * R - h * b, n;
}
function ED(n, l, s, d) {
  var h = [], m = [];
  return h[0] = l[0] - s[0], h[1] = l[1] - s[1], h[2] = l[2] - s[2], m[0] = h[0], m[1] = h[1] * Math.cos(d) - h[2] * Math.sin(d), m[2] = h[1] * Math.sin(d) + h[2] * Math.cos(d), n[0] = m[0] + s[0], n[1] = m[1] + s[1], n[2] = m[2] + s[2], n;
}
function CD(n, l, s, d) {
  var h = [], m = [];
  return h[0] = l[0] - s[0], h[1] = l[1] - s[1], h[2] = l[2] - s[2], m[0] = h[2] * Math.sin(d) + h[0] * Math.cos(d), m[1] = h[1], m[2] = h[2] * Math.cos(d) - h[0] * Math.sin(d), n[0] = m[0] + s[0], n[1] = m[1] + s[1], n[2] = m[2] + s[2], n;
}
function wD(n, l, s, d) {
  var h = [], m = [];
  return h[0] = l[0] - s[0], h[1] = l[1] - s[1], h[2] = l[2] - s[2], m[0] = h[0] * Math.cos(d) - h[1] * Math.sin(d), m[1] = h[0] * Math.sin(d) + h[1] * Math.cos(d), m[2] = h[2], n[0] = m[0] + s[0], n[1] = m[1] + s[1], n[2] = m[2] + s[2], n;
}
function TD(n, l) {
  var s = n[0], d = n[1], h = n[2], m = l[0], p = l[1], E = l[2], C = Math.sqrt((s * s + d * d + h * h) * (m * m + p * p + E * E)), T = C && zy(n, l) / C;
  return Math.acos(Math.min(Math.max(T, -1), 1));
}
function RD(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n;
}
function bD(n) {
  return "vec3(" + n[0] + ", " + n[1] + ", " + n[2] + ")";
}
function xD(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2];
}
function MD(n, l) {
  var s = n[0], d = n[1], h = n[2], m = l[0], p = l[1], E = l[2];
  return Math.abs(s - m) <= Ct * Math.max(1, Math.abs(s), Math.abs(m)) && Math.abs(d - p) <= Ct * Math.max(1, Math.abs(d), Math.abs(p)) && Math.abs(h - E) <= Ct * Math.max(1, Math.abs(h), Math.abs(E));
}
var _D = qC, kD = IC, DD = YC, OD = WC, zD = BC, KC = VC, LD = QC, AD = (function() {
  var n = o2();
  return function(l, s, d, h, m, p) {
    var E, C;
    for (s || (s = 3), d || (d = 0), h ? C = Math.min(h * s + d, l.length) : C = l.length, E = d; E < C; E += s)
      n[0] = l[E], n[1] = l[E + 1], n[2] = l[E + 2], m(n, n, p), l[E] = n[0], l[E + 1] = n[1], l[E + 2] = n[2];
    return l;
  };
})();
const ND = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: rD,
  angle: TD,
  bezier: mD,
  ceil: aD,
  clone: eD,
  copy: tD,
  create: o2,
  cross: by,
  dist: OD,
  distance: WC,
  div: DD,
  divide: YC,
  dot: zy,
  equals: MD,
  exactEquals: xD,
  floor: iD,
  forEach: AD,
  fromValues: a2,
  hermite: hD,
  inverse: dD,
  len: KC,
  length: VC,
  lerp: vD,
  max: oD,
  min: lD,
  mul: kD,
  multiply: IC,
  negate: fD,
  normalize: GC,
  random: yD,
  rotateX: ED,
  rotateY: CD,
  rotateZ: wD,
  round: uD,
  scale: sD,
  scaleAndAdd: cD,
  set: nD,
  slerp: pD,
  sqrDist: zD,
  sqrLen: LD,
  squaredDistance: BC,
  squaredLength: QC,
  str: bD,
  sub: _D,
  subtract: qC,
  transformMat3: gD,
  transformMat4: XC,
  transformQuat: SD,
  zero: RD
}, Symbol.toStringTag, { value: "Module" }));
function ZC() {
  var n = new En(4);
  return En != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0), n;
}
function JC(n) {
  var l = new En(4);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l;
}
function ew(n, l, s, d) {
  var h = new En(4);
  return h[0] = n, h[1] = l, h[2] = s, h[3] = d, h;
}
function tw(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n;
}
function nw(n, l, s, d, h) {
  return n[0] = l, n[1] = s, n[2] = d, n[3] = h, n;
}
function rw(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n;
}
function aw(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n[2] = l[2] - s[2], n[3] = l[3] - s[3], n;
}
function iw(n, l, s) {
  return n[0] = l[0] * s[0], n[1] = l[1] * s[1], n[2] = l[2] * s[2], n[3] = l[3] * s[3], n;
}
function lw(n, l, s) {
  return n[0] = l[0] / s[0], n[1] = l[1] / s[1], n[2] = l[2] / s[2], n[3] = l[3] / s[3], n;
}
function UD(n, l) {
  return n[0] = Math.ceil(l[0]), n[1] = Math.ceil(l[1]), n[2] = Math.ceil(l[2]), n[3] = Math.ceil(l[3]), n;
}
function jD(n, l) {
  return n[0] = Math.floor(l[0]), n[1] = Math.floor(l[1]), n[2] = Math.floor(l[2]), n[3] = Math.floor(l[3]), n;
}
function FD(n, l, s) {
  return n[0] = Math.min(l[0], s[0]), n[1] = Math.min(l[1], s[1]), n[2] = Math.min(l[2], s[2]), n[3] = Math.min(l[3], s[3]), n;
}
function HD(n, l, s) {
  return n[0] = Math.max(l[0], s[0]), n[1] = Math.max(l[1], s[1]), n[2] = Math.max(l[2], s[2]), n[3] = Math.max(l[3], s[3]), n;
}
function PD(n, l) {
  return n[0] = ko(l[0]), n[1] = ko(l[1]), n[2] = ko(l[2]), n[3] = ko(l[3]), n;
}
function ow(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n[3] = l[3] * s, n;
}
function $D(n, l, s, d) {
  return n[0] = l[0] + s[0] * d, n[1] = l[1] + s[1] * d, n[2] = l[2] + s[2] * d, n[3] = l[3] + s[3] * d, n;
}
function uw(n, l) {
  var s = l[0] - n[0], d = l[1] - n[1], h = l[2] - n[2], m = l[3] - n[3];
  return Math.sqrt(s * s + d * d + h * h + m * m);
}
function sw(n, l) {
  var s = l[0] - n[0], d = l[1] - n[1], h = l[2] - n[2], m = l[3] - n[3];
  return s * s + d * d + h * h + m * m;
}
function u2(n) {
  var l = n[0], s = n[1], d = n[2], h = n[3];
  return Math.sqrt(l * l + s * s + d * d + h * h);
}
function s2(n) {
  var l = n[0], s = n[1], d = n[2], h = n[3];
  return l * l + s * s + d * d + h * h;
}
function VD(n, l) {
  return n[0] = -l[0], n[1] = -l[1], n[2] = -l[2], n[3] = -l[3], n;
}
function qD(n, l) {
  return n[0] = 1 / l[0], n[1] = 1 / l[1], n[2] = 1 / l[2], n[3] = 1 / l[3], n;
}
function cw(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = s * s + d * d + h * h + m * m;
  return p > 0 && (p = 1 / Math.sqrt(p)), n[0] = s * p, n[1] = d * p, n[2] = h * p, n[3] = m * p, n;
}
function c2(n, l) {
  return n[0] * l[0] + n[1] * l[1] + n[2] * l[2] + n[3] * l[3];
}
function ID(n, l, s, d) {
  var h = s[0] * d[1] - s[1] * d[0], m = s[0] * d[2] - s[2] * d[0], p = s[0] * d[3] - s[3] * d[0], E = s[1] * d[2] - s[2] * d[1], C = s[1] * d[3] - s[3] * d[1], T = s[2] * d[3] - s[3] * d[2], b = l[0], R = l[1], D = l[2], k = l[3];
  return n[0] = R * T - D * C + k * E, n[1] = -(b * T) + D * p - k * m, n[2] = b * C - R * p + k * h, n[3] = -(b * E) + R * m - D * h, n;
}
function fw(n, l, s, d) {
  var h = l[0], m = l[1], p = l[2], E = l[3];
  return n[0] = h + d * (s[0] - h), n[1] = m + d * (s[1] - m), n[2] = p + d * (s[2] - p), n[3] = E + d * (s[3] - E), n;
}
function YD(n, l) {
  l = l === void 0 ? 1 : l;
  var s, d, h, m, p, E, C;
  C = Bl(), s = C * 2 - 1, d = (4 * Bl() - 2) * Math.sqrt(C * -C + C), p = s * s + d * d, C = Bl(), h = C * 2 - 1, m = (4 * Bl() - 2) * Math.sqrt(C * -C + C), E = h * h + m * m;
  var T = Math.sqrt((1 - p) / E);
  return n[0] = l * s, n[1] = l * d, n[2] = l * h * T, n[3] = l * m * T, n;
}
function WD(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3];
  return n[0] = s[0] * d + s[4] * h + s[8] * m + s[12] * p, n[1] = s[1] * d + s[5] * h + s[9] * m + s[13] * p, n[2] = s[2] * d + s[6] * h + s[10] * m + s[14] * p, n[3] = s[3] * d + s[7] * h + s[11] * m + s[15] * p, n;
}
function BD(n, l, s) {
  var d = s[0], h = s[1], m = s[2], p = s[3], E = l[0], C = l[1], T = l[2], b = h * T - m * C, R = m * E - d * T, D = d * C - h * E;
  return b = b + b, R = R + R, D = D + D, n[0] = E + p * b + h * D - m * R, n[1] = C + p * R + m * b - d * D, n[2] = T + p * D + d * R - h * b, n[3] = l[3], n;
}
function QD(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0, n;
}
function GD(n) {
  return "vec4(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
function dw(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2] && n[3] === l[3];
}
function XD(n, l) {
  var s = n[0], d = n[1], h = n[2], m = n[3], p = l[0], E = l[1], C = l[2], T = l[3];
  return Math.abs(s - p) <= Ct * Math.max(1, Math.abs(s), Math.abs(p)) && Math.abs(d - E) <= Ct * Math.max(1, Math.abs(d), Math.abs(E)) && Math.abs(h - C) <= Ct * Math.max(1, Math.abs(h), Math.abs(C)) && Math.abs(m - T) <= Ct * Math.max(1, Math.abs(m), Math.abs(T));
}
var KD = aw, ZD = iw, JD = lw, eO = uw, tO = sw, nO = u2, rO = s2, aO = (function() {
  var n = ZC();
  return function(l, s, d, h, m, p) {
    var E, C;
    for (s || (s = 4), d || (d = 0), h ? C = Math.min(h * s + d, l.length) : C = l.length, E = d; E < C; E += s)
      n[0] = l[E], n[1] = l[E + 1], n[2] = l[E + 2], n[3] = l[E + 3], m(n, n, p), l[E] = n[0], l[E + 1] = n[1], l[E + 2] = n[2], l[E + 3] = n[3];
    return l;
  };
})();
const iO = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: rw,
  ceil: UD,
  clone: JC,
  copy: tw,
  create: ZC,
  cross: ID,
  dist: eO,
  distance: uw,
  div: JD,
  divide: lw,
  dot: c2,
  equals: XD,
  exactEquals: dw,
  floor: jD,
  forEach: aO,
  fromValues: ew,
  inverse: qD,
  len: nO,
  length: u2,
  lerp: fw,
  max: HD,
  min: FD,
  mul: ZD,
  multiply: iw,
  negate: VD,
  normalize: cw,
  random: YD,
  round: PD,
  scale: ow,
  scaleAndAdd: $D,
  set: nw,
  sqrDist: tO,
  sqrLen: rO,
  squaredDistance: sw,
  squaredLength: s2,
  str: GD,
  sub: KD,
  subtract: aw,
  transformMat4: WD,
  transformQuat: BD,
  zero: QD
}, Symbol.toStringTag, { value: "Module" }));
function My() {
  var n = new En(4);
  return En != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n[3] = 1, n;
}
function lO(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function vw(n, l, s) {
  s = s * 0.5;
  var d = Math.sin(s);
  return n[0] = d * l[0], n[1] = d * l[1], n[2] = d * l[2], n[3] = Math.cos(s), n;
}
function oO(n, l) {
  var s = Math.acos(l[3]) * 2, d = Math.sin(s / 2);
  return d > Ct ? (n[0] = l[0] / d, n[1] = l[1] / d, n[2] = l[2] / d) : (n[0] = 1, n[1] = 0, n[2] = 0), s;
}
function uO(n, l) {
  var s = d2(n, l);
  return Math.acos(2 * s * s - 1);
}
function pw(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = s[0], C = s[1], T = s[2], b = s[3];
  return n[0] = d * b + p * E + h * T - m * C, n[1] = h * b + p * C + m * E - d * T, n[2] = m * b + p * T + d * C - h * E, n[3] = p * b - d * E - h * C - m * T, n;
}
function hw(n, l, s) {
  s *= 0.5;
  var d = l[0], h = l[1], m = l[2], p = l[3], E = Math.sin(s), C = Math.cos(s);
  return n[0] = d * C + p * E, n[1] = h * C + m * E, n[2] = m * C - h * E, n[3] = p * C - d * E, n;
}
function mw(n, l, s) {
  s *= 0.5;
  var d = l[0], h = l[1], m = l[2], p = l[3], E = Math.sin(s), C = Math.cos(s);
  return n[0] = d * C - m * E, n[1] = h * C + p * E, n[2] = m * C + d * E, n[3] = p * C - h * E, n;
}
function yw(n, l, s) {
  s *= 0.5;
  var d = l[0], h = l[1], m = l[2], p = l[3], E = Math.sin(s), C = Math.cos(s);
  return n[0] = d * C + h * E, n[1] = h * C - d * E, n[2] = m * C + p * E, n[3] = p * C - m * E, n;
}
function sO(n, l) {
  var s = l[0], d = l[1], h = l[2];
  return n[0] = s, n[1] = d, n[2] = h, n[3] = Math.sqrt(Math.abs(1 - s * s - d * d - h * h)), n;
}
function gw(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = Math.sqrt(s * s + d * d + h * h), E = Math.exp(m), C = p > 0 ? E * Math.sin(p) / p : 0;
  return n[0] = s * C, n[1] = d * C, n[2] = h * C, n[3] = E * Math.cos(p), n;
}
function Sw(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = Math.sqrt(s * s + d * d + h * h), E = p > 0 ? Math.atan2(p, m) / p : 0;
  return n[0] = s * E, n[1] = d * E, n[2] = h * E, n[3] = 0.5 * Math.log(s * s + d * d + h * h + m * m), n;
}
function cO(n, l, s) {
  return Sw(n, l), Cw(n, n, s), gw(n, n), n;
}
function xy(n, l, s, d) {
  var h = l[0], m = l[1], p = l[2], E = l[3], C = s[0], T = s[1], b = s[2], R = s[3], D, k, z, A, N;
  return k = h * C + m * T + p * b + E * R, k < 0 && (k = -k, C = -C, T = -T, b = -b, R = -R), 1 - k > Ct ? (D = Math.acos(k), z = Math.sin(D), A = Math.sin((1 - d) * D) / z, N = Math.sin(d * D) / z) : (A = 1 - d, N = d), n[0] = A * h + N * C, n[1] = A * m + N * T, n[2] = A * p + N * b, n[3] = A * E + N * R, n;
}
function fO(n) {
  var l = Bl(), s = Bl(), d = Bl(), h = Math.sqrt(1 - l), m = Math.sqrt(l);
  return n[0] = h * Math.sin(2 * Math.PI * s), n[1] = h * Math.cos(2 * Math.PI * s), n[2] = m * Math.sin(2 * Math.PI * d), n[3] = m * Math.cos(2 * Math.PI * d), n;
}
function dO(n, l) {
  var s = l[0], d = l[1], h = l[2], m = l[3], p = s * s + d * d + h * h + m * m, E = p ? 1 / p : 0;
  return n[0] = -s * E, n[1] = -d * E, n[2] = -h * E, n[3] = m * E, n;
}
function vO(n, l) {
  return n[0] = -l[0], n[1] = -l[1], n[2] = -l[2], n[3] = l[3], n;
}
function Ew(n, l) {
  var s = l[0] + l[4] + l[8], d;
  if (s > 0)
    d = Math.sqrt(s + 1), n[3] = 0.5 * d, d = 0.5 / d, n[0] = (l[5] - l[7]) * d, n[1] = (l[6] - l[2]) * d, n[2] = (l[1] - l[3]) * d;
  else {
    var h = 0;
    l[4] > l[0] && (h = 1), l[8] > l[h * 3 + h] && (h = 2);
    var m = (h + 1) % 3, p = (h + 2) % 3;
    d = Math.sqrt(l[h * 3 + h] - l[m * 3 + m] - l[p * 3 + p] + 1), n[h] = 0.5 * d, d = 0.5 / d, n[3] = (l[m * 3 + p] - l[p * 3 + m]) * d, n[m] = (l[m * 3 + h] + l[h * 3 + m]) * d, n[p] = (l[p * 3 + h] + l[h * 3 + p]) * d;
  }
  return n;
}
function pO(n, l, s, d) {
  var h = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : wC, m = Math.PI / 360;
  l *= m, d *= m, s *= m;
  var p = Math.sin(l), E = Math.cos(l), C = Math.sin(s), T = Math.cos(s), b = Math.sin(d), R = Math.cos(d);
  switch (h) {
    case "xyz":
      n[0] = p * T * R + E * C * b, n[1] = E * C * R - p * T * b, n[2] = E * T * b + p * C * R, n[3] = E * T * R - p * C * b;
      break;
    case "xzy":
      n[0] = p * T * R - E * C * b, n[1] = E * C * R - p * T * b, n[2] = E * T * b + p * C * R, n[3] = E * T * R + p * C * b;
      break;
    case "yxz":
      n[0] = p * T * R + E * C * b, n[1] = E * C * R - p * T * b, n[2] = E * T * b - p * C * R, n[3] = E * T * R + p * C * b;
      break;
    case "yzx":
      n[0] = p * T * R + E * C * b, n[1] = E * C * R + p * T * b, n[2] = E * T * b - p * C * R, n[3] = E * T * R - p * C * b;
      break;
    case "zxy":
      n[0] = p * T * R - E * C * b, n[1] = E * C * R + p * T * b, n[2] = E * T * b + p * C * R, n[3] = E * T * R - p * C * b;
      break;
    case "zyx":
      n[0] = p * T * R - E * C * b, n[1] = E * C * R + p * T * b, n[2] = E * T * b - p * C * R, n[3] = E * T * R + p * C * b;
      break;
    default:
      throw new Error("Unknown angle order " + h);
  }
  return n;
}
function hO(n) {
  return "quat(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
var mO = JC, yO = ew, f2 = tw, gO = nw, SO = rw, EO = pw, Cw = ow, d2 = c2, CO = fw, v2 = u2, wO = v2, p2 = s2, TO = p2, h2 = cw, RO = dw;
function bO(n, l) {
  return Math.abs(c2(n, l)) >= 1 - Ct;
}
var xO = (function() {
  var n = o2(), l = a2(1, 0, 0), s = a2(0, 1, 0);
  return function(d, h, m) {
    var p = zy(h, m);
    return p < -0.999999 ? (by(n, l, h), KC(n) < 1e-6 && by(n, s, h), GC(n, n), vw(d, n, Math.PI), d) : p > 0.999999 ? (d[0] = 0, d[1] = 0, d[2] = 0, d[3] = 1, d) : (by(n, h, m), d[0] = n[0], d[1] = n[1], d[2] = n[2], d[3] = 1 + p, h2(d, d));
  };
})(), MO = (function() {
  var n = My(), l = My();
  return function(s, d, h, m, p, E) {
    return xy(n, d, p, E), xy(l, h, m, E), xy(s, n, l, 2 * E * (1 - E)), s;
  };
})(), _O = (function() {
  var n = MC();
  return function(l, s, d, h) {
    return n[0] = d[0], n[3] = d[1], n[6] = d[2], n[1] = h[0], n[4] = h[1], n[7] = h[2], n[2] = -s[0], n[5] = -s[1], n[8] = -s[2], h2(l, Ew(l, n));
  };
})();
const kO = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: SO,
  calculateW: sO,
  clone: mO,
  conjugate: vO,
  copy: f2,
  create: My,
  dot: d2,
  equals: bO,
  exactEquals: RO,
  exp: gw,
  fromEuler: pO,
  fromMat3: Ew,
  fromValues: yO,
  getAngle: uO,
  getAxisAngle: oO,
  identity: lO,
  invert: dO,
  len: wO,
  length: v2,
  lerp: CO,
  ln: Sw,
  mul: EO,
  multiply: pw,
  normalize: h2,
  pow: cO,
  random: fO,
  rotateX: hw,
  rotateY: mw,
  rotateZ: yw,
  rotationTo: xO,
  scale: Cw,
  set: gO,
  setAxes: _O,
  setAxisAngle: vw,
  slerp: xy,
  sqlerp: MO,
  sqrLen: TO,
  squaredLength: p2,
  str: hO
}, Symbol.toStringTag, { value: "Module" }));
function DO() {
  var n = new En(8);
  return En != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[3] = 1, n;
}
function OO(n) {
  var l = new En(8);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l[4] = n[4], l[5] = n[5], l[6] = n[6], l[7] = n[7], l;
}
function zO(n, l, s, d, h, m, p, E) {
  var C = new En(8);
  return C[0] = n, C[1] = l, C[2] = s, C[3] = d, C[4] = h, C[5] = m, C[6] = p, C[7] = E, C;
}
function LO(n, l, s, d, h, m, p) {
  var E = new En(8);
  E[0] = n, E[1] = l, E[2] = s, E[3] = d;
  var C = h * 0.5, T = m * 0.5, b = p * 0.5;
  return E[4] = C * d + T * s - b * l, E[5] = T * d + b * n - C * s, E[6] = b * d + C * l - T * n, E[7] = -C * n - T * l - b * s, E;
}
function ww(n, l, s) {
  var d = s[0] * 0.5, h = s[1] * 0.5, m = s[2] * 0.5, p = l[0], E = l[1], C = l[2], T = l[3];
  return n[0] = p, n[1] = E, n[2] = C, n[3] = T, n[4] = d * T + h * C - m * E, n[5] = h * T + m * p - d * C, n[6] = m * T + d * E - h * p, n[7] = -d * p - h * E - m * C, n;
}
function AO(n, l) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = l[0] * 0.5, n[5] = l[1] * 0.5, n[6] = l[2] * 0.5, n[7] = 0, n;
}
function NO(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n;
}
function UO(n, l) {
  var s = My();
  UC(s, l);
  var d = new En(3);
  return AC(d, l), ww(n, s, d), n;
}
function Tw(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = l[4], n[5] = l[5], n[6] = l[6], n[7] = l[7], n;
}
function jO(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n;
}
function FO(n, l, s, d, h, m, p, E, C) {
  return n[0] = l, n[1] = s, n[2] = d, n[3] = h, n[4] = m, n[5] = p, n[6] = E, n[7] = C, n;
}
var HO = f2;
function PO(n, l) {
  return n[0] = l[4], n[1] = l[5], n[2] = l[6], n[3] = l[7], n;
}
var $O = f2;
function VO(n, l) {
  return n[4] = l[0], n[5] = l[1], n[6] = l[2], n[7] = l[3], n;
}
function qO(n, l) {
  var s = l[4], d = l[5], h = l[6], m = l[7], p = -l[0], E = -l[1], C = -l[2], T = l[3];
  return n[0] = (s * T + m * p + d * C - h * E) * 2, n[1] = (d * T + m * E + h * p - s * C) * 2, n[2] = (h * T + m * C + s * E - d * p) * 2, n;
}
function IO(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = s[0] * 0.5, C = s[1] * 0.5, T = s[2] * 0.5, b = l[4], R = l[5], D = l[6], k = l[7];
  return n[0] = d, n[1] = h, n[2] = m, n[3] = p, n[4] = p * E + h * T - m * C + b, n[5] = p * C + m * E - d * T + R, n[6] = p * T + d * C - h * E + D, n[7] = -d * E - h * C - m * T + k, n;
}
function YO(n, l, s) {
  var d = -l[0], h = -l[1], m = -l[2], p = l[3], E = l[4], C = l[5], T = l[6], b = l[7], R = E * p + b * d + C * m - T * h, D = C * p + b * h + T * d - E * m, k = T * p + b * m + E * h - C * d, z = b * p - E * d - C * h - T * m;
  return hw(n, l, s), d = n[0], h = n[1], m = n[2], p = n[3], n[4] = R * p + z * d + D * m - k * h, n[5] = D * p + z * h + k * d - R * m, n[6] = k * p + z * m + R * h - D * d, n[7] = z * p - R * d - D * h - k * m, n;
}
function WO(n, l, s) {
  var d = -l[0], h = -l[1], m = -l[2], p = l[3], E = l[4], C = l[5], T = l[6], b = l[7], R = E * p + b * d + C * m - T * h, D = C * p + b * h + T * d - E * m, k = T * p + b * m + E * h - C * d, z = b * p - E * d - C * h - T * m;
  return mw(n, l, s), d = n[0], h = n[1], m = n[2], p = n[3], n[4] = R * p + z * d + D * m - k * h, n[5] = D * p + z * h + k * d - R * m, n[6] = k * p + z * m + R * h - D * d, n[7] = z * p - R * d - D * h - k * m, n;
}
function BO(n, l, s) {
  var d = -l[0], h = -l[1], m = -l[2], p = l[3], E = l[4], C = l[5], T = l[6], b = l[7], R = E * p + b * d + C * m - T * h, D = C * p + b * h + T * d - E * m, k = T * p + b * m + E * h - C * d, z = b * p - E * d - C * h - T * m;
  return yw(n, l, s), d = n[0], h = n[1], m = n[2], p = n[3], n[4] = R * p + z * d + D * m - k * h, n[5] = D * p + z * h + k * d - R * m, n[6] = k * p + z * m + R * h - D * d, n[7] = z * p - R * d - D * h - k * m, n;
}
function QO(n, l, s) {
  var d = s[0], h = s[1], m = s[2], p = s[3], E = l[0], C = l[1], T = l[2], b = l[3];
  return n[0] = E * p + b * d + C * m - T * h, n[1] = C * p + b * h + T * d - E * m, n[2] = T * p + b * m + E * h - C * d, n[3] = b * p - E * d - C * h - T * m, E = l[4], C = l[5], T = l[6], b = l[7], n[4] = E * p + b * d + C * m - T * h, n[5] = C * p + b * h + T * d - E * m, n[6] = T * p + b * m + E * h - C * d, n[7] = b * p - E * d - C * h - T * m, n;
}
function GO(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = s[0], C = s[1], T = s[2], b = s[3];
  return n[0] = d * b + p * E + h * T - m * C, n[1] = h * b + p * C + m * E - d * T, n[2] = m * b + p * T + d * C - h * E, n[3] = p * b - d * E - h * C - m * T, E = s[4], C = s[5], T = s[6], b = s[7], n[4] = d * b + p * E + h * T - m * C, n[5] = h * b + p * C + m * E - d * T, n[6] = m * b + p * T + d * C - h * E, n[7] = p * b - d * E - h * C - m * T, n;
}
function XO(n, l, s, d) {
  if (Math.abs(d) < Ct)
    return Tw(n, l);
  var h = Math.sqrt(s[0] * s[0] + s[1] * s[1] + s[2] * s[2]);
  d = d * 0.5;
  var m = Math.sin(d), p = m * s[0] / h, E = m * s[1] / h, C = m * s[2] / h, T = Math.cos(d), b = l[0], R = l[1], D = l[2], k = l[3];
  n[0] = b * T + k * p + R * C - D * E, n[1] = R * T + k * E + D * p - b * C, n[2] = D * T + k * C + b * E - R * p, n[3] = k * T - b * p - R * E - D * C;
  var z = l[4], A = l[5], N = l[6], X = l[7];
  return n[4] = z * T + X * p + A * C - N * E, n[5] = A * T + X * E + N * p - z * C, n[6] = N * T + X * C + z * E - A * p, n[7] = X * T - z * p - A * E - N * C, n;
}
function KO(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n[4] = l[4] + s[4], n[5] = l[5] + s[5], n[6] = l[6] + s[6], n[7] = l[7] + s[7], n;
}
function Rw(n, l, s) {
  var d = l[0], h = l[1], m = l[2], p = l[3], E = s[4], C = s[5], T = s[6], b = s[7], R = l[4], D = l[5], k = l[6], z = l[7], A = s[0], N = s[1], X = s[2], K = s[3];
  return n[0] = d * K + p * A + h * X - m * N, n[1] = h * K + p * N + m * A - d * X, n[2] = m * K + p * X + d * N - h * A, n[3] = p * K - d * A - h * N - m * X, n[4] = d * b + p * E + h * T - m * C + R * K + z * A + D * X - k * N, n[5] = h * b + p * C + m * E - d * T + D * K + z * N + k * A - R * X, n[6] = m * b + p * T + d * C - h * E + k * K + z * X + R * N - D * A, n[7] = p * b - d * E - h * C - m * T + z * K - R * A - D * N - k * X, n;
}
var ZO = Rw;
function JO(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n[3] = l[3] * s, n[4] = l[4] * s, n[5] = l[5] * s, n[6] = l[6] * s, n[7] = l[7] * s, n;
}
var bw = d2;
function ez(n, l, s, d) {
  var h = 1 - d;
  return bw(l, s) < 0 && (d = -d), n[0] = l[0] * h + s[0] * d, n[1] = l[1] * h + s[1] * d, n[2] = l[2] * h + s[2] * d, n[3] = l[3] * h + s[3] * d, n[4] = l[4] * h + s[4] * d, n[5] = l[5] * h + s[5] * d, n[6] = l[6] * h + s[6] * d, n[7] = l[7] * h + s[7] * d, n;
}
function tz(n, l) {
  var s = Ly(l);
  return n[0] = -l[0] / s, n[1] = -l[1] / s, n[2] = -l[2] / s, n[3] = l[3] / s, n[4] = -l[4] / s, n[5] = -l[5] / s, n[6] = -l[6] / s, n[7] = l[7] / s, n;
}
function nz(n, l) {
  return n[0] = -l[0], n[1] = -l[1], n[2] = -l[2], n[3] = l[3], n[4] = -l[4], n[5] = -l[5], n[6] = -l[6], n[7] = l[7], n;
}
var xw = v2, rz = xw, Ly = p2, az = Ly;
function iz(n, l) {
  var s = Ly(l);
  if (s > 0) {
    s = Math.sqrt(s);
    var d = l[0] / s, h = l[1] / s, m = l[2] / s, p = l[3] / s, E = l[4], C = l[5], T = l[6], b = l[7], R = d * E + h * C + m * T + p * b;
    n[0] = d, n[1] = h, n[2] = m, n[3] = p, n[4] = (E - d * R) / s, n[5] = (C - h * R) / s, n[6] = (T - m * R) / s, n[7] = (b - p * R) / s;
  }
  return n;
}
function lz(n) {
  return "quat2(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ")";
}
function oz(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2] && n[3] === l[3] && n[4] === l[4] && n[5] === l[5] && n[6] === l[6] && n[7] === l[7];
}
function uz(n, l) {
  var s = n[0], d = n[1], h = n[2], m = n[3], p = n[4], E = n[5], C = n[6], T = n[7], b = l[0], R = l[1], D = l[2], k = l[3], z = l[4], A = l[5], N = l[6], X = l[7];
  return Math.abs(s - b) <= Ct * Math.max(1, Math.abs(s), Math.abs(b)) && Math.abs(d - R) <= Ct * Math.max(1, Math.abs(d), Math.abs(R)) && Math.abs(h - D) <= Ct * Math.max(1, Math.abs(h), Math.abs(D)) && Math.abs(m - k) <= Ct * Math.max(1, Math.abs(m), Math.abs(k)) && Math.abs(p - z) <= Ct * Math.max(1, Math.abs(p), Math.abs(z)) && Math.abs(E - A) <= Ct * Math.max(1, Math.abs(E), Math.abs(A)) && Math.abs(C - N) <= Ct * Math.max(1, Math.abs(C), Math.abs(N)) && Math.abs(T - X) <= Ct * Math.max(1, Math.abs(T), Math.abs(X));
}
const sz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: KO,
  clone: OO,
  conjugate: nz,
  copy: Tw,
  create: DO,
  dot: bw,
  equals: uz,
  exactEquals: oz,
  fromMat4: UO,
  fromRotation: NO,
  fromRotationTranslation: ww,
  fromRotationTranslationValues: LO,
  fromTranslation: AO,
  fromValues: zO,
  getDual: PO,
  getReal: HO,
  getTranslation: qO,
  identity: jO,
  invert: tz,
  len: rz,
  length: xw,
  lerp: ez,
  mul: ZO,
  multiply: Rw,
  normalize: iz,
  rotateAroundAxis: XO,
  rotateByQuatAppend: QO,
  rotateByQuatPrepend: GO,
  rotateX: YO,
  rotateY: WO,
  rotateZ: BO,
  scale: JO,
  set: FO,
  setDual: VO,
  setReal: $O,
  sqrLen: az,
  squaredLength: Ly,
  str: lz,
  translate: IO
}, Symbol.toStringTag, { value: "Module" }));
function Mw() {
  var n = new En(2);
  return En != Float32Array && (n[0] = 0, n[1] = 0), n;
}
function cz(n) {
  var l = new En(2);
  return l[0] = n[0], l[1] = n[1], l;
}
function fz(n, l) {
  var s = new En(2);
  return s[0] = n, s[1] = l, s;
}
function dz(n, l) {
  return n[0] = l[0], n[1] = l[1], n;
}
function vz(n, l, s) {
  return n[0] = l, n[1] = s, n;
}
function pz(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n;
}
function _w(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n;
}
function kw(n, l, s) {
  return n[0] = l[0] * s[0], n[1] = l[1] * s[1], n;
}
function Dw(n, l, s) {
  return n[0] = l[0] / s[0], n[1] = l[1] / s[1], n;
}
function hz(n, l) {
  return n[0] = Math.ceil(l[0]), n[1] = Math.ceil(l[1]), n;
}
function mz(n, l) {
  return n[0] = Math.floor(l[0]), n[1] = Math.floor(l[1]), n;
}
function yz(n, l, s) {
  return n[0] = Math.min(l[0], s[0]), n[1] = Math.min(l[1], s[1]), n;
}
function gz(n, l, s) {
  return n[0] = Math.max(l[0], s[0]), n[1] = Math.max(l[1], s[1]), n;
}
function Sz(n, l) {
  return n[0] = ko(l[0]), n[1] = ko(l[1]), n;
}
function Ez(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n;
}
function Cz(n, l, s, d) {
  return n[0] = l[0] + s[0] * d, n[1] = l[1] + s[1] * d, n;
}
function Ow(n, l) {
  var s = l[0] - n[0], d = l[1] - n[1];
  return Math.sqrt(s * s + d * d);
}
function zw(n, l) {
  var s = l[0] - n[0], d = l[1] - n[1];
  return s * s + d * d;
}
function Lw(n) {
  var l = n[0], s = n[1];
  return Math.sqrt(l * l + s * s);
}
function Aw(n) {
  var l = n[0], s = n[1];
  return l * l + s * s;
}
function wz(n, l) {
  return n[0] = -l[0], n[1] = -l[1], n;
}
function Tz(n, l) {
  return n[0] = 1 / l[0], n[1] = 1 / l[1], n;
}
function Rz(n, l) {
  var s = l[0], d = l[1], h = s * s + d * d;
  return h > 0 && (h = 1 / Math.sqrt(h)), n[0] = l[0] * h, n[1] = l[1] * h, n;
}
function bz(n, l) {
  return n[0] * l[0] + n[1] * l[1];
}
function xz(n, l, s) {
  var d = l[0] * s[1] - l[1] * s[0];
  return n[0] = n[1] = 0, n[2] = d, n;
}
function Mz(n, l, s, d) {
  var h = l[0], m = l[1];
  return n[0] = h + d * (s[0] - h), n[1] = m + d * (s[1] - m), n;
}
function _z(n, l) {
  l = l === void 0 ? 1 : l;
  var s = Bl() * 2 * Math.PI;
  return n[0] = Math.cos(s) * l, n[1] = Math.sin(s) * l, n;
}
function kz(n, l, s) {
  var d = l[0], h = l[1];
  return n[0] = s[0] * d + s[2] * h, n[1] = s[1] * d + s[3] * h, n;
}
function Dz(n, l, s) {
  var d = l[0], h = l[1];
  return n[0] = s[0] * d + s[2] * h + s[4], n[1] = s[1] * d + s[3] * h + s[5], n;
}
function Oz(n, l, s) {
  var d = l[0], h = l[1];
  return n[0] = s[0] * d + s[3] * h + s[6], n[1] = s[1] * d + s[4] * h + s[7], n;
}
function zz(n, l, s) {
  var d = l[0], h = l[1];
  return n[0] = s[0] * d + s[4] * h + s[12], n[1] = s[1] * d + s[5] * h + s[13], n;
}
function Lz(n, l, s, d) {
  var h = l[0] - s[0], m = l[1] - s[1], p = Math.sin(d), E = Math.cos(d);
  return n[0] = h * E - m * p + s[0], n[1] = h * p + m * E + s[1], n;
}
function Az(n, l) {
  var s = n[0], d = n[1], h = l[0], m = l[1];
  return Math.abs(Math.atan2(d * h - s * m, s * h + d * m));
}
function Nz(n, l) {
  var s = n[0], d = n[1], h = l[0], m = l[1];
  return Math.atan2(s * m - d * h, s * h + d * m);
}
function Uz(n) {
  return n[0] = 0, n[1] = 0, n;
}
function jz(n) {
  return "vec2(" + n[0] + ", " + n[1] + ")";
}
function Fz(n, l) {
  return n[0] === l[0] && n[1] === l[1];
}
function Hz(n, l) {
  var s = n[0], d = n[1], h = l[0], m = l[1];
  return Math.abs(s - h) <= Ct * Math.max(1, Math.abs(s), Math.abs(h)) && Math.abs(d - m) <= Ct * Math.max(1, Math.abs(d), Math.abs(m));
}
var Pz = Lw, $z = _w, Vz = kw, qz = Dw, Iz = Ow, Yz = zw, Wz = Aw, Bz = (function() {
  var n = Mw();
  return function(l, s, d, h, m, p) {
    var E, C;
    for (s || (s = 2), d || (d = 0), h ? C = Math.min(h * s + d, l.length) : C = l.length, E = d; E < C; E += s)
      n[0] = l[E], n[1] = l[E + 1], m(n, n, p), l[E] = n[0], l[E + 1] = n[1];
    return l;
  };
})();
const Qz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: pz,
  angle: Az,
  ceil: hz,
  clone: cz,
  copy: dz,
  create: Mw,
  cross: xz,
  dist: Iz,
  distance: Ow,
  div: qz,
  divide: Dw,
  dot: bz,
  equals: Hz,
  exactEquals: Fz,
  floor: mz,
  forEach: Bz,
  fromValues: fz,
  inverse: Tz,
  len: Pz,
  length: Lw,
  lerp: Mz,
  max: gz,
  min: yz,
  mul: Vz,
  multiply: kw,
  negate: wz,
  normalize: Rz,
  random: _z,
  rotate: Lz,
  round: Sz,
  scale: Ez,
  scaleAndAdd: Cz,
  set: vz,
  signedAngle: Nz,
  sqrDist: Yz,
  sqrLen: Wz,
  squaredDistance: zw,
  squaredLength: Aw,
  str: jz,
  sub: $z,
  subtract: _w,
  transformMat2: kz,
  transformMat2d: Dz,
  transformMat3: Oz,
  transformMat4: zz,
  zero: Uz
}, Symbol.toStringTag, { value: "Module" })), Gz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: q_,
  mat2: pk,
  mat2d: Fk,
  mat3: p5,
  mat4: $C,
  quat: kO,
  quat2: sz,
  vec2: Qz,
  vec3: ND,
  vec4: iO
}, Symbol.toStringTag, { value: "Module" })), Ay = Oy;
function Ny() {
  ur.call(this), this.events = {
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
var cr = Ny.prototype = Object.create(ur.prototype), Qi = new Float32Array([0, 0, 0]), El = new Float32Array(16);
cr.constructor = Ny;
cr.local = null;
cr.worldMatrix = null;
cr.worldToLocal = null;
cr.children = null;
cr.parent = null;
cr.dirtyW = !0;
cr.dirtyL = !0;
cr.onParentUpdate = null;
cr.addChild = function(n) {
  this.children[this.children.length] = n, n.setParent(this);
};
cr.removeChild = function(n) {
  this.children.splice(this.children.indexOf(n), 1), n.removeParent();
};
cr.setParent = function(n) {
  this.parent = n, n.gameObject.world !== null && n.gameObject.world.addGameObject(this.gameObject);
};
cr.setGameObject = function(n) {
  ur.prototype.setGameObject.call(this, n), n.transform = this;
};
cr.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
cr.removeParent = function() {
  this.parent = null;
};
cr.translate = function(n, l, s, d) {
  Qi[0] = n, Qi[1] = l, Qi[2] = s, d === "world" ? (l2(El), r2(El, El, Qi), Ay(this.local, El, this.local)) : r2(this.local, this.local, Qi);
};
cr.rotate = function(n, l, s, d) {
  var h = Math.PI / 180, m = $C;
  d === "world" ? (m.identity(El), m.rotateZ(El, El, s * h), m.rotateY(El, El, l * h), m.rotateX(El, El, n * h), Ay(this.local, El, this.local)) : (m.rotateZ(this.local, this.local, s * h), m.rotateY(this.local, this.local, l * h), m.rotateX(this.local, this.local, n * h));
};
cr.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.worldMatrix.set(this.local) : Ay(this.worldMatrix, this.parent.getLocalToWorld(), this.local)), this.worldMatrix;
};
cr.getWorldToLocal = function() {
  return this.dirtyW === !0 && DC(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
};
cr.getPosition = function(n) {
  n === void 0 && (n = []);
  var l = this.getLocalToWorld();
  return n[0] = l[12], n[1] = l[13], n[2] = l[14], n;
};
cr.getLocalPosition = function(n) {
  n === void 0 && (n = []);
  var l = this.local;
  return n[0] = l[12], n[1] = l[13], n[2] = l[14], n;
};
cr.getRotation = function() {
  throw "TransformComponent.getRotation not implemented yet";
};
cr.getLocalRotation = function() {
  throw "TransformComponent.getLocalRotation not implemented yet";
};
cr.setPosition = function(n, l, s) {
  Qi[0] = n, Qi[1] = l, Qi[2] = s, this.parent !== null && XC(Qi, Qi, this.parent.getWorldToLocal()), this.local[12] = Qi[0], this.local[13] = Qi[1], this.local[14] = Qi[2];
};
cr.setLocalPosition = function(n, l, s) {
  this.local[12] = n, this.local[13] = l, this.local[14] = s;
};
cr.scale = function(n, l, s) {
  zC(this.local, this.local, [n, l, s]);
};
cr.updateWorldMatrix = function(n = !1) {
  this.parent === null ? this.worldMatrix.set(this.local) : (n && this.parent.updateWorldMatrix(n), Ay(this.worldMatrix, this.parent.worldMatrix, this.local));
};
function pi(n) {
  this.instanceId = pi.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new Ny()), this.name = n || "gameObject";
}
var Cl = pi.prototype;
Cl.instanceId = 0;
Cl.name = null;
Cl.layer = 0;
Cl.scene = null;
Cl.world = null;
Cl.transform = null;
Cl.components = null;
Cl.componentsCount = 0;
Cl.setScene = function(n) {
  this.scene = n;
};
Cl.addComponent = function(n) {
  return this.components[this.componentsCount++] = n, n.setGameObject(this), n;
};
Cl.removeComponent = function(n) {
  n.unsetGameObject();
};
Cl.getComponent = function(n) {
  for (var l = 0; l < this.components.length; l++) {
    var s = this.components[l];
    if (s instanceof n)
      return s;
  }
  return null;
};
const Nw = {
  NONE: 0,
  RADIAL: 1,
  RADIAL_FAST: 2,
  LINEAR: 3
};
function Pr(n) {
  ur.call(this), this.transform = n, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ], this.zoom = 1;
}
Pr.prototype = Object.create(ur.prototype);
Pr.prototype.constructor = Pr;
Pr.prototype.frustumSize = null;
Pr.prototype.projectionMatrix = null;
Pr.prototype.clipSpaceMatrix = null;
Pr.prototype.nearClippingPane = 0;
Pr.prototype.farClippingPane = 1e3;
Pr.prototype.fogType = Nw.LINEAR;
Pr.prototype.fogNearPane = 250;
Pr.prototype.fogFarPane = 750;
Pr.prototype.fogColor = 9868950;
Pr.prototype.bgColor = -1;
Pr.prototype.ambientLight = 8421504;
Pr.prototype.setup = function(n, l) {
  const s = n / this.zoom, d = l / this.zoom;
  this.frustumSize = [
    [-s / 2, -d / 2, 0],
    [s / 2, d / 2, this.farClippingPane]
  ], HC(this.projectionMatrix, -s / 2, s / 2, -d / 2, d / 2, this.nearClippingPane, this.farClippingPane);
};
Pr.prototype.setGameObject = function(n) {
  ur.prototype.setGameObject.call(this, n), n.camera = this;
};
Pr.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, ur.prototype.unsetGameObject.call(this);
};
Pr.prototype.getClipSpaceMatrix = function() {
  const n = this.transform.getWorldToLocal();
  return Oy(this.clipSpaceMatrix, this.projectionMatrix, n), this.clipSpaceMatrix;
};
Pr.FogType = Nw;
function Uw(n) {
  pi.call(this, n || "camera"), this.addComponent(new Pr(this.transform));
}
Uw.prototype = Object.create(pi.prototype);
function Xr() {
  ur.call(this), this.depthBias = 0;
}
var fa = Xr.prototype = Object.create(ur.prototype);
fa.constructor = Xr;
fa.depthBias = 0;
fa.layer = 0;
fa.vertices = null;
fa.faces = null;
fa.pivot = [0, 0, 0];
fa.color = null;
fa.colors = null;
fa.uvs = null;
fa._texture = null;
fa.textureImage = null;
fa.shaderType = 0;
Object.defineProperty(fa, "texture", {
  get: function() {
    return this._texture;
  },
  set: function(n) {
    this._texture !== n && (this._texture = n, n ? (this.textureImage || (this.textureImage = new Image()), this.textureImage.src = n) : this.textureImage = null);
  }
});
fa.faceNormals = null;
fa.vertexNormals = null;
fa.bounds = null;
fa.updateNormals = function(n = 1) {
  const l = this.faces, s = this.vertices, d = l.length;
  (!this.faceNormals || this.faceNormals.length !== d) && (this.faceNormals = new Float32Array(d)), !this.vertexNormals || this.vertexNormals.length !== s.length ? this.vertexNormals = new Float32Array(s.length) : this.vertexNormals.fill(0);
  for (let m = 0; m < d; m += 3) {
    const p = l[m] * 3, E = l[m + 1] * 3, C = l[m + 2] * 3, T = s[E] - s[p], b = s[E + 1] - s[p + 1], R = s[E + 2] - s[p + 2], D = s[C] - s[p], k = s[C + 1] - s[p + 1], z = s[C + 2] - s[p + 2];
    let A = (b * z - R * k) * n, N = (R * D - T * z) * n, X = (T * k - b * D) * n;
    const K = Math.sqrt(A * A + N * N + X * X);
    if (K > 1e-10) {
      const Y = 1 / K;
      this.faceNormals[m] = A * Y, this.faceNormals[m + 1] = N * Y, this.faceNormals[m + 2] = X * Y, this.vertexNormals[p] += A, this.vertexNormals[p + 1] += N, this.vertexNormals[p + 2] += X, this.vertexNormals[E] += A, this.vertexNormals[E + 1] += N, this.vertexNormals[E + 2] += X, this.vertexNormals[C] += A, this.vertexNormals[C + 1] += N, this.vertexNormals[C + 2] += X;
    }
  }
  const h = {};
  for (let m = 0; m < s.length; m += 3) {
    const p = Math.abs(s[m]) < 1e-4 ? 0 : s[m], E = Math.abs(s[m + 1]) < 1e-4 ? 0 : s[m + 1], C = Math.abs(s[m + 2]) < 1e-4 ? 0 : s[m + 2], T = `${p.toFixed(4)},${E.toFixed(4)},${C.toFixed(4)}`;
    h[T] || (h[T] = []), h[T].push(m);
  }
  for (const m in h) {
    const p = h[m];
    if (p.length > 1) {
      let E = 0, C = 0, T = 0;
      for (let b = 0; b < p.length; b++) {
        const R = p[b];
        E += this.vertexNormals[R], C += this.vertexNormals[R + 1], T += this.vertexNormals[R + 2];
      }
      for (let b = 0; b < p.length; b++) {
        const R = p[b];
        this.vertexNormals[R] = E, this.vertexNormals[R + 1] = C, this.vertexNormals[R + 2] = T;
      }
    }
  }
  for (let m = 0; m < this.vertexNormals.length; m += 3) {
    const p = this.vertexNormals[m], E = this.vertexNormals[m + 1], C = this.vertexNormals[m + 2], T = Math.sqrt(p * p + E * E + C * C);
    if (T > 1e-10) {
      const b = 1 / T;
      this.vertexNormals[m] *= b, this.vertexNormals[m + 1] *= b, this.vertexNormals[m + 2] *= b;
    } else
      this.vertexNormals[m + 1] = 1;
  }
};
fa.setGameObject = function(n) {
  ur.prototype.setGameObject.call(this, n), n.meshRenderer = this;
};
fa.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, ur.prototype.unsetGameObject.call(this);
};
Xr.computeNormalMatrix = function(n, l) {
  const s = l[0], d = l[1], h = l[2], m = l[4], p = l[5], E = l[6], C = l[8], T = l[9], b = l[10], R = p * b - E * T, D = -(m * b - E * C), k = m * T - p * C, z = s * R + d * D + h * k;
  if (Math.abs(z) < 1e-6) return null;
  const A = 1 / z;
  n[0] = R * A, n[1] = D * A, n[2] = k * A, n[3] = -(d * b - h * T) * A, n[4] = (s * b - h * C) * A, n[5] = -(s * T - d * C) * A, n[6] = (d * E - h * p) * A, n[7] = -(s * E - h * m) * A, n[8] = (s * p - d * m) * A;
};
Xr.computeBoundsFlatArray = function(n, l, s) {
  if (s.length !== 0) {
    for (var d = s[0], h = d, m = s[1], p = m, E = s[2], C = E, T = 3; T < s.length; T += 3) {
      var b = s[T], R = s[T + 1], D = s[T + 2];
      b < d ? d = b : b > h && (h = b), R < m ? m = R : R > p && (p = R), D < E ? E = D : D > C && (C = D);
    }
    return n[l] = d, n[l + 1] = m, n[l + 2] = E, n[l + 3] = h, n[l + 4] = m, n[l + 5] = E, n[l + 6] = d, n[l + 7] = p, n[l + 8] = E, n[l + 9] = h, n[l + 10] = p, n[l + 11] = E, n[l + 12] = d, n[l + 13] = m, n[l + 14] = C, n[l + 15] = h, n[l + 16] = m, n[l + 17] = C, n[l + 18] = d, n[l + 19] = p, n[l + 20] = C, n[l + 21] = h, n[l + 22] = p, n[l + 23] = C, n;
  }
};
Xr.computeBoundingSphere = function(n, l, s) {
  let d = 1 / 0, h = 1 / 0, m = 1 / 0, p = -1 / 0, E = -1 / 0, C = -1 / 0;
  for (let N = 0; N < s.length; N += 3) {
    const X = s[N], K = s[N + 1], Y = s[N + 2];
    X < d && (d = X), X > p && (p = X), K < h && (h = K), K > E && (E = K), Y < m && (m = Y), Y > C && (C = Y);
  }
  const T = (d + p) * 0.5, b = (h + E) * 0.5, R = (m + C) * 0.5, D = p - T, k = E - b, z = C - R, A = Math.sqrt(D * D + k * k + z * z);
  n[l] = T, n[l + 1] = b, n[l + 2] = R, n[l + 3] = A;
};
function m2(n) {
  ur.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var Eu = m2.prototype = Object.create(ur.prototype);
Eu.constructor = m2;
Eu.sprite = null;
Eu.pivotX = 0;
Eu.pivotY = 0;
Eu.layer = 0;
Eu.setGameObject = function(n) {
  ur.prototype.setGameObject.call(this, n), n.spriteRenderer = this;
};
Eu.setSprite = function(n) {
  return this.sprite = n, this.enabled = !0, this;
};
Eu.setPivot = function(n, l) {
  return this.pivotX = n, this.pivotY = l, this;
};
Eu.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, ur.prototype.unsetGameObject.call(this);
};
function y2() {
  ur.call(this), this.points = [];
}
var Dc = y2.prototype = Object.create(ur.prototype);
Dc.constructor = y2;
Dc.points = null;
Dc.color = "white";
Dc.width = 1;
Dc.layer = 0;
Dc.setGameObject = function(n) {
  ur.prototype.setGameObject.call(this, n), n.pathRenderer = this;
};
Dc.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, ur.prototype.unsetGameObject.call(this);
};
function g2() {
  ur.call(this);
}
var Cu = g2.prototype = Object.create(ur.prototype);
Cu.constructor = g2;
Cu.text = "sample text";
Cu.color = "white";
Cu.style = "normal 12px arial";
Cu.layer = 0;
Cu.align = "center";
Cu.valign = "middle";
Cu.setGameObject = function(n) {
  ur.prototype.setGameObject.call(this, n), n.textRenderer = this;
};
Cu.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, ur.prototype.unsetGameObject.call(this);
};
function Xz(n, l, s) {
  const d = [], h = [], m = n / 2, p = l / 2, E = n / s, C = l / s;
  for (let b = 0; b <= s; b++) {
    const R = b * C - p;
    for (let D = 0; D <= s; D++) {
      const k = D * E - m;
      d.push(k, 0, R);
    }
  }
  const T = s + 1;
  for (let b = 0; b < s; b++)
    for (let R = 0; R < s; R++) {
      const D = b * T + R, k = b * T + (R + 1), z = (b + 1) * T + R, A = (b + 1) * T + (R + 1);
      h.push(D, z, k), h.push(A, k, z);
    }
  return {
    vertices: new Float32Array(d),
    faces: new Uint16Array(h),
    colors: new Uint32Array(d.length / 3).fill(255)
  };
}
const Mp = Xz(1, 1, 1), S2 = new Float32Array(32);
Xr.computeBoundsFlatArray(S2, 0, Mp.vertices);
Xr.computeBoundingSphere(S2, 28, Mp.vertices);
function jw() {
  pi.call(this);
  const n = new Xr();
  n.faces = Mp.faces, n.vertices = Mp.vertices, n.colors = Mp.colors, n.bounds = S2, n.updateNormals(), this.addComponent(n);
}
jw.prototype = Object.create(pi.prototype);
function Kz(n, l, s, d) {
  const h = [], m = [], p = [];
  function E(T, b, R, D, k, z) {
    const A = `${T.toFixed(5)},${b.toFixed(5)},${R.toFixed(5)}`;
    if (z[A] !== void 0) return z[A];
    const N = h.length / 3;
    return h.push(T, b, R), m.push(D, k), z[A] = N, N;
  }
  function C(T, b, R, D, k, z, A, N, X, K) {
    const Y = {}, P = A / K, $ = N / K, Q = A / 2, re = N / 2, Re = X / 2 * z, he = [];
    for (let G = 0; G <= K; G++) {
      const se = [], fe = G * $ - re;
      for (let ae = 0; ae <= K; ae++) {
        const q = ae * P - Q, we = [0, 0, 0];
        we[T] = q * D, we[b] = fe * k, we[R] = Re;
        const Ne = ae / K, de = 1 - G / K;
        se.push(E(we[0], we[1], we[2], Ne, de, Y));
      }
      he.push(se);
    }
    for (let G = 0; G < K; G++)
      for (let se = 0; se < K; se++) {
        const fe = he[G][se], ae = he[G + 1][se], q = he[G + 1][se + 1], we = he[G][se + 1];
        p.push(fe, we, ae), p.push(ae, we, q);
      }
  }
  return C(0, 1, 2, 1, 1, 1, n, l, s, d), C(0, 1, 2, -1, 1, -1, n, l, s, d), C(2, 1, 0, -1, 1, 1, s, l, n, d), C(2, 1, 0, 1, 1, -1, s, l, n, d), C(0, 2, 1, 1, -1, 1, n, s, l, d), C(0, 2, 1, 1, 1, -1, n, s, l, d), {
    vertices: new Float32Array(h),
    uvs: new Float32Array(m),
    faces: new Uint16Array(p),
    colors: new Uint32Array(h.length / 3).fill(255)
  };
}
const md = Kz(1, 1, 1, 1), E2 = new Float32Array(32);
Xr.computeBoundsFlatArray(E2, 0, md.vertices);
Xr.computeBoundingSphere(E2, 28, md.vertices);
function Fw() {
  pi.call(this);
  const n = new Xr();
  n.vertices = md.vertices, n.uvs = md.uvs, n.faces = md.faces, n.colors = md.colors, n.bounds = E2, n.updateNormals(), this.addComponent(n);
}
Fw.prototype = Object.create(pi.prototype);
function Zz(n, l, s) {
  const d = [], h = [];
  d.push(0, s, 0), d.push(0, 0, 0);
  for (let m = 0; m < n; m++) {
    const p = m / n * Math.PI * 2, E = Math.cos(p) * l, C = Math.sin(p) * l;
    d.push(E, 0, C);
  }
  for (let m = 0; m < n; m++) {
    const p = m + 2, E = m === n - 1 ? 2 : m + 3;
    h.push(0, E, p), h.push(1, p, E);
  }
  return {
    vertices: new Float32Array(d),
    faces: new Uint16Array(h),
    colors: new Uint32Array(d.length / 3).fill(255)
  };
}
const _p = Zz(7, 0.5, 1), C2 = new Float32Array(32);
Xr.computeBoundsFlatArray(C2, 0, _p.vertices);
Xr.computeBoundingSphere(C2, 28, _p.vertices);
function Hw() {
  pi.call(this);
  const n = new Xr();
  n.vertices = _p.vertices, n.faces = _p.faces, n.colors = _p.colors, n.bounds = C2, n.updateNormals(), this.addComponent(n);
}
Hw.prototype = Object.create(pi.prototype);
function Jz(n, l, s) {
  const d = [], h = [], m = [], p = {};
  function E(T, b, R, D, k) {
    const z = `${T.toFixed(5)},${b.toFixed(5)},${R.toFixed(5)}`;
    if (p[z] !== void 0) return p[z];
    const A = d.length / 3;
    return d.push(T, b, R), h.push(D, k), p[z] = A, A;
  }
  const C = [];
  for (let T = 0; T <= n; T++) {
    const b = [], R = T * Math.PI / n, D = Math.sin(R), k = Math.cos(R);
    for (let z = 0; z <= l; z++) {
      const A = z * 2 * Math.PI / l, N = Math.cos(A) * D * s, X = k * s, K = Math.sin(A) * D * s, Y = z / l, P = T / n;
      b.push(E(N, X, K, Y, P));
    }
    C.push(b);
  }
  for (let T = 0; T < n; T++)
    for (let b = 0; b < l; b++) {
      const R = C[T][b], D = C[T][b + 1], k = C[T + 1][b], z = C[T + 1][b + 1];
      T !== 0 && m.push(R, D, k), T !== n - 1 && m.push(k, D, z);
    }
  return {
    vertices: new Float32Array(d),
    uvs: new Float32Array(h),
    faces: new Uint16Array(m),
    colors: new Uint32Array(d.length / 3).fill(255)
  };
}
function e4(n = 8, l = 8, s = 8) {
  const d = Jz(n, l, s), h = new Float32Array(32);
  return Xr.computeBoundsFlatArray(h, 0, d.vertices), Xr.computeBoundingSphere(h, 28, d.vertices), [
    d.vertices,
    d.faces,
    d.uvs,
    h,
    d.colors
  ];
}
function w2(n, l, s, d, h) {
  pi.call(this);
  const m = new Xr();
  m.vertices = n, m.faces = l, m.uvs = s, m.colors = h || new Uint32Array(n.length / 3).fill(255), m.bounds = d, m.updateNormals(), this.addComponent(m);
}
w2.prototype = Object.create(pi.prototype);
w2.generate = e4;
function t4() {
  const n = new Array(65536);
  for (let l = 0; l < 65536; l++) {
    const s = l >> 11 & 31, d = l >> 5 & 63, h = l & 31, m = s << 3 | s >> 2, p = d << 2 | d >> 4, E = h << 3 | h >> 2;
    n[l] = "#" + (m < 16 ? "0" : "") + m.toString(16) + (p < 16 ? "0" : "") + p.toString(16) + (E < 16 ? "0" : "") + E.toString(16);
  }
  return n;
}
const Bn = t4(), n4 = U_, Zg = 25;
function r4(n, l, s, d) {
  const h = s[0], m = s[1], p = s[4], E = s[5], C = s[8], T = s[9], b = new Path2D(), R = new Path2D(), D = new Path2D();
  for (let k = 0; k < n.length; k++) {
    const z = n[k];
    if (!z || !z.transform) continue;
    const A = z.transform.getLocalToWorld(), N = A[12], X = A[13], K = A[14];
    n4(d, 0, N, X, K, s);
    const Y = d[0], P = d[1];
    let $ = A[0], Q = A[1], re = A[2], Re = Math.sqrt($ * $ + Q * Q + re * re);
    Re < 1e-4 && ($ = 1, Q = 0, re = 0, Re = 1);
    const he = Zg / Re;
    b.moveTo(Y, P), b.lineTo(Y + ($ * h + Q * p + re * C) * he, P + ($ * m + Q * E + re * T) * he);
    let G = A[4], se = A[5], fe = A[6], ae = Math.sqrt(G * G + se * se + fe * fe);
    ae < 1e-4 && (G = 0, se = 1, fe = 0, ae = 1);
    const q = Zg / ae;
    R.moveTo(Y, P), R.lineTo(Y + (G * h + se * p + fe * C) * q, P + (G * m + se * E + fe * T) * q);
    let we = A[8], Ne = A[9], de = A[10], ie = Math.sqrt(we * we + Ne * Ne + de * de);
    ie < 1e-4 && (we = 0, Ne = 0, de = 1, ie = 1);
    const Se = Zg / ie;
    D.moveTo(Y, P), D.lineTo(Y + (we * h + Ne * p + de * C) * Se, P + (we * m + Ne * E + de * T) * Se);
  }
  l.lineWidth = 1, l.strokeStyle = "#ff0000", l.stroke(b), l.strokeStyle = "#00ff00", l.stroke(R), l.strokeStyle = "#0000ff", l.stroke(D);
}
function a4(n, l, s, d, h, m, p, E, C, T, b, R = 10) {
  const D = C * 0.5, k = T * 0.5, z = E + p, A = b[0], N = b[1], X = b[4], K = b[5], Y = b[8], P = b[9];
  n.beginPath(), n.lineWidth = 1, n.strokeStyle = "cyan";
  for (let $ = E; $ < z; $++) {
    const Q = d[$], re = s[Q * 3], Re = s[Q * 3 + 1], he = s[Q * 3 + 2], G = l[re] * D + D, se = l[re + 1] * k + k, fe = l[Re] * D + D, ae = l[Re + 1] * k + k, q = l[he] * D + D, we = l[he + 1] * k + k, Ne = (G + fe + q) * 0.33333, de = (se + ae + we) * 0.33333, ie = Q * 3, Se = h[ie], Te = h[ie + 1], H = h[ie + 2], Z = Se * A + Te * X + H * Y, De = Se * N + Te * K + H * P;
    n.moveTo(Ne, de), n.lineTo(Ne + Z * R, de - De * R);
  }
  n.stroke(), n.beginPath(), n.strokeStyle = "yellow";
  for (let $ = E; $ < z; $++) {
    const Q = d[$], re = s[Q * 3], Re = s[Q * 3 + 1], he = s[Q * 3 + 2], G = l[re] * D + D, se = l[re + 1] * k + k, fe = l[Re] * D + D, ae = l[Re + 1] * k + k, q = l[he] * D + D, we = l[he + 1] * k + k, Ne = m[re], de = m[re + 1], ie = m[re + 2], Se = Ne * A + de * X + ie * Y, Te = Ne * N + de * K + ie * P;
    n.moveTo(G, se), n.lineTo(G + Se * R, se - Te * R);
    const H = m[Re], Z = m[Re + 1], De = m[Re + 2], Me = H * A + Z * X + De * Y, Qe = H * N + Z * K + De * P;
    n.moveTo(fe, ae), n.lineTo(fe + Me * R, ae - Qe * R);
    const Ge = m[he], Ie = m[he + 1], qe = m[he + 2], Ye = Ge * A + Ie * X + qe * Y, it = Ge * N + Ie * K + qe * P;
    n.moveTo(q, we), n.lineTo(q + Ye * R, we - it * R);
  }
  n.stroke();
}
function i4(n, l, s, d, h, m, p, E, C) {
  if (p <= 1) return;
  const T = C - E > 1e-4 ? 65535 / (C - E) : 0;
  m.fill(0);
  for (let R = 0; R < p; R++) {
    const D = n[R], k = h[D] & 255;
    m[k]++;
  }
  let b = 0;
  for (let R = 0; R < 256; R++) {
    const D = m[R];
    m[R] = b, b += D;
  }
  for (let R = 0; R < p; R++) {
    const D = n[R], k = h[D] & 255;
    l[m[k]++] = D;
  }
  m.fill(0);
  for (let R = 0; R < p; R++) {
    const D = l[R], k = d[D] & 255;
    m[k]++;
  }
  b = 0;
  for (let R = 0; R < 256; R++) {
    const D = m[R];
    m[R] = b, b += D;
  }
  for (let R = 0; R < p; R++) {
    const D = l[R], k = d[D] & 255;
    n[m[k]++] = D;
  }
  m.fill(0);
  for (let R = 0; R < p; R++) {
    const D = n[R];
    let z = (s[D] - E) * T;
    z < 0 ? z = 0 : z > 65535 && (z = 65535);
    const A = 65535 - (z | 0) & 255;
    m[A]++;
  }
  b = 0;
  for (let R = 0; R < 256; R++) {
    const D = m[R];
    m[R] = b, b += D;
  }
  for (let R = 0; R < p; R++) {
    const D = n[R];
    let z = (s[D] - E) * T;
    z < 0 ? z = 0 : z > 65535 && (z = 65535);
    const A = 65535 - (z | 0) & 255;
    l[m[A]++] = D;
  }
  m.fill(0);
  for (let R = 0; R < p; R++) {
    const D = l[R];
    let z = (s[D] - E) * T;
    z < 0 ? z = 0 : z > 65535 && (z = 65535);
    const A = 65535 - (z | 0) >> 8 & 255;
    m[A]++;
  }
  b = 0;
  for (let R = 0; R < 256; R++) {
    const D = m[R];
    m[R] = b, b += D;
  }
  for (let R = 0; R < p; R++) {
    const D = l[R];
    let z = (s[D] - E) * T;
    z < 0 ? z = 0 : z > 65535 && (z = 65535);
    const A = 65535 - (z | 0) >> 8 & 255;
    n[m[A]++] = D;
  }
}
function Pw(n, l, s, d, h, m, p, E, C, T, b, R, D, k, z, A, N, X, K, Y, P, $, Q, re, Re, he, G, se, fe, ae, q) {
  let we = 0;
  if (G === 2 || G === 1) {
    const We = k[P * 9], Ue = k[P * 9 + 1], ve = k[P * 9 + 2], Pe = k[P * 9 + 3], be = k[P * 9 + 4], Be = k[P * 9 + 5], Fe = k[P * 9 + 6], nt = k[P * 9 + 7], pt = k[P * 9 + 8], Xe = (We + Pe + Fe) * 0.33333, gt = (Ue + be + nt) * 0.33333, wt = (ve + Be + pt) * 0.33333;
    if (G === 2) {
      const sn = fe * fe, cn = 1 / (ae * ae - sn);
      we = (Xe * Xe + gt * gt + wt * wt - sn) * cn;
    } else
      we = (Math.sqrt(Xe * Xe + gt * gt + wt * wt) - fe) / (ae - fe);
  } else if (G === 3) {
    const We = k[P * 9 + 2], Ue = k[P * 9 + 5], ve = k[P * 9 + 8];
    we = ((We + Ue + ve) * 0.33333 - fe) / (ae - fe);
  }
  if (we >= 1) {
    const We = se >>> 16, Ue = se >>> 8 & 255, ve = se & 255, Pe = We & 248, be = Ue & 252, Be = ve & 248, Fe = Pe << 8 | be << 3 | Be >> 3;
    n.beginPath(), n.moveTo(l, s), n.lineTo(d, h), n.lineTo(m, p), n.closePath(), q[1] !== Fe && (n.strokeStyle = Bn[Fe], q[1] = Fe), q[2] !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", q[2] = 10), n.stroke(), q[0] !== Fe && (n.fillStyle = Bn[Fe], q[0] = Fe), n.fill();
    return;
  }
  let Ne = re >>> 16 & 255, de = re >>> 8 & 255, ie = re & 255;
  const Se = N[P * 3], Te = N[P * 3 + 1], H = N[P * 3 + 2], Z = Re[0];
  for (let We = 1; We <= Z; We++) {
    const Ue = he[Re[We]];
    if (Ue.light.type === 0) {
      const ve = -Ue.transform.worldMatrix[8], Pe = -Ue.transform.worldMatrix[9], be = -Ue.transform.worldMatrix[10], Be = Se * ve + Te * Pe + H * be;
      if (Be > 0) {
        const Fe = Ue.light.color;
        Ne += (Fe >>> 16 & 255) * Be, de += (Fe >>> 8 & 255) * Be, ie += (Fe & 255) * Be;
      }
    }
  }
  Ne *= 39215e-7, de *= 39215e-7, ie *= 39215e-7;
  const De = $.textureImage;
  if (De && De.complete && De.naturalWidth > 0 && $.uvs) {
    const We = $.uvs, Ue = $.faces[Q] * 2, ve = $.faces[Q + 1] * 2, Pe = $.faces[Q + 2] * 2, be = De.width, Be = De.height, Fe = We[Ue] * be, nt = We[Ue + 1] * Be, pt = We[ve] * be, Xe = We[ve + 1] * Be, gt = We[Pe] * be, wt = We[Pe + 1] * Be, sn = Fe * (Xe - wt) - nt * (pt - gt) + (pt * wt - gt * Xe);
    if (Math.abs(sn) > 1e-5) {
      const $e = 1 / sn, cn = (l * (Xe - wt) + d * (wt - nt) + m * (nt - Xe)) * $e, Rn = (l * (gt - pt) + d * (Fe - gt) + m * (pt - Fe)) * $e, Mn = (l * (pt * wt - gt * Xe) + d * (gt * nt - Fe * wt) + m * (Fe * Xe - pt * nt)) * $e, _n = (s * (Xe - wt) + h * (wt - nt) + p * (nt - Xe)) * $e, xe = (s * (gt - pt) + h * (Fe - gt) + p * (pt - Fe)) * $e, je = (s * (pt * wt - gt * Xe) + h * (gt * nt - Fe * wt) + p * (Fe * Xe - pt * nt)) * $e;
      n.save(), n.beginPath(), n.moveTo(E, C), n.lineTo(T, b), n.lineTo(R, D), n.closePath(), n.clip(), n.setTransform(cn, _n, Rn, xe, Mn, je), n.drawImage(De, 0, 0), n.restore();
      const dt = Ne >= 1 ? 255 : Ne * 255 | 0, Et = de >= 1 ? 255 : de * 255 | 0, Tt = ie >= 1 ? 255 : ie * 255 | 0, Zt = dt & 248, Qt = Et & 252, Cn = Tt & 248, Wt = Zt << 8 | Qt << 3 | Cn >> 3;
      if (n.globalCompositeOperation = "multiply", q[0] !== Wt && (n.fillStyle = Bn[Wt], q[0] = Wt), n.fill(), n.globalCompositeOperation = "source-over", we > 0) {
        const tn = se >>> 16, nn = se >>> 8 & 255, An = se & 255, xt = tn & 248, rn = nn & 252, vn = An & 248, hn = xt << 8 | rn << 3 | vn >> 3;
        n.globalAlpha = we, q[1] !== hn && (n.strokeStyle = Bn[hn], q[1] = hn), q[2] !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", q[2] = 10), n.stroke(), q[0] !== hn && (n.fillStyle = Bn[hn], q[0] = hn), n.fill(), n.globalAlpha = 1;
      }
      return;
    }
  }
  const Me = z[P * 3];
  let Qe = (Me >>> 16) * Ne, Ge = (Me >>> 8 & 255) * de, Ie = (Me & 255) * ie;
  if (we > 0) {
    const We = se >>> 16, Ue = se >>> 8 & 255, ve = se & 255, Pe = 1 - we;
    Qe = Qe * Pe + We * we, Ge = Ge * Pe + Ue * we, Ie = Ie * Pe + ve * we;
  }
  Qe = Math.min(255, Qe) | 0, Ge = Math.min(255, Ge) | 0, Ie = Math.min(255, Ie) | 0, n.beginPath(), n.moveTo(l, s), n.lineTo(d, h), n.lineTo(m, p), n.closePath();
  const qe = Qe & 248, Ye = Ge & 252, it = Ie & 248, Ze = qe << 8 | Ye << 3 | it >> 3;
  q[1] !== Ze && (n.strokeStyle = Bn[Ze], q[1] = Ze), q[2] !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", q[2] = 10), n.stroke(), q[0] !== Ze && (n.fillStyle = Bn[Ze], q[0] = Ze), n.fill();
}
function $w(n, l, s, d, h, m, p, E, C, T, b, R, D, k, z, A, N, X, K, Y, P, $, Q, re, Re, he, G, se, fe, ae, q) {
  const we = z[P * 3];
  let Ne = we >>> 16, de = we >>> 8 & 255, ie = we & 255, Se = 0;
  if (G === 2 || G === 1) {
    const Ie = k[P * 9], qe = k[P * 9 + 1], Ye = k[P * 9 + 2], it = k[P * 9 + 3], Ze = k[P * 9 + 4], We = k[P * 9 + 5], Ue = k[P * 9 + 6], ve = k[P * 9 + 7], Pe = k[P * 9 + 8], be = (Ie + it + Ue) * 0.33333, Be = (qe + Ze + ve) * 0.33333, Fe = (Ye + We + Pe) * 0.33333;
    if (G === 2) {
      const nt = fe * fe, Xe = 1 / (ae * ae - nt);
      Se = (be * be + Be * Be + Fe * Fe - nt) * Xe;
    } else
      Se = (Math.sqrt(be * be + Be * Be + Fe * Fe) - fe) / (ae - fe);
  } else if (G === 3) {
    const Ie = k[P * 9 + 2], qe = k[P * 9 + 5], Ye = k[P * 9 + 8];
    Se = ((Ie + qe + Ye) * 0.33333 - fe) / (ae - fe);
  }
  let H = Math.max(0, Se - 0);
  if (H > 1 && (H = 1), H > 0) {
    const Ie = se >>> 16, qe = se >>> 8 & 255, Ye = se & 255;
    Ne = Ne * (1 - H) + Ie * H | 0, de = de * (1 - H) + qe * H | 0, ie = ie * (1 - H) + Ye * H | 0;
  }
  const Z = $.textureImage;
  if (Z && Z.complete && Z.naturalWidth > 0 && $.uvs) {
    const Ie = $.uvs, qe = $.faces[Q] * 2, Ye = $.faces[Q + 1] * 2, it = $.faces[Q + 2] * 2, Ze = Ie[qe] * Z.width, We = Ie[qe + 1] * Z.height, Ue = Ie[Ye] * Z.width, ve = Ie[Ye + 1] * Z.height, Pe = Ie[it] * Z.width, be = Ie[it + 1] * Z.height, Be = Ze * (ve - be) - We * (Ue - Pe) + (Ue * be - Pe * ve);
    if (Math.abs(Be) > 1e-5) {
      const Fe = 1 / Be, nt = (l * (ve - be) + d * (be - We) + m * (We - ve)) * Fe, pt = (l * (Pe - Ue) + d * (Ze - Pe) + m * (Ue - Ze)) * Fe, Xe = (l * (Ue * be - Pe * ve) + d * (Pe * We - Ze * be) + m * (Ze * ve - Ue * We)) * Fe, gt = (s * (ve - be) + h * (be - We) + p * (We - ve)) * Fe, wt = (s * (Pe - Ue) + h * (Ze - Pe) + p * (Ue - Ze)) * Fe, sn = (s * (Ue * be - Pe * ve) + h * (Pe * We - Ze * be) + p * (Ze * ve - Ue * We)) * Fe;
      if (n.save(), n.beginPath(), n.moveTo(E, C), n.lineTo(T, b), n.lineTo(R, D), n.closePath(), n.clip(), n.setTransform(nt, gt, pt, wt, Xe, sn), n.drawImage(Z, 0, 0), n.restore(), H > 0) {
        const $e = se >>> 16, cn = se >>> 8 & 255, Rn = se & 255, Mn = $e & 248, _n = cn & 252, xe = Rn & 248, je = Mn << 8 | _n << 3 | xe >> 3;
        n.globalAlpha = H, q[1] !== je && (n.strokeStyle = Bn[je], q[1] = je), q[2] !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", q[2] = 10), n.stroke(), q[0] !== je && (n.fillStyle = Bn[je], q[0] = je), n.fill(), n.globalAlpha = 1;
      }
      return;
    }
  }
  n.beginPath(), n.moveTo(E, C), n.lineTo(T, b), n.lineTo(R, D), n.closePath();
  const De = Ne & 248, Me = de & 252, Qe = ie & 248, Ge = De << 8 | Me << 3 | Qe >> 3;
  q[0] !== Ge && (n.fillStyle = Bn[Ge], q[0] = Ge), n.fill();
}
function Vw(n, l, s, d, h, m, p, E, C, T, b, R, D, k, z, A, N, X, K, Y, P, $, Q, re, Re, he, G, se, fe, ae, q) {
  const we = z[P * 3];
  let Ne = we >>> 16, de = we >>> 8 & 255, ie = we & 255;
  const Se = $.textureImage;
  if (Se && Se.complete && Se.naturalWidth > 0 && $.uvs) {
    const Me = $.uvs, Qe = $.faces[Q] * 2, Ge = $.faces[Q + 1] * 2, Ie = $.faces[Q + 2] * 2, qe = Me[Qe] * Se.width, Ye = Me[Qe + 1] * Se.height, it = Me[Ge] * Se.width, Ze = Me[Ge + 1] * Se.height, We = Me[Ie] * Se.width, Ue = Me[Ie + 1] * Se.height, ve = qe * (Ze - Ue) - Ye * (it - We) + (it * Ue - We * Ze);
    if (Math.abs(ve) > 1e-5) {
      const Pe = 1 / ve, be = (l * (Ze - Ue) + d * (Ue - Ye) + m * (Ye - Ze)) * Pe, Be = (l * (We - it) + d * (qe - We) + m * (it - qe)) * Pe, Fe = (l * (it * Ue - We * Ze) + d * (We * Ye - qe * Ue) + m * (qe * Ze - it * Ye)) * Pe, nt = (s * (Ze - Ue) + h * (Ue - Ye) + p * (Ye - Ze)) * Pe, pt = (s * (We - it) + h * (qe - We) + p * (it - qe)) * Pe, Xe = (s * (it * Ue - We * Ze) + h * (We * Ye - qe * Ue) + p * (qe * Ze - it * Ye)) * Pe;
      n.save(), n.beginPath(), n.moveTo(E, C), n.lineTo(T, b), n.lineTo(R, D), n.closePath(), n.clip(), n.setTransform(be, nt, Be, pt, Fe, Xe), n.drawImage(Se, 0, 0), n.restore();
      return;
    }
  }
  n.beginPath(), n.moveTo(E, C), n.lineTo(T, b), n.lineTo(R, D), n.closePath();
  const Te = Ne & 248, H = de & 252, Z = ie & 248, De = Te << 8 | H << 3 | Z >> 3;
  q[0] !== De && (n.fillStyle = Bn[De], q[0] = De), n.fill();
}
function qw(n, l, s, d, h, m, p, E, C, T, b, R, D, k, z, A, N, X, K, Y, P, $, Q, re, Re, he, G, se, fe, ae, q) {
  const we = P * 3, Ne = z[we], de = z[we + 1], ie = z[we + 2], Se = Ne >>> 16, Te = Ne >>> 8 & 255, H = Ne & 255, Z = de >>> 16, De = de >>> 8 & 255, Me = de & 255, Qe = ie >>> 16, Ge = ie >>> 8 & 255, Ie = ie & 255;
  let qe = re >>> 16, Ye = re >>> 8 & 255, it = re & 255, Ze = qe, We = Ye, Ue = it, ve = qe, Pe = Ye, be = it, Be = qe, Fe = Ye, nt = it, pt = A[X], Xe = A[X + 1], gt = A[X + 2], wt = A[K], sn = A[K + 1], $e = A[K + 2], cn = A[Y], Rn = A[Y + 1], Mn = A[Y + 2];
  const _n = Re[0];
  for (let pe = 1; pe <= _n; pe++) {
    const He = he[Re[pe]];
    if (He.light.type === 0) {
      const vt = He.light.color >>> 16, ct = He.light.color >>> 8 & 255, ft = He.light.color & 255, rt = -He.transform.worldMatrix[8], Lt = -He.transform.worldMatrix[9], At = -He.transform.worldMatrix[10];
      let zt = pt * rt + Xe * Lt + gt * At, Nt = wt * rt + sn * Lt + $e * At, Fn = cn * rt + Rn * Lt + Mn * At;
      zt > 0 && (Ze += vt * zt, We += ct * zt, Ue += ft * zt), Nt > 0 && (ve += vt * Nt, Pe += ct * Nt, be += ft * Nt), Fn > 0 && (Be += vt * Fn, Fe += ct * Fn, nt += ft * Fn);
    }
  }
  Ze *= 39215e-7, We *= 39215e-7, Ue *= 39215e-7, ve *= 39215e-7, Pe *= 39215e-7, be *= 39215e-7, Be *= 39215e-7, Fe *= 39215e-7, nt *= 39215e-7;
  let xe = Math.min(Math.max(Ze, We, Ue), 1), je = Math.min(Math.max(ve, Pe, be), 1), dt = Math.min(Math.max(Be, Fe, nt), 1), Et = 0;
  if (G === 2 || G === 1) {
    const pe = k[P * 9], He = k[P * 9 + 1], vt = k[P * 9 + 2], ct = k[P * 9 + 3], ft = k[P * 9 + 4], rt = k[P * 9 + 5], Lt = k[P * 9 + 6], At = k[P * 9 + 7], zt = k[P * 9 + 8], Nt = (pe + ct + Lt) * 0.33333, Fn = (He + ft + At) * 0.33333, Gn = (vt + rt + zt) * 0.33333;
    if (G === 2) {
      const Rt = fe * fe, qt = 1 / (ae * ae - Rt);
      Et = (Nt * Nt + Fn * Fn + Gn * Gn - Rt) * qt;
    } else
      Et = (Math.sqrt(Nt * Nt + Fn * Fn + Gn * Gn) - fe) / (ae - fe);
  } else if (G === 3) {
    const pe = k[P * 9 + 2], He = k[P * 9 + 5], vt = k[P * 9 + 8];
    Et = ((pe + He + vt) * 0.33333 - fe) / (ae - fe);
  }
  Et > 1 && (Et = 1);
  const Tt = $.textureImage;
  if (Tt && Tt.complete && Tt.naturalWidth > 0 && $.uvs) {
    const pe = $.uvs, He = $.faces[Q] * 2, vt = $.faces[Q + 1] * 2, ct = $.faces[Q + 2] * 2, ft = pe[He] * Tt.width, rt = pe[He + 1] * Tt.height, Lt = pe[vt] * Tt.width, At = pe[vt + 1] * Tt.height, zt = pe[ct] * Tt.width, Nt = pe[ct + 1] * Tt.height, Fn = ft * (At - Nt) - rt * (Lt - zt) + (Lt * Nt - zt * At);
    if (Math.abs(Fn) > 1e-5) {
      const Gn = 1 / Fn, Rt = (l * (At - Nt) + d * (Nt - rt) + m * (rt - At)) * Gn, $t = (l * (zt - Lt) + d * (ft - zt) + m * (Lt - ft)) * Gn, qt = (l * (Lt * Nt - zt * At) + d * (zt * rt - ft * Nt) + m * (ft * At - Lt * rt)) * Gn, kt = (s * (At - Nt) + h * (Nt - rt) + p * (rt - At)) * Gn, gn = (s * (zt - Lt) + h * (ft - zt) + p * (Lt - ft)) * Gn, mn = (s * (Lt * Nt - zt * At) + h * (zt * rt - ft * Nt) + p * (ft * At - Lt * rt)) * Gn;
      n.save(), n.beginPath(), n.moveTo(E, C), n.lineTo(T, b), n.lineTo(R, D), n.closePath(), n.clip(), n.setTransform(Rt, kt, $t, gn, qt, mn), n.drawImage(Tt, 0, 0), n.restore();
      const Sr = Ze >= 1 ? 255 : Ze * 255 | 0, ir = We >= 1 ? 255 : We * 255 | 0, Xn = Ue >= 1 ? 255 : Ue * 255 | 0, Oo = ve >= 1 ? 255 : ve * 255 | 0, Kr = Pe >= 1 ? 255 : Pe * 255 | 0, wu = be >= 1 ? 255 : be * 255 | 0, Tu = Be >= 1 ? 255 : Be * 255 | 0, Ql = Fe >= 1 ? 255 : Fe * 255 | 0, Gi = nt >= 1 ? 255 : nt * 255 | 0, Ea = (Sr & 248) << 8 | (ir & 252) << 3 | (Xn & 248) >> 3, Ja = (Oo & 248) << 8 | (Kr & 252) << 3 | (wu & 248) >> 3, ei = (Tu & 248) << 8 | (Ql & 252) << 3 | (Gi & 248) >> 3;
      let da = l, Zr = s, va = d, Ua = h, mi = m, Ca = p, ti = xe, Dr = je, Sn = dt, pa = Ea, on = Ja, Xi = ei;
      if (ti > Dr) {
        let fn;
        fn = da, da = va, va = fn, fn = Zr, Zr = Ua, Ua = fn, fn = ti, ti = Dr, Dr = fn, fn = pa, pa = on, on = fn;
      }
      if (Dr > Sn) {
        let fn;
        fn = va, va = mi, mi = fn, fn = Ua, Ua = Ca, Ca = fn, fn = Dr, Dr = Sn, Sn = fn, fn = on, on = Xi, Xi = fn;
      }
      if (ti > Dr) {
        let fn;
        fn = da, da = va, va = fn, fn = Zr, Zr = Ua, Ua = fn, fn = ti, ti = Dr, Dr = fn, fn = pa, pa = on, on = fn;
      }
      if (n.globalCompositeOperation = "multiply", Sn - ti < 0.01 || pa === on && on === Xi)
        q[0] !== pa && (n.fillStyle = Bn[pa], q[0] = pa), n.beginPath(), n.moveTo(E, C), n.lineTo(T, b), n.lineTo(R, D), n.closePath(), n.fill();
      else {
        const fn = (Dr - ti) / (Sn - ti), Vt = da + fn * (mi - da), Ki = Zr + fn * (Ca - Zr), Tr = va - Vt, Er = -(Ua - Ki), Cr = Tr, Kn = Er * Er + Cr * Cr;
        let Hn, yi;
        if (Kn < 1e-6)
          Hn = mi, yi = Ca;
        else {
          const wa = ((mi - da) * Er + (Ca - Zr) * Cr) / Kn;
          Hn = da + wa * Er, yi = Zr + wa * Cr;
        }
        const vr = n.createLinearGradient(da, Zr, Hn, yi);
        vr.addColorStop(0, Bn[pa]), vr.addColorStop(1, Bn[Xi]), q[0] = -1, n.fillStyle = vr, n.beginPath(), n.moveTo(E, C), n.lineTo(T, b), n.lineTo(R, D), n.closePath(), n.fill();
      }
      if (n.globalCompositeOperation = "source-over", Et > 0) {
        const fn = se >>> 16, Vt = se >>> 8 & 255, Ki = se & 255, Tr = fn & 248, ni = Vt & 252, Er = Ki & 248, Cr = Tr << 8 | ni << 3 | Er >> 3;
        n.globalAlpha = Et, q[1] !== Cr && (n.strokeStyle = Bn[Cr], q[1] = Cr), q[2] !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", q[2] = 10), n.stroke(), q[0] !== Cr && (n.fillStyle = Bn[Cr], q[0] = Cr), n.fill(), n.globalAlpha = 1;
      }
      return;
    }
  }
  let Zt = Se * Ze, Qt = Te * We, Cn = H * Ue, Wt = Z * ve, tn = De * Pe, nn = Me * be, An = Qe * Be, xt = Ge * Fe, rn = Ie * nt;
  if (Zt = Zt > 255 ? 255 : Zt, Qt = Qt > 255 ? 255 : Qt, Cn = Cn > 255 ? 255 : Cn, Wt = Wt > 255 ? 255 : Wt, tn = tn > 255 ? 255 : tn, nn = nn > 255 ? 255 : nn, An = An > 255 ? 255 : An, xt = xt > 255 ? 255 : xt, rn = rn > 255 ? 255 : rn, Et > 0) {
    const pe = 1 - Et, He = se >>> 16, vt = se >>> 8 & 255, ct = se & 255, ft = He * Et, rt = vt * Et, Lt = ct * Et;
    Zt = Zt * pe + ft | 0, Qt = Qt * pe + rt | 0, Cn = Cn * pe + Lt | 0, Wt = Wt * pe + ft | 0, tn = tn * pe + rt | 0, nn = nn * pe + Lt | 0, An = An * pe + ft | 0, xt = xt * pe + rt | 0, rn = rn * pe + Lt | 0;
  } else
    Zt |= 0, Qt |= 0, Cn |= 0, Wt |= 0, tn |= 0, nn |= 0, An |= 0, xt |= 0, rn |= 0;
  const vn = (Zt & 248) << 8 | (Qt & 252) << 3 | (Cn & 248) >> 3, hn = (Wt & 248) << 8 | (tn & 252) << 3 | (nn & 248) >> 3, Nn = (An & 248) << 8 | (xt & 252) << 3 | (rn & 248) >> 3;
  if (vn === hn && hn === Nn) {
    n.beginPath(), n.moveTo(l, s), n.lineTo(d, h), n.lineTo(m, p), n.closePath(), q[0] !== vn && (n.fillStyle = Bn[vn], q[0] = vn), q[1] !== vn && (n.strokeStyle = Bn[vn], q[1] = vn), q[2] !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", q[2] = 10), n.stroke(), n.fill();
    return;
  }
  let bn = l, Gt = s, wn = d, Xt = h, Kt = m, an = p, ln = xe, Qn = je, ar = dt, jn = vn, j = hn, Ee = Nn;
  if (ln > Qn) {
    let pe;
    pe = bn, bn = wn, wn = pe, pe = Gt, Gt = Xt, Xt = pe, pe = ln, ln = Qn, Qn = pe, pe = jn, jn = j, j = pe;
  }
  if (Qn > ar) {
    let pe;
    pe = wn, wn = Kt, Kt = pe, pe = Xt, Xt = an, an = pe, pe = Qn, Qn = ar, ar = pe, pe = j, j = Ee, Ee = pe;
  }
  if (ln > Qn) {
    let pe;
    pe = bn, bn = wn, wn = pe, pe = Gt, Gt = Xt, Xt = pe, pe = ln, ln = Qn, Qn = pe, pe = jn, jn = j, j = pe;
  }
  if (ar - ln < 0.01)
    n.beginPath(), n.moveTo(l, s), n.lineTo(d, h), n.lineTo(m, p), n.closePath(), q[0] !== jn && (n.fillStyle = Bn[jn], q[0] = jn), q[1] !== jn && (n.strokeStyle = Bn[jn], q[1] = jn), q[2] !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", q[2] = 10), n.stroke(), n.fill();
  else {
    const pe = (Qn - ln) / (ar - ln), He = bn + pe * (Kt - bn), vt = Gt + pe * (an - Gt), ct = wn - He, rt = -(Xt - vt), Lt = ct, At = rt * rt + Lt * Lt;
    let zt, Nt;
    if (At < 1e-6)
      zt = Kt, Nt = an;
    else {
      const Rt = ((Kt - bn) * rt + (an - Gt) * Lt) / At;
      zt = bn + Rt * rt, Nt = Gt + Rt * Lt;
    }
    const Fn = n.createLinearGradient(bn, Gt, zt, Nt);
    Fn.addColorStop(0, Bn[jn]), Fn.addColorStop(1, Bn[Ee]), q[0] = -1, n.fillStyle = Fn, n.beginPath(), n.moveTo(E, C), n.lineTo(T, b), n.lineTo(R, D), n.closePath(), n.fill();
  }
}
function Iw(n, l, s, d, h, m, p, E, C, T, b, R, D, k, z, A, N, X, K, Y, P, $, Q, re, Re, he, G, se, fe, ae, q) {
  let we = 0, Ne = 0, de = 0;
  if (G === 2 || G === 1) {
    const xt = k[P * 9], rn = k[P * 9 + 1], vn = k[P * 9 + 2], hn = k[P * 9 + 3], Nn = k[P * 9 + 4], bn = k[P * 9 + 5], Gt = k[P * 9 + 6], wn = k[P * 9 + 7], Xt = k[P * 9 + 8];
    if (G === 2) {
      const Kt = fe * fe, ln = 1 / (ae * ae - Kt);
      we = (xt * xt + rn * rn + vn * vn - Kt) * ln, Ne = (hn * hn + Nn * Nn + bn * bn - Kt) * ln, de = (Gt * Gt + wn * wn + Xt * Xt - Kt) * ln;
    } else {
      const Kt = Math.sqrt(xt * xt + rn * rn + vn * vn), an = Math.sqrt(hn * hn + Nn * Nn + bn * bn), ln = Math.sqrt(Gt * Gt + wn * wn + Xt * Xt);
      we = (Kt - fe) / (ae - fe), Ne = (an - fe) / (ae - fe), de = (ln - fe) / (ae - fe);
    }
  } else if (G === 3) {
    const xt = 1 / (ae - fe);
    we = (k[P * 9 + 2] - fe) * xt, Ne = (k[P * 9 + 5] - fe) * xt, de = (k[P * 9 + 8] - fe) * xt;
  }
  let ie = (we + Ne + de) * 0.33333;
  if (ie >= 1) {
    const xt = se >>> 16, rn = se >>> 8 & 255, vn = se & 255, hn = xt & 248, Nn = rn & 252, bn = vn & 248, Gt = hn << 8 | Nn << 3 | bn >> 3;
    n.beginPath(), n.moveTo(l, s), n.lineTo(d, h), n.lineTo(m, p), n.closePath(), q[1] !== Gt && (n.strokeStyle = Bn[Gt], q[1] = Gt), q[2] !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", q[2] = 10), n.stroke(), q[0] !== Gt && (n.fillStyle = Bn[Gt], q[0] = Gt), n.fill();
    return;
  }
  const Se = A[X], Te = A[X + 1], H = A[X + 2], Z = A[K], De = A[K + 1], Me = A[K + 2], Qe = A[Y], Ge = A[Y + 1], Ie = A[Y + 2], qe = re >>> 16 & 255, Ye = re >>> 8 & 255, it = re & 255;
  let Ze = qe, We = Ye, Ue = it, ve = qe, Pe = Ye, be = it, Be = qe, Fe = Ye, nt = it;
  const pt = Re[0];
  for (let xt = 1; xt <= pt; xt++) {
    const rn = he[Re[xt]];
    if (rn.light.type === 0) {
      const vn = -rn.transform.worldMatrix[8], hn = -rn.transform.worldMatrix[9], Nn = -rn.transform.worldMatrix[10], bn = rn.light.color, Gt = bn >>> 16 & 255, wn = bn >>> 8 & 255, Xt = bn & 255, Kt = Math.max(0, Se * vn + Te * hn + H * Nn);
      Ze += Gt * Kt, We += wn * Kt, Ue += Xt * Kt;
      const an = Math.max(0, Z * vn + De * hn + Me * Nn);
      ve += Gt * an, Pe += wn * an, be += Xt * an;
      const ln = Math.max(0, Qe * vn + Ge * hn + Ie * Nn);
      Be += Gt * ln, Fe += wn * ln, nt += Xt * ln;
    }
  }
  const Xe = $.textureImage;
  if (Xe && Xe.complete && Xe.naturalWidth > 0 && $.uvs) {
    const xt = $.uvs, rn = $.faces[Q] * 2, vn = $.faces[Q + 1] * 2, hn = $.faces[Q + 2] * 2, Nn = Xe.width, bn = Xe.height, Gt = xt[rn] * Nn, wn = xt[rn + 1] * bn, Xt = xt[vn] * Nn, Kt = xt[vn + 1] * bn, an = xt[hn] * Nn, ln = xt[hn + 1] * bn, Qn = Gt * (Kt - ln) - wn * (Xt - an) + (Xt * ln - an * Kt);
    if (Math.abs(Qn) > 1e-5) {
      const ar = 1 / Qn, jn = (l * (Kt - ln) + d * (ln - wn) + m * (wn - Kt)) * ar, j = (l * (an - Xt) + d * (Gt - an) + m * (Xt - Gt)) * ar, Ee = (l * (Xt * ln - an * Kt) + d * (an * wn - Gt * ln) + m * (Gt * Kt - Xt * wn)) * ar, pe = (s * (Kt - ln) + h * (ln - wn) + p * (wn - Kt)) * ar, He = (s * (an - Xt) + h * (Gt - an) + p * (Xt - Gt)) * ar, vt = (s * (Xt * ln - an * Kt) + h * (an * wn - Gt * ln) + p * (Gt * Kt - Xt * wn)) * ar;
      n.save(), n.beginPath(), n.moveTo(E, C), n.lineTo(T, b), n.lineTo(R, D), n.closePath(), n.clip(), n.setTransform(jn, pe, j, He, Ee, vt), n.drawImage(Xe, 0, 0), n.restore();
      let ct = (Ze + ve + Be) * 0.33333, ft = (We + Pe + Fe) * 0.33333, rt = (Ue + be + nt) * 0.33333, Lt = ct > 255 ? 255 : ct, At = ft > 255 ? 255 : ft, zt = rt > 255 ? 255 : rt;
      Lt = Lt | 0, At = At | 0, zt = zt | 0;
      const Nt = Lt & 248, Fn = At & 252, Gn = zt & 248, Rt = Nt << 8 | Fn << 3 | Gn >> 3;
      if (n.globalCompositeOperation = "multiply", q[0] !== Rt && (n.fillStyle = Bn[Rt], q[0] = Rt), n.fill(), n.globalCompositeOperation = "source-over", ie > 0) {
        const $t = se >>> 16, qt = se >>> 8 & 255, kt = se & 255, gn = $t & 248, mn = qt & 252, Sr = kt & 248, ir = gn << 8 | mn << 3 | Sr >> 3;
        n.globalAlpha = ie, q[1] !== ir && (n.strokeStyle = Bn[ir], q[1] = ir), q[2] !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", q[2] = 10), n.stroke(), q[0] !== ir && (n.fillStyle = Bn[ir], q[0] = ir), n.fill(), n.globalAlpha = 1;
      }
      return;
    }
  }
  const gt = P * 3, wt = z[gt], sn = z[gt + 1], $e = z[gt + 2];
  let cn = wt >>> 16, Rn = wt >>> 8 & 255, Mn = wt & 255, _n = sn >>> 16, xe = sn >>> 8 & 255, je = sn & 255, dt = $e >>> 16, Et = $e >>> 8 & 255, Tt = $e & 255;
  Ze *= 39215e-7, We *= 39215e-7, Ue *= 39215e-7, ve *= 39215e-7, Pe *= 39215e-7, be *= 39215e-7, Be *= 39215e-7, Fe *= 39215e-7, nt *= 39215e-7, cn = cn * Ze, Rn = Rn * We, Mn = Mn * Ue, _n = _n * ve, xe = xe * Pe, je = je * be, dt = dt * Be, Et = Et * Fe, Tt = Tt * nt;
  let Zt = (cn + _n + dt) * 0.33333, Qt = (Rn + xe + Et) * 0.33333, Cn = (Mn + je + Tt) * 0.33333;
  if (ie > 0) {
    const xt = se >>> 16, rn = se >>> 8 & 255, vn = se & 255, hn = 1 - ie;
    Zt = Zt * hn + xt * ie, Qt = Qt * hn + rn * ie, Cn = Cn * hn + vn * ie;
  }
  Zt = Math.min(255, Zt) | 0, Qt = Math.min(255, Qt) | 0, Cn = Math.min(255, Cn) | 0, n.beginPath(), n.moveTo(l, s), n.lineTo(d, h), n.lineTo(m, p), n.closePath();
  const Wt = Zt & 248, tn = Qt & 252, nn = Cn & 248, An = Wt << 8 | tn << 3 | nn >> 3;
  q[1] !== An && (n.strokeStyle = Bn[An], q[1] = An), q[2] !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", q[2] = 10), n.stroke(), q[0] !== An && (n.fillStyle = Bn[An], q[0] = An), n.fill();
}
const Yw = [];
let l4 = 5;
function o4(n) {
  const l = l4++;
  return Yw[l] = n, l;
}
const u4 = Xr.computeNormalMatrix, Jg = N_, rC = Oy, s4 = r4, c4 = a4, e2 = 0.6;
function f4(n, l, s, d, h) {
  if (d === 1)
    return n;
  const m = n[0] + 1;
  s.fill(0);
  for (let E = 1; E < m; E++) {
    const C = n[E], T = l[C];
    T.meshRenderer && s[T.meshRenderer.layer]++;
  }
  let p = 0;
  for (let E = 0; E < d; E++) {
    const C = s[E];
    s[E] = p, h[p] = 0, p += 1 + C;
  }
  for (let E = 1; E < m; E++) {
    const C = n[E], T = l[C];
    if (T.meshRenderer) {
      const b = T.meshRenderer.layer, R = s[b], D = h[R];
      h[R + 1 + D] = C, h[R] = D + 1;
    }
  }
  return h;
}
function Ww() {
  this.layerBuffers = new Uint32Array(0), this.layerBuffersOffsets = new Uint32Array(yd.layersCount), this.drawCalls = 0, this.faces = 0, this.lightDirection = new Float32Array([0, 0, 0]), this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.colorBuffer = new Uint32Array(0), this.shaderTypeBuffer = new Uint8Array(0), this.shaderPassBuffer = new Uint8Array(0), this.faceNormalsBuffer = new Float32Array(0), this.vertexNormalsBuffer = new Float32Array(0), this.meshIndexBuffer = new Uint32Array(0), this.meshFaceIndexBuffer = new Uint32Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.lightsIndexBuffer = new Uint32Array(10), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0), this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0), this.tempIndexBuffer = new Uint32Array(0), this.counters = new Uint32Array(256), this.ctxStateBuffer = new Int32Array(3);
}
var Do = Ww.prototype;
Do.vec3Cache1 = new Float32Array([0, 0, 0]);
Do.vec3Cache2 = new Float32Array([0, 0, 0]);
Do.vec4Cache = new Float32Array([0, 0, 0]);
Do.mat4Scratchpad1 = new Float32Array(16);
Do.mat4Scratchpad2 = new Float32Array(16);
Do.mat3Scratchpad1 = new Float32Array(9);
Do.wireframe = !1;
Do.debugNormals = !1;
Do.debugAxis = !1;
Do.render = function(n, l, s) {
  let d = performance.now();
  const h = performance.now();
  let m = n.scene.retrieve();
  const p = performance.now() - h;
  let E = yd.layersCount, C = l.width, T = l.height, b, R, D = this.vec3Cache1, k = this.vec3Cache2, z = this.vec4Cache, A = this.depthBuffer, N = this.indexBuffer, X = this.vertexIndexBuffer, K = this.vertexBuffer, Y = this.clipGeometryBuffer, P = this.colorBuffer, $ = this.shaderTypeBuffer, Q = this.shaderPassBuffer, re = this.faceNormalsBuffer, Re = this.vertexNormalsBuffer, he = this.meshIndexBuffer, G = this.meshFaceIndexBuffer, se = this.visibleObjectsBuffer, fe = this.lightsIndexBuffer, ae = this.layerBuffersOffsets, q = this.mat4Scratchpad1, we = this.mat4Scratchpad2, Ne = l.getWorldToScreen(), de = n.transform.getWorldToLocal(), ie = n.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let Se = this.tempIndexBuffer, Te = this.counters, H = this.ctxStateBuffer, Z = 0, De = 0;
  const Me = n.camera, Qe = n.camera.fogType !== Pr.FogType.NONE ? Me.fogColor : Me.bgColor;
  if (Me.bgColor !== -1) {
    const Be = Qe >>> 16, Fe = Qe >>> 8 & 255, nt = Qe & 255, pt = Be & 248, Xe = Fe & 252, gt = nt & 248, wt = pt << 8 | Xe << 3 | gt >> 3;
    l.context.fillStyle = Bn[wt], l.context.fillRect(0, 0, l.width, l.height);
  } else
    l.context.clearRect(0, 0, l.width, l.height);
  if (se.length < m.length) {
    const Be = se;
    this.visibleObjectsBuffer = se = new Uint32Array(
      m.length
    ), se.set(Be);
  }
  if (fe.length < m.length) {
    const Be = fe;
    this.lightsIndexBuffer = fe = new Uint32Array(
      m.length
    ), fe.set(Be);
  }
  const Ge = performance.now();
  d4(
    m,
    ie,
    se,
    fe
  ), v4(se, m, ie);
  const Ie = performance.now() - Ge, qe = se[0] + 1, Ye = se[0];
  E > 1 && this.layerBuffers.length < Ye + E && (this.layerBuffers = new Uint32Array((Ye + E) * 2));
  const it = performance.now();
  let Ze = f4(
    se,
    m,
    ae,
    E,
    this.layerBuffers
  );
  const We = performance.now() - it;
  let Ue = 0, ve = 0, Pe = 0, be = 0;
  for (b = 0; b < E; b++) {
    const Be = Ze[be];
    if (Be === 0) {
      be += 1;
      continue;
    }
    R = l.layers[b];
    let Fe = 0, nt = 0;
    for (let $e = 0; $e < Be; $e++) {
      const cn = m[Ze[be + 1 + $e]].meshRenderer;
      Fe += cn.faces.length;
      const Rn = cn.vertices.length;
      Rn > nt && (nt = Rn);
    }
    Fe = Fe / 3 | 0;
    const pt = nt / 3 | 0;
    if (this.vMapping.length < pt && (this.vMapping = new Int32Array(pt), this.vTags = new Uint32Array(pt)), D.length < nt && (this.vec3Cache1 = D = new Float32Array(nt), this.vec3Cache2 = k = new Float32Array(nt), this.vec4Cache = z = new Float32Array(nt * 4 / 3)), A.length < Fe) {
      let $e = new Float32Array(Fe);
      $e.set(A), this.depthBuffer = A = $e, $e = new Uint32Array(Fe), $e.set(N), this.indexBuffer = N = $e, $e = new Uint32Array(Fe), $e.set(Se), this.tempIndexBuffer = Se = $e, $e = new Uint32Array(Fe * 3), $e.set(P), this.colorBuffer = P = $e, $e = new Uint8Array(Fe), $e.set($), this.shaderTypeBuffer = $ = $e, $e = new Uint8Array(Fe), $e.set(Q), this.shaderPassBuffer = Q = $e, $e = new Float32Array(Fe * 9), $e.set(Y), this.clipGeometryBuffer = Y = $e, $e = new Float32Array(Fe * 3), $e.set(re), this.faceNormalsBuffer = re = $e, $e = new Float32Array(Fe * 9), $e.set(Re), this.vertexNormalsBuffer = Re = $e, $e = new Uint32Array(Fe), $e.set(he), this.meshIndexBuffer = he = $e, $e = new Uint32Array(Fe), $e.set(G), this.meshFaceIndexBuffer = G = $e;
      let cn = new Float32Array(Fe * 6);
      cn.set(K), this.vertexBuffer = K = cn;
      let Rn = new Uint32Array(Fe * 3);
      Rn.set(X), this.vertexIndexBuffer = X = Rn;
    }
    const Xe = performance.now(), gt = p4(
      Ze,
      be + 1,
      m,
      Be,
      k,
      z,
      N,
      A,
      P,
      $,
      Q,
      Y,
      de,
      ie,
      we,
      q,
      this.mat3Scratchpad1,
      re,
      Re,
      K,
      X,
      he,
      G,
      this.vMapping,
      this.vTags
    );
    if (ve += performance.now() - Xe, (yd.depthSortingMask & b + 1) === b + 1) {
      const $e = performance.now();
      i4(
        N,
        Se,
        A,
        he,
        Q,
        Te,
        gt,
        Me.nearClippingPane,
        Me.farClippingPane
      ), Ue += performance.now() - $e;
    }
    const wt = (yd.layerClearMask & b + 1) === b + 1, sn = performance.now();
    this.wireframe ? h4(
      R,
      K,
      X,
      N,
      gt,
      0,
      wt,
      C,
      T,
      H
    ) : m4(
      R,
      K,
      X,
      N,
      P,
      $,
      gt,
      0,
      wt,
      C,
      T,
      Y,
      A,
      n.camera.fogType,
      n.camera.fogColor,
      n.camera.fogNearPane,
      n.camera.fogFarPane,
      n.scene,
      this.lightDirection,
      n.camera.ambientLight,
      re,
      Re,
      he,
      G,
      Ze,
      be + 1,
      fe,
      m,
      H
    ), this.debugNormals && c4(
      R,
      K,
      X,
      N,
      re,
      Re,
      gt,
      0,
      C,
      T,
      de
    ), l.context.drawImage(R.canvas, 0, 0), Pe += performance.now() - sn, Z += gt, De += gt, be += 1 + Be;
  }
  this.debugAxis && s4(m, l.context, Ne, D), s.totalObjects = m.length, s.visibleObjects = qe, s.drawCalls = Z, s.faces = De, s.sortTime = Ue, s.cullTime = Ie, s.groupTime = We, s.processTime = ve, s.drawTime = Pe, s.updateTime = n.scene && n.scene.world ? n.scene.world.lastTickTime : 0, s.retrieveTime = p, s.dt = performance.now() - d;
};
function d4(n, l, s, d) {
  let h = 0, m = 0;
  const p = l[0], E = l[1], C = l[2], T = l[3], b = l[4], R = l[5], D = l[6], k = l[7], z = l[8], A = l[9], N = l[10], X = l[11], K = l[12], Y = l[13], P = l[14], $ = l[15];
  let Q = T + p, re = k + b, Re = X + z, he = $ + K, G = 1 / Math.sqrt(Q * Q + re * re + Re * Re);
  Q *= G, re *= G, Re *= G, he *= G;
  let se = T - p, fe = k - b, ae = X - z, q = $ - K;
  G = 1 / Math.sqrt(se * se + fe * fe + ae * ae), se *= G, fe *= G, ae *= G, q *= G;
  let we = T + E, Ne = k + R, de = X + A, ie = $ + Y;
  G = 1 / Math.sqrt(we * we + Ne * Ne + de * de), we *= G, Ne *= G, de *= G, ie *= G;
  let Se = T - E, Te = k - R, H = X - A, Z = $ - Y;
  G = 1 / Math.sqrt(Se * Se + Te * Te + H * H), Se *= G, Te *= G, H *= G, Z *= G;
  let De = T + C, Me = k + D, Qe = X + N, Ge = $ + P;
  G = 1 / Math.sqrt(De * De + Me * Me + Qe * Qe), De *= G, Me *= G, Qe *= G, Ge *= G;
  let Ie = T - C, qe = k - D, Ye = X - N, it = $ - P;
  G = 1 / Math.sqrt(Ie * Ie + qe * qe + Ye * Ye), Ie *= G, qe *= G, Ye *= G, it *= G;
  const Ze = n.length;
  for (let We = 0; We < Ze; We++) {
    const Ue = n[We];
    if (Ue.meshRenderer && Ue.meshRenderer.enabled) {
      const ve = Ue.transform.worldMatrix, Pe = Ue.meshRenderer.bounds, be = Pe[28], Be = Pe[29], Fe = Pe[30], nt = ve[0] * be + ve[4] * Be + ve[8] * Fe + ve[12], pt = ve[1] * be + ve[5] * Be + ve[9] * Fe + ve[13], Xe = ve[2] * be + ve[6] * Be + ve[10] * Fe + ve[14], gt = ve[0] * ve[0] + ve[1] * ve[1] + ve[2] * ve[2], wt = ve[4] * ve[4] + ve[5] * ve[5] + ve[6] * ve[6], sn = ve[8] * ve[8] + ve[9] * ve[9] + ve[10] * ve[10], $e = Pe[31] * Math.sqrt(Math.max(gt, wt, sn));
      if (Q * nt + re * pt + Re * Xe + he < -$e || se * nt + fe * pt + ae * Xe + q < -$e || we * nt + Ne * pt + de * Xe + ie < -$e || Se * nt + Te * pt + H * Xe + Z < -$e || De * nt + Me * pt + Qe * Xe + Ge < -$e || Ie * nt + qe * pt + Ye * Xe + it < -$e) continue;
      s[++h] = We;
    }
    if (Ue.light)
      if (Ue.light.type === 1) {
        const ve = Ue.transform.worldMatrix, Pe = ve[12], be = ve[13], Be = ve[14], Fe = ve[0] * ve[0] + ve[1] * ve[1] + ve[2] * ve[2], nt = ve[4] * ve[4] + ve[5] * ve[5] + ve[6] * ve[6], pt = ve[8] * ve[8] + ve[9] * ve[9] + ve[10] * ve[10], Xe = Ue.light.range * Math.sqrt(Math.max(Fe, nt, pt));
        if (Q * Pe + re * be + Re * Be + he < -Xe || se * Pe + fe * be + ae * Be + q < -Xe || we * Pe + Ne * be + de * Be + ie < -Xe || Se * Pe + Te * be + H * Be + Z < -Xe || De * Pe + Me * be + Qe * Be + Ge < -Xe || Ie * Pe + qe * be + Ye * Be + it < -Xe) continue;
        d[++m] = We;
      } else
        d[++m] = We;
  }
  s[0] = h, d[0] = m;
}
function v4(n, l, s) {
  const d = s, h = d[0], m = d[1], p = d[2], E = d[3], C = d[4], T = d[5], b = d[6], R = d[7], D = d[8], k = d[9], z = d[10], A = d[11], N = d[12], X = d[13], K = d[14], Y = d[15];
  let P = 0;
  const $ = n[0] + 1;
  for (let Q = 1; Q < $; Q++) {
    const re = n[Q], Re = l[re], he = Re.transform.worldMatrix, G = Re.meshRenderer;
    if (G && G.enabled && G.bounds) {
      const se = G.bounds;
      let fe = 63;
      for (let ae = 0; ae < 24; ae += 3) {
        const q = se[ae], we = se[ae + 1], Ne = se[ae + 2], de = he[0] * q + he[4] * we + he[8] * Ne + he[12], ie = he[1] * q + he[5] * we + he[9] * Ne + he[13], Se = he[2] * q + he[6] * we + he[10] * Ne + he[14], Te = h * de + C * ie + D * Se + N, H = m * de + T * ie + k * Se + X, Z = p * de + b * ie + z * Se + K, De = E * de + R * ie + A * Se + Y;
        let Me = 0;
        Te < -De && (Me |= 1), Te > De && (Me |= 2), H < -De && (Me |= 4), H > De && (Me |= 8), Z < -De && (Me |= 16), Z > De && (Me |= 32), fe &= Me;
      }
      fe === 0 && (n[++P] = re);
    } else {
      const se = he[12], fe = he[13], ae = he[14], q = h * se + C * fe + D * ae + N, we = m * se + T * fe + k * ae + X, Ne = p * se + b * fe + z * ae + K, de = E * se + R * fe + A * ae + Y;
      q >= -de && q <= de && we >= -de && we <= de && Ne >= -de && Ne <= de && (n[++P] = re);
    }
  }
  n[0] = P;
}
let kc = 0;
function p4(n, l, s, d, h, m, p, E, C, T, b, R, D, k, z, A, N, X, K, Y, P, $, Q, re, Re) {
  let he = 0, G = 0;
  for (let se = 0; se < d; se++) {
    const fe = n[l + se], ae = s[fe], q = ae.meshRenderer;
    if (q.constructor !== Xr) continue;
    ++kc;
    const we = ae.transform.worldMatrix, Ne = q.depthBias || 0;
    rC(A, k, we), rC(z, D, we);
    const de = A[0], ie = A[1], Se = A[2], Te = A[3], H = A[4], Z = A[5], De = A[6], Me = A[7], Qe = A[8], Ge = A[9], Ie = A[10], qe = A[11], Ye = A[12], it = A[13], Ze = A[14], We = A[15], Ue = q.faces, ve = q.vertices, Pe = q.faceNormals, be = q.vertexNormals;
    u4(N, we);
    const Be = N, Fe = Be[0], nt = Be[1], pt = Be[2], Xe = Be[3], gt = Be[4], wt = Be[5], sn = Be[6], $e = Be[7], cn = Be[8], Rn = Ue.length;
    for (let Mn = 0; Mn < Rn; Mn += 3) {
      const _n = Ue[Mn], xe = Ue[Mn + 1], je = Ue[Mn + 2], dt = _n << 2, Et = xe << 2, Tt = je << 2;
      if (Re[_n] !== kc) {
        const qt = _n * 3, kt = ve[qt], gn = ve[qt + 1], mn = ve[qt + 2];
        m[dt] = de * kt + H * gn + Qe * mn + Ye, m[dt + 1] = ie * kt + Z * gn + Ge * mn + it, m[dt + 2] = Se * kt + De * gn + Ie * mn + Ze, m[dt + 3] = Te * kt + Me * gn + qe * mn + We, Re[_n] = kc, re[_n] = -1;
      }
      if (Re[xe] !== kc) {
        const qt = xe * 3, kt = ve[qt], gn = ve[qt + 1], mn = ve[qt + 2];
        m[Et] = de * kt + H * gn + Qe * mn + Ye, m[Et + 1] = ie * kt + Z * gn + Ge * mn + it, m[Et + 2] = Se * kt + De * gn + Ie * mn + Ze, m[Et + 3] = Te * kt + Me * gn + qe * mn + We, Re[xe] = kc, re[xe] = -1;
      }
      if (Re[je] !== kc) {
        const qt = je * 3, kt = ve[qt], gn = ve[qt + 1], mn = ve[qt + 2];
        m[Tt] = de * kt + H * gn + Qe * mn + Ye, m[Tt + 1] = ie * kt + Z * gn + Ge * mn + it, m[Tt + 2] = Se * kt + De * gn + Ie * mn + Ze, m[Tt + 3] = Te * kt + Me * gn + qe * mn + We, Re[je] = kc, re[je] = -1;
      }
      const Zt = m[dt], Qt = m[dt + 1], Cn = m[dt + 2], Wt = m[dt + 3], tn = m[Et], nn = m[Et + 1], An = m[Et + 2], xt = m[Et + 3], rn = m[Tt], vn = m[Tt + 1], hn = m[Tt + 2], Nn = m[Tt + 3];
      if (Zt < -Wt && tn < -xt && rn < -Nn || Zt > Wt && tn > xt && rn > Nn || Qt < -Wt && nn < -xt && vn < -Nn || Qt > Wt && nn > xt && vn > Nn || Cn < -Wt && An < -xt && hn < -Nn || Cn > Wt && An > xt && hn > Nn) continue;
      const bn = 1 / Wt, Gt = 1 / xt, wn = 1 / Nn, Xt = Zt * bn, Kt = Qt * bn, an = tn * Gt, ln = nn * Gt, Qn = rn * wn, ar = vn * wn;
      if ((an - Xt) * (ar - Kt) - (ln - Kt) * (Qn - Xt) > 0) continue;
      const jn = _n * 3, j = xe * 3, Ee = je * 3;
      p[he] = he, $[he] = se, Q[he] = Mn;
      const pe = Pe[Mn], He = Pe[Mn + 1], vt = Pe[Mn + 2], ct = pe * Fe + He * Xe + vt * sn, ft = pe * nt + He * gt + vt * $e, rt = pe * pt + He * wt + vt * cn, Lt = Math.sqrt(ct * ct + ft * ft + rt * rt), At = Lt > 0 ? 1 / Lt : 0, zt = he * 3;
      if (C[zt] = q.colors[_n], C[zt + 1] = q.colors[xe], C[zt + 2] = q.colors[je], T[he] = q.shaderType, b[he] = 0, re[_n] === -1) {
        const qt = G * 3;
        Jg(
          h,
          jn,
          ve[jn],
          ve[jn + 1],
          ve[jn + 2],
          z
        ), Y[qt] = Xt, Y[qt + 1] = -Kt, re[_n] = qt, G++;
        const kt = _n * 3, gn = be[kt] * Fe + be[kt + 1] * Xe + be[kt + 2] * sn, mn = be[kt] * nt + be[kt + 1] * gt + be[kt + 2] * $e, Sr = be[kt] * pt + be[kt + 1] * wt + be[kt + 2] * cn, ir = Math.sqrt(gn * gn + mn * mn + Sr * Sr), Xn = ir > 0 ? 1 / ir : 0;
        K[qt] = gn * Xn, K[qt + 1] = mn * Xn, K[qt + 2] = Sr * Xn;
      }
      if (P[he * 3] = re[_n], re[xe] === -1) {
        const qt = G * 3;
        Jg(
          h,
          j,
          ve[j],
          ve[j + 1],
          ve[j + 2],
          z
        ), Y[qt] = an, Y[qt + 1] = -ln, re[xe] = qt, G++;
        const kt = xe * 3, gn = be[kt] * Fe + be[kt + 1] * Xe + be[kt + 2] * sn, mn = be[kt] * nt + be[kt + 1] * gt + be[kt + 2] * $e, Sr = be[kt] * pt + be[kt + 1] * wt + be[kt + 2] * cn, ir = Math.sqrt(gn * gn + mn * mn + Sr * Sr), Xn = ir > 0 ? 1 / ir : 0;
        K[qt] = gn * Xn, K[qt + 1] = mn * Xn, K[qt + 2] = Sr * Xn;
      }
      if (P[he * 3 + 1] = re[xe], re[je] === -1) {
        const qt = G * 3;
        Jg(
          h,
          Ee,
          ve[Ee],
          ve[Ee + 1],
          ve[Ee + 2],
          z
        ), Y[qt] = Qn, Y[qt + 1] = -ar, re[je] = qt, G++;
        const kt = je * 3, gn = be[kt] * Fe + be[kt + 1] * Xe + be[kt + 2] * sn, mn = be[kt] * nt + be[kt + 1] * gt + be[kt + 2] * $e, Sr = be[kt] * pt + be[kt + 1] * wt + be[kt + 2] * cn, ir = Math.sqrt(gn * gn + mn * mn + Sr * Sr), Xn = ir > 0 ? 1 / ir : 0;
        K[qt] = gn * Xn, K[qt + 1] = mn * Xn, K[qt + 2] = Sr * Xn;
      }
      P[he * 3 + 2] = re[je];
      const Nt = he * 9;
      R[Nt] = h[jn], R[Nt + 1] = h[jn + 1];
      const Fn = R[Nt + 2] = h[jn + 2];
      R[Nt + 3] = h[j], R[Nt + 4] = h[j + 1];
      const Gn = R[Nt + 5] = h[j + 2];
      R[Nt + 6] = h[Ee], R[Nt + 7] = h[Ee + 1];
      const Rt = R[Nt + 8] = h[Ee + 2];
      E[he] = (Fn + Gn + Rt) * 0.33333 + Ne;
      const $t = he * 3;
      X[$t] = ct * At, X[$t + 1] = ft * At, X[$t + 2] = rt * At, he++;
    }
  }
  return he;
}
function h4(n, l, s, d, h, m, p, E, C, T) {
  const b = E * 0.5, R = C * 0.5, D = m + h;
  p && n.clearRect(0, 0, n.canvas.width, n.canvas.height), T[0] = -1, T[1] = -1, T[2] = -1, n.beginPath(), T[1] !== 31 && (n.strokeStyle = Bn[31], T[1] = 31), T[2] !== 5 && (n.lineWidth = 0.5, n.lineJoin = "miter", T[2] = 5);
  for (let k = m; k < D; k++) {
    const z = d[k], A = s[z * 3], N = s[z * 3 + 1], X = s[z * 3 + 2], K = l[A] * b + b, Y = l[A + 1] * R + R, P = l[N] * b + b, $ = l[N + 1] * R + R, Q = l[X] * b + b, re = l[X + 1] * R + R;
    n.moveTo(K, Y), n.lineTo(P, $), n.lineTo(Q, re), n.closePath();
  }
  n.stroke();
}
function m4(n, l, s, d, h, m, p, E, C, T, b, R, D, k, z, A, N, X, K, Y, P, $, Q, re, Re, he, G, se, fe) {
  const ae = T * 0.5, q = b * 0.5, we = E + p;
  C && n.clearRect(0, 0, n.canvas.width, n.canvas.height), fe[0] = -1, fe[1] = -1, fe[2] = -1;
  for (let Ne = E; Ne < we; Ne++) {
    const de = d[Ne], ie = s[de * 3], Se = s[de * 3 + 1], Te = s[de * 3 + 2], H = l[ie] * ae + ae, Z = l[ie + 1] * q + q, De = l[Se] * ae + ae, Me = l[Se + 1] * q + q, Qe = l[Te] * ae + ae, Ge = l[Te + 1] * q + q, Ie = (H + De + Qe) * 0.33333, qe = (Z + Me + Ge) * 0.33333, Ye = H - Ie, it = Z - qe, Ze = Math.abs(Ye), We = Math.abs(it), Ue = Ze > We ? Ze + 0.4 * We : We + 0.4 * Ze, ve = Ue > 0 ? e2 / Ue : 0, Pe = H + Ye * ve, be = Z + it * ve, Be = De - Ie, Fe = Me - qe, nt = Math.abs(Be), pt = Math.abs(Fe), Xe = nt > pt ? nt + 0.4 * pt : pt + 0.4 * nt, gt = Xe > 0 ? e2 / Xe : 0, wt = De + Be * gt, sn = Me + Fe * gt, $e = Qe - Ie, cn = Ge - qe, Rn = Math.abs($e), Mn = Math.abs(cn), _n = Rn > Mn ? Rn + 0.4 * Mn : Mn + 0.4 * Rn, xe = _n > 0 ? e2 / _n : 0, je = Qe + $e * xe, dt = Ge + cn * xe, Et = Q[de], Tt = se[Re[he + Et]].meshRenderer, Zt = m[de];
    switch (Zt) {
      case 0: {
        Pw(
          n,
          H,
          Z,
          De,
          Me,
          Qe,
          Ge,
          Pe,
          be,
          wt,
          sn,
          je,
          dt,
          R,
          h,
          $,
          P,
          ie,
          Se,
          Te,
          de,
          Tt,
          re[de],
          Y,
          G,
          se,
          k,
          z,
          A,
          N,
          fe
        );
        break;
      }
      case 1: {
        $w(
          n,
          H,
          Z,
          De,
          Me,
          Qe,
          Ge,
          Pe,
          be,
          wt,
          sn,
          je,
          dt,
          R,
          h,
          $,
          P,
          ie,
          Se,
          Te,
          de,
          Tt,
          re[de],
          Y,
          G,
          se,
          k,
          z,
          A,
          N,
          fe
        );
        break;
      }
      case 2: {
        Vw(
          n,
          H,
          Z,
          De,
          Me,
          Qe,
          Ge,
          Pe,
          be,
          wt,
          sn,
          je,
          dt,
          R,
          h,
          $,
          P,
          ie,
          Se,
          Te,
          de,
          Tt,
          re[de],
          Y,
          G,
          se,
          k,
          z,
          A,
          N,
          fe
        );
        break;
      }
      case 3: {
        Iw(
          n,
          H,
          Z,
          De,
          Me,
          Qe,
          Ge,
          Pe,
          be,
          wt,
          sn,
          je,
          dt,
          R,
          h,
          $,
          P,
          ie,
          Se,
          Te,
          de,
          Tt,
          re[de],
          Y,
          G,
          se,
          k,
          z,
          A,
          N,
          fe
        );
        break;
      }
      case 4: {
        qw(
          n,
          H,
          Z,
          De,
          Me,
          Qe,
          Ge,
          Pe,
          be,
          wt,
          sn,
          je,
          dt,
          R,
          h,
          $,
          P,
          ie,
          Se,
          Te,
          de,
          Tt,
          re[de],
          Y,
          G,
          se,
          k,
          z,
          A,
          N,
          fe
        );
        break;
      }
      default: {
        const Qt = Yw[Zt];
        Qt(
          n,
          H,
          Z,
          De,
          Me,
          Qe,
          Ge,
          Pe,
          be,
          wt,
          sn,
          je,
          dt,
          R,
          h,
          $,
          P,
          ie,
          Se,
          Te,
          de,
          Tt,
          re[de],
          Y,
          G,
          se,
          k,
          z,
          A,
          N,
          fe
        );
        break;
      }
    }
  }
}
const aC = Oy;
function Bw(n, l) {
  this.canvas = l || document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new Ww(), this.camera = n, this.scale = 1, this.layers = [];
  for (var s = 0; s < yd.layersCount; s++) {
    var d = document.createElement("canvas");
    this.layers[s] = d.getContext("2d"), this.layers[s].imageSmoothingEnabled = !1, this.layers[s].webkitImageSmoothingEnabled = !1;
  }
  var h = this;
  window.addEventListener("resize", function() {
    h.setSize(h.canvas.offsetWidth, h.canvas.offsetHeight);
  }), this.lastRenderStats = {
    dt: 0,
    fps: 0,
    frameTime: 0,
    sortTime: 0,
    cullTime: 0,
    groupTime: 0,
    processTime: 0,
    drawTime: 0,
    updateTime: 0,
    retrieveTime: 0
  };
  let m = performance.now(), p = 0, E = performance.now();
  const C = this;
  this.startRenderLoop = function T() {
    requestAnimationFrame(() => {
      const b = performance.now(), R = b - m;
      m = b, p++, b - E >= 500 && (C.lastRenderStats.fps = Math.round(p * 1e3 / (b - E)), p = 0, E = b), C.lastRenderStats.frameTime = R, C.render(), requestAnimationFrame(T);
    });
  };
}
var hi = Bw.prototype;
hi.size = null;
hi.scale = 1;
hi.width = null;
hi.height = null;
hi.viewportMatrix = null;
hi.camera = null;
hi.canvas = null;
hi.context = null;
Object.defineProperty(hi, "wireframe", {
  get: function() {
    return this.renderer.wireframe;
  },
  set: function(n) {
    this.renderer.wireframe = n;
  }
});
Object.defineProperty(hi, "debugNormals", {
  get: function() {
    return this.renderer.debugNormals;
  },
  set: function(n) {
    this.renderer.debugNormals = n;
  }
});
Object.defineProperty(hi, "debugAxis", {
  get: function() {
    return this.renderer.debugAxis;
  },
  set: function(n) {
    this.renderer.debugAxis = n;
  }
});
hi.start = function() {
  this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight), this.startRenderLoop();
};
hi.render = function() {
  this.camera !== null && this.renderer.render(this.camera.gameObject, this, this.lastRenderStats);
};
hi.setSize = function(n, l) {
  const s = n * this.scale, d = l * this.scale;
  this.width = s, this.height = d, this.canvas.width = s, this.canvas.height = d, this.viewportMatrix[0] = s / 2, this.viewportMatrix[5] = -d / 2, this.viewportMatrix[12] = s / 2, this.viewportMatrix[13] = d / 2;
  for (var h = 0; h < this.layers.length; h++) {
    var m = this.layers[h];
    m.canvas.width = s, m.canvas.height = d;
  }
  this.camera.setup(n, l);
};
hi.getWorldToScreen = function() {
  return aC(
    this.worldToScreenMatrix,
    this.viewportMatrix,
    this.camera.projectionMatrix
  ), aC(
    this.worldToScreenMatrix,
    this.worldToScreenMatrix,
    this.camera.gameObject.transform.getWorldToLocal()
  ), this.worldToScreenMatrix;
};
gd.Type = {
  DIRECTIONAL: 0,
  POINT: 1,
  SPOT: 2
};
function hs() {
  ur.call(this);
}
hs.prototype = Object.create(ur.prototype);
hs.prototype.constructor = hs;
hs.prototype.color = 16777215;
hs.prototype.range = 10;
hs.prototype.type = gd.Type.DIRECTIONAL;
hs.prototype.setGameObject = function(n) {
  ur.prototype.setGameObject.call(this, n), n.light = this;
};
function gd(n) {
  pi.call(this, n || "light"), this.addComponent(this.light = new hs());
}
gd.prototype = Object.create(pi.prototype);
gd.prototype.constructor = gd;
var Cy = { exports: {} }, Rp = {}, wy = { exports: {} }, xn = {};
var iC;
function y4() {
  if (iC) return xn;
  iC = 1;
  var n = /* @__PURE__ */ Symbol.for("react.element"), l = /* @__PURE__ */ Symbol.for("react.portal"), s = /* @__PURE__ */ Symbol.for("react.fragment"), d = /* @__PURE__ */ Symbol.for("react.strict_mode"), h = /* @__PURE__ */ Symbol.for("react.profiler"), m = /* @__PURE__ */ Symbol.for("react.provider"), p = /* @__PURE__ */ Symbol.for("react.context"), E = /* @__PURE__ */ Symbol.for("react.forward_ref"), C = /* @__PURE__ */ Symbol.for("react.suspense"), T = /* @__PURE__ */ Symbol.for("react.memo"), b = /* @__PURE__ */ Symbol.for("react.lazy"), R = Symbol.iterator;
  function D(H) {
    return H === null || typeof H != "object" ? null : (H = R && H[R] || H["@@iterator"], typeof H == "function" ? H : null);
  }
  var k = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, z = Object.assign, A = {};
  function N(H, Z, De) {
    this.props = H, this.context = Z, this.refs = A, this.updater = De || k;
  }
  N.prototype.isReactComponent = {}, N.prototype.setState = function(H, Z) {
    if (typeof H != "object" && typeof H != "function" && H != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, H, Z, "setState");
  }, N.prototype.forceUpdate = function(H) {
    this.updater.enqueueForceUpdate(this, H, "forceUpdate");
  };
  function X() {
  }
  X.prototype = N.prototype;
  function K(H, Z, De) {
    this.props = H, this.context = Z, this.refs = A, this.updater = De || k;
  }
  var Y = K.prototype = new X();
  Y.constructor = K, z(Y, N.prototype), Y.isPureReactComponent = !0;
  var P = Array.isArray, $ = Object.prototype.hasOwnProperty, Q = { current: null }, re = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Re(H, Z, De) {
    var Me, Qe = {}, Ge = null, Ie = null;
    if (Z != null) for (Me in Z.ref !== void 0 && (Ie = Z.ref), Z.key !== void 0 && (Ge = "" + Z.key), Z) $.call(Z, Me) && !re.hasOwnProperty(Me) && (Qe[Me] = Z[Me]);
    var qe = arguments.length - 2;
    if (qe === 1) Qe.children = De;
    else if (1 < qe) {
      for (var Ye = Array(qe), it = 0; it < qe; it++) Ye[it] = arguments[it + 2];
      Qe.children = Ye;
    }
    if (H && H.defaultProps) for (Me in qe = H.defaultProps, qe) Qe[Me] === void 0 && (Qe[Me] = qe[Me]);
    return { $$typeof: n, type: H, key: Ge, ref: Ie, props: Qe, _owner: Q.current };
  }
  function he(H, Z) {
    return { $$typeof: n, type: H.type, key: Z, ref: H.ref, props: H.props, _owner: H._owner };
  }
  function G(H) {
    return typeof H == "object" && H !== null && H.$$typeof === n;
  }
  function se(H) {
    var Z = { "=": "=0", ":": "=2" };
    return "$" + H.replace(/[=:]/g, function(De) {
      return Z[De];
    });
  }
  var fe = /\/+/g;
  function ae(H, Z) {
    return typeof H == "object" && H !== null && H.key != null ? se("" + H.key) : Z.toString(36);
  }
  function q(H, Z, De, Me, Qe) {
    var Ge = typeof H;
    (Ge === "undefined" || Ge === "boolean") && (H = null);
    var Ie = !1;
    if (H === null) Ie = !0;
    else switch (Ge) {
      case "string":
      case "number":
        Ie = !0;
        break;
      case "object":
        switch (H.$$typeof) {
          case n:
          case l:
            Ie = !0;
        }
    }
    if (Ie) return Ie = H, Qe = Qe(Ie), H = Me === "" ? "." + ae(Ie, 0) : Me, P(Qe) ? (De = "", H != null && (De = H.replace(fe, "$&/") + "/"), q(Qe, Z, De, "", function(it) {
      return it;
    })) : Qe != null && (G(Qe) && (Qe = he(Qe, De + (!Qe.key || Ie && Ie.key === Qe.key ? "" : ("" + Qe.key).replace(fe, "$&/") + "/") + H)), Z.push(Qe)), 1;
    if (Ie = 0, Me = Me === "" ? "." : Me + ":", P(H)) for (var qe = 0; qe < H.length; qe++) {
      Ge = H[qe];
      var Ye = Me + ae(Ge, qe);
      Ie += q(Ge, Z, De, Ye, Qe);
    }
    else if (Ye = D(H), typeof Ye == "function") for (H = Ye.call(H), qe = 0; !(Ge = H.next()).done; ) Ge = Ge.value, Ye = Me + ae(Ge, qe++), Ie += q(Ge, Z, De, Ye, Qe);
    else if (Ge === "object") throw Z = String(H), Error("Objects are not valid as a React child (found: " + (Z === "[object Object]" ? "object with keys {" + Object.keys(H).join(", ") + "}" : Z) + "). If you meant to render a collection of children, use an array instead.");
    return Ie;
  }
  function we(H, Z, De) {
    if (H == null) return H;
    var Me = [], Qe = 0;
    return q(H, Me, "", "", function(Ge) {
      return Z.call(De, Ge, Qe++);
    }), Me;
  }
  function Ne(H) {
    if (H._status === -1) {
      var Z = H._result;
      Z = Z(), Z.then(function(De) {
        (H._status === 0 || H._status === -1) && (H._status = 1, H._result = De);
      }, function(De) {
        (H._status === 0 || H._status === -1) && (H._status = 2, H._result = De);
      }), H._status === -1 && (H._status = 0, H._result = Z);
    }
    if (H._status === 1) return H._result.default;
    throw H._result;
  }
  var de = { current: null }, ie = { transition: null }, Se = { ReactCurrentDispatcher: de, ReactCurrentBatchConfig: ie, ReactCurrentOwner: Q };
  function Te() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return xn.Children = { map: we, forEach: function(H, Z, De) {
    we(H, function() {
      Z.apply(this, arguments);
    }, De);
  }, count: function(H) {
    var Z = 0;
    return we(H, function() {
      Z++;
    }), Z;
  }, toArray: function(H) {
    return we(H, function(Z) {
      return Z;
    }) || [];
  }, only: function(H) {
    if (!G(H)) throw Error("React.Children.only expected to receive a single React element child.");
    return H;
  } }, xn.Component = N, xn.Fragment = s, xn.Profiler = h, xn.PureComponent = K, xn.StrictMode = d, xn.Suspense = C, xn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Se, xn.act = Te, xn.cloneElement = function(H, Z, De) {
    if (H == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + H + ".");
    var Me = z({}, H.props), Qe = H.key, Ge = H.ref, Ie = H._owner;
    if (Z != null) {
      if (Z.ref !== void 0 && (Ge = Z.ref, Ie = Q.current), Z.key !== void 0 && (Qe = "" + Z.key), H.type && H.type.defaultProps) var qe = H.type.defaultProps;
      for (Ye in Z) $.call(Z, Ye) && !re.hasOwnProperty(Ye) && (Me[Ye] = Z[Ye] === void 0 && qe !== void 0 ? qe[Ye] : Z[Ye]);
    }
    var Ye = arguments.length - 2;
    if (Ye === 1) Me.children = De;
    else if (1 < Ye) {
      qe = Array(Ye);
      for (var it = 0; it < Ye; it++) qe[it] = arguments[it + 2];
      Me.children = qe;
    }
    return { $$typeof: n, type: H.type, key: Qe, ref: Ge, props: Me, _owner: Ie };
  }, xn.createContext = function(H) {
    return H = { $$typeof: p, _currentValue: H, _currentValue2: H, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, H.Provider = { $$typeof: m, _context: H }, H.Consumer = H;
  }, xn.createElement = Re, xn.createFactory = function(H) {
    var Z = Re.bind(null, H);
    return Z.type = H, Z;
  }, xn.createRef = function() {
    return { current: null };
  }, xn.forwardRef = function(H) {
    return { $$typeof: E, render: H };
  }, xn.isValidElement = G, xn.lazy = function(H) {
    return { $$typeof: b, _payload: { _status: -1, _result: H }, _init: Ne };
  }, xn.memo = function(H, Z) {
    return { $$typeof: T, type: H, compare: Z === void 0 ? null : Z };
  }, xn.startTransition = function(H) {
    var Z = ie.transition;
    ie.transition = {};
    try {
      H();
    } finally {
      ie.transition = Z;
    }
  }, xn.unstable_act = Te, xn.useCallback = function(H, Z) {
    return de.current.useCallback(H, Z);
  }, xn.useContext = function(H) {
    return de.current.useContext(H);
  }, xn.useDebugValue = function() {
  }, xn.useDeferredValue = function(H) {
    return de.current.useDeferredValue(H);
  }, xn.useEffect = function(H, Z) {
    return de.current.useEffect(H, Z);
  }, xn.useId = function() {
    return de.current.useId();
  }, xn.useImperativeHandle = function(H, Z, De) {
    return de.current.useImperativeHandle(H, Z, De);
  }, xn.useInsertionEffect = function(H, Z) {
    return de.current.useInsertionEffect(H, Z);
  }, xn.useLayoutEffect = function(H, Z) {
    return de.current.useLayoutEffect(H, Z);
  }, xn.useMemo = function(H, Z) {
    return de.current.useMemo(H, Z);
  }, xn.useReducer = function(H, Z, De) {
    return de.current.useReducer(H, Z, De);
  }, xn.useRef = function(H) {
    return de.current.useRef(H);
  }, xn.useState = function(H) {
    return de.current.useState(H);
  }, xn.useSyncExternalStore = function(H, Z, De) {
    return de.current.useSyncExternalStore(H, Z, De);
  }, xn.useTransition = function() {
    return de.current.useTransition();
  }, xn.version = "18.3.1", xn;
}
var xp = { exports: {} };
xp.exports;
var lC;
function g4() {
  return lC || (lC = 1, (function(n, l) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var s = "18.3.1", d = /* @__PURE__ */ Symbol.for("react.element"), h = /* @__PURE__ */ Symbol.for("react.portal"), m = /* @__PURE__ */ Symbol.for("react.fragment"), p = /* @__PURE__ */ Symbol.for("react.strict_mode"), E = /* @__PURE__ */ Symbol.for("react.profiler"), C = /* @__PURE__ */ Symbol.for("react.provider"), T = /* @__PURE__ */ Symbol.for("react.context"), b = /* @__PURE__ */ Symbol.for("react.forward_ref"), R = /* @__PURE__ */ Symbol.for("react.suspense"), D = /* @__PURE__ */ Symbol.for("react.suspense_list"), k = /* @__PURE__ */ Symbol.for("react.memo"), z = /* @__PURE__ */ Symbol.for("react.lazy"), A = /* @__PURE__ */ Symbol.for("react.offscreen"), N = Symbol.iterator, X = "@@iterator";
      function K(M) {
        if (M === null || typeof M != "object")
          return null;
        var F = N && M[N] || M[X];
        return typeof F == "function" ? F : null;
      }
      var Y = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, P = {
        transition: null
      }, $ = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, Q = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, re = {}, Re = null;
      function he(M) {
        Re = M;
      }
      re.setExtraStackFrame = function(M) {
        Re = M;
      }, re.getCurrentStack = null, re.getStackAddendum = function() {
        var M = "";
        Re && (M += Re);
        var F = re.getCurrentStack;
        return F && (M += F() || ""), M;
      };
      var G = !1, se = !1, fe = !1, ae = !1, q = !1, we = {
        ReactCurrentDispatcher: Y,
        ReactCurrentBatchConfig: P,
        ReactCurrentOwner: Q
      };
      we.ReactDebugCurrentFrame = re, we.ReactCurrentActQueue = $;
      function Ne(M) {
        {
          for (var F = arguments.length, oe = new Array(F > 1 ? F - 1 : 0), me = 1; me < F; me++)
            oe[me - 1] = arguments[me];
          ie("warn", M, oe);
        }
      }
      function de(M) {
        {
          for (var F = arguments.length, oe = new Array(F > 1 ? F - 1 : 0), me = 1; me < F; me++)
            oe[me - 1] = arguments[me];
          ie("error", M, oe);
        }
      }
      function ie(M, F, oe) {
        {
          var me = we.ReactDebugCurrentFrame, Ve = me.getStackAddendum();
          Ve !== "" && (F += "%s", oe = oe.concat([Ve]));
          var Ut = oe.map(function(Je) {
            return String(Je);
          });
          Ut.unshift("Warning: " + F), Function.prototype.apply.call(console[M], console, Ut);
        }
      }
      var Se = {};
      function Te(M, F) {
        {
          var oe = M.constructor, me = oe && (oe.displayName || oe.name) || "ReactClass", Ve = me + "." + F;
          if (Se[Ve])
            return;
          de("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", F, me), Se[Ve] = !0;
        }
      }
      var H = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(M) {
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
        enqueueForceUpdate: function(M, F, oe) {
          Te(M, "forceUpdate");
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
        enqueueReplaceState: function(M, F, oe, me) {
          Te(M, "replaceState");
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
        enqueueSetState: function(M, F, oe, me) {
          Te(M, "setState");
        }
      }, Z = Object.assign, De = {};
      Object.freeze(De);
      function Me(M, F, oe) {
        this.props = M, this.context = F, this.refs = De, this.updater = oe || H;
      }
      Me.prototype.isReactComponent = {}, Me.prototype.setState = function(M, F) {
        if (typeof M != "object" && typeof M != "function" && M != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, M, F, "setState");
      }, Me.prototype.forceUpdate = function(M) {
        this.updater.enqueueForceUpdate(this, M, "forceUpdate");
      };
      {
        var Qe = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, Ge = function(M, F) {
          Object.defineProperty(Me.prototype, M, {
            get: function() {
              Ne("%s(...) is deprecated in plain JavaScript React classes. %s", F[0], F[1]);
            }
          });
        };
        for (var Ie in Qe)
          Qe.hasOwnProperty(Ie) && Ge(Ie, Qe[Ie]);
      }
      function qe() {
      }
      qe.prototype = Me.prototype;
      function Ye(M, F, oe) {
        this.props = M, this.context = F, this.refs = De, this.updater = oe || H;
      }
      var it = Ye.prototype = new qe();
      it.constructor = Ye, Z(it, Me.prototype), it.isPureReactComponent = !0;
      function Ze() {
        var M = {
          current: null
        };
        return Object.seal(M), M;
      }
      var We = Array.isArray;
      function Ue(M) {
        return We(M);
      }
      function ve(M) {
        {
          var F = typeof Symbol == "function" && Symbol.toStringTag, oe = F && M[Symbol.toStringTag] || M.constructor.name || "Object";
          return oe;
        }
      }
      function Pe(M) {
        try {
          return be(M), !1;
        } catch {
          return !0;
        }
      }
      function be(M) {
        return "" + M;
      }
      function Be(M) {
        if (Pe(M))
          return de("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ve(M)), be(M);
      }
      function Fe(M, F, oe) {
        var me = M.displayName;
        if (me)
          return me;
        var Ve = F.displayName || F.name || "";
        return Ve !== "" ? oe + "(" + Ve + ")" : oe;
      }
      function nt(M) {
        return M.displayName || "Context";
      }
      function pt(M) {
        if (M == null)
          return null;
        if (typeof M.tag == "number" && de("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof M == "function")
          return M.displayName || M.name || null;
        if (typeof M == "string")
          return M;
        switch (M) {
          case m:
            return "Fragment";
          case h:
            return "Portal";
          case E:
            return "Profiler";
          case p:
            return "StrictMode";
          case R:
            return "Suspense";
          case D:
            return "SuspenseList";
        }
        if (typeof M == "object")
          switch (M.$$typeof) {
            case T:
              var F = M;
              return nt(F) + ".Consumer";
            case C:
              var oe = M;
              return nt(oe._context) + ".Provider";
            case b:
              return Fe(M, M.render, "ForwardRef");
            case k:
              var me = M.displayName || null;
              return me !== null ? me : pt(M.type) || "Memo";
            case z: {
              var Ve = M, Ut = Ve._payload, Je = Ve._init;
              try {
                return pt(Je(Ut));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Xe = Object.prototype.hasOwnProperty, gt = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, wt, sn, $e;
      $e = {};
      function cn(M) {
        if (Xe.call(M, "ref")) {
          var F = Object.getOwnPropertyDescriptor(M, "ref").get;
          if (F && F.isReactWarning)
            return !1;
        }
        return M.ref !== void 0;
      }
      function Rn(M) {
        if (Xe.call(M, "key")) {
          var F = Object.getOwnPropertyDescriptor(M, "key").get;
          if (F && F.isReactWarning)
            return !1;
        }
        return M.key !== void 0;
      }
      function Mn(M, F) {
        var oe = function() {
          wt || (wt = !0, de("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", F));
        };
        oe.isReactWarning = !0, Object.defineProperty(M, "key", {
          get: oe,
          configurable: !0
        });
      }
      function _n(M, F) {
        var oe = function() {
          sn || (sn = !0, de("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", F));
        };
        oe.isReactWarning = !0, Object.defineProperty(M, "ref", {
          get: oe,
          configurable: !0
        });
      }
      function xe(M) {
        if (typeof M.ref == "string" && Q.current && M.__self && Q.current.stateNode !== M.__self) {
          var F = pt(Q.current.type);
          $e[F] || (de('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', F, M.ref), $e[F] = !0);
        }
      }
      var je = function(M, F, oe, me, Ve, Ut, Je) {
        var Ht = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: d,
          // Built-in properties that belong on the element
          type: M,
          key: F,
          ref: oe,
          props: Je,
          // Record the component responsible for creating this element.
          _owner: Ut
        };
        return Ht._store = {}, Object.defineProperty(Ht._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(Ht, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: me
        }), Object.defineProperty(Ht, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Ve
        }), Object.freeze && (Object.freeze(Ht.props), Object.freeze(Ht)), Ht;
      };
      function dt(M, F, oe) {
        var me, Ve = {}, Ut = null, Je = null, Ht = null, yn = null;
        if (F != null) {
          cn(F) && (Je = F.ref, xe(F)), Rn(F) && (Be(F.key), Ut = "" + F.key), Ht = F.__self === void 0 ? null : F.__self, yn = F.__source === void 0 ? null : F.__source;
          for (me in F)
            Xe.call(F, me) && !gt.hasOwnProperty(me) && (Ve[me] = F[me]);
        }
        var Ln = arguments.length - 2;
        if (Ln === 1)
          Ve.children = oe;
        else if (Ln > 1) {
          for (var lr = Array(Ln), Zn = 0; Zn < Ln; Zn++)
            lr[Zn] = arguments[Zn + 2];
          Object.freeze && Object.freeze(lr), Ve.children = lr;
        }
        if (M && M.defaultProps) {
          var dn = M.defaultProps;
          for (me in dn)
            Ve[me] === void 0 && (Ve[me] = dn[me]);
        }
        if (Ut || Je) {
          var Jn = typeof M == "function" ? M.displayName || M.name || "Unknown" : M;
          Ut && Mn(Ve, Jn), Je && _n(Ve, Jn);
        }
        return je(M, Ut, Je, Ht, yn, Q.current, Ve);
      }
      function Et(M, F) {
        var oe = je(M.type, F, M.ref, M._self, M._source, M._owner, M.props);
        return oe;
      }
      function Tt(M, F, oe) {
        if (M == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + M + ".");
        var me, Ve = Z({}, M.props), Ut = M.key, Je = M.ref, Ht = M._self, yn = M._source, Ln = M._owner;
        if (F != null) {
          cn(F) && (Je = F.ref, Ln = Q.current), Rn(F) && (Be(F.key), Ut = "" + F.key);
          var lr;
          M.type && M.type.defaultProps && (lr = M.type.defaultProps);
          for (me in F)
            Xe.call(F, me) && !gt.hasOwnProperty(me) && (F[me] === void 0 && lr !== void 0 ? Ve[me] = lr[me] : Ve[me] = F[me]);
        }
        var Zn = arguments.length - 2;
        if (Zn === 1)
          Ve.children = oe;
        else if (Zn > 1) {
          for (var dn = Array(Zn), Jn = 0; Jn < Zn; Jn++)
            dn[Jn] = arguments[Jn + 2];
          Ve.children = dn;
        }
        return je(M.type, Ut, Je, Ht, yn, Ln, Ve);
      }
      function Zt(M) {
        return typeof M == "object" && M !== null && M.$$typeof === d;
      }
      var Qt = ".", Cn = ":";
      function Wt(M) {
        var F = /[=:]/g, oe = {
          "=": "=0",
          ":": "=2"
        }, me = M.replace(F, function(Ve) {
          return oe[Ve];
        });
        return "$" + me;
      }
      var tn = !1, nn = /\/+/g;
      function An(M) {
        return M.replace(nn, "$&/");
      }
      function xt(M, F) {
        return typeof M == "object" && M !== null && M.key != null ? (Be(M.key), Wt("" + M.key)) : F.toString(36);
      }
      function rn(M, F, oe, me, Ve) {
        var Ut = typeof M;
        (Ut === "undefined" || Ut === "boolean") && (M = null);
        var Je = !1;
        if (M === null)
          Je = !0;
        else
          switch (Ut) {
            case "string":
            case "number":
              Je = !0;
              break;
            case "object":
              switch (M.$$typeof) {
                case d:
                case h:
                  Je = !0;
              }
          }
        if (Je) {
          var Ht = M, yn = Ve(Ht), Ln = me === "" ? Qt + xt(Ht, 0) : me;
          if (Ue(yn)) {
            var lr = "";
            Ln != null && (lr = An(Ln) + "/"), rn(yn, F, lr, "", function(wd) {
              return wd;
            });
          } else yn != null && (Zt(yn) && (yn.key && (!Ht || Ht.key !== yn.key) && Be(yn.key), yn = Et(
            yn,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            oe + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (yn.key && (!Ht || Ht.key !== yn.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              An("" + yn.key) + "/"
            ) : "") + Ln
          )), F.push(yn));
          return 1;
        }
        var Zn, dn, Jn = 0, pr = me === "" ? Qt : me + Cn;
        if (Ue(M))
          for (var Kl = 0; Kl < M.length; Kl++)
            Zn = M[Kl], dn = pr + xt(Zn, Kl), Jn += rn(Zn, F, oe, dn, Ve);
        else {
          var gs = K(M);
          if (typeof gs == "function") {
            var wl = M;
            gs === wl.entries && (tn || Ne("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), tn = !0);
            for (var Ss = gs.call(wl), No, Cd = 0; !(No = Ss.next()).done; )
              Zn = No.value, dn = pr + xt(Zn, Cd++), Jn += rn(Zn, F, oe, dn, Ve);
          } else if (Ut === "object") {
            var Oc = String(M);
            throw new Error("Objects are not valid as a React child (found: " + (Oc === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : Oc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Jn;
      }
      function vn(M, F, oe) {
        if (M == null)
          return M;
        var me = [], Ve = 0;
        return rn(M, me, "", "", function(Ut) {
          return F.call(oe, Ut, Ve++);
        }), me;
      }
      function hn(M) {
        var F = 0;
        return vn(M, function() {
          F++;
        }), F;
      }
      function Nn(M, F, oe) {
        vn(M, function() {
          F.apply(this, arguments);
        }, oe);
      }
      function bn(M) {
        return vn(M, function(F) {
          return F;
        }) || [];
      }
      function Gt(M) {
        if (!Zt(M))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return M;
      }
      function wn(M) {
        var F = {
          $$typeof: T,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: M,
          _currentValue2: M,
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
        F.Provider = {
          $$typeof: C,
          _context: F
        };
        var oe = !1, me = !1, Ve = !1;
        {
          var Ut = {
            $$typeof: T,
            _context: F
          };
          Object.defineProperties(Ut, {
            Provider: {
              get: function() {
                return me || (me = !0, de("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), F.Provider;
              },
              set: function(Je) {
                F.Provider = Je;
              }
            },
            _currentValue: {
              get: function() {
                return F._currentValue;
              },
              set: function(Je) {
                F._currentValue = Je;
              }
            },
            _currentValue2: {
              get: function() {
                return F._currentValue2;
              },
              set: function(Je) {
                F._currentValue2 = Je;
              }
            },
            _threadCount: {
              get: function() {
                return F._threadCount;
              },
              set: function(Je) {
                F._threadCount = Je;
              }
            },
            Consumer: {
              get: function() {
                return oe || (oe = !0, de("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), F.Consumer;
              }
            },
            displayName: {
              get: function() {
                return F.displayName;
              },
              set: function(Je) {
                Ve || (Ne("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", Je), Ve = !0);
              }
            }
          }), F.Consumer = Ut;
        }
        return F._currentRenderer = null, F._currentRenderer2 = null, F;
      }
      var Xt = -1, Kt = 0, an = 1, ln = 2;
      function Qn(M) {
        if (M._status === Xt) {
          var F = M._result, oe = F();
          if (oe.then(function(Ut) {
            if (M._status === Kt || M._status === Xt) {
              var Je = M;
              Je._status = an, Je._result = Ut;
            }
          }, function(Ut) {
            if (M._status === Kt || M._status === Xt) {
              var Je = M;
              Je._status = ln, Je._result = Ut;
            }
          }), M._status === Xt) {
            var me = M;
            me._status = Kt, me._result = oe;
          }
        }
        if (M._status === an) {
          var Ve = M._result;
          return Ve === void 0 && de(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, Ve), "default" in Ve || de(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, Ve), Ve.default;
        } else
          throw M._result;
      }
      function ar(M) {
        var F = {
          // We use these fields to store the result.
          _status: Xt,
          _result: M
        }, oe = {
          $$typeof: z,
          _payload: F,
          _init: Qn
        };
        {
          var me, Ve;
          Object.defineProperties(oe, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return me;
              },
              set: function(Ut) {
                de("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), me = Ut, Object.defineProperty(oe, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return Ve;
              },
              set: function(Ut) {
                de("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Ve = Ut, Object.defineProperty(oe, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return oe;
      }
      function jn(M) {
        M != null && M.$$typeof === k ? de("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof M != "function" ? de("forwardRef requires a render function but was given %s.", M === null ? "null" : typeof M) : M.length !== 0 && M.length !== 2 && de("forwardRef render functions accept exactly two parameters: props and ref. %s", M.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), M != null && (M.defaultProps != null || M.propTypes != null) && de("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var F = {
          $$typeof: b,
          render: M
        };
        {
          var oe;
          Object.defineProperty(F, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return oe;
            },
            set: function(me) {
              oe = me, !M.name && !M.displayName && (M.displayName = me);
            }
          });
        }
        return F;
      }
      var j;
      j = /* @__PURE__ */ Symbol.for("react.module.reference");
      function Ee(M) {
        return !!(typeof M == "string" || typeof M == "function" || M === m || M === E || q || M === p || M === R || M === D || ae || M === A || G || se || fe || typeof M == "object" && M !== null && (M.$$typeof === z || M.$$typeof === k || M.$$typeof === C || M.$$typeof === T || M.$$typeof === b || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        M.$$typeof === j || M.getModuleId !== void 0));
      }
      function pe(M, F) {
        Ee(M) || de("memo: The first argument must be a component. Instead received: %s", M === null ? "null" : typeof M);
        var oe = {
          $$typeof: k,
          type: M,
          compare: F === void 0 ? null : F
        };
        {
          var me;
          Object.defineProperty(oe, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return me;
            },
            set: function(Ve) {
              me = Ve, !M.name && !M.displayName && (M.displayName = Ve);
            }
          });
        }
        return oe;
      }
      function He() {
        var M = Y.current;
        return M === null && de(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), M;
      }
      function vt(M) {
        var F = He();
        if (M._context !== void 0) {
          var oe = M._context;
          oe.Consumer === M ? de("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : oe.Provider === M && de("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return F.useContext(M);
      }
      function ct(M) {
        var F = He();
        return F.useState(M);
      }
      function ft(M, F, oe) {
        var me = He();
        return me.useReducer(M, F, oe);
      }
      function rt(M) {
        var F = He();
        return F.useRef(M);
      }
      function Lt(M, F) {
        var oe = He();
        return oe.useEffect(M, F);
      }
      function At(M, F) {
        var oe = He();
        return oe.useInsertionEffect(M, F);
      }
      function zt(M, F) {
        var oe = He();
        return oe.useLayoutEffect(M, F);
      }
      function Nt(M, F) {
        var oe = He();
        return oe.useCallback(M, F);
      }
      function Fn(M, F) {
        var oe = He();
        return oe.useMemo(M, F);
      }
      function Gn(M, F, oe) {
        var me = He();
        return me.useImperativeHandle(M, F, oe);
      }
      function Rt(M, F) {
        {
          var oe = He();
          return oe.useDebugValue(M, F);
        }
      }
      function $t() {
        var M = He();
        return M.useTransition();
      }
      function qt(M) {
        var F = He();
        return F.useDeferredValue(M);
      }
      function kt() {
        var M = He();
        return M.useId();
      }
      function gn(M, F, oe) {
        var me = He();
        return me.useSyncExternalStore(M, F, oe);
      }
      var mn = 0, Sr, ir, Xn, Oo, Kr, wu, Tu;
      function Ql() {
      }
      Ql.__reactDisabledLog = !0;
      function Gi() {
        {
          if (mn === 0) {
            Sr = console.log, ir = console.info, Xn = console.warn, Oo = console.error, Kr = console.group, wu = console.groupCollapsed, Tu = console.groupEnd;
            var M = {
              configurable: !0,
              enumerable: !0,
              value: Ql,
              writable: !0
            };
            Object.defineProperties(console, {
              info: M,
              log: M,
              warn: M,
              error: M,
              group: M,
              groupCollapsed: M,
              groupEnd: M
            });
          }
          mn++;
        }
      }
      function Ea() {
        {
          if (mn--, mn === 0) {
            var M = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: Z({}, M, {
                value: Sr
              }),
              info: Z({}, M, {
                value: ir
              }),
              warn: Z({}, M, {
                value: Xn
              }),
              error: Z({}, M, {
                value: Oo
              }),
              group: Z({}, M, {
                value: Kr
              }),
              groupCollapsed: Z({}, M, {
                value: wu
              }),
              groupEnd: Z({}, M, {
                value: Tu
              })
            });
          }
          mn < 0 && de("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Ja = we.ReactCurrentDispatcher, ei;
      function da(M, F, oe) {
        {
          if (ei === void 0)
            try {
              throw Error();
            } catch (Ve) {
              var me = Ve.stack.trim().match(/\n( *(at )?)/);
              ei = me && me[1] || "";
            }
          return `
` + ei + M;
        }
      }
      var Zr = !1, va;
      {
        var Ua = typeof WeakMap == "function" ? WeakMap : Map;
        va = new Ua();
      }
      function mi(M, F) {
        if (!M || Zr)
          return "";
        {
          var oe = va.get(M);
          if (oe !== void 0)
            return oe;
        }
        var me;
        Zr = !0;
        var Ve = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Ut;
        Ut = Ja.current, Ja.current = null, Gi();
        try {
          if (F) {
            var Je = function() {
              throw Error();
            };
            if (Object.defineProperty(Je.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Je, []);
              } catch (pr) {
                me = pr;
              }
              Reflect.construct(M, [], Je);
            } else {
              try {
                Je.call();
              } catch (pr) {
                me = pr;
              }
              M.call(Je.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (pr) {
              me = pr;
            }
            M();
          }
        } catch (pr) {
          if (pr && me && typeof pr.stack == "string") {
            for (var Ht = pr.stack.split(`
`), yn = me.stack.split(`
`), Ln = Ht.length - 1, lr = yn.length - 1; Ln >= 1 && lr >= 0 && Ht[Ln] !== yn[lr]; )
              lr--;
            for (; Ln >= 1 && lr >= 0; Ln--, lr--)
              if (Ht[Ln] !== yn[lr]) {
                if (Ln !== 1 || lr !== 1)
                  do
                    if (Ln--, lr--, lr < 0 || Ht[Ln] !== yn[lr]) {
                      var Zn = `
` + Ht[Ln].replace(" at new ", " at ");
                      return M.displayName && Zn.includes("<anonymous>") && (Zn = Zn.replace("<anonymous>", M.displayName)), typeof M == "function" && va.set(M, Zn), Zn;
                    }
                  while (Ln >= 1 && lr >= 0);
                break;
              }
          }
        } finally {
          Zr = !1, Ja.current = Ut, Ea(), Error.prepareStackTrace = Ve;
        }
        var dn = M ? M.displayName || M.name : "", Jn = dn ? da(dn) : "";
        return typeof M == "function" && va.set(M, Jn), Jn;
      }
      function Ca(M, F, oe) {
        return mi(M, !1);
      }
      function ti(M) {
        var F = M.prototype;
        return !!(F && F.isReactComponent);
      }
      function Dr(M, F, oe) {
        if (M == null)
          return "";
        if (typeof M == "function")
          return mi(M, ti(M));
        if (typeof M == "string")
          return da(M);
        switch (M) {
          case R:
            return da("Suspense");
          case D:
            return da("SuspenseList");
        }
        if (typeof M == "object")
          switch (M.$$typeof) {
            case b:
              return Ca(M.render);
            case k:
              return Dr(M.type, F, oe);
            case z: {
              var me = M, Ve = me._payload, Ut = me._init;
              try {
                return Dr(Ut(Ve), F, oe);
              } catch {
              }
            }
          }
        return "";
      }
      var Sn = {}, pa = we.ReactDebugCurrentFrame;
      function on(M) {
        if (M) {
          var F = M._owner, oe = Dr(M.type, M._source, F ? F.type : null);
          pa.setExtraStackFrame(oe);
        } else
          pa.setExtraStackFrame(null);
      }
      function Xi(M, F, oe, me, Ve) {
        {
          var Ut = Function.call.bind(Xe);
          for (var Je in M)
            if (Ut(M, Je)) {
              var Ht = void 0;
              try {
                if (typeof M[Je] != "function") {
                  var yn = Error((me || "React class") + ": " + oe + " type `" + Je + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof M[Je] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw yn.name = "Invariant Violation", yn;
                }
                Ht = M[Je](F, Je, me, oe, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Ln) {
                Ht = Ln;
              }
              Ht && !(Ht instanceof Error) && (on(Ve), de("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", me || "React class", oe, Je, typeof Ht), on(null)), Ht instanceof Error && !(Ht.message in Sn) && (Sn[Ht.message] = !0, on(Ve), de("Failed %s type: %s", oe, Ht.message), on(null));
            }
        }
      }
      function fn(M) {
        if (M) {
          var F = M._owner, oe = Dr(M.type, M._source, F ? F.type : null);
          he(oe);
        } else
          he(null);
      }
      var Vt;
      Vt = !1;
      function Ki() {
        if (Q.current) {
          var M = pt(Q.current.type);
          if (M)
            return `

Check the render method of \`` + M + "`.";
        }
        return "";
      }
      function Tr(M) {
        if (M !== void 0) {
          var F = M.fileName.replace(/^.*[\\\/]/, ""), oe = M.lineNumber;
          return `

Check your code at ` + F + ":" + oe + ".";
        }
        return "";
      }
      function ni(M) {
        return M != null ? Tr(M.__source) : "";
      }
      var Er = {};
      function Cr(M) {
        var F = Ki();
        if (!F) {
          var oe = typeof M == "string" ? M : M.displayName || M.name;
          oe && (F = `

Check the top-level render call using <` + oe + ">.");
        }
        return F;
      }
      function Kn(M, F) {
        if (!(!M._store || M._store.validated || M.key != null)) {
          M._store.validated = !0;
          var oe = Cr(F);
          if (!Er[oe]) {
            Er[oe] = !0;
            var me = "";
            M && M._owner && M._owner !== Q.current && (me = " It was passed a child from " + pt(M._owner.type) + "."), fn(M), de('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', oe, me), fn(null);
          }
        }
      }
      function Hn(M, F) {
        if (typeof M == "object") {
          if (Ue(M))
            for (var oe = 0; oe < M.length; oe++) {
              var me = M[oe];
              Zt(me) && Kn(me, F);
            }
          else if (Zt(M))
            M._store && (M._store.validated = !0);
          else if (M) {
            var Ve = K(M);
            if (typeof Ve == "function" && Ve !== M.entries)
              for (var Ut = Ve.call(M), Je; !(Je = Ut.next()).done; )
                Zt(Je.value) && Kn(Je.value, F);
          }
        }
      }
      function yi(M) {
        {
          var F = M.type;
          if (F == null || typeof F == "string")
            return;
          var oe;
          if (typeof F == "function")
            oe = F.propTypes;
          else if (typeof F == "object" && (F.$$typeof === b || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          F.$$typeof === k))
            oe = F.propTypes;
          else
            return;
          if (oe) {
            var me = pt(F);
            Xi(oe, M.props, "prop", me, M);
          } else if (F.PropTypes !== void 0 && !Vt) {
            Vt = !0;
            var Ve = pt(F);
            de("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ve || "Unknown");
          }
          typeof F.getDefaultProps == "function" && !F.getDefaultProps.isReactClassApproved && de("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function vr(M) {
        {
          for (var F = Object.keys(M.props), oe = 0; oe < F.length; oe++) {
            var me = F[oe];
            if (me !== "children" && me !== "key") {
              fn(M), de("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", me), fn(null);
              break;
            }
          }
          M.ref !== null && (fn(M), de("Invalid attribute `ref` supplied to `React.Fragment`."), fn(null));
        }
      }
      function ha(M, F, oe) {
        var me = Ee(M);
        if (!me) {
          var Ve = "";
          (M === void 0 || typeof M == "object" && M !== null && Object.keys(M).length === 0) && (Ve += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Ut = ni(F);
          Ut ? Ve += Ut : Ve += Ki();
          var Je;
          M === null ? Je = "null" : Ue(M) ? Je = "array" : M !== void 0 && M.$$typeof === d ? (Je = "<" + (pt(M.type) || "Unknown") + " />", Ve = " Did you accidentally export a JSX literal instead of a component?") : Je = typeof M, de("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Je, Ve);
        }
        var Ht = dt.apply(this, arguments);
        if (Ht == null)
          return Ht;
        if (me)
          for (var yn = 2; yn < arguments.length; yn++)
            Hn(arguments[yn], M);
        return M === m ? vr(Ht) : yi(Ht), Ht;
      }
      var wa = !1;
      function zo(M) {
        var F = ha.bind(null, M);
        return F.type = M, wa || (wa = !0, Ne("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(F, "type", {
          enumerable: !1,
          get: function() {
            return Ne("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: M
            }), M;
          }
        }), F;
      }
      function ms(M, F, oe) {
        for (var me = Tt.apply(this, arguments), Ve = 2; Ve < arguments.length; Ve++)
          Hn(arguments[Ve], me.type);
        return yi(me), me;
      }
      function ys(M, F) {
        var oe = P.transition;
        P.transition = {};
        var me = P.transition;
        P.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          M();
        } finally {
          if (P.transition = oe, oe === null && me._updatedFibers) {
            var Ve = me._updatedFibers.size;
            Ve > 10 && Ne("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), me._updatedFibers.clear();
          }
        }
      }
      var Gl = !1, Lo = null;
      function Ed(M) {
        if (Lo === null)
          try {
            var F = ("require" + Math.random()).slice(0, 7), oe = n && n[F];
            Lo = oe.call(n, "timers").setImmediate;
          } catch {
            Lo = function(Ve) {
              Gl === !1 && (Gl = !0, typeof MessageChannel > "u" && de("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Ut = new MessageChannel();
              Ut.port1.onmessage = Ve, Ut.port2.postMessage(void 0);
            };
          }
        return Lo(M);
      }
      var gi = 0, ji = !1;
      function Zi(M) {
        {
          var F = gi;
          gi++, $.current === null && ($.current = []);
          var oe = $.isBatchingLegacy, me;
          try {
            if ($.isBatchingLegacy = !0, me = M(), !oe && $.didScheduleLegacyUpdate) {
              var Ve = $.current;
              Ve !== null && ($.didScheduleLegacyUpdate = !1, Xl(Ve));
            }
          } catch (dn) {
            throw Si(F), dn;
          } finally {
            $.isBatchingLegacy = oe;
          }
          if (me !== null && typeof me == "object" && typeof me.then == "function") {
            var Ut = me, Je = !1, Ht = {
              then: function(dn, Jn) {
                Je = !0, Ut.then(function(pr) {
                  Si(F), gi === 0 ? Ru(pr, dn, Jn) : dn(pr);
                }, function(pr) {
                  Si(F), Jn(pr);
                });
              }
            };
            return !ji && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              Je || (ji = !0, de("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), Ht;
          } else {
            var yn = me;
            if (Si(F), gi === 0) {
              var Ln = $.current;
              Ln !== null && (Xl(Ln), $.current = null);
              var lr = {
                then: function(dn, Jn) {
                  $.current === null ? ($.current = [], Ru(yn, dn, Jn)) : dn(yn);
                }
              };
              return lr;
            } else {
              var Zn = {
                then: function(dn, Jn) {
                  dn(yn);
                }
              };
              return Zn;
            }
          }
        }
      }
      function Si(M) {
        M !== gi - 1 && de("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), gi = M;
      }
      function Ru(M, F, oe) {
        {
          var me = $.current;
          if (me !== null)
            try {
              Xl(me), Ed(function() {
                me.length === 0 ? ($.current = null, F(M)) : Ru(M, F, oe);
              });
            } catch (Ve) {
              oe(Ve);
            }
          else
            F(M);
        }
      }
      var bu = !1;
      function Xl(M) {
        if (!bu) {
          bu = !0;
          var F = 0;
          try {
            for (; F < M.length; F++) {
              var oe = M[F];
              do
                oe = oe(!0);
              while (oe !== null);
            }
            M.length = 0;
          } catch (me) {
            throw M = M.slice(F + 1), me;
          } finally {
            bu = !1;
          }
        }
      }
      var Ao = ha, xu = ms, Mu = zo, Fi = {
        map: vn,
        forEach: Nn,
        count: hn,
        toArray: bn,
        only: Gt
      };
      l.Children = Fi, l.Component = Me, l.Fragment = m, l.Profiler = E, l.PureComponent = Ye, l.StrictMode = p, l.Suspense = R, l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = we, l.act = Zi, l.cloneElement = xu, l.createContext = wn, l.createElement = Ao, l.createFactory = Mu, l.createRef = Ze, l.forwardRef = jn, l.isValidElement = Zt, l.lazy = ar, l.memo = pe, l.startTransition = ys, l.unstable_act = Zi, l.useCallback = Nt, l.useContext = vt, l.useDebugValue = Rt, l.useDeferredValue = qt, l.useEffect = Lt, l.useId = kt, l.useImperativeHandle = Gn, l.useInsertionEffect = At, l.useLayoutEffect = zt, l.useMemo = Fn, l.useReducer = ft, l.useRef = rt, l.useState = ct, l.useSyncExternalStore = gn, l.useTransition = $t, l.version = s, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(xp, xp.exports)), xp.exports;
}
var oC;
function kp() {
  return oC || (oC = 1, process.env.NODE_ENV === "production" ? wy.exports = y4() : wy.exports = g4()), wy.exports;
}
var uC;
function S4() {
  if (uC) return Rp;
  uC = 1;
  var n = kp(), l = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.fragment"), d = Object.prototype.hasOwnProperty, h = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(E, C, T) {
    var b, R = {}, D = null, k = null;
    T !== void 0 && (D = "" + T), C.key !== void 0 && (D = "" + C.key), C.ref !== void 0 && (k = C.ref);
    for (b in C) d.call(C, b) && !m.hasOwnProperty(b) && (R[b] = C[b]);
    if (E && E.defaultProps) for (b in C = E.defaultProps, C) R[b] === void 0 && (R[b] = C[b]);
    return { $$typeof: l, type: E, key: D, ref: k, props: R, _owner: h.current };
  }
  return Rp.Fragment = s, Rp.jsx = p, Rp.jsxs = p, Rp;
}
var bp = {};
var sC;
function E4() {
  return sC || (sC = 1, process.env.NODE_ENV !== "production" && (function() {
    var n = kp(), l = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.portal"), d = /* @__PURE__ */ Symbol.for("react.fragment"), h = /* @__PURE__ */ Symbol.for("react.strict_mode"), m = /* @__PURE__ */ Symbol.for("react.profiler"), p = /* @__PURE__ */ Symbol.for("react.provider"), E = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), T = /* @__PURE__ */ Symbol.for("react.suspense"), b = /* @__PURE__ */ Symbol.for("react.suspense_list"), R = /* @__PURE__ */ Symbol.for("react.memo"), D = /* @__PURE__ */ Symbol.for("react.lazy"), k = /* @__PURE__ */ Symbol.for("react.offscreen"), z = Symbol.iterator, A = "@@iterator";
    function N(j) {
      if (j === null || typeof j != "object")
        return null;
      var Ee = z && j[z] || j[A];
      return typeof Ee == "function" ? Ee : null;
    }
    var X = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function K(j) {
      {
        for (var Ee = arguments.length, pe = new Array(Ee > 1 ? Ee - 1 : 0), He = 1; He < Ee; He++)
          pe[He - 1] = arguments[He];
        Y("error", j, pe);
      }
    }
    function Y(j, Ee, pe) {
      {
        var He = X.ReactDebugCurrentFrame, vt = He.getStackAddendum();
        vt !== "" && (Ee += "%s", pe = pe.concat([vt]));
        var ct = pe.map(function(ft) {
          return String(ft);
        });
        ct.unshift("Warning: " + Ee), Function.prototype.apply.call(console[j], console, ct);
      }
    }
    var P = !1, $ = !1, Q = !1, re = !1, Re = !1, he;
    he = /* @__PURE__ */ Symbol.for("react.module.reference");
    function G(j) {
      return !!(typeof j == "string" || typeof j == "function" || j === d || j === m || Re || j === h || j === T || j === b || re || j === k || P || $ || Q || typeof j == "object" && j !== null && (j.$$typeof === D || j.$$typeof === R || j.$$typeof === p || j.$$typeof === E || j.$$typeof === C || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      j.$$typeof === he || j.getModuleId !== void 0));
    }
    function se(j, Ee, pe) {
      var He = j.displayName;
      if (He)
        return He;
      var vt = Ee.displayName || Ee.name || "";
      return vt !== "" ? pe + "(" + vt + ")" : pe;
    }
    function fe(j) {
      return j.displayName || "Context";
    }
    function ae(j) {
      if (j == null)
        return null;
      if (typeof j.tag == "number" && K("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof j == "function")
        return j.displayName || j.name || null;
      if (typeof j == "string")
        return j;
      switch (j) {
        case d:
          return "Fragment";
        case s:
          return "Portal";
        case m:
          return "Profiler";
        case h:
          return "StrictMode";
        case T:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof j == "object")
        switch (j.$$typeof) {
          case E:
            var Ee = j;
            return fe(Ee) + ".Consumer";
          case p:
            var pe = j;
            return fe(pe._context) + ".Provider";
          case C:
            return se(j, j.render, "ForwardRef");
          case R:
            var He = j.displayName || null;
            return He !== null ? He : ae(j.type) || "Memo";
          case D: {
            var vt = j, ct = vt._payload, ft = vt._init;
            try {
              return ae(ft(ct));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var q = Object.assign, we = 0, Ne, de, ie, Se, Te, H, Z;
    function De() {
    }
    De.__reactDisabledLog = !0;
    function Me() {
      {
        if (we === 0) {
          Ne = console.log, de = console.info, ie = console.warn, Se = console.error, Te = console.group, H = console.groupCollapsed, Z = console.groupEnd;
          var j = {
            configurable: !0,
            enumerable: !0,
            value: De,
            writable: !0
          };
          Object.defineProperties(console, {
            info: j,
            log: j,
            warn: j,
            error: j,
            group: j,
            groupCollapsed: j,
            groupEnd: j
          });
        }
        we++;
      }
    }
    function Qe() {
      {
        if (we--, we === 0) {
          var j = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: q({}, j, {
              value: Ne
            }),
            info: q({}, j, {
              value: de
            }),
            warn: q({}, j, {
              value: ie
            }),
            error: q({}, j, {
              value: Se
            }),
            group: q({}, j, {
              value: Te
            }),
            groupCollapsed: q({}, j, {
              value: H
            }),
            groupEnd: q({}, j, {
              value: Z
            })
          });
        }
        we < 0 && K("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ge = X.ReactCurrentDispatcher, Ie;
    function qe(j, Ee, pe) {
      {
        if (Ie === void 0)
          try {
            throw Error();
          } catch (vt) {
            var He = vt.stack.trim().match(/\n( *(at )?)/);
            Ie = He && He[1] || "";
          }
        return `
` + Ie + j;
      }
    }
    var Ye = !1, it;
    {
      var Ze = typeof WeakMap == "function" ? WeakMap : Map;
      it = new Ze();
    }
    function We(j, Ee) {
      if (!j || Ye)
        return "";
      {
        var pe = it.get(j);
        if (pe !== void 0)
          return pe;
      }
      var He;
      Ye = !0;
      var vt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ct;
      ct = Ge.current, Ge.current = null, Me();
      try {
        if (Ee) {
          var ft = function() {
            throw Error();
          };
          if (Object.defineProperty(ft.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ft, []);
            } catch (Rt) {
              He = Rt;
            }
            Reflect.construct(j, [], ft);
          } else {
            try {
              ft.call();
            } catch (Rt) {
              He = Rt;
            }
            j.call(ft.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Rt) {
            He = Rt;
          }
          j();
        }
      } catch (Rt) {
        if (Rt && He && typeof Rt.stack == "string") {
          for (var rt = Rt.stack.split(`
`), Lt = He.stack.split(`
`), At = rt.length - 1, zt = Lt.length - 1; At >= 1 && zt >= 0 && rt[At] !== Lt[zt]; )
            zt--;
          for (; At >= 1 && zt >= 0; At--, zt--)
            if (rt[At] !== Lt[zt]) {
              if (At !== 1 || zt !== 1)
                do
                  if (At--, zt--, zt < 0 || rt[At] !== Lt[zt]) {
                    var Nt = `
` + rt[At].replace(" at new ", " at ");
                    return j.displayName && Nt.includes("<anonymous>") && (Nt = Nt.replace("<anonymous>", j.displayName)), typeof j == "function" && it.set(j, Nt), Nt;
                  }
                while (At >= 1 && zt >= 0);
              break;
            }
        }
      } finally {
        Ye = !1, Ge.current = ct, Qe(), Error.prepareStackTrace = vt;
      }
      var Fn = j ? j.displayName || j.name : "", Gn = Fn ? qe(Fn) : "";
      return typeof j == "function" && it.set(j, Gn), Gn;
    }
    function Ue(j, Ee, pe) {
      return We(j, !1);
    }
    function ve(j) {
      var Ee = j.prototype;
      return !!(Ee && Ee.isReactComponent);
    }
    function Pe(j, Ee, pe) {
      if (j == null)
        return "";
      if (typeof j == "function")
        return We(j, ve(j));
      if (typeof j == "string")
        return qe(j);
      switch (j) {
        case T:
          return qe("Suspense");
        case b:
          return qe("SuspenseList");
      }
      if (typeof j == "object")
        switch (j.$$typeof) {
          case C:
            return Ue(j.render);
          case R:
            return Pe(j.type, Ee, pe);
          case D: {
            var He = j, vt = He._payload, ct = He._init;
            try {
              return Pe(ct(vt), Ee, pe);
            } catch {
            }
          }
        }
      return "";
    }
    var be = Object.prototype.hasOwnProperty, Be = {}, Fe = X.ReactDebugCurrentFrame;
    function nt(j) {
      if (j) {
        var Ee = j._owner, pe = Pe(j.type, j._source, Ee ? Ee.type : null);
        Fe.setExtraStackFrame(pe);
      } else
        Fe.setExtraStackFrame(null);
    }
    function pt(j, Ee, pe, He, vt) {
      {
        var ct = Function.call.bind(be);
        for (var ft in j)
          if (ct(j, ft)) {
            var rt = void 0;
            try {
              if (typeof j[ft] != "function") {
                var Lt = Error((He || "React class") + ": " + pe + " type `" + ft + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof j[ft] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Lt.name = "Invariant Violation", Lt;
              }
              rt = j[ft](Ee, ft, He, pe, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (At) {
              rt = At;
            }
            rt && !(rt instanceof Error) && (nt(vt), K("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", He || "React class", pe, ft, typeof rt), nt(null)), rt instanceof Error && !(rt.message in Be) && (Be[rt.message] = !0, nt(vt), K("Failed %s type: %s", pe, rt.message), nt(null));
          }
      }
    }
    var Xe = Array.isArray;
    function gt(j) {
      return Xe(j);
    }
    function wt(j) {
      {
        var Ee = typeof Symbol == "function" && Symbol.toStringTag, pe = Ee && j[Symbol.toStringTag] || j.constructor.name || "Object";
        return pe;
      }
    }
    function sn(j) {
      try {
        return $e(j), !1;
      } catch {
        return !0;
      }
    }
    function $e(j) {
      return "" + j;
    }
    function cn(j) {
      if (sn(j))
        return K("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", wt(j)), $e(j);
    }
    var Rn = X.ReactCurrentOwner, Mn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, _n, xe;
    function je(j) {
      if (be.call(j, "ref")) {
        var Ee = Object.getOwnPropertyDescriptor(j, "ref").get;
        if (Ee && Ee.isReactWarning)
          return !1;
      }
      return j.ref !== void 0;
    }
    function dt(j) {
      if (be.call(j, "key")) {
        var Ee = Object.getOwnPropertyDescriptor(j, "key").get;
        if (Ee && Ee.isReactWarning)
          return !1;
      }
      return j.key !== void 0;
    }
    function Et(j, Ee) {
      typeof j.ref == "string" && Rn.current;
    }
    function Tt(j, Ee) {
      {
        var pe = function() {
          _n || (_n = !0, K("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Ee));
        };
        pe.isReactWarning = !0, Object.defineProperty(j, "key", {
          get: pe,
          configurable: !0
        });
      }
    }
    function Zt(j, Ee) {
      {
        var pe = function() {
          xe || (xe = !0, K("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Ee));
        };
        pe.isReactWarning = !0, Object.defineProperty(j, "ref", {
          get: pe,
          configurable: !0
        });
      }
    }
    var Qt = function(j, Ee, pe, He, vt, ct, ft) {
      var rt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: l,
        // Built-in properties that belong on the element
        type: j,
        key: Ee,
        ref: pe,
        props: ft,
        // Record the component responsible for creating this element.
        _owner: ct
      };
      return rt._store = {}, Object.defineProperty(rt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(rt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: He
      }), Object.defineProperty(rt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: vt
      }), Object.freeze && (Object.freeze(rt.props), Object.freeze(rt)), rt;
    };
    function Cn(j, Ee, pe, He, vt) {
      {
        var ct, ft = {}, rt = null, Lt = null;
        pe !== void 0 && (cn(pe), rt = "" + pe), dt(Ee) && (cn(Ee.key), rt = "" + Ee.key), je(Ee) && (Lt = Ee.ref, Et(Ee, vt));
        for (ct in Ee)
          be.call(Ee, ct) && !Mn.hasOwnProperty(ct) && (ft[ct] = Ee[ct]);
        if (j && j.defaultProps) {
          var At = j.defaultProps;
          for (ct in At)
            ft[ct] === void 0 && (ft[ct] = At[ct]);
        }
        if (rt || Lt) {
          var zt = typeof j == "function" ? j.displayName || j.name || "Unknown" : j;
          rt && Tt(ft, zt), Lt && Zt(ft, zt);
        }
        return Qt(j, rt, Lt, vt, He, Rn.current, ft);
      }
    }
    var Wt = X.ReactCurrentOwner, tn = X.ReactDebugCurrentFrame;
    function nn(j) {
      if (j) {
        var Ee = j._owner, pe = Pe(j.type, j._source, Ee ? Ee.type : null);
        tn.setExtraStackFrame(pe);
      } else
        tn.setExtraStackFrame(null);
    }
    var An;
    An = !1;
    function xt(j) {
      return typeof j == "object" && j !== null && j.$$typeof === l;
    }
    function rn() {
      {
        if (Wt.current) {
          var j = ae(Wt.current.type);
          if (j)
            return `

Check the render method of \`` + j + "`.";
        }
        return "";
      }
    }
    function vn(j) {
      return "";
    }
    var hn = {};
    function Nn(j) {
      {
        var Ee = rn();
        if (!Ee) {
          var pe = typeof j == "string" ? j : j.displayName || j.name;
          pe && (Ee = `

Check the top-level render call using <` + pe + ">.");
        }
        return Ee;
      }
    }
    function bn(j, Ee) {
      {
        if (!j._store || j._store.validated || j.key != null)
          return;
        j._store.validated = !0;
        var pe = Nn(Ee);
        if (hn[pe])
          return;
        hn[pe] = !0;
        var He = "";
        j && j._owner && j._owner !== Wt.current && (He = " It was passed a child from " + ae(j._owner.type) + "."), nn(j), K('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', pe, He), nn(null);
      }
    }
    function Gt(j, Ee) {
      {
        if (typeof j != "object")
          return;
        if (gt(j))
          for (var pe = 0; pe < j.length; pe++) {
            var He = j[pe];
            xt(He) && bn(He, Ee);
          }
        else if (xt(j))
          j._store && (j._store.validated = !0);
        else if (j) {
          var vt = N(j);
          if (typeof vt == "function" && vt !== j.entries)
            for (var ct = vt.call(j), ft; !(ft = ct.next()).done; )
              xt(ft.value) && bn(ft.value, Ee);
        }
      }
    }
    function wn(j) {
      {
        var Ee = j.type;
        if (Ee == null || typeof Ee == "string")
          return;
        var pe;
        if (typeof Ee == "function")
          pe = Ee.propTypes;
        else if (typeof Ee == "object" && (Ee.$$typeof === C || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        Ee.$$typeof === R))
          pe = Ee.propTypes;
        else
          return;
        if (pe) {
          var He = ae(Ee);
          pt(pe, j.props, "prop", He, j);
        } else if (Ee.PropTypes !== void 0 && !An) {
          An = !0;
          var vt = ae(Ee);
          K("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", vt || "Unknown");
        }
        typeof Ee.getDefaultProps == "function" && !Ee.getDefaultProps.isReactClassApproved && K("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Xt(j) {
      {
        for (var Ee = Object.keys(j.props), pe = 0; pe < Ee.length; pe++) {
          var He = Ee[pe];
          if (He !== "children" && He !== "key") {
            nn(j), K("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", He), nn(null);
            break;
          }
        }
        j.ref !== null && (nn(j), K("Invalid attribute `ref` supplied to `React.Fragment`."), nn(null));
      }
    }
    var Kt = {};
    function an(j, Ee, pe, He, vt, ct) {
      {
        var ft = G(j);
        if (!ft) {
          var rt = "";
          (j === void 0 || typeof j == "object" && j !== null && Object.keys(j).length === 0) && (rt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Lt = vn();
          Lt ? rt += Lt : rt += rn();
          var At;
          j === null ? At = "null" : gt(j) ? At = "array" : j !== void 0 && j.$$typeof === l ? (At = "<" + (ae(j.type) || "Unknown") + " />", rt = " Did you accidentally export a JSX literal instead of a component?") : At = typeof j, K("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", At, rt);
        }
        var zt = Cn(j, Ee, pe, vt, ct);
        if (zt == null)
          return zt;
        if (ft) {
          var Nt = Ee.children;
          if (Nt !== void 0)
            if (He)
              if (gt(Nt)) {
                for (var Fn = 0; Fn < Nt.length; Fn++)
                  Gt(Nt[Fn], j);
                Object.freeze && Object.freeze(Nt);
              } else
                K("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Gt(Nt, j);
        }
        if (be.call(Ee, "key")) {
          var Gn = ae(j), Rt = Object.keys(Ee).filter(function(kt) {
            return kt !== "key";
          }), $t = Rt.length > 0 ? "{key: someKey, " + Rt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Kt[Gn + $t]) {
            var qt = Rt.length > 0 ? "{" + Rt.join(": ..., ") + ": ...}" : "{}";
            K(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, $t, Gn, qt, Gn), Kt[Gn + $t] = !0;
          }
        }
        return j === d ? Xt(zt) : wn(zt), zt;
      }
    }
    function ln(j, Ee, pe) {
      return an(j, Ee, pe, !0);
    }
    function Qn(j, Ee, pe) {
      return an(j, Ee, pe, !1);
    }
    var ar = Qn, jn = ln;
    bp.Fragment = d, bp.jsx = ar, bp.jsxs = jn;
  })()), bp;
}
var cC;
function C4() {
  return cC || (cC = 1, process.env.NODE_ENV === "production" ? Cy.exports = S4() : Cy.exports = E4()), Cy.exports;
}
var _t = C4(), Sl = kp(), hd = {}, Ty = { exports: {} }, Ni = {}, Ry = { exports: {} }, t2 = {};
var fC;
function w4() {
  return fC || (fC = 1, (function(n) {
    function l(ie, Se) {
      var Te = ie.length;
      ie.push(Se);
      e: for (; 0 < Te; ) {
        var H = Te - 1 >>> 1, Z = ie[H];
        if (0 < h(Z, Se)) ie[H] = Se, ie[Te] = Z, Te = H;
        else break e;
      }
    }
    function s(ie) {
      return ie.length === 0 ? null : ie[0];
    }
    function d(ie) {
      if (ie.length === 0) return null;
      var Se = ie[0], Te = ie.pop();
      if (Te !== Se) {
        ie[0] = Te;
        e: for (var H = 0, Z = ie.length, De = Z >>> 1; H < De; ) {
          var Me = 2 * (H + 1) - 1, Qe = ie[Me], Ge = Me + 1, Ie = ie[Ge];
          if (0 > h(Qe, Te)) Ge < Z && 0 > h(Ie, Qe) ? (ie[H] = Ie, ie[Ge] = Te, H = Ge) : (ie[H] = Qe, ie[Me] = Te, H = Me);
          else if (Ge < Z && 0 > h(Ie, Te)) ie[H] = Ie, ie[Ge] = Te, H = Ge;
          else break e;
        }
      }
      return Se;
    }
    function h(ie, Se) {
      var Te = ie.sortIndex - Se.sortIndex;
      return Te !== 0 ? Te : ie.id - Se.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      n.unstable_now = function() {
        return m.now();
      };
    } else {
      var p = Date, E = p.now();
      n.unstable_now = function() {
        return p.now() - E;
      };
    }
    var C = [], T = [], b = 1, R = null, D = 3, k = !1, z = !1, A = !1, N = typeof setTimeout == "function" ? setTimeout : null, X = typeof clearTimeout == "function" ? clearTimeout : null, K = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Y(ie) {
      for (var Se = s(T); Se !== null; ) {
        if (Se.callback === null) d(T);
        else if (Se.startTime <= ie) d(T), Se.sortIndex = Se.expirationTime, l(C, Se);
        else break;
        Se = s(T);
      }
    }
    function P(ie) {
      if (A = !1, Y(ie), !z) if (s(C) !== null) z = !0, Ne($);
      else {
        var Se = s(T);
        Se !== null && de(P, Se.startTime - ie);
      }
    }
    function $(ie, Se) {
      z = !1, A && (A = !1, X(Re), Re = -1), k = !0;
      var Te = D;
      try {
        for (Y(Se), R = s(C); R !== null && (!(R.expirationTime > Se) || ie && !se()); ) {
          var H = R.callback;
          if (typeof H == "function") {
            R.callback = null, D = R.priorityLevel;
            var Z = H(R.expirationTime <= Se);
            Se = n.unstable_now(), typeof Z == "function" ? R.callback = Z : R === s(C) && d(C), Y(Se);
          } else d(C);
          R = s(C);
        }
        if (R !== null) var De = !0;
        else {
          var Me = s(T);
          Me !== null && de(P, Me.startTime - Se), De = !1;
        }
        return De;
      } finally {
        R = null, D = Te, k = !1;
      }
    }
    var Q = !1, re = null, Re = -1, he = 5, G = -1;
    function se() {
      return !(n.unstable_now() - G < he);
    }
    function fe() {
      if (re !== null) {
        var ie = n.unstable_now();
        G = ie;
        var Se = !0;
        try {
          Se = re(!0, ie);
        } finally {
          Se ? ae() : (Q = !1, re = null);
        }
      } else Q = !1;
    }
    var ae;
    if (typeof K == "function") ae = function() {
      K(fe);
    };
    else if (typeof MessageChannel < "u") {
      var q = new MessageChannel(), we = q.port2;
      q.port1.onmessage = fe, ae = function() {
        we.postMessage(null);
      };
    } else ae = function() {
      N(fe, 0);
    };
    function Ne(ie) {
      re = ie, Q || (Q = !0, ae());
    }
    function de(ie, Se) {
      Re = N(function() {
        ie(n.unstable_now());
      }, Se);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(ie) {
      ie.callback = null;
    }, n.unstable_continueExecution = function() {
      z || k || (z = !0, Ne($));
    }, n.unstable_forceFrameRate = function(ie) {
      0 > ie || 125 < ie ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : he = 0 < ie ? Math.floor(1e3 / ie) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return D;
    }, n.unstable_getFirstCallbackNode = function() {
      return s(C);
    }, n.unstable_next = function(ie) {
      switch (D) {
        case 1:
        case 2:
        case 3:
          var Se = 3;
          break;
        default:
          Se = D;
      }
      var Te = D;
      D = Se;
      try {
        return ie();
      } finally {
        D = Te;
      }
    }, n.unstable_pauseExecution = function() {
    }, n.unstable_requestPaint = function() {
    }, n.unstable_runWithPriority = function(ie, Se) {
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
      var Te = D;
      D = ie;
      try {
        return Se();
      } finally {
        D = Te;
      }
    }, n.unstable_scheduleCallback = function(ie, Se, Te) {
      var H = n.unstable_now();
      switch (typeof Te == "object" && Te !== null ? (Te = Te.delay, Te = typeof Te == "number" && 0 < Te ? H + Te : H) : Te = H, ie) {
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
      return Z = Te + Z, ie = { id: b++, callback: Se, priorityLevel: ie, startTime: Te, expirationTime: Z, sortIndex: -1 }, Te > H ? (ie.sortIndex = Te, l(T, ie), s(C) === null && ie === s(T) && (A ? (X(Re), Re = -1) : A = !0, de(P, Te - H))) : (ie.sortIndex = Z, l(C, ie), z || k || (z = !0, Ne($))), ie;
    }, n.unstable_shouldYield = se, n.unstable_wrapCallback = function(ie) {
      var Se = D;
      return function() {
        var Te = D;
        D = Se;
        try {
          return ie.apply(this, arguments);
        } finally {
          D = Te;
        }
      };
    };
  })(t2)), t2;
}
var n2 = {};
var dC;
function T4() {
  return dC || (dC = 1, (function(n) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var l = !1, s = 5;
      function d(xe, je) {
        var dt = xe.length;
        xe.push(je), p(xe, je, dt);
      }
      function h(xe) {
        return xe.length === 0 ? null : xe[0];
      }
      function m(xe) {
        if (xe.length === 0)
          return null;
        var je = xe[0], dt = xe.pop();
        return dt !== je && (xe[0] = dt, E(xe, dt, 0)), je;
      }
      function p(xe, je, dt) {
        for (var Et = dt; Et > 0; ) {
          var Tt = Et - 1 >>> 1, Zt = xe[Tt];
          if (C(Zt, je) > 0)
            xe[Tt] = je, xe[Et] = Zt, Et = Tt;
          else
            return;
        }
      }
      function E(xe, je, dt) {
        for (var Et = dt, Tt = xe.length, Zt = Tt >>> 1; Et < Zt; ) {
          var Qt = (Et + 1) * 2 - 1, Cn = xe[Qt], Wt = Qt + 1, tn = xe[Wt];
          if (C(Cn, je) < 0)
            Wt < Tt && C(tn, Cn) < 0 ? (xe[Et] = tn, xe[Wt] = je, Et = Wt) : (xe[Et] = Cn, xe[Qt] = je, Et = Qt);
          else if (Wt < Tt && C(tn, je) < 0)
            xe[Et] = tn, xe[Wt] = je, Et = Wt;
          else
            return;
        }
      }
      function C(xe, je) {
        var dt = xe.sortIndex - je.sortIndex;
        return dt !== 0 ? dt : xe.id - je.id;
      }
      var T = 1, b = 2, R = 3, D = 4, k = 5;
      function z(xe, je) {
      }
      var A = typeof performance == "object" && typeof performance.now == "function";
      if (A) {
        var N = performance;
        n.unstable_now = function() {
          return N.now();
        };
      } else {
        var X = Date, K = X.now();
        n.unstable_now = function() {
          return X.now() - K;
        };
      }
      var Y = 1073741823, P = -1, $ = 250, Q = 5e3, re = 1e4, Re = Y, he = [], G = [], se = 1, fe = null, ae = R, q = !1, we = !1, Ne = !1, de = typeof setTimeout == "function" ? setTimeout : null, ie = typeof clearTimeout == "function" ? clearTimeout : null, Se = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function Te(xe) {
        for (var je = h(G); je !== null; ) {
          if (je.callback === null)
            m(G);
          else if (je.startTime <= xe)
            m(G), je.sortIndex = je.expirationTime, d(he, je);
          else
            return;
          je = h(G);
        }
      }
      function H(xe) {
        if (Ne = !1, Te(xe), !we)
          if (h(he) !== null)
            we = !0, $e(Z);
          else {
            var je = h(G);
            je !== null && cn(H, je.startTime - xe);
          }
      }
      function Z(xe, je) {
        we = !1, Ne && (Ne = !1, Rn()), q = !0;
        var dt = ae;
        try {
          var Et;
          if (!l) return De(xe, je);
        } finally {
          fe = null, ae = dt, q = !1;
        }
      }
      function De(xe, je) {
        var dt = je;
        for (Te(dt), fe = h(he); fe !== null && !(fe.expirationTime > dt && (!xe || Fe())); ) {
          var Et = fe.callback;
          if (typeof Et == "function") {
            fe.callback = null, ae = fe.priorityLevel;
            var Tt = fe.expirationTime <= dt, Zt = Et(Tt);
            dt = n.unstable_now(), typeof Zt == "function" ? fe.callback = Zt : fe === h(he) && m(he), Te(dt);
          } else
            m(he);
          fe = h(he);
        }
        if (fe !== null)
          return !0;
        var Qt = h(G);
        return Qt !== null && cn(H, Qt.startTime - dt), !1;
      }
      function Me(xe, je) {
        switch (xe) {
          case T:
          case b:
          case R:
          case D:
          case k:
            break;
          default:
            xe = R;
        }
        var dt = ae;
        ae = xe;
        try {
          return je();
        } finally {
          ae = dt;
        }
      }
      function Qe(xe) {
        var je;
        switch (ae) {
          case T:
          case b:
          case R:
            je = R;
            break;
          default:
            je = ae;
            break;
        }
        var dt = ae;
        ae = je;
        try {
          return xe();
        } finally {
          ae = dt;
        }
      }
      function Ge(xe) {
        var je = ae;
        return function() {
          var dt = ae;
          ae = je;
          try {
            return xe.apply(this, arguments);
          } finally {
            ae = dt;
          }
        };
      }
      function Ie(xe, je, dt) {
        var Et = n.unstable_now(), Tt;
        if (typeof dt == "object" && dt !== null) {
          var Zt = dt.delay;
          typeof Zt == "number" && Zt > 0 ? Tt = Et + Zt : Tt = Et;
        } else
          Tt = Et;
        var Qt;
        switch (xe) {
          case T:
            Qt = P;
            break;
          case b:
            Qt = $;
            break;
          case k:
            Qt = Re;
            break;
          case D:
            Qt = re;
            break;
          case R:
          default:
            Qt = Q;
            break;
        }
        var Cn = Tt + Qt, Wt = {
          id: se++,
          callback: je,
          priorityLevel: xe,
          startTime: Tt,
          expirationTime: Cn,
          sortIndex: -1
        };
        return Tt > Et ? (Wt.sortIndex = Tt, d(G, Wt), h(he) === null && Wt === h(G) && (Ne ? Rn() : Ne = !0, cn(H, Tt - Et))) : (Wt.sortIndex = Cn, d(he, Wt), !we && !q && (we = !0, $e(Z))), Wt;
      }
      function qe() {
      }
      function Ye() {
        !we && !q && (we = !0, $e(Z));
      }
      function it() {
        return h(he);
      }
      function Ze(xe) {
        xe.callback = null;
      }
      function We() {
        return ae;
      }
      var Ue = !1, ve = null, Pe = -1, be = s, Be = -1;
      function Fe() {
        var xe = n.unstable_now() - Be;
        return !(xe < be);
      }
      function nt() {
      }
      function pt(xe) {
        if (xe < 0 || xe > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        xe > 0 ? be = Math.floor(1e3 / xe) : be = s;
      }
      var Xe = function() {
        if (ve !== null) {
          var xe = n.unstable_now();
          Be = xe;
          var je = !0, dt = !0;
          try {
            dt = ve(je, xe);
          } finally {
            dt ? gt() : (Ue = !1, ve = null);
          }
        } else
          Ue = !1;
      }, gt;
      if (typeof Se == "function")
        gt = function() {
          Se(Xe);
        };
      else if (typeof MessageChannel < "u") {
        var wt = new MessageChannel(), sn = wt.port2;
        wt.port1.onmessage = Xe, gt = function() {
          sn.postMessage(null);
        };
      } else
        gt = function() {
          de(Xe, 0);
        };
      function $e(xe) {
        ve = xe, Ue || (Ue = !0, gt());
      }
      function cn(xe, je) {
        Pe = de(function() {
          xe(n.unstable_now());
        }, je);
      }
      function Rn() {
        ie(Pe), Pe = -1;
      }
      var Mn = nt, _n = null;
      n.unstable_IdlePriority = k, n.unstable_ImmediatePriority = T, n.unstable_LowPriority = D, n.unstable_NormalPriority = R, n.unstable_Profiling = _n, n.unstable_UserBlockingPriority = b, n.unstable_cancelCallback = Ze, n.unstable_continueExecution = Ye, n.unstable_forceFrameRate = pt, n.unstable_getCurrentPriorityLevel = We, n.unstable_getFirstCallbackNode = it, n.unstable_next = Qe, n.unstable_pauseExecution = qe, n.unstable_requestPaint = Mn, n.unstable_runWithPriority = Me, n.unstable_scheduleCallback = Ie, n.unstable_shouldYield = Fe, n.unstable_wrapCallback = Ge, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(n2)), n2;
}
var vC;
function Qw() {
  return vC || (vC = 1, process.env.NODE_ENV === "production" ? Ry.exports = w4() : Ry.exports = T4()), Ry.exports;
}
var pC;
function R4() {
  if (pC) return Ni;
  pC = 1;
  var n = kp(), l = Qw();
  function s(r) {
    for (var a = "https://reactjs.org/docs/error-decoder.html?invariant=" + r, u = 1; u < arguments.length; u++) a += "&args[]=" + encodeURIComponent(arguments[u]);
    return "Minified React error #" + r + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var d = /* @__PURE__ */ new Set(), h = {};
  function m(r, a) {
    p(r, a), p(r + "Capture", a);
  }
  function p(r, a) {
    for (h[r] = a, r = 0; r < a.length; r++) d.add(a[r]);
  }
  var E = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), C = Object.prototype.hasOwnProperty, T = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, b = {}, R = {};
  function D(r) {
    return C.call(R, r) ? !0 : C.call(b, r) ? !1 : T.test(r) ? R[r] = !0 : (b[r] = !0, !1);
  }
  function k(r, a, u, f) {
    if (u !== null && u.type === 0) return !1;
    switch (typeof a) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return f ? !1 : u !== null ? !u.acceptsBooleans : (r = r.toLowerCase().slice(0, 5), r !== "data-" && r !== "aria-");
      default:
        return !1;
    }
  }
  function z(r, a, u, f) {
    if (a === null || typeof a > "u" || k(r, a, u, f)) return !0;
    if (f) return !1;
    if (u !== null) switch (u.type) {
      case 3:
        return !a;
      case 4:
        return a === !1;
      case 5:
        return isNaN(a);
      case 6:
        return isNaN(a) || 1 > a;
    }
    return !1;
  }
  function A(r, a, u, f, y, S, _) {
    this.acceptsBooleans = a === 2 || a === 3 || a === 4, this.attributeName = f, this.attributeNamespace = y, this.mustUseProperty = u, this.propertyName = r, this.type = a, this.sanitizeURL = S, this.removeEmptyString = _;
  }
  var N = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(r) {
    N[r] = new A(r, 0, !1, r, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(r) {
    var a = r[0];
    N[a] = new A(a, 1, !1, r[1], null, !1, !1);
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
  var X = /[\-:]([a-z])/g;
  function K(r) {
    return r[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(r) {
    var a = r.replace(
      X,
      K
    );
    N[a] = new A(a, 1, !1, r, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(r) {
    var a = r.replace(X, K);
    N[a] = new A(a, 1, !1, r, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(r) {
    var a = r.replace(X, K);
    N[a] = new A(a, 1, !1, r, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(r) {
    N[r] = new A(r, 1, !1, r.toLowerCase(), null, !1, !1);
  }), N.xlinkHref = new A("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(r) {
    N[r] = new A(r, 1, !1, r.toLowerCase(), null, !0, !0);
  });
  function Y(r, a, u, f) {
    var y = N.hasOwnProperty(a) ? N[a] : null;
    (y !== null ? y.type !== 0 : f || !(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (z(a, u, y, f) && (u = null), f || y === null ? D(a) && (u === null ? r.removeAttribute(a) : r.setAttribute(a, "" + u)) : y.mustUseProperty ? r[y.propertyName] = u === null ? y.type === 3 ? !1 : "" : u : (a = y.attributeName, f = y.attributeNamespace, u === null ? r.removeAttribute(a) : (y = y.type, u = y === 3 || y === 4 && u === !0 ? "" : "" + u, f ? r.setAttributeNS(f, a, u) : r.setAttribute(a, u))));
  }
  var P = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, $ = /* @__PURE__ */ Symbol.for("react.element"), Q = /* @__PURE__ */ Symbol.for("react.portal"), re = /* @__PURE__ */ Symbol.for("react.fragment"), Re = /* @__PURE__ */ Symbol.for("react.strict_mode"), he = /* @__PURE__ */ Symbol.for("react.profiler"), G = /* @__PURE__ */ Symbol.for("react.provider"), se = /* @__PURE__ */ Symbol.for("react.context"), fe = /* @__PURE__ */ Symbol.for("react.forward_ref"), ae = /* @__PURE__ */ Symbol.for("react.suspense"), q = /* @__PURE__ */ Symbol.for("react.suspense_list"), we = /* @__PURE__ */ Symbol.for("react.memo"), Ne = /* @__PURE__ */ Symbol.for("react.lazy"), de = /* @__PURE__ */ Symbol.for("react.offscreen"), ie = Symbol.iterator;
  function Se(r) {
    return r === null || typeof r != "object" ? null : (r = ie && r[ie] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var Te = Object.assign, H;
  function Z(r) {
    if (H === void 0) try {
      throw Error();
    } catch (u) {
      var a = u.stack.trim().match(/\n( *(at )?)/);
      H = a && a[1] || "";
    }
    return `
` + H + r;
  }
  var De = !1;
  function Me(r, a) {
    if (!r || De) return "";
    De = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (a) if (a = function() {
        throw Error();
      }, Object.defineProperty(a.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(a, []);
        } catch (ue) {
          var f = ue;
        }
        Reflect.construct(r, [], a);
      } else {
        try {
          a.call();
        } catch (ue) {
          f = ue;
        }
        r.call(a.prototype);
      }
      else {
        try {
          throw Error();
        } catch (ue) {
          f = ue;
        }
        r();
      }
    } catch (ue) {
      if (ue && f && typeof ue.stack == "string") {
        for (var y = ue.stack.split(`
`), S = f.stack.split(`
`), _ = y.length - 1, U = S.length - 1; 1 <= _ && 0 <= U && y[_] !== S[U]; ) U--;
        for (; 1 <= _ && 0 <= U; _--, U--) if (y[_] !== S[U]) {
          if (_ !== 1 || U !== 1)
            do
              if (_--, U--, 0 > U || y[_] !== S[U]) {
                var V = `
` + y[_].replace(" at new ", " at ");
                return r.displayName && V.includes("<anonymous>") && (V = V.replace("<anonymous>", r.displayName)), V;
              }
            while (1 <= _ && 0 <= U);
          break;
        }
      }
    } finally {
      De = !1, Error.prepareStackTrace = u;
    }
    return (r = r ? r.displayName || r.name : "") ? Z(r) : "";
  }
  function Qe(r) {
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
        return r = Me(r.type, !1), r;
      case 11:
        return r = Me(r.type.render, !1), r;
      case 1:
        return r = Me(r.type, !0), r;
      default:
        return "";
    }
  }
  function Ge(r) {
    if (r == null) return null;
    if (typeof r == "function") return r.displayName || r.name || null;
    if (typeof r == "string") return r;
    switch (r) {
      case re:
        return "Fragment";
      case Q:
        return "Portal";
      case he:
        return "Profiler";
      case Re:
        return "StrictMode";
      case ae:
        return "Suspense";
      case q:
        return "SuspenseList";
    }
    if (typeof r == "object") switch (r.$$typeof) {
      case se:
        return (r.displayName || "Context") + ".Consumer";
      case G:
        return (r._context.displayName || "Context") + ".Provider";
      case fe:
        var a = r.render;
        return r = r.displayName, r || (r = a.displayName || a.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
      case we:
        return a = r.displayName || null, a !== null ? a : Ge(r.type) || "Memo";
      case Ne:
        a = r._payload, r = r._init;
        try {
          return Ge(r(a));
        } catch {
        }
    }
    return null;
  }
  function Ie(r) {
    var a = r.type;
    switch (r.tag) {
      case 24:
        return "Cache";
      case 9:
        return (a.displayName || "Context") + ".Consumer";
      case 10:
        return (a._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return r = a.render, r = r.displayName || r.name || "", a.displayName || (r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return a;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Ge(a);
      case 8:
        return a === Re ? "StrictMode" : "Mode";
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
        if (typeof a == "function") return a.displayName || a.name || null;
        if (typeof a == "string") return a;
    }
    return null;
  }
  function qe(r) {
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
    var a = r.type;
    return (r = r.nodeName) && r.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
  }
  function it(r) {
    var a = Ye(r) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(r.constructor.prototype, a), f = "" + r[a];
    if (!r.hasOwnProperty(a) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var y = u.get, S = u.set;
      return Object.defineProperty(r, a, { configurable: !0, get: function() {
        return y.call(this);
      }, set: function(_) {
        f = "" + _, S.call(this, _);
      } }), Object.defineProperty(r, a, { enumerable: u.enumerable }), { getValue: function() {
        return f;
      }, setValue: function(_) {
        f = "" + _;
      }, stopTracking: function() {
        r._valueTracker = null, delete r[a];
      } };
    }
  }
  function Ze(r) {
    r._valueTracker || (r._valueTracker = it(r));
  }
  function We(r) {
    if (!r) return !1;
    var a = r._valueTracker;
    if (!a) return !0;
    var u = a.getValue(), f = "";
    return r && (f = Ye(r) ? r.checked ? "true" : "false" : r.value), r = f, r !== u ? (a.setValue(r), !0) : !1;
  }
  function Ue(r) {
    if (r = r || (typeof document < "u" ? document : void 0), typeof r > "u") return null;
    try {
      return r.activeElement || r.body;
    } catch {
      return r.body;
    }
  }
  function ve(r, a) {
    var u = a.checked;
    return Te({}, a, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: u ?? r._wrapperState.initialChecked });
  }
  function Pe(r, a) {
    var u = a.defaultValue == null ? "" : a.defaultValue, f = a.checked != null ? a.checked : a.defaultChecked;
    u = qe(a.value != null ? a.value : u), r._wrapperState = { initialChecked: f, initialValue: u, controlled: a.type === "checkbox" || a.type === "radio" ? a.checked != null : a.value != null };
  }
  function be(r, a) {
    a = a.checked, a != null && Y(r, "checked", a, !1);
  }
  function Be(r, a) {
    be(r, a);
    var u = qe(a.value), f = a.type;
    if (u != null) f === "number" ? (u === 0 && r.value === "" || r.value != u) && (r.value = "" + u) : r.value !== "" + u && (r.value = "" + u);
    else if (f === "submit" || f === "reset") {
      r.removeAttribute("value");
      return;
    }
    a.hasOwnProperty("value") ? nt(r, a.type, u) : a.hasOwnProperty("defaultValue") && nt(r, a.type, qe(a.defaultValue)), a.checked == null && a.defaultChecked != null && (r.defaultChecked = !!a.defaultChecked);
  }
  function Fe(r, a, u) {
    if (a.hasOwnProperty("value") || a.hasOwnProperty("defaultValue")) {
      var f = a.type;
      if (!(f !== "submit" && f !== "reset" || a.value !== void 0 && a.value !== null)) return;
      a = "" + r._wrapperState.initialValue, u || a === r.value || (r.value = a), r.defaultValue = a;
    }
    u = r.name, u !== "" && (r.name = ""), r.defaultChecked = !!r._wrapperState.initialChecked, u !== "" && (r.name = u);
  }
  function nt(r, a, u) {
    (a !== "number" || Ue(r.ownerDocument) !== r) && (u == null ? r.defaultValue = "" + r._wrapperState.initialValue : r.defaultValue !== "" + u && (r.defaultValue = "" + u));
  }
  var pt = Array.isArray;
  function Xe(r, a, u, f) {
    if (r = r.options, a) {
      a = {};
      for (var y = 0; y < u.length; y++) a["$" + u[y]] = !0;
      for (u = 0; u < r.length; u++) y = a.hasOwnProperty("$" + r[u].value), r[u].selected !== y && (r[u].selected = y), y && f && (r[u].defaultSelected = !0);
    } else {
      for (u = "" + qe(u), a = null, y = 0; y < r.length; y++) {
        if (r[y].value === u) {
          r[y].selected = !0, f && (r[y].defaultSelected = !0);
          return;
        }
        a !== null || r[y].disabled || (a = r[y]);
      }
      a !== null && (a.selected = !0);
    }
  }
  function gt(r, a) {
    if (a.dangerouslySetInnerHTML != null) throw Error(s(91));
    return Te({}, a, { value: void 0, defaultValue: void 0, children: "" + r._wrapperState.initialValue });
  }
  function wt(r, a) {
    var u = a.value;
    if (u == null) {
      if (u = a.children, a = a.defaultValue, u != null) {
        if (a != null) throw Error(s(92));
        if (pt(u)) {
          if (1 < u.length) throw Error(s(93));
          u = u[0];
        }
        a = u;
      }
      a == null && (a = ""), u = a;
    }
    r._wrapperState = { initialValue: qe(u) };
  }
  function sn(r, a) {
    var u = qe(a.value), f = qe(a.defaultValue);
    u != null && (u = "" + u, u !== r.value && (r.value = u), a.defaultValue == null && r.defaultValue !== u && (r.defaultValue = u)), f != null && (r.defaultValue = "" + f);
  }
  function $e(r) {
    var a = r.textContent;
    a === r._wrapperState.initialValue && a !== "" && a !== null && (r.value = a);
  }
  function cn(r) {
    switch (r) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Rn(r, a) {
    return r == null || r === "http://www.w3.org/1999/xhtml" ? cn(a) : r === "http://www.w3.org/2000/svg" && a === "foreignObject" ? "http://www.w3.org/1999/xhtml" : r;
  }
  var Mn, _n = (function(r) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(a, u, f, y) {
      MSApp.execUnsafeLocalFunction(function() {
        return r(a, u, f, y);
      });
    } : r;
  })(function(r, a) {
    if (r.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in r) r.innerHTML = a;
    else {
      for (Mn = Mn || document.createElement("div"), Mn.innerHTML = "<svg>" + a.valueOf().toString() + "</svg>", a = Mn.firstChild; r.firstChild; ) r.removeChild(r.firstChild);
      for (; a.firstChild; ) r.appendChild(a.firstChild);
    }
  });
  function xe(r, a) {
    if (a) {
      var u = r.firstChild;
      if (u && u === r.lastChild && u.nodeType === 3) {
        u.nodeValue = a;
        return;
      }
    }
    r.textContent = a;
  }
  var je = {
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
  }, dt = ["Webkit", "ms", "Moz", "O"];
  Object.keys(je).forEach(function(r) {
    dt.forEach(function(a) {
      a = a + r.charAt(0).toUpperCase() + r.substring(1), je[a] = je[r];
    });
  });
  function Et(r, a, u) {
    return a == null || typeof a == "boolean" || a === "" ? "" : u || typeof a != "number" || a === 0 || je.hasOwnProperty(r) && je[r] ? ("" + a).trim() : a + "px";
  }
  function Tt(r, a) {
    r = r.style;
    for (var u in a) if (a.hasOwnProperty(u)) {
      var f = u.indexOf("--") === 0, y = Et(u, a[u], f);
      u === "float" && (u = "cssFloat"), f ? r.setProperty(u, y) : r[u] = y;
    }
  }
  var Zt = Te({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Qt(r, a) {
    if (a) {
      if (Zt[r] && (a.children != null || a.dangerouslySetInnerHTML != null)) throw Error(s(137, r));
      if (a.dangerouslySetInnerHTML != null) {
        if (a.children != null) throw Error(s(60));
        if (typeof a.dangerouslySetInnerHTML != "object" || !("__html" in a.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (a.style != null && typeof a.style != "object") throw Error(s(62));
    }
  }
  function Cn(r, a) {
    if (r.indexOf("-") === -1) return typeof a.is == "string";
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
  var Wt = null;
  function tn(r) {
    return r = r.target || r.srcElement || window, r.correspondingUseElement && (r = r.correspondingUseElement), r.nodeType === 3 ? r.parentNode : r;
  }
  var nn = null, An = null, xt = null;
  function rn(r) {
    if (r = Dt(r)) {
      if (typeof nn != "function") throw Error(s(280));
      var a = r.stateNode;
      a && (a = hr(a), nn(r.stateNode, r.type, a));
    }
  }
  function vn(r) {
    An ? xt ? xt.push(r) : xt = [r] : An = r;
  }
  function hn() {
    if (An) {
      var r = An, a = xt;
      if (xt = An = null, rn(r), a) for (r = 0; r < a.length; r++) rn(a[r]);
    }
  }
  function Nn(r, a) {
    return r(a);
  }
  function bn() {
  }
  var Gt = !1;
  function wn(r, a, u) {
    if (Gt) return r(a, u);
    Gt = !0;
    try {
      return Nn(r, a, u);
    } finally {
      Gt = !1, (An !== null || xt !== null) && (bn(), hn());
    }
  }
  function Xt(r, a) {
    var u = r.stateNode;
    if (u === null) return null;
    var f = hr(u);
    if (f === null) return null;
    u = f[a];
    e: switch (a) {
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
        (f = !f.disabled) || (r = r.type, f = !(r === "button" || r === "input" || r === "select" || r === "textarea")), r = !f;
        break e;
      default:
        r = !1;
    }
    if (r) return null;
    if (u && typeof u != "function") throw Error(s(231, a, typeof u));
    return u;
  }
  var Kt = !1;
  if (E) try {
    var an = {};
    Object.defineProperty(an, "passive", { get: function() {
      Kt = !0;
    } }), window.addEventListener("test", an, an), window.removeEventListener("test", an, an);
  } catch {
    Kt = !1;
  }
  function ln(r, a, u, f, y, S, _, U, V) {
    var ue = Array.prototype.slice.call(arguments, 3);
    try {
      a.apply(u, ue);
    } catch (Oe) {
      this.onError(Oe);
    }
  }
  var Qn = !1, ar = null, jn = !1, j = null, Ee = { onError: function(r) {
    Qn = !0, ar = r;
  } };
  function pe(r, a, u, f, y, S, _, U, V) {
    Qn = !1, ar = null, ln.apply(Ee, arguments);
  }
  function He(r, a, u, f, y, S, _, U, V) {
    if (pe.apply(this, arguments), Qn) {
      if (Qn) {
        var ue = ar;
        Qn = !1, ar = null;
      } else throw Error(s(198));
      jn || (jn = !0, j = ue);
    }
  }
  function vt(r) {
    var a = r, u = r;
    if (r.alternate) for (; a.return; ) a = a.return;
    else {
      r = a;
      do
        a = r, (a.flags & 4098) !== 0 && (u = a.return), r = a.return;
      while (r);
    }
    return a.tag === 3 ? u : null;
  }
  function ct(r) {
    if (r.tag === 13) {
      var a = r.memoizedState;
      if (a === null && (r = r.alternate, r !== null && (a = r.memoizedState)), a !== null) return a.dehydrated;
    }
    return null;
  }
  function ft(r) {
    if (vt(r) !== r) throw Error(s(188));
  }
  function rt(r) {
    var a = r.alternate;
    if (!a) {
      if (a = vt(r), a === null) throw Error(s(188));
      return a !== r ? null : r;
    }
    for (var u = r, f = a; ; ) {
      var y = u.return;
      if (y === null) break;
      var S = y.alternate;
      if (S === null) {
        if (f = y.return, f !== null) {
          u = f;
          continue;
        }
        break;
      }
      if (y.child === S.child) {
        for (S = y.child; S; ) {
          if (S === u) return ft(y), r;
          if (S === f) return ft(y), a;
          S = S.sibling;
        }
        throw Error(s(188));
      }
      if (u.return !== f.return) u = y, f = S;
      else {
        for (var _ = !1, U = y.child; U; ) {
          if (U === u) {
            _ = !0, u = y, f = S;
            break;
          }
          if (U === f) {
            _ = !0, f = y, u = S;
            break;
          }
          U = U.sibling;
        }
        if (!_) {
          for (U = S.child; U; ) {
            if (U === u) {
              _ = !0, u = S, f = y;
              break;
            }
            if (U === f) {
              _ = !0, f = S, u = y;
              break;
            }
            U = U.sibling;
          }
          if (!_) throw Error(s(189));
        }
      }
      if (u.alternate !== f) throw Error(s(190));
    }
    if (u.tag !== 3) throw Error(s(188));
    return u.stateNode.current === u ? r : a;
  }
  function Lt(r) {
    return r = rt(r), r !== null ? At(r) : null;
  }
  function At(r) {
    if (r.tag === 5 || r.tag === 6) return r;
    for (r = r.child; r !== null; ) {
      var a = At(r);
      if (a !== null) return a;
      r = r.sibling;
    }
    return null;
  }
  var zt = l.unstable_scheduleCallback, Nt = l.unstable_cancelCallback, Fn = l.unstable_shouldYield, Gn = l.unstable_requestPaint, Rt = l.unstable_now, $t = l.unstable_getCurrentPriorityLevel, qt = l.unstable_ImmediatePriority, kt = l.unstable_UserBlockingPriority, gn = l.unstable_NormalPriority, mn = l.unstable_LowPriority, Sr = l.unstable_IdlePriority, ir = null, Xn = null;
  function Oo(r) {
    if (Xn && typeof Xn.onCommitFiberRoot == "function") try {
      Xn.onCommitFiberRoot(ir, r, void 0, (r.current.flags & 128) === 128);
    } catch {
    }
  }
  var Kr = Math.clz32 ? Math.clz32 : Ql, wu = Math.log, Tu = Math.LN2;
  function Ql(r) {
    return r >>>= 0, r === 0 ? 32 : 31 - (wu(r) / Tu | 0) | 0;
  }
  var Gi = 64, Ea = 4194304;
  function Ja(r) {
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
  function ei(r, a) {
    var u = r.pendingLanes;
    if (u === 0) return 0;
    var f = 0, y = r.suspendedLanes, S = r.pingedLanes, _ = u & 268435455;
    if (_ !== 0) {
      var U = _ & ~y;
      U !== 0 ? f = Ja(U) : (S &= _, S !== 0 && (f = Ja(S)));
    } else _ = u & ~y, _ !== 0 ? f = Ja(_) : S !== 0 && (f = Ja(S));
    if (f === 0) return 0;
    if (a !== 0 && a !== f && (a & y) === 0 && (y = f & -f, S = a & -a, y >= S || y === 16 && (S & 4194240) !== 0)) return a;
    if ((f & 4) !== 0 && (f |= u & 16), a = r.entangledLanes, a !== 0) for (r = r.entanglements, a &= f; 0 < a; ) u = 31 - Kr(a), y = 1 << u, f |= r[u], a &= ~y;
    return f;
  }
  function da(r, a) {
    switch (r) {
      case 1:
      case 2:
      case 4:
        return a + 250;
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
        return a + 5e3;
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
  function Zr(r, a) {
    for (var u = r.suspendedLanes, f = r.pingedLanes, y = r.expirationTimes, S = r.pendingLanes; 0 < S; ) {
      var _ = 31 - Kr(S), U = 1 << _, V = y[_];
      V === -1 ? ((U & u) === 0 || (U & f) !== 0) && (y[_] = da(U, a)) : V <= a && (r.expiredLanes |= U), S &= ~U;
    }
  }
  function va(r) {
    return r = r.pendingLanes & -1073741825, r !== 0 ? r : r & 1073741824 ? 1073741824 : 0;
  }
  function Ua() {
    var r = Gi;
    return Gi <<= 1, (Gi & 4194240) === 0 && (Gi = 64), r;
  }
  function mi(r) {
    for (var a = [], u = 0; 31 > u; u++) a.push(r);
    return a;
  }
  function Ca(r, a, u) {
    r.pendingLanes |= a, a !== 536870912 && (r.suspendedLanes = 0, r.pingedLanes = 0), r = r.eventTimes, a = 31 - Kr(a), r[a] = u;
  }
  function ti(r, a) {
    var u = r.pendingLanes & ~a;
    r.pendingLanes = a, r.suspendedLanes = 0, r.pingedLanes = 0, r.expiredLanes &= a, r.mutableReadLanes &= a, r.entangledLanes &= a, a = r.entanglements;
    var f = r.eventTimes;
    for (r = r.expirationTimes; 0 < u; ) {
      var y = 31 - Kr(u), S = 1 << y;
      a[y] = 0, f[y] = -1, r[y] = -1, u &= ~S;
    }
  }
  function Dr(r, a) {
    var u = r.entangledLanes |= a;
    for (r = r.entanglements; u; ) {
      var f = 31 - Kr(u), y = 1 << f;
      y & a | r[f] & a && (r[f] |= a), u &= ~y;
    }
  }
  var Sn = 0;
  function pa(r) {
    return r &= -r, 1 < r ? 4 < r ? (r & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var on, Xi, fn, Vt, Ki, Tr = !1, ni = [], Er = null, Cr = null, Kn = null, Hn = /* @__PURE__ */ new Map(), yi = /* @__PURE__ */ new Map(), vr = [], ha = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function wa(r, a) {
    switch (r) {
      case "focusin":
      case "focusout":
        Er = null;
        break;
      case "dragenter":
      case "dragleave":
        Cr = null;
        break;
      case "mouseover":
      case "mouseout":
        Kn = null;
        break;
      case "pointerover":
      case "pointerout":
        Hn.delete(a.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        yi.delete(a.pointerId);
    }
  }
  function zo(r, a, u, f, y, S) {
    return r === null || r.nativeEvent !== S ? (r = { blockedOn: a, domEventName: u, eventSystemFlags: f, nativeEvent: S, targetContainers: [y] }, a !== null && (a = Dt(a), a !== null && Xi(a)), r) : (r.eventSystemFlags |= f, a = r.targetContainers, y !== null && a.indexOf(y) === -1 && a.push(y), r);
  }
  function ms(r, a, u, f, y) {
    switch (a) {
      case "focusin":
        return Er = zo(Er, r, a, u, f, y), !0;
      case "dragenter":
        return Cr = zo(Cr, r, a, u, f, y), !0;
      case "mouseover":
        return Kn = zo(Kn, r, a, u, f, y), !0;
      case "pointerover":
        var S = y.pointerId;
        return Hn.set(S, zo(Hn.get(S) || null, r, a, u, f, y)), !0;
      case "gotpointercapture":
        return S = y.pointerId, yi.set(S, zo(yi.get(S) || null, r, a, u, f, y)), !0;
    }
    return !1;
  }
  function ys(r) {
    var a = $o(r.target);
    if (a !== null) {
      var u = vt(a);
      if (u !== null) {
        if (a = u.tag, a === 13) {
          if (a = ct(u), a !== null) {
            r.blockedOn = a, Ki(r.priority, function() {
              fn(u);
            });
            return;
          }
        } else if (a === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          r.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    r.blockedOn = null;
  }
  function Gl(r) {
    if (r.blockedOn !== null) return !1;
    for (var a = r.targetContainers; 0 < a.length; ) {
      var u = xu(r.domEventName, r.eventSystemFlags, a[0], r.nativeEvent);
      if (u === null) {
        u = r.nativeEvent;
        var f = new u.constructor(u.type, u);
        Wt = f, u.target.dispatchEvent(f), Wt = null;
      } else return a = Dt(u), a !== null && Xi(a), r.blockedOn = u, !1;
      a.shift();
    }
    return !0;
  }
  function Lo(r, a, u) {
    Gl(r) && u.delete(a);
  }
  function Ed() {
    Tr = !1, Er !== null && Gl(Er) && (Er = null), Cr !== null && Gl(Cr) && (Cr = null), Kn !== null && Gl(Kn) && (Kn = null), Hn.forEach(Lo), yi.forEach(Lo);
  }
  function gi(r, a) {
    r.blockedOn === a && (r.blockedOn = null, Tr || (Tr = !0, l.unstable_scheduleCallback(l.unstable_NormalPriority, Ed)));
  }
  function ji(r) {
    function a(y) {
      return gi(y, r);
    }
    if (0 < ni.length) {
      gi(ni[0], r);
      for (var u = 1; u < ni.length; u++) {
        var f = ni[u];
        f.blockedOn === r && (f.blockedOn = null);
      }
    }
    for (Er !== null && gi(Er, r), Cr !== null && gi(Cr, r), Kn !== null && gi(Kn, r), Hn.forEach(a), yi.forEach(a), u = 0; u < vr.length; u++) f = vr[u], f.blockedOn === r && (f.blockedOn = null);
    for (; 0 < vr.length && (u = vr[0], u.blockedOn === null); ) ys(u), u.blockedOn === null && vr.shift();
  }
  var Zi = P.ReactCurrentBatchConfig, Si = !0;
  function Ru(r, a, u, f) {
    var y = Sn, S = Zi.transition;
    Zi.transition = null;
    try {
      Sn = 1, Xl(r, a, u, f);
    } finally {
      Sn = y, Zi.transition = S;
    }
  }
  function bu(r, a, u, f) {
    var y = Sn, S = Zi.transition;
    Zi.transition = null;
    try {
      Sn = 4, Xl(r, a, u, f);
    } finally {
      Sn = y, Zi.transition = S;
    }
  }
  function Xl(r, a, u, f) {
    if (Si) {
      var y = xu(r, a, u, f);
      if (y === null) Vc(r, a, f, Ao, u), wa(r, f);
      else if (ms(y, r, a, u, f)) f.stopPropagation();
      else if (wa(r, f), a & 4 && -1 < ha.indexOf(r)) {
        for (; y !== null; ) {
          var S = Dt(y);
          if (S !== null && on(S), S = xu(r, a, u, f), S === null && Vc(r, a, f, Ao, u), S === y) break;
          y = S;
        }
        y !== null && f.stopPropagation();
      } else Vc(r, a, f, null, u);
    }
  }
  var Ao = null;
  function xu(r, a, u, f) {
    if (Ao = null, r = tn(f), r = $o(r), r !== null) if (a = vt(r), a === null) r = null;
    else if (u = a.tag, u === 13) {
      if (r = ct(a), r !== null) return r;
      r = null;
    } else if (u === 3) {
      if (a.stateNode.current.memoizedState.isDehydrated) return a.tag === 3 ? a.stateNode.containerInfo : null;
      r = null;
    } else a !== r && (r = null);
    return Ao = r, null;
  }
  function Mu(r) {
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
        switch ($t()) {
          case qt:
            return 1;
          case kt:
            return 4;
          case gn:
          case mn:
            return 16;
          case Sr:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Fi = null, M = null, F = null;
  function oe() {
    if (F) return F;
    var r, a = M, u = a.length, f, y = "value" in Fi ? Fi.value : Fi.textContent, S = y.length;
    for (r = 0; r < u && a[r] === y[r]; r++) ;
    var _ = u - r;
    for (f = 1; f <= _ && a[u - f] === y[S - f]; f++) ;
    return F = y.slice(r, 1 < f ? 1 - f : void 0);
  }
  function me(r) {
    var a = r.keyCode;
    return "charCode" in r ? (r = r.charCode, r === 0 && a === 13 && (r = 13)) : r = a, r === 10 && (r = 13), 32 <= r || r === 13 ? r : 0;
  }
  function Ve() {
    return !0;
  }
  function Ut() {
    return !1;
  }
  function Je(r) {
    function a(u, f, y, S, _) {
      this._reactName = u, this._targetInst = y, this.type = f, this.nativeEvent = S, this.target = _, this.currentTarget = null;
      for (var U in r) r.hasOwnProperty(U) && (u = r[U], this[U] = u ? u(S) : S[U]);
      return this.isDefaultPrevented = (S.defaultPrevented != null ? S.defaultPrevented : S.returnValue === !1) ? Ve : Ut, this.isPropagationStopped = Ut, this;
    }
    return Te(a.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Ve);
    }, stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Ve);
    }, persist: function() {
    }, isPersistent: Ve }), a;
  }
  var Ht = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(r) {
    return r.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, yn = Je(Ht), Ln = Te({}, Ht, { view: 0, detail: 0 }), lr = Je(Ln), Zn, dn, Jn, pr = Te({}, Ln, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: bd, button: 0, buttons: 0, relatedTarget: function(r) {
    return r.relatedTarget === void 0 ? r.fromElement === r.srcElement ? r.toElement : r.fromElement : r.relatedTarget;
  }, movementX: function(r) {
    return "movementX" in r ? r.movementX : (r !== Jn && (Jn && r.type === "mousemove" ? (Zn = r.screenX - Jn.screenX, dn = r.screenY - Jn.screenY) : dn = Zn = 0, Jn = r), Zn);
  }, movementY: function(r) {
    return "movementY" in r ? r.movementY : dn;
  } }), Kl = Je(pr), gs = Te({}, pr, { dataTransfer: 0 }), wl = Je(gs), Ss = Te({}, Ln, { relatedTarget: 0 }), No = Je(Ss), Cd = Te({}, Ht, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Oc = Je(Cd), wd = Te({}, Ht, { clipboardData: function(r) {
    return "clipboardData" in r ? r.clipboardData : window.clipboardData;
  } }), Dp = Je(wd), Td = Te({}, Ht, { data: 0 }), Rd = Je(Td), Op = {
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
  }, zp = {
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
  }, Uy = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Tl(r) {
    var a = this.nativeEvent;
    return a.getModifierState ? a.getModifierState(r) : (r = Uy[r]) ? !!a[r] : !1;
  }
  function bd() {
    return Tl;
  }
  var xd = Te({}, Ln, { key: function(r) {
    if (r.key) {
      var a = Op[r.key] || r.key;
      if (a !== "Unidentified") return a;
    }
    return r.type === "keypress" ? (r = me(r), r === 13 ? "Enter" : String.fromCharCode(r)) : r.type === "keydown" || r.type === "keyup" ? zp[r.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: bd, charCode: function(r) {
    return r.type === "keypress" ? me(r) : 0;
  }, keyCode: function(r) {
    return r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  }, which: function(r) {
    return r.type === "keypress" ? me(r) : r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  } }), Md = Je(xd), _d = Te({}, pr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Lp = Je(_d), zc = Te({}, Ln, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: bd }), Ap = Je(zc), ja = Te({}, Ht, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Rl = Je(ja), Or = Te({}, pr, {
    deltaX: function(r) {
      return "deltaX" in r ? r.deltaX : "wheelDeltaX" in r ? -r.wheelDeltaX : 0;
    },
    deltaY: function(r) {
      return "deltaY" in r ? r.deltaY : "wheelDeltaY" in r ? -r.wheelDeltaY : "wheelDelta" in r ? -r.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), bl = Je(Or), kd = [9, 13, 27, 32], _u = E && "CompositionEvent" in window, Es = null;
  E && "documentMode" in document && (Es = document.documentMode);
  var Cs = E && "TextEvent" in window && !Es, Np = E && (!_u || Es && 8 < Es && 11 >= Es), Up = " ", Lc = !1;
  function jp(r, a) {
    switch (r) {
      case "keyup":
        return kd.indexOf(a.keyCode) !== -1;
      case "keydown":
        return a.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Fp(r) {
    return r = r.detail, typeof r == "object" && "data" in r ? r.data : null;
  }
  var ku = !1;
  function Hp(r, a) {
    switch (r) {
      case "compositionend":
        return Fp(a);
      case "keypress":
        return a.which !== 32 ? null : (Lc = !0, Up);
      case "textInput":
        return r = a.data, r === Up && Lc ? null : r;
      default:
        return null;
    }
  }
  function jy(r, a) {
    if (ku) return r === "compositionend" || !_u && jp(r, a) ? (r = oe(), F = M = Fi = null, ku = !1, r) : null;
    switch (r) {
      case "paste":
        return null;
      case "keypress":
        if (!(a.ctrlKey || a.altKey || a.metaKey) || a.ctrlKey && a.altKey) {
          if (a.char && 1 < a.char.length) return a.char;
          if (a.which) return String.fromCharCode(a.which);
        }
        return null;
      case "compositionend":
        return Np && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var Fy = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Pp(r) {
    var a = r && r.nodeName && r.nodeName.toLowerCase();
    return a === "input" ? !!Fy[r.type] : a === "textarea";
  }
  function Dd(r, a, u, f) {
    vn(f), a = Ms(a, "onChange"), 0 < a.length && (u = new yn("onChange", "change", null, u, f), r.push({ event: u, listeners: a }));
  }
  var Ji = null, Uo = null;
  function $p(r) {
    Ho(r, 0);
  }
  function ws(r) {
    var a = Pi(r);
    if (We(a)) return r;
  }
  function Hy(r, a) {
    if (r === "change") return a;
  }
  var Vp = !1;
  if (E) {
    var Od;
    if (E) {
      var zd = "oninput" in document;
      if (!zd) {
        var qp = document.createElement("div");
        qp.setAttribute("oninput", "return;"), zd = typeof qp.oninput == "function";
      }
      Od = zd;
    } else Od = !1;
    Vp = Od && (!document.documentMode || 9 < document.documentMode);
  }
  function Ip() {
    Ji && (Ji.detachEvent("onpropertychange", Yp), Uo = Ji = null);
  }
  function Yp(r) {
    if (r.propertyName === "value" && ws(Uo)) {
      var a = [];
      Dd(a, Uo, r, tn(r)), wn($p, a);
    }
  }
  function Py(r, a, u) {
    r === "focusin" ? (Ip(), Ji = a, Uo = u, Ji.attachEvent("onpropertychange", Yp)) : r === "focusout" && Ip();
  }
  function Wp(r) {
    if (r === "selectionchange" || r === "keyup" || r === "keydown") return ws(Uo);
  }
  function $y(r, a) {
    if (r === "click") return ws(a);
  }
  function Bp(r, a) {
    if (r === "input" || r === "change") return ws(a);
  }
  function Vy(r, a) {
    return r === a && (r !== 0 || 1 / r === 1 / a) || r !== r && a !== a;
  }
  var Hi = typeof Object.is == "function" ? Object.is : Vy;
  function Ts(r, a) {
    if (Hi(r, a)) return !0;
    if (typeof r != "object" || r === null || typeof a != "object" || a === null) return !1;
    var u = Object.keys(r), f = Object.keys(a);
    if (u.length !== f.length) return !1;
    for (f = 0; f < u.length; f++) {
      var y = u[f];
      if (!C.call(a, y) || !Hi(r[y], a[y])) return !1;
    }
    return !0;
  }
  function Qp(r) {
    for (; r && r.firstChild; ) r = r.firstChild;
    return r;
  }
  function Ac(r, a) {
    var u = Qp(r);
    r = 0;
    for (var f; u; ) {
      if (u.nodeType === 3) {
        if (f = r + u.textContent.length, r <= a && f >= a) return { node: u, offset: a - r };
        r = f;
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
      u = Qp(u);
    }
  }
  function Zl(r, a) {
    return r && a ? r === a ? !0 : r && r.nodeType === 3 ? !1 : a && a.nodeType === 3 ? Zl(r, a.parentNode) : "contains" in r ? r.contains(a) : r.compareDocumentPosition ? !!(r.compareDocumentPosition(a) & 16) : !1 : !1;
  }
  function Rs() {
    for (var r = window, a = Ue(); a instanceof r.HTMLIFrameElement; ) {
      try {
        var u = typeof a.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) r = a.contentWindow;
      else break;
      a = Ue(r.document);
    }
    return a;
  }
  function Nc(r) {
    var a = r && r.nodeName && r.nodeName.toLowerCase();
    return a && (a === "input" && (r.type === "text" || r.type === "search" || r.type === "tel" || r.type === "url" || r.type === "password") || a === "textarea" || r.contentEditable === "true");
  }
  function Du(r) {
    var a = Rs(), u = r.focusedElem, f = r.selectionRange;
    if (a !== u && u && u.ownerDocument && Zl(u.ownerDocument.documentElement, u)) {
      if (f !== null && Nc(u)) {
        if (a = f.start, r = f.end, r === void 0 && (r = a), "selectionStart" in u) u.selectionStart = a, u.selectionEnd = Math.min(r, u.value.length);
        else if (r = (a = u.ownerDocument || document) && a.defaultView || window, r.getSelection) {
          r = r.getSelection();
          var y = u.textContent.length, S = Math.min(f.start, y);
          f = f.end === void 0 ? S : Math.min(f.end, y), !r.extend && S > f && (y = f, f = S, S = y), y = Ac(u, S);
          var _ = Ac(
            u,
            f
          );
          y && _ && (r.rangeCount !== 1 || r.anchorNode !== y.node || r.anchorOffset !== y.offset || r.focusNode !== _.node || r.focusOffset !== _.offset) && (a = a.createRange(), a.setStart(y.node, y.offset), r.removeAllRanges(), S > f ? (r.addRange(a), r.extend(_.node, _.offset)) : (a.setEnd(_.node, _.offset), r.addRange(a)));
        }
      }
      for (a = [], r = u; r = r.parentNode; ) r.nodeType === 1 && a.push({ element: r, left: r.scrollLeft, top: r.scrollTop });
      for (typeof u.focus == "function" && u.focus(), u = 0; u < a.length; u++) r = a[u], r.element.scrollLeft = r.left, r.element.scrollTop = r.top;
    }
  }
  var qy = E && "documentMode" in document && 11 >= document.documentMode, Ou = null, Ld = null, bs = null, Ad = !1;
  function Nd(r, a, u) {
    var f = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    Ad || Ou == null || Ou !== Ue(f) || (f = Ou, "selectionStart" in f && Nc(f) ? f = { start: f.selectionStart, end: f.selectionEnd } : (f = (f.ownerDocument && f.ownerDocument.defaultView || window).getSelection(), f = { anchorNode: f.anchorNode, anchorOffset: f.anchorOffset, focusNode: f.focusNode, focusOffset: f.focusOffset }), bs && Ts(bs, f) || (bs = f, f = Ms(Ld, "onSelect"), 0 < f.length && (a = new yn("onSelect", "select", null, a, u), r.push({ event: a, listeners: f }), a.target = Ou)));
  }
  function Uc(r, a) {
    var u = {};
    return u[r.toLowerCase()] = a.toLowerCase(), u["Webkit" + r] = "webkit" + a, u["Moz" + r] = "moz" + a, u;
  }
  var jo = { animationend: Uc("Animation", "AnimationEnd"), animationiteration: Uc("Animation", "AnimationIteration"), animationstart: Uc("Animation", "AnimationStart"), transitionend: Uc("Transition", "TransitionEnd") }, Jr = {}, Ud = {};
  E && (Ud = document.createElement("div").style, "AnimationEvent" in window || (delete jo.animationend.animation, delete jo.animationiteration.animation, delete jo.animationstart.animation), "TransitionEvent" in window || delete jo.transitionend.transition);
  function jc(r) {
    if (Jr[r]) return Jr[r];
    if (!jo[r]) return r;
    var a = jo[r], u;
    for (u in a) if (a.hasOwnProperty(u) && u in Ud) return Jr[r] = a[u];
    return r;
  }
  var Gp = jc("animationend"), Xp = jc("animationiteration"), Kp = jc("animationstart"), Zp = jc("transitionend"), jd = /* @__PURE__ */ new Map(), Fc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Ei(r, a) {
    jd.set(r, a), m(a, [r]);
  }
  for (var Fd = 0; Fd < Fc.length; Fd++) {
    var Fo = Fc[Fd], Iy = Fo.toLowerCase(), Yy = Fo[0].toUpperCase() + Fo.slice(1);
    Ei(Iy, "on" + Yy);
  }
  Ei(Gp, "onAnimationEnd"), Ei(Xp, "onAnimationIteration"), Ei(Kp, "onAnimationStart"), Ei("dblclick", "onDoubleClick"), Ei("focusin", "onFocus"), Ei("focusout", "onBlur"), Ei(Zp, "onTransitionEnd"), p("onMouseEnter", ["mouseout", "mouseover"]), p("onMouseLeave", ["mouseout", "mouseover"]), p("onPointerEnter", ["pointerout", "pointerover"]), p("onPointerLeave", ["pointerout", "pointerover"]), m("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), m("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), m("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), m("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var xs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Hd = new Set("cancel close invalid load scroll toggle".split(" ").concat(xs));
  function Hc(r, a, u) {
    var f = r.type || "unknown-event";
    r.currentTarget = u, He(f, a, void 0, r), r.currentTarget = null;
  }
  function Ho(r, a) {
    a = (a & 4) !== 0;
    for (var u = 0; u < r.length; u++) {
      var f = r[u], y = f.event;
      f = f.listeners;
      e: {
        var S = void 0;
        if (a) for (var _ = f.length - 1; 0 <= _; _--) {
          var U = f[_], V = U.instance, ue = U.currentTarget;
          if (U = U.listener, V !== S && y.isPropagationStopped()) break e;
          Hc(y, U, ue), S = V;
        }
        else for (_ = 0; _ < f.length; _++) {
          if (U = f[_], V = U.instance, ue = U.currentTarget, U = U.listener, V !== S && y.isPropagationStopped()) break e;
          Hc(y, U, ue), S = V;
        }
      }
    }
    if (jn) throw r = j, jn = !1, j = null, r;
  }
  function Yn(r, a) {
    var u = a[Ds];
    u === void 0 && (u = a[Ds] = /* @__PURE__ */ new Set());
    var f = r + "__bubble";
    u.has(f) || (Jp(a, r, 2, !1), u.add(f));
  }
  function Pc(r, a, u) {
    var f = 0;
    a && (f |= 4), Jp(u, r, f, a);
  }
  var $c = "_reactListening" + Math.random().toString(36).slice(2);
  function zu(r) {
    if (!r[$c]) {
      r[$c] = !0, d.forEach(function(u) {
        u !== "selectionchange" && (Hd.has(u) || Pc(u, !1, r), Pc(u, !0, r));
      });
      var a = r.nodeType === 9 ? r : r.ownerDocument;
      a === null || a[$c] || (a[$c] = !0, Pc("selectionchange", !1, a));
    }
  }
  function Jp(r, a, u, f) {
    switch (Mu(a)) {
      case 1:
        var y = Ru;
        break;
      case 4:
        y = bu;
        break;
      default:
        y = Xl;
    }
    u = y.bind(null, a, u, r), y = void 0, !Kt || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (y = !0), f ? y !== void 0 ? r.addEventListener(a, u, { capture: !0, passive: y }) : r.addEventListener(a, u, !0) : y !== void 0 ? r.addEventListener(a, u, { passive: y }) : r.addEventListener(a, u, !1);
  }
  function Vc(r, a, u, f, y) {
    var S = f;
    if ((a & 1) === 0 && (a & 2) === 0 && f !== null) e: for (; ; ) {
      if (f === null) return;
      var _ = f.tag;
      if (_ === 3 || _ === 4) {
        var U = f.stateNode.containerInfo;
        if (U === y || U.nodeType === 8 && U.parentNode === y) break;
        if (_ === 4) for (_ = f.return; _ !== null; ) {
          var V = _.tag;
          if ((V === 3 || V === 4) && (V = _.stateNode.containerInfo, V === y || V.nodeType === 8 && V.parentNode === y)) return;
          _ = _.return;
        }
        for (; U !== null; ) {
          if (_ = $o(U), _ === null) return;
          if (V = _.tag, V === 5 || V === 6) {
            f = S = _;
            continue e;
          }
          U = U.parentNode;
        }
      }
      f = f.return;
    }
    wn(function() {
      var ue = S, Oe = tn(u), Le = [];
      e: {
        var ke = jd.get(r);
        if (ke !== void 0) {
          var lt = yn, ht = r;
          switch (r) {
            case "keypress":
              if (me(u) === 0) break e;
            case "keydown":
            case "keyup":
              lt = Md;
              break;
            case "focusin":
              ht = "focus", lt = No;
              break;
            case "focusout":
              ht = "blur", lt = No;
              break;
            case "beforeblur":
            case "afterblur":
              lt = No;
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
              lt = Kl;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              lt = wl;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              lt = Ap;
              break;
            case Gp:
            case Xp:
            case Kp:
              lt = Oc;
              break;
            case Zp:
              lt = Rl;
              break;
            case "scroll":
              lt = lr;
              break;
            case "wheel":
              lt = bl;
              break;
            case "copy":
            case "cut":
            case "paste":
              lt = Dp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              lt = Lp;
          }
          var St = (a & 4) !== 0, _r = !St && r === "scroll", J = St ? ke !== null ? ke + "Capture" : null : ke;
          St = [];
          for (var W = ue, ne; W !== null; ) {
            ne = W;
            var ze = ne.stateNode;
            if (ne.tag === 5 && ze !== null && (ne = ze, J !== null && (ze = Xt(W, J), ze != null && St.push(Lu(W, ze, ne)))), _r) break;
            W = W.return;
          }
          0 < St.length && (ke = new lt(ke, ht, null, u, Oe), Le.push({ event: ke, listeners: St }));
        }
      }
      if ((a & 7) === 0) {
        e: {
          if (ke = r === "mouseover" || r === "pointerover", lt = r === "mouseout" || r === "pointerout", ke && u !== Wt && (ht = u.relatedTarget || u.fromElement) && ($o(ht) || ht[xl])) break e;
          if ((lt || ke) && (ke = Oe.window === Oe ? Oe : (ke = Oe.ownerDocument) ? ke.defaultView || ke.parentWindow : window, lt ? (ht = u.relatedTarget || u.toElement, lt = ue, ht = ht ? $o(ht) : null, ht !== null && (_r = vt(ht), ht !== _r || ht.tag !== 5 && ht.tag !== 6) && (ht = null)) : (lt = null, ht = ue), lt !== ht)) {
            if (St = Kl, ze = "onMouseLeave", J = "onMouseEnter", W = "mouse", (r === "pointerout" || r === "pointerover") && (St = Lp, ze = "onPointerLeave", J = "onPointerEnter", W = "pointer"), _r = lt == null ? ke : Pi(lt), ne = ht == null ? ke : Pi(ht), ke = new St(ze, W + "leave", lt, u, Oe), ke.target = _r, ke.relatedTarget = ne, ze = null, $o(Oe) === ue && (St = new St(J, W + "enter", ht, u, Oe), St.target = ne, St.relatedTarget = _r, ze = St), _r = ze, lt && ht) t: {
              for (St = lt, J = ht, W = 0, ne = St; ne; ne = Jl(ne)) W++;
              for (ne = 0, ze = J; ze; ze = Jl(ze)) ne++;
              for (; 0 < W - ne; ) St = Jl(St), W--;
              for (; 0 < ne - W; ) J = Jl(J), ne--;
              for (; W--; ) {
                if (St === J || J !== null && St === J.alternate) break t;
                St = Jl(St), J = Jl(J);
              }
              St = null;
            }
            else St = null;
            lt !== null && eh(Le, ke, lt, St, !1), ht !== null && _r !== null && eh(Le, _r, ht, St, !0);
          }
        }
        e: {
          if (ke = ue ? Pi(ue) : window, lt = ke.nodeName && ke.nodeName.toLowerCase(), lt === "select" || lt === "input" && ke.type === "file") var mt = Hy;
          else if (Pp(ke)) if (Vp) mt = Bp;
          else {
            mt = Wp;
            var Ft = Py;
          }
          else (lt = ke.nodeName) && lt.toLowerCase() === "input" && (ke.type === "checkbox" || ke.type === "radio") && (mt = $y);
          if (mt && (mt = mt(r, ue))) {
            Dd(Le, mt, u, Oe);
            break e;
          }
          Ft && Ft(r, ke, ue), r === "focusout" && (Ft = ke._wrapperState) && Ft.controlled && ke.type === "number" && nt(ke, "number", ke.value);
        }
        switch (Ft = ue ? Pi(ue) : window, r) {
          case "focusin":
            (Pp(Ft) || Ft.contentEditable === "true") && (Ou = Ft, Ld = ue, bs = null);
            break;
          case "focusout":
            bs = Ld = Ou = null;
            break;
          case "mousedown":
            Ad = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ad = !1, Nd(Le, u, Oe);
            break;
          case "selectionchange":
            if (qy) break;
          case "keydown":
          case "keyup":
            Nd(Le, u, Oe);
        }
        var Pt;
        if (_u) e: {
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
        else ku ? jp(r, u) && (Bt = "onCompositionEnd") : r === "keydown" && u.keyCode === 229 && (Bt = "onCompositionStart");
        Bt && (Np && u.locale !== "ko" && (ku || Bt !== "onCompositionStart" ? Bt === "onCompositionEnd" && ku && (Pt = oe()) : (Fi = Oe, M = "value" in Fi ? Fi.value : Fi.textContent, ku = !0)), Ft = Ms(ue, Bt), 0 < Ft.length && (Bt = new Rd(Bt, r, null, u, Oe), Le.push({ event: Bt, listeners: Ft }), Pt ? Bt.data = Pt : (Pt = Fp(u), Pt !== null && (Bt.data = Pt)))), (Pt = Cs ? Hp(r, u) : jy(r, u)) && (ue = Ms(ue, "onBeforeInput"), 0 < ue.length && (Oe = new Rd("onBeforeInput", "beforeinput", null, u, Oe), Le.push({ event: Oe, listeners: ue }), Oe.data = Pt));
      }
      Ho(Le, a);
    });
  }
  function Lu(r, a, u) {
    return { instance: r, listener: a, currentTarget: u };
  }
  function Ms(r, a) {
    for (var u = a + "Capture", f = []; r !== null; ) {
      var y = r, S = y.stateNode;
      y.tag === 5 && S !== null && (y = S, S = Xt(r, u), S != null && f.unshift(Lu(r, S, y)), S = Xt(r, a), S != null && f.push(Lu(r, S, y))), r = r.return;
    }
    return f;
  }
  function Jl(r) {
    if (r === null) return null;
    do
      r = r.return;
    while (r && r.tag !== 5);
    return r || null;
  }
  function eh(r, a, u, f, y) {
    for (var S = a._reactName, _ = []; u !== null && u !== f; ) {
      var U = u, V = U.alternate, ue = U.stateNode;
      if (V !== null && V === f) break;
      U.tag === 5 && ue !== null && (U = ue, y ? (V = Xt(u, S), V != null && _.unshift(Lu(u, V, U))) : y || (V = Xt(u, S), V != null && _.push(Lu(u, V, U)))), u = u.return;
    }
    _.length !== 0 && r.push({ event: a, listeners: _ });
  }
  var th = /\r\n?/g, Wy = /\u0000|\uFFFD/g;
  function nh(r) {
    return (typeof r == "string" ? r : "" + r).replace(th, `
`).replace(Wy, "");
  }
  function qc(r, a, u) {
    if (a = nh(a), nh(r) !== a && u) throw Error(s(425));
  }
  function eo() {
  }
  var _s = null, Po = null;
  function Ic(r, a) {
    return r === "textarea" || r === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
  }
  var Yc = typeof setTimeout == "function" ? setTimeout : void 0, Pd = typeof clearTimeout == "function" ? clearTimeout : void 0, rh = typeof Promise == "function" ? Promise : void 0, Au = typeof queueMicrotask == "function" ? queueMicrotask : typeof rh < "u" ? function(r) {
    return rh.resolve(null).then(r).catch(Wc);
  } : Yc;
  function Wc(r) {
    setTimeout(function() {
      throw r;
    });
  }
  function Nu(r, a) {
    var u = a, f = 0;
    do {
      var y = u.nextSibling;
      if (r.removeChild(u), y && y.nodeType === 8) if (u = y.data, u === "/$") {
        if (f === 0) {
          r.removeChild(y), ji(a);
          return;
        }
        f--;
      } else u !== "$" && u !== "$?" && u !== "$!" || f++;
      u = y;
    } while (u);
    ji(a);
  }
  function el(r) {
    for (; r != null; r = r.nextSibling) {
      var a = r.nodeType;
      if (a === 1 || a === 3) break;
      if (a === 8) {
        if (a = r.data, a === "$" || a === "$!" || a === "$?") break;
        if (a === "/$") return null;
      }
    }
    return r;
  }
  function ah(r) {
    r = r.previousSibling;
    for (var a = 0; r; ) {
      if (r.nodeType === 8) {
        var u = r.data;
        if (u === "$" || u === "$!" || u === "$?") {
          if (a === 0) return r;
          a--;
        } else u === "/$" && a++;
      }
      r = r.previousSibling;
    }
    return null;
  }
  var to = Math.random().toString(36).slice(2), tl = "__reactFiber$" + to, ks = "__reactProps$" + to, xl = "__reactContainer$" + to, Ds = "__reactEvents$" + to, Uu = "__reactListeners$" + to, By = "__reactHandles$" + to;
  function $o(r) {
    var a = r[tl];
    if (a) return a;
    for (var u = r.parentNode; u; ) {
      if (a = u[xl] || u[tl]) {
        if (u = a.alternate, a.child !== null || u !== null && u.child !== null) for (r = ah(r); r !== null; ) {
          if (u = r[tl]) return u;
          r = ah(r);
        }
        return a;
      }
      r = u, u = r.parentNode;
    }
    return null;
  }
  function Dt(r) {
    return r = r[tl] || r[xl], !r || r.tag !== 5 && r.tag !== 6 && r.tag !== 13 && r.tag !== 3 ? null : r;
  }
  function Pi(r) {
    if (r.tag === 5 || r.tag === 6) return r.stateNode;
    throw Error(s(33));
  }
  function hr(r) {
    return r[ks] || null;
  }
  var kn = [], Ci = -1;
  function wi(r) {
    return { current: r };
  }
  function or(r) {
    0 > Ci || (r.current = kn[Ci], kn[Ci] = null, Ci--);
  }
  function Mt(r, a) {
    Ci++, kn[Ci] = r.current, r.current = a;
  }
  var ma = {}, wr = wi(ma), $r = wi(!1), Fa = ma;
  function Ha(r, a) {
    var u = r.type.contextTypes;
    if (!u) return ma;
    var f = r.stateNode;
    if (f && f.__reactInternalMemoizedUnmaskedChildContext === a) return f.__reactInternalMemoizedMaskedChildContext;
    var y = {}, S;
    for (S in u) y[S] = a[S];
    return f && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = a, r.__reactInternalMemoizedMaskedChildContext = y), y;
  }
  function zr(r) {
    return r = r.childContextTypes, r != null;
  }
  function ju() {
    or($r), or(wr);
  }
  function ih(r, a, u) {
    if (wr.current !== ma) throw Error(s(168));
    Mt(wr, a), Mt($r, u);
  }
  function Os(r, a, u) {
    var f = r.stateNode;
    if (a = a.childContextTypes, typeof f.getChildContext != "function") return u;
    f = f.getChildContext();
    for (var y in f) if (!(y in a)) throw Error(s(108, Ie(r) || "Unknown", y));
    return Te({}, u, f);
  }
  function Yr(r) {
    return r = (r = r.stateNode) && r.__reactInternalMemoizedMergedChildContext || ma, Fa = wr.current, Mt(wr, r), Mt($r, $r.current), !0;
  }
  function Bc(r, a, u) {
    var f = r.stateNode;
    if (!f) throw Error(s(169));
    u ? (r = Os(r, a, Fa), f.__reactInternalMemoizedMergedChildContext = r, or($r), or(wr), Mt(wr, r)) : or($r), Mt($r, u);
  }
  var nl = null, Fu = !1, Ml = !1;
  function Qc(r) {
    nl === null ? nl = [r] : nl.push(r);
  }
  function no(r) {
    Fu = !0, Qc(r);
  }
  function rl() {
    if (!Ml && nl !== null) {
      Ml = !0;
      var r = 0, a = Sn;
      try {
        var u = nl;
        for (Sn = 1; r < u.length; r++) {
          var f = u[r];
          do
            f = f(!0);
          while (f !== null);
        }
        nl = null, Fu = !1;
      } catch (y) {
        throw nl !== null && (nl = nl.slice(r + 1)), zt(qt, rl), y;
      } finally {
        Sn = a, Ml = !1;
      }
    }
    return null;
  }
  var ro = [], ao = 0, io = null, _l = 0, Lr = [], Ti = 0, ri = null, al = 1, il = "";
  function Vo(r, a) {
    ro[ao++] = _l, ro[ao++] = io, io = r, _l = a;
  }
  function lh(r, a, u) {
    Lr[Ti++] = al, Lr[Ti++] = il, Lr[Ti++] = ri, ri = r;
    var f = al;
    r = il;
    var y = 32 - Kr(f) - 1;
    f &= ~(1 << y), u += 1;
    var S = 32 - Kr(a) + y;
    if (30 < S) {
      var _ = y - y % 5;
      S = (f & (1 << _) - 1).toString(32), f >>= _, y -= _, al = 1 << 32 - Kr(a) + y | u << y | f, il = S + r;
    } else al = 1 << S | u << y | f, il = r;
  }
  function Gc(r) {
    r.return !== null && (Vo(r, 1), lh(r, 1, 0));
  }
  function Xc(r) {
    for (; r === io; ) io = ro[--ao], ro[ao] = null, _l = ro[--ao], ro[ao] = null;
    for (; r === ri; ) ri = Lr[--Ti], Lr[Ti] = null, il = Lr[--Ti], Lr[Ti] = null, al = Lr[--Ti], Lr[Ti] = null;
  }
  var Pa = null, $a = null, fr = !1, Ri = null;
  function $d(r, a) {
    var u = ki(5, null, null, 0);
    u.elementType = "DELETED", u.stateNode = a, u.return = r, a = r.deletions, a === null ? (r.deletions = [u], r.flags |= 16) : a.push(u);
  }
  function oh(r, a) {
    switch (r.tag) {
      case 5:
        var u = r.type;
        return a = a.nodeType !== 1 || u.toLowerCase() !== a.nodeName.toLowerCase() ? null : a, a !== null ? (r.stateNode = a, Pa = r, $a = el(a.firstChild), !0) : !1;
      case 6:
        return a = r.pendingProps === "" || a.nodeType !== 3 ? null : a, a !== null ? (r.stateNode = a, Pa = r, $a = null, !0) : !1;
      case 13:
        return a = a.nodeType !== 8 ? null : a, a !== null ? (u = ri !== null ? { id: al, overflow: il } : null, r.memoizedState = { dehydrated: a, treeContext: u, retryLane: 1073741824 }, u = ki(18, null, null, 0), u.stateNode = a, u.return = r, r.child = u, Pa = r, $a = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Vd(r) {
    return (r.mode & 1) !== 0 && (r.flags & 128) === 0;
  }
  function qd(r) {
    if (fr) {
      var a = $a;
      if (a) {
        var u = a;
        if (!oh(r, a)) {
          if (Vd(r)) throw Error(s(418));
          a = el(u.nextSibling);
          var f = Pa;
          a && oh(r, a) ? $d(f, u) : (r.flags = r.flags & -4097 | 2, fr = !1, Pa = r);
        }
      } else {
        if (Vd(r)) throw Error(s(418));
        r.flags = r.flags & -4097 | 2, fr = !1, Pa = r;
      }
    }
  }
  function Vr(r) {
    for (r = r.return; r !== null && r.tag !== 5 && r.tag !== 3 && r.tag !== 13; ) r = r.return;
    Pa = r;
  }
  function Kc(r) {
    if (r !== Pa) return !1;
    if (!fr) return Vr(r), fr = !0, !1;
    var a;
    if ((a = r.tag !== 3) && !(a = r.tag !== 5) && (a = r.type, a = a !== "head" && a !== "body" && !Ic(r.type, r.memoizedProps)), a && (a = $a)) {
      if (Vd(r)) throw zs(), Error(s(418));
      for (; a; ) $d(r, a), a = el(a.nextSibling);
    }
    if (Vr(r), r.tag === 13) {
      if (r = r.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(s(317));
      e: {
        for (r = r.nextSibling, a = 0; r; ) {
          if (r.nodeType === 8) {
            var u = r.data;
            if (u === "/$") {
              if (a === 0) {
                $a = el(r.nextSibling);
                break e;
              }
              a--;
            } else u !== "$" && u !== "$!" && u !== "$?" || a++;
          }
          r = r.nextSibling;
        }
        $a = null;
      }
    } else $a = Pa ? el(r.stateNode.nextSibling) : null;
    return !0;
  }
  function zs() {
    for (var r = $a; r; ) r = el(r.nextSibling);
  }
  function lo() {
    $a = Pa = null, fr = !1;
  }
  function kl(r) {
    Ri === null ? Ri = [r] : Ri.push(r);
  }
  var Qy = P.ReactCurrentBatchConfig;
  function qo(r, a, u) {
    if (r = u.ref, r !== null && typeof r != "function" && typeof r != "object") {
      if (u._owner) {
        if (u = u._owner, u) {
          if (u.tag !== 1) throw Error(s(309));
          var f = u.stateNode;
        }
        if (!f) throw Error(s(147, r));
        var y = f, S = "" + r;
        return a !== null && a.ref !== null && typeof a.ref == "function" && a.ref._stringRef === S ? a.ref : (a = function(_) {
          var U = y.refs;
          _ === null ? delete U[S] : U[S] = _;
        }, a._stringRef = S, a);
      }
      if (typeof r != "string") throw Error(s(284));
      if (!u._owner) throw Error(s(290, r));
    }
    return r;
  }
  function Zc(r, a) {
    throw r = Object.prototype.toString.call(a), Error(s(31, r === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : r));
  }
  function uh(r) {
    var a = r._init;
    return a(r._payload);
  }
  function Io(r) {
    function a(J, W) {
      if (r) {
        var ne = J.deletions;
        ne === null ? (J.deletions = [W], J.flags |= 16) : ne.push(W);
      }
    }
    function u(J, W) {
      if (!r) return null;
      for (; W !== null; ) a(J, W), W = W.sibling;
      return null;
    }
    function f(J, W) {
      for (J = /* @__PURE__ */ new Map(); W !== null; ) W.key !== null ? J.set(W.key, W) : J.set(W.index, W), W = W.sibling;
      return J;
    }
    function y(J, W) {
      return J = ho(J, W), J.index = 0, J.sibling = null, J;
    }
    function S(J, W, ne) {
      return J.index = ne, r ? (ne = J.alternate, ne !== null ? (ne = ne.index, ne < W ? (J.flags |= 2, W) : ne) : (J.flags |= 2, W)) : (J.flags |= 1048576, W);
    }
    function _(J) {
      return r && J.alternate === null && (J.flags |= 2), J;
    }
    function U(J, W, ne, ze) {
      return W === null || W.tag !== 6 ? (W = Ev(ne, J.mode, ze), W.return = J, W) : (W = y(W, ne), W.return = J, W);
    }
    function V(J, W, ne, ze) {
      var mt = ne.type;
      return mt === re ? Oe(J, W, ne.props.children, ze, ne.key) : W !== null && (W.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === Ne && uh(mt) === W.type) ? (ze = y(W, ne.props), ze.ref = qo(J, W, ne), ze.return = J, ze) : (ze = uc(ne.type, ne.key, ne.props, null, J.mode, ze), ze.ref = qo(J, W, ne), ze.return = J, ze);
    }
    function ue(J, W, ne, ze) {
      return W === null || W.tag !== 4 || W.stateNode.containerInfo !== ne.containerInfo || W.stateNode.implementation !== ne.implementation ? (W = zf(ne, J.mode, ze), W.return = J, W) : (W = y(W, ne.children || []), W.return = J, W);
    }
    function Oe(J, W, ne, ze, mt) {
      return W === null || W.tag !== 7 ? (W = Nl(ne, J.mode, ze, mt), W.return = J, W) : (W = y(W, ne), W.return = J, W);
    }
    function Le(J, W, ne) {
      if (typeof W == "string" && W !== "" || typeof W == "number") return W = Ev("" + W, J.mode, ne), W.return = J, W;
      if (typeof W == "object" && W !== null) {
        switch (W.$$typeof) {
          case $:
            return ne = uc(W.type, W.key, W.props, null, J.mode, ne), ne.ref = qo(J, null, W), ne.return = J, ne;
          case Q:
            return W = zf(W, J.mode, ne), W.return = J, W;
          case Ne:
            var ze = W._init;
            return Le(J, ze(W._payload), ne);
        }
        if (pt(W) || Se(W)) return W = Nl(W, J.mode, ne, null), W.return = J, W;
        Zc(J, W);
      }
      return null;
    }
    function ke(J, W, ne, ze) {
      var mt = W !== null ? W.key : null;
      if (typeof ne == "string" && ne !== "" || typeof ne == "number") return mt !== null ? null : U(J, W, "" + ne, ze);
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case $:
            return ne.key === mt ? V(J, W, ne, ze) : null;
          case Q:
            return ne.key === mt ? ue(J, W, ne, ze) : null;
          case Ne:
            return mt = ne._init, ke(
              J,
              W,
              mt(ne._payload),
              ze
            );
        }
        if (pt(ne) || Se(ne)) return mt !== null ? null : Oe(J, W, ne, ze, null);
        Zc(J, ne);
      }
      return null;
    }
    function lt(J, W, ne, ze, mt) {
      if (typeof ze == "string" && ze !== "" || typeof ze == "number") return J = J.get(ne) || null, U(W, J, "" + ze, mt);
      if (typeof ze == "object" && ze !== null) {
        switch (ze.$$typeof) {
          case $:
            return J = J.get(ze.key === null ? ne : ze.key) || null, V(W, J, ze, mt);
          case Q:
            return J = J.get(ze.key === null ? ne : ze.key) || null, ue(W, J, ze, mt);
          case Ne:
            var Ft = ze._init;
            return lt(J, W, ne, Ft(ze._payload), mt);
        }
        if (pt(ze) || Se(ze)) return J = J.get(ne) || null, Oe(W, J, ze, mt, null);
        Zc(W, ze);
      }
      return null;
    }
    function ht(J, W, ne, ze) {
      for (var mt = null, Ft = null, Pt = W, Bt = W = 0, Qr = null; Pt !== null && Bt < ne.length; Bt++) {
        Pt.index > Bt ? (Qr = Pt, Pt = null) : Qr = Pt.sibling;
        var Vn = ke(J, Pt, ne[Bt], ze);
        if (Vn === null) {
          Pt === null && (Pt = Qr);
          break;
        }
        r && Pt && Vn.alternate === null && a(J, Pt), W = S(Vn, W, Bt), Ft === null ? mt = Vn : Ft.sibling = Vn, Ft = Vn, Pt = Qr;
      }
      if (Bt === ne.length) return u(J, Pt), fr && Vo(J, Bt), mt;
      if (Pt === null) {
        for (; Bt < ne.length; Bt++) Pt = Le(J, ne[Bt], ze), Pt !== null && (W = S(Pt, W, Bt), Ft === null ? mt = Pt : Ft.sibling = Pt, Ft = Pt);
        return fr && Vo(J, Bt), mt;
      }
      for (Pt = f(J, Pt); Bt < ne.length; Bt++) Qr = lt(Pt, J, Bt, ne[Bt], ze), Qr !== null && (r && Qr.alternate !== null && Pt.delete(Qr.key === null ? Bt : Qr.key), W = S(Qr, W, Bt), Ft === null ? mt = Qr : Ft.sibling = Qr, Ft = Qr);
      return r && Pt.forEach(function(go) {
        return a(J, go);
      }), fr && Vo(J, Bt), mt;
    }
    function St(J, W, ne, ze) {
      var mt = Se(ne);
      if (typeof mt != "function") throw Error(s(150));
      if (ne = mt.call(ne), ne == null) throw Error(s(151));
      for (var Ft = mt = null, Pt = W, Bt = W = 0, Qr = null, Vn = ne.next(); Pt !== null && !Vn.done; Bt++, Vn = ne.next()) {
        Pt.index > Bt ? (Qr = Pt, Pt = null) : Qr = Pt.sibling;
        var go = ke(J, Pt, Vn.value, ze);
        if (go === null) {
          Pt === null && (Pt = Qr);
          break;
        }
        r && Pt && go.alternate === null && a(J, Pt), W = S(go, W, Bt), Ft === null ? mt = go : Ft.sibling = go, Ft = go, Pt = Qr;
      }
      if (Vn.done) return u(
        J,
        Pt
      ), fr && Vo(J, Bt), mt;
      if (Pt === null) {
        for (; !Vn.done; Bt++, Vn = ne.next()) Vn = Le(J, Vn.value, ze), Vn !== null && (W = S(Vn, W, Bt), Ft === null ? mt = Vn : Ft.sibling = Vn, Ft = Vn);
        return fr && Vo(J, Bt), mt;
      }
      for (Pt = f(J, Pt); !Vn.done; Bt++, Vn = ne.next()) Vn = lt(Pt, J, Bt, Vn.value, ze), Vn !== null && (r && Vn.alternate !== null && Pt.delete(Vn.key === null ? Bt : Vn.key), W = S(Vn, W, Bt), Ft === null ? mt = Vn : Ft.sibling = Vn, Ft = Vn);
      return r && Pt.forEach(function(Ih) {
        return a(J, Ih);
      }), fr && Vo(J, Bt), mt;
    }
    function _r(J, W, ne, ze) {
      if (typeof ne == "object" && ne !== null && ne.type === re && ne.key === null && (ne = ne.props.children), typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case $:
            e: {
              for (var mt = ne.key, Ft = W; Ft !== null; ) {
                if (Ft.key === mt) {
                  if (mt = ne.type, mt === re) {
                    if (Ft.tag === 7) {
                      u(J, Ft.sibling), W = y(Ft, ne.props.children), W.return = J, J = W;
                      break e;
                    }
                  } else if (Ft.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === Ne && uh(mt) === Ft.type) {
                    u(J, Ft.sibling), W = y(Ft, ne.props), W.ref = qo(J, Ft, ne), W.return = J, J = W;
                    break e;
                  }
                  u(J, Ft);
                  break;
                } else a(J, Ft);
                Ft = Ft.sibling;
              }
              ne.type === re ? (W = Nl(ne.props.children, J.mode, ze, ne.key), W.return = J, J = W) : (ze = uc(ne.type, ne.key, ne.props, null, J.mode, ze), ze.ref = qo(J, W, ne), ze.return = J, J = ze);
            }
            return _(J);
          case Q:
            e: {
              for (Ft = ne.key; W !== null; ) {
                if (W.key === Ft) if (W.tag === 4 && W.stateNode.containerInfo === ne.containerInfo && W.stateNode.implementation === ne.implementation) {
                  u(J, W.sibling), W = y(W, ne.children || []), W.return = J, J = W;
                  break e;
                } else {
                  u(J, W);
                  break;
                }
                else a(J, W);
                W = W.sibling;
              }
              W = zf(ne, J.mode, ze), W.return = J, J = W;
            }
            return _(J);
          case Ne:
            return Ft = ne._init, _r(J, W, Ft(ne._payload), ze);
        }
        if (pt(ne)) return ht(J, W, ne, ze);
        if (Se(ne)) return St(J, W, ne, ze);
        Zc(J, ne);
      }
      return typeof ne == "string" && ne !== "" || typeof ne == "number" ? (ne = "" + ne, W !== null && W.tag === 6 ? (u(J, W.sibling), W = y(W, ne), W.return = J, J = W) : (u(J, W), W = Ev(ne, J.mode, ze), W.return = J, J = W), _(J)) : u(J, W);
    }
    return _r;
  }
  var Rr = Io(!0), et = Io(!1), ai = wi(null), Va = null, Hu = null, Id = null;
  function Yd() {
    Id = Hu = Va = null;
  }
  function Wd(r) {
    var a = ai.current;
    or(ai), r._currentValue = a;
  }
  function Bd(r, a, u) {
    for (; r !== null; ) {
      var f = r.alternate;
      if ((r.childLanes & a) !== a ? (r.childLanes |= a, f !== null && (f.childLanes |= a)) : f !== null && (f.childLanes & a) !== a && (f.childLanes |= a), r === u) break;
      r = r.return;
    }
  }
  function mr(r, a) {
    Va = r, Id = Hu = null, r = r.dependencies, r !== null && r.firstContext !== null && ((r.lanes & a) !== 0 && (Nr = !0), r.firstContext = null);
  }
  function bi(r) {
    var a = r._currentValue;
    if (Id !== r) if (r = { context: r, memoizedValue: a, next: null }, Hu === null) {
      if (Va === null) throw Error(s(308));
      Hu = r, Va.dependencies = { lanes: 0, firstContext: r };
    } else Hu = Hu.next = r;
    return a;
  }
  var Yo = null;
  function Qd(r) {
    Yo === null ? Yo = [r] : Yo.push(r);
  }
  function Gd(r, a, u, f) {
    var y = a.interleaved;
    return y === null ? (u.next = u, Qd(a)) : (u.next = y.next, y.next = u), a.interleaved = u, ii(r, f);
  }
  function ii(r, a) {
    r.lanes |= a;
    var u = r.alternate;
    for (u !== null && (u.lanes |= a), u = r, r = r.return; r !== null; ) r.childLanes |= a, u = r.alternate, u !== null && (u.childLanes |= a), u = r, r = r.return;
    return u.tag === 3 ? u.stateNode : null;
  }
  var li = !1;
  function Xd(r) {
    r.updateQueue = { baseState: r.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function sh(r, a) {
    r = r.updateQueue, a.updateQueue === r && (a.updateQueue = { baseState: r.baseState, firstBaseUpdate: r.firstBaseUpdate, lastBaseUpdate: r.lastBaseUpdate, shared: r.shared, effects: r.effects });
  }
  function Dl(r, a) {
    return { eventTime: r, lane: a, tag: 0, payload: null, callback: null, next: null };
  }
  function oo(r, a, u) {
    var f = r.updateQueue;
    if (f === null) return null;
    if (f = f.shared, (Dn & 2) !== 0) {
      var y = f.pending;
      return y === null ? a.next = a : (a.next = y.next, y.next = a), f.pending = a, ii(r, u);
    }
    return y = f.interleaved, y === null ? (a.next = a, Qd(f)) : (a.next = y.next, y.next = a), f.interleaved = a, ii(r, u);
  }
  function Jc(r, a, u) {
    if (a = a.updateQueue, a !== null && (a = a.shared, (u & 4194240) !== 0)) {
      var f = a.lanes;
      f &= r.pendingLanes, u |= f, a.lanes = u, Dr(r, u);
    }
  }
  function ch(r, a) {
    var u = r.updateQueue, f = r.alternate;
    if (f !== null && (f = f.updateQueue, u === f)) {
      var y = null, S = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var _ = { eventTime: u.eventTime, lane: u.lane, tag: u.tag, payload: u.payload, callback: u.callback, next: null };
          S === null ? y = S = _ : S = S.next = _, u = u.next;
        } while (u !== null);
        S === null ? y = S = a : S = S.next = a;
      } else y = S = a;
      u = { baseState: f.baseState, firstBaseUpdate: y, lastBaseUpdate: S, shared: f.shared, effects: f.effects }, r.updateQueue = u;
      return;
    }
    r = u.lastBaseUpdate, r === null ? u.firstBaseUpdate = a : r.next = a, u.lastBaseUpdate = a;
  }
  function Ls(r, a, u, f) {
    var y = r.updateQueue;
    li = !1;
    var S = y.firstBaseUpdate, _ = y.lastBaseUpdate, U = y.shared.pending;
    if (U !== null) {
      y.shared.pending = null;
      var V = U, ue = V.next;
      V.next = null, _ === null ? S = ue : _.next = ue, _ = V;
      var Oe = r.alternate;
      Oe !== null && (Oe = Oe.updateQueue, U = Oe.lastBaseUpdate, U !== _ && (U === null ? Oe.firstBaseUpdate = ue : U.next = ue, Oe.lastBaseUpdate = V));
    }
    if (S !== null) {
      var Le = y.baseState;
      _ = 0, Oe = ue = V = null, U = S;
      do {
        var ke = U.lane, lt = U.eventTime;
        if ((f & ke) === ke) {
          Oe !== null && (Oe = Oe.next = {
            eventTime: lt,
            lane: 0,
            tag: U.tag,
            payload: U.payload,
            callback: U.callback,
            next: null
          });
          e: {
            var ht = r, St = U;
            switch (ke = a, lt = u, St.tag) {
              case 1:
                if (ht = St.payload, typeof ht == "function") {
                  Le = ht.call(lt, Le, ke);
                  break e;
                }
                Le = ht;
                break e;
              case 3:
                ht.flags = ht.flags & -65537 | 128;
              case 0:
                if (ht = St.payload, ke = typeof ht == "function" ? ht.call(lt, Le, ke) : ht, ke == null) break e;
                Le = Te({}, Le, ke);
                break e;
              case 2:
                li = !0;
            }
          }
          U.callback !== null && U.lane !== 0 && (r.flags |= 64, ke = y.effects, ke === null ? y.effects = [U] : ke.push(U));
        } else lt = { eventTime: lt, lane: ke, tag: U.tag, payload: U.payload, callback: U.callback, next: null }, Oe === null ? (ue = Oe = lt, V = Le) : Oe = Oe.next = lt, _ |= ke;
        if (U = U.next, U === null) {
          if (U = y.shared.pending, U === null) break;
          ke = U, U = ke.next, ke.next = null, y.lastBaseUpdate = ke, y.shared.pending = null;
        }
      } while (!0);
      if (Oe === null && (V = Le), y.baseState = V, y.firstBaseUpdate = ue, y.lastBaseUpdate = Oe, a = y.shared.interleaved, a !== null) {
        y = a;
        do
          _ |= y.lane, y = y.next;
        while (y !== a);
      } else S === null && (y.shared.lanes = 0);
      cl |= _, r.lanes = _, r.memoizedState = Le;
    }
  }
  function Kd(r, a, u) {
    if (r = a.effects, a.effects = null, r !== null) for (a = 0; a < r.length; a++) {
      var f = r[a], y = f.callback;
      if (y !== null) {
        if (f.callback = null, f = u, typeof y != "function") throw Error(s(191, y));
        y.call(f);
      }
    }
  }
  var As = {}, ll = wi(As), Ns = wi(As), Us = wi(As);
  function Wo(r) {
    if (r === As) throw Error(s(174));
    return r;
  }
  function Zd(r, a) {
    switch (Mt(Us, a), Mt(Ns, r), Mt(ll, As), r = a.nodeType, r) {
      case 9:
      case 11:
        a = (a = a.documentElement) ? a.namespaceURI : Rn(null, "");
        break;
      default:
        r = r === 8 ? a.parentNode : a, a = r.namespaceURI || null, r = r.tagName, a = Rn(a, r);
    }
    or(ll), Mt(ll, a);
  }
  function Bo() {
    or(ll), or(Ns), or(Us);
  }
  function fh(r) {
    Wo(Us.current);
    var a = Wo(ll.current), u = Rn(a, r.type);
    a !== u && (Mt(Ns, r), Mt(ll, u));
  }
  function ef(r) {
    Ns.current === r && (or(ll), or(Ns));
  }
  var yr = wi(0);
  function tf(r) {
    for (var a = r; a !== null; ) {
      if (a.tag === 13) {
        var u = a.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || u.data === "$!")) return a;
      } else if (a.tag === 19 && a.memoizedProps.revealOrder !== void 0) {
        if ((a.flags & 128) !== 0) return a;
      } else if (a.child !== null) {
        a.child.return = a, a = a.child;
        continue;
      }
      if (a === r) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === r) return null;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
    return null;
  }
  var js = [];
  function Ot() {
    for (var r = 0; r < js.length; r++) js[r]._workInProgressVersionPrimary = null;
    js.length = 0;
  }
  var pn = P.ReactCurrentDispatcher, Pn = P.ReactCurrentBatchConfig, er = 0, $n = null, Ar = null, Wr = null, nf = !1, Fs = !1, Qo = 0, _e = 0;
  function Un() {
    throw Error(s(321));
  }
  function It(r, a) {
    if (a === null) return !1;
    for (var u = 0; u < a.length && u < r.length; u++) if (!Hi(r[u], a[u])) return !1;
    return !0;
  }
  function uo(r, a, u, f, y, S) {
    if (er = S, $n = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, pn.current = r === null || r.memoizedState === null ? gf : Is, r = u(f, y), Fs) {
      S = 0;
      do {
        if (Fs = !1, Qo = 0, 25 <= S) throw Error(s(301));
        S += 1, Wr = Ar = null, a.updateQueue = null, pn.current = Sf, r = u(f, y);
      } while (Fs);
    }
    if (pn.current = Jo, a = Ar !== null && Ar.next !== null, er = 0, Wr = Ar = $n = null, nf = !1, a) throw Error(s(300));
    return r;
  }
  function $i() {
    var r = Qo !== 0;
    return Qo = 0, r;
  }
  function ya() {
    var r = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Wr === null ? $n.memoizedState = Wr = r : Wr = Wr.next = r, Wr;
  }
  function br() {
    if (Ar === null) {
      var r = $n.alternate;
      r = r !== null ? r.memoizedState : null;
    } else r = Ar.next;
    var a = Wr === null ? $n.memoizedState : Wr.next;
    if (a !== null) Wr = a, Ar = r;
    else {
      if (r === null) throw Error(s(310));
      Ar = r, r = { memoizedState: Ar.memoizedState, baseState: Ar.baseState, baseQueue: Ar.baseQueue, queue: Ar.queue, next: null }, Wr === null ? $n.memoizedState = Wr = r : Wr = Wr.next = r;
    }
    return Wr;
  }
  function Ol(r, a) {
    return typeof a == "function" ? a(r) : a;
  }
  function so(r) {
    var a = br(), u = a.queue;
    if (u === null) throw Error(s(311));
    u.lastRenderedReducer = r;
    var f = Ar, y = f.baseQueue, S = u.pending;
    if (S !== null) {
      if (y !== null) {
        var _ = y.next;
        y.next = S.next, S.next = _;
      }
      f.baseQueue = y = S, u.pending = null;
    }
    if (y !== null) {
      S = y.next, f = f.baseState;
      var U = _ = null, V = null, ue = S;
      do {
        var Oe = ue.lane;
        if ((er & Oe) === Oe) V !== null && (V = V.next = { lane: 0, action: ue.action, hasEagerState: ue.hasEagerState, eagerState: ue.eagerState, next: null }), f = ue.hasEagerState ? ue.eagerState : r(f, ue.action);
        else {
          var Le = {
            lane: Oe,
            action: ue.action,
            hasEagerState: ue.hasEagerState,
            eagerState: ue.eagerState,
            next: null
          };
          V === null ? (U = V = Le, _ = f) : V = V.next = Le, $n.lanes |= Oe, cl |= Oe;
        }
        ue = ue.next;
      } while (ue !== null && ue !== S);
      V === null ? _ = f : V.next = U, Hi(f, a.memoizedState) || (Nr = !0), a.memoizedState = f, a.baseState = _, a.baseQueue = V, u.lastRenderedState = f;
    }
    if (r = u.interleaved, r !== null) {
      y = r;
      do
        S = y.lane, $n.lanes |= S, cl |= S, y = y.next;
      while (y !== r);
    } else y === null && (u.lanes = 0);
    return [a.memoizedState, u.dispatch];
  }
  function Go(r) {
    var a = br(), u = a.queue;
    if (u === null) throw Error(s(311));
    u.lastRenderedReducer = r;
    var f = u.dispatch, y = u.pending, S = a.memoizedState;
    if (y !== null) {
      u.pending = null;
      var _ = y = y.next;
      do
        S = r(S, _.action), _ = _.next;
      while (_ !== y);
      Hi(S, a.memoizedState) || (Nr = !0), a.memoizedState = S, a.baseQueue === null && (a.baseState = S), u.lastRenderedState = S;
    }
    return [S, f];
  }
  function rf() {
  }
  function af(r, a) {
    var u = $n, f = br(), y = a(), S = !Hi(f.memoizedState, y);
    if (S && (f.memoizedState = y, Nr = !0), f = f.queue, Hs(uf.bind(null, u, f, r), [r]), f.getSnapshot !== a || S || Wr !== null && Wr.memoizedState.tag & 1) {
      if (u.flags |= 2048, Xo(9, of.bind(null, u, f, y, a), void 0, null), qr === null) throw Error(s(349));
      (er & 30) !== 0 || lf(u, a, y);
    }
    return y;
  }
  function lf(r, a, u) {
    r.flags |= 16384, r = { getSnapshot: a, value: u }, a = $n.updateQueue, a === null ? (a = { lastEffect: null, stores: null }, $n.updateQueue = a, a.stores = [r]) : (u = a.stores, u === null ? a.stores = [r] : u.push(r));
  }
  function of(r, a, u, f) {
    a.value = u, a.getSnapshot = f, sf(a) && cf(r);
  }
  function uf(r, a, u) {
    return u(function() {
      sf(a) && cf(r);
    });
  }
  function sf(r) {
    var a = r.getSnapshot;
    r = r.value;
    try {
      var u = a();
      return !Hi(r, u);
    } catch {
      return !0;
    }
  }
  function cf(r) {
    var a = ii(r, 1);
    a !== null && xa(a, r, 1, -1);
  }
  function ff(r) {
    var a = ya();
    return typeof r == "function" && (r = r()), a.memoizedState = a.baseState = r, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ol, lastRenderedState: r }, a.queue = r, r = r.dispatch = Zo.bind(null, $n, r), [a.memoizedState, r];
  }
  function Xo(r, a, u, f) {
    return r = { tag: r, create: a, destroy: u, deps: f, next: null }, a = $n.updateQueue, a === null ? (a = { lastEffect: null, stores: null }, $n.updateQueue = a, a.lastEffect = r.next = r) : (u = a.lastEffect, u === null ? a.lastEffect = r.next = r : (f = u.next, u.next = r, r.next = f, a.lastEffect = r)), r;
  }
  function df() {
    return br().memoizedState;
  }
  function Pu(r, a, u, f) {
    var y = ya();
    $n.flags |= r, y.memoizedState = Xo(1 | a, u, void 0, f === void 0 ? null : f);
  }
  function $u(r, a, u, f) {
    var y = br();
    f = f === void 0 ? null : f;
    var S = void 0;
    if (Ar !== null) {
      var _ = Ar.memoizedState;
      if (S = _.destroy, f !== null && It(f, _.deps)) {
        y.memoizedState = Xo(a, u, S, f);
        return;
      }
    }
    $n.flags |= r, y.memoizedState = Xo(1 | a, u, S, f);
  }
  function vf(r, a) {
    return Pu(8390656, 8, r, a);
  }
  function Hs(r, a) {
    return $u(2048, 8, r, a);
  }
  function pf(r, a) {
    return $u(4, 2, r, a);
  }
  function Ps(r, a) {
    return $u(4, 4, r, a);
  }
  function Ko(r, a) {
    if (typeof a == "function") return r = r(), a(r), function() {
      a(null);
    };
    if (a != null) return r = r(), a.current = r, function() {
      a.current = null;
    };
  }
  function hf(r, a, u) {
    return u = u != null ? u.concat([r]) : null, $u(4, 4, Ko.bind(null, a, r), u);
  }
  function $s() {
  }
  function mf(r, a) {
    var u = br();
    a = a === void 0 ? null : a;
    var f = u.memoizedState;
    return f !== null && a !== null && It(a, f[1]) ? f[0] : (u.memoizedState = [r, a], r);
  }
  function yf(r, a) {
    var u = br();
    a = a === void 0 ? null : a;
    var f = u.memoizedState;
    return f !== null && a !== null && It(a, f[1]) ? f[0] : (r = r(), u.memoizedState = [r, a], r);
  }
  function Jd(r, a, u) {
    return (er & 21) === 0 ? (r.baseState && (r.baseState = !1, Nr = !0), r.memoizedState = u) : (Hi(u, a) || (u = Ua(), $n.lanes |= u, cl |= u, r.baseState = !0), a);
  }
  function Vs(r, a) {
    var u = Sn;
    Sn = u !== 0 && 4 > u ? u : 4, r(!0);
    var f = Pn.transition;
    Pn.transition = {};
    try {
      r(!1), a();
    } finally {
      Sn = u, Pn.transition = f;
    }
  }
  function ev() {
    return br().memoizedState;
  }
  function qs(r, a, u) {
    var f = fl(r);
    if (u = { lane: f, action: u, hasEagerState: !1, eagerState: null, next: null }, qa(r)) dh(a, u);
    else if (u = Gd(r, a, u, f), u !== null) {
      var y = Fr();
      xa(u, r, f, y), rr(u, a, f);
    }
  }
  function Zo(r, a, u) {
    var f = fl(r), y = { lane: f, action: u, hasEagerState: !1, eagerState: null, next: null };
    if (qa(r)) dh(a, y);
    else {
      var S = r.alternate;
      if (r.lanes === 0 && (S === null || S.lanes === 0) && (S = a.lastRenderedReducer, S !== null)) try {
        var _ = a.lastRenderedState, U = S(_, u);
        if (y.hasEagerState = !0, y.eagerState = U, Hi(U, _)) {
          var V = a.interleaved;
          V === null ? (y.next = y, Qd(a)) : (y.next = V.next, V.next = y), a.interleaved = y;
          return;
        }
      } catch {
      }
      u = Gd(r, a, y, f), u !== null && (y = Fr(), xa(u, r, f, y), rr(u, a, f));
    }
  }
  function qa(r) {
    var a = r.alternate;
    return r === $n || a !== null && a === $n;
  }
  function dh(r, a) {
    Fs = nf = !0;
    var u = r.pending;
    u === null ? a.next = a : (a.next = u.next, u.next = a), r.pending = a;
  }
  function rr(r, a, u) {
    if ((u & 4194240) !== 0) {
      var f = a.lanes;
      f &= r.pendingLanes, u |= f, a.lanes = u, Dr(r, u);
    }
  }
  var Jo = { readContext: bi, useCallback: Un, useContext: Un, useEffect: Un, useImperativeHandle: Un, useInsertionEffect: Un, useLayoutEffect: Un, useMemo: Un, useReducer: Un, useRef: Un, useState: Un, useDebugValue: Un, useDeferredValue: Un, useTransition: Un, useMutableSource: Un, useSyncExternalStore: Un, useId: Un, unstable_isNewReconciler: !1 }, gf = { readContext: bi, useCallback: function(r, a) {
    return ya().memoizedState = [r, a === void 0 ? null : a], r;
  }, useContext: bi, useEffect: vf, useImperativeHandle: function(r, a, u) {
    return u = u != null ? u.concat([r]) : null, Pu(
      4194308,
      4,
      Ko.bind(null, a, r),
      u
    );
  }, useLayoutEffect: function(r, a) {
    return Pu(4194308, 4, r, a);
  }, useInsertionEffect: function(r, a) {
    return Pu(4, 2, r, a);
  }, useMemo: function(r, a) {
    var u = ya();
    return a = a === void 0 ? null : a, r = r(), u.memoizedState = [r, a], r;
  }, useReducer: function(r, a, u) {
    var f = ya();
    return a = u !== void 0 ? u(a) : a, f.memoizedState = f.baseState = a, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: r, lastRenderedState: a }, f.queue = r, r = r.dispatch = qs.bind(null, $n, r), [f.memoizedState, r];
  }, useRef: function(r) {
    var a = ya();
    return r = { current: r }, a.memoizedState = r;
  }, useState: ff, useDebugValue: $s, useDeferredValue: function(r) {
    return ya().memoizedState = r;
  }, useTransition: function() {
    var r = ff(!1), a = r[0];
    return r = Vs.bind(null, r[1]), ya().memoizedState = r, [a, r];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(r, a, u) {
    var f = $n, y = ya();
    if (fr) {
      if (u === void 0) throw Error(s(407));
      u = u();
    } else {
      if (u = a(), qr === null) throw Error(s(349));
      (er & 30) !== 0 || lf(f, a, u);
    }
    y.memoizedState = u;
    var S = { value: u, getSnapshot: a };
    return y.queue = S, vf(uf.bind(
      null,
      f,
      S,
      r
    ), [r]), f.flags |= 2048, Xo(9, of.bind(null, f, S, u, a), void 0, null), u;
  }, useId: function() {
    var r = ya(), a = qr.identifierPrefix;
    if (fr) {
      var u = il, f = al;
      u = (f & ~(1 << 32 - Kr(f) - 1)).toString(32) + u, a = ":" + a + "R" + u, u = Qo++, 0 < u && (a += "H" + u.toString(32)), a += ":";
    } else u = _e++, a = ":" + a + "r" + u.toString(32) + ":";
    return r.memoizedState = a;
  }, unstable_isNewReconciler: !1 }, Is = {
    readContext: bi,
    useCallback: mf,
    useContext: bi,
    useEffect: Hs,
    useImperativeHandle: hf,
    useInsertionEffect: pf,
    useLayoutEffect: Ps,
    useMemo: yf,
    useReducer: so,
    useRef: df,
    useState: function() {
      return so(Ol);
    },
    useDebugValue: $s,
    useDeferredValue: function(r) {
      var a = br();
      return Jd(a, Ar.memoizedState, r);
    },
    useTransition: function() {
      var r = so(Ol)[0], a = br().memoizedState;
      return [r, a];
    },
    useMutableSource: rf,
    useSyncExternalStore: af,
    useId: ev,
    unstable_isNewReconciler: !1
  }, Sf = { readContext: bi, useCallback: mf, useContext: bi, useEffect: Hs, useImperativeHandle: hf, useInsertionEffect: pf, useLayoutEffect: Ps, useMemo: yf, useReducer: Go, useRef: df, useState: function() {
    return Go(Ol);
  }, useDebugValue: $s, useDeferredValue: function(r) {
    var a = br();
    return Ar === null ? a.memoizedState = r : Jd(a, Ar.memoizedState, r);
  }, useTransition: function() {
    var r = Go(Ol)[0], a = br().memoizedState;
    return [r, a];
  }, useMutableSource: rf, useSyncExternalStore: af, useId: ev, unstable_isNewReconciler: !1 };
  function Vi(r, a) {
    if (r && r.defaultProps) {
      a = Te({}, a), r = r.defaultProps;
      for (var u in r) a[u] === void 0 && (a[u] = r[u]);
      return a;
    }
    return a;
  }
  function tv(r, a, u, f) {
    a = r.memoizedState, u = u(f, a), u = u == null ? a : Te({}, a, u), r.memoizedState = u, r.lanes === 0 && (r.updateQueue.baseState = u);
  }
  var Ef = { isMounted: function(r) {
    return (r = r._reactInternals) ? vt(r) === r : !1;
  }, enqueueSetState: function(r, a, u) {
    r = r._reactInternals;
    var f = Fr(), y = fl(r), S = Dl(f, y);
    S.payload = a, u != null && (S.callback = u), a = oo(r, S, y), a !== null && (xa(a, r, y, f), Jc(a, r, y));
  }, enqueueReplaceState: function(r, a, u) {
    r = r._reactInternals;
    var f = Fr(), y = fl(r), S = Dl(f, y);
    S.tag = 1, S.payload = a, u != null && (S.callback = u), a = oo(r, S, y), a !== null && (xa(a, r, y, f), Jc(a, r, y));
  }, enqueueForceUpdate: function(r, a) {
    r = r._reactInternals;
    var u = Fr(), f = fl(r), y = Dl(u, f);
    y.tag = 2, a != null && (y.callback = a), a = oo(r, y, f), a !== null && (xa(a, r, f, u), Jc(a, r, f));
  } };
  function vh(r, a, u, f, y, S, _) {
    return r = r.stateNode, typeof r.shouldComponentUpdate == "function" ? r.shouldComponentUpdate(f, S, _) : a.prototype && a.prototype.isPureReactComponent ? !Ts(u, f) || !Ts(y, S) : !0;
  }
  function Cf(r, a, u) {
    var f = !1, y = ma, S = a.contextType;
    return typeof S == "object" && S !== null ? S = bi(S) : (y = zr(a) ? Fa : wr.current, f = a.contextTypes, S = (f = f != null) ? Ha(r, y) : ma), a = new a(u, S), r.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ef, r.stateNode = a, a._reactInternals = r, f && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = y, r.__reactInternalMemoizedMaskedChildContext = S), a;
  }
  function ph(r, a, u, f) {
    r = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(u, f), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(u, f), a.state !== r && Ef.enqueueReplaceState(a, a.state, null);
  }
  function Ys(r, a, u, f) {
    var y = r.stateNode;
    y.props = u, y.state = r.memoizedState, y.refs = {}, Xd(r);
    var S = a.contextType;
    typeof S == "object" && S !== null ? y.context = bi(S) : (S = zr(a) ? Fa : wr.current, y.context = Ha(r, S)), y.state = r.memoizedState, S = a.getDerivedStateFromProps, typeof S == "function" && (tv(r, a, S, u), y.state = r.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof y.getSnapshotBeforeUpdate == "function" || typeof y.UNSAFE_componentWillMount != "function" && typeof y.componentWillMount != "function" || (a = y.state, typeof y.componentWillMount == "function" && y.componentWillMount(), typeof y.UNSAFE_componentWillMount == "function" && y.UNSAFE_componentWillMount(), a !== y.state && Ef.enqueueReplaceState(y, y.state, null), Ls(r, u, y, f), y.state = r.memoizedState), typeof y.componentDidMount == "function" && (r.flags |= 4194308);
  }
  function eu(r, a) {
    try {
      var u = "", f = a;
      do
        u += Qe(f), f = f.return;
      while (f);
      var y = u;
    } catch (S) {
      y = `
Error generating stack: ` + S.message + `
` + S.stack;
    }
    return { value: r, source: a, stack: y, digest: null };
  }
  function nv(r, a, u) {
    return { value: r, source: null, stack: u ?? null, digest: a ?? null };
  }
  function rv(r, a) {
    try {
      console.error(a.value);
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  var wf = typeof WeakMap == "function" ? WeakMap : Map;
  function hh(r, a, u) {
    u = Dl(-1, u), u.tag = 3, u.payload = { element: null };
    var f = a.value;
    return u.callback = function() {
      Bu || (Bu = !0, ru = f), rv(r, a);
    }, u;
  }
  function av(r, a, u) {
    u = Dl(-1, u), u.tag = 3;
    var f = r.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var y = a.value;
      u.payload = function() {
        return f(y);
      }, u.callback = function() {
        rv(r, a);
      };
    }
    var S = r.stateNode;
    return S !== null && typeof S.componentDidCatch == "function" && (u.callback = function() {
      rv(r, a), typeof f != "function" && (vo === null ? vo = /* @__PURE__ */ new Set([this]) : vo.add(this));
      var _ = a.stack;
      this.componentDidCatch(a.value, { componentStack: _ !== null ? _ : "" });
    }), u;
  }
  function iv(r, a, u) {
    var f = r.pingCache;
    if (f === null) {
      f = r.pingCache = new wf();
      var y = /* @__PURE__ */ new Set();
      f.set(a, y);
    } else y = f.get(a), y === void 0 && (y = /* @__PURE__ */ new Set(), f.set(a, y));
    y.has(u) || (y.add(u), r = t0.bind(null, r, a, u), a.then(r, r));
  }
  function mh(r) {
    do {
      var a;
      if ((a = r.tag === 13) && (a = r.memoizedState, a = a !== null ? a.dehydrated !== null : !0), a) return r;
      r = r.return;
    } while (r !== null);
    return null;
  }
  function co(r, a, u, f, y) {
    return (r.mode & 1) === 0 ? (r === a ? r.flags |= 65536 : (r.flags |= 128, u.flags |= 131072, u.flags &= -52805, u.tag === 1 && (u.alternate === null ? u.tag = 17 : (a = Dl(-1, 1), a.tag = 2, oo(u, a, 1))), u.lanes |= 1), r) : (r.flags |= 65536, r.lanes = y, r);
  }
  var Ws = P.ReactCurrentOwner, Nr = !1;
  function ea(r, a, u, f) {
    a.child = r === null ? et(a, null, u, f) : Rr(a, r.child, u, f);
  }
  function Ia(r, a, u, f, y) {
    u = u.render;
    var S = a.ref;
    return mr(a, y), f = uo(r, a, u, f, S, y), u = $i(), r !== null && !Nr ? (a.updateQueue = r.updateQueue, a.flags &= -2053, r.lanes &= ~y, Mi(r, a, y)) : (fr && u && Gc(a), a.flags |= 1, ea(r, a, f, y), a.child);
  }
  function tu(r, a, u, f, y) {
    if (r === null) {
      var S = u.type;
      return typeof S == "function" && !Sv(S) && S.defaultProps === void 0 && u.compare === null && u.defaultProps === void 0 ? (a.tag = 15, a.type = S, un(r, a, S, f, y)) : (r = uc(u.type, null, f, a, a.mode, y), r.ref = a.ref, r.return = a, a.child = r);
    }
    if (S = r.child, (r.lanes & y) === 0) {
      var _ = S.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Ts, u(_, f) && r.ref === a.ref) return Mi(r, a, y);
    }
    return a.flags |= 1, r = ho(S, f), r.ref = a.ref, r.return = a, a.child = r;
  }
  function un(r, a, u, f, y) {
    if (r !== null) {
      var S = r.memoizedProps;
      if (Ts(S, f) && r.ref === a.ref) if (Nr = !1, a.pendingProps = f = S, (r.lanes & y) !== 0) (r.flags & 131072) !== 0 && (Nr = !0);
      else return a.lanes = r.lanes, Mi(r, a, y);
    }
    return yh(r, a, u, f, y);
  }
  function Bs(r, a, u) {
    var f = a.pendingProps, y = f.children, S = r !== null ? r.memoizedState : null;
    if (f.mode === "hidden") if ((a.mode & 1) === 0) a.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Mt(Iu, oi), oi |= u;
    else {
      if ((u & 1073741824) === 0) return r = S !== null ? S.baseLanes | u : u, a.lanes = a.childLanes = 1073741824, a.memoizedState = { baseLanes: r, cachePool: null, transitions: null }, a.updateQueue = null, Mt(Iu, oi), oi |= r, null;
      a.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, f = S !== null ? S.baseLanes : u, Mt(Iu, oi), oi |= f;
    }
    else S !== null ? (f = S.baseLanes | u, a.memoizedState = null) : f = u, Mt(Iu, oi), oi |= f;
    return ea(r, a, y, u), a.child;
  }
  function lv(r, a) {
    var u = a.ref;
    (r === null && u !== null || r !== null && r.ref !== u) && (a.flags |= 512, a.flags |= 2097152);
  }
  function yh(r, a, u, f, y) {
    var S = zr(u) ? Fa : wr.current;
    return S = Ha(a, S), mr(a, y), u = uo(r, a, u, f, S, y), f = $i(), r !== null && !Nr ? (a.updateQueue = r.updateQueue, a.flags &= -2053, r.lanes &= ~y, Mi(r, a, y)) : (fr && f && Gc(a), a.flags |= 1, ea(r, a, u, y), a.child);
  }
  function gh(r, a, u, f, y) {
    if (zr(u)) {
      var S = !0;
      Yr(a);
    } else S = !1;
    if (mr(a, y), a.stateNode === null) xi(r, a), Cf(a, u, f), Ys(a, u, f, y), f = !0;
    else if (r === null) {
      var _ = a.stateNode, U = a.memoizedProps;
      _.props = U;
      var V = _.context, ue = u.contextType;
      typeof ue == "object" && ue !== null ? ue = bi(ue) : (ue = zr(u) ? Fa : wr.current, ue = Ha(a, ue));
      var Oe = u.getDerivedStateFromProps, Le = typeof Oe == "function" || typeof _.getSnapshotBeforeUpdate == "function";
      Le || typeof _.UNSAFE_componentWillReceiveProps != "function" && typeof _.componentWillReceiveProps != "function" || (U !== f || V !== ue) && ph(a, _, f, ue), li = !1;
      var ke = a.memoizedState;
      _.state = ke, Ls(a, f, _, y), V = a.memoizedState, U !== f || ke !== V || $r.current || li ? (typeof Oe == "function" && (tv(a, u, Oe, f), V = a.memoizedState), (U = li || vh(a, u, U, f, ke, V, ue)) ? (Le || typeof _.UNSAFE_componentWillMount != "function" && typeof _.componentWillMount != "function" || (typeof _.componentWillMount == "function" && _.componentWillMount(), typeof _.UNSAFE_componentWillMount == "function" && _.UNSAFE_componentWillMount()), typeof _.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof _.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = f, a.memoizedState = V), _.props = f, _.state = V, _.context = ue, f = U) : (typeof _.componentDidMount == "function" && (a.flags |= 4194308), f = !1);
    } else {
      _ = a.stateNode, sh(r, a), U = a.memoizedProps, ue = a.type === a.elementType ? U : Vi(a.type, U), _.props = ue, Le = a.pendingProps, ke = _.context, V = u.contextType, typeof V == "object" && V !== null ? V = bi(V) : (V = zr(u) ? Fa : wr.current, V = Ha(a, V));
      var lt = u.getDerivedStateFromProps;
      (Oe = typeof lt == "function" || typeof _.getSnapshotBeforeUpdate == "function") || typeof _.UNSAFE_componentWillReceiveProps != "function" && typeof _.componentWillReceiveProps != "function" || (U !== Le || ke !== V) && ph(a, _, f, V), li = !1, ke = a.memoizedState, _.state = ke, Ls(a, f, _, y);
      var ht = a.memoizedState;
      U !== Le || ke !== ht || $r.current || li ? (typeof lt == "function" && (tv(a, u, lt, f), ht = a.memoizedState), (ue = li || vh(a, u, ue, f, ke, ht, V) || !1) ? (Oe || typeof _.UNSAFE_componentWillUpdate != "function" && typeof _.componentWillUpdate != "function" || (typeof _.componentWillUpdate == "function" && _.componentWillUpdate(f, ht, V), typeof _.UNSAFE_componentWillUpdate == "function" && _.UNSAFE_componentWillUpdate(f, ht, V)), typeof _.componentDidUpdate == "function" && (a.flags |= 4), typeof _.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof _.componentDidUpdate != "function" || U === r.memoizedProps && ke === r.memoizedState || (a.flags |= 4), typeof _.getSnapshotBeforeUpdate != "function" || U === r.memoizedProps && ke === r.memoizedState || (a.flags |= 1024), a.memoizedProps = f, a.memoizedState = ht), _.props = f, _.state = ht, _.context = V, f = ue) : (typeof _.componentDidUpdate != "function" || U === r.memoizedProps && ke === r.memoizedState || (a.flags |= 4), typeof _.getSnapshotBeforeUpdate != "function" || U === r.memoizedProps && ke === r.memoizedState || (a.flags |= 1024), f = !1);
    }
    return Qs(r, a, u, f, S, y);
  }
  function Qs(r, a, u, f, y, S) {
    lv(r, a);
    var _ = (a.flags & 128) !== 0;
    if (!f && !_) return y && Bc(a, u, !1), Mi(r, a, S);
    f = a.stateNode, Ws.current = a;
    var U = _ && typeof u.getDerivedStateFromError != "function" ? null : f.render();
    return a.flags |= 1, r !== null && _ ? (a.child = Rr(a, r.child, null, S), a.child = Rr(a, null, U, S)) : ea(r, a, U, S), a.memoizedState = f.state, y && Bc(a, u, !0), a.child;
  }
  function Vu(r) {
    var a = r.stateNode;
    a.pendingContext ? ih(r, a.pendingContext, a.pendingContext !== a.context) : a.context && ih(r, a.context, !1), Zd(r, a.containerInfo);
  }
  function Sh(r, a, u, f, y) {
    return lo(), kl(y), a.flags |= 256, ea(r, a, u, f), a.child;
  }
  var Tf = { dehydrated: null, treeContext: null, retryLane: 0 };
  function ov(r) {
    return { baseLanes: r, cachePool: null, transitions: null };
  }
  function Rf(r, a, u) {
    var f = a.pendingProps, y = yr.current, S = !1, _ = (a.flags & 128) !== 0, U;
    if ((U = _) || (U = r !== null && r.memoizedState === null ? !1 : (y & 2) !== 0), U ? (S = !0, a.flags &= -129) : (r === null || r.memoizedState !== null) && (y |= 1), Mt(yr, y & 1), r === null)
      return qd(a), r = a.memoizedState, r !== null && (r = r.dehydrated, r !== null) ? ((a.mode & 1) === 0 ? a.lanes = 1 : r.data === "$!" ? a.lanes = 8 : a.lanes = 1073741824, null) : (_ = f.children, r = f.fallback, S ? (f = a.mode, S = a.child, _ = { mode: "hidden", children: _ }, (f & 1) === 0 && S !== null ? (S.childLanes = 0, S.pendingProps = _) : S = mo(_, f, 0, null), r = Nl(r, f, u, null), S.return = a, r.return = a, S.sibling = r, a.child = S, a.child.memoizedState = ov(u), a.memoizedState = Tf, r) : uv(a, _));
    if (y = r.memoizedState, y !== null && (U = y.dehydrated, U !== null)) return Eh(r, a, _, f, U, y, u);
    if (S) {
      S = f.fallback, _ = a.mode, y = r.child, U = y.sibling;
      var V = { mode: "hidden", children: f.children };
      return (_ & 1) === 0 && a.child !== y ? (f = a.child, f.childLanes = 0, f.pendingProps = V, a.deletions = null) : (f = ho(y, V), f.subtreeFlags = y.subtreeFlags & 14680064), U !== null ? S = ho(U, S) : (S = Nl(S, _, u, null), S.flags |= 2), S.return = a, f.return = a, f.sibling = S, a.child = f, f = S, S = a.child, _ = r.child.memoizedState, _ = _ === null ? ov(u) : { baseLanes: _.baseLanes | u, cachePool: null, transitions: _.transitions }, S.memoizedState = _, S.childLanes = r.childLanes & ~u, a.memoizedState = Tf, f;
    }
    return S = r.child, r = S.sibling, f = ho(S, { mode: "visible", children: f.children }), (a.mode & 1) === 0 && (f.lanes = u), f.return = a, f.sibling = null, r !== null && (u = a.deletions, u === null ? (a.deletions = [r], a.flags |= 16) : u.push(r)), a.child = f, a.memoizedState = null, f;
  }
  function uv(r, a) {
    return a = mo({ mode: "visible", children: a }, r.mode, 0, null), a.return = r, r.child = a;
  }
  function Gs(r, a, u, f) {
    return f !== null && kl(f), Rr(a, r.child, null, u), r = uv(a, a.pendingProps.children), r.flags |= 2, a.memoizedState = null, r;
  }
  function Eh(r, a, u, f, y, S, _) {
    if (u)
      return a.flags & 256 ? (a.flags &= -257, f = nv(Error(s(422))), Gs(r, a, _, f)) : a.memoizedState !== null ? (a.child = r.child, a.flags |= 128, null) : (S = f.fallback, y = a.mode, f = mo({ mode: "visible", children: f.children }, y, 0, null), S = Nl(S, y, _, null), S.flags |= 2, f.return = a, S.return = a, f.sibling = S, a.child = f, (a.mode & 1) !== 0 && Rr(a, r.child, null, _), a.child.memoizedState = ov(_), a.memoizedState = Tf, S);
    if ((a.mode & 1) === 0) return Gs(r, a, _, null);
    if (y.data === "$!") {
      if (f = y.nextSibling && y.nextSibling.dataset, f) var U = f.dgst;
      return f = U, S = Error(s(419)), f = nv(S, f, void 0), Gs(r, a, _, f);
    }
    if (U = (_ & r.childLanes) !== 0, Nr || U) {
      if (f = qr, f !== null) {
        switch (_ & -_) {
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
        y = (y & (f.suspendedLanes | _)) !== 0 ? 0 : y, y !== 0 && y !== S.retryLane && (S.retryLane = y, ii(r, y), xa(f, r, y, -1));
      }
      return gv(), f = nv(Error(s(421))), Gs(r, a, _, f);
    }
    return y.data === "$?" ? (a.flags |= 128, a.child = r.child, a = n0.bind(null, r), y._reactRetry = a, null) : (r = S.treeContext, $a = el(y.nextSibling), Pa = a, fr = !0, Ri = null, r !== null && (Lr[Ti++] = al, Lr[Ti++] = il, Lr[Ti++] = ri, al = r.id, il = r.overflow, ri = a), a = uv(a, f.children), a.flags |= 4096, a);
  }
  function sv(r, a, u) {
    r.lanes |= a;
    var f = r.alternate;
    f !== null && (f.lanes |= a), Bd(r.return, a, u);
  }
  function Ta(r, a, u, f, y) {
    var S = r.memoizedState;
    S === null ? r.memoizedState = { isBackwards: a, rendering: null, renderingStartTime: 0, last: f, tail: u, tailMode: y } : (S.isBackwards = a, S.rendering = null, S.renderingStartTime = 0, S.last = f, S.tail = u, S.tailMode = y);
  }
  function ol(r, a, u) {
    var f = a.pendingProps, y = f.revealOrder, S = f.tail;
    if (ea(r, a, f.children, u), f = yr.current, (f & 2) !== 0) f = f & 1 | 2, a.flags |= 128;
    else {
      if (r !== null && (r.flags & 128) !== 0) e: for (r = a.child; r !== null; ) {
        if (r.tag === 13) r.memoizedState !== null && sv(r, u, a);
        else if (r.tag === 19) sv(r, u, a);
        else if (r.child !== null) {
          r.child.return = r, r = r.child;
          continue;
        }
        if (r === a) break e;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === a) break e;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
      f &= 1;
    }
    if (Mt(yr, f), (a.mode & 1) === 0) a.memoizedState = null;
    else switch (y) {
      case "forwards":
        for (u = a.child, y = null; u !== null; ) r = u.alternate, r !== null && tf(r) === null && (y = u), u = u.sibling;
        u = y, u === null ? (y = a.child, a.child = null) : (y = u.sibling, u.sibling = null), Ta(a, !1, y, u, S);
        break;
      case "backwards":
        for (u = null, y = a.child, a.child = null; y !== null; ) {
          if (r = y.alternate, r !== null && tf(r) === null) {
            a.child = y;
            break;
          }
          r = y.sibling, y.sibling = u, u = y, y = r;
        }
        Ta(a, !0, u, null, S);
        break;
      case "together":
        Ta(a, !1, null, null, void 0);
        break;
      default:
        a.memoizedState = null;
    }
    return a.child;
  }
  function xi(r, a) {
    (a.mode & 1) === 0 && r !== null && (r.alternate = null, a.alternate = null, a.flags |= 2);
  }
  function Mi(r, a, u) {
    if (r !== null && (a.dependencies = r.dependencies), cl |= a.lanes, (u & a.childLanes) === 0) return null;
    if (r !== null && a.child !== r.child) throw Error(s(153));
    if (a.child !== null) {
      for (r = a.child, u = ho(r, r.pendingProps), a.child = u, u.return = a; r.sibling !== null; ) r = r.sibling, u = u.sibling = ho(r, r.pendingProps), u.return = a;
      u.sibling = null;
    }
    return a.child;
  }
  function Xs(r, a, u) {
    switch (a.tag) {
      case 3:
        Vu(a), lo();
        break;
      case 5:
        fh(a);
        break;
      case 1:
        zr(a.type) && Yr(a);
        break;
      case 4:
        Zd(a, a.stateNode.containerInfo);
        break;
      case 10:
        var f = a.type._context, y = a.memoizedProps.value;
        Mt(ai, f._currentValue), f._currentValue = y;
        break;
      case 13:
        if (f = a.memoizedState, f !== null)
          return f.dehydrated !== null ? (Mt(yr, yr.current & 1), a.flags |= 128, null) : (u & a.child.childLanes) !== 0 ? Rf(r, a, u) : (Mt(yr, yr.current & 1), r = Mi(r, a, u), r !== null ? r.sibling : null);
        Mt(yr, yr.current & 1);
        break;
      case 19:
        if (f = (u & a.childLanes) !== 0, (r.flags & 128) !== 0) {
          if (f) return ol(r, a, u);
          a.flags |= 128;
        }
        if (y = a.memoizedState, y !== null && (y.rendering = null, y.tail = null, y.lastEffect = null), Mt(yr, yr.current), f) break;
        return null;
      case 22:
      case 23:
        return a.lanes = 0, Bs(r, a, u);
    }
    return Mi(r, a, u);
  }
  var _i, Ur, Ch, wh;
  _i = function(r, a) {
    for (var u = a.child; u !== null; ) {
      if (u.tag === 5 || u.tag === 6) r.appendChild(u.stateNode);
      else if (u.tag !== 4 && u.child !== null) {
        u.child.return = u, u = u.child;
        continue;
      }
      if (u === a) break;
      for (; u.sibling === null; ) {
        if (u.return === null || u.return === a) return;
        u = u.return;
      }
      u.sibling.return = u.return, u = u.sibling;
    }
  }, Ur = function() {
  }, Ch = function(r, a, u, f) {
    var y = r.memoizedProps;
    if (y !== f) {
      r = a.stateNode, Wo(ll.current);
      var S = null;
      switch (u) {
        case "input":
          y = ve(r, y), f = ve(r, f), S = [];
          break;
        case "select":
          y = Te({}, y, { value: void 0 }), f = Te({}, f, { value: void 0 }), S = [];
          break;
        case "textarea":
          y = gt(r, y), f = gt(r, f), S = [];
          break;
        default:
          typeof y.onClick != "function" && typeof f.onClick == "function" && (r.onclick = eo);
      }
      Qt(u, f);
      var _;
      u = null;
      for (ue in y) if (!f.hasOwnProperty(ue) && y.hasOwnProperty(ue) && y[ue] != null) if (ue === "style") {
        var U = y[ue];
        for (_ in U) U.hasOwnProperty(_) && (u || (u = {}), u[_] = "");
      } else ue !== "dangerouslySetInnerHTML" && ue !== "children" && ue !== "suppressContentEditableWarning" && ue !== "suppressHydrationWarning" && ue !== "autoFocus" && (h.hasOwnProperty(ue) ? S || (S = []) : (S = S || []).push(ue, null));
      for (ue in f) {
        var V = f[ue];
        if (U = y?.[ue], f.hasOwnProperty(ue) && V !== U && (V != null || U != null)) if (ue === "style") if (U) {
          for (_ in U) !U.hasOwnProperty(_) || V && V.hasOwnProperty(_) || (u || (u = {}), u[_] = "");
          for (_ in V) V.hasOwnProperty(_) && U[_] !== V[_] && (u || (u = {}), u[_] = V[_]);
        } else u || (S || (S = []), S.push(
          ue,
          u
        )), u = V;
        else ue === "dangerouslySetInnerHTML" ? (V = V ? V.__html : void 0, U = U ? U.__html : void 0, V != null && U !== V && (S = S || []).push(ue, V)) : ue === "children" ? typeof V != "string" && typeof V != "number" || (S = S || []).push(ue, "" + V) : ue !== "suppressContentEditableWarning" && ue !== "suppressHydrationWarning" && (h.hasOwnProperty(ue) ? (V != null && ue === "onScroll" && Yn("scroll", r), S || U === V || (S = [])) : (S = S || []).push(ue, V));
      }
      u && (S = S || []).push("style", u);
      var ue = S;
      (a.updateQueue = ue) && (a.flags |= 4);
    }
  }, wh = function(r, a, u, f) {
    u !== f && (a.flags |= 4);
  };
  function Ks(r, a) {
    if (!fr) switch (r.tailMode) {
      case "hidden":
        a = r.tail;
        for (var u = null; a !== null; ) a.alternate !== null && (u = a), a = a.sibling;
        u === null ? r.tail = null : u.sibling = null;
        break;
      case "collapsed":
        u = r.tail;
        for (var f = null; u !== null; ) u.alternate !== null && (f = u), u = u.sibling;
        f === null ? a || r.tail === null ? r.tail = null : r.tail.sibling = null : f.sibling = null;
    }
  }
  function Br(r) {
    var a = r.alternate !== null && r.alternate.child === r.child, u = 0, f = 0;
    if (a) for (var y = r.child; y !== null; ) u |= y.lanes | y.childLanes, f |= y.subtreeFlags & 14680064, f |= y.flags & 14680064, y.return = r, y = y.sibling;
    else for (y = r.child; y !== null; ) u |= y.lanes | y.childLanes, f |= y.subtreeFlags, f |= y.flags, y.return = r, y = y.sibling;
    return r.subtreeFlags |= f, r.childLanes = u, a;
  }
  function Th(r, a, u) {
    var f = a.pendingProps;
    switch (Xc(a), a.tag) {
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
        return Br(a), null;
      case 1:
        return zr(a.type) && ju(), Br(a), null;
      case 3:
        return f = a.stateNode, Bo(), or($r), or(wr), Ot(), f.pendingContext && (f.context = f.pendingContext, f.pendingContext = null), (r === null || r.child === null) && (Kc(a) ? a.flags |= 4 : r === null || r.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, Ri !== null && (au(Ri), Ri = null))), Ur(r, a), Br(a), null;
      case 5:
        ef(a);
        var y = Wo(Us.current);
        if (u = a.type, r !== null && a.stateNode != null) Ch(r, a, u, f, y), r.ref !== a.ref && (a.flags |= 512, a.flags |= 2097152);
        else {
          if (!f) {
            if (a.stateNode === null) throw Error(s(166));
            return Br(a), null;
          }
          if (r = Wo(ll.current), Kc(a)) {
            f = a.stateNode, u = a.type;
            var S = a.memoizedProps;
            switch (f[tl] = a, f[ks] = S, r = (a.mode & 1) !== 0, u) {
              case "dialog":
                Yn("cancel", f), Yn("close", f);
                break;
              case "iframe":
              case "object":
              case "embed":
                Yn("load", f);
                break;
              case "video":
              case "audio":
                for (y = 0; y < xs.length; y++) Yn(xs[y], f);
                break;
              case "source":
                Yn("error", f);
                break;
              case "img":
              case "image":
              case "link":
                Yn(
                  "error",
                  f
                ), Yn("load", f);
                break;
              case "details":
                Yn("toggle", f);
                break;
              case "input":
                Pe(f, S), Yn("invalid", f);
                break;
              case "select":
                f._wrapperState = { wasMultiple: !!S.multiple }, Yn("invalid", f);
                break;
              case "textarea":
                wt(f, S), Yn("invalid", f);
            }
            Qt(u, S), y = null;
            for (var _ in S) if (S.hasOwnProperty(_)) {
              var U = S[_];
              _ === "children" ? typeof U == "string" ? f.textContent !== U && (S.suppressHydrationWarning !== !0 && qc(f.textContent, U, r), y = ["children", U]) : typeof U == "number" && f.textContent !== "" + U && (S.suppressHydrationWarning !== !0 && qc(
                f.textContent,
                U,
                r
              ), y = ["children", "" + U]) : h.hasOwnProperty(_) && U != null && _ === "onScroll" && Yn("scroll", f);
            }
            switch (u) {
              case "input":
                Ze(f), Fe(f, S, !0);
                break;
              case "textarea":
                Ze(f), $e(f);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof S.onClick == "function" && (f.onclick = eo);
            }
            f = y, a.updateQueue = f, f !== null && (a.flags |= 4);
          } else {
            _ = y.nodeType === 9 ? y : y.ownerDocument, r === "http://www.w3.org/1999/xhtml" && (r = cn(u)), r === "http://www.w3.org/1999/xhtml" ? u === "script" ? (r = _.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(r.firstChild)) : typeof f.is == "string" ? r = _.createElement(u, { is: f.is }) : (r = _.createElement(u), u === "select" && (_ = r, f.multiple ? _.multiple = !0 : f.size && (_.size = f.size))) : r = _.createElementNS(r, u), r[tl] = a, r[ks] = f, _i(r, a, !1, !1), a.stateNode = r;
            e: {
              switch (_ = Cn(u, f), u) {
                case "dialog":
                  Yn("cancel", r), Yn("close", r), y = f;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Yn("load", r), y = f;
                  break;
                case "video":
                case "audio":
                  for (y = 0; y < xs.length; y++) Yn(xs[y], r);
                  y = f;
                  break;
                case "source":
                  Yn("error", r), y = f;
                  break;
                case "img":
                case "image":
                case "link":
                  Yn(
                    "error",
                    r
                  ), Yn("load", r), y = f;
                  break;
                case "details":
                  Yn("toggle", r), y = f;
                  break;
                case "input":
                  Pe(r, f), y = ve(r, f), Yn("invalid", r);
                  break;
                case "option":
                  y = f;
                  break;
                case "select":
                  r._wrapperState = { wasMultiple: !!f.multiple }, y = Te({}, f, { value: void 0 }), Yn("invalid", r);
                  break;
                case "textarea":
                  wt(r, f), y = gt(r, f), Yn("invalid", r);
                  break;
                default:
                  y = f;
              }
              Qt(u, y), U = y;
              for (S in U) if (U.hasOwnProperty(S)) {
                var V = U[S];
                S === "style" ? Tt(r, V) : S === "dangerouslySetInnerHTML" ? (V = V ? V.__html : void 0, V != null && _n(r, V)) : S === "children" ? typeof V == "string" ? (u !== "textarea" || V !== "") && xe(r, V) : typeof V == "number" && xe(r, "" + V) : S !== "suppressContentEditableWarning" && S !== "suppressHydrationWarning" && S !== "autoFocus" && (h.hasOwnProperty(S) ? V != null && S === "onScroll" && Yn("scroll", r) : V != null && Y(r, S, V, _));
              }
              switch (u) {
                case "input":
                  Ze(r), Fe(r, f, !1);
                  break;
                case "textarea":
                  Ze(r), $e(r);
                  break;
                case "option":
                  f.value != null && r.setAttribute("value", "" + qe(f.value));
                  break;
                case "select":
                  r.multiple = !!f.multiple, S = f.value, S != null ? Xe(r, !!f.multiple, S, !1) : f.defaultValue != null && Xe(
                    r,
                    !!f.multiple,
                    f.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof y.onClick == "function" && (r.onclick = eo);
              }
              switch (u) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  f = !!f.autoFocus;
                  break e;
                case "img":
                  f = !0;
                  break e;
                default:
                  f = !1;
              }
            }
            f && (a.flags |= 4);
          }
          a.ref !== null && (a.flags |= 512, a.flags |= 2097152);
        }
        return Br(a), null;
      case 6:
        if (r && a.stateNode != null) wh(r, a, r.memoizedProps, f);
        else {
          if (typeof f != "string" && a.stateNode === null) throw Error(s(166));
          if (u = Wo(Us.current), Wo(ll.current), Kc(a)) {
            if (f = a.stateNode, u = a.memoizedProps, f[tl] = a, (S = f.nodeValue !== u) && (r = Pa, r !== null)) switch (r.tag) {
              case 3:
                qc(f.nodeValue, u, (r.mode & 1) !== 0);
                break;
              case 5:
                r.memoizedProps.suppressHydrationWarning !== !0 && qc(f.nodeValue, u, (r.mode & 1) !== 0);
            }
            S && (a.flags |= 4);
          } else f = (u.nodeType === 9 ? u : u.ownerDocument).createTextNode(f), f[tl] = a, a.stateNode = f;
        }
        return Br(a), null;
      case 13:
        if (or(yr), f = a.memoizedState, r === null || r.memoizedState !== null && r.memoizedState.dehydrated !== null) {
          if (fr && $a !== null && (a.mode & 1) !== 0 && (a.flags & 128) === 0) zs(), lo(), a.flags |= 98560, S = !1;
          else if (S = Kc(a), f !== null && f.dehydrated !== null) {
            if (r === null) {
              if (!S) throw Error(s(318));
              if (S = a.memoizedState, S = S !== null ? S.dehydrated : null, !S) throw Error(s(317));
              S[tl] = a;
            } else lo(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            Br(a), S = !1;
          } else Ri !== null && (au(Ri), Ri = null), S = !0;
          if (!S) return a.flags & 65536 ? a : null;
        }
        return (a.flags & 128) !== 0 ? (a.lanes = u, a) : (f = f !== null, f !== (r !== null && r.memoizedState !== null) && f && (a.child.flags |= 8192, (a.mode & 1) !== 0 && (r === null || (yr.current & 1) !== 0 ? Mr === 0 && (Mr = 3) : gv())), a.updateQueue !== null && (a.flags |= 4), Br(a), null);
      case 4:
        return Bo(), Ur(r, a), r === null && zu(a.stateNode.containerInfo), Br(a), null;
      case 10:
        return Wd(a.type._context), Br(a), null;
      case 17:
        return zr(a.type) && ju(), Br(a), null;
      case 19:
        if (or(yr), S = a.memoizedState, S === null) return Br(a), null;
        if (f = (a.flags & 128) !== 0, _ = S.rendering, _ === null) if (f) Ks(S, !1);
        else {
          if (Mr !== 0 || r !== null && (r.flags & 128) !== 0) for (r = a.child; r !== null; ) {
            if (_ = tf(r), _ !== null) {
              for (a.flags |= 128, Ks(S, !1), f = _.updateQueue, f !== null && (a.updateQueue = f, a.flags |= 4), a.subtreeFlags = 0, f = u, u = a.child; u !== null; ) S = u, r = f, S.flags &= 14680066, _ = S.alternate, _ === null ? (S.childLanes = 0, S.lanes = r, S.child = null, S.subtreeFlags = 0, S.memoizedProps = null, S.memoizedState = null, S.updateQueue = null, S.dependencies = null, S.stateNode = null) : (S.childLanes = _.childLanes, S.lanes = _.lanes, S.child = _.child, S.subtreeFlags = 0, S.deletions = null, S.memoizedProps = _.memoizedProps, S.memoizedState = _.memoizedState, S.updateQueue = _.updateQueue, S.type = _.type, r = _.dependencies, S.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }), u = u.sibling;
              return Mt(yr, yr.current & 1 | 2), a.child;
            }
            r = r.sibling;
          }
          S.tail !== null && Rt() > Wu && (a.flags |= 128, f = !0, Ks(S, !1), a.lanes = 4194304);
        }
        else {
          if (!f) if (r = tf(_), r !== null) {
            if (a.flags |= 128, f = !0, u = r.updateQueue, u !== null && (a.updateQueue = u, a.flags |= 4), Ks(S, !0), S.tail === null && S.tailMode === "hidden" && !_.alternate && !fr) return Br(a), null;
          } else 2 * Rt() - S.renderingStartTime > Wu && u !== 1073741824 && (a.flags |= 128, f = !0, Ks(S, !1), a.lanes = 4194304);
          S.isBackwards ? (_.sibling = a.child, a.child = _) : (u = S.last, u !== null ? u.sibling = _ : a.child = _, S.last = _);
        }
        return S.tail !== null ? (a = S.tail, S.rendering = a, S.tail = a.sibling, S.renderingStartTime = Rt(), a.sibling = null, u = yr.current, Mt(yr, f ? u & 1 | 2 : u & 1), a) : (Br(a), null);
      case 22:
      case 23:
        return yv(), f = a.memoizedState !== null, r !== null && r.memoizedState !== null !== f && (a.flags |= 8192), f && (a.mode & 1) !== 0 ? (oi & 1073741824) !== 0 && (Br(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : Br(a), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, a.tag));
  }
  function bf(r, a) {
    switch (Xc(a), a.tag) {
      case 1:
        return zr(a.type) && ju(), r = a.flags, r & 65536 ? (a.flags = r & -65537 | 128, a) : null;
      case 3:
        return Bo(), or($r), or(wr), Ot(), r = a.flags, (r & 65536) !== 0 && (r & 128) === 0 ? (a.flags = r & -65537 | 128, a) : null;
      case 5:
        return ef(a), null;
      case 13:
        if (or(yr), r = a.memoizedState, r !== null && r.dehydrated !== null) {
          if (a.alternate === null) throw Error(s(340));
          lo();
        }
        return r = a.flags, r & 65536 ? (a.flags = r & -65537 | 128, a) : null;
      case 19:
        return or(yr), null;
      case 4:
        return Bo(), null;
      case 10:
        return Wd(a.type._context), null;
      case 22:
      case 23:
        return yv(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Zs = !1, ga = !1, Gy = typeof WeakSet == "function" ? WeakSet : Set, st = null;
  function qu(r, a) {
    var u = r.ref;
    if (u !== null) if (typeof u == "function") try {
      u(null);
    } catch (f) {
      dr(r, a, f);
    }
    else u.current = null;
  }
  function xf(r, a, u) {
    try {
      u();
    } catch (f) {
      dr(r, a, f);
    }
  }
  var Rh = !1;
  function bh(r, a) {
    if (_s = Si, r = Rs(), Nc(r)) {
      if ("selectionStart" in r) var u = { start: r.selectionStart, end: r.selectionEnd };
      else e: {
        u = (u = r.ownerDocument) && u.defaultView || window;
        var f = u.getSelection && u.getSelection();
        if (f && f.rangeCount !== 0) {
          u = f.anchorNode;
          var y = f.anchorOffset, S = f.focusNode;
          f = f.focusOffset;
          try {
            u.nodeType, S.nodeType;
          } catch {
            u = null;
            break e;
          }
          var _ = 0, U = -1, V = -1, ue = 0, Oe = 0, Le = r, ke = null;
          t: for (; ; ) {
            for (var lt; Le !== u || y !== 0 && Le.nodeType !== 3 || (U = _ + y), Le !== S || f !== 0 && Le.nodeType !== 3 || (V = _ + f), Le.nodeType === 3 && (_ += Le.nodeValue.length), (lt = Le.firstChild) !== null; )
              ke = Le, Le = lt;
            for (; ; ) {
              if (Le === r) break t;
              if (ke === u && ++ue === y && (U = _), ke === S && ++Oe === f && (V = _), (lt = Le.nextSibling) !== null) break;
              Le = ke, ke = Le.parentNode;
            }
            Le = lt;
          }
          u = U === -1 || V === -1 ? null : { start: U, end: V };
        } else u = null;
      }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (Po = { focusedElem: r, selectionRange: u }, Si = !1, st = a; st !== null; ) if (a = st, r = a.child, (a.subtreeFlags & 1028) !== 0 && r !== null) r.return = a, st = r;
    else for (; st !== null; ) {
      a = st;
      try {
        var ht = a.alternate;
        if ((a.flags & 1024) !== 0) switch (a.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (ht !== null) {
              var St = ht.memoizedProps, _r = ht.memoizedState, J = a.stateNode, W = J.getSnapshotBeforeUpdate(a.elementType === a.type ? St : Vi(a.type, St), _r);
              J.__reactInternalSnapshotBeforeUpdate = W;
            }
            break;
          case 3:
            var ne = a.stateNode.containerInfo;
            ne.nodeType === 1 ? ne.textContent = "" : ne.nodeType === 9 && ne.documentElement && ne.removeChild(ne.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(s(163));
        }
      } catch (ze) {
        dr(a, a.return, ze);
      }
      if (r = a.sibling, r !== null) {
        r.return = a.return, st = r;
        break;
      }
      st = a.return;
    }
    return ht = Rh, Rh = !1, ht;
  }
  function Js(r, a, u) {
    var f = a.updateQueue;
    if (f = f !== null ? f.lastEffect : null, f !== null) {
      var y = f = f.next;
      do {
        if ((y.tag & r) === r) {
          var S = y.destroy;
          y.destroy = void 0, S !== void 0 && xf(a, u, S);
        }
        y = y.next;
      } while (y !== f);
    }
  }
  function ec(r, a) {
    if (a = a.updateQueue, a = a !== null ? a.lastEffect : null, a !== null) {
      var u = a = a.next;
      do {
        if ((u.tag & r) === r) {
          var f = u.create;
          u.destroy = f();
        }
        u = u.next;
      } while (u !== a);
    }
  }
  function cv(r) {
    var a = r.ref;
    if (a !== null) {
      var u = r.stateNode;
      r.tag, r = u, typeof a == "function" ? a(r) : a.current = r;
    }
  }
  function Mf(r) {
    var a = r.alternate;
    a !== null && (r.alternate = null, Mf(a)), r.child = null, r.deletions = null, r.sibling = null, r.tag === 5 && (a = r.stateNode, a !== null && (delete a[tl], delete a[ks], delete a[Ds], delete a[Uu], delete a[By])), r.stateNode = null, r.return = null, r.dependencies = null, r.memoizedProps = null, r.memoizedState = null, r.pendingProps = null, r.stateNode = null, r.updateQueue = null;
  }
  function tc(r) {
    return r.tag === 5 || r.tag === 3 || r.tag === 4;
  }
  function zl(r) {
    e: for (; ; ) {
      for (; r.sibling === null; ) {
        if (r.return === null || tc(r.return)) return null;
        r = r.return;
      }
      for (r.sibling.return = r.return, r = r.sibling; r.tag !== 5 && r.tag !== 6 && r.tag !== 18; ) {
        if (r.flags & 2 || r.child === null || r.tag === 4) continue e;
        r.child.return = r, r = r.child;
      }
      if (!(r.flags & 2)) return r.stateNode;
    }
  }
  function ul(r, a, u) {
    var f = r.tag;
    if (f === 5 || f === 6) r = r.stateNode, a ? u.nodeType === 8 ? u.parentNode.insertBefore(r, a) : u.insertBefore(r, a) : (u.nodeType === 8 ? (a = u.parentNode, a.insertBefore(r, u)) : (a = u, a.appendChild(r)), u = u._reactRootContainer, u != null || a.onclick !== null || (a.onclick = eo));
    else if (f !== 4 && (r = r.child, r !== null)) for (ul(r, a, u), r = r.sibling; r !== null; ) ul(r, a, u), r = r.sibling;
  }
  function sl(r, a, u) {
    var f = r.tag;
    if (f === 5 || f === 6) r = r.stateNode, a ? u.insertBefore(r, a) : u.appendChild(r);
    else if (f !== 4 && (r = r.child, r !== null)) for (sl(r, a, u), r = r.sibling; r !== null; ) sl(r, a, u), r = r.sibling;
  }
  var xr = null, Ra = !1;
  function ba(r, a, u) {
    for (u = u.child; u !== null; ) xh(r, a, u), u = u.sibling;
  }
  function xh(r, a, u) {
    if (Xn && typeof Xn.onCommitFiberUnmount == "function") try {
      Xn.onCommitFiberUnmount(ir, u);
    } catch {
    }
    switch (u.tag) {
      case 5:
        ga || qu(u, a);
      case 6:
        var f = xr, y = Ra;
        xr = null, ba(r, a, u), xr = f, Ra = y, xr !== null && (Ra ? (r = xr, u = u.stateNode, r.nodeType === 8 ? r.parentNode.removeChild(u) : r.removeChild(u)) : xr.removeChild(u.stateNode));
        break;
      case 18:
        xr !== null && (Ra ? (r = xr, u = u.stateNode, r.nodeType === 8 ? Nu(r.parentNode, u) : r.nodeType === 1 && Nu(r, u), ji(r)) : Nu(xr, u.stateNode));
        break;
      case 4:
        f = xr, y = Ra, xr = u.stateNode.containerInfo, Ra = !0, ba(r, a, u), xr = f, Ra = y;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!ga && (f = u.updateQueue, f !== null && (f = f.lastEffect, f !== null))) {
          y = f = f.next;
          do {
            var S = y, _ = S.destroy;
            S = S.tag, _ !== void 0 && ((S & 2) !== 0 || (S & 4) !== 0) && xf(u, a, _), y = y.next;
          } while (y !== f);
        }
        ba(r, a, u);
        break;
      case 1:
        if (!ga && (qu(u, a), f = u.stateNode, typeof f.componentWillUnmount == "function")) try {
          f.props = u.memoizedProps, f.state = u.memoizedState, f.componentWillUnmount();
        } catch (U) {
          dr(u, a, U);
        }
        ba(r, a, u);
        break;
      case 21:
        ba(r, a, u);
        break;
      case 22:
        u.mode & 1 ? (ga = (f = ga) || u.memoizedState !== null, ba(r, a, u), ga = f) : ba(r, a, u);
        break;
      default:
        ba(r, a, u);
    }
  }
  function Mh(r) {
    var a = r.updateQueue;
    if (a !== null) {
      r.updateQueue = null;
      var u = r.stateNode;
      u === null && (u = r.stateNode = new Gy()), a.forEach(function(f) {
        var y = Uh.bind(null, r, f);
        u.has(f) || (u.add(f), f.then(y, y));
      });
    }
  }
  function qi(r, a) {
    var u = a.deletions;
    if (u !== null) for (var f = 0; f < u.length; f++) {
      var y = u[f];
      try {
        var S = r, _ = a, U = _;
        e: for (; U !== null; ) {
          switch (U.tag) {
            case 5:
              xr = U.stateNode, Ra = !1;
              break e;
            case 3:
              xr = U.stateNode.containerInfo, Ra = !0;
              break e;
            case 4:
              xr = U.stateNode.containerInfo, Ra = !0;
              break e;
          }
          U = U.return;
        }
        if (xr === null) throw Error(s(160));
        xh(S, _, y), xr = null, Ra = !1;
        var V = y.alternate;
        V !== null && (V.return = null), y.return = null;
      } catch (ue) {
        dr(y, a, ue);
      }
    }
    if (a.subtreeFlags & 12854) for (a = a.child; a !== null; ) fv(a, r), a = a.sibling;
  }
  function fv(r, a) {
    var u = r.alternate, f = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (qi(a, r), Ya(r), f & 4) {
          try {
            Js(3, r, r.return), ec(3, r);
          } catch (St) {
            dr(r, r.return, St);
          }
          try {
            Js(5, r, r.return);
          } catch (St) {
            dr(r, r.return, St);
          }
        }
        break;
      case 1:
        qi(a, r), Ya(r), f & 512 && u !== null && qu(u, u.return);
        break;
      case 5:
        if (qi(a, r), Ya(r), f & 512 && u !== null && qu(u, u.return), r.flags & 32) {
          var y = r.stateNode;
          try {
            xe(y, "");
          } catch (St) {
            dr(r, r.return, St);
          }
        }
        if (f & 4 && (y = r.stateNode, y != null)) {
          var S = r.memoizedProps, _ = u !== null ? u.memoizedProps : S, U = r.type, V = r.updateQueue;
          if (r.updateQueue = null, V !== null) try {
            U === "input" && S.type === "radio" && S.name != null && be(y, S), Cn(U, _);
            var ue = Cn(U, S);
            for (_ = 0; _ < V.length; _ += 2) {
              var Oe = V[_], Le = V[_ + 1];
              Oe === "style" ? Tt(y, Le) : Oe === "dangerouslySetInnerHTML" ? _n(y, Le) : Oe === "children" ? xe(y, Le) : Y(y, Oe, Le, ue);
            }
            switch (U) {
              case "input":
                Be(y, S);
                break;
              case "textarea":
                sn(y, S);
                break;
              case "select":
                var ke = y._wrapperState.wasMultiple;
                y._wrapperState.wasMultiple = !!S.multiple;
                var lt = S.value;
                lt != null ? Xe(y, !!S.multiple, lt, !1) : ke !== !!S.multiple && (S.defaultValue != null ? Xe(
                  y,
                  !!S.multiple,
                  S.defaultValue,
                  !0
                ) : Xe(y, !!S.multiple, S.multiple ? [] : "", !1));
            }
            y[ks] = S;
          } catch (St) {
            dr(r, r.return, St);
          }
        }
        break;
      case 6:
        if (qi(a, r), Ya(r), f & 4) {
          if (r.stateNode === null) throw Error(s(162));
          y = r.stateNode, S = r.memoizedProps;
          try {
            y.nodeValue = S;
          } catch (St) {
            dr(r, r.return, St);
          }
        }
        break;
      case 3:
        if (qi(a, r), Ya(r), f & 4 && u !== null && u.memoizedState.isDehydrated) try {
          ji(a.containerInfo);
        } catch (St) {
          dr(r, r.return, St);
        }
        break;
      case 4:
        qi(a, r), Ya(r);
        break;
      case 13:
        qi(a, r), Ya(r), y = r.child, y.flags & 8192 && (S = y.memoizedState !== null, y.stateNode.isHidden = S, !S || y.alternate !== null && y.alternate.memoizedState !== null || (pv = Rt())), f & 4 && Mh(r);
        break;
      case 22:
        if (Oe = u !== null && u.memoizedState !== null, r.mode & 1 ? (ga = (ue = ga) || Oe, qi(a, r), ga = ue) : qi(a, r), Ya(r), f & 8192) {
          if (ue = r.memoizedState !== null, (r.stateNode.isHidden = ue) && !Oe && (r.mode & 1) !== 0) for (st = r, Oe = r.child; Oe !== null; ) {
            for (Le = st = Oe; st !== null; ) {
              switch (ke = st, lt = ke.child, ke.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Js(4, ke, ke.return);
                  break;
                case 1:
                  qu(ke, ke.return);
                  var ht = ke.stateNode;
                  if (typeof ht.componentWillUnmount == "function") {
                    f = ke, u = ke.return;
                    try {
                      a = f, ht.props = a.memoizedProps, ht.state = a.memoizedState, ht.componentWillUnmount();
                    } catch (St) {
                      dr(f, u, St);
                    }
                  }
                  break;
                case 5:
                  qu(ke, ke.return);
                  break;
                case 22:
                  if (ke.memoizedState !== null) {
                    nc(Le);
                    continue;
                  }
              }
              lt !== null ? (lt.return = ke, st = lt) : nc(Le);
            }
            Oe = Oe.sibling;
          }
          e: for (Oe = null, Le = r; ; ) {
            if (Le.tag === 5) {
              if (Oe === null) {
                Oe = Le;
                try {
                  y = Le.stateNode, ue ? (S = y.style, typeof S.setProperty == "function" ? S.setProperty("display", "none", "important") : S.display = "none") : (U = Le.stateNode, V = Le.memoizedProps.style, _ = V != null && V.hasOwnProperty("display") ? V.display : null, U.style.display = Et("display", _));
                } catch (St) {
                  dr(r, r.return, St);
                }
              }
            } else if (Le.tag === 6) {
              if (Oe === null) try {
                Le.stateNode.nodeValue = ue ? "" : Le.memoizedProps;
              } catch (St) {
                dr(r, r.return, St);
              }
            } else if ((Le.tag !== 22 && Le.tag !== 23 || Le.memoizedState === null || Le === r) && Le.child !== null) {
              Le.child.return = Le, Le = Le.child;
              continue;
            }
            if (Le === r) break e;
            for (; Le.sibling === null; ) {
              if (Le.return === null || Le.return === r) break e;
              Oe === Le && (Oe = null), Le = Le.return;
            }
            Oe === Le && (Oe = null), Le.sibling.return = Le.return, Le = Le.sibling;
          }
        }
        break;
      case 19:
        qi(a, r), Ya(r), f & 4 && Mh(r);
        break;
      case 21:
        break;
      default:
        qi(
          a,
          r
        ), Ya(r);
    }
  }
  function Ya(r) {
    var a = r.flags;
    if (a & 2) {
      try {
        e: {
          for (var u = r.return; u !== null; ) {
            if (tc(u)) {
              var f = u;
              break e;
            }
            u = u.return;
          }
          throw Error(s(160));
        }
        switch (f.tag) {
          case 5:
            var y = f.stateNode;
            f.flags & 32 && (xe(y, ""), f.flags &= -33);
            var S = zl(r);
            sl(r, S, y);
            break;
          case 3:
          case 4:
            var _ = f.stateNode.containerInfo, U = zl(r);
            ul(r, U, _);
            break;
          default:
            throw Error(s(161));
        }
      } catch (V) {
        dr(r, r.return, V);
      }
      r.flags &= -3;
    }
    a & 4096 && (r.flags &= -4097);
  }
  function Xy(r, a, u) {
    st = r, dv(r);
  }
  function dv(r, a, u) {
    for (var f = (r.mode & 1) !== 0; st !== null; ) {
      var y = st, S = y.child;
      if (y.tag === 22 && f) {
        var _ = y.memoizedState !== null || Zs;
        if (!_) {
          var U = y.alternate, V = U !== null && U.memoizedState !== null || ga;
          U = Zs;
          var ue = ga;
          if (Zs = _, (ga = V) && !ue) for (st = y; st !== null; ) _ = st, V = _.child, _.tag === 22 && _.memoizedState !== null ? vv(y) : V !== null ? (V.return = _, st = V) : vv(y);
          for (; S !== null; ) st = S, dv(S), S = S.sibling;
          st = y, Zs = U, ga = ue;
        }
        _h(r);
      } else (y.subtreeFlags & 8772) !== 0 && S !== null ? (S.return = y, st = S) : _h(r);
    }
  }
  function _h(r) {
    for (; st !== null; ) {
      var a = st;
      if ((a.flags & 8772) !== 0) {
        var u = a.alternate;
        try {
          if ((a.flags & 8772) !== 0) switch (a.tag) {
            case 0:
            case 11:
            case 15:
              ga || ec(5, a);
              break;
            case 1:
              var f = a.stateNode;
              if (a.flags & 4 && !ga) if (u === null) f.componentDidMount();
              else {
                var y = a.elementType === a.type ? u.memoizedProps : Vi(a.type, u.memoizedProps);
                f.componentDidUpdate(y, u.memoizedState, f.__reactInternalSnapshotBeforeUpdate);
              }
              var S = a.updateQueue;
              S !== null && Kd(a, S, f);
              break;
            case 3:
              var _ = a.updateQueue;
              if (_ !== null) {
                if (u = null, a.child !== null) switch (a.child.tag) {
                  case 5:
                    u = a.child.stateNode;
                    break;
                  case 1:
                    u = a.child.stateNode;
                }
                Kd(a, _, u);
              }
              break;
            case 5:
              var U = a.stateNode;
              if (u === null && a.flags & 4) {
                u = U;
                var V = a.memoizedProps;
                switch (a.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    V.autoFocus && u.focus();
                    break;
                  case "img":
                    V.src && (u.src = V.src);
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
              if (a.memoizedState === null) {
                var ue = a.alternate;
                if (ue !== null) {
                  var Oe = ue.memoizedState;
                  if (Oe !== null) {
                    var Le = Oe.dehydrated;
                    Le !== null && ji(Le);
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
          ga || a.flags & 512 && cv(a);
        } catch (ke) {
          dr(a, a.return, ke);
        }
      }
      if (a === r) {
        st = null;
        break;
      }
      if (u = a.sibling, u !== null) {
        u.return = a.return, st = u;
        break;
      }
      st = a.return;
    }
  }
  function nc(r) {
    for (; st !== null; ) {
      var a = st;
      if (a === r) {
        st = null;
        break;
      }
      var u = a.sibling;
      if (u !== null) {
        u.return = a.return, st = u;
        break;
      }
      st = a.return;
    }
  }
  function vv(r) {
    for (; st !== null; ) {
      var a = st;
      try {
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            var u = a.return;
            try {
              ec(4, a);
            } catch (V) {
              dr(a, u, V);
            }
            break;
          case 1:
            var f = a.stateNode;
            if (typeof f.componentDidMount == "function") {
              var y = a.return;
              try {
                f.componentDidMount();
              } catch (V) {
                dr(a, y, V);
              }
            }
            var S = a.return;
            try {
              cv(a);
            } catch (V) {
              dr(a, S, V);
            }
            break;
          case 5:
            var _ = a.return;
            try {
              cv(a);
            } catch (V) {
              dr(a, _, V);
            }
        }
      } catch (V) {
        dr(a, a.return, V);
      }
      if (a === r) {
        st = null;
        break;
      }
      var U = a.sibling;
      if (U !== null) {
        U.return = a.return, st = U;
        break;
      }
      st = a.return;
    }
  }
  var Ky = Math.ceil, fo = P.ReactCurrentDispatcher, nu = P.ReactCurrentOwner, ta = P.ReactCurrentBatchConfig, Dn = 0, qr = null, jr = null, na = 0, oi = 0, Iu = wi(0), Mr = 0, rc = null, cl = 0, Yu = 0, _f = 0, ac = null, Wa = null, pv = 0, Wu = 1 / 0, ui = null, Bu = !1, ru = null, vo = null, kf = !1, Ll = null, ic = 0, po = 0, Qu = null, lc = -1, Sa = 0;
  function Fr() {
    return (Dn & 6) !== 0 ? Rt() : lc !== -1 ? lc : lc = Rt();
  }
  function fl(r) {
    return (r.mode & 1) === 0 ? 1 : (Dn & 2) !== 0 && na !== 0 ? na & -na : Qy.transition !== null ? (Sa === 0 && (Sa = Ua()), Sa) : (r = Sn, r !== 0 || (r = window.event, r = r === void 0 ? 16 : Mu(r.type)), r);
  }
  function xa(r, a, u, f) {
    if (50 < po) throw po = 0, Qu = null, Error(s(185));
    Ca(r, u, f), ((Dn & 2) === 0 || r !== qr) && (r === qr && ((Dn & 2) === 0 && (Yu |= u), Mr === 4 && Ii(r, na)), Ba(r, f), u === 1 && Dn === 0 && (a.mode & 1) === 0 && (Wu = Rt() + 500, Fu && rl()));
  }
  function Ba(r, a) {
    var u = r.callbackNode;
    Zr(r, a);
    var f = ei(r, r === qr ? na : 0);
    if (f === 0) u !== null && Nt(u), r.callbackNode = null, r.callbackPriority = 0;
    else if (a = f & -f, r.callbackPriority !== a) {
      if (u != null && Nt(u), a === 1) r.tag === 0 ? no(hv.bind(null, r)) : Qc(hv.bind(null, r)), Au(function() {
        (Dn & 6) === 0 && rl();
      }), u = null;
      else {
        switch (pa(f)) {
          case 1:
            u = qt;
            break;
          case 4:
            u = kt;
            break;
          case 16:
            u = gn;
            break;
          case 536870912:
            u = Sr;
            break;
          default:
            u = gn;
        }
        u = Fh(u, Df.bind(null, r));
      }
      r.callbackPriority = a, r.callbackNode = u;
    }
  }
  function Df(r, a) {
    if (lc = -1, Sa = 0, (Dn & 6) !== 0) throw Error(s(327));
    var u = r.callbackNode;
    if (Gu() && r.callbackNode !== u) return null;
    var f = ei(r, r === qr ? na : 0);
    if (f === 0) return null;
    if ((f & 30) !== 0 || (f & r.expiredLanes) !== 0 || a) a = Of(r, f);
    else {
      a = f;
      var y = Dn;
      Dn |= 2;
      var S = Dh();
      (qr !== r || na !== a) && (ui = null, Wu = Rt() + 500, Al(r, a));
      do
        try {
          Oh();
          break;
        } catch (U) {
          kh(r, U);
        }
      while (!0);
      Yd(), fo.current = S, Dn = y, jr !== null ? a = 0 : (qr = null, na = 0, a = Mr);
    }
    if (a !== 0) {
      if (a === 2 && (y = va(r), y !== 0 && (f = y, a = oc(r, y))), a === 1) throw u = rc, Al(r, 0), Ii(r, f), Ba(r, Rt()), u;
      if (a === 6) Ii(r, f);
      else {
        if (y = r.current.alternate, (f & 30) === 0 && !Zy(y) && (a = Of(r, f), a === 2 && (S = va(r), S !== 0 && (f = S, a = oc(r, S))), a === 1)) throw u = rc, Al(r, 0), Ii(r, f), Ba(r, Rt()), u;
        switch (r.finishedWork = y, r.finishedLanes = f, a) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            lu(r, Wa, ui);
            break;
          case 3:
            if (Ii(r, f), (f & 130023424) === f && (a = pv + 500 - Rt(), 10 < a)) {
              if (ei(r, 0) !== 0) break;
              if (y = r.suspendedLanes, (y & f) !== f) {
                Fr(), r.pingedLanes |= r.suspendedLanes & y;
                break;
              }
              r.timeoutHandle = Yc(lu.bind(null, r, Wa, ui), a);
              break;
            }
            lu(r, Wa, ui);
            break;
          case 4:
            if (Ii(r, f), (f & 4194240) === f) break;
            for (a = r.eventTimes, y = -1; 0 < f; ) {
              var _ = 31 - Kr(f);
              S = 1 << _, _ = a[_], _ > y && (y = _), f &= ~S;
            }
            if (f = y, f = Rt() - f, f = (120 > f ? 120 : 480 > f ? 480 : 1080 > f ? 1080 : 1920 > f ? 1920 : 3e3 > f ? 3e3 : 4320 > f ? 4320 : 1960 * Ky(f / 1960)) - f, 10 < f) {
              r.timeoutHandle = Yc(lu.bind(null, r, Wa, ui), f);
              break;
            }
            lu(r, Wa, ui);
            break;
          case 5:
            lu(r, Wa, ui);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return Ba(r, Rt()), r.callbackNode === u ? Df.bind(null, r) : null;
  }
  function oc(r, a) {
    var u = ac;
    return r.current.memoizedState.isDehydrated && (Al(r, a).flags |= 256), r = Of(r, a), r !== 2 && (a = Wa, Wa = u, a !== null && au(a)), r;
  }
  function au(r) {
    Wa === null ? Wa = r : Wa.push.apply(Wa, r);
  }
  function Zy(r) {
    for (var a = r; ; ) {
      if (a.flags & 16384) {
        var u = a.updateQueue;
        if (u !== null && (u = u.stores, u !== null)) for (var f = 0; f < u.length; f++) {
          var y = u[f], S = y.getSnapshot;
          y = y.value;
          try {
            if (!Hi(S(), y)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (u = a.child, a.subtreeFlags & 16384 && u !== null) u.return = a, a = u;
      else {
        if (a === r) break;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === r) return !0;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
    }
    return !0;
  }
  function Ii(r, a) {
    for (a &= ~_f, a &= ~Yu, r.suspendedLanes |= a, r.pingedLanes &= ~a, r = r.expirationTimes; 0 < a; ) {
      var u = 31 - Kr(a), f = 1 << u;
      r[u] = -1, a &= ~f;
    }
  }
  function hv(r) {
    if ((Dn & 6) !== 0) throw Error(s(327));
    Gu();
    var a = ei(r, 0);
    if ((a & 1) === 0) return Ba(r, Rt()), null;
    var u = Of(r, a);
    if (r.tag !== 0 && u === 2) {
      var f = va(r);
      f !== 0 && (a = f, u = oc(r, f));
    }
    if (u === 1) throw u = rc, Al(r, 0), Ii(r, a), Ba(r, Rt()), u;
    if (u === 6) throw Error(s(345));
    return r.finishedWork = r.current.alternate, r.finishedLanes = a, lu(r, Wa, ui), Ba(r, Rt()), null;
  }
  function mv(r, a) {
    var u = Dn;
    Dn |= 1;
    try {
      return r(a);
    } finally {
      Dn = u, Dn === 0 && (Wu = Rt() + 500, Fu && rl());
    }
  }
  function iu(r) {
    Ll !== null && Ll.tag === 0 && (Dn & 6) === 0 && Gu();
    var a = Dn;
    Dn |= 1;
    var u = ta.transition, f = Sn;
    try {
      if (ta.transition = null, Sn = 1, r) return r();
    } finally {
      Sn = f, ta.transition = u, Dn = a, (Dn & 6) === 0 && rl();
    }
  }
  function yv() {
    oi = Iu.current, or(Iu);
  }
  function Al(r, a) {
    r.finishedWork = null, r.finishedLanes = 0;
    var u = r.timeoutHandle;
    if (u !== -1 && (r.timeoutHandle = -1, Pd(u)), jr !== null) for (u = jr.return; u !== null; ) {
      var f = u;
      switch (Xc(f), f.tag) {
        case 1:
          f = f.type.childContextTypes, f != null && ju();
          break;
        case 3:
          Bo(), or($r), or(wr), Ot();
          break;
        case 5:
          ef(f);
          break;
        case 4:
          Bo();
          break;
        case 13:
          or(yr);
          break;
        case 19:
          or(yr);
          break;
        case 10:
          Wd(f.type._context);
          break;
        case 22:
        case 23:
          yv();
      }
      u = u.return;
    }
    if (qr = r, jr = r = ho(r.current, null), na = oi = a, Mr = 0, rc = null, _f = Yu = cl = 0, Wa = ac = null, Yo !== null) {
      for (a = 0; a < Yo.length; a++) if (u = Yo[a], f = u.interleaved, f !== null) {
        u.interleaved = null;
        var y = f.next, S = u.pending;
        if (S !== null) {
          var _ = S.next;
          S.next = y, f.next = _;
        }
        u.pending = f;
      }
      Yo = null;
    }
    return r;
  }
  function kh(r, a) {
    do {
      var u = jr;
      try {
        if (Yd(), pn.current = Jo, nf) {
          for (var f = $n.memoizedState; f !== null; ) {
            var y = f.queue;
            y !== null && (y.pending = null), f = f.next;
          }
          nf = !1;
        }
        if (er = 0, Wr = Ar = $n = null, Fs = !1, Qo = 0, nu.current = null, u === null || u.return === null) {
          Mr = 1, rc = a, jr = null;
          break;
        }
        e: {
          var S = r, _ = u.return, U = u, V = a;
          if (a = na, U.flags |= 32768, V !== null && typeof V == "object" && typeof V.then == "function") {
            var ue = V, Oe = U, Le = Oe.tag;
            if ((Oe.mode & 1) === 0 && (Le === 0 || Le === 11 || Le === 15)) {
              var ke = Oe.alternate;
              ke ? (Oe.updateQueue = ke.updateQueue, Oe.memoizedState = ke.memoizedState, Oe.lanes = ke.lanes) : (Oe.updateQueue = null, Oe.memoizedState = null);
            }
            var lt = mh(_);
            if (lt !== null) {
              lt.flags &= -257, co(lt, _, U, S, a), lt.mode & 1 && iv(S, ue, a), a = lt, V = ue;
              var ht = a.updateQueue;
              if (ht === null) {
                var St = /* @__PURE__ */ new Set();
                St.add(V), a.updateQueue = St;
              } else ht.add(V);
              break e;
            } else {
              if ((a & 1) === 0) {
                iv(S, ue, a), gv();
                break e;
              }
              V = Error(s(426));
            }
          } else if (fr && U.mode & 1) {
            var _r = mh(_);
            if (_r !== null) {
              (_r.flags & 65536) === 0 && (_r.flags |= 256), co(_r, _, U, S, a), kl(eu(V, U));
              break e;
            }
          }
          S = V = eu(V, U), Mr !== 4 && (Mr = 2), ac === null ? ac = [S] : ac.push(S), S = _;
          do {
            switch (S.tag) {
              case 3:
                S.flags |= 65536, a &= -a, S.lanes |= a;
                var J = hh(S, V, a);
                ch(S, J);
                break e;
              case 1:
                U = V;
                var W = S.type, ne = S.stateNode;
                if ((S.flags & 128) === 0 && (typeof W.getDerivedStateFromError == "function" || ne !== null && typeof ne.componentDidCatch == "function" && (vo === null || !vo.has(ne)))) {
                  S.flags |= 65536, a &= -a, S.lanes |= a;
                  var ze = av(S, U, a);
                  ch(S, ze);
                  break e;
                }
            }
            S = S.return;
          } while (S !== null);
        }
        Lh(u);
      } catch (mt) {
        a = mt, jr === u && u !== null && (jr = u = u.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Dh() {
    var r = fo.current;
    return fo.current = Jo, r === null ? Jo : r;
  }
  function gv() {
    (Mr === 0 || Mr === 3 || Mr === 2) && (Mr = 4), qr === null || (cl & 268435455) === 0 && (Yu & 268435455) === 0 || Ii(qr, na);
  }
  function Of(r, a) {
    var u = Dn;
    Dn |= 2;
    var f = Dh();
    (qr !== r || na !== a) && (ui = null, Al(r, a));
    do
      try {
        Jy();
        break;
      } catch (y) {
        kh(r, y);
      }
    while (!0);
    if (Yd(), Dn = u, fo.current = f, jr !== null) throw Error(s(261));
    return qr = null, na = 0, Mr;
  }
  function Jy() {
    for (; jr !== null; ) zh(jr);
  }
  function Oh() {
    for (; jr !== null && !Fn(); ) zh(jr);
  }
  function zh(r) {
    var a = jh(r.alternate, r, oi);
    r.memoizedProps = r.pendingProps, a === null ? Lh(r) : jr = a, nu.current = null;
  }
  function Lh(r) {
    var a = r;
    do {
      var u = a.alternate;
      if (r = a.return, (a.flags & 32768) === 0) {
        if (u = Th(u, a, oi), u !== null) {
          jr = u;
          return;
        }
      } else {
        if (u = bf(u, a), u !== null) {
          u.flags &= 32767, jr = u;
          return;
        }
        if (r !== null) r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null;
        else {
          Mr = 6, jr = null;
          return;
        }
      }
      if (a = a.sibling, a !== null) {
        jr = a;
        return;
      }
      jr = a = r;
    } while (a !== null);
    Mr === 0 && (Mr = 5);
  }
  function lu(r, a, u) {
    var f = Sn, y = ta.transition;
    try {
      ta.transition = null, Sn = 1, e0(r, a, u, f);
    } finally {
      ta.transition = y, Sn = f;
    }
    return null;
  }
  function e0(r, a, u, f) {
    do
      Gu();
    while (Ll !== null);
    if ((Dn & 6) !== 0) throw Error(s(327));
    u = r.finishedWork;
    var y = r.finishedLanes;
    if (u === null) return null;
    if (r.finishedWork = null, r.finishedLanes = 0, u === r.current) throw Error(s(177));
    r.callbackNode = null, r.callbackPriority = 0;
    var S = u.lanes | u.childLanes;
    if (ti(r, S), r === qr && (jr = qr = null, na = 0), (u.subtreeFlags & 2064) === 0 && (u.flags & 2064) === 0 || kf || (kf = !0, Fh(gn, function() {
      return Gu(), null;
    })), S = (u.flags & 15990) !== 0, (u.subtreeFlags & 15990) !== 0 || S) {
      S = ta.transition, ta.transition = null;
      var _ = Sn;
      Sn = 1;
      var U = Dn;
      Dn |= 4, nu.current = null, bh(r, u), fv(u, r), Du(Po), Si = !!_s, Po = _s = null, r.current = u, Xy(u), Gn(), Dn = U, Sn = _, ta.transition = S;
    } else r.current = u;
    if (kf && (kf = !1, Ll = r, ic = y), S = r.pendingLanes, S === 0 && (vo = null), Oo(u.stateNode), Ba(r, Rt()), a !== null) for (f = r.onRecoverableError, u = 0; u < a.length; u++) y = a[u], f(y.value, { componentStack: y.stack, digest: y.digest });
    if (Bu) throw Bu = !1, r = ru, ru = null, r;
    return (ic & 1) !== 0 && r.tag !== 0 && Gu(), S = r.pendingLanes, (S & 1) !== 0 ? r === Qu ? po++ : (po = 0, Qu = r) : po = 0, rl(), null;
  }
  function Gu() {
    if (Ll !== null) {
      var r = pa(ic), a = ta.transition, u = Sn;
      try {
        if (ta.transition = null, Sn = 16 > r ? 16 : r, Ll === null) var f = !1;
        else {
          if (r = Ll, Ll = null, ic = 0, (Dn & 6) !== 0) throw Error(s(331));
          var y = Dn;
          for (Dn |= 4, st = r.current; st !== null; ) {
            var S = st, _ = S.child;
            if ((st.flags & 16) !== 0) {
              var U = S.deletions;
              if (U !== null) {
                for (var V = 0; V < U.length; V++) {
                  var ue = U[V];
                  for (st = ue; st !== null; ) {
                    var Oe = st;
                    switch (Oe.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Js(8, Oe, S);
                    }
                    var Le = Oe.child;
                    if (Le !== null) Le.return = Oe, st = Le;
                    else for (; st !== null; ) {
                      Oe = st;
                      var ke = Oe.sibling, lt = Oe.return;
                      if (Mf(Oe), Oe === ue) {
                        st = null;
                        break;
                      }
                      if (ke !== null) {
                        ke.return = lt, st = ke;
                        break;
                      }
                      st = lt;
                    }
                  }
                }
                var ht = S.alternate;
                if (ht !== null) {
                  var St = ht.child;
                  if (St !== null) {
                    ht.child = null;
                    do {
                      var _r = St.sibling;
                      St.sibling = null, St = _r;
                    } while (St !== null);
                  }
                }
                st = S;
              }
            }
            if ((S.subtreeFlags & 2064) !== 0 && _ !== null) _.return = S, st = _;
            else e: for (; st !== null; ) {
              if (S = st, (S.flags & 2048) !== 0) switch (S.tag) {
                case 0:
                case 11:
                case 15:
                  Js(9, S, S.return);
              }
              var J = S.sibling;
              if (J !== null) {
                J.return = S.return, st = J;
                break e;
              }
              st = S.return;
            }
          }
          var W = r.current;
          for (st = W; st !== null; ) {
            _ = st;
            var ne = _.child;
            if ((_.subtreeFlags & 2064) !== 0 && ne !== null) ne.return = _, st = ne;
            else e: for (_ = W; st !== null; ) {
              if (U = st, (U.flags & 2048) !== 0) try {
                switch (U.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ec(9, U);
                }
              } catch (mt) {
                dr(U, U.return, mt);
              }
              if (U === _) {
                st = null;
                break e;
              }
              var ze = U.sibling;
              if (ze !== null) {
                ze.return = U.return, st = ze;
                break e;
              }
              st = U.return;
            }
          }
          if (Dn = y, rl(), Xn && typeof Xn.onPostCommitFiberRoot == "function") try {
            Xn.onPostCommitFiberRoot(ir, r);
          } catch {
          }
          f = !0;
        }
        return f;
      } finally {
        Sn = u, ta.transition = a;
      }
    }
    return !1;
  }
  function Ah(r, a, u) {
    a = eu(u, a), a = hh(r, a, 1), r = oo(r, a, 1), a = Fr(), r !== null && (Ca(r, 1, a), Ba(r, a));
  }
  function dr(r, a, u) {
    if (r.tag === 3) Ah(r, r, u);
    else for (; a !== null; ) {
      if (a.tag === 3) {
        Ah(a, r, u);
        break;
      } else if (a.tag === 1) {
        var f = a.stateNode;
        if (typeof a.type.getDerivedStateFromError == "function" || typeof f.componentDidCatch == "function" && (vo === null || !vo.has(f))) {
          r = eu(u, r), r = av(a, r, 1), a = oo(a, r, 1), r = Fr(), a !== null && (Ca(a, 1, r), Ba(a, r));
          break;
        }
      }
      a = a.return;
    }
  }
  function t0(r, a, u) {
    var f = r.pingCache;
    f !== null && f.delete(a), a = Fr(), r.pingedLanes |= r.suspendedLanes & u, qr === r && (na & u) === u && (Mr === 4 || Mr === 3 && (na & 130023424) === na && 500 > Rt() - pv ? Al(r, 0) : _f |= u), Ba(r, a);
  }
  function Nh(r, a) {
    a === 0 && ((r.mode & 1) === 0 ? a = 1 : (a = Ea, Ea <<= 1, (Ea & 130023424) === 0 && (Ea = 4194304)));
    var u = Fr();
    r = ii(r, a), r !== null && (Ca(r, a, u), Ba(r, u));
  }
  function n0(r) {
    var a = r.memoizedState, u = 0;
    a !== null && (u = a.retryLane), Nh(r, u);
  }
  function Uh(r, a) {
    var u = 0;
    switch (r.tag) {
      case 13:
        var f = r.stateNode, y = r.memoizedState;
        y !== null && (u = y.retryLane);
        break;
      case 19:
        f = r.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    f !== null && f.delete(a), Nh(r, u);
  }
  var jh;
  jh = function(r, a, u) {
    if (r !== null) if (r.memoizedProps !== a.pendingProps || $r.current) Nr = !0;
    else {
      if ((r.lanes & u) === 0 && (a.flags & 128) === 0) return Nr = !1, Xs(r, a, u);
      Nr = (r.flags & 131072) !== 0;
    }
    else Nr = !1, fr && (a.flags & 1048576) !== 0 && lh(a, _l, a.index);
    switch (a.lanes = 0, a.tag) {
      case 2:
        var f = a.type;
        xi(r, a), r = a.pendingProps;
        var y = Ha(a, wr.current);
        mr(a, u), y = uo(null, a, f, r, y, u);
        var S = $i();
        return a.flags |= 1, typeof y == "object" && y !== null && typeof y.render == "function" && y.$$typeof === void 0 ? (a.tag = 1, a.memoizedState = null, a.updateQueue = null, zr(f) ? (S = !0, Yr(a)) : S = !1, a.memoizedState = y.state !== null && y.state !== void 0 ? y.state : null, Xd(a), y.updater = Ef, a.stateNode = y, y._reactInternals = a, Ys(a, f, r, u), a = Qs(null, a, f, !0, S, u)) : (a.tag = 0, fr && S && Gc(a), ea(null, a, y, u), a = a.child), a;
      case 16:
        f = a.elementType;
        e: {
          switch (xi(r, a), r = a.pendingProps, y = f._init, f = y(f._payload), a.type = f, y = a.tag = a0(f), r = Vi(f, r), y) {
            case 0:
              a = yh(null, a, f, r, u);
              break e;
            case 1:
              a = gh(null, a, f, r, u);
              break e;
            case 11:
              a = Ia(null, a, f, r, u);
              break e;
            case 14:
              a = tu(null, a, f, Vi(f.type, r), u);
              break e;
          }
          throw Error(s(
            306,
            f,
            ""
          ));
        }
        return a;
      case 0:
        return f = a.type, y = a.pendingProps, y = a.elementType === f ? y : Vi(f, y), yh(r, a, f, y, u);
      case 1:
        return f = a.type, y = a.pendingProps, y = a.elementType === f ? y : Vi(f, y), gh(r, a, f, y, u);
      case 3:
        e: {
          if (Vu(a), r === null) throw Error(s(387));
          f = a.pendingProps, S = a.memoizedState, y = S.element, sh(r, a), Ls(a, f, null, u);
          var _ = a.memoizedState;
          if (f = _.element, S.isDehydrated) if (S = { element: f, isDehydrated: !1, cache: _.cache, pendingSuspenseBoundaries: _.pendingSuspenseBoundaries, transitions: _.transitions }, a.updateQueue.baseState = S, a.memoizedState = S, a.flags & 256) {
            y = eu(Error(s(423)), a), a = Sh(r, a, f, u, y);
            break e;
          } else if (f !== y) {
            y = eu(Error(s(424)), a), a = Sh(r, a, f, u, y);
            break e;
          } else for ($a = el(a.stateNode.containerInfo.firstChild), Pa = a, fr = !0, Ri = null, u = et(a, null, f, u), a.child = u; u; ) u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (lo(), f === y) {
              a = Mi(r, a, u);
              break e;
            }
            ea(r, a, f, u);
          }
          a = a.child;
        }
        return a;
      case 5:
        return fh(a), r === null && qd(a), f = a.type, y = a.pendingProps, S = r !== null ? r.memoizedProps : null, _ = y.children, Ic(f, y) ? _ = null : S !== null && Ic(f, S) && (a.flags |= 32), lv(r, a), ea(r, a, _, u), a.child;
      case 6:
        return r === null && qd(a), null;
      case 13:
        return Rf(r, a, u);
      case 4:
        return Zd(a, a.stateNode.containerInfo), f = a.pendingProps, r === null ? a.child = Rr(a, null, f, u) : ea(r, a, f, u), a.child;
      case 11:
        return f = a.type, y = a.pendingProps, y = a.elementType === f ? y : Vi(f, y), Ia(r, a, f, y, u);
      case 7:
        return ea(r, a, a.pendingProps, u), a.child;
      case 8:
        return ea(r, a, a.pendingProps.children, u), a.child;
      case 12:
        return ea(r, a, a.pendingProps.children, u), a.child;
      case 10:
        e: {
          if (f = a.type._context, y = a.pendingProps, S = a.memoizedProps, _ = y.value, Mt(ai, f._currentValue), f._currentValue = _, S !== null) if (Hi(S.value, _)) {
            if (S.children === y.children && !$r.current) {
              a = Mi(r, a, u);
              break e;
            }
          } else for (S = a.child, S !== null && (S.return = a); S !== null; ) {
            var U = S.dependencies;
            if (U !== null) {
              _ = S.child;
              for (var V = U.firstContext; V !== null; ) {
                if (V.context === f) {
                  if (S.tag === 1) {
                    V = Dl(-1, u & -u), V.tag = 2;
                    var ue = S.updateQueue;
                    if (ue !== null) {
                      ue = ue.shared;
                      var Oe = ue.pending;
                      Oe === null ? V.next = V : (V.next = Oe.next, Oe.next = V), ue.pending = V;
                    }
                  }
                  S.lanes |= u, V = S.alternate, V !== null && (V.lanes |= u), Bd(
                    S.return,
                    u,
                    a
                  ), U.lanes |= u;
                  break;
                }
                V = V.next;
              }
            } else if (S.tag === 10) _ = S.type === a.type ? null : S.child;
            else if (S.tag === 18) {
              if (_ = S.return, _ === null) throw Error(s(341));
              _.lanes |= u, U = _.alternate, U !== null && (U.lanes |= u), Bd(_, u, a), _ = S.sibling;
            } else _ = S.child;
            if (_ !== null) _.return = S;
            else for (_ = S; _ !== null; ) {
              if (_ === a) {
                _ = null;
                break;
              }
              if (S = _.sibling, S !== null) {
                S.return = _.return, _ = S;
                break;
              }
              _ = _.return;
            }
            S = _;
          }
          ea(r, a, y.children, u), a = a.child;
        }
        return a;
      case 9:
        return y = a.type, f = a.pendingProps.children, mr(a, u), y = bi(y), f = f(y), a.flags |= 1, ea(r, a, f, u), a.child;
      case 14:
        return f = a.type, y = Vi(f, a.pendingProps), y = Vi(f.type, y), tu(r, a, f, y, u);
      case 15:
        return un(r, a, a.type, a.pendingProps, u);
      case 17:
        return f = a.type, y = a.pendingProps, y = a.elementType === f ? y : Vi(f, y), xi(r, a), a.tag = 1, zr(f) ? (r = !0, Yr(a)) : r = !1, mr(a, u), Cf(a, f, y), Ys(a, f, y, u), Qs(null, a, f, !0, r, u);
      case 19:
        return ol(r, a, u);
      case 22:
        return Bs(r, a, u);
    }
    throw Error(s(156, a.tag));
  };
  function Fh(r, a) {
    return zt(r, a);
  }
  function r0(r, a, u, f) {
    this.tag = r, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = f, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ki(r, a, u, f) {
    return new r0(r, a, u, f);
  }
  function Sv(r) {
    return r = r.prototype, !(!r || !r.isReactComponent);
  }
  function a0(r) {
    if (typeof r == "function") return Sv(r) ? 1 : 0;
    if (r != null) {
      if (r = r.$$typeof, r === fe) return 11;
      if (r === we) return 14;
    }
    return 2;
  }
  function ho(r, a) {
    var u = r.alternate;
    return u === null ? (u = ki(r.tag, a, r.key, r.mode), u.elementType = r.elementType, u.type = r.type, u.stateNode = r.stateNode, u.alternate = r, r.alternate = u) : (u.pendingProps = a, u.type = r.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = r.flags & 14680064, u.childLanes = r.childLanes, u.lanes = r.lanes, u.child = r.child, u.memoizedProps = r.memoizedProps, u.memoizedState = r.memoizedState, u.updateQueue = r.updateQueue, a = r.dependencies, u.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, u.sibling = r.sibling, u.index = r.index, u.ref = r.ref, u;
  }
  function uc(r, a, u, f, y, S) {
    var _ = 2;
    if (f = r, typeof r == "function") Sv(r) && (_ = 1);
    else if (typeof r == "string") _ = 5;
    else e: switch (r) {
      case re:
        return Nl(u.children, y, S, a);
      case Re:
        _ = 8, y |= 8;
        break;
      case he:
        return r = ki(12, u, a, y | 2), r.elementType = he, r.lanes = S, r;
      case ae:
        return r = ki(13, u, a, y), r.elementType = ae, r.lanes = S, r;
      case q:
        return r = ki(19, u, a, y), r.elementType = q, r.lanes = S, r;
      case de:
        return mo(u, y, S, a);
      default:
        if (typeof r == "object" && r !== null) switch (r.$$typeof) {
          case G:
            _ = 10;
            break e;
          case se:
            _ = 9;
            break e;
          case fe:
            _ = 11;
            break e;
          case we:
            _ = 14;
            break e;
          case Ne:
            _ = 16, f = null;
            break e;
        }
        throw Error(s(130, r == null ? r : typeof r, ""));
    }
    return a = ki(_, u, a, y), a.elementType = r, a.type = f, a.lanes = S, a;
  }
  function Nl(r, a, u, f) {
    return r = ki(7, r, f, a), r.lanes = u, r;
  }
  function mo(r, a, u, f) {
    return r = ki(22, r, f, a), r.elementType = de, r.lanes = u, r.stateNode = { isHidden: !1 }, r;
  }
  function Ev(r, a, u) {
    return r = ki(6, r, null, a), r.lanes = u, r;
  }
  function zf(r, a, u) {
    return a = ki(4, r.children !== null ? r.children : [], r.key, a), a.lanes = u, a.stateNode = { containerInfo: r.containerInfo, pendingChildren: null, implementation: r.implementation }, a;
  }
  function Hh(r, a, u, f, y) {
    this.tag = a, this.containerInfo = r, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = mi(0), this.expirationTimes = mi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = mi(0), this.identifierPrefix = f, this.onRecoverableError = y, this.mutableSourceEagerHydrationData = null;
  }
  function Lf(r, a, u, f, y, S, _, U, V) {
    return r = new Hh(r, a, u, U, V), a === 1 ? (a = 1, S === !0 && (a |= 8)) : a = 0, S = ki(3, null, null, a), r.current = S, S.stateNode = r, S.memoizedState = { element: f, isDehydrated: u, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Xd(S), r;
  }
  function i0(r, a, u) {
    var f = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Q, key: f == null ? null : "" + f, children: r, containerInfo: a, implementation: u };
  }
  function Cv(r) {
    if (!r) return ma;
    r = r._reactInternals;
    e: {
      if (vt(r) !== r || r.tag !== 1) throw Error(s(170));
      var a = r;
      do {
        switch (a.tag) {
          case 3:
            a = a.stateNode.context;
            break e;
          case 1:
            if (zr(a.type)) {
              a = a.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        a = a.return;
      } while (a !== null);
      throw Error(s(171));
    }
    if (r.tag === 1) {
      var u = r.type;
      if (zr(u)) return Os(r, u, a);
    }
    return a;
  }
  function Ph(r, a, u, f, y, S, _, U, V) {
    return r = Lf(u, f, !0, r, y, S, _, U, V), r.context = Cv(null), u = r.current, f = Fr(), y = fl(u), S = Dl(f, y), S.callback = a ?? null, oo(u, S, y), r.current.lanes = y, Ca(r, y, f), Ba(r, f), r;
  }
  function Af(r, a, u, f) {
    var y = a.current, S = Fr(), _ = fl(y);
    return u = Cv(u), a.context === null ? a.context = u : a.pendingContext = u, a = Dl(S, _), a.payload = { element: r }, f = f === void 0 ? null : f, f !== null && (a.callback = f), r = oo(y, a, _), r !== null && (xa(r, y, _, S), Jc(r, y, _)), _;
  }
  function Nf(r) {
    return r = r.current, r.child ? (r.child.tag === 5, r.child.stateNode) : null;
  }
  function wv(r, a) {
    if (r = r.memoizedState, r !== null && r.dehydrated !== null) {
      var u = r.retryLane;
      r.retryLane = u !== 0 && u < a ? u : a;
    }
  }
  function Uf(r, a) {
    wv(r, a), (r = r.alternate) && wv(r, a);
  }
  function $h() {
    return null;
  }
  var ou = typeof reportError == "function" ? reportError : function(r) {
    console.error(r);
  };
  function Tv(r) {
    this._internalRoot = r;
  }
  jf.prototype.render = Tv.prototype.render = function(r) {
    var a = this._internalRoot;
    if (a === null) throw Error(s(409));
    Af(r, a, null, null);
  }, jf.prototype.unmount = Tv.prototype.unmount = function() {
    var r = this._internalRoot;
    if (r !== null) {
      this._internalRoot = null;
      var a = r.containerInfo;
      iu(function() {
        Af(null, r, null, null);
      }), a[xl] = null;
    }
  };
  function jf(r) {
    this._internalRoot = r;
  }
  jf.prototype.unstable_scheduleHydration = function(r) {
    if (r) {
      var a = Vt();
      r = { blockedOn: null, target: r, priority: a };
      for (var u = 0; u < vr.length && a !== 0 && a < vr[u].priority; u++) ;
      vr.splice(u, 0, r), u === 0 && ys(r);
    }
  };
  function Rv(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11);
  }
  function Ff(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11 && (r.nodeType !== 8 || r.nodeValue !== " react-mount-point-unstable "));
  }
  function Vh() {
  }
  function l0(r, a, u, f, y) {
    if (y) {
      if (typeof f == "function") {
        var S = f;
        f = function() {
          var ue = Nf(_);
          S.call(ue);
        };
      }
      var _ = Ph(a, f, r, 0, null, !1, !1, "", Vh);
      return r._reactRootContainer = _, r[xl] = _.current, zu(r.nodeType === 8 ? r.parentNode : r), iu(), _;
    }
    for (; y = r.lastChild; ) r.removeChild(y);
    if (typeof f == "function") {
      var U = f;
      f = function() {
        var ue = Nf(V);
        U.call(ue);
      };
    }
    var V = Lf(r, 0, !1, null, null, !1, !1, "", Vh);
    return r._reactRootContainer = V, r[xl] = V.current, zu(r.nodeType === 8 ? r.parentNode : r), iu(function() {
      Af(a, V, u, f);
    }), V;
  }
  function sc(r, a, u, f, y) {
    var S = u._reactRootContainer;
    if (S) {
      var _ = S;
      if (typeof y == "function") {
        var U = y;
        y = function() {
          var V = Nf(_);
          U.call(V);
        };
      }
      Af(a, _, r, y);
    } else _ = l0(u, a, r, y, f);
    return Nf(_);
  }
  on = function(r) {
    switch (r.tag) {
      case 3:
        var a = r.stateNode;
        if (a.current.memoizedState.isDehydrated) {
          var u = Ja(a.pendingLanes);
          u !== 0 && (Dr(a, u | 1), Ba(a, Rt()), (Dn & 6) === 0 && (Wu = Rt() + 500, rl()));
        }
        break;
      case 13:
        iu(function() {
          var f = ii(r, 1);
          if (f !== null) {
            var y = Fr();
            xa(f, r, 1, y);
          }
        }), Uf(r, 1);
    }
  }, Xi = function(r) {
    if (r.tag === 13) {
      var a = ii(r, 134217728);
      if (a !== null) {
        var u = Fr();
        xa(a, r, 134217728, u);
      }
      Uf(r, 134217728);
    }
  }, fn = function(r) {
    if (r.tag === 13) {
      var a = fl(r), u = ii(r, a);
      if (u !== null) {
        var f = Fr();
        xa(u, r, a, f);
      }
      Uf(r, a);
    }
  }, Vt = function() {
    return Sn;
  }, Ki = function(r, a) {
    var u = Sn;
    try {
      return Sn = r, a();
    } finally {
      Sn = u;
    }
  }, nn = function(r, a, u) {
    switch (a) {
      case "input":
        if (Be(r, u), a = u.name, u.type === "radio" && a != null) {
          for (u = r; u.parentNode; ) u = u.parentNode;
          for (u = u.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), a = 0; a < u.length; a++) {
            var f = u[a];
            if (f !== r && f.form === r.form) {
              var y = hr(f);
              if (!y) throw Error(s(90));
              We(f), Be(f, y);
            }
          }
        }
        break;
      case "textarea":
        sn(r, u);
        break;
      case "select":
        a = u.value, a != null && Xe(r, !!u.multiple, a, !1);
    }
  }, Nn = mv, bn = iu;
  var o0 = { usingClientEntryPoint: !1, Events: [Dt, Pi, hr, vn, hn, mv] }, cc = { findFiberByHostInstance: $o, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, qh = { bundleType: cc.bundleType, version: cc.version, rendererPackageName: cc.rendererPackageName, rendererConfig: cc.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: P.ReactCurrentDispatcher, findHostInstanceByFiber: function(r) {
    return r = Lt(r), r === null ? null : r.stateNode;
  }, findFiberByHostInstance: cc.findFiberByHostInstance || $h, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var yo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!yo.isDisabled && yo.supportsFiber) try {
      ir = yo.inject(qh), Xn = yo;
    } catch {
    }
  }
  return Ni.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = o0, Ni.createPortal = function(r, a) {
    var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Rv(a)) throw Error(s(200));
    return i0(r, a, null, u);
  }, Ni.createRoot = function(r, a) {
    if (!Rv(r)) throw Error(s(299));
    var u = !1, f = "", y = ou;
    return a != null && (a.unstable_strictMode === !0 && (u = !0), a.identifierPrefix !== void 0 && (f = a.identifierPrefix), a.onRecoverableError !== void 0 && (y = a.onRecoverableError)), a = Lf(r, 1, !1, null, null, u, !1, f, y), r[xl] = a.current, zu(r.nodeType === 8 ? r.parentNode : r), new Tv(a);
  }, Ni.findDOMNode = function(r) {
    if (r == null) return null;
    if (r.nodeType === 1) return r;
    var a = r._reactInternals;
    if (a === void 0)
      throw typeof r.render == "function" ? Error(s(188)) : (r = Object.keys(r).join(","), Error(s(268, r)));
    return r = Lt(a), r = r === null ? null : r.stateNode, r;
  }, Ni.flushSync = function(r) {
    return iu(r);
  }, Ni.hydrate = function(r, a, u) {
    if (!Ff(a)) throw Error(s(200));
    return sc(null, r, a, !0, u);
  }, Ni.hydrateRoot = function(r, a, u) {
    if (!Rv(r)) throw Error(s(405));
    var f = u != null && u.hydratedSources || null, y = !1, S = "", _ = ou;
    if (u != null && (u.unstable_strictMode === !0 && (y = !0), u.identifierPrefix !== void 0 && (S = u.identifierPrefix), u.onRecoverableError !== void 0 && (_ = u.onRecoverableError)), a = Ph(a, null, r, 1, u ?? null, y, !1, S, _), r[xl] = a.current, zu(r), f) for (r = 0; r < f.length; r++) u = f[r], y = u._getVersion, y = y(u._source), a.mutableSourceEagerHydrationData == null ? a.mutableSourceEagerHydrationData = [u, y] : a.mutableSourceEagerHydrationData.push(
      u,
      y
    );
    return new jf(a);
  }, Ni.render = function(r, a, u) {
    if (!Ff(a)) throw Error(s(200));
    return sc(null, r, a, !1, u);
  }, Ni.unmountComponentAtNode = function(r) {
    if (!Ff(r)) throw Error(s(40));
    return r._reactRootContainer ? (iu(function() {
      sc(null, null, r, !1, function() {
        r._reactRootContainer = null, r[xl] = null;
      });
    }), !0) : !1;
  }, Ni.unstable_batchedUpdates = mv, Ni.unstable_renderSubtreeIntoContainer = function(r, a, u, f) {
    if (!Ff(u)) throw Error(s(200));
    if (r == null || r._reactInternals === void 0) throw Error(s(38));
    return sc(r, a, u, !1, f);
  }, Ni.version = "18.3.1-next-f1338f8080-20240426", Ni;
}
var Ui = {};
var hC;
function b4() {
  return hC || (hC = 1, process.env.NODE_ENV !== "production" && (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var n = kp(), l = Qw(), s = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, d = !1;
    function h(e) {
      d = e;
    }
    function m(e) {
      if (!d) {
        for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          i[o - 1] = arguments[o];
        E("warn", e, i);
      }
    }
    function p(e) {
      if (!d) {
        for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          i[o - 1] = arguments[o];
        E("error", e, i);
      }
    }
    function E(e, t, i) {
      {
        var o = s.ReactDebugCurrentFrame, c = o.getStackAddendum();
        c !== "" && (t += "%s", i = i.concat([c]));
        var v = i.map(function(g) {
          return String(g);
        });
        v.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, v);
      }
    }
    var C = 0, T = 1, b = 2, R = 3, D = 4, k = 5, z = 6, A = 7, N = 8, X = 9, K = 10, Y = 11, P = 12, $ = 13, Q = 14, re = 15, Re = 16, he = 17, G = 18, se = 19, fe = 21, ae = 22, q = 23, we = 24, Ne = 25, de = !0, ie = !1, Se = !1, Te = !1, H = !1, Z = !0, De = !0, Me = !0, Qe = !0, Ge = /* @__PURE__ */ new Set(), Ie = {}, qe = {};
    function Ye(e, t) {
      it(e, t), it(e + "Capture", t);
    }
    function it(e, t) {
      Ie[e] && p("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Ie[e] = t;
      {
        var i = e.toLowerCase();
        qe[i] = e, e === "onDoubleClick" && (qe.ondblclick = e);
      }
      for (var o = 0; o < t.length; o++)
        Ge.add(t[o]);
    }
    var Ze = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", We = Object.prototype.hasOwnProperty;
    function Ue(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, i = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return i;
      }
    }
    function ve(e) {
      try {
        return Pe(e), !1;
      } catch {
        return !0;
      }
    }
    function Pe(e) {
      return "" + e;
    }
    function be(e, t) {
      if (ve(e))
        return p("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Ue(e)), Pe(e);
    }
    function Be(e) {
      if (ve(e))
        return p("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ue(e)), Pe(e);
    }
    function Fe(e, t) {
      if (ve(e))
        return p("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Ue(e)), Pe(e);
    }
    function nt(e, t) {
      if (ve(e))
        return p("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Ue(e)), Pe(e);
    }
    function pt(e) {
      if (ve(e))
        return p("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Ue(e)), Pe(e);
    }
    function Xe(e) {
      if (ve(e))
        return p("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Ue(e)), Pe(e);
    }
    var gt = 0, wt = 1, sn = 2, $e = 3, cn = 4, Rn = 5, Mn = 6, _n = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", xe = _n + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", je = new RegExp("^[" + _n + "][" + xe + "]*$"), dt = {}, Et = {};
    function Tt(e) {
      return We.call(Et, e) ? !0 : We.call(dt, e) ? !1 : je.test(e) ? (Et[e] = !0, !0) : (dt[e] = !0, p("Invalid attribute name: `%s`", e), !1);
    }
    function Zt(e, t, i) {
      return t !== null ? t.type === gt : i ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function Qt(e, t, i, o) {
      if (i !== null && i.type === gt)
        return !1;
      switch (typeof t) {
        case "function":
        // $FlowIssue symbol is perfectly valid here
        case "symbol":
          return !0;
        case "boolean": {
          if (o)
            return !1;
          if (i !== null)
            return !i.acceptsBooleans;
          var c = e.toLowerCase().slice(0, 5);
          return c !== "data-" && c !== "aria-";
        }
        default:
          return !1;
      }
    }
    function Cn(e, t, i, o) {
      if (t === null || typeof t > "u" || Qt(e, t, i, o))
        return !0;
      if (o)
        return !1;
      if (i !== null)
        switch (i.type) {
          case $e:
            return !t;
          case cn:
            return t === !1;
          case Rn:
            return isNaN(t);
          case Mn:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Wt(e) {
      return nn.hasOwnProperty(e) ? nn[e] : null;
    }
    function tn(e, t, i, o, c, v, g) {
      this.acceptsBooleans = t === sn || t === $e || t === cn, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = i, this.propertyName = e, this.type = t, this.sanitizeURL = v, this.removeEmptyString = g;
    }
    var nn = {}, An = [
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
    An.forEach(function(e) {
      nn[e] = new tn(
        e,
        gt,
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
      var t = e[0], i = e[1];
      nn[t] = new tn(
        t,
        wt,
        !1,
        // mustUseProperty
        i,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      nn[e] = new tn(
        e,
        sn,
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
      nn[e] = new tn(
        e,
        sn,
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
      nn[e] = new tn(
        e,
        $e,
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
      nn[e] = new tn(
        e,
        $e,
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
      nn[e] = new tn(
        e,
        cn,
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
      nn[e] = new tn(
        e,
        Mn,
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
      nn[e] = new tn(
        e,
        Rn,
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
    var xt = /[\-\:]([a-z])/g, rn = function(e) {
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
      var t = e.replace(xt, rn);
      nn[t] = new tn(
        t,
        wt,
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
      var t = e.replace(xt, rn);
      nn[t] = new tn(
        t,
        wt,
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
      var t = e.replace(xt, rn);
      nn[t] = new tn(
        t,
        wt,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      nn[e] = new tn(
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
    });
    var vn = "xlinkHref";
    nn[vn] = new tn(
      "xlinkHref",
      wt,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      nn[e] = new tn(
        e,
        wt,
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
    var hn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Nn = !1;
    function bn(e) {
      !Nn && hn.test(e) && (Nn = !0, p("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function Gt(e, t, i, o) {
      if (o.mustUseProperty) {
        var c = o.propertyName;
        return e[c];
      } else {
        be(i, t), o.sanitizeURL && bn("" + i);
        var v = o.attributeName, g = null;
        if (o.type === cn) {
          if (e.hasAttribute(v)) {
            var w = e.getAttribute(v);
            return w === "" ? !0 : Cn(t, i, o, !1) ? w : w === "" + i ? i : w;
          }
        } else if (e.hasAttribute(v)) {
          if (Cn(t, i, o, !1))
            return e.getAttribute(v);
          if (o.type === $e)
            return i;
          g = e.getAttribute(v);
        }
        return Cn(t, i, o, !1) ? g === null ? i : g : g === "" + i ? i : g;
      }
    }
    function wn(e, t, i, o) {
      {
        if (!Tt(t))
          return;
        if (!e.hasAttribute(t))
          return i === void 0 ? void 0 : null;
        var c = e.getAttribute(t);
        return be(i, t), c === "" + i ? i : c;
      }
    }
    function Xt(e, t, i, o) {
      var c = Wt(t);
      if (!Zt(t, c, o)) {
        if (Cn(t, i, c, o) && (i = null), o || c === null) {
          if (Tt(t)) {
            var v = t;
            i === null ? e.removeAttribute(v) : (be(i, t), e.setAttribute(v, "" + i));
          }
          return;
        }
        var g = c.mustUseProperty;
        if (g) {
          var w = c.propertyName;
          if (i === null) {
            var x = c.type;
            e[w] = x === $e ? !1 : "";
          } else
            e[w] = i;
          return;
        }
        var O = c.attributeName, L = c.attributeNamespace;
        if (i === null)
          e.removeAttribute(O);
        else {
          var B = c.type, I;
          B === $e || B === cn && i === !0 ? I = "" : (be(i, O), I = "" + i, c.sanitizeURL && bn(I.toString())), L ? e.setAttributeNS(L, O, I) : e.setAttribute(O, I);
        }
      }
    }
    var Kt = /* @__PURE__ */ Symbol.for("react.element"), an = /* @__PURE__ */ Symbol.for("react.portal"), ln = /* @__PURE__ */ Symbol.for("react.fragment"), Qn = /* @__PURE__ */ Symbol.for("react.strict_mode"), ar = /* @__PURE__ */ Symbol.for("react.profiler"), jn = /* @__PURE__ */ Symbol.for("react.provider"), j = /* @__PURE__ */ Symbol.for("react.context"), Ee = /* @__PURE__ */ Symbol.for("react.forward_ref"), pe = /* @__PURE__ */ Symbol.for("react.suspense"), He = /* @__PURE__ */ Symbol.for("react.suspense_list"), vt = /* @__PURE__ */ Symbol.for("react.memo"), ct = /* @__PURE__ */ Symbol.for("react.lazy"), ft = /* @__PURE__ */ Symbol.for("react.scope"), rt = /* @__PURE__ */ Symbol.for("react.debug_trace_mode"), Lt = /* @__PURE__ */ Symbol.for("react.offscreen"), At = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), zt = /* @__PURE__ */ Symbol.for("react.cache"), Nt = /* @__PURE__ */ Symbol.for("react.tracing_marker"), Fn = Symbol.iterator, Gn = "@@iterator";
    function Rt(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Fn && e[Fn] || e[Gn];
      return typeof t == "function" ? t : null;
    }
    var $t = Object.assign, qt = 0, kt, gn, mn, Sr, ir, Xn, Oo;
    function Kr() {
    }
    Kr.__reactDisabledLog = !0;
    function wu() {
      {
        if (qt === 0) {
          kt = console.log, gn = console.info, mn = console.warn, Sr = console.error, ir = console.group, Xn = console.groupCollapsed, Oo = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Kr,
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
        qt++;
      }
    }
    function Tu() {
      {
        if (qt--, qt === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: $t({}, e, {
              value: kt
            }),
            info: $t({}, e, {
              value: gn
            }),
            warn: $t({}, e, {
              value: mn
            }),
            error: $t({}, e, {
              value: Sr
            }),
            group: $t({}, e, {
              value: ir
            }),
            groupCollapsed: $t({}, e, {
              value: Xn
            }),
            groupEnd: $t({}, e, {
              value: Oo
            })
          });
        }
        qt < 0 && p("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ql = s.ReactCurrentDispatcher, Gi;
    function Ea(e, t, i) {
      {
        if (Gi === void 0)
          try {
            throw Error();
          } catch (c) {
            var o = c.stack.trim().match(/\n( *(at )?)/);
            Gi = o && o[1] || "";
          }
        return `
` + Gi + e;
      }
    }
    var Ja = !1, ei;
    {
      var da = typeof WeakMap == "function" ? WeakMap : Map;
      ei = new da();
    }
    function Zr(e, t) {
      if (!e || Ja)
        return "";
      {
        var i = ei.get(e);
        if (i !== void 0)
          return i;
      }
      var o;
      Ja = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var v;
      v = Ql.current, Ql.current = null, wu();
      try {
        if (t) {
          var g = function() {
            throw Error();
          };
          if (Object.defineProperty(g.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(g, []);
            } catch (ce) {
              o = ce;
            }
            Reflect.construct(e, [], g);
          } else {
            try {
              g.call();
            } catch (ce) {
              o = ce;
            }
            e.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ce) {
            o = ce;
          }
          e();
        }
      } catch (ce) {
        if (ce && o && typeof ce.stack == "string") {
          for (var w = ce.stack.split(`
`), x = o.stack.split(`
`), O = w.length - 1, L = x.length - 1; O >= 1 && L >= 0 && w[O] !== x[L]; )
            L--;
          for (; O >= 1 && L >= 0; O--, L--)
            if (w[O] !== x[L]) {
              if (O !== 1 || L !== 1)
                do
                  if (O--, L--, L < 0 || w[O] !== x[L]) {
                    var B = `
` + w[O].replace(" at new ", " at ");
                    return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), typeof e == "function" && ei.set(e, B), B;
                  }
                while (O >= 1 && L >= 0);
              break;
            }
        }
      } finally {
        Ja = !1, Ql.current = v, Tu(), Error.prepareStackTrace = c;
      }
      var I = e ? e.displayName || e.name : "", le = I ? Ea(I) : "";
      return typeof e == "function" && ei.set(e, le), le;
    }
    function va(e, t, i) {
      return Zr(e, !0);
    }
    function Ua(e, t, i) {
      return Zr(e, !1);
    }
    function mi(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function Ca(e, t, i) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Zr(e, mi(e));
      if (typeof e == "string")
        return Ea(e);
      switch (e) {
        case pe:
          return Ea("Suspense");
        case He:
          return Ea("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case Ee:
            return Ua(e.render);
          case vt:
            return Ca(e.type, t, i);
          case ct: {
            var o = e, c = o._payload, v = o._init;
            try {
              return Ca(v(c), t, i);
            } catch {
            }
          }
        }
      return "";
    }
    function ti(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case k:
          return Ea(e.type);
        case Re:
          return Ea("Lazy");
        case $:
          return Ea("Suspense");
        case se:
          return Ea("SuspenseList");
        case C:
        case b:
        case re:
          return Ua(e.type);
        case Y:
          return Ua(e.type.render);
        case T:
          return va(e.type);
        default:
          return "";
      }
    }
    function Dr(e) {
      try {
        var t = "", i = e;
        do
          t += ti(i), i = i.return;
        while (i);
        return t;
      } catch (o) {
        return `
Error generating stack: ` + o.message + `
` + o.stack;
      }
    }
    function Sn(e, t, i) {
      var o = e.displayName;
      if (o)
        return o;
      var c = t.displayName || t.name || "";
      return c !== "" ? i + "(" + c + ")" : i;
    }
    function pa(e) {
      return e.displayName || "Context";
    }
    function on(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && p("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case ln:
          return "Fragment";
        case an:
          return "Portal";
        case ar:
          return "Profiler";
        case Qn:
          return "StrictMode";
        case pe:
          return "Suspense";
        case He:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case j:
            var t = e;
            return pa(t) + ".Consumer";
          case jn:
            var i = e;
            return pa(i._context) + ".Provider";
          case Ee:
            return Sn(e, e.render, "ForwardRef");
          case vt:
            var o = e.displayName || null;
            return o !== null ? o : on(e.type) || "Memo";
          case ct: {
            var c = e, v = c._payload, g = c._init;
            try {
              return on(g(v));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Xi(e, t, i) {
      var o = t.displayName || t.name || "";
      return e.displayName || (o !== "" ? i + "(" + o + ")" : i);
    }
    function fn(e) {
      return e.displayName || "Context";
    }
    function Vt(e) {
      var t = e.tag, i = e.type;
      switch (t) {
        case we:
          return "Cache";
        case X:
          var o = i;
          return fn(o) + ".Consumer";
        case K:
          var c = i;
          return fn(c._context) + ".Provider";
        case G:
          return "DehydratedFragment";
        case Y:
          return Xi(i, i.render, "ForwardRef");
        case A:
          return "Fragment";
        case k:
          return i;
        case D:
          return "Portal";
        case R:
          return "Root";
        case z:
          return "Text";
        case Re:
          return on(i);
        case N:
          return i === Qn ? "StrictMode" : "Mode";
        case ae:
          return "Offscreen";
        case P:
          return "Profiler";
        case fe:
          return "Scope";
        case $:
          return "Suspense";
        case se:
          return "SuspenseList";
        case Ne:
          return "TracingMarker";
        // The display name for this tags come from the user-provided type:
        case T:
        case C:
        case he:
        case b:
        case Q:
        case re:
          if (typeof i == "function")
            return i.displayName || i.name || null;
          if (typeof i == "string")
            return i;
          break;
      }
      return null;
    }
    var Ki = s.ReactDebugCurrentFrame, Tr = null, ni = !1;
    function Er() {
      {
        if (Tr === null)
          return null;
        var e = Tr._debugOwner;
        if (e !== null && typeof e < "u")
          return Vt(e);
      }
      return null;
    }
    function Cr() {
      return Tr === null ? "" : Dr(Tr);
    }
    function Kn() {
      Ki.getCurrentStack = null, Tr = null, ni = !1;
    }
    function Hn(e) {
      Ki.getCurrentStack = e === null ? null : Cr, Tr = e, ni = !1;
    }
    function yi() {
      return Tr;
    }
    function vr(e) {
      ni = e;
    }
    function ha(e) {
      return "" + e;
    }
    function wa(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Xe(e), e;
        default:
          return "";
      }
    }
    var zo = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function ms(e, t) {
      zo[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || p("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || p("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function ys(e) {
      var t = e.type, i = e.nodeName;
      return i && i.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Gl(e) {
      return e._valueTracker;
    }
    function Lo(e) {
      e._valueTracker = null;
    }
    function Ed(e) {
      var t = "";
      return e && (ys(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function gi(e) {
      var t = ys(e) ? "checked" : "value", i = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Xe(e[t]);
      var o = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof i > "u" || typeof i.get != "function" || typeof i.set != "function")) {
        var c = i.get, v = i.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return c.call(this);
          },
          set: function(w) {
            Xe(w), o = "" + w, v.call(this, w);
          }
        }), Object.defineProperty(e, t, {
          enumerable: i.enumerable
        });
        var g = {
          getValue: function() {
            return o;
          },
          setValue: function(w) {
            Xe(w), o = "" + w;
          },
          stopTracking: function() {
            Lo(e), delete e[t];
          }
        };
        return g;
      }
    }
    function ji(e) {
      Gl(e) || (e._valueTracker = gi(e));
    }
    function Zi(e) {
      if (!e)
        return !1;
      var t = Gl(e);
      if (!t)
        return !0;
      var i = t.getValue(), o = Ed(e);
      return o !== i ? (t.setValue(o), !0) : !1;
    }
    function Si(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Ru = !1, bu = !1, Xl = !1, Ao = !1;
    function xu(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function Mu(e, t) {
      var i = e, o = t.checked, c = $t({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: o ?? i._wrapperState.initialChecked
      });
      return c;
    }
    function Fi(e, t) {
      ms("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !bu && (p("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Er() || "A component", t.type), bu = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Ru && (p("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Er() || "A component", t.type), Ru = !0);
      var i = e, o = t.defaultValue == null ? "" : t.defaultValue;
      i._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: wa(t.value != null ? t.value : o),
        controlled: xu(t)
      };
    }
    function M(e, t) {
      var i = e, o = t.checked;
      o != null && Xt(i, "checked", o, !1);
    }
    function F(e, t) {
      var i = e;
      {
        var o = xu(t);
        !i._wrapperState.controlled && o && !Ao && (p("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Ao = !0), i._wrapperState.controlled && !o && !Xl && (p("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Xl = !0);
      }
      M(e, t);
      var c = wa(t.value), v = t.type;
      if (c != null)
        v === "number" ? (c === 0 && i.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        i.value != c) && (i.value = ha(c)) : i.value !== ha(c) && (i.value = ha(c));
      else if (v === "submit" || v === "reset") {
        i.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Ut(i, t.type, c) : t.hasOwnProperty("defaultValue") && Ut(i, t.type, wa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (i.defaultChecked = !!t.defaultChecked);
    }
    function oe(e, t, i) {
      var o = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var c = t.type, v = c === "submit" || c === "reset";
        if (v && (t.value === void 0 || t.value === null))
          return;
        var g = ha(o._wrapperState.initialValue);
        i || g !== o.value && (o.value = g), o.defaultValue = g;
      }
      var w = o.name;
      w !== "" && (o.name = ""), o.defaultChecked = !o.defaultChecked, o.defaultChecked = !!o._wrapperState.initialChecked, w !== "" && (o.name = w);
    }
    function me(e, t) {
      var i = e;
      F(i, t), Ve(i, t);
    }
    function Ve(e, t) {
      var i = t.name;
      if (t.type === "radio" && i != null) {
        for (var o = e; o.parentNode; )
          o = o.parentNode;
        be(i, "name");
        for (var c = o.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'), v = 0; v < c.length; v++) {
          var g = c[v];
          if (!(g === e || g.form !== e.form)) {
            var w = om(g);
            if (!w)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            Zi(g), F(g, w);
          }
        }
      }
    }
    function Ut(e, t, i) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Si(e.ownerDocument) !== e) && (i == null ? e.defaultValue = ha(e._wrapperState.initialValue) : e.defaultValue !== ha(i) && (e.defaultValue = ha(i)));
    }
    var Je = !1, Ht = !1, yn = !1;
    function Ln(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? n.Children.forEach(t.children, function(i) {
        i != null && (typeof i == "string" || typeof i == "number" || Ht || (Ht = !0, p("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (yn || (yn = !0, p("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Je && (p("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Je = !0);
    }
    function lr(e, t) {
      t.value != null && e.setAttribute("value", ha(wa(t.value)));
    }
    var Zn = Array.isArray;
    function dn(e) {
      return Zn(e);
    }
    var Jn;
    Jn = !1;
    function pr() {
      var e = Er();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var Kl = ["value", "defaultValue"];
    function gs(e) {
      {
        ms("select", e);
        for (var t = 0; t < Kl.length; t++) {
          var i = Kl[t];
          if (e[i] != null) {
            var o = dn(e[i]);
            e.multiple && !o ? p("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", i, pr()) : !e.multiple && o && p("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", i, pr());
          }
        }
      }
    }
    function wl(e, t, i, o) {
      var c = e.options;
      if (t) {
        for (var v = i, g = {}, w = 0; w < v.length; w++)
          g["$" + v[w]] = !0;
        for (var x = 0; x < c.length; x++) {
          var O = g.hasOwnProperty("$" + c[x].value);
          c[x].selected !== O && (c[x].selected = O), O && o && (c[x].defaultSelected = !0);
        }
      } else {
        for (var L = ha(wa(i)), B = null, I = 0; I < c.length; I++) {
          if (c[I].value === L) {
            c[I].selected = !0, o && (c[I].defaultSelected = !0);
            return;
          }
          B === null && !c[I].disabled && (B = c[I]);
        }
        B !== null && (B.selected = !0);
      }
    }
    function Ss(e, t) {
      return $t({}, t, {
        value: void 0
      });
    }
    function No(e, t) {
      var i = e;
      gs(t), i._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Jn && (p("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Jn = !0);
    }
    function Cd(e, t) {
      var i = e;
      i.multiple = !!t.multiple;
      var o = t.value;
      o != null ? wl(i, !!t.multiple, o, !1) : t.defaultValue != null && wl(i, !!t.multiple, t.defaultValue, !0);
    }
    function Oc(e, t) {
      var i = e, o = i._wrapperState.wasMultiple;
      i._wrapperState.wasMultiple = !!t.multiple;
      var c = t.value;
      c != null ? wl(i, !!t.multiple, c, !1) : o !== !!t.multiple && (t.defaultValue != null ? wl(i, !!t.multiple, t.defaultValue, !0) : wl(i, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function wd(e, t) {
      var i = e, o = t.value;
      o != null && wl(i, !!t.multiple, o, !1);
    }
    var Dp = !1;
    function Td(e, t) {
      var i = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var o = $t({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: ha(i._wrapperState.initialValue)
      });
      return o;
    }
    function Rd(e, t) {
      var i = e;
      ms("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Dp && (p("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Er() || "A component"), Dp = !0);
      var o = t.value;
      if (o == null) {
        var c = t.children, v = t.defaultValue;
        if (c != null) {
          p("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (v != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (dn(c)) {
              if (c.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              c = c[0];
            }
            v = c;
          }
        }
        v == null && (v = ""), o = v;
      }
      i._wrapperState = {
        initialValue: wa(o)
      };
    }
    function Op(e, t) {
      var i = e, o = wa(t.value), c = wa(t.defaultValue);
      if (o != null) {
        var v = ha(o);
        v !== i.value && (i.value = v), t.defaultValue == null && i.defaultValue !== v && (i.defaultValue = v);
      }
      c != null && (i.defaultValue = ha(c));
    }
    function zp(e, t) {
      var i = e, o = i.textContent;
      o === i._wrapperState.initialValue && o !== "" && o !== null && (i.value = o);
    }
    function Uy(e, t) {
      Op(e, t);
    }
    var Tl = "http://www.w3.org/1999/xhtml", bd = "http://www.w3.org/1998/Math/MathML", xd = "http://www.w3.org/2000/svg";
    function Md(e) {
      switch (e) {
        case "svg":
          return xd;
        case "math":
          return bd;
        default:
          return Tl;
      }
    }
    function _d(e, t) {
      return e == null || e === Tl ? Md(t) : e === xd && t === "foreignObject" ? Tl : e;
    }
    var Lp = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, i, o, c) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, i, o, c);
        });
      } : e;
    }, zc, Ap = Lp(function(e, t) {
      if (e.namespaceURI === xd && !("innerHTML" in e)) {
        zc = zc || document.createElement("div"), zc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var i = zc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; i.firstChild; )
          e.appendChild(i.firstChild);
        return;
      }
      e.innerHTML = t;
    }), ja = 1, Rl = 3, Or = 8, bl = 9, kd = 11, _u = function(e, t) {
      if (t) {
        var i = e.firstChild;
        if (i && i === e.lastChild && i.nodeType === Rl) {
          i.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Es = {
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
    }, Cs = {
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
    function Np(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Up = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Cs).forEach(function(e) {
      Up.forEach(function(t) {
        Cs[Np(t, e)] = Cs[e];
      });
    });
    function Lc(e, t, i) {
      var o = t == null || typeof t == "boolean" || t === "";
      return o ? "" : !i && typeof t == "number" && t !== 0 && !(Cs.hasOwnProperty(e) && Cs[e]) ? t + "px" : (nt(t, e), ("" + t).trim());
    }
    var jp = /([A-Z])/g, Fp = /^ms-/;
    function ku(e) {
      return e.replace(jp, "-$1").toLowerCase().replace(Fp, "-ms-");
    }
    var Hp = function() {
    };
    {
      var jy = /^(?:webkit|moz|o)[A-Z]/, Fy = /^-ms-/, Pp = /-(.)/g, Dd = /;\s*$/, Ji = {}, Uo = {}, $p = !1, ws = !1, Hy = function(e) {
        return e.replace(Pp, function(t, i) {
          return i.toUpperCase();
        });
      }, Vp = function(e) {
        Ji.hasOwnProperty(e) && Ji[e] || (Ji[e] = !0, p(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Hy(e.replace(Fy, "ms-"))
        ));
      }, Od = function(e) {
        Ji.hasOwnProperty(e) && Ji[e] || (Ji[e] = !0, p("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, zd = function(e, t) {
        Uo.hasOwnProperty(t) && Uo[t] || (Uo[t] = !0, p(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Dd, "")));
      }, qp = function(e, t) {
        $p || ($p = !0, p("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Ip = function(e, t) {
        ws || (ws = !0, p("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Hp = function(e, t) {
        e.indexOf("-") > -1 ? Vp(e) : jy.test(e) ? Od(e) : Dd.test(t) && zd(e, t), typeof t == "number" && (isNaN(t) ? qp(e, t) : isFinite(t) || Ip(e, t));
      };
    }
    var Yp = Hp;
    function Py(e) {
      {
        var t = "", i = "";
        for (var o in e)
          if (e.hasOwnProperty(o)) {
            var c = e[o];
            if (c != null) {
              var v = o.indexOf("--") === 0;
              t += i + (v ? o : ku(o)) + ":", t += Lc(o, c, v), i = ";";
            }
          }
        return t || null;
      }
    }
    function Wp(e, t) {
      var i = e.style;
      for (var o in t)
        if (t.hasOwnProperty(o)) {
          var c = o.indexOf("--") === 0;
          c || Yp(o, t[o]);
          var v = Lc(o, t[o], c);
          o === "float" && (o = "cssFloat"), c ? i.setProperty(o, v) : i[o] = v;
        }
    }
    function $y(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Bp(e) {
      var t = {};
      for (var i in e)
        for (var o = Es[i] || [i], c = 0; c < o.length; c++)
          t[o[c]] = i;
      return t;
    }
    function Vy(e, t) {
      {
        if (!t)
          return;
        var i = Bp(e), o = Bp(t), c = {};
        for (var v in i) {
          var g = i[v], w = o[v];
          if (w && g !== w) {
            var x = g + "," + w;
            if (c[x])
              continue;
            c[x] = !0, p("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", $y(e[g]) ? "Removing" : "Updating", g, w);
          }
        }
      }
    }
    var Hi = {
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
    }, Ts = $t({
      menuitem: !0
    }, Hi), Qp = "__html";
    function Ac(e, t) {
      if (t) {
        if (Ts[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Qp in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && p("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Zl(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
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
    var Rs = {
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
    }, Nc = {
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
    }, Du = {}, qy = new RegExp("^(aria)-[" + xe + "]*$"), Ou = new RegExp("^(aria)[A-Z][" + xe + "]*$");
    function Ld(e, t) {
      {
        if (We.call(Du, t) && Du[t])
          return !0;
        if (Ou.test(t)) {
          var i = "aria-" + t.slice(4).toLowerCase(), o = Nc.hasOwnProperty(i) ? i : null;
          if (o == null)
            return p("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Du[t] = !0, !0;
          if (t !== o)
            return p("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, o), Du[t] = !0, !0;
        }
        if (qy.test(t)) {
          var c = t.toLowerCase(), v = Nc.hasOwnProperty(c) ? c : null;
          if (v == null)
            return Du[t] = !0, !1;
          if (t !== v)
            return p("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, v), Du[t] = !0, !0;
        }
      }
      return !0;
    }
    function bs(e, t) {
      {
        var i = [];
        for (var o in t) {
          var c = Ld(e, o);
          c || i.push(o);
        }
        var v = i.map(function(g) {
          return "`" + g + "`";
        }).join(", ");
        i.length === 1 ? p("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", v, e) : i.length > 1 && p("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", v, e);
      }
    }
    function Ad(e, t) {
      Zl(e, t) || bs(e, t);
    }
    var Nd = !1;
    function Uc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !Nd && (Nd = !0, e === "select" && t.multiple ? p("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : p("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var jo = function() {
    };
    {
      var Jr = {}, Ud = /^on./, jc = /^on[^A-Z]/, Gp = new RegExp("^(aria)-[" + xe + "]*$"), Xp = new RegExp("^(aria)[A-Z][" + xe + "]*$");
      jo = function(e, t, i, o) {
        if (We.call(Jr, t) && Jr[t])
          return !0;
        var c = t.toLowerCase();
        if (c === "onfocusin" || c === "onfocusout")
          return p("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Jr[t] = !0, !0;
        if (o != null) {
          var v = o.registrationNameDependencies, g = o.possibleRegistrationNames;
          if (v.hasOwnProperty(t))
            return !0;
          var w = g.hasOwnProperty(c) ? g[c] : null;
          if (w != null)
            return p("Invalid event handler property `%s`. Did you mean `%s`?", t, w), Jr[t] = !0, !0;
          if (Ud.test(t))
            return p("Unknown event handler property `%s`. It will be ignored.", t), Jr[t] = !0, !0;
        } else if (Ud.test(t))
          return jc.test(t) && p("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Jr[t] = !0, !0;
        if (Gp.test(t) || Xp.test(t))
          return !0;
        if (c === "innerhtml")
          return p("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Jr[t] = !0, !0;
        if (c === "aria")
          return p("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Jr[t] = !0, !0;
        if (c === "is" && i !== null && i !== void 0 && typeof i != "string")
          return p("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof i), Jr[t] = !0, !0;
        if (typeof i == "number" && isNaN(i))
          return p("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Jr[t] = !0, !0;
        var x = Wt(t), O = x !== null && x.type === gt;
        if (Rs.hasOwnProperty(c)) {
          var L = Rs[c];
          if (L !== t)
            return p("Invalid DOM property `%s`. Did you mean `%s`?", t, L), Jr[t] = !0, !0;
        } else if (!O && t !== c)
          return p("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, c), Jr[t] = !0, !0;
        return typeof i == "boolean" && Qt(t, i, x, !1) ? (i ? p('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', i, t, t, i, t) : p('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', i, t, t, i, t, t, t), Jr[t] = !0, !0) : O ? !0 : Qt(t, i, x, !1) ? (Jr[t] = !0, !1) : ((i === "false" || i === "true") && x !== null && x.type === $e && (p("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", i, t, i === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, i), Jr[t] = !0), !0);
      };
    }
    var Kp = function(e, t, i) {
      {
        var o = [];
        for (var c in t) {
          var v = jo(e, c, t[c], i);
          v || o.push(c);
        }
        var g = o.map(function(w) {
          return "`" + w + "`";
        }).join(", ");
        o.length === 1 ? p("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", g, e) : o.length > 1 && p("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", g, e);
      }
    };
    function Zp(e, t, i) {
      Zl(e, t) || Kp(e, t, i);
    }
    var jd = 1, Fc = 2, Ei = 4, Fd = jd | Fc | Ei, Fo = null;
    function Iy(e) {
      Fo !== null && p("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Fo = e;
    }
    function Yy() {
      Fo === null && p("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Fo = null;
    }
    function xs(e) {
      return e === Fo;
    }
    function Hd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Rl ? t.parentNode : t;
    }
    var Hc = null, Ho = null, Yn = null;
    function Pc(e) {
      var t = Zu(e);
      if (t) {
        if (typeof Hc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var i = t.stateNode;
        if (i) {
          var o = om(i);
          Hc(t.stateNode, t.type, o);
        }
      }
    }
    function $c(e) {
      Hc = e;
    }
    function zu(e) {
      Ho ? Yn ? Yn.push(e) : Yn = [e] : Ho = e;
    }
    function Jp() {
      return Ho !== null || Yn !== null;
    }
    function Vc() {
      if (Ho) {
        var e = Ho, t = Yn;
        if (Ho = null, Yn = null, Pc(e), t)
          for (var i = 0; i < t.length; i++)
            Pc(t[i]);
      }
    }
    var Lu = function(e, t) {
      return e(t);
    }, Ms = function() {
    }, Jl = !1;
    function eh() {
      var e = Jp();
      e && (Ms(), Vc());
    }
    function th(e, t, i) {
      if (Jl)
        return e(t, i);
      Jl = !0;
      try {
        return Lu(e, t, i);
      } finally {
        Jl = !1, eh();
      }
    }
    function Wy(e, t, i) {
      Lu = e, Ms = i;
    }
    function nh(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function qc(e, t, i) {
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
          return !!(i.disabled && nh(t));
        default:
          return !1;
      }
    }
    function eo(e, t) {
      var i = e.stateNode;
      if (i === null)
        return null;
      var o = om(i);
      if (o === null)
        return null;
      var c = o[t];
      if (qc(t, e.type, o))
        return null;
      if (c && typeof c != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof c + "` type.");
      return c;
    }
    var _s = !1;
    if (Ze)
      try {
        var Po = {};
        Object.defineProperty(Po, "passive", {
          get: function() {
            _s = !0;
          }
        }), window.addEventListener("test", Po, Po), window.removeEventListener("test", Po, Po);
      } catch {
        _s = !1;
      }
    function Ic(e, t, i, o, c, v, g, w, x) {
      var O = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(i, O);
      } catch (L) {
        this.onError(L);
      }
    }
    var Yc = Ic;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Pd = document.createElement("react");
      Yc = function(t, i, o, c, v, g, w, x, O) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var L = document.createEvent("Event"), B = !1, I = !0, le = window.event, ce = Object.getOwnPropertyDescriptor(window, "event");
        function ye() {
          Pd.removeEventListener(ge, jt, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = le);
        }
        var tt = Array.prototype.slice.call(arguments, 3);
        function jt() {
          B = !0, ye(), i.apply(o, tt), I = !1;
        }
        var bt, zn = !1, Tn = !1;
        function ee(te) {
          if (bt = te.error, zn = !0, bt === null && te.colno === 0 && te.lineno === 0 && (Tn = !0), te.defaultPrevented && bt != null && typeof bt == "object")
            try {
              bt._suppressLogging = !0;
            } catch {
            }
        }
        var ge = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", ee), Pd.addEventListener(ge, jt, !1), L.initEvent(ge, !1, !1), Pd.dispatchEvent(L), ce && Object.defineProperty(window, "event", ce), B && I && (zn ? Tn && (bt = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : bt = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(bt)), window.removeEventListener("error", ee), !B)
          return ye(), Ic.apply(this, arguments);
      };
    }
    var rh = Yc, Au = !1, Wc = null, Nu = !1, el = null, ah = {
      onError: function(e) {
        Au = !0, Wc = e;
      }
    };
    function to(e, t, i, o, c, v, g, w, x) {
      Au = !1, Wc = null, rh.apply(ah, arguments);
    }
    function tl(e, t, i, o, c, v, g, w, x) {
      if (to.apply(this, arguments), Au) {
        var O = Ds();
        Nu || (Nu = !0, el = O);
      }
    }
    function ks() {
      if (Nu) {
        var e = el;
        throw Nu = !1, el = null, e;
      }
    }
    function xl() {
      return Au;
    }
    function Ds() {
      if (Au) {
        var e = Wc;
        return Au = !1, Wc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Uu(e) {
      return e._reactInternals;
    }
    function By(e) {
      return e._reactInternals !== void 0;
    }
    function $o(e, t) {
      e._reactInternals = t;
    }
    var Dt = (
      /*                      */
      0
    ), Pi = (
      /*                */
      1
    ), hr = (
      /*                    */
      2
    ), kn = (
      /*                       */
      4
    ), Ci = (
      /*                */
      16
    ), wi = (
      /*                 */
      32
    ), or = (
      /*                     */
      64
    ), Mt = (
      /*                   */
      128
    ), ma = (
      /*            */
      256
    ), wr = (
      /*                          */
      512
    ), $r = (
      /*                     */
      1024
    ), Fa = (
      /*                      */
      2048
    ), Ha = (
      /*                    */
      4096
    ), zr = (
      /*                   */
      8192
    ), ju = (
      /*             */
      16384
    ), ih = (
      /*               */
      32767
    ), Os = (
      /*                   */
      32768
    ), Yr = (
      /*                */
      65536
    ), Bc = (
      /* */
      131072
    ), nl = (
      /*                       */
      1048576
    ), Fu = (
      /*                    */
      2097152
    ), Ml = (
      /*                 */
      4194304
    ), Qc = (
      /*                */
      8388608
    ), no = (
      /*               */
      16777216
    ), rl = (
      /*              */
      33554432
    ), ro = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      kn | $r | 0
    ), ao = hr | kn | Ci | wi | wr | Ha | zr, io = kn | or | wr | zr, _l = Fa | Ci, Lr = Ml | Qc | Fu, Ti = s.ReactCurrentOwner;
    function ri(e) {
      var t = e, i = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var o = t;
        do
          t = o, (t.flags & (hr | Ha)) !== Dt && (i = t.return), o = t.return;
        while (o);
      }
      return t.tag === R ? i : null;
    }
    function al(e) {
      if (e.tag === $) {
        var t = e.memoizedState;
        if (t === null) {
          var i = e.alternate;
          i !== null && (t = i.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function il(e) {
      return e.tag === R ? e.stateNode.containerInfo : null;
    }
    function Vo(e) {
      return ri(e) === e;
    }
    function lh(e) {
      {
        var t = Ti.current;
        if (t !== null && t.tag === T) {
          var i = t, o = i.stateNode;
          o._warnedAboutRefsInRender || p("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Vt(i) || "A component"), o._warnedAboutRefsInRender = !0;
        }
      }
      var c = Uu(e);
      return c ? ri(c) === c : !1;
    }
    function Gc(e) {
      if (ri(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Xc(e) {
      var t = e.alternate;
      if (!t) {
        var i = ri(e);
        if (i === null)
          throw new Error("Unable to find node on an unmounted component.");
        return i !== e ? null : e;
      }
      for (var o = e, c = t; ; ) {
        var v = o.return;
        if (v === null)
          break;
        var g = v.alternate;
        if (g === null) {
          var w = v.return;
          if (w !== null) {
            o = c = w;
            continue;
          }
          break;
        }
        if (v.child === g.child) {
          for (var x = v.child; x; ) {
            if (x === o)
              return Gc(v), e;
            if (x === c)
              return Gc(v), t;
            x = x.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (o.return !== c.return)
          o = v, c = g;
        else {
          for (var O = !1, L = v.child; L; ) {
            if (L === o) {
              O = !0, o = v, c = g;
              break;
            }
            if (L === c) {
              O = !0, c = v, o = g;
              break;
            }
            L = L.sibling;
          }
          if (!O) {
            for (L = g.child; L; ) {
              if (L === o) {
                O = !0, o = g, c = v;
                break;
              }
              if (L === c) {
                O = !0, c = g, o = v;
                break;
              }
              L = L.sibling;
            }
            if (!O)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (o.alternate !== c)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (o.tag !== R)
        throw new Error("Unable to find node on an unmounted component.");
      return o.stateNode.current === o ? e : t;
    }
    function Pa(e) {
      var t = Xc(e);
      return t !== null ? $a(t) : null;
    }
    function $a(e) {
      if (e.tag === k || e.tag === z)
        return e;
      for (var t = e.child; t !== null; ) {
        var i = $a(t);
        if (i !== null)
          return i;
        t = t.sibling;
      }
      return null;
    }
    function fr(e) {
      var t = Xc(e);
      return t !== null ? Ri(t) : null;
    }
    function Ri(e) {
      if (e.tag === k || e.tag === z)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== D) {
          var i = Ri(t);
          if (i !== null)
            return i;
        }
        t = t.sibling;
      }
      return null;
    }
    var $d = l.unstable_scheduleCallback, oh = l.unstable_cancelCallback, Vd = l.unstable_shouldYield, qd = l.unstable_requestPaint, Vr = l.unstable_now, Kc = l.unstable_getCurrentPriorityLevel, zs = l.unstable_ImmediatePriority, lo = l.unstable_UserBlockingPriority, kl = l.unstable_NormalPriority, Qy = l.unstable_LowPriority, qo = l.unstable_IdlePriority, Zc = l.unstable_yieldValue, uh = l.unstable_setDisableYieldValue, Io = null, Rr = null, et = null, ai = !1, Va = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function Hu(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return p("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        De && (e = $t({}, e, {
          getLaneLabelMap: Yo,
          injectProfilingHooks: bi
        })), Io = t.inject(e), Rr = t;
      } catch (i) {
        p("React instrumentation encountered an error: %s.", i);
      }
      return !!t.checkDCE;
    }
    function Id(e, t) {
      if (Rr && typeof Rr.onScheduleFiberRoot == "function")
        try {
          Rr.onScheduleFiberRoot(Io, e, t);
        } catch (i) {
          ai || (ai = !0, p("React instrumentation encountered an error: %s", i));
        }
    }
    function Yd(e, t) {
      if (Rr && typeof Rr.onCommitFiberRoot == "function")
        try {
          var i = (e.current.flags & Mt) === Mt;
          if (Me) {
            var o;
            switch (t) {
              case Ta:
                o = zs;
                break;
              case ol:
                o = lo;
                break;
              case xi:
                o = kl;
                break;
              case Mi:
                o = qo;
                break;
              default:
                o = kl;
                break;
            }
            Rr.onCommitFiberRoot(Io, e, o, i);
          }
        } catch (c) {
          ai || (ai = !0, p("React instrumentation encountered an error: %s", c));
        }
    }
    function Wd(e) {
      if (Rr && typeof Rr.onPostCommitFiberRoot == "function")
        try {
          Rr.onPostCommitFiberRoot(Io, e);
        } catch (t) {
          ai || (ai = !0, p("React instrumentation encountered an error: %s", t));
        }
    }
    function Bd(e) {
      if (Rr && typeof Rr.onCommitFiberUnmount == "function")
        try {
          Rr.onCommitFiberUnmount(Io, e);
        } catch (t) {
          ai || (ai = !0, p("React instrumentation encountered an error: %s", t));
        }
    }
    function mr(e) {
      if (typeof Zc == "function" && (uh(e), h(e)), Rr && typeof Rr.setStrictMode == "function")
        try {
          Rr.setStrictMode(Io, e);
        } catch (t) {
          ai || (ai = !0, p("React instrumentation encountered an error: %s", t));
        }
    }
    function bi(e) {
      et = e;
    }
    function Yo() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, i = 0; i < Qo; i++) {
          var o = dh(t);
          e.set(t, o), t *= 2;
        }
        return e;
      }
    }
    function Qd(e) {
      et !== null && typeof et.markCommitStarted == "function" && et.markCommitStarted(e);
    }
    function Gd() {
      et !== null && typeof et.markCommitStopped == "function" && et.markCommitStopped();
    }
    function ii(e) {
      et !== null && typeof et.markComponentRenderStarted == "function" && et.markComponentRenderStarted(e);
    }
    function li() {
      et !== null && typeof et.markComponentRenderStopped == "function" && et.markComponentRenderStopped();
    }
    function Xd(e) {
      et !== null && typeof et.markComponentPassiveEffectMountStarted == "function" && et.markComponentPassiveEffectMountStarted(e);
    }
    function sh() {
      et !== null && typeof et.markComponentPassiveEffectMountStopped == "function" && et.markComponentPassiveEffectMountStopped();
    }
    function Dl(e) {
      et !== null && typeof et.markComponentPassiveEffectUnmountStarted == "function" && et.markComponentPassiveEffectUnmountStarted(e);
    }
    function oo() {
      et !== null && typeof et.markComponentPassiveEffectUnmountStopped == "function" && et.markComponentPassiveEffectUnmountStopped();
    }
    function Jc(e) {
      et !== null && typeof et.markComponentLayoutEffectMountStarted == "function" && et.markComponentLayoutEffectMountStarted(e);
    }
    function ch() {
      et !== null && typeof et.markComponentLayoutEffectMountStopped == "function" && et.markComponentLayoutEffectMountStopped();
    }
    function Ls(e) {
      et !== null && typeof et.markComponentLayoutEffectUnmountStarted == "function" && et.markComponentLayoutEffectUnmountStarted(e);
    }
    function Kd() {
      et !== null && typeof et.markComponentLayoutEffectUnmountStopped == "function" && et.markComponentLayoutEffectUnmountStopped();
    }
    function As(e, t, i) {
      et !== null && typeof et.markComponentErrored == "function" && et.markComponentErrored(e, t, i);
    }
    function ll(e, t, i) {
      et !== null && typeof et.markComponentSuspended == "function" && et.markComponentSuspended(e, t, i);
    }
    function Ns(e) {
      et !== null && typeof et.markLayoutEffectsStarted == "function" && et.markLayoutEffectsStarted(e);
    }
    function Us() {
      et !== null && typeof et.markLayoutEffectsStopped == "function" && et.markLayoutEffectsStopped();
    }
    function Wo(e) {
      et !== null && typeof et.markPassiveEffectsStarted == "function" && et.markPassiveEffectsStarted(e);
    }
    function Zd() {
      et !== null && typeof et.markPassiveEffectsStopped == "function" && et.markPassiveEffectsStopped();
    }
    function Bo(e) {
      et !== null && typeof et.markRenderStarted == "function" && et.markRenderStarted(e);
    }
    function fh() {
      et !== null && typeof et.markRenderYielded == "function" && et.markRenderYielded();
    }
    function ef() {
      et !== null && typeof et.markRenderStopped == "function" && et.markRenderStopped();
    }
    function yr(e) {
      et !== null && typeof et.markRenderScheduled == "function" && et.markRenderScheduled(e);
    }
    function tf(e, t) {
      et !== null && typeof et.markForceUpdateScheduled == "function" && et.markForceUpdateScheduled(e, t);
    }
    function js(e, t) {
      et !== null && typeof et.markStateUpdateScheduled == "function" && et.markStateUpdateScheduled(e, t);
    }
    var Ot = (
      /*                         */
      0
    ), pn = (
      /*                 */
      1
    ), Pn = (
      /*                    */
      2
    ), er = (
      /*               */
      8
    ), $n = (
      /*              */
      16
    ), Ar = Math.clz32 ? Math.clz32 : Fs, Wr = Math.log, nf = Math.LN2;
    function Fs(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Wr(t) / nf | 0) | 0;
    }
    var Qo = 31, _e = (
      /*                        */
      0
    ), Un = (
      /*                          */
      0
    ), It = (
      /*                        */
      1
    ), uo = (
      /*    */
      2
    ), $i = (
      /*             */
      4
    ), ya = (
      /*            */
      8
    ), br = (
      /*                     */
      16
    ), Ol = (
      /*                */
      32
    ), so = (
      /*                       */
      4194240
    ), Go = (
      /*                        */
      64
    ), rf = (
      /*                        */
      128
    ), af = (
      /*                        */
      256
    ), lf = (
      /*                        */
      512
    ), of = (
      /*                        */
      1024
    ), uf = (
      /*                        */
      2048
    ), sf = (
      /*                        */
      4096
    ), cf = (
      /*                        */
      8192
    ), ff = (
      /*                        */
      16384
    ), Xo = (
      /*                       */
      32768
    ), df = (
      /*                       */
      65536
    ), Pu = (
      /*                       */
      131072
    ), $u = (
      /*                       */
      262144
    ), vf = (
      /*                       */
      524288
    ), Hs = (
      /*                       */
      1048576
    ), pf = (
      /*                       */
      2097152
    ), Ps = (
      /*                            */
      130023424
    ), Ko = (
      /*                             */
      4194304
    ), hf = (
      /*                             */
      8388608
    ), $s = (
      /*                             */
      16777216
    ), mf = (
      /*                             */
      33554432
    ), yf = (
      /*                             */
      67108864
    ), Jd = Ko, Vs = (
      /*          */
      134217728
    ), ev = (
      /*                          */
      268435455
    ), qs = (
      /*               */
      268435456
    ), Zo = (
      /*                        */
      536870912
    ), qa = (
      /*                   */
      1073741824
    );
    function dh(e) {
      {
        if (e & It)
          return "Sync";
        if (e & uo)
          return "InputContinuousHydration";
        if (e & $i)
          return "InputContinuous";
        if (e & ya)
          return "DefaultHydration";
        if (e & br)
          return "Default";
        if (e & Ol)
          return "TransitionHydration";
        if (e & so)
          return "Transition";
        if (e & Ps)
          return "Retry";
        if (e & Vs)
          return "SelectiveHydration";
        if (e & qs)
          return "IdleHydration";
        if (e & Zo)
          return "Idle";
        if (e & qa)
          return "Offscreen";
      }
    }
    var rr = -1, Jo = Go, gf = Ko;
    function Is(e) {
      switch (co(e)) {
        case It:
          return It;
        case uo:
          return uo;
        case $i:
          return $i;
        case ya:
          return ya;
        case br:
          return br;
        case Ol:
          return Ol;
        case Go:
        case rf:
        case af:
        case lf:
        case of:
        case uf:
        case sf:
        case cf:
        case ff:
        case Xo:
        case df:
        case Pu:
        case $u:
        case vf:
        case Hs:
        case pf:
          return e & so;
        case Ko:
        case hf:
        case $s:
        case mf:
        case yf:
          return e & Ps;
        case Vs:
          return Vs;
        case qs:
          return qs;
        case Zo:
          return Zo;
        case qa:
          return qa;
        default:
          return p("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function Sf(e, t) {
      var i = e.pendingLanes;
      if (i === _e)
        return _e;
      var o = _e, c = e.suspendedLanes, v = e.pingedLanes, g = i & ev;
      if (g !== _e) {
        var w = g & ~c;
        if (w !== _e)
          o = Is(w);
        else {
          var x = g & v;
          x !== _e && (o = Is(x));
        }
      } else {
        var O = i & ~c;
        O !== _e ? o = Is(O) : v !== _e && (o = Is(v));
      }
      if (o === _e)
        return _e;
      if (t !== _e && t !== o && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & c) === _e) {
        var L = co(o), B = co(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          L >= B || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          L === br && (B & so) !== _e
        )
          return t;
      }
      (o & $i) !== _e && (o |= i & br);
      var I = e.entangledLanes;
      if (I !== _e)
        for (var le = e.entanglements, ce = o & I; ce > 0; ) {
          var ye = Nr(ce), tt = 1 << ye;
          o |= le[ye], ce &= ~tt;
        }
      return o;
    }
    function Vi(e, t) {
      for (var i = e.eventTimes, o = rr; t > 0; ) {
        var c = Nr(t), v = 1 << c, g = i[c];
        g > o && (o = g), t &= ~v;
      }
      return o;
    }
    function tv(e, t) {
      switch (e) {
        case It:
        case uo:
        case $i:
          return t + 250;
        case ya:
        case br:
        case Ol:
        case Go:
        case rf:
        case af:
        case lf:
        case of:
        case uf:
        case sf:
        case cf:
        case ff:
        case Xo:
        case df:
        case Pu:
        case $u:
        case vf:
        case Hs:
        case pf:
          return t + 5e3;
        case Ko:
        case hf:
        case $s:
        case mf:
        case yf:
          return rr;
        case Vs:
        case qs:
        case Zo:
        case qa:
          return rr;
        default:
          return p("Should have found matching lanes. This is a bug in React."), rr;
      }
    }
    function Ef(e, t) {
      for (var i = e.pendingLanes, o = e.suspendedLanes, c = e.pingedLanes, v = e.expirationTimes, g = i; g > 0; ) {
        var w = Nr(g), x = 1 << w, O = v[w];
        O === rr ? ((x & o) === _e || (x & c) !== _e) && (v[w] = tv(x, t)) : O <= t && (e.expiredLanes |= x), g &= ~x;
      }
    }
    function vh(e) {
      return Is(e.pendingLanes);
    }
    function Cf(e) {
      var t = e.pendingLanes & ~qa;
      return t !== _e ? t : t & qa ? qa : _e;
    }
    function ph(e) {
      return (e & It) !== _e;
    }
    function Ys(e) {
      return (e & ev) !== _e;
    }
    function eu(e) {
      return (e & Ps) === e;
    }
    function nv(e) {
      var t = It | $i | br;
      return (e & t) === _e;
    }
    function rv(e) {
      return (e & so) === e;
    }
    function wf(e, t) {
      var i = uo | $i | ya | br;
      return (t & i) !== _e;
    }
    function hh(e, t) {
      return (t & e.expiredLanes) !== _e;
    }
    function av(e) {
      return (e & so) !== _e;
    }
    function iv() {
      var e = Jo;
      return Jo <<= 1, (Jo & so) === _e && (Jo = Go), e;
    }
    function mh() {
      var e = gf;
      return gf <<= 1, (gf & Ps) === _e && (gf = Ko), e;
    }
    function co(e) {
      return e & -e;
    }
    function Ws(e) {
      return co(e);
    }
    function Nr(e) {
      return 31 - Ar(e);
    }
    function ea(e) {
      return Nr(e);
    }
    function Ia(e, t) {
      return (e & t) !== _e;
    }
    function tu(e, t) {
      return (e & t) === t;
    }
    function un(e, t) {
      return e | t;
    }
    function Bs(e, t) {
      return e & ~t;
    }
    function lv(e, t) {
      return e & t;
    }
    function yh(e) {
      return e;
    }
    function gh(e, t) {
      return e !== Un && e < t ? e : t;
    }
    function Qs(e) {
      for (var t = [], i = 0; i < Qo; i++)
        t.push(e);
      return t;
    }
    function Vu(e, t, i) {
      e.pendingLanes |= t, t !== Zo && (e.suspendedLanes = _e, e.pingedLanes = _e);
      var o = e.eventTimes, c = ea(t);
      o[c] = i;
    }
    function Sh(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var i = e.expirationTimes, o = t; o > 0; ) {
        var c = Nr(o), v = 1 << c;
        i[c] = rr, o &= ~v;
      }
    }
    function Tf(e, t, i) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function ov(e, t) {
      var i = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = _e, e.pingedLanes = _e, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var o = e.entanglements, c = e.eventTimes, v = e.expirationTimes, g = i; g > 0; ) {
        var w = Nr(g), x = 1 << w;
        o[w] = _e, c[w] = rr, v[w] = rr, g &= ~x;
      }
    }
    function Rf(e, t) {
      for (var i = e.entangledLanes |= t, o = e.entanglements, c = i; c; ) {
        var v = Nr(c), g = 1 << v;
        // Is this one of the newly entangled lanes?
        g & t | // Is this lane transitively entangled with the newly entangled lanes?
        o[v] & t && (o[v] |= t), c &= ~g;
      }
    }
    function uv(e, t) {
      var i = co(t), o;
      switch (i) {
        case $i:
          o = uo;
          break;
        case br:
          o = ya;
          break;
        case Go:
        case rf:
        case af:
        case lf:
        case of:
        case uf:
        case sf:
        case cf:
        case ff:
        case Xo:
        case df:
        case Pu:
        case $u:
        case vf:
        case Hs:
        case pf:
        case Ko:
        case hf:
        case $s:
        case mf:
        case yf:
          o = Ol;
          break;
        case Zo:
          o = qs;
          break;
        default:
          o = Un;
          break;
      }
      return (o & (e.suspendedLanes | t)) !== Un ? Un : o;
    }
    function Gs(e, t, i) {
      if (Va)
        for (var o = e.pendingUpdatersLaneMap; i > 0; ) {
          var c = ea(i), v = 1 << c, g = o[c];
          g.add(t), i &= ~v;
        }
    }
    function Eh(e, t) {
      if (Va)
        for (var i = e.pendingUpdatersLaneMap, o = e.memoizedUpdaters; t > 0; ) {
          var c = ea(t), v = 1 << c, g = i[c];
          g.size > 0 && (g.forEach(function(w) {
            var x = w.alternate;
            (x === null || !o.has(x)) && o.add(w);
          }), g.clear()), t &= ~v;
        }
    }
    function sv(e, t) {
      return null;
    }
    var Ta = It, ol = $i, xi = br, Mi = Zo, Xs = Un;
    function _i() {
      return Xs;
    }
    function Ur(e) {
      Xs = e;
    }
    function Ch(e, t) {
      var i = Xs;
      try {
        return Xs = e, t();
      } finally {
        Xs = i;
      }
    }
    function wh(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function Ks(e, t) {
      return e > t ? e : t;
    }
    function Br(e, t) {
      return e !== 0 && e < t;
    }
    function Th(e) {
      var t = co(e);
      return Br(Ta, t) ? Br(ol, t) ? Ys(t) ? xi : Mi : ol : Ta;
    }
    function bf(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var Zs;
    function ga(e) {
      Zs = e;
    }
    function Gy(e) {
      Zs(e);
    }
    var st;
    function qu(e) {
      st = e;
    }
    var xf;
    function Rh(e) {
      xf = e;
    }
    var bh;
    function Js(e) {
      bh = e;
    }
    var ec;
    function cv(e) {
      ec = e;
    }
    var Mf = !1, tc = [], zl = null, ul = null, sl = null, xr = /* @__PURE__ */ new Map(), Ra = /* @__PURE__ */ new Map(), ba = [], xh = [
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
    function Mh(e) {
      return xh.indexOf(e) > -1;
    }
    function qi(e, t, i, o, c) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: i,
        nativeEvent: c,
        targetContainers: [o]
      };
    }
    function fv(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          zl = null;
          break;
        case "dragenter":
        case "dragleave":
          ul = null;
          break;
        case "mouseover":
        case "mouseout":
          sl = null;
          break;
        case "pointerover":
        case "pointerout": {
          var i = t.pointerId;
          xr.delete(i);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var o = t.pointerId;
          Ra.delete(o);
          break;
        }
      }
    }
    function Ya(e, t, i, o, c, v) {
      if (e === null || e.nativeEvent !== v) {
        var g = qi(t, i, o, c, v);
        if (t !== null) {
          var w = Zu(t);
          w !== null && st(w);
        }
        return g;
      }
      e.eventSystemFlags |= o;
      var x = e.targetContainers;
      return c !== null && x.indexOf(c) === -1 && x.push(c), e;
    }
    function Xy(e, t, i, o, c) {
      switch (t) {
        case "focusin": {
          var v = c;
          return zl = Ya(zl, e, t, i, o, v), !0;
        }
        case "dragenter": {
          var g = c;
          return ul = Ya(ul, e, t, i, o, g), !0;
        }
        case "mouseover": {
          var w = c;
          return sl = Ya(sl, e, t, i, o, w), !0;
        }
        case "pointerover": {
          var x = c, O = x.pointerId;
          return xr.set(O, Ya(xr.get(O) || null, e, t, i, o, x)), !0;
        }
        case "gotpointercapture": {
          var L = c, B = L.pointerId;
          return Ra.set(B, Ya(Ra.get(B) || null, e, t, i, o, L)), !0;
        }
      }
      return !1;
    }
    function dv(e) {
      var t = vc(e.target);
      if (t !== null) {
        var i = ri(t);
        if (i !== null) {
          var o = i.tag;
          if (o === $) {
            var c = al(i);
            if (c !== null) {
              e.blockedOn = c, ec(e.priority, function() {
                xf(i);
              });
              return;
            }
          } else if (o === R) {
            var v = i.stateNode;
            if (bf(v)) {
              e.blockedOn = il(i);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function _h(e) {
      for (var t = bh(), i = {
        blockedOn: null,
        target: e,
        priority: t
      }, o = 0; o < ba.length && Br(t, ba[o].priority); o++)
        ;
      ba.splice(o, 0, i), o === 0 && dv(i);
    }
    function nc(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var i = t[0], o = Yu(e.domEventName, e.eventSystemFlags, i, e.nativeEvent);
        if (o === null) {
          var c = e.nativeEvent, v = new c.constructor(c.type, c);
          Iy(v), c.target.dispatchEvent(v), Yy();
        } else {
          var g = Zu(o);
          return g !== null && st(g), e.blockedOn = o, !1;
        }
        t.shift();
      }
      return !0;
    }
    function vv(e, t, i) {
      nc(e) && i.delete(t);
    }
    function Ky() {
      Mf = !1, zl !== null && nc(zl) && (zl = null), ul !== null && nc(ul) && (ul = null), sl !== null && nc(sl) && (sl = null), xr.forEach(vv), Ra.forEach(vv);
    }
    function fo(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Mf || (Mf = !0, l.unstable_scheduleCallback(l.unstable_NormalPriority, Ky)));
    }
    function nu(e) {
      if (tc.length > 0) {
        fo(tc[0], e);
        for (var t = 1; t < tc.length; t++) {
          var i = tc[t];
          i.blockedOn === e && (i.blockedOn = null);
        }
      }
      zl !== null && fo(zl, e), ul !== null && fo(ul, e), sl !== null && fo(sl, e);
      var o = function(w) {
        return fo(w, e);
      };
      xr.forEach(o), Ra.forEach(o);
      for (var c = 0; c < ba.length; c++) {
        var v = ba[c];
        v.blockedOn === e && (v.blockedOn = null);
      }
      for (; ba.length > 0; ) {
        var g = ba[0];
        if (g.blockedOn !== null)
          break;
        dv(g), g.blockedOn === null && ba.shift();
      }
    }
    var ta = s.ReactCurrentBatchConfig, Dn = !0;
    function qr(e) {
      Dn = !!e;
    }
    function jr() {
      return Dn;
    }
    function na(e, t, i) {
      var o = _f(t), c;
      switch (o) {
        case Ta:
          c = oi;
          break;
        case ol:
          c = Iu;
          break;
        case xi:
        default:
          c = Mr;
          break;
      }
      return c.bind(null, t, i, e);
    }
    function oi(e, t, i, o) {
      var c = _i(), v = ta.transition;
      ta.transition = null;
      try {
        Ur(Ta), Mr(e, t, i, o);
      } finally {
        Ur(c), ta.transition = v;
      }
    }
    function Iu(e, t, i, o) {
      var c = _i(), v = ta.transition;
      ta.transition = null;
      try {
        Ur(ol), Mr(e, t, i, o);
      } finally {
        Ur(c), ta.transition = v;
      }
    }
    function Mr(e, t, i, o) {
      Dn && rc(e, t, i, o);
    }
    function rc(e, t, i, o) {
      var c = Yu(e, t, i, o);
      if (c === null) {
        p0(e, t, o, cl, i), fv(e, o);
        return;
      }
      if (Xy(c, e, t, i, o)) {
        o.stopPropagation();
        return;
      }
      if (fv(e, o), t & Ei && Mh(e)) {
        for (; c !== null; ) {
          var v = Zu(c);
          v !== null && Gy(v);
          var g = Yu(e, t, i, o);
          if (g === null && p0(e, t, o, cl, i), g === c)
            break;
          c = g;
        }
        c !== null && o.stopPropagation();
        return;
      }
      p0(e, t, o, null, i);
    }
    var cl = null;
    function Yu(e, t, i, o) {
      cl = null;
      var c = Hd(o), v = vc(c);
      if (v !== null) {
        var g = ri(v);
        if (g === null)
          v = null;
        else {
          var w = g.tag;
          if (w === $) {
            var x = al(g);
            if (x !== null)
              return x;
            v = null;
          } else if (w === R) {
            var O = g.stateNode;
            if (bf(O))
              return il(g);
            v = null;
          } else g !== v && (v = null);
        }
      }
      return cl = v, null;
    }
    function _f(e) {
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
          return Ta;
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
          return ol;
        case "message": {
          var t = Kc();
          switch (t) {
            case zs:
              return Ta;
            case lo:
              return ol;
            case kl:
            case Qy:
              return xi;
            case qo:
              return Mi;
            default:
              return xi;
          }
        }
        default:
          return xi;
      }
    }
    function ac(e, t, i) {
      return e.addEventListener(t, i, !1), i;
    }
    function Wa(e, t, i) {
      return e.addEventListener(t, i, !0), i;
    }
    function pv(e, t, i, o) {
      return e.addEventListener(t, i, {
        capture: !0,
        passive: o
      }), i;
    }
    function Wu(e, t, i, o) {
      return e.addEventListener(t, i, {
        passive: o
      }), i;
    }
    var ui = null, Bu = null, ru = null;
    function vo(e) {
      return ui = e, Bu = ic(), !0;
    }
    function kf() {
      ui = null, Bu = null, ru = null;
    }
    function Ll() {
      if (ru)
        return ru;
      var e, t = Bu, i = t.length, o, c = ic(), v = c.length;
      for (e = 0; e < i && t[e] === c[e]; e++)
        ;
      var g = i - e;
      for (o = 1; o <= g && t[i - o] === c[v - o]; o++)
        ;
      var w = o > 1 ? 1 - o : void 0;
      return ru = c.slice(e, w), ru;
    }
    function ic() {
      return "value" in ui ? ui.value : ui.textContent;
    }
    function po(e) {
      var t, i = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && i === 13 && (t = 13)) : t = i, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function Qu() {
      return !0;
    }
    function lc() {
      return !1;
    }
    function Sa(e) {
      function t(i, o, c, v, g) {
        this._reactName = i, this._targetInst = c, this.type = o, this.nativeEvent = v, this.target = g, this.currentTarget = null;
        for (var w in e)
          if (e.hasOwnProperty(w)) {
            var x = e[w];
            x ? this[w] = x(v) : this[w] = v[w];
          }
        var O = v.defaultPrevented != null ? v.defaultPrevented : v.returnValue === !1;
        return O ? this.isDefaultPrevented = Qu : this.isDefaultPrevented = lc, this.isPropagationStopped = lc, this;
      }
      return $t(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var i = this.nativeEvent;
          i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Qu);
        },
        stopPropagation: function() {
          var i = this.nativeEvent;
          i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Qu);
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
        isPersistent: Qu
      }), t;
    }
    var Fr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, fl = Sa(Fr), xa = $t({}, Fr, {
      view: 0,
      detail: 0
    }), Ba = Sa(xa), Df, oc, au;
    function Zy(e) {
      e !== au && (au && e.type === "mousemove" ? (Df = e.screenX - au.screenX, oc = e.screenY - au.screenY) : (Df = 0, oc = 0), au = e);
    }
    var Ii = $t({}, xa, {
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
      getModifierState: dr,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (Zy(e), Df);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : oc;
      }
    }), hv = Sa(Ii), mv = $t({}, Ii, {
      dataTransfer: 0
    }), iu = Sa(mv), yv = $t({}, xa, {
      relatedTarget: 0
    }), Al = Sa(yv), kh = $t({}, Fr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Dh = Sa(kh), gv = $t({}, Fr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Of = Sa(gv), Jy = $t({}, Fr, {
      data: 0
    }), Oh = Sa(Jy), zh = Oh, Lh = {
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
    }, lu = {
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
    function e0(e) {
      if (e.key) {
        var t = Lh[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var i = po(e);
        return i === 13 ? "Enter" : String.fromCharCode(i);
      }
      return e.type === "keydown" || e.type === "keyup" ? lu[e.keyCode] || "Unidentified" : "";
    }
    var Gu = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Ah(e) {
      var t = this, i = t.nativeEvent;
      if (i.getModifierState)
        return i.getModifierState(e);
      var o = Gu[e];
      return o ? !!i[o] : !1;
    }
    function dr(e) {
      return Ah;
    }
    var t0 = $t({}, xa, {
      key: e0,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: dr,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? po(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? po(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Nh = Sa(t0), n0 = $t({}, Ii, {
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
    }), Uh = Sa(n0), jh = $t({}, xa, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: dr
    }), Fh = Sa(jh), r0 = $t({}, Fr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), ki = Sa(r0), Sv = $t({}, Ii, {
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
    }), a0 = Sa(Sv), ho = [9, 13, 27, 32], uc = 229, Nl = Ze && "CompositionEvent" in window, mo = null;
    Ze && "documentMode" in document && (mo = document.documentMode);
    var Ev = Ze && "TextEvent" in window && !mo, zf = Ze && (!Nl || mo && mo > 8 && mo <= 11), Hh = 32, Lf = String.fromCharCode(Hh);
    function i0() {
      Ye("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ye("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ye("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ye("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var Cv = !1;
    function Ph(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function Af(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function Nf(e, t) {
      return e === "keydown" && t.keyCode === uc;
    }
    function wv(e, t) {
      switch (e) {
        case "keyup":
          return ho.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== uc;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Uf(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function $h(e) {
      return e.locale === "ko";
    }
    var ou = !1;
    function Tv(e, t, i, o, c) {
      var v, g;
      if (Nl ? v = Af(t) : ou ? wv(t, o) && (v = "onCompositionEnd") : Nf(t, o) && (v = "onCompositionStart"), !v)
        return null;
      zf && !$h(o) && (!ou && v === "onCompositionStart" ? ou = vo(c) : v === "onCompositionEnd" && ou && (g = Ll()));
      var w = Qh(i, v);
      if (w.length > 0) {
        var x = new Oh(v, t, null, o, c);
        if (e.push({
          event: x,
          listeners: w
        }), g)
          x.data = g;
        else {
          var O = Uf(o);
          O !== null && (x.data = O);
        }
      }
    }
    function jf(e, t) {
      switch (e) {
        case "compositionend":
          return Uf(t);
        case "keypress":
          var i = t.which;
          return i !== Hh ? null : (Cv = !0, Lf);
        case "textInput":
          var o = t.data;
          return o === Lf && Cv ? null : o;
        default:
          return null;
      }
    }
    function Rv(e, t) {
      if (ou) {
        if (e === "compositionend" || !Nl && wv(e, t)) {
          var i = Ll();
          return kf(), ou = !1, i;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Ph(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return zf && !$h(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Ff(e, t, i, o, c) {
      var v;
      if (Ev ? v = jf(t, o) : v = Rv(t, o), !v)
        return null;
      var g = Qh(i, "onBeforeInput");
      if (g.length > 0) {
        var w = new zh("onBeforeInput", "beforeinput", null, o, c);
        e.push({
          event: w,
          listeners: g
        }), w.data = v;
      }
    }
    function Vh(e, t, i, o, c, v, g) {
      Tv(e, t, i, o, c), Ff(e, t, i, o, c);
    }
    var l0 = {
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
    function sc(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!l0[e.type] : t === "textarea";
    }
    function o0(e) {
      if (!Ze)
        return !1;
      var t = "on" + e, i = t in document;
      if (!i) {
        var o = document.createElement("div");
        o.setAttribute(t, "return;"), i = typeof o[t] == "function";
      }
      return i;
    }
    function cc() {
      Ye("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function qh(e, t, i, o) {
      zu(o);
      var c = Qh(t, "onChange");
      if (c.length > 0) {
        var v = new fl("onChange", "change", null, i, o);
        e.push({
          event: v,
          listeners: c
        });
      }
    }
    var yo = null, r = null;
    function a(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function u(e) {
      var t = [];
      qh(t, r, e, Hd(e)), th(f, t);
    }
    function f(e) {
      A2(e, 0);
    }
    function y(e) {
      var t = If(e);
      if (Zi(t))
        return e;
    }
    function S(e, t) {
      if (e === "change")
        return t;
    }
    var _ = !1;
    Ze && (_ = o0("input") && (!document.documentMode || document.documentMode > 9));
    function U(e, t) {
      yo = e, r = t, yo.attachEvent("onpropertychange", ue);
    }
    function V() {
      yo && (yo.detachEvent("onpropertychange", ue), yo = null, r = null);
    }
    function ue(e) {
      e.propertyName === "value" && y(r) && u(e);
    }
    function Oe(e, t, i) {
      e === "focusin" ? (V(), U(t, i)) : e === "focusout" && V();
    }
    function Le(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return y(r);
    }
    function ke(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function lt(e, t) {
      if (e === "click")
        return y(t);
    }
    function ht(e, t) {
      if (e === "input" || e === "change")
        return y(t);
    }
    function St(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Ut(e, "number", e.value);
    }
    function _r(e, t, i, o, c, v, g) {
      var w = i ? If(i) : window, x, O;
      if (a(w) ? x = S : sc(w) ? _ ? x = ht : (x = Le, O = Oe) : ke(w) && (x = lt), x) {
        var L = x(t, i);
        if (L) {
          qh(e, L, o, c);
          return;
        }
      }
      O && O(t, w, i), t === "focusout" && St(w);
    }
    function J() {
      it("onMouseEnter", ["mouseout", "mouseover"]), it("onMouseLeave", ["mouseout", "mouseover"]), it("onPointerEnter", ["pointerout", "pointerover"]), it("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function W(e, t, i, o, c, v, g) {
      var w = t === "mouseover" || t === "pointerover", x = t === "mouseout" || t === "pointerout";
      if (w && !xs(o)) {
        var O = o.relatedTarget || o.fromElement;
        if (O && (vc(O) || Fv(O)))
          return;
      }
      if (!(!x && !w)) {
        var L;
        if (c.window === c)
          L = c;
        else {
          var B = c.ownerDocument;
          B ? L = B.defaultView || B.parentWindow : L = window;
        }
        var I, le;
        if (x) {
          var ce = o.relatedTarget || o.toElement;
          if (I = i, le = ce ? vc(ce) : null, le !== null) {
            var ye = ri(le);
            (le !== ye || le.tag !== k && le.tag !== z) && (le = null);
          }
        } else
          I = null, le = i;
        if (I !== le) {
          var tt = hv, jt = "onMouseLeave", bt = "onMouseEnter", zn = "mouse";
          (t === "pointerout" || t === "pointerover") && (tt = Uh, jt = "onPointerLeave", bt = "onPointerEnter", zn = "pointer");
          var Tn = I == null ? L : If(I), ee = le == null ? L : If(le), ge = new tt(jt, zn + "leave", I, o, c);
          ge.target = Tn, ge.relatedTarget = ee;
          var te = null, Ae = vc(c);
          if (Ae === i) {
            var ut = new tt(bt, zn + "enter", le, o, c);
            ut.target = ee, ut.relatedTarget = Tn, te = ut;
          }
          vT(e, ge, te, I, le);
        }
      }
    }
    function ne(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var ze = typeof Object.is == "function" ? Object.is : ne;
    function mt(e, t) {
      if (ze(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var i = Object.keys(e), o = Object.keys(t);
      if (i.length !== o.length)
        return !1;
      for (var c = 0; c < i.length; c++) {
        var v = i[c];
        if (!We.call(t, v) || !ze(e[v], t[v]))
          return !1;
      }
      return !0;
    }
    function Ft(e) {
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
    function Bt(e, t) {
      for (var i = Ft(e), o = 0, c = 0; i; ) {
        if (i.nodeType === Rl) {
          if (c = o + i.textContent.length, o <= t && c >= t)
            return {
              node: i,
              offset: t - o
            };
          o = c;
        }
        i = Ft(Pt(i));
      }
    }
    function Qr(e) {
      var t = e.ownerDocument, i = t && t.defaultView || window, o = i.getSelection && i.getSelection();
      if (!o || o.rangeCount === 0)
        return null;
      var c = o.anchorNode, v = o.anchorOffset, g = o.focusNode, w = o.focusOffset;
      try {
        c.nodeType, g.nodeType;
      } catch {
        return null;
      }
      return Vn(e, c, v, g, w);
    }
    function Vn(e, t, i, o, c) {
      var v = 0, g = -1, w = -1, x = 0, O = 0, L = e, B = null;
      e: for (; ; ) {
        for (var I = null; L === t && (i === 0 || L.nodeType === Rl) && (g = v + i), L === o && (c === 0 || L.nodeType === Rl) && (w = v + c), L.nodeType === Rl && (v += L.nodeValue.length), (I = L.firstChild) !== null; )
          B = L, L = I;
        for (; ; ) {
          if (L === e)
            break e;
          if (B === t && ++x === i && (g = v), B === o && ++O === c && (w = v), (I = L.nextSibling) !== null)
            break;
          L = B, B = L.parentNode;
        }
        L = I;
      }
      return g === -1 || w === -1 ? null : {
        start: g,
        end: w
      };
    }
    function go(e, t) {
      var i = e.ownerDocument || document, o = i && i.defaultView || window;
      if (o.getSelection) {
        var c = o.getSelection(), v = e.textContent.length, g = Math.min(t.start, v), w = t.end === void 0 ? g : Math.min(t.end, v);
        if (!c.extend && g > w) {
          var x = w;
          w = g, g = x;
        }
        var O = Bt(e, g), L = Bt(e, w);
        if (O && L) {
          if (c.rangeCount === 1 && c.anchorNode === O.node && c.anchorOffset === O.offset && c.focusNode === L.node && c.focusOffset === L.offset)
            return;
          var B = i.createRange();
          B.setStart(O.node, O.offset), c.removeAllRanges(), g > w ? (c.addRange(B), c.extend(L.node, L.offset)) : (B.setEnd(L.node, L.offset), c.addRange(B));
        }
      }
    }
    function Ih(e) {
      return e && e.nodeType === Rl;
    }
    function T2(e, t) {
      return !e || !t ? !1 : e === t ? !0 : Ih(e) ? !1 : Ih(t) ? T2(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function Gw(e) {
      return e && e.ownerDocument && T2(e.ownerDocument.documentElement, e);
    }
    function Xw(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function R2() {
      for (var e = window, t = Si(); t instanceof e.HTMLIFrameElement; ) {
        if (Xw(t))
          e = t.contentWindow;
        else
          return t;
        t = Si(e.document);
      }
      return t;
    }
    function u0(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function Kw() {
      var e = R2();
      return {
        focusedElem: e,
        selectionRange: u0(e) ? Jw(e) : null
      };
    }
    function Zw(e) {
      var t = R2(), i = e.focusedElem, o = e.selectionRange;
      if (t !== i && Gw(i)) {
        o !== null && u0(i) && eT(i, o);
        for (var c = [], v = i; v = v.parentNode; )
          v.nodeType === ja && c.push({
            element: v,
            left: v.scrollLeft,
            top: v.scrollTop
          });
        typeof i.focus == "function" && i.focus();
        for (var g = 0; g < c.length; g++) {
          var w = c[g];
          w.element.scrollLeft = w.left, w.element.scrollTop = w.top;
        }
      }
    }
    function Jw(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Qr(e), t || {
        start: 0,
        end: 0
      };
    }
    function eT(e, t) {
      var i = t.start, o = t.end;
      o === void 0 && (o = i), "selectionStart" in e ? (e.selectionStart = i, e.selectionEnd = Math.min(o, e.value.length)) : go(e, t);
    }
    var tT = Ze && "documentMode" in document && document.documentMode <= 11;
    function nT() {
      Ye("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Hf = null, s0 = null, bv = null, c0 = !1;
    function rT(e) {
      if ("selectionStart" in e && u0(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, i = t.getSelection();
      return {
        anchorNode: i.anchorNode,
        anchorOffset: i.anchorOffset,
        focusNode: i.focusNode,
        focusOffset: i.focusOffset
      };
    }
    function aT(e) {
      return e.window === e ? e.document : e.nodeType === bl ? e : e.ownerDocument;
    }
    function b2(e, t, i) {
      var o = aT(i);
      if (!(c0 || Hf == null || Hf !== Si(o))) {
        var c = rT(Hf);
        if (!bv || !mt(bv, c)) {
          bv = c;
          var v = Qh(s0, "onSelect");
          if (v.length > 0) {
            var g = new fl("onSelect", "select", null, t, i);
            e.push({
              event: g,
              listeners: v
            }), g.target = Hf;
          }
        }
      }
    }
    function iT(e, t, i, o, c, v, g) {
      var w = i ? If(i) : window;
      switch (t) {
        // Track the input node that has focus.
        case "focusin":
          (sc(w) || w.contentEditable === "true") && (Hf = w, s0 = i, bv = null);
          break;
        case "focusout":
          Hf = null, s0 = null, bv = null;
          break;
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case "mousedown":
          c0 = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          c0 = !1, b2(e, o, c);
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
          if (tT)
            break;
        // falls through
        case "keydown":
        case "keyup":
          b2(e, o, c);
      }
    }
    function Yh(e, t) {
      var i = {};
      return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
    }
    var Pf = {
      animationend: Yh("Animation", "AnimationEnd"),
      animationiteration: Yh("Animation", "AnimationIteration"),
      animationstart: Yh("Animation", "AnimationStart"),
      transitionend: Yh("Transition", "TransitionEnd")
    }, f0 = {}, x2 = {};
    Ze && (x2 = document.createElement("div").style, "AnimationEvent" in window || (delete Pf.animationend.animation, delete Pf.animationiteration.animation, delete Pf.animationstart.animation), "TransitionEvent" in window || delete Pf.transitionend.transition);
    function Wh(e) {
      if (f0[e])
        return f0[e];
      if (!Pf[e])
        return e;
      var t = Pf[e];
      for (var i in t)
        if (t.hasOwnProperty(i) && i in x2)
          return f0[e] = t[i];
      return e;
    }
    var M2 = Wh("animationend"), _2 = Wh("animationiteration"), k2 = Wh("animationstart"), D2 = Wh("transitionend"), O2 = /* @__PURE__ */ new Map(), z2 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function Xu(e, t) {
      O2.set(e, t), Ye(t, [e]);
    }
    function lT() {
      for (var e = 0; e < z2.length; e++) {
        var t = z2[e], i = t.toLowerCase(), o = t[0].toUpperCase() + t.slice(1);
        Xu(i, "on" + o);
      }
      Xu(M2, "onAnimationEnd"), Xu(_2, "onAnimationIteration"), Xu(k2, "onAnimationStart"), Xu("dblclick", "onDoubleClick"), Xu("focusin", "onFocus"), Xu("focusout", "onBlur"), Xu(D2, "onTransitionEnd");
    }
    function oT(e, t, i, o, c, v, g) {
      var w = O2.get(t);
      if (w !== void 0) {
        var x = fl, O = t;
        switch (t) {
          case "keypress":
            if (po(o) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            x = Nh;
            break;
          case "focusin":
            O = "focus", x = Al;
            break;
          case "focusout":
            O = "blur", x = Al;
            break;
          case "beforeblur":
          case "afterblur":
            x = Al;
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
            x = hv;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = iu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = Fh;
            break;
          case M2:
          case _2:
          case k2:
            x = Dh;
            break;
          case D2:
            x = ki;
            break;
          case "scroll":
            x = Ba;
            break;
          case "wheel":
            x = a0;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = Of;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = Uh;
            break;
        }
        var L = (v & Ei) !== 0;
        {
          var B = !L && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", I = fT(i, w, o.type, L, B);
          if (I.length > 0) {
            var le = new x(w, O, null, o, c);
            e.push({
              event: le,
              listeners: I
            });
          }
        }
      }
    }
    lT(), J(), cc(), nT(), i0();
    function uT(e, t, i, o, c, v, g) {
      oT(e, t, i, o, c, v);
      var w = (v & Fd) === 0;
      w && (W(e, t, i, o, c), _r(e, t, i, o, c), iT(e, t, i, o, c), Vh(e, t, i, o, c));
    }
    var xv = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], d0 = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(xv));
    function L2(e, t, i) {
      var o = e.type || "unknown-event";
      e.currentTarget = i, tl(o, t, void 0, e), e.currentTarget = null;
    }
    function sT(e, t, i) {
      var o;
      if (i)
        for (var c = t.length - 1; c >= 0; c--) {
          var v = t[c], g = v.instance, w = v.currentTarget, x = v.listener;
          if (g !== o && e.isPropagationStopped())
            return;
          L2(e, x, w), o = g;
        }
      else
        for (var O = 0; O < t.length; O++) {
          var L = t[O], B = L.instance, I = L.currentTarget, le = L.listener;
          if (B !== o && e.isPropagationStopped())
            return;
          L2(e, le, I), o = B;
        }
    }
    function A2(e, t) {
      for (var i = (t & Ei) !== 0, o = 0; o < e.length; o++) {
        var c = e[o], v = c.event, g = c.listeners;
        sT(v, g, i);
      }
      ks();
    }
    function cT(e, t, i, o, c) {
      var v = Hd(i), g = [];
      uT(g, e, o, i, v, t), A2(g, t);
    }
    function gr(e, t) {
      d0.has(e) || p('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var i = !1, o = PR(t), c = pT(e);
      o.has(c) || (N2(t, e, Fc, i), o.add(c));
    }
    function v0(e, t, i) {
      d0.has(e) && !t && p('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var o = 0;
      t && (o |= Ei), N2(i, e, o, t);
    }
    var Bh = "_reactListening" + Math.random().toString(36).slice(2);
    function Mv(e) {
      if (!e[Bh]) {
        e[Bh] = !0, Ge.forEach(function(i) {
          i !== "selectionchange" && (d0.has(i) || v0(i, !1, e), v0(i, !0, e));
        });
        var t = e.nodeType === bl ? e : e.ownerDocument;
        t !== null && (t[Bh] || (t[Bh] = !0, v0("selectionchange", !1, t)));
      }
    }
    function N2(e, t, i, o, c) {
      var v = na(e, t, i), g = void 0;
      _s && (t === "touchstart" || t === "touchmove" || t === "wheel") && (g = !0), e = e, o ? g !== void 0 ? pv(e, t, v, g) : Wa(e, t, v) : g !== void 0 ? Wu(e, t, v, g) : ac(e, t, v);
    }
    function U2(e, t) {
      return e === t || e.nodeType === Or && e.parentNode === t;
    }
    function p0(e, t, i, o, c) {
      var v = o;
      if ((t & jd) === 0 && (t & Fc) === 0) {
        var g = c;
        if (o !== null) {
          var w = o;
          e: for (; ; ) {
            if (w === null)
              return;
            var x = w.tag;
            if (x === R || x === D) {
              var O = w.stateNode.containerInfo;
              if (U2(O, g))
                break;
              if (x === D)
                for (var L = w.return; L !== null; ) {
                  var B = L.tag;
                  if (B === R || B === D) {
                    var I = L.stateNode.containerInfo;
                    if (U2(I, g))
                      return;
                  }
                  L = L.return;
                }
              for (; O !== null; ) {
                var le = vc(O);
                if (le === null)
                  return;
                var ce = le.tag;
                if (ce === k || ce === z) {
                  w = v = le;
                  continue e;
                }
                O = O.parentNode;
              }
            }
            w = w.return;
          }
        }
      }
      th(function() {
        return cT(e, t, i, v);
      });
    }
    function _v(e, t, i) {
      return {
        instance: e,
        listener: t,
        currentTarget: i
      };
    }
    function fT(e, t, i, o, c, v) {
      for (var g = t !== null ? t + "Capture" : null, w = o ? g : t, x = [], O = e, L = null; O !== null; ) {
        var B = O, I = B.stateNode, le = B.tag;
        if (le === k && I !== null && (L = I, w !== null)) {
          var ce = eo(O, w);
          ce != null && x.push(_v(O, ce, L));
        }
        if (c)
          break;
        O = O.return;
      }
      return x;
    }
    function Qh(e, t) {
      for (var i = t + "Capture", o = [], c = e; c !== null; ) {
        var v = c, g = v.stateNode, w = v.tag;
        if (w === k && g !== null) {
          var x = g, O = eo(c, i);
          O != null && o.unshift(_v(c, O, x));
          var L = eo(c, t);
          L != null && o.push(_v(c, L, x));
        }
        c = c.return;
      }
      return o;
    }
    function $f(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== k);
      return e || null;
    }
    function dT(e, t) {
      for (var i = e, o = t, c = 0, v = i; v; v = $f(v))
        c++;
      for (var g = 0, w = o; w; w = $f(w))
        g++;
      for (; c - g > 0; )
        i = $f(i), c--;
      for (; g - c > 0; )
        o = $f(o), g--;
      for (var x = c; x--; ) {
        if (i === o || o !== null && i === o.alternate)
          return i;
        i = $f(i), o = $f(o);
      }
      return null;
    }
    function j2(e, t, i, o, c) {
      for (var v = t._reactName, g = [], w = i; w !== null && w !== o; ) {
        var x = w, O = x.alternate, L = x.stateNode, B = x.tag;
        if (O !== null && O === o)
          break;
        if (B === k && L !== null) {
          var I = L;
          if (c) {
            var le = eo(w, v);
            le != null && g.unshift(_v(w, le, I));
          } else if (!c) {
            var ce = eo(w, v);
            ce != null && g.push(_v(w, ce, I));
          }
        }
        w = w.return;
      }
      g.length !== 0 && e.push({
        event: t,
        listeners: g
      });
    }
    function vT(e, t, i, o, c) {
      var v = o && c ? dT(o, c) : null;
      o !== null && j2(e, t, o, v, !1), c !== null && i !== null && j2(e, i, c, v, !0);
    }
    function pT(e, t) {
      return e + "__bubble";
    }
    var Di = !1, kv = "dangerouslySetInnerHTML", Gh = "suppressContentEditableWarning", Ku = "suppressHydrationWarning", F2 = "autoFocus", fc = "children", dc = "style", Xh = "__html", h0, Kh, Dv, H2, Zh, P2, $2;
    h0 = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Kh = function(e, t) {
      Ad(e, t), Uc(e, t), Zp(e, t, {
        registrationNameDependencies: Ie,
        possibleRegistrationNames: qe
      });
    }, P2 = Ze && !document.documentMode, Dv = function(e, t, i) {
      if (!Di) {
        var o = Jh(i), c = Jh(t);
        c !== o && (Di = !0, p("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(c), JSON.stringify(o)));
      }
    }, H2 = function(e) {
      if (!Di) {
        Di = !0;
        var t = [];
        e.forEach(function(i) {
          t.push(i);
        }), p("Extra attributes from the server: %s", t);
      }
    }, Zh = function(e, t) {
      t === !1 ? p("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : p("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, $2 = function(e, t) {
      var i = e.namespaceURI === Tl ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return i.innerHTML = t, i.innerHTML;
    };
    var hT = /\r\n?/g, mT = /\u0000|\uFFFD/g;
    function Jh(e) {
      pt(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(hT, `
`).replace(mT, "");
    }
    function em(e, t, i, o) {
      var c = Jh(t), v = Jh(e);
      if (v !== c && (o && (Di || (Di = !0, p('Text content did not match. Server: "%s" Client: "%s"', v, c))), i && de))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function V2(e) {
      return e.nodeType === bl ? e : e.ownerDocument;
    }
    function yT() {
    }
    function tm(e) {
      e.onclick = yT;
    }
    function gT(e, t, i, o, c) {
      for (var v in o)
        if (o.hasOwnProperty(v)) {
          var g = o[v];
          if (v === dc)
            g && Object.freeze(g), Wp(t, g);
          else if (v === kv) {
            var w = g ? g[Xh] : void 0;
            w != null && Ap(t, w);
          } else if (v === fc)
            if (typeof g == "string") {
              var x = e !== "textarea" || g !== "";
              x && _u(t, g);
            } else typeof g == "number" && _u(t, "" + g);
          else v === Gh || v === Ku || v === F2 || (Ie.hasOwnProperty(v) ? g != null && (typeof g != "function" && Zh(v, g), v === "onScroll" && gr("scroll", t)) : g != null && Xt(t, v, g, c));
        }
    }
    function ST(e, t, i, o) {
      for (var c = 0; c < t.length; c += 2) {
        var v = t[c], g = t[c + 1];
        v === dc ? Wp(e, g) : v === kv ? Ap(e, g) : v === fc ? _u(e, g) : Xt(e, v, g, o);
      }
    }
    function ET(e, t, i, o) {
      var c, v = V2(i), g, w = o;
      if (w === Tl && (w = Md(e)), w === Tl) {
        if (c = Zl(e, t), !c && e !== e.toLowerCase() && p("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var x = v.createElement("div");
          x.innerHTML = "<script><\/script>";
          var O = x.firstChild;
          g = x.removeChild(O);
        } else if (typeof t.is == "string")
          g = v.createElement(e, {
            is: t.is
          });
        else if (g = v.createElement(e), e === "select") {
          var L = g;
          t.multiple ? L.multiple = !0 : t.size && (L.size = t.size);
        }
      } else
        g = v.createElementNS(w, e);
      return w === Tl && !c && Object.prototype.toString.call(g) === "[object HTMLUnknownElement]" && !We.call(h0, e) && (h0[e] = !0, p("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), g;
    }
    function CT(e, t) {
      return V2(t).createTextNode(e);
    }
    function wT(e, t, i, o) {
      var c = Zl(t, i);
      Kh(t, i);
      var v;
      switch (t) {
        case "dialog":
          gr("cancel", e), gr("close", e), v = i;
          break;
        case "iframe":
        case "object":
        case "embed":
          gr("load", e), v = i;
          break;
        case "video":
        case "audio":
          for (var g = 0; g < xv.length; g++)
            gr(xv[g], e);
          v = i;
          break;
        case "source":
          gr("error", e), v = i;
          break;
        case "img":
        case "image":
        case "link":
          gr("error", e), gr("load", e), v = i;
          break;
        case "details":
          gr("toggle", e), v = i;
          break;
        case "input":
          Fi(e, i), v = Mu(e, i), gr("invalid", e);
          break;
        case "option":
          Ln(e, i), v = i;
          break;
        case "select":
          No(e, i), v = Ss(e, i), gr("invalid", e);
          break;
        case "textarea":
          Rd(e, i), v = Td(e, i), gr("invalid", e);
          break;
        default:
          v = i;
      }
      switch (Ac(t, v), gT(t, e, o, v, c), t) {
        case "input":
          ji(e), oe(e, i, !1);
          break;
        case "textarea":
          ji(e), zp(e);
          break;
        case "option":
          lr(e, i);
          break;
        case "select":
          Cd(e, i);
          break;
        default:
          typeof v.onClick == "function" && tm(e);
          break;
      }
    }
    function TT(e, t, i, o, c) {
      Kh(t, o);
      var v = null, g, w;
      switch (t) {
        case "input":
          g = Mu(e, i), w = Mu(e, o), v = [];
          break;
        case "select":
          g = Ss(e, i), w = Ss(e, o), v = [];
          break;
        case "textarea":
          g = Td(e, i), w = Td(e, o), v = [];
          break;
        default:
          g = i, w = o, typeof g.onClick != "function" && typeof w.onClick == "function" && tm(e);
          break;
      }
      Ac(t, w);
      var x, O, L = null;
      for (x in g)
        if (!(w.hasOwnProperty(x) || !g.hasOwnProperty(x) || g[x] == null))
          if (x === dc) {
            var B = g[x];
            for (O in B)
              B.hasOwnProperty(O) && (L || (L = {}), L[O] = "");
          } else x === kv || x === fc || x === Gh || x === Ku || x === F2 || (Ie.hasOwnProperty(x) ? v || (v = []) : (v = v || []).push(x, null));
      for (x in w) {
        var I = w[x], le = g?.[x];
        if (!(!w.hasOwnProperty(x) || I === le || I == null && le == null))
          if (x === dc)
            if (I && Object.freeze(I), le) {
              for (O in le)
                le.hasOwnProperty(O) && (!I || !I.hasOwnProperty(O)) && (L || (L = {}), L[O] = "");
              for (O in I)
                I.hasOwnProperty(O) && le[O] !== I[O] && (L || (L = {}), L[O] = I[O]);
            } else
              L || (v || (v = []), v.push(x, L)), L = I;
          else if (x === kv) {
            var ce = I ? I[Xh] : void 0, ye = le ? le[Xh] : void 0;
            ce != null && ye !== ce && (v = v || []).push(x, ce);
          } else x === fc ? (typeof I == "string" || typeof I == "number") && (v = v || []).push(x, "" + I) : x === Gh || x === Ku || (Ie.hasOwnProperty(x) ? (I != null && (typeof I != "function" && Zh(x, I), x === "onScroll" && gr("scroll", e)), !v && le !== I && (v = [])) : (v = v || []).push(x, I));
      }
      return L && (Vy(L, w[dc]), (v = v || []).push(dc, L)), v;
    }
    function RT(e, t, i, o, c) {
      i === "input" && c.type === "radio" && c.name != null && M(e, c);
      var v = Zl(i, o), g = Zl(i, c);
      switch (ST(e, t, v, g), i) {
        case "input":
          F(e, c);
          break;
        case "textarea":
          Op(e, c);
          break;
        case "select":
          Oc(e, c);
          break;
      }
    }
    function bT(e) {
      {
        var t = e.toLowerCase();
        return Rs.hasOwnProperty(t) && Rs[t] || null;
      }
    }
    function xT(e, t, i, o, c, v, g) {
      var w, x;
      switch (w = Zl(t, i), Kh(t, i), t) {
        case "dialog":
          gr("cancel", e), gr("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          gr("load", e);
          break;
        case "video":
        case "audio":
          for (var O = 0; O < xv.length; O++)
            gr(xv[O], e);
          break;
        case "source":
          gr("error", e);
          break;
        case "img":
        case "image":
        case "link":
          gr("error", e), gr("load", e);
          break;
        case "details":
          gr("toggle", e);
          break;
        case "input":
          Fi(e, i), gr("invalid", e);
          break;
        case "option":
          Ln(e, i);
          break;
        case "select":
          No(e, i), gr("invalid", e);
          break;
        case "textarea":
          Rd(e, i), gr("invalid", e);
          break;
      }
      Ac(t, i);
      {
        x = /* @__PURE__ */ new Set();
        for (var L = e.attributes, B = 0; B < L.length; B++) {
          var I = L[B].name.toLowerCase();
          switch (I) {
            // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              x.add(L[B].name);
          }
        }
      }
      var le = null;
      for (var ce in i)
        if (i.hasOwnProperty(ce)) {
          var ye = i[ce];
          if (ce === fc)
            typeof ye == "string" ? e.textContent !== ye && (i[Ku] !== !0 && em(e.textContent, ye, v, g), le = [fc, ye]) : typeof ye == "number" && e.textContent !== "" + ye && (i[Ku] !== !0 && em(e.textContent, ye, v, g), le = [fc, "" + ye]);
          else if (Ie.hasOwnProperty(ce))
            ye != null && (typeof ye != "function" && Zh(ce, ye), ce === "onScroll" && gr("scroll", e));
          else if (g && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof w == "boolean") {
            var tt = void 0, jt = Wt(ce);
            if (i[Ku] !== !0) {
              if (!(ce === Gh || ce === Ku || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              ce === "value" || ce === "checked" || ce === "selected")) {
                if (ce === kv) {
                  var bt = e.innerHTML, zn = ye ? ye[Xh] : void 0;
                  if (zn != null) {
                    var Tn = $2(e, zn);
                    Tn !== bt && Dv(ce, bt, Tn);
                  }
                } else if (ce === dc) {
                  if (x.delete(ce), P2) {
                    var ee = Py(ye);
                    tt = e.getAttribute("style"), ee !== tt && Dv(ce, tt, ee);
                  }
                } else if (w && !H)
                  x.delete(ce.toLowerCase()), tt = wn(e, ce, ye), ye !== tt && Dv(ce, tt, ye);
                else if (!Zt(ce, jt, w) && !Cn(ce, ye, jt, w)) {
                  var ge = !1;
                  if (jt !== null)
                    x.delete(jt.attributeName), tt = Gt(e, ce, ye, jt);
                  else {
                    var te = o;
                    if (te === Tl && (te = Md(t)), te === Tl)
                      x.delete(ce.toLowerCase());
                    else {
                      var Ae = bT(ce);
                      Ae !== null && Ae !== ce && (ge = !0, x.delete(Ae)), x.delete(ce);
                    }
                    tt = wn(e, ce, ye);
                  }
                  var ut = H;
                  !ut && ye !== tt && !ge && Dv(ce, tt, ye);
                }
              }
            }
          }
        }
      switch (g && // $FlowFixMe - Should be inferred as not undefined.
      x.size > 0 && i[Ku] !== !0 && H2(x), t) {
        case "input":
          ji(e), oe(e, i, !0);
          break;
        case "textarea":
          ji(e), zp(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof i.onClick == "function" && tm(e);
          break;
      }
      return le;
    }
    function MT(e, t, i) {
      var o = e.nodeValue !== t;
      return o;
    }
    function m0(e, t) {
      {
        if (Di)
          return;
        Di = !0, p("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function y0(e, t) {
      {
        if (Di)
          return;
        Di = !0, p('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function g0(e, t, i) {
      {
        if (Di)
          return;
        Di = !0, p("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function S0(e, t) {
      {
        if (t === "" || Di)
          return;
        Di = !0, p('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function _T(e, t, i) {
      switch (t) {
        case "input":
          me(e, i);
          return;
        case "textarea":
          Uy(e, i);
          return;
        case "select":
          wd(e, i);
          return;
      }
    }
    var Ov = function() {
    }, zv = function() {
    };
    {
      var kT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], q2 = [
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
      ], DT = q2.concat(["button"]), OT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], I2 = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      zv = function(e, t) {
        var i = $t({}, e || I2), o = {
          tag: t
        };
        return q2.indexOf(t) !== -1 && (i.aTagInScope = null, i.buttonTagInScope = null, i.nobrTagInScope = null), DT.indexOf(t) !== -1 && (i.pTagInButtonScope = null), kT.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (i.listItemTagAutoclosing = null, i.dlItemTagAutoclosing = null), i.current = o, t === "form" && (i.formTag = o), t === "a" && (i.aTagInScope = o), t === "button" && (i.buttonTagInScope = o), t === "nobr" && (i.nobrTagInScope = o), t === "p" && (i.pTagInButtonScope = o), t === "li" && (i.listItemTagAutoclosing = o), (t === "dd" || t === "dt") && (i.dlItemTagAutoclosing = o), i;
      };
      var zT = function(e, t) {
        switch (t) {
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
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return OT.indexOf(t) === -1;
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
            return t == null;
        }
        return !0;
      }, LT = function(e, t) {
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
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, Y2 = {};
      Ov = function(e, t, i) {
        i = i || I2;
        var o = i.current, c = o && o.tag;
        t != null && (e != null && p("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var v = zT(e, c) ? null : o, g = v ? null : LT(e, i), w = v || g;
        if (w) {
          var x = w.tag, O = !!v + "|" + e + "|" + x;
          if (!Y2[O]) {
            Y2[O] = !0;
            var L = e, B = "";
            if (e === "#text" ? /\S/.test(t) ? L = "Text nodes" : (L = "Whitespace text nodes", B = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : L = "<" + e + ">", v) {
              var I = "";
              x === "table" && e === "tr" && (I += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), p("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", L, x, B, I);
            } else
              p("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", L, x);
          }
        }
      };
    }
    var nm = "suppressHydrationWarning", rm = "$", am = "/$", Lv = "$?", Av = "$!", AT = "style", E0 = null, C0 = null;
    function NT(e) {
      var t, i, o = e.nodeType;
      switch (o) {
        case bl:
        case kd: {
          t = o === bl ? "#document" : "#fragment";
          var c = e.documentElement;
          i = c ? c.namespaceURI : _d(null, "");
          break;
        }
        default: {
          var v = o === Or ? e.parentNode : e, g = v.namespaceURI || null;
          t = v.tagName, i = _d(g, t);
          break;
        }
      }
      {
        var w = t.toLowerCase(), x = zv(null, w);
        return {
          namespace: i,
          ancestorInfo: x
        };
      }
    }
    function UT(e, t, i) {
      {
        var o = e, c = _d(o.namespace, t), v = zv(o.ancestorInfo, t);
        return {
          namespace: c,
          ancestorInfo: v
        };
      }
    }
    function O4(e) {
      return e;
    }
    function jT(e) {
      E0 = jr(), C0 = Kw();
      var t = null;
      return qr(!1), t;
    }
    function FT(e) {
      Zw(C0), qr(E0), E0 = null, C0 = null;
    }
    function HT(e, t, i, o, c) {
      var v;
      {
        var g = o;
        if (Ov(e, null, g.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var w = "" + t.children, x = zv(g.ancestorInfo, e);
          Ov(null, w, x);
        }
        v = g.namespace;
      }
      var O = ET(e, t, i, v);
      return jv(c, O), k0(O, t), O;
    }
    function PT(e, t) {
      e.appendChild(t);
    }
    function $T(e, t, i, o, c) {
      switch (wT(e, t, i, o), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!i.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function VT(e, t, i, o, c, v) {
      {
        var g = v;
        if (typeof o.children != typeof i.children && (typeof o.children == "string" || typeof o.children == "number")) {
          var w = "" + o.children, x = zv(g.ancestorInfo, t);
          Ov(null, w, x);
        }
      }
      return TT(e, t, i, o);
    }
    function w0(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function qT(e, t, i, o) {
      {
        var c = i;
        Ov(null, e, c.ancestorInfo);
      }
      var v = CT(e, t);
      return jv(o, v), v;
    }
    function IT() {
      var e = window.event;
      return e === void 0 ? xi : _f(e.type);
    }
    var T0 = typeof setTimeout == "function" ? setTimeout : void 0, YT = typeof clearTimeout == "function" ? clearTimeout : void 0, R0 = -1, W2 = typeof Promise == "function" ? Promise : void 0, WT = typeof queueMicrotask == "function" ? queueMicrotask : typeof W2 < "u" ? function(e) {
      return W2.resolve(null).then(e).catch(BT);
    } : T0;
    function BT(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function QT(e, t, i, o) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && e.focus();
          return;
        case "img": {
          i.src && (e.src = i.src);
          return;
        }
      }
    }
    function GT(e, t, i, o, c, v) {
      RT(e, t, i, o, c), k0(e, c);
    }
    function B2(e) {
      _u(e, "");
    }
    function XT(e, t, i) {
      e.nodeValue = i;
    }
    function KT(e, t) {
      e.appendChild(t);
    }
    function ZT(e, t) {
      var i;
      e.nodeType === Or ? (i = e.parentNode, i.insertBefore(t, e)) : (i = e, i.appendChild(t));
      var o = e._reactRootContainer;
      o == null && i.onclick === null && tm(i);
    }
    function JT(e, t, i) {
      e.insertBefore(t, i);
    }
    function eR(e, t, i) {
      e.nodeType === Or ? e.parentNode.insertBefore(t, i) : e.insertBefore(t, i);
    }
    function tR(e, t) {
      e.removeChild(t);
    }
    function nR(e, t) {
      e.nodeType === Or ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function b0(e, t) {
      var i = t, o = 0;
      do {
        var c = i.nextSibling;
        if (e.removeChild(i), c && c.nodeType === Or) {
          var v = c.data;
          if (v === am)
            if (o === 0) {
              e.removeChild(c), nu(t);
              return;
            } else
              o--;
          else (v === rm || v === Lv || v === Av) && o++;
        }
        i = c;
      } while (i);
      nu(t);
    }
    function rR(e, t) {
      e.nodeType === Or ? b0(e.parentNode, t) : e.nodeType === ja && b0(e, t), nu(e);
    }
    function aR(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function iR(e) {
      e.nodeValue = "";
    }
    function lR(e, t) {
      e = e;
      var i = t[AT], o = i != null && i.hasOwnProperty("display") ? i.display : null;
      e.style.display = Lc("display", o);
    }
    function oR(e, t) {
      e.nodeValue = t;
    }
    function uR(e) {
      e.nodeType === ja ? e.textContent = "" : e.nodeType === bl && e.documentElement && e.removeChild(e.documentElement);
    }
    function sR(e, t, i) {
      return e.nodeType !== ja || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function cR(e, t) {
      return t === "" || e.nodeType !== Rl ? null : e;
    }
    function fR(e) {
      return e.nodeType !== Or ? null : e;
    }
    function Q2(e) {
      return e.data === Lv;
    }
    function x0(e) {
      return e.data === Av;
    }
    function dR(e) {
      var t = e.nextSibling && e.nextSibling.dataset, i, o, c;
      return t && (i = t.dgst, o = t.msg, c = t.stck), {
        message: o,
        digest: i,
        stack: c
      };
    }
    function vR(e, t) {
      e._reactRetry = t;
    }
    function im(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === ja || t === Rl)
          break;
        if (t === Or) {
          var i = e.data;
          if (i === rm || i === Av || i === Lv)
            break;
          if (i === am)
            return null;
        }
      }
      return e;
    }
    function Nv(e) {
      return im(e.nextSibling);
    }
    function pR(e) {
      return im(e.firstChild);
    }
    function hR(e) {
      return im(e.firstChild);
    }
    function mR(e) {
      return im(e.nextSibling);
    }
    function yR(e, t, i, o, c, v, g) {
      jv(v, e), k0(e, i);
      var w;
      {
        var x = c;
        w = x.namespace;
      }
      var O = (v.mode & pn) !== Ot;
      return xT(e, t, i, w, o, O, g);
    }
    function gR(e, t, i, o) {
      return jv(i, e), i.mode & pn, MT(e, t);
    }
    function SR(e, t) {
      jv(t, e);
    }
    function ER(e) {
      for (var t = e.nextSibling, i = 0; t; ) {
        if (t.nodeType === Or) {
          var o = t.data;
          if (o === am) {
            if (i === 0)
              return Nv(t);
            i--;
          } else (o === rm || o === Av || o === Lv) && i++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function G2(e) {
      for (var t = e.previousSibling, i = 0; t; ) {
        if (t.nodeType === Or) {
          var o = t.data;
          if (o === rm || o === Av || o === Lv) {
            if (i === 0)
              return t;
            i--;
          } else o === am && i++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function CR(e) {
      nu(e);
    }
    function wR(e) {
      nu(e);
    }
    function TR(e) {
      return e !== "head" && e !== "body";
    }
    function RR(e, t, i, o) {
      var c = !0;
      em(t.nodeValue, i, o, c);
    }
    function bR(e, t, i, o, c, v) {
      if (t[nm] !== !0) {
        var g = !0;
        em(o.nodeValue, c, v, g);
      }
    }
    function xR(e, t) {
      t.nodeType === ja ? m0(e, t) : t.nodeType === Or || y0(e, t);
    }
    function MR(e, t) {
      {
        var i = e.parentNode;
        i !== null && (t.nodeType === ja ? m0(i, t) : t.nodeType === Or || y0(i, t));
      }
    }
    function _R(e, t, i, o, c) {
      (c || t[nm] !== !0) && (o.nodeType === ja ? m0(i, o) : o.nodeType === Or || y0(i, o));
    }
    function kR(e, t, i) {
      g0(e, t);
    }
    function DR(e, t) {
      S0(e, t);
    }
    function OR(e, t, i) {
      {
        var o = e.parentNode;
        o !== null && g0(o, t);
      }
    }
    function zR(e, t) {
      {
        var i = e.parentNode;
        i !== null && S0(i, t);
      }
    }
    function LR(e, t, i, o, c, v) {
      (v || t[nm] !== !0) && g0(i, o);
    }
    function AR(e, t, i, o, c) {
      (c || t[nm] !== !0) && S0(i, o);
    }
    function NR(e) {
      p("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function UR(e) {
      Mv(e);
    }
    var Vf = Math.random().toString(36).slice(2), qf = "__reactFiber$" + Vf, M0 = "__reactProps$" + Vf, Uv = "__reactContainer$" + Vf, _0 = "__reactEvents$" + Vf, jR = "__reactListeners$" + Vf, FR = "__reactHandles$" + Vf;
    function HR(e) {
      delete e[qf], delete e[M0], delete e[_0], delete e[jR], delete e[FR];
    }
    function jv(e, t) {
      t[qf] = e;
    }
    function lm(e, t) {
      t[Uv] = e;
    }
    function X2(e) {
      e[Uv] = null;
    }
    function Fv(e) {
      return !!e[Uv];
    }
    function vc(e) {
      var t = e[qf];
      if (t)
        return t;
      for (var i = e.parentNode; i; ) {
        if (t = i[Uv] || i[qf], t) {
          var o = t.alternate;
          if (t.child !== null || o !== null && o.child !== null)
            for (var c = G2(e); c !== null; ) {
              var v = c[qf];
              if (v)
                return v;
              c = G2(c);
            }
          return t;
        }
        e = i, i = e.parentNode;
      }
      return null;
    }
    function Zu(e) {
      var t = e[qf] || e[Uv];
      return t && (t.tag === k || t.tag === z || t.tag === $ || t.tag === R) ? t : null;
    }
    function If(e) {
      if (e.tag === k || e.tag === z)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function om(e) {
      return e[M0] || null;
    }
    function k0(e, t) {
      e[M0] = t;
    }
    function PR(e) {
      var t = e[_0];
      return t === void 0 && (t = e[_0] = /* @__PURE__ */ new Set()), t;
    }
    var K2 = {}, Z2 = s.ReactDebugCurrentFrame;
    function um(e) {
      if (e) {
        var t = e._owner, i = Ca(e.type, e._source, t ? t.type : null);
        Z2.setExtraStackFrame(i);
      } else
        Z2.setExtraStackFrame(null);
    }
    function Ul(e, t, i, o, c) {
      {
        var v = Function.call.bind(We);
        for (var g in e)
          if (v(e, g)) {
            var w = void 0;
            try {
              if (typeof e[g] != "function") {
                var x = Error((o || "React class") + ": " + i + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw x.name = "Invariant Violation", x;
              }
              w = e[g](t, g, o, i, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              w = O;
            }
            w && !(w instanceof Error) && (um(c), p("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", i, g, typeof w), um(null)), w instanceof Error && !(w.message in K2) && (K2[w.message] = !0, um(c), p("Failed %s type: %s", i, w.message), um(null));
          }
      }
    }
    var D0 = [], sm;
    sm = [];
    var uu = -1;
    function Ju(e) {
      return {
        current: e
      };
    }
    function Qa(e, t) {
      if (uu < 0) {
        p("Unexpected pop.");
        return;
      }
      t !== sm[uu] && p("Unexpected Fiber popped."), e.current = D0[uu], D0[uu] = null, sm[uu] = null, uu--;
    }
    function Ga(e, t, i) {
      uu++, D0[uu] = e.current, sm[uu] = i, e.current = t;
    }
    var O0;
    O0 = {};
    var Yi = {};
    Object.freeze(Yi);
    var su = Ju(Yi), So = Ju(!1), z0 = Yi;
    function Yf(e, t, i) {
      return i && Eo(t) ? z0 : su.current;
    }
    function J2(e, t, i) {
      {
        var o = e.stateNode;
        o.__reactInternalMemoizedUnmaskedChildContext = t, o.__reactInternalMemoizedMaskedChildContext = i;
      }
    }
    function Wf(e, t) {
      {
        var i = e.type, o = i.contextTypes;
        if (!o)
          return Yi;
        var c = e.stateNode;
        if (c && c.__reactInternalMemoizedUnmaskedChildContext === t)
          return c.__reactInternalMemoizedMaskedChildContext;
        var v = {};
        for (var g in o)
          v[g] = t[g];
        {
          var w = Vt(e) || "Unknown";
          Ul(o, v, "context", w);
        }
        return c && J2(e, t, v), v;
      }
    }
    function cm() {
      return So.current;
    }
    function Eo(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function fm(e) {
      Qa(So, e), Qa(su, e);
    }
    function L0(e) {
      Qa(So, e), Qa(su, e);
    }
    function eS(e, t, i) {
      {
        if (su.current !== Yi)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        Ga(su, t, e), Ga(So, i, e);
      }
    }
    function tS(e, t, i) {
      {
        var o = e.stateNode, c = t.childContextTypes;
        if (typeof o.getChildContext != "function") {
          {
            var v = Vt(e) || "Unknown";
            O0[v] || (O0[v] = !0, p("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", v, v));
          }
          return i;
        }
        var g = o.getChildContext();
        for (var w in g)
          if (!(w in c))
            throw new Error((Vt(e) || "Unknown") + '.getChildContext(): key "' + w + '" is not defined in childContextTypes.');
        {
          var x = Vt(e) || "Unknown";
          Ul(c, g, "child context", x);
        }
        return $t({}, i, g);
      }
    }
    function dm(e) {
      {
        var t = e.stateNode, i = t && t.__reactInternalMemoizedMergedChildContext || Yi;
        return z0 = su.current, Ga(su, i, e), Ga(So, So.current, e), !0;
      }
    }
    function nS(e, t, i) {
      {
        var o = e.stateNode;
        if (!o)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (i) {
          var c = tS(e, t, z0);
          o.__reactInternalMemoizedMergedChildContext = c, Qa(So, e), Qa(su, e), Ga(su, c, e), Ga(So, i, e);
        } else
          Qa(So, e), Ga(So, i, e);
      }
    }
    function $R(e) {
      {
        if (!Vo(e) || e.tag !== T)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case R:
              return t.stateNode.context;
            case T: {
              var i = t.type;
              if (Eo(i))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var es = 0, vm = 1, cu = null, A0 = !1, N0 = !1;
    function rS(e) {
      cu === null ? cu = [e] : cu.push(e);
    }
    function VR(e) {
      A0 = !0, rS(e);
    }
    function aS() {
      A0 && ts();
    }
    function ts() {
      if (!N0 && cu !== null) {
        N0 = !0;
        var e = 0, t = _i();
        try {
          var i = !0, o = cu;
          for (Ur(Ta); e < o.length; e++) {
            var c = o[e];
            do
              c = c(i);
            while (c !== null);
          }
          cu = null, A0 = !1;
        } catch (v) {
          throw cu !== null && (cu = cu.slice(e + 1)), $d(zs, ts), v;
        } finally {
          Ur(t), N0 = !1;
        }
      }
      return null;
    }
    var Bf = [], Qf = 0, pm = null, hm = 0, dl = [], vl = 0, pc = null, fu = 1, du = "";
    function qR(e) {
      return mc(), (e.flags & nl) !== Dt;
    }
    function IR(e) {
      return mc(), hm;
    }
    function YR() {
      var e = du, t = fu, i = t & ~WR(t);
      return i.toString(32) + e;
    }
    function hc(e, t) {
      mc(), Bf[Qf++] = hm, Bf[Qf++] = pm, pm = e, hm = t;
    }
    function iS(e, t, i) {
      mc(), dl[vl++] = fu, dl[vl++] = du, dl[vl++] = pc, pc = e;
      var o = fu, c = du, v = mm(o) - 1, g = o & ~(1 << v), w = i + 1, x = mm(t) + v;
      if (x > 30) {
        var O = v - v % 5, L = (1 << O) - 1, B = (g & L).toString(32), I = g >> O, le = v - O, ce = mm(t) + le, ye = w << le, tt = ye | I, jt = B + c;
        fu = 1 << ce | tt, du = jt;
      } else {
        var bt = w << v, zn = bt | g, Tn = c;
        fu = 1 << x | zn, du = Tn;
      }
    }
    function U0(e) {
      mc();
      var t = e.return;
      if (t !== null) {
        var i = 1, o = 0;
        hc(e, i), iS(e, i, o);
      }
    }
    function mm(e) {
      return 32 - Ar(e);
    }
    function WR(e) {
      return 1 << mm(e) - 1;
    }
    function j0(e) {
      for (; e === pm; )
        pm = Bf[--Qf], Bf[Qf] = null, hm = Bf[--Qf], Bf[Qf] = null;
      for (; e === pc; )
        pc = dl[--vl], dl[vl] = null, du = dl[--vl], dl[vl] = null, fu = dl[--vl], dl[vl] = null;
    }
    function BR() {
      return mc(), pc !== null ? {
        id: fu,
        overflow: du
      } : null;
    }
    function QR(e, t) {
      mc(), dl[vl++] = fu, dl[vl++] = du, dl[vl++] = pc, fu = t.id, du = t.overflow, pc = e;
    }
    function mc() {
      _a() || p("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Ma = null, pl = null, jl = !1, yc = !1, ns = null;
    function GR() {
      jl && p("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function lS() {
      yc = !0;
    }
    function XR() {
      return yc;
    }
    function KR(e) {
      var t = e.stateNode.containerInfo;
      return pl = hR(t), Ma = e, jl = !0, ns = null, yc = !1, !0;
    }
    function ZR(e, t, i) {
      return pl = mR(t), Ma = e, jl = !0, ns = null, yc = !1, i !== null && QR(e, i), !0;
    }
    function oS(e, t) {
      switch (e.tag) {
        case R: {
          xR(e.stateNode.containerInfo, t);
          break;
        }
        case k: {
          var i = (e.mode & pn) !== Ot;
          _R(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            i
          );
          break;
        }
        case $: {
          var o = e.memoizedState;
          o.dehydrated !== null && MR(o.dehydrated, t);
          break;
        }
      }
    }
    function uS(e, t) {
      oS(e, t);
      var i = n_();
      i.stateNode = t, i.return = e;
      var o = e.deletions;
      o === null ? (e.deletions = [i], e.flags |= Ci) : o.push(i);
    }
    function F0(e, t) {
      {
        if (yc)
          return;
        switch (e.tag) {
          case R: {
            var i = e.stateNode.containerInfo;
            switch (t.tag) {
              case k:
                var o = t.type;
                t.pendingProps, kR(i, o);
                break;
              case z:
                var c = t.pendingProps;
                DR(i, c);
                break;
            }
            break;
          }
          case k: {
            var v = e.type, g = e.memoizedProps, w = e.stateNode;
            switch (t.tag) {
              case k: {
                var x = t.type, O = t.pendingProps, L = (e.mode & pn) !== Ot;
                LR(
                  v,
                  g,
                  w,
                  x,
                  O,
                  // TODO: Delete this argument when we remove the legacy root API.
                  L
                );
                break;
              }
              case z: {
                var B = t.pendingProps, I = (e.mode & pn) !== Ot;
                AR(
                  v,
                  g,
                  w,
                  B,
                  // TODO: Delete this argument when we remove the legacy root API.
                  I
                );
                break;
              }
            }
            break;
          }
          case $: {
            var le = e.memoizedState, ce = le.dehydrated;
            if (ce !== null) switch (t.tag) {
              case k:
                var ye = t.type;
                t.pendingProps, OR(ce, ye);
                break;
              case z:
                var tt = t.pendingProps;
                zR(ce, tt);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function sS(e, t) {
      t.flags = t.flags & ~Ha | hr, F0(e, t);
    }
    function cS(e, t) {
      switch (e.tag) {
        case k: {
          var i = e.type;
          e.pendingProps;
          var o = sR(t, i);
          return o !== null ? (e.stateNode = o, Ma = e, pl = pR(o), !0) : !1;
        }
        case z: {
          var c = e.pendingProps, v = cR(t, c);
          return v !== null ? (e.stateNode = v, Ma = e, pl = null, !0) : !1;
        }
        case $: {
          var g = fR(t);
          if (g !== null) {
            var w = {
              dehydrated: g,
              treeContext: BR(),
              retryLane: qa
            };
            e.memoizedState = w;
            var x = r_(g);
            return x.return = e, e.child = x, Ma = e, pl = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function H0(e) {
      return (e.mode & pn) !== Ot && (e.flags & Mt) === Dt;
    }
    function P0(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function $0(e) {
      if (jl) {
        var t = pl;
        if (!t) {
          H0(e) && (F0(Ma, e), P0()), sS(Ma, e), jl = !1, Ma = e;
          return;
        }
        var i = t;
        if (!cS(e, t)) {
          H0(e) && (F0(Ma, e), P0()), t = Nv(i);
          var o = Ma;
          if (!t || !cS(e, t)) {
            sS(Ma, e), jl = !1, Ma = e;
            return;
          }
          uS(o, i);
        }
      }
    }
    function JR(e, t, i) {
      var o = e.stateNode, c = !yc, v = yR(o, e.type, e.memoizedProps, t, i, e, c);
      return e.updateQueue = v, v !== null;
    }
    function eb(e) {
      var t = e.stateNode, i = e.memoizedProps, o = gR(t, i, e);
      if (o) {
        var c = Ma;
        if (c !== null)
          switch (c.tag) {
            case R: {
              var v = c.stateNode.containerInfo, g = (c.mode & pn) !== Ot;
              RR(
                v,
                t,
                i,
                // TODO: Delete this argument when we remove the legacy root API.
                g
              );
              break;
            }
            case k: {
              var w = c.type, x = c.memoizedProps, O = c.stateNode, L = (c.mode & pn) !== Ot;
              bR(
                w,
                x,
                O,
                t,
                i,
                // TODO: Delete this argument when we remove the legacy root API.
                L
              );
              break;
            }
          }
      }
      return o;
    }
    function tb(e) {
      var t = e.memoizedState, i = t !== null ? t.dehydrated : null;
      if (!i)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      SR(i, e);
    }
    function nb(e) {
      var t = e.memoizedState, i = t !== null ? t.dehydrated : null;
      if (!i)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return ER(i);
    }
    function fS(e) {
      for (var t = e.return; t !== null && t.tag !== k && t.tag !== R && t.tag !== $; )
        t = t.return;
      Ma = t;
    }
    function ym(e) {
      if (e !== Ma)
        return !1;
      if (!jl)
        return fS(e), jl = !0, !1;
      if (e.tag !== R && (e.tag !== k || TR(e.type) && !w0(e.type, e.memoizedProps))) {
        var t = pl;
        if (t)
          if (H0(e))
            dS(e), P0();
          else
            for (; t; )
              uS(e, t), t = Nv(t);
      }
      return fS(e), e.tag === $ ? pl = nb(e) : pl = Ma ? Nv(e.stateNode) : null, !0;
    }
    function rb() {
      return jl && pl !== null;
    }
    function dS(e) {
      for (var t = pl; t; )
        oS(e, t), t = Nv(t);
    }
    function Gf() {
      Ma = null, pl = null, jl = !1, yc = !1;
    }
    function vS() {
      ns !== null && (lE(ns), ns = null);
    }
    function _a() {
      return jl;
    }
    function V0(e) {
      ns === null ? ns = [e] : ns.push(e);
    }
    var ab = s.ReactCurrentBatchConfig, ib = null;
    function lb() {
      return ab.transition;
    }
    var Fl = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var ob = function(e) {
        for (var t = null, i = e; i !== null; )
          i.mode & er && (t = i), i = i.return;
        return t;
      }, gc = function(e) {
        var t = [];
        return e.forEach(function(i) {
          t.push(i);
        }), t.sort().join(", ");
      }, Hv = [], Pv = [], $v = [], Vv = [], qv = [], Iv = [], Sc = /* @__PURE__ */ new Set();
      Fl.recordUnsafeLifecycleWarnings = function(e, t) {
        Sc.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Hv.push(e), e.mode & er && typeof t.UNSAFE_componentWillMount == "function" && Pv.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && $v.push(e), e.mode & er && typeof t.UNSAFE_componentWillReceiveProps == "function" && Vv.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && qv.push(e), e.mode & er && typeof t.UNSAFE_componentWillUpdate == "function" && Iv.push(e));
      }, Fl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Hv.length > 0 && (Hv.forEach(function(I) {
          e.add(Vt(I) || "Component"), Sc.add(I.type);
        }), Hv = []);
        var t = /* @__PURE__ */ new Set();
        Pv.length > 0 && (Pv.forEach(function(I) {
          t.add(Vt(I) || "Component"), Sc.add(I.type);
        }), Pv = []);
        var i = /* @__PURE__ */ new Set();
        $v.length > 0 && ($v.forEach(function(I) {
          i.add(Vt(I) || "Component"), Sc.add(I.type);
        }), $v = []);
        var o = /* @__PURE__ */ new Set();
        Vv.length > 0 && (Vv.forEach(function(I) {
          o.add(Vt(I) || "Component"), Sc.add(I.type);
        }), Vv = []);
        var c = /* @__PURE__ */ new Set();
        qv.length > 0 && (qv.forEach(function(I) {
          c.add(Vt(I) || "Component"), Sc.add(I.type);
        }), qv = []);
        var v = /* @__PURE__ */ new Set();
        if (Iv.length > 0 && (Iv.forEach(function(I) {
          v.add(Vt(I) || "Component"), Sc.add(I.type);
        }), Iv = []), t.size > 0) {
          var g = gc(t);
          p(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, g);
        }
        if (o.size > 0) {
          var w = gc(o);
          p(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, w);
        }
        if (v.size > 0) {
          var x = gc(v);
          p(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, x);
        }
        if (e.size > 0) {
          var O = gc(e);
          m(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, O);
        }
        if (i.size > 0) {
          var L = gc(i);
          m(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, L);
        }
        if (c.size > 0) {
          var B = gc(c);
          m(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, B);
        }
      };
      var gm = /* @__PURE__ */ new Map(), pS = /* @__PURE__ */ new Set();
      Fl.recordLegacyContextWarning = function(e, t) {
        var i = ob(e);
        if (i === null) {
          p("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!pS.has(e.type)) {
          var o = gm.get(i);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (o === void 0 && (o = [], gm.set(i, o)), o.push(e));
        }
      }, Fl.flushLegacyContextWarning = function() {
        gm.forEach(function(e, t) {
          if (e.length !== 0) {
            var i = e[0], o = /* @__PURE__ */ new Set();
            e.forEach(function(v) {
              o.add(Vt(v) || "Component"), pS.add(v.type);
            });
            var c = gc(o);
            try {
              Hn(i), p(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, c);
            } finally {
              Kn();
            }
          }
        });
      }, Fl.discardPendingWarnings = function() {
        Hv = [], Pv = [], $v = [], Vv = [], qv = [], Iv = [], gm = /* @__PURE__ */ new Map();
      };
    }
    var q0, I0, Y0, W0, B0, hS = function(e, t) {
    };
    q0 = !1, I0 = !1, Y0 = {}, W0 = {}, B0 = {}, hS = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var i = Vt(t) || "Component";
        W0[i] || (W0[i] = !0, p('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function ub(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Yv(e, t, i) {
      var o = i.ref;
      if (o !== null && typeof o != "function" && typeof o != "object") {
        if ((e.mode & er || Z) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(i._owner && i._self && i._owner.stateNode !== i._self) && // Will already throw with "Function components cannot have string refs"
        !(i._owner && i._owner.tag !== T) && // Will already warn with "Function components cannot be given refs"
        !(typeof i.type == "function" && !ub(i.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        i._owner) {
          var c = Vt(e) || "Component";
          Y0[c] || (p('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', c, o), Y0[c] = !0);
        }
        if (i._owner) {
          var v = i._owner, g;
          if (v) {
            var w = v;
            if (w.tag !== T)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            g = w.stateNode;
          }
          if (!g)
            throw new Error("Missing owner for string ref " + o + ". This error is likely caused by a bug in React. Please file an issue.");
          var x = g;
          Fe(o, "ref");
          var O = "" + o;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === O)
            return t.ref;
          var L = function(B) {
            var I = x.refs;
            B === null ? delete I[O] : I[O] = B;
          };
          return L._stringRef = O, L;
        } else {
          if (typeof o != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!i._owner)
            throw new Error("Element ref was specified as a string (" + o + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return o;
    }
    function Sm(e, t) {
      var i = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (i === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : i) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Em(e) {
      {
        var t = Vt(e) || "Component";
        if (B0[t])
          return;
        B0[t] = !0, p("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function mS(e) {
      var t = e._payload, i = e._init;
      return i(t);
    }
    function yS(e) {
      function t(ee, ge) {
        if (e) {
          var te = ee.deletions;
          te === null ? (ee.deletions = [ge], ee.flags |= Ci) : te.push(ge);
        }
      }
      function i(ee, ge) {
        if (!e)
          return null;
        for (var te = ge; te !== null; )
          t(ee, te), te = te.sibling;
        return null;
      }
      function o(ee, ge) {
        for (var te = /* @__PURE__ */ new Map(), Ae = ge; Ae !== null; )
          Ae.key !== null ? te.set(Ae.key, Ae) : te.set(Ae.index, Ae), Ae = Ae.sibling;
        return te;
      }
      function c(ee, ge) {
        var te = _c(ee, ge);
        return te.index = 0, te.sibling = null, te;
      }
      function v(ee, ge, te) {
        if (ee.index = te, !e)
          return ee.flags |= nl, ge;
        var Ae = ee.alternate;
        if (Ae !== null) {
          var ut = Ae.index;
          return ut < ge ? (ee.flags |= hr, ge) : ut;
        } else
          return ee.flags |= hr, ge;
      }
      function g(ee) {
        return e && ee.alternate === null && (ee.flags |= hr), ee;
      }
      function w(ee, ge, te, Ae) {
        if (ge === null || ge.tag !== z) {
          var ut = Vg(te, ee.mode, Ae);
          return ut.return = ee, ut;
        } else {
          var at = c(ge, te);
          return at.return = ee, at;
        }
      }
      function x(ee, ge, te, Ae) {
        var ut = te.type;
        if (ut === ln)
          return L(ee, ge, te.props.children, Ae, te.key);
        if (ge !== null && (ge.elementType === ut || // Keep this check inline so it only runs on the false path:
        wE(ge, te) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof ut == "object" && ut !== null && ut.$$typeof === ct && mS(ut) === ge.type)) {
          var at = c(ge, te.props);
          return at.ref = Yv(ee, ge, te), at.return = ee, at._debugSource = te._source, at._debugOwner = te._owner, at;
        }
        var Yt = $g(te, ee.mode, Ae);
        return Yt.ref = Yv(ee, ge, te), Yt.return = ee, Yt;
      }
      function O(ee, ge, te, Ae) {
        if (ge === null || ge.tag !== D || ge.stateNode.containerInfo !== te.containerInfo || ge.stateNode.implementation !== te.implementation) {
          var ut = qg(te, ee.mode, Ae);
          return ut.return = ee, ut;
        } else {
          var at = c(ge, te.children || []);
          return at.return = ee, at;
        }
      }
      function L(ee, ge, te, Ae, ut) {
        if (ge === null || ge.tag !== A) {
          var at = vs(te, ee.mode, Ae, ut);
          return at.return = ee, at;
        } else {
          var Yt = c(ge, te);
          return Yt.return = ee, Yt;
        }
      }
      function B(ee, ge, te) {
        if (typeof ge == "string" && ge !== "" || typeof ge == "number") {
          var Ae = Vg("" + ge, ee.mode, te);
          return Ae.return = ee, Ae;
        }
        if (typeof ge == "object" && ge !== null) {
          switch (ge.$$typeof) {
            case Kt: {
              var ut = $g(ge, ee.mode, te);
              return ut.ref = Yv(ee, null, ge), ut.return = ee, ut;
            }
            case an: {
              var at = qg(ge, ee.mode, te);
              return at.return = ee, at;
            }
            case ct: {
              var Yt = ge._payload, en = ge._init;
              return B(ee, en(Yt), te);
            }
          }
          if (dn(ge) || Rt(ge)) {
            var nr = vs(ge, ee.mode, te, null);
            return nr.return = ee, nr;
          }
          Sm(ee, ge);
        }
        return typeof ge == "function" && Em(ee), null;
      }
      function I(ee, ge, te, Ae) {
        var ut = ge !== null ? ge.key : null;
        if (typeof te == "string" && te !== "" || typeof te == "number")
          return ut !== null ? null : w(ee, ge, "" + te, Ae);
        if (typeof te == "object" && te !== null) {
          switch (te.$$typeof) {
            case Kt:
              return te.key === ut ? x(ee, ge, te, Ae) : null;
            case an:
              return te.key === ut ? O(ee, ge, te, Ae) : null;
            case ct: {
              var at = te._payload, Yt = te._init;
              return I(ee, ge, Yt(at), Ae);
            }
          }
          if (dn(te) || Rt(te))
            return ut !== null ? null : L(ee, ge, te, Ae, null);
          Sm(ee, te);
        }
        return typeof te == "function" && Em(ee), null;
      }
      function le(ee, ge, te, Ae, ut) {
        if (typeof Ae == "string" && Ae !== "" || typeof Ae == "number") {
          var at = ee.get(te) || null;
          return w(ge, at, "" + Ae, ut);
        }
        if (typeof Ae == "object" && Ae !== null) {
          switch (Ae.$$typeof) {
            case Kt: {
              var Yt = ee.get(Ae.key === null ? te : Ae.key) || null;
              return x(ge, Yt, Ae, ut);
            }
            case an: {
              var en = ee.get(Ae.key === null ? te : Ae.key) || null;
              return O(ge, en, Ae, ut);
            }
            case ct:
              var nr = Ae._payload, qn = Ae._init;
              return le(ee, ge, te, qn(nr), ut);
          }
          if (dn(Ae) || Rt(Ae)) {
            var Ir = ee.get(te) || null;
            return L(ge, Ir, Ae, ut, null);
          }
          Sm(ge, Ae);
        }
        return typeof Ae == "function" && Em(ge), null;
      }
      function ce(ee, ge, te) {
        {
          if (typeof ee != "object" || ee === null)
            return ge;
          switch (ee.$$typeof) {
            case Kt:
            case an:
              hS(ee, te);
              var Ae = ee.key;
              if (typeof Ae != "string")
                break;
              if (ge === null) {
                ge = /* @__PURE__ */ new Set(), ge.add(Ae);
                break;
              }
              if (!ge.has(Ae)) {
                ge.add(Ae);
                break;
              }
              p("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", Ae);
              break;
            case ct:
              var ut = ee._payload, at = ee._init;
              ce(at(ut), ge, te);
              break;
          }
        }
        return ge;
      }
      function ye(ee, ge, te, Ae) {
        for (var ut = null, at = 0; at < te.length; at++) {
          var Yt = te[at];
          ut = ce(Yt, ut, ee);
        }
        for (var en = null, nr = null, qn = ge, Ir = 0, In = 0, Hr = null; qn !== null && In < te.length; In++) {
          qn.index > In ? (Hr = qn, qn = null) : Hr = qn.sibling;
          var Ka = I(ee, qn, te[In], Ae);
          if (Ka === null) {
            qn === null && (qn = Hr);
            break;
          }
          e && qn && Ka.alternate === null && t(ee, qn), Ir = v(Ka, Ir, In), nr === null ? en = Ka : nr.sibling = Ka, nr = Ka, qn = Hr;
        }
        if (In === te.length) {
          if (i(ee, qn), _a()) {
            var Na = In;
            hc(ee, Na);
          }
          return en;
        }
        if (qn === null) {
          for (; In < te.length; In++) {
            var Bi = B(ee, te[In], Ae);
            Bi !== null && (Ir = v(Bi, Ir, In), nr === null ? en = Bi : nr.sibling = Bi, nr = Bi);
          }
          if (_a()) {
            var di = In;
            hc(ee, di);
          }
          return en;
        }
        for (var vi = o(ee, qn); In < te.length; In++) {
          var Za = le(vi, ee, In, te[In], Ae);
          Za !== null && (e && Za.alternate !== null && vi.delete(Za.key === null ? In : Za.key), Ir = v(Za, Ir, In), nr === null ? en = Za : nr.sibling = Za, nr = Za);
        }
        if (e && vi.forEach(function(pd) {
          return t(ee, pd);
        }), _a()) {
          var Su = In;
          hc(ee, Su);
        }
        return en;
      }
      function tt(ee, ge, te, Ae) {
        var ut = Rt(te);
        if (typeof ut != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          te[Symbol.toStringTag] === "Generator" && (I0 || p("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), I0 = !0), te.entries === ut && (q0 || p("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), q0 = !0);
          var at = ut.call(te);
          if (at)
            for (var Yt = null, en = at.next(); !en.done; en = at.next()) {
              var nr = en.value;
              Yt = ce(nr, Yt, ee);
            }
        }
        var qn = ut.call(te);
        if (qn == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Ir = null, In = null, Hr = ge, Ka = 0, Na = 0, Bi = null, di = qn.next(); Hr !== null && !di.done; Na++, di = qn.next()) {
          Hr.index > Na ? (Bi = Hr, Hr = null) : Bi = Hr.sibling;
          var vi = I(ee, Hr, di.value, Ae);
          if (vi === null) {
            Hr === null && (Hr = Bi);
            break;
          }
          e && Hr && vi.alternate === null && t(ee, Hr), Ka = v(vi, Ka, Na), In === null ? Ir = vi : In.sibling = vi, In = vi, Hr = Bi;
        }
        if (di.done) {
          if (i(ee, Hr), _a()) {
            var Za = Na;
            hc(ee, Za);
          }
          return Ir;
        }
        if (Hr === null) {
          for (; !di.done; Na++, di = qn.next()) {
            var Su = B(ee, di.value, Ae);
            Su !== null && (Ka = v(Su, Ka, Na), In === null ? Ir = Su : In.sibling = Su, In = Su);
          }
          if (_a()) {
            var pd = Na;
            hc(ee, pd);
          }
          return Ir;
        }
        for (var Tp = o(ee, Hr); !di.done; Na++, di = qn.next()) {
          var _o = le(Tp, ee, Na, di.value, Ae);
          _o !== null && (e && _o.alternate !== null && Tp.delete(_o.key === null ? Na : _o.key), Ka = v(_o, Ka, Na), In === null ? Ir = _o : In.sibling = _o, In = _o);
        }
        if (e && Tp.forEach(function(A_) {
          return t(ee, A_);
        }), _a()) {
          var L_ = Na;
          hc(ee, L_);
        }
        return Ir;
      }
      function jt(ee, ge, te, Ae) {
        if (ge !== null && ge.tag === z) {
          i(ee, ge.sibling);
          var ut = c(ge, te);
          return ut.return = ee, ut;
        }
        i(ee, ge);
        var at = Vg(te, ee.mode, Ae);
        return at.return = ee, at;
      }
      function bt(ee, ge, te, Ae) {
        for (var ut = te.key, at = ge; at !== null; ) {
          if (at.key === ut) {
            var Yt = te.type;
            if (Yt === ln) {
              if (at.tag === A) {
                i(ee, at.sibling);
                var en = c(at, te.props.children);
                return en.return = ee, en._debugSource = te._source, en._debugOwner = te._owner, en;
              }
            } else if (at.elementType === Yt || // Keep this check inline so it only runs on the false path:
            wE(at, te) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof Yt == "object" && Yt !== null && Yt.$$typeof === ct && mS(Yt) === at.type) {
              i(ee, at.sibling);
              var nr = c(at, te.props);
              return nr.ref = Yv(ee, at, te), nr.return = ee, nr._debugSource = te._source, nr._debugOwner = te._owner, nr;
            }
            i(ee, at);
            break;
          } else
            t(ee, at);
          at = at.sibling;
        }
        if (te.type === ln) {
          var qn = vs(te.props.children, ee.mode, Ae, te.key);
          return qn.return = ee, qn;
        } else {
          var Ir = $g(te, ee.mode, Ae);
          return Ir.ref = Yv(ee, ge, te), Ir.return = ee, Ir;
        }
      }
      function zn(ee, ge, te, Ae) {
        for (var ut = te.key, at = ge; at !== null; ) {
          if (at.key === ut)
            if (at.tag === D && at.stateNode.containerInfo === te.containerInfo && at.stateNode.implementation === te.implementation) {
              i(ee, at.sibling);
              var Yt = c(at, te.children || []);
              return Yt.return = ee, Yt;
            } else {
              i(ee, at);
              break;
            }
          else
            t(ee, at);
          at = at.sibling;
        }
        var en = qg(te, ee.mode, Ae);
        return en.return = ee, en;
      }
      function Tn(ee, ge, te, Ae) {
        var ut = typeof te == "object" && te !== null && te.type === ln && te.key === null;
        if (ut && (te = te.props.children), typeof te == "object" && te !== null) {
          switch (te.$$typeof) {
            case Kt:
              return g(bt(ee, ge, te, Ae));
            case an:
              return g(zn(ee, ge, te, Ae));
            case ct:
              var at = te._payload, Yt = te._init;
              return Tn(ee, ge, Yt(at), Ae);
          }
          if (dn(te))
            return ye(ee, ge, te, Ae);
          if (Rt(te))
            return tt(ee, ge, te, Ae);
          Sm(ee, te);
        }
        return typeof te == "string" && te !== "" || typeof te == "number" ? g(jt(ee, ge, "" + te, Ae)) : (typeof te == "function" && Em(ee), i(ee, ge));
      }
      return Tn;
    }
    var Xf = yS(!0), gS = yS(!1);
    function sb(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var i = t.child, o = _c(i, i.pendingProps);
        for (t.child = o, o.return = t; i.sibling !== null; )
          i = i.sibling, o = o.sibling = _c(i, i.pendingProps), o.return = t;
        o.sibling = null;
      }
    }
    function cb(e, t) {
      for (var i = e.child; i !== null; )
        KM(i, t), i = i.sibling;
    }
    var Q0 = Ju(null), G0;
    G0 = {};
    var Cm = null, Kf = null, X0 = null, wm = !1;
    function Tm() {
      Cm = null, Kf = null, X0 = null, wm = !1;
    }
    function SS() {
      wm = !0;
    }
    function ES() {
      wm = !1;
    }
    function CS(e, t, i) {
      Ga(Q0, t._currentValue, e), t._currentValue = i, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== G0 && p("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = G0;
    }
    function K0(e, t) {
      var i = Q0.current;
      Qa(Q0, t), e._currentValue = i;
    }
    function Z0(e, t, i) {
      for (var o = e; o !== null; ) {
        var c = o.alternate;
        if (tu(o.childLanes, t) ? c !== null && !tu(c.childLanes, t) && (c.childLanes = un(c.childLanes, t)) : (o.childLanes = un(o.childLanes, t), c !== null && (c.childLanes = un(c.childLanes, t))), o === i)
          break;
        o = o.return;
      }
      o !== i && p("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function fb(e, t, i) {
      db(e, t, i);
    }
    function db(e, t, i) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var c = void 0, v = o.dependencies;
        if (v !== null) {
          c = o.child;
          for (var g = v.firstContext; g !== null; ) {
            if (g.context === t) {
              if (o.tag === T) {
                var w = Ws(i), x = vu(rr, w);
                x.tag = bm;
                var O = o.updateQueue;
                if (O !== null) {
                  var L = O.shared, B = L.pending;
                  B === null ? x.next = x : (x.next = B.next, B.next = x), L.pending = x;
                }
              }
              o.lanes = un(o.lanes, i);
              var I = o.alternate;
              I !== null && (I.lanes = un(I.lanes, i)), Z0(o.return, i, e), v.lanes = un(v.lanes, i);
              break;
            }
            g = g.next;
          }
        } else if (o.tag === K)
          c = o.type === e.type ? null : o.child;
        else if (o.tag === G) {
          var le = o.return;
          if (le === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          le.lanes = un(le.lanes, i);
          var ce = le.alternate;
          ce !== null && (ce.lanes = un(ce.lanes, i)), Z0(le, i, e), c = o.sibling;
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
            var ye = c.sibling;
            if (ye !== null) {
              ye.return = c.return, c = ye;
              break;
            }
            c = c.return;
          }
        o = c;
      }
    }
    function Zf(e, t) {
      Cm = e, Kf = null, X0 = null;
      var i = e.dependencies;
      if (i !== null) {
        var o = i.firstContext;
        o !== null && (Ia(i.lanes, t) && lp(), i.firstContext = null);
      }
    }
    function Gr(e) {
      wm && p("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (X0 !== e) {
        var i = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (Kf === null) {
          if (Cm === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Kf = i, Cm.dependencies = {
            lanes: _e,
            firstContext: i
          };
        } else
          Kf = Kf.next = i;
      }
      return t;
    }
    var Ec = null;
    function J0(e) {
      Ec === null ? Ec = [e] : Ec.push(e);
    }
    function vb() {
      if (Ec !== null) {
        for (var e = 0; e < Ec.length; e++) {
          var t = Ec[e], i = t.interleaved;
          if (i !== null) {
            t.interleaved = null;
            var o = i.next, c = t.pending;
            if (c !== null) {
              var v = c.next;
              c.next = o, i.next = v;
            }
            t.pending = i;
          }
        }
        Ec = null;
      }
    }
    function wS(e, t, i, o) {
      var c = t.interleaved;
      return c === null ? (i.next = i, J0(t)) : (i.next = c.next, c.next = i), t.interleaved = i, Rm(e, o);
    }
    function pb(e, t, i, o) {
      var c = t.interleaved;
      c === null ? (i.next = i, J0(t)) : (i.next = c.next, c.next = i), t.interleaved = i;
    }
    function hb(e, t, i, o) {
      var c = t.interleaved;
      return c === null ? (i.next = i, J0(t)) : (i.next = c.next, c.next = i), t.interleaved = i, Rm(e, o);
    }
    function Oi(e, t) {
      return Rm(e, t);
    }
    var mb = Rm;
    function Rm(e, t) {
      e.lanes = un(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = un(i.lanes, t)), i === null && (e.flags & (hr | Ha)) !== Dt && gE(e);
      for (var o = e, c = e.return; c !== null; )
        c.childLanes = un(c.childLanes, t), i = c.alternate, i !== null ? i.childLanes = un(i.childLanes, t) : (c.flags & (hr | Ha)) !== Dt && gE(e), o = c, c = c.return;
      if (o.tag === R) {
        var v = o.stateNode;
        return v;
      } else
        return null;
    }
    var TS = 0, RS = 1, bm = 2, e1 = 3, xm = !1, t1, Mm;
    t1 = !1, Mm = null;
    function n1(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: _e
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function bS(e, t) {
      var i = t.updateQueue, o = e.updateQueue;
      if (i === o) {
        var c = {
          baseState: o.baseState,
          firstBaseUpdate: o.firstBaseUpdate,
          lastBaseUpdate: o.lastBaseUpdate,
          shared: o.shared,
          effects: o.effects
        };
        t.updateQueue = c;
      }
    }
    function vu(e, t) {
      var i = {
        eventTime: e,
        lane: t,
        tag: TS,
        payload: null,
        callback: null,
        next: null
      };
      return i;
    }
    function rs(e, t, i) {
      var o = e.updateQueue;
      if (o === null)
        return null;
      var c = o.shared;
      if (Mm === c && !t1 && (p("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), t1 = !0), pM()) {
        var v = c.pending;
        return v === null ? t.next = t : (t.next = v.next, v.next = t), c.pending = t, mb(e, i);
      } else
        return hb(e, c, t, i);
    }
    function _m(e, t, i) {
      var o = t.updateQueue;
      if (o !== null) {
        var c = o.shared;
        if (av(i)) {
          var v = c.lanes;
          v = lv(v, e.pendingLanes);
          var g = un(v, i);
          c.lanes = g, Rf(e, g);
        }
      }
    }
    function r1(e, t) {
      var i = e.updateQueue, o = e.alternate;
      if (o !== null) {
        var c = o.updateQueue;
        if (i === c) {
          var v = null, g = null, w = i.firstBaseUpdate;
          if (w !== null) {
            var x = w;
            do {
              var O = {
                eventTime: x.eventTime,
                lane: x.lane,
                tag: x.tag,
                payload: x.payload,
                callback: x.callback,
                next: null
              };
              g === null ? v = g = O : (g.next = O, g = O), x = x.next;
            } while (x !== null);
            g === null ? v = g = t : (g.next = t, g = t);
          } else
            v = g = t;
          i = {
            baseState: c.baseState,
            firstBaseUpdate: v,
            lastBaseUpdate: g,
            shared: c.shared,
            effects: c.effects
          }, e.updateQueue = i;
          return;
        }
      }
      var L = i.lastBaseUpdate;
      L === null ? i.firstBaseUpdate = t : L.next = t, i.lastBaseUpdate = t;
    }
    function yb(e, t, i, o, c, v) {
      switch (i.tag) {
        case RS: {
          var g = i.payload;
          if (typeof g == "function") {
            SS();
            var w = g.call(v, o, c);
            {
              if (e.mode & er) {
                mr(!0);
                try {
                  g.call(v, o, c);
                } finally {
                  mr(!1);
                }
              }
              ES();
            }
            return w;
          }
          return g;
        }
        case e1:
          e.flags = e.flags & ~Yr | Mt;
        // Intentional fallthrough
        case TS: {
          var x = i.payload, O;
          if (typeof x == "function") {
            SS(), O = x.call(v, o, c);
            {
              if (e.mode & er) {
                mr(!0);
                try {
                  x.call(v, o, c);
                } finally {
                  mr(!1);
                }
              }
              ES();
            }
          } else
            O = x;
          return O == null ? o : $t({}, o, O);
        }
        case bm:
          return xm = !0, o;
      }
      return o;
    }
    function km(e, t, i, o) {
      var c = e.updateQueue;
      xm = !1, Mm = c.shared;
      var v = c.firstBaseUpdate, g = c.lastBaseUpdate, w = c.shared.pending;
      if (w !== null) {
        c.shared.pending = null;
        var x = w, O = x.next;
        x.next = null, g === null ? v = O : g.next = O, g = x;
        var L = e.alternate;
        if (L !== null) {
          var B = L.updateQueue, I = B.lastBaseUpdate;
          I !== g && (I === null ? B.firstBaseUpdate = O : I.next = O, B.lastBaseUpdate = x);
        }
      }
      if (v !== null) {
        var le = c.baseState, ce = _e, ye = null, tt = null, jt = null, bt = v;
        do {
          var zn = bt.lane, Tn = bt.eventTime;
          if (tu(o, zn)) {
            if (jt !== null) {
              var ge = {
                eventTime: Tn,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Un,
                tag: bt.tag,
                payload: bt.payload,
                callback: bt.callback,
                next: null
              };
              jt = jt.next = ge;
            }
            le = yb(e, c, bt, le, t, i);
            var te = bt.callback;
            if (te !== null && // If the update was already committed, we should not queue its
            // callback again.
            bt.lane !== Un) {
              e.flags |= or;
              var Ae = c.effects;
              Ae === null ? c.effects = [bt] : Ae.push(bt);
            }
          } else {
            var ee = {
              eventTime: Tn,
              lane: zn,
              tag: bt.tag,
              payload: bt.payload,
              callback: bt.callback,
              next: null
            };
            jt === null ? (tt = jt = ee, ye = le) : jt = jt.next = ee, ce = un(ce, zn);
          }
          if (bt = bt.next, bt === null) {
            if (w = c.shared.pending, w === null)
              break;
            var ut = w, at = ut.next;
            ut.next = null, bt = at, c.lastBaseUpdate = ut, c.shared.pending = null;
          }
        } while (!0);
        jt === null && (ye = le), c.baseState = ye, c.firstBaseUpdate = tt, c.lastBaseUpdate = jt;
        var Yt = c.shared.interleaved;
        if (Yt !== null) {
          var en = Yt;
          do
            ce = un(ce, en.lane), en = en.next;
          while (en !== Yt);
        } else v === null && (c.shared.lanes = _e);
        gp(ce), e.lanes = ce, e.memoizedState = le;
      }
      Mm = null;
    }
    function gb(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function xS() {
      xm = !1;
    }
    function Dm() {
      return xm;
    }
    function MS(e, t, i) {
      var o = t.effects;
      if (t.effects = null, o !== null)
        for (var c = 0; c < o.length; c++) {
          var v = o[c], g = v.callback;
          g !== null && (v.callback = null, gb(g, i));
        }
    }
    var Wv = {}, as = Ju(Wv), Bv = Ju(Wv), Om = Ju(Wv);
    function zm(e) {
      if (e === Wv)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function _S() {
      var e = zm(Om.current);
      return e;
    }
    function a1(e, t) {
      Ga(Om, t, e), Ga(Bv, e, e), Ga(as, Wv, e);
      var i = NT(t);
      Qa(as, e), Ga(as, i, e);
    }
    function Jf(e) {
      Qa(as, e), Qa(Bv, e), Qa(Om, e);
    }
    function i1() {
      var e = zm(as.current);
      return e;
    }
    function kS(e) {
      zm(Om.current);
      var t = zm(as.current), i = UT(t, e.type);
      t !== i && (Ga(Bv, e, e), Ga(as, i, e));
    }
    function l1(e) {
      Bv.current === e && (Qa(as, e), Qa(Bv, e));
    }
    var Sb = 0, DS = 1, OS = 1, Qv = 2, Hl = Ju(Sb);
    function o1(e, t) {
      return (e & t) !== 0;
    }
    function ed(e) {
      return e & DS;
    }
    function u1(e, t) {
      return e & DS | t;
    }
    function Eb(e, t) {
      return e | t;
    }
    function is(e, t) {
      Ga(Hl, t, e);
    }
    function td(e) {
      Qa(Hl, e);
    }
    function Cb(e, t) {
      var i = e.memoizedState;
      return i !== null ? i.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Lm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === $) {
          var i = t.memoizedState;
          if (i !== null) {
            var o = i.dehydrated;
            if (o === null || Q2(o) || x0(o))
              return t;
          }
        } else if (t.tag === se && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var c = (t.flags & Mt) !== Dt;
          if (c)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var zi = (
      /*   */
      0
    ), ra = (
      /* */
      1
    ), Co = (
      /*  */
      2
    ), aa = (
      /*    */
      4
    ), ka = (
      /*   */
      8
    ), s1 = [];
    function c1() {
      for (var e = 0; e < s1.length; e++) {
        var t = s1[e];
        t._workInProgressVersionPrimary = null;
      }
      s1.length = 0;
    }
    function wb(e, t) {
      var i = t._getVersion, o = i(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, o] : e.mutableSourceEagerHydrationData.push(t, o);
    }
    var ot = s.ReactCurrentDispatcher, Gv = s.ReactCurrentBatchConfig, f1, nd;
    f1 = /* @__PURE__ */ new Set();
    var Cc = _e, tr = null, ia = null, la = null, Am = !1, Xv = !1, Kv = 0, Tb = 0, Rb = 25, Ce = null, hl = null, ls = -1, d1 = !1;
    function Wn() {
      {
        var e = Ce;
        hl === null ? hl = [e] : hl.push(e);
      }
    }
    function Ke() {
      {
        var e = Ce;
        hl !== null && (ls++, hl[ls] !== e && bb(e));
      }
    }
    function rd(e) {
      e != null && !dn(e) && p("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Ce, typeof e);
    }
    function bb(e) {
      {
        var t = Vt(tr);
        if (!f1.has(t) && (f1.add(t), hl !== null)) {
          for (var i = "", o = 30, c = 0; c <= ls; c++) {
            for (var v = hl[c], g = c === ls ? e : v, w = c + 1 + ". " + v; w.length < o; )
              w += " ";
            w += g + `
`, i += w;
          }
          p(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, i);
        }
      }
    }
    function Xa() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function v1(e, t) {
      if (d1)
        return !1;
      if (t === null)
        return p("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Ce), !1;
      e.length !== t.length && p(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, Ce, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var i = 0; i < t.length && i < e.length; i++)
        if (!ze(e[i], t[i]))
          return !1;
      return !0;
    }
    function ad(e, t, i, o, c, v) {
      Cc = v, tr = t, hl = e !== null ? e._debugHookTypes : null, ls = -1, d1 = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = _e, e !== null && e.memoizedState !== null ? ot.current = JS : hl !== null ? ot.current = ZS : ot.current = KS;
      var g = i(o, c);
      if (Xv) {
        var w = 0;
        do {
          if (Xv = !1, Kv = 0, w >= Rb)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          w += 1, d1 = !1, ia = null, la = null, t.updateQueue = null, ls = -1, ot.current = e3, g = i(o, c);
        } while (Xv);
      }
      ot.current = Bm, t._debugHookTypes = hl;
      var x = ia !== null && ia.next !== null;
      if (Cc = _e, tr = null, ia = null, la = null, Ce = null, hl = null, ls = -1, e !== null && (e.flags & Lr) !== (t.flags & Lr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & pn) !== Ot && p("Internal React error: Expected static flag was missing. Please notify the React team."), Am = !1, x)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return g;
    }
    function id() {
      var e = Kv !== 0;
      return Kv = 0, e;
    }
    function zS(e, t, i) {
      t.updateQueue = e.updateQueue, (t.mode & $n) !== Ot ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Bs(e.lanes, i);
    }
    function LS() {
      if (ot.current = Bm, Am) {
        for (var e = tr.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Am = !1;
      }
      Cc = _e, tr = null, ia = null, la = null, hl = null, ls = -1, Ce = null, WS = !1, Xv = !1, Kv = 0;
    }
    function wo() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return la === null ? tr.memoizedState = la = e : la = la.next = e, la;
    }
    function ml() {
      var e;
      if (ia === null) {
        var t = tr.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = ia.next;
      var i;
      if (la === null ? i = tr.memoizedState : i = la.next, i !== null)
        la = i, i = la.next, ia = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        ia = e;
        var o = {
          memoizedState: ia.memoizedState,
          baseState: ia.baseState,
          baseQueue: ia.baseQueue,
          queue: ia.queue,
          next: null
        };
        la === null ? tr.memoizedState = la = o : la = la.next = o;
      }
      return la;
    }
    function AS() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function p1(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function h1(e, t, i) {
      var o = wo(), c;
      i !== void 0 ? c = i(t) : c = t, o.memoizedState = o.baseState = c;
      var v = {
        pending: null,
        interleaved: null,
        lanes: _e,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      };
      o.queue = v;
      var g = v.dispatch = kb.bind(null, tr, v);
      return [o.memoizedState, g];
    }
    function m1(e, t, i) {
      var o = ml(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var v = ia, g = v.baseQueue, w = c.pending;
      if (w !== null) {
        if (g !== null) {
          var x = g.next, O = w.next;
          g.next = O, w.next = x;
        }
        v.baseQueue !== g && p("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), v.baseQueue = g = w, c.pending = null;
      }
      if (g !== null) {
        var L = g.next, B = v.baseState, I = null, le = null, ce = null, ye = L;
        do {
          var tt = ye.lane;
          if (tu(Cc, tt)) {
            if (ce !== null) {
              var bt = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Un,
                action: ye.action,
                hasEagerState: ye.hasEagerState,
                eagerState: ye.eagerState,
                next: null
              };
              ce = ce.next = bt;
            }
            if (ye.hasEagerState)
              B = ye.eagerState;
            else {
              var zn = ye.action;
              B = e(B, zn);
            }
          } else {
            var jt = {
              lane: tt,
              action: ye.action,
              hasEagerState: ye.hasEagerState,
              eagerState: ye.eagerState,
              next: null
            };
            ce === null ? (le = ce = jt, I = B) : ce = ce.next = jt, tr.lanes = un(tr.lanes, tt), gp(tt);
          }
          ye = ye.next;
        } while (ye !== null && ye !== L);
        ce === null ? I = B : ce.next = le, ze(B, o.memoizedState) || lp(), o.memoizedState = B, o.baseState = I, o.baseQueue = ce, c.lastRenderedState = B;
      }
      var Tn = c.interleaved;
      if (Tn !== null) {
        var ee = Tn;
        do {
          var ge = ee.lane;
          tr.lanes = un(tr.lanes, ge), gp(ge), ee = ee.next;
        } while (ee !== Tn);
      } else g === null && (c.lanes = _e);
      var te = c.dispatch;
      return [o.memoizedState, te];
    }
    function y1(e, t, i) {
      var o = ml(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var v = c.dispatch, g = c.pending, w = o.memoizedState;
      if (g !== null) {
        c.pending = null;
        var x = g.next, O = x;
        do {
          var L = O.action;
          w = e(w, L), O = O.next;
        } while (O !== x);
        ze(w, o.memoizedState) || lp(), o.memoizedState = w, o.baseQueue === null && (o.baseState = w), c.lastRenderedState = w;
      }
      return [w, v];
    }
    function z4(e, t, i) {
    }
    function L4(e, t, i) {
    }
    function g1(e, t, i) {
      var o = tr, c = wo(), v, g = _a();
      if (g) {
        if (i === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        v = i(), nd || v !== i() && (p("The result of getServerSnapshot should be cached to avoid an infinite loop"), nd = !0);
      } else {
        if (v = t(), !nd) {
          var w = t();
          ze(v, w) || (p("The result of getSnapshot should be cached to avoid an infinite loop"), nd = !0);
        }
        var x = dy();
        if (x === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        wf(x, Cc) || NS(o, t, v);
      }
      c.memoizedState = v;
      var O = {
        value: v,
        getSnapshot: t
      };
      return c.queue = O, Hm(jS.bind(null, o, O, e), [e]), o.flags |= Fa, Zv(ra | ka, US.bind(null, o, O, v, t), void 0, null), v;
    }
    function Nm(e, t, i) {
      var o = tr, c = ml(), v = t();
      if (!nd) {
        var g = t();
        ze(v, g) || (p("The result of getSnapshot should be cached to avoid an infinite loop"), nd = !0);
      }
      var w = c.memoizedState, x = !ze(w, v);
      x && (c.memoizedState = v, lp());
      var O = c.queue;
      if (ep(jS.bind(null, o, O, e), [e]), O.getSnapshot !== t || x || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      la !== null && la.memoizedState.tag & ra) {
        o.flags |= Fa, Zv(ra | ka, US.bind(null, o, O, v, t), void 0, null);
        var L = dy();
        if (L === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        wf(L, Cc) || NS(o, t, v);
      }
      return v;
    }
    function NS(e, t, i) {
      e.flags |= ju;
      var o = {
        getSnapshot: t,
        value: i
      }, c = tr.updateQueue;
      if (c === null)
        c = AS(), tr.updateQueue = c, c.stores = [o];
      else {
        var v = c.stores;
        v === null ? c.stores = [o] : v.push(o);
      }
    }
    function US(e, t, i, o) {
      t.value = i, t.getSnapshot = o, FS(t) && HS(e);
    }
    function jS(e, t, i) {
      var o = function() {
        FS(t) && HS(e);
      };
      return i(o);
    }
    function FS(e) {
      var t = e.getSnapshot, i = e.value;
      try {
        var o = t();
        return !ze(i, o);
      } catch {
        return !0;
      }
    }
    function HS(e) {
      var t = Oi(e, It);
      t !== null && ca(t, e, It, rr);
    }
    function Um(e) {
      var t = wo();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        interleaved: null,
        lanes: _e,
        dispatch: null,
        lastRenderedReducer: p1,
        lastRenderedState: e
      };
      t.queue = i;
      var o = i.dispatch = Db.bind(null, tr, i);
      return [t.memoizedState, o];
    }
    function S1(e) {
      return m1(p1);
    }
    function E1(e) {
      return y1(p1);
    }
    function Zv(e, t, i, o) {
      var c = {
        tag: e,
        create: t,
        destroy: i,
        deps: o,
        // Circular
        next: null
      }, v = tr.updateQueue;
      if (v === null)
        v = AS(), tr.updateQueue = v, v.lastEffect = c.next = c;
      else {
        var g = v.lastEffect;
        if (g === null)
          v.lastEffect = c.next = c;
        else {
          var w = g.next;
          g.next = c, c.next = w, v.lastEffect = c;
        }
      }
      return c;
    }
    function C1(e) {
      var t = wo();
      {
        var i = {
          current: e
        };
        return t.memoizedState = i, i;
      }
    }
    function jm(e) {
      var t = ml();
      return t.memoizedState;
    }
    function Jv(e, t, i, o) {
      var c = wo(), v = o === void 0 ? null : o;
      tr.flags |= e, c.memoizedState = Zv(ra | t, i, void 0, v);
    }
    function Fm(e, t, i, o) {
      var c = ml(), v = o === void 0 ? null : o, g = void 0;
      if (ia !== null) {
        var w = ia.memoizedState;
        if (g = w.destroy, v !== null) {
          var x = w.deps;
          if (v1(v, x)) {
            c.memoizedState = Zv(t, i, g, v);
            return;
          }
        }
      }
      tr.flags |= e, c.memoizedState = Zv(ra | t, i, g, v);
    }
    function Hm(e, t) {
      return (tr.mode & $n) !== Ot ? Jv(rl | Fa | Qc, ka, e, t) : Jv(Fa | Qc, ka, e, t);
    }
    function ep(e, t) {
      return Fm(Fa, ka, e, t);
    }
    function w1(e, t) {
      return Jv(kn, Co, e, t);
    }
    function Pm(e, t) {
      return Fm(kn, Co, e, t);
    }
    function T1(e, t) {
      var i = kn;
      return i |= Ml, (tr.mode & $n) !== Ot && (i |= no), Jv(i, aa, e, t);
    }
    function $m(e, t) {
      return Fm(kn, aa, e, t);
    }
    function PS(e, t) {
      if (typeof t == "function") {
        var i = t, o = e();
        return i(o), function() {
          i(null);
        };
      } else if (t != null) {
        var c = t;
        c.hasOwnProperty("current") || p("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(c).join(", ") + "}");
        var v = e();
        return c.current = v, function() {
          c.current = null;
        };
      }
    }
    function R1(e, t, i) {
      typeof t != "function" && p("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = i != null ? i.concat([e]) : null, c = kn;
      return c |= Ml, (tr.mode & $n) !== Ot && (c |= no), Jv(c, aa, PS.bind(null, t, e), o);
    }
    function Vm(e, t, i) {
      typeof t != "function" && p("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = i != null ? i.concat([e]) : null;
      return Fm(kn, aa, PS.bind(null, t, e), o);
    }
    function xb(e, t) {
    }
    var qm = xb;
    function b1(e, t) {
      var i = wo(), o = t === void 0 ? null : t;
      return i.memoizedState = [e, o], e;
    }
    function Im(e, t) {
      var i = ml(), o = t === void 0 ? null : t, c = i.memoizedState;
      if (c !== null && o !== null) {
        var v = c[1];
        if (v1(o, v))
          return c[0];
      }
      return i.memoizedState = [e, o], e;
    }
    function x1(e, t) {
      var i = wo(), o = t === void 0 ? null : t, c = e();
      return i.memoizedState = [c, o], c;
    }
    function Ym(e, t) {
      var i = ml(), o = t === void 0 ? null : t, c = i.memoizedState;
      if (c !== null && o !== null) {
        var v = c[1];
        if (v1(o, v))
          return c[0];
      }
      var g = e();
      return i.memoizedState = [g, o], g;
    }
    function M1(e) {
      var t = wo();
      return t.memoizedState = e, e;
    }
    function $S(e) {
      var t = ml(), i = ia, o = i.memoizedState;
      return qS(t, o, e);
    }
    function VS(e) {
      var t = ml();
      if (ia === null)
        return t.memoizedState = e, e;
      var i = ia.memoizedState;
      return qS(t, i, e);
    }
    function qS(e, t, i) {
      var o = !nv(Cc);
      if (o) {
        if (!ze(i, t)) {
          var c = iv();
          tr.lanes = un(tr.lanes, c), gp(c), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, lp()), e.memoizedState = i, i;
    }
    function Mb(e, t, i) {
      var o = _i();
      Ur(wh(o, ol)), e(!0);
      var c = Gv.transition;
      Gv.transition = {};
      var v = Gv.transition;
      Gv.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (Ur(o), Gv.transition = c, c === null && v._updatedFibers) {
          var g = v._updatedFibers.size;
          g > 10 && m("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), v._updatedFibers.clear();
        }
      }
    }
    function _1() {
      var e = Um(!1), t = e[0], i = e[1], o = Mb.bind(null, i), c = wo();
      return c.memoizedState = o, [t, o];
    }
    function IS() {
      var e = S1(), t = e[0], i = ml(), o = i.memoizedState;
      return [t, o];
    }
    function YS() {
      var e = E1(), t = e[0], i = ml(), o = i.memoizedState;
      return [t, o];
    }
    var WS = !1;
    function _b() {
      return WS;
    }
    function k1() {
      var e = wo(), t = dy(), i = t.identifierPrefix, o;
      if (_a()) {
        var c = YR();
        o = ":" + i + "R" + c;
        var v = Kv++;
        v > 0 && (o += "H" + v.toString(32)), o += ":";
      } else {
        var g = Tb++;
        o = ":" + i + "r" + g.toString(32) + ":";
      }
      return e.memoizedState = o, o;
    }
    function Wm() {
      var e = ml(), t = e.memoizedState;
      return t;
    }
    function kb(e, t, i) {
      typeof arguments[3] == "function" && p("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = fs(e), c = {
        lane: o,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (BS(e))
        QS(t, c);
      else {
        var v = wS(e, t, c, o);
        if (v !== null) {
          var g = fi();
          ca(v, e, o, g), GS(v, t, o);
        }
      }
      XS(e, o);
    }
    function Db(e, t, i) {
      typeof arguments[3] == "function" && p("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = fs(e), c = {
        lane: o,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (BS(e))
        QS(t, c);
      else {
        var v = e.alternate;
        if (e.lanes === _e && (v === null || v.lanes === _e)) {
          var g = t.lastRenderedReducer;
          if (g !== null) {
            var w;
            w = ot.current, ot.current = Pl;
            try {
              var x = t.lastRenderedState, O = g(x, i);
              if (c.hasEagerState = !0, c.eagerState = O, ze(O, x)) {
                pb(e, t, c, o);
                return;
              }
            } catch {
            } finally {
              ot.current = w;
            }
          }
        }
        var L = wS(e, t, c, o);
        if (L !== null) {
          var B = fi();
          ca(L, e, o, B), GS(L, t, o);
        }
      }
      XS(e, o);
    }
    function BS(e) {
      var t = e.alternate;
      return e === tr || t !== null && t === tr;
    }
    function QS(e, t) {
      Xv = Am = !0;
      var i = e.pending;
      i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
    }
    function GS(e, t, i) {
      if (av(i)) {
        var o = t.lanes;
        o = lv(o, e.pendingLanes);
        var c = un(o, i);
        t.lanes = c, Rf(e, c);
      }
    }
    function XS(e, t, i) {
      js(e, t);
    }
    var Bm = {
      readContext: Gr,
      useCallback: Xa,
      useContext: Xa,
      useEffect: Xa,
      useImperativeHandle: Xa,
      useInsertionEffect: Xa,
      useLayoutEffect: Xa,
      useMemo: Xa,
      useReducer: Xa,
      useRef: Xa,
      useState: Xa,
      useDebugValue: Xa,
      useDeferredValue: Xa,
      useTransition: Xa,
      useMutableSource: Xa,
      useSyncExternalStore: Xa,
      useId: Xa,
      unstable_isNewReconciler: ie
    }, KS = null, ZS = null, JS = null, e3 = null, To = null, Pl = null, Qm = null;
    {
      var D1 = function() {
        p("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, Jt = function() {
        p("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      KS = {
        readContext: function(e) {
          return Gr(e);
        },
        useCallback: function(e, t) {
          return Ce = "useCallback", Wn(), rd(t), b1(e, t);
        },
        useContext: function(e) {
          return Ce = "useContext", Wn(), Gr(e);
        },
        useEffect: function(e, t) {
          return Ce = "useEffect", Wn(), rd(t), Hm(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return Ce = "useImperativeHandle", Wn(), rd(i), R1(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return Ce = "useInsertionEffect", Wn(), rd(t), w1(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Ce = "useLayoutEffect", Wn(), rd(t), T1(e, t);
        },
        useMemo: function(e, t) {
          Ce = "useMemo", Wn(), rd(t);
          var i = ot.current;
          ot.current = To;
          try {
            return x1(e, t);
          } finally {
            ot.current = i;
          }
        },
        useReducer: function(e, t, i) {
          Ce = "useReducer", Wn();
          var o = ot.current;
          ot.current = To;
          try {
            return h1(e, t, i);
          } finally {
            ot.current = o;
          }
        },
        useRef: function(e) {
          return Ce = "useRef", Wn(), C1(e);
        },
        useState: function(e) {
          Ce = "useState", Wn();
          var t = ot.current;
          ot.current = To;
          try {
            return Um(e);
          } finally {
            ot.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Ce = "useDebugValue", Wn(), void 0;
        },
        useDeferredValue: function(e) {
          return Ce = "useDeferredValue", Wn(), M1(e);
        },
        useTransition: function() {
          return Ce = "useTransition", Wn(), _1();
        },
        useMutableSource: function(e, t, i) {
          return Ce = "useMutableSource", Wn(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return Ce = "useSyncExternalStore", Wn(), g1(e, t, i);
        },
        useId: function() {
          return Ce = "useId", Wn(), k1();
        },
        unstable_isNewReconciler: ie
      }, ZS = {
        readContext: function(e) {
          return Gr(e);
        },
        useCallback: function(e, t) {
          return Ce = "useCallback", Ke(), b1(e, t);
        },
        useContext: function(e) {
          return Ce = "useContext", Ke(), Gr(e);
        },
        useEffect: function(e, t) {
          return Ce = "useEffect", Ke(), Hm(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return Ce = "useImperativeHandle", Ke(), R1(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return Ce = "useInsertionEffect", Ke(), w1(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Ce = "useLayoutEffect", Ke(), T1(e, t);
        },
        useMemo: function(e, t) {
          Ce = "useMemo", Ke();
          var i = ot.current;
          ot.current = To;
          try {
            return x1(e, t);
          } finally {
            ot.current = i;
          }
        },
        useReducer: function(e, t, i) {
          Ce = "useReducer", Ke();
          var o = ot.current;
          ot.current = To;
          try {
            return h1(e, t, i);
          } finally {
            ot.current = o;
          }
        },
        useRef: function(e) {
          return Ce = "useRef", Ke(), C1(e);
        },
        useState: function(e) {
          Ce = "useState", Ke();
          var t = ot.current;
          ot.current = To;
          try {
            return Um(e);
          } finally {
            ot.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Ce = "useDebugValue", Ke(), void 0;
        },
        useDeferredValue: function(e) {
          return Ce = "useDeferredValue", Ke(), M1(e);
        },
        useTransition: function() {
          return Ce = "useTransition", Ke(), _1();
        },
        useMutableSource: function(e, t, i) {
          return Ce = "useMutableSource", Ke(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return Ce = "useSyncExternalStore", Ke(), g1(e, t, i);
        },
        useId: function() {
          return Ce = "useId", Ke(), k1();
        },
        unstable_isNewReconciler: ie
      }, JS = {
        readContext: function(e) {
          return Gr(e);
        },
        useCallback: function(e, t) {
          return Ce = "useCallback", Ke(), Im(e, t);
        },
        useContext: function(e) {
          return Ce = "useContext", Ke(), Gr(e);
        },
        useEffect: function(e, t) {
          return Ce = "useEffect", Ke(), ep(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return Ce = "useImperativeHandle", Ke(), Vm(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return Ce = "useInsertionEffect", Ke(), Pm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Ce = "useLayoutEffect", Ke(), $m(e, t);
        },
        useMemo: function(e, t) {
          Ce = "useMemo", Ke();
          var i = ot.current;
          ot.current = Pl;
          try {
            return Ym(e, t);
          } finally {
            ot.current = i;
          }
        },
        useReducer: function(e, t, i) {
          Ce = "useReducer", Ke();
          var o = ot.current;
          ot.current = Pl;
          try {
            return m1(e, t, i);
          } finally {
            ot.current = o;
          }
        },
        useRef: function(e) {
          return Ce = "useRef", Ke(), jm();
        },
        useState: function(e) {
          Ce = "useState", Ke();
          var t = ot.current;
          ot.current = Pl;
          try {
            return S1(e);
          } finally {
            ot.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Ce = "useDebugValue", Ke(), qm();
        },
        useDeferredValue: function(e) {
          return Ce = "useDeferredValue", Ke(), $S(e);
        },
        useTransition: function() {
          return Ce = "useTransition", Ke(), IS();
        },
        useMutableSource: function(e, t, i) {
          return Ce = "useMutableSource", Ke(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return Ce = "useSyncExternalStore", Ke(), Nm(e, t);
        },
        useId: function() {
          return Ce = "useId", Ke(), Wm();
        },
        unstable_isNewReconciler: ie
      }, e3 = {
        readContext: function(e) {
          return Gr(e);
        },
        useCallback: function(e, t) {
          return Ce = "useCallback", Ke(), Im(e, t);
        },
        useContext: function(e) {
          return Ce = "useContext", Ke(), Gr(e);
        },
        useEffect: function(e, t) {
          return Ce = "useEffect", Ke(), ep(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return Ce = "useImperativeHandle", Ke(), Vm(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return Ce = "useInsertionEffect", Ke(), Pm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Ce = "useLayoutEffect", Ke(), $m(e, t);
        },
        useMemo: function(e, t) {
          Ce = "useMemo", Ke();
          var i = ot.current;
          ot.current = Qm;
          try {
            return Ym(e, t);
          } finally {
            ot.current = i;
          }
        },
        useReducer: function(e, t, i) {
          Ce = "useReducer", Ke();
          var o = ot.current;
          ot.current = Qm;
          try {
            return y1(e, t, i);
          } finally {
            ot.current = o;
          }
        },
        useRef: function(e) {
          return Ce = "useRef", Ke(), jm();
        },
        useState: function(e) {
          Ce = "useState", Ke();
          var t = ot.current;
          ot.current = Qm;
          try {
            return E1(e);
          } finally {
            ot.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Ce = "useDebugValue", Ke(), qm();
        },
        useDeferredValue: function(e) {
          return Ce = "useDeferredValue", Ke(), VS(e);
        },
        useTransition: function() {
          return Ce = "useTransition", Ke(), YS();
        },
        useMutableSource: function(e, t, i) {
          return Ce = "useMutableSource", Ke(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return Ce = "useSyncExternalStore", Ke(), Nm(e, t);
        },
        useId: function() {
          return Ce = "useId", Ke(), Wm();
        },
        unstable_isNewReconciler: ie
      }, To = {
        readContext: function(e) {
          return D1(), Gr(e);
        },
        useCallback: function(e, t) {
          return Ce = "useCallback", Jt(), Wn(), b1(e, t);
        },
        useContext: function(e) {
          return Ce = "useContext", Jt(), Wn(), Gr(e);
        },
        useEffect: function(e, t) {
          return Ce = "useEffect", Jt(), Wn(), Hm(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return Ce = "useImperativeHandle", Jt(), Wn(), R1(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return Ce = "useInsertionEffect", Jt(), Wn(), w1(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Ce = "useLayoutEffect", Jt(), Wn(), T1(e, t);
        },
        useMemo: function(e, t) {
          Ce = "useMemo", Jt(), Wn();
          var i = ot.current;
          ot.current = To;
          try {
            return x1(e, t);
          } finally {
            ot.current = i;
          }
        },
        useReducer: function(e, t, i) {
          Ce = "useReducer", Jt(), Wn();
          var o = ot.current;
          ot.current = To;
          try {
            return h1(e, t, i);
          } finally {
            ot.current = o;
          }
        },
        useRef: function(e) {
          return Ce = "useRef", Jt(), Wn(), C1(e);
        },
        useState: function(e) {
          Ce = "useState", Jt(), Wn();
          var t = ot.current;
          ot.current = To;
          try {
            return Um(e);
          } finally {
            ot.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Ce = "useDebugValue", Jt(), Wn(), void 0;
        },
        useDeferredValue: function(e) {
          return Ce = "useDeferredValue", Jt(), Wn(), M1(e);
        },
        useTransition: function() {
          return Ce = "useTransition", Jt(), Wn(), _1();
        },
        useMutableSource: function(e, t, i) {
          return Ce = "useMutableSource", Jt(), Wn(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return Ce = "useSyncExternalStore", Jt(), Wn(), g1(e, t, i);
        },
        useId: function() {
          return Ce = "useId", Jt(), Wn(), k1();
        },
        unstable_isNewReconciler: ie
      }, Pl = {
        readContext: function(e) {
          return D1(), Gr(e);
        },
        useCallback: function(e, t) {
          return Ce = "useCallback", Jt(), Ke(), Im(e, t);
        },
        useContext: function(e) {
          return Ce = "useContext", Jt(), Ke(), Gr(e);
        },
        useEffect: function(e, t) {
          return Ce = "useEffect", Jt(), Ke(), ep(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return Ce = "useImperativeHandle", Jt(), Ke(), Vm(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return Ce = "useInsertionEffect", Jt(), Ke(), Pm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Ce = "useLayoutEffect", Jt(), Ke(), $m(e, t);
        },
        useMemo: function(e, t) {
          Ce = "useMemo", Jt(), Ke();
          var i = ot.current;
          ot.current = Pl;
          try {
            return Ym(e, t);
          } finally {
            ot.current = i;
          }
        },
        useReducer: function(e, t, i) {
          Ce = "useReducer", Jt(), Ke();
          var o = ot.current;
          ot.current = Pl;
          try {
            return m1(e, t, i);
          } finally {
            ot.current = o;
          }
        },
        useRef: function(e) {
          return Ce = "useRef", Jt(), Ke(), jm();
        },
        useState: function(e) {
          Ce = "useState", Jt(), Ke();
          var t = ot.current;
          ot.current = Pl;
          try {
            return S1(e);
          } finally {
            ot.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Ce = "useDebugValue", Jt(), Ke(), qm();
        },
        useDeferredValue: function(e) {
          return Ce = "useDeferredValue", Jt(), Ke(), $S(e);
        },
        useTransition: function() {
          return Ce = "useTransition", Jt(), Ke(), IS();
        },
        useMutableSource: function(e, t, i) {
          return Ce = "useMutableSource", Jt(), Ke(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return Ce = "useSyncExternalStore", Jt(), Ke(), Nm(e, t);
        },
        useId: function() {
          return Ce = "useId", Jt(), Ke(), Wm();
        },
        unstable_isNewReconciler: ie
      }, Qm = {
        readContext: function(e) {
          return D1(), Gr(e);
        },
        useCallback: function(e, t) {
          return Ce = "useCallback", Jt(), Ke(), Im(e, t);
        },
        useContext: function(e) {
          return Ce = "useContext", Jt(), Ke(), Gr(e);
        },
        useEffect: function(e, t) {
          return Ce = "useEffect", Jt(), Ke(), ep(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return Ce = "useImperativeHandle", Jt(), Ke(), Vm(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return Ce = "useInsertionEffect", Jt(), Ke(), Pm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return Ce = "useLayoutEffect", Jt(), Ke(), $m(e, t);
        },
        useMemo: function(e, t) {
          Ce = "useMemo", Jt(), Ke();
          var i = ot.current;
          ot.current = Pl;
          try {
            return Ym(e, t);
          } finally {
            ot.current = i;
          }
        },
        useReducer: function(e, t, i) {
          Ce = "useReducer", Jt(), Ke();
          var o = ot.current;
          ot.current = Pl;
          try {
            return y1(e, t, i);
          } finally {
            ot.current = o;
          }
        },
        useRef: function(e) {
          return Ce = "useRef", Jt(), Ke(), jm();
        },
        useState: function(e) {
          Ce = "useState", Jt(), Ke();
          var t = ot.current;
          ot.current = Pl;
          try {
            return E1(e);
          } finally {
            ot.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return Ce = "useDebugValue", Jt(), Ke(), qm();
        },
        useDeferredValue: function(e) {
          return Ce = "useDeferredValue", Jt(), Ke(), VS(e);
        },
        useTransition: function() {
          return Ce = "useTransition", Jt(), Ke(), YS();
        },
        useMutableSource: function(e, t, i) {
          return Ce = "useMutableSource", Jt(), Ke(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return Ce = "useSyncExternalStore", Jt(), Ke(), Nm(e, t);
        },
        useId: function() {
          return Ce = "useId", Jt(), Ke(), Wm();
        },
        unstable_isNewReconciler: ie
      };
    }
    var os = l.unstable_now, t3 = 0, Gm = -1, tp = -1, Xm = -1, O1 = !1, Km = !1;
    function n3() {
      return O1;
    }
    function Ob() {
      Km = !0;
    }
    function zb() {
      O1 = !1, Km = !1;
    }
    function Lb() {
      O1 = Km, Km = !1;
    }
    function r3() {
      return t3;
    }
    function a3() {
      t3 = os();
    }
    function z1(e) {
      tp = os(), e.actualStartTime < 0 && (e.actualStartTime = os());
    }
    function i3(e) {
      tp = -1;
    }
    function Zm(e, t) {
      if (tp >= 0) {
        var i = os() - tp;
        e.actualDuration += i, t && (e.selfBaseDuration = i), tp = -1;
      }
    }
    function Ro(e) {
      if (Gm >= 0) {
        var t = os() - Gm;
        Gm = -1;
        for (var i = e.return; i !== null; ) {
          switch (i.tag) {
            case R:
              var o = i.stateNode;
              o.effectDuration += t;
              return;
            case P:
              var c = i.stateNode;
              c.effectDuration += t;
              return;
          }
          i = i.return;
        }
      }
    }
    function L1(e) {
      if (Xm >= 0) {
        var t = os() - Xm;
        Xm = -1;
        for (var i = e.return; i !== null; ) {
          switch (i.tag) {
            case R:
              var o = i.stateNode;
              o !== null && (o.passiveEffectDuration += t);
              return;
            case P:
              var c = i.stateNode;
              c !== null && (c.passiveEffectDuration += t);
              return;
          }
          i = i.return;
        }
      }
    }
    function bo() {
      Gm = os();
    }
    function A1() {
      Xm = os();
    }
    function N1(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function $l(e, t) {
      if (e && e.defaultProps) {
        var i = $t({}, t), o = e.defaultProps;
        for (var c in o)
          i[c] === void 0 && (i[c] = o[c]);
        return i;
      }
      return t;
    }
    var U1 = {}, j1, F1, H1, P1, $1, l3, Jm, V1, q1, I1, np;
    {
      j1 = /* @__PURE__ */ new Set(), F1 = /* @__PURE__ */ new Set(), H1 = /* @__PURE__ */ new Set(), P1 = /* @__PURE__ */ new Set(), V1 = /* @__PURE__ */ new Set(), $1 = /* @__PURE__ */ new Set(), q1 = /* @__PURE__ */ new Set(), I1 = /* @__PURE__ */ new Set(), np = /* @__PURE__ */ new Set();
      var o3 = /* @__PURE__ */ new Set();
      Jm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var i = t + "_" + e;
          o3.has(i) || (o3.add(i), p("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, l3 = function(e, t) {
        if (t === void 0) {
          var i = on(e) || "Component";
          $1.has(i) || ($1.add(i), p("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", i));
        }
      }, Object.defineProperty(U1, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(U1);
    }
    function Y1(e, t, i, o) {
      var c = e.memoizedState, v = i(o, c);
      {
        if (e.mode & er) {
          mr(!0);
          try {
            v = i(o, c);
          } finally {
            mr(!1);
          }
        }
        l3(t, v);
      }
      var g = v == null ? c : $t({}, c, v);
      if (e.memoizedState = g, e.lanes === _e) {
        var w = e.updateQueue;
        w.baseState = g;
      }
    }
    var W1 = {
      isMounted: lh,
      enqueueSetState: function(e, t, i) {
        var o = Uu(e), c = fi(), v = fs(o), g = vu(c, v);
        g.payload = t, i != null && (Jm(i, "setState"), g.callback = i);
        var w = rs(o, g, v);
        w !== null && (ca(w, o, v, c), _m(w, o, v)), js(o, v);
      },
      enqueueReplaceState: function(e, t, i) {
        var o = Uu(e), c = fi(), v = fs(o), g = vu(c, v);
        g.tag = RS, g.payload = t, i != null && (Jm(i, "replaceState"), g.callback = i);
        var w = rs(o, g, v);
        w !== null && (ca(w, o, v, c), _m(w, o, v)), js(o, v);
      },
      enqueueForceUpdate: function(e, t) {
        var i = Uu(e), o = fi(), c = fs(i), v = vu(o, c);
        v.tag = bm, t != null && (Jm(t, "forceUpdate"), v.callback = t);
        var g = rs(i, v, c);
        g !== null && (ca(g, i, c, o), _m(g, i, c)), tf(i, c);
      }
    };
    function u3(e, t, i, o, c, v, g) {
      var w = e.stateNode;
      if (typeof w.shouldComponentUpdate == "function") {
        var x = w.shouldComponentUpdate(o, v, g);
        {
          if (e.mode & er) {
            mr(!0);
            try {
              x = w.shouldComponentUpdate(o, v, g);
            } finally {
              mr(!1);
            }
          }
          x === void 0 && p("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", on(t) || "Component");
        }
        return x;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !mt(i, o) || !mt(c, v) : !0;
    }
    function Ab(e, t, i) {
      var o = e.stateNode;
      {
        var c = on(t) || "Component", v = o.render;
        v || (t.prototype && typeof t.prototype.render == "function" ? p("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", c) : p("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", c)), o.getInitialState && !o.getInitialState.isReactClassApproved && !o.state && p("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", c), o.getDefaultProps && !o.getDefaultProps.isReactClassApproved && p("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", c), o.propTypes && p("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", c), o.contextType && p("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", c), t.childContextTypes && !np.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & er) === Ot && (np.add(t), p(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), t.contextTypes && !np.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & er) === Ot && (np.add(t), p(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), o.contextTypes && p("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", c), t.contextType && t.contextTypes && !q1.has(t) && (q1.add(t), p("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", c)), typeof o.componentShouldUpdate == "function" && p("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", c), t.prototype && t.prototype.isPureReactComponent && typeof o.shouldComponentUpdate < "u" && p("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", on(t) || "A pure component"), typeof o.componentDidUnmount == "function" && p("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", c), typeof o.componentDidReceiveProps == "function" && p("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", c), typeof o.componentWillRecieveProps == "function" && p("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", c), typeof o.UNSAFE_componentWillRecieveProps == "function" && p("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", c);
        var g = o.props !== i;
        o.props !== void 0 && g && p("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", c, c), o.defaultProps && p("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", c, c), typeof o.getSnapshotBeforeUpdate == "function" && typeof o.componentDidUpdate != "function" && !H1.has(t) && (H1.add(t), p("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", on(t))), typeof o.getDerivedStateFromProps == "function" && p("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof o.getDerivedStateFromError == "function" && p("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof t.getSnapshotBeforeUpdate == "function" && p("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", c);
        var w = o.state;
        w && (typeof w != "object" || dn(w)) && p("%s.state: must be set to an object or null", c), typeof o.getChildContext == "function" && typeof t.childContextTypes != "object" && p("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", c);
      }
    }
    function s3(e, t) {
      t.updater = W1, e.stateNode = t, $o(t, e), t._reactInternalInstance = U1;
    }
    function c3(e, t, i) {
      var o = !1, c = Yi, v = Yi, g = t.contextType;
      if ("contextType" in t) {
        var w = (
          // Allow null for conditional declaration
          g === null || g !== void 0 && g.$$typeof === j && g._context === void 0
        );
        if (!w && !I1.has(t)) {
          I1.add(t);
          var x = "";
          g === void 0 ? x = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof g != "object" ? x = " However, it is set to a " + typeof g + "." : g.$$typeof === jn ? x = " Did you accidentally pass the Context.Provider instead?" : g._context !== void 0 ? x = " Did you accidentally pass the Context.Consumer instead?" : x = " However, it is set to an object with keys {" + Object.keys(g).join(", ") + "}.", p("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", on(t) || "Component", x);
        }
      }
      if (typeof g == "object" && g !== null)
        v = Gr(g);
      else {
        c = Yf(e, t, !0);
        var O = t.contextTypes;
        o = O != null, v = o ? Wf(e, c) : Yi;
      }
      var L = new t(i, v);
      if (e.mode & er) {
        mr(!0);
        try {
          L = new t(i, v);
        } finally {
          mr(!1);
        }
      }
      var B = e.memoizedState = L.state !== null && L.state !== void 0 ? L.state : null;
      s3(e, L);
      {
        if (typeof t.getDerivedStateFromProps == "function" && B === null) {
          var I = on(t) || "Component";
          F1.has(I) || (F1.add(I), p("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", I, L.state === null ? "null" : "undefined", I));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof L.getSnapshotBeforeUpdate == "function") {
          var le = null, ce = null, ye = null;
          if (typeof L.componentWillMount == "function" && L.componentWillMount.__suppressDeprecationWarning !== !0 ? le = "componentWillMount" : typeof L.UNSAFE_componentWillMount == "function" && (le = "UNSAFE_componentWillMount"), typeof L.componentWillReceiveProps == "function" && L.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? ce = "componentWillReceiveProps" : typeof L.UNSAFE_componentWillReceiveProps == "function" && (ce = "UNSAFE_componentWillReceiveProps"), typeof L.componentWillUpdate == "function" && L.componentWillUpdate.__suppressDeprecationWarning !== !0 ? ye = "componentWillUpdate" : typeof L.UNSAFE_componentWillUpdate == "function" && (ye = "UNSAFE_componentWillUpdate"), le !== null || ce !== null || ye !== null) {
            var tt = on(t) || "Component", jt = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            P1.has(tt) || (P1.add(tt), p(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, tt, jt, le !== null ? `
  ` + le : "", ce !== null ? `
  ` + ce : "", ye !== null ? `
  ` + ye : ""));
          }
        }
      }
      return o && J2(e, c, v), L;
    }
    function Nb(e, t) {
      var i = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), i !== t.state && (p("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Vt(e) || "Component"), W1.enqueueReplaceState(t, t.state, null));
    }
    function f3(e, t, i, o) {
      var c = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, o), t.state !== c) {
        {
          var v = Vt(e) || "Component";
          j1.has(v) || (j1.add(v), p("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", v));
        }
        W1.enqueueReplaceState(t, t.state, null);
      }
    }
    function B1(e, t, i, o) {
      Ab(e, t, i);
      var c = e.stateNode;
      c.props = i, c.state = e.memoizedState, c.refs = {}, n1(e);
      var v = t.contextType;
      if (typeof v == "object" && v !== null)
        c.context = Gr(v);
      else {
        var g = Yf(e, t, !0);
        c.context = Wf(e, g);
      }
      {
        if (c.state === i) {
          var w = on(t) || "Component";
          V1.has(w) || (V1.add(w), p("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", w));
        }
        e.mode & er && Fl.recordLegacyContextWarning(e, c), Fl.recordUnsafeLifecycleWarnings(e, c);
      }
      c.state = e.memoizedState;
      var x = t.getDerivedStateFromProps;
      if (typeof x == "function" && (Y1(e, t, x, i), c.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof c.getSnapshotBeforeUpdate != "function" && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (Nb(e, c), km(e, i, c, o), c.state = e.memoizedState), typeof c.componentDidMount == "function") {
        var O = kn;
        O |= Ml, (e.mode & $n) !== Ot && (O |= no), e.flags |= O;
      }
    }
    function Ub(e, t, i, o) {
      var c = e.stateNode, v = e.memoizedProps;
      c.props = v;
      var g = c.context, w = t.contextType, x = Yi;
      if (typeof w == "object" && w !== null)
        x = Gr(w);
      else {
        var O = Yf(e, t, !0);
        x = Wf(e, O);
      }
      var L = t.getDerivedStateFromProps, B = typeof L == "function" || typeof c.getSnapshotBeforeUpdate == "function";
      !B && (typeof c.UNSAFE_componentWillReceiveProps == "function" || typeof c.componentWillReceiveProps == "function") && (v !== i || g !== x) && f3(e, c, i, x), xS();
      var I = e.memoizedState, le = c.state = I;
      if (km(e, i, c, o), le = e.memoizedState, v === i && I === le && !cm() && !Dm()) {
        if (typeof c.componentDidMount == "function") {
          var ce = kn;
          ce |= Ml, (e.mode & $n) !== Ot && (ce |= no), e.flags |= ce;
        }
        return !1;
      }
      typeof L == "function" && (Y1(e, t, L, i), le = e.memoizedState);
      var ye = Dm() || u3(e, t, v, i, I, le, x);
      if (ye) {
        if (!B && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function") {
          var tt = kn;
          tt |= Ml, (e.mode & $n) !== Ot && (tt |= no), e.flags |= tt;
        }
      } else {
        if (typeof c.componentDidMount == "function") {
          var jt = kn;
          jt |= Ml, (e.mode & $n) !== Ot && (jt |= no), e.flags |= jt;
        }
        e.memoizedProps = i, e.memoizedState = le;
      }
      return c.props = i, c.state = le, c.context = x, ye;
    }
    function jb(e, t, i, o, c) {
      var v = t.stateNode;
      bS(e, t);
      var g = t.memoizedProps, w = t.type === t.elementType ? g : $l(t.type, g);
      v.props = w;
      var x = t.pendingProps, O = v.context, L = i.contextType, B = Yi;
      if (typeof L == "object" && L !== null)
        B = Gr(L);
      else {
        var I = Yf(t, i, !0);
        B = Wf(t, I);
      }
      var le = i.getDerivedStateFromProps, ce = typeof le == "function" || typeof v.getSnapshotBeforeUpdate == "function";
      !ce && (typeof v.UNSAFE_componentWillReceiveProps == "function" || typeof v.componentWillReceiveProps == "function") && (g !== x || O !== B) && f3(t, v, o, B), xS();
      var ye = t.memoizedState, tt = v.state = ye;
      if (km(t, o, v, c), tt = t.memoizedState, g === x && ye === tt && !cm() && !Dm() && !Se)
        return typeof v.componentDidUpdate == "function" && (g !== e.memoizedProps || ye !== e.memoizedState) && (t.flags |= kn), typeof v.getSnapshotBeforeUpdate == "function" && (g !== e.memoizedProps || ye !== e.memoizedState) && (t.flags |= $r), !1;
      typeof le == "function" && (Y1(t, i, le, o), tt = t.memoizedState);
      var jt = Dm() || u3(t, i, w, o, ye, tt, B) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Se;
      return jt ? (!ce && (typeof v.UNSAFE_componentWillUpdate == "function" || typeof v.componentWillUpdate == "function") && (typeof v.componentWillUpdate == "function" && v.componentWillUpdate(o, tt, B), typeof v.UNSAFE_componentWillUpdate == "function" && v.UNSAFE_componentWillUpdate(o, tt, B)), typeof v.componentDidUpdate == "function" && (t.flags |= kn), typeof v.getSnapshotBeforeUpdate == "function" && (t.flags |= $r)) : (typeof v.componentDidUpdate == "function" && (g !== e.memoizedProps || ye !== e.memoizedState) && (t.flags |= kn), typeof v.getSnapshotBeforeUpdate == "function" && (g !== e.memoizedProps || ye !== e.memoizedState) && (t.flags |= $r), t.memoizedProps = o, t.memoizedState = tt), v.props = o, v.state = tt, v.context = B, jt;
    }
    function wc(e, t) {
      return {
        value: e,
        source: t,
        stack: Dr(t),
        digest: null
      };
    }
    function Q1(e, t, i) {
      return {
        value: e,
        source: null,
        stack: i ?? null,
        digest: t ?? null
      };
    }
    function Fb(e, t) {
      return !0;
    }
    function G1(e, t) {
      try {
        var i = Fb(e, t);
        if (i === !1)
          return;
        var o = t.value, c = t.source, v = t.stack, g = v !== null ? v : "";
        if (o != null && o._suppressLogging) {
          if (e.tag === T)
            return;
          console.error(o);
        }
        var w = c ? Vt(c) : null, x = w ? "The above error occurred in the <" + w + "> component:" : "The above error occurred in one of your React components:", O;
        if (e.tag === R)
          O = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var L = Vt(e) || "Anonymous";
          O = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + L + ".");
        }
        var B = x + `
` + g + `

` + ("" + O);
        console.error(B);
      } catch (I) {
        setTimeout(function() {
          throw I;
        });
      }
    }
    var Hb = typeof WeakMap == "function" ? WeakMap : Map;
    function d3(e, t, i) {
      var o = vu(rr, i);
      o.tag = e1, o.payload = {
        element: null
      };
      var c = t.value;
      return o.callback = function() {
        OM(c), G1(e, t);
      }, o;
    }
    function X1(e, t, i) {
      var o = vu(rr, i);
      o.tag = e1;
      var c = e.type.getDerivedStateFromError;
      if (typeof c == "function") {
        var v = t.value;
        o.payload = function() {
          return c(v);
        }, o.callback = function() {
          TE(e), G1(e, t);
        };
      }
      var g = e.stateNode;
      return g !== null && typeof g.componentDidCatch == "function" && (o.callback = function() {
        TE(e), G1(e, t), typeof c != "function" && kM(this);
        var x = t.value, O = t.stack;
        this.componentDidCatch(x, {
          componentStack: O !== null ? O : ""
        }), typeof c != "function" && (Ia(e.lanes, It) || p("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Vt(e) || "Unknown"));
      }), o;
    }
    function v3(e, t, i) {
      var o = e.pingCache, c;
      if (o === null ? (o = e.pingCache = new Hb(), c = /* @__PURE__ */ new Set(), o.set(t, c)) : (c = o.get(t), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(t, c))), !c.has(i)) {
        c.add(i);
        var v = zM.bind(null, e, t, i);
        Va && Sp(e, i), t.then(v, v);
      }
    }
    function Pb(e, t, i, o) {
      var c = e.updateQueue;
      if (c === null) {
        var v = /* @__PURE__ */ new Set();
        v.add(i), e.updateQueue = v;
      } else
        c.add(i);
    }
    function $b(e, t) {
      var i = e.tag;
      if ((e.mode & pn) === Ot && (i === C || i === Y || i === re)) {
        var o = e.alternate;
        o ? (e.updateQueue = o.updateQueue, e.memoizedState = o.memoizedState, e.lanes = o.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function p3(e) {
      var t = e;
      do {
        if (t.tag === $ && Cb(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function h3(e, t, i, o, c) {
      if ((e.mode & pn) === Ot) {
        if (e === t)
          e.flags |= Yr;
        else {
          if (e.flags |= Mt, i.flags |= Bc, i.flags &= -52805, i.tag === T) {
            var v = i.alternate;
            if (v === null)
              i.tag = he;
            else {
              var g = vu(rr, It);
              g.tag = bm, rs(i, g, It);
            }
          }
          i.lanes = un(i.lanes, It);
        }
        return e;
      }
      return e.flags |= Yr, e.lanes = c, e;
    }
    function Vb(e, t, i, o, c) {
      if (i.flags |= Os, Va && Sp(e, c), o !== null && typeof o == "object" && typeof o.then == "function") {
        var v = o;
        $b(i), _a() && i.mode & pn && lS();
        var g = p3(t);
        if (g !== null) {
          g.flags &= ~ma, h3(g, t, i, e, c), g.mode & pn && v3(e, v, c), Pb(g, e, v);
          return;
        } else {
          if (!ph(c)) {
            v3(e, v, c), kg();
            return;
          }
          var w = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          o = w;
        }
      } else if (_a() && i.mode & pn) {
        lS();
        var x = p3(t);
        if (x !== null) {
          (x.flags & Yr) === Dt && (x.flags |= ma), h3(x, t, i, e, c), V0(wc(o, i));
          return;
        }
      }
      o = wc(o, i), CM(o);
      var O = t;
      do {
        switch (O.tag) {
          case R: {
            var L = o;
            O.flags |= Yr;
            var B = Ws(c);
            O.lanes = un(O.lanes, B);
            var I = d3(O, L, B);
            r1(O, I);
            return;
          }
          case T:
            var le = o, ce = O.type, ye = O.stateNode;
            if ((O.flags & Mt) === Dt && (typeof ce.getDerivedStateFromError == "function" || ye !== null && typeof ye.componentDidCatch == "function" && !pE(ye))) {
              O.flags |= Yr;
              var tt = Ws(c);
              O.lanes = un(O.lanes, tt);
              var jt = X1(O, le, tt);
              r1(O, jt);
              return;
            }
            break;
        }
        O = O.return;
      } while (O !== null);
    }
    function qb() {
      return null;
    }
    var rp = s.ReactCurrentOwner, Vl = !1, K1, ap, Z1, J1, eg, Tc, tg, ey, ip;
    K1 = {}, ap = {}, Z1 = {}, J1 = {}, eg = {}, Tc = !1, tg = {}, ey = {}, ip = {};
    function si(e, t, i, o) {
      e === null ? t.child = gS(t, null, i, o) : t.child = Xf(t, e.child, i, o);
    }
    function Ib(e, t, i, o) {
      t.child = Xf(t, e.child, null, o), t.child = Xf(t, null, i, o);
    }
    function m3(e, t, i, o, c) {
      if (t.type !== t.elementType) {
        var v = i.propTypes;
        v && Ul(
          v,
          o,
          // Resolved props
          "prop",
          on(i)
        );
      }
      var g = i.render, w = t.ref, x, O;
      Zf(t, c), ii(t);
      {
        if (rp.current = t, vr(!0), x = ad(e, t, g, o, w, c), O = id(), t.mode & er) {
          mr(!0);
          try {
            x = ad(e, t, g, o, w, c), O = id();
          } finally {
            mr(!1);
          }
        }
        vr(!1);
      }
      return li(), e !== null && !Vl ? (zS(e, t, c), pu(e, t, c)) : (_a() && O && U0(t), t.flags |= Pi, si(e, t, x, c), t.child);
    }
    function y3(e, t, i, o, c) {
      if (e === null) {
        var v = i.type;
        if (GM(v) && i.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        i.defaultProps === void 0) {
          var g = v;
          return g = vd(v), t.tag = re, t.type = g, ag(t, v), g3(e, t, g, o, c);
        }
        {
          var w = v.propTypes;
          if (w && Ul(
            w,
            o,
            // Resolved props
            "prop",
            on(v)
          ), i.defaultProps !== void 0) {
            var x = on(v) || "Unknown";
            ip[x] || (p("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", x), ip[x] = !0);
          }
        }
        var O = Pg(i.type, null, o, t, t.mode, c);
        return O.ref = t.ref, O.return = t, t.child = O, O;
      }
      {
        var L = i.type, B = L.propTypes;
        B && Ul(
          B,
          o,
          // Resolved props
          "prop",
          on(L)
        );
      }
      var I = e.child, le = cg(e, c);
      if (!le) {
        var ce = I.memoizedProps, ye = i.compare;
        if (ye = ye !== null ? ye : mt, ye(ce, o) && e.ref === t.ref)
          return pu(e, t, c);
      }
      t.flags |= Pi;
      var tt = _c(I, o);
      return tt.ref = t.ref, tt.return = t, t.child = tt, tt;
    }
    function g3(e, t, i, o, c) {
      if (t.type !== t.elementType) {
        var v = t.elementType;
        if (v.$$typeof === ct) {
          var g = v, w = g._payload, x = g._init;
          try {
            v = x(w);
          } catch {
            v = null;
          }
          var O = v && v.propTypes;
          O && Ul(
            O,
            o,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            on(v)
          );
        }
      }
      if (e !== null) {
        var L = e.memoizedProps;
        if (mt(L, o) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (Vl = !1, t.pendingProps = o = L, cg(e, c))
            (e.flags & Bc) !== Dt && (Vl = !0);
          else return t.lanes = e.lanes, pu(e, t, c);
      }
      return ng(e, t, i, o, c);
    }
    function S3(e, t, i) {
      var o = t.pendingProps, c = o.children, v = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden" || Te)
        if ((t.mode & pn) === Ot) {
          var g = {
            baseLanes: _e,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = g, vy(t, i);
        } else if (Ia(i, qa)) {
          var B = {
            baseLanes: _e,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = B;
          var I = v !== null ? v.baseLanes : i;
          vy(t, I);
        } else {
          var w = null, x;
          if (v !== null) {
            var O = v.baseLanes;
            x = un(O, i);
          } else
            x = i;
          t.lanes = t.childLanes = qa;
          var L = {
            baseLanes: x,
            cachePool: w,
            transitions: null
          };
          return t.memoizedState = L, t.updateQueue = null, vy(t, x), null;
        }
      else {
        var le;
        v !== null ? (le = un(v.baseLanes, i), t.memoizedState = null) : le = i, vy(t, le);
      }
      return si(e, t, c, i), t.child;
    }
    function Yb(e, t, i) {
      var o = t.pendingProps;
      return si(e, t, o, i), t.child;
    }
    function Wb(e, t, i) {
      var o = t.pendingProps.children;
      return si(e, t, o, i), t.child;
    }
    function Bb(e, t, i) {
      {
        t.flags |= kn;
        {
          var o = t.stateNode;
          o.effectDuration = 0, o.passiveEffectDuration = 0;
        }
      }
      var c = t.pendingProps, v = c.children;
      return si(e, t, v, i), t.child;
    }
    function E3(e, t) {
      var i = t.ref;
      (e === null && i !== null || e !== null && e.ref !== i) && (t.flags |= wr, t.flags |= Fu);
    }
    function ng(e, t, i, o, c) {
      if (t.type !== t.elementType) {
        var v = i.propTypes;
        v && Ul(
          v,
          o,
          // Resolved props
          "prop",
          on(i)
        );
      }
      var g;
      {
        var w = Yf(t, i, !0);
        g = Wf(t, w);
      }
      var x, O;
      Zf(t, c), ii(t);
      {
        if (rp.current = t, vr(!0), x = ad(e, t, i, o, g, c), O = id(), t.mode & er) {
          mr(!0);
          try {
            x = ad(e, t, i, o, g, c), O = id();
          } finally {
            mr(!1);
          }
        }
        vr(!1);
      }
      return li(), e !== null && !Vl ? (zS(e, t, c), pu(e, t, c)) : (_a() && O && U0(t), t.flags |= Pi, si(e, t, x, c), t.child);
    }
    function C3(e, t, i, o, c) {
      {
        switch (c_(t)) {
          case !1: {
            var v = t.stateNode, g = t.type, w = new g(t.memoizedProps, v.context), x = w.state;
            v.updater.enqueueSetState(v, x, null);
            break;
          }
          case !0: {
            t.flags |= Mt, t.flags |= Yr;
            var O = new Error("Simulated error coming from DevTools"), L = Ws(c);
            t.lanes = un(t.lanes, L);
            var B = X1(t, wc(O, t), L);
            r1(t, B);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var I = i.propTypes;
          I && Ul(
            I,
            o,
            // Resolved props
            "prop",
            on(i)
          );
        }
      }
      var le;
      Eo(i) ? (le = !0, dm(t)) : le = !1, Zf(t, c);
      var ce = t.stateNode, ye;
      ce === null ? (ny(e, t), c3(t, i, o), B1(t, i, o, c), ye = !0) : e === null ? ye = Ub(t, i, o, c) : ye = jb(e, t, i, o, c);
      var tt = rg(e, t, i, ye, le, c);
      {
        var jt = t.stateNode;
        ye && jt.props !== o && (Tc || p("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Vt(t) || "a component"), Tc = !0);
      }
      return tt;
    }
    function rg(e, t, i, o, c, v) {
      E3(e, t);
      var g = (t.flags & Mt) !== Dt;
      if (!o && !g)
        return c && nS(t, i, !1), pu(e, t, v);
      var w = t.stateNode;
      rp.current = t;
      var x;
      if (g && typeof i.getDerivedStateFromError != "function")
        x = null, i3();
      else {
        ii(t);
        {
          if (vr(!0), x = w.render(), t.mode & er) {
            mr(!0);
            try {
              w.render();
            } finally {
              mr(!1);
            }
          }
          vr(!1);
        }
        li();
      }
      return t.flags |= Pi, e !== null && g ? Ib(e, t, x, v) : si(e, t, x, v), t.memoizedState = w.state, c && nS(t, i, !0), t.child;
    }
    function w3(e) {
      var t = e.stateNode;
      t.pendingContext ? eS(e, t.pendingContext, t.pendingContext !== t.context) : t.context && eS(e, t.context, !1), a1(e, t.containerInfo);
    }
    function Qb(e, t, i) {
      if (w3(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var o = t.pendingProps, c = t.memoizedState, v = c.element;
      bS(e, t), km(t, o, null, i);
      var g = t.memoizedState;
      t.stateNode;
      var w = g.element;
      if (c.isDehydrated) {
        var x = {
          element: w,
          isDehydrated: !1,
          cache: g.cache,
          pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
          transitions: g.transitions
        }, O = t.updateQueue;
        if (O.baseState = x, t.memoizedState = x, t.flags & ma) {
          var L = wc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return T3(e, t, w, i, L);
        } else if (w !== v) {
          var B = wc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return T3(e, t, w, i, B);
        } else {
          KR(t);
          var I = gS(t, null, w, i);
          t.child = I;
          for (var le = I; le; )
            le.flags = le.flags & ~hr | Ha, le = le.sibling;
        }
      } else {
        if (Gf(), w === v)
          return pu(e, t, i);
        si(e, t, w, i);
      }
      return t.child;
    }
    function T3(e, t, i, o, c) {
      return Gf(), V0(c), t.flags |= ma, si(e, t, i, o), t.child;
    }
    function Gb(e, t, i) {
      kS(t), e === null && $0(t);
      var o = t.type, c = t.pendingProps, v = e !== null ? e.memoizedProps : null, g = c.children, w = w0(o, c);
      return w ? g = null : v !== null && w0(o, v) && (t.flags |= wi), E3(e, t), si(e, t, g, i), t.child;
    }
    function Xb(e, t) {
      return e === null && $0(t), null;
    }
    function Kb(e, t, i, o) {
      ny(e, t);
      var c = t.pendingProps, v = i, g = v._payload, w = v._init, x = w(g);
      t.type = x;
      var O = t.tag = XM(x), L = $l(x, c), B;
      switch (O) {
        case C:
          return ag(t, x), t.type = x = vd(x), B = ng(null, t, x, L, o), B;
        case T:
          return t.type = x = Ag(x), B = C3(null, t, x, L, o), B;
        case Y:
          return t.type = x = Ng(x), B = m3(null, t, x, L, o), B;
        case Q: {
          if (t.type !== t.elementType) {
            var I = x.propTypes;
            I && Ul(
              I,
              L,
              // Resolved for outer only
              "prop",
              on(x)
            );
          }
          return B = y3(
            null,
            t,
            x,
            $l(x.type, L),
            // The inner type can have defaults too
            o
          ), B;
        }
      }
      var le = "";
      throw x !== null && typeof x == "object" && x.$$typeof === ct && (le = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + x + ". " + ("Lazy element type must resolve to a class or function." + le));
    }
    function Zb(e, t, i, o, c) {
      ny(e, t), t.tag = T;
      var v;
      return Eo(i) ? (v = !0, dm(t)) : v = !1, Zf(t, c), c3(t, i, o), B1(t, i, o, c), rg(null, t, i, !0, v, c);
    }
    function Jb(e, t, i, o) {
      ny(e, t);
      var c = t.pendingProps, v;
      {
        var g = Yf(t, i, !1);
        v = Wf(t, g);
      }
      Zf(t, o);
      var w, x;
      ii(t);
      {
        if (i.prototype && typeof i.prototype.render == "function") {
          var O = on(i) || "Unknown";
          K1[O] || (p("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", O, O), K1[O] = !0);
        }
        t.mode & er && Fl.recordLegacyContextWarning(t, null), vr(!0), rp.current = t, w = ad(null, t, i, c, v, o), x = id(), vr(!1);
      }
      if (li(), t.flags |= Pi, typeof w == "object" && w !== null && typeof w.render == "function" && w.$$typeof === void 0) {
        var L = on(i) || "Unknown";
        ap[L] || (p("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", L, L, L), ap[L] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof w == "object" && w !== null && typeof w.render == "function" && w.$$typeof === void 0
      ) {
        {
          var B = on(i) || "Unknown";
          ap[B] || (p("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", B, B, B), ap[B] = !0);
        }
        t.tag = T, t.memoizedState = null, t.updateQueue = null;
        var I = !1;
        return Eo(i) ? (I = !0, dm(t)) : I = !1, t.memoizedState = w.state !== null && w.state !== void 0 ? w.state : null, n1(t), s3(t, w), B1(t, i, c, o), rg(null, t, i, !0, I, o);
      } else {
        if (t.tag = C, t.mode & er) {
          mr(!0);
          try {
            w = ad(null, t, i, c, v, o), x = id();
          } finally {
            mr(!1);
          }
        }
        return _a() && x && U0(t), si(null, t, w, o), ag(t, i), t.child;
      }
    }
    function ag(e, t) {
      {
        if (t && t.childContextTypes && p("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var i = "", o = Er();
          o && (i += `

Check the render method of \`` + o + "`.");
          var c = o || "", v = e._debugSource;
          v && (c = v.fileName + ":" + v.lineNumber), eg[c] || (eg[c] = !0, p("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", i));
        }
        if (t.defaultProps !== void 0) {
          var g = on(t) || "Unknown";
          ip[g] || (p("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", g), ip[g] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var w = on(t) || "Unknown";
          J1[w] || (p("%s: Function components do not support getDerivedStateFromProps.", w), J1[w] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var x = on(t) || "Unknown";
          Z1[x] || (p("%s: Function components do not support contextType.", x), Z1[x] = !0);
        }
      }
    }
    var ig = {
      dehydrated: null,
      treeContext: null,
      retryLane: Un
    };
    function lg(e) {
      return {
        baseLanes: e,
        cachePool: qb(),
        transitions: null
      };
    }
    function ex(e, t) {
      var i = null;
      return {
        baseLanes: un(e.baseLanes, t),
        cachePool: i,
        transitions: e.transitions
      };
    }
    function tx(e, t, i, o) {
      if (t !== null) {
        var c = t.memoizedState;
        if (c === null)
          return !1;
      }
      return o1(e, Qv);
    }
    function nx(e, t) {
      return Bs(e.childLanes, t);
    }
    function R3(e, t, i) {
      var o = t.pendingProps;
      f_(t) && (t.flags |= Mt);
      var c = Hl.current, v = !1, g = (t.flags & Mt) !== Dt;
      if (g || tx(c, e) ? (v = !0, t.flags &= ~Mt) : (e === null || e.memoizedState !== null) && (c = Eb(c, OS)), c = ed(c), is(t, c), e === null) {
        $0(t);
        var w = t.memoizedState;
        if (w !== null) {
          var x = w.dehydrated;
          if (x !== null)
            return ox(t, x);
        }
        var O = o.children, L = o.fallback;
        if (v) {
          var B = rx(t, O, L, i), I = t.child;
          return I.memoizedState = lg(i), t.memoizedState = ig, B;
        } else
          return og(t, O);
      } else {
        var le = e.memoizedState;
        if (le !== null) {
          var ce = le.dehydrated;
          if (ce !== null)
            return ux(e, t, g, o, ce, le, i);
        }
        if (v) {
          var ye = o.fallback, tt = o.children, jt = ix(e, t, tt, ye, i), bt = t.child, zn = e.child.memoizedState;
          return bt.memoizedState = zn === null ? lg(i) : ex(zn, i), bt.childLanes = nx(e, i), t.memoizedState = ig, jt;
        } else {
          var Tn = o.children, ee = ax(e, t, Tn, i);
          return t.memoizedState = null, ee;
        }
      }
    }
    function og(e, t, i) {
      var o = e.mode, c = {
        mode: "visible",
        children: t
      }, v = ug(c, o);
      return v.return = e, e.child = v, v;
    }
    function rx(e, t, i, o) {
      var c = e.mode, v = e.child, g = {
        mode: "hidden",
        children: t
      }, w, x;
      return (c & pn) === Ot && v !== null ? (w = v, w.childLanes = _e, w.pendingProps = g, e.mode & Pn && (w.actualDuration = 0, w.actualStartTime = -1, w.selfBaseDuration = 0, w.treeBaseDuration = 0), x = vs(i, c, o, null)) : (w = ug(g, c), x = vs(i, c, o, null)), w.return = e, x.return = e, w.sibling = x, e.child = w, x;
    }
    function ug(e, t, i) {
      return bE(e, t, _e, null);
    }
    function b3(e, t) {
      return _c(e, t);
    }
    function ax(e, t, i, o) {
      var c = e.child, v = c.sibling, g = b3(c, {
        mode: "visible",
        children: i
      });
      if ((t.mode & pn) === Ot && (g.lanes = o), g.return = t, g.sibling = null, v !== null) {
        var w = t.deletions;
        w === null ? (t.deletions = [v], t.flags |= Ci) : w.push(v);
      }
      return t.child = g, g;
    }
    function ix(e, t, i, o, c) {
      var v = t.mode, g = e.child, w = g.sibling, x = {
        mode: "hidden",
        children: i
      }, O;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (v & pn) === Ot && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== g
      ) {
        var L = t.child;
        O = L, O.childLanes = _e, O.pendingProps = x, t.mode & Pn && (O.actualDuration = 0, O.actualStartTime = -1, O.selfBaseDuration = g.selfBaseDuration, O.treeBaseDuration = g.treeBaseDuration), t.deletions = null;
      } else
        O = b3(g, x), O.subtreeFlags = g.subtreeFlags & Lr;
      var B;
      return w !== null ? B = _c(w, o) : (B = vs(o, v, c, null), B.flags |= hr), B.return = t, O.return = t, O.sibling = B, t.child = O, B;
    }
    function ty(e, t, i, o) {
      o !== null && V0(o), Xf(t, e.child, null, i);
      var c = t.pendingProps, v = c.children, g = og(t, v);
      return g.flags |= hr, t.memoizedState = null, g;
    }
    function lx(e, t, i, o, c) {
      var v = t.mode, g = {
        mode: "visible",
        children: i
      }, w = ug(g, v), x = vs(o, v, c, null);
      return x.flags |= hr, w.return = t, x.return = t, w.sibling = x, t.child = w, (t.mode & pn) !== Ot && Xf(t, e.child, null, c), x;
    }
    function ox(e, t, i) {
      return (e.mode & pn) === Ot ? (p("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = It) : x0(t) ? e.lanes = ya : e.lanes = qa, null;
    }
    function ux(e, t, i, o, c, v, g) {
      if (i)
        if (t.flags & ma) {
          t.flags &= ~ma;
          var ee = Q1(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return ty(e, t, g, ee);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= Mt, null;
          var ge = o.children, te = o.fallback, Ae = lx(e, t, ge, te, g), ut = t.child;
          return ut.memoizedState = lg(g), t.memoizedState = ig, Ae;
        }
      else {
        if (GR(), (t.mode & pn) === Ot)
          return ty(
            e,
            t,
            g,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (x0(c)) {
          var w, x, O;
          {
            var L = dR(c);
            w = L.digest, x = L.message, O = L.stack;
          }
          var B;
          x ? B = new Error(x) : B = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var I = Q1(B, w, O);
          return ty(e, t, g, I);
        }
        var le = Ia(g, e.childLanes);
        if (Vl || le) {
          var ce = dy();
          if (ce !== null) {
            var ye = uv(ce, g);
            if (ye !== Un && ye !== v.retryLane) {
              v.retryLane = ye;
              var tt = rr;
              Oi(e, ye), ca(ce, e, ye, tt);
            }
          }
          kg();
          var jt = Q1(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return ty(e, t, g, jt);
        } else if (Q2(c)) {
          t.flags |= Mt, t.child = e.child;
          var bt = LM.bind(null, e);
          return vR(c, bt), null;
        } else {
          ZR(t, c, v.treeContext);
          var zn = o.children, Tn = og(t, zn);
          return Tn.flags |= Ha, Tn;
        }
      }
    }
    function x3(e, t, i) {
      e.lanes = un(e.lanes, t);
      var o = e.alternate;
      o !== null && (o.lanes = un(o.lanes, t)), Z0(e.return, t, i);
    }
    function sx(e, t, i) {
      for (var o = t; o !== null; ) {
        if (o.tag === $) {
          var c = o.memoizedState;
          c !== null && x3(o, i, e);
        } else if (o.tag === se)
          x3(o, i, e);
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
    function cx(e) {
      for (var t = e, i = null; t !== null; ) {
        var o = t.alternate;
        o !== null && Lm(o) === null && (i = t), t = t.sibling;
      }
      return i;
    }
    function fx(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !tg[e])
        if (tg[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              p('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              p('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              p('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          p('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function dx(e, t) {
      e !== void 0 && !ey[e] && (e !== "collapsed" && e !== "hidden" ? (ey[e] = !0, p('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (ey[e] = !0, p('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function M3(e, t) {
      {
        var i = dn(e), o = !i && typeof Rt(e) == "function";
        if (i || o) {
          var c = i ? "array" : "iterable";
          return p("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", c, t, c), !1;
        }
      }
      return !0;
    }
    function vx(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (dn(e)) {
          for (var i = 0; i < e.length; i++)
            if (!M3(e[i], i))
              return;
        } else {
          var o = Rt(e);
          if (typeof o == "function") {
            var c = o.call(e);
            if (c)
              for (var v = c.next(), g = 0; !v.done; v = c.next()) {
                if (!M3(v.value, g))
                  return;
                g++;
              }
          } else
            p('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function sg(e, t, i, o, c) {
      var v = e.memoizedState;
      v === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: o,
        tail: i,
        tailMode: c
      } : (v.isBackwards = t, v.rendering = null, v.renderingStartTime = 0, v.last = o, v.tail = i, v.tailMode = c);
    }
    function _3(e, t, i) {
      var o = t.pendingProps, c = o.revealOrder, v = o.tail, g = o.children;
      fx(c), dx(v, c), vx(g, c), si(e, t, g, i);
      var w = Hl.current, x = o1(w, Qv);
      if (x)
        w = u1(w, Qv), t.flags |= Mt;
      else {
        var O = e !== null && (e.flags & Mt) !== Dt;
        O && sx(t, t.child, i), w = ed(w);
      }
      if (is(t, w), (t.mode & pn) === Ot)
        t.memoizedState = null;
      else
        switch (c) {
          case "forwards": {
            var L = cx(t.child), B;
            L === null ? (B = t.child, t.child = null) : (B = L.sibling, L.sibling = null), sg(
              t,
              !1,
              // isBackwards
              B,
              L,
              v
            );
            break;
          }
          case "backwards": {
            var I = null, le = t.child;
            for (t.child = null; le !== null; ) {
              var ce = le.alternate;
              if (ce !== null && Lm(ce) === null) {
                t.child = le;
                break;
              }
              var ye = le.sibling;
              le.sibling = I, I = le, le = ye;
            }
            sg(
              t,
              !0,
              // isBackwards
              I,
              null,
              // last
              v
            );
            break;
          }
          case "together": {
            sg(
              t,
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
            t.memoizedState = null;
        }
      return t.child;
    }
    function px(e, t, i) {
      a1(t, t.stateNode.containerInfo);
      var o = t.pendingProps;
      return e === null ? t.child = Xf(t, null, o, i) : si(e, t, o, i), t.child;
    }
    var k3 = !1;
    function hx(e, t, i) {
      var o = t.type, c = o._context, v = t.pendingProps, g = t.memoizedProps, w = v.value;
      {
        "value" in v || k3 || (k3 = !0, p("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var x = t.type.propTypes;
        x && Ul(x, v, "prop", "Context.Provider");
      }
      if (CS(t, c, w), g !== null) {
        var O = g.value;
        if (ze(O, w)) {
          if (g.children === v.children && !cm())
            return pu(e, t, i);
        } else
          fb(t, c, i);
      }
      var L = v.children;
      return si(e, t, L, i), t.child;
    }
    var D3 = !1;
    function mx(e, t, i) {
      var o = t.type;
      o._context === void 0 ? o !== o.Consumer && (D3 || (D3 = !0, p("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : o = o._context;
      var c = t.pendingProps, v = c.children;
      typeof v != "function" && p("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Zf(t, i);
      var g = Gr(o);
      ii(t);
      var w;
      return rp.current = t, vr(!0), w = v(g), vr(!1), li(), t.flags |= Pi, si(e, t, w, i), t.child;
    }
    function lp() {
      Vl = !0;
    }
    function ny(e, t) {
      (t.mode & pn) === Ot && e !== null && (e.alternate = null, t.alternate = null, t.flags |= hr);
    }
    function pu(e, t, i) {
      return e !== null && (t.dependencies = e.dependencies), i3(), gp(t.lanes), Ia(i, t.childLanes) ? (sb(e, t), t.child) : null;
    }
    function yx(e, t, i) {
      {
        var o = t.return;
        if (o === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, i.index = t.index, i.sibling = t.sibling, i.return = t.return, i.ref = t.ref, t === o.child)
          o.child = i;
        else {
          var c = o.child;
          if (c === null)
            throw new Error("Expected parent to have a child.");
          for (; c.sibling !== t; )
            if (c = c.sibling, c === null)
              throw new Error("Expected to find the previous sibling.");
          c.sibling = i;
        }
        var v = o.deletions;
        return v === null ? (o.deletions = [e], o.flags |= Ci) : v.push(e), i.flags |= hr, i;
      }
    }
    function cg(e, t) {
      var i = e.lanes;
      return !!Ia(i, t);
    }
    function gx(e, t, i) {
      switch (t.tag) {
        case R:
          w3(t), t.stateNode, Gf();
          break;
        case k:
          kS(t);
          break;
        case T: {
          var o = t.type;
          Eo(o) && dm(t);
          break;
        }
        case D:
          a1(t, t.stateNode.containerInfo);
          break;
        case K: {
          var c = t.memoizedProps.value, v = t.type._context;
          CS(t, v, c);
          break;
        }
        case P:
          {
            var g = Ia(i, t.childLanes);
            g && (t.flags |= kn);
            {
              var w = t.stateNode;
              w.effectDuration = 0, w.passiveEffectDuration = 0;
            }
          }
          break;
        case $: {
          var x = t.memoizedState;
          if (x !== null) {
            if (x.dehydrated !== null)
              return is(t, ed(Hl.current)), t.flags |= Mt, null;
            var O = t.child, L = O.childLanes;
            if (Ia(i, L))
              return R3(e, t, i);
            is(t, ed(Hl.current));
            var B = pu(e, t, i);
            return B !== null ? B.sibling : null;
          } else
            is(t, ed(Hl.current));
          break;
        }
        case se: {
          var I = (e.flags & Mt) !== Dt, le = Ia(i, t.childLanes);
          if (I) {
            if (le)
              return _3(e, t, i);
            t.flags |= Mt;
          }
          var ce = t.memoizedState;
          if (ce !== null && (ce.rendering = null, ce.tail = null, ce.lastEffect = null), is(t, Hl.current), le)
            break;
          return null;
        }
        case ae:
        case q:
          return t.lanes = _e, S3(e, t, i);
      }
      return pu(e, t, i);
    }
    function O3(e, t, i) {
      if (t._debugNeedsRemount && e !== null)
        return yx(e, t, Pg(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var o = e.memoizedProps, c = t.pendingProps;
        if (o !== c || cm() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          Vl = !0;
        else {
          var v = cg(e, i);
          if (!v && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & Mt) === Dt)
            return Vl = !1, gx(e, t, i);
          (e.flags & Bc) !== Dt ? Vl = !0 : Vl = !1;
        }
      } else if (Vl = !1, _a() && qR(t)) {
        var g = t.index, w = IR();
        iS(t, w, g);
      }
      switch (t.lanes = _e, t.tag) {
        case b:
          return Jb(e, t, t.type, i);
        case Re: {
          var x = t.elementType;
          return Kb(e, t, x, i);
        }
        case C: {
          var O = t.type, L = t.pendingProps, B = t.elementType === O ? L : $l(O, L);
          return ng(e, t, O, B, i);
        }
        case T: {
          var I = t.type, le = t.pendingProps, ce = t.elementType === I ? le : $l(I, le);
          return C3(e, t, I, ce, i);
        }
        case R:
          return Qb(e, t, i);
        case k:
          return Gb(e, t, i);
        case z:
          return Xb(e, t);
        case $:
          return R3(e, t, i);
        case D:
          return px(e, t, i);
        case Y: {
          var ye = t.type, tt = t.pendingProps, jt = t.elementType === ye ? tt : $l(ye, tt);
          return m3(e, t, ye, jt, i);
        }
        case A:
          return Yb(e, t, i);
        case N:
          return Wb(e, t, i);
        case P:
          return Bb(e, t, i);
        case K:
          return hx(e, t, i);
        case X:
          return mx(e, t, i);
        case Q: {
          var bt = t.type, zn = t.pendingProps, Tn = $l(bt, zn);
          if (t.type !== t.elementType) {
            var ee = bt.propTypes;
            ee && Ul(
              ee,
              Tn,
              // Resolved for outer only
              "prop",
              on(bt)
            );
          }
          return Tn = $l(bt.type, Tn), y3(e, t, bt, Tn, i);
        }
        case re:
          return g3(e, t, t.type, t.pendingProps, i);
        case he: {
          var ge = t.type, te = t.pendingProps, Ae = t.elementType === ge ? te : $l(ge, te);
          return Zb(e, t, ge, Ae, i);
        }
        case se:
          return _3(e, t, i);
        case fe:
          break;
        case ae:
          return S3(e, t, i);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function ld(e) {
      e.flags |= kn;
    }
    function z3(e) {
      e.flags |= wr, e.flags |= Fu;
    }
    var L3, fg, A3, N3;
    L3 = function(e, t, i, o) {
      for (var c = t.child; c !== null; ) {
        if (c.tag === k || c.tag === z)
          PT(e, c.stateNode);
        else if (c.tag !== D) {
          if (c.child !== null) {
            c.child.return = c, c = c.child;
            continue;
          }
        }
        if (c === t)
          return;
        for (; c.sibling === null; ) {
          if (c.return === null || c.return === t)
            return;
          c = c.return;
        }
        c.sibling.return = c.return, c = c.sibling;
      }
    }, fg = function(e, t) {
    }, A3 = function(e, t, i, o, c) {
      var v = e.memoizedProps;
      if (v !== o) {
        var g = t.stateNode, w = i1(), x = VT(g, i, v, o, c, w);
        t.updateQueue = x, x && ld(t);
      }
    }, N3 = function(e, t, i, o) {
      i !== o && ld(t);
    };
    function op(e, t) {
      if (!_a())
        switch (e.tailMode) {
          case "hidden": {
            for (var i = e.tail, o = null; i !== null; )
              i.alternate !== null && (o = i), i = i.sibling;
            o === null ? e.tail = null : o.sibling = null;
            break;
          }
          case "collapsed": {
            for (var c = e.tail, v = null; c !== null; )
              c.alternate !== null && (v = c), c = c.sibling;
            v === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : v.sibling = null;
            break;
          }
        }
    }
    function Da(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, i = _e, o = Dt;
      if (t) {
        if ((e.mode & Pn) !== Ot) {
          for (var x = e.selfBaseDuration, O = e.child; O !== null; )
            i = un(i, un(O.lanes, O.childLanes)), o |= O.subtreeFlags & Lr, o |= O.flags & Lr, x += O.treeBaseDuration, O = O.sibling;
          e.treeBaseDuration = x;
        } else
          for (var L = e.child; L !== null; )
            i = un(i, un(L.lanes, L.childLanes)), o |= L.subtreeFlags & Lr, o |= L.flags & Lr, L.return = e, L = L.sibling;
        e.subtreeFlags |= o;
      } else {
        if ((e.mode & Pn) !== Ot) {
          for (var c = e.actualDuration, v = e.selfBaseDuration, g = e.child; g !== null; )
            i = un(i, un(g.lanes, g.childLanes)), o |= g.subtreeFlags, o |= g.flags, c += g.actualDuration, v += g.treeBaseDuration, g = g.sibling;
          e.actualDuration = c, e.treeBaseDuration = v;
        } else
          for (var w = e.child; w !== null; )
            i = un(i, un(w.lanes, w.childLanes)), o |= w.subtreeFlags, o |= w.flags, w.return = e, w = w.sibling;
        e.subtreeFlags |= o;
      }
      return e.childLanes = i, t;
    }
    function Sx(e, t, i) {
      if (rb() && (t.mode & pn) !== Ot && (t.flags & Mt) === Dt)
        return dS(t), Gf(), t.flags |= ma | Os | Yr, !1;
      var o = ym(t);
      if (i !== null && i.dehydrated !== null)
        if (e === null) {
          if (!o)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (tb(t), Da(t), (t.mode & Pn) !== Ot) {
            var c = i !== null;
            if (c) {
              var v = t.child;
              v !== null && (t.treeBaseDuration -= v.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Gf(), (t.flags & Mt) === Dt && (t.memoizedState = null), t.flags |= kn, Da(t), (t.mode & Pn) !== Ot) {
            var g = i !== null;
            if (g) {
              var w = t.child;
              w !== null && (t.treeBaseDuration -= w.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return vS(), !0;
    }
    function U3(e, t, i) {
      var o = t.pendingProps;
      switch (j0(t), t.tag) {
        case b:
        case Re:
        case re:
        case C:
        case Y:
        case A:
        case N:
        case P:
        case X:
        case Q:
          return Da(t), null;
        case T: {
          var c = t.type;
          return Eo(c) && fm(t), Da(t), null;
        }
        case R: {
          var v = t.stateNode;
          if (Jf(t), L0(t), c1(), v.pendingContext && (v.context = v.pendingContext, v.pendingContext = null), e === null || e.child === null) {
            var g = ym(t);
            if (g)
              ld(t);
            else if (e !== null) {
              var w = e.memoizedState;
              // Check if this is a client root
              (!w.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & ma) !== Dt) && (t.flags |= $r, vS());
            }
          }
          return fg(e, t), Da(t), null;
        }
        case k: {
          l1(t);
          var x = _S(), O = t.type;
          if (e !== null && t.stateNode != null)
            A3(e, t, O, o, x), e.ref !== t.ref && z3(t);
          else {
            if (!o) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Da(t), null;
            }
            var L = i1(), B = ym(t);
            if (B)
              JR(t, x, L) && ld(t);
            else {
              var I = HT(O, o, x, L, t);
              L3(I, t, !1, !1), t.stateNode = I, $T(I, O, o, x) && ld(t);
            }
            t.ref !== null && z3(t);
          }
          return Da(t), null;
        }
        case z: {
          var le = o;
          if (e && t.stateNode != null) {
            var ce = e.memoizedProps;
            N3(e, t, ce, le);
          } else {
            if (typeof le != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var ye = _S(), tt = i1(), jt = ym(t);
            jt ? eb(t) && ld(t) : t.stateNode = qT(le, ye, tt, t);
          }
          return Da(t), null;
        }
        case $: {
          td(t);
          var bt = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var zn = Sx(e, t, bt);
            if (!zn)
              return t.flags & Yr ? t : null;
          }
          if ((t.flags & Mt) !== Dt)
            return t.lanes = i, (t.mode & Pn) !== Ot && N1(t), t;
          var Tn = bt !== null, ee = e !== null && e.memoizedState !== null;
          if (Tn !== ee && Tn) {
            var ge = t.child;
            if (ge.flags |= zr, (t.mode & pn) !== Ot) {
              var te = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              te || o1(Hl.current, OS) ? EM() : kg();
            }
          }
          var Ae = t.updateQueue;
          if (Ae !== null && (t.flags |= kn), Da(t), (t.mode & Pn) !== Ot && Tn) {
            var ut = t.child;
            ut !== null && (t.treeBaseDuration -= ut.treeBaseDuration);
          }
          return null;
        }
        case D:
          return Jf(t), fg(e, t), e === null && UR(t.stateNode.containerInfo), Da(t), null;
        case K:
          var at = t.type._context;
          return K0(at, t), Da(t), null;
        case he: {
          var Yt = t.type;
          return Eo(Yt) && fm(t), Da(t), null;
        }
        case se: {
          td(t);
          var en = t.memoizedState;
          if (en === null)
            return Da(t), null;
          var nr = (t.flags & Mt) !== Dt, qn = en.rendering;
          if (qn === null)
            if (nr)
              op(en, !1);
            else {
              var Ir = wM() && (e === null || (e.flags & Mt) === Dt);
              if (!Ir)
                for (var In = t.child; In !== null; ) {
                  var Hr = Lm(In);
                  if (Hr !== null) {
                    nr = !0, t.flags |= Mt, op(en, !1);
                    var Ka = Hr.updateQueue;
                    return Ka !== null && (t.updateQueue = Ka, t.flags |= kn), t.subtreeFlags = Dt, cb(t, i), is(t, u1(Hl.current, Qv)), t.child;
                  }
                  In = In.sibling;
                }
              en.tail !== null && Vr() > rE() && (t.flags |= Mt, nr = !0, op(en, !1), t.lanes = Jd);
            }
          else {
            if (!nr) {
              var Na = Lm(qn);
              if (Na !== null) {
                t.flags |= Mt, nr = !0;
                var Bi = Na.updateQueue;
                if (Bi !== null && (t.updateQueue = Bi, t.flags |= kn), op(en, !0), en.tail === null && en.tailMode === "hidden" && !qn.alternate && !_a())
                  return Da(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Vr() * 2 - en.renderingStartTime > rE() && i !== qa && (t.flags |= Mt, nr = !0, op(en, !1), t.lanes = Jd);
            }
            if (en.isBackwards)
              qn.sibling = t.child, t.child = qn;
            else {
              var di = en.last;
              di !== null ? di.sibling = qn : t.child = qn, en.last = qn;
            }
          }
          if (en.tail !== null) {
            var vi = en.tail;
            en.rendering = vi, en.tail = vi.sibling, en.renderingStartTime = Vr(), vi.sibling = null;
            var Za = Hl.current;
            return nr ? Za = u1(Za, Qv) : Za = ed(Za), is(t, Za), vi;
          }
          return Da(t), null;
        }
        case fe:
          break;
        case ae:
        case q: {
          _g(t);
          var Su = t.memoizedState, pd = Su !== null;
          if (e !== null) {
            var Tp = e.memoizedState, _o = Tp !== null;
            _o !== pd && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !Te && (t.flags |= zr);
          }
          return !pd || (t.mode & pn) === Ot ? Da(t) : Ia(Mo, qa) && (Da(t), t.subtreeFlags & (hr | kn) && (t.flags |= zr)), null;
        }
        case we:
          return null;
        case Ne:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ex(e, t, i) {
      switch (j0(t), t.tag) {
        case T: {
          var o = t.type;
          Eo(o) && fm(t);
          var c = t.flags;
          return c & Yr ? (t.flags = c & ~Yr | Mt, (t.mode & Pn) !== Ot && N1(t), t) : null;
        }
        case R: {
          t.stateNode, Jf(t), L0(t), c1();
          var v = t.flags;
          return (v & Yr) !== Dt && (v & Mt) === Dt ? (t.flags = v & ~Yr | Mt, t) : null;
        }
        case k:
          return l1(t), null;
        case $: {
          td(t);
          var g = t.memoizedState;
          if (g !== null && g.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Gf();
          }
          var w = t.flags;
          return w & Yr ? (t.flags = w & ~Yr | Mt, (t.mode & Pn) !== Ot && N1(t), t) : null;
        }
        case se:
          return td(t), null;
        case D:
          return Jf(t), null;
        case K:
          var x = t.type._context;
          return K0(x, t), null;
        case ae:
        case q:
          return _g(t), null;
        case we:
          return null;
        default:
          return null;
      }
    }
    function j3(e, t, i) {
      switch (j0(t), t.tag) {
        case T: {
          var o = t.type.childContextTypes;
          o != null && fm(t);
          break;
        }
        case R: {
          t.stateNode, Jf(t), L0(t), c1();
          break;
        }
        case k: {
          l1(t);
          break;
        }
        case D:
          Jf(t);
          break;
        case $:
          td(t);
          break;
        case se:
          td(t);
          break;
        case K:
          var c = t.type._context;
          K0(c, t);
          break;
        case ae:
        case q:
          _g(t);
          break;
      }
    }
    var F3 = null;
    F3 = /* @__PURE__ */ new Set();
    var ry = !1, Oa = !1, Cx = typeof WeakSet == "function" ? WeakSet : Set, yt = null, od = null, ud = null;
    function wx(e) {
      to(null, function() {
        throw e;
      }), Ds();
    }
    var Tx = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Pn)
        try {
          bo(), t.componentWillUnmount();
        } finally {
          Ro(e);
        }
      else
        t.componentWillUnmount();
    };
    function H3(e, t) {
      try {
        us(aa, e);
      } catch (i) {
        sr(e, t, i);
      }
    }
    function dg(e, t, i) {
      try {
        Tx(e, i);
      } catch (o) {
        sr(e, t, o);
      }
    }
    function Rx(e, t, i) {
      try {
        i.componentDidMount();
      } catch (o) {
        sr(e, t, o);
      }
    }
    function P3(e, t) {
      try {
        V3(e);
      } catch (i) {
        sr(e, t, i);
      }
    }
    function sd(e, t) {
      var i = e.ref;
      if (i !== null)
        if (typeof i == "function") {
          var o;
          try {
            if (Me && Qe && e.mode & Pn)
              try {
                bo(), o = i(null);
              } finally {
                Ro(e);
              }
            else
              o = i(null);
          } catch (c) {
            sr(e, t, c);
          }
          typeof o == "function" && p("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Vt(e));
        } else
          i.current = null;
    }
    function ay(e, t, i) {
      try {
        i();
      } catch (o) {
        sr(e, t, o);
      }
    }
    var $3 = !1;
    function bx(e, t) {
      jT(e.containerInfo), yt = t, xx();
      var i = $3;
      return $3 = !1, i;
    }
    function xx() {
      for (; yt !== null; ) {
        var e = yt, t = e.child;
        (e.subtreeFlags & ro) !== Dt && t !== null ? (t.return = e, yt = t) : Mx();
      }
    }
    function Mx() {
      for (; yt !== null; ) {
        var e = yt;
        Hn(e);
        try {
          _x(e);
        } catch (i) {
          sr(e, e.return, i);
        }
        Kn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, yt = t;
          return;
        }
        yt = e.return;
      }
    }
    function _x(e) {
      var t = e.alternate, i = e.flags;
      if ((i & $r) !== Dt) {
        switch (Hn(e), e.tag) {
          case C:
          case Y:
          case re:
            break;
          case T: {
            if (t !== null) {
              var o = t.memoizedProps, c = t.memoizedState, v = e.stateNode;
              e.type === e.elementType && !Tc && (v.props !== e.memoizedProps && p("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Vt(e) || "instance"), v.state !== e.memoizedState && p("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Vt(e) || "instance"));
              var g = v.getSnapshotBeforeUpdate(e.elementType === e.type ? o : $l(e.type, o), c);
              {
                var w = F3;
                g === void 0 && !w.has(e.type) && (w.add(e.type), p("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Vt(e)));
              }
              v.__reactInternalSnapshotBeforeUpdate = g;
            }
            break;
          }
          case R: {
            {
              var x = e.stateNode;
              uR(x.containerInfo);
            }
            break;
          }
          case k:
          case z:
          case D:
          case he:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        Kn();
      }
    }
    function ql(e, t, i) {
      var o = t.updateQueue, c = o !== null ? o.lastEffect : null;
      if (c !== null) {
        var v = c.next, g = v;
        do {
          if ((g.tag & e) === e) {
            var w = g.destroy;
            g.destroy = void 0, w !== void 0 && ((e & ka) !== zi ? Dl(t) : (e & aa) !== zi && Ls(t), (e & Co) !== zi && Ep(!0), ay(t, i, w), (e & Co) !== zi && Ep(!1), (e & ka) !== zi ? oo() : (e & aa) !== zi && Kd());
          }
          g = g.next;
        } while (g !== v);
      }
    }
    function us(e, t) {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var c = o.next, v = c;
        do {
          if ((v.tag & e) === e) {
            (e & ka) !== zi ? Xd(t) : (e & aa) !== zi && Jc(t);
            var g = v.create;
            (e & Co) !== zi && Ep(!0), v.destroy = g(), (e & Co) !== zi && Ep(!1), (e & ka) !== zi ? sh() : (e & aa) !== zi && ch();
            {
              var w = v.destroy;
              if (w !== void 0 && typeof w != "function") {
                var x = void 0;
                (v.tag & aa) !== Dt ? x = "useLayoutEffect" : (v.tag & Co) !== Dt ? x = "useInsertionEffect" : x = "useEffect";
                var O = void 0;
                w === null ? O = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof w.then == "function" ? O = `

It looks like you wrote ` + x + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + x + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : O = " You returned: " + w, p("%s must not return anything besides a function, which is used for clean-up.%s", x, O);
              }
            }
          }
          v = v.next;
        } while (v !== c);
      }
    }
    function kx(e, t) {
      if ((t.flags & kn) !== Dt)
        switch (t.tag) {
          case P: {
            var i = t.stateNode.passiveEffectDuration, o = t.memoizedProps, c = o.id, v = o.onPostCommit, g = r3(), w = t.alternate === null ? "mount" : "update";
            n3() && (w = "nested-update"), typeof v == "function" && v(c, w, i, g);
            var x = t.return;
            e: for (; x !== null; ) {
              switch (x.tag) {
                case R:
                  var O = x.stateNode;
                  O.passiveEffectDuration += i;
                  break e;
                case P:
                  var L = x.stateNode;
                  L.passiveEffectDuration += i;
                  break e;
              }
              x = x.return;
            }
            break;
          }
        }
    }
    function Dx(e, t, i, o) {
      if ((i.flags & io) !== Dt)
        switch (i.tag) {
          case C:
          case Y:
          case re: {
            if (!Oa)
              if (i.mode & Pn)
                try {
                  bo(), us(aa | ra, i);
                } finally {
                  Ro(i);
                }
              else
                us(aa | ra, i);
            break;
          }
          case T: {
            var c = i.stateNode;
            if (i.flags & kn && !Oa)
              if (t === null)
                if (i.type === i.elementType && !Tc && (c.props !== i.memoizedProps && p("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Vt(i) || "instance"), c.state !== i.memoizedState && p("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Vt(i) || "instance")), i.mode & Pn)
                  try {
                    bo(), c.componentDidMount();
                  } finally {
                    Ro(i);
                  }
                else
                  c.componentDidMount();
              else {
                var v = i.elementType === i.type ? t.memoizedProps : $l(i.type, t.memoizedProps), g = t.memoizedState;
                if (i.type === i.elementType && !Tc && (c.props !== i.memoizedProps && p("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Vt(i) || "instance"), c.state !== i.memoizedState && p("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Vt(i) || "instance")), i.mode & Pn)
                  try {
                    bo(), c.componentDidUpdate(v, g, c.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Ro(i);
                  }
                else
                  c.componentDidUpdate(v, g, c.__reactInternalSnapshotBeforeUpdate);
              }
            var w = i.updateQueue;
            w !== null && (i.type === i.elementType && !Tc && (c.props !== i.memoizedProps && p("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Vt(i) || "instance"), c.state !== i.memoizedState && p("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Vt(i) || "instance")), MS(i, w, c));
            break;
          }
          case R: {
            var x = i.updateQueue;
            if (x !== null) {
              var O = null;
              if (i.child !== null)
                switch (i.child.tag) {
                  case k:
                    O = i.child.stateNode;
                    break;
                  case T:
                    O = i.child.stateNode;
                    break;
                }
              MS(i, x, O);
            }
            break;
          }
          case k: {
            var L = i.stateNode;
            if (t === null && i.flags & kn) {
              var B = i.type, I = i.memoizedProps;
              QT(L, B, I);
            }
            break;
          }
          case z:
            break;
          case D:
            break;
          case P: {
            {
              var le = i.memoizedProps, ce = le.onCommit, ye = le.onRender, tt = i.stateNode.effectDuration, jt = r3(), bt = t === null ? "mount" : "update";
              n3() && (bt = "nested-update"), typeof ye == "function" && ye(i.memoizedProps.id, bt, i.actualDuration, i.treeBaseDuration, i.actualStartTime, jt);
              {
                typeof ce == "function" && ce(i.memoizedProps.id, bt, tt, jt), MM(i);
                var zn = i.return;
                e: for (; zn !== null; ) {
                  switch (zn.tag) {
                    case R:
                      var Tn = zn.stateNode;
                      Tn.effectDuration += tt;
                      break e;
                    case P:
                      var ee = zn.stateNode;
                      ee.effectDuration += tt;
                      break e;
                  }
                  zn = zn.return;
                }
              }
            }
            break;
          }
          case $: {
            Fx(e, i);
            break;
          }
          case se:
          case he:
          case fe:
          case ae:
          case q:
          case Ne:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Oa || i.flags & wr && V3(i);
    }
    function Ox(e) {
      switch (e.tag) {
        case C:
        case Y:
        case re: {
          if (e.mode & Pn)
            try {
              bo(), H3(e, e.return);
            } finally {
              Ro(e);
            }
          else
            H3(e, e.return);
          break;
        }
        case T: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Rx(e, e.return, t), P3(e, e.return);
          break;
        }
        case k: {
          P3(e, e.return);
          break;
        }
      }
    }
    function zx(e, t) {
      for (var i = null, o = e; ; ) {
        if (o.tag === k) {
          if (i === null) {
            i = o;
            try {
              var c = o.stateNode;
              t ? aR(c) : lR(o.stateNode, o.memoizedProps);
            } catch (g) {
              sr(e, e.return, g);
            }
          }
        } else if (o.tag === z) {
          if (i === null)
            try {
              var v = o.stateNode;
              t ? iR(v) : oR(v, o.memoizedProps);
            } catch (g) {
              sr(e, e.return, g);
            }
        } else if (!((o.tag === ae || o.tag === q) && o.memoizedState !== null && o !== e)) {
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
          i === o && (i = null), o = o.return;
        }
        i === o && (i = null), o.sibling.return = o.return, o = o.sibling;
      }
    }
    function V3(e) {
      var t = e.ref;
      if (t !== null) {
        var i = e.stateNode, o;
        if (e.tag === k ? o = i : o = i, typeof t == "function") {
          var c;
          if (e.mode & Pn)
            try {
              bo(), c = t(o);
            } finally {
              Ro(e);
            }
          else
            c = t(o);
          typeof c == "function" && p("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Vt(e));
        } else
          t.hasOwnProperty("current") || p("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Vt(e)), t.current = o;
      }
    }
    function Lx(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function q3(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, q3(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === k) {
          var i = e.stateNode;
          i !== null && HR(i);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Ax(e) {
      for (var t = e.return; t !== null; ) {
        if (I3(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function I3(e) {
      return e.tag === k || e.tag === R || e.tag === D;
    }
    function Y3(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || I3(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== k && t.tag !== z && t.tag !== G; ) {
          if (t.flags & hr || t.child === null || t.tag === D)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & hr))
          return t.stateNode;
      }
    }
    function Nx(e) {
      var t = Ax(e);
      switch (t.tag) {
        case k: {
          var i = t.stateNode;
          t.flags & wi && (B2(i), t.flags &= ~wi);
          var o = Y3(e);
          pg(e, o, i);
          break;
        }
        case R:
        case D: {
          var c = t.stateNode.containerInfo, v = Y3(e);
          vg(e, v, c);
          break;
        }
        // eslint-disable-next-line-no-fallthrough
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function vg(e, t, i) {
      var o = e.tag, c = o === k || o === z;
      if (c) {
        var v = e.stateNode;
        t ? eR(i, v, t) : ZT(i, v);
      } else if (o !== D) {
        var g = e.child;
        if (g !== null) {
          vg(g, t, i);
          for (var w = g.sibling; w !== null; )
            vg(w, t, i), w = w.sibling;
        }
      }
    }
    function pg(e, t, i) {
      var o = e.tag, c = o === k || o === z;
      if (c) {
        var v = e.stateNode;
        t ? JT(i, v, t) : KT(i, v);
      } else if (o !== D) {
        var g = e.child;
        if (g !== null) {
          pg(g, t, i);
          for (var w = g.sibling; w !== null; )
            pg(w, t, i), w = w.sibling;
        }
      }
    }
    var za = null, Il = !1;
    function Ux(e, t, i) {
      {
        var o = t;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case k: {
              za = o.stateNode, Il = !1;
              break e;
            }
            case R: {
              za = o.stateNode.containerInfo, Il = !0;
              break e;
            }
            case D: {
              za = o.stateNode.containerInfo, Il = !0;
              break e;
            }
          }
          o = o.return;
        }
        if (za === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        W3(e, t, i), za = null, Il = !1;
      }
      Lx(i);
    }
    function ss(e, t, i) {
      for (var o = i.child; o !== null; )
        W3(e, t, o), o = o.sibling;
    }
    function W3(e, t, i) {
      switch (Bd(i), i.tag) {
        case k:
          Oa || sd(i, t);
        // eslint-disable-next-line-no-fallthrough
        case z: {
          {
            var o = za, c = Il;
            za = null, ss(e, t, i), za = o, Il = c, za !== null && (Il ? nR(za, i.stateNode) : tR(za, i.stateNode));
          }
          return;
        }
        case G: {
          za !== null && (Il ? rR(za, i.stateNode) : b0(za, i.stateNode));
          return;
        }
        case D: {
          {
            var v = za, g = Il;
            za = i.stateNode.containerInfo, Il = !0, ss(e, t, i), za = v, Il = g;
          }
          return;
        }
        case C:
        case Y:
        case Q:
        case re: {
          if (!Oa) {
            var w = i.updateQueue;
            if (w !== null) {
              var x = w.lastEffect;
              if (x !== null) {
                var O = x.next, L = O;
                do {
                  var B = L, I = B.destroy, le = B.tag;
                  I !== void 0 && ((le & Co) !== zi ? ay(i, t, I) : (le & aa) !== zi && (Ls(i), i.mode & Pn ? (bo(), ay(i, t, I), Ro(i)) : ay(i, t, I), Kd())), L = L.next;
                } while (L !== O);
              }
            }
          }
          ss(e, t, i);
          return;
        }
        case T: {
          if (!Oa) {
            sd(i, t);
            var ce = i.stateNode;
            typeof ce.componentWillUnmount == "function" && dg(i, t, ce);
          }
          ss(e, t, i);
          return;
        }
        case fe: {
          ss(e, t, i);
          return;
        }
        case ae: {
          if (
            // TODO: Remove this dead flag
            i.mode & pn
          ) {
            var ye = Oa;
            Oa = ye || i.memoizedState !== null, ss(e, t, i), Oa = ye;
          } else
            ss(e, t, i);
          break;
        }
        default: {
          ss(e, t, i);
          return;
        }
      }
    }
    function jx(e) {
      e.memoizedState;
    }
    function Fx(e, t) {
      var i = t.memoizedState;
      if (i === null) {
        var o = t.alternate;
        if (o !== null) {
          var c = o.memoizedState;
          if (c !== null) {
            var v = c.dehydrated;
            v !== null && wR(v);
          }
        }
      }
    }
    function B3(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var i = e.stateNode;
        i === null && (i = e.stateNode = new Cx()), t.forEach(function(o) {
          var c = AM.bind(null, e, o);
          if (!i.has(o)) {
            if (i.add(o), Va)
              if (od !== null && ud !== null)
                Sp(ud, od);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            o.then(c, c);
          }
        });
      }
    }
    function Hx(e, t, i) {
      od = i, ud = e, Hn(t), Q3(t, e), Hn(t), od = null, ud = null;
    }
    function Yl(e, t, i) {
      var o = t.deletions;
      if (o !== null)
        for (var c = 0; c < o.length; c++) {
          var v = o[c];
          try {
            Ux(e, t, v);
          } catch (x) {
            sr(v, t, x);
          }
        }
      var g = yi();
      if (t.subtreeFlags & ao)
        for (var w = t.child; w !== null; )
          Hn(w), Q3(w, e), w = w.sibling;
      Hn(g);
    }
    function Q3(e, t, i) {
      var o = e.alternate, c = e.flags;
      switch (e.tag) {
        case C:
        case Y:
        case Q:
        case re: {
          if (Yl(t, e), xo(e), c & kn) {
            try {
              ql(Co | ra, e, e.return), us(Co | ra, e);
            } catch (Yt) {
              sr(e, e.return, Yt);
            }
            if (e.mode & Pn) {
              try {
                bo(), ql(aa | ra, e, e.return);
              } catch (Yt) {
                sr(e, e.return, Yt);
              }
              Ro(e);
            } else
              try {
                ql(aa | ra, e, e.return);
              } catch (Yt) {
                sr(e, e.return, Yt);
              }
          }
          return;
        }
        case T: {
          Yl(t, e), xo(e), c & wr && o !== null && sd(o, o.return);
          return;
        }
        case k: {
          Yl(t, e), xo(e), c & wr && o !== null && sd(o, o.return);
          {
            if (e.flags & wi) {
              var v = e.stateNode;
              try {
                B2(v);
              } catch (Yt) {
                sr(e, e.return, Yt);
              }
            }
            if (c & kn) {
              var g = e.stateNode;
              if (g != null) {
                var w = e.memoizedProps, x = o !== null ? o.memoizedProps : w, O = e.type, L = e.updateQueue;
                if (e.updateQueue = null, L !== null)
                  try {
                    GT(g, L, O, x, w, e);
                  } catch (Yt) {
                    sr(e, e.return, Yt);
                  }
              }
            }
          }
          return;
        }
        case z: {
          if (Yl(t, e), xo(e), c & kn) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var B = e.stateNode, I = e.memoizedProps, le = o !== null ? o.memoizedProps : I;
            try {
              XT(B, le, I);
            } catch (Yt) {
              sr(e, e.return, Yt);
            }
          }
          return;
        }
        case R: {
          if (Yl(t, e), xo(e), c & kn && o !== null) {
            var ce = o.memoizedState;
            if (ce.isDehydrated)
              try {
                CR(t.containerInfo);
              } catch (Yt) {
                sr(e, e.return, Yt);
              }
          }
          return;
        }
        case D: {
          Yl(t, e), xo(e);
          return;
        }
        case $: {
          Yl(t, e), xo(e);
          var ye = e.child;
          if (ye.flags & zr) {
            var tt = ye.stateNode, jt = ye.memoizedState, bt = jt !== null;
            if (tt.isHidden = bt, bt) {
              var zn = ye.alternate !== null && ye.alternate.memoizedState !== null;
              zn || SM();
            }
          }
          if (c & kn) {
            try {
              jx(e);
            } catch (Yt) {
              sr(e, e.return, Yt);
            }
            B3(e);
          }
          return;
        }
        case ae: {
          var Tn = o !== null && o.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & pn
          ) {
            var ee = Oa;
            Oa = ee || Tn, Yl(t, e), Oa = ee;
          } else
            Yl(t, e);
          if (xo(e), c & zr) {
            var ge = e.stateNode, te = e.memoizedState, Ae = te !== null, ut = e;
            if (ge.isHidden = Ae, Ae && !Tn && (ut.mode & pn) !== Ot) {
              yt = ut;
              for (var at = ut.child; at !== null; )
                yt = at, $x(at), at = at.sibling;
            }
            zx(ut, Ae);
          }
          return;
        }
        case se: {
          Yl(t, e), xo(e), c & kn && B3(e);
          return;
        }
        case fe:
          return;
        default: {
          Yl(t, e), xo(e);
          return;
        }
      }
    }
    function xo(e) {
      var t = e.flags;
      if (t & hr) {
        try {
          Nx(e);
        } catch (i) {
          sr(e, e.return, i);
        }
        e.flags &= ~hr;
      }
      t & Ha && (e.flags &= ~Ha);
    }
    function Px(e, t, i) {
      od = i, ud = t, yt = e, G3(e, t, i), od = null, ud = null;
    }
    function G3(e, t, i) {
      for (var o = (e.mode & pn) !== Ot; yt !== null; ) {
        var c = yt, v = c.child;
        if (c.tag === ae && o) {
          var g = c.memoizedState !== null, w = g || ry;
          if (w) {
            hg(e, t, i);
            continue;
          } else {
            var x = c.alternate, O = x !== null && x.memoizedState !== null, L = O || Oa, B = ry, I = Oa;
            ry = w, Oa = L, Oa && !I && (yt = c, Vx(c));
            for (var le = v; le !== null; )
              yt = le, G3(
                le,
                // New root; bubble back up to here and stop.
                t,
                i
              ), le = le.sibling;
            yt = c, ry = B, Oa = I, hg(e, t, i);
            continue;
          }
        }
        (c.subtreeFlags & io) !== Dt && v !== null ? (v.return = c, yt = v) : hg(e, t, i);
      }
    }
    function hg(e, t, i) {
      for (; yt !== null; ) {
        var o = yt;
        if ((o.flags & io) !== Dt) {
          var c = o.alternate;
          Hn(o);
          try {
            Dx(t, c, o, i);
          } catch (g) {
            sr(o, o.return, g);
          }
          Kn();
        }
        if (o === e) {
          yt = null;
          return;
        }
        var v = o.sibling;
        if (v !== null) {
          v.return = o.return, yt = v;
          return;
        }
        yt = o.return;
      }
    }
    function $x(e) {
      for (; yt !== null; ) {
        var t = yt, i = t.child;
        switch (t.tag) {
          case C:
          case Y:
          case Q:
          case re: {
            if (t.mode & Pn)
              try {
                bo(), ql(aa, t, t.return);
              } finally {
                Ro(t);
              }
            else
              ql(aa, t, t.return);
            break;
          }
          case T: {
            sd(t, t.return);
            var o = t.stateNode;
            typeof o.componentWillUnmount == "function" && dg(t, t.return, o);
            break;
          }
          case k: {
            sd(t, t.return);
            break;
          }
          case ae: {
            var c = t.memoizedState !== null;
            if (c) {
              X3(e);
              continue;
            }
            break;
          }
        }
        i !== null ? (i.return = t, yt = i) : X3(e);
      }
    }
    function X3(e) {
      for (; yt !== null; ) {
        var t = yt;
        if (t === e) {
          yt = null;
          return;
        }
        var i = t.sibling;
        if (i !== null) {
          i.return = t.return, yt = i;
          return;
        }
        yt = t.return;
      }
    }
    function Vx(e) {
      for (; yt !== null; ) {
        var t = yt, i = t.child;
        if (t.tag === ae) {
          var o = t.memoizedState !== null;
          if (o) {
            K3(e);
            continue;
          }
        }
        i !== null ? (i.return = t, yt = i) : K3(e);
      }
    }
    function K3(e) {
      for (; yt !== null; ) {
        var t = yt;
        Hn(t);
        try {
          Ox(t);
        } catch (o) {
          sr(t, t.return, o);
        }
        if (Kn(), t === e) {
          yt = null;
          return;
        }
        var i = t.sibling;
        if (i !== null) {
          i.return = t.return, yt = i;
          return;
        }
        yt = t.return;
      }
    }
    function qx(e, t, i, o) {
      yt = t, Ix(t, e, i, o);
    }
    function Ix(e, t, i, o) {
      for (; yt !== null; ) {
        var c = yt, v = c.child;
        (c.subtreeFlags & _l) !== Dt && v !== null ? (v.return = c, yt = v) : Yx(e, t, i, o);
      }
    }
    function Yx(e, t, i, o) {
      for (; yt !== null; ) {
        var c = yt;
        if ((c.flags & Fa) !== Dt) {
          Hn(c);
          try {
            Wx(t, c, i, o);
          } catch (g) {
            sr(c, c.return, g);
          }
          Kn();
        }
        if (c === e) {
          yt = null;
          return;
        }
        var v = c.sibling;
        if (v !== null) {
          v.return = c.return, yt = v;
          return;
        }
        yt = c.return;
      }
    }
    function Wx(e, t, i, o) {
      switch (t.tag) {
        case C:
        case Y:
        case re: {
          if (t.mode & Pn) {
            A1();
            try {
              us(ka | ra, t);
            } finally {
              L1(t);
            }
          } else
            us(ka | ra, t);
          break;
        }
      }
    }
    function Bx(e) {
      yt = e, Qx();
    }
    function Qx() {
      for (; yt !== null; ) {
        var e = yt, t = e.child;
        if ((yt.flags & Ci) !== Dt) {
          var i = e.deletions;
          if (i !== null) {
            for (var o = 0; o < i.length; o++) {
              var c = i[o];
              yt = c, Kx(c, e);
            }
            {
              var v = e.alternate;
              if (v !== null) {
                var g = v.child;
                if (g !== null) {
                  v.child = null;
                  do {
                    var w = g.sibling;
                    g.sibling = null, g = w;
                  } while (g !== null);
                }
              }
            }
            yt = e;
          }
        }
        (e.subtreeFlags & _l) !== Dt && t !== null ? (t.return = e, yt = t) : Gx();
      }
    }
    function Gx() {
      for (; yt !== null; ) {
        var e = yt;
        (e.flags & Fa) !== Dt && (Hn(e), Xx(e), Kn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, yt = t;
          return;
        }
        yt = e.return;
      }
    }
    function Xx(e) {
      switch (e.tag) {
        case C:
        case Y:
        case re: {
          e.mode & Pn ? (A1(), ql(ka | ra, e, e.return), L1(e)) : ql(ka | ra, e, e.return);
          break;
        }
      }
    }
    function Kx(e, t) {
      for (; yt !== null; ) {
        var i = yt;
        Hn(i), Jx(i, t), Kn();
        var o = i.child;
        o !== null ? (o.return = i, yt = o) : Zx(e);
      }
    }
    function Zx(e) {
      for (; yt !== null; ) {
        var t = yt, i = t.sibling, o = t.return;
        if (q3(t), t === e) {
          yt = null;
          return;
        }
        if (i !== null) {
          i.return = o, yt = i;
          return;
        }
        yt = o;
      }
    }
    function Jx(e, t) {
      switch (e.tag) {
        case C:
        case Y:
        case re: {
          e.mode & Pn ? (A1(), ql(ka, e, t), L1(e)) : ql(ka, e, t);
          break;
        }
      }
    }
    function eM(e) {
      switch (e.tag) {
        case C:
        case Y:
        case re: {
          try {
            us(aa | ra, e);
          } catch (i) {
            sr(e, e.return, i);
          }
          break;
        }
        case T: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (i) {
            sr(e, e.return, i);
          }
          break;
        }
      }
    }
    function tM(e) {
      switch (e.tag) {
        case C:
        case Y:
        case re: {
          try {
            us(ka | ra, e);
          } catch (t) {
            sr(e, e.return, t);
          }
          break;
        }
      }
    }
    function nM(e) {
      switch (e.tag) {
        case C:
        case Y:
        case re: {
          try {
            ql(aa | ra, e, e.return);
          } catch (i) {
            sr(e, e.return, i);
          }
          break;
        }
        case T: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && dg(e, e.return, t);
          break;
        }
      }
    }
    function rM(e) {
      switch (e.tag) {
        case C:
        case Y:
        case re:
          try {
            ql(ka | ra, e, e.return);
          } catch (t) {
            sr(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var up = Symbol.for;
      up("selector.component"), up("selector.has_pseudo_class"), up("selector.role"), up("selector.test_id"), up("selector.text");
    }
    var aM = [];
    function iM() {
      aM.forEach(function(e) {
        return e();
      });
    }
    var lM = s.ReactCurrentActQueue;
    function oM(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), i = typeof jest < "u";
        return i && t !== !1;
      }
    }
    function Z3() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && lM.current !== null && p("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var uM = Math.ceil, mg = s.ReactCurrentDispatcher, yg = s.ReactCurrentOwner, La = s.ReactCurrentBatchConfig, Wl = s.ReactCurrentActQueue, oa = (
      /*             */
      0
    ), J3 = (
      /*               */
      1
    ), Aa = (
      /*                */
      2
    ), yl = (
      /*                */
      4
    ), hu = 0, sp = 1, Rc = 2, iy = 3, cp = 4, eE = 5, gg = 6, On = oa, ci = null, kr = null, ua = _e, Mo = _e, Sg = Ju(_e), sa = hu, fp = null, ly = _e, dp = _e, oy = _e, vp = null, Li = null, Eg = 0, tE = 500, nE = 1 / 0, sM = 500, mu = null;
    function pp() {
      nE = Vr() + sM;
    }
    function rE() {
      return nE;
    }
    var uy = !1, Cg = null, cd = null, bc = !1, cs = null, hp = _e, wg = [], Tg = null, cM = 50, mp = 0, Rg = null, bg = !1, sy = !1, fM = 50, fd = 0, cy = null, yp = rr, fy = _e, aE = !1;
    function dy() {
      return ci;
    }
    function fi() {
      return (On & (Aa | yl)) !== oa ? Vr() : (yp !== rr || (yp = Vr()), yp);
    }
    function fs(e) {
      var t = e.mode;
      if ((t & pn) === Ot)
        return It;
      if ((On & Aa) !== oa && ua !== _e)
        return Ws(ua);
      var i = lb() !== ib;
      if (i) {
        if (La.transition !== null) {
          var o = La.transition;
          o._updatedFibers || (o._updatedFibers = /* @__PURE__ */ new Set()), o._updatedFibers.add(e);
        }
        return fy === Un && (fy = iv()), fy;
      }
      var c = _i();
      if (c !== Un)
        return c;
      var v = IT();
      return v;
    }
    function dM(e) {
      var t = e.mode;
      return (t & pn) === Ot ? It : mh();
    }
    function ca(e, t, i, o) {
      UM(), aE && p("useInsertionEffect must not schedule updates."), bg && (sy = !0), Vu(e, i, o), (On & Aa) !== _e && e === ci ? HM(t) : (Va && Gs(e, t, i), PM(t), e === ci && ((On & Aa) === oa && (dp = un(dp, i)), sa === cp && ds(e, ua)), Ai(e, o), i === It && On === oa && (t.mode & pn) === Ot && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Wl.isBatchingLegacy && (pp(), aS()));
    }
    function vM(e, t, i) {
      var o = e.current;
      o.lanes = t, Vu(e, t, i), Ai(e, i);
    }
    function pM(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (On & Aa) !== oa
      );
    }
    function Ai(e, t) {
      var i = e.callbackNode;
      Ef(e, t);
      var o = Sf(e, e === ci ? ua : _e);
      if (o === _e) {
        i !== null && EE(i), e.callbackNode = null, e.callbackPriority = Un;
        return;
      }
      var c = co(o), v = e.callbackPriority;
      if (v === c && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(Wl.current !== null && i !== zg)) {
        i == null && v !== It && p("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      i != null && EE(i);
      var g;
      if (c === It)
        e.tag === es ? (Wl.isBatchingLegacy !== null && (Wl.didScheduleLegacyUpdate = !0), VR(oE.bind(null, e))) : rS(oE.bind(null, e)), Wl.current !== null ? Wl.current.push(ts) : WT(function() {
          (On & (Aa | yl)) === oa && ts();
        }), g = null;
      else {
        var w;
        switch (Th(o)) {
          case Ta:
            w = zs;
            break;
          case ol:
            w = lo;
            break;
          case xi:
            w = kl;
            break;
          case Mi:
            w = qo;
            break;
          default:
            w = kl;
            break;
        }
        g = Lg(w, iE.bind(null, e));
      }
      e.callbackPriority = c, e.callbackNode = g;
    }
    function iE(e, t) {
      if (zb(), yp = rr, fy = _e, (On & (Aa | yl)) !== oa)
        throw new Error("Should not already be working.");
      var i = e.callbackNode, o = gu();
      if (o && e.callbackNode !== i)
        return null;
      var c = Sf(e, e === ci ? ua : _e);
      if (c === _e)
        return null;
      var v = !wf(e, c) && !hh(e, c) && !t, g = v ? RM(e, c) : py(e, c);
      if (g !== hu) {
        if (g === Rc) {
          var w = Cf(e);
          w !== _e && (c = w, g = xg(e, w));
        }
        if (g === sp) {
          var x = fp;
          throw xc(e, _e), ds(e, c), Ai(e, Vr()), x;
        }
        if (g === gg)
          ds(e, c);
        else {
          var O = !wf(e, c), L = e.current.alternate;
          if (O && !mM(L)) {
            if (g = py(e, c), g === Rc) {
              var B = Cf(e);
              B !== _e && (c = B, g = xg(e, B));
            }
            if (g === sp) {
              var I = fp;
              throw xc(e, _e), ds(e, c), Ai(e, Vr()), I;
            }
          }
          e.finishedWork = L, e.finishedLanes = c, hM(e, g, c);
        }
      }
      return Ai(e, Vr()), e.callbackNode === i ? iE.bind(null, e) : null;
    }
    function xg(e, t) {
      var i = vp;
      if (bf(e)) {
        var o = xc(e, t);
        o.flags |= ma, NR(e.containerInfo);
      }
      var c = py(e, t);
      if (c !== Rc) {
        var v = Li;
        Li = i, v !== null && lE(v);
      }
      return c;
    }
    function lE(e) {
      Li === null ? Li = e : Li.push.apply(Li, e);
    }
    function hM(e, t, i) {
      switch (t) {
        case hu:
        case sp:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case Rc: {
          Mc(e, Li, mu);
          break;
        }
        case iy: {
          if (ds(e, i), eu(i) && // do not delay if we're inside an act() scope
          !CE()) {
            var o = Eg + tE - Vr();
            if (o > 10) {
              var c = Sf(e, _e);
              if (c !== _e)
                break;
              var v = e.suspendedLanes;
              if (!tu(v, i)) {
                fi(), Tf(e, v);
                break;
              }
              e.timeoutHandle = T0(Mc.bind(null, e, Li, mu), o);
              break;
            }
          }
          Mc(e, Li, mu);
          break;
        }
        case cp: {
          if (ds(e, i), rv(i))
            break;
          if (!CE()) {
            var g = Vi(e, i), w = g, x = Vr() - w, O = NM(x) - x;
            if (O > 10) {
              e.timeoutHandle = T0(Mc.bind(null, e, Li, mu), O);
              break;
            }
          }
          Mc(e, Li, mu);
          break;
        }
        case eE: {
          Mc(e, Li, mu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function mM(e) {
      for (var t = e; ; ) {
        if (t.flags & ju) {
          var i = t.updateQueue;
          if (i !== null) {
            var o = i.stores;
            if (o !== null)
              for (var c = 0; c < o.length; c++) {
                var v = o[c], g = v.getSnapshot, w = v.value;
                try {
                  if (!ze(g(), w))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var x = t.child;
        if (t.subtreeFlags & ju && x !== null) {
          x.return = t, t = x;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function ds(e, t) {
      t = Bs(t, oy), t = Bs(t, dp), Sh(e, t);
    }
    function oE(e) {
      if (Lb(), (On & (Aa | yl)) !== oa)
        throw new Error("Should not already be working.");
      gu();
      var t = Sf(e, _e);
      if (!Ia(t, It))
        return Ai(e, Vr()), null;
      var i = py(e, t);
      if (e.tag !== es && i === Rc) {
        var o = Cf(e);
        o !== _e && (t = o, i = xg(e, o));
      }
      if (i === sp) {
        var c = fp;
        throw xc(e, _e), ds(e, t), Ai(e, Vr()), c;
      }
      if (i === gg)
        throw new Error("Root did not complete. This is a bug in React.");
      var v = e.current.alternate;
      return e.finishedWork = v, e.finishedLanes = t, Mc(e, Li, mu), Ai(e, Vr()), null;
    }
    function yM(e, t) {
      t !== _e && (Rf(e, un(t, It)), Ai(e, Vr()), (On & (Aa | yl)) === oa && (pp(), ts()));
    }
    function Mg(e, t) {
      var i = On;
      On |= J3;
      try {
        return e(t);
      } finally {
        On = i, On === oa && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !Wl.isBatchingLegacy && (pp(), aS());
      }
    }
    function gM(e, t, i, o, c) {
      var v = _i(), g = La.transition;
      try {
        return La.transition = null, Ur(Ta), e(t, i, o, c);
      } finally {
        Ur(v), La.transition = g, On === oa && pp();
      }
    }
    function yu(e) {
      cs !== null && cs.tag === es && (On & (Aa | yl)) === oa && gu();
      var t = On;
      On |= J3;
      var i = La.transition, o = _i();
      try {
        return La.transition = null, Ur(Ta), e ? e() : void 0;
      } finally {
        Ur(o), La.transition = i, On = t, (On & (Aa | yl)) === oa && ts();
      }
    }
    function uE() {
      return (On & (Aa | yl)) !== oa;
    }
    function vy(e, t) {
      Ga(Sg, Mo, e), Mo = un(Mo, t);
    }
    function _g(e) {
      Mo = Sg.current, Qa(Sg, e);
    }
    function xc(e, t) {
      e.finishedWork = null, e.finishedLanes = _e;
      var i = e.timeoutHandle;
      if (i !== R0 && (e.timeoutHandle = R0, YT(i)), kr !== null)
        for (var o = kr.return; o !== null; ) {
          var c = o.alternate;
          j3(c, o), o = o.return;
        }
      ci = e;
      var v = _c(e.current, null);
      return kr = v, ua = Mo = t, sa = hu, fp = null, ly = _e, dp = _e, oy = _e, vp = null, Li = null, vb(), Fl.discardPendingWarnings(), v;
    }
    function sE(e, t) {
      do {
        var i = kr;
        try {
          if (Tm(), LS(), Kn(), yg.current = null, i === null || i.return === null) {
            sa = sp, fp = t, kr = null;
            return;
          }
          if (Me && i.mode & Pn && Zm(i, !0), De)
            if (li(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var o = t;
              ll(i, o, ua);
            } else
              As(i, t, ua);
          Vb(e, i.return, i, t, ua), vE(i);
        } catch (c) {
          t = c, kr === i && i !== null ? (i = i.return, kr = i) : i = kr;
          continue;
        }
        return;
      } while (!0);
    }
    function cE() {
      var e = mg.current;
      return mg.current = Bm, e === null ? Bm : e;
    }
    function fE(e) {
      mg.current = e;
    }
    function SM() {
      Eg = Vr();
    }
    function gp(e) {
      ly = un(e, ly);
    }
    function EM() {
      sa === hu && (sa = iy);
    }
    function kg() {
      (sa === hu || sa === iy || sa === Rc) && (sa = cp), ci !== null && (Ys(ly) || Ys(dp)) && ds(ci, ua);
    }
    function CM(e) {
      sa !== cp && (sa = Rc), vp === null ? vp = [e] : vp.push(e);
    }
    function wM() {
      return sa === hu;
    }
    function py(e, t) {
      var i = On;
      On |= Aa;
      var o = cE();
      if (ci !== e || ua !== t) {
        if (Va) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (Sp(e, ua), c.clear()), Eh(e, t);
        }
        mu = sv(), xc(e, t);
      }
      Bo(t);
      do
        try {
          TM();
          break;
        } catch (v) {
          sE(e, v);
        }
      while (!0);
      if (Tm(), On = i, fE(o), kr !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return ef(), ci = null, ua = _e, sa;
    }
    function TM() {
      for (; kr !== null; )
        dE(kr);
    }
    function RM(e, t) {
      var i = On;
      On |= Aa;
      var o = cE();
      if (ci !== e || ua !== t) {
        if (Va) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (Sp(e, ua), c.clear()), Eh(e, t);
        }
        mu = sv(), pp(), xc(e, t);
      }
      Bo(t);
      do
        try {
          bM();
          break;
        } catch (v) {
          sE(e, v);
        }
      while (!0);
      return Tm(), fE(o), On = i, kr !== null ? (fh(), hu) : (ef(), ci = null, ua = _e, sa);
    }
    function bM() {
      for (; kr !== null && !Vd(); )
        dE(kr);
    }
    function dE(e) {
      var t = e.alternate;
      Hn(e);
      var i;
      (e.mode & Pn) !== Ot ? (z1(e), i = Dg(t, e, Mo), Zm(e, !0)) : i = Dg(t, e, Mo), Kn(), e.memoizedProps = e.pendingProps, i === null ? vE(e) : kr = i, yg.current = null;
    }
    function vE(e) {
      var t = e;
      do {
        var i = t.alternate, o = t.return;
        if ((t.flags & Os) === Dt) {
          Hn(t);
          var c = void 0;
          if ((t.mode & Pn) === Ot ? c = U3(i, t, Mo) : (z1(t), c = U3(i, t, Mo), Zm(t, !1)), Kn(), c !== null) {
            kr = c;
            return;
          }
        } else {
          var v = Ex(i, t);
          if (v !== null) {
            v.flags &= ih, kr = v;
            return;
          }
          if ((t.mode & Pn) !== Ot) {
            Zm(t, !1);
            for (var g = t.actualDuration, w = t.child; w !== null; )
              g += w.actualDuration, w = w.sibling;
            t.actualDuration = g;
          }
          if (o !== null)
            o.flags |= Os, o.subtreeFlags = Dt, o.deletions = null;
          else {
            sa = gg, kr = null;
            return;
          }
        }
        var x = t.sibling;
        if (x !== null) {
          kr = x;
          return;
        }
        t = o, kr = t;
      } while (t !== null);
      sa === hu && (sa = eE);
    }
    function Mc(e, t, i) {
      var o = _i(), c = La.transition;
      try {
        La.transition = null, Ur(Ta), xM(e, t, i, o);
      } finally {
        La.transition = c, Ur(o);
      }
      return null;
    }
    function xM(e, t, i, o) {
      do
        gu();
      while (cs !== null);
      if (jM(), (On & (Aa | yl)) !== oa)
        throw new Error("Should not already be working.");
      var c = e.finishedWork, v = e.finishedLanes;
      if (Qd(v), c === null)
        return Gd(), null;
      if (v === _e && p("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = _e, c === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Un;
      var g = un(c.lanes, c.childLanes);
      ov(e, g), e === ci && (ci = null, kr = null, ua = _e), ((c.subtreeFlags & _l) !== Dt || (c.flags & _l) !== Dt) && (bc || (bc = !0, Tg = i, Lg(kl, function() {
        return gu(), null;
      })));
      var w = (c.subtreeFlags & (ro | ao | io | _l)) !== Dt, x = (c.flags & (ro | ao | io | _l)) !== Dt;
      if (w || x) {
        var O = La.transition;
        La.transition = null;
        var L = _i();
        Ur(Ta);
        var B = On;
        On |= yl, yg.current = null, bx(e, c), a3(), Hx(e, c, v), FT(e.containerInfo), e.current = c, Ns(v), Px(c, e, v), Us(), qd(), On = B, Ur(L), La.transition = O;
      } else
        e.current = c, a3();
      var I = bc;
      if (bc ? (bc = !1, cs = e, hp = v) : (fd = 0, cy = null), g = e.pendingLanes, g === _e && (cd = null), I || yE(e.current, !1), Yd(c.stateNode, o), Va && e.memoizedUpdaters.clear(), iM(), Ai(e, Vr()), t !== null)
        for (var le = e.onRecoverableError, ce = 0; ce < t.length; ce++) {
          var ye = t[ce], tt = ye.stack, jt = ye.digest;
          le(ye.value, {
            componentStack: tt,
            digest: jt
          });
        }
      if (uy) {
        uy = !1;
        var bt = Cg;
        throw Cg = null, bt;
      }
      return Ia(hp, It) && e.tag !== es && gu(), g = e.pendingLanes, Ia(g, It) ? (Ob(), e === Rg ? mp++ : (mp = 0, Rg = e)) : mp = 0, ts(), Gd(), null;
    }
    function gu() {
      if (cs !== null) {
        var e = Th(hp), t = Ks(xi, e), i = La.transition, o = _i();
        try {
          return La.transition = null, Ur(t), _M();
        } finally {
          Ur(o), La.transition = i;
        }
      }
      return !1;
    }
    function MM(e) {
      wg.push(e), bc || (bc = !0, Lg(kl, function() {
        return gu(), null;
      }));
    }
    function _M() {
      if (cs === null)
        return !1;
      var e = Tg;
      Tg = null;
      var t = cs, i = hp;
      if (cs = null, hp = _e, (On & (Aa | yl)) !== oa)
        throw new Error("Cannot flush passive effects while already rendering.");
      bg = !0, sy = !1, Wo(i);
      var o = On;
      On |= yl, Bx(t.current), qx(t, t.current, i, e);
      {
        var c = wg;
        wg = [];
        for (var v = 0; v < c.length; v++) {
          var g = c[v];
          kx(t, g);
        }
      }
      Zd(), yE(t.current, !0), On = o, ts(), sy ? t === cy ? fd++ : (fd = 0, cy = t) : fd = 0, bg = !1, sy = !1, Wd(t);
      {
        var w = t.current.stateNode;
        w.effectDuration = 0, w.passiveEffectDuration = 0;
      }
      return !0;
    }
    function pE(e) {
      return cd !== null && cd.has(e);
    }
    function kM(e) {
      cd === null ? cd = /* @__PURE__ */ new Set([e]) : cd.add(e);
    }
    function DM(e) {
      uy || (uy = !0, Cg = e);
    }
    var OM = DM;
    function hE(e, t, i) {
      var o = wc(i, t), c = d3(e, o, It), v = rs(e, c, It), g = fi();
      v !== null && (Vu(v, It, g), Ai(v, g));
    }
    function sr(e, t, i) {
      if (wx(i), Ep(!1), e.tag === R) {
        hE(e, e, i);
        return;
      }
      var o = null;
      for (o = t; o !== null; ) {
        if (o.tag === R) {
          hE(o, e, i);
          return;
        } else if (o.tag === T) {
          var c = o.type, v = o.stateNode;
          if (typeof c.getDerivedStateFromError == "function" || typeof v.componentDidCatch == "function" && !pE(v)) {
            var g = wc(i, e), w = X1(o, g, It), x = rs(o, w, It), O = fi();
            x !== null && (Vu(x, It, O), Ai(x, O));
            return;
          }
        }
        o = o.return;
      }
      p(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, i);
    }
    function zM(e, t, i) {
      var o = e.pingCache;
      o !== null && o.delete(t);
      var c = fi();
      Tf(e, i), $M(e), ci === e && tu(ua, i) && (sa === cp || sa === iy && eu(ua) && Vr() - Eg < tE ? xc(e, _e) : oy = un(oy, i)), Ai(e, c);
    }
    function mE(e, t) {
      t === Un && (t = dM(e));
      var i = fi(), o = Oi(e, t);
      o !== null && (Vu(o, t, i), Ai(o, i));
    }
    function LM(e) {
      var t = e.memoizedState, i = Un;
      t !== null && (i = t.retryLane), mE(e, i);
    }
    function AM(e, t) {
      var i = Un, o;
      switch (e.tag) {
        case $:
          o = e.stateNode;
          var c = e.memoizedState;
          c !== null && (i = c.retryLane);
          break;
        case se:
          o = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      o !== null && o.delete(t), mE(e, i);
    }
    function NM(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : uM(e / 1960) * 1960;
    }
    function UM() {
      if (mp > cM)
        throw mp = 0, Rg = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      fd > fM && (fd = 0, cy = null, p("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function jM() {
      Fl.flushLegacyContextWarning(), Fl.flushPendingUnsafeLifecycleWarnings();
    }
    function yE(e, t) {
      Hn(e), hy(e, no, nM), t && hy(e, rl, rM), hy(e, no, eM), t && hy(e, rl, tM), Kn();
    }
    function hy(e, t, i) {
      for (var o = e, c = null; o !== null; ) {
        var v = o.subtreeFlags & t;
        o !== c && o.child !== null && v !== Dt ? o = o.child : ((o.flags & t) !== Dt && i(o), o.sibling !== null ? o = o.sibling : o = c = o.return);
      }
    }
    var my = null;
    function gE(e) {
      {
        if ((On & Aa) !== oa || !(e.mode & pn))
          return;
        var t = e.tag;
        if (t !== b && t !== R && t !== T && t !== C && t !== Y && t !== Q && t !== re)
          return;
        var i = Vt(e) || "ReactComponent";
        if (my !== null) {
          if (my.has(i))
            return;
          my.add(i);
        } else
          my = /* @__PURE__ */ new Set([i]);
        var o = Tr;
        try {
          Hn(e), p("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          o ? Hn(e) : Kn();
        }
      }
    }
    var Dg;
    {
      var FM = null;
      Dg = function(e, t, i) {
        var o = xE(FM, t);
        try {
          return O3(e, t, i);
        } catch (v) {
          if (XR() || v !== null && typeof v == "object" && typeof v.then == "function")
            throw v;
          if (Tm(), LS(), j3(e, t), xE(t, o), t.mode & Pn && z1(t), to(null, O3, null, e, t, i), xl()) {
            var c = Ds();
            typeof c == "object" && c !== null && c._suppressLogging && typeof v == "object" && v !== null && !v._suppressLogging && (v._suppressLogging = !0);
          }
          throw v;
        }
      };
    }
    var SE = !1, Og;
    Og = /* @__PURE__ */ new Set();
    function HM(e) {
      if (ni && !_b())
        switch (e.tag) {
          case C:
          case Y:
          case re: {
            var t = kr && Vt(kr) || "Unknown", i = t;
            if (!Og.has(i)) {
              Og.add(i);
              var o = Vt(e) || "Unknown";
              p("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", o, t, t);
            }
            break;
          }
          case T: {
            SE || (p("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), SE = !0);
            break;
          }
        }
    }
    function Sp(e, t) {
      if (Va) {
        var i = e.memoizedUpdaters;
        i.forEach(function(o) {
          Gs(e, o, t);
        });
      }
    }
    var zg = {};
    function Lg(e, t) {
      {
        var i = Wl.current;
        return i !== null ? (i.push(t), zg) : $d(e, t);
      }
    }
    function EE(e) {
      if (e !== zg)
        return oh(e);
    }
    function CE() {
      return Wl.current !== null;
    }
    function PM(e) {
      {
        if (e.mode & pn) {
          if (!Z3())
            return;
        } else if (!oM() || On !== oa || e.tag !== C && e.tag !== Y && e.tag !== re)
          return;
        if (Wl.current === null) {
          var t = Tr;
          try {
            Hn(e), p(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Vt(e));
          } finally {
            t ? Hn(e) : Kn();
          }
        }
      }
    }
    function $M(e) {
      e.tag !== es && Z3() && Wl.current === null && p(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Ep(e) {
      aE = e;
    }
    var gl = null, dd = null, VM = function(e) {
      gl = e;
    };
    function vd(e) {
      {
        if (gl === null)
          return e;
        var t = gl(e);
        return t === void 0 ? e : t.current;
      }
    }
    function Ag(e) {
      return vd(e);
    }
    function Ng(e) {
      {
        if (gl === null)
          return e;
        var t = gl(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var i = vd(e.render);
            if (e.render !== i) {
              var o = {
                $$typeof: Ee,
                render: i
              };
              return e.displayName !== void 0 && (o.displayName = e.displayName), o;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function wE(e, t) {
      {
        if (gl === null)
          return !1;
        var i = e.elementType, o = t.type, c = !1, v = typeof o == "object" && o !== null ? o.$$typeof : null;
        switch (e.tag) {
          case T: {
            typeof o == "function" && (c = !0);
            break;
          }
          case C: {
            (typeof o == "function" || v === ct) && (c = !0);
            break;
          }
          case Y: {
            (v === Ee || v === ct) && (c = !0);
            break;
          }
          case Q:
          case re: {
            (v === vt || v === ct) && (c = !0);
            break;
          }
          default:
            return !1;
        }
        if (c) {
          var g = gl(i);
          if (g !== void 0 && g === gl(o))
            return !0;
        }
        return !1;
      }
    }
    function TE(e) {
      {
        if (gl === null || typeof WeakSet != "function")
          return;
        dd === null && (dd = /* @__PURE__ */ new WeakSet()), dd.add(e);
      }
    }
    var qM = function(e, t) {
      {
        if (gl === null)
          return;
        var i = t.staleFamilies, o = t.updatedFamilies;
        gu(), yu(function() {
          Ug(e.current, o, i);
        });
      }
    }, IM = function(e, t) {
      {
        if (e.context !== Yi)
          return;
        gu(), yu(function() {
          Cp(t, e, null, null);
        });
      }
    };
    function Ug(e, t, i) {
      {
        var o = e.alternate, c = e.child, v = e.sibling, g = e.tag, w = e.type, x = null;
        switch (g) {
          case C:
          case re:
          case T:
            x = w;
            break;
          case Y:
            x = w.render;
            break;
        }
        if (gl === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var O = !1, L = !1;
        if (x !== null) {
          var B = gl(x);
          B !== void 0 && (i.has(B) ? L = !0 : t.has(B) && (g === T ? L = !0 : O = !0));
        }
        if (dd !== null && (dd.has(e) || o !== null && dd.has(o)) && (L = !0), L && (e._debugNeedsRemount = !0), L || O) {
          var I = Oi(e, It);
          I !== null && ca(I, e, It, rr);
        }
        c !== null && !L && Ug(c, t, i), v !== null && Ug(v, t, i);
      }
    }
    var YM = function(e, t) {
      {
        var i = /* @__PURE__ */ new Set(), o = new Set(t.map(function(c) {
          return c.current;
        }));
        return jg(e.current, o, i), i;
      }
    };
    function jg(e, t, i) {
      {
        var o = e.child, c = e.sibling, v = e.tag, g = e.type, w = null;
        switch (v) {
          case C:
          case re:
          case T:
            w = g;
            break;
          case Y:
            w = g.render;
            break;
        }
        var x = !1;
        w !== null && t.has(w) && (x = !0), x ? WM(e, i) : o !== null && jg(o, t, i), c !== null && jg(c, t, i);
      }
    }
    function WM(e, t) {
      {
        var i = BM(e, t);
        if (i)
          return;
        for (var o = e; ; ) {
          switch (o.tag) {
            case k:
              t.add(o.stateNode);
              return;
            case D:
              t.add(o.stateNode.containerInfo);
              return;
            case R:
              t.add(o.stateNode.containerInfo);
              return;
          }
          if (o.return === null)
            throw new Error("Expected to reach root first.");
          o = o.return;
        }
      }
    }
    function BM(e, t) {
      for (var i = e, o = !1; ; ) {
        if (i.tag === k)
          o = !0, t.add(i.stateNode);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return o;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return o;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
      return !1;
    }
    var Fg;
    {
      Fg = !1;
      try {
        var RE = Object.preventExtensions({});
      } catch {
        Fg = !0;
      }
    }
    function QM(e, t, i, o) {
      this.tag = e, this.key = i, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = o, this.flags = Dt, this.subtreeFlags = Dt, this.deletions = null, this.lanes = _e, this.childLanes = _e, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !Fg && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var Wi = function(e, t, i, o) {
      return new QM(e, t, i, o);
    };
    function Hg(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function GM(e) {
      return typeof e == "function" && !Hg(e) && e.defaultProps === void 0;
    }
    function XM(e) {
      if (typeof e == "function")
        return Hg(e) ? T : C;
      if (e != null) {
        var t = e.$$typeof;
        if (t === Ee)
          return Y;
        if (t === vt)
          return Q;
      }
      return b;
    }
    function _c(e, t) {
      var i = e.alternate;
      i === null ? (i = Wi(e.tag, t, e.key, e.mode), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i._debugSource = e._debugSource, i._debugOwner = e._debugOwner, i._debugHookTypes = e._debugHookTypes, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = Dt, i.subtreeFlags = Dt, i.deletions = null, i.actualDuration = 0, i.actualStartTime = -1), i.flags = e.flags & Lr, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue;
      var o = e.dependencies;
      switch (i.dependencies = o === null ? null : {
        lanes: o.lanes,
        firstContext: o.firstContext
      }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.selfBaseDuration = e.selfBaseDuration, i.treeBaseDuration = e.treeBaseDuration, i._debugNeedsRemount = e._debugNeedsRemount, i.tag) {
        case b:
        case C:
        case re:
          i.type = vd(e.type);
          break;
        case T:
          i.type = Ag(e.type);
          break;
        case Y:
          i.type = Ng(e.type);
          break;
      }
      return i;
    }
    function KM(e, t) {
      e.flags &= Lr | hr;
      var i = e.alternate;
      if (i === null)
        e.childLanes = _e, e.lanes = t, e.child = null, e.subtreeFlags = Dt, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = Dt, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type;
        var o = i.dependencies;
        e.dependencies = o === null ? null : {
          lanes: o.lanes,
          firstContext: o.firstContext
        }, e.selfBaseDuration = i.selfBaseDuration, e.treeBaseDuration = i.treeBaseDuration;
      }
      return e;
    }
    function ZM(e, t, i) {
      var o;
      return e === vm ? (o = pn, t === !0 && (o |= er, o |= $n)) : o = Ot, Va && (o |= Pn), Wi(R, null, null, o);
    }
    function Pg(e, t, i, o, c, v) {
      var g = b, w = e;
      if (typeof e == "function")
        Hg(e) ? (g = T, w = Ag(w)) : w = vd(w);
      else if (typeof e == "string")
        g = k;
      else
        e: switch (e) {
          case ln:
            return vs(i.children, c, v, t);
          case Qn:
            g = N, c |= er, (c & pn) !== Ot && (c |= $n);
            break;
          case ar:
            return JM(i, c, v, t);
          case pe:
            return e_(i, c, v, t);
          case He:
            return t_(i, c, v, t);
          case Lt:
            return bE(i, c, v, t);
          case At:
          // eslint-disable-next-line no-fallthrough
          case ft:
          // eslint-disable-next-line no-fallthrough
          case zt:
          // eslint-disable-next-line no-fallthrough
          case Nt:
          // eslint-disable-next-line no-fallthrough
          case rt:
          // eslint-disable-next-line no-fallthrough
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case jn:
                  g = K;
                  break e;
                case j:
                  g = X;
                  break e;
                case Ee:
                  g = Y, w = Ng(w);
                  break e;
                case vt:
                  g = Q;
                  break e;
                case ct:
                  g = Re, w = null;
                  break e;
              }
            var x = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (x += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var O = o ? Vt(o) : null;
              O && (x += `

Check the render method of \`` + O + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + x));
          }
        }
      var L = Wi(g, i, t, c);
      return L.elementType = e, L.type = w, L.lanes = v, L._debugOwner = o, L;
    }
    function $g(e, t, i) {
      var o = null;
      o = e._owner;
      var c = e.type, v = e.key, g = e.props, w = Pg(c, v, g, o, t, i);
      return w._debugSource = e._source, w._debugOwner = e._owner, w;
    }
    function vs(e, t, i, o) {
      var c = Wi(A, e, o, t);
      return c.lanes = i, c;
    }
    function JM(e, t, i, o) {
      typeof e.id != "string" && p('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var c = Wi(P, e, o, t | Pn);
      return c.elementType = ar, c.lanes = i, c.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, c;
    }
    function e_(e, t, i, o) {
      var c = Wi($, e, o, t);
      return c.elementType = pe, c.lanes = i, c;
    }
    function t_(e, t, i, o) {
      var c = Wi(se, e, o, t);
      return c.elementType = He, c.lanes = i, c;
    }
    function bE(e, t, i, o) {
      var c = Wi(ae, e, o, t);
      c.elementType = Lt, c.lanes = i;
      var v = {
        isHidden: !1
      };
      return c.stateNode = v, c;
    }
    function Vg(e, t, i) {
      var o = Wi(z, e, null, t);
      return o.lanes = i, o;
    }
    function n_() {
      var e = Wi(k, null, null, Ot);
      return e.elementType = "DELETED", e;
    }
    function r_(e) {
      var t = Wi(G, null, null, Ot);
      return t.stateNode = e, t;
    }
    function qg(e, t, i) {
      var o = e.children !== null ? e.children : [], c = Wi(D, o, e.key, t);
      return c.lanes = i, c.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, c;
    }
    function xE(e, t) {
      return e === null && (e = Wi(b, null, null, Ot)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function a_(e, t, i, o, c) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = R0, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Un, this.eventTimes = Qs(_e), this.expirationTimes = Qs(rr), this.pendingLanes = _e, this.suspendedLanes = _e, this.pingedLanes = _e, this.expiredLanes = _e, this.mutableReadLanes = _e, this.finishedLanes = _e, this.entangledLanes = _e, this.entanglements = Qs(_e), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var v = this.pendingUpdatersLaneMap = [], g = 0; g < Qo; g++)
          v.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case vm:
          this._debugRootType = i ? "hydrateRoot()" : "createRoot()";
          break;
        case es:
          this._debugRootType = i ? "hydrate()" : "render()";
          break;
      }
    }
    function ME(e, t, i, o, c, v, g, w, x, O) {
      var L = new a_(e, t, i, w, x), B = ZM(t, v);
      L.current = B, B.stateNode = L;
      {
        var I = {
          element: o,
          isDehydrated: i,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        B.memoizedState = I;
      }
      return n1(B), L;
    }
    var Ig = "18.3.1";
    function i_(e, t, i) {
      var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return Be(o), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: an,
        key: o == null ? null : "" + o,
        children: e,
        containerInfo: t,
        implementation: i
      };
    }
    var Yg, Wg;
    Yg = !1, Wg = {};
    function _E(e) {
      if (!e)
        return Yi;
      var t = Uu(e), i = $R(t);
      if (t.tag === T) {
        var o = t.type;
        if (Eo(o))
          return tS(t, o, i);
      }
      return i;
    }
    function l_(e, t) {
      {
        var i = Uu(e);
        if (i === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var o = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + o);
        }
        var c = Pa(i);
        if (c === null)
          return null;
        if (c.mode & er) {
          var v = Vt(i) || "Component";
          if (!Wg[v]) {
            Wg[v] = !0;
            var g = Tr;
            try {
              Hn(c), i.mode & er ? p("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, v) : p("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, v);
            } finally {
              g ? Hn(g) : Kn();
            }
          }
        }
        return c.stateNode;
      }
    }
    function kE(e, t, i, o, c, v, g, w) {
      var x = !1, O = null;
      return ME(e, t, x, O, i, o, c, v, g);
    }
    function DE(e, t, i, o, c, v, g, w, x, O) {
      var L = !0, B = ME(i, o, L, e, c, v, g, w, x);
      B.context = _E(null);
      var I = B.current, le = fi(), ce = fs(I), ye = vu(le, ce);
      return ye.callback = t ?? null, rs(I, ye, ce), vM(B, ce, le), B;
    }
    function Cp(e, t, i, o) {
      Id(t, e);
      var c = t.current, v = fi(), g = fs(c);
      yr(g);
      var w = _E(i);
      t.context === null ? t.context = w : t.pendingContext = w, ni && Tr !== null && !Yg && (Yg = !0, p(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Vt(Tr) || "Unknown"));
      var x = vu(v, g);
      x.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (typeof o != "function" && p("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", o), x.callback = o);
      var O = rs(c, x, g);
      return O !== null && (ca(O, c, g, v), _m(O, c, g)), g;
    }
    function yy(e) {
      var t = e.current;
      return t.child ? t.child.tag === k ? t.child.stateNode : t.child.stateNode : null;
    }
    function o_(e) {
      switch (e.tag) {
        case R: {
          var t = e.stateNode;
          if (bf(t)) {
            var i = vh(t);
            yM(t, i);
          }
          break;
        }
        case $: {
          yu(function() {
            var c = Oi(e, It);
            if (c !== null) {
              var v = fi();
              ca(c, e, It, v);
            }
          });
          var o = It;
          Bg(e, o);
          break;
        }
      }
    }
    function OE(e, t) {
      var i = e.memoizedState;
      i !== null && i.dehydrated !== null && (i.retryLane = gh(i.retryLane, t));
    }
    function Bg(e, t) {
      OE(e, t);
      var i = e.alternate;
      i && OE(i, t);
    }
    function u_(e) {
      if (e.tag === $) {
        var t = Vs, i = Oi(e, t);
        if (i !== null) {
          var o = fi();
          ca(i, e, t, o);
        }
        Bg(e, t);
      }
    }
    function s_(e) {
      if (e.tag === $) {
        var t = fs(e), i = Oi(e, t);
        if (i !== null) {
          var o = fi();
          ca(i, e, t, o);
        }
        Bg(e, t);
      }
    }
    function zE(e) {
      var t = fr(e);
      return t === null ? null : t.stateNode;
    }
    var LE = function(e) {
      return null;
    };
    function c_(e) {
      return LE(e);
    }
    var AE = function(e) {
      return !1;
    };
    function f_(e) {
      return AE(e);
    }
    var NE = null, UE = null, jE = null, FE = null, HE = null, PE = null, $E = null, VE = null, qE = null;
    {
      var IE = function(e, t, i) {
        var o = t[i], c = dn(e) ? e.slice() : $t({}, e);
        return i + 1 === t.length ? (dn(c) ? c.splice(o, 1) : delete c[o], c) : (c[o] = IE(e[o], t, i + 1), c);
      }, YE = function(e, t) {
        return IE(e, t, 0);
      }, WE = function(e, t, i, o) {
        var c = t[o], v = dn(e) ? e.slice() : $t({}, e);
        if (o + 1 === t.length) {
          var g = i[o];
          v[g] = v[c], dn(v) ? v.splice(c, 1) : delete v[c];
        } else
          v[c] = WE(
            // $FlowFixMe number or string is fine here
            e[c],
            t,
            i,
            o + 1
          );
        return v;
      }, BE = function(e, t, i) {
        if (t.length !== i.length) {
          m("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var o = 0; o < i.length - 1; o++)
            if (t[o] !== i[o]) {
              m("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return WE(e, t, i, 0);
      }, QE = function(e, t, i, o) {
        if (i >= t.length)
          return o;
        var c = t[i], v = dn(e) ? e.slice() : $t({}, e);
        return v[c] = QE(e[c], t, i + 1, o), v;
      }, GE = function(e, t, i) {
        return QE(e, t, 0, i);
      }, Qg = function(e, t) {
        for (var i = e.memoizedState; i !== null && t > 0; )
          i = i.next, t--;
        return i;
      };
      NE = function(e, t, i, o) {
        var c = Qg(e, t);
        if (c !== null) {
          var v = GE(c.memoizedState, i, o);
          c.memoizedState = v, c.baseState = v, e.memoizedProps = $t({}, e.memoizedProps);
          var g = Oi(e, It);
          g !== null && ca(g, e, It, rr);
        }
      }, UE = function(e, t, i) {
        var o = Qg(e, t);
        if (o !== null) {
          var c = YE(o.memoizedState, i);
          o.memoizedState = c, o.baseState = c, e.memoizedProps = $t({}, e.memoizedProps);
          var v = Oi(e, It);
          v !== null && ca(v, e, It, rr);
        }
      }, jE = function(e, t, i, o) {
        var c = Qg(e, t);
        if (c !== null) {
          var v = BE(c.memoizedState, i, o);
          c.memoizedState = v, c.baseState = v, e.memoizedProps = $t({}, e.memoizedProps);
          var g = Oi(e, It);
          g !== null && ca(g, e, It, rr);
        }
      }, FE = function(e, t, i) {
        e.pendingProps = GE(e.memoizedProps, t, i), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Oi(e, It);
        o !== null && ca(o, e, It, rr);
      }, HE = function(e, t) {
        e.pendingProps = YE(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Oi(e, It);
        i !== null && ca(i, e, It, rr);
      }, PE = function(e, t, i) {
        e.pendingProps = BE(e.memoizedProps, t, i), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Oi(e, It);
        o !== null && ca(o, e, It, rr);
      }, $E = function(e) {
        var t = Oi(e, It);
        t !== null && ca(t, e, It, rr);
      }, VE = function(e) {
        LE = e;
      }, qE = function(e) {
        AE = e;
      };
    }
    function d_(e) {
      var t = Pa(e);
      return t === null ? null : t.stateNode;
    }
    function v_(e) {
      return null;
    }
    function p_() {
      return Tr;
    }
    function h_(e) {
      var t = e.findFiberByHostInstance, i = s.ReactCurrentDispatcher;
      return Hu({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: NE,
        overrideHookStateDeletePath: UE,
        overrideHookStateRenamePath: jE,
        overrideProps: FE,
        overridePropsDeletePath: HE,
        overridePropsRenamePath: PE,
        setErrorHandler: VE,
        setSuspenseHandler: qE,
        scheduleUpdate: $E,
        currentDispatcherRef: i,
        findHostInstanceByFiber: d_,
        findFiberByHostInstance: t || v_,
        // React Refresh
        findHostInstancesForRefresh: YM,
        scheduleRefresh: qM,
        scheduleRoot: IM,
        setRefreshHandler: VM,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: p_,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: Ig
      });
    }
    var XE = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function Gg(e) {
      this._internalRoot = e;
    }
    gy.prototype.render = Gg.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? p("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : Sy(arguments[1]) ? p("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && p("You passed a second argument to root.render(...) but it only accepts one argument.");
        var i = t.containerInfo;
        if (i.nodeType !== Or) {
          var o = zE(t.current);
          o && o.parentNode !== i && p("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Cp(e, t, null, null);
    }, gy.prototype.unmount = Gg.prototype.unmount = function() {
      typeof arguments[0] == "function" && p("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        uE() && p("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), yu(function() {
          Cp(null, e, null, null);
        }), X2(t);
      }
    };
    function m_(e, t) {
      if (!Sy(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      KE(e);
      var i = !1, o = !1, c = "", v = XE;
      t != null && (t.hydrate ? m("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Kt && p(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (c = t.identifierPrefix), t.onRecoverableError !== void 0 && (v = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var g = kE(e, vm, null, i, o, c, v);
      lm(g.current, e);
      var w = e.nodeType === Or ? e.parentNode : e;
      return Mv(w), new Gg(g);
    }
    function gy(e) {
      this._internalRoot = e;
    }
    function y_(e) {
      e && _h(e);
    }
    gy.prototype.unstable_scheduleHydration = y_;
    function g_(e, t, i) {
      if (!Sy(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      KE(e), t === void 0 && p("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var o = i ?? null, c = i != null && i.hydratedSources || null, v = !1, g = !1, w = "", x = XE;
      i != null && (i.unstable_strictMode === !0 && (v = !0), i.identifierPrefix !== void 0 && (w = i.identifierPrefix), i.onRecoverableError !== void 0 && (x = i.onRecoverableError));
      var O = DE(t, null, e, vm, o, v, g, w, x);
      if (lm(O.current, e), Mv(e), c)
        for (var L = 0; L < c.length; L++) {
          var B = c[L];
          wb(O, B);
        }
      return new gy(O);
    }
    function Sy(e) {
      return !!(e && (e.nodeType === ja || e.nodeType === bl || e.nodeType === kd));
    }
    function wp(e) {
      return !!(e && (e.nodeType === ja || e.nodeType === bl || e.nodeType === kd || e.nodeType === Or && e.nodeValue === " react-mount-point-unstable "));
    }
    function KE(e) {
      e.nodeType === ja && e.tagName && e.tagName.toUpperCase() === "BODY" && p("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Fv(e) && (e._reactRootContainer ? p("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : p("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var S_ = s.ReactCurrentOwner, ZE;
    ZE = function(e) {
      if (e._reactRootContainer && e.nodeType !== Or) {
        var t = zE(e._reactRootContainer.current);
        t && t.parentNode !== e && p("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var i = !!e._reactRootContainer, o = Xg(e), c = !!(o && Zu(o));
      c && !i && p("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === ja && e.tagName && e.tagName.toUpperCase() === "BODY" && p("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function Xg(e) {
      return e ? e.nodeType === bl ? e.documentElement : e.firstChild : null;
    }
    function JE() {
    }
    function E_(e, t, i, o, c) {
      if (c) {
        if (typeof o == "function") {
          var v = o;
          o = function() {
            var I = yy(g);
            v.call(I);
          };
        }
        var g = DE(
          t,
          o,
          e,
          es,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          JE
        );
        e._reactRootContainer = g, lm(g.current, e);
        var w = e.nodeType === Or ? e.parentNode : e;
        return Mv(w), yu(), g;
      } else {
        for (var x; x = e.lastChild; )
          e.removeChild(x);
        if (typeof o == "function") {
          var O = o;
          o = function() {
            var I = yy(L);
            O.call(I);
          };
        }
        var L = kE(
          e,
          es,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          JE
        );
        e._reactRootContainer = L, lm(L.current, e);
        var B = e.nodeType === Or ? e.parentNode : e;
        return Mv(B), yu(function() {
          Cp(t, L, i, o);
        }), L;
      }
    }
    function C_(e, t) {
      e !== null && typeof e != "function" && p("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Ey(e, t, i, o, c) {
      ZE(i), C_(c === void 0 ? null : c, "render");
      var v = i._reactRootContainer, g;
      if (!v)
        g = E_(i, t, e, c, o);
      else {
        if (g = v, typeof c == "function") {
          var w = c;
          c = function() {
            var x = yy(g);
            w.call(x);
          };
        }
        Cp(t, g, e, c);
      }
      return yy(g);
    }
    var eC = !1;
    function w_(e) {
      {
        eC || (eC = !0, p("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = S_.current;
        if (t !== null && t.stateNode !== null) {
          var i = t.stateNode._warnedAboutRefsInRender;
          i || p("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", on(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === ja ? e : l_(e, "findDOMNode");
    }
    function T_(e, t, i) {
      if (p("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !wp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = Fv(t) && t._reactRootContainer === void 0;
        o && p("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Ey(null, e, t, !0, i);
    }
    function R_(e, t, i) {
      if (p("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !wp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = Fv(t) && t._reactRootContainer === void 0;
        o && p("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Ey(null, e, t, !1, i);
    }
    function b_(e, t, i, o) {
      if (p("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !wp(i))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !By(e))
        throw new Error("parentComponent must be a valid React Component");
      return Ey(e, t, i, !1, o);
    }
    var tC = !1;
    function x_(e) {
      if (tC || (tC = !0, p("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !wp(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Fv(e) && e._reactRootContainer === void 0;
        t && p("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var i = Xg(e), o = i && !Zu(i);
          o && p("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return yu(function() {
          Ey(null, null, e, !1, function() {
            e._reactRootContainer = null, X2(e);
          });
        }), !0;
      } else {
        {
          var c = Xg(e), v = !!(c && Zu(c)), g = e.nodeType === ja && wp(e.parentNode) && !!e.parentNode._reactRootContainer;
          v && p("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", g ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    ga(o_), qu(u_), Rh(s_), Js(_i), cv(Ch), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && p("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), $c(_T), Wy(Mg, gM, yu);
    function M_(e, t) {
      var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Sy(t))
        throw new Error("Target container is not a DOM element.");
      return i_(e, t, null, i);
    }
    function __(e, t, i, o) {
      return b_(e, t, i, o);
    }
    var Kg = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Zu, If, om, zu, Vc, Mg]
    };
    function k_(e, t) {
      return Kg.usingClientEntryPoint || p('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), m_(e, t);
    }
    function D_(e, t, i) {
      return Kg.usingClientEntryPoint || p('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), g_(e, t, i);
    }
    function O_(e) {
      return uE() && p("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), yu(e);
    }
    var z_ = h_({
      findFiberByHostInstance: vc,
      bundleType: 1,
      version: Ig,
      rendererPackageName: "react-dom"
    });
    if (!z_ && Ze && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var nC = window.location.protocol;
      /^(https?|file):$/.test(nC) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (nC === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Ui.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Kg, Ui.createPortal = M_, Ui.createRoot = k_, Ui.findDOMNode = w_, Ui.flushSync = O_, Ui.hydrate = T_, Ui.hydrateRoot = D_, Ui.render = R_, Ui.unmountComponentAtNode = x_, Ui.unstable_batchedUpdates = Mg, Ui.unstable_renderSubtreeIntoContainer = __, Ui.version = Ig, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })()), Ui;
}
var mC;
function x4() {
  if (mC) return Ty.exports;
  mC = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (l) {
        console.error(l);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (n(), Ty.exports = R4()) : Ty.exports = b4(), Ty.exports;
}
var yC;
function M4() {
  if (yC) return hd;
  yC = 1;
  var n = x4();
  if (process.env.NODE_ENV === "production")
    hd.createRoot = n.createRoot, hd.hydrateRoot = n.hydrateRoot;
  else {
    var l = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    hd.createRoot = function(s, d) {
      l.usingClientEntryPoint = !0;
      try {
        return n.createRoot(s, d);
      } finally {
        l.usingClientEntryPoint = !1;
      }
    }, hd.hydrateRoot = function(s, d, h) {
      l.usingClientEntryPoint = !0;
      try {
        return n.hydrateRoot(s, d, h);
      } finally {
        l.usingClientEntryPoint = !1;
      }
    };
  }
  return hd;
}
var _4 = M4();
const ps = (n) => typeof n != "number" ? "N/A" : `${Math.round(n)} ms`;
function k4({ viewport: n }) {
  const [l, s] = Sl.useState({
    fps: 0,
    maxFps: 0,
    totalObjects: 0,
    visibleObjects: 0,
    faces: 0,
    sortTime: 0,
    cullTime: 0,
    groupTime: 0,
    processTime: 0,
    drawTime: 0,
    updateTime: 0,
    retrieveTime: 0,
    frameTime: 0,
    drawCalls: 0,
    dt: 0
  }), [d, h] = Sl.useState(() => localStorage.getItem("s3d-debug-open") === "true"), [m, p] = Sl.useState(() => localStorage.getItem("s3d-wireframe") === "true"), [E, C] = Sl.useState(() => localStorage.getItem("s3d-debug-normals") === "true"), [T, b] = Sl.useState(() => localStorage.getItem("s3d-debug-axis") === "true");
  Sl.useEffect(() => {
    n && (n.wireframe = m, n.debugNormals = E, n.debugAxis = T);
  }, [n]), Sl.useEffect(() => {
    const z = () => {
      n && (p(!!n.wireframe), C(!!n.debugNormals), b(!!n.debugAxis));
    };
    z();
    const A = setInterval(z, 500);
    return () => clearInterval(A);
  }, [n]), Sl.useEffect(() => {
    localStorage.setItem("s3d-debug-open", d);
  }, [d]), Sl.useEffect(() => {
    localStorage.setItem("s3d-wireframe", m);
  }, [m]), Sl.useEffect(() => {
    localStorage.setItem("s3d-debug-normals", E);
  }, [E]), Sl.useEffect(() => {
    localStorage.setItem("s3d-debug-axis", T);
  }, [T]), Sl.useEffect(() => {
    let z = 0;
    const A = setInterval(() => {
      if (n) {
        const N = n.lastRenderStats || {};
        z = Math.max(z, N.fps || 0), s({
          fps: N.fps || 0,
          maxFps: z,
          totalObjects: N.totalObjects || 0,
          visibleObjects: N.visibleObjects || 0,
          faces: N.faces || 0,
          sortTime: N.sortTime || 0,
          cullTime: N.cullTime || 0,
          groupTime: N.groupTime || 0,
          processTime: N.processTime || 0,
          drawTime: N.drawTime || 0,
          updateTime: N.updateTime || 0,
          retrieveTime: N.retrieveTime || 0,
          frameTime: N.frameTime || 0,
          drawCalls: N.drawCalls || 0,
          dt: N.dt || 0
        });
      }
    }, 100);
    return () => clearInterval(A);
  }, [n]);
  const R = () => {
    const z = !m;
    p(z), n && (n.wireframe = z), window.dispatchEvent(new CustomEvent("s3d-wireframe-change", {
      detail: { enabled: z }
    }));
  }, D = () => {
    const z = !E;
    C(z), n && (n.debugNormals = z);
  }, k = () => {
    const z = !T;
    b(z), n && (n.debugAxis = z);
  };
  return /* @__PURE__ */ _t.jsxs("div", { className: "s3d-debug-container s3d-flex s3d-flex-col s3d-items-end s3d-gap-2 s3d-font-sans", children: [
    /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-gap-2", children: [
      /* @__PURE__ */ _t.jsx(
        "button",
        {
          onClick: R,
          title: "Toggle Wireframe",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${m ? "s3d-bg-blue-600/80 s3d-border-blue-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ _t.jsx("svg", { className: "s3d-w-5 s3d-h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ _t.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25m-9-5.25v9l9 5.25M12 12.75v9" }) })
        }
      ),
      /* @__PURE__ */ _t.jsx(
        "button",
        {
          onClick: D,
          title: "Toggle Debug Normals",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${E ? "s3d-bg-amber-600/80 s3d-border-amber-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ _t.jsxs("svg", { className: "s3d-w-5 s3d-h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: [
            /* @__PURE__ */ _t.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 17l8-10 8 10H4z" }),
            /* @__PURE__ */ _t.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 13V3" })
          ] })
        }
      ),
      /* @__PURE__ */ _t.jsx(
        "button",
        {
          onClick: k,
          title: "Toggle Debug Axis",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${T ? "s3d-bg-purple-600/80 s3d-border-purple-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ _t.jsx("svg", { className: "s3d-w-5 s3d-h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ _t.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 12L20 12M12 12L12 4M12 12L6 18" }) })
        }
      ),
      /* @__PURE__ */ _t.jsx(
        "button",
        {
          onClick: () => h(!d),
          title: "Toggle Diagnostics",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${d ? "s3d-bg-emerald-600/80 s3d-border-emerald-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ _t.jsx("svg", { className: "s3d-w-5 s3d-h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ _t.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9zm0 0v3m-6.36 1.36l2.12 2.12M12 12l3.54-3.54" }) })
        }
      )
    ] }),
    d && /* @__PURE__ */ _t.jsxs("div", { className: "s3d-w-56 s3d-bg-slate-900/85 s3d-backdrop-blur-md s3d-border s3d-border-slate-700/50 s3d-rounded-lg s3d-p-3 s3d-shadow-2xl s3d-text-slate-300 s3d-flex s3d-flex-col", children: [
      /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-justify-between s3d-items-center s3d-border-b s3d-border-slate-800 s3d-pb-1.5 s3d-mb-2.5", children: [
        /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide s3d-font-semibold", children: "FPS / FPS (max)" }),
        /* @__PURE__ */ _t.jsxs("span", { className: "s3d-font-mono s3d-text-sm s3d-font-semibold", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-emerald-400", children: l.fps }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500", children: " / " }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-200", children: l.maxFps })
        ] })
      ] }),
      /* @__PURE__ */ _t.jsxs("div", { className: "s3d-grid s3d-grid-cols-2 s3d-gap-y-2.5 s3d-gap-x-3 s3d-text-[11px]", children: [
        /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Device DPR" }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: (window.devicePixelRatio || 1).toFixed(2) })
        ] }),
        /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Scene)" }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: l.totalObjects })
        ] }),
        /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Screen)" }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: l.visibleObjects })
        ] }),
        /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Faces (screen)" }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: l.faces })
        ] }),
        /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Update" }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ps(l.updateTime) })
        ] }),
        /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Retrieval" }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ps(l.retrieveTime) })
        ] }),
        /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Object Culling" }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ps(l.cullTime) })
        ] }),
        /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Layer Grouping" }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ps(l.groupTime) })
        ] }),
        /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Process Meshes" }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ps(l.processTime) })
        ] }),
        /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Sort Faces" }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ps(l.sortTime) })
        ] }),
        /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Rasterize Faces" }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ps(l.drawTime) })
        ] }),
        /* @__PURE__ */ _t.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Render (total)" }),
          /* @__PURE__ */ _t.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ps(l.dt) })
        ] })
      ] })
    ] })
  ] });
}
function D4(n) {
  if (!n || !n.canvas) {
    console.error("showDebug: Invalid viewport parameter passed.");
    return;
  }
  const s = n.canvas.parentElement || document.body;
  s && getComputedStyle(s).position === "static" && (s.style.position = "relative");
  let d = s.querySelector("#s3d-debug-root");
  if (d)
    return;
  d = document.createElement("div"), d.id = "s3d-debug-root", d.className = "s3d-absolute s3d-top-4 s3d-right-4 s3d-z-[99999]", s.appendChild(d), _4.createRoot(d).render(/* @__PURE__ */ _t.jsx(k4, { viewport: n }));
}
const A4 = window.scaliaEngine = {
  config: yd,
  Game: CC,
  GameObject: pi,
  Component: ur,
  Camera: Uw,
  CameraComponent: Pr,
  MeshComponent: Xr,
  TransformComponent: Ny,
  SpriteRenderer: m2,
  glMatrix: Gz,
  PathRenderer: y2,
  TextRenderer: g2,
  Plane: jw,
  Box: Fw,
  Cone: Hw,
  Ball: w2,
  Light: gd,
  Canvas2dViewport: Bw,
  showDebug: D4,
  // Registers a consumer shader function and returns the numeric key to assign to
  // MeshComponent#shaderType (see shaders/shaderRegistry.js for the full argument contract).
  registerShader: o4,
  // sub3d's own built-in shaders (reserved as shaderType 0/1/2/3/4 respectively - no
  // registration needed), also usable directly as a reference for writing an original shader.
  shaders: {
    flat: Pw,
    emissive: $w,
    unlit: Vw,
    avgFlat: Iw,
    smooth: qw
  }
};
export {
  A4 as default
};
