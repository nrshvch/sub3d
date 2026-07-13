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
function gE() {
  this.now = Date.now();
}
var aS = gE.prototype;
aS.time = 0;
aS.now = 0;
aS.dt = 60;
function SE() {
  this.gameObjects = [];
}
var _y = SE.prototype;
_y.gameObjects = null;
_y.addGameObject = function(n) {
  this.gameObjects[this.gameObjects.length++] = n, n.setScene(this);
};
_y.removeGameObject = function(n) {
  this.gameObjects[this.gameObjects.indexOf(n)] = this.gameObjects[this.gameObjects.length - 1], this.gameObjects.length -= 1;
};
_y.retrieve = function() {
  const n = [], l = [];
  let s = 0, p = 0;
  for (let h = this.gameObjects.length - 1; h >= 0; h--)
    n[p++] = this.gameObjects[h];
  for (; p > 0; ) {
    const h = n[--p];
    h.transform.updateWorldMatrix(), l[s++] = h;
    const y = h.transform.children;
    for (let v = y.length - 1; v >= 0; v--)
      n[p++] = y[v].gameObject;
  }
  return l;
};
function xE(n) {
  this.time = new gE(), this.list = [], this.scene = new SE(), this.lastTickTime = 0;
}
var Sd = xE.prototype;
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
  for (var n = Date.now(), l = 0, s = n - this.time.now, p = this.time.dt; s >= p && (s -= p, this.time.now += p, this.time.time += p, this.update(this.time), !(l++ > 200)); )
    ;
};
function EE() {
  this.world = new xE();
  var n = this.world;
  this.tick = function l() {
    const s = performance.now();
    n.tick(), n.lastTickTime = performance.now() - s, requestAnimationFrame(l);
  };
}
var ky = EE.prototype;
ky.world = null;
ky.render = null;
ky.run = function() {
  this.tick();
};
ky.rafHandler = null;
function dr() {
}
var Dy = dr.prototype;
Dy.gameObject = null;
Dy.enabled = !0;
Dy.setGameObject = function(n) {
  this.gameObject = n;
};
Dy.unsetGameObject = function() {
  this.gameObject = null;
};
function k_(n, l, s, p, h, y) {
  return n[l] = y[0] * s + y[4] * p + y[8] * h + y[12], n[l + 1] = y[1] * s + y[5] * p + y[9] * h + y[13], n[l + 2] = y[2] * s + y[6] * p + y[10] * h + y[14], n;
}
function D_(n, l, s, p, h, y) {
  return n[l] = y[0] * s + y[4] * p + y[8] * h + y[12], n[l + 1] = y[1] * s + y[5] * p + y[9] * h + y[13], n;
}
function Oy(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = l[4], C = l[5], T = l[6], M = l[7], R = l[8], D = l[9], O = l[10], L = l[11], j = l[12], F = l[13], K = l[14], J = l[15], B = s[0], ee = s[1], q = s[2], re = s[3];
  return n[0] = B * p + ee * E + q * R + re * j, n[1] = B * h + ee * C + q * D + re * F, n[2] = B * y + ee * T + q * O + re * K, n[3] = B * v + ee * M + q * L + re * J, B = s[4], ee = s[5], q = s[6], re = s[7], n[4] = B * p + ee * E + q * R + re * j, n[5] = B * h + ee * C + q * D + re * F, n[6] = B * y + ee * T + q * O + re * K, n[7] = B * v + ee * M + q * L + re * J, B = s[8], ee = s[9], q = s[10], re = s[11], n[8] = B * p + ee * E + q * R + re * j, n[9] = B * h + ee * C + q * D + re * F, n[10] = B * y + ee * T + q * O + re * K, n[11] = B * v + ee * M + q * L + re * J, B = s[12], ee = s[13], q = s[14], re = s[15], n[12] = B * p + ee * E + q * R + re * j, n[13] = B * h + ee * C + q * D + re * F, n[14] = B * y + ee * T + q * O + re * K, n[15] = B * v + ee * M + q * L + re * J, n;
}
var ct = 1e-6, gn = typeof Float32Array < "u" ? Float32Array : Array, lo = Math.random, CE = "zyx";
function Ho(n) {
  return n >= 0 ? Math.round(n) : n % 0.5 === 0 ? Math.floor(n) : Math.round(n);
}
function O_(n) {
  gn = n;
}
var z_ = Math.PI / 180, L_ = 180 / Math.PI;
function A_(n) {
  return n * z_;
}
function N_(n) {
  return n * L_;
}
function U_(n, l) {
  var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ct;
  return Math.abs(n - l) <= s * Math.max(1, Math.abs(n), Math.abs(l));
}
const j_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: CE,
  get ARRAY_TYPE() {
    return gn;
  },
  EPSILON: ct,
  RANDOM: lo,
  equals: U_,
  round: Ho,
  setMatrixArrayType: O_,
  toDegree: N_,
  toRadian: A_
}, Symbol.toStringTag, { value: "Module" }));
function F_() {
  var n = new gn(4);
  return gn != Float32Array && (n[1] = 0, n[2] = 0), n[0] = 1, n[3] = 1, n;
}
function P_(n) {
  var l = new gn(4);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l;
}
function H_(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n;
}
function $_(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function V_(n, l, s, p) {
  var h = new gn(4);
  return h[0] = n, h[1] = l, h[2] = s, h[3] = p, h;
}
function I_(n, l, s, p, h) {
  return n[0] = l, n[1] = s, n[2] = p, n[3] = h, n;
}
function B_(n, l) {
  if (n === l) {
    var s = l[1];
    n[1] = l[2], n[2] = s;
  } else
    n[0] = l[0], n[1] = l[2], n[2] = l[1], n[3] = l[3];
  return n;
}
function q_(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = s * y - h * p;
  return v ? (v = 1 / v, n[0] = y * v, n[1] = -p * v, n[2] = -h * v, n[3] = s * v, n) : null;
}
function Y_(n, l) {
  var s = l[0];
  return n[0] = l[3], n[1] = -l[1], n[2] = -l[2], n[3] = s, n;
}
function W_(n) {
  return n[0] * n[3] - n[2] * n[1];
}
function TE(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = s[0], C = s[1], T = s[2], M = s[3];
  return n[0] = p * E + y * C, n[1] = h * E + v * C, n[2] = p * T + y * M, n[3] = h * T + v * M, n;
}
function Q_(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = Math.sin(s), C = Math.cos(s);
  return n[0] = p * C + y * E, n[1] = h * C + v * E, n[2] = p * -E + y * C, n[3] = h * -E + v * C, n;
}
function G_(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = s[0], C = s[1];
  return n[0] = p * E, n[1] = h * E, n[2] = y * C, n[3] = v * C, n;
}
function X_(n, l) {
  var s = Math.sin(l), p = Math.cos(l);
  return n[0] = p, n[1] = s, n[2] = -s, n[3] = p, n;
}
function K_(n, l) {
  return n[0] = l[0], n[1] = 0, n[2] = 0, n[3] = l[1], n;
}
function Z_(n) {
  return "mat2(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
function J_(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3]);
}
function ek(n, l, s, p) {
  return n[2] = p[2] / p[0], s[0] = p[0], s[1] = p[1], s[3] = p[3] - n[2] * s[1], [n, l, s];
}
function tk(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n;
}
function wE(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n[2] = l[2] - s[2], n[3] = l[3] - s[3], n;
}
function nk(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2] && n[3] === l[3];
}
function rk(n, l) {
  var s = n[0], p = n[1], h = n[2], y = n[3], v = l[0], E = l[1], C = l[2], T = l[3];
  return Math.abs(s - v) <= ct * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(p - E) <= ct * Math.max(1, Math.abs(p), Math.abs(E)) && Math.abs(h - C) <= ct * Math.max(1, Math.abs(h), Math.abs(C)) && Math.abs(y - T) <= ct * Math.max(1, Math.abs(y), Math.abs(T));
}
function ak(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n[3] = l[3] * s, n;
}
function ik(n, l, s, p) {
  return n[0] = l[0] + s[0] * p, n[1] = l[1] + s[1] * p, n[2] = l[2] + s[2] * p, n[3] = l[3] + s[3] * p, n;
}
var lk = TE, ok = wE;
const uk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: ek,
  add: tk,
  adjoint: Y_,
  clone: P_,
  copy: H_,
  create: F_,
  determinant: W_,
  equals: rk,
  exactEquals: nk,
  frob: J_,
  fromRotation: X_,
  fromScaling: K_,
  fromValues: V_,
  identity: $_,
  invert: q_,
  mul: lk,
  multiply: TE,
  multiplyScalar: ak,
  multiplyScalarAndAdd: ik,
  rotate: Q_,
  scale: G_,
  set: I_,
  str: Z_,
  sub: ok,
  subtract: wE,
  transpose: B_
}, Symbol.toStringTag, { value: "Module" }));
function sk() {
  var n = new gn(6);
  return gn != Float32Array && (n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0), n[0] = 1, n[3] = 1, n;
}
function ck(n) {
  var l = new gn(6);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l[4] = n[4], l[5] = n[5], l;
}
function fk(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = l[4], n[5] = l[5], n;
}
function dk(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function pk(n, l, s, p, h, y) {
  var v = new gn(6);
  return v[0] = n, v[1] = l, v[2] = s, v[3] = p, v[4] = h, v[5] = y, v;
}
function vk(n, l, s, p, h, y, v) {
  return n[0] = l, n[1] = s, n[2] = p, n[3] = h, n[4] = y, n[5] = v, n;
}
function hk(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = l[4], E = l[5], C = s * y - p * h;
  return C ? (C = 1 / C, n[0] = y * C, n[1] = -p * C, n[2] = -h * C, n[3] = s * C, n[4] = (h * E - y * v) * C, n[5] = (p * v - s * E) * C, n) : null;
}
function mk(n) {
  return n[0] * n[3] - n[1] * n[2];
}
function RE(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = l[4], C = l[5], T = s[0], M = s[1], R = s[2], D = s[3], O = s[4], L = s[5];
  return n[0] = p * T + y * M, n[1] = h * T + v * M, n[2] = p * R + y * D, n[3] = h * R + v * D, n[4] = p * O + y * L + E, n[5] = h * O + v * L + C, n;
}
function yk(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = l[4], C = l[5], T = Math.sin(s), M = Math.cos(s);
  return n[0] = p * M + y * T, n[1] = h * M + v * T, n[2] = p * -T + y * M, n[3] = h * -T + v * M, n[4] = E, n[5] = C, n;
}
function gk(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = l[4], C = l[5], T = s[0], M = s[1];
  return n[0] = p * T, n[1] = h * T, n[2] = y * M, n[3] = v * M, n[4] = E, n[5] = C, n;
}
function Sk(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = l[4], C = l[5], T = s[0], M = s[1];
  return n[0] = p, n[1] = h, n[2] = y, n[3] = v, n[4] = p * T + y * M + E, n[5] = h * T + v * M + C, n;
}
function xk(n, l) {
  var s = Math.sin(l), p = Math.cos(l);
  return n[0] = p, n[1] = s, n[2] = -s, n[3] = p, n[4] = 0, n[5] = 0, n;
}
function Ek(n, l) {
  return n[0] = l[0], n[1] = 0, n[2] = 0, n[3] = l[1], n[4] = 0, n[5] = 0, n;
}
function Ck(n, l) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = l[0], n[5] = l[1], n;
}
function Tk(n) {
  return "mat2d(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ")";
}
function wk(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + 1);
}
function Rk(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n[4] = l[4] + s[4], n[5] = l[5] + s[5], n;
}
function bE(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n[2] = l[2] - s[2], n[3] = l[3] - s[3], n[4] = l[4] - s[4], n[5] = l[5] - s[5], n;
}
function bk(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n[3] = l[3] * s, n[4] = l[4] * s, n[5] = l[5] * s, n;
}
function Mk(n, l, s, p) {
  return n[0] = l[0] + s[0] * p, n[1] = l[1] + s[1] * p, n[2] = l[2] + s[2] * p, n[3] = l[3] + s[3] * p, n[4] = l[4] + s[4] * p, n[5] = l[5] + s[5] * p, n;
}
function _k(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2] && n[3] === l[3] && n[4] === l[4] && n[5] === l[5];
}
function kk(n, l) {
  var s = n[0], p = n[1], h = n[2], y = n[3], v = n[4], E = n[5], C = l[0], T = l[1], M = l[2], R = l[3], D = l[4], O = l[5];
  return Math.abs(s - C) <= ct * Math.max(1, Math.abs(s), Math.abs(C)) && Math.abs(p - T) <= ct * Math.max(1, Math.abs(p), Math.abs(T)) && Math.abs(h - M) <= ct * Math.max(1, Math.abs(h), Math.abs(M)) && Math.abs(y - R) <= ct * Math.max(1, Math.abs(y), Math.abs(R)) && Math.abs(v - D) <= ct * Math.max(1, Math.abs(v), Math.abs(D)) && Math.abs(E - O) <= ct * Math.max(1, Math.abs(E), Math.abs(O));
}
var Dk = RE, Ok = bE;
const zk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Rk,
  clone: ck,
  copy: fk,
  create: sk,
  determinant: mk,
  equals: kk,
  exactEquals: _k,
  frob: wk,
  fromRotation: xk,
  fromScaling: Ek,
  fromTranslation: Ck,
  fromValues: pk,
  identity: dk,
  invert: hk,
  mul: Dk,
  multiply: RE,
  multiplyScalar: bk,
  multiplyScalarAndAdd: Mk,
  rotate: yk,
  scale: gk,
  set: vk,
  str: Tk,
  sub: Ok,
  subtract: bE,
  translate: Sk
}, Symbol.toStringTag, { value: "Module" }));
function ME() {
  var n = new gn(9);
  return gn != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[0] = 1, n[4] = 1, n[8] = 1, n;
}
function Lk(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[4], n[4] = l[5], n[5] = l[6], n[6] = l[8], n[7] = l[9], n[8] = l[10], n;
}
function Ak(n) {
  var l = new gn(9);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l[4] = n[4], l[5] = n[5], l[6] = n[6], l[7] = n[7], l[8] = n[8], l;
}
function Nk(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = l[4], n[5] = l[5], n[6] = l[6], n[7] = l[7], n[8] = l[8], n;
}
function Uk(n, l, s, p, h, y, v, E, C) {
  var T = new gn(9);
  return T[0] = n, T[1] = l, T[2] = s, T[3] = p, T[4] = h, T[5] = y, T[6] = v, T[7] = E, T[8] = C, T;
}
function jk(n, l, s, p, h, y, v, E, C, T) {
  return n[0] = l, n[1] = s, n[2] = p, n[3] = h, n[4] = y, n[5] = v, n[6] = E, n[7] = C, n[8] = T, n;
}
function Fk(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 1, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function Pk(n, l) {
  if (n === l) {
    var s = l[1], p = l[2], h = l[5];
    n[1] = l[3], n[2] = l[6], n[3] = s, n[5] = l[7], n[6] = p, n[7] = h;
  } else
    n[0] = l[0], n[1] = l[3], n[2] = l[6], n[3] = l[1], n[4] = l[4], n[5] = l[7], n[6] = l[2], n[7] = l[5], n[8] = l[8];
  return n;
}
function Hk(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = l[4], E = l[5], C = l[6], T = l[7], M = l[8], R = M * v - E * T, D = -M * y + E * C, O = T * y - v * C, L = s * R + p * D + h * O;
  return L ? (L = 1 / L, n[0] = R * L, n[1] = (-M * p + h * T) * L, n[2] = (E * p - h * v) * L, n[3] = D * L, n[4] = (M * s - h * C) * L, n[5] = (-E * s + h * y) * L, n[6] = O * L, n[7] = (-T * s + p * C) * L, n[8] = (v * s - p * y) * L, n) : null;
}
function $k(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = l[4], E = l[5], C = l[6], T = l[7], M = l[8];
  return n[0] = v * M - E * T, n[1] = h * T - p * M, n[2] = p * E - h * v, n[3] = E * C - y * M, n[4] = s * M - h * C, n[5] = h * y - s * E, n[6] = y * T - v * C, n[7] = p * C - s * T, n[8] = s * v - p * y, n;
}
function Vk(n) {
  var l = n[0], s = n[1], p = n[2], h = n[3], y = n[4], v = n[5], E = n[6], C = n[7], T = n[8];
  return l * (T * y - v * C) + s * (-T * h + v * E) + p * (C * h - y * E);
}
function _E(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = l[4], C = l[5], T = l[6], M = l[7], R = l[8], D = s[0], O = s[1], L = s[2], j = s[3], F = s[4], K = s[5], J = s[6], B = s[7], ee = s[8];
  return n[0] = D * p + O * v + L * T, n[1] = D * h + O * E + L * M, n[2] = D * y + O * C + L * R, n[3] = j * p + F * v + K * T, n[4] = j * h + F * E + K * M, n[5] = j * y + F * C + K * R, n[6] = J * p + B * v + ee * T, n[7] = J * h + B * E + ee * M, n[8] = J * y + B * C + ee * R, n;
}
function Ik(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = l[4], C = l[5], T = l[6], M = l[7], R = l[8], D = s[0], O = s[1];
  return n[0] = p, n[1] = h, n[2] = y, n[3] = v, n[4] = E, n[5] = C, n[6] = D * p + O * v + T, n[7] = D * h + O * E + M, n[8] = D * y + O * C + R, n;
}
function Bk(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = l[4], C = l[5], T = l[6], M = l[7], R = l[8], D = Math.sin(s), O = Math.cos(s);
  return n[0] = O * p + D * v, n[1] = O * h + D * E, n[2] = O * y + D * C, n[3] = O * v - D * p, n[4] = O * E - D * h, n[5] = O * C - D * y, n[6] = T, n[7] = M, n[8] = R, n;
}
function qk(n, l, s) {
  var p = s[0], h = s[1];
  return n[0] = p * l[0], n[1] = p * l[1], n[2] = p * l[2], n[3] = h * l[3], n[4] = h * l[4], n[5] = h * l[5], n[6] = l[6], n[7] = l[7], n[8] = l[8], n;
}
function Yk(n, l) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 1, n[5] = 0, n[6] = l[0], n[7] = l[1], n[8] = 1, n;
}
function Wk(n, l) {
  var s = Math.sin(l), p = Math.cos(l);
  return n[0] = p, n[1] = s, n[2] = 0, n[3] = -s, n[4] = p, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function Qk(n, l) {
  return n[0] = l[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = l[1], n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function Gk(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = 0, n[3] = l[2], n[4] = l[3], n[5] = 0, n[6] = l[4], n[7] = l[5], n[8] = 1, n;
}
function Xk(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = s + s, E = p + p, C = h + h, T = s * v, M = p * v, R = p * E, D = h * v, O = h * E, L = h * C, j = y * v, F = y * E, K = y * C;
  return n[0] = 1 - R - L, n[3] = M - K, n[6] = D + F, n[1] = M + K, n[4] = 1 - T - L, n[7] = O - j, n[2] = D - F, n[5] = O + j, n[8] = 1 - T - R, n;
}
function Kk(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = l[4], E = l[5], C = l[6], T = l[7], M = l[8], R = l[9], D = l[10], O = l[11], L = l[12], j = l[13], F = l[14], K = l[15], J = s * E - p * v, B = s * C - h * v, ee = s * T - y * v, q = p * C - h * E, re = p * T - y * E, pe = h * T - y * C, Le = M * j - R * L, he = M * F - D * L, ie = M * K - O * L, ze = R * F - D * j, we = R * K - O * j, fe = D * K - O * F, me = J * fe - B * we + ee * ze + q * ie - re * he + pe * Le;
  return me ? (me = 1 / me, n[0] = (E * fe - C * we + T * ze) * me, n[1] = (C * ie - v * fe - T * he) * me, n[2] = (v * we - E * ie + T * Le) * me, n[3] = (h * we - p * fe - y * ze) * me, n[4] = (s * fe - h * ie + y * he) * me, n[5] = (p * ie - s * we - y * Le) * me, n[6] = (j * pe - F * re + K * q) * me, n[7] = (F * ee - L * pe - K * B) * me, n[8] = (L * re - j * ee + K * J) * me, n) : null;
}
function Zk(n, l, s) {
  return n[0] = 2 / l, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = -2 / s, n[5] = 0, n[6] = -1, n[7] = 1, n[8] = 1, n;
}
function Jk(n) {
  return "mat3(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ", " + n[8] + ")";
}
function eD(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + n[6] * n[6] + n[7] * n[7] + n[8] * n[8]);
}
function tD(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n[4] = l[4] + s[4], n[5] = l[5] + s[5], n[6] = l[6] + s[6], n[7] = l[7] + s[7], n[8] = l[8] + s[8], n;
}
function kE(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n[2] = l[2] - s[2], n[3] = l[3] - s[3], n[4] = l[4] - s[4], n[5] = l[5] - s[5], n[6] = l[6] - s[6], n[7] = l[7] - s[7], n[8] = l[8] - s[8], n;
}
function nD(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n[3] = l[3] * s, n[4] = l[4] * s, n[5] = l[5] * s, n[6] = l[6] * s, n[7] = l[7] * s, n[8] = l[8] * s, n;
}
function rD(n, l, s, p) {
  return n[0] = l[0] + s[0] * p, n[1] = l[1] + s[1] * p, n[2] = l[2] + s[2] * p, n[3] = l[3] + s[3] * p, n[4] = l[4] + s[4] * p, n[5] = l[5] + s[5] * p, n[6] = l[6] + s[6] * p, n[7] = l[7] + s[7] * p, n[8] = l[8] + s[8] * p, n;
}
function aD(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2] && n[3] === l[3] && n[4] === l[4] && n[5] === l[5] && n[6] === l[6] && n[7] === l[7] && n[8] === l[8];
}
function iD(n, l) {
  var s = n[0], p = n[1], h = n[2], y = n[3], v = n[4], E = n[5], C = n[6], T = n[7], M = n[8], R = l[0], D = l[1], O = l[2], L = l[3], j = l[4], F = l[5], K = l[6], J = l[7], B = l[8];
  return Math.abs(s - R) <= ct * Math.max(1, Math.abs(s), Math.abs(R)) && Math.abs(p - D) <= ct * Math.max(1, Math.abs(p), Math.abs(D)) && Math.abs(h - O) <= ct * Math.max(1, Math.abs(h), Math.abs(O)) && Math.abs(y - L) <= ct * Math.max(1, Math.abs(y), Math.abs(L)) && Math.abs(v - j) <= ct * Math.max(1, Math.abs(v), Math.abs(j)) && Math.abs(E - F) <= ct * Math.max(1, Math.abs(E), Math.abs(F)) && Math.abs(C - K) <= ct * Math.max(1, Math.abs(C), Math.abs(K)) && Math.abs(T - J) <= ct * Math.max(1, Math.abs(T), Math.abs(J)) && Math.abs(M - B) <= ct * Math.max(1, Math.abs(M), Math.abs(B));
}
var lD = _E, oD = kE;
const uD = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: tD,
  adjoint: $k,
  clone: Ak,
  copy: Nk,
  create: ME,
  determinant: Vk,
  equals: iD,
  exactEquals: aD,
  frob: eD,
  fromMat2d: Gk,
  fromMat4: Lk,
  fromQuat: Xk,
  fromRotation: Wk,
  fromScaling: Qk,
  fromTranslation: Yk,
  fromValues: Uk,
  identity: Fk,
  invert: Hk,
  mul: lD,
  multiply: _E,
  multiplyScalar: nD,
  multiplyScalarAndAdd: rD,
  normalFromMat4: Kk,
  projection: Zk,
  rotate: Bk,
  scale: qk,
  set: jk,
  str: Jk,
  sub: oD,
  subtract: kE,
  translate: Ik,
  transpose: Pk
}, Symbol.toStringTag, { value: "Module" }));
function sD() {
  var n = new gn(16);
  return gn != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0), n[0] = 1, n[5] = 1, n[10] = 1, n[15] = 1, n;
}
function cD(n) {
  var l = new gn(16);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l[4] = n[4], l[5] = n[5], l[6] = n[6], l[7] = n[7], l[8] = n[8], l[9] = n[9], l[10] = n[10], l[11] = n[11], l[12] = n[12], l[13] = n[13], l[14] = n[14], l[15] = n[15], l;
}
function fD(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = l[4], n[5] = l[5], n[6] = l[6], n[7] = l[7], n[8] = l[8], n[9] = l[9], n[10] = l[10], n[11] = l[11], n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15], n;
}
function dD(n, l, s, p, h, y, v, E, C, T, M, R, D, O, L, j) {
  var F = new gn(16);
  return F[0] = n, F[1] = l, F[2] = s, F[3] = p, F[4] = h, F[5] = y, F[6] = v, F[7] = E, F[8] = C, F[9] = T, F[10] = M, F[11] = R, F[12] = D, F[13] = O, F[14] = L, F[15] = j, F;
}
function pD(n, l, s, p, h, y, v, E, C, T, M, R, D, O, L, j, F) {
  return n[0] = l, n[1] = s, n[2] = p, n[3] = h, n[4] = y, n[5] = v, n[6] = E, n[7] = C, n[8] = T, n[9] = M, n[10] = R, n[11] = D, n[12] = O, n[13] = L, n[14] = j, n[15] = F, n;
}
function iS(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function vD(n, l) {
  if (n === l) {
    var s = l[1], p = l[2], h = l[3], y = l[6], v = l[7], E = l[11];
    n[1] = l[4], n[2] = l[8], n[3] = l[12], n[4] = s, n[6] = l[9], n[7] = l[13], n[8] = p, n[9] = y, n[11] = l[14], n[12] = h, n[13] = v, n[14] = E;
  } else
    n[0] = l[0], n[1] = l[4], n[2] = l[8], n[3] = l[12], n[4] = l[1], n[5] = l[5], n[6] = l[9], n[7] = l[13], n[8] = l[2], n[9] = l[6], n[10] = l[10], n[11] = l[14], n[12] = l[3], n[13] = l[7], n[14] = l[11], n[15] = l[15];
  return n;
}
function DE(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = l[4], E = l[5], C = l[6], T = l[7], M = l[8], R = l[9], D = l[10], O = l[11], L = l[12], j = l[13], F = l[14], K = l[15], J = s * E - p * v, B = s * C - h * v, ee = s * T - y * v, q = p * C - h * E, re = p * T - y * E, pe = h * T - y * C, Le = M * j - R * L, he = M * F - D * L, ie = M * K - O * L, ze = R * F - D * j, we = R * K - O * j, fe = D * K - O * F, me = J * fe - B * we + ee * ze + q * ie - re * he + pe * Le;
  return me ? (me = 1 / me, n[0] = (E * fe - C * we + T * ze) * me, n[1] = (h * we - p * fe - y * ze) * me, n[2] = (j * pe - F * re + K * q) * me, n[3] = (D * re - R * pe - O * q) * me, n[4] = (C * ie - v * fe - T * he) * me, n[5] = (s * fe - h * ie + y * he) * me, n[6] = (F * ee - L * pe - K * B) * me, n[7] = (M * pe - D * ee + O * B) * me, n[8] = (v * we - E * ie + T * Le) * me, n[9] = (p * ie - s * we - y * Le) * me, n[10] = (L * re - j * ee + K * J) * me, n[11] = (R * ee - M * re - O * J) * me, n[12] = (E * he - v * ze - C * Le) * me, n[13] = (s * ze - p * he + h * Le) * me, n[14] = (j * B - L * q - F * J) * me, n[15] = (M * q - R * B + D * J) * me, n) : null;
}
function hD(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = l[4], E = l[5], C = l[6], T = l[7], M = l[8], R = l[9], D = l[10], O = l[11], L = l[12], j = l[13], F = l[14], K = l[15], J = s * E - p * v, B = s * C - h * v, ee = s * T - y * v, q = p * C - h * E, re = p * T - y * E, pe = h * T - y * C, Le = M * j - R * L, he = M * F - D * L, ie = M * K - O * L, ze = R * F - D * j, we = R * K - O * j, fe = D * K - O * F;
  return n[0] = E * fe - C * we + T * ze, n[1] = h * we - p * fe - y * ze, n[2] = j * pe - F * re + K * q, n[3] = D * re - R * pe - O * q, n[4] = C * ie - v * fe - T * he, n[5] = s * fe - h * ie + y * he, n[6] = F * ee - L * pe - K * B, n[7] = M * pe - D * ee + O * B, n[8] = v * we - E * ie + T * Le, n[9] = p * ie - s * we - y * Le, n[10] = L * re - j * ee + K * J, n[11] = R * ee - M * re - O * J, n[12] = E * he - v * ze - C * Le, n[13] = s * ze - p * he + h * Le, n[14] = j * B - L * q - F * J, n[15] = M * q - R * B + D * J, n;
}
function mD(n) {
  var l = n[0], s = n[1], p = n[2], h = n[3], y = n[4], v = n[5], E = n[6], C = n[7], T = n[8], M = n[9], R = n[10], D = n[11], O = n[12], L = n[13], j = n[14], F = n[15], K = l * v - s * y, J = l * E - p * y, B = s * E - p * v, ee = T * L - M * O, q = T * j - R * O, re = M * j - R * L, pe = l * re - s * q + p * ee, Le = y * re - v * q + E * ee, he = T * B - M * J + R * K, ie = O * B - L * J + j * K;
  return C * pe - h * Le + F * he - D * ie;
}
function OE(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = l[4], C = l[5], T = l[6], M = l[7], R = l[8], D = l[9], O = l[10], L = l[11], j = l[12], F = l[13], K = l[14], J = l[15], B = s[0], ee = s[1], q = s[2], re = s[3];
  return n[0] = B * p + ee * E + q * R + re * j, n[1] = B * h + ee * C + q * D + re * F, n[2] = B * y + ee * T + q * O + re * K, n[3] = B * v + ee * M + q * L + re * J, B = s[4], ee = s[5], q = s[6], re = s[7], n[4] = B * p + ee * E + q * R + re * j, n[5] = B * h + ee * C + q * D + re * F, n[6] = B * y + ee * T + q * O + re * K, n[7] = B * v + ee * M + q * L + re * J, B = s[8], ee = s[9], q = s[10], re = s[11], n[8] = B * p + ee * E + q * R + re * j, n[9] = B * h + ee * C + q * D + re * F, n[10] = B * y + ee * T + q * O + re * K, n[11] = B * v + ee * M + q * L + re * J, B = s[12], ee = s[13], q = s[14], re = s[15], n[12] = B * p + ee * E + q * R + re * j, n[13] = B * h + ee * C + q * D + re * F, n[14] = B * y + ee * T + q * O + re * K, n[15] = B * v + ee * M + q * L + re * J, n;
}
function nS(n, l, s) {
  var p = s[0], h = s[1], y = s[2], v, E, C, T, M, R, D, O, L, j, F, K;
  return l === n ? (n[12] = l[0] * p + l[4] * h + l[8] * y + l[12], n[13] = l[1] * p + l[5] * h + l[9] * y + l[13], n[14] = l[2] * p + l[6] * h + l[10] * y + l[14], n[15] = l[3] * p + l[7] * h + l[11] * y + l[15]) : (v = l[0], E = l[1], C = l[2], T = l[3], M = l[4], R = l[5], D = l[6], O = l[7], L = l[8], j = l[9], F = l[10], K = l[11], n[0] = v, n[1] = E, n[2] = C, n[3] = T, n[4] = M, n[5] = R, n[6] = D, n[7] = O, n[8] = L, n[9] = j, n[10] = F, n[11] = K, n[12] = v * p + M * h + L * y + l[12], n[13] = E * p + R * h + j * y + l[13], n[14] = C * p + D * h + F * y + l[14], n[15] = T * p + O * h + K * y + l[15]), n;
}
function zE(n, l, s) {
  var p = s[0], h = s[1], y = s[2];
  return n[0] = l[0] * p, n[1] = l[1] * p, n[2] = l[2] * p, n[3] = l[3] * p, n[4] = l[4] * h, n[5] = l[5] * h, n[6] = l[6] * h, n[7] = l[7] * h, n[8] = l[8] * y, n[9] = l[9] * y, n[10] = l[10] * y, n[11] = l[11] * y, n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15], n;
}
function yD(n, l, s, p) {
  var h = p[0], y = p[1], v = p[2], E = Math.sqrt(h * h + y * y + v * v), C, T, M, R, D, O, L, j, F, K, J, B, ee, q, re, pe, Le, he, ie, ze, we, fe, me, Fe;
  return E < ct ? null : (E = 1 / E, h *= E, y *= E, v *= E, C = Math.sin(s), T = Math.cos(s), M = 1 - T, R = l[0], D = l[1], O = l[2], L = l[3], j = l[4], F = l[5], K = l[6], J = l[7], B = l[8], ee = l[9], q = l[10], re = l[11], pe = h * h * M + T, Le = y * h * M + v * C, he = v * h * M - y * C, ie = h * y * M - v * C, ze = y * y * M + T, we = v * y * M + h * C, fe = h * v * M + y * C, me = y * v * M - h * C, Fe = v * v * M + T, n[0] = R * pe + j * Le + B * he, n[1] = D * pe + F * Le + ee * he, n[2] = O * pe + K * Le + q * he, n[3] = L * pe + J * Le + re * he, n[4] = R * ie + j * ze + B * we, n[5] = D * ie + F * ze + ee * we, n[6] = O * ie + K * ze + q * we, n[7] = L * ie + J * ze + re * we, n[8] = R * fe + j * me + B * Fe, n[9] = D * fe + F * me + ee * Fe, n[10] = O * fe + K * me + q * Fe, n[11] = L * fe + J * me + re * Fe, l !== n && (n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15]), n);
}
function gD(n, l, s) {
  var p = Math.sin(s), h = Math.cos(s), y = l[4], v = l[5], E = l[6], C = l[7], T = l[8], M = l[9], R = l[10], D = l[11];
  return l !== n && (n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15]), n[4] = y * h + T * p, n[5] = v * h + M * p, n[6] = E * h + R * p, n[7] = C * h + D * p, n[8] = T * h - y * p, n[9] = M * h - v * p, n[10] = R * h - E * p, n[11] = D * h - C * p, n;
}
function SD(n, l, s) {
  var p = Math.sin(s), h = Math.cos(s), y = l[0], v = l[1], E = l[2], C = l[3], T = l[8], M = l[9], R = l[10], D = l[11];
  return l !== n && (n[4] = l[4], n[5] = l[5], n[6] = l[6], n[7] = l[7], n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15]), n[0] = y * h - T * p, n[1] = v * h - M * p, n[2] = E * h - R * p, n[3] = C * h - D * p, n[8] = y * p + T * h, n[9] = v * p + M * h, n[10] = E * p + R * h, n[11] = C * p + D * h, n;
}
function xD(n, l, s) {
  var p = Math.sin(s), h = Math.cos(s), y = l[0], v = l[1], E = l[2], C = l[3], T = l[4], M = l[5], R = l[6], D = l[7];
  return l !== n && (n[8] = l[8], n[9] = l[9], n[10] = l[10], n[11] = l[11], n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15]), n[0] = y * h + T * p, n[1] = v * h + M * p, n[2] = E * h + R * p, n[3] = C * h + D * p, n[4] = T * h - y * p, n[5] = M * h - v * p, n[6] = R * h - E * p, n[7] = D * h - C * p, n;
}
function ED(n, l) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = l[0], n[13] = l[1], n[14] = l[2], n[15] = 1, n;
}
function CD(n, l) {
  return n[0] = l[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = l[1], n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = l[2], n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function TD(n, l, s) {
  var p = s[0], h = s[1], y = s[2], v = Math.sqrt(p * p + h * h + y * y), E, C, T;
  return v < ct ? null : (v = 1 / v, p *= v, h *= v, y *= v, E = Math.sin(l), C = Math.cos(l), T = 1 - C, n[0] = p * p * T + C, n[1] = h * p * T + y * E, n[2] = y * p * T - h * E, n[3] = 0, n[4] = p * h * T - y * E, n[5] = h * h * T + C, n[6] = y * h * T + p * E, n[7] = 0, n[8] = p * y * T + h * E, n[9] = h * y * T - p * E, n[10] = y * y * T + C, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n);
}
function wD(n, l) {
  var s = Math.sin(l), p = Math.cos(l);
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = p, n[6] = s, n[7] = 0, n[8] = 0, n[9] = -s, n[10] = p, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function RD(n, l) {
  var s = Math.sin(l), p = Math.cos(l);
  return n[0] = p, n[1] = 0, n[2] = -s, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = s, n[9] = 0, n[10] = p, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function bD(n, l) {
  var s = Math.sin(l), p = Math.cos(l);
  return n[0] = p, n[1] = s, n[2] = 0, n[3] = 0, n[4] = -s, n[5] = p, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function LE(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = p + p, C = h + h, T = y + y, M = p * E, R = p * C, D = p * T, O = h * C, L = h * T, j = y * T, F = v * E, K = v * C, J = v * T;
  return n[0] = 1 - (O + j), n[1] = R + J, n[2] = D - K, n[3] = 0, n[4] = R - J, n[5] = 1 - (M + j), n[6] = L + F, n[7] = 0, n[8] = D + K, n[9] = L - F, n[10] = 1 - (M + O), n[11] = 0, n[12] = s[0], n[13] = s[1], n[14] = s[2], n[15] = 1, n;
}
function MD(n, l) {
  var s = new gn(3), p = -l[0], h = -l[1], y = -l[2], v = l[3], E = l[4], C = l[5], T = l[6], M = l[7], R = p * p + h * h + y * y + v * v;
  return R > 0 ? (s[0] = (E * v + M * p + C * y - T * h) * 2 / R, s[1] = (C * v + M * h + T * p - E * y) * 2 / R, s[2] = (T * v + M * y + E * h - C * p) * 2 / R) : (s[0] = (E * v + M * p + C * y - T * h) * 2, s[1] = (C * v + M * h + T * p - E * y) * 2, s[2] = (T * v + M * y + E * h - C * p) * 2), LE(n, l, s), n;
}
function AE(n, l) {
  return n[0] = l[12], n[1] = l[13], n[2] = l[14], n;
}
function NE(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[4], v = l[5], E = l[6], C = l[8], T = l[9], M = l[10];
  return n[0] = Math.sqrt(s * s + p * p + h * h), n[1] = Math.sqrt(y * y + v * v + E * E), n[2] = Math.sqrt(C * C + T * T + M * M), n;
}
function UE(n, l) {
  var s = new gn(3);
  NE(s, l);
  var p = 1 / s[0], h = 1 / s[1], y = 1 / s[2], v = l[0] * p, E = l[1] * h, C = l[2] * y, T = l[4] * p, M = l[5] * h, R = l[6] * y, D = l[8] * p, O = l[9] * h, L = l[10] * y, j = v + M + L, F = 0;
  return j > 0 ? (F = Math.sqrt(j + 1) * 2, n[3] = 0.25 * F, n[0] = (R - O) / F, n[1] = (D - C) / F, n[2] = (E - T) / F) : v > M && v > L ? (F = Math.sqrt(1 + v - M - L) * 2, n[3] = (R - O) / F, n[0] = 0.25 * F, n[1] = (E + T) / F, n[2] = (D + C) / F) : M > L ? (F = Math.sqrt(1 + M - v - L) * 2, n[3] = (D - C) / F, n[0] = (E + T) / F, n[1] = 0.25 * F, n[2] = (R + O) / F) : (F = Math.sqrt(1 + L - v - M) * 2, n[3] = (E - T) / F, n[0] = (D + C) / F, n[1] = (R + O) / F, n[2] = 0.25 * F), n;
}
function _D(n, l, s, p) {
  l[0] = p[12], l[1] = p[13], l[2] = p[14];
  var h = p[0], y = p[1], v = p[2], E = p[4], C = p[5], T = p[6], M = p[8], R = p[9], D = p[10];
  s[0] = Math.sqrt(h * h + y * y + v * v), s[1] = Math.sqrt(E * E + C * C + T * T), s[2] = Math.sqrt(M * M + R * R + D * D);
  var O = 1 / s[0], L = 1 / s[1], j = 1 / s[2], F = h * O, K = y * L, J = v * j, B = E * O, ee = C * L, q = T * j, re = M * O, pe = R * L, Le = D * j, he = F + ee + Le, ie = 0;
  return he > 0 ? (ie = Math.sqrt(he + 1) * 2, n[3] = 0.25 * ie, n[0] = (q - pe) / ie, n[1] = (re - J) / ie, n[2] = (K - B) / ie) : F > ee && F > Le ? (ie = Math.sqrt(1 + F - ee - Le) * 2, n[3] = (q - pe) / ie, n[0] = 0.25 * ie, n[1] = (K + B) / ie, n[2] = (re + J) / ie) : ee > Le ? (ie = Math.sqrt(1 + ee - F - Le) * 2, n[3] = (re - J) / ie, n[0] = (K + B) / ie, n[1] = 0.25 * ie, n[2] = (q + pe) / ie) : (ie = Math.sqrt(1 + Le - F - ee) * 2, n[3] = (K - B) / ie, n[0] = (re + J) / ie, n[1] = (q + pe) / ie, n[2] = 0.25 * ie), n;
}
function kD(n, l, s, p) {
  var h = l[0], y = l[1], v = l[2], E = l[3], C = h + h, T = y + y, M = v + v, R = h * C, D = h * T, O = h * M, L = y * T, j = y * M, F = v * M, K = E * C, J = E * T, B = E * M, ee = p[0], q = p[1], re = p[2];
  return n[0] = (1 - (L + F)) * ee, n[1] = (D + B) * ee, n[2] = (O - J) * ee, n[3] = 0, n[4] = (D - B) * q, n[5] = (1 - (R + F)) * q, n[6] = (j + K) * q, n[7] = 0, n[8] = (O + J) * re, n[9] = (j - K) * re, n[10] = (1 - (R + L)) * re, n[11] = 0, n[12] = s[0], n[13] = s[1], n[14] = s[2], n[15] = 1, n;
}
function DD(n, l, s, p, h) {
  var y = l[0], v = l[1], E = l[2], C = l[3], T = y + y, M = v + v, R = E + E, D = y * T, O = y * M, L = y * R, j = v * M, F = v * R, K = E * R, J = C * T, B = C * M, ee = C * R, q = p[0], re = p[1], pe = p[2], Le = h[0], he = h[1], ie = h[2], ze = (1 - (j + K)) * q, we = (O + ee) * q, fe = (L - B) * q, me = (O - ee) * re, Fe = (1 - (D + K)) * re, Ue = (F + J) * re, ge = (L + B) * pe, de = (F - J) * pe, Ae = (1 - (D + j)) * pe;
  return n[0] = ze, n[1] = we, n[2] = fe, n[3] = 0, n[4] = me, n[5] = Fe, n[6] = Ue, n[7] = 0, n[8] = ge, n[9] = de, n[10] = Ae, n[11] = 0, n[12] = s[0] + Le - (ze * Le + me * he + ge * ie), n[13] = s[1] + he - (we * Le + Fe * he + de * ie), n[14] = s[2] + ie - (fe * Le + Ue * he + Ae * ie), n[15] = 1, n;
}
function OD(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = s + s, E = p + p, C = h + h, T = s * v, M = p * v, R = p * E, D = h * v, O = h * E, L = h * C, j = y * v, F = y * E, K = y * C;
  return n[0] = 1 - R - L, n[1] = M + K, n[2] = D - F, n[3] = 0, n[4] = M - K, n[5] = 1 - T - L, n[6] = O + j, n[7] = 0, n[8] = D + F, n[9] = O - j, n[10] = 1 - T - R, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function zD(n, l, s, p, h, y, v) {
  var E = 1 / (s - l), C = 1 / (h - p), T = 1 / (y - v);
  return n[0] = y * 2 * E, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = y * 2 * C, n[6] = 0, n[7] = 0, n[8] = (s + l) * E, n[9] = (h + p) * C, n[10] = (v + y) * T, n[11] = -1, n[12] = 0, n[13] = 0, n[14] = v * y * 2 * T, n[15] = 0, n;
}
function jE(n, l, s, p, h) {
  var y = 1 / Math.tan(l / 2);
  if (n[0] = y / s, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = y, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = -1, n[12] = 0, n[13] = 0, n[15] = 0, h != null && h !== 1 / 0) {
    var v = 1 / (p - h);
    n[10] = (h + p) * v, n[14] = 2 * h * p * v;
  } else
    n[10] = -1, n[14] = -2 * p;
  return n;
}
var LD = jE;
function AD(n, l, s, p, h) {
  var y = 1 / Math.tan(l / 2);
  if (n[0] = y / s, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = y, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = -1, n[12] = 0, n[13] = 0, n[15] = 0, h != null && h !== 1 / 0) {
    var v = 1 / (p - h);
    n[10] = h * v, n[14] = h * p * v;
  } else
    n[10] = -1, n[14] = -p;
  return n;
}
function ND(n, l, s, p) {
  var h = Math.tan(l.upDegrees * Math.PI / 180), y = Math.tan(l.downDegrees * Math.PI / 180), v = Math.tan(l.leftDegrees * Math.PI / 180), E = Math.tan(l.rightDegrees * Math.PI / 180), C = 2 / (v + E), T = 2 / (h + y);
  return n[0] = C, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = T, n[6] = 0, n[7] = 0, n[8] = -((v - E) * C * 0.5), n[9] = (h - y) * T * 0.5, n[10] = p / (s - p), n[11] = -1, n[12] = 0, n[13] = 0, n[14] = p * s / (s - p), n[15] = 0, n;
}
function FE(n, l, s, p, h, y, v) {
  var E = 1 / (l - s), C = 1 / (p - h), T = 1 / (y - v);
  return n[0] = -2 * E, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * C, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 2 * T, n[11] = 0, n[12] = (l + s) * E, n[13] = (h + p) * C, n[14] = (v + y) * T, n[15] = 1, n;
}
var PE = FE;
function UD(n, l, s, p, h, y, v) {
  var E = 1 / (l - s), C = 1 / (p - h), T = 1 / (y - v);
  return n[0] = -2 * E, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * C, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = T, n[11] = 0, n[12] = (l + s) * E, n[13] = (h + p) * C, n[14] = y * T, n[15] = 1, n;
}
function jD(n, l, s, p) {
  var h, y, v, E, C, T, M, R, D, O, L = l[0], j = l[1], F = l[2], K = p[0], J = p[1], B = p[2], ee = s[0], q = s[1], re = s[2];
  return Math.abs(L - ee) < ct && Math.abs(j - q) < ct && Math.abs(F - re) < ct ? iS(n) : (M = L - ee, R = j - q, D = F - re, O = 1 / Math.sqrt(M * M + R * R + D * D), M *= O, R *= O, D *= O, h = J * D - B * R, y = B * M - K * D, v = K * R - J * M, O = Math.sqrt(h * h + y * y + v * v), O ? (O = 1 / O, h *= O, y *= O, v *= O) : (h = 0, y = 0, v = 0), E = R * v - D * y, C = D * h - M * v, T = M * y - R * h, O = Math.sqrt(E * E + C * C + T * T), O ? (O = 1 / O, E *= O, C *= O, T *= O) : (E = 0, C = 0, T = 0), n[0] = h, n[1] = E, n[2] = M, n[3] = 0, n[4] = y, n[5] = C, n[6] = R, n[7] = 0, n[8] = v, n[9] = T, n[10] = D, n[11] = 0, n[12] = -(h * L + y * j + v * F), n[13] = -(E * L + C * j + T * F), n[14] = -(M * L + R * j + D * F), n[15] = 1, n);
}
function FD(n, l, s, p) {
  var h = l[0], y = l[1], v = l[2], E = p[0], C = p[1], T = p[2], M = h - s[0], R = y - s[1], D = v - s[2], O = M * M + R * R + D * D;
  O > 0 && (O = 1 / Math.sqrt(O), M *= O, R *= O, D *= O);
  var L = C * D - T * R, j = T * M - E * D, F = E * R - C * M;
  return O = L * L + j * j + F * F, O > 0 && (O = 1 / Math.sqrt(O), L *= O, j *= O, F *= O), n[0] = L, n[1] = j, n[2] = F, n[3] = 0, n[4] = R * F - D * j, n[5] = D * L - M * F, n[6] = M * j - R * L, n[7] = 0, n[8] = M, n[9] = R, n[10] = D, n[11] = 0, n[12] = h, n[13] = y, n[14] = v, n[15] = 1, n;
}
function PD(n) {
  return "mat4(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ", " + n[8] + ", " + n[9] + ", " + n[10] + ", " + n[11] + ", " + n[12] + ", " + n[13] + ", " + n[14] + ", " + n[15] + ")";
}
function HD(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + n[6] * n[6] + n[7] * n[7] + n[8] * n[8] + n[9] * n[9] + n[10] * n[10] + n[11] * n[11] + n[12] * n[12] + n[13] * n[13] + n[14] * n[14] + n[15] * n[15]);
}
function $D(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n[4] = l[4] + s[4], n[5] = l[5] + s[5], n[6] = l[6] + s[6], n[7] = l[7] + s[7], n[8] = l[8] + s[8], n[9] = l[9] + s[9], n[10] = l[10] + s[10], n[11] = l[11] + s[11], n[12] = l[12] + s[12], n[13] = l[13] + s[13], n[14] = l[14] + s[14], n[15] = l[15] + s[15], n;
}
function HE(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n[2] = l[2] - s[2], n[3] = l[3] - s[3], n[4] = l[4] - s[4], n[5] = l[5] - s[5], n[6] = l[6] - s[6], n[7] = l[7] - s[7], n[8] = l[8] - s[8], n[9] = l[9] - s[9], n[10] = l[10] - s[10], n[11] = l[11] - s[11], n[12] = l[12] - s[12], n[13] = l[13] - s[13], n[14] = l[14] - s[14], n[15] = l[15] - s[15], n;
}
function VD(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n[3] = l[3] * s, n[4] = l[4] * s, n[5] = l[5] * s, n[6] = l[6] * s, n[7] = l[7] * s, n[8] = l[8] * s, n[9] = l[9] * s, n[10] = l[10] * s, n[11] = l[11] * s, n[12] = l[12] * s, n[13] = l[13] * s, n[14] = l[14] * s, n[15] = l[15] * s, n;
}
function ID(n, l, s, p) {
  return n[0] = l[0] + s[0] * p, n[1] = l[1] + s[1] * p, n[2] = l[2] + s[2] * p, n[3] = l[3] + s[3] * p, n[4] = l[4] + s[4] * p, n[5] = l[5] + s[5] * p, n[6] = l[6] + s[6] * p, n[7] = l[7] + s[7] * p, n[8] = l[8] + s[8] * p, n[9] = l[9] + s[9] * p, n[10] = l[10] + s[10] * p, n[11] = l[11] + s[11] * p, n[12] = l[12] + s[12] * p, n[13] = l[13] + s[13] * p, n[14] = l[14] + s[14] * p, n[15] = l[15] + s[15] * p, n;
}
function BD(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2] && n[3] === l[3] && n[4] === l[4] && n[5] === l[5] && n[6] === l[6] && n[7] === l[7] && n[8] === l[8] && n[9] === l[9] && n[10] === l[10] && n[11] === l[11] && n[12] === l[12] && n[13] === l[13] && n[14] === l[14] && n[15] === l[15];
}
function qD(n, l) {
  var s = n[0], p = n[1], h = n[2], y = n[3], v = n[4], E = n[5], C = n[6], T = n[7], M = n[8], R = n[9], D = n[10], O = n[11], L = n[12], j = n[13], F = n[14], K = n[15], J = l[0], B = l[1], ee = l[2], q = l[3], re = l[4], pe = l[5], Le = l[6], he = l[7], ie = l[8], ze = l[9], we = l[10], fe = l[11], me = l[12], Fe = l[13], Ue = l[14], ge = l[15];
  return Math.abs(s - J) <= ct * Math.max(1, Math.abs(s), Math.abs(J)) && Math.abs(p - B) <= ct * Math.max(1, Math.abs(p), Math.abs(B)) && Math.abs(h - ee) <= ct * Math.max(1, Math.abs(h), Math.abs(ee)) && Math.abs(y - q) <= ct * Math.max(1, Math.abs(y), Math.abs(q)) && Math.abs(v - re) <= ct * Math.max(1, Math.abs(v), Math.abs(re)) && Math.abs(E - pe) <= ct * Math.max(1, Math.abs(E), Math.abs(pe)) && Math.abs(C - Le) <= ct * Math.max(1, Math.abs(C), Math.abs(Le)) && Math.abs(T - he) <= ct * Math.max(1, Math.abs(T), Math.abs(he)) && Math.abs(M - ie) <= ct * Math.max(1, Math.abs(M), Math.abs(ie)) && Math.abs(R - ze) <= ct * Math.max(1, Math.abs(R), Math.abs(ze)) && Math.abs(D - we) <= ct * Math.max(1, Math.abs(D), Math.abs(we)) && Math.abs(O - fe) <= ct * Math.max(1, Math.abs(O), Math.abs(fe)) && Math.abs(L - me) <= ct * Math.max(1, Math.abs(L), Math.abs(me)) && Math.abs(j - Fe) <= ct * Math.max(1, Math.abs(j), Math.abs(Fe)) && Math.abs(F - Ue) <= ct * Math.max(1, Math.abs(F), Math.abs(Ue)) && Math.abs(K - ge) <= ct * Math.max(1, Math.abs(K), Math.abs(ge));
}
var YD = OE, WD = HE;
const $E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: $D,
  adjoint: hD,
  clone: cD,
  copy: fD,
  create: sD,
  decompose: _D,
  determinant: mD,
  equals: qD,
  exactEquals: BD,
  frob: HD,
  fromQuat: OD,
  fromQuat2: MD,
  fromRotation: TD,
  fromRotationTranslation: LE,
  fromRotationTranslationScale: kD,
  fromRotationTranslationScaleOrigin: DD,
  fromScaling: CD,
  fromTranslation: ED,
  fromValues: dD,
  fromXRotation: wD,
  fromYRotation: RD,
  fromZRotation: bD,
  frustum: zD,
  getRotation: UE,
  getScaling: NE,
  getTranslation: AE,
  identity: iS,
  invert: DE,
  lookAt: jD,
  mul: YD,
  multiply: OE,
  multiplyScalar: VD,
  multiplyScalarAndAdd: ID,
  ortho: PE,
  orthoNO: FE,
  orthoZO: UD,
  perspective: LD,
  perspectiveFromFieldOfView: ND,
  perspectiveNO: jE,
  perspectiveZO: AD,
  rotate: yD,
  rotateX: gD,
  rotateY: SD,
  rotateZ: xD,
  scale: zE,
  set: pD,
  str: PD,
  sub: WD,
  subtract: HE,
  targetTo: FD,
  translate: nS,
  transpose: vD
}, Symbol.toStringTag, { value: "Module" }));
function lS() {
  var n = new gn(3);
  return gn != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n;
}
function QD(n) {
  var l = new gn(3);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l;
}
function VE(n) {
  var l = n[0], s = n[1], p = n[2];
  return Math.sqrt(l * l + s * s + p * p);
}
function rS(n, l, s) {
  var p = new gn(3);
  return p[0] = n, p[1] = l, p[2] = s, p;
}
function GD(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n;
}
function XD(n, l, s, p) {
  return n[0] = l, n[1] = s, n[2] = p, n;
}
function KD(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n;
}
function IE(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n[2] = l[2] - s[2], n;
}
function BE(n, l, s) {
  return n[0] = l[0] * s[0], n[1] = l[1] * s[1], n[2] = l[2] * s[2], n;
}
function qE(n, l, s) {
  return n[0] = l[0] / s[0], n[1] = l[1] / s[1], n[2] = l[2] / s[2], n;
}
function ZD(n, l) {
  return n[0] = Math.ceil(l[0]), n[1] = Math.ceil(l[1]), n[2] = Math.ceil(l[2]), n;
}
function JD(n, l) {
  return n[0] = Math.floor(l[0]), n[1] = Math.floor(l[1]), n[2] = Math.floor(l[2]), n;
}
function e5(n, l, s) {
  return n[0] = Math.min(l[0], s[0]), n[1] = Math.min(l[1], s[1]), n[2] = Math.min(l[2], s[2]), n;
}
function t5(n, l, s) {
  return n[0] = Math.max(l[0], s[0]), n[1] = Math.max(l[1], s[1]), n[2] = Math.max(l[2], s[2]), n;
}
function n5(n, l) {
  return n[0] = Ho(l[0]), n[1] = Ho(l[1]), n[2] = Ho(l[2]), n;
}
function r5(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n;
}
function a5(n, l, s, p) {
  return n[0] = l[0] + s[0] * p, n[1] = l[1] + s[1] * p, n[2] = l[2] + s[2] * p, n;
}
function YE(n, l) {
  var s = l[0] - n[0], p = l[1] - n[1], h = l[2] - n[2];
  return Math.sqrt(s * s + p * p + h * h);
}
function WE(n, l) {
  var s = l[0] - n[0], p = l[1] - n[1], h = l[2] - n[2];
  return s * s + p * p + h * h;
}
function QE(n) {
  var l = n[0], s = n[1], p = n[2];
  return l * l + s * s + p * p;
}
function i5(n, l) {
  return n[0] = -l[0], n[1] = -l[1], n[2] = -l[2], n;
}
function l5(n, l) {
  return n[0] = 1 / l[0], n[1] = 1 / l[1], n[2] = 1 / l[2], n;
}
function GE(n, l) {
  var s = l[0], p = l[1], h = l[2], y = s * s + p * p + h * h;
  return y > 0 && (y = 1 / Math.sqrt(y)), n[0] = l[0] * y, n[1] = l[1] * y, n[2] = l[2] * y, n;
}
function zy(n, l) {
  return n[0] * l[0] + n[1] * l[1] + n[2] * l[2];
}
function Ty(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = s[0], E = s[1], C = s[2];
  return n[0] = h * C - y * E, n[1] = y * v - p * C, n[2] = p * E - h * v, n;
}
function o5(n, l, s, p) {
  var h = l[0], y = l[1], v = l[2];
  return n[0] = h + p * (s[0] - h), n[1] = y + p * (s[1] - y), n[2] = v + p * (s[2] - v), n;
}
function u5(n, l, s, p) {
  var h = Math.acos(Math.min(Math.max(zy(l, s), -1), 1)), y = Math.sin(h), v = Math.sin((1 - p) * h) / y, E = Math.sin(p * h) / y;
  return n[0] = v * l[0] + E * s[0], n[1] = v * l[1] + E * s[1], n[2] = v * l[2] + E * s[2], n;
}
function s5(n, l, s, p, h, y) {
  var v = y * y, E = v * (2 * y - 3) + 1, C = v * (y - 2) + y, T = v * (y - 1), M = v * (3 - 2 * y);
  return n[0] = l[0] * E + s[0] * C + p[0] * T + h[0] * M, n[1] = l[1] * E + s[1] * C + p[1] * T + h[1] * M, n[2] = l[2] * E + s[2] * C + p[2] * T + h[2] * M, n;
}
function c5(n, l, s, p, h, y) {
  var v = 1 - y, E = v * v, C = y * y, T = E * v, M = 3 * y * E, R = 3 * C * v, D = C * y;
  return n[0] = l[0] * T + s[0] * M + p[0] * R + h[0] * D, n[1] = l[1] * T + s[1] * M + p[1] * R + h[1] * D, n[2] = l[2] * T + s[2] * M + p[2] * R + h[2] * D, n;
}
function f5(n, l) {
  l = l === void 0 ? 1 : l;
  var s = lo() * 2 * Math.PI, p = lo() * 2 - 1, h = Math.sqrt(1 - p * p) * l;
  return n[0] = Math.cos(s) * h, n[1] = Math.sin(s) * h, n[2] = p * l, n;
}
function XE(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = s[3] * p + s[7] * h + s[11] * y + s[15];
  return v = v || 1, n[0] = (s[0] * p + s[4] * h + s[8] * y + s[12]) / v, n[1] = (s[1] * p + s[5] * h + s[9] * y + s[13]) / v, n[2] = (s[2] * p + s[6] * h + s[10] * y + s[14]) / v, n;
}
function d5(n, l, s) {
  var p = l[0], h = l[1], y = l[2];
  return n[0] = p * s[0] + h * s[3] + y * s[6], n[1] = p * s[1] + h * s[4] + y * s[7], n[2] = p * s[2] + h * s[5] + y * s[8], n;
}
function p5(n, l, s) {
  var p = s[0], h = s[1], y = s[2], v = s[3], E = l[0], C = l[1], T = l[2], M = h * T - y * C, R = y * E - p * T, D = p * C - h * E;
  return M = M + M, R = R + R, D = D + D, n[0] = E + v * M + h * D - y * R, n[1] = C + v * R + y * M - p * D, n[2] = T + v * D + p * R - h * M, n;
}
function v5(n, l, s, p) {
  var h = [], y = [];
  return h[0] = l[0] - s[0], h[1] = l[1] - s[1], h[2] = l[2] - s[2], y[0] = h[0], y[1] = h[1] * Math.cos(p) - h[2] * Math.sin(p), y[2] = h[1] * Math.sin(p) + h[2] * Math.cos(p), n[0] = y[0] + s[0], n[1] = y[1] + s[1], n[2] = y[2] + s[2], n;
}
function h5(n, l, s, p) {
  var h = [], y = [];
  return h[0] = l[0] - s[0], h[1] = l[1] - s[1], h[2] = l[2] - s[2], y[0] = h[2] * Math.sin(p) + h[0] * Math.cos(p), y[1] = h[1], y[2] = h[2] * Math.cos(p) - h[0] * Math.sin(p), n[0] = y[0] + s[0], n[1] = y[1] + s[1], n[2] = y[2] + s[2], n;
}
function m5(n, l, s, p) {
  var h = [], y = [];
  return h[0] = l[0] - s[0], h[1] = l[1] - s[1], h[2] = l[2] - s[2], y[0] = h[0] * Math.cos(p) - h[1] * Math.sin(p), y[1] = h[0] * Math.sin(p) + h[1] * Math.cos(p), y[2] = h[2], n[0] = y[0] + s[0], n[1] = y[1] + s[1], n[2] = y[2] + s[2], n;
}
function y5(n, l) {
  var s = n[0], p = n[1], h = n[2], y = l[0], v = l[1], E = l[2], C = Math.sqrt((s * s + p * p + h * h) * (y * y + v * v + E * E)), T = C && zy(n, l) / C;
  return Math.acos(Math.min(Math.max(T, -1), 1));
}
function g5(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n;
}
function S5(n) {
  return "vec3(" + n[0] + ", " + n[1] + ", " + n[2] + ")";
}
function x5(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2];
}
function E5(n, l) {
  var s = n[0], p = n[1], h = n[2], y = l[0], v = l[1], E = l[2];
  return Math.abs(s - y) <= ct * Math.max(1, Math.abs(s), Math.abs(y)) && Math.abs(p - v) <= ct * Math.max(1, Math.abs(p), Math.abs(v)) && Math.abs(h - E) <= ct * Math.max(1, Math.abs(h), Math.abs(E));
}
var C5 = IE, T5 = BE, w5 = qE, R5 = YE, b5 = WE, KE = VE, M5 = QE, _5 = (function() {
  var n = lS();
  return function(l, s, p, h, y, v) {
    var E, C;
    for (s || (s = 3), p || (p = 0), h ? C = Math.min(h * s + p, l.length) : C = l.length, E = p; E < C; E += s)
      n[0] = l[E], n[1] = l[E + 1], n[2] = l[E + 2], y(n, n, v), l[E] = n[0], l[E + 1] = n[1], l[E + 2] = n[2];
    return l;
  };
})();
const k5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: KD,
  angle: y5,
  bezier: c5,
  ceil: ZD,
  clone: QD,
  copy: GD,
  create: lS,
  cross: Ty,
  dist: R5,
  distance: YE,
  div: w5,
  divide: qE,
  dot: zy,
  equals: E5,
  exactEquals: x5,
  floor: JD,
  forEach: _5,
  fromValues: rS,
  hermite: s5,
  inverse: l5,
  len: KE,
  length: VE,
  lerp: o5,
  max: t5,
  min: e5,
  mul: T5,
  multiply: BE,
  negate: i5,
  normalize: GE,
  random: f5,
  rotateX: v5,
  rotateY: h5,
  rotateZ: m5,
  round: n5,
  scale: r5,
  scaleAndAdd: a5,
  set: XD,
  slerp: u5,
  sqrDist: b5,
  sqrLen: M5,
  squaredDistance: WE,
  squaredLength: QE,
  str: S5,
  sub: C5,
  subtract: IE,
  transformMat3: d5,
  transformMat4: XE,
  transformQuat: p5,
  zero: g5
}, Symbol.toStringTag, { value: "Module" }));
function ZE() {
  var n = new gn(4);
  return gn != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0), n;
}
function JE(n) {
  var l = new gn(4);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l;
}
function eC(n, l, s, p) {
  var h = new gn(4);
  return h[0] = n, h[1] = l, h[2] = s, h[3] = p, h;
}
function tC(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n;
}
function nC(n, l, s, p, h) {
  return n[0] = l, n[1] = s, n[2] = p, n[3] = h, n;
}
function rC(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n;
}
function aC(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n[2] = l[2] - s[2], n[3] = l[3] - s[3], n;
}
function iC(n, l, s) {
  return n[0] = l[0] * s[0], n[1] = l[1] * s[1], n[2] = l[2] * s[2], n[3] = l[3] * s[3], n;
}
function lC(n, l, s) {
  return n[0] = l[0] / s[0], n[1] = l[1] / s[1], n[2] = l[2] / s[2], n[3] = l[3] / s[3], n;
}
function D5(n, l) {
  return n[0] = Math.ceil(l[0]), n[1] = Math.ceil(l[1]), n[2] = Math.ceil(l[2]), n[3] = Math.ceil(l[3]), n;
}
function O5(n, l) {
  return n[0] = Math.floor(l[0]), n[1] = Math.floor(l[1]), n[2] = Math.floor(l[2]), n[3] = Math.floor(l[3]), n;
}
function z5(n, l, s) {
  return n[0] = Math.min(l[0], s[0]), n[1] = Math.min(l[1], s[1]), n[2] = Math.min(l[2], s[2]), n[3] = Math.min(l[3], s[3]), n;
}
function L5(n, l, s) {
  return n[0] = Math.max(l[0], s[0]), n[1] = Math.max(l[1], s[1]), n[2] = Math.max(l[2], s[2]), n[3] = Math.max(l[3], s[3]), n;
}
function A5(n, l) {
  return n[0] = Ho(l[0]), n[1] = Ho(l[1]), n[2] = Ho(l[2]), n[3] = Ho(l[3]), n;
}
function oC(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n[3] = l[3] * s, n;
}
function N5(n, l, s, p) {
  return n[0] = l[0] + s[0] * p, n[1] = l[1] + s[1] * p, n[2] = l[2] + s[2] * p, n[3] = l[3] + s[3] * p, n;
}
function uC(n, l) {
  var s = l[0] - n[0], p = l[1] - n[1], h = l[2] - n[2], y = l[3] - n[3];
  return Math.sqrt(s * s + p * p + h * h + y * y);
}
function sC(n, l) {
  var s = l[0] - n[0], p = l[1] - n[1], h = l[2] - n[2], y = l[3] - n[3];
  return s * s + p * p + h * h + y * y;
}
function oS(n) {
  var l = n[0], s = n[1], p = n[2], h = n[3];
  return Math.sqrt(l * l + s * s + p * p + h * h);
}
function uS(n) {
  var l = n[0], s = n[1], p = n[2], h = n[3];
  return l * l + s * s + p * p + h * h;
}
function U5(n, l) {
  return n[0] = -l[0], n[1] = -l[1], n[2] = -l[2], n[3] = -l[3], n;
}
function j5(n, l) {
  return n[0] = 1 / l[0], n[1] = 1 / l[1], n[2] = 1 / l[2], n[3] = 1 / l[3], n;
}
function cC(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = s * s + p * p + h * h + y * y;
  return v > 0 && (v = 1 / Math.sqrt(v)), n[0] = s * v, n[1] = p * v, n[2] = h * v, n[3] = y * v, n;
}
function sS(n, l) {
  return n[0] * l[0] + n[1] * l[1] + n[2] * l[2] + n[3] * l[3];
}
function F5(n, l, s, p) {
  var h = s[0] * p[1] - s[1] * p[0], y = s[0] * p[2] - s[2] * p[0], v = s[0] * p[3] - s[3] * p[0], E = s[1] * p[2] - s[2] * p[1], C = s[1] * p[3] - s[3] * p[1], T = s[2] * p[3] - s[3] * p[2], M = l[0], R = l[1], D = l[2], O = l[3];
  return n[0] = R * T - D * C + O * E, n[1] = -(M * T) + D * v - O * y, n[2] = M * C - R * v + O * h, n[3] = -(M * E) + R * y - D * h, n;
}
function fC(n, l, s, p) {
  var h = l[0], y = l[1], v = l[2], E = l[3];
  return n[0] = h + p * (s[0] - h), n[1] = y + p * (s[1] - y), n[2] = v + p * (s[2] - v), n[3] = E + p * (s[3] - E), n;
}
function P5(n, l) {
  l = l === void 0 ? 1 : l;
  var s, p, h, y, v, E, C;
  C = lo(), s = C * 2 - 1, p = (4 * lo() - 2) * Math.sqrt(C * -C + C), v = s * s + p * p, C = lo(), h = C * 2 - 1, y = (4 * lo() - 2) * Math.sqrt(C * -C + C), E = h * h + y * y;
  var T = Math.sqrt((1 - v) / E);
  return n[0] = l * s, n[1] = l * p, n[2] = l * h * T, n[3] = l * y * T, n;
}
function H5(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3];
  return n[0] = s[0] * p + s[4] * h + s[8] * y + s[12] * v, n[1] = s[1] * p + s[5] * h + s[9] * y + s[13] * v, n[2] = s[2] * p + s[6] * h + s[10] * y + s[14] * v, n[3] = s[3] * p + s[7] * h + s[11] * y + s[15] * v, n;
}
function $5(n, l, s) {
  var p = s[0], h = s[1], y = s[2], v = s[3], E = l[0], C = l[1], T = l[2], M = h * T - y * C, R = y * E - p * T, D = p * C - h * E;
  return M = M + M, R = R + R, D = D + D, n[0] = E + v * M + h * D - y * R, n[1] = C + v * R + y * M - p * D, n[2] = T + v * D + p * R - h * M, n[3] = l[3], n;
}
function V5(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0, n;
}
function I5(n) {
  return "vec4(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
function dC(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2] && n[3] === l[3];
}
function B5(n, l) {
  var s = n[0], p = n[1], h = n[2], y = n[3], v = l[0], E = l[1], C = l[2], T = l[3];
  return Math.abs(s - v) <= ct * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(p - E) <= ct * Math.max(1, Math.abs(p), Math.abs(E)) && Math.abs(h - C) <= ct * Math.max(1, Math.abs(h), Math.abs(C)) && Math.abs(y - T) <= ct * Math.max(1, Math.abs(y), Math.abs(T));
}
var q5 = aC, Y5 = iC, W5 = lC, Q5 = uC, G5 = sC, X5 = oS, K5 = uS, Z5 = (function() {
  var n = ZE();
  return function(l, s, p, h, y, v) {
    var E, C;
    for (s || (s = 4), p || (p = 0), h ? C = Math.min(h * s + p, l.length) : C = l.length, E = p; E < C; E += s)
      n[0] = l[E], n[1] = l[E + 1], n[2] = l[E + 2], n[3] = l[E + 3], y(n, n, v), l[E] = n[0], l[E + 1] = n[1], l[E + 2] = n[2], l[E + 3] = n[3];
    return l;
  };
})();
const J5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: rC,
  ceil: D5,
  clone: JE,
  copy: tC,
  create: ZE,
  cross: F5,
  dist: Q5,
  distance: uC,
  div: W5,
  divide: lC,
  dot: sS,
  equals: B5,
  exactEquals: dC,
  floor: O5,
  forEach: Z5,
  fromValues: eC,
  inverse: j5,
  len: X5,
  length: oS,
  lerp: fC,
  max: L5,
  min: z5,
  mul: Y5,
  multiply: iC,
  negate: U5,
  normalize: cC,
  random: P5,
  round: A5,
  scale: oC,
  scaleAndAdd: N5,
  set: nC,
  sqrDist: G5,
  sqrLen: K5,
  squaredDistance: sC,
  squaredLength: uS,
  str: I5,
  sub: q5,
  subtract: aC,
  transformMat4: H5,
  transformQuat: $5,
  zero: V5
}, Symbol.toStringTag, { value: "Module" }));
function Ry() {
  var n = new gn(4);
  return gn != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n[3] = 1, n;
}
function eO(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function pC(n, l, s) {
  s = s * 0.5;
  var p = Math.sin(s);
  return n[0] = p * l[0], n[1] = p * l[1], n[2] = p * l[2], n[3] = Math.cos(s), n;
}
function tO(n, l) {
  var s = Math.acos(l[3]) * 2, p = Math.sin(s / 2);
  return p > ct ? (n[0] = l[0] / p, n[1] = l[1] / p, n[2] = l[2] / p) : (n[0] = 1, n[1] = 0, n[2] = 0), s;
}
function nO(n, l) {
  var s = fS(n, l);
  return Math.acos(2 * s * s - 1);
}
function vC(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = s[0], C = s[1], T = s[2], M = s[3];
  return n[0] = p * M + v * E + h * T - y * C, n[1] = h * M + v * C + y * E - p * T, n[2] = y * M + v * T + p * C - h * E, n[3] = v * M - p * E - h * C - y * T, n;
}
function hC(n, l, s) {
  s *= 0.5;
  var p = l[0], h = l[1], y = l[2], v = l[3], E = Math.sin(s), C = Math.cos(s);
  return n[0] = p * C + v * E, n[1] = h * C + y * E, n[2] = y * C - h * E, n[3] = v * C - p * E, n;
}
function mC(n, l, s) {
  s *= 0.5;
  var p = l[0], h = l[1], y = l[2], v = l[3], E = Math.sin(s), C = Math.cos(s);
  return n[0] = p * C - y * E, n[1] = h * C + v * E, n[2] = y * C + p * E, n[3] = v * C - h * E, n;
}
function yC(n, l, s) {
  s *= 0.5;
  var p = l[0], h = l[1], y = l[2], v = l[3], E = Math.sin(s), C = Math.cos(s);
  return n[0] = p * C + h * E, n[1] = h * C - p * E, n[2] = y * C + v * E, n[3] = v * C - y * E, n;
}
function rO(n, l) {
  var s = l[0], p = l[1], h = l[2];
  return n[0] = s, n[1] = p, n[2] = h, n[3] = Math.sqrt(Math.abs(1 - s * s - p * p - h * h)), n;
}
function gC(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = Math.sqrt(s * s + p * p + h * h), E = Math.exp(y), C = v > 0 ? E * Math.sin(v) / v : 0;
  return n[0] = s * C, n[1] = p * C, n[2] = h * C, n[3] = E * Math.cos(v), n;
}
function SC(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = Math.sqrt(s * s + p * p + h * h), E = v > 0 ? Math.atan2(v, y) / v : 0;
  return n[0] = s * E, n[1] = p * E, n[2] = h * E, n[3] = 0.5 * Math.log(s * s + p * p + h * h + y * y), n;
}
function aO(n, l, s) {
  return SC(n, l), EC(n, n, s), gC(n, n), n;
}
function wy(n, l, s, p) {
  var h = l[0], y = l[1], v = l[2], E = l[3], C = s[0], T = s[1], M = s[2], R = s[3], D, O, L, j, F;
  return O = h * C + y * T + v * M + E * R, O < 0 && (O = -O, C = -C, T = -T, M = -M, R = -R), 1 - O > ct ? (D = Math.acos(O), L = Math.sin(D), j = Math.sin((1 - p) * D) / L, F = Math.sin(p * D) / L) : (j = 1 - p, F = p), n[0] = j * h + F * C, n[1] = j * y + F * T, n[2] = j * v + F * M, n[3] = j * E + F * R, n;
}
function iO(n) {
  var l = lo(), s = lo(), p = lo(), h = Math.sqrt(1 - l), y = Math.sqrt(l);
  return n[0] = h * Math.sin(2 * Math.PI * s), n[1] = h * Math.cos(2 * Math.PI * s), n[2] = y * Math.sin(2 * Math.PI * p), n[3] = y * Math.cos(2 * Math.PI * p), n;
}
function lO(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = s * s + p * p + h * h + y * y, E = v ? 1 / v : 0;
  return n[0] = -s * E, n[1] = -p * E, n[2] = -h * E, n[3] = y * E, n;
}
function oO(n, l) {
  return n[0] = -l[0], n[1] = -l[1], n[2] = -l[2], n[3] = l[3], n;
}
function xC(n, l) {
  var s = l[0] + l[4] + l[8], p;
  if (s > 0)
    p = Math.sqrt(s + 1), n[3] = 0.5 * p, p = 0.5 / p, n[0] = (l[5] - l[7]) * p, n[1] = (l[6] - l[2]) * p, n[2] = (l[1] - l[3]) * p;
  else {
    var h = 0;
    l[4] > l[0] && (h = 1), l[8] > l[h * 3 + h] && (h = 2);
    var y = (h + 1) % 3, v = (h + 2) % 3;
    p = Math.sqrt(l[h * 3 + h] - l[y * 3 + y] - l[v * 3 + v] + 1), n[h] = 0.5 * p, p = 0.5 / p, n[3] = (l[y * 3 + v] - l[v * 3 + y]) * p, n[y] = (l[y * 3 + h] + l[h * 3 + y]) * p, n[v] = (l[v * 3 + h] + l[h * 3 + v]) * p;
  }
  return n;
}
function uO(n, l, s, p) {
  var h = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : CE, y = Math.PI / 360;
  l *= y, p *= y, s *= y;
  var v = Math.sin(l), E = Math.cos(l), C = Math.sin(s), T = Math.cos(s), M = Math.sin(p), R = Math.cos(p);
  switch (h) {
    case "xyz":
      n[0] = v * T * R + E * C * M, n[1] = E * C * R - v * T * M, n[2] = E * T * M + v * C * R, n[3] = E * T * R - v * C * M;
      break;
    case "xzy":
      n[0] = v * T * R - E * C * M, n[1] = E * C * R - v * T * M, n[2] = E * T * M + v * C * R, n[3] = E * T * R + v * C * M;
      break;
    case "yxz":
      n[0] = v * T * R + E * C * M, n[1] = E * C * R - v * T * M, n[2] = E * T * M - v * C * R, n[3] = E * T * R + v * C * M;
      break;
    case "yzx":
      n[0] = v * T * R + E * C * M, n[1] = E * C * R + v * T * M, n[2] = E * T * M - v * C * R, n[3] = E * T * R - v * C * M;
      break;
    case "zxy":
      n[0] = v * T * R - E * C * M, n[1] = E * C * R + v * T * M, n[2] = E * T * M + v * C * R, n[3] = E * T * R - v * C * M;
      break;
    case "zyx":
      n[0] = v * T * R - E * C * M, n[1] = E * C * R + v * T * M, n[2] = E * T * M - v * C * R, n[3] = E * T * R + v * C * M;
      break;
    default:
      throw new Error("Unknown angle order " + h);
  }
  return n;
}
function sO(n) {
  return "quat(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
var cO = JE, fO = eC, cS = tC, dO = nC, pO = rC, vO = vC, EC = oC, fS = sS, hO = fC, dS = oS, mO = dS, pS = uS, yO = pS, vS = cC, gO = dC;
function SO(n, l) {
  return Math.abs(sS(n, l)) >= 1 - ct;
}
var xO = (function() {
  var n = lS(), l = rS(1, 0, 0), s = rS(0, 1, 0);
  return function(p, h, y) {
    var v = zy(h, y);
    return v < -0.999999 ? (Ty(n, l, h), KE(n) < 1e-6 && Ty(n, s, h), GE(n, n), pC(p, n, Math.PI), p) : v > 0.999999 ? (p[0] = 0, p[1] = 0, p[2] = 0, p[3] = 1, p) : (Ty(n, h, y), p[0] = n[0], p[1] = n[1], p[2] = n[2], p[3] = 1 + v, vS(p, p));
  };
})(), EO = (function() {
  var n = Ry(), l = Ry();
  return function(s, p, h, y, v, E) {
    return wy(n, p, v, E), wy(l, h, y, E), wy(s, n, l, 2 * E * (1 - E)), s;
  };
})(), CO = (function() {
  var n = ME();
  return function(l, s, p, h) {
    return n[0] = p[0], n[3] = p[1], n[6] = p[2], n[1] = h[0], n[4] = h[1], n[7] = h[2], n[2] = -s[0], n[5] = -s[1], n[8] = -s[2], vS(l, xC(l, n));
  };
})();
const TO = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: pO,
  calculateW: rO,
  clone: cO,
  conjugate: oO,
  copy: cS,
  create: Ry,
  dot: fS,
  equals: SO,
  exactEquals: gO,
  exp: gC,
  fromEuler: uO,
  fromMat3: xC,
  fromValues: fO,
  getAngle: nO,
  getAxisAngle: tO,
  identity: eO,
  invert: lO,
  len: mO,
  length: dS,
  lerp: hO,
  ln: SC,
  mul: vO,
  multiply: vC,
  normalize: vS,
  pow: aO,
  random: iO,
  rotateX: hC,
  rotateY: mC,
  rotateZ: yC,
  rotationTo: xO,
  scale: EC,
  set: dO,
  setAxes: CO,
  setAxisAngle: pC,
  slerp: wy,
  sqlerp: EO,
  sqrLen: yO,
  squaredLength: pS,
  str: sO
}, Symbol.toStringTag, { value: "Module" }));
function wO() {
  var n = new gn(8);
  return gn != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[3] = 1, n;
}
function RO(n) {
  var l = new gn(8);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l[4] = n[4], l[5] = n[5], l[6] = n[6], l[7] = n[7], l;
}
function bO(n, l, s, p, h, y, v, E) {
  var C = new gn(8);
  return C[0] = n, C[1] = l, C[2] = s, C[3] = p, C[4] = h, C[5] = y, C[6] = v, C[7] = E, C;
}
function MO(n, l, s, p, h, y, v) {
  var E = new gn(8);
  E[0] = n, E[1] = l, E[2] = s, E[3] = p;
  var C = h * 0.5, T = y * 0.5, M = v * 0.5;
  return E[4] = C * p + T * s - M * l, E[5] = T * p + M * n - C * s, E[6] = M * p + C * l - T * n, E[7] = -C * n - T * l - M * s, E;
}
function CC(n, l, s) {
  var p = s[0] * 0.5, h = s[1] * 0.5, y = s[2] * 0.5, v = l[0], E = l[1], C = l[2], T = l[3];
  return n[0] = v, n[1] = E, n[2] = C, n[3] = T, n[4] = p * T + h * C - y * E, n[5] = h * T + y * v - p * C, n[6] = y * T + p * E - h * v, n[7] = -p * v - h * E - y * C, n;
}
function _O(n, l) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = l[0] * 0.5, n[5] = l[1] * 0.5, n[6] = l[2] * 0.5, n[7] = 0, n;
}
function kO(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n;
}
function DO(n, l) {
  var s = Ry();
  UE(s, l);
  var p = new gn(3);
  return AE(p, l), CC(n, s, p), n;
}
function TC(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = l[4], n[5] = l[5], n[6] = l[6], n[7] = l[7], n;
}
function OO(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n;
}
function zO(n, l, s, p, h, y, v, E, C) {
  return n[0] = l, n[1] = s, n[2] = p, n[3] = h, n[4] = y, n[5] = v, n[6] = E, n[7] = C, n;
}
var LO = cS;
function AO(n, l) {
  return n[0] = l[4], n[1] = l[5], n[2] = l[6], n[3] = l[7], n;
}
var NO = cS;
function UO(n, l) {
  return n[4] = l[0], n[5] = l[1], n[6] = l[2], n[7] = l[3], n;
}
function jO(n, l) {
  var s = l[4], p = l[5], h = l[6], y = l[7], v = -l[0], E = -l[1], C = -l[2], T = l[3];
  return n[0] = (s * T + y * v + p * C - h * E) * 2, n[1] = (p * T + y * E + h * v - s * C) * 2, n[2] = (h * T + y * C + s * E - p * v) * 2, n;
}
function FO(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = s[0] * 0.5, C = s[1] * 0.5, T = s[2] * 0.5, M = l[4], R = l[5], D = l[6], O = l[7];
  return n[0] = p, n[1] = h, n[2] = y, n[3] = v, n[4] = v * E + h * T - y * C + M, n[5] = v * C + y * E - p * T + R, n[6] = v * T + p * C - h * E + D, n[7] = -p * E - h * C - y * T + O, n;
}
function PO(n, l, s) {
  var p = -l[0], h = -l[1], y = -l[2], v = l[3], E = l[4], C = l[5], T = l[6], M = l[7], R = E * v + M * p + C * y - T * h, D = C * v + M * h + T * p - E * y, O = T * v + M * y + E * h - C * p, L = M * v - E * p - C * h - T * y;
  return hC(n, l, s), p = n[0], h = n[1], y = n[2], v = n[3], n[4] = R * v + L * p + D * y - O * h, n[5] = D * v + L * h + O * p - R * y, n[6] = O * v + L * y + R * h - D * p, n[7] = L * v - R * p - D * h - O * y, n;
}
function HO(n, l, s) {
  var p = -l[0], h = -l[1], y = -l[2], v = l[3], E = l[4], C = l[5], T = l[6], M = l[7], R = E * v + M * p + C * y - T * h, D = C * v + M * h + T * p - E * y, O = T * v + M * y + E * h - C * p, L = M * v - E * p - C * h - T * y;
  return mC(n, l, s), p = n[0], h = n[1], y = n[2], v = n[3], n[4] = R * v + L * p + D * y - O * h, n[5] = D * v + L * h + O * p - R * y, n[6] = O * v + L * y + R * h - D * p, n[7] = L * v - R * p - D * h - O * y, n;
}
function $O(n, l, s) {
  var p = -l[0], h = -l[1], y = -l[2], v = l[3], E = l[4], C = l[5], T = l[6], M = l[7], R = E * v + M * p + C * y - T * h, D = C * v + M * h + T * p - E * y, O = T * v + M * y + E * h - C * p, L = M * v - E * p - C * h - T * y;
  return yC(n, l, s), p = n[0], h = n[1], y = n[2], v = n[3], n[4] = R * v + L * p + D * y - O * h, n[5] = D * v + L * h + O * p - R * y, n[6] = O * v + L * y + R * h - D * p, n[7] = L * v - R * p - D * h - O * y, n;
}
function VO(n, l, s) {
  var p = s[0], h = s[1], y = s[2], v = s[3], E = l[0], C = l[1], T = l[2], M = l[3];
  return n[0] = E * v + M * p + C * y - T * h, n[1] = C * v + M * h + T * p - E * y, n[2] = T * v + M * y + E * h - C * p, n[3] = M * v - E * p - C * h - T * y, E = l[4], C = l[5], T = l[6], M = l[7], n[4] = E * v + M * p + C * y - T * h, n[5] = C * v + M * h + T * p - E * y, n[6] = T * v + M * y + E * h - C * p, n[7] = M * v - E * p - C * h - T * y, n;
}
function IO(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = s[0], C = s[1], T = s[2], M = s[3];
  return n[0] = p * M + v * E + h * T - y * C, n[1] = h * M + v * C + y * E - p * T, n[2] = y * M + v * T + p * C - h * E, n[3] = v * M - p * E - h * C - y * T, E = s[4], C = s[5], T = s[6], M = s[7], n[4] = p * M + v * E + h * T - y * C, n[5] = h * M + v * C + y * E - p * T, n[6] = y * M + v * T + p * C - h * E, n[7] = v * M - p * E - h * C - y * T, n;
}
function BO(n, l, s, p) {
  if (Math.abs(p) < ct)
    return TC(n, l);
  var h = Math.sqrt(s[0] * s[0] + s[1] * s[1] + s[2] * s[2]);
  p = p * 0.5;
  var y = Math.sin(p), v = y * s[0] / h, E = y * s[1] / h, C = y * s[2] / h, T = Math.cos(p), M = l[0], R = l[1], D = l[2], O = l[3];
  n[0] = M * T + O * v + R * C - D * E, n[1] = R * T + O * E + D * v - M * C, n[2] = D * T + O * C + M * E - R * v, n[3] = O * T - M * v - R * E - D * C;
  var L = l[4], j = l[5], F = l[6], K = l[7];
  return n[4] = L * T + K * v + j * C - F * E, n[5] = j * T + K * E + F * v - L * C, n[6] = F * T + K * C + L * E - j * v, n[7] = K * T - L * v - j * E - F * C, n;
}
function qO(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n[4] = l[4] + s[4], n[5] = l[5] + s[5], n[6] = l[6] + s[6], n[7] = l[7] + s[7], n;
}
function wC(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], E = s[4], C = s[5], T = s[6], M = s[7], R = l[4], D = l[5], O = l[6], L = l[7], j = s[0], F = s[1], K = s[2], J = s[3];
  return n[0] = p * J + v * j + h * K - y * F, n[1] = h * J + v * F + y * j - p * K, n[2] = y * J + v * K + p * F - h * j, n[3] = v * J - p * j - h * F - y * K, n[4] = p * M + v * E + h * T - y * C + R * J + L * j + D * K - O * F, n[5] = h * M + v * C + y * E - p * T + D * J + L * F + O * j - R * K, n[6] = y * M + v * T + p * C - h * E + O * J + L * K + R * F - D * j, n[7] = v * M - p * E - h * C - y * T + L * J - R * j - D * F - O * K, n;
}
var YO = wC;
function WO(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n[2] = l[2] * s, n[3] = l[3] * s, n[4] = l[4] * s, n[5] = l[5] * s, n[6] = l[6] * s, n[7] = l[7] * s, n;
}
var RC = fS;
function QO(n, l, s, p) {
  var h = 1 - p;
  return RC(l, s) < 0 && (p = -p), n[0] = l[0] * h + s[0] * p, n[1] = l[1] * h + s[1] * p, n[2] = l[2] * h + s[2] * p, n[3] = l[3] * h + s[3] * p, n[4] = l[4] * h + s[4] * p, n[5] = l[5] * h + s[5] * p, n[6] = l[6] * h + s[6] * p, n[7] = l[7] * h + s[7] * p, n;
}
function GO(n, l) {
  var s = Ly(l);
  return n[0] = -l[0] / s, n[1] = -l[1] / s, n[2] = -l[2] / s, n[3] = l[3] / s, n[4] = -l[4] / s, n[5] = -l[5] / s, n[6] = -l[6] / s, n[7] = l[7] / s, n;
}
function XO(n, l) {
  return n[0] = -l[0], n[1] = -l[1], n[2] = -l[2], n[3] = l[3], n[4] = -l[4], n[5] = -l[5], n[6] = -l[6], n[7] = l[7], n;
}
var bC = dS, KO = bC, Ly = pS, ZO = Ly;
function JO(n, l) {
  var s = Ly(l);
  if (s > 0) {
    s = Math.sqrt(s);
    var p = l[0] / s, h = l[1] / s, y = l[2] / s, v = l[3] / s, E = l[4], C = l[5], T = l[6], M = l[7], R = p * E + h * C + y * T + v * M;
    n[0] = p, n[1] = h, n[2] = y, n[3] = v, n[4] = (E - p * R) / s, n[5] = (C - h * R) / s, n[6] = (T - y * R) / s, n[7] = (M - v * R) / s;
  }
  return n;
}
function ez(n) {
  return "quat2(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ")";
}
function tz(n, l) {
  return n[0] === l[0] && n[1] === l[1] && n[2] === l[2] && n[3] === l[3] && n[4] === l[4] && n[5] === l[5] && n[6] === l[6] && n[7] === l[7];
}
function nz(n, l) {
  var s = n[0], p = n[1], h = n[2], y = n[3], v = n[4], E = n[5], C = n[6], T = n[7], M = l[0], R = l[1], D = l[2], O = l[3], L = l[4], j = l[5], F = l[6], K = l[7];
  return Math.abs(s - M) <= ct * Math.max(1, Math.abs(s), Math.abs(M)) && Math.abs(p - R) <= ct * Math.max(1, Math.abs(p), Math.abs(R)) && Math.abs(h - D) <= ct * Math.max(1, Math.abs(h), Math.abs(D)) && Math.abs(y - O) <= ct * Math.max(1, Math.abs(y), Math.abs(O)) && Math.abs(v - L) <= ct * Math.max(1, Math.abs(v), Math.abs(L)) && Math.abs(E - j) <= ct * Math.max(1, Math.abs(E), Math.abs(j)) && Math.abs(C - F) <= ct * Math.max(1, Math.abs(C), Math.abs(F)) && Math.abs(T - K) <= ct * Math.max(1, Math.abs(T), Math.abs(K));
}
const rz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: qO,
  clone: RO,
  conjugate: XO,
  copy: TC,
  create: wO,
  dot: RC,
  equals: nz,
  exactEquals: tz,
  fromMat4: DO,
  fromRotation: kO,
  fromRotationTranslation: CC,
  fromRotationTranslationValues: MO,
  fromTranslation: _O,
  fromValues: bO,
  getDual: AO,
  getReal: LO,
  getTranslation: jO,
  identity: OO,
  invert: GO,
  len: KO,
  length: bC,
  lerp: QO,
  mul: YO,
  multiply: wC,
  normalize: JO,
  rotateAroundAxis: BO,
  rotateByQuatAppend: VO,
  rotateByQuatPrepend: IO,
  rotateX: PO,
  rotateY: HO,
  rotateZ: $O,
  scale: WO,
  set: zO,
  setDual: UO,
  setReal: NO,
  sqrLen: ZO,
  squaredLength: Ly,
  str: ez,
  translate: FO
}, Symbol.toStringTag, { value: "Module" }));
function MC() {
  var n = new gn(2);
  return gn != Float32Array && (n[0] = 0, n[1] = 0), n;
}
function az(n) {
  var l = new gn(2);
  return l[0] = n[0], l[1] = n[1], l;
}
function iz(n, l) {
  var s = new gn(2);
  return s[0] = n, s[1] = l, s;
}
function lz(n, l) {
  return n[0] = l[0], n[1] = l[1], n;
}
function oz(n, l, s) {
  return n[0] = l, n[1] = s, n;
}
function uz(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n;
}
function _C(n, l, s) {
  return n[0] = l[0] - s[0], n[1] = l[1] - s[1], n;
}
function kC(n, l, s) {
  return n[0] = l[0] * s[0], n[1] = l[1] * s[1], n;
}
function DC(n, l, s) {
  return n[0] = l[0] / s[0], n[1] = l[1] / s[1], n;
}
function sz(n, l) {
  return n[0] = Math.ceil(l[0]), n[1] = Math.ceil(l[1]), n;
}
function cz(n, l) {
  return n[0] = Math.floor(l[0]), n[1] = Math.floor(l[1]), n;
}
function fz(n, l, s) {
  return n[0] = Math.min(l[0], s[0]), n[1] = Math.min(l[1], s[1]), n;
}
function dz(n, l, s) {
  return n[0] = Math.max(l[0], s[0]), n[1] = Math.max(l[1], s[1]), n;
}
function pz(n, l) {
  return n[0] = Ho(l[0]), n[1] = Ho(l[1]), n;
}
function vz(n, l, s) {
  return n[0] = l[0] * s, n[1] = l[1] * s, n;
}
function hz(n, l, s, p) {
  return n[0] = l[0] + s[0] * p, n[1] = l[1] + s[1] * p, n;
}
function OC(n, l) {
  var s = l[0] - n[0], p = l[1] - n[1];
  return Math.sqrt(s * s + p * p);
}
function zC(n, l) {
  var s = l[0] - n[0], p = l[1] - n[1];
  return s * s + p * p;
}
function LC(n) {
  var l = n[0], s = n[1];
  return Math.sqrt(l * l + s * s);
}
function AC(n) {
  var l = n[0], s = n[1];
  return l * l + s * s;
}
function mz(n, l) {
  return n[0] = -l[0], n[1] = -l[1], n;
}
function yz(n, l) {
  return n[0] = 1 / l[0], n[1] = 1 / l[1], n;
}
function gz(n, l) {
  var s = l[0], p = l[1], h = s * s + p * p;
  return h > 0 && (h = 1 / Math.sqrt(h)), n[0] = l[0] * h, n[1] = l[1] * h, n;
}
function Sz(n, l) {
  return n[0] * l[0] + n[1] * l[1];
}
function xz(n, l, s) {
  var p = l[0] * s[1] - l[1] * s[0];
  return n[0] = n[1] = 0, n[2] = p, n;
}
function Ez(n, l, s, p) {
  var h = l[0], y = l[1];
  return n[0] = h + p * (s[0] - h), n[1] = y + p * (s[1] - y), n;
}
function Cz(n, l) {
  l = l === void 0 ? 1 : l;
  var s = lo() * 2 * Math.PI;
  return n[0] = Math.cos(s) * l, n[1] = Math.sin(s) * l, n;
}
function Tz(n, l, s) {
  var p = l[0], h = l[1];
  return n[0] = s[0] * p + s[2] * h, n[1] = s[1] * p + s[3] * h, n;
}
function wz(n, l, s) {
  var p = l[0], h = l[1];
  return n[0] = s[0] * p + s[2] * h + s[4], n[1] = s[1] * p + s[3] * h + s[5], n;
}
function Rz(n, l, s) {
  var p = l[0], h = l[1];
  return n[0] = s[0] * p + s[3] * h + s[6], n[1] = s[1] * p + s[4] * h + s[7], n;
}
function bz(n, l, s) {
  var p = l[0], h = l[1];
  return n[0] = s[0] * p + s[4] * h + s[12], n[1] = s[1] * p + s[5] * h + s[13], n;
}
function Mz(n, l, s, p) {
  var h = l[0] - s[0], y = l[1] - s[1], v = Math.sin(p), E = Math.cos(p);
  return n[0] = h * E - y * v + s[0], n[1] = h * v + y * E + s[1], n;
}
function _z(n, l) {
  var s = n[0], p = n[1], h = l[0], y = l[1];
  return Math.abs(Math.atan2(p * h - s * y, s * h + p * y));
}
function kz(n, l) {
  var s = n[0], p = n[1], h = l[0], y = l[1];
  return Math.atan2(s * y - p * h, s * h + p * y);
}
function Dz(n) {
  return n[0] = 0, n[1] = 0, n;
}
function Oz(n) {
  return "vec2(" + n[0] + ", " + n[1] + ")";
}
function zz(n, l) {
  return n[0] === l[0] && n[1] === l[1];
}
function Lz(n, l) {
  var s = n[0], p = n[1], h = l[0], y = l[1];
  return Math.abs(s - h) <= ct * Math.max(1, Math.abs(s), Math.abs(h)) && Math.abs(p - y) <= ct * Math.max(1, Math.abs(p), Math.abs(y));
}
var Az = LC, Nz = _C, Uz = kC, jz = DC, Fz = OC, Pz = zC, Hz = AC, $z = (function() {
  var n = MC();
  return function(l, s, p, h, y, v) {
    var E, C;
    for (s || (s = 2), p || (p = 0), h ? C = Math.min(h * s + p, l.length) : C = l.length, E = p; E < C; E += s)
      n[0] = l[E], n[1] = l[E + 1], y(n, n, v), l[E] = n[0], l[E + 1] = n[1];
    return l;
  };
})();
const Vz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: uz,
  angle: _z,
  ceil: sz,
  clone: az,
  copy: lz,
  create: MC,
  cross: xz,
  dist: Fz,
  distance: OC,
  div: jz,
  divide: DC,
  dot: Sz,
  equals: Lz,
  exactEquals: zz,
  floor: cz,
  forEach: $z,
  fromValues: iz,
  inverse: yz,
  len: Az,
  length: LC,
  lerp: Ez,
  max: dz,
  min: fz,
  mul: Uz,
  multiply: kC,
  negate: mz,
  normalize: gz,
  random: Cz,
  rotate: Mz,
  round: pz,
  scale: vz,
  scaleAndAdd: hz,
  set: oz,
  signedAngle: kz,
  sqrDist: Pz,
  sqrLen: Hz,
  squaredDistance: zC,
  squaredLength: AC,
  str: Oz,
  sub: Nz,
  subtract: _C,
  transformMat2: Tz,
  transformMat2d: wz,
  transformMat3: Rz,
  transformMat4: bz,
  zero: Dz
}, Symbol.toStringTag, { value: "Module" })), Iz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: j_,
  mat2: uk,
  mat2d: zk,
  mat3: uD,
  mat4: $E,
  quat: TO,
  quat2: rz,
  vec2: Vz,
  vec3: k5,
  vec4: J5
}, Symbol.toStringTag, { value: "Module" })), Ay = Oy;
function Ny() {
  dr.call(this), this.events = {
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
var hr = Ny.prototype = Object.create(dr.prototype), il = new Float32Array([0, 0, 0]), Dl = new Float32Array(16);
hr.constructor = Ny;
hr.local = null;
hr.worldMatrix = null;
hr.worldToLocal = null;
hr.children = null;
hr.parent = null;
hr.dirtyW = !0;
hr.dirtyL = !0;
hr.onParentUpdate = null;
hr.addChild = function(n) {
  this.children[this.children.length] = n, n.setParent(this);
};
hr.removeChild = function(n) {
  this.children.splice(this.children.indexOf(n), 1), n.removeParent();
};
hr.setParent = function(n) {
  this.parent = n, n.gameObject.world !== null && n.gameObject.world.addGameObject(this.gameObject);
};
hr.setGameObject = function(n) {
  dr.prototype.setGameObject.call(this, n), n.transform = this;
};
hr.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
hr.removeParent = function() {
  this.parent = null;
};
hr.translate = function(n, l, s, p) {
  il[0] = n, il[1] = l, il[2] = s, p === "world" ? (iS(Dl), nS(Dl, Dl, il), Ay(this.local, Dl, this.local)) : nS(this.local, this.local, il);
};
hr.rotate = function(n, l, s, p) {
  var h = Math.PI / 180, y = $E;
  p === "world" ? (y.identity(Dl), y.rotateZ(Dl, Dl, s * h), y.rotateY(Dl, Dl, l * h), y.rotateX(Dl, Dl, n * h), Ay(this.local, Dl, this.local)) : (y.rotateZ(this.local, this.local, s * h), y.rotateY(this.local, this.local, l * h), y.rotateX(this.local, this.local, n * h));
};
hr.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.worldMatrix.set(this.local) : Ay(this.worldMatrix, this.parent.getLocalToWorld(), this.local)), this.worldMatrix;
};
hr.getWorldToLocal = function() {
  return this.dirtyW === !0 && DE(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
};
hr.getPosition = function(n) {
  n === void 0 && (n = []);
  var l = this.getLocalToWorld();
  return n[0] = l[12], n[1] = l[13], n[2] = l[14], n;
};
hr.getLocalPosition = function(n) {
  n === void 0 && (n = []);
  var l = this.local;
  return n[0] = l[12], n[1] = l[13], n[2] = l[14], n;
};
hr.getRotation = function() {
  throw "TransformComponent.getRotation not implemented yet";
};
hr.getLocalRotation = function() {
  throw "TransformComponent.getLocalRotation not implemented yet";
};
hr.setPosition = function(n, l, s) {
  il[0] = n, il[1] = l, il[2] = s, this.parent !== null && XE(il, il, this.parent.getWorldToLocal()), this.local[12] = il[0], this.local[13] = il[1], this.local[14] = il[2];
};
hr.setLocalPosition = function(n, l, s) {
  this.local[12] = n, this.local[13] = l, this.local[14] = s;
};
hr.scale = function(n, l, s) {
  zE(this.local, this.local, [n, l, s]);
};
hr.updateWorldMatrix = function(n = !1) {
  this.parent === null ? this.worldMatrix.set(this.local) : (n && this.parent.updateWorldMatrix(n), Ay(this.worldMatrix, this.parent.worldMatrix, this.local));
};
function ki(n) {
  this.instanceId = ki.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new Ny()), this.name = n || "gameObject";
}
var Ol = ki.prototype;
Ol.instanceId = 0;
Ol.name = null;
Ol.layer = 0;
Ol.scene = null;
Ol.world = null;
Ol.transform = null;
Ol.components = null;
Ol.componentsCount = 0;
Ol.setScene = function(n) {
  this.scene = n;
};
Ol.addComponent = function(n) {
  return this.components[this.componentsCount++] = n, n.setGameObject(this), n;
};
Ol.removeComponent = function(n) {
  n.unsetGameObject();
};
Ol.getComponent = function(n) {
  for (var l = 0; l < this.components.length; l++) {
    var s = this.components[l];
    if (s instanceof n)
      return s;
  }
  return null;
};
const NC = {
  NONE: "NONE",
  RADIAL: "RADIAL",
  RADIAL_FAST: "RADIAL_FAST",
  LINEAR: "LINEAR"
};
function Pn(n) {
  dr.call(this), this.transform = n, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ], this.zoom = 1;
}
Pn.prototype = Object.create(dr.prototype);
Pn.prototype.constructor = Pn;
Pn.prototype.frustumSize = null;
Pn.prototype.projectionMatrix = null;
Pn.prototype.clipSpaceMatrix = null;
Pn.prototype.nearClippingPane = 0;
Pn.prototype.farClippingPane = 1e3;
Pn.prototype.fogType = NC.LINEAR;
Pn.prototype.fogNearPane = 250;
Pn.prototype.fogFarPane = 750;
Pn.prototype.fogColor = 9868950;
Pn.prototype.bgColor = -1;
Pn.prototype.ambientLight = 8421504;
Pn.prototype.setup = function(n, l) {
  const s = n / this.zoom, p = l / this.zoom;
  this.frustumSize = [
    [-s / 2, -p / 2, 0],
    [s / 2, p / 2, this.farClippingPane]
  ], PE(this.projectionMatrix, -s / 2, s / 2, -p / 2, p / 2, this.nearClippingPane, this.farClippingPane);
};
Pn.prototype.setGameObject = function(n) {
  dr.prototype.setGameObject.call(this, n), n.camera = this;
};
Pn.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, dr.prototype.unsetGameObject.call(this);
};
Pn.prototype.getClipSpaceMatrix = function() {
  const n = this.transform.getWorldToLocal();
  return Oy(this.clipSpaceMatrix, this.projectionMatrix, n), this.clipSpaceMatrix;
};
Pn.FogType = NC;
function UC(n) {
  ki.call(this, n || "camera"), this.addComponent(new Pn(this.transform));
}
UC.prototype = Object.create(ki.prototype);
function sa() {
  dr.call(this), this.colors = new Uint32Array([255]), this.faceColors = new Uint32Array([0]), this.depthBias = 0;
}
var ca = sa.prototype = Object.create(dr.prototype);
ca.constructor = sa;
ca.depthBias = 0;
ca.layer = 0;
ca.vertices = null;
ca.faces = null;
ca.pivot = [0, 0, 0];
ca.color = null;
ca.colors = null;
ca.uvs = null;
ca._texture = null;
ca.textureImage = null;
ca.shaderType = 0;
Object.defineProperty(ca, "texture", {
  get: function() {
    return this._texture;
  },
  set: function(n) {
    this._texture !== n && (this._texture = n, n ? (this.textureImage || (this.textureImage = new Image()), this.textureImage.src = n) : this.textureImage = null);
  }
});
ca.faceColors = null;
ca.faceNormals = null;
ca.vertexNormals = null;
ca.bounds = null;
ca.updateNormals = function(n = 1) {
  const l = this.faces, s = this.vertices, p = l.length;
  (!this.faceNormals || this.faceNormals.length !== p) && (this.faceNormals = new Float32Array(p)), !this.vertexNormals || this.vertexNormals.length !== s.length ? this.vertexNormals = new Float32Array(s.length) : this.vertexNormals.fill(0);
  for (let h = 0; h < p; h += 3) {
    const y = l[h] * 3, v = l[h + 1] * 3, E = l[h + 2] * 3, C = s[v] - s[y], T = s[v + 1] - s[y + 1], M = s[v + 2] - s[y + 2], R = s[E] - s[y], D = s[E + 1] - s[y + 1], O = s[E + 2] - s[y + 2];
    let L = (T * O - M * D) * n, j = (M * R - C * O) * n, F = (C * D - T * R) * n;
    const K = Math.sqrt(L * L + j * j + F * F);
    if (K > 1e-10) {
      const J = 1 / K;
      this.faceNormals[h] = L * J, this.faceNormals[h + 1] = j * J, this.faceNormals[h + 2] = F * J, this.vertexNormals[y] += L, this.vertexNormals[y + 1] += j, this.vertexNormals[y + 2] += F, this.vertexNormals[v] += L, this.vertexNormals[v + 1] += j, this.vertexNormals[v + 2] += F, this.vertexNormals[E] += L, this.vertexNormals[E + 1] += j, this.vertexNormals[E + 2] += F;
    }
  }
  for (let h = 0; h < this.vertexNormals.length; h += 3) {
    const y = this.vertexNormals[h], v = this.vertexNormals[h + 1], E = this.vertexNormals[h + 2], C = Math.sqrt(y * y + v * v + E * E);
    if (C > 1e-10) {
      const T = 1 / C;
      this.vertexNormals[h] *= T, this.vertexNormals[h + 1] *= T, this.vertexNormals[h + 2] *= T;
    } else
      this.vertexNormals[h + 1] = 1;
  }
};
ca.setGameObject = function(n) {
  dr.prototype.setGameObject.call(this, n), n.meshRenderer = this;
};
ca.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, dr.prototype.unsetGameObject.call(this);
};
sa.computeNormalMatrix = function(n, l) {
  const s = l[0], p = l[1], h = l[2], y = l[4], v = l[5], E = l[6], C = l[8], T = l[9], M = l[10], R = v * M - E * T, D = -(y * M - E * C), O = y * T - v * C, L = s * R + p * D + h * O;
  if (Math.abs(L) < 1e-6) return null;
  const j = 1 / L;
  n[0] = R * j, n[1] = D * j, n[2] = O * j, n[3] = -(p * M - h * T) * j, n[4] = (s * M - h * C) * j, n[5] = -(s * T - p * C) * j, n[6] = (p * E - h * v) * j, n[7] = -(s * E - h * y) * j, n[8] = (s * v - p * y) * j;
};
sa.computeBoundsFlatArray = function(n, l, s) {
  if (s.length !== 0) {
    for (var p = s[0], h = p, y = s[1], v = y, E = s[2], C = E, T = 3; T < s.length; T += 3) {
      var M = s[T], R = s[T + 1], D = s[T + 2];
      M < p ? p = M : M > h && (h = M), R < y ? y = R : R > v && (v = R), D < E ? E = D : D > C && (C = D);
    }
    return n[l] = p, n[l + 1] = y, n[l + 2] = E, n[l + 3] = h, n[l + 4] = y, n[l + 5] = E, n[l + 6] = p, n[l + 7] = v, n[l + 8] = E, n[l + 9] = h, n[l + 10] = v, n[l + 11] = E, n[l + 12] = p, n[l + 13] = y, n[l + 14] = C, n[l + 15] = h, n[l + 16] = y, n[l + 17] = C, n[l + 18] = p, n[l + 19] = v, n[l + 20] = C, n[l + 21] = h, n[l + 22] = v, n[l + 23] = C, n;
  }
};
sa.computeBoundingSphere = function(n, l, s) {
  let p = 1 / 0, h = 1 / 0, y = 1 / 0, v = -1 / 0, E = -1 / 0, C = -1 / 0;
  for (let F = 0; F < s.length; F += 3) {
    const K = s[F], J = s[F + 1], B = s[F + 2];
    K < p && (p = K), K > v && (v = K), J < h && (h = J), J > E && (E = J), B < y && (y = B), B > C && (C = B);
  }
  const T = (p + v) * 0.5, M = (h + E) * 0.5, R = (y + C) * 0.5, D = v - T, O = E - M, L = C - R, j = Math.sqrt(D * D + O * O + L * L);
  n[l] = T, n[l + 1] = M, n[l + 2] = R, n[l + 3] = j;
};
function hS(n) {
  dr.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var _u = hS.prototype = Object.create(dr.prototype);
_u.constructor = hS;
_u.sprite = null;
_u.pivotX = 0;
_u.pivotY = 0;
_u.layer = 0;
_u.setGameObject = function(n) {
  dr.prototype.setGameObject.call(this, n), n.spriteRenderer = this;
};
_u.setSprite = function(n) {
  return this.sprite = n, this.enabled = !0, this;
};
_u.setPivot = function(n, l) {
  return this.pivotX = n, this.pivotY = l, this;
};
_u.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, dr.prototype.unsetGameObject.call(this);
};
function mS() {
  dr.call(this), this.points = [];
}
var kc = mS.prototype = Object.create(dr.prototype);
kc.constructor = mS;
kc.points = null;
kc.color = "white";
kc.width = 1;
kc.layer = 0;
kc.setGameObject = function(n) {
  dr.prototype.setGameObject.call(this, n), n.pathRenderer = this;
};
kc.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, dr.prototype.unsetGameObject.call(this);
};
function yS() {
  dr.call(this);
}
var ku = yS.prototype = Object.create(dr.prototype);
ku.constructor = yS;
ku.text = "sample text";
ku.color = "white";
ku.style = "normal 12px arial";
ku.layer = 0;
ku.align = "center";
ku.valign = "middle";
ku.setGameObject = function(n) {
  dr.prototype.setGameObject.call(this, n), n.textRenderer = this;
};
ku.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, dr.prototype.unsetGameObject.call(this);
};
function Bz(n, l, s) {
  const p = [], h = [], y = n / 2, v = l / 2, E = n / s, C = l / s;
  for (let M = 0; M <= s; M++) {
    const R = M * C - v;
    for (let D = 0; D <= s; D++) {
      const O = D * E - y;
      p.push(O, 0, R);
    }
  }
  const T = s + 1;
  for (let M = 0; M < s; M++)
    for (let R = 0; R < s; R++) {
      const D = M * T + R, O = M * T + (R + 1), L = (M + 1) * T + R, j = (M + 1) * T + (R + 1);
      h.push(D, L, O), h.push(j, O, L);
    }
  return {
    vertices: new Float32Array(p),
    faces: new Uint16Array(h)
  };
}
const by = Bz(1, 1, 1), gS = new Float32Array(32);
sa.computeBoundsFlatArray(gS, 0, by.vertices);
sa.computeBoundingSphere(gS, 28, by.vertices);
function jC() {
  ki.call(this);
  const n = new sa();
  n.faces = by.faces, n.vertices = by.vertices, n.bounds = gS, n.updateNormals(), this.addComponent(n);
}
jC.prototype = Object.create(ki.prototype);
function qz(n, l, s, p) {
  const h = [], y = [], v = [];
  function E(T, M, R, D, O, L) {
    const j = `${T.toFixed(5)},${M.toFixed(5)},${R.toFixed(5)}`;
    if (L[j] !== void 0) return L[j];
    const F = h.length / 3;
    return h.push(T, M, R), y.push(D, O), L[j] = F, F;
  }
  function C(T, M, R, D, O, L, j, F, K, J) {
    const B = {}, ee = j / J, q = F / J, re = j / 2, pe = F / 2, Le = K / 2 * L, he = [];
    for (let ie = 0; ie <= J; ie++) {
      const ze = [], we = ie * q - pe;
      for (let fe = 0; fe <= J; fe++) {
        const me = fe * ee - re, Fe = [0, 0, 0];
        Fe[T] = me * D, Fe[M] = we * O, Fe[R] = Le;
        const Ue = fe / J, ge = 1 - ie / J;
        ze.push(E(Fe[0], Fe[1], Fe[2], Ue, ge, B));
      }
      he.push(ze);
    }
    for (let ie = 0; ie < J; ie++)
      for (let ze = 0; ze < J; ze++) {
        const we = he[ie][ze], fe = he[ie + 1][ze], me = he[ie + 1][ze + 1], Fe = he[ie][ze + 1];
        v.push(we, Fe, fe), v.push(fe, Fe, me);
      }
  }
  return C(0, 1, 2, 1, 1, 1, n, l, s, p), C(0, 1, 2, -1, 1, -1, n, l, s, p), C(2, 1, 0, -1, 1, 1, s, l, n, p), C(2, 1, 0, 1, 1, -1, s, l, n, p), C(0, 2, 1, 1, -1, 1, n, s, l, p), C(0, 2, 1, 1, 1, -1, n, s, l, p), {
    vertices: new Float32Array(h),
    uvs: new Float32Array(y),
    faces: new Uint16Array(v)
  };
}
const bv = qz(1, 1, 1, 1), SS = new Float32Array(32);
sa.computeBoundsFlatArray(SS, 0, bv.vertices);
sa.computeBoundingSphere(SS, 28, bv.vertices);
function FC() {
  ki.call(this);
  const n = new sa();
  n.vertices = bv.vertices, n.uvs = bv.uvs, n.faces = bv.faces, n.bounds = SS, n.updateNormals(), this.addComponent(n);
}
FC.prototype = Object.create(ki.prototype);
function Yz(n, l, s) {
  const p = [], h = [];
  p.push(0, s, 0), p.push(0, 0, 0);
  for (let y = 0; y < n; y++) {
    const v = y / n * Math.PI * 2, E = Math.cos(v) * l, C = Math.sin(v) * l;
    p.push(E, 0, C);
  }
  for (let y = 0; y < n; y++) {
    const v = y + 2, E = y === n - 1 ? 2 : y + 3;
    h.push(0, E, v), h.push(1, v, E);
  }
  return {
    vertices: new Float32Array(p),
    faces: new Uint16Array(h)
  };
}
const My = Yz(7, 0.5, 1), xS = new Float32Array(32);
sa.computeBoundsFlatArray(xS, 0, My.vertices);
sa.computeBoundingSphere(xS, 28, My.vertices);
function PC() {
  ki.call(this);
  const n = new sa();
  n.vertices = My.vertices, n.faces = My.faces, n.bounds = xS, n.updateNormals(), this.addComponent(n);
}
PC.prototype = Object.create(ki.prototype);
function Wz(n, l, s) {
  const p = [], h = [], y = [], v = {};
  function E(T, M, R, D, O) {
    const L = `${T.toFixed(5)},${M.toFixed(5)},${R.toFixed(5)},${D.toFixed(5)},${O.toFixed(5)}`;
    if (v[L] !== void 0) return v[L];
    const j = p.length / 3;
    return p.push(T, M, R), h.push(D, O), v[L] = j, j;
  }
  const C = [];
  for (let T = 0; T <= n; T++) {
    const M = [], R = T * Math.PI / n, D = Math.sin(R), O = Math.cos(R);
    for (let L = 0; L <= l; L++) {
      const j = L * 2 * Math.PI / l, F = Math.cos(j) * D * s, K = O * s, J = Math.sin(j) * D * s, B = L / l, ee = T / n;
      M.push(E(F, K, J, B, ee));
    }
    C.push(M);
  }
  for (let T = 0; T < n; T++)
    for (let M = 0; M < l; M++) {
      const R = C[T][M], D = C[T][M + 1], O = C[T + 1][M], L = C[T + 1][M + 1];
      T !== 0 && y.push(R, D, O), T !== n - 1 && y.push(O, D, L);
    }
  return {
    vertices: new Float32Array(p),
    uvs: new Float32Array(h),
    faces: new Uint16Array(y)
  };
}
function Qz(n = 8, l = 8, s = 8) {
  const p = Wz(n, l, s), h = new Float32Array(32);
  return sa.computeBoundsFlatArray(h, 0, p.vertices), sa.computeBoundingSphere(h, 28, p.vertices), [
    p.vertices,
    p.faces,
    p.uvs,
    h
  ];
}
function ES(n, l, s, p) {
  ki.call(this);
  const h = new sa();
  h.vertices = n, h.faces = l, h.uvs = s, h.bounds = p, h.updateNormals(), this.addComponent(h);
}
ES.prototype = Object.create(ki.prototype);
ES.generate = Qz;
function Gz() {
  const n = new Array(65536);
  for (let l = 0; l < 65536; l++) {
    const s = l >> 11 & 31, p = l >> 5 & 63, h = l & 31, y = s << 3 | s >> 2, v = p << 2 | p >> 4, E = h << 3 | h >> 2;
    n[l] = "#" + (y < 16 ? "0" : "") + y.toString(16) + (v < 16 ? "0" : "") + v.toString(16) + (E < 16 ? "0" : "") + E.toString(16);
  }
  return n;
}
const nE = D_;
function Xz(n, l, s, p) {
  var h = n.transform.getLocalToWorld(), y = h[12], v = h[13], E = h[14];
  nE(
    p,
    0,
    y,
    v,
    E,
    s
  );
  for (var C = p[0], T = p[1], M = 50, R = [
    { x: h[0], y: h[1], z: h[2], col: "#ff0000" },
    // X
    { x: h[4], y: h[5], z: h[6], col: "#00ff00" },
    // Y
    { x: h[8], y: h[9], z: h[10], col: "#0000ff" }
    // Z
  ], D = 0; D < 3; D++) {
    var O = R[D], L = Math.sqrt(O.x * O.x + O.y * O.y + O.z * O.z);
    L < 1e-4 && (D === 0 ? O.x = 1 : D === 1 ? O.y = 1 : O.z = 1, L = 1);
    var j = O.x / L, F = O.y / L, K = O.z / L;
    nE(
      p,
      0,
      y + j * M,
      v + F * M,
      E + K * M,
      s
    ), l.beginPath(), l.lineWidth = 2, l.strokeStyle = O.col, l.moveTo(C, T), l.lineTo(p[0], p[1]), l.stroke();
  }
}
function Kz(n, l, s, p, h, y, v, E, C) {
  if (v <= 1) return;
  const T = C - E > 1e-4 ? 65535 / (C - E) : 0;
  y.fill(0);
  for (let R = 0; R < v; R++) {
    const D = n[R], O = h[D] & 255;
    y[O]++;
  }
  let M = 0;
  for (let R = 0; R < 256; R++) {
    const D = y[R];
    y[R] = M, M += D;
  }
  for (let R = 0; R < v; R++) {
    const D = n[R], O = h[D] & 255;
    l[y[O]++] = D;
  }
  y.fill(0);
  for (let R = 0; R < v; R++) {
    const D = l[R], O = p[D] & 255;
    y[O]++;
  }
  M = 0;
  for (let R = 0; R < 256; R++) {
    const D = y[R];
    y[R] = M, M += D;
  }
  for (let R = 0; R < v; R++) {
    const D = l[R], O = p[D] & 255;
    n[y[O]++] = D;
  }
  y.fill(0);
  for (let R = 0; R < v; R++) {
    const D = n[R];
    let L = (s[D] - E) * T;
    L < 0 ? L = 0 : L > 65535 && (L = 65535);
    const j = 65535 - (L | 0) & 255;
    y[j]++;
  }
  M = 0;
  for (let R = 0; R < 256; R++) {
    const D = y[R];
    y[R] = M, M += D;
  }
  for (let R = 0; R < v; R++) {
    const D = n[R];
    let L = (s[D] - E) * T;
    L < 0 ? L = 0 : L > 65535 && (L = 65535);
    const j = 65535 - (L | 0) & 255;
    l[y[j]++] = D;
  }
  y.fill(0);
  for (let R = 0; R < v; R++) {
    const D = l[R];
    let L = (s[D] - E) * T;
    L < 0 ? L = 0 : L > 65535 && (L = 65535);
    const j = 65535 - (L | 0) >> 8 & 255;
    y[j]++;
  }
  M = 0;
  for (let R = 0; R < 256; R++) {
    const D = y[R];
    y[R] = M, M += D;
  }
  for (let R = 0; R < v; R++) {
    const D = l[R];
    let L = (s[D] - E) * T;
    L < 0 ? L = 0 : L > 65535 && (L = 65535);
    const j = 65535 - (L | 0) >> 8 & 255;
    n[y[j]++] = D;
  }
}
const Zz = sa.computeNormalMatrix, Zg = k_, rE = Oy, Jz = Xz, Gr = Gz(), Jg = 0.6;
function e4(n, l, s, p, h) {
  if (p === 1)
    return n;
  const y = n[0] + 1;
  s.fill(0);
  for (let E = 1; E < y; E++) {
    const C = n[E], T = l[C];
    T.meshRenderer && s[T.meshRenderer.layer]++;
  }
  let v = 0;
  for (let E = 0; E < p; E++) {
    const C = s[E];
    s[E] = v, h[v] = 0, v += 1 + C;
  }
  for (let E = 1; E < y; E++) {
    const C = n[E], T = l[C];
    if (T.meshRenderer) {
      const M = T.meshRenderer.layer, R = s[M], D = h[R];
      h[R + 1 + D] = C, h[R] = D + 1;
    }
  }
  return h;
}
function HC() {
  this.layerBuffers = new Uint32Array(0), this.layerBuffersOffsets = new Uint32Array(yd.layersCount), this.drawCalls = 0, this.faces = 0, this.lightDirection = new Float32Array([0, 0, 0]), this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.colorBuffer = new Uint32Array(0), this.shaderTypeBuffer = new Uint8Array(0), this.shaderPassBuffer = new Uint8Array(0), this.faceNormalsBuffer = new Float32Array(0), this.vertexNormalsBuffer = new Float32Array(0), this.meshIndexBuffer = new Uint32Array(0), this.meshFaceIndexBuffer = new Uint32Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.lightsIndexBuffer = new Uint32Array(10), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0), this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0), this.tempIndexBuffer = new Uint32Array(0), this.counters = new Uint32Array(256);
}
var Dc = HC.prototype;
Dc.vec3Cache1 = new Float32Array([0, 0, 0]);
Dc.vec3Cache2 = new Float32Array([0, 0, 0]);
Dc.vec4Cache = new Float32Array([0, 0, 0]);
Dc.mat4Scratchpad1 = new Float32Array(16);
Dc.mat4Scratchpad2 = new Float32Array(16);
Dc.mat3Scratchpad1 = new Float32Array(9);
Dc.render = function(n, l, s) {
  let p = performance.now();
  const h = performance.now();
  let y = n.scene.retrieve();
  const v = performance.now() - h;
  let E = yd.layersCount, C = l.width, T = l.height, M, R, D, O = this.vec3Cache1, L = this.vec3Cache2, j = this.vec4Cache, F = this.depthBuffer, K = this.indexBuffer, J = this.vertexIndexBuffer, B = this.vertexBuffer, ee = this.clipGeometryBuffer, q = this.colorBuffer, re = this.shaderTypeBuffer, pe = this.shaderPassBuffer, Le = this.faceNormalsBuffer, he = this.vertexNormalsBuffer, ie = this.meshIndexBuffer, ze = this.meshFaceIndexBuffer, we = this.visibleObjectsBuffer, fe = this.lightsIndexBuffer, me = this.layerBuffersOffsets, Fe = this.mat4Scratchpad1, Ue = this.mat4Scratchpad2, ge = l.getWorldToScreen(), de = n.transform.getWorldToLocal(), Ae = n.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let ae = this.tempIndexBuffer, H = this.counters, ue = 0, Ve = 0;
  const Me = n.camera, Pe = n.camera.fogType !== Pn.FogType.NONE ? Me.fogColor : Me.bgColor;
  if (Me.bgColor !== -1) {
    const Nt = Pe >>> 16, Ot = Pe >>> 8 & 255, Ht = Pe & 255, ln = Nt & 248, $t = Ot & 252, Sn = Ht & 248, $n = ln << 8 | $t << 3 | Sn >> 3;
    l.context.fillStyle = Gr[$n], l.context.fillRect(0, 0, l.width, l.height);
  } else
    l.context.clearRect(0, 0, l.width, l.height);
  if (we.length < y.length) {
    const Nt = we;
    this.visibleObjectsBuffer = we = new Uint32Array(
      y.length
    ), we.set(Nt);
  }
  if (fe.length < y.length) {
    const Nt = fe;
    this.lightsIndexBuffer = fe = new Uint32Array(
      y.length
    ), fe.set(Nt);
  }
  const Ge = performance.now();
  t4(
    y,
    Ae,
    we,
    fe
  ), n4(we, y, Ae);
  const He = performance.now() - Ge, Ie = we[0] + 1, Be = we[0];
  E > 1 && this.layerBuffers.length < Be + E && (this.layerBuffers = new Uint32Array((Be + E) * 2));
  const Xt = performance.now();
  let Tn = e4(
    we,
    y,
    me,
    E,
    this.layerBuffers
  );
  const Hn = performance.now() - Xt;
  let an = 0, _e = 0, tn = 0, et = 0;
  for (M = 0; M < E; M++) {
    const Nt = Tn[et];
    if (Nt === 0) {
      et += 1;
      continue;
    }
    D = l.layers[M];
    let Ot = 0, Ht = 0;
    for (let $e = 0; $e < Nt; $e++) {
      const on = y[Tn[et + 1 + $e]].meshRenderer;
      Ot += on.faces.length;
      const Vn = on.vertices.length;
      Vn > Ht && (Ht = Vn);
    }
    Ot = Ot / 3 | 0;
    const ln = Ht / 3 | 0;
    if (this.vMapping.length < ln && (this.vMapping = new Int32Array(ln), this.vTags = new Uint32Array(ln)), O.length < Ht && (this.vec3Cache1 = O = new Float32Array(Ht), this.vec3Cache2 = L = new Float32Array(Ht), this.vec4Cache = j = new Float32Array(Ht * 4 / 3)), F.length < Ot) {
      let $e = new Float32Array(Ot);
      $e.set(F), this.depthBuffer = F = $e, $e = new Uint32Array(Ot), $e.set(K), this.indexBuffer = K = $e, $e = new Uint32Array(Ot), $e.set(ae), this.tempIndexBuffer = ae = $e, $e = new Uint32Array(Ot), $e.set(q), this.colorBuffer = q = $e, $e = new Uint8Array(Ot), $e.set(re), this.shaderTypeBuffer = re = $e, $e = new Uint8Array(Ot), $e.set(pe), this.shaderPassBuffer = pe = $e, $e = new Float32Array(Ot * 9), $e.set(ee), this.clipGeometryBuffer = ee = $e, $e = new Float32Array(Ot * 3), $e.set(Le), this.faceNormalsBuffer = Le = $e, $e = new Float32Array(Ot * 9), $e.set(he), this.vertexNormalsBuffer = he = $e, $e = new Uint32Array(Ot), $e.set(ie), this.meshIndexBuffer = ie = $e, $e = new Uint32Array(Ot), $e.set(ze), this.meshFaceIndexBuffer = ze = $e;
      let on = new Float32Array(Ot * 6);
      on.set(B), this.vertexBuffer = B = on;
      let Vn = new Uint32Array(Ot * 3);
      Vn.set(J), this.vertexIndexBuffer = J = Vn;
    }
    const $t = performance.now(), Sn = r4(
      Tn,
      et + 1,
      y,
      Nt,
      L,
      j,
      K,
      F,
      q,
      re,
      pe,
      ee,
      de,
      Ae,
      Ue,
      Fe,
      this.mat3Scratchpad1,
      Le,
      he,
      B,
      J,
      ie,
      ze,
      this.vMapping,
      this.vTags
    );
    if (_e += performance.now() - $t, (yd.depthSortingMask & M + 1) === M + 1) {
      const $e = performance.now();
      Kz(K, ae, F, ie, pe, H, Sn, Me.nearClippingPane, Me.farClippingPane), an += performance.now() - $e;
    }
    const $n = (yd.layerClearMask & M + 1) === M + 1, Er = performance.now();
    for (a4(
      D,
      B,
      J,
      K,
      q,
      re,
      Sn,
      0,
      $n,
      C,
      T,
      ee,
      F,
      n.camera.fogType,
      n.camera.fogColor,
      n.camera.fogNearPane,
      n.camera.fogFarPane,
      n.scene,
      this.lightDirection,
      n.camera.ambientLight,
      Le,
      he,
      ie,
      ze,
      Tn,
      et + 1,
      this.wireframe,
      fe,
      y
    ), R = 0; R < Nt; R++) {
      const $e = Tn[et + 1 + R], on = y[$e];
      on && on.debug && Jz(on, D, ge, O);
    }
    l.context.drawImage(D.canvas, 0, 0), tn += performance.now() - Er, ue += Sn, Ve += Sn, et += 1 + Nt;
  }
  s.totalObjects = y.length, s.visibleObjects = Ie, s.drawCalls = ue, s.faces = Ve, s.sortTime = an, s.cullTime = He, s.groupTime = Hn, s.processTime = _e, s.drawTime = tn, s.updateTime = n.scene && n.scene.world ? n.scene.world.lastTickTime : 0, s.retrieveTime = v, s.dt = performance.now() - p;
};
function t4(n, l, s, p) {
  let h = 0, y = 0;
  const v = l[0], E = l[1], C = l[2], T = l[3], M = l[4], R = l[5], D = l[6], O = l[7], L = l[8], j = l[9], F = l[10], K = l[11], J = l[12], B = l[13], ee = l[14], q = l[15];
  let re = T + v, pe = O + M, Le = K + L, he = q + J, ie = 1 / Math.sqrt(re * re + pe * pe + Le * Le);
  re *= ie, pe *= ie, Le *= ie, he *= ie;
  let ze = T - v, we = O - M, fe = K - L, me = q - J;
  ie = 1 / Math.sqrt(ze * ze + we * we + fe * fe), ze *= ie, we *= ie, fe *= ie, me *= ie;
  let Fe = T + E, Ue = O + R, ge = K + j, de = q + B;
  ie = 1 / Math.sqrt(Fe * Fe + Ue * Ue + ge * ge), Fe *= ie, Ue *= ie, ge *= ie, de *= ie;
  let Ae = T - E, ae = O - R, H = K - j, ue = q - B;
  ie = 1 / Math.sqrt(Ae * Ae + ae * ae + H * H), Ae *= ie, ae *= ie, H *= ie, ue *= ie;
  let Ve = T + C, Me = O + D, Pe = K + F, Ge = q + ee;
  ie = 1 / Math.sqrt(Ve * Ve + Me * Me + Pe * Pe), Ve *= ie, Me *= ie, Pe *= ie, Ge *= ie;
  let He = T - C, Ie = O - D, Be = K - F, Xt = q - ee;
  ie = 1 / Math.sqrt(He * He + Ie * Ie + Be * Be), He *= ie, Ie *= ie, Be *= ie, Xt *= ie;
  const Tn = n.length;
  for (let Hn = 0; Hn < Tn; Hn++) {
    const an = n[Hn];
    if (an.meshRenderer && an.meshRenderer.enabled) {
      const _e = an.transform.worldMatrix, tn = an.meshRenderer.bounds, et = tn[28], Nt = tn[29], Ot = tn[30], Ht = _e[0] * et + _e[4] * Nt + _e[8] * Ot + _e[12], ln = _e[1] * et + _e[5] * Nt + _e[9] * Ot + _e[13], $t = _e[2] * et + _e[6] * Nt + _e[10] * Ot + _e[14], Sn = _e[0] * _e[0] + _e[1] * _e[1] + _e[2] * _e[2], $n = _e[4] * _e[4] + _e[5] * _e[5] + _e[6] * _e[6], Er = _e[8] * _e[8] + _e[9] * _e[9] + _e[10] * _e[10], $e = tn[31] * Math.sqrt(Math.max(Sn, $n, Er));
      if (re * Ht + pe * ln + Le * $t + he < -$e || ze * Ht + we * ln + fe * $t + me < -$e || Fe * Ht + Ue * ln + ge * $t + de < -$e || Ae * Ht + ae * ln + H * $t + ue < -$e || Ve * Ht + Me * ln + Pe * $t + Ge < -$e || He * Ht + Ie * ln + Be * $t + Xt < -$e) continue;
      s[++h] = Hn;
    }
    if (an.light)
      if (an.light.type === 1) {
        const _e = an.transform.worldMatrix, tn = _e[12], et = _e[13], Nt = _e[14], Ot = _e[0] * _e[0] + _e[1] * _e[1] + _e[2] * _e[2], Ht = _e[4] * _e[4] + _e[5] * _e[5] + _e[6] * _e[6], ln = _e[8] * _e[8] + _e[9] * _e[9] + _e[10] * _e[10], $t = an.light.range * Math.sqrt(Math.max(Ot, Ht, ln));
        if (re * tn + pe * et + Le * Nt + he < -$t || ze * tn + we * et + fe * Nt + me < -$t || Fe * tn + Ue * et + ge * Nt + de < -$t || Ae * tn + ae * et + H * Nt + ue < -$t || Ve * tn + Me * et + Pe * Nt + Ge < -$t || He * tn + Ie * et + Be * Nt + Xt < -$t) continue;
        p[++y] = Hn;
      } else
        p[++y] = Hn;
  }
  s[0] = h, p[0] = y;
}
function n4(n, l, s) {
  const p = s, h = p[0], y = p[1], v = p[2], E = p[3], C = p[4], T = p[5], M = p[6], R = p[7], D = p[8], O = p[9], L = p[10], j = p[11], F = p[12], K = p[13], J = p[14], B = p[15];
  let ee = 0;
  const q = n[0] + 1;
  for (let re = 1; re < q; re++) {
    const pe = n[re], Le = l[pe], he = Le.transform.worldMatrix, ie = Le.meshRenderer;
    if (ie && ie.enabled && ie.bounds) {
      const ze = ie.bounds;
      let we = 63;
      for (let fe = 0; fe < 24; fe += 3) {
        const me = ze[fe], Fe = ze[fe + 1], Ue = ze[fe + 2], ge = he[0] * me + he[4] * Fe + he[8] * Ue + he[12], de = he[1] * me + he[5] * Fe + he[9] * Ue + he[13], Ae = he[2] * me + he[6] * Fe + he[10] * Ue + he[14], ae = h * ge + C * de + D * Ae + F, H = y * ge + T * de + O * Ae + K, ue = v * ge + M * de + L * Ae + J, Ve = E * ge + R * de + j * Ae + B;
        let Me = 0;
        ae < -Ve && (Me |= 1), ae > Ve && (Me |= 2), H < -Ve && (Me |= 4), H > Ve && (Me |= 8), ue < -Ve && (Me |= 16), ue > Ve && (Me |= 32), we &= Me;
      }
      we === 0 && (n[++ee] = pe);
    } else {
      const ze = he[12], we = he[13], fe = he[14], me = h * ze + C * we + D * fe + F, Fe = y * ze + T * we + O * fe + K, Ue = v * ze + M * we + L * fe + J, ge = E * ze + R * we + j * fe + B;
      me >= -ge && me <= ge && Fe >= -ge && Fe <= ge && Ue >= -ge && Ue <= ge && (n[++ee] = pe);
    }
  }
  n[0] = ee;
}
let _c = 0;
function r4(n, l, s, p, h, y, v, E, C, T, M, R, D, O, L, j, F, K, J, B, ee, q, re, pe, Le) {
  let he = 0, ie = 0;
  for (let ze = 0; ze < p; ze++) {
    const we = n[l + ze], fe = s[we], me = fe.meshRenderer;
    if (me.constructor !== sa) continue;
    ++_c;
    const Fe = fe.transform.worldMatrix, Ue = me.depthBias || 0;
    rE(j, O, Fe), rE(L, D, Fe);
    const ge = j[0], de = j[1], Ae = j[2], ae = j[3], H = j[4], ue = j[5], Ve = j[6], Me = j[7], Pe = j[8], Ge = j[9], He = j[10], Ie = j[11], Be = j[12], Xt = j[13], Tn = j[14], Hn = j[15], an = me.faces, _e = me.vertices, tn = me.faceNormals, et = me.vertexNormals;
    Zz(F, Fe);
    const Nt = F, Ot = Nt[0], Ht = Nt[1], ln = Nt[2], $t = Nt[3], Sn = Nt[4], $n = Nt[5], Er = Nt[6], $e = Nt[7], on = Nt[8], Vn = an.length;
    for (let pr = 0; pr < Vn; pr += 3) {
      const mr = an[pr], ke = an[pr + 1], Ye = an[pr + 2], wt = mr << 2, Kt = ke << 2, qt = Ye << 2;
      if (Le[mr] !== _c) {
        const _t = mr * 3, it = _e[_t], kt = _e[_t + 1], Zt = _e[_t + 2];
        y[wt] = ge * it + H * kt + Pe * Zt + Be, y[wt + 1] = de * it + ue * kt + Ge * Zt + Xt, y[wt + 2] = Ae * it + Ve * kt + He * Zt + Tn, y[wt + 3] = ae * it + Me * kt + Ie * Zt + Hn, Le[mr] = _c, pe[mr] = -1;
      }
      if (Le[ke] !== _c) {
        const _t = ke * 3, it = _e[_t], kt = _e[_t + 1], Zt = _e[_t + 2];
        y[Kt] = ge * it + H * kt + Pe * Zt + Be, y[Kt + 1] = de * it + ue * kt + Ge * Zt + Xt, y[Kt + 2] = Ae * it + Ve * kt + He * Zt + Tn, y[Kt + 3] = ae * it + Me * kt + Ie * Zt + Hn, Le[ke] = _c, pe[ke] = -1;
      }
      if (Le[Ye] !== _c) {
        const _t = Ye * 3, it = _e[_t], kt = _e[_t + 1], Zt = _e[_t + 2];
        y[qt] = ge * it + H * kt + Pe * Zt + Be, y[qt + 1] = de * it + ue * kt + Ge * Zt + Xt, y[qt + 2] = Ae * it + Ve * kt + He * Zt + Tn, y[qt + 3] = ae * it + Me * kt + Ie * Zt + Hn, Le[Ye] = _c, pe[Ye] = -1;
      }
      const xn = y[wt], Yt = y[wt + 1], un = y[wt + 2], Rt = y[wt + 3], zt = y[Kt], Vt = y[Kt + 1], hn = y[Kt + 2], It = y[Kt + 3], fn = y[qt], sr = y[qt + 1], er = y[qt + 2], dn = y[qt + 3];
      if (xn < -Rt && zt < -It && fn < -dn || xn > Rt && zt > It && fn > dn || Yt < -Rt && Vt < -It && sr < -dn || Yt > Rt && Vt > It && sr > dn || un < -Rt && hn < -It && er < -dn || un > Rt && hn > It && er > dn) continue;
      const cr = 1 / Rt, nn = 1 / It, yr = 1 / dn, sn = xn * cr, Ft = Yt * cr, Wt = zt * nn, Dn = Vt * nn, On = fn * yr, mn = sr * yr;
      if ((Wt - sn) * (mn - Ft) - (Dn - Ft) * (On - sn) > 0) continue;
      const Ct = mr * 3, A = ke * 3, oe = Ye * 3;
      v[he] = he, q[he] = ze, re[he] = pr;
      const Se = tn[pr], be = tn[pr + 1], Ne = tn[pr + 2], qe = Se * Ot + be * $t + Ne * Er, Xe = Se * Ht + be * Sn + Ne * $e, at = Se * ln + be * $n + Ne * on, ft = Math.sqrt(qe * qe + Xe * Xe + at * at), Lt = ft > 0 ? 1 / ft : 0, pn = pr / 3 | 0, vn = me.faceColors[pn % me.faceColors.length];
      if (C[he] = me.colors[vn], T[he] = me.shaderType, M[he] = 0, pe[mr] === -1) {
        const _t = ie * 3;
        Zg(
          h,
          Ct,
          _e[Ct],
          _e[Ct + 1],
          _e[Ct + 2],
          L
        ), B[_t] = sn, B[_t + 1] = -Ft, pe[mr] = _t, ie++;
        const it = mr * 3, kt = et[it] * Ot + et[it + 1] * $t + et[it + 2] * Er, Zt = et[it] * Ht + et[it + 1] * Sn + et[it + 2] * $e, Yn = et[it] * ln + et[it + 1] * $n + et[it + 2] * on, zn = Math.sqrt(kt * kt + Zt * Zt + Yn * Yn), Cr = zn > 0 ? 1 / zn : 0;
        J[_t] = kt * Cr, J[_t + 1] = Zt * Cr, J[_t + 2] = Yn * Cr;
      }
      if (ee[he * 3] = pe[mr], pe[ke] === -1) {
        const _t = ie * 3;
        Zg(
          h,
          A,
          _e[A],
          _e[A + 1],
          _e[A + 2],
          L
        ), B[_t] = Wt, B[_t + 1] = -Dn, pe[ke] = _t, ie++;
        const it = ke * 3, kt = et[it] * Ot + et[it + 1] * $t + et[it + 2] * Er, Zt = et[it] * Ht + et[it + 1] * Sn + et[it + 2] * $e, Yn = et[it] * ln + et[it + 1] * $n + et[it + 2] * on, zn = Math.sqrt(kt * kt + Zt * Zt + Yn * Yn), Cr = zn > 0 ? 1 / zn : 0;
        J[_t] = kt * Cr, J[_t + 1] = Zt * Cr, J[_t + 2] = Yn * Cr;
      }
      if (ee[he * 3 + 1] = pe[ke], pe[Ye] === -1) {
        const _t = ie * 3;
        Zg(
          h,
          oe,
          _e[oe],
          _e[oe + 1],
          _e[oe + 2],
          L
        ), B[_t] = On, B[_t + 1] = -mn, pe[Ye] = _t, ie++;
        const it = Ye * 3, kt = et[it] * Ot + et[it + 1] * $t + et[it + 2] * Er, Zt = et[it] * Ht + et[it + 1] * Sn + et[it + 2] * $e, Yn = et[it] * ln + et[it + 1] * $n + et[it + 2] * on, zn = Math.sqrt(kt * kt + Zt * Zt + Yn * Yn), Cr = zn > 0 ? 1 / zn : 0;
        J[_t] = kt * Cr, J[_t + 1] = Zt * Cr, J[_t + 2] = Yn * Cr;
      }
      ee[he * 3 + 2] = pe[Ye];
      const En = he * 9;
      R[En] = h[Ct], R[En + 1] = h[Ct + 1];
      const ir = R[En + 2] = h[Ct + 2];
      R[En + 3] = h[A], R[En + 4] = h[A + 1];
      const dt = R[En + 5] = h[A + 2];
      R[En + 6] = h[oe], R[En + 7] = h[oe + 1];
      const gt = R[En + 8] = h[oe + 2];
      E[he] = (ir + dt + gt) * 0.33333 + Ue;
      const lr = he * 3;
      K[lr] = qe * Lt, K[lr + 1] = Xe * Lt, K[lr + 2] = at * Lt, he++;
    }
  }
  return he;
}
function a4(n, l, s, p, h, y, v, E, C, T, M, R, D, O, L, j, F, K, J, B, ee, q, re, pe, Le, he, ie, ze, we) {
  const fe = T * 0.5, me = M * 0.5, Fe = E + v;
  C && n.clearRect(0, 0, n.canvas.width, n.canvas.height);
  let Ue = -1, ge = -1, de = -1;
  for (let Ae = E; Ae < Fe; Ae++) {
    const ae = p[Ae], H = s[ae * 3], ue = s[ae * 3 + 1], Ve = s[ae * 3 + 2], Me = l[H] * fe + fe, Pe = l[H + 1] * me + me, Ge = l[ue] * fe + fe, He = l[ue + 1] * me + me, Ie = l[Ve] * fe + fe, Be = l[Ve + 1] * me + me, Xt = (Me + Ge + Ie) * 0.33333, Tn = (Pe + He + Be) * 0.33333, Hn = Me - Xt, an = Pe - Tn, _e = Math.abs(Hn), tn = Math.abs(an), et = _e > tn ? _e + 0.4 * tn : tn + 0.4 * _e, Nt = et > 0 ? Jg / et : 0, Ot = Me + Hn * Nt, Ht = Pe + an * Nt, ln = Ge - Xt, $t = He - Tn, Sn = Math.abs(ln), $n = Math.abs($t), Er = Sn > $n ? Sn + 0.4 * $n : $n + 0.4 * Sn, $e = Er > 0 ? Jg / Er : 0, on = Ge + ln * $e, Vn = He + $t * $e, pr = Ie - Xt, mr = Be - Tn, ke = Math.abs(pr), Ye = Math.abs(mr), wt = ke > Ye ? ke + 0.4 * Ye : Ye + 0.4 * ke, Kt = wt > 0 ? Jg / wt : 0, qt = Ie + pr * Kt, xn = Be + mr * Kt;
    switch (ie ? 3 : y[ae]) {
      case 0: {
        const Yt = h[ae];
        let un = Yt >>> 16, Rt = Yt >>> 8 & 255, zt = Yt & 255, Vt = B >>> 16 & 255, hn = B >>> 8 & 255, It = B & 255;
        const fn = ee[ae * 3], sr = ee[ae * 3 + 1], er = ee[ae * 3 + 2], dn = ze[0] + 1;
        for (let Ct = 1; Ct < dn; Ct++) {
          const A = we[ze[Ct]];
          if (A.light.type === 0) {
            const oe = -A.transform.worldMatrix[8], Se = -A.transform.worldMatrix[9], be = -A.transform.worldMatrix[10], Ne = fn * oe + sr * Se + er * be;
            Ne > 0 && (Vt += (A.light.color >>> 16 & 255) * Ne, hn += (A.light.color >>> 8 & 255) * Ne, It += (A.light.color & 255) * Ne);
          }
        }
        Vt *= 39215e-7, hn *= 39215e-7, It *= 39215e-7, un = un * Vt | 0, Rt = Rt * hn | 0, zt = zt * It | 0, un = un > 255 ? 255 : un, Rt = Rt > 255 ? 255 : Rt, zt = zt > 255 ? 255 : zt;
        const cr = D[ae];
        let nn = 0;
        if (O === Pn.FogType.RADIAL_FAST || O === Pn.FogType.RADIAL) {
          const Ct = R[ae * 9], A = R[ae * 9 + 1], oe = R[ae * 9 + 2], Se = R[ae * 9 + 3], be = R[ae * 9 + 4], Ne = R[ae * 9 + 5], qe = R[ae * 9 + 6], Xe = R[ae * 9 + 7], at = R[ae * 9 + 8], ft = (Ct + Se + qe) * 0.33333, Lt = (A + be + Xe) * 0.33333, pn = (oe + Ne + at) * 0.33333;
          if (O === Pn.FogType.RADIAL_FAST) {
            const vn = j * j, ir = 1 / (F * F - vn);
            nn = (ft * ft + Lt * Lt + pn * pn - vn) * ir;
          } else
            nn = (Math.sqrt(ft * ft + Lt * Lt + pn * pn) - j) / (F - j);
        } else O === Pn.FogType.LINEAR && (nn = (cr - j) / (F - j));
        if (nn > 1 && (nn = 1), nn > 0) {
          const Ct = L >>> 16, A = L >>> 8 & 255, oe = L & 255;
          un = un * (1 - nn) + Ct * nn | 0, Rt = Rt * (1 - nn) + A * nn | 0, zt = zt * (1 - nn) + oe * nn | 0;
        }
        const yr = re[ae], sn = we[Le[he + yr]].meshRenderer, Ft = sn.textureImage;
        if (Ft && Ft.complete && Ft.naturalWidth > 0 && sn.uvs) {
          const Ct = pe[ae], A = sn.uvs, oe = sn.faces[Ct] * 2, Se = sn.faces[Ct + 1] * 2, be = sn.faces[Ct + 2] * 2, Ne = A[oe] * Ft.width, qe = A[oe + 1] * Ft.height, Xe = A[Se] * Ft.width, at = A[Se + 1] * Ft.height, ft = A[be] * Ft.width, Lt = A[be + 1] * Ft.height, pn = Ne * (at - Lt) - qe * (Xe - ft) + (Xe * Lt - ft * at);
          if (Math.abs(pn) > 1e-5) {
            const vn = 1 / pn, En = (Me * (at - Lt) + Ge * (Lt - qe) + Ie * (qe - at)) * vn, ir = (Me * (ft - Xe) + Ge * (Ne - ft) + Ie * (Xe - Ne)) * vn, dt = (Me * (Xe * Lt - ft * at) + Ge * (ft * qe - Ne * Lt) + Ie * (Ne * at - Xe * qe)) * vn, gt = (Pe * (at - Lt) + He * (Lt - qe) + Be * (qe - at)) * vn, lr = (Pe * (ft - Xe) + He * (Ne - ft) + Be * (Xe - Ne)) * vn, _t = (Pe * (Xe * Lt - ft * at) + He * (ft * qe - Ne * Lt) + Be * (Ne * at - Xe * qe)) * vn;
            n.save(), n.beginPath(), n.moveTo(Ot, Ht), n.lineTo(on, Vn), n.lineTo(qt, xn), n.closePath(), n.clip(), n.setTransform(En, gt, ir, lr, dt, _t), n.drawImage(Ft, 0, 0), n.restore();
            const it = Vt >= 1 ? 255 : Vt * 255 | 0, kt = hn >= 1 ? 255 : hn * 255 | 0, Zt = It >= 1 ? 255 : It * 255 | 0, Yn = it & 248, zn = kt & 252, Cr = Zt & 248, Mr = Yn << 8 | zn << 3 | Cr >> 3;
            if (n.globalCompositeOperation = "multiply", Ue !== Mr && (n.fillStyle = Gr[Mr], Ue = Mr), n.fill(), n.globalCompositeOperation = "source-over", nn > 0) {
              const ba = L >>> 16, Ma = L >>> 8 & 255, _a = L & 255, na = ba & 248, Dr = Ma & 252, Xr = _a & 248, tr = na << 8 | Dr << 3 | Xr >> 3;
              n.globalAlpha = nn, ge !== tr && (n.strokeStyle = Gr[tr], ge = tr), de !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", de = 10), n.stroke(), Ue !== tr && (n.fillStyle = Gr[tr], Ue = tr), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(Me, Pe), n.lineTo(Ge, He), n.lineTo(Ie, Be), n.closePath();
        const Wt = un & 248, Dn = Rt & 252, On = zt & 248, mn = Wt << 8 | Dn << 3 | On >> 3;
        ge !== mn && (n.strokeStyle = Gr[mn], ge = mn), de !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", de = 10), n.stroke(), Ue !== mn && (n.fillStyle = Gr[mn], Ue = mn), n.fill();
        break;
      }
      case 1: {
        const Yt = h[ae];
        let un = Yt >>> 16, Rt = Yt >>> 8 & 255, zt = Yt & 255;
        const Vt = D[ae];
        let hn = 0;
        if (O === Pn.FogType.RADIAL_FAST || O === Pn.FogType.RADIAL) {
          const Ft = R[ae * 9], Wt = R[ae * 9 + 1], Dn = R[ae * 9 + 2], On = R[ae * 9 + 3], mn = R[ae * 9 + 4], Ct = R[ae * 9 + 5], A = R[ae * 9 + 6], oe = R[ae * 9 + 7], Se = R[ae * 9 + 8], be = (Ft + On + A) * 0.33333, Ne = (Wt + mn + oe) * 0.33333, qe = (Dn + Ct + Se) * 0.33333;
          if (O === Pn.FogType.RADIAL_FAST) {
            const Xe = j * j, ft = 1 / (F * F - Xe);
            hn = (be * be + Ne * Ne + qe * qe - Xe) * ft;
          } else
            hn = (Math.sqrt(be * be + Ne * Ne + qe * qe) - j) / (F - j);
        } else O === Pn.FogType.LINEAR && (hn = (Vt - j) / (F - j));
        let fn = Math.max(0, hn - 0);
        if (fn > 1 && (fn = 1), fn > 0) {
          const Ft = L >>> 16, Wt = L >>> 8 & 255, Dn = L & 255;
          un = un * (1 - fn) + Ft * fn | 0, Rt = Rt * (1 - fn) + Wt * fn | 0, zt = zt * (1 - fn) + Dn * fn | 0;
        }
        const sr = re[ae], er = we[Le[he + sr]].meshRenderer, dn = er.textureImage;
        if (dn && dn.complete && dn.naturalWidth > 0 && er.uvs) {
          const Ft = pe[ae], Wt = er.uvs, Dn = er.faces[Ft] * 2, On = er.faces[Ft + 1] * 2, mn = er.faces[Ft + 2] * 2, Ct = Wt[Dn] * dn.width, A = Wt[Dn + 1] * dn.height, oe = Wt[On] * dn.width, Se = Wt[On + 1] * dn.height, be = Wt[mn] * dn.width, Ne = Wt[mn + 1] * dn.height, qe = Ct * (Se - Ne) - A * (oe - be) + (oe * Ne - be * Se);
          if (Math.abs(qe) > 1e-5) {
            const Xe = 1 / qe, at = (Me * (Se - Ne) + Ge * (Ne - A) + Ie * (A - Se)) * Xe, ft = (Me * (be - oe) + Ge * (Ct - be) + Ie * (oe - Ct)) * Xe, Lt = (Me * (oe * Ne - be * Se) + Ge * (be * A - Ct * Ne) + Ie * (Ct * Se - oe * A)) * Xe, pn = (Pe * (Se - Ne) + He * (Ne - A) + Be * (A - Se)) * Xe, vn = (Pe * (be - oe) + He * (Ct - be) + Be * (oe - Ct)) * Xe, En = (Pe * (oe * Ne - be * Se) + He * (be * A - Ct * Ne) + Be * (Ct * Se - oe * A)) * Xe;
            if (n.save(), n.beginPath(), n.moveTo(Ot, Ht), n.lineTo(on, Vn), n.lineTo(qt, xn), n.closePath(), n.clip(), n.setTransform(at, pn, ft, vn, Lt, En), n.drawImage(dn, 0, 0), n.restore(), fn > 0) {
              const ir = L >>> 16, dt = L >>> 8 & 255, gt = L & 255, lr = ir & 248, _t = dt & 252, it = gt & 248, kt = lr << 8 | _t << 3 | it >> 3;
              n.globalAlpha = fn, ge !== kt && (n.strokeStyle = Gr[kt], ge = kt), de !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", de = 10), n.stroke(), Ue !== kt && (n.fillStyle = Gr[kt], Ue = kt), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(Ot, Ht), n.lineTo(on, Vn), n.lineTo(qt, xn), n.closePath();
        const cr = un & 248, nn = Rt & 252, yr = zt & 248, sn = cr << 8 | nn << 3 | yr >> 3;
        Ue !== sn && (n.fillStyle = Gr[sn], Ue = sn), n.fill();
        break;
      }
      case 2: {
        const Yt = h[ae];
        let un = Yt >>> 16, Rt = Yt >>> 8 & 255, zt = Yt & 255;
        const Vt = re[ae], hn = we[Le[he + Vt]].meshRenderer, It = hn.textureImage;
        if (It && It.complete && It.naturalWidth > 0 && hn.uvs) {
          const cr = pe[ae], nn = hn.uvs, yr = hn.faces[cr] * 2, sn = hn.faces[cr + 1] * 2, Ft = hn.faces[cr + 2] * 2, Wt = nn[yr] * It.width, Dn = nn[yr + 1] * It.height, On = nn[sn] * It.width, mn = nn[sn + 1] * It.height, Ct = nn[Ft] * It.width, A = nn[Ft + 1] * It.height, oe = Wt * (mn - A) - Dn * (On - Ct) + (On * A - Ct * mn);
          if (Math.abs(oe) > 1e-5) {
            const Se = 1 / oe, be = (Me * (mn - A) + Ge * (A - Dn) + Ie * (Dn - mn)) * Se, Ne = (Me * (Ct - On) + Ge * (Wt - Ct) + Ie * (On - Wt)) * Se, qe = (Me * (On * A - Ct * mn) + Ge * (Ct * Dn - Wt * A) + Ie * (Wt * mn - On * Dn)) * Se, Xe = (Pe * (mn - A) + He * (A - Dn) + Be * (Dn - mn)) * Se, at = (Pe * (Ct - On) + He * (Wt - Ct) + Be * (On - Wt)) * Se, ft = (Pe * (On * A - Ct * mn) + He * (Ct * Dn - Wt * A) + Be * (Wt * mn - On * Dn)) * Se;
            n.save(), n.beginPath(), n.moveTo(Ot, Ht), n.lineTo(on, Vn), n.lineTo(qt, xn), n.closePath(), n.clip(), n.setTransform(be, Xe, Ne, at, qe, ft), n.drawImage(It, 0, 0), n.restore();
            break;
          }
        }
        n.beginPath(), n.moveTo(Ot, Ht), n.lineTo(on, Vn), n.lineTo(qt, xn), n.closePath();
        const fn = un & 248, sr = Rt & 252, er = zt & 248, dn = fn << 8 | sr << 3 | er >> 3;
        Ue !== dn && (n.fillStyle = Gr[dn], Ue = dn), n.fill();
        break;
      }
      case 3: {
        n.beginPath(), n.moveTo(Me, Pe), n.lineTo(Ge, He), n.lineTo(Ie, Be), n.closePath(), ge !== 31 && (n.strokeStyle = Gr[31], ge = 31), de !== 5 && (n.lineWidth = 0.5, n.lineJoin = "miter", de = 5), n.stroke();
        break;
      }
      case 4: {
        const Yt = h[ae], un = Yt >>> 16, Rt = Yt >>> 8 & 255, zt = Yt & 255;
        let Vt = B >>> 16, hn = B >>> 8 & 255, It = B & 255, fn = Vt, sr = hn, er = It, dn = Vt, cr = hn, nn = It, yr = Vt, sn = hn, Ft = It, Wt = q[H], Dn = q[H + 1], On = q[H + 2], mn = q[ue], Ct = q[ue + 1], A = q[ue + 2], oe = q[Ve], Se = q[Ve + 1], be = q[Ve + 2];
        const Ne = ze[0] + 1;
        for (let pt = 1; pt < Ne; pt++) {
          const gr = we[ze[pt]];
          if (gr.light.type === 0) {
            const _r = gr.light.color >>> 16, Qt = gr.light.color >>> 8 & 255, Pr = gr.light.color & 255, vt = -gr.transform.worldMatrix[8], Wn = -gr.transform.worldMatrix[9], Qn = -gr.transform.worldMatrix[10];
            let tt = Wt * vt + Dn * Wn + On * Qn, In = mn * vt + Ct * Wn + A * Qn, rn = oe * vt + Se * Wn + be * Qn;
            tt > 0 && (fn += _r * tt, sr += Qt * tt, er += Pr * tt), In > 0 && (dn += _r * In, cr += Qt * In, nn += Pr * In), rn > 0 && (yr += _r * rn, sn += Qt * rn, Ft += Pr * rn);
          }
        }
        fn *= 39215e-7, sr *= 39215e-7, er *= 39215e-7, dn *= 39215e-7, cr *= 39215e-7, nn *= 39215e-7, yr *= 39215e-7, sn *= 39215e-7, Ft *= 39215e-7;
        let qe = Math.min(Math.max(fn, sr, er), 1), Xe = Math.min(Math.max(dn, cr, nn), 1), at = Math.min(Math.max(yr, sn, Ft), 1), ft = 0;
        const Lt = D[ae];
        if (O === Pn.FogType.RADIAL_FAST || O === Pn.FogType.RADIAL) {
          const pt = R[ae * 9], gr = R[ae * 9 + 1], _r = R[ae * 9 + 2], Qt = R[ae * 9 + 3], Pr = R[ae * 9 + 4], vt = R[ae * 9 + 5], Wn = R[ae * 9 + 6], Qn = R[ae * 9 + 7], tt = R[ae * 9 + 8], In = (pt + Qt + Wn) * 0.33333, rn = (gr + Pr + Qn) * 0.33333, Kr = (_r + vt + tt) * 0.33333;
          if (O === Pn.FogType.RADIAL_FAST) {
            const Kn = j * j, Zn = 1 / (F * F - Kn);
            ft = (In * In + rn * rn + Kr * Kr - Kn) * Zn;
          } else
            ft = (Math.sqrt(In * In + rn * rn + Kr * Kr) - j) / (F - j);
        } else O === Pn.FogType.LINEAR && (ft = (Lt - j) / (F - j));
        ft > 1 && (ft = 1);
        const pn = re[ae], vn = we[Le[he + pn]].meshRenderer, En = vn.textureImage;
        if (En && En.complete && En.naturalWidth > 0 && vn.uvs) {
          const pt = pe[ae], gr = vn.uvs, _r = vn.faces[pt] * 2, Qt = vn.faces[pt + 1] * 2, Pr = vn.faces[pt + 2] * 2, vt = gr[_r] * En.width, Wn = gr[_r + 1] * En.height, Qn = gr[Qt] * En.width, tt = gr[Qt + 1] * En.height, In = gr[Pr] * En.width, rn = gr[Pr + 1] * En.height, Kr = vt * (tt - rn) - Wn * (Qn - In) + (Qn * rn - In * tt);
          if (Math.abs(Kr) > 1e-5) {
            const Kn = 1 / Kr, mi = (Me * (tt - rn) + Ge * (rn - Wn) + Ie * (Wn - tt)) * Kn, Zn = (Me * (In - Qn) + Ge * (vt - In) + Ie * (Qn - vt)) * Kn, Bn = (Me * (Qn * rn - In * tt) + Ge * (In * Wn - vt * rn) + Ie * (vt * tt - Qn * Wn)) * Kn, ol = (Pe * (tt - rn) + He * (rn - Wn) + Be * (Wn - tt)) * Kn, Or = (Pe * (In - Qn) + He * (vt - In) + Be * (Qn - vt)) * Kn, da = (Pe * (Qn * rn - In * tt) + He * (In * Wn - vt * rn) + Be * (vt * tt - Qn * Wn)) * Kn;
            n.save(), n.beginPath(), n.moveTo(Ot, Ht), n.lineTo(on, Vn), n.lineTo(qt, xn), n.closePath(), n.clip(), n.setTransform(mi, ol, Zn, Or, Bn, da), n.drawImage(En, 0, 0), n.restore();
            const Qa = fn >= 1 ? 255 : fn * 255 | 0, Ll = sr >= 1 ? 255 : sr * 255 | 0, $o = er >= 1 ? 255 : er * 255 | 0, Vo = dn >= 1 ? 255 : dn * 255 | 0, ul = cr >= 1 ? 255 : cr * 255 | 0, Al = nn >= 1 ? 255 : nn * 255 | 0, gs = yr >= 1 ? 255 : yr * 255 | 0, Ga = sn >= 1 ? 255 : sn * 255 | 0, yi = Ft >= 1 ? 255 : Ft * 255 | 0, Di = (Qa & 248) << 8 | (Ll & 252) << 3 | ($o & 248) >> 3, Xa = (Vo & 248) << 8 | (ul & 252) << 3 | (Al & 248) >> 3, oo = (gs & 248) << 8 | (Ga & 252) << 3 | (yi & 248) >> 3;
            let ka = Me, ra = Pe, Aa = Ge, Ka = He, Oi = Ie, pa = Be, b = qe, U = Xe, X = at, le = Di, Re = Xa, ht = oo;
            if (b > U) {
              let ye;
              ye = ka, ka = Aa, Aa = ye, ye = ra, ra = Ka, Ka = ye, ye = b, b = U, U = ye, ye = le, le = Re, Re = ye;
            }
            if (U > X) {
              let ye;
              ye = Aa, Aa = Oi, Oi = ye, ye = Ka, Ka = pa, pa = ye, ye = U, U = X, X = ye, ye = Re, Re = ht, ht = ye;
            }
            if (b > U) {
              let ye;
              ye = ka, ka = Aa, Aa = ye, ye = ra, ra = Ka, Ka = ye, ye = b, b = U, U = ye, ye = le, le = Re, Re = ye;
            }
            if (n.globalCompositeOperation = "multiply", X - b < 0.01 || le === Re && Re === ht)
              Ue !== le && (n.fillStyle = Gr[le], Ue = le), n.beginPath(), n.moveTo(Ot, Ht), n.lineTo(on, Vn), n.lineTo(qt, xn), n.closePath(), n.fill();
            else {
              const ye = (U - b) / (X - b), St = ka + ye * (Oi - ka), Jt = ra + ye * (pa - ra), yn = Aa - St, Rn = -(Ka - Jt), bt = yn, qn = Rn * Rn + bt * bt;
              let or, zi;
              if (qn < 1e-6)
                or = Oi, zi = pa;
              else {
                const uo = ((Oi - ka) * Rn + (pa - ra) * bt) / qn;
                or = ka + uo * Rn, zi = ra + uo * bt;
              }
              const Nl = n.createLinearGradient(ka, ra, or, zi);
              Nl.addColorStop(0, Gr[le]), Nl.addColorStop(1, Gr[ht]), Ue = -1, n.fillStyle = Nl, n.beginPath(), n.moveTo(Ot, Ht), n.lineTo(on, Vn), n.lineTo(qt, xn), n.closePath(), n.fill();
            }
            if (n.globalCompositeOperation = "source-over", ft > 0) {
              const ye = L >>> 16, St = L >>> 8 & 255, Jt = L & 255, yn = ye & 248, Jn = St & 252, Rn = Jt & 248, bt = yn << 8 | Jn << 3 | Rn >> 3;
              n.globalAlpha = ft, ge !== bt && (n.strokeStyle = Gr[bt], ge = bt), de !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", de = 10), n.stroke(), Ue !== bt && (n.fillStyle = Gr[bt], Ue = bt), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        let ir = un * fn, dt = Rt * sr, gt = zt * er, lr = un * dn, _t = Rt * cr, it = zt * nn, kt = un * yr, Zt = Rt * sn, Yn = zt * Ft;
        if (ir = ir > 255 ? 255 : ir, dt = dt > 255 ? 255 : dt, gt = gt > 255 ? 255 : gt, lr = lr > 255 ? 255 : lr, _t = _t > 255 ? 255 : _t, it = it > 255 ? 255 : it, kt = kt > 255 ? 255 : kt, Zt = Zt > 255 ? 255 : Zt, Yn = Yn > 255 ? 255 : Yn, ft > 0) {
          const pt = 1 - ft, gr = L >>> 16, _r = L >>> 8 & 255, Qt = L & 255, Pr = gr * ft, vt = _r * ft, Wn = Qt * ft;
          ir = ir * pt + Pr | 0, dt = dt * pt + vt | 0, gt = gt * pt + Wn | 0, lr = lr * pt + Pr | 0, _t = _t * pt + vt | 0, it = it * pt + Wn | 0, kt = kt * pt + Pr | 0, Zt = Zt * pt + vt | 0, Yn = Yn * pt + Wn | 0;
        } else
          ir |= 0, dt |= 0, gt |= 0, lr |= 0, _t |= 0, it |= 0, kt |= 0, Zt |= 0, Yn |= 0;
        const zn = (ir & 248) << 8 | (dt & 252) << 3 | (gt & 248) >> 3, Cr = (lr & 248) << 8 | (_t & 252) << 3 | (it & 248) >> 3, Mr = (kt & 248) << 8 | (Zt & 252) << 3 | (Yn & 248) >> 3;
        if (zn === Cr && Cr === Mr) {
          n.beginPath(), n.moveTo(Me, Pe), n.lineTo(Ge, He), n.lineTo(Ie, Be), n.closePath(), Ue !== zn && (n.fillStyle = Gr[zn], Ue = zn), ge !== zn && (n.strokeStyle = Gr[zn], ge = zn), de !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", de = 10), n.stroke(), n.fill();
          break;
        }
        let ba = Me, Ma = Pe, _a = Ge, na = He, Dr = Ie, Xr = Be, tr = qe, fa = Xe, vi = at, Fr = zn, hi = Cr, ll = Mr;
        if (tr > fa) {
          let pt;
          pt = ba, ba = _a, _a = pt, pt = Ma, Ma = na, na = pt, pt = tr, tr = fa, fa = pt, pt = Fr, Fr = hi, hi = pt;
        }
        if (fa > vi) {
          let pt;
          pt = _a, _a = Dr, Dr = pt, pt = na, na = Xr, Xr = pt, pt = fa, fa = vi, vi = pt, pt = hi, hi = ll, ll = pt;
        }
        if (tr > fa) {
          let pt;
          pt = ba, ba = _a, _a = pt, pt = Ma, Ma = na, na = pt, pt = tr, tr = fa, fa = pt, pt = Fr, Fr = hi, hi = pt;
        }
        if (vi - tr < 0.01)
          n.beginPath(), n.moveTo(Me, Pe), n.lineTo(Ge, He), n.lineTo(Ie, Be), n.closePath(), Ue !== Fr && (n.fillStyle = Gr[Fr], Ue = Fr), ge !== Fr && (n.strokeStyle = Gr[Fr], ge = Fr), de !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", de = 10), n.stroke(), n.fill();
        else {
          const pt = (fa - tr) / (vi - tr), gr = ba + pt * (Dr - ba), _r = Ma + pt * (Xr - Ma), Qt = _a - gr, vt = -(na - _r), Wn = Qt, Qn = vt * vt + Wn * Wn;
          let tt, In;
          if (Qn < 1e-6)
            tt = Dr, In = Xr;
          else {
            const Kn = ((Dr - ba) * vt + (Xr - Ma) * Wn) / Qn;
            tt = ba + Kn * vt, In = Ma + Kn * Wn;
          }
          const rn = n.createLinearGradient(ba, Ma, tt, In);
          rn.addColorStop(0, Gr[Fr]), rn.addColorStop(1, Gr[ll]), Ue = -1, n.fillStyle = rn, n.beginPath(), n.moveTo(Ot, Ht), n.lineTo(on, Vn), n.lineTo(qt, xn), n.closePath(), n.fill();
        }
        break;
      }
    }
  }
}
const aE = Oy;
function $C(n, l) {
  this.canvas = l || document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new HC(), this.camera = n, this.scale = 1, this.layers = [];
  for (var s = 0; s < yd.layersCount; s++) {
    var p = document.createElement("canvas");
    this.layers[s] = p.getContext("2d"), this.layers[s].imageSmoothingEnabled = !1, this.layers[s].webkitImageSmoothingEnabled = !1;
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
  let y = performance.now(), v = 0, E = performance.now();
  const C = this;
  this.startRenderLoop = function T() {
    requestAnimationFrame(() => {
      const M = performance.now(), R = M - y;
      y = M, v++, M - E >= 500 && (C.lastRenderStats.fps = Math.round(v * 1e3 / (M - E)), v = 0, E = M), C.lastRenderStats.frameTime = R, C.render(), requestAnimationFrame(T);
    });
  };
}
var zl = $C.prototype;
zl.size = null;
zl.scale = 1;
zl.width = null;
zl.height = null;
zl.viewportMatrix = null;
zl.camera = null;
zl.canvas = null;
zl.context = null;
zl.start = function() {
  this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight), this.startRenderLoop();
};
zl.render = function() {
  this.camera !== null && this.renderer.render(this.camera.gameObject, this, this.lastRenderStats);
};
zl.setSize = function(n, l) {
  const s = n * this.scale, p = l * this.scale;
  this.width = s, this.height = p, this.canvas.width = s, this.canvas.height = p, this.viewportMatrix[0] = s / 2, this.viewportMatrix[5] = -p / 2, this.viewportMatrix[12] = s / 2, this.viewportMatrix[13] = p / 2;
  for (var h = 0; h < this.layers.length; h++) {
    var y = this.layers[h];
    y.canvas.width = s, y.canvas.height = p;
  }
  this.camera.setup(n, l);
};
zl.getWorldToScreen = function() {
  return aE(
    this.worldToScreenMatrix,
    this.viewportMatrix,
    this.camera.projectionMatrix
  ), aE(
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
function ys() {
  dr.call(this);
}
ys.prototype = Object.create(dr.prototype);
ys.prototype.constructor = ys;
ys.prototype.color = 16777215;
ys.prototype.range = 10;
ys.prototype.type = gd.Type.DIRECTIONAL;
ys.prototype.setGameObject = function(n) {
  dr.prototype.setGameObject.call(this, n), n.light = this;
};
function gd(n) {
  ki.call(this, n || "light"), this.addComponent(this.light = new ys());
}
gd.prototype = Object.create(ki.prototype);
gd.prototype.constructor = gd;
var Sy = { exports: {} }, Tv = {}, xy = { exports: {} }, wn = {};
var iE;
function i4() {
  if (iE) return wn;
  iE = 1;
  var n = /* @__PURE__ */ Symbol.for("react.element"), l = /* @__PURE__ */ Symbol.for("react.portal"), s = /* @__PURE__ */ Symbol.for("react.fragment"), p = /* @__PURE__ */ Symbol.for("react.strict_mode"), h = /* @__PURE__ */ Symbol.for("react.profiler"), y = /* @__PURE__ */ Symbol.for("react.provider"), v = /* @__PURE__ */ Symbol.for("react.context"), E = /* @__PURE__ */ Symbol.for("react.forward_ref"), C = /* @__PURE__ */ Symbol.for("react.suspense"), T = /* @__PURE__ */ Symbol.for("react.memo"), M = /* @__PURE__ */ Symbol.for("react.lazy"), R = Symbol.iterator;
  function D(H) {
    return H === null || typeof H != "object" ? null : (H = R && H[R] || H["@@iterator"], typeof H == "function" ? H : null);
  }
  var O = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, L = Object.assign, j = {};
  function F(H, ue, Ve) {
    this.props = H, this.context = ue, this.refs = j, this.updater = Ve || O;
  }
  F.prototype.isReactComponent = {}, F.prototype.setState = function(H, ue) {
    if (typeof H != "object" && typeof H != "function" && H != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, H, ue, "setState");
  }, F.prototype.forceUpdate = function(H) {
    this.updater.enqueueForceUpdate(this, H, "forceUpdate");
  };
  function K() {
  }
  K.prototype = F.prototype;
  function J(H, ue, Ve) {
    this.props = H, this.context = ue, this.refs = j, this.updater = Ve || O;
  }
  var B = J.prototype = new K();
  B.constructor = J, L(B, F.prototype), B.isPureReactComponent = !0;
  var ee = Array.isArray, q = Object.prototype.hasOwnProperty, re = { current: null }, pe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Le(H, ue, Ve) {
    var Me, Pe = {}, Ge = null, He = null;
    if (ue != null) for (Me in ue.ref !== void 0 && (He = ue.ref), ue.key !== void 0 && (Ge = "" + ue.key), ue) q.call(ue, Me) && !pe.hasOwnProperty(Me) && (Pe[Me] = ue[Me]);
    var Ie = arguments.length - 2;
    if (Ie === 1) Pe.children = Ve;
    else if (1 < Ie) {
      for (var Be = Array(Ie), Xt = 0; Xt < Ie; Xt++) Be[Xt] = arguments[Xt + 2];
      Pe.children = Be;
    }
    if (H && H.defaultProps) for (Me in Ie = H.defaultProps, Ie) Pe[Me] === void 0 && (Pe[Me] = Ie[Me]);
    return { $$typeof: n, type: H, key: Ge, ref: He, props: Pe, _owner: re.current };
  }
  function he(H, ue) {
    return { $$typeof: n, type: H.type, key: ue, ref: H.ref, props: H.props, _owner: H._owner };
  }
  function ie(H) {
    return typeof H == "object" && H !== null && H.$$typeof === n;
  }
  function ze(H) {
    var ue = { "=": "=0", ":": "=2" };
    return "$" + H.replace(/[=:]/g, function(Ve) {
      return ue[Ve];
    });
  }
  var we = /\/+/g;
  function fe(H, ue) {
    return typeof H == "object" && H !== null && H.key != null ? ze("" + H.key) : ue.toString(36);
  }
  function me(H, ue, Ve, Me, Pe) {
    var Ge = typeof H;
    (Ge === "undefined" || Ge === "boolean") && (H = null);
    var He = !1;
    if (H === null) He = !0;
    else switch (Ge) {
      case "string":
      case "number":
        He = !0;
        break;
      case "object":
        switch (H.$$typeof) {
          case n:
          case l:
            He = !0;
        }
    }
    if (He) return He = H, Pe = Pe(He), H = Me === "" ? "." + fe(He, 0) : Me, ee(Pe) ? (Ve = "", H != null && (Ve = H.replace(we, "$&/") + "/"), me(Pe, ue, Ve, "", function(Xt) {
      return Xt;
    })) : Pe != null && (ie(Pe) && (Pe = he(Pe, Ve + (!Pe.key || He && He.key === Pe.key ? "" : ("" + Pe.key).replace(we, "$&/") + "/") + H)), ue.push(Pe)), 1;
    if (He = 0, Me = Me === "" ? "." : Me + ":", ee(H)) for (var Ie = 0; Ie < H.length; Ie++) {
      Ge = H[Ie];
      var Be = Me + fe(Ge, Ie);
      He += me(Ge, ue, Ve, Be, Pe);
    }
    else if (Be = D(H), typeof Be == "function") for (H = Be.call(H), Ie = 0; !(Ge = H.next()).done; ) Ge = Ge.value, Be = Me + fe(Ge, Ie++), He += me(Ge, ue, Ve, Be, Pe);
    else if (Ge === "object") throw ue = String(H), Error("Objects are not valid as a React child (found: " + (ue === "[object Object]" ? "object with keys {" + Object.keys(H).join(", ") + "}" : ue) + "). If you meant to render a collection of children, use an array instead.");
    return He;
  }
  function Fe(H, ue, Ve) {
    if (H == null) return H;
    var Me = [], Pe = 0;
    return me(H, Me, "", "", function(Ge) {
      return ue.call(Ve, Ge, Pe++);
    }), Me;
  }
  function Ue(H) {
    if (H._status === -1) {
      var ue = H._result;
      ue = ue(), ue.then(function(Ve) {
        (H._status === 0 || H._status === -1) && (H._status = 1, H._result = Ve);
      }, function(Ve) {
        (H._status === 0 || H._status === -1) && (H._status = 2, H._result = Ve);
      }), H._status === -1 && (H._status = 0, H._result = ue);
    }
    if (H._status === 1) return H._result.default;
    throw H._result;
  }
  var ge = { current: null }, de = { transition: null }, Ae = { ReactCurrentDispatcher: ge, ReactCurrentBatchConfig: de, ReactCurrentOwner: re };
  function ae() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return wn.Children = { map: Fe, forEach: function(H, ue, Ve) {
    Fe(H, function() {
      ue.apply(this, arguments);
    }, Ve);
  }, count: function(H) {
    var ue = 0;
    return Fe(H, function() {
      ue++;
    }), ue;
  }, toArray: function(H) {
    return Fe(H, function(ue) {
      return ue;
    }) || [];
  }, only: function(H) {
    if (!ie(H)) throw Error("React.Children.only expected to receive a single React element child.");
    return H;
  } }, wn.Component = F, wn.Fragment = s, wn.Profiler = h, wn.PureComponent = J, wn.StrictMode = p, wn.Suspense = C, wn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ae, wn.act = ae, wn.cloneElement = function(H, ue, Ve) {
    if (H == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + H + ".");
    var Me = L({}, H.props), Pe = H.key, Ge = H.ref, He = H._owner;
    if (ue != null) {
      if (ue.ref !== void 0 && (Ge = ue.ref, He = re.current), ue.key !== void 0 && (Pe = "" + ue.key), H.type && H.type.defaultProps) var Ie = H.type.defaultProps;
      for (Be in ue) q.call(ue, Be) && !pe.hasOwnProperty(Be) && (Me[Be] = ue[Be] === void 0 && Ie !== void 0 ? Ie[Be] : ue[Be]);
    }
    var Be = arguments.length - 2;
    if (Be === 1) Me.children = Ve;
    else if (1 < Be) {
      Ie = Array(Be);
      for (var Xt = 0; Xt < Be; Xt++) Ie[Xt] = arguments[Xt + 2];
      Me.children = Ie;
    }
    return { $$typeof: n, type: H.type, key: Pe, ref: Ge, props: Me, _owner: He };
  }, wn.createContext = function(H) {
    return H = { $$typeof: v, _currentValue: H, _currentValue2: H, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, H.Provider = { $$typeof: y, _context: H }, H.Consumer = H;
  }, wn.createElement = Le, wn.createFactory = function(H) {
    var ue = Le.bind(null, H);
    return ue.type = H, ue;
  }, wn.createRef = function() {
    return { current: null };
  }, wn.forwardRef = function(H) {
    return { $$typeof: E, render: H };
  }, wn.isValidElement = ie, wn.lazy = function(H) {
    return { $$typeof: M, _payload: { _status: -1, _result: H }, _init: Ue };
  }, wn.memo = function(H, ue) {
    return { $$typeof: T, type: H, compare: ue === void 0 ? null : ue };
  }, wn.startTransition = function(H) {
    var ue = de.transition;
    de.transition = {};
    try {
      H();
    } finally {
      de.transition = ue;
    }
  }, wn.unstable_act = ae, wn.useCallback = function(H, ue) {
    return ge.current.useCallback(H, ue);
  }, wn.useContext = function(H) {
    return ge.current.useContext(H);
  }, wn.useDebugValue = function() {
  }, wn.useDeferredValue = function(H) {
    return ge.current.useDeferredValue(H);
  }, wn.useEffect = function(H, ue) {
    return ge.current.useEffect(H, ue);
  }, wn.useId = function() {
    return ge.current.useId();
  }, wn.useImperativeHandle = function(H, ue, Ve) {
    return ge.current.useImperativeHandle(H, ue, Ve);
  }, wn.useInsertionEffect = function(H, ue) {
    return ge.current.useInsertionEffect(H, ue);
  }, wn.useLayoutEffect = function(H, ue) {
    return ge.current.useLayoutEffect(H, ue);
  }, wn.useMemo = function(H, ue) {
    return ge.current.useMemo(H, ue);
  }, wn.useReducer = function(H, ue, Ve) {
    return ge.current.useReducer(H, ue, Ve);
  }, wn.useRef = function(H) {
    return ge.current.useRef(H);
  }, wn.useState = function(H) {
    return ge.current.useState(H);
  }, wn.useSyncExternalStore = function(H, ue, Ve) {
    return ge.current.useSyncExternalStore(H, ue, Ve);
  }, wn.useTransition = function() {
    return ge.current.useTransition();
  }, wn.version = "18.3.1", wn;
}
var Rv = { exports: {} };
Rv.exports;
var lE;
function l4() {
  return lE || (lE = 1, (function(n, l) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var s = "18.3.1", p = /* @__PURE__ */ Symbol.for("react.element"), h = /* @__PURE__ */ Symbol.for("react.portal"), y = /* @__PURE__ */ Symbol.for("react.fragment"), v = /* @__PURE__ */ Symbol.for("react.strict_mode"), E = /* @__PURE__ */ Symbol.for("react.profiler"), C = /* @__PURE__ */ Symbol.for("react.provider"), T = /* @__PURE__ */ Symbol.for("react.context"), M = /* @__PURE__ */ Symbol.for("react.forward_ref"), R = /* @__PURE__ */ Symbol.for("react.suspense"), D = /* @__PURE__ */ Symbol.for("react.suspense_list"), O = /* @__PURE__ */ Symbol.for("react.memo"), L = /* @__PURE__ */ Symbol.for("react.lazy"), j = /* @__PURE__ */ Symbol.for("react.offscreen"), F = Symbol.iterator, K = "@@iterator";
      function J(b) {
        if (b === null || typeof b != "object")
          return null;
        var U = F && b[F] || b[K];
        return typeof U == "function" ? U : null;
      }
      var B = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, ee = {
        transition: null
      }, q = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, re = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, pe = {}, Le = null;
      function he(b) {
        Le = b;
      }
      pe.setExtraStackFrame = function(b) {
        Le = b;
      }, pe.getCurrentStack = null, pe.getStackAddendum = function() {
        var b = "";
        Le && (b += Le);
        var U = pe.getCurrentStack;
        return U && (b += U() || ""), b;
      };
      var ie = !1, ze = !1, we = !1, fe = !1, me = !1, Fe = {
        ReactCurrentDispatcher: B,
        ReactCurrentBatchConfig: ee,
        ReactCurrentOwner: re
      };
      Fe.ReactDebugCurrentFrame = pe, Fe.ReactCurrentActQueue = q;
      function Ue(b) {
        {
          for (var U = arguments.length, X = new Array(U > 1 ? U - 1 : 0), le = 1; le < U; le++)
            X[le - 1] = arguments[le];
          de("warn", b, X);
        }
      }
      function ge(b) {
        {
          for (var U = arguments.length, X = new Array(U > 1 ? U - 1 : 0), le = 1; le < U; le++)
            X[le - 1] = arguments[le];
          de("error", b, X);
        }
      }
      function de(b, U, X) {
        {
          var le = Fe.ReactDebugCurrentFrame, Re = le.getStackAddendum();
          Re !== "" && (U += "%s", X = X.concat([Re]));
          var ht = X.map(function(ye) {
            return String(ye);
          });
          ht.unshift("Warning: " + U), Function.prototype.apply.call(console[b], console, ht);
        }
      }
      var Ae = {};
      function ae(b, U) {
        {
          var X = b.constructor, le = X && (X.displayName || X.name) || "ReactClass", Re = le + "." + U;
          if (Ae[Re])
            return;
          ge("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", U, le), Ae[Re] = !0;
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
        isMounted: function(b) {
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
        enqueueForceUpdate: function(b, U, X) {
          ae(b, "forceUpdate");
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
        enqueueReplaceState: function(b, U, X, le) {
          ae(b, "replaceState");
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
        enqueueSetState: function(b, U, X, le) {
          ae(b, "setState");
        }
      }, ue = Object.assign, Ve = {};
      Object.freeze(Ve);
      function Me(b, U, X) {
        this.props = b, this.context = U, this.refs = Ve, this.updater = X || H;
      }
      Me.prototype.isReactComponent = {}, Me.prototype.setState = function(b, U) {
        if (typeof b != "object" && typeof b != "function" && b != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, b, U, "setState");
      }, Me.prototype.forceUpdate = function(b) {
        this.updater.enqueueForceUpdate(this, b, "forceUpdate");
      };
      {
        var Pe = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, Ge = function(b, U) {
          Object.defineProperty(Me.prototype, b, {
            get: function() {
              Ue("%s(...) is deprecated in plain JavaScript React classes. %s", U[0], U[1]);
            }
          });
        };
        for (var He in Pe)
          Pe.hasOwnProperty(He) && Ge(He, Pe[He]);
      }
      function Ie() {
      }
      Ie.prototype = Me.prototype;
      function Be(b, U, X) {
        this.props = b, this.context = U, this.refs = Ve, this.updater = X || H;
      }
      var Xt = Be.prototype = new Ie();
      Xt.constructor = Be, ue(Xt, Me.prototype), Xt.isPureReactComponent = !0;
      function Tn() {
        var b = {
          current: null
        };
        return Object.seal(b), b;
      }
      var Hn = Array.isArray;
      function an(b) {
        return Hn(b);
      }
      function _e(b) {
        {
          var U = typeof Symbol == "function" && Symbol.toStringTag, X = U && b[Symbol.toStringTag] || b.constructor.name || "Object";
          return X;
        }
      }
      function tn(b) {
        try {
          return et(b), !1;
        } catch {
          return !0;
        }
      }
      function et(b) {
        return "" + b;
      }
      function Nt(b) {
        if (tn(b))
          return ge("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", _e(b)), et(b);
      }
      function Ot(b, U, X) {
        var le = b.displayName;
        if (le)
          return le;
        var Re = U.displayName || U.name || "";
        return Re !== "" ? X + "(" + Re + ")" : X;
      }
      function Ht(b) {
        return b.displayName || "Context";
      }
      function ln(b) {
        if (b == null)
          return null;
        if (typeof b.tag == "number" && ge("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof b == "function")
          return b.displayName || b.name || null;
        if (typeof b == "string")
          return b;
        switch (b) {
          case y:
            return "Fragment";
          case h:
            return "Portal";
          case E:
            return "Profiler";
          case v:
            return "StrictMode";
          case R:
            return "Suspense";
          case D:
            return "SuspenseList";
        }
        if (typeof b == "object")
          switch (b.$$typeof) {
            case T:
              var U = b;
              return Ht(U) + ".Consumer";
            case C:
              var X = b;
              return Ht(X._context) + ".Provider";
            case M:
              return Ot(b, b.render, "ForwardRef");
            case O:
              var le = b.displayName || null;
              return le !== null ? le : ln(b.type) || "Memo";
            case L: {
              var Re = b, ht = Re._payload, ye = Re._init;
              try {
                return ln(ye(ht));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var $t = Object.prototype.hasOwnProperty, Sn = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, $n, Er, $e;
      $e = {};
      function on(b) {
        if ($t.call(b, "ref")) {
          var U = Object.getOwnPropertyDescriptor(b, "ref").get;
          if (U && U.isReactWarning)
            return !1;
        }
        return b.ref !== void 0;
      }
      function Vn(b) {
        if ($t.call(b, "key")) {
          var U = Object.getOwnPropertyDescriptor(b, "key").get;
          if (U && U.isReactWarning)
            return !1;
        }
        return b.key !== void 0;
      }
      function pr(b, U) {
        var X = function() {
          $n || ($n = !0, ge("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", U));
        };
        X.isReactWarning = !0, Object.defineProperty(b, "key", {
          get: X,
          configurable: !0
        });
      }
      function mr(b, U) {
        var X = function() {
          Er || (Er = !0, ge("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", U));
        };
        X.isReactWarning = !0, Object.defineProperty(b, "ref", {
          get: X,
          configurable: !0
        });
      }
      function ke(b) {
        if (typeof b.ref == "string" && re.current && b.__self && re.current.stateNode !== b.__self) {
          var U = ln(re.current.type);
          $e[U] || (ge('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', U, b.ref), $e[U] = !0);
        }
      }
      var Ye = function(b, U, X, le, Re, ht, ye) {
        var St = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: p,
          // Built-in properties that belong on the element
          type: b,
          key: U,
          ref: X,
          props: ye,
          // Record the component responsible for creating this element.
          _owner: ht
        };
        return St._store = {}, Object.defineProperty(St._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(St, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: le
        }), Object.defineProperty(St, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Re
        }), Object.freeze && (Object.freeze(St.props), Object.freeze(St)), St;
      };
      function wt(b, U, X) {
        var le, Re = {}, ht = null, ye = null, St = null, Jt = null;
        if (U != null) {
          on(U) && (ye = U.ref, ke(U)), Vn(U) && (Nt(U.key), ht = "" + U.key), St = U.__self === void 0 ? null : U.__self, Jt = U.__source === void 0 ? null : U.__source;
          for (le in U)
            $t.call(U, le) && !Sn.hasOwnProperty(le) && (Re[le] = U[le]);
        }
        var yn = arguments.length - 2;
        if (yn === 1)
          Re.children = X;
        else if (yn > 1) {
          for (var Jn = Array(yn), Rn = 0; Rn < yn; Rn++)
            Jn[Rn] = arguments[Rn + 2];
          Object.freeze && Object.freeze(Jn), Re.children = Jn;
        }
        if (b && b.defaultProps) {
          var bt = b.defaultProps;
          for (le in bt)
            Re[le] === void 0 && (Re[le] = bt[le]);
        }
        if (ht || ye) {
          var qn = typeof b == "function" ? b.displayName || b.name || "Unknown" : b;
          ht && pr(Re, qn), ye && mr(Re, qn);
        }
        return Ye(b, ht, ye, St, Jt, re.current, Re);
      }
      function Kt(b, U) {
        var X = Ye(b.type, U, b.ref, b._self, b._source, b._owner, b.props);
        return X;
      }
      function qt(b, U, X) {
        if (b == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + b + ".");
        var le, Re = ue({}, b.props), ht = b.key, ye = b.ref, St = b._self, Jt = b._source, yn = b._owner;
        if (U != null) {
          on(U) && (ye = U.ref, yn = re.current), Vn(U) && (Nt(U.key), ht = "" + U.key);
          var Jn;
          b.type && b.type.defaultProps && (Jn = b.type.defaultProps);
          for (le in U)
            $t.call(U, le) && !Sn.hasOwnProperty(le) && (U[le] === void 0 && Jn !== void 0 ? Re[le] = Jn[le] : Re[le] = U[le]);
        }
        var Rn = arguments.length - 2;
        if (Rn === 1)
          Re.children = X;
        else if (Rn > 1) {
          for (var bt = Array(Rn), qn = 0; qn < Rn; qn++)
            bt[qn] = arguments[qn + 2];
          Re.children = bt;
        }
        return Ye(b.type, ht, ye, St, Jt, yn, Re);
      }
      function xn(b) {
        return typeof b == "object" && b !== null && b.$$typeof === p;
      }
      var Yt = ".", un = ":";
      function Rt(b) {
        var U = /[=:]/g, X = {
          "=": "=0",
          ":": "=2"
        }, le = b.replace(U, function(Re) {
          return X[Re];
        });
        return "$" + le;
      }
      var zt = !1, Vt = /\/+/g;
      function hn(b) {
        return b.replace(Vt, "$&/");
      }
      function It(b, U) {
        return typeof b == "object" && b !== null && b.key != null ? (Nt(b.key), Rt("" + b.key)) : U.toString(36);
      }
      function fn(b, U, X, le, Re) {
        var ht = typeof b;
        (ht === "undefined" || ht === "boolean") && (b = null);
        var ye = !1;
        if (b === null)
          ye = !0;
        else
          switch (ht) {
            case "string":
            case "number":
              ye = !0;
              break;
            case "object":
              switch (b.$$typeof) {
                case p:
                case h:
                  ye = !0;
              }
          }
        if (ye) {
          var St = b, Jt = Re(St), yn = le === "" ? Yt + It(St, 0) : le;
          if (an(Jt)) {
            var Jn = "";
            yn != null && (Jn = hn(yn) + "/"), fn(Jt, U, Jn, "", function(Ed) {
              return Ed;
            });
          } else Jt != null && (xn(Jt) && (Jt.key && (!St || St.key !== Jt.key) && Nt(Jt.key), Jt = Kt(
            Jt,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            X + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (Jt.key && (!St || St.key !== Jt.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              hn("" + Jt.key) + "/"
            ) : "") + yn
          )), U.push(Jt));
          return 1;
        }
        var Rn, bt, qn = 0, or = le === "" ? Yt : le + un;
        if (an(b))
          for (var zi = 0; zi < b.length; zi++)
            Rn = b[zi], bt = or + It(Rn, zi), qn += fn(Rn, U, X, bt, Re);
        else {
          var Nl = J(b);
          if (typeof Nl == "function") {
            var sl = b;
            Nl === sl.entries && (zt || Ue("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), zt = !0);
            for (var uo = Nl.call(sl), Io, xd = 0; !(Io = uo.next()).done; )
              Rn = Io.value, bt = or + It(Rn, xd++), qn += fn(Rn, U, X, bt, Re);
          } else if (ht === "object") {
            var Oc = String(b);
            throw new Error("Objects are not valid as a React child (found: " + (Oc === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : Oc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return qn;
      }
      function sr(b, U, X) {
        if (b == null)
          return b;
        var le = [], Re = 0;
        return fn(b, le, "", "", function(ht) {
          return U.call(X, ht, Re++);
        }), le;
      }
      function er(b) {
        var U = 0;
        return sr(b, function() {
          U++;
        }), U;
      }
      function dn(b, U, X) {
        sr(b, function() {
          U.apply(this, arguments);
        }, X);
      }
      function cr(b) {
        return sr(b, function(U) {
          return U;
        }) || [];
      }
      function nn(b) {
        if (!xn(b))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return b;
      }
      function yr(b) {
        var U = {
          $$typeof: T,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: b,
          _currentValue2: b,
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
        U.Provider = {
          $$typeof: C,
          _context: U
        };
        var X = !1, le = !1, Re = !1;
        {
          var ht = {
            $$typeof: T,
            _context: U
          };
          Object.defineProperties(ht, {
            Provider: {
              get: function() {
                return le || (le = !0, ge("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), U.Provider;
              },
              set: function(ye) {
                U.Provider = ye;
              }
            },
            _currentValue: {
              get: function() {
                return U._currentValue;
              },
              set: function(ye) {
                U._currentValue = ye;
              }
            },
            _currentValue2: {
              get: function() {
                return U._currentValue2;
              },
              set: function(ye) {
                U._currentValue2 = ye;
              }
            },
            _threadCount: {
              get: function() {
                return U._threadCount;
              },
              set: function(ye) {
                U._threadCount = ye;
              }
            },
            Consumer: {
              get: function() {
                return X || (X = !0, ge("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), U.Consumer;
              }
            },
            displayName: {
              get: function() {
                return U.displayName;
              },
              set: function(ye) {
                Re || (Ue("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ye), Re = !0);
              }
            }
          }), U.Consumer = ht;
        }
        return U._currentRenderer = null, U._currentRenderer2 = null, U;
      }
      var sn = -1, Ft = 0, Wt = 1, Dn = 2;
      function On(b) {
        if (b._status === sn) {
          var U = b._result, X = U();
          if (X.then(function(ht) {
            if (b._status === Ft || b._status === sn) {
              var ye = b;
              ye._status = Wt, ye._result = ht;
            }
          }, function(ht) {
            if (b._status === Ft || b._status === sn) {
              var ye = b;
              ye._status = Dn, ye._result = ht;
            }
          }), b._status === sn) {
            var le = b;
            le._status = Ft, le._result = X;
          }
        }
        if (b._status === Wt) {
          var Re = b._result;
          return Re === void 0 && ge(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, Re), "default" in Re || ge(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, Re), Re.default;
        } else
          throw b._result;
      }
      function mn(b) {
        var U = {
          // We use these fields to store the result.
          _status: sn,
          _result: b
        }, X = {
          $$typeof: L,
          _payload: U,
          _init: On
        };
        {
          var le, Re;
          Object.defineProperties(X, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return le;
              },
              set: function(ht) {
                ge("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), le = ht, Object.defineProperty(X, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return Re;
              },
              set: function(ht) {
                ge("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Re = ht, Object.defineProperty(X, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return X;
      }
      function Ct(b) {
        b != null && b.$$typeof === O ? ge("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof b != "function" ? ge("forwardRef requires a render function but was given %s.", b === null ? "null" : typeof b) : b.length !== 0 && b.length !== 2 && ge("forwardRef render functions accept exactly two parameters: props and ref. %s", b.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), b != null && (b.defaultProps != null || b.propTypes != null) && ge("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var U = {
          $$typeof: M,
          render: b
        };
        {
          var X;
          Object.defineProperty(U, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return X;
            },
            set: function(le) {
              X = le, !b.name && !b.displayName && (b.displayName = le);
            }
          });
        }
        return U;
      }
      var A;
      A = /* @__PURE__ */ Symbol.for("react.module.reference");
      function oe(b) {
        return !!(typeof b == "string" || typeof b == "function" || b === y || b === E || me || b === v || b === R || b === D || fe || b === j || ie || ze || we || typeof b == "object" && b !== null && (b.$$typeof === L || b.$$typeof === O || b.$$typeof === C || b.$$typeof === T || b.$$typeof === M || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        b.$$typeof === A || b.getModuleId !== void 0));
      }
      function Se(b, U) {
        oe(b) || ge("memo: The first argument must be a component. Instead received: %s", b === null ? "null" : typeof b);
        var X = {
          $$typeof: O,
          type: b,
          compare: U === void 0 ? null : U
        };
        {
          var le;
          Object.defineProperty(X, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return le;
            },
            set: function(Re) {
              le = Re, !b.name && !b.displayName && (b.displayName = Re);
            }
          });
        }
        return X;
      }
      function be() {
        var b = B.current;
        return b === null && ge(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), b;
      }
      function Ne(b) {
        var U = be();
        if (b._context !== void 0) {
          var X = b._context;
          X.Consumer === b ? ge("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : X.Provider === b && ge("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return U.useContext(b);
      }
      function qe(b) {
        var U = be();
        return U.useState(b);
      }
      function Xe(b, U, X) {
        var le = be();
        return le.useReducer(b, U, X);
      }
      function at(b) {
        var U = be();
        return U.useRef(b);
      }
      function ft(b, U) {
        var X = be();
        return X.useEffect(b, U);
      }
      function Lt(b, U) {
        var X = be();
        return X.useInsertionEffect(b, U);
      }
      function pn(b, U) {
        var X = be();
        return X.useLayoutEffect(b, U);
      }
      function vn(b, U) {
        var X = be();
        return X.useCallback(b, U);
      }
      function En(b, U) {
        var X = be();
        return X.useMemo(b, U);
      }
      function ir(b, U, X) {
        var le = be();
        return le.useImperativeHandle(b, U, X);
      }
      function dt(b, U) {
        {
          var X = be();
          return X.useDebugValue(b, U);
        }
      }
      function gt() {
        var b = be();
        return b.useTransition();
      }
      function lr(b) {
        var U = be();
        return U.useDeferredValue(b);
      }
      function _t() {
        var b = be();
        return b.useId();
      }
      function it(b, U, X) {
        var le = be();
        return le.useSyncExternalStore(b, U, X);
      }
      var kt = 0, Zt, Yn, zn, Cr, Mr, ba, Ma;
      function _a() {
      }
      _a.__reactDisabledLog = !0;
      function na() {
        {
          if (kt === 0) {
            Zt = console.log, Yn = console.info, zn = console.warn, Cr = console.error, Mr = console.group, ba = console.groupCollapsed, Ma = console.groupEnd;
            var b = {
              configurable: !0,
              enumerable: !0,
              value: _a,
              writable: !0
            };
            Object.defineProperties(console, {
              info: b,
              log: b,
              warn: b,
              error: b,
              group: b,
              groupCollapsed: b,
              groupEnd: b
            });
          }
          kt++;
        }
      }
      function Dr() {
        {
          if (kt--, kt === 0) {
            var b = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: ue({}, b, {
                value: Zt
              }),
              info: ue({}, b, {
                value: Yn
              }),
              warn: ue({}, b, {
                value: zn
              }),
              error: ue({}, b, {
                value: Cr
              }),
              group: ue({}, b, {
                value: Mr
              }),
              groupCollapsed: ue({}, b, {
                value: ba
              }),
              groupEnd: ue({}, b, {
                value: Ma
              })
            });
          }
          kt < 0 && ge("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Xr = Fe.ReactCurrentDispatcher, tr;
      function fa(b, U, X) {
        {
          if (tr === void 0)
            try {
              throw Error();
            } catch (Re) {
              var le = Re.stack.trim().match(/\n( *(at )?)/);
              tr = le && le[1] || "";
            }
          return `
` + tr + b;
        }
      }
      var vi = !1, Fr;
      {
        var hi = typeof WeakMap == "function" ? WeakMap : Map;
        Fr = new hi();
      }
      function ll(b, U) {
        if (!b || vi)
          return "";
        {
          var X = Fr.get(b);
          if (X !== void 0)
            return X;
        }
        var le;
        vi = !0;
        var Re = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var ht;
        ht = Xr.current, Xr.current = null, na();
        try {
          if (U) {
            var ye = function() {
              throw Error();
            };
            if (Object.defineProperty(ye.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(ye, []);
              } catch (or) {
                le = or;
              }
              Reflect.construct(b, [], ye);
            } else {
              try {
                ye.call();
              } catch (or) {
                le = or;
              }
              b.call(ye.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (or) {
              le = or;
            }
            b();
          }
        } catch (or) {
          if (or && le && typeof or.stack == "string") {
            for (var St = or.stack.split(`
`), Jt = le.stack.split(`
`), yn = St.length - 1, Jn = Jt.length - 1; yn >= 1 && Jn >= 0 && St[yn] !== Jt[Jn]; )
              Jn--;
            for (; yn >= 1 && Jn >= 0; yn--, Jn--)
              if (St[yn] !== Jt[Jn]) {
                if (yn !== 1 || Jn !== 1)
                  do
                    if (yn--, Jn--, Jn < 0 || St[yn] !== Jt[Jn]) {
                      var Rn = `
` + St[yn].replace(" at new ", " at ");
                      return b.displayName && Rn.includes("<anonymous>") && (Rn = Rn.replace("<anonymous>", b.displayName)), typeof b == "function" && Fr.set(b, Rn), Rn;
                    }
                  while (yn >= 1 && Jn >= 0);
                break;
              }
          }
        } finally {
          vi = !1, Xr.current = ht, Dr(), Error.prepareStackTrace = Re;
        }
        var bt = b ? b.displayName || b.name : "", qn = bt ? fa(bt) : "";
        return typeof b == "function" && Fr.set(b, qn), qn;
      }
      function pt(b, U, X) {
        return ll(b, !1);
      }
      function gr(b) {
        var U = b.prototype;
        return !!(U && U.isReactComponent);
      }
      function _r(b, U, X) {
        if (b == null)
          return "";
        if (typeof b == "function")
          return ll(b, gr(b));
        if (typeof b == "string")
          return fa(b);
        switch (b) {
          case R:
            return fa("Suspense");
          case D:
            return fa("SuspenseList");
        }
        if (typeof b == "object")
          switch (b.$$typeof) {
            case M:
              return pt(b.render);
            case O:
              return _r(b.type, U, X);
            case L: {
              var le = b, Re = le._payload, ht = le._init;
              try {
                return _r(ht(Re), U, X);
              } catch {
              }
            }
          }
        return "";
      }
      var Qt = {}, Pr = Fe.ReactDebugCurrentFrame;
      function vt(b) {
        if (b) {
          var U = b._owner, X = _r(b.type, b._source, U ? U.type : null);
          Pr.setExtraStackFrame(X);
        } else
          Pr.setExtraStackFrame(null);
      }
      function Wn(b, U, X, le, Re) {
        {
          var ht = Function.call.bind($t);
          for (var ye in b)
            if (ht(b, ye)) {
              var St = void 0;
              try {
                if (typeof b[ye] != "function") {
                  var Jt = Error((le || "React class") + ": " + X + " type `" + ye + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof b[ye] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw Jt.name = "Invariant Violation", Jt;
                }
                St = b[ye](U, ye, le, X, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (yn) {
                St = yn;
              }
              St && !(St instanceof Error) && (vt(Re), ge("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", le || "React class", X, ye, typeof St), vt(null)), St instanceof Error && !(St.message in Qt) && (Qt[St.message] = !0, vt(Re), ge("Failed %s type: %s", X, St.message), vt(null));
            }
        }
      }
      function Qn(b) {
        if (b) {
          var U = b._owner, X = _r(b.type, b._source, U ? U.type : null);
          he(X);
        } else
          he(null);
      }
      var tt;
      tt = !1;
      function In() {
        if (re.current) {
          var b = ln(re.current.type);
          if (b)
            return `

Check the render method of \`` + b + "`.";
        }
        return "";
      }
      function rn(b) {
        if (b !== void 0) {
          var U = b.fileName.replace(/^.*[\\\/]/, ""), X = b.lineNumber;
          return `

Check your code at ` + U + ":" + X + ".";
        }
        return "";
      }
      function Kr(b) {
        return b != null ? rn(b.__source) : "";
      }
      var Kn = {};
      function mi(b) {
        var U = In();
        if (!U) {
          var X = typeof b == "string" ? b : b.displayName || b.name;
          X && (U = `

Check the top-level render call using <` + X + ">.");
        }
        return U;
      }
      function Zn(b, U) {
        if (!(!b._store || b._store.validated || b.key != null)) {
          b._store.validated = !0;
          var X = mi(U);
          if (!Kn[X]) {
            Kn[X] = !0;
            var le = "";
            b && b._owner && b._owner !== re.current && (le = " It was passed a child from " + ln(b._owner.type) + "."), Qn(b), ge('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', X, le), Qn(null);
          }
        }
      }
      function Bn(b, U) {
        if (typeof b == "object") {
          if (an(b))
            for (var X = 0; X < b.length; X++) {
              var le = b[X];
              xn(le) && Zn(le, U);
            }
          else if (xn(b))
            b._store && (b._store.validated = !0);
          else if (b) {
            var Re = J(b);
            if (typeof Re == "function" && Re !== b.entries)
              for (var ht = Re.call(b), ye; !(ye = ht.next()).done; )
                xn(ye.value) && Zn(ye.value, U);
          }
        }
      }
      function ol(b) {
        {
          var U = b.type;
          if (U == null || typeof U == "string")
            return;
          var X;
          if (typeof U == "function")
            X = U.propTypes;
          else if (typeof U == "object" && (U.$$typeof === M || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          U.$$typeof === O))
            X = U.propTypes;
          else
            return;
          if (X) {
            var le = ln(U);
            Wn(X, b.props, "prop", le, b);
          } else if (U.PropTypes !== void 0 && !tt) {
            tt = !0;
            var Re = ln(U);
            ge("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Re || "Unknown");
          }
          typeof U.getDefaultProps == "function" && !U.getDefaultProps.isReactClassApproved && ge("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Or(b) {
        {
          for (var U = Object.keys(b.props), X = 0; X < U.length; X++) {
            var le = U[X];
            if (le !== "children" && le !== "key") {
              Qn(b), ge("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", le), Qn(null);
              break;
            }
          }
          b.ref !== null && (Qn(b), ge("Invalid attribute `ref` supplied to `React.Fragment`."), Qn(null));
        }
      }
      function da(b, U, X) {
        var le = oe(b);
        if (!le) {
          var Re = "";
          (b === void 0 || typeof b == "object" && b !== null && Object.keys(b).length === 0) && (Re += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ht = Kr(U);
          ht ? Re += ht : Re += In();
          var ye;
          b === null ? ye = "null" : an(b) ? ye = "array" : b !== void 0 && b.$$typeof === p ? (ye = "<" + (ln(b.type) || "Unknown") + " />", Re = " Did you accidentally export a JSX literal instead of a component?") : ye = typeof b, ge("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ye, Re);
        }
        var St = wt.apply(this, arguments);
        if (St == null)
          return St;
        if (le)
          for (var Jt = 2; Jt < arguments.length; Jt++)
            Bn(arguments[Jt], b);
        return b === y ? Or(St) : ol(St), St;
      }
      var Qa = !1;
      function Ll(b) {
        var U = da.bind(null, b);
        return U.type = b, Qa || (Qa = !0, Ue("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(U, "type", {
          enumerable: !1,
          get: function() {
            return Ue("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: b
            }), b;
          }
        }), U;
      }
      function $o(b, U, X) {
        for (var le = qt.apply(this, arguments), Re = 2; Re < arguments.length; Re++)
          Bn(arguments[Re], le.type);
        return ol(le), le;
      }
      function Vo(b, U) {
        var X = ee.transition;
        ee.transition = {};
        var le = ee.transition;
        ee.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          b();
        } finally {
          if (ee.transition = X, X === null && le._updatedFibers) {
            var Re = le._updatedFibers.size;
            Re > 10 && Ue("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), le._updatedFibers.clear();
          }
        }
      }
      var ul = !1, Al = null;
      function gs(b) {
        if (Al === null)
          try {
            var U = ("require" + Math.random()).slice(0, 7), X = n && n[U];
            Al = X.call(n, "timers").setImmediate;
          } catch {
            Al = function(Re) {
              ul === !1 && (ul = !0, typeof MessageChannel > "u" && ge("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var ht = new MessageChannel();
              ht.port1.onmessage = Re, ht.port2.postMessage(void 0);
            };
          }
        return Al(b);
      }
      var Ga = 0, yi = !1;
      function Di(b) {
        {
          var U = Ga;
          Ga++, q.current === null && (q.current = []);
          var X = q.isBatchingLegacy, le;
          try {
            if (q.isBatchingLegacy = !0, le = b(), !X && q.didScheduleLegacyUpdate) {
              var Re = q.current;
              Re !== null && (q.didScheduleLegacyUpdate = !1, ra(Re));
            }
          } catch (bt) {
            throw Xa(U), bt;
          } finally {
            q.isBatchingLegacy = X;
          }
          if (le !== null && typeof le == "object" && typeof le.then == "function") {
            var ht = le, ye = !1, St = {
              then: function(bt, qn) {
                ye = !0, ht.then(function(or) {
                  Xa(U), Ga === 0 ? oo(or, bt, qn) : bt(or);
                }, function(or) {
                  Xa(U), qn(or);
                });
              }
            };
            return !yi && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              ye || (yi = !0, ge("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), St;
          } else {
            var Jt = le;
            if (Xa(U), Ga === 0) {
              var yn = q.current;
              yn !== null && (ra(yn), q.current = null);
              var Jn = {
                then: function(bt, qn) {
                  q.current === null ? (q.current = [], oo(Jt, bt, qn)) : bt(Jt);
                }
              };
              return Jn;
            } else {
              var Rn = {
                then: function(bt, qn) {
                  bt(Jt);
                }
              };
              return Rn;
            }
          }
        }
      }
      function Xa(b) {
        b !== Ga - 1 && ge("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ga = b;
      }
      function oo(b, U, X) {
        {
          var le = q.current;
          if (le !== null)
            try {
              ra(le), gs(function() {
                le.length === 0 ? (q.current = null, U(b)) : oo(b, U, X);
              });
            } catch (Re) {
              X(Re);
            }
          else
            U(b);
        }
      }
      var ka = !1;
      function ra(b) {
        if (!ka) {
          ka = !0;
          var U = 0;
          try {
            for (; U < b.length; U++) {
              var X = b[U];
              do
                X = X(!0);
              while (X !== null);
            }
            b.length = 0;
          } catch (le) {
            throw b = b.slice(U + 1), le;
          } finally {
            ka = !1;
          }
        }
      }
      var Aa = da, Ka = $o, Oi = Ll, pa = {
        map: sr,
        forEach: dn,
        count: er,
        toArray: cr,
        only: nn
      };
      l.Children = pa, l.Component = Me, l.Fragment = y, l.Profiler = E, l.PureComponent = Be, l.StrictMode = v, l.Suspense = R, l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Fe, l.act = Di, l.cloneElement = Ka, l.createContext = yr, l.createElement = Aa, l.createFactory = Oi, l.createRef = Tn, l.forwardRef = Ct, l.isValidElement = xn, l.lazy = mn, l.memo = Se, l.startTransition = Vo, l.unstable_act = Di, l.useCallback = vn, l.useContext = Ne, l.useDebugValue = dt, l.useDeferredValue = lr, l.useEffect = ft, l.useId = _t, l.useImperativeHandle = ir, l.useInsertionEffect = Lt, l.useLayoutEffect = pn, l.useMemo = En, l.useReducer = Xe, l.useRef = at, l.useState = qe, l.useSyncExternalStore = it, l.useTransition = gt, l.version = s, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(Rv, Rv.exports)), Rv.exports;
}
var oE;
function Mv() {
  return oE || (oE = 1, process.env.NODE_ENV === "production" ? xy.exports = i4() : xy.exports = l4()), xy.exports;
}
var uE;
function o4() {
  if (uE) return Tv;
  uE = 1;
  var n = Mv(), l = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.fragment"), p = Object.prototype.hasOwnProperty, h = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function v(E, C, T) {
    var M, R = {}, D = null, O = null;
    T !== void 0 && (D = "" + T), C.key !== void 0 && (D = "" + C.key), C.ref !== void 0 && (O = C.ref);
    for (M in C) p.call(C, M) && !y.hasOwnProperty(M) && (R[M] = C[M]);
    if (E && E.defaultProps) for (M in C = E.defaultProps, C) R[M] === void 0 && (R[M] = C[M]);
    return { $$typeof: l, type: E, key: D, ref: O, props: R, _owner: h.current };
  }
  return Tv.Fragment = s, Tv.jsx = v, Tv.jsxs = v, Tv;
}
var wv = {};
var sE;
function u4() {
  return sE || (sE = 1, process.env.NODE_ENV !== "production" && (function() {
    var n = Mv(), l = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.portal"), p = /* @__PURE__ */ Symbol.for("react.fragment"), h = /* @__PURE__ */ Symbol.for("react.strict_mode"), y = /* @__PURE__ */ Symbol.for("react.profiler"), v = /* @__PURE__ */ Symbol.for("react.provider"), E = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), T = /* @__PURE__ */ Symbol.for("react.suspense"), M = /* @__PURE__ */ Symbol.for("react.suspense_list"), R = /* @__PURE__ */ Symbol.for("react.memo"), D = /* @__PURE__ */ Symbol.for("react.lazy"), O = /* @__PURE__ */ Symbol.for("react.offscreen"), L = Symbol.iterator, j = "@@iterator";
    function F(A) {
      if (A === null || typeof A != "object")
        return null;
      var oe = L && A[L] || A[j];
      return typeof oe == "function" ? oe : null;
    }
    var K = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function J(A) {
      {
        for (var oe = arguments.length, Se = new Array(oe > 1 ? oe - 1 : 0), be = 1; be < oe; be++)
          Se[be - 1] = arguments[be];
        B("error", A, Se);
      }
    }
    function B(A, oe, Se) {
      {
        var be = K.ReactDebugCurrentFrame, Ne = be.getStackAddendum();
        Ne !== "" && (oe += "%s", Se = Se.concat([Ne]));
        var qe = Se.map(function(Xe) {
          return String(Xe);
        });
        qe.unshift("Warning: " + oe), Function.prototype.apply.call(console[A], console, qe);
      }
    }
    var ee = !1, q = !1, re = !1, pe = !1, Le = !1, he;
    he = /* @__PURE__ */ Symbol.for("react.module.reference");
    function ie(A) {
      return !!(typeof A == "string" || typeof A == "function" || A === p || A === y || Le || A === h || A === T || A === M || pe || A === O || ee || q || re || typeof A == "object" && A !== null && (A.$$typeof === D || A.$$typeof === R || A.$$typeof === v || A.$$typeof === E || A.$$typeof === C || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      A.$$typeof === he || A.getModuleId !== void 0));
    }
    function ze(A, oe, Se) {
      var be = A.displayName;
      if (be)
        return be;
      var Ne = oe.displayName || oe.name || "";
      return Ne !== "" ? Se + "(" + Ne + ")" : Se;
    }
    function we(A) {
      return A.displayName || "Context";
    }
    function fe(A) {
      if (A == null)
        return null;
      if (typeof A.tag == "number" && J("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof A == "function")
        return A.displayName || A.name || null;
      if (typeof A == "string")
        return A;
      switch (A) {
        case p:
          return "Fragment";
        case s:
          return "Portal";
        case y:
          return "Profiler";
        case h:
          return "StrictMode";
        case T:
          return "Suspense";
        case M:
          return "SuspenseList";
      }
      if (typeof A == "object")
        switch (A.$$typeof) {
          case E:
            var oe = A;
            return we(oe) + ".Consumer";
          case v:
            var Se = A;
            return we(Se._context) + ".Provider";
          case C:
            return ze(A, A.render, "ForwardRef");
          case R:
            var be = A.displayName || null;
            return be !== null ? be : fe(A.type) || "Memo";
          case D: {
            var Ne = A, qe = Ne._payload, Xe = Ne._init;
            try {
              return fe(Xe(qe));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var me = Object.assign, Fe = 0, Ue, ge, de, Ae, ae, H, ue;
    function Ve() {
    }
    Ve.__reactDisabledLog = !0;
    function Me() {
      {
        if (Fe === 0) {
          Ue = console.log, ge = console.info, de = console.warn, Ae = console.error, ae = console.group, H = console.groupCollapsed, ue = console.groupEnd;
          var A = {
            configurable: !0,
            enumerable: !0,
            value: Ve,
            writable: !0
          };
          Object.defineProperties(console, {
            info: A,
            log: A,
            warn: A,
            error: A,
            group: A,
            groupCollapsed: A,
            groupEnd: A
          });
        }
        Fe++;
      }
    }
    function Pe() {
      {
        if (Fe--, Fe === 0) {
          var A = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: me({}, A, {
              value: Ue
            }),
            info: me({}, A, {
              value: ge
            }),
            warn: me({}, A, {
              value: de
            }),
            error: me({}, A, {
              value: Ae
            }),
            group: me({}, A, {
              value: ae
            }),
            groupCollapsed: me({}, A, {
              value: H
            }),
            groupEnd: me({}, A, {
              value: ue
            })
          });
        }
        Fe < 0 && J("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ge = K.ReactCurrentDispatcher, He;
    function Ie(A, oe, Se) {
      {
        if (He === void 0)
          try {
            throw Error();
          } catch (Ne) {
            var be = Ne.stack.trim().match(/\n( *(at )?)/);
            He = be && be[1] || "";
          }
        return `
` + He + A;
      }
    }
    var Be = !1, Xt;
    {
      var Tn = typeof WeakMap == "function" ? WeakMap : Map;
      Xt = new Tn();
    }
    function Hn(A, oe) {
      if (!A || Be)
        return "";
      {
        var Se = Xt.get(A);
        if (Se !== void 0)
          return Se;
      }
      var be;
      Be = !0;
      var Ne = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var qe;
      qe = Ge.current, Ge.current = null, Me();
      try {
        if (oe) {
          var Xe = function() {
            throw Error();
          };
          if (Object.defineProperty(Xe.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Xe, []);
            } catch (dt) {
              be = dt;
            }
            Reflect.construct(A, [], Xe);
          } else {
            try {
              Xe.call();
            } catch (dt) {
              be = dt;
            }
            A.call(Xe.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (dt) {
            be = dt;
          }
          A();
        }
      } catch (dt) {
        if (dt && be && typeof dt.stack == "string") {
          for (var at = dt.stack.split(`
`), ft = be.stack.split(`
`), Lt = at.length - 1, pn = ft.length - 1; Lt >= 1 && pn >= 0 && at[Lt] !== ft[pn]; )
            pn--;
          for (; Lt >= 1 && pn >= 0; Lt--, pn--)
            if (at[Lt] !== ft[pn]) {
              if (Lt !== 1 || pn !== 1)
                do
                  if (Lt--, pn--, pn < 0 || at[Lt] !== ft[pn]) {
                    var vn = `
` + at[Lt].replace(" at new ", " at ");
                    return A.displayName && vn.includes("<anonymous>") && (vn = vn.replace("<anonymous>", A.displayName)), typeof A == "function" && Xt.set(A, vn), vn;
                  }
                while (Lt >= 1 && pn >= 0);
              break;
            }
        }
      } finally {
        Be = !1, Ge.current = qe, Pe(), Error.prepareStackTrace = Ne;
      }
      var En = A ? A.displayName || A.name : "", ir = En ? Ie(En) : "";
      return typeof A == "function" && Xt.set(A, ir), ir;
    }
    function an(A, oe, Se) {
      return Hn(A, !1);
    }
    function _e(A) {
      var oe = A.prototype;
      return !!(oe && oe.isReactComponent);
    }
    function tn(A, oe, Se) {
      if (A == null)
        return "";
      if (typeof A == "function")
        return Hn(A, _e(A));
      if (typeof A == "string")
        return Ie(A);
      switch (A) {
        case T:
          return Ie("Suspense");
        case M:
          return Ie("SuspenseList");
      }
      if (typeof A == "object")
        switch (A.$$typeof) {
          case C:
            return an(A.render);
          case R:
            return tn(A.type, oe, Se);
          case D: {
            var be = A, Ne = be._payload, qe = be._init;
            try {
              return tn(qe(Ne), oe, Se);
            } catch {
            }
          }
        }
      return "";
    }
    var et = Object.prototype.hasOwnProperty, Nt = {}, Ot = K.ReactDebugCurrentFrame;
    function Ht(A) {
      if (A) {
        var oe = A._owner, Se = tn(A.type, A._source, oe ? oe.type : null);
        Ot.setExtraStackFrame(Se);
      } else
        Ot.setExtraStackFrame(null);
    }
    function ln(A, oe, Se, be, Ne) {
      {
        var qe = Function.call.bind(et);
        for (var Xe in A)
          if (qe(A, Xe)) {
            var at = void 0;
            try {
              if (typeof A[Xe] != "function") {
                var ft = Error((be || "React class") + ": " + Se + " type `" + Xe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof A[Xe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ft.name = "Invariant Violation", ft;
              }
              at = A[Xe](oe, Xe, be, Se, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Lt) {
              at = Lt;
            }
            at && !(at instanceof Error) && (Ht(Ne), J("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", be || "React class", Se, Xe, typeof at), Ht(null)), at instanceof Error && !(at.message in Nt) && (Nt[at.message] = !0, Ht(Ne), J("Failed %s type: %s", Se, at.message), Ht(null));
          }
      }
    }
    var $t = Array.isArray;
    function Sn(A) {
      return $t(A);
    }
    function $n(A) {
      {
        var oe = typeof Symbol == "function" && Symbol.toStringTag, Se = oe && A[Symbol.toStringTag] || A.constructor.name || "Object";
        return Se;
      }
    }
    function Er(A) {
      try {
        return $e(A), !1;
      } catch {
        return !0;
      }
    }
    function $e(A) {
      return "" + A;
    }
    function on(A) {
      if (Er(A))
        return J("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", $n(A)), $e(A);
    }
    var Vn = K.ReactCurrentOwner, pr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, mr, ke;
    function Ye(A) {
      if (et.call(A, "ref")) {
        var oe = Object.getOwnPropertyDescriptor(A, "ref").get;
        if (oe && oe.isReactWarning)
          return !1;
      }
      return A.ref !== void 0;
    }
    function wt(A) {
      if (et.call(A, "key")) {
        var oe = Object.getOwnPropertyDescriptor(A, "key").get;
        if (oe && oe.isReactWarning)
          return !1;
      }
      return A.key !== void 0;
    }
    function Kt(A, oe) {
      typeof A.ref == "string" && Vn.current;
    }
    function qt(A, oe) {
      {
        var Se = function() {
          mr || (mr = !0, J("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", oe));
        };
        Se.isReactWarning = !0, Object.defineProperty(A, "key", {
          get: Se,
          configurable: !0
        });
      }
    }
    function xn(A, oe) {
      {
        var Se = function() {
          ke || (ke = !0, J("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", oe));
        };
        Se.isReactWarning = !0, Object.defineProperty(A, "ref", {
          get: Se,
          configurable: !0
        });
      }
    }
    var Yt = function(A, oe, Se, be, Ne, qe, Xe) {
      var at = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: l,
        // Built-in properties that belong on the element
        type: A,
        key: oe,
        ref: Se,
        props: Xe,
        // Record the component responsible for creating this element.
        _owner: qe
      };
      return at._store = {}, Object.defineProperty(at._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(at, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: be
      }), Object.defineProperty(at, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Ne
      }), Object.freeze && (Object.freeze(at.props), Object.freeze(at)), at;
    };
    function un(A, oe, Se, be, Ne) {
      {
        var qe, Xe = {}, at = null, ft = null;
        Se !== void 0 && (on(Se), at = "" + Se), wt(oe) && (on(oe.key), at = "" + oe.key), Ye(oe) && (ft = oe.ref, Kt(oe, Ne));
        for (qe in oe)
          et.call(oe, qe) && !pr.hasOwnProperty(qe) && (Xe[qe] = oe[qe]);
        if (A && A.defaultProps) {
          var Lt = A.defaultProps;
          for (qe in Lt)
            Xe[qe] === void 0 && (Xe[qe] = Lt[qe]);
        }
        if (at || ft) {
          var pn = typeof A == "function" ? A.displayName || A.name || "Unknown" : A;
          at && qt(Xe, pn), ft && xn(Xe, pn);
        }
        return Yt(A, at, ft, Ne, be, Vn.current, Xe);
      }
    }
    var Rt = K.ReactCurrentOwner, zt = K.ReactDebugCurrentFrame;
    function Vt(A) {
      if (A) {
        var oe = A._owner, Se = tn(A.type, A._source, oe ? oe.type : null);
        zt.setExtraStackFrame(Se);
      } else
        zt.setExtraStackFrame(null);
    }
    var hn;
    hn = !1;
    function It(A) {
      return typeof A == "object" && A !== null && A.$$typeof === l;
    }
    function fn() {
      {
        if (Rt.current) {
          var A = fe(Rt.current.type);
          if (A)
            return `

Check the render method of \`` + A + "`.";
        }
        return "";
      }
    }
    function sr(A) {
      return "";
    }
    var er = {};
    function dn(A) {
      {
        var oe = fn();
        if (!oe) {
          var Se = typeof A == "string" ? A : A.displayName || A.name;
          Se && (oe = `

Check the top-level render call using <` + Se + ">.");
        }
        return oe;
      }
    }
    function cr(A, oe) {
      {
        if (!A._store || A._store.validated || A.key != null)
          return;
        A._store.validated = !0;
        var Se = dn(oe);
        if (er[Se])
          return;
        er[Se] = !0;
        var be = "";
        A && A._owner && A._owner !== Rt.current && (be = " It was passed a child from " + fe(A._owner.type) + "."), Vt(A), J('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Se, be), Vt(null);
      }
    }
    function nn(A, oe) {
      {
        if (typeof A != "object")
          return;
        if (Sn(A))
          for (var Se = 0; Se < A.length; Se++) {
            var be = A[Se];
            It(be) && cr(be, oe);
          }
        else if (It(A))
          A._store && (A._store.validated = !0);
        else if (A) {
          var Ne = F(A);
          if (typeof Ne == "function" && Ne !== A.entries)
            for (var qe = Ne.call(A), Xe; !(Xe = qe.next()).done; )
              It(Xe.value) && cr(Xe.value, oe);
        }
      }
    }
    function yr(A) {
      {
        var oe = A.type;
        if (oe == null || typeof oe == "string")
          return;
        var Se;
        if (typeof oe == "function")
          Se = oe.propTypes;
        else if (typeof oe == "object" && (oe.$$typeof === C || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        oe.$$typeof === R))
          Se = oe.propTypes;
        else
          return;
        if (Se) {
          var be = fe(oe);
          ln(Se, A.props, "prop", be, A);
        } else if (oe.PropTypes !== void 0 && !hn) {
          hn = !0;
          var Ne = fe(oe);
          J("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ne || "Unknown");
        }
        typeof oe.getDefaultProps == "function" && !oe.getDefaultProps.isReactClassApproved && J("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function sn(A) {
      {
        for (var oe = Object.keys(A.props), Se = 0; Se < oe.length; Se++) {
          var be = oe[Se];
          if (be !== "children" && be !== "key") {
            Vt(A), J("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", be), Vt(null);
            break;
          }
        }
        A.ref !== null && (Vt(A), J("Invalid attribute `ref` supplied to `React.Fragment`."), Vt(null));
      }
    }
    var Ft = {};
    function Wt(A, oe, Se, be, Ne, qe) {
      {
        var Xe = ie(A);
        if (!Xe) {
          var at = "";
          (A === void 0 || typeof A == "object" && A !== null && Object.keys(A).length === 0) && (at += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ft = sr();
          ft ? at += ft : at += fn();
          var Lt;
          A === null ? Lt = "null" : Sn(A) ? Lt = "array" : A !== void 0 && A.$$typeof === l ? (Lt = "<" + (fe(A.type) || "Unknown") + " />", at = " Did you accidentally export a JSX literal instead of a component?") : Lt = typeof A, J("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Lt, at);
        }
        var pn = un(A, oe, Se, Ne, qe);
        if (pn == null)
          return pn;
        if (Xe) {
          var vn = oe.children;
          if (vn !== void 0)
            if (be)
              if (Sn(vn)) {
                for (var En = 0; En < vn.length; En++)
                  nn(vn[En], A);
                Object.freeze && Object.freeze(vn);
              } else
                J("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              nn(vn, A);
        }
        if (et.call(oe, "key")) {
          var ir = fe(A), dt = Object.keys(oe).filter(function(_t) {
            return _t !== "key";
          }), gt = dt.length > 0 ? "{key: someKey, " + dt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ft[ir + gt]) {
            var lr = dt.length > 0 ? "{" + dt.join(": ..., ") + ": ...}" : "{}";
            J(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, gt, ir, lr, ir), Ft[ir + gt] = !0;
          }
        }
        return A === p ? sn(pn) : yr(pn), pn;
      }
    }
    function Dn(A, oe, Se) {
      return Wt(A, oe, Se, !0);
    }
    function On(A, oe, Se) {
      return Wt(A, oe, Se, !1);
    }
    var mn = On, Ct = Dn;
    wv.Fragment = p, wv.jsx = mn, wv.jsxs = Ct;
  })()), wv;
}
var cE;
function s4() {
  return cE || (cE = 1, process.env.NODE_ENV === "production" ? Sy.exports = o4() : Sy.exports = u4()), Sy.exports;
}
var At = s4(), hd = Mv(), md = {}, Ey = { exports: {} }, Qi = {}, Cy = { exports: {} }, eS = {};
var fE;
function c4() {
  return fE || (fE = 1, (function(n) {
    function l(de, Ae) {
      var ae = de.length;
      de.push(Ae);
      e: for (; 0 < ae; ) {
        var H = ae - 1 >>> 1, ue = de[H];
        if (0 < h(ue, Ae)) de[H] = Ae, de[ae] = ue, ae = H;
        else break e;
      }
    }
    function s(de) {
      return de.length === 0 ? null : de[0];
    }
    function p(de) {
      if (de.length === 0) return null;
      var Ae = de[0], ae = de.pop();
      if (ae !== Ae) {
        de[0] = ae;
        e: for (var H = 0, ue = de.length, Ve = ue >>> 1; H < Ve; ) {
          var Me = 2 * (H + 1) - 1, Pe = de[Me], Ge = Me + 1, He = de[Ge];
          if (0 > h(Pe, ae)) Ge < ue && 0 > h(He, Pe) ? (de[H] = He, de[Ge] = ae, H = Ge) : (de[H] = Pe, de[Me] = ae, H = Me);
          else if (Ge < ue && 0 > h(He, ae)) de[H] = He, de[Ge] = ae, H = Ge;
          else break e;
        }
      }
      return Ae;
    }
    function h(de, Ae) {
      var ae = de.sortIndex - Ae.sortIndex;
      return ae !== 0 ? ae : de.id - Ae.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var y = performance;
      n.unstable_now = function() {
        return y.now();
      };
    } else {
      var v = Date, E = v.now();
      n.unstable_now = function() {
        return v.now() - E;
      };
    }
    var C = [], T = [], M = 1, R = null, D = 3, O = !1, L = !1, j = !1, F = typeof setTimeout == "function" ? setTimeout : null, K = typeof clearTimeout == "function" ? clearTimeout : null, J = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function B(de) {
      for (var Ae = s(T); Ae !== null; ) {
        if (Ae.callback === null) p(T);
        else if (Ae.startTime <= de) p(T), Ae.sortIndex = Ae.expirationTime, l(C, Ae);
        else break;
        Ae = s(T);
      }
    }
    function ee(de) {
      if (j = !1, B(de), !L) if (s(C) !== null) L = !0, Ue(q);
      else {
        var Ae = s(T);
        Ae !== null && ge(ee, Ae.startTime - de);
      }
    }
    function q(de, Ae) {
      L = !1, j && (j = !1, K(Le), Le = -1), O = !0;
      var ae = D;
      try {
        for (B(Ae), R = s(C); R !== null && (!(R.expirationTime > Ae) || de && !ze()); ) {
          var H = R.callback;
          if (typeof H == "function") {
            R.callback = null, D = R.priorityLevel;
            var ue = H(R.expirationTime <= Ae);
            Ae = n.unstable_now(), typeof ue == "function" ? R.callback = ue : R === s(C) && p(C), B(Ae);
          } else p(C);
          R = s(C);
        }
        if (R !== null) var Ve = !0;
        else {
          var Me = s(T);
          Me !== null && ge(ee, Me.startTime - Ae), Ve = !1;
        }
        return Ve;
      } finally {
        R = null, D = ae, O = !1;
      }
    }
    var re = !1, pe = null, Le = -1, he = 5, ie = -1;
    function ze() {
      return !(n.unstable_now() - ie < he);
    }
    function we() {
      if (pe !== null) {
        var de = n.unstable_now();
        ie = de;
        var Ae = !0;
        try {
          Ae = pe(!0, de);
        } finally {
          Ae ? fe() : (re = !1, pe = null);
        }
      } else re = !1;
    }
    var fe;
    if (typeof J == "function") fe = function() {
      J(we);
    };
    else if (typeof MessageChannel < "u") {
      var me = new MessageChannel(), Fe = me.port2;
      me.port1.onmessage = we, fe = function() {
        Fe.postMessage(null);
      };
    } else fe = function() {
      F(we, 0);
    };
    function Ue(de) {
      pe = de, re || (re = !0, fe());
    }
    function ge(de, Ae) {
      Le = F(function() {
        de(n.unstable_now());
      }, Ae);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(de) {
      de.callback = null;
    }, n.unstable_continueExecution = function() {
      L || O || (L = !0, Ue(q));
    }, n.unstable_forceFrameRate = function(de) {
      0 > de || 125 < de ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : he = 0 < de ? Math.floor(1e3 / de) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return D;
    }, n.unstable_getFirstCallbackNode = function() {
      return s(C);
    }, n.unstable_next = function(de) {
      switch (D) {
        case 1:
        case 2:
        case 3:
          var Ae = 3;
          break;
        default:
          Ae = D;
      }
      var ae = D;
      D = Ae;
      try {
        return de();
      } finally {
        D = ae;
      }
    }, n.unstable_pauseExecution = function() {
    }, n.unstable_requestPaint = function() {
    }, n.unstable_runWithPriority = function(de, Ae) {
      switch (de) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          de = 3;
      }
      var ae = D;
      D = de;
      try {
        return Ae();
      } finally {
        D = ae;
      }
    }, n.unstable_scheduleCallback = function(de, Ae, ae) {
      var H = n.unstable_now();
      switch (typeof ae == "object" && ae !== null ? (ae = ae.delay, ae = typeof ae == "number" && 0 < ae ? H + ae : H) : ae = H, de) {
        case 1:
          var ue = -1;
          break;
        case 2:
          ue = 250;
          break;
        case 5:
          ue = 1073741823;
          break;
        case 4:
          ue = 1e4;
          break;
        default:
          ue = 5e3;
      }
      return ue = ae + ue, de = { id: M++, callback: Ae, priorityLevel: de, startTime: ae, expirationTime: ue, sortIndex: -1 }, ae > H ? (de.sortIndex = ae, l(T, de), s(C) === null && de === s(T) && (j ? (K(Le), Le = -1) : j = !0, ge(ee, ae - H))) : (de.sortIndex = ue, l(C, de), L || O || (L = !0, Ue(q))), de;
    }, n.unstable_shouldYield = ze, n.unstable_wrapCallback = function(de) {
      var Ae = D;
      return function() {
        var ae = D;
        D = Ae;
        try {
          return de.apply(this, arguments);
        } finally {
          D = ae;
        }
      };
    };
  })(eS)), eS;
}
var tS = {};
var dE;
function f4() {
  return dE || (dE = 1, (function(n) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var l = !1, s = 5;
      function p(ke, Ye) {
        var wt = ke.length;
        ke.push(Ye), v(ke, Ye, wt);
      }
      function h(ke) {
        return ke.length === 0 ? null : ke[0];
      }
      function y(ke) {
        if (ke.length === 0)
          return null;
        var Ye = ke[0], wt = ke.pop();
        return wt !== Ye && (ke[0] = wt, E(ke, wt, 0)), Ye;
      }
      function v(ke, Ye, wt) {
        for (var Kt = wt; Kt > 0; ) {
          var qt = Kt - 1 >>> 1, xn = ke[qt];
          if (C(xn, Ye) > 0)
            ke[qt] = Ye, ke[Kt] = xn, Kt = qt;
          else
            return;
        }
      }
      function E(ke, Ye, wt) {
        for (var Kt = wt, qt = ke.length, xn = qt >>> 1; Kt < xn; ) {
          var Yt = (Kt + 1) * 2 - 1, un = ke[Yt], Rt = Yt + 1, zt = ke[Rt];
          if (C(un, Ye) < 0)
            Rt < qt && C(zt, un) < 0 ? (ke[Kt] = zt, ke[Rt] = Ye, Kt = Rt) : (ke[Kt] = un, ke[Yt] = Ye, Kt = Yt);
          else if (Rt < qt && C(zt, Ye) < 0)
            ke[Kt] = zt, ke[Rt] = Ye, Kt = Rt;
          else
            return;
        }
      }
      function C(ke, Ye) {
        var wt = ke.sortIndex - Ye.sortIndex;
        return wt !== 0 ? wt : ke.id - Ye.id;
      }
      var T = 1, M = 2, R = 3, D = 4, O = 5;
      function L(ke, Ye) {
      }
      var j = typeof performance == "object" && typeof performance.now == "function";
      if (j) {
        var F = performance;
        n.unstable_now = function() {
          return F.now();
        };
      } else {
        var K = Date, J = K.now();
        n.unstable_now = function() {
          return K.now() - J;
        };
      }
      var B = 1073741823, ee = -1, q = 250, re = 5e3, pe = 1e4, Le = B, he = [], ie = [], ze = 1, we = null, fe = R, me = !1, Fe = !1, Ue = !1, ge = typeof setTimeout == "function" ? setTimeout : null, de = typeof clearTimeout == "function" ? clearTimeout : null, Ae = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ae(ke) {
        for (var Ye = h(ie); Ye !== null; ) {
          if (Ye.callback === null)
            y(ie);
          else if (Ye.startTime <= ke)
            y(ie), Ye.sortIndex = Ye.expirationTime, p(he, Ye);
          else
            return;
          Ye = h(ie);
        }
      }
      function H(ke) {
        if (Ue = !1, ae(ke), !Fe)
          if (h(he) !== null)
            Fe = !0, $e(ue);
          else {
            var Ye = h(ie);
            Ye !== null && on(H, Ye.startTime - ke);
          }
      }
      function ue(ke, Ye) {
        Fe = !1, Ue && (Ue = !1, Vn()), me = !0;
        var wt = fe;
        try {
          var Kt;
          if (!l) return Ve(ke, Ye);
        } finally {
          we = null, fe = wt, me = !1;
        }
      }
      function Ve(ke, Ye) {
        var wt = Ye;
        for (ae(wt), we = h(he); we !== null && !(we.expirationTime > wt && (!ke || Ot())); ) {
          var Kt = we.callback;
          if (typeof Kt == "function") {
            we.callback = null, fe = we.priorityLevel;
            var qt = we.expirationTime <= wt, xn = Kt(qt);
            wt = n.unstable_now(), typeof xn == "function" ? we.callback = xn : we === h(he) && y(he), ae(wt);
          } else
            y(he);
          we = h(he);
        }
        if (we !== null)
          return !0;
        var Yt = h(ie);
        return Yt !== null && on(H, Yt.startTime - wt), !1;
      }
      function Me(ke, Ye) {
        switch (ke) {
          case T:
          case M:
          case R:
          case D:
          case O:
            break;
          default:
            ke = R;
        }
        var wt = fe;
        fe = ke;
        try {
          return Ye();
        } finally {
          fe = wt;
        }
      }
      function Pe(ke) {
        var Ye;
        switch (fe) {
          case T:
          case M:
          case R:
            Ye = R;
            break;
          default:
            Ye = fe;
            break;
        }
        var wt = fe;
        fe = Ye;
        try {
          return ke();
        } finally {
          fe = wt;
        }
      }
      function Ge(ke) {
        var Ye = fe;
        return function() {
          var wt = fe;
          fe = Ye;
          try {
            return ke.apply(this, arguments);
          } finally {
            fe = wt;
          }
        };
      }
      function He(ke, Ye, wt) {
        var Kt = n.unstable_now(), qt;
        if (typeof wt == "object" && wt !== null) {
          var xn = wt.delay;
          typeof xn == "number" && xn > 0 ? qt = Kt + xn : qt = Kt;
        } else
          qt = Kt;
        var Yt;
        switch (ke) {
          case T:
            Yt = ee;
            break;
          case M:
            Yt = q;
            break;
          case O:
            Yt = Le;
            break;
          case D:
            Yt = pe;
            break;
          case R:
          default:
            Yt = re;
            break;
        }
        var un = qt + Yt, Rt = {
          id: ze++,
          callback: Ye,
          priorityLevel: ke,
          startTime: qt,
          expirationTime: un,
          sortIndex: -1
        };
        return qt > Kt ? (Rt.sortIndex = qt, p(ie, Rt), h(he) === null && Rt === h(ie) && (Ue ? Vn() : Ue = !0, on(H, qt - Kt))) : (Rt.sortIndex = un, p(he, Rt), !Fe && !me && (Fe = !0, $e(ue))), Rt;
      }
      function Ie() {
      }
      function Be() {
        !Fe && !me && (Fe = !0, $e(ue));
      }
      function Xt() {
        return h(he);
      }
      function Tn(ke) {
        ke.callback = null;
      }
      function Hn() {
        return fe;
      }
      var an = !1, _e = null, tn = -1, et = s, Nt = -1;
      function Ot() {
        var ke = n.unstable_now() - Nt;
        return !(ke < et);
      }
      function Ht() {
      }
      function ln(ke) {
        if (ke < 0 || ke > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        ke > 0 ? et = Math.floor(1e3 / ke) : et = s;
      }
      var $t = function() {
        if (_e !== null) {
          var ke = n.unstable_now();
          Nt = ke;
          var Ye = !0, wt = !0;
          try {
            wt = _e(Ye, ke);
          } finally {
            wt ? Sn() : (an = !1, _e = null);
          }
        } else
          an = !1;
      }, Sn;
      if (typeof Ae == "function")
        Sn = function() {
          Ae($t);
        };
      else if (typeof MessageChannel < "u") {
        var $n = new MessageChannel(), Er = $n.port2;
        $n.port1.onmessage = $t, Sn = function() {
          Er.postMessage(null);
        };
      } else
        Sn = function() {
          ge($t, 0);
        };
      function $e(ke) {
        _e = ke, an || (an = !0, Sn());
      }
      function on(ke, Ye) {
        tn = ge(function() {
          ke(n.unstable_now());
        }, Ye);
      }
      function Vn() {
        de(tn), tn = -1;
      }
      var pr = Ht, mr = null;
      n.unstable_IdlePriority = O, n.unstable_ImmediatePriority = T, n.unstable_LowPriority = D, n.unstable_NormalPriority = R, n.unstable_Profiling = mr, n.unstable_UserBlockingPriority = M, n.unstable_cancelCallback = Tn, n.unstable_continueExecution = Be, n.unstable_forceFrameRate = ln, n.unstable_getCurrentPriorityLevel = Hn, n.unstable_getFirstCallbackNode = Xt, n.unstable_next = Pe, n.unstable_pauseExecution = Ie, n.unstable_requestPaint = pr, n.unstable_runWithPriority = Me, n.unstable_scheduleCallback = He, n.unstable_shouldYield = Ot, n.unstable_wrapCallback = Ge, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(tS)), tS;
}
var pE;
function VC() {
  return pE || (pE = 1, process.env.NODE_ENV === "production" ? Cy.exports = c4() : Cy.exports = f4()), Cy.exports;
}
var vE;
function d4() {
  if (vE) return Qi;
  vE = 1;
  var n = Mv(), l = VC();
  function s(r) {
    for (var a = "https://reactjs.org/docs/error-decoder.html?invariant=" + r, u = 1; u < arguments.length; u++) a += "&args[]=" + encodeURIComponent(arguments[u]);
    return "Minified React error #" + r + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var p = /* @__PURE__ */ new Set(), h = {};
  function y(r, a) {
    v(r, a), v(r + "Capture", a);
  }
  function v(r, a) {
    for (h[r] = a, r = 0; r < a.length; r++) p.add(a[r]);
  }
  var E = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), C = Object.prototype.hasOwnProperty, T = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, M = {}, R = {};
  function D(r) {
    return C.call(R, r) ? !0 : C.call(M, r) ? !1 : T.test(r) ? R[r] = !0 : (M[r] = !0, !1);
  }
  function O(r, a, u, f) {
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
  function L(r, a, u, f) {
    if (a === null || typeof a > "u" || O(r, a, u, f)) return !0;
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
  function j(r, a, u, f, m, S, _) {
    this.acceptsBooleans = a === 2 || a === 3 || a === 4, this.attributeName = f, this.attributeNamespace = m, this.mustUseProperty = u, this.propertyName = r, this.type = a, this.sanitizeURL = S, this.removeEmptyString = _;
  }
  var F = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(r) {
    F[r] = new j(r, 0, !1, r, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(r) {
    var a = r[0];
    F[a] = new j(a, 1, !1, r[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(r) {
    F[r] = new j(r, 2, !1, r.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(r) {
    F[r] = new j(r, 2, !1, r, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(r) {
    F[r] = new j(r, 3, !1, r.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(r) {
    F[r] = new j(r, 3, !0, r, null, !1, !1);
  }), ["capture", "download"].forEach(function(r) {
    F[r] = new j(r, 4, !1, r, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(r) {
    F[r] = new j(r, 6, !1, r, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(r) {
    F[r] = new j(r, 5, !1, r.toLowerCase(), null, !1, !1);
  });
  var K = /[\-:]([a-z])/g;
  function J(r) {
    return r[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(r) {
    var a = r.replace(
      K,
      J
    );
    F[a] = new j(a, 1, !1, r, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(r) {
    var a = r.replace(K, J);
    F[a] = new j(a, 1, !1, r, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(r) {
    var a = r.replace(K, J);
    F[a] = new j(a, 1, !1, r, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(r) {
    F[r] = new j(r, 1, !1, r.toLowerCase(), null, !1, !1);
  }), F.xlinkHref = new j("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(r) {
    F[r] = new j(r, 1, !1, r.toLowerCase(), null, !0, !0);
  });
  function B(r, a, u, f) {
    var m = F.hasOwnProperty(a) ? F[a] : null;
    (m !== null ? m.type !== 0 : f || !(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (L(a, u, m, f) && (u = null), f || m === null ? D(a) && (u === null ? r.removeAttribute(a) : r.setAttribute(a, "" + u)) : m.mustUseProperty ? r[m.propertyName] = u === null ? m.type === 3 ? !1 : "" : u : (a = m.attributeName, f = m.attributeNamespace, u === null ? r.removeAttribute(a) : (m = m.type, u = m === 3 || m === 4 && u === !0 ? "" : "" + u, f ? r.setAttributeNS(f, a, u) : r.setAttribute(a, u))));
  }
  var ee = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, q = /* @__PURE__ */ Symbol.for("react.element"), re = /* @__PURE__ */ Symbol.for("react.portal"), pe = /* @__PURE__ */ Symbol.for("react.fragment"), Le = /* @__PURE__ */ Symbol.for("react.strict_mode"), he = /* @__PURE__ */ Symbol.for("react.profiler"), ie = /* @__PURE__ */ Symbol.for("react.provider"), ze = /* @__PURE__ */ Symbol.for("react.context"), we = /* @__PURE__ */ Symbol.for("react.forward_ref"), fe = /* @__PURE__ */ Symbol.for("react.suspense"), me = /* @__PURE__ */ Symbol.for("react.suspense_list"), Fe = /* @__PURE__ */ Symbol.for("react.memo"), Ue = /* @__PURE__ */ Symbol.for("react.lazy"), ge = /* @__PURE__ */ Symbol.for("react.offscreen"), de = Symbol.iterator;
  function Ae(r) {
    return r === null || typeof r != "object" ? null : (r = de && r[de] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var ae = Object.assign, H;
  function ue(r) {
    if (H === void 0) try {
      throw Error();
    } catch (u) {
      var a = u.stack.trim().match(/\n( *(at )?)/);
      H = a && a[1] || "";
    }
    return `
` + H + r;
  }
  var Ve = !1;
  function Me(r, a) {
    if (!r || Ve) return "";
    Ve = !0;
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
        } catch (te) {
          var f = te;
        }
        Reflect.construct(r, [], a);
      } else {
        try {
          a.call();
        } catch (te) {
          f = te;
        }
        r.call(a.prototype);
      }
      else {
        try {
          throw Error();
        } catch (te) {
          f = te;
        }
        r();
      }
    } catch (te) {
      if (te && f && typeof te.stack == "string") {
        for (var m = te.stack.split(`
`), S = f.stack.split(`
`), _ = m.length - 1, N = S.length - 1; 1 <= _ && 0 <= N && m[_] !== S[N]; ) N--;
        for (; 1 <= _ && 0 <= N; _--, N--) if (m[_] !== S[N]) {
          if (_ !== 1 || N !== 1)
            do
              if (_--, N--, 0 > N || m[_] !== S[N]) {
                var P = `
` + m[_].replace(" at new ", " at ");
                return r.displayName && P.includes("<anonymous>") && (P = P.replace("<anonymous>", r.displayName)), P;
              }
            while (1 <= _ && 0 <= N);
          break;
        }
      }
    } finally {
      Ve = !1, Error.prepareStackTrace = u;
    }
    return (r = r ? r.displayName || r.name : "") ? ue(r) : "";
  }
  function Pe(r) {
    switch (r.tag) {
      case 5:
        return ue(r.type);
      case 16:
        return ue("Lazy");
      case 13:
        return ue("Suspense");
      case 19:
        return ue("SuspenseList");
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
      case pe:
        return "Fragment";
      case re:
        return "Portal";
      case he:
        return "Profiler";
      case Le:
        return "StrictMode";
      case fe:
        return "Suspense";
      case me:
        return "SuspenseList";
    }
    if (typeof r == "object") switch (r.$$typeof) {
      case ze:
        return (r.displayName || "Context") + ".Consumer";
      case ie:
        return (r._context.displayName || "Context") + ".Provider";
      case we:
        var a = r.render;
        return r = r.displayName, r || (r = a.displayName || a.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
      case Fe:
        return a = r.displayName || null, a !== null ? a : Ge(r.type) || "Memo";
      case Ue:
        a = r._payload, r = r._init;
        try {
          return Ge(r(a));
        } catch {
        }
    }
    return null;
  }
  function He(r) {
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
        return a === Le ? "StrictMode" : "Mode";
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
  function Ie(r) {
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
  function Be(r) {
    var a = r.type;
    return (r = r.nodeName) && r.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
  }
  function Xt(r) {
    var a = Be(r) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(r.constructor.prototype, a), f = "" + r[a];
    if (!r.hasOwnProperty(a) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var m = u.get, S = u.set;
      return Object.defineProperty(r, a, { configurable: !0, get: function() {
        return m.call(this);
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
  function Tn(r) {
    r._valueTracker || (r._valueTracker = Xt(r));
  }
  function Hn(r) {
    if (!r) return !1;
    var a = r._valueTracker;
    if (!a) return !0;
    var u = a.getValue(), f = "";
    return r && (f = Be(r) ? r.checked ? "true" : "false" : r.value), r = f, r !== u ? (a.setValue(r), !0) : !1;
  }
  function an(r) {
    if (r = r || (typeof document < "u" ? document : void 0), typeof r > "u") return null;
    try {
      return r.activeElement || r.body;
    } catch {
      return r.body;
    }
  }
  function _e(r, a) {
    var u = a.checked;
    return ae({}, a, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: u ?? r._wrapperState.initialChecked });
  }
  function tn(r, a) {
    var u = a.defaultValue == null ? "" : a.defaultValue, f = a.checked != null ? a.checked : a.defaultChecked;
    u = Ie(a.value != null ? a.value : u), r._wrapperState = { initialChecked: f, initialValue: u, controlled: a.type === "checkbox" || a.type === "radio" ? a.checked != null : a.value != null };
  }
  function et(r, a) {
    a = a.checked, a != null && B(r, "checked", a, !1);
  }
  function Nt(r, a) {
    et(r, a);
    var u = Ie(a.value), f = a.type;
    if (u != null) f === "number" ? (u === 0 && r.value === "" || r.value != u) && (r.value = "" + u) : r.value !== "" + u && (r.value = "" + u);
    else if (f === "submit" || f === "reset") {
      r.removeAttribute("value");
      return;
    }
    a.hasOwnProperty("value") ? Ht(r, a.type, u) : a.hasOwnProperty("defaultValue") && Ht(r, a.type, Ie(a.defaultValue)), a.checked == null && a.defaultChecked != null && (r.defaultChecked = !!a.defaultChecked);
  }
  function Ot(r, a, u) {
    if (a.hasOwnProperty("value") || a.hasOwnProperty("defaultValue")) {
      var f = a.type;
      if (!(f !== "submit" && f !== "reset" || a.value !== void 0 && a.value !== null)) return;
      a = "" + r._wrapperState.initialValue, u || a === r.value || (r.value = a), r.defaultValue = a;
    }
    u = r.name, u !== "" && (r.name = ""), r.defaultChecked = !!r._wrapperState.initialChecked, u !== "" && (r.name = u);
  }
  function Ht(r, a, u) {
    (a !== "number" || an(r.ownerDocument) !== r) && (u == null ? r.defaultValue = "" + r._wrapperState.initialValue : r.defaultValue !== "" + u && (r.defaultValue = "" + u));
  }
  var ln = Array.isArray;
  function $t(r, a, u, f) {
    if (r = r.options, a) {
      a = {};
      for (var m = 0; m < u.length; m++) a["$" + u[m]] = !0;
      for (u = 0; u < r.length; u++) m = a.hasOwnProperty("$" + r[u].value), r[u].selected !== m && (r[u].selected = m), m && f && (r[u].defaultSelected = !0);
    } else {
      for (u = "" + Ie(u), a = null, m = 0; m < r.length; m++) {
        if (r[m].value === u) {
          r[m].selected = !0, f && (r[m].defaultSelected = !0);
          return;
        }
        a !== null || r[m].disabled || (a = r[m]);
      }
      a !== null && (a.selected = !0);
    }
  }
  function Sn(r, a) {
    if (a.dangerouslySetInnerHTML != null) throw Error(s(91));
    return ae({}, a, { value: void 0, defaultValue: void 0, children: "" + r._wrapperState.initialValue });
  }
  function $n(r, a) {
    var u = a.value;
    if (u == null) {
      if (u = a.children, a = a.defaultValue, u != null) {
        if (a != null) throw Error(s(92));
        if (ln(u)) {
          if (1 < u.length) throw Error(s(93));
          u = u[0];
        }
        a = u;
      }
      a == null && (a = ""), u = a;
    }
    r._wrapperState = { initialValue: Ie(u) };
  }
  function Er(r, a) {
    var u = Ie(a.value), f = Ie(a.defaultValue);
    u != null && (u = "" + u, u !== r.value && (r.value = u), a.defaultValue == null && r.defaultValue !== u && (r.defaultValue = u)), f != null && (r.defaultValue = "" + f);
  }
  function $e(r) {
    var a = r.textContent;
    a === r._wrapperState.initialValue && a !== "" && a !== null && (r.value = a);
  }
  function on(r) {
    switch (r) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Vn(r, a) {
    return r == null || r === "http://www.w3.org/1999/xhtml" ? on(a) : r === "http://www.w3.org/2000/svg" && a === "foreignObject" ? "http://www.w3.org/1999/xhtml" : r;
  }
  var pr, mr = (function(r) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(a, u, f, m) {
      MSApp.execUnsafeLocalFunction(function() {
        return r(a, u, f, m);
      });
    } : r;
  })(function(r, a) {
    if (r.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in r) r.innerHTML = a;
    else {
      for (pr = pr || document.createElement("div"), pr.innerHTML = "<svg>" + a.valueOf().toString() + "</svg>", a = pr.firstChild; r.firstChild; ) r.removeChild(r.firstChild);
      for (; a.firstChild; ) r.appendChild(a.firstChild);
    }
  });
  function ke(r, a) {
    if (a) {
      var u = r.firstChild;
      if (u && u === r.lastChild && u.nodeType === 3) {
        u.nodeValue = a;
        return;
      }
    }
    r.textContent = a;
  }
  var Ye = {
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
  }, wt = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ye).forEach(function(r) {
    wt.forEach(function(a) {
      a = a + r.charAt(0).toUpperCase() + r.substring(1), Ye[a] = Ye[r];
    });
  });
  function Kt(r, a, u) {
    return a == null || typeof a == "boolean" || a === "" ? "" : u || typeof a != "number" || a === 0 || Ye.hasOwnProperty(r) && Ye[r] ? ("" + a).trim() : a + "px";
  }
  function qt(r, a) {
    r = r.style;
    for (var u in a) if (a.hasOwnProperty(u)) {
      var f = u.indexOf("--") === 0, m = Kt(u, a[u], f);
      u === "float" && (u = "cssFloat"), f ? r.setProperty(u, m) : r[u] = m;
    }
  }
  var xn = ae({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Yt(r, a) {
    if (a) {
      if (xn[r] && (a.children != null || a.dangerouslySetInnerHTML != null)) throw Error(s(137, r));
      if (a.dangerouslySetInnerHTML != null) {
        if (a.children != null) throw Error(s(60));
        if (typeof a.dangerouslySetInnerHTML != "object" || !("__html" in a.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (a.style != null && typeof a.style != "object") throw Error(s(62));
    }
  }
  function un(r, a) {
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
  var Rt = null;
  function zt(r) {
    return r = r.target || r.srcElement || window, r.correspondingUseElement && (r = r.correspondingUseElement), r.nodeType === 3 ? r.parentNode : r;
  }
  var Vt = null, hn = null, It = null;
  function fn(r) {
    if (r = xt(r)) {
      if (typeof Vt != "function") throw Error(s(280));
      var a = r.stateNode;
      a && (a = Tr(a), Vt(r.stateNode, r.type, a));
    }
  }
  function sr(r) {
    hn ? It ? It.push(r) : It = [r] : hn = r;
  }
  function er() {
    if (hn) {
      var r = hn, a = It;
      if (It = hn = null, fn(r), a) for (r = 0; r < a.length; r++) fn(a[r]);
    }
  }
  function dn(r, a) {
    return r(a);
  }
  function cr() {
  }
  var nn = !1;
  function yr(r, a, u) {
    if (nn) return r(a, u);
    nn = !0;
    try {
      return dn(r, a, u);
    } finally {
      nn = !1, (hn !== null || It !== null) && (cr(), er());
    }
  }
  function sn(r, a) {
    var u = r.stateNode;
    if (u === null) return null;
    var f = Tr(u);
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
  var Ft = !1;
  if (E) try {
    var Wt = {};
    Object.defineProperty(Wt, "passive", { get: function() {
      Ft = !0;
    } }), window.addEventListener("test", Wt, Wt), window.removeEventListener("test", Wt, Wt);
  } catch {
    Ft = !1;
  }
  function Dn(r, a, u, f, m, S, _, N, P) {
    var te = Array.prototype.slice.call(arguments, 3);
    try {
      a.apply(u, te);
    } catch (Ce) {
      this.onError(Ce);
    }
  }
  var On = !1, mn = null, Ct = !1, A = null, oe = { onError: function(r) {
    On = !0, mn = r;
  } };
  function Se(r, a, u, f, m, S, _, N, P) {
    On = !1, mn = null, Dn.apply(oe, arguments);
  }
  function be(r, a, u, f, m, S, _, N, P) {
    if (Se.apply(this, arguments), On) {
      if (On) {
        var te = mn;
        On = !1, mn = null;
      } else throw Error(s(198));
      Ct || (Ct = !0, A = te);
    }
  }
  function Ne(r) {
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
  function qe(r) {
    if (r.tag === 13) {
      var a = r.memoizedState;
      if (a === null && (r = r.alternate, r !== null && (a = r.memoizedState)), a !== null) return a.dehydrated;
    }
    return null;
  }
  function Xe(r) {
    if (Ne(r) !== r) throw Error(s(188));
  }
  function at(r) {
    var a = r.alternate;
    if (!a) {
      if (a = Ne(r), a === null) throw Error(s(188));
      return a !== r ? null : r;
    }
    for (var u = r, f = a; ; ) {
      var m = u.return;
      if (m === null) break;
      var S = m.alternate;
      if (S === null) {
        if (f = m.return, f !== null) {
          u = f;
          continue;
        }
        break;
      }
      if (m.child === S.child) {
        for (S = m.child; S; ) {
          if (S === u) return Xe(m), r;
          if (S === f) return Xe(m), a;
          S = S.sibling;
        }
        throw Error(s(188));
      }
      if (u.return !== f.return) u = m, f = S;
      else {
        for (var _ = !1, N = m.child; N; ) {
          if (N === u) {
            _ = !0, u = m, f = S;
            break;
          }
          if (N === f) {
            _ = !0, f = m, u = S;
            break;
          }
          N = N.sibling;
        }
        if (!_) {
          for (N = S.child; N; ) {
            if (N === u) {
              _ = !0, u = S, f = m;
              break;
            }
            if (N === f) {
              _ = !0, f = S, u = m;
              break;
            }
            N = N.sibling;
          }
          if (!_) throw Error(s(189));
        }
      }
      if (u.alternate !== f) throw Error(s(190));
    }
    if (u.tag !== 3) throw Error(s(188));
    return u.stateNode.current === u ? r : a;
  }
  function ft(r) {
    return r = at(r), r !== null ? Lt(r) : null;
  }
  function Lt(r) {
    if (r.tag === 5 || r.tag === 6) return r;
    for (r = r.child; r !== null; ) {
      var a = Lt(r);
      if (a !== null) return a;
      r = r.sibling;
    }
    return null;
  }
  var pn = l.unstable_scheduleCallback, vn = l.unstable_cancelCallback, En = l.unstable_shouldYield, ir = l.unstable_requestPaint, dt = l.unstable_now, gt = l.unstable_getCurrentPriorityLevel, lr = l.unstable_ImmediatePriority, _t = l.unstable_UserBlockingPriority, it = l.unstable_NormalPriority, kt = l.unstable_LowPriority, Zt = l.unstable_IdlePriority, Yn = null, zn = null;
  function Cr(r) {
    if (zn && typeof zn.onCommitFiberRoot == "function") try {
      zn.onCommitFiberRoot(Yn, r, void 0, (r.current.flags & 128) === 128);
    } catch {
    }
  }
  var Mr = Math.clz32 ? Math.clz32 : _a, ba = Math.log, Ma = Math.LN2;
  function _a(r) {
    return r >>>= 0, r === 0 ? 32 : 31 - (ba(r) / Ma | 0) | 0;
  }
  var na = 64, Dr = 4194304;
  function Xr(r) {
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
  function tr(r, a) {
    var u = r.pendingLanes;
    if (u === 0) return 0;
    var f = 0, m = r.suspendedLanes, S = r.pingedLanes, _ = u & 268435455;
    if (_ !== 0) {
      var N = _ & ~m;
      N !== 0 ? f = Xr(N) : (S &= _, S !== 0 && (f = Xr(S)));
    } else _ = u & ~m, _ !== 0 ? f = Xr(_) : S !== 0 && (f = Xr(S));
    if (f === 0) return 0;
    if (a !== 0 && a !== f && (a & m) === 0 && (m = f & -f, S = a & -a, m >= S || m === 16 && (S & 4194240) !== 0)) return a;
    if ((f & 4) !== 0 && (f |= u & 16), a = r.entangledLanes, a !== 0) for (r = r.entanglements, a &= f; 0 < a; ) u = 31 - Mr(a), m = 1 << u, f |= r[u], a &= ~m;
    return f;
  }
  function fa(r, a) {
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
  function vi(r, a) {
    for (var u = r.suspendedLanes, f = r.pingedLanes, m = r.expirationTimes, S = r.pendingLanes; 0 < S; ) {
      var _ = 31 - Mr(S), N = 1 << _, P = m[_];
      P === -1 ? ((N & u) === 0 || (N & f) !== 0) && (m[_] = fa(N, a)) : P <= a && (r.expiredLanes |= N), S &= ~N;
    }
  }
  function Fr(r) {
    return r = r.pendingLanes & -1073741825, r !== 0 ? r : r & 1073741824 ? 1073741824 : 0;
  }
  function hi() {
    var r = na;
    return na <<= 1, (na & 4194240) === 0 && (na = 64), r;
  }
  function ll(r) {
    for (var a = [], u = 0; 31 > u; u++) a.push(r);
    return a;
  }
  function pt(r, a, u) {
    r.pendingLanes |= a, a !== 536870912 && (r.suspendedLanes = 0, r.pingedLanes = 0), r = r.eventTimes, a = 31 - Mr(a), r[a] = u;
  }
  function gr(r, a) {
    var u = r.pendingLanes & ~a;
    r.pendingLanes = a, r.suspendedLanes = 0, r.pingedLanes = 0, r.expiredLanes &= a, r.mutableReadLanes &= a, r.entangledLanes &= a, a = r.entanglements;
    var f = r.eventTimes;
    for (r = r.expirationTimes; 0 < u; ) {
      var m = 31 - Mr(u), S = 1 << m;
      a[m] = 0, f[m] = -1, r[m] = -1, u &= ~S;
    }
  }
  function _r(r, a) {
    var u = r.entangledLanes |= a;
    for (r = r.entanglements; u; ) {
      var f = 31 - Mr(u), m = 1 << f;
      m & a | r[f] & a && (r[f] |= a), u &= ~m;
    }
  }
  var Qt = 0;
  function Pr(r) {
    return r &= -r, 1 < r ? 4 < r ? (r & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var vt, Wn, Qn, tt, In, rn = !1, Kr = [], Kn = null, mi = null, Zn = null, Bn = /* @__PURE__ */ new Map(), ol = /* @__PURE__ */ new Map(), Or = [], da = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Qa(r, a) {
    switch (r) {
      case "focusin":
      case "focusout":
        Kn = null;
        break;
      case "dragenter":
      case "dragleave":
        mi = null;
        break;
      case "mouseover":
      case "mouseout":
        Zn = null;
        break;
      case "pointerover":
      case "pointerout":
        Bn.delete(a.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ol.delete(a.pointerId);
    }
  }
  function Ll(r, a, u, f, m, S) {
    return r === null || r.nativeEvent !== S ? (r = { blockedOn: a, domEventName: u, eventSystemFlags: f, nativeEvent: S, targetContainers: [m] }, a !== null && (a = xt(a), a !== null && Wn(a)), r) : (r.eventSystemFlags |= f, a = r.targetContainers, m !== null && a.indexOf(m) === -1 && a.push(m), r);
  }
  function $o(r, a, u, f, m) {
    switch (a) {
      case "focusin":
        return Kn = Ll(Kn, r, a, u, f, m), !0;
      case "dragenter":
        return mi = Ll(mi, r, a, u, f, m), !0;
      case "mouseover":
        return Zn = Ll(Zn, r, a, u, f, m), !0;
      case "pointerover":
        var S = m.pointerId;
        return Bn.set(S, Ll(Bn.get(S) || null, r, a, u, f, m)), !0;
      case "gotpointercapture":
        return S = m.pointerId, ol.set(S, Ll(ol.get(S) || null, r, a, u, f, m)), !0;
    }
    return !1;
  }
  function Vo(r) {
    var a = Go(r.target);
    if (a !== null) {
      var u = Ne(a);
      if (u !== null) {
        if (a = u.tag, a === 13) {
          if (a = qe(u), a !== null) {
            r.blockedOn = a, In(r.priority, function() {
              Qn(u);
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
  function ul(r) {
    if (r.blockedOn !== null) return !1;
    for (var a = r.targetContainers; 0 < a.length; ) {
      var u = Ka(r.domEventName, r.eventSystemFlags, a[0], r.nativeEvent);
      if (u === null) {
        u = r.nativeEvent;
        var f = new u.constructor(u.type, u);
        Rt = f, u.target.dispatchEvent(f), Rt = null;
      } else return a = xt(u), a !== null && Wn(a), r.blockedOn = u, !1;
      a.shift();
    }
    return !0;
  }
  function Al(r, a, u) {
    ul(r) && u.delete(a);
  }
  function gs() {
    rn = !1, Kn !== null && ul(Kn) && (Kn = null), mi !== null && ul(mi) && (mi = null), Zn !== null && ul(Zn) && (Zn = null), Bn.forEach(Al), ol.forEach(Al);
  }
  function Ga(r, a) {
    r.blockedOn === a && (r.blockedOn = null, rn || (rn = !0, l.unstable_scheduleCallback(l.unstable_NormalPriority, gs)));
  }
  function yi(r) {
    function a(m) {
      return Ga(m, r);
    }
    if (0 < Kr.length) {
      Ga(Kr[0], r);
      for (var u = 1; u < Kr.length; u++) {
        var f = Kr[u];
        f.blockedOn === r && (f.blockedOn = null);
      }
    }
    for (Kn !== null && Ga(Kn, r), mi !== null && Ga(mi, r), Zn !== null && Ga(Zn, r), Bn.forEach(a), ol.forEach(a), u = 0; u < Or.length; u++) f = Or[u], f.blockedOn === r && (f.blockedOn = null);
    for (; 0 < Or.length && (u = Or[0], u.blockedOn === null); ) Vo(u), u.blockedOn === null && Or.shift();
  }
  var Di = ee.ReactCurrentBatchConfig, Xa = !0;
  function oo(r, a, u, f) {
    var m = Qt, S = Di.transition;
    Di.transition = null;
    try {
      Qt = 1, ra(r, a, u, f);
    } finally {
      Qt = m, Di.transition = S;
    }
  }
  function ka(r, a, u, f) {
    var m = Qt, S = Di.transition;
    Di.transition = null;
    try {
      Qt = 4, ra(r, a, u, f);
    } finally {
      Qt = m, Di.transition = S;
    }
  }
  function ra(r, a, u, f) {
    if (Xa) {
      var m = Ka(r, a, u, f);
      if (m === null) Vc(r, a, f, Aa, u), Qa(r, f);
      else if ($o(m, r, a, u, f)) f.stopPropagation();
      else if (Qa(r, f), a & 4 && -1 < da.indexOf(r)) {
        for (; m !== null; ) {
          var S = xt(m);
          if (S !== null && vt(S), S = Ka(r, a, u, f), S === null && Vc(r, a, f, Aa, u), S === m) break;
          m = S;
        }
        m !== null && f.stopPropagation();
      } else Vc(r, a, f, null, u);
    }
  }
  var Aa = null;
  function Ka(r, a, u, f) {
    if (Aa = null, r = zt(f), r = Go(r), r !== null) if (a = Ne(r), a === null) r = null;
    else if (u = a.tag, u === 13) {
      if (r = qe(a), r !== null) return r;
      r = null;
    } else if (u === 3) {
      if (a.stateNode.current.memoizedState.isDehydrated) return a.tag === 3 ? a.stateNode.containerInfo : null;
      r = null;
    } else a !== r && (r = null);
    return Aa = r, null;
  }
  function Oi(r) {
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
        switch (gt()) {
          case lr:
            return 1;
          case _t:
            return 4;
          case it:
          case kt:
            return 16;
          case Zt:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var pa = null, b = null, U = null;
  function X() {
    if (U) return U;
    var r, a = b, u = a.length, f, m = "value" in pa ? pa.value : pa.textContent, S = m.length;
    for (r = 0; r < u && a[r] === m[r]; r++) ;
    var _ = u - r;
    for (f = 1; f <= _ && a[u - f] === m[S - f]; f++) ;
    return U = m.slice(r, 1 < f ? 1 - f : void 0);
  }
  function le(r) {
    var a = r.keyCode;
    return "charCode" in r ? (r = r.charCode, r === 0 && a === 13 && (r = 13)) : r = a, r === 10 && (r = 13), 32 <= r || r === 13 ? r : 0;
  }
  function Re() {
    return !0;
  }
  function ht() {
    return !1;
  }
  function ye(r) {
    function a(u, f, m, S, _) {
      this._reactName = u, this._targetInst = m, this.type = f, this.nativeEvent = S, this.target = _, this.currentTarget = null;
      for (var N in r) r.hasOwnProperty(N) && (u = r[N], this[N] = u ? u(S) : S[N]);
      return this.isDefaultPrevented = (S.defaultPrevented != null ? S.defaultPrevented : S.returnValue === !1) ? Re : ht, this.isPropagationStopped = ht, this;
    }
    return ae(a.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Re);
    }, stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Re);
    }, persist: function() {
    }, isPersistent: Re }), a;
  }
  var St = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(r) {
    return r.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Jt = ye(St), yn = ae({}, St, { view: 0, detail: 0 }), Jn = ye(yn), Rn, bt, qn, or = ae({}, yn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: wd, button: 0, buttons: 0, relatedTarget: function(r) {
    return r.relatedTarget === void 0 ? r.fromElement === r.srcElement ? r.toElement : r.fromElement : r.relatedTarget;
  }, movementX: function(r) {
    return "movementX" in r ? r.movementX : (r !== qn && (qn && r.type === "mousemove" ? (Rn = r.screenX - qn.screenX, bt = r.screenY - qn.screenY) : bt = Rn = 0, qn = r), Rn);
  }, movementY: function(r) {
    return "movementY" in r ? r.movementY : bt;
  } }), zi = ye(or), Nl = ae({}, or, { dataTransfer: 0 }), sl = ye(Nl), uo = ae({}, yn, { relatedTarget: 0 }), Io = ye(uo), xd = ae({}, St, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Oc = ye(xd), Ed = ae({}, St, { clipboardData: function(r) {
    return "clipboardData" in r ? r.clipboardData : window.clipboardData;
  } }), _v = ye(Ed), Cd = ae({}, St, { data: 0 }), Td = ye(Cd), kv = {
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
  }, Dv = {
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
  function Ul(r) {
    var a = this.nativeEvent;
    return a.getModifierState ? a.getModifierState(r) : (r = Uy[r]) ? !!a[r] : !1;
  }
  function wd() {
    return Ul;
  }
  var Rd = ae({}, yn, { key: function(r) {
    if (r.key) {
      var a = kv[r.key] || r.key;
      if (a !== "Unidentified") return a;
    }
    return r.type === "keypress" ? (r = le(r), r === 13 ? "Enter" : String.fromCharCode(r)) : r.type === "keydown" || r.type === "keyup" ? Dv[r.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: wd, charCode: function(r) {
    return r.type === "keypress" ? le(r) : 0;
  }, keyCode: function(r) {
    return r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  }, which: function(r) {
    return r.type === "keypress" ? le(r) : r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  } }), bd = ye(Rd), Md = ae({}, or, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ov = ye(Md), zc = ae({}, yn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: wd }), zv = ye(zc), Za = ae({}, St, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), jl = ye(Za), Hr = ae({}, or, {
    deltaX: function(r) {
      return "deltaX" in r ? r.deltaX : "wheelDeltaX" in r ? -r.wheelDeltaX : 0;
    },
    deltaY: function(r) {
      return "deltaY" in r ? r.deltaY : "wheelDeltaY" in r ? -r.wheelDeltaY : "wheelDelta" in r ? -r.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Fl = ye(Hr), _d = [9, 13, 27, 32], Du = E && "CompositionEvent" in window, Ss = null;
  E && "documentMode" in document && (Ss = document.documentMode);
  var xs = E && "TextEvent" in window && !Ss, Lv = E && (!Du || Ss && 8 < Ss && 11 >= Ss), Av = " ", Lc = !1;
  function Nv(r, a) {
    switch (r) {
      case "keyup":
        return _d.indexOf(a.keyCode) !== -1;
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
  function Uv(r) {
    return r = r.detail, typeof r == "object" && "data" in r ? r.data : null;
  }
  var Ou = !1;
  function jv(r, a) {
    switch (r) {
      case "compositionend":
        return Uv(a);
      case "keypress":
        return a.which !== 32 ? null : (Lc = !0, Av);
      case "textInput":
        return r = a.data, r === Av && Lc ? null : r;
      default:
        return null;
    }
  }
  function jy(r, a) {
    if (Ou) return r === "compositionend" || !Du && Nv(r, a) ? (r = X(), U = b = pa = null, Ou = !1, r) : null;
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
        return Lv && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var Fy = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Fv(r) {
    var a = r && r.nodeName && r.nodeName.toLowerCase();
    return a === "input" ? !!Fy[r.type] : a === "textarea";
  }
  function kd(r, a, u, f) {
    sr(f), a = bs(a, "onChange"), 0 < a.length && (u = new Jt("onChange", "change", null, u, f), r.push({ event: u, listeners: a }));
  }
  var cl = null, Bo = null;
  function Pv(r) {
    Wo(r, 0);
  }
  function Es(r) {
    var a = Ki(r);
    if (Hn(a)) return r;
  }
  function Py(r, a) {
    if (r === "change") return a;
  }
  var Hv = !1;
  if (E) {
    var Dd;
    if (E) {
      var Od = "oninput" in document;
      if (!Od) {
        var $v = document.createElement("div");
        $v.setAttribute("oninput", "return;"), Od = typeof $v.oninput == "function";
      }
      Dd = Od;
    } else Dd = !1;
    Hv = Dd && (!document.documentMode || 9 < document.documentMode);
  }
  function Vv() {
    cl && (cl.detachEvent("onpropertychange", Iv), Bo = cl = null);
  }
  function Iv(r) {
    if (r.propertyName === "value" && Es(Bo)) {
      var a = [];
      kd(a, Bo, r, zt(r)), yr(Pv, a);
    }
  }
  function Hy(r, a, u) {
    r === "focusin" ? (Vv(), cl = a, Bo = u, cl.attachEvent("onpropertychange", Iv)) : r === "focusout" && Vv();
  }
  function Bv(r) {
    if (r === "selectionchange" || r === "keyup" || r === "keydown") return Es(Bo);
  }
  function $y(r, a) {
    if (r === "click") return Es(a);
  }
  function qv(r, a) {
    if (r === "input" || r === "change") return Es(a);
  }
  function Vy(r, a) {
    return r === a && (r !== 0 || 1 / r === 1 / a) || r !== r && a !== a;
  }
  var Xi = typeof Object.is == "function" ? Object.is : Vy;
  function Cs(r, a) {
    if (Xi(r, a)) return !0;
    if (typeof r != "object" || r === null || typeof a != "object" || a === null) return !1;
    var u = Object.keys(r), f = Object.keys(a);
    if (u.length !== f.length) return !1;
    for (f = 0; f < u.length; f++) {
      var m = u[f];
      if (!C.call(a, m) || !Xi(r[m], a[m])) return !1;
    }
    return !0;
  }
  function Yv(r) {
    for (; r && r.firstChild; ) r = r.firstChild;
    return r;
  }
  function Ac(r, a) {
    var u = Yv(r);
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
      u = Yv(u);
    }
  }
  function so(r, a) {
    return r && a ? r === a ? !0 : r && r.nodeType === 3 ? !1 : a && a.nodeType === 3 ? so(r, a.parentNode) : "contains" in r ? r.contains(a) : r.compareDocumentPosition ? !!(r.compareDocumentPosition(a) & 16) : !1 : !1;
  }
  function Ts() {
    for (var r = window, a = an(); a instanceof r.HTMLIFrameElement; ) {
      try {
        var u = typeof a.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) r = a.contentWindow;
      else break;
      a = an(r.document);
    }
    return a;
  }
  function Nc(r) {
    var a = r && r.nodeName && r.nodeName.toLowerCase();
    return a && (a === "input" && (r.type === "text" || r.type === "search" || r.type === "tel" || r.type === "url" || r.type === "password") || a === "textarea" || r.contentEditable === "true");
  }
  function zu(r) {
    var a = Ts(), u = r.focusedElem, f = r.selectionRange;
    if (a !== u && u && u.ownerDocument && so(u.ownerDocument.documentElement, u)) {
      if (f !== null && Nc(u)) {
        if (a = f.start, r = f.end, r === void 0 && (r = a), "selectionStart" in u) u.selectionStart = a, u.selectionEnd = Math.min(r, u.value.length);
        else if (r = (a = u.ownerDocument || document) && a.defaultView || window, r.getSelection) {
          r = r.getSelection();
          var m = u.textContent.length, S = Math.min(f.start, m);
          f = f.end === void 0 ? S : Math.min(f.end, m), !r.extend && S > f && (m = f, f = S, S = m), m = Ac(u, S);
          var _ = Ac(
            u,
            f
          );
          m && _ && (r.rangeCount !== 1 || r.anchorNode !== m.node || r.anchorOffset !== m.offset || r.focusNode !== _.node || r.focusOffset !== _.offset) && (a = a.createRange(), a.setStart(m.node, m.offset), r.removeAllRanges(), S > f ? (r.addRange(a), r.extend(_.node, _.offset)) : (a.setEnd(_.node, _.offset), r.addRange(a)));
        }
      }
      for (a = [], r = u; r = r.parentNode; ) r.nodeType === 1 && a.push({ element: r, left: r.scrollLeft, top: r.scrollTop });
      for (typeof u.focus == "function" && u.focus(), u = 0; u < a.length; u++) r = a[u], r.element.scrollLeft = r.left, r.element.scrollTop = r.top;
    }
  }
  var Iy = E && "documentMode" in document && 11 >= document.documentMode, Lu = null, zd = null, ws = null, Ld = !1;
  function Ad(r, a, u) {
    var f = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    Ld || Lu == null || Lu !== an(f) || (f = Lu, "selectionStart" in f && Nc(f) ? f = { start: f.selectionStart, end: f.selectionEnd } : (f = (f.ownerDocument && f.ownerDocument.defaultView || window).getSelection(), f = { anchorNode: f.anchorNode, anchorOffset: f.anchorOffset, focusNode: f.focusNode, focusOffset: f.focusOffset }), ws && Cs(ws, f) || (ws = f, f = bs(zd, "onSelect"), 0 < f.length && (a = new Jt("onSelect", "select", null, a, u), r.push({ event: a, listeners: f }), a.target = Lu)));
  }
  function Uc(r, a) {
    var u = {};
    return u[r.toLowerCase()] = a.toLowerCase(), u["Webkit" + r] = "webkit" + a, u["Moz" + r] = "moz" + a, u;
  }
  var qo = { animationend: Uc("Animation", "AnimationEnd"), animationiteration: Uc("Animation", "AnimationIteration"), animationstart: Uc("Animation", "AnimationStart"), transitionend: Uc("Transition", "TransitionEnd") }, va = {}, Nd = {};
  E && (Nd = document.createElement("div").style, "AnimationEvent" in window || (delete qo.animationend.animation, delete qo.animationiteration.animation, delete qo.animationstart.animation), "TransitionEvent" in window || delete qo.transitionend.transition);
  function jc(r) {
    if (va[r]) return va[r];
    if (!qo[r]) return r;
    var a = qo[r], u;
    for (u in a) if (a.hasOwnProperty(u) && u in Nd) return va[r] = a[u];
    return r;
  }
  var Wv = jc("animationend"), Qv = jc("animationiteration"), Gv = jc("animationstart"), Xv = jc("transitionend"), Ud = /* @__PURE__ */ new Map(), Fc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Li(r, a) {
    Ud.set(r, a), y(a, [r]);
  }
  for (var jd = 0; jd < Fc.length; jd++) {
    var Yo = Fc[jd], By = Yo.toLowerCase(), qy = Yo[0].toUpperCase() + Yo.slice(1);
    Li(By, "on" + qy);
  }
  Li(Wv, "onAnimationEnd"), Li(Qv, "onAnimationIteration"), Li(Gv, "onAnimationStart"), Li("dblclick", "onDoubleClick"), Li("focusin", "onFocus"), Li("focusout", "onBlur"), Li(Xv, "onTransitionEnd"), v("onMouseEnter", ["mouseout", "mouseover"]), v("onMouseLeave", ["mouseout", "mouseover"]), v("onPointerEnter", ["pointerout", "pointerover"]), v("onPointerLeave", ["pointerout", "pointerover"]), y("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), y("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), y("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), y("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), y("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), y("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Rs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Fd = new Set("cancel close invalid load scroll toggle".split(" ").concat(Rs));
  function Pc(r, a, u) {
    var f = r.type || "unknown-event";
    r.currentTarget = u, be(f, a, void 0, r), r.currentTarget = null;
  }
  function Wo(r, a) {
    a = (a & 4) !== 0;
    for (var u = 0; u < r.length; u++) {
      var f = r[u], m = f.event;
      f = f.listeners;
      e: {
        var S = void 0;
        if (a) for (var _ = f.length - 1; 0 <= _; _--) {
          var N = f[_], P = N.instance, te = N.currentTarget;
          if (N = N.listener, P !== S && m.isPropagationStopped()) break e;
          Pc(m, N, te), S = P;
        }
        else for (_ = 0; _ < f.length; _++) {
          if (N = f[_], P = N.instance, te = N.currentTarget, N = N.listener, P !== S && m.isPropagationStopped()) break e;
          Pc(m, N, te), S = P;
        }
      }
    }
    if (Ct) throw r = A, Ct = !1, A = null, r;
  }
  function Gn(r, a) {
    var u = a[ks];
    u === void 0 && (u = a[ks] = /* @__PURE__ */ new Set());
    var f = r + "__bubble";
    u.has(f) || (Kv(a, r, 2, !1), u.add(f));
  }
  function Hc(r, a, u) {
    var f = 0;
    a && (f |= 4), Kv(u, r, f, a);
  }
  var $c = "_reactListening" + Math.random().toString(36).slice(2);
  function Au(r) {
    if (!r[$c]) {
      r[$c] = !0, p.forEach(function(u) {
        u !== "selectionchange" && (Fd.has(u) || Hc(u, !1, r), Hc(u, !0, r));
      });
      var a = r.nodeType === 9 ? r : r.ownerDocument;
      a === null || a[$c] || (a[$c] = !0, Hc("selectionchange", !1, a));
    }
  }
  function Kv(r, a, u, f) {
    switch (Oi(a)) {
      case 1:
        var m = oo;
        break;
      case 4:
        m = ka;
        break;
      default:
        m = ra;
    }
    u = m.bind(null, a, u, r), m = void 0, !Ft || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (m = !0), f ? m !== void 0 ? r.addEventListener(a, u, { capture: !0, passive: m }) : r.addEventListener(a, u, !0) : m !== void 0 ? r.addEventListener(a, u, { passive: m }) : r.addEventListener(a, u, !1);
  }
  function Vc(r, a, u, f, m) {
    var S = f;
    if ((a & 1) === 0 && (a & 2) === 0 && f !== null) e: for (; ; ) {
      if (f === null) return;
      var _ = f.tag;
      if (_ === 3 || _ === 4) {
        var N = f.stateNode.containerInfo;
        if (N === m || N.nodeType === 8 && N.parentNode === m) break;
        if (_ === 4) for (_ = f.return; _ !== null; ) {
          var P = _.tag;
          if ((P === 3 || P === 4) && (P = _.stateNode.containerInfo, P === m || P.nodeType === 8 && P.parentNode === m)) return;
          _ = _.return;
        }
        for (; N !== null; ) {
          if (_ = Go(N), _ === null) return;
          if (P = _.tag, P === 5 || P === 6) {
            f = S = _;
            continue e;
          }
          N = N.parentNode;
        }
      }
      f = f.return;
    }
    yr(function() {
      var te = S, Ce = zt(u), De = [];
      e: {
        var Ee = Ud.get(r);
        if (Ee !== void 0) {
          var Ze = Jt, lt = r;
          switch (r) {
            case "keypress":
              if (le(u) === 0) break e;
            case "keydown":
            case "keyup":
              Ze = bd;
              break;
            case "focusin":
              lt = "focus", Ze = Io;
              break;
            case "focusout":
              lt = "blur", Ze = Io;
              break;
            case "beforeblur":
            case "afterblur":
              Ze = Io;
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
              Ze = zi;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Ze = sl;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Ze = zv;
              break;
            case Wv:
            case Qv:
            case Gv:
              Ze = Oc;
              break;
            case Xv:
              Ze = jl;
              break;
            case "scroll":
              Ze = Jn;
              break;
            case "wheel":
              Ze = Fl;
              break;
            case "copy":
            case "cut":
            case "paste":
              Ze = _v;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Ze = Ov;
          }
          var st = (a & 4) !== 0, Ur = !st && r === "scroll", Y = st ? Ee !== null ? Ee + "Capture" : null : Ee;
          st = [];
          for (var V = te, G; V !== null; ) {
            G = V;
            var Te = G.stateNode;
            if (G.tag === 5 && Te !== null && (G = Te, Y !== null && (Te = sn(V, Y), Te != null && st.push(Nu(V, Te, G)))), Ur) break;
            V = V.return;
          }
          0 < st.length && (Ee = new Ze(Ee, lt, null, u, Ce), De.push({ event: Ee, listeners: st }));
        }
      }
      if ((a & 7) === 0) {
        e: {
          if (Ee = r === "mouseover" || r === "pointerover", Ze = r === "mouseout" || r === "pointerout", Ee && u !== Rt && (lt = u.relatedTarget || u.fromElement) && (Go(lt) || lt[Pl])) break e;
          if ((Ze || Ee) && (Ee = Ce.window === Ce ? Ce : (Ee = Ce.ownerDocument) ? Ee.defaultView || Ee.parentWindow : window, Ze ? (lt = u.relatedTarget || u.toElement, Ze = te, lt = lt ? Go(lt) : null, lt !== null && (Ur = Ne(lt), lt !== Ur || lt.tag !== 5 && lt.tag !== 6) && (lt = null)) : (Ze = null, lt = te), Ze !== lt)) {
            if (st = zi, Te = "onMouseLeave", Y = "onMouseEnter", V = "mouse", (r === "pointerout" || r === "pointerover") && (st = Ov, Te = "onPointerLeave", Y = "onPointerEnter", V = "pointer"), Ur = Ze == null ? Ee : Ki(Ze), G = lt == null ? Ee : Ki(lt), Ee = new st(Te, V + "leave", Ze, u, Ce), Ee.target = Ur, Ee.relatedTarget = G, Te = null, Go(Ce) === te && (st = new st(Y, V + "enter", lt, u, Ce), st.target = G, st.relatedTarget = Ur, Te = st), Ur = Te, Ze && lt) t: {
              for (st = Ze, Y = lt, V = 0, G = st; G; G = co(G)) V++;
              for (G = 0, Te = Y; Te; Te = co(Te)) G++;
              for (; 0 < V - G; ) st = co(st), V--;
              for (; 0 < G - V; ) Y = co(Y), G--;
              for (; V--; ) {
                if (st === Y || Y !== null && st === Y.alternate) break t;
                st = co(st), Y = co(Y);
              }
              st = null;
            }
            else st = null;
            Ze !== null && Zv(De, Ee, Ze, st, !1), lt !== null && Ur !== null && Zv(De, Ur, lt, st, !0);
          }
        }
        e: {
          if (Ee = te ? Ki(te) : window, Ze = Ee.nodeName && Ee.nodeName.toLowerCase(), Ze === "select" || Ze === "input" && Ee.type === "file") var ot = Py;
          else if (Fv(Ee)) if (Hv) ot = qv;
          else {
            ot = Bv;
            var Mt = Hy;
          }
          else (Ze = Ee.nodeName) && Ze.toLowerCase() === "input" && (Ee.type === "checkbox" || Ee.type === "radio") && (ot = $y);
          if (ot && (ot = ot(r, te))) {
            kd(De, ot, u, Ce);
            break e;
          }
          Mt && Mt(r, Ee, te), r === "focusout" && (Mt = Ee._wrapperState) && Mt.controlled && Ee.type === "number" && Ht(Ee, "number", Ee.value);
        }
        switch (Mt = te ? Ki(te) : window, r) {
          case "focusin":
            (Fv(Mt) || Mt.contentEditable === "true") && (Lu = Mt, zd = te, ws = null);
            break;
          case "focusout":
            ws = zd = Lu = null;
            break;
          case "mousedown":
            Ld = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ld = !1, Ad(De, u, Ce);
            break;
          case "selectionchange":
            if (Iy) break;
          case "keydown":
          case "keyup":
            Ad(De, u, Ce);
        }
        var Dt;
        if (Du) e: {
          switch (r) {
            case "compositionstart":
              var Pt = "onCompositionStart";
              break e;
            case "compositionend":
              Pt = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Pt = "onCompositionUpdate";
              break e;
          }
          Pt = void 0;
        }
        else Ou ? Nv(r, u) && (Pt = "onCompositionEnd") : r === "keydown" && u.keyCode === 229 && (Pt = "onCompositionStart");
        Pt && (Lv && u.locale !== "ko" && (Ou || Pt !== "onCompositionStart" ? Pt === "onCompositionEnd" && Ou && (Dt = X()) : (pa = Ce, b = "value" in pa ? pa.value : pa.textContent, Ou = !0)), Mt = bs(te, Pt), 0 < Mt.length && (Pt = new Td(Pt, r, null, u, Ce), De.push({ event: Pt, listeners: Mt }), Dt ? Pt.data = Dt : (Dt = Uv(u), Dt !== null && (Pt.data = Dt)))), (Dt = xs ? jv(r, u) : jy(r, u)) && (te = bs(te, "onBeforeInput"), 0 < te.length && (Ce = new Td("onBeforeInput", "beforeinput", null, u, Ce), De.push({ event: Ce, listeners: te }), Ce.data = Dt));
      }
      Wo(De, a);
    });
  }
  function Nu(r, a, u) {
    return { instance: r, listener: a, currentTarget: u };
  }
  function bs(r, a) {
    for (var u = a + "Capture", f = []; r !== null; ) {
      var m = r, S = m.stateNode;
      m.tag === 5 && S !== null && (m = S, S = sn(r, u), S != null && f.unshift(Nu(r, S, m)), S = sn(r, a), S != null && f.push(Nu(r, S, m))), r = r.return;
    }
    return f;
  }
  function co(r) {
    if (r === null) return null;
    do
      r = r.return;
    while (r && r.tag !== 5);
    return r || null;
  }
  function Zv(r, a, u, f, m) {
    for (var S = a._reactName, _ = []; u !== null && u !== f; ) {
      var N = u, P = N.alternate, te = N.stateNode;
      if (P !== null && P === f) break;
      N.tag === 5 && te !== null && (N = te, m ? (P = sn(u, S), P != null && _.unshift(Nu(u, P, N))) : m || (P = sn(u, S), P != null && _.push(Nu(u, P, N)))), u = u.return;
    }
    _.length !== 0 && r.push({ event: a, listeners: _ });
  }
  var Jv = /\r\n?/g, Yy = /\u0000|\uFFFD/g;
  function eh(r) {
    return (typeof r == "string" ? r : "" + r).replace(Jv, `
`).replace(Yy, "");
  }
  function Ic(r, a, u) {
    if (a = eh(a), eh(r) !== a && u) throw Error(s(425));
  }
  function fo() {
  }
  var Ms = null, Qo = null;
  function Bc(r, a) {
    return r === "textarea" || r === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
  }
  var qc = typeof setTimeout == "function" ? setTimeout : void 0, Pd = typeof clearTimeout == "function" ? clearTimeout : void 0, th = typeof Promise == "function" ? Promise : void 0, Uu = typeof queueMicrotask == "function" ? queueMicrotask : typeof th < "u" ? function(r) {
    return th.resolve(null).then(r).catch(Yc);
  } : qc;
  function Yc(r) {
    setTimeout(function() {
      throw r;
    });
  }
  function ju(r, a) {
    var u = a, f = 0;
    do {
      var m = u.nextSibling;
      if (r.removeChild(u), m && m.nodeType === 8) if (u = m.data, u === "/$") {
        if (f === 0) {
          r.removeChild(m), yi(a);
          return;
        }
        f--;
      } else u !== "$" && u !== "$?" && u !== "$!" || f++;
      u = m;
    } while (u);
    yi(a);
  }
  function fl(r) {
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
  function nh(r) {
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
  var po = Math.random().toString(36).slice(2), dl = "__reactFiber$" + po, _s = "__reactProps$" + po, Pl = "__reactContainer$" + po, ks = "__reactEvents$" + po, Fu = "__reactListeners$" + po, Wy = "__reactHandles$" + po;
  function Go(r) {
    var a = r[dl];
    if (a) return a;
    for (var u = r.parentNode; u; ) {
      if (a = u[Pl] || u[dl]) {
        if (u = a.alternate, a.child !== null || u !== null && u.child !== null) for (r = nh(r); r !== null; ) {
          if (u = r[dl]) return u;
          r = nh(r);
        }
        return a;
      }
      r = u, u = r.parentNode;
    }
    return null;
  }
  function xt(r) {
    return r = r[dl] || r[Pl], !r || r.tag !== 5 && r.tag !== 6 && r.tag !== 13 && r.tag !== 3 ? null : r;
  }
  function Ki(r) {
    if (r.tag === 5 || r.tag === 6) return r.stateNode;
    throw Error(s(33));
  }
  function Tr(r) {
    return r[_s] || null;
  }
  var bn = [], Ai = -1;
  function Ni(r) {
    return { current: r };
  }
  function fr(r) {
    0 > Ai || (r.current = bn[Ai], bn[Ai] = null, Ai--);
  }
  function yt(r, a) {
    Ai++, bn[Ai] = r.current, r.current = a;
  }
  var Da = {}, kr = Ni(Da), Zr = Ni(!1), Ja = Da;
  function ei(r, a) {
    var u = r.type.contextTypes;
    if (!u) return Da;
    var f = r.stateNode;
    if (f && f.__reactInternalMemoizedUnmaskedChildContext === a) return f.__reactInternalMemoizedMaskedChildContext;
    var m = {}, S;
    for (S in u) m[S] = a[S];
    return f && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = a, r.__reactInternalMemoizedMaskedChildContext = m), m;
  }
  function $r(r) {
    return r = r.childContextTypes, r != null;
  }
  function Pu() {
    fr(Zr), fr(kr);
  }
  function rh(r, a, u) {
    if (kr.current !== Da) throw Error(s(168));
    yt(kr, a), yt(Zr, u);
  }
  function Ds(r, a, u) {
    var f = r.stateNode;
    if (a = a.childContextTypes, typeof f.getChildContext != "function") return u;
    f = f.getChildContext();
    for (var m in f) if (!(m in a)) throw Error(s(108, He(r) || "Unknown", m));
    return ae({}, u, f);
  }
  function aa(r) {
    return r = (r = r.stateNode) && r.__reactInternalMemoizedMergedChildContext || Da, Ja = kr.current, yt(kr, r), yt(Zr, Zr.current), !0;
  }
  function Wc(r, a, u) {
    var f = r.stateNode;
    if (!f) throw Error(s(169));
    u ? (r = Ds(r, a, Ja), f.__reactInternalMemoizedMergedChildContext = r, fr(Zr), fr(kr), yt(kr, r)) : fr(Zr), yt(Zr, u);
  }
  var pl = null, Hu = !1, Hl = !1;
  function Qc(r) {
    pl === null ? pl = [r] : pl.push(r);
  }
  function vo(r) {
    Hu = !0, Qc(r);
  }
  function vl() {
    if (!Hl && pl !== null) {
      Hl = !0;
      var r = 0, a = Qt;
      try {
        var u = pl;
        for (Qt = 1; r < u.length; r++) {
          var f = u[r];
          do
            f = f(!0);
          while (f !== null);
        }
        pl = null, Hu = !1;
      } catch (m) {
        throw pl !== null && (pl = pl.slice(r + 1)), pn(lr, vl), m;
      } finally {
        Qt = a, Hl = !1;
      }
    }
    return null;
  }
  var ho = [], mo = 0, yo = null, $l = 0, Vr = [], Ui = 0, gi = null, hl = 1, ml = "";
  function Xo(r, a) {
    ho[mo++] = $l, ho[mo++] = yo, yo = r, $l = a;
  }
  function ah(r, a, u) {
    Vr[Ui++] = hl, Vr[Ui++] = ml, Vr[Ui++] = gi, gi = r;
    var f = hl;
    r = ml;
    var m = 32 - Mr(f) - 1;
    f &= ~(1 << m), u += 1;
    var S = 32 - Mr(a) + m;
    if (30 < S) {
      var _ = m - m % 5;
      S = (f & (1 << _) - 1).toString(32), f >>= _, m -= _, hl = 1 << 32 - Mr(a) + m | u << m | f, ml = S + r;
    } else hl = 1 << S | u << m | f, ml = r;
  }
  function Gc(r) {
    r.return !== null && (Xo(r, 1), ah(r, 1, 0));
  }
  function Xc(r) {
    for (; r === yo; ) yo = ho[--mo], ho[mo] = null, $l = ho[--mo], ho[mo] = null;
    for (; r === gi; ) gi = Vr[--Ui], Vr[Ui] = null, ml = Vr[--Ui], Vr[Ui] = null, hl = Vr[--Ui], Vr[Ui] = null;
  }
  var ti = null, ni = null, Sr = !1, ji = null;
  function Hd(r, a) {
    var u = Vi(5, null, null, 0);
    u.elementType = "DELETED", u.stateNode = a, u.return = r, a = r.deletions, a === null ? (r.deletions = [u], r.flags |= 16) : a.push(u);
  }
  function ih(r, a) {
    switch (r.tag) {
      case 5:
        var u = r.type;
        return a = a.nodeType !== 1 || u.toLowerCase() !== a.nodeName.toLowerCase() ? null : a, a !== null ? (r.stateNode = a, ti = r, ni = fl(a.firstChild), !0) : !1;
      case 6:
        return a = r.pendingProps === "" || a.nodeType !== 3 ? null : a, a !== null ? (r.stateNode = a, ti = r, ni = null, !0) : !1;
      case 13:
        return a = a.nodeType !== 8 ? null : a, a !== null ? (u = gi !== null ? { id: hl, overflow: ml } : null, r.memoizedState = { dehydrated: a, treeContext: u, retryLane: 1073741824 }, u = Vi(18, null, null, 0), u.stateNode = a, u.return = r, r.child = u, ti = r, ni = null, !0) : !1;
      default:
        return !1;
    }
  }
  function $d(r) {
    return (r.mode & 1) !== 0 && (r.flags & 128) === 0;
  }
  function Vd(r) {
    if (Sr) {
      var a = ni;
      if (a) {
        var u = a;
        if (!ih(r, a)) {
          if ($d(r)) throw Error(s(418));
          a = fl(u.nextSibling);
          var f = ti;
          a && ih(r, a) ? Hd(f, u) : (r.flags = r.flags & -4097 | 2, Sr = !1, ti = r);
        }
      } else {
        if ($d(r)) throw Error(s(418));
        r.flags = r.flags & -4097 | 2, Sr = !1, ti = r;
      }
    }
  }
  function Jr(r) {
    for (r = r.return; r !== null && r.tag !== 5 && r.tag !== 3 && r.tag !== 13; ) r = r.return;
    ti = r;
  }
  function Kc(r) {
    if (r !== ti) return !1;
    if (!Sr) return Jr(r), Sr = !0, !1;
    var a;
    if ((a = r.tag !== 3) && !(a = r.tag !== 5) && (a = r.type, a = a !== "head" && a !== "body" && !Bc(r.type, r.memoizedProps)), a && (a = ni)) {
      if ($d(r)) throw Os(), Error(s(418));
      for (; a; ) Hd(r, a), a = fl(a.nextSibling);
    }
    if (Jr(r), r.tag === 13) {
      if (r = r.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(s(317));
      e: {
        for (r = r.nextSibling, a = 0; r; ) {
          if (r.nodeType === 8) {
            var u = r.data;
            if (u === "/$") {
              if (a === 0) {
                ni = fl(r.nextSibling);
                break e;
              }
              a--;
            } else u !== "$" && u !== "$!" && u !== "$?" || a++;
          }
          r = r.nextSibling;
        }
        ni = null;
      }
    } else ni = ti ? fl(r.stateNode.nextSibling) : null;
    return !0;
  }
  function Os() {
    for (var r = ni; r; ) r = fl(r.nextSibling);
  }
  function go() {
    ni = ti = null, Sr = !1;
  }
  function Vl(r) {
    ji === null ? ji = [r] : ji.push(r);
  }
  var Qy = ee.ReactCurrentBatchConfig;
  function Ko(r, a, u) {
    if (r = u.ref, r !== null && typeof r != "function" && typeof r != "object") {
      if (u._owner) {
        if (u = u._owner, u) {
          if (u.tag !== 1) throw Error(s(309));
          var f = u.stateNode;
        }
        if (!f) throw Error(s(147, r));
        var m = f, S = "" + r;
        return a !== null && a.ref !== null && typeof a.ref == "function" && a.ref._stringRef === S ? a.ref : (a = function(_) {
          var N = m.refs;
          _ === null ? delete N[S] : N[S] = _;
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
  function lh(r) {
    var a = r._init;
    return a(r._payload);
  }
  function Zo(r) {
    function a(Y, V) {
      if (r) {
        var G = Y.deletions;
        G === null ? (Y.deletions = [V], Y.flags |= 16) : G.push(V);
      }
    }
    function u(Y, V) {
      if (!r) return null;
      for (; V !== null; ) a(Y, V), V = V.sibling;
      return null;
    }
    function f(Y, V) {
      for (Y = /* @__PURE__ */ new Map(); V !== null; ) V.key !== null ? Y.set(V.key, V) : Y.set(V.index, V), V = V.sibling;
      return Y;
    }
    function m(Y, V) {
      return Y = bo(Y, V), Y.index = 0, Y.sibling = null, Y;
    }
    function S(Y, V, G) {
      return Y.index = G, r ? (G = Y.alternate, G !== null ? (G = G.index, G < V ? (Y.flags |= 2, V) : G) : (Y.flags |= 2, V)) : (Y.flags |= 1048576, V);
    }
    function _(Y) {
      return r && Y.alternate === null && (Y.flags |= 2), Y;
    }
    function N(Y, V, G, Te) {
      return V === null || V.tag !== 6 ? (V = Sp(G, Y.mode, Te), V.return = Y, V) : (V = m(V, G), V.return = Y, V);
    }
    function P(Y, V, G, Te) {
      var ot = G.type;
      return ot === pe ? Ce(Y, V, G.props.children, Te, G.key) : V !== null && (V.elementType === ot || typeof ot == "object" && ot !== null && ot.$$typeof === Ue && lh(ot) === V.type) ? (Te = m(V, G.props), Te.ref = Ko(Y, V, G), Te.return = Y, Te) : (Te = oc(G.type, G.key, G.props, null, Y.mode, Te), Te.ref = Ko(Y, V, G), Te.return = Y, Te);
    }
    function te(Y, V, G, Te) {
      return V === null || V.tag !== 4 || V.stateNode.containerInfo !== G.containerInfo || V.stateNode.implementation !== G.implementation ? (V = zf(G, Y.mode, Te), V.return = Y, V) : (V = m(V, G.children || []), V.return = Y, V);
    }
    function Ce(Y, V, G, Te, ot) {
      return V === null || V.tag !== 7 ? (V = Ql(G, Y.mode, Te, ot), V.return = Y, V) : (V = m(V, G), V.return = Y, V);
    }
    function De(Y, V, G) {
      if (typeof V == "string" && V !== "" || typeof V == "number") return V = Sp("" + V, Y.mode, G), V.return = Y, V;
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case q:
            return G = oc(V.type, V.key, V.props, null, Y.mode, G), G.ref = Ko(Y, null, V), G.return = Y, G;
          case re:
            return V = zf(V, Y.mode, G), V.return = Y, V;
          case Ue:
            var Te = V._init;
            return De(Y, Te(V._payload), G);
        }
        if (ln(V) || Ae(V)) return V = Ql(V, Y.mode, G, null), V.return = Y, V;
        Zc(Y, V);
      }
      return null;
    }
    function Ee(Y, V, G, Te) {
      var ot = V !== null ? V.key : null;
      if (typeof G == "string" && G !== "" || typeof G == "number") return ot !== null ? null : N(Y, V, "" + G, Te);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case q:
            return G.key === ot ? P(Y, V, G, Te) : null;
          case re:
            return G.key === ot ? te(Y, V, G, Te) : null;
          case Ue:
            return ot = G._init, Ee(
              Y,
              V,
              ot(G._payload),
              Te
            );
        }
        if (ln(G) || Ae(G)) return ot !== null ? null : Ce(Y, V, G, Te, null);
        Zc(Y, G);
      }
      return null;
    }
    function Ze(Y, V, G, Te, ot) {
      if (typeof Te == "string" && Te !== "" || typeof Te == "number") return Y = Y.get(G) || null, N(V, Y, "" + Te, ot);
      if (typeof Te == "object" && Te !== null) {
        switch (Te.$$typeof) {
          case q:
            return Y = Y.get(Te.key === null ? G : Te.key) || null, P(V, Y, Te, ot);
          case re:
            return Y = Y.get(Te.key === null ? G : Te.key) || null, te(V, Y, Te, ot);
          case Ue:
            var Mt = Te._init;
            return Ze(Y, V, G, Mt(Te._payload), ot);
        }
        if (ln(Te) || Ae(Te)) return Y = Y.get(G) || null, Ce(V, Y, Te, ot, null);
        Zc(V, Te);
      }
      return null;
    }
    function lt(Y, V, G, Te) {
      for (var ot = null, Mt = null, Dt = V, Pt = V = 0, oa = null; Dt !== null && Pt < G.length; Pt++) {
        Dt.index > Pt ? (oa = Dt, Dt = null) : oa = Dt.sibling;
        var Un = Ee(Y, Dt, G[Pt], Te);
        if (Un === null) {
          Dt === null && (Dt = oa);
          break;
        }
        r && Dt && Un.alternate === null && a(Y, Dt), V = S(Un, V, Pt), Mt === null ? ot = Un : Mt.sibling = Un, Mt = Un, Dt = oa;
      }
      if (Pt === G.length) return u(Y, Dt), Sr && Xo(Y, Pt), ot;
      if (Dt === null) {
        for (; Pt < G.length; Pt++) Dt = De(Y, G[Pt], Te), Dt !== null && (V = S(Dt, V, Pt), Mt === null ? ot = Dt : Mt.sibling = Dt, Mt = Dt);
        return Sr && Xo(Y, Pt), ot;
      }
      for (Dt = f(Y, Dt); Pt < G.length; Pt++) oa = Ze(Dt, Y, Pt, G[Pt], Te), oa !== null && (r && oa.alternate !== null && Dt.delete(oa.key === null ? Pt : oa.key), V = S(oa, V, Pt), Mt === null ? ot = oa : Mt.sibling = oa, Mt = oa);
      return r && Dt.forEach(function(ko) {
        return a(Y, ko);
      }), Sr && Xo(Y, Pt), ot;
    }
    function st(Y, V, G, Te) {
      var ot = Ae(G);
      if (typeof ot != "function") throw Error(s(150));
      if (G = ot.call(G), G == null) throw Error(s(151));
      for (var Mt = ot = null, Dt = V, Pt = V = 0, oa = null, Un = G.next(); Dt !== null && !Un.done; Pt++, Un = G.next()) {
        Dt.index > Pt ? (oa = Dt, Dt = null) : oa = Dt.sibling;
        var ko = Ee(Y, Dt, Un.value, Te);
        if (ko === null) {
          Dt === null && (Dt = oa);
          break;
        }
        r && Dt && ko.alternate === null && a(Y, Dt), V = S(ko, V, Pt), Mt === null ? ot = ko : Mt.sibling = ko, Mt = ko, Dt = oa;
      }
      if (Un.done) return u(
        Y,
        Dt
      ), Sr && Xo(Y, Pt), ot;
      if (Dt === null) {
        for (; !Un.done; Pt++, Un = G.next()) Un = De(Y, Un.value, Te), Un !== null && (V = S(Un, V, Pt), Mt === null ? ot = Un : Mt.sibling = Un, Mt = Un);
        return Sr && Xo(Y, Pt), ot;
      }
      for (Dt = f(Y, Dt); !Un.done; Pt++, Un = G.next()) Un = Ze(Dt, Y, Pt, Un.value, Te), Un !== null && (r && Un.alternate !== null && Dt.delete(Un.key === null ? Pt : Un.key), V = S(Un, V, Pt), Mt === null ? ot = Un : Mt.sibling = Un, Mt = Un);
      return r && Dt.forEach(function(Vh) {
        return a(Y, Vh);
      }), Sr && Xo(Y, Pt), ot;
    }
    function Ur(Y, V, G, Te) {
      if (typeof G == "object" && G !== null && G.type === pe && G.key === null && (G = G.props.children), typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case q:
            e: {
              for (var ot = G.key, Mt = V; Mt !== null; ) {
                if (Mt.key === ot) {
                  if (ot = G.type, ot === pe) {
                    if (Mt.tag === 7) {
                      u(Y, Mt.sibling), V = m(Mt, G.props.children), V.return = Y, Y = V;
                      break e;
                    }
                  } else if (Mt.elementType === ot || typeof ot == "object" && ot !== null && ot.$$typeof === Ue && lh(ot) === Mt.type) {
                    u(Y, Mt.sibling), V = m(Mt, G.props), V.ref = Ko(Y, Mt, G), V.return = Y, Y = V;
                    break e;
                  }
                  u(Y, Mt);
                  break;
                } else a(Y, Mt);
                Mt = Mt.sibling;
              }
              G.type === pe ? (V = Ql(G.props.children, Y.mode, Te, G.key), V.return = Y, Y = V) : (Te = oc(G.type, G.key, G.props, null, Y.mode, Te), Te.ref = Ko(Y, V, G), Te.return = Y, Y = Te);
            }
            return _(Y);
          case re:
            e: {
              for (Mt = G.key; V !== null; ) {
                if (V.key === Mt) if (V.tag === 4 && V.stateNode.containerInfo === G.containerInfo && V.stateNode.implementation === G.implementation) {
                  u(Y, V.sibling), V = m(V, G.children || []), V.return = Y, Y = V;
                  break e;
                } else {
                  u(Y, V);
                  break;
                }
                else a(Y, V);
                V = V.sibling;
              }
              V = zf(G, Y.mode, Te), V.return = Y, Y = V;
            }
            return _(Y);
          case Ue:
            return Mt = G._init, Ur(Y, V, Mt(G._payload), Te);
        }
        if (ln(G)) return lt(Y, V, G, Te);
        if (Ae(G)) return st(Y, V, G, Te);
        Zc(Y, G);
      }
      return typeof G == "string" && G !== "" || typeof G == "number" ? (G = "" + G, V !== null && V.tag === 6 ? (u(Y, V.sibling), V = m(V, G), V.return = Y, Y = V) : (u(Y, V), V = Sp(G, Y.mode, Te), V.return = Y, Y = V), _(Y)) : u(Y, V);
    }
    return Ur;
  }
  var zr = Zo(!0), We = Zo(!1), Si = Ni(null), ri = null, $u = null, Id = null;
  function Bd() {
    Id = $u = ri = null;
  }
  function qd(r) {
    var a = Si.current;
    fr(Si), r._currentValue = a;
  }
  function Yd(r, a, u) {
    for (; r !== null; ) {
      var f = r.alternate;
      if ((r.childLanes & a) !== a ? (r.childLanes |= a, f !== null && (f.childLanes |= a)) : f !== null && (f.childLanes & a) !== a && (f.childLanes |= a), r === u) break;
      r = r.return;
    }
  }
  function wr(r, a) {
    ri = r, Id = $u = null, r = r.dependencies, r !== null && r.firstContext !== null && ((r.lanes & a) !== 0 && (Br = !0), r.firstContext = null);
  }
  function Fi(r) {
    var a = r._currentValue;
    if (Id !== r) if (r = { context: r, memoizedValue: a, next: null }, $u === null) {
      if (ri === null) throw Error(s(308));
      $u = r, ri.dependencies = { lanes: 0, firstContext: r };
    } else $u = $u.next = r;
    return a;
  }
  var Jo = null;
  function Wd(r) {
    Jo === null ? Jo = [r] : Jo.push(r);
  }
  function Qd(r, a, u, f) {
    var m = a.interleaved;
    return m === null ? (u.next = u, Wd(a)) : (u.next = m.next, m.next = u), a.interleaved = u, xi(r, f);
  }
  function xi(r, a) {
    r.lanes |= a;
    var u = r.alternate;
    for (u !== null && (u.lanes |= a), u = r, r = r.return; r !== null; ) r.childLanes |= a, u = r.alternate, u !== null && (u.childLanes |= a), u = r, r = r.return;
    return u.tag === 3 ? u.stateNode : null;
  }
  var Ei = !1;
  function Gd(r) {
    r.updateQueue = { baseState: r.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function oh(r, a) {
    r = r.updateQueue, a.updateQueue === r && (a.updateQueue = { baseState: r.baseState, firstBaseUpdate: r.firstBaseUpdate, lastBaseUpdate: r.lastBaseUpdate, shared: r.shared, effects: r.effects });
  }
  function Il(r, a) {
    return { eventTime: r, lane: a, tag: 0, payload: null, callback: null, next: null };
  }
  function So(r, a, u) {
    var f = r.updateQueue;
    if (f === null) return null;
    if (f = f.shared, (Mn & 2) !== 0) {
      var m = f.pending;
      return m === null ? a.next = a : (a.next = m.next, m.next = a), f.pending = a, xi(r, u);
    }
    return m = f.interleaved, m === null ? (a.next = a, Wd(f)) : (a.next = m.next, m.next = a), f.interleaved = a, xi(r, u);
  }
  function Jc(r, a, u) {
    if (a = a.updateQueue, a !== null && (a = a.shared, (u & 4194240) !== 0)) {
      var f = a.lanes;
      f &= r.pendingLanes, u |= f, a.lanes = u, _r(r, u);
    }
  }
  function uh(r, a) {
    var u = r.updateQueue, f = r.alternate;
    if (f !== null && (f = f.updateQueue, u === f)) {
      var m = null, S = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var _ = { eventTime: u.eventTime, lane: u.lane, tag: u.tag, payload: u.payload, callback: u.callback, next: null };
          S === null ? m = S = _ : S = S.next = _, u = u.next;
        } while (u !== null);
        S === null ? m = S = a : S = S.next = a;
      } else m = S = a;
      u = { baseState: f.baseState, firstBaseUpdate: m, lastBaseUpdate: S, shared: f.shared, effects: f.effects }, r.updateQueue = u;
      return;
    }
    r = u.lastBaseUpdate, r === null ? u.firstBaseUpdate = a : r.next = a, u.lastBaseUpdate = a;
  }
  function zs(r, a, u, f) {
    var m = r.updateQueue;
    Ei = !1;
    var S = m.firstBaseUpdate, _ = m.lastBaseUpdate, N = m.shared.pending;
    if (N !== null) {
      m.shared.pending = null;
      var P = N, te = P.next;
      P.next = null, _ === null ? S = te : _.next = te, _ = P;
      var Ce = r.alternate;
      Ce !== null && (Ce = Ce.updateQueue, N = Ce.lastBaseUpdate, N !== _ && (N === null ? Ce.firstBaseUpdate = te : N.next = te, Ce.lastBaseUpdate = P));
    }
    if (S !== null) {
      var De = m.baseState;
      _ = 0, Ce = te = P = null, N = S;
      do {
        var Ee = N.lane, Ze = N.eventTime;
        if ((f & Ee) === Ee) {
          Ce !== null && (Ce = Ce.next = {
            eventTime: Ze,
            lane: 0,
            tag: N.tag,
            payload: N.payload,
            callback: N.callback,
            next: null
          });
          e: {
            var lt = r, st = N;
            switch (Ee = a, Ze = u, st.tag) {
              case 1:
                if (lt = st.payload, typeof lt == "function") {
                  De = lt.call(Ze, De, Ee);
                  break e;
                }
                De = lt;
                break e;
              case 3:
                lt.flags = lt.flags & -65537 | 128;
              case 0:
                if (lt = st.payload, Ee = typeof lt == "function" ? lt.call(Ze, De, Ee) : lt, Ee == null) break e;
                De = ae({}, De, Ee);
                break e;
              case 2:
                Ei = !0;
            }
          }
          N.callback !== null && N.lane !== 0 && (r.flags |= 64, Ee = m.effects, Ee === null ? m.effects = [N] : Ee.push(N));
        } else Ze = { eventTime: Ze, lane: Ee, tag: N.tag, payload: N.payload, callback: N.callback, next: null }, Ce === null ? (te = Ce = Ze, P = De) : Ce = Ce.next = Ze, _ |= Ee;
        if (N = N.next, N === null) {
          if (N = m.shared.pending, N === null) break;
          Ee = N, N = Ee.next, Ee.next = null, m.lastBaseUpdate = Ee, m.shared.pending = null;
        }
      } while (!0);
      if (Ce === null && (P = De), m.baseState = P, m.firstBaseUpdate = te, m.lastBaseUpdate = Ce, a = m.shared.interleaved, a !== null) {
        m = a;
        do
          _ |= m.lane, m = m.next;
        while (m !== a);
      } else S === null && (m.shared.lanes = 0);
      El |= _, r.lanes = _, r.memoizedState = De;
    }
  }
  function Xd(r, a, u) {
    if (r = a.effects, a.effects = null, r !== null) for (a = 0; a < r.length; a++) {
      var f = r[a], m = f.callback;
      if (m !== null) {
        if (f.callback = null, f = u, typeof m != "function") throw Error(s(191, m));
        m.call(f);
      }
    }
  }
  var Ls = {}, yl = Ni(Ls), As = Ni(Ls), Ns = Ni(Ls);
  function eu(r) {
    if (r === Ls) throw Error(s(174));
    return r;
  }
  function Kd(r, a) {
    switch (yt(Ns, a), yt(As, r), yt(yl, Ls), r = a.nodeType, r) {
      case 9:
      case 11:
        a = (a = a.documentElement) ? a.namespaceURI : Vn(null, "");
        break;
      default:
        r = r === 8 ? a.parentNode : a, a = r.namespaceURI || null, r = r.tagName, a = Vn(a, r);
    }
    fr(yl), yt(yl, a);
  }
  function tu() {
    fr(yl), fr(As), fr(Ns);
  }
  function sh(r) {
    eu(Ns.current);
    var a = eu(yl.current), u = Vn(a, r.type);
    a !== u && (yt(As, r), yt(yl, u));
  }
  function ef(r) {
    As.current === r && (fr(yl), fr(As));
  }
  var Rr = Ni(0);
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
  var Us = [];
  function Et() {
    for (var r = 0; r < Us.length; r++) Us[r]._workInProgressVersionPrimary = null;
    Us.length = 0;
  }
  var cn = ee.ReactCurrentDispatcher, An = ee.ReactCurrentBatchConfig, nr = 0, Nn = null, Ir = null, ia = null, nf = !1, js = !1, nu = 0, xe = 0;
  function Ln() {
    throw Error(s(321));
  }
  function Ut(r, a) {
    if (a === null) return !1;
    for (var u = 0; u < a.length && u < r.length; u++) if (!Xi(r[u], a[u])) return !1;
    return !0;
  }
  function xo(r, a, u, f, m, S) {
    if (nr = S, Nn = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, cn.current = r === null || r.memoizedState === null ? gf : Is, r = u(f, m), js) {
      S = 0;
      do {
        if (js = !1, nu = 0, 25 <= S) throw Error(s(301));
        S += 1, ia = Ir = null, a.updateQueue = null, cn.current = Sf, r = u(f, m);
      } while (js);
    }
    if (cn.current = ou, a = Ir !== null && Ir.next !== null, nr = 0, ia = Ir = Nn = null, nf = !1, a) throw Error(s(300));
    return r;
  }
  function Zi() {
    var r = nu !== 0;
    return nu = 0, r;
  }
  function Oa() {
    var r = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ia === null ? Nn.memoizedState = ia = r : ia = ia.next = r, ia;
  }
  function Lr() {
    if (Ir === null) {
      var r = Nn.alternate;
      r = r !== null ? r.memoizedState : null;
    } else r = Ir.next;
    var a = ia === null ? Nn.memoizedState : ia.next;
    if (a !== null) ia = a, Ir = r;
    else {
      if (r === null) throw Error(s(310));
      Ir = r, r = { memoizedState: Ir.memoizedState, baseState: Ir.baseState, baseQueue: Ir.baseQueue, queue: Ir.queue, next: null }, ia === null ? Nn.memoizedState = ia = r : ia = ia.next = r;
    }
    return ia;
  }
  function Bl(r, a) {
    return typeof a == "function" ? a(r) : a;
  }
  function Eo(r) {
    var a = Lr(), u = a.queue;
    if (u === null) throw Error(s(311));
    u.lastRenderedReducer = r;
    var f = Ir, m = f.baseQueue, S = u.pending;
    if (S !== null) {
      if (m !== null) {
        var _ = m.next;
        m.next = S.next, S.next = _;
      }
      f.baseQueue = m = S, u.pending = null;
    }
    if (m !== null) {
      S = m.next, f = f.baseState;
      var N = _ = null, P = null, te = S;
      do {
        var Ce = te.lane;
        if ((nr & Ce) === Ce) P !== null && (P = P.next = { lane: 0, action: te.action, hasEagerState: te.hasEagerState, eagerState: te.eagerState, next: null }), f = te.hasEagerState ? te.eagerState : r(f, te.action);
        else {
          var De = {
            lane: Ce,
            action: te.action,
            hasEagerState: te.hasEagerState,
            eagerState: te.eagerState,
            next: null
          };
          P === null ? (N = P = De, _ = f) : P = P.next = De, Nn.lanes |= Ce, El |= Ce;
        }
        te = te.next;
      } while (te !== null && te !== S);
      P === null ? _ = f : P.next = N, Xi(f, a.memoizedState) || (Br = !0), a.memoizedState = f, a.baseState = _, a.baseQueue = P, u.lastRenderedState = f;
    }
    if (r = u.interleaved, r !== null) {
      m = r;
      do
        S = m.lane, Nn.lanes |= S, El |= S, m = m.next;
      while (m !== r);
    } else m === null && (u.lanes = 0);
    return [a.memoizedState, u.dispatch];
  }
  function ru(r) {
    var a = Lr(), u = a.queue;
    if (u === null) throw Error(s(311));
    u.lastRenderedReducer = r;
    var f = u.dispatch, m = u.pending, S = a.memoizedState;
    if (m !== null) {
      u.pending = null;
      var _ = m = m.next;
      do
        S = r(S, _.action), _ = _.next;
      while (_ !== m);
      Xi(S, a.memoizedState) || (Br = !0), a.memoizedState = S, a.baseQueue === null && (a.baseState = S), u.lastRenderedState = S;
    }
    return [S, f];
  }
  function rf() {
  }
  function af(r, a) {
    var u = Nn, f = Lr(), m = a(), S = !Xi(f.memoizedState, m);
    if (S && (f.memoizedState = m, Br = !0), f = f.queue, Fs(uf.bind(null, u, f, r), [r]), f.getSnapshot !== a || S || ia !== null && ia.memoizedState.tag & 1) {
      if (u.flags |= 2048, au(9, of.bind(null, u, f, m, a), void 0, null), ea === null) throw Error(s(349));
      (nr & 30) !== 0 || lf(u, a, m);
    }
    return m;
  }
  function lf(r, a, u) {
    r.flags |= 16384, r = { getSnapshot: a, value: u }, a = Nn.updateQueue, a === null ? (a = { lastEffect: null, stores: null }, Nn.updateQueue = a, a.stores = [r]) : (u = a.stores, u === null ? a.stores = [r] : u.push(r));
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
      return !Xi(r, u);
    } catch {
      return !0;
    }
  }
  function cf(r) {
    var a = xi(r, 1);
    a !== null && Fa(a, r, 1, -1);
  }
  function ff(r) {
    var a = Oa();
    return typeof r == "function" && (r = r()), a.memoizedState = a.baseState = r, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Bl, lastRenderedState: r }, a.queue = r, r = r.dispatch = lu.bind(null, Nn, r), [a.memoizedState, r];
  }
  function au(r, a, u, f) {
    return r = { tag: r, create: a, destroy: u, deps: f, next: null }, a = Nn.updateQueue, a === null ? (a = { lastEffect: null, stores: null }, Nn.updateQueue = a, a.lastEffect = r.next = r) : (u = a.lastEffect, u === null ? a.lastEffect = r.next = r : (f = u.next, u.next = r, r.next = f, a.lastEffect = r)), r;
  }
  function df() {
    return Lr().memoizedState;
  }
  function Vu(r, a, u, f) {
    var m = Oa();
    Nn.flags |= r, m.memoizedState = au(1 | a, u, void 0, f === void 0 ? null : f);
  }
  function Iu(r, a, u, f) {
    var m = Lr();
    f = f === void 0 ? null : f;
    var S = void 0;
    if (Ir !== null) {
      var _ = Ir.memoizedState;
      if (S = _.destroy, f !== null && Ut(f, _.deps)) {
        m.memoizedState = au(a, u, S, f);
        return;
      }
    }
    Nn.flags |= r, m.memoizedState = au(1 | a, u, S, f);
  }
  function pf(r, a) {
    return Vu(8390656, 8, r, a);
  }
  function Fs(r, a) {
    return Iu(2048, 8, r, a);
  }
  function vf(r, a) {
    return Iu(4, 2, r, a);
  }
  function Ps(r, a) {
    return Iu(4, 4, r, a);
  }
  function iu(r, a) {
    if (typeof a == "function") return r = r(), a(r), function() {
      a(null);
    };
    if (a != null) return r = r(), a.current = r, function() {
      a.current = null;
    };
  }
  function hf(r, a, u) {
    return u = u != null ? u.concat([r]) : null, Iu(4, 4, iu.bind(null, a, r), u);
  }
  function Hs() {
  }
  function mf(r, a) {
    var u = Lr();
    a = a === void 0 ? null : a;
    var f = u.memoizedState;
    return f !== null && a !== null && Ut(a, f[1]) ? f[0] : (u.memoizedState = [r, a], r);
  }
  function yf(r, a) {
    var u = Lr();
    a = a === void 0 ? null : a;
    var f = u.memoizedState;
    return f !== null && a !== null && Ut(a, f[1]) ? f[0] : (r = r(), u.memoizedState = [r, a], r);
  }
  function Zd(r, a, u) {
    return (nr & 21) === 0 ? (r.baseState && (r.baseState = !1, Br = !0), r.memoizedState = u) : (Xi(u, a) || (u = hi(), Nn.lanes |= u, El |= u, r.baseState = !0), a);
  }
  function $s(r, a) {
    var u = Qt;
    Qt = u !== 0 && 4 > u ? u : 4, r(!0);
    var f = An.transition;
    An.transition = {};
    try {
      r(!1), a();
    } finally {
      Qt = u, An.transition = f;
    }
  }
  function Jd() {
    return Lr().memoizedState;
  }
  function Vs(r, a, u) {
    var f = Cl(r);
    if (u = { lane: f, action: u, hasEagerState: !1, eagerState: null, next: null }, ai(r)) ch(a, u);
    else if (u = Qd(r, a, u, f), u !== null) {
      var m = Wr();
      Fa(u, r, f, m), ur(u, a, f);
    }
  }
  function lu(r, a, u) {
    var f = Cl(r), m = { lane: f, action: u, hasEagerState: !1, eagerState: null, next: null };
    if (ai(r)) ch(a, m);
    else {
      var S = r.alternate;
      if (r.lanes === 0 && (S === null || S.lanes === 0) && (S = a.lastRenderedReducer, S !== null)) try {
        var _ = a.lastRenderedState, N = S(_, u);
        if (m.hasEagerState = !0, m.eagerState = N, Xi(N, _)) {
          var P = a.interleaved;
          P === null ? (m.next = m, Wd(a)) : (m.next = P.next, P.next = m), a.interleaved = m;
          return;
        }
      } catch {
      }
      u = Qd(r, a, m, f), u !== null && (m = Wr(), Fa(u, r, f, m), ur(u, a, f));
    }
  }
  function ai(r) {
    var a = r.alternate;
    return r === Nn || a !== null && a === Nn;
  }
  function ch(r, a) {
    js = nf = !0;
    var u = r.pending;
    u === null ? a.next = a : (a.next = u.next, u.next = a), r.pending = a;
  }
  function ur(r, a, u) {
    if ((u & 4194240) !== 0) {
      var f = a.lanes;
      f &= r.pendingLanes, u |= f, a.lanes = u, _r(r, u);
    }
  }
  var ou = { readContext: Fi, useCallback: Ln, useContext: Ln, useEffect: Ln, useImperativeHandle: Ln, useInsertionEffect: Ln, useLayoutEffect: Ln, useMemo: Ln, useReducer: Ln, useRef: Ln, useState: Ln, useDebugValue: Ln, useDeferredValue: Ln, useTransition: Ln, useMutableSource: Ln, useSyncExternalStore: Ln, useId: Ln, unstable_isNewReconciler: !1 }, gf = { readContext: Fi, useCallback: function(r, a) {
    return Oa().memoizedState = [r, a === void 0 ? null : a], r;
  }, useContext: Fi, useEffect: pf, useImperativeHandle: function(r, a, u) {
    return u = u != null ? u.concat([r]) : null, Vu(
      4194308,
      4,
      iu.bind(null, a, r),
      u
    );
  }, useLayoutEffect: function(r, a) {
    return Vu(4194308, 4, r, a);
  }, useInsertionEffect: function(r, a) {
    return Vu(4, 2, r, a);
  }, useMemo: function(r, a) {
    var u = Oa();
    return a = a === void 0 ? null : a, r = r(), u.memoizedState = [r, a], r;
  }, useReducer: function(r, a, u) {
    var f = Oa();
    return a = u !== void 0 ? u(a) : a, f.memoizedState = f.baseState = a, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: r, lastRenderedState: a }, f.queue = r, r = r.dispatch = Vs.bind(null, Nn, r), [f.memoizedState, r];
  }, useRef: function(r) {
    var a = Oa();
    return r = { current: r }, a.memoizedState = r;
  }, useState: ff, useDebugValue: Hs, useDeferredValue: function(r) {
    return Oa().memoizedState = r;
  }, useTransition: function() {
    var r = ff(!1), a = r[0];
    return r = $s.bind(null, r[1]), Oa().memoizedState = r, [a, r];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(r, a, u) {
    var f = Nn, m = Oa();
    if (Sr) {
      if (u === void 0) throw Error(s(407));
      u = u();
    } else {
      if (u = a(), ea === null) throw Error(s(349));
      (nr & 30) !== 0 || lf(f, a, u);
    }
    m.memoizedState = u;
    var S = { value: u, getSnapshot: a };
    return m.queue = S, pf(uf.bind(
      null,
      f,
      S,
      r
    ), [r]), f.flags |= 2048, au(9, of.bind(null, f, S, u, a), void 0, null), u;
  }, useId: function() {
    var r = Oa(), a = ea.identifierPrefix;
    if (Sr) {
      var u = ml, f = hl;
      u = (f & ~(1 << 32 - Mr(f) - 1)).toString(32) + u, a = ":" + a + "R" + u, u = nu++, 0 < u && (a += "H" + u.toString(32)), a += ":";
    } else u = xe++, a = ":" + a + "r" + u.toString(32) + ":";
    return r.memoizedState = a;
  }, unstable_isNewReconciler: !1 }, Is = {
    readContext: Fi,
    useCallback: mf,
    useContext: Fi,
    useEffect: Fs,
    useImperativeHandle: hf,
    useInsertionEffect: vf,
    useLayoutEffect: Ps,
    useMemo: yf,
    useReducer: Eo,
    useRef: df,
    useState: function() {
      return Eo(Bl);
    },
    useDebugValue: Hs,
    useDeferredValue: function(r) {
      var a = Lr();
      return Zd(a, Ir.memoizedState, r);
    },
    useTransition: function() {
      var r = Eo(Bl)[0], a = Lr().memoizedState;
      return [r, a];
    },
    useMutableSource: rf,
    useSyncExternalStore: af,
    useId: Jd,
    unstable_isNewReconciler: !1
  }, Sf = { readContext: Fi, useCallback: mf, useContext: Fi, useEffect: Fs, useImperativeHandle: hf, useInsertionEffect: vf, useLayoutEffect: Ps, useMemo: yf, useReducer: ru, useRef: df, useState: function() {
    return ru(Bl);
  }, useDebugValue: Hs, useDeferredValue: function(r) {
    var a = Lr();
    return Ir === null ? a.memoizedState = r : Zd(a, Ir.memoizedState, r);
  }, useTransition: function() {
    var r = ru(Bl)[0], a = Lr().memoizedState;
    return [r, a];
  }, useMutableSource: rf, useSyncExternalStore: af, useId: Jd, unstable_isNewReconciler: !1 };
  function Ji(r, a) {
    if (r && r.defaultProps) {
      a = ae({}, a), r = r.defaultProps;
      for (var u in r) a[u] === void 0 && (a[u] = r[u]);
      return a;
    }
    return a;
  }
  function ep(r, a, u, f) {
    a = r.memoizedState, u = u(f, a), u = u == null ? a : ae({}, a, u), r.memoizedState = u, r.lanes === 0 && (r.updateQueue.baseState = u);
  }
  var xf = { isMounted: function(r) {
    return (r = r._reactInternals) ? Ne(r) === r : !1;
  }, enqueueSetState: function(r, a, u) {
    r = r._reactInternals;
    var f = Wr(), m = Cl(r), S = Il(f, m);
    S.payload = a, u != null && (S.callback = u), a = So(r, S, m), a !== null && (Fa(a, r, m, f), Jc(a, r, m));
  }, enqueueReplaceState: function(r, a, u) {
    r = r._reactInternals;
    var f = Wr(), m = Cl(r), S = Il(f, m);
    S.tag = 1, S.payload = a, u != null && (S.callback = u), a = So(r, S, m), a !== null && (Fa(a, r, m, f), Jc(a, r, m));
  }, enqueueForceUpdate: function(r, a) {
    r = r._reactInternals;
    var u = Wr(), f = Cl(r), m = Il(u, f);
    m.tag = 2, a != null && (m.callback = a), a = So(r, m, f), a !== null && (Fa(a, r, f, u), Jc(a, r, f));
  } };
  function fh(r, a, u, f, m, S, _) {
    return r = r.stateNode, typeof r.shouldComponentUpdate == "function" ? r.shouldComponentUpdate(f, S, _) : a.prototype && a.prototype.isPureReactComponent ? !Cs(u, f) || !Cs(m, S) : !0;
  }
  function Ef(r, a, u) {
    var f = !1, m = Da, S = a.contextType;
    return typeof S == "object" && S !== null ? S = Fi(S) : (m = $r(a) ? Ja : kr.current, f = a.contextTypes, S = (f = f != null) ? ei(r, m) : Da), a = new a(u, S), r.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = xf, r.stateNode = a, a._reactInternals = r, f && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = m, r.__reactInternalMemoizedMaskedChildContext = S), a;
  }
  function dh(r, a, u, f) {
    r = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(u, f), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(u, f), a.state !== r && xf.enqueueReplaceState(a, a.state, null);
  }
  function Bs(r, a, u, f) {
    var m = r.stateNode;
    m.props = u, m.state = r.memoizedState, m.refs = {}, Gd(r);
    var S = a.contextType;
    typeof S == "object" && S !== null ? m.context = Fi(S) : (S = $r(a) ? Ja : kr.current, m.context = ei(r, S)), m.state = r.memoizedState, S = a.getDerivedStateFromProps, typeof S == "function" && (ep(r, a, S, u), m.state = r.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof m.getSnapshotBeforeUpdate == "function" || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (a = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), a !== m.state && xf.enqueueReplaceState(m, m.state, null), zs(r, u, m, f), m.state = r.memoizedState), typeof m.componentDidMount == "function" && (r.flags |= 4194308);
  }
  function uu(r, a) {
    try {
      var u = "", f = a;
      do
        u += Pe(f), f = f.return;
      while (f);
      var m = u;
    } catch (S) {
      m = `
Error generating stack: ` + S.message + `
` + S.stack;
    }
    return { value: r, source: a, stack: m, digest: null };
  }
  function tp(r, a, u) {
    return { value: r, source: null, stack: u ?? null, digest: a ?? null };
  }
  function np(r, a) {
    try {
      console.error(a.value);
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  var Cf = typeof WeakMap == "function" ? WeakMap : Map;
  function ph(r, a, u) {
    u = Il(-1, u), u.tag = 3, u.payload = { element: null };
    var f = a.value;
    return u.callback = function() {
      Gu || (Gu = !0, fu = f), np(r, a);
    }, u;
  }
  function rp(r, a, u) {
    u = Il(-1, u), u.tag = 3;
    var f = r.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var m = a.value;
      u.payload = function() {
        return f(m);
      }, u.callback = function() {
        np(r, a);
      };
    }
    var S = r.stateNode;
    return S !== null && typeof S.componentDidCatch == "function" && (u.callback = function() {
      np(r, a), typeof f != "function" && (wo === null ? wo = /* @__PURE__ */ new Set([this]) : wo.add(this));
      var _ = a.stack;
      this.componentDidCatch(a.value, { componentStack: _ !== null ? _ : "" });
    }), u;
  }
  function ap(r, a, u) {
    var f = r.pingCache;
    if (f === null) {
      f = r.pingCache = new Cf();
      var m = /* @__PURE__ */ new Set();
      f.set(a, m);
    } else m = f.get(a), m === void 0 && (m = /* @__PURE__ */ new Set(), f.set(a, m));
    m.has(u) || (m.add(u), r = t0.bind(null, r, a, u), a.then(r, r));
  }
  function vh(r) {
    do {
      var a;
      if ((a = r.tag === 13) && (a = r.memoizedState, a = a !== null ? a.dehydrated !== null : !0), a) return r;
      r = r.return;
    } while (r !== null);
    return null;
  }
  function Co(r, a, u, f, m) {
    return (r.mode & 1) === 0 ? (r === a ? r.flags |= 65536 : (r.flags |= 128, u.flags |= 131072, u.flags &= -52805, u.tag === 1 && (u.alternate === null ? u.tag = 17 : (a = Il(-1, 1), a.tag = 2, So(u, a, 1))), u.lanes |= 1), r) : (r.flags |= 65536, r.lanes = m, r);
  }
  var qs = ee.ReactCurrentOwner, Br = !1;
  function ha(r, a, u, f) {
    a.child = r === null ? We(a, null, u, f) : zr(a, r.child, u, f);
  }
  function ii(r, a, u, f, m) {
    u = u.render;
    var S = a.ref;
    return wr(a, m), f = xo(r, a, u, f, S, m), u = Zi(), r !== null && !Br ? (a.updateQueue = r.updateQueue, a.flags &= -2053, r.lanes &= ~m, Hi(r, a, m)) : (Sr && u && Gc(a), a.flags |= 1, ha(r, a, f, m), a.child);
  }
  function su(r, a, u, f, m) {
    if (r === null) {
      var S = u.type;
      return typeof S == "function" && !gp(S) && S.defaultProps === void 0 && u.compare === null && u.defaultProps === void 0 ? (a.tag = 15, a.type = S, en(r, a, S, f, m)) : (r = oc(u.type, null, f, a, a.mode, m), r.ref = a.ref, r.return = a, a.child = r);
    }
    if (S = r.child, (r.lanes & m) === 0) {
      var _ = S.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Cs, u(_, f) && r.ref === a.ref) return Hi(r, a, m);
    }
    return a.flags |= 1, r = bo(S, f), r.ref = a.ref, r.return = a, a.child = r;
  }
  function en(r, a, u, f, m) {
    if (r !== null) {
      var S = r.memoizedProps;
      if (Cs(S, f) && r.ref === a.ref) if (Br = !1, a.pendingProps = f = S, (r.lanes & m) !== 0) (r.flags & 131072) !== 0 && (Br = !0);
      else return a.lanes = r.lanes, Hi(r, a, m);
    }
    return hh(r, a, u, f, m);
  }
  function Ys(r, a, u) {
    var f = a.pendingProps, m = f.children, S = r !== null ? r.memoizedState : null;
    if (f.mode === "hidden") if ((a.mode & 1) === 0) a.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, yt(Yu, Ci), Ci |= u;
    else {
      if ((u & 1073741824) === 0) return r = S !== null ? S.baseLanes | u : u, a.lanes = a.childLanes = 1073741824, a.memoizedState = { baseLanes: r, cachePool: null, transitions: null }, a.updateQueue = null, yt(Yu, Ci), Ci |= r, null;
      a.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, f = S !== null ? S.baseLanes : u, yt(Yu, Ci), Ci |= f;
    }
    else S !== null ? (f = S.baseLanes | u, a.memoizedState = null) : f = u, yt(Yu, Ci), Ci |= f;
    return ha(r, a, m, u), a.child;
  }
  function ip(r, a) {
    var u = a.ref;
    (r === null && u !== null || r !== null && r.ref !== u) && (a.flags |= 512, a.flags |= 2097152);
  }
  function hh(r, a, u, f, m) {
    var S = $r(u) ? Ja : kr.current;
    return S = ei(a, S), wr(a, m), u = xo(r, a, u, f, S, m), f = Zi(), r !== null && !Br ? (a.updateQueue = r.updateQueue, a.flags &= -2053, r.lanes &= ~m, Hi(r, a, m)) : (Sr && f && Gc(a), a.flags |= 1, ha(r, a, u, m), a.child);
  }
  function mh(r, a, u, f, m) {
    if ($r(u)) {
      var S = !0;
      aa(a);
    } else S = !1;
    if (wr(a, m), a.stateNode === null) Pi(r, a), Ef(a, u, f), Bs(a, u, f, m), f = !0;
    else if (r === null) {
      var _ = a.stateNode, N = a.memoizedProps;
      _.props = N;
      var P = _.context, te = u.contextType;
      typeof te == "object" && te !== null ? te = Fi(te) : (te = $r(u) ? Ja : kr.current, te = ei(a, te));
      var Ce = u.getDerivedStateFromProps, De = typeof Ce == "function" || typeof _.getSnapshotBeforeUpdate == "function";
      De || typeof _.UNSAFE_componentWillReceiveProps != "function" && typeof _.componentWillReceiveProps != "function" || (N !== f || P !== te) && dh(a, _, f, te), Ei = !1;
      var Ee = a.memoizedState;
      _.state = Ee, zs(a, f, _, m), P = a.memoizedState, N !== f || Ee !== P || Zr.current || Ei ? (typeof Ce == "function" && (ep(a, u, Ce, f), P = a.memoizedState), (N = Ei || fh(a, u, N, f, Ee, P, te)) ? (De || typeof _.UNSAFE_componentWillMount != "function" && typeof _.componentWillMount != "function" || (typeof _.componentWillMount == "function" && _.componentWillMount(), typeof _.UNSAFE_componentWillMount == "function" && _.UNSAFE_componentWillMount()), typeof _.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof _.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = f, a.memoizedState = P), _.props = f, _.state = P, _.context = te, f = N) : (typeof _.componentDidMount == "function" && (a.flags |= 4194308), f = !1);
    } else {
      _ = a.stateNode, oh(r, a), N = a.memoizedProps, te = a.type === a.elementType ? N : Ji(a.type, N), _.props = te, De = a.pendingProps, Ee = _.context, P = u.contextType, typeof P == "object" && P !== null ? P = Fi(P) : (P = $r(u) ? Ja : kr.current, P = ei(a, P));
      var Ze = u.getDerivedStateFromProps;
      (Ce = typeof Ze == "function" || typeof _.getSnapshotBeforeUpdate == "function") || typeof _.UNSAFE_componentWillReceiveProps != "function" && typeof _.componentWillReceiveProps != "function" || (N !== De || Ee !== P) && dh(a, _, f, P), Ei = !1, Ee = a.memoizedState, _.state = Ee, zs(a, f, _, m);
      var lt = a.memoizedState;
      N !== De || Ee !== lt || Zr.current || Ei ? (typeof Ze == "function" && (ep(a, u, Ze, f), lt = a.memoizedState), (te = Ei || fh(a, u, te, f, Ee, lt, P) || !1) ? (Ce || typeof _.UNSAFE_componentWillUpdate != "function" && typeof _.componentWillUpdate != "function" || (typeof _.componentWillUpdate == "function" && _.componentWillUpdate(f, lt, P), typeof _.UNSAFE_componentWillUpdate == "function" && _.UNSAFE_componentWillUpdate(f, lt, P)), typeof _.componentDidUpdate == "function" && (a.flags |= 4), typeof _.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof _.componentDidUpdate != "function" || N === r.memoizedProps && Ee === r.memoizedState || (a.flags |= 4), typeof _.getSnapshotBeforeUpdate != "function" || N === r.memoizedProps && Ee === r.memoizedState || (a.flags |= 1024), a.memoizedProps = f, a.memoizedState = lt), _.props = f, _.state = lt, _.context = P, f = te) : (typeof _.componentDidUpdate != "function" || N === r.memoizedProps && Ee === r.memoizedState || (a.flags |= 4), typeof _.getSnapshotBeforeUpdate != "function" || N === r.memoizedProps && Ee === r.memoizedState || (a.flags |= 1024), f = !1);
    }
    return Ws(r, a, u, f, S, m);
  }
  function Ws(r, a, u, f, m, S) {
    ip(r, a);
    var _ = (a.flags & 128) !== 0;
    if (!f && !_) return m && Wc(a, u, !1), Hi(r, a, S);
    f = a.stateNode, qs.current = a;
    var N = _ && typeof u.getDerivedStateFromError != "function" ? null : f.render();
    return a.flags |= 1, r !== null && _ ? (a.child = zr(a, r.child, null, S), a.child = zr(a, null, N, S)) : ha(r, a, N, S), a.memoizedState = f.state, m && Wc(a, u, !0), a.child;
  }
  function Bu(r) {
    var a = r.stateNode;
    a.pendingContext ? rh(r, a.pendingContext, a.pendingContext !== a.context) : a.context && rh(r, a.context, !1), Kd(r, a.containerInfo);
  }
  function yh(r, a, u, f, m) {
    return go(), Vl(m), a.flags |= 256, ha(r, a, u, f), a.child;
  }
  var Tf = { dehydrated: null, treeContext: null, retryLane: 0 };
  function lp(r) {
    return { baseLanes: r, cachePool: null, transitions: null };
  }
  function wf(r, a, u) {
    var f = a.pendingProps, m = Rr.current, S = !1, _ = (a.flags & 128) !== 0, N;
    if ((N = _) || (N = r !== null && r.memoizedState === null ? !1 : (m & 2) !== 0), N ? (S = !0, a.flags &= -129) : (r === null || r.memoizedState !== null) && (m |= 1), yt(Rr, m & 1), r === null)
      return Vd(a), r = a.memoizedState, r !== null && (r = r.dehydrated, r !== null) ? ((a.mode & 1) === 0 ? a.lanes = 1 : r.data === "$!" ? a.lanes = 8 : a.lanes = 1073741824, null) : (_ = f.children, r = f.fallback, S ? (f = a.mode, S = a.child, _ = { mode: "hidden", children: _ }, (f & 1) === 0 && S !== null ? (S.childLanes = 0, S.pendingProps = _) : S = Mo(_, f, 0, null), r = Ql(r, f, u, null), S.return = a, r.return = a, S.sibling = r, a.child = S, a.child.memoizedState = lp(u), a.memoizedState = Tf, r) : op(a, _));
    if (m = r.memoizedState, m !== null && (N = m.dehydrated, N !== null)) return gh(r, a, _, f, N, m, u);
    if (S) {
      S = f.fallback, _ = a.mode, m = r.child, N = m.sibling;
      var P = { mode: "hidden", children: f.children };
      return (_ & 1) === 0 && a.child !== m ? (f = a.child, f.childLanes = 0, f.pendingProps = P, a.deletions = null) : (f = bo(m, P), f.subtreeFlags = m.subtreeFlags & 14680064), N !== null ? S = bo(N, S) : (S = Ql(S, _, u, null), S.flags |= 2), S.return = a, f.return = a, f.sibling = S, a.child = f, f = S, S = a.child, _ = r.child.memoizedState, _ = _ === null ? lp(u) : { baseLanes: _.baseLanes | u, cachePool: null, transitions: _.transitions }, S.memoizedState = _, S.childLanes = r.childLanes & ~u, a.memoizedState = Tf, f;
    }
    return S = r.child, r = S.sibling, f = bo(S, { mode: "visible", children: f.children }), (a.mode & 1) === 0 && (f.lanes = u), f.return = a, f.sibling = null, r !== null && (u = a.deletions, u === null ? (a.deletions = [r], a.flags |= 16) : u.push(r)), a.child = f, a.memoizedState = null, f;
  }
  function op(r, a) {
    return a = Mo({ mode: "visible", children: a }, r.mode, 0, null), a.return = r, r.child = a;
  }
  function Qs(r, a, u, f) {
    return f !== null && Vl(f), zr(a, r.child, null, u), r = op(a, a.pendingProps.children), r.flags |= 2, a.memoizedState = null, r;
  }
  function gh(r, a, u, f, m, S, _) {
    if (u)
      return a.flags & 256 ? (a.flags &= -257, f = tp(Error(s(422))), Qs(r, a, _, f)) : a.memoizedState !== null ? (a.child = r.child, a.flags |= 128, null) : (S = f.fallback, m = a.mode, f = Mo({ mode: "visible", children: f.children }, m, 0, null), S = Ql(S, m, _, null), S.flags |= 2, f.return = a, S.return = a, f.sibling = S, a.child = f, (a.mode & 1) !== 0 && zr(a, r.child, null, _), a.child.memoizedState = lp(_), a.memoizedState = Tf, S);
    if ((a.mode & 1) === 0) return Qs(r, a, _, null);
    if (m.data === "$!") {
      if (f = m.nextSibling && m.nextSibling.dataset, f) var N = f.dgst;
      return f = N, S = Error(s(419)), f = tp(S, f, void 0), Qs(r, a, _, f);
    }
    if (N = (_ & r.childLanes) !== 0, Br || N) {
      if (f = ea, f !== null) {
        switch (_ & -_) {
          case 4:
            m = 2;
            break;
          case 16:
            m = 8;
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
            m = 32;
            break;
          case 536870912:
            m = 268435456;
            break;
          default:
            m = 0;
        }
        m = (m & (f.suspendedLanes | _)) !== 0 ? 0 : m, m !== 0 && m !== S.retryLane && (S.retryLane = m, xi(r, m), Fa(f, r, m, -1));
      }
      return yp(), f = tp(Error(s(421))), Qs(r, a, _, f);
    }
    return m.data === "$?" ? (a.flags |= 128, a.child = r.child, a = n0.bind(null, r), m._reactRetry = a, null) : (r = S.treeContext, ni = fl(m.nextSibling), ti = a, Sr = !0, ji = null, r !== null && (Vr[Ui++] = hl, Vr[Ui++] = ml, Vr[Ui++] = gi, hl = r.id, ml = r.overflow, gi = a), a = op(a, f.children), a.flags |= 4096, a);
  }
  function up(r, a, u) {
    r.lanes |= a;
    var f = r.alternate;
    f !== null && (f.lanes |= a), Yd(r.return, a, u);
  }
  function Na(r, a, u, f, m) {
    var S = r.memoizedState;
    S === null ? r.memoizedState = { isBackwards: a, rendering: null, renderingStartTime: 0, last: f, tail: u, tailMode: m } : (S.isBackwards = a, S.rendering = null, S.renderingStartTime = 0, S.last = f, S.tail = u, S.tailMode = m);
  }
  function gl(r, a, u) {
    var f = a.pendingProps, m = f.revealOrder, S = f.tail;
    if (ha(r, a, f.children, u), f = Rr.current, (f & 2) !== 0) f = f & 1 | 2, a.flags |= 128;
    else {
      if (r !== null && (r.flags & 128) !== 0) e: for (r = a.child; r !== null; ) {
        if (r.tag === 13) r.memoizedState !== null && up(r, u, a);
        else if (r.tag === 19) up(r, u, a);
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
    if (yt(Rr, f), (a.mode & 1) === 0) a.memoizedState = null;
    else switch (m) {
      case "forwards":
        for (u = a.child, m = null; u !== null; ) r = u.alternate, r !== null && tf(r) === null && (m = u), u = u.sibling;
        u = m, u === null ? (m = a.child, a.child = null) : (m = u.sibling, u.sibling = null), Na(a, !1, m, u, S);
        break;
      case "backwards":
        for (u = null, m = a.child, a.child = null; m !== null; ) {
          if (r = m.alternate, r !== null && tf(r) === null) {
            a.child = m;
            break;
          }
          r = m.sibling, m.sibling = u, u = m, m = r;
        }
        Na(a, !0, u, null, S);
        break;
      case "together":
        Na(a, !1, null, null, void 0);
        break;
      default:
        a.memoizedState = null;
    }
    return a.child;
  }
  function Pi(r, a) {
    (a.mode & 1) === 0 && r !== null && (r.alternate = null, a.alternate = null, a.flags |= 2);
  }
  function Hi(r, a, u) {
    if (r !== null && (a.dependencies = r.dependencies), El |= a.lanes, (u & a.childLanes) === 0) return null;
    if (r !== null && a.child !== r.child) throw Error(s(153));
    if (a.child !== null) {
      for (r = a.child, u = bo(r, r.pendingProps), a.child = u, u.return = a; r.sibling !== null; ) r = r.sibling, u = u.sibling = bo(r, r.pendingProps), u.return = a;
      u.sibling = null;
    }
    return a.child;
  }
  function Gs(r, a, u) {
    switch (a.tag) {
      case 3:
        Bu(a), go();
        break;
      case 5:
        sh(a);
        break;
      case 1:
        $r(a.type) && aa(a);
        break;
      case 4:
        Kd(a, a.stateNode.containerInfo);
        break;
      case 10:
        var f = a.type._context, m = a.memoizedProps.value;
        yt(Si, f._currentValue), f._currentValue = m;
        break;
      case 13:
        if (f = a.memoizedState, f !== null)
          return f.dehydrated !== null ? (yt(Rr, Rr.current & 1), a.flags |= 128, null) : (u & a.child.childLanes) !== 0 ? wf(r, a, u) : (yt(Rr, Rr.current & 1), r = Hi(r, a, u), r !== null ? r.sibling : null);
        yt(Rr, Rr.current & 1);
        break;
      case 19:
        if (f = (u & a.childLanes) !== 0, (r.flags & 128) !== 0) {
          if (f) return gl(r, a, u);
          a.flags |= 128;
        }
        if (m = a.memoizedState, m !== null && (m.rendering = null, m.tail = null, m.lastEffect = null), yt(Rr, Rr.current), f) break;
        return null;
      case 22:
      case 23:
        return a.lanes = 0, Ys(r, a, u);
    }
    return Hi(r, a, u);
  }
  var $i, qr, Sh, xh;
  $i = function(r, a) {
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
  }, qr = function() {
  }, Sh = function(r, a, u, f) {
    var m = r.memoizedProps;
    if (m !== f) {
      r = a.stateNode, eu(yl.current);
      var S = null;
      switch (u) {
        case "input":
          m = _e(r, m), f = _e(r, f), S = [];
          break;
        case "select":
          m = ae({}, m, { value: void 0 }), f = ae({}, f, { value: void 0 }), S = [];
          break;
        case "textarea":
          m = Sn(r, m), f = Sn(r, f), S = [];
          break;
        default:
          typeof m.onClick != "function" && typeof f.onClick == "function" && (r.onclick = fo);
      }
      Yt(u, f);
      var _;
      u = null;
      for (te in m) if (!f.hasOwnProperty(te) && m.hasOwnProperty(te) && m[te] != null) if (te === "style") {
        var N = m[te];
        for (_ in N) N.hasOwnProperty(_) && (u || (u = {}), u[_] = "");
      } else te !== "dangerouslySetInnerHTML" && te !== "children" && te !== "suppressContentEditableWarning" && te !== "suppressHydrationWarning" && te !== "autoFocus" && (h.hasOwnProperty(te) ? S || (S = []) : (S = S || []).push(te, null));
      for (te in f) {
        var P = f[te];
        if (N = m?.[te], f.hasOwnProperty(te) && P !== N && (P != null || N != null)) if (te === "style") if (N) {
          for (_ in N) !N.hasOwnProperty(_) || P && P.hasOwnProperty(_) || (u || (u = {}), u[_] = "");
          for (_ in P) P.hasOwnProperty(_) && N[_] !== P[_] && (u || (u = {}), u[_] = P[_]);
        } else u || (S || (S = []), S.push(
          te,
          u
        )), u = P;
        else te === "dangerouslySetInnerHTML" ? (P = P ? P.__html : void 0, N = N ? N.__html : void 0, P != null && N !== P && (S = S || []).push(te, P)) : te === "children" ? typeof P != "string" && typeof P != "number" || (S = S || []).push(te, "" + P) : te !== "suppressContentEditableWarning" && te !== "suppressHydrationWarning" && (h.hasOwnProperty(te) ? (P != null && te === "onScroll" && Gn("scroll", r), S || N === P || (S = [])) : (S = S || []).push(te, P));
      }
      u && (S = S || []).push("style", u);
      var te = S;
      (a.updateQueue = te) && (a.flags |= 4);
    }
  }, xh = function(r, a, u, f) {
    u !== f && (a.flags |= 4);
  };
  function Xs(r, a) {
    if (!Sr) switch (r.tailMode) {
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
  function la(r) {
    var a = r.alternate !== null && r.alternate.child === r.child, u = 0, f = 0;
    if (a) for (var m = r.child; m !== null; ) u |= m.lanes | m.childLanes, f |= m.subtreeFlags & 14680064, f |= m.flags & 14680064, m.return = r, m = m.sibling;
    else for (m = r.child; m !== null; ) u |= m.lanes | m.childLanes, f |= m.subtreeFlags, f |= m.flags, m.return = r, m = m.sibling;
    return r.subtreeFlags |= f, r.childLanes = u, a;
  }
  function Eh(r, a, u) {
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
        return la(a), null;
      case 1:
        return $r(a.type) && Pu(), la(a), null;
      case 3:
        return f = a.stateNode, tu(), fr(Zr), fr(kr), Et(), f.pendingContext && (f.context = f.pendingContext, f.pendingContext = null), (r === null || r.child === null) && (Kc(a) ? a.flags |= 4 : r === null || r.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, ji !== null && (du(ji), ji = null))), qr(r, a), la(a), null;
      case 5:
        ef(a);
        var m = eu(Ns.current);
        if (u = a.type, r !== null && a.stateNode != null) Sh(r, a, u, f, m), r.ref !== a.ref && (a.flags |= 512, a.flags |= 2097152);
        else {
          if (!f) {
            if (a.stateNode === null) throw Error(s(166));
            return la(a), null;
          }
          if (r = eu(yl.current), Kc(a)) {
            f = a.stateNode, u = a.type;
            var S = a.memoizedProps;
            switch (f[dl] = a, f[_s] = S, r = (a.mode & 1) !== 0, u) {
              case "dialog":
                Gn("cancel", f), Gn("close", f);
                break;
              case "iframe":
              case "object":
              case "embed":
                Gn("load", f);
                break;
              case "video":
              case "audio":
                for (m = 0; m < Rs.length; m++) Gn(Rs[m], f);
                break;
              case "source":
                Gn("error", f);
                break;
              case "img":
              case "image":
              case "link":
                Gn(
                  "error",
                  f
                ), Gn("load", f);
                break;
              case "details":
                Gn("toggle", f);
                break;
              case "input":
                tn(f, S), Gn("invalid", f);
                break;
              case "select":
                f._wrapperState = { wasMultiple: !!S.multiple }, Gn("invalid", f);
                break;
              case "textarea":
                $n(f, S), Gn("invalid", f);
            }
            Yt(u, S), m = null;
            for (var _ in S) if (S.hasOwnProperty(_)) {
              var N = S[_];
              _ === "children" ? typeof N == "string" ? f.textContent !== N && (S.suppressHydrationWarning !== !0 && Ic(f.textContent, N, r), m = ["children", N]) : typeof N == "number" && f.textContent !== "" + N && (S.suppressHydrationWarning !== !0 && Ic(
                f.textContent,
                N,
                r
              ), m = ["children", "" + N]) : h.hasOwnProperty(_) && N != null && _ === "onScroll" && Gn("scroll", f);
            }
            switch (u) {
              case "input":
                Tn(f), Ot(f, S, !0);
                break;
              case "textarea":
                Tn(f), $e(f);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof S.onClick == "function" && (f.onclick = fo);
            }
            f = m, a.updateQueue = f, f !== null && (a.flags |= 4);
          } else {
            _ = m.nodeType === 9 ? m : m.ownerDocument, r === "http://www.w3.org/1999/xhtml" && (r = on(u)), r === "http://www.w3.org/1999/xhtml" ? u === "script" ? (r = _.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(r.firstChild)) : typeof f.is == "string" ? r = _.createElement(u, { is: f.is }) : (r = _.createElement(u), u === "select" && (_ = r, f.multiple ? _.multiple = !0 : f.size && (_.size = f.size))) : r = _.createElementNS(r, u), r[dl] = a, r[_s] = f, $i(r, a, !1, !1), a.stateNode = r;
            e: {
              switch (_ = un(u, f), u) {
                case "dialog":
                  Gn("cancel", r), Gn("close", r), m = f;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Gn("load", r), m = f;
                  break;
                case "video":
                case "audio":
                  for (m = 0; m < Rs.length; m++) Gn(Rs[m], r);
                  m = f;
                  break;
                case "source":
                  Gn("error", r), m = f;
                  break;
                case "img":
                case "image":
                case "link":
                  Gn(
                    "error",
                    r
                  ), Gn("load", r), m = f;
                  break;
                case "details":
                  Gn("toggle", r), m = f;
                  break;
                case "input":
                  tn(r, f), m = _e(r, f), Gn("invalid", r);
                  break;
                case "option":
                  m = f;
                  break;
                case "select":
                  r._wrapperState = { wasMultiple: !!f.multiple }, m = ae({}, f, { value: void 0 }), Gn("invalid", r);
                  break;
                case "textarea":
                  $n(r, f), m = Sn(r, f), Gn("invalid", r);
                  break;
                default:
                  m = f;
              }
              Yt(u, m), N = m;
              for (S in N) if (N.hasOwnProperty(S)) {
                var P = N[S];
                S === "style" ? qt(r, P) : S === "dangerouslySetInnerHTML" ? (P = P ? P.__html : void 0, P != null && mr(r, P)) : S === "children" ? typeof P == "string" ? (u !== "textarea" || P !== "") && ke(r, P) : typeof P == "number" && ke(r, "" + P) : S !== "suppressContentEditableWarning" && S !== "suppressHydrationWarning" && S !== "autoFocus" && (h.hasOwnProperty(S) ? P != null && S === "onScroll" && Gn("scroll", r) : P != null && B(r, S, P, _));
              }
              switch (u) {
                case "input":
                  Tn(r), Ot(r, f, !1);
                  break;
                case "textarea":
                  Tn(r), $e(r);
                  break;
                case "option":
                  f.value != null && r.setAttribute("value", "" + Ie(f.value));
                  break;
                case "select":
                  r.multiple = !!f.multiple, S = f.value, S != null ? $t(r, !!f.multiple, S, !1) : f.defaultValue != null && $t(
                    r,
                    !!f.multiple,
                    f.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof m.onClick == "function" && (r.onclick = fo);
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
        return la(a), null;
      case 6:
        if (r && a.stateNode != null) xh(r, a, r.memoizedProps, f);
        else {
          if (typeof f != "string" && a.stateNode === null) throw Error(s(166));
          if (u = eu(Ns.current), eu(yl.current), Kc(a)) {
            if (f = a.stateNode, u = a.memoizedProps, f[dl] = a, (S = f.nodeValue !== u) && (r = ti, r !== null)) switch (r.tag) {
              case 3:
                Ic(f.nodeValue, u, (r.mode & 1) !== 0);
                break;
              case 5:
                r.memoizedProps.suppressHydrationWarning !== !0 && Ic(f.nodeValue, u, (r.mode & 1) !== 0);
            }
            S && (a.flags |= 4);
          } else f = (u.nodeType === 9 ? u : u.ownerDocument).createTextNode(f), f[dl] = a, a.stateNode = f;
        }
        return la(a), null;
      case 13:
        if (fr(Rr), f = a.memoizedState, r === null || r.memoizedState !== null && r.memoizedState.dehydrated !== null) {
          if (Sr && ni !== null && (a.mode & 1) !== 0 && (a.flags & 128) === 0) Os(), go(), a.flags |= 98560, S = !1;
          else if (S = Kc(a), f !== null && f.dehydrated !== null) {
            if (r === null) {
              if (!S) throw Error(s(318));
              if (S = a.memoizedState, S = S !== null ? S.dehydrated : null, !S) throw Error(s(317));
              S[dl] = a;
            } else go(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            la(a), S = !1;
          } else ji !== null && (du(ji), ji = null), S = !0;
          if (!S) return a.flags & 65536 ? a : null;
        }
        return (a.flags & 128) !== 0 ? (a.lanes = u, a) : (f = f !== null, f !== (r !== null && r.memoizedState !== null) && f && (a.child.flags |= 8192, (a.mode & 1) !== 0 && (r === null || (Rr.current & 1) !== 0 ? Nr === 0 && (Nr = 3) : yp())), a.updateQueue !== null && (a.flags |= 4), la(a), null);
      case 4:
        return tu(), qr(r, a), r === null && Au(a.stateNode.containerInfo), la(a), null;
      case 10:
        return qd(a.type._context), la(a), null;
      case 17:
        return $r(a.type) && Pu(), la(a), null;
      case 19:
        if (fr(Rr), S = a.memoizedState, S === null) return la(a), null;
        if (f = (a.flags & 128) !== 0, _ = S.rendering, _ === null) if (f) Xs(S, !1);
        else {
          if (Nr !== 0 || r !== null && (r.flags & 128) !== 0) for (r = a.child; r !== null; ) {
            if (_ = tf(r), _ !== null) {
              for (a.flags |= 128, Xs(S, !1), f = _.updateQueue, f !== null && (a.updateQueue = f, a.flags |= 4), a.subtreeFlags = 0, f = u, u = a.child; u !== null; ) S = u, r = f, S.flags &= 14680066, _ = S.alternate, _ === null ? (S.childLanes = 0, S.lanes = r, S.child = null, S.subtreeFlags = 0, S.memoizedProps = null, S.memoizedState = null, S.updateQueue = null, S.dependencies = null, S.stateNode = null) : (S.childLanes = _.childLanes, S.lanes = _.lanes, S.child = _.child, S.subtreeFlags = 0, S.deletions = null, S.memoizedProps = _.memoizedProps, S.memoizedState = _.memoizedState, S.updateQueue = _.updateQueue, S.type = _.type, r = _.dependencies, S.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }), u = u.sibling;
              return yt(Rr, Rr.current & 1 | 2), a.child;
            }
            r = r.sibling;
          }
          S.tail !== null && dt() > Qu && (a.flags |= 128, f = !0, Xs(S, !1), a.lanes = 4194304);
        }
        else {
          if (!f) if (r = tf(_), r !== null) {
            if (a.flags |= 128, f = !0, u = r.updateQueue, u !== null && (a.updateQueue = u, a.flags |= 4), Xs(S, !0), S.tail === null && S.tailMode === "hidden" && !_.alternate && !Sr) return la(a), null;
          } else 2 * dt() - S.renderingStartTime > Qu && u !== 1073741824 && (a.flags |= 128, f = !0, Xs(S, !1), a.lanes = 4194304);
          S.isBackwards ? (_.sibling = a.child, a.child = _) : (u = S.last, u !== null ? u.sibling = _ : a.child = _, S.last = _);
        }
        return S.tail !== null ? (a = S.tail, S.rendering = a, S.tail = a.sibling, S.renderingStartTime = dt(), a.sibling = null, u = Rr.current, yt(Rr, f ? u & 1 | 2 : u & 1), a) : (la(a), null);
      case 22:
      case 23:
        return mp(), f = a.memoizedState !== null, r !== null && r.memoizedState !== null !== f && (a.flags |= 8192), f && (a.mode & 1) !== 0 ? (Ci & 1073741824) !== 0 && (la(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : la(a), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, a.tag));
  }
  function Rf(r, a) {
    switch (Xc(a), a.tag) {
      case 1:
        return $r(a.type) && Pu(), r = a.flags, r & 65536 ? (a.flags = r & -65537 | 128, a) : null;
      case 3:
        return tu(), fr(Zr), fr(kr), Et(), r = a.flags, (r & 65536) !== 0 && (r & 128) === 0 ? (a.flags = r & -65537 | 128, a) : null;
      case 5:
        return ef(a), null;
      case 13:
        if (fr(Rr), r = a.memoizedState, r !== null && r.dehydrated !== null) {
          if (a.alternate === null) throw Error(s(340));
          go();
        }
        return r = a.flags, r & 65536 ? (a.flags = r & -65537 | 128, a) : null;
      case 19:
        return fr(Rr), null;
      case 4:
        return tu(), null;
      case 10:
        return qd(a.type._context), null;
      case 22:
      case 23:
        return mp(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ks = !1, za = !1, Gy = typeof WeakSet == "function" ? WeakSet : Set, rt = null;
  function qu(r, a) {
    var u = r.ref;
    if (u !== null) if (typeof u == "function") try {
      u(null);
    } catch (f) {
      xr(r, a, f);
    }
    else u.current = null;
  }
  function bf(r, a, u) {
    try {
      u();
    } catch (f) {
      xr(r, a, f);
    }
  }
  var Ch = !1;
  function Th(r, a) {
    if (Ms = Xa, r = Ts(), Nc(r)) {
      if ("selectionStart" in r) var u = { start: r.selectionStart, end: r.selectionEnd };
      else e: {
        u = (u = r.ownerDocument) && u.defaultView || window;
        var f = u.getSelection && u.getSelection();
        if (f && f.rangeCount !== 0) {
          u = f.anchorNode;
          var m = f.anchorOffset, S = f.focusNode;
          f = f.focusOffset;
          try {
            u.nodeType, S.nodeType;
          } catch {
            u = null;
            break e;
          }
          var _ = 0, N = -1, P = -1, te = 0, Ce = 0, De = r, Ee = null;
          t: for (; ; ) {
            for (var Ze; De !== u || m !== 0 && De.nodeType !== 3 || (N = _ + m), De !== S || f !== 0 && De.nodeType !== 3 || (P = _ + f), De.nodeType === 3 && (_ += De.nodeValue.length), (Ze = De.firstChild) !== null; )
              Ee = De, De = Ze;
            for (; ; ) {
              if (De === r) break t;
              if (Ee === u && ++te === m && (N = _), Ee === S && ++Ce === f && (P = _), (Ze = De.nextSibling) !== null) break;
              De = Ee, Ee = De.parentNode;
            }
            De = Ze;
          }
          u = N === -1 || P === -1 ? null : { start: N, end: P };
        } else u = null;
      }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (Qo = { focusedElem: r, selectionRange: u }, Xa = !1, rt = a; rt !== null; ) if (a = rt, r = a.child, (a.subtreeFlags & 1028) !== 0 && r !== null) r.return = a, rt = r;
    else for (; rt !== null; ) {
      a = rt;
      try {
        var lt = a.alternate;
        if ((a.flags & 1024) !== 0) switch (a.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (lt !== null) {
              var st = lt.memoizedProps, Ur = lt.memoizedState, Y = a.stateNode, V = Y.getSnapshotBeforeUpdate(a.elementType === a.type ? st : Ji(a.type, st), Ur);
              Y.__reactInternalSnapshotBeforeUpdate = V;
            }
            break;
          case 3:
            var G = a.stateNode.containerInfo;
            G.nodeType === 1 ? G.textContent = "" : G.nodeType === 9 && G.documentElement && G.removeChild(G.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(s(163));
        }
      } catch (Te) {
        xr(a, a.return, Te);
      }
      if (r = a.sibling, r !== null) {
        r.return = a.return, rt = r;
        break;
      }
      rt = a.return;
    }
    return lt = Ch, Ch = !1, lt;
  }
  function Zs(r, a, u) {
    var f = a.updateQueue;
    if (f = f !== null ? f.lastEffect : null, f !== null) {
      var m = f = f.next;
      do {
        if ((m.tag & r) === r) {
          var S = m.destroy;
          m.destroy = void 0, S !== void 0 && bf(a, u, S);
        }
        m = m.next;
      } while (m !== f);
    }
  }
  function Js(r, a) {
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
  function sp(r) {
    var a = r.ref;
    if (a !== null) {
      var u = r.stateNode;
      r.tag, r = u, typeof a == "function" ? a(r) : a.current = r;
    }
  }
  function Mf(r) {
    var a = r.alternate;
    a !== null && (r.alternate = null, Mf(a)), r.child = null, r.deletions = null, r.sibling = null, r.tag === 5 && (a = r.stateNode, a !== null && (delete a[dl], delete a[_s], delete a[ks], delete a[Fu], delete a[Wy])), r.stateNode = null, r.return = null, r.dependencies = null, r.memoizedProps = null, r.memoizedState = null, r.pendingProps = null, r.stateNode = null, r.updateQueue = null;
  }
  function ec(r) {
    return r.tag === 5 || r.tag === 3 || r.tag === 4;
  }
  function ql(r) {
    e: for (; ; ) {
      for (; r.sibling === null; ) {
        if (r.return === null || ec(r.return)) return null;
        r = r.return;
      }
      for (r.sibling.return = r.return, r = r.sibling; r.tag !== 5 && r.tag !== 6 && r.tag !== 18; ) {
        if (r.flags & 2 || r.child === null || r.tag === 4) continue e;
        r.child.return = r, r = r.child;
      }
      if (!(r.flags & 2)) return r.stateNode;
    }
  }
  function Sl(r, a, u) {
    var f = r.tag;
    if (f === 5 || f === 6) r = r.stateNode, a ? u.nodeType === 8 ? u.parentNode.insertBefore(r, a) : u.insertBefore(r, a) : (u.nodeType === 8 ? (a = u.parentNode, a.insertBefore(r, u)) : (a = u, a.appendChild(r)), u = u._reactRootContainer, u != null || a.onclick !== null || (a.onclick = fo));
    else if (f !== 4 && (r = r.child, r !== null)) for (Sl(r, a, u), r = r.sibling; r !== null; ) Sl(r, a, u), r = r.sibling;
  }
  function xl(r, a, u) {
    var f = r.tag;
    if (f === 5 || f === 6) r = r.stateNode, a ? u.insertBefore(r, a) : u.appendChild(r);
    else if (f !== 4 && (r = r.child, r !== null)) for (xl(r, a, u), r = r.sibling; r !== null; ) xl(r, a, u), r = r.sibling;
  }
  var Ar = null, Ua = !1;
  function ja(r, a, u) {
    for (u = u.child; u !== null; ) wh(r, a, u), u = u.sibling;
  }
  function wh(r, a, u) {
    if (zn && typeof zn.onCommitFiberUnmount == "function") try {
      zn.onCommitFiberUnmount(Yn, u);
    } catch {
    }
    switch (u.tag) {
      case 5:
        za || qu(u, a);
      case 6:
        var f = Ar, m = Ua;
        Ar = null, ja(r, a, u), Ar = f, Ua = m, Ar !== null && (Ua ? (r = Ar, u = u.stateNode, r.nodeType === 8 ? r.parentNode.removeChild(u) : r.removeChild(u)) : Ar.removeChild(u.stateNode));
        break;
      case 18:
        Ar !== null && (Ua ? (r = Ar, u = u.stateNode, r.nodeType === 8 ? ju(r.parentNode, u) : r.nodeType === 1 && ju(r, u), yi(r)) : ju(Ar, u.stateNode));
        break;
      case 4:
        f = Ar, m = Ua, Ar = u.stateNode.containerInfo, Ua = !0, ja(r, a, u), Ar = f, Ua = m;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!za && (f = u.updateQueue, f !== null && (f = f.lastEffect, f !== null))) {
          m = f = f.next;
          do {
            var S = m, _ = S.destroy;
            S = S.tag, _ !== void 0 && ((S & 2) !== 0 || (S & 4) !== 0) && bf(u, a, _), m = m.next;
          } while (m !== f);
        }
        ja(r, a, u);
        break;
      case 1:
        if (!za && (qu(u, a), f = u.stateNode, typeof f.componentWillUnmount == "function")) try {
          f.props = u.memoizedProps, f.state = u.memoizedState, f.componentWillUnmount();
        } catch (N) {
          xr(u, a, N);
        }
        ja(r, a, u);
        break;
      case 21:
        ja(r, a, u);
        break;
      case 22:
        u.mode & 1 ? (za = (f = za) || u.memoizedState !== null, ja(r, a, u), za = f) : ja(r, a, u);
        break;
      default:
        ja(r, a, u);
    }
  }
  function Rh(r) {
    var a = r.updateQueue;
    if (a !== null) {
      r.updateQueue = null;
      var u = r.stateNode;
      u === null && (u = r.stateNode = new Gy()), a.forEach(function(f) {
        var m = Ah.bind(null, r, f);
        u.has(f) || (u.add(f), f.then(m, m));
      });
    }
  }
  function el(r, a) {
    var u = a.deletions;
    if (u !== null) for (var f = 0; f < u.length; f++) {
      var m = u[f];
      try {
        var S = r, _ = a, N = _;
        e: for (; N !== null; ) {
          switch (N.tag) {
            case 5:
              Ar = N.stateNode, Ua = !1;
              break e;
            case 3:
              Ar = N.stateNode.containerInfo, Ua = !0;
              break e;
            case 4:
              Ar = N.stateNode.containerInfo, Ua = !0;
              break e;
          }
          N = N.return;
        }
        if (Ar === null) throw Error(s(160));
        wh(S, _, m), Ar = null, Ua = !1;
        var P = m.alternate;
        P !== null && (P.return = null), m.return = null;
      } catch (te) {
        xr(m, a, te);
      }
    }
    if (a.subtreeFlags & 12854) for (a = a.child; a !== null; ) cp(a, r), a = a.sibling;
  }
  function cp(r, a) {
    var u = r.alternate, f = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (el(a, r), li(r), f & 4) {
          try {
            Zs(3, r, r.return), Js(3, r);
          } catch (st) {
            xr(r, r.return, st);
          }
          try {
            Zs(5, r, r.return);
          } catch (st) {
            xr(r, r.return, st);
          }
        }
        break;
      case 1:
        el(a, r), li(r), f & 512 && u !== null && qu(u, u.return);
        break;
      case 5:
        if (el(a, r), li(r), f & 512 && u !== null && qu(u, u.return), r.flags & 32) {
          var m = r.stateNode;
          try {
            ke(m, "");
          } catch (st) {
            xr(r, r.return, st);
          }
        }
        if (f & 4 && (m = r.stateNode, m != null)) {
          var S = r.memoizedProps, _ = u !== null ? u.memoizedProps : S, N = r.type, P = r.updateQueue;
          if (r.updateQueue = null, P !== null) try {
            N === "input" && S.type === "radio" && S.name != null && et(m, S), un(N, _);
            var te = un(N, S);
            for (_ = 0; _ < P.length; _ += 2) {
              var Ce = P[_], De = P[_ + 1];
              Ce === "style" ? qt(m, De) : Ce === "dangerouslySetInnerHTML" ? mr(m, De) : Ce === "children" ? ke(m, De) : B(m, Ce, De, te);
            }
            switch (N) {
              case "input":
                Nt(m, S);
                break;
              case "textarea":
                Er(m, S);
                break;
              case "select":
                var Ee = m._wrapperState.wasMultiple;
                m._wrapperState.wasMultiple = !!S.multiple;
                var Ze = S.value;
                Ze != null ? $t(m, !!S.multiple, Ze, !1) : Ee !== !!S.multiple && (S.defaultValue != null ? $t(
                  m,
                  !!S.multiple,
                  S.defaultValue,
                  !0
                ) : $t(m, !!S.multiple, S.multiple ? [] : "", !1));
            }
            m[_s] = S;
          } catch (st) {
            xr(r, r.return, st);
          }
        }
        break;
      case 6:
        if (el(a, r), li(r), f & 4) {
          if (r.stateNode === null) throw Error(s(162));
          m = r.stateNode, S = r.memoizedProps;
          try {
            m.nodeValue = S;
          } catch (st) {
            xr(r, r.return, st);
          }
        }
        break;
      case 3:
        if (el(a, r), li(r), f & 4 && u !== null && u.memoizedState.isDehydrated) try {
          yi(a.containerInfo);
        } catch (st) {
          xr(r, r.return, st);
        }
        break;
      case 4:
        el(a, r), li(r);
        break;
      case 13:
        el(a, r), li(r), m = r.child, m.flags & 8192 && (S = m.memoizedState !== null, m.stateNode.isHidden = S, !S || m.alternate !== null && m.alternate.memoizedState !== null || (pp = dt())), f & 4 && Rh(r);
        break;
      case 22:
        if (Ce = u !== null && u.memoizedState !== null, r.mode & 1 ? (za = (te = za) || Ce, el(a, r), za = te) : el(a, r), li(r), f & 8192) {
          if (te = r.memoizedState !== null, (r.stateNode.isHidden = te) && !Ce && (r.mode & 1) !== 0) for (rt = r, Ce = r.child; Ce !== null; ) {
            for (De = rt = Ce; rt !== null; ) {
              switch (Ee = rt, Ze = Ee.child, Ee.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Zs(4, Ee, Ee.return);
                  break;
                case 1:
                  qu(Ee, Ee.return);
                  var lt = Ee.stateNode;
                  if (typeof lt.componentWillUnmount == "function") {
                    f = Ee, u = Ee.return;
                    try {
                      a = f, lt.props = a.memoizedProps, lt.state = a.memoizedState, lt.componentWillUnmount();
                    } catch (st) {
                      xr(f, u, st);
                    }
                  }
                  break;
                case 5:
                  qu(Ee, Ee.return);
                  break;
                case 22:
                  if (Ee.memoizedState !== null) {
                    tc(De);
                    continue;
                  }
              }
              Ze !== null ? (Ze.return = Ee, rt = Ze) : tc(De);
            }
            Ce = Ce.sibling;
          }
          e: for (Ce = null, De = r; ; ) {
            if (De.tag === 5) {
              if (Ce === null) {
                Ce = De;
                try {
                  m = De.stateNode, te ? (S = m.style, typeof S.setProperty == "function" ? S.setProperty("display", "none", "important") : S.display = "none") : (N = De.stateNode, P = De.memoizedProps.style, _ = P != null && P.hasOwnProperty("display") ? P.display : null, N.style.display = Kt("display", _));
                } catch (st) {
                  xr(r, r.return, st);
                }
              }
            } else if (De.tag === 6) {
              if (Ce === null) try {
                De.stateNode.nodeValue = te ? "" : De.memoizedProps;
              } catch (st) {
                xr(r, r.return, st);
              }
            } else if ((De.tag !== 22 && De.tag !== 23 || De.memoizedState === null || De === r) && De.child !== null) {
              De.child.return = De, De = De.child;
              continue;
            }
            if (De === r) break e;
            for (; De.sibling === null; ) {
              if (De.return === null || De.return === r) break e;
              Ce === De && (Ce = null), De = De.return;
            }
            Ce === De && (Ce = null), De.sibling.return = De.return, De = De.sibling;
          }
        }
        break;
      case 19:
        el(a, r), li(r), f & 4 && Rh(r);
        break;
      case 21:
        break;
      default:
        el(
          a,
          r
        ), li(r);
    }
  }
  function li(r) {
    var a = r.flags;
    if (a & 2) {
      try {
        e: {
          for (var u = r.return; u !== null; ) {
            if (ec(u)) {
              var f = u;
              break e;
            }
            u = u.return;
          }
          throw Error(s(160));
        }
        switch (f.tag) {
          case 5:
            var m = f.stateNode;
            f.flags & 32 && (ke(m, ""), f.flags &= -33);
            var S = ql(r);
            xl(r, S, m);
            break;
          case 3:
          case 4:
            var _ = f.stateNode.containerInfo, N = ql(r);
            Sl(r, N, _);
            break;
          default:
            throw Error(s(161));
        }
      } catch (P) {
        xr(r, r.return, P);
      }
      r.flags &= -3;
    }
    a & 4096 && (r.flags &= -4097);
  }
  function Xy(r, a, u) {
    rt = r, fp(r);
  }
  function fp(r, a, u) {
    for (var f = (r.mode & 1) !== 0; rt !== null; ) {
      var m = rt, S = m.child;
      if (m.tag === 22 && f) {
        var _ = m.memoizedState !== null || Ks;
        if (!_) {
          var N = m.alternate, P = N !== null && N.memoizedState !== null || za;
          N = Ks;
          var te = za;
          if (Ks = _, (za = P) && !te) for (rt = m; rt !== null; ) _ = rt, P = _.child, _.tag === 22 && _.memoizedState !== null ? dp(m) : P !== null ? (P.return = _, rt = P) : dp(m);
          for (; S !== null; ) rt = S, fp(S), S = S.sibling;
          rt = m, Ks = N, za = te;
        }
        bh(r);
      } else (m.subtreeFlags & 8772) !== 0 && S !== null ? (S.return = m, rt = S) : bh(r);
    }
  }
  function bh(r) {
    for (; rt !== null; ) {
      var a = rt;
      if ((a.flags & 8772) !== 0) {
        var u = a.alternate;
        try {
          if ((a.flags & 8772) !== 0) switch (a.tag) {
            case 0:
            case 11:
            case 15:
              za || Js(5, a);
              break;
            case 1:
              var f = a.stateNode;
              if (a.flags & 4 && !za) if (u === null) f.componentDidMount();
              else {
                var m = a.elementType === a.type ? u.memoizedProps : Ji(a.type, u.memoizedProps);
                f.componentDidUpdate(m, u.memoizedState, f.__reactInternalSnapshotBeforeUpdate);
              }
              var S = a.updateQueue;
              S !== null && Xd(a, S, f);
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
                Xd(a, _, u);
              }
              break;
            case 5:
              var N = a.stateNode;
              if (u === null && a.flags & 4) {
                u = N;
                var P = a.memoizedProps;
                switch (a.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    P.autoFocus && u.focus();
                    break;
                  case "img":
                    P.src && (u.src = P.src);
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
                var te = a.alternate;
                if (te !== null) {
                  var Ce = te.memoizedState;
                  if (Ce !== null) {
                    var De = Ce.dehydrated;
                    De !== null && yi(De);
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
          za || a.flags & 512 && sp(a);
        } catch (Ee) {
          xr(a, a.return, Ee);
        }
      }
      if (a === r) {
        rt = null;
        break;
      }
      if (u = a.sibling, u !== null) {
        u.return = a.return, rt = u;
        break;
      }
      rt = a.return;
    }
  }
  function tc(r) {
    for (; rt !== null; ) {
      var a = rt;
      if (a === r) {
        rt = null;
        break;
      }
      var u = a.sibling;
      if (u !== null) {
        u.return = a.return, rt = u;
        break;
      }
      rt = a.return;
    }
  }
  function dp(r) {
    for (; rt !== null; ) {
      var a = rt;
      try {
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            var u = a.return;
            try {
              Js(4, a);
            } catch (P) {
              xr(a, u, P);
            }
            break;
          case 1:
            var f = a.stateNode;
            if (typeof f.componentDidMount == "function") {
              var m = a.return;
              try {
                f.componentDidMount();
              } catch (P) {
                xr(a, m, P);
              }
            }
            var S = a.return;
            try {
              sp(a);
            } catch (P) {
              xr(a, S, P);
            }
            break;
          case 5:
            var _ = a.return;
            try {
              sp(a);
            } catch (P) {
              xr(a, _, P);
            }
        }
      } catch (P) {
        xr(a, a.return, P);
      }
      if (a === r) {
        rt = null;
        break;
      }
      var N = a.sibling;
      if (N !== null) {
        N.return = a.return, rt = N;
        break;
      }
      rt = a.return;
    }
  }
  var Ky = Math.ceil, To = ee.ReactCurrentDispatcher, cu = ee.ReactCurrentOwner, ma = ee.ReactCurrentBatchConfig, Mn = 0, ea = null, Yr = null, ya = 0, Ci = 0, Yu = Ni(0), Nr = 0, nc = null, El = 0, Wu = 0, _f = 0, rc = null, oi = null, pp = 0, Qu = 1 / 0, Ti = null, Gu = !1, fu = null, wo = null, kf = !1, Yl = null, ac = 0, Ro = 0, Xu = null, ic = -1, La = 0;
  function Wr() {
    return (Mn & 6) !== 0 ? dt() : ic !== -1 ? ic : ic = dt();
  }
  function Cl(r) {
    return (r.mode & 1) === 0 ? 1 : (Mn & 2) !== 0 && ya !== 0 ? ya & -ya : Qy.transition !== null ? (La === 0 && (La = hi()), La) : (r = Qt, r !== 0 || (r = window.event, r = r === void 0 ? 16 : Oi(r.type)), r);
  }
  function Fa(r, a, u, f) {
    if (50 < Ro) throw Ro = 0, Xu = null, Error(s(185));
    pt(r, u, f), ((Mn & 2) === 0 || r !== ea) && (r === ea && ((Mn & 2) === 0 && (Wu |= u), Nr === 4 && tl(r, ya)), ui(r, f), u === 1 && Mn === 0 && (a.mode & 1) === 0 && (Qu = dt() + 500, Hu && vl()));
  }
  function ui(r, a) {
    var u = r.callbackNode;
    vi(r, a);
    var f = tr(r, r === ea ? ya : 0);
    if (f === 0) u !== null && vn(u), r.callbackNode = null, r.callbackPriority = 0;
    else if (a = f & -f, r.callbackPriority !== a) {
      if (u != null && vn(u), a === 1) r.tag === 0 ? vo(vp.bind(null, r)) : Qc(vp.bind(null, r)), Uu(function() {
        (Mn & 6) === 0 && vl();
      }), u = null;
      else {
        switch (Pr(f)) {
          case 1:
            u = lr;
            break;
          case 4:
            u = _t;
            break;
          case 16:
            u = it;
            break;
          case 536870912:
            u = Zt;
            break;
          default:
            u = it;
        }
        u = Uh(u, Df.bind(null, r));
      }
      r.callbackPriority = a, r.callbackNode = u;
    }
  }
  function Df(r, a) {
    if (ic = -1, La = 0, (Mn & 6) !== 0) throw Error(s(327));
    var u = r.callbackNode;
    if (Ku() && r.callbackNode !== u) return null;
    var f = tr(r, r === ea ? ya : 0);
    if (f === 0) return null;
    if ((f & 30) !== 0 || (f & r.expiredLanes) !== 0 || a) a = Of(r, f);
    else {
      a = f;
      var m = Mn;
      Mn |= 2;
      var S = _h();
      (ea !== r || ya !== a) && (Ti = null, Qu = dt() + 500, Wl(r, a));
      do
        try {
          kh();
          break;
        } catch (N) {
          Mh(r, N);
        }
      while (!0);
      Bd(), To.current = S, Mn = m, Yr !== null ? a = 0 : (ea = null, ya = 0, a = Nr);
    }
    if (a !== 0) {
      if (a === 2 && (m = Fr(r), m !== 0 && (f = m, a = lc(r, m))), a === 1) throw u = nc, Wl(r, 0), tl(r, f), ui(r, dt()), u;
      if (a === 6) tl(r, f);
      else {
        if (m = r.current.alternate, (f & 30) === 0 && !Zy(m) && (a = Of(r, f), a === 2 && (S = Fr(r), S !== 0 && (f = S, a = lc(r, S))), a === 1)) throw u = nc, Wl(r, 0), tl(r, f), ui(r, dt()), u;
        switch (r.finishedWork = m, r.finishedLanes = f, a) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            vu(r, oi, Ti);
            break;
          case 3:
            if (tl(r, f), (f & 130023424) === f && (a = pp + 500 - dt(), 10 < a)) {
              if (tr(r, 0) !== 0) break;
              if (m = r.suspendedLanes, (m & f) !== f) {
                Wr(), r.pingedLanes |= r.suspendedLanes & m;
                break;
              }
              r.timeoutHandle = qc(vu.bind(null, r, oi, Ti), a);
              break;
            }
            vu(r, oi, Ti);
            break;
          case 4:
            if (tl(r, f), (f & 4194240) === f) break;
            for (a = r.eventTimes, m = -1; 0 < f; ) {
              var _ = 31 - Mr(f);
              S = 1 << _, _ = a[_], _ > m && (m = _), f &= ~S;
            }
            if (f = m, f = dt() - f, f = (120 > f ? 120 : 480 > f ? 480 : 1080 > f ? 1080 : 1920 > f ? 1920 : 3e3 > f ? 3e3 : 4320 > f ? 4320 : 1960 * Ky(f / 1960)) - f, 10 < f) {
              r.timeoutHandle = qc(vu.bind(null, r, oi, Ti), f);
              break;
            }
            vu(r, oi, Ti);
            break;
          case 5:
            vu(r, oi, Ti);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return ui(r, dt()), r.callbackNode === u ? Df.bind(null, r) : null;
  }
  function lc(r, a) {
    var u = rc;
    return r.current.memoizedState.isDehydrated && (Wl(r, a).flags |= 256), r = Of(r, a), r !== 2 && (a = oi, oi = u, a !== null && du(a)), r;
  }
  function du(r) {
    oi === null ? oi = r : oi.push.apply(oi, r);
  }
  function Zy(r) {
    for (var a = r; ; ) {
      if (a.flags & 16384) {
        var u = a.updateQueue;
        if (u !== null && (u = u.stores, u !== null)) for (var f = 0; f < u.length; f++) {
          var m = u[f], S = m.getSnapshot;
          m = m.value;
          try {
            if (!Xi(S(), m)) return !1;
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
  function tl(r, a) {
    for (a &= ~_f, a &= ~Wu, r.suspendedLanes |= a, r.pingedLanes &= ~a, r = r.expirationTimes; 0 < a; ) {
      var u = 31 - Mr(a), f = 1 << u;
      r[u] = -1, a &= ~f;
    }
  }
  function vp(r) {
    if ((Mn & 6) !== 0) throw Error(s(327));
    Ku();
    var a = tr(r, 0);
    if ((a & 1) === 0) return ui(r, dt()), null;
    var u = Of(r, a);
    if (r.tag !== 0 && u === 2) {
      var f = Fr(r);
      f !== 0 && (a = f, u = lc(r, f));
    }
    if (u === 1) throw u = nc, Wl(r, 0), tl(r, a), ui(r, dt()), u;
    if (u === 6) throw Error(s(345));
    return r.finishedWork = r.current.alternate, r.finishedLanes = a, vu(r, oi, Ti), ui(r, dt()), null;
  }
  function hp(r, a) {
    var u = Mn;
    Mn |= 1;
    try {
      return r(a);
    } finally {
      Mn = u, Mn === 0 && (Qu = dt() + 500, Hu && vl());
    }
  }
  function pu(r) {
    Yl !== null && Yl.tag === 0 && (Mn & 6) === 0 && Ku();
    var a = Mn;
    Mn |= 1;
    var u = ma.transition, f = Qt;
    try {
      if (ma.transition = null, Qt = 1, r) return r();
    } finally {
      Qt = f, ma.transition = u, Mn = a, (Mn & 6) === 0 && vl();
    }
  }
  function mp() {
    Ci = Yu.current, fr(Yu);
  }
  function Wl(r, a) {
    r.finishedWork = null, r.finishedLanes = 0;
    var u = r.timeoutHandle;
    if (u !== -1 && (r.timeoutHandle = -1, Pd(u)), Yr !== null) for (u = Yr.return; u !== null; ) {
      var f = u;
      switch (Xc(f), f.tag) {
        case 1:
          f = f.type.childContextTypes, f != null && Pu();
          break;
        case 3:
          tu(), fr(Zr), fr(kr), Et();
          break;
        case 5:
          ef(f);
          break;
        case 4:
          tu();
          break;
        case 13:
          fr(Rr);
          break;
        case 19:
          fr(Rr);
          break;
        case 10:
          qd(f.type._context);
          break;
        case 22:
        case 23:
          mp();
      }
      u = u.return;
    }
    if (ea = r, Yr = r = bo(r.current, null), ya = Ci = a, Nr = 0, nc = null, _f = Wu = El = 0, oi = rc = null, Jo !== null) {
      for (a = 0; a < Jo.length; a++) if (u = Jo[a], f = u.interleaved, f !== null) {
        u.interleaved = null;
        var m = f.next, S = u.pending;
        if (S !== null) {
          var _ = S.next;
          S.next = m, f.next = _;
        }
        u.pending = f;
      }
      Jo = null;
    }
    return r;
  }
  function Mh(r, a) {
    do {
      var u = Yr;
      try {
        if (Bd(), cn.current = ou, nf) {
          for (var f = Nn.memoizedState; f !== null; ) {
            var m = f.queue;
            m !== null && (m.pending = null), f = f.next;
          }
          nf = !1;
        }
        if (nr = 0, ia = Ir = Nn = null, js = !1, nu = 0, cu.current = null, u === null || u.return === null) {
          Nr = 1, nc = a, Yr = null;
          break;
        }
        e: {
          var S = r, _ = u.return, N = u, P = a;
          if (a = ya, N.flags |= 32768, P !== null && typeof P == "object" && typeof P.then == "function") {
            var te = P, Ce = N, De = Ce.tag;
            if ((Ce.mode & 1) === 0 && (De === 0 || De === 11 || De === 15)) {
              var Ee = Ce.alternate;
              Ee ? (Ce.updateQueue = Ee.updateQueue, Ce.memoizedState = Ee.memoizedState, Ce.lanes = Ee.lanes) : (Ce.updateQueue = null, Ce.memoizedState = null);
            }
            var Ze = vh(_);
            if (Ze !== null) {
              Ze.flags &= -257, Co(Ze, _, N, S, a), Ze.mode & 1 && ap(S, te, a), a = Ze, P = te;
              var lt = a.updateQueue;
              if (lt === null) {
                var st = /* @__PURE__ */ new Set();
                st.add(P), a.updateQueue = st;
              } else lt.add(P);
              break e;
            } else {
              if ((a & 1) === 0) {
                ap(S, te, a), yp();
                break e;
              }
              P = Error(s(426));
            }
          } else if (Sr && N.mode & 1) {
            var Ur = vh(_);
            if (Ur !== null) {
              (Ur.flags & 65536) === 0 && (Ur.flags |= 256), Co(Ur, _, N, S, a), Vl(uu(P, N));
              break e;
            }
          }
          S = P = uu(P, N), Nr !== 4 && (Nr = 2), rc === null ? rc = [S] : rc.push(S), S = _;
          do {
            switch (S.tag) {
              case 3:
                S.flags |= 65536, a &= -a, S.lanes |= a;
                var Y = ph(S, P, a);
                uh(S, Y);
                break e;
              case 1:
                N = P;
                var V = S.type, G = S.stateNode;
                if ((S.flags & 128) === 0 && (typeof V.getDerivedStateFromError == "function" || G !== null && typeof G.componentDidCatch == "function" && (wo === null || !wo.has(G)))) {
                  S.flags |= 65536, a &= -a, S.lanes |= a;
                  var Te = rp(S, N, a);
                  uh(S, Te);
                  break e;
                }
            }
            S = S.return;
          } while (S !== null);
        }
        Oh(u);
      } catch (ot) {
        a = ot, Yr === u && u !== null && (Yr = u = u.return);
        continue;
      }
      break;
    } while (!0);
  }
  function _h() {
    var r = To.current;
    return To.current = ou, r === null ? ou : r;
  }
  function yp() {
    (Nr === 0 || Nr === 3 || Nr === 2) && (Nr = 4), ea === null || (El & 268435455) === 0 && (Wu & 268435455) === 0 || tl(ea, ya);
  }
  function Of(r, a) {
    var u = Mn;
    Mn |= 2;
    var f = _h();
    (ea !== r || ya !== a) && (Ti = null, Wl(r, a));
    do
      try {
        Jy();
        break;
      } catch (m) {
        Mh(r, m);
      }
    while (!0);
    if (Bd(), Mn = u, To.current = f, Yr !== null) throw Error(s(261));
    return ea = null, ya = 0, Nr;
  }
  function Jy() {
    for (; Yr !== null; ) Dh(Yr);
  }
  function kh() {
    for (; Yr !== null && !En(); ) Dh(Yr);
  }
  function Dh(r) {
    var a = Nh(r.alternate, r, Ci);
    r.memoizedProps = r.pendingProps, a === null ? Oh(r) : Yr = a, cu.current = null;
  }
  function Oh(r) {
    var a = r;
    do {
      var u = a.alternate;
      if (r = a.return, (a.flags & 32768) === 0) {
        if (u = Eh(u, a, Ci), u !== null) {
          Yr = u;
          return;
        }
      } else {
        if (u = Rf(u, a), u !== null) {
          u.flags &= 32767, Yr = u;
          return;
        }
        if (r !== null) r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null;
        else {
          Nr = 6, Yr = null;
          return;
        }
      }
      if (a = a.sibling, a !== null) {
        Yr = a;
        return;
      }
      Yr = a = r;
    } while (a !== null);
    Nr === 0 && (Nr = 5);
  }
  function vu(r, a, u) {
    var f = Qt, m = ma.transition;
    try {
      ma.transition = null, Qt = 1, e0(r, a, u, f);
    } finally {
      ma.transition = m, Qt = f;
    }
    return null;
  }
  function e0(r, a, u, f) {
    do
      Ku();
    while (Yl !== null);
    if ((Mn & 6) !== 0) throw Error(s(327));
    u = r.finishedWork;
    var m = r.finishedLanes;
    if (u === null) return null;
    if (r.finishedWork = null, r.finishedLanes = 0, u === r.current) throw Error(s(177));
    r.callbackNode = null, r.callbackPriority = 0;
    var S = u.lanes | u.childLanes;
    if (gr(r, S), r === ea && (Yr = ea = null, ya = 0), (u.subtreeFlags & 2064) === 0 && (u.flags & 2064) === 0 || kf || (kf = !0, Uh(it, function() {
      return Ku(), null;
    })), S = (u.flags & 15990) !== 0, (u.subtreeFlags & 15990) !== 0 || S) {
      S = ma.transition, ma.transition = null;
      var _ = Qt;
      Qt = 1;
      var N = Mn;
      Mn |= 4, cu.current = null, Th(r, u), cp(u, r), zu(Qo), Xa = !!Ms, Qo = Ms = null, r.current = u, Xy(u), ir(), Mn = N, Qt = _, ma.transition = S;
    } else r.current = u;
    if (kf && (kf = !1, Yl = r, ac = m), S = r.pendingLanes, S === 0 && (wo = null), Cr(u.stateNode), ui(r, dt()), a !== null) for (f = r.onRecoverableError, u = 0; u < a.length; u++) m = a[u], f(m.value, { componentStack: m.stack, digest: m.digest });
    if (Gu) throw Gu = !1, r = fu, fu = null, r;
    return (ac & 1) !== 0 && r.tag !== 0 && Ku(), S = r.pendingLanes, (S & 1) !== 0 ? r === Xu ? Ro++ : (Ro = 0, Xu = r) : Ro = 0, vl(), null;
  }
  function Ku() {
    if (Yl !== null) {
      var r = Pr(ac), a = ma.transition, u = Qt;
      try {
        if (ma.transition = null, Qt = 16 > r ? 16 : r, Yl === null) var f = !1;
        else {
          if (r = Yl, Yl = null, ac = 0, (Mn & 6) !== 0) throw Error(s(331));
          var m = Mn;
          for (Mn |= 4, rt = r.current; rt !== null; ) {
            var S = rt, _ = S.child;
            if ((rt.flags & 16) !== 0) {
              var N = S.deletions;
              if (N !== null) {
                for (var P = 0; P < N.length; P++) {
                  var te = N[P];
                  for (rt = te; rt !== null; ) {
                    var Ce = rt;
                    switch (Ce.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Zs(8, Ce, S);
                    }
                    var De = Ce.child;
                    if (De !== null) De.return = Ce, rt = De;
                    else for (; rt !== null; ) {
                      Ce = rt;
                      var Ee = Ce.sibling, Ze = Ce.return;
                      if (Mf(Ce), Ce === te) {
                        rt = null;
                        break;
                      }
                      if (Ee !== null) {
                        Ee.return = Ze, rt = Ee;
                        break;
                      }
                      rt = Ze;
                    }
                  }
                }
                var lt = S.alternate;
                if (lt !== null) {
                  var st = lt.child;
                  if (st !== null) {
                    lt.child = null;
                    do {
                      var Ur = st.sibling;
                      st.sibling = null, st = Ur;
                    } while (st !== null);
                  }
                }
                rt = S;
              }
            }
            if ((S.subtreeFlags & 2064) !== 0 && _ !== null) _.return = S, rt = _;
            else e: for (; rt !== null; ) {
              if (S = rt, (S.flags & 2048) !== 0) switch (S.tag) {
                case 0:
                case 11:
                case 15:
                  Zs(9, S, S.return);
              }
              var Y = S.sibling;
              if (Y !== null) {
                Y.return = S.return, rt = Y;
                break e;
              }
              rt = S.return;
            }
          }
          var V = r.current;
          for (rt = V; rt !== null; ) {
            _ = rt;
            var G = _.child;
            if ((_.subtreeFlags & 2064) !== 0 && G !== null) G.return = _, rt = G;
            else e: for (_ = V; rt !== null; ) {
              if (N = rt, (N.flags & 2048) !== 0) try {
                switch (N.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Js(9, N);
                }
              } catch (ot) {
                xr(N, N.return, ot);
              }
              if (N === _) {
                rt = null;
                break e;
              }
              var Te = N.sibling;
              if (Te !== null) {
                Te.return = N.return, rt = Te;
                break e;
              }
              rt = N.return;
            }
          }
          if (Mn = m, vl(), zn && typeof zn.onPostCommitFiberRoot == "function") try {
            zn.onPostCommitFiberRoot(Yn, r);
          } catch {
          }
          f = !0;
        }
        return f;
      } finally {
        Qt = u, ma.transition = a;
      }
    }
    return !1;
  }
  function zh(r, a, u) {
    a = uu(u, a), a = ph(r, a, 1), r = So(r, a, 1), a = Wr(), r !== null && (pt(r, 1, a), ui(r, a));
  }
  function xr(r, a, u) {
    if (r.tag === 3) zh(r, r, u);
    else for (; a !== null; ) {
      if (a.tag === 3) {
        zh(a, r, u);
        break;
      } else if (a.tag === 1) {
        var f = a.stateNode;
        if (typeof a.type.getDerivedStateFromError == "function" || typeof f.componentDidCatch == "function" && (wo === null || !wo.has(f))) {
          r = uu(u, r), r = rp(a, r, 1), a = So(a, r, 1), r = Wr(), a !== null && (pt(a, 1, r), ui(a, r));
          break;
        }
      }
      a = a.return;
    }
  }
  function t0(r, a, u) {
    var f = r.pingCache;
    f !== null && f.delete(a), a = Wr(), r.pingedLanes |= r.suspendedLanes & u, ea === r && (ya & u) === u && (Nr === 4 || Nr === 3 && (ya & 130023424) === ya && 500 > dt() - pp ? Wl(r, 0) : _f |= u), ui(r, a);
  }
  function Lh(r, a) {
    a === 0 && ((r.mode & 1) === 0 ? a = 1 : (a = Dr, Dr <<= 1, (Dr & 130023424) === 0 && (Dr = 4194304)));
    var u = Wr();
    r = xi(r, a), r !== null && (pt(r, a, u), ui(r, u));
  }
  function n0(r) {
    var a = r.memoizedState, u = 0;
    a !== null && (u = a.retryLane), Lh(r, u);
  }
  function Ah(r, a) {
    var u = 0;
    switch (r.tag) {
      case 13:
        var f = r.stateNode, m = r.memoizedState;
        m !== null && (u = m.retryLane);
        break;
      case 19:
        f = r.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    f !== null && f.delete(a), Lh(r, u);
  }
  var Nh;
  Nh = function(r, a, u) {
    if (r !== null) if (r.memoizedProps !== a.pendingProps || Zr.current) Br = !0;
    else {
      if ((r.lanes & u) === 0 && (a.flags & 128) === 0) return Br = !1, Gs(r, a, u);
      Br = (r.flags & 131072) !== 0;
    }
    else Br = !1, Sr && (a.flags & 1048576) !== 0 && ah(a, $l, a.index);
    switch (a.lanes = 0, a.tag) {
      case 2:
        var f = a.type;
        Pi(r, a), r = a.pendingProps;
        var m = ei(a, kr.current);
        wr(a, u), m = xo(null, a, f, r, m, u);
        var S = Zi();
        return a.flags |= 1, typeof m == "object" && m !== null && typeof m.render == "function" && m.$$typeof === void 0 ? (a.tag = 1, a.memoizedState = null, a.updateQueue = null, $r(f) ? (S = !0, aa(a)) : S = !1, a.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null, Gd(a), m.updater = xf, a.stateNode = m, m._reactInternals = a, Bs(a, f, r, u), a = Ws(null, a, f, !0, S, u)) : (a.tag = 0, Sr && S && Gc(a), ha(null, a, m, u), a = a.child), a;
      case 16:
        f = a.elementType;
        e: {
          switch (Pi(r, a), r = a.pendingProps, m = f._init, f = m(f._payload), a.type = f, m = a.tag = a0(f), r = Ji(f, r), m) {
            case 0:
              a = hh(null, a, f, r, u);
              break e;
            case 1:
              a = mh(null, a, f, r, u);
              break e;
            case 11:
              a = ii(null, a, f, r, u);
              break e;
            case 14:
              a = su(null, a, f, Ji(f.type, r), u);
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
        return f = a.type, m = a.pendingProps, m = a.elementType === f ? m : Ji(f, m), hh(r, a, f, m, u);
      case 1:
        return f = a.type, m = a.pendingProps, m = a.elementType === f ? m : Ji(f, m), mh(r, a, f, m, u);
      case 3:
        e: {
          if (Bu(a), r === null) throw Error(s(387));
          f = a.pendingProps, S = a.memoizedState, m = S.element, oh(r, a), zs(a, f, null, u);
          var _ = a.memoizedState;
          if (f = _.element, S.isDehydrated) if (S = { element: f, isDehydrated: !1, cache: _.cache, pendingSuspenseBoundaries: _.pendingSuspenseBoundaries, transitions: _.transitions }, a.updateQueue.baseState = S, a.memoizedState = S, a.flags & 256) {
            m = uu(Error(s(423)), a), a = yh(r, a, f, u, m);
            break e;
          } else if (f !== m) {
            m = uu(Error(s(424)), a), a = yh(r, a, f, u, m);
            break e;
          } else for (ni = fl(a.stateNode.containerInfo.firstChild), ti = a, Sr = !0, ji = null, u = We(a, null, f, u), a.child = u; u; ) u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (go(), f === m) {
              a = Hi(r, a, u);
              break e;
            }
            ha(r, a, f, u);
          }
          a = a.child;
        }
        return a;
      case 5:
        return sh(a), r === null && Vd(a), f = a.type, m = a.pendingProps, S = r !== null ? r.memoizedProps : null, _ = m.children, Bc(f, m) ? _ = null : S !== null && Bc(f, S) && (a.flags |= 32), ip(r, a), ha(r, a, _, u), a.child;
      case 6:
        return r === null && Vd(a), null;
      case 13:
        return wf(r, a, u);
      case 4:
        return Kd(a, a.stateNode.containerInfo), f = a.pendingProps, r === null ? a.child = zr(a, null, f, u) : ha(r, a, f, u), a.child;
      case 11:
        return f = a.type, m = a.pendingProps, m = a.elementType === f ? m : Ji(f, m), ii(r, a, f, m, u);
      case 7:
        return ha(r, a, a.pendingProps, u), a.child;
      case 8:
        return ha(r, a, a.pendingProps.children, u), a.child;
      case 12:
        return ha(r, a, a.pendingProps.children, u), a.child;
      case 10:
        e: {
          if (f = a.type._context, m = a.pendingProps, S = a.memoizedProps, _ = m.value, yt(Si, f._currentValue), f._currentValue = _, S !== null) if (Xi(S.value, _)) {
            if (S.children === m.children && !Zr.current) {
              a = Hi(r, a, u);
              break e;
            }
          } else for (S = a.child, S !== null && (S.return = a); S !== null; ) {
            var N = S.dependencies;
            if (N !== null) {
              _ = S.child;
              for (var P = N.firstContext; P !== null; ) {
                if (P.context === f) {
                  if (S.tag === 1) {
                    P = Il(-1, u & -u), P.tag = 2;
                    var te = S.updateQueue;
                    if (te !== null) {
                      te = te.shared;
                      var Ce = te.pending;
                      Ce === null ? P.next = P : (P.next = Ce.next, Ce.next = P), te.pending = P;
                    }
                  }
                  S.lanes |= u, P = S.alternate, P !== null && (P.lanes |= u), Yd(
                    S.return,
                    u,
                    a
                  ), N.lanes |= u;
                  break;
                }
                P = P.next;
              }
            } else if (S.tag === 10) _ = S.type === a.type ? null : S.child;
            else if (S.tag === 18) {
              if (_ = S.return, _ === null) throw Error(s(341));
              _.lanes |= u, N = _.alternate, N !== null && (N.lanes |= u), Yd(_, u, a), _ = S.sibling;
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
          ha(r, a, m.children, u), a = a.child;
        }
        return a;
      case 9:
        return m = a.type, f = a.pendingProps.children, wr(a, u), m = Fi(m), f = f(m), a.flags |= 1, ha(r, a, f, u), a.child;
      case 14:
        return f = a.type, m = Ji(f, a.pendingProps), m = Ji(f.type, m), su(r, a, f, m, u);
      case 15:
        return en(r, a, a.type, a.pendingProps, u);
      case 17:
        return f = a.type, m = a.pendingProps, m = a.elementType === f ? m : Ji(f, m), Pi(r, a), a.tag = 1, $r(f) ? (r = !0, aa(a)) : r = !1, wr(a, u), Ef(a, f, m), Bs(a, f, m, u), Ws(null, a, f, !0, r, u);
      case 19:
        return gl(r, a, u);
      case 22:
        return Ys(r, a, u);
    }
    throw Error(s(156, a.tag));
  };
  function Uh(r, a) {
    return pn(r, a);
  }
  function r0(r, a, u, f) {
    this.tag = r, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = f, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Vi(r, a, u, f) {
    return new r0(r, a, u, f);
  }
  function gp(r) {
    return r = r.prototype, !(!r || !r.isReactComponent);
  }
  function a0(r) {
    if (typeof r == "function") return gp(r) ? 1 : 0;
    if (r != null) {
      if (r = r.$$typeof, r === we) return 11;
      if (r === Fe) return 14;
    }
    return 2;
  }
  function bo(r, a) {
    var u = r.alternate;
    return u === null ? (u = Vi(r.tag, a, r.key, r.mode), u.elementType = r.elementType, u.type = r.type, u.stateNode = r.stateNode, u.alternate = r, r.alternate = u) : (u.pendingProps = a, u.type = r.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = r.flags & 14680064, u.childLanes = r.childLanes, u.lanes = r.lanes, u.child = r.child, u.memoizedProps = r.memoizedProps, u.memoizedState = r.memoizedState, u.updateQueue = r.updateQueue, a = r.dependencies, u.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, u.sibling = r.sibling, u.index = r.index, u.ref = r.ref, u;
  }
  function oc(r, a, u, f, m, S) {
    var _ = 2;
    if (f = r, typeof r == "function") gp(r) && (_ = 1);
    else if (typeof r == "string") _ = 5;
    else e: switch (r) {
      case pe:
        return Ql(u.children, m, S, a);
      case Le:
        _ = 8, m |= 8;
        break;
      case he:
        return r = Vi(12, u, a, m | 2), r.elementType = he, r.lanes = S, r;
      case fe:
        return r = Vi(13, u, a, m), r.elementType = fe, r.lanes = S, r;
      case me:
        return r = Vi(19, u, a, m), r.elementType = me, r.lanes = S, r;
      case ge:
        return Mo(u, m, S, a);
      default:
        if (typeof r == "object" && r !== null) switch (r.$$typeof) {
          case ie:
            _ = 10;
            break e;
          case ze:
            _ = 9;
            break e;
          case we:
            _ = 11;
            break e;
          case Fe:
            _ = 14;
            break e;
          case Ue:
            _ = 16, f = null;
            break e;
        }
        throw Error(s(130, r == null ? r : typeof r, ""));
    }
    return a = Vi(_, u, a, m), a.elementType = r, a.type = f, a.lanes = S, a;
  }
  function Ql(r, a, u, f) {
    return r = Vi(7, r, f, a), r.lanes = u, r;
  }
  function Mo(r, a, u, f) {
    return r = Vi(22, r, f, a), r.elementType = ge, r.lanes = u, r.stateNode = { isHidden: !1 }, r;
  }
  function Sp(r, a, u) {
    return r = Vi(6, r, null, a), r.lanes = u, r;
  }
  function zf(r, a, u) {
    return a = Vi(4, r.children !== null ? r.children : [], r.key, a), a.lanes = u, a.stateNode = { containerInfo: r.containerInfo, pendingChildren: null, implementation: r.implementation }, a;
  }
  function jh(r, a, u, f, m) {
    this.tag = a, this.containerInfo = r, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ll(0), this.expirationTimes = ll(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ll(0), this.identifierPrefix = f, this.onRecoverableError = m, this.mutableSourceEagerHydrationData = null;
  }
  function Lf(r, a, u, f, m, S, _, N, P) {
    return r = new jh(r, a, u, N, P), a === 1 ? (a = 1, S === !0 && (a |= 8)) : a = 0, S = Vi(3, null, null, a), r.current = S, S.stateNode = r, S.memoizedState = { element: f, isDehydrated: u, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Gd(S), r;
  }
  function i0(r, a, u) {
    var f = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: re, key: f == null ? null : "" + f, children: r, containerInfo: a, implementation: u };
  }
  function xp(r) {
    if (!r) return Da;
    r = r._reactInternals;
    e: {
      if (Ne(r) !== r || r.tag !== 1) throw Error(s(170));
      var a = r;
      do {
        switch (a.tag) {
          case 3:
            a = a.stateNode.context;
            break e;
          case 1:
            if ($r(a.type)) {
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
      if ($r(u)) return Ds(r, u, a);
    }
    return a;
  }
  function Fh(r, a, u, f, m, S, _, N, P) {
    return r = Lf(u, f, !0, r, m, S, _, N, P), r.context = xp(null), u = r.current, f = Wr(), m = Cl(u), S = Il(f, m), S.callback = a ?? null, So(u, S, m), r.current.lanes = m, pt(r, m, f), ui(r, f), r;
  }
  function Af(r, a, u, f) {
    var m = a.current, S = Wr(), _ = Cl(m);
    return u = xp(u), a.context === null ? a.context = u : a.pendingContext = u, a = Il(S, _), a.payload = { element: r }, f = f === void 0 ? null : f, f !== null && (a.callback = f), r = So(m, a, _), r !== null && (Fa(r, m, _, S), Jc(r, m, _)), _;
  }
  function Nf(r) {
    return r = r.current, r.child ? (r.child.tag === 5, r.child.stateNode) : null;
  }
  function Ep(r, a) {
    if (r = r.memoizedState, r !== null && r.dehydrated !== null) {
      var u = r.retryLane;
      r.retryLane = u !== 0 && u < a ? u : a;
    }
  }
  function Uf(r, a) {
    Ep(r, a), (r = r.alternate) && Ep(r, a);
  }
  function Ph() {
    return null;
  }
  var hu = typeof reportError == "function" ? reportError : function(r) {
    console.error(r);
  };
  function Cp(r) {
    this._internalRoot = r;
  }
  jf.prototype.render = Cp.prototype.render = function(r) {
    var a = this._internalRoot;
    if (a === null) throw Error(s(409));
    Af(r, a, null, null);
  }, jf.prototype.unmount = Cp.prototype.unmount = function() {
    var r = this._internalRoot;
    if (r !== null) {
      this._internalRoot = null;
      var a = r.containerInfo;
      pu(function() {
        Af(null, r, null, null);
      }), a[Pl] = null;
    }
  };
  function jf(r) {
    this._internalRoot = r;
  }
  jf.prototype.unstable_scheduleHydration = function(r) {
    if (r) {
      var a = tt();
      r = { blockedOn: null, target: r, priority: a };
      for (var u = 0; u < Or.length && a !== 0 && a < Or[u].priority; u++) ;
      Or.splice(u, 0, r), u === 0 && Vo(r);
    }
  };
  function Tp(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11);
  }
  function Ff(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11 && (r.nodeType !== 8 || r.nodeValue !== " react-mount-point-unstable "));
  }
  function Hh() {
  }
  function l0(r, a, u, f, m) {
    if (m) {
      if (typeof f == "function") {
        var S = f;
        f = function() {
          var te = Nf(_);
          S.call(te);
        };
      }
      var _ = Fh(a, f, r, 0, null, !1, !1, "", Hh);
      return r._reactRootContainer = _, r[Pl] = _.current, Au(r.nodeType === 8 ? r.parentNode : r), pu(), _;
    }
    for (; m = r.lastChild; ) r.removeChild(m);
    if (typeof f == "function") {
      var N = f;
      f = function() {
        var te = Nf(P);
        N.call(te);
      };
    }
    var P = Lf(r, 0, !1, null, null, !1, !1, "", Hh);
    return r._reactRootContainer = P, r[Pl] = P.current, Au(r.nodeType === 8 ? r.parentNode : r), pu(function() {
      Af(a, P, u, f);
    }), P;
  }
  function uc(r, a, u, f, m) {
    var S = u._reactRootContainer;
    if (S) {
      var _ = S;
      if (typeof m == "function") {
        var N = m;
        m = function() {
          var P = Nf(_);
          N.call(P);
        };
      }
      Af(a, _, r, m);
    } else _ = l0(u, a, r, m, f);
    return Nf(_);
  }
  vt = function(r) {
    switch (r.tag) {
      case 3:
        var a = r.stateNode;
        if (a.current.memoizedState.isDehydrated) {
          var u = Xr(a.pendingLanes);
          u !== 0 && (_r(a, u | 1), ui(a, dt()), (Mn & 6) === 0 && (Qu = dt() + 500, vl()));
        }
        break;
      case 13:
        pu(function() {
          var f = xi(r, 1);
          if (f !== null) {
            var m = Wr();
            Fa(f, r, 1, m);
          }
        }), Uf(r, 1);
    }
  }, Wn = function(r) {
    if (r.tag === 13) {
      var a = xi(r, 134217728);
      if (a !== null) {
        var u = Wr();
        Fa(a, r, 134217728, u);
      }
      Uf(r, 134217728);
    }
  }, Qn = function(r) {
    if (r.tag === 13) {
      var a = Cl(r), u = xi(r, a);
      if (u !== null) {
        var f = Wr();
        Fa(u, r, a, f);
      }
      Uf(r, a);
    }
  }, tt = function() {
    return Qt;
  }, In = function(r, a) {
    var u = Qt;
    try {
      return Qt = r, a();
    } finally {
      Qt = u;
    }
  }, Vt = function(r, a, u) {
    switch (a) {
      case "input":
        if (Nt(r, u), a = u.name, u.type === "radio" && a != null) {
          for (u = r; u.parentNode; ) u = u.parentNode;
          for (u = u.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), a = 0; a < u.length; a++) {
            var f = u[a];
            if (f !== r && f.form === r.form) {
              var m = Tr(f);
              if (!m) throw Error(s(90));
              Hn(f), Nt(f, m);
            }
          }
        }
        break;
      case "textarea":
        Er(r, u);
        break;
      case "select":
        a = u.value, a != null && $t(r, !!u.multiple, a, !1);
    }
  }, dn = hp, cr = pu;
  var o0 = { usingClientEntryPoint: !1, Events: [xt, Ki, Tr, sr, er, hp] }, sc = { findFiberByHostInstance: Go, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, $h = { bundleType: sc.bundleType, version: sc.version, rendererPackageName: sc.rendererPackageName, rendererConfig: sc.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ee.ReactCurrentDispatcher, findHostInstanceByFiber: function(r) {
    return r = ft(r), r === null ? null : r.stateNode;
  }, findFiberByHostInstance: sc.findFiberByHostInstance || Ph, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var _o = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!_o.isDisabled && _o.supportsFiber) try {
      Yn = _o.inject($h), zn = _o;
    } catch {
    }
  }
  return Qi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = o0, Qi.createPortal = function(r, a) {
    var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Tp(a)) throw Error(s(200));
    return i0(r, a, null, u);
  }, Qi.createRoot = function(r, a) {
    if (!Tp(r)) throw Error(s(299));
    var u = !1, f = "", m = hu;
    return a != null && (a.unstable_strictMode === !0 && (u = !0), a.identifierPrefix !== void 0 && (f = a.identifierPrefix), a.onRecoverableError !== void 0 && (m = a.onRecoverableError)), a = Lf(r, 1, !1, null, null, u, !1, f, m), r[Pl] = a.current, Au(r.nodeType === 8 ? r.parentNode : r), new Cp(a);
  }, Qi.findDOMNode = function(r) {
    if (r == null) return null;
    if (r.nodeType === 1) return r;
    var a = r._reactInternals;
    if (a === void 0)
      throw typeof r.render == "function" ? Error(s(188)) : (r = Object.keys(r).join(","), Error(s(268, r)));
    return r = ft(a), r = r === null ? null : r.stateNode, r;
  }, Qi.flushSync = function(r) {
    return pu(r);
  }, Qi.hydrate = function(r, a, u) {
    if (!Ff(a)) throw Error(s(200));
    return uc(null, r, a, !0, u);
  }, Qi.hydrateRoot = function(r, a, u) {
    if (!Tp(r)) throw Error(s(405));
    var f = u != null && u.hydratedSources || null, m = !1, S = "", _ = hu;
    if (u != null && (u.unstable_strictMode === !0 && (m = !0), u.identifierPrefix !== void 0 && (S = u.identifierPrefix), u.onRecoverableError !== void 0 && (_ = u.onRecoverableError)), a = Fh(a, null, r, 1, u ?? null, m, !1, S, _), r[Pl] = a.current, Au(r), f) for (r = 0; r < f.length; r++) u = f[r], m = u._getVersion, m = m(u._source), a.mutableSourceEagerHydrationData == null ? a.mutableSourceEagerHydrationData = [u, m] : a.mutableSourceEagerHydrationData.push(
      u,
      m
    );
    return new jf(a);
  }, Qi.render = function(r, a, u) {
    if (!Ff(a)) throw Error(s(200));
    return uc(null, r, a, !1, u);
  }, Qi.unmountComponentAtNode = function(r) {
    if (!Ff(r)) throw Error(s(40));
    return r._reactRootContainer ? (pu(function() {
      uc(null, null, r, !1, function() {
        r._reactRootContainer = null, r[Pl] = null;
      });
    }), !0) : !1;
  }, Qi.unstable_batchedUpdates = hp, Qi.unstable_renderSubtreeIntoContainer = function(r, a, u, f) {
    if (!Ff(u)) throw Error(s(200));
    if (r == null || r._reactInternals === void 0) throw Error(s(38));
    return uc(r, a, u, !1, f);
  }, Qi.version = "18.3.1-next-f1338f8080-20240426", Qi;
}
var Gi = {};
var hE;
function p4() {
  return hE || (hE = 1, process.env.NODE_ENV !== "production" && (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var n = Mv(), l = VC(), s = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, p = !1;
    function h(e) {
      p = e;
    }
    function y(e) {
      if (!p) {
        for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          i[o - 1] = arguments[o];
        E("warn", e, i);
      }
    }
    function v(e) {
      if (!p) {
        for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          i[o - 1] = arguments[o];
        E("error", e, i);
      }
    }
    function E(e, t, i) {
      {
        var o = s.ReactDebugCurrentFrame, c = o.getStackAddendum();
        c !== "" && (t += "%s", i = i.concat([c]));
        var d = i.map(function(g) {
          return String(g);
        });
        d.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, d);
      }
    }
    var C = 0, T = 1, M = 2, R = 3, D = 4, O = 5, L = 6, j = 7, F = 8, K = 9, J = 10, B = 11, ee = 12, q = 13, re = 14, pe = 15, Le = 16, he = 17, ie = 18, ze = 19, we = 21, fe = 22, me = 23, Fe = 24, Ue = 25, ge = !0, de = !1, Ae = !1, ae = !1, H = !1, ue = !0, Ve = !0, Me = !0, Pe = !0, Ge = /* @__PURE__ */ new Set(), He = {}, Ie = {};
    function Be(e, t) {
      Xt(e, t), Xt(e + "Capture", t);
    }
    function Xt(e, t) {
      He[e] && v("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), He[e] = t;
      {
        var i = e.toLowerCase();
        Ie[i] = e, e === "onDoubleClick" && (Ie.ondblclick = e);
      }
      for (var o = 0; o < t.length; o++)
        Ge.add(t[o]);
    }
    var Tn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Hn = Object.prototype.hasOwnProperty;
    function an(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, i = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return i;
      }
    }
    function _e(e) {
      try {
        return tn(e), !1;
      } catch {
        return !0;
      }
    }
    function tn(e) {
      return "" + e;
    }
    function et(e, t) {
      if (_e(e))
        return v("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, an(e)), tn(e);
    }
    function Nt(e) {
      if (_e(e))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", an(e)), tn(e);
    }
    function Ot(e, t) {
      if (_e(e))
        return v("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, an(e)), tn(e);
    }
    function Ht(e, t) {
      if (_e(e))
        return v("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, an(e)), tn(e);
    }
    function ln(e) {
      if (_e(e))
        return v("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", an(e)), tn(e);
    }
    function $t(e) {
      if (_e(e))
        return v("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", an(e)), tn(e);
    }
    var Sn = 0, $n = 1, Er = 2, $e = 3, on = 4, Vn = 5, pr = 6, mr = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ke = mr + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Ye = new RegExp("^[" + mr + "][" + ke + "]*$"), wt = {}, Kt = {};
    function qt(e) {
      return Hn.call(Kt, e) ? !0 : Hn.call(wt, e) ? !1 : Ye.test(e) ? (Kt[e] = !0, !0) : (wt[e] = !0, v("Invalid attribute name: `%s`", e), !1);
    }
    function xn(e, t, i) {
      return t !== null ? t.type === Sn : i ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function Yt(e, t, i, o) {
      if (i !== null && i.type === Sn)
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
    function un(e, t, i, o) {
      if (t === null || typeof t > "u" || Yt(e, t, i, o))
        return !0;
      if (o)
        return !1;
      if (i !== null)
        switch (i.type) {
          case $e:
            return !t;
          case on:
            return t === !1;
          case Vn:
            return isNaN(t);
          case pr:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Rt(e) {
      return Vt.hasOwnProperty(e) ? Vt[e] : null;
    }
    function zt(e, t, i, o, c, d, g) {
      this.acceptsBooleans = t === Er || t === $e || t === on, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = i, this.propertyName = e, this.type = t, this.sanitizeURL = d, this.removeEmptyString = g;
    }
    var Vt = {}, hn = [
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
    hn.forEach(function(e) {
      Vt[e] = new zt(
        e,
        Sn,
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
      Vt[t] = new zt(
        t,
        $n,
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
      Vt[e] = new zt(
        e,
        Er,
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
      Vt[e] = new zt(
        e,
        Er,
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
      Vt[e] = new zt(
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
      Vt[e] = new zt(
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
      Vt[e] = new zt(
        e,
        on,
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
      Vt[e] = new zt(
        e,
        pr,
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
      Vt[e] = new zt(
        e,
        Vn,
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
    var It = /[\-\:]([a-z])/g, fn = function(e) {
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
      var t = e.replace(It, fn);
      Vt[t] = new zt(
        t,
        $n,
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
      var t = e.replace(It, fn);
      Vt[t] = new zt(
        t,
        $n,
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
      var t = e.replace(It, fn);
      Vt[t] = new zt(
        t,
        $n,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      Vt[e] = new zt(
        e,
        $n,
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
    var sr = "xlinkHref";
    Vt[sr] = new zt(
      "xlinkHref",
      $n,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      Vt[e] = new zt(
        e,
        $n,
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
    var er = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, dn = !1;
    function cr(e) {
      !dn && er.test(e) && (dn = !0, v("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function nn(e, t, i, o) {
      if (o.mustUseProperty) {
        var c = o.propertyName;
        return e[c];
      } else {
        et(i, t), o.sanitizeURL && cr("" + i);
        var d = o.attributeName, g = null;
        if (o.type === on) {
          if (e.hasAttribute(d)) {
            var x = e.getAttribute(d);
            return x === "" ? !0 : un(t, i, o, !1) ? x : x === "" + i ? i : x;
          }
        } else if (e.hasAttribute(d)) {
          if (un(t, i, o, !1))
            return e.getAttribute(d);
          if (o.type === $e)
            return i;
          g = e.getAttribute(d);
        }
        return un(t, i, o, !1) ? g === null ? i : g : g === "" + i ? i : g;
      }
    }
    function yr(e, t, i, o) {
      {
        if (!qt(t))
          return;
        if (!e.hasAttribute(t))
          return i === void 0 ? void 0 : null;
        var c = e.getAttribute(t);
        return et(i, t), c === "" + i ? i : c;
      }
    }
    function sn(e, t, i, o) {
      var c = Rt(t);
      if (!xn(t, c, o)) {
        if (un(t, i, c, o) && (i = null), o || c === null) {
          if (qt(t)) {
            var d = t;
            i === null ? e.removeAttribute(d) : (et(i, t), e.setAttribute(d, "" + i));
          }
          return;
        }
        var g = c.mustUseProperty;
        if (g) {
          var x = c.propertyName;
          if (i === null) {
            var w = c.type;
            e[x] = w === $e ? !1 : "";
          } else
            e[x] = i;
          return;
        }
        var k = c.attributeName, z = c.attributeNamespace;
        if (i === null)
          e.removeAttribute(k);
        else {
          var I = c.type, $;
          I === $e || I === on && i === !0 ? $ = "" : (et(i, k), $ = "" + i, c.sanitizeURL && cr($.toString())), z ? e.setAttributeNS(z, k, $) : e.setAttribute(k, $);
        }
      }
    }
    var Ft = /* @__PURE__ */ Symbol.for("react.element"), Wt = /* @__PURE__ */ Symbol.for("react.portal"), Dn = /* @__PURE__ */ Symbol.for("react.fragment"), On = /* @__PURE__ */ Symbol.for("react.strict_mode"), mn = /* @__PURE__ */ Symbol.for("react.profiler"), Ct = /* @__PURE__ */ Symbol.for("react.provider"), A = /* @__PURE__ */ Symbol.for("react.context"), oe = /* @__PURE__ */ Symbol.for("react.forward_ref"), Se = /* @__PURE__ */ Symbol.for("react.suspense"), be = /* @__PURE__ */ Symbol.for("react.suspense_list"), Ne = /* @__PURE__ */ Symbol.for("react.memo"), qe = /* @__PURE__ */ Symbol.for("react.lazy"), Xe = /* @__PURE__ */ Symbol.for("react.scope"), at = /* @__PURE__ */ Symbol.for("react.debug_trace_mode"), ft = /* @__PURE__ */ Symbol.for("react.offscreen"), Lt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), pn = /* @__PURE__ */ Symbol.for("react.cache"), vn = /* @__PURE__ */ Symbol.for("react.tracing_marker"), En = Symbol.iterator, ir = "@@iterator";
    function dt(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = En && e[En] || e[ir];
      return typeof t == "function" ? t : null;
    }
    var gt = Object.assign, lr = 0, _t, it, kt, Zt, Yn, zn, Cr;
    function Mr() {
    }
    Mr.__reactDisabledLog = !0;
    function ba() {
      {
        if (lr === 0) {
          _t = console.log, it = console.info, kt = console.warn, Zt = console.error, Yn = console.group, zn = console.groupCollapsed, Cr = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Mr,
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
        lr++;
      }
    }
    function Ma() {
      {
        if (lr--, lr === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: gt({}, e, {
              value: _t
            }),
            info: gt({}, e, {
              value: it
            }),
            warn: gt({}, e, {
              value: kt
            }),
            error: gt({}, e, {
              value: Zt
            }),
            group: gt({}, e, {
              value: Yn
            }),
            groupCollapsed: gt({}, e, {
              value: zn
            }),
            groupEnd: gt({}, e, {
              value: Cr
            })
          });
        }
        lr < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var _a = s.ReactCurrentDispatcher, na;
    function Dr(e, t, i) {
      {
        if (na === void 0)
          try {
            throw Error();
          } catch (c) {
            var o = c.stack.trim().match(/\n( *(at )?)/);
            na = o && o[1] || "";
          }
        return `
` + na + e;
      }
    }
    var Xr = !1, tr;
    {
      var fa = typeof WeakMap == "function" ? WeakMap : Map;
      tr = new fa();
    }
    function vi(e, t) {
      if (!e || Xr)
        return "";
      {
        var i = tr.get(e);
        if (i !== void 0)
          return i;
      }
      var o;
      Xr = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var d;
      d = _a.current, _a.current = null, ba();
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
            } catch (ne) {
              o = ne;
            }
            Reflect.construct(e, [], g);
          } else {
            try {
              g.call();
            } catch (ne) {
              o = ne;
            }
            e.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ne) {
            o = ne;
          }
          e();
        }
      } catch (ne) {
        if (ne && o && typeof ne.stack == "string") {
          for (var x = ne.stack.split(`
`), w = o.stack.split(`
`), k = x.length - 1, z = w.length - 1; k >= 1 && z >= 0 && x[k] !== w[z]; )
            z--;
          for (; k >= 1 && z >= 0; k--, z--)
            if (x[k] !== w[z]) {
              if (k !== 1 || z !== 1)
                do
                  if (k--, z--, z < 0 || x[k] !== w[z]) {
                    var I = `
` + x[k].replace(" at new ", " at ");
                    return e.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", e.displayName)), typeof e == "function" && tr.set(e, I), I;
                  }
                while (k >= 1 && z >= 0);
              break;
            }
        }
      } finally {
        Xr = !1, _a.current = d, Ma(), Error.prepareStackTrace = c;
      }
      var $ = e ? e.displayName || e.name : "", Z = $ ? Dr($) : "";
      return typeof e == "function" && tr.set(e, Z), Z;
    }
    function Fr(e, t, i) {
      return vi(e, !0);
    }
    function hi(e, t, i) {
      return vi(e, !1);
    }
    function ll(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function pt(e, t, i) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return vi(e, ll(e));
      if (typeof e == "string")
        return Dr(e);
      switch (e) {
        case Se:
          return Dr("Suspense");
        case be:
          return Dr("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case oe:
            return hi(e.render);
          case Ne:
            return pt(e.type, t, i);
          case qe: {
            var o = e, c = o._payload, d = o._init;
            try {
              return pt(d(c), t, i);
            } catch {
            }
          }
        }
      return "";
    }
    function gr(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case O:
          return Dr(e.type);
        case Le:
          return Dr("Lazy");
        case q:
          return Dr("Suspense");
        case ze:
          return Dr("SuspenseList");
        case C:
        case M:
        case pe:
          return hi(e.type);
        case B:
          return hi(e.type.render);
        case T:
          return Fr(e.type);
        default:
          return "";
      }
    }
    function _r(e) {
      try {
        var t = "", i = e;
        do
          t += gr(i), i = i.return;
        while (i);
        return t;
      } catch (o) {
        return `
Error generating stack: ` + o.message + `
` + o.stack;
      }
    }
    function Qt(e, t, i) {
      var o = e.displayName;
      if (o)
        return o;
      var c = t.displayName || t.name || "";
      return c !== "" ? i + "(" + c + ")" : i;
    }
    function Pr(e) {
      return e.displayName || "Context";
    }
    function vt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case Dn:
          return "Fragment";
        case Wt:
          return "Portal";
        case mn:
          return "Profiler";
        case On:
          return "StrictMode";
        case Se:
          return "Suspense";
        case be:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case A:
            var t = e;
            return Pr(t) + ".Consumer";
          case Ct:
            var i = e;
            return Pr(i._context) + ".Provider";
          case oe:
            return Qt(e, e.render, "ForwardRef");
          case Ne:
            var o = e.displayName || null;
            return o !== null ? o : vt(e.type) || "Memo";
          case qe: {
            var c = e, d = c._payload, g = c._init;
            try {
              return vt(g(d));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Wn(e, t, i) {
      var o = t.displayName || t.name || "";
      return e.displayName || (o !== "" ? i + "(" + o + ")" : i);
    }
    function Qn(e) {
      return e.displayName || "Context";
    }
    function tt(e) {
      var t = e.tag, i = e.type;
      switch (t) {
        case Fe:
          return "Cache";
        case K:
          var o = i;
          return Qn(o) + ".Consumer";
        case J:
          var c = i;
          return Qn(c._context) + ".Provider";
        case ie:
          return "DehydratedFragment";
        case B:
          return Wn(i, i.render, "ForwardRef");
        case j:
          return "Fragment";
        case O:
          return i;
        case D:
          return "Portal";
        case R:
          return "Root";
        case L:
          return "Text";
        case Le:
          return vt(i);
        case F:
          return i === On ? "StrictMode" : "Mode";
        case fe:
          return "Offscreen";
        case ee:
          return "Profiler";
        case we:
          return "Scope";
        case q:
          return "Suspense";
        case ze:
          return "SuspenseList";
        case Ue:
          return "TracingMarker";
        // The display name for this tags come from the user-provided type:
        case T:
        case C:
        case he:
        case M:
        case re:
        case pe:
          if (typeof i == "function")
            return i.displayName || i.name || null;
          if (typeof i == "string")
            return i;
          break;
      }
      return null;
    }
    var In = s.ReactDebugCurrentFrame, rn = null, Kr = !1;
    function Kn() {
      {
        if (rn === null)
          return null;
        var e = rn._debugOwner;
        if (e !== null && typeof e < "u")
          return tt(e);
      }
      return null;
    }
    function mi() {
      return rn === null ? "" : _r(rn);
    }
    function Zn() {
      In.getCurrentStack = null, rn = null, Kr = !1;
    }
    function Bn(e) {
      In.getCurrentStack = e === null ? null : mi, rn = e, Kr = !1;
    }
    function ol() {
      return rn;
    }
    function Or(e) {
      Kr = e;
    }
    function da(e) {
      return "" + e;
    }
    function Qa(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return $t(e), e;
        default:
          return "";
      }
    }
    var Ll = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function $o(e, t) {
      Ll[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || v("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || v("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Vo(e) {
      var t = e.type, i = e.nodeName;
      return i && i.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function ul(e) {
      return e._valueTracker;
    }
    function Al(e) {
      e._valueTracker = null;
    }
    function gs(e) {
      var t = "";
      return e && (Vo(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Ga(e) {
      var t = Vo(e) ? "checked" : "value", i = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      $t(e[t]);
      var o = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof i > "u" || typeof i.get != "function" || typeof i.set != "function")) {
        var c = i.get, d = i.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return c.call(this);
          },
          set: function(x) {
            $t(x), o = "" + x, d.call(this, x);
          }
        }), Object.defineProperty(e, t, {
          enumerable: i.enumerable
        });
        var g = {
          getValue: function() {
            return o;
          },
          setValue: function(x) {
            $t(x), o = "" + x;
          },
          stopTracking: function() {
            Al(e), delete e[t];
          }
        };
        return g;
      }
    }
    function yi(e) {
      ul(e) || (e._valueTracker = Ga(e));
    }
    function Di(e) {
      if (!e)
        return !1;
      var t = ul(e);
      if (!t)
        return !0;
      var i = t.getValue(), o = gs(e);
      return o !== i ? (t.setValue(o), !0) : !1;
    }
    function Xa(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var oo = !1, ka = !1, ra = !1, Aa = !1;
    function Ka(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function Oi(e, t) {
      var i = e, o = t.checked, c = gt({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: o ?? i._wrapperState.initialChecked
      });
      return c;
    }
    function pa(e, t) {
      $o("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !ka && (v("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Kn() || "A component", t.type), ka = !0), t.value !== void 0 && t.defaultValue !== void 0 && !oo && (v("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Kn() || "A component", t.type), oo = !0);
      var i = e, o = t.defaultValue == null ? "" : t.defaultValue;
      i._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Qa(t.value != null ? t.value : o),
        controlled: Ka(t)
      };
    }
    function b(e, t) {
      var i = e, o = t.checked;
      o != null && sn(i, "checked", o, !1);
    }
    function U(e, t) {
      var i = e;
      {
        var o = Ka(t);
        !i._wrapperState.controlled && o && !Aa && (v("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Aa = !0), i._wrapperState.controlled && !o && !ra && (v("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ra = !0);
      }
      b(e, t);
      var c = Qa(t.value), d = t.type;
      if (c != null)
        d === "number" ? (c === 0 && i.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        i.value != c) && (i.value = da(c)) : i.value !== da(c) && (i.value = da(c));
      else if (d === "submit" || d === "reset") {
        i.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? ht(i, t.type, c) : t.hasOwnProperty("defaultValue") && ht(i, t.type, Qa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (i.defaultChecked = !!t.defaultChecked);
    }
    function X(e, t, i) {
      var o = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var c = t.type, d = c === "submit" || c === "reset";
        if (d && (t.value === void 0 || t.value === null))
          return;
        var g = da(o._wrapperState.initialValue);
        i || g !== o.value && (o.value = g), o.defaultValue = g;
      }
      var x = o.name;
      x !== "" && (o.name = ""), o.defaultChecked = !o.defaultChecked, o.defaultChecked = !!o._wrapperState.initialChecked, x !== "" && (o.name = x);
    }
    function le(e, t) {
      var i = e;
      U(i, t), Re(i, t);
    }
    function Re(e, t) {
      var i = t.name;
      if (t.type === "radio" && i != null) {
        for (var o = e; o.parentNode; )
          o = o.parentNode;
        et(i, "name");
        for (var c = o.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'), d = 0; d < c.length; d++) {
          var g = c[d];
          if (!(g === e || g.form !== e.form)) {
            var x = im(g);
            if (!x)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            Di(g), U(g, x);
          }
        }
      }
    }
    function ht(e, t, i) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Xa(e.ownerDocument) !== e) && (i == null ? e.defaultValue = da(e._wrapperState.initialValue) : e.defaultValue !== da(i) && (e.defaultValue = da(i)));
    }
    var ye = !1, St = !1, Jt = !1;
    function yn(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? n.Children.forEach(t.children, function(i) {
        i != null && (typeof i == "string" || typeof i == "number" || St || (St = !0, v("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Jt || (Jt = !0, v("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !ye && (v("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), ye = !0);
    }
    function Jn(e, t) {
      t.value != null && e.setAttribute("value", da(Qa(t.value)));
    }
    var Rn = Array.isArray;
    function bt(e) {
      return Rn(e);
    }
    var qn;
    qn = !1;
    function or() {
      var e = Kn();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var zi = ["value", "defaultValue"];
    function Nl(e) {
      {
        $o("select", e);
        for (var t = 0; t < zi.length; t++) {
          var i = zi[t];
          if (e[i] != null) {
            var o = bt(e[i]);
            e.multiple && !o ? v("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", i, or()) : !e.multiple && o && v("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", i, or());
          }
        }
      }
    }
    function sl(e, t, i, o) {
      var c = e.options;
      if (t) {
        for (var d = i, g = {}, x = 0; x < d.length; x++)
          g["$" + d[x]] = !0;
        for (var w = 0; w < c.length; w++) {
          var k = g.hasOwnProperty("$" + c[w].value);
          c[w].selected !== k && (c[w].selected = k), k && o && (c[w].defaultSelected = !0);
        }
      } else {
        for (var z = da(Qa(i)), I = null, $ = 0; $ < c.length; $++) {
          if (c[$].value === z) {
            c[$].selected = !0, o && (c[$].defaultSelected = !0);
            return;
          }
          I === null && !c[$].disabled && (I = c[$]);
        }
        I !== null && (I.selected = !0);
      }
    }
    function uo(e, t) {
      return gt({}, t, {
        value: void 0
      });
    }
    function Io(e, t) {
      var i = e;
      Nl(t), i._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !qn && (v("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), qn = !0);
    }
    function xd(e, t) {
      var i = e;
      i.multiple = !!t.multiple;
      var o = t.value;
      o != null ? sl(i, !!t.multiple, o, !1) : t.defaultValue != null && sl(i, !!t.multiple, t.defaultValue, !0);
    }
    function Oc(e, t) {
      var i = e, o = i._wrapperState.wasMultiple;
      i._wrapperState.wasMultiple = !!t.multiple;
      var c = t.value;
      c != null ? sl(i, !!t.multiple, c, !1) : o !== !!t.multiple && (t.defaultValue != null ? sl(i, !!t.multiple, t.defaultValue, !0) : sl(i, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function Ed(e, t) {
      var i = e, o = t.value;
      o != null && sl(i, !!t.multiple, o, !1);
    }
    var _v = !1;
    function Cd(e, t) {
      var i = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var o = gt({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: da(i._wrapperState.initialValue)
      });
      return o;
    }
    function Td(e, t) {
      var i = e;
      $o("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !_v && (v("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Kn() || "A component"), _v = !0);
      var o = t.value;
      if (o == null) {
        var c = t.children, d = t.defaultValue;
        if (c != null) {
          v("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (d != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (bt(c)) {
              if (c.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              c = c[0];
            }
            d = c;
          }
        }
        d == null && (d = ""), o = d;
      }
      i._wrapperState = {
        initialValue: Qa(o)
      };
    }
    function kv(e, t) {
      var i = e, o = Qa(t.value), c = Qa(t.defaultValue);
      if (o != null) {
        var d = da(o);
        d !== i.value && (i.value = d), t.defaultValue == null && i.defaultValue !== d && (i.defaultValue = d);
      }
      c != null && (i.defaultValue = da(c));
    }
    function Dv(e, t) {
      var i = e, o = i.textContent;
      o === i._wrapperState.initialValue && o !== "" && o !== null && (i.value = o);
    }
    function Uy(e, t) {
      kv(e, t);
    }
    var Ul = "http://www.w3.org/1999/xhtml", wd = "http://www.w3.org/1998/Math/MathML", Rd = "http://www.w3.org/2000/svg";
    function bd(e) {
      switch (e) {
        case "svg":
          return Rd;
        case "math":
          return wd;
        default:
          return Ul;
      }
    }
    function Md(e, t) {
      return e == null || e === Ul ? bd(t) : e === Rd && t === "foreignObject" ? Ul : e;
    }
    var Ov = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, i, o, c) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, i, o, c);
        });
      } : e;
    }, zc, zv = Ov(function(e, t) {
      if (e.namespaceURI === Rd && !("innerHTML" in e)) {
        zc = zc || document.createElement("div"), zc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var i = zc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; i.firstChild; )
          e.appendChild(i.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Za = 1, jl = 3, Hr = 8, Fl = 9, _d = 11, Du = function(e, t) {
      if (t) {
        var i = e.firstChild;
        if (i && i === e.lastChild && i.nodeType === jl) {
          i.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Ss = {
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
    }, xs = {
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
    function Lv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Av = ["Webkit", "ms", "Moz", "O"];
    Object.keys(xs).forEach(function(e) {
      Av.forEach(function(t) {
        xs[Lv(t, e)] = xs[e];
      });
    });
    function Lc(e, t, i) {
      var o = t == null || typeof t == "boolean" || t === "";
      return o ? "" : !i && typeof t == "number" && t !== 0 && !(xs.hasOwnProperty(e) && xs[e]) ? t + "px" : (Ht(t, e), ("" + t).trim());
    }
    var Nv = /([A-Z])/g, Uv = /^ms-/;
    function Ou(e) {
      return e.replace(Nv, "-$1").toLowerCase().replace(Uv, "-ms-");
    }
    var jv = function() {
    };
    {
      var jy = /^(?:webkit|moz|o)[A-Z]/, Fy = /^-ms-/, Fv = /-(.)/g, kd = /;\s*$/, cl = {}, Bo = {}, Pv = !1, Es = !1, Py = function(e) {
        return e.replace(Fv, function(t, i) {
          return i.toUpperCase();
        });
      }, Hv = function(e) {
        cl.hasOwnProperty(e) && cl[e] || (cl[e] = !0, v(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Py(e.replace(Fy, "ms-"))
        ));
      }, Dd = function(e) {
        cl.hasOwnProperty(e) && cl[e] || (cl[e] = !0, v("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, Od = function(e, t) {
        Bo.hasOwnProperty(t) && Bo[t] || (Bo[t] = !0, v(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(kd, "")));
      }, $v = function(e, t) {
        Pv || (Pv = !0, v("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Vv = function(e, t) {
        Es || (Es = !0, v("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      jv = function(e, t) {
        e.indexOf("-") > -1 ? Hv(e) : jy.test(e) ? Dd(e) : kd.test(t) && Od(e, t), typeof t == "number" && (isNaN(t) ? $v(e, t) : isFinite(t) || Vv(e, t));
      };
    }
    var Iv = jv;
    function Hy(e) {
      {
        var t = "", i = "";
        for (var o in e)
          if (e.hasOwnProperty(o)) {
            var c = e[o];
            if (c != null) {
              var d = o.indexOf("--") === 0;
              t += i + (d ? o : Ou(o)) + ":", t += Lc(o, c, d), i = ";";
            }
          }
        return t || null;
      }
    }
    function Bv(e, t) {
      var i = e.style;
      for (var o in t)
        if (t.hasOwnProperty(o)) {
          var c = o.indexOf("--") === 0;
          c || Iv(o, t[o]);
          var d = Lc(o, t[o], c);
          o === "float" && (o = "cssFloat"), c ? i.setProperty(o, d) : i[o] = d;
        }
    }
    function $y(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function qv(e) {
      var t = {};
      for (var i in e)
        for (var o = Ss[i] || [i], c = 0; c < o.length; c++)
          t[o[c]] = i;
      return t;
    }
    function Vy(e, t) {
      {
        if (!t)
          return;
        var i = qv(e), o = qv(t), c = {};
        for (var d in i) {
          var g = i[d], x = o[d];
          if (x && g !== x) {
            var w = g + "," + x;
            if (c[w])
              continue;
            c[w] = !0, v("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", $y(e[g]) ? "Removing" : "Updating", g, x);
          }
        }
      }
    }
    var Xi = {
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
    }, Cs = gt({
      menuitem: !0
    }, Xi), Yv = "__html";
    function Ac(e, t) {
      if (t) {
        if (Cs[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Yv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && v("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function so(e, t) {
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
    var Ts = {
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
    }, zu = {}, Iy = new RegExp("^(aria)-[" + ke + "]*$"), Lu = new RegExp("^(aria)[A-Z][" + ke + "]*$");
    function zd(e, t) {
      {
        if (Hn.call(zu, t) && zu[t])
          return !0;
        if (Lu.test(t)) {
          var i = "aria-" + t.slice(4).toLowerCase(), o = Nc.hasOwnProperty(i) ? i : null;
          if (o == null)
            return v("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), zu[t] = !0, !0;
          if (t !== o)
            return v("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, o), zu[t] = !0, !0;
        }
        if (Iy.test(t)) {
          var c = t.toLowerCase(), d = Nc.hasOwnProperty(c) ? c : null;
          if (d == null)
            return zu[t] = !0, !1;
          if (t !== d)
            return v("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, d), zu[t] = !0, !0;
        }
      }
      return !0;
    }
    function ws(e, t) {
      {
        var i = [];
        for (var o in t) {
          var c = zd(e, o);
          c || i.push(o);
        }
        var d = i.map(function(g) {
          return "`" + g + "`";
        }).join(", ");
        i.length === 1 ? v("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", d, e) : i.length > 1 && v("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", d, e);
      }
    }
    function Ld(e, t) {
      so(e, t) || ws(e, t);
    }
    var Ad = !1;
    function Uc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !Ad && (Ad = !0, e === "select" && t.multiple ? v("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : v("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var qo = function() {
    };
    {
      var va = {}, Nd = /^on./, jc = /^on[^A-Z]/, Wv = new RegExp("^(aria)-[" + ke + "]*$"), Qv = new RegExp("^(aria)[A-Z][" + ke + "]*$");
      qo = function(e, t, i, o) {
        if (Hn.call(va, t) && va[t])
          return !0;
        var c = t.toLowerCase();
        if (c === "onfocusin" || c === "onfocusout")
          return v("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), va[t] = !0, !0;
        if (o != null) {
          var d = o.registrationNameDependencies, g = o.possibleRegistrationNames;
          if (d.hasOwnProperty(t))
            return !0;
          var x = g.hasOwnProperty(c) ? g[c] : null;
          if (x != null)
            return v("Invalid event handler property `%s`. Did you mean `%s`?", t, x), va[t] = !0, !0;
          if (Nd.test(t))
            return v("Unknown event handler property `%s`. It will be ignored.", t), va[t] = !0, !0;
        } else if (Nd.test(t))
          return jc.test(t) && v("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), va[t] = !0, !0;
        if (Wv.test(t) || Qv.test(t))
          return !0;
        if (c === "innerhtml")
          return v("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), va[t] = !0, !0;
        if (c === "aria")
          return v("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), va[t] = !0, !0;
        if (c === "is" && i !== null && i !== void 0 && typeof i != "string")
          return v("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof i), va[t] = !0, !0;
        if (typeof i == "number" && isNaN(i))
          return v("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), va[t] = !0, !0;
        var w = Rt(t), k = w !== null && w.type === Sn;
        if (Ts.hasOwnProperty(c)) {
          var z = Ts[c];
          if (z !== t)
            return v("Invalid DOM property `%s`. Did you mean `%s`?", t, z), va[t] = !0, !0;
        } else if (!k && t !== c)
          return v("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, c), va[t] = !0, !0;
        return typeof i == "boolean" && Yt(t, i, w, !1) ? (i ? v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', i, t, t, i, t) : v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', i, t, t, i, t, t, t), va[t] = !0, !0) : k ? !0 : Yt(t, i, w, !1) ? (va[t] = !0, !1) : ((i === "false" || i === "true") && w !== null && w.type === $e && (v("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", i, t, i === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, i), va[t] = !0), !0);
      };
    }
    var Gv = function(e, t, i) {
      {
        var o = [];
        for (var c in t) {
          var d = qo(e, c, t[c], i);
          d || o.push(c);
        }
        var g = o.map(function(x) {
          return "`" + x + "`";
        }).join(", ");
        o.length === 1 ? v("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", g, e) : o.length > 1 && v("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", g, e);
      }
    };
    function Xv(e, t, i) {
      so(e, t) || Gv(e, t, i);
    }
    var Ud = 1, Fc = 2, Li = 4, jd = Ud | Fc | Li, Yo = null;
    function By(e) {
      Yo !== null && v("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Yo = e;
    }
    function qy() {
      Yo === null && v("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Yo = null;
    }
    function Rs(e) {
      return e === Yo;
    }
    function Fd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === jl ? t.parentNode : t;
    }
    var Pc = null, Wo = null, Gn = null;
    function Hc(e) {
      var t = es(e);
      if (t) {
        if (typeof Pc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var i = t.stateNode;
        if (i) {
          var o = im(i);
          Pc(t.stateNode, t.type, o);
        }
      }
    }
    function $c(e) {
      Pc = e;
    }
    function Au(e) {
      Wo ? Gn ? Gn.push(e) : Gn = [e] : Wo = e;
    }
    function Kv() {
      return Wo !== null || Gn !== null;
    }
    function Vc() {
      if (Wo) {
        var e = Wo, t = Gn;
        if (Wo = null, Gn = null, Hc(e), t)
          for (var i = 0; i < t.length; i++)
            Hc(t[i]);
      }
    }
    var Nu = function(e, t) {
      return e(t);
    }, bs = function() {
    }, co = !1;
    function Zv() {
      var e = Kv();
      e && (bs(), Vc());
    }
    function Jv(e, t, i) {
      if (co)
        return e(t, i);
      co = !0;
      try {
        return Nu(e, t, i);
      } finally {
        co = !1, Zv();
      }
    }
    function Yy(e, t, i) {
      Nu = e, bs = i;
    }
    function eh(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Ic(e, t, i) {
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
          return !!(i.disabled && eh(t));
        default:
          return !1;
      }
    }
    function fo(e, t) {
      var i = e.stateNode;
      if (i === null)
        return null;
      var o = im(i);
      if (o === null)
        return null;
      var c = o[t];
      if (Ic(t, e.type, o))
        return null;
      if (c && typeof c != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof c + "` type.");
      return c;
    }
    var Ms = !1;
    if (Tn)
      try {
        var Qo = {};
        Object.defineProperty(Qo, "passive", {
          get: function() {
            Ms = !0;
          }
        }), window.addEventListener("test", Qo, Qo), window.removeEventListener("test", Qo, Qo);
      } catch {
        Ms = !1;
      }
    function Bc(e, t, i, o, c, d, g, x, w) {
      var k = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(i, k);
      } catch (z) {
        this.onError(z);
      }
    }
    var qc = Bc;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Pd = document.createElement("react");
      qc = function(t, i, o, c, d, g, x, w, k) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var z = document.createEvent("Event"), I = !1, $ = !0, Z = window.event, ne = Object.getOwnPropertyDescriptor(window, "event");
        function se() {
          Pd.removeEventListener(ce, Tt, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = Z);
        }
        var Qe = Array.prototype.slice.call(arguments, 3);
        function Tt() {
          I = !0, se(), i.apply(o, Qe), $ = !1;
        }
        var mt, kn = !1, Cn = !1;
        function W(Q) {
          if (mt = Q.error, kn = !0, mt === null && Q.colno === 0 && Q.lineno === 0 && (Cn = !0), Q.defaultPrevented && mt != null && typeof mt == "object")
            try {
              mt._suppressLogging = !0;
            } catch {
            }
        }
        var ce = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", W), Pd.addEventListener(ce, Tt, !1), z.initEvent(ce, !1, !1), Pd.dispatchEvent(z), ne && Object.defineProperty(window, "event", ne), I && $ && (kn ? Cn && (mt = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : mt = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(mt)), window.removeEventListener("error", W), !I)
          return se(), Bc.apply(this, arguments);
      };
    }
    var th = qc, Uu = !1, Yc = null, ju = !1, fl = null, nh = {
      onError: function(e) {
        Uu = !0, Yc = e;
      }
    };
    function po(e, t, i, o, c, d, g, x, w) {
      Uu = !1, Yc = null, th.apply(nh, arguments);
    }
    function dl(e, t, i, o, c, d, g, x, w) {
      if (po.apply(this, arguments), Uu) {
        var k = ks();
        ju || (ju = !0, fl = k);
      }
    }
    function _s() {
      if (ju) {
        var e = fl;
        throw ju = !1, fl = null, e;
      }
    }
    function Pl() {
      return Uu;
    }
    function ks() {
      if (Uu) {
        var e = Yc;
        return Uu = !1, Yc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Fu(e) {
      return e._reactInternals;
    }
    function Wy(e) {
      return e._reactInternals !== void 0;
    }
    function Go(e, t) {
      e._reactInternals = t;
    }
    var xt = (
      /*                      */
      0
    ), Ki = (
      /*                */
      1
    ), Tr = (
      /*                    */
      2
    ), bn = (
      /*                       */
      4
    ), Ai = (
      /*                */
      16
    ), Ni = (
      /*                 */
      32
    ), fr = (
      /*                     */
      64
    ), yt = (
      /*                   */
      128
    ), Da = (
      /*            */
      256
    ), kr = (
      /*                          */
      512
    ), Zr = (
      /*                     */
      1024
    ), Ja = (
      /*                      */
      2048
    ), ei = (
      /*                    */
      4096
    ), $r = (
      /*                   */
      8192
    ), Pu = (
      /*             */
      16384
    ), rh = (
      /*               */
      32767
    ), Ds = (
      /*                   */
      32768
    ), aa = (
      /*                */
      65536
    ), Wc = (
      /* */
      131072
    ), pl = (
      /*                       */
      1048576
    ), Hu = (
      /*                    */
      2097152
    ), Hl = (
      /*                 */
      4194304
    ), Qc = (
      /*                */
      8388608
    ), vo = (
      /*               */
      16777216
    ), vl = (
      /*              */
      33554432
    ), ho = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      bn | Zr | 0
    ), mo = Tr | bn | Ai | Ni | kr | ei | $r, yo = bn | fr | kr | $r, $l = Ja | Ai, Vr = Hl | Qc | Hu, Ui = s.ReactCurrentOwner;
    function gi(e) {
      var t = e, i = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var o = t;
        do
          t = o, (t.flags & (Tr | ei)) !== xt && (i = t.return), o = t.return;
        while (o);
      }
      return t.tag === R ? i : null;
    }
    function hl(e) {
      if (e.tag === q) {
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
    function ml(e) {
      return e.tag === R ? e.stateNode.containerInfo : null;
    }
    function Xo(e) {
      return gi(e) === e;
    }
    function ah(e) {
      {
        var t = Ui.current;
        if (t !== null && t.tag === T) {
          var i = t, o = i.stateNode;
          o._warnedAboutRefsInRender || v("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", tt(i) || "A component"), o._warnedAboutRefsInRender = !0;
        }
      }
      var c = Fu(e);
      return c ? gi(c) === c : !1;
    }
    function Gc(e) {
      if (gi(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Xc(e) {
      var t = e.alternate;
      if (!t) {
        var i = gi(e);
        if (i === null)
          throw new Error("Unable to find node on an unmounted component.");
        return i !== e ? null : e;
      }
      for (var o = e, c = t; ; ) {
        var d = o.return;
        if (d === null)
          break;
        var g = d.alternate;
        if (g === null) {
          var x = d.return;
          if (x !== null) {
            o = c = x;
            continue;
          }
          break;
        }
        if (d.child === g.child) {
          for (var w = d.child; w; ) {
            if (w === o)
              return Gc(d), e;
            if (w === c)
              return Gc(d), t;
            w = w.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (o.return !== c.return)
          o = d, c = g;
        else {
          for (var k = !1, z = d.child; z; ) {
            if (z === o) {
              k = !0, o = d, c = g;
              break;
            }
            if (z === c) {
              k = !0, c = d, o = g;
              break;
            }
            z = z.sibling;
          }
          if (!k) {
            for (z = g.child; z; ) {
              if (z === o) {
                k = !0, o = g, c = d;
                break;
              }
              if (z === c) {
                k = !0, c = g, o = d;
                break;
              }
              z = z.sibling;
            }
            if (!k)
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
    function ti(e) {
      var t = Xc(e);
      return t !== null ? ni(t) : null;
    }
    function ni(e) {
      if (e.tag === O || e.tag === L)
        return e;
      for (var t = e.child; t !== null; ) {
        var i = ni(t);
        if (i !== null)
          return i;
        t = t.sibling;
      }
      return null;
    }
    function Sr(e) {
      var t = Xc(e);
      return t !== null ? ji(t) : null;
    }
    function ji(e) {
      if (e.tag === O || e.tag === L)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== D) {
          var i = ji(t);
          if (i !== null)
            return i;
        }
        t = t.sibling;
      }
      return null;
    }
    var Hd = l.unstable_scheduleCallback, ih = l.unstable_cancelCallback, $d = l.unstable_shouldYield, Vd = l.unstable_requestPaint, Jr = l.unstable_now, Kc = l.unstable_getCurrentPriorityLevel, Os = l.unstable_ImmediatePriority, go = l.unstable_UserBlockingPriority, Vl = l.unstable_NormalPriority, Qy = l.unstable_LowPriority, Ko = l.unstable_IdlePriority, Zc = l.unstable_yieldValue, lh = l.unstable_setDisableYieldValue, Zo = null, zr = null, We = null, Si = !1, ri = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function $u(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return v("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        Ve && (e = gt({}, e, {
          getLaneLabelMap: Jo,
          injectProfilingHooks: Fi
        })), Zo = t.inject(e), zr = t;
      } catch (i) {
        v("React instrumentation encountered an error: %s.", i);
      }
      return !!t.checkDCE;
    }
    function Id(e, t) {
      if (zr && typeof zr.onScheduleFiberRoot == "function")
        try {
          zr.onScheduleFiberRoot(Zo, e, t);
        } catch (i) {
          Si || (Si = !0, v("React instrumentation encountered an error: %s", i));
        }
    }
    function Bd(e, t) {
      if (zr && typeof zr.onCommitFiberRoot == "function")
        try {
          var i = (e.current.flags & yt) === yt;
          if (Me) {
            var o;
            switch (t) {
              case Na:
                o = Os;
                break;
              case gl:
                o = go;
                break;
              case Pi:
                o = Vl;
                break;
              case Hi:
                o = Ko;
                break;
              default:
                o = Vl;
                break;
            }
            zr.onCommitFiberRoot(Zo, e, o, i);
          }
        } catch (c) {
          Si || (Si = !0, v("React instrumentation encountered an error: %s", c));
        }
    }
    function qd(e) {
      if (zr && typeof zr.onPostCommitFiberRoot == "function")
        try {
          zr.onPostCommitFiberRoot(Zo, e);
        } catch (t) {
          Si || (Si = !0, v("React instrumentation encountered an error: %s", t));
        }
    }
    function Yd(e) {
      if (zr && typeof zr.onCommitFiberUnmount == "function")
        try {
          zr.onCommitFiberUnmount(Zo, e);
        } catch (t) {
          Si || (Si = !0, v("React instrumentation encountered an error: %s", t));
        }
    }
    function wr(e) {
      if (typeof Zc == "function" && (lh(e), h(e)), zr && typeof zr.setStrictMode == "function")
        try {
          zr.setStrictMode(Zo, e);
        } catch (t) {
          Si || (Si = !0, v("React instrumentation encountered an error: %s", t));
        }
    }
    function Fi(e) {
      We = e;
    }
    function Jo() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, i = 0; i < nu; i++) {
          var o = ch(t);
          e.set(t, o), t *= 2;
        }
        return e;
      }
    }
    function Wd(e) {
      We !== null && typeof We.markCommitStarted == "function" && We.markCommitStarted(e);
    }
    function Qd() {
      We !== null && typeof We.markCommitStopped == "function" && We.markCommitStopped();
    }
    function xi(e) {
      We !== null && typeof We.markComponentRenderStarted == "function" && We.markComponentRenderStarted(e);
    }
    function Ei() {
      We !== null && typeof We.markComponentRenderStopped == "function" && We.markComponentRenderStopped();
    }
    function Gd(e) {
      We !== null && typeof We.markComponentPassiveEffectMountStarted == "function" && We.markComponentPassiveEffectMountStarted(e);
    }
    function oh() {
      We !== null && typeof We.markComponentPassiveEffectMountStopped == "function" && We.markComponentPassiveEffectMountStopped();
    }
    function Il(e) {
      We !== null && typeof We.markComponentPassiveEffectUnmountStarted == "function" && We.markComponentPassiveEffectUnmountStarted(e);
    }
    function So() {
      We !== null && typeof We.markComponentPassiveEffectUnmountStopped == "function" && We.markComponentPassiveEffectUnmountStopped();
    }
    function Jc(e) {
      We !== null && typeof We.markComponentLayoutEffectMountStarted == "function" && We.markComponentLayoutEffectMountStarted(e);
    }
    function uh() {
      We !== null && typeof We.markComponentLayoutEffectMountStopped == "function" && We.markComponentLayoutEffectMountStopped();
    }
    function zs(e) {
      We !== null && typeof We.markComponentLayoutEffectUnmountStarted == "function" && We.markComponentLayoutEffectUnmountStarted(e);
    }
    function Xd() {
      We !== null && typeof We.markComponentLayoutEffectUnmountStopped == "function" && We.markComponentLayoutEffectUnmountStopped();
    }
    function Ls(e, t, i) {
      We !== null && typeof We.markComponentErrored == "function" && We.markComponentErrored(e, t, i);
    }
    function yl(e, t, i) {
      We !== null && typeof We.markComponentSuspended == "function" && We.markComponentSuspended(e, t, i);
    }
    function As(e) {
      We !== null && typeof We.markLayoutEffectsStarted == "function" && We.markLayoutEffectsStarted(e);
    }
    function Ns() {
      We !== null && typeof We.markLayoutEffectsStopped == "function" && We.markLayoutEffectsStopped();
    }
    function eu(e) {
      We !== null && typeof We.markPassiveEffectsStarted == "function" && We.markPassiveEffectsStarted(e);
    }
    function Kd() {
      We !== null && typeof We.markPassiveEffectsStopped == "function" && We.markPassiveEffectsStopped();
    }
    function tu(e) {
      We !== null && typeof We.markRenderStarted == "function" && We.markRenderStarted(e);
    }
    function sh() {
      We !== null && typeof We.markRenderYielded == "function" && We.markRenderYielded();
    }
    function ef() {
      We !== null && typeof We.markRenderStopped == "function" && We.markRenderStopped();
    }
    function Rr(e) {
      We !== null && typeof We.markRenderScheduled == "function" && We.markRenderScheduled(e);
    }
    function tf(e, t) {
      We !== null && typeof We.markForceUpdateScheduled == "function" && We.markForceUpdateScheduled(e, t);
    }
    function Us(e, t) {
      We !== null && typeof We.markStateUpdateScheduled == "function" && We.markStateUpdateScheduled(e, t);
    }
    var Et = (
      /*                         */
      0
    ), cn = (
      /*                 */
      1
    ), An = (
      /*                    */
      2
    ), nr = (
      /*               */
      8
    ), Nn = (
      /*              */
      16
    ), Ir = Math.clz32 ? Math.clz32 : js, ia = Math.log, nf = Math.LN2;
    function js(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (ia(t) / nf | 0) | 0;
    }
    var nu = 31, xe = (
      /*                        */
      0
    ), Ln = (
      /*                          */
      0
    ), Ut = (
      /*                        */
      1
    ), xo = (
      /*    */
      2
    ), Zi = (
      /*             */
      4
    ), Oa = (
      /*            */
      8
    ), Lr = (
      /*                     */
      16
    ), Bl = (
      /*                */
      32
    ), Eo = (
      /*                       */
      4194240
    ), ru = (
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
    ), au = (
      /*                       */
      32768
    ), df = (
      /*                       */
      65536
    ), Vu = (
      /*                       */
      131072
    ), Iu = (
      /*                       */
      262144
    ), pf = (
      /*                       */
      524288
    ), Fs = (
      /*                       */
      1048576
    ), vf = (
      /*                       */
      2097152
    ), Ps = (
      /*                            */
      130023424
    ), iu = (
      /*                             */
      4194304
    ), hf = (
      /*                             */
      8388608
    ), Hs = (
      /*                             */
      16777216
    ), mf = (
      /*                             */
      33554432
    ), yf = (
      /*                             */
      67108864
    ), Zd = iu, $s = (
      /*          */
      134217728
    ), Jd = (
      /*                          */
      268435455
    ), Vs = (
      /*               */
      268435456
    ), lu = (
      /*                        */
      536870912
    ), ai = (
      /*                   */
      1073741824
    );
    function ch(e) {
      {
        if (e & Ut)
          return "Sync";
        if (e & xo)
          return "InputContinuousHydration";
        if (e & Zi)
          return "InputContinuous";
        if (e & Oa)
          return "DefaultHydration";
        if (e & Lr)
          return "Default";
        if (e & Bl)
          return "TransitionHydration";
        if (e & Eo)
          return "Transition";
        if (e & Ps)
          return "Retry";
        if (e & $s)
          return "SelectiveHydration";
        if (e & Vs)
          return "IdleHydration";
        if (e & lu)
          return "Idle";
        if (e & ai)
          return "Offscreen";
      }
    }
    var ur = -1, ou = ru, gf = iu;
    function Is(e) {
      switch (Co(e)) {
        case Ut:
          return Ut;
        case xo:
          return xo;
        case Zi:
          return Zi;
        case Oa:
          return Oa;
        case Lr:
          return Lr;
        case Bl:
          return Bl;
        case ru:
        case rf:
        case af:
        case lf:
        case of:
        case uf:
        case sf:
        case cf:
        case ff:
        case au:
        case df:
        case Vu:
        case Iu:
        case pf:
        case Fs:
        case vf:
          return e & Eo;
        case iu:
        case hf:
        case Hs:
        case mf:
        case yf:
          return e & Ps;
        case $s:
          return $s;
        case Vs:
          return Vs;
        case lu:
          return lu;
        case ai:
          return ai;
        default:
          return v("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function Sf(e, t) {
      var i = e.pendingLanes;
      if (i === xe)
        return xe;
      var o = xe, c = e.suspendedLanes, d = e.pingedLanes, g = i & Jd;
      if (g !== xe) {
        var x = g & ~c;
        if (x !== xe)
          o = Is(x);
        else {
          var w = g & d;
          w !== xe && (o = Is(w));
        }
      } else {
        var k = i & ~c;
        k !== xe ? o = Is(k) : d !== xe && (o = Is(d));
      }
      if (o === xe)
        return xe;
      if (t !== xe && t !== o && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & c) === xe) {
        var z = Co(o), I = Co(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          z >= I || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          z === Lr && (I & Eo) !== xe
        )
          return t;
      }
      (o & Zi) !== xe && (o |= i & Lr);
      var $ = e.entangledLanes;
      if ($ !== xe)
        for (var Z = e.entanglements, ne = o & $; ne > 0; ) {
          var se = Br(ne), Qe = 1 << se;
          o |= Z[se], ne &= ~Qe;
        }
      return o;
    }
    function Ji(e, t) {
      for (var i = e.eventTimes, o = ur; t > 0; ) {
        var c = Br(t), d = 1 << c, g = i[c];
        g > o && (o = g), t &= ~d;
      }
      return o;
    }
    function ep(e, t) {
      switch (e) {
        case Ut:
        case xo:
        case Zi:
          return t + 250;
        case Oa:
        case Lr:
        case Bl:
        case ru:
        case rf:
        case af:
        case lf:
        case of:
        case uf:
        case sf:
        case cf:
        case ff:
        case au:
        case df:
        case Vu:
        case Iu:
        case pf:
        case Fs:
        case vf:
          return t + 5e3;
        case iu:
        case hf:
        case Hs:
        case mf:
        case yf:
          return ur;
        case $s:
        case Vs:
        case lu:
        case ai:
          return ur;
        default:
          return v("Should have found matching lanes. This is a bug in React."), ur;
      }
    }
    function xf(e, t) {
      for (var i = e.pendingLanes, o = e.suspendedLanes, c = e.pingedLanes, d = e.expirationTimes, g = i; g > 0; ) {
        var x = Br(g), w = 1 << x, k = d[x];
        k === ur ? ((w & o) === xe || (w & c) !== xe) && (d[x] = ep(w, t)) : k <= t && (e.expiredLanes |= w), g &= ~w;
      }
    }
    function fh(e) {
      return Is(e.pendingLanes);
    }
    function Ef(e) {
      var t = e.pendingLanes & ~ai;
      return t !== xe ? t : t & ai ? ai : xe;
    }
    function dh(e) {
      return (e & Ut) !== xe;
    }
    function Bs(e) {
      return (e & Jd) !== xe;
    }
    function uu(e) {
      return (e & Ps) === e;
    }
    function tp(e) {
      var t = Ut | Zi | Lr;
      return (e & t) === xe;
    }
    function np(e) {
      return (e & Eo) === e;
    }
    function Cf(e, t) {
      var i = xo | Zi | Oa | Lr;
      return (t & i) !== xe;
    }
    function ph(e, t) {
      return (t & e.expiredLanes) !== xe;
    }
    function rp(e) {
      return (e & Eo) !== xe;
    }
    function ap() {
      var e = ou;
      return ou <<= 1, (ou & Eo) === xe && (ou = ru), e;
    }
    function vh() {
      var e = gf;
      return gf <<= 1, (gf & Ps) === xe && (gf = iu), e;
    }
    function Co(e) {
      return e & -e;
    }
    function qs(e) {
      return Co(e);
    }
    function Br(e) {
      return 31 - Ir(e);
    }
    function ha(e) {
      return Br(e);
    }
    function ii(e, t) {
      return (e & t) !== xe;
    }
    function su(e, t) {
      return (e & t) === t;
    }
    function en(e, t) {
      return e | t;
    }
    function Ys(e, t) {
      return e & ~t;
    }
    function ip(e, t) {
      return e & t;
    }
    function hh(e) {
      return e;
    }
    function mh(e, t) {
      return e !== Ln && e < t ? e : t;
    }
    function Ws(e) {
      for (var t = [], i = 0; i < nu; i++)
        t.push(e);
      return t;
    }
    function Bu(e, t, i) {
      e.pendingLanes |= t, t !== lu && (e.suspendedLanes = xe, e.pingedLanes = xe);
      var o = e.eventTimes, c = ha(t);
      o[c] = i;
    }
    function yh(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var i = e.expirationTimes, o = t; o > 0; ) {
        var c = Br(o), d = 1 << c;
        i[c] = ur, o &= ~d;
      }
    }
    function Tf(e, t, i) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function lp(e, t) {
      var i = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = xe, e.pingedLanes = xe, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var o = e.entanglements, c = e.eventTimes, d = e.expirationTimes, g = i; g > 0; ) {
        var x = Br(g), w = 1 << x;
        o[x] = xe, c[x] = ur, d[x] = ur, g &= ~w;
      }
    }
    function wf(e, t) {
      for (var i = e.entangledLanes |= t, o = e.entanglements, c = i; c; ) {
        var d = Br(c), g = 1 << d;
        // Is this one of the newly entangled lanes?
        g & t | // Is this lane transitively entangled with the newly entangled lanes?
        o[d] & t && (o[d] |= t), c &= ~g;
      }
    }
    function op(e, t) {
      var i = Co(t), o;
      switch (i) {
        case Zi:
          o = xo;
          break;
        case Lr:
          o = Oa;
          break;
        case ru:
        case rf:
        case af:
        case lf:
        case of:
        case uf:
        case sf:
        case cf:
        case ff:
        case au:
        case df:
        case Vu:
        case Iu:
        case pf:
        case Fs:
        case vf:
        case iu:
        case hf:
        case Hs:
        case mf:
        case yf:
          o = Bl;
          break;
        case lu:
          o = Vs;
          break;
        default:
          o = Ln;
          break;
      }
      return (o & (e.suspendedLanes | t)) !== Ln ? Ln : o;
    }
    function Qs(e, t, i) {
      if (ri)
        for (var o = e.pendingUpdatersLaneMap; i > 0; ) {
          var c = ha(i), d = 1 << c, g = o[c];
          g.add(t), i &= ~d;
        }
    }
    function gh(e, t) {
      if (ri)
        for (var i = e.pendingUpdatersLaneMap, o = e.memoizedUpdaters; t > 0; ) {
          var c = ha(t), d = 1 << c, g = i[c];
          g.size > 0 && (g.forEach(function(x) {
            var w = x.alternate;
            (w === null || !o.has(w)) && o.add(x);
          }), g.clear()), t &= ~d;
        }
    }
    function up(e, t) {
      return null;
    }
    var Na = Ut, gl = Zi, Pi = Lr, Hi = lu, Gs = Ln;
    function $i() {
      return Gs;
    }
    function qr(e) {
      Gs = e;
    }
    function Sh(e, t) {
      var i = Gs;
      try {
        return Gs = e, t();
      } finally {
        Gs = i;
      }
    }
    function xh(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function Xs(e, t) {
      return e > t ? e : t;
    }
    function la(e, t) {
      return e !== 0 && e < t;
    }
    function Eh(e) {
      var t = Co(e);
      return la(Na, t) ? la(gl, t) ? Bs(t) ? Pi : Hi : gl : Na;
    }
    function Rf(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var Ks;
    function za(e) {
      Ks = e;
    }
    function Gy(e) {
      Ks(e);
    }
    var rt;
    function qu(e) {
      rt = e;
    }
    var bf;
    function Ch(e) {
      bf = e;
    }
    var Th;
    function Zs(e) {
      Th = e;
    }
    var Js;
    function sp(e) {
      Js = e;
    }
    var Mf = !1, ec = [], ql = null, Sl = null, xl = null, Ar = /* @__PURE__ */ new Map(), Ua = /* @__PURE__ */ new Map(), ja = [], wh = [
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
    function Rh(e) {
      return wh.indexOf(e) > -1;
    }
    function el(e, t, i, o, c) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: i,
        nativeEvent: c,
        targetContainers: [o]
      };
    }
    function cp(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          ql = null;
          break;
        case "dragenter":
        case "dragleave":
          Sl = null;
          break;
        case "mouseover":
        case "mouseout":
          xl = null;
          break;
        case "pointerover":
        case "pointerout": {
          var i = t.pointerId;
          Ar.delete(i);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var o = t.pointerId;
          Ua.delete(o);
          break;
        }
      }
    }
    function li(e, t, i, o, c, d) {
      if (e === null || e.nativeEvent !== d) {
        var g = el(t, i, o, c, d);
        if (t !== null) {
          var x = es(t);
          x !== null && rt(x);
        }
        return g;
      }
      e.eventSystemFlags |= o;
      var w = e.targetContainers;
      return c !== null && w.indexOf(c) === -1 && w.push(c), e;
    }
    function Xy(e, t, i, o, c) {
      switch (t) {
        case "focusin": {
          var d = c;
          return ql = li(ql, e, t, i, o, d), !0;
        }
        case "dragenter": {
          var g = c;
          return Sl = li(Sl, e, t, i, o, g), !0;
        }
        case "mouseover": {
          var x = c;
          return xl = li(xl, e, t, i, o, x), !0;
        }
        case "pointerover": {
          var w = c, k = w.pointerId;
          return Ar.set(k, li(Ar.get(k) || null, e, t, i, o, w)), !0;
        }
        case "gotpointercapture": {
          var z = c, I = z.pointerId;
          return Ua.set(I, li(Ua.get(I) || null, e, t, i, o, z)), !0;
        }
      }
      return !1;
    }
    function fp(e) {
      var t = dc(e.target);
      if (t !== null) {
        var i = gi(t);
        if (i !== null) {
          var o = i.tag;
          if (o === q) {
            var c = hl(i);
            if (c !== null) {
              e.blockedOn = c, Js(e.priority, function() {
                bf(i);
              });
              return;
            }
          } else if (o === R) {
            var d = i.stateNode;
            if (Rf(d)) {
              e.blockedOn = ml(i);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function bh(e) {
      for (var t = Th(), i = {
        blockedOn: null,
        target: e,
        priority: t
      }, o = 0; o < ja.length && la(t, ja[o].priority); o++)
        ;
      ja.splice(o, 0, i), o === 0 && fp(i);
    }
    function tc(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var i = t[0], o = Wu(e.domEventName, e.eventSystemFlags, i, e.nativeEvent);
        if (o === null) {
          var c = e.nativeEvent, d = new c.constructor(c.type, c);
          By(d), c.target.dispatchEvent(d), qy();
        } else {
          var g = es(o);
          return g !== null && rt(g), e.blockedOn = o, !1;
        }
        t.shift();
      }
      return !0;
    }
    function dp(e, t, i) {
      tc(e) && i.delete(t);
    }
    function Ky() {
      Mf = !1, ql !== null && tc(ql) && (ql = null), Sl !== null && tc(Sl) && (Sl = null), xl !== null && tc(xl) && (xl = null), Ar.forEach(dp), Ua.forEach(dp);
    }
    function To(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Mf || (Mf = !0, l.unstable_scheduleCallback(l.unstable_NormalPriority, Ky)));
    }
    function cu(e) {
      if (ec.length > 0) {
        To(ec[0], e);
        for (var t = 1; t < ec.length; t++) {
          var i = ec[t];
          i.blockedOn === e && (i.blockedOn = null);
        }
      }
      ql !== null && To(ql, e), Sl !== null && To(Sl, e), xl !== null && To(xl, e);
      var o = function(x) {
        return To(x, e);
      };
      Ar.forEach(o), Ua.forEach(o);
      for (var c = 0; c < ja.length; c++) {
        var d = ja[c];
        d.blockedOn === e && (d.blockedOn = null);
      }
      for (; ja.length > 0; ) {
        var g = ja[0];
        if (g.blockedOn !== null)
          break;
        fp(g), g.blockedOn === null && ja.shift();
      }
    }
    var ma = s.ReactCurrentBatchConfig, Mn = !0;
    function ea(e) {
      Mn = !!e;
    }
    function Yr() {
      return Mn;
    }
    function ya(e, t, i) {
      var o = _f(t), c;
      switch (o) {
        case Na:
          c = Ci;
          break;
        case gl:
          c = Yu;
          break;
        case Pi:
        default:
          c = Nr;
          break;
      }
      return c.bind(null, t, i, e);
    }
    function Ci(e, t, i, o) {
      var c = $i(), d = ma.transition;
      ma.transition = null;
      try {
        qr(Na), Nr(e, t, i, o);
      } finally {
        qr(c), ma.transition = d;
      }
    }
    function Yu(e, t, i, o) {
      var c = $i(), d = ma.transition;
      ma.transition = null;
      try {
        qr(gl), Nr(e, t, i, o);
      } finally {
        qr(c), ma.transition = d;
      }
    }
    function Nr(e, t, i, o) {
      Mn && nc(e, t, i, o);
    }
    function nc(e, t, i, o) {
      var c = Wu(e, t, i, o);
      if (c === null) {
        v0(e, t, o, El, i), cp(e, o);
        return;
      }
      if (Xy(c, e, t, i, o)) {
        o.stopPropagation();
        return;
      }
      if (cp(e, o), t & Li && Rh(e)) {
        for (; c !== null; ) {
          var d = es(c);
          d !== null && Gy(d);
          var g = Wu(e, t, i, o);
          if (g === null && v0(e, t, o, El, i), g === c)
            break;
          c = g;
        }
        c !== null && o.stopPropagation();
        return;
      }
      v0(e, t, o, null, i);
    }
    var El = null;
    function Wu(e, t, i, o) {
      El = null;
      var c = Fd(o), d = dc(c);
      if (d !== null) {
        var g = gi(d);
        if (g === null)
          d = null;
        else {
          var x = g.tag;
          if (x === q) {
            var w = hl(g);
            if (w !== null)
              return w;
            d = null;
          } else if (x === R) {
            var k = g.stateNode;
            if (Rf(k))
              return ml(g);
            d = null;
          } else g !== d && (d = null);
        }
      }
      return El = d, null;
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
          return Na;
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
          return gl;
        case "message": {
          var t = Kc();
          switch (t) {
            case Os:
              return Na;
            case go:
              return gl;
            case Vl:
            case Qy:
              return Pi;
            case Ko:
              return Hi;
            default:
              return Pi;
          }
        }
        default:
          return Pi;
      }
    }
    function rc(e, t, i) {
      return e.addEventListener(t, i, !1), i;
    }
    function oi(e, t, i) {
      return e.addEventListener(t, i, !0), i;
    }
    function pp(e, t, i, o) {
      return e.addEventListener(t, i, {
        capture: !0,
        passive: o
      }), i;
    }
    function Qu(e, t, i, o) {
      return e.addEventListener(t, i, {
        passive: o
      }), i;
    }
    var Ti = null, Gu = null, fu = null;
    function wo(e) {
      return Ti = e, Gu = ac(), !0;
    }
    function kf() {
      Ti = null, Gu = null, fu = null;
    }
    function Yl() {
      if (fu)
        return fu;
      var e, t = Gu, i = t.length, o, c = ac(), d = c.length;
      for (e = 0; e < i && t[e] === c[e]; e++)
        ;
      var g = i - e;
      for (o = 1; o <= g && t[i - o] === c[d - o]; o++)
        ;
      var x = o > 1 ? 1 - o : void 0;
      return fu = c.slice(e, x), fu;
    }
    function ac() {
      return "value" in Ti ? Ti.value : Ti.textContent;
    }
    function Ro(e) {
      var t, i = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && i === 13 && (t = 13)) : t = i, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function Xu() {
      return !0;
    }
    function ic() {
      return !1;
    }
    function La(e) {
      function t(i, o, c, d, g) {
        this._reactName = i, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = g, this.currentTarget = null;
        for (var x in e)
          if (e.hasOwnProperty(x)) {
            var w = e[x];
            w ? this[x] = w(d) : this[x] = d[x];
          }
        var k = d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1;
        return k ? this.isDefaultPrevented = Xu : this.isDefaultPrevented = ic, this.isPropagationStopped = ic, this;
      }
      return gt(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var i = this.nativeEvent;
          i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Xu);
        },
        stopPropagation: function() {
          var i = this.nativeEvent;
          i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Xu);
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
        isPersistent: Xu
      }), t;
    }
    var Wr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Cl = La(Wr), Fa = gt({}, Wr, {
      view: 0,
      detail: 0
    }), ui = La(Fa), Df, lc, du;
    function Zy(e) {
      e !== du && (du && e.type === "mousemove" ? (Df = e.screenX - du.screenX, lc = e.screenY - du.screenY) : (Df = 0, lc = 0), du = e);
    }
    var tl = gt({}, Fa, {
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
      getModifierState: xr,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (Zy(e), Df);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : lc;
      }
    }), vp = La(tl), hp = gt({}, tl, {
      dataTransfer: 0
    }), pu = La(hp), mp = gt({}, Fa, {
      relatedTarget: 0
    }), Wl = La(mp), Mh = gt({}, Wr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), _h = La(Mh), yp = gt({}, Wr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Of = La(yp), Jy = gt({}, Wr, {
      data: 0
    }), kh = La(Jy), Dh = kh, Oh = {
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
    }, vu = {
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
        var t = Oh[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var i = Ro(e);
        return i === 13 ? "Enter" : String.fromCharCode(i);
      }
      return e.type === "keydown" || e.type === "keyup" ? vu[e.keyCode] || "Unidentified" : "";
    }
    var Ku = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function zh(e) {
      var t = this, i = t.nativeEvent;
      if (i.getModifierState)
        return i.getModifierState(e);
      var o = Ku[e];
      return o ? !!i[o] : !1;
    }
    function xr(e) {
      return zh;
    }
    var t0 = gt({}, Fa, {
      key: e0,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: xr,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Ro(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Ro(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Lh = La(t0), n0 = gt({}, tl, {
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
    }), Ah = La(n0), Nh = gt({}, Fa, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: xr
    }), Uh = La(Nh), r0 = gt({}, Wr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Vi = La(r0), gp = gt({}, tl, {
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
    }), a0 = La(gp), bo = [9, 13, 27, 32], oc = 229, Ql = Tn && "CompositionEvent" in window, Mo = null;
    Tn && "documentMode" in document && (Mo = document.documentMode);
    var Sp = Tn && "TextEvent" in window && !Mo, zf = Tn && (!Ql || Mo && Mo > 8 && Mo <= 11), jh = 32, Lf = String.fromCharCode(jh);
    function i0() {
      Be("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Be("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Be("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Be("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var xp = !1;
    function Fh(e) {
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
      return e === "keydown" && t.keyCode === oc;
    }
    function Ep(e, t) {
      switch (e) {
        case "keyup":
          return bo.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== oc;
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
    function Ph(e) {
      return e.locale === "ko";
    }
    var hu = !1;
    function Cp(e, t, i, o, c) {
      var d, g;
      if (Ql ? d = Af(t) : hu ? Ep(t, o) && (d = "onCompositionEnd") : Nf(t, o) && (d = "onCompositionStart"), !d)
        return null;
      zf && !Ph(o) && (!hu && d === "onCompositionStart" ? hu = wo(c) : d === "onCompositionEnd" && hu && (g = Yl()));
      var x = Yh(i, d);
      if (x.length > 0) {
        var w = new kh(d, t, null, o, c);
        if (e.push({
          event: w,
          listeners: x
        }), g)
          w.data = g;
        else {
          var k = Uf(o);
          k !== null && (w.data = k);
        }
      }
    }
    function jf(e, t) {
      switch (e) {
        case "compositionend":
          return Uf(t);
        case "keypress":
          var i = t.which;
          return i !== jh ? null : (xp = !0, Lf);
        case "textInput":
          var o = t.data;
          return o === Lf && xp ? null : o;
        default:
          return null;
      }
    }
    function Tp(e, t) {
      if (hu) {
        if (e === "compositionend" || !Ql && Ep(e, t)) {
          var i = Yl();
          return kf(), hu = !1, i;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Fh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return zf && !Ph(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Ff(e, t, i, o, c) {
      var d;
      if (Sp ? d = jf(t, o) : d = Tp(t, o), !d)
        return null;
      var g = Yh(i, "onBeforeInput");
      if (g.length > 0) {
        var x = new Dh("onBeforeInput", "beforeinput", null, o, c);
        e.push({
          event: x,
          listeners: g
        }), x.data = d;
      }
    }
    function Hh(e, t, i, o, c, d, g) {
      Cp(e, t, i, o, c), Ff(e, t, i, o, c);
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
    function uc(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!l0[e.type] : t === "textarea";
    }
    function o0(e) {
      if (!Tn)
        return !1;
      var t = "on" + e, i = t in document;
      if (!i) {
        var o = document.createElement("div");
        o.setAttribute(t, "return;"), i = typeof o[t] == "function";
      }
      return i;
    }
    function sc() {
      Be("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function $h(e, t, i, o) {
      Au(o);
      var c = Yh(t, "onChange");
      if (c.length > 0) {
        var d = new Cl("onChange", "change", null, i, o);
        e.push({
          event: d,
          listeners: c
        });
      }
    }
    var _o = null, r = null;
    function a(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function u(e) {
      var t = [];
      $h(t, r, e, Fd(e)), Jv(f, t);
    }
    function f(e) {
      LS(e, 0);
    }
    function m(e) {
      var t = Bf(e);
      if (Di(t))
        return e;
    }
    function S(e, t) {
      if (e === "change")
        return t;
    }
    var _ = !1;
    Tn && (_ = o0("input") && (!document.documentMode || document.documentMode > 9));
    function N(e, t) {
      _o = e, r = t, _o.attachEvent("onpropertychange", te);
    }
    function P() {
      _o && (_o.detachEvent("onpropertychange", te), _o = null, r = null);
    }
    function te(e) {
      e.propertyName === "value" && m(r) && u(e);
    }
    function Ce(e, t, i) {
      e === "focusin" ? (P(), N(t, i)) : e === "focusout" && P();
    }
    function De(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return m(r);
    }
    function Ee(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function Ze(e, t) {
      if (e === "click")
        return m(t);
    }
    function lt(e, t) {
      if (e === "input" || e === "change")
        return m(t);
    }
    function st(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || ht(e, "number", e.value);
    }
    function Ur(e, t, i, o, c, d, g) {
      var x = i ? Bf(i) : window, w, k;
      if (a(x) ? w = S : uc(x) ? _ ? w = lt : (w = De, k = Ce) : Ee(x) && (w = Ze), w) {
        var z = w(t, i);
        if (z) {
          $h(e, z, o, c);
          return;
        }
      }
      k && k(t, x, i), t === "focusout" && st(x);
    }
    function Y() {
      Xt("onMouseEnter", ["mouseout", "mouseover"]), Xt("onMouseLeave", ["mouseout", "mouseover"]), Xt("onPointerEnter", ["pointerout", "pointerover"]), Xt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function V(e, t, i, o, c, d, g) {
      var x = t === "mouseover" || t === "pointerover", w = t === "mouseout" || t === "pointerout";
      if (x && !Rs(o)) {
        var k = o.relatedTarget || o.fromElement;
        if (k && (dc(k) || jp(k)))
          return;
      }
      if (!(!w && !x)) {
        var z;
        if (c.window === c)
          z = c;
        else {
          var I = c.ownerDocument;
          I ? z = I.defaultView || I.parentWindow : z = window;
        }
        var $, Z;
        if (w) {
          var ne = o.relatedTarget || o.toElement;
          if ($ = i, Z = ne ? dc(ne) : null, Z !== null) {
            var se = gi(Z);
            (Z !== se || Z.tag !== O && Z.tag !== L) && (Z = null);
          }
        } else
          $ = null, Z = i;
        if ($ !== Z) {
          var Qe = vp, Tt = "onMouseLeave", mt = "onMouseEnter", kn = "mouse";
          (t === "pointerout" || t === "pointerover") && (Qe = Ah, Tt = "onPointerLeave", mt = "onPointerEnter", kn = "pointer");
          var Cn = $ == null ? z : Bf($), W = Z == null ? z : Bf(Z), ce = new Qe(Tt, kn + "leave", $, o, c);
          ce.target = Cn, ce.relatedTarget = W;
          var Q = null, Oe = dc(c);
          if (Oe === i) {
            var nt = new Qe(mt, kn + "enter", Z, o, c);
            nt.target = W, nt.relatedTarget = Cn, Q = nt;
          }
          oT(e, ce, Q, $, Z);
        }
      }
    }
    function G(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Te = typeof Object.is == "function" ? Object.is : G;
    function ot(e, t) {
      if (Te(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var i = Object.keys(e), o = Object.keys(t);
      if (i.length !== o.length)
        return !1;
      for (var c = 0; c < i.length; c++) {
        var d = i[c];
        if (!Hn.call(t, d) || !Te(e[d], t[d]))
          return !1;
      }
      return !0;
    }
    function Mt(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Dt(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Pt(e, t) {
      for (var i = Mt(e), o = 0, c = 0; i; ) {
        if (i.nodeType === jl) {
          if (c = o + i.textContent.length, o <= t && c >= t)
            return {
              node: i,
              offset: t - o
            };
          o = c;
        }
        i = Mt(Dt(i));
      }
    }
    function oa(e) {
      var t = e.ownerDocument, i = t && t.defaultView || window, o = i.getSelection && i.getSelection();
      if (!o || o.rangeCount === 0)
        return null;
      var c = o.anchorNode, d = o.anchorOffset, g = o.focusNode, x = o.focusOffset;
      try {
        c.nodeType, g.nodeType;
      } catch {
        return null;
      }
      return Un(e, c, d, g, x);
    }
    function Un(e, t, i, o, c) {
      var d = 0, g = -1, x = -1, w = 0, k = 0, z = e, I = null;
      e: for (; ; ) {
        for (var $ = null; z === t && (i === 0 || z.nodeType === jl) && (g = d + i), z === o && (c === 0 || z.nodeType === jl) && (x = d + c), z.nodeType === jl && (d += z.nodeValue.length), ($ = z.firstChild) !== null; )
          I = z, z = $;
        for (; ; ) {
          if (z === e)
            break e;
          if (I === t && ++w === i && (g = d), I === o && ++k === c && (x = d), ($ = z.nextSibling) !== null)
            break;
          z = I, I = z.parentNode;
        }
        z = $;
      }
      return g === -1 || x === -1 ? null : {
        start: g,
        end: x
      };
    }
    function ko(e, t) {
      var i = e.ownerDocument || document, o = i && i.defaultView || window;
      if (o.getSelection) {
        var c = o.getSelection(), d = e.textContent.length, g = Math.min(t.start, d), x = t.end === void 0 ? g : Math.min(t.end, d);
        if (!c.extend && g > x) {
          var w = x;
          x = g, g = w;
        }
        var k = Pt(e, g), z = Pt(e, x);
        if (k && z) {
          if (c.rangeCount === 1 && c.anchorNode === k.node && c.anchorOffset === k.offset && c.focusNode === z.node && c.focusOffset === z.offset)
            return;
          var I = i.createRange();
          I.setStart(k.node, k.offset), c.removeAllRanges(), g > x ? (c.addRange(I), c.extend(z.node, z.offset)) : (I.setEnd(z.node, z.offset), c.addRange(I));
        }
      }
    }
    function Vh(e) {
      return e && e.nodeType === jl;
    }
    function CS(e, t) {
      return !e || !t ? !1 : e === t ? !0 : Vh(e) ? !1 : Vh(t) ? CS(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function IC(e) {
      return e && e.ownerDocument && CS(e.ownerDocument.documentElement, e);
    }
    function BC(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function TS() {
      for (var e = window, t = Xa(); t instanceof e.HTMLIFrameElement; ) {
        if (BC(t))
          e = t.contentWindow;
        else
          return t;
        t = Xa(e.document);
      }
      return t;
    }
    function u0(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function qC() {
      var e = TS();
      return {
        focusedElem: e,
        selectionRange: u0(e) ? WC(e) : null
      };
    }
    function YC(e) {
      var t = TS(), i = e.focusedElem, o = e.selectionRange;
      if (t !== i && IC(i)) {
        o !== null && u0(i) && QC(i, o);
        for (var c = [], d = i; d = d.parentNode; )
          d.nodeType === Za && c.push({
            element: d,
            left: d.scrollLeft,
            top: d.scrollTop
          });
        typeof i.focus == "function" && i.focus();
        for (var g = 0; g < c.length; g++) {
          var x = c[g];
          x.element.scrollLeft = x.left, x.element.scrollTop = x.top;
        }
      }
    }
    function WC(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = oa(e), t || {
        start: 0,
        end: 0
      };
    }
    function QC(e, t) {
      var i = t.start, o = t.end;
      o === void 0 && (o = i), "selectionStart" in e ? (e.selectionStart = i, e.selectionEnd = Math.min(o, e.value.length)) : ko(e, t);
    }
    var GC = Tn && "documentMode" in document && document.documentMode <= 11;
    function XC() {
      Be("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Pf = null, s0 = null, wp = null, c0 = !1;
    function KC(e) {
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
    function ZC(e) {
      return e.window === e ? e.document : e.nodeType === Fl ? e : e.ownerDocument;
    }
    function wS(e, t, i) {
      var o = ZC(i);
      if (!(c0 || Pf == null || Pf !== Xa(o))) {
        var c = KC(Pf);
        if (!wp || !ot(wp, c)) {
          wp = c;
          var d = Yh(s0, "onSelect");
          if (d.length > 0) {
            var g = new Cl("onSelect", "select", null, t, i);
            e.push({
              event: g,
              listeners: d
            }), g.target = Pf;
          }
        }
      }
    }
    function JC(e, t, i, o, c, d, g) {
      var x = i ? Bf(i) : window;
      switch (t) {
        // Track the input node that has focus.
        case "focusin":
          (uc(x) || x.contentEditable === "true") && (Pf = x, s0 = i, wp = null);
          break;
        case "focusout":
          Pf = null, s0 = null, wp = null;
          break;
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case "mousedown":
          c0 = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          c0 = !1, wS(e, o, c);
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
          if (GC)
            break;
        // falls through
        case "keydown":
        case "keyup":
          wS(e, o, c);
      }
    }
    function Ih(e, t) {
      var i = {};
      return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
    }
    var Hf = {
      animationend: Ih("Animation", "AnimationEnd"),
      animationiteration: Ih("Animation", "AnimationIteration"),
      animationstart: Ih("Animation", "AnimationStart"),
      transitionend: Ih("Transition", "TransitionEnd")
    }, f0 = {}, RS = {};
    Tn && (RS = document.createElement("div").style, "AnimationEvent" in window || (delete Hf.animationend.animation, delete Hf.animationiteration.animation, delete Hf.animationstart.animation), "TransitionEvent" in window || delete Hf.transitionend.transition);
    function Bh(e) {
      if (f0[e])
        return f0[e];
      if (!Hf[e])
        return e;
      var t = Hf[e];
      for (var i in t)
        if (t.hasOwnProperty(i) && i in RS)
          return f0[e] = t[i];
      return e;
    }
    var bS = Bh("animationend"), MS = Bh("animationiteration"), _S = Bh("animationstart"), kS = Bh("transitionend"), DS = /* @__PURE__ */ new Map(), OS = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function Zu(e, t) {
      DS.set(e, t), Be(t, [e]);
    }
    function eT() {
      for (var e = 0; e < OS.length; e++) {
        var t = OS[e], i = t.toLowerCase(), o = t[0].toUpperCase() + t.slice(1);
        Zu(i, "on" + o);
      }
      Zu(bS, "onAnimationEnd"), Zu(MS, "onAnimationIteration"), Zu(_S, "onAnimationStart"), Zu("dblclick", "onDoubleClick"), Zu("focusin", "onFocus"), Zu("focusout", "onBlur"), Zu(kS, "onTransitionEnd");
    }
    function tT(e, t, i, o, c, d, g) {
      var x = DS.get(t);
      if (x !== void 0) {
        var w = Cl, k = t;
        switch (t) {
          case "keypress":
            if (Ro(o) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            w = Lh;
            break;
          case "focusin":
            k = "focus", w = Wl;
            break;
          case "focusout":
            k = "blur", w = Wl;
            break;
          case "beforeblur":
          case "afterblur":
            w = Wl;
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
            w = vp;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = pu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = Uh;
            break;
          case bS:
          case MS:
          case _S:
            w = _h;
            break;
          case kS:
            w = Vi;
            break;
          case "scroll":
            w = ui;
            break;
          case "wheel":
            w = a0;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = Of;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = Ah;
            break;
        }
        var z = (d & Li) !== 0;
        {
          var I = !z && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", $ = iT(i, x, o.type, z, I);
          if ($.length > 0) {
            var Z = new w(x, k, null, o, c);
            e.push({
              event: Z,
              listeners: $
            });
          }
        }
      }
    }
    eT(), Y(), sc(), XC(), i0();
    function nT(e, t, i, o, c, d, g) {
      tT(e, t, i, o, c, d);
      var x = (d & jd) === 0;
      x && (V(e, t, i, o, c), Ur(e, t, i, o, c), JC(e, t, i, o, c), Hh(e, t, i, o, c));
    }
    var Rp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], d0 = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Rp));
    function zS(e, t, i) {
      var o = e.type || "unknown-event";
      e.currentTarget = i, dl(o, t, void 0, e), e.currentTarget = null;
    }
    function rT(e, t, i) {
      var o;
      if (i)
        for (var c = t.length - 1; c >= 0; c--) {
          var d = t[c], g = d.instance, x = d.currentTarget, w = d.listener;
          if (g !== o && e.isPropagationStopped())
            return;
          zS(e, w, x), o = g;
        }
      else
        for (var k = 0; k < t.length; k++) {
          var z = t[k], I = z.instance, $ = z.currentTarget, Z = z.listener;
          if (I !== o && e.isPropagationStopped())
            return;
          zS(e, Z, $), o = I;
        }
    }
    function LS(e, t) {
      for (var i = (t & Li) !== 0, o = 0; o < e.length; o++) {
        var c = e[o], d = c.event, g = c.listeners;
        rT(d, g, i);
      }
      _s();
    }
    function aT(e, t, i, o, c) {
      var d = Fd(i), g = [];
      nT(g, e, o, i, d, t), LS(g, t);
    }
    function br(e, t) {
      d0.has(e) || v('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var i = !1, o = Aw(t), c = uT(e);
      o.has(c) || (AS(t, e, Fc, i), o.add(c));
    }
    function p0(e, t, i) {
      d0.has(e) && !t && v('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var o = 0;
      t && (o |= Li), AS(i, e, o, t);
    }
    var qh = "_reactListening" + Math.random().toString(36).slice(2);
    function bp(e) {
      if (!e[qh]) {
        e[qh] = !0, Ge.forEach(function(i) {
          i !== "selectionchange" && (d0.has(i) || p0(i, !1, e), p0(i, !0, e));
        });
        var t = e.nodeType === Fl ? e : e.ownerDocument;
        t !== null && (t[qh] || (t[qh] = !0, p0("selectionchange", !1, t)));
      }
    }
    function AS(e, t, i, o, c) {
      var d = ya(e, t, i), g = void 0;
      Ms && (t === "touchstart" || t === "touchmove" || t === "wheel") && (g = !0), e = e, o ? g !== void 0 ? pp(e, t, d, g) : oi(e, t, d) : g !== void 0 ? Qu(e, t, d, g) : rc(e, t, d);
    }
    function NS(e, t) {
      return e === t || e.nodeType === Hr && e.parentNode === t;
    }
    function v0(e, t, i, o, c) {
      var d = o;
      if ((t & Ud) === 0 && (t & Fc) === 0) {
        var g = c;
        if (o !== null) {
          var x = o;
          e: for (; ; ) {
            if (x === null)
              return;
            var w = x.tag;
            if (w === R || w === D) {
              var k = x.stateNode.containerInfo;
              if (NS(k, g))
                break;
              if (w === D)
                for (var z = x.return; z !== null; ) {
                  var I = z.tag;
                  if (I === R || I === D) {
                    var $ = z.stateNode.containerInfo;
                    if (NS($, g))
                      return;
                  }
                  z = z.return;
                }
              for (; k !== null; ) {
                var Z = dc(k);
                if (Z === null)
                  return;
                var ne = Z.tag;
                if (ne === O || ne === L) {
                  x = d = Z;
                  continue e;
                }
                k = k.parentNode;
              }
            }
            x = x.return;
          }
        }
      }
      Jv(function() {
        return aT(e, t, i, d);
      });
    }
    function Mp(e, t, i) {
      return {
        instance: e,
        listener: t,
        currentTarget: i
      };
    }
    function iT(e, t, i, o, c, d) {
      for (var g = t !== null ? t + "Capture" : null, x = o ? g : t, w = [], k = e, z = null; k !== null; ) {
        var I = k, $ = I.stateNode, Z = I.tag;
        if (Z === O && $ !== null && (z = $, x !== null)) {
          var ne = fo(k, x);
          ne != null && w.push(Mp(k, ne, z));
        }
        if (c)
          break;
        k = k.return;
      }
      return w;
    }
    function Yh(e, t) {
      for (var i = t + "Capture", o = [], c = e; c !== null; ) {
        var d = c, g = d.stateNode, x = d.tag;
        if (x === O && g !== null) {
          var w = g, k = fo(c, i);
          k != null && o.unshift(Mp(c, k, w));
          var z = fo(c, t);
          z != null && o.push(Mp(c, z, w));
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
      while (e && e.tag !== O);
      return e || null;
    }
    function lT(e, t) {
      for (var i = e, o = t, c = 0, d = i; d; d = $f(d))
        c++;
      for (var g = 0, x = o; x; x = $f(x))
        g++;
      for (; c - g > 0; )
        i = $f(i), c--;
      for (; g - c > 0; )
        o = $f(o), g--;
      for (var w = c; w--; ) {
        if (i === o || o !== null && i === o.alternate)
          return i;
        i = $f(i), o = $f(o);
      }
      return null;
    }
    function US(e, t, i, o, c) {
      for (var d = t._reactName, g = [], x = i; x !== null && x !== o; ) {
        var w = x, k = w.alternate, z = w.stateNode, I = w.tag;
        if (k !== null && k === o)
          break;
        if (I === O && z !== null) {
          var $ = z;
          if (c) {
            var Z = fo(x, d);
            Z != null && g.unshift(Mp(x, Z, $));
          } else if (!c) {
            var ne = fo(x, d);
            ne != null && g.push(Mp(x, ne, $));
          }
        }
        x = x.return;
      }
      g.length !== 0 && e.push({
        event: t,
        listeners: g
      });
    }
    function oT(e, t, i, o, c) {
      var d = o && c ? lT(o, c) : null;
      o !== null && US(e, t, o, d, !1), c !== null && i !== null && US(e, i, c, d, !0);
    }
    function uT(e, t) {
      return e + "__bubble";
    }
    var Ii = !1, _p = "dangerouslySetInnerHTML", Wh = "suppressContentEditableWarning", Ju = "suppressHydrationWarning", jS = "autoFocus", cc = "children", fc = "style", Qh = "__html", h0, Gh, kp, FS, Xh, PS, HS;
    h0 = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Gh = function(e, t) {
      Ld(e, t), Uc(e, t), Xv(e, t, {
        registrationNameDependencies: He,
        possibleRegistrationNames: Ie
      });
    }, PS = Tn && !document.documentMode, kp = function(e, t, i) {
      if (!Ii) {
        var o = Kh(i), c = Kh(t);
        c !== o && (Ii = !0, v("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(c), JSON.stringify(o)));
      }
    }, FS = function(e) {
      if (!Ii) {
        Ii = !0;
        var t = [];
        e.forEach(function(i) {
          t.push(i);
        }), v("Extra attributes from the server: %s", t);
      }
    }, Xh = function(e, t) {
      t === !1 ? v("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : v("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, HS = function(e, t) {
      var i = e.namespaceURI === Ul ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return i.innerHTML = t, i.innerHTML;
    };
    var sT = /\r\n?/g, cT = /\u0000|\uFFFD/g;
    function Kh(e) {
      ln(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(sT, `
`).replace(cT, "");
    }
    function Zh(e, t, i, o) {
      var c = Kh(t), d = Kh(e);
      if (d !== c && (o && (Ii || (Ii = !0, v('Text content did not match. Server: "%s" Client: "%s"', d, c))), i && ge))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function $S(e) {
      return e.nodeType === Fl ? e : e.ownerDocument;
    }
    function fT() {
    }
    function Jh(e) {
      e.onclick = fT;
    }
    function dT(e, t, i, o, c) {
      for (var d in o)
        if (o.hasOwnProperty(d)) {
          var g = o[d];
          if (d === fc)
            g && Object.freeze(g), Bv(t, g);
          else if (d === _p) {
            var x = g ? g[Qh] : void 0;
            x != null && zv(t, x);
          } else if (d === cc)
            if (typeof g == "string") {
              var w = e !== "textarea" || g !== "";
              w && Du(t, g);
            } else typeof g == "number" && Du(t, "" + g);
          else d === Wh || d === Ju || d === jS || (He.hasOwnProperty(d) ? g != null && (typeof g != "function" && Xh(d, g), d === "onScroll" && br("scroll", t)) : g != null && sn(t, d, g, c));
        }
    }
    function pT(e, t, i, o) {
      for (var c = 0; c < t.length; c += 2) {
        var d = t[c], g = t[c + 1];
        d === fc ? Bv(e, g) : d === _p ? zv(e, g) : d === cc ? Du(e, g) : sn(e, d, g, o);
      }
    }
    function vT(e, t, i, o) {
      var c, d = $S(i), g, x = o;
      if (x === Ul && (x = bd(e)), x === Ul) {
        if (c = so(e, t), !c && e !== e.toLowerCase() && v("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var w = d.createElement("div");
          w.innerHTML = "<script><\/script>";
          var k = w.firstChild;
          g = w.removeChild(k);
        } else if (typeof t.is == "string")
          g = d.createElement(e, {
            is: t.is
          });
        else if (g = d.createElement(e), e === "select") {
          var z = g;
          t.multiple ? z.multiple = !0 : t.size && (z.size = t.size);
        }
      } else
        g = d.createElementNS(x, e);
      return x === Ul && !c && Object.prototype.toString.call(g) === "[object HTMLUnknownElement]" && !Hn.call(h0, e) && (h0[e] = !0, v("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), g;
    }
    function hT(e, t) {
      return $S(t).createTextNode(e);
    }
    function mT(e, t, i, o) {
      var c = so(t, i);
      Gh(t, i);
      var d;
      switch (t) {
        case "dialog":
          br("cancel", e), br("close", e), d = i;
          break;
        case "iframe":
        case "object":
        case "embed":
          br("load", e), d = i;
          break;
        case "video":
        case "audio":
          for (var g = 0; g < Rp.length; g++)
            br(Rp[g], e);
          d = i;
          break;
        case "source":
          br("error", e), d = i;
          break;
        case "img":
        case "image":
        case "link":
          br("error", e), br("load", e), d = i;
          break;
        case "details":
          br("toggle", e), d = i;
          break;
        case "input":
          pa(e, i), d = Oi(e, i), br("invalid", e);
          break;
        case "option":
          yn(e, i), d = i;
          break;
        case "select":
          Io(e, i), d = uo(e, i), br("invalid", e);
          break;
        case "textarea":
          Td(e, i), d = Cd(e, i), br("invalid", e);
          break;
        default:
          d = i;
      }
      switch (Ac(t, d), dT(t, e, o, d, c), t) {
        case "input":
          yi(e), X(e, i, !1);
          break;
        case "textarea":
          yi(e), Dv(e);
          break;
        case "option":
          Jn(e, i);
          break;
        case "select":
          xd(e, i);
          break;
        default:
          typeof d.onClick == "function" && Jh(e);
          break;
      }
    }
    function yT(e, t, i, o, c) {
      Gh(t, o);
      var d = null, g, x;
      switch (t) {
        case "input":
          g = Oi(e, i), x = Oi(e, o), d = [];
          break;
        case "select":
          g = uo(e, i), x = uo(e, o), d = [];
          break;
        case "textarea":
          g = Cd(e, i), x = Cd(e, o), d = [];
          break;
        default:
          g = i, x = o, typeof g.onClick != "function" && typeof x.onClick == "function" && Jh(e);
          break;
      }
      Ac(t, x);
      var w, k, z = null;
      for (w in g)
        if (!(x.hasOwnProperty(w) || !g.hasOwnProperty(w) || g[w] == null))
          if (w === fc) {
            var I = g[w];
            for (k in I)
              I.hasOwnProperty(k) && (z || (z = {}), z[k] = "");
          } else w === _p || w === cc || w === Wh || w === Ju || w === jS || (He.hasOwnProperty(w) ? d || (d = []) : (d = d || []).push(w, null));
      for (w in x) {
        var $ = x[w], Z = g?.[w];
        if (!(!x.hasOwnProperty(w) || $ === Z || $ == null && Z == null))
          if (w === fc)
            if ($ && Object.freeze($), Z) {
              for (k in Z)
                Z.hasOwnProperty(k) && (!$ || !$.hasOwnProperty(k)) && (z || (z = {}), z[k] = "");
              for (k in $)
                $.hasOwnProperty(k) && Z[k] !== $[k] && (z || (z = {}), z[k] = $[k]);
            } else
              z || (d || (d = []), d.push(w, z)), z = $;
          else if (w === _p) {
            var ne = $ ? $[Qh] : void 0, se = Z ? Z[Qh] : void 0;
            ne != null && se !== ne && (d = d || []).push(w, ne);
          } else w === cc ? (typeof $ == "string" || typeof $ == "number") && (d = d || []).push(w, "" + $) : w === Wh || w === Ju || (He.hasOwnProperty(w) ? ($ != null && (typeof $ != "function" && Xh(w, $), w === "onScroll" && br("scroll", e)), !d && Z !== $ && (d = [])) : (d = d || []).push(w, $));
      }
      return z && (Vy(z, x[fc]), (d = d || []).push(fc, z)), d;
    }
    function gT(e, t, i, o, c) {
      i === "input" && c.type === "radio" && c.name != null && b(e, c);
      var d = so(i, o), g = so(i, c);
      switch (pT(e, t, d, g), i) {
        case "input":
          U(e, c);
          break;
        case "textarea":
          kv(e, c);
          break;
        case "select":
          Oc(e, c);
          break;
      }
    }
    function ST(e) {
      {
        var t = e.toLowerCase();
        return Ts.hasOwnProperty(t) && Ts[t] || null;
      }
    }
    function xT(e, t, i, o, c, d, g) {
      var x, w;
      switch (x = so(t, i), Gh(t, i), t) {
        case "dialog":
          br("cancel", e), br("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          br("load", e);
          break;
        case "video":
        case "audio":
          for (var k = 0; k < Rp.length; k++)
            br(Rp[k], e);
          break;
        case "source":
          br("error", e);
          break;
        case "img":
        case "image":
        case "link":
          br("error", e), br("load", e);
          break;
        case "details":
          br("toggle", e);
          break;
        case "input":
          pa(e, i), br("invalid", e);
          break;
        case "option":
          yn(e, i);
          break;
        case "select":
          Io(e, i), br("invalid", e);
          break;
        case "textarea":
          Td(e, i), br("invalid", e);
          break;
      }
      Ac(t, i);
      {
        w = /* @__PURE__ */ new Set();
        for (var z = e.attributes, I = 0; I < z.length; I++) {
          var $ = z[I].name.toLowerCase();
          switch ($) {
            // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              w.add(z[I].name);
          }
        }
      }
      var Z = null;
      for (var ne in i)
        if (i.hasOwnProperty(ne)) {
          var se = i[ne];
          if (ne === cc)
            typeof se == "string" ? e.textContent !== se && (i[Ju] !== !0 && Zh(e.textContent, se, d, g), Z = [cc, se]) : typeof se == "number" && e.textContent !== "" + se && (i[Ju] !== !0 && Zh(e.textContent, se, d, g), Z = [cc, "" + se]);
          else if (He.hasOwnProperty(ne))
            se != null && (typeof se != "function" && Xh(ne, se), ne === "onScroll" && br("scroll", e));
          else if (g && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof x == "boolean") {
            var Qe = void 0, Tt = Rt(ne);
            if (i[Ju] !== !0) {
              if (!(ne === Wh || ne === Ju || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              ne === "value" || ne === "checked" || ne === "selected")) {
                if (ne === _p) {
                  var mt = e.innerHTML, kn = se ? se[Qh] : void 0;
                  if (kn != null) {
                    var Cn = HS(e, kn);
                    Cn !== mt && kp(ne, mt, Cn);
                  }
                } else if (ne === fc) {
                  if (w.delete(ne), PS) {
                    var W = Hy(se);
                    Qe = e.getAttribute("style"), W !== Qe && kp(ne, Qe, W);
                  }
                } else if (x && !H)
                  w.delete(ne.toLowerCase()), Qe = yr(e, ne, se), se !== Qe && kp(ne, Qe, se);
                else if (!xn(ne, Tt, x) && !un(ne, se, Tt, x)) {
                  var ce = !1;
                  if (Tt !== null)
                    w.delete(Tt.attributeName), Qe = nn(e, ne, se, Tt);
                  else {
                    var Q = o;
                    if (Q === Ul && (Q = bd(t)), Q === Ul)
                      w.delete(ne.toLowerCase());
                    else {
                      var Oe = ST(ne);
                      Oe !== null && Oe !== ne && (ce = !0, w.delete(Oe)), w.delete(ne);
                    }
                    Qe = yr(e, ne, se);
                  }
                  var nt = H;
                  !nt && se !== Qe && !ce && kp(ne, Qe, se);
                }
              }
            }
          }
        }
      switch (g && // $FlowFixMe - Should be inferred as not undefined.
      w.size > 0 && i[Ju] !== !0 && FS(w), t) {
        case "input":
          yi(e), X(e, i, !0);
          break;
        case "textarea":
          yi(e), Dv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof i.onClick == "function" && Jh(e);
          break;
      }
      return Z;
    }
    function ET(e, t, i) {
      var o = e.nodeValue !== t;
      return o;
    }
    function m0(e, t) {
      {
        if (Ii)
          return;
        Ii = !0, v("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function y0(e, t) {
      {
        if (Ii)
          return;
        Ii = !0, v('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function g0(e, t, i) {
      {
        if (Ii)
          return;
        Ii = !0, v("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function S0(e, t) {
      {
        if (t === "" || Ii)
          return;
        Ii = !0, v('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function CT(e, t, i) {
      switch (t) {
        case "input":
          le(e, i);
          return;
        case "textarea":
          Uy(e, i);
          return;
        case "select":
          Ed(e, i);
          return;
      }
    }
    var Dp = function() {
    }, Op = function() {
    };
    {
      var TT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], VS = [
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
      ], wT = VS.concat(["button"]), RT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], IS = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      Op = function(e, t) {
        var i = gt({}, e || IS), o = {
          tag: t
        };
        return VS.indexOf(t) !== -1 && (i.aTagInScope = null, i.buttonTagInScope = null, i.nobrTagInScope = null), wT.indexOf(t) !== -1 && (i.pTagInButtonScope = null), TT.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (i.listItemTagAutoclosing = null, i.dlItemTagAutoclosing = null), i.current = o, t === "form" && (i.formTag = o), t === "a" && (i.aTagInScope = o), t === "button" && (i.buttonTagInScope = o), t === "nobr" && (i.nobrTagInScope = o), t === "p" && (i.pTagInButtonScope = o), t === "li" && (i.listItemTagAutoclosing = o), (t === "dd" || t === "dt") && (i.dlItemTagAutoclosing = o), i;
      };
      var bT = function(e, t) {
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
            return RT.indexOf(t) === -1;
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
      }, MT = function(e, t) {
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
      }, BS = {};
      Dp = function(e, t, i) {
        i = i || IS;
        var o = i.current, c = o && o.tag;
        t != null && (e != null && v("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var d = bT(e, c) ? null : o, g = d ? null : MT(e, i), x = d || g;
        if (x) {
          var w = x.tag, k = !!d + "|" + e + "|" + w;
          if (!BS[k]) {
            BS[k] = !0;
            var z = e, I = "";
            if (e === "#text" ? /\S/.test(t) ? z = "Text nodes" : (z = "Whitespace text nodes", I = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : z = "<" + e + ">", d) {
              var $ = "";
              w === "table" && e === "tr" && ($ += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), v("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", z, w, I, $);
            } else
              v("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", z, w);
          }
        }
      };
    }
    var em = "suppressHydrationWarning", tm = "$", nm = "/$", zp = "$?", Lp = "$!", _T = "style", x0 = null, E0 = null;
    function kT(e) {
      var t, i, o = e.nodeType;
      switch (o) {
        case Fl:
        case _d: {
          t = o === Fl ? "#document" : "#fragment";
          var c = e.documentElement;
          i = c ? c.namespaceURI : Md(null, "");
          break;
        }
        default: {
          var d = o === Hr ? e.parentNode : e, g = d.namespaceURI || null;
          t = d.tagName, i = Md(g, t);
          break;
        }
      }
      {
        var x = t.toLowerCase(), w = Op(null, x);
        return {
          namespace: i,
          ancestorInfo: w
        };
      }
    }
    function DT(e, t, i) {
      {
        var o = e, c = Md(o.namespace, t), d = Op(o.ancestorInfo, t);
        return {
          namespace: c,
          ancestorInfo: d
        };
      }
    }
    function S4(e) {
      return e;
    }
    function OT(e) {
      x0 = Yr(), E0 = qC();
      var t = null;
      return ea(!1), t;
    }
    function zT(e) {
      YC(E0), ea(x0), x0 = null, E0 = null;
    }
    function LT(e, t, i, o, c) {
      var d;
      {
        var g = o;
        if (Dp(e, null, g.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var x = "" + t.children, w = Op(g.ancestorInfo, e);
          Dp(null, x, w);
        }
        d = g.namespace;
      }
      var k = vT(e, t, i, d);
      return Up(c, k), k0(k, t), k;
    }
    function AT(e, t) {
      e.appendChild(t);
    }
    function NT(e, t, i, o, c) {
      switch (mT(e, t, i, o), t) {
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
    function UT(e, t, i, o, c, d) {
      {
        var g = d;
        if (typeof o.children != typeof i.children && (typeof o.children == "string" || typeof o.children == "number")) {
          var x = "" + o.children, w = Op(g.ancestorInfo, t);
          Dp(null, x, w);
        }
      }
      return yT(e, t, i, o);
    }
    function C0(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function jT(e, t, i, o) {
      {
        var c = i;
        Dp(null, e, c.ancestorInfo);
      }
      var d = hT(e, t);
      return Up(o, d), d;
    }
    function FT() {
      var e = window.event;
      return e === void 0 ? Pi : _f(e.type);
    }
    var T0 = typeof setTimeout == "function" ? setTimeout : void 0, PT = typeof clearTimeout == "function" ? clearTimeout : void 0, w0 = -1, qS = typeof Promise == "function" ? Promise : void 0, HT = typeof queueMicrotask == "function" ? queueMicrotask : typeof qS < "u" ? function(e) {
      return qS.resolve(null).then(e).catch($T);
    } : T0;
    function $T(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function VT(e, t, i, o) {
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
    function IT(e, t, i, o, c, d) {
      gT(e, t, i, o, c), k0(e, c);
    }
    function YS(e) {
      Du(e, "");
    }
    function BT(e, t, i) {
      e.nodeValue = i;
    }
    function qT(e, t) {
      e.appendChild(t);
    }
    function YT(e, t) {
      var i;
      e.nodeType === Hr ? (i = e.parentNode, i.insertBefore(t, e)) : (i = e, i.appendChild(t));
      var o = e._reactRootContainer;
      o == null && i.onclick === null && Jh(i);
    }
    function WT(e, t, i) {
      e.insertBefore(t, i);
    }
    function QT(e, t, i) {
      e.nodeType === Hr ? e.parentNode.insertBefore(t, i) : e.insertBefore(t, i);
    }
    function GT(e, t) {
      e.removeChild(t);
    }
    function XT(e, t) {
      e.nodeType === Hr ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function R0(e, t) {
      var i = t, o = 0;
      do {
        var c = i.nextSibling;
        if (e.removeChild(i), c && c.nodeType === Hr) {
          var d = c.data;
          if (d === nm)
            if (o === 0) {
              e.removeChild(c), cu(t);
              return;
            } else
              o--;
          else (d === tm || d === zp || d === Lp) && o++;
        }
        i = c;
      } while (i);
      cu(t);
    }
    function KT(e, t) {
      e.nodeType === Hr ? R0(e.parentNode, t) : e.nodeType === Za && R0(e, t), cu(e);
    }
    function ZT(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function JT(e) {
      e.nodeValue = "";
    }
    function ew(e, t) {
      e = e;
      var i = t[_T], o = i != null && i.hasOwnProperty("display") ? i.display : null;
      e.style.display = Lc("display", o);
    }
    function tw(e, t) {
      e.nodeValue = t;
    }
    function nw(e) {
      e.nodeType === Za ? e.textContent = "" : e.nodeType === Fl && e.documentElement && e.removeChild(e.documentElement);
    }
    function rw(e, t, i) {
      return e.nodeType !== Za || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function aw(e, t) {
      return t === "" || e.nodeType !== jl ? null : e;
    }
    function iw(e) {
      return e.nodeType !== Hr ? null : e;
    }
    function WS(e) {
      return e.data === zp;
    }
    function b0(e) {
      return e.data === Lp;
    }
    function lw(e) {
      var t = e.nextSibling && e.nextSibling.dataset, i, o, c;
      return t && (i = t.dgst, o = t.msg, c = t.stck), {
        message: o,
        digest: i,
        stack: c
      };
    }
    function ow(e, t) {
      e._reactRetry = t;
    }
    function rm(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Za || t === jl)
          break;
        if (t === Hr) {
          var i = e.data;
          if (i === tm || i === Lp || i === zp)
            break;
          if (i === nm)
            return null;
        }
      }
      return e;
    }
    function Ap(e) {
      return rm(e.nextSibling);
    }
    function uw(e) {
      return rm(e.firstChild);
    }
    function sw(e) {
      return rm(e.firstChild);
    }
    function cw(e) {
      return rm(e.nextSibling);
    }
    function fw(e, t, i, o, c, d, g) {
      Up(d, e), k0(e, i);
      var x;
      {
        var w = c;
        x = w.namespace;
      }
      var k = (d.mode & cn) !== Et;
      return xT(e, t, i, x, o, k, g);
    }
    function dw(e, t, i, o) {
      return Up(i, e), i.mode & cn, ET(e, t);
    }
    function pw(e, t) {
      Up(t, e);
    }
    function vw(e) {
      for (var t = e.nextSibling, i = 0; t; ) {
        if (t.nodeType === Hr) {
          var o = t.data;
          if (o === nm) {
            if (i === 0)
              return Ap(t);
            i--;
          } else (o === tm || o === Lp || o === zp) && i++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function QS(e) {
      for (var t = e.previousSibling, i = 0; t; ) {
        if (t.nodeType === Hr) {
          var o = t.data;
          if (o === tm || o === Lp || o === zp) {
            if (i === 0)
              return t;
            i--;
          } else o === nm && i++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function hw(e) {
      cu(e);
    }
    function mw(e) {
      cu(e);
    }
    function yw(e) {
      return e !== "head" && e !== "body";
    }
    function gw(e, t, i, o) {
      var c = !0;
      Zh(t.nodeValue, i, o, c);
    }
    function Sw(e, t, i, o, c, d) {
      if (t[em] !== !0) {
        var g = !0;
        Zh(o.nodeValue, c, d, g);
      }
    }
    function xw(e, t) {
      t.nodeType === Za ? m0(e, t) : t.nodeType === Hr || y0(e, t);
    }
    function Ew(e, t) {
      {
        var i = e.parentNode;
        i !== null && (t.nodeType === Za ? m0(i, t) : t.nodeType === Hr || y0(i, t));
      }
    }
    function Cw(e, t, i, o, c) {
      (c || t[em] !== !0) && (o.nodeType === Za ? m0(i, o) : o.nodeType === Hr || y0(i, o));
    }
    function Tw(e, t, i) {
      g0(e, t);
    }
    function ww(e, t) {
      S0(e, t);
    }
    function Rw(e, t, i) {
      {
        var o = e.parentNode;
        o !== null && g0(o, t);
      }
    }
    function bw(e, t) {
      {
        var i = e.parentNode;
        i !== null && S0(i, t);
      }
    }
    function Mw(e, t, i, o, c, d) {
      (d || t[em] !== !0) && g0(i, o);
    }
    function _w(e, t, i, o, c) {
      (c || t[em] !== !0) && S0(i, o);
    }
    function kw(e) {
      v("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function Dw(e) {
      bp(e);
    }
    var Vf = Math.random().toString(36).slice(2), If = "__reactFiber$" + Vf, M0 = "__reactProps$" + Vf, Np = "__reactContainer$" + Vf, _0 = "__reactEvents$" + Vf, Ow = "__reactListeners$" + Vf, zw = "__reactHandles$" + Vf;
    function Lw(e) {
      delete e[If], delete e[M0], delete e[_0], delete e[Ow], delete e[zw];
    }
    function Up(e, t) {
      t[If] = e;
    }
    function am(e, t) {
      t[Np] = e;
    }
    function GS(e) {
      e[Np] = null;
    }
    function jp(e) {
      return !!e[Np];
    }
    function dc(e) {
      var t = e[If];
      if (t)
        return t;
      for (var i = e.parentNode; i; ) {
        if (t = i[Np] || i[If], t) {
          var o = t.alternate;
          if (t.child !== null || o !== null && o.child !== null)
            for (var c = QS(e); c !== null; ) {
              var d = c[If];
              if (d)
                return d;
              c = QS(c);
            }
          return t;
        }
        e = i, i = e.parentNode;
      }
      return null;
    }
    function es(e) {
      var t = e[If] || e[Np];
      return t && (t.tag === O || t.tag === L || t.tag === q || t.tag === R) ? t : null;
    }
    function Bf(e) {
      if (e.tag === O || e.tag === L)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function im(e) {
      return e[M0] || null;
    }
    function k0(e, t) {
      e[M0] = t;
    }
    function Aw(e) {
      var t = e[_0];
      return t === void 0 && (t = e[_0] = /* @__PURE__ */ new Set()), t;
    }
    var XS = {}, KS = s.ReactDebugCurrentFrame;
    function lm(e) {
      if (e) {
        var t = e._owner, i = pt(e.type, e._source, t ? t.type : null);
        KS.setExtraStackFrame(i);
      } else
        KS.setExtraStackFrame(null);
    }
    function Gl(e, t, i, o, c) {
      {
        var d = Function.call.bind(Hn);
        for (var g in e)
          if (d(e, g)) {
            var x = void 0;
            try {
              if (typeof e[g] != "function") {
                var w = Error((o || "React class") + ": " + i + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw w.name = "Invariant Violation", w;
              }
              x = e[g](t, g, o, i, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (k) {
              x = k;
            }
            x && !(x instanceof Error) && (lm(c), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", i, g, typeof x), lm(null)), x instanceof Error && !(x.message in XS) && (XS[x.message] = !0, lm(c), v("Failed %s type: %s", i, x.message), lm(null));
          }
      }
    }
    var D0 = [], om;
    om = [];
    var mu = -1;
    function ts(e) {
      return {
        current: e
      };
    }
    function si(e, t) {
      if (mu < 0) {
        v("Unexpected pop.");
        return;
      }
      t !== om[mu] && v("Unexpected Fiber popped."), e.current = D0[mu], D0[mu] = null, om[mu] = null, mu--;
    }
    function ci(e, t, i) {
      mu++, D0[mu] = e.current, om[mu] = i, e.current = t;
    }
    var O0;
    O0 = {};
    var nl = {};
    Object.freeze(nl);
    var yu = ts(nl), Do = ts(!1), z0 = nl;
    function qf(e, t, i) {
      return i && Oo(t) ? z0 : yu.current;
    }
    function ZS(e, t, i) {
      {
        var o = e.stateNode;
        o.__reactInternalMemoizedUnmaskedChildContext = t, o.__reactInternalMemoizedMaskedChildContext = i;
      }
    }
    function Yf(e, t) {
      {
        var i = e.type, o = i.contextTypes;
        if (!o)
          return nl;
        var c = e.stateNode;
        if (c && c.__reactInternalMemoizedUnmaskedChildContext === t)
          return c.__reactInternalMemoizedMaskedChildContext;
        var d = {};
        for (var g in o)
          d[g] = t[g];
        {
          var x = tt(e) || "Unknown";
          Gl(o, d, "context", x);
        }
        return c && ZS(e, t, d), d;
      }
    }
    function um() {
      return Do.current;
    }
    function Oo(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function sm(e) {
      si(Do, e), si(yu, e);
    }
    function L0(e) {
      si(Do, e), si(yu, e);
    }
    function JS(e, t, i) {
      {
        if (yu.current !== nl)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        ci(yu, t, e), ci(Do, i, e);
      }
    }
    function e2(e, t, i) {
      {
        var o = e.stateNode, c = t.childContextTypes;
        if (typeof o.getChildContext != "function") {
          {
            var d = tt(e) || "Unknown";
            O0[d] || (O0[d] = !0, v("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", d, d));
          }
          return i;
        }
        var g = o.getChildContext();
        for (var x in g)
          if (!(x in c))
            throw new Error((tt(e) || "Unknown") + '.getChildContext(): key "' + x + '" is not defined in childContextTypes.');
        {
          var w = tt(e) || "Unknown";
          Gl(c, g, "child context", w);
        }
        return gt({}, i, g);
      }
    }
    function cm(e) {
      {
        var t = e.stateNode, i = t && t.__reactInternalMemoizedMergedChildContext || nl;
        return z0 = yu.current, ci(yu, i, e), ci(Do, Do.current, e), !0;
      }
    }
    function t2(e, t, i) {
      {
        var o = e.stateNode;
        if (!o)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (i) {
          var c = e2(e, t, z0);
          o.__reactInternalMemoizedMergedChildContext = c, si(Do, e), si(yu, e), ci(yu, c, e), ci(Do, i, e);
        } else
          si(Do, e), ci(Do, i, e);
      }
    }
    function Nw(e) {
      {
        if (!Xo(e) || e.tag !== T)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case R:
              return t.stateNode.context;
            case T: {
              var i = t.type;
              if (Oo(i))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var ns = 0, fm = 1, gu = null, A0 = !1, N0 = !1;
    function n2(e) {
      gu === null ? gu = [e] : gu.push(e);
    }
    function Uw(e) {
      A0 = !0, n2(e);
    }
    function r2() {
      A0 && rs();
    }
    function rs() {
      if (!N0 && gu !== null) {
        N0 = !0;
        var e = 0, t = $i();
        try {
          var i = !0, o = gu;
          for (qr(Na); e < o.length; e++) {
            var c = o[e];
            do
              c = c(i);
            while (c !== null);
          }
          gu = null, A0 = !1;
        } catch (d) {
          throw gu !== null && (gu = gu.slice(e + 1)), Hd(Os, rs), d;
        } finally {
          qr(t), N0 = !1;
        }
      }
      return null;
    }
    var Wf = [], Qf = 0, dm = null, pm = 0, Tl = [], wl = 0, pc = null, Su = 1, xu = "";
    function jw(e) {
      return hc(), (e.flags & pl) !== xt;
    }
    function Fw(e) {
      return hc(), pm;
    }
    function Pw() {
      var e = xu, t = Su, i = t & ~Hw(t);
      return i.toString(32) + e;
    }
    function vc(e, t) {
      hc(), Wf[Qf++] = pm, Wf[Qf++] = dm, dm = e, pm = t;
    }
    function a2(e, t, i) {
      hc(), Tl[wl++] = Su, Tl[wl++] = xu, Tl[wl++] = pc, pc = e;
      var o = Su, c = xu, d = vm(o) - 1, g = o & ~(1 << d), x = i + 1, w = vm(t) + d;
      if (w > 30) {
        var k = d - d % 5, z = (1 << k) - 1, I = (g & z).toString(32), $ = g >> k, Z = d - k, ne = vm(t) + Z, se = x << Z, Qe = se | $, Tt = I + c;
        Su = 1 << ne | Qe, xu = Tt;
      } else {
        var mt = x << d, kn = mt | g, Cn = c;
        Su = 1 << w | kn, xu = Cn;
      }
    }
    function U0(e) {
      hc();
      var t = e.return;
      if (t !== null) {
        var i = 1, o = 0;
        vc(e, i), a2(e, i, o);
      }
    }
    function vm(e) {
      return 32 - Ir(e);
    }
    function Hw(e) {
      return 1 << vm(e) - 1;
    }
    function j0(e) {
      for (; e === dm; )
        dm = Wf[--Qf], Wf[Qf] = null, pm = Wf[--Qf], Wf[Qf] = null;
      for (; e === pc; )
        pc = Tl[--wl], Tl[wl] = null, xu = Tl[--wl], Tl[wl] = null, Su = Tl[--wl], Tl[wl] = null;
    }
    function $w() {
      return hc(), pc !== null ? {
        id: Su,
        overflow: xu
      } : null;
    }
    function Vw(e, t) {
      hc(), Tl[wl++] = Su, Tl[wl++] = xu, Tl[wl++] = pc, Su = t.id, xu = t.overflow, pc = e;
    }
    function hc() {
      Ha() || v("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Pa = null, Rl = null, Xl = !1, mc = !1, as = null;
    function Iw() {
      Xl && v("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function i2() {
      mc = !0;
    }
    function Bw() {
      return mc;
    }
    function qw(e) {
      var t = e.stateNode.containerInfo;
      return Rl = sw(t), Pa = e, Xl = !0, as = null, mc = !1, !0;
    }
    function Yw(e, t, i) {
      return Rl = cw(t), Pa = e, Xl = !0, as = null, mc = !1, i !== null && Vw(e, i), !0;
    }
    function l2(e, t) {
      switch (e.tag) {
        case R: {
          xw(e.stateNode.containerInfo, t);
          break;
        }
        case O: {
          var i = (e.mode & cn) !== Et;
          Cw(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            i
          );
          break;
        }
        case q: {
          var o = e.memoizedState;
          o.dehydrated !== null && Ew(o.dehydrated, t);
          break;
        }
      }
    }
    function o2(e, t) {
      l2(e, t);
      var i = XM();
      i.stateNode = t, i.return = e;
      var o = e.deletions;
      o === null ? (e.deletions = [i], e.flags |= Ai) : o.push(i);
    }
    function F0(e, t) {
      {
        if (mc)
          return;
        switch (e.tag) {
          case R: {
            var i = e.stateNode.containerInfo;
            switch (t.tag) {
              case O:
                var o = t.type;
                t.pendingProps, Tw(i, o);
                break;
              case L:
                var c = t.pendingProps;
                ww(i, c);
                break;
            }
            break;
          }
          case O: {
            var d = e.type, g = e.memoizedProps, x = e.stateNode;
            switch (t.tag) {
              case O: {
                var w = t.type, k = t.pendingProps, z = (e.mode & cn) !== Et;
                Mw(
                  d,
                  g,
                  x,
                  w,
                  k,
                  // TODO: Delete this argument when we remove the legacy root API.
                  z
                );
                break;
              }
              case L: {
                var I = t.pendingProps, $ = (e.mode & cn) !== Et;
                _w(
                  d,
                  g,
                  x,
                  I,
                  // TODO: Delete this argument when we remove the legacy root API.
                  $
                );
                break;
              }
            }
            break;
          }
          case q: {
            var Z = e.memoizedState, ne = Z.dehydrated;
            if (ne !== null) switch (t.tag) {
              case O:
                var se = t.type;
                t.pendingProps, Rw(ne, se);
                break;
              case L:
                var Qe = t.pendingProps;
                bw(ne, Qe);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function u2(e, t) {
      t.flags = t.flags & ~ei | Tr, F0(e, t);
    }
    function s2(e, t) {
      switch (e.tag) {
        case O: {
          var i = e.type;
          e.pendingProps;
          var o = rw(t, i);
          return o !== null ? (e.stateNode = o, Pa = e, Rl = uw(o), !0) : !1;
        }
        case L: {
          var c = e.pendingProps, d = aw(t, c);
          return d !== null ? (e.stateNode = d, Pa = e, Rl = null, !0) : !1;
        }
        case q: {
          var g = iw(t);
          if (g !== null) {
            var x = {
              dehydrated: g,
              treeContext: $w(),
              retryLane: ai
            };
            e.memoizedState = x;
            var w = KM(g);
            return w.return = e, e.child = w, Pa = e, Rl = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function P0(e) {
      return (e.mode & cn) !== Et && (e.flags & yt) === xt;
    }
    function H0(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function $0(e) {
      if (Xl) {
        var t = Rl;
        if (!t) {
          P0(e) && (F0(Pa, e), H0()), u2(Pa, e), Xl = !1, Pa = e;
          return;
        }
        var i = t;
        if (!s2(e, t)) {
          P0(e) && (F0(Pa, e), H0()), t = Ap(i);
          var o = Pa;
          if (!t || !s2(e, t)) {
            u2(Pa, e), Xl = !1, Pa = e;
            return;
          }
          o2(o, i);
        }
      }
    }
    function Ww(e, t, i) {
      var o = e.stateNode, c = !mc, d = fw(o, e.type, e.memoizedProps, t, i, e, c);
      return e.updateQueue = d, d !== null;
    }
    function Qw(e) {
      var t = e.stateNode, i = e.memoizedProps, o = dw(t, i, e);
      if (o) {
        var c = Pa;
        if (c !== null)
          switch (c.tag) {
            case R: {
              var d = c.stateNode.containerInfo, g = (c.mode & cn) !== Et;
              gw(
                d,
                t,
                i,
                // TODO: Delete this argument when we remove the legacy root API.
                g
              );
              break;
            }
            case O: {
              var x = c.type, w = c.memoizedProps, k = c.stateNode, z = (c.mode & cn) !== Et;
              Sw(
                x,
                w,
                k,
                t,
                i,
                // TODO: Delete this argument when we remove the legacy root API.
                z
              );
              break;
            }
          }
      }
      return o;
    }
    function Gw(e) {
      var t = e.memoizedState, i = t !== null ? t.dehydrated : null;
      if (!i)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      pw(i, e);
    }
    function Xw(e) {
      var t = e.memoizedState, i = t !== null ? t.dehydrated : null;
      if (!i)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return vw(i);
    }
    function c2(e) {
      for (var t = e.return; t !== null && t.tag !== O && t.tag !== R && t.tag !== q; )
        t = t.return;
      Pa = t;
    }
    function hm(e) {
      if (e !== Pa)
        return !1;
      if (!Xl)
        return c2(e), Xl = !0, !1;
      if (e.tag !== R && (e.tag !== O || yw(e.type) && !C0(e.type, e.memoizedProps))) {
        var t = Rl;
        if (t)
          if (P0(e))
            f2(e), H0();
          else
            for (; t; )
              o2(e, t), t = Ap(t);
      }
      return c2(e), e.tag === q ? Rl = Xw(e) : Rl = Pa ? Ap(e.stateNode) : null, !0;
    }
    function Kw() {
      return Xl && Rl !== null;
    }
    function f2(e) {
      for (var t = Rl; t; )
        l2(e, t), t = Ap(t);
    }
    function Gf() {
      Pa = null, Rl = null, Xl = !1, mc = !1;
    }
    function d2() {
      as !== null && (ix(as), as = null);
    }
    function Ha() {
      return Xl;
    }
    function V0(e) {
      as === null ? as = [e] : as.push(e);
    }
    var Zw = s.ReactCurrentBatchConfig, Jw = null;
    function eR() {
      return Zw.transition;
    }
    var Kl = {
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
      var tR = function(e) {
        for (var t = null, i = e; i !== null; )
          i.mode & nr && (t = i), i = i.return;
        return t;
      }, yc = function(e) {
        var t = [];
        return e.forEach(function(i) {
          t.push(i);
        }), t.sort().join(", ");
      }, Fp = [], Pp = [], Hp = [], $p = [], Vp = [], Ip = [], gc = /* @__PURE__ */ new Set();
      Kl.recordUnsafeLifecycleWarnings = function(e, t) {
        gc.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Fp.push(e), e.mode & nr && typeof t.UNSAFE_componentWillMount == "function" && Pp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Hp.push(e), e.mode & nr && typeof t.UNSAFE_componentWillReceiveProps == "function" && $p.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Vp.push(e), e.mode & nr && typeof t.UNSAFE_componentWillUpdate == "function" && Ip.push(e));
      }, Kl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Fp.length > 0 && (Fp.forEach(function($) {
          e.add(tt($) || "Component"), gc.add($.type);
        }), Fp = []);
        var t = /* @__PURE__ */ new Set();
        Pp.length > 0 && (Pp.forEach(function($) {
          t.add(tt($) || "Component"), gc.add($.type);
        }), Pp = []);
        var i = /* @__PURE__ */ new Set();
        Hp.length > 0 && (Hp.forEach(function($) {
          i.add(tt($) || "Component"), gc.add($.type);
        }), Hp = []);
        var o = /* @__PURE__ */ new Set();
        $p.length > 0 && ($p.forEach(function($) {
          o.add(tt($) || "Component"), gc.add($.type);
        }), $p = []);
        var c = /* @__PURE__ */ new Set();
        Vp.length > 0 && (Vp.forEach(function($) {
          c.add(tt($) || "Component"), gc.add($.type);
        }), Vp = []);
        var d = /* @__PURE__ */ new Set();
        if (Ip.length > 0 && (Ip.forEach(function($) {
          d.add(tt($) || "Component"), gc.add($.type);
        }), Ip = []), t.size > 0) {
          var g = yc(t);
          v(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, g);
        }
        if (o.size > 0) {
          var x = yc(o);
          v(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, x);
        }
        if (d.size > 0) {
          var w = yc(d);
          v(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, w);
        }
        if (e.size > 0) {
          var k = yc(e);
          y(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, k);
        }
        if (i.size > 0) {
          var z = yc(i);
          y(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, z);
        }
        if (c.size > 0) {
          var I = yc(c);
          y(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, I);
        }
      };
      var mm = /* @__PURE__ */ new Map(), p2 = /* @__PURE__ */ new Set();
      Kl.recordLegacyContextWarning = function(e, t) {
        var i = tR(e);
        if (i === null) {
          v("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!p2.has(e.type)) {
          var o = mm.get(i);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (o === void 0 && (o = [], mm.set(i, o)), o.push(e));
        }
      }, Kl.flushLegacyContextWarning = function() {
        mm.forEach(function(e, t) {
          if (e.length !== 0) {
            var i = e[0], o = /* @__PURE__ */ new Set();
            e.forEach(function(d) {
              o.add(tt(d) || "Component"), p2.add(d.type);
            });
            var c = yc(o);
            try {
              Bn(i), v(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, c);
            } finally {
              Zn();
            }
          }
        });
      }, Kl.discardPendingWarnings = function() {
        Fp = [], Pp = [], Hp = [], $p = [], Vp = [], Ip = [], mm = /* @__PURE__ */ new Map();
      };
    }
    var I0, B0, q0, Y0, W0, v2 = function(e, t) {
    };
    I0 = !1, B0 = !1, q0 = {}, Y0 = {}, W0 = {}, v2 = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var i = tt(t) || "Component";
        Y0[i] || (Y0[i] = !0, v('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function nR(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Bp(e, t, i) {
      var o = i.ref;
      if (o !== null && typeof o != "function" && typeof o != "object") {
        if ((e.mode & nr || ue) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(i._owner && i._self && i._owner.stateNode !== i._self) && // Will already throw with "Function components cannot have string refs"
        !(i._owner && i._owner.tag !== T) && // Will already warn with "Function components cannot be given refs"
        !(typeof i.type == "function" && !nR(i.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        i._owner) {
          var c = tt(e) || "Component";
          q0[c] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', c, o), q0[c] = !0);
        }
        if (i._owner) {
          var d = i._owner, g;
          if (d) {
            var x = d;
            if (x.tag !== T)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            g = x.stateNode;
          }
          if (!g)
            throw new Error("Missing owner for string ref " + o + ". This error is likely caused by a bug in React. Please file an issue.");
          var w = g;
          Ot(o, "ref");
          var k = "" + o;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === k)
            return t.ref;
          var z = function(I) {
            var $ = w.refs;
            I === null ? delete $[k] : $[k] = I;
          };
          return z._stringRef = k, z;
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
    function ym(e, t) {
      var i = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (i === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : i) + "). If you meant to render a collection of children, use an array instead.");
    }
    function gm(e) {
      {
        var t = tt(e) || "Component";
        if (W0[t])
          return;
        W0[t] = !0, v("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function h2(e) {
      var t = e._payload, i = e._init;
      return i(t);
    }
    function m2(e) {
      function t(W, ce) {
        if (e) {
          var Q = W.deletions;
          Q === null ? (W.deletions = [ce], W.flags |= Ai) : Q.push(ce);
        }
      }
      function i(W, ce) {
        if (!e)
          return null;
        for (var Q = ce; Q !== null; )
          t(W, Q), Q = Q.sibling;
        return null;
      }
      function o(W, ce) {
        for (var Q = /* @__PURE__ */ new Map(), Oe = ce; Oe !== null; )
          Oe.key !== null ? Q.set(Oe.key, Oe) : Q.set(Oe.index, Oe), Oe = Oe.sibling;
        return Q;
      }
      function c(W, ce) {
        var Q = Mc(W, ce);
        return Q.index = 0, Q.sibling = null, Q;
      }
      function d(W, ce, Q) {
        if (W.index = Q, !e)
          return W.flags |= pl, ce;
        var Oe = W.alternate;
        if (Oe !== null) {
          var nt = Oe.index;
          return nt < ce ? (W.flags |= Tr, ce) : nt;
        } else
          return W.flags |= Tr, ce;
      }
      function g(W) {
        return e && W.alternate === null && (W.flags |= Tr), W;
      }
      function x(W, ce, Q, Oe) {
        if (ce === null || ce.tag !== L) {
          var nt = Vg(Q, W.mode, Oe);
          return nt.return = W, nt;
        } else {
          var Ke = c(ce, Q);
          return Ke.return = W, Ke;
        }
      }
      function w(W, ce, Q, Oe) {
        var nt = Q.type;
        if (nt === Dn)
          return z(W, ce, Q.props.children, Oe, Q.key);
        if (ce !== null && (ce.elementType === nt || // Keep this check inline so it only runs on the false path:
        Ex(ce, Q) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof nt == "object" && nt !== null && nt.$$typeof === qe && h2(nt) === ce.type)) {
          var Ke = c(ce, Q.props);
          return Ke.ref = Bp(W, ce, Q), Ke.return = W, Ke._debugSource = Q._source, Ke._debugOwner = Q._owner, Ke;
        }
        var jt = $g(Q, W.mode, Oe);
        return jt.ref = Bp(W, ce, Q), jt.return = W, jt;
      }
      function k(W, ce, Q, Oe) {
        if (ce === null || ce.tag !== D || ce.stateNode.containerInfo !== Q.containerInfo || ce.stateNode.implementation !== Q.implementation) {
          var nt = Ig(Q, W.mode, Oe);
          return nt.return = W, nt;
        } else {
          var Ke = c(ce, Q.children || []);
          return Ke.return = W, Ke;
        }
      }
      function z(W, ce, Q, Oe, nt) {
        if (ce === null || ce.tag !== j) {
          var Ke = hs(Q, W.mode, Oe, nt);
          return Ke.return = W, Ke;
        } else {
          var jt = c(ce, Q);
          return jt.return = W, jt;
        }
      }
      function I(W, ce, Q) {
        if (typeof ce == "string" && ce !== "" || typeof ce == "number") {
          var Oe = Vg("" + ce, W.mode, Q);
          return Oe.return = W, Oe;
        }
        if (typeof ce == "object" && ce !== null) {
          switch (ce.$$typeof) {
            case Ft: {
              var nt = $g(ce, W.mode, Q);
              return nt.ref = Bp(W, null, ce), nt.return = W, nt;
            }
            case Wt: {
              var Ke = Ig(ce, W.mode, Q);
              return Ke.return = W, Ke;
            }
            case qe: {
              var jt = ce._payload, Gt = ce._init;
              return I(W, Gt(jt), Q);
            }
          }
          if (bt(ce) || dt(ce)) {
            var ar = hs(ce, W.mode, Q, null);
            return ar.return = W, ar;
          }
          ym(W, ce);
        }
        return typeof ce == "function" && gm(W), null;
      }
      function $(W, ce, Q, Oe) {
        var nt = ce !== null ? ce.key : null;
        if (typeof Q == "string" && Q !== "" || typeof Q == "number")
          return nt !== null ? null : x(W, ce, "" + Q, Oe);
        if (typeof Q == "object" && Q !== null) {
          switch (Q.$$typeof) {
            case Ft:
              return Q.key === nt ? w(W, ce, Q, Oe) : null;
            case Wt:
              return Q.key === nt ? k(W, ce, Q, Oe) : null;
            case qe: {
              var Ke = Q._payload, jt = Q._init;
              return $(W, ce, jt(Ke), Oe);
            }
          }
          if (bt(Q) || dt(Q))
            return nt !== null ? null : z(W, ce, Q, Oe, null);
          ym(W, Q);
        }
        return typeof Q == "function" && gm(W), null;
      }
      function Z(W, ce, Q, Oe, nt) {
        if (typeof Oe == "string" && Oe !== "" || typeof Oe == "number") {
          var Ke = W.get(Q) || null;
          return x(ce, Ke, "" + Oe, nt);
        }
        if (typeof Oe == "object" && Oe !== null) {
          switch (Oe.$$typeof) {
            case Ft: {
              var jt = W.get(Oe.key === null ? Q : Oe.key) || null;
              return w(ce, jt, Oe, nt);
            }
            case Wt: {
              var Gt = W.get(Oe.key === null ? Q : Oe.key) || null;
              return k(ce, Gt, Oe, nt);
            }
            case qe:
              var ar = Oe._payload, jn = Oe._init;
              return Z(W, ce, Q, jn(ar), nt);
          }
          if (bt(Oe) || dt(Oe)) {
            var ta = W.get(Q) || null;
            return z(ce, ta, Oe, nt, null);
          }
          ym(ce, Oe);
        }
        return typeof Oe == "function" && gm(ce), null;
      }
      function ne(W, ce, Q) {
        {
          if (typeof W != "object" || W === null)
            return ce;
          switch (W.$$typeof) {
            case Ft:
            case Wt:
              v2(W, Q);
              var Oe = W.key;
              if (typeof Oe != "string")
                break;
              if (ce === null) {
                ce = /* @__PURE__ */ new Set(), ce.add(Oe);
                break;
              }
              if (!ce.has(Oe)) {
                ce.add(Oe);
                break;
              }
              v("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", Oe);
              break;
            case qe:
              var nt = W._payload, Ke = W._init;
              ne(Ke(nt), ce, Q);
              break;
          }
        }
        return ce;
      }
      function se(W, ce, Q, Oe) {
        for (var nt = null, Ke = 0; Ke < Q.length; Ke++) {
          var jt = Q[Ke];
          nt = ne(jt, nt, W);
        }
        for (var Gt = null, ar = null, jn = ce, ta = 0, Fn = 0, Qr = null; jn !== null && Fn < Q.length; Fn++) {
          jn.index > Fn ? (Qr = jn, jn = null) : Qr = jn.sibling;
          var di = $(W, jn, Q[Fn], Oe);
          if (di === null) {
            jn === null && (jn = Qr);
            break;
          }
          e && jn && di.alternate === null && t(W, jn), ta = d(di, ta, Fn), ar === null ? Gt = di : ar.sibling = di, ar = di, jn = Qr;
        }
        if (Fn === Q.length) {
          if (i(W, jn), Ha()) {
            var Wa = Fn;
            vc(W, Wa);
          }
          return Gt;
        }
        if (jn === null) {
          for (; Fn < Q.length; Fn++) {
            var al = I(W, Q[Fn], Oe);
            al !== null && (ta = d(al, ta, Fn), ar === null ? Gt = al : ar.sibling = al, ar = al);
          }
          if (Ha()) {
            var Mi = Fn;
            vc(W, Mi);
          }
          return Gt;
        }
        for (var _i = o(W, jn); Fn < Q.length; Fn++) {
          var pi = Z(_i, W, Fn, Q[Fn], Oe);
          pi !== null && (e && pi.alternate !== null && _i.delete(pi.key === null ? Fn : pi.key), ta = d(pi, ta, Fn), ar === null ? Gt = pi : ar.sibling = pi, ar = pi);
        }
        if (e && _i.forEach(function(vd) {
          return t(W, vd);
        }), Ha()) {
          var Mu = Fn;
          vc(W, Mu);
        }
        return Gt;
      }
      function Qe(W, ce, Q, Oe) {
        var nt = dt(Q);
        if (typeof nt != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          Q[Symbol.toStringTag] === "Generator" && (B0 || v("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), B0 = !0), Q.entries === nt && (I0 || v("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), I0 = !0);
          var Ke = nt.call(Q);
          if (Ke)
            for (var jt = null, Gt = Ke.next(); !Gt.done; Gt = Ke.next()) {
              var ar = Gt.value;
              jt = ne(ar, jt, W);
            }
        }
        var jn = nt.call(Q);
        if (jn == null)
          throw new Error("An iterable object provided no iterator.");
        for (var ta = null, Fn = null, Qr = ce, di = 0, Wa = 0, al = null, Mi = jn.next(); Qr !== null && !Mi.done; Wa++, Mi = jn.next()) {
          Qr.index > Wa ? (al = Qr, Qr = null) : al = Qr.sibling;
          var _i = $(W, Qr, Mi.value, Oe);
          if (_i === null) {
            Qr === null && (Qr = al);
            break;
          }
          e && Qr && _i.alternate === null && t(W, Qr), di = d(_i, di, Wa), Fn === null ? ta = _i : Fn.sibling = _i, Fn = _i, Qr = al;
        }
        if (Mi.done) {
          if (i(W, Qr), Ha()) {
            var pi = Wa;
            vc(W, pi);
          }
          return ta;
        }
        if (Qr === null) {
          for (; !Mi.done; Wa++, Mi = jn.next()) {
            var Mu = I(W, Mi.value, Oe);
            Mu !== null && (di = d(Mu, di, Wa), Fn === null ? ta = Mu : Fn.sibling = Mu, Fn = Mu);
          }
          if (Ha()) {
            var vd = Wa;
            vc(W, vd);
          }
          return ta;
        }
        for (var Cv = o(W, Qr); !Mi.done; Wa++, Mi = jn.next()) {
          var Po = Z(Cv, W, Wa, Mi.value, Oe);
          Po !== null && (e && Po.alternate !== null && Cv.delete(Po.key === null ? Wa : Po.key), di = d(Po, di, Wa), Fn === null ? ta = Po : Fn.sibling = Po, Fn = Po);
        }
        if (e && Cv.forEach(function(__) {
          return t(W, __);
        }), Ha()) {
          var M_ = Wa;
          vc(W, M_);
        }
        return ta;
      }
      function Tt(W, ce, Q, Oe) {
        if (ce !== null && ce.tag === L) {
          i(W, ce.sibling);
          var nt = c(ce, Q);
          return nt.return = W, nt;
        }
        i(W, ce);
        var Ke = Vg(Q, W.mode, Oe);
        return Ke.return = W, Ke;
      }
      function mt(W, ce, Q, Oe) {
        for (var nt = Q.key, Ke = ce; Ke !== null; ) {
          if (Ke.key === nt) {
            var jt = Q.type;
            if (jt === Dn) {
              if (Ke.tag === j) {
                i(W, Ke.sibling);
                var Gt = c(Ke, Q.props.children);
                return Gt.return = W, Gt._debugSource = Q._source, Gt._debugOwner = Q._owner, Gt;
              }
            } else if (Ke.elementType === jt || // Keep this check inline so it only runs on the false path:
            Ex(Ke, Q) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof jt == "object" && jt !== null && jt.$$typeof === qe && h2(jt) === Ke.type) {
              i(W, Ke.sibling);
              var ar = c(Ke, Q.props);
              return ar.ref = Bp(W, Ke, Q), ar.return = W, ar._debugSource = Q._source, ar._debugOwner = Q._owner, ar;
            }
            i(W, Ke);
            break;
          } else
            t(W, Ke);
          Ke = Ke.sibling;
        }
        if (Q.type === Dn) {
          var jn = hs(Q.props.children, W.mode, Oe, Q.key);
          return jn.return = W, jn;
        } else {
          var ta = $g(Q, W.mode, Oe);
          return ta.ref = Bp(W, ce, Q), ta.return = W, ta;
        }
      }
      function kn(W, ce, Q, Oe) {
        for (var nt = Q.key, Ke = ce; Ke !== null; ) {
          if (Ke.key === nt)
            if (Ke.tag === D && Ke.stateNode.containerInfo === Q.containerInfo && Ke.stateNode.implementation === Q.implementation) {
              i(W, Ke.sibling);
              var jt = c(Ke, Q.children || []);
              return jt.return = W, jt;
            } else {
              i(W, Ke);
              break;
            }
          else
            t(W, Ke);
          Ke = Ke.sibling;
        }
        var Gt = Ig(Q, W.mode, Oe);
        return Gt.return = W, Gt;
      }
      function Cn(W, ce, Q, Oe) {
        var nt = typeof Q == "object" && Q !== null && Q.type === Dn && Q.key === null;
        if (nt && (Q = Q.props.children), typeof Q == "object" && Q !== null) {
          switch (Q.$$typeof) {
            case Ft:
              return g(mt(W, ce, Q, Oe));
            case Wt:
              return g(kn(W, ce, Q, Oe));
            case qe:
              var Ke = Q._payload, jt = Q._init;
              return Cn(W, ce, jt(Ke), Oe);
          }
          if (bt(Q))
            return se(W, ce, Q, Oe);
          if (dt(Q))
            return Qe(W, ce, Q, Oe);
          ym(W, Q);
        }
        return typeof Q == "string" && Q !== "" || typeof Q == "number" ? g(Tt(W, ce, "" + Q, Oe)) : (typeof Q == "function" && gm(W), i(W, ce));
      }
      return Cn;
    }
    var Xf = m2(!0), y2 = m2(!1);
    function rR(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var i = t.child, o = Mc(i, i.pendingProps);
        for (t.child = o, o.return = t; i.sibling !== null; )
          i = i.sibling, o = o.sibling = Mc(i, i.pendingProps), o.return = t;
        o.sibling = null;
      }
    }
    function aR(e, t) {
      for (var i = e.child; i !== null; )
        qM(i, t), i = i.sibling;
    }
    var Q0 = ts(null), G0;
    G0 = {};
    var Sm = null, Kf = null, X0 = null, xm = !1;
    function Em() {
      Sm = null, Kf = null, X0 = null, xm = !1;
    }
    function g2() {
      xm = !0;
    }
    function S2() {
      xm = !1;
    }
    function x2(e, t, i) {
      ci(Q0, t._currentValue, e), t._currentValue = i, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== G0 && v("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = G0;
    }
    function K0(e, t) {
      var i = Q0.current;
      si(Q0, t), e._currentValue = i;
    }
    function Z0(e, t, i) {
      for (var o = e; o !== null; ) {
        var c = o.alternate;
        if (su(o.childLanes, t) ? c !== null && !su(c.childLanes, t) && (c.childLanes = en(c.childLanes, t)) : (o.childLanes = en(o.childLanes, t), c !== null && (c.childLanes = en(c.childLanes, t))), o === i)
          break;
        o = o.return;
      }
      o !== i && v("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function iR(e, t, i) {
      lR(e, t, i);
    }
    function lR(e, t, i) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var c = void 0, d = o.dependencies;
        if (d !== null) {
          c = o.child;
          for (var g = d.firstContext; g !== null; ) {
            if (g.context === t) {
              if (o.tag === T) {
                var x = qs(i), w = Eu(ur, x);
                w.tag = Tm;
                var k = o.updateQueue;
                if (k !== null) {
                  var z = k.shared, I = z.pending;
                  I === null ? w.next = w : (w.next = I.next, I.next = w), z.pending = w;
                }
              }
              o.lanes = en(o.lanes, i);
              var $ = o.alternate;
              $ !== null && ($.lanes = en($.lanes, i)), Z0(o.return, i, e), d.lanes = en(d.lanes, i);
              break;
            }
            g = g.next;
          }
        } else if (o.tag === J)
          c = o.type === e.type ? null : o.child;
        else if (o.tag === ie) {
          var Z = o.return;
          if (Z === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          Z.lanes = en(Z.lanes, i);
          var ne = Z.alternate;
          ne !== null && (ne.lanes = en(ne.lanes, i)), Z0(Z, i, e), c = o.sibling;
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
            var se = c.sibling;
            if (se !== null) {
              se.return = c.return, c = se;
              break;
            }
            c = c.return;
          }
        o = c;
      }
    }
    function Zf(e, t) {
      Sm = e, Kf = null, X0 = null;
      var i = e.dependencies;
      if (i !== null) {
        var o = i.firstContext;
        o !== null && (ii(i.lanes, t) && iv(), i.firstContext = null);
      }
    }
    function ua(e) {
      xm && v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (X0 !== e) {
        var i = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (Kf === null) {
          if (Sm === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Kf = i, Sm.dependencies = {
            lanes: xe,
            firstContext: i
          };
        } else
          Kf = Kf.next = i;
      }
      return t;
    }
    var Sc = null;
    function J0(e) {
      Sc === null ? Sc = [e] : Sc.push(e);
    }
    function oR() {
      if (Sc !== null) {
        for (var e = 0; e < Sc.length; e++) {
          var t = Sc[e], i = t.interleaved;
          if (i !== null) {
            t.interleaved = null;
            var o = i.next, c = t.pending;
            if (c !== null) {
              var d = c.next;
              c.next = o, i.next = d;
            }
            t.pending = i;
          }
        }
        Sc = null;
      }
    }
    function E2(e, t, i, o) {
      var c = t.interleaved;
      return c === null ? (i.next = i, J0(t)) : (i.next = c.next, c.next = i), t.interleaved = i, Cm(e, o);
    }
    function uR(e, t, i, o) {
      var c = t.interleaved;
      c === null ? (i.next = i, J0(t)) : (i.next = c.next, c.next = i), t.interleaved = i;
    }
    function sR(e, t, i, o) {
      var c = t.interleaved;
      return c === null ? (i.next = i, J0(t)) : (i.next = c.next, c.next = i), t.interleaved = i, Cm(e, o);
    }
    function Bi(e, t) {
      return Cm(e, t);
    }
    var cR = Cm;
    function Cm(e, t) {
      e.lanes = en(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = en(i.lanes, t)), i === null && (e.flags & (Tr | ei)) !== xt && yx(e);
      for (var o = e, c = e.return; c !== null; )
        c.childLanes = en(c.childLanes, t), i = c.alternate, i !== null ? i.childLanes = en(i.childLanes, t) : (c.flags & (Tr | ei)) !== xt && yx(e), o = c, c = c.return;
      if (o.tag === R) {
        var d = o.stateNode;
        return d;
      } else
        return null;
    }
    var C2 = 0, T2 = 1, Tm = 2, e1 = 3, wm = !1, t1, Rm;
    t1 = !1, Rm = null;
    function n1(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: xe
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function w2(e, t) {
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
    function Eu(e, t) {
      var i = {
        eventTime: e,
        lane: t,
        tag: C2,
        payload: null,
        callback: null,
        next: null
      };
      return i;
    }
    function is(e, t, i) {
      var o = e.updateQueue;
      if (o === null)
        return null;
      var c = o.shared;
      if (Rm === c && !t1 && (v("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), t1 = !0), uM()) {
        var d = c.pending;
        return d === null ? t.next = t : (t.next = d.next, d.next = t), c.pending = t, cR(e, i);
      } else
        return sR(e, c, t, i);
    }
    function bm(e, t, i) {
      var o = t.updateQueue;
      if (o !== null) {
        var c = o.shared;
        if (rp(i)) {
          var d = c.lanes;
          d = ip(d, e.pendingLanes);
          var g = en(d, i);
          c.lanes = g, wf(e, g);
        }
      }
    }
    function r1(e, t) {
      var i = e.updateQueue, o = e.alternate;
      if (o !== null) {
        var c = o.updateQueue;
        if (i === c) {
          var d = null, g = null, x = i.firstBaseUpdate;
          if (x !== null) {
            var w = x;
            do {
              var k = {
                eventTime: w.eventTime,
                lane: w.lane,
                tag: w.tag,
                payload: w.payload,
                callback: w.callback,
                next: null
              };
              g === null ? d = g = k : (g.next = k, g = k), w = w.next;
            } while (w !== null);
            g === null ? d = g = t : (g.next = t, g = t);
          } else
            d = g = t;
          i = {
            baseState: c.baseState,
            firstBaseUpdate: d,
            lastBaseUpdate: g,
            shared: c.shared,
            effects: c.effects
          }, e.updateQueue = i;
          return;
        }
      }
      var z = i.lastBaseUpdate;
      z === null ? i.firstBaseUpdate = t : z.next = t, i.lastBaseUpdate = t;
    }
    function fR(e, t, i, o, c, d) {
      switch (i.tag) {
        case T2: {
          var g = i.payload;
          if (typeof g == "function") {
            g2();
            var x = g.call(d, o, c);
            {
              if (e.mode & nr) {
                wr(!0);
                try {
                  g.call(d, o, c);
                } finally {
                  wr(!1);
                }
              }
              S2();
            }
            return x;
          }
          return g;
        }
        case e1:
          e.flags = e.flags & ~aa | yt;
        // Intentional fallthrough
        case C2: {
          var w = i.payload, k;
          if (typeof w == "function") {
            g2(), k = w.call(d, o, c);
            {
              if (e.mode & nr) {
                wr(!0);
                try {
                  w.call(d, o, c);
                } finally {
                  wr(!1);
                }
              }
              S2();
            }
          } else
            k = w;
          return k == null ? o : gt({}, o, k);
        }
        case Tm:
          return wm = !0, o;
      }
      return o;
    }
    function Mm(e, t, i, o) {
      var c = e.updateQueue;
      wm = !1, Rm = c.shared;
      var d = c.firstBaseUpdate, g = c.lastBaseUpdate, x = c.shared.pending;
      if (x !== null) {
        c.shared.pending = null;
        var w = x, k = w.next;
        w.next = null, g === null ? d = k : g.next = k, g = w;
        var z = e.alternate;
        if (z !== null) {
          var I = z.updateQueue, $ = I.lastBaseUpdate;
          $ !== g && ($ === null ? I.firstBaseUpdate = k : $.next = k, I.lastBaseUpdate = w);
        }
      }
      if (d !== null) {
        var Z = c.baseState, ne = xe, se = null, Qe = null, Tt = null, mt = d;
        do {
          var kn = mt.lane, Cn = mt.eventTime;
          if (su(o, kn)) {
            if (Tt !== null) {
              var ce = {
                eventTime: Cn,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Ln,
                tag: mt.tag,
                payload: mt.payload,
                callback: mt.callback,
                next: null
              };
              Tt = Tt.next = ce;
            }
            Z = fR(e, c, mt, Z, t, i);
            var Q = mt.callback;
            if (Q !== null && // If the update was already committed, we should not queue its
            // callback again.
            mt.lane !== Ln) {
              e.flags |= fr;
              var Oe = c.effects;
              Oe === null ? c.effects = [mt] : Oe.push(mt);
            }
          } else {
            var W = {
              eventTime: Cn,
              lane: kn,
              tag: mt.tag,
              payload: mt.payload,
              callback: mt.callback,
              next: null
            };
            Tt === null ? (Qe = Tt = W, se = Z) : Tt = Tt.next = W, ne = en(ne, kn);
          }
          if (mt = mt.next, mt === null) {
            if (x = c.shared.pending, x === null)
              break;
            var nt = x, Ke = nt.next;
            nt.next = null, mt = Ke, c.lastBaseUpdate = nt, c.shared.pending = null;
          }
        } while (!0);
        Tt === null && (se = Z), c.baseState = se, c.firstBaseUpdate = Qe, c.lastBaseUpdate = Tt;
        var jt = c.shared.interleaved;
        if (jt !== null) {
          var Gt = jt;
          do
            ne = en(ne, Gt.lane), Gt = Gt.next;
          while (Gt !== jt);
        } else d === null && (c.shared.lanes = xe);
        yv(ne), e.lanes = ne, e.memoizedState = Z;
      }
      Rm = null;
    }
    function dR(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function R2() {
      wm = !1;
    }
    function _m() {
      return wm;
    }
    function b2(e, t, i) {
      var o = t.effects;
      if (t.effects = null, o !== null)
        for (var c = 0; c < o.length; c++) {
          var d = o[c], g = d.callback;
          g !== null && (d.callback = null, dR(g, i));
        }
    }
    var qp = {}, ls = ts(qp), Yp = ts(qp), km = ts(qp);
    function Dm(e) {
      if (e === qp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function M2() {
      var e = Dm(km.current);
      return e;
    }
    function a1(e, t) {
      ci(km, t, e), ci(Yp, e, e), ci(ls, qp, e);
      var i = kT(t);
      si(ls, e), ci(ls, i, e);
    }
    function Jf(e) {
      si(ls, e), si(Yp, e), si(km, e);
    }
    function i1() {
      var e = Dm(ls.current);
      return e;
    }
    function _2(e) {
      Dm(km.current);
      var t = Dm(ls.current), i = DT(t, e.type);
      t !== i && (ci(Yp, e, e), ci(ls, i, e));
    }
    function l1(e) {
      Yp.current === e && (si(ls, e), si(Yp, e));
    }
    var pR = 0, k2 = 1, D2 = 1, Wp = 2, Zl = ts(pR);
    function o1(e, t) {
      return (e & t) !== 0;
    }
    function ed(e) {
      return e & k2;
    }
    function u1(e, t) {
      return e & k2 | t;
    }
    function vR(e, t) {
      return e | t;
    }
    function os(e, t) {
      ci(Zl, t, e);
    }
    function td(e) {
      si(Zl, e);
    }
    function hR(e, t) {
      var i = e.memoizedState;
      return i !== null ? i.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Om(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === q) {
          var i = t.memoizedState;
          if (i !== null) {
            var o = i.dehydrated;
            if (o === null || WS(o) || b0(o))
              return t;
          }
        } else if (t.tag === ze && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var c = (t.flags & yt) !== xt;
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
    var qi = (
      /*   */
      0
    ), ga = (
      /* */
      1
    ), zo = (
      /*  */
      2
    ), Sa = (
      /*    */
      4
    ), $a = (
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
    function mR(e, t) {
      var i = t._getVersion, o = i(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, o] : e.mutableSourceEagerHydrationData.push(t, o);
    }
    var Je = s.ReactCurrentDispatcher, Qp = s.ReactCurrentBatchConfig, f1, nd;
    f1 = /* @__PURE__ */ new Set();
    var xc = xe, rr = null, xa = null, Ea = null, zm = !1, Gp = !1, Xp = 0, yR = 0, gR = 25, ve = null, bl = null, us = -1, d1 = !1;
    function Xn() {
      {
        var e = ve;
        bl === null ? bl = [e] : bl.push(e);
      }
    }
    function je() {
      {
        var e = ve;
        bl !== null && (us++, bl[us] !== e && SR(e));
      }
    }
    function rd(e) {
      e != null && !bt(e) && v("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", ve, typeof e);
    }
    function SR(e) {
      {
        var t = tt(rr);
        if (!f1.has(t) && (f1.add(t), bl !== null)) {
          for (var i = "", o = 30, c = 0; c <= us; c++) {
            for (var d = bl[c], g = c === us ? e : d, x = c + 1 + ". " + d; x.length < o; )
              x += " ";
            x += g + `
`, i += x;
          }
          v(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, i);
        }
      }
    }
    function fi() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function p1(e, t) {
      if (d1)
        return !1;
      if (t === null)
        return v("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", ve), !1;
      e.length !== t.length && v(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, ve, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var i = 0; i < t.length && i < e.length; i++)
        if (!Te(e[i], t[i]))
          return !1;
      return !0;
    }
    function ad(e, t, i, o, c, d) {
      xc = d, rr = t, bl = e !== null ? e._debugHookTypes : null, us = -1, d1 = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = xe, e !== null && e.memoizedState !== null ? Je.current = Z2 : bl !== null ? Je.current = K2 : Je.current = X2;
      var g = i(o, c);
      if (Gp) {
        var x = 0;
        do {
          if (Gp = !1, Xp = 0, x >= gR)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          x += 1, d1 = !1, xa = null, Ea = null, t.updateQueue = null, us = -1, Je.current = J2, g = i(o, c);
        } while (Gp);
      }
      Je.current = qm, t._debugHookTypes = bl;
      var w = xa !== null && xa.next !== null;
      if (xc = xe, rr = null, xa = null, Ea = null, ve = null, bl = null, us = -1, e !== null && (e.flags & Vr) !== (t.flags & Vr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & cn) !== Et && v("Internal React error: Expected static flag was missing. Please notify the React team."), zm = !1, w)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return g;
    }
    function id() {
      var e = Xp !== 0;
      return Xp = 0, e;
    }
    function O2(e, t, i) {
      t.updateQueue = e.updateQueue, (t.mode & Nn) !== Et ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ys(e.lanes, i);
    }
    function z2() {
      if (Je.current = qm, zm) {
        for (var e = rr.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        zm = !1;
      }
      xc = xe, rr = null, xa = null, Ea = null, bl = null, us = -1, ve = null, q2 = !1, Gp = !1, Xp = 0;
    }
    function Lo() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Ea === null ? rr.memoizedState = Ea = e : Ea = Ea.next = e, Ea;
    }
    function Ml() {
      var e;
      if (xa === null) {
        var t = rr.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = xa.next;
      var i;
      if (Ea === null ? i = rr.memoizedState : i = Ea.next, i !== null)
        Ea = i, i = Ea.next, xa = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        xa = e;
        var o = {
          memoizedState: xa.memoizedState,
          baseState: xa.baseState,
          baseQueue: xa.baseQueue,
          queue: xa.queue,
          next: null
        };
        Ea === null ? rr.memoizedState = Ea = o : Ea = Ea.next = o;
      }
      return Ea;
    }
    function L2() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function v1(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function h1(e, t, i) {
      var o = Lo(), c;
      i !== void 0 ? c = i(t) : c = t, o.memoizedState = o.baseState = c;
      var d = {
        pending: null,
        interleaved: null,
        lanes: xe,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      };
      o.queue = d;
      var g = d.dispatch = TR.bind(null, rr, d);
      return [o.memoizedState, g];
    }
    function m1(e, t, i) {
      var o = Ml(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var d = xa, g = d.baseQueue, x = c.pending;
      if (x !== null) {
        if (g !== null) {
          var w = g.next, k = x.next;
          g.next = k, x.next = w;
        }
        d.baseQueue !== g && v("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), d.baseQueue = g = x, c.pending = null;
      }
      if (g !== null) {
        var z = g.next, I = d.baseState, $ = null, Z = null, ne = null, se = z;
        do {
          var Qe = se.lane;
          if (su(xc, Qe)) {
            if (ne !== null) {
              var mt = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Ln,
                action: se.action,
                hasEagerState: se.hasEagerState,
                eagerState: se.eagerState,
                next: null
              };
              ne = ne.next = mt;
            }
            if (se.hasEagerState)
              I = se.eagerState;
            else {
              var kn = se.action;
              I = e(I, kn);
            }
          } else {
            var Tt = {
              lane: Qe,
              action: se.action,
              hasEagerState: se.hasEagerState,
              eagerState: se.eagerState,
              next: null
            };
            ne === null ? (Z = ne = Tt, $ = I) : ne = ne.next = Tt, rr.lanes = en(rr.lanes, Qe), yv(Qe);
          }
          se = se.next;
        } while (se !== null && se !== z);
        ne === null ? $ = I : ne.next = Z, Te(I, o.memoizedState) || iv(), o.memoizedState = I, o.baseState = $, o.baseQueue = ne, c.lastRenderedState = I;
      }
      var Cn = c.interleaved;
      if (Cn !== null) {
        var W = Cn;
        do {
          var ce = W.lane;
          rr.lanes = en(rr.lanes, ce), yv(ce), W = W.next;
        } while (W !== Cn);
      } else g === null && (c.lanes = xe);
      var Q = c.dispatch;
      return [o.memoizedState, Q];
    }
    function y1(e, t, i) {
      var o = Ml(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var d = c.dispatch, g = c.pending, x = o.memoizedState;
      if (g !== null) {
        c.pending = null;
        var w = g.next, k = w;
        do {
          var z = k.action;
          x = e(x, z), k = k.next;
        } while (k !== w);
        Te(x, o.memoizedState) || iv(), o.memoizedState = x, o.baseQueue === null && (o.baseState = x), c.lastRenderedState = x;
      }
      return [x, d];
    }
    function x4(e, t, i) {
    }
    function E4(e, t, i) {
    }
    function g1(e, t, i) {
      var o = rr, c = Lo(), d, g = Ha();
      if (g) {
        if (i === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        d = i(), nd || d !== i() && (v("The result of getServerSnapshot should be cached to avoid an infinite loop"), nd = !0);
      } else {
        if (d = t(), !nd) {
          var x = t();
          Te(d, x) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), nd = !0);
        }
        var w = cy();
        if (w === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Cf(w, xc) || A2(o, t, d);
      }
      c.memoizedState = d;
      var k = {
        value: d,
        getSnapshot: t
      };
      return c.queue = k, jm(U2.bind(null, o, k, e), [e]), o.flags |= Ja, Kp(ga | $a, N2.bind(null, o, k, d, t), void 0, null), d;
    }
    function Lm(e, t, i) {
      var o = rr, c = Ml(), d = t();
      if (!nd) {
        var g = t();
        Te(d, g) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), nd = !0);
      }
      var x = c.memoizedState, w = !Te(x, d);
      w && (c.memoizedState = d, iv());
      var k = c.queue;
      if (Jp(U2.bind(null, o, k, e), [e]), k.getSnapshot !== t || w || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      Ea !== null && Ea.memoizedState.tag & ga) {
        o.flags |= Ja, Kp(ga | $a, N2.bind(null, o, k, d, t), void 0, null);
        var z = cy();
        if (z === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Cf(z, xc) || A2(o, t, d);
      }
      return d;
    }
    function A2(e, t, i) {
      e.flags |= Pu;
      var o = {
        getSnapshot: t,
        value: i
      }, c = rr.updateQueue;
      if (c === null)
        c = L2(), rr.updateQueue = c, c.stores = [o];
      else {
        var d = c.stores;
        d === null ? c.stores = [o] : d.push(o);
      }
    }
    function N2(e, t, i, o) {
      t.value = i, t.getSnapshot = o, j2(t) && F2(e);
    }
    function U2(e, t, i) {
      var o = function() {
        j2(t) && F2(e);
      };
      return i(o);
    }
    function j2(e) {
      var t = e.getSnapshot, i = e.value;
      try {
        var o = t();
        return !Te(i, o);
      } catch {
        return !0;
      }
    }
    function F2(e) {
      var t = Bi(e, Ut);
      t !== null && Ra(t, e, Ut, ur);
    }
    function Am(e) {
      var t = Lo();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        interleaved: null,
        lanes: xe,
        dispatch: null,
        lastRenderedReducer: v1,
        lastRenderedState: e
      };
      t.queue = i;
      var o = i.dispatch = wR.bind(null, rr, i);
      return [t.memoizedState, o];
    }
    function S1(e) {
      return m1(v1);
    }
    function x1(e) {
      return y1(v1);
    }
    function Kp(e, t, i, o) {
      var c = {
        tag: e,
        create: t,
        destroy: i,
        deps: o,
        // Circular
        next: null
      }, d = rr.updateQueue;
      if (d === null)
        d = L2(), rr.updateQueue = d, d.lastEffect = c.next = c;
      else {
        var g = d.lastEffect;
        if (g === null)
          d.lastEffect = c.next = c;
        else {
          var x = g.next;
          g.next = c, c.next = x, d.lastEffect = c;
        }
      }
      return c;
    }
    function E1(e) {
      var t = Lo();
      {
        var i = {
          current: e
        };
        return t.memoizedState = i, i;
      }
    }
    function Nm(e) {
      var t = Ml();
      return t.memoizedState;
    }
    function Zp(e, t, i, o) {
      var c = Lo(), d = o === void 0 ? null : o;
      rr.flags |= e, c.memoizedState = Kp(ga | t, i, void 0, d);
    }
    function Um(e, t, i, o) {
      var c = Ml(), d = o === void 0 ? null : o, g = void 0;
      if (xa !== null) {
        var x = xa.memoizedState;
        if (g = x.destroy, d !== null) {
          var w = x.deps;
          if (p1(d, w)) {
            c.memoizedState = Kp(t, i, g, d);
            return;
          }
        }
      }
      rr.flags |= e, c.memoizedState = Kp(ga | t, i, g, d);
    }
    function jm(e, t) {
      return (rr.mode & Nn) !== Et ? Zp(vl | Ja | Qc, $a, e, t) : Zp(Ja | Qc, $a, e, t);
    }
    function Jp(e, t) {
      return Um(Ja, $a, e, t);
    }
    function C1(e, t) {
      return Zp(bn, zo, e, t);
    }
    function Fm(e, t) {
      return Um(bn, zo, e, t);
    }
    function T1(e, t) {
      var i = bn;
      return i |= Hl, (rr.mode & Nn) !== Et && (i |= vo), Zp(i, Sa, e, t);
    }
    function Pm(e, t) {
      return Um(bn, Sa, e, t);
    }
    function P2(e, t) {
      if (typeof t == "function") {
        var i = t, o = e();
        return i(o), function() {
          i(null);
        };
      } else if (t != null) {
        var c = t;
        c.hasOwnProperty("current") || v("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(c).join(", ") + "}");
        var d = e();
        return c.current = d, function() {
          c.current = null;
        };
      }
    }
    function w1(e, t, i) {
      typeof t != "function" && v("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = i != null ? i.concat([e]) : null, c = bn;
      return c |= Hl, (rr.mode & Nn) !== Et && (c |= vo), Zp(c, Sa, P2.bind(null, t, e), o);
    }
    function Hm(e, t, i) {
      typeof t != "function" && v("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = i != null ? i.concat([e]) : null;
      return Um(bn, Sa, P2.bind(null, t, e), o);
    }
    function xR(e, t) {
    }
    var $m = xR;
    function R1(e, t) {
      var i = Lo(), o = t === void 0 ? null : t;
      return i.memoizedState = [e, o], e;
    }
    function Vm(e, t) {
      var i = Ml(), o = t === void 0 ? null : t, c = i.memoizedState;
      if (c !== null && o !== null) {
        var d = c[1];
        if (p1(o, d))
          return c[0];
      }
      return i.memoizedState = [e, o], e;
    }
    function b1(e, t) {
      var i = Lo(), o = t === void 0 ? null : t, c = e();
      return i.memoizedState = [c, o], c;
    }
    function Im(e, t) {
      var i = Ml(), o = t === void 0 ? null : t, c = i.memoizedState;
      if (c !== null && o !== null) {
        var d = c[1];
        if (p1(o, d))
          return c[0];
      }
      var g = e();
      return i.memoizedState = [g, o], g;
    }
    function M1(e) {
      var t = Lo();
      return t.memoizedState = e, e;
    }
    function H2(e) {
      var t = Ml(), i = xa, o = i.memoizedState;
      return V2(t, o, e);
    }
    function $2(e) {
      var t = Ml();
      if (xa === null)
        return t.memoizedState = e, e;
      var i = xa.memoizedState;
      return V2(t, i, e);
    }
    function V2(e, t, i) {
      var o = !tp(xc);
      if (o) {
        if (!Te(i, t)) {
          var c = ap();
          rr.lanes = en(rr.lanes, c), yv(c), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, iv()), e.memoizedState = i, i;
    }
    function ER(e, t, i) {
      var o = $i();
      qr(xh(o, gl)), e(!0);
      var c = Qp.transition;
      Qp.transition = {};
      var d = Qp.transition;
      Qp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (qr(o), Qp.transition = c, c === null && d._updatedFibers) {
          var g = d._updatedFibers.size;
          g > 10 && y("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), d._updatedFibers.clear();
        }
      }
    }
    function _1() {
      var e = Am(!1), t = e[0], i = e[1], o = ER.bind(null, i), c = Lo();
      return c.memoizedState = o, [t, o];
    }
    function I2() {
      var e = S1(), t = e[0], i = Ml(), o = i.memoizedState;
      return [t, o];
    }
    function B2() {
      var e = x1(), t = e[0], i = Ml(), o = i.memoizedState;
      return [t, o];
    }
    var q2 = !1;
    function CR() {
      return q2;
    }
    function k1() {
      var e = Lo(), t = cy(), i = t.identifierPrefix, o;
      if (Ha()) {
        var c = Pw();
        o = ":" + i + "R" + c;
        var d = Xp++;
        d > 0 && (o += "H" + d.toString(32)), o += ":";
      } else {
        var g = yR++;
        o = ":" + i + "r" + g.toString(32) + ":";
      }
      return e.memoizedState = o, o;
    }
    function Bm() {
      var e = Ml(), t = e.memoizedState;
      return t;
    }
    function TR(e, t, i) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = ps(e), c = {
        lane: o,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (Y2(e))
        W2(t, c);
      else {
        var d = E2(e, t, c, o);
        if (d !== null) {
          var g = bi();
          Ra(d, e, o, g), Q2(d, t, o);
        }
      }
      G2(e, o);
    }
    function wR(e, t, i) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = ps(e), c = {
        lane: o,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (Y2(e))
        W2(t, c);
      else {
        var d = e.alternate;
        if (e.lanes === xe && (d === null || d.lanes === xe)) {
          var g = t.lastRenderedReducer;
          if (g !== null) {
            var x;
            x = Je.current, Je.current = Jl;
            try {
              var w = t.lastRenderedState, k = g(w, i);
              if (c.hasEagerState = !0, c.eagerState = k, Te(k, w)) {
                uR(e, t, c, o);
                return;
              }
            } catch {
            } finally {
              Je.current = x;
            }
          }
        }
        var z = E2(e, t, c, o);
        if (z !== null) {
          var I = bi();
          Ra(z, e, o, I), Q2(z, t, o);
        }
      }
      G2(e, o);
    }
    function Y2(e) {
      var t = e.alternate;
      return e === rr || t !== null && t === rr;
    }
    function W2(e, t) {
      Gp = zm = !0;
      var i = e.pending;
      i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
    }
    function Q2(e, t, i) {
      if (rp(i)) {
        var o = t.lanes;
        o = ip(o, e.pendingLanes);
        var c = en(o, i);
        t.lanes = c, wf(e, c);
      }
    }
    function G2(e, t, i) {
      Us(e, t);
    }
    var qm = {
      readContext: ua,
      useCallback: fi,
      useContext: fi,
      useEffect: fi,
      useImperativeHandle: fi,
      useInsertionEffect: fi,
      useLayoutEffect: fi,
      useMemo: fi,
      useReducer: fi,
      useRef: fi,
      useState: fi,
      useDebugValue: fi,
      useDeferredValue: fi,
      useTransition: fi,
      useMutableSource: fi,
      useSyncExternalStore: fi,
      useId: fi,
      unstable_isNewReconciler: de
    }, X2 = null, K2 = null, Z2 = null, J2 = null, Ao = null, Jl = null, Ym = null;
    {
      var D1 = function() {
        v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, Bt = function() {
        v("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      X2 = {
        readContext: function(e) {
          return ua(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", Xn(), rd(t), R1(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", Xn(), ua(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", Xn(), rd(t), jm(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", Xn(), rd(i), w1(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", Xn(), rd(t), C1(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", Xn(), rd(t), T1(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", Xn(), rd(t);
          var i = Je.current;
          Je.current = Ao;
          try {
            return b1(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", Xn();
          var o = Je.current;
          Je.current = Ao;
          try {
            return h1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", Xn(), E1(e);
        },
        useState: function(e) {
          ve = "useState", Xn();
          var t = Je.current;
          Je.current = Ao;
          try {
            return Am(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", Xn(), void 0;
        },
        useDeferredValue: function(e) {
          return ve = "useDeferredValue", Xn(), M1(e);
        },
        useTransition: function() {
          return ve = "useTransition", Xn(), _1();
        },
        useMutableSource: function(e, t, i) {
          return ve = "useMutableSource", Xn(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return ve = "useSyncExternalStore", Xn(), g1(e, t, i);
        },
        useId: function() {
          return ve = "useId", Xn(), k1();
        },
        unstable_isNewReconciler: de
      }, K2 = {
        readContext: function(e) {
          return ua(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", je(), R1(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", je(), ua(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", je(), jm(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", je(), w1(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", je(), C1(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", je(), T1(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", je();
          var i = Je.current;
          Je.current = Ao;
          try {
            return b1(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", je();
          var o = Je.current;
          Je.current = Ao;
          try {
            return h1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", je(), E1(e);
        },
        useState: function(e) {
          ve = "useState", je();
          var t = Je.current;
          Je.current = Ao;
          try {
            return Am(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", je(), void 0;
        },
        useDeferredValue: function(e) {
          return ve = "useDeferredValue", je(), M1(e);
        },
        useTransition: function() {
          return ve = "useTransition", je(), _1();
        },
        useMutableSource: function(e, t, i) {
          return ve = "useMutableSource", je(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return ve = "useSyncExternalStore", je(), g1(e, t, i);
        },
        useId: function() {
          return ve = "useId", je(), k1();
        },
        unstable_isNewReconciler: de
      }, Z2 = {
        readContext: function(e) {
          return ua(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", je(), Vm(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", je(), ua(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", je(), Jp(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", je(), Hm(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", je(), Fm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", je(), Pm(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", je();
          var i = Je.current;
          Je.current = Jl;
          try {
            return Im(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", je();
          var o = Je.current;
          Je.current = Jl;
          try {
            return m1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", je(), Nm();
        },
        useState: function(e) {
          ve = "useState", je();
          var t = Je.current;
          Je.current = Jl;
          try {
            return S1(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", je(), $m();
        },
        useDeferredValue: function(e) {
          return ve = "useDeferredValue", je(), H2(e);
        },
        useTransition: function() {
          return ve = "useTransition", je(), I2();
        },
        useMutableSource: function(e, t, i) {
          return ve = "useMutableSource", je(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return ve = "useSyncExternalStore", je(), Lm(e, t);
        },
        useId: function() {
          return ve = "useId", je(), Bm();
        },
        unstable_isNewReconciler: de
      }, J2 = {
        readContext: function(e) {
          return ua(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", je(), Vm(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", je(), ua(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", je(), Jp(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", je(), Hm(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", je(), Fm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", je(), Pm(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", je();
          var i = Je.current;
          Je.current = Ym;
          try {
            return Im(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", je();
          var o = Je.current;
          Je.current = Ym;
          try {
            return y1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", je(), Nm();
        },
        useState: function(e) {
          ve = "useState", je();
          var t = Je.current;
          Je.current = Ym;
          try {
            return x1(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", je(), $m();
        },
        useDeferredValue: function(e) {
          return ve = "useDeferredValue", je(), $2(e);
        },
        useTransition: function() {
          return ve = "useTransition", je(), B2();
        },
        useMutableSource: function(e, t, i) {
          return ve = "useMutableSource", je(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return ve = "useSyncExternalStore", je(), Lm(e, t);
        },
        useId: function() {
          return ve = "useId", je(), Bm();
        },
        unstable_isNewReconciler: de
      }, Ao = {
        readContext: function(e) {
          return D1(), ua(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", Bt(), Xn(), R1(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", Bt(), Xn(), ua(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", Bt(), Xn(), jm(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", Bt(), Xn(), w1(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", Bt(), Xn(), C1(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", Bt(), Xn(), T1(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", Bt(), Xn();
          var i = Je.current;
          Je.current = Ao;
          try {
            return b1(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", Bt(), Xn();
          var o = Je.current;
          Je.current = Ao;
          try {
            return h1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", Bt(), Xn(), E1(e);
        },
        useState: function(e) {
          ve = "useState", Bt(), Xn();
          var t = Je.current;
          Je.current = Ao;
          try {
            return Am(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", Bt(), Xn(), void 0;
        },
        useDeferredValue: function(e) {
          return ve = "useDeferredValue", Bt(), Xn(), M1(e);
        },
        useTransition: function() {
          return ve = "useTransition", Bt(), Xn(), _1();
        },
        useMutableSource: function(e, t, i) {
          return ve = "useMutableSource", Bt(), Xn(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return ve = "useSyncExternalStore", Bt(), Xn(), g1(e, t, i);
        },
        useId: function() {
          return ve = "useId", Bt(), Xn(), k1();
        },
        unstable_isNewReconciler: de
      }, Jl = {
        readContext: function(e) {
          return D1(), ua(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", Bt(), je(), Vm(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", Bt(), je(), ua(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", Bt(), je(), Jp(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", Bt(), je(), Hm(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", Bt(), je(), Fm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", Bt(), je(), Pm(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", Bt(), je();
          var i = Je.current;
          Je.current = Jl;
          try {
            return Im(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", Bt(), je();
          var o = Je.current;
          Je.current = Jl;
          try {
            return m1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", Bt(), je(), Nm();
        },
        useState: function(e) {
          ve = "useState", Bt(), je();
          var t = Je.current;
          Je.current = Jl;
          try {
            return S1(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", Bt(), je(), $m();
        },
        useDeferredValue: function(e) {
          return ve = "useDeferredValue", Bt(), je(), H2(e);
        },
        useTransition: function() {
          return ve = "useTransition", Bt(), je(), I2();
        },
        useMutableSource: function(e, t, i) {
          return ve = "useMutableSource", Bt(), je(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return ve = "useSyncExternalStore", Bt(), je(), Lm(e, t);
        },
        useId: function() {
          return ve = "useId", Bt(), je(), Bm();
        },
        unstable_isNewReconciler: de
      }, Ym = {
        readContext: function(e) {
          return D1(), ua(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", Bt(), je(), Vm(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", Bt(), je(), ua(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", Bt(), je(), Jp(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", Bt(), je(), Hm(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", Bt(), je(), Fm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", Bt(), je(), Pm(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", Bt(), je();
          var i = Je.current;
          Je.current = Jl;
          try {
            return Im(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", Bt(), je();
          var o = Je.current;
          Je.current = Jl;
          try {
            return y1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", Bt(), je(), Nm();
        },
        useState: function(e) {
          ve = "useState", Bt(), je();
          var t = Je.current;
          Je.current = Jl;
          try {
            return x1(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", Bt(), je(), $m();
        },
        useDeferredValue: function(e) {
          return ve = "useDeferredValue", Bt(), je(), $2(e);
        },
        useTransition: function() {
          return ve = "useTransition", Bt(), je(), B2();
        },
        useMutableSource: function(e, t, i) {
          return ve = "useMutableSource", Bt(), je(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return ve = "useSyncExternalStore", Bt(), je(), Lm(e, t);
        },
        useId: function() {
          return ve = "useId", Bt(), je(), Bm();
        },
        unstable_isNewReconciler: de
      };
    }
    var ss = l.unstable_now, e3 = 0, Wm = -1, ev = -1, Qm = -1, O1 = !1, Gm = !1;
    function t3() {
      return O1;
    }
    function RR() {
      Gm = !0;
    }
    function bR() {
      O1 = !1, Gm = !1;
    }
    function MR() {
      O1 = Gm, Gm = !1;
    }
    function n3() {
      return e3;
    }
    function r3() {
      e3 = ss();
    }
    function z1(e) {
      ev = ss(), e.actualStartTime < 0 && (e.actualStartTime = ss());
    }
    function a3(e) {
      ev = -1;
    }
    function Xm(e, t) {
      if (ev >= 0) {
        var i = ss() - ev;
        e.actualDuration += i, t && (e.selfBaseDuration = i), ev = -1;
      }
    }
    function No(e) {
      if (Wm >= 0) {
        var t = ss() - Wm;
        Wm = -1;
        for (var i = e.return; i !== null; ) {
          switch (i.tag) {
            case R:
              var o = i.stateNode;
              o.effectDuration += t;
              return;
            case ee:
              var c = i.stateNode;
              c.effectDuration += t;
              return;
          }
          i = i.return;
        }
      }
    }
    function L1(e) {
      if (Qm >= 0) {
        var t = ss() - Qm;
        Qm = -1;
        for (var i = e.return; i !== null; ) {
          switch (i.tag) {
            case R:
              var o = i.stateNode;
              o !== null && (o.passiveEffectDuration += t);
              return;
            case ee:
              var c = i.stateNode;
              c !== null && (c.passiveEffectDuration += t);
              return;
          }
          i = i.return;
        }
      }
    }
    function Uo() {
      Wm = ss();
    }
    function A1() {
      Qm = ss();
    }
    function N1(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function eo(e, t) {
      if (e && e.defaultProps) {
        var i = gt({}, t), o = e.defaultProps;
        for (var c in o)
          i[c] === void 0 && (i[c] = o[c]);
        return i;
      }
      return t;
    }
    var U1 = {}, j1, F1, P1, H1, $1, i3, Km, V1, I1, B1, tv;
    {
      j1 = /* @__PURE__ */ new Set(), F1 = /* @__PURE__ */ new Set(), P1 = /* @__PURE__ */ new Set(), H1 = /* @__PURE__ */ new Set(), V1 = /* @__PURE__ */ new Set(), $1 = /* @__PURE__ */ new Set(), I1 = /* @__PURE__ */ new Set(), B1 = /* @__PURE__ */ new Set(), tv = /* @__PURE__ */ new Set();
      var l3 = /* @__PURE__ */ new Set();
      Km = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var i = t + "_" + e;
          l3.has(i) || (l3.add(i), v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, i3 = function(e, t) {
        if (t === void 0) {
          var i = vt(e) || "Component";
          $1.has(i) || ($1.add(i), v("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", i));
        }
      }, Object.defineProperty(U1, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(U1);
    }
    function q1(e, t, i, o) {
      var c = e.memoizedState, d = i(o, c);
      {
        if (e.mode & nr) {
          wr(!0);
          try {
            d = i(o, c);
          } finally {
            wr(!1);
          }
        }
        i3(t, d);
      }
      var g = d == null ? c : gt({}, c, d);
      if (e.memoizedState = g, e.lanes === xe) {
        var x = e.updateQueue;
        x.baseState = g;
      }
    }
    var Y1 = {
      isMounted: ah,
      enqueueSetState: function(e, t, i) {
        var o = Fu(e), c = bi(), d = ps(o), g = Eu(c, d);
        g.payload = t, i != null && (Km(i, "setState"), g.callback = i);
        var x = is(o, g, d);
        x !== null && (Ra(x, o, d, c), bm(x, o, d)), Us(o, d);
      },
      enqueueReplaceState: function(e, t, i) {
        var o = Fu(e), c = bi(), d = ps(o), g = Eu(c, d);
        g.tag = T2, g.payload = t, i != null && (Km(i, "replaceState"), g.callback = i);
        var x = is(o, g, d);
        x !== null && (Ra(x, o, d, c), bm(x, o, d)), Us(o, d);
      },
      enqueueForceUpdate: function(e, t) {
        var i = Fu(e), o = bi(), c = ps(i), d = Eu(o, c);
        d.tag = Tm, t != null && (Km(t, "forceUpdate"), d.callback = t);
        var g = is(i, d, c);
        g !== null && (Ra(g, i, c, o), bm(g, i, c)), tf(i, c);
      }
    };
    function o3(e, t, i, o, c, d, g) {
      var x = e.stateNode;
      if (typeof x.shouldComponentUpdate == "function") {
        var w = x.shouldComponentUpdate(o, d, g);
        {
          if (e.mode & nr) {
            wr(!0);
            try {
              w = x.shouldComponentUpdate(o, d, g);
            } finally {
              wr(!1);
            }
          }
          w === void 0 && v("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", vt(t) || "Component");
        }
        return w;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !ot(i, o) || !ot(c, d) : !0;
    }
    function _R(e, t, i) {
      var o = e.stateNode;
      {
        var c = vt(t) || "Component", d = o.render;
        d || (t.prototype && typeof t.prototype.render == "function" ? v("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", c) : v("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", c)), o.getInitialState && !o.getInitialState.isReactClassApproved && !o.state && v("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", c), o.getDefaultProps && !o.getDefaultProps.isReactClassApproved && v("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", c), o.propTypes && v("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", c), o.contextType && v("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", c), t.childContextTypes && !tv.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & nr) === Et && (tv.add(t), v(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), t.contextTypes && !tv.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & nr) === Et && (tv.add(t), v(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), o.contextTypes && v("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", c), t.contextType && t.contextTypes && !I1.has(t) && (I1.add(t), v("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", c)), typeof o.componentShouldUpdate == "function" && v("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", c), t.prototype && t.prototype.isPureReactComponent && typeof o.shouldComponentUpdate < "u" && v("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", vt(t) || "A pure component"), typeof o.componentDidUnmount == "function" && v("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", c), typeof o.componentDidReceiveProps == "function" && v("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", c), typeof o.componentWillRecieveProps == "function" && v("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", c), typeof o.UNSAFE_componentWillRecieveProps == "function" && v("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", c);
        var g = o.props !== i;
        o.props !== void 0 && g && v("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", c, c), o.defaultProps && v("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", c, c), typeof o.getSnapshotBeforeUpdate == "function" && typeof o.componentDidUpdate != "function" && !P1.has(t) && (P1.add(t), v("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", vt(t))), typeof o.getDerivedStateFromProps == "function" && v("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof o.getDerivedStateFromError == "function" && v("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof t.getSnapshotBeforeUpdate == "function" && v("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", c);
        var x = o.state;
        x && (typeof x != "object" || bt(x)) && v("%s.state: must be set to an object or null", c), typeof o.getChildContext == "function" && typeof t.childContextTypes != "object" && v("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", c);
      }
    }
    function u3(e, t) {
      t.updater = Y1, e.stateNode = t, Go(t, e), t._reactInternalInstance = U1;
    }
    function s3(e, t, i) {
      var o = !1, c = nl, d = nl, g = t.contextType;
      if ("contextType" in t) {
        var x = (
          // Allow null for conditional declaration
          g === null || g !== void 0 && g.$$typeof === A && g._context === void 0
        );
        if (!x && !B1.has(t)) {
          B1.add(t);
          var w = "";
          g === void 0 ? w = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof g != "object" ? w = " However, it is set to a " + typeof g + "." : g.$$typeof === Ct ? w = " Did you accidentally pass the Context.Provider instead?" : g._context !== void 0 ? w = " Did you accidentally pass the Context.Consumer instead?" : w = " However, it is set to an object with keys {" + Object.keys(g).join(", ") + "}.", v("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", vt(t) || "Component", w);
        }
      }
      if (typeof g == "object" && g !== null)
        d = ua(g);
      else {
        c = qf(e, t, !0);
        var k = t.contextTypes;
        o = k != null, d = o ? Yf(e, c) : nl;
      }
      var z = new t(i, d);
      if (e.mode & nr) {
        wr(!0);
        try {
          z = new t(i, d);
        } finally {
          wr(!1);
        }
      }
      var I = e.memoizedState = z.state !== null && z.state !== void 0 ? z.state : null;
      u3(e, z);
      {
        if (typeof t.getDerivedStateFromProps == "function" && I === null) {
          var $ = vt(t) || "Component";
          F1.has($) || (F1.add($), v("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", $, z.state === null ? "null" : "undefined", $));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof z.getSnapshotBeforeUpdate == "function") {
          var Z = null, ne = null, se = null;
          if (typeof z.componentWillMount == "function" && z.componentWillMount.__suppressDeprecationWarning !== !0 ? Z = "componentWillMount" : typeof z.UNSAFE_componentWillMount == "function" && (Z = "UNSAFE_componentWillMount"), typeof z.componentWillReceiveProps == "function" && z.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? ne = "componentWillReceiveProps" : typeof z.UNSAFE_componentWillReceiveProps == "function" && (ne = "UNSAFE_componentWillReceiveProps"), typeof z.componentWillUpdate == "function" && z.componentWillUpdate.__suppressDeprecationWarning !== !0 ? se = "componentWillUpdate" : typeof z.UNSAFE_componentWillUpdate == "function" && (se = "UNSAFE_componentWillUpdate"), Z !== null || ne !== null || se !== null) {
            var Qe = vt(t) || "Component", Tt = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            H1.has(Qe) || (H1.add(Qe), v(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, Qe, Tt, Z !== null ? `
  ` + Z : "", ne !== null ? `
  ` + ne : "", se !== null ? `
  ` + se : ""));
          }
        }
      }
      return o && ZS(e, c, d), z;
    }
    function kR(e, t) {
      var i = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), i !== t.state && (v("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", tt(e) || "Component"), Y1.enqueueReplaceState(t, t.state, null));
    }
    function c3(e, t, i, o) {
      var c = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, o), t.state !== c) {
        {
          var d = tt(e) || "Component";
          j1.has(d) || (j1.add(d), v("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", d));
        }
        Y1.enqueueReplaceState(t, t.state, null);
      }
    }
    function W1(e, t, i, o) {
      _R(e, t, i);
      var c = e.stateNode;
      c.props = i, c.state = e.memoizedState, c.refs = {}, n1(e);
      var d = t.contextType;
      if (typeof d == "object" && d !== null)
        c.context = ua(d);
      else {
        var g = qf(e, t, !0);
        c.context = Yf(e, g);
      }
      {
        if (c.state === i) {
          var x = vt(t) || "Component";
          V1.has(x) || (V1.add(x), v("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", x));
        }
        e.mode & nr && Kl.recordLegacyContextWarning(e, c), Kl.recordUnsafeLifecycleWarnings(e, c);
      }
      c.state = e.memoizedState;
      var w = t.getDerivedStateFromProps;
      if (typeof w == "function" && (q1(e, t, w, i), c.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof c.getSnapshotBeforeUpdate != "function" && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (kR(e, c), Mm(e, i, c, o), c.state = e.memoizedState), typeof c.componentDidMount == "function") {
        var k = bn;
        k |= Hl, (e.mode & Nn) !== Et && (k |= vo), e.flags |= k;
      }
    }
    function DR(e, t, i, o) {
      var c = e.stateNode, d = e.memoizedProps;
      c.props = d;
      var g = c.context, x = t.contextType, w = nl;
      if (typeof x == "object" && x !== null)
        w = ua(x);
      else {
        var k = qf(e, t, !0);
        w = Yf(e, k);
      }
      var z = t.getDerivedStateFromProps, I = typeof z == "function" || typeof c.getSnapshotBeforeUpdate == "function";
      !I && (typeof c.UNSAFE_componentWillReceiveProps == "function" || typeof c.componentWillReceiveProps == "function") && (d !== i || g !== w) && c3(e, c, i, w), R2();
      var $ = e.memoizedState, Z = c.state = $;
      if (Mm(e, i, c, o), Z = e.memoizedState, d === i && $ === Z && !um() && !_m()) {
        if (typeof c.componentDidMount == "function") {
          var ne = bn;
          ne |= Hl, (e.mode & Nn) !== Et && (ne |= vo), e.flags |= ne;
        }
        return !1;
      }
      typeof z == "function" && (q1(e, t, z, i), Z = e.memoizedState);
      var se = _m() || o3(e, t, d, i, $, Z, w);
      if (se) {
        if (!I && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function") {
          var Qe = bn;
          Qe |= Hl, (e.mode & Nn) !== Et && (Qe |= vo), e.flags |= Qe;
        }
      } else {
        if (typeof c.componentDidMount == "function") {
          var Tt = bn;
          Tt |= Hl, (e.mode & Nn) !== Et && (Tt |= vo), e.flags |= Tt;
        }
        e.memoizedProps = i, e.memoizedState = Z;
      }
      return c.props = i, c.state = Z, c.context = w, se;
    }
    function OR(e, t, i, o, c) {
      var d = t.stateNode;
      w2(e, t);
      var g = t.memoizedProps, x = t.type === t.elementType ? g : eo(t.type, g);
      d.props = x;
      var w = t.pendingProps, k = d.context, z = i.contextType, I = nl;
      if (typeof z == "object" && z !== null)
        I = ua(z);
      else {
        var $ = qf(t, i, !0);
        I = Yf(t, $);
      }
      var Z = i.getDerivedStateFromProps, ne = typeof Z == "function" || typeof d.getSnapshotBeforeUpdate == "function";
      !ne && (typeof d.UNSAFE_componentWillReceiveProps == "function" || typeof d.componentWillReceiveProps == "function") && (g !== w || k !== I) && c3(t, d, o, I), R2();
      var se = t.memoizedState, Qe = d.state = se;
      if (Mm(t, o, d, c), Qe = t.memoizedState, g === w && se === Qe && !um() && !_m() && !Ae)
        return typeof d.componentDidUpdate == "function" && (g !== e.memoizedProps || se !== e.memoizedState) && (t.flags |= bn), typeof d.getSnapshotBeforeUpdate == "function" && (g !== e.memoizedProps || se !== e.memoizedState) && (t.flags |= Zr), !1;
      typeof Z == "function" && (q1(t, i, Z, o), Qe = t.memoizedState);
      var Tt = _m() || o3(t, i, x, o, se, Qe, I) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Ae;
      return Tt ? (!ne && (typeof d.UNSAFE_componentWillUpdate == "function" || typeof d.componentWillUpdate == "function") && (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, Qe, I), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(o, Qe, I)), typeof d.componentDidUpdate == "function" && (t.flags |= bn), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= Zr)) : (typeof d.componentDidUpdate == "function" && (g !== e.memoizedProps || se !== e.memoizedState) && (t.flags |= bn), typeof d.getSnapshotBeforeUpdate == "function" && (g !== e.memoizedProps || se !== e.memoizedState) && (t.flags |= Zr), t.memoizedProps = o, t.memoizedState = Qe), d.props = o, d.state = Qe, d.context = I, Tt;
    }
    function Ec(e, t) {
      return {
        value: e,
        source: t,
        stack: _r(t),
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
    function zR(e, t) {
      return !0;
    }
    function G1(e, t) {
      try {
        var i = zR(e, t);
        if (i === !1)
          return;
        var o = t.value, c = t.source, d = t.stack, g = d !== null ? d : "";
        if (o != null && o._suppressLogging) {
          if (e.tag === T)
            return;
          console.error(o);
        }
        var x = c ? tt(c) : null, w = x ? "The above error occurred in the <" + x + "> component:" : "The above error occurred in one of your React components:", k;
        if (e.tag === R)
          k = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var z = tt(e) || "Anonymous";
          k = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + z + ".");
        }
        var I = w + `
` + g + `

` + ("" + k);
        console.error(I);
      } catch ($) {
        setTimeout(function() {
          throw $;
        });
      }
    }
    var LR = typeof WeakMap == "function" ? WeakMap : Map;
    function f3(e, t, i) {
      var o = Eu(ur, i);
      o.tag = e1, o.payload = {
        element: null
      };
      var c = t.value;
      return o.callback = function() {
        RM(c), G1(e, t);
      }, o;
    }
    function X1(e, t, i) {
      var o = Eu(ur, i);
      o.tag = e1;
      var c = e.type.getDerivedStateFromError;
      if (typeof c == "function") {
        var d = t.value;
        o.payload = function() {
          return c(d);
        }, o.callback = function() {
          Cx(e), G1(e, t);
        };
      }
      var g = e.stateNode;
      return g !== null && typeof g.componentDidCatch == "function" && (o.callback = function() {
        Cx(e), G1(e, t), typeof c != "function" && TM(this);
        var w = t.value, k = t.stack;
        this.componentDidCatch(w, {
          componentStack: k !== null ? k : ""
        }), typeof c != "function" && (ii(e.lanes, Ut) || v("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", tt(e) || "Unknown"));
      }), o;
    }
    function d3(e, t, i) {
      var o = e.pingCache, c;
      if (o === null ? (o = e.pingCache = new LR(), c = /* @__PURE__ */ new Set(), o.set(t, c)) : (c = o.get(t), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(t, c))), !c.has(i)) {
        c.add(i);
        var d = bM.bind(null, e, t, i);
        ri && gv(e, i), t.then(d, d);
      }
    }
    function AR(e, t, i, o) {
      var c = e.updateQueue;
      if (c === null) {
        var d = /* @__PURE__ */ new Set();
        d.add(i), e.updateQueue = d;
      } else
        c.add(i);
    }
    function NR(e, t) {
      var i = e.tag;
      if ((e.mode & cn) === Et && (i === C || i === B || i === pe)) {
        var o = e.alternate;
        o ? (e.updateQueue = o.updateQueue, e.memoizedState = o.memoizedState, e.lanes = o.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function p3(e) {
      var t = e;
      do {
        if (t.tag === q && hR(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function v3(e, t, i, o, c) {
      if ((e.mode & cn) === Et) {
        if (e === t)
          e.flags |= aa;
        else {
          if (e.flags |= yt, i.flags |= Wc, i.flags &= -52805, i.tag === T) {
            var d = i.alternate;
            if (d === null)
              i.tag = he;
            else {
              var g = Eu(ur, Ut);
              g.tag = Tm, is(i, g, Ut);
            }
          }
          i.lanes = en(i.lanes, Ut);
        }
        return e;
      }
      return e.flags |= aa, e.lanes = c, e;
    }
    function UR(e, t, i, o, c) {
      if (i.flags |= Ds, ri && gv(e, c), o !== null && typeof o == "object" && typeof o.then == "function") {
        var d = o;
        NR(i), Ha() && i.mode & cn && i2();
        var g = p3(t);
        if (g !== null) {
          g.flags &= ~Da, v3(g, t, i, e, c), g.mode & cn && d3(e, d, c), AR(g, e, d);
          return;
        } else {
          if (!dh(c)) {
            d3(e, d, c), kg();
            return;
          }
          var x = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          o = x;
        }
      } else if (Ha() && i.mode & cn) {
        i2();
        var w = p3(t);
        if (w !== null) {
          (w.flags & aa) === xt && (w.flags |= Da), v3(w, t, i, e, c), V0(Ec(o, i));
          return;
        }
      }
      o = Ec(o, i), hM(o);
      var k = t;
      do {
        switch (k.tag) {
          case R: {
            var z = o;
            k.flags |= aa;
            var I = qs(c);
            k.lanes = en(k.lanes, I);
            var $ = f3(k, z, I);
            r1(k, $);
            return;
          }
          case T:
            var Z = o, ne = k.type, se = k.stateNode;
            if ((k.flags & yt) === xt && (typeof ne.getDerivedStateFromError == "function" || se !== null && typeof se.componentDidCatch == "function" && !px(se))) {
              k.flags |= aa;
              var Qe = qs(c);
              k.lanes = en(k.lanes, Qe);
              var Tt = X1(k, Z, Qe);
              r1(k, Tt);
              return;
            }
            break;
        }
        k = k.return;
      } while (k !== null);
    }
    function jR() {
      return null;
    }
    var nv = s.ReactCurrentOwner, to = !1, K1, rv, Z1, J1, eg, Cc, tg, Zm, av;
    K1 = {}, rv = {}, Z1 = {}, J1 = {}, eg = {}, Cc = !1, tg = {}, Zm = {}, av = {};
    function wi(e, t, i, o) {
      e === null ? t.child = y2(t, null, i, o) : t.child = Xf(t, e.child, i, o);
    }
    function FR(e, t, i, o) {
      t.child = Xf(t, e.child, null, o), t.child = Xf(t, null, i, o);
    }
    function h3(e, t, i, o, c) {
      if (t.type !== t.elementType) {
        var d = i.propTypes;
        d && Gl(
          d,
          o,
          // Resolved props
          "prop",
          vt(i)
        );
      }
      var g = i.render, x = t.ref, w, k;
      Zf(t, c), xi(t);
      {
        if (nv.current = t, Or(!0), w = ad(e, t, g, o, x, c), k = id(), t.mode & nr) {
          wr(!0);
          try {
            w = ad(e, t, g, o, x, c), k = id();
          } finally {
            wr(!1);
          }
        }
        Or(!1);
      }
      return Ei(), e !== null && !to ? (O2(e, t, c), Cu(e, t, c)) : (Ha() && k && U0(t), t.flags |= Ki, wi(e, t, w, c), t.child);
    }
    function m3(e, t, i, o, c) {
      if (e === null) {
        var d = i.type;
        if (IM(d) && i.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        i.defaultProps === void 0) {
          var g = d;
          return g = pd(d), t.tag = pe, t.type = g, ag(t, d), y3(e, t, g, o, c);
        }
        {
          var x = d.propTypes;
          if (x && Gl(
            x,
            o,
            // Resolved props
            "prop",
            vt(d)
          ), i.defaultProps !== void 0) {
            var w = vt(d) || "Unknown";
            av[w] || (v("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", w), av[w] = !0);
          }
        }
        var k = Hg(i.type, null, o, t, t.mode, c);
        return k.ref = t.ref, k.return = t, t.child = k, k;
      }
      {
        var z = i.type, I = z.propTypes;
        I && Gl(
          I,
          o,
          // Resolved props
          "prop",
          vt(z)
        );
      }
      var $ = e.child, Z = cg(e, c);
      if (!Z) {
        var ne = $.memoizedProps, se = i.compare;
        if (se = se !== null ? se : ot, se(ne, o) && e.ref === t.ref)
          return Cu(e, t, c);
      }
      t.flags |= Ki;
      var Qe = Mc($, o);
      return Qe.ref = t.ref, Qe.return = t, t.child = Qe, Qe;
    }
    function y3(e, t, i, o, c) {
      if (t.type !== t.elementType) {
        var d = t.elementType;
        if (d.$$typeof === qe) {
          var g = d, x = g._payload, w = g._init;
          try {
            d = w(x);
          } catch {
            d = null;
          }
          var k = d && d.propTypes;
          k && Gl(
            k,
            o,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            vt(d)
          );
        }
      }
      if (e !== null) {
        var z = e.memoizedProps;
        if (ot(z, o) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (to = !1, t.pendingProps = o = z, cg(e, c))
            (e.flags & Wc) !== xt && (to = !0);
          else return t.lanes = e.lanes, Cu(e, t, c);
      }
      return ng(e, t, i, o, c);
    }
    function g3(e, t, i) {
      var o = t.pendingProps, c = o.children, d = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden" || ae)
        if ((t.mode & cn) === Et) {
          var g = {
            baseLanes: xe,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = g, fy(t, i);
        } else if (ii(i, ai)) {
          var I = {
            baseLanes: xe,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = I;
          var $ = d !== null ? d.baseLanes : i;
          fy(t, $);
        } else {
          var x = null, w;
          if (d !== null) {
            var k = d.baseLanes;
            w = en(k, i);
          } else
            w = i;
          t.lanes = t.childLanes = ai;
          var z = {
            baseLanes: w,
            cachePool: x,
            transitions: null
          };
          return t.memoizedState = z, t.updateQueue = null, fy(t, w), null;
        }
      else {
        var Z;
        d !== null ? (Z = en(d.baseLanes, i), t.memoizedState = null) : Z = i, fy(t, Z);
      }
      return wi(e, t, c, i), t.child;
    }
    function PR(e, t, i) {
      var o = t.pendingProps;
      return wi(e, t, o, i), t.child;
    }
    function HR(e, t, i) {
      var o = t.pendingProps.children;
      return wi(e, t, o, i), t.child;
    }
    function $R(e, t, i) {
      {
        t.flags |= bn;
        {
          var o = t.stateNode;
          o.effectDuration = 0, o.passiveEffectDuration = 0;
        }
      }
      var c = t.pendingProps, d = c.children;
      return wi(e, t, d, i), t.child;
    }
    function S3(e, t) {
      var i = t.ref;
      (e === null && i !== null || e !== null && e.ref !== i) && (t.flags |= kr, t.flags |= Hu);
    }
    function ng(e, t, i, o, c) {
      if (t.type !== t.elementType) {
        var d = i.propTypes;
        d && Gl(
          d,
          o,
          // Resolved props
          "prop",
          vt(i)
        );
      }
      var g;
      {
        var x = qf(t, i, !0);
        g = Yf(t, x);
      }
      var w, k;
      Zf(t, c), xi(t);
      {
        if (nv.current = t, Or(!0), w = ad(e, t, i, o, g, c), k = id(), t.mode & nr) {
          wr(!0);
          try {
            w = ad(e, t, i, o, g, c), k = id();
          } finally {
            wr(!1);
          }
        }
        Or(!1);
      }
      return Ei(), e !== null && !to ? (O2(e, t, c), Cu(e, t, c)) : (Ha() && k && U0(t), t.flags |= Ki, wi(e, t, w, c), t.child);
    }
    function x3(e, t, i, o, c) {
      {
        switch (a_(t)) {
          case !1: {
            var d = t.stateNode, g = t.type, x = new g(t.memoizedProps, d.context), w = x.state;
            d.updater.enqueueSetState(d, w, null);
            break;
          }
          case !0: {
            t.flags |= yt, t.flags |= aa;
            var k = new Error("Simulated error coming from DevTools"), z = qs(c);
            t.lanes = en(t.lanes, z);
            var I = X1(t, Ec(k, t), z);
            r1(t, I);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var $ = i.propTypes;
          $ && Gl(
            $,
            o,
            // Resolved props
            "prop",
            vt(i)
          );
        }
      }
      var Z;
      Oo(i) ? (Z = !0, cm(t)) : Z = !1, Zf(t, c);
      var ne = t.stateNode, se;
      ne === null ? (ey(e, t), s3(t, i, o), W1(t, i, o, c), se = !0) : e === null ? se = DR(t, i, o, c) : se = OR(e, t, i, o, c);
      var Qe = rg(e, t, i, se, Z, c);
      {
        var Tt = t.stateNode;
        se && Tt.props !== o && (Cc || v("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", tt(t) || "a component"), Cc = !0);
      }
      return Qe;
    }
    function rg(e, t, i, o, c, d) {
      S3(e, t);
      var g = (t.flags & yt) !== xt;
      if (!o && !g)
        return c && t2(t, i, !1), Cu(e, t, d);
      var x = t.stateNode;
      nv.current = t;
      var w;
      if (g && typeof i.getDerivedStateFromError != "function")
        w = null, a3();
      else {
        xi(t);
        {
          if (Or(!0), w = x.render(), t.mode & nr) {
            wr(!0);
            try {
              x.render();
            } finally {
              wr(!1);
            }
          }
          Or(!1);
        }
        Ei();
      }
      return t.flags |= Ki, e !== null && g ? FR(e, t, w, d) : wi(e, t, w, d), t.memoizedState = x.state, c && t2(t, i, !0), t.child;
    }
    function E3(e) {
      var t = e.stateNode;
      t.pendingContext ? JS(e, t.pendingContext, t.pendingContext !== t.context) : t.context && JS(e, t.context, !1), a1(e, t.containerInfo);
    }
    function VR(e, t, i) {
      if (E3(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var o = t.pendingProps, c = t.memoizedState, d = c.element;
      w2(e, t), Mm(t, o, null, i);
      var g = t.memoizedState;
      t.stateNode;
      var x = g.element;
      if (c.isDehydrated) {
        var w = {
          element: x,
          isDehydrated: !1,
          cache: g.cache,
          pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
          transitions: g.transitions
        }, k = t.updateQueue;
        if (k.baseState = w, t.memoizedState = w, t.flags & Da) {
          var z = Ec(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return C3(e, t, x, i, z);
        } else if (x !== d) {
          var I = Ec(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return C3(e, t, x, i, I);
        } else {
          qw(t);
          var $ = y2(t, null, x, i);
          t.child = $;
          for (var Z = $; Z; )
            Z.flags = Z.flags & ~Tr | ei, Z = Z.sibling;
        }
      } else {
        if (Gf(), x === d)
          return Cu(e, t, i);
        wi(e, t, x, i);
      }
      return t.child;
    }
    function C3(e, t, i, o, c) {
      return Gf(), V0(c), t.flags |= Da, wi(e, t, i, o), t.child;
    }
    function IR(e, t, i) {
      _2(t), e === null && $0(t);
      var o = t.type, c = t.pendingProps, d = e !== null ? e.memoizedProps : null, g = c.children, x = C0(o, c);
      return x ? g = null : d !== null && C0(o, d) && (t.flags |= Ni), S3(e, t), wi(e, t, g, i), t.child;
    }
    function BR(e, t) {
      return e === null && $0(t), null;
    }
    function qR(e, t, i, o) {
      ey(e, t);
      var c = t.pendingProps, d = i, g = d._payload, x = d._init, w = x(g);
      t.type = w;
      var k = t.tag = BM(w), z = eo(w, c), I;
      switch (k) {
        case C:
          return ag(t, w), t.type = w = pd(w), I = ng(null, t, w, z, o), I;
        case T:
          return t.type = w = Ag(w), I = x3(null, t, w, z, o), I;
        case B:
          return t.type = w = Ng(w), I = h3(null, t, w, z, o), I;
        case re: {
          if (t.type !== t.elementType) {
            var $ = w.propTypes;
            $ && Gl(
              $,
              z,
              // Resolved for outer only
              "prop",
              vt(w)
            );
          }
          return I = m3(
            null,
            t,
            w,
            eo(w.type, z),
            // The inner type can have defaults too
            o
          ), I;
        }
      }
      var Z = "";
      throw w !== null && typeof w == "object" && w.$$typeof === qe && (Z = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + w + ". " + ("Lazy element type must resolve to a class or function." + Z));
    }
    function YR(e, t, i, o, c) {
      ey(e, t), t.tag = T;
      var d;
      return Oo(i) ? (d = !0, cm(t)) : d = !1, Zf(t, c), s3(t, i, o), W1(t, i, o, c), rg(null, t, i, !0, d, c);
    }
    function WR(e, t, i, o) {
      ey(e, t);
      var c = t.pendingProps, d;
      {
        var g = qf(t, i, !1);
        d = Yf(t, g);
      }
      Zf(t, o);
      var x, w;
      xi(t);
      {
        if (i.prototype && typeof i.prototype.render == "function") {
          var k = vt(i) || "Unknown";
          K1[k] || (v("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", k, k), K1[k] = !0);
        }
        t.mode & nr && Kl.recordLegacyContextWarning(t, null), Or(!0), nv.current = t, x = ad(null, t, i, c, d, o), w = id(), Or(!1);
      }
      if (Ei(), t.flags |= Ki, typeof x == "object" && x !== null && typeof x.render == "function" && x.$$typeof === void 0) {
        var z = vt(i) || "Unknown";
        rv[z] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", z, z, z), rv[z] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof x == "object" && x !== null && typeof x.render == "function" && x.$$typeof === void 0
      ) {
        {
          var I = vt(i) || "Unknown";
          rv[I] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", I, I, I), rv[I] = !0);
        }
        t.tag = T, t.memoizedState = null, t.updateQueue = null;
        var $ = !1;
        return Oo(i) ? ($ = !0, cm(t)) : $ = !1, t.memoizedState = x.state !== null && x.state !== void 0 ? x.state : null, n1(t), u3(t, x), W1(t, i, c, o), rg(null, t, i, !0, $, o);
      } else {
        if (t.tag = C, t.mode & nr) {
          wr(!0);
          try {
            x = ad(null, t, i, c, d, o), w = id();
          } finally {
            wr(!1);
          }
        }
        return Ha() && w && U0(t), wi(null, t, x, o), ag(t, i), t.child;
      }
    }
    function ag(e, t) {
      {
        if (t && t.childContextTypes && v("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var i = "", o = Kn();
          o && (i += `

Check the render method of \`` + o + "`.");
          var c = o || "", d = e._debugSource;
          d && (c = d.fileName + ":" + d.lineNumber), eg[c] || (eg[c] = !0, v("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", i));
        }
        if (t.defaultProps !== void 0) {
          var g = vt(t) || "Unknown";
          av[g] || (v("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", g), av[g] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var x = vt(t) || "Unknown";
          J1[x] || (v("%s: Function components do not support getDerivedStateFromProps.", x), J1[x] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var w = vt(t) || "Unknown";
          Z1[w] || (v("%s: Function components do not support contextType.", w), Z1[w] = !0);
        }
      }
    }
    var ig = {
      dehydrated: null,
      treeContext: null,
      retryLane: Ln
    };
    function lg(e) {
      return {
        baseLanes: e,
        cachePool: jR(),
        transitions: null
      };
    }
    function QR(e, t) {
      var i = null;
      return {
        baseLanes: en(e.baseLanes, t),
        cachePool: i,
        transitions: e.transitions
      };
    }
    function GR(e, t, i, o) {
      if (t !== null) {
        var c = t.memoizedState;
        if (c === null)
          return !1;
      }
      return o1(e, Wp);
    }
    function XR(e, t) {
      return Ys(e.childLanes, t);
    }
    function T3(e, t, i) {
      var o = t.pendingProps;
      i_(t) && (t.flags |= yt);
      var c = Zl.current, d = !1, g = (t.flags & yt) !== xt;
      if (g || GR(c, e) ? (d = !0, t.flags &= ~yt) : (e === null || e.memoizedState !== null) && (c = vR(c, D2)), c = ed(c), os(t, c), e === null) {
        $0(t);
        var x = t.memoizedState;
        if (x !== null) {
          var w = x.dehydrated;
          if (w !== null)
            return tb(t, w);
        }
        var k = o.children, z = o.fallback;
        if (d) {
          var I = KR(t, k, z, i), $ = t.child;
          return $.memoizedState = lg(i), t.memoizedState = ig, I;
        } else
          return og(t, k);
      } else {
        var Z = e.memoizedState;
        if (Z !== null) {
          var ne = Z.dehydrated;
          if (ne !== null)
            return nb(e, t, g, o, ne, Z, i);
        }
        if (d) {
          var se = o.fallback, Qe = o.children, Tt = JR(e, t, Qe, se, i), mt = t.child, kn = e.child.memoizedState;
          return mt.memoizedState = kn === null ? lg(i) : QR(kn, i), mt.childLanes = XR(e, i), t.memoizedState = ig, Tt;
        } else {
          var Cn = o.children, W = ZR(e, t, Cn, i);
          return t.memoizedState = null, W;
        }
      }
    }
    function og(e, t, i) {
      var o = e.mode, c = {
        mode: "visible",
        children: t
      }, d = ug(c, o);
      return d.return = e, e.child = d, d;
    }
    function KR(e, t, i, o) {
      var c = e.mode, d = e.child, g = {
        mode: "hidden",
        children: t
      }, x, w;
      return (c & cn) === Et && d !== null ? (x = d, x.childLanes = xe, x.pendingProps = g, e.mode & An && (x.actualDuration = 0, x.actualStartTime = -1, x.selfBaseDuration = 0, x.treeBaseDuration = 0), w = hs(i, c, o, null)) : (x = ug(g, c), w = hs(i, c, o, null)), x.return = e, w.return = e, x.sibling = w, e.child = x, w;
    }
    function ug(e, t, i) {
      return wx(e, t, xe, null);
    }
    function w3(e, t) {
      return Mc(e, t);
    }
    function ZR(e, t, i, o) {
      var c = e.child, d = c.sibling, g = w3(c, {
        mode: "visible",
        children: i
      });
      if ((t.mode & cn) === Et && (g.lanes = o), g.return = t, g.sibling = null, d !== null) {
        var x = t.deletions;
        x === null ? (t.deletions = [d], t.flags |= Ai) : x.push(d);
      }
      return t.child = g, g;
    }
    function JR(e, t, i, o, c) {
      var d = t.mode, g = e.child, x = g.sibling, w = {
        mode: "hidden",
        children: i
      }, k;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (d & cn) === Et && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== g
      ) {
        var z = t.child;
        k = z, k.childLanes = xe, k.pendingProps = w, t.mode & An && (k.actualDuration = 0, k.actualStartTime = -1, k.selfBaseDuration = g.selfBaseDuration, k.treeBaseDuration = g.treeBaseDuration), t.deletions = null;
      } else
        k = w3(g, w), k.subtreeFlags = g.subtreeFlags & Vr;
      var I;
      return x !== null ? I = Mc(x, o) : (I = hs(o, d, c, null), I.flags |= Tr), I.return = t, k.return = t, k.sibling = I, t.child = k, I;
    }
    function Jm(e, t, i, o) {
      o !== null && V0(o), Xf(t, e.child, null, i);
      var c = t.pendingProps, d = c.children, g = og(t, d);
      return g.flags |= Tr, t.memoizedState = null, g;
    }
    function eb(e, t, i, o, c) {
      var d = t.mode, g = {
        mode: "visible",
        children: i
      }, x = ug(g, d), w = hs(o, d, c, null);
      return w.flags |= Tr, x.return = t, w.return = t, x.sibling = w, t.child = x, (t.mode & cn) !== Et && Xf(t, e.child, null, c), w;
    }
    function tb(e, t, i) {
      return (e.mode & cn) === Et ? (v("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ut) : b0(t) ? e.lanes = Oa : e.lanes = ai, null;
    }
    function nb(e, t, i, o, c, d, g) {
      if (i)
        if (t.flags & Da) {
          t.flags &= ~Da;
          var W = Q1(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Jm(e, t, g, W);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= yt, null;
          var ce = o.children, Q = o.fallback, Oe = eb(e, t, ce, Q, g), nt = t.child;
          return nt.memoizedState = lg(g), t.memoizedState = ig, Oe;
        }
      else {
        if (Iw(), (t.mode & cn) === Et)
          return Jm(
            e,
            t,
            g,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (b0(c)) {
          var x, w, k;
          {
            var z = lw(c);
            x = z.digest, w = z.message, k = z.stack;
          }
          var I;
          w ? I = new Error(w) : I = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var $ = Q1(I, x, k);
          return Jm(e, t, g, $);
        }
        var Z = ii(g, e.childLanes);
        if (to || Z) {
          var ne = cy();
          if (ne !== null) {
            var se = op(ne, g);
            if (se !== Ln && se !== d.retryLane) {
              d.retryLane = se;
              var Qe = ur;
              Bi(e, se), Ra(ne, e, se, Qe);
            }
          }
          kg();
          var Tt = Q1(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Jm(e, t, g, Tt);
        } else if (WS(c)) {
          t.flags |= yt, t.child = e.child;
          var mt = MM.bind(null, e);
          return ow(c, mt), null;
        } else {
          Yw(t, c, d.treeContext);
          var kn = o.children, Cn = og(t, kn);
          return Cn.flags |= ei, Cn;
        }
      }
    }
    function R3(e, t, i) {
      e.lanes = en(e.lanes, t);
      var o = e.alternate;
      o !== null && (o.lanes = en(o.lanes, t)), Z0(e.return, t, i);
    }
    function rb(e, t, i) {
      for (var o = t; o !== null; ) {
        if (o.tag === q) {
          var c = o.memoizedState;
          c !== null && R3(o, i, e);
        } else if (o.tag === ze)
          R3(o, i, e);
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
    function ab(e) {
      for (var t = e, i = null; t !== null; ) {
        var o = t.alternate;
        o !== null && Om(o) === null && (i = t), t = t.sibling;
      }
      return i;
    }
    function ib(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !tg[e])
        if (tg[e] = !0, typeof e == "string")
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
    function lb(e, t) {
      e !== void 0 && !Zm[e] && (e !== "collapsed" && e !== "hidden" ? (Zm[e] = !0, v('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Zm[e] = !0, v('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function b3(e, t) {
      {
        var i = bt(e), o = !i && typeof dt(e) == "function";
        if (i || o) {
          var c = i ? "array" : "iterable";
          return v("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", c, t, c), !1;
        }
      }
      return !0;
    }
    function ob(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (bt(e)) {
          for (var i = 0; i < e.length; i++)
            if (!b3(e[i], i))
              return;
        } else {
          var o = dt(e);
          if (typeof o == "function") {
            var c = o.call(e);
            if (c)
              for (var d = c.next(), g = 0; !d.done; d = c.next()) {
                if (!b3(d.value, g))
                  return;
                g++;
              }
          } else
            v('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function sg(e, t, i, o, c) {
      var d = e.memoizedState;
      d === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: o,
        tail: i,
        tailMode: c
      } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = i, d.tailMode = c);
    }
    function M3(e, t, i) {
      var o = t.pendingProps, c = o.revealOrder, d = o.tail, g = o.children;
      ib(c), lb(d, c), ob(g, c), wi(e, t, g, i);
      var x = Zl.current, w = o1(x, Wp);
      if (w)
        x = u1(x, Wp), t.flags |= yt;
      else {
        var k = e !== null && (e.flags & yt) !== xt;
        k && rb(t, t.child, i), x = ed(x);
      }
      if (os(t, x), (t.mode & cn) === Et)
        t.memoizedState = null;
      else
        switch (c) {
          case "forwards": {
            var z = ab(t.child), I;
            z === null ? (I = t.child, t.child = null) : (I = z.sibling, z.sibling = null), sg(
              t,
              !1,
              // isBackwards
              I,
              z,
              d
            );
            break;
          }
          case "backwards": {
            var $ = null, Z = t.child;
            for (t.child = null; Z !== null; ) {
              var ne = Z.alternate;
              if (ne !== null && Om(ne) === null) {
                t.child = Z;
                break;
              }
              var se = Z.sibling;
              Z.sibling = $, $ = Z, Z = se;
            }
            sg(
              t,
              !0,
              // isBackwards
              $,
              null,
              // last
              d
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
    function ub(e, t, i) {
      a1(t, t.stateNode.containerInfo);
      var o = t.pendingProps;
      return e === null ? t.child = Xf(t, null, o, i) : wi(e, t, o, i), t.child;
    }
    var _3 = !1;
    function sb(e, t, i) {
      var o = t.type, c = o._context, d = t.pendingProps, g = t.memoizedProps, x = d.value;
      {
        "value" in d || _3 || (_3 = !0, v("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var w = t.type.propTypes;
        w && Gl(w, d, "prop", "Context.Provider");
      }
      if (x2(t, c, x), g !== null) {
        var k = g.value;
        if (Te(k, x)) {
          if (g.children === d.children && !um())
            return Cu(e, t, i);
        } else
          iR(t, c, i);
      }
      var z = d.children;
      return wi(e, t, z, i), t.child;
    }
    var k3 = !1;
    function cb(e, t, i) {
      var o = t.type;
      o._context === void 0 ? o !== o.Consumer && (k3 || (k3 = !0, v("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : o = o._context;
      var c = t.pendingProps, d = c.children;
      typeof d != "function" && v("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Zf(t, i);
      var g = ua(o);
      xi(t);
      var x;
      return nv.current = t, Or(!0), x = d(g), Or(!1), Ei(), t.flags |= Ki, wi(e, t, x, i), t.child;
    }
    function iv() {
      to = !0;
    }
    function ey(e, t) {
      (t.mode & cn) === Et && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Tr);
    }
    function Cu(e, t, i) {
      return e !== null && (t.dependencies = e.dependencies), a3(), yv(t.lanes), ii(i, t.childLanes) ? (rR(e, t), t.child) : null;
    }
    function fb(e, t, i) {
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
        var d = o.deletions;
        return d === null ? (o.deletions = [e], o.flags |= Ai) : d.push(e), i.flags |= Tr, i;
      }
    }
    function cg(e, t) {
      var i = e.lanes;
      return !!ii(i, t);
    }
    function db(e, t, i) {
      switch (t.tag) {
        case R:
          E3(t), t.stateNode, Gf();
          break;
        case O:
          _2(t);
          break;
        case T: {
          var o = t.type;
          Oo(o) && cm(t);
          break;
        }
        case D:
          a1(t, t.stateNode.containerInfo);
          break;
        case J: {
          var c = t.memoizedProps.value, d = t.type._context;
          x2(t, d, c);
          break;
        }
        case ee:
          {
            var g = ii(i, t.childLanes);
            g && (t.flags |= bn);
            {
              var x = t.stateNode;
              x.effectDuration = 0, x.passiveEffectDuration = 0;
            }
          }
          break;
        case q: {
          var w = t.memoizedState;
          if (w !== null) {
            if (w.dehydrated !== null)
              return os(t, ed(Zl.current)), t.flags |= yt, null;
            var k = t.child, z = k.childLanes;
            if (ii(i, z))
              return T3(e, t, i);
            os(t, ed(Zl.current));
            var I = Cu(e, t, i);
            return I !== null ? I.sibling : null;
          } else
            os(t, ed(Zl.current));
          break;
        }
        case ze: {
          var $ = (e.flags & yt) !== xt, Z = ii(i, t.childLanes);
          if ($) {
            if (Z)
              return M3(e, t, i);
            t.flags |= yt;
          }
          var ne = t.memoizedState;
          if (ne !== null && (ne.rendering = null, ne.tail = null, ne.lastEffect = null), os(t, Zl.current), Z)
            break;
          return null;
        }
        case fe:
        case me:
          return t.lanes = xe, g3(e, t, i);
      }
      return Cu(e, t, i);
    }
    function D3(e, t, i) {
      if (t._debugNeedsRemount && e !== null)
        return fb(e, t, Hg(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var o = e.memoizedProps, c = t.pendingProps;
        if (o !== c || um() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          to = !0;
        else {
          var d = cg(e, i);
          if (!d && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & yt) === xt)
            return to = !1, db(e, t, i);
          (e.flags & Wc) !== xt ? to = !0 : to = !1;
        }
      } else if (to = !1, Ha() && jw(t)) {
        var g = t.index, x = Fw();
        a2(t, x, g);
      }
      switch (t.lanes = xe, t.tag) {
        case M:
          return WR(e, t, t.type, i);
        case Le: {
          var w = t.elementType;
          return qR(e, t, w, i);
        }
        case C: {
          var k = t.type, z = t.pendingProps, I = t.elementType === k ? z : eo(k, z);
          return ng(e, t, k, I, i);
        }
        case T: {
          var $ = t.type, Z = t.pendingProps, ne = t.elementType === $ ? Z : eo($, Z);
          return x3(e, t, $, ne, i);
        }
        case R:
          return VR(e, t, i);
        case O:
          return IR(e, t, i);
        case L:
          return BR(e, t);
        case q:
          return T3(e, t, i);
        case D:
          return ub(e, t, i);
        case B: {
          var se = t.type, Qe = t.pendingProps, Tt = t.elementType === se ? Qe : eo(se, Qe);
          return h3(e, t, se, Tt, i);
        }
        case j:
          return PR(e, t, i);
        case F:
          return HR(e, t, i);
        case ee:
          return $R(e, t, i);
        case J:
          return sb(e, t, i);
        case K:
          return cb(e, t, i);
        case re: {
          var mt = t.type, kn = t.pendingProps, Cn = eo(mt, kn);
          if (t.type !== t.elementType) {
            var W = mt.propTypes;
            W && Gl(
              W,
              Cn,
              // Resolved for outer only
              "prop",
              vt(mt)
            );
          }
          return Cn = eo(mt.type, Cn), m3(e, t, mt, Cn, i);
        }
        case pe:
          return y3(e, t, t.type, t.pendingProps, i);
        case he: {
          var ce = t.type, Q = t.pendingProps, Oe = t.elementType === ce ? Q : eo(ce, Q);
          return YR(e, t, ce, Oe, i);
        }
        case ze:
          return M3(e, t, i);
        case we:
          break;
        case fe:
          return g3(e, t, i);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function ld(e) {
      e.flags |= bn;
    }
    function O3(e) {
      e.flags |= kr, e.flags |= Hu;
    }
    var z3, fg, L3, A3;
    z3 = function(e, t, i, o) {
      for (var c = t.child; c !== null; ) {
        if (c.tag === O || c.tag === L)
          AT(e, c.stateNode);
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
    }, L3 = function(e, t, i, o, c) {
      var d = e.memoizedProps;
      if (d !== o) {
        var g = t.stateNode, x = i1(), w = UT(g, i, d, o, c, x);
        t.updateQueue = w, w && ld(t);
      }
    }, A3 = function(e, t, i, o) {
      i !== o && ld(t);
    };
    function lv(e, t) {
      if (!Ha())
        switch (e.tailMode) {
          case "hidden": {
            for (var i = e.tail, o = null; i !== null; )
              i.alternate !== null && (o = i), i = i.sibling;
            o === null ? e.tail = null : o.sibling = null;
            break;
          }
          case "collapsed": {
            for (var c = e.tail, d = null; c !== null; )
              c.alternate !== null && (d = c), c = c.sibling;
            d === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : d.sibling = null;
            break;
          }
        }
    }
    function Va(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, i = xe, o = xt;
      if (t) {
        if ((e.mode & An) !== Et) {
          for (var w = e.selfBaseDuration, k = e.child; k !== null; )
            i = en(i, en(k.lanes, k.childLanes)), o |= k.subtreeFlags & Vr, o |= k.flags & Vr, w += k.treeBaseDuration, k = k.sibling;
          e.treeBaseDuration = w;
        } else
          for (var z = e.child; z !== null; )
            i = en(i, en(z.lanes, z.childLanes)), o |= z.subtreeFlags & Vr, o |= z.flags & Vr, z.return = e, z = z.sibling;
        e.subtreeFlags |= o;
      } else {
        if ((e.mode & An) !== Et) {
          for (var c = e.actualDuration, d = e.selfBaseDuration, g = e.child; g !== null; )
            i = en(i, en(g.lanes, g.childLanes)), o |= g.subtreeFlags, o |= g.flags, c += g.actualDuration, d += g.treeBaseDuration, g = g.sibling;
          e.actualDuration = c, e.treeBaseDuration = d;
        } else
          for (var x = e.child; x !== null; )
            i = en(i, en(x.lanes, x.childLanes)), o |= x.subtreeFlags, o |= x.flags, x.return = e, x = x.sibling;
        e.subtreeFlags |= o;
      }
      return e.childLanes = i, t;
    }
    function pb(e, t, i) {
      if (Kw() && (t.mode & cn) !== Et && (t.flags & yt) === xt)
        return f2(t), Gf(), t.flags |= Da | Ds | aa, !1;
      var o = hm(t);
      if (i !== null && i.dehydrated !== null)
        if (e === null) {
          if (!o)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (Gw(t), Va(t), (t.mode & An) !== Et) {
            var c = i !== null;
            if (c) {
              var d = t.child;
              d !== null && (t.treeBaseDuration -= d.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Gf(), (t.flags & yt) === xt && (t.memoizedState = null), t.flags |= bn, Va(t), (t.mode & An) !== Et) {
            var g = i !== null;
            if (g) {
              var x = t.child;
              x !== null && (t.treeBaseDuration -= x.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return d2(), !0;
    }
    function N3(e, t, i) {
      var o = t.pendingProps;
      switch (j0(t), t.tag) {
        case M:
        case Le:
        case pe:
        case C:
        case B:
        case j:
        case F:
        case ee:
        case K:
        case re:
          return Va(t), null;
        case T: {
          var c = t.type;
          return Oo(c) && sm(t), Va(t), null;
        }
        case R: {
          var d = t.stateNode;
          if (Jf(t), L0(t), c1(), d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), e === null || e.child === null) {
            var g = hm(t);
            if (g)
              ld(t);
            else if (e !== null) {
              var x = e.memoizedState;
              // Check if this is a client root
              (!x.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Da) !== xt) && (t.flags |= Zr, d2());
            }
          }
          return fg(e, t), Va(t), null;
        }
        case O: {
          l1(t);
          var w = M2(), k = t.type;
          if (e !== null && t.stateNode != null)
            L3(e, t, k, o, w), e.ref !== t.ref && O3(t);
          else {
            if (!o) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Va(t), null;
            }
            var z = i1(), I = hm(t);
            if (I)
              Ww(t, w, z) && ld(t);
            else {
              var $ = LT(k, o, w, z, t);
              z3($, t, !1, !1), t.stateNode = $, NT($, k, o, w) && ld(t);
            }
            t.ref !== null && O3(t);
          }
          return Va(t), null;
        }
        case L: {
          var Z = o;
          if (e && t.stateNode != null) {
            var ne = e.memoizedProps;
            A3(e, t, ne, Z);
          } else {
            if (typeof Z != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var se = M2(), Qe = i1(), Tt = hm(t);
            Tt ? Qw(t) && ld(t) : t.stateNode = jT(Z, se, Qe, t);
          }
          return Va(t), null;
        }
        case q: {
          td(t);
          var mt = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var kn = pb(e, t, mt);
            if (!kn)
              return t.flags & aa ? t : null;
          }
          if ((t.flags & yt) !== xt)
            return t.lanes = i, (t.mode & An) !== Et && N1(t), t;
          var Cn = mt !== null, W = e !== null && e.memoizedState !== null;
          if (Cn !== W && Cn) {
            var ce = t.child;
            if (ce.flags |= $r, (t.mode & cn) !== Et) {
              var Q = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              Q || o1(Zl.current, D2) ? vM() : kg();
            }
          }
          var Oe = t.updateQueue;
          if (Oe !== null && (t.flags |= bn), Va(t), (t.mode & An) !== Et && Cn) {
            var nt = t.child;
            nt !== null && (t.treeBaseDuration -= nt.treeBaseDuration);
          }
          return null;
        }
        case D:
          return Jf(t), fg(e, t), e === null && Dw(t.stateNode.containerInfo), Va(t), null;
        case J:
          var Ke = t.type._context;
          return K0(Ke, t), Va(t), null;
        case he: {
          var jt = t.type;
          return Oo(jt) && sm(t), Va(t), null;
        }
        case ze: {
          td(t);
          var Gt = t.memoizedState;
          if (Gt === null)
            return Va(t), null;
          var ar = (t.flags & yt) !== xt, jn = Gt.rendering;
          if (jn === null)
            if (ar)
              lv(Gt, !1);
            else {
              var ta = mM() && (e === null || (e.flags & yt) === xt);
              if (!ta)
                for (var Fn = t.child; Fn !== null; ) {
                  var Qr = Om(Fn);
                  if (Qr !== null) {
                    ar = !0, t.flags |= yt, lv(Gt, !1);
                    var di = Qr.updateQueue;
                    return di !== null && (t.updateQueue = di, t.flags |= bn), t.subtreeFlags = xt, aR(t, i), os(t, u1(Zl.current, Wp)), t.child;
                  }
                  Fn = Fn.sibling;
                }
              Gt.tail !== null && Jr() > nx() && (t.flags |= yt, ar = !0, lv(Gt, !1), t.lanes = Zd);
            }
          else {
            if (!ar) {
              var Wa = Om(jn);
              if (Wa !== null) {
                t.flags |= yt, ar = !0;
                var al = Wa.updateQueue;
                if (al !== null && (t.updateQueue = al, t.flags |= bn), lv(Gt, !0), Gt.tail === null && Gt.tailMode === "hidden" && !jn.alternate && !Ha())
                  return Va(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Jr() * 2 - Gt.renderingStartTime > nx() && i !== ai && (t.flags |= yt, ar = !0, lv(Gt, !1), t.lanes = Zd);
            }
            if (Gt.isBackwards)
              jn.sibling = t.child, t.child = jn;
            else {
              var Mi = Gt.last;
              Mi !== null ? Mi.sibling = jn : t.child = jn, Gt.last = jn;
            }
          }
          if (Gt.tail !== null) {
            var _i = Gt.tail;
            Gt.rendering = _i, Gt.tail = _i.sibling, Gt.renderingStartTime = Jr(), _i.sibling = null;
            var pi = Zl.current;
            return ar ? pi = u1(pi, Wp) : pi = ed(pi), os(t, pi), _i;
          }
          return Va(t), null;
        }
        case we:
          break;
        case fe:
        case me: {
          _g(t);
          var Mu = t.memoizedState, vd = Mu !== null;
          if (e !== null) {
            var Cv = e.memoizedState, Po = Cv !== null;
            Po !== vd && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ae && (t.flags |= $r);
          }
          return !vd || (t.mode & cn) === Et ? Va(t) : ii(Fo, ai) && (Va(t), t.subtreeFlags & (Tr | bn) && (t.flags |= $r)), null;
        }
        case Fe:
          return null;
        case Ue:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function vb(e, t, i) {
      switch (j0(t), t.tag) {
        case T: {
          var o = t.type;
          Oo(o) && sm(t);
          var c = t.flags;
          return c & aa ? (t.flags = c & ~aa | yt, (t.mode & An) !== Et && N1(t), t) : null;
        }
        case R: {
          t.stateNode, Jf(t), L0(t), c1();
          var d = t.flags;
          return (d & aa) !== xt && (d & yt) === xt ? (t.flags = d & ~aa | yt, t) : null;
        }
        case O:
          return l1(t), null;
        case q: {
          td(t);
          var g = t.memoizedState;
          if (g !== null && g.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Gf();
          }
          var x = t.flags;
          return x & aa ? (t.flags = x & ~aa | yt, (t.mode & An) !== Et && N1(t), t) : null;
        }
        case ze:
          return td(t), null;
        case D:
          return Jf(t), null;
        case J:
          var w = t.type._context;
          return K0(w, t), null;
        case fe:
        case me:
          return _g(t), null;
        case Fe:
          return null;
        default:
          return null;
      }
    }
    function U3(e, t, i) {
      switch (j0(t), t.tag) {
        case T: {
          var o = t.type.childContextTypes;
          o != null && sm(t);
          break;
        }
        case R: {
          t.stateNode, Jf(t), L0(t), c1();
          break;
        }
        case O: {
          l1(t);
          break;
        }
        case D:
          Jf(t);
          break;
        case q:
          td(t);
          break;
        case ze:
          td(t);
          break;
        case J:
          var c = t.type._context;
          K0(c, t);
          break;
        case fe:
        case me:
          _g(t);
          break;
      }
    }
    var j3 = null;
    j3 = /* @__PURE__ */ new Set();
    var ty = !1, Ia = !1, hb = typeof WeakSet == "function" ? WeakSet : Set, ut = null, od = null, ud = null;
    function mb(e) {
      po(null, function() {
        throw e;
      }), ks();
    }
    var yb = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & An)
        try {
          Uo(), t.componentWillUnmount();
        } finally {
          No(e);
        }
      else
        t.componentWillUnmount();
    };
    function F3(e, t) {
      try {
        cs(Sa, e);
      } catch (i) {
        vr(e, t, i);
      }
    }
    function dg(e, t, i) {
      try {
        yb(e, i);
      } catch (o) {
        vr(e, t, o);
      }
    }
    function gb(e, t, i) {
      try {
        i.componentDidMount();
      } catch (o) {
        vr(e, t, o);
      }
    }
    function P3(e, t) {
      try {
        $3(e);
      } catch (i) {
        vr(e, t, i);
      }
    }
    function sd(e, t) {
      var i = e.ref;
      if (i !== null)
        if (typeof i == "function") {
          var o;
          try {
            if (Me && Pe && e.mode & An)
              try {
                Uo(), o = i(null);
              } finally {
                No(e);
              }
            else
              o = i(null);
          } catch (c) {
            vr(e, t, c);
          }
          typeof o == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", tt(e));
        } else
          i.current = null;
    }
    function ny(e, t, i) {
      try {
        i();
      } catch (o) {
        vr(e, t, o);
      }
    }
    var H3 = !1;
    function Sb(e, t) {
      OT(e.containerInfo), ut = t, xb();
      var i = H3;
      return H3 = !1, i;
    }
    function xb() {
      for (; ut !== null; ) {
        var e = ut, t = e.child;
        (e.subtreeFlags & ho) !== xt && t !== null ? (t.return = e, ut = t) : Eb();
      }
    }
    function Eb() {
      for (; ut !== null; ) {
        var e = ut;
        Bn(e);
        try {
          Cb(e);
        } catch (i) {
          vr(e, e.return, i);
        }
        Zn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ut = t;
          return;
        }
        ut = e.return;
      }
    }
    function Cb(e) {
      var t = e.alternate, i = e.flags;
      if ((i & Zr) !== xt) {
        switch (Bn(e), e.tag) {
          case C:
          case B:
          case pe:
            break;
          case T: {
            if (t !== null) {
              var o = t.memoizedProps, c = t.memoizedState, d = e.stateNode;
              e.type === e.elementType && !Cc && (d.props !== e.memoizedProps && v("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", tt(e) || "instance"), d.state !== e.memoizedState && v("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", tt(e) || "instance"));
              var g = d.getSnapshotBeforeUpdate(e.elementType === e.type ? o : eo(e.type, o), c);
              {
                var x = j3;
                g === void 0 && !x.has(e.type) && (x.add(e.type), v("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", tt(e)));
              }
              d.__reactInternalSnapshotBeforeUpdate = g;
            }
            break;
          }
          case R: {
            {
              var w = e.stateNode;
              nw(w.containerInfo);
            }
            break;
          }
          case O:
          case L:
          case D:
          case he:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        Zn();
      }
    }
    function no(e, t, i) {
      var o = t.updateQueue, c = o !== null ? o.lastEffect : null;
      if (c !== null) {
        var d = c.next, g = d;
        do {
          if ((g.tag & e) === e) {
            var x = g.destroy;
            g.destroy = void 0, x !== void 0 && ((e & $a) !== qi ? Il(t) : (e & Sa) !== qi && zs(t), (e & zo) !== qi && Sv(!0), ny(t, i, x), (e & zo) !== qi && Sv(!1), (e & $a) !== qi ? So() : (e & Sa) !== qi && Xd());
          }
          g = g.next;
        } while (g !== d);
      }
    }
    function cs(e, t) {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var c = o.next, d = c;
        do {
          if ((d.tag & e) === e) {
            (e & $a) !== qi ? Gd(t) : (e & Sa) !== qi && Jc(t);
            var g = d.create;
            (e & zo) !== qi && Sv(!0), d.destroy = g(), (e & zo) !== qi && Sv(!1), (e & $a) !== qi ? oh() : (e & Sa) !== qi && uh();
            {
              var x = d.destroy;
              if (x !== void 0 && typeof x != "function") {
                var w = void 0;
                (d.tag & Sa) !== xt ? w = "useLayoutEffect" : (d.tag & zo) !== xt ? w = "useInsertionEffect" : w = "useEffect";
                var k = void 0;
                x === null ? k = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof x.then == "function" ? k = `

It looks like you wrote ` + w + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + w + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : k = " You returned: " + x, v("%s must not return anything besides a function, which is used for clean-up.%s", w, k);
              }
            }
          }
          d = d.next;
        } while (d !== c);
      }
    }
    function Tb(e, t) {
      if ((t.flags & bn) !== xt)
        switch (t.tag) {
          case ee: {
            var i = t.stateNode.passiveEffectDuration, o = t.memoizedProps, c = o.id, d = o.onPostCommit, g = n3(), x = t.alternate === null ? "mount" : "update";
            t3() && (x = "nested-update"), typeof d == "function" && d(c, x, i, g);
            var w = t.return;
            e: for (; w !== null; ) {
              switch (w.tag) {
                case R:
                  var k = w.stateNode;
                  k.passiveEffectDuration += i;
                  break e;
                case ee:
                  var z = w.stateNode;
                  z.passiveEffectDuration += i;
                  break e;
              }
              w = w.return;
            }
            break;
          }
        }
    }
    function wb(e, t, i, o) {
      if ((i.flags & yo) !== xt)
        switch (i.tag) {
          case C:
          case B:
          case pe: {
            if (!Ia)
              if (i.mode & An)
                try {
                  Uo(), cs(Sa | ga, i);
                } finally {
                  No(i);
                }
              else
                cs(Sa | ga, i);
            break;
          }
          case T: {
            var c = i.stateNode;
            if (i.flags & bn && !Ia)
              if (t === null)
                if (i.type === i.elementType && !Cc && (c.props !== i.memoizedProps && v("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", tt(i) || "instance"), c.state !== i.memoizedState && v("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", tt(i) || "instance")), i.mode & An)
                  try {
                    Uo(), c.componentDidMount();
                  } finally {
                    No(i);
                  }
                else
                  c.componentDidMount();
              else {
                var d = i.elementType === i.type ? t.memoizedProps : eo(i.type, t.memoizedProps), g = t.memoizedState;
                if (i.type === i.elementType && !Cc && (c.props !== i.memoizedProps && v("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", tt(i) || "instance"), c.state !== i.memoizedState && v("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", tt(i) || "instance")), i.mode & An)
                  try {
                    Uo(), c.componentDidUpdate(d, g, c.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    No(i);
                  }
                else
                  c.componentDidUpdate(d, g, c.__reactInternalSnapshotBeforeUpdate);
              }
            var x = i.updateQueue;
            x !== null && (i.type === i.elementType && !Cc && (c.props !== i.memoizedProps && v("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", tt(i) || "instance"), c.state !== i.memoizedState && v("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", tt(i) || "instance")), b2(i, x, c));
            break;
          }
          case R: {
            var w = i.updateQueue;
            if (w !== null) {
              var k = null;
              if (i.child !== null)
                switch (i.child.tag) {
                  case O:
                    k = i.child.stateNode;
                    break;
                  case T:
                    k = i.child.stateNode;
                    break;
                }
              b2(i, w, k);
            }
            break;
          }
          case O: {
            var z = i.stateNode;
            if (t === null && i.flags & bn) {
              var I = i.type, $ = i.memoizedProps;
              VT(z, I, $);
            }
            break;
          }
          case L:
            break;
          case D:
            break;
          case ee: {
            {
              var Z = i.memoizedProps, ne = Z.onCommit, se = Z.onRender, Qe = i.stateNode.effectDuration, Tt = n3(), mt = t === null ? "mount" : "update";
              t3() && (mt = "nested-update"), typeof se == "function" && se(i.memoizedProps.id, mt, i.actualDuration, i.treeBaseDuration, i.actualStartTime, Tt);
              {
                typeof ne == "function" && ne(i.memoizedProps.id, mt, Qe, Tt), EM(i);
                var kn = i.return;
                e: for (; kn !== null; ) {
                  switch (kn.tag) {
                    case R:
                      var Cn = kn.stateNode;
                      Cn.effectDuration += Qe;
                      break e;
                    case ee:
                      var W = kn.stateNode;
                      W.effectDuration += Qe;
                      break e;
                  }
                  kn = kn.return;
                }
              }
            }
            break;
          }
          case q: {
            zb(e, i);
            break;
          }
          case ze:
          case he:
          case we:
          case fe:
          case me:
          case Ue:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Ia || i.flags & kr && $3(i);
    }
    function Rb(e) {
      switch (e.tag) {
        case C:
        case B:
        case pe: {
          if (e.mode & An)
            try {
              Uo(), F3(e, e.return);
            } finally {
              No(e);
            }
          else
            F3(e, e.return);
          break;
        }
        case T: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && gb(e, e.return, t), P3(e, e.return);
          break;
        }
        case O: {
          P3(e, e.return);
          break;
        }
      }
    }
    function bb(e, t) {
      for (var i = null, o = e; ; ) {
        if (o.tag === O) {
          if (i === null) {
            i = o;
            try {
              var c = o.stateNode;
              t ? ZT(c) : ew(o.stateNode, o.memoizedProps);
            } catch (g) {
              vr(e, e.return, g);
            }
          }
        } else if (o.tag === L) {
          if (i === null)
            try {
              var d = o.stateNode;
              t ? JT(d) : tw(d, o.memoizedProps);
            } catch (g) {
              vr(e, e.return, g);
            }
        } else if (!((o.tag === fe || o.tag === me) && o.memoizedState !== null && o !== e)) {
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
    function $3(e) {
      var t = e.ref;
      if (t !== null) {
        var i = e.stateNode, o;
        if (e.tag === O ? o = i : o = i, typeof t == "function") {
          var c;
          if (e.mode & An)
            try {
              Uo(), c = t(o);
            } finally {
              No(e);
            }
          else
            c = t(o);
          typeof c == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", tt(e));
        } else
          t.hasOwnProperty("current") || v("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", tt(e)), t.current = o;
      }
    }
    function Mb(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function V3(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, V3(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === O) {
          var i = e.stateNode;
          i !== null && Lw(i);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function _b(e) {
      for (var t = e.return; t !== null; ) {
        if (I3(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function I3(e) {
      return e.tag === O || e.tag === R || e.tag === D;
    }
    function B3(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || I3(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== O && t.tag !== L && t.tag !== ie; ) {
          if (t.flags & Tr || t.child === null || t.tag === D)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & Tr))
          return t.stateNode;
      }
    }
    function kb(e) {
      var t = _b(e);
      switch (t.tag) {
        case O: {
          var i = t.stateNode;
          t.flags & Ni && (YS(i), t.flags &= ~Ni);
          var o = B3(e);
          vg(e, o, i);
          break;
        }
        case R:
        case D: {
          var c = t.stateNode.containerInfo, d = B3(e);
          pg(e, d, c);
          break;
        }
        // eslint-disable-next-line-no-fallthrough
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function pg(e, t, i) {
      var o = e.tag, c = o === O || o === L;
      if (c) {
        var d = e.stateNode;
        t ? QT(i, d, t) : YT(i, d);
      } else if (o !== D) {
        var g = e.child;
        if (g !== null) {
          pg(g, t, i);
          for (var x = g.sibling; x !== null; )
            pg(x, t, i), x = x.sibling;
        }
      }
    }
    function vg(e, t, i) {
      var o = e.tag, c = o === O || o === L;
      if (c) {
        var d = e.stateNode;
        t ? WT(i, d, t) : qT(i, d);
      } else if (o !== D) {
        var g = e.child;
        if (g !== null) {
          vg(g, t, i);
          for (var x = g.sibling; x !== null; )
            vg(x, t, i), x = x.sibling;
        }
      }
    }
    var Ba = null, ro = !1;
    function Db(e, t, i) {
      {
        var o = t;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case O: {
              Ba = o.stateNode, ro = !1;
              break e;
            }
            case R: {
              Ba = o.stateNode.containerInfo, ro = !0;
              break e;
            }
            case D: {
              Ba = o.stateNode.containerInfo, ro = !0;
              break e;
            }
          }
          o = o.return;
        }
        if (Ba === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        q3(e, t, i), Ba = null, ro = !1;
      }
      Mb(i);
    }
    function fs(e, t, i) {
      for (var o = i.child; o !== null; )
        q3(e, t, o), o = o.sibling;
    }
    function q3(e, t, i) {
      switch (Yd(i), i.tag) {
        case O:
          Ia || sd(i, t);
        // eslint-disable-next-line-no-fallthrough
        case L: {
          {
            var o = Ba, c = ro;
            Ba = null, fs(e, t, i), Ba = o, ro = c, Ba !== null && (ro ? XT(Ba, i.stateNode) : GT(Ba, i.stateNode));
          }
          return;
        }
        case ie: {
          Ba !== null && (ro ? KT(Ba, i.stateNode) : R0(Ba, i.stateNode));
          return;
        }
        case D: {
          {
            var d = Ba, g = ro;
            Ba = i.stateNode.containerInfo, ro = !0, fs(e, t, i), Ba = d, ro = g;
          }
          return;
        }
        case C:
        case B:
        case re:
        case pe: {
          if (!Ia) {
            var x = i.updateQueue;
            if (x !== null) {
              var w = x.lastEffect;
              if (w !== null) {
                var k = w.next, z = k;
                do {
                  var I = z, $ = I.destroy, Z = I.tag;
                  $ !== void 0 && ((Z & zo) !== qi ? ny(i, t, $) : (Z & Sa) !== qi && (zs(i), i.mode & An ? (Uo(), ny(i, t, $), No(i)) : ny(i, t, $), Xd())), z = z.next;
                } while (z !== k);
              }
            }
          }
          fs(e, t, i);
          return;
        }
        case T: {
          if (!Ia) {
            sd(i, t);
            var ne = i.stateNode;
            typeof ne.componentWillUnmount == "function" && dg(i, t, ne);
          }
          fs(e, t, i);
          return;
        }
        case we: {
          fs(e, t, i);
          return;
        }
        case fe: {
          if (
            // TODO: Remove this dead flag
            i.mode & cn
          ) {
            var se = Ia;
            Ia = se || i.memoizedState !== null, fs(e, t, i), Ia = se;
          } else
            fs(e, t, i);
          break;
        }
        default: {
          fs(e, t, i);
          return;
        }
      }
    }
    function Ob(e) {
      e.memoizedState;
    }
    function zb(e, t) {
      var i = t.memoizedState;
      if (i === null) {
        var o = t.alternate;
        if (o !== null) {
          var c = o.memoizedState;
          if (c !== null) {
            var d = c.dehydrated;
            d !== null && mw(d);
          }
        }
      }
    }
    function Y3(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var i = e.stateNode;
        i === null && (i = e.stateNode = new hb()), t.forEach(function(o) {
          var c = _M.bind(null, e, o);
          if (!i.has(o)) {
            if (i.add(o), ri)
              if (od !== null && ud !== null)
                gv(ud, od);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            o.then(c, c);
          }
        });
      }
    }
    function Lb(e, t, i) {
      od = i, ud = e, Bn(t), W3(t, e), Bn(t), od = null, ud = null;
    }
    function ao(e, t, i) {
      var o = t.deletions;
      if (o !== null)
        for (var c = 0; c < o.length; c++) {
          var d = o[c];
          try {
            Db(e, t, d);
          } catch (w) {
            vr(d, t, w);
          }
        }
      var g = ol();
      if (t.subtreeFlags & mo)
        for (var x = t.child; x !== null; )
          Bn(x), W3(x, e), x = x.sibling;
      Bn(g);
    }
    function W3(e, t, i) {
      var o = e.alternate, c = e.flags;
      switch (e.tag) {
        case C:
        case B:
        case re:
        case pe: {
          if (ao(t, e), jo(e), c & bn) {
            try {
              no(zo | ga, e, e.return), cs(zo | ga, e);
            } catch (jt) {
              vr(e, e.return, jt);
            }
            if (e.mode & An) {
              try {
                Uo(), no(Sa | ga, e, e.return);
              } catch (jt) {
                vr(e, e.return, jt);
              }
              No(e);
            } else
              try {
                no(Sa | ga, e, e.return);
              } catch (jt) {
                vr(e, e.return, jt);
              }
          }
          return;
        }
        case T: {
          ao(t, e), jo(e), c & kr && o !== null && sd(o, o.return);
          return;
        }
        case O: {
          ao(t, e), jo(e), c & kr && o !== null && sd(o, o.return);
          {
            if (e.flags & Ni) {
              var d = e.stateNode;
              try {
                YS(d);
              } catch (jt) {
                vr(e, e.return, jt);
              }
            }
            if (c & bn) {
              var g = e.stateNode;
              if (g != null) {
                var x = e.memoizedProps, w = o !== null ? o.memoizedProps : x, k = e.type, z = e.updateQueue;
                if (e.updateQueue = null, z !== null)
                  try {
                    IT(g, z, k, w, x, e);
                  } catch (jt) {
                    vr(e, e.return, jt);
                  }
              }
            }
          }
          return;
        }
        case L: {
          if (ao(t, e), jo(e), c & bn) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var I = e.stateNode, $ = e.memoizedProps, Z = o !== null ? o.memoizedProps : $;
            try {
              BT(I, Z, $);
            } catch (jt) {
              vr(e, e.return, jt);
            }
          }
          return;
        }
        case R: {
          if (ao(t, e), jo(e), c & bn && o !== null) {
            var ne = o.memoizedState;
            if (ne.isDehydrated)
              try {
                hw(t.containerInfo);
              } catch (jt) {
                vr(e, e.return, jt);
              }
          }
          return;
        }
        case D: {
          ao(t, e), jo(e);
          return;
        }
        case q: {
          ao(t, e), jo(e);
          var se = e.child;
          if (se.flags & $r) {
            var Qe = se.stateNode, Tt = se.memoizedState, mt = Tt !== null;
            if (Qe.isHidden = mt, mt) {
              var kn = se.alternate !== null && se.alternate.memoizedState !== null;
              kn || pM();
            }
          }
          if (c & bn) {
            try {
              Ob(e);
            } catch (jt) {
              vr(e, e.return, jt);
            }
            Y3(e);
          }
          return;
        }
        case fe: {
          var Cn = o !== null && o.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & cn
          ) {
            var W = Ia;
            Ia = W || Cn, ao(t, e), Ia = W;
          } else
            ao(t, e);
          if (jo(e), c & $r) {
            var ce = e.stateNode, Q = e.memoizedState, Oe = Q !== null, nt = e;
            if (ce.isHidden = Oe, Oe && !Cn && (nt.mode & cn) !== Et) {
              ut = nt;
              for (var Ke = nt.child; Ke !== null; )
                ut = Ke, Nb(Ke), Ke = Ke.sibling;
            }
            bb(nt, Oe);
          }
          return;
        }
        case ze: {
          ao(t, e), jo(e), c & bn && Y3(e);
          return;
        }
        case we:
          return;
        default: {
          ao(t, e), jo(e);
          return;
        }
      }
    }
    function jo(e) {
      var t = e.flags;
      if (t & Tr) {
        try {
          kb(e);
        } catch (i) {
          vr(e, e.return, i);
        }
        e.flags &= ~Tr;
      }
      t & ei && (e.flags &= ~ei);
    }
    function Ab(e, t, i) {
      od = i, ud = t, ut = e, Q3(e, t, i), od = null, ud = null;
    }
    function Q3(e, t, i) {
      for (var o = (e.mode & cn) !== Et; ut !== null; ) {
        var c = ut, d = c.child;
        if (c.tag === fe && o) {
          var g = c.memoizedState !== null, x = g || ty;
          if (x) {
            hg(e, t, i);
            continue;
          } else {
            var w = c.alternate, k = w !== null && w.memoizedState !== null, z = k || Ia, I = ty, $ = Ia;
            ty = x, Ia = z, Ia && !$ && (ut = c, Ub(c));
            for (var Z = d; Z !== null; )
              ut = Z, Q3(
                Z,
                // New root; bubble back up to here and stop.
                t,
                i
              ), Z = Z.sibling;
            ut = c, ty = I, Ia = $, hg(e, t, i);
            continue;
          }
        }
        (c.subtreeFlags & yo) !== xt && d !== null ? (d.return = c, ut = d) : hg(e, t, i);
      }
    }
    function hg(e, t, i) {
      for (; ut !== null; ) {
        var o = ut;
        if ((o.flags & yo) !== xt) {
          var c = o.alternate;
          Bn(o);
          try {
            wb(t, c, o, i);
          } catch (g) {
            vr(o, o.return, g);
          }
          Zn();
        }
        if (o === e) {
          ut = null;
          return;
        }
        var d = o.sibling;
        if (d !== null) {
          d.return = o.return, ut = d;
          return;
        }
        ut = o.return;
      }
    }
    function Nb(e) {
      for (; ut !== null; ) {
        var t = ut, i = t.child;
        switch (t.tag) {
          case C:
          case B:
          case re:
          case pe: {
            if (t.mode & An)
              try {
                Uo(), no(Sa, t, t.return);
              } finally {
                No(t);
              }
            else
              no(Sa, t, t.return);
            break;
          }
          case T: {
            sd(t, t.return);
            var o = t.stateNode;
            typeof o.componentWillUnmount == "function" && dg(t, t.return, o);
            break;
          }
          case O: {
            sd(t, t.return);
            break;
          }
          case fe: {
            var c = t.memoizedState !== null;
            if (c) {
              G3(e);
              continue;
            }
            break;
          }
        }
        i !== null ? (i.return = t, ut = i) : G3(e);
      }
    }
    function G3(e) {
      for (; ut !== null; ) {
        var t = ut;
        if (t === e) {
          ut = null;
          return;
        }
        var i = t.sibling;
        if (i !== null) {
          i.return = t.return, ut = i;
          return;
        }
        ut = t.return;
      }
    }
    function Ub(e) {
      for (; ut !== null; ) {
        var t = ut, i = t.child;
        if (t.tag === fe) {
          var o = t.memoizedState !== null;
          if (o) {
            X3(e);
            continue;
          }
        }
        i !== null ? (i.return = t, ut = i) : X3(e);
      }
    }
    function X3(e) {
      for (; ut !== null; ) {
        var t = ut;
        Bn(t);
        try {
          Rb(t);
        } catch (o) {
          vr(t, t.return, o);
        }
        if (Zn(), t === e) {
          ut = null;
          return;
        }
        var i = t.sibling;
        if (i !== null) {
          i.return = t.return, ut = i;
          return;
        }
        ut = t.return;
      }
    }
    function jb(e, t, i, o) {
      ut = t, Fb(t, e, i, o);
    }
    function Fb(e, t, i, o) {
      for (; ut !== null; ) {
        var c = ut, d = c.child;
        (c.subtreeFlags & $l) !== xt && d !== null ? (d.return = c, ut = d) : Pb(e, t, i, o);
      }
    }
    function Pb(e, t, i, o) {
      for (; ut !== null; ) {
        var c = ut;
        if ((c.flags & Ja) !== xt) {
          Bn(c);
          try {
            Hb(t, c, i, o);
          } catch (g) {
            vr(c, c.return, g);
          }
          Zn();
        }
        if (c === e) {
          ut = null;
          return;
        }
        var d = c.sibling;
        if (d !== null) {
          d.return = c.return, ut = d;
          return;
        }
        ut = c.return;
      }
    }
    function Hb(e, t, i, o) {
      switch (t.tag) {
        case C:
        case B:
        case pe: {
          if (t.mode & An) {
            A1();
            try {
              cs($a | ga, t);
            } finally {
              L1(t);
            }
          } else
            cs($a | ga, t);
          break;
        }
      }
    }
    function $b(e) {
      ut = e, Vb();
    }
    function Vb() {
      for (; ut !== null; ) {
        var e = ut, t = e.child;
        if ((ut.flags & Ai) !== xt) {
          var i = e.deletions;
          if (i !== null) {
            for (var o = 0; o < i.length; o++) {
              var c = i[o];
              ut = c, qb(c, e);
            }
            {
              var d = e.alternate;
              if (d !== null) {
                var g = d.child;
                if (g !== null) {
                  d.child = null;
                  do {
                    var x = g.sibling;
                    g.sibling = null, g = x;
                  } while (g !== null);
                }
              }
            }
            ut = e;
          }
        }
        (e.subtreeFlags & $l) !== xt && t !== null ? (t.return = e, ut = t) : Ib();
      }
    }
    function Ib() {
      for (; ut !== null; ) {
        var e = ut;
        (e.flags & Ja) !== xt && (Bn(e), Bb(e), Zn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ut = t;
          return;
        }
        ut = e.return;
      }
    }
    function Bb(e) {
      switch (e.tag) {
        case C:
        case B:
        case pe: {
          e.mode & An ? (A1(), no($a | ga, e, e.return), L1(e)) : no($a | ga, e, e.return);
          break;
        }
      }
    }
    function qb(e, t) {
      for (; ut !== null; ) {
        var i = ut;
        Bn(i), Wb(i, t), Zn();
        var o = i.child;
        o !== null ? (o.return = i, ut = o) : Yb(e);
      }
    }
    function Yb(e) {
      for (; ut !== null; ) {
        var t = ut, i = t.sibling, o = t.return;
        if (V3(t), t === e) {
          ut = null;
          return;
        }
        if (i !== null) {
          i.return = o, ut = i;
          return;
        }
        ut = o;
      }
    }
    function Wb(e, t) {
      switch (e.tag) {
        case C:
        case B:
        case pe: {
          e.mode & An ? (A1(), no($a, e, t), L1(e)) : no($a, e, t);
          break;
        }
      }
    }
    function Qb(e) {
      switch (e.tag) {
        case C:
        case B:
        case pe: {
          try {
            cs(Sa | ga, e);
          } catch (i) {
            vr(e, e.return, i);
          }
          break;
        }
        case T: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (i) {
            vr(e, e.return, i);
          }
          break;
        }
      }
    }
    function Gb(e) {
      switch (e.tag) {
        case C:
        case B:
        case pe: {
          try {
            cs($a | ga, e);
          } catch (t) {
            vr(e, e.return, t);
          }
          break;
        }
      }
    }
    function Xb(e) {
      switch (e.tag) {
        case C:
        case B:
        case pe: {
          try {
            no(Sa | ga, e, e.return);
          } catch (i) {
            vr(e, e.return, i);
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
    function Kb(e) {
      switch (e.tag) {
        case C:
        case B:
        case pe:
          try {
            no($a | ga, e, e.return);
          } catch (t) {
            vr(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var ov = Symbol.for;
      ov("selector.component"), ov("selector.has_pseudo_class"), ov("selector.role"), ov("selector.test_id"), ov("selector.text");
    }
    var Zb = [];
    function Jb() {
      Zb.forEach(function(e) {
        return e();
      });
    }
    var eM = s.ReactCurrentActQueue;
    function tM(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), i = typeof jest < "u";
        return i && t !== !1;
      }
    }
    function K3() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && eM.current !== null && v("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var nM = Math.ceil, mg = s.ReactCurrentDispatcher, yg = s.ReactCurrentOwner, qa = s.ReactCurrentBatchConfig, io = s.ReactCurrentActQueue, Ca = (
      /*             */
      0
    ), Z3 = (
      /*               */
      1
    ), Ya = (
      /*                */
      2
    ), _l = (
      /*                */
      4
    ), Tu = 0, uv = 1, Tc = 2, ry = 3, sv = 4, J3 = 5, gg = 6, _n = Ca, Ri = null, jr = null, Ta = xe, Fo = xe, Sg = ts(xe), wa = Tu, cv = null, ay = xe, fv = xe, iy = xe, dv = null, Yi = null, xg = 0, ex = 500, tx = 1 / 0, rM = 500, wu = null;
    function pv() {
      tx = Jr() + rM;
    }
    function nx() {
      return tx;
    }
    var ly = !1, Eg = null, cd = null, wc = !1, ds = null, vv = xe, Cg = [], Tg = null, aM = 50, hv = 0, wg = null, Rg = !1, oy = !1, iM = 50, fd = 0, uy = null, mv = ur, sy = xe, rx = !1;
    function cy() {
      return Ri;
    }
    function bi() {
      return (_n & (Ya | _l)) !== Ca ? Jr() : (mv !== ur || (mv = Jr()), mv);
    }
    function ps(e) {
      var t = e.mode;
      if ((t & cn) === Et)
        return Ut;
      if ((_n & Ya) !== Ca && Ta !== xe)
        return qs(Ta);
      var i = eR() !== Jw;
      if (i) {
        if (qa.transition !== null) {
          var o = qa.transition;
          o._updatedFibers || (o._updatedFibers = /* @__PURE__ */ new Set()), o._updatedFibers.add(e);
        }
        return sy === Ln && (sy = ap()), sy;
      }
      var c = $i();
      if (c !== Ln)
        return c;
      var d = FT();
      return d;
    }
    function lM(e) {
      var t = e.mode;
      return (t & cn) === Et ? Ut : vh();
    }
    function Ra(e, t, i, o) {
      DM(), rx && v("useInsertionEffect must not schedule updates."), Rg && (oy = !0), Bu(e, i, o), (_n & Ya) !== xe && e === Ri ? LM(t) : (ri && Qs(e, t, i), AM(t), e === Ri && ((_n & Ya) === Ca && (fv = en(fv, i)), wa === sv && vs(e, Ta)), Wi(e, o), i === Ut && _n === Ca && (t.mode & cn) === Et && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !io.isBatchingLegacy && (pv(), r2()));
    }
    function oM(e, t, i) {
      var o = e.current;
      o.lanes = t, Bu(e, t, i), Wi(e, i);
    }
    function uM(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (_n & Ya) !== Ca
      );
    }
    function Wi(e, t) {
      var i = e.callbackNode;
      xf(e, t);
      var o = Sf(e, e === Ri ? Ta : xe);
      if (o === xe) {
        i !== null && Sx(i), e.callbackNode = null, e.callbackPriority = Ln;
        return;
      }
      var c = Co(o), d = e.callbackPriority;
      if (d === c && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(io.current !== null && i !== zg)) {
        i == null && d !== Ut && v("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      i != null && Sx(i);
      var g;
      if (c === Ut)
        e.tag === ns ? (io.isBatchingLegacy !== null && (io.didScheduleLegacyUpdate = !0), Uw(lx.bind(null, e))) : n2(lx.bind(null, e)), io.current !== null ? io.current.push(rs) : HT(function() {
          (_n & (Ya | _l)) === Ca && rs();
        }), g = null;
      else {
        var x;
        switch (Eh(o)) {
          case Na:
            x = Os;
            break;
          case gl:
            x = go;
            break;
          case Pi:
            x = Vl;
            break;
          case Hi:
            x = Ko;
            break;
          default:
            x = Vl;
            break;
        }
        g = Lg(x, ax.bind(null, e));
      }
      e.callbackPriority = c, e.callbackNode = g;
    }
    function ax(e, t) {
      if (bR(), mv = ur, sy = xe, (_n & (Ya | _l)) !== Ca)
        throw new Error("Should not already be working.");
      var i = e.callbackNode, o = bu();
      if (o && e.callbackNode !== i)
        return null;
      var c = Sf(e, e === Ri ? Ta : xe);
      if (c === xe)
        return null;
      var d = !Cf(e, c) && !ph(e, c) && !t, g = d ? gM(e, c) : dy(e, c);
      if (g !== Tu) {
        if (g === Tc) {
          var x = Ef(e);
          x !== xe && (c = x, g = bg(e, x));
        }
        if (g === uv) {
          var w = cv;
          throw Rc(e, xe), vs(e, c), Wi(e, Jr()), w;
        }
        if (g === gg)
          vs(e, c);
        else {
          var k = !Cf(e, c), z = e.current.alternate;
          if (k && !cM(z)) {
            if (g = dy(e, c), g === Tc) {
              var I = Ef(e);
              I !== xe && (c = I, g = bg(e, I));
            }
            if (g === uv) {
              var $ = cv;
              throw Rc(e, xe), vs(e, c), Wi(e, Jr()), $;
            }
          }
          e.finishedWork = z, e.finishedLanes = c, sM(e, g, c);
        }
      }
      return Wi(e, Jr()), e.callbackNode === i ? ax.bind(null, e) : null;
    }
    function bg(e, t) {
      var i = dv;
      if (Rf(e)) {
        var o = Rc(e, t);
        o.flags |= Da, kw(e.containerInfo);
      }
      var c = dy(e, t);
      if (c !== Tc) {
        var d = Yi;
        Yi = i, d !== null && ix(d);
      }
      return c;
    }
    function ix(e) {
      Yi === null ? Yi = e : Yi.push.apply(Yi, e);
    }
    function sM(e, t, i) {
      switch (t) {
        case Tu:
        case uv:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case Tc: {
          bc(e, Yi, wu);
          break;
        }
        case ry: {
          if (vs(e, i), uu(i) && // do not delay if we're inside an act() scope
          !xx()) {
            var o = xg + ex - Jr();
            if (o > 10) {
              var c = Sf(e, xe);
              if (c !== xe)
                break;
              var d = e.suspendedLanes;
              if (!su(d, i)) {
                bi(), Tf(e, d);
                break;
              }
              e.timeoutHandle = T0(bc.bind(null, e, Yi, wu), o);
              break;
            }
          }
          bc(e, Yi, wu);
          break;
        }
        case sv: {
          if (vs(e, i), np(i))
            break;
          if (!xx()) {
            var g = Ji(e, i), x = g, w = Jr() - x, k = kM(w) - w;
            if (k > 10) {
              e.timeoutHandle = T0(bc.bind(null, e, Yi, wu), k);
              break;
            }
          }
          bc(e, Yi, wu);
          break;
        }
        case J3: {
          bc(e, Yi, wu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function cM(e) {
      for (var t = e; ; ) {
        if (t.flags & Pu) {
          var i = t.updateQueue;
          if (i !== null) {
            var o = i.stores;
            if (o !== null)
              for (var c = 0; c < o.length; c++) {
                var d = o[c], g = d.getSnapshot, x = d.value;
                try {
                  if (!Te(g(), x))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var w = t.child;
        if (t.subtreeFlags & Pu && w !== null) {
          w.return = t, t = w;
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
    function vs(e, t) {
      t = Ys(t, iy), t = Ys(t, fv), yh(e, t);
    }
    function lx(e) {
      if (MR(), (_n & (Ya | _l)) !== Ca)
        throw new Error("Should not already be working.");
      bu();
      var t = Sf(e, xe);
      if (!ii(t, Ut))
        return Wi(e, Jr()), null;
      var i = dy(e, t);
      if (e.tag !== ns && i === Tc) {
        var o = Ef(e);
        o !== xe && (t = o, i = bg(e, o));
      }
      if (i === uv) {
        var c = cv;
        throw Rc(e, xe), vs(e, t), Wi(e, Jr()), c;
      }
      if (i === gg)
        throw new Error("Root did not complete. This is a bug in React.");
      var d = e.current.alternate;
      return e.finishedWork = d, e.finishedLanes = t, bc(e, Yi, wu), Wi(e, Jr()), null;
    }
    function fM(e, t) {
      t !== xe && (wf(e, en(t, Ut)), Wi(e, Jr()), (_n & (Ya | _l)) === Ca && (pv(), rs()));
    }
    function Mg(e, t) {
      var i = _n;
      _n |= Z3;
      try {
        return e(t);
      } finally {
        _n = i, _n === Ca && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !io.isBatchingLegacy && (pv(), r2());
      }
    }
    function dM(e, t, i, o, c) {
      var d = $i(), g = qa.transition;
      try {
        return qa.transition = null, qr(Na), e(t, i, o, c);
      } finally {
        qr(d), qa.transition = g, _n === Ca && pv();
      }
    }
    function Ru(e) {
      ds !== null && ds.tag === ns && (_n & (Ya | _l)) === Ca && bu();
      var t = _n;
      _n |= Z3;
      var i = qa.transition, o = $i();
      try {
        return qa.transition = null, qr(Na), e ? e() : void 0;
      } finally {
        qr(o), qa.transition = i, _n = t, (_n & (Ya | _l)) === Ca && rs();
      }
    }
    function ox() {
      return (_n & (Ya | _l)) !== Ca;
    }
    function fy(e, t) {
      ci(Sg, Fo, e), Fo = en(Fo, t);
    }
    function _g(e) {
      Fo = Sg.current, si(Sg, e);
    }
    function Rc(e, t) {
      e.finishedWork = null, e.finishedLanes = xe;
      var i = e.timeoutHandle;
      if (i !== w0 && (e.timeoutHandle = w0, PT(i)), jr !== null)
        for (var o = jr.return; o !== null; ) {
          var c = o.alternate;
          U3(c, o), o = o.return;
        }
      Ri = e;
      var d = Mc(e.current, null);
      return jr = d, Ta = Fo = t, wa = Tu, cv = null, ay = xe, fv = xe, iy = xe, dv = null, Yi = null, oR(), Kl.discardPendingWarnings(), d;
    }
    function ux(e, t) {
      do {
        var i = jr;
        try {
          if (Em(), z2(), Zn(), yg.current = null, i === null || i.return === null) {
            wa = uv, cv = t, jr = null;
            return;
          }
          if (Me && i.mode & An && Xm(i, !0), Ve)
            if (Ei(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var o = t;
              yl(i, o, Ta);
            } else
              Ls(i, t, Ta);
          UR(e, i.return, i, t, Ta), dx(i);
        } catch (c) {
          t = c, jr === i && i !== null ? (i = i.return, jr = i) : i = jr;
          continue;
        }
        return;
      } while (!0);
    }
    function sx() {
      var e = mg.current;
      return mg.current = qm, e === null ? qm : e;
    }
    function cx(e) {
      mg.current = e;
    }
    function pM() {
      xg = Jr();
    }
    function yv(e) {
      ay = en(e, ay);
    }
    function vM() {
      wa === Tu && (wa = ry);
    }
    function kg() {
      (wa === Tu || wa === ry || wa === Tc) && (wa = sv), Ri !== null && (Bs(ay) || Bs(fv)) && vs(Ri, Ta);
    }
    function hM(e) {
      wa !== sv && (wa = Tc), dv === null ? dv = [e] : dv.push(e);
    }
    function mM() {
      return wa === Tu;
    }
    function dy(e, t) {
      var i = _n;
      _n |= Ya;
      var o = sx();
      if (Ri !== e || Ta !== t) {
        if (ri) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (gv(e, Ta), c.clear()), gh(e, t);
        }
        wu = up(), Rc(e, t);
      }
      tu(t);
      do
        try {
          yM();
          break;
        } catch (d) {
          ux(e, d);
        }
      while (!0);
      if (Em(), _n = i, cx(o), jr !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return ef(), Ri = null, Ta = xe, wa;
    }
    function yM() {
      for (; jr !== null; )
        fx(jr);
    }
    function gM(e, t) {
      var i = _n;
      _n |= Ya;
      var o = sx();
      if (Ri !== e || Ta !== t) {
        if (ri) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (gv(e, Ta), c.clear()), gh(e, t);
        }
        wu = up(), pv(), Rc(e, t);
      }
      tu(t);
      do
        try {
          SM();
          break;
        } catch (d) {
          ux(e, d);
        }
      while (!0);
      return Em(), cx(o), _n = i, jr !== null ? (sh(), Tu) : (ef(), Ri = null, Ta = xe, wa);
    }
    function SM() {
      for (; jr !== null && !$d(); )
        fx(jr);
    }
    function fx(e) {
      var t = e.alternate;
      Bn(e);
      var i;
      (e.mode & An) !== Et ? (z1(e), i = Dg(t, e, Fo), Xm(e, !0)) : i = Dg(t, e, Fo), Zn(), e.memoizedProps = e.pendingProps, i === null ? dx(e) : jr = i, yg.current = null;
    }
    function dx(e) {
      var t = e;
      do {
        var i = t.alternate, o = t.return;
        if ((t.flags & Ds) === xt) {
          Bn(t);
          var c = void 0;
          if ((t.mode & An) === Et ? c = N3(i, t, Fo) : (z1(t), c = N3(i, t, Fo), Xm(t, !1)), Zn(), c !== null) {
            jr = c;
            return;
          }
        } else {
          var d = vb(i, t);
          if (d !== null) {
            d.flags &= rh, jr = d;
            return;
          }
          if ((t.mode & An) !== Et) {
            Xm(t, !1);
            for (var g = t.actualDuration, x = t.child; x !== null; )
              g += x.actualDuration, x = x.sibling;
            t.actualDuration = g;
          }
          if (o !== null)
            o.flags |= Ds, o.subtreeFlags = xt, o.deletions = null;
          else {
            wa = gg, jr = null;
            return;
          }
        }
        var w = t.sibling;
        if (w !== null) {
          jr = w;
          return;
        }
        t = o, jr = t;
      } while (t !== null);
      wa === Tu && (wa = J3);
    }
    function bc(e, t, i) {
      var o = $i(), c = qa.transition;
      try {
        qa.transition = null, qr(Na), xM(e, t, i, o);
      } finally {
        qa.transition = c, qr(o);
      }
      return null;
    }
    function xM(e, t, i, o) {
      do
        bu();
      while (ds !== null);
      if (OM(), (_n & (Ya | _l)) !== Ca)
        throw new Error("Should not already be working.");
      var c = e.finishedWork, d = e.finishedLanes;
      if (Wd(d), c === null)
        return Qd(), null;
      if (d === xe && v("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = xe, c === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Ln;
      var g = en(c.lanes, c.childLanes);
      lp(e, g), e === Ri && (Ri = null, jr = null, Ta = xe), ((c.subtreeFlags & $l) !== xt || (c.flags & $l) !== xt) && (wc || (wc = !0, Tg = i, Lg(Vl, function() {
        return bu(), null;
      })));
      var x = (c.subtreeFlags & (ho | mo | yo | $l)) !== xt, w = (c.flags & (ho | mo | yo | $l)) !== xt;
      if (x || w) {
        var k = qa.transition;
        qa.transition = null;
        var z = $i();
        qr(Na);
        var I = _n;
        _n |= _l, yg.current = null, Sb(e, c), r3(), Lb(e, c, d), zT(e.containerInfo), e.current = c, As(d), Ab(c, e, d), Ns(), Vd(), _n = I, qr(z), qa.transition = k;
      } else
        e.current = c, r3();
      var $ = wc;
      if (wc ? (wc = !1, ds = e, vv = d) : (fd = 0, uy = null), g = e.pendingLanes, g === xe && (cd = null), $ || mx(e.current, !1), Bd(c.stateNode, o), ri && e.memoizedUpdaters.clear(), Jb(), Wi(e, Jr()), t !== null)
        for (var Z = e.onRecoverableError, ne = 0; ne < t.length; ne++) {
          var se = t[ne], Qe = se.stack, Tt = se.digest;
          Z(se.value, {
            componentStack: Qe,
            digest: Tt
          });
        }
      if (ly) {
        ly = !1;
        var mt = Eg;
        throw Eg = null, mt;
      }
      return ii(vv, Ut) && e.tag !== ns && bu(), g = e.pendingLanes, ii(g, Ut) ? (RR(), e === wg ? hv++ : (hv = 0, wg = e)) : hv = 0, rs(), Qd(), null;
    }
    function bu() {
      if (ds !== null) {
        var e = Eh(vv), t = Xs(Pi, e), i = qa.transition, o = $i();
        try {
          return qa.transition = null, qr(t), CM();
        } finally {
          qr(o), qa.transition = i;
        }
      }
      return !1;
    }
    function EM(e) {
      Cg.push(e), wc || (wc = !0, Lg(Vl, function() {
        return bu(), null;
      }));
    }
    function CM() {
      if (ds === null)
        return !1;
      var e = Tg;
      Tg = null;
      var t = ds, i = vv;
      if (ds = null, vv = xe, (_n & (Ya | _l)) !== Ca)
        throw new Error("Cannot flush passive effects while already rendering.");
      Rg = !0, oy = !1, eu(i);
      var o = _n;
      _n |= _l, $b(t.current), jb(t, t.current, i, e);
      {
        var c = Cg;
        Cg = [];
        for (var d = 0; d < c.length; d++) {
          var g = c[d];
          Tb(t, g);
        }
      }
      Kd(), mx(t.current, !0), _n = o, rs(), oy ? t === uy ? fd++ : (fd = 0, uy = t) : fd = 0, Rg = !1, oy = !1, qd(t);
      {
        var x = t.current.stateNode;
        x.effectDuration = 0, x.passiveEffectDuration = 0;
      }
      return !0;
    }
    function px(e) {
      return cd !== null && cd.has(e);
    }
    function TM(e) {
      cd === null ? cd = /* @__PURE__ */ new Set([e]) : cd.add(e);
    }
    function wM(e) {
      ly || (ly = !0, Eg = e);
    }
    var RM = wM;
    function vx(e, t, i) {
      var o = Ec(i, t), c = f3(e, o, Ut), d = is(e, c, Ut), g = bi();
      d !== null && (Bu(d, Ut, g), Wi(d, g));
    }
    function vr(e, t, i) {
      if (mb(i), Sv(!1), e.tag === R) {
        vx(e, e, i);
        return;
      }
      var o = null;
      for (o = t; o !== null; ) {
        if (o.tag === R) {
          vx(o, e, i);
          return;
        } else if (o.tag === T) {
          var c = o.type, d = o.stateNode;
          if (typeof c.getDerivedStateFromError == "function" || typeof d.componentDidCatch == "function" && !px(d)) {
            var g = Ec(i, e), x = X1(o, g, Ut), w = is(o, x, Ut), k = bi();
            w !== null && (Bu(w, Ut, k), Wi(w, k));
            return;
          }
        }
        o = o.return;
      }
      v(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, i);
    }
    function bM(e, t, i) {
      var o = e.pingCache;
      o !== null && o.delete(t);
      var c = bi();
      Tf(e, i), NM(e), Ri === e && su(Ta, i) && (wa === sv || wa === ry && uu(Ta) && Jr() - xg < ex ? Rc(e, xe) : iy = en(iy, i)), Wi(e, c);
    }
    function hx(e, t) {
      t === Ln && (t = lM(e));
      var i = bi(), o = Bi(e, t);
      o !== null && (Bu(o, t, i), Wi(o, i));
    }
    function MM(e) {
      var t = e.memoizedState, i = Ln;
      t !== null && (i = t.retryLane), hx(e, i);
    }
    function _M(e, t) {
      var i = Ln, o;
      switch (e.tag) {
        case q:
          o = e.stateNode;
          var c = e.memoizedState;
          c !== null && (i = c.retryLane);
          break;
        case ze:
          o = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      o !== null && o.delete(t), hx(e, i);
    }
    function kM(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : nM(e / 1960) * 1960;
    }
    function DM() {
      if (hv > aM)
        throw hv = 0, wg = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      fd > iM && (fd = 0, uy = null, v("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function OM() {
      Kl.flushLegacyContextWarning(), Kl.flushPendingUnsafeLifecycleWarnings();
    }
    function mx(e, t) {
      Bn(e), py(e, vo, Xb), t && py(e, vl, Kb), py(e, vo, Qb), t && py(e, vl, Gb), Zn();
    }
    function py(e, t, i) {
      for (var o = e, c = null; o !== null; ) {
        var d = o.subtreeFlags & t;
        o !== c && o.child !== null && d !== xt ? o = o.child : ((o.flags & t) !== xt && i(o), o.sibling !== null ? o = o.sibling : o = c = o.return);
      }
    }
    var vy = null;
    function yx(e) {
      {
        if ((_n & Ya) !== Ca || !(e.mode & cn))
          return;
        var t = e.tag;
        if (t !== M && t !== R && t !== T && t !== C && t !== B && t !== re && t !== pe)
          return;
        var i = tt(e) || "ReactComponent";
        if (vy !== null) {
          if (vy.has(i))
            return;
          vy.add(i);
        } else
          vy = /* @__PURE__ */ new Set([i]);
        var o = rn;
        try {
          Bn(e), v("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          o ? Bn(e) : Zn();
        }
      }
    }
    var Dg;
    {
      var zM = null;
      Dg = function(e, t, i) {
        var o = Rx(zM, t);
        try {
          return D3(e, t, i);
        } catch (d) {
          if (Bw() || d !== null && typeof d == "object" && typeof d.then == "function")
            throw d;
          if (Em(), z2(), U3(e, t), Rx(t, o), t.mode & An && z1(t), po(null, D3, null, e, t, i), Pl()) {
            var c = ks();
            typeof c == "object" && c !== null && c._suppressLogging && typeof d == "object" && d !== null && !d._suppressLogging && (d._suppressLogging = !0);
          }
          throw d;
        }
      };
    }
    var gx = !1, Og;
    Og = /* @__PURE__ */ new Set();
    function LM(e) {
      if (Kr && !CR())
        switch (e.tag) {
          case C:
          case B:
          case pe: {
            var t = jr && tt(jr) || "Unknown", i = t;
            if (!Og.has(i)) {
              Og.add(i);
              var o = tt(e) || "Unknown";
              v("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", o, t, t);
            }
            break;
          }
          case T: {
            gx || (v("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), gx = !0);
            break;
          }
        }
    }
    function gv(e, t) {
      if (ri) {
        var i = e.memoizedUpdaters;
        i.forEach(function(o) {
          Qs(e, o, t);
        });
      }
    }
    var zg = {};
    function Lg(e, t) {
      {
        var i = io.current;
        return i !== null ? (i.push(t), zg) : Hd(e, t);
      }
    }
    function Sx(e) {
      if (e !== zg)
        return ih(e);
    }
    function xx() {
      return io.current !== null;
    }
    function AM(e) {
      {
        if (e.mode & cn) {
          if (!K3())
            return;
        } else if (!tM() || _n !== Ca || e.tag !== C && e.tag !== B && e.tag !== pe)
          return;
        if (io.current === null) {
          var t = rn;
          try {
            Bn(e), v(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, tt(e));
          } finally {
            t ? Bn(e) : Zn();
          }
        }
      }
    }
    function NM(e) {
      e.tag !== ns && K3() && io.current === null && v(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Sv(e) {
      rx = e;
    }
    var kl = null, dd = null, UM = function(e) {
      kl = e;
    };
    function pd(e) {
      {
        if (kl === null)
          return e;
        var t = kl(e);
        return t === void 0 ? e : t.current;
      }
    }
    function Ag(e) {
      return pd(e);
    }
    function Ng(e) {
      {
        if (kl === null)
          return e;
        var t = kl(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var i = pd(e.render);
            if (e.render !== i) {
              var o = {
                $$typeof: oe,
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
    function Ex(e, t) {
      {
        if (kl === null)
          return !1;
        var i = e.elementType, o = t.type, c = !1, d = typeof o == "object" && o !== null ? o.$$typeof : null;
        switch (e.tag) {
          case T: {
            typeof o == "function" && (c = !0);
            break;
          }
          case C: {
            (typeof o == "function" || d === qe) && (c = !0);
            break;
          }
          case B: {
            (d === oe || d === qe) && (c = !0);
            break;
          }
          case re:
          case pe: {
            (d === Ne || d === qe) && (c = !0);
            break;
          }
          default:
            return !1;
        }
        if (c) {
          var g = kl(i);
          if (g !== void 0 && g === kl(o))
            return !0;
        }
        return !1;
      }
    }
    function Cx(e) {
      {
        if (kl === null || typeof WeakSet != "function")
          return;
        dd === null && (dd = /* @__PURE__ */ new WeakSet()), dd.add(e);
      }
    }
    var jM = function(e, t) {
      {
        if (kl === null)
          return;
        var i = t.staleFamilies, o = t.updatedFamilies;
        bu(), Ru(function() {
          Ug(e.current, o, i);
        });
      }
    }, FM = function(e, t) {
      {
        if (e.context !== nl)
          return;
        bu(), Ru(function() {
          xv(t, e, null, null);
        });
      }
    };
    function Ug(e, t, i) {
      {
        var o = e.alternate, c = e.child, d = e.sibling, g = e.tag, x = e.type, w = null;
        switch (g) {
          case C:
          case pe:
          case T:
            w = x;
            break;
          case B:
            w = x.render;
            break;
        }
        if (kl === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var k = !1, z = !1;
        if (w !== null) {
          var I = kl(w);
          I !== void 0 && (i.has(I) ? z = !0 : t.has(I) && (g === T ? z = !0 : k = !0));
        }
        if (dd !== null && (dd.has(e) || o !== null && dd.has(o)) && (z = !0), z && (e._debugNeedsRemount = !0), z || k) {
          var $ = Bi(e, Ut);
          $ !== null && Ra($, e, Ut, ur);
        }
        c !== null && !z && Ug(c, t, i), d !== null && Ug(d, t, i);
      }
    }
    var PM = function(e, t) {
      {
        var i = /* @__PURE__ */ new Set(), o = new Set(t.map(function(c) {
          return c.current;
        }));
        return jg(e.current, o, i), i;
      }
    };
    function jg(e, t, i) {
      {
        var o = e.child, c = e.sibling, d = e.tag, g = e.type, x = null;
        switch (d) {
          case C:
          case pe:
          case T:
            x = g;
            break;
          case B:
            x = g.render;
            break;
        }
        var w = !1;
        x !== null && t.has(x) && (w = !0), w ? HM(e, i) : o !== null && jg(o, t, i), c !== null && jg(c, t, i);
      }
    }
    function HM(e, t) {
      {
        var i = $M(e, t);
        if (i)
          return;
        for (var o = e; ; ) {
          switch (o.tag) {
            case O:
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
    function $M(e, t) {
      for (var i = e, o = !1; ; ) {
        if (i.tag === O)
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
        var Tx = Object.preventExtensions({});
      } catch {
        Fg = !0;
      }
    }
    function VM(e, t, i, o) {
      this.tag = e, this.key = i, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = o, this.flags = xt, this.subtreeFlags = xt, this.deletions = null, this.lanes = xe, this.childLanes = xe, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !Fg && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var rl = function(e, t, i, o) {
      return new VM(e, t, i, o);
    };
    function Pg(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function IM(e) {
      return typeof e == "function" && !Pg(e) && e.defaultProps === void 0;
    }
    function BM(e) {
      if (typeof e == "function")
        return Pg(e) ? T : C;
      if (e != null) {
        var t = e.$$typeof;
        if (t === oe)
          return B;
        if (t === Ne)
          return re;
      }
      return M;
    }
    function Mc(e, t) {
      var i = e.alternate;
      i === null ? (i = rl(e.tag, t, e.key, e.mode), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i._debugSource = e._debugSource, i._debugOwner = e._debugOwner, i._debugHookTypes = e._debugHookTypes, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = xt, i.subtreeFlags = xt, i.deletions = null, i.actualDuration = 0, i.actualStartTime = -1), i.flags = e.flags & Vr, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue;
      var o = e.dependencies;
      switch (i.dependencies = o === null ? null : {
        lanes: o.lanes,
        firstContext: o.firstContext
      }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.selfBaseDuration = e.selfBaseDuration, i.treeBaseDuration = e.treeBaseDuration, i._debugNeedsRemount = e._debugNeedsRemount, i.tag) {
        case M:
        case C:
        case pe:
          i.type = pd(e.type);
          break;
        case T:
          i.type = Ag(e.type);
          break;
        case B:
          i.type = Ng(e.type);
          break;
      }
      return i;
    }
    function qM(e, t) {
      e.flags &= Vr | Tr;
      var i = e.alternate;
      if (i === null)
        e.childLanes = xe, e.lanes = t, e.child = null, e.subtreeFlags = xt, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = xt, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type;
        var o = i.dependencies;
        e.dependencies = o === null ? null : {
          lanes: o.lanes,
          firstContext: o.firstContext
        }, e.selfBaseDuration = i.selfBaseDuration, e.treeBaseDuration = i.treeBaseDuration;
      }
      return e;
    }
    function YM(e, t, i) {
      var o;
      return e === fm ? (o = cn, t === !0 && (o |= nr, o |= Nn)) : o = Et, ri && (o |= An), rl(R, null, null, o);
    }
    function Hg(e, t, i, o, c, d) {
      var g = M, x = e;
      if (typeof e == "function")
        Pg(e) ? (g = T, x = Ag(x)) : x = pd(x);
      else if (typeof e == "string")
        g = O;
      else
        e: switch (e) {
          case Dn:
            return hs(i.children, c, d, t);
          case On:
            g = F, c |= nr, (c & cn) !== Et && (c |= Nn);
            break;
          case mn:
            return WM(i, c, d, t);
          case Se:
            return QM(i, c, d, t);
          case be:
            return GM(i, c, d, t);
          case ft:
            return wx(i, c, d, t);
          case Lt:
          // eslint-disable-next-line no-fallthrough
          case Xe:
          // eslint-disable-next-line no-fallthrough
          case pn:
          // eslint-disable-next-line no-fallthrough
          case vn:
          // eslint-disable-next-line no-fallthrough
          case at:
          // eslint-disable-next-line no-fallthrough
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case Ct:
                  g = J;
                  break e;
                case A:
                  g = K;
                  break e;
                case oe:
                  g = B, x = Ng(x);
                  break e;
                case Ne:
                  g = re;
                  break e;
                case qe:
                  g = Le, x = null;
                  break e;
              }
            var w = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (w += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var k = o ? tt(o) : null;
              k && (w += `

Check the render method of \`` + k + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + w));
          }
        }
      var z = rl(g, i, t, c);
      return z.elementType = e, z.type = x, z.lanes = d, z._debugOwner = o, z;
    }
    function $g(e, t, i) {
      var o = null;
      o = e._owner;
      var c = e.type, d = e.key, g = e.props, x = Hg(c, d, g, o, t, i);
      return x._debugSource = e._source, x._debugOwner = e._owner, x;
    }
    function hs(e, t, i, o) {
      var c = rl(j, e, o, t);
      return c.lanes = i, c;
    }
    function WM(e, t, i, o) {
      typeof e.id != "string" && v('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var c = rl(ee, e, o, t | An);
      return c.elementType = mn, c.lanes = i, c.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, c;
    }
    function QM(e, t, i, o) {
      var c = rl(q, e, o, t);
      return c.elementType = Se, c.lanes = i, c;
    }
    function GM(e, t, i, o) {
      var c = rl(ze, e, o, t);
      return c.elementType = be, c.lanes = i, c;
    }
    function wx(e, t, i, o) {
      var c = rl(fe, e, o, t);
      c.elementType = ft, c.lanes = i;
      var d = {
        isHidden: !1
      };
      return c.stateNode = d, c;
    }
    function Vg(e, t, i) {
      var o = rl(L, e, null, t);
      return o.lanes = i, o;
    }
    function XM() {
      var e = rl(O, null, null, Et);
      return e.elementType = "DELETED", e;
    }
    function KM(e) {
      var t = rl(ie, null, null, Et);
      return t.stateNode = e, t;
    }
    function Ig(e, t, i) {
      var o = e.children !== null ? e.children : [], c = rl(D, o, e.key, t);
      return c.lanes = i, c.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, c;
    }
    function Rx(e, t) {
      return e === null && (e = rl(M, null, null, Et)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function ZM(e, t, i, o, c) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = w0, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Ln, this.eventTimes = Ws(xe), this.expirationTimes = Ws(ur), this.pendingLanes = xe, this.suspendedLanes = xe, this.pingedLanes = xe, this.expiredLanes = xe, this.mutableReadLanes = xe, this.finishedLanes = xe, this.entangledLanes = xe, this.entanglements = Ws(xe), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var d = this.pendingUpdatersLaneMap = [], g = 0; g < nu; g++)
          d.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case fm:
          this._debugRootType = i ? "hydrateRoot()" : "createRoot()";
          break;
        case ns:
          this._debugRootType = i ? "hydrate()" : "render()";
          break;
      }
    }
    function bx(e, t, i, o, c, d, g, x, w, k) {
      var z = new ZM(e, t, i, x, w), I = YM(t, d);
      z.current = I, I.stateNode = z;
      {
        var $ = {
          element: o,
          isDehydrated: i,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        I.memoizedState = $;
      }
      return n1(I), z;
    }
    var Bg = "18.3.1";
    function JM(e, t, i) {
      var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return Nt(o), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: Wt,
        key: o == null ? null : "" + o,
        children: e,
        containerInfo: t,
        implementation: i
      };
    }
    var qg, Yg;
    qg = !1, Yg = {};
    function Mx(e) {
      if (!e)
        return nl;
      var t = Fu(e), i = Nw(t);
      if (t.tag === T) {
        var o = t.type;
        if (Oo(o))
          return e2(t, o, i);
      }
      return i;
    }
    function e_(e, t) {
      {
        var i = Fu(e);
        if (i === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var o = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + o);
        }
        var c = ti(i);
        if (c === null)
          return null;
        if (c.mode & nr) {
          var d = tt(i) || "Component";
          if (!Yg[d]) {
            Yg[d] = !0;
            var g = rn;
            try {
              Bn(c), i.mode & nr ? v("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, d) : v("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, d);
            } finally {
              g ? Bn(g) : Zn();
            }
          }
        }
        return c.stateNode;
      }
    }
    function _x(e, t, i, o, c, d, g, x) {
      var w = !1, k = null;
      return bx(e, t, w, k, i, o, c, d, g);
    }
    function kx(e, t, i, o, c, d, g, x, w, k) {
      var z = !0, I = bx(i, o, z, e, c, d, g, x, w);
      I.context = Mx(null);
      var $ = I.current, Z = bi(), ne = ps($), se = Eu(Z, ne);
      return se.callback = t ?? null, is($, se, ne), oM(I, ne, Z), I;
    }
    function xv(e, t, i, o) {
      Id(t, e);
      var c = t.current, d = bi(), g = ps(c);
      Rr(g);
      var x = Mx(i);
      t.context === null ? t.context = x : t.pendingContext = x, Kr && rn !== null && !qg && (qg = !0, v(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, tt(rn) || "Unknown"));
      var w = Eu(d, g);
      w.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (typeof o != "function" && v("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", o), w.callback = o);
      var k = is(c, w, g);
      return k !== null && (Ra(k, c, g, d), bm(k, c, g)), g;
    }
    function hy(e) {
      var t = e.current;
      return t.child ? t.child.tag === O ? t.child.stateNode : t.child.stateNode : null;
    }
    function t_(e) {
      switch (e.tag) {
        case R: {
          var t = e.stateNode;
          if (Rf(t)) {
            var i = fh(t);
            fM(t, i);
          }
          break;
        }
        case q: {
          Ru(function() {
            var c = Bi(e, Ut);
            if (c !== null) {
              var d = bi();
              Ra(c, e, Ut, d);
            }
          });
          var o = Ut;
          Wg(e, o);
          break;
        }
      }
    }
    function Dx(e, t) {
      var i = e.memoizedState;
      i !== null && i.dehydrated !== null && (i.retryLane = mh(i.retryLane, t));
    }
    function Wg(e, t) {
      Dx(e, t);
      var i = e.alternate;
      i && Dx(i, t);
    }
    function n_(e) {
      if (e.tag === q) {
        var t = $s, i = Bi(e, t);
        if (i !== null) {
          var o = bi();
          Ra(i, e, t, o);
        }
        Wg(e, t);
      }
    }
    function r_(e) {
      if (e.tag === q) {
        var t = ps(e), i = Bi(e, t);
        if (i !== null) {
          var o = bi();
          Ra(i, e, t, o);
        }
        Wg(e, t);
      }
    }
    function Ox(e) {
      var t = Sr(e);
      return t === null ? null : t.stateNode;
    }
    var zx = function(e) {
      return null;
    };
    function a_(e) {
      return zx(e);
    }
    var Lx = function(e) {
      return !1;
    };
    function i_(e) {
      return Lx(e);
    }
    var Ax = null, Nx = null, Ux = null, jx = null, Fx = null, Px = null, Hx = null, $x = null, Vx = null;
    {
      var Ix = function(e, t, i) {
        var o = t[i], c = bt(e) ? e.slice() : gt({}, e);
        return i + 1 === t.length ? (bt(c) ? c.splice(o, 1) : delete c[o], c) : (c[o] = Ix(e[o], t, i + 1), c);
      }, Bx = function(e, t) {
        return Ix(e, t, 0);
      }, qx = function(e, t, i, o) {
        var c = t[o], d = bt(e) ? e.slice() : gt({}, e);
        if (o + 1 === t.length) {
          var g = i[o];
          d[g] = d[c], bt(d) ? d.splice(c, 1) : delete d[c];
        } else
          d[c] = qx(
            // $FlowFixMe number or string is fine here
            e[c],
            t,
            i,
            o + 1
          );
        return d;
      }, Yx = function(e, t, i) {
        if (t.length !== i.length) {
          y("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var o = 0; o < i.length - 1; o++)
            if (t[o] !== i[o]) {
              y("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return qx(e, t, i, 0);
      }, Wx = function(e, t, i, o) {
        if (i >= t.length)
          return o;
        var c = t[i], d = bt(e) ? e.slice() : gt({}, e);
        return d[c] = Wx(e[c], t, i + 1, o), d;
      }, Qx = function(e, t, i) {
        return Wx(e, t, 0, i);
      }, Qg = function(e, t) {
        for (var i = e.memoizedState; i !== null && t > 0; )
          i = i.next, t--;
        return i;
      };
      Ax = function(e, t, i, o) {
        var c = Qg(e, t);
        if (c !== null) {
          var d = Qx(c.memoizedState, i, o);
          c.memoizedState = d, c.baseState = d, e.memoizedProps = gt({}, e.memoizedProps);
          var g = Bi(e, Ut);
          g !== null && Ra(g, e, Ut, ur);
        }
      }, Nx = function(e, t, i) {
        var o = Qg(e, t);
        if (o !== null) {
          var c = Bx(o.memoizedState, i);
          o.memoizedState = c, o.baseState = c, e.memoizedProps = gt({}, e.memoizedProps);
          var d = Bi(e, Ut);
          d !== null && Ra(d, e, Ut, ur);
        }
      }, Ux = function(e, t, i, o) {
        var c = Qg(e, t);
        if (c !== null) {
          var d = Yx(c.memoizedState, i, o);
          c.memoizedState = d, c.baseState = d, e.memoizedProps = gt({}, e.memoizedProps);
          var g = Bi(e, Ut);
          g !== null && Ra(g, e, Ut, ur);
        }
      }, jx = function(e, t, i) {
        e.pendingProps = Qx(e.memoizedProps, t, i), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Bi(e, Ut);
        o !== null && Ra(o, e, Ut, ur);
      }, Fx = function(e, t) {
        e.pendingProps = Bx(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Bi(e, Ut);
        i !== null && Ra(i, e, Ut, ur);
      }, Px = function(e, t, i) {
        e.pendingProps = Yx(e.memoizedProps, t, i), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Bi(e, Ut);
        o !== null && Ra(o, e, Ut, ur);
      }, Hx = function(e) {
        var t = Bi(e, Ut);
        t !== null && Ra(t, e, Ut, ur);
      }, $x = function(e) {
        zx = e;
      }, Vx = function(e) {
        Lx = e;
      };
    }
    function l_(e) {
      var t = ti(e);
      return t === null ? null : t.stateNode;
    }
    function o_(e) {
      return null;
    }
    function u_() {
      return rn;
    }
    function s_(e) {
      var t = e.findFiberByHostInstance, i = s.ReactCurrentDispatcher;
      return $u({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: Ax,
        overrideHookStateDeletePath: Nx,
        overrideHookStateRenamePath: Ux,
        overrideProps: jx,
        overridePropsDeletePath: Fx,
        overridePropsRenamePath: Px,
        setErrorHandler: $x,
        setSuspenseHandler: Vx,
        scheduleUpdate: Hx,
        currentDispatcherRef: i,
        findHostInstanceByFiber: l_,
        findFiberByHostInstance: t || o_,
        // React Refresh
        findHostInstancesForRefresh: PM,
        scheduleRefresh: jM,
        scheduleRoot: FM,
        setRefreshHandler: UM,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: u_,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: Bg
      });
    }
    var Gx = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function Gg(e) {
      this._internalRoot = e;
    }
    my.prototype.render = Gg.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? v("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : yy(arguments[1]) ? v("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && v("You passed a second argument to root.render(...) but it only accepts one argument.");
        var i = t.containerInfo;
        if (i.nodeType !== Hr) {
          var o = Ox(t.current);
          o && o.parentNode !== i && v("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      xv(e, t, null, null);
    }, my.prototype.unmount = Gg.prototype.unmount = function() {
      typeof arguments[0] == "function" && v("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        ox() && v("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Ru(function() {
          xv(null, e, null, null);
        }), GS(t);
      }
    };
    function c_(e, t) {
      if (!yy(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      Xx(e);
      var i = !1, o = !1, c = "", d = Gx;
      t != null && (t.hydrate ? y("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Ft && v(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (c = t.identifierPrefix), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var g = _x(e, fm, null, i, o, c, d);
      am(g.current, e);
      var x = e.nodeType === Hr ? e.parentNode : e;
      return bp(x), new Gg(g);
    }
    function my(e) {
      this._internalRoot = e;
    }
    function f_(e) {
      e && bh(e);
    }
    my.prototype.unstable_scheduleHydration = f_;
    function d_(e, t, i) {
      if (!yy(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      Xx(e), t === void 0 && v("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var o = i ?? null, c = i != null && i.hydratedSources || null, d = !1, g = !1, x = "", w = Gx;
      i != null && (i.unstable_strictMode === !0 && (d = !0), i.identifierPrefix !== void 0 && (x = i.identifierPrefix), i.onRecoverableError !== void 0 && (w = i.onRecoverableError));
      var k = kx(t, null, e, fm, o, d, g, x, w);
      if (am(k.current, e), bp(e), c)
        for (var z = 0; z < c.length; z++) {
          var I = c[z];
          mR(k, I);
        }
      return new my(k);
    }
    function yy(e) {
      return !!(e && (e.nodeType === Za || e.nodeType === Fl || e.nodeType === _d));
    }
    function Ev(e) {
      return !!(e && (e.nodeType === Za || e.nodeType === Fl || e.nodeType === _d || e.nodeType === Hr && e.nodeValue === " react-mount-point-unstable "));
    }
    function Xx(e) {
      e.nodeType === Za && e.tagName && e.tagName.toUpperCase() === "BODY" && v("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), jp(e) && (e._reactRootContainer ? v("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : v("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var p_ = s.ReactCurrentOwner, Kx;
    Kx = function(e) {
      if (e._reactRootContainer && e.nodeType !== Hr) {
        var t = Ox(e._reactRootContainer.current);
        t && t.parentNode !== e && v("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var i = !!e._reactRootContainer, o = Xg(e), c = !!(o && es(o));
      c && !i && v("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Za && e.tagName && e.tagName.toUpperCase() === "BODY" && v("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function Xg(e) {
      return e ? e.nodeType === Fl ? e.documentElement : e.firstChild : null;
    }
    function Zx() {
    }
    function v_(e, t, i, o, c) {
      if (c) {
        if (typeof o == "function") {
          var d = o;
          o = function() {
            var $ = hy(g);
            d.call($);
          };
        }
        var g = kx(
          t,
          o,
          e,
          ns,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          Zx
        );
        e._reactRootContainer = g, am(g.current, e);
        var x = e.nodeType === Hr ? e.parentNode : e;
        return bp(x), Ru(), g;
      } else {
        for (var w; w = e.lastChild; )
          e.removeChild(w);
        if (typeof o == "function") {
          var k = o;
          o = function() {
            var $ = hy(z);
            k.call($);
          };
        }
        var z = _x(
          e,
          ns,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          Zx
        );
        e._reactRootContainer = z, am(z.current, e);
        var I = e.nodeType === Hr ? e.parentNode : e;
        return bp(I), Ru(function() {
          xv(t, z, i, o);
        }), z;
      }
    }
    function h_(e, t) {
      e !== null && typeof e != "function" && v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function gy(e, t, i, o, c) {
      Kx(i), h_(c === void 0 ? null : c, "render");
      var d = i._reactRootContainer, g;
      if (!d)
        g = v_(i, t, e, c, o);
      else {
        if (g = d, typeof c == "function") {
          var x = c;
          c = function() {
            var w = hy(g);
            x.call(w);
          };
        }
        xv(t, g, e, c);
      }
      return hy(g);
    }
    var Jx = !1;
    function m_(e) {
      {
        Jx || (Jx = !0, v("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = p_.current;
        if (t !== null && t.stateNode !== null) {
          var i = t.stateNode._warnedAboutRefsInRender;
          i || v("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", vt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Za ? e : e_(e, "findDOMNode");
    }
    function y_(e, t, i) {
      if (v("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Ev(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = jp(t) && t._reactRootContainer === void 0;
        o && v("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return gy(null, e, t, !0, i);
    }
    function g_(e, t, i) {
      if (v("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Ev(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = jp(t) && t._reactRootContainer === void 0;
        o && v("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return gy(null, e, t, !1, i);
    }
    function S_(e, t, i, o) {
      if (v("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Ev(i))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !Wy(e))
        throw new Error("parentComponent must be a valid React Component");
      return gy(e, t, i, !1, o);
    }
    var eE = !1;
    function x_(e) {
      if (eE || (eE = !0, v("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Ev(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = jp(e) && e._reactRootContainer === void 0;
        t && v("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var i = Xg(e), o = i && !es(i);
          o && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Ru(function() {
          gy(null, null, e, !1, function() {
            e._reactRootContainer = null, GS(e);
          });
        }), !0;
      } else {
        {
          var c = Xg(e), d = !!(c && es(c)), g = e.nodeType === Za && Ev(e.parentNode) && !!e.parentNode._reactRootContainer;
          d && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", g ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    za(t_), qu(n_), Ch(r_), Zs($i), sp(Sh), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && v("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), $c(CT), Yy(Mg, dM, Ru);
    function E_(e, t) {
      var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!yy(t))
        throw new Error("Target container is not a DOM element.");
      return JM(e, t, null, i);
    }
    function C_(e, t, i, o) {
      return S_(e, t, i, o);
    }
    var Kg = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [es, Bf, im, Au, Vc, Mg]
    };
    function T_(e, t) {
      return Kg.usingClientEntryPoint || v('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), c_(e, t);
    }
    function w_(e, t, i) {
      return Kg.usingClientEntryPoint || v('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), d_(e, t, i);
    }
    function R_(e) {
      return ox() && v("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Ru(e);
    }
    var b_ = s_({
      findFiberByHostInstance: dc,
      bundleType: 1,
      version: Bg,
      rendererPackageName: "react-dom"
    });
    if (!b_ && Tn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var tE = window.location.protocol;
      /^(https?|file):$/.test(tE) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (tE === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Gi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Kg, Gi.createPortal = E_, Gi.createRoot = T_, Gi.findDOMNode = m_, Gi.flushSync = R_, Gi.hydrate = y_, Gi.hydrateRoot = w_, Gi.render = g_, Gi.unmountComponentAtNode = x_, Gi.unstable_batchedUpdates = Mg, Gi.unstable_renderSubtreeIntoContainer = C_, Gi.version = Bg, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })()), Gi;
}
var mE;
function v4() {
  if (mE) return Ey.exports;
  mE = 1;
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
  return process.env.NODE_ENV === "production" ? (n(), Ey.exports = d4()) : Ey.exports = p4(), Ey.exports;
}
var yE;
function h4() {
  if (yE) return md;
  yE = 1;
  var n = v4();
  if (process.env.NODE_ENV === "production")
    md.createRoot = n.createRoot, md.hydrateRoot = n.hydrateRoot;
  else {
    var l = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    md.createRoot = function(s, p) {
      l.usingClientEntryPoint = !0;
      try {
        return n.createRoot(s, p);
      } finally {
        l.usingClientEntryPoint = !1;
      }
    }, md.hydrateRoot = function(s, p, h) {
      l.usingClientEntryPoint = !0;
      try {
        return n.hydrateRoot(s, p, h);
      } finally {
        l.usingClientEntryPoint = !1;
      }
    };
  }
  return md;
}
var m4 = h4();
const ms = (n) => typeof n != "number" ? "N/A" : `${Math.round(n)} ms`;
function y4({ viewport: n }) {
  const [l, s] = hd.useState({
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
  }), [p, h] = hd.useState(() => localStorage.getItem("s3d-debug-open") === "true"), [y, v] = hd.useState(!1);
  hd.useEffect(() => {
    const C = () => {
      n && n.renderer && v(!!n.renderer.wireframe);
    };
    C();
    const T = setInterval(C, 500);
    return () => clearInterval(T);
  }, [n]), hd.useEffect(() => {
    localStorage.setItem("s3d-debug-open", p);
  }, [p]), hd.useEffect(() => {
    let C = 0;
    const T = setInterval(() => {
      if (n) {
        const M = n.lastRenderStats || {};
        C = Math.max(C, M.fps || 0), s({
          fps: M.fps || 0,
          maxFps: C,
          totalObjects: M.totalObjects || 0,
          visibleObjects: M.visibleObjects || 0,
          faces: M.faces || 0,
          sortTime: M.sortTime || 0,
          cullTime: M.cullTime || 0,
          groupTime: M.groupTime || 0,
          processTime: M.processTime || 0,
          drawTime: M.drawTime || 0,
          updateTime: M.updateTime || 0,
          retrieveTime: M.retrieveTime || 0,
          frameTime: M.frameTime || 0,
          drawCalls: M.drawCalls || 0,
          dt: M.dt || 0
        });
      }
    }, 100);
    return () => clearInterval(T);
  }, [n]);
  const E = () => {
    const C = !y;
    v(C), n && n.renderer && (n.renderer.wireframe = C), window.dispatchEvent(new CustomEvent("s3d-wireframe-change", {
      detail: { enabled: C }
    }));
  };
  return /* @__PURE__ */ At.jsxs("div", { className: "s3d-debug-container s3d-flex s3d-flex-col s3d-items-end s3d-gap-2 s3d-font-sans", children: [
    /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-gap-2", children: [
      /* @__PURE__ */ At.jsx(
        "button",
        {
          onClick: E,
          title: "Toggle Wireframe",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${y ? "s3d-bg-blue-600/80 s3d-border-blue-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ At.jsx("svg", { className: "s3d-w-5 s3d-h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ At.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25m-9-5.25v9l9 5.25M12 12.75v9" }) })
        }
      ),
      /* @__PURE__ */ At.jsx(
        "button",
        {
          onClick: () => h(!p),
          title: "Toggle Diagnostics",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${p ? "s3d-bg-emerald-600/80 s3d-border-emerald-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ At.jsx("svg", { className: "s3d-w-5 s3d-h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ At.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9zm0 0v3m-6.36 1.36l2.12 2.12M12 12l3.54-3.54" }) })
        }
      )
    ] }),
    p && /* @__PURE__ */ At.jsxs("div", { className: "s3d-w-56 s3d-bg-slate-900/85 s3d-backdrop-blur-md s3d-border s3d-border-slate-700/50 s3d-rounded-lg s3d-p-3 s3d-shadow-2xl s3d-text-slate-300 s3d-flex s3d-flex-col", children: [
      /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-justify-between s3d-items-center s3d-border-b s3d-border-slate-800 s3d-pb-1.5 s3d-mb-2.5", children: [
        /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide s3d-font-semibold", children: "FPS / FPS (max)" }),
        /* @__PURE__ */ At.jsxs("span", { className: "s3d-font-mono s3d-text-sm s3d-font-semibold", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-emerald-400", children: l.fps }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500", children: " / " }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-200", children: l.maxFps })
        ] })
      ] }),
      /* @__PURE__ */ At.jsxs("div", { className: "s3d-grid s3d-grid-cols-2 s3d-gap-y-2.5 s3d-gap-x-3 s3d-text-[11px]", children: [
        /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Device DPR" }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: (window.devicePixelRatio || 1).toFixed(2) })
        ] }),
        /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Scene)" }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: l.totalObjects })
        ] }),
        /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Screen)" }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: l.visibleObjects })
        ] }),
        /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Faces (screen)" }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: l.faces })
        ] }),
        /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Update" }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ms(l.updateTime) })
        ] }),
        /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Retrieval" }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ms(l.retrieveTime) })
        ] }),
        /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Object Culling" }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ms(l.cullTime) })
        ] }),
        /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Layer Grouping" }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ms(l.groupTime) })
        ] }),
        /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Process Meshes" }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ms(l.processTime) })
        ] }),
        /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Sort Faces" }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ms(l.sortTime) })
        ] }),
        /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Rasterize Faces" }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ms(l.drawTime) })
        ] }),
        /* @__PURE__ */ At.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ At.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Render (total)" }),
          /* @__PURE__ */ At.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: ms(l.dt) })
        ] })
      ] })
    ] })
  ] });
}
function g4(n) {
  if (!n || !n.canvas) {
    console.error("showDebug: Invalid viewport parameter passed.");
    return;
  }
  const s = n.canvas.parentElement || document.body;
  s && getComputedStyle(s).position === "static" && (s.style.position = "relative");
  let p = s.querySelector("#s3d-debug-root");
  if (p)
    return;
  p = document.createElement("div"), p.id = "s3d-debug-root", p.className = "s3d-absolute s3d-top-4 s3d-right-4 s3d-z-[99999]", s.appendChild(p), m4.createRoot(p).render(/* @__PURE__ */ At.jsx(y4, { viewport: n }));
}
const C4 = window.scaliaEngine = {
  config: yd,
  Game: EE,
  GameObject: ki,
  Component: dr,
  Camera: UC,
  CameraComponent: Pn,
  MeshComponent: sa,
  TransformComponent: Ny,
  SpriteRenderer: hS,
  glMatrix: Iz,
  PathRenderer: mS,
  TextRenderer: yS,
  Plane: jC,
  Box: FC,
  Cone: PC,
  Ball: ES,
  Light: gd,
  Canvas2dViewport: $C,
  showDebug: g4
};
export {
  C4 as default
};
